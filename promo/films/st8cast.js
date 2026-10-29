// st8cast — the shared cast + hook devices of Star Talk season 8, "EX RETROGRADE" (promo/films/STARTALK9.md).
// Owned by the st8breaking session (S8 E01). Every season-8 episode imports it so Venus, Mars, the three exes and the
// genre devices look the same in all 25. Drawn in startalk.js's pixel style (crisp cells, 1-cell ink outline, soft
// additive glow). Reuses drawStarChar (startalk.js) and drawBits (st5cast.js).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { VENUS, MARS, COMET, SATELLITE, METEOR, EX_RED, drawVenus, drawMars, drawComet, drawSatellite, drawMeteor,
//            exPin, exAura, drawPhone, drawDayChip, hookCard, hookCues, genreBug, drawTicker, stingerCues, STINGER_KINDS
//          } from '../../st8cast.js'
//
// ── characters (all pure f(t); each returns { x, y, size, top } like drawStarChar: y = the bobbed centre, top = the
//    upper edge of the sprite, handy for a bubble or a prop above it). Common opts, as drawStarChar: mood, look [x, y]
//    −1…1, blink (auto | false | 0…1), bob (px), hops [times], seed, glow 0…1.5, alpha, pop 0…1 (easeOutBack pop-ins).
// drawVenus(ctx, x, y, size, t, opts)       Venus, as in season 4 (st4venusretro / starvenus): drawStarChar in VENUS.color
//   (#ff86b8) with the ♀ badge (size ≥ 120) and orbiting pink pixel sparkles. Every drawStarChar mood ('neutral' 'happy'
//   'wink' 'squint' 'wide' 'heart' 'eyeroll' 'sleepy' 'sparkle') and opt (squash, blush, tips…) passes through.
//   extra opts: retro = 0…1   a dashed backwards-orbit arrow loops round her (behind → in front, running clockwise =
//                             "backwards"), visible from retro ≈ 0.1; she dims and desaturates toward retro = 1.
//               morning = 0…1 a dawn-gold rim + gold glow + slow sun rays (the Morning Star, after inferior conjunction).
//               mirror = false | true | 'left'  the rear-view-mirror prop on a stalk at her side (true = right), with a
//                             little red dashed "ex" blip in the glass. mirrorLook = 0…1 tilts it toward her face.
//   Tag VENUS.tag '♀︎ VENUS' (the ︎ keeps ♀ in text style; it shows as "♀ VENUS"), tag colour VENUS.tagColor.
// drawMars(ctx, x, y, size, t, opts)        Mars, Venus's ex: a rust-red pixel planet (size = the disc's diameter, ≈ 160–320)
//   with a bronze Greek crested helmet (cheek guards, nose guard, a red horsehair crest that sways), heavy brows, a little
//   white polar cap, and his two real moons Phobos (bigger, closer, faster) and Deimos orbiting like a hype crew (they
//   pass behind and in front of him).  opts: helmet = true · mood 'neutral' | 'smug' (half lids, one brow up) | 'wide' |
//   'sad' (brows up + a tear) | 'happy' (^ ^) | 'heart' · moons = true · moonMood 'neutral' | 'hype' (they bounce and
//   sparkle) | 'cry' (tears) | 'heart' · look · blink · bob · hops · seed · glow · alpha · pop.  Tag MARS.tag '♂︎ MARS'.
// THE EXES: each wears a pulsing red dashed outline (aura = true) and a tiny red "EX" pin (exPin = true); pass false to
//   drop either (e.g. once they've had their kind exit).
// drawComet(ctx, x, y, size, t, opts)       the ex who keeps coming back: a lumpy icy nucleus with a face (size = nucleus
//   width, ≈ 90–240) in a cyan coma, with a blue ion tail (straight) and a gold-white dust tail (curved) that ALWAYS point
//   away from the Sun (real).  opts: sunDir = [dx, dy] toward the Sun (or an angle in radians; default [−1, 0.55], the
//   Sun off to the lower left → tails stream up-right) · tail = length px (default size·3.2; 0 = none) · mood ('neutral'
//   'happy' 'wide' 'sad' 'squint' 'heart' 'smug') · look · blink · aura · exPin · …  Tag COMET.tag '☄ THE COMET'.
//   Tip: the hidden background comet of every episode is drawComet(ctx, x, y, 30, t, { aura: false, exPin: false,
//   tail: 90, mood: 'happy' }) (or smaller), once, crossing the sky.
// drawSatellite(ctx, x, y, size, t, opts)   the orbiter who watches every story and never texts: a gold-foil probe body
//   with two camera-lens eyes, blue solar-panel arms, a white dish on top and a blinking red "viewed" light (size = the
//   span across both panels, ≈ 200–380).  opts: orbit = { cx, cy, r, speed = 0.8, tilt = 0.32, phase = 0 } makes it
//   circle that point (x, y are then ignored; it shrinks a little on the far side and the return gets behind = true, so
//   draw it before the thing it circles when behind) · viewed = true (the blinking light) · rot = 0 · mood · look ·
//   blink · aura · exPin · …  Tag SATELLITE.tag '🛰 THE ORBITER'; SATELLITE.tagText 'THE ORBITER' (no emoji).
//   Returns { x, y, size, top, behind }.
// drawMeteor(ctx, x, y, size, t, opts)      the love-bomber: a glowing molten rock with a face and a long flickering flame
//   trail, sparks flying (size = rock width, ≈ 80–200).  opts: dir = travel angle in radians (default 2.36: heading down-
//   left, so the trail streams up-right) · trail = length px (default size·2.8) · burn = 0…1 (it shrinks to a grey
//   pebble, the flame dies; a smoke puff blooms over burn 0.8…1 and is gone at 1) · puff = 0…1 (force the puff by hand)
//   · mood · look · blink · aura · exPin · …  Tag METEOR.tag '✦ THE METEOR'.
// exPin(ctx, x, y, t, { label = 'EX', scale = 1, alpha = 1, rot })   the little red "EX" pin badge (centred on x, y), on
//   its own, wobbling gently. exAura(ctx, x, y, r, t, { alpha = 1, color = EX_RED })   the red dashed outline pulse.
// drawPhone(ctx, x, y, h, t, { lit = 1, text = 'u up?', buzz = 0, alpha = 1, rot = 0, pop = 1 })   a small pixel phone
//   (h = its height, ≈ 60–220), screen glowing by `lit`, a notification bubble with `text` (null = none) and a buzz
//   shake (buzz 0…1). For "every star's phone lights up at once".
//
// ── season devices
// drawDayChip(ctx, t, { day, x = 930, y = 120, phase = 'retro', alpha = 1, size = 28, text })   the top-right pixel chip
//   "♀ Rx · DAY 07". x = the chip's RIGHT edge and y its centre, so the defaults sit clear of cardFrame's corner star.
//   phase: 'retro' (pink, ♀ + a backwards ↺ arrow) | 'gone' (dim violet, ♀ lost in a sun glare: inferior conjunction) |
//   'morning' (dawn gold, a rising sun) | 'direct' (mint, ♀ + a forward → arrow, text "DIRECT · DAY nn"). text overrides
//   the words after the icon.
// hookCard(root, { text, at = 0, out, size = 110, accentSize = 160, top = 170, accentColor = PINK, color = BONE,
//                  width = 940, plate = true })  → { root, update(t), end }
//   The frame-0 caption (DOM): ALREADY FULLY ON SCREEN at `at` (no type-on, no fade), Inter 800 bone, '*word*' = the
//   EB Garamond italic accent, '|' = a line break. A tiny 2-frame shake at at + 0.1, then it holds; it pops out (a small
//   swell, then shrinks away) at `out` (a time → over 0.28 s, or [a, b]); `end` = when it's gone. Shrinks to fit the
//   width (never grows). plate = a soft dark scrim behind it so the still reads as a thumbnail. Build it after fonts load
//   ("800 110px Inter", "italic 500 160px 'EB Garamond'"), above your scene canvas, and call update(t) every frame.
// hookCues(at, { key }) → the matching sound: a record-scratch blip (two noise sweeps) and a hit (a brass stab in your
//   key + boom + snare + crash) 0.16 s later. Pass key = your music.key.
// genreBug(ctx, t, { text, x = 70, y = 232, color = EX_RED, align = 'left', size = 30, blink, alpha = 1, ink = BONE })
//   the small corner logo ("LIVE", "BREAKING", "REC", "SEASON FINALE"): a stepped pixel plate in `color` with Space Mono
//   text; LIVE / REC get a blinking dot (blink: true/false forces it). x = the left edge (align 'right' → right edge),
//   y = its centre. The default sits under drawSeedConstellation's top-left spot.
// drawTicker(ctx, t, { text, y = 1780, speed = 160, label = null, color = EX_RED, band = '#120a24', size = 34, alpha = 1 })
//   the scrolling news ticker: a full-width dark band (centred on y, 72 px tall) with a coloured top rule, an optional
//   label block on the left ('BREAKING'), and `text` scrolling right → left at `speed` px/s, repeating with • between.
// stingerCues(at, { key, kind }) → genre stings, hit at `at`. kind (STINGER_KINDS): 'news' (the brass news fanfare, ba-da-
//   BAM) · 'horror' (a reverse swell into a low BRAAM + dissonant bell) · 'gameshow' (three rising dings + a sparkle) ·
//   'sitcom' (ba-dum-tss) · 'noir' (a muted minor epiano chord + brush) · 'sports' (a referee whistle + a stadium clap) ·
//   'trailer' (a long low brass BRAAM + boom + crash) · 'wedding' (church-bell chimes in major).
//
// Colours: EX_RED #ff3d5a. Nothing touches `document` at module top level (canvas buffers and DOM are made lazily in
// the functions that need them): the sound build imports this in node.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, rng, hexToRgb, el } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'
import { drawStarChar } from './startalk.js'
import { drawBits } from './st5cast.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3), r2 = v => +v.toFixed(2)

