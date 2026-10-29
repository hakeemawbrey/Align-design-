// st9aquawork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E52 · Aquarius 2/5 9 TO 5) · story 0–20.6, end card.
//   HOOK   "An Aquarius just *reinvented* your workflow."  Frame 0: the home desk at 9 AM, Aquarius arms-up in front of a
//          Rube Goldberg machine it built overnight (ramp, marble, dominoes, a gear, a DONE tray).
//   3.6    close-up: the marble runs, the dominoes fall, the gear turns, a task flies into DONE.
//          AQUARIUS: "it sorts every task for you. by *vibes.*"
//   7.6    the team chat pops up: TAURUS "where did the spreadsheet go", VIRGO "my labels??", CAPRICORN "who approved this".
//   11.4   the headphones come off. AQUARIUS: "okay. new idea: i ask you *first.*"  me: "what slows you down?"
//          ★ ASTROLOGY SAYS: Aquarius is the natural ruler of the 11th house (friends, groups, hopes).
//   15.6   frame 0's framing again: the same machine, now covered in the team's sticky notes, every colour.
//          Last line: "Change it *together.*"
//   Rewatch bait: the DONE tray is labelled "DONE-ISH"; the whiteboard is on THEORY #48.  Ghost: behind the telescope.
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
import { AQUA, drawAquaHome, drawAquaHeadphones } from '../../st9aquahome.js'

export const DURATION = 25
const SIGN = 'aqua', EPI = 1, NUMERAL = 'S9 E52', KEY = 'Cm'
const HOME = drawAquaHome
const GOLD = '#f2c75c', CY = '#7fe3ff'
const BATTERY = [0.82, 0.7]
const AQN = '♒ AQUARIUS'
const PITCH = { [AQN]: 987.77 }

const HOOK = { text: 'An Aquarius just *reinvented* your workflow.', out: 3.4, color: CY }
const HOURS = [[0, 9], [7.6, 9.6], [11.4, 10.2], [15.6, 11], [20.6, 11.1]]
const SHOTS = [
  { at: 0, room: 'desk', cam: [1.04, 540, 850] },
  { at: 3.6, room: 'desk', cam: [1.45, 520, 980], push: 0.06 },
  { at: 7.6, room: 'desk', cam: [1.2, 560, 1060] },
  { at: 11.4, room: 'desk', cam: [1.3, 600, 1100] },
  { at: 15.6, room: 'desk', cam: [1.04, 540, 850] },
]
const PUNCH = [
  { at: 2.0, dur: 1.2, z: 0.1, x: 700, y: 960 },
  { at: 5.6, dur: 1.4, z: 0.35, x: 900, y: 1090 },
  { at: 9.7, dur: 1.2, z: 0.15, x: 720, y: 1100 },
  { at: 17.4, dur: 1.4, z: 0.1, x: 540, y: 900 },
]
const CLOCK = [
  { from: '9:02', to: '9:02', at: -2, dur: 1 },
  { from: '9:02', to: '9:40', at: 7.6, dur: 0.7 },
  { from: '9:40', to: '10:15', at: 11.4, dur: 0.6 },
  { from: '10:15', to: '11:00', at: 15.6, dur: 0.6 },
]
const STAMPS = [
  { at: 0.8, out: 3.35, time: '9:02 AM', text: 'standup? i built a *machine.*', accentColor: CY },
  { at: 16.0, out: 20.3, time: '11:00 AM', text: 'version 2: *everyone’s* ideas.', accentColor: CY },
]
const LINES = [
  { t: 3.9, speaker: AQN, text: 'it sorts every task for you. by *vibes.*', color: CY },
  { t: 11.7, speaker: AQN, text: 'okay. new idea: i ask you *first.*', color: CY },
]
const BOX = { open: 3.7, close: 15.3 }
const FACTS = [{ text: 'Aquarius is the natural ruler of the 11th house (friends, groups, hopes).', at: 12.0, dur: 3.3, y: 318, label: '★ ASTROLOGY SAYS', color: CY }]
const LAST = { at: 17.0, text: 'Change it *together.*', color: CY }
export const GHOST = { room: 'desk', at: 13.6, x: 960, y: 1100, from: 'below', where: 'rising up behind the telescope at the window while the headphones come off' }
const CUTS = [{ t: 7.6, kind: 'flip' }, { t: 15.6, kind: 'deal' }]

