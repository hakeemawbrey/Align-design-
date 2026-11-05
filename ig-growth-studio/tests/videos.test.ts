import { describe, expect, it } from "vitest";
import { type Account, openDb, topVideos } from "../src/lib/db";
import { snapshotAccountVideos } from "../src/lib/jobs";
import { fakeGraph } from "./helpers";

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
      "GET a/insights": () => ({ data: [{ name: "views", total_value: { value: views.a } }, { name: "reach", total_value: { value: 8 } }] }),
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
    expect(await topVideos(db, { since: new Date("2026-11-01T00:00:00Z"), igUserId: "other" })).toEqual([]);
  });
});
