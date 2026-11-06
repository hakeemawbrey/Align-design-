import { describe, expect, it } from "vitest";
import { type ReelHistory, cumulative, reelWeeks, rowRuns, topBy } from "../src/lib/report";

const count = (day: number, views: number, saves: number | null, shares: number | null) => ({
  at: new Date(Date.UTC(2026, 10, day)).toISOString(),
  views,
  reach: null,
  saves,
  shares,
});
const reel = (name: string, ...history: ReelHistory["history"]): ReelHistory => ({ name, permalink: null, history });

describe("weekly report", () => {
  const since = new Date(Date.UTC(2026, 10, 7));
  const reels = [
    reel("old.mp4", count(5, 100, 5, 1), count(9, 150, 9, 2)),
    reel("new.mp4", count(8, 40, 7, 9)),
    reel("before-saves.mp4", count(5, 10, null, null), count(9, 20, 3, null)),
    reel("no-counts.mp4"),
  ];

  it("counts only what each reel gained this week, and skips reels with no counts", () => {
    expect(reelWeeks(reels, since)).toEqual([
      { name: "old.mp4", permalink: null, views: 50, saves: 4, shares: 1 },
      { name: "new.mp4", permalink: null, views: 40, saves: 7, shares: 9 },
      { name: "before-saves.mp4", permalink: null, views: 10, saves: 3, shares: 0 },
    ]);
  });

  it("adds each reel's latest count once for the cumulative numbers", () => {
    expect(cumulative(reels)).toEqual({ reels: 3, views: 210, saves: 19, shares: 11 });
  });

  it("ranks by the chosen number and leaves out reels with none", () => {
    const weeks = reelWeeks(reels, since);
    expect(topBy(weeks, "saves").map((w) => w.name)).toEqual(["new.mp4", "old.mp4", "before-saves.mp4"]);
    expect(topBy(weeks, "shares").map((w) => w.name)).toEqual(["new.mp4", "old.mp4"]);
    expect(topBy(weeks, "saves", 1).map((w) => w.name)).toEqual(["new.mp4"]);
  });

  it("groups consecutive sheet rows into one write", () => {
    expect(rowRuns([{ row: 5, value: "c" }, { row: 2, value: "a" }, { row: 3, value: "b" }])).toEqual([
      { start: 2, values: ["a", "b"] },
      { start: 5, values: ["c"] },
    ]);
  });
});
