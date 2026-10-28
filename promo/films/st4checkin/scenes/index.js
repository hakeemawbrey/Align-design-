// st4checkin (25 s vertical Align ad, Star Talk season 4, EP 030, thread A: the Houston drop-3 finale) · story 0–20.6, then the end card.
//   0.00–6.50  "Houston, | a *check-in.*"  THE STARS (the gold narrator star) flicks through a pile of polaroids from the
//              season so far, one landing on each funk hit: "fogged up" (EP 001, st4landing: twelve eyes fog in the
//              humidity), "the jacket" (EP 003, st4jacket: Capricorn in Cancer's mustard cardigan), "the last kolache"
//              (EP 004: Taurus splits it), "the bayou walk" (EP 005: Pisces and Virgo by the water). The third lands on the
//              drop (2.82). Box (THE STARS): "we came down to give advice."
//   6.55–11.25 "Lessons | *learned.*"  The pile deals out into a 2 × 2 grid and each snap gets a gold ✓.
//              THE STARS: "Houston gave us some. *y'all* are good at this." The narrator goes heart-eyed.
//  11.30 cut (deal) → "One more | for the *album.*"  The twelve sign stars line up in two rows in front of the generic
//              skyline (st4landing's towers). A self-timer counts 3 · 2 · 1 → FLASH (14.8). (The ghost tries to photobomb
//              from behind the back row, 12.85–14.15, and ducks just before the flash.)
//  15.25       "Houston, you're | a *natural.*"  The group photo prints and develops in a polaroid: "us + Houston ♥".
//              Everything pops out by 20.5; the end card takes over at 20.6.
// One canvas (sky + constellation + polaroids / cast / skyline), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 25
const EP = 30
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MUST = '#e0a63a', ICE = '#bfe8ff', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => 0.6 + n * 0.5556

