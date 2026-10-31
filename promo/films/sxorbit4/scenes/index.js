// sxorbit4 — ORBIT · Ep 4: "We Need to Talk." (45 s vertical Align ad, Star Talk Shows · ORBIT, music: jazzy, B♭).
// A star soap opera. Cast (STARTALK-SHOWS.md): EMBER (♈ Aries, signStar('aries') red, bold), TIDE (♋ Cancer, signStar('cancer'),
// shy, hides in a tiny pixel shell), PISCES (crying in the back, as always). Story 0–40.6, then the shared end card.
//   0.00–1.10  PREVIOUSLY ON ORBIT… (pink duotone, scanlines): Ember wide-eyed, Tide in the shell, a talk card at its door,
//              and the shell's reply "…we need to talk."
//   1.10–4.85  The reply hangs there. Three soap-opera snap-zooms on Ember (DUN · DUN · DUNNN). "The four scariest | words in *orbit.*"
//   4.95–11.8  "Ember *spirals.*"  Rule of three, each with a thought bubble and a crash-zoom:
//              "is it the comet?" (Streak) → "is it my 10K runs?" (Ember jogging) → "is it my FACE?!" → the zoom lands on PISCES, sobbing.
//  11.90       card cut.
//  11.95–17.8  "Cue the *violins.*"  A tiny violinist star plays heartbreak. Tide peeks over the rim; the talk card lifts and
//              flips: "What are you scared to say?"  TIDE: "I like you a lot."  (Ember braces.)  TIDE: "…and that scares me."
//  17.82       RECORD SCRATCH. The violin string pings off. Ember's eyes turn to hearts; it faints from happiness (THUD).
//              "Fainted. | *From joy.*"  Pisces: a tissue fountain.  EMBER (from the floor): "you like me? I like you too!"  Up it springs.
//  23.50       card cut.  23.93 ★ LESSON UNLOCKED: "Say the *scary* | true thing. | It's usually | the kind one."  +1 VULNERABLE
//  28.60–34.7  "Next step: | *the friends.*"  EMBER: "then… meet my friends?" "the whole *constellation?*" — five loud fire signs
//              pop up behind it yelling HI. Tide dives into the shell… and pops back up: "the whole *what?*"
//  34.70       FREEZE (crash-zoom, pink tint). "The whole *what?*"
//  36.15       card cut → the pink "NEXT TIME ON Orbit…" card. Fades to the plain sky for the end card.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { makeTalkCard, rgba, drawViolin, flyingTissue, drawBubble } from './props.js'
import { drawTide, drawPisces, drawStreak, drawStreakTail, drawFreeze, showBug, buildPreviously, buildNextTime, starFrame, inSprite } from '../../sxorbit1/scenes/orbit.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', ORBIT_PINK = '#ff7eb6', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236', ROSE = '#ff6b9a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const ARI = signStar('aries'), CAN = signStar('cancer'), PIS = signStar('pisces')
const FRIENDS = [signStar('leo'), signStar('sagittarius'), signStar('aries'), signStar('leo'), signStar('sagittarius')]

