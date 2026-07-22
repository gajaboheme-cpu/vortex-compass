export const directions = ["nourish", "release", "shine", "connect", "expand"] as const;
export type DirectionKey = (typeof directions)[number];

export type ResultContent = {
  direction: string;
  archetype: string;
  currentAlchemy: string;
  why: string;
  signs: [string, string, string];
  gift: string;
  overextended: string;
  invitation: string;
  practices: [string, string, string];
  reflection: string;
  supporting: string;
  shareText: string;
  pdf: string;
  guideAvailable: boolean;
};

export const resultMap: Record<DirectionKey, ResultContent> = {
  nourish: {
    direction: "South — Nourish",
    archetype: "The Alchemist of Restoration",
    currentAlchemy: "Right now, your life may be asking you to slow down and rebuild your energy. You do not have to wait until you are completely drained to give yourself the care and rest you need.",
    why: "You may have been giving more than you are receiving or moving through your days without enough time to recover. This result is a reminder that your needs deserve a place in your plans.",
    signs: ["Rest feels more necessary than optional", "You are craving steadier rhythms", "Your body is asking you to listen more closely"],
    gift: "You are good at noticing what helps people feel safe, supported, and cared for. When you make room for your own needs too, you bring more patience and steadiness to everything you do.",
    overextended: "You may put everyone else first, feel guilty when you rest, or wait until you are exhausted before asking for help.",
    invitation: "Build care into your regular routine instead of treating it like a reward. Small, consistent choices will support you more than pushing through and recovering later.",
    practices: ["Take ten quiet minutes before checking your phone in the morning.", "Make one meal, bedtime, or movement routine easier to maintain this week.", "Ask someone you trust for one specific kind of support."],
    reflection: "What would help me feel more supported and rested this week?",
    supporting: "Protecting your energy will help with whatever comes next. Nourish reminds you to include your own needs in the care you give.",
    shareText: "South — Nourish\nThe Alchemist of Restoration\nRight now, my life is asking me to slow down and restore my energy.",
    pdf: "/guides/vortex-nourish-guide.pdf",
    guideAvailable: false,
  },
  release: {
    direction: "West — Release",
    archetype: "The Alchemist of Liberation",
    currentAlchemy: "Right now, your life may be asking you to let go of what no longer fits so you have more room for what comes next. You do not need to have every answer before making space for change.",
    why: "You may be holding on to routines, relationships, roles, or expectations that no longer feel right. This result suggests that something has run its course, even if you are still deciding what comes next.",
    signs: ["Old commitments feel heavier than before", "You are noticing patterns ready to end", "Space feels more appealing than certainty"],
    gift: "You can recognize when something is complete and make honest decisions about what stays. This gives you the ability to create clear boundaries and move forward with intention.",
    overextended: "You may stay too long because change feels uncertain, or let go too quickly because you want immediate relief. Either response can make it harder to understand what you really need.",
    invitation: "Notice what is draining you and decide what is truly yours to carry. You can make a thoughtful change without turning it into a dramatic ending.",
    practices: ["Spend ten minutes clearing one small space in your home.", "Say no to one commitment that feels draining.", "Write down one thing you are ready to leave behind and why."],
    reflection: "What am I holding on to that I no longer need?",
    supporting: "Making space will help with your next step. Release reminds you that letting go can be thoughtful, gradual, and kind.",
    shareText: "West — Release\nThe Alchemist of Liberation\nRight now, my life is asking me to let go of what no longer fits.",
    pdf: "/guides/vortex-release-guide.pdf",
    guideAvailable: false,
  },
  shine: {
    direction: "East — Shine",
    archetype: "The Alchemist of Illumination",
    currentAlchemy: "Right now, your life may be asking you to be more visible and honest about what you have to offer. You do not need to feel completely confident before sharing your ideas, creativity, or point of view.",
    why: "Something in you may be ready to be expressed, but hesitation or fear of judgment has kept it quiet. This result is an invitation to take one step toward being seen.",
    signs: ["An idea keeps asking to be shared", "You feel ready for greater visibility", "Your confidence grows when you create"],
    gift: "You bring energy, creativity, and a fresh point of view. When you trust your voice, you can encourage other people to express themselves more honestly too.",
    overextended: "You may wait for perfection, compare yourself to others, or focus so much on how you will be received that you lose touch with what you wanted to say.",
    invitation: "Practice sharing before everything feels polished. Confidence often grows after you take action, not before.",
    practices: ["Share one idea with someone you trust before you perfect it.", "Name one strength without adding a disclaimer.", "Spend twenty minutes making something just because you enjoy it."],
    reflection: "What have I wanted to share but kept holding back?",
    supporting: "Allowing yourself to be seen will help with your next step. Shine reminds you that your voice does not have to be perfect to matter.",
    shareText: "East — Shine\nThe Alchemist of Illumination\nRight now, my life is asking me to share more of who I am.",
    pdf: "/guides/vortex-shine-guide.pdf",
    guideAvailable: false,
  },
  connect: {
    direction: "North — Connect",
    archetype: "The Alchemist of Belonging",
    currentAlchemy: "Right now, your life may be asking you to let other people support you. You can stay independent while also making room for closer, more honest connection.",
    why: "You may be tired of handling everything on your own or longing for relationships where you can be fully yourself. This result suggests that support and belonging need more attention right now.",
    signs: ["You are longing for meaningful conversation", "Doing everything alone feels less sustainable", "Collaboration is appearing at the edges"],
    gift: "You understand how to bring people together and create genuine connection. You notice what helps others feel included, understood, and welcome.",
    overextended: "You may avoid asking for help, agree to things just to keep the peace, or hide your needs because you do not want to burden anyone.",
    invitation: "Let someone meet you where you are. Healthy connection includes giving, receiving, honesty, and room for your boundaries.",
    practices: ["Invite someone you trust to have coffee, take a walk, or talk on the phone.", "Ask for one small and specific kind of help.", "Spend time with someone around whom you feel most like yourself."],
    reflection: "Where do I feel most like myself with other people?",
    supporting: "Letting yourself receive support will help with your next step. Connect reminds you that you do not have to handle every change alone.",
    shareText: "North — Connect\nThe Alchemist of Belonging\nRight now, my life is asking me to make room for meaningful support.",
    pdf: "/guides/vortex-connect-guide.pdf",
    guideAvailable: false,
  },
  expand: {
    direction: "Center — Expand",
    archetype: "The Alchemist of Becoming",
    currentAlchemy: "Right now, your life may be asking you to embrace change instead of waiting until everything feels certain. You only need enough clarity to take the next useful step.",
    why: "The familiar may feel too small, but the new direction is not fully clear yet. This result often appears when you are ready to explore rather than force an immediate answer.",
    signs: ["Familiar paths feel too small", "New possibilities arrive in surprising forms", "You sense change before you can name it"],
    gift: "You can see possibilities that other people may overlook. Curiosity helps you adapt, learn quickly, and imagine a life beyond the options you already know.",
    overextended: "You may chase too many possibilities at once, keep researching instead of choosing, or feel frustrated because the full plan is not clear.",
    invitation: "Treat this season as a time to experiment. Pick one small step that will give you useful information, then decide what comes next.",
    practices: ["Choose one small idea to test this week.", "Take a walk without listening to anything and notice what comes to mind.", "Set aside twenty minutes to explore something that genuinely interests you."],
    reflection: "What change have I been curious about lately?",
    supporting: "Staying open to new possibilities will help with your next step. Expand reminds you that you can learn as you go.",
    shareText: "Center — Expand\nThe Alchemist of Becoming\nRight now, my life is asking me to embrace change one step at a time.",
    pdf: "/guides/vortex-expand-guide.pdf",
    guideAvailable: false,
  },
};

