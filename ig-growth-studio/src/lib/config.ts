import path from "node:path";

export const config = {
  get appId() {
    return process.env.META_APP_ID ?? "";
  },
  get appSecret() {
    return process.env.META_APP_SECRET ?? "";
  },
  get graphVersion() {
    return process.env.GRAPH_API_VERSION || "v26.0";
  },
  get appUrl() {
    return (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  },
  /** Facebook Login for Business configuration ID. When set, it replaces the scope list. */
  get loginConfigId() {
    return process.env.META_LOGIN_CONFIG_ID ?? "";
  },
  get appPassword() {
    return process.env.APP_PASSWORD ?? "";
  },
  get cronSecret() {
    return process.env.CRON_SECRET ?? "";
  },
  /** Bearer key for /api/agent (Claude automation). Empty disables the API. */
  get agentApiKey() {
    return process.env.AGENT_API_KEY ?? "";
  },
  get dailyLikeCap() {
    const n = Number(process.env.DAILY_LIKE_CAP);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 30;
  },
  get databasePath() {
    return process.env.DATABASE_PATH || "./data/studio.db";
  },
  /** Turso/libSQL URL in the cloud; a local SQLite file otherwise. */
  get databaseUrl() {
    const remote = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
    if (remote) return remote;
    // On Vercel the file system is temporary: a local file would silently lose data between deployments.
    if (process.env.VERCEL) throw new Error("No cloud database configured: set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.");
    const p = this.databasePath;
    return p === ":memory:" ? ":memory:" : `file:${path.resolve(p)}`;
  },
  get databaseAuthToken() {
    return process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN || undefined;
  },
  get redirectUri() {
    return `${this.appUrl}/api/auth/meta/callback`;
  },
};

/** What posting to, and reading plays from, Facebook Pages needs on top of the Instagram permissions. */
export const FACEBOOK_SCOPES = ["pages_manage_posts", "read_insights"];

/**
 * Permissions requested during Facebook Login.
 * When META_LOGIN_CONFIG_ID is set, Meta ignores this list and uses the login configuration's own list instead.
 */
export const META_SCOPES = [
  "instagram_basic",
  "instagram_content_publish",
  "instagram_manage_comments",
  "instagram_manage_insights",
  "instagram_manage_engagement",
  "pages_show_list",
  "pages_read_engagement",
  // Facebook Reels on the linked Page, and their play counts.
  "pages_manage_posts",
  "read_insights",
  "business_management",
];
