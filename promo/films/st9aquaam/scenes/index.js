// st9aquaam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E51 · Aquarius 1/5 MORNING) · story 0–17.6, end card.
//   HOOK   "POV: an Aquarius has a new theory *before* coffee."  Frame 0: the bedroom at dawn, Aquarius mid-eureka, a pixel
//          lightbulb already lit over its head, the pink headphones on (season 3).
//   3.6    the desk: the theory whiteboard fills (THEORY #47 · cereal = soup? · pigeons: wifi? · URANUS ⟲ 98°).
//          AQUARIUS: "is cereal soup? the board says *maybe*."  Punch-in on the board.
//   7.4    the kitchen: COFFEE v3, a Rube Goldberg coffee machine, actually works. Heart eyes.
//   11.0   the window: the telescope, and the sideways-ringed Uranus. ★ REAL SKY: Uranus, Aquarius's modern ruler, was
//          discovered in 1781.
//   14.4   the bedroom again (frame 0's framing): the same eureka pose, now with the coffee. Last line: "Weird is *wonderful*."
//   Rewatch bait: the lime glow stickers on the bedroom ceiling are the Aquarius pattern, one more each episode.
//   The ghost peeks out from behind the fridge (9.6). Pure f(t).
import { lerp, prog, ease } from '../../../src/lib.js'
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
import { AQUA, drawAquaHome, drawAquaHeadphones } from '../../st9aquahome.js'

export const DURATION = 22
const SIGN = 'aqua', EPI = 0, NUMERAL = 'S9 E51', KEY = 'Am'
const HOME = drawAquaHome
const GOLD = '#f2c75c'
const BATTERY = [0.95, 0.88]
const AQN = '♒ AQUARIUS'
const PITCH = { [AQN]: 987.77 }

const HOOK = { text: 'POV: an Aquarius has a new theory *before* coffee.', out: 3.35, color: '#7fe3ff' }
const HOURS = [[0, 6.95], [3.6, 7.05], [7.4, 7.1], [8.2, 7.35], [11, 7.45], [14.4, 7.6], [17.6, 7.7]]
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1, 540, 960], warm: 1 },
  { at: 3.6, room: 'desk', cam: [1.16, 430, 900], warm: 0.6, home: t => ({ board: boardAt(t) }) },
  { at: 7.4, room: 'kitchen', cam: [1.12, 420, 960], warm: 0.4 },
  { at: 11.0, room: 'window', cam: [1, 540, 960], warm: 0.3 },
  { at: 14.4, room: 'bedroom', cam: [1, 540, 960], warm: 0.5 },
]
const PUNCH = [
  { at: 1.9, dur: 1.3, z: 0.12, x: 700, y: 1040 },
  { at: 5.85, dur: 1.4, z: 0.38, x: 300, y: 640 },
  { at: 9.25, dur: 1.3, z: 0.25, x: 400, y: 1040 },
  { at: 12.6, dur: 1.4, z: 0.4, x: 800, y: 640 },
]
const CLOCK = [
  { from: '6:58', to: '6:58', at: -2, dur: 1 },
  { from: '6:58', to: '7:04', at: 3.6, dur: 0.6 },
  { from: '7:04', to: '7:21', at: 7.4, dur: 0.8 },
  { from: '7:21', to: '7:30', at: 11.0, dur: 0.5 },
  { from: '7:30', to: '7:40', at: 14.4, dur: 0.5 },
]
const STAMPS = [
  { at: 0.8, out: 3.3, time: '6:58 AM', text: 'eyes open. theory *loading.*', accentColor: '#7fe3ff' },
  { at: 7.9, out: 10.85, time: '7:21 AM', text: 'coffee v3. it *works.*', accentColor: '#7fe3ff' },
  { at: 11.35, out: 14.25, time: '7:30 AM', text: 'checking on my *planet.*', accentColor: '#7fe3ff' },
]
const LINES = [{ t: 4.0, speaker: AQN, text: 'is cereal soup? the board says *maybe.*', color: '#7fe3ff' }]
const BOX = { open: 3.8, close: 7.15 }
const FACTS = [{ text: 'Uranus, Aquarius’s modern ruler, was discovered in 1781.', at: 11.3, dur: 2.9, y: 318, color: '#7fe3ff' }]
const LAST = { at: 14.75, text: 'Weird is | *wonderful.*', color: '#7fe3ff' }
export const GHOST = { room: 'kitchen', at: 8.3, x: 826, y: 900, from: 'right', where: 'peeking out from behind the fridge in the kitchen (the coffee shot)' }
const CUTS = [{ t: 7.4, kind: 'flip' }, { t: 11.0, kind: 'deal' }]
const EXTRA_CUES = [
  ['pluck', 0.12, 1567.98, 0.04, 0.6, 0], ['bell', 14.45, 2093, 0.025, 1, 0], ['pluck', 14.45, 1567.98, 0.04, 0.6, 0],
  ...[4.05, 4.65, 5.2, 5.75].map((t, i) => ['tick', t, 0.03 + 0.005 * i]),
  ['glitter', 8.6, 9.6], ['pop', 9.3, 1318.51, 0.04, -0.3], ['riser', 12.2, 12.6, 0.04],
]

