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
  image: string;
  pdf: string;
  guideAvailable: boolean;
};

export const resultMap: Record<DirectionKey, ResultContent> = {
  nourish: {
    direction: "South — Nourish",
    archetype: "The Alchemist of Restoration",
    currentAlchemy: "Your current alchemy is the transformation of depletion into replenishment, receptivity, and a more sustainable rhythm.",
    why: "Your season may be asking you to slow the pace and return to the forms of care that make your energy renewable.",
    signs: ["Rest feels more necessary than optional", "You are craving steadier rhythms", "Your body is asking you to listen more closely"],
    gift: "Restoration helps you become receptive again. From a nourished place, discernment becomes clearer and giving no longer requires abandoning yourself.",
    overextended: "Care can become withdrawal or endless preparation when rest is used to avoid the next honest step.",
    invitation: "Transform the belief that your worth depends on constant output. Let enoughness become part of your rhythm.",
    practices: ["Begin the day with five unhurried breaths before reaching for a screen.", "Choose one obligation to simplify, postpone, or release this week.", "Create one dependable ritual that restores your body rather than merely distracting your mind."],
    reflection: "What would become possible if replenishment were part of the path rather than a reward at the end?",
    supporting: "Protecting your energy will help support your next step. Nourish reminds you that sustainable change begins with enough inner resource to meet it.",
    shareText: "South — Nourish\nThe Alchemist of Restoration\nMy current season is asking me to transform depletion into restoration.",
    image: "/images/results/nourish.jpg",
    pdf: "/guides/vortex-nourish-guide.pdf",
    guideAvailable: false,
  },
  release: {
    direction: "West — Release",
    archetype: "The Alchemist of Liberation",
    currentAlchemy: "Your current alchemy is the transformation of what has become heavy into space, discernment, and freedom.",
    why: "Your Compass may be recognizing that something once useful has become too heavy to carry into the season ahead.",
    signs: ["Old commitments feel heavier than before", "You are noticing patterns ready to end", "Space feels more appealing than certainty"],
    gift: "Liberation restores choice. Releasing what is complete creates room for clearer boundaries, honest desire, and purposeful movement.",
    overextended: "Release can become abruptness or detachment when making space happens before the lesson has been acknowledged.",
    invitation: "Transform obligation into discernment. Notice what is truly yours to carry and what can be set down with care.",
    practices: ["Write down one role or expectation that no longer fits, then name what it once protected.", "Clear one small physical space as a tangible gesture of completion.", "Practice one clean no where you would usually offer a resentful yes."],
    reflection: "What are you ready to stop carrying, even if you once carried it with love?",
    supporting: "Making space will help support your next step. Release helps you separate what is complete from what still deserves your energy.",
    shareText: "West — Release\nThe Alchemist of Liberation\nMy current season is asking me to transform heaviness into freedom.",
    image: "/images/results/release.jpg",
    pdf: "/guides/vortex-release-guide.pdf",
    guideAvailable: false,
  },
  shine: {
    direction: "East — Shine",
    archetype: "The Alchemist of Illumination",
    currentAlchemy: "Your current alchemy is the transformation of hidden gifts, restrained expression, and hesitation into visibility, confidence, and creative fire.",
    why: "Your season may be asking you to stop editing your brightness for the comfort of being overlooked.",
    signs: ["An idea keeps asking to be shared", "You feel ready for greater visibility", "Your confidence grows when you create"],
    gift: "Illumination makes your gifts available to others. Visibility rooted in truth can invite connection, contribution, and creative momentum.",
    overextended: "Shining can become performance when recognition matters more than the integrity of what you are expressing.",
    invitation: "Transform hesitation into honest expression. Let yourself be visible without requiring perfection first.",
    practices: ["Share one unfinished but meaningful idea with someone you trust.", "Name one strength without minimizing it or adding a disclaimer.", "Make something for the pleasure of expression before deciding how it will be received."],
    reflection: "What wants to be expressed through you before you feel completely ready?",
    supporting: "Allowing yourself to be seen will help support your next step. Shine invites your changing inner truth to become visible in the life you are creating.",
    shareText: "East — Shine\nThe Alchemist of Illumination\nMy current season is asking me to transform hidden expression into visible light.",
    image: "/images/results/shine.jpg",
    pdf: "/guides/vortex-shine-guide.pdf",
    guideAvailable: false,
  },
  connect: {
    direction: "North — Connect",
    archetype: "The Alchemist of Belonging",
    currentAlchemy: "Your current alchemy is the transformation of isolation and over-independence into support, intimacy, and meaningful belonging.",
    why: "Your Compass may be pointing toward the relationships and communities where you can be known, supported, and met with reciprocity.",
    signs: ["You are longing for meaningful conversation", "Doing everything alone feels less sustainable", "Collaboration is appearing at the edges"],
    gift: "Belonging allows support to circulate. Meaningful connection can soften self-protection and make room for collaboration, intimacy, and mutual care.",
    overextended: "Connection can become self-abandonment when belonging depends on hiding your needs or agreeing against your own truth.",
    invitation: "Transform over-independence into chosen interdependence. Practice receiving without treating support as a debt.",
    practices: ["Send one honest invitation to someone who feels safe and reciprocal.", "Ask for a specific, manageable form of support this week.", "Notice where you feel most like yourself in relationship, and spend more time there."],
    reflection: "Where are you being invited to let yourself be known rather than merely useful?",
    supporting: "Letting yourself receive support will help support your next step. Connect reminds you that transformation does not have to happen in isolation.",
    shareText: "North — Connect\nThe Alchemist of Belonging\nMy current season is asking me to transform isolation into meaningful support.",
    image: "/images/results/connect.jpg",
    pdf: "/guides/vortex-connect-guide.pdf",
    guideAvailable: false,
  },
  expand: {
    direction: "Center — Expand",
    archetype: "The Alchemist of Becoming",
    currentAlchemy: "Your current alchemy is the transformation of uncertainty and transition into possibility, self-trust, and a new way of becoming.",
    why: "Your Compass may be reflecting a threshold: the familiar no longer contains everything you are becoming, even if the new form is not clear yet.",
    signs: ["Familiar paths feel too small", "New possibilities arrive in surprising forms", "You sense change before you can name it"],
    gift: "Becoming makes room for possibility without demanding premature certainty. Curiosity can turn transition into a place of discovery and self-trust.",
    overextended: "Expansion can become scattering when every possibility is pursued and none receives enough devotion to take root.",
    invitation: "Transform uncertainty into experimentation. Choose the next honest step without requiring the entire path to reveal itself.",
    practices: ["Write for three minutes on what becomes possible if you do not need the whole plan yet.", "Choose one small experiment that can teach you more than further analysis.", "Protect a pocket of unscheduled time for curiosity, play, or new input."],
    reflection: "Who are you becoming when you stop asking the past to predict what comes next?",
    supporting: "Remaining open to new possibilities will help support your next step. Expand offers permission to meet change with curiosity rather than immediate certainty.",
    shareText: "Center — Expand\nThe Alchemist of Becoming\nMy current season is asking me to transform uncertainty into possibility.",
    image: "/images/results/expand.jpg",
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