// ── the team chat on the phone
const CHAT = [
  { from: 'TAURUS', text: 'where did the spreadsheet go', at: 7.9 },
  { from: 'VIRGO', text: 'my labels??', at: 8.7 },
  { from: 'CAPRICORN', text: 'who approved this', at: 9.5 },
  { from: 'me', text: 'what slows you down?', at: 13.4 },
  { from: 'TAURUS', text: 'honestly? lunch', at: 14.1 },
  { from: 'VIRGO', text: 'can i add labels ♡', at: 14.7 },
]
const PHONE_IN = 7.7, PHONE_OUT = 15.4
const EXTRA_CUES = [
  ...phoneCues(CHAT, { app: 'chat' }),
  ['pop', PHONE_IN, 880, 0.04, 0.3], ['whoosh', PHONE_OUT - 0.1, 0.25, 0.02],
  // the machine: marble rolls, dominoes clack, gear, a ding into DONE
  ['whoosh', 3.75, 1.2, 0.02], ...[5.0, 5.12, 5.24, 5.36, 5.48].map((t, i) => ['tick', t, 0.04 + 0.004 * i]),
  ['pop', 5.7, 523.25, 0.04, 0.4], ['bell', 6.2, 1567.98, 0.03, 1, 0.5],
  ['pop', 11.45, 659.25, 0.035, 0], ['glitter', 15.7, 16.6],
]

