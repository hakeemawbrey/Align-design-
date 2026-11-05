// startalk — the STAR TALK cast + its retro RPG dialogue box (promo/films/STARTALK.md). Owned by the starhello agent.
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
//
// drawStarChar(ctx, x, y, size, t, opts)   draws one pixel five-pointed-star character centred on (x, y). size = sprite px
//   (about 160–360 for a hero; 60–120 for a crowd). Crisp pixels (a 36-cell chubby ★ sprite scaled with smoothing off) + a soft glow + twinkles.
//   opts (all optional):
//     color   body colour (hex). STAR.sky (warm gold) is "the stars" narrator; signStar('scorpio') → { color, glyph }.
//     glyph   small coin badge pinned on the lower-right point, e.g. '♏' (null = no badge; skip it below ~120 px).
//     mood    'neutral' | 'happy' (^ ^) | 'wink' | 'squint' | 'wide' (surprised: whites + pupils) | 'heart' (beating)
//             | 'eyeroll' (pupils up, sweeping) | 'sleepy' (– – plus rising pixel z's) | 'sparkle' (big glossy soft eyes)
//     look    [x, y] in −1…1: where the pupils point (snapped to whole pixels). [0, 0] = straight at you.
//             Omit it for idle glances (a slow deterministic wander, per seed).
//     blink   undefined/true → automatic natural blinks (every ~2.5–4.5 s, per seed). false → never.
//             a number 0…1 → forced lid closure (1 = shut), e.g. for a wake-up flutter.
//     bob     idle float amplitude in px (default size·0.035; 0 = still).
//     squash  extra squash (+ wide/short) or stretch (− tall/thin), e.g. 0.15. Anchored at the star's base.
//     hops    array of times (s): a talk-hop at each (lift + stretch + landing squash). Use talkHops(lines, speaker).
//     seed    integer, to de-sync blinks/glances/bob in a crowd (default 1).
//     glow    glow strength 0…1.5 (default 1).   alpha  0…1.   pop  0…1 scale (use easeOutBack for pop-ins).
//     blush   true/false/0…1 cheek pixels (default: on for happy, wink, heart, sparkle).
//     zzz     sleepy z's on/off (default true).   tips  tip + floating twinkles on/off (default true).
//   Returns { x, y, size, top } (top = y of the upper tip, handy for placing things above it).
//   Pure f(t): no state, safe to call any number of times per frame, any frame order.
//
// dialogueBox(parent, { lines, y = 1380, width = 960, height = 300, open, close, cps = 28, size = 52 })
//   A DOM retro RPG panel: pixel border (gold + bone hairline, stepped corners) on dark glass, a name tag top-left,
//   typewriter text, a blinking ▼ when a line is done, an open pop and a close pop.  Create it inside your scene's build
//   (AFTER fonts load: Space Mono 700) and call box.update(t) every frame.
//     lines   [{ t, speaker, text, color? }]  t = when typing starts. A line stays until the next line's t (or close).
//             speaker = the name tag ('THE STARS', '♏ SCORPIO STAR'); a change of speaker re-pops the tag.
//             text: '*word*' = accent colour (line.color || gold). Keep each line ≤ ~3 rows (~27 chars per row at 52 px).
//     open    when the box pops open (default first t − 0.22).  close  when it pops shut (default last done + 1.8).
//     cps     typing speed (chars/s; punctuation adds small pauses).
//   Returns { root, update(t), times } where times = lineTimes(lines, { cps }).
//   Readability rule (brief): leave ≥ 1.5 s between a line's times[i].done and the next line / close.
//
// lineTimes(lines, { cps = 28 }) → [{ start, done, end?, chars: [t per char] }]  the exact typing schedule (pure).
// talkCues(lines, { cps = 28, every = 2, gain = 0.018, pitch = { speaker: hz } }) → sound cues for promo/scripts/synth.mjs:
//   one soft chiptune blip per `every` letters (['pop', t, hz, gain, pan], pitch varied per speaker and a little per blip),
//   a tiny 'tick' when each line finishes (the ▼). Spread into your CUES.
// talkHops(lines, speaker, { cps = 28, gap = 0.34 }) → hop times for that speaker's lines (line start + roughly every
//   other word, never closer than `gap`). Pass as drawStarChar({ hops }).
// STAR = { sky, bone, ink }   signStar(id) → { color, glyph } from wheel.js SIGNS.
//
// Example:
//   const LINES = [{ t: 3, speaker: 'THE STARS', text: 'psst. up here.' }, { t: 5, speaker: 'THE STARS', text: 'we see you.' }]
//   const box = dialogueBox(root, { lines: LINES })               // in build, after fonts
//   const HOPS = talkHops(LINES, 'THE STARS')
//   update(t) { drawStarChar(x, 540, 980, 340, t, { color: STAR.sky, mood: 'happy', look: [0, 0], hops: HOPS }); box.update(t) }
//   CUES = [...talkCues(LINES), ...]
//
// Nothing touches `document` at module top level (the sound build imports this through scenes/index.js in node).
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, el, rng, noise1, hexToRgb } from '../src/lib.js'
import { SIGNS, easeOutBack } from './wheel.js'

