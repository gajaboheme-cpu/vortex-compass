export const directions = ["nourish", "release", "shine", "connect", "expand"] as const;
export type DirectionKey = (typeof directions)[number];

export const stages = ["nigredo", "albedo", "citrinitas", "rubedo"] as const;
export type StageKey = (typeof stages)[number];

/* ── The five Alchemists ─────────────────────────────────────────── */

export type DirectionContent = {
  direction: string;
  archetype: string;
  element: string;
  plate: string;
  primaryQuestion: string;
  supporting: string;
  pdf: string;
  guideAvailable: boolean;
};

export const resultMap: Record<DirectionKey, DirectionContent> = {
  nourish: {
    direction: "South · Nourish",
    archetype: "The Alchemist of Restoration",
    element: "Water",
    plate: "/images/plates/nourish.webp",
    primaryQuestion: "What am I actually hungry for?",
    supporting: "Underneath it all, your body is asking for more care. Nourish reminds you that you're allowed to receive.",
    pdf: "/guides/vortex-nourish-guide.pdf",
    guideAvailable: false,
  },
  release: {
    direction: "West · Release",
    archetype: "The Alchemist of Liberation",
    element: "Earth",
    plate: "/images/plates/release.webp",
    primaryQuestion: "What am I carrying that has already finished its work?",
    supporting: "Something you're carrying may be ready to set down. Release reminds you that letting go can be gentle and slow.",
    pdf: "/guides/vortex-release-guide.pdf",
    guideAvailable: false,
  },
  shine: {
    direction: "East · Shine",
    archetype: "The Alchemist of Illumination",
    element: "Fire",
    plate: "/images/plates/shine.webp",
    primaryQuestion: "What wants to be expressed through me?",
    supporting: "Something in you wants to be seen. Shine reminds you that your light doesn't need permission.",
    pdf: "/guides/vortex-shine-guide.pdf",
    guideAvailable: false,
  },
  connect: {
    direction: "North · Connect",
    archetype: "The Alchemist of Belonging",
    element: "Air",
    plate: "/images/plates/connect.webp",
    primaryQuestion: "Where do I belong without having to abandon myself?",
    supporting: "You don't have to do this part alone. Connect reminds you that you're allowed to be held.",
    pdf: "/guides/vortex-connect-guide.pdf",
    guideAvailable: false,
  },
  expand: {
    direction: "Center · Expand",
    archetype: "The Alchemist of Becoming",
    element: "Ether",
    plate: "/images/plates/expand.webp",
    primaryQuestion: "What am I being asked to remember?",
    supporting: "You're also in the middle of becoming someone new. Expand reminds you to come back to yourself, not backwards.",
    pdf: "/guides/vortex-expand-guide.pdf",
    guideAvailable: false,
  },
};

/* ── The four stages ─────────────────────────────────────────────── */

export type StageMeta = { plain: string; latin: string; color: string; ink: string };

export const stageMeta: Record<StageKey, StageMeta> = {
  nigredo: { plain: "Breaking Down", latin: "Nigredo", color: "#3A332F", ink: "#F5F1EA" },
  albedo: { plain: "Clearing", latin: "Albedo", color: "#F5F1EA", ink: "#3A332F" },
  citrinitas: { plain: "Seeing", latin: "Citrinitas", color: "#BB9E51", ink: "#3A332F" },
  rubedo: { plain: "Living It", latin: "Rubedo", color: "#601010", ink: "#F5F1EA" },
};

/* ── Twenty readings: five Alchemists × four stages ──────────────── */

export type Reading = {
  opening: [string, string];
  whereYouAre: string;
  happening: string;
  alchemist: string;
  nextStep: string;
  goingTo: string;
  sitWith: string;
};

