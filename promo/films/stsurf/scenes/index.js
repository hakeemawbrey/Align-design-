// stsurf — "Catch the Wave." (45 s vertical Align ad, Star Talk "Wild Lessons" #19, music: lofi · F, a surf movie with
// a tremolo surf-guitar twang on top). Story 0–40.6, then the shared end card.
//   0.0–4.2    "Surf's up. | Feelings *too.*"  A pixel ocean under a full moon. ♈ ARIES paddles in, shades on. ♓ PISCES
//              floats far out by the horizon, crying (as ever). ♉ TAURUS sits up on the lifeguard tower in shades.
//              ARIES: "I'm gonna crush these feelings."
//   4.3–9.7    "Wave one: | *jealousy.*"  A green wave with angry green eyes rises. ARIES: "you don't scare me, wave."
//              Aries charges it… CRASH: the wipeout (star and board cartwheel; the shades fly off). Aries surfaces,
//              *pfft*. Taurus holds up a score: "2.0".
//   9.75       card cut (flip).
//   9.75–14.8  "Wave two: | *sadness.*"  A slow, droopy blue wave under its own rain cloud. Aries paddles away like mad:
//              "can't feel it if I outpaddle it." The wave just… follows. *plop.* Aries surfaces wearing seaweed. "1.5".
//  14.9–20.0   "Wave three: | *anxiety.*"  A jagged purple swell, trembling, WHAT IF? all over it. Aries holds up a tiny
//              STOP sign: "nope. STOP. I said STOP." The wave grows at every STOP. The washing machine. Aries is spat out
//              onto the sand. Taurus's score: "ow."
//  20.05–22.5  "Three waves. | Three *wipeouts.*"  Face-down on the sand: "the ocean hates me." (the music tape-stops)
//  22.55–26.7  "Meet the | *surf guru.*"  Pisces glides in on a longboard in a lei, sobbing serenely. PISCES: "dude. I
//              cry, like, daily." · "don't fight the wave. ride it."
//  26.75–30.45 "Don't fight it. | *Ride* it."  A big teal wave labelled FEELINGS; both ride it, Aries wobbling, then
//              balanced… and it rolls on under them and away. "…and it | *passed.*"
//  30.52       card cut (deal) into ★ LESSON UNLOCKED: "Feelings come | in waves. | Let them *pass.*" (+1 CHILL)
//  35.1–38.3   "Answers stay hidden | till you *both play.*"  A talk card ("What do you need when you're sad?"); both play
//              face-down; both flip: "a hug." "a hug." ✓ ✓  PISCES: "say it. it gets smaller."
//  38.35–40.42 "Hang *ten.*"  The two bob side by side; Taurus finally raises a "10". Everything pops out by 40.42.
// One canvas (sky + world-space ocean, waves and cast), DOM type + dialogue boxes + the shared lesson, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { R, drawBoard, drawShades, drawLei, drawSeaweed, drawStopSign, drawScore, drawTower, drawCloud, drawTear, drawSweat, drawPixelHeart, drawTissue } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'F'

const ARI = signStar('aries'), PIS = signStar('pisces'), TAU = signStar('taurus')
const ARI_T = '#ff9a86', PIS_T = '#9fe0ff'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the hook
  h0: 0.12, h0Land: 0.9, h0Out: [4.1, 4.26], paddleIn: [0.2, 1.3], l1: 1.3,
  // wave one: jealousy
  h1: 4.32, h1Land: BEAT(7), w1: [4.3, 6.6], l2: 5.0, charge: [6.55, BEAT(12)], crash1: BEAT(12), fly1: [BEAT(12), 8.1],
  surf1: 8.45, pfft: 8.75, card1: [8.9, 9.65], closeA: 7.75, h1Out: [9.5, 9.66],
  cut1: 9.75,
  // wave two: sadness
  h2: 9.8, h2Land: BEAT(17), w2: [9.85, 12.3], l3: 10.35, paddle: [10.2, 12.55], plop: BEAT(22), surf2: 13.3, card2: [13.8, 14.75],
  closeB: 13.45, h2Out: [14.66, 14.82],
  // wave three: anxiety
  h3: 14.88, h3Land: 15.2, w3: [14.95, 15.6], l4: 15.55, stop: [15.95, 16.35, 16.95], crash2: BEAT(31), wash: [BEAT(31), 19.0],
  spit: [19.0, 19.45], card3: [19.6, 21.1], closeC: 18.6, h3Out: [19.86, 20.0],
  // washed up
  h4: 20.05, h4Land: 20.4, l5: 20.3, pisIn: [21.3, 22.4], h4Out: [22.36, 22.5],
  // the guru
  h5: 22.55, h5Land: 22.9, l6: 22.9, sitUp: 23.7, l7: 26.0, back: [25.3, 25.95], h5Out: [26.55, 26.7], closeD: 29.1,
  // the ride
  h6: 26.75, h6Land: 27.05, w4: [26.6, 27.6], ride: [27.6, 29.0], pass: [29.0, 30.1], balance: 28.3, h6Out: [29.15, 29.3],
  h6b: 29.35, h6bLand: 29.6, h6bOut: [30.28, 30.44],
  cut2: 30.52,
  // the lesson
  lesson: BEAT(54), lessonOut: [34.85, 35.05],                // 30.602
  // talk cards
  h7: 35.1, h7Land: 35.6, tie: [35.0, 35.45], talk: [35.05, 35.5], l8: 35.35, playA: 35.75, playB: 35.92, trem: [36.2, BEAT(65)], flip: BEAT(65),
  cardsOut: [37.95, 38.25], closeE: 38.25, h7Out: [38.1, 38.26],
  // the last line
  h8: 38.35, h8Land: BEAT(68) + 0.15, card10: 38.75, out: [40.02, 40.42], h8Out: [40.18, 40.42],
}

