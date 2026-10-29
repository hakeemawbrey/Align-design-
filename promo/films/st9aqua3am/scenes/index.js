// st9aqua3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E55 · Aquarius 5/5 3 AM) · story 0–27.6, end card.
//   HOOK   "An Aquarius at 3 AM, *headphones* on."  Frame 0: the same bedroom, dark; only the lava lamp and the glow
//          stickers (all eight now) light it. Aquarius sits up, headphones on, music notes drifting off.
//   4.0    inside its head: the day's noise (12 chats · meeting at 9 · "did i say it right?") bounces off the headphones.
//          AQUARIUS: "the headphones aren't distance. they're *volume control.*"  (season 6: overwhelm, not distance)
//   9.2    the window: Uranus out there, ring standing up. ★ REAL SKY: Uranus spins tipped on its side.
//          AQUARIUS: "even my planet does things *sideways.*"
//   14.2   the phone lights up: LEO "you up?" · "no pressure. i'm here." The headphones come off.
//   19.4   on the call. LEO: "want me to just stay on the line?"  AQUARIUS: "yeah. you can be *quiet* with me."
//   23.6   frame 0's framing again: headphones round its neck, the call glowing on the pillow (00:14:32), sleepy and calm.
//          Last line: "Different, *and* held."
//   Rewatch bait: the call timer keeps counting under the last line; the whiteboard (seen through nothing: it's dark) — the
//   fridge note today says "you are ok".  Ghost: peeking from behind the window curtain while Uranus is up.
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
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawAquaHome, drawAquaHeadphones } from '../../st9aquahome.js'

export const DURATION = 32
const SIGN = 'aqua', EPI = 4, NUMERAL = 'S9 E55', KEY = 'F#m'
const HOME = drawAquaHome
const GOLD = '#f2c75c', CY = '#7fe3ff', LEOC = '#ffb45a'
const BATTERY = [0.16, 0.12]
const AQN = '♒ AQUARIUS', LEON = '♌ LEO'
const PITCH = { [AQN]: 880, [LEON]: 587.33 }

const HOOK = { text: 'An Aquarius at 3 AM, *headphones* on.', out: 3.8, color: CY }
const HOURS = [[0, 3], [27.6, 3.4]]
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1.06, 640, 1010], dark: 1 },
  { at: 4.0, room: 'bedroom', cam: [1.5, 700, 1060], dark: 1, push: 0.08 },
  { at: 9.2, room: 'window', cam: [1.05, 540, 960], dark: 1 },
  { at: 14.2, room: 'bedroom', cam: [1.3, 700, 1080], dark: 1 },
  { at: 19.4, room: 'bedroom', cam: [1.15, 640, 1040], dark: 1 },
  { at: 23.6, room: 'bedroom', cam: [1.06, 640, 1010], dark: 1 },
]
const PUNCH = [
  { at: 2.0, dur: 1.4, z: 0.08, x: 700, y: 1060 },
  { at: 7.0, dur: 1.4, z: 0.15, x: 700, y: 1000 },
  { at: 11.6, dur: 1.6, z: 0.4, x: 760, y: 600 },
  { at: 16.6, dur: 1.4, z: 0.2, x: 700, y: 1040 },
]
const CLOCK = [
  { from: '3:02', to: '3:02', at: -2, dur: 1, ampm: 'AM' },
  { from: '3:02', to: '3:10', at: 9.2, dur: 0.5, ampm: 'AM' },
  { from: '3:10', to: '3:21', at: 14.2, dur: 0.6, ampm: 'AM' },
  { from: '3:21', to: '3:35', at: 23.6, dur: 0.7, ampm: 'AM' },
]
const STAMPS = [
  { at: 0.8, out: 3.75, time: '3:02 AM', text: 'can’t sleep. *loud* brain.', accentColor: CY },
  { at: 16.8, out: 19.2, time: '3:21 AM', text: 'headphones *off.*', accentColor: CY },
]
const LINES = [
  { t: 4.4, speaker: AQN, text: 'the headphones aren’t distance. they’re *volume control.*', color: CY },
  { t: 9.6, speaker: AQN, text: 'even my planet does things *sideways.*', color: CY },
  { t: 19.6, speaker: LEON, text: 'want me to just stay on the line?', color: LEOC },
  { t: 21.4, speaker: AQN, text: 'yeah. you can be *quiet* with me.', color: CY },
]
const BOX = [{ open: 4.2, close: 13.9, from: 0, to: 2 }, { open: 19.3, close: 23.4, from: 2, to: 4 }]
const FACTS = [{ text: 'Uranus, Aquarius’s modern ruler, spins tipped on its side.', at: 11.8, dur: 2.2, y: 318, color: CY }]
const LAST = { at: 24.0, text: 'Different, *and* held.', color: CY }
export const GHOST = { room: 'window', at: 9.9, x: 1020, y: 900, from: 'right', where: 'peeking out from behind the right curtain at the window while Uranus is up' }
const CUTS = [{ t: 9.2, kind: 'flip' }, { t: 14.2, kind: 'deal' }, { t: 23.6, kind: 'flip' }]

