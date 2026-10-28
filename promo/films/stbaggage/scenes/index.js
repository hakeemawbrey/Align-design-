// stbaggage — "Baggage Claim." (45 s vertical Align ad, Star Talk season 3 #10, music: lofi in F). Story 0–40.6, then the
// shared end card. A baggage carousel floating in space under a split-flap ARRIVALS board (DATE #3 · ON TIME). ♏ SCORPIO
// is on date #3 with ♉ TAURUS (pretzel in hand). ♍ VIRGO and ♋ CANCER wait at the belt; ♓ PISCES sits on the hatch,
// holding a suitcase that has been dripping since the start (a WET FLOOR sign appears early, unexplained).
//   0.0–4.4   "Everyone brings | *baggage.*"  The board flaps settle, the belt buzzes on. THE STARS: "date #3. that's when
//             the bags come out." Scorpio and Taurus glance at each other (a heart pops). The hatch rumbles…
//   4.49      the drop: Scorpio's huge black trunk bursts out (chains, three padlocks, HEAVY sticker, tag TRUST ISSUES).
//   4.5–9.3   "Some bags | are *heavy.*"  It skids to a stop in front of the couple; the belt slides under it, squealing.
//             Scorpio grabs a handle and heaves… nothing… slips and boings back. SCORPIO: "it's not baggage. it's
//             *security.*" Taurus takes a bite of pretzel, deadpan.
//   9.3       card cut candidate.
//   9.3–13.2  "Some are | *clingy.*"  A tote pops out (MY EX'S HOODIE (still)); Cancer snatches it and hugs it.
//             CANCER: "I'm not keeping it. I'm *storing* it."  Everyone else: flat eyes.
//  13.2       card cut (kept).
//  13.2–16.6  "Some are | *fast.*"  A tiny red duffel (CAN'T SIT STILL) trembles… and zooms laps, hurdling the trunk, Aries
//             chasing it; the crowd's eyes track every pass. ARIES: "it's not running. it's *cardio.*" It stops… and goes again.
//  16.6–20.6 "Some are | *colour-coded.*"  Three numbered suitcases glide out in formation, hurdle the trunk in sync and stop
//             in front of Virgo, perfectly spaced (alignment guides). VIRGO holds up its list: "yes, it's control. it's
//             also *laminated.*"
//  20.6–22.4 "And some are… | *family.*"  A giant crate (FAMILY STUFF, FRAGILE, two THIS SIDE UP arrows that disagree)
//             wedges in the hatch: the belt jams, the beacon goes red, the board flips to DELAYED. Everyone gasps. Crickets.
//             Everyone glances at each other… and looks away, whistling. Nobody claims it.
//  22.4–25.6 "And some | *leak.*"  Looking away = looking up: Pisces, sobbing onto its dripping suitcase (FEELINGS (liquids)).
//             PISCES: "these feelings are not *travel size.*"
//  25.6      card cut (kept). The breakdown.
//  25.6–30.6 "The real | *question.*"  THE STARS: "everyone has baggage." (everyone looks at their own) → "who helps you
//             *carry it?*" Scorpio heaves at the trunk alone again… Taurus gulps the pretzel, takes the other handle, and
//             the trunk lifts like nothing. Hop. Aww. The board flips back to ON TIME.
//  30.6–35.05 ★ LESSON UNLOCKED: "Everyone has baggage. | Find someone who | helps you *carry it.*" (+1 CARRY-ON)
//  35.05–38.4 "Check the | *board.*"  The board flips to DEPARTURES and the Push / Pull / Align reading: PUSH · TURBULENCE,
//             PULL · STRONG, ALIGN · ON TIME. THE STARS: "push shows the bumps before you fly."
//  38.4–40.45 "Pack light. | *Travel* together."  The board flips to DATE #4 · BOARDING; the couple takes off with the trunk
//             between them. Everything pops out by 40.45; the end card takes over at 40.6.
// One canvas (sky + the camera-moved stage + the screen-space board), DOM type + the dialogue boxes + the shared lesson,
// grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { R, HATCH, TRUNK, drawBelt, drawModule, drawFlaps, drawBoard, drawTag, drawTrunk, drawTote, drawDuffel, drawCase, drawCrate,
  drawPretzel, drawList, drawWetFloor, drawDrop, drawPuddle, drawTear, drawSweat, drawPixelHeart, drawDizzy, drawSpeed, sparkleRing, drawDust } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', RED = '#ff5c6a', GREEN = '#6dff9a'
export const BEAT = n => 0.6 + n * 0.5556       // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 1 · hook
  h0: 0.12, h0Land: 0.72, h0Out: [4.22, 4.4],
  flip0: 0.3, beltOn: 0.6, open1: 0.85, l1: 1.05, glance: [2.0, 2.75], heart: 2.1, rumble: [3.4, 4.45],
  burst: BEAT(7),                                                   // 4.489 the drop
  // 2 · heavy
  h1: 4.55, h1Land: 4.95, h1Out: [8.95, 9.12],
  slide: [BEAT(7), 5.02], squeal: [5.02, 5.9], grab: [5.2, 5.42], strain: [5.42, 6.2], slip: [6.2, 6.62], l2: 6.5, munch: 7.95,
  // 3 · clingy
  cut1: 9.3,
  tote: [9.35, 9.8], lunge: [9.55, 9.82], back: [9.85, 10.15], h2: 9.42, h2Land: 9.78, h2Out: [12.95, 13.12], l3: 10.2, flat: 11.25,
  sign: 8.4,
  // 4 · fast
  cut2: 13.2,
  pop3: 13.25, laps: [[13.65, 14.15], [14.5, 14.9], [15.22, 15.52]], rest: [15.6, 16.2], again: [16.2, 16.5],
  h3: 13.3, h3Land: 13.62, h3Out: [16.45, 16.62], l4: 13.9,
  // 5 · colour-coded
  cases: [16.6, 16.75, 16.9], caseLand: 17.45, guides: [17.5, 18.3], listUp: 17.6, glint: [18.3, 18.85],
  h4: 16.68, h4Land: 17.05, h4Out: [20.42, 20.57], l5: 17.3,
  // 6 · family
  jam: BEAT(36),                                                    // 20.6 the crate wedges
  h5: 20.66, h5Land: 21.15, h5Out: [22.4, 22.55], gasp: 20.68, crickets: 21.35, glanceL: [21.3, 21.62], glanceR: [21.62, 21.92], away: [21.95, 22.45],
  // 7 · leak
  spot: 22.4, h6: 22.6, h6Land: 22.95, h6Out: [25.45, 25.6], l6: 23.0,
  // 8 · the turn
  cut3: 25.6, h7: 25.75, h7Land: 26.1, h7Out: [30.35, 30.5], l7: 25.85, lookDown: [26.0, 27.3], cameo: [26.9, 27.35],
  l8: 28.15, brace: 28.3, strain2: [28.45, 29.15], gulp: 28.95, tauGrab: [29.05, 29.3], lift: [29.4, 29.85], aww: 29.95, onTime: 30.0, close1: 30.5,
  // 9 · lesson
  lesson: BEAT(54),                                                 // 30.6
  lessonOut: [34.85, 35.05],
  // 10 · tie-in
  board: 35.05, h8: 35.2, h8Land: 35.55, h8Out: [37.7, 37.85], l9: 35.55, push: [35.6, 38.3], close2: 38.42, date4: 38.42,
  // 11 · last line
  h9: 37.9, takeoff: [38.6, 40.15], out: [39.95, 40.45],
}