// ── the lines
const SARI = `${ARI.glyph}︎ ARIES`, SPIS = `${PIS.glyph}︎ PISCES`
const CPS = 28
const LINES_A = [
  { t: T.l1, speaker: SARI, color: ARI_T, text: "I'm gonna *crush* these feelings." },
  { t: T.l2, speaker: SARI, color: ARI_T, text: "you don't scare me, *wave.*" },
]
const LINES_B = [{ t: T.l3, speaker: SARI, color: ARI_T, text: "can't feel it if I *outpaddle* it." }]
const LINES_C = [{ t: T.l4, speaker: SARI, color: ARI_T, text: 'nope. *STOP.* I said STOP.' }]
const LINES_D = [
  { t: T.l5, speaker: SARI, color: ARI_T, text: 'the ocean *hates* me.' },
  { t: T.l6, speaker: SPIS, color: PIS_T, text: 'dude. I cry, like, *daily.*' },
  { t: T.l7, speaker: SPIS, color: PIS_T, text: "don't fight the wave. *ride* it." },
]
const LINES_E = [{ t: T.l8, speaker: SPIS, color: PIS_T, text: 'say it. it gets *smaller.*' }]
const ALL_LINES = [LINES_A, LINES_B, LINES_C, LINES_D, LINES_E]
export const LT = ALL_LINES.map(L => lineTimes(L, { cps: CPS }))
const HOPS = {
  ari: ALL_LINES.flatMap(L => talkHops(L, SARI, { cps: CPS })),
  pis: ALL_LINES.flatMap(L => talkHops(L, SPIS, { cps: CPS })),
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Feelings come | in waves. | Let them *pass.*', chip: '+1 CHILL', accentColor: '#7fffe8', dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }

// ── where things are
const HORIZON = 1060, WL = 1240, P = 12
const MOON = { x: 830, y: 640, r: 74 }
const TOWER = { x: 104, base: 1236, seat: 1010 }
const TAU_P = [104, 952, 112]
const SAND = [[0, 1166], [100, 1172], [215, 1236], [345, 1480], [0, 1480]]
const ARI_SZ = 200, PIS_SZ = 190
const LIFT = s => s * 0.47                    // star centre above the board
const BG_PIS = [880, 1074, 80]

// ── the waves: { cx, h, w, lip, jag, look } by time
const WAVES = {
  jealous: { col: '#33c46e', dark: '#145a3a', light: '#9cf5b8', face: 'angry', tag: 'JEALOUSY', w: 330 },
  sad: { col: '#4a7fd6', dark: '#1d3470', light: '#a8c8ff', face: 'sad', tag: 'SADNESS', w: 300 },
  anx: { col: '#8d55e8', dark: '#3a1c78', light: '#d4b4ff', face: 'anxious', tag: 'ANXIETY', w: 320, jag: 1 },
  zen: { col: '#3fc7c0', dark: '#145a6a', light: '#b4fff4', face: 'zen', tag: 'FEELINGS', w: 320 },
}
function waveState(t) {
  const out = []
  // 1 · jealousy: rises, curls, crashes on Aries
  if (inW(t, T.w1[0], T.crash1 + 0.9)) {
    const r = ease.outCubic(prog(t, ...T.w1)), c = ease.inOutQuad(prog(t, T.w1[1], T.crash1)), k = ease.inCubic(prog(t, T.crash1, T.crash1 + 0.85))
    out.push({ ...WAVES.jealous, cx: lerp(1360, 780, r) - 150 * c - 160 * k, h: (560 * r + 50 * c) * (1 - k), lip: c, alpha: 1 - prog(t, T.crash1 + 0.5, T.crash1 + 0.9) })
  }
  // 2 · sadness: slow, low, follows Aries across the screen, then flops over it
  if (inW(t, T.w2[0], T.plop + 0.9)) {
    const r = ease.inOutQuad(prog(t, T.w2[0], T.plop - 0.3)), hh = ease.outCubic(prog(t, ...T.w2)), c = ease.inQuad(prog(t, T.plop - 0.55, T.plop)), k = ease.inCubic(prog(t, T.plop, T.plop + 0.8))
    out.push({ ...WAVES.sad, cx: lerp(1300, 570, r) - 60 * k, h: 360 * hh * (1 - k) * (1 - 0.06 * c), lip: c, alpha: 1 - prog(t, T.plop + 0.5, T.plop + 0.9) })
  }
  // 3 · anxiety: grows at every STOP, trembles, crashes
  if (inW(t, T.w3[0], T.crash2 + 0.9)) {
    let hh = 300 * ease.outCubic(prog(t, ...T.w3))
    T.stop.forEach((s, i) => { hh += 95 * easeOutBack(prog(t, s, s + 0.3), 2.2) * (i === 2 ? 1.25 : 1) })
    const c = ease.inOutQuad(prog(t, T.crash2 - 0.6, T.crash2)), k = ease.inCubic(prog(t, T.crash2, T.crash2 + 0.85))
    const tr = (6 + 10 * prog(t, T.stop[0], T.crash2)) * Math.sin(t * 57)
    out.push({ ...WAVES.anx, cx: lerp(1300, 820, ease.outCubic(prog(t, ...T.w3))) - 170 * c - 150 * k + tr, h: (hh + 40 * c) * (1 - k), lip: c, alpha: 1 - prog(t, T.crash2 + 0.5, T.crash2 + 0.9) })
  }
  // 4 · feelings: the one you ride; it rolls on under them and away
  if (inW(t, T.w4[0], T.pass[1])) {
    const r = ease.outCubic(prog(t, ...T.w4)), m = ease.inOutQuad(prog(t, ...T.ride)), p = ease.inQuad(prog(t, ...T.pass))
    out.push({ ...WAVES.zen, cx: lerp(1360, 760, r) - 150 * m - 900 * p, h: 430 * r * (1 - 0.95 * p), lip: 0.35 * r * (1 - p), alpha: 1 - 0.7 * p })
  }
  return out
}
function heightAt(wv, X) {
  const d = (X - wv.cx) / wv.w
  if (d < -1) return 0
  if (d < 0) return wv.h * Math.pow(1 + d, 1.6)
  return wv.h * Math.exp(-(d * d) / 1.6)
}
const surfaceAt = (t, X) => { let y = WL + 5 * Math.sin(t * 2.1 + X * 0.01); for (const wv of waveState(t)) y = Math.min(y, WL - heightAt(wv, X)); return y }

// ── Aries: where it is and how it feels
const ARI_K = [
  [0, S_('squint', [1, 0])], [T.l1, S_('squint', [1, 0])], [T.l1 + 1.6, S_('happy', [0, 0])],
  [T.w1[0] + 0.3, S_('wide', [1, -1], { blink: false })], [T.l2, S_('squint', [1, -1])], [T.charge[0], S_('squint', [1, -1], { blink: false })],
  [T.crash1, S_('wide', [1, -1], { blink: false })], [T.surf1 + 0.6, S_('neutral', [0, 0], { blink: 0.5 })],
  [T.cut1, S_('wide', [1, 0], { blink: false })], [T.l3, S_('wide', [1, 0], { blink: false })], [T.plop - 0.3, S_('wide', [1, -1], { blink: false })],
  [T.surf2, S_('neutral', [0, 0], { blink: 0.55 })],
  [T.h3, S_('wide', [1, -1], { blink: false })], [T.l4, S_('squint', [1, -1])], [T.stop[2] + 0.3, S_('wide', [1, -1], { blink: false })],
  [T.crash2, S_('wide', [0, 0], { blink: false })], [T.spit[1] + 0.5, S_('neutral', [0, 0], { blink: 0.6 })],
  [T.l6, S_('neutral', [1, 0], { blink: 0.4 })], [T.sitUp, S_('wide', [1, 0])], [T.l7, S_('neutral', [1, 0])], [T.back[0], S_('happy', [0, 0])],
  [T.w4[0] + 0.3, S_('wide', [1, -1], { blink: false })], [T.balance, S_('happy', [0, 0])], [T.h6b, S_('sparkle', [0, 0])],
  [T.lessonOut[0], S_('happy', [1, 0])], [T.flip, S_('wide', [1, -1])], [T.flip + 0.4, S_('heart', [1, 0])],
  [T.h8, S_('happy', [0, 0])], [39.2, S_('heart', [1, 0])],
]
const BOARD_POS = [400, WL]
function ariesPose(t) {
  const bobY = Math.sin(t * 2.1 + 4) * 5
  const P0 = { x: 400, show: true, rot: 0, sq: 0, under: 0, board: { show: true, rot: 0 } }
  const onBoard = (x, y = surfaceAt(t, x), rot = 0) => ({ ...P0, x, y: y - 8 - LIFT(ARI_SZ), rot, board: { show: true, x, y: y - 8, rot: rot * 0.6 } })
  // hook: paddle in from the left
  if (t < T.charge[0]) { const x = lerp(-180, 400, ease.outCubic(prog(t, ...T.paddleIn))); return { ...onBoard(x, WL + bobY), shades: true } }
  if (t < T.crash1) { const p = ease.inQuad(prog(t, ...T.charge)), x = lerp(400, 540, p); return { ...onBoard(x, surfaceAt(t, x), -0.18 * p), shades: true, sq: -0.05 * p } }
  if (t < T.cut1) {
    // wipeout 1: the cartwheel
    const p = prog(t, ...T.fly1)
    const S = { ...P0, board: wreckBoard(t, T.crash1, 540, 680) }
    if (p < 1) return { ...S, x: lerp(540, 330, p), y: lerp(1050, WL + 40, p) - Math.sin(p * Math.PI) * 330, rot: -p * Math.PI * 3, shadesFly: true }
    if (t < T.surf1) return { ...S, show: false }
    const k = easeOutBack(prog(t, T.surf1, T.surf1 + 0.35), 2.4)
    return { ...S, x: 330, y: WL + 70 - 110 * k + bobY, under: 1, shadesFly: true }
  }
  if (t < T.h3 - 0.05) {
    // wave two: paddle away… plop
    if (t < T.plop) { const p = ease.inOutQuad(prog(t, ...T.paddle)), x = lerp(600, 370, p); const r = onBoard(x, surfaceAt(t, x) + 3 * Math.sin(t * 30) * (p > 0 && p < 1 ? 1 : 0)); return { ...r, paddling: p > 0 && p < 1 } }
    const S = { ...P0, board: { show: true, x: 470, y: WL - 6 + bobY, rot: Math.PI, flipped: true } }
    if (t < T.plop + 0.18) return { ...S, x: 370, y: WL - 8 - LIFT(ARI_SZ) + 40 * prog(t, T.plop, T.plop + 0.18), sq: 0.4 }
    if (t < T.surf2) return { ...S, show: false }
    const k = easeOutBack(prog(t, T.surf2, T.surf2 + 0.4), 2)
    return { ...S, x: 370, y: WL + 70 - 120 * k + bobY, under: 1, seaweed: true }
  }
  if (t < T.crash2) {
    const r = onBoard(400, surfaceAt(t, 400))
    let sq = 0
    T.stop.forEach(s => { sq -= 0.08 * bump(t, s, 0.25) })
    return { ...r, sq, stopSign: t >= T.l4 - 0.2, sweat: t >= T.stop[1] }
  }
  if (t < T.spit[0]) {
    // the washing machine
    const p = prog(t, ...T.wash), a = p * Math.PI * 7
    return { ...P0, x: 470 + Math.cos(a) * 90, y: 1150 + Math.sin(a) * 70, rot: -a * 1.3, board: { show: true, x: 470 - Math.cos(a) * 110, y: 1150 - Math.sin(a) * 80, rot: a * 1.6 }, wash: p }
  }
  const SANDP = [150, 1296]
  if (t < T.spit[1]) {
    const p = prog(t, ...T.spit)
    return { ...P0, x: lerp(470, SANDP[0], p), y: lerp(1100, SANDP[1], p) - Math.sin(p * Math.PI) * 260, rot: -p * Math.PI * 2.5, board: { show: true, x: 560, y: WL - 6 + bobY, rot: Math.PI, flipped: true }, sand: true }
  }
  const boardSea = { show: true, x: BOARD_POS[0], y: WL - 6 + bobY, rot: t < 24 ? Math.PI : 0, flipped: t < 24 }
  if (t < T.back[0]) {
    // face-down on the sand, then (at the guru) it sits up
    const up = ease.outBack(prog(t, T.sitUp, T.sitUp + 0.4))
    const land = bump(t, T.spit[1], 0.3)
    return { ...P0, x: SANDP[0], y: SANDP[1] + 34 * (1 - up), rot: lerp(-1.45, 0, up), sq: 0.25 * land, board: boardSea, sand: true }
  }
  if (t < T.back[1]) {
    const p = ease.inOutCubic(prog(t, ...T.back)), yB = WL - 8 - LIFT(ARI_SZ)
    return { ...P0, x: lerp(SANDP[0], BOARD_POS[0], p), y: lerp(SANDP[1], yB, p) - Math.sin(p * Math.PI) * 200, rot: 0, board: boardSea, sand: p < 0.5 }
  }
  if (t < T.lessonOut[1]) {
    const x = riderX(t, -0.5)
    let wob = 0
    if (inW(t, T.w4[0] + 0.5, T.balance)) wob = 0.22 * Math.sin((t - T.w4[0]) * 13) * (1 - prog(t, T.balance - 0.4, T.balance))
    const r = onBoard(x, surfaceAt(t, x), wob - (inW(t, T.ride[0], T.pass[0]) ? 0.12 : 0))
    return { ...r, sweat: inW(t, T.w4[0] + 0.4, T.balance) }
  }
  // the tie-in and the last line: side by side
  return onBoard(330, WL + bobY)
}
function riderX(t, d) {
  // riders sit at a fixed spot on the face (d = fraction of the width ahead of the crest) while the wave carries them,
  // then stay put while it rolls on under them
  const wv = waveState(Math.min(t, T.pass[0] - 0.001)).find(w => w.tag === 'FEELINGS')
  const base = d < -0.3 ? 400 : 760
  if (!wv || t < T.w4[0] + 0.55) return base
  const onFace = wv.cx + d * wv.w
  const k = ease.inOutQuad(prog(t, T.w4[0] + 0.55, T.ride[0]))
  return lerp(base, onFace, k)
}
function wreckBoard(t, t0, x0, x1) {
  const p = prog(t, t0, t0 + 0.75)
  if (p < 1) return { show: true, x: lerp(x0, x1, p), y: lerp(1100, WL - 50, p) - Math.sin(p * Math.PI) * 420, rot: p * Math.PI * 4.6 }
  // nose-down in the water, sticking up
  return { show: true, x: x1, y: WL - 54 + Math.sin(t * 2.4) * 4, rot: Math.PI * 0.5 - 0.25, stuck: true }
}

function pisPose(t) {
  const bob = Math.sin(t * 1.9 + 1) * 4
  if (t < T.pisIn[0]) return { x: BG_PIS[0], y: BG_PIS[1] + bob - LIFT(BG_PIS[2]), size: BG_PIS[2], board: { x: BG_PIS[0], y: BG_PIS[1] + bob } }
  if (t < T.pisIn[1]) {
    const p = ease.inOutCubic(prog(t, ...T.pisIn)), sz = lerp(BG_PIS[2], PIS_SZ, p), x = lerp(BG_PIS[0], 780, p), y = lerp(BG_PIS[1], WL, p) + bob
    return { x, y: y - LIFT(sz), size: sz, board: { x, y } }
  }
  if (t < T.w4[0]) return { x: 780, y: WL + bob - 8 - LIFT(PIS_SZ), size: PIS_SZ, board: { x: 780, y: WL + bob - 8 } }
  if (t < T.lessonOut[1]) {
    const x = riderX(t, -0.08), y = surfaceAt(t, x)
    return { x, y: y - 8 - LIFT(PIS_SZ), size: PIS_SZ, board: { x, y: y - 8 }, rot: inW(t, T.ride[0], T.pass[0]) ? -0.1 : 0 }
  }
  return { x: 760, y: WL + bob - 8 - LIFT(PIS_SZ), size: PIS_SZ, board: { x: 760, y: WL + bob - 8 } }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 400)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const hd = (text, at, land, accentColor, o = {}) => popText(root, text, { top: 172, size: 104, accentSize: 156, at, late: 1, lateAt: land, wobble: true, accentColor, fit: true, ...o })
  const H0 = hd('Surf’s up. | Feelings *too.*', T.h0, T.h0Land, '#7fffe8', { gap: 0.08 })
  const H1 = hd('Wave one: | *jealousy.*', T.h1, T.h1Land, '#7dffa0')
  const H2 = hd('Wave two: | *sadness.*', T.h2, T.h2Land, '#9cc4ff')
  const H3 = hd('Wave three: | *anxiety.*', T.h3, T.h3Land, '#d4b4ff')
  const H4 = hd('Three waves. | Three *wipeouts.*', T.h4, T.h4Land, ARI_T, { size: 96, accentSize: 140 })
  const H5 = hd('Meet the | *surf guru.*', T.h5, T.h5Land, PIS_T)
  const H6 = hd('Don’t fight it. | *Ride* it.', T.h6, T.h6Land, '#7fffe8')
  const H6b = hd('…and it | *passed.*', T.h6b, T.h6bLand, GOLD, { size: 110, accentSize: 176 })
  const H7 = hd('Answers stay hidden | till you *both play.*', T.h7, T.h7Land, LAV, { size: 82, accentSize: 112, late: 2, lineHeight: 1.12, top: 168 })
  const H8 = hd('Hang *ten.*', T.h8, T.h8Land, GOLD, { size: 140, accentSize: 220, top: 190 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H6b, T.h6bOut], [H7, T.h7Out], [H8, T.h8Out]]
  const box = (lines, close) => dialogueBox(root, { lines, y: 1478, width: 960, height: 290, open: lines[0].t - 0.24, close, cps: CPS })
  const BOXES = [box(LINES_A, T.closeA), box(LINES_B, T.closeB), box(LINES_C, T.closeC), box(LINES_D, T.closeD), box(LINES_E, T.closeE)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera: (fx, fy) maps to the screen (540, 1000) at scale s
  function cam(t) {
    let s = 1 + 0.025 * ease.inOutQuad(prog(t, 0.3, 4.2)) * (1 - prog(t, 4.2, 4.6)), fx = 540, fy = 1000
    // the anxiety wave: a slow push in
    const k = ease.inOutCubic(prog(t, T.h3, T.crash2)) * (1 - ease.inOutCubic(prog(t, T.crash2 + 0.6, T.spit[1])))
    s += 0.08 * k; fy = lerp(fy, 1060, k)
    s += 0.04 * bump(t, T.crash1, 0.4) + 0.03 * bump(t, T.plop, 0.35) + 0.05 * bump(t, T.crash2, 0.45) + 0.03 * bump(t, T.spit[1], 0.3)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.crash1, 12], [T.plop, 6], [T.crash2, 16], [T.spit[1], 8], ...T.stop.map(s => [s, 5])]) { const k = t - t0; if (k >= 0 && k < 0.35) a = Math.max(a, amp * (1 - k / 0.35)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

  // ── little helpers
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 46, ticks = true } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
    if (ticks) {
      const w = x.measureText(text).width / 2 + size * 0.3, q = prog(k, 0, 0.3)
      x.fillStyle = color; x.globalAlpha *= 1 - q
      for (const [dx, dy, a] of [[-w, -size * 0.45, -0.6], [w, -size * 0.45, 0.6], [-w - 6, size * 0.25, -2.6], [w + 6, size * 0.25, 2.6]]) {
        x.save(); x.translate(dx * (1 + 0.2 * q), dy); x.rotate(a); x.fillRect(-3, -size * 0.28, 6, size * 0.32); x.restore()
      }
    }
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, Rr, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (110 + ((k * 37) % 5) * 24) * spread * size / 200, vy = -(150 + ((k * 53) % 4) * 36) * size / 200
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }
  /** a splash: white and blue pixel droplets flying up from (cx, cy) */
  function splash(t, cx, cy, t0, { n = 22, pow = 1, life = 0.9 } = {}) {
    const a = t - t0
    if (a < 0 || a > life) return
    x.save(); x.globalAlpha = 1 - ease.inQuad(a / life)
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + ((i / (n - 1)) - 0.5) * 2.4, sp = (420 + ((i * 97) % 7) * 70) * pow
      const px = cx + Math.cos(ang) * sp * a, py = cy + Math.sin(ang) * sp * a + 1300 * a * a
      const s = i % 3 === 0 ? 16 : 10
      x.fillStyle = i % 2 ? '#eaffff' : '#8fd8ff'; x.fillRect(Math.round(px), Math.round(py), s, s)
    }
    x.restore()
  }
  function star(color, P_, t, st, { pop = 1, hops = [], glyph = null, alpha = 1, rot = 0, seed = 1 } = {}) {
    const [px0, py0, sz] = P_
    if (pop <= 0.02 || alpha <= 0) return null
    x.save()
    if (rot) { x.translate(px0, py0); x.rotate(rot); x.translate(-px0, -py0) }
    const r = drawStarChar(x, px0, py0, sz, t, { color, glyph: sz >= 120 ? glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed, pop, glow: 0.9, alpha, bob: 0 })
    x.restore()
    return r
  }

  // ── the world: sky, moon, ocean
  function drawOcean(t) {
    const g = x.createLinearGradient(0, HORIZON, 0, H)
    g.addColorStop(0, '#1d2a66'); g.addColorStop(0.25, '#142050'); g.addColorStop(1, '#070b26')
    x.fillStyle = g; x.fillRect(-200, HORIZON, W + 400, H - HORIZON + 200)
    // the horizon glow
    x.fillStyle = 'rgba(160,200,255,0.25)'; x.fillRect(-200, HORIZON, W + 400, 4)
    // ripple dashes, wider and slower toward you
    for (let j = 0; j < 16; j++) {
      const y = HORIZON + 14 + j * j * 1.9 + j * 8, len = 26 + j * 7, gap = 90 + j * 22, sp = 10 + j * 5
      x.fillStyle = `rgba(150,200,255,${0.12 + 0.012 * j})`
      for (let k = -1; k < W / gap + 1; k++) {
        const X = ((k * gap + (j % 2 ? 1 : -1) * t * sp + j * 37) % (W + gap)) - gap / 2
        x.fillRect(Math.round(X), Math.round(y), len, 4)
      }
    }
    // the moon's reflection: a column of bright dashes
    for (let j = 0; j < 20; j++) {
      const y = HORIZON + 10 + j * 22, wv = 40 + j * 4 + 16 * Math.sin(t * 2 + j * 1.7)
      x.fillStyle = `rgba(255,240,200,${0.42 - j * 0.016})`
      x.fillRect(Math.round(MOON.x - wv / 2 + 10 * Math.sin(t * 1.3 + j)), Math.round(y), Math.round(wv), 6)
    }
  }
  function drawFrontWater(t) {
    // the water in front of anything that's in it (heads bob out of it)
    x.save()
    const g = x.createLinearGradient(0, WL, 0, 1500)
    g.addColorStop(0, '#1a2a6a'); g.addColorStop(1, '#0b1238')
    x.fillStyle = g
    x.beginPath(); x.moveTo(-200, 1500)
    for (let X = -200; X <= W + 200; X += P) x.lineTo(X, Math.round((WL + 14 + 4 * Math.sin(t * 2.6 + X * 0.02)) / 4) * 4)
    x.lineTo(W + 200, 1500); x.closePath(); x.fill()
    x.fillStyle = 'rgba(190,230,255,0.5)'
    for (let X = 0; X < W; X += 48) x.fillRect(X + Math.round(10 * Math.sin(t * 1.4 + X)), Math.round(WL + 14 + 4 * Math.sin(t * 2.6 + X * 0.02)), 24, 4)
    x.restore()
  }
  function drawSand() {
    x.save()
    x.fillStyle = '#e9c98f'; x.beginPath(); SAND.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); x.fill()
    x.fillStyle = '#c8a26a'
    for (let k = 0; k < 40; k++) { const px = (k * 137) % 420, py = 1180 + ((k * 89) % 300); if (py > 1172 + px * 0.6 && px < 100 + (py - 1172) * 0.8) x.fillRect(px, py, 8, 8) }
    // the foam line along the shore
    x.fillStyle = 'rgba(234,255,255,0.8)'; x.beginPath(); x.moveTo(215, 1236); x.lineTo(345, 1480); x.lineTo(361, 1480); x.lineTo(231, 1236); x.closePath(); x.fill()
    x.restore()
  }
  // ── the waves
  function drawWave(t, wv) {
    if (wv.h < 4 || wv.alpha <= 0) return
    x.save(); x.globalAlpha *= clamp(wv.alpha)
    const g = x.createLinearGradient(0, WL - wv.h, 0, WL + 40)
    g.addColorStop(0, wv.light); g.addColorStop(0.18, wv.col); g.addColorStop(1, wv.dark)
    const x0 = Math.max(-P, Math.floor((wv.cx - wv.w) / P) * P), x1 = Math.min(W + P, wv.cx + wv.w * 2.6)
    const tops = []
    for (let X = x0; X <= x1; X += P) {
      let hgt = heightAt(wv, X + P / 2)
      if (wv.jag && hgt > 30) hgt += [0, 1.6, 0.4, -0.6, 1.1][Math.abs(Math.round(X / P)) % 5] * P * (wv.h / 500)
      const top = Math.round((WL - hgt) / P) * P
      tops.push([X, top])
      if (top >= WL + 30) continue
      x.fillStyle = g; x.fillRect(X, top, P, WL + 60 - top)
      // foam on the very top + a light band
      x.fillStyle = '#effffd'; x.fillRect(X, top, P, P)
      x.fillStyle = rgba(wv.light, 0.55); x.fillRect(X, top + P, P, P * 2)
    }
    // streaks down the face
    x.fillStyle = rgba(wv.dark, 0.35)
    for (const [X, top] of tops) if (Math.abs(Math.round(X / P)) % 4 === 0 && top < WL - 60) x.fillRect(X, top + P * 4, P, (WL - top) * 0.5)
    // the lip: curls out over the face and droops
    if (wv.lip > 0.01) {
      const len = wv.lip * wv.w * 0.6
      for (let X = wv.cx; X > wv.cx - len; X -= P) {
        const u = (wv.cx - X) / (wv.w * 0.6)
        const y = Math.round((WL - wv.h + wv.h * 0.55 * u * u * u * 1.6) / P) * P, th = Math.max(P, Math.round(wv.h * 0.14 * (1 - 0.6 * u) / P) * P)
        x.fillStyle = wv.col; x.fillRect(X - P, y, P, th)
        x.fillStyle = '#effffd'; x.fillRect(X - P, y, P, P)
        if (wv.wv !== 0) { x.fillStyle = rgba(wv.dark, 0.5); x.fillRect(X - P, y + th - P, P, P) }
      }
      // spray off the lip
      for (let i = 0; i < 6; i++) { const ph = (t * 2.2 + i * 0.17) % 1; x.fillStyle = 'rgba(239,255,253,0.8)'; x.fillRect(Math.round(wv.cx - len + 20 - ph * 60 + i * 12), Math.round(WL - wv.h * (1 - 0.55 * wv.lip) - 30 - ph * 40 + i * 6), 8, 8) }
    }
    drawWaveFace(t, wv)
    x.restore()
  }
  function drawWaveFace(t, wv) {
    if (wv.h < 160) return
    const c = Math.max(8, Math.round(wv.h / 52)), ey = WL - wv.h * 0.42
    const ex = [wv.cx - wv.w * 0.36, wv.cx - wv.w * 0.1]
    const jit = wv.face === 'anxious' ? Math.round(Math.sin(t * 40)) * 2 : 0
    ex.forEach((cx, i) => {
      const X = Math.round(cx - 2.5 * c) + jit, Y = Math.round(ey - 2.5 * c)
      if (wv.face === 'zen') {
        // closed, content arcs
        x.fillStyle = INK
        x.fillRect(X, Y + 2 * c, c, c); x.fillRect(X + c, Y + c, 3 * c, c); x.fillRect(X + 4 * c, Y + 2 * c, c, c)
        return
      }
      const big = wv.face === 'anxious' ? 6 : 5
      R(x, X - c * 0.5, Y - c * 0.5, (big + 1) * c, (big + 1) * c, INK)
      R(x, X, Y, big * c, big * c, wv.face === 'angry' ? '#e9ffe8' : '#f4f8ff')
      // pupils look left, toward Aries; the anxious one darts
      const dart = wv.face === 'anxious' ? Math.round(Math.sin(t * 9 + i)) * c : 0
      const pc = wv.face === 'angry' ? '#0d5a2c' : INK
      R(x, X + c * 0.5 + dart * 0.5, Y + (wv.face === 'sad' ? 2.5 : 1.5) * c, 2 * c, 2 * c, pc)
      if (wv.face === 'angry') R(x, X + c, Y + 2 * c, c, c, '#3fe07a')
      // brows
      x.fillStyle = INK
      if (wv.face === 'angry') for (let k = 0; k < 5; k++) x.fillRect(X + k * c, Y - c * 1.6 + (i ? (4 - k) : k) * c * 0.35, c, c)
      if (wv.face === 'sad') for (let k = 0; k < 5; k++) x.fillRect(X + k * c, Y - c * 1.4 + (i ? k : (4 - k)) * c * 0.3, c, c)
      if (wv.face === 'anxious') for (let k = 0; k < 6; k++) x.fillRect(X + k * c, Y - c * 2 - (k === 2 || k === 3 ? c * 0.5 : 0), c, c)
    })
    // the mouth
    const mx = wv.cx - wv.w * 0.23, my = ey + 4.2 * c
    x.fillStyle = INK
    if (wv.face === 'angry') { for (let k = -3; k <= 3; k++) x.fillRect(Math.round(mx + k * c), Math.round(my + (Math.abs(k) === 3 ? c : 0)), c, c) }
    if (wv.face === 'sad') { for (let k = -2; k <= 2; k++) x.fillRect(Math.round(mx + k * c), Math.round(my + (Math.abs(k) === 2 ? c : 0) - (Math.abs(k) < 2 ? 0 : 0)), c, c); x.fillRect(Math.round(mx - 2 * c), Math.round(my + c), c, c); x.fillRect(Math.round(mx + 2 * c), Math.round(my + c), c, c) }
    if (wv.face === 'anxious') { for (let k = -3; k <= 3; k++) x.fillRect(Math.round(mx + k * c), Math.round(my + (k % 2 ? c : 0) + jit), c, c) }
    if (wv.face === 'zen') { for (let k = -2; k <= 2; k++) x.fillRect(Math.round(mx + k * c), Math.round(my + (Math.abs(k) === 2 ? -c : 0)), c, c) }
    // the tag on its back, like a board sticker
    const tx = wv.cx + wv.w * 0.55, ty = WL - heightAt(wv, tx) * 0.55
    if (tx < W + 60 && wv.cx > 360 && heightAt(wv, tx) > 150) {
      x.save(); x.translate(tx, ty); x.rotate(-0.06)
      x.font = `700 40px ${MONO}`; const tw = x.measureText(wv.tag).width + 36
      R(x, -tw / 2 - 6, -34, tw + 12, 68, INK); R(x, -tw / 2, -28, tw, 56, '#fffaf0')
      x.fillStyle = wv.dark; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(wv.tag, 0, 2)
      x.restore()
    }
    // the sad one has its own rain cloud; the anxious one is covered in what-ifs
    if (wv.face === 'sad') drawCloud(x, wv.cx + 20, WL - wv.h - 120 + 6 * Math.sin(t * 2), 11, t, 1, clamp((wv.h - 160) / 80))
    if (wv.face === 'anxious') {
      x.save(); x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const spots = [[-0.2, 0.3], [0.45, 0.12], [1.05, 0.88]]
      spots.forEach(([dx, dy], i) => {
        const px = wv.cx + dx * wv.w * 0.6, py = WL - heightAt(wv, px) * (1 - dy) + 30
        if (heightAt(wv, px) < 120 || px > W - 40) return
        x.save(); x.translate(px + Math.sin(t * 30 + i) * 3, py); x.rotate((i % 2 ? 1 : -1) * 0.12)
        x.lineWidth = 7; x.strokeStyle = 'rgba(20,8,48,0.85)'; x.strokeText('what if?', 0, 0)
        x.fillStyle = '#fff1ff'; x.fillText('what if?', 0, 0); x.restore()
      })
      x.restore()
    }
  }

  // ── the cast
  function drawAries(t, layer) {
    const ps = ariesPose(t)
    const bd = ps.board
    if (layer === 'sea') {
      if (bd && bd.show) drawBoard(x, bd.x, bd.y, ARI_SZ * 1.35, { rot: bd.rot || 0, col: '#ff7a59', stripe: '#fff1c8', alpha: popOut(t, T.out) })
      // the shades, knocked off at the first crash, float on the water forever after
      if (t >= T.crash1 && t < T.cut1) {
        const p = prog(t, T.crash1, T.crash1 + 0.8)
        const sx = lerp(540, 470, p), sy = p < 1 ? lerp(1050, WL - 4, p) - Math.sin(p * Math.PI) * 300 : WL - 4 + Math.sin(t * 2.4) * 4
        drawShades(x, sx, sy, 200, { rot: p < 1 ? p * 9 : 0.1 })
      }
    }
    if (!ps.show) return null
    if ((layer === 'sand') !== !!ps.sand) return null
    const st = keyed(t, ARI_K)
    const hops = [...HOPS.ari, T.surf1 + 0.3, T.surf2 + 0.3, T.balance, T.h6b + 0.1, T.h6b + 0.6, T.flip + 0.35, T.h8 + 0.1, 39.4]
    const k = popOut(t, T.out)
    const r = star(ARI.color, [ps.x, ps.y + (ps.paddling ? -Math.abs(Math.sin(t * 16)) * 14 : 0), ARI_SZ], t, { ...st, sq: (st.sq || 0) + (ps.sq || 0) }, { pop: k, hops, glyph: ARI.glyph, rot: ps.rot || 0, seed: 5 })
    if (!r) return null
    if (ps.shades) drawShades(x, r.x, r.y, r.size, { rot: ps.rot || 0 })
    if (ps.seaweed) drawSeaweed(x, r.x - 8, r.top + 30, 7, t)
    if (ps.stopSign) {
      const up = easeOutBack(prog(t, T.l4 - 0.2, T.l4 + 0.1), 2.4), shake = T.stop.reduce((a, s) => a + 0.25 * bump(t, s, 0.3), 0)
      drawStopSign(x, r.x + r.size * 0.52, r.y + r.size * 0.1, 7 * up, 0.12 - shake * Math.sin(t * 50))
    }
    if (ps.sweat) drawSweat(x, r.x - r.size * 0.34, r.top + r.size * 0.3 + ((t * 0.8) % 1) * 18, 6)
    // paddle splashes behind it
    if (ps.paddling) for (let i = 0; i < 3; i++) { const ph = (t * 3 + i / 3) % 1; x.fillStyle = `rgba(234,255,255,${1 - ph})`; x.fillRect(Math.round(r.x + 110 + ph * 70), Math.round(WL - 20 - Math.sin(ph * Math.PI) * 50 + i * 6), 12, 12) }
    return r
  }
  function drawPisces(t) {
    const ps = pisPose(t)
    const k = popOut(t, T.out)
    drawBoard(x, ps.board.x, ps.board.y, ps.size * 1.6, { rot: ps.rot || 0, col: '#b48cff', stripe: '#7fffe8', alpha: k })
    const guru = t >= T.pisIn[0]
    let st = S_('sparkle', [-1, 0])
    if (guru) st = t < T.pisIn[1] ? S_('sparkle', [-1, 0]) : S_('happy', [0, 0])
    if (inW(t, T.l7, T.l7 + 1.8)) st = S_('neutral', [-1, 0], { blink: 0.35 })
    if (inW(t, T.ride[0], T.pass[1])) st = S_('happy', [0, 0])
    if (inW(t, T.flip, T.h8)) st = S_('sparkle', [-1, 0])
    const hops = [...HOPS.pis, T.crash1 + 0.1, T.crash2 + 0.1, T.pisIn[1], T.flip + 0.4, T.h8 + 0.3, 39.6]
    const r = star(PIS.color, [ps.x, ps.y, ps.size], t, st, { pop: k, hops, glyph: PIS.glyph, rot: ps.rot || 0, seed: 23 })
    if (!r) return
    if (guru && ps.size > 150) drawLei(x, r.x, r.y, r.size)
    if (!guru) drawTissue(x, r.x - r.size * 0.55, r.y + r.size * 0.12, 3, t)
    // always crying. (serenely.)
    tears(r.x, r.y, r.size, t, 0.6, T.out[0], { gap: guru ? 0.13 : 0.16, spread: 0.6, life: 0.55 })
  }
  function drawTaurus(t) {
    drawTower(x, TOWER.x, TOWER.base, TOWER.seat)
    const k = easeOutBack(prog(t, 0.5, 0.85), 2) * popOut(t, T.out)
    const cards = [[T.card1, '2.0'], [T.card2, '1.5'], [T.card3, 'ow.'], [[T.card10, T.out[1]], '10']]
    let st = S_('neutral', [1, 0])
    if (inW(t, T.card3[0] - 0.2, T.card3[1])) st = S_('squint', [1, 0], { blink: false, sq: 0.06 })
    if (t >= T.card10) st = S_('happy', [0, 0])
    const r = star(TAU.color, TAU_P, t, st, { pop: k, hops: cards.map(c => c[0][0]).concat([T.crash1 + 0.05, T.crash2 + 0.05]), seed: 17 })
    if (!r) return
    if (t < T.card10) drawShades(x, r.x, r.y, r.size)
    for (const [[a, b], txt] of cards) {
      if (!inW(t, a, b + 0.3)) continue
      const kk = pop01(t, a, 0.32, 2.6) * (1 - ease.inCubic(prog(t, b, b + 0.25)))
      const ten = txt === '10'
      drawScore(x, r.x + 92, r.y - 132, txt, kk, { rot: 0.08 * Math.sin((t - a) * 3), col: ten ? '#c8324a' : INK, w: ten ? 170 : 150, h: ten ? 120 : 108 })
      if (ten && t < a + 0.8) sparkleRing(t, r.x + 92, r.y - 132, a + 0.05, 10, 140, 0.4, 0.7)
    }
  }

  // ── the tie-in: a talk card, two face-down answers, one flip
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function talkCard(cx, cy, w, k, rot, alpha) {
    if (k <= 0.02 || alpha <= 0) return
    const h = w * 1.5
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.save(); x.shadowColor = 'rgba(201,166,255,0.6)'; x.shadowBlur = 40
    rr(-w / 2, -h / 2, w, h, 26); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#34206e'); g.addColorStop(1, '#140a30'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 26); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28, 14); x.stroke()
    x.fillStyle = GOLD; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('T A L K   C A R D', 0, -h / 2 + 52)
    // a little pixel wave in the arch
    for (let i = 0; i < 9; i++) { const hh = Math.round(40 * Math.pow(Math.max(0, 1 - Math.abs(i - 5) / 5), 1.4)); R(x, -54 + i * 12, -h / 2 + 190 - hh, 12, hh + 12, i === 5 ? '#effffd' : '#3fc7c0') }
    R(x, -60, -h / 2 + 202, 120, 6, GOLD)
    x.fillStyle = BONE; x.font = `italic 500 46px ${SERIF}`
    x.fillText('What do you need', 0, 30); x.fillText('when you’re sad?', 0, 86)
    x.fillStyle = 'rgba(242,199,92,0.8)'; x.font = `700 17px ${MONO}`; x.fillText('ANSWERS STAY HIDDEN', 0, h / 2 - 44)
    x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0) {
    const h = w * 1.52
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 20); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 20); x.stroke()
    x.fillStyle = GOLD; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 40)
    x.fillStyle = BONE; x.font = `italic 500 50px ${SERIF}`; x.fillText('a hug.', 0, -h / 2 + 118)
    drawPixelHeart(x, 0, -h / 2 + 190, 6)
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 50); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-15, 2); x.lineTo(-4, 13); x.lineTo(17, -12); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TALK_AT = { x: 540, y: 760, w: 380 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1240, from: [330, 1100], tp: T.playA, rot: -0.06 }, { x: 692, y: 1240, from: [760, 1100], tp: T.playB, rot: 0.06 }]
  function drawTie(t) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.5 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(-200, -200, W + 400, H + 400)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    talkCard(TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w, tp, (1 - clamp(tp)) * -0.4, clamp(tp * 3) * (1 - o))
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(C.from[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(C.from[1], C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, ANS_W, rot, sx, clamp(p * 4))
      else answerFace(cx, cy, ANS_W, -sx, prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1), rot)
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, moon: { x: MOON.x, y: MOON.y, r: MOON.r, phase: 0.5, alpha: 1 } })
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawOcean(t)
        drawPisces(t)
        for (const wv of waveState(t)) drawWave(t, wv)
        const ra = drawAries(t, 'sea')
        drawFrontWater(t)
        drawSand()
        drawTaurus(t)
        const rs = drawAries(t, 'sand')
        // the washing machine: a churning foam ring with Aries and the board inside
        const ps = ariesPose(t)
        if (ps.wash !== undefined) {
          const a = t * 14
          for (let i = 0; i < 26; i++) { const ang = a + i * 0.5, rad = 170 + 30 * Math.sin(i * 1.7 + t * 9); x.fillStyle = i % 3 ? '#effffd' : '#a8d8ff'; x.fillRect(Math.round(470 + Math.cos(ang) * rad), Math.round(1150 + Math.sin(ang) * rad * 0.8), 18, 18) }
        }
        // splashes and onomatopoeia
        splash(t, 520, WL - 20, T.crash1, { n: 26, pow: 1.1 })
        splash(t, 330, WL, T.fly1[1], { n: 14, pow: 0.6 })
        splash(t, 400, WL - 10, T.plop, { n: 16, pow: 0.55 })
        splash(t, 470, WL - 40, T.crash2, { n: 30, pow: 1.3 })
        splash(t, 150, 1296, T.spit[1], { n: 12, pow: 0.4, life: 0.6 })
        ono('*CRASH*', 560, 900, t, T.crash1, { size: 60, color: '#bff0ff', rot: -0.08 })
        ono('*pfft*', 420, 1080, t, T.pfft, { size: 46, life: 0.8, rise: 20 })
        ono('*plop.*', 420, 1000, t, T.plop + 0.05, { size: 52, color: '#bfd8ff', life: 1.0, rise: 20 })
        ono('*CRASH*', 540, 820, t, T.crash2, { size: 70, color: '#e6d0ff', rot: 0.08 })
        ono('*thud*', 170, 1150, t, T.spit[1], { size: 44, life: 0.8, rise: 18, color: '#ffe0b0' })
        T.stop.forEach((s, i) => ono('*whoosh*', 840, 600 - i * 40, t, s, { size: 38, life: 0.6, rise: 20, color: '#e6d0ff', ticks: false }))
        ono('*sob*', BG_PIS[0], BG_PIS[1] - 90, t, T.crash1 + 0.3, { size: 34, life: 0.8, rise: 20, color: PIS_T, ticks: false })
        ono('*sniff*', BG_PIS[0] - 20, BG_PIS[1] - 90, t, T.pisIn[0] - 0.4, { size: 34, life: 0.8, rise: 20, color: PIS_T, ticks: false })
        // the ride: a glow as it passes
        if (t >= T.h6b && t < T.h6b + 0.8) sparkleRing(t, 540, 1080, T.h6b, 14, 360, 0.6)
        drawTie(t)
        x.restore()
        void ra; void rs
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of BOXES) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.28 (hook → wave one), 9.75 (→ wave two, flip), 20.02 (→ washed up), 30.52 (→ the LESSON,
// deal). The default selection keeps 9.75 and 30.52; the others stay inert.
export const CUTS = [4.28, { t: T.cut1, kind: 'flip' }, 20.02, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are written in the films' D-major palette and moved up into F by the engine; chip and
//    lead ride the 'sfx' bus as written (in F).
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const D = { A3: 220, D4: 293.66, E4: 329.63, Fs4: 369.99, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, B5: 987.77, D6: 1174.66, E6: 1318.51 }
const F = { C4: 261.63, F4: 349.23, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25, D5: 587.33, F5: 698.46, A5: 880, C6: 1046.5 }
const POPN = [D.A4, D.B4, D.D5, D.E5, D.Fs5, D.A5, D.B5]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), POPN[(base + i) % POPN.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, D.A5, 0.05, 0], ['pluck', land, D.A5, 0.04, 0.6, 0]]
/** the surf guitar: tremolo-picked plucks with lots of spring reverb, descending like every surf movie ever */
const surf = (t0, notes, g = 0.05) => notes.flatMap(([d, f, n = 4]) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + d + i * 0.055).toFixed(3), f, +(g * (1 - i * 0.12)).toFixed(4), 0.5, (i % 2 ? 0.2 : -0.2)]))
const LICK = [[0, D.A4, 6], [0.36, D.A4, 3], [0.54, D.Fs4], [0.76, D.E4], [0.98, D.D4, 8]]
const waveRise = (t0, t1, g = 0.06) => [['swell', t0, t1, { bus: 'sfx', gain: g, f0: 250, f1: 1600 }], ['whoosh', +(t1 - 0.5).toFixed(3), 0.9, 0.05]]
const crash = (t, g = 1) => [['boom', t, 0.08 * g], ['whoosh', t, 1.1, 0.1 * g], ['tom', t, 60, { ...FX, gain: 0.3 * g, decay: 0.5 }], ['clap', +(t + 0.02).toFixed(3), { ...FX, gain: 0.1 * g }], ['shaker', +(t + 0.1).toFixed(3), { gain: 0.05, len: 0.6, bus: 'sfx' }]]
const plip = (t, g = 0.05) => [['pop', t, D.D6, g, 0], ['pop', +(t + 0.06).toFixed(3), D.A5, g * 0.7, 0], ['whoosh', t, 0.3, 0.04]]
const ding = t => [['tick', t, 0.06], ['bell', +(t + 0.03).toFixed(3), D.E6, 0.035, 1.2, -0.3]]
const womp = t => [['chip', t, F.G4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 311.13, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const PITCH = { [SARI]: 980, [SPIS]: 1240 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook: surf guitar, Aries paddles in
  ...head(T.h0, 4, T.h0Land, 0),
  ...surf(0.35, LICK, 0.05),
  ['whoosh', T.paddleIn[0], 1.0, 0.03], ...sob(2.6, F.C6, 2),
  // 2 · wave one: jealousy
  ...head(T.h1, 2, T.h1Land, 2), ...waveRise(T.w1[0], T.w1[1]),
  ['pop', T.w1[0] + 1.4, D.Fs4, 0.04, 0.3], ['pop', T.w1[0] + 1.5, D.D4, 0.04, 0.3],
  ['whoosh', T.charge[0], 0.6, 0.05], ...crash(T.crash1, 1),
  ...plip(T.fly1[1]), ['whoosh', T.surf1, 0.2, 0.03], ['pop', T.pfft, D.E5, 0.03, 0], ...sob(T.crash1 + 0.3, F.A5, 3),
  ...ding(T.card1[0]), ...womp(T.card1[0] + 0.15),
  // 3 · wave two: sadness (a sadder, slower lick)
  ...head(T.h2, 2, T.h2Land, 1), ['swell', T.w2[0], T.w2[1], { bus: 'sfx', gain: 0.035, f0: 200, f1: 700 }],
  ...surf(T.h2Land + 0.1, [[0, D.Fs4, 3], [0.5, D.E4, 3], [1.0, D.D4, 6]], 0.035),
  ...Array.from({ length: 10 }, (_, i) => ['shaker', +(T.paddle[0] + i * 0.24).toFixed(3), { gain: 0.025, len: 0.12, bus: 'sfx', pan: 0.2 }]),
  ['chip', T.plop - 0.35, F.C5, 0.35, { ...FX, wave: 'tri', slide: -12, gain: 0.03, decay: 0.2, sustain: 0.5 }],
  ...plip(T.plop, 0.06), ['tom', T.plop, 90, { ...FX, gain: 0.14, decay: 0.2 }],
  ['whoosh', T.surf2, 0.2, 0.03], ...ding(T.card2[0]), ...womp(T.card2[0] + 0.15),
  // 4 · wave three: anxiety, bigger at every STOP, the washing machine, the sand
  ...head(T.h3, 2, T.h3Land, 3), ['swell', T.w3[0], T.crash2, { bus: 'sfx', gain: 0.05, f0: 300, f1: 2400 }],
  ...T.stop.flatMap((s, i) => [['whoosh', s - 0.05, 0.35, 0.05 + 0.01 * i], ['tom', s, 150 - i * 25, { ...FX, gain: 0.12, decay: 0.15 }]]),
  ...crash(T.crash2, 1.3),
  ...Array.from({ length: 8 }, (_, i) => ['whoosh', +(T.wash[0] + 0.15 + i * 0.14).toFixed(3), 0.2, 0.035]),
  ['whoosh', T.spit[0], 0.4, 0.05], ['tom', T.spit[1], 80, { ...FX, gain: 0.25, decay: 0.2 }], ['tapeStop', T.spit[1], 0.5],
  ...ding(T.card3[0]),
  // 5 · washed up; the guru glides in
  ...head(T.h4, 4, T.h4Land, 0),
  ...sob(T.pisIn[0] - 0.4, F.C6, 3), ['whoosh', T.pisIn[0], 1.0, 0.04], ['glitter', T.pisIn[1] - 0.3, T.pisIn[1] + 0.3],
  ...head(T.h5, 3, T.h5Land, 2),
  ...surf(T.h5Land + 0.1, [[0, D.D5, 3], [0.3, D.E5, 3], [0.6, D.Fs5, 3], [0.9, D.A5, 6]], 0.035),
  ['whoosh', T.sitUp, 0.2, 0.03], ['pop', T.sitUp + 0.05, D.E5, 0.03, 0],
  ['whoosh', T.back[0], 0.5, 0.04], ...plip(T.back[1], 0.04),
  // 6 · the ride
  ...head(T.h6, 4, T.h6Land, 1), ...waveRise(T.w4[0], T.w4[1], 0.05),
  ...surf(T.ride[0], [[0, D.A4, 4], [0.4, D.B4, 4], [0.8, D.D5, 4], [1.2, D.E5, 4], [1.6, D.Fs5, 8]], 0.04),
  ['bell', T.balance, D.A5, 0.03, 1.4, 0], ...sob(T.balance + 0.2, F.A5, 2),
  ['swell', T.pass[0], T.pass[1], { bus: 'sfx', gain: 0.03, f0: 1600, f1: 300 }],
  ...head(T.h6b, 2, T.h6bLand, 3), ['glitter', T.h6b, T.h6b + 0.7], ...cheers(T.h6bLand, T.h6bLand + 0.8),
  // 7 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 8 · talk cards: both play, both flip
  ...head(T.h7, 5, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], D.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, D.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, D.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, D.D6, 0.04, -0.3], ['pop', T.flip + 0.4, D.E6, 0.04, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 9 · hang ten
  ...head(T.h8, 1, T.h8Land, 0),
  ...surf(T.h8Land, [[0, D.D5, 3], [0.22, D.Fs5, 3], [0.44, D.A5, 3], [0.66, D.D6, 8]], 0.045),
  ...ding(T.card10), ['glitter', T.card10, T.card10 + 0.6], ...cheers(T.card10 + 0.1, T.card10 + 0.9), ...sob(T.card10 + 0.4, F.C6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...ALL_LINES.flatMap(L => talkCues(L, { cps: CPS, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
