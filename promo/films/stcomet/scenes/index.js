// stcomet — "The Comet." (60 s vertical Align ad, Star Talk season 3 #2, music: cinematic, E minor — a telenovela).
// Story 0–55.6, then the shared end card ("come" + the Align logo).
//   0.00–4.75  Three snap-zooms (DUN · DUN · DUNNN) onto YOUR STAR's (♋ Cancer) wide eyes. "Your partner's star |
//              got a *visitor.*"  The camera pulls back: ♐ Sag (your partner's star) hums alone in your shared orbit…
//              and a flashy COMET (shades, a sparkly tail, a HELLO sticker) streaks in and skids to a stop on the drop.
//   4.9–10.45  "Enter: | *the comet.*"  COMET (just passing through): "hey! I'm only around every 76 years!"  Sag laughs
//              (HA HA), they high-five. Your star turns and stares straight down the lens (slow push, crickets).
//  10.55       card cut.
//  10.6–22.4   Rule of three, each with a telenovela crash-zoom on your star:
//              "you're glowing." (Sag literally glows) → zoom: "It's *fine.*" (side-eye, the iris goes green)
//              "made you a meteor shower." → zoom: "Totally *fine.*" (greener, an anger mark, a twitch)
//              "mwah!" (a sparkle lands on Sag's cheek) → zoom… onto PISCES, caught mid-popcorn → whip pan → your star,
//              fully green: "Not. | *Fine.*"  Pull back: your orbit wobbles.
//  22.45       card cut.
//  22.5–28.6   "Passive. | *Aggressive.*"  Insert: your star peeks over its phone (Sag: "come say hi!! ☄️").
//              DRAFT 1 "no it's fine 🙂" (a smug look at us) → deleted → DRAFT 2 "have fun with your COMET" (slammed caps),
//              the thumb hovers over send…
//  28.7–36.2   "Use your *words.*"  THE STARS pop in: "or… you could just say it."  Delete, delete, delete. The phone is
//              tossed (it lands in Pisces' popcorn). Your star hops over: "that made me a bit jealous. can we talk?"
//  36.35       card cut (the telenovela cliffhanger).
//  36.5–41.9   SAG: "omg of course. that's my cousin 🥺" — record scratch, crash-zoom on your star — "Plot twist: |
//              *cousins.*" (dun · dun · DUNNN). The green drains, the comet pushes its shades up: "hi, cousin-in-law!"
//              The orbit steadies and glows.
//  41.95–43.8  A velvet telenovela "Fin" card swings in on two ropes (rose petals, a cadence)… THE STARS shoo it off.
//  43.93–48.45 ★ LESSON UNLOCKED: "Jealous? | Say it *kindly.* | Don't let it orbit."  +1 SECURE
//  48.65       card cut.
//  48.7–52.2   "“What helps you | feel *secure?*”"  A talk card deals in between them. THE STARS: "talk it out before it orbits."
//  52.3–55.45  "Say it out loud. | Comets *pass.*"  The comet waves and streaks off; everyone waves; Pisces sobs into a hankie.
// One canvas (sky + world cast through a camera + screen-space props), DOM type + dialogue boxes + the shared lesson, grain.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, hankieCells, jealousEyesCells, veinCells, cheekSparkleCells, drawComet, drawCometTail, drawPopcorn, kernel, drawFin, petals, makeTalkCard, mixHex, rgba } from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236', ROSE = '#ff6b9a'
const GREEN1 = '#b4f08a', GREEN2 = '#8fe86e', GREEN3 = '#62d94f', ENVY = '#5fd84a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)            // the 108 bpm grid
const CAN = signStar('cancer'), SAG = signStar('sagittarius'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.25],
  // 0 · hook
  z: [BEAT(0), BEAT(1), BEAT(2)],                                                   // 0.600 · 1.156 · 1.711
  dart: [2.72, 3.02], pull: [3.3, 3.85], streak: [3.9, BEAT(7)], drop: BEAT(7), glint: 4.8,
  // 1 · setup
  open1: 5.42, l1: 5.62, laugh: [7.25, 8.2], ha: [7.3, 7.66, 8.02], five: BEAT(14), lean5: [8.02, 8.75], close1: 8.8,
  stare: [8.85, 10.45], slowBlink: 9.95, chirps: [9.25, 9.7],
  cut1: 10.55,
  // 2 · "you're glowing"
  open2: 10.68, l2: 10.85, glowUp: [11.3, 11.8], z4: BEAT(21),
  // 3 · the meteor shower
  l3: 14.55, shower: [14.6, 17.6], z5: BEAT(28),
  // 4 · the cheek
  lean: [18.15, 18.45], l4: 18.45, kiss: 18.64, unlean: [18.8, 19.2], z6: BEAT(33), side: 19.42, whip: [19.75, BEAT(35)], z7: BEAT(35), close2: 20.2,
  cut2: 22.45,
  // 5 · drafts
  phoneIn: [22.6, 23.05], d1: 23.3, smug: [24.4, 25.15], d1del: 25.3, d2: 25.85, caps: 26.85, hover: [27.7, 28.55],
  // 6 · the turn
  narrIn: 28.68, open3: 28.85, l5: 29.05, look5: 30.45, del: 30.75, narrOut: [31.2, 31.45], toss: [31.5, 32.2], plop: 32.2, hop: [32.35, 32.85], l6: 32.95, close3: 36.15,
  cut3: 36.35,
  // 7 · plot twist
  open4: 36.5, l7: 36.68, scratch: 37.98, freeze: [37.98, 38.378], twist: [BEAT(68), BEAT(68.5), BEAT(69)], drain: [38.6, 40.4],
  shades: [39.25, 39.55], l8: 39.62, wave: [39.62, 41.3], steady: [39.8, 41.4], chime: 40.6, close4: 41.9,
  // 8 · fin
  fin: 41.95, hug: [41.95, 42.4], narr2: [42.85, 43.15], shoo: 43.15, finOut: [43.15, 43.6], narr2Out: [43.45, 43.75],
  // 9 · lesson
  lesson: BEAT(78), lessonOut: [48.25, 48.45],
  cut4: 48.65,
  // 10 · tie-in
  card: [48.8, 49.35], open5: 49.3, l9: 49.48, close5: 52.05, cardOut: [51.95, 52.3],
  // 11 · last line
  regroup: [52.2, 52.65], depart: [53.25, 54.15], out: [55.0, 55.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Jealous? | Say it *kindly.* | Don’t let it orbit.', chip: '+1 SECURE' }

// ── the dialogue
const CT = '☄ COMET (just passing through)', ST = '♐︎ YOUR PARTNER’S STAR', YT = '♋︎ YOUR STAR', NT = 'THE STARS'
const CC = CYAN, SCOL = LAV, YC = '#8fdcff', NC = GOLD
const LINES1 = [{ t: T.l1, speaker: CT, color: CC, text: "hey! I'm only around every *76 years!*" }]
const LINES2 = [
  { t: T.l2, speaker: CT, color: CC, text: "you're *glowing.*" },
  { t: T.l3, speaker: CT, color: CC, text: 'made you a *meteor shower.*' },
  { t: T.l4, speaker: CT, color: PINK, text: '*mwah!*' },
]
const LINES3 = [
  { t: T.l5, speaker: NT, color: NC, text: 'or… you could just *say it.*' },
  { t: T.l6, speaker: YT, color: YC, text: 'that made me a bit *jealous.* can we talk?' },
]
const LINES4 = [
  { t: T.l7, speaker: ST, color: SCOL, text: "omg of course. that's my *cousin* 🥺" },
  { t: T.l8, speaker: CT, color: CC, text: 'hi, *cousin-in-law!*' },
]
const LINES5 = [{ t: T.l9, speaker: NT, color: NC, text: 'talk it out before it *orbits.*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const CPS = 28
const ALL_LT = lineTimes(ALL_LINES, { cps: CPS })
const ltOf = L => ALL_LT[ALL_LINES.indexOf(L)]

// ── the drafts (typed on the phone)
const D1 = Array.from('no it’s fine 🙂'), D2 = Array.from('have fun with your COMET')
const D1T = D1.map((_, i) => +(T.d1 + i * 0.065).toFixed(3))
const D2T = D2.map((_, i) => +(i < 19 ? T.d2 + i * 0.052 : T.caps + (i - 19) * 0.13).toFixed(3))
const DEL1 = 0.024, DEL2 = 0.022

// ── headlines: one spec drives the type and its sound
const HEADS = [
  { text: 'Your partner’s star | got a *visitor.*', top: 150, size: 90, accentSize: 140, at: 1.86, gap: 0.08, late: 1, lateAt: 2.42, accentColor: ROSE, out: [4.55, 4.75], fit: true },
  { text: 'Enter: | *the comet.*', top: 160, size: 112, accentSize: 164, at: 4.92, late: 2, lateAt: 5.2, lateGap: 0.12, accentColor: CYAN, out: [10.2, 10.4] },
  { text: 'It’s *fine.*', top: 190, size: 124, accentSize: 184, at: 12.3, late: 1, lateAt: 12.5, accentColor: GREEN1, out: [14.15, 14.35] },
  { text: 'Totally *fine.*', top: 190, size: 120, accentSize: 180, at: 16.18, late: 1, lateAt: 16.4, accentColor: GREEN2, out: [18.05, 18.25] },
  { text: 'Not. | *Fine.*', top: 140, size: 130, accentSize: 210, at: 20.07, late: 1, lateAt: 20.34, accentColor: GREEN3, out: [22.15, 22.35] },
  { text: 'Passive. | *Aggressive.*', top: 150, size: 104, accentSize: 150, at: 22.55, late: 1, lateAt: 22.85, accentColor: GREEN3, out: [28.45, 28.62] },
  { text: 'Use your *words.*', top: 180, size: 112, accentSize: 164, at: 28.75, gap: 0.08, late: 1, lateAt: 29.0, accentColor: GOLD, out: [35.95, 36.15] },
  { text: 'Plot twist: | *cousins.*', top: 150, size: 112, accentSize: 172, at: T.twist[0], gap: T.twist[1] - T.twist[0], late: 1, lateAt: T.twist[2], accentColor: PINK, out: [41.72, 41.92] },
  { text: '“What helps you | feel *secure?”*', top: 150, size: 96, accentSize: 138, at: 48.75, gap: 0.07, late: 1, lateAt: 49.15, accentColor: GOLD, out: [51.98, 52.18], fit: true },
  { text: 'Say it out loud. | Comets *pass.*', top: 150, size: 100, accentSize: 156, at: 52.3, gap: 0.08, late: 1, lateAt: 52.85, accentColor: CYAN, out: [55.15, 55.4], fit: true },
]
/** the word times popText will use (same parse: whitespace tokens, '|' = break) */
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const lerpP = (P, Q, e, arc = 0) => ({ x: lerp(P.x, Q.x, e), y: lerp(P.y, Q.y, e) - Math.sin(Math.PI * clamp(e)) * arc })
const cnt = (arr, t) => { let n = 0; for (const v of arr) if (t >= v) n++; return n }

// ── the camera: keys [t, zoom, focusX, focusY, screenX, screenY, ease into this key]
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic, whip: ease.inOutQuad, step: x => (x >= 1 ? 1 : 0) }
const IDN = [1, 540, 960, 540, 960]
const ECU = (z, fx = 250, sx = 540, sy = 1020) => [z, fx, 1092, sx, sy]
const CAM = [
  [0, 1.3, 250, 1085, 420, 1060],
  [0.6, 1.42, 250, 1088, 470, 1055, 'io'],
  [0.72, 1.95, 250, 1090, 520, 1050, 'out'],            // DUN
  [1.156, 2.05, 250, 1090, 525, 1050, 'lin'],
  [1.276, 2.65, 250, 1091, 535, 1048, 'out'],           // DUN
  [1.711, 2.75, 250, 1091, 535, 1048, 'lin'],
  [1.831, 3.45, 250, 1092, 540, 1045, 'out'],           // DUNNN
  [3.3, 3.55, 250, 1092, 540, 1045, 'lin'],
  [3.85, ...IDN, 'io'],
  [8.85, ...IDN, 'lin'],
  [10.45, 1.16, 250, 1090, 330, 1075, 'io'],            // the slow push on the stare
  [10.55, ...IDN, 'step'],
  [T.z4, ...IDN, 'lin'], [T.z4 + 0.12, ...ECU(2.3), 'out'], [13.75, ...ECU(2.38), 'lin'], [13.95, ...IDN, 'out'],
  [T.z5, ...IDN, 'lin'], [T.z5 + 0.12, ...ECU(2.75), 'out'], [17.55, ...ECU(2.85), 'lin'], [17.75, ...IDN, 'out'],
  [T.z6, ...IDN, 'lin'], [T.z6 + 0.12, 2.5, 962, 1335, 540, 1080, 'out'], [T.whip[0], 2.55, 962, 1335, 540, 1080, 'lin'],
  [T.z7, ...ECU(3.3), 'whip'], [21.3, ...ECU(3.4), 'lin'], [21.7, ...IDN, 'io'],
  [22.45, ...IDN, 'lin'], [22.9, 1.6, 250, 1060, 300, 800, 'io'], [T.toss[0], 1.6, 250, 1060, 300, 800, 'lin'], [32.0, ...IDN, 'io'],
  [T.scratch, ...IDN, 'lin'], [T.scratch + 0.12, ...ECU(2.3, 430, 540, 1030), 'out'], [38.9, ...ECU(2.38, 430, 540, 1030), 'lin'], [39.25, ...IDN, 'io'],
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
// the dramatic rose vignette: up while a telenovela zoom holds
const DRAMA = [[T.z[0], 3.3, 1], [T.z4, 13.8, 0.85], [T.z5, 17.6, 0.95], [T.z6, T.whip[0], 0.45], [T.z7, 21.4, 1], [T.scratch, 38.95, 0.75]]
const dramaK = t => DRAMA.reduce((m, [a, b, k]) => Math.max(m, k * clamp((t - a) / 0.08) * (1 - prog(t, b, b + 0.3))), 0)
const SNAPS = [...T.z, T.z4, T.z5, T.z6, T.z7, T.scratch]

// ── the cast: world positions
const CAN_HOME = { x: 250, y: 1080 }, CAN_NEAR = { x: 430, y: 1080 }, CAN_HUG = { x: 505, y: 1086 }, CAN_TIE = { x: 250, y: 1125 }, CAN_END = { x: 420, y: 1110 }
const SAG_HOME = { x: 770, y: 1080 }, SAG_HUG = { x: 712, y: 1086 }, SAG_TIE = { x: 830, y: 1125 }, SAG_END = { x: 660, y: 1110 }
const COM_HOME = { x: 845, y: 790 }, COM_R = 106
const PIS_AT = { x: 962, y: 1318, s: 138 }, BUCKET_AT = { x: 962, y: 1400 }
const S_CAN = 330, S_SAG = 310

function canBase(t) {
  if (t >= T.regroup[0]) return lerpP(CAN_TIE, CAN_END, ease.inOutCubic(prog(t, ...T.regroup)), 40)
  if (t >= T.cut4) return CAN_TIE
  if (t >= T.hug[0]) return lerpP(CAN_NEAR, CAN_HUG, ease.spring(prog(t, T.hug[0], T.hug[0] + 0.7), 0.15))
  if (t >= T.hop[0]) return lerpP(CAN_HOME, CAN_NEAR, ease.inOutCubic(prog(t, ...T.hop)), 110)
  return CAN_HOME
}
function sagBase(t) {
  if (t >= T.regroup[0]) return lerpP(SAG_TIE, SAG_END, ease.inOutCubic(prog(t, ...T.regroup)), 40)
  if (t >= T.cut4) return SAG_TIE
  if (t >= T.hug[0]) return lerpP(SAG_HOME, SAG_HUG, ease.spring(prog(t, T.hug[0] + 0.05, T.hug[0] + 0.75), 0.15))
  return SAG_HOME
}
const fiveK = t => bump(t, T.lean5[0], T.lean5[1] - T.lean5[0])
const kissK = t => t < T.unlean[0] ? ease.inOutCubic(prog(t, ...T.lean)) : 1 - ease.inOutCubic(prog(t, ...T.unlean))
// envy: the body, the eyes, the wobble of your orbit
const greenK = t => t < T.z7 ? 0 : t < T.drain[0] ? ease.outCubic(prog(t, T.z7, T.z7 + 0.25)) : 1 - ease.inOutQuad(prog(t, ...T.drain))
const eyeK = t => (t < T.z4 || t >= T.del + 0.55) ? -1 : t < T.z5 ? 0.45 : t < T.z7 ? 0.8 : 1
function wobK(t) {
  let w = 0
  if (t >= T.z4) w = 0.3 * ease.outCubic(prog(t, T.z4, T.z4 + 0.4))
  if (t >= T.z5) w = lerp(0.3, 0.55, ease.outCubic(prog(t, T.z5, T.z5 + 0.4)))
  if (t >= T.z7) w = lerp(0.55, 1, ease.outCubic(prog(t, T.z7, T.z7 + 0.5)))
  if (t >= T.hop[0]) w = lerp(1, 0.6, prog(t, ...T.hop))
  if (t >= T.steady[0]) w = 0.6 * (1 - ease.inOutCubic(prog(t, ...T.steady)))
  return w
}
const steadyK = t => ease.inOutCubic(prog(t, T.steady[0] + 0.4, T.steady[1] + 0.3)) * (1 - prog(t, T.out[0], T.out[1]))

// ── moods
function canState(t) {
  const st = { mood: 'neutral', look: [1, -1], blink: undefined, squash: 0, eyes: null, blush: undefined }
  const e = eyeK(t)
  if (e >= 0) {
    let look = 1, lookY = 0, lid = 2, low = 0
    if (inR(t, 13.0, 13.12) || inR(t, 13.27, 13.37)) low = 2
    if (t >= T.z5 && t < T.z7 && Math.floor(t * 7) % 5 === 0) low = 2
    if (t >= T.z7 && t < T.cut2 && Math.floor(t * 9) % 4 === 0) low = 2
    if (t >= T.cut2) { lookY = 1 }
    if (inR(t, ...T.smug)) { look = 0; lookY = 0; lid = 3; low = 1 }
    if (inR(t, T.caps - 0.05, T.caps + 0.7)) { lid = 1; low = 0 }
    if (inR(t, ...T.hover)) { lid = 2; low = Math.floor(t * 6) % 3 === 0 ? 1 : 0 }
    if (inR(t, T.narrIn, T.look5)) { lookY = -1; lid = 1; low = 0 }
    st.eyes = { k: e, look, lookY, lid, low }
    st.mood = 'neutral'; st.look = [0, 0]; st.blink = false
    return st
  }
  if (t < T.pull[0]) { st.mood = 'wide'; st.look = inR(t, ...T.dart) ? [-1, 0] : [1, 0]; st.blink = false; return st }
  if (t < T.l1) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.laugh[0]) { st.mood = 'neutral'; return st }
  if (t < T.five - 0.1) { st.mood = 'squint'; st.look = [1, 0]; return st }
  if (t < T.stare[0]) { st.mood = 'wide'; return st }
  if (t < T.stare[1]) { st.mood = 'neutral'; st.look = [0, 0]; st.blink = inR(t, T.slowBlink, T.slowBlink + 0.3) ? 1 : false; return st }
  if (t < T.l2 + 0.3) { st.mood = 'neutral'; return st }
  if (t < T.z4) { st.mood = 'squint'; return st }
  if (t < T.scratch) { st.mood = 'sparkle'; st.look = t < T.toss[1] ? [1, 1] : [1, 0]; return st }
  if (t < T.twist[2]) { st.mood = 'wide'; st.look = t < 38.25 ? [1, 0] : t < 38.6 ? [0, 0] : [1, -1]; st.blink = false; return st }
  if (t < T.l8) { st.mood = 'wide'; return st }
  if (t < T.fin) { st.mood = 'happy'; st.look = [1, 0]; st.blush = t > T.chime ? 1 : 0.6; return st }
  if (t < T.lesson) { st.mood = 'heart'; st.look = [1, 0]; return st }
  if (t < T.cut4) { st.mood = 'happy'; st.look = [1, 0]; return st }
  if (t < T.regroup[0]) { st.mood = 'sparkle'; st.look = [1, -1]; return st }
  st.mood = t < T.depart[1] + 0.3 ? 'happy' : 'sparkle'; st.look = [1, -1]
  return st
}
function sagState(t) {
  const st = { mood: 'neutral', look: [1, -1], blink: undefined, blush: undefined, glow: 0.95 }
  if (t < T.drop) { st.mood = 'happy'; st.look = [0, -1]; return st }
  if (t < T.drop + 0.5) { st.mood = 'wide'; return st }
  if (t < T.l1) { st.mood = 'sparkle'; return st }
  if (t < T.laugh[0]) { st.mood = t > 6.9 ? 'wide' : 'neutral'; return st }
  if (t < T.l2) { st.mood = 'happy'; return st }
  if (t < T.glowUp[0]) { st.mood = 'neutral'; return st }
  if (t < T.l3) { st.mood = 'happy'; st.blush = 1; st.glow = lerp(0.95, 1.5, ease.outCubic(prog(t, ...T.glowUp))); return st }
  if (t < T.shower[1]) { st.mood = 'sparkle'; st.look = [0, -1]; st.glow = lerp(1.5, 0.95, prog(t, T.l3, T.l3 + 0.6)); return st }
  if (t < T.kiss) { st.mood = 'neutral'; return st }
  if (t < T.hop[0]) { st.mood = 'happy'; st.blush = t < T.cut2 ? 1 : 0.6; return st }
  if (t < T.l6) { st.mood = 'neutral'; st.look = [-1, 0]; return st }
  if (t < T.close3) { st.mood = t < T.l6 + 1.3 ? 'wide' : 'sparkle'; st.look = [-1, 0]; return st }
  if (t < T.scratch) { st.mood = 'sparkle'; st.look = [-1, 0]; return st }
  if (t < T.twist[2]) { st.mood = 'sparkle'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.fin) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  if (t < T.lesson) { st.mood = 'heart'; st.look = [-1, 0]; return st }
  if (t < T.cut4) { st.mood = 'happy'; st.look = [-1, 0]; return st }
  if (t < T.regroup[0]) { st.mood = 'sparkle'; st.look = [-1, -1]; return st }
  st.mood = 'happy'; st.look = [1, -1]
  return st
}
function cometPos(t) {
  if (t < T.streak[0]) return null
  if (t < T.streak[1]) {
    const p = ease.inQuad(prog(t, ...T.streak)), q = 1 - p, P0 = { x: 1380, y: 150 }, P1 = { x: 1160, y: 760 }, P2 = COM_HOME
    return { x: q * q * P0.x + 2 * q * p * P1.x + p * p * P2.x, y: q * q * P0.y + 2 * q * p * P1.y + p * p * P2.y }
  }
  if (t >= T.depart[0] - 0.3) {
    const wind = bump(t, T.depart[0] - 0.3, 0.45), p = ease.inCubic(prog(t, ...T.depart))
    return { x: lerp(COM_HOME.x, 1560, p) - 30 * wind, y: lerp(COM_HOME.y, 120, p) + 22 * wind }
  }
  const h = fiveK(t), k = kissK(t)
  return { x: COM_HOME.x - 40 * h + 45 * k, y: COM_HOME.y + 70 * h + 120 * k }
}
function cometState(t) {
  const st = { shades: 1, mood: 'happy', look: [-1, 0], squash: 0, tilt: 0, stretch: 0, stretchAng: 0, glint: T.glint, tailAng: -0.62, tailLen: 4.2, wag: 0.06 }
  if (t < T.streak[1]) { st.stretch = 0.32; st.stretchAng = Math.atan2(800 - 150, 850 - 1380); st.tailLen = 5.2; st.wag = 0 }
  const dl = t - T.drop
  if (dl >= 0 && dl < 0.6) st.squash = 0.26 * Math.exp(-dl * 8) * Math.cos(dl * 22)
  st.tilt = -0.32 * fiveK(t) + 0.28 * kissK(t)
  if (t >= T.l2) st.glint = T.l2 + 0.55
  if (t >= T.l3) st.glint = T.l3 + 0.95
  if (t >= T.l4) st.glint = T.l4 + 0.05
  if (inR(t, T.shower[0], T.shower[0] + 0.9)) st.wag = 0.55 * (1 - prog(t, T.shower[0], T.shower[0] + 0.9))
  if (t >= T.shades[0]) st.shades = 1 - ease.inOutCubic(prog(t, ...T.shades))
  if (inR(t, ...T.wave)) { st.wag = 0.38; st.tilt += 0.12 * Math.sin((t - T.wave[0]) * 12) * (1 - prog(t, T.wave[1] - 0.4, T.wave[1])) }
  if (inR(t, T.l8 + 0.6, T.l8 + 1.0)) st.mood = 'wink'
  if (t >= T.depart[0] - 0.55) st.shades = Math.min(1, ease.inOutCubic(prog(t, T.depart[0] - 0.55, T.depart[0] - 0.3)))
  if (t >= T.depart[0] - 0.3) st.glint = T.depart[0] - 0.25
  if (t >= T.depart[0]) {
    const a = Math.atan2(120 - 800, 1560 - 850)
    st.tailAng = a + Math.PI; st.tailLen = lerp(4.2, 5.8, prog(t, T.depart[0], T.depart[0] + 0.3)); st.stretch = 0.3 * prog(t, T.depart[0], T.depart[0] + 0.25); st.stretchAng = a; st.wag = 0
  }
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [-1, -1], tears: 0, squash: 0, tip: 0, hank: 0, blink: undefined, munch: true }
  if (t < T.drop) return st
  if (t < T.drop + 0.5) { st.mood = 'wide'; st.munch = false; return st }
  if (t < T.z4) { st.mood = inR(t, T.laugh[0], T.five + 0.4) ? 'happy' : 'sparkle'; return st }
  if (t < T.z5) { st.tears = 1; return st }
  if (t < T.z6) { st.tears = 2; return st }
  if (t < T.whip[0]) { st.mood = 'wide'; st.look = t < T.side ? [0, 0] : [-1, 0]; st.blink = false; st.munch = false; st.tears = 1; return st }
  if (t < T.toss[1] - 0.2) { st.tears = 2; return st }
  if (t < T.plop + 0.45) { st.mood = 'wide'; st.look = [0, 1]; st.munch = false; return st }
  if (t < T.plop + 1.25) { st.mood = 'wide'; st.look = [0, 0]; st.munch = false; return st }
  if (t < T.scratch) { st.tears = 1; return st }
  if (t < T.twist[2]) { st.mood = 'wide'; st.look = [-1, -1]; st.munch = false; st.blink = false; st.tip = -0.62 * ease.outBack(prog(t, T.scratch, T.scratch + 0.22)); return st }
  if (t < T.fin) { st.mood = 'happy'; st.tears = 3; st.tip = -0.62; st.munch = false; return st }
  if (t < T.lesson) { st.mood = 'happy'; st.tears = 3; st.tip = -0.62; st.munch = false; st.squash = 0.07 * Math.sin(t * 21); return st }
  if (t < T.cut4) { st.mood = 'happy'; st.tears = 2; st.tip = -0.62; st.munch = false; return st }
  if (t < T.depart[0]) { st.mood = 'happy'; return st }
  st.mood = 'sparkle'; st.look = [-1, -1]; st.tears = 3; st.munch = false; st.hank = Math.floor(t * 5) % 2 ? 1 : -1
  return st
}

// talk hops
const C_HOPS = talkHops(ALL_LINES, CT, { cps: CPS }), S_HOPS = talkHops(ALL_LINES, ST, { cps: CPS }), Y_HOPS = talkHops(ALL_LINES, YT, { cps: CPS }), N_HOPS = talkHops(ALL_LINES, NT, { cps: CPS })
const CAN_HOPS = [...Y_HOPS, ...D2T.slice(19), T.toss[0], T.hop[0], T.twist[2] + 0.4, T.chime, T.fin + 0.1, T.lesson + 0.2, T.card[1], T.depart[0], T.depart[0] + 0.45, T.depart[0] + 0.9]
const SAG_HOPS = [...S_HOPS, T.drop + 0.04, ...T.ha, T.glowUp[0], T.kiss + 0.05, T.twist[2] + 0.5, T.chime + 0.1, T.fin + 0.15, T.lesson + 0.25, T.card[1] + 0.05, T.depart[0] + 0.1, T.depart[0] + 0.55, T.depart[0] + 1.0]
const PIS_HOPS = [T.drop + 0.05, T.five + 0.05, T.z6 + 0.13, T.plop + 0.05, T.twist[2] + 0.05, T.fin + 0.1, T.fin + 0.5, T.fin + 0.9, T.fin + 1.3, T.depart[0] + 0.2, T.depart[0] + 0.7]
const COM_HOPS = [...C_HOPS, T.five + 0.02]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 44px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 196px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "400 21px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const lovers = await loadImg('card-talk-6.png')
  const TALK = makeTalkCard(document, lovers, ['What helps you', 'feel secure?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (headlines), dialogue boxes, the lesson; grain + the opening black on top
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, open: T.open4, close: T.close4 }),
    dialogueBox(root, { ...BOX, lines: LINES5, open: T.open5, close: T.close5 }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const stroked = (txt, X, Y, size, col, lw = 10, font = MONO) => { x.font = `700 ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }

  // ═══════════════════════ effects ═══════════════════════
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function dramaFx(t) {
    const k = dramaK(t)
    if (k > 0.01) {
      const g = x.createRadialGradient(540, 1000, 300, 540, 1000, 1180)
      g.addColorStop(0, 'rgba(150,10,64,0)'); g.addColorStop(0.55, `rgba(150,10,64,${0.22 * k})`); g.addColorStop(1, `rgba(56,0,28,${0.78 * k})`)
      x.fillStyle = g; x.fillRect(0, 0, W, H)
      // a soft light leak sweeping across
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * k
      const lx = 540 + Math.sin(t * 0.9) * 380, lg = x.createLinearGradient(lx - 260, 0, lx + 260, 0)
      lg.addColorStop(0, 'rgba(255,120,170,0)'); lg.addColorStop(0.5, 'rgba(255,150,190,1)'); lg.addColorStop(1, 'rgba(255,120,170,0)')
      x.fillStyle = lg; x.save(); x.translate(lx, 960); x.rotate(-0.35); x.fillRect(-260, -1400, 520, 2800); x.restore()
      x.restore()
    }
    // the crash-zoom punch: speed lines + a flash
    for (const s of SNAPS) {
      const dt = t - s
      if (dt < 0 || dt > 0.34) continue
      const a = 1 - dt / 0.34, r = rng(Math.round(s * 100))
      x.save(); x.globalAlpha = 0.55 * a; x.strokeStyle = '#fff1f6'; x.lineCap = 'round'
      for (let i = 0; i < 46; i++) {
        const ang = r() * TAU, r0 = 300 + r() * 240 + dt * 900, len = 420 + r() * 700
        x.lineWidth = 2 + r() * 6
        x.beginPath(); x.moveTo(540 + Math.cos(ang) * r0, 1030 + Math.sin(ang) * r0); x.lineTo(540 + Math.cos(ang) * (r0 + len), 1030 + Math.sin(ang) * (r0 + len)); x.stroke()
      }
      x.restore()
      if (dt < 0.09) { x.fillStyle = `rgba(255,240,246,${0.2 * (1 - dt / 0.09)})`; x.fillRect(0, 0, W, H) }
    }
    // the whip pan: horizontal streaks
    const wp = prog(t, ...T.whip)
    if (wp > 0 && wp < 1) {
      const a = Math.sin(Math.PI * wp), r = rng(77)
      x.save(); x.globalAlpha = 0.6 * a
      for (let i = 0; i < 38; i++) { const yy = r() * H, len = 300 + r() * 900, xx = (r() * 1.6 - 0.3) * W - wp * 600; x.fillStyle = i % 3 ? 'rgba(255,255,255,0.5)' : 'rgba(255,170,210,0.6)'; x.fillRect(xx, yy, len, 3 + r() * 8) }
      x.restore()
    }
  }

  // ═══════════════════════ the world (through the camera) ═══════════════════════
  function orbit(t, C, cP, sP, wob, glowK, alpha) {
    if (alpha <= 0.01) return
    const cx = (cP.x + sP.x) / 2, cy = (cP.y + sP.y) / 2 + 22, rx = Math.abs(sP.x - cP.x) / 2 + 14, ry = 60 + 8 * glowK
    const ring = th => {
      const k = 1 + wob * (0.12 * Math.sin(3 * th + t * 4.7) + 0.07 * Math.sin(5 * th - t * 6.3))
      const tilt = wob * 0.12 * Math.sin(t * 2.3), ex = Math.cos(th) * rx * k, ey = Math.sin(th) * ry * k * (1 + wob * 0.35 * Math.sin(t * 3.1))
      return [cx + ex * Math.cos(tilt) - ey * Math.sin(tilt), cy + ex * Math.sin(tilt) + ey * Math.cos(tilt) + wob * 7 * Math.sin(t * 7.7)]
    }
    const col = mixHex(GOLD, '#7be36a', clamp(wob * 1.4))
    withCam(C, () => {
      x.save(); x.globalAlpha = alpha
      const path = () => { x.beginPath(); for (let i = 0; i <= 96; i++) { const [px, py] = ring(i / 96 * TAU); i ? x.lineTo(px, py) : x.moveTo(px, py) } }
      if (glowK > 0.01) { x.save(); x.globalCompositeOperation = 'lighter'; x.lineWidth = 22; x.strokeStyle = rgba(GOLD, 0.18 * glowK); path(); x.stroke(); x.restore() }
      x.lineWidth = 4; x.strokeStyle = rgba(col, 0.35 + 0.3 * glowK); path(); x.stroke()
      for (let i = 0; i < 30; i++) {
        const th = i / 30 * TAU + t * 0.45 + wob * 0.6 * Math.sin(t * 3.3 + i)
        const [px, py] = ring(th), s = 8 + 2 * Math.sin(th)
        x.fillStyle = i % 5 === 0 ? '#fff6dc' : col; x.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), s, s)
      }
      x.restore()
    })
  }
  const METEORS = Array.from({ length: 18 }, (_, i) => { const r = rng(410 + i * 7); return { t0: T.shower[0] + 0.15 + i * 0.15 + r() * 0.08, x0: 560 + r() * 600, y0: 360 + r() * 320, sp: 950 + r() * 350, len: 150 + r() * 120, col: ['#ffffff', '#bff0ff', '#ffd3ea', '#ffe08a'][i % 4] } })
  function meteors(t, C) {
    if (t < T.shower[0] || t > T.shower[1] + 1) return
    const ang = 2.3, ca = Math.cos(ang), sa = Math.sin(ang)
    withCam(C, () => {
      for (const m of METEORS) {
        const dt = t - m.t0
        if (dt < 0 || dt > 0.8) continue
        const a = Math.sin(Math.PI * dt / 0.8), hx = m.x0 + ca * m.sp * dt, hy = m.y0 + sa * m.sp * dt
        for (let k = 0; k < 12; k++) { const u = k / 12, s = k < 2 ? 9 : 7 - k * 0.4; x.globalAlpha = a * (1 - u) * 0.9; x.fillStyle = m.col; x.fillRect(Math.round(hx - ca * m.len * u - s / 2), Math.round(hy - sa * m.len * u - s / 2), s, s) }
        x.globalAlpha = a; drawPixelStar(x, hx, hy, 30, 1, m.col)
      }
      x.globalAlpha = 1
    })
  }

  // draw one star character through the camera; returns its frame for overlays
  function star(C, P, size, t, opts, { rot = 0, drift = [0, 0], overlay = null, tt = t } = {}) {
    const S = toS(C, P.x, P.y, size)
    x.save(); x.translate(S.x + drift[0], S.y + drift[1]); if (rot) x.rotate(rot)
    drawStarChar(x, 0, 0, S.s, tt, opts)
    if (overlay) overlay(starFrame(0, 0, S.s, tt, opts))
    x.restore()
    return S
  }
  const frozen = t => inR(t, ...T.freeze) ? T.freeze[0] : t

  function drawYou(t, C, k) {
    const st = canState(t), g = greenK(t), w = wobK(t)
    const P = canBase(t)
    const col = mixHex(CAN.color, ENVY, Math.round(g * 16) / 16)
    const drift = [w * (16 * Math.sin(t * 5.3) + 7 * Math.sin(t * 12.7)), w * (11 * Math.sin(t * 4.1 + 1) + 5 * Math.sin(t * 9.3))]
    let squash = st.squash
    for (const s of [...T.z, T.z4, T.z5, T.z7]) { const d = t - s; if (d >= 0 && d < 0.45) squash += 0.14 * Math.exp(-d * 9) * Math.cos(d * 24) }
    if (inR(t, ...T.hover)) squash -= 0.06 * ease.inOutQuad(prog(t, ...T.hover))
    const lean = inR(t, ...T.hover) ? 18 * ease.inOutQuad(prog(t, ...T.hover)) : 0
    const tt = frozen(t)
    const opts = { color: col, glyph: CAN.glyph, mood: st.mood, look: st.look, blink: st.blink, squash, hops: CAN_HOPS, seed: 4, pop: k, glow: 1 + 0.25 * g, blush: st.blush }
    star(C, P, S_CAN, t, opts, {
      tt, drift: [drift[0] + lean, drift[1]],
      overlay: F => inSprite(x, F, () => {
        if (st.eyes) jealousEyesCells(x, st.eyes)
        const v = t >= T.z5 && t < T.del + 0.55 ? easeOutBack(prog(t, T.z5, T.z5 + 0.3), 2.4) : 0
        if (v > 0) veinCells(x, t, v)
      }),
    })
  }
  function drawSag(t, C, k) {
    const st = sagState(t), P = sagBase(t), h = fiveK(t), tt = frozen(t)
    const Pj = { x: P.x + 30 * h, y: P.y - 120 * h }
    if (st.glow > 1.05) { const S = toS(C, Pj.x, Pj.y, S_SAG); const gg = x.createRadialGradient(S.x, S.y, 0, S.x, S.y, S.s * 1.2); gg.addColorStop(0, `rgba(255,200,230,${0.35 * (st.glow - 1)})`); gg.addColorStop(1, 'rgba(255,200,230,0)'); x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = gg; x.fillRect(S.x - S.s * 1.2, S.y - S.s * 1.2, S.s * 2.4, S.s * 2.4); x.restore() }
    const opts = { color: SAG.color, glyph: SAG.glyph, mood: st.mood, look: st.look, blink: st.blink, hops: SAG_HOPS, seed: 8, pop: k, glow: st.glow, blush: st.blush }
    const ck = t >= T.kiss ? easeOutBack(prog(t, T.kiss, T.kiss + 0.3), 2.6) * (1 - prog(t, T.hug[0], T.hug[0] + 0.4)) : 0
    star(C, Pj, S_SAG, t, opts, { tt, rot: 0.32 * h, overlay: F => { if (ck > 0) inSprite(x, F, () => cheekSparkleCells(x, ck, t)) } })
  }
  function drawCometAll(t, C, k, part) {
    const P = cometPos(t)
    if (!P) return
    const st = cometState(t), S = toS(C, P.x, P.y, COM_R), tt = frozen(t)
    // talk hops: a little lift
    let lift = 0
    for (const hp of COM_HOPS) { const d = tt - hp; if (d >= 0 && d < 0.32) lift = Math.max(lift, Math.sin(Math.PI * d / 0.32)) }
    const y = S.y - lift * S.s * 0.16 + Math.sin(tt * 2.4 + 1) * S.s * 0.05
    const a = (t >= T.depart[0] ? 1 - prog(t, T.depart[1] - 0.15, T.depart[1]) : 1) * (1 - 0.9 * clamp(prog(t, T.lesson, T.lesson + 0.3)) * (1 - prog(t, T.lessonOut[0], T.lessonOut[1])))
    if (part === 'tail') drawCometTail(x, S.x, y, S.s * k, tt, { ang: st.tailAng, len: st.tailLen, wag: st.wag, alpha: a * clamp(k) })
    else drawComet(x, S.x, y, S.s, tt, { pop: k, alpha: a, shades: st.shades, mood: st.mood, look: st.look, squash: st.squash, tilt: st.tilt, stretch: st.stretch, stretchAng: st.stretchAng, glint: st.glint })
  }
  function kernelsAt(t, C) {
    const st = pisState(t), B = { x: BUCKET_AT.x, y: BUCKET_AT.y - 38 }
    const c = 4 * C.z
    // munching: kernels hop from the bucket up to Pisces
    if (st.munch) for (let q = 0; q < 2; q++) {
      const ph = ((t * 1.5 + q * 0.5) % 1)
      if (ph > 0.6) continue
      const p = ph / 0.6, wx = B.x - 10 + q * 20, wy = B.y - Math.sin(Math.PI * p) * 70 - p * 40
      const S = toS(C, wx, wy)
      kernel(x, S.x, S.y, c, p * 4)
    }
    // bursts: (time, count, freeze-until)
    for (const [tb, n, fz] of [[T.drop, 6, 0], [T.z6, 10, T.whip[0]], [T.plop, 12, 0], [T.scratch, 18, T.freeze[1]]]) {
      let dt = t - tb
      if (fz && t < fz) dt = Math.min(dt, 0.14)
      if (dt < 0 || dt > 1.3) continue
      const r = rng(Math.round(tb * 10))
      for (let i = 0; i < n; i++) {
        const vx = (r() * 2 - 1) * 330, vy = -(420 + r() * 520), sp = r() * 8
        const wx = B.x + vx * dt, wy = B.y + vy * dt + 0.5 * 1900 * dt * dt
        if (wy > 1500) continue
        const S = toS(C, wx, wy)
        x.globalAlpha = clamp((1.3 - dt) / 0.3); kernel(x, S.x, S.y, c, sp * dt); x.globalAlpha = 1
      }
    }
  }
  function drawPisces(t, C, k) {
    const st = pisState(t), tt = (inR(t, T.z6 + 0.12, T.whip[0]) ? T.z6 + 0.12 : frozen(t))
    const opts = { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: PIS_HOPS, seed: 12, pop: k, glow: 0.8 }
    star(C, PIS_AT, PIS_AT.s, tt, opts, { overlay: F => inSprite(x, F, () => { if (st.tears) tearsCells(x, t, st.tears); if (st.hank) hankieCells(x, st.hank) }) })
    const B = toS(C, BUCKET_AT.x, BUCKET_AT.y)
    drawPopcorn(x, B.x + st.tip * 30 * C.z, B.y, 7 * C.z * k, { rot: st.tip, phone: t >= T.plop && t < T.cut4, empty: st.tip < -0.1 ? 0.5 : 0 })
    kernelsAt(t, C)
  }
  // HA HA, HIGH FIVE!, the kiss sparkle in flight, shoo.
  function worldText(t, C) {
    T.ha.forEach((h, i) => {
      const k = t - h
      if (k < 0 || k > 0.9) return
      const wx = [650, 905, 640][i], wy = [905, 960, 1000][i] - k * 90, S = toS(C, wx, wy)
      x.globalAlpha = Math.sin(Math.PI * k / 0.9); stroked('HA', S.x, S.y, 44 * C.z, i % 2 ? PINK : GOLD, 10 * C.z); x.globalAlpha = 1
    })
    const f = t - T.five
    if (f >= 0 && f < 1.0) {
      const S = toS(C, 835, 905 - f * 70), pk = easeOutBack(prog(f, 0, 0.25), 3)
      x.save(); x.globalAlpha = 1 - prog(f, 0.75, 1.0); x.translate(S.x, S.y - 60 * C.z); x.rotate(-0.08); x.scale(pk, pk); stroked('HIGH FIVE!', 0, 0, 46 * C.z, GOLD, 12 * C.z); x.restore()
      sparkleRing(t, S.x, S.y + 40, T.five, 10, 150 * C.z, 0.3)
    }
    // the kiss: a sparkle flies from the comet to Sag's cheek
    const kp = prog(t, T.l4 + 0.02, T.kiss)
    if (kp > 0 && kp < 1) {
      const P = cometPos(t), from = toS(C, P.x - 50, P.y + 40), to = toS(C, 834, 1132)
      drawPixelStar(x, lerp(from.x, to.x, kp), lerp(from.y, to.y, kp) - Math.sin(Math.PI * kp) * 60 * C.z, 34 * C.z, 2, PINK)
    }
    if (t >= T.kiss) { const S = toS(C, 834, 1132); sparkleRing(t, S.x, S.y, T.kiss, 8, 70 * C.z, 0.6, [PINK, '#ffd3ea', GOLD, BONE], 0.6, 22 * C.z) }
    // the crickets during the stare
    for (const ch of T.chirps) {
      const k = t - ch
      if (k < 0 || k > 0.7) continue
      x.globalAlpha = Math.sin(Math.PI * k / 0.7) * 0.9
      const S = toS(C, ch === T.chirps[0] ? 640 : 160, (ch === T.chirps[0] ? 860 : 820) - k * 16)
      x.font = `700 ${Math.round(36 * C.z)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#9cf08a'; x.fillText('chirp.', S.x, S.y)
      x.globalAlpha = 1
    }
  }

  // ═══════════════════════ the phone (screen space) ═══════════════════════
  const PH = { x: 655, y: 1085, w: 400, h: 720 }
  function draft(t) {
    if (t < T.d1) return { s: '', label: 'NEW MESSAGE', on: false }
    if (t < T.d1del) return { s: D1.slice(0, cnt(D1T, t)).join(''), label: 'DRAFT 1', on: true }
    if (t < T.d2) { const n = Math.max(0, D1.length - Math.floor((t - T.d1del) / DEL1)); return { s: D1.slice(0, n).join(''), label: 'DELETING…', del: true, on: true } }
    if (t < T.del) return { s: D2.slice(0, cnt(D2T, t)).join(''), label: 'DRAFT 2', on: true }
    const n = Math.max(0, D2.length - Math.floor((t - T.del) / DEL2))
    return { s: D2.slice(0, n).join(''), label: n ? 'DELETING…' : 'DELETED ✓', del: true, on: n > 0 }
  }
  function wrap(s, maxW) {
    const words = s.split(' '), out = []
    let cur = ''
    for (const w of words) { const tryS = cur ? cur + ' ' + w : w; if (cur && x.measureText(tryS).width > maxW) { out.push(cur); cur = w } else cur = tryS }
    out.push(cur)
    return out
  }
  function phoneGeo(t, C) {
    if (t < T.phoneIn[0] || t >= T.plop) return null
    let px = PH.x, py = PH.y, s = 1, rot = 0
    if (t < T.phoneIn[1]) { const p = prog(t, ...T.phoneIn); py = lerp(2300, PH.y, easeOutBack(p, 1.3)); rot = lerp(0.25, 0, ease.outCubic(p)) }
    else { py += Math.sin(t * 2.1) * 6; rot = 0.012 * Math.sin(t * 1.3) }
    for (const ct of D2T.slice(19)) { const k = bump(t, ct, 0.14); px += 12 * k * Math.sin(t * 90); rot += 0.025 * k }
    if (t >= T.toss[0]) {
      const p = prog(t, ...T.toss), e = ease.inOutQuad(p), B = toS(C, BUCKET_AT.x + 8, BUCKET_AT.y - 40)
      px = lerp(PH.x, B.x, e); py = lerp(PH.y, B.y, e) - Math.sin(Math.PI * p) * 520; s = lerp(1, 0.12, ease.inQuad(p)); rot = p * TAU * 1.5
    }
    return { x: px, y: py, s, rot }
  }
  function drawPhone(t, C) {
    const P = phoneGeo(t, C)
    if (!P) return
    const w = PH.w, h = PH.h, hw = w / 2, hh = h / 2
    x.save(); x.translate(P.x, P.y); x.rotate(P.rot); x.scale(P.s, P.s)
    x.save(); x.shadowColor = rgba('#7be36a', 0.6); x.shadowBlur = 70
    rr(-hw, -hh, w, h, 56); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 56); x.stroke()
    const sx = -hw + 14, sy = -hh + 14, sw = w - 28, sh = h - 28
    x.save(); rr(sx, sy, sw, sh, 44); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#24164f'); g.addColorStop(1, '#43216f'); x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    // header: their star + name
    x.fillStyle = 'rgba(10,6,28,0.55)'; x.fillRect(sx, sy, sw, 112)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `700 46px ${INTER}`; x.fillText('‹', sx + 18, sy + 78)
    drawStarChar(x, sx + 96, sy + 64, 72, t, { color: SAG.color, mood: 'happy', bob: 0, tips: false, glow: 0.5, seed: 31 })
    x.fillStyle = BONE; x.font = `800 38px ${INTER}`; x.fillText('Sag', sx + 146, sy + 76)
    x.fillStyle = LAV; x.font = `700 26px ${MONO}`; x.fillText('♐︎', sx + 226, sy + 74)
    // their message
    x.textAlign = 'center'; x.font = `700 20px ${MONO}`; x.fillStyle = rgba(BONE, 0.6); x.fillText('TODAY 8:42 PM', 0, sy + 160)
    x.font = `700 36px ${INTER}`
    const msg = 'come say hi!! ☄️', mw = x.measureText(msg).width + 48
    rr(sx + 18, sy + 180, mw, 76, 30); x.fillStyle = 'rgba(201,166,255,0.95)'; x.fill()
    x.fillStyle = INK; x.textAlign = 'left'; x.fillText(msg, sx + 42, sy + 230)
    // the draft
    const d = draft(t)
    x.font = `700 22px ${MONO}`; x.letterSpacing = '3px'; x.fillStyle = d.del ? PINK : '#9cf08a'; x.fillText(d.label, sx + 26, sy + 398); x.letterSpacing = '0px'
    const fx0 = sx + 16, fy0 = sy + 418, fw = sw - 32, fh = 200
    rr(fx0, fy0, fw, fh, 30); x.fillStyle = 'rgba(12,6,30,0.78)'; x.fill(); x.lineWidth = 3; x.strokeStyle = d.s ? rgba('#9cf08a', 0.7) : rgba(BONE, 0.3); x.stroke()
    x.font = `700 46px ${INTER}`; x.textAlign = 'left'
    let cx = fx0 + 24, cy = fy0 + 66
    if (d.s) {
      const L = wrap(d.s, fw - 48)
      L.forEach((s, i) => {
        // slammed caps: COMET in green, a touch bigger
        const m = /^(.*?)(COMET|COME|COM|CO|C)$/.exec(s)
        if (m && s.includes(' ') === false && /C/.test(s) && t >= T.caps - 0.01) { x.fillStyle = '#9cf08a'; x.font = `800 50px ${INTER}`; x.fillText(s, fx0 + 24, fy0 + 66 + i * 56); x.font = `700 46px ${INTER}` }
        else { x.fillStyle = BONE; x.fillText(s, fx0 + 24, fy0 + 66 + i * 56) }
        if (i === L.length - 1) { cx = fx0 + 24 + x.measureText(s).width + 4; cy = fy0 + 66 + i * 56 }
      })
    } else { x.fillStyle = rgba(BONE, 0.4); x.fillText('Message', fx0 + 24, fy0 + 66) }
    if (Math.floor(t * 2.6) % 2 === 0) { x.fillStyle = '#9cf08a'; x.fillRect(cx, cy - 40, 5, 48) }
    // send: pulses while the thumb hovers
    const hv = inR(t, ...T.hover) ? 0.5 + 0.5 * Math.sin((t - T.hover[0]) * 14) : 0
    const bx = sx + sw - 62, by = sy + sh - 52, br = 30 * (1 + 0.18 * hv)
    if (hv > 0) { const gg = x.createRadialGradient(bx, by, 0, bx, by, 90); gg.addColorStop(0, rgba(PINK, 0.55 * hv)); gg.addColorStop(1, rgba(PINK, 0)); x.fillStyle = gg; x.fillRect(bx - 90, by - 90, 180, 180) }
    x.fillStyle = d.s ? PINK : 'rgba(255,255,255,0.2)'; x.beginPath(); x.arc(bx, by, br, 0, TAU); x.fill()
    x.fillStyle = INK; x.beginPath(); x.moveTo(bx, by - 15); x.lineTo(bx + 12, by + 1); x.lineTo(bx - 12, by + 1); x.fill(); x.fillRect(bx - 4, by - 1, 8, 16)
    if (hv > 0) { x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillStyle = PINK; x.fillText('SEND?', bx - 44, by + 8) }
    x.fillStyle = '#140d2a'; rr(-54, sy + 12, 108, 28, 14); x.fill()
    x.globalAlpha = 0.07; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.4); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }

  // ═══════════════════════ THE STARS (screen space) ═══════════════════════
  function narrator(t) {
    let P = null
    if (t >= T.narrIn && t < T.narrOut[1]) P = { x: 885, y: 610, s: 190, k: pop01(t, T.narrIn, 0.36, 2.2) * popOut(t, T.narrOut), mood: t < T.l5 ? 'neutral' : t < T.l5 + 1.5 ? 'happy' : 'wink', look: [-1, 1] }
    else if (t >= T.narr2[0] && t < T.narr2Out[1]) {
      const p = ease.outCubic(prog(t, ...T.narr2)), b = bump(t, T.shoo, 0.25)
      P = { x: lerp(1260, 880, p) - 40 * b, y: 470 - 30 * b, s: 170, k: popOut(t, T.narr2Out), mood: t < T.shoo ? 'squint' : 'happy', look: [-1, 0] }
    }
    if (!P || P.k <= 0.01) return
    drawStarChar(x, P.x, P.y, P.s, t, { color: STAR.sky, mood: P.mood, look: P.look, hops: [...N_HOPS, T.shoo], seed: 21, pop: P.k })
    const sk = t - T.shoo
    if (sk >= 0 && sk < 0.6) { x.save(); x.globalAlpha = 1 - prog(sk, 0.4, 0.6); x.translate(P.x - 20, P.y - 150 - sk * 40); x.scale(easeOutBack(prog(sk, 0, 0.2), 3), easeOutBack(prog(sk, 0, 0.2), 3)); stroked('shoo.', 0, 0, 46, GOLD, 12); x.restore() }
  }

  // ═══════════════════════ the Fin card + the talk card ═══════════════════════
  function finCard(t) {
    if (t < T.fin || t > T.finOut[1] + 0.05) return
    const tau = t - T.fin
    let rot = -1.35 * Math.exp(-2.6 * tau) * Math.cos(5.2 * tau)
    const p = prog(t, ...T.finOut), e = ease.inCubic(p)
    rot += 0.5 * e
    drawFin(x, 540, t, { py: -60, rope: 330, w: 600, h: 300, rot, dx: -1150 * e, dy: -260 * e, spin: -0.9 * e, alpha: clamp(tau / 0.08) })
  }
  function talkCard(t) {
    if (!TALK || t < T.card[0] || t > T.cardOut[1]) return
    const p = prog(t, ...T.card), e = ease.outCubic(p), o = ease.inCubic(prog(t, ...T.cardOut))
    const cx = lerp(1240, 540, e), cy = lerp(260, 935, e) - Math.sin(p * Math.PI) * 90 + Math.sin(t * 2) * 6 * e + o * 120
    const rot = lerp(1.5, -0.035, e) + 0.02 * Math.sin(t * 1.5) * e
    const wBody = 300 * (1 - 0.35 * o), w = wBody / TALK_BODY, h = w * TALK.height / TALK.width
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 420); gl.addColorStop(0, rgba(GOLD, 0.3 * e * (1 - o))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 420, cy - 420, 840, 840)
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(rot); x.drawImage(TALK, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(t, cx, cy, T.card[1] - 0.05, 12, 230, 0.4)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      const outP = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const kC = pop01(t, 0.05, 0.3, 1.6) * outP
        const kS = pop01(t, T.pull[0] + 0.1, 0.4, 2) * outP
        const kP = pop01(t, T.pull[1] - 0.1, 0.4, 2.2) * outP
        const kM = (t < T.streak[1] ? 1 : 1) * outP
        // orbit (behind everyone)
        const oa = clamp(prog(t, T.pull[0], T.pull[1])) * outP
        orbit(t, C, canBase(t), sagBase(t), wobK(t), steadyK(t), oa)
        meteors(t, C)
        drawCometAll(t, C, kM, 'tail')
        if (kS > 0.01) drawSag(t, C, kS)
        drawCometAll(t, C, kM, 'head')
        if (kC > 0.01) drawYou(t, C, kC)
        if (kP > 0.01) drawPisces(t, C, kP)
        worldText(t, C)
        // green sparkles drifting off your star as the envy drains
        if (inR(t, T.drain[0], T.drain[1] + 0.6)) {
          const P = canBase(t), r = rng(5)
          for (let i = 0; i < 16; i++) {
            const ph = ((t - T.drain[0]) * 0.8 + r()) % 1, S = toS(C, P.x + (r() * 2 - 1) * 140, P.y + 40 - ph * 260)
            x.globalAlpha = Math.sin(Math.PI * ph) * (1 - prog(t, T.drain[1], T.drain[1] + 0.6)); drawPixelStar(x, S.x, S.y, 22 * C.z, i % 2 ? 1 : 2, i % 3 ? '#7be36a' : '#c8ffb0')
          }
          x.globalAlpha = 1
        }
        talkCard(t)
        dramaFx(t)
        drawPhone(t, C)
        narrator(t)
        finCard(t)
        petals(x, t, T.fin + 0.1, { n: 30, life: 3.0, seed: 4 })
      }
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change. The default selection keeps 4 of these 9 (indices 1, 3, 5, 7):
// 10.55 (→ the rule of three), 22.45 (→ the drafts), 36.35 (→ the answer), 48.65 (→ the talk card). End card flips at 55.6.
export const CUTS = [4.85, T.cut1, 14.45, T.cut2, 28.62, T.cut3, 43.62, T.cut4, 52.25]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into G major = E minor's relative);
// brass / chip / lead / strings are written straight in E minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { E2: 82.41, B2: 123.47, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25, E5: 659.25 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [
  ['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }],
  ['tom', r3(t), low, { gain: 0.34, decay: 0.7, rev: 0.4, bus: 'fx' }],
  ['whoosh', r3(t + 0.04), 0.3, 0.06],
]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const chirp = (t0, pan) => [0, 0.05, 0.1].map(d => ['chip', r3(t0 + d), 4400, 0.03, { duty: 0.25, gain: 0.024, decay: 0.02, sustain: 0.7, pan, rev: 0.1, dly: 0, bus: 'fx' }])
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
const crunch = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', r3(t0 + i * gap), gain])
const munchTimes = []
for (let t = 4.0; t < 55; t += 1 / 1.5) munchTimes.push(r3(t))
export const CUES = [
  // 0 · the hook: DUN · DUN · DUNNN
  ...sting(T.z[0], [N.E3, N.B3, N.E4, N.G4], 0.42, 0.04, 82),
  ...sting(T.z[1], [N.F3, N.C4, N.F4, N.A4], 0.42, 0.042, 78),
  ...[1.45, 1.52, 1.58, 1.64].map((tt, i) => ['tom', tt, 70 - i * 3, { gain: 0.12 + 0.05 * i, decay: 0.3, rev: 0.3, bus: 'fx' }]),
  ...sting(T.z[2], [N.E3, N.G3, N.B3, N.E4, N.G4, N.B4], 1.3, 0.05, 60), ['boom', T.z[2], 0.32],
  ['strings', T.z[2], r3(T.z[2] + 1.6), [N.E4, N.G4, N.B4, N.E5], { gain: 0.012, attack: 0.05, release: 0.7, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[0]),
  ['whoosh', 3.75, 0.5, 0.05],
  // the comet streaks in, lands on the drop
  ['riser', 3.9, 4.47, 0.05], ['whoosh', 4.45, 0.7, 0.09], ['glitter', 3.95, 4.55],
  ['chip', T.drop, 3000, 0.28, { wave: 'noise', slide: -24, gain: 0.03, decay: 0.2, sustain: 0.4, rev: 0.1, dly: 0, bus: 'fx' }],
  ['pop', r3(T.drop + 0.02), 330, 0.06, 0.3], ['glitter', T.drop, r3(T.drop + 0.4)], ['pop', r3(T.drop + 0.07), 880, 0.03, -0.2],
  ['bell', T.glint, 2349.3, 0.03, 1.0, 0.3], ['pop', T.glint, 1760, 0.025, 0.3],
  // 1 · setup
  ...headCues(HEADS[1]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [CT]: 1046.5, [ST]: 740, [YT]: 880, [NT]: 990 } }),
  ...T.ha.map((h, i) => ['pop', h, i % 2 ? 1318.51 : 1174.66, 0.035, i % 2 ? 0.35 : 0.1]),
  ['whoosh', r3(T.five - 0.02), 0.3, 0.05], ['clap', T.five, { gain: 0.32, rev: 0.3, bus: 'fx' }], ['clap', r3(T.five + 0.012), { gain: 0.22, pan: 0.3, rev: 0.3, bus: 'fx' }],
  ['glitter', T.five, r3(T.five + 0.5)], ['pop', r3(T.five + 0.02), 1174.66, 0.04, 0.2],
  ...chirp(T.chirps[0], 0.4), ...chirp(T.chirps[1], -0.4), ['tick', r3(T.slowBlink + 0.12), 0.04],
  // 2 · you're glowing
  ['glitter', T.glowUp[0], T.glowUp[1]], ['bell', r3(T.glowUp[0] + 0.05), 1760, 0.022, 1.2, 0.2],
  ...sting(T.z4, [N.E3, N.B3, N.E4, N.G4], 0.5, 0.042, 80), ...headCues(HEADS[2]),
  // 3 · the meteor shower
  ['whoosh', r3(T.shower[0] + 0.1), 0.5, 0.05], ['glitter', T.shower[0], r3(T.shower[0] + 1.2)],
  ...Array.from({ length: 10 }, (_, i) => ['bell', r3(T.shower[0] + 0.2 + i * 0.27), NOTE[6 - (i % 7)] * 2, 0.012, 0.6, ((i % 3) - 1) * 0.4]),
  ...sting(T.z5, [N.F3, N.A3, N.C4, N.F4], 0.55, 0.045, 74), ...headCues(HEADS[3]),
  // 4 · the cheek → Pisces → your star, fully green
  ['chip', r3(T.l4 - 0.02), 700, 0.2, { duty: 0.25, slide: 20, gain: 0.03, decay: 0.15, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],
  ['glitter', T.kiss, r3(T.kiss + 0.35)], ['pop', T.kiss, 1318.51, 0.04, 0.3],
  ['whoosh', r3(T.z6 + 0.04), 0.3, 0.06], ['chip', r3(T.z6 + 0.02), 330, 0.42, { wave: 'tri', slide: -16, gain: 0.05, decay: 0.3, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ...crunch(r3(T.z6 + 0.02), 6, 0.025, 0.03), ['pop', r3(T.side), 880, 0.025, 0.4],
  ['whoosh', r3(T.whip[1] - 0.02), 0.42, 0.09],
  ...sting(T.z7, [N.E3, N.G3, N.B3, N.E4, N.G4, N.B4], 1.4, 0.055, 58), ['boom', T.z7, 0.36],
  ['strings', T.z7, r3(T.z7 + 1.6), [N.E4, N.G4, N.B4, N.E5], { gain: 0.012, attack: 0.04, release: 0.6, rev: 0.5, bus: 'fx' }],
  ...headCues(HEADS[4]),
  // 5 · drafts
  ['whoosh', r3(T.phoneIn[0] + 0.25), 0.4, 0.05], ['pop', T.phoneIn[1], 523.25, 0.035, 0.1],
  ...headCues(HEADS[5]),
  ...D1T.map(tt => ['tick', tt, 0.032]), ['pop', T.smug[0], 659.25, 0.02, 0],
  ...D1.map((_, i) => ['tick', r3(T.d1del + i * DEL1), 0.02]),
  ...D2T.slice(0, 19).map(tt => ['tick', tt, 0.034]),
  ...D2T.slice(19).flatMap(tt => [['tick', tt, 0.07], ['tom', tt, 96, { gain: 0.16, decay: 0.25, rev: 0.2, bus: 'fx' }]]),
  ['chip', T.hover[0], 880, 0.85, { duty: 0.25, vib: 0.05, gain: 0.012, decay: 0.8, sustain: 0.8, rev: 0.2, dly: 0, bus: 'fx' }],
  // 6 · the turn
  ['pop', T.narrIn, 880, 0.04, 0.3], ['bell', r3(T.narrIn + 0.06), 1760, 0.025, 1.2, 0.3],
  ...headCues(HEADS[6]),
  ...D2.map((_, i) => ['tick', r3(T.del + i * DEL2), 0.022]), ['pop', r3(T.del + D2.length * DEL2 + 0.02), 1174.66, 0.03, 0],
  ['pop', T.narrOut[0], 659.25, 0.025, 0.3],
  ['whoosh', r3(T.toss[0] + 0.3), 0.45, 0.07], ['pop', T.plop, 196, 0.07, 0.4], ['pop', r3(T.plop + 0.04), 300, 0.04, 0.4], ...crunch(T.plop, 8, 0.03, 0.03),
  ['pop', T.hop[0], 587.33, 0.03, -0.2], ['pop', r3(T.hop[1] - 0.04), 440, 0.035, -0.1],
  // 7 · plot twist
  ...scratch(T.scratch), ...crunch(T.scratch, 10, 0.02, 0.03),
  ['brass', T.twist[0], [N.E3, N.B3, N.E4], 0.22, { gain: 0.045, bright: 1.3, ...FXB }], ['tom', T.twist[0], 74, { gain: 0.3, decay: 0.5, rev: 0.4, bus: 'fx' }],
  ['brass', T.twist[1], [N.E3, N.B3, N.E4], 0.22, { gain: 0.045, bright: 1.3, ...FXB }], ['tom', T.twist[1], 74, { gain: 0.3, decay: 0.5, rev: 0.4, bus: 'fx' }],
  ['brass', T.twist[2], [N.C4, N.E4, N.G4, N.C5], 1.1, { gain: 0.05, bright: 1.3, ...FXB }], ['tom', T.twist[2], 60, { gain: 0.36, decay: 0.8, rev: 0.4, bus: 'fx' }], ['boom', T.twist[2], 0.3],
  ...headCues(HEADS[7]).filter(c => c[0] !== 'pluck'),
  ['glitter', r3(T.drain[0] + 0.1), r3(T.drain[0] + 1.0)], ...[0, 1, 2, 3].map(i => ['bell', r3(T.drain[0] + 0.2 + i * 0.32), NOTE[6 - i], 0.016, 1.0, 0]),
  ['chip', T.shades[0], 600, 0.25, { duty: 0.25, slide: 24, gain: 0.022, decay: 0.2, sustain: 0.6, rev: 0.1, dly: 0, bus: 'fx' }],
  ['bell', T.chime, 1174.66, 0.03, 1.6, 0], ['pluck', r3(T.chime + 0.12), 1479.98, 0.025, 0.8, 0],
  // 8 · fin
  ['whoosh', r3(T.fin + 0.2), 0.55, 0.06],
  ...NOTE.concat(NOTE.map(f => f * 2)).slice(0, 10).map((f, i) => ['pluck', r3(T.fin + i * 0.035), f / 2, 0.03, 0.6, ((i % 4) - 1.5) * 0.2]),
  ['brass', r3(T.fin + 0.4), [N.E3, N.G3, N.B3, N.E4, N.G4, N.B4], 1.2, { gain: 0.045, bright: 1.15, ...FXB }], ['tom', r3(T.fin + 0.4), 62, { gain: 0.3, decay: 0.8, rev: 0.4, bus: 'fx' }],
  ['strings', r3(T.fin + 0.4), r3(T.fin + 1.6), [N.E4, N.G4, N.B4, N.E5], { gain: 0.01, attack: 0.1, release: 0.5, rev: 0.5, bus: 'fx' }],
  ['whoosh', r3(T.narr2[0] + 0.25), 0.35, 0.05], ['pop', T.shoo, 523.25, 0.05, 0.3], ['tick', T.shoo, 0.06], ['whoosh', r3(T.finOut[0] + 0.35), 0.45, 0.06],
  // 9 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Em' }),
  // 10 · the talk card
  ['whoosh', r3(T.card[0] + 0.3), 0.45, 0.05], ['pop', T.card[1], 784, 0.04, 0], ['tick', T.card[1], 0.05], ['bell', r3(T.card[1] + 0.02), 1318.51, 0.03, 1.2, 0], ['glitter', r3(T.card[1] - 0.05), r3(T.card[1] + 0.5)],
  ...headCues(HEADS[8]),
  // 11 · comets pass
  ...headCues(HEADS[9]),
  ['bell', r3(T.depart[0] - 0.25), 2349.3, 0.025, 1.0, 0.3],
  ['whoosh', r3(T.depart[0] + 0.45), 0.8, 0.08], ['glitter', T.depart[0], r3(T.depart[1] + 0.2)], ['bell', r3(T.depart[0] + 0.5), 1760, 0.02, 1.6, 0.4],
  ['whoosh', r3(T.out[0] + 0.1), 0.35, 0.03],
  // popcorn crunches (soft) while Pisces munches
  ...munchTimes.filter(tt => pisState(tt).munch && !inR(tt, 0, 3.85) && !inR(tt, 22.45, 32.0) && !inR(tt, T.z4, 13.95) && !inR(tt, T.z5, 17.75) && !inR(tt, 19.75, 21.7)).map(tt => ['tick', r3(tt + 0.4), 0.012]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void ltOf
