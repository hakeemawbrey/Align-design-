/**
 * Writes what the Analyze page knows as compact JSON, for the Claude ideas page:
 *
 *   npm run --silent analysis -- [days] > out.json        # default 30 days
 *
 * One block for all accounts plus one per account: the patterns, and the top and bottom Reels with their titles,
 * the start of each caption and what each video is. View counts only; no tokens, links or personal data.
 */
import fs from "node:fs";
import path from "node:path";
import { type Analysis, type Scored } from "../src/lib/analysis";
import { analyse, scoreReels } from "../src/lib/analysis";
import { loadAnalysis, loadAnalysisInputs } from "../src/lib/analysisData";
import { compareRounds, listRounds } from "../src/lib/analysisRounds";
import { listAccounts, openDb } from "../src/lib/db";
import { hookOf } from "../src/lib/analysis";
import { getCreator, linkKey, listCreators, postStructure, summarise, topForScripts } from "../src/lib/research";

const reel = (s: Scored, captions: Map<number, string>) => ({
  title: s.title,
  caption: (captions.get(s.postId) ?? "").replace(/\s+/g, " ").slice(0, 220),
  account: s.account,
  timesUsual: Number(s.index.toFixed(2)),
  viewsAt24h: s.views24,
  saves: s.saves,
  shares: s.shares,
  ...s.features,
});

function block(a: Analysis, captions: Map<number, string>) {
  return {
    reels: a.reels,
    hitRate: Number(a.hitRate.toFixed(3)),
    working: a.working,
    holdingBack: a.dragging,
    learnings: a.learnings.map(({ weight: _w, ...l }) => l),
    titleWords: a.words,
    byDimension: a.dimensions.map((d) => ({
      dimension: d.label,
      groups: d.groups.slice(0, 12).map((g) => ({
        value: g.value,
        reels: g.count,
        typicalTimesUsual: Number(g.index.toFixed(2)),
        hitRate: Number(g.hitRate.toFixed(2)),
        savesPer1k: Number(g.savesPer1k.toFixed(1)),
        sharesPer1k: Number(g.sharesPer1k.toFixed(1)),
      })),
    })),
    topReels: a.top.map((s) => reel(s, captions)),
    mostSaved: a.topSaves.slice(0, 5).map((s) => reel(s, captions)),
    mostShared: a.topShares.slice(0, 5).map((s) => reel(s, captions)),
    bottomReels: a.bottom.map((s) => reel(s, captions)),
  };
}

async function main() {
  const days = Number(process.argv[2] ?? 30) || 30;
  const db = await openDb(`file:${path.join(__dirname, "..", "data", "studio.db")}`);
  const captions = new Map(
    (await db.execute("SELECT id, caption FROM posts WHERE status = 'published'")).rows.map((r) => [Number(r.id), String(r.caption ?? "")]),
  );
  const accounts = [];
  for (const a of await listAccounts(db)) {
    const analysis = await loadAnalysis(db, { days, igUserId: a.igUserId });
    if (analysis.reels) accounts.push({ account: a.username, ...block(analysis, captions) });
  }
  const scoreAll = scoreReels(await loadAnalysisInputs(db, { days }));
  const allAnalysis = analyse(scoreAll);
  // What changed between the last two saved rounds for this period, so ideas can follow the trend.
  const rounds = (await listRounds(db, 60)).filter((r) => r.days === days);
  const since = (acct?: string) => {
    const [cur, prev] = rounds.map((r) => (acct ? r.summary.accounts[acct] : r.summary.all));
    const c = cur ? compareRounds(prev, cur) : null;
    return c && rounds[1]
      ? { comparedWith: rounds[1].at, ...c, newHits: c.newHits.map((t) => ({ title: t.title, account: t.account, timesUsual: Number(t.index.toFixed(2)) })) }
      : null;
  };
  for (const a of accounts) Object.assign(a, { sinceLastRound: since(a.account) });
  // Every Reel, compact, so Claude can look for patterns the summary doesn't list.
  const everyReel = scoreAll.map((x) => ({
    t: x.title,
    a: x.account,
    x: Number(x.index.toFixed(2)),
    f: x.features.format,
    s: x.features.sign ?? null,
    h: x.features.hook ?? null,
    e: x.features.ending ?? null,
    sv: x.saves,
    sh: x.shares,
  }));
  // Creators from the Research page, as structure only: never their captions, transcripts or on-screen words.
  const creators = listCreators().flatMap((c) => {
    const data = getCreator(c.handle);
    if (!data) return [];
    const sum = summarise(data.posts);
    return [
      {
        key: linkKey(c.handle),
        name: c.site === "facebook" ? c.name || c.handle : `@${c.handle}`,
        site: c.site,
        followers: c.followers,
        posts: data.posts.length,
        formats: sum.formats.filter((f) => f.count >= 3).slice(0, 8),
        topics: sum.topics.filter((t) => t.count >= 2).slice(0, 8),
        top: topForScripts(data.posts).map((p) => ({ key: linkKey(p.shortcode), ...postStructure(p, hookOf) })),
      },
    ];
  });
  // Align's voice for scripts (founder/data/align-brief.json).
  let voice: unknown = null;
  try {
    const brief = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "..", "founder", "data", "align-brief.json"), "utf8"));
    voice = {
      rules: brief.voice?.rules ?? [],
      banned: brief.voice?.banned ?? [],
      vocabulary: brief.voice?.vocabulary ?? [],
      coreMessages: brief.voice?.coreMessages ?? [],
      examples: (brief.voice?.examples ?? []).slice(0, 6),
      product: brief.product?.oneLiner ?? null,
      audience: brief.audience?.who ?? null,
      pains: brief.audience?.pains ?? [],
      facts: (brief.facts ?? []).slice(0, 20),
    };
  } catch {
    voice = null;
  }
  const out = {
    generatedAt: new Date().toISOString(),
    days,
    reels: everyReel,
    creators,
    voice,
    sinceLastRound: since(),
    howToRead:
      "timesUsual = views at 24 hours ÷ the median for the same account's Reels from nearby days (1.0 = usual). A hit is 2× or more. Saves and shares per 1,000 views.",
    all: block(allAnalysis, captions),
    accounts,
  };
  process.stdout.write(JSON.stringify(out));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
