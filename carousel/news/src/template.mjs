// One news slide as a standalone 1080×1350 HTML page: the "wire" look, built
// from the reference teardown in news/research/ (TYPE-LAYOUT.md, IMAGERY.md).
//
// The grammar: a real NASA photo across the top ~60% with a soft glow in the
// sign's colour behind it, a hard fade to near-black, a divider with a small
// `align ✦`, then a huge Anton all-caps headline whose lines are balanced to
// fill ~90% of the width. Colour words: signs in their sign colour, planets
// and numbers in gold, everything else bone. 3–5 elements per slide.
//
// Markup in text: *word* = accent (auto colour), [[word]] = gold, **b** = bone bold.

import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageDataUri } from '../../src/backgrounds.mjs'
import { SIGN_COLORS, SIGNS } from '../../src/schema.mjs'

export const W = 1080
export const H = 1350
const require = createRequire(import.meta.url)
const HERE = path.dirname(fileURLToPath(import.meta.url))
const PHOTO = path.resolve(HERE, '../assets/photo')
const FONTDIR = path.resolve(HERE, '../../../reels/signs/assets/fonts')

const C = { bone: '#efe6d6', mist: '#b3a6c4', gold: '#f2c75c', floor: '#07041a', rub: '#e8628a', spark: '#7fd8b0', violet: '#b9a2ff' }
const PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']

// ---- assets -----------------------------------------------------------------
const uriCache = new Map()
function fileUri(file, mime) {
  if (!uriCache.has(file)) uriCache.set(file, `data:${mime};base64,${readFileSync(file).toString('base64')}`)
  return uriCache.get(file)
}
const photo = (name) => fileUri(path.join(PHOTO, `${name}.jpg`), 'image/jpeg')
function pkgFont(pkg, file) {
  return fileUri(path.join(path.dirname(require.resolve(`${pkg}/package.json`)), 'files', file), 'font/woff2')
}
let FONTS
function fonts() {
  FONTS ??= `
@font-face{font-family:Anton;src:url(${pkgFont('@fontsource/anton', 'anton-latin-400-normal.woff2')}) format('woff2');font-display:block}
@font-face{font-family:Bebas;src:url(${fileUri(path.join(FONTDIR, 'BebasNeue-Regular.ttf'), 'font/ttf')}) format('truetype');font-display:block}
@font-face{font-family:Archivo;src:url(${fileUri(path.join(FONTDIR, 'ArchivoNarrow.ttf'), 'font/ttf')}) format('truetype');font-weight:100 900;font-display:block}
@font-face{font-family:'Space Mono';src:url(${pkgFont('@fontsource/space-mono', 'space-mono-latin-400-normal.woff2')}) format('woff2');font-display:block}`
  return FONTS
}

// ---- text -------------------------------------------------------------------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Colour for an accented phrase: a sign → its colour; a planet, a number or a
// time → gold; anything else → the slide's accent.
function accentFor(phrase, fallback) {
  const p = phrase.toLowerCase()
  const sign = SIGNS.find((s) => p.includes(s))
  if (sign) return SIGN_COLORS[sign].color
  if (PLANETS.some((x) => new RegExp(`\\b${x}`).test(p)) || /\d/.test(p) || /eclipse|full moon|new moon/.test(p)) return C.gold
  return fallback
}
const glueNums = (t) => String(t ?? '').replace(/(\d[\d:,]*(?:st|nd|rd|th)?)\s+(am|pm|days?|signs?|dates?|hours?|weeks?|years?|planets?|things?|events?|°)\b/gi, '$1\u00a0$2')
const rich = (s, fallback) => esc(glueNums(s))
  .replace(/\[\[(.+?)\]\]/g, (_, t) => `<span class="ac" style="color:${C.gold}">${t}</span>`)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\*(.+?)\*/g, (_, t) => `<span class="ac" style="color:${accentFor(t, fallback)}">${t}</span>`)
  .replace(/\n/g, ' ')

