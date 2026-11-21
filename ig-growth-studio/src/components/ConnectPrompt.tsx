import Link from "next/link";

export function ConnectPrompt() {
  return (
    <div className="card stack">
      <p>Connect your Instagram professional account to get started.</p>
      <div>
        <Link className="button primary" href="/settings">Go to Settings</Link>
      </div>
    </div>
  );
}