export const EX_RED = '#ff3d5a'
export const VENUS = { color: '#ff86b8', glyph: '♀', dim: '#7c6380', gold: '#ffcf6e', tag: '♀︎ VENUS', tagColor: '#ff8fb1' }
export const MARS = { color: '#d4532e', tag: '♂︎ MARS', tagColor: '#ff9a6a' }
export const COMET = { color: '#dff6ff', tag: '☄ THE COMET', tagColor: '#9fe8ff' }
export const SATELLITE = { color: '#d9a441', tag: '🛰 THE ORBITER', tagText: 'THE ORBITER', tagColor: '#c9d6ff' }
export const METEOR = { color: '#ff8a2a', tag: '✦ THE METEOR', tagColor: '#ffb36a' }

// ─────────────────────────────────────────────── helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], clamp(k)))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
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
function autoBlink(t, seed) { const ph = (t + seed * 0.77) % 3.7; return ph < 0.05 ? 0.5 : ph < 0.13 ? 1 : ph < 0.18 ? 0.5 : 0 }
function autoLook(t, seed) { const s = Math.sin(t * 0.7 + seed); return [s > 0.6 ? 1 : s < -0.7 ? -1 : 0, 0] }
const cellOf = (s, n) => s >= n * 2 ? Math.max(1, Math.round(s / n)) : s / n
/** a cell painter: px(i, j, colour) fills cell (i, j) of a grid whose (0, 0) cell has its top-left at (ox, oy) */
const painter = (ctx, ox, oy, c) => (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c + 0.5, c + 0.5) }
/** a blob mask (1 inside) of n×n cells with its 1-cell ink outline ring returned separately */
function blob(n, inside) {
  const m = new Uint8Array(n * n)
  for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) m[j * n + i] = inside(i + 0.5 - n / 2, j + 0.5 - n / 2) ? 1 : 0
  const on = (i, j) => i >= 0 && j >= 0 && i < n && j < n && m[j * n + i] === 1
  return { n, on, ring: (i, j) => !on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1)) }
}

// ─────────────────────────────────────────────── the shared pixel face (two 3-wide eyes, no mouth)
const EYE = {
  open: ['XXX', 'XWX', 'XXX', 'XXX'],
  half: ['...', 'XXX', 'XXX', '...'],
  shut: ['...', '...', 'XXX', '...'],
  happy: ['.X.', 'X.X', '...', '...'],
  squint: ['...', 'XXX', 'XWX', '...'],
  smug: ['...', 'XXX', 'XWX', 'XXX'],
  heart: ['H.H', 'HHH', '.H.', '...'],
  wide: ['XXXXX', 'XwwwX', 'XwwwX', 'XwwwX', 'XXXXX'],
}
/** eyes at cells (exL, ey) and (exR, ey) (top-left of each 3×4 eye). brows: 'flat' | 'down' | 'up' | 'smug' | null */
function drawFace(px, exL, exR, ey, t, { mood = 'neutral', look, blink, seed = 1, brows = null, blushCols = null, blushRow = null, tear = '#8fd8ff' }) {
  const L = look || autoLook(t, seed)
  const lx = clamp(Math.round(L[0]), -1, 1), ly = clamp(Math.round(L[1]), -1, 1)
  const cl = typeof blink === 'number' ? blink : blink === false ? 0 : autoBlink(t, seed)
  const bl = cl >= 0.75 ? EYE.shut : cl >= 0.25 ? EYE.half : null
  const still = mood === 'happy' || mood === 'heart' || !!bl
  const put = (bm, x0, y0) => bm.forEach((row, jj) => [...row].forEach((ch, ii) => {
    if (ch === '.') return
    px(x0 + ii, y0 + jj, ch === 'X' ? INK : ch === 'W' ? '#ffffff' : ch === 'w' ? '#fffaf0' : '#ff3d6e')
  }))
  const dx = still ? 0 : lx, dy = still ? 0 : ly
  if (mood === 'wide' && !bl) {
    for (const ex of [exL - 1, exR - 1]) { put(EYE.wide, ex, ey - 1); px(ex + 2 + (dx > 0 ? 1 : dx < 0 ? -1 : 0), ey + 1 + (dy > 0 ? 1 : dy < 0 ? -1 : 0), INK); px(ex + 2 + (dx > 0 ? 1 : dx < 0 ? -1 : 0), ey + 2 + (dy > 0 ? 1 : dy < 0 ? -1 : 0), INK) }
  } else {
    const bm = mood === 'happy' ? EYE.happy : mood === 'heart' ? EYE.heart : bl || (mood === 'squint' ? EYE.squint : mood === 'smug' ? EYE.smug : EYE.open)
    const beat = mood === 'heart' && !bl && (t * 2.4) % 1 < 0.18
    put(beat ? ['HHH', 'HHH', '.H.', '...'] : bm, exL + dx, ey + dy); put(beat ? ['HHH', 'HHH', '.H.', '...'] : bm, exR + dx, ey + dy)
  }
  const b = brows || (mood === 'sad' ? 'up' : mood === 'smug' ? 'smug' : mood === 'squint' ? 'down' : null)
  if (b === 'flat') for (const ex of [exL, exR]) for (let i = -1; i <= 3; i++) px(ex + i, ey - 2, INK)
  if (b === 'down') { px(exL - 1, ey - 2, INK); px(exL, ey - 2, INK); px(exL + 1, ey - 1, INK); px(exL + 2, ey - 1, INK); px(exR + 3, ey - 2, INK); px(exR + 2, ey - 2, INK); px(exR + 1, ey - 1, INK); px(exR, ey - 1, INK) }
  if (b === 'up') { px(exL - 1, ey - 1, INK); px(exL, ey - 2, INK); px(exL + 1, ey - 2, INK); px(exL + 2, ey - 3, INK); px(exR + 3, ey - 1, INK); px(exR + 2, ey - 2, INK); px(exR + 1, ey - 2, INK); px(exR, ey - 3, INK) }
  if (b === 'smug') { for (let i = -1; i <= 3; i++) px(exL + i, ey - 1, INK); px(exR - 1, ey - 2, INK); px(exR, ey - 3, INK); px(exR + 1, ey - 3, INK); px(exR + 2, ey - 3, INK); px(exR + 3, ey - 2, INK) }
  if (mood === 'sad') { const tp = (t * 0.9 + seed * 0.2) % 1; px(exL + 1, ey + 4 + Math.floor(tp * 4), tear) }
  if (blushCols && (mood === 'happy' || mood === 'heart')) for (const i of blushCols) px(i, blushRow ?? ey + 4, 'rgba(255,120,160,0.8)')
}