export const STAR = { sky: '#f7cf68', bone: '#efe6d6', ink: '#1b1236' }
export const signStar = id => { const s = SIGNS.find(x => x.id === id); return { color: s.color, glyph: s.glyph } }

const GOLD = '#f2c75c', BONE = '#efe6d6', INK = STAR.ink
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const TAU = Math.PI * 2

// ─────────────────────────────────────────────── colour helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const lum = hex => { const [r, g, b] = hexToRgb(hex); return (0.299 * r + 0.587 * g + 0.114 * b) / 255 }
const PAL = new Map()
/** a glowing-toy palette from any colour: the body is lifted toward warm white (more for darker colours) so every sign
 *  reads as a lit star, and the true sign colour comes back as the shade band + rim */
function palette(color) {
  if (PAL.has(color)) return PAL.get(color)
  const lift = clamp((0.78 - lum(color)) * 0.75, 0.1, 0.5)
  const body = mixHex(color, '#fff3dc', lift)
  const p = {
    base: color,
    body,
    core: mixHex(body, '#fffbea', 0.2),
    light: mixHex(body, '#fffbea', 0.5),
    hi: '#fffef6',
    shade: mixHex(color, '#a02a6c', 0.14),
    deep: mixHex(color, '#4a1660', 0.42),
    line: mixHex(color, '#140a2e', 0.74),
    blush: mixHex(color, '#ff5c8e', 0.72),
  }
  PAL.set(color, p); return p
}

// ─────────────────────────────────────────────── the body: a chubby five-pointed star on a 36-cell grid
const G = 36, HALF = G / 2
const SC = { x: HALF, y: 19.6, R: 17.6, r: 9.4, round: 2.6 }   // centre, outer/inner radius (after rounding), tip rounding
const TOP_ROW = SC.y - SC.R                                       // the upper tip (cells)
const FOOT_ROW = SC.y + SC.R * Math.cos(Math.PI / 5)             // the two lower tips: squash anchor
function starPoly() {
  const V = [], R0 = SC.R - SC.round, r0 = SC.r - SC.round * 0.55
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? r0 : R0
    V.push([SC.x + Math.cos(a) * rr, SC.y + Math.sin(a) * rr])
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
let BODY = null
/** per cell: inside mask + a shading tone (0 body, 1 core, 2 light, 3 shade, 4 deep) — computed once */
function bodyMask() {
  if (BODY) return BODY
  const V = starPoly(), sd = (x, y) => sdPoly(x, y, V) - SC.round
  const m = new Uint8Array(G * G), tone = new Uint8Array(G * G)
  const Lx = -0.62, Ly = -0.78                                   // light from the upper-left
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    const x = i + 0.5, y = j + 0.5, d = sd(x, y)
    if (d > 0) continue
    m[j * G + i] = 1
    const e = 0.35, nx = sd(x + e, y) - sd(x - e, y), ny = sd(x, y + e) - sd(x, y - e), nl = Math.hypot(nx, ny) || 1
    const facing = (nx * Lx + ny * Ly) / nl                       // +1: edge faces the light, −1: faces away
    const rc = Math.hypot(x - SC.x, y - SC.y)
    let tn = 0
    if (d > -1.15 && facing < -0.25) tn = 4
    else if (d > -2.1 && facing < -0.12) tn = 3
    else if (d > -1.3 && facing > 0.3) tn = 2
    tone[j * G + i] = tn
  }
  BODY = { m, tone }; return BODY
}
const inM = (m, i, j) => i >= 0 && j >= 0 && i < G && j < G && m[j * G + i] === 1

