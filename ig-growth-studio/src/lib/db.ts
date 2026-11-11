import { type Client, type InStatement, createClient } from "@libsql/client";
import fs from "node:fs";
import path from "node:path";
import { config } from "./config";

/**
 * libSQL client: a local SQLite file in development (DATABASE_PATH), or a hosted Turso database in the
 * cloud (TURSO_DATABASE_URL + TURSO_AUTH_TOKEN). Every query is async.
 */
export type DB = Client;

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
  /** Reels: the frame (ms into the video) Instagram uses as the cover. Null = Instagram's default. */
  cover_offset_ms: number | null;
  /** Reels: the Instagram audio attached when it was published, or why none was (audio_error). */
  audio_id: string | null;
  audio_title: string | null;
  audio_error: string | null;
  source: PostSource;
  scheduled_at: string; // ISO UTC
  status: PostStatus;
  container_id: string | null;
  ig_media_id: string | null;
  permalink: string | null;
  error: string | null;
  attempts: number;
  /** Facebook Reel on the linked Page: null = not posting to Facebook; pending → processing → published | failed. */
  fb_status: FbStatus | null;
  fb_video_id: string | null;
  fb_permalink: string | null;
  fb_error: string | null;
  fb_attempts: number;
  /** When the Facebook upload started (for the 30-per-24-hours Page limit). */
  fb_started_at: string | null;
  started_at: string | null;
  created_at: string;
  updated_at: string;
}

export type FbStatus = "pending" | "processing" | "published" | "failed";

export interface Account {
  igUserId: string;
  username: string;
  pageName: string;
  token: string;
  tokenExpiresAt: string | null;
}

type Arg = string | number | bigint | null;

async function all<T>(db: DB, sql: string, args: Arg[] = []): Promise<T[]> {
  const rs = await db.execute({ sql, args });
  return rs.rows.map((r) => Object.fromEntries(rs.columns.map((c, i) => [c, r[i]]))) as T[];
}

async function one<T>(db: DB, sql: string, args: Arg[] = []): Promise<T | undefined> {
  return (await all<T>(db, sql, args))[0];
}

