// storion — "Orion's Ex Era." (45 s vertical Align ad, Star Talk "Wild Lessons" #11, music: cinematic, Cm).
// An epic Greek-myth trailer (marble columns, a Greek-key frame, brass hits, chapter titles) about the oldest chase in
// the sky: every night Orion follows the Pleiades across the sky, and every night they stay ahead of him. Story 0–40.6,
// then the shared end card.
// Cast: ORION (Betelgeuse orange, wearing his famous Belt) · THE PLEIADES (seven tiny blue-white sisters, one voice) ·
// ♏ SCORPIUS (the friend; always on the opposite side of the sky from Orion) · SOMEONE NEW (lavender) · ♓ PISCES
// (on a cloud in the corner, crying at all of it).
//   0.00–4.4   Cold open. Brass hit (0.6): "A LEGEND OF THE NIGHT SKY" · "Orion's | ex era." Orion bounds in with a
//              bouquet, heart-eyed, after seven tiny stars. ORION: "wait up! I just want to talk!" They zip off.
//   4.49–8.9   Drop. "Night I: | flowers." Orion offers the bouquet. PLEIADES: "no thank you!" — they zip off-frame,
//              he lunges after them and faceplants. They peek back in. ORION: "hard to get. I love it."
//   8.93–13.3  "Night II: | a serenade." A boombox held overhead. The Pleiades hold up a sign: PLEASE STOP ♥.
//              ORION (heart-eyed): "they made me a sign. with a heart!"  Pisces sobs: so romantic.
//  13.38       card cut (flip).
//  13.38–18.9  "Night III: | undercover." Shades, a fake moustache, a sign: NOT ORION. PLEIADES: "we can see your belt."
//              The Belt blinks three times (ding ding ding). Orion looks down. ORION: "it's a very famous belt."
//  18.93–27.8  Breakdown. "From the other side | of the sky…" The disguise drops; ♏ Scorpius rises in the corner
//              (tag: ALWAYS OPPOSITE ORION). SCORPIUS: "babe. they're running." ORION: "…running toward me?"
//              "Seven stars. | One direction." SCORPIUS: "away. every single night." The music stops. Crickets.
//              ORION: "…oh." The bouquet wilts; Pisces bawls.
//  27.82       card cut (deal) — the lift.
//  27.82–32.2  "Then someone walked | toward him." Someone new glides in from the right; Orion drops the dead bouquet
//              and steps toward them; they meet halfway (a gold line, a heart). SOMEONE NEW: "hi. nice belt."
//              (callback: the Belt flares). Far off, the Pleiades hold up GOOD LUCK!!  Confetti; Scorpius hops.
//  32.27–36.2  ★ LESSON UNLOCKED: "Chasing isn't romance. | Mutual is."  +1 SELF-RESPECT
//  36.25–38.3  "Tonight's deck. | No chasing." Five cards deal in between the two of them: DEALT EVERY NIGHT.
//  38.38–40.5  "Still chasing. | Still in the sky." The sky turns: the Pleiades drift across, and Orion (arm in arm with
//              someone new) still trails behind them — the Pleiades look back: STILL?! Orion winks.
//  40.6        end card.
// One canvas (sky + set + cast), DOM type + dialogue boxes + the shared LESSON beat above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, beltCells, shadesCells, staCells, tearsCells, drawBouquet, drawBoombox, drawSign, drawColumn, drawMeander, drawCloud, confetti, drawPixels } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)  // 108 bpm grid
const SCO_S = signStar('scorpio'), PIS = signStar('pisces')
const ORI_COL = '#ff9a5c', PLE_COL = '#a8d8ff', NEW_COL = '#c9a6ff'

// ── the timeline
const T = {
  black: [0, 0.3],
  slam: BEAT(0), title2: BEAT(1), titleOut: [3.9, 4.2],
  run: [0.25, 2.7], zip0: [3.05, 3.4],
  open1: 1.08, l1: 1.3, close1: 4.2,
  n1: BEAT(7),                                   // 4.489 Night I (the drop)
  h1: 4.52, h1Land: 4.86, h1Out: [8.62, 8.82],
  open2: 4.82, l2: 5.02, zip1: [5.6, 5.9], lunge: [5.62, 5.95], plant: 5.95, up: [6.65, 7.0], peek: [6.75, 7.1], l3: 7.05,
  n2: BEAT(15),                                  // 8.933 Night II
  h2: 8.96, h2Land: 9.3, h2Out: [13.05, 13.25],
  boom: [9.0, 9.35], sign1: 9.85, l4: 10.55,
  cut1: BEAT(23),                                // 13.378 Night III (card cut)
  h3: 13.42, h3Land: 13.78, h3Out: [18.6, 18.8],
  sidle: [13.45, 14.3], l5: 14.3, l6: 16.6,
  turn: BEAT(33),                                // 18.933 the friend (breakdown)
  h4: 18.98, h4Land: 19.42, h4Out: [23.1, 23.3],
  drop: [18.95, 19.6], rise: [19.0, 19.6], l7: 19.4, l8: 21.95,
  h5: 23.4, h5Land: 23.8, h5Out: [27.45, 27.65],
  l9: 24.15, hush: 25.45, crick: [25.6, 26.3], l10: 26.8, wilt: [27.05, 27.6],
  lift: BEAT(49),                                // 27.822 someone new (card cut, the lift)
  h6: 27.9, h6Land: 28.3, h6Out: [31.95, 32.15],
  newIn: [27.95, 29.2], bqDrop: [28.45, 29.1], walk: [28.6, 29.2], meet: 29.25, l11: 29.62, close2: 31.95,
  luck: 30.45,
  lesson: BEAT(57), lessonOut: [36.0, 36.25],    // 32.267
  deck: 36.25,
  h7: 36.3, h7Land: 36.66, h7Out: [38.15, 38.35], deal: 36.4, dealGap: 0.1,
  last: BEAT(68),                                // 38.378
  h8: 38.42, h8Land: 38.9, pan: [38.38, 40.5], still: 39.0, wink: 39.65,
  out: [40.15, 40.5],
}