// ── the timeline
const T = {
  black: [0, 0.12], prevOut: [0.98, 1.1],
  z: [BEAT(2), BEAT(3), BEAT(4)], pull: [3.5, 3.95], hookBubbleOut: [4.6, 4.8],
  // panic
  open1: 5.05, l1: 5.25, b1: 5.3, z1: BEAT(10), l2: 7.4, b2: 7.45, z2: BEAT(14), l3: 9.6, b3: 9.65, z3: BEAT(18), close1: 11.7,
  cut1: 11.9,
  // the turn
  violin: 12.1, play: [BEAT(21), BEAT(31)], peek: [12.8, 13.3], cardUp: [13.3, 13.85], open2: 14.0, lA: 14.2, brace: [14.9, 17.82], lB: 16.4,
  scratch: BEAT(31), hearts: 17.95, comeOut: [19.45, 19.95], topple: [18.3, 18.75], thud: 18.75, close2: 18.7, cardOff: [17.85, 18.3],
  // relief
  open3: 20.0, lC: 20.2, springUp: [21.65, 22.1], tideBlush: 21.9, close3: 23.0,
  cut2: 23.5,
  lesson: BEAT(42), lessonOut: [28.3, 28.5],
  cut3: 28.6,
  // cliffhanger
  open4: 28.8, l4: 29.0, l5: 31.6, friends: 32.0, dive: [32.2, 32.45], resurface: [33.65, 33.95], l6: 34.0, freeze: 34.7, close4: 36.1,
  cut4: 36.15, next: 36.22, nextOut: [39.95, 40.4], out: [39.9, 40.4],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Say the *scary* | true thing. | It’s usually | the kind one.', chip: '+1 VULNERABLE' }

// ── the dialogue
const ET = '♈︎ EMBER', TT = '♋︎ TIDE'
const EC = '#ff9a7a', TC = '#8fdcff'
const LINES1 = [
  { t: T.l1, speaker: ET, color: EC, text: 'is it *the comet?*' },
  { t: T.l2, speaker: ET, color: EC, text: 'is it my *10K runs?*' },
  { t: T.l3, speaker: ET, color: EC, text: 'is it my *FACE?!*' },
]
const LINES2 = [
  { t: T.lA, speaker: TT, color: TC, text: 'I like you *a lot.*' },
  { t: T.lB, speaker: TT, color: TC, text: '…and that *scares* me.' },
]
const LINES3 = [{ t: T.lC, speaker: ET, color: EC, text: 'you like me? I like you *too!*' }]
const LINES4 = [
  { t: T.l4, speaker: ET, color: EC, text: 'then… meet my friends?' },
  { t: T.l5, speaker: ET, color: EC, text: 'the whole *constellation?*' },
  { t: T.l6, speaker: TT, color: TC, text: 'the whole *what?*' },
]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const CPS = 28

// ── headlines
const HEADS = [
  { text: 'The four scariest | words in *orbit.*', top: 160, size: 92, accentSize: 140, at: 2.95, gap: 0.08, late: 1, lateAt: 3.4, accentColor: ORBIT_PINK, out: [4.6, 4.8], fit: true },
  { text: 'Ember *spirals.*', top: 170, size: 112, accentSize: 164, at: 4.95, late: 1, lateAt: 5.15, accentColor: ROSE, out: [11.6, 11.8] },
  { text: 'Cue the *violins.*', top: 170, size: 108, accentSize: 160, at: 11.98, gap: 0.08, late: 1, lateAt: 12.27, accentColor: LAV, out: [13.55, 13.75] },
  { text: '“What are you | *scared* to say?”', top: 150, size: 96, accentSize: 150, at: 13.85, gap: 0.07, late: 3, lateAt: 14.1, lateGap: 0.1, accentColor: ORBIT_PINK, out: [17.55, 17.75], fit: true },
  { text: 'Fainted. | *From joy.*', top: 150, size: 112, accentSize: 168, at: 18.9, late: 2, lateAt: 19.25, lateGap: 0.12, accentColor: ORBIT_PINK, out: [23.15, 23.35] },
  { text: 'Next step: | *the friends.*', top: 150, size: 100, accentSize: 150, at: 28.66, gap: 0.08, late: 2, lateAt: 28.95, lateGap: 0.12, accentColor: GOLD, out: [31.75, 31.95], fit: true },
  { text: 'The whole *what?*', top: 170, size: 112, accentSize: 176, at: T.freeze + 0.05, gap: 0.08, late: 1, lateAt: T.freeze + 0.3, accentColor: ORBIT_PINK, out: [36.0, 36.15] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const frz = t => Math.min(t, T.freeze)          // the cliffhanger freeze-frame: everything stops

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, step: x => (x >= 1 ? 1 : 0) }
const IDN = [1, 540, 960, 540, 960]
const ECU = (z, fx = 300, fy = 1070, sx = 540, sy = 1020) => [z, fx, fy, sx, sy]
const CAM = [
  [0, ...IDN],
  [T.z[0], ...IDN, 'lin'], [T.z[0] + 0.1, ...ECU(1.55), 'out'],
  [T.z[1], ...ECU(1.6), 'lin'], [T.z[1] + 0.1, ...ECU(2.15), 'out'],
  [T.z[2], ...ECU(2.22), 'lin'], [T.z[2] + 0.1, ...ECU(2.9), 'out'],
  [T.pull[0], ...ECU(3.0), 'lin'], [T.pull[1], ...IDN, 'io'],
  [T.z1, ...IDN, 'lin'], [T.z1 + 0.1, ...ECU(2.2), 'out'], [7.0, ...ECU(2.28), 'lin'], [7.25, ...IDN, 'out'],
  [T.z2, ...IDN, 'lin'], [T.z2 + 0.1, ...ECU(2.6), 'out'], [9.2, ...ECU(2.7), 'lin'], [9.45, ...IDN, 'out'],
  [T.z3, ...IDN, 'lin'], [T.z3 + 0.1, ...ECU(2.6, 950, 1330, 540, 1050), 'out'], [11.35, ...ECU(2.68, 950, 1330, 540, 1050), 'lin'], [11.6, ...IDN, 'out'],
  [T.scratch, ...IDN, 'lin'], [T.scratch + 0.1, ...ECU(1.9), 'out'], [18.25, ...ECU(1.95), 'lin'], [18.6, ...IDN, 'io'],
  [T.freeze, ...IDN, 'lin'], [T.freeze + 0.12, ...ECU(1.9, 790, 1060, 540, 1080), 'out'], [36.2, ...ECU(2.0, 790, 1060, 540, 1080), 'lin'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}
const toS = (C, wx, wy, s = 0) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z, s: s * C.z })
const SNAPS = [...T.z, T.z1, T.z2, T.z3, T.scratch, T.freeze]
const DRAMA = [[T.z[0], T.pull[0], 1], [T.z1, 7.1, 0.8], [T.z2, 9.3, 0.9], [T.z3, 11.45, 0.7], [T.play[0], T.scratch, 0.45], [T.freeze, 40.2, 0.9]]
const dramaK = t => DRAMA.reduce((m, [a, b, k]) => Math.max(m, k * clamp((t - a) / 0.1) * (1 - prog(t, b, b + 0.3))), 0)

// ── cast positions & sizes
const EMB = { x: 300, y: 1060 }, S_EMB = 300
const TID = { x: 790, y: 1030 }, S_TID = 270
const PIS_AT = { x: 900, y: 1318, s: 118 }, TISSUE_AT = { x: 965, y: 1368 }
const VIO_AT = { x: 900, y: 560, s: 150 }
const FR_AT = [{ x: 140, y: 590 }, { x: 320, y: 500 }, { x: 540, y: 462 }, { x: 760, y: 500 }, { x: 940, y: 590 }]

// hide: 1 = all the way in the shell
// Group A's kit: hide 1 = only the shell shows; peek = eyes in the doorway; thump = a heartbeat over the shell
function tideHide(t) {
  if (t < T.comeOut[0]) return 1
  if (t < T.dive[0]) return 1 - ease.inOutCubic(prog(t, ...T.comeOut))
  return ease.inCubic(prog(t, ...T.dive))
}
function tidePeek(t) {
  if (t < T.comeOut[0]) return t < T.peek[0] ? (inR(t, 1.1, T.z[0]) || inR(t, T.l1, T.close1) ? 1 : 0.55) : clamp(0.55 + prog(t, ...T.peek))
  if (t < T.resurface[0]) return 0
  return ease.outBack(prog(t, ...T.resurface))
}
const tideThump = t => (inR(t, T.lA, T.comeOut[0]) ? 0.55 + 0.45 * Math.max(0, Math.sin((t - T.lA) * TAU * 1.6)) : 0) + (inR(t, T.lB, T.scratch) ? 0.3 : 0)
function tideState(t) {
  const st = { mood: 'neutral', look: [-1, 0], blink: undefined, blush: undefined, shellLook: [-1, 0], shellBlink: 0, shake: 0 }
  // shell eyes while hidden
  st.shellBlink = (t % 2.7) < 0.14 ? 1 : 0
  if (t < T.comeOut[0]) {
    st.shellLook = t < T.z[0] ? [-1, 0] : inR(t, T.l1, T.z3) ? [-1, -1] : t >= T.scratch ? [-1, 1] : [-1, 0]
    st.shake = inR(t, T.b1, T.close1) ? 0.4 : inR(t, T.hearts, T.comeOut[0]) ? 0.6 : 0
    return st
  }
  if (t < T.lC) { st.mood = 'wide'; st.look = [-1, 1]; return st }
  if (t < T.tideBlush) { st.mood = 'sparkle'; st.look = [-1, 1]; return st }
  if (t < T.cut3) { st.mood = 'happy'; st.blush = 1; return st }
  if (t < T.friends) { st.mood = 'sparkle'; st.look = [-1, 0]; st.blush = 0.8; return st }
  if (t < T.resurface[0]) { st.shake = t > T.dive[1] ? 1 : 0; return st }
  st.shellLook = [-1, -1]; st.shake = 0.3
  return st
}
function emberState(t) {
  const st = { mood: 'neutral', look: [1, 0], blink: undefined, blush: undefined, sweat: 0, rot: 0, dy: 0, squash: 0 }
  if (t < T.z[0]) { st.mood = 'wide'; st.look = [1, 0]; st.blink = false; return st }
  if (t < T.pull[1]) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; st.sweat = 1; return st }
  if (t < T.l1) { st.mood = 'wide'; st.look = [1, 0]; st.sweat = 1; return st }
  if (t < T.cut1) { st.mood = inR(t, T.z1, 7.1) || inR(t, T.z2, 9.3) ? 'wide' : 'wide'; st.look = inR(t, T.z1, 7.1) || inR(t, T.z2, 9.3) ? [0, 0] : [1, -1]; st.blink = false; st.sweat = 2; return st }
  if (t < T.lA) { st.mood = 'wide'; st.look = [1, -1]; st.sweat = 1; return st }
  if (t < T.brace[0]) { st.mood = 'wide'; st.look = [1, 0]; st.blink = false; return st }
  if (t < T.lB) { st.mood = 'squint'; st.squash = 0.06 + 0.02 * Math.sin(t * 30); st.sweat = 2; return st }
  if (t < T.scratch) { st.mood = 'squint'; st.squash = 0.09 + 0.02 * Math.sin(t * 36); st.sweat = 2; return st }
  if (t < T.hearts) { st.mood = 'wide'; st.look = [1, 0]; st.blink = false; return st }
  if (t < T.springUp[0]) {
    const p = ease.inQuad(prog(t, ...T.topple)), land = t - T.thud
    st.mood = 'heart'; st.rot = -1.5 * p; st.dy = 165 * p
    if (land > 0 && land < 0.5) st.squash = 0.18 * Math.exp(-land * 9) * Math.cos(land * 26)
    return st
  }
  if (t < T.springUp[1]) { const p = ease.outBack(prog(t, ...T.springUp)); st.mood = 'happy'; st.rot = -1.5 * (1 - p); st.dy = 165 * (1 - p) - Math.sin(Math.PI * prog(t, ...T.springUp)) * 80; return st }
  if (t < T.cut2) { st.mood = 'heart'; return st }
  if (t < T.cut3) { st.mood = 'happy'; return st }
  if (t < T.l6) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  st.mood = 'happy'; st.look = [1, 0]
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [-1, -1], tears: 1, hank: 0, squash: 0 }
  if (t < T.z3) return st
  if (t < T.cut1) { st.tears = 2; st.mood = 'sparkle'; st.look = [0, 0]; st.hank = Math.floor(t * 6) % 2 ? 1 : -1; return st }
  if (t < T.scratch) { st.tears = 1; st.look = [-1, 0]; return st }
  if (t < T.cut2) { st.tears = 3; st.mood = 'happy'; st.squash = 0.06 * Math.sin(t * 22); return st }
  if (t < T.cut3) { st.tears = 2; st.mood = 'happy'; return st }
  if (t < T.friends) { st.tears = 1; return st }
  st.mood = 'wide'; st.tears = 2; st.look = [-1, -1]
  return st
}

