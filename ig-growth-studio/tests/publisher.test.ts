import { beforeEach, describe, expect, it } from "vitest";
import { type DB, createPost, getPost, openDb, removeAccount, upsertAccounts } from "../src/lib/db";
import { PROCESSING_TIMEOUT_MS, publishDuePosts } from "../src/lib/publisher";
import { fakeGraph, fakeGraphFetch, graphError } from "./helpers";

const NOW = new Date("2026-11-01T12:00:00Z");
let db: DB;

beforeEach(() => {
  db = openDb(":memory:");
  upsertAccounts(db, [{ igUserId: "17841", username: "me", pageName: "Me", token: "TOKEN", tokenExpiresAt: null }]);
});

function schedule(type: "IMAGE" | "REELS", at = new Date(NOW.getTime() - 1000)) {
  return createPost(db, { igUserId: "17841", type, mediaUrl: "https://cdn.example.com/a.jpg", caption: "hi #test", shareToFeed: true, scheduledAt: at });
}

describe("publishDuePosts", () => {
  it("publishes a due image post end to end", async () => {
    const id = schedule("IMAGE");
    const { client, calls } = fakeGraph({
      "POST 17841/media": () => ({ id: "C1" }),
      "GET C1": () => ({ status_code: "FINISHED" }),
      "POST 17841/media_publish": () => ({ id: "M1" }),
      "GET M1": () => ({ id: "M1", permalink: "https://instagram.com/p/x" }),
    });
    const res = await publishDuePosts(db, { now: NOW, client });
    expect(res.published).toEqual([id]);
    const post = getPost(db, id)!;
    expect(post.status).toBe("published");
    expect(post.ig_media_id).toBe("M1");
    expect(post.permalink).toBe("https://instagram.com/p/x");
    expect(calls[0].params).toMatchObject({ image_url: "https://cdn.example.com/a.jpg", caption: "hi #test", access_token: "TOKEN" });
    expect(calls.find((c) => c.path === "17841/media_publish")?.params.creation_id).toBe("C1");
  });

  it("leaves future posts alone", async () => {
    const id = schedule("IMAGE", new Date(NOW.getTime() + 60_000));
    const { client, calls } = fakeGraph({});
    await publishDuePosts(db, { now: NOW, client });
    expect(calls).toHaveLength(0);
    expect(getPost(db, id)!.status).toBe("scheduled");
  });

  it("waits for a Reel to finish processing, then publishes it", async () => {
    const id = schedule("REELS");
    let status = "IN_PROGRESS";
    const { client, calls } = fakeGraph({
      "POST 17841/media": () => ({ id: "C2" }),
      "GET C2": () => ({ status_code: status }),
      "POST 17841/media_publish": () => ({ id: "M2" }),
      "GET M2": () => ({ id: "M2" }),
    });
    let res = await publishDuePosts(db, { now: NOW, client });
    expect(res.pending).toEqual([id]);
    expect(getPost(db, id)!.status).toBe("processing");
    expect(calls[0].params).toMatchObject({ media_type: "REELS", video_url: "https://cdn.example.com/a.jpg", share_to_feed: "true" });

    status = "FINISHED";
    res = await publishDuePosts(db, { now: new Date(NOW.getTime() + 60_000), client });
    expect(res.published).toEqual([id]);
    // The container is created once, not again on the second run.
    expect(calls.filter((c) => c.method === "POST" && c.path === "17841/media")).toHaveLength(1);
  });

  it("fails a Reel stuck processing past the timeout", async () => {
    const id = schedule("REELS");
    const { client } = fakeGraph({
      "POST 17841/media": () => ({ id: "C3" }),
      "GET C3": () => ({ status_code: "IN_PROGRESS" }),
    });
    await publishDuePosts(db, { now: NOW, client });
    const res = await publishDuePosts(db, { now: new Date(NOW.getTime() + PROCESSING_TIMEOUT_MS + 5000), client });
    expect(res.failed).toEqual([id]);
    expect(getPost(db, id)!.error).toMatch(/30 minutes/);
  });

  it("marks container errors as failed", async () => {
    const id = schedule("IMAGE");
    const { client } = fakeGraph({
      "POST 17841/media": () => ({ id: "C4" }),
      "GET C4": () => ({ status_code: "ERROR", status: "Unsupported format" }),
    });
    const res = await publishDuePosts(db, { now: NOW, client });
    expect(res.failed).toEqual([id]);
    expect(getPost(db, id)!.error).toContain("Unsupported format");
  });

  it("retries transient errors later, then gives up", async () => {
    const id = schedule("IMAGE");
    const { client } = fakeGraph({ "POST 17841/media": () => graphError(4, "Application request limit reached") });
    let t = NOW;
    for (let i = 0; i < 2; i++) {
      const res = await publishDuePosts(db, { now: t, client });
      expect(res.retried).toEqual([id]);
      const p = getPost(db, id)!;
      expect(p.status).toBe("scheduled");
      t = new Date(new Date(p.scheduled_at).getTime() + 1000);
    }
    const res = await publishDuePosts(db, { now: t, client });
    expect(res.failed).toEqual([id]);
    expect(getPost(db, id)!.attempts).toBe(3);
  });

  it("fails immediately on permanent errors", async () => {
    const id = schedule("IMAGE");
    const { client } = fakeGraph({ "POST 17841/media": () => graphError(100, "Invalid image_url") });
    const res = await publishDuePosts(db, { now: NOW, client });
    expect(res.failed).toEqual([id]);
    expect(getPost(db, id)!.error).toBe("Invalid image_url");
  });

  it("fails a post whose account is no longer connected, without calling Instagram", async () => {
    const id = schedule("IMAGE");
    db.prepare("DELETE FROM accounts").run();
    const { client, calls } = fakeGraph({});
    const res = await publishDuePosts(db, { now: NOW, client });
    expect(res.failed).toEqual([id]);
    expect(getPost(db, id)!.error).toMatch(/no longer connected/);
    expect(calls).toHaveLength(0);
  });

  it("removing an account cancels its queued posts", () => {
    const id = schedule("IMAGE", new Date(NOW.getTime() + 60_000));
    removeAccount(db, "17841");
    expect(getPost(db, id)!.status).toBe("cancelled");
  });

  it("creates Trial Reels with trial_params and without share_to_feed", async () => {
    const id = createPost(db, {
      igUserId: "17841",
      type: "REELS",
      mediaUrl: "https://cdn.example.com/a.mp4",
      caption: "trial",
      shareToFeed: true,
      trial: "SS_PERFORMANCE",
      scheduledAt: new Date(NOW.getTime() - 1000),
    });
    const { client, calls } = fakeGraph({
      "POST 17841/media": () => ({ id: "C9" }),
      "GET C9": () => ({ status_code: "FINISHED" }),
      "POST 17841/media_publish": () => ({ id: "M9" }),
      "GET M9": () => ({ id: "M9" }),
    });
    const res = await publishDuePosts(db, { now: NOW, client });
    expect(res.published).toEqual([id]);
    expect(JSON.parse(calls[0].params.trial_params)).toEqual({ graduation_strategy: "SS_PERFORMANCE" });
    expect(calls[0].params).not.toHaveProperty("share_to_feed");
    expect(calls[0].params.media_type).toBe("REELS");
  });

  it("ignores trial settings on image posts", () => {
    const id = createPost(db, {
      igUserId: "17841",
      type: "IMAGE",
      mediaUrl: "https://cdn.example.com/a.jpg",
      caption: "",
      shareToFeed: true,
      trial: "MANUAL",
      scheduledAt: NOW,
    });
    expect(getPost(db, id)!.trial_strategy).toBeNull();
  });
});

