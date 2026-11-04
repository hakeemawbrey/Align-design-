"use client";

import { useActionState } from "react";
import { replyToComment } from "@/app/actions";

export function ReplyForm({ commentId }: { commentId: string }) {
  const [state, action, pending] = useActionState(replyToComment, {});
  if (state.ok) return <span className="ok small">Replied.</span>;
  return (
    <form action={action} className="row" style={{ flexWrap: "nowrap" }}>
      <input type="hidden" name="commentId" value={commentId} />
      <input name="message" placeholder="Write a reply…" maxLength={2200} required />
      <button type="submit" disabled={pending}>
        Reply
      </button>
      {state.error && <span className="error small">{state.error}</span>}
    </form>
  );
}