// talk hops
const E_HOPS = [...talkHops(ALL_LINES, ET, { cps: CPS }), T.springUp[1], T.cut2 + 0.3, T.friends]
const T_HOPS = [...talkHops(ALL_LINES, TT, { cps: CPS }), T.tideBlush]
const PIS_HOPS = [T.z3 + 0.12, T.scratch + 0.2, T.scratch + 0.6, T.scratch + 1.0, T.scratch + 1.4, T.friends + 0.1]
const FR_HOPS = [0, 1, 2, 3, 4].map(k => [T.friends + k * 0.12, T.friends + 0.6 + k * 0.1, T.friends + 1.2 + k * 0.08, T.l6 - 0.3])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 54px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "italic 600 220px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "400 21px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [lovers, cardBack] = await Promise.all([loadImg('card-talk-6.png'), loadImg('card-back.png')])
  const TALK = makeTalkCard(document, lovers, ['What are you', 'scared to say?'])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, open: T.open4, close: T.close4 }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.62 })
  const prev = buildPreviously(root, { at: 0, len: 1.1 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, top: 560 })
  const bug = showBug(root, 4)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const stroked = (c, txt, X, Y, size, col, lw = 10, font = MONO, weight = 700) => { c.font = `${weight} ${size}px ${font}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round'; c.lineWidth = lw; c.strokeStyle = INK; c.strokeText(txt, X, Y); c.fillStyle = col; c.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  // sweat drops (sprite cells, upper right of the face)
  function sweatCells(t, k) {
    const drop = (i, j) => { x.fillStyle = INK; x.fillRect(i - 0.2, j - 0.2, 1.4, 2.0); x.fillStyle = '#9fe6ff'; x.fillRect(i, j, 1, 1.6); x.fillStyle = '#fff'; x.fillRect(i, j, 0.5, 0.5) }
    for (let q = 0; q < k; q++) { const ph = ((t * 1.3 + q * 0.5) % 1); drop(27 + q * 2.5, 11 + ph * 7) }
  }

  // ═══════════════════════ effects ═══════════════════════
  function dramaFx(t) {
    const k = dramaK(t)
    if (k > 0.01) {
      const g = x.createRadialGradient(540, 1000, 300, 540, 1000, 1180)
      g.addColorStop(0, 'rgba(150,10,74,0)'); g.addColorStop(0.55, `rgba(150,10,74,${0.2 * k})`); g.addColorStop(1, `rgba(56,0,30,${0.75 * k})`)
      x.fillStyle = g; x.fillRect(0, 0, W, H)
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.15 * k
      const lx = 540 + Math.sin(t * 0.9) * 380, lg = x.createLinearGradient(lx - 260, 0, lx + 260, 0)
      lg.addColorStop(0, 'rgba(255,120,180,0)'); lg.addColorStop(0.5, 'rgba(255,150,200,1)'); lg.addColorStop(1, 'rgba(255,120,180,0)')
      x.fillStyle = lg; x.save(); x.translate(lx, 960); x.rotate(-0.35); x.fillRect(-260, -1400, 520, 2800); x.restore()
      x.restore()
    }
    for (const s of SNAPS) {
      const dt = t - s
      if (dt < 0 || dt > 0.34) continue
      const a = 1 - dt / 0.34, r = rng(Math.round(s * 100))
      x.save(); x.globalAlpha = 0.5 * a; x.strokeStyle = '#fff1f6'; x.lineCap = 'round'
      for (let i = 0; i < 44; i++) {
        const ang = r() * TAU, r0 = 300 + r() * 240 + dt * 900, len = 420 + r() * 700
        x.lineWidth = 2 + r() * 6
        x.beginPath(); x.moveTo(540 + Math.cos(ang) * r0, 1030 + Math.sin(ang) * r0); x.lineTo(540 + Math.cos(ang) * (r0 + len), 1030 + Math.sin(ang) * (r0 + len)); x.stroke()
      }
      x.restore()
      if (dt < 0.09) { x.fillStyle = `rgba(255,240,246,${0.22 * (1 - dt / 0.09)})`; x.fillRect(0, 0, W, H) }
    }
  }

  // ═══════════════════════ the cast (through the camera) ═══════════════════════
  function drawEmber(t, C, k) {
    const tt = frz(t), st = emberState(tt), P = toS(C, EMB.x, EMB.y + st.dy, S_EMB)
    let squash = st.squash
    for (const s of [...T.z, T.z1, T.z2]) { const d = tt - s; if (d >= 0 && d < 0.45) squash += 0.13 * Math.exp(-d * 9) * Math.cos(d * 24) }
    const opts = { color: ARI.color, glyph: ARI.glyph, mood: st.mood, look: st.look, blink: st.blink, blush: st.blush, squash, hops: E_HOPS, seed: 3, pop: k }
    x.save(); x.translate(P.x, P.y); if (st.rot) x.rotate(st.rot)
    drawStarChar(x, 0, 0, P.s, tt, opts)
    if (st.sweat) inSprite(x, starFrame(0, 0, P.s, tt, opts), () => sweatCells(tt, st.sweat))
    x.restore()
    // hearts circling the fainted head
    if (inR(tt, T.thud, T.springUp[0] + 0.1)) {
      const hc = toS(C, EMB.x - 150, EMB.y + 165 - 40)
      for (let i = 0; i < 4; i++) { const a = tt * 3.2 + i * TAU / 4, hx = hc.x + Math.cos(a) * 95 * C.z, hy = hc.y + Math.sin(a) * 30 * C.z - 60 * C.z; x.fillStyle = i % 2 ? PINK : '#ff4f7e'; pixHeart(hx, hy, 6 * C.z) }
    }
    return P
  }
  function pixHeart(cx, cy, c) {
    const R = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
    const fs = x.fillStyle
    R.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { x.fillStyle = INK; x.fillRect(cx + (i - 3.5) * c - 1, cy + (j - 3) * c - 1, c + 2, c + 2) } }))
    x.fillStyle = fs
    R.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') x.fillRect(cx + (i - 3.5) * c, cy + (j - 3) * c, c, c) }))
  }
  function drawTideAt(t, C, k) {
    const tt = frz(t), st = tideState(tt), P = toS(C, TID.x, TID.y, S_TID)
    drawTide(x, P.x, P.y, P.s, tt, { hide: tideHide(tt), peek: tidePeek(tt), peekLook: st.shellLook, thump: tideThump(tt), mood: st.mood, look: st.look, blink: st.blink, blush: st.blush, hops: T_HOPS, pop: k, shake: st.shake })
    // a tiny heart floats up from Tide when it blushes
    const hk = tt - T.tideBlush
    if (hk > 0 && hk < 1.4) { x.save(); x.globalAlpha = 1 - prog(hk, 1.0, 1.4); x.fillStyle = '#ff4f7e'; pixHeart(P.x + 40 * C.z, P.y - (150 + hk * 120) * C.z, 7 * C.z * easeOutBack(prog(hk, 0, 0.3), 2.5)); x.restore() }
  }
  function drawPiscesAt(t, C, k) {
    const tt = frz(t), st = pisState(tt), P = toS(C, PIS_AT.x, PIS_AT.y, PIS_AT.s)
    drawPisces(x, P.x, P.y, P.s, tt, { mood: st.mood, look: st.look, squash: st.squash, hops: PIS_HOPS, pop: k, tears: st.tears, hank: st.hank, pull: bump(tt, T.scratch + 0.2, 0.4) + bump(tt, T.thud, 0.4) })
    // the tissue fountain
    for (const [tb, n] of [[T.scratch + 0.2, 10], [T.thud, 8]]) {
      const dt = tt - tb
      if (dt < 0 || dt > 1.6) continue
      const r = rng(Math.round(tb * 10))
      for (let i = 0; i < n; i++) {
        const vx = (r() * 2 - 1.3) * 300, vy = -(560 + r() * 520), sp = (r() * 2 - 1) * 9
        const wx = TISSUE_AT.x + vx * dt, wy = TISSUE_AT.y - 30 + vy * dt + 0.5 * 1500 * dt * dt
        if (wy > 1500) continue
        const S = toS(C, wx, wy)
        x.globalAlpha = clamp((1.6 - dt) / 0.4); flyingTissue(x, S.x, S.y, 6 * C.z, sp * dt); x.globalAlpha = 1
      }
    }
  }
  function drawViolinist(t, C) {
    if (t < T.violin || t > T.cut2) return
    const tt = frz(t), k = pop01(tt, T.violin, 0.36, 2.2) * (1 - ease.inCubic(prog(tt, T.lC, T.lC + 0.35)))
    if (k <= 0.01) return
    const snapped = tt >= T.scratch, P = toS(C, VIO_AT.x, VIO_AT.y, VIO_AT.s)
    const play = inR(tt, T.play[0], T.scratch) ? 1 : 0
    const sway = play ? 0.12 * Math.sin(tt * 3.2) : 0
    x.save(); x.translate(P.x, P.y); x.rotate(sway)
    drawStarChar(x, 0, 0, P.s * k, tt, { color: STAR.sky, mood: snapped ? 'wide' : play ? 'sleepy' : 'neutral', zzz: false, look: snapped ? [-1, 0] : [0, 0], blink: snapped ? false : undefined, seed: 21, squash: snapped ? 0.12 * Math.exp(-(tt - T.scratch) * 6) * Math.cos((tt - T.scratch) * 24) : 0 })
    drawViolin(x, -P.s * 0.42 * k, P.s * 0.14 * k, 5.6 * C.z * k, tt, { rot: -0.75, play, snapped: snapped ? prog(tt, T.scratch, T.scratch + 0.3) : 0 })
    x.restore()
    // notes drifting up while it plays; PLINK at the snap
    if (play) for (let i = 0; i < 3; i++) { const ph = (tt * 0.7 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph) * 0.9; stroked(x, i % 2 ? '♪' : '♫', P.x - 140 + i * 40 + Math.sin(ph * 6) * 20, P.y - 90 - ph * 140, 44 * C.z, LAV, 8, INTER, 800); x.globalAlpha = 1 }
    const pk = tt - T.scratch
    if (pk >= 0 && pk < 1.0) { x.save(); x.globalAlpha = 1 - prog(pk, 0.7, 1.0); x.translate(P.x - 110, P.y - 130 - pk * 30); const s = easeOutBack(prog(pk, 0, 0.2), 3); x.scale(s, s); x.rotate(-0.12); stroked(x, 'PLINK.', 0, 0, 46, GOLD, 12); x.restore() }
  }
  function drawFriends(t, C) {
    if (t < T.friends) return
    const tt = frz(t)
    const ks = FR_AT.map((_, i) => pop01(tt, T.friends + i * 0.12, 0.34, 2.4))
    // constellation lines
    x.save(); x.strokeStyle = rgba(GOLD, 0.75); x.lineWidth = 5; x.setLineDash([14, 10])
    for (let i = 0; i < FR_AT.length - 1; i++) {
      const p = clamp((tt - T.friends - 0.25 - i * 0.1) / 0.25)
      if (p <= 0) continue
      const a = toS(C, FR_AT[i].x, FR_AT[i].y), b = toS(C, FR_AT[i + 1].x, FR_AT[i + 1].y)
      x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(lerp(a.x, b.x, p), lerp(a.y, b.y, p)); x.stroke()
    }
    x.restore()
    FR_AT.forEach((p, i) => {
      if (ks[i] <= 0.01) return
      const S = toS(C, p.x, p.y, 124)
      drawStarChar(x, S.x, S.y, S.s, tt, { color: FRIENDS[i].color, glyph: null, mood: i % 2 ? 'happy' : 'wide', look: [i < 2 ? 1 : -1, 1], hops: FR_HOPS[i], seed: 40 + i, pop: ks[i], glow: 1.2 })
      const hk = tt - (T.friends + 0.15 + i * 0.12)
      if (hk > 0 && hk < 1.3) { x.save(); x.globalAlpha = 1 - prog(hk, 1.0, 1.3); x.translate(S.x + (i % 2 ? 40 : -40), S.y - 100 - hk * 30); x.rotate((i % 2 ? 1 : -1) * 0.12); const s = easeOutBack(prog(hk, 0, 0.18), 3); x.scale(s, s); stroked(x, ['HI!!', 'HIII!', 'HEY!!', 'HI!!!', 'YO!!'][i], 0, 0, 40, [GOLD, ORBIT_PINK, '#ffb36b', GOLD, LAV][i], 10, INTER, 800); x.restore() }
    })
  }

  // ═══════════════════════ screen-space props ═══════════════════════
  function hookBubble(t) {
    if (t > T.hookBubbleOut[1]) return
    const k = outK(t, T.hookBubbleOut)
    drawBubble(x, 470, 630, 560, 150, { tail: [740, 1050], pop: k, alpha: k })
    x.save(); x.globalAlpha = k; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('…we need to talk.', 750, 705); x.restore()
  }
  function thoughts(t, C) {
    const items = [[T.b1, T.l2 - 0.05], [T.b2, T.l3 - 0.05], [T.b3, T.close1]]
    items.forEach(([a, b], i) => {
      if (t < a || t > b + 0.2) return
      const k = pop01(t, a, 0.3, 2.2) * (1 - prog(t, b, b + 0.2))
      const bx = 430, by = 470, bw = 560, bh = 330
      const E = toS(C, EMB.x + 60, EMB.y - 170)
      drawBubble(x, bx, by, bw, bh, { tail: [E.x, Math.max(E.y, by + bh + 80)], thought: true, pop: k, alpha: clamp(k * 2), fill: '#fff4fa' })
      if (k < 0.4) return
      x.save(); x.beginPath(); x.roundRect(bx + 8, by + 8, bw - 16, bh - 16, 28); x.clip()
      x.fillStyle = '#2a1650'; x.fillRect(bx, by, bw, bh)
      const cx = bx + bw / 2, cy = by + bh / 2, tt = t
      if (i === 0) {          // Streak, with an entrance
        drawStreakTail(x, cx + 40, cy - 10, 62, tt, { ang: -0.45, len: 4, wag: 0.1 })
        drawStreak(x, cx + 40, cy - 10, 62, tt, { mood: 'happy', look: [-1, 0], shades: 1 })
        stroked(x, '✨ STREAK ✨', cx, by + bh - 34, 30, CYAN, 8)
      } else if (i === 1) {   // Ember jogging, sweatband, 10K
        const jx = cx - 30 + Math.sin(tt * 14) * 6, jy = cy + 10 - Math.abs(Math.sin(tt * 14)) * 18
        for (let s = 0; s < 5; s++) { x.fillStyle = rgba(BONE, 0.6); x.fillRect(bx + 40 + s * 12, cy - 60 + s * 30, 90 - s * 8, 6) }
        drawStarChar(x, jx, jy, 170, tt, { color: ARI.color, mood: 'squint', look: [1, 0], bob: 0, seed: 9, tips: false })
        x.fillStyle = '#ffffff'; x.fillRect(jx - 50, jy - 44, 100, 14); x.fillStyle = '#ff4f7e'; x.fillRect(jx - 50, jy - 36, 100, 4)
        stroked(x, '10K', cx + 170, cy - 60, 64, GOLD, 12, INTER, 800)
        stroked(x, 'every. day.', cx + 150, cy + 20, 30, BONE, 8)
      } else {                // a hand mirror: Ember's own face, with a gasp
        x.save(); x.translate(cx - 20, cy - 6); x.rotate(-0.12)
        x.fillStyle = '#8a5a1e'; x.fillRect(-12, 95, 24, 90)
        x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 112, 132, 0, 0, TAU); x.fill()
        x.fillStyle = '#bfe4ff'; x.beginPath(); x.ellipse(0, 0, 94, 114, 0, 0, TAU); x.fill()
        drawStarChar(x, 0, 6, 150, tt, { color: ARI.color, mood: 'wide', look: [0, 0], blink: false, bob: 0, seed: 10, tips: false, glow: 0.4 })
        x.restore()
        stroked(x, '?!', cx + 160, cy - 50, 90, ORBIT_PINK, 14, INTER, 800)
      }
      x.restore()
    })
  }
  // the talk card: lies face-down at the shell's door, lifts, flips to its question, then flies off at the scratch
  function talkCard(t, C) {
    if (t > T.cardOff[1]) return
    const L0 = toS(C, 640, 1238), lie = { x: L0.x, y: L0.y, w: 96 * C.z, rot: 0.2 }, up = { x: 545, y: 660, w: 340, rot: -0.04 }
    const p = ease.inOutCubic(prog(t, ...T.cardUp)), off = ease.inCubic(prog(t, ...T.cardOff))
    const cx = lerp(lie.x, up.x, p) + off * 700, cy = lerp(lie.y, up.y, p) - Math.sin(Math.PI * p) * 80 - off * 300 + (p > 0.99 ? Math.sin(t * 2) * 5 : 0)
    const w = lerp(lie.w, up.w, p), rot = lerp(lie.rot, up.rot, p) + off * 2.4
    const flip = Math.cos(Math.PI * clamp((p - 0.35) / 0.5))   // 1 back … −1 face
    const img = flip > 0 ? cardBack : TALK
    if (!img) return
    const h = w * 1.6
    if (p > 0.8) { const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 380); gl.addColorStop(0, rgba(GOLD, 0.25 * (1 - off))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 380, cy - 380, 760, 760) }
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(Math.max(0.02, Math.abs(flip)), 1)
    x.drawImage(img, -w / 2, -h / 2, w, h)
    x.restore()
    sparkleRing(t, cx, cy, T.cardUp[1] - 0.05, 10, 200, 0.4)
  }
  function thudText(t, C) {
    const k = t - T.thud
    if (k < 0 || k > 1.0) return
    const S = toS(C, EMB.x - 60, EMB.y + 240)
    x.save(); x.globalAlpha = 1 - prog(k, 0.7, 1.0); x.translate(S.x, S.y - k * 30); const s = easeOutBack(prog(k, 0, 0.18), 3); x.scale(s, s); x.rotate(-0.08)
    stroked(x, 'THUD.', 0, 0, 64, BONE, 14, INTER, 800); x.restore()
    // dust puffs
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI + Math.PI, r = 60 + k * 220; x.globalAlpha = (1 - k) * 0.7; x.fillStyle = BONE; x.fillRect(S.x + Math.cos(a) * r, S.y - 60 + Math.sin(a) * r * 0.25, 12, 12) }
    x.globalAlpha = 1
  }
  function scratchText(t) {
    const k = t - T.scratch
    if (k < 0 || k > 0.8) return
    x.save(); x.globalAlpha = 1 - prog(k, 0.55, 0.8); x.translate(540, 820); x.rotate(-0.1); const s = easeOutBack(prog(k, 0, 0.15), 3); x.scale(s, s)
    stroked(x, '*RECORD SCRATCH*', 0, 0, 56, CYAN, 12, INTER, 800); x.restore()
  }

  // ═══════════════════════ PREVIOUSLY ON / freeze / NEXT TIME (fx layer) ═══════════════════════
  // PREVIOUSLY ON: the recap is this same scene, graded pink (the kit's DOM band + scanlines sit on top)
  function previouslyGrade(t) {
    if (t >= T.prevOut[1]) return
    const k = 1 - prog(t, ...T.prevOut)
    x.save(); x.globalAlpha = k; x.globalCompositeOperation = 'color'; x.fillStyle = '#ff6fae'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(70,0,40,0.3)'; x.fillRect(0, 0, W, H); x.restore()
    if (t > 1.0) { x.fillStyle = `rgba(255,240,248,${0.6 * bump(t, 1.0, 0.16)})`; x.fillRect(0, 0, W, H) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      const outA = 1 - ease.inQuad(prog(t, ...T.out))
      if (t < T.out[1] + 0.02) {
        x.save(); x.globalAlpha = outA
        drawFriends(t, C)
        drawViolinist(t, C)
        drawTideAt(t, C, 1)
        drawPiscesAt(t, C, 1)
        drawEmber(t, C, 1)
        thudText(frz(t), C)
        talkCard(t, C)
        hookBubble(t)
        thoughts(t, C)
        scratchText(t)
        sparkleRing(t, toS(C, EMB.x, EMB.y).x, toS(C, EMB.x, EMB.y).y, T.springUp[1], 12, 190, 0.2)
        dramaFx(t)
        x.restore()
        previouslyGrade(t)
        x.save(); x.globalAlpha = outA; drawFreeze(x, t, T.freeze); x.restore()
      }
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      prev.update(t)
      next.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card cuts: the hook → the turn, the faint → the lesson, the freeze → NEXT TIME (one every ~12 s)
export const CUTS = [{ t: T.cut1, keep: true }, T.cut2, { t: T.cut4, keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into B♭); brass / chip / strings are absolute (B♭ major / G minor).
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { G2: 98.0, D3: 146.83, Eb3: 155.56, F3: 174.61, G3: 196.0, A3: 220.0, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, G4: 392.0, A4: 440.0, Bb4: 466.16, D5: 587.33 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), low, { gain: 0.32, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
export const CUES = [
  // previously on…
  ['whoosh', 0.05, 0.5, 0.05], ['chip', 0.1, 900, 0.5, { wave: 'noise', gain: 0.012, decay: 0.4, sustain: 0.6, rev: 0, dly: 0, bus: 'fx' }], ['bell', 0.18, 1760, 0.025, 1.0, 0],
  ['whoosh', 0.95, 0.3, 0.06], ['pop', 1.08, 880, 0.035, 0],
  // the hook: DUN · DUN · DUNNN
  ...sting(T.z[0], [N.G3, N.D4, N.G4], 0.4, 0.04, 80),
  ...sting(T.z[1], [N.A3, N.Eb4, N.A4], 0.4, 0.042, 76),
  ...sting(T.z[2], [N.G2, N.D3, N.G3, N.Bb3, N.D4, N.G4], 1.3, 0.05, 60), ['boom', T.z[2], 0.3],
  ['strings', T.z[2], r3(T.z[2] + 1.5), [N.G4, N.Bb4, N.D5], { gain: 0.011, attack: 0.05, release: 0.7, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[0]), ['whoosh', 3.55, 0.45, 0.05],
  // Ember spirals
  ...headCues(HEADS[1]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ET]: 1046.5, [TT]: 740 } }),
  ...[T.b1, T.b2, T.b3].flatMap(b => [['pop', r3(b), 660, 0.03, 0.3], ['pop', r3(b + 0.08), 990, 0.025, 0.3]]),
  ['glitter', T.b1, r3(T.b1 + 0.6)],
  ...sting(T.z1, [N.G3, N.D4, N.G4], 0.45, 0.04, 78), ...sting(T.z2, [N.A3, N.Eb4, N.A4], 0.5, 0.042, 74),
  ...sting(T.z3, [N.G2, N.G3, N.Bb3, N.D4], 0.8, 0.045, 64), ['chip', r3(T.z3 + 0.05), 520, 0.5, { wave: 'tri', slide: -14, gain: 0.04, decay: 0.4, sustain: 0.5, rev: 0.3, dly: 0, bus: 'fx' }],
  // the turn: violins
  ...headCues(HEADS[2]), ...headCues(HEADS[3]),
  ['pop', T.violin, 880, 0.035, 0.4], ['bell', r3(T.violin + 0.05), 1760, 0.02, 1.0, 0.4],
  ['strings', T.play[0], 15.2, [N.G3, N.Bb3, N.D4, N.G4], { gain: 0.014, attack: 0.6, release: 0.4, rev: 0.5, bus: 'fx' }],
  ['strings', 15.2, r3(T.scratch), [N.Eb3, N.G3, N.Bb3, N.Eb4, N.G4], { gain: 0.018, attack: 0.4, release: 0.05, rev: 0.5, bus: 'fx' }],
  ['whoosh', r3(T.peek[0] + 0.1), 0.3, 0.04], ['pop', r3(T.peek[1] - 0.15), 523.25, 0.03, 0.3],
  ['whoosh', r3(T.cardUp[0] + 0.15), 0.4, 0.05], ['glitter', r3(T.cardUp[1] - 0.1), r3(T.cardUp[1] + 0.4)], ['bell', T.cardUp[1], 1318.51, 0.028, 1.2, 0],
  // the scratch + the faint
  ...scratch(T.scratch), ['pluck', r3(T.scratch + 0.03), 2349.3, 0.05, 0.25, -0.3],
  ['whoosh', T.cardOff[0], 0.4, 0.05],
  ['glitter', T.hearts, r3(T.hearts + 0.5)], ['bell', r3(T.hearts + 0.02), 1174.66, 0.03, 1.2, -0.2],
  ['chip', T.topple[0], 900, 0.45, { duty: 0.25, slide: -30, gain: 0.03, decay: 0.4, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],
  ['tom', T.thud, 58, { gain: 0.4, decay: 0.5, rev: 0.25, bus: 'fx' }], ['boom', T.thud, 0.26], ['tick', T.thud, 0.06],
  ...[0, 1, 2, 3].map(i => ['bell', r3(T.thud + 0.25 + i * 0.22), NOTE[3 + (i % 3)] * 2, 0.012, 0.6, (i % 2 ? 0.4 : -0.4)]),
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.scratch + 0.2 + i * 0.07), 1318.51 - i * 60, 0.02, 0.4]),
  ...headCues(HEADS[4]),
  ['whoosh', r3(T.springUp[0] + 0.05), 0.35, 0.05], ['pop', T.springUp[1], 1174.66, 0.04, -0.2], ['glitter', T.springUp[1], r3(T.springUp[1] + 0.5)],
  ['bell', T.tideBlush, 1479.98, 0.025, 1.0, 0.3],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Bb' }),
  // cliffhanger
  ...headCues(HEADS[5]),
  ...[0, 1, 2, 3, 4].flatMap(i => [['pop', r3(T.friends + i * 0.12), NOTE[(i * 2) % 7] * 1.5, 0.04, (i - 2) * 0.3], ['clap', r3(T.friends + 0.15 + i * 0.12), { gain: 0.12, pan: (i - 2) * 0.3, rev: 0.2, bus: 'fx' }]]),
  ['glitter', T.friends, r3(T.friends + 0.8)],
  ['whoosh', T.dive[0], 0.25, 0.05], ['pop', T.dive[1], 196, 0.05, 0.3], ['pop', r3(T.resurface[0] + 0.1), 784, 0.035, 0.3],
  // the freeze
  ...sting(T.freeze, [N.G2, N.D3, N.G3, N.Bb3, N.D4, N.G4], 1.4, 0.05, 58), ['boom', T.freeze, 0.34], ['tapeStop', r3(T.freeze + 0.02), 0.3],
  ...headCues(HEADS[6]).filter(c => c[0] !== 'pluck'),
  // NEXT TIME ON
  ['glitter', T.next, r3(T.next + 0.6)], ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', r3(T.next + 0.05 + i * 0.06), NOTE[i] , 0.03, 0.6, (i % 2 ? 0.3 : -0.3)]),
  ['brass', r3(T.next + 0.4), [N.Bb3, N.D4, N.F4, N.Bb4], 1.2, { gain: 0.04, bright: 1.1, ...FXB }],
  ['whoosh', r3(T.nextOut[0] + 0.05), 0.35, 0.04],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
