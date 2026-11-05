"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { schedulePost } from "@/app/actions";

type Trial = "" | "MANUAL" | "SS_PERFORMANCE";

export function ScheduleForm({
  accounts,
  defaultAccount,
  defaultDate,
}: {
  accounts: { igUserId: string; username: string; facebookPage: string | null }[];
  defaultAccount: string;
  /** YYYY-MM-DD picked from the calendar; the time defaults to 9:00. */
  defaultDate?: string;
}) {
  const [state, action, pending] = useActionState(schedulePost, {});
  const [type, setType] = useState<"IMAGE" | "REELS">("IMAGE");
  const [trial, setTrial] = useState<Trial>("");
  const [caption, setCaption] = useState("");
  const [account, setAccount] = useState(defaultAccount);
  const page = accounts.find((a) => a.igUserId === account)?.facebookPage ?? null;
  const [tzOffset, setTzOffset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setTzOffset(new Date().getTimezoneOffset()), []);
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setCaption("");
      setType("IMAGE");
      setTrial("");
    }
  }, [state]);

  const hashtags = (caption.match(/#\w+/g) ?? []).length;

  return (
    <form ref={formRef} action={action} className="card stack" id="new">
      <input type="hidden" name="tzOffset" value={tzOffset} />
      <div className="row">
        <label style={{ flex: "1 1 160px" }}>
          Account
          <select name="account" value={account} onChange={(e) => setAccount(e.target.value)}>
            {accounts.map((a) => (
              <option key={a.igUserId} value={a.igUserId}>
                @{a.username}
              </option>
            ))}
          </select>
        </label>
        <label style={{ flex: "1 1 140px" }}>
          Type
          <select name="type" value={type} onChange={(e) => setType(e.target.value as "IMAGE" | "REELS")}>
            <option value="IMAGE">Image post</option>
            <option value="REELS">Reel</option>
          </select>
        </label>
        <label style={{ flex: "1 1 220px" }}>
          Publish at (your local time)
          <input
            type="datetime-local"
            name="scheduledAt"
            required
            defaultValue={defaultDate ? `${defaultDate}T09:00` : undefined}
            key={defaultDate}
          />
        </label>
      </div>
      {type === "REELS" && (
        <label>
          Audience
          <select name="trial" value={trial} onChange={(e) => setTrial(e.target.value as Trial)}>
            <option value="">Regular Reel: followers and everyone else</option>
            <option value="MANUAL">Trial Reel: non-followers first, I&apos;ll share it with followers myself</option>
            <option value="SS_PERFORMANCE">Trial Reel: non-followers first, auto-share if it performs well</option>
          </select>
          {trial && (
            <span className="small muted">
              Trial Reels are shown only to people who don&apos;t follow you. You can check how it did and share it with
              followers in the Instagram app.
            </span>
          )}
        </label>
      )}
      <label>
        {type === "REELS" ? "Video URL (MP4, public https link)" : "Image URL (JPEG, public https link)"}
        <input type="url" name="mediaUrl" placeholder="https://…" required />
      </label>
      <label>
        Caption
        <textarea name="caption" value={caption} onChange={(e) => setCaption(e.target.value)} maxLength={2200} />
        <span className={`small ${hashtags > 30 ? "error" : "muted"}`}>
          {caption.length}/2200 characters · {hashtags}/30 hashtags
        </span>
      </label>
      {type === "REELS" && !trial && (
        <label className="row" style={{ display: "flex" }}>
          <input type="checkbox" name="shareToFeed" defaultChecked style={{ width: "auto" }} />
          Also show the Reel in the main feed grid
        </label>
      )}
      {type === "REELS" && page && (
        <label className="row" style={{ display: "flex" }}>
          <input type="checkbox" name="facebook" style={{ width: "auto" }} />
          Also post to the Facebook Page &ldquo;{page}&rdquo; at the same time (videos 3&ndash;90 seconds)
        </label>
      )}
      <div className="row">
        <button className="primary" type="submit" disabled={pending}>
          {pending ? "Scheduling…" : "Schedule"}
        </button>
        {state.error && <span className="error">{state.error}</span>}
        {state.ok && <span className="ok">Scheduled.</span>}
      </div>
    </form>
  );
}