// ── the timeline
const T = {
  h0: 0.12, h0Land: 0.72, h0Out: [6.3, 6.5],
  narr: 0.45, snaps: [0.9, 2.0, BEAT(4), 3.9],
  open: 4.85, s1: 5.05,
  h1: 6.55, h1Land: 6.95, grid: [6.6, 7.35], s2: 7.7, checks: [8.25, 8.6, 8.95, 9.3], love: 9.45,
  close: 11.1, h1Out: [10.95, 11.15],
  cut: 11.3, h2: 11.36, h2Land: 11.75, cast0: 11.45, ghost: 12.85, count: [13.0, 13.6, 14.2], flash: 14.8, h2Out: [15.0, 15.2],
  h3: 15.3, h3Land: 15.7, print: [15.2, 15.9], develop: [15.7, 16.8], h3Out: [20.2, 20.45], out: [20.1, 20.5],
}
const LINES = [
  { t: T.s1, speaker: 'THE STARS', text: 'we came down to give *advice.*', color: GOLD },
  { t: T.s2, speaker: 'THE STARS', text: "Houston gave us some. *y'all* are good at this.", color: PINK },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** draw a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
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

// ── props (the cardigan is st4jacket's)
const JACKET = ['..JJJ....JJJ..', '.JJJJk..kJJJJ.', 'JJJJJk..kJJJJJ', 'JJjJJk..kJJjJJ', 'JJjJJo..oJJjJJ', 'JJjJJk..kJJjJJ', '.JjJJo..oJJjJ.', '.JJJJk..kJJJJ.', '.JJJJo..oJJJJ.', '.ddddd..ddddd.']
const JACKET_C = { J: MUST, j: '#c98a2a', k: '#f6d27a', o: '#6a3f1a', d: '#a06a1e' }
const KOL_L = ['..DD', '.Dcc', 'DccF', 'DcFF', 'DcFF', 'DccF', '.Dcc', '..DD']
const KOL_R = ['DD..', 'ccD.', 'FccD', 'FFcD', 'FFcD', 'FccD', 'ccD.', 'DD..']
const KOL_C = { D: '#b8782e', c: '#f0c27a', F: '#d8344f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

// ── the skyline (st4landing's generic towers: no real outlines)
const TOWERS = (() => {
  const r = rng(1701), out = []
  let xx = -30
  while (xx < 1110) {
    const w = 56 + Math.floor(r() * 5) * 14
    const mid = Math.exp(-((((xx + w / 2) - 560) / 250) ** 2))
    const h = Math.round((120 + r() * 170 + mid * (260 + r() * 200)) / 12) * 12
    out.push({ x: xx, w, h, roof: Math.floor(r() * 4), seed: Math.floor(r() * 9999) })
    xx += w + 6 + Math.floor(r() * 3) * 6
  }
  return out
})()
function drawSkyline(x, t, base, a = 1, k = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (const tw of TOWERS) {
    const hh = tw.h * k, top = base - hh
    x.fillStyle = '#2a2156'; x.fillRect(tw.x - 3, top - 3, tw.w + 6, hh + 3)
    x.fillStyle = '#151034'; x.fillRect(tw.x, top, tw.w, hh)
    x.fillStyle = '#1d1645'; x.fillRect(tw.x, top, Math.round(tw.w * 0.3), hh)
    if (tw.roof === 2) {
      const sx = Math.round(tw.x + tw.w / 2)
      x.fillStyle = '#2a2156'; x.fillRect(sx - 3, top - 60 * k, 6, 60 * k)
      if (Math.sin(t * 3 + tw.seed) > 0.2) { x.fillStyle = '#ff5c6e'; x.fillRect(sx - 5, top - 68 * k, 10, 10) }
    }
    const r = rng(tw.seed)
    for (let wy = top + 14; wy < base - 16; wy += 22) for (let wx = tw.x + 9; wx < tw.x + tw.w - 12; wx += 16) {
      const v = r()
      if (v >= 0.36) continue
      x.fillStyle = v < 0.08 ? '#ffe9b0' : v < 0.2 ? '#f7cf68' : '#c99a4a'
      x.fillRect(wx, wy, 8, 10)
    }
  }
  x.restore()
}

// ── layout
const PILE = { x: 540, y: 820 }
const PW = 470, PH_PHOTO = 340, PH = PH_PHOTO + 100      // polaroid: 470 wide, a 430 × 340 photo, caption strip below
const GRID = [[295, 700], [785, 700], [295, 1040], [785, 1040]], GRID_K = 0.64
const SNAP_ROT = [-0.07, 0.05, -0.03, 0.06]
const CAPTIONS = ['fogged up', 'the jacket', 'the last kolache', 'the bayou walk']
const NARR = { x: 540, y: 1300, size: 210 }
const BASE_Y = 1500                                     // the skyline base in the group beat
const BACK = SIGNS.slice(0, 6).map((s, i) => ({ id: s.id, x: 150 + 156 * i, y: 1240, size: 120 }))
const FRONT = SIGNS.slice(6).map((s, i) => ({ id: s.id, x: 150 + 156 * i, y: 1400, size: 132 }))
const PRINT = { x: 540, y: 860, w: 620, photoH: 470 }
const GHOST = { at: T.ghost, x: 540, y: 1172, from: 'below', where: 'photobombing the group photo from behind the back row (it ducks just before the flash)' }

function narrState(t) {
  if (t < T.snaps[0]) return { mood: 'happy' }
  if (t < T.s1) return { mood: 'sparkle', look: [0, -1] }
  if (t < T.s2) return { mood: 'happy' }
  if (t < T.love) return { mood: 'wide', look: [0, -1], blink: false }
  return { mood: 'heart' }
}
const NARR_HOPS = [T.narr + 0.3, ...T.snaps.map(k => k + 0.05), ...talkHops(LINES, 'THE STARS', { cps: CPS }), T.love]
const CAST_HOPS = i => [T.cast0 + i * 0.06 + 0.3, T.flash + 0.15 + (i % 3) * 0.08]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "700 52px 'Space Mono'", "700 200px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Houston, | a *check-in.*', { top: 196, size: 120, accentSize: 176, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'Lessons | *learned.*', { top: 196, size: 120, accentSize: 176, at: T.h1, gap: 0.1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H2 = popText(root, 'One more | for the *album.*', { top: 196, size: 110, accentSize: 160, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.02 })
  const H3 = popText(root, "Houston, you're | a *natural.*", { top: 180, size: 104, accentSize: 170, at: T.h3, gap: 0.09, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const flashEl = el('div', { position: 'absolute', inset: 0, background: '#fff8ea', opacity: 0, pointerEvents: 'none' }, root)
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, MINT]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  const nightBg = (w, h, top = '#1a1048', bot = '#3e2464') => { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, w, h) }
  function fogPatch(cx, cy, size, t) {
    const c = size / 36
    for (let j = -4; j <= 5; j++) for (let i = -11; i <= 10; i++) {
      const u = (i + 0.5) / 11, v = (j - 0.5) / 5, wob = 0.12 * Math.sin(i * 1.7 + j * 2.3)
      if (u * u + v * v > 1 + wob) continue
      x.fillStyle = (i + j) % 5 === 0 ? '#ffffff' : (i * 3 + j) % 7 === 0 ? '#bccbe0' : '#dfe9f5'
      x.fillRect(Math.round(cx + i * c), Math.round(cy + j * c), Math.ceil(c), Math.ceil(c))
    }
  }

  // ── the four snapshot photos (local coords: 0…w × 0…h, already clipped)
  function photo(t, i, w, h) {
    if (i === 0) {          // fogged up: the landing, eyes fogged in the humidity
      nightBg(w, h)
      x.save(); x.translate(0, 0); x.scale(w / 1080, w / 1080); drawSkyline(x, t, h * 1080 / w, 0.9, 0.55); x.restore()
      x.fillStyle = 'rgba(223,233,245,0.18)'; for (let k = 0; k < 4; k++) x.fillRect(0, h * 0.55 + k * 18 + Math.sin(t * 2 + k) * 6, w, 8)
      for (const [sx, id] of [[w * 0.3, 'leo'], [w * 0.7, 'pisces']]) {
        const st = signStar(id), r = drawStarChar(x, sx, h * 0.62, 150, t, { color: st.color, glyph: null, mood: 'wide', look: [0, 0], blink: false, seed: id.length, glow: 0.8 })
        fogPatch(r.x, r.y - 2, 150, t)
      }
    } else if (i === 1) {   // the jacket: Capricorn in Cancer's cardigan, heart-eyed; the AC vent still frosty
      nightBg(w, h, '#2a1a40', '#5a3048')
      x.fillStyle = INK; x.fillRect(w * 0.1, 0, w * 0.34, 34); x.fillStyle = '#c3cadb'; x.fillRect(w * 0.1 + 4, 0, w * 0.34 - 8, 28)
      x.fillStyle = ICE; for (let k = 0; k < 6; k++) x.fillRect(w * 0.12 + k * 22, 28, 8, 14 + (k % 3) * 10)
      const cap = signStar('capricorn'), can = signStar('cancer')
      const r = drawStarChar(x, w * 0.36, h * 0.62, 170, t, { color: cap.color, glyph: null, mood: 'heart', seed: 6, glow: 0.8 })
      drawBits(x, JACKET, JACKET_C, Math.round(r.x), Math.round(r.y + 28), 170 / 26)
      drawStarChar(x, w * 0.76, h * 0.66, 140, t, { color: can.color, glyph: null, mood: 'happy', seed: 9, glow: 0.8 })
    } else if (i === 2) {   // the last kolache: Taurus splits it with its (veiled) Scorpio date
      nightBg(w, h, '#3a2040', '#6a3a3a')
      x.fillStyle = '#8a5a34'; x.fillRect(0, h * 0.8, w, h * 0.2); x.fillStyle = '#b07a4a'; x.fillRect(0, h * 0.8, w, 8)
      const tau = signStar('taurus'), sco = signStar('scorpio')
      drawStarChar(x, w * 0.24, h * 0.6, 160, t, { color: tau.color, glyph: null, mood: 'happy', seed: 2, glow: 0.8 })
      drawStarChar(x, w * 0.78, h * 0.6, 150, t, { color: sco.color, glyph: null, mood: 'sparkle', look: [-1, 0], seed: 4, glow: 0.8 })
      const sp = 22 + 6 * Math.sin(t * 3)
      drawBits(x, KOL_L, KOL_C, Math.round(w * 0.5 - sp), Math.round(h * 0.68), 9)
      drawBits(x, KOL_R, KOL_C, Math.round(w * 0.5 + sp), Math.round(h * 0.68), 9)
    } else {                // the bayou walk: Pisces and Virgo by the water, the skyline reflected
      nightBg(w, h)
      const wl = h * 0.6
      x.save(); x.scale(w / 1080, w / 1080); drawSkyline(x, t, wl * 1080 / w, 0.9, 0.5); x.restore()
      x.fillStyle = '#123a5a'; x.fillRect(0, wl, w, h - wl)
      x.save(); x.globalAlpha = 0.35; x.translate(0, 2 * wl); x.scale(w / 1080, -w / 1080); drawSkyline(x, t, wl * 1080 / w, 0.9, 0.5); x.restore()
      x.fillStyle = 'rgba(159,216,255,0.5)'; for (let k = 0; k < 6; k++) x.fillRect(((k * 97 + t * 30) % (w + 60)) - 30, wl + 20 + k * 18, 40, 4)
      x.fillStyle = '#2a4a2a'; x.fillRect(0, wl - 14, w, 14)
      const pis = signStar('pisces'), vir = signStar('virgo')
      drawStarChar(x, w * 0.38, wl - 62, 120, t, { color: pis.color, glyph: null, mood: 'happy', seed: 3, glow: 0.8 })
      drawStarChar(x, w * 0.6, wl - 62, 120, t, { color: vir.color, glyph: null, mood: 'happy', look: [-1, 0], seed: 5, glow: 0.8 })
    }
  }
  /** a polaroid, centred on (cx, cy), scale k, rotation rot; content(t, w, h) draws the photo */
  function polaroid(t, cx, cy, k, rot, caption, content, { w = PW, photoH = PH_PHOTO, dev = 1 } = {}) {
    const h = photoH + 100, pw = w - 40
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 16, w, h)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = '#f7f1e6'; x.fillRect(-w / 2, -h / 2, w, h)
    x.save(); x.translate(-pw / 2, -h / 2 + 20); x.beginPath(); x.rect(0, 0, pw, photoH); x.clip()
    content(t, pw, photoH)
    if (dev < 1) { x.fillStyle = `rgba(20,14,36,${1 - dev})`; x.fillRect(0, 0, pw, photoH) }
    x.restore()
    x.fillStyle = INK; x.font = `italic 500 ${Math.round(w * 0.075)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(caption, 0, h / 2 - 40)
    x.restore()
  }
  function snapPose(t, i) {
    const t0 = T.snaps[i], p = prog(t, t0, t0 + 0.35), e = easeOutBack(p, 1.4)
    // the pile: each one flies in from a corner and lands, slightly rotated
    const from = [[-500, -300], [1500, -200], [-400, 1600], [1500, 1500]][i]
    let cx = lerp(from[0], PILE.x + (i - 1.5) * 10, e), cy = lerp(from[1], PILE.y + (i - 1.5) * 8, e), k = 1, rot = SNAP_ROT[i] + (1 - p) * (i % 2 ? 0.6 : -0.6)
    // then the deal into the grid
    const g = ease.inOutCubic(prog(t, T.grid[0] + i * 0.08, T.grid[1] - (3 - i) * 0.06))
    if (g > 0) { cx = lerp(cx, GRID[i][0], g); cy = lerp(cy, GRID[i][1], g); k = lerp(1, GRID_K, g); rot = lerp(rot, SNAP_ROT[i] * 0.6, g) }
    return { cx, cy, k, rot, on: t >= t0 }
  }
  function drawSnaps(t, ok) {
    if (t >= T.cut) return
    // draw in landing order, so the newest is on top
    for (let i = 0; i < 4; i++) {
      const P = snapPose(t, i)
      if (!P.on) continue
      polaroid(t, P.cx, P.cy, P.k * ok, P.rot, CAPTIONS[i], (tt, w, h) => photo(tt, i, w, h))
      if (t > T.snaps[i] + 0.3 && t < T.snaps[i] + 1.0) sparkles(t, P.cx, P.cy, T.snaps[i] + 0.3, 8, 240, i)
      // the gold check
      const ck = easeOutBack(prog(t, T.checks[i], T.checks[i] + 0.3), 3) * ok
      if (ck > 0) {
        x.save(); x.translate(P.cx + PW * P.k * 0.36, P.cy - PH * P.k * 0.36); x.scale(ck, ck); x.rotate(-0.1)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
        x.lineCap = 'round'; x.lineJoin = 'round'; x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(-17, 1); x.lineTo(-4, 15); x.lineTo(19, -14); x.stroke()
        x.restore()
        sparkles(t, P.cx + PW * P.k * 0.36, P.cy - PH * P.k * 0.36, T.checks[i] + 0.05, 6, 70, i * 0.7, [GOLD, BONE])
      }
    }
  }

  // ── the group photo
  function castMood(t, i) {
    if (t < T.count[0]) return { mood: 'happy' }
    if (t < T.flash) return { mood: i % 4 === 1 ? 'wide' : i % 4 === 3 ? 'squint' : 'happy', look: [0, 0] }   // holding the pose…
    return { mood: i % 3 === 0 ? 'heart' : 'sparkle', look: [0, 0] }
  }
  function drawGroup(t, ok, { frozen = false } = {}) {
    drawSkyline(x, t, BASE_Y, 1, 0.9)
    const all = [...BACK, ...FRONT]
    all.forEach((m, i) => {
      if (i === BACK.length && !frozen) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, from: GHOST.from, dur: 1.3, cell: 4 })
      const p = frozen ? 1 : pop01(t, T.cast0 + i * 0.06, 0.34, 2.2) * ok
      if (p <= 0.02) return
      const st = signStar(m.id)
      drawStarChar(x, m.x, m.y, m.size, t, { color: st.color, glyph: m.size >= 120 ? st.glyph : null, ...castMood(frozen ? T.flash + 0.2 : t, i), hops: frozen ? [] : CAST_HOPS(i), pop: p, seed: i + 1, glow: 0.9, bob: frozen ? 0 : undefined })
    })
  }
  function drawCountdown(t) {
    for (let k = 0; k < 3; k++) {
      const t0 = T.count[k], u = t - t0
      if (u < 0 || u > 0.55) continue
      const s = easeOutBack(clamp(u / 0.2), 2.6) * (1 - ease.inQuad(clamp((u - 0.35) / 0.2)))
      x.save(); x.translate(540, 860); x.scale(s, s)
      x.font = `700 200px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.lineWidth = 18; x.strokeStyle = INK; x.strokeText(String(3 - k), 0, 0); x.fillStyle = k === 2 ? PINK : GOLD; x.fillText(String(3 - k), 0, 0)
      x.restore()
    }
    // the self-timer light, blinking faster
    if (t > T.count[0] - 0.2 && t < T.flash) {
      const rate = 3 + 9 * prog(t, T.count[0], T.flash)
      x.fillStyle = INK; x.beginPath(); x.arc(540, 1030, 20, 0, Math.PI * 2); x.fill()
      x.fillStyle = Math.sin(t * rate * Math.PI) > 0 ? '#ff4f6e' : '#5a1a2a'; x.beginPath(); x.arc(540, 1030, 14, 0, Math.PI * 2); x.fill()
    }
  }
  function drawPrint(t, ok) {
    if (t < T.print[0]) return
    const p = ease.outCubic(prog(t, ...T.print)), dev = ease.inOutQuad(prog(t, ...T.develop))
    const cy = lerp(2300, PRINT.y, p) + Math.sin(t * 1.6) * 6
    const content = (tt, w, h) => {
      nightBg(w, h)
      const s = w / 1080
      x.save(); x.scale(s, s); x.translate(0, -(BASE_Y - h / s) - 20); drawGroup(T.flash + 0.2, 1, { frozen: true }); x.restore()
    }
    polaroid(t, PRINT.x, cy, ok, -0.03 + Math.sin(t * 1.2) * 0.01, 'us + Houston ♥', content, { w: PRINT.w, photoH: PRINT.photoH, dev })
    sparkles(t, PRINT.x, PRINT.y, T.develop[1], 14, 380, 0.2)
    sparkles(t, PRINT.x, PRINT.y, T.develop[1] + 0.5, 10, 300, 1.2, [GOLD, PINK])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (ok > 0) {
        if (t < T.cut) {
          drawSnaps(t, ok)
          const np = pop01(t, T.narr, 0.36, 2.2)
          if (np > 0.02) {
            const r = drawStarChar(x, NARR.x, NARR.y, NARR.size, t, { color: STAR.sky, ...narrState(t), hops: NARR_HOPS, pop: np, seed: 2, glow: 1.2 })
            sparkles(t, r.x, r.y, T.love, 10, 160, 0.4, [PINK, GOLD])
          }
        } else if (t < T.print[0] + 0.3) {
          const gk = t < T.print[0] ? 1 : 1 - prog(t, T.print[0], T.print[0] + 0.3)
          x.save(); x.globalAlpha = gk; drawGroup(t, ok); x.restore()
          drawCountdown(t)
        }
        if (t >= T.print[0]) {
          // the narrator, peeking up from the bottom, admiring the print
          const np = pop01(t, T.print[1], 0.36, 2.2) * ok
          if (np > 0.02) drawStarChar(x, 540, 1360, 200, t, { color: STAR.sky, mood: 'heart', hops: [T.print[1] + 0.3, 17.6, 18.8, 19.8], pop: np, seed: 2, glow: 1.2 })
          drawPrint(t, ok)
          if (t > T.develop[1]) {
            for (let i = 0; i < 5; i++) {
              const born = T.develop[1] + i * 0.5, p = (t - born) / 1.6
              if (p < 0 || p > 1) continue
              drawBits(x, HEART, HEART_C, Math.round(540 + (i % 2 ? 1 : -1) * (180 + i * 30) + Math.sin(p * 6 + i) * 14), Math.round(1250 - p * 260), 7, { alpha: Math.sin(Math.PI * p) })
            }
          }
        }
      }
      box.update(t)
      const fl = t >= T.flash ? 1 - ease.outQuad(prog(t, T.flash, T.flash + 0.45)) : 0
      flashEl.style.opacity = String(0.92 * fl)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.5 (→ "Lessons learned"), 11.3 (→ the group photo, a deal), 15.25 (→ the print). cardfx picks.
const CUTS = [6.5, { t: T.cut, kind: 'deal' }, 15.25]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.026), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.narr + 0.05, 739.99, 0.04, 0],
  ...T.snaps.flatMap((k, i) => [['whoosh', +(k - 0.1).toFixed(3), 0.25, 0.022], ['tick', +(k + 0.3).toFixed(3), 0.06], ['pop', +(k + 0.3).toFixed(3), NOTE[(i * 2 + 1) % NOTE.length], 0.035, i % 2 ? 0.3 : -0.3]]),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.grid[0], 0.6, 0.025],
  ...T.checks.map((k, i) => ['pluck', k, NOTE[(i + 3) % NOTE.length] * 1.5, 0.04, 0.5, i % 2 ? 0.3 : -0.3]), ...T.checks.map(k => ['tick', k, 0.04]),
  ['bell', T.love, 1760, 0.025, 1.0, 0], ['glitter', T.love, T.love + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.09, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.045, 0],
  ...[...BACK, ...FRONT].map((_, i) => ['pop', +(T.cast0 + i * 0.06).toFixed(3), NOTE[i % NOTE.length], 0.018, (i % 6 - 2.5) * 0.12]),
  ['pop', T.ghost + 0.05, 1318.51, 0.012, 0],
  ...T.count.map((k, i) => ['pop', k, [880, 987.77, 1174.66][i], 0.045, 0]), ...T.count.map(k => ['tick', k, 0.05]),
  ['boom', T.flash, 0.12], ['whoosh', T.flash, 0.3, 0.04], ['bell', T.flash + 0.02, 1760, 0.03, 1.2, 0], ['glitter', T.flash, T.flash + 0.7],
  ...wordPops(T.h3, 3, 0.09, 2, 0.026), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land + 0.05, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.print[0], 0.6, 0.03], ['tick', T.print[1], 0.05], ['glitter', T.develop[1] - 0.2, T.develop[1] + 0.6], ['pluck', T.develop[1], 1318.51, 0.045, 0.7, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
