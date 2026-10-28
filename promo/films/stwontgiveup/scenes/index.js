// stwontgiveup — "The Star Who Won't Give Up." (60 s vertical Align ad, Star Talk season 3 #16, music: dreamy · E).
// Story 0–55.6, then the shared end card.
//   0.00–3.9   "Your star | has been | *trying.*"  The box is already full (♎ YOUR STAR: "I literally lined up PLANETS
//              for you."): five pixel planets in a perfect row point down at YOU, a pictogram crossing a stone bridge
//              with its face in its phone. The star huffs, rolls its eyes, glares. The planets give up and drift off.
//   3.93       DROP: the crescent moon snaps full, a CUTE STRANGER (and their dog) appears at the rail, Pisces pops up
//              on the moon to watch. "Full moon. | Cute *stranger.*"  STAR: "Full moon. Cute stranger. You? Phone."
//              You stop two steps away, scrolling. The stranger glances over (a heart). Synced eye-roll.
//   9.6–14.6   "Attempt one: | a *shooting star.*"  Wind-up, hurl… BONK, it bounces off your head. You rub it, still
//              scrolling (the stranger makes a wish). STAR: "I threw a shooting star. At your HEAD."
//  14.9        card cut.
//  15.0–20.3   "Attempt two: | *spell it out.*"  The star zips across the sky dragging gold lines: "hi", in
//              constellations. The stranger waves at the sky. You don't. STAR: "I spelled 'hi.' In constellations."
//  20.45–23.3  "Attempt three: | *the wave.*"  Click: the lamps go dark, light up one by one, then do the wave.
//  23.35–29.3  "Emergency *dog.*"  The star whistles, the dog dashes over and plops onto your foot. Record scratch,
//              real silence. You pet it… pat, pat, pat… without looking up. The star turns slowly to camera.
//              STAR: "You PET it. Without LOOKING."  Pisces faints off the moon.
//  29.45       card cut.
//  29.5–35.5   "Your star | is *tired.*"  It deflates onto a cloud under a tiny raincloud (womp); Pisces comes over to
//              sit with it. STAR: "…it's fine. I'm just a giant ball of fire." → "…who believes in you."
//  35.6–38.9   "Plan *B.*"  Eyes pop (!). STAR: "Fine. I'll come to where you're looking." It shrinks to a spark and
//              dives into your phone.
//  38.93       Bzzt. A notification: "★ YOUR STAR · look up".  39.49 LIFT: you look up. The "hi" relights, the stranger
//              waves "hi!", you wave back. "You looked *up.*"  STAR (back in the sky): "…THAT'S all it took?" Then heart
//              eyes, waving with all five points; Pisces wails.
//  43.82       card cut.
//  43.93–48.35 ★ LESSON UNLOCKED: "Look up. | Life is trying | to *find you.*"  +1 PRESENCE
//  48.45–52.5  "Tonight's *deck.*"  Five card backs fan in; the star peeks out from behind the last one and winks.
//              STAR: "New deck. Every night. Dealt by me."
//  52.5–55.5   "Pick up. | It's the *stars.*"  A phone rings: THE STARS, calling. The star holds a tiny phone and hops
//              on every ring. Everything pops out by 55.5; the end card takes over at 55.6.
// One canvas (sky, river, the low-res bridge, glows, the cast and the gags, under a light camera), DOM type + dialogue
// boxes + the shared LESSON banner above it, grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas, drawMoon } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { LW, LH, DECK, LAMP_X, lampGlass, paintBridge, youAnchors, strAnchors, dogAnchors, drawPlanet, drawCloud, drawRainCloud, drawBang, drawPixelHeart, drawTears, drawTinyPhone } from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)  // 108 bpm grid
const LIB = signStar('libra'), PIS = signStar('pisces')
const LIBC = '#ff9ae6'

// ── the timeline
export const T = {
  black: [0, 0.06],
  // 0 · hook (the box is already full)
  l1: -1.75,
  h0: 0.1, h0Land: 0.6, h0Out: [3.5, 3.7],
  ping: [0.9, 1.06, 1.22, 1.38, 1.54], emph: [0.3, 0.85],
  huff: 1.95, glare: 2.7,
  planetsOut: [3.2, 3.85],
  // 1 · full moon, cute stranger
  drop: BEAT(6),                                   // 3.933
  h1: 3.98, h1Land: 4.42, h1Out: [9.15, 9.35],
  l2: 4.65, closeA: 8.7,
  stop: 6.2,
  glance: [6.8, 8.1], roll1: 7.85,
  // 2 · attempt one: a shooting star
  h2: 9.6, h2Land: 10.0, h2Out: [14.6, 14.78],
  windup: [9.7, 10.26], hurl: 10.3, bonk: 10.86, wish: [10.6, 12.4], dizzy: [10.95, 13.0], rub: [12.35, 12.95],
  l3: 11.45, closeB: 14.6,
  cut1: 14.9,
  // 3 · attempt two: spell it out
  h3: 15.0, h3Land: 15.4, h3Out: [20.12, 20.3],
  trace: [15.05, 17.3], skyWave: [17.45, 19.3], hiDim: [20.2, 21.2],
  l4: 17.6, closeC: 20.35,
  // 4 · attempt three: the wave → emergency dog
  h4: 20.45, h4Land: 20.85, h4Out: [23.12, 23.3],
  off: 20.5, on: [20.8, 21.08, 21.36, 21.64], wave: 21.9, waveN: 3, waveStep: 0.13, wavePeriod: 0.48,
  h5: 23.35, h5Land: 23.62, h5Out: [29.12, 29.3],
  call: 23.38, swoop: [23.3, 23.75], run: [23.55, 24.2], plop: 24.25, hush: 24.3,
  pats: [25.1, 25.45, 25.8], toCam: 26.1,
  l6: 26.6, closeD: 29.35, faint: 27.55, rise: [28.55, 29.15],
  cut2: 29.45,
  // 5 · deflate
  h6: 29.55, h6Land: 29.95, h6Out: [35.3, 35.5],
  sink: [29.5, 30.15], cloudIn: [29.35, 29.9], rain: 30.3, womp: 29.95,
  pisCome: [31.3, 31.9], pisGo: [35.75, 36.25],
  l7: 30.5, l8: 33.75,
  // 6 · plan B
  idea: BEAT(63),                                  // 35.6
  h7: 35.65, h7Land: 35.95, h7Out: [38.72, 38.9],
  l9: 36.1, closeE: 39.25,
  spark: [37.95, 38.2], dive: [38.2, 38.85],
  // 7 · payoff
  buzz: BEAT(69),                                  // 38.933
  lookUp: BEAT(70),                                // 39.489 the lift
  h8: 39.55, h8Land: 39.95, h8Out: [43.5, 43.68],
  back: [39.55, 40.0], strHi: 40.3, youWave: [40.7, 42.2],
  l11: 40.9, closeF: 43.2,
  hearts: 42.3, wail: 41.4,
  // 8 · LESSON
  cut3: 43.82,
  lesson: BEAT(78),                                // 43.933
  lessonOut: [48.15, 48.35],
  // 9 · tonight's deck
  h9: 48.45, h9Land: 48.8, h9Out: [52.15, 52.33],
  deal: 48.45, dealGap: 0.1, dive2: [48.4, 48.78], peek: [49.65, 50.15], wink: [50.7, 51.3],
  l12: 48.95, closeG: 52.15,
  deckOut: [52.08, 52.5],
  // 10 · pick up
  phoneIn: [52.45, 52.8], rings: [52.95, 53.65, 54.35, 55.05],
  h10: 52.62, h10Land: 53.05, h10Out: [55.22, 55.45],
  out: [55.05, 55.5],
}

// ── the dialogue (one voice: your star)
const HERO = `${LIB.glyph}︎ YOUR STAR`
const say = (t, text) => ({ t, speaker: HERO, color: LIBC, text })
const LA = [say(T.l1, 'I literally lined up *PLANETS* for you.'), say(T.l2, 'Full moon. Cute stranger. You? *Phone.*')]
const LB = [say(T.l3, 'I threw a shooting star. At your *HEAD.*')]
const LC = [say(T.l4, "I spelled 'hi.' In *constellations.*")]
const LD = [say(T.l6, 'You PET it. Without *LOOKING.*')]
const LE = [say(T.l7, "…it's fine. I'm just a giant ball of *fire.*"), say(T.l8, '…who believes in *you.*'), say(T.l9, "Fine. I'll come to where you're *looking.*")]
const LF = [say(T.l11, "…*THAT'S* all it took?")]
const LG = [say(T.l12, 'New deck. Every night. Dealt by *me.*')]
const BOXES = [[LA, T.closeA], [LB, T.closeB], [LC, T.closeC], [LD, T.closeD], [LE, T.closeE], [LF, T.closeF], [LG, T.closeG]]
const ALL_LINES = [...LA, ...LB, ...LC, ...LD, ...LE, ...LF, ...LG]
const CPS = 28
const LT = lineTimes(ALL_LINES, { cps: CPS })
const HERO_HOPS = [...talkHops(ALL_LINES, HERO, { cps: CPS }).filter(h => h > 0), ...T.emph]
const charAt = (L, word) => { const i = ALL_LINES.indexOf(L), k = L.text.replace(/\*/g, '').indexOf(word); return LT[i].chars[Math.max(0, k)] }
const doneOf = L => LT[ALL_LINES.indexOf(L)].done
const T_YOU = charAt(LA[1], 'You?'), T_HEAD = charAt(LB[0], 'HEAD'), T_CONST = charAt(LC[0], 'constellations'), T_LOOKING = charAt(LD[0], 'LOOKING'), T_PET = charAt(LD[0], 'PET')
const T_THATS = charAt(LF[0], 'all'), T_ME = charAt(LG[0], 'me.')

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Look up. | Life is trying | to *find you.*', chip: '+1 PRESENCE' }

