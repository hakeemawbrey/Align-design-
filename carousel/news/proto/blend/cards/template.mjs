// ALIGN CARDS: the news slide as a card pulled from the Align app.
//
// Same type system as news/src/template.mjs (Anton caps balanced to the width,
// signs in sign colours, planets and numbers in gold, the divider carrying the
// Align mark). What changes is the art: the NASA photograph is printed on an
// Align card, copied from the app's card components:
//   - radius 22/330 of the width, a thick foil edge 7/330 (the beta's printed
//     trading-card border), indigo face, grain (ProfileCard, CardBack)
//   - foils: sign foil (sign colour rolled through white, 160deg), gold foil,
//     holo conic (#ff6ad5 #ffd36a #7affc4 #6ad5ff #b18cff) for legendary,
//     violet/gold back foil for the card back
//   - "Your card" layout (G-05a): full-bleed image, mono caption on the image,
//     serif-italic name and a sans meta line on a raised indigo panel
//   - the card back: violet field, seed-of-life + chakra column, "Align" in serif italic
// Composition: one big card, tilted in 3D, glowing in the sign colour and
// bleeding off the top; the headline keeps the bottom ~38%. Lists get a fanned
// hand, the last slide is the card back (the reveal).
//
// Markup in text: *word* = accent (auto colour), [[word]] = gold, **b** = bone bold.