// ── the episode's own drawing
const AQ = signStar('aquarius')
const HOPS = [0.15, 2.0, ...talkHops(LINES, AQN, { cps: 28 }), 7.75, 11.45, 15.7]
function aqua(x, t, X, Y, o = {}) {
  const size = o.size ?? 300
  const r = drawStarChar(x, X, Y, size, t, { color: AQ.color, glyph: AQ.glyph, seed: 11, hops: HOPS, glow: 0.8, ...o })
  drawAquaHeadphones(x, r, size, { k: o.phones ?? 0 })
  return r
}
const INK = '#120c26'
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
// the machine's path: a zig-zag ramp down the left, onto the desk, the dominoes, then the gear + the DONE tray
const RAMP = [[150, 860], [430, 930], [190, 1000], [470, 1070], [560, 1100]]
const RUN = [3.75, 5.0]          // marble on the ramp
const DOM = [5.0, 5.6]           // dominoes fall
const GEAR = 5.55, FLY = [5.75, 6.3]
function along(pts, p) {
  const seg = []; let L = 0
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d }
  let d = p * L
  for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const k = d / seg[i]; return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)] } d -= seg[i] }
  return pts[pts.length - 1]
}
const NOTE_COLS = ['#e9b24a', '#ef5c94', '#2fc79a', '#f39a3a', '#7c74f0', '#f0603a', '#e163d6']
function machine(x, t, notes = 0) {
  // ramp rails
  for (let i = 1; i < RAMP.length; i++) {
    x.save(); x.lineCap = 'square'
    x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(...RAMP[i - 1]); x.lineTo(...RAMP[i]); x.stroke()
    x.strokeStyle = '#c99a4a'; x.lineWidth = 10; x.stroke(); x.restore()
  }
  for (const [px, py] of RAMP.slice(0, 4)) { rect(x, px - 5, py, 10, 1110 - py, INK); rect(x, px - 2, py, 4, 1110 - py, '#8a6a3a') }
  // marble
  let mp = RAMP[0]
  if (t >= RUN[0]) mp = along(RAMP, ease.inQuad(prog(t, ...RUN)))
  if (t < DOM[1] + 0.2 || t > 15.6) { rect(x, mp[0] - 13, mp[1] - 30, 26, 26, INK); rect(x, mp[0] - 9, mp[1] - 26, 18, 18, '#ff8fb1'); rect(x, mp[0] - 7, mp[1] - 24, 6, 6, '#ffd1de') }
  // dominoes along the desk
  for (let i = 0; i < 6; i++) {
    const dx = 600 + i * 34, fall = t > 15.6 ? 0 : ease.inQuad(prog(t, DOM[0] + i * 0.1, DOM[0] + i * 0.1 + 0.16))
    x.save(); x.translate(dx + 12, 1106); x.rotate(fall * 1.2); rect(x, -12, -64, 24, 64, INK); rect(x, -8, -60, 16, 56, '#efe6d6'); rect(x, -3, -40, 6, 6, INK); x.restore()
  }
  // gear (spins after the last domino)
  const ga = t > GEAR && t < 15.6 ? (t - GEAR) * 4 : 0
  x.save(); x.translate(860, 1020); x.rotate(ga)
  for (let k = 0; k < 8; k++) { x.save(); x.rotate(k * Math.PI / 4); rect(x, -10, -62, 20, 24, INK); rect(x, -6, -58, 12, 18, AQUA.steel); x.restore() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 46, 0, Math.PI * 2); x.fill(); x.fillStyle = AQUA.steel; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill(); x.restore()
  // the DONE-ISH tray
  rect(x, 690, 1060, 110, 46, INK); rect(x, 694, 1064, 102, 38, '#5a78b4')
  x.save(); x.font = "700 16px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = '#efe6d6'; x.fillText('DONE-ISH', 745, 1090); x.restore()
  // a task card flies off the gear into the tray
  const fp = prog(t, ...FLY)
  if (fp > 0 && t < 15.6) {
    const cx = lerp(860, 745, fp), cy = lerp(960, 1050, fp) - Math.sin(Math.PI * fp) * 120
    x.save(); x.translate(cx, cy); x.rotate(fp * 6); rect(x, -26, -18, 52, 36, INK); rect(x, -22, -14, 44, 28, '#fff3a8'); rect(x, -16, -8, 30, 4, '#7a3a9a'); rect(x, -16, 0, 22, 4, '#7a3a9a'); x.restore()
  }
  // the team's sticky notes (version 2)
  const spots = [[300, 880], [420, 960], [210, 990], [640, 1020], [860, 940], [520, 1060], [760, 980]]
  for (let i = 0; i < notes; i++) {
    const k = easeOutBack(prog(t, 15.7 + i * 0.12, 16.0 + i * 0.12), 2.2)
    if (k <= 0) continue
    const [nx, ny] = spots[i]
    x.save(); x.translate(nx, ny); x.rotate((i % 3 - 1) * 0.12); x.scale(k, k); rect(x, -30, -30, 60, 60, INK); rect(x, -26, -26, 52, 52, NOTE_COLS[i]); rect(x, -18, -12, 34, 5, INK); rect(x, -18, 2, 24, 5, INK); x.restore()
  }
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  machine(x, t, i === 4 ? 7 : 0)
  if (i === 0) aqua(x, t, 700, 1200, { mood: 'sparkle', look: [-1, -1], squash: -0.05 })
  else if (i === 1) aqua(x, t, 760, 1210, { mood: t < 5.6 ? 'squint' : 'heart', look: [-1, 0] })
  else if (i === 2) aqua(x, t, 720, 1200, { mood: 'wide', look: [1, -1], blink: false })
  else if (i === 3) aqua(x, t, 720, 1200, { mood: t < 13.4 ? 'neutral' : 'happy', look: [1, 0], phones: ease.inOutCubic(prog(t, 11.45, 11.95)) })
  else aqua(x, t, 700, 1200, { mood: 'happy', look: [0, 0], phones: 1 })
}
function overlay(x, t) {
  if (t < PHONE_IN || t > PHONE_OUT) return
  const pop = easeOutBack(prog(t, PHONE_IN, PHONE_IN + 0.35), 2) * (1 - ease.inCubic(prog(t, PHONE_OUT - 0.3, PHONE_OUT)))
  const lines = CHAT.filter(l => l.at < 11.4 || t > 13.0)
  phoneScreen(x, t, { x: 290, y: 900, w: 420, h: 700, lines, app: 'chat', title: 'the team ✦', clock: t < 11.4 ? '9:41' : '10:15', pop: clamp(pop, 0, 1.2), rot: -0.04, accent: '#38c4ec' })
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