// ─────────────────────────────────────────────── eyes (bitmaps: X ink, W white glint, w sclera, H heart)
const BM = s => s.trim().split(/\s+/)
const EYES = {
  open: BM(`.XXXX. XWWXXX XWWXXX XWXXXX XXXXXX XXXXXX XXXXWX .XXXX.`),
  half: BM(`...... ...... ...... ...... XXXXXX XWXXXX XXXXXX .XXXX.`),
  shut: BM(`...... ...... ...... ...... ...... XXXXXX .XXXX. ......`),
  happy: BM(`...... ...... .XXXX. XXXXXX XX..XX X....X ...... ......`),
  sleepy: BM(`...... ...... ...... ...... XX..XX .XXXX. ...... ......`),
  squint: BM(`...... ...... ...... XXXXXX XXXXXX XWXXXX .XXXX. ......`),
  sparkle: BM(`..XXX.. .XXXXX. XWWXXXX XWWXXXX XWXXXXX XXXXXXX XXXXXWX .XXXWX. ..XXX..`),
  sclera: BM(`.XXXX. XwwwwX XwwwwX XwwwwX XwwwwX XwwwwX XwwwwX .XXXX.`),
  heartBig: BM(`.HH.HH. HWHHHHH HHHHHHH HHHHHHH .HHHHH. ..HHH.. ...H...`),
  heartSmall: BM(`....... ....... .HH.HH. .HWHHH. .HHHHH. ..HHH.. ...H...`),
}
const EYE_Y = 19.2, EYE_X = 13.4         // left eye centre (cells); the right eye mirrors around HALF
const CHEEK_Y = 23, CHEEKS = [10, 11, 12, 23, 24, 25]

/** natural blink closure 0…1 at time t (deterministic per seed): blinks every ~2.5–4.5 s, sometimes a double blink */
function autoBlink(t, seed) {
  const r = rng(seed * 7919 + 13)
  let at = 0.6 + r() * 2.2
  while (at < t + 1) {
    const dt = t - at
    if (dt >= 0 && dt < 0.2) return dt < 0.05 ? 0.5 : dt < 0.13 ? 1 : 0.5
    if (r() < 0.22) { const d2 = dt - 0.26; if (d2 >= 0 && d2 < 0.18) return d2 < 0.05 ? 0.5 : d2 < 0.12 ? 1 : 0.5 }
    at += 2.4 + r() * 2.1
  }
  return 0
}
/** idle glance: holds a direction, darts to the next (snapped later to whole cells) */
function autoLook(t, seed) {
  const seg = 1.9, k = Math.floor(t / seg + seed * 0.37), f = t / seg + seed * 0.37 - k
  const pick = n => { const r = rng(seed * 131 + n * 17); r(); const a = r(); return a < 0.45 ? [0, 0] : a < 0.62 ? [-1, 0] : a < 0.79 ? [1, 0] : a < 0.9 ? [-1, -1] : [1, -1] }
  return f < 0.9 ? pick(k) : pick(k + 1)
}

let BUF = null
function buffer() {
  if (BUF) return BUF
  const c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(G, G) : Object.assign(document.createElement('canvas'), { width: G, height: G })
  BUF = { c, x: c.getContext('2d') }
  return BUF
}

// the five tips (cells), clockwise from the top; the badge sits on the lower-right one
const TIPS = Array.from({ length: 5 }, (_, k) => { const a = -Math.PI / 2 + k * TAU / 5, rr = SC.R - 1.3; return [Math.floor(SC.x + Math.cos(a) * rr), Math.floor(SC.y + Math.sin(a) * rr)] })
const BADGE = { x: 27.6, y: 29.4, r: 4.3 }