// Body copy reads as sentences: capitalise sentence starts, "i", names, months, days.
const PROPER = [...SIGNS, ...PLANETS.filter((p) => p !== 'sun' && p !== 'moon'), 'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'dec', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'christmas', 'ophiuchus', 'earth', 'nasa']
function sentence(s) {
  let t = String(s ?? '')
  t = t.replace(/(^|[.?:]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase())
  t = t.replace(/\bi\b/g, 'I').replace(/\bi'(m|ll|ve|d)\b/g, "I'$1")
  t = t.replace(new RegExp(`\\b(${PROPER.join('|')})\\b`, 'g'), (w) => w[0].toUpperCase() + w.slice(1))
  t = t.replace(/\bvalentine/g, 'Valentine').replace(/\bet\b/g, 'ET').replace(/\butc\b/g, 'UTC')
  return t
}

const STAR = (c, s) => `<svg width="${s}" height="${s}" viewBox="0 0 20 20" style="display:inline-block"><path fill="${c}" d="M10 0C10.9 6.4 13.6 9.1 20 10 13.6 10.9 10.9 13.6 10 20 9.1 13.6 6.4 10.9 0 10 6.4 9.1 9.1 6.4 10 0Z"/></svg>`

// ---- art --------------------------------------------------------------------
const SIGN_NEBULA = {
  aries: 'aurora-red', leo: 'nebula-gold', sagittarius: 'nebula-violet', taurus: 'nebula-cosmic-cliffs', virgo: 'aurora-pink', capricorn: 'aurora-green',
  gemini: 'nebula-gold', libra: 'aurora-pink', aquarius: 'nebula-blue', cancer: 'nebula-blue', scorpio: 'aurora-red', pisces: 'nebula-violet',
}
const planetPhoto = (body) => (body === 'moon' ? { kind: 'photo', file: 'moon-full', size: 1 } : { kind: 'photo', file: body, size: body === 'saturn' ? 1.45 : 1 })
function eclipseArt(type, penumbral) {
  if (type === 'lunar') return penumbral ? { kind: 'photo', file: 'moon-full', size: 1, dim: true } : { kind: 'photo', file: 'blood-moon', size: 1 }
  return { kind: 'photo', file: 'eclipse-partial-sun', size: 1.2 }
}
// Guess a subject from the post when a slide has no usable art.
function subjectFromPost(c, s) {
  return subjectFromText(s.headline ?? '') ?? subjectFromText((c.facts ?? []).join(' '))
}
function subjectFromText(raw) {
  const text = raw.toLowerCase()
  if (/season/.test(text) && !/eclipse/.test(text)) return planetPhoto('sun')
  if (/eclipse/.test(text)) return eclipseArt(/lunar|blood|penumbral/.test(text) ? 'lunar' : 'solar', /penumbral|2027-02-20/.test(text))
  if (/full moon/.test(text)) return planetPhoto('moon')
  if (/new moon/.test(text)) return { kind: 'photo', file: 'moon-crescent', size: 1 }
  const pl = ['venus', 'mars', 'mercury', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'sun'].find((p) => new RegExp(`\\b${p}\\b`).test(text))
  return pl ? planetPhoto(pl) : null
}
function resolveArt(a, s, c) {
  const sign = s.sign ?? c.signs?.[0]
  const nebula = (k) => ({ kind: 'nebula', file: SIGN_NEBULA[k] ?? 'nebula-violet' })
  if (!a) return s.layout === 'rank' && s.sign ? { kind: 'aura', sign: s.sign } : subjectFromPost(c, s) ?? nebula(sign)
  switch (a.kind) {
    case 'planet': return planetPhoto(a.body)
    case 'moon': {
      const p = a.phase ?? 0.5
      if (Math.abs(p - 0.5) < 0.12) return planetPhoto('moon')
      const half = Math.abs(p - 0.25) < 0.13 || Math.abs(p - 0.75) < 0.13
      return { kind: 'photo', file: half ? 'moon-half' : 'moon-crescent', size: 1, flip: p > 0.5 }
    }
    case 'eclipse': return eclipseArt(a.type === 'solar' ? 'solar' : 'lunar', a.type === 'penumbral')
    case 'pair': return { kind: 'pair', a: planetPhoto(a.a), b: planetPhoto(a.b) }
    case 'figure': case 'aura': return { kind: 'aura', sign: a.sign ?? sign }
    default: return subjectFromPost(c, s) ?? nebula(a.tint ?? sign)
  }
}

// The art band (height h): photo(s) on a glow in `glow`, screened so their
// black becomes the floor, fading out at the bottom.
function artBand(art, h, glow, { cy = h * 0.47, d = h * 0.74 } = {}) {
  d = d
  const disc = (p, x, y, size) => `<div class="ph" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background-image:url(${photo(p.file)});${p.flip ? 'transform:scaleX(-1);' : ''}${p.dim ? 'filter:brightness(.6) saturate(.8);' : ''}"></div>`
  const halo = (x, y, r, col, o) => `<div class="halo" style="left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;background:radial-gradient(circle, ${col} 0%, ${col}99 26%, ${col}33 50%, transparent 70%);opacity:${o}"></div>`
  const side = (a, x, y, size) => a.kind === 'photo' ? disc(a, x, y, size * a.size)
    : a.kind === 'aura' ? `<div class="aura-img" style="left:${x - size * 0.6}px;top:${y - size * 0.6}px;width:${size * 1.2}px;height:${size * 1.2}px;background-image:url(${imageDataUri(`aura/${a.sign}.jpg`)})"></div>` : ''
  let inner = ''
  // NASA frames carry black margin round the disc: scale up so the disc itself is d.
  d *= 1.38
  if (art.kind === 'photo') {
    const size = d * art.size
    inner = halo(540, cy, Math.min(size, 900) * 0.62, glow, 0.6) + disc(art, 540, cy, size)
  } else if (art.kind === 'pair') {
    const size = d * 0.7
    inner = halo(300, cy + 24, size * 0.5, glow, 0.5) + halo(780, cy - 24, size * 0.5, glow, 0.5)
      + side(art.a, 290, cy + 24, size) + side(art.b, 790, cy - 24, size)
  } else if (art.kind === 'aura') {
    const col = SIGN_COLORS[art.sign]?.color ?? glow
    const size = h * 1.15
    inner = halo(540, cy, 560, col, 0.45) + `<div class="aura-img" style="left:${540 - size / 2}px;top:${cy - size / 2}px;width:${size}px;height:${size}px;background-image:url(${imageDataUri(`aura/${art.sign}.jpg`)})"></div>`
  } else {
    inner = `<div class="neb" style="background-image:url(${photo(art.file)})"></div>`
  }
  return `<div class="band" style="height:${h}px">${inner}<div class="fade"></div></div>`
}

// ---- pieces -----------------------------------------------------------------
const divider = () => `<div class="div"><i></i><span class="mark">align ${STAR(C.gold, 18)}</span><i></i></div>`
const tag = (t) => `<div class="tag">${esc(t)}</div>`
const head = (text, accent, { maxh, maxfs = 150, minfs = 64, target = 940, cls = '' } = {}) =>
  `<div class="hd ${cls}" data-maxh="${maxh}" data-maxfs="${maxfs}" data-minfs="${minfs}" data-target="${target}">${rich(text, accent)}</div>`
const body = (t, accent, cls = '') => (t ? `<p class="bd ${cls}">${rich(sentence(t), accent)}</p>` : '')
const deck = (t, accent) => (t ? `<p class="deck">${rich(t, accent)}</p>` : '')

const VERDICT = { true: ['true.', C.spark], misleading: ['half true.', C.gold], false: ['not true.', C.rub], context: ['needs context.', C.violet] }

// ---- layouts ----------------------------------------------------------------
const coverLike = (s, x, tagText) => `
  ${s.layout === 'split' && x.art2 && x.art.kind === x.art2.kind ? artBand({ kind: 'pair', a: x.art, b: x.art2 }, 900, x.glow, { d: 560 }) : artBand(x.art, 900, x.glow)}
  <div class="stack" style="bottom:92px">
    ${tagText ? tag(tagText) : divider()}
    ${head(s.headline, x.accent, { maxh: s.dek || (s.layout === 'callout' && s.body) ? 320 : 400, maxfs: 150 })}
    ${deck(s.dek ?? (s.layout === 'callout' ? s.body : ''), x.accent)}
  </div>`

const LAYOUTS = {
  cover: (s, c, x) => coverLike(s, x),
  hero: (s, c, x) => coverLike(s, x),
  callout: (s, c, x) => coverLike(s, x),
  split: (s, c, x) => coverLike(s, x),
  breaking: (s, c, x) => coverLike(s, x, s.word ?? 'breaking'),
  story: (s, c, x) => `
    ${artBand(x.art, 780, x.glow, { d: 600 })}
    <div class="stack" style="bottom:92px">
      ${s.kicker ? tag(s.kicker) : divider()}
      ${head(s.headline, x.accent, { maxh: s.body ? 250 : 360, maxfs: 120, minfs: 56 })}
      ${body(s.body, x.accent)}
    </div>`,
  rank: (s, c, x) => `
    ${artBand(x.art, 680, x.signCol, { d: 560 })}
    <div class="stack left" style="bottom:96px">
      <div class="rank">#${esc(s.rank)}</div>
      <div class="sign" style="color:${x.signCol}" data-fitw="952">${esc(s.title ?? s.sign)}</div>
      ${head(s.headline, x.accent, { maxh: 180, maxfs: 84, minfs: 44, target: 952, cls: 'left bebas' })}
      ${body(s.body, x.accent, 'left')}
    </div>`,
  note: (s, c, x) => `
    ${artBand(x.art, 560, x.glow, { d: 420 })}
    <div class="stack" style="bottom:92px">
      ${tag(s.kicker && !/^(going around|viral claim)$/i.test(s.kicker) ? s.kicker : 'claim check')}
      ${head(s.headline, x.accent, { maxh: 290, maxfs: 104, minfs: 54 })}
      <div class="verdict" style="color:${(VERDICT[s.verdict] ?? VERDICT.context)[1]}">${(VERDICT[s.verdict] ?? VERDICT.context)[0]}</div>
      ${body(s.body, x.accent)}
    </div>`,
  list: (s, c, x) => listLike(s, x, false),
  table: (s, c, x) => listLike(s, x, true),
  end: (s, c, x) => `
    ${artBand(x.art, 840, x.glow, { d: 600 })}
    <div class="stack" style="bottom:100px">
      ${divider()}
      ${head(s.headline, x.accent, { maxh: s.body ? 290 : 370, maxfs: 130 })}
      ${s.body ? `<p class="deck">${rich(s.body, x.accent)}</p>` : ''}
    </div>`,
}
function listLike(s, x, numbered) {
  const rows = (s.rows ?? []).map((r, k) => {
    const sign = r.sign ?? SIGNS.find((g) => (r.label ?? '').toLowerCase() === g)
    const col = sign ? SIGN_COLORS[sign].color : PLANETS.includes(r.color) ? C.gold : SIGN_COLORS[r.color]?.color ?? C.gold
    return `<div class="row">${numbered ? `<span class="num">${esc(r.rank ?? k + 1)}</span>` : ''}<span class="nm" style="color:${col}">${esc(r.label)}</span><span class="tx">${rich(sentence(r.text ?? ''), x.accent)}${r.value ? ` <em>· ${esc(r.value)}</em>` : ''}</span></div>`
  }).join('')
  return `
    ${artBand(x.art, 640, x.glow, { d: 440, cy: 300 })}
    <div class="stack" style="bottom:92px">
      ${s.kicker ? tag(s.kicker) : divider()}
      ${s.headline ? head(s.headline, x.accent, { maxh: 210, maxfs: 116, minfs: 56 }) : ''}
      <div class="rows ${numbered ? 'numbered' : ''}">${rows}</div>
    </div>`
}
export const LAYOUT_NAMES = Object.keys(LAYOUTS)

export function slideHtml(c, i) {
  const s = c.slides[i]
  const total = c.slides.length
  const layout = LAYOUTS[s.layout] ? s.layout : 'story'
  const sign = s.sign ?? c.signs?.[0]
  const signCol = SIGN_COLORS[s.sign ?? sign]?.color ?? C.violet
  const accent = s.accent === 'gold' ? C.gold : SIGN_COLORS[s.accent]?.color ?? signCol
  let art = resolveArt(s.art, s, c)
  // Covers lead with a real photograph of what the headline names.
  if (i === 0 && art.kind === 'aura') { const named = subjectFromText(s.headline ?? ''); if (named) art = named }
  const glow = art.kind === 'aura' ? SIGN_COLORS[art.sign]?.color ?? signCol : signCol
  let art2 = s.art2 ? resolveArt(s.art2, s, c) : null
  if (i === 0 && art2?.kind === 'aura' && art.kind !== 'aura') art2 = null
  const html = LAYOUTS[layout](s, c, { accent, art, art2, glow, signCol })
  const cover = i === 0

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.floor}}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:${C.floor};color:${C.bone};-webkit-font-smoothing:antialiased}
.band{position:absolute;left:0;right:0;top:0;overflow:hidden}
.ph{position:absolute;background-size:cover;background-position:center;mix-blend-mode:screen;
  -webkit-mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%);mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%)}
