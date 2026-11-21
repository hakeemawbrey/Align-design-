/**
 * Cross-posts Reels to the Facebook Page linked to each Instagram account, at the post's scheduled time.
 * Facebook allows 30 API-published Reels per Page in any 24 hours; videos must be 3–90 seconds, 9:16.
 */
import { type DB, type PostRow, claimFacebook, dueFacebookPosts, facebookStartsSince, getAccount, updatePost } from "./db";
import { GraphClient, GraphError } from "./graph";
import { MAX_ATTEMPTS, PROCESSING_TIMEOUT_MS, RETRY_DELAY_MS, isTransient } from "./publisher";

export const FB_DAILY_LIMIT = 30;
const DAY_MS = 86_400_000;
/** Permission errors: the user has not granted pages_manage_posts yet. */
const PERMISSION_CODES = new Set([10, 200, 190]);
/** Reels that were due while posting wasn't allowed are skipped once they are this late. */
export const FB_STALE_MS = 2 * 3_600_000;

const isPermissionError = (err: unknown) => err instanceof GraphError && err.code !== undefined && PERMISSION_CODES.has(err.code);

export interface FbRunResult {
  started: number[];
  published: number[];
  failed: number[];
  waiting: number[];
}

type Page = { id: string; name: string; token: string } | null;
export type { Page as FbPage };

function describe(err: unknown) {
  if (!(err instanceof Error)) return String(err);
  if (err instanceof GraphError && err.code === 190) {
    return `The Facebook login for this account has expired. Click "Add or refresh accounts" on the Settings page. (${err.message})`;
  }
  if (err instanceof GraphError && err.code !== undefined && PERMISSION_CODES.has(err.code)) {
    return `Facebook did not allow posting to the Page yet. See Facebook Pages on the Settings page. (${err.message})`;
  }
  return err.message;
}

export async function publishFacebookDue(
  db: DB,
  opts: { now?: Date; userClient?: (token: string) => GraphClient; pageClient?: (token: string) => GraphClient } = {},
): Promise<FbRunResult> {
  const now = opts.now ?? new Date();
  const userClient = opts.userClient ?? ((token) => new GraphClient({ token }));
  const pageClient = opts.pageClient ?? ((token) => new GraphClient({ token }));
  const result: FbRunResult = { started: [], published: [], failed: [], waiting: [] };
  const pages = new Map<string, Page>();
  const startedThisRun = new Set<string>();

  for (const post of await dueFacebookPosts(db, now)) {
    const account = await getAccount(db, post.ig_user_id);
    if (!account) {
      await updatePost(db, post.id, { fb_status: "failed", fb_error: "This post's account is no longer connected" });
      result.failed.push(post.id);
      continue;
    }
    try {
      if (!pages.has(account.igUserId)) pages.set(account.igUserId, await userClient(account.token).pageForInstagram(account.igUserId));
      const page = pages.get(account.igUserId)!;
      if (!page) {
        await updatePost(db, post.id, { fb_status: "failed", fb_error: `@${account.username} has no Facebook Page linked` });
        result.failed.push(post.id);
        continue;
      }
      const client = pageClient(page.token);

      if (post.fb_status === "processing") {
        result[await checkProcessing(db, client, post, now)].push(post.id);
        continue;
      }

      // Don't flood the Page with a backlog (e.g. after posting was allowed late, or the Mac slept).
      if (now.getTime() - new Date(post.scheduled_at).getTime() > FB_STALE_MS) {
        await updatePost(db, post.id, { fb_status: "failed", fb_error: "Skipped: more than 2 hours past its time when Facebook could post it" });
        result.failed.push(post.id);
        continue;
      }
      // One new upload per Page per run, and never more than Facebook's 30 per 24 hours.
      if (startedThisRun.has(page.id)) continue;
      if ((await facebookStartsSince(db, account.igUserId, new Date(now.getTime() - DAY_MS))) >= FB_DAILY_LIMIT) {
        await updatePost(db, post.id, { fb_error: `Waiting: Facebook allows ${FB_DAILY_LIMIT} Reels per Page per 24 hours` });
        result.waiting.push(post.id);
        continue;
      }
      if (!(await claimFacebook(db, post.id, now))) continue;
      startedThisRun.add(page.id);
      const { videoId } = await client.publishPageReel(page.id, post.media_url, post.caption);
      await updatePost(db, post.id, { fb_video_id: videoId });
      result.started.push(post.id);
    } catch (err) {
      const msg = describe(err);
      if (isPermissionError(err) && post.fb_status === "pending") {
        // Not allowed yet (Settings → reconnect): wait rather than fail.
        await updatePost(db, post.id, { fb_status: "pending", fb_attempts: 0, fb_started_at: null, fb_video_id: null, fb_error: msg });
        result.waiting.push(post.id);
        continue;
      }
      const attempts = post.fb_attempts + (post.fb_status === "pending" ? 1 : 0);
      if (isTransient(err) && attempts < MAX_ATTEMPTS) {
        // Temporary Facebook error: try again on a later run.
        await updatePost(db, post.id, { fb_status: "pending", fb_video_id: null, fb_error: `Retrying: ${msg}` });
        result.waiting.push(post.id);
      } else {
        await updatePost(db, post.id, { fb_status: "failed", fb_error: msg });
        result.failed.push(post.id);
      }
    }
  }
  return result;
}

async function checkProcessing(db: DB, client: GraphClient, post: PostRow, now: Date): Promise<"published" | "failed" | "waiting"> {
  if (!post.fb_video_id) {
    // Claimed but the upload never returned a video (e.g. the runner stopped mid-way): try again.
    if (post.fb_started_at && now.getTime() - new Date(post.fb_started_at).getTime() > RETRY_DELAY_MS) {
      await updatePost(db, post.id, { fb_status: post.fb_attempts < MAX_ATTEMPTS ? "pending" : "failed", fb_error: "Upload was interrupted" });
    }
    return "waiting";
  }
  const { status, permalink_url } = await client.pageVideoStatus(post.fb_video_id);
  const phases = [status?.uploading_phase, status?.processing_phase, status?.publishing_phase];
  const error = phases.flatMap((p) => p?.errors ?? []).find((e) => e.message)?.message;
  if (status?.video_status === "error" || status?.video_status === "upload_failed" || phases.some((p) => p?.status === "error")) {
    await updatePost(db, post.id, { fb_status: "failed", fb_error: `Facebook rejected the video${error ? `: ${error}` : ""}` });
    return "failed";
  }
  if (status?.publishing_phase?.status === "complete" || status?.video_status === "published") {
    const link = permalink_url ? (permalink_url.startsWith("http") ? permalink_url : `https://www.facebook.com${permalink_url}`) : null;
    await updatePost(db, post.id, { fb_status: "published", fb_permalink: link, fb_error: null });
    return "published";
  }
  if (post.fb_started_at && now.getTime() - new Date(post.fb_started_at).getTime() > PROCESSING_TIMEOUT_MS) {
    await updatePost(db, post.id, { fb_status: "failed", fb_error: "Facebook did not finish processing the video in 30 minutes" });
    return "failed";
  }
  return "waiting";
}
