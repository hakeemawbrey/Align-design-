// st9piscesam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E56 · Pisces 1/5 MORNING) · story 0–17.6, end card.
//   HOOK   "POV: a Pisces wakes up *still* in the dream."  Frame 0: the bedroom at dawn, Pisces upright but eyes shut, a dream
//          bubble over its head (a whale), the two cats (season 4) staring at it.
//   3.6    the kitchen: dream bubbles drift through the room (a whale, a castle, a cake, a flying cat) while Pisces
//          sleep-pours the kettle into the hanging plant. The orange cat looks at the camera.
//   7.6    the phone alarm: 7:30 · DRINK WATER. PISCES: "i was a whale. a *kind* whale."
//   11.4   the window seat, the sea outside. ★ REAL SKY: Neptune, Pisces's modern ruler, was found in 1846.
//   14.6   frame 0's framing again: eyes open now, a glass of water in hand, one small bubble left (the whale, waving).
//          Last line: "Dream, then drink *water.*"
//   Rewatch bait: the fridge note already says "drink water ♡"; the flying cat in the dream is the grey cat.
//   Ghost: rising out of the kitchen counter behind the kettle.
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
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, DAY_FONTS } from '../../st9day.js'
import { drawPiscesHome } from '../../st9pisceshome.js'

export const DURATION = 22
const SIGN = 'pisces', EPI = 0, NUMERAL = 'S9 E56', KEY = 'D'
const HOME = drawPiscesHome
const GOLD = '#f2c75c', PC = '#b9b3ff'
const BATTERY = [0.94, 0.88]
const PIN = '♓ PISCES'
const PITCH = { [PIN]: 880 }

const HOOK = { text: 'POV: a Pisces wakes up *still* in the dream.', out: 3.35, color: PC }
const HOURS = [[0, 6.8], [3.6, 7.1], [7.6, 7.5], [11.4, 7.7], [14.6, 7.8], [17.6, 7.9]]
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1.02, 560, 880], warm: 1 },
  { at: 3.6, room: 'kitchen', cam: [1.05, 540, 960], warm: 0.6 },
  { at: 7.6, room: 'kitchen', cam: [1.3, 560, 1000], warm: 0.5 },
  { at: 11.4, room: 'window', cam: [1.05, 540, 980], warm: 0.4 },
  { at: 14.6, room: 'bedroom', cam: [1.02, 560, 880], warm: 0.5 },
]
const PUNCH = [
  { at: 1.8, dur: 1.3, z: 0.12, x: 640, y: 940 },
  { at: 5.6, dur: 1.4, z: 0.3, x: 560, y: 760 },
  { at: 12.6, dur: 1.4, z: 0.12, x: 540, y: 1040 },
]
const CLOCK = [
  { from: '6:51', to: '6:51', at: -2, dur: 1 },
  { from: '6:51', to: '7:14', at: 3.6, dur: 0.6 },
  { from: '7:14', to: '7:30', at: 7.6, dur: 0.5 },
  { from: '7:30', to: '7:42', at: 11.4, dur: 0.5 },
  { from: '7:42', to: '7:50', at: 14.6, dur: 0.4 },
]
const STAMPS = [
  { at: 0.8, out: 3.3, time: '6:51 AM', text: 'awake. technically.', accentColor: PC },
  { at: 4.0, out: 7.45, time: '7:14 AM', text: 'watering the plant. with *tea.*', accentColor: PC },
  { at: 11.8, out: 14.4, time: '7:42 AM', text: 'the sea is *also* dreaming.', accentColor: PC },
]
const LINES = [{ t: 9.6, speaker: PIN, text: 'i was a whale. a *kind* whale.', color: PC }]
const BOX = { open: 9.4, close: 11.3 + 0.1 }
const FACTS = [{ text: 'Neptune, Pisces’s modern ruler, was found in 1846.', at: 11.6, dur: 2.7, y: 318, color: PC }]
const LAST = { at: 14.85, text: 'Dream, then drink *water.*', color: PC }
export const GHOST = { room: 'kitchen', at: 5.0, x: 560, y: 1080, from: 'below', where: 'rising out of the kitchen counter behind the kettle while the dreams drift by' }
const CUTS = [{ t: 7.6, kind: 'flip' }, { t: 11.4, kind: 'deal' }]

const ALARM = [7.65, 9.35]
const EXTRA_CUES = [
  ['bell', 0.15, 1318.51, 0.02, 1.4, 0], ['glitter', 3.7, 5.2],
  ...[4.2, 4.9, 5.6, 6.3].map((t, i) => ['pop', t, [1046.5, 1174.66, 1318.51, 1567.98][i], 0.02, i % 2 ? 0.3 : -0.3]),
  ...[7.7, 7.95, 8.2, 8.45, 8.7, 8.95].map(t => ['pop', t, 1760, 0.03, 0]), ['pop', ALARM[1] - 0.1, 523.25, 0.04, 0],
  ['pop', 15.0, 1318.51, 0.03, 0],
]