function run(db: DB, sql: string, args: Arg[] = []) {
  return db.execute({ sql, args });
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
async function migrateToMultiAccount(db: DB): Promise<InStatement[]> {
  // Carry over the single connected account and the Pages it could see.
  const legacy = await getSetting(db, "account");
  const linked = JSON.parse((await getSetting(db, "linked_accounts")) ?? "[]") as {
    igUserId: string;
    username: string;
    pageName?: string;
  }[];
  const user = JSON.parse((await getSetting(db, "user_token")) ?? "null") as { token: string; expiresAt: string | null } | null;
  const active = legacy
    ? (JSON.parse(legacy) as { igUserId: string; username: string; token: string; tokenExpiresAt: string | null })
    : null;
  const owner = active?.igUserId ?? "";

  const s: InStatement[] = [
    `CREATE TABLE accounts (
      ig_user_id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      page_name TEXT NOT NULL DEFAULT '',
      token TEXT NOT NULL,
      token_expires_at TEXT,
      added_at TEXT NOT NULL DEFAULT ${NOW_SQL}
    )`,
    `CREATE TABLE reply_drafts (
      comment_id TEXT PRIMARY KEY,
      ig_user_id TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT ${NOW_SQL}
    )`,
  ];
  const insert = "INSERT OR REPLACE INTO accounts (ig_user_id, username, page_name, token, token_expires_at) VALUES (?, ?, ?, ?, ?)";
  if (user) for (const a of linked) s.push({ sql: insert, args: [a.igUserId, a.username, a.pageName ?? "", user.token, user.expiresAt] });
  if (active && !linked.some((a) => a.igUserId === active.igUserId)) {
    s.push({ sql: insert, args: [active.igUserId, active.username, "", active.token, active.tokenExpiresAt] });
  }
  if (active) s.push({ sql: "INSERT OR REPLACE INTO settings (key, value) VALUES ('active_account', ?)", args: [active.igUserId] });
  s.push("DELETE FROM settings WHERE key IN ('account', 'linked_accounts', 'user_token')");
  s.push(
    "ALTER TABLE posts ADD COLUMN ig_user_id TEXT NOT NULL DEFAULT ''",
    "ALTER TABLE posts ADD COLUMN trial_strategy TEXT CHECK (trial_strategy IN ('MANUAL','SS_PERFORMANCE'))",
    "ALTER TABLE posts ADD COLUMN source TEXT NOT NULL DEFAULT 'you'",
    "CREATE INDEX posts_account ON posts (ig_user_id, scheduled_at)",
    "ALTER TABLE niche_accounts RENAME TO niche_v0",
    `CREATE TABLE niche_accounts (
      ig_user_id TEXT NOT NULL,
      username TEXT NOT NULL,
      added_at TEXT NOT NULL DEFAULT ${NOW_SQL},
      PRIMARY KEY (ig_user_id, username)
    )`,
    "ALTER TABLE likes RENAME TO likes_v0",
    `CREATE TABLE likes (
      ig_user_id TEXT NOT NULL,
      target_id TEXT NOT NULL,
      target_type TEXT NOT NULL CHECK (target_type IN ('media','comment')),
      liked_at TEXT NOT NULL,
      unliked_at TEXT,
      PRIMARY KEY (ig_user_id, target_id)
    )`,
    "ALTER TABLE follower_snapshots RENAME TO snapshots_v0",
    `CREATE TABLE follower_snapshots (
      ig_user_id TEXT NOT NULL,
      day TEXT NOT NULL,
      followers INTEGER NOT NULL,
      follows INTEGER,
      media_count INTEGER,
      PRIMARY KEY (ig_user_id, day)
    )`,
    { sql: "UPDATE posts SET ig_user_id = ? WHERE ig_user_id = ''", args: [owner] },
    { sql: "INSERT INTO niche_accounts (ig_user_id, username, added_at) SELECT ?, username, added_at FROM niche_v0", args: [owner] },
    {
      sql: "INSERT INTO likes (ig_user_id, target_id, target_type, liked_at, unliked_at) SELECT ?, target_id, target_type, liked_at, unliked_at FROM likes_v0",
      args: [owner],
    },
    {
      sql: "INSERT INTO follower_snapshots (ig_user_id, day, followers, follows, media_count) SELECT ?, day, followers, follows, media_count FROM snapshots_v0",
      args: [owner],
    },
    "DROP TABLE niche_v0",
    "DROP TABLE likes_v0",
    "DROP TABLE snapshots_v0",
  );
  return s;
}

/** Each migration returns statements that run in one transaction together with the version bump. */
const MIGRATIONS: ((db: DB) => Promise<InStatement[]>)[] = [
  migrateToMultiAccount,
  async () => ["ALTER TABLE posts ADD COLUMN cover_offset_ms INTEGER"],
  // v3: hourly view counts per published video, so the dashboard can show how each one grows.
  async () => [
    `CREATE TABLE media_info (
      media_id TEXT PRIMARY KEY,
      ig_user_id TEXT NOT NULL,
      posted_at TEXT NOT NULL,
      kind TEXT,
      permalink TEXT,
      thumbnail_url TEXT,
      caption TEXT
    )`,
    `CREATE TABLE media_snapshots (
      media_id TEXT NOT NULL,
      at TEXT NOT NULL,
      views INTEGER NOT NULL,
      reach INTEGER,
      interactions INTEGER,
      PRIMARY KEY (media_id, at)
    )`,
    "CREATE INDEX media_info_account ON media_info (ig_user_id, posted_at)",
  ],
  // v4: cross-posting Reels to the linked Facebook Page.
  async () => [
    "ALTER TABLE posts ADD COLUMN fb_status TEXT",
    "ALTER TABLE posts ADD COLUMN fb_video_id TEXT",
    "ALTER TABLE posts ADD COLUMN fb_permalink TEXT",
    "ALTER TABLE posts ADD COLUMN fb_error TEXT",
    "ALTER TABLE posts ADD COLUMN fb_attempts INTEGER NOT NULL DEFAULT 0",
    "ALTER TABLE posts ADD COLUMN fb_started_at TEXT",
  ],
  // v5: keep refreshing older videos; stop only when one is deleted from Instagram.
  async () => [
    "ALTER TABLE media_info ADD COLUMN checked_at TEXT",
    "ALTER TABLE media_info ADD COLUMN gone_at TEXT",
    "UPDATE media_info SET checked_at = (SELECT MAX(at) FROM media_snapshots WHERE media_snapshots.media_id = media_info.media_id)",
  ],
  // v6: saves and shares per video, for the weekly report.
  async () => ["ALTER TABLE media_snapshots ADD COLUMN saves INTEGER", "ALTER TABLE media_snapshots ADD COLUMN shares INTEGER"],
  // v7: when publishing actually started, which can be well after the scheduled time.
  async () => ["ALTER TABLE posts ADD COLUMN started_at TEXT"],
  // v8: music attached to a Reel at publish time (Instagram Audio API), and why it was skipped if it was.
  async () => [
    "ALTER TABLE posts ADD COLUMN audio_id TEXT",
    "ALTER TABLE posts ADD COLUMN audio_title TEXT",
    "ALTER TABLE posts ADD COLUMN audio_error TEXT",
  ],
];

/** Schema version: kept in settings (works on Turso), falling back to PRAGMA user_version for older local files. */
export async function schemaVersion(db: DB): Promise<number> {
  const v = await getSetting(db, "schema_version");
  if (v !== null) return Number(v);
  try {
    const row = await one<{ user_version: number }>(db, "PRAGMA user_version");
    return Number(row?.user_version ?? 0);
  } catch {
    return 0;
  }
}

async function migrate(db: DB) {
  for (let v = await schemaVersion(db); v < MIGRATIONS.length; v++) {
    const statements = await MIGRATIONS[v](db);
    statements.push({ sql: "INSERT OR REPLACE INTO settings (key, value) VALUES ('schema_version', ?)", args: [String(v + 1)] });
    try {
      await db.batch(statements, "write");
    } catch (err) {
      // Another instance may have migrated at the same moment; that is fine if the version moved on.
      if ((await schemaVersion(db)) > v) continue;
      throw err;
    }
  }
  // Older local files track the version in PRAGMA user_version only; record it in settings too.
  if ((await getSetting(db, "schema_version")) === null) await setSetting(db, "schema_version", String(MIGRATIONS.length));
}

/** Opens a database and brings its schema up to date. `url`: "file:…", ":memory:" or "libsql://…". */
export async function openDb(url: string = config.databaseUrl, authToken: string | undefined = config.databaseAuthToken): Promise<DB> {
  if (url.startsWith("file:")) fs.mkdirSync(path.dirname(url.slice("file:".length)), { recursive: true });
  const db = createClient({ url, authToken: authToken || undefined });
  if (url.startsWith("file:")) {
    await db.execute("PRAGMA journal_mode = WAL").catch(() => undefined);
    await db.execute("PRAGMA busy_timeout = 5000").catch(() => undefined);
  }
  await db.executeMultiple(BASE_SCHEMA);
  await migrate(db);
  return db;
}

let shared: Promise<DB> | undefined;
/** Process-wide connection used by the web app, cron and worker. */
export function getDb(): Promise<DB> {
  if (!shared) {
    shared = openDb().catch((err) => {
      shared = undefined;
      throw err;
    });
  }
  return shared;
}

// ---- settings ----

export async function getSetting(db: DB, key: string): Promise<string | null> {
  const row = await one<{ value: string }>(db, "SELECT value FROM settings WHERE key = ?", [key]);
  return row?.value ?? null;
}

export async function setSetting(db: DB, key: string, value: string | null) {
  if (value === null) await run(db, "DELETE FROM settings WHERE key = ?", [key]);
  else
    await run(db, "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value", [
      key,
      value,
    ]);
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

export async function listAccounts(db: DB): Promise<Account[]> {
  return (await all<AccountRow>(db, "SELECT * FROM accounts ORDER BY added_at, rowid")).map(toAccount);
}

/**
 * One account by Instagram user ID or username (with or without "@").
 * Without a key, returns the active account (the one the pages show), or the first one.
 */
export async function getAccount(db: DB, key?: string | null): Promise<Account | null> {
  if (key) {
    const k = key.replace(/^@/, "");
    const row = await one<AccountRow>(db, "SELECT * FROM accounts WHERE ig_user_id = ? OR lower(username) = lower(?)", [k, k]);
    return row ? toAccount(row) : null;
  }
  const active = await getSetting(db, "active_account");
  if (active) {
    const a = await getAccount(db, active);
    if (a) return a;
  }
  const first = await one<AccountRow>(db, "SELECT * FROM accounts ORDER BY added_at, rowid LIMIT 1");
  return first ? toAccount(first) : null;
}

const UPSERT_ACCOUNT = `INSERT INTO accounts (ig_user_id, username, page_name, token, token_expires_at) VALUES (?, ?, ?, ?, ?)
  ON CONFLICT(ig_user_id) DO UPDATE SET username = excluded.username, page_name = excluded.page_name,
    token = excluded.token, token_expires_at = excluded.token_expires_at`;

/** Adds or refreshes accounts (from one Facebook login) without touching the others. */
export async function upsertAccounts(db: DB, accounts: Account[]) {
  if (accounts.length === 0) return;
  await db.batch(
    accounts.map((a) => ({ sql: UPSERT_ACCOUNT, args: [a.igUserId, a.username, a.pageName, a.token, a.tokenExpiresAt] })),
    "write",
  );
}

/** Keeps the stored Facebook Page name current (an account can be linked to a Page after it was added). */
export async function setPageName(db: DB, igUserId: string, pageName: string) {
  await run(db, "UPDATE accounts SET page_name = ? WHERE ig_user_id = ? AND page_name <> ?", [pageName, igUserId, pageName]);
}

export async function setActiveAccount(db: DB, igUserId: string) {
  if (await getAccount(db, igUserId)) await setSetting(db, "active_account", igUserId);
}

/** Removes an account and cancels its queued posts. History (published posts, snapshots) is kept. */
export async function removeAccount(db: DB, igUserId: string) {
  await db.batch(
    [
      { sql: "DELETE FROM accounts WHERE ig_user_id = ?", args: [igUserId] },
      {
        sql: `UPDATE posts SET status = 'cancelled', error = 'Account removed', updated_at = ${NOW_SQL} WHERE ig_user_id = ? AND status = 'scheduled'`,
        args: [igUserId],
      },
      { sql: "DELETE FROM reply_drafts WHERE ig_user_id = ?", args: [igUserId] },
      { sql: "DELETE FROM settings WHERE key = 'active_account' AND value = ?", args: [igUserId] },
    ],
    "write",
  );
}

export async function removeAllAccounts(db: DB) {
  for (const a of await listAccounts(db)) await removeAccount(db, a.igUserId);
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
  coverOffsetMs?: number | null;
  /** Reels only: also post to the linked Facebook Page. */
  facebook?: boolean;
  source?: PostSource;
}

export async function createPost(db: DB, p: NewPost): Promise<number> {
  const res = await run(
    db,
    `INSERT INTO posts (ig_user_id, type, media_url, caption, share_to_feed, trial_strategy, cover_offset_ms, source, scheduled_at, fb_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      p.igUserId,
      p.type,
      p.mediaUrl,
      p.caption,
      p.shareToFeed ? 1 : 0,
      p.type === "REELS" ? (p.trial ?? null) : null,
      p.type === "REELS" ? (p.coverOffsetMs ?? null) : null,
      p.source ?? "you",
      p.scheduledAt.toISOString(),
      p.type === "REELS" && p.facebook ? "pending" : null,
    ],
  );
  return Number(res.lastInsertRowid);
}

export async function listPosts(db: DB, filter: { igUserId?: string; from?: Date; to?: Date } = {}): Promise<PostRow[]> {
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
  return all<PostRow>(db, sql, args);
}

/** How often each audio track went out on this account's Reels since `since` (rotation for trending audio). */
export async function audioUseCounts(db: DB, igUserId: string, since: Date): Promise<Map<string, number>> {
  const rows = await all<{ audio_id: string; n: number }>(
    db,
    "SELECT audio_id, COUNT(*) AS n FROM posts WHERE ig_user_id = ? AND audio_id IS NOT NULL AND updated_at >= ? GROUP BY audio_id",
    [igUserId, since.toISOString()],
  );
  return new Map(rows.map((r) => [r.audio_id, Number(r.n)]));
}

export async function getPost(db: DB, id: number): Promise<PostRow | undefined> {
  return one<PostRow>(db, "SELECT * FROM posts WHERE id = ?", [id]);
}

/** Posts that are due now, plus Reels whose container is still processing (all accounts). */
export async function duePosts(db: DB, now: Date): Promise<PostRow[]> {
  return all<PostRow>(
    db,
    `SELECT * FROM posts
     WHERE (status = 'scheduled' AND scheduled_at <= ?) OR status = 'processing'
     ORDER BY scheduled_at ASC`,
    [now.toISOString()],
  );
}

/** Marks a scheduled post as processing. Returns false if another runner claimed it first. */
export async function claimPost(db: DB, id: number, now: Date): Promise<boolean> {
  const res = await run(
    db,
    "UPDATE posts SET status = 'processing', attempts = attempts + 1, error = NULL, updated_at = ?, started_at = ? WHERE id = ? AND status = 'scheduled'",
    [now.toISOString(), now.toISOString(), id],
  );
  return res.rowsAffected === 1;
}

/**
 * Edits a post that has not started publishing. A failed or cancelled post goes back in the queue when given a time.
 * The status check is part of the UPDATE, so it cannot race the publisher claiming the post.
 */
export async function editQueuedPost(
  db: DB,
  id: number,
  fields: { caption?: string; scheduledAt?: Date; coverOffsetMs?: number | null; facebook?: boolean; mediaUrl?: string },
  now: Date,
) {
  const sets: string[] = [];
  const args: Arg[] = [];
  // Facebook can be switched on or off until its upload starts.
  if (fields.facebook !== undefined) {
    sets.push(
      fields.facebook
        ? "fb_status = CASE WHEN type <> 'REELS' OR fb_status IN ('processing', 'published') THEN fb_status ELSE 'pending' END, fb_error = NULL"
        : "fb_status = CASE WHEN fb_status IN ('processing', 'published') THEN fb_status ELSE NULL END",
    );
  }
  if (fields.caption !== undefined) sets.push("caption = ?"), args.push(fields.caption);
  if (fields.mediaUrl !== undefined) sets.push("media_url = ?"), args.push(fields.mediaUrl);
  if (fields.coverOffsetMs !== undefined) sets.push("cover_offset_ms = CASE WHEN type = 'REELS' THEN ? END"), args.push(fields.coverOffsetMs);
  if (fields.scheduledAt) {
    sets.push("scheduled_at = ?", "status = 'scheduled'", "container_id = NULL", "error = NULL", "attempts = 0");
    // Requeueing also retries a failed Facebook upload.
    if (fields.facebook === undefined) sets.push("fb_status = CASE WHEN fb_status = 'failed' THEN 'pending' ELSE fb_status END");
    args.push(fields.scheduledAt.toISOString());
  }
  if (sets.length === 0) return false;
  const statuses = fields.scheduledAt ? "('scheduled', 'failed', 'cancelled')" : "('scheduled')";
  const res = await run(db, `UPDATE posts SET ${sets.join(", ")}, updated_at = ? WHERE id = ? AND status IN ${statuses}`, [
    ...args,
    now.toISOString(),
    id,
  ]);
  return res.rowsAffected === 1;
}

export async function updatePost(db: DB, id: number, fields: Partial<Omit<PostRow, "id" | "created_at">>) {
  const entries = Object.entries(fields).filter(([, v]) => v !== undefined) as [string, Arg][];
  if (entries.length === 0) return;
  const sets = entries.map(([k]) => `${k} = ?`).join(", ");
  await run(db, `UPDATE posts SET ${sets}, updated_at = ${NOW_SQL} WHERE id = ?`, [...entries.map(([, v]) => v), id]);
}

// ---- Facebook cross-posting ----

/** Facebook uploads that are due, or started and still processing. Skips posts cancelled on Instagram. */
export async function dueFacebookPosts(db: DB, now: Date): Promise<PostRow[]> {
  return all<PostRow>(
    db,
    `SELECT * FROM posts
     WHERE ((fb_status = 'pending' AND scheduled_at <= ?) OR fb_status = 'processing') AND status <> 'cancelled'
     ORDER BY scheduled_at ASC`,
    [now.toISOString()],
  );
}

/** Marks a Facebook upload as started. Returns false if another runner claimed it first. */
export async function claimFacebook(db: DB, id: number, now: Date): Promise<boolean> {
  const res = await run(
    db,
    "UPDATE posts SET fb_status = 'processing', fb_attempts = fb_attempts + 1, fb_error = NULL, fb_started_at = ? WHERE id = ? AND fb_status = 'pending'",
    [now.toISOString(), id],
  );
  return res.rowsAffected === 1;
}

/** Facebook uploads started for one account's Page in the 24 hours before `now`. */
export async function facebookStartsSince(db: DB, igUserId: string, since: Date): Promise<number> {
  const row = await one<{ n: number }>(
    db,
    "SELECT COUNT(*) AS n FROM posts WHERE ig_user_id = ? AND fb_started_at >= ? AND fb_status IN ('processing', 'published')",
    [igUserId, since.toISOString()],
  );
  return Number(row?.n ?? 0);
}

// ---- niche accounts ----

export async function listNiche(db: DB, igUserId: string): Promise<string[]> {
  return (
    await all<{ username: string }>(db, "SELECT username FROM niche_accounts WHERE ig_user_id = ? ORDER BY username", [igUserId])
  ).map((r) => r.username);
}

export async function addNiche(db: DB, igUserId: string, username: string) {
  await run(db, "INSERT OR IGNORE INTO niche_accounts (ig_user_id, username) VALUES (?, ?)", [igUserId, username]);
}

export async function removeNiche(db: DB, igUserId: string, username: string) {
  await run(db, "DELETE FROM niche_accounts WHERE ig_user_id = ? AND username = ?", [igUserId, username]);
}

// ---- follower snapshots ----

export async function saveSnapshot(
  db: DB,
  igUserId: string,
  day: string,
  followers: number,
  follows: number | null,
  mediaCount: number | null,
) {
  await run(
    db,
    `INSERT INTO follower_snapshots (ig_user_id, day, followers, follows, media_count) VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(ig_user_id, day) DO UPDATE SET followers = excluded.followers, follows = excluded.follows, media_count = excluded.media_count`,
    [igUserId, day, followers, follows, mediaCount],
  );
}

export async function listSnapshots(db: DB, igUserId: string, limit = 90): Promise<{ day: string; followers: number }[]> {
  return (
    await all<{ day: string; followers: number }>(
      db,
      "SELECT day, followers FROM follower_snapshots WHERE ig_user_id = ? ORDER BY day DESC LIMIT ?",
      [igUserId, limit],
    )
  ).reverse();
}

export async function hasSnapshot(db: DB, igUserId: string, day: string): Promise<boolean> {
  return (await one(db, "SELECT 1 AS x FROM follower_snapshots WHERE ig_user_id = ? AND day = ?", [igUserId, day])) !== undefined;
}

// ---- video view history ----

export interface MediaSnapshotInput {
  mediaId: string;
  igUserId: string;
  postedAt: string;
  kind: string | null;
  permalink: string | null;
  thumbnailUrl: string | null;
  caption: string | null;
  views: number;
  reach: number | null;
  interactions: number | null;
  saves?: number | null;
  shares?: number | null;
}

/** Saves the latest details and one view count per video, all stamped with the same time. */
export async function saveMediaSnapshots(db: DB, at: Date, rows: MediaSnapshotInput[]) {
  if (!rows.length) return;
  const stamp = at.toISOString();
  await db.batch(
    rows.flatMap((r) => [
      {
        sql: `INSERT INTO media_info (media_id, ig_user_id, posted_at, kind, permalink, thumbnail_url, caption, checked_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(media_id) DO UPDATE SET kind = excluded.kind, permalink = excluded.permalink,
                thumbnail_url = excluded.thumbnail_url, caption = excluded.caption, checked_at = excluded.checked_at`,
        args: [r.mediaId, r.igUserId, r.postedAt, r.kind, r.permalink, r.thumbnailUrl, r.caption, stamp],
      },
      {
        sql: "INSERT OR REPLACE INTO media_snapshots (media_id, at, views, reach, interactions, saves, shares) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [r.mediaId, stamp, r.views, r.reach, r.interactions, r.saves ?? null, r.shares ?? null],
      },
    ]),
    "write",
  );
}

/** Tracked videos not checked since `before`, longest-waiting first. Videos deleted from Instagram are left out. */
export async function videosDueForRefresh(db: DB, igUserId: string, before: Date, limit: number): Promise<MediaSnapshotInput[]> {
  const rows = await all<{
    media_id: string;
    ig_user_id: string;
    posted_at: string;
    kind: string | null;
    permalink: string | null;
    thumbnail_url: string | null;
    caption: string | null;
  }>(
    db,
    `SELECT media_id, ig_user_id, posted_at, kind, permalink, thumbnail_url, caption FROM media_info
     WHERE ig_user_id = ? AND gone_at IS NULL AND (checked_at IS NULL OR checked_at < ?)
     ORDER BY checked_at IS NOT NULL, checked_at, media_id LIMIT ?`,
    [igUserId, before.toISOString(), limit],
  );
  return rows.map((r) => ({
    mediaId: r.media_id,
    igUserId: r.ig_user_id,
    postedAt: r.posted_at,
    kind: r.kind,
    permalink: r.permalink,
    thumbnailUrl: r.thumbnail_url,
    caption: r.caption,
    views: 0,
    reach: null,
    interactions: null,
  }));
}

/** Records a failed check, so a video Instagram won't report on doesn't hold up the others. */
export async function markVideoChecked(db: DB, mediaId: string, at: Date) {
  await db.execute({ sql: "UPDATE media_info SET checked_at = ? WHERE media_id = ?", args: [at.toISOString(), mediaId] });
}

/** Stops checking a video deleted from Instagram. Its last saved count stays. */
export async function markVideoGone(db: DB, mediaId: string, at: Date) {
  const stamp = at.toISOString();
  await db.execute({ sql: "UPDATE media_info SET checked_at = ?, gone_at = ? WHERE media_id = ?", args: [stamp, stamp, mediaId] });
}

export interface TopVideo {
  mediaId: string;
  igUserId: string;
  postedAt: string;
  kind: string | null;
  permalink: string | null;
  thumbnailUrl: string | null;
  caption: string | null;
  views: number;
  reach: number | null;
  interactions: number | null;
  /** Every saved count, oldest first. */
  history: { at: string; views: number }[];
}

/** Videos posted since `since`, ranked by their latest view count. */
/** Sum of each tracked video's latest saved view count, optionally for one account. */
export async function totalVideoViews(db: DB, igUserId?: string): Promise<{ views: number; videos: number }> {
  const [row] = await all<{ views: number | null; videos: number }>(
    db,
    `SELECT SUM(s.views) AS views, COUNT(*) AS videos FROM media_info i
     JOIN media_snapshots s ON s.media_id = i.media_id
       AND s.at = (SELECT MAX(at) FROM media_snapshots WHERE media_id = i.media_id)
     ${igUserId ? "WHERE i.ig_user_id = ?" : ""}`,
    igUserId ? [igUserId] : [],
  );
  return { views: Number(row?.views ?? 0), videos: Number(row?.videos ?? 0) };
}

export async function topVideos(db: DB, opts: { since: Date; igUserId?: string; limit?: number }): Promise<TopVideo[]> {
  const args: Arg[] = [opts.since.toISOString()];
  let where = "i.posted_at >= ?";
  if (opts.igUserId) {
    where += " AND i.ig_user_id = ?";
    args.push(opts.igUserId);
  }
  args.push(opts.limit ?? 10);
  const top = await all<{
    media_id: string;
    ig_user_id: string;
    posted_at: string;
    kind: string | null;
    permalink: string | null;
    thumbnail_url: string | null;
    caption: string | null;
    views: number;
    reach: number | null;
    interactions: number | null;
  }>(
    db,
    `SELECT i.*, s.views, s.reach, s.interactions FROM media_info i
     JOIN media_snapshots s ON s.media_id = i.media_id
       AND s.at = (SELECT MAX(at) FROM media_snapshots WHERE media_id = i.media_id)
     WHERE ${where} ORDER BY s.views DESC LIMIT ?`,
    args,
  );
  if (!top.length) return [];
  const history = await all<{ media_id: string; at: string; views: number }>(
    db,
    `SELECT media_id, at, views FROM media_snapshots WHERE media_id IN (${top.map(() => "?").join(",")}) ORDER BY at`,
    top.map((t) => t.media_id),
  );
  return top.map((t) => ({
    mediaId: t.media_id,
    igUserId: t.ig_user_id,
    postedAt: t.posted_at,
    kind: t.kind,
    permalink: t.permalink,
    thumbnailUrl: t.thumbnail_url,
    caption: t.caption,
    views: Number(t.views),
    reach: t.reach,
    interactions: t.interactions,
    history: history.filter((h) => h.media_id === t.media_id).map((h) => ({ at: h.at, views: Number(h.views) })),
  }));
}

// ---- likes ----

function startOfUtcDay(now: Date) {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())).toISOString();
}

export async function countLikesSince(db: DB, igUserId: string, now: Date): Promise<number> {
  const row = await one<{ n: number }>(db, "SELECT COUNT(*) AS n FROM likes WHERE ig_user_id = ? AND liked_at >= ?", [
    igUserId,
    startOfUtcDay(now),
  ]);
  return Number(row?.n ?? 0);
}

export async function activeLikeIds(db: DB, igUserId: string): Promise<Set<string>> {
  const rows = await all<{ target_id: string }>(db, "SELECT target_id FROM likes WHERE ig_user_id = ? AND unliked_at IS NULL", [igUserId]);
  return new Set(rows.map((r) => r.target_id));
}

export async function lastLikeTime(db: DB, igUserId: string): Promise<Date | null> {
  const row = await one<{ t: string | null }>(db, "SELECT MAX(liked_at) AS t FROM likes WHERE ig_user_id = ?", [igUserId]);
  return row?.t ? new Date(row.t) : null;
}

export async function recordLike(db: DB, igUserId: string, targetId: string, type: "media" | "comment", at: Date) {
  await run(db, "INSERT OR REPLACE INTO likes (ig_user_id, target_id, target_type, liked_at, unliked_at) VALUES (?, ?, ?, ?, NULL)", [
    igUserId,
    targetId,
    type,
    at.toISOString(),
  ]);
}

export async function recordUnlike(db: DB, igUserId: string, targetId: string, at: Date) {
  await run(db, "UPDATE likes SET unliked_at = ? WHERE ig_user_id = ? AND target_id = ?", [at.toISOString(), igUserId, targetId]);
}

// ---- reply drafts (written by Claude, sent by you) ----

export async function saveDraft(db: DB, d: { commentId: string; igUserId: string; text: string }) {
  await run(
    db,
    `INSERT INTO reply_drafts (comment_id, ig_user_id, text) VALUES (?, ?, ?)
     ON CONFLICT(comment_id) DO UPDATE SET text = excluded.text, ig_user_id = excluded.ig_user_id, created_at = ${NOW_SQL}`,
    [d.commentId, d.igUserId, d.text],
  );
}

export async function listDrafts(db: DB, igUserId: string): Promise<Map<string, string>> {
  const rows = await all<{ comment_id: string; text: string }>(db, "SELECT comment_id, text FROM reply_drafts WHERE ig_user_id = ?", [
    igUserId,
  ]);
  return new Map(rows.map((r) => [r.comment_id, r.text]));
}

export async function deleteDraft(db: DB, commentId: string) {
  await run(db, "DELETE FROM reply_drafts WHERE comment_id = ?", [commentId]);
}

// ---- accounts found at login, waiting for the owner to choose ----

export interface PendingLogin {
  token: string;
  expiresAt: string | null;
  accounts: { igUserId: string; username: string; pageName: string }[];
  createdAt: string;
}

const PENDING_TTL_MS = 30 * 60_000;

export async function savePendingLogin(db: DB, p: Omit<PendingLogin, "createdAt">) {
  await setSetting(db, "pending_login", JSON.stringify({ ...p, createdAt: new Date().toISOString() }));
}

export async function getPendingLogin(db: DB, now = new Date()): Promise<PendingLogin | null> {
  const raw = await getSetting(db, "pending_login");
  if (!raw) return null;
  const p = JSON.parse(raw) as PendingLogin;
  if (now.getTime() - new Date(p.createdAt).getTime() > PENDING_TTL_MS) {
    await setSetting(db, "pending_login", null);
    return null;
  }
  return p;
}

/** Adds the chosen accounts from the pending login, then forgets the rest. Returns the usernames added. */
export async function addFromPendingLogin(db: DB, igUserIds: string[]): Promise<string[]> {
  const p = await getPendingLogin(db);
  await setSetting(db, "pending_login", null);
  if (!p) return [];
  const chosen = p.accounts.filter((a) => igUserIds.includes(a.igUserId));
  const hadAny = (await listAccounts(db)).length > 0;
  await upsertAccounts(db, chosen.map((a) => ({ ...a, token: p.token, tokenExpiresAt: p.expiresAt })));
  if (!hadAny && chosen[0]) await setActiveAccount(db, chosen[0].igUserId);
  return chosen.map((a) => a.username);
}

export async function clearPendingLogin(db: DB) {
  await setSetting(db, "pending_login", null);
}
