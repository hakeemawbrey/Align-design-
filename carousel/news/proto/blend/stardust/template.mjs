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

// ---- STARDUST GRADE ---------------------------------------------------------
// Every photo is pulled into Align's world in one SVG filter:
//   1. luminance → a gradient map through the Stardust ramp (void → indigo →
//      violet → lilac → bone → gold-cream), mixed back with the original colour
//      by `keep` so Mars stays warm and the Moon stays lunar;
//   2. its black becomes transparent (alpha from luminance), so the frame and
//      the night side dissolve into the indigo with no edge;
//   3. halation: the highlights bloom in the sign colour (wide) and pale lilac
//      (tight), like the aura art's glow.
// Behind it: an aura field (violet breath + sign bloom), a sparse starfield and
// stardust specks. Grain is the app's.
const RAMP = ['#0b0620', '#26145a', '#6a4cb8', '#b9a3e3', '#efe6d6', '#ffe7ad']
const hex = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16) / 255)
const table = (ch) => RAMP.map((c) => hex(c)[ch].toFixed(3)).join(' ')
// How much of each photo's own colour survives the map (0 = pure Stardust tritone).
const KEEP = { mars: 0.62, venus: 0.5, 'moon-full': 0.3, 'moon-half': 0.3, 'moon-crescent': 0.3, 'moon-earth-shadow': 0.35, 'blood-moon': 0.66, sun: 0.6,
  'eclipse-partial-sun': 0.58, 'eclipse-total-solar': 0.45, 'eclipse-diamond-ring': 0.45, jupiter: 0.55, saturn: 0.55, mercury: 0.35, 'mercury-color': 0.45,
  uranus: 0.55, neptune: 0.6, pluto: 0.5 }
const keepFor = (file) => KEEP[file] ?? 0.42
// The true limb of each disc photo (centre and diameter as fractions of the frame).
// discs.json measures the lit area only, which is wrong for crescents and eclipses.
const LIMB_FIX = { 'moon-crescent': { cx: 0.5, cy: 0.5, r: 0.72 }, 'moon-half': { cx: 0.5, cy: 0.5, r: 0.725 }, 'moon-earth-shadow': { cx: 0.503, cy: 0.499, r: 0.755 },
  'blood-moon': { cx: 0.499, cy: 0.501, r: 0.73 }, 'eclipse-partial-sun': { cx: 0.575, cy: 0.5, r: 0.68, out: 1.12 } }
