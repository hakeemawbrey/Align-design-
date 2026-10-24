// Build a review page for the rendered reels: reels/out/gallery.html, which
// plays videos/<id>.mp4 (the 720p .web.mp4 copies) next to it.
//
//   node reels/src/gallery.mjs

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const COLORS = {
  aries: '#f0603a', taurus: '#e9b24a', gemini: '#f2cf4a', cancer: '#3fb6f0',
  leo: '#f39a3a', virgo: '#ef5c94', libra: '#e163d6', scorpio: '#e23d66',
  sagittarius: '#a35cf0', capricorn: '#2fc79a', aquarius: '#38c4ec', pisces: '#7c74f0',
}
const GLYPH = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
}
const DATES = {
  aries: 'mar 21 – apr 19', taurus: 'apr 20 – may 20', gemini: 'may 21 – jun 20', cancer: 'jun 21 – jul 22',
  leo: 'jul 23 – aug 22', virgo: 'aug 23 – sep 22', libra: 'sep 23 – oct 22', scorpio: 'oct 23 – nov 21',
  sagittarius: 'nov 22 – dec 21', capricorn: 'dec 22 – jan 19', aquarius: 'jan 20 – feb 18', pisces: 'feb 19 – mar 20',
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const scripts = readdirSync(path.join(ROOT, 'scripts')).filter((f) => f.endsWith('.json')).sort()
  .map((f) => JSON.parse(readFileSync(path.join(ROOT, 'scripts', f), 'utf8')))

const cards = scripts.map((s) => {
  const post = `${s.caption}\n\n${s.hashtags.map((h) => '#' + h).join(' ')}`
  const secs = Math.round(s.scenes.length * 3.4 + 2.6)
  return `
  <article class="reel" style="--sign:${COLORS[s.sign]}" id="${s.sign}">
    <div class="screen">
      <video src="videos/${s.id}.mp4" poster="posters/${s.id}.jpg" controls playsinline preload="none"></video>
    </div>
    <div class="meta">
      <p class="eyebrow"><span class="glyph" aria-hidden="true">${GLYPH[s.sign]}</span>${s.sign} · ${DATES[s.sign]} · 0:${String(secs).padStart(2, '0')}</p>
      <h2>${esc(s.title ?? s.sign)}</h2>
      <p class="caption">${esc(s.caption)}</p>
      <p class="tags">${s.hashtags.map((h) => '#' + esc(h)).join(' ')}</p>
      <div class="actions">
        <button type="button" class="copy" data-text="${esc(post)}">Copy caption</button>
      </div>
      <details>
        <summary>Script · ${s.scenes.length} lines</summary>
        <ol>${s.scenes.map((sc) => `<li>${esc(sc.text)}</li>`).join('')}</ol>
      </details>
    </div>
  </article>`
}).join('')

const html = `<title>Align Zodiac Reels</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400;1,500&family=Space+Mono&display=swap">
<style>
/* Layout: a night-sky contact sheet; each reel is a phone-shaped screen with its post copy beside it. */
:root {
  color-scheme: dark;
  --void: #0b0716;
  --raised: #171028;
  --line: rgba(179,166,196,0.2);
  --bone: #efe6d6;
  --bone-2: #b9aec6;
  --line-yellow: #f6d550;
  --serif: 'EB Garamond', 'Cormorant Garamond', Georgia, serif;
  --mono: 'Space Mono', ui-monospace, Menlo, monospace;
  --sans: -apple-system, 'SF Pro Text', system-ui, sans-serif;
}
body { background: var(--void); color: var(--bone); font-family: var(--sans); }
.wrap { max-width: 1180px; margin: 0 auto; padding-block: 48px 80px;
  padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
header { display: grid; gap: 14px; margin-bottom: 40px; max-width: 64ch; }
.mark { font-family: var(--mono); font-size: 12px; letter-spacing: 0.24em; color: var(--bone-2); }
h1 { font-family: var(--serif); font-style: italic; font-weight: 400; font-size: clamp(38px, 6vw, 60px); line-height: 1.02; margin: 0; text-wrap: balance; }
h1 em { color: var(--line-yellow); font-style: italic; }
header p { margin: 0; color: var(--bone-2); font-size: 15px; line-height: 1.55; }
nav { display: flex; flex-wrap: wrap; gap: 6px; margin: 0 0 36px; }
nav a { font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--bone-2);
  text-decoration: none; border: 1px solid var(--line); border-radius: 999px; padding: 7px 12px; }
nav a:hover, nav a:focus-visible { color: var(--bone); border-color: var(--bone-2); outline: none; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 520px), 1fr)); gap: 40px 36px; }
.reel { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr); gap: 22px; align-items: start; scroll-margin-top: 24px; }
.screen { aspect-ratio: 9 / 16; max-width: 100%; border-radius: 22px; overflow: hidden; background: #000;
  box-shadow: 0 0 0 1px var(--line), 0 18px 50px -18px color-mix(in srgb, var(--sign) 55%, transparent); }
.screen video { width: 100%; height: 100%; display: block; object-fit: cover; }
.meta { display: grid; gap: 10px; min-width: 0; padding-top: 6px; }
.eyebrow { margin: 0; font-family: var(--mono); font-size: 10.5px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--sign); display: flex; gap: 8px; align-items: center; }
.glyph { font-size: 16px; letter-spacing: 0; font-family: var(--sans); }
h2 { margin: 0; font-family: var(--serif); font-style: italic; font-weight: 500; font-size: 26px; line-height: 1.1; text-wrap: balance; }
.caption { margin: 0; font-size: 14px; color: var(--bone); }
.tags { margin: 0; font-family: var(--mono); font-size: 11px; color: var(--bone-2); overflow-wrap: anywhere; }
.actions { display: flex; gap: 8px; }
button.copy { font: inherit; font-size: 13px; color: var(--bone); background: transparent; border: 1px solid var(--line);
  border-radius: 999px; padding: 7px 14px; cursor: pointer; }
button.copy:hover, button.copy:focus-visible { border-color: var(--bone-2); outline: none; }
details { border-top: 1px solid var(--line); padding-top: 10px; }
summary { cursor: pointer; font-family: var(--mono); font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--bone-2); }
ol { margin: 10px 0 0; padding-left: 22px; display: grid; gap: 5px; font-family: var(--serif); font-style: italic; font-size: 16px; color: var(--line-yellow); }
ol li::marker { font-family: var(--mono); font-style: normal; font-size: 10px; color: var(--bone-2); }
footer { margin-top: 56px; color: var(--bone-2); font-size: 13px; line-height: 1.6; max-width: 64ch; }
@media (max-width: 560px) { .reel { grid-template-columns: 1fr; } .screen { max-width: 300px; } }
</style>
<div class="wrap">
  <header>
    <span class="mark">align ✦ reels</span>
    <h1>Twelve letters to the <em>twelve signs</em></h1>
    <p>One reel for each sign: a slow space collage with one line at a time, about 47 seconds each. The art, the words and the music are all original. These are 720p preview copies; the full 1080 × 1920 files are in <code>reels/out/</code>.</p>
  </header>
  <nav aria-label="Signs">${scripts.map((s) => `<a href="#${s.sign}">${s.sign}</a>`).join('')}</nav>
  <section class="grid">${cards}
  </section>
  <footer>To post, upload the full-size file as a reel and paste its caption. The soundtrack is original, so it's safe to keep. To use a trending sound instead, turn the reel's own volume to zero in Instagram's editor.</footer>
</div>
<script>
for (const b of document.querySelectorAll('button.copy')) {
  b.addEventListener('click', async () => {
    const label = b.textContent
    try { await navigator.clipboard.writeText(b.dataset.text); b.textContent = 'Copied' }
    catch { b.textContent = 'Select the caption above to copy' }
    setTimeout(() => (b.textContent = label), 1600)
  })
}
// Only one reel plays at a time.
const vids = [...document.querySelectorAll('video')]
for (const v of vids) v.addEventListener('play', () => vids.forEach((o) => o !== v && o.pause()))
</script>
`
writeFileSync(path.join(ROOT, 'out', 'gallery.html'), html)
console.log('wrote reels/out/gallery.html')
