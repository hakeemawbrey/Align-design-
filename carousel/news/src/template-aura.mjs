// One news slide as a standalone 1080×1350 HTML page in Align's aura look:
// every slide is soft coloured light (like an aura photograph) on deep indigo,
// one glowing subject, a serif italic headline, and almost nothing else. No
// borders, rules, frames, pills or sparkles.
//
// Headline markup: wrap words in *asterisks* to light them in the slide's
// accent (the slide's sign colour, else the carousel's, else gold). Use
// [[double brackets]] for a soft highlight bar instead.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { hashString, imageDataUri } from '../../src/backgrounds.mjs'
import { SIGN_COLORS } from '../../src/schema.mjs'
import { auraColors, colorOf, dust, subjectSvg } from './art.mjs'

export const W = 1080
export const H = 1350
const require = createRequire(import.meta.url)

function font(pkg, file) {
  const dir = path.dirname(require.resolve(`${pkg}/package.json`))
  return `data:font/woff2;base64,${readFileSync(path.join(dir, 'files', file)).toString('base64')}`
}
let FONTS
function fonts() {
  const face = (fam, style, weight, uri) => `@font-face{font-family:'${fam}';font-style:${style};font-weight:${weight};font-display:block;src:url(${uri}) format('woff2');}`
  FONTS ??= [
    face('EB Garamond', 'italic', 500, font('@fontsource/eb-garamond', 'eb-garamond-latin-500-italic.woff2')),
    face('EB Garamond', 'italic', 400, font('@fontsource/eb-garamond', 'eb-garamond-latin-400-italic.woff2')),
    face('EB Garamond', 'normal', 500, font('@fontsource/eb-garamond', 'eb-garamond-latin-500-normal.woff2')),
    face('Inter', 'normal', 400, font('@fontsource/inter', 'inter-latin-400-normal.woff2')),
    face('Inter', 'normal', 500, font('@fontsource/inter', 'inter-latin-500-normal.woff2')),
    face('Inter', 'italic', 600, font('@fontsource/inter', 'inter-latin-600-italic.woff2')),
    face('Space Mono', 'normal', 400, font('@fontsource/space-mono', 'space-mono-latin-400-normal.woff2')),
  ].join('\n')
  return FONTS
}

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// *word* → accent, [[words]] → highlight bar, \n → line break.
const rich = (s) => esc(s)
  .replace(/\[\[(.+?)\]\]/g, '<mark>$1</mark>')
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\*(.+?)\*/g, '<em>$1</em>')
  .replace(/\n/g, '<br>')

const SPARK = (c = '#f2c75c', s = 18) => `<svg viewBox="0 0 20 20" width="${s}" height="${s}" aria-hidden="true"><path fill="${c}" d="M10 0c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10C5.4 9.4 9.4 5.4 10 0z"/></svg>`

const VERDICT = { true: ['true', '#7fd8b0'], misleading: ['half true', '#f2c75c'], false: ['not true', '#e8628a'], context: ['needs context', '#9a7be0'] }

const accentOf = (slide, c) => colorOf(slide.accent ?? slide.sign ?? c.accent ?? c.signs?.[0] ?? 'gold', '#f2c75c')

// ---- pieces ---------------------------------------------------------------

const VERDICT_WORD = { true: 'true', misleading: 'half true', false: 'not true', context: 'needs context' }
const VERDICT_COL = { true: '#7fd8b0', misleading: '#f2c75c', false: '#e8628a', context: '#b9a2ff' }

// Aura light: three big blurred blobs, placed by seed, glowing around `at`
// (where the subject sits, as % of the frame).
function auraField(cols, seed, at = [50, 36], strength = 1) {
  const r = (() => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 } })()
  const [x, y] = at
  const blob = (c, cx, cy, w, h, o) => `<div class="blob" style="left:${cx}%;top:${cy}%;width:${w}px;height:${h}px;background:radial-gradient(closest-side, ${c} 0%, ${c}cc 35%, ${c}00 100%);opacity:${(o * strength).toFixed(2)}"></div>`
  return `<div class="aura">
    ${blob(cols[2], x + (r() - .5) * 30, y + 40, 1300, 1100, .9)}
    ${blob(cols[1], x + (r() < .5 ? -22 : 22), y + 10 + r() * 14, 900, 900, .55)}
    ${blob(cols[0], x, y, 820, 820, .85)}
    ${blob('#fff4e6', x, y, 300, 300, .22)}
  </div>`
}

