import { describe, expect, it } from "vitest";
import { type Account, openDb, topVideos, totalVideoViews } from "../src/lib/db";
import { snapshotAccountVideos } from "../src/lib/jobs";
import { fakeGraph, graphError } from "./helpers";

const account = { igUserId: "9", username: "star", token: "T", tokenExpiresAt: null, pageName: "" } as unknown as Account;

describe("video progress", () => {
  it("saves hourly counts for recent videos and ranks them by latest views", async () => {
    const db = await openDb(":memory:");
    const t0 = new Date("2026-11-04T12:00:00Z");
    let views: Record<string, number> = { a: 10, b: 50 };
    const { client } = fakeGraph({
      "GET 9/media": () => ({
        data: [
          { id: "a", media_type: "VIDEO", timestamp: "2026-11-04T10:00:00+0000", caption: "first one", permalink: "https://x/a" },
          { id: "b", media_type: "VIDEO", timestamp: "2026-11-04T11:00:00+0000", caption: "second" },
          { id: "c", media_type: "IMAGE", timestamp: "2026-11-04T11:00:00+0000" },
          { id: "old", media_type: "VIDEO", timestamp: "2026-10-01T11:00:00+0000" },
        ],
      }),
      "GET a/insights": () => ({
        data: [
          { name: "views", total_value: { value: views.a } },
          { name: "reach", total_value: { value: 8 } },
          { name: "saved", total_value: { value: 3 } },
          { name: "shares", total_value: { value: 2 } },
        ],
      }),
      "GET b/insights": () => ({ data: [{ name: "views", total_value: { value: views.b } }] }),
    });

    expect(await snapshotAccountVideos(db, account, t0, client)).toBe(2);
    views = { a: 200, b: 60 };
    await snapshotAccountVideos(db, account, new Date(t0.getTime() + 3_600_000), client);

    const top = await topVideos(db, { since: new Date("2026-11-01T00:00:00Z") });
    expect(top.map((v) => [v.mediaId, v.views])).toEqual([
      ["a", 200],
      ["b", 60],
    ]);
    expect(top[0].history.map((h) => h.views)).toEqual([10, 200]);
    expect(top[0].reach).toBe(8);
    const saved = await db.execute("SELECT saves, shares FROM media_snapshots WHERE media_id = 'a' LIMIT 1");
    expect([Number(saved.rows[0].saves), Number(saved.rows[0].shares)]).toEqual([3, 2]);
    expect(await topVideos(db, { since: new Date("2026-11-01T00:00:00Z"), igUserId: "other" })).toEqual([]);
    // Uses each video's latest count only, not every hourly count.
    expect(await totalVideoViews(db)).toEqual({ views: 260, videos: 2 });
    expect(await totalVideoViews(db, "9")).toEqual({ views: 260, videos: 2 });
    expect(await totalVideoViews(db, "other")).toEqual({ views: 0, videos: 0 });
  });

  it("keeps refreshing videos that left the hourly check, and stops only for deleted ones", async () => {
    const db = await openDb(":memory:");
    const t0 = new Date("2026-11-04T12:00:00Z");
    const HOUR = 3_600_000;
    const recent = [
      { id: "old", media_type: "VIDEO", timestamp: "2026-11-04T10:00:00+0000" },
      { id: "deleted", media_type: "VIDEO", timestamp: "2026-11-04T10:00:00+0000" },
      { id: "broken", media_type: "VIDEO", timestamp: "2026-11-04T10:00:00+0000" },
    ];
    let views = 10;
    let media = recent;
    let deleted = false;
    let broken = false;
    const count = () => ({ data: [{ name: "views", total_value: { value: views } }] });
    const { client, calls } = fakeGraph({
      "GET 9/media": () => ({ data: media }),
      "GET old/insights": count,
      "GET deleted/insights": () =>
        deleted ? new Response(JSON.stringify({ error: { message: "gone", code: 100, error_subcode: 33 } }), { status: 400 }) : count(),
      "GET broken/insights": () => (broken ? graphError(100, "not available") : count()),
    });
    const checks = (id: string) => calls.filter((c) => c.path === `${id}/insights`).length;
    const views_of = async (id: string) => (await topVideos(db, { since: new Date(0), limit: 10 })).find((v) => v.mediaId === id)?.views;

    await snapshotAccountVideos(db, account, t0, client);
    // All three fall out of the newest posts, and one is deleted.
    media = [];
    views = 500;
    deleted = true;
    broken = true;

    // Not due for an older-video refresh yet.
    await snapshotAccountVideos(db, account, new Date(t0.getTime() + HOUR), client);
    expect(checks("old")).toBe(1);
    expect(await views_of("old")).toBe(10);

    // Due: the survivor updates, the others keep their last count.
    const t7 = new Date(t0.getTime() + 7 * HOUR);
    expect(await snapshotAccountVideos(db, account, t7, client)).toBe(1);
    expect(await views_of("old")).toBe(500);
    expect(await views_of("deleted")).toBe(10);
    expect(await views_of("broken")).toBe(10);

    // The deleted video is never asked about again; a video that failed for another reason is retried.
    await snapshotAccountVideos(db, account, new Date(t0.getTime() + 14 * HOUR), client);
    expect(checks("deleted")).toBe(2);
    expect(checks("broken")).toBe(3);
    expect(checks("old")).toBe(3);
    expect(await totalVideoViews(db)).toEqual({ views: 520, videos: 3 });
  });

  it("refreshes older videos in limited batches, longest-waiting first", async () => {
    const db = await openDb(":memory:");
    const t0 = new Date("2026-11-04T12:00:00Z");
    const data = Array.from({ length: 60 }, (_, i) => ({ id: `v${i}`, media_type: "VIDEO", timestamp: "2026-11-04T10:00:00+0000" }));
    let media = data.slice(0, 50);
    const routes: Parameters<typeof fakeGraph>[0] = { "GET 9/media": () => ({ data: media }) };
    for (const v of data) routes[`GET ${v.id}/insights`] = () => ({ data: [{ name: "views", total_value: { value: 1 } }] });
    const { client } = fakeGraph(routes);

    await snapshotAccountVideos(db, account, t0, client);
    media = data.slice(50);
    await snapshotAccountVideos(db, account, new Date(t0.getTime() + 3_600_000), client);
    media = [];
    // 60 tracked, but no more than 50 older videos are checked in one run.
    expect(await snapshotAccountVideos(db, account, new Date(t0.getTime() + 7 * 3_600_000), client)).toBe(50);
  });
});
