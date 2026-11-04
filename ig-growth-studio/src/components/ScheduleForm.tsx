"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { schedulePost } from "@/app/actions";

export function ScheduleForm() {
  const [state, action, pending] = useActionState(schedulePost, {});
  const [type, setType] = useState<"IMAGE" | "REELS">("IMAGE");
  const [caption, setCaption] = useState("");
  const [tzOffset, setTzOffset] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setTzOffset(new Date().getTimezoneOffset()), []);
  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      setCaption("");
      setType("IMAGE");
    }
  }, [state]);

  const hashtags = (caption.match(/#\w+/g) ?? []).length;

  return (
    <form ref={formRef} action={action} className="card stack">
      <input type="hidden" name="tzOffset" value={tzOffset} />
      <div className="row">
        <label style={{ flex: "1 1 160px" }}>
          Type
          <select name="type" value={type} onChange={(e) => setType(e.target.value as "IMAGE" | "REELS")}>
            <option value="IMAGE">Image post</option>
            <option value="REELS">Reel</option>
          </select>
        </label>
        <label style={{ flex: "1 1 220px" }}>
          Publish at (your local time)
          <input type="datetime-local" name="scheduledAt" required />
        </label>
      </div>
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
      {type === "REELS" && (
        <label className="row" style={{ display: "flex" }}>
          <input type="checkbox" name="shareToFeed" defaultChecked style={{ width: "auto" }} />
          Also show the Reel in the main feed grid
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