// The subject: aura figure photo, or a drawn body with a bloom behind it.
function subject(a, size, seed, cls = '', prefix = 's') {
  if (!a || a.kind === 'stars') return ''
  if (a.kind === 'figure' || a.kind === 'aura') {
    return `<div class="figure ${cls}" style="width:${size}px;height:${size * 1.15}px"><img src="${imageDataUri(`aura/${a.sign}.jpg`)}" alt=""></div>`
  }
  const svg = subjectSvg(a, size, seed, prefix)
  const wide = (a.kind === 'planet' && a.body === 'saturn') || a.kind === 'pair' || a.kind === 'wheel' || a.kind === 'eclipse'
  return `<div class="subj ${wide ? 'wide ' : ''}${cls}" style="width:${size}px;height:${size}px"><div class="bloom">${svg.replace(/id="/g, 'id="b').replace(/url\(#/g, 'url(#b')}</div><div class="body">${svg}</div><div class="haze"></div></div>`
}

const kick = (k) => (k ? `<div class="kicker">${esc(k)}</div>` : '')
const fitH = (cls, html, max, big, small) => `<h1 class="fit head ${cls}" data-max="${max}" data-big="${big}" data-small="${small}">${rich(html)}</h1>`
const fitP = (cls, html, max, big, small) => (html ? `<p class="fit ${cls}" data-max="${max}" data-big="${big}" data-small="${small}">${rich(html)}</p>` : '')

// ---- layouts ----------------------------------------------------------------
// Each returns { at: [x%, y%] where the light gathers, html }.

const LAYOUTS = {
  cover: (s, c, x) => ({ at: [50, 33], html: `
    <div class="stage" style="top:120px;height:760px">${subject(x.art, 600, x.seed)}</div>
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 330, 132, 64)}${fitP('dek center', s.dek, 90, 34, 26)}</div>` }),
  story: (s, c, x) => ({ at: [50, 28], html: `
    <div class="stage" style="top:110px;height:620px">${subject(x.art, 500, x.seed)}${s.inset ? subject(s.inset, 220, x.seed + 3, 'inset', 'i') : ''}</div>
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 260, 100, 56)}${fitP('body center', s.body, 190, 36, 28)}</div>` }),
  rank: (s, c, x) => ({ at: [50, 30], html: `
    <div class="stage" style="top:90px;height:560px">${subject(x.art ?? { kind: 'aura', sign: s.sign }, 470, x.seed)}</div>
    <div class="rank-num">${esc(s.rank)}</div>
    <div class="txt bottom">
      <div class="sign" style="color:${x.signCol}">${esc(s.title ?? s.sign)}</div>
      ${s.dates ? `<div class="kicker">${esc(s.dates)}</div>` : ''}
      ${fitP('hook center', s.headline, 140, 46, 32)}${fitP('body center', s.body, 230, 34, 26)}</div>` }),
  callout: (s, c, x) => ({ at: [50, 40], html: `
    <div class="stage" style="top:60px;height:900px;opacity:.9">${subject(x.art, 720, x.seed)}</div>
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 400, 136, 64)}${fitP('dek center', s.body, 110, 34, 26)}</div>` }),
  hero: (s, c, x) => ({ at: [50, 34], html: `
    <div class="stage" style="top:90px;height:820px">${subject(x.art, 680, x.seed)}</div>
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 330, 128, 64)}${fitP('dek center', s.dek, 90, 34, 26)}</div>` }),
  breaking: (s, c, x) => {
    const w = s.word ?? 'breaking'
    return { at: [50, 34], html: `
    <div class="giant" style="font-size:${Math.min(300, Math.round(1900 / w.length))}px">${esc(w)}</div>
    <div class="stage" style="top:110px;height:800px">${subject(x.art, 620, x.seed)}</div>
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 320, 124, 64)}${fitP('dek center', s.dek, 90, 34, 26)}</div>` }
  },
  split: (s, c, x) => ({ at: [50, 34], two: true, html: `
    <div class="stage" style="top:150px;height:640px;left:-250px">${subject(x.art, 470, x.seed)}</div>
    <div class="stage" style="top:150px;height:640px;left:250px">${subject(x.art2, 470, x.seed + 9, '', 't')}</div>
    ${s.labels ? `<div class="labels"><span>${esc(s.labels[0] ?? '')}</span><span>${esc(s.labels[1] ?? '')}</span></div>` : ''}
    <div class="txt bottom">${kick(s.kicker)}${fitH('center', s.headline, 300, 120, 60)}</div>` }),
  note: (s, c, x) => ({ at: [50, 22], html: `
    <div class="txt top">${kick(s.kicker ?? 'going around')}${fitH('center quote', s.headline, 330, 92, 52)}</div>
    <div class="note">
      <div class="note-top"><span class="note-title">${SPARK('#f2c75c', 22)} sky note</span><span class="verdict" style="color:${VERDICT_COL[s.verdict]}">${VERDICT_WORD[s.verdict] ?? ''}</span></div>
      ${fitP('body bone', s.body, 360, 38, 28)}
    </div>` }),
  list: (s, c, x) => ({ at: [50, 18], html: `
    <div class="txt top">${kick(s.kicker)}${s.headline ? fitH('center', s.headline, 220, 92, 52) : ''}</div>
    <div class="rows fit-rows">${(s.rows ?? []).map((r) => {
      const col = colorOf(r.color ?? r.sign ?? null, x.accent)
      return `<div class="row"><div class="row-l" style="color:${col}">${esc(r.label)}</div><div class="row-t">${rich(r.text)}</div></div>`
    }).join('')}</div>` }),
  table: (s, c, x) => ({ at: [50, 18], html: `
    <div class="txt top">${kick(s.kicker)}${s.headline ? fitH('center', s.headline, 220, 88, 50) : ''}</div>
    <div class="rows fit-rows">${(s.rows ?? []).map((r, k) => {
      const col = colorOf(r.color ?? r.sign ?? null, x.accent)
      return `<div class="row trow"><div class="tnum" style="color:${col}">${esc(r.rank ?? k + 1)}</div><div><div class="row-l" style="color:${col}">${esc(r.label)}${r.value ? ` <span class="tval">· ${esc(r.value)}</span>` : ''}</div>${r.text ? `<div class="row-t">${rich(r.text)}</div>` : ''}</div></div>`
    }).join('')}</div>` }),
  end: (s, c, x) => ({ at: [50, 40], html: `
    <div class="stage" style="top:170px;height:560px;opacity:.85">${subject(x.art, 440, x.seed)}</div>
    <div class="txt bottom">${fitH('center', s.headline, 300, 104, 56)}${fitP('dek center', s.body, 100, 32, 26)}<div class="endmark">align ${SPARK('#f2c75c', 20)}</div></div>` }),
}
export const LAYOUT_NAMES = Object.keys(LAYOUTS)