// ── the episode's own drawing
const AQ = signStar('aquarius')
const HOPS = [0.15, 1.9, ...talkHops(LINES, AQN, { cps: 28 }), 7.6, 9.3, 11.2, 14.5]
function aqua(x, t, X, Y, o = {}) {
  const size = o.size ?? 300
  const r = drawStarChar(x, X, Y, size, t, { color: AQ.color, glyph: AQ.glyph, seed: 11, hops: HOPS, glow: 0.8, ...o })
  drawAquaHeadphones(x, r, size, { k: o.phones ?? 0 })
  return r
}
const BULB = ['..YYY..', '.YYYYY.', 'YYWWYYY', 'YYWYYYY', 'YYYYYYY', '.YYYYY.', '..YYY..', '..GGG..', '..ggg..', '...G...']
const BULB_C = { Y: '#ffe27a', W: '#fffbe8', G: '#8fa3c8', g: '#5a6a90' }
function bulb(x, t, X, Y, t0) {
  const k = t0 <= 0 ? 1 : easeOutBack(prog(t, t0, t0 + 0.3), 2.2)
  if (k <= 0) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(X, Y, 0, X, Y, 150); g.addColorStop(0, `rgba(255,226,122,${0.45 * k})`); g.addColorStop(1, 'rgba(255,226,122,0)')
  x.fillStyle = g; x.fillRect(X - 150, Y - 150, 300, 300); x.restore()
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + t * 0.8, d = 74 + 6 * Math.sin(t * 6 + i); x.fillStyle = '#ffe27a'; x.fillRect(Math.round(X + Math.cos(a) * d - 4), Math.round(Y + Math.sin(a) * d - 4), 8, 8) }
  drawBits(x, BULB, BULB_C, X, Y + 8 * Math.sin(t * 3), 11 * k)
}
const MUG = ['.s.s..', 's.s...', 'PPPPP.', 'PHPPPPP', 'PPPPP.P', 'PPPPPPP', 'PPPPP..', '.PPP...']
const MUG_C = { P: AQUA.pink, H: '#ffd1de', s: 'rgba(239,230,214,0.7)' }
const BOARD = ['THEORY #47', 'cereal = soup?', 'pigeons: wifi?', 'uranus tilt: 98°']
function boardAt(t) {
  const starts = [3.6, 4.05, 4.65, 5.2]
  return BOARD.map((s, i) => s.slice(0, Math.max(0, Math.floor((t - starts[i]) * 22)))).map(s => s || ' ')
}
/** Uranus through the window: a pale cyan disc with its ring standing up (it spins tipped on its side) */
function uranus(x, t, X, Y, s = 1) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(X, Y, 0, X, Y, 90 * s); g.addColorStop(0, 'rgba(127,227,255,0.35)'); g.addColorStop(1, 'rgba(127,227,255,0)')
  x.fillStyle = g; x.fillRect(X - 90 * s, Y - 90 * s, 180 * s, 180 * s); x.restore()
  const c = 5 * s
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36) { x.fillStyle = (i + j) < -3 ? '#d6f6ff' : j > 3 ? '#5fb8d8' : '#9fe6f4'; x.fillRect(Math.round(X + i * c), Math.round(Y + j * c), c, c) }
  x.save(); x.strokeStyle = '#e8fbff'; x.lineWidth = 3 * s; x.beginPath(); x.ellipse(X, Y, 14 * s, 62 * s, 0.17, 0, Math.PI * 2); x.stroke(); x.restore()
  x.save(); x.font = `700 ${Math.round(20 * s)}px 'Space Mono', monospace`; x.textAlign = 'center'; x.fillStyle = '#bff1ff'; x.fillText('URANUS', X, Y + 92 * s); x.restore()
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i === 0) {
    const r = aqua(x, t, 700, 1190, { mood: 'wide', look: [0, -1], blink: false })
    bulb(x, t, r.x, r.top - 90, 0)
  } else if (i === 1) {
    aqua(x, t, 690, 1190, { mood: t < 5.85 ? 'squint' : 'sparkle', look: [-1, -1] })
  } else if (i === 2) {
    const r = aqua(x, t, 560, 1000, { mood: t < 9.25 ? 'wide' : 'heart', look: [-1, 0.4], blink: t < 9.25 ? false : undefined })
    void r
  } else if (i === 3) {
    uranus(x, t, 800, 600, 1.1)
    aqua(x, t, 560, 1090, { mood: t < 12.6 ? 'neutral' : 'sparkle', look: [1, -1] })
  } else {
    const r = aqua(x, t, 700, 1190, { mood: 'happy', look: [0, 0] })
    bulb(x, t, r.x, r.top - 90, 14.4)
    drawBits(x, MUG, MUG_C, r.x - 168, r.y + 40 + 4 * Math.sin(t * 2), 12)
  }
}
function overlay() {}

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
