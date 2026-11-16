/**
 * Builds the Claude ideas page (an Artifact that runs on your Claude plan) with the latest numbers:
 *
 *   npm run ideas-page                                   # writes data/reports/ideas.html
 *   npm run ideas-page -- --url=https://claude.ai/artifact/…   # also links the Analyze page to the published page
 *
 * Then publish data/reports/ideas.html with the Artifact tool (same URL each time).
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { openDb, setSetting } from "../src/lib/db";

const root = path.join(__dirname, "..");
const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("--url="))?.slice(6);
const days = args.find((a) => /^\d+$/.test(a)) ?? "30";
const json = execFileSync("npx", ["tsx", path.join(root, "scripts", "analysis-export.ts"), days], {
  cwd: root,
  encoding: "utf8",
  maxBuffer: 1 << 26,
});
JSON.parse(json); // fail loudly on a bad export
const template = fs.readFileSync(path.join(root, "artifacts", "ideas.template.html"), "utf8");
// Inside <script>, "</" would end the tag early.
const page = template.replace("/*DATA*/", () => json.replace(/<\//g, "<\\/"));
const out = path.join(root, "data", "reports", "ideas.html");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, page);
console.log(`Wrote ${out} (${Math.round(page.length / 1024)} KB)`);

if (url) {
  if (!/^https:\/\/claude\.ai\/(code\/)?artifact\/[\w-]+$/.test(url)) throw new Error("--url must be a claude.ai artifact link");
  void openDb(`file:${path.join(root, "data", "studio.db")}`).then((db) => setSetting(db, "ideas_artifact_url", url)).then(() => console.log("Linked the Analyze page to", url));
}