// ── the cast
const PS = signStar('pisces')
const HOPS = [0.2, 1.8, 7.7, ...talkHops(LINES, PIN, { cps: 28 }), 14.65]
function pisces(x, t, X, Y, o = {}) { return drawStarChar(x, X, Y, o.size ?? 290, t, { color: PS.color, glyph: PS.glyph, seed: 12, hops: HOPS, glow: 0.9, ...o }) }
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
// little dream pictures
const PICS = {
  whale: [['..BBBBB...W', '.BBBBBBB.WW', 'BBeBBBBBBB.', 'BBBBBBBBBB.', '.LLLLLLL...'], { B: '#5fa8ff', e: '#120c26', W: '#5fa8ff', L: '#bfe2ff' }],
  castle: [['P.P.P.P', 'PPPPPPP', '.PPPPP.', '.PPDPP.', '.PPDPP.'], { P: '#c9a6ff', D: '#120c26' }],
  cake: [['..F.F..', '..C.C..', 'PPPPPPP', 'WWWWWWW', 'PPPPPPP'], { F: '#ffb45a', C: '#efe6d6', P: '#ff9fb8', W: '#fff3e0' }],
  cat: [['W.....W', 'WWO.O..', '.OOOOO.', 'WOeOeOW', '.OOOOO.', '..O.O..'], { O: '#8a82a8', e: '#120c26', W: '#efe6f8' }],
}
function bubble(x, t, X, Y, r, pic, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k, k)
  x.globalAlpha *= 0.92
  x.fillStyle = 'rgba(239,230,248,0.18)'; x.strokeStyle = '#efe6f8'; x.lineWidth = 6
  x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill(); x.stroke()
  x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(R(-r * 0.55), R(-r * 0.55), 12, 12)
  const [bm, cols] = PICS[pic]
  drawBits(x, bm, cols, 0, 4 * Math.sin(t * 2), r / 7, { outline: '#120c26' })
  x.restore()
}
const DRIFT = [
  { pic: 'whale', x0: 120, y0: 640, sp: 70, r: 90, ph: 0 },
  { pic: 'castle', x0: 960, y0: 520, sp: -55, r: 70, ph: 1 },
  { pic: 'cake', x0: 260, y0: 860, sp: 60, r: 64, ph: 2 },
  { pic: 'cat', x0: 900, y0: 780, sp: -65, r: 76, ph: 3 },
]
/** the kettle, pouring into the hanging plant (Pisces is not awake) */
function kettle(x, t, r) {
  const X = r.x - 150, Y = r.y - 160
  x.save(); x.translate(X, Y); x.rotate(-0.55)
  rect(x, -48, -40, 96, 80, '#120c26'); rect(x, -42, -34, 84, 68, '#5fd6c4'); rect(x, -42, -34, 84, 10, '#a0f0e4'); rect(x, -80, -20, 40, 12, '#120c26'); rect(x, -16, -56, 32, 18, '#120c26')
  x.restore()
  for (let i = 0; i < 8; i++) { const p = ((t * 2 + i / 8) % 1); rect(x, X - 84 - p * 10, Y - 10 + p * 190, 8, 12, 'rgba(180,110,60,0.9)') }
  // the counter plant getting the tea
  rect(x, X - 130, Y + 190, 84, 70, '#120c26'); rect(x, X - 124, Y + 196, 72, 58, '#c96a4a'); drawBits(x, ['G.G.G', '.GGG.', 'GGGGG'], { G: '#7fd68a' }, X - 88, Y + 172, 12)
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i === 0) {
    const r = pisces(x, t, 640, 1180, { mood: 'sleepy', zzz: false, look: [0, 0] })
    bubble(x, t, r.x + 150, r.top - 120, 110, 'whale', 1)
    for (const [bx, by, s] of [[r.x + 40, r.top - 10, 14], [r.x + 80, r.top - 40, 22]]) { x.fillStyle = '#efe6f8'; x.fillRect(R(bx - s / 2), R(by - s / 2), s, s) }
  } else if (i === 1) {
    for (const d of DRIFT) bubble(x, t, d.x0 + d.sp * (t - 3.6) * 1.0, d.y0 + Math.sin(t * 1.4 + d.ph) * 40, d.r, d.pic, 1)
    const r = pisces(x, t, 470, 1000, { mood: 'sleepy', zzz: true, look: [0, 0] })
    kettle(x, t, r)
  } else if (i === 2) {
    pisces(x, t, 470, 1000, { mood: t < 7.7 ? 'sleepy' : t < 9.4 ? 'wide' : 'sparkle', look: [1, 0], blink: t > 7.7 && t < 9.4 ? false : undefined })
    bubble(x, t, 760, 720, 70, 'whale', 1 - ease.inCubic(prog(t, 7.7, 8.1)))
  } else if (i === 3) {
    pisces(x, t, 540, 1080, { mood: 'sparkle', look: [0.6, -1] })
  } else {
    const r = pisces(x, t, 640, 1180, { mood: 'happy', look: [0, 0] })
    bubble(x, t, r.x + 160, r.top - 90, 64, 'whale', easeOutBack(prog(t, 14.7, 15.0), 2))
    // the glass of water
    const gx = r.x - 175, gy = r.y + 10
    rect(x, gx - 34, gy - 50, 68, 100, '#120c26'); rect(x, gx - 28, gy - 44, 56, 88, 'rgba(200,230,255,0.55)'); rect(x, gx - 28, gy - 10, 56, 54, '#7fc8ff'); rect(x, gx - 22, gy - 38, 8, 30, '#ffffff')
  }
}
function overlay(x, t) {
  if (t < ALARM[0] || t > ALARM[1]) return
  const pop = easeOutBack(prog(t, ALARM[0], ALARM[0] + 0.3), 2) * (1 - ease.inCubic(prog(t, ALARM[1] - 0.25, ALARM[1])))
  phoneScreen(x, t, { x: 790, y: 880, w: 360, h: 640, app: 'alarm', lines: [{ text: '7:30', at: ALARM[0], stop: ALARM[1] - 0.3 }, { text: 'DRINK WATER' }], title: 'five more dreams', clock: '7:30', pop: clamp(pop, 0, 1.2), rot: 0.06, accent: '#7c74f0' })
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
