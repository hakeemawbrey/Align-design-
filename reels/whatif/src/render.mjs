// Render the explainer: seek every frame of index.html in headless Chromium
// (WebGL on), save PNG frames, then encode with ffmpeg.
//
//   node src/render.mjs --stills            contact sheet of every beat → build/contact.png
//   node src/render.mjs --frames [--jobs 3] all frames → build/frames/
//   node src/render.mjs --at 12.3 [...]     single frames → build/at-<t>.png
//
// The audio and the final encode are done by src/mix.py and src/encode.sh.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node-tools/node_modules/playwright'); }

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const args = process.argv.slice(2);
// --story <id> renders stories/<id> through story.html; without it, the original index.html
const STORY = args.includes('--story') ? args[args.indexOf('--story') + 1] : null;
const BUILD = STORY ? path.join(ROOT, 'build', STORY) : path.join(ROOT, 'build');
const flag = n => args.includes(n);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };

// timeline.json → timeline.js so the page can load it with a script tag
const tl = JSON.parse(fs.readFileSync(path.join(BUILD, 'timeline.json'), 'utf8'));
fs.writeFileSync(path.join(BUILD, 'timeline.js'), 'window.TL = ' + JSON.stringify(tl) + ';\n');

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.json': 'application/json', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const URL_ = `http://127.0.0.1:${server.address().port}/` + (STORY ? `story.html?v=${STORY}` : 'index.html');

const browser = await playwright.chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--enable-webgl', '--disable-accelerated-2d-canvas', '--disable-gpu-rasterization'],
});
async function openPage() {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => { console.error('page error:', e.message); process.exitCode = 1; });
  page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
  await page.goto(URL_);
  await page.evaluate(() => window.ready);
  return page;
}
async function shot(page, t, file, blur = true) {
  await page.evaluate(([t, b]) => window.seek(t, b), [t, blur]);
  await page.screenshot(file.endsWith('.jpg') ? { path: file, type: 'jpeg', quality: 98 } : { path: file, type: 'png' });
}

try {
  const page = await openPage();
  const TOTAL = await page.evaluate(() => window.TOTAL);
  if (flag('--stills')) {
    const ev = Object.entries(tl.events).sort((a, b) => a[1] - b[1]);
    const dir = path.join(BUILD, 'stills'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    const beats = [['open', .4], ...ev.map(([k, v]) => [k, v + (k === 'title' ? 1.2 : .5)])];
    if (!ev.find(e => e[0] === 'title')) beats.push(['end', TOTAL - .1]);
    // the replayed flash and the title end
    beats.push(['rewind+', tl.events.rewind + .4], ['end', TOTAL - .2]);
    beats.sort((a, b) => a[1] - b[1]);
    let i = 0;
    for (const [k, t] of beats) {
      const f = path.join(dir, `${String(i++).padStart(2, '0')}-${k}.png`);
      await shot(page, t, f, false);
      // label each tile with its beat and time
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', f, '-vf',
        `scale=640:360,drawbox=x=0:y=0:w=640:h=34:color=black@0.6:t=fill,drawtext=text='${k}  ${t.toFixed(2)}s':x=10:y=8:fontsize=20:fontcolor=white`, f + '.jpg']);
    }
    const tiles = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
    const cols = 4, rows = Math.ceil(tiles.length / cols);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', '1', '-pattern_type', 'glob', '-i', path.join(dir, '*.jpg'),
      '-vf', `tile=${cols}x${rows}:padding=6:color=0x0b1020`, '-frames:v', '1', path.join(BUILD, 'contact.png')]);
    console.log(`contact sheet: ${tiles.length} beats → build/contact.png`);
  } else if (flag('--at')) {
    for (const a of args.filter(a => /^[\d.]+$/.test(a) && a !== STORY)) { await shot(page, +a, path.join(BUILD, `at-${a}.png`)); console.log('build/at-' + a + '.png'); }
  } else if (flag('--frames')) {
    const FPS = 30, N = Math.round(TOTAL * FPS);
    const dir = path.join(BUILD, 'frames'); fs.mkdirSync(dir, { recursive: true });
    const jobs = +opt('--jobs', 3);
    const pages = [page]; for (let j = 1; j < jobs; j++) pages.push(await openPage());
    let next = 0, done = 0; const t0 = Date.now();
    await Promise.all(pages.map(async pg => {
      for (;;) {
        const i = next++; if (i >= N) return;
        const f = path.join(dir, `f${String(i).padStart(5, '0')}.jpg`);
        if (!flag('--force') && fs.existsSync(f)) { done++; continue; }
        await shot(pg, i / FPS, f, true);
        if (++done % 60 === 0) { const r = (Date.now() - t0) / done; console.log(`${done}/${N} frames, ${(r / 1000).toFixed(2)} s/frame, ~${((N - done) * r / 60000).toFixed(1)} min left`); }
      }
    }));
    console.log(`${N} frames → build/frames/ (${TOTAL.toFixed(2)} s)`);
  }
} finally {
  await browser.close(); server.close();
}
