import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config";

export type DB = Database.Database;

export type PostStatus = "scheduled" | "processing" | "published" | "failed" | "cancelled";
export type PostType = "IMAGE" | "REELS";
/** How a Trial Reel graduates to followers: by hand in the Instagram app, or automatically if it performs well. */
export type TrialStrategy = "MANUAL" | "SS_PERFORMANCE";
export type PostSource = "you" | "claude";

export interface PostRow {
  id: number;
  ig_user_id: string;
  type: PostType;
  media_url: string;
  caption: string;
  share_to_feed: number;
  trial_strategy: TrialStrategy | null;
  source: PostSource;
  scheduled_at: string; // ISO UTC
  status: PostStatus;
  container_id: string | null;
  ig_media_id: string | null;
  permalink: string | null;
  error: string | null;
  attempts: number;
  created_at: string;
  updated_at: string;
}

export interface Account {
  igUserId: string;
  username: string;
  pageName: string;
  token: string;
  tokenExpiresAt: string | null;
}

/** Original single-account schema. Migrations below bring it up to date. */
const BASE_SCHEMA = `
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL CHECK (type IN ('IMAGE','REELS')),
  media_url TEXT NOT NULL,
  caption TEXT NOT NULL DEFAULT '',
  share_to_feed INTEGER NOT NULL DEFAULT 1,
  scheduled_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  container_id TEXT,
  ig_media_id TEXT,
  permalink TEXT,
  error TEXT,
  attempts INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS posts_due ON posts (status, scheduled_at);
CREATE TABLE IF NOT EXISTS niche_accounts (
  username TEXT PRIMARY KEY,
  added_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE TABLE IF NOT EXISTS likes (
  target_id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL CHECK (target_type IN ('media','comment')),
  liked_at TEXT NOT NULL,
  unliked_at TEXT
);
CREATE TABLE IF NOT EXISTS follower_snapshots (
  day TEXT PRIMARY KEY,
  followers INTEGER NOT NULL,
  follows INTEGER,
  media_count INTEGER
);
`;

const NOW_SQL = "(strftime('%Y-%m-%dT%H:%M:%fZ','now'))";

/** v1: several Instagram accounts. Every post, like, niche list and snapshot belongs to one account. */
function migrateToMultiAccount(db: DB) {
  db.exec(`
    CREATE TABLE accounts (
      ig_user_id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      page_name TEXT NOT NULL DEFAULT '',
      token TEXT NOT NULL,
      token_expires_at TEXT,
      added_at TEXT NOT NULL DEFAULT ${NOW_SQL}
    );
    CREATE TABLE reply_drafts (
      comment_id TEXT PRIMARY KEY,
      ig_user_id TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT ${NOW_SQL}
    );
  `);

  // Carry over the single connected account and the Pages it could see.
  const legacy = getSetting(db, "account");
  const linked = JSON.parse(getSetting(db, "linked_accounts") ?? "[]") as {
    igUserId: string;
    username: string;
    pageName?: string;
  }[];
  const user = JSON.parse(getSetting(db, "user_token") ?? "null") as { token: string; expiresAt: string | null } | null;
  const active = legacy ? (JSON.parse(legacy) as { igUserId: string; username: string; token: string; tokenExpiresAt: string | null }) : null;
  const insert = db.prepare(
    "INSERT OR REPLACE INTO accounts (ig_user_id, username, page_name, token, token_expires_at) VALUES (?, ?, ?, ?, ?)",
  );
  if (user) for (const a of linked) insert.run(a.igUserId, a.username, a.pageName ?? "", user.token, user.expiresAt);
  if (active && !linked.some((a) => a.igUserId === active.igUserId)) {
    insert.run(active.igUserId, active.username, "", active.token, active.tokenExpiresAt);
  }
  const owner = active?.igUserId ?? "";
  if (active) setSetting(db, "active_account", active.igUserId);
  for (const k of ["account", "linked_accounts", "user_token"]) setSetting(db, k, null);

  db.exec(`
    ALTER TABLE posts ADD COLUMN ig_user_id TEXT NOT NULL DEFAULT '';
    ALTER TABLE posts ADD COLUMN trial_strategy TEXT CHECK (trial_strategy IN ('MANUAL','SS_PERFORMANCE'));
    ALTER TABLE posts ADD COLUMN source TEXT NOT NULL DEFAULT 'you';
    CREATE INDEX posts_account ON posts (ig_user_id, scheduled_at);

    ALTER TABLE niche_accounts RENAME TO niche_v0;
    CREATE TABLE niche_accounts (
      ig_user_id TEXT NOT NULL,
      username TEXT NOT NULL,
      added_at TEXT NOT NULL DEFAULT ${NOW_SQL},
      PRIMARY KEY (ig_user_id, username)
    );
    ALTER TABLE likes RENAME TO likes_v0;
    CREATE TABLE likes (
      ig_user_id TEXT NOT NULL,
      target_id TEXT NOT NULL,
      target_type TEXT NOT NULL CHECK (target_type IN ('media','comment')),
      liked_at TEXT NOT NULL,
      unliked_at TEXT,
      PRIMARY KEY (ig_user_id, target_id)
    );
    ALTER TABLE follower_snapshots RENAME TO snapshots_v0;
    CREATE TABLE follower_snapshots (
      ig_user_id TEXT NOT NULL,
      day TEXT NOT NULL,
      followers INTEGER NOT NULL,
      follows INTEGER,
      media_count INTEGER,
      PRIMARY KEY (ig_user_id, day)
    );
  `);
  db.prepare("UPDATE posts SET ig_user_id = ? WHERE ig_user_id = ''").run(owner);
  db.prepare("INSERT INTO niche_accounts (ig_user_id, username, added_at) SELECT ?, username, added_at FROM niche_v0").run(owner);
  db.prepare(
    "INSERT INTO likes (ig_user_id, target_id, target_type, liked_at, unliked_at) SELECT ?, target_id, target_type, liked_at, unliked_at FROM likes_v0",
  ).run(owner);
  db.prepare(
    "INSERT INTO follower_snapshots (ig_user_id, day, followers, follows, media_count) SELECT ?, day, followers, follows, media_count FROM snapshots_v0",
  ).run(owner);
  db.exec("DROP TABLE niche_v0; DROP TABLE likes_v0; DROP TABLE snapshots_v0;");
}

