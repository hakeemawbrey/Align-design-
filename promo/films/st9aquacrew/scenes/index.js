// st9aquacrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E54 · Aquarius 4/5 THE CREW) · story 0–20.6, end card.
//   HOOK   "An Aquarius is in *every* group chat."  Frame 0: Saturday in the bedroom, Aquarius spinning its phone in a cloud
//          of group-chat bubbles (UFO WATCHERS · SYNTH NERDS · PLANT SWAP · RUN CLUB 6AM …), every one with a red badge.
//   3.6    the phone: the twelve chats ping at once. "2:10 PM — 12 chats. 400 *unread.*"
//   7.6    the kitchen: Gemini and Libra (the air trio) let themselves in with snacks. GEMINI: "you're in 12 chats. who do
//          *you* talk to?"  Aquarius goes wide-eyed. AQUARIUS: "everyone. and nobody *close.*"
//   12.0   LIBRA: "then start a chat of *three.*"  ★ REAL MYTH: in Greek myth, Aquarius is linked to Ganymede, cupbearer
//          of the gods.
//   15.8   the window seat: three friends, one new chat ("air signs ☁ 3"), and frame 0's bubble cloud is down to one.
//          Last line: "Belong *somewhere,* too."
//   Rewatch bait: the fridge note says "call gemini"; one of the twelve chats is "GHOST SIGHTINGS".  Ghost: under the bed.
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

export const DURATION = 25
const SIGN = 'aqua', EPI = 3, NUMERAL = 'S9 E54', KEY = 'Dm'
const HOME = drawAquaHome
const GOLD = '#f2c75c', CY = '#7fe3ff'
const BATTERY = [0.62, 0.5]
const AQN = '♒ AQUARIUS', GEMN = '♊ GEMINI', LIBN = '♎ LIBRA'
const GEMC = '#ffe27a', LIBC = '#ff9ff0'
const PITCH = { [AQN]: 987.77, [GEMN]: 1174.66, [LIBN]: 880 }

const HOOK = { text: 'An Aquarius is in *every* group chat.', out: 3.45, color: CY }
const HOURS = [[0, 14], [3.6, 14.2], [7.6, 15], [15.8, 16.5], [20.6, 16.8]]
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1.06, 600, 1000] },
  { at: 3.6, room: 'bedroom', cam: [1.35, 700, 1080], push: 0.08 },
  { at: 7.6, room: 'kitchen', cam: [1.05, 540, 960] },
  { at: 12.0, room: 'kitchen', cam: [1.25, 540, 1000] },
  { at: 15.8, room: 'window', cam: [1.1, 540, 980] },
]
const PUNCH = [
  { at: 1.8, dur: 1.3, z: 0.1, x: 700, y: 1060 },
  { at: 5.7, dur: 1.4, z: 0.2, x: 700, y: 1060 },
  { at: 10.1, dur: 1.4, z: 0.35, x: 560, y: 980 },
  { at: 17.6, dur: 1.3, z: 0.1, x: 540, y: 1040 },
]
const CLOCK = [
  { from: '2:04', to: '2:04', at: -2, dur: 1, ampm: 'PM' },
  { from: '2:04', to: '2:10', at: 3.6, dur: 0.5, ampm: 'PM' },
  { from: '2:10', to: '3:00', at: 7.6, dur: 0.8, ampm: 'PM' },
  { from: '3:00', to: '4:30', at: 15.8, dur: 0.8, ampm: 'PM' },
]
const STAMPS = [
  { at: 0.8, out: 3.4, time: '2:04 PM', text: 'saturday. *very* online.', accentColor: CY },
  { at: 4.0, out: 7.45, time: '2:10 PM', text: '12 chats. 400 *unread.*', accentColor: CY },
  { at: 16.2, out: 20.35, time: '4:30 PM', text: 'new chat. *three* people.', accentColor: CY },
]
const LINES = [
  { t: 8.0, speaker: GEMN, text: 'you’re in 12 chats. who do *you* talk to?', color: GEMC },
  { t: 10.4, speaker: AQN, text: 'everyone. and nobody *close.*', color: CY },
  { t: 12.4, speaker: LIBN, text: 'then start a chat of *three.*', color: LIBC },
]
const BOX = { open: 7.8, close: 15.6 }
const FACTS = [{ text: 'In Greek myth, Aquarius is linked to Ganymede, cupbearer of the gods.', at: 12.5, dur: 3.1, y: 318, label: '★ REAL MYTH', color: CY }]
const LAST = { at: 17.0, text: 'Belong *somewhere,* too.', color: CY }
export const GHOST = { room: 'bedroom', at: 5.0, x: 330, y: 1180, from: 'below', where: 'peeking up from under the bed while the twelve chats ping' }
const CUTS = [{ t: 7.6, kind: 'flip' }, { t: 15.8, kind: 'deal' }]

