// st5cast — the shared cast + soap-opera devices of Star Talk season 5, "STAR-CROSSED" (promo/films/STARTALK6.md).
// Owned by the st5thirteenth agent (EP 01). Every season-5 episode imports it so the newcomers and the framing look
// the same in all ten. Drawn in startalk.js's pixel style (crisp cells, 1-cell ink outline, soft additive glow).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { OPH, PLUTO, TWIN, SATURN, drawOphiuchus, drawPluto, drawTwin, drawSaturn, drawBlackHole, drawPulledBubble,
//            STING_LEN, stingTimes, drawTitleSting, titleStingCues, NEXT_LEN, nextTimeTimes, drawNextTime, nextTimeCues,
//            gaspZoom, drawGaspLines, gaspCues, twistCues } from '../../st5cast.js'
//
// ── the newcomers (all pure f(t); each returns { x, y, size, top } like drawStarChar: y = the bobbed centre, top = the
//    upper edge of the sprite, handy for placing a bubble or a prop above it)
// drawOphiuchus(ctx, x, y, size, t, opts)   the glittery "13th sign": a drawStarChar whose body shimmers teal ↔ violet
//   (OPH.teal #4fe0d4 ↔ OPH.violet #a46cff, 6 quantised steps), orbited by glitter, holding a gold pixel staff with a
//   green serpent coiled round it (the serpent slithers, blinks and flicks a pink tongue). Same face system and moods as
//   drawStarChar ('neutral' 'happy' 'wink' 'squint' 'wide' 'heart' 'eyeroll' 'sleepy' 'sparkle'), plus every other
//   drawStarChar opt (look, blink, bob, squash, hops, seed, glow, alpha, pop, blush).
//   extra opts: staff = true · side = 1 (staff in the right hand; −1 = left) · glitter = 0…1 (default 1) ·
//               snake = 'neutral' | 'heart' | 'wide' | 'sleepy' (the serpent's own eye) · shimmer = 1 (0 = hold teal-violet mid)
//   Name tag: OPH.tag ('✦ OPHIUCHUS'; ⛎ has no pixel-friendly font on the renderer), tag colour OPH.tagColor.
// drawPluto(ctx, x, y, size, t, opts)       the tiny grumpy grey dwarf planet (size ≈ 90–220 px: it is SMALL next to the
//   stars), pale heart patch on its face (Tombaugh Regio, the real one), a few craters, two pixel eyes with brows and a
//   little gold crown that slips.  opts: mood 'grumpy' (default: brows down) | 'neutral' | 'wide' | 'sad' (brows up + a
//   tear) | 'happy' (^ ^) | 'squint' | 'heart' · look [x, y] −1…1 · crownSlip 0…1 (0 = on top, 0.5 = tilted half off,
//   1 = hanging off the right side over its eye) · blink (auto | false | 0…1) · bob · hops · seed · glow · alpha · pop.
//   Colours: PLUTO.body #a7a2b4 (grey), PLUTO.heart #eadfcf, crown gold #f7c948. Tag PLUTO.tag '♇ PLUTO'.
// drawTwin(ctx, x, y, size, t, opts)        Gemini's mischievous twin (Castor & Pollux): drawStarChar in Gemini's colour
//   (TWIN.color #f2cf4a, glyph ♊) + a curly ink pixel mustache that follows every hop/squash. opts: everything
//   drawStarChar takes, plus mustache = true, twitch = [times] (the ends flick up for 0.3 s; it also twitches on its own
//   every ~2.8 s unless twitch: false). Tag TWIN.tag '♊ THE TWIN' (the real Gemini keeps '♊ GEMINI').
// drawSaturn(ctx, x, y, size, t, opts)      the season-4 teacher, shared so the rulebook scenes match: a ringed pixel
//   planet (size = ring width, ≈ 160–260) with glasses. opts: mood 'neutral' | 'squint' | 'wide' | 'happy' · look ·
//   pointer = true · prop = null | 'camera' | 'book' (held in front) · rot (default −0.18) · pop · hops · seed · bob.
//   Tag SATURN.tag '♄ SATURN'.
//
// ── the black hole (EP 03 → 09)
// drawBlackHole(ctx, x, y, r, t, { strength = 1, tilt = 0.4, alpha = 1, spin = 1 })   a swirling pixel void: violet
//   spiral arms sucked inward, a bright photon ring, a tilted orange-pink accretion ring passing in front of / behind the
//   void, debris pixels spiralling in. r = the void's radius (the whole thing spans ≈ 2.7 r). strength 0…1.5: arm
//   brightness, debris and spin (0 = nothing drawn; shrink r to make it "shrink to a dot").
// drawPulledBubble(ctx, t, { text, from: [x, y], to: [x, y], at, dur = 1.5, appear = at − 1, size = 34, color })
//   a pixel text bubble (Space Mono) that pops in at `appear`, quivers toward the hole, then from `at` spirals into `to`
//   over `dur`, stretching (spaghettification) and shrinking to nothing. Gone after at + dur.
//
// ── the soap-opera framing
// STING_LEN = 2.4 · stingTimes(at) → { cross, slam, episode, out, end }
// drawTitleSting(ctx, t, { ep, at = 0, dur = STING_LEN, y = 860 })   the "★ STAR-CROSSED ★ / EPISODE N" opener on a
//   canvas: two shooting stars cross (star-crossed, literally) at `cross`, a gold pixel panel slams in with a sparkle
//   burst and a shine, "EPISODE N" types on under it, everything zips out by at + dur. Draw it last on your scene
//   canvas (it sits over the sky); keep DOM type off-screen until it ends.
// titleStingCues(at, { key, dur }) → the matching sound: whoosh, the cross hit (boom + tom + crash + a held brass
//   chord in your key), glitter, a bell and one tick per EPISODE letter.
// NEXT_LEN = 4.2 · nextTimeTimes(at, { tease, dur }) → { label, stabs: [3], panel, words: [t…], done, out, end }
// drawNextTime(ctx, t, { at, tease, dur = NEXT_LEN, y = 700, dim = 0.4, accentColor = '#ff8fb1' })   the cliffhanger
//   tag before the end card: "NEXT TIME ON" types on, the gold "★ STAR-CROSSED… ★" panel slams in on the dun-dun-DUN, and
//   the one-line tease pops in word by word (Inter 800 bone; '*…*' = EB Garamond italic accent; '|' = line break).
//   It fades out over the last 0.4 s and is fully gone at at + dur: end it on (or before) the end card's start and show
//   only the plain sky then (the end-card contract). Tease ≤ ~60 chars; it stays readable ≥ 2 s.
// nextTimeCues(at, { key, tease, dur }) → typing ticks, the dun-dun-DUN (brass + tom ×2, then a long brass + boom), a
//   pop per tease word.
// gaspZoom(t, { at, dur = 1.3, x, y, amount = 0.5, follow = 0.6, cx = 540, cy = 960 }) → { k, s, apply(ctx) }
//   a soap-opera punch-in on a gasping star: k 0…1 (fast easeOutBack in, a shudder, eased back out over the last 0.45 s).
//   apply(ctx) multiplies the camera into ctx (call it inside save()/restore() before drawing the scene; returns k > 0).
// drawGaspLines(ctx, t, { at, dur = 1.3, x, y, color = '#ff8fb1' })   radial pixel speed-lines + a dark vignette around the
//   focus, in screen space (draw after restore()).
// gaspCues(at, { key }) → the stinger: a quick whoosh in, a brass stab + tom + boom + crash, a gasp 'tick'.
// twistCues(at, { key }) → the bigger twist stinger: dun · dun · DUNNN (brass + tom, brass + tom, long brass + boom + crash).
//   Pass key = your music.key ('Dm', 'F', 'Bbm'…): brass isn't moved by the engine, so st5cast writes it in your key.
//
// Nothing touches `document` at module top level (buffers are created lazily): the sound build imports this in node.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../src/lib.js'
import { drawPixelStar } from './sky.js'
import { easeOutBack } from './wheel.js'
import { drawStarChar, signStar } from './startalk.js'

