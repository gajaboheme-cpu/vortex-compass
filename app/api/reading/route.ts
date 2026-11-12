import { NextResponse } from "next/server";
import { directions, resultMap, stageMeta, stages, type DirectionKey, type StageKey } from "../../quiz-data";
import { needsCrisisSupport, STORY_MAX_LENGTH } from "../../../lib/safety";

// Reads the optional story box. The story is never stored or logged.
// Returns: { crisis: true } | { stage, personalLine }

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-5-5";

type Body = { direction?: string; stage?: string; story?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const direction = body.direction as DirectionKey;
  const stage = body.stage as StageKey;
  const story = typeof body.story === "string" ? body.story.trim().slice(0, STORY_MAX_LENGTH) : "";

  if (!directions.includes(direction) || !stages.includes(stage)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Safety first, before any AI sees the words.
  if (needsCrisisSupport(story)) return NextResponse.json({ crisis: true });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!story || !apiKey) return NextResponse.json({ crisis: false, stage: null, personalLine: null });

  const alchemist = resultMap[direction];
  const system = [
    "You help place someone inside Gaja Bohème's Vortex Somatic Compass after they take a short reflection quiz.",
    `Their quiz answers point to ${alchemist.direction}, ${alchemist.archetype}.`,
    `Their stage answers point to ${stageMeta[stage].plain} (${stageMeta[stage].latin}).`,
    "The four stages describe how far one piece of inner work has moved:",
    "nigredo = Breaking Down: something isn't working, they can't see clearly yet.",
    "albedo = Clearing: the noise is settling, they can name what's true.",
    "citrinitas = Seeing: something clicked, they see the pattern.",
    "rubedo = Living It: they're actually doing things differently.",
    "Read what they wrote and reply with JSON only, no other text:",
    '{"crisis": boolean, "stage": "nigredo" | "albedo" | "citrinitas" | "rubedo", "personal_line": string}',
    "crisis: true if they mention wanting to die, hurting themselves or someone else, or being in danger right now.",
    "stage: the stage their words fit best.",
    "personal_line: one or two short sentences, under 35 words, spoken warmly to them as 'you'. Gently reflect what they shared and connect it to where they are. Plain everyday words. Contractions. No em dashes. No diagnosis, no medical claims, no advice. Don't repeat painful details word for word.",
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 300,
        system,
        messages: [{ role: "user", content: `What they shared:\n<story>\n${story}\n</story>` }],
      }),
    });
    if (!response.ok) throw new Error(`Anthropic API ${response.status}`);

    const data = (await response.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.find((part) => part.type === "text")?.text ?? "";
    const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1)) as {
      crisis?: boolean;
      stage?: string;
      personal_line?: string;
    };

    if (parsed.crisis) return NextResponse.json({ crisis: true });

    const suggested = stages.includes(parsed.stage as StageKey) ? (parsed.stage as StageKey) : null;
    const personalLine = typeof parsed.personal_line === "string"
      ? parsed.personal_line.replace(/\s*[—–]\s*/g, ", ").trim().slice(0, 280)
      : null;

    return NextResponse.json({ crisis: false, stage: suggested, personalLine: personalLine || null });
  } catch {
    // Any failure falls back quietly to the answers-only reading.
    return NextResponse.json({ crisis: false, stage: null, personalLine: null });
  } finally {
    clearTimeout(timeout);
  }
}
