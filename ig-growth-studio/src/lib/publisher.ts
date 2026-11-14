import { type DB, type PostRow, claimPost, duePosts, getAccount, updatePost } from "./db";
import { pickAudio } from "./audio";
import { isPhoto, photoToReel } from "./photoReel";
import { type AudioConfiguration, GraphClient, GraphError } from "./graph";

/** Reels that have not finished processing after this long are marked failed. */
export const PROCESSING_TIMEOUT_MS = 30 * 60 * 1000;
export const MAX_ATTEMPTS = 3;
export const RETRY_DELAY_MS = 5 * 60 * 1000;
/** New posts started per account per run, so a backlog after downtime goes out gradually. */
export const MAX_NEW_PER_ACCOUNT_PER_RUN = 1;

/** Graph error codes worth retrying: unknown/temporary/rate-limit. */
const TRANSIENT_CODES = new Set([1, 2, 4, 17, 32, 341, 613]);

/** Worth retrying: Meta marks it transient, a rate-limit/temporary code, or a 5xx ("internal server error"). */
export function isTransient(err: unknown): boolean {
  if (!(err instanceof GraphError)) return false;
  if (err.isTransient) return true;
  if (err.code !== undefined && TRANSIENT_CODES.has(err.code)) return true;
  return err.status >= 500;
}

export interface RunResult {
  published: number[];
  failed: number[];
  pending: number[];
  retried: number[];
}

export async function publishDuePosts(
  db: DB,
  opts: { now?: Date; client?: GraphClient; maxNewPerAccount?: number } = {},
): Promise<RunResult> {
  const now = opts.now ?? new Date();
  const maxNew = opts.maxNewPerAccount ?? MAX_NEW_PER_ACCOUNT_PER_RUN;
  const result: RunResult = { published: [], failed: [], pending: [], retried: [] };
  const clients = new Map<string, GraphClient>();
  const started = new Map<string, number>();

  for (const post of await duePosts(db, now)) {
    // Each post publishes to the account it was scheduled for, with that account's token.
    const account = post.ig_user_id ? await getAccount(db, post.ig_user_id) : null;
    if (!account) {
      await updatePost(db, post.id, { status: "failed", error: "This post's Instagram account is no longer connected" });
      result.failed.push(post.id);
      continue;
    }
    // After downtime, catch up gradually: at most `maxNew` new posts per account per run.
    if (post.status === "scheduled") {
      const n = started.get(account.igUserId) ?? 0;
      if (n >= maxNew) continue;
      started.set(account.igUserId, n + 1);
    }
    let client = opts.client ?? clients.get(account.token);
    if (!client) clients.set(account.token, (client = new GraphClient({ token: account.token })));
    try {
      const outcome = await advance(db, client, account.igUserId, post, now);
      result[outcome].push(post.id);
    } catch (err) {
      const base = err instanceof Error ? err.message : String(err);
      // Keep Meta's codes with the message so failures can be diagnosed from the queue.
      const msg =
        err instanceof GraphError
          ? `${base} [HTTP ${err.status}${err.code !== undefined ? `, code ${err.code}` : ""}${err.subcode ? `/${err.subcode}` : ""}]`
          : base;
      const transient = isTransient(err);
      const attempts = post.attempts + (post.status === "scheduled" ? 1 : 0);
      if (transient && attempts < MAX_ATTEMPTS) {
        await updatePost(db, post.id, {
          status: "scheduled",
          container_id: null,
          attempts,
          error: `Retrying: ${msg}`,
          scheduled_at: new Date(now.getTime() + RETRY_DELAY_MS).toISOString(),
        });
        result.retried.push(post.id);
      } else {
        await updatePost(db, post.id, { status: "failed", attempts, error: msg });
        result.failed.push(post.id);
      }
    }
  }
  return result;
}

async function advance(
  db: DB,
  client: GraphClient,
  igUserId: string,
  post: PostRow,
  now: Date,
): Promise<"published" | "failed" | "pending"> {
  let containerId = post.container_id;

  if (post.status === "scheduled") {
    // Claim the post so a second runner (cron + worker) does not publish it twice.
    if (!(await claimPost(db, post.id, now))) return "pending";

    const container =
      post.type === "REELS"
        ? await createReel(db, client, igUserId, post, now)
        : await client.createImageContainer(igUserId, post.media_url, post.caption);
    containerId = container.id;
    await updatePost(db, post.id, { container_id: containerId });
  }

  if (!containerId) {
    await updatePost(db, post.id, { status: "failed", error: "Missing media container" });
    return "failed";
  }

  const status = await client.containerStatus(containerId);
  if (status.status_code === "IN_PROGRESS") {
    // Time since upload, not since the scheduled time: a post started late after downtime still gets its 30 minutes.
    const startedAt = post.status === "scheduled" ? now : new Date(post.started_at ?? post.updated_at);
    if (now.getTime() - startedAt.getTime() > PROCESSING_TIMEOUT_MS) {
      await updatePost(db, post.id, { status: "failed", error: "Instagram did not finish processing the video in 30 minutes" });
      return "failed";
    }
    return "pending";
  }
  if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
    await updatePost(db, post.id, {
      status: "failed",
      error: `Media container ${status.status_code.toLowerCase()}${status.status ? `: ${status.status}` : ""}`,
    });
    return "failed";
  }

  const published = await client.publishContainer(igUserId, containerId);
  let permalink: string | null = null;
  try {
    permalink = (await client.mediaPermalink(published.id)).permalink ?? null;
  } catch {
    // Permalink is a nice-to-have; the post is already live.
  }
  await updatePost(db, post.id, { status: "published", ig_media_id: published.id, permalink, error: null });
  return "published";
}

/**
 * Creates the Reel container, with music when the account has Reels audio switched on. Audio never blocks a post:
 * if the track cannot be found or Instagram refuses it, the Reel goes out with its own sound and the reason is kept.
 */
async function createReel(db: DB, client: GraphClient, igUserId: string, post: PostRow, now: Date) {
  // A photo queued as a Reel becomes a short video first, so it can carry music.
  let mediaUrl = post.media_url;
  if (isPhoto(mediaUrl)) {
    mediaUrl = await photoToReel(mediaUrl, post.id);
    await updatePost(db, post.id, { media_url: mediaUrl });
  }
  const create = (audio: AudioConfiguration | null) =>
    client.createReelContainer(igUserId, mediaUrl, post.caption, post.share_to_feed === 1, post.trial_strategy, post.cover_offset_ms, audio);
  let picked: Awaited<ReturnType<typeof pickAudio>> = null;
  try {
    picked = await pickAudio(db, client, igUserId, now);
  } catch (err) {
    if (isTransient(err)) throw err;
    await updatePost(db, post.id, { audio_id: null, audio_title: null, audio_error: `No audio: ${errText(err)}` });
  }
  if (!picked) return create(null);
  try {
    const c = await create(picked.config);
    await updatePost(db, post.id, { audio_id: picked.config.audioId, audio_title: picked.title, audio_error: null });
    return c;
  } catch (err) {
    if (isTransient(err)) throw err;
    const c = await create(null);
    await updatePost(db, post.id, { audio_id: null, audio_title: null, audio_error: `Posted without "${picked.title}": ${errText(err)}` });
    return c;
  }
}

function errText(err: unknown) {
  const base = err instanceof Error ? err.message : String(err);
  return err instanceof GraphError && err.code !== undefined ? `${base} (code ${err.code})` : base;
}