function limbOf(file) {
  if (LIMB_FIX[file]) return LIMB_FIX[file]
  const m = DISCS[file]
  return m && m.r > 0.6 && m.r < 0.85 && Math.abs(m.cx - 0.5) < 0.03 ? m : null // full, centred discs only
}
// Dark bodies that must stay night-dark rather than dissolve: the moon in front of the sun.
const OCCLUDERS = { 'eclipse-partial-sun': { cx: 0.05, cy: 0.5, r: 0.36 } }
let DEFS = []
const VARIANT = process.env.SG_VARIANT ?? 'D'
// The colour stage: how the Stardust map and the photo's own colour combine.
function mixStage(keep) {
  if (VARIANT === 'A') // linear mix
    return `<feComposite in="map" in2="SourceGraphic" operator="arithmetic" k2="${(1 - keep).toFixed(2)}" k3="${keep.toFixed(2)}" result="mix"/>`
  if (VARIANT === 'B') // soft-light the map over the photo, then a share of the map on top
    return `<feBlend in="map" in2="SourceGraphic" mode="soft-light" result="sl"/>
    <feComposite in="map" in2="sl" operator="arithmetic" k2="${((1 - keep) * 0.45).toFixed(2)}" k3="${(1 - (1 - keep) * 0.45).toFixed(2)}" result="mix"/>`
  // D: split tone. Shadows and low mids take the Stardust map (indigo, violet);
  // highlights keep the photo's own colour, warmed slightly toward gold-cream.
  const a = 1.9 + keep * 1.6 // higher keep → the photo's colour reaches further down
  return `<feColorMatrix in="lum" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${(-a).toFixed(2)} 0 0 0 1" result="wS"/>
    <feComposite in="map" in2="wS" operator="in" result="mS"/>
    <feColorMatrix in="SourceGraphic" type="matrix" values="1.04 .02 0 0 .01 0 1 0 0 0 0 0 .94 0 0 0 0 0 1 0" result="warm"/>
    <feComposite in="warm" in2="wS" operator="out" result="oH"/>
    <feComposite in="mS" in2="oH" operator="arithmetic" k2="1" k3="1" result="mix0"/>
    <feComposite in="map" in2="mix0" operator="arithmetic" k2="${((1 - keep) * 0.3).toFixed(2)}" k3="${(1 - (1 - keep) * 0.3).toFixed(2)}" result="mix"/>`
}
let SEED = 3
let fN = 0
function gradeFilter({ keep, glow, bloom = 1, cut = 0.035, night = true }) {
  const id = 'sg' + fN++
  const k = 1 / 0.16 // alpha ramps from 0 at `cut` luminance to 1 a little above it
  DEFS.push(`<filter id="${id}" x="-45%" y="-45%" width="190%" height="190%" color-interpolation-filters="sRGB">
    <feColorMatrix in="SourceGraphic" type="matrix" values=".2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 .2126 .7152 .0722 0 0 0 0 0 1 0" result="lum"/>
    <feComponentTransfer in="lum" result="map"><feFuncR type="table" tableValues="${table(0)}"/><feFuncG type="table" tableValues="${table(1)}"/><feFuncB type="table" tableValues="${table(2)}"/></feComponentTransfer>
    ${mixStage(keep)}
    <feColorMatrix in="lum" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${k.toFixed(2)} 0 0 0 ${(-cut * k).toFixed(3)}" result="la"/>
    <feComposite in="mix" in2="la" operator="in" result="core"/>
    <feColorMatrix in="lum" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0" result="lumA"/>
    <feComponentTransfer in="lumA" result="hi"><feFuncA type="table" tableValues="0 0 0.05 0.45 1"/></feComponentTransfer>
    <feGaussianBlur in="hi" stdDeviation="10" result="b1"/>
    <feGaussianBlur in="lumA" stdDeviation="46" result="b2"/>
    <feFlood flood-color="#f1e4ff" flood-opacity="${(0.42 * bloom).toFixed(2)}"/><feComposite in2="b1" operator="in" result="g1"/>
    <feFlood flood-color="${glow}" flood-opacity="${(0.62 * bloom).toFixed(2)}"/><feComposite in2="b2" operator="in" result="g2"/>
    <feComponentTransfer in="SourceAlpha" result="solid"><feFuncA type="table" tableValues="0 0 0 0 1"/></feComponentTransfer>
    <feFlood flood-color="#0b0620" flood-opacity="${night ? 0.9 : 0}"/><feComposite in2="solid" operator="in" result="night"/>
    <feMerge result="lit"><feMergeNode in="g2"/><feMergeNode in="night"/><feMergeNode in="core"/></feMerge>
    <feBlend in="g1" in2="lit" mode="screen"/>
  </filter>`)
  return id
}

