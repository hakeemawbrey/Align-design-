import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { openDb } from "../src/lib/db";
import { getCreator, listCreators, sheetFile, summarise } from "../src/lib/research";
import { listJobs, parseTarget, researchTick, resumeStudy, startStudy, stopStudy } from "../src/lib/researchJobs";

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "research-test-"));
const study = path.join(tmp, "study");
process.env.STUDY_DIR = study;
process.env.RESEARCH_DIR = path.join(tmp, "research");
process.env.STUDY_HOME = path.join(tmp, "home");
afterAll(() => fs.rmSync(tmp, { recursive: true, force: true }));

/** A fake study step: exits with the code in codes/<script>, else 0. */
function fakeStudy() {
  fs.rmSync(study, { recursive: true, force: true });
  fs.mkdirSync(path.join(study, "src"), { recursive: true });
  fs.mkdirSync(path.join(study, "codes"), { recursive: true });
  for (const s of ["instagram-login", "download", "numbers", "process", "report", "facebook"]) {
    fs.writeFileSync(
      path.join(study, "src", `${s}.mjs`),
      `import fs from "node:fs";
const args = process.argv.slice(2);
fs.appendFileSync("calls.txt", "${s} " + args.join(" ") + "\\n");
const hf = args.indexOf("--handle-file"); if (hf >= 0) fs.writeFileSync(args[hf + 1], "fb-astriva\\n");
let code = 0; try { const q = fs.readFileSync("codes/${s}", "utf8").split(",").filter(Boolean); code = Number(q.shift() ?? 0); fs.writeFileSync("codes/${s}", q.join(",")); } catch {}
process.exit(code);`,
    );
  }
}
const setCode = (s: string, codes: string) => fs.writeFileSync(path.join(study, "codes", s), codes);
const calls = () => fs.readFileSync(path.join(study, "calls.txt"), "utf8").trim().split("\n");

/** Runs ticks until the running step has finished and been recorded. */
async function settle(db: Awaited<ReturnType<typeof openDb>>, at = new Date()) {
  for (let i = 0; i < 100; i++) {
    const job = (await listJobs(db))[0];
    if (job.status !== "running") return job;
    await new Promise((r) => setTimeout(r, 50));
    await researchTick(db, at);
  }
  throw new Error("step never finished");
}

describe("research targets", () => {
  it("reads handles and Facebook links, and refuses anything else", () => {
    expect(parseTarget("@TylerInTheMaking")).toEqual({ site: "instagram", target: "tylerinthemaking", handle: "tylerinthemaking" });
    expect(parseTarget("https://www.instagram.com/jettfranzen/?hl=en")?.handle).toBe("jettfranzen");
    expect(parseTarget("https://www.facebook.com/share/1KezBxmTFj/")).toMatchObject({ site: "facebook", handle: null });
    expect(parseTarget("https://evil.example/facebook.com")).toBeNull();
    expect(parseTarget("../../etc")).toBeNull();
    expect(parseTarget("instagram.com/p/abc")).toBeNull();
  });
});

describe("study runner", () => {
  beforeEach(() => fakeStudy());

  it("runs an Instagram study step by step to the end", async () => {
    const db = await openDb(":memory:");
    expect(await startStudy(db, "@tyler")).toMatchObject({ id: 1 });
    expect(await startStudy(db, "tyler")).toMatchObject({ error: expect.stringMatching(/already/) });
    await researchTick(db);
    for (let i = 0; i < 5; i++) {
      const job = await settle(db);
      if (job.status === "done") break;
      await researchTick(db);
    }
    const job = (await listJobs(db))[0];
    expect(job.status).toBe("done");
    expect(calls().map((c) => c.split(" ")[0])).toEqual(["instagram-login", "download", "download", "numbers", "process", "report"]);
    expect(calls()[1]).toContain("--check");
    expect(calls()[1]).toContain(`--cookies ${path.join(tmp, "home", "instagram-cookies.txt")}`);
    expect(calls().join("\n")).not.toContain("--cookies-from-browser");
  });

  it("takes a 30-minute break when asked, waits for a login, and carries on after an optional step fails", { timeout: 60_000 }, async () => {
    const db = await openDb(":memory:");
    await startStudy(db, "tyler");
    // check: not logged in, then fine · download: slow down, then fine · numbers fails (optional) · process fails (required)
    setCode("download", "77,0,75,0");
    setCode("numbers", "1");
    setCode("process", "1");
    const seen: string[] = [];
    let clock = Date.now();
    for (let i = 0; i < 400; i++) {
      const job = (await listJobs(db))[0];
      if (seen.at(-1) !== job.status) seen.push(job.status);
      if (job.status === "failed") break;
      if (job.status === "needs_login") await resumeStudy(db, job.id);
      if (job.status === "waiting") clock += 31 * 60_000;
      await researchTick(db, new Date(clock));
      await new Promise((r) => setTimeout(r, 20));
    }
    expect(seen).toContain("needs_login");
    expect(seen).toContain("waiting");
    const job = (await listJobs(db))[0];
    expect(job.status).toBe("failed");
    expect(job.message).toMatch(/Transcribing/);
    // The login that lapsed sends it back to the login window before checking again.
    expect(calls().map((c) => c.split(" ")[0])).toEqual(["instagram-login", "download", "instagram-login", "download", "download", "download", "numbers", "process"]);
    await stopStudy(db, job.id);
    expect((await listJobs(db))[0].status).toBe("failed");
  });

  it("learns a Facebook page's name from its download", async () => {
    const db = await openDb(":memory:");
    await startStudy(db, "https://www.facebook.com/share/1KezBxmTFj/");
    await researchTick(db);
    const job = await settle(db);
    expect(job.handle).toBe("fb-astriva");
    expect(calls()[0]).toMatch(/^facebook https:\/\/www\.facebook\.com\/share\/1KezBxmTFj\/ --handle-file /);
  });
});

describe("packs", () => {
  it("lists packs, prefers the newer copy, and keeps sheet paths inside the pack", () => {
    const write = (dir: string, madeAt: string, posts: object[]) => {
      fs.mkdirSync(path.join(dir, "sheets"), { recursive: true });
      fs.writeFileSync(path.join(dir, "posts.json"), JSON.stringify({ profile: { name: "Tyler", followers: 1000 }, madeAt, posts }));
      fs.writeFileSync(path.join(dir, "sheets", "a.jpg"), "x");
    };
    const post = (shortcode: string, lift: number, formats: string[]) => ({ shortcode, type: "reel", views: 100, likes: 5, lift, formats, topics: ["dating"] });
    write(path.join(study, "pack", "tyler"), "2026-11-20T00:00:00Z", [post("a", 3, ["list"]), post("b", 1, ["list"]), post("c", 0.5, ["story"])]);
    write(path.join(tmp, "research", "align-study", "tyler"), "2026-11-01T00:00:00Z", []);
    const c = listCreators().find((x) => x.handle === "tyler")!;
    expect(c.source).toBe("study");
    expect(getCreator("tyler")!.posts).toHaveLength(3);
    expect(getCreator("../tyler")).toBeNull();
    expect(sheetFile("tyler", "sheets/a.jpg")).toMatch(/a\.jpg$/);
    expect(sheetFile("tyler", "../posts.json")).toBeNull();
    const s = summarise(getCreator("tyler")!.posts);
    expect(s.formats[0]).toMatchObject({ value: "list", count: 2, lift: 2, hits: 1 });
    expect(s.hits).toBe(1);
  });
});
