// st10kids — Star Talk season 10 "Little Stars" (promo/films/STARTALK11.md): the baby + kid stars, the Star Nursery, the
// Zodiac Academy, the crayon home-video border and the growUp morph. Owned by the st10aries session (S10 E01); every
// season-10 episode imports it. Don't edit from another session: add what you need in your own folder.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues,
//            drawMoonNurse, drawCloudCrib, drawHomeVideo, kidSign, pastel, NURSERY, ACADEMY, KIDS_FONTS,
//            crayonPow, crayonPowCues, speedLines, dustPuffs, confetti, drawStoryPage, drawRibbon } from '../../st10kids.js'
//
//   In build():  try { await Promise.all(KIDS_FONTS.map(f => document.fonts.load(f))) } catch (_) {}
//   Everything here is canvas + pure f(t): call it every frame, in any order. Nothing touches `document` at module top
//   level (the sprite buffer is made lazily), so the sound build can import it in node.
//
// ── the cast
// drawBabyStar(ctx, x, y, size, t, { sign, age = 'baby', mood, ...drawStarChar opts })   one baby / kid star, centred on
//   (x, y) like drawStarChar (size = sprite px: ~140–300 for a hero, 70–120 for a crowd). Rounder and chubbier than the
//   adult (a fat-armed star on a 30-cell grid), big glossy eyes set low, a tiny mouth, rosy cheeks, and a soft PASTEL of
//   the sign colour (pastel(sign)). sign: 'aries' | 'taurus' | … | 'sagittarius' (or 'sag') | 'capricorn' ('cap') |
//   'aquarius' ('aqua') | 'pisces'; or pass color: '#hex' yourself.
//   age 'baby': a curl tuft on the top tip (tuft: false to hide), pacifier: true for a pacifier, bib: true for a bib.
//   age 'kid':  a little less round, slightly smaller eyes, a cowlick; backpack: true (straps over both arms, the pack
//               peeking out behind; backpackColor), glyph: true (or a string) for the coin badge.
//   mood: 'neutral' | 'happy' (^ ^, open smile) | 'wink' | 'squint' | 'wide' | 'heart' | 'sleepy' (z's) | 'sparkle'
//         | 'cry' (wet eyes, two tear streams, wobbly mouth) | 'pout' | 'determined' (brows down, set mouth) | 'eyeroll'
//         | 'laugh' (shut ^ ^ + big open mouth).
//   Also every drawStarChar opt: look [x, y] −1…1 (omit = idle glances), blink (auto | false | 0…1), bob, squash, hops
//   (talkHops times), seed, glow (0…1.5), alpha, pop (0…1 scale), blush (default on), zzz, tips; plus flip (mirror).
//   Returns { x, y, size, top } (y = the bobbed centre; top = the upper tip).
// kidSign(id) → { color (pastel), base (true sign colour), glyph, name: 'ARIES', tag: '♈ BABY ARIES', kidTag: '♈ KID ARIES' }
// pastel(id or '#hex') → the soft pastel body colour used for that sign.
// drawMoonNurse(ctx, x, y, r, t, { mood = 'happy', look, cap = true, lamp = false, alpha = 1, pop = 1, hops, seed })
//   the Moon as the nursery's night nurse: a pale full-moon face (craters, rosy cheeks, kind sleepy-soft eyes) wearing a
//   tiny white nurse cap with a pink cross. lamp: true = holds a little glowing moon nightlight. mood 'happy' | 'neutral'
//   | 'wide' | 'sleepy' | 'wink'. Tag '☾ THE MOON'. Returns { x, y, r, top }.
//   (Saturn the principal: st5cast's drawSaturn, it already wears glasses.)
//
// ── the sets (each paints an opaque full-frame background; draw it first, then your cast)
// drawNursery(ctx, t, { glow = 1, cribs = true, mobile = true, dim = 0, night = 0 })   the Star Nursery: a pastel nebula
//   (lavender → pink → peach, puffy pixel clouds drifting, dust lanes, tiny new-born stars twinkling in the pillars),
//   three cloud cribs on a cloud floor and a star mobile over the middle crib. glow 0…1.5: how bright the newborn stars
//   are. night 0…1 dims it to a lullaby blue. dim 0…1 darkens everything (for type on top).
//   NURSERY = { cribs: [[x, y], …] (the mattress centres: sit a baby at y − size·0.55 so its face clears the front rail), floor: y, mobile: [x, y],
//               door: [x, y] (a cloud doorway at the right, for entrances), slide: [x, y] (a little cloud slide, left) }
// drawCloudCrib(ctx, x, y, w, t, { front = false, color })   one crib (x, y = mattress centre). Draw it with front:
//   false behind the baby and again with front: true after the baby so the bars sit in front.
// drawAcademy(ctx, t, { room = 'hall' | 'class' | 'yard' | 'stage', dim = 0, light = 1, banner = true })   the Zodiac
//   Academy. hall: lockers, the "ZODIAC ACADEMY" banner, doors, a checker floor. class: a chalkboard with constellation
//   doodles, desks, a window on space. yard: a playground under a twilight sky (slide, swings, sandbox, a race track
//   lane, a fence). stage: red curtains, footlights, a wooden stage and a spotlight (light 0…1 = spot on).
//   ACADEMY[room].spots = named [x, y] floor points to stand your cast on, e.g. ACADEMY.yard.spots.slide,
//   ACADEMY.class.spots.desks (an array), ACADEMY.stage.spots.centre. ACADEMY[room].floor = the floor line y.
//
// ── the season's look
// drawCrayonFrame(ctx, t, { alpha = 1, colors, inset = 58, doodles = true })   the crayon-drawn scrapbook border: four
//   wobbly multicolour crayon strokes that "boil" at 8 fps (hand-drawn), with little crayon doodles (a star, a heart, a
//   sun, a spiral) along the sides. It stops well short of the corners so cardFrame's corner stars and the seed
//   constellation stay clear. Draw it late (above the scene, below DOM type).
// ageCaption(ctx, t, { text = 'AGE 3 ½', at = 0, out, x = 540, y = 1660, color = '#ffd36e', size = 64, rot = −0.04,
//                      sub = null })   the crayon "home video" caption: crayon-textured Inter 800 on a torn paper scrap,
//   wobbling in at `at` (scribble-in), held, popped out at `out` (a time) or never. sub: a small second line in Space Mono
//   (e.g. 'HOME VIDEO · TAPE 1'). Returns { w, h } while visible.  ageCaptionCues(at) → a crayon scratch + pop.
// drawHomeVideo(ctx, t, { label = 'PLAY', counter = true, x0 = 90, y0 = 250, alpha = 1, date = null })   tiny VHS camcorder
//   chrome inside the crayon frame: "▶ PLAY" top-left (under the seed constellation), "SP" + a running tape counter
//   top-right, and an optional date stamp bottom-right ('JUN 01 · AGE 1'). Small; keep your hook clear of y 240–300.
//
// ── the ending
// growUp(ctx, t, { sign, at, x, y, size, mood = 'happy', toMood = 'happy', fromAge = 'kid', look, caption = null,
//                  seed, kidOpts = {}, adultOpts = {} })   the 1.5 s match-cut morph from the kid to today's adult star.
//   Before `at` it draws the kid (drawBabyStar); at + 0…0.55 the kid winds up (squash, wiggle, sparkles spiral in);
//   at + 0.55…0.85 a white star-flash and pixel shockwave rings cover the swap while the outline grows; from at + 0.85 the
//   adult (startalk.js drawStarChar, true sign colour + glyph) lands with a squash and settles by at + 1.5; after that it
//   keeps drawing the adult. Size grows from 0.82·size to size. caption: ['AGE 6', 'TODAY'] flips a small crayon chip
//   above the star at the flash. Every episode ends on it, just before the last line.
//   Returns { x, y, size, top, k } (k 0 → 1 = how grown).   growUpCues(at, { key }) → a rising harp sweep, a whoosh, the
//   flash (boom + bell) and a landing pop.
//
// ── extras (added with S10 E01; shared, use freely)
// crayonPow(ctx, t, { text = 'BONK!', at, dur = 0.9, x, y, color = '#ffd36e', size = 72, rot = −0.12 })   a comic
//   onomatopoeia in crayon (Inter 800, crayon-textured, ink outline) with a jagged crayon burst behind it. Pops in at
//   `at` with an overshoot, jiggles, pops out by at + dur.   crayonPowCues(at, { kind = 'bonk' | 'pop' | 'yay' }) → sound.
// speedLines(ctx, t, { x, y, dir = −1, len = 220, n = 6, color = '#fffaf0', alpha = 1, spread = 120 })   flickering
//   pixel speed streaks trailing behind a runner at (x, y); dir −1 = the lines trail to the left (it runs right).
// dustPuffs(ctx, t, { x, y, at, dir = −1, color = '#fff2f6' })   three little pixel puffs kicked up at `at` (0.6 s).
// confetti(ctx, t, { x, y, at, dur = 2, n = 40, spread = 420, colors })   a crayon-colour confetti pop from (x, y).
// drawStoryPage(ctx, t, { x = 540, y = 820, w = 860, h = 620, open = 1, title = null, art = (ctx, w, h, t) => {} })
//   an open picture book (two cream pages, a spine, a ribbon); art() draws inside it in local coords (0…w, 0…h, origin
//   top-left of the spread, already clipped). open 0…1 swings it open. title: a crayon line at the top of the page.
//   Use it for the myth / real-sky beats ("story time").
// drawRibbon(ctx, x, y, s, t, { place = 1, color = '#ffd36e' })   a pixel prize rosette ("1ST"); place 1…3.
//
// KIDS_FONTS: the font strings to preload (Inter 800, Space Mono 700, EB Garamond italic).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../src/lib.js'
import { SIGNS, easeOutBack } from './wheel.js'
import { drawStarChar } from './startalk.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const TAU = Math.PI * 2
const R = Math.round
const r3 = v => +v.toFixed(3)
const inBack = x => { const c1 = 1.70158; return (c1 + 1) * x * x * x - c1 * x * x }

export const KIDS_FONTS = ["800 64px Inter", "800 112px Inter", "700 26px 'Space Mono'", "italic 500 140px 'EB Garamond'"]

// ─────────────────────────────────────────────── colour helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

const ALIAS = { sag: 'sagittarius', cap: 'capricorn', aqua: 'aquarius' }
const findSign = id => SIGNS.find(s => s.id === (ALIAS[id] || id))
export function pastel(id) {
  const base = typeof id === 'string' && id.startsWith('#') ? id : (findSign(id) || SIGNS[0]).color
  return mixHex(base, '#fff4f0', 0.42)
}
export function kidSign(id) {
  const s = findSign(id) || SIGNS[0], name = s.name.toUpperCase()
  return { color: pastel(s.color), base: s.color, glyph: s.glyph, name, tag: `${s.glyph} BABY ${name}`, kidTag: `${s.glyph} KID ${name}` }
}

