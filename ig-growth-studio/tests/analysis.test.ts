import { describe, expect, it } from "vitest";
import { type AnalysisInput, analyse, featuresOf, groupBy, scoreReels } from "../src/lib/analysis";

const DAY = 86_400_000;
const T0 = Date.UTC(2026, 10, 1, 18);

/** A Reel posted `day` days after T0 with `views` at 24 hours. */
function reel(id: number, day: number, views: number, meta: Record<string, string | number> = {}, extra: Partial<AnalysisInput> = {}): AnalysisInput {
  const posted = T0 + day * DAY;
  return {
    postId: id,
    account: "star",
    postedAt: new Date(posted).toISOString(),
    trial: null,
    caption: "Short caption",
    permalink: null,
    audio: false,
    meta,
    history: [
      { at: new Date(posted + 2 * 3_600_000).toISOString(), views: Math.round(views / 4), reach: null, interactions: null, saves: 0, shares: 0 },
      { at: new Date(posted + 24 * 3_600_000).toISOString(), views, reach: null, interactions: null, saves: 3, shares: 1 },
    ],
    ...extra,
  };
}

describe("analysis", () => {
  it("compares each Reel with the same account's Reels from nearby days, so growth doesn't look like a better format", () => {
    // Week 1 the account gets ~100 views, week 3 ~1,000. A week-3 Reel at 1,000 is usual, not 10×.
    const early = Array.from({ length: 6 }, (_, i) => reel(i, i * 0.5, 100));
    const late = Array.from({ length: 6 }, (_, i) => reel(10 + i, 14 + i * 0.5, 1000));
    const scored = scoreReels([...early, ...late]);
    expect(scored.find((s) => s.postId === 12)!.index).toBeCloseTo(1);
    expect(scored.find((s) => s.postId === 2)!.index).toBeCloseTo(1);
  });

  it("leaves out Reels without a 24-hour count", () => {
    const young = reel(1, 0, 100);
    young.history = young.history.slice(0, 1);
    expect(scoreReels([young, reel(2, 0, 100), reel(3, 0, 100), reel(4, 0, 100)]).map((s) => s.postId)).toEqual([2, 3, 4]);
  });

  it("describes a Reel in plain labels", () => {
    const f = featuresOf(reel(1, 0, 10, { format: "rollcall", sign: "leo", theme: "align", ending: "callback", duration: 52 }, { trial: "MANUAL" }), "UTC");
    expect(f).toMatchObject({
      format: "All the signs (roll call)",
      sign: "Leo",
      theme: "Alignment",
      ending: "Callback",
      length: "45–60 s",
      reelType: "Trial Reel",
      timeOfDay: "Afternoon (3–7 PM)",
      music: "Own sound",
    });
    expect(featuresOf(reel(2, 0, 10, { drive_file: "Star Talk/08 Trends/Cute, Not an Ick/x.mp4" })).series).toBe("Trends › Cute, Not an Ick");
  });

  it("finds a format that lands hits across several days, and ignores one-day patterns", () => {
    const rows: AnalysisInput[] = [];
    let id = 0;
    for (let d = 0; d < 6; d++) {
      for (let k = 0; k < 4; k++) rows.push(reel(id++, d + k * 0.1, 100, { format: "solo" }));
      // Every other roll call is a hit.
      for (let k = 0; k < 2; k++) rows.push(reel(id++, d + 0.5 + k * 0.1, k === 0 ? 400 : 100, { format: "rollcall" }));
    }
    // One Monday-only group that did badly on a single day.
    for (let k = 0; k < 9; k++) rows.push(reel(id++, 7 + k * 0.01, 20, { format: "belike" }));
    const a = analyse(scoreReels(rows, "UTC"));
    const formats = groupBy(scoreReels(rows, "UTC"), "format");
    expect(formats.find((g) => g.value === "All the signs (roll call)")!.hitRate).toBeCloseTo(0.5);
    expect(a.working.map((f) => f.value)).toContain("All the signs (roll call)");
    expect(a.dragging.map((f) => f.value)).not.toContain('"Be like"');
    expect(a.top[0].features.format).toBe("All the signs (roll call)");
  });
});

import { compareRounds, saveDailyRoundIfDue, listRounds } from "../src/lib/analysisRounds";
import { openDb } from "../src/lib/db";

describe("analysis rounds", () => {
  const f = (value: string, index = 1.5) => ({ dimension: "Format", value, count: 10, index, hitRate: 0.2, days: 4, confidence: "moderate" as const });
  const block = (working: string[], dragging: string[], top: number[], reels = 100, hitRate = 0.05) => ({
    reels,
    hitRate,
    working: working.map((v) => f(v)),
    dragging: dragging.map((v) => f(v, 0.7)),
    top: top.map((postId) => ({ postId, account: "star", title: `Reel ${postId}`, index: 3, permalink: null })),
  });

  it("says what started and stopped standing out since the round before", () => {
    const c = compareRounds(block(["solo", "rollcall"], ["remix"], [1, 2]), block(["rollcall", "be like"], [], [2, 3], 130, 0.07))!;
    expect(c.reelsAdded).toBe(30);
    expect(c.hitRateChange).toBeCloseTo(0.02);
    expect(c.nowWorking.map((x) => x.value)).toEqual(["be like"]);
    expect(c.noLongerWorking.map((x) => x.value)).toEqual(["solo"]);
    expect(c.noLongerDragging.map((x) => x.value)).toEqual(["remix"]);
    expect(c.newHits.map((x) => x.postId)).toEqual([3]);
    expect(compareRounds(undefined, block([], [], []))).toBeNull();
  });

  it("saves one round a day, after 6 AM", async () => {
    const db = await openDb(":memory:");
    expect(await saveDailyRoundIfDue(db, new Date(2026, 10, 20, 5, 0))).toBe(false);
    expect(await saveDailyRoundIfDue(db, new Date(2026, 10, 20, 6, 5))).toBe(true);
    expect(await saveDailyRoundIfDue(db, new Date(2026, 10, 20, 18, 0))).toBe(false);
    expect(await saveDailyRoundIfDue(db, new Date(2026, 10, 21, 6, 1))).toBe(true);
    expect((await listRounds(db)).map((r) => r.source)).toEqual(["daily", "daily"]);
  });
});
