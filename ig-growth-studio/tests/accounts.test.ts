import Database from "better-sqlite3";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  getAccount,
  listAccounts,
  listNiche,
  listPosts,
  listSnapshots,
  openDb,
  removeAccount,
  setActiveAccount,
  upsertAccounts,
} from "../src/lib/db";

const acct = (id: string, username: string, token = "T") => ({ igUserId: id, username, pageName: username, token, tokenExpiresAt: null });

describe("accounts", () => {
  it("adds accounts without dropping existing ones and refreshes tokens", () => {
    const db = openDb(":memory:");
    upsertAccounts(db, [acct("1", "bev"), acct("2", "atsign")]);
    upsertAccounts(db, [acct("3", "comealign", "T2"), acct("1", "bev", "T2")]);
    expect(listAccounts(db).map((a) => a.username).sort()).toEqual(["atsign", "bev", "comealign"]);
    expect(getAccount(db, "1")!.token).toBe("T2");
    expect(getAccount(db, "2")!.token).toBe("T");
  });

  it("finds accounts by ID or username and tracks the selected one", () => {
    const db = openDb(":memory:");
    upsertAccounts(db, [acct("1", "bev"), acct("3", "ComeAlign")]);
    expect(getAccount(db, "@comealign")!.igUserId).toBe("3");
    expect(getAccount(db)!.igUserId).toBe("1"); // first added when nothing is selected
    setActiveAccount(db, "3");
    expect(getAccount(db)!.igUserId).toBe("3");
    setActiveAccount(db, "nope");
    expect(getAccount(db)!.igUserId).toBe("3");
    removeAccount(db, "3");
    expect(getAccount(db)!.igUserId).toBe("1");
  });
});

describe("migration from the single-account database", () => {
  it("moves the connected account, linked accounts, posts, niche list and snapshots over", () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "igs-")), "old.db");
    const old = new Database(file);
    old.exec(`
      CREATE TABLE settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE posts (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, media_url TEXT NOT NULL,
        caption TEXT NOT NULL DEFAULT '', share_to_feed INTEGER NOT NULL DEFAULT 1, scheduled_at TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'scheduled', container_id TEXT, ig_media_id TEXT, permalink TEXT, error TEXT,
        attempts INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL DEFAULT '', updated_at TEXT NOT NULL DEFAULT '');
      CREATE TABLE niche_accounts (username TEXT PRIMARY KEY, added_at TEXT NOT NULL DEFAULT '');
      CREATE TABLE likes (target_id TEXT PRIMARY KEY, target_type TEXT NOT NULL, liked_at TEXT NOT NULL, unliked_at TEXT);
      CREATE TABLE follower_snapshots (day TEXT PRIMARY KEY, followers INTEGER NOT NULL, follows INTEGER, media_count INTEGER);
    `);
    const set = old.prepare("INSERT INTO settings VALUES (?, ?)");
    set.run("account", JSON.stringify({ igUserId: "3", username: "comealign", token: "TOK", tokenExpiresAt: "2027-01-02T00:00:00Z" }));
    set.run("user_token", JSON.stringify({ token: "TOK", expiresAt: "2027-01-02T00:00:00Z" }));
    set.run(
      "linked_accounts",
      JSON.stringify([
        { igUserId: "3", username: "comealign", pageName: "Come Align" },
        { igUserId: "1", username: "bev", pageName: "Bevbabes" },
      ]),
    );
    old.prepare("INSERT INTO posts (type, media_url, scheduled_at) VALUES ('IMAGE', 'https://x/a.jpg', '2026-11-10T00:00:00Z')").run();
    old.prepare("INSERT INTO niche_accounts (username) VALUES ('rival')").run();
    old.prepare("INSERT INTO follower_snapshots VALUES ('2026-11-03', 24, 11, 0)").run();
    old.close();

    const db = openDb(file);
    expect(db.pragma("user_version", { simple: true })).toBe(1);
    expect(listAccounts(db).map((a) => a.username).sort()).toEqual(["bev", "comealign"]);
    expect(getAccount(db)!.username).toBe("comealign");
    expect(getAccount(db, "bev")!.pageName).toBe("Bevbabes");
    expect(listPosts(db)[0].ig_user_id).toBe("3");
    expect(listNiche(db, "3")).toEqual(["rival"]);
    expect(listSnapshots(db, "3")).toEqual([{ day: "2026-11-03", followers: 24 }]);
    expect(db.prepare("SELECT value FROM settings WHERE key = 'user_token'").get()).toBeUndefined();
    db.close();

    // Opening again is a no-op.
    const again = openDb(file);
    expect(listAccounts(again)).toHaveLength(2);
    again.close();
  });
});
