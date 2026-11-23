"use client";

import { useActionState } from "react";
import { sendStudyAction, startStudyAction } from "@/app/actions";

export function StartStudyForm() {
  const [state, action, pending] = useActionState(startStudyAction, {});
  return (
    <form action={action} className="row">
      <label htmlFor="target" className="small muted">
        Instagram handle or Facebook page link
      </label>
      <input id="target" name="target" placeholder="@tylerinthemaking" required style={{ minWidth: 260 }} />
      <label className="small muted" htmlFor="limit">
        Posts
      </label>
      <select id="limit" name="limit" defaultValue="">
        <option value="">All</option>
        <option value="12">Newest 12 (a quick test)</option>
        <option value="50">Newest 50</option>
      </select>
      <button type="submit" disabled={pending}>
        {pending ? "Queuing…" : "Study this page"}
      </button>
      {state.error && <span className="error small">{state.error}</span>}
      {state.ok && <span className="ok small">{state.ok}</span>}
    </form>
  );
}

export function SendStudyButton({ handle }: { handle: string }) {
  const [state, action, pending] = useActionState(sendStudyAction, {});
  return (
    <form action={action} className="row">
      <input type="hidden" name="handle" value={handle} />
      <button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send to private repo"}
      </button>
      {state.error && <span className="error small">{state.error}</span>}
      {state.ok && <span className="ok small">{state.ok}</span>}
    </form>
  );
}
