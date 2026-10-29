// st9piscescrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E59 · Pisces 4/5 THE CREW) · story 0–20.6, end card.
//   HOOK   "A Pisces is everyone's *2 AM* phone call."  Frame 0: the bedroom, late, Pisces sitting up with the phone to its
//          face, wide awake for a friend; the cats awake too.
//   3.6    the call log stacks up: 12:40 ARIES "i did something" · 1:15 LIBRA "pick for me" · 2:00 GEMINI "quick question
//          (it's not quick)" · 2:30 LEO "be honest". Pisces nods… and droops. "2:30 AM — line 4. still *listening.*"
//   8.0    the battery goes red. PISCES: "who do *i* call at 2 AM?"  The phone rings: CANCER + SCORPIO (the water trio).
//   11.6   the next afternoon, the kitchen: Cancer brings soup, Scorpio a blanket. CANCER: "your turn. how are *you?*"
//          ★ REAL SKY: precession has moved the March equinox point into Pisces.
//   15.8   frame 0's framing again, a new night: Pisces asleep, the phone face-down on "do not disturb", the cats curled up.
//          Last line: "Save some *you* for you."
//   Rewatch bait: the fridge note says "call back ALL"; the polaroid string has one more photo (the three of them).
//   Ghost: peeking from behind the fridge while the soup arrives.
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
import { drawPiscesHome } from '../../st9pisceshome.js'

export const DURATION = 25
const SIGN = 'pisces', EPI = 3, NUMERAL = 'S9 E59', KEY = 'E'
const HOME = drawPiscesHome
const GOLD = '#f2c75c', PC = '#b9b3ff', CAC = '#8fd8ff', SCC = '#ff7a98'
const BATTERY = [0.3, 0.12]
const PIN = '♓ PISCES', CAN = '♋ CANCER', SCN = '♏ SCORPIO'
const PITCH = { [PIN]: 880, [CAN]: 783.99, [SCN]: 523.25 }

const HOOK = { text: 'A Pisces is everyone’s *2 AM* phone call.', out: 3.4, color: PC }
const HOURS = [[0, 0.7], [3.6, 1.6], [8, 2.6], [11.6, 14], [15.8, 23.6], [20.6, 23.8]]
const SHOTS = [
  { at: 0, room: 'bedroom', cam: [1.15, 600, 1040], dark: 0.75, home: { cats: false } },
  { at: 3.6, room: 'bedroom', cam: [1.4, 640, 1080], dark: 0.8, home: { cats: false } },
  { at: 8.0, room: 'bedroom', cam: [1.5, 640, 1080], dark: 0.85, home: { cats: false } },
  { at: 11.6, room: 'kitchen', cam: [1.08, 560, 980] },
  { at: 15.8, room: 'bedroom', cam: [1.15, 600, 1040], dark: 0.85, home: { cats: false } },
]
const PUNCH = [
  { at: 1.8, dur: 1.3, z: 0.1, x: 640, y: 1060 },
  { at: 6.3, dur: 1.3, z: 0.15, x: 640, y: 1060 },
  { at: 10.0, dur: 1.4, z: 0.25, x: 640, y: 1040 },
  { at: 13.9, dur: 1.3, z: 0.15, x: 470, y: 1000 },
]
const CLOCK = [
  { from: '12:40', to: '12:40', at: -2, dur: 1, ampm: 'AM' },
  { from: '12:40', to: '2:30', at: 3.6, dur: 3.6, ampm: 'AM' },
  { from: '2:30', to: '2:41', at: 8.0, dur: 0.4, ampm: 'AM' },
  { from: '2:41 AM', to: '2:00 PM', at: 11.6, dur: 0.8 },
  { from: '2:00 PM', to: '11:40 PM', at: 15.8, dur: 0.8 },
]
const STAMPS = [
  { at: 0.8, out: 3.35, time: '12:40 AM', text: 'friday. phone *on.*', accentColor: PC },
  { at: 4.0, out: 7.8, time: '2:30 AM', text: 'line 4. still *listening.*', accentColor: PC },
  { at: 16.2, out: 20.35, time: '11:40 PM', text: 'do not disturb. *on purpose.*', accentColor: PC },
]
const LINES = [
  { t: 8.3, speaker: PIN, text: 'who do *i* call at 2 AM?', color: PC },
  { t: 12.0, speaker: CAN, text: 'your turn. how are *you?*', color: CAC },
  { t: 13.9, speaker: SCN, text: 'talk. we’ve got *all* day.', color: SCC },
]
const BOX = [{ open: 8.1, close: 11.4, from: 0, to: 1 }, { open: 11.8, close: 15.6, from: 1, to: 3 }]
const FACTS = [{ text: 'Precession has moved the March equinox point into Pisces.', at: 12.1, dur: 3.3, y: 318, color: PC }]
const LAST = { at: 16.9, text: 'Save some *you* for you.', color: PC }
export const GHOST = { room: 'kitchen', at: 12.6, x: 270, y: 900, from: 'left', where: 'peeking out from behind the fridge while Cancer and Scorpio arrive with soup' }
const CUTS = [{ t: 11.6, kind: 'flip' }, { t: 15.8, kind: 'deal' }]

