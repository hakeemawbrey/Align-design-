// stelders — "The Elders." (60 s vertical Align ad, Star Talk "Wild Lessons" #10, promo/films/STARTALK-WILD.md).
// Story 0–55.6, then the shared end card. Dreamy, F major, 108 bpm. A front porch floating in the night sky: three
// elders rock in sync in pixel rocking chairs (GRANDPA, a tiny white dwarf asleep in a full-size chair · THE SUN,
// 4.6 billion years old · GRANDMA, a red giant who barely fits hers, knitting a scarf that grows all film). ♎ LIBRA
// (your star) panics on the steps; ♓ Pisces sits on the step with a lemonade, crying at everything.
//   0.0–4.4    "Everyone’s coupled up | but *me.*"  Libra skids onto the steps, sweating. LIBRA: "EVERYONE is coupled
//              up. except *ME.*"  The elders don't look up. Creak… creak.
//   4.5–17.2   "Exhibit *A.*" binary stars orbiting each other · "Exhibit *B.*" two constellations holding hands ·
//              "Exhibit *C.*" the twins, hugging: "even the twins have *each other!*"  GRANDPA, asleep, never opening
//              his eyes: "…those are *brothers,* sweetie."  "Exhibit C: | *brothers.*" The twins fist-bump.
//  17.27       card cut (flip)
//  17.3–28.3   "The elders | *rocked.*"  Silence. Crickets. Rocking. Name tags pop over each chair. THE SUN: "kid.
//              took me ages to get my *planets together.*" (eight planets pop into orbit, smug) · GRANDMA: "I met your
//              grandpa as a *red giant.*" · "late bloomer. *BIG* bloomer." She swells (squishing the Sun out of
//              its chair), then deflates. "*Big* | bloomer."
//  28.38       card cut (deal)
//  28.4–35.5   "Grandpa’s | *turn.*"  Everyone turns to the sleeping white dwarf. Crickets. He snorts awake (glasses
//              jump). GRANDPA: "back in my day, we didn’t *swipe.*" · "we waited for *gravity.*"  Grandma blushes; a
//              heart pops between their chairs; Pisces floods.
//  35.6        card cut (flip)
//  35.6–44.3   "The *real* | question."  LIBRA, small: "…but what if I’m *late?*"  The rocking stops dead.
//              THE SUN: "kid. you’re barely a *million* years old."  THE ELDERS, in sync: "a *baby.*"
//  44.49–49.4  ★ LESSON UNLOCKED: "You’re not late. | You’re on *your* time."  (+1 PATIENCE)
//  49.49       card cut (shuffle)
//  49.5–52.9   "Tonight’s *deck.*"  A hand of cards fans over the porch, flips to faces. GRANDMA: "new deck every
//              night. *no rush.*"  Libra goes heart-eyed.
//  52.98–55.45 "Now get off | our *porch.*"  The elders shoo-hop in sync, Grandpa waves his cane; Libra hops off
//              happy, Pisces scurries after it. Everything clears by 55.45; plain sky for the end card at 55.6.
// One canvas (sky + a camera-moved world), DOM headlines + dialogue boxes, the shared lesson module, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawPorch, chairBack, chairFront, drawScarf, drawGlasses, drawCane, drawLemonade, drawPlanet, drawTag, drawCricket, drawConstellationPair,
  drawSun, drawTears, eyesOf, drawSweat, drawHearts, pixelHeart, sparkBurst, speedLinesL, glowAt, PORCH } from './props.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', HOT = '#ff5c9a', LAV = '#c9a6ff', SUNC = '#ffc34a', RED = '#ff7a5c', ICE = '#bcd6ff'
