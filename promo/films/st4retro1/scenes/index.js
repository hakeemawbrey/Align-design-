// st4retro1 (EP 015, 20 s vertical Align ad, Star Talk season 4, thread E1 "Retro the gremlin") · story 0–15.6, then the
// shared end card ("come" + the Align logo, JOIN THE HOUSTON BETA).
//   0.00–6.45  "When Mercury goes | *retrograde…*"  A cutaway apartment at night (window on a generic Houston skyline, a
//              bedside clock at 2:00 AM). The ♌ Leo star, crown askew, is half asleep in bed. Retro, the gold ☿ orb,
//              rolls in spinning BACKWARDS (rewind arrows), grins and nudges the phone off the nightstand: a chat with
//              "ex", the draft "u up?" already typed, SEND glowing. Leo's eyes snap open; it hovers over SEND.
//              Box (☿ RETRO): "go on. for old times' sake."
//   6.55–10.6  "2 a.m. is | *not* a plan."  Box (THE STARS): "retrograde is for *reflecting,* not re-texting."
//              Leo flips the phone face down. Retro stops spinning and sulks (droopy lids, a tiny rain cloud).
//  10.75       card cut (flip).
//  10.85–15.5  "Reflect. | Don't *resend.*"  Leo's own hand mirror floats up; it reflects (and approves), then snuggles
//              back to sleep. Retro sulks in the corner. Everything pops out by 15.45; the end card takes over at 15.6.
// Astrology: Mercury (communication, texts) appears to move backwards a few times a year; the season's running joke.
// Season lore: the 100-star constellation (EP 15) top-left; the ghost peeks in over the window sill (4.7–6.0).
// One canvas (sky + apartment + stars + props), DOM type + the box above it. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const EP = 15
export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', RED = '#ff5a5a', CYAN = '#7fdcff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const LEO = signStar('leo')

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.8, h0Out: [6.3, 6.48],
  room: 0.15, clock: 0.5, retroIn: [1.3, 2.2], grin: 2.25, nudge: [2.45, 2.95], phoneLit: 2.95, wake: 3.0,
  open: 3.25, l1: BEAT(5),                                             // 3.38: the drop
  hover: [4.6, 6.6],
  h1: 6.55, h1Land: 6.95, l2: 6.7, flip: [9.1, 9.5], sulk: 9.6, close: 10.55, h1Out: [10.4, 10.58],
  cut: 10.75,
  h2: 10.85, h2Land: 11.35, mirror: [11.7, 12.1], reflect: 12.2, approve: 12.9, mirrorOut: [13.6, 13.9], sleep: 14.0,
  h2Out: [15.22, 15.42], out: [15.05, 15.45],
  ghost: 4.7,
}
const RETRO = '☿ RETRO', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: RETRO, color: GOLD, text: "go on. for old times' *sake.*" },
  { t: T.l2, speaker: NARR, text: 'retrograde is for *reflecting,* not re-texting.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

const BMP = s => s.trim().split(/\s+/)
const CROWN = BMP(`g...g...g gg.YgY.gg YYYYYYYYY YRYYBYYRY YYYYYYYYY ddddddddd`)
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)
const CLOUD = BMP(`...XXX..... .XXXXXXX... XXXXXXXXXX. .XXXXXXXXX.`)
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0 || cell <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = typeof cols === 'string' ? cols : (cols[ch] || cols.X); x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout (the apartment is a cutaway panel floating in the night sky)
const ROOM = { x: 50, y: 500, w: 980, h: 870 }
const WIN = { x: 600, y: 560, w: 360, h: 270 }
const BED_Y = 1190
const LEO_P = { x: 300, y: 1065, size: 290 }
const STAND = { x: 790, y: 1170, w: 200, h: 190 }
const PHONE_A = { x: 860, y: 1150, s: 0.2, rot: -1.57 }, PHONE_B = { x: 590, y: 1030, s: 0.5, rot: 0.05 }
const RETRO_A = { x: 1180, y: 1060 }, RETRO_B = { x: 830, y: 900 }, RETRO_C = { x: 880, y: 930 }