import { readFileSync, existsSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const W = 1080
export const H = 1350
const require = createRequire(import.meta.url)
const HERE = path.dirname(fileURLToPath(import.meta.url))
const NEWS = path.resolve(HERE, '../../..')
const CAROUSEL = path.resolve(NEWS, '..')
const { imageDataUri } = await import(path.join(CAROUSEL, 'src/backgrounds.mjs'))
const { SIGN_COLORS, SIGNS } = await import(path.join(CAROUSEL, 'src/schema.mjs'))
const PHOTO = path.join(NEWS, 'assets/photo')
const FONTDIR = path.resolve(CAROUSEL, '../reels/signs/assets/fonts')

const C = { bone: '#efe6d6', mist: '#b3a6c4', gold: '#f2c75c', gilt: '#f2d58a', floor: '#0b0620', canvas: '#150b35', raised: '#1e1240', rub: '#e8628a', spark: '#7fd8b0', violet: '#9a7be0', ink: '#3a2c4e' }
const PLANETS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto']
const SIGN_META = {
  aries: ['♈', 'Fire', 'Ember'], taurus: ['♉', 'Earth', 'Honey'], gemini: ['♊', 'Air', 'Signal'], cancer: ['♋', 'Water', 'Tide'],
  leo: ['♌', 'Fire', 'Goldleaf'], virgo: ['♍', 'Earth', 'Rose Quartz'], libra: ['♎', 'Air', 'Orchid'], scorpio: ['♏', 'Water', 'Garnet'],
  sagittarius: ['♐', 'Fire', 'Amethyst'], capricorn: ['♑', 'Earth', 'Jade'], aquarius: ['♒', 'Air', 'Ion'], pisces: ['♓', 'Water', 'Dusk'],
}
const cap = (s) => String(s ?? '').replace(/\b[a-z]/g, (m) => m.toUpperCase())

// ---- assets -----------------------------------------------------------------
const uriCache = new Map()
function fileUri(file, mime) {
  if (!uriCache.has(file)) uriCache.set(file, `data:${mime};base64,${readFileSync(file).toString('base64')}`)
  return uriCache.get(file)
}
const photo = (name) => fileUri(path.join(PHOTO, `${name}.jpg`), 'image/jpeg')
const DISCS = JSON.parse(readFileSync(path.join(PHOTO, 'discs.json'), 'utf8'))
const aura = (sign) => imageDataUri(`aura/${sign}.jpg`)
// The photo library (news/assets/library/aura): real nebula / airglow photographs
// tagged by sign. Printed softly behind the planet as the card's background art.
const LIBDIR = path.join(NEWS, 'assets/library/aura')
let LIB = null
function libFor(sign, k = 0) {
  if (LIB === null) { try { LIB = JSON.parse(readFileSync(path.join(LIBDIR, 'library.json'), 'utf8')).filter((e) => existsSync(path.join(LIBDIR, e.file))) } catch { LIB = [] } }
  const own = LIB.filter((e) => e.file.startsWith(sign + '-'))
  const list = own.length ? own : LIB.filter((e) => e.signs?.includes(sign))
  if (!list.length) return null
  return fileUri(path.join(LIBDIR, list[k % list.length].file), 'image/jpeg')
}
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
@font-face{font-family:Inter;src:url(${pkgFont('@fontsource/inter', 'inter-latin-500-normal.woff2')}) format('woff2');font-weight:500;font-display:block}
@font-face{font-family:'Space Mono';src:url(${pkgFont('@fontsource/space-mono', 'space-mono-latin-400-normal.woff2')}) format('woff2');font-display:block}`
  return FONTS
}

// ---- text -------------------------------------------------------------------
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// One accent colour on all text: Align gold. (Signs and planets used to get their own colours.)
function accentFor(phrase, fallback) {
  return C.gold
  const p = phrase.toLowerCase()
  const sign = SIGNS.find((s) => p.includes(s))
  if (sign) return SIGN_COLORS[sign].color
  if (PLANETS.some((x) => new RegExp(`\\b${x}`).test(p)) || /\d/.test(p) || /eclipse|full moon|new moon/.test(p)) return C.gold
  return fallback
}
const glueNums = (t) => String(t ?? '').replace(/(\d[\d:,]*(?:st|nd|rd|th)?)\s+(am|pm|days?|signs?|dates?|hours?|weeks?|years?|planets?|things?|events?|°)\b/gi, '$1 $2')
const rich = (s, fallback) => esc(glueNums(s))
  .replace(/\[\[(.+?)\]\]/g, (_, t) => `<span class="ac" style="color:${C.gold}">${t}</span>`)
  .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
  .replace(/\*(.+?)\*/g, (_, t) => `<span class="ac" style="color:${accentFor(t, fallback)}">${t}</span>`)
  .replace(/\n/g, ' ')
const PROPER = [...SIGNS, ...PLANETS.filter((p) => p !== 'sun' && p !== 'moon'), 'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'jan', 'feb', 'dec', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'christmas', 'ophiuchus', 'earth', 'nasa']
function sentence(s) {
  let t = String(s ?? '')
  t = t.replace(/(^|[.?:]\s+)([a-z])/g, (_, a, b) => a + b.toUpperCase())
  t = t.replace(/\bi\b/g, 'I').replace(/\bi'(m|ll|ve|d)\b/g, "I'$1")
  t = t.replace(new RegExp(`\\b(${PROPER.join('|')})\\b`, 'g'), (w) => w[0].toUpperCase() + w.slice(1))
  t = t.replace(/\bvalentine/g, 'Valentine').replace(/\bet\b/g, 'ET').replace(/\butc\b/g, 'UTC')
  return t
}

// ---- art resolution (as production) -----------------------------------------
const SIGN_NEBULA = {
  aries: 'aurora-red', leo: 'nebula-gold', sagittarius: 'nebula-violet', taurus: 'nebula-cosmic-cliffs', virgo: 'aurora-pink', capricorn: 'aurora-green',
  gemini: 'nebula-gold', libra: 'aurora-pink', aquarius: 'nebula-blue', cancer: 'nebula-blue', scorpio: 'aurora-red', pisces: 'nebula-violet',
}
const planetPhoto = (body) => (body === 'moon' ? { kind: 'photo', file: 'moon-full', size: 1, body } : { kind: 'photo', file: body, size: body === 'saturn' ? 1.45 : 1, body })
function eclipseArt(type, penumbral) {
  if (type === 'lunar') return penumbral ? { kind: 'photo', file: 'moon-full', size: 1, dim: true, body: 'eclipse' } : { kind: 'photo', file: 'blood-moon', size: 1, body: 'eclipse' }
  return { kind: 'photo', file: 'eclipse-total-solar', size: 1, body: 'eclipse', k: 0.6, moon: true, filter: 'sepia(1) saturate(4.5) hue-rotate(-12deg) brightness(1.25) contrast(1.1)' }
}
function subjectFromPost(c, s) { return subjectFromText(s.headline ?? '') ?? subjectFromText((c.facts ?? []).join(' ')) }
function subjectFromText(raw) {
  const text = raw.toLowerCase()
  if (/season/.test(text) && !/eclipse/.test(text)) return planetPhoto('sun')
  if (/eclipse/.test(text)) return eclipseArt(/lunar|blood|penumbral/.test(text) ? 'lunar' : 'solar', /penumbral|2027-02-20/.test(text))
  if (/full moon/.test(text)) return planetPhoto('moon')
  if (/new moon/.test(text)) return { kind: 'photo', file: 'moon-crescent', size: 1, body: 'new moon' }
  const pl = ['venus', 'mars', 'mercury', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'sun'].find((p) => new RegExp(`\\b${p}\\b`).test(text))
  return pl ? planetPhoto(pl) : null
}
function resolveArt(a, s, c) {
  const sign = s.sign ?? c.signs?.[0]
  const nebula = (k) => ({ kind: 'nebula', file: SIGN_NEBULA[k] ?? 'nebula-violet' })
  if (!a) return s.layout === 'rank' && s.sign ? { kind: 'aura', sign: s.sign } : subjectFromPost(c, s) ?? nebula(sign)
  switch (a.kind) {
    case 'planet': return { ...planetPhoto(a.body), rx: a.rx, sign: a.sign }
    case 'moon': {
      const p = a.phase ?? 0.5
      if (Math.abs(p - 0.5) < 0.12) return { ...planetPhoto('moon'), body: 'full moon', sign: a.sign }
      const half = Math.abs(p - 0.25) < 0.13 || Math.abs(p - 0.75) < 0.13
      return { kind: 'photo', file: half ? 'moon-half' : 'moon-crescent', size: 1, flip: p > 0.5, body: p < 0.06 || p > 0.94 ? 'new moon' : 'moon', sign: a.sign }
    }
    case 'eclipse': return { ...eclipseArt(a.type === 'solar' ? 'solar' : 'lunar', a.type === 'penumbral'), sign: a.sign, etype: a.type }
    case 'pair': return { kind: 'pair', a: planetPhoto(a.a), b: planetPhoto(a.b) }
    case 'figure': case 'aura': return { kind: 'aura', sign: a.sign ?? sign }
    default: return subjectFromPost(c, s) ?? nebula(a.tint ?? sign)
  }
}

// ---- the Align mark ---------------------------------------------------------
const CHAKRAS = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
let markN = 0
function alignMark(size, { stroke = 0.6, sw = 0.7, glow = 1 } = {}) {
  const id = 'am' + markN++
  const R = 20, petals = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...petals.map(([x, y]) => `<circle cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="${R}"/>`), `<circle cx="0" cy="0" r="${R * 2}"/>`].join('')
  const defs = CHAKRAS.map((c, i) => `<radialGradient id="${id}g${i}"><stop offset="0" stop-color="${c}" stop-opacity="${0.9 * glow}"/><stop offset=".45" stop-color="${c}" stop-opacity="${0.35 * glow}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="${id}c${i}" cx="42%" cy="38%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${c}"/><stop offset="1" stop-color="${c}"/></radialGradient>`).join('')
  const dots = CHAKRAS.map((_, i) => { const cy = 3 * 10.6 - i * 10.6; return `<circle cx="0" cy="${cy}" r="11" fill="url(#${id}g${i})"/><circle cx="0" cy="${cy}" r="3.7" fill="url(#${id}c${i})"/>` }).join('')
  return `<svg width="${size}" height="${size}" viewBox="-44 -44 88 88" style="overflow:visible;display:block"><defs>${defs}</defs><g fill="none" stroke="#d9cdf0" stroke-opacity="${stroke}" stroke-width="${sw}">${circles}</g>${dots}</svg>`
}
const logo = (size, word) => `<span class="logo">${alignMark(size)}<span class="word" style="font-size:${word}px">Align</span></span>`