export const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)            // 108 bpm grid
const LIB = signStar('libra'), PIS = signStar('pisces'), GEM = signStar('gemini')
const L_TAG = `${LIB.glyph} LIBRA`, SUN_TAG = 'THE SUN', GM_TAG = 'GRANDMA', GP_TAG = 'GRANDPA', ALL_TAG = 'THE ELDERS'
const GM_COL = '#ff6a4c', GP_COL = '#e4eeff', LIB_TXT = '#ffb3d1', SUN_TXT = SUNC, GM_TXT = '#ff9c84', GP_TXT = ICE

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · the hook
  h0: 0.1, h0Land: BEAT(2), h0Out: [4.24, 4.42], zipIn: [0.2, 0.7], open0: 1.05, l0: 1.25, close0: 4.4,
  // 2 · the evidence
  hA: 4.55, hALand: 4.95, hAOut: [7.62, 7.78], vA: 5.0, l1: 4.85, open1: 4.68,
  hB: 7.82, hBLand: 8.22, hBOut: [10.86, 11.02], vB: 8.25, l2: 8.05,
  hC: 11.06, hCLand: 11.4, hCOut: [13.78, 13.94], vC: 11.3, l3: 11.1,
  hD: 13.98, hDLand: 14.72, hDOut: [17.0, 17.18], l4: 13.96, bros: 14.72, bump: 15.5, vOut: [16.62, 17.1], close1: 17.12,
  cut1: BEAT(30),
  // 3 · the elders rocked
  hE: 17.33, hELand: 17.9, hEOut: [22.3, 22.46], tags: [18.05, 18.45, 18.85], crick1: [17.7, 19.5], sunUp: 19.15,
  open2: 19.4, l6: 19.6, planets: 20.8, planetsOut: [25.3, 25.8],
  hF: 22.85, hFOut: [25.5, 25.66], l8: 22.95,
  hG: 25.7, hGLand: BEAT(45) + 0.3, hGOut: [28.12, 28.28], l9: 25.72, swell: [BEAT(45) + 0.25, BEAT(45) + 0.95], deflate: [27.35, 27.75], close2: 28.25,
  cut2: BEAT(50),
  // 4 · grandpa
  hH: 28.45, hHLand: 28.95, hHOut: [35.3, 35.48], turnGP: 28.6, crick2: [28.7, 29.75], snort: 29.75, open3: 30.0, l10: 30.2, l11: 33.2, heart: 34.05, close3: 35.45,
  cut3: BEAT(63),
  // 5 · the real question
  hI: 35.68, hILand: 36.2, hIOut: [44.12, 44.32], open4: 35.9, l12: 36.1, stop: [36.6, 37.1], l13: 38.95, l14: 42.3, baby: 42.36, close4: 44.15,
  // 6 · the lesson
  lesson: BEAT(79), lessonOut: [49.22, 49.42], rockBack: [44.4, 45.4],
  // 7 · tonight's deck
  cut4: BEAT(88),
  hJ: 49.56, hJLand: 49.95, hJOut: [52.74, 52.92], deal: 49.62, dealGap: 0.09, flip: 50.45, flipGap: 0.12, deckOut: [52.55, 52.95], open5: 49.85, l15: 50.0, close5: 52.9,
  // 8 · get off our porch
  hK: 52.98, hKLand: BEAT(95), hKOut: [55.2, 55.42], shoo: [53.42, 53.98, 54.5], cane: [53.1, 54.95], libOff: [53.98, 54.62], pisOff: [54.3, 54.92], out: [54.98, 55.45],
}
const LINES0 = [{ t: T.l0, speaker: L_TAG, color: LIB_TXT, text: 'EVERYONE is coupled up. except *ME.*' }]
const LINES1 = [
  { t: T.l1, speaker: L_TAG, color: LIB_TXT, text: 'binary stars? *orbiting each other.*' },
  { t: T.l2, speaker: L_TAG, color: LIB_TXT, text: 'constellations? *holding hands.*' },
  { t: T.l3, speaker: L_TAG, color: LIB_TXT, text: 'even the twins have *each other!*' },
  { t: T.l4, speaker: GP_TAG, color: GP_TXT, text: '…those are *brothers,* sweetie.' },
]
const LINES2 = [
  { t: T.l6, speaker: SUN_TAG, color: SUN_TXT, text: 'kid. took me ages to get my *planets together.*' },
  { t: T.l8, speaker: GM_TAG, color: GM_TXT, text: 'I met your grandpa as a *red giant.*' },
  { t: T.l9, speaker: GM_TAG, color: GM_TXT, text: 'late bloomer. *BIG* bloomer.' },
]
const LINES3 = [
  { t: T.l10, speaker: GP_TAG, color: GP_TXT, text: 'back in my day, we didn’t *swipe.*' },
  { t: T.l11, speaker: GP_TAG, color: GP_TXT, text: 'we waited for *gravity.*' },
]
const LINES4 = [
  { t: T.l12, speaker: L_TAG, color: LIB_TXT, text: '…but what if I’m *late?*' },
  { t: T.l13, speaker: SUN_TAG, color: SUN_TXT, text: 'kid. you’re barely a *million* years old.' },
  { t: T.l14, speaker: ALL_TAG, text: 'a *baby.*' },
]
const LINES5 = [{ t: T.l15, speaker: GM_TAG, color: GM_TXT, text: 'new deck every night. *no rush.*' }]
const BOXES = [[LINES0, T.open0, T.close0], [LINES1, T.open1, T.close1], [LINES2, T.open2, T.close2], [LINES3, T.open3, T.close3], [LINES4, T.open4, T.close4], [LINES5, T.open5, T.close5]]
export const ALL_LINES = [...LINES0, ...LINES1, ...LINES2, ...LINES3, ...LINES4, ...LINES5]
const CPS = 28
export const LT = lineTimes(ALL_LINES, { cps: CPS })
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'You’re not late. | You’re on *your* time.', chip: '+1 PATIENCE', dim: 0.66 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const blinkSq = (t, t0, d = 0.5) => { const p = prog(t, t0, t0 + d); return p <= 0 || p >= 1 ? 0 : p < 0.3 ? p / 0.3 : p < 0.6 ? 1 : 1 - (p - 0.6) / 0.4 }

// ── where everyone sits
const FLOOR = PORCH.floor, SEAT = FLOOR - 104
const CH_GP = { cx: 206, w: 180, backH: 196 }, CH_SUN = { cx: 528, w: 232, backH: 208 }, CH_GM = { cx: 860, w: 288, backH: 226 }
const GP_S = 120, GM_S = 300, SUN_CELL = 5
const P_LIB = { x: 466, y: 1168, s: 230 }
const P_PIS = { x: 760, y: 1146, s: 110 }
const VIG = [{ x: 205, y: 556 }, { x: 540, y: 556 }, { x: 875, y: 556 }]
const seatY = S => SEAT - 0.44 * S + 12          // a star of sprite size S sits with its lower tips on the seat

// ── rocking: all three chairs in sync, slow (one full rock every 8 beats); the rocking stops dead at the question
const ROCK_P = 8 * 0.5556
const rockAmt = t => clamp(1 - ease.inOutQuad(prog(t, ...T.stop)) + ease.inOutQuad(prog(t, ...T.rockBack)))
const rock = (t, a = 0.05) => a * rockAmt(t) * Math.sin(2 * Math.PI * (t - 0.6) / ROCK_P)
export const CREAKS = (() => { const out = []; for (let t = 0.6 + ROCK_P / 4; t < T.out[0]; t += ROCK_P / 2) if (rockAmt(t) > 0.5) out.push(+t.toFixed(3)); return out })()

// ── the camera: keys [t, zoom, focusX, focusY]
const CAM = [
  [0, 1, 540, 960], [T.turnGP, 1, 540, 960], [T.turnGP + 0.9, 1.1, 430, 930], [T.close3 - 0.2, 1.1, 430, 930], [T.cut3 - 0.05, 1, 540, 960],
  [T.l12, 1, 540, 960], [T.l14 + 1.2, 1.07, 520, 1020], [T.lesson, 1, 540, 960],
  [T.hK, 1, 540, 960], [T.out[0], 1.03, 540, 990],
]
function cam(t) {
  if (t <= CAM[0][0]) return { z: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0], e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { z: z[1], fx: z[2], fy: z[3] }
}
function shake(t) {
  let a = 0
  for (const [t0, amp, d] of [[T.zipIn[1], 12, 0.3], [T.swell[0], 16, 0.5], [T.snort, 9, 0.3], [T.baby, 6, 0.25]]) { const k = t - t0; if (k >= 0 && k < d) a = Math.max(a, amp * (1 - k / d)) }
  return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
}