// ─────────────────────────────────────────────── the EX marks
export function exAura(ctx, x, y, r, t, { alpha = 1, color = EX_RED, seed = 0 } = {}) {
  if (alpha <= 0 || r <= 0) return
  const pulse = 0.5 + 0.5 * Math.sin(t * 4.2 + seed)
  const rr = r * (1 + 0.04 * pulse), n = Math.max(14, Math.round(rr / 9)), q = Math.max(4, Math.round(r / 34))
  ctx.save(); ctx.globalAlpha *= alpha * (0.45 + 0.4 * pulse)
  ctx.fillStyle = color
  for (let i = 0; i < n * 2; i++) {
    if (i % 2) continue
    for (let k = 0; k < 3; k++) {
      const a = (i + k / 3) / (n * 2) * TAU + t * 0.5 + seed
      ctx.fillRect(Math.round((x + Math.cos(a) * rr) / q) * q - q / 2, Math.round((y + Math.sin(a) * rr) / q) * q - q / 2, q, q)
    }
  }
  ctx.restore()
  glowAt(ctx, x, y, r * 1.15, color, 0.18 * alpha * pulse)
}
export function exPin(ctx, x, y, t, { label = 'EX', scale = 1, alpha = 1, rot } = {}) {
  if (alpha <= 0 || scale <= 0) return
  const s = 26 * scale
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(rot ?? (-0.14 + Math.sin(t * 3.3) * 0.06))
  ctx.font = `700 ${Math.round(s)}px ${MONO}`
  const w = Math.ceil(ctx.measureText(label).width) + s * 0.9, h = s * 1.35, P = Math.max(2, Math.round(s / 9))
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(-w / 2 + o + P, -h / 2 + o, w - 2 * o - 2 * P, h - 2 * o); ctx.fillRect(-w / 2 + o, -h / 2 + o + P, w - 2 * o, h - 2 * o - 2 * P) }
  step(-P, INK); step(0, EX_RED)
  ctx.fillStyle = '#ff8a9a'; ctx.fillRect(-w / 2 + 2 * P, -h / 2 + P, w * 0.35, P)
  ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(label, 0, s * 0.06)
  ctx.restore()
}

