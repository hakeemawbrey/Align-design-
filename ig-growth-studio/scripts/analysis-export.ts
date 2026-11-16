/**
 * Writes what the Analyze page knows as compact JSON, for the Claude ideas page:
 *
 *   npm run --silent analysis -- [days] > out.json        # default 30 days
 *
 * One block for all accounts plus one per account: the patterns, and the top and bottom Reels with their titles,
 * the start of each caption and what each video is. View counts only; no tokens, links or personal data.
 */
import path from "node:path";
import { type Analysis, type Scored } from "../src/lib/analysis";
import { loadAnalysis } from "../src/lib/analysisData";
import { listAccounts, openDb } from "../src/lib/db";

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
  const out = {
    generatedAt: new Date().toISOString(),
    days,
    howToRead:
      "timesUsual = views at 24 hours ÷ the median for the same account's Reels from nearby days (1.0 = usual). A hit is 2× or more. Saves and shares per 1,000 views.",
    all: block(await loadAnalysis(db, { days }), captions),
    accounts,
  };
  process.stdout.write(JSON.stringify(out));
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