export const readings: Record<DirectionKey, Record<StageKey, Reading>> = {
  nourish: {
    nigredo: {
      opening: ["You've been running on empty for a while. You might not even feel it anymore.", "You keep showing up for everyone, and rest is always next week. When it gets to be too much, you reach for something quick. A snack, your phone, one more thing in the cart."],
      whereYouAre: "The old alchemists called this Nigredo, the dark part. Things feel heavy and a little blurry. That's okay. You don't need to see clearly yet.",
      happening: "Your body's been carrying you without a break. Tired isn't a character flaw. It's information.",
      alchemist: "The Alchemist of Restoration lives in the South, in water. Water fills things up. It also runs dry when nobody refills it. Its teaching is simple: you don't have to earn rest.",
      nextStep: "Don't fix anything this week. Once a day, notice one moment when you push past what your body is asking for. Just notice it. That's all.",
      goingTo: "Soon you'll see the pattern more clearly, what drains you and what actually fills you back up. You don't have to force it.",
      sitWith: "What am I actually hungry for?",
    },
    albedo: {
      opening: ["You can feel how tired you are now. Really feel it.", "And you're noticing something. The things you reach for to feel better don't actually fill you up. They just take the edge off."],
      whereYouAre: "This is Albedo, the clearing. The fog's lifting. You can tell the difference between comfort and real nourishment, and that's a big shift.",
      happening: "Seeing your exhaustion can feel worse before it feels better. That's not a setback. You're finally listening.",
      alchemist: "The Alchemist of Restoration lives in the South, in water. Water receives before it gives. Its teaching: you don't have to earn rest.",
      nextStep: "Before you reach for comfort this week, pause for one breath. Ask yourself what you're actually hungry for. Then give yourself that, if you can.",
      goingTo: "Soon you'll see why receiving has felt so hard for you. That's when things start to shift for real.",
      sitWith: "Where have I confused comfort with nourishment?",
    },
    citrinitas: {
      opening: ["Something just clicked for you.", "You've been earning rest instead of taking it. Maybe you learned early that you had to be the strong one, the one everybody leans on. Somewhere along the way, receiving stopped feeling safe."],
      whereYouAre: "This is Citrinitas, the dawn. The light's coming back. You can see the pattern now, and you can see where it came from.",
      happening: "That pattern kept you going for a long time. It made sense once. It just doesn't get to run your life anymore.",
      alchemist: "The Alchemist of Restoration lives in the South, in water. Water never apologizes for needing to be filled. Its teaching: you're allowed to receive.",
      nextStep: "Receive one thing this week without paying it back. A meal or a favor. Say thank you and let it land.",
      goingTo: "The more you practice receiving, the less it'll feel like a big deal. One day rest will just be part of your week.",
      sitWith: "What would it feel like to let someone take care of me?",
    },
    rubedo: {
      opening: ["You rested, and nothing fell apart.", "That's new for you. You're asking for support and actually letting it in. Rest isn't a prize you have to win anymore. It's just part of how you live."],
      whereYouAre: "This is Rubedo, the red stage. The work isn't just an idea now. You're living it.",
      happening: "Life will still test this. Busy seasons come, and the old habit of pushing through might knock on the door. That doesn't mean you've lost anything.",
      alchemist: "The Alchemist of Restoration lives in the South, in water. Water keeps flowing when it has a steady source. Its teaching: you can't keep pouring from an empty cup.",
      nextStep: "Protect your rhythm. Notice what tends to pull you off it, and decide ahead of time how you'll come back.",
      goingTo: "A full cup spills over into everything else. That's where new seasons begin.",
      sitWith: "What helps me stay full?",
    },
  },
  release: {
    nigredo: {
      opening: ["Something is ending. And part of you is holding on with both hands.", "Or maybe you did the opposite. You cut it off fast so you wouldn't have to feel it. Either way, it still feels heavy."],
      whereYouAre: "The old alchemists called this Nigredo, the dark part. Something's breaking down, and you can't see what comes next yet. That's okay. Nobody can from here.",
      happening: "Endings scare us because they feel like failure. But not every ending means something went wrong. Some things just finish.",
      alchemist: "The Alchemist of Liberation lives in the West, in the earth, where fallen leaves slowly turn into soil. Nothing there is wasted. Its teaching: what composts, becomes.",
      nextStep: "Don't decide anything this week. Just name what feels heavy. Say it out loud or write it down. Naming it is enough for now.",
      goingTo: "Soon the fog will lift, and you'll see more clearly what's really over. You don't have to get there today.",
      sitWith: "What am I holding on to because I'm scared of what happens if I let go?",
    },
    albedo: {
      opening: ["Something in your life has finished. And you know it.", "Maybe it's a relationship, or a version of you that kept everyone else comfortable. Whatever it is, you've stopped pretending it's still working."],
      whereYouAre: "The old alchemists called this Albedo, the clearing. The fog is lifting. You're not confused about what ended anymore. You're just sad about it. And that's exactly right.",
      happening: "Your head knows before your heart does. Seeing that something is over doesn't mean you're done with it. That isn't you being stuck. That's grief doing its job.",
      alchemist: "The Alchemist of Liberation lives in the West, in the earth, where fallen leaves slowly turn into soil. Nothing there is wasted. Its whole teaching fits in four words: what composts, becomes.",
      nextStep: "This week, grieve on purpose. Take ten minutes and write down what this thing gave you, the good parts too. Then close the notebook. You're not letting go yet. You're saying thank you first.",
      goingTo: "When you're ready, the light comes back. You'll start to see what this ending is making room for. You don't have to rush there. It'll find you.",
      sitWith: "What am I carrying that has already finished its work?",
    },
    citrinitas: {
      opening: ["You're starting to see this ending differently.", "Maybe it didn't fail. Maybe it just finished. It gave you what it came to give, and now it's done."],
      whereYouAre: "This is Citrinitas, the dawn. The light's coming back. You can see what this ending is making room for.",
      happening: "This isn't the same as being “over it.” The grief can still be there. You're just not fighting the ending anymore.",
      alchemist: "The Alchemist of Liberation lives in the West, in the earth. Earth takes what falls and turns it into something that feeds new growth. Its teaching: what composts, becomes.",
      nextStep: "Hold the thing that ended in your mind and ask one question: what can this become now? Write down whatever comes. Don't judge it.",
      goingTo: "Soon you'll be living in the space it left, and it won't feel empty. It'll feel like room.",
      sitWith: "What is this ending making room for?",
    },
    rubedo: {
      opening: ["You let it go. And you're not carrying it anymore.", "You did it with care, too. You didn't rush it and you didn't run from it. Your boundaries are holding, and you feel lighter."],
      whereYouAre: "This is Rubedo, the red stage. You're living what you learned.",
      happening: "Sometimes a memory will still sting. That's normal. It doesn't mean you picked it back up.",
      alchemist: "The Alchemist of Liberation lives in the West, in the earth. Its teaching is what composts, becomes. You're the proof.",
      nextStep: "Notice what's growing in the space it left. Maybe it's more energy, or a new habit. Give that new thing your attention.",
      goingTo: "Something new is going to ask for your attention soon. Let it.",
      sitWith: "What's growing in the space I made?",
    },
  },
  shine: {
    nigredo: {
      opening: ["There's something in you that wants out. And you keep pushing it back down.", "Maybe you go quiet so nobody can judge you. Or you go the other way and perform, proving yourself over and over until you're burnt out. Both are ways of hiding."],
      whereYouAre: "The old alchemists called this Nigredo, the dark part. You can't quite see what wants to come through yet, or why it feels so risky.",
      happening: "Hiding kept you safe at some point. Being seen once cost you something, and your body remembers.",
      alchemist: "The Alchemist of Illumination lives in the East, in fire, where the sun comes up every morning without asking anyone first. Its teaching: your light doesn't need permission.",
      nextStep: "Don't push yourself to be more visible yet. This week, just notice when you go quiet and when you start performing. Catch it. That's all.",
      goingTo: "Soon you'll start to hear the difference between your real voice and the one you use to be liked.",
      sitWith: "Where have I learned to shrink?",
    },
    albedo: {
      opening: ["Part of you wants to be seen. Part of you is scared of it. And now you can feel both.", "You're starting to tell the difference between your real voice and the one you use to fit in. That's huge."],
      whereYouAre: "This is Albedo, the clearing. The noise is settling, and you can hear yourself more clearly.",
      happening: "Being scared doesn't mean you're not ready. It just means it matters to you.",
      alchemist: "The Alchemist of Illumination lives in the East, in fire. Fire doesn't ask if it's too bright. Its teaching: your light doesn't need permission.",
      nextStep: "Make something just for you this week. Don't post it or grade it. It's just you and whatever wants to come out.",
      goingTo: "Soon you'll see what's been holding your light back. Once you see it, it loses its grip.",
      sitWith: "What would I say if nobody was watching?",
    },
    citrinitas: {
      opening: ["You've been waiting for permission. And you just realized you don't need it.", "You can see what's held your light back. You can also see what wants to come through you, whether it's a project, an idea, or simply being more yourself in the room."],
      whereYouAre: "This is Citrinitas, the dawn. It fits the East. The sun's coming up.",
      happening: "You don't have to feel confident first. Confidence usually shows up after you act, not before.",
      alchemist: "The Alchemist of Illumination lives in the East, in fire. Its teaching: you're allowed to be seen.",
      nextStep: "Share one thing before it feels perfect. Show it to one person you trust. That's enough.",
      goingTo: "The more you share, the more natural it gets. Soon you won't have to psych yourself up every time.",
      sitWith: "What wants to be expressed through me?",
    },
    rubedo: {
      opening: ["You're letting yourself be seen. And it feels like you.", "You're not forcing it or performing. You're sharing what's alive in you, and you're taking care of your energy while you do."],
      whereYouAre: "This is Rubedo, the red stage. Your fire is steady now, not wild.",
      happening: "Being visible can still be tiring. That's not a sign to hide again. It's a sign to rest.",
      alchemist: "The Alchemist of Illumination lives in the East, in fire. Its teaching: what's alive in you is meant to be expressed.",
      nextStep: "Keep a gentle rhythm of sharing. Build rest into it on purpose, so your fire doesn't burn you out.",
      goingTo: "Your light will start giving other people permission to shine too. That's how it spreads.",
      sitWith: "How can I keep shining without burning out?",
    },
  },
  connect: {
    nigredo: {
      opening: ["You've been doing it all on your own. Or you've been bending so much to keep everyone happy that you've lost track of yourself.", "Maybe it's both. You handle everything and go along with everything, and somehow you still feel alone."],
      whereYouAre: "The old alchemists called this Nigredo, the dark part. It's hard to see where you fit right now. That's okay.",
      happening: "Doing it alone probably kept you safe once. So did keeping the peace. Those were smart moves back then. They're just heavy now.",
      alchemist: "The Alchemist of Belonging lives in the North, in air. Air touches everyone. Nobody breathes alone. Its teaching: you were never meant to carry everything alone.",
      nextStep: "Don't reach out to anyone yet. This week, just notice when you change yourself to fit in, like when you say yes but mean no.",
      goingTo: "Soon you'll start to see which needs are yours and which ones you've been carrying for other people.",
      sitWith: "Where do I feel alone, even when I'm around people?",
    },
    albedo: {
      opening: ["You're starting to see whose needs you've been carrying. And a lot of them aren't yours.", "That can feel strange. You might not even know what you want when it's just you. That's okay. You're finding out."],
      whereYouAre: "This is Albedo, the clearing. The air is clearing up. You can tell what's yours and what's theirs.",
      happening: "People-pleasing isn't about being fake. It's about feeling safe. You're just learning there's another way to feel safe.",
      alchemist: "The Alchemist of Belonging lives in the North, in air. Its teaching: belonging should never cost you yourself.",
      nextStep: "Before you say yes to anything this week, take one breath and ask yourself, “Is this mine?”",
      goingTo: "Soon you'll see the pattern underneath. That's when you get to choose something different.",
      sitWith: "What do I want when no one else is in the room?",
    },
    citrinitas: {
      opening: ["You just saw it. Being liked has felt safer than being honest.", "Now you can't unsee it. And you can see something else too: you can stay close to people and still be you."],
      whereYouAre: "This is Citrinitas, the dawn. The light's coming back into how you show up with people.",
      happening: "You don't have to pick between being loved and being yourself. The right people want the real you.",
      alchemist: "The Alchemist of Belonging lives in the North, in air. Its teaching: you're allowed to be held.",
      nextStep: "Ask someone for one specific kind of help this week. Then let them help. Don't rush to pay it back.",
      goingTo: "Soon you'll feel what it's like to be held without disappearing. It's worth the risk.",
      sitWith: "Where do I belong without having to abandon myself?",
    },
    rubedo: {
      opening: ["You said what you needed. And they stayed.", "You're belonging without abandoning yourself. Support goes both ways now. You give, and you let yourself receive."],
      whereYouAre: "This is Rubedo, the red stage. You're living it.",
      happening: "Some people might drift as you get more honest. That's not failure. That's your life sorting itself out.",
      alchemist: "The Alchemist of Belonging lives in the North, in air, and it carries your ancestors' breath too. Its teaching: you inherited resilience, not only pain.",
      nextStep: "Spend real time with the people and places where you feel most like yourself. Tend those roots.",
      goingTo: "The more held you feel, the more you'll have to give. Your people will feel it too.",
      sitWith: "Who helps me feel most like myself?",
    },
  },
  expand: {
    nigredo: {
      opening: ["The old you stopped working. And the new you isn't here yet.", "You might be trying to get back to who you used to be. Or you might be chasing the next big change, hoping it'll fix this in-between feeling."],
      whereYouAre: "The old alchemists called this Nigredo, the dark part. It can feel like being lost. You're probably not lost. You may just be between versions of yourself.",
      happening: "When the old way stops working, it's usually not because you failed. It's because you changed.",
      alchemist: "The Alchemist of Becoming lives at the center, where every direction meets. It's ether, the fifth element, the one that holds the other four. Its teaching: come back to yourself, not backwards.",
      nextStep: "Don't force clarity this week. When the “who am I now?” feeling comes up, put a hand on your chest and say, “I'm in between, and that's allowed.”",
      goingTo: "Soon you'll start to notice what's still true about you, underneath all the change.",
      sitWith: "What stopped working because I've changed?",
    },
    albedo: {
      opening: ["You're letting yourself miss who you used to be. And you're noticing that some of that person is still here.", "Not everything from before has to go. Some of it was always yours."],
      whereYouAre: "This is Albedo, the clearing. You can see what to keep and what to leave behind.",
      happening: "You can reclaim who you were without trying to become who you were. Those aren't the same thing.",
      alchemist: "The Alchemist of Becoming lives at the center, in ether. Its teaching: there's more of you to remember.",
      nextStep: "Write down a few things from your past self you want to bring with you. Qualities, not circumstances. The way you laughed, maybe, or how brave you used to be.",
      goingTo: "Soon you'll see that the old way didn't fail you. You outgrew it.",
      sitWith: "What am I being asked to remember?",
    },
    citrinitas: {
      opening: ["You're not lost. You've changed. And now you can see it.", "The old way didn't fail you. You outgrew it. That changes how this whole season feels."],
      whereYouAre: "This is Citrinitas, the dawn. You're starting to see who you're becoming.",
      happening: "You don't need the whole plan. You just need the next step that fits who you are now.",
      alchemist: "The Alchemist of Becoming lives at the center, in ether. Its teaching: the old system may not be failing. You may have outgrown it.",
      nextStep: "Try one small experiment that fits the person you are now. Keep it low stakes, and notice how it feels.",
      goingTo: "Bit by bit, you'll start living as who you are now. It won't feel like a costume.",
      sitWith: "What fits the person I am today?",
    },
    rubedo: {
      opening: ["You came back to yourself. Not backwards. Forward.", "You're living as who you are now. You're not chasing an old version of you, and you're not running to the next thing either."],
      whereYouAre: "This is Rubedo, the red stage. At the center of the Compass, it's the closest thing to what the old alchemists called the Philosopher's Stone. Not perfection. Wholeness.",
      happening: "You'll keep changing. That's the point. Becoming doesn't end, and that's good news.",
      alchemist: "The Alchemist of Becoming lives at the center, in ether. Its teaching: you are not finished.",
      nextStep: "Come back to center often. A quiet morning or a long walk. Check in with who you are today.",
      goingTo: "A new season will find you. When it does, the Compass will be here.",
      sitWith: "Who am I becoming next?",
    },
  },
};