// ── ♎ Libra (your star)
const LIB_HOPS = [...talkHops(LINES0, L_TAG, { cps: CPS }), ...talkHops(LINES1, L_TAG, { cps: CPS }), ...talkHops(LINES4, L_TAG, { cps: CPS }), T.planets + 0.1, T.heart + 0.1, T.flip + 0.5, T.hK + 0.1]
function libState(t) {
  const st = { x: P_LIB.x, y: P_LIB.y, mood: 'wide', look: [0, -1], blink: undefined, squash: 0, sweat: 0, pop: 1, blush: undefined }
  // 1 · skid in from the right, land squashed, sweating
  if (t < T.open1) {
    const p = ease.outCubic(prog(t, ...T.zipIn))
    st.x = lerp(1320, P_LIB.x, p); st.squash = t < T.zipIn[1] ? -0.2 * (1 - p) : 0.32 * Math.exp(-(t - T.zipIn[1]) * 6) * Math.cos((t - T.zipIn[1]) * 18)
    st.sweat = t > T.zipIn[1] ? 1 : 0; st.look = t < T.l0 ? [-1, -1] : [0, -1]
    return st
  }
  // 2 · the evidence: points its eyes at each exhibit; deadpan at "brothers"
  if (t < T.cut1) {
    st.look = t < T.vB ? [-1, -1] : t < T.vC ? [0, -1] : [1, -1]
    st.mood = 'wide'
    if (t >= T.bros) { st.mood = 'neutral'; st.blink = 0.45; st.look = [-1, -1]; st.sweat = 1 }
    return st
  }
  // 3 · the elders rocked → planets → grandma swells
  if (t < T.cut2) {
    st.mood = t < T.l6 ? 'wide' : t < T.planets ? 'neutral' : 'sparkle'
    st.look = t < T.l8 ? [0, -1] : [1, -1]
    if (t >= T.swell[0] && t < T.deflate[1] + 0.3) { st.mood = 'wide'; st.squash = -0.06 * bump(t, T.swell[0], 0.5) }
    return st
  }
  // 4 · grandpa
  if (t < T.cut3) {
    st.look = [-1, -1]; st.mood = t < T.snort ? 'neutral' : t < T.l11 + 0.6 ? 'wide' : 'sparkle'
    if (t >= T.heart) st.mood = 'heart'
    return st
  }
  // 5 · the real question: small, looking down; "a baby" → flat, blushing
  if (t < T.lesson) {
    st.mood = t < T.l13 ? 'neutral' : t < T.baby ? 'wide' : 'squint'; st.look = t < T.l13 ? [0, 1] : [0, -1]
    st.squash = t < T.l13 ? 0.06 : 0; st.blush = t >= T.baby ? 0.9 : 0
    if (t < T.l13) st.blink = 0.3
    return st
  }
  if (t < T.cut4) { st.mood = t < T.lesson + 1.6 ? 'sparkle' : 'happy'; st.look = [0, -1]; return st }
  // 7 · the deck
  if (t < T.hK) { st.mood = t < T.flip + 0.3 ? 'sparkle' : 'heart'; st.look = [0, -1]; return st }
  // 8 · hops off, happy
  st.mood = 'happy'; st.look = [1, 0]
  if (t >= T.libOff[0]) { const p = prog(t, ...T.libOff); st.x = lerp(P_LIB.x, 1260, ease.inQuad(p)); st.y = P_LIB.y - 220 * Math.sin(Math.PI * Math.min(1, p * 1.3)) + 200 * ease.inQuad(p); st.squash = -0.12 }
  return st
}

// ── ♓ Pisces (on the step with a lemonade, crying at everything)
function pisState(t) {
  const st = { x: P_PIS.x, y: P_PIS.y, mood: 'sparkle', look: [-1, -1], tears: 0.6, fountain: false, squash: 0 }
  const flood = [[T.vA, T.vA + 2.2], [T.bump, T.bump + 1.3], [T.planets, T.planets + 1.6], [T.heart - 0.2, T.close3], [T.baby, T.baby + 1.6], [T.flip + 0.3, T.hK], [T.hK, T.out[1]]]
  for (const w of flood) if (inR(t, w)) { st.tears = 1; st.fountain = true; st.mood = 'heart' }
  if (inR(t, [T.swell[0], T.deflate[1] + 0.2])) { st.mood = 'wide'; st.tears = 0; st.look = [1, -1] }
  if (inR(t, [T.turnGP, T.snort + 0.4])) { st.mood = 'neutral'; st.tears = 0.3; st.look = [-1, -1] }
  if (inR(t, [T.stop[0], T.l14])) { st.mood = 'sparkle'; st.tears = 0.8; st.look = [-1, 0] }
  if (t >= T.pisOff[0]) { const p = prog(t, ...T.pisOff); st.x = lerp(P_PIS.x, 1220, ease.inQuad(p)); st.y = P_PIS.y - 120 * Math.sin(Math.PI * Math.min(1, p * 1.3)) + 120 * ease.inQuad(p) }
  return st
}

