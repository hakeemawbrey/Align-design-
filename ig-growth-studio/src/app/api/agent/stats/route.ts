import { type NextRequest, NextResponse } from "next/server";
import { agentAuth, graphFailure, resolveAccount } from "@/lib/agent";
import { getDb, listSnapshots } from "@/lib/db";
import { GraphClient } from "@/lib/graph";
import { accountStats } from "@/lib/insights";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const denied = agentAuth(req);
  if (denied) return denied;
  const db = await getDb();
  const account = await resolveAccount(db, req.nextUrl.searchParams.get("account"));
  if (account instanceof NextResponse) return account;
  try {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const [{ profile, posts, avgRate }, today] = await Promise.all([
      accountStats(account),
      new GraphClient({ token: account.token }).accountTotals(account.igUserId, midnight, now).catch(() => null),
    ]);
    return NextResponse.json({
      account: account.username,
      followers: profile.followers_count ?? null,
      following: profile.follows_count ?? null,
      posts: profile.media_count ?? null,
      avgEngagementPerReach: avgRate,
      today: today && { since: midnight.toISOString(), views: today.views ?? 0, reach: today.reach ?? 0, interactions: today.total_interactions ?? 0 },
      followerHistory: await listSnapshots(db, account.igUserId),
      recentPosts: posts.map((p) => ({
        id: p.media.id,
        type: p.media.media_product_type ?? p.media.media_type,
        postedAt: p.media.timestamp,
        permalink: p.media.permalink,
        caption: p.media.caption ?? "",
        likes: p.media.like_count ?? 0,
        comments: p.media.comments_count ?? 0,
        reach: p.reach,
        views: p.values.views ?? null,
        saves: p.values.saved ?? null,
        shares: p.values.shares ?? null,
        engagementPerReach: p.rate,
      })),
    });
  } catch (err) {
    return graphFailure(err);
  }
}