// ── the call log (screen space)
const LOG = [
  { at: 3.8, time: '12:40', who: 'aries', name: 'ARIES', text: '“i did something”' },
  { at: 4.7, time: '1:15', who: 'libra', name: 'LIBRA', text: '“pick for me”' },
  { at: 5.6, time: '2:00', who: 'gemini', name: 'GEMINI', text: '“quick question (not quick)”' },
  { at: 6.5, time: '2:30', who: 'leo', name: 'LEO', text: '“be honest”' },
]
const LOG_OUT = 7.9
const RING = [10.0, 11.5]
const EXTRA_CUES = [
  ...[0.05, 0.35].map(t => ['pop', t, 1567.98, 0.03, 0.4]),
  ...LOG.flatMap(l => [['pop', l.at, 1318.51, 0.03, 0.4], ['pop', l.at + 0.15, 1567.98, 0.025, 0.4]]),
  ...[10.0, 10.3, 10.8, 11.1].map(t => ['pop', t, 1760, 0.03, 0]),
  ['pop', 11.75, 659.25, 0.035, -0.3], ['pop', 11.9, 523.25, 0.035, 0.3], ['glitter', 15.9, 16.6],
]

// ── the cast
const PS = signStar('pisces'), CA = signStar('cancer'), SC = signStar('scorpio')
const P_HOPS = [0.15, 1.8, 3.8, 4.7, 5.6, 6.5, ...talkHops(LINES, PIN, { cps: 28 }), 10.05]
const pisces = (x, t, X, Y, o = {}) => drawStarChar(x, X, Y, o.size ?? 290, t, { color: PS.color, glyph: PS.glyph, seed: 12, hops: P_HOPS, glow: 0.9, ...o })
const pal = (x, t, st, X, Y, o = {}) => drawStarChar(x, X, Y, o.size ?? 240, t, { color: st.color, glyph: st.glyph, glow: 0.8, ...o })
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
/** the phone in its hand, pressed to its face (or ringing on the duvet) */
function handPhone(x, t, r, ring = false, down = false) {
  const X = down ? r.x - 230 : r.x - r.size * 0.42, Y = down ? r.y + 70 : r.y - 20
  const sh = ring ? Math.sin(t * 60) * 5 : 0
  x.save(); x.translate(X + sh, Y); x.rotate(down ? -1.45 : -0.2)
  rect(x, -26, -50, 52, 100, '#120c26'); rect(x, -20, -44, 40, 88, down ? '#1c1840' : '#5a52c8')
  if (down) { x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = '#c9a6ff'; x.textBaseline = 'middle'; x.fillText('☾', 0, 0) }
  x.restore()
  if (ring) { x.save(); x.strokeStyle = '#ffe27a'; x.lineWidth = 5; for (const rr of [50, 70]) { x.beginPath(); x.arc(X, Y, rr + 6 * Math.sin(t * 20), -0.6, 0.6); x.stroke(); x.beginPath(); x.arc(X, Y, rr + 6 * Math.sin(t * 20), Math.PI - 0.6, Math.PI + 0.6); x.stroke() } x.restore() }
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  const cats = (sleepy) => {
    // the cats on the bed's edge, drawn here so they sit in front of the dark
    x.save(); x.globalAlpha = 0.9
    import_cats(x, t, 400, 1330, sleepy)
    x.restore()
  }
  if (i === 0) {
    cats(false)
    const r = pisces(x, t, 640, 1180, { mood: 'wide', look: [-1, 0], blink: false })
    handPhone(x, t, r)
  } else if (i === 1) {
    cats(false)
    const sl = prog(t, 5.6, 7.6)
    const r = pisces(x, t, 640, 1180, { mood: sl < 0.5 ? 'neutral' : 'sleepy', zzz: false, look: [-1, 0.3], squash: 0.06 * sl })
    handPhone(x, t, r)
  } else if (i === 2) {
    cats(t < 10)
    const ring = t >= RING[0] && t < RING[1]
    const r = pisces(x, t, 640, 1180, { mood: t < 10 ? 'neutral' : 'wide', look: t < 10 ? [0, 1] : [-1, 0.6], blink: t < 10 ? undefined : false })
    handPhone(x, t, r, ring, true)
    if (ring) {
      // who's calling: the two water signs, tiny, on the screen glow
      pal(x, t, CA, r.x - 230, r.y - 250, { size: 110, mood: 'happy', glyph: null, seed: 4, pop: easeOutBack(prog(t, RING[0], RING[0] + 0.3), 2) })
      pal(x, t, SC, r.x - 90, r.y - 270, { size: 110, mood: 'happy', glyph: null, seed: 8, pop: easeOutBack(prog(t, RING[0] + 0.1, RING[0] + 0.4), 2) })
    }
  } else if (i === 3) {
    pisces(x, t, 470, 1000, { mood: t < 13.9 ? 'wide' : 'sparkle', look: [1, 0] })
    pal(x, t, CA, 760, 1010, { seed: 4, mood: 'happy', look: [-1, 0], hops: [11.75, ...talkHops(LINES, CAN, { cps: 28 })], pop: easeOutBack(prog(t, 11.65, 11.95), 2), size: 220 })
    pal(x, t, SC, 930, 1150, { seed: 8, mood: t < 13.9 ? 'squint' : 'happy', look: [-1, -0.3], hops: [11.9, ...talkHops(LINES, SCN, { cps: 28 })], pop: easeOutBack(prog(t, 11.8, 12.1), 2), size: 210 })
    // soup + blanket
    rect(x, 600, 1056, 90, 48, '#120c26'); rect(x, 606, 1062, 78, 36, '#efe6d6'); rect(x, 612, 1062, 66, 12, '#f2a65a')
    for (let k = 0; k < 3; k++) { const p = (t * 0.8 + k / 3) % 1; rect(x, 620 + k * 22, 1040 - p * 60, 6, 14, `rgba(239,230,214,${0.6 * (1 - p)})`) }
    rect(x, 820, 1170, 200, 70, '#120c26'); rect(x, 826, 1176, 188, 58, '#e23d66'); for (let k = 0; k < 5; k++) rect(x, 836 + k * 36, 1176, 14, 58, '#ff7a98')
  } else {
    cats(true)
    const r = pisces(x, t, 640, 1180, { mood: 'sleepy', zzz: true, look: [0, 0.5] })
    handPhone(x, t, r, false, true)
  }
}
/** the call log cards, stacking up on the left */
function overlay(x, t) {
  if (t < LOG[0].at || t > LOG_OUT) return
  const out = 1 - ease.inCubic(prog(t, LOG_OUT - 0.3, LOG_OUT))
  LOG.forEach((l, j) => {
    const k = easeOutBack(prog(t, l.at, l.at + 0.3), 2) * out
    if (k <= 0) return
    const X = 70, Y = 320 + j * 140
    x.save(); x.translate(X + (1 - k) * -300, Y); x.globalAlpha = clamp(k); x.scale(1.4, 1.2)
    rect(x, -4, -4, 640, 108, '#120c26'); rect(x, 0, 0, 632, 100, 'rgba(28,24,64,0.94)')
    const st = signStar(l.who)
    drawStarChar(x, 52, 52, 74, t, { color: st.color, mood: 'wide', glow: 0.4, bob: 0, seed: j })
    x.font = "700 22px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.textAlign = 'left'
    x.fillStyle = '#f2c75c'; x.fillText(l.time + ' AM', 104, 30); x.fillStyle = '#efe6d6'; x.fillText(l.name, 250, 30)
    x.font = "600 30px Inter"; x.fillStyle = '#efe6d6'; x.fillText(l.text, 104, 70)
    x.restore()
  })
}
// the two cats, from the home module (the home skips them in the bedroom shots so they can sit in front of the dark)
import { drawPiscesCats } from '../../st9pisceshome.js'
const import_cats = (x, t, X, Y, sleepy) => drawPiscesCats(x, t, X, Y, { cell: 13, sleepy, gap: 190 })

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
