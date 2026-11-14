import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { META_SCOPES, config } from "@/lib/config";
import { loginUrl } from "@/lib/graph";

export async function GET() {
  if (!config.appId || !config.appSecret) {
    return NextResponse.redirect(new URL("/settings?error=missing_app", config.appUrl));
  }
  const state = crypto.randomBytes(16).toString("hex");
  const res = NextResponse.redirect(loginUrl(state, META_SCOPES));
  res.cookies.set("meta_oauth_state", state, { httpOnly: true, sameSite: "lax", path: "/", maxAge: 600 });
  return res;
}