const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#d9cdf0', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3), r2 = v => +v.toFixed(2)

export const OPH = { teal: '#4fe0d4', violet: '#a46cff', color: '#7aa6ec', tag: '✦ OPHIUCHUS', tagColor: '#9fe8ff', staff: '#f2c75c', snake: '#6fdc6a' }
export const PLUTO = { body: '#a7a2b4', heart: '#eadfcf', crown: '#f7c948', tag: '♇ PLUTO', tagColor: '#cfcad9' }
export const TWIN = { ...signStar('gemini'), tag: '♊ THE TWIN', tagColor: '#f2cf4a' }
export const SATURN = { tag: '♄ SATURN', tagColor: '#f7dca0' }

// ─────────────────────────────────────────────── colour helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }

function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}

/** draw a bitmap of cells ('.' = empty) with a 1-cell ink outline, centred on (cx, cy) */
export function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, flip = false } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); if (flip) x.scale(-1, 1)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}

// ─────────────────────────────────────────────── drawStarChar's sprite transform (mirrored so overlays follow hops)
const G = 36, HALF = 18, FOOT_ROW = 19.6 + 17.6 * Math.cos(Math.PI / 5)
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
/** the exact placement drawStarChar uses this frame: cell size, bobbed centre, squash */
function starXform(x, y, size, t, { bob, squash = 0, hops = null, seed = 1, pop = 1 } = {}) {
  const s = size * pop
  const cell = s >= 100 ? Math.max(1, Math.round(s / G)) : s / G
  const bobA = bob === undefined ? size * 0.035 : bob
  const hs = hopState(t, hops)
  const sq = squash + hs.sq + 0.018 * Math.sin(t * 3.1 + seed * 1.7)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  return { cell, x, cy, sx: 1 + sq, sy: 1 - sq * 0.9, base: (FOOT_ROW - HALF) * cell }
}
/** run fn with ctx mapped so (i, j) sprite cells → (i·cell, j·cell) relative to the sprite's top-left corner */
function inSprite(ctx, X, fn) {
  ctx.save()
  ctx.translate(Math.round(X.x), Math.round(X.cy + X.base)); ctx.scale(X.sx, X.sy)
  ctx.translate(-HALF * X.cell, -HALF * X.cell - X.base)
  fn(X.cell)
  ctx.restore()
}

