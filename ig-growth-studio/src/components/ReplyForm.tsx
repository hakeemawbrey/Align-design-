"use client";

import { useActionState } from "react";
import { discardDraft, replyToComment } from "@/app/actions";

export function ReplyForm({ commentId, account, draft }: { commentId: string; account: string; draft?: string }) {
  const [state, action, pending] = useActionState(replyToComment, {});
  if (state.ok) return <span className="ok small">Replied.</span>;
  return (
    <div className="stack" style={{ gap: 6 }}>
      {draft && (
        <div className="row small">
          <span className="badge claude">Draft by Claude</span>
          <span className="muted">Edit it if you like, then send. Nothing is sent until you click Reply.</span>
          <form action={discardDraft}>
            <input type="hidden" name="commentId" value={commentId} />
            <button type="submit" className="link">Discard draft</button>
          </form>
        </div>
      )}
      <form action={action} className="row" style={{ flexWrap: "nowrap" }}>
        <input type="hidden" name="commentId" value={commentId} />
        <input type="hidden" name="account" value={account} />
        <input name="message" placeholder="Write a reply…" maxLength={2200} defaultValue={draft} required />
        <button type="submit" disabled={pending}>
          Reply
        </button>
      </form>
      {state.error && <span className="error small">{state.error}</span>}
    </div>
  );
}