const MIGRATIONS: ((db: DB) => void)[] = [migrateToMultiAccount];

function migrate(db: DB) {
  const version = db.pragma("user_version", { simple: true }) as number;
  for (let v = version; v < MIGRATIONS.length; v++) {
    db.transaction(() => {
      MIGRATIONS[v](db);
      db.pragma(`user_version = ${v + 1}`);
    })();
  }
}

export function openDb(file: string = config.databasePath): DB {
  if (file !== ":memory:") fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.exec(BASE_SCHEMA);
  migrate(db);
  return db;
}

let shared: DB | undefined;
/** Process-wide connection used by the web app and the worker. */
export function getDb(): DB {
  if (!shared) shared = openDb();
  return shared;
}

// ---- settings ----

export function getSetting(db: DB, key: string): string | null {
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSetting(db: DB, key: string, value: string | null) {
  if (value === null) db.prepare("DELETE FROM settings WHERE key = ?").run(key);
  else
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(
      key,
      value,
    );
}

// ---- accounts ----

interface AccountRow {
  ig_user_id: string;
  username: string;
  page_name: string;
  token: string;
  token_expires_at: string | null;
}

const toAccount = (r: AccountRow): Account => ({
  igUserId: r.ig_user_id,
  username: r.username,
  pageName: r.page_name,
  token: r.token,
  tokenExpiresAt: r.token_expires_at,
});

export function listAccounts(db: DB): Account[] {
  return (db.prepare("SELECT * FROM accounts ORDER BY added_at, rowid").all() as AccountRow[]).map(toAccount);
}

/**
 * One account by Instagram user ID or username (with or without "@").
 * Without a key, returns the active account (the one the pages show), or the first one.
 */
export function getAccount(db: DB, key?: string | null): Account | null {
  if (key) {
    const k = key.replace(/^@/, "");
    const row = db.prepare("SELECT * FROM accounts WHERE ig_user_id = ? OR lower(username) = lower(?)").get(k, k) as
      | AccountRow
      | undefined;
    return row ? toAccount(row) : null;
  }
  const active = getSetting(db, "active_account");
  if (active) {
    const a = getAccount(db, active);
    if (a) return a;
  }
  const first = db.prepare("SELECT * FROM accounts ORDER BY added_at, rowid LIMIT 1").get() as AccountRow | undefined;
  return first ? toAccount(first) : null;
}

/** Adds or refreshes accounts (from one Facebook login) without touching the others. */
export function upsertAccounts(db: DB, accounts: Account[]) {
  const stmt = db.prepare(
    `INSERT INTO accounts (ig_user_id, username, page_name, token, token_expires_at) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(ig_user_id) DO UPDATE SET username = excluded.username, page_name = excluded.page_name,
       token = excluded.token, token_expires_at = excluded.token_expires_at`,
  );
  db.transaction(() => {
    for (const a of accounts) stmt.run(a.igUserId, a.username, a.pageName, a.token, a.tokenExpiresAt);
  })();
}

export function setActiveAccount(db: DB, igUserId: string) {
  if (getAccount(db, igUserId)) setSetting(db, "active_account", igUserId);
}

/** Removes an account and cancels its queued posts. History (published posts, snapshots) is kept. */
export function removeAccount(db: DB, igUserId: string) {
  db.transaction(() => {
    db.prepare("DELETE FROM accounts WHERE ig_user_id = ?").run(igUserId);
    db.prepare(
      "UPDATE posts SET status = 'cancelled', error = 'Account removed', updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE ig_user_id = ? AND status = 'scheduled'",
    ).run(igUserId);
    db.prepare("DELETE FROM reply_drafts WHERE ig_user_id = ?").run(igUserId);
    if (getSetting(db, "active_account") === igUserId) setSetting(db, "active_account", null);
  })();
}

export function removeAllAccounts(db: DB) {
  for (const a of listAccounts(db)) removeAccount(db, a.igUserId);
}

// ---- posts ----

export interface NewPost {
  igUserId: string;
  type: PostType;
  mediaUrl: string;
  caption: string;
  shareToFeed: boolean;
  scheduledAt: Date;
  trial?: TrialStrategy | null;
  source?: PostSource;
}

export function createPost(db: DB, p: NewPost): number {
  const res = db
    .prepare(
      `INSERT INTO posts (ig_user_id, type, media_url, caption, share_to_feed, trial_strategy, source, scheduled_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
      p.igUserId,
      p.type,
      p.mediaUrl,
      p.caption,
      p.shareToFeed ? 1 : 0,
      p.type === "REELS" ? (p.trial ?? null) : null,
      p.source ?? "you",
      p.scheduledAt.toISOString(),
    );
  return Number(res.lastInsertRowid);
}

export function listPosts(db: DB, filter: { igUserId?: string; from?: Date; to?: Date } = {}): PostRow[] {
  const where: string[] = [];
  const args: string[] = [];
  if (filter.igUserId) {
    where.push("ig_user_id = ?");
    args.push(filter.igUserId);
  }
  if (filter.from) {
    where.push("scheduled_at >= ?");
    args.push(filter.from.toISOString());
  }
  if (filter.to) {
    where.push("scheduled_at < ?");
    args.push(filter.to.toISOString());
  }
  const sql = `SELECT * FROM posts ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY scheduled_at DESC`;
  return db.prepare(sql).all(...args) as PostRow[];
}

export function getPost(db: DB, id: number): PostRow | undefined {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow | undefined;
}

/** Posts that are due now, plus Reels whose container is still processing (all accounts). */
export function duePosts(db: DB, now: Date): PostRow[] {
  return db
    .prepare(
      `SELECT * FROM posts
       WHERE (status = 'scheduled' AND scheduled_at <= ?) OR status = 'processing'
       ORDER BY scheduled_at ASC`,
    )
    .all(now.toISOString()) as PostRow[];
}

export function updatePost(db: DB, id: number, fields: Partial<Omit<PostRow, "id" | "created_at">>) {
  const keys = Object.keys(fields) as (keyof typeof fields)[];
  if (keys.length === 0) return;
  const sets = keys.map((k) => `${k} = @${k}`).join(", ");
  db.prepare(`UPDATE posts SET ${sets}, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now') WHERE id = @id`).run({
    ...fields,
    id,
  });
}