// ── the twelve chats
const CHATS = ['UFO WATCHERS', 'SYNTH NERDS', 'PLANT SWAP', 'RUN CLUB 6AM', 'TRIVIA TUES', 'CO-OP BOARD', 'ROBOTICS', 'BOOK CLUB', 'GHOST SIGHTINGS', 'NEIGHBORS', 'COUSINS', 'VOLUNTEERS']
const PINGS = CHATS.map((c, i) => ({ from: c, text: ['who saw that light??', 'new patch dropped', 'cutting for trade', 'tomorrow 6 sharp', 'team name ideas?', 'meeting moved', 'the bot walks!!', 'chapter 9 tho', 'boo', 'whose cat is this', 'grandma says hi', 'sign-up sheet ↑'][i], at: 3.8 + i * 0.27 }))
const PHONE = [3.7, 7.5]
const EXTRA_CUES = [
  ...PINGS.map((p, i) => ['pop', +p.at.toFixed(3), [1318.51, 1174.66, 1567.98][i % 3], 0.03, (i % 2 ? 0.3 : -0.3)]),
  ['pop', PHONE[0], 880, 0.04, 0], ['whoosh', PHONE[1] - 0.1, 0.25, 0.02],
  ['tick', 7.65, 0.05], ['pop', 7.8, 659.25, 0.03, -0.3], ['pop', 7.95, 783.99, 0.03, 0.3],     // the door, two friends
  ['glitter', 15.9, 16.7], ['pop', 16.4, 1318.51, 0.04, 0],
]

