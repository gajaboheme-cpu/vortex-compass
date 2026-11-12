// A plain-language check that runs before anything else reads someone's story.
// It errs on the side of caution: a false alarm shows support links, which never hurts.

const crisisPatterns: RegExp[] = [
  /\bsuicid/i,
  /\bkill(ing)?\s+my\s?self\b/i,
  /\bend(ing)?\s+(it\s+all|my\s+life|things)\b/i,
  /\bwant(ed)?\s+to\s+die\b/i,
  /\b(don'?t|do\s+not)\s+want\s+to\s+(be\s+here|live|exist|wake\s+up)\b/i,
  /\bno\s+(reason|point)\s+(to|in)\s+(live|living|going\s+on)\b/i,
  /\bbetter\s+off\s+(dead|without\s+me)\b/i,
  /\bself[\s-]?harm/i,
  /\b(hurt|harm|cut|burn)(ing)?\s+my\s?self\b/i,
  /\boverdos/i,
  /\b(kill|hurt)\s+(him|her|them|someone|somebody|my\s+\w+)\b/i,
];

export function needsCrisisSupport(text: string | null | undefined): boolean {
  if (!text) return false;
  return crisisPatterns.some((pattern) => pattern.test(text));
}

export const STORY_MAX_LENGTH = 1200;
