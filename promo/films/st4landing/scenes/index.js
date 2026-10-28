// st4landing (20 s vertical Align ad, Star Talk season 4 · EP 001, thread A) · story 0–15.6, then the shared end card.
//   0.00–2.70  "*Houston,* | we have a…"  Mission Control (generic consoles, no marks): two bone controller stars in
//              headsets watch the big screen count down 3 · 2 · 1 → "INCOMING ★".
//   2.00–4.90  the camera tilts up into the night sky: a capsule under a striped chute drops through pixel clouds while a
//              generic Houston skyline rises underneath. The ghost peeks out of the capsule porthole (3.00–4.35).
//   4.90       touchdown on a lawn in front of the skyline (thud, dust).
//   5.10–6.50  the hatch opens: twelve pairs of eyes in the dark, then the twelve sign stars hop out. "Humidity level: |
//              *yes.*" The steam rolls off the ground and every pair of eyes fogs up.
//   6.50–13.0  THE STARS: "we've talked to you from up there for years." → "now we're coming *down*. Houston first." (they
//              wipe the fog off and hop). "Space City, | *touchdown.*"
//   13.10 cut → "Houston, we | have a *match.*"  Twelve heart-eyed stars. Everything pops out by 15.5.
// Easter eggs (stlore.js): the season constellation (EP 001: star one) top-left, the EP 001 cartouche, the ghost cameo.
// One canvas, DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
const EP = 1
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.6, count: [0.55, 1.05, 1.55], incoming: 1.95, pan: [2.0, 2.75],
  capIn: [2.2, 3.0], ghost: 3.0, sky: [3.5, 4.9], descend: [4.0, 4.9], land: 4.9, h0Out: [4.95, 5.15],
  hatch: 5.1, eyes: 5.25, out0: 5.5, h1: 5.4, h1Land: 5.85, fog: [6.15, 6.6],
  open: 6.5, l1: 6.7, h1Out: [9.5, 9.7], l2: 9.85, h1b: 9.85, h1bLand: 10.25, wipe: [10.4, 11.0],
  close: 13.0, h1bOut: [12.85, 13.05],
  cut: 13.1, h2: 13.16, h2Land: 13.6, heart: 13.75, h2Out: [15.15, 15.4], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "we've talked to you from up there for years." },
  { t: T.l2, speaker: SPEAK, text: "now we're coming *down*. Houston first." },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

/** a bitmap of cells with a 1-cell ink outline, centred on (cx, cy) */
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
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']

// ── the cast: all twelve sign stars, in their landing spots
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const SPOTS = [
  // front row (on the lawn)
  [120, 1300, 150], [288, 1300, 150], [456, 1306, 150], [624, 1306, 150], [792, 1300, 150], [960, 1300, 150],
  // back row, either side of the capsule
  [96, 1150, 132], [232, 1146, 132], [848, 1146, 132], [984, 1150, 132],
  // two on the capsule's roof
  [478, 968, 118], [602, 968, 118],
]
// who lands where (mixed so the colours spread)
const CAST = [4, 3, 8, 11, 0, 9, 2, 6, 7, 1, 10, 5].map((s, k) => ({ id: ORDER[s], ...signStar(ORDER[s]), spot: SPOTS[k], seed: 3 + k * 7, d: [0, 0.3, 0.12, 0.24, 0.06, 0.36, 0.42, 0.18, 0.48, 0.54, 0.6, 0.66][k] }))