// ---- cards ------------------------------------------------------------------
const FOIL = {
  sign: (sg) => { const k = SIGN_COLORS[sg] ?? { color: C.violet, light: '#dcbcff' }; return `linear-gradient(160deg, ${k.color} 0%, ${k.light} 22%, #ffffff 42%, ${k.light} 58%, ${k.color} 78%, ${k.light} 100%)` },
  gold: () => 'linear-gradient(160deg, #a9802e 0%, #f2c75c 22%, #fff4cf 44%, #f2c75c 62%, #b88a2c 82%, #f2d784 100%)',
  holo: () => 'conic-gradient(from 210deg at 50% 50%, #ff6ad5, #ffd36a, #7affc4, #6ad5ff, #b18cff, #ff6ad5)',
  back: () => 'linear-gradient(160deg, #c8b4ff 0%, #6b4bd0 30%, #f2d784 52%, #6b4bd0 72%, #c8b4ff 100%)',
}
const HOLO_WASH = 'conic-gradient(from 210deg at 40% 40%, #ff6ad5, #ffd36a, #7affc4, #6ad5ff, #b18cff, #ff6ad5)'

// One card. (cx, top) place its top centre before the transform; tilt rotates
// round its centre in 3D. glow is the sign colour of the halo it casts.
function card({ w, ratio = 1.6, cx = 540, top, rot = 0, ry = 0, rx = 0, foil, glow, face, z = 2, origin = '50% 50%', holo = false, dim = 1, cls = '' }) {
  const h = w * ratio, R = w * 22 / 330, e = Math.max(5, w * 7 / 330)
  const shadow = glow
    ? `0 0 ${w * 0.05}px ${glow}cc, 0 0 ${w * 0.18}px ${glow}66, 0 0 ${w * 0.42}px ${glow}2e, 0 ${w * 0.06}px ${w * 0.14}px rgba(5,2,15,.7)`
    : `0 ${w * 0.05}px ${w * 0.12}px rgba(5,2,15,.75)`
  return `<div class="card${holo ? ' holo' : ''} ${cls}" style="left:${cx - w / 2}px;top:${top}px;width:${w}px;height:${h}px;border-radius:${R}px;padding:${e}px;background:${foil};box-shadow:${shadow};z-index:${z};transform-origin:${origin};transform:perspective(2400px) rotateX(${rx}deg) rotateY(${ry}deg) rotate(${rot}deg);${dim < 1 ? `filter:brightness(${dim});` : ''}">
    <div class="face" style="border-radius:${R - e}px">${face({ w: w - 2 * e, h: h - 2 * e, s: w / 330 })}<div class="gloss"></div></div></div>`
}

// The planet photo, measured so its disc is `D` wide at (x, y) in the face.
function disc(p, x, y, D, faceBg, wFace) {
  const m0 = DISCS[p.file] ?? { r: 0.72, cx: 0.5, cy: 0.5 }
  // a centred disc is sized by its limb; anything else (crescents, partial suns,
  // rings) fits its whole frame to the card so nothing gets cropped
  const centred = p.file !== 'saturn' && Math.abs(m0.cx - 0.5) < 0.03 && Math.abs(m0.cy - 0.5) < 0.03 && m0.r < 0.85
  const m = centred ? m0 : { ...m0, cx: 0.5, cy: 0.5 }
  const F = centred ? D / m.r : (wFace ?? D) * (p.fit ?? 1.12)
  const block = p.moon ? `<div class="block" style="left:${x - D / 2 * 0.97}px;top:${y - D / 2 * 0.97}px;width:${D * 0.97}px;height:${D * 0.97}px;background:#05030c;z-index:1"></div>` : m.r > 0.6 && m.r < 0.85 && Math.abs(m.cx - 0.5) < 0.03 ? `<div class="block" style="left:${x - D / 2 * 0.985}px;top:${y - D / 2 * 0.985}px;width:${D * 0.985}px;height:${D * 0.985}px;background:${faceBg}"></div>` : ''
  return block + `<div class="ph" style="left:${x - F * m.cx}px;top:${y - F * m.cy}px;width:${F}px;height:${F}px;background-image:url(${photo(p.file)});${p.flip ? 'transform:scaleX(-1);' : ''}${p.filter ? `filter:${p.filter};` : p.dim ? 'filter:brightness(.6) saturate(.8);' : ''}"></div>`
}

const FACE_BG = '#110a28'
const mono = (t, s, st = '') => `<div class="mono" style="font-size:${Math.max(13, 8.5 * s)}px;${st}">${t}</div>`
const chip = (t, s) => `<div class="chip" style="font-size:${Math.max(14, 9 * s)}px;padding:${3.5 * s}px ${10 * s}px">${t}</div>`

