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
import { imageDataUri } from '../../../../src/backgrounds.mjs'
import { SIGN_COLORS, SIGNS } from '../../../../src/schema.mjs'

export const W = 1080
export const H = 1350
const require = createRequire(import.meta.url)
const HERE = path.dirname(fileURLToPath(import.meta.url))
const PHOTO = path.resolve(HERE, '../../../assets/photo')
const FONTDIR = path.resolve(HERE, '../../../../../reels/signs/assets/fonts')

const C = { bone: '#efe6d6', mist: '#b3a6c4', gold: '#f2c75c', floor: '#0b0620', canvas: '#150b35', rub: '#e8628a', spark: '#7fd8b0', violet: '#9a7be0', ink: '#3a2c4e' }
const PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']

// ---- assets -----------------------------------------------------------------
const uriCache = new Map()
function fileUri(file, mime) {
  if (!uriCache.has(file)) uriCache.set(file, `data:${mime};base64,${readFileSync(file).toString('base64')}`)
  return uriCache.get(file)
}
const photo = (name) => fileUri(path.join(PHOTO, `${name}.jpg`), 'image/jpeg')
// Measured disc radius/centre of each photo (fraction of the frame), so glows can stop at the limb.
const DISCS = JSON.parse(readFileSync(path.join(PHOTO, 'discs.json'), 'utf8'))
function pkgFont(pkg, file) {
  return fileUri(path.join(path.dirname(require.resolve(`${pkg}/package.json`)), 'files', file), 'font/woff2')
}
let FONTS
function fonts() {
  FONTS ??= `
@font-face{font-family:Anton;src:url(${pkgFont('@fontsource/anton', 'anton-latin-400-normal.woff2')}) format('woff2');font-display:block}
@font-face{font-family:Bebas;src:url(${fileUri(path.join(FONTDIR, 'BebasNeue-Regular.ttf'), 'font/ttf')}) format('truetype');font-display:block}
@font-face{font-family:Archivo;src:url(${fileUri(path.join(FONTDIR, 'ArchivoNarrow.ttf'), 'font/ttf')}) format('truetype');font-weight:100 900;font-display:block}
@font-face{font-family:'EB Garamond';font-style:italic;src:url(${pkgFont('@fontsource/eb-garamond', 'eb-garamond-latin-500-italic.woff2')}) format('woff2');font-display:block}
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

// ---- aura photograph ----------------------------------------------------------
// Every subject is shot "through an aura camera": the real photo stays crisp at
// its core, and the sign's aura reading radiates from the limb in Kirlian bands
// (a tight electric rim, then banded colour), over a soft aura-photo colour field
// and faint seed-of-life linework from the Align mark.
// Per-sign aura reading: [limb band, outer band, crown]. Sign colour first,
// then the neighbouring chakra hues the app's aura art uses for that sign.
const AURA = {
  aries: ['#f0603a', '#ff2d3a', '#ffd23f'], taurus: ['#e9b24a', '#5fdc54', '#ffd23f'], gemini: ['#f2cf4a', '#2fd0e6', '#fff0a8'],
  cancer: ['#3fb6f0', '#4a72ff', '#b45cff'], leo: ['#f39a3a', '#ffd23f', '#ff2d3a'], virgo: ['#ef5c94', '#b45cff', '#ff9fc4'],
  libra: ['#e163d6', '#4a72ff', '#ef5c94'], scorpio: ['#e23d66', '#b45cff', '#ff2d3a'], sagittarius: ['#a35cf0', '#ef5c94', '#4a72ff'],
  capricorn: ['#2fc79a', '#2fd0e6', '#5fdc54'], aquarius: ['#38c4ec', '#b45cff', '#2fd0e6'], pisces: ['#7c74f0', '#2fd0e6', '#b45cff'],
}
const palette = (sign) => {
  const a = AURA[sign] ?? ['#9a7be0', '#4a72ff', '#b45cff']
  return { sign: AURA[sign] ? sign : null, a: a[0], b: a[1], c: a[2], light: SIGN_COLORS[sign]?.light ?? '#dcbcff' }
}
let fx = 0
const RULER = { aries: 'mars', taurus: 'venus', gemini: 'mercury-color', cancer: 'moon-full', leo: 'sun', virgo: 'mercury-color', libra: 'venus', scorpio: 'pluto', sagittarius: 'jupiter', capricorn: 'saturn', aquarius: 'uranus', pisces: 'neptune' }
let CUR = { P: null, P2: null }
// Seed of life (the Align mark's linework) at petal radius R.
function seed(x, y, R, col, o, w = 1.6) {
  const pts = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  return `<svg class="seed" width="${W}" height="1350" style="opacity:${o}"><g fill="none" stroke="${col}" stroke-width="${w}">${pts.map(([a, b]) => `<circle cx="${(x + a).toFixed(1)}" cy="${(y + b).toFixed(1)}" r="${R.toFixed(1)}"/>`).join('')}<circle cx="${x}" cy="${y}" r="${(R * 2).toFixed(1)}"/></g></svg>`
}
// Kirlian bands round a disc of radius r centred at (x,y), h = band height.
// Crisp at the limb (a hot rim + fine corona-discharge filaments), soft and
// banded further out (sign colour, then the outer chakra hues), gently warped.
function kirlian(x, y, r, P, h, k = 1) {
  const id = 'k' + fx++
  const X = x.toFixed(1), Y = y.toFixed(1)
  // Outer bands rise toward the crown (the app's aura arch); the rim stays a true circle.
  const ring = (rr, sw, col, f, o) => { const lift = Math.max(0, rr / r - 1.05); return `<ellipse cx="${X}" cy="${(y - r * lift * 0.32).toFixed(1)}" rx="${rr.toFixed(1)}" ry="${(rr * (1 + lift * 0.12)).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${sw.toFixed(1)}" stroke-opacity="${(o * k).toFixed(2)}" filter="url(#${id}${f})"/>` }
  const warp = (n, b, sc, fr) => `<filter id="${id}${n}" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence type="fractalNoise" baseFrequency="${fr}" numOctaves="2" seed="${n.length * 7 + b}"/><feDisplacementMap in="SourceGraphic" scale="${sc.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="${b}"/></filter>`
  return `<svg class="kir" width="${W}" height="${h}"><defs>
    ${warp('o', 34, r * 0.14, 0.006)}${warp('m', 20, r * 0.1, 0.008)}${warp('i', 11, r * 0.05, 0.01)}
    <filter id="${id}r" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5"/></filter>
    <filter id="${id}R" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="${id}f" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter></defs>
    ${ring(r * 1.66, r * 0.4, P.c, 'o', 0.34)}
    ${ring(r * 1.34, r * 0.26, P.b, 'm', 0.5)}
    ${ring(r * 1.13, r * 0.17, P.a, 'i', 0.78)}
    ${ring(r * 1.04, r * 0.07, P.light, 'R', 0.8)}
    ${ring(r * 0.999, r * 0.016, '#fff7ec', 'r', 0.9)}
  </svg>`
}
// Aura-photo colour field: asymmetric clouds (left / right / crown) like a
// real aura print, centred on the subject.
function field(x, y, r, P, h, o = 0.7) {
  return `<div class="field" style="height:${h}px;opacity:${o};background:
    radial-gradient(${r * 1.3}px ${r * 1.7}px at ${x - r * 1.05}px ${y + r * 0.35}px, ${P.b}cc, ${P.b}00 100%),
    radial-gradient(${r * 1.3}px ${r * 1.7}px at ${x + r * 1.05}px ${y + r * 0.15}px, ${P.a}cc, ${P.a}00 100%),
    radial-gradient(${r * 1.5}px ${r * 1.0}px at ${x}px ${y - r * 1.05}px, ${P.c}aa, ${P.c}00 100%)"></div>`
}