// ── helpers (pure)
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const pulse = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const wobble = (t, t0, rate = 8, freq = 22) => { const k = t - t0; return k < 0 ? 0 : Math.exp(-k * rate) * Math.cos(k * freq) }

// ── geometry (world px; the camera maps world → screen)
const PS = 6, BY = 985                          // the low-res bridge canvas: art (i, j) → world (i·PS, BY + j·PS)
const AX = i => i * PS, AY = j => BY + j * PS
const HOME = { x: 812, y: 708, s: 288 }
const MOON = { x: 200, y: 655, r: 74 }
const PIS_AT = { x: 252, y: 540, s: 126 }       // sitting on the moon's shoulder
const CLOUD_TOP = 806
const LESSON_AT = { x: 930, y: 1236, s: 180 }   // during the lesson the star sits down by the couple (out of the text)
const YOU_X0 = 13, YOU_STOP = 79, STR_X = 125, DOG_X0 = 114, DOG_X1 = 87
const PLAN = [['mercury', 650, 622, 15], ['venus', 572, 700, 21], ['mars', 494, 778, 18], ['jupiter', 414, 858, 33], ['saturn', 332, 938, 25]]
// "hi", in constellations: the star's flight path (x, y, pen) — pen = the leg arriving at this point draws a line
const HI_PATH = [[HOME.x, HOME.y, 0], [372, 574, 0], [372, 866, 1], [372, 722, 0], [446, 678, 1], [512, 732, 1], [512, 866, 1], [610, 866, 0], [610, 708, 1], [610, 606, 0], [HOME.x, HOME.y, 0]]
const HI = (() => {
  let L = 0; const segs = []
  for (let i = 1; i < HI_PATH.length; i++) { const a = HI_PATH[i - 1], b = HI_PATH[i], len = Math.hypot(b[0] - a[0], b[1] - a[1]); segs.push({ a, b, L0: L, L1: L + len, pen: b[2] }); L += len }
  const nodes = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ({ x: HI_PATH[i][0], y: HI_PATH[i][1], L: segs[i - 1].L1, dot: i === 9 }))
  return { segs, nodes, total: L }
})()
const traceL = t => { const p = prog(t, ...T.trace); return (0.7 * p + 0.3 * ease.inOutQuad(p)) * HI.total }
function tracePos(t) {
  const L = traceL(t)
  let s = HI.segs[HI.segs.length - 1]
  for (const g of HI.segs) if (L <= g.L1) { s = g; break }
  const k = clamp((L - s.L0) / Math.max(1e-6, s.L1 - s.L0))
  return { x: lerp(s.a[0], s.b[0], k), y: lerp(s.a[1], s.b[1], k), dx: s.b[0] - s.a[0], dy: s.b[1] - s.a[1] }
}
// when the star first reaches each node (for the chimes): sampled, pure
const NODE_T = HI.nodes.map(n => { for (let t = T.trace[0]; t <= T.trace[1]; t += 0.004) if (traceL(t) >= n.L - 0.5) return +t.toFixed(3); return T.trace[1] })

// ── the people, the dog, the lamps (art px, see props.js)
const youX = t => t < T.stop ? lerp(YOU_X0, YOU_STOP, t / T.stop) : YOU_STOP
const patK = t => { let k = 0; for (const p of T.pats) k = Math.max(k, pulse(t, p - 0.08, 0.3)); return k }
function youAt(t) {
  const walking = t < T.stop
  const s = { x: youX(t), step: walking ? t * 2.1 : null, head: 'down', arm: 'phone', k: 0, jolt: 0, smile: false }
  if (inR(t, T.bonk, T.bonk + 0.14)) s.jolt = 1
  if (inR(t, ...T.rub)) { s.arm = 'rub'; s.k = Math.sin((t - T.rub[0]) * 22) }
  if (inR(t, T.pats[0] - 0.3, T.pats[2] + 0.5)) { s.arm = 'pet'; s.k = patK(t) }
  if (t >= T.lookUp) {
    s.head = t < T.lookUp + 0.75 ? 'up' : 'fwd'; s.arm = 'low'; s.smile = t > T.lookUp + 0.75
    if (inR(t, ...T.youWave)) { s.arm = 'wave'; s.k = (t - T.youWave[0]) * 14; s.phoneLow = true }
  }
  return s
}
function strAt(t) {
  const s = { x: STR_X, head: 'up', arm: 'pockets', k: 0, blush: 0, smile: false }
  if (inR(t, ...T.glance)) { s.head = 'fwd'; s.blush = 1; s.smile = true }
  if (inR(t, ...T.wish)) { s.head = 'up'; s.arm = 'wish'; s.smile = true }
  if (inR(t, ...T.skyWave)) { s.head = 'up'; s.arm = 'skywave'; s.k = (t - T.skyWave[0]) * 13; s.smile = true }
  if (inR(t, T.plop, T.strHi)) { s.head = 'fwd'; s.smile = t > T.pats[0] }
  if (t >= T.strHi) { s.head = 'fwd'; s.smile = true; s.blush = 0.8; if (t < T.strHi + 1.9) { s.arm = 'wave'; s.k = (t - T.strHi) * 14 } }
  return s
}
function dogAt(t) {
  const d = { x: DOG_X0, f: -1, pose: 'sit', wag: t * 9, dy: 0, tongue: true }
  if (inR(t, T.call, T.run[0])) d.pose = 'up'
  if (inR(t, T.run[0], T.plop)) { const p = prog(t, ...T.run); d.x = lerp(DOG_X0, DOG_X1, ease.inOutQuad(p)); d.pose = 'run'; d.step = t * 7; d.dy = -Math.round(Math.abs(Math.sin(p * Math.PI * 3)) * 2) }
  if (t >= T.plop) { d.x = DOG_X1; d.pose = 'up'; d.wag = t * (inR(t, T.pats[0] - 0.2, T.pats[2] + 0.6) ? 16 : 9) }
  if (t >= T.lookUp + 0.4) d.pose = 'sit'
  return d
}
function lampsAt(t) {
  return LAMP_X.map((_, i) => {
    let b = 1
    if (t >= T.off && t < T.on[i]) b = 0
    else if (inR(t, T.on[i], T.on[i] + 0.3)) b = 1 + 0.5 * (1 - prog(t, T.on[i], T.on[i] + 0.3))
    for (let c = 0; c < T.waveN; c++) b += 0.55 * pulse(t, T.wave + c * T.wavePeriod + i * T.waveStep, 0.26)
    if (t >= T.lookUp) b += 0.3 * pulse(t, T.lookUp + i * 0.06, 0.5)
    return b
  })
}

/** the lamps literally do the wave: each pole stands up (art px) as the bump passes */
const liftAt = t => LAMP_X.map((_, i) => { let v = 0; for (let c = 0; c < T.waveN; c++) v = Math.max(v, pulse(t, T.wave + c * T.wavePeriod + i * T.waveStep, 0.34)); return 7 * v })
// ── camera: a few pushes (BONK, the dog, you looking up)
function camAt(t) {
  let cx = 540, cy = 960, z = 1
  const push = (a, b, c, d, px, py, pz) => { const k = ease.inOutCubic(prog(t, a, b)) * (1 - ease.inOutCubic(prog(t, c, d))); cx = lerp(cx, px, k); cy = lerp(cy, py, k); z = lerp(z, pz, k) }
  push(T.bonk - 0.04, T.bonk + 0.16, 12.85, 13.5, 520, 1040, 1.1)
  push(T.plop - 0.05, T.plop + 0.3, 26.35, 26.95, 545, 1270, 1.32)
  push(T.lookUp - 0.12, T.lookUp + 0.12, T.lookUp + 0.7, T.lookUp + 1.25, 540, 1230, 1.28)
  return { cx, cy, z }
}

