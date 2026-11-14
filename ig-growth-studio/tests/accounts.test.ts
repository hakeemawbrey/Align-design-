import { createClient } from "@libsql/client";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  addFromPendingLogin,
  getAccount,
  getPendingLogin,
  getSetting,
  schemaVersion,
  listAccounts,
  listNiche,
  listPosts,
  listSnapshots,
  openDb,
  removeAccount,
  savePendingLogin,
  setActiveAccount,
  upsertAccounts,
} from "../src/lib/db";

const acct = (id: string, username: string, token = "T") => ({ igUserId: id, username, pageName: username, token, tokenExpiresAt: null });

describe("accounts", () => {
  it("adds accounts without dropping existing ones and refreshes tokens", async () => {
    const db = await openDb(":memory:");
    await upsertAccounts(db, [acct("1", "bev"), acct("2", "atsign")]);
    await upsertAccounts(db, [acct("3", "comealign", "T2"), acct("1", "bev", "T2")]);
    expect((await listAccounts(db)).map((a) => a.username).sort()).toEqual(["atsign", "bev", "comealign"]);
    expect((await getAccount(db, "1"))!.token).toBe("T2");
    expect((await getAccount(db, "2"))!.token).toBe("T");
  });

  it("finds accounts by ID or username and tracks the selected one", async () => {
    const db = await openDb(":memory:");
    await upsertAccounts(db, [acct("1", "bev"), acct("3", "ComeAlign")]);
    expect((await getAccount(db, "@comealign"))!.igUserId).toBe("3");
    expect((await getAccount(db))!.igUserId).toBe("1"); // first added when nothing is selected
    await setActiveAccount(db, "3");
    expect((await getAccount(db))!.igUserId).toBe("3");
    await setActiveAccount(db, "nope");
    expect((await getAccount(db))!.igUserId).toBe("3");
    await removeAccount(db, "3");
    expect((await getAccount(db))!.igUserId).toBe("1");
  });
});

describe("migration from the single-account database", () => {
  it("moves the connected account, linked accounts, posts, niche list and snapshots over", async () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "igs-")), "old.db");
    const old = createClient({ url: `file:${file}` });
    await old.executeMultiple(`
      CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, media_url TEXT NOT NULL,
        caption TEXT NOT NULL DEFAULT '', share_to_feed INTEGER NOT NULL DEFAULT 1, scheduled_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'scheduled', container_id TEXT, ig_media_id TEXT, permalink TEXT, error TEXT,
        attempts INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT '');
      CREATE TABLE niche_accounts (username TEXT PRIMARY KEY, added_at TEXT NOT NULL DEFAULT '');
      CREATE TABLE likes (target_id TEXT PRIMARY KEY, target_type TEXT NOT NULL, liked_at TEXT NOT NULL, unliked_at TEXT);
      CREATE TABLE follower_snapshots (day TEXT PRIMARY KEY, followers INTEGER NOT NULL, follows INTEGER, media_count INTEGER);
    `);
    const set = (k: string, v: string) => old.execute({ sql: "INSERT INTO settings VALUES (?, ?)", args: [k, v] });
    await set("account", JSON.stringify({ igUserId: "3", username: "comealign", token: "TOK", tokenExpiresAt: "2027-01-02T00:00:00Z" }));
    await set("user_token", JSON.stringify({ token: "TOK", expiresAt: "2027-01-02T00:00:00Z" }));
    await set(
      "linked_accounts",
      JSON.stringify([
        { igUserId: "3", username: "comealign", pageName: "Come Align" },
        { igUserId: "1", username: "bev", pageName: "Bevbabes" },
      ]),
    );
    await old.execute("INSERT INTO posts (type, media_url, scheduled_at) VALUES ('IMAGE', 'https://x/a.jpg', '2026-11-10T00:00:00Z')");
    await old.execute("INSERT INTO niche_accounts (username) VALUES ('rival')");
    await old.execute("INSERT INTO follower_snapshots VALUES ('2026-11-03', 24, 11, 0)");
    old.close();

    const db = await openDb(`file:${file}`);
    expect(await schemaVersion(db)).toBe(8);
    expect((await listAccounts(db)).map((a) => a.username).sort()).toEqual(["bev", "comealign"]);
    expect((await getAccount(db))!.username).toBe("comealign");
    expect((await getAccount(db, "bev"))!.pageName).toBe("Bevbabes");
    expect((await listPosts(db))[0].ig_user_id).toBe("3");
    expect(await listNiche(db, "3")).toEqual(["rival"]);
    expect(await listSnapshots(db, "3")).toEqual([{ day: "2026-11-03", followers: 24 }]);
    expect(await getSetting(db, "user_token")).toBeNull();
    db.close();

    // Opening again is a no-op.
    const again = await openDb(`file:${file}`);
    expect(await listAccounts(again)).toHaveLength(2);
    again.close();
  });
});

describe("choosing accounts after login", () => {
  const found = [
    { igUserId: "7", username: "star_talk.md", pageName: "Zodiac (business portfolio)" },
    { igUserId: "8", username: "highasakitebook", pageName: "Shopify (business portfolio)" },
  ];

  it("adds only the ticked accounts with the new token, then clears the list", async () => {
    const db = await openDb(":memory:");
    await upsertAccounts(db, [acct("1", "comealign")]);
    await savePendingLogin(db, { token: "NEW", expiresAt: null, accounts: found });
    expect(await addFromPendingLogin(db, ["8"])).toEqual(["highasakitebook"]);
    expect((await listAccounts(db)).map((a) => a.username)).toEqual(["comealign", "highasakitebook"]);
    expect((await getAccount(db, "8"))!.token).toBe("NEW");
    expect((await getAccount(db))!.username).toBe("comealign"); // selection unchanged
    expect(await getPendingLogin(db)).toBeNull();
    expect(await addFromPendingLogin(db, ["7"])).toEqual([]); // nothing left to add
  });

  it("selects the first added account when none were connected", async () => {
    const db = await openDb(":memory:");
    await savePendingLogin(db, { token: "T", expiresAt: null, accounts: found });
    await addFromPendingLogin(db, ["7", "8"]);
    expect((await getAccount(db))!.username).toBe("star_talk.md");
  });

  it("expires after 30 minutes", async () => {
    const db = await openDb(":memory:");
    await savePendingLogin(db, { token: "T", expiresAt: null, accounts: found });
    expect(await getPendingLogin(db, new Date(Date.now() + 31 * 60_000))).toBeNull();
    expect(await getPendingLogin(db)).toBeNull();
  });
});

describe("moving data to the cloud", () => {
  it("exports a database and imports it into an empty one, refusing a non-empty target", async () => {
    const { exportDump, importDump } = await import("../src/lib/dump");
    const src = await openDb(":memory:");
    await upsertAccounts(src, [acct("1", "comealign")]);
    await setActiveAccount(src, "1");
    const dump = await exportDump(src);
    const dst = await openDb(":memory:");
    expect((await importDump(dst, dump, { dryRun: true })).ok).toBe(true);
    expect(await listAccounts(dst)).toHaveLength(0);
    const res = await importDump(dst, dump);
    expect(res.ok).toBe(true);
    expect((await getAccount(dst))!.username).toBe("comealign");
    expect((await importDump(dst, dump)).ok).toBe(false);
    expect((await importDump(dst, dump, { replace: true })).ok).toBe(true);
    expect(await listAccounts(dst)).toHaveLength(1);
  });
});