.halo{position:absolute;border-radius:50%;filter:blur(42px);mix-blend-mode:screen}
.aura-img{position:absolute;background-size:122%;background-position:center;mix-blend-mode:screen;filter:saturate(1.25) brightness(1.05) blur(1px);
  -webkit-mask-image:radial-gradient(closest-side, #000 52%, transparent 100%);mask-image:radial-gradient(closest-side, #000 52%, transparent 100%)}
.neb{position:absolute;inset:-30px;background-size:cover;background-position:center 30%;filter:saturate(1.1) brightness(.8)}
.fade{position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(180deg, ${C.floor}00 0%, ${C.floor}d0 58%, ${C.floor} 100%)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.stack{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;align-items:center;text-align:center}
.stack.left{align-items:flex-start;text-align:left;left:64px;right:64px}
.div{display:flex;align-items:center;gap:20px;width:100%;margin-bottom:26px}
.div i{flex:1;height:3px;background:linear-gradient(90deg, rgba(242,199,92,0), #f2c75c)}
.div i:last-child{background:linear-gradient(270deg, rgba(242,199,92,0), #f2c75c)}
.mark{font:400 22px 'Space Mono',monospace;letter-spacing:.3em;color:rgba(239,230,214,.85);display:flex;gap:10px;align-items:center;text-transform:lowercase}
.tag{font:400 26px/1 Anton;letter-spacing:.06em;text-transform:uppercase;color:${C.floor};background:${C.bone};padding:9px 16px 8px;margin-bottom:28px}
.hd{font-family:Anton;text-transform:uppercase;color:${C.bone};line-height:.98;letter-spacing:-.005em;width:100%}
.hd .l{display:block;white-space:nowrap}
.hd.left{text-align:left}
.hd.bebas{font-family:Bebas;line-height:1;letter-spacing:.01em}
.verdict{font:400 112px/1 Anton;text-transform:uppercase;margin-top:16px}
.deck{font:400 44px/1.05 Bebas;letter-spacing:.04em;text-transform:uppercase;color:${C.mist};margin-top:22px}
.bd{font:500 38px/1.36 Archivo, sans-serif;color:${C.mist};margin-top:24px;max-width:940px}
.bd.left{text-align:left}
.bd b,.deck b{color:${C.bone};font-weight:600}
.rank{font:400 76px/1 Anton;color:${C.gold}}
.sign{font:400 176px/.95 Anton;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap;margin:4px 0 16px}
.rows{width:100%;margin-top:34px;display:flex;flex-direction:column;gap:26px}
.row{display:grid;grid-template-columns:330px 1fr;gap:26px;align-items:baseline;text-align:left}
.rows.numbered .row{grid-template-columns:62px 300px 1fr}
.num{font:400 54px/1 Anton;color:${C.gold}}
.nm{font:400 56px/1 Anton;text-transform:uppercase;text-align:right}
.rows.numbered .nm{text-align:left}
.tx{font:500 32px/1.25 Archivo, sans-serif;color:${C.bone}}
.tx em{font-style:normal;color:${C.mist}}
.chrome{position:absolute;top:52px;font:400 20px 'Space Mono',monospace;letter-spacing:.24em;color:rgba(239,230,214,.7);display:flex;gap:8px;align-items:center;z-index:5}
.chrome.l{left:64px}.chrome.r{right:64px;letter-spacing:.12em}
</style></head><body><div class="frame">
${html}
<div class="grain"></div>
${cover ? '' : `<div class="chrome l">align ${STAR(C.gold, 16)}</div><div class="chrome r">${i + 1}/${total}</div>`}
</div>
<script>
(async () => {
  await document.fonts.ready
  // Balance each headline into lines so the widest fills the target width,
  // and size it: the biggest font where every line fits the box.
  for (const el of document.querySelectorAll('.hd')) {
    const target = +el.dataset.target, maxh = +el.dataset.maxh, maxfs = +el.dataset.maxfs, minfs = +el.dataset.minfs
    const words = []
    let glue = false
    const walk = (node, wrap) => {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) {
          const t = n.textContent
          const parts = t.split(/[ \\n\\t]+/).filter(Boolean)
          // Punctuation hugging the previous span ("*stuck*.") stays on that word.
          if (parts.length && !/^[ \\n\\t]/.test(t) && words.length && glue) { words[words.length - 1] += parts.shift() }
          parts.forEach((w) => words.push(wrap ? wrap[0] + w + wrap[1] : w))
          glue = !/[ \\n\\t]$/.test(t)
        } else { const o = n.outerHTML; const cut = o.indexOf('>') + 1; walk(n, [o.slice(0, cut), '</' + n.tagName.toLowerCase() + '>']); glue = true }
      }
    }
    walk(el, null)
    const meas = document.createElement('span')
    meas.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font-size:100px'
    el.appendChild(meas)
    const wid = words.map((w) => { meas.innerHTML = w; return meas.getBoundingClientRect().width })
    meas.innerHTML = 'a&nbsp;a'; const two = meas.getBoundingClientRect().width; meas.innerHTML = 'aa'; const sp = two - meas.getBoundingClientRect().width
    meas.remove()
    const N = words.length
    const lineW = (a, b) => { let s = sp * (b - a - 1); for (let k = a; k < b; k++) s += wid[k]; return s }
    const split = (n) => {
      if (n > N) return null
      const memo = new Map()
      const go = (start, k) => {
        const key = start * 10 + k; if (memo.has(key)) return memo.get(key)
        let best
        if (k === 1) best = { w: lineW(start, N), cuts: [] }
        else for (let e = start + 1; e <= N - k + 1; e++) {
          const r = go(e, k - 1); const w = Math.max(lineW(start, e), r.w)
          if (!best || w < best.w - 0.01) best = { w, cuts: [e, ...r.cuts] }
        }
        memo.set(key, best); return best
      }
      return go(0, n)
    }
    const lh = 0.98
    let pick = null
    for (let n = 1; n <= 5; n++) {
      const r = split(n); if (!r) break
      let fs = Math.min(maxfs, 100 * target / r.w)
      if (n * fs * lh > maxh) fs = maxh / (n * lh)
      // No stranded short line: every line at least 45% of the widest.
      const cs = [0, ...r.cuts, N]; let lo = Infinity
      for (let k = 0; k < n; k++) lo = Math.min(lo, lineW(cs[k], cs[k + 1]))
      if (n > 1 && lo / r.w < 0.45 && pick) continue
      if (!pick || fs > pick.fs + 3) pick = { n, fs, cuts: r.cuts }
    }
    const cuts = [0, ...pick.cuts, N]
    el.innerHTML = cuts.slice(0, -1).map((a, k) => '<span class="l">' + words.slice(a, cuts[k + 1]).join(' ') + '</span>').join('')
    el.style.fontSize = Math.max(minfs, pick.fs).toFixed(1) + 'px'
  }
  for (const el of document.querySelectorAll('[data-fitw]')) {
    let f = 176; el.style.fontSize = f + 'px'
    while (el.scrollWidth > +el.dataset.fitw && f > 80) { f -= 4; el.style.fontSize = f + 'px' }
  }
  const stack = document.querySelector('.stack'), rows = document.querySelector('.rows')
  if (rows) {
    let f = 32, n = 56, g = 26
    while (stack.getBoundingClientRect().top < 300 && f > 24) {
      f -= 1; n -= 2; g = Math.max(12, g - 2); rows.style.gap = g + 'px'
      rows.querySelectorAll('.tx').forEach((e) => (e.style.fontSize = f + 'px'))
      rows.querySelectorAll('.nm').forEach((e) => (e.style.fontSize = n + 'px'))
    }
  }
  const bd = document.querySelector('.bd'); let bf = 38
  while (bd && stack.getBoundingClientRect().top < 360 && bf > 28) { bf -= 1; bd.style.fontSize = bf + 'px' }
  // Keep the stack clear of the bottom edge: lift it if needed.
  const over = stack.getBoundingClientRect().bottom - ${H - 64}
  window.__overflow = stack.getBoundingClientRect().top < 130 ? ['stack too tall'] : []
  window.__ready = true
})()
</script></body></html>`
}