const CHAT = [
  { from: 'LEO', text: 'you up?', at: 14.6 },
  { from: 'LEO', text: 'no pressure. i’m here.', at: 15.6 },
  { from: 'me', text: 'call?', at: 17.6 },
]
const PHONE = [14.3, 18.9]
const NOISE = ['12 chats', 'meeting at 9', 'did i say it right?', 'reply to mom', 'theory #51??', 'too loud']
const EXTRA_CUES = [
  ...phoneCues(CHAT, { app: 'chat' }), ['pop', PHONE[0], 880, 0.04, 0], ['whoosh', PHONE[1] - 0.1, 0.25, 0.02],
  ...NOISE.map((_, i) => ['tick', +(4.3 + i * 0.55).toFixed(2), 0.025]),
  ['pop', 16.75, 523.25, 0.035, 0], ['bell', 18.95, 1318.51, 0.02, 1.4, 0],
  ['bell', 23.7, 1046.5, 0.02, 1.6, 0],
]

// ── the cast
const AQ = signStar('aquarius'), LEO = signStar('leo')
const AQ_HOPS = [0.2, ...talkHops(LINES, AQN, { cps: 28 }), 16.75]
function aqua(x, t, X, Y, o = {}) {
  const size = o.size ?? 300
  const r = drawStarChar(x, X, Y, size, t, { color: AQ.color, glyph: AQ.glyph, seed: 11, hops: AQ_HOPS, glow: 1, bob: 4, ...o })
  drawAquaHeadphones(x, r, size, { k: o.phones ?? 0 })
  return r
}
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
const MNOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function notes(x, t, cx, cy, k = 1) {
  for (let i = 0; i < 3; i++) {
    const p = (t * 0.45 + i / 3) % 1
    drawBits(x, MNOTE, { X: i % 2 ? '#ff8fb1' : '#7fe3ff' }, R(cx + 150 + p * 120 + Math.sin(p * 9 + i) * 14), R(cy - 60 - p * 200), 6, { alpha: Math.sin(Math.PI * p) * k })
  }
}
/** the day's noise, bouncing off the headphones' bubble */
function noise(x, t, cx, cy) {
  const k = prog(t, 4.1, 4.5)
  x.save(); x.globalAlpha = 0.25 * k; x.strokeStyle = '#ff8fb1'; x.lineWidth = 4; x.setLineDash([12, 10])
  x.beginPath(); x.arc(cx, cy, 230 + 6 * Math.sin(t * 5), 0, Math.PI * 2); x.stroke(); x.restore()
  NOISE.forEach((s, i) => {
    const t0 = 4.3 + i * 0.55, p = prog(t, t0, t0 + 1.6)
    if (p <= 0 || p >= 1) return
    const a = i * 1.9 + 0.6, d = p < 0.5 ? lerp(520, 250, p * 2) : lerp(250, 560, (p - 0.5) * 2)
    const X = cx + Math.cos(a) * d, Y = cy + Math.sin(a) * d * 0.8
    x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.font = "700 26px 'Space Mono', monospace"
    const w = x.measureText(s).width + 28
    rect(x, X - w / 2 - 3, Y - 23, w + 6, 46, '#120c26'); rect(x, X - w / 2, Y - 20, w, 40, '#3a2f6a')
    x.fillStyle = '#efe6d6'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y + 1); x.restore()
  })
}
/** Uranus, ring standing up */
function uranus(x, t, X, Y, s = 1) {
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(X, Y, 0, X, Y, 90 * s); g.addColorStop(0, 'rgba(127,227,255,0.4)'); g.addColorStop(1, 'rgba(127,227,255,0)')
  x.fillStyle = g; x.fillRect(X - 90 * s, Y - 90 * s, 180 * s, 180 * s); x.restore()
  const c = 5 * s
  for (let j = -6; j <= 6; j++) for (let i = -6; i <= 6; i++) if (i * i + j * j <= 36) { x.fillStyle = (i + j) < -3 ? '#d6f6ff' : j > 3 ? '#5fb8d8' : '#9fe6f4'; x.fillRect(R(X + i * c), R(Y + j * c), c, c) }
  x.save(); x.strokeStyle = '#e8fbff'; x.lineWidth = 3 * s; x.beginPath(); x.ellipse(X, Y, 14 * s, 62 * s, 0.17 + 0.05 * Math.sin(t), 0, Math.PI * 2); x.stroke(); x.restore()
}
/** the call, on the pillow: a little glowing phone with Leo's star and a timer */
function callPhone(x, t, X, Y, t0, s = 1) {
  const k = easeOutBack(prog(t, t0, t0 + 0.3), 2)
  if (k <= 0) return
  const secs = 14 * 60 + 32 + Math.floor(Math.max(0, t - 23.6)), mins = 3 * 60 + 12 + Math.floor(Math.max(0, t - 19.4))
  const timer = t >= 23.6 ? `00:${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}` : `00:0${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`
  x.save(); x.translate(X, Y); x.scale(k * s, k * s)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 0, 0, 0, 200); g.addColorStop(0, 'rgba(255,180,90,0.35)'); g.addColorStop(1, 'rgba(255,180,90,0)'); x.fillStyle = g; x.fillRect(-200, -200, 400, 400); x.restore()
  rect(x, -66, -110, 132, 220, '#120c26'); rect(x, -58, -102, 116, 204, '#2a1f4a')
  drawStarChar(x, 0, -30, 80, t, { color: LEO.color, mood: 'happy', glow: 0.6, bob: 2, seed: 5 })
  x.font = "700 18px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffb45a'; x.fillText('LEO', 0, 34)
  x.fillStyle = '#efe6d6'; x.fillText(timer, 0, 62)
  rect(x, -18, 80, 36, 12, '#ff3d6e')
  x.restore()
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i === 0) { const r = aqua(x, t, 700, 1190, { mood: 'neutral', look: [0, 1] }); notes(x, t, r.x, r.y) }
  else if (i === 1) { const r = aqua(x, t, 700, 1190, { mood: t < 7 ? 'squint' : 'neutral', look: [0, 0.4] }); noise(x, t, r.x, r.y - 20) }
  else if (i === 2) { uranus(x, t, 760, 600, 1.2); aqua(x, t, 470, 1090, { mood: 'sparkle', look: [1, -1] }) }
  else if (i === 3) aqua(x, t, 700, 1190, { mood: t < 15.6 ? 'wide' : t < 16.75 ? 'neutral' : 'happy', look: [-1, 0.6], phones: ease.inOutCubic(prog(t, 16.75, 17.3)) })
  else if (i === 4) { aqua(x, t, 700, 1190, { mood: t < 21.4 ? 'neutral' : 'happy', look: [-1, 0.3], phones: 1 }); callPhone(x, t, 360, 1060, 19.45, 1) }
  else { callPhone(x, t, 250, 1030, 23.6, 0.75); aqua(x, t, 700, 1190, { mood: 'sleepy', look: [0, 0.4], phones: 1, zzz: true }) }
}
function overlay(x, t) {
  if (t < PHONE[0] || t > PHONE[1]) return
  const pop = easeOutBack(prog(t, PHONE[0], PHONE[0] + 0.35), 2) * (1 - ease.inCubic(prog(t, PHONE[1] - 0.3, PHONE[1])))
  phoneScreen(x, t, { x: 300, y: 860, w: 400, h: 620, lines: CHAT, app: 'chat', title: '♌ leo', clock: '3:18', pop: clamp(pop, 0, 1.2), rot: -0.05, accent: '#38c4ec', glow: 0.9 })
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
  let [z, cx, cy] = sh.cam
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
