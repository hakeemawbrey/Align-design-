/**
 * Turns ideas sent from the Reel Ideas Lab into a batch for the film farm (promo/posting/v3/FARM.md on the
 * claude/align-promo-video branch): one item per film, with a fresh id, the farm's account name, a music key and seed.
 */
export interface ProductionIdea {
  /** The idea's id in the Ideas Lab production queue. */
  docId: string;
  account: string;
  format: string;
  sign: string | null;
  hook: string;
  ending: string;
}

export interface BatchItem {
  id: string;
  account: "star_talk" | "star_advice";
  format: string;
  sign?: string;
  topic: string;
  music: { key: string; seed: number };
  ending: string;
}

const FORMATS: Record<string, string[]> = {
  star_talk: ["solo", "rollcall", "belike"],
  star_advice: ["advice-solo", "advice-rollcall"],
};
const SOLO = new Set(["solo", "advice-solo"]);
const ENDINGS = new Set(["callback", "lesson", "group", "card"]);
const SIGNS = new Set(["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"]);
const KEYS = ["C", "D", "E", "F", "G"];

/** Problems that would stop the farm making this idea, or null if it's fine. */
export function problemWith(i: ProductionIdea): string | null {
  const account = i.account.replace(/\.md$/, "");
  if (!FORMATS[account]) return `the farm doesn't make videos for @${i.account}`;
  if (!FORMATS[account].includes(i.format)) return `@${i.account} can't use the "${i.format}" format`;
  if (SOLO.has(i.format) && !SIGNS.has(String(i.sign ?? "").toLowerCase())) return "a one-sign film needs a sign";
  if (!i.hook.trim()) return "no hook";
  if (!ENDINGS.has(i.ending)) return `unknown ending "${i.ending}"`;
  return null;
}

/**
 * Builds the batch. Ids continue after the highest existing "i3t"/"i3a" number so they never clash with a film or
 * batch already on the branch; music keys rotate like the farm's own batches and seeds continue past the highest used.
 */
export function buildBatch(ideas: ProductionIdea[], existingIds: Iterable<string>, maxSeed: number) {
  const taken = new Set(existingIds);
  const next = { star_talk: 0, star_advice: 0 };
  for (const id of taken) {
    const m = id.match(/^i3([ta])(\d+)$/);
    if (m) {
      const k = m[1] === "t" ? "star_talk" : "star_advice";
      next[k] = Math.max(next[k], Number(m[2]));
    }
  }
  let seed = maxSeed;
  const items: (BatchItem & { docId: string })[] = [];
  const skipped: { docId: string; reason: string }[] = [];
  for (const i of ideas) {
    const reason = problemWith(i);
    if (reason) {
      skipped.push({ docId: i.docId, reason });
      continue;
    }
    const account = i.account.replace(/\.md$/, "") as "star_talk" | "star_advice";
    let id: string;
    do {
      next[account] += 1;
      id = `i3${account === "star_talk" ? "t" : "a"}${String(next[account]).padStart(4, "0")}`;
    } while (taken.has(id));
    taken.add(id);
    seed += 13;
    items.push({
      docId: i.docId,
      id,
      account,
      format: i.format,
      ...(SOLO.has(i.format) ? { sign: String(i.sign).toLowerCase() } : {}),
      topic: i.hook.trim().replace(/\s+/g, " ").slice(0, 90),
      music: { key: KEYS[(seed / 13) % KEYS.length | 0], seed },
      ending: i.ending,
    });
  }
  return { items, skipped };
}
