import { describe, expect, it } from "vitest";
import { createPost, editQueuedPost, getPost, openDb, updatePost, upsertAccounts } from "../src/lib/db";
import { FB_DAILY_LIMIT, publishFacebookDue } from "../src/lib/facebook";
import { loginUrl } from "../src/lib/graph";
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
    "GET me/accounts": () => ({
      data: [{ id: "P1", name: "Star Advice", access_token: "PAGE", instagram_business_account: { id: "ig1" }, picture: { data: { url: "https://pic" } } }],
    }),
    "POST P1/video_reels": () => ({ video_id: "V1", success: true }),
    "POST /video-upload/v26.0/V1": () => ({ success: true }),
    "GET V1": () => ({ status: { video_status: "ready", publishing_phase: { status: "complete" } }, permalink_url: "/reel/123" }),
    ...extra,
  });
}

describe("Facebook Pages list", () => {
  it("merges the login's own Pages with portfolio Pages, without duplicates or failing on a portfolio error", async () => {
    const page = (id: string, ig?: string) => ({ id, name: `Page ${id}`, ...(ig ? { instagram_business_account: { id: ig, username: `u${ig}` } } : {}) });
    const { client } = fakeGraph({
      "GET me/accounts": () => ({ data: [page("1", "ig1")] }),
      "GET me/businesses": () => ({ data: [{ id: "b1" }, { id: "b2" }] }),
      "GET b1/owned_pages": () => ({ data: [page("1", "ig1"), page("2")] }),
      "GET b1/client_pages": () => ({ data: [] }),
      "GET b2/owned_pages": () => graphError(200, "no access", 403),
      "GET b2/client_pages": () => ({ data: [page("3", "ig3")] }),
    });
    const pages = await client.managedPages();
    expect(pages.map((p) => [p.id, p.instagramId])).toEqual([
      ["1", "ig1"],
      ["2", null],
      ["3", "ig3"],
    ]);
  });

  it("asks again for declined permissions only when the app lists its own scopes", () => {
    const old = process.env.META_LOGIN_CONFIG_ID;
    process.env.META_LOGIN_CONFIG_ID = "";
    expect(new URL(loginUrl("s", ["a"])).searchParams.get("auth_type")).toBe("rerequest");
    process.env.META_LOGIN_CONFIG_ID = "123";
    expect(new URL(loginUrl("s", ["a"])).searchParams.get("auth_type")).toBeNull();
    process.env.META_LOGIN_CONFIG_ID = old ?? "";
  });
});

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
    // Not allowed yet: the Reel waits (with an explanation) instead of failing.
    expect(r.waiting).toEqual([id]);
    const waiting = await getPost(db, id);
    expect(waiting?.fb_status).toBe("pending");
    expect(waiting?.fb_error).toMatch(/See Facebook Pages on the Settings page/);
    // Once it is more than 2 hours late it is skipped, so a backlog never floods the Page.
    const late = await publishFacebookDue(db, { now: new Date(now.getTime() + 3 * 3_600_000), userClient: () => client, pageClient: () => client });
    expect(late.failed).toContain(id);
    expect((await getPost(db, id))?.fb_error).toMatch(/^Skipped/);
    expect((await getPost(db, cancelled))?.fb_status).toBe("pending");

    const noPage = await setup();
    const p = await createPost(noPage, reel());
    const { client: c2 } = fakeGraph({ "GET me/accounts": () => ({ data: [] }) });
    await publishFacebookDue(noPage, { now, userClient: () => c2, pageClient: () => c2 });
    expect((await getPost(noPage, p))?.fb_error).toBe("@star has no Facebook Page linked");

    const expired = await setup();
    const e = await createPost(expired, reel());
    const { client: c3 } = graph({ "POST P1/video_reels": () => graphError(190, "Session expired", 400) });
    await publishFacebookDue(expired, { now, userClient: () => c3, pageClient: () => c3 });
    expect((await getPost(expired, e))?.fb_error).toMatch(/has expired/);
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
