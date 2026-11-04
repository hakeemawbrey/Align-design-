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
  get dailyLikeCap() {
    const n = Number(process.env.DAILY_LIKE_CAP);
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 30;
  },
  get databasePath() {
    return process.env.DATABASE_PATH || "./data/studio.db";
  },
  get redirectUri() {
    return `${this.appUrl}/api/auth/meta/callback`;
  },
};

/** Permissions requested during Facebook Login. */
export const META_SCOPES = [
  "instagram_basic",
  "instagram_content_publish",
  "instagram_manage_comments",
  "instagram_manage_insights",
  "instagram_manage_engagement",
  "pages_show_list",
  "pages_read_engagement",
  "business_management",
];
