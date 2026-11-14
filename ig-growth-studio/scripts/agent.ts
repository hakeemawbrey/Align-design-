/**
 * Calls the app's Claude API with the key from .env, so the key never has to be typed or printed.
 *
 *   npm run agent -- GET /accounts
 *   npm run agent -- GET "/posts?account=comealign"
 *   npm run agent -- POST /posts '{"account":"comealign","type":"REELS",...}'
 *   npm run agent -- POST /drafts @draft.json        (body from a file)
 *   npm run agent -- DELETE /posts/12
 *
 * The web app (npm start) must be running.
 */
import fs from "node:fs";
import path from "node:path";

function loadEnv(file: string) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}

async function main() {
  loadEnv(path.join(__dirname, "..", ".env"));
  const [method = "GET", route = "", rawBody] = process.argv.slice(2);
  const key = process.env.AGENT_API_KEY;
  if (!key) {
    console.error("AGENT_API_KEY is not set in .env");
    process.exit(2);
  }
  const base = (process.env.STUDIO_URL || process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const url = `${base}/api/agent${route.startsWith("/") || route === "" ? route : `/${route}`}`;
  const body = rawBody?.startsWith("@") ? fs.readFileSync(rawBody.slice(1), "utf8") : rawBody;
  let res: Response;
  try {
    res = await fetch(url, {
      method: method.toUpperCase(),
      headers: { authorization: `Bearer ${key}`, ...(body ? { "content-type": "application/json" } : {}) },
      body,
    });
  } catch {
    console.error(`Could not reach ${base}. Is the app running (npm start)?`);
    process.exit(1);
  }
  const text = await res.text();
  try {
    console.log(JSON.stringify(JSON.parse(text), null, 2));
  } catch {
    console.log(text);
  }
  if (!res.ok) process.exit(1);
}

void main();