// ─────────────────────────────────────────────── Ophiuchus
const SHIMMER = Array.from({ length: 6 }, (_, k) => mixHex(OPH.teal, OPH.violet, 0.5 + 0.5 * k / 5))   // periwinkle → violet (teal lives in the glitter)
export function drawOphiuchus(ctx, x, y, size, t, opts = {}) {
  const { staff = true, side = 1, glitter = 1, snake = 'neutral', shimmer = 1, alpha = 1, pop = 1, seed = 13, glow = 1.25 } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const ph = shimmer ? 0.5 + 0.5 * Math.sin(t * 2.3 + seed) : 0.5
  const color = SHIMMER[Math.round(ph * 5)]
  const X = starXform(x, y, size, t, { ...opts, seed })
  // the staff + serpent: the back half of the coil, then the star, then the staff and the front half
  const drawStaff = (front) => inSprite(ctx, X, c => {
    ctx.globalAlpha *= alpha
    const sx0 = side > 0 ? 31 : 3          // staff column (cells, 2 wide)
    const top = 3, bot = 37
    const px = (i, j, col) => { ctx.fillStyle = col; ctx.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
    if (front) {
      for (let j = top; j <= bot; j++) { px(sx0 - 1, j, INK); px(sx0 + 2, j, INK); px(sx0, j, OPH.staff); px(sx0 + 1, j, j % 5 === 0 ? '#c98a1f' : '#ffe39a') }
      px(sx0, bot + 1, INK); px(sx0 + 1, bot + 1, INK)
      // the knob: a little gold orb with a gem
      for (const [a, b] of [[-1, -2], [0, -2], [1, -2], [2, -2], [-1, -1], [2, -1], [-2, -1], [3, -1], [-2, 0], [3, 0], [-1, 0], [2, 0]]) px(sx0 + a, top + b, INK)
      for (const [a, b] of [[0, -1], [1, -1], [0, 0], [1, 0]]) px(sx0 + a, top + b, (t * 2 + seed) % 1 < 0.5 ? '#ff8fd8' : '#ffd1f0')
      px(sx0 - 1, top - 3, INK); px(sx0, top - 3, INK); px(sx0 + 1, top - 3, INK); px(sx0 + 2, top - 3, INK)
    }
    // the serpent: a sine coil round the staff, slithering upward
    const slither = t * 2.2
    for (let j = 9; j <= 33; j++) {
      const a = (j * 0.62) - slither
      const dx = Math.sin(a) * 3, isFront = Math.cos(a) > 0
      if (isFront !== front) continue
      const i = Math.round(sx0 + dx)
      px(i - 1, j, INK); px(i + 2, j, INK); px(i, j, (j + Math.floor(t * 6)) % 4 === 0 ? '#c8f56a' : OPH.snake); px(i + 1, j, '#3fa84a')
    }
    if (front) {
      // head: up at the top of the coil, looking toward the star
      const hy = 7 + Math.round(Math.sin(t * 1.7 + seed) * 0.6), dir = -side, hx = sx0 + 0.5 + dir * 2
      const H = ['.XXX.', 'XGGGX', 'XGEGX', 'XGGGX', '.XGX.']
      H.forEach((row, jj) => [...row].forEach((ch, ii) => {
        if (ch === '.') return
        const i = Math.round(hx - 2 + (dir < 0 ? 4 - ii : ii)), j = hy + jj - 2
        if (ch === 'X') px(i, j, INK)
        else if (ch === 'G') px(i, j, '#8af07e')
        else {
          const blink = (t + seed * 0.3) % 2.9 < 0.12
          px(i, j, blink ? '#3a8a3a' : snake === 'heart' ? '#ff3d6e' : snake === 'wide' ? '#ffffff' : INK)
          if (snake === 'wide' && !blink) { px(i, j - 1, '#ffffff') }
        }
      }))
      // tongue flick
      const fl = (t * 0.8 + seed * 0.11) % 1
      if (fl < 0.12) { const tx = Math.round(hx + dir * 3); px(tx, hy + 1, '#ff4f86'); px(tx + dir, hy + 1, '#ff4f86'); px(tx + dir * 2, hy, '#ff4f86'); px(tx + dir * 2, hy + 2, '#ff4f86') }
      if (snake === 'sleepy') { ctx.fillStyle = BONE; ctx.globalAlpha *= 0.8; ctx.fillRect((hx + dir * 3) * c, (hy - 4 - (t * 2 % 2)) * c, c, c) }
    }
  })
  if (staff) drawStaff(false)
  const r = drawStarChar(ctx, x, y, size, t, { ...opts, color, glyph: null, seed, glow, alpha, pop })
  if (staff) drawStaff(true)
  // glitter: little pixel sparkles orbiting and winking
  if (glitter > 0) {
    ctx.save(); ctx.globalAlpha *= alpha * clamp(glitter)
    const n = 10, R = size * pop * 0.62
    for (let i = 0; i < n; i++) {
      const ph2 = (t * 0.55 + i / n + seed * 0.07) % 1, a = i / n * TAU + t * 0.6
      const tw = Math.max(0, Math.sin(ph2 * TAU)) ** 2
      if (tw < 0.08) continue
      const rr = R * (0.85 + 0.25 * Math.sin(i * 2.1 + t))
      ctx.globalAlpha = alpha * clamp(glitter) * tw
      drawPixelStar(ctx, x + Math.cos(a) * rr, r.y + Math.sin(a) * rr * 0.9, Math.max(10, size * pop * 0.07) * (0.7 + 0.5 * tw), i % 3 ? 2 : 0, [OPH.teal, OPH.violet, PINK, '#fffbea', GOLD][i % 5])
    }
    ctx.restore()
  }
  return r
}

// ─────────────────────────────────────────────── Pluto
const PG = 24
let PBUF = null
const pbuf = () => {
  if (PBUF) return PBUF
  const c = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(PG, PG) : Object.assign(document.createElement('canvas'), { width: PG, height: PG })
  PBUF = { c, x: c.getContext('2d') }; return PBUF
}
const PMASK = (() => {
  const m = new Uint8Array(PG * PG)
  for (let j = 0; j < PG; j++) for (let i = 0; i < PG; i++) { const d = Math.hypot(i + 0.5 - 12, j + 0.5 - 12.5); m[j * PG + i] = d <= 10.2 ? 1 : 0 }
  return m
})()
const pin = (i, j) => i >= 0 && j >= 0 && i < PG && j < PG && PMASK[j * PG + i] === 1
// the heart (Tombaugh Regio) sits low on the right; craters are darker dots
const PHEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], PHEART_AT = [12, 15]
const CRATERS = [[6, 8], [8, 17], [17, 7], [4, 13], [19, 13]]
function autoBlink(t, seed) { const ph = (t + seed * 0.77) % 3.7; return ph < 0.05 ? 0.5 : ph < 0.13 ? 1 : ph < 0.18 ? 0.5 : 0 }
const P_EYE = {
  open: ['XXX', 'XWX', 'XXX', 'XXX'],
  wide: ['XXXX', 'XwwX', 'XwXX', 'XwXX', 'XXXX'],
  half: ['...', 'XXX', 'XXX', '...'],
  shut: ['...', '...', 'XXX', '...'],
  happy: ['.X.', 'X.X', '...', '...'],
  squint: ['...', 'XXX', 'XWX', '...'],
  heart: ['H.H', 'HHH', '.H.', '...'],
}
export function drawPluto(ctx, x, y, size, t, opts = {}) {
  const { mood = 'grumpy', look, crownSlip = 0, blink, bob, hops = null, seed = 9, glow = 0.7, alpha = 1, pop = 1, crown = true } = opts
  if (alpha <= 0 || pop <= 0) return { x, y, size, top: y }
  const { x: b } = pbuf()
  b.clearRect(0, 0, PG, PG)
  const px = (i, j, c) => { b.fillStyle = c; b.fillRect(i, j, 1, 1) }
  const light = '#cfcad9', shade = '#827d94', deep = '#625c76', line = '#241c3a'
  for (let j = 0; j < PG; j++) for (let i = 0; i < PG; i++) {
    if (!pin(i, j)) { if (pin(i + 1, j) || pin(i - 1, j) || pin(i, j + 1) || pin(i, j - 1)) px(i, j, line); continue }
    const u = (i + 0.5 - 12) / 10, v = (j + 0.5 - 12.5) / 10
    let c = PLUTO.body
    if (u + v < -0.85) c = light
    else if (u + v > 0.95) c = deep
    else if (u + v > 0.6) c = shade
    px(i, j, c)
  }
  PHEART.forEach((row, jj) => [...row].forEach((ch, ii) => { if (ch === 'H' && pin(PHEART_AT[0] + ii, PHEART_AT[1] + jj)) px(PHEART_AT[0] + ii, PHEART_AT[1] + jj, PLUTO.heart) }))
  for (const [i, j] of CRATERS) { px(i, j, deep); px(i + 1, j, shade); px(i, j + 1, shade) }
  px(7, 5, '#fffef6'); px(8, 5, '#fffef6'); px(6, 6, '#fffef6')
  // eyes
  const L = look || [Math.sin(t * 0.7 + seed) > 0.6 ? 1 : Math.sin(t * 0.7 + seed) < -0.7 ? -1 : 0, 0]
  const lx = clamp(Math.round(L[0]), -1, 1), ly = clamp(Math.round(L[1]), -1, 1)
  const cl = typeof blink === 'number' ? blink : blink === false ? 0 : autoBlink(t, seed)
  const bl = cl >= 0.75 ? P_EYE.shut : cl >= 0.25 ? P_EYE.half : null
  const bm = mood === 'happy' ? P_EYE.happy : mood === 'heart' ? P_EYE.heart : bl || (mood === 'wide' ? P_EYE.wide : mood === 'squint' ? P_EYE.squint : P_EYE.open)
  const put = (bmp, x0, y0) => bmp.forEach((row, jj) => [...row].forEach((ch, ii) => {
    if (ch === '.') return
    const c = ch === 'X' ? INK : ch === 'W' ? '#ffffff' : ch === 'w' ? '#fffaf0' : '#ff3d6e'
    px(x0 + ii, y0 + jj, c)
  }))
  const ey = 9, exL = 7, exR = 14
  const wd = bm[0].length, dx = (mood === 'happy' || mood === 'heart' || bl) ? 0 : lx, dy = (mood === 'happy' || mood === 'heart' || bl) ? 0 : ly
  if (mood === 'wide' && !bl) {
    put(bm, exL - 1, ey - 1); put(bm, exR - 1, ey - 1)
    for (const ex of [exL - 1, exR - 1]) { b.fillStyle = INK; b.fillRect(ex + 1 + Math.max(0, dx), ey + 1 + Math.max(0, dy), 2, 2) }
  } else { put(bm, exL + dx, ey + dy); put(bm, exR + dx + (wd === 3 ? 0 : 0), ey + dy) }
  // brows
  if (mood === 'grumpy' || mood === 'squint') { px(exL - 1, ey - 2, INK); px(exL, ey - 2, INK); px(exL + 1, ey - 1, INK); px(exL + 2, ey - 1, INK); px(exR + 2, ey - 2, INK); px(exR + 3, ey - 2, INK); px(exR + 1, ey - 1, INK); px(exR, ey - 1, INK) }
  if (mood === 'sad') {
    px(exL - 1, ey - 1, INK); px(exL, ey - 2, INK); px(exL + 1, ey - 2, INK); px(exR + 3, ey - 1, INK); px(exR + 2, ey - 2, INK); px(exR + 1, ey - 2, INK)
    const tp = (t * 0.9 + seed * 0.2) % 1; px(exL + 1, ey + 4 + Math.floor(tp * 4), '#8fd8ff')
  }
  if (mood === 'happy' || mood === 'heart') { b.globalAlpha = 0.8; for (const i of [4, 5, 18, 19]) px(i, 13, '#ff8fb1'); b.globalAlpha = 1 }

  const s = size * pop, cell = s >= 48 ? Math.max(1, Math.round(s / PG)) : s / PG, S = cell * PG
  const bobA = bob === undefined ? size * 0.04 : bob
  const hs = hopState(t, hops)
  const sq = hs.sq + 0.02 * Math.sin(t * 3.4 + seed)
  const cy = y + Math.sin(t * 2.6 + seed * 1.3) * bobA - hs.lift * size * 0.12
  ctx.save(); ctx.globalAlpha *= alpha
  glowAt(ctx, x, cy, S * 0.9, '#b9b0e0', glow * 0.8)
  ctx.translate(Math.round(x), Math.round(cy + S * 0.44)); ctx.scale(1 + sq, 1 - sq * 0.9)
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  ctx.drawImage(pbuf().c, -S / 2, -S / 2 - S * 0.44 + 0.5 * cell, S, S)
  ctx.imageSmoothingEnabled = sm
  // the crown: on top, slipping right with the slip amount, wobbling a bit
  if (crown) {
    const k = clamp(crownSlip), wob = Math.sin(t * 5 + seed) * 0.05 * (0.3 + k)
    const CR = ['Y.Y.Y', 'YYYYY', 'YRYBY', 'ddddd']
    const ccell = cell * 1.25
    const topY = -S * 0.44 - S / 2 + 2.6 * cell
    const cx0 = lerp(0, S * 0.36, ease.inOutQuad(k)), cy0 = lerp(topY - 1.3 * ccell, topY + S * 0.3, ease.inQuad(k))
    drawBits(ctx, CR, { Y: PLUTO.crown, R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }, cx0, cy0, ccell, { rot: -0.12 + k * 1.15 + wob })
  }
  ctx.restore()
  return { x, y: cy, size: S, top: cy - S / 2 }
}