// Saturn's floor plate: its ball and ring ellipse (measured off saturn.jpg), so
// an aura behind never shows through the planet.
const saturnBlock = (x, y, ps) => `<div class="block" style="left:${x - ps * 0.193}px;top:${y - ps * 0.168}px;width:${ps * 0.386}px;height:${ps * 0.342}px"></div><div class="block" style="left:${x - ps * 0.45}px;top:${y - ps * 0.15}px;width:${ps * 0.9}px;height:${ps * 0.3}px;-webkit-mask-image:radial-gradient(closest-side,#000 92%,transparent);mask-image:radial-gradient(closest-side,#000 92%,transparent)"></div>`

// The art band (height h).
function artBand(art, h, glow, { cy = h * 0.47, d = h * 0.74, P = CUR.P, P2 = CUR.P2 } = {}) {
  // Layers: every subject's colour field and linework first, then its Kirlian
  // bands, then the photos, so one subject's glow never washes another.
  const back = [], mid = []
  const disc = (p, x, y, size, PP, k = 1) => {
    const m = DISCS[p.file] ?? { r: 0.7, cx: 0.5, cy: 0.5 }
    const r = size * m.r / 2
    const dx = x + (m.cx - 0.5) * size * (p.flip ? -1 : 1), dy = y + (m.cy - 0.5) * size
    // A floor-coloured disc behind every body keeps the aura off its face (and
    // keeps a moon's dark side, or an eclipse bite, truly dark).
    const block = p.file === 'saturn' ? saturnBlock(x, y, size) : `<div class="block" style="left:${dx - r * 0.985}px;top:${dy - r * 0.985}px;width:${r * 1.97}px;height:${r * 1.97}px"></div>`
    back.push(field(dx, dy, r, PP, h, 0.42), seed(dx, dy, r * 0.74, PP.light, 0.2))
    if (process.env.AURA_DX && PP.sign) { const S = r * +process.env.AURA_DX; back.unshift(`<div class="dx" style="left:${dx - S / 2}px;top:${dy - S * 0.42}px;width:${S}px;height:${S}px;background-image:url(${imageDataUri(`aura/${PP.sign}.jpg`)})"></div>`) }
    mid.push(p.file === 'saturn' ? '' : kirlian(dx, dy, r, PP, h, k))
    return block + `<div class="ph" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background-image:url(${photo(p.file)});${p.flip ? 'transform:scaleX(-1);' : ''}${p.dim ? 'filter:brightness(.6) saturate(.8);' : ''}"></div>`
  }
  const figure = (sign, x, y, size) => {
    const PP = palette(sign)
    const src = imageDataUri(`aura/${sign}.jpg`)
    return field(x, y, size * 0.32, PP, h, 0.35) + seed(x, y - size * 0.08, size * 0.2, PP.light, 0.2)
      + `<div class="aura-bloom" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background-image:url(${src})"></div>`
      + `<div class="aura-img" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background-image:url(${src})"></div>`
      + head(sign, x, y, size)
  }
  // Double exposure: the sign's ruling planet, crisp, sits where the aura figure's head is.
  const head = (sign, x, y, size) => {
    const file = RULER[sign]; const m = DISCS[file]; if (!m) return ''
    const img = size * 1.22, r = img * 0.1, hy = y - img * (585 / 640) * 0.14
    // Saturn's frame is measured round its rings: no rim, no block, a wider frame.
    if (file === 'saturn') { const ps = 2 * r / m.r * 1.25; return saturnBlock(x, hy, ps) + `<div class="ph" style="left:${x - ps / 2}px;top:${hy - ps / 2}px;width:${ps}px;height:${ps}px;background-image:url(${photo(file)})"></div>` }
    const ps = 2 * r / m.r
    return kirlian(x, hy, r, palette(sign), h, 0.8) + `<div class="block" style="left:${x - r * 0.985}px;top:${hy - r * 0.985}px;width:${r * 1.97}px;height:${r * 1.97}px"></div>`
      + `<div class="ph" style="left:${x - ps / 2}px;top:${hy - ps / 2}px;width:${ps}px;height:${ps}px;background-image:url(${photo(file)})"></div>`
  }
  let inner = ''
  // NASA frames carry black margin round the disc: scale up so the disc itself is d.
  d *= 1.38
  if (art.kind === 'photo') {
    inner = disc(art, 540, cy, d * art.size * 0.88, P)
  } else if (art.kind === 'pair') {
    const size = d * 0.7
    const side = (a, x, y, PP) => a.kind === 'photo' ? disc(a, x, y, size * a.size, PP, 0.8) : a.kind === 'aura' ? figure(a.sign, x, y, size * 1.2) : ''
    inner = side(art.a, 290, cy + 24, P) + side(art.b, 790, cy - 24, P2 ?? P)
  } else if (art.kind === 'aura') {
    inner = figure(art.sign, 540, cy, h * 1.12)
  } else {
    const r = 330
    // A sky field, graded like an aura print: the sign's colours wash in from
    // the sides over the real nebula, the centre keeps its true colour.
    inner = `<div class="neb" style="background-image:url(${photo(art.file)})"></div>`
      + `<div class="ntint" style="background:radial-gradient(60% 70% at 50% ${cy / h * 100}%, transparent 30%, ${P.b} 75%), linear-gradient(90deg, ${P.b}, transparent 40%, transparent 60%, ${P.a})"></div>`
      + field(540, cy, r, P, h, 0.4) + seed(540, cy, r * 0.74, P.light, 0.24)
  }
  // The app's splash halo: a wide violet breath behind every subject.
  const violet = `<div class="halo" style="left:${540 - 640}px;top:${cy - 520}px;width:1280px;height:1040px;background:radial-gradient(closest-side, rgba(154,123,224,.36), rgba(91,47,184,.14) 60%, transparent);filter:blur(20px)"></div>`
  return `<div class="band" style="height:${h}px">${violet}${back.join('')}<div class="agrain" style="height:${h}px"></div><div class="plasma" style="height:${h}px"></div>${mid.join('')}${inner}<div class="vig"></div><div class="fade"></div></div>`
}