// ── Grandpa (white dwarf): asleep in a full-size chair the whole time… listening
const GP_HOPS = [...talkHops(LINES1, GP_TAG, { cps: CPS }), ...talkHops(LINES3, GP_TAG, { cps: CPS }), T.baby, ...T.shoo]
function gpState(t) {
  const st = { mood: 'sleepy', look: [0, 0], blink: undefined, squash: 0, blush: 0, jump: 0 }
  if (t >= T.snort) {
    const k = t - T.snort
    st.mood = k < 0.55 ? 'wide' : 'neutral'; st.squash = 0.3 * Math.exp(-k * 6) * Math.cos(k * 20); st.jump = bump(t, T.snort, 0.4)
    st.look = [0, 0]
    if (t >= T.l11 + 0.5) { st.mood = 'happy'; st.look = [1, 0]; st.blush = 0.9 }
    if (t >= T.cut3) { st.mood = t < T.l13 ? 'neutral' : 'happy'; st.look = [1, 1]; st.blush = 0 }
    if (t >= T.lesson) { st.mood = 'happy'; st.look = [1, 1] }
    if (t >= T.hK) { st.mood = 'squint'; st.look = [1, 1] }
  }
  return st
}
// ── Grandma (red giant): knitting, happy, swells on "BIG"
const GM_HOPS = [...talkHops(LINES2, GM_TAG, { cps: CPS }), ...talkHops(LINES5, GM_TAG, { cps: CPS }), T.baby, ...T.shoo]
function gmState(t) {
  const st = { mood: 'happy', look: [-1, 1], blink: undefined, squash: 0, size: GM_S, blush: undefined }
  const sw = easeOutBack(prog(t, ...T.swell), 1.6) * (1 - ease.inCubic(prog(t, ...T.deflate)))
  st.size = GM_S * (1 + 0.38 * sw)
  if (t >= T.deflate[0] && t < T.deflate[1] + 0.5) st.squash = 0.18 * Math.sin((t - T.deflate[0]) * 22) * Math.exp(-(t - T.deflate[0]) * 4)
  if (t >= T.l8 && t < T.l9) { st.mood = 'neutral'; st.look = [-1, 1] }
  if (t >= T.l9) st.mood = 'happy'
  if (t >= T.turnGP && t < T.cut3) { st.mood = 'neutral'; st.look = [-1, 0]; if (t >= T.l11 + 0.4) { st.mood = 'heart'; st.blush = 1 } }
  if (t >= T.cut3 && t < T.lesson) { st.mood = t < T.l13 ? 'neutral' : 'happy'; st.look = [-1, 1] }
  if (t >= T.cut4) { st.mood = 'happy'; st.look = [-1, 1] }
  if (t >= T.hK) { st.mood = 'squint'; st.look = [-1, 1] }
  return { ...st, sw }
}
// ── the Sun
function sunState(t, sw) {
  const st = { eyes: 'half', look: [0, 0], blink: 0, wink: 0, dx: 0, sx: 1, sy: 1, hop: 0 }
  if (t < T.sunUp) st.blink = 1 - 0.0 * t                          // dozing in the sun… as the Sun
  if (t >= T.sunUp && t < T.sunUp + 0.5) st.blink = 1 - prog(t, T.sunUp, T.sunUp + 0.4)
  if (t >= T.l6) st.look = [-1, 1]
  if (t >= T.swell[0] && t < T.deflate[1] + 0.4) { st.eyes = 'open'; st.look = [1, 0] }
  st.dx = -70 * sw; st.sx = 1 - 0.14 * sw; st.sy = 1 + 0.06 * sw
  if (t >= T.turnGP && t < T.cut3) { st.eyes = 'half'; st.look = [-1, 0]; if (t >= T.l11 + 0.4) st.eyes = 'happy' }
  if (t >= T.cut3) { st.eyes = 'open'; st.look = [-1, 1] }
  if (t >= T.baby) st.eyes = 'happy'
  if (t >= T.lesson) { st.eyes = 'half'; st.look = [-1, 1] }
  if (t >= T.flip) st.eyes = 'happy'
  if (t >= T.hK) st.eyes = 'half'
  // a talk-bounce on his lines and the shared hops
  for (const h of [T.l6, T.l6 + 0.6, T.l6 + 1.2, T.l13, T.l13 + 0.5, T.l13 + 1.0, T.baby, ...T.shoo]) st.hop = Math.max(st.hop, bump(t, h, 0.32))
  return st
}

