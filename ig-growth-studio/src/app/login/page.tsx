export default async function LoginPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { error, next } = await searchParams;
  return (
    <div className="card stack" style={{ maxWidth: 380, margin: "10vh auto 0" }}>
      <h1>IG Growth Studio</h1>
      {error === "wrong" && <p className="error">Wrong password.</p>}
      {error === "nopassword" && <p className="error">Set APP_PASSWORD in your .env file, then restart the app.</p>}
      <form action="/api/login" method="post" className="stack">
        <input type="hidden" name="next" value={next ?? "/"} />
        <label>
          Password
          <input type="password" name="password" autoFocus required />
        </label>
        <button className="primary" type="submit">Sign in</button>
      </form>
    </div>
  );
}
