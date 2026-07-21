export const directions = ["nourish", "release", "shine", "connect", "expand"] as const;
export type DirectionKey = (typeof directions)[number];

export type ResultContent = {
  direction: string;
  archetype: string;
  interpretation: string;
  signs: [string, string, string];
  practice: string;
  supporting: string;
  pdf: string;
  guideAvailable: boolean;
};

export const resultMap: Record<DirectionKey, ResultContent> = {
  nourish: {
    direction: "South — Nourish",
    archetype: "The Tender",
    interpretation: "Your season is asking for softness, restoration, and a return to what truly sustains you.",
    signs: ["Rest feels more necessary than optional", "You are craving steadier rhythms", "Your body is asking you to listen more closely"],
    practice: "Place one hand on your heart and one on your belly. Take five unhurried breaths before choosing your next task.",
    supporting: "Protecting your energy will help support your next step.",
    pdf: "/guides/vortex-nourish-guide.pdf",
    guideAvailable: false,
  },
  release: {
    direction: "West — Release",
    archetype: "The Liberator",
    interpretation: "Your season is asking you to loosen your grip on what is complete and make room for what comes next.",
    signs: ["Old commitments feel heavier than before", "You are noticing patterns ready to end", "Space feels more appealing than certainty"],
    practice: "Name one thing you no longer need to carry. Write it down, then tear the paper slowly and with intention.",
    supporting: "Making space will help support your next step.",
    pdf: "/guides/vortex-release-guide.pdf",
    guideAvailable: false,
  },
  shine: {
    direction: "East — Shine",
    archetype: "The Luminary",
    interpretation: "Your season is asking you to trust your expression, take up space, and let your gifts be witnessed.",
    signs: ["An idea keeps asking to be shared", "You feel ready for greater visibility", "Your confidence grows when you create"],
    practice: "Share one honest sentence, idea, or creation today without polishing away its aliveness.",
    supporting: "Allowing yourself to be seen will help support your next step.",
    pdf: "/guides/vortex-shine-guide.pdf",
    guideAvailable: false,
  },
  connect: {
    direction: "North — Connect",
    archetype: "The Weaver",
    interpretation: "Your season is asking you to reach toward belonging, reciprocity, and relationships that can hold the real you.",
    signs: ["You are longing for meaningful conversation", "Doing everything alone feels less sustainable", "Collaboration is appearing at the edges"],
    practice: "Send a simple message to someone safe: “I thought of you today. Would you like to connect?”",
    supporting: "Letting yourself receive support will help support your next step.",
    pdf: "/guides/vortex-connect-guide.pdf",
    guideAvailable: false,
  },
  expand: {
    direction: "Center — Expand",
    archetype: "The Alchemist",
    interpretation: "Your season is asking you to stay curious at the threshold and welcome a wider version of what is possible.",
    signs: ["Familiar paths feel too small", "New possibilities arrive in surprising forms", "You sense change before you can name it"],
    practice: "Ask yourself, “What becomes possible if I do not need to know the whole path yet?” Write for three minutes.",
    supporting: "Remaining open to new possibilities will help support your next step.",
    pdf: "/guides/vortex-expand-guide.pdf",
    guideAvailable: false,
  },
};

type Option = { label: string; direction: DirectionKey };
export type Question = { prompt: string; options: Option[] };

const option = (label: string, direction: DirectionKey): Option => ({ label, direction });

export const questions: Question[] = [
  { prompt: "What are you craving most right now?", options: [option("Deep rest and replenishment", "nourish"), option("Room to breathe and let go", "release"), option("Permission to be fully seen", "shine"), option("Genuine companionship", "connect"), option("A doorway into something new", "expand")] },
  { prompt: "Which feeling has been visiting you most often?", options: [option("Tenderness", "nourish"), option("Completion", "release"), option("Creative fire", "shine"), option("Longing for belonging", "connect"), option("Restless possibility", "expand")] },
  { prompt: "Where does your attention naturally go?", options: [option("Toward my body and its needs", "nourish"), option("Toward what I am ready to clear", "release"), option("Toward what I want to express", "shine"), option("Toward the people I care about", "connect"), option("Toward the horizon", "expand")] },
  { prompt: "What would feel like relief?", options: [option("A slower, gentler rhythm", "nourish"), option("Closing an unfinished chapter", "release"), option("Speaking without shrinking", "shine"), option("Being held and understood", "connect"), option("Having space to experiment", "expand")] },
  { prompt: "Which inner voice is getting louder?", options: [option("Care for yourself", "nourish"), option("You can put this down", "release"), option("Let them see you", "shine"), option("You do not have to do this alone", "connect"), option("There is more for you", "expand")] },
  { prompt: "If you could choose one medicine for this moment, what would it be?", options: [option("Warmth", "nourish"), option("A clean ending", "release"), option("Courage", "shine"), option("Community", "connect"), option("Wonder", "expand")] },
  { prompt: "What kind of movement feels most honest?", options: [option("Turning inward", "nourish"), option("Exhaling and unclenching", "release"), option("Stepping forward", "shine"), option("Reaching out", "connect"), option("Opening wider", "expand")] },
  { prompt: "What do you want to trust more deeply?", options: [option("My body’s timing", "nourish"), option("The wisdom of endings", "release"), option("My own voice", "shine"), option("The support around me", "connect"), option("The unknown", "expand")] },
  { prompt: "Without overthinking, choose the image that calls to you.", options: [option("A sheltered garden", "nourish"), option("Leaves carried downstream", "release"), option("Sunrise over open land", "shine"), option("Hands woven together", "connect"), option("A spiral at the center", "expand")] },
];

export function calculateResult(answers: DirectionKey[]) {
  const scores = Object.fromEntries(directions.map((key) => [key, 0])) as Record<DirectionKey, number>;
  answers.forEach((answer) => { scores[answer] += 1; });

  const fixedRank = (key: DirectionKey) => directions.indexOf(key);
  const compare = (a: DirectionKey, b: DirectionKey) => {
    if (scores[a] !== scores[b]) return scores[b] - scores[a];
    if (answers[8] === a) return -1;
    if (answers[8] === b) return 1;
    if (answers[5] === a) return -1;
    if (answers[5] === b) return 1;
    return fixedRank(a) - fixedRank(b);
  };

  const ranked = [...directions].sort(compare);
  return { primary: ranked[0], supporting: ranked[1], scores };
}