// Sky card (full art): the photograph on a deep indigo face with a sign
// bloom, a mono caption on the image, then the raised name panel (G-05a).
function skyFace(art, { name, meta, caption, chipText, glow, orb, panel = true, discK = 0.9, discY = 0.5, libK = 0 }) {
  return ({ w, h, s }) => {
    const ph = panel ? h * PANEL : h
    let img = ''
    const lib = art.kind === 'photo' && art.sign ? libFor(art.sign, libK) : null
    if (art.kind === 'photo') img = (lib ? `<div class="libart" style="background-image:url(${lib})"></div>` : '') + disc(art, w / 2, ph * discY, w * discK, FACE_BG, w)
    else if (art.kind === 'nebula' && (DISCS[art.file]?.r ?? 1) < 0.7) img = disc({ file: art.file, fit: 1.25 }, w / 2, ph * discY, w, FACE_BG, w)
    else if (art.kind === 'nebula') img = `<div class="neb" style="background-image:url(${photo(art.file)})"></div>`
    else if (art.kind === 'aura') img = `<div class="aurafill" style="background-image:url(${aura(art.sign)})"></div>`
    const bloom = `radial-gradient(70% 45% at 50% ${discY * 100}%, ${glow}55 0%, ${glow}18 45%, transparent 75%)`
    return `<div class="img" style="height:${ph}px;background:${bloom}, linear-gradient(180deg, #1c0e44, ${FACE_BG})">${STARS}${img}
      <div class="ivig"></div>
      ${caption ? mono(caption, s, `position:absolute;left:${14 * s}px;bottom:${11 * s}px;color:rgba(239,230,214,.85)`) : ''}
      ${chipText ? `<div style="position:absolute;${caption ? 'right' : 'left'}:${12 * s}px;bottom:${10 * s}px">${chip(chipText, s)}</div>` : ''}
    </div>
    ${panel ? namePanel({ name, meta, orb, s, ph }) : ''}`
  }
}
const PANEL = 0.85
function namePanel({ name, meta, orb, s, ph }) {
  return `<div class="panel" style="top:${ph}px;padding:0 ${16 * s}px">
      <div><div class="nm" style="font-size:${27 * s}px">${esc(name)}</div>
      ${meta ? `<div class="meta" style="font-size:${10 * s}px;margin-top:${3 * s}px">${meta}</div>` : ''}</div>
      ${orb ? signOrb(orb, 30 * s) : ''}
    </div>`
}
function signOrb(sg, d) {
  const k = SIGN_COLORS[sg]
  return `<div class="orb" style="width:${d}px;height:${d}px;font-size:${d * 0.56}px;background:radial-gradient(circle at 35% 30%, ${k.light}, ${k.color} 60%, ${k.dark});box-shadow:0 0 ${d * 0.45}px ${k.color}">${SIGN_META[sg][0]}&#xFE0E;</div>`
}

// Aura card: the sign's AuraCam silhouette full-bleed, the profile-card look.
function auraFace(sign, { name, meta, caption, panel = true }) {
  return ({ w, h, s }) => {
    const ph = panel ? h * PANEL : h
    return `<div class="img" style="height:${ph}px;background:#07040f"><div class="aurafill" style="background-image:url(${aura(sign)});filter:blur(${(w / 200).toFixed(1)}px) saturate(1.15)"></div><div class="ivig"></div>
      ${caption ? mono(caption, s, `position:absolute;left:${14 * s}px;bottom:${11 * s}px;color:rgba(239,230,214,.88)`) : ''}</div>
    ${panel ? namePanel({ name, meta, orb: sign, s, ph }) : ''}`
  }
}

// The Align card back (beta CardBack): violet field, the mark, the wordmark.
const backFace = ({ w, h }) => `<div class="back"></div>
  <div style="position:absolute;left:50%;top:44%;transform:translate(-50%,-50%)">${alignMark(w * 0.72, { stroke: 0.34, sw: 0.5, glow: 0.75 })}</div>
  <div class="bword" style="top:74%;font-size:${Math.max(13, w * 0.13)}px">Align</div>`

const STARS = `<div class="stars"></div>`

// ---- slide pieces -----------------------------------------------------------
const divider = () => `<div class="div"><i></i>${logo(58, 40)}<i></i></div>`
const tag = (t) => `<div class="tag">${esc(t)}</div>`
const head = (text, accent, { maxh, maxfs = 150, minfs = 64, target = 940, cls = '' } = {}) =>
  `<div class="hd ${cls}" data-maxh="${maxh}" data-maxfs="${maxfs}" data-minfs="${minfs}" data-target="${target}">${rich(text, accent)}</div>`
const body = (t, accent, cls = '') => (t ? `<p class="bd ${cls}">${rich(sentence(t), accent)}</p>` : '')
const deck = (t, accent) => (t ? `<p class="deck">${rich(t, accent)}</p>` : '')
const VERDICT = { true: ['true.', C.gold], misleading: ['half true.', C.gold], false: ['not true.', C.gold], context: ['needs context.', C.gold] }

// a wide aura bloom behind the cards: "less sharp, more aura"
const bloom = (col, cy = 420, r = 620, o = 0.55) => `<div class="bloom" style="left:${540 - r}px;top:${cy - r * 0.8}px;width:${r * 2}px;height:${r * 1.6}px;background:radial-gradient(closest-side, ${col} 0%, ${col}66 38%, ${col}1a 70%, transparent);opacity:${o}"></div>`
const violetHalo = (cy = 420) => `<div class="bloom" style="left:-100px;top:${cy - 560}px;width:1280px;height:1120px;background:radial-gradient(closest-side, rgba(154,123,224,.40), rgba(91,47,184,.14) 60%, transparent)"></div>`

// Name + meta for the card printed with this art.
function cardText(art, x) {
  const sg = art.sign ?? x.sign
  const sgName = sg ? cap(sg) : ''
  const el = sg ? SIGN_META[sg]?.[1] : ''
  if (art.kind === 'aura') return { name: cap(art.sign), meta: `${SIGN_META[art.sign][1]} · Aura ${SIGN_META[art.sign][2]}`, caption: `AURA · ${SIGN_META[art.sign][2].toUpperCase()}` }
  if (art.kind === 'nebula') return { name: x.cardName ?? 'Tonight’s sky', meta: 'Seen from Earth', caption: x.serial }
  const b = art.body ?? art.file
  const name = b === 'eclipse' ? (art.etype === 'annular' || art.etype === 'solar' ? 'Solar eclipse' : 'Lunar eclipse') : cap(b)
  const meta = [sgName && `in ${sgName}`, art.rx && 'Retrograde', !art.rx && el].filter(Boolean).join(' · ') || 'Seen from Earth'
  return { name, meta, caption: x.serial, orb: sg && SIGN_COLORS[sg] ? sg : null }
}
// rarity → foil: eclipses and full moons are legendary (holo), other covers gold, the rest sign foil
function foilFor(art, x, cover) {
  if (cover && (art.body === 'eclipse' || art.body === 'full moon')) return { foil: FOIL.holo(), holo: true }
  if (cover) return { foil: FOIL.gold() }
  return { foil: FOIL.sign(art.sign ?? x.sign) }
}
function faceFor(art, x, opts = {}) {
  const t = cardText(art, x)
  if (art.kind === 'aura') return auraFace(art.sign, { ...t, ...opts })
  return skyFace(art, { ...t, glow: x.glow, libK: x.i ?? 0, ...opts })
}