// ── the script
const ORI = '✦ ORION', PLE = '✦ THE PLEIADES', SCO = '♏︎ SCORPIUS', NEW = '✦ SOMEONE NEW'
const ORI_C = '#ffb380', PLE_C = '#a8d8ff', SCO_C = '#ff8aa5', NEW_C = '#dcc0ff'
const L_A = [{ t: T.l1, speaker: ORI, color: ORI_C, text: 'wait up! I just want to *talk!*' }]
const L_B = [
  { t: T.l2, speaker: PLE, color: PLE_C, text: 'no thank *you!*' },
  { t: T.l3, speaker: ORI, color: ORI_C, text: 'hard to get. I *love* it.' },
  { t: T.l4, speaker: ORI, color: ORI_C, text: 'they made me a sign. with a *heart!*' },
  { t: T.l5, speaker: PLE, color: PLE_C, text: 'we can see your *belt.*' },
  { t: T.l6, speaker: ORI, color: ORI_C, text: 'it’s a *very* famous belt.' },
]
const L_C = [
  { t: T.l7, speaker: SCO, color: SCO_C, text: 'babe. they’re *running.*' },
  { t: T.l8, speaker: ORI, color: ORI_C, text: '…running *toward* me?' },
  { t: T.l9, speaker: SCO, color: SCO_C, text: 'away. every single *night.*' },
  { t: T.l10, speaker: ORI, color: ORI_C, text: '…*oh.*' },
]
const L_D = [{ t: T.l11, speaker: NEW, color: NEW_C, text: 'hi. nice *belt.*' }]
const ALL = [...L_A, ...L_B, ...L_C, ...L_D]
const CPS = 28
const LT = lineTimes(ALL, { cps: CPS })
const lt = L => LT[ALL.indexOf(L)]
const ch = (L, i) => lt(L).chars[i]
const BELT1 = ch(L_B[3], 16)                                     // "belt." → the Belt blinks
const BLINKS = [BELT1 + 0.25, BELT1 + 0.6, BELT1 + 0.95]
const SIGNW = ch(L_B[2], 28)                                     // "heart!"
const BELT2 = ch(L_D[0], 9)                                      // "nice belt." (callback)
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Chasing isn’t romance. | *Mutual* is.', chip: '+1 SELF-RESPECT', accentColor: GOLD, dim: 0.62 }