// The Align mark, as in app/src/components/intro/AlignMark.tsx: seed-of-life
// circles with the glowing 7-chakra column (root red at the bottom → crown violet).
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
let markN = 0
function alignMark(size) {
  const id = 'am' + markN++
  const R = 20, petals = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...petals.map(([x, y]) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${R}"/>`), `<circle cx="0" cy="0" r="${R * 2}"/>`].join('')
  const defs = CHAKRAS.map((c, i) => `<radialGradient id="${id}g${i}"><stop offset="0" stop-color="${c}" stop-opacity=".9"/><stop offset=".45" stop-color="${c}" stop-opacity=".35"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="${id}c${i}" cx="42%" cy="38%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></radialGradient>`).join('')
  const dots = CHAKRAS.map((_, i) => { const cy = 3 * 10.6 - i * 10.6; return `<circle cx="0" cy="${cy}" r="11" fill="url(#${id}g${i})"/><circle cx="0" cy="${cy}" r="3.7" fill="url(#${id}c${i})"/>` }).join('')
  return `<svg width="${size}" height="${size}" viewBox="-44 -44 88 88" style="overflow:visible;display:block"><defs>${defs}</defs><g fill="none" stroke="#d9cdf0" stroke-opacity=".6" stroke-width=".7">${circles}</g>${dots}</svg>`
}
const logo = (size, word) => `<span class="logo">${alignMark(size)}<span class="word" style="font-size:${word}px">Align</span></span>`

// ---- pieces -----------------------------------------------------------------
const divider = () => `<div class="div"><i></i>${logo(58, 40)}<i></i></div>`
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
    ${divider()}
    ${tagText ? tag(tagText) : ''}
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
  // The aura reading's sign: the slide's own sign, else the sign its art names, else the post's lead sign.
  const auraSign = s.sign ?? (art.kind === 'aura' ? art.sign : null) ?? s.art?.sign ?? c.signs?.[0]
  CUR = { P: palette(auraSign), P2: s.art2?.sign ? palette(s.art2.sign) : null }
  const html = LAYOUTS[layout](s, c, { accent, art, art2, glow, signCol })
  const cover = i === 0
  const frame = process.env.AURA_FRAME && cover ? `<div class="print"></div><div class="pcap l">aura reading</div><div class="pcap r">${esc(auraSign ?? '')}</div>` : ''

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.floor}}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse 120% 70% at 50% 30%, ${C.canvas} 0%, ${C.floor} 70%);color:${C.bone};-webkit-font-smoothing:antialiased}
.band{position:absolute;left:0;right:0;top:0;overflow:hidden}
.ph{position:absolute;background-size:cover;background-position:center;mix-blend-mode:lighten;filter:contrast(1.05) saturate(1.05);
  -webkit-mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%);mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%)}
