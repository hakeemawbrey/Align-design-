// st9pisceswork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E57 · Pisces 2/5 9 TO 5) · story 0–20.6, end card.
//   HOOK   "A Pisces' playlist made the whole office *cry.*"  Frame 0: the home desk, Pisces swaying with its eyes shut, the
//          video call on the laptop full of crying coworkers, pixel tears flying.
//   3.6    the playlist: "songs for a tuesday": rain on a bus window · your mum's lasagna · the dog waited for you ·
//          soft (instrumental). "10:12 AM — shared my *focus* playlist."
//   7.6    the call, full screen: Taurus sobbing, Aries wide-eyed and leaking, Virgo dabbing, Capricorn stone-faced… then
//          one tear. CAPRICORN: "i'm not crying. it's *allergies.*"
//   11.6   PISCES: "it's okay to feel it. even at *work.*"  ★ ASTROLOGY SAYS: Pisces is the natural ruler of the 12th
//          house (dreams, the hidden, rest). The four of them smile through it.
//   15.6   frame 0's framing: the same call, now four happy faces and a heart, Pisces smiling.
//          Last line: "Soft is a *skill.*"
//   Rewatch bait: track 4 is by "the two cats"; the lyric board says SONG #212.  Ghost: from the window frame (left).
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

export const DURATION = 25
const SIGN = 'pisces', EPI = 1, NUMERAL = 'S9 E57', KEY = 'Bb'
const HOME = drawPiscesHome
const GOLD = '#f2c75c', PC = '#b9b3ff', CAPC = '#5fe0b8'
const BATTERY = [0.8, 0.7]
const PIN = '♓ PISCES', CAPN = '♑ CAPRICORN'
const PITCH = { [PIN]: 880, [CAPN]: 440 }

const HOOK = { text: 'A Pisces’ playlist made the whole office *cry.*', out: 3.4, color: PC }
const HOURS = [[0, 10], [7.6, 10.4], [15.6, 11.2], [20.6, 11.3]]
const SHOTS = [
  { at: 0, room: 'desk', cam: [1.1, 600, 830] },
  { at: 3.6, room: 'desk', cam: [1.3, 560, 1040] },
  { at: 7.6, room: 'desk', cam: [1.3, 560, 1040] },
  { at: 11.6, room: 'desk', cam: [1.35, 480, 1080] },
  { at: 15.6, room: 'desk', cam: [1.1, 600, 830] },
]
const PUNCH = [
  { at: 1.8, dur: 1.3, z: 0.07, x: 600, y: 900 },
  { at: 13.4, dur: 1.2, z: 0.12, x: 480, y: 1080 },
  { at: 17.4, dur: 1.3, z: 0.07, x: 600, y: 900 },
]
const CLOCK = [
  { from: '10:08', to: '10:08', at: -2, dur: 1 },
  { from: '10:08', to: '10:12', at: 3.6, dur: 0.4 },
  { from: '10:12', to: '10:30', at: 7.6, dur: 0.5 },
  { from: '10:30', to: '11:15', at: 15.6, dur: 0.6 },
]
const STAMPS = [
  { at: 0.8, out: 3.35, time: '10:08 AM', text: 'team call. i hit *play.*', accentColor: PC },
  { at: 4.0, out: 7.45, time: '10:12 AM', text: 'shared my *focus* playlist.', accentColor: PC },
  { at: 16.0, out: 20.35, time: '11:15 AM', text: 'best meeting *ever.*', accentColor: PC },
]
const LINES = [
  { t: 10.3, speaker: CAPN, text: 'i’m not crying. it’s *allergies.*', color: CAPC },
  { t: 12.0, speaker: PIN, text: 'it’s okay to feel it. even at *work.*', color: PC },
]
const BOX = { open: 10.1, close: 15.4 }
const FACTS = [{ text: 'Pisces is the natural ruler of the 12th house (dreams, the hidden, rest).', at: 12.2, dur: 3.1, y: 318, label: '★ ASTROLOGY SAYS', color: PC }]
const LAST = { at: 17.0, text: 'Soft is a *skill.*', color: PC }
export const GHOST = { room: 'desk', at: 5.4, x: 640, y: 760, from: 'left', where: 'leaning out from the window frame behind the desk while the playlist plays' }
const CUTS = [{ t: 7.6, kind: 'flip' }, { t: 15.6, kind: 'deal' }]

