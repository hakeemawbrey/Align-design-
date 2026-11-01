// trdaymoon: A DAY IN THE LIFE OF… the moon on date night (30 s vertical, Star Talk Trends §10.2, music: lofi · Bb)
// Story 0–25.6, then the shared end card. The vlog look lives in ./day.js (identical in all five trday films).
//   0.0–5.0   6:12 PM "A day in the life of… | *the moon.*"  The moon rises over the hill with a yawn and clocks in:
//             "clocking in. somebody's got a *date* tonight." Sticker: "commute: *rising*". Pisces sits on the hill.
//   5.0–9.3   8:03 PM "Job one: | *hanging around.*"  Two stars (♋ + ♐) meet at the bench: "hi." "hi!" The moon
//             drifts closer… and closer. "I'm not hovering. I'm *orbiting*. different." Sticker "distance: *respectful-ish*".
//   9.3–13.3  8:41 PM "Job two: | *set the mood.*"  The moon dims the other stars and turns its glow up into a soft spotlight
//             on the bench. "dim the stars… a little *glow*… perfect." Sticker "lighting: *flawless*".
//  13.4       card cut.
//  13.4–18.6  9:27 PM "Job three: | *eavesdropping.*"  The moon leans way down, eyes sideways, listening rings.
//             ♐ "best part of tonight?" ♋ "honestly? the moon." The moon gasps: "wait. did they just say *the moon*?!"
//             ♋ "…and you." The moon melts. Sticker "not listening (*listening*)". Pisces sobs.
//  18.6–22.4  9:28 PM "Clock out? | *never.*"  The moon floats back up beaming; the two stars hold hands; hearts.
//             "overtime? for *this*? gladly." Sticker "mood: *set*".
//  22.4–25.5  11:59 PM "I *glow* | for this."  Full glow, a wink. Everything pops out by 25.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, INTER, FONTS, pop01, outK, popOut, drawBits, sparkles, hearts, pisces,
  buildBug, buildClock, buildProgress, buildSticker, drawWash, handheld, wordPops, stickerCue, clockCues,
} from './day.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const CAN = signStar('cancer'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.15, h0Land: 0.85, h0Out: [4.75, 4.95], rise: [0.3, 2.2], yawn: [1.6, 2.3],
  h1: 5.0, h1Out: [9.05, 9.25], couple: 5.25, hi1: 6.2, hi2: 6.55, creep: [6.9, 8.8], caught: 8.3,
  h2: 9.35, h2Out: [12.95, 13.15], dim: [9.6, 10.6], spot: [10.4, 11.2],
  cut: 13.4,
  h3: 13.45, h3Out: [18.4, 18.6], lean: [13.3, 13.9], ask: 13.95, ans: 14.75, gasp: 15.2, andYou: 16.75, melt: 17.05,
  h4: 18.65, h4Out: [22.2, 22.4], up: [18.6, 19.3], hands: [19.0, 19.6],
  h5: 22.5, wink: 22.95,
  out: [25.05, 25.45], h5Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE MOON', SC = '#ffe6a3'
const LINES = [
  { t: 2.3, speaker: SPEAK, color: SC, text: "clocking in. somebody's got a *date* tonight." },
  { t: 5.8, speaker: SPEAK, color: SC, text: "I'm not hovering. I'm *orbiting*. different." },
  { t: 9.6, speaker: SPEAK, color: SC, text: 'dim the stars… a little *glow*… perfect.' },
  { t: 15.4, speaker: SPEAK, color: SC, text: 'wait. did they just say *the moon*?!' },
  { t: 18.9, speaker: SPEAK, color: SC, text: 'overtime? for *this*? gladly.' },
]
const CPS = 30
const BOX1 = { open: 2.1, close: 13.15 }, BOX2 = { open: 15.2, close: 22.1 }
const STAMPS = [{ t: 0, text: '6:12 PM' }, { t: T.h1, text: '8:03 PM' }, { t: T.h2, text: '8:41 PM' }, { t: T.h3, text: '9:27 PM' }, { t: T.h4, text: '9:28 PM' }, { t: T.h5, text: '11:59 PM' }]
const STICK = [
  { text: 'commute: *rising*', x: 330, y: 560, rot: -4, at: 3.2, out: [4.7, 4.95] },
  { text: 'distance: *respectful-ish*', x: 470, y: 520, rot: 3, at: 7.4, out: [9.0, 9.25] },
  { text: 'lighting: *flawless*', x: 330, y: 540, rot: -3, at: 11.3, out: [12.9, 13.15] },
  { text: 'not listening (*listening*)', x: 470, y: 500, rot: 3, at: 13.9, out: [18.35, 18.6] },
  { text: 'mood: *set*', x: 300, y: 860, rot: -4, at: 20.2, out: [22.15, 22.4] },
]
const CUTS = [9.3, { t: T.cut, kind: 'flip' }, 18.62]