const PAL = new Map()
function palette(color) {
  if (PAL.has(color)) return PAL.get(color)
  const p = {
    body: color,
    core: mixHex(color, '#fffaf2', 0.25),
    light: mixHex(color, '#fffdf8', 0.55),
    hi: '#ffffff',
    shade: mixHex(color, '#b04a8a', 0.2),
    deep: mixHex(color, '#5a2a78', 0.38),
    line: mixHex(color, '#1b0f36', 0.78),
    blush: mixHex(color, '#ff6f9c', 0.65),
    mouth: '#7a1f4a',
    tongue: '#ff7fa0',
  }
  PAL.set(color, p); return p
}

// ─────────────────────────────────────────────── the body: a chubby, round-armed star on a 30-cell grid
const G = 30, HALF = G / 2
const SHAPES = {
  baby: { x: HALF, y: 16.4, R: 14.2, r: 9.6, round: 3.6 },
  kid: { x: HALF, y: 16.2, R: 14.4, r: 8.9, round: 3.0 },
}
function starPoly(S) {
  const V = [], R0 = S.R - S.round, r0 = S.r - S.round * 0.5
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0
    V.push([S.x + Math.cos(a) * rr, S.y + Math.sin(a) * rr])
  }
  return V
}
function sdPoly(px, py, V) {
  let d = (px - V[0][0]) ** 2 + (py - V[0][1]) ** 2, s = 1
  for (let i = 0, j = V.length - 1; i < V.length; j = i, i++) {
    const ex = V[j][0] - V[i][0], ey = V[j][1] - V[i][1], wx = px - V[i][0], wy = py - V[i][1]
    const h = clamp((wx * ex + wy * ey) / (ex * ex + ey * ey), 0, 1), bx = wx - ex * h, by = wy - ey * h
    d = Math.min(d, bx * bx + by * by)
    const c1 = py >= V[i][1], c2 = py < V[j][1], c3 = ex * wy > ey * wx
    if ((c1 && c2 && c3) || (!c1 && !c2 && !c3)) s = -s
  }
  return s * Math.sqrt(d)
}
const MASKS = {}
function bodyMask(age) {
  if (MASKS[age]) return MASKS[age]
  const S = SHAPES[age], V = starPoly(S), sd = (x, y) => sdPoly(x, y, V) - S.round
  const m = new Uint8Array(G * G), tone = new Uint8Array(G * G)
  const Lx = -0.62, Ly = -0.78
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const x = i + 0.5, y = j + 0.5, d = sd(x, y)
    if (d > 0) continue
    m[j * G + i] = 1
    const e = 0.35, nx = sd(x + e, y) - sd(x - e, y), ny = sd(x, y + e) - sd(x, y - e), nl = Math.hypot(nx, ny) || 1
    const facing = (nx * Lx + ny * Ly) / nl
    let tn = 0
    if (d > -1.1 && facing < -0.25) tn = 4
    else if (d > -2.0 && facing < -0.1) tn = 3
    else if (d > -1.3 && facing > 0.3) tn = 2
    else if (d < -4.2 && Math.hypot(x - S.x + 2, y - S.y + 2) < 4) tn = 1
    tone[j * G + i] = tn
  }
  const top = S.y - S.R, foot = S.y + S.R * Math.cos(Math.PI / 5)
  const tips = Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + k * TAU / 5, rr = S.R - 1.6; return [Math.floor(S.x + Math.cos(a) * rr), Math.floor(S.y + Math.sin(a) * rr)] })
  MASKS[age] = { m, tone, top, foot, tips, S }
  return MASKS[age]
}
const inM = (m, i, j) => i >= 0 && j >= 0 && i < G && j < G && m[j * G + i] === 1

// ─────────────────────────────────────────────── eyes + mouths (X ink, W white glint, w sclera, H heart, B blue tear)
const BM = s => s.trim().split(/\s+/)
const EYES = {
  open: BM(`..XXX.. .XXXXX. XWWXXXX XWWXXXX XWXXXXX XXXXXXX XXXXXWX .XXXWX. ..XXX..`),
  kid: BM(`.XXXX. XWWXXX XWWXXX XWXXXX XXXXXX XXXXWX .XXXX.`),
  half: BM(`....... ....... ....... ....... XXXXXXX XWXXXXX XXXXXWX .XXXXX. ..XXX..`),
  shut: BM(`....... ....... ....... ....... ....... ....... XXXXXXX .XXXXX. .......`),
  happy: BM(`....... ....... ..XXX.. .XXXXX. XX...XX X.....X ....... ....... .......`),
  sleepy: BM(`....... ....... ....... ....... ....... XX...XX .XXXXX. ....... .......`),
  squint: BM(`....... ....... ....... ....... XXXXXXX XXXXXXX XWXXXXX .XXXXX. .......`),
  wet: BM(`..XXX.. .XXXXX. XWWXXXX XWWXXXX XWXXXWX XXXXXXX XBBBBBX .BBBBB. ..BBB..`),
  sclera: BM(`..XXX.. .XwwwX. XwwwwwX XwwwwwX XwwwwwX XwwwwwX XwwwwwX .XwwwX. ..XXX..`),
  heart: BM(`....... .HH.HH. HWHHHHH HHHHHHH HHHHHHH .HHHHH. ..HHH.. ...H... .......`),
  heartS: BM(`....... ....... .HH.HH. .HWHHH. .HHHHH. ..HHH.. ...H... ....... .......`),
}
const MOUTHS = {
  dot: BM(`.XX. .XX.`),
  smile: BM(`X..X .XX.`),
  open: BM(`XXXX XMMX .XX.`),
  laugh: BM(`XXXXXX XMMMMX XMTTMX .XXXX.`),
  o: BM(`.XX. X..X .XX.`),
  wobble: BM(`.X.X. X.X.X`),
  pout: BM(`.XX. X..X`),
  flat: BM(`XXXX`),
}
const FACE = { baby: { eyeY: 17.6, eyeX: 10.4, mouthY: 22.4, cheekY: 21.2 }, kid: { eyeY: 17.0, eyeX: 10.9, mouthY: 21.8, cheekY: 20.6 } }