// ── the hero's state
function heroAt(t) {
  const H = { x: HOME.x, y: HOME.y, s: HOME.s, mood: 'neutral', look: [0, 0], blink: undefined, squash: 0, rot: 0, pop: 1, glow: 1, blush: undefined, hide: false, wave: 0 }
  if (t < T.drop) {                                                 // the rant
    H.mood = 'squint'
    if (inR(t, T.huff, T.huff + 0.7)) H.mood = 'eyeroll'
    H.squash = 0.22 * Math.max(0, wobble(t, T.huff, 6, 18))
    if (t >= T.glare) H.look = [-1, 1]
  } else if (t < T.h2) {                                            // full moon, cute stranger, "You? Phone."
    if (t < T.drop + 0.75) { H.mood = 'sparkle'; H.look = [-1, -1] }
    else if (t < T_YOU) { H.mood = 'heart' }
    else if (t < T.roll1) { H.mood = 'squint'; H.look = [-1, 1] }
    else if (t < T.roll1 + 0.75) H.mood = 'eyeroll'
    else { H.look = [-1, 1] }
  } else if (t < T.trace[0]) {                                      // attempt one
    H.look = [-1, 1]
    if (t < T.windup[0]) H.mood = 'squint'
    else if (t < T.hurl) { const p = ease.outCubic(prog(t, ...T.windup)); H.mood = 'squint'; H.squash = 0.26 * p; H.rot = 0.2 * p; H.x += 22 * p; H.y += 8 * p }
    else if (t < T.bonk) { const p = ease.outCubic(prog(t, T.hurl, T.hurl + 0.28)); H.mood = 'wide'; H.blink = false; H.squash = lerp(-0.3, 0, p); H.rot = lerp(-0.24, 0, p); H.x -= 30 * (1 - p) }
    else if (t < T.l3) { H.mood = 'wide'; H.blink = false; H.squash = 0.12 * Math.max(0, wobble(t, T.bonk)) }
    else if (t < T_HEAD) { H.mood = 'wide'; H.look = [0, 0] }
    else { H.mood = 'squint'; H.look = [0, 0]; H.squash = 0.14 * Math.max(0, wobble(t, T_HEAD, 7, 20)) }
  } else if (t < T.h4) {                                            // attempt two: "hi"
    if (t < T.trace[1]) {
      const P = tracePos(t), a = prog(t, T.trace[0], T.trace[0] + 0.25), b = prog(t, T.trace[1] - 0.3, T.trace[1])
      H.x = P.x; H.y = P.y; H.s = lerp(HOME.s, 144, ease.outCubic(a) * (1 - ease.inCubic(b)))
      H.mood = 'happy'; H.rot = clamp(P.dx / 900, -0.25, 0.25) * (1 - b)
    } else if (t < T.l4) { H.mood = 'sparkle'; H.squash = 0.12 * Math.max(0, wobble(t, T.trace[1], 7, 20)) }
    else if (t < T_CONST) H.mood = 'happy'
    else { H.mood = 'squint'; H.look = [-1, 1] }
  } else if (t < T.sink[0]) {                                       // attempt three: the wave → the dog
    H.look = [-1, 1]
    if (t < T.call) { H.mood = t < T.wave ? 'squint' : 'happy' }
    else {
      const sw = ease.inOutCubic(prog(t, ...T.swoop)) * (1 - ease.inOutCubic(prog(t, ...T.rise)))
      H.x = lerp(HOME.x, 800, sw); H.y = lerp(HOME.y, 960, sw); H.s = Math.round(lerp(HOME.s, 252, sw) / 36) * 36
      if (t < T.run[0]) { H.mood = 'wide'; H.blink = false }
      else if (t < T.plop) H.mood = 'sparkle'
      else if (t < T.hush) H.mood = 'heart'
      else if (t < T.toCam) { H.mood = 'wide'; H.blink = false; H.squash = 0.06 * Math.max(0, wobble(t, T.pats[0], 5, 20)) }
      else if (t < T_PET) { H.mood = 'squint'; H.look = [0, 0] }
      else if (t < T_LOOKING) { H.mood = 'wide'; H.look = [0, 0] }
      else { H.mood = 'squint'; H.look = [0, 0]; H.squash = 0.16 * Math.max(0, wobble(t, T_LOOKING, 6, 20)) }
    }
  } else if (t < T.idea) {                                          // deflate on the cloud
    const k = ease.outCubic(prog(t, ...T.sink))
    H.mood = 'sleepy'; H.look = [0, 1]; H.squash = 0.42 * k + 0.03 * Math.sin(t * 2)
    if (t >= T.l8) { H.mood = 'sparkle'; H.look = [-1, 1]; H.squash = lerp(0.42, 0.22, ease.outCubic(prog(t, T.l8, T.l8 + 0.4))); H.blush = 0.8 }
  } else if (t < T.spark[1]) {                                      // plan B
    const k = t - T.idea
    H.mood = k < 0.5 ? 'wide' : 'sparkle'; H.look = k < 0.5 ? [0, 0] : [-1, 1]; H.blink = k < 0.5 ? false : undefined
    H.squash = lerp(0.22, 0, prog(k, 0, 0.12)) - 0.3 * Math.max(0, wobble(t, T.idea + 0.05, 6, 18))
    if (t >= T.spark[0]) { const p = prog(t, ...T.spark); H.pop = 1 - ease.inCubic(p) * 0.9; H.mood = 'wide' }
  } else if (t < T.back[1]) {                                       // inside your phone
    H.hide = true
  } else if (t < T.dive2[0]) {                                      // back up there: deadpan, then hearts
    H.pop = pop01(t, T.back[1], 0.32, 2.2)
    if (t < T.l11) { H.mood = 'wide'; H.look = [-1, 1] }
    else if (t < T.hearts) { H.mood = 'squint'; H.look = [0, 0] }
    else { H.mood = 'heart'; H.wave = clamp((t - T.hearts) * 4) * (1 - prog(t, T.lesson + 2.5, T.lesson + 3.2)); H.rot = 0.13 * Math.sin((t - T.hearts) * 15) * H.wave }
    if (t >= T.cut3) { H.x = LESSON_AT.x; H.y = LESSON_AT.y; H.s = LESSON_AT.s; H.wave = 0; H.rot = 0; H.pop = 1; H.mood = t < T.lessonOut[0] - 1.5 ? 'heart' : 'happy'; H.look = [-1, 0] }
  } else if (t < T.dive2[1]) {                                      // zips down into the deck
    const p = ease.inCubic(prog(t, ...T.dive2))
    H.x = lerp(LESSON_AT.x, 800, p); H.y = lerp(LESSON_AT.y, 1180, p); H.s = LESSON_AT.s; H.pop = 1 - 0.6 * p; H.mood = 'happy'
  } else H.hide = true
  return H
}

