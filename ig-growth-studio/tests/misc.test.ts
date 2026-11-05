import { describe, expect, it } from "vitest";
import { GraphError } from "../src/lib/graph";
import { checkPassword, issueSession, verifySession } from "../src/lib/session";
import { localToUtc } from "../src/lib/time";
import { fakeGraph, graphError } from "./helpers";

describe("localToUtc", () => {
  it("applies the browser offset", () => {
    // New York in November is UTC-5 → getTimezoneOffset() = 300
    expect(localToUtc("2026-11-02T09:30", 300)?.toISOString()).toBe("2026-11-02T14:30:00.000Z");
    expect(localToUtc("2026-11-02T09:30", -60)?.toISOString()).toBe("2026-11-02T08:30:00.000Z");
  });
  it("rejects bad input", () => {
    expect(localToUtc("tomorrow", 0)).toBeNull();
  });
});

describe("session", () => {
  it("round-trips and rejects tampering, other passwords and old cookies", async () => {
    const now = Date.UTC(2026, 10, 1);
    const v = await issueSession("pw1", now);
    expect(await verifySession("pw1", v, now)).toBe(true);
    expect(await verifySession("pw2", v, now)).toBe(false);
    expect(await verifySession("pw1", v.replace(/.$/, (c) => (c === "A" ? "B" : "A")), now)).toBe(false);
    expect(await verifySession("pw1", v, now + 31 * 86_400_000)).toBe(false);
    expect(await verifySession("", v, now)).toBe(false);
  });
  it("checks passwords", async () => {
    expect(await checkPassword("secret", "secret")).toBe(true);
    expect(await checkPassword("secret", "Secret")).toBe(false);
    expect(await checkPassword("", "")).toBe(false);
  });
});

describe("GraphClient", () => {
  it("surfaces Meta error messages and codes", async () => {
    const { client } = fakeGraph({ "GET 1/insights": () => graphError(10, "Not enough permissions", 403) });
    const err = await client.mediaInsights("1").catch((e) => e);
    expect(err).toBeInstanceOf(GraphError);
    expect(err.code).toBe(10);
    expect(err.message).toBe("Not enough permissions");
  });
  it("flattens insights values", async () => {
    const { client } = fakeGraph({
      "GET 1/insights": () => ({ data: [{ name: "reach", values: [{ value: 40 }] }, { name: "shares", total_value: { value: 3 } }] }),
    });
    expect(await client.mediaInsights("1")).toEqual({ reach: 40, shares: 3 });
  });
  it("reads account totals for a time window", async () => {
    const { client, calls } = fakeGraph({
      "GET 9/insights": () => ({ data: [{ name: "views", total_value: { value: 1909 } }, { name: "reach", total_value: { value: 1400 } }] }),
    });
    const since = new Date("2026-11-04T06:00:00Z");
    const until = new Date("2026-11-05T01:00:00Z");
    expect(await client.accountTotals("9", since, until, ["views", "reach"])).toEqual({ views: 1909, reach: 1400 });
    expect(calls[0].params).toMatchObject({
      metric: "views,reach",
      metric_type: "total_value",
      period: "day",
      since: String(since.getTime() / 1000),
      until: String(until.getTime() / 1000),
    });
  });
});

describe("loginUrl", () => {
  it("uses config_id when META_LOGIN_CONFIG_ID is set, scope otherwise", async () => {
    const { loginUrl } = await import("../src/lib/graph");
    delete process.env.META_LOGIN_CONFIG_ID;
    expect(new URL(loginUrl("s", ["a", "b"])).searchParams.get("scope")).toBe("a,b");
    process.env.META_LOGIN_CONFIG_ID = "123";
    const u = new URL(loginUrl("s", ["a"]));
    expect(u.searchParams.get("config_id")).toBe("123");
    expect(u.searchParams.has("scope")).toBe(false);
    delete process.env.META_LOGIN_CONFIG_ID;
  });
});

describe("linkedInstagramAccounts", () => {
  it("combines Page-linked and business-portfolio accounts, follows paging and skips duplicates", async () => {
    const { client } = fakeGraph({
      "GET me/accounts": (url) =>
        url.searchParams.get("after") === "P2"
          ? { data: [{ id: "pg2", name: "Bevbabes", instagram_business_account: { id: "2", username: "bev" } }] }
          : {
              data: [
                { id: "pg1", name: "Come Align", instagram_business_account: { id: "1", username: "comealign" } },
                { id: "pg3", name: "No IG" },
              ],
              paging: { cursors: { after: "P2" }, next: "https://graph.facebook.com/next" },
            },
      "GET me/businesses": () => ({ data: [{ id: "B1", name: "Shopify Business Manager" }, { id: "B2", name: "Broken" }] }),
      "GET B1/owned_instagram_assets": () => ({
        data: [
          { id: "a1", ig_user_id: "3", ig_username: "highasakitebook" },
          { id: "a2", ig_user_id: "1", ig_username: "comealign" },
        ],
      }),
      "GET B1/client_instagram_assets": () => ({ data: [] }),
      "GET B2/owned_instagram_assets": () => graphError(200, "No permission"),
      "GET B2/client_instagram_assets": () => graphError(200, "No permission"),
    });
    expect(await client.linkedInstagramAccounts()).toEqual([
      { igUserId: "2", username: "bev", pageName: "Bevbabes" },
      { igUserId: "1", username: "comealign", pageName: "Come Align" },
      { igUserId: "3", username: "highasakitebook", pageName: "Shopify Business Manager (business portfolio)" },
    ]);
  });

  it("still returns Page-linked accounts when business portfolios cannot be read", async () => {
    const { client } = fakeGraph({
      "GET me/accounts": () => ({ data: [{ id: "pg1", name: "P", instagram_business_account: { id: "1", username: "a" } }] }),
      "GET me/businesses": () => graphError(10, "Missing business_management"),
    });
    expect((await client.linkedInstagramAccounts()).map((a) => a.username)).toEqual(["a"]);
  });
});

describe("hasCronKey", () => {
  it("accepts the key with copy-paste noise and rejects anything else", async () => {
    const { hasCronKey } = await import("../src/lib/cronAuth");
    expect(hasCronKey("abc123", "Bearer abc123", null)).toBe(true);
    expect(hasCronKey("abc123", " Bearer  abc123\n", null)).toBe(true);
    expect(hasCronKey("abc123", "Bearer Bearer abc123", null)).toBe(true);
    expect(hasCronKey("abc123", '"Bearer abc123"', null)).toBe(true);
    expect(hasCronKey("abc123", null, "abc123")).toBe(true);
    expect(hasCronKey("abc123", "Bearer abc12", null)).toBe(false);
    expect(hasCronKey("abc123", null, null)).toBe(false);
    expect(hasCronKey("", "Bearer ", null)).toBe(false);
  });
});