function autoBlink(t, seed) {
  const r = rng(seed * 7919 + 13)
  let at = 0.6 + r() * 2.2
  while (at < t + 1) {
    const dt = t - at
    if (dt >= 0 && dt < 0.2) return dt < 0.05 ? 0.5 : dt < 0.13 ? 1 : 0.5
    if (r() < 0.25) { const d2 = dt - 0.26; if (d2 >= 0 && d2 < 0.18) return d2 < 0.05 ? 0.5 : d2 < 0.12 ? 1 : 0.5 }
    at += 2.3 + r() * 2.1
  }
  return 0
}
function autoLook(t, seed) {
  const seg = 1.7, k = Math.floor(t / seg + seed * 0.37), f = t / seg + seed * 0.37 - k
  const pick = n => { const r = rng(seed * 131 + n * 17); r(); const a = r(); return a < 0.45 ? [0, 0] : a < 0.62 ? [-1, 0] : a < 0.79 ? [1, 0] : a < 0.9 ? [-1, -1] : [1, -1] }
  return f < 0.9 ? pick(k) : pick(k + 1)
}
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.45 * a)); g.addColorStop(0.45, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

let BUF = null
function buffer() {
  if (BUF) return BUF
  const W2 = G + 8
  const c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(W2, W2) : Object.assign(document.createElement('canvas'), { width: W2, height: W2 })
  BUF = { c, x: c.getContext('2d'), pad: 4, W2 }
  return BUF
}

/** paint the sprite into the buffer (cells offset by pad so accessories can stick out a little) */
function paintSprite(t, P, o) {
  const { x, pad, W2 } = buffer(), M = bodyMask(o.age), { m, tone } = M, F = FACE[o.age]
  x.clearRect(0, 0, W2, W2)
  const px = (i, j, c) => { x.fillStyle = c; x.fillRect(i + pad, j + pad, 1, 1) }
  const TONES = [P.body, P.core, P.light, P.shade, P.deep]
  // the backpack peeks out behind the left arm
  if (o.backpack) {
    const bc = o.backpackColor, bd = mixHex(bc, '#1b0f36', 0.45), bl = mixHex(bc, '#ffffff', 0.35)
    for (let j = 12; j < 25; j++) for (let i = 0; i < 9; i++) {
      if (inM(m, i + 1, j) && i > 2) continue
      const edge = j === 12 || j === 24 || i === 0
      px(i - 1, j, edge ? P.line : j === 13 ? bl : j > 19 ? bd : bc)
    }
  }
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    if (!inM(m, i, j)) {
      if (inM(m, i + 1, j) || inM(m, i - 1, j) || inM(m, i, j + 1) || inM(m, i, j - 1)) px(i, j, P.line)
      continue
    }
    px(i, j, TONES[tone[j * G + i]])
  }
  // gloss on the top arm and the left arm
  for (const [i, j] of [[13, 4], [13, 5], [12, 6], [12, 7]]) if (inM(m, i, j)) px(i, j, P.hi)
  for (const [i, j] of [[4, 12], [5, 12], [3, 13]]) if (inM(m, i, j)) px(i, j, P.light)
  // tip twinkles
  if (o.tips) for (let k = 0; k < 5; k++) {
    const ph = (t * 0.5 + k * 0.23 + o.seed * 0.17) % 1
    if (ph < 0.07) { const [i, j] = M.tips[k]; for (const [a, b] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]) if (inM(m, i + a, j + b)) px(i + a, j + b, a || b ? P.light : P.hi) }
  }
  // the tuft (baby) / cowlick (kid) on the top tip
  const topJ = Math.floor(M.top)
  if (o.tuft) {
    const sway = Math.round(Math.sin(t * 3.2 + o.seed) * 0.6)
    const T = o.age === 'baby' ? [[15, -1], [16, -2], [17, -2], [18, -1], [18, 0], [17, 0], [14, 0], [16 + sway, -3], [17 + sway, -3]] : [[15, 0], [16, -1], [17, -1], [17, 0]]
    for (const [i, j] of T) px(i, topJ + j + 1, P.line)
    for (const [i, j] of (o.age === 'baby' ? [[16, -1], [17, -1]] : [[16, 0]])) px(i, topJ + j + 1, P.deep)
  }
  // cheeks
  if (o.blush > 0) {
    x.globalAlpha = clamp(o.blush)
    for (const i of [5, 6, 7, 22, 23, 24]) { px(i, R(F.cheekY), P.blush); px(i, R(F.cheekY) + 1, P.blush) }
    x.globalAlpha = 1
  }
  // eyes
  const col = ch => ch === 'X' ? INK : ch === 'W' ? '#ffffff' : ch === 'w' ? '#fffaf0' : ch === 'H' ? '#ff3d6e' : ch === 'B' ? '#9fe0ff' : ch === 'M' ? P.mouth : ch === 'T' ? P.tongue : null
  const put = (bm, x0, y0, flipX = false) => bm.forEach((row, j) => [...row].forEach((ch, i) => { const c = col(ch); if (c) px(x0 + (flipX ? row.length - 1 - i : i), y0 + j, c) }))
  const place = bm => { const w = bm[0].length, h = bm.length, x0 = R(F.eyeX - w / 2), y0 = R(F.eyeY - h / 2); return [[x0, y0], [G - x0 - w, y0]] }
  const lx = o.lx, ly = o.ly
  const pair = (bm, dx = lx, dy = ly, mirror = false) => place(bm).forEach(([x0, y0], k) => put(bm, x0 + dx, y0 + dy, mirror && k === 1))
  const big = o.age === 'baby' ? EYES.open : EYES.kid
  const blinkBm = o.closure >= 0.75 ? EYES.shut : o.closure >= 0.25 ? EYES.half : null
  let mouth = o.age === 'baby' ? 'dot' : 'smile'
  switch (o.mood) {
    case 'happy': pair(EYES.happy, 0, 0); mouth = 'open'; break
    case 'laugh': pair(EYES.happy, 0, 0); mouth = 'laugh'; break
    case 'sleepy': pair(EYES.sleepy, 0, 0); mouth = 'dot'; break
    case 'wink': { const [[ax, ay], [bx, by]] = place(big); put(blinkBm || big, ax + lx, ay + ly); put(EYES.happy, bx, by + (big.length - EYES.happy.length)); mouth = 'smile'; break }
    case 'squint': pair(o.closure >= 0.75 ? EYES.shut : EYES.squint, lx, 0); mouth = 'flat'; break
    case 'determined': {
      pair(blinkBm || big, lx, ly)
      for (const [x0, y0] of place(big)) { const w = big[0].length; for (let i = 0; i < w; i++) px(x0 + i, y0 - 2 + (x0 < HALF ? Math.floor(i / 3) : 2 - Math.floor(i / 3)), INK) }
      mouth = 'flat'; break
    }
    case 'pout': {
      pair(blinkBm || big, lx, 1)
      for (const [x0, y0] of place(big)) { const w = big[0].length; for (let i = 1; i < w - 1; i++) px(x0 + i, y0 - 2 + (x0 < HALF ? 2 - Math.floor(i / 3) : Math.floor(i / 3)), INK) }
      mouth = 'pout'; break
    }
    case 'cry': pair(blinkBm || EYES.wet, 0, 0); mouth = 'wobble'; break
    case 'sparkle': pair(blinkBm || EYES.open, lx, ly); mouth = 'smile'; break
    case 'heart': pair(Math.sin(t * TAU * 1.8) > -0.2 ? EYES.heart : EYES.heartS, 0, 0); mouth = 'open'; break
    case 'wide': case 'eyeroll': {
      if (blinkBm) { pair(blinkBm, 0, 0); mouth = 'o'; break }
      const roll = o.mood === 'eyeroll'
      for (const [x0, y0] of place(EYES.sclera)) {
        put(EYES.sclera, x0, y0)
        const ix = roll ? R(2.5 + 1.5 * Math.sin(t * 5)) : 2 + lx, iy = roll ? 1 : 3 + ly
        x.fillStyle = INK; x.fillRect(x0 + clamp(ix, 1, 4) + pad, y0 + clamp(iy, 1, 5) + pad, 2, 3)
        px(x0 + clamp(ix, 1, 4), y0 + clamp(iy, 1, 5), '#ffffff')
      }
      mouth = roll ? 'flat' : 'o'; break
    }
    default: pair(blinkBm || big, lx, ly)
  }
  if (o.mouth) mouth = o.mouth
  // mouth (under the pacifier, if any)
  if (!o.pacifier) {
    const mb = MOUTHS[mouth] || MOUTHS.dot, w = mb[0].length
    const wob = mouth === 'wobble' && Math.sin(t * 22) > 0 ? 1 : 0
    put(mb, R(HALF - w / 2) + wob, R(F.mouthY - mb.length / 2) + (mouth === 'laugh' ? 0 : 0))
  } else {
    // a pacifier: a pink shield, a ring, a gentle suck-bob
    const sb = Math.sin(t * 6 + o.seed) > 0.3 ? 1 : 0, my = R(F.mouthY) - 1
    for (let i = -3; i <= 3; i++) for (let j = 0; j < 3; j++) px(HALF - 0.5 + i, my + j, (j === 0 && Math.abs(i) < 3) ? '#ffd0e0' : Math.abs(i) === 3 ? P.line : '#ff8fb8')
    for (const [i, j] of [[-1, 3], [0, 3], [-2, 4], [1, 4], [-2, 5], [1, 5], [-1, 6], [0, 6]]) px(HALF + i, my + j + sb, '#f2c75c')
  }
  // a bib (baby)
  if (o.bib) {
    const by = R(F.mouthY) + 2
    for (let j = 0; j < 5; j++) for (let i = -5 + Math.floor(j / 2); i <= 4 - Math.floor(j / 2); i++) px(HALF + i, by + j, j === 0 || i === -5 + Math.floor(j / 2) || i === 4 - Math.floor(j / 2) ? P.line : (i + j) % 3 === 0 ? '#ffd0e0' : '#fffaf0')
  }
  // backpack straps over the arms
  if (o.backpack) {
    const sc = mixHex(o.backpackColor, '#1b0f36', 0.3)
    for (const [i, j] of [[7, 12], [7, 13], [8, 14], [8, 15], [9, 16], [22, 12], [22, 13], [21, 14], [21, 15], [20, 16]]) if (inM(m, i, j)) px(i, j, sc)
  }
  // glyph coin badge on the lower-right point
  if (o.glyph) {
    const B = { x: 22.6, y: 24.2, r: 3.6 }
    for (let j = 18; j < G; j++) for (let i = 17; i < G; i++) {
      const d = Math.hypot(i + 0.5 - B.x, j + 0.5 - B.y)
      if (d < B.r - 1) px(i, j, '#140c2c')
      else if (d < B.r) px(i, j, i + j < B.x + B.y ? P.light : P.body)
      else if (d < B.r + 0.9) px(i, j, P.line)
    }
  }
}