/** paint the sprite for this frame into the G×G buffer */
function paintSprite(t, P, mood, lx, ly, closure, blush, tips, seed, glyph) {
  const { x } = buffer(), { m, tone } = bodyMask()
  x.clearRect(0, 0, G, G)
  const px = (i, j, c) => { x.fillStyle = c; x.fillRect(i, j, 1, 1) }
  const TONES = [P.body, P.core, P.light, P.shade, P.deep]
  for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
    if (!inM(m, i, j)) {
      if (inM(m, i + 1, j) || inM(m, i - 1, j) || inM(m, i, j + 1) || inM(m, i, j - 1)) px(i, j, P.line)
      continue
    }
    px(i, j, TONES[tone[j * G + i]])
  }
  // toy gloss: a highlight streak down the upper-left of the top arm + a dot on the left arm
  for (const [i, j] of [[16, 6], [16, 7], [15, 8], [15, 9], [16, 5]]) px(i, j, P.hi)
  for (const [i, j] of [[7, 15], [8, 15], [6, 16]]) px(i, j, P.light)
  px(7, 15, P.hi)
  // tip twinkles: each tip flashes white now and then
  if (tips) for (let k = 0; k < 5; k++) {
    const ph = (t * 0.5 + k * 0.23 + seed * 0.17) % 1
    if (ph < 0.07) { const [i, j] = TIPS[k]; for (const [a, b] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1]]) if (inM(m, i + a, j + b)) px(i + a, j + b, a || b ? P.light : P.hi) }
  }
  // cheeks
  if (blush > 0) {
    x.globalAlpha = clamp(blush)
    for (const i of CHEEKS) { px(i, CHEEK_Y, P.blush); px(i, CHEEK_Y + 1, P.blush) }
    x.globalAlpha = 1
  }
  // eyes
  const put = (bm, x0, y0, opts = {}) => {
    bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      const c = ch === 'X' ? INK : ch === 'W' ? '#ffffff' : ch === 'w' ? '#fffaf0' : ch === 'H' ? '#ff3d6e' : null
      if (c) px(x0 + i, y0 + j, c)
    }))
    if (opts.outline) bm.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === '.') return
      for (const [a, b] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const r2 = bm[j + b], ch2 = r2 ? r2[i + a] : undefined
        if (!ch2 || ch2 === '.') px(x0 + i + a, y0 + j + b, INK)
      }
    }))
  }
  const place = (bm, spread = 0) => {
    const w = bm[0].length, h = bm.length
    const x0 = Math.round(EYE_X - w / 2) - spread, y0 = Math.round(EYE_Y - h / 2)
    return [[x0, y0], [G - x0 - w, y0]]
  }
  const pair = (bm, dx = lx, dy = ly, spread = 0, opts) => { for (const [x0, y0] of place(bm, spread)) put(bm, x0 + dx, y0 + dy, opts) }
  const blinkBm = closure >= 0.75 ? EYES.shut : closure >= 0.25 ? EYES.half : null
  switch (mood) {
    case 'happy': pair(EYES.happy, 0, 0); break
    case 'sleepy': pair(EYES.sleepy, 0, 0); break
    case 'wink': {
      const [[ax, ay]] = place(EYES.open), [, [bx, by]] = place(EYES.happy)
      put(blinkBm || EYES.open, ax + lx, ay + ly); put(EYES.happy, bx, by)
      break
    }
    case 'squint': pair(closure >= 0.75 ? EYES.shut : EYES.squint, lx, 0); break
    case 'sparkle': pair(blinkBm || EYES.sparkle, lx, ly); break
    case 'heart': {
      const big = Math.sin(t * TAU * 1.8) > -0.2
      pair(big ? EYES.heartBig : EYES.heartSmall, 0, 0, 0, { outline: true })
      break
    }
    case 'wide': case 'eyeroll': {
      if (blinkBm) { pair(blinkBm, 0, 0); break }
      const roll = mood === 'eyeroll'
      for (const [x0, y0] of place(EYES.sclera)) {
        put(EYES.sclera, x0, y0)
        const pxx = roll ? Math.round(2 + 1.4 * Math.sin(t * 5)) : 2 + lx, pyy = roll ? 1 : 3 + ly
        const ix = clamp(pxx, 1, 3), iy = clamp(pyy, 1, 5)
        x.fillStyle = INK; x.fillRect(x0 + ix, y0 + iy, 2, 2)
      }
      if (roll) for (const [x0, y0] of place(EYES.sclera)) { x.fillStyle = P.shade; x.fillRect(x0 + 1, y0 + 6, 4, 1) }
      break
    }
    default: pair(blinkBm || EYES.open, lx, ly)
  }
  // glyph badge: a little coin pinned on the lower-right point
  if (glyph) {
    for (let j = 22; j < G; j++) for (let i = 20; i < G; i++) {
      const d = Math.hypot(i + 0.5 - BADGE.x, j + 0.5 - BADGE.y)
      if (d < BADGE.r - 1) px(i, j, '#140c2c')
      else if (d < BADGE.r) px(i, j, i + j < BADGE.x + BADGE.y ? P.light : P.base)
      else if (d < BADGE.r + 0.9) px(i, j, P.line)
    }
  }
}