// ─────────────────────────────────────────────── Venus
const SPARK_CELLS = 6
export function drawVenus(ctx, x, y, size, t, opts = {}) {
  const { retro = 0, morning = 0, mirror = false, mirrorLook = 0, alpha = 1, pop = 1, seed = 5, glow = 1.2 } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const rk = clamp(retro), mk = clamp(morning)
  const col = mixHex(mixHex(VENUS.color, VENUS.dim, rk * 0.8), '#ffb48a', mk * 0.35)
  const bob = opts.bob === undefined ? size * 0.035 : opts.bob
  const arrowA = clamp(rk * 6) * alpha * pop
  // the backwards orbit: back half (behind her)
  if (arrowA > 0) retroLoop(ctx, x, y, size * pop, t, arrowA, false, seed)
  // the Morning Star: gold glow, slow rays, then a gold copy of her just behind as a rim
  if (mk > 0) {
    glowAt(ctx, x, y, size * 1.25 * pop, VENUS.gold, 0.9 * mk * alpha)
    ctx.save(); ctx.globalAlpha *= mk * alpha * 0.55
    const q = Math.max(4, Math.round(size / 40)), R0 = size * 0.62 * pop
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * TAU + t * 0.25, len = size * (0.22 + 0.1 * Math.sin(t * 2 + i * 1.7)) * pop
      ctx.fillStyle = i % 2 ? VENUS.gold : '#fff1c8'
      for (let d = 0; d < len; d += q * 1.6) ctx.fillRect(Math.round((x + Math.cos(a) * (R0 + d)) / q) * q, Math.round((y + Math.sin(a) * (R0 + d)) / q) * q, q, q)
    }
    ctx.restore()
    drawStarChar(ctx, x, y, size * 1.11, t, { ...opts, color: VENUS.gold, glyph: null, mood: 'neutral', look: [0, 0], blink: false, tips: false, zzz: false, glow: 0, bob, alpha: alpha * mk, pop })
  }
  const r = drawStarChar(ctx, x, y, size, t, { ...opts, color: col, glyph: size * pop >= 120 ? VENUS.glyph : null, seed, glow: glow * (1 - 0.65 * rk), bob, alpha, pop })
  // orbiting pink sparkles (dim in retrograde)
  ctx.save()
  for (let i = 0; i < SPARK_CELLS; i++) {
    const ph = (t * 0.5 + i / SPARK_CELLS + seed * 0.1) % 1, tw = Math.max(0, Math.sin(ph * TAU)) ** 2
    if (tw < 0.1) continue
    const a = i / SPARK_CELLS * TAU + t * 0.45, R = size * pop * (0.6 + 0.08 * Math.sin(i * 2.3 + t))
    ctx.globalAlpha = alpha * tw * (1 - 0.7 * rk)
    drawPixelStar(ctx, x + Math.cos(a) * R, r.y + Math.sin(a) * R * 0.85, Math.max(10, size * pop * 0.065) * (0.7 + 0.5 * tw), i % 3 ? 2 : 0, [PINK, '#ffd1e6', '#fffbea', mk > 0.5 ? GOLD : '#ff5fa8'][i % 4])
  }
  ctx.restore()
  if (arrowA > 0) retroLoop(ctx, x, y, size * pop, t, arrowA, true, seed)
  if (mirror) drawMirror(ctx, r, size * pop, t, mirror === 'left' ? -1 : 1, mirrorLook, alpha)
  return r
}
/** a dashed elliptical loop round (x, y), dashes running clockwise (backwards), with a chevron head and a ℞ coin */
function retroLoop(ctx, x, y, size, t, a, front, seed) {
  const R = size * 0.78, ry = R * 0.36, oy = size * 0.08, q = Math.max(5, Math.round(size / 34))
  const head = t * 2.1 + seed                      // clockwise on screen = backwards
  ctx.save(); ctx.globalAlpha *= a
  for (let i = 0; i < 40; i++) {
    if (i % 3 === 2) continue
    const th = head - i * 0.13, s = Math.sin(th)
    if ((s > 0) !== front) continue
    ctx.fillStyle = rgba(PINK, 0.95 * (1 - i / 40))
    ctx.fillRect(Math.round((x + Math.cos(th) * R) / q) * q - q / 2, Math.round((y + oy + s * ry) / q) * q - q / 2, q, q)
  }
  const th = head, hx = x + Math.cos(th) * R, hy = y + oy + Math.sin(th) * ry
  if ((Math.sin(th) > 0) === front) {
    const tx = -Math.sin(th) * R, ty = Math.cos(th) * ry, ang = Math.atan2(ty, tx)
    ctx.translate(hx, hy); ctx.rotate(ang); ctx.fillStyle = PINK
    for (const [i, j] of [[0, 0], [-1, -1], [-1, 1], [-2, -2], [-2, 2]]) ctx.fillRect(i * q - q / 2, j * q - q / 2, q + 1, q + 1)
  }
  ctx.restore()
  if (front) {
    const k = clamp((a - 0.3) * 1.6)
    if (k <= 0.01) return
    const cx = x - size * 0.62, cy = y - size * 0.5, rr = Math.max(18, size * 0.13)
    ctx.save(); ctx.globalAlpha *= k; ctx.translate(cx, cy); ctx.rotate(-0.12 + Math.sin(t * 3) * 0.05)
    ctx.fillStyle = '#2a1640'; ctx.beginPath(); ctx.arc(0, 0, rr, 0, TAU); ctx.fill()
    ctx.lineWidth = Math.max(3, rr * 0.12); ctx.strokeStyle = PINK; ctx.stroke()
    ctx.fillStyle = PINK; ctx.font = `700 ${Math.round(rr * 1.2)}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('℞', 0, rr * 0.08)
    ctx.restore()
  }
}
function drawMirror(ctx, r, size, t, side, look, alpha) {
  const c = Math.max(3, Math.round(size / 42))
  const mx = r.x + side * size * 0.62, my = r.y - size * 0.06
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(mx), Math.round(my)); ctx.rotate(side * (0.12 - 0.25 * look) + Math.sin(t * 2.2) * 0.03)
  const px = painter(ctx, -9 * c, -5 * c, c)
  // stalk toward her
  for (let i = 0; i < 4; i++) { px(side > 0 ? -2 - i : 18 + i, 8 + (i > 1 ? 1 : 0), INK); px(side > 0 ? -2 - i : 18 + i, 9 + (i > 1 ? 1 : 0), '#7a7590') }
  // frame + glass
  for (let j = 0; j < 10; j++) for (let i = 0; i < 18; i++) {
    const corner = (i < 1 || i > 16) && (j < 1 || j > 8)
    if (corner) continue
    const edge = i < 1 || i > 16 || j < 1 || j > 8, rim = i < 2 || i > 15 || j < 2 || j > 7
    px(i, j, edge ? INK : rim ? '#4a4566' : j < 5 ? '#bfe6ff' : '#8fc4ea')
  }
  // the reflection: a little red dashed blip (an ex, closer than they appear) + a shine stripe
  const blink = (t * 1.3) % 1 < 0.75
  if (blink) for (const [i, j] of [[11, 3], [12, 3], [13, 4], [13, 5], [12, 6], [11, 6], [10, 5], [10, 4]]) px(i, j, EX_RED)
  px(4, 2, '#ffffff'); px(5, 2, '#ffffff'); px(3, 3, '#ffffff'); px(6, 5, 'rgba(255,255,255,0.55)')
  ctx.restore()
}

// ─────────────────────────────────────────────── Mars
const MN = 26, MR = 11.6
const MBLOB = blob(MN, (u, v) => Math.hypot(u, v) <= MR)
const PHOBOS = ['.XXX.', 'XXXXX', 'XXXXX', '.XXX.'], DEIMOS = ['.XX.', 'XXXX', '.XX.']
export function drawMars(ctx, x, y, size, t, opts = {}) {
  const { helmet = true, mood = 'neutral', moons = true, moonMood = 'neutral', look, blink, bob, hops = null, seed = 7, glow = 0.9, alpha = 1, pop = 1 } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const s = size * pop, c = cellOf(s, MN), S = c * MN
  const hs = hopState(t, hops), bobA = bob === undefined ? size * 0.03 : bob
  const sq = hs.sq + 0.015 * Math.sin(t * 2.7 + seed)
  const cy = y + Math.sin(t * 1.9 + seed * 1.3) * bobA - hs.lift * size * 0.1
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, cy, S * 0.95, '#ff6a3a', glow * 0.75)
  if (moons) drawMarsMoons(ctx, x, cy, S, c, t, false, moonMood, seed)
  ctx.save()
  ctx.translate(Math.round(x), Math.round(cy + S * 0.45)); ctx.scale(1 + sq, 1 - sq * 0.9); ctx.translate(0, -S * 0.45)
  const px = painter(ctx, -S / 2, -S / 2, c), on = MBLOB.on
  const light = '#f08a5d', base = MARS.color, shade = '#a83a22', deep = '#7a2616'
  for (let j = 0; j < MN; j++) for (let i = 0; i < MN; i++) {
    if (MBLOB.ring(i, j)) { px(i, j, INK); continue }
    if (!on(i, j)) continue
    const u = (i + 0.5 - 13) / MR, v = (j + 0.5 - 13) / MR
    let col = u + v < -0.9 ? light : u + v > 0.95 ? deep : u + v > 0.55 ? shade : base
    if (v > 0.84 && Math.abs(u) < 0.36) col = '#fbeee4'                                      // the south polar cap
    if ((j === 17 && i > 6 && i < 17) || (j === 18 && i > 9 && i < 15)) col = mixHex(col, deep, 0.6)   // a canyon (Valles-ish)
    if ((i === 7 && j === 19) || (i === 18 && j === 15) || (i === 19 && j === 16)) col = deep
    px(i, j, col)
  }
  px(6, 6, '#ffd2b8'); px(7, 5, '#ffd2b8')
  // the face (below the helmet rim)
  const exL = 7, exR = 16, ey = 11
  drawFace(px, exL, exR, ey, t, { mood, look, blink, seed, brows: mood === 'sad' ? 'up' : mood === 'smug' ? 'smug' : mood === 'wide' || mood === 'happy' || mood === 'heart' ? null : 'flat', blushCols: [5, 6, 19, 20], blushRow: 15 })
  if (helmet) {
    const BR = '#c9973a', BL = '#f2c75c', BD = '#8a5a1a'
    for (let j = 0; j < MN; j++) for (let i = 0; i < MN; i++) {
      const u = i + 0.5 - 13, v = j + 0.5 - 13, d = Math.hypot(u, v)
      if (d > MR + 1.2) continue
      const dome = v <= -4.5, cheek = v > -4.5 && v < 2.5 && Math.abs(u) >= MR - 2.6, nose = v > -4.5 && v < 1.5 && Math.abs(u) < 1.2
      if (!(dome || cheek || nose)) continue
      const edge = d > MR + 0.3 || (v > -5.5 && v <= -4.5 && Math.abs(u) < MR - 2.6 && Math.abs(u) >= 1.2)
      px(i, j, edge ? (v > -5.5 && d <= MR + 0.3 ? BD : INK) : u + v < -9 ? BL : (j + i) % 7 === 0 ? '#d9a84a' : BR)
    }
    // the crest: a red horsehair mohawk on a gold holder, swaying
    const sway = Math.sin(t * 3.2 + seed) * 0.8
    for (let k = 0; k < 7; k++) {
      const jj = 1 - k, off = Math.round(sway * k / 6)
      for (let w = -2; w <= 1; w++) { const ii = 13 + w + off; px(ii, jj, k === 6 && (w === -2 || w === 1) ? INK : (w + k) % 3 === 0 ? '#ff7a5a' : '#e8423a') }
      px(13 - 3 + off, jj, INK); px(13 + 2 + off, jj, INK)
    }
    for (let w = -3; w <= 2; w++) px(13 + w + Math.round(sway), -6, INK)
    px(12, 2, BL); px(13, 2, BL)
  }
  ctx.restore()
  if (moons) drawMarsMoons(ctx, x, cy, S, c, t, true, moonMood, seed)
  ctx.restore()
  return { x, y: cy, size: S, top: cy - S / 2 - (helmet ? 7 * c : 0) }
}
function drawMarsMoons(ctx, x, y, S, c, t, front, mood, seed) {
  const mc = Math.max(2, Math.round(c * 1.15))
  const defs = [{ bm: PHOBOS, rx: S * 0.78, ry: S * 0.2, w: 1.5, ph: 0.3, col: '#9a8a7a', name: 'P' }, { bm: DEIMOS, rx: S * 0.98, ry: S * 0.26, w: 0.8, ph: 2.6, col: '#c2b29c', name: 'D' }]
  defs.forEach((m, k) => {
    const a = m.ph + t * m.w * (mood === 'hype' ? 1.6 : 1) + seed * 0.3, s = Math.sin(a)
    if ((s > 0) !== front) return
    const hop = mood === 'hype' ? Math.abs(Math.sin(t * 9 + k * 1.3)) * S * 0.06 : 0
    const mx = x + Math.cos(a) * m.rx, my = y - S * 0.05 + s * m.ry - hop
    ctx.save(); ctx.translate(Math.round(mx), Math.round(my)); ctx.rotate(-0.25)
    drawBits(ctx, m.bm, { X: m.col }, 0, 0, mc)
    const w = m.bm[0].length, h = m.bm.length, ox = -w * mc / 2, oy = -h * mc / 2
    ctx.fillStyle = mood === 'heart' ? '#ff3d6e' : INK
    const blink = (t + k * 1.1 + seed) % 3.1 < 0.12
    const eh = blink ? Math.max(1, mc / 3) : mc
    ctx.fillRect(ox + mc * (w > 4 ? 1 : 0.7), oy + mc * 1, mc, eh); ctx.fillRect(ox + mc * (w > 4 ? 3 : 2.3), oy + mc * 1, mc, eh)
    if (mood === 'cry') { const tp = (t * 1.2 + k * 0.5) % 1; ctx.fillStyle = '#8fd8ff'; ctx.fillRect(ox + mc * 0.7, oy + mc * (2 + tp * 3), mc * 0.7, mc * 0.7) }
    ctx.restore()
    if (mood === 'hype' && (t * 2 + k) % 1 < 0.5) drawPixelStar(ctx, mx + mc * 3, my - mc * 3, mc * 4, 2, GOLD)
  })
}

// ─────────────────────────────────────────────── the Comet
const CN = 20
const CBLOB = blob(CN, (u, v) => { const a = Math.atan2(v, u); return Math.hypot(u, v * 1.08) <= 8.1 + 0.8 * Math.sin(3 * a + 0.6) + 0.4 * Math.cos(5 * a) })
const dirAngle = d => Array.isArray(d) ? Math.atan2(d[1], d[0]) : d
export function drawComet(ctx, x, y, size, t, opts = {}) {
  const { sunDir = [-1, 0.55], tail, mood = 'neutral', look, blink, bob, hops = null, seed = 3, glow = 1, alpha = 1, pop = 1, aura = true, exPin: pin = true } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const s = size * pop, c = cellOf(s, CN), S = c * CN
  const hs = hopState(t, hops), bobA = bob === undefined ? size * 0.035 : bob
  const cy = y + Math.sin(t * 2.4 + seed) * bobA - hs.lift * size * 0.1
  const away = dirAngle(sunDir) + Math.PI, L = (tail ?? size * 3.2) * pop
  ctx.save(); ctx.globalAlpha *= alpha
  if (aura && s >= 50) exAura(ctx, x, cy, S * 0.8, t, { seed })
  // the tails (behind): the ion tail straight away from the Sun, the dust tail curving off a little
  if (L > 0) {
    const q = Math.max(2, Math.round(c * 0.9)), R = rng(seed * 31 + 7)
    for (const kind of ['dust', 'ion']) {
      const bend = kind === 'dust' ? 0.32 : 0, wid = kind === 'dust' ? 0.42 : 0.2, cols = kind === 'dust' ? ['#fff1c8', '#ffe39a', '#f2c75c'] : ['#e6fbff', '#9fe8ff', '#5fb8ff']
      const F = rng(seed * 7 + Math.floor(t * 10) + (kind === 'dust' ? 99 : 0))
      for (let d = S * 0.2; d < L; d += q) {
        const k = d / L, a = away + bend * k * k, hw = S * wid * (0.35 + 1.1 * k), cx = x + Math.cos(a) * d, cyy = cy + Math.sin(a) * d
        for (let o = -hw; o <= hw; o += q) {
          const e = 1 - (o / hw) ** 2, fl = 0.75 + 0.25 * F()
          const al = (1 - k) ** 1.5 * e * fl * (kind === 'ion' ? 0.55 : 0.45)
          if (al < 0.04) continue
          ctx.globalAlpha = alpha * al
          ctx.fillStyle = cols[Math.min(2, Math.floor((1 - e) * 2 + k * 1.5))]
          ctx.fillRect(Math.round((cx - Math.sin(a) * o) / q) * q, Math.round((cyy + Math.cos(a) * o) / q) * q, q, q)
        }
      }
    }
    for (const kind of ['dust', 'ion']) {
      const bend = kind === 'dust' ? 0.32 : 0, wid = kind === 'dust' ? 0.5 : 0.28, cols = kind === 'dust' ? ['#fff1c8', '#ffe39a', '#f2c75c'] : ['#bff0ff', CYAN, '#5fb8ff']
      const n = Math.max(16, Math.round(L / q * 1.4))
      for (let i = 0; i < n; i++) {
        const k = i / n, rr = R(), flow = (k + t * (kind === 'ion' ? 0.9 : 0.5) + rr) % 1
        const d = flow * L, a = away + bend * flow * flow, spread = (rr - 0.5) * 2 * S * wid * (0.25 + flow)
        const px0 = x + Math.cos(a) * d - Math.sin(a) * spread, py0 = cy + Math.sin(a) * d + Math.cos(a) * spread
        ctx.globalAlpha = alpha * (1 - flow) ** 1.4 * (kind === 'ion' ? 0.85 : 0.7)
        ctx.fillStyle = cols[i % 3]
        const qq = Math.max(2, Math.round(q * (1.6 - flow)))
        ctx.fillRect(Math.round(px0 / qq) * qq, Math.round(py0 / qq) * qq, qq, qq)
      }
    }
    ctx.globalAlpha = alpha
  }
  glowAt(ctx, x, cy, S * 1.05, '#9fe8ff', glow)
  glowAt(ctx, x, cy, S * 0.55, '#ffffff', glow * 0.4)
  ctx.save(); ctx.translate(Math.round(x), Math.round(cy + S * 0.45)); ctx.scale(1 + hs.sq, 1 - hs.sq * 0.9); ctx.translate(0, -S * 0.45)
  const px = painter(ctx, -S / 2, -S / 2, c)
  for (let j = 0; j < CN; j++) for (let i = 0; i < CN; i++) {
    if (CBLOB.ring(i, j)) { px(i, j, '#2a3a5a'); continue }
    if (!CBLOB.on(i, j)) continue
    const u = (i + 0.5 - 10) / 8, v = (j + 0.5 - 10) / 8
    let col = u + v < -0.8 ? '#ffffff' : u + v > 0.9 ? '#6a8fb0' : u + v > 0.5 ? '#9fc8e0' : COMET.color
    if ((i === 13 && j === 15) || (i === 5 && j === 13) || (i === 14 && j === 6)) col = '#7a8aa0'
    px(i, j, col)
  }
  drawFace(px, 5, 12, 8, t, { mood, look, blink, seed, blushCols: [3, 4, 15, 16], blushRow: 12 })
  ctx.restore()
  if (pin && s >= 50) exPin(ctx, x + S * 0.48, cy - S * 0.5, t, { scale: clamp(s / 180, 0.6, 1.2) })
  ctx.restore()
  return { x, y: cy, size: S, top: cy - S / 2 }
}

// ─────────────────────────────────────────────── the Satellite (the Orbiter)
export function drawSatellite(ctx, x, y, size, t, opts = {}) {
  const { orbit = null, viewed = true, rot = 0, mood = 'neutral', look, blink, bob, hops = null, seed = 11, glow = 0.7, alpha = 1, pop = 1, aura = true, exPin: pin = true } = opts
  let X = x, Y = y, k = 1, behind = false
  if (orbit) {
    const { cx, cy: ocy, r, speed = 0.8, tilt = 0.32, phase = 0 } = orbit
    const a = phase + t * speed
    X = cx + Math.cos(a) * r; Y = ocy + Math.sin(a) * r * tilt; behind = Math.sin(a) < 0; k = 1 + 0.12 * Math.sin(a)
  }
  if (alpha <= 0 || pop <= 0) return { x: X, y: Y, size, top: Y, behind }
  const s = size * pop * k, c = cellOf(s, 34)
  const hs = hopState(t, hops), bobA = bob === undefined ? size * 0.025 : bob
  const cy = Y + Math.sin(t * 1.6 + seed) * bobA - hs.lift * size * 0.08
  ctx.save(); ctx.globalAlpha *= alpha * (behind ? 0.85 : 1)
  if (aura && s >= 80) exAura(ctx, X, cy, s * 0.42, t, { seed })
  glowAt(ctx, X, cy, s * 0.5, '#c9d6ff', glow * 0.6)
  ctx.translate(Math.round(X), Math.round(cy)); ctx.rotate(rot + Math.sin(t * 0.9 + seed) * 0.05)
  const px = painter(ctx, -17 * c, -9 * c, c)            // grid 34 × 18; body at cols 12–21, rows 6–15
  // solar panels (both sides) on arms
  const tiltP = Math.sin(t * 0.7 + seed) > 0.85 ? 1 : 0
  for (const side of [0, 1]) {
    const i0 = side ? 24 : 0
    for (let j = 7 - tiltP; j <= 14 + tiltP; j++) for (let i = i0; i < i0 + 10; i++) {
      const edge = i === i0 || i === i0 + 9 || j === 7 - tiltP || j === 14 + tiltP
      px(i, j, edge ? INK : (i - i0) % 3 === 0 || j === 10 + (j > 10 ? 1 : 0) ? '#1b2a5a' : ((i + j) % 4 === 0 ? '#6f94ec' : '#2f55b8'))
    }
    for (let i = side ? 22 : 10; i < (side ? 24 : 12); i++) { px(i, 10, INK); px(i, 11, '#c8c8d8') }
  }
  // body: gold foil (crinkled)
  for (let j = 6; j <= 15; j++) for (let i = 12; i <= 21; i++) {
    const edge = i === 12 || i === 21 || j === 6 || j === 15
    const h = ((i * 73 + j * 151 + seed * 7) % 11)
    px(i, j, edge ? INK : h < 2 ? '#f2c75c' : h > 8 ? '#a8762a' : SATELLITE.color)
  }
  // the dish on a stalk + an antenna
  for (let j = 3; j <= 5; j++) px(16, j, INK), px(17, j, '#c8c8d8')
  for (const [i, j] of [[13, 0], [14, 1], [15, 2], [16, 2], [17, 2], [18, 2], [19, 1], [20, 0]]) px(i, j, INK)
  for (const [i, j] of [[14, 0], [15, 1], [16, 1], [17, 1], [18, 1], [19, 0], [15, 0], [16, 0], [17, 0], [18, 0]]) px(i, j, j === 0 && i < 17 ? '#ffffff' : '#e8ecf6')
  px(20, 5, INK); px(21, 4, INK); px(22, 3, INK); px(23, 2, '#ff8fb1')
  // the face: two camera-lens eyes on the foil
  for (const ex of [13, 18]) for (let j = 8; j <= 12; j++) for (let i = ex - 0; i <= ex + 2; i++) if (j === 8 || j === 12) px(i, j, '#4a4566')
  drawFace(px, 13, 18, 9, t, { mood, look, blink, seed })
  // the blinking red "viewed" light (top-left corner of the body)
  if (viewed) {
    const on = (t * 0.85 + seed * 0.13) % 1 < 0.32
    px(12, 5, INK); px(13, 5, INK); px(12, 4, INK); px(13, 4, on ? '#ff3d3d' : '#6a1a22')
    if (on) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; const g = ctx.createRadialGradient(-17 * c + 13.5 * c, -9 * c + 4.5 * c, 0, -17 * c + 13.5 * c, -9 * c + 4.5 * c, c * 4); g.addColorStop(0, 'rgba(255,60,60,0.7)'); g.addColorStop(1, 'rgba(255,60,60,0)'); ctx.fillStyle = g; ctx.fillRect(-17 * c + 9.5 * c, -9 * c + 0.5 * c, 8 * c, 8 * c); ctx.restore() }
  }
  ctx.restore()
  if (pin && s >= 80) exPin(ctx, X + s * 0.12, cy - s * 0.3, t, { scale: clamp(s / 300, 0.6, 1.2) })
  return { x: X, y: cy, size: s, top: cy - 9 * c, behind }
}

// ─────────────────────────────────────────────── the Meteor
const RN = 16
const RBLOB = blob(RN, (u, v) => { const a = Math.atan2(v, u); return Math.hypot(u, v) <= 6.6 + 0.7 * Math.sin(2 * a + 1.1) + 0.5 * Math.cos(5 * a) })
const FLAME = ['#fffbe0', '#ffe46a', '#ffb02a', '#ff6a2a', '#e8323a']
export function drawMeteor(ctx, x, y, size, t, opts = {}) {
  const { dir = 2.36, trail, burn = 0, puff, mood = 'neutral', look, blink, bob, hops = null, seed = 17, glow = 1, alpha = 1, pop = 1, aura = true, exPin: pin = true } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const b = clamp(burn), shrink = lerp(1, 0.28, ease.inOutCubic(b))
  const s = size * pop * shrink, c = cellOf(s, RN), S = c * RN
  const hs = hopState(t, hops), bobA = bob === undefined ? size * 0.03 : bob
  const cy = y + Math.sin(t * 3.1 + seed) * bobA - hs.lift * size * 0.1
  const fire = clamp(1 - b * 1.15), back = dir + Math.PI, L = (trail ?? size * 2.8) * pop * fire
  ctx.save(); ctx.globalAlpha *= alpha
  if (aura && fire > 0.2 && s >= 40) exAura(ctx, x, cy, S * 0.85, t, { seed, alpha: fire })
  // the flame trail: flickering pixel streaks, tapering away, plus sparks
  if (L > 0) {
    const R = rng(seed * 13 + Math.floor(t * 20)), q = Math.max(3, Math.round(c * 1.1))
    const F = rng(seed * 5 + Math.floor(t * 14))
    for (let d = 0; d < L; d += q) {
      const k = d / L, hw = S * 0.5 * (1 - k) ** 0.7 + q, cx = x + Math.cos(back) * d, cyy = cy + Math.sin(back) * d
      for (let o = -hw; o <= hw; o += q) {
        const e = 1 - Math.abs(o / hw), fl = F()
        if (fl > 0.35 + 0.65 * (1 - k) * e + 0.15) continue
        ctx.globalAlpha = alpha * Math.min(1, (1 - k) * 1.3) * (0.55 + 0.45 * e)
        ctx.fillStyle = FLAME[Math.min(4, Math.floor(k * 3 + (1 - e) * 2.2))]
        ctx.fillRect(Math.round((cx - Math.sin(back) * o) / q) * q, Math.round((cyy + Math.cos(back) * o) / q) * q, q, q)
      }
    }
    const n = Math.round(L / q * 2.2)
    for (let i = 0; i < n; i++) {
      const k = R() ** 0.8, d = k * L, w = S * 0.46 * (1 - k * 0.75), sp = (R() - 0.5) * 2 * w
      const fx = x + Math.cos(back) * d - Math.sin(back) * sp, fy = cy + Math.sin(back) * d + Math.cos(back) * sp
      ctx.globalAlpha = alpha * (1 - k) * 0.95
      ctx.fillStyle = FLAME[Math.min(4, Math.floor(k * 4.2 + Math.abs(sp) / Math.max(1, w) * 1.2))]
      const qq = Math.max(2, Math.round(q * (1.5 - k)))
      ctx.fillRect(Math.round(fx / qq) * qq, Math.round(fy / qq) * qq, qq, qq)
    }
    for (let i = 0; i < 8; i++) {
      const ph = (t * 1.7 + i / 8 + seed * 0.1) % 1, a = back + (((i * 37) % 9) / 9 - 0.5) * 1.2
      ctx.globalAlpha = alpha * (1 - ph) * fire
      drawPixelStar(ctx, x + Math.cos(a) * (S * 0.4 + ph * L * 0.6), cy + Math.sin(a) * (S * 0.4 + ph * L * 0.6), Math.max(8, S * 0.18) * (1 - ph * 0.6), 2, i % 2 ? '#ffe46a' : '#fffbe0')
    }
    ctx.globalAlpha = alpha
    glowAt(ctx, x, cy, S * 1.4, '#ff8a2a', glow * fire)
  }
  // the rock: molten → grey pebble
  ctx.save(); ctx.translate(Math.round(x), Math.round(cy + S * 0.45)); ctx.scale(1 + hs.sq, 1 - hs.sq * 0.9); ctx.translate(0, -S * 0.45)
  const px = painter(ctx, -S / 2, -S / 2, c)
  for (let j = 0; j < RN; j++) for (let i = 0; i < RN; i++) {
    if (RBLOB.ring(i, j)) { px(i, j, INK); continue }
    if (!RBLOB.on(i, j)) continue
    const u = (i + 0.5 - 8) / 6.6, v = (j + 0.5 - 8) / 6.6, rim = Math.hypot(u, v) > 0.78
    const hot = u + v < -0.6 ? '#ffe46a' : rim ? '#ff8a2a' : u + v > 0.6 ? '#7a3a2a' : '#a8543a'
    const cold = u + v < -0.6 ? '#b8b2c4' : u + v > 0.6 ? '#5f5870' : '#8a8296'
    let col = mixHex(hot, cold, b)
    if (fire > 0.2 && ((i === 5 && j === 11) || (i === 6 && j === 12) || (i === 11 && j === 4))) col = '#ffb02a'
    px(i, j, col)
  }
  drawFace(px, 4, 9, 6, t, { mood, look, blink, seed, blushCols: [3, 12], blushRow: 10 })
  ctx.restore()
  // the puff of smoke as it burns out
  const pf = puff ?? (b > 0.8 && b < 1 ? Math.sin(Math.PI * (b - 0.8) / 0.2) : 0)
  if (pf > 0) {
    const pr = (puff ?? (b - 0.8) / 0.2), q = Math.max(4, Math.round(size / 18))
    ctx.save(); ctx.globalAlpha *= pf * 0.85
    for (let i = 0; i < 14; i++) {
      const a = i / 14 * TAU + seed, d = size * (0.25 + 0.55 * pr) * (0.8 + 0.3 * ((i * 7) % 3) / 2)
      ctx.fillStyle = i % 3 ? '#cfc8dc' : '#efe6d6'
      const qq = q * (1.6 - pr * 0.6)
      ctx.fillRect(Math.round((x + Math.cos(a) * d) / q) * q - qq / 2, Math.round((cy + Math.sin(a) * d * 0.8) / q) * q - qq / 2, qq, qq)
    }
    ctx.restore()
  }
  if (pin && s >= 40) exPin(ctx, x + S * 0.5, cy - S * 0.55, t, { scale: clamp(s / 150, 0.55, 1.1), alpha: fire > 0 ? 1 : 0.8 })
  ctx.restore()
  return { x, y: cy, size: S, top: cy - S / 2 }
}

// ─────────────────────────────────────────────── the phone
export function drawPhone(ctx, x, y, h, t, { lit = 1, text = 'u up?', buzz = 0, alpha = 1, rot = 0, pop = 1 } = {}) {
  if (alpha <= 0 || pop <= 0) return
  const c = Math.max(2, Math.round(h * pop / 20)), w = 11, hh = 20
  const bz = buzz > 0 ? Math.sin(t * 70) * c * 0.8 * buzz : 0
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x + bz), Math.round(y)); ctx.rotate(rot + (buzz > 0 ? Math.sin(t * 55) * 0.05 * buzz : 0))
  const px = painter(ctx, -w * c / 2, -hh * c / 2, c)
  for (let j = 0; j < hh; j++) for (let i = 0; i < w; i++) {
    const corner = (i === 0 || i === w - 1) && (j === 0 || j === hh - 1)
    if (corner) continue
    const edge = i === 0 || i === w - 1 || j === 0 || j === hh - 1, bez = i === 1 || i === w - 2 || j < 2 || j > hh - 3
    px(i, j, edge ? INK : bez ? '#2a2440' : mixHex('#141026', j < 8 ? '#bfe6ff' : '#8fb8ff', lit))
  }
  px(5, 1, '#5a5478')
  ctx.restore()
  if (lit > 0.05) glowAt(ctx, x, y, h * 0.8 * pop, '#9fd8ff', 0.5 * lit * alpha)
  if (text && lit > 0.3) {
    const fs = Math.max(14, Math.round(h * pop * 0.2))
    ctx.save(); ctx.globalAlpha *= alpha * clamp((lit - 0.3) * 3)
    ctx.font = `700 ${fs}px ${MONO}`
    const tw = ctx.measureText(text).width, bw = tw + fs * 1.1, bh = fs * 1.6, bx = x + bz - bw / 2, by = y - hh * c * pop / 2 - bh - c * 2
    ctx.fillStyle = INK; ctx.fillRect(bx - c, by - c, bw + 2 * c, bh + 2 * c)
    ctx.fillStyle = BONE; ctx.fillRect(bx, by, bw, bh)
    ctx.fillStyle = INK; ctx.fillRect(x + bz - c, by + bh + c - 1, c * 2, c); ctx.fillRect(x + bz - c / 2, by + bh + 2 * c - 1, c, c)
    ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, x + bz, by + bh / 2 + fs * 0.06)
    ctx.restore()
  }
}

// ─────────────────────────────────────────────── the day chip
const ICON = {
  venus: ['.XXX.', 'X...X', 'X...X', 'X...X', '.XXX.', '..X..', '.XXX.', '..X..'],
  back: ['..X..', '.XX..', 'XXXXX', '.XX.X', '..X.X', '....X', '.XXX.'],
  fwd: ['..X..', '..XX.', 'XXXXX', '..XX.', '..X..'],
  sun: ['X.X.X', '.XXX.', 'XXXXX', '.XXX.', 'X.X.X'],
  rise: ['..X..', 'X.X.X', '.XXX.', 'XXXXX', '.....', 'XXXXX'],
}
const PHASE = {
  retro: { fill: '#ff86b8', ink: INK, icon: 'back', word: 'Rx' },
  gone: { fill: '#5f5482', ink: BONE, icon: 'sun', word: 'Rx' },
  morning: { fill: '#f7c06a', ink: INK, icon: 'rise', word: 'Rx' },
  direct: { fill: '#8ff0b4', ink: INK, icon: 'fwd', word: 'DIRECT' },
}
export function drawDayChip(ctx, t, { day = 1, x = 930, y = 120, phase = 'retro', alpha = 1, size = 28, text } = {}) {
  if (alpha <= 0) return
  const P = PHASE[phase] || PHASE.retro, q = Math.max(3, Math.round(size / 7))
  const label = text ?? `${P.word} · DAY ${String(day).padStart(2, '0')}`
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 ${size}px ${MONO}`
  const tw = Math.ceil(ctx.measureText(label).width), iconW = 5 * q * 2 + q * 3
  const w = Math.round((tw + iconW + size * 1.2) / q) * q, h = Math.round(size * 1.75 / q) * q
  const x0 = Math.round(x - w), y0 = Math.round(y - h / 2)
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(x0 + o + q, y0 + o, w - 2 * o - 2 * q, h - 2 * o); ctx.fillRect(x0 + o, y0 + o + q, w - 2 * o, h - 2 * o - 2 * q) }
  ctx.save(); ctx.shadowColor = rgba(P.fill, 0.6); ctx.shadowBlur = 18; step(-q, INK); ctx.restore()
  step(-q, INK); step(0, P.fill)
  ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillRect(x0 + 2 * q, y0 + q * 0.5, w * 0.4, q * 0.6)
  const iy = y0 + h / 2
  const venusAlpha = phase === 'gone' ? 0.45 : 1
  drawBits(ctx, ICON.venus, { X: P.ink }, x0 + size * 0.55 + 2.5 * q * 0.62, iy, q * 0.62, { outline: null, alpha: venusAlpha })
  drawBits(ctx, ICON[P.icon], { X: phase === 'gone' ? '#ffe7a0' : P.ink }, x0 + size * 0.55 + 2.5 * q * 0.62 + 5 * q * 0.62 + q * 1.2 + 2.5 * q * 0.6, iy, q * 0.6, { outline: null })
  ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText(label, x0 + size * 0.55 + iconW, iy + size * 0.05)
  ctx.restore()
}