// ── capsule geometry (cells); bottom centre is its anchor
const CAP = { c: 11, rows: 30, port: { row: 8.5, r: 5.6 }, hatch: { r0: 15, r1: 27, hw: 4 } }
const hw = j => 8 + j * 0.4
const GROUND = 1330
const LOW = 150
const lowK = t => ease.inOutCubic(prog(t, T.cut - 0.06, T.cut + 0.06))
const capBottom = t => {
  if (t < T.capIn[1]) return lerp(-120, 1170, ease.outCubic(prog(t, ...T.capIn)))
  if (t < T.descend[0]) return 1170
  return lerp(1170, GROUND, ease.inQuad(prog(t, ...T.descend)))
}
const capSway = t => t < T.land ? Math.sin(t * 2.3) * 0.045 * (1 - prog(t, 4.3, T.land)) : 0
const capPos = t => {
  const land = t - T.land
  const thud = land > 0 && land < 0.5 ? 0.06 * Math.exp(-land * 9) * Math.cos(land * 28) : 0
  return { x: 540 + (t < T.land ? Math.sin(t * 1.6) * 14 * (1 - prog(t, 4.3, T.land)) : 0), y: capBottom(t) + (t < T.land ? Math.sin(t * 3.1) * 6 : 0), rot: capSway(t), sq: thud }
}

// ── the skyline: generic towers (no real outlines), lit windows, a few blinking spires
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
function drawSkyline(x, t, base, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a
  for (const tw of TOWERS) {
    const top = base - tw.h
    x.fillStyle = '#2a2156'; x.fillRect(tw.x - 3, top - 3, tw.w + 6, tw.h + 3)
    x.fillStyle = '#151034'; x.fillRect(tw.x, top, tw.w, tw.h)
    x.fillStyle = '#1d1645'; x.fillRect(tw.x, top, Math.round(tw.w * 0.3), tw.h)
    if (tw.roof === 1) { x.fillStyle = '#2a2156'; x.fillRect(tw.x + tw.w * 0.2 - 3, top - 27, tw.w * 0.6 + 6, 27); x.fillStyle = '#151034'; x.fillRect(tw.x + tw.w * 0.2, top - 24, tw.w * 0.6, 24) }
    if (tw.roof === 2) {
      const sx = Math.round(tw.x + tw.w / 2)
      x.fillStyle = '#2a2156'; x.fillRect(sx - 3, top - 70, 6, 70)
      if (Math.sin(t * 3 + tw.seed) > 0.2) { x.fillStyle = '#ff5c6e'; x.fillRect(sx - 5, top - 78, 10, 10) }
    }
    if (tw.roof === 3) { x.fillStyle = '#151034'; for (let k = 0; k < 4; k++) x.fillRect(tw.x + k * 6, top - (4 - k) * 8, tw.w - k * 12, 8) }
    // windows
    const r = rng(tw.seed)
    for (let wy = top + 14; wy < base - 16; wy += 22) for (let wx = tw.x + 9; wx < tw.x + tw.w - 12; wx += 16) {
      const v = r(), on = v < 0.36 || (v < 0.42 && Math.sin(t * 0.7 + wx * 0.1 + wy) > 0.3)
      if (!on) continue
      x.fillStyle = v < 0.08 ? '#ffe9b0' : v < 0.2 ? '#f7cf68' : '#c99a4a'
      x.fillRect(wx, wy, 8, 10)
    }
  }
  x.restore()
}

/** a pixel cloud (union of circles, snapped to cells) */
function cloud(x, cx, cy, w, h, c, fillC, edge, hiC) {
  const blobs = [[0, 0.08, 0.5], [-0.28, 0.12, 0.42], [0.28, 0.12, 0.42], [-0.12, -0.18, 0.42], [0.16, -0.2, 0.4], [-0.4, 0.2, 0.3], [0.4, 0.2, 0.3]]
  const inside = (px, py) => blobs.some(([bx, by, br]) => { const dx = px - bx * w, dy = py - by * h, r = br * h; return dx * dx + dy * dy <= r * r })
  const nx = Math.ceil(w / c / 2) + 2, ny = Math.ceil(h / c / 2) + 3
  for (const pass of [0, 1]) for (let j = -ny; j <= ny; j++) for (let i = -nx; i <= nx; i++) {
    const px = i * c, py = j * c, on = inside(px, py)
    if (pass === 0) { if (!on && (inside(px + c, py) || inside(px - c, py) || inside(px, py + c) || inside(px, py - c))) { x.fillStyle = edge; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) } }
    else if (on) { x.fillStyle = j < -ny * 0.3 ? hiC : fillC; x.fillRect(cx + px - c / 2, cy + py - c / 2, c + 0.5, c + 0.5) }
  }
}
const CLOUDS = [[180, 2050, 420, 150], [880, 2380, 380, 140], [300, 2760, 520, 170], [820, 3150, 440, 150], [140, 3500, 360, 130], [700, 3800, 520, 160]]
const cloudScroll = t => 3900 * ease.inOutQuad(prog(t, 2.0, 5.0))