const S = id => signStar(id)
const SCO = S('scorpio'), TAU = S('taurus'), CAN = S('cancer'), VIR = S('virgo'), ARI = S('aries'), PIS = S('pisces')
const NAME = { sco: '♏ SCORPIO', can: '♋ CANCER', ari: '♈ ARIES', vir: '♍ VIRGO', pis: '♓ PISCES', sky: 'THE STARS' }
const LINES1 = [
  { t: T.l1, speaker: NAME.sky, color: GOLD, text: "date #3. that's when the bags *come out.*" },
  { t: T.l2, speaker: NAME.sco, color: '#ff7d9a', text: "it's not baggage. it's *security.*" },
  { t: T.l3, speaker: NAME.can, color: '#8fdcff', text: "I'm not keeping it. I'm *storing* it." },
  { t: T.l4, speaker: NAME.ari, color: '#ff9a6a', text: "it's not running. it's *cardio.*" },
  { t: T.l5, speaker: NAME.vir, color: '#ff8fb8', text: "yes, it's control. it's also *laminated.*" },
  { t: T.l6, speaker: NAME.pis, color: '#b3acff', text: 'these feelings are not *travel size.*' },
  { t: T.l7, speaker: NAME.sky, color: GOLD, text: 'everyone has *baggage.*' },
  { t: T.l8, speaker: NAME.sky, color: GOLD, text: 'who helps you *carry it?*' },
]
const LINES2 = [{ t: T.l9, speaker: NAME.sky, color: READING.push, text: '*push* shows the bumps before you fly.' }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Everyone has baggage. | Find someone who | helps you *carry it.*', chip: '+1 CARRY-ON', accentColor: GOLD, dim: 0.55, size: 84, accentSize: 140 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, [a, b]) => t >= a && t < b
const bump = (t, t0, d) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
const swing = (t, t0, a = 0.5) => t < t0 ? 0 : a * Math.exp(-(t - t0) * 2.6) * Math.sin((t - t0) * 9)

// ── the stage (world coords; the camera maps (fx, fy) to screen (540, 1000) at scale s)
const BELT_Y = 1168, FLOOR = 1188                                 // belt plates top · where a bag's bottom sits
const POS = { vir: [155, 962, 170], sco: [382, 950, 204], tau: [600, 952, 204], can: [812, 962, 170], pis: [1010, 826, 166] }
const SEED = { vir: 11, sco: 7, tau: 5, can: 3, pis: 23, ari: 13 }
const COL = { vir: VIR, sco: SCO, tau: TAU, can: CAN, pis: PIS, ari: ARI }
const TRUNK_X = 492
const CASES = [{ w: 96, h: 124, color: '#ff8a7a', lit: '#ffc2b8', dark: '#c9574a', x: 110, num: 1 }, { w: 80, h: 104, color: '#f2c75c', lit: '#ffe6a0', dark: '#b8862a', x: 210, num: 2 }, { w: 64, h: 84, color: '#6fe0b0', lit: '#b9f4da', dark: '#3a9e78', x: 290, num: 3 }]
const PCASE = [922, 905]                                          // Pisces's suitcase (bottom centre, on the hatch ledge)

// camera keys: [t, s, fx, fy]; consecutive keys tween; a key 0.001 s after another = a hard cut
const CAM = [
  [0, 1, 540, 1000], [1.0, 1, 540, 1000], [4.3, 1.08, 520, 1000], [4.6, 1.06, 520, 1000], [5.15, 1.3, 470, 1012], [T.cut1 - 0.001, 1.3, 470, 1012],
  [T.cut1, 1.3, 800, 1012], [T.cut2 - 0.001, 1.32, 800, 1012],
  [T.cut2, 1.0, 540, 1010], [16.55, 1.0, 540, 1010], [17.25, 1.28, 270, 1015], [20.48, 1.28, 270, 1015],
  [20.62, 1.0, 560, 1000], [22.35, 1.0, 560, 1000], [22.85, 1.3, 950, 870], [25.55, 1.3, 950, 870],
  [26.15, 1.0, 540, 1000], [27.9, 1.0, 540, 1000], [28.6, 1.2, 490, 995], [30.6, 1.2, 490, 995], [31.6, 1.08, 500, 985], [35.0, 1.08, 500, 985],
  [35.6, 0.94, 540, 975], [38.4, 0.94, 540, 975], [40.4, 0.92, 560, 960],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}

// ── the belt: px travelled (runs from beltOn, jams at the crate)
const V = 150
function travel(t) {
  if (t < T.beltOn) return 0
  const run = Math.min(t, T.jam) - T.beltOn
  const after = t > T.jam ? Math.min(0.25, t - T.jam) * V * 0.4 : 0          // a lurch, then stuck
  return run * V + after
}

// ── where the bags are
function trunkState(t) {
  if (t < T.burst) return null
  let x = TRUNK_X, y = FLOOR, wob = 0
  if (t < T.slide[1]) { const p = prog(t, ...T.slide); x = lerp(HATCH.ox + HATCH.ow + 160, TRUNK_X, ease.outCubic(p)) }
  if (inW(t, T.strain)) wob = (Math.sin(t * 46) > 0 ? 1 : -1) * 0.35
  if (inW(t, T.strain2)) wob = (Math.sin(t * 46) > 0 ? 1 : -1) * 0.3
  if (t >= T.slip[0] && t < T.slip[0] + 0.25) y -= bump(t, T.slip[0], 0.25) * 6
  const lift = ease.inOutCubic(prog(t, ...T.lift)) * 120
  y -= lift
  if (t >= T.lift[1]) y += Math.sin((t - T.lift[1]) * 2.4) * 6
  const tk = coupleTakeoff(t); x += tk.dx; y += tk.dy
  return { x, y, wob: wob + tk.rot * 6 }
}
function coupleTakeoff(t) {
  const p = ease.inCubic(prog(t, ...T.takeoff))
  return { dx: p * 760, dy: -p * 900 + Math.sin(p * Math.PI) * -60, rot: p * 0.12 }
}
function toteState(t) {
  if (t < T.tote[0]) return null
  if (t < T.lunge[1]) { const p = prog(t, ...T.tote); return { x: lerp(HATCH.ox + HATCH.ow + 70, 965, ease.outCubic(p)), y: FLOOR, held: false } }
  return { held: true }
}
/** the duffel + Aries: laps along the belt, hurdling the trunk */
const HURDLE = [TRUNK_X - TRUNK.w / 2 - 50, TRUNK_X + TRUNK.w / 2 + 50]
const hurdleY = (x, h = 220) => x > HURDLE[0] && x < HURDLE[1] ? -Math.sin(Math.PI * (x - HURDLE[0]) / (HURDLE[1] - HURDLE[0])) * h : 0
function duffelState(t) {
  if (t < T.pop3 || t > T.again[1] + 0.05) return null
  if (t < T.laps[0][0]) { const k = pop01(t, T.pop3, 0.3, 2.4); return { x: lerp(1030, 880, ease.outCubic(prog(t, T.pop3, T.pop3 + 0.3))) + Math.sin(t * 70) * 3, y: FLOOR, k, blur: 0 } }
  for (let i = 0; i < T.laps.length; i++) {
    const [a, b] = T.laps[i]
    if (t >= a && t < b) { const x = lerp(i === 0 ? 880 : 1230, -170, prog(t, a, b)); return { x, y: FLOOR + hurdleY(x), k: 1, blur: 1 } }
    if (i + 1 < T.laps.length && t >= b && t < T.laps[i + 1][0]) return null
  }
  if (t < T.laps[2][1] + 0.08) return null
  if (t < T.again[0]) return { x: 70 + Math.sin(t * 60) * 3, y: FLOOR, k: 1, blur: 0 }                                    // trembling…
  { const p = prog(t, ...T.again); return { x: lerp(70, -260, ease.inQuad(p)), y: FLOOR, k: 1, blur: 1 } }                  // …and off again
}
function ariesState(t) {
  if (t < T.laps[0][0] + 0.1 || t > T.again[1] + 0.2) {
    if (inW(t, T.cameo)) { const x = lerp(1250, -200, prog(t, ...T.cameo)); return { x, y: 1118 + hurdleY(x, 240), size: 150, blur: 1, mood: 'squint' } }
    return null
  }
  for (let i = 0; i < T.laps.length; i++) {
    const [a, b] = T.laps[i], d = 0.13
    if (t >= a + d && t < b + d) { const x = lerp(i === 0 ? 1080 : 1250, -150, prog(t, a + d, b + d)); return { x, y: 1118 + hurdleY(x, 240), size: 150, blur: 1, mood: i === 2 ? 'squint' : 'wide' } }
  }
  if (t >= T.laps[2][1] + 0.13 && t < T.again[0] + 0.1) return { x: 175, y: 1118, size: 150, blur: 0, mood: 'sleepy', pant: true }
  if (t >= T.again[0] + 0.1) { const p = prog(t, T.again[0] + 0.1, T.again[1] + 0.2); return { x: lerp(175, -200, ease.inQuad(p)), y: 1118, size: 150, blur: 1, mood: 'eyeroll' } }
  return null
}
function caseState(i, t) {
  const t0 = T.cases[i]
  if (t < t0) return null
  const C = CASES[i]
  if (t >= T.caseLand) return { x: C.x, y: FLOOR }
  const p = prog(t, t0, T.caseLand), x = lerp(HATCH.ox + HATCH.ow + C.w / 2 + 10, C.x, ease.outCubic(p))
  return { x, y: FLOOR + hurdleY(x, 200) }
}
function crateState(t) {
  if (t < T.jam - 0.14) return null
  const p = prog(t, T.jam - 0.14, T.jam)
  const x = lerp(1240, 960, ease.inQuad(p)), sh = t > T.jam ? Math.exp(-(t - T.jam) * 7) * Math.sin((t - T.jam) * 50) * 6 : 0
  return { x: x + sh, y: FLOOR, rot: t > T.jam ? -0.045 : 0 }
}

// ── who feels what
const HOPS = {}
for (const id of ['sco', 'can', 'ari', 'vir', 'pis']) HOPS[id] = talkHops(LINES1, NAME[id], { cps: CPS })
function mood(id, t) {
  const st = (mood, look = [0, 0], o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0, dy: o.dy || 0, dx: o.dx || 0 })
  const toHatch = id === 'pis' ? [-1, 1] : [1, 0]
  // hook: waiting for the bags
  if (t < T.burst) {
    if ((id === 'sco' || id === 'tau') && inW(t, T.glance)) return st('happy', [id === 'sco' ? 1 : -1, 0], { sq: 0.04 })
    if (t >= T.rumble[0]) return st('wide', toHatch, { blink: false, dx: id === 'pis' ? 0 : 6 * prog(t, T.rumble[0], T.rumble[0] + 0.4) })
    if (id === 'pis') return st('sparkle', [-1, 1])
    return st(t < 1.0 ? 'neutral' : 'neutral', toHatch)
  }
  // the trunk lands: everyone hops back
  if (t < T.burst + 0.45) return st('wide', toHatch, { blink: false, sq: -0.12 * (1 - prog(t, T.burst, T.burst + 0.45)), dy: -14 * bump(t, T.burst, 0.45) })
  // ── heavy
  if (t < T.cut1) {
    if (id === 'sco') {
      if (t < T.grab[0]) return st('wide', [0, 1])
      if (t < T.slip[0]) return st('squint', [0, 1], { blink: false })
      if (t < T.slip[1]) return st('wide', [0, -1], { blink: false })
      if (t < T.l2 + 0.6) return st('neutral', [1, 0])
      return st('squint', [0, 0])                                                // defensive
    }
    if (id === 'tau') {
      if (t >= T.munch && t < T.munch + 0.5) return st('neutral', [-1, 0], { blink: 0.45 })
      if (t >= T.l2) return st('neutral', [-1, 0], { blink: 0.4 })               // the date, deadpan
      return st('wide', [-1, 1])
    }
    if (id === 'pis') return st('wide', [-1, 1])
    return st('wide', [id === 'vir' ? 1 : -1, 1])
  }
  // ── clingy (Cancer)
  if (t < T.cut2) {
    if (id === 'can') return st(t < T.back[0] ? 'wide' : 'heart', t < T.back[0] ? [1, 0] : [0, 0], { sq: t >= T.back[1] ? 0.06 + 0.04 * Math.sin(t * 6) : 0 })
    if (id === 'pis') return st('sparkle', [-1, 1])
    if (t >= T.flat) return st('neutral', [1, 0], { blink: 0.5 })
    return st('neutral', [1, 0])
  }
  // ── fast (Aries): the crowd's eyes track every pass
  if (t < T.cases[0]) {
    if (id === 'pis') return st('wide', [-1, 1])
    const a = ariesState(t), d = duffelState(t)
    const tx = d ? d.x : a ? a.x : null
    if (tx == null) return st('wide', [-1, 0])
    return st('wide', [tx > POS[id][0] + 60 ? 1 : tx < POS[id][0] - 60 ? -1 : 0, 1], { blink: false })
  }
  // ── colour-coded (Virgo)
  if (t < T.jam) {
    if (id === 'vir') return st(t < T.caseLand ? 'wide' : t < T.glint[0] ? 'happy' : 'sparkle', t < T.caseLand ? [1, 1] : [0, 0])
    if (id === 'pis') return st('neutral', [-1, 0])
    if (t >= T.l5 + 1.2) return st('neutral', [-1, 0], { blink: 0.5 })
    return st('neutral', [-1, 0])
  }
  // ── family: gasp, crickets, glance, look away (up)
  if (t < T.spot) {
    if (t < T.crickets) return st('wide', toHatch, { blink: false, sq: -0.1 * bump(t, T.gasp, 0.4), dy: -16 * bump(t, T.gasp, 0.4), dx: id === 'can' ? -40 * ease.outCubic(prog(t, T.gasp, T.gasp + 0.3)) : 0 })
    const dxC = id === 'can' ? -40 : 0
    if (inW(t, T.glanceL)) return st('neutral', [-1, 0], { blink: false, dx: dxC })
    if (inW(t, T.glanceR)) return st('neutral', [1, 0], { blink: false, dx: dxC })
    if (id === 'pis') return st('wide', [0, 0])
    return st('neutral', [id === 'vir' ? -1 : 1, -1], { blink: false, dx: dxC })
  }
  // ── leak: everyone spots Pisces
  if (t < T.cut3) {
    const dxC = id === 'can' ? -40 : 0
    if (id === 'pis') return st('sparkle', [0, 1], { sq: 0.04 * Math.sin(t * 40) })
    return st(t < T.spot + 0.6 ? 'wide' : 'neutral', [1, -1], { blink: t < T.spot + 0.6 ? false : 0.25, dx: dxC })
  }
  // ── the turn
  const dxC = id === 'can' ? -40 * (1 - prog(t, T.cut3, T.cut3 + 0.5)) : 0
  if (t < T.lesson) {
    if (inW(t, T.lookDown) && id !== 'sco' && id !== 'tau') return st('neutral', [0, 1], { blink: 0.3, dx: dxC })
    if (id === 'sco') {
      if (inW(t, T.lookDown)) return st('neutral', [1, 1], { blink: 0.3 })
      if (t < T.brace) return st('neutral', [0, 1])
      if (t < T.lift[0]) return st(t >= T.tauGrab[1] ? 'wide' : 'squint', t >= T.tauGrab[1] ? [1, 0] : [0, 1], { blink: false })
      return st('sparkle', [1, 0])
    }
    if (id === 'tau') {
      if (inW(t, T.lookDown)) return st('neutral', [-1, 1], { blink: 0.3 })
      if (t < T.gulp) return st('neutral', [-1, 1])
      if (t < T.lift[0]) return st('happy', [-1, 0])
      return st('wink', [-1, 0])
    }
    if (id === 'pis') return st(t >= T.aww ? 'sparkle' : 'neutral', [-1, 1])
    if (inW(t, T.cameo)) return st('neutral', [-1, 0], { blink: 0.5 })
    return st(t >= T.aww ? 'sparkle' : 'neutral', [id === 'vir' ? 1 : -1, 0], { dx: dxC })
  }
  if (t < T.board) return st(id === 'tau' ? 'happy' : 'sparkle', [0, 0])
  if (t < T.h9) return st(id === 'pis' ? 'sparkle' : 'neutral', [0, -1])
  if (id === 'sco' || id === 'tau') return st('happy', [1, -1])
  return st('happy', [1, -1])
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "800 56px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 38px 'Space Mono'", "700 30px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const head = (text, t0, land, acc, o = {}) => popText(root, text, { top: o.top ?? 160, size: o.size ?? 108, accentSize: o.accentSize ?? 150, at: t0, late: o.late ?? 1, lateAt: land, lateGap: 0.14, wobble: true, accentColor: acc, gap: 0.08 })
  const H = [
    [head('Everyone brings | *baggage.*', T.h0, T.h0Land, GOLD), T.h0Out],
    [head('Some bags | are *heavy.*', T.h1, T.h1Land, '#ff7d9a'), T.h1Out],
    [head('Some are | *clingy.*', T.h2, T.h2Land, '#8fdcff'), T.h2Out],
    [head('Some are | *fast.*', T.h3, T.h3Land, '#ff9a6a'), T.h3Out],
    [head('Some are | *colour-coded.*', T.h4, T.h4Land, '#ff8fb8'), T.h4Out],
    [head('And some are… | *family.*', T.h5, T.h5Land, '#ffb35c'), T.h5Out],
    [head('And some | *leak.*', T.h6, T.h6Land, '#b3acff'), T.h6Out],
    [head('The real | *question.*', T.h7, T.h7Land, GOLD), T.h7Out],
    [head('Check the | *board.*', T.h8, T.h8Land, READING.push), T.h8Out],
    [popText(root, 'Pack light. | *Travel* together.', { top: 160, size: 108, accentSize: 150, at: T.h9, gap: 0.12, wobble: true, accentColor: GOLD }), T.out],
  ]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1468, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1468, width: 960, height: 290, open: T.l9 - 0.25, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── a star (world coords, inside the camera transform)
  function star(id, t, px, py, size, o = {}) {
    const m = mood(id, t)
    const hops = [...(HOPS[id] || []), ...(o.hops || [])]
    return drawStarChar(x, px + m.dx, py + m.dy, size, t, { color: COL[id].color, glyph: size >= 120 ? COL[id].glyph : null, mood: o.mood || m.mood, look: o.look || m.look, blink: o.blink ?? m.blink, squash: m.sq + (o.sq || 0), hops, seed: SEED[id], pop: (o.pop ?? 1) * Math.max(0, popOut(t, [T.out[0] + 0.04 * (SEED[id] % 5), T.out[1]])), glow: 0.9, bob: o.bob ?? size * 0.03 })
  }
  const outAll = t => 1 - ease.inQuad(prog(t, ...T.out))

  function scorpio(t) {
    let [px, py, sz] = POS.sco, sq = 0, extra = []
    // the first try: dip to the handle, heave, slip, boing back
    if (t >= T.grab[0] && t < T.slip[1]) {
      if (t < T.grab[1]) py += 40 * ease.outCubic(prog(t, ...T.grab))
      else if (t < T.slip[0]) { py += 40 + Math.sin(t * 50) * 3; px += Math.sin(t * 43) * 3; sq = -0.18 - 0.06 * Math.sin(t * 22) }
      else { const p = prog(t, ...T.slip); py += lerp(40, 0, p) - Math.sin(p * Math.PI) * 190; px -= Math.sin(p * Math.PI) * 30; sq = p < 0.5 ? -0.15 : 0 }
    }
    if (t >= T.slip[1] && t < T.slip[1] + 0.4) sq = 0.2 * Math.exp(-(t - T.slip[1]) * 9) * Math.cos((t - T.slip[1]) * 30)
    // the turn: dip again, strain, then lift together
    if (t >= T.brace && t < T.lift[0]) { py += 40 * ease.outCubic(prog(t, T.brace, T.brace + 0.15)); if (inW(t, T.strain2)) { py += Math.sin(t * 50) * 3; sq = -0.16 - 0.05 * Math.sin(t * 22) } }
    if (t >= T.lift[0]) { py += 40 - ease.inOutCubic(prog(t, ...T.lift)) * 160 + (t >= T.lift[1] ? Math.sin((t - T.lift[1]) * 2.4) * 6 : 0) }
    const tk = coupleTakeoff(t); px += tk.dx; py += tk.dy
    extra.push(T.slip[1], T.lift[1])
    const r = star('sco', t, px, py, sz, { sq, hops: extra, bob: t >= T.grab[0] && t < T.slip[0] ? 0 : undefined, pop: outTk(t) })
    if ((inW(t, T.strain) || inW(t, T.strain2)) && Math.floor(t * 6) % 2 === 0) { drawSweat(x, r.x + 92, r.y - 70 - ((t * 120) % 30), 6); drawSweat(x, r.x - 90, r.y - 60 - ((t * 140) % 26), 5) }
    return r
  }
  const outTk = t => t < T.takeoff[0] ? 1 : 1 - prog(t, T.takeoff[1] - 0.25, T.takeoff[1])
  function taurus(t) {
    let [px, py, sz] = POS.tau
    if (t >= T.tauGrab[0] && t < T.lift[0]) py += 40 * ease.outCubic(prog(t, ...T.tauGrab))
    if (t >= T.lift[0]) py += 40 - ease.inOutCubic(prog(t, ...T.lift)) * 160 + (t >= T.lift[1] ? Math.sin((t - T.lift[1]) * 2.4 + 0.5) * 6 : 0)
    const tk = coupleTakeoff(t); px += tk.dx; py += tk.dy
    const r = star('tau', t, px, py, sz, { hops: [T.munch, T.gulp, T.lift[1] + 0.04], pop: outTk(t) })
    // the pretzel (at its left point): a bite at munch, gulped whole at the turn
    if (t < T.gulp + 0.05) {
      const mk = bump(t, T.munch, 0.5), gk = prog(t, T.gulp - 0.25, T.gulp)
      const hx = lerp(r.x - 100, r.x, Math.max(mk * 0.75, gk)), hy = lerp(r.y + 10, r.y - 6, Math.max(mk * 0.8, gk))
      if (gk < 1) drawPretzel(x, hx, hy, 6 * (1 - gk * 0.7), { bite: t >= T.munch + 0.25 })
      if (t >= T.munch + 0.2 && t < T.munch + 0.9) for (let k = 0; k < 4; k++) R(x, r.x - 20 + k * 12, r.y + 30 + (t - T.munch - 0.2) * (180 + k * 40), 6, 6, '#c98a3c')
    }
    return r
  }

  // ── the screen-space board
  const BOARD = [
    { at: T.flip0, header: 'ARRIVALS', rows: [{ label: 'DATE #3', status: 'ON TIME', sc: GREEN }] },
    { at: T.jam + 0.1, header: 'ARRIVALS', rows: [{ label: 'DATE #3', status: 'DELAYED', sc: RED, blink: true }] },
    { at: T.onTime, header: 'ARRIVALS', rows: [{ label: 'DATE #3', status: 'ON TIME', sc: GREEN }] },
    { at: T.board, header: 'DEPARTURES', tag: 'SCO · TAU', rows: [{ label: 'PUSH', status: 'TURBULENCE', lc: READING.push, sc: READING.push }, { label: 'PULL', status: 'STRONG', lc: READING.pull, sc: READING.pull }, { label: 'ALIGN', status: 'ON TIME', lc: READING.align, sc: READING.align }] },
    { at: T.date4, header: 'DEPARTURES', rows: [{ label: 'DATE #4', status: 'BOARDING', sc: GREEN, blink: true }] },
  ]
  function boardState(t) {
    let i = -1
    for (let k = 0; k < BOARD.length; k++) if (t >= BOARD[k].at) i = k
    if (i < 0) return { at: 0, header: 'ARRIVALS', rows: [], rowsK: 1 }
    const B = BOARD[i], P = BOARD[i - 1]
    const n0 = P ? P.rows.length : 1, n1 = B.rows.length
    const rowsK = lerp(n0, n1, ease.inOutCubic(prog(t, B.at, B.at + 0.35)))
    return { at: B.at, header: B.header, prevHeader: P ? P.header : null, tag: B.tag, rows: B.rows, prev: P ? P.rows : [], rowsK: Math.max(1, rowsK), hi: B.at === T.board && inW(t, T.push) ? 0 : -1 }
  }

  // drips from Pisces's suitcase: a drop every 0.45 s from 5.6 on (pure f(t)), falling to the belt
  function drips(t) {
    const t0 = 5.6, gap = 0.45, fall = 0.55
    const k1 = Math.floor((t - t0) / gap)
    for (let k = Math.max(0, k1 - 2); k <= k1; k++) {
      const born = t0 + k * gap, a = t - born
      if (a < 0 || a > fall) continue
      const dxp = ((k * 37) % 3 - 1) * 14
      drawDrop(x, PCASE[0] - 20 + dxp, PCASE[1] + 6 + a * a * 900 * 1.4, 6)
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), oa = outAll(t)
        // screen shake: trunk, crate
        let sh = 0
        for (const [t0, a] of [[T.slide[1], 12], [T.jam, 18], [T.burst, 6]]) { const k = t - t0; if (k >= 0 && k < 0.3) sh = Math.max(sh, a * (1 - k / 0.3)) }
        const shx = sh * Math.sin(t * 97), shy = sh * Math.cos(t * 83)
        x.save()
        x.translate(540 + shx, 1000 + shy); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        x.globalAlpha = oa
        // the hatch (behind everything on the stage)
        const red = t >= T.jam && t < T.onTime ? 1 : 0
        const rum = inW(t, T.rumble) ? Math.sin(t * 60) * 3 * prog(t, ...T.rumble) : 0
        drawModule(x, t, { red, beacon: t >= T.beltOn ? 1 : 0, crack: t >= T.jam ? 1 : 0, shake: rum })
        // Pisces on the ledge + its suitcase
        {
          const [px, py, sz] = POS.pis
          const bounce = -30 * (bump(t, T.burst, 0.35) + bump(t, T.jam, 0.4))
          const r = star('pis', t, px, py + bounce, sz, { hops: [T.spot + 0.1, T.aww] })
          const crying = t >= 9.9 && t < 12.5 || t >= T.spot
          if (crying && oa > 0.3) {
            const amt = t >= T.spot ? 1 : 0.6
            for (let k = 0; k < 4 * amt; k++) { const ph = ((t * 1.6 + k * 0.27) % 1); for (const s of [-1, 1]) drawTear(x, r.x + s * (26 + ph * 60), r.y + 4 + ph * ph * 120 - ph * 30, 5) }
          }
          drawCase(x, PCASE[0], PCASE[1] + bounce * 0.5, { w: 74, h: 80, color: '#7c74f0', lit: '#aaa4ff', dark: '#4e46b8', p: 4 })
          const tagSw = 0.06 * Math.sin(t * 1.7) + swing(t, T.jam, 0.4)
          const pk = pop01(t, T.spot + 0.15, 0.35, 2.4)
          if (pk > 0) drawTag(x, PCASE[0] - 40, PCASE[1] - 96 + bounce * 0.5, ['FEELINGS', '(liquids)'], { rot: 0.12 + tagSw, w: 170, size: 24, band: PIS.color, len: 10, scale: pk })
          drips(t)
        }
        // the waiting stars (behind the belt)
        const tote = toteState(t)
        {
          const [vx, vy, vs] = POS.vir
          const r = star('vir', t, vx, vy, vs, { hops: [T.caseLand, T.listUp] })
          if (t >= T.listUp) { const k = pop01(t, T.listUp, 0.35, 2.2); drawList(x, r.x + 92, r.y - 30, 4 * k * (1 + 0.15 * bump(t, T.glint[0], 0.5)), { glint: prog(t, ...T.glint) > 0 && t < T.glint[1] ? prog(t, ...T.glint) : -1, rot: 0.1 }) }
        }
        scorpio(t)
        taurus(t)
        {
          let [cx, cy, cs] = POS.can
          if (inW(t, T.lunge)) cx += 70 * ease.outCubic(prog(t, ...T.lunge))
          else if (t >= T.lunge[1] && t < T.back[1]) cx += 70 * (1 - ease.inOutCubic(prog(t, ...T.back)))
          const r = star('can', t, cx, cy, cs, { hops: [T.back[1]] })
          if (tote && tote.held) {
            const sq = t >= T.back[1] ? 0.5 + 0.5 * Math.sin(t * 6) : 0
            const tr = drawTote(x, r.x - 62, r.y + 150, { p: 5, squeeze: sq })
            drawTag(x, tr.L + 112, tr.Tp + 26, ["MY EX'S HOODIE", '(still)'], { rot: -0.3 + 0.05 * Math.sin(t * 1.9) + swing(t, T.back[0], 0.5), w: 214, size: 20, band: CAN.color, len: 18, alpha: 1 - prog(t, T.cut2 - 0.3, T.cut2) })
            if (t >= T.back[1]) for (let k = 0; k < 2; k++) { const ph = (t * 0.8 + k * 0.5) % 1; x.globalAlpha = oa * Math.sin(ph * Math.PI); drawPixelHeart(x, r.x + 60 + k * 30, r.y - 90 - ph * 90, 4, '#ff5c8e'); x.globalAlpha = oa }
          }
        }
        if (t >= T.heart && t < T.heart + 1.1) { const k = pop01(t, T.heart, 0.3, 2.6) * (1 - prog(t, T.heart + 0.8, T.heart + 1.1)); x.globalAlpha = oa * clamp(k); drawPixelHeart(x, 491, 880 - (t - T.heart) * 40, 7 * Math.max(0.01, k)); x.globalAlpha = oa }
        // the flaps (lifted while a bag pushes through)
        let flap = 0
        for (const [a, b] of [[T.burst - 0.05, T.slide[1]], [T.tote[0], T.tote[0] + 0.4], [T.pop3, T.pop3 + 0.3], [T.cases[0], T.cases[2] + 0.4], [T.jam - 0.15, 99]]) if (t >= a && t < b + 0.5) flap = Math.max(flap, t < b ? 1 : Math.exp(-(t - b) * 5))
        if (inW(t, T.rumble)) flap = Math.max(flap, 0.25 * Math.abs(Math.sin(t * 25)))
        drawFlaps(x, t, flap, rum)
        // the belt
        drawBelt(x, t, travel(t))
        // the puddle + WET FLOOR sign
        const pw = clamp((t - 6) / 14) * 120 + (t > T.spot ? 30 : 0)
        drawPuddle(x, PCASE[0] - 18, BELT_Y + 16, pw, 5, t)
        drawWetFloor(x, 1004, 1300, 5, pop01(t, T.sign, 0.35, 2.6))
        // bags (clipped at the hatch's back edge: they come out of it)
        x.save(); x.beginPath(); x.rect(-1000, -2000, HATCH.ox + HATCH.ow + 1000, 5000); x.clip()
        const tr = trunkState(t)
        if (tr) {
          const r = drawTrunk(x, tr.x, tr.y, { wob: tr.wob })
          if (t >= T.slide[1] && t < T.squeal[1]) { for (let k = 0; k < 5; k++) if (Math.floor(t * 30 + k) % 3 === 0) R(x, tr.x - 140 + k * 70 + ((t * 300) % 20), FLOOR - 4 - ((t * 200 + k * 13) % 26), 7, 7, k % 2 ? '#ffd23f' : '#ffffff') }
          drawDust(x, tr.x, FLOOR, prog(t, T.slide[1], T.slide[1] + 0.55), 200)
          const rot = 0.05 * Math.sin(t * 1.6) + swing(t, T.slide[1], 0.6) + swing(t, T.slip[0], 0.4) + swing(t, T.lift[0] + 0.2, 0.35)
          drawTag(x, r.tagAt[0], r.tagAt[1], ['TRUST', 'ISSUES'], { rot, w: 172, size: 31, band: SCO.color, len: 14 })
        }
        for (let i = 0; i < 3; i++) {
          const c = caseState(i, t); if (!c) continue
          const C0 = CASES[i]
          const cr = drawCase(x, c.x, c.y, { ...C0, p: 4 })
          if (i === 0) drawTag(x, cr.tagAt[0], cr.tagAt[1], ['CONTROL'], { rot: -0.18 + 0.04 * Math.sin(t * 1.8) + swing(t, T.caseLand, 0.4), w: 164, size: 26, band: VIR.color, len: 12 })
        }
        // Virgo's alignment guides
        if (inW(t, T.guides)) {
          const k = Math.min(prog(t, T.guides[0], T.guides[0] + 0.2), 1 - prog(t, T.guides[1] - 0.2, T.guides[1]))
          x.save(); x.globalAlpha = oa * k
          for (const gxp of [CASES[0].x - 48, CASES[0].x + 48, CASES[1].x - 40, CASES[1].x + 40, CASES[2].x - 32, CASES[2].x + 32]) for (let yy = 1020; yy < FLOOR + 10; yy += 14) R(x, gxp - 1, yy, 3, 8, '#ff5ca8')
          for (let xx = 40; xx < 340; xx += 14) R(x, xx, FLOOR + 4, 8, 3, '#ff5ca8')
          x.fillStyle = '#ff5ca8'; x.font = "700 20px 'Space Mono', monospace"; x.textAlign = 'center'
          x.fillText('12', (CASES[0].x + 48 + CASES[1].x - 40) / 2, 1012); x.fillText('12', (CASES[1].x + 40 + CASES[2].x - 32) / 2, 1012)
          x.restore()
        }
        const tt = toteState(t)
        if (tt && !tt.held) drawTote(x, tt.x, tt.y, { p: 5 })
        const d = duffelState(t)
        if (d) {
          if (d.blur) for (let k = 3; k >= 1; k--) { x.save(); x.globalAlpha = oa * 0.18 * (4 - k); drawDuffel(x, d.x + k * 46, d.y, { p: 4 }); x.restore() }
          const dr = drawDuffel(x, d.x, d.y, { p: 4 })
          if (d.blur) drawSpeed(x, d.x + 50, d.y - 30, 140, 50, 0.8)
          else drawTag(x, dr.tagAt[0], dr.tagAt[1], ["CAN'T SIT", 'STILL'], { rot: 0.3 * Math.sin(t * 30), w: 150, size: 22, band: ARI.color, len: 12 })
        }
        const cs = crateState(t)
        if (cs) { drawCrate(x, cs.x, cs.y, { rot: cs.rot }); drawDust(x, cs.x - 100, FLOOR, prog(t, T.jam, T.jam + 0.6), 220) }
        x.restore()
        // Aries (on the belt, in front)
        const a = ariesState(t)
        if (a) {
          if (a.blur) for (let k = 2; k >= 1; k--) { x.save(); x.globalAlpha = oa * 0.2 * (3 - k); drawStarChar(x, a.x + k * 60, a.y, a.size, t, { color: ARI.color, mood: a.mood, look: [-1, 0], seed: 13, glow: 0.5, bob: 0 }); x.restore() }
          const r = drawStarChar(x, a.x, a.y + (a.pant ? Math.sin(t * 16) * 4 : 0), a.size, t, { color: ARI.color, glyph: ARI.glyph, mood: a.mood, look: [-1, 0], blink: false, seed: 13, glow: 0.9, bob: 0, squash: a.pant ? 0.06 * Math.sin(t * 16) : -0.08 })
          if (a.blur) drawSpeed(x, a.x + 70, a.y - 10, 160, 90, 0.7)
          if (a.pant) { drawSweat(x, r.x + 70, r.y - 60 - ((t * 90) % 24), 5); drawDizzy(x, r.x, r.y - 90, t, 60) }
        }
        // sparkles at the lift
        sparkleRing(x, t, TRUNK_X, 900, T.lift[1] - 0.1, 14, 300, 0.3, 0.8, 34)
        // crickets during the stare
        if (inW(t, [T.crickets, T.away[1]])) { x.fillStyle = 'rgba(239,230,214,0.7)'; x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; if (Math.floor(t * 5) % 2 === 0) { x.fillText('cri', 280, 800); x.fillText('cket', 700, 780) } }
        // whistling notes while everyone looks away
        if (inW(t, T.away)) for (let k = 0; k < 3; k++) { const ph = prog(t, T.away[0] + k * 0.12, T.away[1]); x.globalAlpha = oa * Math.sin(ph * Math.PI); x.fillStyle = GOLD; x.font = "700 40px 'Space Mono', monospace"; x.fillText('♪', [190, 420, 650][k] + ph * 40, 850 - ph * 60); x.globalAlpha = oa }
        x.restore()
        // ── the board (screen space, a little parallax)
        const bs = boardState(t)
        x.save(); x.globalAlpha = oa
        const by = 452 - (C.fy - 1000) * 0.06, bxp = 100 - (C.fx - 540) * 0.05
        drawBoard(x, t, bxp, by, 880, bs)
        x.restore()
        if (t >= T.lift[1] - 0.1 && t < T.lift[1] + 0.8) { const C2 = cam(t); sparkleRing(x, t, 540 + (TRUNK_X - C2.fx) * C2.s, 1000 + (900 - C2.fy) * C2.s, T.lift[1] - 0.1, 16, 380, 0.7, 0.8) }
      }
      box1.update(t); box2.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of H) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (beat changes). The default selection keeps 13.2 (→ the duffel) and 25.6 (→ the turn).
