// stpreviously — "Previously On… Your Love Life." (60 s vertical Align ad, Star Talk S3 #17, music: cinematic, Cm).
// Story 0–55.6, then the shared end card. The stars binge your love life on a velvet sofa under a big "screen" in the sky.
// Cast: ♊ GEMINI the prestige NARRATOR (monocle, vintage mic) · ♏ SCORPIO (keeps receipts) · ♑ CAPRICORN (can't watch)
// · ♓ PISCES (tissue box; faints) · THE STARS (all four at once).
//   0.00–4.3   Cold open. The brass hit (0.6): "PREVIOUSLY ON… | Your love *life.*" slams onto the dark screen; the sofa
//              row gasps in the dark (eyes pop, pixel shimmer). Pisces is already pulling a tissue.
//              NARRATOR: "Last time, on your love life…"
//   4.49–10.0  Drop. "Episode 1: | “u up?”" A phone on a moonlit nightstand-sky: three nights, three 'u up?' (2:14, 1:48,
//              3:02 AM), the moon waxing behind. Scorpio leans in, squinting harder each buzz.
//              NARRATOR: "Never once seen in daylight."  SCORPIO: "…vampire behavior." (a pixel bat crosses the moon)
//  10.04–15.6  "Episode 4: | The situationship." YOU and THEM orbit forever, a "?" between them; MONTH 1→8; they swing in
//              close… and boing apart. NARRATOR: "Eight months. No label. No plot."  Capricorn covers its eyes, peeks, re-covers.
//  15.6        card cut (flip).
//  15.6–21.1   "Episode 7: | A love triangle." A gold triangle draws itself: YOU → THEM → … THEIR PHONE (dun dun DUNNN,
//              spotlight). NARRATOR: "You. Them. And… their phone."  Pisces gasps and faints flat; the tissue box flies.
//  21.16–27.2  Breakdown. "The season | finale." A big pixel heart. NARRATOR: "Our hero swore off love. Forever." — the
//              heart cracks on "Forever", the camera pushes in on the narrator (one tear), "The End" fades up… the music
//              grinds to a halt. Whip to Scorpio, deadpan, holding a receipt (tally: six days): "Six days. I counted."
//  27.27       card cut (deal).
//  27.27–33.3  "Are you still | watching?" The show pauses: [YES] [NO]. Silence, crickets. THE STARS: "YES. OBVIOUSLY." —
//              all four leap and slam YES; the band kicks back in (lift 28.93). CAPRICORN: "Every great show has a rough
//              first season." "The End" gets a stamp: OF SEASON ONE.
//  33.38–36.6  Hit. "The fans have | spoken." RENEWED · FOR SEASON 2 stamps the screen; confetti, cheers, Pisces sobs.
//  36.71–41.4  ★ LESSON UNLOCKED: "Your past | is a season, | not the whole | series."  +1 CHARACTER ARC
//  41.71       card cut (flip).
//  41.71–51.0  "This season…" The music drops to a heartbeat. A veiled mystery card glides onto the screen (sign glowing,
//              face hidden). NARRATOR: "A stranger. A sign. No face."  "Card first. | Face last."  The sofa leans in and
//              squashes together. THE STARS: "WHO IS THAT?!" (the monocle pops off, Pisces faints again) — lift 48.93.
//  51.16–55.5  "Every main character | gets a new season." The card's gone; SEASON TWO · PREMIERES TONIGHT on the screen.
//              The monocle drops back in; the narrator turns to camera and winks. Pisces' feet stick up behind the sofa.
//  55.6        end card.
// One canvas (sky + screen + sofa cast), DOM type + dialogue boxes + the shared LESSON beat above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas, drawMoon } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { starFrame, inSprite, cellToWorld, MON, monocleCells, monocleWorld, pillowCells, tearsCells, tissueBoxCells, tissueWorld, drawSofa, drawVintageMic, drawHeart, drawBat, drawReceipt, confetti, drawPixels, dizzy } from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', RED = '#ff4d6d', MINT = '#7dffb0', CYAN = '#7fe0ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
const BEAT = n => 0.6 + n * BL                // 108 bpm grid
const GEM = signStar('gemini'), SCO_S = signStar('scorpio'), CAP_S = signStar('capricorn'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3],
  slam: BEAT(0), title2: BEAT(1), gasp: 0.84, tissue0: [2.45, 2.85],
  open1: 1.06, l1: 1.28, close1: 4.12,
  titleOut: [3.84, 4.16], bandOn: [3.96, 4.3],
  drop: BEAT(7),                                 // 4.489  Ep. 1
  h1: 4.5, h1Land: 4.86, h1Out: [9.8, 9.98],
  phoneIn: 4.42, nights: [4.72, 6.1, 7.2],
  open2: 4.82, l2: 5.04, l3: 7.86, l4: 10.36, close2: 14.05,
  bat: [7.95, 9.7],
  ep4: BEAT(17),                                 // 10.044 Ep. 4
  h2: 10.08, h2Land: 10.42, h2Out: [15.18, 15.38],
  orbitIn: 10.08, almost: [12.3, 13.15], peek: [12.95, 13.2], recover: [13.62, 13.82], uncover: [15.25, 15.5],
  cut1: BEAT(27),                                // 15.6   Ep. 7 (card cut)
  h3: 15.7, h3Land: 16.06, h3Out: [20.86, 21.06],
  open3: 15.74, l5: 15.96,
  fin: BEAT(37),                                 // 21.156 the finale (breakdown)
  h4: 21.2, h4Land: 21.55, h4Out: [26.7, 26.9],
  heartIn: 21.2, l6: 21.34, pisBack: [21.32, 21.8],
  push: [21.55, 23.75], theEnd: [22.9, 23.65], stop: 23.82,
  whip: [24.02, 24.24], l7: 24.25, turnLook: 24.5, receipt: [24.55, 25.1], zoomOut: [26.15, 26.8], close3: 26.84,
  cut2: BEAT(48),                                // 27.267 the turn (card cut)
  h5: 27.33, h5Land: 27.68, h5Out: [33.1, 33.28],
  prompt: 27.34, crick: [27.78, 28.16],
  open4: 28.3, l8: 28.5, pile: [28.5, 28.933], press: BEAT(51), land: [28.933, 29.4],   // 28.933 the lift
  l9: 30.8, close4: 34.2,
  renew: BEAT(59),                               // 33.378 the hit
  h6: 33.42, h6Land: 33.76, h6Out: [36.4, 36.58],
  lesson: BEAT(65), lessonOut: [41.15, 41.42],   // 36.711
  cut3: BEAT(74),                                // 41.711 this season (card cut)
  hush: 41.74, back: BEAT(77),                   // 43.378 the music creeps back in
  h7: 41.82, h7Land: 42.16, h7Out: [45.16, 45.34],
  cardIn: [42.3, 43.35], beat0: 42.02, beatGap: 0.86,
  open5: 43.02, l10: 43.24, lean: [43.8, 44.45],
  h8: 45.44, h8Land: 45.88, h8Out: [50.8, 51.0],
  l11: 47.45, monoPop: 47.58, faint2: [47.9, 48.3],
  lift2: BEAT(87),                               // 48.933
  close5: 50.5, cardOut: [50.95, 51.45],
  last: BEAT(91),                                // 51.156
  h9: 51.22, h9Land: 51.76, s2: 51.4, unlean: [51.25, 51.75], monoBack: [51.5, 51.92], face: 52.08, wink: 52.7,
  uup: 53.3, roll: [53.72, 54.5], swipe: [54.42, 54.8],
  out: [55.05, 55.5],
}

// ── the script
const NAR = '♊︎ NARRATOR', SCO = '♏︎ SCORPIO', CAP = '♑︎ CAPRICORN', STARS = 'THE STARS'
const NAR_C = '#ffd95a', SCO_C = '#ff8aa5', CAP_C = '#6fe8c2'
const L_A = [{ t: T.l1, speaker: NAR, color: NAR_C, text: 'Last time, on *your love life…*' }]
const L_B = [
  { t: T.l2, speaker: NAR, color: NAR_C, text: 'Never once seen in *daylight.*' },
  { t: T.l3, speaker: SCO, color: SCO_C, text: '…vampire *behavior.*' },
  { t: T.l4, speaker: NAR, color: NAR_C, text: 'Eight months. No label. *No plot.*' },
]
const L_C = [
  { t: T.l5, speaker: NAR, color: NAR_C, text: 'You. Them. And… their *phone.*' },
  { t: T.l6, speaker: NAR, color: NAR_C, text: 'Our hero swore off love. *Forever.*' },
  { t: T.l7, speaker: SCO, color: SCO_C, text: 'Six days. I *counted.*' },
]
const L_D = [
  { t: T.l8, speaker: STARS, color: GOLD, text: 'YES. *OBVIOUSLY.*' },
  { t: T.l9, speaker: CAP, color: CAP_C, text: 'Every great show has a rough *first season.*' },
]
const L_E = [
  { t: T.l10, speaker: NAR, color: NAR_C, text: 'A stranger. A sign. *No face.*' },
  { t: T.l11, speaker: STARS, color: GOLD, text: 'WHO IS *THAT?!*' },
]
const ALL = [...L_A, ...L_B, ...L_C, ...L_D, ...L_E]
const CPS = 28
const LT = lineTimes(ALL, { cps: CPS })
const lt = L => LT[ALL.indexOf(L)]
const ch = (L, i) => lt(L).chars[i]
const NOPLOT = ch(L_B[2], 24)                                   // "No plot." → Capricorn covers its eyes
const V_YOU = ch(L_C[0], 0), V_THEM = ch(L_C[0], 5), PH = ch(L_C[0], 22)   // "You." "Them." "phone"
const CRACK = ch(L_C[1], 25)                                    // "Forever."
const OFS = ch(L_D[1], 29)                                      // "first season."
const SIGN = ch(L_E[0], 14), FACE = ch(L_E[0], 20)              // "sign" "No face."
const COVER = [NOPLOT - 0.08, NOPLOT + 0.22]
const FAINT1 = [PH + 0.55, PH + 0.95]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Your past | is a season, | not the whole | *series.*', chip: '+1 CHARACTER ARC', accentColor: GOLD, dim: 0.6 }
const HEARTBEATS = Array.from({ length: 7 }, (_, i) => +(T.beat0 + i * T.beatGap).toFixed(3))   // 42.02 … 47.18