/* ── Questions ───────────────────────────────────────────────────── */

type Option = { label: string; direction: DirectionKey; image?: string };
export type Question = { prompt: string; options: Option[] };

const option = (label: string, direction: DirectionKey): Option => ({ label, direction });
const plateOption = (label: string, direction: DirectionKey): Option => ({ label, direction, image: resultMap[direction].plate });

export const questions: Question[] = [
  { prompt: "What are you craving most right now?", options: [option("Deep rest and replenishment", "nourish"), option("Room to breathe and let go", "release"), option("Permission to be fully seen", "shine"), option("Genuine companionship", "connect"), option("A doorway into something new", "expand")] },
  { prompt: "Which feeling has been visiting you most often?", options: [option("Tenderness", "nourish"), option("Completion", "release"), option("Creative fire", "shine"), option("Longing for belonging", "connect"), option("Restless possibility", "expand")] },
  { prompt: "Where does your attention naturally go?", options: [option("Toward my body and its needs", "nourish"), option("Toward what I am ready to clear", "release"), option("Toward what I want to express", "shine"), option("Toward the people I care about", "connect"), option("Toward the horizon", "expand")] },
  { prompt: "What would feel like relief?", options: [option("A slower, gentler rhythm", "nourish"), option("Closing an unfinished chapter", "release"), option("Speaking without shrinking", "shine"), option("Being held and understood", "connect"), option("Having space to experiment", "expand")] },
  { prompt: "Which inner voice is getting louder?", options: [option("Care for yourself", "nourish"), option("You can put this down", "release"), option("Let them see you", "shine"), option("You do not have to do this alone", "connect"), option("There is more for you", "expand")] },
  { prompt: "If you could choose one medicine for this moment, what would it be?", options: [option("Warmth", "nourish"), option("A clean ending", "release"), option("Courage", "shine"), option("Community", "connect"), option("Wonder", "expand")] },
  { prompt: "What kind of movement feels most honest?", options: [option("Turning inward", "nourish"), option("Exhaling and unclenching", "release"), option("Stepping forward", "shine"), option("Reaching out", "connect"), option("Opening wider", "expand")] },
  { prompt: "What do you want to trust more deeply?", options: [option("My body’s timing", "nourish"), option("The wisdom of endings", "release"), option("My own voice", "shine"), option("The support around me", "connect"), option("The unknown", "expand")] },
  { prompt: "Without overthinking, choose the image that calls to you.", options: [plateOption("A crescent moon with drops of water", "nourish"), plateOption("A toad among roots and crystals", "release"), plateOption("A phoenix rising from flame", "shine"), plateOption("Winged Mercury", "connect"), plateOption("A serpent circling the sun and moon", "expand")] },
];