// The hero card (covers and story slides): big, tilted, bleeding off the top.
function heroScene(art, x, { w = 640, cx = 540, bottom = 800, rot = -4, ry = 7, cover = false, chipText, panel = true } = {}) {
  const h = w * 1.6, top = bottom - h
  const f = foilFor(art, x, cover)
  const back = cover ? card({ w: w * 0.96, cx: 540 - w * 0.06, top: top + 24, rot: rot - 7, foil: FOIL.back(), face: backFace, z: 1, dim: 0.55 })
    + card({ w: w * 0.96, cx: 540 + w * 0.08, top: top + 10, rot: rot + 8, foil: FOIL.back(), face: backFace, z: 1, dim: 0.7 }) : ''
  const glowCol = art.kind === 'aura' ? SIGN_COLORS[art.sign]?.color ?? x.glow : x.glow
  // centre the subject in the part of the image that is on screen
  const ph = h * 0.8, hid = Math.max(0, -top - 30)
  const discY = Math.min(0.68, Math.max(0.5, (hid + ph) / 2 / ph + 0.02))
  return `<div class="scene" data-bottom="${bottom}">${violetHalo(bottom - 380)}${bloom(glowCol, bottom - 380, 640, 0.5)}${back}
    ${card({ w, cx, top, rot, ry, glow: glowCol, ...f, cls: 'lead', face: faceFor(art, x, { chipText, discY, discK: art.k ?? (cover ? 0.93 : 0.9), panel, ...(cover ? { caption: null } : {}) }) })}</div>`
}

// Two cards leaning together (split covers, pair art).
function pairScene(a, b, x, { w = 470, bottom = 800 } = {}) {
  const h = w * 1.6, top = bottom - h
  const col = (q) => SIGN_COLORS[q.sign]?.color ?? x.glow
  const xa = { ...x, glow: col(a) }, xb = { ...x, glow: col(b) }
  return `<div class="scene" data-bottom="${bottom}">${violetHalo(bottom - 380)}${bloom(col(a), bottom - 420, 520, 0.35)}${bloom(col(b), bottom - 340, 520, 0.3)}
    ${card({ w, cx: 540 - w * 0.36, top: top + 10, rot: -8, ry: 8, glow: col(a), foil: FOIL.sign(a.sign ?? x.sign), face: faceFor(a, xa, { discK: 0.98 }), z: 2 })}
    ${card({ w, cx: 540 + w * 0.36, top: top - 30, rot: 7, ry: -8, glow: col(b), foil: FOIL.sign(b.sign ?? x.sign), face: faceFor(b, xb, { discK: 0.98 }), z: 3 })}</div>`
}

// A fanned hand: cards on an arc round a pivot far below the frame.
function fanScene(cards, x, { w = 270, top = 40, spread = 13, pivot = 2.4, glowCol } = {}) {
  const n = cards.length
  const h = w * 1.6
  return `<div class="scene" data-bottom="${top + h}">${violetHalo(top + h * 0.55)}${bloom(glowCol ?? x.glow, top + h * 0.55, 600, 0.4)}
    ${cards.map((cd, k) => {
      const a = (k - (n - 1) / 2) * spread
      return card({ w, cx: 540, top, rot: a, origin: `50% ${pivot * 100}%`, ...cd, z: cd.z ?? 2 + k })
    }).join('')}</div>`
}
const auraCard = (sg, name, opts = {}) => ({ glow: SIGN_COLORS[sg]?.color, foil: FOIL.sign(sg), face: auraFace(sg, { name: name ?? cap(sg), meta: '', caption: null, ...opts }) })
const backCard = () => ({ foil: FOIL.back(), face: backFace })

// ---- layouts ----------------------------------------------------------------
function coverLike(s, c, x, chipText) {
  let scene
  if (s.layout === 'split' && x.art2 && x.art.kind === 'photo' && x.art2.kind === 'photo') scene = pairScene(x.art, x.art2, x, { w: 470, bottom: 790 })
  else if (x.art.kind === 'aura' && x.cover) {
    // a ranked cover: the whole hand, #1 in the middle on gold
    const order = [...new Set([...(c.signs ?? []), ...SIGNS])]
    const hand = [order[3], order[1], order[0], order[2], order[4]]
    scene = fanScene(hand.map((sg, k) => k === 2 ? { ...auraCard(sg, null, { caption: `#1 · AURA ${SIGN_META[sg][2].toUpperCase()}`, panel: false }), foil: FOIL.gold(), z: 20, cls: 'lead' } : { ...auraCard(sg, null, { panel: false }), z: 10 - Math.abs(k - 2) * 2 + (k > 2 ? 1 : 0), dim: 0.8 }), x, { w: 370, top: 60, spread: 9.5, pivot: 3.2, glowCol: SIGN_COLORS[order[0]].color })
  } else scene = heroScene(x.art, x, { w: 640, bottom: 800, cover: true, chipText: chipText ? `✦ ${esc(chipText).toUpperCase()}` : null })
  return `${scene}
  <div class="stack" style="bottom:84px">
    ${divider()}
    ${head(s.headline, x.accent, { maxh: s.dek || (s.layout === 'callout' && s.body) ? 300 : 380, maxfs: 150 })}
    ${deck(s.dek ?? (s.layout === 'callout' ? s.body : ''), x.accent)}
  </div>`
}