function leoState(t) {
  if (t < T.wake) return { mood: 'sleepy', zzz: true }
  if (t < T.l1 + 0.5) return { mood: 'wide', look: [1, 0], blink: false }          // …a text? to the ex?
  if (t < T.l2) return { mood: 'squint', look: [1, 0], blink: false }               // hovering over SEND
  if (t < T.flip[0]) return { mood: 'wide', look: [0, 0] }
  if (t < T.mirror[0]) return { mood: 'happy' }
  if (t < T.approve) return { mood: 'neutral', look: [1, -1] }                       // reflecting
  if (t < T.sleep) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'sleepy', zzz: true }
}
const LEO_HOPS = [T.wake + 0.05, T.flip[1] + 0.05, T.h2Land, T.approve]

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 44px Inter", "500 30px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 60px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'When Mercury goes | *retrograde…*', { top: 190, size: 96, accentSize: 150, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0Land, wobble: true, accentColor: GOLD, fit: true })
  const H1 = popText(root, '2 a.m. is | *not* a plan.', { top: 190, size: 108, accentSize: 160, at: T.h1, gap: 0.08, late: -1, lateAt: T.h1Land, wobble: true, accentColor: RED })
  const H2 = popText(root, 'Reflect. | Don’t *resend.*', { top: 190, size: 112, accentSize: 164, at: T.h2, gap: 0.12, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // Retro's sprite (16-cell gold ball, after stretro)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the apartment
  function drawRoom(t, k) {
    if (k <= 0.01) return
    const { x: rx, y: ry, w, h } = ROOM
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.beginPath(); x.roundRect(rx - 8, ry - 8, w + 16, h + 16, 34); x.fill()
    const g = x.createLinearGradient(0, ry, 0, ry + h); g.addColorStop(0, '#22184a'); g.addColorStop(0.72, '#1a1238'); g.addColorStop(0.72, '#2a1f4a'); g.addColorStop(1, '#231a3e')
    x.fillStyle = g; x.beginPath(); x.roundRect(rx, ry, w, h, 28); x.fill()
    // window: night sky, a generic skyline, the moon
    const { x: wx, y: wy, w: ww, h: wh } = WIN
    x.fillStyle = '#0d0a22'; x.fillRect(wx, wy, ww, wh)
    x.fillStyle = 'rgba(201,166,255,0.12)'; x.fillRect(wx, wy + wh * 0.55, ww, wh * 0.45)
    x.fillStyle = BONE; x.beginPath(); x.arc(wx + ww - 70, wy + 62, 26, 0, Math.PI * 2); x.fill(); x.fillStyle = '#0d0a22'; x.beginPath(); x.arc(wx + ww - 60, wy + 54, 24, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 9; i++) { const sx = wx + 20 + ((i * 71) % (ww - 40)), sy = wy + 20 + ((i * 37) % 90); x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillRect(sx, sy, 3, 3) }
    ;[[30, 110], [70, 160], [112, 90], [150, 190], [196, 130], [236, 170], [280, 100], [318, 140]].forEach(([dx, hh], i) => {
      x.fillStyle = i % 2 ? '#191236' : '#150f2e'; x.fillRect(wx + dx - 20, wy + wh - hh, 40, hh)
      x.fillStyle = 'rgba(255,214,150,0.55)'
      for (let r = 0; r * 16 + 12 < hh - 10; r++) if ((r + i) % 3) x.fillRect(wx + dx - 10 + (r % 2) * 10, wy + wh - hh + 10 + r * 16, 4, 5)
    })
    x.strokeStyle = '#8a6ab8'; x.lineWidth = 12; x.strokeRect(wx, wy, ww, wh)
    x.fillStyle = '#8a6ab8'; x.fillRect(wx + ww / 2 - 4, wy, 8, wh); x.fillRect(wx - 16, wy + wh, ww + 32, 16)      // mullion + sill
    // curtains
    x.fillStyle = '#3a2a70'; x.fillRect(wx - 46, wy - 20, 40, wh + 40); x.fillRect(wx + ww + 6, wy - 20, 40, wh + 40)
    x.fillStyle = '#4a3a88'; for (let i = 0; i < 3; i++) { x.fillRect(wx - 40 + i * 12, wy - 20, 4, wh + 40); x.fillRect(wx + ww + 12 + i * 12, wy - 20, 4, wh + 40) }
    // wall art: a framed little heart
    x.fillStyle = '#8a6ab8'; x.fillRect(150, 600, 150, 120); x.fillStyle = '#140e2c'; x.fillRect(162, 612, 126, 96)
    bits(x, HEART, 225, 660, 6, { X: 'rgba(255,143,177,0.6)' })
    // bed: headboard + mattress; the blanket is drawn over Leo later
    x.fillStyle = '#5a3e8a'; x.beginPath(); x.roundRect(80, 900, 470, 300, 30); x.fill()
    x.fillStyle = '#6e50a6'; x.beginPath(); x.roundRect(96, 916, 438, 40, 14); x.fill()
    x.fillStyle = '#efe6d6'; x.beginPath(); x.roundRect(110, 1000, 170, 70, 26); x.fill()          // pillow
    // nightstand
    const { x: sx, y: sy, w: sw, h: sh } = STAND
    x.fillStyle = INK; x.fillRect(sx - 6, sy - 6, sw + 12, sh + 12)
    x.fillStyle = '#8a5a2a'; x.fillRect(sx, sy, sw, sh); x.fillStyle = '#b07a3a'; x.fillRect(sx, sy, sw, 12)
    x.fillStyle = '#6e4620'; x.fillRect(sx + 20, sy + 60, sw - 40, 50); x.fillStyle = GOLD; x.fillRect(sx + sw / 2 - 10, sy + 80, 20, 8)
    x.restore()
  }
  function drawClock(t, k) {
    const ck = pop01(t, T.clock, 0.3, 2.2) * k
    if (ck <= 0.01) return
    const cx = STAND.x + 150, cy = STAND.y - 40
    x.save(); x.translate(cx, cy); x.scale(ck, ck)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-74, -40, 148, 80, 12); x.fill()
    x.fillStyle = '#100a24'; x.beginPath(); x.roundRect(-66, -32, 132, 64, 8); x.fill()
    const blink = Math.floor(t * 2) % 2 === 0
    x.fillStyle = RED; x.shadowColor = RED; x.shadowBlur = 14; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(blink ? '2:00' : '2 00', -8, 2); x.shadowBlur = 0
    x.font = `700 16px ${MONO}`; x.fillText('AM', 46, 14)
    x.restore()
    glow(cx, cy, 120, RED, 0.25 * ck)
  }

  // ── the phone: on the nightstand (dark), nudged over to Leo (lit), then flipped face down onto the blanket
  function phonePose(t) {
    const n = ease.inOutCubic(prog(t, ...T.nudge)), hop = Math.sin(Math.PI * prog(t, ...T.nudge)) * 120
    let px = lerp(PHONE_A.x, PHONE_B.x, n), py = lerp(PHONE_A.y, PHONE_B.y, n) - hop, s = lerp(PHONE_A.s, PHONE_B.s, n), rot = lerp(PHONE_A.rot, PHONE_B.rot, n)
    const f = prog(t, ...T.flip)
    if (f > 0) { py = lerp(PHONE_B.y, BED_Y - 10, ease.inQuad(f)); s = lerp(PHONE_B.s, 0.32, f); rot = lerp(PHONE_B.rot, -1.45, ease.inOutCubic(f)) }
    return { px, py, s, rot, flipK: Math.cos(Math.PI * ease.inOutCubic(f)) }
  }
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawPhone(t, k) {
    if (k <= 0.01) return
    const P = phonePose(t)
    const lit = t >= T.phoneLit && P.flipK > 0
    x.save(); x.translate(P.px, P.py); x.rotate(P.rot); x.scale(P.s * k, P.s * k * Math.max(0.04, Math.abs(P.flipK)))
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    if (lit) { x.save(); x.shadowColor = rgba(PINK, 0.8); x.shadowBlur = 90; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore() }
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill()
    x.lineWidth = 9; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    if (P.flipK < 0) {
      // the back: a plain case with a little star sticker
      rr(-hw + 14, -hh + 14, w - 28, h - 28, 52); x.fillStyle = '#3a2a70'; x.fill()
      x.fillStyle = '#140d2a'; rr(-hw + 40, -hh + 40, 120, 120, 30); x.fill()
      drawPixelStar(x, 0, 60, 90, 1, GOLD, '#fff6e6')
      x.restore(); return
    }
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    if (!lit) { x.fillStyle = '#0b0818'; x.fillRect(sx, sy, sw, sh); x.restore(); x.restore(); return }
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#24164a'); g.addColorStop(1, '#3d2066')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(sx, sy + 60, sw, 110)
    x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = rgba(BONE, 0.7); x.font = `500 52px ${INTER}`; x.fillText('‹', sx + 22, sy + 112)
    x.fillStyle = BONE; x.font = `800 58px ${INTER}`; x.fillText('ex', sx + 80, sy + 100)
    x.font = `500 30px ${INTER}`; x.fillStyle = rgba(BONE, 0.55); x.fillText('last seen: a while', sx + 80, sy + 145)
    // the draft
    const fy = sy + sh - 170
    rr(sx + 18, fy, sw - 120, 120, 60); x.fillStyle = 'rgba(10,6,26,0.75)'; x.fill(); x.lineWidth = 4; x.strokeStyle = rgba(PINK, 0.85); x.stroke()
    x.font = `700 58px ${INTER}`; x.fillStyle = BONE; x.fillText('u up?', sx + 52, fy + 62)
    // SEND: glows, pulses harder while Leo hovers
    const hov = t > T.hover[0] && t < T.flip[0] ? 0.5 + 0.5 * Math.sin(t * 14) : 0.3
    const bx = sx + sw - 60, by = fy + 60
    x.save(); x.shadowColor = PINK; x.shadowBlur = 30 + 40 * hov; x.fillStyle = PINK; x.beginPath(); x.arc(bx, by, 50 + 6 * hov, 0, Math.PI * 2); x.fill(); x.restore()
    x.fillStyle = '#24164a'; x.beginPath(); x.moveTo(bx - 18, by + 18); x.lineTo(bx + 20, by); x.lineTo(bx - 18, by - 18); x.lineTo(bx - 10, by); x.closePath(); x.fill()
    x.restore()
    x.restore()
  }
  // the hover: Leo's arm-tip hovers over SEND (a pixel pointer that wiggles closer… and closer)
  function drawHover(t, k) {
    const h = clamp(prog(t, T.hover[0], T.hover[0] + 0.3)) * (1 - clamp(prog(t, T.l2 + 0.6, T.l2 + 0.9))) * k
    if (h <= 0.01) return
    const P = phonePose(t)
    const closer = clamp(prog(t, T.hover[0], T.l2 + 0.5))
    const tx = P.px + 0.5 * (420 / 2 - 76) - 4, ty = P.py + 0.5 * (800 / 2 - 100) - 140 + closer * 60 + Math.sin(t * 9) * 10
    x.save(); x.globalAlpha = h
    bits(x, ['..X..', '..X..', 'XXXXX', '.XXX.', '..X..'], tx, ty, 9, LEO.color)
    x.restore()
  }

  // ── Retro: rolls in backwards, grins, nudges; sulks after
  function retroPose(t) {
    const p = ease.outCubic(prog(t, ...T.retroIn))
    let rx = lerp(RETRO_A.x, RETRO_B.x, p), ry = lerp(RETRO_A.y, RETRO_B.y, p) - Math.abs(Math.sin(p * Math.PI * 3)) * 40 * (1 - p)
    const nd = prog(t, ...T.nudge); rx -= Math.sin(Math.PI * nd) * 50
    if (t > T.sulk) { const s = ease.inOutCubic(prog(t, T.sulk, T.sulk + 0.6)); rx = lerp(rx, RETRO_C.x, s); ry = lerp(ry, RETRO_C.y, s) }
    return { rx, ry }
  }
  function drawRetro(t, ok) {
    if (t < T.retroIn[0] || ok <= 0.01) return
    const { rx, ry: ry0 } = retroPose(t), r = 74 * ok
    const sulk = clamp(prog(t, T.sulk, T.sulk + 0.5))
    const ry = ry0 + Math.sin(t * 2.3) * 6 * (1 - sulk) + sulk * 20
    glow(rx, ry, r * 3, GOLD, 0.8 * (1 - 0.6 * sulk))
    const spinRate = lerp(-3.0, 0, sulk), spin = t * spinRate
    if (sulk < 1) {
      const R = r * 1.6, cell = 5
      x.save(); x.globalAlpha = 1 - sulk
      for (let i = 0; i < 3; i++) {
        const a = spin + i * Math.PI * 2 / 3
        for (let s = 1; s <= 4; s++) { const b = a + s * 0.16; x.fillStyle = rgba(GOLD, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25); x.fillRect(Math.round(rx + Math.cos(b) * R - q / 2), Math.round(ry + Math.sin(b) * R - q / 2), q, q) }
        bits(x, ARROW, rx + Math.cos(a) * R, ry + Math.sin(a) * R, cell, '#fff1c8', { rot: a + Math.PI / 2 })
      }
      x.restore()
    }
    const S = Math.round(r * 2 / ORB_G) * ORB_G || r * 2
    x.save(); x.translate(Math.round(rx), Math.round(ry)); x.rotate(sulk < 1 ? spin : 0); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 5, 0, Math.PI * 2); x.fill()
    x.filter = sulk > 0 ? `saturate(${1 - 0.5 * sulk}) brightness(${1 - 0.25 * sulk})` : 'none'
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S)
    x.filter = 'none'
    x.restore()
    // the ☿ glyph (upright, low) and eyes (high): mischief → droopy lids
    x.save(); x.translate(rx, ry)
    x.font = `700 ${Math.round(r * 0.8)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.38)
    const c = Math.max(3, Math.round(r / 12)), grin = t > T.grin && t < T.sulk
    for (const s of [-1, 1]) {
      const ex = s * 3 * c - c / 2, ey = -r * 0.42
      x.fillStyle = INK
      if (sulk > 0.5) { x.fillRect(ex - c, ey + c, 3 * c, c); x.fillRect(ex - c * 0.5 + s * c * 0.5, ey + 2 * c, 2 * c, c) }              // droopy
      else if (grin) { x.fillRect(ex - c, ey, 3 * c, c); x.fillRect(ex, ey + c, c * 2, c * 1.4); x.fillStyle = '#ffffff'; x.fillRect(ex + c, ey + c, c * 0.7, c * 0.7) } // mischief
      else { x.fillRect(ex, ey - c, 2 * c, 3 * c); x.fillStyle = '#ffffff'; x.fillRect(ex, ey - c, c * 0.8, c * 0.8) }
    }
    x.restore()
    // the ℞ tag
    const tk = pop01(t, T.retroIn[1] - 0.1, 0.3, 2.2) * ok * (1 - ease.inCubic(prog(t, T.sulk, T.sulk + 0.3)))
    if (tk > 0.01) {
      x.save(); x.translate(rx, ry + r * 1.6 + 26); x.scale(tk, tk)
      x.font = `700 24px ${MONO}`; const label = '℞ RETRO', tw = x.measureText(label).width + 40
      x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-tw / 2, -20, tw, 40, 20); x.fill(); x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.9); x.stroke()
      x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label, 0, 2)
      x.restore()
    }
    // the sulk cloud
    if (sulk > 0) {
      const cy = ry - r - 60 + Math.sin(t * 2) * 4
      bits(x, CLOUD, rx, cy, 7 * sulk, '#8a86a8')
      x.save(); x.globalAlpha = sulk
      for (let i = 0; i < 4; i++) { const ph = (t * 1.4 + i * 0.27) % 1; x.fillStyle = CYAN; x.fillRect(rx - 30 + i * 18, cy + 22 + ph * 50, 4, 10) }
      x.restore()
    }
  }

  // ── Leo in bed: star, crown (askew), blanket over the lower half; the mirror in the last beat
  function drawLeo(t, ok) {
    const pk = pop01(t, T.room + 0.2, 0.36, 2) * ok
    if (pk <= 0.02) return null
    const st = leoState(t)
    const sit = t > T.wake && t < T.sleep ? -0.06 : 0.04
    const r = drawStarChar(x, LEO_P.x, LEO_P.y - (sit < 0 ? 30 : 0), LEO_P.size * pk, t, { color: LEO.color, glyph: LEO.glyph, ...st, hops: LEO_HOPS, seed: 3, glow: 0.9, squash: sit, bob: 3 })
    const cell = LEO_P.size * pk / 34
    bits(x, CROWN, r.x + cell * 2, r.top + cell * 0.5, cell * 0.95, CROWN_C, { rot: t < T.wake || t > T.sleep ? 0.45 : 0.12 })
    // blanket
    x.save(); x.globalAlpha = clamp(pk)
    x.fillStyle = INK; x.beginPath(); x.roundRect(84, BED_Y - 106, 470, 216, 26); x.fill()
    x.fillStyle = '#ff8fb1'; x.beginPath(); x.roundRect(92, BED_Y - 98, 454, 200, 22); x.fill()
    x.fillStyle = '#ffb3cc'; x.fillRect(92, BED_Y - 98, 454, 26)
    x.fillStyle = 'rgba(255,255,255,0.35)'; for (let i = 0; i < 8; i++) for (let j = 0; j < 3; j++) x.fillRect(120 + i * 54 + (j % 2) * 27, BED_Y - 50 + j * 46, 8, 8)
    x.restore()
    return r
  }
  function drawMirror(t, r) {
    const pin = pop01(t, T.mirror[0], 0.4, 2) * (1 - ease.inCubic(prog(t, ...T.mirrorOut)))
    if (pin <= 0.01 || !r) return
    const cx = r.x + 200, cy = r.y - 70 + Math.sin(t * 2.4) * 8, c = 8 * pin
    const RX = 7.5, RY = 9.5
    x.save(); x.translate(cx, cy); x.rotate(-0.12)
    x.fillStyle = INK; x.fillRect(-2 * c, (RY - 2.5) * c, 4 * c, 7 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-1 * c, (RY - 2) * c, 2 * c, 6 * c)
    for (let j = -11; j <= 9; j++) for (let i = -9; i <= 9; i++) {
      const u = (i + 0.5) / RX, v = (j + 0.5 + 2) / RY, d = u * u + v * v
      const col = d <= 0.62 ? '#2a1f55' : d <= 0.86 ? (u + v < -0.2 ? '#fff1c8' : '#f7c948') : d <= 1.0 ? '#c98a1f' : d <= 1.2 ? INK : null
      if (!col) continue
      x.fillStyle = col; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    x.save(); x.beginPath(); x.ellipse(0, -2 * c, RX * 0.78 * c, RY * 0.78 * c, 0, 0, Math.PI * 2); x.clip(); x.scale(-1, 1)
    drawStarChar(x, 0, -1 * c, 96 * pin, t, { color: LEO.color, mood: t > T.approve ? 'wink' : 'neutral', look: [1, 0], seed: 5, glow: 0.4, bob: 0, tips: false })
    x.restore()
    x.fillStyle = 'rgba(255,255,255,0.55)'; for (let q = 0; q < 4; q++) x.fillRect((-4 + q) * c, (-6 + q) * c, c, c)
    x.restore()
    // approval: a little ✓ sparkle
    if (t > T.approve && t < T.approve + 0.7) sparkles(t, cx, cy - 40, T.approve, 8, 90, 1, [GOLD, BONE, LAV])
  }
  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out), rk = clamp(prog(t, T.room, T.room + 0.4)) * (t > T.out[0] ? 1 - prog(t, T.out[0], T.out[1]) : 1)
        x.save(); if (t >= T.cut) x.translate(0, 150)            // the last beat: the box is gone, the room settles lower
        drawRoom(t, rk)
        // the ghost peeks in over the window sill (drawn after the window; clipped above the sill line)
        drawGhostCameo(x, t, { x: WIN.x + 250, y: WIN.y + WIN.h - 2, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
        drawClock(t, ok)
        const r = drawLeo(t, ok)
        drawPhone(t, ok)
        drawHover(t, ok)
        drawRetro(t, ok)
        drawMirror(t, r)
        sparkles(t, PHONE_B.x, BED_Y - 40, T.flip[1], 10, 150, 2, [GOLD, BONE, '#7fe0b8'])
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 10.75 (box shut, phone face down → "Reflect. Don't resend."), the one cut this film keeps.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // 2 a.m.: headline, the clock, Retro rolls in backwards (a falling rewind run), the nudge, the phone lights up
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['tick', T.clock + 0.05, 0.035], ['pop', T.clock + 0.1, 880, 0.025, 0.4],
  ['whoosh', T.retroIn[0], 0.9, 0.035], ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.retroIn[0] + 0.2 + i * 0.12).toFixed(3), NOTE[6 - i], 0.02, 0.5]),
  ['pluck', T.grin, 1318.51, 0.03, 0.4, 0.4],
  ['whoosh', T.nudge[0], 0.45, 0.03], ['tick', T.nudge[1], 0.04], ['bell', T.phoneLit, 1567.98, 0.03, 1.0, 0.1],
  ['pop', T.wake, 659.25, 0.04, -0.3],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [RETRO]: 520, [NARR]: 880 } }),
  ...[0, 1, 2, 3].map(i => ['tick', +(T.hover[0] + i * 0.35).toFixed(3), 0.018]),
  // not a plan: the flip (whoosh + soft thud on the blanket), Retro's sulk (a sad falling pair)
  ...wordPops(T.h1, 3, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ['whoosh', T.flip[0], 0.4, 0.035], ['boom', T.flip[1], 0.08], ['tick', T.flip[1], 0.03], ['glitter', T.flip[1], T.flip[1] + 0.4],
  ['pop', T.sulk, 392, 0.035, 0.4], ['pop', T.sulk + 0.18, 329.63, 0.03, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // reflect: the mirror, the approving wink, back to sleep
  ...wordPops(T.h2, 2, 0.12, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ['whoosh', T.mirror[0], 0.35, 0.03], ['bell', T.reflect, 1318.51, 0.03, 1.2, 0.3], ['pluck', T.approve, 1567.98, 0.035, 0.5, 0.3], ['glitter', T.approve, T.approve + 0.4],
  ['pop', T.mirrorOut[0], 1046.5, 0.025, 0.3], ['bell', T.sleep, 880, 0.02, 1.6, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
