import { describe, expect, it } from "vitest";
import { createPost, editQueuedPost, getPost, openDb, updatePost, upsertAccounts } from "../src/lib/db";
import { FB_DAILY_LIMIT, publishFacebookDue } from "../src/lib/facebook";
import { fakeGraph, graphError } from "./helpers";

const now = new Date("2026-11-05T12:00:00Z");
const earlier = new Date(now.getTime() - 60_000);

async function setup(pageName = "Star Advice") {
  const db = await openDb(":memory:");
  await upsertAccounts(db, [{ igUserId: "ig1", username: "star", pageName, token: "USER", tokenExpiresAt: null }]);
  return db;
}

const reel = (over: Partial<Parameters<typeof createPost>[1]> = {}) => ({
  igUserId: "ig1",
  type: "REELS" as const,
  mediaUrl: "https://example.com/v.mp4",
  caption: "hello",
  shareToFeed: true,
  scheduledAt: earlier,
  facebook: true,
  ...over,
});

function graph(extra: Record<string, () => unknown> = {}) {
  return fakeGraph({
    "GET me/accounts": () => ({ data: [{ id: "P1", name: "Star Advice", access_token: "PAGE", instagram_business_account: { id: "ig1" } }] }),
    "POST P1/video_reels": () => ({ video_id: "V1", success: true }),
    "POST /video-upload/v26.0/V1": () => ({ success: true }),
    "GET V1": () => ({ status: { video_status: "ready", publishing_phase: { status: "complete" } }, permalink_url: "/reel/123" }),
    ...extra,
  });
}

describe("Facebook cross-posting", () => {
  it("uploads a due Reel to the linked Page, then marks it published with its link", async () => {
    const db = await setup();
    const id = await createPost(db, reel());
    const notFb = await createPost(db, reel({ facebook: false }));
    const { client, calls } = graph();
    const opts = { now, userClient: () => client, pageClient: () => client };

    const first = await publishFacebookDue(db, opts);
    expect(first.started).toEqual([id]);
    const started = await getPost(db, id);
    expect(started?.fb_status).toBe("processing");
    expect(started?.fb_video_id).toBe("V1");
    const finish = calls.find((c) => c.path === "P1/video_reels" && c.params.upload_phase === "finish");
    expect(finish?.params).toMatchObject({ video_id: "V1", video_state: "PUBLISHED", description: "hello" });
    expect((await getPost(db, notFb))?.fb_status).toBeNull();

    const second = await publishFacebookDue(db, opts);
    expect(second.published).toEqual([id]);
    const done = await getPost(db, id);
    expect(done?.fb_status).toBe("published");
    expect(done?.fb_permalink).toBe("https://www.facebook.com/reel/123");
  });

  it("explains a missing permission and skips accounts without a Page or cancelled posts", async () => {
    const db = await setup();
    const id = await createPost(db, reel());
    const cancelled = await createPost(db, reel());
    await updatePost(db, cancelled, { status: "cancelled" });
    const { client } = graph({ "POST P1/video_reels": () => graphError(200, "Requires pages_manage_posts", 403) });
    const r = await publishFacebookDue(db, { now, userClient: () => client, pageClient: () => client });
    expect(r.failed).toEqual([id]);
    expect((await getPost(db, id))?.fb_error).toMatch(/Reconnect on the Settings page/);
    expect((await getPost(db, cancelled))?.fb_status).toBe("pending");

    const noPage = await setup();
    const p = await createPost(noPage, reel());
    const { client: c2 } = fakeGraph({ "GET me/accounts": () => ({ data: [] }) });
    await publishFacebookDue(noPage, { now, userClient: () => c2, pageClient: () => c2 });
    expect((await getPost(noPage, p))?.fb_error).toBe("@star has no Facebook Page linked");
  });

  it("holds uploads back at 30 per Page per 24 hours", async () => {
    const db = await setup();
    for (let i = 0; i < FB_DAILY_LIMIT; i++) {
      const old = await createPost(db, reel());
      await updatePost(db, old, { fb_status: "published", fb_started_at: new Date(now.getTime() - 3_600_000).toISOString() });
    }
    const id = await createPost(db, reel());
    const { client } = graph();
    const r = await publishFacebookDue(db, { now, userClient: () => client, pageClient: () => client });
    expect(r.waiting).toEqual([id]);
    expect((await getPost(db, id))?.fb_status).toBe("pending");
  });

  it("switches Facebook on and off for queued Reels only", async () => {
    const db = await setup();
    const id = await createPost(db, reel({ facebook: false, scheduledAt: new Date(now.getTime() + 3_600_000) }));
    expect(await editQueuedPost(db, id, { facebook: true }, now)).toBe(true);
    expect((await getPost(db, id))?.fb_status).toBe("pending");
    expect(await editQueuedPost(db, id, { facebook: false }, now)).toBe(true);
    expect((await getPost(db, id))?.fb_status).toBeNull();
    const img = await createPost(db, reel({ type: "IMAGE", scheduledAt: new Date(now.getTime() + 3_600_000) }));
    expect((await getPost(db, img))?.fb_status).toBeNull();
  });
});
