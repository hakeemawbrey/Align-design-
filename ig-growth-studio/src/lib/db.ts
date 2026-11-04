import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config";

export type DB = Database.Database;

export type PostStatus = "scheduled" | "processing" | "published" | "failed" | "cancelled";
export type PostType = "IMAGE" | "REELS";

export interface PostRow {
  id: number;
  type: PostType;
  media_url: string;
  caption: string;
  share_to_feed: number;
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
  token: string;
  tokenExpiresAt: string | null;
}

const SCHEMA = `
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

export function openDb(file: string = config.databasePath): DB {
  if (file !== ":memory:") fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
  const db = new Database(file);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 5000");
  db.exec(SCHEMA);
  return db;
}

let shared: DB | undefined;
/** Process-wide connection used by the web app and the worker. */
export function getDb(): DB {
  if (!shared) shared = openDb();
  return shared;
}

// ---- settings / account ----

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

export function getAccount(db: DB): Account | null {
  const raw = getSetting(db, "account");
  return raw ? (JSON.parse(raw) as Account) : null;
}

export function saveAccount(db: DB, account: Account | null) {
  setSetting(db, "account", account ? JSON.stringify(account) : null);
}

// ---- posts ----

export function createPost(
  db: DB,
  p: { type: PostType; mediaUrl: string; caption: string; shareToFeed: boolean; scheduledAt: Date },
): number {
  const res = db
    .prepare("INSERT INTO posts (type, media_url, caption, share_to_feed, scheduled_at) VALUES (?, ?, ?, ?, ?)")
    .run(p.type, p.mediaUrl, p.caption, p.shareToFeed ? 1 : 0, p.scheduledAt.toISOString());
  return Number(res.lastInsertRowid);
}

export function listPosts(db: DB): PostRow[] {
  return db.prepare("SELECT * FROM posts ORDER BY scheduled_at DESC").all() as PostRow[];
}

export function getPost(db: DB, id: number): PostRow | undefined {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow | undefined;
}

/** Posts that are due now, plus Reels whose container is still processing. */
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

export function listNiche(db: DB): string[] {
  return (db.prepare("SELECT username FROM niche_accounts ORDER BY username").all() as { username: string }[]).map(
    (r) => r.username,
  );
}

export function addNiche(db: DB, username: string) {
  db.prepare("INSERT OR IGNORE INTO niche_accounts (username) VALUES (?)").run(username);
}

export function removeNiche(db: DB, username: string) {
  db.prepare("DELETE FROM niche_accounts WHERE username = ?").run(username);
}

// ---- follower snapshots ----

export function saveSnapshot(db: DB, day: string, followers: number, follows: number | null, mediaCount: number | null) {
  db.prepare(
    `INSERT INTO follower_snapshots (day, followers, follows, media_count) VALUES (?, ?, ?, ?)
     ON CONFLICT(day) DO UPDATE SET followers = excluded.followers, follows = excluded.follows, media_count = excluded.media_count`,
  ).run(day, followers, follows, mediaCount);
}

export function listSnapshots(db: DB, limit = 90): { day: string; followers: number }[] {
  return (
    db.prepare("SELECT day, followers FROM follower_snapshots ORDER BY day DESC LIMIT ?").all(limit) as {
      day: string;
      followers: number;
    }[]
  ).reverse();
}