describe("several accounts", () => {
  it("publishes each post to its own account with that account's token", async () => {
    upsertAccounts(db, [{ igUserId: "999", username: "other", pageName: "Other", token: "TOKEN2", tokenExpiresAt: null }]);
    const a = schedule("IMAGE");
    const b = createPost(db, {
      igUserId: "999",
      type: "IMAGE",
      mediaUrl: "https://cdn.example.com/b.jpg",
      caption: "b",
      shareToFeed: true,
      scheduledAt: new Date(NOW.getTime() - 500),
    });
    const routes = (prefix: string) => ({
      [`POST ${prefix}/media`]: () => ({ id: `C${prefix}` }),
      [`GET C${prefix}`]: () => ({ status_code: "FINISHED" }),
      [`POST ${prefix}/media_publish`]: () => ({ id: `M${prefix}` }),
      [`GET M${prefix}`]: () => ({ id: `M${prefix}` }),
    });
    // No client override: the publisher builds one client per account token, so stub global fetch.
    const { fetchImpl, calls } = fakeGraphFetch({ ...routes("17841"), ...routes("999") });
    const realFetch = globalThis.fetch;
    globalThis.fetch = fetchImpl;
    try {
      const res = await publishDuePosts(db, { now: NOW });
      expect(res.published.sort()).toEqual([a, b].sort());
    } finally {
      globalThis.fetch = realFetch;
    }
    const tokenFor = (path: string) => calls.find((c) => c.path === path)?.params.access_token;
    expect(tokenFor("17841/media")).toBe("TOKEN");
    expect(tokenFor("999/media")).toBe("TOKEN2");
  });
});