const LAYOUTS = {
  cover: (s, c, x) => coverLike(s, c, x),
  hero: (s, c, x) => coverLike(s, c, x),
  callout: (s, c, x) => coverLike(s, c, x),
  split: (s, c, x) => coverLike(s, c, x),
  breaking: (s, c, x) => coverLike(s, c, x, s.word ?? 'breaking'),
  story: (s, c, x) => `
    ${x.art.kind === 'pair' ? pairScene(x.art.a, x.art.b, x, { w: 400, bottom: 700 }) : heroScene(x.art, x, { w: 520, bottom: 690, rot: x.i % 2 ? 4 : -4, ry: x.i % 2 ? -7 : 7 })}
    <div class="stack" style="bottom:92px">
      ${s.kicker ? tag(s.kicker) : divider()}
      ${head(s.headline, x.accent, { maxh: s.body ? 250 : 340, maxfs: 120, minfs: 56 })}
      ${body(s.body, x.accent)}
    </div>`,
  rank: (s, c, x) => `
    ${heroScene({ kind: 'aura', sign: s.sign }, x, { w: 600, cx: 600, bottom: 600, rot: s.rank % 2 ? 6 : -5, ry: s.rank % 2 ? -8 : 8, panel: false })}
    <div class="stack left" style="bottom:96px">
      <div class="rank">#${esc(s.rank)}</div>
      <div class="sign" style="color:${C.gold}" data-fitw="952">${esc(s.title ?? s.sign)}</div>
      ${head(s.headline, x.accent, { maxh: 180, maxfs: 84, minfs: 44, target: 952, cls: 'left bebas' })}
      ${body(s.body, x.accent, 'left')}
    </div>`,
  note: (s, c, x) => `
    ${heroScene(x.art, x, { w: 420, bottom: 520, rot: -4 })}
    <div class="stack" style="bottom:92px">
      ${tag(s.kicker && !/^(going around|viral claim)$/i.test(s.kicker) ? s.kicker : 'claim check')}
      ${head(s.headline, x.accent, { maxh: 290, maxfs: 104, minfs: 54 })}
      <div class="verdict" style="color:${(VERDICT[s.verdict] ?? VERDICT.context)[1]}">${(VERDICT[s.verdict] ?? VERDICT.context)[0]}</div>
      ${body(s.body, x.accent)}
    </div>`,
  list: (s, c, x) => listLike(s, c, x, false),
  table: (s, c, x) => listLike(s, c, x, true),
  // the reveal: the Align card back, face down, glowing
  end: (s, c, x) => `
    <div class="scene" data-bottom="760">${violetHalo(420)}${bloom(x.glow, 420, 600, 0.35)}
      ${card({ w: 520, top: 760 - 832, rot: 5, ry: -8, glow: '#9a7be0', foil: FOIL.back(), face: backFace })}</div>
    <div class="stack" style="bottom:100px">
      ${head(s.headline, x.accent, { maxh: s.body ? 290 : 370, maxfs: 130 })}
      ${s.body ? `<p class="deck">${rich(s.body, x.accent)}</p>` : ''}
    </div>`,
}
function rowColor(r) {
  return C.gold
  const sign = r.sign ?? SIGNS.find((g) => (r.label ?? '').toLowerCase() === g)
  if (sign) return SIGN_COLORS[sign].color
  if (r.color === 'spark') return C.spark
  if (r.color === 'rub') return C.rub
  return PLANETS.includes(r.color) ? C.gold : SIGN_COLORS[r.color]?.color ?? C.gold
}
// The face-up card in a hand of backs: the post's planets in turn, so two
// list slides in one carousel don't deal the same card.
function listSubject(c, x) {
  const seen = []
  for (const sl of c.slides) for (const a of [sl.art, sl.art2]) {
    if (!a) continue
    for (const b of a.kind === 'planet' ? [a.body] : a.kind === 'pair' ? [a.a, a.b] : []) if (!seen.some((q) => q.b === b)) seen.push({ b, sign: a.sign, rx: a.rx })
  }
  const k = c.slides.slice(0, x.i).filter((sl) => sl.layout === 'list' || sl.layout === 'table').length
  if (!seen.length) return x.art.kind === 'photo' || x.art.kind === 'nebula' ? x.art : { kind: 'nebula', file: 'nebula-violet' }
  const q = seen[k % seen.length]
  return { ...planetPhoto(q.b), sign: q.sign ?? x.sign, rx: q.rx }
}
function listLike(s, c, x, numbered) {
  const rows = s.rows ?? []
  const signed = rows.map((r) => r.sign ?? (SIGNS.includes(r.color) ? r.color : SIGNS.find((g) => (r.label ?? '').toLowerCase() === g))).filter(Boolean)
  const hand = signed.length >= 2
    ? rows.map((r) => { const sg = r.sign ?? (SIGNS.includes(r.color) ? r.color : SIGNS.find((g) => (r.label ?? '').toLowerCase() === g)); return auraCard(sg, cap(r.label), { panel: false, caption: r.label.toUpperCase() }) })
    : [backCard(), { glow: x.glow, z: 9, foil: FOIL.sign(x.sign), face: faceFor(listSubject(c, x), x, {}) }, backCard()]
  const html = rows.map((r, k) => `<div class="row">${numbered ? `<span class="num">${esc(r.rank ?? k + 1)}</span>` : ''}<span class="nm" style="color:${rowColor(r)}">${esc(r.label)}</span><span class="tx">${rich(sentence(r.text ?? ''), x.accent)}${r.value ? ` <em>· ${esc(r.value)}</em>` : ''}</span></div>`).join('')
  return `
    ${fanScene(hand, x, { w: hand.length > 3 ? 290 : 320, top: hand.length > 3 ? 20 : 0, spread: hand.length > 3 ? 13 : 15, pivot: 2.3 })}
    <div class="stack" style="bottom:92px" data-rowsmin="560">
      ${s.kicker ? tag(s.kicker) : divider()}
      ${s.headline ? head(s.headline, x.accent, { maxh: 200, maxfs: 116, minfs: 56 }) : ''}
      <div class="rows ${numbered ? 'numbered' : ''}">${html}</div>
    </div>`
}
export const LAYOUT_NAMES = Object.keys(LAYOUTS)