// layout
const BENCH = { x: 540, y: 1250 }
const CANP = { x: 430, y: 1150, s: 190 }, SAGP = { x: 650, y: 1150, s: 190 }
const PISP = { x: 120, y: 1270, s: 110 }
const CAN_HOPS = [T.couple + 0.3, T.hi1, T.ans, T.andYou, T.hands[1], T.wink + 0.1]
const SAG_HOPS = [T.couple + 0.45, T.hi2, T.ask, T.melt + 0.2, T.hands[1] + 0.05]
const MOON_HOPS = [T.gasp, T.up[1], ...talkHops(LINES, SPEAK, { cps: CPS })]

// ── the moon: a pixel disc with craters, shading and a face
const MC = { body: '#f6eed4', shade: '#ddd2ae', crater: '#cbbd94', rim: '#fffbea' }
const CRATERS = [[-5, -6, 2.2], [4, -3, 1.6], [6, 5, 2.4], [-7, 4, 1.4], [-1, 8, 1.3], [8, -8, 1.1]]
function eyeBM(kind, lx = 0, ly = 0) {
  if (kind === 'shut') return ['KKKK']
  if (kind === 'happy') return ['.KK.', 'K..K']
  if (kind === 'heart') return ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
  const wide = kind === 'wide'
  const w = wide ? 5 : 4, h = wide ? 6 : 5, ps = wide ? 1 : 2
  const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => ((i === 0 || i === w - 1) && (j === 0 || j === h - 1)) ? '.' : 'W'))
  const px = clamp(Math.round((w - ps) / 2 + lx), 0, w - ps), py = clamp(Math.round((h - ps) / 2 + ly), 1, h - 1 - ps)
  for (let j = 0; j < ps; j++) for (let i = 0; i < ps; i++) rows[py + j][px + i] = 'K'
  return rows.map(r => r.join(''))
}
const MOUTH = { smile: ['K...K', '.KKK.'], grin: ['KKKKK', 'KRRRK', '.KKK.'], o: ['.KK.', 'K..K', 'K..K', '.KK.'], flat: ['KKKK'], wavy: ['K.K.K', '.K.K.'], yawn: ['.KKK.', 'KRRRK', 'KRRRK', '.KKK.'] }
const FCOL = { W: '#ffffff', K: INK, H: '#ff4f86', R: '#ff8fa0' }
function drawMoon(x, t, cx, cy, r, { eyes = 'open', mouth = 'smile', look = [0, 0], blush = 0, rot = 0, sq = 0, alpha = 1 } = {}) {
  if (r <= 1 || alpha <= 0.01) return
  const N = 12, c = r / N
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(1 + sq, 1 - sq * 0.9)
  for (let j = -N - 1; j <= N; j++) for (let i = -N - 1; i <= N; i++) {
    const u = i + 0.5, v = j + 0.5, d = Math.hypot(u, v)
    let col = null
    if (d < N) {
      col = MC.body
      if (u + v > N * 0.55) col = MC.shade
      for (const [a, b, s] of CRATERS) { const e = Math.hypot(u - a, v - b); if (e < s) col = e > s - 0.8 ? MC.shade : MC.crater }
      if (d > N - 1.1 && u + v < -N * 0.4) col = MC.rim
    } else if (d < N + 1) col = INK
    if (col) { x.fillStyle = col; x.fillRect(i * c, j * c, c + 0.5, c + 0.5) }
  }
  // face
  if (eyes === 'open' || eyes === 'wide') { const ph = (t * 0.31 + 0.6) % 1; if (ph < 0.04) eyes = 'shut' }
  const L = eyes === 'wink' ? 'happy' : eyes, R = eyes === 'wink' ? 'open' : eyes
  const ec = c * 1.15, ey = -c * 1.5, dx = c * 4.4
  drawBits(x, eyeBM(L, look[0], look[1]), FCOL, -dx, ey, ec, { outline: null })
  drawBits(x, eyeBM(R, look[0], look[1]), FCOL, dx, ey, ec, { outline: null })
  if (blush > 0) for (const s of [-1, 1]) { x.fillStyle = `rgba(255,120,150,${(0.7 * blush).toFixed(3)})`; x.fillRect(s * dx - c * 1.6, ey + c * 3, c * 3.2, c * 1.3) }
  drawBits(x, MOUTH[mouth], FCOL, 0, ey + c * 5.2, ec, { outline: null })
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A day in the life of… | *the moon.*', { top: 176, size: 84, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, accentColor: '#ffe6a3' })
  const H1 = popText(root, 'Job one: | *hanging around.*', { top: 176, size: 100, accentSize: 132, at: T.h1, gap: 0.1, accentColor: '#c9a6ff' })
  const H2 = popText(root, 'Job two: | *set the mood.*', { top: 176, size: 100, accentSize: 136, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'Job three: | *eavesdropping.*', { top: 176, size: 100, accentSize: 132, at: T.h3, gap: 0.1, accentColor: '#7fd0ff' })
  const H4 = popText(root, 'Clock out? | *never.*', { top: 176, size: 100, accentSize: 140, at: T.h4, gap: 0.1, accentColor: '#ff8fb1' })
  const H5 = popText(root, 'I *glow* | for this.', { top: 176, size: 120, accentSize: 170, at: T.h5, gap: 0.14, wobble: true, accentColor: '#ffe6a3' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const stickers = STICK.map(s => buildSticker(root, s))
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { stamps: STAMPS, at: T.bug + 0.1 })
  const bar = buildProgress(root, { end: STORY_END, marks: STAMPS.slice(1).map(s => s.t), at: T.bug + 0.15 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function speech(t, cx, cy, t0, text, { col = BONE, size = 32, life = 3, tail = 0 } = {}) {
    const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t0 + life - 0.2, t0 + life])
    if (k <= 0.01 || t < t0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 ${size}px ${INTER}`
    const w = x.measureText(text).width + 40, h = size + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(tail - 12, h / 2 + 4, 12, 10); x.fillStyle = col; x.fillRect(tail - 8, h / 2, 8, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }

  // the hill + bench (pixel silhouette)
  function ground(t) {
    const k = clamp(prog(t, 0, 0.6)) * popOut(t, T.out)
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    const C = 12
    for (let i = 0; i < 1080 / C; i++) {
      const top = 1250 + Math.round((18 * Math.sin(i * 0.11) + 10 * Math.sin(i * 0.37 + 1)) / C) * C
      x.fillStyle = INK; x.fillRect(i * C, top - C, C, C)
      x.fillStyle = '#140d2e'; x.fillRect(i * C, top, C, 1920 - top)
      if (i % 7 === 3) { x.fillStyle = '#2b2160'; x.fillRect(i * C, top - 2 * C, C / 2, C) }
    }
    // the bench
    const B = BENCH, c = 10
    x.fillStyle = INK; x.fillRect(B.x - 200 - c, B.y - 60 - c, 400 + 2 * c, 24 + 2 * c)
    x.fillStyle = '#7a4e2e'; x.fillRect(B.x - 200, B.y - 60, 400, 24)
    x.fillStyle = '#9b6a40'; x.fillRect(B.x - 200, B.y - 60, 400, 8)
    for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(B.x + s * 160 - 12, B.y - 40, 24, 50); x.fillStyle = '#5b3a22'; x.fillRect(B.x + s * 160 - 6, B.y - 40, 12, 44) }
    x.restore()
  }

  function moonPose(t) {
    const r0 = ease.outCubic(prog(t, ...T.rise))
    let cx = lerp(820, 790, r0), cy = lerp(1350, 660, r0), r = 150, rot = 0
    const f = { eyes: 'shut', mouth: 'flat', look: [0, 0], blush: 0 }
    if (t > T.yawn[0]) { f.mouth = 'yawn'; f.eyes = 'shut' }
    if (t > T.yawn[1]) { f.mouth = 'smile'; f.eyes = 'open'; f.look = [-1, 1] }
    if (t > 3.4 && t < T.h1) { f.eyes = 'happy'; f.mouth = 'grin' }
    // creeps closer, gets caught, pretends
    if (t >= T.h1 - 0.1) {
      const c = ease.inOutCubic(prog(t, ...T.creep))
      cx = lerp(790, 690, c); cy = lerp(660, 800, c); r = lerp(150, 175, c)
      f.eyes = 'open'; f.mouth = 'smile'; f.look = [-1, 1]
      if (t > T.caught) { f.eyes = 'wide'; f.mouth = 'flat'; f.look = [0, -1] }
      if (t > T.caught + 0.5) { f.eyes = 'happy'; f.mouth = 'wavy'; f.look = [0, 0] }
    }
    // mood lighting: back up a bit, proud
    if (t >= T.h2 - 0.1) {
      const b = ease.inOutCubic(prog(t, T.h2 - 0.1, T.h2 + 0.5))
      cx = lerp(690, 780, b); cy = lerp(800, 640, b); r = lerp(175, 160, b)
      f.eyes = 'open'; f.mouth = 'smile'; f.look = [-1, 1]
      if (t > T.spot[1]) { f.eyes = 'happy'; f.mouth = 'grin'; f.blush = 0.5 }
    }
    // the lean: way down, eyes sideways, listening
    if (t >= T.lean[0]) {
      const l = ease.inOutCubic(prog(t, ...T.lean))
      cx = lerp(780, 860, l); cy = lerp(640, 760, l); r = lerp(160, 175, l); rot = -0.25 * l
      f.eyes = 'open'; f.mouth = 'flat'; f.look = [-1, 1]; f.blush = 0
      if (t > T.gasp) { f.eyes = 'wide'; f.mouth = 'o'; f.look = [-1, 1] }
      if (t > T.melt) { f.eyes = 'heart'; f.mouth = 'grin'; f.blush = 1 }
    }
    // clock out: floats back up, beaming
    if (t >= T.up[0]) {
      const u = ease.inOutCubic(prog(t, ...T.up))
      cx = lerp(860, 740, u); cy = lerp(760, 700, u); r = lerp(175, 165, u); rot = lerp(-0.25, 0, u)
      f.eyes = 'happy'; f.mouth = 'grin'; f.blush = 1
    }
    if (t >= T.h5 - 0.1) { f.eyes = t > T.wink && t < T.wink + 0.9 ? 'wink' : 'happy'; f.mouth = 'grin'; f.blush = 1 }
    const o = popOut(t, T.out)
    return { cx, cy, r: r * o, rot, f, alpha: clamp(o * 3) }
  }

  function glowOf(t) {
    let g = 0.6 + 0.6 * ease.inOutCubic(prog(t, ...T.dim))
    if (t > T.lean[0]) g = 1.0
    if (t > T.h4) g = 1.2 + 0.4 * ease.inOutCubic(prog(t, T.h5, T.h5 + 0.8))
    return g * popOut(t, T.out)
  }

  function couple(t) {
    if (t < T.couple || t > T.out[1]) return
    const ok = popOut(t, T.out)
    const hk = ease.inOutCubic(prog(t, ...T.hands))
    const cX = lerp(CANP.x, 470, hk), sX = lerp(SAGP.x, 610, hk)
    const ck = pop01(t, T.couple, 0.36, 2.1) * ok, sk = pop01(t, T.couple + 0.15, 0.36, 2.1) * ok
    let cm = 'neutral', cl = [1, 0], sm = 'happy', sl = [-1, 0]
    if (t > T.hi2) cm = 'happy'
    if (t > T.caught && t < T.caught + 0.7) { cm = 'wide'; sm = 'wide'; cl = [1, -1]; sl = [1, -1] }
    if (t > T.ask) { sm = 'sparkle'; sl = [-1, 0]; cm = 'happy'; cl = [1, 0] }
    if (t > T.andYou) { sm = 'heart'; cm = 'sparkle' }
    if (t > T.h4) { cm = 'heart'; sm = 'heart'; cl = undefined; sl = undefined }
    if (t > T.h5) { cm = 'happy'; sm = 'happy' }
    drawStarChar(x, cX, CANP.y, CANP.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: cl, hops: CAN_HOPS, pop: ck, seed: 3, glow: 1 })
    drawStarChar(x, sX, SAGP.y, SAGP.s, t, { color: SAG.color, glyph: SAG.glyph, mood: sm, look: sl, hops: SAG_HOPS, pop: sk, seed: 8, glow: 1 })
    // holding hands: two little pixel hands meeting
    if (hk > 0.5) drawBits(x, ['AA.BB', 'AAABB', '.AAB.'], { A: CAN.color, B: SAG.color }, (cX + sX) / 2, CANP.y + 20, 8, { alpha: clamp((hk - 0.5) * 2) * ok })
    speech(t, CANP.x - 30, 960, T.hi1, 'hi.', { life: 1.6, tail: 10 })
    speech(t, SAGP.x + 30, 960, T.hi2, 'hi!', { life: 1.4, tail: -10 })
    speech(t, 560, 930, T.ask, 'best part of tonight?', { life: 2.7, tail: -60 })
    speech(t, 400, 1005, T.ans, 'honestly? the moon.', { life: 1.9, tail: 60 })
    speech(t, 400, 1005, T.andYou, '…and you.', { life: 1.6, tail: 30, col: '#ffd3e2' })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const dim = 1 - 0.45 * ease.inOutCubic(prog(t, ...T.dim)) + 0.25 * ease.inOutCubic(prog(t, T.h4, T.h4 + 1))
      const stars = 1 - 0.65 * ease.inOutCubic(prog(t, ...T.dim)) + 0.5 * ease.inOutCubic(prog(t, T.h4, T.h4 + 1))
      drawSky(x, t, { ...SKY_H, moon: null, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss), dim: SKY_H.dim * dim, stars })
      drawWash(x, t, { warm: clamp(prog(t, 0.2, 1.2)) * popOut(t, T.out) })
      const hh = handheld(t)
      x.save(); x.translate(540 + hh.dx, 960 + hh.dy); x.rotate(hh.rot); x.translate(-540, -960)
      if (t < T.out[1] + 0.02) {
        const M = moonPose(t), g = glowOf(t)
        // moon glow
        if (g > 0 && M.r > 2) {
          x.save(); x.globalCompositeOperation = 'lighter'
          const gr = x.createRadialGradient(M.cx, M.cy, M.r * 0.8, M.cx, M.cy, M.r * (2.2 + 0.6 * g))
          gr.addColorStop(0, `rgba(255,236,190,${(0.28 * g).toFixed(3)})`); gr.addColorStop(1, 'rgba(255,236,190,0)')
          x.fillStyle = gr; x.fillRect(0, 0, 1080, 1920); x.restore()
        }
        // the spotlight onto the bench (mood lighting)
        const sp = ease.inOutCubic(prog(t, ...T.spot)) * outK(t, [T.lean[0] - 0.1, T.lean[0] + 0.2]) + ease.inOutCubic(prog(t, T.up[1], T.up[1] + 0.6)) * popOut(t, T.out)
        if (sp > 0.01) {
          x.save(); x.globalCompositeOperation = 'lighter'
          const gr = x.createLinearGradient(M.cx, M.cy, BENCH.x, BENCH.y)
          gr.addColorStop(0, `rgba(255,232,180,${(0.2 * sp).toFixed(3)})`); gr.addColorStop(1, `rgba(255,214,150,${(0.1 * sp).toFixed(3)})`)
          x.fillStyle = gr; x.beginPath(); x.moveTo(M.cx - M.r * 0.5, M.cy); x.lineTo(M.cx + M.r * 0.5, M.cy); x.lineTo(BENCH.x + 300, BENCH.y); x.lineTo(BENCH.x - 300, BENCH.y); x.closePath(); x.fill()
          x.restore()
        }
        // the moon rises from behind the hill: draw before the ground while rising
        const sqM = MOON_HOPS.reduce((a, h) => { const d = t - h; return d > 0 && d < 0.5 ? 0.06 * Math.sin(d * 18) * Math.exp(-d * 6) : a }, 0)
        const mArgs = [x, t, M.cx, M.cy, M.r, { ...M.f, rot: M.rot, sq: sqM, alpha: M.alpha }]
        if (t < T.rise[1]) drawMoon(...mArgs)
        ground(t)
        if (t >= T.rise[1]) drawMoon(...mArgs)
        // listening rings while eavesdropping
        if (t > T.lean[1] && t < T.h4) for (let k = 0; k < 3; k++) { const ph = (t * 0.9 + k / 3) % 1; x.save(); x.globalAlpha = (1 - ph) * 0.8; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.arc(M.cx - M.r * 0.6, M.cy + M.r * 0.6, 40 + ph * 120, Math.PI * 0.55, Math.PI * 1.05); x.stroke(); x.restore() }
        // sweat when caught creeping
        if (t > T.caught && t < T.caught + 1.0) drawBits(x, ['.S.', 'SSS', 'SSS', '.S.'], { S: '#8fe3ff' }, M.cx + M.r * 0.75, M.cy - M.r * 0.7 + 60 * prog(t, T.caught, T.caught + 1), 8, { alpha: 1 - prog(t, T.caught, T.caught + 1) })
        // the stars it dims: little twinkles going out, one by one
        if (t > T.dim[0] - 0.2 && t < T.dim[1] + 0.4) for (let i = 0; i < 6; i++) { const t0 = T.dim[0] + i * 0.15; const a = 1 - prog(t, t0, t0 + 0.25); if (a > 0.01) drawBits(x, ['.X.', 'XXX', '.X.'], { X: '#fffbea' }, 120 + i * 160, 700 + 90 * Math.sin(i * 2.1), 10, { alpha: a, outline: null }) }
        pisces(x, t, { ...PISP, pop: pop01(t, 0.9, 0.36, 2) * popOut(t, T.out) }, t > T.melt ? 3 : t > T.ans ? 2 : 1, t > T.melt ? 'happy' : t > T.gasp ? 'wide' : 'sparkle', [1, -0.5])
        couple(t)
        if (t > T.hands[0]) hearts(x, t, 540, 1000, T.hands[0], { n: 8, life: 3, spread: 300, alpha: popOut(t, T.out) })
        if (t > T.melt && t < T.melt + 0.8) sparkles(x, t, M.cx, M.cy, T.melt, 10, M.r * 1.3, 2, ['#ff8fb1', BONE, GOLD])
        if (t > T.wink && t < T.wink + 0.8) sparkles(x, t, M.cx, M.cy, T.wink, 12, M.r * 1.4, 3, ['#ffe6a3', BONE, GOLD])
      }
      x.restore()
      box1.update(t); box2.update(t)
      for (const s of stickers) s.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut)); bar.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.4, between "set the mood" and "eavesdropping")
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.bug + 0.16, 0.03],
  ['riser', T.rise[0], T.rise[1], 0.025], ['pluck', T.yawn[0], 330, 0.035, 0.9, 0.3], ['pluck', T.yawn[0] + 0.25, 262, 0.03, 0.9, 0.3], ['pop', T.yawn[1], 987.77, 0.035, 0.3],
  // hanging around
  ...wordPops(T.h1, 4, 0.1, 2, 0.026), ['pop', T.couple + 0.05, 659.25, 0.04, -0.2], ['pop', T.couple + 0.2, 880, 0.04, 0.2],
  ['pop', T.hi1, 880, 0.035, -0.2], ['pop', T.hi2, 1174.66, 0.035, 0.2],
  ['riser', T.creep[0], T.caught, 0.018], ['pluck', T.caught, 1567.98, 0.04, 0.3, 0.4], ['pluck', T.caught + 0.12, 1318.51, 0.035, 0.3, 0.4],
  // set the mood
  ...wordPops(T.h2, 4, 0.1, 1, 0.026), ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.dim[0] + i * 0.15).toFixed(3), 1318.51 - i * 90, 0.02, -0.6 + i * 0.24]),
  ['riser', T.spot[0], T.spot[1], 0.025], ['bell', T.spot[1], 1760, 0.03, 1.1, 0], ['glitter', T.spot[1], T.spot[1] + 0.5],
  // eavesdropping
  ...wordPops(T.h3, 3, 0.1, 3, 0.026), ['whoosh', T.lean[0], 0.4, 0.03],
  ['pop', T.ask, 1174.66, 0.035, 0.2], ['pop', T.ans, 880, 0.035, -0.2], ['pop', T.gasp, 1567.98, 0.05, 0.3], ['pop', T.gasp + 0.07, 1975.53, 0.035, 0.3],
  ['pop', T.andYou, 987.77, 0.035, -0.2], ['pluck', T.melt, 1174.66, 0.045, 0.6, 0.3], ['pluck', T.melt + 0.12, 1567.98, 0.04, 0.6, 0.3], ['glitter', T.melt, T.melt + 0.5],
  // clock out? never
  ...wordPops(T.h4, 3, 0.1, 0, 0.026), ['whoosh', T.up[0], 0.4, 0.03], ['bell', T.hands[1], 1760, 0.03, 1.0, 0], ['glitter', T.hands[1], T.hands[1] + 0.6],
  // I glow for this
  ...wordPops(T.h5, 4, 0.14, 2, 0.03), ['riser', T.h5, T.h5 + 0.8, 0.02], ['pop', T.wink, 1567.98, 0.045, 0.2], ['bell', T.wink + 0.05, 2349.32, 0.025, 1.0, 0.2], ['glitter', T.wink, T.wink + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...clockCues(STAMPS), ...STICK.flatMap((s, i) => stickerCue(s.at, i)),
  ...talkCues(LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