// ── the cast
const AQ = signStar('aquarius'), GEM = signStar('gemini'), LIB = signStar('libra')
const AQ_HOPS = [0.15, 1.8, 3.7, ...talkHops(LINES, AQN, { cps: 28 }), 15.9]
const GEM_HOPS = [7.7, ...talkHops(LINES, GEMN, { cps: 28 }), 16.0]
const LIB_HOPS = [7.85, ...talkHops(LINES, LIBN, { cps: 28 }), 16.1]
function aqua(x, t, X, Y, o = {}) {
  const size = o.size ?? 290
  const r = drawStarChar(x, X, Y, size, t, { color: AQ.color, glyph: AQ.glyph, seed: 11, hops: AQ_HOPS, glow: 0.8, ...o })
  drawAquaHeadphones(x, r, size, { k: o.phones ?? 1 })
  return r
}
const pal = (x, t, st, X, Y, o) => drawStarChar(x, X, Y, o.size ?? 250, t, { color: st.color, glyph: st.glyph, glow: 0.8, ...o })
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
/** a group-chat bubble pill with a red unread badge */
function pill(x, t, s, X, Y, k, badge) {
  if (k <= 0.01) return
  x.save(); x.translate(X, Y); x.scale(k * 1.45, k * 1.45)
  x.font = "700 22px 'Space Mono', monospace"
  const w = x.measureText(s).width + 44
  rect(x, -w / 2 - 4, -26, w + 8, 52, '#120c26'); rect(x, -w / 2, -22, w, 44, '#efe6d6'); rect(x, -w / 2 + 4, 22, 18, 8, '#efe6d6'); rect(x, -w / 2 + 4, 26, 10, 8, '#efe6d6')
  x.fillStyle = '#1b1236'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 1)
  rect(x, w / 2 - 22, -36, 40, 30, '#120c26'); rect(x, w / 2 - 18, -32, 32, 22, '#ff3d6e')
  x.font = "700 16px 'Space Mono', monospace"; x.fillStyle = '#fff'; x.fillText(String(badge), w / 2 - 2, -20)
  x.restore()
}
/** frame 0's cloud of chats around the star; at the end only one is left: the new chat of three */
const CLOUD = [[-300, -300], [230, -330], [-370, -120], [240, -140], [-330, 80], [250, 70], [-140, -440], [120, -490]]
function cloud(x, t, cx, cy, n, seed = 0) {
  for (let i = 0; i < n; i++) {
    const [dx, dy] = CLOUD[i]
    const k = easeOutBack(clamp((t - i * 0.05 + 0.4 - seed) / 0.3), 2)
    pill(x, t, CHATS[i], cx + dx + Math.sin(t * 1.3 + i) * 10, cy + dy + Math.cos(t * 1.1 + i * 2) * 8, k, 20 + ((i * 37) % 80))
  }
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  if (i === 0) {
    const r = aqua(x, t, 700, 1190, { mood: 'wide', look: [Math.sin(t * 4) > 0 ? 1 : -1, -0.5], blink: false })
    cloud(x, t, r.x - 40, r.y + 40, 8)
  } else if (i === 1) {
    aqua(x, t, 760, 1190, { mood: t < 5.7 ? 'wide' : 'squint', look: [-1, -0.3], blink: false })
  } else if (i === 2 || i === 3) {
    const ra = aqua(x, t, 560, 1010, { mood: i === 2 ? (t < 10.1 ? 'wide' : 'neutral') : (t < 12.4 ? 'neutral' : 'sparkle'), look: i === 2 && t < 10.1 ? [-1, 0] : [0, 0.6], blink: i === 2 && t < 10.1 ? false : undefined })
    void ra
    const k = easeOutBack(prog(t, 7.62, 7.95), 2)
    pal(x, t, GEM, 280, 1030, { seed: 3, hops: GEM_HOPS, mood: 'happy', look: [1, 0], pop: k, size: 230 })
    pal(x, t, LIB, 830, 1130, { seed: 7, hops: LIB_HOPS, mood: i === 3 ? 'happy' : 'neutral', look: [-1, -0.3], pop: easeOutBack(prog(t, 7.75, 8.1), 2), size: 230 })
    // the snacks Gemini brought
    rect(x, 380, 1060, 80, 44, '#120c26'); rect(x, 384, 1064, 72, 36, '#f39a3a'); rect(x, 396, 1050, 10, 14, '#ffe27a'); rect(x, 416, 1046, 10, 18, '#ffe27a'); rect(x, 436, 1052, 10, 12, '#ffe27a')
  } else {
    pal(x, t, GEM, 260, 1110, { seed: 3, hops: GEM_HOPS, mood: 'happy', size: 230, look: [1, 0] })
    aqua(x, t, 540, 1080, { mood: 'happy', look: [0, 0], size: 280 })
    pal(x, t, LIB, 820, 1110, { seed: 7, hops: LIB_HOPS, mood: 'happy', size: 230, look: [-1, 0] })
    pill(x, t, 'air signs ☁ 3', 540, 760 + Math.sin(t * 1.4) * 8, easeOutBack(prog(t, 16.3, 16.65), 2), 1)
  }
}
function overlay(x, t) {
  if (t < PHONE[0] || t > PHONE[1]) return
  const pop = easeOutBack(prog(t, PHONE[0], PHONE[0] + 0.35), 2) * (1 - ease.inCubic(prog(t, PHONE[1] - 0.3, PHONE[1])))
  phoneScreen(x, t, { x: 330, y: 930, w: 440, h: 720, lines: PINGS, app: 'chat', title: '12 group chats', clock: '2:10', pop: clamp(pop, 0, 1.2), rot: -0.05 + 0.02 * Math.sin(t * 30) * (t < 7 ? 1 : 0), accent: '#38c4ec', size: 24 })
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
  const box = LINES.length ? dialogueBox(root, { lines: LINES, y: BOX.y ?? 1440, width: 960, height: BOX.h ?? 270, open: BOX.open, close: BOX.close, cps: CPS }) : null
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
      if (box) box.update(t)
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
  ...(LINES.length ? [['pop', r3(BOX.open ?? LINES[0].t - 0.22), 739.99, 0.035, 0], ...talkCues(LINES, { cps: CPS, pitch: PITCH })] : []),
  ...wordPops(LAST.at, 3, 0.08, 2), ['pop', r3(LAST.at + 0.4), 1174.66, 0.05, 0], ['bell', r3(LAST.at + 0.42), 1567.98, 0.025, 1.2, 0],
  ['tick', r3(GHOST.at + 0.05), 0.015],
  ...EXTRA_CUES,
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
