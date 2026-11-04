"use client";

import { useState } from "react";

/** Checklist of accounts found at Facebook login. Nothing is added until the owner submits. */
export function ChooseAccounts({
  accounts,
  defaultChecked,
  addAction,
  skipAction,
}: {
  accounts: { igUserId: string; username: string; pageName: string }[];
  defaultChecked: boolean;
  addAction: (form: FormData) => Promise<void>;
  skipAction: () => Promise<void>;
}) {
  const [checked, setChecked] = useState<Set<string>>(
    () => new Set(defaultChecked ? accounts.map((a) => a.igUserId) : []),
  );
  const toggle = (id: string) =>
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <form action={addAction} className="stack" style={{ gap: 8 }}>
      <div className="row small">
        <button type="button" className="link" onClick={() => setChecked(new Set(accounts.map((a) => a.igUserId)))}>
          Select all
        </button>
        <button type="button" className="link" onClick={() => setChecked(new Set())}>
          Select none
        </button>
      </div>
      <div className="choose">
        {accounts.map((a) => (
          <label key={a.igUserId} className="choice">
            <input
              type="checkbox"
              name="igUserId"
              value={a.igUserId}
              checked={checked.has(a.igUserId)}
              onChange={() => toggle(a.igUserId)}
            />
            <span>
              <strong>@{a.username}</strong>
              <span className="muted small"> · {a.pageName}</span>
            </span>
          </label>
        ))}
      </div>
      <div className="row">
        <button className="primary" type="submit" disabled={checked.size === 0}>
          Add {checked.size || ""} account{checked.size === 1 ? "" : "s"}
        </button>
        <button type="submit" formAction={skipAction} formNoValidate>
          Don&apos;t add any
        </button>
      </div>
    </form>
  );
}
