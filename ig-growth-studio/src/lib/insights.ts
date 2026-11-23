import type { Account } from "./db";
import { type Comment, GraphClient, type Media } from "./graph";

export type Profile = Awaited<ReturnType<GraphClient["profile"]>>;

export interface PostStats {
  media: Media;
  values: Record<string, number>;
  reach: number;
  interactions: number;
  rate: number | null;
  error: string | null;
}

/** Profile counts plus reach/engagement for the most recent posts of one account. */
export async function accountStats(account: Account, client = new GraphClient({ token: account.token }), limit = 12) {
  const [profile, media] = await Promise.all([
    client.profile(account.igUserId),
    client.recentMedia(account.igUserId, limit).then((r) => r.data),
  ]);
  const insights = await Promise.all(
    media.map((m) =>
      client.mediaInsights(m.id).then(
        (v) => ({ ok: true as const, v }),
        (e: Error) => ({ ok: false as const, error: e.message }),
      ),
    ),
  );
  const posts: PostStats[] = media.map((m, i) => {
    const ins = insights[i];
    const v = ins.ok ? ins.v : {};
    const reach = v.reach ?? 0;
    const interactions =
      v.total_interactions ?? (m.like_count ?? 0) + (m.comments_count ?? 0) + (v.saved ?? 0) + (v.shares ?? 0);
    return { media: m, values: v, reach, interactions, rate: reach > 0 ? interactions / reach : null, error: ins.ok ? null : ins.error };
  });
  const rated = posts.filter((p) => p.rate !== null);
  const avgRate = rated.length ? rated.reduce((s, p) => s + (p.rate ?? 0), 0) / rated.length : null;
  return { profile: profile as Profile, posts, avgRate };
}

/** Comments on the account's recent posts that the account has not replied to yet. */
export async function unansweredComments(
  account: Account,
  client = new GraphClient({ token: account.token }),
  mediaLimit = 8,
): Promise<{ media: Media; comment: Comment }[]> {
  const mine = (await client.recentMedia(account.igUserId, mediaLimit)).data;
  const lists = await Promise.all(mine.map((m) => client.comments(m.id).then((c) => ({ m, c: c.data }))));
  return lists.flatMap(({ m, c }) =>
    c
      .filter((cm) => cm.username !== account.username)
      .filter((cm) => !cm.replies?.data.some((r) => r.username === account.username))
      .map((cm) => ({ media: m, comment: cm })),
  );
}
