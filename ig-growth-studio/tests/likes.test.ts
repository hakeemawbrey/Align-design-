import { beforeEach, describe, expect, it } from "vitest";
import { type DB, openDb } from "../src/lib/db";
import { LikeCapReached, MIN_LIKE_INTERVAL_MS, likeOne, likedIds, likesToday, unlikeOne } from "../src/lib/likes";
import { fakeGraph } from "./helpers";

let db: DB;
beforeEach(async () => {
  db = await openDb(":memory:");
});

const graph = () =>
  fakeGraph({
    "POST 17841/likes": () => ({ success: true }),
    "DELETE 17841/likes": () => ({ success: true }),
  });

describe("likeOne", () => {
  it("calls POST /{ig-user-id}/likes with media_id", async () => {
    const { client, calls } = graph();
    await likeOne(db, client, "17841", { mediaId: "111" }, { cap: 5, now: new Date("2026-11-01T10:00:00Z") });
    expect(calls[0]).toMatchObject({ method: "POST", path: "17841/likes", params: { media_id: "111" } });
    expect((await likedIds(db, "17841")).has("111")).toBe(true);
  });

  it("skips posts already liked", async () => {
    const { client, calls } = graph();
    const t = new Date("2026-11-01T10:00:00Z");
    await likeOne(db, client, "17841", { mediaId: "111" }, { cap: 5, now: t });
    const res = await likeOne(db, client, "17841", { mediaId: "111" }, { cap: 5, now: new Date(t.getTime() + 60_000) });
    expect(res.alreadyLiked).toBe(true);
    expect(calls).toHaveLength(1);
  });

  it("enforces spacing between likes", async () => {
    const { client } = graph();
    const t = new Date("2026-11-01T10:00:00Z");
    await likeOne(db, client, "17841", { mediaId: "1" }, { cap: 5, now: t });
    await expect(
      likeOne(db, client, "17841", { mediaId: "2" }, { cap: 5, now: new Date(t.getTime() + MIN_LIKE_INTERVAL_MS - 1) }),
    ).rejects.toThrow(/Slow down/);
  });

  it("enforces the daily cap, counting unliked posts too, and resets next UTC day", async () => {
    const { client } = graph();
    let t = new Date("2026-11-01T10:00:00Z");
    const step = () => (t = new Date(t.getTime() + MIN_LIKE_INTERVAL_MS));
    await likeOne(db, client, "17841", { mediaId: "1" }, { cap: 2, now: t });
    await unlikeOne(db, client, "17841", { mediaId: "1" });
    await likeOne(db, client, "17841", { mediaId: "2" }, { cap: 2, now: step() });
    expect(await likesToday(db, "17841", t)).toBe(2);
    await expect(likeOne(db, client, "17841", { mediaId: "3" }, { cap: 2, now: step() })).rejects.toBeInstanceOf(
      LikeCapReached,
    );
    await likeOne(db, client, "17841", { mediaId: "3" }, { cap: 2, now: new Date("2026-11-02T00:00:05Z") });
  });

  it("counts the cap and spacing separately for each account", async () => {
    const { client } = fakeGraph({
      "POST 17841/likes": () => ({ success: true }),
      "POST 555/likes": () => ({ success: true }),
    });
    const t = new Date("2026-11-01T10:00:00Z");
    await likeOne(db, client, "17841", { mediaId: "1" }, { cap: 1, now: t });
    // Same moment, same post, other account: allowed.
    await likeOne(db, client, "555", { mediaId: "1" }, { cap: 1, now: t });
    expect(await likesToday(db, "17841", t)).toBe(1);
    expect(await likesToday(db, "555", t)).toBe(1);
    expect((await likedIds(db, "555")).has("1")).toBe(true);
  });

  it("requires exactly one target", async () => {
    const { client } = graph();
    expect(() => client.like("17841", {})).toThrow();
    expect(() => client.like("17841", { mediaId: "1", commentId: "2" })).toThrow();
  });
});
