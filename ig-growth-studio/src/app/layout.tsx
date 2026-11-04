import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { AccountSwitcher } from "@/components/AccountSwitcher";
import { getAccount, getDb, listAccounts } from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/session";
import "./globals.css";

export const metadata: Metadata = {
  title: "IG Growth Studio",
  description: "Schedule posts, engage with your niche and track growth with the official Instagram API.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const signedIn = (await cookies()).has(SESSION_COOKIE);
  const account = signedIn ? await getAccount(await getDb()) : null;
  const accounts = signedIn ? (await listAccounts(await getDb())).map(({ igUserId, username }) => ({ igUserId, username })) : [];
  return (
    <html lang="en">
      <body>
        {signedIn && (
          <header className="top">
            <span className="brand">IG Growth Studio</span>
            <nav>
              <Link href="/">Dashboard</Link>
              <Link href="/schedule">Schedule</Link>
              <Link href="/engage">Engage</Link>
              <Link href="/settings">Settings</Link>
            </nav>
            {account && accounts.length > 1 ? (
              <AccountSwitcher accounts={accounts} active={account.igUserId} />
            ) : (
              <span className="muted small">{account ? `@${account.username}` : "Not connected"}</span>
            )}
            <form action="/api/logout" method="post">
              <button type="submit">Sign out</button>
            </form>
          </header>
        )}
        <main>{children}</main>
      </body>
    </html>
  );
}