.block{position:absolute;border-radius:50%;background:#0b0620}
.halo{position:absolute;border-radius:50%;filter:blur(42px);mix-blend-mode:screen}
.aura-img{position:absolute;background-size:122%;background-position:center;mix-blend-mode:screen;filter:contrast(1.15) saturate(1.2) brightness(.92);
  -webkit-mask-image:radial-gradient(closest-side, #000 52%, rgba(0,0,0,.6) 70%, transparent 100%);mask-image:radial-gradient(closest-side, #000 52%, rgba(0,0,0,.6) 70%, transparent 100%)}
.aura-bloom{position:absolute;background-size:122%;background-position:center;mix-blend-mode:screen;filter:blur(18px) saturate(1.35);opacity:.3;
  -webkit-mask-image:radial-gradient(closest-side, #000 52%, transparent 100%);mask-image:radial-gradient(closest-side, #000 52%, transparent 100%)}
.field{position:absolute;left:0;right:0;top:0;mix-blend-mode:screen;filter:blur(36px)}
.kir{position:absolute;left:0;top:0;mix-blend-mode:screen;overflow:visible}
.seed{position:absolute;left:0;top:0;mix-blend-mode:screen}
.dx{position:absolute;background-size:cover;background-position:center;mix-blend-mode:screen;opacity:.7;filter:saturate(1.2);
  -webkit-mask-image:radial-gradient(closest-side, #000 55%, transparent 100%);mask-image:radial-gradient(closest-side, #000 55%, transparent 100%)}
.plasma{position:absolute;left:0;right:0;top:0;mix-blend-mode:soft-light;opacity:.55;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='540' height='540'><filter id='p'><feTurbulence type='turbulence' baseFrequency='.018' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")}
.print{position:absolute;left:36px;right:36px;top:36px;height:740px;border:1.5px solid rgba(239,230,214,.35);border-radius:28px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
.pcap{position:absolute;top:58px;font:400 18px 'Space Mono',monospace;letter-spacing:.24em;text-transform:uppercase;color:rgba(239,230,214,.75)}
.pcap.l{left:66px}.pcap.r{right:66px}
.vig{position:absolute;inset:0;background:radial-gradient(130% 95% at 50% 55%, transparent 55%, rgba(11,6,32,.55) 100%)}
.ntint{position:absolute;inset:0;mix-blend-mode:color;opacity:.6}
.agrain{position:absolute;left:0;right:0;top:0;mix-blend-mode:overlay;opacity:.28;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.neb{position:absolute;inset:-30px;background-size:cover;background-position:center 30%;filter:saturate(1.1) brightness(.8)}
.fade{position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(180deg, ${C.floor}00 0%, ${C.floor}d0 58%, ${C.floor} 100%)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.stack{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;align-items:center;text-align:center}
.stack.left{align-items:flex-start;text-align:left;left:64px;right:64px}
.div{display:flex;align-items:center;gap:20px;width:100%;margin-bottom:26px}
.div i{flex:1;height:2px;background:linear-gradient(90deg, rgba(217,205,240,0), rgba(217,205,240,.75))}
.div i:last-child{background:linear-gradient(270deg, rgba(217,205,240,0), rgba(217,205,240,.75))}
.logo{display:flex;align-items:center;gap:12px}
.word{font-family:'EB Garamond',serif;font-style:italic;font-weight:500;color:${C.bone};letter-spacing:.01em;line-height:1;text-shadow:0 0 24px rgba(239,230,214,.25)}
.mark{font:400 22px 'Space Mono',monospace;letter-spacing:.3em;color:rgba(239,230,214,.85);display:flex;gap:10px;align-items:center;text-transform:lowercase}
.tag{font:400 26px/1 Anton;letter-spacing:.06em;text-transform:uppercase;color:${C.ink};background:linear-gradient(100deg,#f8edff 0%,#fff7ec 38%,#eaf4ff 72%,#ffeff7 100%);box-shadow:0 0 30px rgba(248,237,255,.35);padding:10px 20px 9px;border-radius:999px;margin-bottom:28px}
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
.chrome{position:absolute;top:46px;font:400 20px 'Space Mono',monospace;letter-spacing:.24em;color:rgba(239,230,214,.7);display:flex;gap:8px;align-items:center;z-index:5}
.chrome.l{left:64px}.chrome.r{right:64px;letter-spacing:.12em}
</style></head><body><div class="frame">
${html}
${frame}<div class="grain"></div>
${cover ? '' : `<div class="chrome l">${logo(40, 30)}</div><div class="chrome r">${i + 1}/${total}</div>`}
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
