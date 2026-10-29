// st9aqualove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E53 · Aquarius 3/5 DATE NIGHT) · story 0–25.6, end card.
//   HOOK   "How an Aquarius flirts: 40 minutes about *space*."  Frame 0: the window at night, Aquarius mid-lecture with a
//          pointer at the sky (the slides start once the hook clears), Leo (its fiancé since season 5, crown on) already heart-eyed.
//   3.8    the slides keep coming: THE PLEIADES · COMETS · "WHY IS SPACE DARK?". AQUARIUS: "and that's slide *seventeen.*"
//   8.0    the clock fast-forwards 8:02 → 8:42. LEO: "keep going. i'm *obsessed.*"  Aquarius goes wide-eyed.
//   12.4   AQUARIUS: "most people leave at slide *three.*"  LEO: "i'm not most *people.*"
//          ★ ASTROLOGY SAYS: Aquarius is an air sign, despite the water-bearer.
//   17.0   the desk: Aquarius hands Leo a marker; Leo draws a heart on THEORY #49 ("leo + me = sun + sideways planet ✓").
//   21.0   frame 0's framing again: now LEO is at the telescope and Aquarius is the heart-eyed one.
//          Last line: "Let them in the *lab.*"
//   Rewatch bait: slide 40 / 40 is just "LEO." and a heart.  Ghost: rising behind the window-seat curtain (left).
import { lerp, prog, ease, clamp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawAquaHome, drawAquaHeadphones } from '../../st9aquahome.js'

export const DURATION = 30
const SIGN = 'aqua', EPI = 2, NUMERAL = 'S9 E53', KEY = 'Em'
const HOME = drawAquaHome
const GOLD = '#f2c75c', CY = '#7fe3ff', LEOC = '#ffb45a'
const BATTERY = [0.55, 0.42]
const AQN = '♒ AQUARIUS', LEON = '♌ LEO'
const PITCH = { [AQN]: 987.77, [LEON]: 659.25 }

const HOOK = { text: 'How an Aquarius flirts: 40 minutes about *space.*', out: 3.6, color: CY }
const HOURS = [[0, 20], [8, 20.1], [8.7, 20.7], [17, 20.9], [25.6, 21]]
const SHOTS = [
  { at: 0, room: 'window', cam: [1.14, 545, 960] },
  { at: 3.8, room: 'window', cam: [1.3, 420, 1000] },
  { at: 8.0, room: 'window', cam: [1.3, 590, 1000] },
  { at: 12.4, room: 'window', cam: [1.12, 540, 1000] },
  { at: 17.0, room: 'desk', cam: [1, 540, 960], home: { board: ['THEORY #49', 'leo + me =', 'sun + sideways', 'planet ✓'] } },
  { at: 21.0, room: 'window', cam: [1.14, 545, 960] },
]
const PUNCH = [
  { at: 1.9, dur: 1.3, z: 0.1, x: 720, y: 1000 },
  { at: 6.1, dur: 1.3, z: 0.25, x: 420, y: 900 },
  { at: 10.2, dur: 1.2, z: 0.3, x: 400, y: 1040 },
  { at: 19.0, dur: 1.5, z: 0.3, x: 470, y: 760 },
]
const CLOCK = [
  { from: '8:02', to: '8:02', at: -2, dur: 1, ampm: 'PM' },
  { from: '8:02', to: '8:42', at: 8.0, dur: 1.0, ampm: 'PM' },
  { from: '8:42', to: '8:58', at: 17.0, dur: 0.6, ampm: 'PM' },
  { from: '8:58', to: '9:05', at: 21.0, dur: 0.4, ampm: 'PM' },
]
const STAMPS = [
  { at: 0.8, out: 3.55, time: '8:02 PM', text: 'date night. i brought *slides.*', accentColor: CY },
  { at: 17.4, out: 20.8, time: '8:58 PM', text: 'gave leo a *marker.*', accentColor: CY },
]
const LINES = [
  { t: 4.1, speaker: AQN, text: 'and that’s slide *seventeen.*', color: CY },
  { t: 8.9, speaker: LEON, text: 'keep going. i’m *obsessed.*', color: LEOC },
  { t: 12.6, speaker: AQN, text: 'most people leave at slide *three.*', color: CY },
  { t: 14.7, speaker: LEON, text: 'i’m not most *people.*', color: LEOC },
]
const BOX = { open: 3.9, close: 16.8 }
const FACTS = [{ text: 'Aquarius is an air sign, despite the water-bearer.', at: 12.7, dur: 4.0, y: 318, label: '★ ASTROLOGY SAYS', color: CY }]
const LAST = { at: 21.6, text: 'Let them in the *lab.*', color: CY }
export const GHOST = { room: 'window', at: 13.4, x: 110, y: 820, from: 'left', where: 'leaning out from behind the left curtain at the window, while Leo says "i’m not most people"' }
const CUTS = [{ t: 8.0, kind: 'flip' }, { t: 17.0, kind: 'deal' }, { t: 21.0, kind: 'flip' }]