// the twelve stars' moods by beat
function castState(t, k) {
  if (t < T.fog[0]) return { mood: 'happy' }
  if (t < T.wipe[0] + k * 0.03) return { mood: 'squint', look: [0, 0] }
  if (t < T.heart) return { mood: k % 3 === 0 ? 'sparkle' : 'happy' }
  return { mood: 'heart' }
}
const fogK = (t, k) => ease.outCubic(prog(t, T.fog[0] + (k % 4) * 0.06, T.fog[1] + (k % 4) * 0.06)) * (1 - ease.inOutQuad(prog(t, T.wipe[0] + k * 0.03, T.wipe[1] + k * 0.03)))
const HOPS_ALL = talkHops(LINES, SPEAK, { cps: CPS })

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 300px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, '*Houston,* | we have a…', { top: 196, size: 118, accentSize: 168, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 0 })
  const H1 = popText(root, 'Humidity level: | *yes.*', { top: 196, size: 104, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: CYAN })
  const H1b = popText(root, 'Space City, | *touchdown.*', { top: 196, size: 108, accentSize: 160, at: T.h1b, late: 1, lateAt: T.h1bLand, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'Houston, we | have a *match.*', { top: 210, size: 112, accentSize: 170, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK, lineHeight: 1.04 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, CYAN]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── Mission Control (slides away as the camera tilts up)
  function drawMission(t) {
    const pan = ease.inOutCubic(prog(t, ...T.pan))
    if (pan >= 1) return
    const oy = pan * 1500
    x.save(); x.translate(0, oy)
    // dim room wash
    x.fillStyle = `rgba(8,10,28,${0.55 * (1 - pan)})`; x.fillRect(0, 0, 1080, 1920)
    // the big screen
    const sx = 150, sy = 560, sw = 780, sh = 440
    x.fillStyle = INK; x.fillRect(sx - 18, sy - 18, sw + 36, sh + 36)
    x.fillStyle = '#4a4d6e'; x.fillRect(sx - 12, sy - 12, sw + 24, sh + 24)
    x.fillStyle = '#0a1430'; x.fillRect(sx, sy, sw, sh)
    // grid + scanlines
    x.fillStyle = 'rgba(127,224,255,0.08)'
    for (let gx2 = sx; gx2 < sx + sw; gx2 += 60) x.fillRect(gx2, sy, 2, sh)
    for (let gy = sy; gy < sy + sh; gy += 60) x.fillRect(sx, gy, sw, 2)
    x.fillStyle = 'rgba(0,0,0,0.18)'; for (let gy = sy; gy < sy + sh; gy += 6) x.fillRect(sx, gy, sw, 2)
    // trajectory arc (dotted) towards a little skyline bar at the bottom of the screen
    x.fillStyle = 'rgba(127,224,255,0.55)'
    for (let k = 0; k < 22; k++) { const f = k / 21; x.fillRect(Math.round(sx + 80 + f * 560), Math.round(sy + 70 + f * f * 300), 6, 6) }
    x.fillStyle = 'rgba(127,224,255,0.35)'
    for (let k = 0; k < 16; k++) { const bh = 14 + ((k * 37) % 5) * 12 + (k > 6 && k < 11 ? 30 : 0); x.fillRect(sx + 470 + k * 18, sy + sh - 20 - bh, 14, bh) }
    // countdown / INCOMING
    x.textAlign = 'center'; x.textBaseline = 'middle'
    let n = -1
    for (let i = 0; i < 3; i++) if (t >= T.count[i]) n = i
    if (t < T.incoming && n >= 0) {
      const p = pop01(t, T.count[n], 0.22, 2.6)
      x.save(); x.translate(540, sy + sh / 2 + 6); x.scale(p, p)
      x.font = `700 300px ${MONO}`; x.fillStyle = '#05203a'; x.fillText(String(3 - n), 6, 10)
      x.fillStyle = CYAN; x.fillText(String(3 - n), 0, 0)
      x.restore()
    } else if (t < T.count[0]) {
      x.font = `700 64px ${MONO}`; x.fillStyle = 'rgba(127,224,255,0.75)'; x.fillText('DESCENT', 540, sy + sh / 2)
    }
    if (t >= T.incoming) {
      const p = pop01(t, T.incoming, 0.26, 2.6), fl = Math.sin(t * 18) > -0.4 ? 1 : 0.55
      x.save(); x.translate(540, sy + sh / 2); x.scale(p, p); x.globalAlpha = fl
      x.font = `700 96px ${MONO}`; x.fillStyle = GOLD; x.fillText('INCOMING', 0, -20)
      x.font = `700 40px ${MONO}`; x.fillStyle = CYAN; x.fillText('12 PASSENGERS', 0, 70)
      x.restore()
    }
    x.fillStyle = 'rgba(127,224,255,0.75)'; x.font = `700 30px ${MONO}`; x.textAlign = 'left'
    x.fillText('MISSION CONTROL · HOU', sx + 24, sy + 34)
    // controllers (bone stars with headsets), behind the desk
    const ctl = [[300, 1150, 200, 11], [780, 1150, 200, 17]]
    ctl.forEach(([cx, cy, s, seed], k) => {
      const mood = t < T.count[0] ? 'neutral' : t < T.incoming ? 'wide' : 'happy'
      const r = drawStarChar(x, cx, cy, s, t, { color: STAR.bone, mood, look: [k ? -0.5 : 0.5, -1], blink: t < T.incoming ? false : undefined, seed, glow: 0.7, hops: [T.incoming + 0.04 + k * 0.08, T.count[1] + k * 0.05] })
      // headset: a band over the top + an ear cup + a mic
      const c = r.size / 36
      x.fillStyle = INK; x.fillRect(cx - 12 * c, r.y - 10 * c, 24 * c, 2.4 * c)
      x.fillStyle = '#4a4d6e'; x.fillRect(cx - 11 * c, r.y - 9.6 * c, 22 * c, 1.4 * c)
      x.fillStyle = INK; x.fillRect(cx - 14 * c, r.y - 4 * c, 4 * c, 6 * c)
      x.fillStyle = '#ff5c6e'; x.fillRect(cx - 13.3 * c, r.y - 3.3 * c, 2.6 * c, 4.6 * c)
      x.fillStyle = INK; x.fillRect(cx - 12 * c, r.y + 2 * c, 1.2 * c, 5 * c); x.fillRect(cx - 12 * c, r.y + 6.2 * c, 6 * c, 1.2 * c)
    })
    // desk + blinking buttons
    x.fillStyle = INK; x.fillRect(0, 1196, 1080, 30); x.fillStyle = '#2b2a4e'; x.fillRect(0, 1200, 1080, 22)
    x.fillStyle = '#141230'; x.fillRect(0, 1226, 1080, 300)
    const bc = ['#7fe0ff', '#f2c75c', '#ff5c6e', '#7dffb0']
    for (let k = 0; k < 40; k++) {
      const bx = 34 + (k % 20) * 52, by = 1250 + Math.floor(k / 20) * 40
      const on = Math.sin(t * (2 + (k % 5)) + k * 1.7) > 0
      x.fillStyle = on ? bc[k % 4] : '#2b2a4e'; x.fillRect(bx, by, 22, 14)
    }
    x.restore()
  }

  // ── the capsule + chute
  function drawCapsule(t) {
    if (t < T.capIn[0]) return null
    const P = capPos(t), c = CAP.c, H = CAP.rows * c
    x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.scale(1 + P.sq, 1 - P.sq * 0.9)
    // the chute (until touchdown, then it slumps away)
    const slump = ease.inCubic(prog(t, T.land - 0.05, T.land + 0.5))
    if (slump < 1) {
      x.save(); x.globalAlpha = 1 - slump
      const cy = -H - 230 + slump * 160, cw = 15
      for (const s of [-1, 1]) { x.fillStyle = BONE; for (let k = 0; k < 18; k++) { const f = k / 17; x.fillRect(Math.round(s * lerp(8, 150, 1 - f)) - 1, Math.round(lerp(-H + 6, cy + 40, 1 - f)), 3, 10) } }
      const cols = ['#ff7a4a', '#fbf1dc']
      // canopy: a pixel dome, striped
      for (let j = -7; j <= 0; j++) for (let i = -12; i <= 12; i++) {
        const u = (i + 0.5) / 12.5, v = (j - 0.5) / 7.5
        if (u * u + v * v > 1) continue
        x.fillStyle = Math.floor((i + 12) / 3) % 2 ? cols[1] : cols[0]
        if (j === 0) x.fillStyle = Math.floor((i + 12) / 3) % 2 ? '#d8cbb4' : '#c95a34'
        x.fillRect(i * cw - 0.5, cy + j * cw, cw + 1, cw + 1)
      }
      x.restore()
    }
    // body (cells, rows 0…rows-1 from the top)
    const top = -H
    for (let j = 0; j < CAP.rows; j++) {
      let w = hw(j)
      if (j === 0) w -= 3
      if (j === 1) w -= 1
      const n = Math.round(w)
      x.fillStyle = INK; x.fillRect((-n - 1) * c, top + j * c, (2 * n + 2) * c, c + 0.5)
      for (let i = -n; i < n; i++) {
        const u = (i + 0.5) / n
        let col = '#c8cfe0'
        if (j >= CAP.rows - 3) col = j === CAP.rows - 3 ? '#8a5a34' : '#5a3b2e'
        else if (u > 0.55) col = '#9aa3bd'
        else if (u < -0.55) col = '#e9eef8'
        else if (j % 7 === 4) col = '#aeb6cc'
        x.fillStyle = col; x.fillRect(i * c, top + j * c, c + 0.5, c + 0.5)
      }
    }
    // a little gold star decal on the side
    drawPixelStar(x, 6.8 * c, top + 20 * c, 40, 2, GOLD)
    // the hatch (door swings open on its left hinge)
    const hx0 = -CAP.hatch.hw * c, hy0 = top + CAP.hatch.r0 * c, hwid = 2 * CAP.hatch.hw * c, hh = (CAP.hatch.r1 - CAP.hatch.r0) * c
    const open = ease.outBack(prog(t, T.hatch, T.hatch + 0.35))
    x.fillStyle = INK; x.fillRect(hx0 - 6, hy0 - 6, hwid + 12, hh + 12)
    if (open > 0) {
      x.fillStyle = '#0a0718'; x.fillRect(hx0, hy0, hwid, hh)
      // twelve pairs of eyes in the dark, before they hop out
      if (t > T.eyes && t < T.out0 + 0.5) {
        for (let k = 0; k < 12; k++) {
          if (t > T.out0 + CAST[k].d) continue
          const ex = hx0 + 10 + (k % 4) * 18, ey = hy0 + 12 + Math.floor(k / 4) * 34
          const blink = Math.sin(t * 5 + k * 2.1) > 0.92
          x.fillStyle = '#ffffff'; if (!blink) { x.fillRect(ex, ey, 5, 7); x.fillRect(ex + 9, ey, 5, 7) } else { x.fillRect(ex, ey + 4, 5, 2); x.fillRect(ex + 9, ey + 4, 5, 2) }
        }
      }
      const dw = hwid * (1 - 0.85 * clamp(open))
      x.fillStyle = INK; x.fillRect(hx0 - 6 - dw * 0.15, hy0 - 4, dw * 0.15 + 4, hh + 8)
      x.fillStyle = '#aeb6cc'; x.fillRect(hx0 - dw * 0.15, hy0, Math.max(4, dw * 0.15), hh)
    } else {
      x.fillStyle = '#aeb6cc'; x.fillRect(hx0, hy0, hwid, hh)
      x.fillStyle = '#9aa3bd'; x.fillRect(hx0 + hwid - 2 * c, hy0, 2 * c, hh)
      x.fillStyle = INK; x.fillRect(hx0 + hwid - 2.4 * c, hy0 + hh / 2 - 10, c, 20)
    }
    // the porthole
    const pr = CAP.port.r * c, pcy = top + CAP.port.row * c
    for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) {
      const d = Math.hypot(i + 0.5, j + 0.5) / CAP.port.r
      if (d > 1.18) continue
      x.fillStyle = d > 1.0 ? INK : d > 0.8 ? ((i + j) < 0 ? '#ffe7a0' : '#c99a4a') : '#1d1440'
      x.fillRect(i * c, pcy + j * c, c + 0.5, c + 0.5)
    }
    // inside the glass: the cabin's console edge + blinking lights
    const gr = pr * 0.8
    x.save(); x.beginPath(); x.arc(0, pcy, gr, 0, Math.PI * 2); x.clip()
    x.fillStyle = '#2b2160'; x.fillRect(-gr, pcy - gr, 2 * gr, 2 * gr)
    x.restore()
    x.restore()
    return { P, pcy, gr, top }
  }
  // porthole glass foreground (console edge + shine), drawn after the ghost cameo so the ghost sits behind it
  function drawPortFront(t, cap) {
    const { P, pcy, gr } = cap
    x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.scale(1 + P.sq, 1 - P.sq * 0.9)
    x.beginPath(); x.arc(0, pcy, gr, 0, Math.PI * 2); x.clip()
    x.fillStyle = '#140c2c'; x.fillRect(-gr, pcy + 16, 2 * gr, gr)
    x.fillStyle = Math.sin(t * 6) > 0 ? '#7dffb0' : '#2b5f4a'; x.fillRect(-26, pcy + 24, 8, 6)
    x.fillStyle = Math.sin(t * 4 + 1) > 0 ? '#ff5c6e' : '#5a2b3a'; x.fillRect(18, pcy + 24, 8, 6)
    x.fillStyle = 'rgba(255,255,255,0.4)'
    for (let k = 0; k < 4; k++) x.fillRect(-30 + k * 8, pcy - 34 + k * 8, 8, 8)
    x.restore()
  }

  function drawLawn(t, oy) {
    const y = GROUND + oy
    if (y > 1920) return
    x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 8)
    x.fillStyle = '#16302a'; x.fillRect(0, y, 1080, 1920 - y)
    x.fillStyle = '#1f4234'
    for (let i = 0; i < 1080; i += 12) { const h = 6 + ((i * 7) % 5) * 3; x.fillRect(i, y - h + 4, 6, h) }
    x.fillStyle = '#122620'; for (let j = 0; j < 8; j++) x.fillRect(0, y + 40 + j * 70, 1080, 6)
  }

  // humidity: wobbling steam waves rising off the lawn
  function drawSteam(t) {
    const a = clamp(prog(t, T.hatch, T.hatch + 0.4)) * (1 - prog(t, T.wipe[1], T.wipe[1] + 1.2))
    if (a <= 0) return
    x.save()
    for (let k = 0; k < 9; k++) {
      const ph = ((t * 0.32 + k * 0.137) % 1), bx = 70 + k * 118 + Math.sin(k * 3.3) * 30
      const by = GROUND - 20 - ph * 520
      x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.6
      x.fillStyle = '#cfe6ff'
      for (let s = 0; s < 6; s++) x.fillRect(Math.round(bx + Math.sin(ph * 9 + s * 0.9 + k) * 12), Math.round(by - s * 14), 8, 12)
    }
    x.restore()
  }

  function drawFog(r, a, k) {
    if (a <= 0.01) return
    const c = r.size / 36
    x.save(); x.globalAlpha = a * 0.8
    for (let j = -4; j <= 6; j++) for (let i = -11; i <= 10; i++) {
      const u = (i + 0.5) / 11, v = (j - 1) / 5.5, wob = 0.12 * Math.sin(i * 1.7 + j * 2.3 + k)
      if (u * u + v * v > 1 + wob) continue
      x.fillStyle = (i + j + k) % 5 === 0 ? '#ffffff' : (i * 3 + j) % 7 === 0 ? '#bccbe0' : '#dfe9f5'
      x.fillRect(Math.round(r.x + i * c), Math.round(r.y + j * c), Math.ceil(c), Math.ceil(c))
    }
    // drips
    x.globalAlpha = a * 0.9; x.fillStyle = '#9fd0ff'
    for (const [i, ph] of [[-6, 0.1], [3, 0.55], [7, 0.3]]) { const d = ((r.t * 0.8 + ph + k * 0.17) % 1) * 4; x.fillRect(Math.round(r.x + i * c), Math.round(r.y + (6 + d) * c), Math.ceil(c), Math.ceil(c * 1.4)) }
    x.restore()
  }

  function drawCast(t) {
    if (t < T.out0) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const P = capPos(t), hatchX = P.x, hatchY = GROUND - 90
    CAST.forEach((s, k) => {
      const t0 = T.out0 + s.d
      if (t < t0) return
      const [fx, fy, size] = s.spot
      const p = ease.outCubic(prog(t, t0, t0 + 0.38))
      const px = lerp(hatchX, fx, p), py = lerp(hatchY, fy, p) - Math.sin(Math.PI * p) * (k >= 10 ? 340 : 220)
      const st = castState(t, k)
      const hops = [t0 + 0.4, ...(t > T.wipe[0] ? [T.wipe[1] + k * 0.04] : []), T.h2Land + (k % 4) * 0.06, ...HOPS_ALL.filter((h, i) => (i + k) % 4 === 0)]
      const r = drawStarChar(x, px, py, size * lerp(0.5, 1, p), t, { color: s.color, glyph: s.glyph, ...st, pop: ok, hops, seed: s.seed, glow: 0.95 })
      r.t = t
      drawFog(r, fogK(t, k) * ok, k)
    })
  }
  function floatHearts(t, t0, t1) {
    for (let i = 0; i < 14; i++) {
      const born = t0 + i * 0.1, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const [sx, sy] = CAST[i % 12].spot
      const hx = sx + Math.sin(p * 7 + i) * 16, hy = sy - 80 - p * 240
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(hx), Math.round(hy), 6 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      // camera: Mission Control room → tilt up into the sky → down with the capsule
      const pan = ease.inOutCubic(prog(t, ...T.pan))
      const skyDy = lerp(-60, 0, pan) + (t > T.pan[1] ? 0 : 0)
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * lerp(1.06, 1, pan), dy: skyDy, dim: SKY_H.dim * lerp(0.65, 1, pan) })
      drawSeedConstellation(x, t, EP)
      // clouds scrolling up past the falling capsule
      const sc = cloudScroll(t)
      if (t > T.pan[0] && t < 5.2) for (const [cx, cy, w, h] of CLOUDS) { const yy = cy - sc; if (yy > -200 && yy < 2100) cloud(x, cx, yy, w, h, 12, '#3a3470', '#231c4e', '#4c4688') }
      // skyline rises from below as we come down
      const rise = 1 - ease.outCubic(prog(t, ...T.sky))
      const skyOy = rise * 900
      x.save(); x.translate(0, LOW * lowK(t))
      if (t > T.sky[0]) { drawSkyline(x, t, GROUND + skyOy, 1); drawLawn(t, skyOy) }
      const cap = t < T.out[1] + 0.02 ? drawCapsule(t) : null
      // the ghost in the porthole (clipped to the glass; draw after the capsule, before the glass front)
      if (cap) {
        x.save(); x.translate(cap.P.x, cap.P.y); x.rotate(cap.P.rot)
        x.beginPath(); x.arc(0, cap.pcy, cap.gr, 0, Math.PI * 2); x.clip()
        drawGhostCameo(x, t, { x: 0, y: cap.pcy + 20, at: T.ghost, dur: 1.35, from: 'below', cell: 2.6 })
        x.restore()
        drawPortFront(t, cap)
      }
      // touchdown dust
      const dt = t - T.land
      if (dt > 0 && dt < 0.9) {
        x.save(); x.globalAlpha = 1 - dt / 0.9; x.fillStyle = '#b9b0d8'
        for (let k = 0; k < 14; k++) { const s = k % 2 ? 1 : -1, d = 150 + (k >> 1) * 40 * ease.outCubic(dt / 0.9) + dt * 160; x.fillRect(540 + s * d, GROUND - 16 - (k % 3) * 14 - dt * 40, 16, 16) }
        x.restore()
      }
      drawSteam(t)
      drawCast(t)
      if (t > T.heart) floatHearts(t, T.heart, T.out[0])
      sparkles(t, 540, 1150, T.h2Land, 14, 380, 1, [PINK, GOLD, BONE, CYAN])
      x.restore()
      drawMission(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 13.1 (box shut → "Houston, we have a match."). End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // Mission Control: the countdown
  ...wordPops(T.h0, 4, 0.1, 0, 0.026),
  ...T.count.map((c, i) => ['bell', c, [880, 880, 880][i], 0.03, 0.5, 0]), ...T.count.map(c => ['tick', c, 0.05]),
  ['bell', T.incoming, 1760, 0.04, 1.2, 0], ['pop', T.incoming, 1174.66, 0.04, 0],
  // tilt up, the drop, the clouds, the ghost
  ['whoosh', T.pan[0], 0.8, 0.05], ['riser', T.pan[0], T.land, 0.05],
  ['whoosh', T.capIn[0] + 0.2, 0.9, 0.04], ['pop', T.ghost + 0.1, 1318.51, 0.02, 0], ['tick', T.ghost + 0.7, 0.02],
  ['whoosh', 3.6, 0.7, 0.03], ['whoosh', 4.2, 0.6, 0.035],
  // touchdown, hatch, the twelve hop out
  ['boom', T.land, 0.22], ['tick', T.land, 0.06], ['whoosh', T.land + 0.05, 0.5, 0.03],
  ['tick', T.hatch, 0.05], ['whoosh', T.hatch + 0.05, 1.0, 0.04], ['glitter', T.eyes, T.eyes + 0.3],
  ...CAST.map((s, k) => ['pop', +(T.out0 + s.d + 0.05).toFixed(3), NOTE[k % 7], 0.03, ((k % 5) - 2) * 0.15]),
  ...wordPops(T.h1, 2, 0.08, 2, 0.025), ['pop', T.h1Land, 1174.66, 0.045, 0],
  ['whoosh', T.fog[0], 0.5, 0.03], ['pluck', T.fog[0] + 0.1, 440, 0.03, 0.6, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1b, 2, 0.08, 1, 0.025), ['pop', T.h1bLand, 1318.51, 0.045, 0],
  ['whoosh', T.wipe[0], 0.4, 0.025], ['glitter', T.wipe[1], T.wipe[1] + 0.4], ['pluck', T.wipe[1], 1174.66, 0.035, 0.5, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // the match
  ...wordPops(T.h2, 4, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.6],
  ['pluck', T.heart, 1174.66, 0.04, 0.5, -0.2], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
