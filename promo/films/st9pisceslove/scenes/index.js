// st9pisceslove (30 s vertical, Star Talk season 9 "A Day in the Life", S9 E58 · Pisces 3/5 DATE NIGHT) · story 0–25.6, end card.
//   HOOK   "Dating a Pisces: they wrote you a song on date *one.*"  Frame 0: the window seat at dusk, the sea outside, Pisces
//          mid-strum on the pink guitar, Virgo (its partner since season 4) wide-eyed beside it, music notes flying.
//   3.8    the lyric sheet: SONG FOR VIRGO (v1) · your label maker / labels my heart / your the to-do list / i'll never
//          cross off.  "7:34 PM — date one. i brought a *guitar.*"
//   8.4    Virgo's red pen: "your" → "you're", one tiny heart in the margin. VIRGO: "it's perfect. one tiny *edit.*"
//          PISCES: "you fixed my song?"  VIRGO: "i *kept* your song."
//   13.6   ★ REAL MYTH: in Greek myth, Aphrodite and Eros became two fish tied by a cord.
//   17.6   the duet: Virgo hums along; their two streams of notes twist together like the fishes' cord.
//   21.4   frame 0's framing again: now both sing, a pixel cord tied between them. Last line: "Feel it *with* them."
//   Rewatch bait: the sheet's corner says "v1", and after the edit "v2 (virgo)"; the cats wear tiny party hats.
//   Ghost: rising from behind the window-seat cushion (left) during the edit.
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

export const DURATION = 30
const SIGN = 'pisces', EPI = 2, NUMERAL = 'S9 E58', KEY = 'G'
const HOME = drawPiscesHome
const GOLD = '#f2c75c', PC = '#b9b3ff', VC = '#ff8fb8'
const BATTERY = [0.6, 0.48]
const PIN = '♓ PISCES', VIN = '♍ VIRGO'
const PITCH = { [PIN]: 880, [VIN]: 1046.5 }

const HOOK = { text: 'Dating a Pisces: they wrote you a song on date *one.*', out: 3.6, color: PC }
const HOURS = [[0, 19.4], [8.4, 19.7], [17.6, 20.3], [25.6, 20.6]]
const SHOTS = [
  { at: 0, room: 'window', cam: [1.25, 560, 1030] },
  { at: 3.8, room: 'window', cam: [1.3, 440, 1060] },
  { at: 8.4, room: 'window', cam: [1.3, 640, 1060] },
  { at: 13.6, room: 'window', cam: [1.15, 540, 1020] },
  { at: 17.6, room: 'window', cam: [1.4, 540, 1000], push: 0.1 },
  { at: 21.4, room: 'window', cam: [1.25, 560, 1030] },
]
const PUNCH = [
  { at: 1.8, dur: 1.3, z: 0.12, x: 700, y: 1060 },
  { at: 6.1, dur: 1.2, z: 0.15, x: 400, y: 1060 },
  { at: 15.4, dur: 1.4, z: 0.15, x: 540, y: 1060 },
  { at: 23.2, dur: 1.3, z: 0.08, x: 540, y: 1040 },
]
const CLOCK = [
  { from: '7:30', to: '7:30', at: -2, dur: 1, ampm: 'PM' },
  { from: '7:30', to: '7:34', at: 3.8, dur: 0.4, ampm: 'PM' },
  { from: '7:34', to: '7:52', at: 8.4, dur: 0.5, ampm: 'PM' },
  { from: '7:52', to: '8:30', at: 17.6, dur: 0.6, ampm: 'PM' },
  { from: '8:30', to: '8:45', at: 21.4, dur: 0.4, ampm: 'PM' },
]
const STAMPS = [
  { at: 0.8, out: 3.55, time: '7:30 PM', text: 'date one. i brought a *guitar.*', accentColor: PC },
  { at: 18.0, out: 21.2, time: '8:30 PM', text: 'it’s a *duet* now.', accentColor: PC },
]
const LINES = [
  { t: 10.6, speaker: VIN, text: 'it’s perfect. one tiny *edit.*', color: VC },
  { t: 12.6, speaker: PIN, text: 'you fixed my song?', color: PC },
  { t: 14.4, speaker: VIN, text: 'i *kept* your song.', color: VC },
]
const BOX = { open: 10.4, close: 17.4 }
const FACTS = [{ text: 'In Greek myth, Aphrodite and Eros became two fish tied by a cord.', at: 14.0, dur: 3.3, y: 318, label: '★ REAL MYTH', color: PC }]
const LAST = { at: 21.8, text: 'Feel it *with* them.', color: PC }
export const GHOST = { room: 'window', at: 9.1, x: 180, y: 1150, from: 'below', where: 'rising from behind the window-seat cushion (left) while Virgo uncaps the red pen' }
const CUTS = [{ t: 8.4, kind: 'flip' }, { t: 17.6, kind: 'deal' }]