type Option = { label: string; direction: DirectionKey; image?: string };
export type Question = { prompt: string; options: Option[] };

const option = (label: string, direction: DirectionKey): Option => ({ label, direction });
const imageOption = (label: string, direction: DirectionKey, image: string): Option => ({ label, direction, image });

export const questions: Question[] = [
  { prompt: "What are you craving most right now?", options: [option("Deep rest and replenishment", "nourish"), option("Room to breathe and let go", "release"), option("Permission to be fully seen", "shine"), option("Genuine companionship", "connect"), option("A doorway into something new", "expand")] },
  { prompt: "Which feeling has been visiting you most often?", options: [option("Tenderness", "nourish"), option("Completion", "release"), option("Creative fire", "shine"), option("Longing for belonging", "connect"), option("Restless possibility", "expand")] },
  { prompt: "Where does your attention naturally go?", options: [option("Toward my body and its needs", "nourish"), option("Toward what I am ready to clear", "release"), option("Toward what I want to express", "shine"), option("Toward the people I care about", "connect"), option("Toward the horizon", "expand")] },
  { prompt: "What would feel like relief?", options: [option("A slower, gentler rhythm", "nourish"), option("Closing an unfinished chapter", "release"), option("Speaking without shrinking", "shine"), option("Being held and understood", "connect"), option("Having space to experiment", "expand")] },
  { prompt: "Which inner voice is getting louder?", options: [option("Care for yourself", "nourish"), option("You can put this down", "release"), option("Let them see you", "shine"), option("You do not have to do this alone", "connect"), option("There is more for you", "expand")] },
  { prompt: "If you could choose one medicine for this moment, what would it be?", options: [option("Warmth", "nourish"), option("A clean ending", "release"), option("Courage", "shine"), option("Community", "connect"), option("Wonder", "expand")] },
  { prompt: "What kind of movement feels most honest?", options: [option("Turning inward", "nourish"), option("Exhaling and unclenching", "release"), option("Stepping forward", "shine"), option("Reaching out", "connect"), option("Opening wider", "expand")] },
  { prompt: "What do you want to trust more deeply?", options: [option("My body’s timing", "nourish"), option("The wisdom of endings", "release"), option("My own voice", "shine"), option("The support around me", "connect"), option("The unknown", "expand")] },
  { prompt: "Without overthinking, choose the image that calls to you.", options: [imageOption("A sheltered garden", "nourish", "/images/results/nourish.jpg"), imageOption("Leaves carried downstream", "release", "/images/results/release.jpg"), imageOption("Sunrise over open land", "shine", "/images/results/shine.jpg"), imageOption("Hands woven together", "connect", "/images/results/connect.jpg"), imageOption("A spiral at the center", "expand", "/images/results/expand.jpg")] },
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