const TRACKS = [
  { text: 'rain on a bus window', from: 'piano + you', at: 3.8 },
  { text: 'your mum’s lasagna', from: 'strings', at: 4.9 },
  { text: 'the dog waited for you', from: 'a single cello', at: 5.9 },
  { text: 'soft (instrumental)', from: 'the two cats', at: 6.8 },
]
const PHONE = [3.7, 7.5]
const GRID = [7.65, 15.5]
const EXTRA_CUES = [
  ...TRACKS.map(tr => ['pluck', tr.at, 880, 0.025, 0.8, 0.2]), ['pop', PHONE[0], 880, 0.035, 0], ['whoosh', PHONE[1] - 0.1, 0.25, 0.02],
  ['pop', GRID[0] + 0.05, 659.25, 0.035, 0], ...[0, 1, 2, 3].map(i => ['pop', +(GRID[0] + 0.15 + i * 0.12).toFixed(2), [783.99, 880, 987.77, 1046.5][i], 0.025, (i % 2 ? 0.3 : -0.3)]),
  ['tick', 10.05, 0.05], ['bell', 10.1, 2093, 0.02, 1.2, 0.3],
  ['glitter', 14.0, 14.8], ['glitter', 15.7, 16.5],
]

// ── the cast
const PS = signStar('pisces')
const HOPS = [0.2, 1.8, 3.7, ...talkHops(LINES, PIN, { cps: 28 }), 15.7]
function pisces(x, t, X, Y, o = {}) { return drawStarChar(x, X, Y, o.size ?? 280, t, { color: PS.color, glyph: PS.glyph, seed: 12, hops: HOPS, glow: 0.9, ...o }) }
const R = Math.round
const rect = (x, X, Y, w, h, c) => { x.fillStyle = c; x.fillRect(R(X), R(Y), R(w), R(h)) }
const MNOTE = ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.']
function notes(x, t, cx, cy) {
  for (let i = 0; i < 3; i++) { const p = (t * 0.5 + i / 3) % 1; drawBits(x, MNOTE, { X: ['#c9a6ff', '#5fd6c4', '#ff9fb8'][i] }, R(cx - 140 - p * 100 + Math.sin(p * 8 + i) * 14), R(cy - 80 - p * 200), 6, { alpha: Math.sin(Math.PI * p) }) }
}
function tears(x, t, X, Y, s, k = 1, seed = 0) {
  if (k <= 0) return
  for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) {
    const p = (t * 1.6 + i * 0.5 + seed * 0.37 + (sd > 0 ? 0.25 : 0)) % 1
    x.save(); x.globalAlpha = k * (1 - p * 0.7); rect(x, X + sd * (s * 0.14 + p * s * 0.22) - s * 0.04, Y + p * s * 0.5, s * 0.08, s * 0.12, '#120c26'); rect(x, X + sd * (s * 0.14 + p * s * 0.22) - s * 0.03, Y + p * s * 0.5 + s * 0.01, s * 0.06, s * 0.1, '#8fd8ff'); x.restore()
  }
}
// the coworkers on the call: who, mood before / after Capricorn's tear, and whether they're crying
const TEAM = [
  { id: 'taurus', name: 'TAURUS', cry: 1 }, { id: 'aries', name: 'ARIES', cry: 1 },
  { id: 'virgo', name: 'VIRGO', cry: 1 }, { id: 'capricorn', name: 'CAPRICORN', cry: 0 },
]
function teamState(m, t) {
  if (t >= 15.6) return { mood: 'happy', cry: 0 }
  if (t >= 13.4) return { mood: 'happy', cry: 0.5 }
  if (m.id === 'capricorn') return t < 10.0 ? { mood: 'squint', cry: 0 } : { mood: 'wide', cry: 0.5, blink: false }
  return { mood: m.id === 'aries' ? 'wide' : 'squint', cry: 1, blink: m.id === 'aries' ? false : undefined }
}
/** the 2 × 2 video-call grid inside the rect (X, Y, W, H) */
function callGrid(x, t, X, Y, W, H, big) {
  rect(x, X - 6, Y - 6, W + 12, H + 12, '#120c26')
  const tw = (W - 10) / 2, th = (H - 10) / 2
  TEAM.forEach((m, i) => {
    const tx = X + (i % 2) * (tw + 10), ty = Y + Math.floor(i / 2) * (th + 10)
    rect(x, tx, ty, tw, th, ['#2a2050', '#24305a', '#30264f', '#1f3a40'][i])
    const st = signStar(m.id), s = teamState(m, t), sz = Math.min(tw, th) * 0.62
    x.save(); x.beginPath(); x.rect(tx, ty, tw, th); x.clip()
    const r = drawStarChar(x, tx + tw / 2, ty + th * 0.55, sz, t, { color: st.color, glyph: big ? st.glyph : null, mood: s.mood, blink: s.blink, seed: 20 + i, glow: 0.5, bob: big ? undefined : 0 })
    tears(x, t, r.x, r.y - sz * 0.05, sz, s.cry, i)
    if (t >= 15.6 && i === 3) drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, tx + tw - 24, ty + 26, big ? 7 : 3)
    x.restore()
    if (big) { x.save(); x.font = "700 20px 'Space Mono', monospace"; x.textAlign = 'left'; x.textBaseline = 'middle'; rect(x, tx + 8, ty + th - 36, x.measureText(m.name).width + 16, 28, 'rgba(6,4,18,0.7)'); x.fillStyle = '#efe6d6'; x.fillText(m.name, tx + 16, ty + th - 22); x.restore() }
  })
}
function scene(x, t, sh) {
  const i = SHOTS.indexOf(sh)
  // the laptop's screen (the home desk draws a laptop at 560…790 × 960…1100): the call, small
  callGrid(x, t, 566, 966, 218, 128, false)
  const r = pisces(x, t, 330, 1190, {
    mood: i === 0 ? 'sleepy' : i === 3 ? 'sparkle' : i === 4 ? 'happy' : 'neutral', zzz: false,
    look: i === 0 || i === 4 ? [1, -0.2] : [1, 0],
  })
  if (i <= 1) notes(x, t, r.x + 300, r.y)
  // its earbuds
  rect(x, r.x - r.size * 0.38, r.y - r.size * 0.05, 14, 18, '#efe6d6'); rect(x, r.x + r.size * 0.36, r.y - r.size * 0.05, 14, 18, '#efe6d6')
}
function overlay(x, t) {
  if (t >= PHONE[0] && t <= PHONE[1]) {
    const pop = easeOutBack(prog(t, PHONE[0], PHONE[0] + 0.35), 2) * (1 - ease.inCubic(prog(t, PHONE[1] - 0.3, PHONE[1])))
    phoneScreen(x, t, { x: 760, y: 880, w: 400, h: 700, app: 'playlist', title: 'songs for a tuesday', lines: TRACKS, clock: '10:12', pop: clamp(pop, 0, 1.2), rot: 0.05, accent: '#7c74f0' })
  }
  if (t >= GRID[0] && t <= GRID[1]) {
    const k = easeOutBack(prog(t, GRID[0], GRID[0] + 0.35), 1.8) * (1 - ease.inCubic(prog(t, GRID[1] - 0.3, GRID[1])))
    const pz = 1 + 0.18 * ease.outCubic(prog(t, 10.0, 10.2)) * (1 - ease.inOutQuad(prog(t, 11.1, 11.5)))
    x.save(); x.translate(540, 820); x.scale(k * pz, k * pz)
    // zoom toward Capricorn's tile during the tear
    const cz = ease.outCubic(prog(t, 10.0, 10.2)) * (1 - ease.inOutQuad(prog(t, 11.1, 11.5)))
    x.translate(-cz * 120, -cz * 80)
    callGrid(x, t, -440, -300, 880, 600, true)
    x.restore()
  }
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