// ── the lyric sheet (screen space): the song types on, then Virgo's red pen
const SHEET = { at: 3.9, out: 13.4 }
const LYRICS = [['your label maker', 4.2], ['labels my heart', 5.0], ['your the to-do list', 5.8], ['i’ll never cross off', 6.6]]
const EDIT = { strike: 9.2, write: 9.6, heart: 10.1 }
const EXTRA_CUES = [
  ...[0.1, 0.55, 1.0, 1.45, 1.9, 2.35, 2.8, 3.25].map((t, i) => ['pluck', t, [392, 493.88, 587.33, 493.88][i % 4], 0.03, 0.6, 0]),
  ...LYRICS.map(([, t]) => ['pluck', t, 783.99, 0.03, 0.8, 0.3]),
  ['tick', EDIT.strike, 0.04], ['whoosh', EDIT.strike, 0.2, 0.015], ['tick', EDIT.write, 0.03], ['pop', EDIT.heart, 1318.51, 0.035, 0.3],
  ['glitter', 17.7, 18.6], ['bell', 21.45, 1567.98, 0.025, 1.4, 0],
]

// ── the cast
const PS = signStar('pisces'), VI = signStar('virgo')
const P_HOPS = [0.45, 1.35, 2.25, 3.15, 4.2, 5.8, ...talkHops(LINES, PIN, { cps: 28 }), 17.7, 21.5]
const V_HOPS = [1.0, 7.0, 9.2, ...talkHops(LINES, VIN, { cps: 28 }), 17.8, 21.6]
const pisces = (x, t, X, Y, o = {}) => drawStarChar(x, X, Y, o.size ?? 270, t, { color: PS.color, glyph: PS.glyph, seed: 12, hops: P_HOPS, glow: 0.9, ...o })
const virgo = (x, t, X, Y, o = {}) => drawStarChar(x, X, Y, o.size ?? 260, t, { color: VI.color, glyph: VI.glyph, seed: 6, hops: V_HOPS, glow: 0.9, ...o })
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
const MNOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function noteStream(x, t, X, Y, dir, col, twist = 0) {
  for (let i = 0; i < 4; i++) {
    const p = (t * 0.55 + i / 4) % 1
    const nx = X + dir * p * 220 + Math.sin(p * 9 + i) * 20 * (1 - twist), ny = Y - p * 260 + twist * Math.sin(p * Math.PI * 4 + (dir > 0 ? 0 : Math.PI)) * 30
    drawBits(x, MNOTE, { X: col }, R(nx), R(ny), 7, { alpha: Math.sin(Math.PI * p) })
  }
}
/** the pink guitar, held across the body; strum = 0…1 */
function guitar(x, t, r, strum, flip = 1) {
  x.save(); x.translate(r.x + flip * 30, r.y + 50); x.scale(flip, 1); x.rotate(-0.9)
  rect(x, -8, -200, 16, 170, '#120c26'); rect(x, -5, -197, 10, 164, '#8a5a2a')
  x.fillStyle = '#120c26'; x.beginPath(); x.arc(0, 20, 54, 0, Math.PI * 2); x.arc(0, -36, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#ff9fb8'; x.beginPath(); x.arc(0, 20, 48, 0, Math.PI * 2); x.arc(0, -36, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#120c26'; x.beginPath(); x.arc(0, -6, 15, 0, Math.PI * 2); x.fill()
  x.restore()
  // the strumming hand: a little star-point flick
  rect(x, r.x + flip * (60 + strum * 30), r.y + 60 - strum * 20, 16, 16, '#efe6d6')
}
/** the cord between the two (the fishes' cord) */
function cord(x, t, a, b, k) {
  if (k <= 0) return
  x.save(); x.strokeStyle = '#120c26'; x.lineWidth = 12; x.lineCap = 'round'
  const mx = (a.x + b.x) / 2, my = Math.max(a.y, b.y) + 90 + 8 * Math.sin(t * 2)
  const path = () => { x.beginPath(); x.moveTo(a.x + 60, a.y + 40); x.quadraticCurveTo(mx, my, lerp(a.x + 60, b.x - 60, k), lerp(a.y + 40, b.y + 40, k)) }
  path(); x.stroke(); x.strokeStyle = '#f2c75c'; x.lineWidth = 6; path(); x.stroke(); x.restore()
  drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, R(mx), R(my - 30), 6, { alpha: k })
}
const HAT = ['..Y..', '.PYP.', 'PPYPP']
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  // the cats' party hats (the home draws the cats at 260 / 820, y 1176 on the window seat)
  for (const cx of [260, 820]) drawBits(x, HAT, { Y: '#ffe27a', P: '#ff9fb8' }, cx + (cx < 500 ? -24 : 24), 1040, 9)
  const strum = (t * 2.2) % 1 < 0.3 ? 1 : 0
  if (i <= 1) {
    const rp = pisces(x, t, 400, 1090, { mood: 'happy', look: [1, 0] })
    guitar(x, t, rp, strum)
    noteStream(x, t, rp.x + 80, rp.top, 1, '#c9a6ff')
    virgo(x, t, 720, 1100, { mood: t < 1.0 ? 'wide' : i === 0 ? 'wide' : 'heart', look: [-1, -0.2], blink: i === 0 ? false : undefined })
  } else if (i === 2 || i === 3) {
    const rp = pisces(x, t, 400, 1090, { mood: i === 2 ? (t < 12.6 ? 'neutral' : 'wide') : 'sparkle', look: [1, 0] })
    guitar(x, t, rp, 0)
    const rv = virgo(x, t, 720, 1100, { mood: i === 2 ? (t < 10.1 ? 'squint' : 'happy') : 'happy', look: [-1, -0.4] })
    // the red pen
    x.save(); x.translate(rv.x - 120, rv.y - 10); x.rotate(-0.6); rect(x, -9, -50, 18, 76, '#120c26'); rect(x, -5, -46, 10, 56, '#e23d66'); rect(x, -5, 10, 10, 12, '#efe6d6'); x.restore()
  } else if (i === 4) {
    const rp = pisces(x, t, 400, 1090, { mood: 'happy', look: [1, -0.3] })
    guitar(x, t, rp, strum)
    const rv = virgo(x, t, 700, 1100, { mood: 'happy', look: [-1, -0.3] })
    noteStream(x, t, rp.x + 60, rp.top, 1, '#c9a6ff', 1)
    noteStream(x, t, rv.x - 60, rv.top, -1, '#ff9fb8', 1)
  } else {
    const rp = pisces(x, t, 400, 1090, { mood: 'heart', look: [1, 0] })
    guitar(x, t, rp, strum)
    const rv = virgo(x, t, 720, 1100, { mood: 'happy', look: [-1, -0.2] })
    noteStream(x, t, rp.x + 80, rp.top, 1, '#c9a6ff')
    noteStream(x, t, rv.x - 80, rv.top, -1, '#ff9fb8')
    cord(x, t, rp, rv, ease.outCubic(prog(t, 21.5, 22.3)))
  }
}
function overlay(x, t) {
  if (t < SHEET.at || t > SHEET.out) return
  const k = easeOutBack(prog(t, SHEET.at, SHEET.at + 0.35), 1.8) * (1 - ease.inCubic(prog(t, SHEET.out - 0.3, SHEET.out)))
  x.save(); x.translate(540, 590); x.rotate(-0.025); x.scale(k, k)
  rect(x, -340, -220, 680, 440, '#120c26'); rect(x, -332, -212, 664, 424, '#fbf7ee')
  for (let j = -150; j < 200; j += 64) rect(x, -320, j + 40, 640, 2, '#cfd8f0')
  rect(x, -270, -212, 3, 424, '#ffb0c0')
  x.font = "700 24px 'Space Mono', monospace"; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#7c74f0'
  x.fillText('SONG FOR VIRGO', -250, -170)
  x.textAlign = 'right'; x.fillStyle = t > EDIT.write ? '#e23d66' : '#9a92c8'; x.fillText(t > EDIT.write ? 'v2 (virgo)' : 'v1', 310, -170)
  x.textAlign = 'left'; x.font = "italic 500 62px 'EB Garamond', serif"; x.fillStyle = '#3a2a6a'
  LYRICS.forEach(([s, t0], j) => {
    const n = Math.max(0, Math.floor((t - t0) * 26))
    x.fillText(s.slice(0, n), -250, -84 + j * 82)
  })
  // Virgo's edit: strike "your" in line 3, write "you’re" above it, a heart in the margin
  const y3 = -84 + 2 * 82
  const sp = prog(t, EDIT.strike, EDIT.strike + 0.3)
  if (sp > 0) { x.strokeStyle = '#e23d66'; x.lineWidth = 5; x.beginPath(); x.moveTo(-252, y3 + 2); x.lineTo(-252 + 108 * sp, y3 - 2); x.stroke() }
  const wn = Math.floor(prog(t, EDIT.write, EDIT.write + 0.4) * 6)
  if (wn > 0) { x.save(); x.font = "italic 600 40px 'EB Garamond', serif"; x.fillStyle = '#e23d66'; x.rotate(-0.04); x.fillText('you’re'.slice(0, wn), -262, y3 - 44); x.restore() }
  if (t > EDIT.heart) drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#e23d66' }, -300, y3 + 4, 6 * easeOutBack(prog(t, EDIT.heart, EDIT.heart + 0.3), 2.2), { outline: null })
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