function defaultArt(s, c) {
  const sign = s.sign ?? c.signs?.[0]
  if (s.layout === 'rank' && s.sign) return { kind: 'aura', sign: s.sign }
  if (sign && ['callout', 'cover', 'end'].includes(s.layout)) return { kind: 'aura', sign }
  return null
}

export function slideHtml(c, i) {
  const s = c.slides[i]
  const total = c.slides.length
  const layout = LAYOUTS[s.layout] ? s.layout : 'story'
  const seed = (hashString(c.id) + i * 7919) >>> 0
  const accent = accentOf(s, c)
  const sign = s.sign ?? c.signs?.[0]
  const signCol = SIGN_COLORS[s.sign]?.color ?? colorOf(sign ?? 'violet')
  // figure → the soft aura photo; the old 'stars'/'wheel' art fall back to pure light.
  let a = s.art ?? defaultArt(s, c)
  if (a?.kind === 'figure') a = { ...a, kind: 'aura' }
  if (a?.kind === 'stars') a = null
  const out = LAYOUTS[layout](s, c, { art: a, art2: s.art2, accent, signCol, seed })
  let cols = auraColors(a, signCol)
  if (layout === 'rank') cols = [signCol, colorOf(s.sign), '#3a1f7a']
  if (out.two) {
    const c2 = auraColors(s.art2, signCol)
    cols = [cols[0], c2[0], '#3a1f7a']
  }
  const field = out.two
    ? auraField([cols[0], cols[0], cols[2]], seed, [28, 34], .8) + auraField([cols[1], cols[1], cols[2]], seed + 1, [72, 34], .8)
    : auraField(cols, seed, out.at)

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:#07041a}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;color:#f3ebdd;background:#07041a}
.aura{position:absolute;inset:-200px;filter:blur(70px) saturate(1.15)}
.blob{position:absolute;transform:translate(-50%,-50%);border-radius:50%;mix-blend-mode:screen}
.veil{position:absolute;inset:0;background:radial-gradient(ellipse 120% 70% at 50% 100%, rgba(7,4,26,.78) 0%, rgba(7,4,26,.35) 45%, rgba(7,4,26,0) 75%)}
.grain{position:absolute;inset:0;opacity:.5;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.55'/></svg>")}
/* subject */
.stage{position:absolute;left:0;right:0;display:flex;align-items:center;justify-content:center}
.subj{position:relative}
.subj .bloom,.subj .body{position:absolute;inset:0}
.subj .bloom{filter:blur(60px) saturate(1.5) brightness(1.3);opacity:1;transform:scale(1.3)}
.subj .body{filter:blur(2.2px) saturate(1.1) brightness(1.04);
  -webkit-mask-image:radial-gradient(closest-side, #000 54%, rgba(0,0,0,.55) 60%, transparent 68%);mask-image:radial-gradient(closest-side, #000 54%, rgba(0,0,0,.55) 60%, transparent 68%)}
.subj.wide .body{-webkit-mask-image:radial-gradient(closest-side, #000 72%, transparent 99%);mask-image:radial-gradient(closest-side, #000 72%, transparent 99%);filter:blur(2.6px) saturate(1.1)}
.subj .bloom{-webkit-mask-image:radial-gradient(closest-side, #000 40%, transparent 100%);mask-image:radial-gradient(closest-side, #000 40%, transparent 100%)}
.subj .haze{position:absolute;inset:18%;border-radius:50%;background:radial-gradient(circle at 38% 32%, rgba(255,250,240,.35), rgba(255,250,240,0) 60%);mix-blend-mode:screen;filter:blur(8px)}
.subj svg{width:100%;height:100%}
.figure{position:relative;overflow:hidden;border-radius:50%;
  -webkit-mask-image:radial-gradient(closest-side, #000 35%, rgba(0,0,0,.5) 65%, transparent 100%);mask-image:radial-gradient(closest-side, #000 35%, rgba(0,0,0,.5) 65%, transparent 100%)}
.figure img{position:absolute;inset:-12%;width:124%;height:124%;object-fit:cover;filter:blur(7px) saturate(1.25) brightness(1.1)}
.inset{position:absolute;right:150px;bottom:20px;opacity:.95}
.giant{position:absolute;left:-40px;right:-40px;top:150px;text-align:center;font:italic 500 300px/1 'EB Garamond',serif;letter-spacing:-.04em;
  color:rgba(255,244,230,.16);filter:blur(1.5px);white-space:nowrap}
.labels{position:absolute;top:780px;left:0;right:0;display:flex;justify-content:space-around;font:400 22px 'Space Mono',monospace;letter-spacing:.3em;text-transform:uppercase;color:rgba(243,235,221,.7)}
/* chrome: just a quiet mark */
.mark{position:absolute;top:56px;left:0;right:0;text-align:center;font:400 20px 'Space Mono',monospace;letter-spacing:.34em;color:rgba(243,235,221,.55);display:flex;justify-content:center;gap:10px;align-items:center}
.count{position:absolute;top:58px;right:64px;font:400 18px 'Space Mono',monospace;letter-spacing:.14em;color:rgba(243,235,221,.4)}
/* type */
.txt{position:absolute;left:84px;right:84px;display:flex;flex-direction:column;align-items:center;text-align:center}
.txt.bottom{bottom:110px}
.txt.top{top:150px}
.head{font-family:'EB Garamond',Georgia,serif;font-style:italic;font-weight:500;line-height:1.04;letter-spacing:-.012em;color:#f6eee1;text-wrap:balance;width:100%;
  text-shadow:0 2px 30px rgba(7,4,26,.55)}
.center{text-align:center}
em{font-style:inherit;color:${accent};text-shadow:0 0 40px ${accent}aa,0 0 12px ${accent}66}
mark{background:none;color:${accent};text-shadow:0 0 40px ${accent}aa}
b{font-weight:500;color:#f6eee1}
.kicker{font:400 20px 'Space Mono',monospace;letter-spacing:.3em;text-transform:uppercase;color:rgba(243,235,221,.62);margin-bottom:26px}
.dek,.body{font:400 34px/1.45 'Inter',sans-serif;color:rgba(243,235,221,.72);margin-top:26px;width:100%;text-wrap:pretty}
.body.bone{color:#f3ebdd}
.hook{font:italic 400 46px/1.25 'EB Garamond',serif;color:#f6eee1;margin-top:18px;width:100%;text-wrap:balance}
.quote{font-weight:400}
/* rank */
.rank-num{position:absolute;top:120px;left:0;right:0;text-align:center;font:italic 400 220px/1 'EB Garamond',serif;color:rgba(255,244,230,.14);filter:blur(.5px)}
.sign{font:italic 500 120px/1 'EB Garamond',serif;letter-spacing:-.01em;text-shadow:0 0 50px currentColor}
.rank .kicker{margin:14px 0 0}
/* note */
.note{position:absolute;left:84px;right:84px;bottom:110px;padding:44px 48px;border-radius:44px;background:rgba(20,10,46,.42);backdrop-filter:blur(24px)}
.note-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px}
.note-title{font:italic 500 44px 'EB Garamond',serif;display:flex;gap:12px;align-items:center}
.verdict{font:400 20px 'Space Mono',monospace;letter-spacing:.24em;text-transform:uppercase;text-shadow:0 0 20px currentColor}
.note .body{text-align:left;margin-top:14px}
/* rows */
.rows{position:absolute;left:96px;right:96px;top:560px;bottom:110px;display:flex;flex-direction:column;justify-content:center;gap:40px}
.row{text-align:left}
.row-l{font:italic 500 46px/1.1 'EB Garamond',serif;text-shadow:0 0 30px currentColor}
.row-t{font:400 32px/1.35 'Inter',sans-serif;color:rgba(243,235,221,.75);margin-top:6px}
.trow{display:grid;grid-template-columns:80px 1fr;gap:20px;align-items:start}
.tnum{font:italic 400 64px/1 'EB Garamond',serif;text-shadow:0 0 30px currentColor}
.tval{font:400 20px 'Space Mono',monospace;letter-spacing:.2em;text-transform:uppercase;opacity:.8;text-shadow:none}
.endmark{margin-top:44px;display:flex;gap:12px;align-items:center;font:400 22px 'Space Mono',monospace;letter-spacing:.34em;color:rgba(243,235,221,.7)}
</style></head><body><div class="frame${layout === 'rank' ? ' rank' : ''}">
${field}
${dust(W, H, seed)}
<div class="veil"></div>
${out.html}
<div class="grain"></div>
<div class="mark">align ${SPARK('#f2c75c', 16)}</div>
${total > 1 ? `<div class="count">${i + 1}/${total}</div>` : ''}
</div>
<script>
(async () => {
  await document.fonts.ready
  for (const el of document.querySelectorAll('.fit')) {
    const max = +el.dataset.max, big = +el.dataset.big, small = +el.dataset.small
    let s = big
    for (; s > small; s -= 2) { el.style.fontSize = s + 'px'; if (el.scrollHeight <= max && el.scrollWidth <= el.clientWidth + 2) break }
    el.style.fontSize = s + 'px'
  }
  // Lists: rows start under the heading, and shrink if they run long.
  const rows = document.querySelector('.fit-rows'), top = document.querySelector('.txt.top')
  if (rows && top) {
    rows.style.top = (top.getBoundingClientRect().bottom + 50) + 'px'
    let f = 32, g = 40
    while (rows.scrollHeight > rows.clientHeight + 2 && f > 22) {
      f -= 1; g = Math.max(14, g - 3); rows.style.gap = g + 'px'
      rows.querySelectorAll('.row-t').forEach((r) => (r.style.fontSize = f + 'px'))
      rows.querySelectorAll('.row-l').forEach((r) => (r.style.fontSize = (f + 12) + 'px'))
    }
  }
  // Keep bottom text clear of the subject: if the text block is tall, fade the subject a little.
  const txt = document.querySelector('.txt.bottom'), stage = document.querySelector('.stage')
  if (txt && stage) {
    const overlap = stage.getBoundingClientRect().bottom - txt.getBoundingClientRect().top
    if (overlap > 120) stage.style.transform = 'translateY(' + (-Math.min(overlap - 120, 160)) + 'px)'
  }
  const frame = document.querySelector('.frame').getBoundingClientRect()
  window.__overflow = [...document.querySelectorAll('.head,.body,.hook,.dek,.row')].filter((e) => e.getBoundingClientRect().bottom > frame.bottom - 40).map((e) => e.className)
  window.__ready = true
})()
</script></body></html>`
}
