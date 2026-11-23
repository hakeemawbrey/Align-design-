import { describe, expect, it } from "vitest";
import { type ExperimentPost, at24Hours, summarise } from "../src/lib/experiment";

const snap = (hours: number, views: number, reach = views, interactions = 1) => ({
  at: new Date(Date.UTC(2026, 10, 5, hours)).toISOString(),
  views,
  reach,
  interactions,
});

const post = (id: number, group: "test" | "control", views: number, over: Partial<ExperimentPost> = {}): ExperimentPost => ({
  id,
  account: "star",
  trial: null,
  group,
  status: "published",
  postedAt: new Date(Date.UTC(2026, 10, 5, 0)).toISOString(),
  history: [snap(1, 5), snap(24, views)],
  ...over,
});

describe("experiment report", () => {
  it("uses the count nearest 24 hours and ignores posts not there yet", () => {
    const posted = new Date(Date.UTC(2026, 10, 5, 0)).toISOString();
    expect(at24Hours(posted, [snap(20, 1), snap(23, 2), snap(26, 3)])?.views).toBe(2);
    expect(at24Hours(posted, [snap(10, 1)])).toBeNull();
  });

  it("compares test and control at 24 hours and lists posts that did not publish", () => {
    const r = summarise(
      [post(1, "test", 200), post(2, "test", 100), post(3, "control", 100), post(4, "control", 50), post(5, "test", 0, { status: "failed", postedAt: null, history: [] })],
      new Date(),
    );
    expect(r.overall.test.posts).toBe(3);
    expect(r.overall.test.measuredAt24h).toBe(2);
    expect(r.overall.test.medianViews).toBe(150);
    expect(r.overall.control.medianViews).toBe(75);
    expect(r.overall.medianViewsLiftPct).toBe(100);
    expect(r.unpublished).toEqual([{ id: 5, group: "test", status: "failed" }]);
    expect(r.slices[0].slice).toBe("star · Reel");
  });
});