// ─────────────────────────────────────────────── the twin
const STACHE = [
  '.X............X.',
  'X..XXXX..XXXX..X',
  'X.XXXXXXXXXXXX.X',
  'XXXXXXXXXXXXXXXX',
  '.XXXXX....XXXXX.',
]
const STACHE_UP = [
  'X..............X',
  'XX.XXXX..XXXX.XX',
  '.XXXXXXXXXXXXXX.',
  '.XXXXXXXXXXXXXX.',
  '..XXXX....XXXX..',
]
export function drawTwin(ctx, x, y, size, t, opts = {}) {
  const { mustache = true, twitch, seed = 22 } = opts
  const r = drawStarChar(ctx, x, y, size, t, { color: TWIN.color, glyph: size >= 120 ? TWIN.glyph : null, seed, ...opts, mustache: undefined })
  if (!mustache || (opts.alpha ?? 1) <= 0 || (opts.pop ?? 1) <= 0) return r
  const X = starXform(x, y, size, t, { ...opts, seed })
  const auto = twitch !== false && (t + seed * 0.4) % 2.8 < 0.3
  const tw = auto || (Array.isArray(twitch) && twitch.some(v => t >= v && t < v + 0.3))
  inSprite(ctx, X, c => {
    ctx.globalAlpha *= opts.alpha ?? 1
    const bm = tw ? STACHE_UP : STACHE, i0 = 10, j0 = 23
    bm.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'X') { ctx.fillStyle = (j === 2 && (i === 4 || i === 5 || i === 10 || i === 11)) ? '#6a4a3a' : '#3a2016'; ctx.fillRect((i0 + i) * c, (j0 + j) * c, c + 0.5, c + 0.5) } }))
  })
  return r
}

// ─────────────────────────────────────────────── Saturn (the teacher)
function disc(x, cx, cy, r, c, col) {
  for (let j = -Math.ceil(r / c); j <= Math.ceil(r / c); j++) for (let i = -Math.ceil(r / c); i <= Math.ceil(r / c); i++) {
    if (Math.hypot(i * c, j * c) > r) continue
    x.fillStyle = typeof col === 'function' ? col(i, j) : col; x.fillRect(cx + i * c - c / 2, cy + j * c - c / 2, c, c)
  }
}
export function drawSaturn(ctx, x, y, size, t, opts = {}) {
  const { mood = 'neutral', look = [0, 0], pointer = true, prop = null, rot = -0.18, pop = 1, alpha = 1, hops = null, seed = 4, bob } = opts
  if (pop <= 0.01 || alpha <= 0) return { x, y, size, top: y }
  const k = size / 208 * pop
  const hs = hopState(t, hops), bobA = bob === undefined ? 8 : bob
  const cy = y + Math.sin(t * 2 + seed) * bobA - hs.lift * 18
  ctx.save(); ctx.globalAlpha *= alpha; ctx.translate(x, cy); ctx.scale(k * (1 + hs.sq), k * (1 - hs.sq * 0.9))
  glowAt(ctx, 0, 0, 150, '#f7dca0', 0.6)
  ctx.rotate(rot)
  const ring = (front) => { for (let a = 0; a < TAU; a += 0.05) { const s = Math.sin(a); if ((s > 0) !== front) continue; const rx = Math.cos(a) * 104, ry = s * 24; ctx.fillStyle = INK; ctx.fillRect(rx - 6, ry - 6, 12, 12); ctx.fillStyle = '#f7dca0'; ctx.fillRect(rx - 4, ry - 4, 8, 8) } }
  ring(false)
  disc(ctx, 0, 0, 58, 6, INK)
  disc(ctx, 0, 0, 52, 6, (i, j) => (j % 4 === 0 ? '#d6a35a' : i + j < -6 ? '#f7dca0' : '#e8c27a'))
  ring(true)
  ctx.rotate(-rot)
  const blink = (t + 0.7 + seed) % 3.4 < 0.12
  const lx = clamp(Math.round(look[0]), -1, 1) * 3, ly = clamp(Math.round(look[1]), -1, 1) * 3
  for (const s of [-1, 1]) {
    const ex = s * 22
    if (mood === 'wide') { ctx.fillStyle = INK; ctx.fillRect(ex - 17, -26, 34, 32); ctx.fillStyle = '#fffaf0'; ctx.fillRect(ex - 13, -22, 26, 24) }
    else { ctx.fillStyle = INK; ctx.fillRect(ex - 15, -22, 30, 26); ctx.fillStyle = 'rgba(191,233,255,0.85)'; ctx.fillRect(ex - 11, -18, 22, 18) }
    ctx.fillStyle = INK
    if (blink && mood !== 'wide') ctx.fillRect(ex - 6, -9, 12, 3)
    else if (mood === 'squint') { ctx.fillRect(ex - 8, -11, 16, 4); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(ex - 13, -28 + (s < 0 ? 0 : 2), 26, 4) }
    else if (mood === 'happy') { ctx.fillRect(ex - 6, -12, 4, 4); ctx.fillRect(ex - 2, -16, 4, 4); ctx.fillRect(ex + 2, -12, 4, 4) }
    else if (mood === 'wide') ctx.fillRect(ex - 4 + lx, -14 + ly, 8, 8)
    else ctx.fillRect(ex - 4 + lx, -14 + ly, 8, 10)
  }
  ctx.fillStyle = INK; ctx.fillRect(-7, -14, 14, 4)
  if (pointer && !prop) { ctx.fillStyle = INK; ctx.fillRect(54, -6, 70, 8); ctx.fillStyle = '#c98f5f'; ctx.fillRect(56, -4, 66, 4); ctx.fillStyle = PINK; ctx.fillRect(118, -6, 8, 8) }
  if (prop === 'camera') {
    // a chunky pixel camera held in front, lens toward the subject (right)
    ctx.fillStyle = INK; ctx.fillRect(18, 18, 92, 62); ctx.fillStyle = '#4a4266'; ctx.fillRect(24, 24, 80, 50); ctx.fillStyle = '#5c5480'; ctx.fillRect(24, 24, 80, 8)
    ctx.fillStyle = INK; ctx.fillRect(34, 8, 26, 12); ctx.fillStyle = '#ff5d73'; ctx.fillRect(86, 28, 10, 8)
    ctx.fillStyle = INK; ctx.fillRect(98, 30, 30, 38); ctx.fillStyle = '#2a2a48'; ctx.fillRect(102, 34, 22, 30); ctx.fillStyle = '#9fe8ff'; ctx.fillRect(106, 40, 8, 8)
  }
  if (prop === 'book') {
    ctx.fillStyle = INK; ctx.fillRect(-60, 26, 120, 70); ctx.fillStyle = '#9a2a4a'; ctx.fillRect(-56, 30, 54, 62); ctx.fillRect(2, 30, 54, 62)
    ctx.fillStyle = '#fff1d6'; ctx.fillRect(-50, 34, 46, 54); ctx.fillRect(4, 34, 46, 54)
    ctx.fillStyle = 'rgba(27,18,54,0.55)'; for (let j = 0; j < 6; j++) { ctx.fillRect(-46, 40 + j * 8, 38, 3); ctx.fillRect(8, 40 + j * 8, 38, 3) }
  }
  ctx.restore()
  return { x, y: cy, size, top: cy - 60 * k }
}

