import fs from "node:fs";
import { config } from "./config";
import { isLocalMedia, localMediaPath } from "./media";

/** Error returned by the Graph API, with Meta's error code when present. */
export class GraphError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code?: number,
    readonly subcode?: number,
    /** Meta's own hint that retrying may succeed. */
    readonly isTransient?: boolean,
  ) {
    super(message);
    this.name = "GraphError";
  }
}

type Params = Record<string, string | number | boolean | undefined>;
export type Fetch = typeof fetch;

export interface GraphClientOptions {
  token?: string;
  version?: string;
  fetchImpl?: Fetch;
  baseUrl?: string;
}

/**
 * Thin client for graph.facebook.com (Instagram API with Facebook Login).
 * Every call is a documented, official endpoint.
 */
export interface AudioConfiguration {
  audioId: string;
  /** 1–100; Instagram's default is 100. */
  audioVolume?: number | null;
  /** 1–100: the video's own sound under the music. */
  videoVolume?: number | null;
}

export interface IgAudio {
  audio_id: string;
  title?: string;
  display_artist?: string;
  duration_in_ms?: number;
  audio_type?: string;
  ig_username?: string;
  on_platform_audio_preview_link?: string;
}

export class GraphClient {
  private token?: string;
  private version: string;
  private fetchImpl: Fetch;
  private baseUrl: string;

  constructor(opts: GraphClientOptions = {}) {
    this.token = opts.token;
    this.version = opts.version ?? config.graphVersion;
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.baseUrl = opts.baseUrl ?? "https://graph.facebook.com";
  }