export function drawBabyStar(ctx, x, y, size, t, opts = {}) {
  const { sign = 'aries', age = 'baby', mood = 'neutral', look, blink, bob, squash = 0, hops = null, seed = 1, glow = 1, alpha = 1, pop = 1, zzz = true, tips = true, flip = false } = opts
  if (alpha <= 0 || pop <= 0 || size <= 0) return { x, y, size, top: y }
  const color = opts.color || pastel(sign)
  const P = palette(color)
  const L = look || autoLook(t, seed)
  const lx = clamp(Math.round(L[0] * 1.2), -1, 1), ly = clamp(Math.round(L[1] * 1.2), -1, 1)
  const closure = typeof blink === 'number' ? blink : blink === false ? 0 : autoBlink(t, seed)
  const blush = opts.blush === undefined ? 0.8 : opts.blush === true ? 0.9 : opts.blush === false ? 0 : opts.blush
  const glyph = opts.glyph === true ? (findSign(sign) || SIGNS[0]).glyph : opts.glyph || null
  const tuft = opts.tuft ?? true
  paintSprite(t, P, { age: age === 'kid' ? 'kid' : 'baby', mood, lx, ly, closure, blush, tips, seed, tuft, glyph,
    pacifier: !!opts.pacifier, bib: !!opts.bib, backpack: !!opts.backpack, backpackColor: opts.backpackColor || '#ff9a6a', mouth: opts.mouth })
  const M = bodyMask(age === 'kid' ? 'kid' : 'baby'), { c, pad, W2 } = buffer()
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.04 : bob
  const hs = hopState(t, hops)
  const breathe = 0.022 * Math.sin(t * 3.4 + seed * 1.7)
  const sq = squash + hs.sq + breathe
  const sx = (1 + sq) * (flip ? -1 : 1), sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.4 + seed * 2.1) * bobA - hs.lift * size * 0.1
  const base = (M.foot - HALF) * cell
  ctx.save()
  ctx.globalAlpha *= alpha
  glowAt(ctx, x, cy + (M.S.y - HALF) * cell, S * 0.8, P.body, glow * (0.85 + 0.15 * Math.sin(t * 2.6 + seed)))
  if (tips) {
    const tc = Math.max(1, Math.round(cell))
    ;[[-14, -8, 0], [14, -10, 0.37], [-15, 9, 0.71], [15.5, 5, 0.18]].forEach(([u, v, o], k) => {
      const ph = (t * 0.42 + o + seed * 0.13) % 1, a = Math.max(0, Math.sin(ph * TAU)) ** 2
      if (a < 0.05) return
      const qx = R(x + u * cell), qy = R(cy + v * cell)
      ctx.globalAlpha = alpha * a; ctx.fillStyle = k % 2 ? P.light : '#fffbea'
      ctx.fillRect(qx - tc / 2, qy - tc / 2, tc, tc)
      if (a > 0.55 && s >= 100) { ctx.fillRect(qx - tc * 1.5, qy - tc / 2, tc * 3, tc); ctx.fillRect(qx - tc / 2, qy - tc * 1.5, tc, tc * 3) }
    })
    ctx.globalAlpha = alpha
  }
  ctx.translate(R(x), R(cy + base)); ctx.scale(sx, sy)
  const sm = ctx.imageSmoothingEnabled
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(c, -S / 2 - pad * cell, -S / 2 - base - pad * cell, W2 * cell, W2 * cell)
  ctx.imageSmoothingEnabled = sm
  if (glyph) {
    ctx.font = `700 ${R(cell * 3.8)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    if (flip) ctx.scale(-1, 1)
    ctx.fillStyle = P.light; ctx.fillText(glyph + '︎', (flip ? -1 : 1) * (22.6 - HALF) * cell, (24.2 - HALF) * cell - base + cell * 0.3)
  }
  ctx.restore()
  // tears (cry)
  if (mood === 'cry' && closure < 0.75) {
    ctx.save(); ctx.globalAlpha *= alpha
    const F = FACE[age === 'kid' ? 'kid' : 'baby'], tc = Math.max(2, R(cell))
    for (const sd of [-1, 1]) for (let k = 0; k < 3; k++) {
      const ph = (t * 1.6 + k / 3 + (sd > 0 ? 0.17 : 0)) % 1
      const qx = R(x + sd * (F.eyeX - HALF - 2.6) * -cell * (flip ? -1 : 1) + sd * ph * cell * 2.4), qy = R(cy + (F.eyeY - HALF + 3.5) * cell + ph * cell * 7)
      ctx.globalAlpha = alpha * (1 - ph); ctx.fillStyle = '#9fe0ff'; ctx.fillRect(qx - tc / 2, qy, tc, tc * 1.5)
    }
    ctx.restore()
  }
  // sleepy z's
  if (mood === 'sleepy' && zzz) {
    ctx.save(); ctx.globalAlpha *= alpha
    const Z = ['XXX', '..X', '.X.', 'X..', 'XXX']
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.45 + k / 3) % 1), zc = Math.max(2, R(cell * (0.7 + 0.5 * ph)))
      const zx = R(x + S * (0.22 + 0.16 * ph) + Math.sin(ph * 6 + k) * cell), zy = R(cy - S * (0.24 + 0.36 * ph))
      ctx.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.95; ctx.fillStyle = BONE
      Z.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(zx + i * zc, zy + j * zc, zc, zc) }))
    }
    ctx.restore()
  }
  const tuftUp = tuft ? 3 : 0
  return { x, y: cy, size: S, top: cy - S / 2 + (M.top - tuftUp) * cell }
}

// ─────────────────────────────────────────────── pixel helpers for the sets
function rect(ctx, x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), R(w), R(h)) }
function blob(ctx, cx, cy, r, c, col, { squashY = 1 } = {}) {
  // one path per blob (so translucent blobs don't stripe where rows would overlap)
  ctx.fillStyle = col; ctx.beginPath()
  const n = Math.ceil(r / c)
  for (let j = -n; j <= n; j++) {
    const half = Math.sqrt(Math.max(0, r * r - (j * c) ** 2))
    if (half <= 0) continue
    const w = Math.round(half / c) * c
    ctx.rect(R(cx - w), R(cy + (j - 0.5) * c * squashY), R(w * 2), R(cy + (j + 0.5) * c * squashY) - R(cy + (j - 0.5) * c * squashY))
  }
  ctx.fill()
}
function cloud(ctx, x, y, w, c, col, shade, hi) {
  // a puffy pixel cloud: three bumps on a flat base, w wide
  const r1 = w * 0.22, r2 = w * 0.3, r3_ = w * 0.2
  const parts = [[x - w * 0.28, y, r1], [x, y - w * 0.08, r2], [x + w * 0.3, y + w * 0.02, r3_]]
  if (shade) for (const [px_, py, r] of parts) blob(ctx, px_ + c, py + c * 2, r, c, shade)
  for (const [px_, py, r] of parts) blob(ctx, px_, py, r, c, col)
  rect(ctx, x - w * 0.46, y, w * 0.92, w * 0.14, col)
  if (shade) rect(ctx, x - w * 0.46, y + w * 0.1, w * 0.92, w * 0.05, shade)
  if (hi) for (const [px_, py, r] of parts) rect(ctx, px_ - r * 0.5, py - r * 0.62, r * 0.6, c, hi)
}
function pixStar(ctx, x, y, s, col) { rect(ctx, x - s / 2, y - s * 1.5, s, s * 3, col); rect(ctx, x - s * 1.5, y - s / 2, s * 3, s, col) }

// ─────────────────────────────────────────────── the Star Nursery
export const NURSERY = { cribs: [[250, 1250], [540, 1290], [830, 1250]], floor: 1420, mobile: [540, 860], door: [960, 1300], slide: [110, 1330] }
const NEB_STARS = Array.from({ length: 70 }, (_, i) => { const r = rng(4000 + i); return [r() * 1080, r() * 1500, r() * 1, 2 + Math.floor(r() * 3)] })
const NEWBORNS = [[180, 560], [880, 470], [700, 700], [330, 820], [950, 900], [90, 980]]
export function drawCloudCrib(ctx, x, y, w, t, { front = false, color = '#fff6fb' } = {}) {
  const c = 6, shade = '#e9d4f2', bar = '#ffffff', barShade = '#d8c4ea'
  if (!front) {
    // back rail + the cloud mattress
    rect(ctx, x - w / 2, y - w * 0.42, w, c * 2, INK); rect(ctx, x - w / 2 + c, y - w * 0.42 + c * 0.5, w - 2 * c, c, bar)
    for (let i = 0; i <= 6; i++) { const bx = x - w / 2 + c + i * (w - 3 * c) / 6; rect(ctx, bx, y - w * 0.42, c, w * 0.42, barShade) }
    cloud(ctx, x, y - c, w * 0.95, c, color, shade, '#ffffff')
  } else {
    // front rail with bars in front of the baby (shorter, so the face shows)
    for (let i = 0; i <= 6; i++) { const bx = x - w / 2 + c + i * (w - 3 * c) / 6; rect(ctx, bx - 1, y - w * 0.06, c + 2, w * 0.16, INK); rect(ctx, bx, y - w * 0.06 + 1, c, w * 0.16 - 2, bar) }
    rect(ctx, x - w / 2 - c, y - w * 0.08, w + 2 * c, c * 2.2, INK); rect(ctx, x - w / 2, y - w * 0.08 + c * 0.4, w, c * 1.4, '#ffe3f0')
    cloud(ctx, x, y + w * 0.16, w * 0.9, c, color, shade, '#ffffff')
  }
}
export function drawNursery(ctx, t, { glow = 1, cribs = true, mobile = true, dim = 0, night = 0 } = {}) {
  // the nebula wash
  const g = ctx.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, mixHex('#3b2a6e', '#1a1a4a', night)); g.addColorStop(0.35, mixHex('#8a5fb8', '#3a3f86', night))
  g.addColorStop(0.62, mixHex('#e79cc8', '#6a6fb8', night)); g.addColorStop(0.82, mixHex('#ffc9b0', '#8f9ad0', night)); g.addColorStop(1, mixHex('#ffe4c9', '#a9b4dc', night))
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  // dust lanes + nebula puffs (soft pixel blobs drifting slowly)
  const drift = t * 6
  const PUFFS = [[160, 300, 210, '#c48ae0'], [820, 220, 260, '#a873d6'], [560, 520, 230, '#f2a6d4'], [80, 760, 200, '#f7b7c9'], [980, 700, 230, '#d98ad8'], [400, 980, 260, '#ffd0c0'], [900, 1060, 220, '#f6bcd8']]
  ctx.save(); ctx.globalAlpha = 0.42 * (1 - night * 0.5)
  for (const [px_, py, r, col] of PUFFS) blob(ctx, ((px_ + drift * (r % 3 === 0 ? 1 : -0.6)) % 1240 + 1240) % 1240 - 80, py + Math.sin(t * 0.4 + px_) * 8, r, 12, col)
  ctx.globalAlpha = 0.18
  for (const [px_, py, r] of PUFFS) blob(ctx, ((px_ + 90 + drift * 0.4) % 1240 + 1240) % 1240 - 80, py + 60, r * 0.6, 12, '#4a2a7a')
  ctx.restore()
  // pillars of gas where the new stars are born (the real stellar-nursery shape), with newborn stars twinkling in them
  ctx.save(); ctx.globalAlpha = 0.5 * (1 - night * 0.4)
  for (const [px_, h, w] of [[120, 520, 90], [930, 600, 110], [760, 380, 70]]) {
    for (let j = 0; j < h; j += 12) { const ww = w * (0.6 + 0.4 * Math.sin(j * 0.02 + px_)) ; rect(ctx, px_ - ww / 2 + Math.sin(j * 0.03) * 14, 1180 - j, ww, 12, j % 36 === 0 ? '#7a4aa0' : '#8e5cb2') }
    blob(ctx, px_, 1180 - h, w * 0.55, 12, '#a978c8')
  }
  ctx.restore()
  for (const [i, [sx, sy]] of NEWBORNS.entries()) {
    const tw = 0.6 + 0.4 * Math.sin(t * 2.2 + i * 1.9)
    glowAt(ctx, sx, sy, 50 * glow, '#fff2c8', tw * glow)
    ctx.globalAlpha = clamp(tw * glow); pixStar(ctx, sx, sy, 6, '#fffbea'); ctx.globalAlpha = 1
  }
  for (const [sx, sy, ph, s] of NEB_STARS) {
    const a = 0.35 + 0.65 * Math.max(0, Math.sin(t * 1.4 + ph * 20))
    ctx.globalAlpha = a * (0.6 + night * 0.4); rect(ctx, sx, sy, s, s, '#fffaf0')
  }
  ctx.globalAlpha = 1
  // the cloud floor
  const F = NURSERY.floor
  for (let i = -1; i < 10; i++) cloud(ctx, i * 130 + 40 + Math.sin(i * 2.1) * 20, F + 30 + (i % 2) * 24, 220, 8, '#fff2f6', '#ecd3ea', '#ffffff')
  rect(ctx, 0, F + 70, 1080, 1920 - F - 70, '#fff2f6')
  for (let i = 0; i < 9; i++) cloud(ctx, i * 140 - 20, F + 220 + (i % 3) * 40, 260, 8, '#f7e2ef', '#e8cde4', '#fffafc')
  // the doorway (a cloud arch, right) and the little cloud slide (left)
  const [dx, dy] = NURSERY.door
  rect(ctx, dx - 70, dy - 230, 140, 230, '#4a3478'); blob(ctx, dx, dy - 230, 70, 8, '#4a3478')
  rect(ctx, dx - 54, dy - 220, 108, 220, '#2b1f52'); blob(ctx, dx, dy - 220, 54, 8, '#2b1f52')
  for (let k = 0; k < 4; k++) cloud(ctx, dx + (k % 2 ? 60 : -60), dy - 70 - k * 70, 90, 6, '#fff6fb', '#e9d4f2', '#ffffff')
  const [slx, sly] = NURSERY.slide
  for (let k = 0; k < 9; k++) rect(ctx, slx - 40 + k * 18, sly - 200 + k * 22, 40, 14, k % 2 ? '#ffd3e6' : '#ffe9f3')
  rect(ctx, slx - 60, sly - 220, 30, 220, '#d8c4ea'); rect(ctx, slx - 56, sly - 216, 22, 212, '#f2e6fb')
  for (let k = 0; k < 6; k++) rect(ctx, slx - 64, sly - 200 + k * 36, 38, 6, '#bfa8dc')
  // the cribs
  if (cribs) for (const [cx, cy] of NURSERY.cribs) drawCloudCrib(ctx, cx, cy, 230, t)
  // the star mobile over the middle crib
  if (mobile) {
    const [mx, my] = NURSERY.mobile
    rect(ctx, mx - 3, 0, 6, my - 60, '#efe6d6')
    const rot = t * 0.8
    rect(ctx, mx - 110, my - 64, 220, 8, '#efe6d6')
    for (let k = 0; k < 4; k++) {
      const a = rot + k * TAU / 4, ox = Math.cos(a) * 100, depth = Math.sin(a)
      const hy = my - 56 + 50 + k * 8
      rect(ctx, mx + ox - 1, my - 56, 2, 50 + k * 8, '#efe6d6')
      ctx.globalAlpha = 0.75 + 0.25 * depth
      const col = ['#ffd36e', '#ff9ec7', '#9fe0ff', '#c9a6ff'][k]
      if (k % 2) blob(ctx, mx + ox, hy + 12, 18, 4, col)
      else pixStar(ctx, mx + ox, hy + 12, 10, col)
      ctx.globalAlpha = 1
    }
  }
  if (dim > 0) { ctx.fillStyle = `rgba(20,10,40,${clamp(dim)})`; ctx.fillRect(0, 0, 1080, 1920) }
}

// ─────────────────────────────────────────────── the Moon, night nurse
export function drawMoonNurse(ctx, x, y, r, t, { mood = 'happy', look = [0, 0], cap = true, lamp = false, alpha = 1, pop = 1, hops = null, seed = 3 } = {}) {
  if (alpha <= 0 || pop <= 0.01) return { x, y, r, top: y - r }
  const hs = hopState(t, hops)
  const cy = y + Math.sin(t * 1.6 + seed) * r * 0.04 - hs.lift * r * 0.18
  const rr = r * pop, c = Math.max(3, R(rr / 16))
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, cy, rr * 2.2, '#fff1c8', 0.9)
  blob(ctx, x, cy, rr + c, c, INK)
  blob(ctx, x, cy, rr, c, '#f6efd8')
  blob(ctx, x + rr * 0.18, cy + rr * 0.16, rr * 0.82, c, '#efe4c2')
  blob(ctx, x - rr * 0.12, cy - rr * 0.14, rr * 0.7, c, '#fbf6e6')
  for (const [u, v, s] of [[-0.5, -0.45, 0.16], [0.52, -0.3, 0.12], [0.45, 0.5, 0.18], [-0.55, 0.35, 0.1]]) blob(ctx, x + u * rr, cy + v * rr, s * rr, c, '#ddd0aa')
  // face
  const ex = rr * 0.34, ey = cy - rr * 0.02, lx = clamp(Math.round(look[0]), -1, 1) * c, ly = clamp(Math.round(look[1]), -1, 1) * c
  const blink = (t + seed) % 3.7 < 0.13
  for (const s of [-1, 1]) {
    const X = x + s * ex
    if (mood === 'sleepy' || blink || (mood === 'wink' && s > 0)) { rect(ctx, X - 2 * c, ey, 4 * c, c, INK); rect(ctx, X - 3 * c, ey - c, c, c, INK); rect(ctx, X + 2 * c, ey - c, c, c, INK) }
    else if (mood === 'happy' || (mood === 'wink' && s < 0)) { rect(ctx, X - 2 * c, ey - c, c, c, INK); rect(ctx, X - c, ey - 2 * c, 2 * c, c, INK); rect(ctx, X + c, ey - c, c, c, INK) }
    else if (mood === 'wide') { rect(ctx, X - 2 * c, ey - 3 * c, 4 * c, 5 * c, INK); rect(ctx, X - c + lx, ey - 2 * c + ly, 2 * c, 2 * c, '#ffffff') }
    else { rect(ctx, X - c * 1.5 + lx, ey - 2 * c + ly, 3 * c, 4 * c, INK); rect(ctx, X - c * 0.5 + lx, ey - 2 * c + ly, c, c, '#ffffff') }
    rect(ctx, X - 2.5 * c, ey + 3 * c, 3 * c, 2 * c, 'rgba(255,140,170,0.55)')
  }
  if (mood === 'wide') { rect(ctx, x - c, cy + rr * 0.32, 2 * c, 3 * c, INK) }
  else { rect(ctx, x - 2 * c, cy + rr * 0.34, c, c, INK); rect(ctx, x - c, cy + rr * 0.34 + c, 2 * c, c, INK); rect(ctx, x + c, cy + rr * 0.34, c, c, INK) }
  // the nurse cap
  if (cap) {
    const capY = cy - rr * 0.96
    rect(ctx, x - rr * 0.46 - c, capY - rr * 0.3 - c, rr * 0.92 + 2 * c, rr * 0.36 + 2 * c, INK)
    rect(ctx, x - rr * 0.46, capY - rr * 0.3, rr * 0.92, rr * 0.36, '#ffffff')
    rect(ctx, x - rr * 0.46, capY + rr * 0.0, rr * 0.92, c, '#e4dcef')
    rect(ctx, x - c * 0.5 - c, capY - rr * 0.22, c * 3, c, '#ff5d7a'); rect(ctx, x - c * 0.5, capY - rr * 0.22 - c, c, c * 3, '#ff5d7a')
  }
  // a little moon nightlight held at the lower right
  if (lamp) {
    const lx_ = x + rr * 0.95, ly_ = cy + rr * 0.6
    glowAt(ctx, lx_, ly_, rr * 0.7, '#fff2b0', 1)
    blob(ctx, lx_, ly_, rr * 0.2 + c, c, INK); blob(ctx, lx_, ly_, rr * 0.2, c, '#fff2b0'); blob(ctx, lx_ + rr * 0.08, ly_ - rr * 0.04, rr * 0.15, c, '#f6efd8')
  }
  ctx.restore()
  return { x, y: cy, r: rr, top: cy - rr * (cap ? 1.35 : 1) }
}

// ─────────────────────────────────────────────── the Zodiac Academy
export const ACADEMY = {
  hall: { floor: 1330, spots: { left: [230, 1240], centre: [540, 1250], right: [850, 1240], door: [540, 1120], lockers: [180, 1240] } },
  class: { floor: 1340, spots: { board: [540, 760], teacher: [860, 1080], desks: [[250, 1210], [540, 1210], [830, 1210]], back: [[250, 1000], [830, 1000]] } },
  yard: { floor: 1300, spots: { slide: [230, 1060], slideTop: [300, 900], swings: [820, 1170], sandbox: [560, 1300], start: [120, 1240], finish: [960, 1240], track: [540, 1240] } },
  stage: { floor: 1240, spots: { centre: [540, 1110], left: [300, 1130], right: [780, 1130], audience: [[200, 1560], [430, 1590], [660, 1590], [890, 1560]] } },
}
function academySky(ctx, t, top = '#2a1d5c', bot = '#ff9fb8') {
  const g = ctx.createLinearGradient(0, 0, 0, 1300); g.addColorStop(0, top); g.addColorStop(0.7, mixHex(top, bot, 0.6)); g.addColorStop(1, bot)
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  for (const [sx, sy, ph, s] of NEB_STARS) { if (sy > 900) continue; ctx.globalAlpha = 0.3 + 0.6 * Math.max(0, Math.sin(t * 1.3 + ph * 20)); rect(ctx, sx, sy, s, s, '#fffaf0') }
  ctx.globalAlpha = 1
}
function banner(ctx, t, x, y, w, text, col = '#ff8fb1') {
  const sway = Math.sin(t * 1.5) * 3
  rect(ctx, x - w / 2 - 6, y - 6 + sway, w + 12, 72, INK); rect(ctx, x - w / 2, y + sway, w, 60, col); rect(ctx, x - w / 2, y + sway, w, 8, mixHex(col, '#ffffff', 0.4))
  for (const s of [-1, 1]) { rect(ctx, x + s * (w / 2 + 2) - 12, y + 54 + sway, 24, 24, INK); rect(ctx, x + s * (w / 2 + 2) - 8, y + 54 + sway, 16, 18, col) }
  ctx.font = `800 34px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '4px'
  ctx.fillStyle = INK; ctx.fillText(text, x + 2, y + 33 + sway); ctx.fillStyle = '#fffaf0'; ctx.fillText(text, x, y + 31 + sway)
  ctx.letterSpacing = '0px'
}
function crestStar(ctx, x, y, s, t) { glowAt(ctx, x, y, s * 2, '#ffd36e', 0.6); pixStar(ctx, x, y, s / 3, '#ffd36e'); rect(ctx, x - s / 6, y - s / 6, s / 3, s / 3, '#fffbea') }
export function drawAcademy(ctx, t, { room = 'hall', dim = 0, light = 1, banner: showBanner = true } = {}) {
  if (room === 'hall') {
    rect(ctx, 0, 0, 1080, 1920, '#3b2f6e')
    // back wall: two-tone, wainscot, lockers
    rect(ctx, 0, 420, 1080, 700, '#5a4a9a'); rect(ctx, 0, 820, 1080, 300, '#4a3c86'); rect(ctx, 0, 812, 1080, 10, '#ffd36e')
    const LC = ['#ff9ec7', '#9fe0ff', '#ffd36e', '#b6f0a8', '#c9a6ff', '#ffb38a']
    for (let i = 0; i < 12; i++) {
      if (i >= 5 && i <= 6) continue
      const lx = 20 + i * 88, col = LC[i % 6]
      rect(ctx, lx, 760, 84, 400, INK); rect(ctx, lx + 6, 766, 72, 388, col); rect(ctx, lx + 6, 766, 72, 10, mixHex(col, '#ffffff', 0.4))
      for (let k = 0; k < 3; k++) rect(ctx, lx + 18, 790 + k * 14, 48, 6, mixHex(col, '#1b0f36', 0.35))
      rect(ctx, lx + 60, 960, 10, 30, mixHex(col, '#1b0f36', 0.5))
      // a sticker on some lockers
      if (i % 3 === 1) pixStar(ctx, lx + 42, 1060, 5, '#fffbea')
    }
    // the classroom door in the middle
    rect(ctx, 432, 640, 216, 520, INK); rect(ctx, 444, 652, 192, 508, '#a8724a'); rect(ctx, 444, 652, 192, 12, '#c98f5f')
    rect(ctx, 470, 690, 140, 120, '#9fe0ff'); rect(ctx, 470, 690, 140, 14, '#d8f4ff'); rect(ctx, 600, 920, 18, 18, '#ffd36e')
    crestStar(ctx, 540, 590, 36, t)
    // floor: checker
    const F = ACADEMY.hall.floor - 170
    for (let j = 0; j < 14; j++) for (let i = 0; i < 12; i++) rect(ctx, i * 90 + (j % 2 ? 45 : 0) - 45, F + j * 60, 90, 60, (i + j) % 2 ? '#e8def7' : '#c9b8ea')
    rect(ctx, 0, F, 1080, 8, INK)
    // windows above, with stars
    for (const wx of [110, 860]) { rect(ctx, wx - 6, 430, 132, 220, INK); rect(ctx, wx, 436, 120, 208, '#1d1650'); rect(ctx, wx + 58, 436, 6, 208, INK); rect(ctx, wx, 536, 120, 6, INK); pixStar(ctx, wx + 30, 480, 4, '#fffbea'); pixStar(ctx, wx + 90, 590, 3, '#fffbea') }
    if (showBanner) banner(ctx, t, 540, 470, 520, 'ZODIAC ACADEMY')
  } else if (room === 'class') {
    rect(ctx, 0, 0, 1080, 1920, '#5c4aa0')
    rect(ctx, 0, 0, 1080, 380, '#4a3c88'); rect(ctx, 0, 1000, 1080, 920, '#c79a6a')
    for (let j = 0; j < 16; j++) rect(ctx, 0, 1000 + j * 60, 1080, 4, '#a87c52')
    // the chalkboard
    rect(ctx, 150, 470, 780, 440, '#8a5a3a'); rect(ctx, 166, 486, 748, 408, '#1f4a3c'); rect(ctx, 166, 486, 748, 10, '#2a5e4c')
    rect(ctx, 166, 894, 748, 14, '#b88a5c')
    // chalk constellations: Aries + Leo doodles, "★ + ★ = ★★", an apple
    ctx.globalAlpha = 0.8
    const chalk = '#e8f2ea'
    const dots = [[260, 600], [330, 560], [380, 590], [420, 650], [620, 560], [680, 600], [740, 580], [790, 640], [700, 700]]
    ctx.strokeStyle = chalk; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(260, 600); ctx.lineTo(330, 560); ctx.lineTo(380, 590); ctx.lineTo(420, 650)
    ctx.moveTo(620, 560); ctx.lineTo(680, 600); ctx.lineTo(740, 580); ctx.lineTo(790, 640); ctx.lineTo(700, 700); ctx.lineTo(680, 600); ctx.stroke()
    for (const [dx, dy] of dots) rect(ctx, dx - 5, dy - 5, 10, 10, chalk)
    ctx.font = `700 40px ${MONO}`; ctx.textAlign = 'center'; ctx.fillStyle = chalk; ctx.fillText('★ + ★ = ★★', 540, 820)
    ctx.globalAlpha = 1
    rect(ctx, 820, 870, 40, 14, '#fffaf0'); rect(ctx, 760, 874, 30, 10, '#ff9ec7')
    // the window on space (right) and the clock (left)
    rect(ctx, 960, 470, 120, 300, INK); rect(ctx, 968, 478, 112, 284, '#140f3a'); pixStar(ctx, 1010, 540, 4, '#fffbea'); blob(ctx, 1040, 680, 26, 4, '#e9b24a')
    rect(ctx, 30, 520, 100, 100, INK); blob(ctx, 80, 570, 42, 4, '#fffaf0'); rect(ctx, 78, 540, 4, 32, INK); rect(ctx, 78, 568, 22, 4, INK)
    // alphabet / zodiac banner strip
    const GL = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
    ctx.font = `700 30px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`; ctx.textBaseline = 'middle'
    GL.forEach((g, i) => { const bx = 60 + i * 82; rect(ctx, bx, 400, 66, 50, ['#ff9ec7', '#ffd36e', '#9fe0ff', '#b6f0a8'][i % 4]); ctx.fillStyle = INK; ctx.fillText(g + '︎', bx + 33, 427) })
    // desks
    for (const [dx, dy] of ACADEMY.class.spots.desks) {
      rect(ctx, dx - 130, dy + 40, 260, 26, INK); rect(ctx, dx - 124, dy + 44, 248, 18, '#e8b878'); rect(ctx, dx - 124, dy + 44, 248, 5, '#ffd8a0')
      rect(ctx, dx - 116, dy + 66, 14, 90, INK); rect(ctx, dx + 102, dy + 66, 14, 90, INK)
    }
  } else if (room === 'yard') {
    academySky(ctx, t, '#2c2470', '#ffb0a8')
    // distant academy building
    rect(ctx, 340, 640, 400, 300, '#5a4a9a'); rect(ctx, 320, 620, 440, 30, INK); rect(ctx, 500, 540, 80, 100, '#5a4a9a'); crestStar(ctx, 540, 520, 30, t)
    for (let i = 0; i < 4; i++) rect(ctx, 370 + i * 95, 700, 60, 70, '#ffd36e')
    // grass + the fence
    rect(ctx, 0, 940, 1080, 980, '#7fcf8a'); rect(ctx, 0, 940, 1080, 12, '#a6e6a4')
    for (let i = 0; i < 18; i++) { rect(ctx, i * 64, 880, 14, 80, '#fffaf0'); rect(ctx, i * 64 - 2, 876, 18, 8, INK) }
    rect(ctx, 0, 900, 1080, 10, '#fffaf0'); rect(ctx, 0, 930, 1080, 10, '#fffaf0')
    // the race lane
    rect(ctx, 0, 1210, 1080, 90, '#e88a6a'); for (let i = 0; i < 12; i++) rect(ctx, i * 100 + 20, 1250, 50, 8, '#fffaf0')
    // slide (left)
    const [sx, sy] = ACADEMY.yard.spots.slideTop
    rect(ctx, sx - 160, sy - 20, 18, 340, INK); rect(ctx, sx - 60, sy - 20, 18, 340, INK)
    for (let k = 0; k < 7; k++) rect(ctx, sx - 160, sy + 20 + k * 44, 118, 10, '#bfa8dc')
    rect(ctx, sx - 170, sy - 30, 140, 24, '#ff6f8a')
    for (let k = 0; k < 10; k++) rect(ctx, sx - 40 + k * 24, sy - 20 + k * 30, 46, 24, k % 2 ? '#ffd36e' : '#ffc23e')
    // swings (right)
    const [wx, wy] = ACADEMY.yard.spots.swings
    rect(ctx, wx - 150, 760, 300, 20, INK); rect(ctx, wx - 150, 760, 18, 450, INK); rect(ctx, wx + 132, 760, 18, 450, INK)
    for (const s of [-1, 1]) { const sw = Math.sin(t * 2 + s) * 0.18; const ax = wx + s * 60, len = 280; const bx = ax + Math.sin(sw) * len, by = 780 + Math.cos(sw) * len; ctx.strokeStyle = '#efe6d6'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(ax - 20, 780); ctx.lineTo(bx - 20, by); ctx.moveTo(ax + 20, 780); ctx.lineTo(bx + 20, by); ctx.stroke(); rect(ctx, bx - 32, by, 64, 12, '#9fe0ff') }
    // sandbox (front centre)
    const [bx, by] = ACADEMY.yard.spots.sandbox
    rect(ctx, bx - 190, by + 20, 380, 120, INK); rect(ctx, bx - 182, by + 28, 364, 104, '#a8724a'); rect(ctx, bx - 166, by + 40, 332, 84, '#f2d38e')
    rect(ctx, bx + 80, by + 50, 30, 30, '#ff6f8a'); rect(ctx, bx + 84, by + 40, 22, 12, '#ff6f8a')
  } else if (room === 'stage') {
    rect(ctx, 0, 0, 1080, 1920, '#1a0f30')
    // back curtain + side curtains
    for (let i = 0; i < 27; i++) rect(ctx, i * 40, 200, 40, 1060, i % 2 ? '#8a1f3a' : '#a82a4a')
    for (const s of [0, 1]) for (let i = 0; i < 5; i++) { const x0 = s ? 1080 - (i + 1) * 40 : i * 40; rect(ctx, x0, 160, 40, 1120, i % 2 ? '#b8304e' : '#d13c5c') }
    rect(ctx, 0, 160, 1080, 90, '#d13c5c'); for (let i = 0; i < 18; i++) blob(ctx, 30 + i * 60, 250, 30, 6, '#d13c5c'); rect(ctx, 0, 160, 1080, 12, '#ffd36e')
    // spotlight cone
    if (light > 0) {
      ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.28 * light
      const g = ctx.createLinearGradient(0, 200, 0, 1240); g.addColorStop(0, 'rgba(255,240,200,0.2)'); g.addColorStop(1, 'rgba(255,240,200,0.9)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(500, 200); ctx.lineTo(580, 200); ctx.lineTo(760, 1240); ctx.lineTo(320, 1240); ctx.closePath(); ctx.fill()
      ctx.restore()
      ctx.globalAlpha = 0.5 * light; ctx.fillStyle = '#fff2c8'; ctx.beginPath(); ctx.ellipse(540, 1240, 230, 40, 0, 0, TAU); ctx.fill(); ctx.globalAlpha = 1
    }
    // the stage boards + footlights
    rect(ctx, 0, 1240, 1080, 200, '#a8724a'); for (let j = 0; j < 5; j++) rect(ctx, 0, 1240 + j * 40, 1080, 4, '#86583a')
    rect(ctx, 0, 1232, 1080, 12, INK)
    for (let i = 0; i < 9; i++) { const fx = 80 + i * 115; glowAt(ctx, fx, 1440, 50, '#ffd36e', 0.7); rect(ctx, fx - 20, 1430, 40, 20, '#ffd36e') }
    rect(ctx, 0, 1450, 1080, 470, '#120a24')
    if (showBanner) banner(ctx, t, 540, 300, 520, 'SHOW AND TELL', '#ffd36e')
  }
  if (dim > 0) { ctx.fillStyle = `rgba(20,10,40,${clamp(dim)})`; ctx.fillRect(0, 0, 1080, 1920) }
}

// ─────────────────────────────────────────────── the crayon border + captions
const CRAYONS = ['#ff6f8a', '#ffd36e', '#7fd8ff', '#9be08a', '#c9a6ff', '#ffa86a']
function crayonLine(ctx, x0, y0, x1, y1, col, w, seed, frame) {
  const r = rng(seed * 97 + frame * 7919)
  const n = Math.max(3, Math.round(Math.hypot(x1 - x0, y1 - y0) / 40))
  const nx = -(y1 - y0), ny = x1 - x0, nl = Math.hypot(nx, ny) || 1
  for (let pass = 0; pass < 2; pass++) {
    ctx.strokeStyle = col; ctx.globalAlpha = pass ? 0.5 : 0.9; ctx.lineWidth = w * (pass ? 0.55 : 1); ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.beginPath()
    for (let k = 0; k <= n; k++) {
      const f = k / n, j = (r() - 0.5) * w * 0.9 + (pass ? (r() - 0.5) * w : 0)
      const px_ = lerp(x0, x1, f) + nx / nl * j, py = lerp(y0, y1, f) + ny / nl * j
      k ? ctx.lineTo(px_, py) : ctx.moveTo(px_, py)
    }
    ctx.stroke()
  }
  // waxy speckle: knock a few gaps out of the stroke
  ctx.globalAlpha = 0.35; ctx.fillStyle = '#ffffff'
  for (let k = 0; k < n * 2; k++) { const f = r(); ctx.fillRect(lerp(x0, x1, f) + (r() - 0.5) * w, lerp(y0, y1, f) + (r() - 0.5) * w, 2, 2) }
  ctx.globalAlpha = 1
}
function doodle(ctx, kind, x, y, s, col, frame, seed) {
  const r = rng(seed * 31 + frame * 13), j = () => (r() - 0.5) * s * 0.08
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = Math.max(3, s * 0.1); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha = 0.85
  ctx.beginPath()
  if (kind === 'star') for (let k = 0; k <= 5; k++) { const a = -Math.PI / 2 + k * 4 * Math.PI / 5; const px_ = x + Math.cos(a) * s / 2 + j(), py = y + Math.sin(a) * s / 2 + j(); k ? ctx.lineTo(px_, py) : ctx.moveTo(px_, py) }
  else if (kind === 'heart') { ctx.moveTo(x + j(), y + s * 0.4); ctx.bezierCurveTo(x - s * 0.7, y - s * 0.1, x - s * 0.3, y - s * 0.6, x + j(), y - s * 0.15); ctx.bezierCurveTo(x + s * 0.3, y - s * 0.6, x + s * 0.7, y - s * 0.1, x + j(), y + s * 0.4) }
  else if (kind === 'sun') { ctx.arc(x + j(), y + j(), s * 0.25, 0, TAU); for (let k = 0; k < 8; k++) { const a = k * TAU / 8; ctx.moveTo(x + Math.cos(a) * s * 0.36, y + Math.sin(a) * s * 0.36); ctx.lineTo(x + Math.cos(a) * s * 0.52 + j(), y + Math.sin(a) * s * 0.52 + j()) } }
  else if (kind === 'spiral') for (let k = 0; k < 40; k++) { const a = k * 0.45, rr = s * 0.02 + k * s * 0.012; const px_ = x + Math.cos(a) * rr + j(), py = y + Math.sin(a) * rr + j(); k ? ctx.lineTo(px_, py) : ctx.moveTo(px_, py) }
  else if (kind === 'moon') { ctx.arc(x, y, s * 0.4, 0.6, TAU - 0.6 + 0.4); ctx.arc(x + s * 0.18, y - s * 0.04, s * 0.3, TAU - 0.4, 0.9, true) }
  ctx.stroke(); ctx.restore()
}
export function drawCrayonFrame(ctx, t, { alpha = 1, colors = CRAYONS, inset = 58, doodles = true } = {}) {
  if (alpha <= 0) return
  const frame = Math.floor(t * 8) % 3
  const W_ = 1080, H_ = 1920, i0 = inset
  ctx.save(); ctx.globalAlpha = alpha
  // stops short of the corners: cardFrame's corner stars live within ~150 px of each corner; the seed constellation
  // sits top-left within ~230 px
  const segs = [
    [270, i0, W_ - 180, i0], [W_ - i0, 190, W_ - i0, H_ / 2 - 50], [W_ - i0, H_ / 2 + 50, W_ - i0, H_ - 190],
    [W_ - 180, H_ - i0, W_ / 2 + 150, H_ - i0], [W_ / 2 - 150, H_ - i0, 180, H_ - i0], [i0, H_ - 190, i0, H_ / 2 + 50], [i0, H_ / 2 - 50, i0, 260],
  ]
  segs.forEach(([a, b, c, d], k) => {
    const half = [lerp(a, c, 0.5), lerp(b, d, 0.5)]
    crayonLine(ctx, a, b, half[0], half[1], colors[k % colors.length], 9, k * 2 + 1, frame)
    crayonLine(ctx, half[0], half[1], c, d, colors[(k + 3) % colors.length], 9, k * 2 + 2, frame)
  })
  if (doodles) {
    ctx.globalAlpha = alpha
    doodle(ctx, 'star', W_ - i0 - 4, H_ / 2, 52, colors[1], frame, 1)
    doodle(ctx, 'heart', i0 + 4, H_ / 2, 48, colors[0], frame, 2)
    doodle(ctx, 'sun', W_ / 2, H_ - i0 - 2, 56, colors[1], frame, 3)
    doodle(ctx, 'spiral', W_ - 140, i0 + 2, 40, colors[4], frame, 4)
  }
  ctx.restore()
}
function crayonText(ctx, text, x, y, size, col, frame, { align = 'center', font = `800 ${size}px ${INTER}`, outline = INK } = {}) {
  const r = rng(frame * 53 + text.length)
  ctx.font = font; ctx.textAlign = align; ctx.textBaseline = 'middle'
  ctx.lineJoin = 'round'
  if (outline) { ctx.strokeStyle = outline; ctx.lineWidth = size * 0.16; ctx.strokeText(text, x, y + size * 0.03) }
  for (let k = 0; k < 3; k++) { ctx.globalAlpha = k ? 0.45 : 1; ctx.fillStyle = k === 2 ? mixHex(col, '#ffffff', 0.4) : col; ctx.fillText(text, x + (r() - 0.5) * size * 0.05, y + (r() - 0.5) * size * 0.05) }
  ctx.globalAlpha = 1
}
export function ageCaption(ctx, t, { text = 'AGE 3 ½', at = 0, out = null, x = 540, y = 1660, color = '#ffd36e', size = 64, rot = -0.04, sub = null } = {}) {
  if (t < at || (out != null && t > out + 0.25)) return null
  const kIn = easeOutBack(prog(t, at, at + 0.35), 2.2), kOut = out == null ? 1 : 1 - inBack(prog(t, out, out + 0.25))
  const k = kIn * kOut
  if (k <= 0.01) return null
  const frame = Math.floor(t * 8) % 3
  ctx.save(); ctx.font = `800 ${size}px ${INTER}`
  const tw = ctx.measureText(text).width, w = tw + size * 1.1, h = size * (sub ? 1.95 : 1.45)
  ctx.translate(x, y); ctx.rotate(rot + Math.sin(t * 2) * 0.006); ctx.scale(k, k)
  // torn paper scrap with tape
  const r = rng(7 + text.length)
  ctx.fillStyle = 'rgba(10,6,24,0.35)'; ctx.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  ctx.fillStyle = '#fffaf0'; ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2)
  for (let k2 = 0; k2 <= 12; k2++) ctx.lineTo(-w / 2 + w * k2 / 12, -h / 2 + (r() - 0.5) * 8)
  for (let k2 = 0; k2 <= 12; k2++) ctx.lineTo(w / 2 - w * k2 / 12, h / 2 + (r() - 0.5) * 8)
  ctx.closePath(); ctx.fill()
  ctx.fillStyle = 'rgba(255,211,110,0.6)'; ctx.save(); ctx.rotate(-0.3); ctx.fillRect(-w / 2 - 20, -h / 2 - 6, 90, 30); ctx.restore()
  // the scribble-in: a crayon underline that draws on
  const draw = prog(t, at, at + 0.5)
  ctx.strokeStyle = color; ctx.lineWidth = size * 0.12; ctx.lineCap = 'round'; ctx.globalAlpha = 0.7
  ctx.beginPath(); ctx.moveTo(-tw / 2, (sub ? -h * 0.06 : h * 0.3)); ctx.lineTo(-tw / 2 + tw * draw, (sub ? -h * 0.06 : h * 0.3) + Math.sin(draw * 9) * 3); ctx.stroke(); ctx.globalAlpha = 1
  crayonText(ctx, text, 0, sub ? -h * 0.2 : 0, size, color, frame, { outline: INK })
  if (sub) { ctx.font = `700 ${R(size * 0.36)}px ${MONO}`; ctx.fillStyle = '#6a5a8a'; ctx.textAlign = 'center'; ctx.letterSpacing = '3px'; ctx.fillText(sub, 0, h * 0.26); ctx.letterSpacing = '0px' }
  ctx.restore()
  return { w, h }
}
export function ageCaptionCues(at, { gain = 0.03 } = {}) {
  return [['whoosh', r3(at), 0.25, gain * 0.6], ...[0, 0.08, 0.16, 0.26, 0.34].map(d => ['tick', r3(at + d), gain * 0.6]), ['pop', r3(at + 0.1), 988, gain, 0]]
}
export function drawHomeVideo(ctx, t, { label = 'PLAY', counter = true, x0 = 90, y0 = 250, alpha = 1, date = null } = {}) {
  if (alpha <= 0) return
  ctx.save(); ctx.globalAlpha = alpha
  ctx.font = `700 30px ${MONO}`; ctx.textBaseline = 'middle'
  const sh = (s, x, y, al = 'left', col = '#fffaf0') => { ctx.textAlign = al; ctx.fillStyle = 'rgba(10,6,24,0.6)'; ctx.fillText(s, x + 3, y + 3); ctx.fillStyle = col; ctx.fillText(s, x, y) }
  const blink = Math.floor(t * 1.6) % 2 === 0
  sh((label === 'PLAY' ? '▶ ' : label === 'REC' ? (blink ? '● ' : '  ') : '') + label, x0, y0, 'left', label === 'REC' ? '#ff5d73' : '#fffaf0')
  if (counter) {
    const s = Math.floor(t), m = Math.floor(s / 60)
    sh(`SP  0:${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, 1080 - x0, y0, 'right')
  }
  if (date) sh(date, 1080 - x0, 1920 - y0 + 20, 'right', '#ffb35c')
  ctx.restore()
}

// ─────────────────────────────────────────────── the growUp morph
export function growUp(ctx, t, { sign = 'aries', at = 0, x = 540, y = 1000, size = 260, mood = 'happy', toMood = 'happy', fromAge = 'kid', look, caption = null, seed = 1, kidOpts = {}, adultOpts = {} } = {}) {
  const d = t - at, ks = kidSign(sign)
  const kidSize = size * 0.82
  if (d < 0) return { ...drawBabyStar(ctx, x, y, kidSize, t, { sign, age: fromAge, mood, look, seed, ...kidOpts }), k: 0 }
  const adult = (s, extra = {}) => drawStarChar(ctx, x, y, s, t, { color: ks.base, glyph: ks.glyph, mood: toMood, look, seed, ...adultOpts, ...extra })
  if (d >= 1.5) return { ...adult(size), k: 1 }
  let res
  if (d < 0.55) {
    // the wind-up: squash, wiggle, sparkles spiralling in
    const p = d / 0.55
    const sq = 0.18 * Math.sin(p * Math.PI * 3) * (1 - p * 0.3) + 0.1 * p
    res = drawBabyStar(ctx, x + Math.sin(d * 50) * 4 * p, y, kidSize * (1 + 0.08 * p), t, { sign, age: fromAge, mood: 'sparkle', look: [0, -1], seed, squash: sq, ...kidOpts, glow: 1 + p })
  } else if (d < 0.85) {
    const p = (d - 0.55) / 0.3
    if (p < 0.5) res = drawBabyStar(ctx, x, y, kidSize * (1.08 + 0.2 * p), t, { sign, age: fromAge, mood: 'sparkle', seed, ...kidOpts, glow: 1.5, squash: -0.15 })
    else res = adult(size * (0.9 + 0.1 * p), { squash: -0.18, mood: 'sparkle' })
  } else {
    const p = (d - 0.85) / 0.65
    const sq = 0.22 * Math.exp(-p * 5) * Math.cos(p * 18)
    res = adult(size * (1 + 0.06 * Math.exp(-p * 4)), { squash: sq })
  }
  // sparkles spiralling in, the flash, the shockwave rings
  ctx.save()
  const cyc = y - size * 0.05
  if (d < 0.85) {
    const p = d / 0.85
    for (let k = 0; k < 14; k++) {
      const a = k * TAU / 14 + d * 7, rr = size * (1.3 - p * 1.0) * (0.8 + 0.2 * Math.sin(k * 3))
      ctx.globalAlpha = 0.9 * Math.sin(Math.PI * p)
      pixStar(ctx, x + Math.cos(a) * rr, cyc + Math.sin(a) * rr, 5, k % 3 ? '#fffbea' : ks.base)
    }
  }
  const fl = 1 - Math.abs(d - 0.7) / 0.22
  if (fl > 0) {
    ctx.globalAlpha = 1
    glowAt(ctx, x, cyc, size * 1.6 * fl + 40, '#fffbea', fl * 1.6)
    ctx.globalAlpha = clamp(fl * 1.1); pixStar(ctx, x, cyc, size * 0.12 * fl, '#ffffff')
  }
  if (d > 0.62 && d < 1.4) {
    const p = (d - 0.62) / 0.78
    for (const [k, col] of [[0, '#fffbea'], [0.18, ks.base]]) {
      const q = clamp(p - k); if (q <= 0 || q >= 1) continue
      ctx.globalAlpha = 1 - q; ctx.strokeStyle = col; ctx.lineWidth = 10 * (1 - q) + 2
      ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.arc(x, cyc, size * (0.4 + 1.3 * ease.outCubic(q)), 0, TAU); ctx.stroke(); ctx.setLineDash([])
    }
  }
  ctx.restore()
  // the caption chip flips from the kid's age to TODAY at the flash
  if (caption) {
    const lbl = d < 0.7 ? caption[0] : caption[1]
    const k = d < 0.7 ? 1 - ease.inCubic(prog(d, 0.55, 0.7)) : easeOutBack(prog(d, 0.7, 0.95), 2)
    if (k > 0.02) {
      ctx.save(); ctx.translate(x, (res.top ?? y - size / 2) - 60); ctx.scale(1, k)
      ctx.font = `700 34px ${MONO}`; const w = ctx.measureText(lbl).width + 44
      rect(ctx, -w / 2 - 5, -29, w + 10, 58, INK); rect(ctx, -w / 2, -24, w, 48, d < 0.7 ? '#fffaf0' : '#ffd36e')
      ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(lbl, 0, 2)
      ctx.restore()
    }
  }
  return { ...res, k: clamp(d / 1.5) }
}
export function growUpCues(at, { gain = 0.03 } = {}) {
  const harp = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]
  return [
    ...harp.map((f, i) => ['pluck', r3(at + 0.06 + i * 0.08), f, gain * 1.1, 0.6, (i - 2.5) * 0.15]),
    ['riser', r3(at), r3(at + 0.65), gain * 2], ['whoosh', r3(at + 0.45), 0.4, gain * 1.2],
    ['boom', r3(at + 0.7), gain * 5], ['bell', r3(at + 0.7), 1567.98, gain * 1.2, 2.2, 0], ['glitter', r3(at + 0.7), r3(at + 1.4)],
    ['pop', r3(at + 0.88), 783.99, gain * 1.2, 0],
  ]
}

// ─────────────────────────────────────────────── extras
export function crayonPow(ctx, t, { text = 'BONK!', at, dur = 0.9, x, y, color = '#ffd36e', size = 72, rot = -0.12 } = {}) {
  if (t < at || t > at + dur) return
  const d = t - at, k = easeOutBack(prog(d, 0, 0.18), 3) * (1 - inBack(prog(d, dur - 0.18, dur)))
  if (k <= 0.01) return
  const frame = Math.floor(t * 8) % 3, r = rng(text.length * 17 + frame)
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot + Math.sin(d * 30) * 0.03 * (1 - prog(d, 0, 0.4))); ctx.scale(k, k)
  ctx.font = `800 ${size}px ${INTER}`
  const w = ctx.measureText(text).width
  // jagged burst
  ctx.beginPath()
  const N = 14
  for (let i = 0; i <= N; i++) { const a = i * TAU / N, rr = (i % 2 ? 0.62 : 0.86) + (r() - 0.5) * 0.1; const px_ = Math.cos(a) * (w * 0.62 + size * 0.3) * rr, py = Math.sin(a) * size * 1.15 * rr; i ? ctx.lineTo(px_, py) : ctx.moveTo(px_, py) }
  ctx.closePath(); ctx.fillStyle = '#fffaf0'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.stroke()
  crayonText(ctx, text, 0, 0, size, color, frame, { outline: INK })
  ctx.restore()
}
export function crayonPowCues(at, { kind = 'bonk', gain = 0.04 } = {}) {
  if (kind === 'bonk') return [['boom', r3(at), gain * 4], ['pop', r3(at), 330, gain * 1.2, 0], ['pop', r3(at + 0.07), 220, gain, 0], ['tick', r3(at), gain * 1.5]]
  if (kind === 'yay') return [['pop', r3(at), 1046.5, gain, -0.2], ['pop', r3(at + 0.08), 1318.51, gain, 0], ['pop', r3(at + 0.16), 1567.98, gain, 0.2], ['glitter', r3(at), r3(at + 0.6)]]
  return [['pop', r3(at), 880, gain, 0], ['tick', r3(at), gain]]
}
export function speedLines(ctx, t, { x, y, dir = -1, len = 220, n = 6, color = '#fffaf0', alpha = 1, spread = 120 } = {}) {
  if (alpha <= 0) return
  ctx.save()
  const f = Math.floor(t * 15)
  for (let i = 0; i < n; i++) {
    const r = rng(i * 31 + f * 7), oy = (i / (n - 1) - 0.5) * spread + (r() - 0.5) * 14
    const l = len * (0.5 + r() * 0.5), ox = 40 + r() * 40
    ctx.globalAlpha = alpha * (0.45 + r() * 0.5)
    rect(ctx, dir < 0 ? x - ox - l : x + ox, y + oy, l, 6, color)
  }
  ctx.restore()
}
export function dustPuffs(ctx, t, { x, y, at, dir = -1, color = '#fff2f6' } = {}) {
  const d = t - at
  if (d < 0 || d > 0.6) return
  ctx.save()
  for (let i = 0; i < 3; i++) {
    const p = d / 0.6, r_ = 14 + i * 6 + p * 20
    ctx.globalAlpha = 1 - p
    blob(ctx, x + dir * (20 + i * 30) * (0.4 + p), y - i * 8 - p * 20, r_, 6, color)
  }
  ctx.restore()
}
export function confetti(ctx, t, { x, y, at, dur = 2, n = 40, spread = 420, colors = CRAYONS } = {}) {
  const d = t - at
  if (d < 0 || d > dur) return
  ctx.save()
  for (let i = 0; i < n; i++) {
    const r = rng(i * 13 + 5), a = -Math.PI / 2 + (r() - 0.5) * 2.2, v = spread * (0.5 + r() * 0.8)
    const px_ = x + Math.cos(a) * v * Math.min(1, d * 2.2) + Math.sin(d * 5 + i) * 10
    const py = y + Math.sin(a) * v * Math.min(1, d * 2.2) + d * d * 180
    ctx.globalAlpha = 1 - prog(d, dur * 0.7, dur)
    const s = 8 + (i % 3) * 3, flipK = Math.abs(Math.sin(d * 9 + i))
    rect(ctx, px_, py, s, Math.max(2, s * flipK), colors[i % colors.length])
  }
  ctx.restore()
}
export function drawStoryPage(ctx, t, { x = 540, y = 820, w = 860, h = 620, open = 1, title = null, art = null } = {}) {
  if (open <= 0.01) return
  const k = easeOutBack(clamp(open), 1.4)
  ctx.save(); ctx.translate(x, y); ctx.scale(clamp(k, 0, 1.2), 1)
  rect(ctx, -w / 2 - 22, -h / 2 - 10, w + 44, h + 40, '#7a3a5a'); rect(ctx, -w / 2 - 22, h / 2 + 18, w + 44, 12, '#5a2a44')
  rect(ctx, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16, INK)
  rect(ctx, -w / 2, -h / 2, w, h, '#fff6e2'); rect(ctx, -6, -h / 2, 12, h, '#e8d6b4'); rect(ctx, -2, -h / 2, 4, h, '#cdb894')
  for (let j = 0; j < 4; j++) rect(ctx, -w / 2 + 6 + j * 2, -h / 2 + 4, 2, h - 8, 'rgba(180,150,110,0.25)')
  rect(ctx, w * 0.28, -h / 2 - 8, 26, h * 0.18, '#ff6f8a'); rect(ctx, w * 0.28, -h / 2 - 8 + h * 0.18, 13, 14, '#ff6f8a'); rect(ctx, w * 0.28 + 13, -h / 2 - 8 + h * 0.18, 13, 8, '#ff6f8a')
  if (art) { ctx.save(); ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.clip(); ctx.translate(-w / 2, -h / 2); art(ctx, w, h, t); ctx.restore() }
  if (title) crayonText(ctx, title, 0, -h / 2 + 50, 40, '#ff6f8a', Math.floor(t * 8) % 3, { outline: null })
  ctx.restore()
}
export function drawRibbon(ctx, x, y, s, t, { place = 1, color = null } = {}) {
  const col = color || ['#ffd36e', '#d6dbe6', '#e0a070'][clamp(place - 1, 0, 2)]
  const c = Math.max(2, R(s / 14)), sw = Math.sin(t * 3 + x) * 0.08
  ctx.save(); ctx.translate(x, y); ctx.rotate(sw)
  for (const sd of [-1, 1]) { rect(ctx, sd * s * 0.12 - s * 0.12, s * 0.2, s * 0.24, s * 0.7, sd < 0 ? '#3f7cf0' : '#2f5fd0'); rect(ctx, sd * s * 0.12 - s * 0.12, s * 0.84, s * 0.24, c * 2, INK) }
  blob(ctx, 0, 0, s * 0.42 + c, c, INK); blob(ctx, 0, 0, s * 0.42, c, mixHex(col, '#ffffff', 0.25)); blob(ctx, 0, 0, s * 0.3, c, col)
  ctx.font = `800 ${R(s * 0.26)}px ${INTER}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  ctx.fillText(['1ST', '2ND', '3RD'][clamp(place - 1, 0, 2)], 0, c * 0.5)
  ctx.restore()
}