export const CUTS = [T.cut1, T.cut2, 20.5, T.cut3, 35.05]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are written in the D-major palette (the engine moves them to F); chip / tom / snare cues
//    sit on a private 'sfx' bus and are written straight in F.
const F = { F3: 174.61, G3: 196, A3: 220, Bb3: 233.08, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, C6: 1046.5, D6: 1174.66, F6: 1396.91 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base) => [...wordPops(t0, n, 0.08, base), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const flaps = (t0, n = 14, g = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * 0.034 + (i % 3) * 0.006).toFixed(3), g * (0.7 + 0.3 * (i % 2))])
const buzzer = t => [['chip', t, F.F3, 0.32, { ...FX, wave: 'square', duty: 0.4, gain: 0.04, decay: 0.3, sustain: 0.9 }], ['chip', t + 0.38, F.F3, 0.32, { ...FX, wave: 'square', duty: 0.4, gain: 0.04, decay: 0.3, sustain: 0.9 }]]
const thud = (t, g = 1) => [['boom', t, 0.14 * g], ['tom', t, 70, { ...FX, gain: 0.3 * g, decay: 0.35 }], ['tick', t, 0.1 * g]]
const strain = (t0, t1) => [['chip', t0, F.C5, t1 - t0, { ...FX, wave: 'square', duty: 0.25, slide: 4, vib: 0.03, gain: 0.022, decay: 0.2, sustain: 0.8 }]]
const boing = t => [['chip', t, F.F4, 0.35, { ...FX, wave: 'tri', slide: 18, vib: 0.05, gain: 0.05, decay: 0.3, sustain: 0.6 }]]
const zoom = (t, len = 0.4) => [['whoosh', t + len * 0.5, len, 0.07], ['chip', t, F.C5, len, { ...FX, wave: 'square', duty: 0.3, slide: 14, gain: 0.018, decay: 0.2, sustain: 0.7 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const whistle = t => [F.C6, F.A5, F.F5, F.G5].map((f, i) => ['chip', +(t + i * 0.12).toFixed(3), f, 0.1, { ...FX, wave: 'tri', gain: 0.03, vib: 0.02, decay: 0.08, sustain: 0.7 }])
const alarm = (t0, n) => Array.from({ length: n }, (_, i) => ['chip', +(t0 + i * 0.22).toFixed(3), i % 2 ? F.A4 : F.F5, 0.18, { ...FX, wave: 'square', duty: 0.5, gain: 0.02, decay: 0.1, sustain: 0.8 }])
const drip = t => [['pop', t, 1567.98, 0.018, 0.5]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.045, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const PITCH = { [NAME.sco]: 760, [NAME.can]: 1040, [NAME.ari]: 1180, [NAME.vir]: 980, [NAME.pis]: 1320, [NAME.sky]: 880 }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · hook
  ...head(T.h0, 2, T.h0Land, 0), ...flaps(T.flip0), ...buzzer(T.beltOn),
  ['pop', T.heart, 1318.51, 0.03, 0], ['pluck', T.heart + 0.05, 1760, 0.02, 0.4, 0],
  ['riser', T.rumble[0], T.burst, 0.05], ...Array.from({ length: 6 }, (_, i) => ['tom', +(T.rumble[0] + 0.2 + i * 0.13).toFixed(3), 60, { ...FX, gain: 0.06 + i * 0.015, decay: 0.12 }]),
  // 2 · heavy
  ['whoosh', T.burst + 0.1, 0.35, 0.08], ...thud(T.slide[1], 1.2), ...head(T.h1, 2, T.h1Land, 2),
  ['chip', T.squeal[0], 2400, T.squeal[1] - T.squeal[0], { ...FX, wave: 'noise', gain: 0.012, decay: 0.3, sustain: 0.6 }],
  ['pop', T.grab[1], 523.25, 0.03, -0.2], ...strain(T.strain[0], T.strain[1]), ...boing(T.slip[0]), ['tick', T.slip[1], 0.06],
  ...[0, 0.12, 0.24].map(d => ['tick', +(T.munch + 0.25 + d).toFixed(3), 0.05]),
  ['pop', T.sign, 880, 0.025, 0.4],
  // 3 · clingy
  ['whoosh', T.tote[0] + 0.15, 0.3, 0.05], ...head(T.h2, 2, T.h2Land, 3), ['pop', T.lunge[1], 659.25, 0.035, 0.3],
  ['bell', T.back[1], 1318.51, 0.025, 1.4, 0.2], ...sob(10.0, F.C6, 2),
  // 4 · fast
  ...head(T.h3, 2, T.h3Land, 4), ['pop', T.pop3, 987.77, 0.03, 0.3],
  ...T.laps.flatMap(([a, b]) => zoom(a, b - a)), ['tick', T.rest[0], 0.06], ...zoom(T.again[0], 0.3),
  // 5 · colour-coded
  ...head(T.h4, 2, T.h4Land, 1), ...T.cases.map((c, i) => ['pop', +(c + 0.3).toFixed(3), NOTE[i * 2], 0.03, -0.3 + i * 0.3]),
  ...[0, 1, 2].map(i => ['pop', +(T.caseLand - 0.02 + i * 0.03).toFixed(3), 739.99, 0.02, 0]), ['bell', T.guides[0] + 0.05, 1760, 0.03, 1.2, 0],
  ['glitter', T.glint[0], T.glint[0] + 0.4], ['pluck', T.glint[0] + 0.15, 2349.3, 0.02, 0.5, 0.3],
  // 6 · family
  ['whoosh', T.jam - 0.1, 0.3, 0.09], ...thud(T.jam, 1.5), ['tapeStop', T.jam + 0.02, 0.9], ...alarm(T.jam + 0.1, 6),
  ['swell', T.gasp, T.gasp + 0.35, { bus: 'sfx', gain: 0.05, f0: 600, f1: 2400 }], ...head(T.h5, 3, T.h5Land, 0),
  ...crickets(T.crickets + 0.05), ...crickets(T.crickets + 0.35), ...crickets(T.crickets + 0.65),
  ['pop', T.glanceL[0], 440, 0.015, -0.4], ['pop', T.glanceR[0], 440, 0.015, 0.4], ...whistle(T.away[0]),
  // 7 · leak
  ...[0, 0.45, 0.9].map(d => drip(T.spot - 0.5 + d)).flat(), ['pop', T.spot + 0.05, 392, 0.03, 0.3],
  ...head(T.h6, 2, T.h6Land, 3), ...sob(T.spot + 0.3, F.C6), ...sob(T.l6 + 1.5, F.A5), ...sob(T.l6 + 2.2, F.C6, 2),
  // 8 · the turn
  ...head(T.h7, 2, T.h7Land, 2), ['whoosh', T.cameo[0] + 0.2, 0.4, 0.04],
  ...strain(T.strain2[0], T.strain2[1]), ['pop', T.gulp, 392, 0.035, 0.2], ['tick', T.gulp + 0.05, 0.05], ['pop', T.tauGrab[1], 523.25, 0.03, 0.2],
  ...[F.F5, F.A5, F.C6, F.F6].map((f, i) => ['chip', +(T.lift[0] + 0.1 + i * 0.09).toFixed(3), f, 0.12, { ...FX, wave: 'square', duty: 0.25, gain: 0.025, decay: 0.08, sustain: 0.6 }]),
  ['bell', T.lift[1], 1174.66, 0.035, 1.6, 0], ['glitter', T.lift[1] - 0.05, T.lift[1] + 0.6], ...cheers(T.aww, T.aww + 1.2), ...flaps(T.onTime, 7, 0.025),
  // 9 · lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: 'F' }),
  // 10 · tie-in
  ...flaps(T.board, 26, 0.03), ...head(T.h8, 2, T.h8Land, 1), ['bell', T.push[0] + 0.1, 880, 0.025, 1.2, -0.2],
  // 11 · last line
  ...flaps(T.date4, 12, 0.025), ...wordPops(T.h9, 4, 0.12, 2), ['pluck', T.h9 + 0.24, 1174.66, 0.04, 0.6, 0],
  ['riser', T.takeoff[0], T.takeoff[1], 0.04], ['whoosh', T.takeoff[1] - 0.3, 0.6, 0.06], ['glitter', T.out[0], T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