// ── the slides (screen space, top): a projector card that flips through the lecture
const SLIDES = [
  { at: 0, n: 1, title: 'SPACE: AN OVERVIEW', pic: 'galaxy' },
  { at: 4.0, n: 9, title: 'THE PLEIADES', pic: 'cluster' },
  { at: 5.2, n: 13, title: 'COMETS: A TAIL', pic: 'comet' },
  { at: 6.3, n: 17, title: 'WHY IS SPACE DARK?', pic: 'dark' },
  { at: 9.6, n: 29, title: 'MY FAVOURITE MOONS', pic: 'moons' },
  { at: 11.0, n: 40, title: 'LEO.', pic: 'heart' },
]
const SLIDE_OUT = 12.3
const EXTRA_CUES = [
  ...SLIDES.filter(s => s.at > 0).flatMap(s => [['tick', s.at, 0.04], ['pop', s.at + 0.03, 783.99, 0.025, 0.3]]),
  ['whoosh', SLIDE_OUT - 0.15, 0.25, 0.02],
  ['glitter', 15.0, 16.0], ['bell', 15.2, 1567.98, 0.025, 1, 0],
  ['pop', 19.0, 1046.5, 0.04, 0], ['glitter', 19.05, 19.8],
]

// ── the cast
const AQ = signStar('aquarius'), LEO = signStar('leo')
const AQ_HOPS = [0.15, 1.9, ...talkHops(LINES, AQN, { cps: 28 }), 8.05, 19.0, 21.1]
const LEO_HOPS = [0.4, ...talkHops(LINES, LEON, { cps: 28 }), 15.0, 19.05, 21.2]
function aqua(x, t, X, Y, o = {}) {
  const size = o.size ?? 290
  const r = drawStarChar(x, X, Y, size, t, { color: AQ.color, glyph: AQ.glyph, seed: 11, hops: AQ_HOPS, glow: 0.8, ...o })
  drawAquaHeadphones(x, r, size, { k: o.phones ?? 1 })
  return r
}
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
function leo(x, t, X, Y, o = {}) {
  const size = o.size ?? 280
  const r = drawStarChar(x, X, Y, size, t, { color: LEO.color, glyph: LEO.glyph, seed: 5, hops: LEO_HOPS, glow: 0.8, ...o })
  drawBits(x, CROWN, CROWN_C, Math.round(r.x), Math.round(r.top + 4), size / 45, { rot: -0.16 + 0.04 * Math.sin(t * 3) })
  return r
}
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }
function floatHearts(x, t, cx, cy, seed) {
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.7 + i / 3 + seed * 0.13) % 1)
    drawBits(x, HEART, HEART_C, Math.round(cx + Math.sin(p * 7 + i * 2) * 30 + (i - 1) * 30), Math.round(cy - p * 130), 5, { alpha: Math.sin(Math.PI * p) })
  }
}
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
/** the pointer stick */
function pointer(x, r, ang) {
  x.save(); x.translate(r.x + 90, r.y - 10); x.rotate(ang)
  x.fillStyle = '#120c26'; x.fillRect(-4, -170, 10, 172); x.fillStyle = '#c99a4a'; x.fillRect(-1, -166, 4, 164); x.fillStyle = '#ff6f9f'; x.fillRect(-4, -176, 10, 12)
  x.restore()
}
/** the marker heart Leo draws on the whiteboard */
function boardHeart(x, t, t0) {
  const p = prog(t, t0, t0 + 0.9)
  if (p <= 0) return
  x.save(); x.strokeStyle = '#ff4f86'; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath()
  const N = Math.floor(60 * p)
  for (let i = 0; i <= N; i++) {
    const a = i / 60 * Math.PI * 2, hx = 16 * Math.pow(Math.sin(a), 3), hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))
    const X = 470 + hx * 3.4, Y = 700 + hy * 3.4
    i ? x.lineTo(X, Y) : x.moveTo(X, Y)
  }
  x.stroke(); x.restore()
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i <= 3 || i === 5) {
    const late = i === 5
    const ra = aqua(x, t, late ? 330 : 380, 1090, {
      mood: late ? 'heart' : i === 2 ? (t < 10.2 ? 'neutral' : 'wide') : i === 3 ? (t < 14.7 ? 'neutral' : 'sparkle') : 'happy',
      look: late ? [1, -0.4] : i === 3 ? [1, 0.3] : [0.3, -1], blink: i === 2 && t > 10.2 ? false : undefined,
    })
    if (!late) pointer(x, ra, -0.5 + 0.12 * Math.sin(t * 5))
    const rl = leo(x, t, late ? 760 : 720, 1100, { mood: late ? 'sparkle' : i === 3 && t < 14.7 ? 'happy' : 'heart', look: late ? [1, -1] : [-1, -0.2] })
    if (!late) floatHearts(x, t, rl.x, rl.top, 5)
    else floatHearts(x, t, ra.x, ra.top, 2)
  } else {
    boardHeart(x, t, 19.0)
    aqua(x, t, 280, 1180, { mood: 'happy', look: [1, -0.2], size: 270 })
    const rl = leo(x, t, 790, 1180, { mood: t < 19 ? 'wide' : 'happy', look: [-1, -1], size: 260 })
    // the marker in Leo's hand
    x.save(); x.translate(rl.x - 120, rl.y - 20); x.rotate(-0.7); rect(x, -8, -40, 16, 60, '#120c26'); rect(x, -4, -36, 8, 40, '#efe6d6'); rect(x, -4, -46, 8, 10, '#ff4f86'); x.restore()
  }
}
function slidePic(x, pic, X, Y, t) {
  const star = (sx, sy, s, c = '#efe6d6') => rect(x, X + sx - s / 2, Y + sy - s / 2, s, s, c)
  if (pic === 'galaxy') { for (let i = 0; i < 40; i++) { const a = i * 0.5, d = 4 + i * 1.6; star(Math.cos(a) * d * 1.4, Math.sin(a) * d * 0.6, 6, i % 3 ? '#c9a6ff' : '#efe6d6') } }
  if (pic === 'cluster') [[-30, -10], [-10, -24], [8, -6], [26, -20], [-18, 12], [14, 16], [34, 6]].forEach(([a, b]) => star(a * 1.3, b * 1.3, 10, '#bfe2ff'))
  if (pic === 'comet') { star(30, -16, 16, '#e8fbff'); for (let i = 1; i < 10; i++) star(30 - i * 9, -16 + i * 4, 12 - i, '#7fe3ff') }
  if (pic === 'dark') { rect(x, X - 60, Y - 34, 120, 68, '#05040c'); x.save(); x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#efe6d6'; x.fillText('?', X, Y); x.restore() }
  if (pic === 'moons') { star(0, 0, 34, '#d6c7a8'); star(-50, -14, 12); star(46, 10, 14); star(30, -30, 8) }
  if (pic === 'heart') drawBits(x, HEART, HEART_C, X, Y + 4 * Math.sin(t * 4), 12)
}
function overlay(x, t) {
  if (t > SLIDE_OUT) return
  let s = SLIDES[0]; for (const v of SLIDES) if (t >= v.at) s = v
  if (t < HOOK.out - 0.1) return                       // the hook owns the top of frame 0; the slide sits in the scene there
  const k = easeOutBack(prog(t, HOOK.out - 0.1, HOOK.out + 0.25), 2) * (1 - ease.inCubic(prog(t, SLIDE_OUT - 0.3, SLIDE_OUT)))
  const flip = 1 - Math.min(1, (t - s.at) / 0.18)
  x.save(); x.translate(540, 470); x.scale(k * (1 - 0.9 * flip * (s.at > 0 ? 1 : 0)), k)
  rect(x, -330, -130, 660, 260, '#120c26'); rect(x, -322, -122, 644, 244, '#efe6d6'); rect(x, -314, -114, 628, 228, '#1b1640')
  x.font = "700 24px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#7fe3ff'
  x.fillText(`SLIDE ${s.n} / 40`, -290, -80)
  x.font = "800 40px Inter"; x.fillStyle = '#efe6d6'; x.fillText(s.title, -290, -26)
  slidePic(x, s.pic, 170, 50, t)
  x.restore()
}

// ═══════════════════════════════════════ the vlog engine (the same block in all ten Aquarius + Pisces episodes)
// Reads the episode's tables above: SIGN, HOME, EPI, NUMERAL, KEY, HOOK, HOURS, SHOTS, PUNCH, CLOCK, STAMPS, LINES, BOX,
// FACTS, LAST, GHOST, CUTS, EXTRA_CUES, and its scene(x, t, shot) / overlay(x, t, shot) painters.
const STORY_END = DURATION - ENDCARD_LEN
const CPS = 28
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
/** piecewise ease between [t, v] keys */
function pw(keys, t) {
  if (t <= keys[0][0]) return keys[0][1]
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; return lerp(va, vb, ease.inOutQuad(prog(t, a, b))) }
  return keys[keys.length - 1][1]
}
const shotAt = t => { let s = SHOTS[0]; for (const sh of SHOTS) if (t >= sh.at) s = sh; return s }
const nextAt = sh => { const i = SHOTS.indexOf(sh); return i < SHOTS.length - 1 ? SHOTS[i + 1].at : STORY_END }
/** the shot's camera ([zoom, cx, cy] + a slow push-in) times any punch-ins */
function applyCam(x, t, sh) {
  let [z, cx, cy] = typeof sh.cam === 'function' ? sh.cam(t) : sh.cam
  z *= 1 + (sh.push ?? 0.04) * prog(t, sh.at, nextAt(sh))
  for (const p of PUNCH) {
    const k = ease.outCubic(prog(t, p.at, p.at + 0.16)) * (1 - ease.inOutQuad(prog(t, p.at + p.dur - 0.3, p.at + p.dur)))
    if (k <= 0) continue
    const sh2 = Math.sin((t - p.at) * 70) * 5 * (1 - prog(t, p.at, p.at + 0.25))
    z *= 1 + p.z * k; cx = lerp(cx, p.x, k) + sh2; cy = lerp(cy, p.y, k)
  }
  x.translate(540, 960); x.scale(z, z); x.translate(-cx, -cy)
}
const clockAt = t => { let c = CLOCK[0]; for (const s of CLOCK) if (t >= s.at - 0.6) c = s; return c }
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 112px Inter", "italic 500 176px 'EB Garamond'", "700 52px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  if (typeof PRELOAD === 'function') await PRELOAD()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: HOOK.text, at: 0, out: HOOK.out, top: HOOK.top ?? 262, size: HOOK.size ?? 92, accentSize: HOOK.accentSize ?? 132, accentColor: HOOK.color ?? GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, s))
  const boxes = (Array.isArray(BOX) ? BOX : [{ ...BOX, from: 0, to: LINES.length }]).filter(b => b.to > b.from).map(b => dialogueBox(root, { lines: LINES.slice(b.from, b.to), y: b.y ?? 1440, width: 960, height: b.h ?? 270, open: b.open, close: b.close, cps: CPS }))
  const last = popText(root, LAST.text, { top: LAST.top ?? 300, size: LAST.size ?? 112, accentSize: LAST.accentSize ?? 176, at: LAST.at, gap: 0.08, accentColor: LAST.color ?? GOLD, wobble: true, late: 1, lateAt: LAST.at + 0.4, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sh = shotAt(t)
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: pw(HOURS, t) })
      x.save(); applyCam(x, t, sh)
      HOME(x, t, { room: sh.room, ep: EPI, dark: sh.dark ?? 0, warm: sh.warm ?? 0, ...(typeof sh.home === 'function' ? sh.home(t) : sh.home || {}) })
      if (GHOST.room === sh.room) drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: GHOST.from, cell: 3 })
      scene(x, t, sh)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.42 })
      overlay(x, t, sh)
      // the cut: a quick white blink + a horizontal smear
      const cp = prog(t, sh.at, sh.at + 0.14)
      if (sh.at > 0 && cp < 1) { x.save(); x.globalAlpha = 0.28 * (1 - cp); x.fillStyle = '#fff8ee'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      drawRecFrame(x, t, { battery: lerp(BATTERY[0], BATTERY[1], prog(t, 0, STORY_END)), time: '00:' + String(Math.floor(t)).padStart(2, '0') })
      const c = clockAt(t)
      drawClock(x, t, { ...c, sign: SIGN, alpha: 1 - prog(t, STORY_END - 0.3, STORY_END) })
      for (const f of FACTS) factChip(x, t, f)
      hook.update(t)
      for (const s of stamps) s.update(t)
      for (const b of boxes) b.update(t)
      last.update(t, outK(t, [STORY_END - 0.35, STORY_END]))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, fadeIn: 0 }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SHOTS.filter(s => s.at > 0).flatMap(s => [['whoosh', r3(s.at - 0.06), 0.24, 0.026], ['tick', r3(s.at), 0.03]]),
  ...PUNCH.flatMap(p => [['whoosh', r3(p.at - 0.03), 0.18, 0.02], ['pop', r3(p.at + 0.04), 1318.51, 0.03, 0]]),
  ...CLOCK.filter(c => c.dur > 0.2 && c.at > 0).flatMap(c => clockCues(c.at, c.dur)),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...FACTS.flatMap(f => factChipCues(f.at, { dur: f.dur })),
  ...(Array.isArray(BOX) ? BOX : [BOX]).map(b => ['pop', r3(b.open ?? LINES[0].t - 0.22), 739.99, 0.035, 0]), ...(LINES.length ? talkCues(LINES, { cps: CPS, pitch: PITCH }) : []),
  ...wordPops(LAST.at, 3, 0.08, 2), ['pop', r3(LAST.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(LAST.at + 0.42), 1567.98, 0.025, 1.2, 0],
  ['tick', r3(GHOST.at + 0.05), 0.015],
  ...EXTRA_CUES,
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
