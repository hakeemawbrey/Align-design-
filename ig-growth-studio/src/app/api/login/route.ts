import { NextResponse, type NextRequest } from "next/server";
import { config } from "@/lib/config";
import { SESSION_COOKIE, checkPassword, issueSession, sessionCookieOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") ?? "");
  const next = safeNext(String(form.get("next") ?? "/"));

  if (!config.appPassword) {
    return NextResponse.redirect(new URL("/login?error=nopassword", config.appUrl), 303);
  }
  if (!(await checkPassword(config.appPassword, password))) {
    return NextResponse.redirect(new URL(`/login?error=wrong&next=${encodeURIComponent(next)}`, config.appUrl), 303);
  }
  const res = NextResponse.redirect(new URL(next, config.appUrl), 303);
  res.cookies.set(SESSION_COOKIE, await issueSession(config.appPassword), sessionCookieOptions);
  return res;
}

/** Only allow same-site relative paths as a post-login destination. */
function safeNext(next: string) {
  return next.startsWith("/") && !next.startsWith("//") ? next : "/";
}