// hops
const STAR_HOPS = talkHops(ALL, STARS, { cps: CPS })
const CHEER = [T.renew + 0.05, T.renew + 0.5, T.renew + 0.95, T.renew + 1.4, T.renew + 1.85, T.renew + 2.3]
const HOPS = {
  gem: [0.5, ...talkHops(ALL, NAR, { cps: CPS }), ...STAR_HOPS, ...CHEER, T.face + 0.1],
  sco: [0.42, ...talkHops(ALL, SCO, { cps: CPS }), ...STAR_HOPS, ...CHEER.map(h => h + 0.12), T.turnLook],
  cap: [0.56, ...talkHops(ALL, CAP, { cps: CPS }), ...STAR_HOPS, ...CHEER.map(h => h + 0.2)],
  pis: [0.62, ...STAR_HOPS, ...CHEER.map(h => h + 0.07), T.pisBack[1]],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
/** speaking weight 0…1 for a speaker (ramps in before a line, out after it's typed) */
function talkW(t, who) {
  let w = 0
  ALL.forEach((L, i) => { if (L.speaker === who) w = Math.max(w, prog(t, L.t - 0.22, L.t) * (1 - prog(t, LT[i].done + 0.35, LT[i].done + 0.7))) })
  return ease.inOutQuad(w)
}

// ── geometry
const BAND = { x: 70, y: 470, w: 940, h: 700, r: 28 }            // the screen: 470–1170
const SOFA = { x0: 60, x1: 1020, backTop: 1212, seatTop: 1410, bottom: 1498, arm: 62, armTop: 1342 }
const SEAT = { sco: { x: 195, y: 1330 }, gem: { x: 422, y: 1324 }, cap: { x: 650, y: 1330 }, pis: { x: 880, y: 1330 } }
const LEAN = { sco: 290, gem: 455, cap: 622, pis: 790 }           // squashed together, leaning in at the card
const SZ = 210
const MIC = { x: 536, y: 1426, s: 0.8 }
const CARD_H = 610

// ═══════════════════════ the cast's states ═══════════════════════
function gemState(t) {
  const s = { mood: 'neutral', look: [0, -1], tears: 0 }
  const spk = talkW(t, NAR) > 0.5
  if (t < T.gasp) s.look = [0, -1]
  else if (t < T.gasp + 0.8) { s.mood = 'wide'; s.look = [0, 0] }
  else if (t < T.drop) { s.mood = spk ? 'sparkle' : 'neutral'; s.look = spk ? [0, 0] : [0, -1] }
  else if (t < T.l3) { s.mood = spk ? 'sparkle' : 'neutral'; s.look = spk ? [0, 0] : [0, -1] }
  else if (t < lt(L_B[1]).done + 0.6) { s.mood = 'happy' }
  else if (t < T.cut1) { s.mood = spk ? 'sparkle' : 'neutral'; s.look = spk ? [0, 0] : [0, -1] }
  else if (t < PH) { s.mood = 'sparkle'; s.look = [0, 0] }
  else if (t < FAINT1[0] + 0.5) { s.mood = 'wide'; s.look = [0, -1]; s.blink = false }
  else if (t < T.fin) { s.mood = 'wide'; s.look = [1, 0] }
  else if (t < T.l6) { s.look = [0, -1] }
  else if (t < CRACK) { s.mood = 'sparkle'; s.look = [0, 0]; s.tears = 1 }
  else if (t < T.stop) { s.mood = 'sleepy'; s.tears = 2 }
  else if (t < T.whip[0]) { s.mood = 'sparkle'; s.look = [0, 0]; s.tears = 2 }
  else if (t < T.cut2) { s.mood = 'squint'; s.look = [-1, 0] }
  else if (t < T.l8) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.l9) s.mood = 'happy'
  else if (t < T.renew) { s.mood = 'sparkle'; s.look = [1, 0] }
  else if (t < T.cut3) { s.mood = 'happy'; s.tears = t < T.lesson ? 1 : 0 }
  else if (t < T.l11) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.face) { s.mood = 'wide'; s.look = [0, -1]; s.blink = t < T.last ? false : undefined }
  else if (t < T.wink) { s.mood = 'neutral'; s.look = [0, 0] }
  else if (t < T.roll[0]) s.mood = 'wink'
  else if (t < T.roll[1]) s.mood = 'eyeroll'
  else if (t < T.uup + 0.1) s.mood = 'wink'
  else { s.mood = 'happy' }
  return s
}
function scoState(t) {
  const s = { mood: 'neutral', look: [0, -1], lean: 0 }
  if (t < T.gasp) s.look = [0, -1]
  else if (t < T.gasp + 0.8) { s.mood = 'wide'; s.look = [0, 0] }
  else if (t < T.drop) { s.mood = 'squint'; s.look = [0, -1] }
  else if (t < T.nights[1]) { s.look = [0, -1] }
  else if (t < T.l3) { s.mood = 'squint'; s.look = [0, -1]; s.lean = t < T.nights[2] ? 1 : 2 }
  else if (t < lt(L_B[1]).done + 0.7) { s.mood = 'squint'; s.look = [0, 0]; s.lean = 2 }
  else if (t < T.ep4) { s.mood = 'squint'; s.look = [0, -1]; s.lean = 2 * (1 - prog(t, 9.2, 9.7)) }
  else if (t < NOPLOT) s.look = [0, -1]
  else if (t < T.cut1) { s.look = t < NOPLOT + 1.2 ? [1, 0] : [0, -1] }
  else if (t < PH) s.look = [0, -1]
  else if (t < FAINT1[0] + 0.5) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.fin) { s.mood = 'wide'; s.look = [1, 0] }
  else if (t < CRACK + 0.2) s.look = [0, -1]
  else if (t < T.whip[0]) { s.mood = 'squint'; s.look = [1, 0] }
  else if (t < T.zoomOut[0] - 0.3) { s.mood = 'squint'; s.look = [0, 0]; s.blink = t < 25.6 ? false : undefined }
  else if (t < T.cut2) s.mood = 'happy'
  else if (t < T.l8) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.l9) s.mood = 'happy'
  else if (t < T.renew) { s.mood = 'sparkle'; s.look = [1, 0] }
  else if (t < T.cut3) s.mood = 'happy'
  else if (t < T.l11) { s.mood = 'squint'; s.look = [1, -1] }
  else if (t < T.last) { s.mood = 'wide'; s.look = [1, -1] }
  else if (t < T.uup + 0.15) s.mood = 'happy'
  else if (t < T.roll[0]) { s.mood = 'squint'; s.look = [1, -1] }
  else if (t < T.roll[1]) s.mood = 'eyeroll'
  else s.mood = 'happy'
  return s
}
function capState(t) {
  const s = { mood: 'neutral', look: [0, -1], cover: 0, peek: 0, tears: 0 }
  if (t < T.gasp) s.look = [0, -1]
  else if (t < T.gasp + 0.8) { s.mood = 'wide'; s.look = [0, 0] }
  else if (t < T.ep4) { s.look = t > T.l3 && t < lt(L_B[1]).done + 0.6 ? [-1, 0] : [0, -1] }
  else if (t < COVER[0]) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.cut1) {
    s.mood = 'squint'; s.look = [0, -1]
    s.cover = ease.outCubic(prog(t, ...COVER)) * (1 - ease.inOutCubic(prog(t, ...T.uncover)))
    s.peek = ease.inOutCubic(prog(t, ...T.peek)) * (1 - ease.inOutCubic(prog(t, ...T.recover)))
    if (s.peek > 0.3) { s.mood = 'wide'; s.look = [-1, -1] }
  }
  else if (t < PH) s.look = [0, -1]
  else if (t < FAINT1[0] + 0.5) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.fin) { s.mood = 'wide'; s.look = [1, 0] }
  else if (t < T.whip[0]) { s.look = [0, -1]; s.tears = t > CRACK ? 1 : 0 }
  else if (t < T.cut2) { s.mood = 'neutral'; s.look = [-1, 0] }
  else if (t < T.l8) { s.mood = 'wide'; s.look = [0, -1] }
  else if (t < T.l9) s.mood = 'happy'
  else if (t < lt(L_D[1]).done + 0.4) { s.mood = 'sparkle'; s.look = [0, 0] }
  else if (t < T.cut3) s.mood = 'happy'
  else if (t < T.last) { s.mood = 'wide'; s.look = [-1, -1] }
  else if (t < T.uup + 0.2) s.mood = 'happy'
  else if (t < T.roll[0]) { s.mood = 'neutral'; s.look = [1, -1] }
  else if (t < T.roll[1]) s.mood = 'eyeroll'
  else s.mood = 'happy'
  return s
}
function pisState(t) {
  const s = { mood: 'sparkle', look: [0, -1], tears: 1, tissue: 0.35, rot: 0, dy: 0, down: false, box: true }
  if (t < T.gasp) s.tears = 1
  else if (t < T.gasp + 0.8) { s.mood = 'wide'; s.look = [0, 0]; s.tears = 0 }
  else if (t < T.drop) { s.tears = 2; s.tissue = 0.35 + 0.65 * ease.outCubic(prog(t, ...T.tissue0)) }
  else if (t < T.ep4) { s.tears = 1; s.tissue = 1 }
  else if (t < T.cut1) { s.tears = 2; s.tissue = 1; s.mood = t > T.almost[0] && t < T.almost[1] ? 'heart' : 'sparkle' }
  else if (t < PH + 0.05) { s.tears = 1; s.tissue = 1 }
  else if (t < FAINT1[0]) { s.mood = 'wide'; s.look = [0, -1]; s.tears = 0; s.tissue = 1 }
  else if (t < T.pisBack[0]) {
    const p = ease.inCubic(prog(t, ...FAINT1))
    s.mood = 'shut'; s.rot = 1.75 * p; s.dy = 96 * p; s.down = true; s.box = false; s.tears = 0; s.ko = p
  }
  else if (t < T.pisBack[1]) {
    const p = easeOutBack(prog(t, ...T.pisBack), 1.8)
    s.rot = 1.75 * (1 - p); s.dy = 118 * (1 - p); s.down = true; s.tears = 3; s.tissue = 1
  }
  else if (t < T.cut2) { s.tears = t > CRACK ? 3 : 2; s.tissue = 1 }
  else if (t < T.l8) { s.mood = 'wide'; s.tears = 0; s.tissue = 1 }
  else if (t < T.renew) { s.mood = 'happy'; s.tears = 2; s.tissue = 1 }
  else if (t < T.cut3) { s.mood = 'happy'; s.tears = 3; s.tissue = 1 }
  else if (t < T.l11) { s.mood = 'wide'; s.tears = 0; s.tissue = 1 }
  else if (t < T.faint2[0]) { s.mood = 'wide'; s.look = [-1, -1]; s.tears = 1; s.tissue = 1 }
  else {
    const p = ease.inCubic(prog(t, ...T.faint2))
    s.mood = 'shut'; s.rot = Math.PI * p; s.dy = 62 * p; s.down = true; s.box = false; s.tears = 0; s.ko = p
    if (p >= 1) { const tw = Math.sin(t * 2.6) > 0.55 ? 1 : 0; s.rot += 0.07 * Math.sin(t * 22) * tw; s.dy -= 5 * tw }        // the feet twitch
  }
  return s
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "300 100px Inter", "600 30px Inter", "700 24px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "600 54px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const CARD = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-3.png' })

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0a = el('div', { position: 'absolute', left: '0px', top: '640px', width: W + 'px', textAlign: 'center', font: `600 50px ${SERIF}`, letterSpacing: '0.34em', paddingLeft: '0.34em', boxSizing: 'border-box',
    color: GOLD, textShadow: '0 0 26px rgba(242,199,92,0.5), 0 4px 18px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', display: 'none', transformOrigin: '50% 50%' }, root, 'PREVIOUSLY ON…')
  const H0b = popText(root, 'Your love *life.*', { top: 706, size: 128, accentSize: 188, at: T.title2 - 0.16, gap: 0.08, late: 1, lateAt: T.title2 + 0.1, wobble: true, accentColor: PINK })
  const HD = (text, at, land, o = {}) => popText(root, text, { top: 150, size: 100, accentSize: 148, at, late: 1, lateAt: land, wobble: true, fit: true, ...o })
  const HEADS = [
    [HD('Episode 1: | *“u up?”*', T.h1, T.h1Land, { accentColor: LAV, accentSize: 156 }), T.h1Out],
    [HD('Episode 4: | The *situationship.*', T.h2, T.h2Land, { accentColor: CYAN, accentSize: 130 }), T.h2Out],
    [HD('Episode 7: | A love *triangle.*', T.h3, T.h3Land, { accentColor: PINK }), T.h3Out],
    [HD('The season | *finale.*', T.h4, T.h4Land, { accentColor: '#ff6b81', accentSize: 160 }), T.h4Out],
    [HD('Even the TV | is *concerned.*', T.h5, T.h5Land, { accentColor: GOLD, accentSize: 156 }), T.h5Out],
    [HD('The fans have | *spoken.*', T.h6, T.h6Land, { accentColor: MINT, accentSize: 160 }), T.h6Out],
    [HD('This *season…*', T.h7, T.h7Land, { accentColor: LAV, size: 116, accentSize: 168, top: 190 }), T.h7Out],
    [HD('Card first. | Face *last.*', T.h8, T.h8Land, { accentColor: PINK, accentSize: 156 }), T.h8Out],
    [HD('Every main character | gets a *new season.*', T.h9, T.h9Land, { accentColor: GOLD, size: 84, accentSize: 124, late: 2, lateGap: 0.12 }), T.out],
  ]
  const BOX = { y: 1532, width: 960, height: 250, cps: CPS }
  const BOXES = [
    dialogueBox(root, { ...BOX, lines: L_A, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: L_B, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: L_C, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: L_D, open: T.open4, close: T.close4 }),
    dialogueBox(root, { ...BOX, lines: L_E, open: T.open5, close: T.close5 }),
  ]
  // ★ LESSON UNLOCKED (shared module): after the scene layers, before grain and the card cuts
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const txt = (s, X, Y, font, col, align = 'center', base = 'middle') => { x.font = font; x.textAlign = align; x.textBaseline = base; x.fillStyle = col; x.fillText(s, X, Y) }

  // ═══════════════════════ the screen ═══════════════════════
  function modeAt(t) {
    if (t < T.drop) return 'dark'
    if (t < T.ep4) return 'ep1'
    if (t < T.cut1) return 'ep4'
    if (t < T.fin) return 'ep7'
    if (t < T.cut2) return 'finale'
    if (t < T.renew) return 'prompt'
    if (t < T.cut3) return 'renewed'
    if (t < T.last) return 'trailer'
    return 's2'
  }
  const SPILL = { dark: '#000000', ep1: '#7f8cff', ep4: '#b9a6ff', ep7: '#ff8fb1', finale: '#ff5c7a', prompt: '#c9c4ff', renewed: '#ffd166', trailer: '#c27bff', s2: '#f2c75c' }
  const BUG = {
    ep1: ['◀◀ PREVIOUSLY ON', 'S1 · E1'], ep4: ['◀◀ PREVIOUSLY ON', 'S1 · E4'], ep7: ['◀◀ PREVIOUSLY ON', 'S1 · E7'], finale: ['■ SEASON FINALE', 'S1 · E8'],
    prompt: ['❚❚ PAUSED', 'S1 · E8'], renewed: ['★ RENEWED', 'S2'], trailer: ['▶ THIS SEASON', 'S2 · TRAILER'], s2: ['● TONIGHT', 'S2 · E1'],
  }
  function nightBg(t, top = '#0b0a2a', bot = '#1a0f33', seed = 31) {
    const g = x.createLinearGradient(0, BAND.y, 0, BAND.y + BAND.h); g.addColorStop(0, top); g.addColorStop(1, bot)
    x.fillStyle = g; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const r = rng(seed)
    for (let i = 0; i < 24; i++) {
      const sx = BAND.x + 30 + r() * (BAND.w - 60), sy = BAND.y + 30 + r() * (BAND.h - 60), sp = 1 + r() * 2, sz = 10 + r() * 10
      x.globalAlpha = 0.2 + 0.45 * (0.5 + 0.5 * Math.sin(t * sp + i))
      drawPixelStar(x, sx, sy, sz, i % 3, i % 4 ? BONE : LAV)
    }
    x.globalAlpha = 1
  }

  // ── Ep. 1: three nights, three "u up?"
  const NIGHTS = [['TUESDAY', '2:14', 'u up?', 'TUE 2:14 AM'], ['SATURDAY', '1:48', 'u up?', 'SAT 1:48 AM'], ['SUNDAY', '3:02', 'u up??', 'SUN 3:02 AM']]
  function clipEp1(t) {
    nightBg(t)
    let night = 0
    T.nights.forEach((n, i) => { if (t >= n) night = i })
    drawMoon(x, 892, 590, 44, [0.42, 0.5, 0.58][night], { alpha: 1, glow: 1.6, earthshine: 0.5, darkAlpha: 0.78 })
    const bp = prog(t, ...T.bat)
    if (bp > 0 && bp < 1) drawBat(x, lerp(1040, 560, bp), 612 - 70 * bp + Math.sin(bp * 16) * 14, 7, t)
    const k = pop01(t, T.phoneIn, 0.5, 1.5)
    let sh = 0
    for (const n of T.nights) { const d = t - n; if (d >= 0 && d < 0.42) sh += Math.sin(d * 95) * 8 * (1 - d / 0.42) }
    const w = 330, h = 610, r = 52
    x.save(); x.translate(540 + sh, lerp(1500, 836, k)); x.rotate(sh * 0.004 - 0.03)
    // buzz lines
    for (const n of T.nights) {
      const d = t - n
      if (d < 0 || d > 0.42) continue
      x.strokeStyle = rgba(BONE, 0.7 * (1 - d / 0.42)); x.lineWidth = 6; x.lineCap = 'round'
      for (const s of [-1, 1]) for (const yy of [-60, 0, 60]) { x.beginPath(); x.moveTo(s * (w / 2 + 22), yy - 18); x.lineTo(s * (w / 2 + 44), yy + 18 * s * 0); x.stroke() }
    }
    rr(-w / 2 - 9, -h / 2 - 9, w + 18, h + 18, r + 9); x.fillStyle = INK; x.fill()
    rr(-w / 2, -h / 2, w, h, r); x.fillStyle = '#3a2f66'; x.fill()
    rr(-w / 2 + 4, -h / 2 + 4, w - 8, 10, 6); x.fillStyle = 'rgba(255,255,255,0.18)'; x.fill()
    const sx = -w / 2 + 13, sy = -h / 2 + 13, sw = w - 26, shh = h - 26
    x.save(); rr(sx, sy, sw, shh, r - 12); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + shh); g.addColorStop(0, '#2a1f5e'); g.addColorStop(0.55, '#4a2a6e'); g.addColorStop(1, '#16102e')
    x.fillStyle = g; x.fillRect(sx, sy, sw, shh)
    x.fillStyle = '#140d28'; rr(-46, sy + 12, 92, 26, 13); x.fill()
    const N = NIGHTS[night]
    txt(N[0], 0, sy + 74, `700 20px ${MONO}`, rgba(BONE, 0.75))
    txt(N[1], 0, sy + 146, `300 104px ${INTER}`, BONE)
    // notifications: newest on top, older ones slide down
    for (let i = 0; i <= night; i++) {
      const arrive = T.nights[i], ka = easeOutBack(prog(t, arrive, arrive + 0.32), 1.6)
      const slot = night - i, prevSlot = Math.max(0, slot - 1)
      const nextShift = i < night ? ease.outCubic(prog(t, T.nights[night], T.nights[night] + 0.3)) : 1
      const sl = i < night ? lerp(prevSlot, slot, nextShift) : slot
      const ny = sy + 222 + sl * 98 - (1 - ka) * 60
      x.save(); x.globalAlpha = clamp(ka * 2)
      rr(-sw / 2 + 12, ny, sw - 24, 86, 20); x.fillStyle = 'rgba(255,255,255,0.17)'; x.fill()
      x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.14)'; x.stroke()
      rr(-sw / 2 + 24, ny + 14, 42, 42, 11); x.fillStyle = '#9b7bff'; x.fill()
      x.fillStyle = '#ffffff'; rr(-sw / 2 + 32, ny + 23, 26, 18, 7); x.fill(); x.beginPath(); x.moveTo(-sw / 2 + 36, ny + 39); x.lineTo(-sw / 2 + 34, ny + 47); x.lineTo(-sw / 2 + 43, ny + 40); x.fill()
      txt('J.', -sw / 2 + 80, ny + 25, `700 20px ${INTER}`, rgba(BONE, 0.7), 'left')
      txt(NIGHTS[i][3], sw / 2 - 22, ny + 26, `700 21px ${INTER}`, '#ffd9a0', 'right')
      txt(NIGHTS[i][2], -sw / 2 + 80, ny + 58, `700 32px ${INTER}`, '#ffffff', 'left')
      x.restore()
    }
    x.fillStyle = rgba(BONE, 0.7); rr(-60, sy + shh - 22, 120, 7, 4); x.fill()
    x.restore()
    x.restore()
  }

  // ── Ep. 4: the orbit that never touches
  function clipEp4(t) {
    nightBg(t, '#0e0b2e', '#1b0f36', 47)
    const k = pop01(t, T.orbitIn, 0.45, 2)
    const cx = 540, cy = 860
    const ap = prog(t, ...T.almost)
    const dip = ap <= 0 || ap >= 1 ? 0 : ap < 0.5 ? ease.inOutCubic(ap / 0.5) : 1 - easeOutBack((ap - 0.5) / 0.5, 3.4)
    const rx = 255 * (1 - 0.6 * dip) * k, ry = 112 * (1 - 0.6 * dip) * k
    // the orbit path
    x.save(); x.setLineDash([10, 14]); x.lineDashOffset = -t * 40; x.strokeStyle = rgba(LAV, 0.45 * k); x.lineWidth = 4
    x.beginPath(); x.ellipse(cx, cy, Math.max(1, rx), Math.max(1, ry), 0, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); x.restore()
    const a = (t - T.orbitIn) * 1.55 + 0.35
    const P = [[a, STAR.bone, 'YOU', 'heart', 3], [a + Math.PI, '#b9a6ff', 'THEM', 'sparkle', 9]].map(([an, col, lab, mood, seed]) => ({ an, col, lab, mood, seed, x: cx + Math.cos(an) * rx, y: cy + Math.sin(an) * ry, z: Math.sin(an) }))
    // "?" in the middle (drawn between the back star and the front star)
    const q = t >= NOPLOT ? '???' : '?'
    const qk = 1 + 0.25 * bump(t, ch(L_B[2], 14), 0.35) + 0.3 * bump(t, NOPLOT, 0.35) + 0.35 * dip
    P.sort((p1, p2) => p1.z - p2.z)
    P.forEach((p, i) => {
      if (i === 1) {
        x.save(); x.translate(cx, cy - 6 + Math.sin(t * 3) * 8); x.scale(qk * k, qk * k)
        x.font = `800 112px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText(q, 0, 0); x.fillStyle = GOLD; x.fillText(q, 0, 0)
        x.restore()
      }
      const other = P[1 - i], sz = 150 * (0.86 + 0.14 * p.z) * k
      drawStarChar(x, p.x, p.y, sz, t, { color: p.col, mood: p.mood, look: [Math.sign(other.x - p.x), 0], seed: p.seed, glow: 0.8, squash: 0.1 * dip, bob: 3 })
      txt(p.lab, p.x, p.y + sz * 0.6, `700 24px ${MONO}`, rgba(BONE, 0.85 * k))
    })
    if (dip > 0.6 && ap > 0.5) { x.save(); x.globalAlpha = clamp((ap - 0.5) * 6) * (1 - prog(ap, 0.7, 0.9)); txt('boing!', cx, cy - 120, `700 40px ${MONO}`, PINK); x.restore() }
    // the month counter (a little pixel calendar page)
    const m = Math.max(1, Math.min(8, 1 + Math.floor((t - T.l4 + 0.25) / 0.085)))
    const ck = pop01(t, T.orbitIn + 0.15, 0.35, 2.2)
    x.save(); x.translate(888, 600); x.scale(ck, ck); x.rotate(0.05)
    x.fillStyle = INK; x.fillRect(-64, -58, 128, 122); x.fillStyle = '#fbf6ec'; x.fillRect(-58, -52, 116, 110); x.fillStyle = '#e8344e'; x.fillRect(-58, -52, 116, 34)
    txt('MONTH', 0, -34, `700 22px ${MONO}`, '#ffffff'); txt(String(m), 0, 18, `800 64px ${INTER}`, INK)
    x.fillStyle = INK; x.fillRect(-36, -64, 10, 18); x.fillRect(26, -64, 10, 18)
    x.restore()
  }

  // ── Ep. 7: the love triangle
  function clipEp7(t) {
    nightBg(t, '#140a2c', '#24102e', 59)
    const V = { you: [300, 690], them: [780, 690], ph: [540, 1012] }
    const z = 1 + 0.1 * ease.outCubic(prog(t, PH, PH + 0.5))
    let shk = 0
    for (const d of [0, 0.22, 0.44]) shk += bump(t, PH + d, 0.12) * (d === 0.44 ? 9 : 5)
    x.save(); x.translate(540 + shk * Math.sin(t * 70), 1012); x.scale(z, z); x.translate(-540, -1012)
    // spotlight on the phone
    const sp = prog(t, PH, PH + 0.25)
    if (sp > 0) {
      x.save(); x.globalAlpha = 0.55 * sp; x.globalCompositeOperation = 'lighter'
      const g = x.createLinearGradient(0, BAND.y, 0, V.ph[1] + 80); g.addColorStop(0, 'rgba(255,240,200,0)'); g.addColorStop(1, 'rgba(255,240,200,0.5)')
      x.fillStyle = g; x.beginPath(); x.moveTo(V.ph[0] - 40, BAND.y); x.lineTo(V.ph[0] + 40, BAND.y); x.lineTo(V.ph[0] + 170, V.ph[1] + 90); x.lineTo(V.ph[0] - 170, V.ph[1] + 90); x.fill()
      x.restore()
    }
    // the lines
    const line = (A2, B2, p) => {
      if (p <= 0) return
      const ex = lerp(A2[0], B2[0], p), ey = lerp(A2[1], B2[1], p)
      x.save(); x.lineCap = 'round'
      x.globalCompositeOperation = 'lighter'; x.strokeStyle = rgba(GOLD, 0.3); x.lineWidth = 26; x.beginPath(); x.moveTo(A2[0], A2[1]); x.lineTo(ex, ey); x.stroke()
      x.globalCompositeOperation = 'source-over'; x.strokeStyle = '#ffe9a8'; x.lineWidth = 9; x.beginPath(); x.moveTo(A2[0], A2[1]); x.lineTo(ex, ey); x.stroke()
      x.restore()
    }
    line(V.you, V.them, ease.outCubic(prog(t, V_THEM, V_THEM + 0.3)))
    line(V.them, V.ph, ease.outCubic(prog(t, PH, PH + 0.25)))
    line(V.ph, V.you, ease.outCubic(prog(t, PH + 0.12, PH + 0.37)))
    // YOU and THEM
    const ky = pop01(t, V_YOU, 0.34, 2.4), kt = pop01(t, V_THEM, 0.34, 2.4), kp = pop01(t, PH, 0.34, 2.6)
    if (ky > 0.02) { drawStarChar(x, V.you[0], V.you[1], 140, t, { color: STAR.bone, mood: 'heart', seed: 3, pop: ky, glow: 0.8, bob: 4 }); txt('YOU', V.you[0], V.you[1] + 100, `700 26px ${MONO}`, rgba(BONE, 0.85 * clamp(ky))) }
    if (kt > 0.02) { drawStarChar(x, V.them[0], V.them[1], 140, t, { color: '#b9a6ff', mood: t > PH + 0.2 ? 'heart' : 'neutral', look: t > PH ? [-1, 1] : [0, 1], seed: 9, pop: kt, glow: 0.8, bob: 4 }); txt('THEM', V.them[0], V.them[1] + 100, `700 26px ${MONO}`, rgba(BONE, 0.85 * clamp(kt))) }
    if (kp > 0.02) {
      x.save(); x.translate(V.ph[0], V.ph[1]); x.scale(kp, kp); x.rotate(-0.06)
      const g = x.createRadialGradient(0, 0, 10, 0, 0, 150); g.addColorStop(0, 'rgba(140,230,255,0.5)'); g.addColorStop(1, 'rgba(140,230,255,0)'); x.fillStyle = g; x.fillRect(-150, -150, 300, 300)
      rr(-52, -92, 104, 184, 18); x.fillStyle = INK; x.fill()
      rr(-46, -86, 92, 172, 14); x.fillStyle = '#3a2f66'; x.fill()
      rr(-40, -78, 80, 154, 10); x.fillStyle = '#9be8ff'; x.fill()
      drawPixels(x, ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'], 0, -4, 7, { X: '#ff3d6e' })
      x.restore()
      txt('THEIR PHONE', V.ph[0], V.ph[1] + 128, `700 26px ${MONO}`, rgba(BONE, 0.9 * clamp(kp)))
    }
    x.restore()
  }

  // ── the finale: the heart, the crack, The End (+ the OF SEASON ONE edit)
  function clipFinale(t, frozen = null) {
    const tf = frozen ?? t
    const g = x.createLinearGradient(0, BAND.y, 0, BAND.y + BAND.h); g.addColorStop(0, '#1d0b22'); g.addColorStop(1, '#0b0614')
    x.fillStyle = g; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const rg = x.createRadialGradient(540, 770, 20, 540, 770, 380); rg.addColorStop(0, 'rgba(255,61,110,0.28)'); rg.addColorStop(1, 'rgba(255,61,110,0)'); x.fillStyle = rg; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const k = pop01(tf, T.heartIn, 0.4, 2)
    const crack = prog(tf, CRACK, CRACK + 0.18), split = ease.outCubic(prog(tf, CRACK + 0.32, CRACK + 1.1))
    const tremble = tf > CRACK - 0.9 && tf < CRACK ? Math.sin(tf * 60) * 3 : 0
    x.save(); x.translate(540 + tremble, 760); x.scale(k, k)
    drawHeart(x, 0, 0, 24, tf, crack, split, tf < CRACK ? 1 : 0)
    x.restore()
    // shards
    const sd = tf - CRACK
    if (sd > 0 && sd < 1.4) {
      const r = rng(5)
      for (let i = 0; i < 10; i++) {
        const vx = (r() - 0.5) * 420, vy = -200 - r() * 260, px = 540 + vx * sd, py = 740 + vy * sd + 900 * sd * sd
        x.globalAlpha = 1 - sd / 1.4; x.fillStyle = i % 2 ? '#ff3d6e' : '#c2185b'; x.fillRect(px, py, 14, 14)
      }
      x.globalAlpha = 1
    }
    // The End
    const e = ease.inOutQuad(prog(tf, ...T.theEnd))
    if (e > 0) {
      x.save(); x.globalAlpha = e
      x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 24
      txt('The End', 540, 1046, `italic 600 140px ${SERIF}`, BONE)
      x.shadowBlur = 0
      x.fillStyle = GOLD
      for (const s of [-1, 1]) { x.fillRect(540 + s * 250 - (s < 0 ? 90 : 0), 1056, 90, 3); x.save(); x.translate(540 + s * 262 + (s < 0 ? -100 : 100) * 0, 1057); x.restore() }
      for (const s of [-1, 1]) { x.save(); x.translate(540 + s * 360, 1057); x.rotate(Math.PI / 4); x.fillRect(-7, -7, 14, 14); x.restore() }
      x.restore()
    }
    // the edit: OF SEASON ONE stamped under The End
    const st = prog(t, OFS, OFS + 0.16)
    if (st > 0 && frozen == null) {
      const sc = lerp(1.9, 1, ease.inCubic(st))
      x.save(); x.globalAlpha = clamp(st * 3); x.translate(540, 1120); x.rotate(-0.05); x.scale(sc, sc)
      x.font = `700 40px ${MONO}`; const tw = x.measureText('OF SEASON ONE').width + 44
      x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-tw / 2, -30, tw, 60)
      x.strokeStyle = GOLD; x.lineWidth = 5; x.strokeRect(-tw / 2, -30, tw, 60)
      txt('OF SEASON ONE', 0, 2, `700 40px ${MONO}`, GOLD)
      x.restore()
    }
  }

  // ── the turn: paused, Are you still watching? [YES] [NO]
  const YES = { x: 410, y: 992, w: 210, h: 78 }, NO = { x: 670, y: 992, w: 210, h: 78 }
  function clipPrompt(t) {
    clipFinale(t, t < T.press ? CRACK + 3 : null)
    const pk = prog(t, T.prompt, T.prompt + 0.25) * (1 - prog(t, T.press + 0.25, T.press + 0.6))
    if (pk <= 0) return
    x.fillStyle = `rgba(4,2,12,${0.66 * pk})`; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    x.save(); x.globalAlpha = pk
    txt('YOUR LOVE LIFE · S1 E8', 540, 806, `700 26px ${MONO}`, rgba(BONE, 0.8))
    txt('Are you still watching?', 540, 878, `700 54px ${INTER}`, BONE)
    // progress bar
    x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(130, 1140, 820, 8); x.fillStyle = RED; x.fillRect(130, 1140, 790, 8); x.beginPath(); x.arc(920, 1144, 12, 0, Math.PI * 2); x.fill()
    const pr = t >= T.press ? 1 : 0, pressK = bump(t, T.press, 0.22)
    for (const [B2, label, on] of [[YES, '▶  YES', 1], [NO, 'NO', 0]]) {
      const sc = on ? 1 - 0.08 * pressK : 1
      x.save(); x.translate(B2.x, B2.y); x.scale(sc, sc)
      rr(-B2.w / 2, -B2.h / 2, B2.w, B2.h, 14)
      if (on) { x.fillStyle = pr ? GOLD : BONE; x.fill() } else { x.lineWidth = 4; x.strokeStyle = rgba(BONE, 0.75); x.stroke() }
      txt(label, 0, 2, `800 34px ${INTER}`, on ? INK : rgba(BONE, 0.85))
      x.restore()
    }
    if (pr) { const rp = prog(t, T.press, T.press + 0.45); x.strokeStyle = rgba(GOLD, 1 - rp); x.lineWidth = 8; rr(YES.x - YES.w / 2 - 30 * rp, YES.y - YES.h / 2 - 30 * rp, YES.w + 60 * rp, YES.h + 60 * rp, 14 + 20 * rp); x.stroke() }
    x.restore()
    // crickets
    for (const c of T.crick) {
      const k = t - c
      if (k < 0 || k > 0.75) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * k / 0.75) * 0.9
      txt('chirp.', c === T.crick[0] ? 250 : 840, 760 - k * 26, `700 32px ${MONO}`, '#9cf08a')
      x.restore()
    }
  }

  // ── RENEWED stamp over the finale frame
  function clipRenewed(t) {
    clipFinale(t)
    const p = prog(t, T.renew, T.renew + 0.16)
    if (p <= 0) return
    const sc = lerp(2.3, 1, ease.inCubic(p)) * (1 + 0.04 * bump(t, T.renew + 0.16, 0.2))
    x.save(); x.globalAlpha = clamp(p * 3); x.translate(540, 830); x.rotate(-0.11); x.scale(sc, sc)
    x.fillStyle = 'rgba(16,6,20,0.55)'; x.fillRect(-350, -128, 700, 256)
    x.strokeStyle = RED; x.lineWidth = 12; x.strokeRect(-340, -118, 680, 236); x.lineWidth = 4; x.strokeRect(-322, -100, 644, 200)
    txt('RENEWED', 0, -18, `700 112px ${MONO}`, RED)
    txt('FOR SEASON 2', 0, 64, `700 44px ${MONO}`, '#ffd2da')
    x.restore()
    const d = t - T.renew - 0.16
    if (d > 0 && d < 0.6) {
      const r = rng(8)
      x.save(); x.globalAlpha = 1 - d / 0.6; x.fillStyle = RED
      for (let i = 0; i < 16; i++) { const a = r() * Math.PI * 2, R = (330 + r() * 120) * (0.6 + d), s = 8 + r() * 10; x.fillRect(540 + Math.cos(a) * R * 1.1, 830 + Math.sin(a) * R * 0.5, s, s) }
      x.restore()
    }
  }

  // ── the trailer: the veiled mystery card
  function cardPose(t) {
    const p = prog(t, ...T.cardIn), e = easeOutBack(p, 1.5)
    let cx = lerp(1000, 540, e), cy = lerp(1080, 828, e), rot = lerp(0.42, -0.035, ease.outCubic(p)), sc = lerp(0.45, 1, e)
    cy += Math.sin(t * 1.7) * 6 * clamp(p * 2); rot += Math.sin(t * 1.3) * 0.008
    let hb = 0
    for (const b of HEARTBEATS) hb = Math.max(hb, bump(t, b, 0.18) + 0.6 * bump(t, b + 0.2, 0.16))
    sc *= 1 + 0.012 * hb
    if (t >= T.l11 && t < T.l11 + 0.6) { cx += Math.sin(t * 70) * 5 * (1 - (t - T.l11) / 0.6) }
    const o = 1 - prog(t, ...T.cardOut)
    cy -= 220 * ease.inCubic(prog(t, ...T.cardOut)); sc *= lerp(1, 0.7, ease.inCubic(prog(t, ...T.cardOut)))
    return { cx, cy, rot, sc, a: clamp(p * 4) * o, hb }
  }
  function clipTrailer(t) {
    x.fillStyle = '#05030b'; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const C = cardPose(t)
    // aura behind the card (breathes with the heartbeat)
    const ag = x.createRadialGradient(540, 828, 30, 540, 828, 470); ag.addColorStop(0, `rgba(194,123,255,${0.32 + 0.22 * C.hb})`); ag.addColorStop(0.5, `rgba(255,111,181,${0.12 + 0.1 * C.hb})`); ag.addColorStop(1, 'rgba(194,123,255,0)')
    x.fillStyle = ag; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    if (C.a <= 0 || !CARD) return
    const ch2 = CARD_H, cw = ch2 * CARD.width / CARD.height
    x.save(); x.globalAlpha = C.a; x.translate(C.cx, C.cy); x.rotate(C.rot); x.scale(C.sc, C.sc)
    x.drawImage(CARD, -cw / 2, -ch2 / 2, cw, ch2)
    // the veil shimmer over the aura window
    const vx0 = -cw / 2 + 0.142 * cw, vy0 = -ch2 / 2 + 0.15 * ch2, vw = 0.726 * cw, vh = 0.26 * ch2
    x.save(); rr(vx0, vy0, vw, vh, 14); x.clip()
    const s = ((t - T.cardIn[0]) * 0.7) % 1.3 - 0.15
    const vg = x.createLinearGradient(vx0 + vw * s - 80, vy0, vx0 + vw * s + 80, vy0 + vh); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, `rgba(255,255,255,${0.2 + 0.25 * bump(t, FACE, 0.6)})`); vg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = vg; x.fillRect(vx0, vy0, vw, vh)
    x.restore()
    // the sign coin pulses on "sign"
    const coin = [-cw / 2 + 0.8 * cw, -ch2 / 2 + 0.111 * ch2], sp = prog(t, SIGN, SIGN + 0.7)
    if (sp > 0 && sp < 1) { x.strokeStyle = rgba('#ffd2f0', 1 - sp); x.lineWidth = 6; x.beginPath(); x.arc(coin[0], coin[1], 30 + 70 * ease.outCubic(sp), 0, Math.PI * 2); x.stroke() }
    const glow = 0.35 + 0.65 * bump(t, SIGN, 0.8) + 0.3 * C.hb
    const cg = x.createRadialGradient(coin[0], coin[1], 4, coin[0], coin[1], 60); cg.addColorStop(0, `rgba(255,190,240,${0.6 * glow})`); cg.addColorStop(1, 'rgba(255,190,240,0)')
    x.globalCompositeOperation = 'lighter'; x.fillStyle = cg; x.fillRect(coin[0] - 60, coin[1] - 60, 120, 120); x.globalCompositeOperation = 'source-over'
    x.restore()
    // sparkle bursts: the arrival, and the lift
    sparkles(t, C.cx, C.cy, T.cardIn[1] - 0.15, 12, 330, 1)
    sparkles(t, C.cx, C.cy, T.lift2, 16, 380, 2)
  }

  // ── season two: the premiere card
  function clipS2(t) {
    x.fillStyle = '#0b0716'; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const k = prog(t, T.s2, T.s2 + 0.5)
    const g = x.createRadialGradient(540, 800, 20, 540, 800, 460); g.addColorStop(0, `rgba(242,199,92,${0.3 * k})`); g.addColorStop(1, 'rgba(242,199,92,0)'); x.fillStyle = g; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const r = rng(12)
    for (let i = 0; i < 18; i++) { const sx = 120 + r() * 840, sy = 520 + r() * 600, ph = r() * 6; x.globalAlpha = k * (0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * 3 + ph))); drawPixelStar(x, sx, sy, 14 + r() * 12, i % 3, i % 2 ? GOLD : BONE) }
    x.globalAlpha = 1
    const e = easeOutBack(prog(t, T.s2, T.s2 + 0.55), 1.6)
    if (e <= 0) return
    x.save(); x.translate(540, 800); x.scale(lerp(0.7, 1, e), lerp(0.7, 1, e)); x.globalAlpha = clamp(e * 2)
    x.font = `600 104px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const gg = x.createLinearGradient(-300, -60, 300, 60); gg.addColorStop(0, '#c98a1c'); gg.addColorStop(0.5, '#fff1c8'); gg.addColorStop(1, '#f2c75c')
    x.shadowColor = 'rgba(242,199,92,0.55)'; x.shadowBlur = 30
    x.fillStyle = gg; x.fillText('SEASON TWO', 0, 0)
    x.shadowBlur = 0
    x.fillStyle = GOLD; x.fillRect(-250, 64, 500, 3)
    txt('PREMIERES TONIGHT', 0, 108, `700 30px ${MONO}`, rgba(BONE, 0.9))
    x.restore()
    // the callback: "u up?" tries again — and gets swiped away
    const nk = easeOutBack(prog(t, T.uup, T.uup + 0.35), 1.7), sw = ease.inCubic(prog(t, ...T.swipe))
    if (nk > 0 && sw < 1) {
      let bz = 0; const d = t - T.uup; if (d > 0.3 && d < 0.75) bz = Math.sin(d * 90) * 6 * (1 - (d - 0.3) / 0.45)
      x.save(); x.translate(lerp(1250, 780, nk) + 520 * sw + bz, 600 - 40 * sw); x.rotate(0.03 + 0.5 * sw)
      rr(-190, -48, 380, 96, 24); x.fillStyle = 'rgba(38,28,72,0.95)'; x.fill(); x.lineWidth = 3; x.strokeStyle = rgba(BONE, 0.35); x.stroke()
      rr(-172, -30, 60, 60, 15); x.fillStyle = '#9b7bff'; x.fill()
      x.fillStyle = '#ffffff'; rr(-160, -16, 36, 24, 9); x.fill(); x.beginPath(); x.moveTo(-154, 6); x.lineTo(-157, 18); x.lineTo(-144, 7); x.fill()
      txt('J.', -96, -16, `700 22px ${INTER}`, rgba(BONE, 0.75), 'left'); txt('2:14 AM', 170, -16, `700 22px ${INTER}`, '#ffd9a0', 'right')
      txt('u up?', -96, 18, `800 36px ${INTER}`, '#ffffff', 'left')
      x.restore()
    }
    const s = prog(t, T.s2 + 0.5, T.s2 + 1.2)
    if (s > 0 && s < 1) { x.save(); rr(BAND.x, BAND.y, BAND.w, BAND.h, BAND.r); x.clip(); x.globalCompositeOperation = 'lighter'; const sx = lerp(100, 980, s), sg = x.createLinearGradient(sx - 90, 0, sx + 90, 0); sg.addColorStop(0, 'rgba(255,241,200,0)'); sg.addColorStop(0.5, 'rgba(255,241,200,0.35)'); sg.addColorStop(1, 'rgba(255,241,200,0)'); x.fillStyle = sg; x.fillRect(sx - 90, 700, 180, 220); x.restore() }
  }

  function drawScreen(t) {
    const mode = modeAt(t)
    const fk = clamp(prog(t, 0.15, 0.6)) * popOut(t, T.out)
    if (fk <= 0.01) return
    const shake = bump(t, T.renew + 0.16, 0.25) * 10 * Math.sin(t * 80)
    x.save()
    x.translate(540, 820); x.scale(lerp(0.9, 1, fk), lerp(0.9, 1, fk)); x.translate(-540 + shake, -820)
    // the glow spilling off the screen
    const on = prog(t, ...T.bandOn)
    x.save(); x.shadowColor = rgba(SPILL[mode], 0.45 * on); x.shadowBlur = 70
    rr(BAND.x, BAND.y, BAND.w, BAND.h, BAND.r); x.fillStyle = '#05030b'; x.fill(); x.restore()
    x.save(); rr(BAND.x, BAND.y, BAND.w, BAND.h, BAND.r); x.clip()
    if (mode === 'ep1') clipEp1(t)
    else if (mode === 'ep4') clipEp4(t)
    else if (mode === 'ep7') clipEp7(t)
    else if (mode === 'finale') clipFinale(t)
    else if (mode === 'prompt') clipPrompt(t)
    else if (mode === 'renewed') clipRenewed(t)
    else if (mode === 'trailer') clipTrailer(t)
    else if (mode === 's2') clipS2(t)
    // the screen goes dark under the lesson
    const lk = prog(t, T.lesson - 0.05, T.lesson + 0.3) * (t < T.cut3 ? 1 : 0)
    if (lk > 0) { x.fillStyle = `rgba(5,3,11,${0.96 * lk})`; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h) }
    // flashback grade for the recap episodes
    if (mode === 'ep1' || mode === 'ep4' || mode === 'ep7') {
      x.globalCompositeOperation = 'saturation'; x.fillStyle = 'rgba(128,128,128,0.3)'; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
      x.globalCompositeOperation = 'color'; x.fillStyle = 'rgba(214,170,120,0.12)'; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
      x.globalCompositeOperation = 'source-over'
    }
    // the switch-on (an opening line), the episode flashes
    if (on < 1) {
      const hh = BAND.h * ease.outCubic(on)
      x.fillStyle = '#05030b'; x.fillRect(BAND.x, BAND.y, BAND.w, (BAND.h - hh) / 2); x.fillRect(BAND.x, BAND.y + (BAND.h + hh) / 2, BAND.w, (BAND.h - hh) / 2)
      if (on > 0) { x.fillStyle = `rgba(255,255,255,${0.85 * (1 - on)})`; x.fillRect(BAND.x, BAND.y + BAND.h / 2 - hh / 2, BAND.w, Math.max(4, hh)) }
    }
    for (const f of [T.ep4, T.fin, T.last]) { const k = 1 - prog(t, f, f + 0.2); if (t >= f && k > 0) { x.fillStyle = `rgba(255,250,235,${0.55 * k})`; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h) } }
    // glass: scanlines, vignette, glare
    x.fillStyle = 'rgba(0,0,0,0.08)'
    for (let yy = BAND.y; yy < BAND.y + BAND.h; yy += 5) x.fillRect(BAND.x, yy, BAND.w, 2)
    const vg = x.createRadialGradient(540, 820, BAND.h * 0.35, 540, 820, BAND.w * 0.72); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.45)'); x.fillStyle = vg; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    const gl = x.createLinearGradient(BAND.x, BAND.y, BAND.x + BAND.w * 0.6, BAND.y + BAND.h * 0.6); gl.addColorStop(0, 'rgba(255,255,255,0.08)'); gl.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gl; x.fillRect(BAND.x, BAND.y, BAND.w, BAND.h)
    // bugs
    if (BUG[mode] && on >= 1) {
      x.font = `700 22px ${MONO}`; x.textBaseline = 'top'
      x.textAlign = 'left'; x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillText(BUG[mode][0], BAND.x + 31, BAND.y + 25); x.fillStyle = rgba(BONE, 0.85); x.fillText(BUG[mode][0], BAND.x + 28, BAND.y + 22)
      x.textAlign = 'right'; x.fillStyle = 'rgba(0,0,0,0.5)'; x.fillText(BUG[mode][1], BAND.x + BAND.w - 25, BAND.y + 25); x.fillStyle = rgba(GOLD, 0.9); x.fillText(BUG[mode][1], BAND.x + BAND.w - 28, BAND.y + 22)
    }
    x.restore()
    // frame
    rr(BAND.x, BAND.y, BAND.w, BAND.h, BAND.r); x.lineWidth = 5; x.strokeStyle = rgba(GOLD, 0.55); x.stroke()
    rr(BAND.x + 9, BAND.y + 9, BAND.w - 18, BAND.h - 18, BAND.r - 7); x.lineWidth = 1.5; x.strokeStyle = rgba(BONE, 0.22); x.stroke()
    for (const [cx, cy] of [[BAND.x, BAND.y], [BAND.x + BAND.w, BAND.y], [BAND.x, BAND.y + BAND.h], [BAND.x + BAND.w, BAND.y + BAND.h]]) { x.fillStyle = GOLD; x.fillRect(cx - 7, cy - 7, 14, 14); x.fillStyle = '#fff1c8'; x.fillRect(cx - 3, cy - 3, 6, 6) }
    x.restore()
  }

  // ═══════════════════════ the sofa + cast ═══════════════════════
  function couchCam(t) {
    const G2 = [SEAT.gem.x, SEAT.gem.y], S2 = [SEAT.sco.x, SEAT.sco.y], C = [540, 1306]
    if (t < T.push[0] || t >= T.zoomOut[1]) return null
    if (t < T.whip[0]) { const e = ease.inOutCubic(prog(t, ...T.push)); return { f: G2, c: [lerp(G2[0], C[0], e), lerp(G2[1], C[1], e)], s: 1 + 0.32 * e } }
    if (t < T.zoomOut[0]) { const e = ease.inOutCubic(prog(t, ...T.whip)); return { f: [lerp(G2[0], S2[0], e), lerp(G2[1], S2[1], e)], c: C, s: 1.32 } }
    const e = ease.inOutCubic(prog(t, ...T.zoomOut)); return { f: S2, c: [lerp(C[0], S2[0], e), lerp(C[1], S2[1], e)], s: lerp(1.32, 1, e) }
  }
  function castPos(who, t) {
    const P = { ...SEAT[who], rot: 0, sq: 0 }
    // lean in at the card (squashed together), and back
    const li = ease.inOutCubic(prog(t, ...T.lean)) * (1 - ease.inOutCubic(prog(t, ...T.unlean)))
    if (li > 0) { P.x = lerp(P.x, LEAN[who], easeOutBack(li, 1.4)); P.y -= 26 * li; P.sq += 0.08 * li }
    const lunge = bump(t, T.l11, 0.9) * (t < T.last ? 1 : 0)
    if (lunge > 0) { P.y -= 34 * lunge; P.sq += 0.1 * lunge; P.x += Math.sin(t * 60) * 3 * lunge }
    // the YES pile-on: everyone leaps at the button
    if (t >= T.pile[0] && t < T.land[1] + 0.3) {
      const order = { sco: 0, gem: 0.04, cap: 0.08, pis: 0.02 }[who]
      const up = ease.outCubic(prog(t, T.pile[0] + order, T.press)), dn = ease.inCubic(prog(t, T.press + 0.05, T.land[1]))
      const hgt = who === 'pis' ? 150 : 132
      P.y -= hgt * up * (1 - dn)
      if (t >= T.press - 0.06 && t < T.press + 0.12) P.sq -= 0.12
      const land = t - T.land[1]
      if (land > 0 && land < 0.3) P.sq += 0.18 * Math.exp(-land * 10) * Math.cos(land * 30)
    }
    return P
  }
  function drawCast(who, t) {
    const isG = who === 'gem', isS = who === 'sco', isC = who === 'cap', isP = who === 'pis'
    const st = isG ? gemState(t) : isS ? scoState(t) : isC ? capState(t) : pisState(t)
    const P = castPos(who, t)
    const sign = isG ? GEM : isS ? SCO_S : isC ? CAP_S : PIS
    let pk = pop01(t, { sco: 0.18, gem: 0.24, cap: 0.3, pis: 0.36 }[who], 0.36, 2.2) * popOut(t, T.out)
    if (pk <= 0.02) return null
    let dx = 0, dy = 0, sq = P.sq
    if (isS) { dy -= 16 * (st.lean || 0); sq -= 0.04 * (st.lean || 0) }
    if (isG) dx += 14 * talkW(t, NAR)
    if (isC && st.cover > 0.5 && t > T.recover[0] && t < T.recover[1] + 0.25) dx += Math.sin(t * 70) * 4
    let mood = st.mood, blink = st.blink
    if (mood === 'shut') { mood = 'neutral'; blink = 1 }
    const opts = { color: sign.color, glyph: sign.glyph, mood, look: st.look, blink, squash: sq, hops: HOPS[who], seed: { sco: 3, gem: 5, cap: 7, pis: 11 }[who], pop: pk, glow: t < T.bandOn[0] ? 0.45 : 0.85, zzz: false, bob: 4 }
    x.save()
    if (st.down) { x.beginPath(); x.rect(0, 0, W, SOFA.seatTop + 6); x.clip() }
    x.translate(P.x + dx, P.y + dy + (st.dy || 0))
    if (st.rot) x.rotate(st.rot)
    drawStarChar(x, 0, 0, SZ, t, opts)
    const F = starFrame(0, 0, SZ, t, opts)
    if (isG && !(t >= T.monoPop && t < T.monoBack[1])) inSprite(x, F, () => monocleCells(x, bump(t, T.wink + 0.02, 0.45)))
    if (isC && st.cover > 0) inSprite(x, F, () => pillowCells(x, st.cover, st.peek))
    if (st.tears) inSprite(x, F, () => tearsCells(x, t, st.tears))
    if (isP && st.box) inSprite(x, F, () => tissueBoxCells(x, st.tissue, 11, 25))
    x.restore()
    if (isP && st.ko > 0) dizzy(x, P.x + (st.rot > 2 ? 0 : 30), SOFA.seatTop - (st.rot > 2 ? 150 : 92), 62, t, clamp(st.ko * 3))
    return { F, x: P.x + dx, y: P.y + dy }
  }

  function flyingBits(t, gem) {
    // Pisces' tissue box takes off when it faints (and tissues flutter down)
    const fd = t - FAINT1[0]
    if (fd > 0 && fd < 1.6) {
      const bx0 = SEAT.pis.x, by0 = SEAT.pis.y + 70
      const bxp = bx0 + 260 * fd, byp = by0 - 760 * fd + 1500 * fd * fd
      x.save(); x.beginPath(); x.rect(0, 0, W, SOFA.seatTop + 6); x.clip()
      drawPixels(x, ['.LLLLLLLLLLLL.', 'LHHHHHDDHHHHHL', 'LPPPPPPPPPPPPL', 'LPPWPPPPPPWPPL', 'LPPPPPPPPPPPPL', '.LLLLLLLLLLLL.'], bxp, byp, 6, { L: '#7fd6ff', H: '#c9eeff', D: '#1d2a52', P: '#5ab8ef', W: '#e9f8ff' }, { rot: fd * 7, outline: INK })
      x.restore()
      for (let i = 0; i < 3; i++) {
        const td = fd - i * 0.08
        if (td < 0) continue
        const tx = bx0 - 40 + i * 50 + Math.sin(td * 5 + i) * 40, ty = by0 - 260 * td + 160 * td * td - i * 20
        tissueWorld(x, tx, ty, 6, Math.sin(td * 6 + i) * 0.6, clamp((1.6 - fd) * 2))
      }
    }
    // the monocle pops off at WHO IS THAT?! and drops back in for the wink
    if (gem && t >= T.monoPop && t < T.monoBack[1]) {
      const [ex, ey] = cellToWorld(gem.F, MON.x, MON.y)
      const wx = ex + gem.x, wy = ey + gem.y
      const cell = gem.F.cell
      if (t < T.monoBack[0]) {
        const d = t - T.monoPop
        const mx = wx - 260 * d, my = wy - 1300 * d + 1700 * d * d
        if (my < 2000) monocleWorld(x, mx, my, cell, d * 14)
      } else {
        const p = prog(t, ...T.monoBack), e = p < 0.75 ? ease.inQuad(p / 0.75) : 1 - 0.15 * Math.sin(Math.PI * (p - 0.75) / 0.25)
        monocleWorld(x, wx, lerp(wy - 900, wy, e), cell, (1 - p) * 3)
      }
    }
  }

  function receipt(t, sco) {
    if (!sco || t < T.receipt[0] || t > T.cut2) return
    const p = ease.outCubic(prog(t, ...T.receipt)), hh = 220 * p
    const k = pop01(t, T.receipt[0], 0.25, 2.4) * (1 - prog(t, T.zoomOut[1] - 0.2, T.cut2))
    if (k <= 0.02) return
    x.save(); x.translate(sco.x + 166, sco.y + 96); x.rotate(0.06); x.scale(k, k)
    x.save(); x.beginPath(); x.rect(-90, -240, 180, 246); x.clip()
    drawReceipt(x, -75, -hh, 150, 220, MONO)
    x.restore()
    x.restore()
  }

  function spotlight(t, cam) {
    if (!cam) return
    const s = Math.min(1, (cam.s - 1) / 0.32)
    if (s <= 0) return
    x.save(); x.beginPath(); x.rect(0, BAND.y + BAND.h + 12, W, H); x.clip()
    const g = x.createRadialGradient(540, 1306, 150, 540, 1306, 640); g.addColorStop(0, 'rgba(4,2,12,0)'); g.addColorStop(1, `rgba(4,2,12,${0.62 * s})`)
    x.fillStyle = g; x.fillRect(0, BAND.y + BAND.h, W, H)
    x.restore()
  }

  function drawCouch(t) {
    const k = popOut(t, T.out) * pop01(t, 0.1, 0.4, 1.6)
    if (k <= 0.02) return
    // the screen's light on the sofa
    const mode = modeAt(t), on = prog(t, ...T.bandOn)
    if (on > 0 && mode !== 'dark') {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.17 * on * (0.92 + 0.08 * Math.sin(t * 13))
      const g = x.createLinearGradient(0, BAND.y + BAND.h, 0, SOFA.bottom); g.addColorStop(0, SPILL[mode]); g.addColorStop(1, 'rgba(0,0,0,0)')
      x.fillStyle = g; x.fillRect(BAND.x - 40, BAND.y + BAND.h, BAND.w + 80, SOFA.bottom - BAND.y - BAND.h); x.restore()
    }
    const cam = couchCam(t)
    x.save()
    x.translate(540, SOFA.bottom); x.scale(lerp(0.85, 1, k), lerp(0.85, 1, k)); x.translate(-540, -SOFA.bottom)
    if (cam) { x.translate(cam.c[0], cam.c[1]); x.scale(cam.s, cam.s); x.translate(-cam.f[0], -cam.f[1]) }
    drawSofa(x, SOFA, 'back')
    const sco = drawCast('sco', t), pis = drawCast('pis', t), cap = drawCast('cap', t), gem = drawCast('gem', t)
    drawSofa(x, SOFA, 'front')
    drawVintageMic(x, MIC.x, MIC.y, MIC.s, -0.1 * talkW(t, NAR))
    receipt(t, sco)
    flyingBits(t, gem)
    void pis; void cap
    // gasp shimmer (the cold open)
    for (const who of ['sco', 'gem', 'cap', 'pis']) sparkles(t, SEAT[who].x, SEAT[who].y - 10, T.gasp + 0.03 * ['sco', 'gem', 'cap', 'pis'].indexOf(who), 8, 140, 1)
    x.restore()
    // the dark room before the screen comes on
    const dark = 0.5 * (1 - prog(t, T.bandOn[0], T.bandOn[1] + 0.2))
    if (dark > 0) { x.fillStyle = `rgba(3,2,8,${dark})`; x.fillRect(0, BAND.y + BAND.h + 10, W, H) }
    spotlight(t, cam)
    confetti(x, t, T.renew + 0.08, { x0: 540, y0: 1330, n: 90, seed: 3 })
  }

  function sparkles(t, cx, cy, t0, n, R, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawScreen(t)
        drawCouch(t)
        // the brass hit: a flash
        const fl = 1 - prog(t, T.slam, T.slam + 0.3)
        if (t >= T.slam && fl > 0) { x.fillStyle = `rgba(255,246,226,${0.32 * fl})`; x.fillRect(0, 0, W, H) }
      }
      // cold-open title
      const tp = prog(t, T.slam, T.slam + 0.22), to = outK(t, T.titleOut)
      const showA = t >= T.slam && to > 0
      H0a.style.display = showA ? 'block' : 'none'
      if (showA) {
        H0a.style.opacity = String(clamp(tp * 3) * to)
        H0a.style.letterSpacing = lerp(0.62, 0.34, ease.outCubic(tp)).toFixed(3) + 'em'
        H0a.style.transform = `scale(${(lerp(1.35, 1, ease.outCubic(tp)) * lerp(0.94, 1, to)).toFixed(4)})`
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

// card-motif candidates at every beat change; the default selection keeps 15.6 (→ Ep. 7), 27.27 (→ the turn) and
// 41.71 (→ this season). End card flips at 55.6.
export const CUTS = [10.0, { t: T.cut1, kind: 'flip' }, 21.1, { t: T.cut2, kind: 'deal' }, 33.3, { t: T.cut3, kind: 'flip', dir: -1 }, 51.1]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
// for checks in node
export const DEBUG = { T, ALL, LT, LESSON, CUTS }

// ── sound (pop / pluck / bell are shifted into the key by the engine; brass / chip / lead are written in C minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { rev: 0.2, dly: 0, bus: 'fx' }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.045, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
/** real silence: a tape stop at t0, then chained stops over its own silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L }
  return out
}
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.02, pan])
const buzz = t => Array.from({ length: 9 }, (_, i) => ['pop', +(t + i * 0.034).toFixed(3), 150, 0.05, 0])
const brassHit = (t, fs, len, gain = 0.06) => ['brass', +t.toFixed(3), fs, len, { gain, bright: 1.15, rev: 0.4 }]
const womp = t0 => [[311.13, 0, 0.26], [293.66, 0.3, 0.26], [277.18, 0.6, 0.26], [261.63, 0.9, 0.9]].map(([f, d, len]) => ['lead', +(t0 + d).toFixed(3), f, len, { wave: 'saw', gain: 0.045, cutoff: 1300, env: 500, envDecay: 4, vib: d > 0.8 ? 0.018 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, ...FX }])
const boing = t0 => [['chip', t0, 220, 0.38, { wave: 'tri', slide: 10, vib: 0.09, gain: 0.03, decay: 0.3, sustain: 0.6, ...FX }]]
const claps = (t0, t1, seed) => { const r = rng(seed), out = []; for (let t = t0; t < t1; t += 0.04 + r() * 0.05) { const p = (t - t0) / (t1 - t0); out.push(['clap', +t.toFixed(3), { gain: (0.1 + r() * 0.06) * (1 - p * 0.85), pan: r() * 1.4 - 0.7, rev: 0.25, bus: 'fx' }]) } return out }
const heartbeat = t => [['pop', t, 62, 0.2, 0], ['pop', t, 124, 0.06, 0], ['pop', +(t + 0.2).toFixed(3), 58, 0.14, 0], ['pop', +(t + 0.2).toFixed(3), 116, 0.04, 0]]
const Gm = [98, 146.83, 196, 293.66], Cmin = [65.41, 130.81, 196, 261.63, 311.13]
export const CUES = [
  // 0 · cold open: projector clatter, the brass hit, the gasp
  ...Array.from({ length: 7 }, (_, i) => ['tick', +(0.08 + i * 0.05).toFixed(3), 0.018]),
  ['whoosh', 0.42, 0.22, 0.05], brassHit(T.slam, Cmin, 2.2, 0.075), ['boom', T.slam, 0.32],
  ...[0, 1, 2, 3].map(i => ['pop', +(T.gasp + i * 0.03).toFixed(3), NOTE[(i * 2) % 7], 0.03, (i - 1.5) * 0.25]), ['glitter', T.gasp, T.gasp + 0.5],
  ...wordPops(T.title2 - 0.16, 2, 0.08, 1), ['pop', T.title2 + 0.1, 1174.66, 0.05, 0], ['pluck', T.title2 + 0.1, 1174.66, 0.045, 0.7, 0],
  ['pop', T.open1, 659.25, 0.035, 0], ['pop', T.open1 + 0.06, 880, 0.025, 0],
  ...talkCues(ALL, { cps: CPS, pitch: { [NAR]: 880, [SCO]: 700, [CAP]: 620, [STARS]: 990 } }),
  ['tick', T.tissue0[0], 0.04], ['whoosh', T.tissue0[0], 0.18, 0.02],
  ['pop', T.close1, 880, 0.025, 0], ['pop', T.close1 + 0.07, 587.33, 0.025, 0],
  ['tick', T.bandOn[0], 0.06], ['pluck', T.bandOn[0] + 0.02, 1760, 0.025, 0.4, 0], ['whoosh', T.titleOut[0], 0.3, 0.03],
  // 1 · Ep. 1 (the drop)
  ...head(T.h1, 2, T.h1Land, 0),
  ['whoosh', T.phoneIn, 0.35, 0.04],
  ...T.nights.flatMap((n, i) => [...buzz(n), ['pop', +(n + 0.3).toFixed(3), [1318.51, 1174.66, 1567.98][i], 0.032, 0.25]]),
  ['pop', T.open2, 659.25, 0.03, 0],
  ['tick', T.nights[1] + 0.05, 0.03], ['tick', T.nights[2] + 0.05, 0.035],
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.bat[0] + 0.1 + i * 0.1).toFixed(3), 0.014]), ['pop', T.bat[0] + 0.5, 2700, 0.018, 0.4],
  // 2 · Ep. 4
  ['whoosh', T.ep4 - 0.12, 0.3, 0.05], ...head(T.h2, 2, T.h2Land, 2),
  ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.l4 - 0.25 + 0.085 * (i + 1)).toFixed(3), 0.022]),
  ['whoosh', T.orbitIn + 0.5, 1.2, 0.018], ['whoosh', T.orbitIn + 2.5, 1.2, 0.018],
  ['pluck', COVER[0], 196, 0.05, 0.35, 0.2], ['tick', COVER[0] + 0.1, 0.04],
  ['whoosh', T.almost[0] + 0.1, 0.35, 0.03], ...boing(T.almost[0] + 0.43),
  ['tick', T.peek[0], 0.03], ['pop', T.recover[0], 300, 0.035, 0.2],
  ['pop', T.close2, 880, 0.025, 0], ['pop', T.close2 + 0.07, 587.33, 0.025, 0],
  // 3 · Ep. 7 (after the card cut)
  ...head(T.h3, 2, T.h3Land, 4),
  ['pop', T.open3, 659.25, 0.03, 0],
  ['pop', V_YOU, 784, 0.04, -0.35], ['pop', V_THEM, 988, 0.04, 0.35], ['pluck', V_THEM + 0.1, 1318.51, 0.03, 0.4, 0],
  brassHit(PH, Gm, 0.15, 0.06), brassHit(PH + 0.22, Gm, 0.15, 0.06), brassHit(PH + 0.44, Cmin, 1.3, 0.075), ['boom', PH + 0.44, 0.16],
  ['pop', PH + 0.1, 1500, 0.025, 0.4],
  ['whoosh', FAINT1[0], 0.4, 0.05], ['boom', FAINT1[1], 0.13], ['tick', FAINT1[1], 0.06], ...womp(FAINT1[1] + 0.15),
  ...[0, 1, 2].map(i => ['tick', +(FAINT1[0] + 0.2 + i * 0.12).toFixed(3), 0.02]),
  // 4 · the finale (breakdown)
  ...head(T.h4, 2, T.h4Land, 1),
  ['pop', T.heartIn + 0.05, 440, 0.04, 0],
  ['chip', CRACK, 2600, 0.12, { wave: 'noise', slide: -40, gain: 0.05, decay: 0.06, sustain: 0.4, ...FX }], ['tick', CRACK, 0.12], ['boom', CRACK + 0.02, 0.1],
  ['whoosh', CRACK + 0.32, 0.5, 0.03],
  ...[2349.32, 1975.53, 1760, 1479.98, 1318.51, 1174.66, 987.77, 880, 739.99, 659.25, 587.33].map((f, i) => ['pluck', +(T.theEnd[0] + i * 0.045).toFixed(3), f, 0.022, 0.9, (i % 2 ? 0.2 : -0.2)]),
  ...silence(T.stop, 0.5, T.press),
  ['whoosh', T.stop, 0.12, 0.05], ['tick', T.stop + 0.08, 0.08],
  ['whoosh', T.whip[0], 0.2, 0.06],
  ['tick', T.turnLook, 0.035], ['tick', T.turnLook + 0.025, 0.03],
  ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.receipt[0] + i * 0.055).toFixed(3), 0.022]),
  ['pop', T.close3, 880, 0.025, 0],
  ['whoosh', T.zoomOut[0], 0.5, 0.025],
  // 5 · the turn: Are you still watching?
  ...head(T.h5, 3, T.h5Land, 3),
  ['pop', T.prompt + 0.05, 659.25, 0.04, 0], ['pop', T.prompt + 0.12, 987.77, 0.03, 0],
  ...cricket(T.crick[0], -0.5), ...cricket(T.crick[1], 0.5),
  ['pop', T.open4, 659.25, 0.03, 0],
  ['whoosh', T.pile[0], 0.4, 0.05],
  ['tick', T.press, 0.12], ['pop', T.press, 1174.66, 0.05, 0], ['pop', T.press + 0.02, 1567.98, 0.035, 0],
  ...[0, 0.05, 0.1, 0.13].map(d => ['pop', +(T.land[1] + d).toFixed(3), 140, 0.05, 0]),
  ['boom', OFS + 0.16, 0.1], ['tick', OFS + 0.16, 0.08],
  // 6 · RENEWED
  ['boom', T.renew + 0.16, 0.24], ['tick', T.renew + 0.16, 0.1], ['whoosh', T.renew + 0.05, 0.5, 0.05],
  ...head(T.h6, 3, T.h6Land, 5),
  ['swell', T.renew - 0.3, T.renew + 1.3, { gain: 0.035, f0: 600, f1: 3500 }], ...claps(T.renew + 0.2, T.renew + 2.6, 11),
  ['glitter', T.renew + 0.15, T.renew + 1.0],
  ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.renew + 0.9 + i * 0.13).toFixed(3), [659.25, 587.33, 523.25, 659.25, 587.33, 493.88][i], 0.02, 0.45]),
  ['pop', T.close4, 880, 0.025, 0], ['pop', T.close4 + 0.07, 587.33, 0.025, 0],
  // 7 · ★ LESSON UNLOCKED
  ['whoosh', T.lesson - 0.1, 0.3, 0.03],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Cm' }),
  // 8 · this season: a heartbeat in the silence, the card, WHO IS THAT?!
  ...silence(T.hush, 0.45, T.back),
  ...HEARTBEATS.flatMap(heartbeat),
  ...head(T.h7, 2, T.h7Land, 2),
  ['whoosh', T.cardIn[0], 0.9, 0.035], ['glitter', T.cardIn[1] - 0.2, T.cardIn[1] + 0.4], ['bell', T.cardIn[1] - 0.05, 1318.51, 0.03, 1.6, 0],
  ['pop', T.open5, 659.25, 0.03, 0],
  ['bell', SIGN, 1760, 0.032, 1.2, 0.2], ['glitter', FACE, FACE + 0.4],
  ['whoosh', T.lean[0], 0.5, 0.03], ...[0, 0.06, 0.12, 0.18].map(d => ['pop', +(T.lean[1] - 0.1 + d).toFixed(3), 180, 0.03, 0]),
  ...head(T.h8, 3, T.h8Land, 4), ['boom', T.h8Land, 0.08],
  ['pop', T.monoPop, 1567.98, 0.035, -0.2], ['whoosh', T.monoPop, 0.3, 0.03],
  ['whoosh', T.faint2[0], 0.35, 0.04], ['boom', T.faint2[1], 0.1],
  ['glitter', T.lift2, T.lift2 + 0.7],
  ['pop', T.close5, 880, 0.025, 0], ['pop', T.close5 + 0.07, 587.33, 0.025, 0],
  // 9 · every main character gets a new season
  ['whoosh', T.cardOut[0], 0.4, 0.03],
  ['bell', T.s2 + 0.1, 1174.66, 0.035, 2, 0], ['glitter', T.s2 + 0.1, T.s2 + 0.8],
  ...wordPops(T.h9, 4, 0.07, 1, 0.022), ['pop', T.h9Land, 1174.66, 0.045, 0], ['pop', T.h9Land + 0.12, 1318.51, 0.04, 0], ['pluck', T.h9Land + 0.12, 1318.51, 0.04, 0.7, 0],
  ['whoosh', T.monoBack[0] + 0.1, 0.3, 0.02], ['pop', T.monoBack[0] + 0.32, 1567.98, 0.04, -0.2], ['pop', T.monoBack[0] + 0.38, 2093, 0.025, -0.2],
  ['pluck', T.wink - 0.02, 1760, 0.03, 0.5, -0.2], ['bell', T.wink + 0.02, 2349.32, 0.028, 1.2, -0.2],
  ['whoosh', T.uup - 0.05, 0.25, 0.03], ...buzz(T.uup + 0.3), ['pop', T.uup + 0.32, 1318.51, 0.035, 0.3],
  ['pluck', T.roll[0] + 0.02, 293.66, 0.05, 0.35, 0], ['pluck', T.roll[0] + 0.2, 220, 0.055, 0.6, 0],
  ['whoosh', T.swipe[0], 0.3, 0.05], ['tick', T.swipe[0] + 0.05, 0.04],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
