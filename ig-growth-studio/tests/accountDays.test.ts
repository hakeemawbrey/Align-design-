import { describe, expect, it } from "vitest";
import { type Account, listAccountDays, openDb, upsertAccounts } from "../src/lib/db";
import { viewsPerDay } from "../src/lib/charts";
import { ACCOUNT_DAYS_BACK, saveAccountDays, saveAccountDaysIfDue } from "../src/lib/jobs";
import { fakeGraph, graphError } from "./helpers";

const account = { igUserId: "9", username: "star", token: "T", tokenExpiresAt: null, pageName: "" } as unknown as Account;
// Local noon, so "today" and the day keys don't depend on the machine's time zone.
const NOW = new Date(2026, 10, 16, 12, 0, 0);
const key = (back: number) => {
  const d = new Date(2026, 10, 16 - back);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

function graph() {
  return fakeGraph({
    // Views = the day of the month the window starts on, so each saved day can be checked.
    "GET 9/insights": (url) => {
      const day = new Date(Number(url.searchParams.get("since")) * 1000).getDate();
      return { data: [{ name: "views", total_value: { value: day } }, { name: "reach", total_value: { value: day * 2 } }] };
    },
  });
}

describe("account views per day", () => {
  it("saves each finished day of the last 30, one local day per request", async () => {
    const db = await openDb(":memory:");
    const { client, calls } = graph();
    expect(await saveAccountDays(db, account, NOW, client)).toBe(ACCOUNT_DAYS_BACK);
    const days = await listAccountDays(db, key(30));
    expect(days).toHaveLength(30);
    expect(days[0]).toMatchObject({ day: key(30), views: new Date(2026, 10, 16 - 30).getDate() });
    expect(days.at(-1)).toMatchObject({ day: key(1), views: 15, reach: 30 });
    // Today is never saved: the dashboard reads it live.
    expect(days.some((d) => d.day === key(0))).toBe(false);
    // Each request covers exactly local midnight to the next midnight.
    const p = calls[0].params; // newest day first
    expect(Number(p.until) - Number(p.since)).toBe(86_400);
    expect(Number(p.since) * 1000).toBe(new Date(2026, 10, 15).getTime());
  });

  it("only fetches days again while their numbers may still change", async () => {
    const db = await openDb(":memory:");
    const { client } = graph();
    await saveAccountDays(db, account, NOW, client);
    // An hour later: the 3 most recent days are refreshed, older ones are left alone.
    const { client: again, calls } = graph();
    expect(await saveAccountDays(db, account, new Date(NOW.getTime() + 3_600_000), again)).toBe(3);
    expect(calls).toHaveLength(3);
    // A day later the new day is added and the window moves on.
    const { client: next, calls: nextCalls } = graph();
    await saveAccountDays(db, account, new Date(2026, 10, 17, 12), next);
    expect(nextCalls.length).toBeGreaterThanOrEqual(1);
    expect((await listAccountDays(db, key(0))).map((d) => d.day)).toEqual([key(0)]);
  });

  it("runs every 6 hours, and soon after midnight when yesterday is missing", async () => {
    const db = await openDb(":memory:");
    expect(await saveAccountDaysIfDue(db, NOW)).toBe(0);
    expect(await saveAccountDaysIfDue(db, new Date(NOW.getTime() + 3_600_000))).toBeNull();
    expect(await saveAccountDaysIfDue(db, new Date(NOW.getTime() + 6 * 3_600_000))).toBe(0);
    // With an account whose yesterday isn't saved, it runs again (at most every 15 minutes).
    await upsertAccounts(db, [{ igUserId: "9", username: "star", pageName: "", token: "T", tokenExpiresAt: null }]);
    const t = NOW.getTime() + 6 * 3_600_000;
    expect(await saveAccountDaysIfDue(db, new Date(t + 5 * 60_000))).toBeNull();
    expect(await saveAccountDaysIfDue(db, new Date(t + 16 * 60_000))).not.toBeNull();
  });

  it("keeps going when one day fails, newest days first", async () => {
    const db = await openDb(":memory:");
    const bad = new Date(2026, 10, 10).getTime() / 1000;
    const { client } = fakeGraph({
      "GET 9/insights": (url) =>
        Number(url.searchParams.get("since")) === bad
          ? graphError(100, "No data")
          : { data: [{ name: "views", total_value: { value: 1 } }] },
    });
    expect(await saveAccountDays(db, account, NOW, client)).toBe(ACCOUNT_DAYS_BACK - 1);
    const days = (await listAccountDays(db, key(30))).map((d) => d.day);
    expect(days).toContain(key(1));
    expect(days).not.toContain(key(6));
  });

  it("builds the chart: saved days plus today live, trimming leading days with no views", () => {
    const days = ["2026-11-13", "2026-11-14", "2026-11-15", "2026-11-16"];
    const saved = [
      { igUserId: "a", day: "2026-11-14", views: 10 },
      { igUserId: "a", day: "2026-11-15", views: 0 },
      { igUserId: "b", day: "2026-11-15", views: 7 },
    ];
    expect(viewsPerDay(days, ["a", "b"], saved, [5, undefined])).toEqual({
      days: ["2026-11-14", "2026-11-15", "2026-11-16"],
      values: [
        [10, 0, 5],
        [null, 7, null],
      ],
    });
    expect(viewsPerDay(days, ["a"], [], [null]).days).toEqual(["2026-11-16"]);
    // Quiet accounts with saved zeros still get a chart.
    expect(viewsPerDay(days, ["a"], [{ igUserId: "a", day: "2026-11-14", views: 0 }], [0]).days).toEqual(["2026-11-14", "2026-11-15", "2026-11-16"]);
  });
});