// ── Pisces (background crier)
function pisAt(t) {
  const P = { x: PIS_AT.x, y: PIS_AT.y, s: PIS_AT.s, mood: 'sparkle', look: undefined, tears: 0, squash: 0, rot: 0, pk: pop01(t, T.drop + 0.12, 0.38, 2.2), blink: undefined }
  if (t < T_YOU) { P.mood = 'heart'; P.tears = 0.55 }
  else if (t < T.roll1) { P.mood = 'squint'; P.tears = 2; P.squash = 0.05 * Math.abs(Math.sin(t * 11)) }
  else if (t < T.roll1 + 0.75) { P.mood = 'eyeroll'; P.tears = 0.6 }
  else if (t < T.bonk) { P.mood = 'neutral'; P.look = [1, 1]; P.tears = 0.3 }
  else if (t < T.trace[0]) { P.mood = t < T.bonk + 1.3 ? 'wide' : 'squint'; P.look = [1, 1]; P.tears = t < T.bonk + 1.3 ? 0 : 1.2; P.blink = t < T.bonk + 1.3 ? false : undefined }
  else if (t < T.h4) { P.mood = t < T.trace[1] ? 'wide' : 'sparkle'; P.look = [1, 0]; P.tears = t < T.trace[1] ? 0 : 1 }
  else if (t < T.call) { P.mood = 'happy'; P.squash = -0.12 * pulse(((t - T.wave) % T.wavePeriod + T.wavePeriod) % T.wavePeriod, 0.3, 0.25) * (t > T.wave ? 1 : 0) }
  else if (t < T.hush) { P.mood = 'sparkle'; P.look = [1, 1] }
  else if (t < T.faint) { P.mood = 'wide'; P.look = [1, 1]; P.blink = false; P.tears = t > T.pats[1] ? 0.8 : 0 }
  else if (t < T.pisCome[0]) {                                      // FAINT: tips over off the moon's shoulder
    const p = ease.inQuad(prog(t, T.faint, T.faint + 0.35))
    P.mood = 'sleepy'; P.rot = -1.6 * p; P.x -= 40 * p; P.y += 150 * p - Math.sin(Math.PI * p) * 40
    if (t > T.cut2) { P.rot = -1.6; P.x -= 40; P.y += 150 }
  } else if (t < T.pisGo[0]) {                                      // comes over to sit with the deflated star
    const p = ease.inOutCubic(prog(t, ...T.pisCome))
    P.x = lerp(PIS_AT.x - 40, 676, p); P.y = lerp(PIS_AT.y + 150, 762, p) - Math.sin(Math.PI * p) * 60; P.rot = lerp(-1.6, 0, ease.outCubic(prog(t, T.pisCome[0], T.pisCome[0] + 0.3)))
    P.mood = t < T.pisCome[1] ? 'sleepy' : 'squint'; P.look = [1, 0]; P.tears = t < T.pisCome[1] ? 0 : t < T.l8 ? 1.6 : 3
    P.squash = t > T.pisCome[1] ? 0.05 * Math.abs(Math.sin(t * 10)) : 0
  } else if (t < T.buzz) {                                          // startles, zips home
    const p = ease.inOutCubic(prog(t, ...T.pisGo))
    P.x = lerp(676, PIS_AT.x, p); P.y = lerp(762, PIS_AT.y, p) - Math.sin(Math.PI * p) * 90
    P.mood = 'wide'; P.look = [1, 1]; P.blink = false
  } else if (t < T.lookUp) { P.mood = 'wide'; P.look = [1, 1]; P.blink = false }
  else if (t < T.lesson) { P.mood = t < T.wail ? 'heart' : 'happy'; P.tears = t < T.wail ? 1.2 : 3; P.squash = t > T.wail ? 0.07 * Math.sin(t * 22) : 0 }
  else { P.mood = 'sparkle'; P.tears = 1 }
  return P
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "500 26px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const BACK = bake(await loadImg('card-back.png'), 480)
  const BACK_BODY = 1320 / 1528

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const low = document.createElement('canvas'); low.width = LW; low.height = LH
  const l = low.getContext('2d')

  // ── type
  const HD = (text, o) => popText(root, text, { wobble: true, lineHeight: 1.0, ...o })
  const HEADS = [
    [HD('Your star | has been | *trying.*', { top: 136, size: 92, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, accentColor: LIBC }), T.h0Out],
    [HD('Full moon. | Cute *stranger.*', { top: 150, size: 100, accentSize: 140, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: GOLD }), T.h1Out],
    [HD('Attempt one: | a *shooting star.*', { top: 150, size: 92, accentSize: 122, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, accentColor: GOLD }), T.h2Out],
    [HD('Attempt two: | *spell it out.*', { top: 150, size: 92, accentSize: 132, at: T.h3, late: 3, lateAt: T.h3Land, lateGap: 0.1, accentColor: GOLD }), T.h3Out],
    [HD('Attempt three: | *the wave.*', { top: 150, size: 92, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, lateGap: 0.12, accentColor: '#ffd98a' }), T.h4Out],
    [HD('Emergency *dog.*', { top: 176, size: 104, accentSize: 156, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: PINK }), T.h5Out],
    [HD('Your star | is *tired.*', { top: 150, size: 100, accentSize: 150, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: LAV }), T.h6Out],
    [HD('Plan *B.*', { top: 168, size: 130, accentSize: 190, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: GOLD }), T.h7Out],
    [HD('You looked *up.*', { top: 176, size: 104, accentSize: 156, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: GOLD }), T.h8Out],
    [HD("Tonight's *deck.*", { top: 176, size: 112, accentSize: 160, at: T.h9, late: 1, lateAt: T.h9Land, accentColor: LAV }), T.h9Out],
    [HD("Pick up. | It's the *stars.*", { top: 150, size: 104, accentSize: 150, at: T.h10, late: 1, lateAt: T.h10Land, accentColor: GOLD }), T.h10Out],
  ]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1490, width: 960, height: 250, close, cps: CPS }))
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el2(root)
  function el2(parent) { const d = document.createElement('div'); Object.assign(d.style, { position: 'absolute', inset: '0', background: '#000', pointerEvents: 'none' }); parent.appendChild(d); return d }

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const label = (txt, X, Y, size, fillC, { font = MONO, weight = 700, stroke = 8, align = 'center' } = {}) => {
    x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = stroke; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = fillC; x.fillText(txt, X, Y)
  }
  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.55 + 0.6 * p), cy + Math.sin(a) * R * (0.55 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ═══════════════════════ the world ═══════════════════════
  function drawMoonNow(t) {
    const full = ease.inOutCubic(prog(t, T.drop - 0.05, T.drop + 0.4))
    const phase = lerp(0.16, 0.5, full)
    const bloom = pulse(t, T.drop, 0.9) + 0.6 * pulse(t, T.lookUp, 1.0)
    drawMoon(x, MOON.x, MOON.y, MOON.r * (1 + 0.08 * bloom), phase, { alpha: 1, glow: 2.4 + 2.5 * bloom, earthshine: 1, darkAlpha: 0.62 })
  }
  function drawPlanets(t, you) {
    if (t > T.planetsOut[1] + 0.05) return
    const out = i => ease.inQuad(prog(t, T.planetsOut[0] + i * 0.05, T.planetsOut[1]))
    // the pointer: a marching dotted gold line through the planets, down to an arrow over your head
    const ya = youAnchors(you), hx = AX(ya.crown[0]), hy = AY(ya.crown[1]) - 50
    const a0 = [PLAN[0][1], PLAN[0][2]], a1 = [hx, hy], len = Math.hypot(a1[0] - a0[0], a1[1] - a0[1])
    const ux = (a1[0] - a0[0]) / len, uy = (a1[1] - a0[1]) / len, la = 1 - out(4)
    x.save(); x.globalAlpha = la
    for (let d = (t * 90) % 26; d < len - 30; d += 26) { const px = a0[0] + ux * d, py = a0[1] + uy * d; x.fillStyle = GOLD; x.fillRect(Math.round(px) - 4, Math.round(py) - 4, 8, 8) }
    // arrow head
    x.translate(a1[0], a1[1]); x.rotate(Math.atan2(uy, ux))
    const bob = Math.sin(t * 9) * 5
    for (const [i, j] of [[0, 0], [-1, -1], [-1, 1], [-2, -2], [-2, 2], [-3, -3], [-3, 3], [-1, 0], [-2, 0], [-2, -1], [-2, 1], [-3, -2], [-3, 2], [-3, -1], [-3, 1], [-3, 0]]) {
      x.fillStyle = INK; x.fillRect(i * 9 + bob - 2, j * 9 - 2, 13, 13)
    }
    for (const [i, j] of [[0, 0], [-1, -1], [-1, 1], [-2, -2], [-2, 2], [-3, -3], [-3, 3], [-1, 0], [-2, 0], [-2, -1], [-2, 1], [-3, -2], [-3, 2], [-3, -1], [-3, 1], [-3, 0]]) {
      x.fillStyle = (i + j) % 2 ? GOLD : '#ffe7a0'; x.fillRect(i * 9 + bob, j * 9, 9, 9)
    }
    x.restore()
    PLAN.forEach(([k, px, py, r], i) => {
      const o = out(i), b = pulse(t, T.ping[i], 0.3)
      const dx = (i - 2) * 70 * o, dy = -60 * o + Math.sin(t * 2.2 + i * 1.3) * 3
      drawPlanet(x, px + dx, py + dy, r * (1 + 0.3 * b), k, { alpha: 1 - o, cell: r > 24 ? 6 : 5 })
      if (b > 0) sparkles(t, px, py, T.ping[i], 6, r * 2.4, i, 0.45, 18)
    })
  }
  function drawHi(t) {
    if (t < T.trace[0]) return
    const L = traceL(t)
    let a = 1
    if (t >= T.hiDim[0] && t < T.lookUp) a = lerp(1, 0.26, ease.inOutQuad(prog(t, ...T.hiDim)))
    else if (t >= T.lookUp) a = lerp(0.26, 1, ease.outCubic(prog(t, T.lookUp + 0.05, T.lookUp + 0.45)))
    x.save(); x.globalAlpha = a
    // lines
    x.lineCap = 'round'; x.lineJoin = 'round'
    for (const pass of [0, 1]) {
      x.strokeStyle = pass ? '#ffe7a0' : rgba(GOLD, 0.35); x.lineWidth = pass ? 6 : 18
      for (const s of HI.segs) {
        if (!s.pen) continue
        const f = clamp((L - s.L0) / (s.L1 - s.L0))
        if (f <= 0) continue
        x.beginPath(); x.moveTo(s.a[0], s.a[1]); x.lineTo(lerp(s.a[0], s.b[0], f), lerp(s.a[1], s.b[1], f)); x.stroke()
      }
    }
    // nodes
    HI.nodes.forEach((n, i) => {
      if (L < n.L - 0.5) return
      const k = easeOutBack(clamp((L - n.L) / 110), 2.6), tw = 0.85 + 0.15 * Math.sin(t * 5 + i * 1.7)
      const g = x.createRadialGradient(n.x, n.y, 0, n.x, n.y, 46); g.addColorStop(0, rgba('#fff1c8', 0.55 * tw)); g.addColorStop(1, rgba('#fff1c8', 0))
      x.fillStyle = g; x.fillRect(n.x - 46, n.y - 46, 92, 92)
      drawPixelStar(x, n.x, n.y, (n.dot ? 44 : 32) * k * tw, n.dot ? 2 : 1, '#ffe7a0')
    })
    x.restore()
  }
  function drawRiver(t) {
    const y0 = AY(DECK + 8)
    const g = x.createLinearGradient(0, y0, 0, H); g.addColorStop(0, '#1d1240'); g.addColorStop(0.5, '#110a2c'); g.addColorStop(1, '#080519')
    x.fillStyle = g; x.fillRect(0, y0, W, H - y0 + 400)
    // the moon in the water + each lamp's warm streak (horizontal shimmering dashes)
    const streaks = [[MOON.x, '#f1ebff', 0.75, 70], ...LAMP_X.map(lx => [AX(lx) + 6, '#ffd98a', 0.55, 30])]
    streaks.forEach(([sx, col, a, w0], s2) => {
      for (let k = 0; k < 24; k++) {
        const yy = y0 + 14 + k * 20, ph = Math.sin(t * 1.7 + k * 0.9 + s2 * 2.1), w = w0 * (1 - k / 34) * (0.55 + 0.45 * ph)
        x.globalAlpha = a * (1 - k / 28) * (0.55 + 0.45 * Math.sin(t * 2.3 + k * 1.3 + s2))
        x.fillStyle = col; x.fillRect(Math.round(sx - w / 2 + Math.sin(t * 1.3 + k) * 8), Math.round(yy), Math.max(6, Math.round(w)), 5)
      }
    })
    // a few drifting sparkles on the water
    for (let i = 0; i < 18; i++) { const sx = (i * 173 + t * 14 * (i % 3 + 1)) % W, sy = y0 + 40 + ((i * 97) % 420); x.globalAlpha = 0.25 + 0.25 * Math.sin(t * 3 + i * 1.7); x.fillStyle = '#c9b8ff'; x.fillRect(Math.round(sx), Math.round(sy), 6, 3) }
    x.globalAlpha = 1
  }
  function glows(t, S) {
    x.save(); x.globalCompositeOperation = 'lighter'
    S.lamps.forEach((b, i) => {
      if (b <= 0.05) return
      const [gx0, gy0] = lampGlass(i), cx = AX(gx0), cy = AY(gy0), r = 70 + 50 * clamp(b - 0.6)
      const g = x.createRadialGradient(cx, cy, 0, cx, cy, r * 1.8)
      g.addColorStop(0, rgba('#ffe2a0', 0.42 * clamp(b, 0, 1.6))); g.addColorStop(0.35, rgba('#ffc46a', 0.16 * clamp(b, 0, 1.6))); g.addColorStop(1, rgba('#ffc46a', 0))
      x.fillStyle = g; x.fillRect(cx - r * 1.8, cy - r * 1.8, r * 3.6, r * 3.6)
    })
    // your phone lights your face (until you look up)
    const ya = youAnchors(S.you), down = t < T.lookUp ? 1 : 1 - prog(t, T.lookUp, T.lookUp + 0.4)
    const flash = 0.8 * pulse(t, T.dive[1], 0.45) + 0.45 * Math.max(pulse(t, T.buzz + 0.02, 0.25), pulse(t, T.buzz + 0.3, 0.25))
    if (down > 0 || flash > 0) {
      const px = AX(ya.phone[0]), py = AY(ya.phone[1]), r = 70 + 70 * flash
      const g = x.createRadialGradient(px, py - 18, 0, px, py - 18, r)
      g.addColorStop(0, rgba('#9ff0ff', 0.4 * down + 0.35 * flash)); g.addColorStop(1, rgba('#9ff0ff', 0))
      x.fillStyle = g; x.fillRect(px - r, py - 18 - r, 2 * r, 2 * r)
    }
    x.restore()
  }

  // ── the street overlays (world px)
  function shootingStar(t) {
    // the throw: from the star's left tip down onto your crown
    const ya = youAnchors(youAt(T.bonk)), tx = AX(ya.crown[0]), ty = AY(ya.crown[1])
    const P0 = [HOME.x - 120, HOME.y - 10], P1 = [560, 700], P2 = [tx, ty]
    const at = u => [(1 - u) ** 2 * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) ** 2 * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]]
    const U = tt => ease.inQuad(prog(tt, T.hurl, T.bonk))
    if (inR(t, T.hurl, T.bonk)) {
      for (let k = 18; k >= 1; k--) {
        const tt = t - k * 0.016
        if (tt < T.hurl) continue
        const [px, py] = at(U(tt)), a = (1 - k / 19)
        x.globalAlpha = a * 0.85; x.fillStyle = k % 3 ? '#fff1c8' : PINK
        const sz = Math.round(26 * a) + 6; x.fillRect(Math.round(px - sz / 2), Math.round(py - sz / 2), sz, sz)
      }
      x.globalAlpha = 1
      const [px, py] = at(U(t))
      const g = x.createRadialGradient(px, py, 0, px, py, 110); g.addColorStop(0, rgba('#fff6d8', 0.9)); g.addColorStop(1, rgba('#fff6d8', 0))
      x.fillStyle = g; x.fillRect(px - 110, py - 110, 220, 220)
      drawPixelStar(x, px, py, 72, 2, '#fff1c8')
    }
    // the bounce: off your head, up and away
    const bt = t - T.bonk
    if (bt >= 0 && bt < 0.95) {
      const px = tx - 430 * bt, py = ty - 720 * bt + 0.5 * 2300 * bt * bt
      x.globalAlpha = 1 - ease.inQuad(bt / 0.95)
      drawPixelStar(x, px, py, 40, Math.floor(bt * 14) % 2 ? 1 : 2, '#fff1c8')
      x.globalAlpha = 1
      // impact flash + BONK!
      if (bt < 0.18) { const g = x.createRadialGradient(tx, ty, 0, tx, ty, 120); g.addColorStop(0, rgba('#ffffff', 0.7 * (1 - bt / 0.18))); g.addColorStop(1, rgba('#ffffff', 0)); x.fillStyle = g; x.fillRect(tx - 120, ty - 120, 240, 240) }
    }
    if (bt >= 0 && bt < 1.25) {
      const k = easeOutBack(prog(bt, 0, 0.22), 3), a = 1 - prog(bt, 0.95, 1.25)
      x.save(); x.globalAlpha = a; x.translate(tx - 120, ty - 92 - bt * 10); x.rotate(-0.16); x.scale(k, k)
      label('BONK!', 0, 0, 60, '#ffd95a', { stroke: 12 }); x.restore()
    }
    // dizzy: little stars circling your head
    if (inR(t, ...T.dizzy)) {
      const a = clamp((t - T.dizzy[0]) * 4) * (1 - prog(t, T.dizzy[1] - 0.4, T.dizzy[1]))
      const ya2 = youAnchors(youAt(t)), cx = AX(ya2.crown[0]), cy = AY(ya2.crown[1]) - 8
      x.globalAlpha = a
      for (let i = 0; i < 3; i++) { const an = t * 7 + i * 2.09; drawPixelStar(x, cx + Math.cos(an) * 34, cy + Math.sin(an) * 10, 20, 1, i % 2 ? GOLD : '#fff1c8') }
      x.globalAlpha = 1
    }
  }
  function hearts(t, S) {
    if (!S.str || !S.dog) return
    const sa = strAnchors(S.str), ya = youAnchors(S.you), da = dogAnchors(S.dog)
    const float = (t0, wx, wy, px = 6, col = '#ff5c8a', life = 1.2) => {
      const k = t - t0; if (k < 0 || k > life) return
      drawPixelHeart(x, wx + Math.sin(k * 6) * 6, wy - k * 70, px * (0.6 + 0.4 * easeOutBack(prog(k, 0, 0.25), 2.4)), col, 1 - ease.inQuad(k / life))
    }
    float(T.glance[0] + 0.2, AX(sa.crown[0]) - 10, AY(sa.crown[1]) - 10)
    for (const p of T.pats) float(p, AX(da.head[0]), AY(da.head[1]) - 20, 5, '#ff7aa8', 0.9)
    float(T.plop + 0.02, AX(da.head[0]) - 6, AY(da.head[1]) - 30, 6, '#ff5c8a', 1.0)
    float(T.youWave[0] + 0.3, (AX(ya.crown[0]) + AX(sa.crown[0])) / 2, AY(ya.crown[1]) - 30, 7, '#ff5c8a', 1.6)
    float(T.youWave[0] + 0.9, (AX(ya.crown[0]) + AX(sa.crown[0])) / 2 + 30, AY(ya.crown[1]) - 20, 5, '#ff8fb1', 1.4)
    // the wish: a twinkle over the stranger's clasped hands
    if (inR(t, ...T.wish)) { const k = (t - T.wish[0]); x.globalAlpha = clamp(k * 3) * (1 - prog(t, T.wish[1] - 0.3, T.wish[1])); drawPixelStar(x, AX(sa.head[0]) - 34, AY(sa.head[1]) - 24 - Math.sin(k * 4) * 6, 22 + 6 * Math.sin(k * 9), 2, '#fff1c8'); x.globalAlpha = 1 }
  }
  function notif(t, S) {
    const t0 = T.buzz + 0.02
    if (t < t0 || t > T.lookUp + 0.6) return
    const k = easeOutBack(prog(t, t0, t0 + 0.3), 1.8) * (1 - ease.inCubic(prog(t, T.lookUp + 0.2, T.lookUp + 0.55)))
    if (k <= 0.01) return
    const bz = Math.max(pulse(t, t0, 0.25), pulse(t, t0 + 0.3, 0.25))
    const ya = youAnchors(S.you)
    const cx = AX(ya.head[0]) + 50 + Math.sin(t * 150) * 7 * bz, cy = AY(ya.head[1]) - 160
    const w = 470, h = 132
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.save(); x.shadowColor = rgba(GOLD, 0.5); x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 30); x.fillStyle = 'rgba(30,20,62,0.96)'; x.fill(); x.restore()
    x.lineWidth = 4; x.strokeStyle = rgba(GOLD, 0.9); rr(-w / 2, -h / 2, w, h, 30); x.stroke()
    // a tail down to your phone
    x.fillStyle = 'rgba(30,20,62,0.96)'; x.beginPath(); x.moveTo(-40, h / 2 - 2); x.lineTo(-62, h / 2 + 30); x.lineTo(-12, h / 2 - 2); x.fill()
    drawPixelStar(x, -w / 2 + 62, 0, 56, 2, GOLD)
    x.textBaseline = 'middle'; x.textAlign = 'left'
    x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText('YOUR STAR', -w / 2 + 112, -h / 2 + 38)
    x.font = `500 24px ${INTER}`; x.fillStyle = rgba(BONE, 0.6); x.textAlign = 'right'; x.fillText('now', w / 2 - 28, -h / 2 + 38)
    x.font = `800 48px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.fillText('look up', -w / 2 + 112, 24)
    // a pixel up-arrow after the words
    const ax0 = -w / 2 + 112 + x.measureText('look up').width + 30, ay0 = 22
    for (const [i, j] of [[0, -3], [-1, -2], [0, -2], [1, -2], [-2, -1], [-1, -1], [0, -1], [1, -1], [2, -1], [0, 0], [0, 1], [0, 2]]) { x.fillStyle = PINK; x.fillRect(ax0 + i * 7, ay0 + j * 7, 7, 7) }
    x.restore()
  }
  function hiBubble(t, S) {
    const t0 = T.strHi + 0.1
    if (t < t0 || t >= T.lesson) return
    const k = easeOutBack(prog(t, t0, t0 + 0.3), 2.2) * (1 - prog(t, T.lesson - 0.3, T.lesson - 0.05))
    if (k <= 0.01) return
    const sa = strAnchors(S.str), hx = AX(sa.head[0]), hy = AY(sa.head[1])
    const bx = hx + 70, by = hy - 128, w = 168, h = 92
    x.save(); x.translate(bx, by); x.scale(k, k)
    x.fillStyle = INK; rr(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 22); x.fill()
    x.beginPath(); x.moveTo(-44, h / 2); x.lineTo(-74, h / 2 + 46); x.lineTo(-14, h / 2); x.fill()
    x.fillStyle = '#fbf6ec'; rr(-w / 2, -h / 2, w, h, 16); x.fill()
    x.beginPath(); x.moveTo(-40, h / 2 - 2); x.lineTo(-64, h / 2 + 32); x.lineTo(-20, h / 2 - 2); x.fill()
    x.fillStyle = INK; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hi!', 0, 3)
    x.restore()
  }

  // ── the cast (world px)
  function drawPisces(t) {
    if (t < T.drop) return
    const P = pisAt(t)
    if (P.pk <= 0.02) return
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: P.mood, look: P.look, blink: P.blink, squash: P.squash, seed: 12, pop: P.pk, glow: 0.8, zzz: false }
    x.save(); x.translate(P.x, P.y); x.rotate(P.rot)
    const R = drawStarChar(x, 0, 0, P.s, t, opts)
    if (P.tears > 0) { const S2 = R.size, ey = R.y + S2 * 0.07, exo = S2 * 0.17; drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S2 / 24), strength: P.tears }) }
    x.restore()
  }
  function drawHero(t) {
    const Hh = heroAt(t)
    // the cloud it deflates onto (drifts in under it, drifts off at the idea)
    const ck = ease.outCubic(prog(t, ...T.cloudIn)) * (1 - ease.inCubic(prog(t, T.idea + 0.1, T.idea + 0.7)))
    if (ck > 0 && t < T.spark[1]) drawCloud(x, HOME.x + (1 - ck) * 300 + (t > T.idea ? ease.inCubic(prog(t, T.idea + 0.1, T.idea + 0.7)) * -200 : 0), CLOUD_TOP, 12, { alpha: clamp(ck * 1.5) })
    if (!Hh.hide) {
      const opts = { color: LIB.color, glyph: Hh.s * Hh.pop >= 140 ? LIB.glyph : null, mood: Hh.mood, look: Hh.look, blink: Hh.blink, squash: Hh.squash, hops: HERO_HOPS, seed: 3, pop: Hh.pop, glow: Hh.glow, zzz: false, blush: Hh.blush }
      x.save(); x.translate(Hh.x, Hh.y); x.rotate(Hh.rot)
      const R = drawStarChar(x, 0, 0, Hh.s, t, opts)
      // waving with all five points: little motion ticks at the tips
      if (Hh.wave > 0) {
        x.globalAlpha = Hh.wave; x.fillStyle = '#fff1c8'
        const ph = Math.sin((t - T.hearts) * 15)
        for (const [ang, d] of [[-Math.PI / 2, 0.62], [-Math.PI / 2 + 1.257, 0.6], [-Math.PI / 2 - 1.257, 0.6], [Math.PI / 2 + 0.63, 0.6], [Math.PI / 2 - 0.63, 0.6]]) {
          const tx = R.x + Math.cos(ang) * R.size * d, ty = R.y + 8 + Math.sin(ang) * R.size * d
          for (let k = 0; k < 3; k++) x.fillRect(Math.round(tx + Math.cos(ang + Math.PI / 2) * (k - 1) * 12 * ph), Math.round(ty + Math.sin(ang + Math.PI / 2) * (k - 1) * 12 * ph), 6, 6)
        }
        x.globalAlpha = 1
      }
      x.restore()
      // the idea "!"
      const bk = t >= T.idea ? easeOutBack(prog(t, T.idea, T.idea + 0.25), 3) * (1 - prog(t, T.idea + 1.1, T.idea + 1.35)) : 0
      if (bk > 0) drawBang(x, Hh.x + 10, Hh.y - Hh.s * 0.62, 9 * bk, { rot: 0.12 * Math.sin((t - T.idea) * 18) * Math.exp(-(t - T.idea) * 3) })
    }
    // the raincloud over the deflated star
    const rk = t >= T.rain && t < T.idea + 0.35 ? pop01(t, T.rain, 0.3, 2) * (1 - prog(t, T.idea, T.idea + 0.25)) : 0
    if (rk > 0) drawRainCloud(x, HOME.x + 6, 540, 10 * rk, t, { rain: t < T.idea ? 1 : 0 })
    if (t >= T.idea && t < T.idea + 0.5) sparkles(t, HOME.x + 6, 565, T.idea, 8, 90, 0.4, 0.45, 20, ['#c9c6e0', BONE])
  }
  function spark(t, S) {
    // the dive: a bright spark along an arc into your phone
    const ya = youAnchors(S.you), px = AX(ya.phone[0]), py = AY(ya.phone[1]) - 12
    const fly = (u, a0, a1, lift) => [lerp(a0[0], a1[0], u), lerp(a0[1], a1[1], u) - Math.sin(Math.PI * u) * lift]
    let pos = null, trailFrom = null
    if (inR(t, ...T.dive)) { const U = tt => ease.inQuad(prog(tt, ...T.dive)); pos = fly(U(t), [HOME.x, HOME.y - 10], [px, py], 160); trailFrom = tt => fly(U(tt), [HOME.x, HOME.y - 10], [px, py], 160) }
    else if (inR(t, ...T.back)) { const U = tt => ease.outQuad(prog(tt, ...T.back)); pos = fly(U(t), [px, py], [HOME.x, HOME.y], 120); trailFrom = tt => fly(U(tt), [px, py], [HOME.x, HOME.y], 120) }
    if (!pos) return
    for (let k = 10; k >= 1; k--) {
      const [qx, qy] = trailFrom(t - k * 0.02), a = 1 - k / 11
      x.globalAlpha = a * 0.8; x.fillStyle = k % 2 ? '#fff1c8' : LIBC
      const sz = Math.round(12 * a) + 4; x.fillRect(Math.round(qx - sz / 2), Math.round(qy - sz / 2), sz, sz)
    }
    x.globalAlpha = 1
    const g = x.createRadialGradient(pos[0], pos[1], 0, pos[0], pos[1], 70); g.addColorStop(0, rgba('#fff2fb', 0.85)); g.addColorStop(1, rgba('#ff9ae6', 0))
    x.fillStyle = g; x.fillRect(pos[0] - 70, pos[1] - 70, 140, 140)
    drawPixelStar(x, pos[0], pos[1], 44, 2, '#ffd6f4')
  }

  // ═══════════════════════ tonight's deck + the call (screen px) ═══════════════════════
  const FAN = [-26, -13, 0, 13, 26], FAN_R = 560, FAN_PY = 1700, CARD_W = 228
  function cardImg(img, body, cx, cy, wBody, rot = 0, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function deck(t) {
    if (t < T.deal || t >= T.deckOut[1]) return
    const o = ease.inCubic(prog(t, ...T.deckOut))
    FAN.forEach((deg, i) => {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5), a = deg * Math.PI / 180
      const fx = 540 + Math.sin(a) * FAN_R, fy = FAN_PY - Math.cos(a) * FAN_R
      const cx = lerp(540 + (i - 2) * 40, fx, e), cy = lerp(2300, fy, e) + o * 1000, rot = lerp(a * 2.2 + 0.4, a, e) + o * (i - 2) * 0.2
      if (i === 4) peekStar(t, fx, fy + o * 1000, a)
      cardImg(BACK, BACK_BODY, cx, cy, CARD_W, rot)
    })
  }
  function peekStar(t, fx, fy, a) {
    // your star hides behind the last card, then leans out and winks
    if (t < T.peek[0]) return
    const p = ease.outBack(prog(t, ...T.peek))
    const px = fx + Math.cos(a) * 30 + p * 128, py = fy - 120 - p * 26
    const winking = inR(t, ...T.wink)
    drawStarChar(x, px, py, 144, t, { color: LIB.color, glyph: LIB.glyph, mood: winking ? 'wink' : t < T.peek[1] + 0.3 ? 'sparkle' : 'happy', look: [-1, 0], seed: 3, hops: HERO_HOPS, rot: 0, glow: 0.9 })
    if (winking) sparkles(t, px + 50, py - 30, T.wink[0] + 0.05, 6, 60, 0.3, 0.5, 18)
  }
  function callPhone(t) {
    if (t < T.phoneIn[0] || t > T.out[1]) return
    const k = easeOutBack(prog(t, ...T.phoneIn), 1.7) * popOut(t, T.out)
    if (k <= 0.01) return
    let rz = 0
    for (const r of T.rings) { const u = t - r; if (u >= 0 && u < 0.5) rz = Math.max(rz, 1 - u / 0.5) }
    const PX = 520, PY = 1050, sc = 0.82 * k
    const jx = rz * 8 * Math.sin(t * 170), jr = rz * 0.05 * Math.sin(t * 140 + 1)
    x.save(); x.translate(PX + jx, PY); x.rotate(-0.04 + jr); x.scale(sc, sc)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    if (rz > 0) {
      x.save(); x.strokeStyle = rgba(BONE, 0.85 * rz); x.lineWidth = 8; x.lineCap = 'round'
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { x.beginPath(); x.arc(0, -hh + 150, hw + 36 + i * 32, sd < 0 ? Math.PI - 0.32 : -0.32, sd < 0 ? Math.PI + 0.32 : 0.32); x.stroke() }
      x.restore()
    }
    x.save(); x.shadowColor = rgba(LIBC, 0.6); x.shadowBlur = 70; rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#2a1758'); g.addColorStop(0.55, '#4a2370'); g.addColorStop(1, '#6a2a72')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    for (let i = 0; i < 26; i++) { const r2 = (i * 97) % 360, sxx = sx + ((i * 53) % sw), syy = sy + ((i * 131) % sh); x.globalAlpha = 0.3 + 0.3 * Math.sin(t * 3 + i); x.fillStyle = '#fff1c8'; x.fillRect(sxx, syy, 4, 4); void r2 }
    x.globalAlpha = 1
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.7); x.fillText('INCOMING CALL', 0, sy + 92)
    // the avatar ring (the star itself is drawn over it, outside the transform, at whole pixels)
    const ring = 0.5 + 0.5 * Math.sin(t * 9)
    x.fillStyle = rgba(GOLD, 0.25 + 0.2 * ring); x.beginPath(); x.arc(0, -80, 118 + 10 * ring, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#1e1240'; x.beginPath(); x.arc(0, -80, 104, 0, Math.PI * 2); x.fill()
    x.lineWidth = 5; x.strokeStyle = GOLD; x.stroke()
    x.font = `800 54px ${INTER}`; x.fillStyle = BONE; x.fillText('The Stars', 0, 92)
    x.font = `700 26px ${MONO}`; x.fillStyle = GOLD; x.fillText('calling' + '.'.repeat(1 + Math.floor(t * 3) % 3), 0, 142)
    // decline / accept
    const pulseA = 1 + 0.1 * Math.sin(t * 10)
    x.fillStyle = '#e8484f'; x.beginPath(); x.arc(-100, sy + sh - 120, 50, 0, Math.PI * 2); x.fill()
    x.save(); x.translate(100, sy + sh - 120); x.scale(pulseA, pulseA)
    x.fillStyle = rgba('#46cf82', 0.35); x.beginPath(); x.arc(0, 0, 66, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill()
    x.restore()
    for (const [bx0, rot2] of [[-100, 2.35], [100, 0]]) {
      x.save(); x.translate(bx0, sy + sh - 120); x.rotate(rot2 + (bx0 > 0 ? 0.25 * Math.sin(t * 20) * rz : 0))
      x.fillStyle = '#ffffff'; x.lineWidth = 12; x.lineCap = 'round'; x.strokeStyle = '#ffffff'
      x.beginPath(); x.arc(0, 4, 20, Math.PI * 1.05, Math.PI * 1.95); x.stroke()
      x.fillRect(-27, -4, 14, 12); x.fillRect(13, -4, 14, 12)
      x.restore()
    }
    x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.65); x.fillText('pick up', 100, sy + sh - 44)
    x.restore()
    x.restore()
    // the caller: your star's face in the avatar (whole pixels), and your star beside the phone, calling
    const ang = -0.04 + jr, ax0 = PX + jx + Math.sin(ang) * 80 * sc, ay0 = PY - Math.cos(ang) * 80 * sc
    drawStarChar(x, ax0, ay0 + 6, 144 * k, t, { color: LIB.color, mood: 'happy', look: [0, 0], seed: 21, bob: 0, glow: 0.6, tips: false, hops: T.rings.map(r => r + 0.02) })
    const hk = pop01(t, T.phoneIn[0] + 0.15, 0.36, 2.2) * popOut(t, T.out)
    if (hk > 0.02) {
      const hx = 866, hy = 836
      const R = drawStarChar(x, hx, hy, 216, t, { color: LIB.color, glyph: LIB.glyph, mood: t > 54.55 ? 'wink' : 'happy', look: [-1, 0], seed: 3, pop: hk, hops: T.rings.map(r => r - 0.04), glow: 1 })
      drawTinyPhone(x, R.x - R.size * 0.42, R.y + R.size * 0.02, 8 * hk, { rot: -0.35, glow: 0.8 })
    }
  }

  // ═══════════════════════ frame ═══════════════════════
  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t)
      const lookK = t >= T.lookUp ? pulse(t, T.lookUp, 1.2) : 0
      const sadK = clamp(prog(t, T.sink[0], T.sink[0] + 0.6)) * (1 - prog(t, T.idea, T.idea + 0.4))
      drawSky(x, t, { ...SKY_H, moon: null, zoom: SKY_H.zoom * (1 + (cam.z - 1) * 0.35), dx: -(cam.cx - 540) * 0.25, dy: -(cam.cy - 960) * 0.25, dim: SKY_H.dim * (1 - 0.35 * sadK) + 0.25 * lookK })
      const S = { you: youAt(t), str: t >= T.drop ? strAt(t) : null, dog: t >= T.drop ? dogAt(t) : null, lamps: lampsAt(t), lift: liftAt(t) }
      const strK = clamp(prog(t, T.drop, T.drop + 0.3))
      if (t < T.out[1] + 0.02) {
        x.save(); x.translate(540, 960); x.scale(cam.z, cam.z); x.translate(-cam.cx, -cam.cy)
        drawMoonNow(t)
        drawPlanets(t, S.you)
        drawHi(t)
        drawRiver(t)
        // the bridge (the stranger + dog fade in at the drop)
        paintBridge(l, t, strK < 1 ? { ...S, str: null, dog: null } : S)
        x.imageSmoothingEnabled = false
        x.drawImage(low, 0, BY, LW * PS, LH * PS)
        if (strK > 0 && strK < 1) { paintBridge(l, t, { peopleOnly: true, you: null, str: S.str, dog: S.dog }); x.globalAlpha = strK; x.drawImage(low, 0, BY, LW * PS, LH * PS); x.globalAlpha = 1 }
        x.imageSmoothingEnabled = true
        if (strK > 0 && strK < 1) { const sa = strAnchors(S.str); sparkles(t, AX(sa.head[0]), AY(sa.head[1]) + 40, T.drop, 10, 110, 0.2, 0.6, 24) }
        glows(t, S)
        if (sadK > 0) { x.fillStyle = `rgba(8,6,24,${0.38 * sadK})`; x.fillRect(-400, -400, W + 800, H + 800) }
        shootingStar(t)
        hearts(t, S)
        drawPisces(t)
        drawHero(t)
        spark(t, S)
        notif(t, S)
        hiBubble(t, S)
        if (t >= T.lookUp && t < T.lookUp + 0.8) { const ya = youAnchors(S.you); sparkles(t, AX(ya.head[0]), AY(ya.head[1]) - 40, T.lookUp, 12, 160, 0.5, 0.8, 26) }
        sparkles(t, HOME.x, HOME.y, T.back[1], 10, 200, 0.1, 0.7, 28)
        x.restore()
        // while the camera is pushed in, the sky above slides up under the headline: shade it so the type stays clean
        const pz = clamp((cam.z - 1) / 0.32)
        if (pz > 0.01) { const g = x.createLinearGradient(0, 0, 0, 560); g.addColorStop(0, `rgba(6,4,18,${0.72 * pz})`); g.addColorStop(0.75, `rgba(6,4,18,${0.4 * pz})`); g.addColorStop(1, 'rgba(6,4,18,0)'); x.fillStyle = g; x.fillRect(0, 0, W, 560) }
        // the tie-in scrim, tonight's deck, the call
        const tk = clamp(prog(t, T.deal - 0.1, T.deal + 0.3))
        if (tk > 0) { x.fillStyle = `rgba(6,4,18,${0.62 * tk})`; x.fillRect(0, 0, W, H) }
        deck(t)
        callPhone(t)
        // the punchline frame flash when you finally look up
        if (lookK > 0 && t < T.lookUp + 0.3) { x.fillStyle = `rgba(255,243,220,${0.18 * pulse(t, T.lookUp, 0.3)})`; x.fillRect(0, 0, W, H) }
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 3 of these 7 (indices 1, 3, 5):
// 14.9 (attempt one → two), 29.45 (the dog → your star is tired), 43.82 (→ ★ LESSON UNLOCKED). End card flips at 55.6.
export const CUTS = [9.5, { t: T.cut1, kind: 'flip' }, 20.42, { t: T.cut2, kind: 'shuffle' }, 35.55, { t: T.cut3, kind: 'deal' }, 48.42]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the films' D-major palette and moved into E by the engine;
//    chip / lead notes are written in E)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const FXO = { rev: 0, dly: 0, bus: 'fx' }
/** real silence in the score: a tape stop at t0, then more tape stops chained over its own silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L }
  return out
}
const scratch = t0 => [['whoosh', r3(t0 + 0.07), 0.1, 0.13], ['whoosh', r3(t0 + 0.17), 0.08, 0.1], ['whoosh', r3(t0 + 0.27), 0.14, 0.12]]
const womp = (t0, g = 0.05) => [[329.63, 0, 0.26], [311.13, 0.3, 0.26], [293.66, 0.6, 0.26], [277.18, 0.9, 0.9]].map(([f, d, len]) => ['lead', r3(t0 + d), f, len, { wave: 'saw', gain: g, cutoff: 1300, env: 500, envDecay: 4, vib: d > 0.8 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, rev: 0.2, dly: 0, bus: 'fx' }])
const bwomp = (t0, g = 0.045) => [[246.94, 0, 0.16], [164.81, 0.16, 0.42]].map(([f, d, len]) => ['lead', r3(t0 + d), f, len, { wave: 'saw', gain: g, cutoff: 900, env: 400, envDecay: 5, decay: 0.2, sustain: 0.8, release: 0.1, rev: 0.15, dly: 0, bus: 'fx' }])
const sob = (t0, gain = 0.02, pan = -0.4) => [['pop', r3(t0), 659.25, gain, pan], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, pan], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, pan]]
const boing = (t0, g = 0.03, pan = 0) => [392, 523.25, 659.25, 880].map((f, i) => ['pop', r3(t0 + i * 0.045), f, g, pan])
const whistle = (t0, len = 0.5, gain = 0.026) => Array.from({ length: Math.round(len / 0.03) }, (_, i) => ['pop', r3(t0 + i * 0.03), i % 2 ? 2793.83 : 2349.32, gain * (1 - 0.4 * i / (len / 0.03)), 0.1])
const buzz = t0 => Array.from({ length: 7 }, (_, i) => ['pop', r3(t0 + i * 0.035), 140 + (i % 2) * 22, 0.055, 0])
const ring = t0 => [['chip', r3(t0), 1318.51, 0.2, { duty: 0.5, arp: [0, -5], gain: 0.018, decay: 0.1, sustain: 0.8, ...FXO }], ['chip', r3(t0 + 0.26), 1318.51, 0.2, { duty: 0.5, arp: [0, -5], gain: 0.018, decay: 0.1, sustain: 0.8, ...FXO }]]
const lessonAt = { ...LESSON }
export const CUES = [
  // 0 · the rant
  ...head(T.h0, 4, T.h0Land, 0),
  ...T.ping.map((p, i) => ['bell', r3(p), NOTE[i + 1], 0.024, 1.0, (i - 2) * 0.2]),
  ['pop', T.huff, 220, 0.045, 0], ['whoosh', r3(T.huff + 0.12), 0.3, 0.035],
  ...[0, 1, 2, 3, 4].map(i => ['pop', r3(T.planetsOut[0] + 0.1 + i * 0.09), NOTE[5 - i], 0.018, (i - 2) * 0.2]),
  ['whoosh', r3(T.planetsOut[0] + 0.3), 0.5, 0.03],
  // 1 · full moon, cute stranger
  ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', r3(T.drop + i * 0.012), f, 0.026, 1.8, (i - 1.5) * 0.25]), ['glitter', T.drop, r3(T.drop + 0.6)],
  ['pop', r3(T.drop + 0.14), 1174.66, 0.03, 0.3], ['pop', r3(T.drop + 0.2), 880, 0.025, -0.4],
  ...head(T.h1, 3, T.h1Land, 2),
  ...sob(r3(T_YOU + 0.35)), ...sob(r3(T_YOU + 0.9), 0.016),
  ['pop', r3(T.glance[0] + 0.2), 1318.51, 0.026, 0.3], ['pop', r3(T.glance[0] + 0.27), 1760, 0.02, 0.3],
  ...bwomp(T.roll1),
  // 2 · attempt one: BONK
  ...head(T.h2, 3, T.h2Land, 1),
  ['riser', T.windup[0], T.hurl, 0.035],
  ['whoosh', r3(T.hurl + 0.35), 0.6, 0.07], ['glitter', T.hurl, r3(T.hurl + 0.5)],
  ['pop', T.bonk, 130, 0.09, 0], ['tick', T.bonk, 0.09], ['boom', T.bonk, 0.08], ...boing(r3(T.bonk + 0.05), 0.032),
  ...[0, 1, 2].map(i => ['pop', r3(T.bonk + 0.22 + i * 0.14), NOTE[4 - i * 2] * 2, 0.014, -0.4]),
  ...Array.from({ length: 10 }, (_, i) => ['pop', r3(T.dizzy[0] + 0.1 + i * 0.18), i % 2 ? 2349.32 : 1975.53, 0.008, (i % 2 ? 0.3 : -0.3)]),
  ['glitter', r3(T.wish[0] + 0.1), r3(T.wish[0] + 0.5)],
  ['tick', r3(T.rub[0] + 0.05), 0.03], ['tick', r3(T.rub[0] + 0.2), 0.03], ['tick', r3(T.rub[0] + 0.35), 0.03],
  // 3 · attempt two: "hi"
  ...head(T.h3, 2, T.h3Land, 3),
  ['whoosh', r3(T.trace[0] + 0.3), 0.5, 0.04],
  ...NODE_T.map((nt, i) => ['bell', nt, NOTE[[0, 2, 1, 3, 4, 5, 3, 5, 6][i]], 0.022, 0.9, ((HI.nodes[i].x - 540) / 540) * 0.6]),
  ['glitter', T.trace[1], r3(T.trace[1] + 0.5)], ['bell', r3(T.trace[1] + 0.05), 1760, 0.02, 1.4, 0],
  ['pop', r3(T.skyWave[0] + 0.05), 1318.51, 0.022, 0.4],
  // 4 · attempt three: the wave → the dog
  ...head(T.h4, 2, T.h4Land, 0),
  ['tick', T.off, 0.07], ['pop', T.off, 196, 0.05, 0],
  ...T.on.map((o, i) => ['pluck', o, [587.33, 739.99, 880, 1174.66][i], 0.035, 0.5, (i - 1.5) * 0.4]),
  ...Array.from({ length: T.waveN * 4 }, (_, j) => { const c = Math.floor(j / 4), i = j % 4; return ['pop', r3(T.wave + c * T.wavePeriod + i * T.waveStep), NOTE[2 + i], 0.02, (i - 1.5) * 0.4] }),
  ...head(T.h5, 1, T.h5Land, 2),
  ...whistle(T.call, 0.4), ['pluck', T.call, 2349.32, 0.02, 0.3, 0.1],
  ...Array.from({ length: 9 }, (_, i) => ['tick', r3(T.run[0] + i * 0.07), 0.02]),
  ['pop', T.plop, 160, 0.07, 0], ...boing(r3(T.plop + 0.03), 0.028, -0.2),
  ...scratch(T.hush), ...silence(T.hush, 0.5, T.l6),
  ...T.pats.flatMap((p, i) => [['pop', r3(p), 300, 0.035, -0.1], ['tick', r3(p + 0.02), 0.025], ['pop', r3(p + 0.08), NOTE[4 + (i % 2)] * 2, 0.012, 0.2]]),
  ['tick', T.toCam, 0.035], ['whoosh', r3(T.toCam + 0.15), 0.2, 0.025],
  ['pop', r3(T_PET), 880, 0.02, 0],
  ...womp(r3(T.faint - 0.25), 0.045), ['pop', r3(T.faint + 0.36), 140, 0.05, -0.4],
  // 5 · your star is tired
  ...head(T.h6, 3, T.h6Land, 1),
  ['whoosh', r3(T.cloudIn[0] + 0.3), 0.5, 0.03],
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => ['tick', r3(T.rain + 0.2 + i * 0.27), 0.012]),
  ['pop', r3(T.pisCome[0] + 0.1), 880, 0.02, -0.3], ...sob(r3(T.pisCome[1] + 0.2), 0.016, 0.1), ...sob(r3(T.l8 + 0.9), 0.02, 0.1),
  ['bell', r3(charAt(LE[1], 'you')), 1174.66, 0.02, 1.6, 0],
  // 6 · plan B
  ['bell', T.idea, 1760, 0.04, 1.2, 0], ['pop', T.idea, 1174.66, 0.04, 0], ['glitter', T.idea, r3(T.idea + 0.4)],
  ...head(T.h7, 1, T.h7Land, 4),
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.spark[0] + i * 0.06), NOTE[6 - i], 0.025, 0.3]),
  ['riser', T.spark[1], T.dive[1], 0.04], ['whoosh', r3(T.dive[0] + 0.4), 0.55, 0.06],
  ['pop', T.dive[1], 1318.51, 0.04, -0.2], ['tick', T.dive[1], 0.05],
  // 7 · bzzt → you look up
  ...buzz(r3(T.buzz + 0.02)), ...buzz(r3(T.buzz + 0.32)), ['bell', r3(T.buzz + 0.05), 1318.51, 0.03, 0.9, 0],
  ...[587.33, 739.99, 880, 1174.66, 1479.98].map((f, i) => ['bell', r3(T.lookUp + i * 0.01), f, 0.03, 2.2, (i - 2) * 0.25]), ['glitter', T.lookUp, r3(T.lookUp + 0.9)],
  ['swell', r3(T.lookUp - 0.9), T.lookUp, { gain: 0.04, f0: 500, f1: 4000 }],
  ...head(T.h8, 2, T.h8Land, 2),
  ['pop', r3(T.strHi + 0.1), 1174.66, 0.03, 0.3], ['bell', r3(T.strHi + 0.12), 1567.98, 0.02, 0.8, 0.3],
  ['pop', r3(T.youWave[0] + 0.05), 880, 0.025, -0.2],
  ['pop', T.back[0], 987.77, 0.025, 0], ['whoosh', r3(T.back[0] + 0.3), 0.4, 0.035], ['pop', T.back[1], 1318.51, 0.035, 0],
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.hearts + i * 0.05), NOTE[(i * 2 + 2) % 7], 0.02, (i % 2 ? 0.4 : -0.4)]),
  ['chip', T.wail, 987.77, 1.1, { duty: 0.25, slide: -4, vib: 0.035, gain: 0.012, decay: 0.8, sustain: 0.8, pan: -0.5, rev: 0.25, dly: 0.1, bus: 'fx' }],
  // 8 · ★ LESSON UNLOCKED
  ...lessonCues(lessonAt.at, { ...lessonAt, key: 'E' }),
  // 9 · tonight's deck
  ...head(T.h9, 1, T.h9Land, 3),
  ['whoosh', r3(T.dive2[0] + 0.25), 0.35, 0.035],
  ...[0, 1, 2, 3, 4].map(i => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]),
  ['pop', r3(T.peek[0] + 0.1), 880, 0.03, 0.4], ['pop', r3(T.peek[0] + 0.18), 1174.66, 0.025, 0.4],
  ['tick', r3(T.wink[0]), 0.04], ['bell', r3(T.wink[0] + 0.02), 1567.98, 0.03, 0.9, 0.4],
  ['pop', r3(T_ME), 1318.51, 0.025, 0.4],
  ['whoosh', r3(T.deckOut[0] + 0.2), 0.4, 0.035],
  // 10 · pick up
  ['pop', r3(T.phoneIn[0] + 0.1), 659.25, 0.035, 0], ['pop', r3(T.phoneIn[0] + 0.16), 880, 0.03, 0],
  ...head(T.h10, 4, T.h10Land, 1),
  ...T.rings.flatMap(ring),
  ['tick', 54.55, 0.035], ['pluck', 54.57, 1318.51, 0.025, 0.5, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES.filter(L => L.t >= 0), { cps: CPS, pitch: { [HERO]: 987.77 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void doneOf; void T_THATS
