/**
 * Runs creator studies for the Research page, one step at a time, from the publishing worker. Each step is one of
 * the study tool's own scripts (../study/src), run on this Mac, slowly and resumably, exactly as the tool runs them:
 *   Instagram: log in (own window) → check → download → numbers → process → report
 *   Facebook:  facebook (download) → process → report
 * When Instagram or Facebook asks for a break (exit 75) the job waits 30 minutes and carries on. When the browser
 * isn't logged in (exit 77) it waits for the owner to log in and press Resume. Steps run detached, so a worker
 * restart doesn't kill them; the exit code is read from a file when the step ends.
 */
import { execFile, execFileSync, spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { DB } from "./db";
import { packDir, studyDir, validHandle } from "./research";

const run = promisify(execFile);

export type JobStatus = "queued" | "running" | "waiting" | "needs_login" | "done" | "failed" | "stopped";

export interface ResearchJob {
  id: number;
  site: "instagram" | "facebook";
  target: string;
  handle: string | null;
  status: JobStatus;
  step: number;
  pid: number | null;
  waits: number;
  next_at: string | null;
  message: string | null;
  /** Only the newest N posts (a quick test); null for everything. */
  limit_posts: number | null;
  created_at: string;
  updated_at: string;
}

interface Step {
  label: string;
  args: (job: ResearchJob, handleFile: string) => string[];
  /** A failed optional step is noted and the study carries on with what it has. */
  optional?: boolean;
}

/** The login the study's own Instagram window saves (study/src/instagram-login.mjs). */
export const igCookies = () => path.join(process.env.STUDY_HOME ? path.resolve(process.env.STUDY_HOME) : path.join(os.homedir(), ".align-study"), "instagram-cookies.txt");
const limit = (j: ResearchJob) => (j.limit_posts ? ["--limit", String(j.limit_posts)] : []);
export const STEPS: Record<ResearchJob["site"], Step[]> = {
  instagram: [
    { label: "Logging into Instagram (a window opens the first time)", args: () => ["src/instagram-login.mjs"] },
    { label: "Checking the page can be read", args: (j) => ["src/download.mjs", j.handle!, "--check", "--cookies", igCookies()] },
    { label: "Downloading every post", args: (j) => ["src/download.mjs", j.handle!, "--cookies", igCookies(), ...limit(j)], optional: true },
    { label: "Reading views and comments", args: (j) => ["src/numbers.mjs", j.handle!, "--cookies", igCookies()], optional: true },
    { label: "Transcribing, reading on-screen text, making stills", args: (j) => ["src/process.mjs", j.handle!] },
    { label: "Packing it up", args: (j) => ["src/report.mjs", j.handle!, "--tz", "America/Chicago"] },
  ],
  facebook: [
    { label: "Downloading the page's reels and videos", args: (j, hf) => ["src/facebook.mjs", j.target, "--handle-file", hf, ...limit(j)] },
    { label: "Transcribing, reading on-screen text, making stills", args: (j) => ["src/process.mjs", j.handle!] },
    { label: "Packing it up", args: (j) => ["src/report.mjs", j.handle!, "--tz", "America/Chicago"] },
  ],
};

export const BREAK_MS = 30 * 60_000;
export const MAX_WAITS = 24;

/** Where study logs and the private repo's clone live (data/research, git-ignored). */
export const researchDir = () => path.resolve(process.env.RESEARCH_DIR || path.join(process.cwd(), "data", "research"));
const jobsDir = () => path.join(researchDir(), "jobs");
export const logFile = (id: number) => path.join(jobsDir(), `${id}.log`);
const exitFile = (id: number) => path.join(jobsDir(), `${id}.exit`);
const handleFile = (id: number) => path.join(jobsDir(), `${id}.handle`);

/** "@Tyler", "instagram.com/tyler?x" → "tyler"; a Facebook link stays a link. */
export function parseTarget(input: string): { site: ResearchJob["site"]; target: string; handle: string | null } | null {
  const raw = input.trim();
  if (/facebook\.com|fb\.com|fb\.watch|fb\.me/i.test(raw)) {
    try {
      const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
      return /(^|\.)(facebook\.com|fb\.com|fb\.watch|fb\.me)$/i.test(u.hostname) ? { site: "facebook", target: u.toString(), handle: null } : null;
    } catch {
      return null;
    }
  }
  const fromUrl = raw.match(/instagram\.com\/([A-Za-z0-9._]+)/)?.[1];
  const h = (fromUrl ?? raw).replace(/^@/, "").replace(/[/?#].*$/, "").toLowerCase();
  if (!validHandle(h) || h.startsWith("fb-") || ["p", "reel", "reels", "stories", "explore"].includes(h)) return null;
  return { site: "instagram", target: h, handle: h };
}

const now = () => new Date().toISOString();

export async function listJobs(db: DB, limit = 30): Promise<ResearchJob[]> {
  return (await db.execute({ sql: "SELECT * FROM research_jobs ORDER BY id DESC LIMIT ?", args: [limit] })).rows as unknown as ResearchJob[];
}

/** Updates a job; with `from`, only while it still has that status, so Stop and the worker can't overwrite each other. */
async function update(db: DB, id: number, fields: Partial<ResearchJob>, from?: JobStatus): Promise<boolean> {
  const entries = Object.entries({ ...fields, updated_at: now() });
  const res = await db.execute({
    sql: `UPDATE research_jobs SET ${entries.map(([k]) => `${k} = ?`).join(", ")} WHERE id = ?${from ? " AND status = ?" : ""}`,
    args: [...entries.map(([, v]) => (v ?? null) as string | number | null), id, ...(from ? [from] : [])],
  });
  return res.rowsAffected > 0;
}

/** Queues a study unless the same page already has one in progress. */
export async function startStudy(db: DB, input: string, opts: { limit?: number | null } = {}): Promise<{ id: number } | { error: string }> {
  const t = parseTarget(input);
  if (!t) return { error: "Enter an Instagram handle (like @tylerinthemaking) or a Facebook page link." };
  const open = (await db.execute({ sql: "SELECT id FROM research_jobs WHERE target = ? AND status IN ('queued','running','waiting','needs_login')", args: [t.target] })).rows[0];
  if (open) return { error: "That page already has a study in progress." };
  const at = now();
  const res = await db.execute({
    sql: "INSERT INTO research_jobs (site, target, handle, status, step, waits, limit_posts, created_at, updated_at) VALUES (?, ?, ?, 'queued', 0, 0, ?, ?, ?)",
    args: [t.site, t.target, t.handle, opts.limit && opts.limit > 0 ? Math.floor(opts.limit) : null, at, at],
  });
  return { id: Number(res.lastInsertRowid) };
}

/** True only while that pid is still this job's own shell (its command names the job's exit file), never a reused pid. */
function alive(job: Pick<ResearchJob, "id" | "pid">) {
  if (!job.pid) return false;
  try {
    const cmd = execFileSync("ps", ["-o", "command=", "-p", String(job.pid)], { encoding: "utf8" });
    return cmd.includes(exitFile(job.id));
  } catch {
    return false;
  }
}

export async function stopStudy(db: DB, id: number) {
  const job = (await db.execute({ sql: "SELECT * FROM research_jobs WHERE id = ?", args: [id] })).rows[0] as unknown as ResearchJob | undefined;
  if (!job || ["done", "failed", "stopped"].includes(job.status)) return;
  if (job.status === "running" && alive(job)) {
    try {
      process.kill(-job.pid!, "SIGTERM");
    } catch {
      // already gone
    }
  }
  fs.rmSync(exitFile(id), { force: true });
  await update(db, id, { status: "stopped", pid: null, message: "Stopped. Resume picks up where it left off." }, job.status);
}

/** Puts a stopped, failed or waiting-for-login study back in line, from the step it was on. */
export async function resumeStudy(db: DB, id: number) {
  await db.execute({
    sql: "UPDATE research_jobs SET status = 'queued', waits = 0, next_at = NULL, message = NULL, updated_at = ? WHERE id = ? AND status IN ('stopped','failed','needs_login','waiting')",
    args: [now(), id],
  });
}

const q = (a: string) => `'${a.replace(/'/g, "'\\''")}'`;

function startStep(job: ResearchJob): number {
  if (!fs.existsSync(path.join(studyDir(), "src"))) throw new Error(`The study tool isn't at ${studyDir()}`);
  fs.mkdirSync(jobsDir(), { recursive: true });
  fs.rmSync(exitFile(job.id), { force: true });
  const step = STEPS[job.site][job.step];
  const args = step.args(job, handleFile(job.id));
  const log = fs.openSync(logFile(job.id), "a");
  fs.writeSync(log, `\n=== ${new Date().toLocaleString()} · step ${job.step + 1}/${STEPS[job.site].length}: ${step.label}\n`);
  // The shell records node's exit code so it can be read even if this process restarts meanwhile.
  // Written to a temp file and renamed, so the worker never reads a half-written code.
  const exit = exitFile(job.id);
  const quoted = ["node", ...args].map(q).join(" ");
  const child = spawn("/bin/sh", ["-c", `${quoted}; echo $? > ${q(exit + ".tmp")} && mv ${q(exit + ".tmp")} ${q(exit)}`], {
    cwd: studyDir(),
    detached: true,
    stdio: ["ignore", log, log],
    env: { ...process.env, PATH: `${process.env.PATH ?? ""}:/opt/homebrew/bin:/usr/local/bin` },
  });
  // Without a listener a spawn error (say, a missing folder) would crash the whole worker.
  child.on("error", (err) => fs.appendFileSync(logFile(job.id), `Couldn't start the step: ${err.message}\n`));
  child.unref();
  fs.closeSync(log);
  return child.pid ?? 0;
}

/** One pass of the runner: finish a step that ended, wake waiting jobs, start the next step. One step runs at a time. */
export async function researchTick(db: DB, at = new Date()): Promise<string | null> {
  const jobs = (await db.execute("SELECT * FROM research_jobs WHERE status IN ('running','waiting','queued') ORDER BY id")).rows as unknown as ResearchJob[];
  let note: string | null = null;
  for (const job of jobs.filter((j) => j.status === "running")) {
    const steps = STEPS[job.site];
    if (!fs.existsSync(exitFile(job.id))) {
      // Look again after the alive check: the step may have finished in between, and must not run twice.
      if (!alive(job) && !fs.existsSync(exitFile(job.id))) await update(db, job.id, { status: "queued", pid: null, message: "Picked up again after an interruption." }, "running");
      continue;
    }
    const code = Number(fs.readFileSync(exitFile(job.id), "utf8").trim());
    fs.rmSync(exitFile(job.id), { force: true });
    const step = steps[job.step];
    if (code === 75) {
      const waits = job.waits + 1;
      if (waits > MAX_WAITS) await update(db, job.id, { status: "failed", pid: null, message: "Still being asked to slow down after 12 hours. Try again later." }, "running");
      else await update(db, job.id, { status: "waiting", pid: null, waits, next_at: new Date(at.getTime() + BREAK_MS).toISOString(), message: "Asked for a break. Carrying on in 30 minutes; progress is kept." }, "running");
      note = `study ${job.id} waiting`;
      continue;
    }
    if (code === 77) {
      // Instagram: back to the login step, so Resume opens the study's own window again.
      await update(db, job.id, { status: "needs_login", pid: null, ...(job.site === "instagram" ? { step: 0 } : {}), message: `Log into ${job.site === "facebook" ? "Facebook" : "Instagram"} in the study's own Chrome window, then press Resume.` }, "running");
      continue;
    }
    if (code !== 0 && !step.optional) {
      await update(db, job.id, { status: "failed", pid: null, message: `"${step.label}" stopped (exit ${code}). The log has the details; Resume tries again.` }, "running");
      continue;
    }
    let handle = job.handle;
    if (job.site === "facebook" && job.step === 0) {
      try {
        handle = fs.readFileSync(handleFile(job.id), "utf8").trim() || null;
      } catch {
        handle = null;
      }
      if (!handle || !validHandle(handle)) {
        await update(db, job.id, { status: "failed", pid: null, message: "Couldn't work out the page's name from the download." }, "running");
        continue;
      }
    }
    const next = job.step + 1;
    const message = code !== 0 ? `"${step.label}" stopped early (exit ${code}); carrying on with what's here.` : null;
    if (next >= steps.length) await update(db, job.id, { status: "done", step: next, pid: null, handle, waits: 0, message: message ?? "Done. The pack is ready." }, "running");
    else await update(db, job.id, { status: "queued", step: next, pid: null, handle, waits: 0, message }, "running");
  }
  for (const job of jobs.filter((j) => j.status === "waiting" && j.next_at && Date.parse(j.next_at) <= at.getTime())) {
    await update(db, job.id, { status: "queued", next_at: null }, "waiting");
  }
  const busy = (await db.execute("SELECT COUNT(*) AS n FROM research_jobs WHERE status = 'running'")).rows[0];
  if (Number(busy?.n ?? 0) === 0) {
    const nextJob = (await db.execute("SELECT * FROM research_jobs WHERE status = 'queued' ORDER BY id LIMIT 1")).rows[0] as unknown as ResearchJob | undefined;
    if (nextJob) {
      let pid: number;
      try {
        pid = startStep(nextJob);
      } catch (err) {
        await update(db, nextJob.id, { status: "failed", message: err instanceof Error ? err.message : String(err) }, "queued");
        return null;
      }
      await update(db, nextJob.id, { status: "running", pid }, "queued");
      note = `study ${nextJob.id} step ${nextJob.step + 1}`;
    }
  }
  return note;
}

/** The last lines of a study's log, for the Research page. */
export function logTail(id: number, lines = 40): string {
  try {
    const text = fs.readFileSync(logFile(id), "utf8");
    return text.split("\n").slice(-lines).join("\n");
  } catch {
    return "";
  }
}

/**
 * Copies a finished pack into the private align-study repo and pushes it. Refuses unless GitHub says the repo is
 * private, the same check the study tool's own "Send Study to Claude" makes.
 */
export async function sendToPrivateRepo(handle: string): Promise<{ ok: true; message: string } | { error: string }> {
  if (!validHandle(handle)) return { error: "Unknown page." };
  const src = path.join(packDir(), handle);
  if (!fs.existsSync(path.join(src, "posts.json"))) return { error: "There's no finished pack for that page on this Mac yet." };
  const repo = path.join(researchDir(), "align-study");
  const env = { ...process.env, PATH: `${process.env.PATH ?? ""}:/opt/homebrew/bin:/usr/local/bin` };
  try {
    const { stdout } = await run("gh", ["repo", "view", "hakeemawbrey/align-study", "--json", "visibility", "-q", ".visibility"], { env });
    if (stdout.trim() !== "PRIVATE") return { error: "align-study isn't private, so nothing was sent." };
    if (!fs.existsSync(path.join(repo, ".git"))) await run("gh", ["repo", "clone", "hakeemawbrey/align-study", repo], { env });
    await run("git", ["-C", repo, "pull", "--rebase", "-q"], { env });
    fs.rmSync(path.join(repo, handle), { recursive: true, force: true });
    fs.cpSync(src, path.join(repo, handle), { recursive: true });
    await run("git", ["-C", repo, "add", handle], { env });
    const { stdout: changed } = await run("git", ["-C", repo, "status", "--porcelain", "--", handle], { env });
    if (!changed.trim()) return { ok: true, message: "Already up to date in your private repo." };
    await run("git", ["-C", repo, "commit", "-q", "-m", `Study @${handle} (${os.hostname()})`], { env });
    await run("git", ["-C", repo, "push", "-q"], { env });
    return { ok: true, message: `Sent @${handle} to your private align-study repo.` };
  } catch (err) {
    return { error: `Couldn't send it: ${err instanceof Error ? err.message.split("\n")[0] : String(err)}` };
  }
}
