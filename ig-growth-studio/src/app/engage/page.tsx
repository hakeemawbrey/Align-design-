import { addNicheAccount, removeNicheAccount } from "@/app/actions";
import { ConnectPrompt } from "@/components/ConnectPrompt";
import { LikeButton } from "@/components/LikeButton";
import { ReplyForm } from "@/components/ReplyForm";
import { config } from "@/lib/config";
import { getAccount, getDb, listDrafts, listNiche } from "@/lib/db";
import { GraphClient, type Comment, type Media } from "@/lib/graph";
import { unansweredComments } from "@/lib/insights";
import { likedIds, likesToday } from "@/lib/likes";

export const dynamic = "force-dynamic";

const MAX_FEED_AGE_DAYS = 14;

export default async function EngagePage() {
  const db = await getDb();
  const account = await getAccount(db);
  if (!account) {
    return (
      <>
        <h1>Engage</h1>
        <ConnectPrompt />
      </>
    );
  }
  const client = new GraphClient({ token: account.token });
  const niche = await listNiche(db, account.igUserId);
  const liked = await likedIds(db, account.igUserId);
  const drafts = await listDrafts(db, account.igUserId);

  // Recent posts from niche accounts (Business Discovery only works for Business/Creator accounts).
  const discovered = await Promise.all(
    niche.map((u) =>
      client.discover(account.igUserId, u, 6).then(
        (d) => ({ username: u, posts: d.media?.data ?? [], error: null as string | null }),
        (e: Error) => ({ username: u, posts: [] as Media[], error: e.message }),
      ),
    ),
  );
  const cutoff = Date.now() - MAX_FEED_AGE_DAYS * 86_400_000;
  const feed = discovered
    .flatMap((d) => d.posts.map((p) => ({ ...p, owner: d.username })))
    .filter((p) => new Date(p.timestamp).getTime() >= cutoff)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  const failures = discovered.filter((d) => d.error);

  // Comments on your recent posts that you have not replied to yet.
  let unanswered: { media: Media; comment: Comment }[] = [];
  let commentsError: string | null = null;
  try {
    unanswered = await unansweredComments(account, client);
  } catch (err) {
    commentsError = err instanceof Error ? err.message : "Could not load comments";
  }

  return (
    <>
      <h1>
        Engage <span className="muted">@{account.username}</span>
      </h1>
      <p className="muted small">
        Every like and reply here is one click by you. Likes are capped at {config.dailyLikeCap} a day per account (
        {await likesToday(db, account.igUserId)} used today) and spaced a few seconds apart. Thoughtful replies grow an account faster than
        likes.
      </p>

      <h2>Reply to comments on your posts</h2>
      <div className="card stack">
        {commentsError && <p className="error">{commentsError}</p>}
        {unanswered.length === 0 && !commentsError && <p className="muted" style={{ margin: 0 }}>You&apos;re all caught up.</p>}
        {unanswered.map(({ media, comment }) => (
          <div key={comment.id} className="stack" style={{ gap: 6, borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
            <div className="small">
              <strong>@{comment.username}</strong> on{" "}
              <a href={media.permalink} target="_blank" rel="noreferrer">
                your post from {new Date(media.timestamp).toLocaleDateString()}
              </a>
            </div>
            <div>{comment.text}</div>
            <ReplyForm commentId={comment.id} account={account.igUserId} draft={drafts.get(comment.id)} />
          </div>
        ))}
      </div>

      <h2>Accounts in your niche</h2>
      <div className="card stack">
        <form action={addNicheAccount} className="row" style={{ flexWrap: "nowrap" }}>
          <input name="username" placeholder="@username (Business or Creator account)" required />
          <button type="submit">Add</button>
        </form>
        <div className="row">
          {niche.map((u) => (
            <form key={u} action={removeNicheAccount} className="row" style={{ gap: 4 }}>
              <input type="hidden" name="username" value={u} />
              <a href={`https://www.instagram.com/${u}/`} target="_blank" rel="noreferrer">
                @{u}
              </a>
              <button type="submit" aria-label={`Remove ${u}`} style={{ padding: "0 8px" }}>
                ×
              </button>
            </form>
          ))}
          {niche.length === 0 && <span className="muted small">Add a few accounts whose audience you want to reach.</span>}
        </div>
        {failures.map((f) => (
          <p key={f.username} className="error small" style={{ margin: 0 }}>
            @{f.username}: {f.error}
          </p>
        ))}
      </div>

      <h2>Recent posts from your niche</h2>
      <div className="grid">
        {feed.map((p) => (
          <div key={p.id} className="card stack" style={{ padding: 10, gap: 8 }}>
            <a href={p.permalink} target="_blank" rel="noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="thumb" src={p.thumbnail_url ?? p.media_url} alt="" loading="lazy" />
            </a>
            <div className="small">
              <strong>@{p.owner}</strong> <span className="muted">· {new Date(p.timestamp).toLocaleDateString()}</span>
            </div>
            <div className="small clamp">{p.caption}</div>
            <div className="row">
              <LikeButton mediaId={p.id} account={account.igUserId} initiallyLiked={liked.has(p.id)} />
              <a className="button" href={p.permalink} target="_blank" rel="noreferrer">
                Comment
              </a>
            </div>
          </div>
        ))}
      </div>
      {feed.length === 0 && niche.length > 0 && failures.length < niche.length && (
        <p className="muted">No posts from the last {MAX_FEED_AGE_DAYS} days.</p>
      )}
    </>
  );
}
