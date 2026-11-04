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