type StageOption = { label: string; stage: StageKey };
export type StageQuestion = { prompt: string; options: StageOption[] };

export const stageQuestions: StageQuestion[] = [
  {
    prompt: "Think about what's been asking for your attention. How clear does it feel?",
    options: [
      { label: "Foggy. I just know something's off.", stage: "nigredo" },
      { label: "It's settling. I can name it now.", stage: "albedo" },
      { label: "I can see the pattern clearly.", stage: "citrinitas" },
      { label: "I'm already doing things differently.", stage: "rubedo" },
    ],
  },
  {
    prompt: "When you think about it, how does it feel in your body?",
    options: [
      { label: "Heavy or tight", stage: "nigredo" },
      { label: "Softer. Something's moving.", stage: "albedo" },
      { label: "Lighter, more awake", stage: "citrinitas" },
      { label: "Steady", stage: "rubedo" },
    ],
  },
  {
    prompt: "What would help you most right now?",
    options: [
      { label: "Space to not decide anything yet", stage: "nigredo" },
      { label: "Room to feel it", stage: "albedo" },
      { label: "A clear next step", stage: "citrinitas" },
      { label: "Support to keep going", stage: "rubedo" },
    ],
  },
];

/* ── Scoring ─────────────────────────────────────────────────────── */

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

/** Most-picked stage wins. A tie goes to the earlier stage: it's kinder to under-read progress. */
export function calculateStage(answers: StageKey[]): StageKey {
  const counts = Object.fromEntries(stages.map((key) => [key, 0])) as Record<StageKey, number>;
  answers.forEach((answer) => { counts[answer] += 1; });
  return [...stages].sort((a, b) => counts[b] - counts[a] || stages.indexOf(a) - stages.indexOf(b))[0];
}

/** The story box can move the stage one step at most. It never overrides the answers. */
export function blendStage(fromAnswers: StageKey, suggested: StageKey | null | undefined): StageKey {
  if (!suggested || !stages.includes(suggested)) return fromAnswers;
  const gap = stages.indexOf(suggested) - stages.indexOf(fromAnswers);
  return Math.abs(gap) <= 1 ? suggested : fromAnswers;
}