// ─────────────────────────────────────────────── the black hole
const HOLE_COLS = ['#2a0f52', '#4a1f86', '#7a3ad0', '#b46cff', '#ff8fd8']
const RING_COLS = ['#ff5d3a', '#ff8a3a', '#ffc35c', '#ffe9b0', '#ff8fd8']
export function drawBlackHole(ctx, x, y, r, t, { strength = 1, tilt = 0.4, alpha = 1, spin = 1 } = {}) {
  if (strength <= 0 || r <= 0.5 || alpha <= 0) return
  const st = clamp(strength, 0, 1.5)
  const c = Math.max(3, Math.round(r / 9))
  const R = r * 2.7, n = Math.ceil(R / c)
  const w = t * 1.6 * spin * (0.5 + st)
  ctx.save(); ctx.globalAlpha *= alpha
  // lensing halo
  const g = ctx.createRadialGradient(x, y, r * 0.8, x, y, R * 1.15)
  g.addColorStop(0, `rgba(180,108,255,${0.35 * st})`); g.addColorStop(0.5, `rgba(122,58,208,${0.16 * st})`); g.addColorStop(1, 'rgba(122,58,208,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 1.15, 0, TAU); ctx.fill()
  const X0 = Math.round(x), Y0 = Math.round(y)
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const dx = i * c, dy = j * c, d = Math.hypot(dx, dy)
    if (d > R) continue
    const a = Math.atan2(dy, dx)
    // accretion ring: an ellipse band
    const ed = Math.hypot(dx, dy / tilt), inRing = ed > r * 1.38 && ed < r * 2.05
    const ringCol = () => { const ra = Math.atan2(dy / tilt, dx), v = 0.5 + 0.5 * Math.sin(ra * 5 - w * 2.2 + ed / r * 3); const idx = Math.min(4, Math.floor(v * 3.2 + (ed < r * 1.6 ? 1.4 : 0))); return RING_COLS[idx] }
    let col = null, al = 1
    if (inRing && dy > 0) col = ringCol()
    else if (d < r) col = d > r - c * 1.1 ? '#120626' : '#030108'
    else if (d < r + c * 1.4) { col = (Math.floor(a * 6 + w * 3) % 2) ? '#ffe9c4' : '#ff9ad5' }
    else if (inRing) col = ringCol()
    else {
      const arm = Math.sin(3 * a + 5.5 * Math.log(d / r) - w * 2)
      const fall = 1 - (d - r) / (R - r)
      if (arm > 0.35 - 0.2 * fall) { col = HOLE_COLS[Math.min(4, Math.floor((arm * 0.6 + fall) * 2.6))]; al = clamp(fall * 1.4) * (0.45 + 0.4 * st) }
    }
    if (!col) continue
    ctx.globalAlpha = alpha * al
    ctx.fillStyle = col; ctx.fillRect(X0 + dx - c / 2, Y0 + dy - c / 2, c, c)
  }
  // debris spiralling in
  const rr = rng(91)
  for (let k = 0; k < Math.round(14 * st); k++) {
    const sp = 0.35 + rr() * 0.5, ph = (t * sp + rr()) % 1, a0 = rr() * TAU
    const dd = lerp(R * 1.05, r, ease.inQuad(ph)), aa = a0 + ph * 5 * spin
    ctx.globalAlpha = alpha * Math.sin(Math.PI * ph)
    ctx.fillStyle = [BONE, PINK, GOLD, LAV][k % 4]
    const s = Math.max(2, Math.round(c * (1 - ph * 0.6)))
    ctx.fillRect(Math.round(x + Math.cos(aa) * dd - s / 2), Math.round(y + Math.sin(aa) * dd * 0.85 - s / 2), s, s)
  }
  ctx.restore()
}

/** a pixel speech bubble at (0, 0) centre (current transform), w × h, tail toward (tx, ty) */
function bubbleShape(ctx, w, h, P, fill, line) {
  const step = (o, col) => { ctx.fillStyle = col; ctx.fillRect(-w / 2 + o + 2 * P, -h / 2 + o, w - 2 * o - 4 * P, h - 2 * o); ctx.fillRect(-w / 2 + o, -h / 2 + o + 2 * P, w - 2 * o, h - 2 * o - 4 * P); ctx.fillRect(-w / 2 + o + P, -h / 2 + o + P, w - 2 * o - 2 * P, h - 2 * o - 2 * P) }
  step(0, line); step(P, fill)
  // tail (bottom-left)
  ctx.fillStyle = line; ctx.fillRect(-w / 2 + 3 * P, h / 2 - P, 4 * P, 3 * P); ctx.fillStyle = fill; ctx.fillRect(-w / 2 + 4 * P, h / 2 - 2 * P, 2 * P, 2 * P)
}
export function drawPulledBubble(ctx, t, { text, from, to, at, dur = 1.5, appear, size = 34, color = BONE, ink = INK } = {}) {
  const t0 = appear ?? at - 1
  if (t < t0 || t >= at + dur) return
  ctx.save()
  ctx.font = `700 ${size}px ${MONO}`
  const tw = ctx.measureText(text).width, P = Math.max(4, Math.round(size / 7))
  const w = Math.round((tw + size * 1.4) / P) * P, h = Math.round(size * 2 / P) * P
  const pin = easeOutBack(prog(t, t0, t0 + 0.3), 2.2)
  const p = prog(t, at, at + dur), e = ease.inCubic(p)
  const [fx, fy] = from, [hx, hy] = to
  const ang = e * Math.PI * 2.4
  const vx = fx - hx, vy = fy - hy
  // quiver toward the hole before it lets go
  const pre = clamp((t - t0) / Math.max(0.01, at - t0)), q = t < at ? Math.sin(t * 38) * 3 * pre : 0
  const pull = t < at ? 0.04 * pre : 0
  const px = hx + (vx * Math.cos(ang) - vy * Math.sin(ang)) * (1 - e) * (1 - pull) + q, py = hy + (vx * Math.sin(ang) + vy * Math.cos(ang)) * (1 - e) * (1 - pull)
  const dirA = Math.atan2(hy - py, hx - px)
  const scale = pin * (1 - ease.inQuad(p) * 0.97), stretch = 1 + 1.6 * Math.sin(Math.PI * Math.min(1, p * 1.2)) + pull * 3
  ctx.translate(Math.round(px), Math.round(py))
  ctx.rotate(dirA); ctx.scale(stretch * scale, scale / Math.sqrt(stretch)); ctx.rotate(-dirA + e * 3)
  ctx.globalAlpha *= clamp(pin * 2) * (1 - ease.inQuad(prog(p, 0.75, 1)))
  bubbleShape(ctx, w, h, P, color, ink)
  ctx.fillStyle = ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, 2)
  ctx.restore()
}