// ─────────────────────────────────────────────── the hook card (DOM)
function tokens(text) {
  const out = []; let open = false
  for (const tok of String(text || '').trim().split(/\s+/)) {
    if (!tok) continue
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 }); if (stars % 2) open = !open
  }
  return out
}
export function hookCard(root, { text, at = 0, out, size = 110, accentSize = 160, top = 170, accentColor = PINK, color = BONE, width = 940, left, plate = true, lineHeight = 1.0 } = {}) {
  const L = left ?? Math.round((1080 - width) / 2)
  const wrap = el('div', { position: 'absolute', left: L + 'px', top: top + 'px', width: width + 'px', pointerEvents: 'none', transformOrigin: '50% 45%' }, root)
  if (plate) el('div', { position: 'absolute', left: '-90px', right: '-90px', top: '-70px', bottom: '-70px', background: 'radial-gradient(ellipse at 50% 50%, rgba(6,4,18,0.62) 0%, rgba(6,4,18,0.38) 45%, rgba(6,4,18,0) 72%)' }, wrap)
  const box = el('div', { position: 'relative', textAlign: 'center', fontFamily: INTER, fontWeight: 800, fontSize: size + 'px', lineHeight, color, letterSpacing: '-0.015em',
    textShadow: '0 5px 0 rgba(6,4,18,0.85), 0 0 36px rgba(6,4,18,0.85)' }, wrap)
  const acc = []
  for (const tk of tokens(text)) {
    if (tk.br) { el('br', {}, box); continue }
    const st = { display: 'inline-block', margin: '0 0.12em' }
    if (tk.accent) Object.assign(st, { fontFamily: SERIF, fontStyle: 'italic', fontWeight: 500, fontSize: accentSize + 'px', color: accentColor, letterSpacing: '0' })
    const e = el('span', st, box, tk.w.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
    if (tk.accent) acc.push(e)
  }
  // shrink to fit (never grow): measure each explicit line
  let widest = 0, cur = 0
  for (const n of box.childNodes) { if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue } cur += n.offsetWidth + 0.24 * (parseFloat(n.style.fontSize) || size) }
  widest = Math.max(widest, cur)
  if (widest > width) { const k = Math.max(0.6, (width - 8) / widest); box.style.fontSize = (size * k) + 'px'; for (const e of acc) e.style.fontSize = (accentSize * k) + 'px' }
  const O = out == null ? null : Array.isArray(out) ? out : [out, out + 0.28]
  const end = O ? O[1] : Infinity
  return {
    root: wrap, end,
    update(t) {
      const on = t >= at && t < end
      wrap.style.display = on ? 'block' : 'none'
      if (!on) return
      // the 2-frame shake (≈ 1/30 s each) at at + 0.1
      const d = t - (at + 0.1)
      let tx = 0, ty = 0, rot = 0
      if (d >= 0 && d < 1 / 30) { tx = 7; ty = -3; rot = 0.7 } else if (d >= 1 / 30 && d < 2 / 30) { tx = -6; ty = 2; rot = -0.6 }
      let sc = 1, op = 1
      if (O && t >= O[0]) { const p = prog(t, O[0], O[1]); sc = (1 + 0.08 * Math.sin(Math.PI * Math.min(1, p * 2.4))) * (1 - 0.55 * ease.inCubic(p)); op = 1 - ease.inCubic(p) }
      wrap.style.opacity = String(op)
      wrap.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc.toFixed(4)})`
    },
  }
}

// ─────────────────────────────────────────────── genre bug + ticker
function plate(ctx, x0, y0, w, h, q, col) { ctx.fillStyle = col; ctx.fillRect(x0 + q, y0, w - 2 * q, h); ctx.fillRect(x0, y0 + q, w, h - 2 * q) }
export function genreBug(ctx, t, { text = 'LIVE', x = 70, y = 232, color = EX_RED, align = 'left', size = 30, blink, alpha = 1, ink = BONE } = {}) {
  if (alpha <= 0) return
  const q = Math.max(3, Math.round(size / 8)), dot = blink ?? /\b(LIVE|REC)\b/.test(text)
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 ${size}px ${MONO}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = Math.round(size * 0.08) + 'px'
  const tw = Math.ceil(ctx.measureText(text).width), dw = dot ? size * 0.9 : 0
  const w = tw + dw + size * 0.9, h = Math.round(size * 1.6)
  const x0 = Math.round(align === 'right' ? x - w : x), y0 = Math.round(y - h / 2)
  plate(ctx, x0 - q, y0 - q, w + 2 * q, h + 2 * q, q, INK)
  plate(ctx, x0, y0, w, h, q, color)
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x0 + q * 2, y0 + q * 0.6, w * 0.45, q * 0.7)
  if (dot && (t * 1.2) % 1 < 0.6) { ctx.fillStyle = ink; const r = Math.round(size * 0.22 / q) * q || q; ctx.fillRect(Math.round(x0 + size * 0.45), Math.round(y0 + h / 2 - r), r * 2, r * 2) }
  ctx.fillStyle = ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'
  ctx.fillText(text, x0 + size * 0.45 + dw, y0 + h / 2 + size * 0.05)
  ctx.restore()
}
export function drawTicker(ctx, t, { text = '', y = 1780, speed = 160, label = null, color = EX_RED, band = '#120a24', size = 34, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const H = 72, y0 = Math.round(y - H / 2)
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.fillStyle = INK; ctx.fillRect(0, y0 - 4, 1080, H + 8)
  ctx.fillStyle = band; ctx.fillRect(0, y0, 1080, H)
  ctx.fillStyle = color; ctx.fillRect(0, y0, 1080, 6)
  ctx.font = `700 ${size}px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  let lx = 0
  if (label) {
    const lw = Math.ceil(ctx.measureText(label).width) + 44
    ctx.fillStyle = color; ctx.fillRect(0, y0, lw, H)
    ctx.fillStyle = '#ffffff'; ctx.fillText(label, 22, y0 + H / 2 + 3)
    ctx.fillStyle = INK; ctx.fillRect(lw, y0, 6, H)
    lx = lw + 6
  }
  ctx.save(); ctx.beginPath(); ctx.rect(lx, y0 + 6, 1080 - lx, H - 6); ctx.clip()
  const seg = text + '   •   ', sw = Math.max(1, ctx.measureText(seg).width)
  let px0 = lx + 24 - ((t * speed) % sw)
  ctx.fillStyle = BONE
  for (; px0 < 1080; px0 += sw) ctx.fillText(seg, Math.round(px0), y0 + H / 2 + 3)
  ctx.restore()
  ctx.restore()
}