// hops
const RUN_HOPS = Array.from({ length: 8 }, (_, i) => +(T.run[0] + 0.05 + i * 0.3).toFixed(3))
const SIDLE_HOPS = [13.5, 13.78, 14.06]
const HOPS = {
  ori: [...RUN_HOPS, ...talkHops(ALL, ORI, { cps: CPS }), ...SIDLE_HOPS, T.meet - 0.05, 36.45, 38.6, 39.1, 39.6, 40.1],
  ple: [0.5, ...talkHops(ALL, PLE, { cps: CPS }), T.peek[0] + 0.1, T.sign1, T.luck, T.luck + 0.35, T.still],
  sco: [T.rise[1], ...talkHops(ALL, SCO, { cps: CPS }), T.meet + 0.05, T.meet + 0.45, T.meet + 0.85],
  new: [...talkHops(ALL, NEW, { cps: CPS }), T.meet - 0.02, 36.5, 38.7, 39.2, 39.7, 40.2],
  pis: [0.7, 9.6, 9.95, 10.3, T.l10 + 0.3, T.meet + 0.1, T.meet + 0.5],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
function talkW(t, who) {
  let w = 0
  ALL.forEach((L, i) => { if (L.speaker === who) w = Math.max(w, prog(t, L.t - 0.22, L.t) * (1 - prog(t, LT[i].done + 0.35, LT[i].done + 0.7))) })
  return ease.inOutQuad(w)
}
function sceneAt(t) {
  if (t < T.n1) return 'hook'
  if (t < T.n2) return 'n1'
  if (t < T.cut1) return 'n2'
  if (t < T.turn) return 'n3'
  if (t < T.lift) return 'turn'
  if (t < T.deck) return 'pay'
  if (t < T.last) return 'deck'
  return 'last'
}

// ── geometry
const BOX = { y: 1532, width: 960, height: 250, cps: CPS }
const PIS_AT = { x: 182, y: 1384 }
const SCO_AT = { x: 850, y: 1262 }
const ORI_SZ = 240

// ═══════════════════════ where everyone is ═══════════════════════
function oriPose(t) {
  const s = sceneAt(t)
  const P = { x: 330, y: 1010, rot: 0, sq: 0, size: ORI_SZ, a: 1 }
  if (s === 'hook') {
    P.x = lerp(-150, 300, ease.outCubic(prog(t, ...T.run))); P.y = 1150
    P.rot = 0.12 * (1 - prog(t, T.run[1] - 0.3, T.run[1]))
  } else if (s === 'n1') {
    const l = ease.inCubic(prog(t, ...T.lunge)), u = ease.inOutCubic(prog(t, ...T.up))
    P.x = lerp(330, 470, l * (1 - u)); P.rot = 1.15 * l * (1 - u); P.y = 1010 + 70 * l * (1 - u)
    const land = t - T.plant
    if (land > 0 && land < 0.35) P.sq += 0.22 * Math.exp(-land * 9) * Math.cos(land * 28)
  } else if (s === 'n2') { P.y = 1040 }
  else if (s === 'n3') { P.x = lerp(-170, 330, ease.outCubic(prog(t, ...T.sidle))); P.y = 1030 }
  else if (s === 'turn') { P.x = 300; P.y = 1000; P.sq = 0.06 * ease.inOutCubic(prog(t, ...T.wilt)) }
  else if (s === 'pay') { P.x = lerp(300, 410, ease.inOutCubic(prog(t, ...T.walk))); P.y = 1000 }
  else if (s === 'deck') { P.x = 165; P.y = 1060; P.size = 150 }
  else { const p = prog(t, ...T.pan); P.x = lerp(120, 420, p); P.y = 1080; P.size = 175 }
  return P
}
function oriState(t) {
  const s = { mood: 'neutral', look: [1, 0], tears: 0, blink: undefined }
  const sc = sceneAt(t), spk = talkW(t, ORI) > 0.5
  if (sc === 'hook') { s.mood = t < T.zip0[0] ? 'heart' : 'wide'; s.look = [1, 0] }
  else if (sc === 'n1') {
    if (t < T.zip1[0]) { s.mood = 'heart' }
    else if (t < T.plant) { s.mood = 'wide' }
    else if (t < T.up[0]) { s.blink = 1 }
    else if (t < T.l3) { s.mood = 'squint'; s.look = [1, 0] }
    else if (t < lt(L_B[1]).done + 0.3) { s.mood = 'sparkle'; s.look = [0, 0] }
    else { s.mood = 'happy' }
  } else if (sc === 'n2') {
    if (t < T.sign1 + 0.1) s.mood = 'happy'
    else if (t < T.l4) { s.mood = 'wide'; s.look = [1, -1] }
    else if (t < lt(L_B[2]).done + 0.1) { s.mood = 'sparkle'; s.look = [0, 0] }
    else s.mood = 'heart'
  } else if (sc === 'n3') {
    s.mood = t > BLINKS[0] - 0.1 && t < T.l6 ? 'wide' : 'neutral'
    s.look = t > BLINKS[0] - 0.1 && t < T.l6 + 0.3 ? [0, 1] : [1, 0]
  } else if (sc === 'turn') {
    if (t < T.l8 - 0.2) { s.mood = 'neutral'; s.look = [1, 1] }
    else if (t < T.l9) { s.mood = 'sparkle'; s.look = [1, 1] }
    else if (t < T.l10) { s.mood = 'wide'; s.look = [1, 1]; s.blink = false }
    else { s.mood = 'neutral'; s.look = [0, 1]; s.tears = 1 }
  } else if (sc === 'pay') {
    if (t < T.bqDrop[0]) { s.look = [0, 1]; s.tears = 1 }
    else if (t < T.meet) { s.mood = 'wide'; s.look = [1, 0] }
    else if (t < BELT2) { s.mood = 'sparkle'; s.look = [1, 0] }
    else s.mood = 'heart'
  } else if (sc === 'deck') { s.mood = 'happy'; s.look = [1, -1] }
  else { s.mood = t > T.wink && t < T.wink + 0.5 ? 'wink' : 'happy'; s.look = [1, 0] }
  if (spk && sc !== 'n3' && sc !== 'turn' && s.mood === 'neutral') s.mood = 'sparkle'
  return s
}

// the Pleiades: seven little sisters in their little-dipper huddle
const PLE_OFF = [[-1.15, -0.1], [-0.4, -0.55], [0.35, -0.35], [1.1, -0.6], [-0.7, 0.5], [0.12, 0.38], [0.9, 0.52]]
function plePose(t) {
  const sc = sceneAt(t)
  const P = { x: 770, y: 860, size: 80, spread: 92, a: 1, stretch: 0, k: 1 }
  if (sc === 'hook') {
    P.x = lerp(640, 760, prog(t, 0.2, 3.0)); P.y = 1060
    const z = ease.inCubic(prog(t, ...T.zip0)); P.x += 640 * z; P.stretch = bump(t, T.zip0[0] + 0.15, 0.4)
    P.k = pop01(t, 0.2, 0.4, 1.6)
  } else if (sc === 'n1') {
    const z = ease.inCubic(prog(t, ...T.zip1)), pk = ease.outCubic(prog(t, ...T.peek))
    P.x = t < T.peek[0] ? 770 + 640 * z : lerp(1400, 1030, pk)
    P.stretch = bump(t, T.zip1[0] + 0.12, 0.4)
  } else if (sc === 'n2') { P.x = 800; P.y = 860 }
  else if (sc === 'n3') { P.x = 790; P.y = 850 }
  else if (sc === 'turn') {
    const d = prog(t, T.turn, T.hush + 0.6)
    P.x = lerp(830, 1010, d); P.y = lerp(640, 600, d); P.size = 46; P.spread = 44; P.a = 1 - prog(t, T.hush, T.hush + 0.6)
  } else if (sc === 'pay') { P.x = 905; P.y = 610; P.size = 52; P.spread = 48; P.k = pop01(t, T.luck - 0.35, 0.4, 1.6); P.a = 1 - prog(t, T.lesson - 0.1, T.lesson + 0.3) }
  else if (sc === 'deck') { P.a = 0 }
  else { const p = prog(t, ...T.pan); P.x = lerp(560, 860, p); P.y = 700; P.size = 62; P.spread = 58 }
  return P
}
function pleState(t) {
  const sc = sceneAt(t), s = { mood: 'neutral', look: [-1, 0] }
  if (sc === 'hook') s.mood = t > T.zip0[0] - 0.3 ? 'wide' : 'neutral'
  else if (sc === 'n1') s.mood = t < T.l2 ? 'neutral' : t < T.peek[0] ? 'wide' : 'wide'
  else if (sc === 'n2') s.mood = 'squint'
  else if (sc === 'n3') s.mood = t < T.l5 ? 'squint' : t < lt(L_B[3]).done + 0.5 ? 'neutral' : 'eyeroll'
  else if (sc === 'turn') s.mood = 'wide'
  else if (sc === 'pay') { s.mood = 'happy'; s.look = [-1, 1] }
  else { s.mood = t > T.still - 0.2 ? 'wide' : 'neutral'; s.look = [-1, 1] }
  return s
}
function scoState(t) {
  const s = { mood: 'squint', look: [-1, -1] }
  if (t < T.l8) s.mood = talkW(t, SCO) > 0.5 ? 'neutral' : 'squint'
  else if (t < T.l9) { s.mood = 'squint'; s.look = [-1, -1] }
  else if (t < T.l10) s.mood = 'neutral'
  else if (t < T.lift) { s.mood = 'sparkle' }
  else if (t < T.meet) { s.mood = 'wide'; s.look = [-1, -1] }
  else s.mood = 'happy'
  return s
}
function newPose(t) {
  const sc = sceneAt(t)
  if (sc === 'pay') return { x: lerp(1260, 670, ease.outCubic(prog(t, ...T.newIn))), y: 1000, size: 220, k: 1 }
  if (sc === 'deck') return { x: 915, y: 1060, size: 150, k: 1 }
  if (sc === 'last') { const p = prog(t, ...T.pan); return { x: lerp(285, 585, p), y: 1080, size: 165, k: 1 } }
  return null
}
function pisState(t) {
  const sc = sceneAt(t), s = { mood: 'sparkle', look: [1, -1], tears: 1 }
  if (sc === 'n1' && t > T.plant) { s.mood = 'wide'; s.tears = 0 }
  if (sc === 'n2' && t > 9.4) { s.mood = 'heart'; s.tears = 3 }
  if (sc === 'n3') s.tears = 2
  if (sc === 'turn' && t > T.l10) { s.tears = 3; s.mood = 'sparkle' }
  if (sc === 'pay' && t > T.meet) { s.tears = 3; s.mood = 'heart' }
  if (sc === 'deck' || sc === 'last') s.tears = 2
  return s
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "600 50px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const backIm = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-back.png' })
  const BACK = (() => { if (!backIm) return null; const c = document.createElement('canvas'); c.width = 240; c.height = Math.round(240 * backIm.height / backIm.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(backIm, 0, 0, c.width, c.height); return c })()
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0a = el('div', { position: 'absolute', left: '0px', top: '600px', width: W + 'px', textAlign: 'center', font: `600 38px ${SERIF}`, letterSpacing: '0.2em', paddingLeft: '0.2em', boxSizing: 'border-box',
    color: GOLD, textShadow: '0 0 26px rgba(242,199,92,0.5), 0 4px 18px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', display: 'none', transformOrigin: '50% 50%' }, root, 'A LEGEND OF THE NIGHT SKY')
  const H0b = popText(root, 'Orion’s | *ex era.*', { top: 668, size: 132, accentSize: 196, at: T.title2 - 0.16, gap: 0.08, late: 1, lateAt: T.title2 + 0.12, wobble: true, accentColor: '#ffb380' })
  const HD = (text, at, land, o = {}) => popText(root, text, { top: 150, size: 100, accentSize: 148, at, late: 1, lateAt: land, wobble: true, fit: true, ...o })
  const HEADS = [
    [HD('Night I: | *flowers.*', T.h1, T.h1Land, { accentColor: PINK, accentSize: 160 }), T.h1Out],
    [HD('Night II: | a *serenade.*', T.h2, T.h2Land, { accentColor: GOLD }), T.h2Out],
    [HD('Night III: | *undercover.*', T.h3, T.h3Land, { accentColor: CYAN }), T.h3Out],
    [HD('From the other side | of the *sky…*', T.h4, T.h4Land, { accentColor: SCO_C, size: 88, accentSize: 140 }), T.h4Out],
    [HD('Seven stars. | One *direction.*', T.h5, T.h5Land, { accentColor: PLE_C, size: 96, accentSize: 140 }), T.h5Out],
    [HD('Then someone walked | *toward* him.', T.h6, T.h6Land, { accentColor: LAV, size: 88, accentSize: 140 }), T.h6Out],
    [HD('Tonight’s deck. | No *chasing.*', T.h7, T.h7Land, { accentColor: GOLD }), T.h7Out],
    [HD('Still chasing. | Still *in the sky.*', T.h8, T.h8Land, { accentColor: '#ffb380', size: 96, accentSize: 140 }), T.out],
  ]
  const BOXES = [
    dialogueBox(root, { ...BOX, lines: L_A, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: [...L_B, ...L_C, ...L_D], open: T.open2, close: T.close2 }),
  ]
  // ★ LESSON UNLOCKED (shared module): after the scene layers, before grain and the card cuts
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const txt = (s, X, Y, font, col, align = 'center', base = 'middle') => { x.font = font; x.textAlign = align; x.textBaseline = base; x.fillStyle = col; x.fillText(s, X, Y) }

  function sparkles(t, cx, cy, t0, n, R, seed, life = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  // ═══════════════════════ the epic set: columns + Greek key ═══════════════════════
  function drawSet(t) {
    const k = clamp(prog(t, 0.2, 0.8)) * outK(t, T.out)
    if (k <= 0.01) return
    const sc = sceneAt(t)
    // a warm "chapter" glow behind the stage
    const glowCol = { hook: '#ff9a5c', n1: '#ff8fb1', n2: '#f2c75c', n3: '#7fe0ff', turn: '#ff5c7a', pay: '#c9a6ff', deck: '#f2c75c', last: '#ffb380' }[sc]
    const g = x.createRadialGradient(540, 950, 60, 540, 950, 620); g.addColorStop(0, rgba(glowCol, sc === 'turn' && t > T.hush ? 0.06 : 0.16 * k)); g.addColorStop(1, rgba(glowCol, 0))
    x.fillStyle = g; x.fillRect(0, 420, W, 1100)
    drawColumn(x, 46, 468, 1470, 56, 0.55 * k)
    drawColumn(x, 1034, 468, 1470, 56, 0.55 * k)
    drawMeander(x, 84, 996, 432, 6, GOLD, 0.42 * k)
    drawMeander(x, 84, 996, 1478, 6, GOLD, 0.42 * k)
  }

  // ═══════════════════════ Orion ═══════════════════════
  function drawOrion(t) {
    const sc = sceneAt(t)
    const P = oriPose(t), st = oriState(t)
    const pk = (sc === 'last' || sc === 'deck' ? pop01(t, sc === 'deck' ? T.deck : T.last, 0.35, 1.6) : 1) * outK(t, T.out)
    if (pk <= 0.02) return null
    const opts = { color: ORI_COL, mood: st.mood, look: st.look, blink: st.blink, squash: P.sq, hops: HOPS.ori, seed: 4, pop: pk, glow: 0.95, bob: 4 }
    const size = P.size
    // props behind
    x.save(); x.translate(P.x, P.y); if (P.rot) x.rotate(P.rot)
    drawStarChar(x, 0, 0, size, t, opts)
    const F = starFrame(0, 0, size, t, opts)
    let bg = 0
    for (const b of BLINKS) bg = Math.max(bg, bump(t, b, 0.3))
    bg = Math.max(bg, 0.9 * bump(t, BELT2, 0.6), sc === 'pay' && t > BELT2 ? 0.25 : 0)
    inSprite(x, F, () => beltCells(x, t, bg))
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    // the disguise (night III), falling off at the turn
    const dz = sc === 'n3' ? 0 : sc === 'turn' ? prog(t, ...T.drop) : -1
    if (dz >= 0 && dz < 1) inSprite(x, F, () => { x.save(); x.globalAlpha = 1 - ease.inQuad(dz); x.translate(0, 40 * ease.inQuad(dz)); x.rotate(0.2 * dz); shadesCells(x); staCells(x); x.restore() })
    // sweat drop when the Belt blinks
    if (sc === 'n3' && t > BLINKS[0] && t < T.l6 + 0.6) inSprite(x, F, () => { const d = ((t - BLINKS[0]) * 0.9) % 1; x.fillStyle = INK; x.fillRect(28.8, 10 + 4 * d, 2.4, 3.4); x.fillStyle = '#8fe3ff'; x.fillRect(29.2, 10.4 + 4 * d, 1.6, 2.6) })
    x.restore()
    // the faceplant's dizzy stars
    if (sc === 'n1' && t > T.plant && t < T.up[1]) {
      for (let i = 0; i < 3; i++) { const a = t * 6 + i * 2.1; drawPixelStar(x, P.x + 60 + Math.cos(a) * 70, P.y - 40 + Math.sin(a) * 22, 22, 1, i % 2 ? GOLD : BONE) }
    }
    return { P, F, size }
  }
  function orionProps(t, O) {
    if (!O) return
    const sc = sceneAt(t), { P, size } = O
    const hx = P.x + size * 0.52, hy = P.y + size * 0.1
    // the bouquet: hook, night I, the turn (wilts), dropped in the payoff
    if (sc === 'hook' || sc === 'n1') {
      if (!(sc === 'n1' && t > T.plant && t < T.up[0] + 0.1)) drawBouquet(x, hx + (sc === 'n1' ? 10 * bump(t, T.l2 - 0.4, 0.5) : 0), hy, 7, 0, -0.18 + (P.rot || 0) * 0.6)
      else drawBouquet(x, P.x + 150, P.y + 110, 7, 0.15, 1.2)
    } else if (sc === 'turn') {
      const k = pop01(t, T.drop[0] + 0.3, 0.35, 1.8)
      if (k > 0.02) { x.save(); x.translate(hx, hy); x.scale(k, k); drawBouquet(x, 0, 0, 7, ease.outCubic(prog(t, ...T.wilt)), -0.1); x.restore() }
    } else if (sc === 'pay') {
      const d = prog(t, ...T.bqDrop)
      if (d < 1) drawBouquet(x, lerp(hx, 300, d) - 40 * d, lerp(hy, 1500, ease.inQuad(d)), 7, 1, -0.1 - 2.4 * d)
    }
    // the boombox (night II)
    if (sc === 'n2') {
      const k = ease.outCubic(prog(t, ...T.boom))
      const bx = P.x, by = lerp(P.y + 60, P.y - size * 0.72, k) + 6 * Math.sin(t * 11.3)
      drawBoombox(x, bx, by, 7, t)
      // music notes
      for (let i = 0; i < 5; i++) {
        const ph = ((t - T.boom[1]) * 0.55 + i / 5) % 1
        if (t < T.boom[1] || ph < 0) continue
        const nx = bx + (i % 2 ? 1 : -1) * (60 + 140 * ph) + Math.sin(ph * 9 + i) * 16, ny = by - 40 - 260 * ph
        x.save(); x.globalAlpha = Math.sin(Math.PI * ph)
        drawPixels(x, ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.'], nx, ny, 6, { X: i % 2 ? GOLD : PINK }, { outline: INK })
        x.restore()
      }
    }
    // the NOT ORION sign (night III)
    if (sc === 'n3') drawSign(x, P.x + 190, P.y - 70 + 4 * Math.sin(t * 5), 230, 128, ['NOT', 'ORION'], { rot: -0.08, font: `800 44px ${INTER}` })
    if (sc === 'turn' && t < T.drop[1] + 0.3) {
      const d = ease.inQuad(prog(t, T.drop[0], T.drop[1] + 0.3))
      drawSign(x, P.x + 190 + 60 * d, P.y - 70 + 520 * d, 230, 128, ['NOT', 'ORION'], { rot: -0.08 + 1.4 * d, font: `800 44px ${INTER}` })
    }
  }

  // ═══════════════════════ the Pleiades ═══════════════════════
  function drawPleiades(t) {
    const P = plePose(t), st = pleState(t)
    if (P.a <= 0.01 || P.k <= 0.02) return null
    x.save(); x.globalAlpha = P.a
    // speed lines on a zip
    if (P.stretch > 0.05) {
      x.strokeStyle = rgba(BONE, 0.7 * P.stretch); x.lineWidth = 6; x.lineCap = 'round'
      for (let i = 0; i < 6; i++) { const yy = P.y - 90 + i * 34; x.beginPath(); x.moveTo(P.x - 140 - 260 * P.stretch, yy); x.lineTo(P.x - 140, yy); x.stroke() }
    }
    PLE_OFF.forEach(([u, v], i) => {
      const sx = P.x + u * P.spread * P.k, sy = P.y + v * P.spread * P.k
      drawStarChar(x, sx, sy, P.size, t, { color: PLE_COL, mood: st.mood, look: st.look, seed: 20 + i, pop: P.k, glow: 0.8, bob: 3, squash: -0.25 * P.stretch, hops: HOPS.ple.map(h => h + (i % 3) * 0.04) })
    })
    x.restore()
    // their signs
    const sc = sceneAt(t)
    x.save(); x.globalAlpha = P.a
    if (sc === 'n2') { const k = pop01(t, T.sign1, 0.35, 2); drawSign(x, P.x, P.y - 200 + 4 * Math.sin(t * 4), 300, 140, ['PLEASE', 'STOP ♥'], { k, rot: 0.05, font: `800 48px ${INTER}`, accent: '#e8344e', }) }
    if (sc === 'pay') { const k = pop01(t, T.luck, 0.35, 2); drawSign(x, P.x - 20, P.y - 130 + 4 * Math.sin(t * 4), 210, 104, ['GOOD', 'LUCK!!'], { k, rot: -0.06, font: `800 36px ${INTER}` }) }
    if (sc === 'last') { const k = pop01(t, T.still, 0.35, 2); drawSign(x, P.x - 30, P.y - 150, 220, 96, ['STILL?!'], { k, rot: 0.07, font: `800 50px ${INTER}`, accent: '#e8344e' }) }
    x.restore()
    return P
  }

  // ═══════════════════════ Scorpius, someone new, Pisces ═══════════════════════
  function drawScorpius(t) {
    if (t < T.rise[0] || t >= T.deck) return
    const r = easeOutBack(prog(t, ...T.rise), 1.4)
    const y = lerp(1720, SCO_AT.y, r)
    const st = scoState(t)
    x.save(); x.beginPath(); x.rect(0, 0, W, 1490); x.clip()
    drawStarChar(x, SCO_AT.x, y, 220, t, { color: SCO_S.color, glyph: SCO_S.glyph, mood: st.mood, look: st.look, hops: HOPS.sco, seed: 8, glow: 0.9, bob: 4 })
    x.restore()
    const tk = prog(t, T.rise[1], T.rise[1] + 0.3) * (1 - prog(t, T.lift - 0.4, T.lift))
    if (tk > 0) {
      x.save(); x.globalAlpha = tk
      x.font = `700 26px ${MONO}`; const tw = x.measureText('ALWAYS OPPOSITE ORION').width + 30
      rr(SCO_AT.x - tw / 2, 1412, tw, 46, 8); x.fillStyle = 'rgba(16,9,38,0.85)'; x.fill(); x.strokeStyle = rgba(SCO_C, 0.8); x.lineWidth = 2; x.stroke()
      txt('ALWAYS OPPOSITE ORION', SCO_AT.x, 1436, `700 26px ${MONO}`, SCO_C)
      x.restore()
    }
  }
  function drawNew(t) {
    const P = newPose(t)
    if (!P) return null
    const sc = sceneAt(t)
    const pk = (sc === 'deck' ? pop01(t, T.deck, 0.35, 1.6) : sc === 'last' ? pop01(t, T.last, 0.35, 1.6) : 1) * outK(t, T.out)
    const mood = sc === 'pay' ? (t < T.meet ? 'sparkle' : t < T.l11 ? 'happy' : talkW(t, NEW) > 0.5 ? 'sparkle' : 'heart') : 'happy'
    drawStarChar(x, P.x, P.y, P.size, t, { color: NEW_COL, mood, look: [-1, 0], hops: HOPS.new, seed: 12, pop: pk, glow: 0.95, bob: 4 })
    return P
  }
  function drawPisces(t) {
    const k = pop01(t, 0.5, 0.4, 1.8) * outK(t, T.out)
    if (k <= 0.02) return
    drawCloud(x, PIS_AT.x, PIS_AT.y + 62, 8, k)
    const st = pisState(t)
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, hops: HOPS.pis, seed: 11, pop: k, glow: 0.8, bob: 3 }
    drawStarChar(x, PIS_AT.x, PIS_AT.y, 128, t, opts)
    const F = starFrame(PIS_AT.x, PIS_AT.y, 128, t, opts)
    inSprite(x, F, () => tearsCells(x, t, st.tears))
  }

  // ═══════════════════════ the meet + the deck ═══════════════════════
  function drawMeet(t, O, N) {
    if (sceneAt(t) !== 'pay' || !O || !N || t < T.meet) return
    const p = ease.outCubic(prog(t, T.meet, T.meet + 0.3))
    const ax = O.P.x + 70, bx = N.x - 70, y = 1000
    x.save(); x.lineCap = 'round'
    x.globalCompositeOperation = 'lighter'; x.strokeStyle = rgba(GOLD, 0.35); x.lineWidth = 26; x.beginPath(); x.moveTo(lerp(540, ax, p), y); x.lineTo(lerp(540, bx, p), y); x.stroke()
    x.globalCompositeOperation = 'source-over'; x.strokeStyle = '#ffe9a8'; x.lineWidth = 8; x.beginPath(); x.moveTo(lerp(540, ax, p), y); x.lineTo(lerp(540, bx, p), y); x.stroke()
    x.restore()
    const hk = pop01(t, T.meet + 0.05, 0.4, 2.4)
    const hy = 830 - 10 * Math.sin(t * 3)
    drawPixels(x, ['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], (ax + bx) / 2, hy, 13 * hk * (1 + 0.06 * Math.sin(t * 7)), { X: '#ff5c7a', W: '#ffd2da' }, { outline: INK })
    const mk = prog(t, T.meet + 0.35, T.meet + 0.6)
    if (mk > 0) { x.save(); x.globalAlpha = mk; txt('MUTUAL', (ax + bx) / 2, 1150, `700 26px ${MONO}`, GOLD); x.restore() }
  }
  function drawDeck(t) {
    if (sceneAt(t) !== 'deck' || !BACK) return
    const FAN = [-24, -12, 0, 12, 24]
    FAN.forEach((deg, i) => {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.4)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5), a = deg * Math.PI / 180
      const fx = 540 + Math.sin(a) * 430, fy = 1400 - Math.cos(a) * 430
      const cx = lerp(540, fx, e), cy = lerp(1900, fy, e), rot = lerp(a * 2 + 0.5, a, e)
      const cw = 176, ww = cw / BACK_BODY, hh = ww * BACK.height / BACK.width
      x.save(); x.translate(cx, cy); x.rotate(rot); x.drawImage(BACK, -ww / 2, -hh / 2, ww, hh); x.restore()
    })
    const lk = prog(t, T.deal + 0.6, T.deal + 0.9)
    if (lk > 0) { x.save(); x.globalAlpha = lk; txt('DEALT EVERY NIGHT', 540, 1268, `700 30px ${MONO}`, GOLD); x.restore() }
    sparkles(t, 540, 990, T.deal + 0.5, 12, 300, 0.4, 0.7, 24)
  }

  function flash(t) {
    let f = 0
    for (const s of [T.n1, T.n2, T.deck, T.last]) f = Math.max(f, 1 - clamp(Math.abs(t - s) / 0.14))
    const fl = 1 - prog(t, T.slam, T.slam + 0.3)
    if (t >= T.slam) f = Math.max(f, 0.6 * fl)
    if (f > 0) { x.fillStyle = rgba('#fff6e6', 0.45 * f); x.fillRect(0, 0, W, H) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const sc = sceneAt(t)
      // the sky: the hush darkens it; the last beat pans it (the sky turns)
      const pan = sc === 'last' ? 120 * ease.inOutQuad(prog(t, ...T.pan)) : 0
      drawSky(x, t, { ...SKY_H, dx: pan, dim: SKY_H.dim * (sc === 'turn' && t > T.hush ? 0.75 : 1) })
      if (t < T.out[1] + 0.02) {
        drawSet(t)
        drawPisces(t)
        drawScorpius(t)
        const Pl = drawPleiades(t)
        const N = drawNew(t)
        const O = drawOrion(t)
        orionProps(t, O)
        drawMeet(t, O, N)
        drawDeck(t)
        void Pl
        sparkles(t, 540, 1000, T.meet, 14, 260, 0.2, 0.8, 26)
        confetti(x, t, T.meet + 0.05, { x0: 540, y0: 1060, n: 80, seed: 5 })
        // crickets in the hush
        for (const c of T.crick) {
          const k = t - c
          if (k < 0 || k > 0.75) continue
          x.save(); x.globalAlpha = Math.sin(Math.PI * k / 0.75) * 0.9
          txt('chirp.', c === T.crick[0] ? 600 : 780, (c === T.crick[0] ? 800 : 880) - k * 26, `700 40px ${MONO}`, '#9cf08a')
          x.restore()
        }
        flash(t)
      }
      // cold-open title
      const tp = prog(t, T.slam, T.slam + 0.22), to = outK(t, T.titleOut)
      const showA = t >= T.slam && to > 0
      H0a.style.display = showA ? 'block' : 'none'
      if (showA) {
        H0a.style.opacity = String(clamp(tp * 3) * to)
        H0a.style.letterSpacing = lerp(0.34, 0.2, ease.outCubic(tp)).toFixed(3) + 'em'
        H0a.style.transform = `scale(${(lerp(1.15, 1, ease.outCubic(tp)) * lerp(0.94, 1, to)).toFixed(4)})`
      }
      H0b.update(t, to)
      for (const b of BOXES) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates at every beat change; the default selection keeps 13.38 (→ Night III, flip) and 27.82
// (→ someone new, deal). The others stay inert. End card flips at 40.6.
export const CUTS = [T.n2, { t: T.cut1, kind: 'flip' }, T.turn, { t: T.lift, kind: 'deal' }, T.deck]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
export const DEBUG = { T, ALL, LT, LESSON, CUTS }

// ── sound (pop / pluck / bell are shifted into the key by the engine; brass / chip / lead are written in C minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { rev: 0.2, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.045, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L }
  return out
}
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.02, pan])
const brassHit = (t, fs, len, gain = 0.06) => ['brass', +t.toFixed(3), fs, len, { gain, bright: 1.15, rev: 0.4 }]
const womp = t0 => [[311.13, 0, 0.26], [293.66, 0.3, 0.26], [277.18, 0.6, 0.26], [261.63, 0.9, 0.9]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.042, cutoff: 1300, env: 500, envDecay: 4, vib: d > 0.8 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, ...FX }])
const zip = t0 => [['whoosh', t0, 0.3, 0.06], ['chip', t0, 520, 0.28, { wave: 'square', slide: 24, gain: 0.022, decay: 0.2, sustain: 0.5, ...FX }]]
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.04 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const Cmin = [65.41, 130.81, 196, 261.63, 311.13], Ab = [103.83, 207.65, 261.63, 311.13], Gmaj = [98, 196, 246.94, 293.66]
// the corny boombox serenade (square chip, C minor → a hopeful Eb)
const SERENADE = [[392, 0.25], [523.25, 0.25], [622.25, 0.5], [587.33, 0.25], [523.25, 0.25], [466.16, 0.5], [523.25, 0.25], [587.33, 0.25], [622.25, 0.75], [783.99, 0.5], [698.46, 0.25], [622.25, 0.25], [587.33, 0.5], [523.25, 0.75]]
const serenade = t0 => { let t = t0; return SERENADE.map(([f, d]) => { const c = ['chip', +t.toFixed(3), f, d * 0.9, { wave: 'square', duty: 0.25, gain: 0.02, vib: 0.01, decay: 0.2, sustain: 0.7, pan: -0.2, ...FX }]; t += d * 0.92; return c }) }
export const CUES = [
  // 0 · cold open: the brass hit, Orion bounds in
  ['whoosh', 0.35, 0.25, 0.05], brassHit(T.slam, Cmin, 2.0, 0.075), ['boom', T.slam, 0.32],
  ...wordPops(T.title2 - 0.16, 2, 0.08, 1), ['pop', T.title2 + 0.12, 1174.66, 0.05, 0], ['pluck', T.title2 + 0.12, 1174.66, 0.045, 0.7, 0],
  ...RUN_HOPS.map(h => ['pop', h, 196, 0.03, -0.3]),
  ['pop', T.open1, 659.25, 0.035, 0], ['pop', T.open1 + 0.06, 880, 0.025, 0],
  ...talkCues(ALL, { cps: CPS, pitch: { [ORI]: 600, [PLE]: 1250, [SCO]: 740, [NEW]: 980 } }),
  ...zip(T.zip0[0]),
  ['pop', T.close1, 880, 0.025, 0], ['whoosh', T.titleOut[0], 0.3, 0.03],
  // 1 · Night I (the drop): no thank you, the faceplant
  ...head(T.h1, 2, T.h1Land, 0),
  ['pop', T.open2, 659.25, 0.03, 0],
  ...zip(T.zip1[0]),
  ['whoosh', T.lunge[0], 0.3, 0.04], ['boom', T.plant, 0.18], ['tick', T.plant, 0.08], ...womp(T.plant + 0.12),
  ...[0, 1, 2].map(i => ['pop', +(T.plant + 0.2 + i * 0.16).toFixed(3), NOTE[(6 - i) % 7] * 2, 0.018, 0.3]),
  ['pop', T.peek[0] + 0.15, 1318.51, 0.03, 0.5], ['pop', T.peek[0] + 0.22, 1567.98, 0.025, 0.5],
  // 2 · Night II: the serenade, the sign
  ...head(T.h2, 2, T.h2Land, 2),
  ['whoosh', T.boom[0], 0.3, 0.03], ...serenade(T.boom[1] + 0.05),
  ['pop', T.sign1, 784, 0.04, 0.4], ['tick', T.sign1 + 0.02, 0.05],
  ['bell', SIGNW, 1567.98, 0.03, 1.0, -0.2],
  // 3 · Night III (after the card cut): undercover, the Belt
  ...head(T.h3, 2, T.h3Land, 4),
  ...SIDLE_HOPS.map(h => ['tick', h, 0.03]),
  ...BLINKS.map((b, i) => ['bell', +b.toFixed(3), [1318.51, 1567.98, 1975.53][i], 0.035, 0.7, 0]),
  ['pluck', BLINKS[2] + 0.35, 293.66, 0.05, 0.35, 0], ['pluck', BLINKS[2] + 0.53, 220, 0.055, 0.6, 0],
  // 4 · the turn (breakdown): Scorpius rises, the music stops
  ['whoosh', T.drop[0], 0.3, 0.04], ['tick', T.drop[0] + 0.4, 0.04], ['boom', T.drop[1], 0.08],
  ...head(T.h4, 3, T.h4Land, 1),
  ['whoosh', T.rise[0], 0.5, 0.05], brassHit(T.rise[1] - 0.1, Ab, 1.4, 0.05),
  ...head(T.h5, 3, T.h5Land, 3),
  ...silence(T.hush, 0.5, T.lift),
  ['whoosh', T.hush, 0.12, 0.04],
  ...cricket(T.crick[0], -0.4), ...cricket(T.crick[1], 0.4),
  ['chip', T.wilt[0], 700, 0.6, { wave: 'tri', slide: -14, vib: 0.03, gain: 0.03, decay: 0.4, sustain: 0.6, ...FX }],
  // 5 · someone new (the lift)
  ...head(T.h6, 3, T.h6Land, 5),
  ['whoosh', T.newIn[0], 0.8, 0.035], ['tick', T.bqDrop[0], 0.04], ['boom', T.bqDrop[1], 0.06],
  brassHit(T.meet, Gmaj, 0.25, 0.05), brassHit(T.meet + 0.28, Cmin, 1.2, 0.06), ['bell', T.meet + 0.05, 1318.51, 0.035, 1.6, 0], ['glitter', T.meet, T.meet + 0.8],
  ['swell', T.meet - 0.4, T.meet + 1.0, { gain: 0.03, f0: 600, f1: 3500 }], ...claps(T.meet + 0.2, T.meet + 2.2, 7),
  ['bell', BELT2, 1760, 0.03, 1.0, 0.2], ['glitter', BELT2, BELT2 + 0.4],
  ['pop', T.luck, 988, 0.03, 0.5], ['pop', T.luck + 0.35, 1174.66, 0.025, 0.5],
  ['pop', T.close2, 880, 0.025, 0],
  // 6 · ★ LESSON UNLOCKED
  ['whoosh', T.lesson - 0.1, 0.3, 0.03],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Cm' }),
  // 7 · tonight's deck
  ['whoosh', T.deck, 0.3, 0.03],
  ...head(T.h7, 3, T.h7Land, 2),
  ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.deal + i * T.dealGap + 0.05).toFixed(3), 0.04]),
  ['glitter', T.deal + 0.5, T.deal + 1.1],
  // 8 · still chasing, still in the sky
  ['whoosh', T.last, 0.6, 0.03],
  ...wordPops(T.h8, 3, 0.07, 1, 0.022), ['pop', T.h8Land, 1174.66, 0.045, 0], ['pluck', T.h8Land, 1174.66, 0.04, 0.7, 0],
  ['pop', T.still, 784, 0.04, 0.4], ['tick', T.still + 0.02, 0.04],
  ['pluck', T.wink - 0.02, 1760, 0.03, 0.5, -0.2], ['bell', T.wink + 0.02, 2349.32, 0.028, 1.2, -0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