// ---- niche accounts ----

export function listNiche(db: DB, igUserId: string): string[] {
  return (
    db.prepare("SELECT username FROM niche_accounts WHERE ig_user_id = ? ORDER BY username").all(igUserId) as {
      username: string;
    }[]
  ).map((r) => r.username);
}

export function addNiche(db: DB, igUserId: string, username: string) {
  db.prepare("INSERT OR IGNORE INTO niche_accounts (ig_user_id, username) VALUES (?, ?)").run(igUserId, username);
}

export function removeNiche(db: DB, igUserId: string, username: string) {
  db.prepare("DELETE FROM niche_accounts WHERE ig_user_id = ? AND username = ?").run(igUserId, username);
}

// ---- follower snapshots ----

export function saveSnapshot(
  db: DB,
  igUserId: string,
  day: string,
  followers: number,
  follows: number | null,
  mediaCount: number | null,
) {
  db.prepare(
    `INSERT INTO follower_snapshots (ig_user_id, day, followers, follows, media_count) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(ig_user_id, day) DO UPDATE SET followers = excluded.followers, follows = excluded.follows, media_count = excluded.media_count`,
  ).run(igUserId, day, followers, follows, mediaCount);
}

export function listSnapshots(db: DB, igUserId: string, limit = 90): { day: string; followers: number }[] {
  return (
    db
      .prepare("SELECT day, followers FROM follower_snapshots WHERE ig_user_id = ? ORDER BY day DESC LIMIT ?")
      .all(igUserId, limit) as { day: string; followers: number }[]
  ).reverse();
}

// ---- reply drafts (written by Claude, sent by you) ----

export function saveDraft(db: DB, d: { commentId: string; igUserId: string; text: string }) {
  db.prepare(
    `INSERT INTO reply_drafts (comment_id, ig_user_id, text) VALUES (?, ?, ?)
     ON CONFLICT(comment_id) DO UPDATE SET text = excluded.text, ig_user_id = excluded.ig_user_id, created_at = ${NOW_SQL}`,
  ).run(d.commentId, d.igUserId, d.text);
}

export function listDrafts(db: DB, igUserId: string): Map<string, string> {
  const rows = db.prepare("SELECT comment_id, text FROM reply_drafts WHERE ig_user_id = ?").all(igUserId) as {
    comment_id: string;
    text: string;
  }[];
  return new Map(rows.map((r) => [r.comment_id, r.text]));
}

export function deleteDraft(db: DB, commentId: string) {
  db.prepare("DELETE FROM reply_drafts WHERE comment_id = ?").run(commentId);
}
