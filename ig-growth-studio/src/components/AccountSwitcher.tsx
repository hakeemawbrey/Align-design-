"use client";

import { useRef } from "react";
import { selectAccount } from "@/app/actions";

/** Header dropdown that changes which account the Dashboard, Engage and Schedule form use. */
export function AccountSwitcher({
  accounts,
  active,
}: {
  accounts: { igUserId: string; username: string }[];
  active: string;
}) {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form ref={ref} action={selectAccount}>
      <select
        name="igUserId"
        aria-label="Instagram account"
        defaultValue={active}
        key={active}
        onChange={() => ref.current?.requestSubmit()}
        className="switcher"
      >
        {accounts.map((a) => (
          <option key={a.igUserId} value={a.igUserId}>
            @{a.username}
          </option>
        ))}
      </select>
    </form>
  );
}
