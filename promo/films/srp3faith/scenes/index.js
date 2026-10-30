// srp3faith (20 s vertical Align ad, Star Talk Remix of the P3 "Faith" loop) · story 0–15.6, then the shared end card.
// The loop's image (the opening nebula, a thin waxing crescent, ONE shooting star) becomes that shooting star, with eyes,
// screeching to a halt to take your wish, and politely redirecting it.
//   0.00–2.80  "Make a *wish.*"  The crescent hangs upper-right. A shooting star streaks across… then SCREECHES back,
//              skids to a stop (smoke puffs) and stares at you.
//   2.82–6.00  ☄ SHOOTING STAR: "quick. one wish. I'm on a *schedule*." → YOUR WISH types out in a thought bubble:
//              "make them hot." → slow eye-roll → a FACE LAST stamp slams on it.
//   6.00–11.9  "Wish *again.*"  ☄: "babe. card first. face *last*." → YOUR WISH: "someone who gets me." → sparkle eyes,
//              hearts → ☄: "now THAT we can *deal*." → tonight's deck fans out under it.
//   12.0–15.5  card flip · "Put your wish | in the *stars.*"  The star winks and zooms off, leaving the deck and a trail.
//   15.6→      the end card.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawMoon, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText, pixelPanel } from '../../lesson.js'
import { GOLD, BONE, PINK, INK, SKYB, MONO, BEAT, pop01, outK, popOut, sparkles, floatHearts, stamp, loadImg, drawCard, CROP_BACK } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6

const T = {
  h0: 0.12, h0Land: 0.5, h0Out: [5.82, 6.0],
  streak: [0.35, 0.95], back: [1.1, 1.75], skid: 1.75, stare: 2.1,
  open: 2.62, l1: BEAT(4) + 0.02,
  w1: 4.55, roll: 5.25, stamp1: 5.62, w1Out: [7.6, 7.85],
  h1: 6.06, h1Land: 6.4, l2: 6.12,
  w2: 7.95, spark: 8.95, w2Out: [10.3, 10.55], l3: 9.25, deal: 10.05, close: 11.9, h1Out: [11.76, 11.94],
  cut: 12.0, h2: 12.06, h2Land: 12.6, wink: 13.3, zoom: [14.05, 14.6], out: [15.05, 15.45],
}
const SPEAK = 'SHOOTING STAR'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "quick. one wish. I'm on a *schedule*." },
  { t: T.l2, speaker: SPEAK, text: 'babe. card first. face *last*.' },
  { t: T.l3, speaker: SPEAK, text: 'now THAT we can *deal*.' },
]
const CPS = 30
const WISHES = [{ t: T.w1, out: T.w1Out, text: 'make them hot.' }, { t: T.w2, out: T.w2Out, text: 'someone who gets me.' }]
const WCPS = 18

// ── layout
const STAR_P = { x: 600, y: 850, size: 320 }
const MOON = { x: 850, y: 560, R: 80, p: 0.092 }
const BUB = { x: 470, y: 1170, w: 760, h: 170 }
const FAN = { x: 540, y: 1560, R: 400, n: 5, w: 150 }

const HOPS = [T.stare, ...talkHops(LINES, SPEAK, { cps: CPS }), T.spark]

/** the shooting star's centre + its velocity direction (for the streak) */
function starPos(t) {
  if (t < T.streak[1]) {
    const p = ease.inOutQuad(prog(t, ...T.streak))
    return { x: lerp(-260, 1360, p), y: lerp(560, 780, p), vx: 1, vy: 0.14, speed: t > T.streak[0] ? 1 : 0 }
  }
  if (t < T.back[0]) return { x: 1400, y: 790, vx: 1, vy: 0, speed: 0 }
  if (t < T.skid) {
    const p = ease.outCubic(prog(t, ...T.back))
    return { x: lerp(1360, STAR_P.x, p), y: lerp(800, STAR_P.y, p), vx: -1, vy: 0.02, speed: 1 - p }
  }
  if (t < T.zoom[0]) return { x: STAR_P.x, y: STAR_P.y, vx: 0, vy: 0, speed: 0 }
  const p = ease.inQuad(prog(t, ...T.zoom))
  return { x: lerp(STAR_P.x, 1500, p), y: lerp(STAR_P.y, 300, p), vx: 1, vy: -0.6, speed: p > 0 ? 1 : 0 }
}