  async request<T>(method: "GET" | "POST" | "DELETE", path: string, params: Params = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}/${this.version}/${path.replace(/^\//, "")}`);
    const all: Params = { ...params };
    if (this.token && all.access_token === undefined) all.access_token = this.token;
    const body = new URLSearchParams();
    for (const [k, v] of Object.entries(all)) {
      if (v === undefined) continue;
      if (method === "POST") body.set(k, String(v));
      else url.searchParams.set(k, String(v));
    }
    const res = await this.fetchImpl(url, {
      method,
      body: method === "POST" ? body : undefined,
      cache: "no-store",
    });
    const text = await res.text();
    let json: any;
    try {
      json = text ? JSON.parse(text) : {};
    } catch {
      throw new GraphError(`Unexpected response (${res.status}): ${text.slice(0, 200)}`, res.status);
    }
    if (!res.ok || json?.error) {
      const e = json?.error ?? {};
      throw new GraphError(
        e.error_user_msg || e.message || `HTTP ${res.status}`,
        res.status,
        e.code,
        e.error_subcode,
        e.is_transient === true,
      );
    }
    return json as T;
  }

  // ---------- auth ----------

  exchangeCode(code: string) {
    return this.request<{ access_token: string; expires_in?: number }>("GET", "oauth/access_token", {
      client_id: config.appId,
      client_secret: config.appSecret,
      redirect_uri: config.redirectUri,
      code,
    });
  }

  exchangeLongLived(shortToken: string) {
    return this.request<{ access_token: string; expires_in?: number }>("GET", "oauth/access_token", {
      grant_type: "fb_exchange_token",
      client_id: config.appId,
      client_secret: config.appSecret,
      fb_exchange_token: shortToken,
    });
  }

  /** Every page of a list endpoint, following the `after` cursor. */
  async all<T>(path: string, params: Params = {}, maxPages = 20): Promise<T[]> {
    const out: T[] = [];
    let after: string | undefined;
    for (let i = 0; i < maxPages; i++) {
      const res = await this.request<{ data: T[]; paging?: { cursors?: { after?: string }; next?: string } }>("GET", path, {
        ...params,
        after,
      });
      out.push(...res.data);
      after = res.paging?.next ? res.paging.cursors?.after : undefined;
      if (!after) break;
    }
    return out;
  }

  /**
   * Instagram professional accounts this login can manage:
   * 1. accounts linked to a Facebook Page the user manages, and
   * 2. accounts held in the user's business portfolios (these need not be linked to a Page).
   */
  async linkedInstagramAccounts(): Promise<LinkedAccount[]> {
    const found = new Map<string, LinkedAccount>();
    const pages = await this.all<{ id: string; name: string; instagram_business_account?: { id: string; username?: string } }>(
      "me/accounts",
      { fields: "id,name,instagram_business_account{id,username}", limit: 100 },
    );
    for (const p of pages) {
      const ig = p.instagram_business_account;
      if (ig) found.set(ig.id, { igUserId: ig.id, username: ig.username ?? "", pageName: p.name });
    }

    // Business portfolios: a failure here (no business_management, no access) must not block login.
    const businesses = await this.all<{ id: string; name: string }>("me/businesses", { fields: "id,name", limit: 100 }).catch(
      () => [],
    );
    await Promise.all(
      businesses.flatMap((b) =>
        ["owned_instagram_assets", "client_instagram_assets"].map((edge) =>
          this.all<{ ig_user_id?: string; ig_username?: string }>(`${b.id}/${edge}`, {
            fields: "ig_user_id,ig_username",
            limit: 100,
          }).then(
            (assets) => {
              for (const a of assets) {
                if (a.ig_user_id && !found.has(a.ig_user_id)) {
                  found.set(a.ig_user_id, {
                    igUserId: a.ig_user_id,
                    username: a.ig_username ?? "",
                    pageName: `${b.name.trim()} (business portfolio)`,
                  });
                }
              }
            },
            () => undefined,
          ),
        ),
      ),
    );
    return [...found.values()].sort((a, b) => a.username.localeCompare(b.username));
  }

  // ---------- account ----------

  profile(igUserId: string) {
    return this.request<{
      id: string;
      username: string;
      name?: string;
      profile_picture_url?: string;
      followers_count?: number;
      follows_count?: number;
      media_count?: number;
    }>("GET", igUserId, {
      fields: "id,username,name,profile_picture_url,followers_count,follows_count,media_count",
    });
  }

  publishingLimit(igUserId: string) {
    return this.request<{ data: { quota_usage: number; config?: { quota_total: number; quota_duration: number } }[] }>(
      "GET",
      `${igUserId}/content_publishing_limit`,
      { fields: "quota_usage,config" },
    );
  }

  // ---------- publishing ----------

  createImageContainer(igUserId: string, imageUrl: string, caption: string) {
    return this.request<{ id: string }>("POST", `${igUserId}/media`, { image_url: imageUrl, caption });
  }

  /**
   * Reel container. With `trial`, it becomes a Trial Reel: shown to non-followers first, then shared
   * with followers by hand (MANUAL) or automatically if it performs well (SS_PERFORMANCE).
   */
  async createReelContainer(
    igUserId: string,
    videoUrl: string,
    caption: string,
    shareToFeed: boolean,
    trial?: "MANUAL" | "SS_PERFORMANCE" | null,
    coverOffsetMs?: number | null,
    audio?: AudioConfiguration | null,
  ) {
    const local = localMediaPath(videoUrl);
    if (isLocalMedia(videoUrl) && !local) throw new GraphError(`Video file not found: ${videoUrl}`, 400);
    const created = await this.request<{ id: string }>("POST", `${igUserId}/media`, {
      media_type: "REELS",
      // A file on this computer is sent with a resumable upload instead of being fetched from a URL.
      ...(local ? { upload_type: "resumable" } : { video_url: videoUrl }),
      caption,
      // thumb_offset: the video frame (in ms) Instagram uses as the Reel's cover.
      ...(coverOffsetMs != null ? { thumb_offset: Math.round(coverOffsetMs) } : {}),
      ...(trial
        ? { trial_params: JSON.stringify({ graduation_strategy: trial }) }
        : { share_to_feed: shareToFeed }),
      // Instagram Audio API: music from Instagram's library mixed in at creation time.
      ...(audio
        ? {
            audio_configuration: JSON.stringify({
              audio_id: audio.audioId,
              ...(audio.audioVolume != null ? { audio_volume: audio.audioVolume } : {}),
              ...(audio.videoVolume != null ? { video_volume: audio.videoVolume } : {}),
            }),
          }
        : {}),
    });
    if (local) await this.uploadFile(`https://rupload.facebook.com/ig-api-upload/${this.version}/${created.id}`, local);
    return created;
  }

  /**
   * Instagram Audio API (Facebook Login only). With no query, Instagram returns what is trending now.
   * Only audio cleared for third-party use is returned, so it is a subset of the in-app library.
   */
  async searchAudio(igUserId: string, opts: { type?: "music" | "original_sound"; query?: string } = {}): Promise<{ data: IgAudio[] }> {
    const res = await this.request<{ audio?: IgAudio[]; data?: IgAudio[] }>("GET", "ig_audio", {
      user_id: igUserId,
      audio_type: opts.type ?? "music",
      ...(opts.query ? { search_query: opts.query } : {}),
    });
    // Instagram returns the tracks under "audio", not the usual "data".
    return { data: res.audio ?? res.data ?? [] };
  }

  /** Sends a local file to a Meta rupload endpoint in one request. */
  async uploadFile(url: string, filePath: string, token = this.token) {
    const data = await fs.promises.readFile(filePath);
    const res = await this.fetchImpl(url, {
      method: "POST",
      headers: { authorization: `OAuth ${token}`, offset: "0", file_size: String(data.length), "content-type": "application/octet-stream" },
      body: data,
      cache: "no-store",
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean; debug_info?: { message?: string }; error?: { message?: string } };
    if (!res.ok || json.success === false || json.error) {
      throw new GraphError(`Video upload failed: ${json.debug_info?.message ?? json.error?.message ?? `HTTP ${res.status}`}`, res.status);
    }
  }

  containerStatus(containerId: string) {
    return this.request<{ status_code: "EXPIRED" | "ERROR" | "FINISHED" | "IN_PROGRESS" | "PUBLISHED"; status?: string }>(
      "GET",
      containerId,
      { fields: "status_code,status" },
    );
  }

  publishContainer(igUserId: string, containerId: string) {
    return this.request<{ id: string }>("POST", `${igUserId}/media_publish`, { creation_id: containerId });
  }

  mediaPermalink(mediaId: string) {
    return this.request<{ id: string; permalink?: string }>("GET", mediaId, { fields: "permalink" });
  }

  // ---------- media & insights ----------

  recentMedia(igUserId: string, limit = 12) {
    return this.request<{ data: Media[] }>("GET", `${igUserId}/media`, {
      fields: MEDIA_FIELDS,
      limit,
    });
  }

  /** Per-post insights. Metric availability varies by media type and API version. */
  async mediaInsights(mediaId: string, metrics: string[] = DEFAULT_MEDIA_METRICS) {
    const res = await this.request<{ data: { name: string; values?: { value: number }[]; total_value?: { value: number } }[] }>(
      "GET",
      `${mediaId}/insights`,
      { metric: metrics.join(",") },
    );
    const out: Record<string, number> = {};
    for (const m of res.data) out[m.name] = m.total_value?.value ?? m.values?.[0]?.value ?? 0;
    return out;
  }

  /**
   * Account-wide totals between two times (e.g. local midnight to now): views of all the account's content,
   * accounts reached, and interactions. Instagram limits the window to 30 days and counts with some delay.
   */
  async accountTotals(igUserId: string, since: Date, until: Date, metrics = ["views", "reach", "total_interactions"]) {
    const res = await this.request<{ data: { name: string; total_value?: { value: number } }[] }>("GET", `${igUserId}/insights`, {
      metric: metrics.join(","),
      period: "day",
      metric_type: "total_value",
      since: String(Math.floor(since.getTime() / 1000)),
      until: String(Math.floor(until.getTime() / 1000)),
    });
    const out: Record<string, number> = {};
    for (const m of res.data) out[m.name] = m.total_value?.value ?? 0;
    return out;
  }

  // ---------- Facebook Pages ----------

  /** The Facebook Page linked to an Instagram account, with a Page token (needs pages_show_list). */
  async pageForInstagram(igUserId: string): Promise<FacebookPage | null> {
    return (await this.pagesByInstagram()).get(igUserId) ?? null;
  }

  /**
   * Pages this login can reach: its own (me/accounts, which needs a direct role) plus those held by its business
   * portfolios. Portfolio lookups are best effort, like linkedInstagramAccounts; a me/accounts failure throws.
   */
  async managedPages() {
    type Row = { id: string; name: string; instagram_business_account?: { id: string; username?: string }; picture?: { data?: { url?: string } } };
    const fields = "id,name,instagram_business_account{id,username},picture.type(large){url}";
    const own = await this.all<Row>("me/accounts", { fields, limit: 100 });
    const businesses = await this.all<{ id: string }>("me/businesses", { fields: "id", limit: 100 }).catch(() => []);
    const held = await Promise.all(
      businesses.flatMap((b) => ["owned_pages", "client_pages"].map((edge) => this.all<Row>(`${b.id}/${edge}`, { fields, limit: 100 }).catch(() => []))),
    );
    const byId = new Map<string, Row>();
    for (const p of [...own, ...held.flat()]) if (!byId.has(p.id)) byId.set(p.id, p);
    return [...byId.values()].map((p) => ({
      id: p.id,
      name: p.name,
      instagramId: p.instagram_business_account?.id ?? null,
      instagram: p.instagram_business_account?.username ?? null,
      picture: p.picture?.data?.url ?? null,
    }));
  }

  /** Every Page the user manages that has an Instagram account linked, keyed by Instagram user ID. */
  async pagesByInstagram(): Promise<Map<string, FacebookPage>> {
    const pages = await this.all<{
      id: string;
      name: string;
      access_token?: string;
      instagram_business_account?: { id: string };
      picture?: { data?: { url?: string } };
    }>("me/accounts", { fields: "id,name,access_token,instagram_business_account{id},picture.type(large){url}", limit: 100 });
    const out = new Map<string, FacebookPage>();
    for (const p of pages) {
      const ig = p.instagram_business_account?.id;
      if (ig && p.access_token) out.set(ig, { id: p.id, name: p.name, token: p.access_token, picture: p.picture?.data?.url ?? null });
    }
    return out;
  }

  /**
   * Starts a Facebook Reel on a Page from a public video URL and publishes it (call on a client holding the Page token).
   * Facebook keeps processing afterwards; poll pageVideoStatus. Needs pages_manage_posts.
   */
  async publishPageReel(pageId: string, videoUrl: string, description: string, state: "PUBLISHED" | "DRAFT" = "PUBLISHED") {
    const start = await this.request<{ video_id: string }>("POST", `${pageId}/video_reels`, { upload_phase: "start" });
    const local = localMediaPath(videoUrl);
    if (isLocalMedia(videoUrl) && !local) throw new GraphError(`Video file not found: ${videoUrl}`, 400);
    if (local) {
      await this.uploadFile(`https://rupload.facebook.com/video-upload/${this.version}/${start.video_id}`, local);
      await this.request("POST", `${pageId}/video_reels`, { upload_phase: "finish", video_id: start.video_id, video_state: state, description });
      return { videoId: start.video_id };
    }
    const res = await this.fetchImpl(`https://rupload.facebook.com/video-upload/${this.version}/${start.video_id}`, {
      method: "POST",
      headers: { authorization: `OAuth ${this.token}`, file_url: videoUrl },
      cache: "no-store",
    });
    const up = (await res.json().catch(() => ({}))) as { success?: boolean; debug_info?: { message?: string }; error?: { message?: string } };
    if (!res.ok || !up.success) {
      throw new GraphError(`Facebook could not fetch the video: ${up.debug_info?.message ?? up.error?.message ?? `HTTP ${res.status}`}`, res.status);
    }
    await this.request("POST", `${pageId}/video_reels`, {
      upload_phase: "finish",
      video_id: start.video_id,
      video_state: state,
      description,
    });
    return { videoId: start.video_id };
  }

  /** Processing/publishing state of a Page video, plus its link once live. */
  async pageVideoStatus(videoId: string) {
    return this.request<{
      status?: {
        video_status?: string;
        processing_phase?: { status?: string; errors?: { message?: string }[] };
        publishing_phase?: { status?: string; errors?: { message?: string }[] };
        uploading_phase?: { status?: string; errors?: { message?: string }[] };
      };
      permalink_url?: string;
    }>("GET", videoId, { fields: "status,permalink_url" });
  }

  /** Plays of a published Facebook Reel (needs read_insights). */
  async pageReelPlays(videoId: string): Promise<number | null> {
    const res = await this.request<{ data: { name: string; values?: { value: number }[] }[] }>("GET", `${videoId}/video_insights`, {
      metric: "blue_reels_play_count",
    });
    return res.data[0]?.values?.[0]?.value ?? null;
  }

  /** Followers of a Page. */
  async pageFollowers(pageId: string): Promise<number | null> {
    const r = await this.request<{ followers_count?: number }>("GET", pageId, { fields: "followers_count" });
    return r.followers_count ?? null;
  }

  /** Permissions the user has granted this app. */
  async grantedPermissions(): Promise<Set<string>> {
    const r = await this.request<{ data: { permission: string; status: string }[] }>("GET", "me/permissions");
    return new Set(r.data.filter((p) => p.status === "granted").map((p) => p.permission));
  }

  // ---------- engagement ----------

  /** Recent posts from another Business/Creator account (Business Discovery). */
  async discover(igUserId: string, username: string, limit = 6) {
    const res = await this.request<{
      business_discovery: {
        id: string;
        username: string;
        name?: string;
        profile_picture_url?: string;
        followers_count?: number;
        media?: { data: Media[] };
      };
    }>("GET", igUserId, {
      fields: `business_discovery.username(${username}){id,username,name,profile_picture_url,followers_count,media.limit(${limit}){${MEDIA_FIELDS}}}`,
    });
    return res.business_discovery;
  }

  /** POST /{ig-user-id}/likes — requires instagram_manage_engagement. */
  like(igUserId: string, target: { mediaId?: string; commentId?: string }) {
    return this.request<{ success: boolean }>("POST", `${igUserId}/likes`, likeTarget(target));
  }

  /** DELETE /{ig-user-id}/likes */
  unlike(igUserId: string, target: { mediaId?: string; commentId?: string }) {
    return this.request<{ success: boolean }>("DELETE", `${igUserId}/likes`, likeTarget(target));
  }

  comments(mediaId: string, limit = 25) {
    return this.request<{ data: Comment[] }>("GET", `${mediaId}/comments`, {
      fields: "id,text,username,timestamp,like_count,replies{id,username}",
      limit,
    });
  }

  reply(commentId: string, message: string) {
    return this.request<{ id: string }>("POST", `${commentId}/replies`, { message });
  }
}

function likeTarget(t: { mediaId?: string; commentId?: string }): Params {
  if (!!t.mediaId === !!t.commentId) throw new Error("Pass exactly one of mediaId or commentId");
  return t.mediaId ? { media_id: t.mediaId } : { comment_id: t.commentId };
}

export const MEDIA_FIELDS =
  "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count";

export const DEFAULT_MEDIA_METRICS = ["reach", "views", "saved", "shares", "total_interactions"];

export interface FacebookPage {
  id: string;
  name: string;
  token: string;
  /** Profile picture URL (Facebook CDN; expires after a while, so fetch fresh). */
  picture: string | null;
}

export interface Media {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

export interface LinkedAccount {
  igUserId: string;
  username: string;
  /** The Facebook Page it is linked to, or "<portfolio> (business portfolio)". */
  pageName: string;
}

export interface Comment {
  id: string;
  text: string;
  username?: string;
  timestamp: string;
  like_count?: number;
  replies?: { data: { id: string; username?: string }[] };
}

export function loginUrl(state: string, scopes: string[]) {
  const u = new URL(`https://www.facebook.com/${config.graphVersion}/dialog/oauth`);
  u.searchParams.set("client_id", config.appId);
  u.searchParams.set("redirect_uri", config.redirectUri);
  u.searchParams.set("state", state);
  u.searchParams.set("response_type", "code");
  // Facebook Login for Business apps request permissions through a saved configuration.
  if (config.loginConfigId) u.searchParams.set("config_id", config.loginConfigId);
  else {
    u.searchParams.set("scope", scopes.join(","));
    // Without this Facebook won't ask again for a permission that was declined before.
    u.searchParams.set("auth_type", "rerequest");
  }
  return u.toString();
}