// Seeded starfield like app/src/components/Starfield.tsx (bone dots, three sizes).
function starfield(seed, h, n = 70) {
  let s = seed
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646
  const dots = []
  for (let i = 0; i < n; i++) {
    const x = r() * 1080, y = r() * h, z = 0.8 + r() * 2.2, o = 0.25 + r() * 0.6
    dots.push(`${x.toFixed(0)}px ${y.toFixed(0)}px 0 ${(z / 2).toFixed(1)}px rgba(239,230,214,${o.toFixed(2)})`)
  }
  return `<div class="stars" style="box-shadow:${dots.join(',')}"></div>`
}
// Stardust: sparse specks in the glow, the stipple the aura art is drawn with.
function stardust(x, y, r, col) {
  const id = 'sd' + fN++
  DEFS.push(`<filter id="${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".62" numOctaves="1" seed="${fN}"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 11 0 0 0 -6.7" result="a"/>
    <feFlood flood-color="${col}"/><feComposite in2="a" operator="in" result="c"/>
    <feFlood flood-color="#fff4e0"/><feComposite in2="a" operator="in"/><feComposite in2="c" operator="arithmetic" k2=".45" k3=".75"/></filter>`)
  return `<div class="dust" style="left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px"><svg width="100%" height="100%"><rect width="100%" height="100%" filter="url(#${id})"/></svg></div>`
}
// The art band (height h): graded photo(s) on an aura field, fading to the floor.
function artBand(art, h, glow, { cy = h * 0.47, d = h * 0.74 } = {}, seed = SEED) {
  const disc = (p, x, y, size, g = glow) => {
    const m = limbOf(p.file)
    const f = gradeFilter({ keep: keepFor(p.file) * (p.dim ? 0.7 : 1), glow: g, bloom: p.dim ? 0.5 : 1, night: !!m })
    const fx = (c) => (p.flip ? 1 - c : c)
    // Feather the mask across the true limb, so the edge melts into the bloom.
    const mask = m ? `radial-gradient(circle at ${fx(m.cx) * 100}% ${m.cy * 100}%, #000 ${(size * m.r / 2 * 0.95).toFixed(0)}px, transparent ${(size * m.r / 2 * (m.out ?? 1.015)).toFixed(0)}px)` : null
    const mk = mask ? `-webkit-mask-image:${mask};mask-image:${mask};` : ''
    const o = OCCLUDERS[p.file]
    const occ = o ? `<div class="occ" style="left:${x - size / 2 + (fx(o.cx) - o.r) * size}px;top:${y - size / 2 + (o.cy - o.r) * size}px;width:${o.r * 2 * size}px;height:${o.r * 2 * size}px"></div>` : ''
    return `${occ}<div class="sg" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;filter:url(#${f})"><div class="ph" style="${mk}background-image:url(${photo(p.file)});${p.flip ? 'transform:scaleX(-1);' : ''}${p.dim ? 'filter:brightness(.62);' : ''}"></div></div>`
  }
  const halo = (x, y, r, col, o) => `<div class="halo" style="left:${x - r}px;top:${y - r}px;width:${r * 2}px;height:${r * 2}px;background:radial-gradient(circle, ${col} 0%, ${col}88 26%, ${col}26 52%, transparent 70%);opacity:${o}"></div>`
  // The aura: a corona that peaks just outside the limb, sign colour easing into violet.
  const aura = (x, y, lr, col, o = 1) => { const R = lr * 1.9
    return `<div class="halo" style="left:${x - R}px;top:${y - R}px;width:${R * 2}px;height:${R * 2}px;filter:blur(40px);opacity:${o};background:radial-gradient(circle closest-side, ${col}00 0%, ${col}00 ${(lr / R * 74).toFixed(0)}%, ${col}80 ${(lr / R * 98).toFixed(0)}%, ${col}2a ${(lr / R * 130).toFixed(0)}%, rgba(122,92,200,.16) 80%, transparent 100%)"></div>` }
  const auraImg = (sign, x, y, size) => `<div class="aura-img" style="left:${x - size / 2}px;top:${y - size / 2}px;width:${size}px;height:${size}px;background-image:url(${imageDataUri(`aura/${sign}.jpg`)})"></div>`
  const side = (a, x, y, size) => a.kind === 'photo' ? disc(a, x, y, size * a.size) : a.kind === 'aura' ? auraImg(a.sign, x, y, size * 1.2) : ''
  let inner = ''
  d *= 1.38
  if (art.kind === 'photo') {
    const size = d * art.size
    const lm = limbOf(art.file) ?? DISCS[art.file] ?? { cx: 0.5, cy: 0.5, r: 0.74 }
    const lr = size * lm.r / 2 // limb radius
    const ax = 540 + ((art.flip ? 1 - lm.cx : lm.cx) - 0.5) * size, ay = cy + (lm.cy - 0.5) * size
    inner = aura(ax, ay, lr, glow) + stardust(ax, ay, lr * 1.55, glow) + disc(art, 540, cy, size)
  } else if (art.kind === 'pair') {
    const size = d * 0.7
    const lr = size * 0.37
    inner = aura(300, cy + 24, lr, glow, 0.7) + aura(780, cy - 24, lr, glow, 0.7) + stardust(540, cy, 560, glow)
      + side(art.a, 290, cy + 24, size) + side(art.b, 790, cy - 24, size)
  } else if (art.kind === 'aura') {
    const col = SIGN_COLORS[art.sign]?.color ?? glow
    inner = halo(540, cy, 560, col, 0.4) + auraImg(art.sign, 540, cy, h * 1.15) + stardust(540, cy, 520, col)
  } else {
    const f = gradeFilter({ keep: keepFor(art.file), glow, bloom: 0.55, cut: 0.06 })
    inner = `<div class="neb" style="filter:url(#${f})"><div class="ph full" style="background-image:url(${photo(art.file)})"></div></div>`
  }
  // The app's splash halo: a wide violet breath behind every subject.
  const violet = `<div class="halo" style="left:${540 - 640}px;top:${cy - 520}px;width:1280px;height:1040px;background:radial-gradient(closest-side, rgba(154,123,224,.34), rgba(91,47,184,.14) 60%, transparent);filter:blur(20px)"></div>`
  return `<div class="band" style="height:${h}px">${starfield(seed * 7 + 3, h)}${violet}${inner}</div>`
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
  DEFS = []; SEED = i + (c.id?.length ?? 0)
  const html = LAYOUTS[layout](s, c, { accent, art, art2, glow, signCol })
  const cover = i === 0

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.floor}}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse 120% 70% at 50% 30%, ${C.canvas} 0%, ${C.floor} 70%);color:${C.bone};-webkit-font-smoothing:antialiased}
.band{position:absolute;left:0;right:0;top:0;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 0%,#000 50%,rgba(0,0,0,.55) 74%,transparent 100%);mask-image:linear-gradient(180deg,#000 0%,#000 50%,rgba(0,0,0,.55) 74%,transparent 100%)}
.occ{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(11,6,32,.94) 82%,rgba(11,6,32,0) 100%)}
.sg{position:absolute}
.ph{position:absolute;inset:0;background-size:cover;background-position:center;
  -webkit-mask-image:radial-gradient(circle closest-side, #000 86%, transparent 100%);mask-image:radial-gradient(circle closest-side, #000 86%, transparent 100%)}
.neb{position:absolute;inset:-40px -40px 0 -40px}
.ph.full{background-position:center 32%;-webkit-mask-image:radial-gradient(ellipse 62% 60% at 50% 46%, #000 40%, transparent 100%);mask-image:radial-gradient(ellipse 62% 60% at 50% 46%, #000 40%, transparent 100%)}
.halo{position:absolute;border-radius:50%;filter:blur(42px);mix-blend-mode:screen}
.stars{position:absolute;left:0;top:0;width:1px;height:1px;border-radius:50%}
.dust{position:absolute;border-radius:50%;opacity:.5;mix-blend-mode:screen;
  -webkit-mask-image:radial-gradient(closest-side, #000 35%, transparent 100%);mask-image:radial-gradient(closest-side, #000 35%, transparent 100%)}
.dust svg{position:absolute;inset:0}
.aura-img{position:absolute;background-size:122%;background-position:center;mix-blend-mode:screen;filter:saturate(1.2) brightness(1.05) blur(1px);
  -webkit-mask-image:radial-gradient(closest-side, #000 52%, transparent 100%);mask-image:radial-gradient(closest-side, #000 52%, transparent 100%)}
.fade{position:absolute;left:0;right:0;bottom:0;height:46%;background:linear-gradient(180deg, ${C.floor}00 0%, ${C.floor}8c 40%, ${C.floor}e0 72%, ${C.floor} 100%)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.5;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.35'/></svg>")}
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
<svg width="0" height="0" style="position:absolute"><defs>${DEFS.join('')}</defs></svg>
${html}
<div class="grain"></div>
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