// ─────────────────────────────────────────────── pixel panel + rich canvas text (shared by the sting and the card)
function stepRect(ctx, x, y, w, h, P, col) { ctx.fillStyle = col; ctx.fillRect(x + 2 * P, y, w - 4 * P, h); ctx.fillRect(x, y + 2 * P, w, h - 4 * P); ctx.fillRect(x + P, y + P, w - 2 * P, h - 2 * P) }
function goldPanel(ctx, cx, cy, w, h, P = 8) {
  const x = cx - w / 2, y = cy - h / 2
  ctx.save(); ctx.shadowColor = 'rgba(242,199,92,0.65)'; ctx.shadowBlur = 28; stepRect(ctx, x, y, w, h, P, GOLD); ctx.restore()
  stepRect(ctx, x, y, w, h, P, GOLD); stepRect(ctx, x + P, y + P, w - 2 * P, h - 2 * P, P, INK); stepRect(ctx, x + 2 * P, y + 2 * P, w - 4 * P, h - 4 * P, P, 'rgba(16,9,38,0.96)')
  ctx.fillStyle = 'rgba(239,230,214,0.45)'; ctx.fillRect(x + 3 * P, y + 3 * P - P / 2, w - 6 * P, P / 3); ctx.fillRect(x + 3 * P, y + h - 3 * P + P / 6, w - 6 * P, P / 3)
  ctx.fillStyle = '#fff1c8'; ctx.fillRect(x + 2 * P, y, P * 4, P / 2); ctx.fillRect(x, y + 2 * P, P / 2, P * 3)
  for (const [gx, gy] of [[P * 1.5, P * 1.5], [w - P * 2.5, P * 1.5], [P * 1.5, h - P * 2.5], [w - P * 2.5, h - P * 2.5]]) { ctx.fillStyle = PINK; ctx.fillRect(x + gx, y + gy, P, P) }
}
function shine(ctx, cx, cy, w, h, p) {
  if (p <= 0 || p >= 1) return
  ctx.save(); ctx.beginPath(); ctx.rect(cx - w / 2 + 16, cy - h / 2 + 16, w - 32, h - 32); ctx.clip()
  const sx = lerp(cx - w / 2 - 140, cx + w / 2 + 60, p)
  ctx.translate(sx, cy); ctx.transform(1, 0, -0.36, 1, 0, 0)
  const g = ctx.createLinearGradient(-45, 0, 45, 0)
  g.addColorStop(0, 'rgba(255,241,200,0)'); g.addColorStop(0.5, 'rgba(255,241,200,0.5)'); g.addColorStop(1, 'rgba(255,241,200,0)')
  ctx.fillStyle = g; ctx.fillRect(-45, -h, 90, h * 2)
  ctx.restore()
}
function burst(ctx, cx, cy, t, t0, { n = 18, R = 360, seed = 5, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.8, flat = 0.6 } = {}) {
  const tt = (t - t0) / dur
  if (tt < 0 || tt > 1) return
  const p = ease.outCubic(tt), r = rng(seed)
  ctx.save(); ctx.globalAlpha *= 1 - ease.inQuad(tt)
  for (let i = 0; i < n; i++) { const a = r() * TAU, d = (0.4 + r() * 0.7) * R; drawPixelStar(ctx, cx + Math.cos(a) * d * p, cy + Math.sin(a) * d * p * flat, (18 + r() * 22) * (1 - 0.35 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
  ctx.restore()
}
/** tokens of a rich line: '*…*' = accent, '|' = break */
function richTokens(text) {
  const out = []; let open = false
  for (const tok of String(text).trim().split(/\s+/)) {
    if (tok === '|') { out.push({ br: true }); continue }
    const stars = (tok.match(/\*/g) || []).length
    out.push({ w: tok.replace(/\*/g, ''), accent: open || stars > 0 }); if (stars % 2) open = !open
  }
  return out
}
function layoutRich(ctx, text, { size, accentSize, maxW, lh = 1.12 }) {
  const fontN = `800 ${size}px ${INTER}`, fontA = `italic 500 ${accentSize}px ${SERIF}`
  const lines = [[]], widths = [0]
  ctx.save(); ctx.font = fontN; const sp0 = ctx.measureText(' ').width; ctx.font = fontA; const spA = ctx.measureText(' ').width; ctx.restore()
  const sp = Math.max(sp0, spA * 0.9)
  for (const tk of richTokens(text)) {
    if (tk.br) { lines.push([]); widths.push(0); continue }
    ctx.save(); ctx.font = tk.accent ? fontA : fontN; const w = ctx.measureText(tk.w).width; ctx.restore()
    const L = lines.length - 1, add = (lines[L].length ? sp : 0) + w
    if (lines[L].length && widths[L] + add > maxW) { lines.push([{ ...tk, w0: w }]); widths.push(w); continue }
    lines[L].push({ ...tk, w0: w }); widths[L] += add
  }
  const step = Math.max(size, accentSize * 0.9) * lh
  const words = []
  lines.forEach((ln, li) => { let x = -widths[li] / 2; ln.forEach((wd) => { words.push({ ...wd, x: x + wd.w0 / 2, line: li }); x += wd.w0 + sp }) })
  return { words, nLines: lines.length, step, fontN, fontA }
}
function drawPopWord(ctx, wd, x, y, p, out, { color = BONE, accentColor = PINK, fontN, fontA }) {
  if (p <= 0) return
  const big = wd.accent, sc = big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
  ctx.save(); ctx.globalAlpha *= clamp(p * 3) * out
  ctx.translate(x, y + (1 - ease.outCubic(p)) * 26); ctx.scale(sc, sc)
  ctx.font = big ? fontA : fontN; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'
  ctx.shadowColor = 'rgba(6,4,18,0.9)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 4
  ctx.fillStyle = big ? accentColor : color; ctx.fillText(wd.w, 0, 0)
  ctx.restore()
}
function monoText(ctx, s, x, y, { size, color, spacing = 0.06, alpha = 1, shadow = true, n = Infinity }) {
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 ${size}px ${MONO}`; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  const chars = [...s], adv = chars.map(ch => ctx.measureText(ch).width + size * spacing)
  const total = adv.reduce((a, b) => a + b, 0) - size * spacing
  let px = x - total / 2
  chars.forEach((ch, i) => {
    if (i < n) {
      if (shadow) { ctx.fillStyle = 'rgba(6,4,18,0.9)'; ctx.fillText(ch, px, y + size * 0.08) }
      ctx.fillStyle = color; ctx.fillText(ch, px, y)
    }
    px += adv[i]
  })
  ctx.restore()
  return total
}

// ─────────────────────────────────────────────── key helper (brass isn't moved by the engine)
const PCS = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 }
function keyInfo(key) {
  const m = key ? /^([A-G][#b]?)\s*(.*)$/.exec(String(key).trim()) : null
  const pc = m && PCS[m[1]] != null ? PCS[m[1]] : 2
  const minor = m ? /^(m(?!aj)|min|dor|aeol|phryg)/i.test(m[2]) : true
  return { pc, minor }
}
const hz = (semi) => 130.81 * 2 ** (semi / 12)   // semitones above C3
/** the stinger chords in the film's key: i (or vi in a major key) and bVI (or IV) */
function chords(key) {
  const { pc, minor } = keyInfo(key)
  const root = minor ? pc : (pc + 9) % 12                    // a major key borrows its relative minor for the drama
  const lo = root < 5 ? root + 12 : root                       // keep the stab in a punchy register (F3…E4)
  return {
    tonic: [lo - 12, lo - 5, lo, lo + 3, lo + 7].map(hz),      // root · 5th · root · m3 · 5th
    six: [lo - 16, lo - 4, lo, lo + 3].map(hz),                // the bVI chord: (root − 4) · root − 4 · root · m3
    low: hz(lo - 24),
  }
}
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const stab = (t, freqs, len, gain = 0.045, low = 70) => [['brass', r3(t), freqs.map(r2), len, { gain, bright: 1.3, ...FXB }], ['tom', r3(t), r2(low), { gain: 0.3, decay: 0.5, rev: 0.4, bus: 'fx' }]]

// ─────────────────────────────────────────────── the title sting
export const STING_LEN = 2.4
export function stingTimes(at = 0, dur = STING_LEN) { return { cross: r3(at + 0.34), slam: r3(at + 0.36), episode: r3(at + 0.78), out: [r3(at + dur - 0.38), r3(at + dur)], end: r3(at + dur) } }
export function drawTitleSting(ctx, t, { ep = 1, at = 0, dur = STING_LEN, y = 860 } = {}) {
  const T = stingTimes(at, dur)
  if (t < at || t >= T.end) return
  const o = 1 - ease.inCubic(prog(t, ...T.out))
  // two shooting stars cross behind the title
  const pc = prog(t, at, T.cross + 0.18)
  if (pc > 0 && pc < 1) {
    for (const s of [-1, 1]) {
      const ax = 540 - s * 640, ay = y - 520, bx = 540 + s * 640, by = y + 520
      const k = ease.inOutQuad(pc) * 1.0, hx = lerp(ax, bx, k), hy = lerp(ay, by, k)
      for (let i = 0; i < 14; i++) {
        const kk = Math.max(0, k - i * 0.022), tx = lerp(ax, bx, kk), ty = lerp(ay, by, kk)
        ctx.save(); ctx.globalAlpha = (1 - i / 14) * 0.9 * (1 - ease.inQuad(prog(pc, 0.8, 1)))
        ctx.fillStyle = i % 3 ? (s > 0 ? GOLD : PINK) : '#fffbea'; const q = Math.max(4, 16 - i)
        ctx.fillRect(Math.round(tx - q / 2), Math.round(ty - q / 2), q, q); ctx.restore()
      }
      ctx.save(); ctx.globalAlpha = 1 - ease.inQuad(prog(pc, 0.8, 1)); drawPixelStar(ctx, hx, hy, 40, 0, s > 0 ? GOLD : PINK, '#fffbea'); ctx.restore()
    }
  }
  // the crossing flash
  const fl = prog(t, T.cross, T.cross + 0.4)
  if (fl > 0 && fl < 1) glowAt(ctx, 540, y, 520 * (0.6 + fl), '#ffe7b0', (1 - fl) * 1.3)
  burst(ctx, 540, y, t, T.cross, { n: 22, R: 520, seed: 31 })
  // the panel slams in (from big to flush), wobbles, shines
  const ps = prog(t, T.slam, T.slam + 0.32)
  if (ps > 0) {
    const sc = lerp(1.7, 1, easeOutBack(ps, 1.6)) * lerp(1.12, 1, o) * (o < 1 ? lerp(0.6, 1, o) : 1)
    const rot = (1 - ease.outCubic(ps)) * -0.08 + Math.sin((t - T.slam) * 9) * 0.012 * Math.exp(-(t - T.slam) * 2.5)
    ctx.save(); ctx.globalAlpha *= clamp(ps * 4) * o
    ctx.translate(540, y); ctx.rotate(rot); ctx.scale(sc, sc)
    goldPanel(ctx, 0, 0, 900, 176, 8)
    shine(ctx, 0, 0, 900, 176, prog(t, T.slam + 0.3, T.slam + 0.95))
    if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    monoText(ctx, '★ STAR-CROSSED ★', 0, 2, { size: 74, color: GOLD, spacing: 0.04 })
    ctx.restore()
    // EPISODE N types on under it
    const label = `EPISODE ${ep}`, n = Math.floor((t - T.episode) / 0.045) + 1
    if (t >= T.episode) monoText(ctx, label, 540, y + 156, { size: 46, color: BONE, spacing: 0.32, n, alpha: o })
  }
}
export function titleStingCues(at = 0, { key = null, dur = STING_LEN, ep = 1 } = {}) {
  const T = stingTimes(at, dur), C = chords(key)
  const label = `EPISODE ${ep}`
  return [
    ['whoosh', r3(at + 0.3), 0.45, 0.05],
    ['boom', T.cross, 0.32], ['crash', T.cross, { gain: 0.06, len: 2.4 }],
    ['brass', T.cross, C.tonic.map(r2), 1.3, { gain: 0.045, bright: 1.25, ...FXB }], ['tom', T.cross, r2(C.low * 1.5), { gain: 0.32, decay: 0.7, rev: 0.4, bus: 'fx' }],
    ['glitter', r3(T.cross + 0.05), r3(T.cross + 0.7)], ['bell', r3(T.slam + 0.3), 1760, 0.03, 1.6, 0],
    ...[...label].map((ch, i) => ch === ' ' ? null : ['tick', r3(T.episode + i * 0.045), 0.03]).filter(Boolean),
    ['whoosh', r3(T.out[0] + 0.2), 0.3, 0.025],
  ]
}

// ─────────────────────────────────────────────── NEXT TIME ON STAR-CROSSED…
export const NEXT_LEN = 4.2
const NT_LABEL = 'NEXT TIME ON'
export function nextTimeTimes(at, { tease = '', dur = NEXT_LEN } = {}) {
  const stabs = [r3(at + 0.55), r3(at + 0.85), r3(at + 1.15)]
  const n = richTokens(tease).filter(k => !k.br).length
  const words = []
  let tt = at + 1.35, prevAcc = false
  richTokens(tease).filter(k => !k.br).forEach((k, i) => { if (i) tt += k.accent && !prevAcc ? 0.16 : prevAcc && !k.accent ? 0.22 : 0.085; words.push(r3(tt)); prevAcc = k.accent })
  const done = n ? r3(words[n - 1] + 0.4) : r3(at + 1.35)
  return { label: r3(at + 0.05), stabs, panel: stabs[0], words, done, out: [r3(at + dur - 0.4), r3(at + dur)], end: r3(at + dur) }
}
export function drawNextTime(ctx, t, { at, tease = '', dur = NEXT_LEN, y = 700, dim = 0.4, accentColor = PINK, size = 70, accentSize = 84 } = {}) {
  const T = nextTimeTimes(at, { tease, dur })
  if (t < at || t >= T.end) return
  const o = 1 - ease.inQuad(prog(t, ...T.out))
  if (dim > 0) { ctx.save(); ctx.globalAlpha = dim * ease.outQuad(prog(t, at, at + 0.4)) * o; ctx.fillStyle = '#05030c'; ctx.fillRect(0, 0, 1080, 1920); ctx.restore() }
  // "NEXT TIME ON" types on
  const n = Math.floor((t - T.label) / 0.035) + 1
  if (t >= T.label) monoText(ctx, NT_LABEL, 540, y, { size: 44, color: BONE, spacing: 0.3, n, alpha: o * 0.92 })
  // the panel: slams on stab 1, kicks on stabs 2 and 3
  const ps = prog(t, T.panel, T.panel + 0.3)
  if (ps > 0) {
    let kick = 0
    for (const s of T.stabs) { const d = t - s; if (d >= 0 && d < 0.3) kick = Math.max(kick, Math.sin(Math.PI * d / 0.3) * (s === T.stabs[2] ? 0.09 : 0.05)) }
    const sc = lerp(1.6, 1, easeOutBack(ps, 1.7)) * (1 + kick) * lerp(0.85, 1, o)
    const shake = t - T.stabs[2] >= 0 && t - T.stabs[2] < 0.35 ? Math.sin((t - T.stabs[2]) * 80) * 6 * (1 - (t - T.stabs[2]) / 0.35) : 0
    ctx.save(); ctx.globalAlpha *= clamp(ps * 4) * o
    ctx.translate(540 + shake, y + 130); ctx.scale(sc, sc)
    goldPanel(ctx, 0, 0, 860, 156, 8)
    shine(ctx, 0, 0, 860, 156, prog(t, T.stabs[2], T.stabs[2] + 0.6))
    monoText(ctx, '★ STAR-CROSSED… ★', 0, 2, { size: 62, color: GOLD, spacing: 0.03 })
    ctx.restore()
    burst(ctx, 540, y + 130, t, T.stabs[2], { n: 16, R: 440, seed: 47, flat: 0.5 })
  }
  // the tease
  if (tease && t >= T.words[0] - 0.01) {
    const L = layoutRich(ctx, tease, { size, accentSize, maxW: 900 })
    const y0 = y + 330
    L.words.forEach((wd, i) => drawPopWord(ctx, wd, 540 + wd.x, y0 + wd.line * L.step, prog(t, T.words[i], T.words[i] + (wd.accent ? 0.4 : 0.28)), o, { accentColor, fontN: L.fontN, fontA: L.fontA }))
  }
}
export function nextTimeCues(at, { key = null, tease = '', dur = NEXT_LEN } = {}) {
  const T = nextTimeTimes(at, { tease, dur }), C = chords(key)
  const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
  return [
    ...[...NT_LABEL].map((ch, i) => ch === ' ' ? null : ['tick', r3(T.label + i * 0.035), 0.028]).filter(Boolean),
    ...stab(T.stabs[0], C.tonic.slice(1, 4), 0.2, 0.045, C.low * 1.5),
    ...stab(T.stabs[1], C.tonic.slice(1, 4), 0.2, 0.045, C.low * 1.5),
    ...stab(T.stabs[2], C.six, 1.3, 0.05, C.low * 1.2), ['boom', T.stabs[2], 0.3], ['crash', T.stabs[2], { gain: 0.05, len: 2 }],
    ['glitter', T.stabs[2], r3(T.stabs[2] + 0.5)],
    ...T.words.map((w, i) => ['pop', w, NOTE[(i + 1) % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]),
  ]
}

// ─────────────────────────────────────────────── the gasp zoom
export function gaspZoom(t, { at, dur = 1.3, x, y, amount = 0.5, follow = 0.6, cx = 540, cy = 960 } = {}) {
  const pin = easeOutBack(prog(t, at, at + 0.16), 2.4), pout = ease.inOutCubic(prog(t, at + dur - 0.45, at + dur))
  const k = t < at || t >= at + dur ? 0 : clamp(pin, 0, 1.3) * (1 - pout)
  const s = 1 + amount * k
  const dt = t - at, sh = k > 0 ? Math.exp(-dt * 4) * 7 : 0
  const jx = sh * Math.sin(dt * 71), jy = sh * Math.cos(dt * 57)
  const fx = lerp(x, cx, follow * clamp(k)) + jx, fy = lerp(y, cy, follow * clamp(k)) + jy
  return {
    k, s,
    apply(ctx) { if (k <= 0) return false; ctx.translate(fx, fy); ctx.scale(s, s); ctx.translate(-x, -y); return true },
  }
}
export function drawGaspLines(ctx, t, { at, dur = 1.3, x, y, color = PINK, cx = 540, cy = 960, follow = 0.6 } = {}) {
  const z = gaspZoom(t, { at, dur, x, y, cx, cy, follow })
  if (z.k <= 0) return
  const k = clamp(z.k), fx = lerp(x, cx, follow * k), fy = lerp(y, cy, follow * k)
  ctx.save()
  // vignette
  const g = ctx.createRadialGradient(fx, fy, 260, fx, fy, 1250)
  g.addColorStop(0, 'rgba(5,3,12,0)'); g.addColorStop(1, `rgba(5,3,12,${0.7 * k})`)
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  // speed lines: pixel dashes radiating out, flickering
  const r = rng(Math.floor((t - at) * 14) + 3)
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * TAU + r() * 0.08, d0 = 330 + r() * 120, len = 160 + r() * 380
    if (r() < 0.3) continue
    ctx.globalAlpha = k * (0.35 + 0.5 * r())
    ctx.fillStyle = i % 3 ? color : '#fffbea'
    for (let s = 0; s < len; s += 12) {
      const q = Math.max(3, 8 - s / 70)
      ctx.fillRect(Math.round(fx + Math.cos(a) * (d0 + s) - q / 2), Math.round(fy + Math.sin(a) * (d0 + s) - q / 2), q, q)
    }
  }
  ctx.restore()
}
export function gaspCues(at, { key = null } = {}) {
  const C = chords(key)
  return [
    ['whoosh', r3(at + 0.02), 0.3, 0.06],
    ...stab(at, C.six, 0.7, 0.05, C.low * 1.2), ['boom', r3(at), 0.26], ['crash', r3(at), { gain: 0.045, len: 1.6 }],
    ['tick', r3(at + 0.02), 0.05],
  ]
}
export function twistCues(at, { key = null, gap = 0.3 } = {}) {
  const C = chords(key)
  return [
    ...stab(at, C.tonic.slice(1, 4), 0.2, 0.045, C.low * 1.5),
    ...stab(at + gap, C.tonic.slice(1, 4), 0.2, 0.045, C.low * 1.5),
    ...stab(at + 2 * gap, C.six, 1.2, 0.05, C.low * 1.2), ['boom', r3(at + 2 * gap), 0.3], ['crash', r3(at + 2 * gap), { gain: 0.05, len: 2 }],
  ]
}