function serialFor(c) {
  const d = new Date((c.date ?? '2026-01-01') + 'T00:00:00Z')
  const doy = Math.floor((d - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5)
  return `ALIGN SKY · № ${String(doy).padStart(3, '0')}/365`
}

export function slideHtml(c, i) {
  const s = c.slides[i]
  const total = c.slides.length
  const layout = LAYOUTS[s.layout] ? s.layout : 'story'
  const sign = s.sign ?? c.signs?.[0]
  const signCol = SIGN_COLORS[s.sign ?? sign]?.color ?? C.violet
  const accent = s.accent === 'gold' ? C.gold : SIGN_COLORS[s.accent]?.color ?? signCol
  let art = resolveArt(s.art, s, c)
  if (i === 0 && art.kind === 'aura') { const named = subjectFromText(s.headline ?? ''); if (named) art = named }
  // nebula cards: inner slides draw a different print so the carousel doesn't repeat itself
  const NEBS = ['nebula-violet', 'nebula-gold', 'nebula-blue', 'nebula-cosmic-cliffs']
  if (art.kind === 'nebula' && i > 0) art = { ...art, file: NEBS[(NEBS.indexOf(art.file) + i) % NEBS.length] }
  const acc = [...String(s.headline ?? '').matchAll(/\*([^*]+)\*/g)].map((m) => m[1]).find((t) => !/\d|sky|sign/.test(t) && !SIGNS.includes(t.toLowerCase()))
  if (art.kind === 'photo' && !art.sign) art.sign = sign
  const glow = art.kind === 'aura' ? SIGN_COLORS[art.sign]?.color ?? signCol : signCol
  let art2 = s.art2 ? resolveArt(s.art2, s, c) : null
  if (i === 0 && art2?.kind === 'aura' && art.kind !== 'aura') art2 = null
  const cover = i === 0
  const html = LAYOUTS[layout](s, c, { accent, art, art2, glow, signCol, sign, cover, i, serial: serialFor(c), cardName: acc ? cap(acc) : null })

  return `<!doctype html><html><head><meta charset="utf-8"><style>
${fonts()}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;background:${C.floor}}
.frame{position:relative;width:${W}px;height:${H}px;overflow:hidden;background:radial-gradient(ellipse 120% 70% at 50% 30%, ${C.canvas} 0%, ${C.floor} 70%);color:${C.bone};-webkit-font-smoothing:antialiased}
.scene{position:absolute;inset:0}
.bloom{position:absolute;border-radius:50%;filter:blur(40px);mix-blend-mode:screen;pointer-events:none}
.card{position:absolute;box-sizing:border-box}
.card.holo::after{content:'';position:absolute;inset:0;border-radius:inherit;background:linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 46%, transparent 60%);mix-blend-mode:overlay;pointer-events:none}
.face{position:relative;width:100%;height:100%;overflow:hidden;background:linear-gradient(180deg,#160e28 0%,#100a1d 55%,#0e0919 100%)}
.gloss{position:absolute;inset:0;pointer-events:none;background:linear-gradient(118deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 62%, rgba(255,255,255,.06) 78%, rgba(255,255,255,0) 90%)}
.img{position:absolute;left:0;right:0;top:0;overflow:hidden}
.ivig{position:absolute;inset:0;background:radial-gradient(90% 90% at 50% 45%, transparent 60%, rgba(7,4,15,.55) 100%);pointer-events:none}
.stars{position:absolute;inset:0;opacity:.8;background:radial-gradient(1.4px 1.4px at 18% 22%, #fff9 50%, transparent 51%), radial-gradient(1.4px 1.4px at 72% 14%, #fff7 50%, transparent 51%), radial-gradient(1.8px 1.8px at 84% 58%, #fff8 50%, transparent 51%), radial-gradient(1.4px 1.4px at 12% 70%, #fff6 50%, transparent 51%), radial-gradient(1.4px 1.4px at 46% 88%, #fff5 50%, transparent 51%), radial-gradient(1.4px 1.4px at 92% 86%, #fff6 50%, transparent 51%), radial-gradient(1.2px 1.2px at 32% 8%, #fff6 50%, transparent 51%), radial-gradient(1.2px 1.2px at 60% 40%, #fff4 50%, transparent 51%)}
.ph{position:absolute;background-size:cover;background-position:center;mix-blend-mode:lighten;
  -webkit-mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%);mask-image:radial-gradient(circle closest-side, #000 88%, transparent 100%)}
.block{position:absolute;border-radius:50%}
.neb{position:absolute;inset:-4%;background-size:cover;background-position:center;filter:saturate(1.15) brightness(.9)}
.libart{position:absolute;inset:-3%;background-size:cover;background-position:center;opacity:.42;filter:blur(2.5px) saturate(1.1);-webkit-mask-image:radial-gradient(120% 90% at 50% 45%, #000 40%, transparent 100%)}
.aurafill{position:absolute;inset:-6%;background-size:cover;background-position:center 35%;filter:blur(1.6px) saturate(1.12)}
.panel{position:absolute;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:space-between;background:linear-gradient(180deg,#24164c,#1a1040);border-top:1px solid rgba(179,166,196,.18)}
.orb{border-radius:50%;display:grid;place-items:center;color:#fff;font-family:'DejaVu Sans',sans-serif;flex-shrink:0;text-shadow:0 0 6px rgba(0,0,0,.35)}
.nm{font-family:'EB Garamond',serif;font-style:italic;font-weight:500;color:${C.bone};line-height:1.05;white-space:nowrap}
.meta{font-family:Inter,sans-serif;font-weight:500;color:${C.mist};white-space:nowrap}
.mono{font-family:'Space Mono',monospace;letter-spacing:.16em;text-transform:uppercase;text-shadow:0 1px 6px rgba(0,0,0,.9);white-space:nowrap}
.chip{font-family:'Space Mono',monospace;letter-spacing:.16em;font-weight:700;color:${C.ink};background:linear-gradient(100deg,#f8edff 0%,#fff7ec 38%,#eaf4ff 72%,#ffeff7 100%);border-radius:999px;box-shadow:0 0 18px rgba(248,237,255,.55);white-space:nowrap}
.back{position:absolute;inset:0;background:radial-gradient(90% 60% at 30% 10%, rgba(140,80,220,.55) 0%, transparent 60%), radial-gradient(80% 50% at 80% 100%, rgba(110,50,200,.45) 0%, transparent 70%), linear-gradient(160deg,#3b1d78 0%,#2a1460 45%,#3a1a7a 100%)}
.bword{position:absolute;left:0;right:0;text-align:center;font-family:'EB Garamond',serif;font-style:italic;font-weight:500;line-height:1;color:rgba(241,233,255,.92);text-shadow:0 0 18px rgba(200,180,255,.5)}
.grain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.stack{position:absolute;left:70px;right:70px;display:flex;flex-direction:column;align-items:center;text-align:center;z-index:20}
.stack.left{align-items:flex-start;text-align:left;left:64px;right:64px}
.div{display:flex;align-items:center;gap:20px;width:100%;margin-bottom:26px}
.div i{flex:1;height:2px;background:linear-gradient(90deg, rgba(217,205,240,0), rgba(217,205,240,.75))}
.div i:last-child{background:linear-gradient(270deg, rgba(217,205,240,0), rgba(217,205,240,.75))}
.logo{display:flex;align-items:center;gap:12px}
.word{font-family:'EB Garamond',serif;font-style:italic;font-weight:500;color:${C.bone};letter-spacing:.01em;line-height:1;text-shadow:0 0 24px rgba(239,230,214,.25)}
.tag{font:400 26px/1 Anton;letter-spacing:.06em;text-transform:uppercase;color:${C.ink};background:linear-gradient(100deg,#f8edff 0%,#fff7ec 38%,#eaf4ff 72%,#ffeff7 100%);box-shadow:0 0 30px rgba(248,237,255,.35);padding:10px 20px 9px;border-radius:999px;margin-bottom:28px}
.hd{font-family:Anton;text-transform:uppercase;color:${C.bone};line-height:.98;letter-spacing:-.005em;width:100%;text-shadow:0 4px 30px rgba(11,6,32,.8)}
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
.row .nm{font:400 56px/1 Anton;font-style:normal;text-transform:uppercase;text-align:right}
.rows.numbered .row .nm{text-align:left}
.tx{font:500 32px/1.25 Archivo, sans-serif;color:${C.bone}}
.tx em{font-style:normal;color:${C.mist}}
.chrome{position:absolute;top:46px;font:400 20px 'Space Mono',monospace;letter-spacing:.24em;color:rgba(239,230,214,.8);display:flex;gap:8px;align-items:center;z-index:30;text-shadow:0 1px 8px rgba(0,0,0,.8)}
.chrome.r{right:56px;letter-spacing:.12em}
.floorfade{position:absolute;left:0;right:0;bottom:0;height:50%;background:linear-gradient(180deg, ${C.floor}00 0%, ${C.floor}aa 40%, ${C.floor} 70%);z-index:15;pointer-events:none}
</style></head><body><div class="frame">
${html}
<div class="grain"></div>
${cover ? '' : `<div class="chrome r">${i + 1}/${total}</div>`}
</div>
<script>
(async () => {
  await document.fonts.ready
  for (const el of document.querySelectorAll('.hd')) {
    const target = +el.dataset.target, maxh = +el.dataset.maxh, maxfs = +el.dataset.maxfs, minfs = +el.dataset.minfs
    const words = []
    let glue = false
    const walk = (node, wrap) => {
      for (const n of node.childNodes) {
        if (n.nodeType === 3) {
          const t = n.textContent
          const parts = t.split(/[ \\n\\t]+/).filter(Boolean)
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
    const min = +(stack.dataset.rowsmin || 300)
    let f = 32, n = 56, g = 26
    while (stack.getBoundingClientRect().top < min && f > 24) {
      f -= 1; n -= 2; g = Math.max(12, g - 2); rows.style.gap = g + 'px'
      rows.querySelectorAll('.tx').forEach((e) => (e.style.fontSize = f + 'px'))
      rows.querySelectorAll('.row .nm').forEach((e) => (e.style.fontSize = n + 'px'))
    }
  }
  const bd = document.querySelector('.bd'); let bf = 38
  while (bd && stack.getBoundingClientRect().top < 360 && bf > 28) { bf -= 1; bd.style.fontSize = bf + 'px' }
  // Seat the scene on the text: the card's bottom edge sits a fixed gap above the stack.
  const scene = document.querySelector('.scene')
  if (scene && scene.dataset.bottom) {
    const gap = 40, want = stack.getBoundingClientRect().top - gap
    let low = 0
    const lead = scene.querySelectorAll('.card.lead')
    for (const cd of lead.length ? lead : scene.querySelectorAll('.card')) { const r = cd.getBoundingClientRect(); if (r.left < ${W} - 60 && r.right > 60) low = Math.max(low, Math.min(r.bottom, r.top + r.height)) }
    const d = Math.max(-220, Math.min(260, want - low))
    scene.style.transform = 'translateY(' + d.toFixed(0) + 'px)'
  }
  window.__overflow = stack.getBoundingClientRect().top < 130 ? ['stack too tall'] : []
  window.__ready = true
})()
</script></body></html>`
}
