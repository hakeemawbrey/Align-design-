"use client";

import { useState } from "react";

export function LikeButton({
  mediaId,
  account,
  initiallyLiked,
}: {
  mediaId: string;
  /** IG user ID of the account that likes, so a switch in another tab cannot change it. */
  account: string;
  initiallyLiked: boolean;
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function toggle() {
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/like", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: liked ? "unlike" : "like", mediaId, account }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Request failed");
      setLiked(!liked);
      setMsg(`${json.likesToday}/${json.cap} today`);
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="row">
      <button type="button" onClick={toggle} disabled={busy} className={liked ? "" : "primary"}>
        {liked ? "Liked ✓" : "Like"}
      </button>
      {msg && <span className="small muted">{msg}</span>}
    </div>
  );
}