// ── tonight's deck (screen space): a fanned hand over the porch
const FAN_N = 5, FAN_R = 760, FAN_PY = 1320, CARD_W = 150

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 120px Inter", "italic 500 156px 'EB Garamond'", "italic 500 200px 'EB Garamond'",
      "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, ...faceIms] = await Promise.all([loadImg('card-back.png'), ...[1, 2, 3, 4, 5].map(i => loadImg(`card-profile-${i}.png`))])
  const BACK = bake(backIm, 360), FACES = faceIms.map(im => bake(im, 380))
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  // ── type
  const H = (text, o) => popText(root, text, { wobble: true, ...o })
  const HEADS = [
    [H('Everyone’s coupled up | but *me.*', { top: 150, size: 96, accentSize: 160, at: T.h0, late: 1, lateAt: T.h0Land, accentColor: PINK, gap: 0.075, fit: true }), T.h0Out],
    [H('Exhibit *A.*', { top: 196, size: 124, accentSize: 184, at: T.hA, late: 1, lateAt: T.hALand, accentColor: PINK }), T.hAOut],
    [H('Exhibit *B.*', { top: 196, size: 124, accentSize: 184, at: T.hB, late: 1, lateAt: T.hBLand, accentColor: GOLD }), T.hBOut],
    [H('Exhibit *C.*', { top: 196, size: 124, accentSize: 184, at: T.hC, late: 1, lateAt: T.hCLand, accentColor: GEM.color }), T.hCOut],
    [H('Exhibit C: | *brothers.*', { top: 150, size: 104, accentSize: 168, at: T.hD, late: 1, lateAt: T.hDLand, accentColor: ICE }), T.hDOut],
    [H('The elders | *rocked.*', { top: 150, size: 112, accentSize: 176, at: T.hE, late: 1, lateAt: T.hELand, accentColor: GOLD }), T.hEOut],
    [H('Grandma’s | *love story.*', { top: 150, size: 108, accentSize: 168, at: T.hF, late: 2, lateAt: T.hF + 0.4, lateGap: 0.12, accentColor: RED }), T.hFOut],
    [H('Big | *bloomer.*', { top: 150, size: 112, accentSize: 184, at: T.hG, late: 1, lateAt: T.hGLand, accentColor: RED }), T.hGOut],
    [H('Grandpa’s | *turn.*', { top: 150, size: 112, accentSize: 176, at: T.hH, late: 1, lateAt: T.hHLand, accentColor: ICE }), T.hHOut],
    [H('The *real* | question.', { top: 150, size: 112, accentSize: 176, at: T.hI, late: 0, accentColor: LIB_TXT }), T.hIOut],
    [H('Tonight’s *deck.*', { top: 200, size: 116, accentSize: 168, at: T.hJ, late: 1, lateAt: T.hJLand, accentColor: LAV }), T.hJOut],
    [H('Now get off | our *porch.*', { top: 150, size: 116, accentSize: 184, at: T.hK, late: 1, lateAt: T.hKLand, accentColor: GOLD, gap: 0.08 }), T.hKOut],
  ]
  const boxes = BOXES.map(([lines, open, close]) => dialogueBox(root, { lines, y: 1462, width: 960, height: 290, open, close, cps: CPS }))
  // ★ LESSON UNLOCKED (shared module) over the scene and the type; then grain and the opening black
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the cast, each in its rocking chair (rotated about the rocker's floor contact)
  const inChair = (C, t, a, fn) => { x.save(); x.translate(C.cx, FLOOR); x.rotate(rock(t, a)); x.translate(-C.cx, -FLOOR); fn(); x.restore() }
  function drawGrandpa(t, o) {
    const st = gpState(t)
    inChair(CH_GP, t, 0.05, () => {
      chairBack(x, CH_GP.cx, FLOOR, CH_GP.w, CH_GP.backH)
      const r = drawStarChar(x, CH_GP.cx, seatY(108), GP_S, t, { color: GP_COL, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: GP_HOPS, seed: 3, pop: o, glow: 1.3, blush: st.blush, bob: 2 })
      if (o > 0.4) { const e = eyesOf(r); e.ey -= 26 * st.jump; drawGlasses(x, e, { col: '#3a3f5a' }) }
      chairFront(x, CH_GP.cx, FLOOR, CH_GP.w)
      // the cane leans on the arm; at the end it's up and shaking
      if (t < T.cane[0]) drawCane(x, CH_GP.cx + 112, SEAT - 40, 110, 0.12, 5)
      else { const k = Math.min(1, prog(t, T.cane[0], T.cane[0] + 0.25)); drawCane(x, lerp(CH_GP.cx + 112, CH_GP.cx + 80, k), lerp(SEAT - 40, SEAT - 190, k), 110, lerp(0.12, -0.5 + 0.35 * Math.sin(t * 18), k), 5) }
    })
  }
  function drawTheSun(t, o, sw) {
    const st = sunState(t, sw)
    inChair(CH_SUN, t, 0.05, () => {
      chairBack(x, CH_SUN.cx, FLOOR, CH_SUN.w, CH_SUN.backH)
      const cy = SEAT - 87 + 14 - st.hop * 16
      drawSun(x, CH_SUN.cx + st.dx, cy, SUN_CELL, t, { eyes: st.eyes, look: st.look, blink: st.blink, k: o, sx: st.sx, sy: st.sy * (1 + 0.04 * st.hop) })
      chairFront(x, CH_SUN.cx, FLOOR, CH_SUN.w)
    })
  }
  function drawGrandma(t, o, gm) {
    inChair(CH_GM, t, 0.045, () => {
      chairBack(x, CH_GM.cx, FLOOR, CH_GM.w, CH_GM.backH)
      const S = Math.round(gm.size / 36) * 36, y = seatY(S)
      if (gm.sw > 0.05) glowAt(x, CH_GM.cx, y, S * 1.2, '#ff5a3a', 0.6 * gm.sw)
      const r = drawStarChar(x, CH_GM.cx, y, gm.size, t, { color: GM_COL, mood: gm.mood, look: gm.look, blink: gm.blink, squash: gm.squash, hops: GM_HOPS, seed: 7, pop: o, glow: 1.1, blush: gm.blush, bob: 3 })
      if (o > 0.4) drawGlasses(x, eyesOf(r), { col: '#4a1a10' })
      chairFront(x, CH_GM.cx, FLOOR, CH_GM.w)
      // the knitting: the scarf grows all film (hangs to the floor, then runs along it)
      const len = 40 + 6.4 * t, x0 = CH_GM.cx - 36, y0 = y + S * 0.2
      const hang = FLOOR - 12 - y0
      drawScarf(x, x0, y0 + Math.sin(t * 6) * 2 * (t < T.l8 ? 1 : 0), hang, Math.max(0, len - hang), FLOOR - 12, 6, o)
    })
  }
  function drawLibra(t) {
    const st = libState(t), o = popOut(t, T.out)
    if (t < T.zipIn[0]) return
    if (t < T.zipIn[1]) speedLinesL(x, st.x, st.y, 240 * (1 - prog(t, ...T.zipIn)) + 40, { n: 5, spread: 120, seed: 2 })
    const r = drawStarChar(x, st.x, st.y, P_LIB.s, t, { color: LIB.color, glyph: LIB.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: LIB_HOPS, seed: 5, pop: o, blush: st.blush })
    if (st.sweat && o > 0.5) drawSweat(x, t, r.x + r.size * 0.34, r.y - r.size * 0.44, 6, 1)
  }
  function drawPisces(t) {
    const st = pisState(t), o = popOut(t, T.out)
    if (o <= 0.01) return
    const r = drawStarChar(x, st.x, st.y, P_PIS.s, t, { color: PIS.color, mood: st.mood, look: st.look, squash: st.squash, seed: 17, pop: o, glow: 0.8, hops: [T.vA + 0.1, T.bump + 0.1, T.heart, T.baby + 0.05, T.flip + 0.4] })
    drawLemonade(x, st.x + 62, st.y + 48, 5)
    if (st.tears > 0 && o > 0.3) { const e = eyesOf(r); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: st.tears * o, seed: 4, fountain: st.fountain }) }
  }

  // ── the evidence (screen-ish, inside the camera)
  function drawEvidence(t) {
    if (t < T.vA || t > T.vOut[1]) return
    const fo = 1 - ease.inCubic(prog(t, ...T.vOut))
    const label = (cx, txt, k) => {
      if (k <= 0) return
      x.save(); x.globalAlpha *= clamp(k) * fo; x.font = "700 27px 'Space Mono', ui-monospace, monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
      const w = Math.min(330, x.measureText(txt).width + 24); x.fillStyle = 'rgba(14,8,32,0.88)'; x.fillRect(cx - w / 2, 646, w, 44); x.fillStyle = BONE; x.fillText(txt, cx, 669, w - 16); x.restore()
    }
    // A · binary stars, orbiting each other
    {
      const k = pop01(t, T.vA, 0.4, 2.2) * fo, V = VIG[0], a = (t - T.vA) * 2.4
      glowAt(x, V.x, V.y, 150, '#ff8fb1', 0.3 * k)
      for (const [s, col, sd] of [[1, '#ffd0e0', 31], [-1, '#cfe0ff', 32]]) drawStarChar(x, V.x + Math.cos(a) * 62 * s, V.y + Math.sin(a) * 26 * s, 76, t, { color: col, mood: 'heart', seed: sd, pop: k, glow: 0.8, bob: 2 })
      if (k > 0.5) drawHearts(x, t, T.vA + 0.3, V.x, V.y - 40, { n: 4, px: 5, spread: 90, life: 1.2, rise: 120 })
      label(V.x, 'BINARY STARS', k)
    }
    // B · constellations holding hands
    if (t >= T.vB) { const k = pop01(t, T.vB, 0.4, 2.2) * fo, V = VIG[1]; drawConstellationPair(x, V.x, V.y - 6, t, { k, s: 0.95 }); label(V.x, 'CONSTELLATIONS', k) }
    // C · the twins, hugging… then (brothers) a fist-bump
    if (t >= T.vC) {
      const k = pop01(t, T.vC, 0.4, 2.2) * fo, V = VIG[2]
      const apart = ease.outBack(prog(t, T.bros, T.bros + 0.35)) * (1 - ease.inOutQuad(prog(t, T.bump - 0.2, T.bump))) * 1 + 0
      const gap = lerp(26, 58, apart) - 10 * bump(t, T.bump, 0.25)
      const mood = t < T.bros ? 'happy' : t < T.bump ? 'wide' : 'happy'
      for (const s of [-1, 1]) drawStarChar(x, V.x + s * gap, V.y + 6, 82, t, { color: GEM.color, mood, look: t < T.bros ? [0, 0] : [-s, 0], seed: 40 + s, pop: k, glow: 0.8, squash: t < T.bros ? 0.06 : 0, hops: [T.bump - 0.15] })
      sparkBurst(x, t, V.x, V.y - 10, T.bump, { n: 8, R: 70, size: 18, seed: 3, cols: [GOLD, BONE] })
      label(V.x, t < T.bros ? 'THE TWINS' : 'BROTHERS', k)
    }
  }
  // ── the planets: eight pop into a tilted orbit around the Sun, smug
  const PLAN = [['#b9a99a', 9], ['#ffd59a', 13], ['#6fb8ff', 14], ['#ff8a5c', 11], ['#e8b07a', 24], ['#f2d9a0', 21], ['#9fe8f0', 17], ['#5f7dff', 17]]
  function drawPlanets(t, front) {
    if (t < T.planets || t > T.planetsOut[1]) return
    const fo = 1 - ease.inCubic(prog(t, ...T.planetsOut)), sx = CH_SUN.cx, sy = SEAT - 80
    PLAN.forEach(([col, r], i) => {
      const k = pop01(t, T.planets + i * 0.11, 0.3, 2.4) * fo
      if (k <= 0) return
      const a = (t - T.planets) * (1.4 - i * 0.1) + i * 0.8, rx = 150 + i * 16, ry = 34 + i * 4
      const px = sx + Math.cos(a) * rx, py = sy + Math.sin(a) * ry - 10
      if ((Math.sin(a) > 0) !== front) return
      drawPlanet(x, px, py, r * k, col, { ring: i === 5 })
    })
  }
  // ── the name tags over each chair
  function drawTags(t) {
    const fo = 1 - ease.inCubic(prog(t, 35.2, 35.5))
    if (t < T.tags[0] || fo <= 0) return
    const tags = [[CH_GP.cx + 10, 'GRANDPA', 'WHITE DWARF', ICE, 270], [CH_SUN.cx, 'THE SUN', '4.6 BILLION YRS', SUNC, 300], [CH_GM.cx - 20, 'GRANDMA', 'RED GIANT', RED, 260]]
    tags.forEach(([cx, a, b, col, w], i) => { const lift = i === 2 ? 110 * (gmLift(t)) : 0; drawTag(x, cx, 642 - lift, a, b, { k: pop01(t, T.tags[i], 0.32, 2.4) * fo, gold: col, w }) })
  }
  const gmLift = t => easeOutBack(prog(t, ...T.swell), 1.6) * (1 - ease.inCubic(prog(t, ...T.deflate)))
  // ── crickets on the railing during the silences
  function drawCrickets(t) {
    for (const [w, cx] of [[T.crick1, 362], [T.crick2, 690]]) {
      const k = pop01(t, w[0], 0.25, 2) * (1 - ease.inQuad(prog(t, w[1] - 0.2, w[1])))
      if (k <= 0) continue
      drawCricket(x, cx, PORCH.rail + 2, 5, { chirp: Math.sin((t - w[0]) * 9) > 0.2 ? 1 : 0, alpha: k })
    }
  }
  // ── tonight's deck
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal || t > T.deckOut[1]) return
    for (let i = 0; i < FAN_N; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) continue
      const deg = (i - (FAN_N - 1) / 2) * 9, a = deg * Math.PI / 180, e = easeOutBack(p, 1.4)
      const fx = 540 + Math.sin(a) * FAN_R, fy = FAN_PY - Math.cos(a) * FAN_R
      const o = prog(t, T.deckOut[0] + Math.abs(i - 2) * 0.03, T.deckOut[1])
      const cx = lerp(CH_GM.cx, fx, e), cy = lerp(780, fy, e) - ease.inCubic(o) * 1300, rot = lerp(a * 2.2 - 0.6, a, e)
      const lift = 22 * bump(t, T.flip + i * T.flipGap, 0.5)
      const f = prog(t, T.flip + i * T.flipGap, T.flip + i * T.flipGap + 0.3), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy - lift, CARD_W, rot, sx)
      else drawCardImg(FACES[i % FACES.length], FACE_BODY, cx, cy - lift, CARD_W, rot, -sx)
    }
    sparkBurst(x, t, 540, 600, T.flip + 0.2, { n: 14, R: 330, size: 28, seed: 0.4, life: 0.9 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shake(t), o = popOut(t, T.out)
        x.save()
        x.translate(540 + sh[0], 960 + sh[1]); x.scale(C.z * 1.08, C.z * 1.08); x.translate(-C.fx, -(C.fy - 52))   // a base zoom so the porch fills the frame
        drawPorch(x, t, { alpha: 1 - ease.inQuad(prog(t, ...T.out)), dy: 40 * ease.inCubic(prog(t, ...T.out)) })
        drawCrickets(t)
        const gm = gmState(t)
        drawPlanets(t, false)
        drawGrandpa(t, o)
        drawTheSun(t, o, gm.sw)
        drawGrandma(t, o, gm)
        drawPlanets(t, true)
        // the gravity heart between grandpa and grandma
        if (t >= T.heart && t < T.close3 + 0.3) {
          const k = pop01(t, T.heart, 0.4, 2.6) * (1 - ease.inCubic(prog(t, T.close3 - 0.1, T.close3 + 0.3)))
          pixelHeart(x, 540, 640 - 8 * Math.sin((t - T.heart) * 5), 12 * k, '#ff5c8a')
          sparkBurst(x, t, 540, 640, T.heart, { n: 12, R: 160, size: 24, seed: 2, cols: [PINK, GOLD, BONE] })
          drawHearts(x, t, T.heart + 0.2, 540, 600, { n: 6, px: 6, spread: 300, life: 1.4, rise: 200 })
        }
        drawTags(t)
        drawEvidence(t)
        drawPisces(t)
        drawLibra(t)
        if (t >= T.baby && t < T.baby + 0.7) sparkBurst(x, t, 540, 820, T.baby, { n: 12, R: 380, size: 26, seed: 5, cols: [GOLD, BONE, PINK] })
        x.restore()
        drawDeck(t)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, oo] of HEADS) h.update(t, outK(t, oo))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (beat changes where the old beat has cleared). The default selection keeps 17.27 (→ the
// elders rocked) and 35.6 (→ the real question); 28.38 (→ grandpa) and 49.49 (→ the deck) are kept by hand so the cuts
// run about every 7–14 s.
export const CUTS = [4.49, { t: T.cut1, kind: 'flip' }, { t: T.cut2, kind: 'deal', keep: true }, { t: T.cut3, kind: 'flip' }, { t: T.cut4, kind: 'shuffle', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are moved into the score's key by the engine; chip / tom sit on a private 'sfx' bus in F)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const F_ = { C4: 261.63, F4: 349.23, A4: 440, C5: 523.25, D5: 587.33, F5: 698.46, A5: 880, C6: 1046.5, F6: 1396.91 }
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, gap = 0.08) => [...wordPops(t0, n, gap, base, gain), ['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]]
const creak = (t, g = 0.016) => [['chip', r3(t), 196, 0.2, { ...FX, wave: 'square', duty: 0.12, slide: -3, vib: 0.12, gain: g, decay: 0.16, sustain: 0.5 }], ['chip', r3(t + 0.12), 233, 0.16, { ...FX, wave: 'square', duty: 0.12, slide: -2, vib: 0.1, gain: g * 0.7, decay: 0.12, sustain: 0.4 }]]
const chirp = (t0, gain = 0.016) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t, f = 1318.51, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const thump = (t, g = 0.24) => [['tom', r3(t), 92, { ...FX, gain: g, decay: 0.28 }], ['boom', r3(t), 0.05]]
const womp = t => [['chip', r3(t), F_.D5 * 0.5, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.045, decay: 0.2, sustain: 0.8 }], ['chip', r3(t + 0.34), F_.A4 * 0.5, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.045, decay: 0.3, sustain: 0.8 }]]
const snort = t => [['chip', r3(t), 90, 0.22, { ...FX, wave: 'noise', slide: 4, gain: 0.05, decay: 0.12, sustain: 0.4 }], ['chip', r3(t + 0.05), 120, 0.16, { ...FX, wave: 'square', duty: 0.2, slide: 6, gain: 0.03, decay: 0.1, sustain: 0.3 }]]
const PITCH = { [L_TAG]: 1046.5, [SUN_TAG]: 523.25, [GM_TAG]: 698.46, [GP_TAG]: 440, [ALL_TAG]: 587.33 }
const SILENT = [[T.cut1, T.l6], [T.turnGP, T.snort], [T.stop[1], T.l13]]
const loudCreak = t => SILENT.some(w => t >= w[0] && t < w[1])

export const CUES = [
  ['busFx', 'sfx', { gain: 20 }],
  // the rocking chairs creak on every rock (louder in the silences)
  ...CREAKS.flatMap(t => creak(t, loudCreak(t) ? 0.034 : 0.011)),
  // 1 · the hook
  ...head(T.h0, 5, T.h0Land, 0, 0.024, 0.075),
  ['whoosh', T.zipIn[0], 0.5, 0.07], ['chip', T.zipIn[0] + 0.1, 1400, 0.4, { ...FX, wave: 'square', duty: 0.25, slide: -18, gain: 0.03, decay: 0.2, sustain: 0.6 }], ...thump(T.zipIn[1], 0.3),
  ['pop', T.open0, 659.25, 0.035, 0],
  // 2 · the evidence
  ...head(T.hA, 1, T.hALand, 2), ['pop', T.vA, 880, 0.04, -0.4], ['bell', r3(T.vA + 0.1), 1760, 0.03, 1.4, -0.4], ['glitter', T.vA, r3(T.vA + 0.6)], ...sob(r3(T.vA + 0.4)),
  ...head(T.hB, 1, T.hBLand, 3), ['pop', T.vB, 987.77, 0.04, 0], ['bell', r3(T.vB + 0.1), 1975.53, 0.03, 1.4, 0], ['glitter', T.vB, r3(T.vB + 0.6)],
  ...head(T.hC, 1, T.hCLand, 4), ['pop', T.vC, 1174.66, 0.04, 0.4], ['bell', r3(T.vC + 0.1), 2349.32, 0.025, 1.4, 0.4],
  ['tapeStop', r3(T.l4 - 0.4), 0.38],
  ...head(T.hD, 2, T.hDLand, 0), ...womp(r3(T.bros + 0.1)),
  ['pop', r3(T.bump - 0.15), 880, 0.03, 0.4], ['clap', r3(T.bump), { bus: 'sfx', gain: 0.05 }], ['glitter', T.bump, r3(T.bump + 0.4)], ...sob(r3(T.bump + 0.2), 1567.98),
  // 3 · the elders rocked
  ...head(T.hE, 2, T.hELand, 1),
  ...[0, 1, 2, 3, 4, 5].flatMap(i => chirp(r3(T.crick1[0] + 0.15 + i * 0.32), i % 2 ? 0.011 : 0.016)),
  ...T.tags.map((tt, i) => ['pop', tt, [783.99, 880, 987.77][i], 0.035, (i - 1) * 0.4]),
  ['tick', T.sunUp, 0.04], ['pluck', r3(T.sunUp + 0.1), 698.46, 0.03, 0.8, 0],
  ['pop', T.open2, 659.25, 0.035, 0],
  ...PLAN_SND(),
  ...head(T.hF, 2, r3(T.hF + 0.4), 2),
  ...head(T.hG, 1, T.hGLand, 4),
  ['riser', r3(T.swell[0] - 0.3), T.swell[0], 0.05], ['chip', T.swell[0], F_.F4, 0.6, { ...FX, wave: 'square', duty: 0.4, slide: 16, gain: 0.04, decay: 0.3, sustain: 0.8 }],
  ...thump(T.swell[0], 0.3), ['crash', T.swell[0], { gain: 0.04, len: 1.6 }], ...creak(r3(T.swell[0] + 0.05), 0.05), ...creak(r3(T.swell[0] + 0.35), 0.04),
  ['whoosh', T.deflate[0], 0.45, 0.06], ['chip', T.deflate[0], F_.C5, 0.42, { ...FX, wave: 'tri', slide: -20, vib: 0.06, gain: 0.04, decay: 0.3, sustain: 0.7 }],
  // 4 · grandpa
  ...head(T.hH, 1, T.hHLand, 3),
  ['tick', T.turnGP, 0.05], ['tick', r3(T.turnGP + 0.06), 0.04], ['tick', r3(T.turnGP + 0.12), 0.04],
  ...[0, 1, 2].flatMap(i => chirp(r3(T.crick2[0] + 0.2 + i * 0.3), i % 2 ? 0.011 : 0.016)),
  ...snort(T.snort), ['pop', r3(T.snort + 0.04), 1567.98, 0.035, -0.4],
  ['pop', T.open3, 659.25, 0.035, 0],
  ['bell', T.heart, 1396.91, 0.04, 2, 0], ['glitter', T.heart, r3(T.heart + 0.8)], ['pluck', r3(T.heart + 0.12), 1760, 0.035, 0.8, 0], ...sob(r3(T.heart + 0.3), 1567.98), ...sob(r3(T.heart + 0.9), 1318.51, 2),
  // 5 · the real question
  ...wordPops(T.hI, 3, 0.07, 1, 0.024),
  ['pop', T.open4, 659.25, 0.035, 0],
  ['tick', T.stop[0], 0.04], ['tick', r3(T.stop[0] + 0.3), 0.05],
  ['pop', T.baby, 880, 0.04, -0.3], ['pop', r3(T.baby + 0.02), 1108.73, 0.04, 0], ['pop', r3(T.baby + 0.04), 1318.51, 0.04, 0.3], ...thump(r3(T.baby + 0.3), 0.14), ['glitter', T.baby, r3(T.baby + 0.5)], ...sob(r3(T.baby + 0.3), 1567.98),
  // 6 · the lesson
  ['riser', r3(T.lesson - 1.0), r3(T.lesson - 0.05), 0.02],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  // 7 · tonight's deck
  ...head(T.hJ, 1, T.hJLand, 2),
  ...Array.from({ length: FAN_N }, (_, i) => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]), ['whoosh', T.deal, 0.4, 0.04],
  ...Array.from({ length: FAN_N }, (_, i) => ['pop', r3(T.flip + i * T.flipGap + 0.15), NOTE[(i + 2) % 7], 0.03, (i - 2) * 0.2]), ['glitter', r3(T.flip + 0.2), r3(T.flip + 1)],
  ['pop', T.open5, 659.25, 0.035, 0], ['whoosh', T.deckOut[0], 0.35, 0.035],
  // 8 · get off our porch
  ...head(T.hK, 3, T.hKLand, 0, 0.026, 0.08),
  ...T.shoo.map(s => ['pop', s, 523.25, 0.035, 0]), ...T.shoo.flatMap(s => creak(r3(s + 0.05), 0.02)),
  ['whoosh', T.libOff[0], 0.4, 0.05], ['pop', T.libOff[0], 1174.66, 0.035, 0.4], ['whoosh', T.pisOff[0], 0.35, 0.04], ...sob(r3(T.pisOff[0] + 0.05), 1567.98, 2),
  ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue blips
  ...BOXES.flatMap(([lines]) => talkCues(lines, { cps: CPS, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function PLAN_SND() { return Array.from({ length: 8 }, (_, i) => ['pop', r3(T.planets + i * 0.11), NOTE[i % 7] * (i > 6 ? 2 : 1), 0.028, (i - 3.5) * 0.12]) }
void drawPixelStar; void HOT; void STAR; void SUNC
