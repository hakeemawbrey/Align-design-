import { describe, expect, it } from "vitest";
import { dayKey, dayRange, postsPerDay, postsPerHour } from "../src/lib/charts";
import type { PostRow } from "../src/lib/db";

const post = (over: Partial<PostRow>): PostRow =>
  ({ id: 1, ig_user_id: "a", status: "scheduled", scheduled_at: new Date().toISOString(), type: "REELS", ...over }) as PostRow;

describe("chart data", () => {
  const now = new Date(2026, 10, 4, 12, 0); // Nov 4, local noon

  it("builds local day ranges around today", () => {
    expect(dayRange(now, -1, 1)).toEqual(["2026-11-03", "2026-11-04", "2026-11-05"]);
    expect(dayKey(new Date(2026, 10, 30, 23, 59))).toBe("2026-11-30");
  });

  it("counts posts per day per group, ignoring failed and cancelled", () => {
    const days = dayRange(now, 0, 1);
    const at = (d: number, h: number) => new Date(2026, 10, d, h).toISOString();
    const posts = [
      post({ scheduled_at: at(4, 9), status: "published" }),
      post({ scheduled_at: at(5, 9) }),
      post({ scheduled_at: at(5, 10), ig_user_id: "b" }),
      post({ scheduled_at: at(5, 11), status: "failed" }),
      post({ scheduled_at: at(9, 11) }),
    ];
    expect(postsPerDay(posts, days, (p) => p.ig_user_id, ["a", "b"])).toEqual([
      [1, 1],
      [0, 1],
    ]);
  });

  it("counts upcoming scheduled posts per hour", () => {
    const posts = [
      post({ scheduled_at: new Date(2026, 10, 5, 18).toISOString() }),
      post({ scheduled_at: new Date(2026, 10, 6, 18, 30).toISOString() }),
      post({ scheduled_at: new Date(2026, 10, 3, 18).toISOString() }), // past
    ];
    const [hours] = postsPerHour(posts, now, () => "x", ["x"]);
    expect(hours[18]).toBe(2);
    expect(hours.reduce((t, n) => t + n, 0)).toBe(2);
  });
});