// ─────────────────────────────────────────────── sound
const PCS = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
function keyInfo(key) {
  const m = key ? /^([A-G][#b]?)\s*(.*)$/.exec(String(key).trim()) : null
  const pc = m && PCS[m[1]] != null ? PCS[m[1]] : 2
  const minor = m ? /^(m(?!aj)|min|dor|aeol|phryg)/i.test(m[2]) : true
  return { pc, minor }
}
const hz = semi => 130.81 * 2 ** (semi / 12)   // semitones above C3
function chords(key) {
  const { pc, minor } = keyInfo(key)
  const lo = pc < 5 ? pc + 12 : pc
  const third = minor ? 3 : 4
  return {
    tonic: [lo - 12, lo - 5, lo, lo + third, lo + 7].map(hz),
    minor: [lo - 12, lo, lo + 3, lo + 7].map(hz),
    major: [lo - 12, lo, lo + 4, lo + 7].map(hz),
    six: [lo - 16, lo - 4, lo, lo + 3].map(hz),
    root: hz(lo), fifth: hz(lo + 7), low: hz(lo - 24),
  }
}
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const stab = (t, freqs, len, gain = 0.045, low = 70) => [['brass', r3(t), freqs.map(r2), len, { gain, bright: 1.3, ...FXB }], ['tom', r3(t), r2(low), { gain: 0.3, decay: 0.5, rev: 0.4, bus: 'fx' }]]
export function hookCues(at = 0, { key = null } = {}) {
  const C = chords(key), hit = at + 0.16
  return [
    ['chip', r3(at), 520, 0.075, { wave: 'noise', slide: 380, gain: 0.05, decay: 0.05, sustain: 0.9, rev: 0.02, dly: 0 }],
    ['chip', r3(at + 0.075), 1500, 0.07, { wave: 'noise', slide: -520, gain: 0.045, decay: 0.05, sustain: 0.9, rev: 0.02, dly: 0 }],
    ['tick', r3(at), 0.05],
    ...stab(hit, C.tonic.slice(1, 4), 0.32, 0.05, C.low * 1.5),
    ['boom', r3(hit), 0.32], ['snare', r3(hit), { gain: 0.22, rev: 0.3 }], ['crash', r3(hit), { gain: 0.05, len: 1.6 }],
  ]
}
export const STINGER_KINDS = ['news', 'horror', 'gameshow', 'sitcom', 'noir', 'sports', 'trailer', 'wedding']
export function stingerCues(at, { key = null, kind = 'news' } = {}) {
  const C = chords(key), a = at
  switch (kind) {
    case 'news': return [   // ba-da-BAM: two quick brass pickups and the big chord on `at`
      ...stab(a - 0.24, [C.root, C.fifth].map(f => f * 2), 0.09, 0.04, C.low * 2), ...stab(a - 0.12, [C.root * 2, C.fifth * 2], 0.09, 0.04, C.low * 2),
      ...stab(a, C.tonic, 0.9, 0.055, C.low * 1.5), ['boom', r3(a), 0.34], ['crash', r3(a), { gain: 0.06, len: 2 }], ['whoosh', r3(a - 0.05), 0.4, 0.05],
      ['bell', r3(a + 0.02), r2(C.root * 4), 0.025, 1.4, 0],
    ]
    case 'horror': return [
      ['swell', r3(a - 0.9), r3(a), { gain: 0.06, f0: 300, f1: 5000 }],
      ['brass', r3(a), C.six.map(f => r2(f / 2)), 1.6, { gain: 0.06, bright: 0.8, ...FXB }], ['boom', r3(a), 0.42], ['tom', r3(a), r2(C.low), { gain: 0.38, decay: 0.9, rev: 0.5, bus: 'fx' }],
      ['bell', r3(a + 0.05), r2(C.root * 2 * 1.06), 0.03, 2.4, -0.3], ['bell', r3(a + 0.05), r2(C.root * 2), 0.03, 2.4, 0.3], ['crash', r3(a), { gain: 0.04, len: 2.6 }],
    ]
    case 'gameshow': return [
      ['bell', r3(a), r2(C.root * 4), 0.04, 0.9, -0.2], ['bell', r3(a + 0.12), r2(C.root * 4 * 1.26), 0.04, 0.9, 0], ['bell', r3(a + 0.24), r2(C.root * 6), 0.045, 1.3, 0.2],
      ['glitter', r3(a + 0.2), r3(a + 0.9)], ['pop', r3(a + 0.24), 1318.51, 0.04, 0], ['crash', r3(a + 0.24), { gain: 0.04, len: 1.4 }],
    ]
    case 'sitcom': return [   // ba-dum-tss
      ['tom', r3(a - 0.2), r2(C.low * 3), { gain: 0.3, decay: 0.25 }], ['tom', r3(a - 0.08), r2(C.low * 2.4), { gain: 0.3, decay: 0.3 }],
      ['kick', r3(a), { gain: 0.35 }], ['crash', r3(a), { gain: 0.05, len: 1.1 }], ['hat', r3(a), { gain: 0.06, open: true }],
    ]
    case 'noir': return [
      ['epiano', r3(a), C.minor.map(f => r2(f * 2)), 1.8, { gain: 0.05, rev: 0.5 }], ['brush', r3(a), { gain: 0.05 }], ['brush', r3(a + 0.25), { gain: 0.035 }],
      ['bass', r3(a), r2(C.low * 2), 1.2, { gain: 0.16 }],
    ]
    case 'sports': return [
      ['chip', r3(a - 0.32), 2600, 0.12, { wave: 'square', duty: 0.5, vib: 0.03, gain: 0.025, rev: 0.1 }], ['chip', r3(a - 0.14), 2600, 0.42, { wave: 'square', duty: 0.5, vib: 0.04, gain: 0.025, rev: 0.1 }],
      ['kick', r3(a + 0.3), { gain: 0.4 }], ['clap', r3(a + 0.3), { gain: 0.26 }], ['crash', r3(a + 0.3), { gain: 0.05, len: 1.6 }],
    ]
    case 'trailer': return [
      ['brass', r3(a), [C.low * 2, C.low * 3, C.low * 4].map(r2), 2.2, { gain: 0.07, bright: 0.9, ...FXB }], ['boom', r3(a), 0.48], ['crash', r3(a), { gain: 0.06, len: 3 }],
      ['tom', r3(a), r2(C.low), { gain: 0.4, decay: 1.1, rev: 0.5, bus: 'fx' }], ['whoosh', r3(a - 0.25), 0.5, 0.06],
    ]
    case 'wedding': return [
      ...[0, 4, 7, 12].map((s, i) => ['bell', r3(a + i * 0.22), r2(C.root * 2 * 2 ** (s / 12)), 0.045, 2.4, (i - 1.5) * 0.2]),
      ['fmbell', r3(a + 0.9), r2(C.root * 2), { gain: 0.04, decay: 2.6 }], ['glitter', r3(a), r3(a + 1.2)],
    ]
    default: return []
  }
}