function mood(t) {
  if (t < T.skid) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.stare) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.l1) return { mood: 'neutral', look: [0, 0] }
  if (t < T.w1) return { mood: 'happy' }
  if (t < T.roll) return { mood: 'neutral', look: [-1, 1] }                 // reads your wish
  if (t < T.stamp1 + 0.6) return { mood: 'eyeroll' }
  if (t < T.w2) return { mood: 'squint', look: [0, 0] }
  if (t < T.spark) return { mood: 'neutral', look: [-1, 1] }
  if (t < T.deal) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.wink) return { mood: 'happy' }
  if (t < T.wink + 0.5) return { mood: 'wink', look: [0, 0] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 60px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const backIm = await loadImg(A + 'card-back.png')

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Make a *wish.*', { top: 220, size: 136, accentSize: 190, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0Land })
  const H1 = popText(root, 'Wish *again.*', { top: 220, size: 136, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Put your wish | in the *stars.*', { top: 210, size: 116, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  // the wish bubble panel (pixel panel canvas, baked once)
  const panel = document.createElement('canvas'); pixelPanel(panel, BUB.w, BUB.h, { border: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function streak(t, s) {
    if (s.speed <= 0.02) return
    const len = 520 * s.speed, n = Math.hypot(s.vx, s.vy) || 1, ux = s.vx / n, uy = s.vy / n
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(s.x, s.y, s.x - ux * len, s.y - uy * len)
    g.addColorStop(0, `rgba(255,236,180,${0.85 * s.speed})`); g.addColorStop(1, 'rgba(255,200,120,0)')
    x.strokeStyle = g; x.lineCap = 'round'; x.lineWidth = 70 * s.speed + 8
    x.beginPath(); x.moveTo(s.x, s.y); x.lineTo(s.x - ux * len, s.y - uy * len); x.stroke()
    x.restore()
    for (let k = 1; k < 7; k++) drawPixelStar(x, s.x - ux * len * k / 7 + Math.sin(k * 7.3 + t * 9) * 16, s.y - uy * len * k / 7 + Math.cos(k * 5.1 + t * 7) * 16, 22 * (1 - k / 8), k % 2 ? 1 : 2, k % 2 ? GOLD : BONE)
  }

  function puffs(t) {               // skid smoke
    if (t < T.skid - 0.3 || t > T.skid + 0.9) return
    for (let k = 0; k < 6; k++) {
      const born = T.skid - 0.3 + k * 0.08, p = (t - born) / 0.7
      if (p <= 0 || p >= 1) continue
      const r = 26 + 40 * p
      x.save(); x.globalAlpha = 0.55 * (1 - p); x.fillStyle = '#d9cdf0'
      const cx = STAR_P.x + 120 + k * 28 + p * 50, cy = STAR_P.y + 120 - p * 60
      x.fillRect(Math.round(cx - r / 2), Math.round(cy - r / 2), Math.round(r), Math.round(r))
      x.restore()
    }
  }

  function wish(t, w, i) {
    const pin = pop01(t, w.t - 0.2, 0.3, 2.2), out = 1 - ease.inQuad(prog(t, ...w.out))
    if (pin <= 0.01 || out <= 0) return
    const s = pin * lerp(0.9, 1, out)
    x.save(); x.globalAlpha = clamp(out); x.translate(BUB.x, BUB.y); x.scale(s, s)
    // thought dots trailing to the bottom-left (that's you)
    ;[[-330, 150, 22], [-290, 112, 14]].forEach(([dx, dy, r]) => { x.fillStyle = PINK; x.fillRect(dx - r / 2 - 4, dy - r / 2 - 4, r + 8, r + 8); x.fillStyle = 'rgba(16,9,38,0.95)'; x.fillRect(dx - r / 2, dy - r / 2, r, r) })
    x.drawImage(panel, -panel.width / 2, -panel.height / 2)
    x.font = `700 24px ${MONO}`; x.fillStyle = PINK; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('YOUR WISH:', -BUB.w / 2 + 44, -BUB.h / 2 + 48)
    const n = Math.floor(clamp((t - w.t) * WCPS, 0, w.text.length))
    x.font = '800 58px Inter, Arial, sans-serif'; x.fillStyle = BONE
    x.fillText(w.text.slice(0, n) + (n < w.text.length && Math.floor(t * 4) % 2 ? '▌' : ''), -BUB.w / 2 + 44, 26)
    x.restore()
    if (i === 0) stamp(x, t, T.stamp1, BUB.x + 250, BUB.y - 92, 'FACE LAST', { color: '#ff5a6e', size: 50, rot: -0.12, alpha: out })
    if (i === 1 && t > T.spark) { stamp(x, t, T.spark, BUB.x + 300, BUB.y - 92, 'YES', { color: '#7fe0b0', size: 70, rot: 0.1, alpha: out }); sparkles(x, t, BUB.x, BUB.y, T.spark, 12, 330, 3, [GOLD, '#7fe0b0', BONE]) }
  }

  function fan(t) {
    const ok = popOut(t, T.out)
    for (let k = 0; k < FAN.n; k++) {
      const t0 = T.deal + k * 0.1, d = ease.outCubic(prog(t, t0, t0 + 0.35))
      if (d <= 0) continue
      const a = (k - (FAN.n - 1) / 2) * 0.2
      const cx = lerp(STAR_P.x, FAN.x + Math.sin(a) * FAN.R, d), cy = lerp(STAR_P.y, FAN.y - Math.cos(a) * FAN.R, d)
      drawCard(x, backIm, cx, cy, FAN.w * lerp(0.3, 1, d), { rot: a * d, alpha: clamp(d * 2) * clamp(ok), glow: 0.5, crop: CROP_BACK, glowCol: '190,170,255' })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      // P3's slow camera circle, gently
      const cam = { dx: 14 * Math.sin(t * 0.5), dy: 10 * Math.cos(t * 0.5) }
      drawSky(x, t, { ...SKY_H, moon: null, dx: cam.dx, dy: cam.dy })
      drawMoon(x, MOON.x + cam.dx * 1.3, MOON.y + cam.dy * 1.3, MOON.R, MOON.p + 0.03 * prog(t, 0, STORY_END), { glow: 3.0, earthshine: 1, darkAlpha: 0.62, alpha: popOut(t, [15.1, 15.5]) })
      if (t < T.out[1] + 0.02) {
        fan(t)
        WISHES.forEach((w, i) => wish(t, w, i))
        const s = starPos(t)
        streak(t, s)
        puffs(t)
        const skidSq = t > T.skid && t < T.skid + 0.6 ? 0.22 * Math.exp(-(t - T.skid) * 7) * Math.cos((t - T.skid) * 24) : 0
        const lean = s.speed > 0.05 ? -0.25 * s.speed * Math.sign(s.vx) : 0
        x.save(); x.translate(s.x, s.y); x.rotate(lean); x.translate(-s.x, -s.y)
        drawStarChar(x, s.x, s.y, STAR_P.size, t, { color: STAR.sky, ...mood(t), seed: 4, glow: 1.25, squash: skidSq, hops: HOPS, bob: s.speed > 0.05 ? 0 : undefined })
        x.restore()
        if (t > T.spark && t < T.close) floatHearts(x, t, STAR_P.x, STAR_P.y, T.spark, T.l3 + 0.6, 2, 7, 260)
        if (t > T.zoom[1]) { const p = prog(t, T.zoom[1], T.zoom[1] + 0.6); x.save(); x.globalAlpha = 1 - p; drawPixelStar(x, 1040, 340, 60 * (1 - p) + 10, 2, '#fffbe8'); x.restore() }
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cut: the box shuts, the card flips into "Put your wish in the stars." End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const wishTicks = w => Array.from({ length: Math.ceil(w.text.length / 2) }, (_, k) => ['tick', +(w.t + (k * 2) / WCPS).toFixed(3), 0.018])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 880, 0.045, 0],
  // the streak, the screech back, the skid
  ['whoosh', T.streak[0] + 0.1, 0.6, 0.07], ['bell', T.streak[0] + 0.3, 2349.32, 0.02, 1.2, 0.5],
  ['whoosh', T.back[0], 0.5, 0.06], ['pluck', T.back[0] + 0.05, 1318.51, 0.03, 0.3, 0.5], ['pluck', T.back[0] + 0.15, 987.77, 0.03, 0.3, 0.3], ['pluck', T.back[0] + 0.25, 739.99, 0.03, 0.3, 0.1],
  ['boom', T.skid, 0.1], ['tick', T.skid, 0.06], ['tick', T.skid + 0.1, 0.04], ['pop', T.stare, 659.25, 0.04, 0],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // wish 1: typed, eye-roll, stamp
  ['pop', T.w1 - 0.15, 987.77, 0.035, -0.3], ...wishTicks(WISHES[0]),
  ['pluck', T.roll, 329.63, 0.035, 0.5, 0.2], ['pluck', T.roll + 0.18, 277.18, 0.035, 0.5, 0.2],
  ['boom', T.stamp1, 0.16], ['tick', T.stamp1, 0.08],
  ...wordPops(T.h1, 1, 0.07, 2, 0.025), ['pop', T.h1Land, 987.77, 0.05, 0],
  // wish 2: typed, approved, sparkle
  ['pop', T.w2 - 0.15, 987.77, 0.035, -0.3], ...wishTicks(WISHES[1]),
  ['pluck', T.spark, 880, 0.045, 0.5, 0], ['pluck', T.spark + 0.1, 1108.73, 0.045, 0.5, 0], ['pluck', T.spark + 0.2, 1318.51, 0.045, 0.6, 0], ['glitter', T.spark, T.spark + 0.6],
  // tonight's deck fans out
  ...Array.from({ length: FAN.n }, (_, k) => ['whoosh', T.deal + k * 0.1, 0.2, 0.03]), ...Array.from({ length: FAN.n }, (_, k) => ['tick', T.deal + k * 0.1 + 0.3, 0.05]),
  ['bell', T.deal + 0.7, 1760, 0.025, 1.4, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 659.25, 0.03, 0],
  ...wordPops(T.h2, 4, 0.07, 0, 0.025), ['pop', T.h2Land, 880, 0.055, 0], ['pluck', T.h2Land, 659.25, 0.05, 0.7, 0],
  ['pluck', T.wink, 1318.51, 0.035, 0.5, 0.2],
  ['whoosh', T.zoom[0], 0.6, 0.07], ['bell', T.zoom[1], 2349.32, 0.022, 1.4, 0.5],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