/** soft round glow behind a character (additive) */
function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** hop offset (px, fraction of size) + squash at time t from the most recent hop */
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }                     // crouch
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }                                // land + wobble
}

// twinkle pixels floating around the star (cells from the centre, phase offset)
const TWINKLES = [[-15.5, -9, 0], [15, -11.5, 0.37], [-17, 9.5, 0.71], [17.5, 5, 0.18]]

export function drawStarChar(ctx, x, y, size, t, opts = {}) {
  const { color = STAR.sky, glyph = null, mood = 'neutral', look, blink, bob, squash = 0, hops = null, seed = 1, glow = 1, alpha = 1, pop = 1, blush, zzz = true, tips = true } = opts
  if (alpha <= 0 || pop <= 0 || size <= 0) return { x, y, size, top: y }
  const P = palette(color)
  const L = look || autoLook(t, seed)
  const lx = clamp(Math.round(L[0] * 1.2), -1, 1), ly = clamp(Math.round(L[1] * 1.2), -1, 1)
  const closure = typeof blink === 'number' ? blink : blink === false ? 0 : autoBlink(t, seed)
  const bl = blush === undefined ? (['happy', 'wink', 'heart', 'sparkle'].includes(mood) ? 0.85 : 0) : blush === true ? 0.85 : blush === false ? 0 : blush
  paintSprite(t, P, mood, lx, ly, closure, bl, tips, seed, glyph)

  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const S = cell * G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const breathe = 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const sq = squash + hs.sq + breathe
  const sx = 1 + sq, sy = 1 - sq * 0.9
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const base = (FOOT_ROW - HALF) * cell                      // squash anchor: the two lower tips
  ctx.save()
  ctx.globalAlpha *= alpha
  glowAt(ctx, x, cy + (SC.y - HALF) * cell, S * 0.85, P.base, glow * (0.9 + 0.1 * Math.sin(t * 2.6 + seed)))
  glowAt(ctx, x, cy + (SC.y - HALF) * cell, S * 0.42, P.body, glow * 0.35)
  // twinkles: tiny 4-point pixel sparkles that wink in and out around the star
  if (tips) {
    const tc = Math.max(1, Math.round(cell))
    TWINKLES.forEach(([u, v, o], k) => {
      const ph = (t * 0.42 + o + seed * 0.13) % 1, a = Math.max(0, Math.sin(ph * TAU)) ** 2
      if (a < 0.05) return
      const qx = Math.round(x + u * cell), qy = Math.round(cy + v * cell), big = a > 0.55 && s >= 100
      ctx.globalAlpha = alpha * a
      ctx.fillStyle = k % 2 ? P.light : '#fffbea'
      ctx.fillRect(qx - tc / 2, qy - tc / 2, tc, tc)
      if (big) { ctx.fillRect(qx - tc * 1.5, qy - tc / 2, tc * 3, tc); ctx.fillRect(qx - tc / 2, qy - tc * 1.5, tc, tc * 3) }
    })
    ctx.globalAlpha = alpha
  }
  ctx.translate(Math.round(x), Math.round(cy + base)); ctx.scale(sx, sy)
  const sm = ctx.imageSmoothingEnabled
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(buffer().c, -S / 2, -S / 2 - base, S, S)
  ctx.imageSmoothingEnabled = sm
  if (glyph) {
    const gx = (BADGE.x - HALF) * cell, gy = (BADGE.y - HALF) * cell - base
    ctx.font = `700 ${Math.round(cell * 4.4)}px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillStyle = P.light; ctx.fillText(glyph + '︎', gx, gy + cell * 0.3)
  }
  ctx.restore()
  // sleepy z's drifting up from the upper-right
  if (mood === 'sleepy' && zzz) {
    ctx.save(); ctx.globalAlpha *= alpha
    const Z = ['XXX', '..X', '.X.', 'X..', 'XXX']
    for (let k = 0; k < 3; k++) {
      const ph = ((t * 0.45 + k / 3) % 1), zc = Math.max(2, Math.round(cell * (0.75 + 0.6 * ph)))
      const zx = Math.round(x + S * (0.22 + 0.16 * ph) + Math.sin(ph * 6 + k) * cell), zy = Math.round(cy - S * (0.24 + 0.36 * ph))
      ctx.globalAlpha = alpha * Math.sin(Math.PI * ph) * 0.95
      ctx.fillStyle = BONE
      Z.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') ctx.fillRect(zx + i * zc, zy + j * zc, zc, zc) }))
    }
    ctx.restore()
  }
  return { x, y: cy, size: S, top: cy - S / 2 + TOP_ROW * cell }
}

// ─────────────────────────────────────────────── typing schedule
const PAUSE = { ',': 0.12, '.': 0.22, '!': 0.22, '?': 0.22, '…': 0.3, ':': 0.14, ';': 0.14, '—': 0.16 }
/** strip *accent* markers → [{ ch, acc }] */
function parse(text) {
  const out = []; let acc = false
  for (const ch of text) { if (ch === '*') { acc = !acc; continue } out.push({ ch, acc }) }
  return out
}
export function lineTimes(lines, { cps = 28 } = {}) {
  return lines.map((L, n) => {
    const cs = parse(L.text), chars = []
    let tt = L.t
    cs.forEach(({ ch }, i) => {
      chars.push(+tt.toFixed(4))
      tt += 1 / cps
      const nxt = cs[i + 1]
      if (PAUSE[ch] && (!nxt || nxt.ch === ' ')) tt += PAUSE[ch]
    })
    const done = chars.length ? chars[chars.length - 1] + 1 / cps : L.t
    return { start: L.t, done: +done.toFixed(4), end: lines[n + 1] ? lines[n + 1].t : undefined, chars }
  })
}

// ─────────────────────────────────────────────── sound
const NOTES = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]   // D major pentatonic-ish palette (engine re-keys it)
const hash = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }
export function talkCues(lines, { cps = 28, every = 2, gain = 0.018, pitch = {} } = {}) {
  const times = lineTimes(lines, { cps }), out = []
  lines.forEach((L, n) => {
    const base = pitch[L.speaker] || L.pitch || NOTES[2 + (hash(L.speaker) % 4)]
    const cs = parse(L.text); let k = 0
    cs.forEach(({ ch }, i) => {
      if (!/[\p{L}\p{N}]/u.test(ch)) return
      if (k++ % every) return
      const step = [0, 2, 1, 3, 2, 0, 4, 1][(k + n) % 8]
      out.push(['pop', times[n].chars[i], +(base * Math.pow(2, step / 12)).toFixed(2), gain * (0.85 + 0.15 * ((k + n) % 3) / 2), +(((k % 4) - 1.5) * 0.08).toFixed(2)])
    })
    out.push(['tick', +(times[n].done + 0.04).toFixed(3), 0.025])
  })
  return out
}
export function talkHops(lines, speaker, { cps = 28, gap = 0.34 } = {}) {
  const times = lineTimes(lines, { cps }), out = []
  lines.forEach((L, n) => {
    if (L.speaker !== speaker) return
    const cs = parse(L.text); let last = -1e9, w = 0
    cs.forEach(({ ch }, i) => {
      const startWord = ch !== ' ' && (i === 0 || cs[i - 1].ch === ' ')
      if (!startWord) return
      const tt = times[n].chars[i]
      if ((w++ % 2 === 0) && tt - last >= gap) { out.push(tt); last = tt }
    })
  })
  return out
}

// ─────────────────────────────────────────────── the dialogue box (DOM)
const PX = 6   // one "pixel" of the panel art
/** draw a pixel panel (stepped corners, gold border, bone hairline) on a canvas sized w×h (+ glow margin m) */
function drawPanel(cv, w, h, { m = 24, fill = 'rgba(13,8,32,0.86)', border = GOLD, hair = 'rgba(239,230,214,0.5)' } = {}) {
  cv.width = w + 2 * m; cv.height = h + 2 * m
  const x = cv.getContext('2d')
  x.translate(m, m)
  const P = PX
  const stepRect = (o, col) => {         // filled shape inset by o px, 2-step corners
    x.fillStyle = col
    x.fillRect(o + 2 * P, o, w - 2 * o - 4 * P, h - 2 * o)
    x.fillRect(o, o + 2 * P, w - 2 * o, h - 2 * o - 4 * P)
    x.fillRect(o + P, o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P)
  }
  // soft glow under the border
  x.save(); x.shadowColor = rgba(GOLD, 0.45); x.shadowBlur = 22; stepRect(0, rgba(GOLD, 0.9)); x.restore()
  x.clearRect(P, P, w - 2 * P, h - 2 * P)
  stepRect(0, border)
  x.globalCompositeOperation = 'destination-out'; stepRect(P, '#000'); x.globalCompositeOperation = 'source-over'
  stepRect(P, fill)
  // inner bone hairline (half a pixel) at inset 2 px-cells
  x.strokeStyle = hair; x.lineWidth = P / 2
  const o = 2 * P + P / 4, ww = w - 2 * o, hh = h - 2 * o
  x.beginPath()
  x.moveTo(o + P, o); x.lineTo(o + ww - P, o); x.lineTo(o + ww - P, o + P / 2); x.moveTo(o + ww, o + P); x.lineTo(o + ww, o + hh - P)
  x.moveTo(o + ww - P, o + hh); x.lineTo(o + P, o + hh); x.moveTo(o, o + hh - P); x.lineTo(o, o + P)
  x.stroke()
  // little bright pixel highlights on the top-left border run
  x.fillStyle = '#fff1c8'; x.fillRect(2 * P, 0, P * 3, P / 2); x.fillRect(0, 2 * P, P / 2, P * 2)
}

export function dialogueBox(parent, { lines, y = 1380, width = 960, height = 300, open, close, cps = 28, size = 52, W = 1080 } = {}) {
  const times = lineTimes(lines, { cps })
  const tOpen = open ?? lines[0].t - 0.22
  const tClose = close ?? times[times.length - 1].done + 1.8
  const M = 24
  const root = el('div', { position: 'absolute', left: ((W - width) / 2) + 'px', top: y + 'px', width: width + 'px', height: height + 'px', transformOrigin: '50% 60%', display: 'none', pointerEvents: 'none' }, parent)
  const back = el('div', { position: 'absolute', left: '6px', top: '6px', right: '6px', bottom: '6px', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }, root)
  const cv = el('canvas', { position: 'absolute', left: -M + 'px', top: -M + 'px', width: (width + 2 * M) + 'px', height: (height + 2 * M) + 'px', imageRendering: 'pixelated' }, root)
  drawPanel(cv, width, height, { m: M })
  void back
  // text rows: every line pre-laid-out (chars hidden) so nothing reflows while typing
  const PAD_X = 52, PAD_TOP = 58
  const texts = lines.map((L, n) => {
    const box = el('div', { position: 'absolute', left: PAD_X + 'px', top: PAD_TOP + 'px', width: (width - 2 * PAD_X) + 'px', font: `700 ${size}px ${MONO}`, lineHeight: '1.28',
      color: BONE, letterSpacing: '-0.01em', textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none', whiteSpace: 'normal' }, root)
    const cs = parse(L.text), spans = []
    let word = null
    cs.forEach(({ ch, acc }) => {
      if (ch === ' ') { word = null; box.appendChild(document.createTextNode(' ')); spans.push(null); return }
      if (!word) word = el('span', { display: 'inline-block', whiteSpace: 'nowrap' }, box)
      spans.push(el('span', { visibility: 'hidden', color: acc ? (L.color || GOLD) : BONE }, word, ch === '<' ? '&lt;' : ch === '&' ? '&amp;' : ch))
    })
    return { box, spans, tm: times[n] }
  })
  // name tags (one per distinct speaker+colour)
  const tags = new Map()
  const tagFor = L => {
    const key = L.speaker + '|' + (L.color || '')
    if (tags.has(key)) return tags.get(key)
    const label = L.speaker
    const meas = (typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(4, 4) : document.createElement('canvas')).getContext('2d')
    meas.font = `700 32px ${MONO}`
    const tw = Math.ceil(meas.measureText(label).width + 0.12 * 32 * label.length)
    const w = Math.round((tw + 64) / PX) * PX, h = 66
    const t = el('div', { position: 'absolute', left: '40px', top: (-h / 2 - 4) + 'px', width: w + 'px', height: h + 'px', transformOrigin: '20% 100%', display: 'none' }, root)
    const c = el('canvas', { position: 'absolute', left: -M + 'px', top: -M + 'px', width: (w + 2 * M) + 'px', height: (h + 2 * M) + 'px' }, t)
    drawPanel(c, w, h, { m: M, fill: 'rgba(20,12,44,0.97)', hair: 'rgba(239,230,214,0)' })
    el('div', { position: 'absolute', left: 0, top: 0, width: w + 'px', height: h + 'px', display: 'grid', placeItems: 'center', font: `700 32px ${MONO}`, letterSpacing: '0.12em',
      color: L.color || GOLD, textShadow: '0 2px 0 rgba(6,4,18,0.9)', whiteSpace: 'nowrap' }, t, label)
    const rec = { el: t }
    tags.set(key, rec); return rec
  }
  lines.forEach(tagFor)
  // the ▼ arrow (pixel triangle)
  const arrow = el('canvas', { position: 'absolute', right: '40px', bottom: '30px', width: (7 * PX) + 'px', height: (5 * PX) + 'px', display: 'none' }, root)
  arrow.width = 7 * PX; arrow.height = 5 * PX
  { const a = arrow.getContext('2d'); ['XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { a.fillStyle = j === 0 && i < 3 ? '#fff1c8' : GOLD; a.fillRect(i * PX, j * PX, PX, PX) } })); a.fillStyle = 'rgba(6,4,18,0.8)'; a.fillRect(PX, 4 * PX, PX * 5, PX) }

  return {
    root, times,
    update(t) {
      const show = t >= tOpen && t < tClose + 0.25
      root.style.display = show ? 'block' : 'none'
      if (!show) return
      // open pop / close pop
      const po = prog(t, tOpen, tOpen + 0.32), pc = prog(t, tClose, tClose + 0.22)
      let sc = lerp(0.55, 1, easeOutBack(po, 2.2)), sy = sc, op = clamp(po * 3)
      if (pc > 0) { sc *= 1 + 0.06 * Math.sin(Math.PI * Math.min(1, pc * 2)) - 0.5 * ease.inCubic(pc); sy = sc * (1 - 0.6 * ease.inQuad(pc)); op *= 1 - ease.inQuad(pc) }
      // a small bump at each new line
      let cur = -1
      for (let i = 0; i < lines.length; i++) if (t >= lines[i].t) cur = i
      const bump = cur > 0 ? 0.025 * Math.sin(Math.PI * prog(t, lines[cur].t, lines[cur].t + 0.18)) : 0
      root.style.opacity = String(op)
      root.style.transform = `scale(${(sc + bump).toFixed(4)}, ${(sy + bump).toFixed(4)})`
      // text
      texts.forEach((T, i) => {
        const on = i === cur && t < tClose + 0.25
        T.box.style.display = on ? 'block' : 'none'
        if (!on) return
        T.spans.forEach((s, k) => { if (s) s.style.visibility = t >= T.tm.chars[k] ? 'visible' : 'hidden' })
      })
      // tag: pops in with the box, re-pops when the speaker changes
      const L = cur >= 0 ? lines[cur] : lines[0]
      const tg = tagFor(L)
      for (const r of tags.values()) r.el.style.display = r === tg ? 'block' : 'none'
      const prev = cur > 0 ? lines[cur - 1] : null
      const t0 = !prev || tagFor(prev) !== tg ? Math.max(tOpen + 0.08, cur >= 0 ? lines[cur].t - 0.12 : tOpen + 0.08) : tOpen + 0.08
      const pt = easeOutBack(prog(t, t0, t0 + 0.28), 2.6)
      tg.el.style.transform = `scale(${pt.toFixed(4)}) rotate(${((1 - pt) * -6).toFixed(2)}deg)`
      // ▼ after the line is typed, blinking + bobbing
      const done = cur >= 0 ? T_done(cur) : Infinity
      const aOn = t >= done + 0.08 && pc <= 0
      arrow.style.display = aOn ? 'block' : 'none'
      if (aOn) {
        const ph = (t - done - 0.08) % 0.6
        arrow.style.opacity = ph < 0.4 ? '1' : '0.15'
        arrow.style.transform = `translateY(${(Math.round(Math.sin((t - done) * 7) * 1.5) * 3)}px)`
      }
    },
  }
  function T_done(i) { return times[i].done }
}
