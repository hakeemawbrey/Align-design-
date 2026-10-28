// stfog — "Neptune is literally fog." (60 s vertical Align ad, Star Talk season 3 #6, music: screwed · Am).
// Story 0–55.6, then the shared end card. Pitch: promo/films/startalk-concepts/A-relatable.md §7.
//   0.0–4.6    "Every group chat | has *this friend.*"  Three friends slump on a velvet couch, scrolling (♍ VIRGO, ♏ SCORPIO,
//              ♑ CAPRICORN). ♓ PISCES zooms in from the far sky, heart-eyes at full blast, and lands on the drop (1.71):
//              "GUYS. I met someone. he's *different.*" A polaroid of him pops up (beanie, big headphones). The three phones
//              go down in sync; the friends look at each other (Scorpio looks at you).
//   4.7–9.4    "The *job.*"   VIRGO: "is he a DJ." (the headphones glint) · PISCES: "he's a sound *artist.*" · Virgo,
//              half-lidded, raises a tiny red flag (a referee's tweet).
//   9.45–14.2  "The *labels.*"  SCORPIO: "does he 'not believe in *labels*'?" · PISCES: "he's *healing.*" (one proud tear)
//              · Scorpio raises a flag.
//  14.25      card cut.
//  14.3–20.0  "The *money.*"  CAPRICORN: "has he asked to borrow *money.*" Silence: the score winds down (tape stop),
//              crickets, Pisces' eyes dart, a sweat drop, the camera creeps in. PISCES: "…only a *little.*" The music
//              slams back (18.38) as Capricorn's flag pole telescopes into a GIANT red flag behind Pisces. Synced eye-roll,
//              bwomp.
//  20.05–25.9 "Ruling planet: | *Neptune.*"  (breakdown) THE STARS glide in, gentle: "babe. Neptune rules *you.*" A sleepy
//              blue planet drifts in, puffing like a fog machine. "it is literally the planet of *fog.*" Pixel fog rolls in.
//  25.95      card cut.
//  26.05–31.6 "Rose-tinted | *glasses.*"  Pisces' heart-eyes become heart-shaped rose glasses; the whole frame goes pink.
//              In the fog, red flags pop up one by one: on a little boat, on a kite, on a cake. The friends, neck-deep in
//              fog, wave their flags like mad. PISCES (swaying): "he's so *mysterious.*"
//  31.71      (lift) "Glasses *off.*"  Virgo hops up and boops the glasses off. The pink snaps out, the fog thins.
//              PISCES: "…is that a *red flag?*" The camera finds the tiny flag that has been waving on its rock since the
//              first frame (cobweb, a JUN calendar page). THE STARS: "it's been waving since *june.*"
//  37.27      "Oh. | *Oh no.*"  The fog blows off: flags everywhere (Neptune sneaks off with one stuck on top). Pisces swoons
//              into the friends' arms and sobs (the running gag).
//  39.35      card cut.
//  39.49      ★ LESSON UNLOCKED: "If all your friends | see the flag, | it's a *flag.*" (+1 VISIBILITY)
//  44.55–51.0 "Dealbreakers, | *pre-fog.*"  (lift) The sign-up dealbreaker picker. Pisces taps three chips, one per beat:
//              ✕ BORROWS MONEY · ✕ ALLERGIC TO PLANS · ✕ HATES MY GROUP CHAT (the friends gasp, then melt).
//              THE STARS: "pick your dealbreakers BEFORE the *heart-eyes.*"
//  51.0       card cut.
//  51.15–55.5 "Love is blind. | Your friends *aren't.*"  All four on the couch. Pisces' phone buzzes. HIM: "can i borrow a
//              *little* more?" All FOUR roll their eyes in sync (Pisces too, now), bwomp. Everything pops out by 55.45.
// One canvas (sky + camera-moved stage + screen-space props), DOM type + dialogue boxes + the shared lesson, grain on top.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawCouch, drawFlag, drawHeartGlasses, starEyes, drawNeptune, createFog, drawBoat, drawKite, drawCake, drawPolaroid,
  drawPhone, drawPixelHeart, drawTear, drawSweat, drawAsteroid, drawJunTag, RED } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)            // 108 bpm grid (the screwed score plays it half-time)
export const KEY = 'Am'

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.15, h0Land: 0.9, h0Out: [4.45, 4.62],
  far: 0.25, zoom: [0.45, BEAT(2)], land: BEAT(2), l1: 1.85, polaroid: 2.6, phones: [2.95, 3.35], glance: [3.55, 4.3],
  h1: 4.7, h1Land: 4.98, l2: 5.15, glint: [5.35, 6.2], l3: 7.1, flagV: 8.12, h1Out: [9.2, 9.38],
  h2: 9.45, h2Land: 9.78, l4: 9.6, l5: 12.3, tear1: [12.75, 14.0], flagS: 13.15, h2Out: [14.05, 14.22],
  cut1: 14.25,
  h3: 14.32, h3Land: 14.62, l6: 14.5, hush: [BEAT(27), BEAT(32)], crick: [16.0, 16.45, 16.95, 17.4], dart: [15.9, 17.6], sweat: 16.25,
  creep: [15.7, 17.75], l7: 17.75, giant: [BEAT(32), BEAT(32) + 0.5], roll: [18.95, 19.75], womp: 19.0, close1: 19.9, retract: [19.75, 20.05],
  h3Out: [19.85, 20.0],
  brk: BEAT(35),
  h4: 20.1, h4Land: 20.5, starsIn: [20.05, 20.6], l8: 20.62, pat: 21.2, nepIn: [21.3, 22.4], l9: 23.25, fogIn: [22.6, 26.2],
  puffs: [22.6, 23.45, 24.3, 25.15, 26.0, 26.85, 27.7, 28.55, 29.4, 30.25, 31.1], close2: 25.98, starsOut: [25.35, 25.85], h4Out: [25.72, 25.9],
  cut2: 25.95,
  h5: 26.05, h5Land: 26.42, glasses: BEAT(47), boat: [27.1, 31.4], kite: [27.95, 28.45], cake: [28.75, 29.05], frantic: [27.1, 31.3],
  l10: 29.15, close3: 31.4, h5Out: [31.42, 31.6],
  lift: BEAT(56), hopV: [30.95, 31.711], boop: BEAT(56), fly: [BEAT(56), BEAT(56) + 0.75], backV: [32.0, 32.45],
  h6: 31.78, h6Land: 32.05, flutter: [31.85, 32.35], thin: [31.8, 33.2], lookFar: 32.45, pan: [32.55, 33.45], l11: 33.05,
  starsPeek: [34.95, 35.25], l12: 35.35, jun: 35.6, close4: 37.9, h6Out: [37.08, 37.25],
  reveal: BEAT(66), h7: 37.32, h7Land: 37.62, blow: [37.27, 38.1], cascade: [37.45, 38.45], nepOff: [37.4, 38.8], swoon: [38.35, 38.95],
  catch: [38.05, 38.5], sob: 38.95, h7Out: [39.18, 39.34],
  cut3: 39.35,
  lesson: BEAT(70), lessonOut: [44.2, 44.45],
  h8: 44.55, h8Land: 44.92, panel: [44.5, 44.95], toPanel: [44.5, 45.05], taps: [BEAT(81), BEAT(83), BEAT(85)], gasp: BEAT(85) + 0.22,
  melt: BEAT(86) + 0.1, l13: 48.15, close5: 51.32, panelOut: [50.75, 51.05], h8Out: [50.8, 50.98],
  cut4: 51.0,
  h9: 51.15, h9Land: 51.6, sit: [50.95, 51.45], buzz: [51.7, 52.05], l14: 52.1, roll2: [BEAT(95), BEAT(95) + 0.9], womp2: BEAT(95) + 0.05,
  close6: 54.68, out: [55.0, 55.45], h9Out: [55.18, 55.4],
}

const PIS = signStar('pisces'), VIR = signStar('virgo'), SCO = signStar('scorpio'), CAP = signStar('capricorn')
const NAME = { pis: `${PIS.glyph}︎ PISCES`, vir: `${VIR.glyph}︎ VIRGO`, sco: `${SCO.glyph}︎ SCORPIO`, cap: `${CAP.glyph}︎ CAPRICORN`, stars: 'THE STARS', him: 'HIM' }
const TAG = { pis: '#b7b1ff', vir: '#ff8ab6', sco: '#ff7a95', cap: '#5fe3b9', stars: GOLD, him: '#9fd0ff' }
const L = (t, id, text) => ({ t, speaker: NAME[id], color: TAG[id], text })
const LINES_A = [
  L(T.l1, 'pis', "GUYS. I met someone. he's *different.*"),
  L(T.l2, 'vir', 'is he a *DJ.*'),
  L(T.l3, 'pis', "he's a sound *artist.*"),
  L(T.l4, 'sco', "does he 'not believe in *labels*'?"),
  L(T.l5, 'pis', "he's *healing.*"),
  L(T.l6, 'cap', 'has he asked to borrow *money.*'),
  L(T.l7, 'pis', '…only a *little.*'),
]
const LINES_B = [L(T.l8, 'stars', 'babe. Neptune rules *you.*'), L(T.l9, 'stars', 'it is literally the planet of *fog.*')]
const LINES_C = [L(T.l10, 'pis', "he's so *mysterious.*")]
const LINES_D = [L(T.l11, 'pis', '…is that a *red flag?*'), L(T.l12, 'stars', "it's been waving since *june.*")]
const LINES_E = [L(T.l13, 'stars', 'pick your dealbreakers BEFORE the *heart-eyes.*')]
const LINES_F = [L(T.l14, 'him', 'can i borrow a *little* more?')]
export const BOXES = [
  { lines: LINES_A, close: T.close1 }, { lines: LINES_B, close: T.close2 }, { lines: LINES_C, close: T.close3 },
  { lines: LINES_D, close: T.close4 }, { lines: LINES_E, close: T.close5 }, { lines: LINES_F, close: T.close6 },
]
const CPS = 28
export const ALL_LINES = BOXES.flatMap(b => b.lines)
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'If all your friends | see the flag, | it’s a *flag.*', chip: '+1 VISIBILITY' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
/** a hop from p0 to p1 over [a, b] with an arc of height h: [x, y, size] */
const arcTo = (t, [a, b], p0, p1, h) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(p0[0], p1[0], e), lerp(p0[1], p1[1], e) - Math.sin(p * Math.PI) * h, lerp(p0[2], p1[2], e)] }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the stage (world coords; the camera maps (fx, fy) to screen (540, 1000) at scale s)
const SEAT_Y = 1222
const SEATS = { vir: [290, 1150, 210], sco: [540, 1150, 210], cap: [790, 1150, 210] }
const PERCH = [540, 928, 210]                    // the last beat: Pisces sits up on the backrest, the friends below
const PIS_AT = [540, 742, 300]
const FAR = { x: 962, y: 612, px: 5 }            // the tiny flag on its rock, planted from frame one
const NEP_AT = [222, 652, 230]
const STARS_AT = [846, 650, 172], STARS_PEEK = [872, 486, 150]
const BOAT_Y = 984
const CAKE_AT = [884, 884]
const KITE_AT = [700, 522]
const CATCH = { vir: [400, 1044, 200], sco: [540, 1072, 200], cap: [680, 1044, 200] }
const SWOON = [540, 930, 280]
const PANEL = { x: 250, y: 576, w: 760, h: 742 }
const CHIP_Y = n => PANEL.y + 266 + n * 90
const CHIPS = [
  { text: 'ONE-WORD TEXTS' }, { text: 'BORROWS MONEY', tap: 0 }, { text: 'ALLERGIC TO PLANS', tap: 1 }, { text: 'SORE LOSERS' }, { text: 'HATES MY GROUP CHAT', tap: 2 },
]
const TAP_ROW = [1, 2, 4]
const PEEK = { vir: [400, 1396, 158], sco: [620, 1414, 158], cap: [840, 1396, 158] }
const COL = { pis: PIS, vir: VIR, sco: SCO, cap: CAP }
const SEED = { pis: 5, vir: 11, sco: 7, cap: 3, stars: 9 }

// camera keys: [t, s, fx, fy]; consecutive keys tween (inOutCubic; < 0.5 s apart: inOutQuad)
const CAM = [
  [0, 1.1, 540, 1080], [T.zoom[0], 1.1, 540, 1080], [T.land, 1, 540, 1000],
  [T.l2 - 0.1, 1, 540, 1000], [T.l2 + 0.25, 1.05, 470, 1010], [T.l3 - 0.15, 1.05, 470, 1010], [T.l3 + 0.2, 1.04, 560, 960],
  [T.l4 - 0.15, 1.04, 560, 960], [T.l4 + 0.2, 1.05, 560, 1020], [T.l5 - 0.15, 1.05, 560, 1020], [T.l5 + 0.2, 1.05, 540, 950],
  [T.cut1, 1.02, 540, 1000], [T.l6 + 0.1, 1.02, 540, 1000], [T.l6 + 0.4, 1.05, 600, 1020], [T.creep[0], 1.05, 580, 1000],
  [T.creep[1], 1.24, 540, 860], [T.giant[0] - 0.001, 1.24, 540, 860], [T.giant[0], 0.97, 560, 980], [T.roll[1], 0.98, 560, 990],
  [T.brk, 1, 540, 1000], [T.cut2, 1, 540, 1000], [T.glasses - 0.1, 1, 540, 1000], [T.glasses + 0.35, 1.07, 540, 940], [T.boat[0] + 0.3, 1.0, 540, 990],
  [T.hopV[0], 1.0, 540, 990], [T.boop, 1.08, 520, 930], [T.pan[0], 1.08, 520, 930], [T.pan[1], 1.42, 782, 690],
  [T.reveal, 1.42, 782, 690], [T.reveal + 0.75, 0.98, 540, 1000], [T.cut3, 1, 540, 1000],
  [T.sit[0], 1, 540, 1000], [T.l14 + 0.2, 1.15, 540, 1040], [T.out[1], 1.17, 540, 1040],
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

// talk hops
const HOPS = {}
for (const id of ['pis', 'vir', 'sco', 'cap', 'stars']) HOPS[id] = talkHops(ALL_LINES, NAME[id], { cps: CPS })
HOPS.pis.push(T.land, T.taps[0] - 0.12, T.taps[1] - 0.12, T.taps[2] - 0.12, T.sit[1])
HOPS.vir.push(T.flagV, T.backV[1], T.sit[1] + 0.05)
HOPS.sco.push(T.flagS, T.sit[1] + 0.1)
HOPS.cap.push(T.giant[0] + 0.05, T.sit[1] + 0.15)

// the red flags that turn up when the fog blows off (world x, y = pole foot; px; pole; fw; fh; dir)
const REVEAL_FLAGS = [
  [128, 1086, 6, 20, 11, 7, 1], [952, 1086, 6, 20, 11, 7, -1], [74, 560, 5, 18, 10, 6, 1], [1012, 452, 5, 16, 9, 6, -1],
  [158, 760, 5, 14, 9, 6, -1], [726, 520, 4, 14, 8, 5, 1], [356, 538, 4, 14, 8, 5, -1], [1030, 820, 5, 16, 9, 6, -1],
  [62, 940, 5, 16, 9, 6, 1], [640, 1312, 5, 14, 9, 6, 1], [440, 1318, 5, 14, 9, 6, -1], [250, 444, 4, 12, 7, 5, 1],
]

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 88px Inter", "800 50px Inter", "italic 500 150px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { top: 190, size: 104, accentSize: 140, wobble: true, ...o })
  const H0 = HT('Every group chat | has *this* friend.', { size: 96, accentSize: 132, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, gap: 0.08, accentColor: PINK })
  const H1 = HT('The *job.*', { size: 128, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: TAG.vir })
  const H2 = HT('The *labels.*', { size: 128, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: TAG.sco })
  const H3 = HT('The *money.*', { size: 128, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, accentColor: TAG.cap })
  const H4 = HT('Ruling planet: | *Neptune.*', { size: 100, accentSize: 150, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: '#8fb4ff' })
  const H5 = HT('Rose-tinted | *glasses.*', { size: 104, accentSize: 156, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: '#ff9ccf' })
  const H6 = HT('Glasses *off.*', { size: 120, accentSize: 168, at: T.h6, late: 1, lateAt: T.h6Land, accentColor: TAG.vir })
  const H7 = HT('Oh. | Oh *no.*', { size: 120, accentSize: 172, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: RED })
  const H8 = HT('Dealbreakers, | *pre-fog.*', { size: 100, accentSize: 150, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: '#ff7a8c' })
  const H9 = HT('Love is blind. | Your friends *aren’t.*', { size: 92, accentSize: 130, at: T.h9, late: 1, lateAt: T.h9Land, gap: 0.08, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out]]
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1480, width: 960, height: 300, open: b.lines[0].t - 0.22, close: b.close, cps: CPS }))
  const lesson = buildLesson(root, { ...LESSON, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── fog layers (world space)
  const fogBack = createFog(1480, 1240, 12), fogFront = createFog(1480, 520, 12)

  // ── helpers
  const shakeAt = t => {
    let a = 0
    for (const [t0, amp] of [[T.land, 10], [T.giant[0], 18], [T.boop, 8], [T.swoon[1], 9], ...T.taps.map(s => [s, 9])]) { const k = t - t0; if (k >= 0 && k < 0.32) a = Math.max(a, amp * (1 - k / 0.32)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
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
  /** tears arcing out of both eyes from t0 (every `gap` s) until t1 (pure f(t)) */
  function tears(eyes, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    ;[eyes.L, eyes.R].forEach(([ex, ey], si) => {
      const side = si ? 1 : -1
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (120 + ((k * 37) % 5) * 26) * spread, vy = -(160 + ((k * 53) % 4) * 38)
        drawTear(x, ex + vx * a, ey + 6 + vy * a + 900 * a * a, px)
      }
    })
  }

  // ── who is where (world coords) and how they feel
  function pisces(t) {
    let p = PIS_AT, rot = 0, a = 1
    if (t < T.far) return null
    if (t < T.zoom[1]) {
      const e = ease.inCubic(prog(t, ...T.zoom))
      p = [lerp(250, PIS_AT[0], e) + Math.sin(e * Math.PI) * 120, lerp(600, PIS_AT[1], e) - Math.sin(e * Math.PI) * 60, lerp(26, PIS_AT[2], e)]
    } else if (t < T.reveal) {
      const sway = t >= T.glasses && t < T.boop ? Math.sin((t - T.glasses) * 1.7) * 20 * clamp((t - T.glasses) * 2) : 0
      p = [PIS_AT[0] + sway, PIS_AT[1], PIS_AT[2]]
    } else if (t < T.toPanel[0]) {
      const k = ease.inOutCubic(prog(t, ...T.swoon))
      p = [lerp(PIS_AT[0], SWOON[0], k), lerp(PIS_AT[1], SWOON[1], k) - Math.sin(k * Math.PI) * 30, lerp(PIS_AT[2], SWOON[2], k)]
      rot = -1.15 * ease.outBack(k) + (t > T.swoon[1] ? Math.sin((t - T.swoon[1]) * 9) * 0.03 * Math.exp(-(t - T.swoon[1]) * 0.6) : 0)
    } else if (t < T.sit[0]) {
      const row = n => [150, CHIP_Y(TAP_ROW[n]) + 6, 168]
      if (t < T.toPanel[1]) { const q = arcTo(t, T.toPanel, SWOON, row(0), 220); p = q; rot = -1.15 * (1 - ease.outCubic(prog(t, ...T.toPanel))) }
      else {
        let n = 0; for (let i = 1; i < 3; i++) if (t >= T.taps[i] - 0.42) n = i
        p = n > 0 && t < T.taps[n] ? arcTo(t, [T.taps[n] - 0.42, T.taps[n] - 0.08], row(n - 1), row(n), 60) : row(n)
        const reach = Math.max(...T.taps.map(s => nodK(t, s - 0.1, 0.3)))
        p = [p[0] + reach * 34, p[1], p[2]]
      }
    } else {
      const from = [150, CHIP_Y(TAP_ROW[2]) + 6, 168]
      p = t < T.sit[1] ? arcTo(t, T.sit, from, PERCH, 200) : PERCH
    }
    a = popOut(t, T.out)
    return { p, rot, a }
  }
  function pisMood(t) {
    const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0 })
    if (t < T.land) return st('heart', [0, 0], { sq: t > T.zoom[1] - 0.1 ? 0 : -0.06 })
    if (t < T.l2) return st('heart', [0, 0])
    if (t < T.l3) return st('heart', [-1, 1])
    if (t < T.l4) return st('sparkle', [0, 0])
    if (t < T.l5) return st('heart', [0, 1])
    if (t < T.l6) return st('sparkle', [0, 0])
    if (t < T.hush[0]) return st('neutral', [1, 1])
    if (t < T.l7) {
      // the silence: eyes dart left, right, left… (whole-pixel snaps), a little shiver
      const k = Math.floor((t - T.dart[0]) / 0.36)
      return st('wide', t < T.dart[0] ? [1, 0] : [k % 2 ? 1 : -1, 0], { blink: false, sq: 0.015 * Math.sin(t * 60) })
    }
    if (t < T.giant[0]) return st('squint', [1, 1])
    if (t < T.h4) return st('happy', [0, 0])
    if (t < T.l9) return st('wide', [1, -1])
    if (t < T.fogIn[0] + 1) return st('neutral', [1, 0])
    if (t < T.glasses) return st('heart', [0, 0])
    if (t < T.boop) return st('happy', [0, 0])
    if (t < T.flutter[1]) { const f = prog(t, ...T.flutter), b = f < 0.2 ? 1 : f < 0.4 ? 0.4 : f < 0.6 ? 1 : f < 0.75 ? 0.4 : 0; return st('neutral', [0, 0], { blink: b }) }
    if (t < T.l11) return st('wide', t < T.lookFar ? [0, 0] : [1, -1], { blink: false })
    if (t < T.l12) return st('wide', [1, -1])
    if (t < T.reveal) return st('squint', [1, -1])
    if (t < T.swoon[0]) return st('wide', [0, 0], { blink: false, sq: -0.06 })
    if (t < T.sob) return st('neutral', [0, 0], { blink: 1 })
    if (t < T.toPanel[0]) return st('sparkle', [0, 0])
    if (t < T.taps[2] + 0.1) return st(t < T.toPanel[1] ? 'wide' : 'squint', [1, 0])
    if (t < T.sit[0]) return st('sparkle', [1, 0])
    if (t < T.l14) return st('happy', [0, 0])
    if (t < T.roll2[0]) return st('neutral', [0, 1])
    if (t < T.roll2[1]) return st('eyeroll', [0, -1], { sq: 0.08 })
    return st('happy', [0, 0])
  }

  const FRIENDS = ['vir', 'sco', 'cap']
  function friend(id, t) {
    let p = SEATS[id], layer = 'seat'
    if (id === 'vir' && t >= T.hopV[0] && t < T.backV[1]) {
      const BOOP = [404, 808, 176]
      if (t < T.boop) p = arcTo(t, T.hopV, SEATS.vir, BOOP, 160)
      else if (t < T.backV[0]) p = [BOOP[0] - 10 * Math.exp(-(t - T.boop) * 8), BOOP[1], BOOP[2]]
      else p = arcTo(t, T.backV, BOOP, SEATS.vir, 120)
      layer = 'front'
    }
    if (t >= T.catch[0] && t < T.toPanel[0]) { p = t < T.catch[1] ? arcTo(t, T.catch, SEATS[id], CATCH[id], 90) : CATCH[id]; layer = 'pile' }
    if (t >= T.toPanel[0] && t < T.sit[0]) { const q = PEEK[id]; p = t < T.toPanel[1] + 0.1 ? arcTo(t, [T.toPanel[0] + 0.05 * FRIENDS.indexOf(id), T.toPanel[1] + 0.1], CATCH[id], q, 150) : q; layer = 'peek' }
    if (t >= T.sit[0]) { p = t < T.sit[1] ? arcTo(t, [T.sit[0] + 0.04 * FRIENDS.indexOf(id), T.sit[1]], PEEK[id], SEATS[id], 160) : SEATS[id]; layer = t < T.sit[1] ? 'front' : 'seat' }
    return { p, layer }
  }
  function friendMood(id, t) {
    const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0, dy: o.dy || 0 })
    const HALF = { blink: 0.55 }
    // the opening: scrolling, then the phones go down together
    if (t < T.l1) return st('neutral', [0, 1], HALF)
    if (t < T.glance[0]) return st('neutral', t < T.phones[0] ? [0, 1] : [0, -1], HALF)
    if (t < T.glance[1]) return st('neutral', id === 'vir' ? [1, 0] : id === 'cap' ? [-1, 0] : [0, 0], HALF)
    if (t < T.cut1) {
      if (id === 'vir' && inW(t, T.l2, T.flagV)) return st('squint', [-1, -1])
      if (id === 'vir' && inW(t, T.flagV, T.flagV + 0.5)) return st('neutral', [0, -1], { blink: 0.55, sq: -0.08 * nodK(t, T.flagV, 0.5) })
      if (id === 'sco' && inW(t, T.l4, T.flagS)) return st('squint', [0, -1])
      if (inW(t, T.flagV, T.flagV + 0.6) && id !== 'vir') return st('neutral', [id === 'sco' ? -1 : -1, 0], HALF)
      if (inW(t, T.flagS, T.flagS + 0.6) && id !== 'sco') return st('neutral', [id === 'vir' ? 1 : -1, 0], HALF)
      return st('neutral', [0, -1], HALF)
    }
    if (t < T.brk) {
      if (inW(t, T.creep[0], T.l7)) return st('squint', [0, -1], { sq: -0.07 * ease.inOutQuad(prog(t, ...T.creep)), dy: -10 * ease.inOutQuad(prog(t, ...T.creep)) })
      if (inW(t, T.giant[0], T.roll[0])) return st('wide', [0, -1], { blink: false })
      if (inW(t, T.roll[0], T.roll[1])) return st('eyeroll', [0, -1], { sq: 0.1 * ease.outCubic(prog(t, T.roll[0], T.roll[0] + 0.3)), dy: 8 })
      if (id === 'cap' && t < T.giant[0]) return st('neutral', [-1, -1], HALF)
      return st('neutral', [0, -1], HALF)
    }
    // Neptune
    if (t < T.cut2) {
      if (t < T.nepIn[0]) return st('neutral', [1, -1], HALF)
      return st(t < T.fogIn[0] ? 'neutral' : 'wide', [-1, -1], t < T.fogIn[0] ? HALF : {})
    }
    // the fog: flags pop up; the friends track them, then wave their own like mad
    if (t < T.boop) {
      const tr = t < T.boat[0] ? [0, -1] : t < T.kite[0] ? [lerp(-1, 1, prog(t, T.boat[0], T.kite[0])) > 0 ? 1 : -1, 0] : [1, -1]
      return st('wide', tr, { blink: false })
    }
    if (t < T.reveal) return st(t < T.flutter[1] ? 'happy' : 'neutral', [0, -1], t < T.flutter[1] ? {} : HALF)
    if (t < T.toPanel[0]) {
      if (t < T.catch[0]) return st('wide', [0, -1], { blink: false })
      if (t < T.lesson) return st('wide', [0, -1], { blink: false })
      return st('sparkle', [0, -1], { sq: 0.05 * nodK(t, T.lesson + 1 + FRIENDS.indexOf(id) * 0.4, 0.5) })
    }
    if (t < T.sit[0]) {
      const side = id === 'vir' ? -1 : id === 'cap' ? 1 : 0
      let nk = 0
      for (const s of T.taps.slice(0, 2)) nk = Math.max(nk, nodK(t, s + 0.12 + FRIENDS.indexOf(id) * 0.04, 0.5))
      if (nk > 0) return st('happy', [-side, -1], { sq: 0.12 * nk, dy: 10 * nk })
      if (inW(t, T.taps[2] - 0.05, T.melt)) return st('wide', [-side * 0, -1], { blink: false, sq: -0.08 })
      if (t >= T.melt) return st(id === 'sco' ? 'heart' : 'sparkle', [0, -1])
      return st('neutral', [-side, -1])
    }
    if (t < T.l14) return st('happy', [0, 0])
    if (t < T.roll2[0]) return st('neutral', [id === 'vir' ? 1 : -1, 0], HALF)
    if (t < T.roll2[1]) return st('eyeroll', [0, -1], { sq: 0.08 })
    return st('happy', [0, 0])
  }

  // the friends' own flags: [raise t, lower t] per friend + cloth geometry relative to the star
  function friendFlag(id, t, r, size) {
    const sc = size / 210
    let k = 0, frantic = t >= T.frantic[0] && t < T.frantic[1] ? 1 : 0
    const up = { vir: T.flagV, sco: T.flagS, cap: T.giant[0] }[id]
    if (t >= up && t < T.hopV[0] + (id === 'vir' ? 0 : 0.2)) k = pop01(t, up, 0.3, 2)
    if (t >= T.cascade[0] && t < T.lesson) k = Math.max(k, pop01(t, T.cascade[0] + 0.2 + FRIENDS.indexOf(id) * 0.12, 0.3, 2))
    if (k <= 0) return
    const side = id === 'sco' ? 1 : -1
    const fx = r.x + side * size * 0.46, fy = r.y + size * 0.3
    if (id === 'cap' && t >= T.giant[0] && t < T.retract[1]) {
      // the telescoping pole shoots up past Pisces, then a giant cloth unfurls to the left, high behind everyone
      const g = ease.outCubic(prog(t, ...T.giant)) * (1 - ease.inCubic(prog(t, ...T.retract)))
      const px = lerp(6, 10, g) * sc, poleLen = lerp(144, 660, g) * sc
      const fw = lerp(13, 44, g), fh = lerp(8, 27, g)
      const unf = clamp(prog(t, T.giant[0] + 0.1, T.giant[1] + 0.12) * 1.15 + (t >= T.retract[0] ? 1 : 0))
      drawFlag(x, r.x + size * 0.5, fy, px, t, { pole: poleLen / px, fw, fh, dir: -1, k: unf, seed: 2, wave: 1.6, freq: lerp(0.55, 0.2, g) })
      return
    }
    drawFlag(x, fx, fy - (1 - k) * 60, 6 * sc, t, { pole: 24, fw: 13, fh: 8, dir: side, k: clamp(k), seed: SEED[id], frantic, wave: 1 + frantic })
  }

  // ── the set
  function drawFarFlag(t) {
    const { x: fx, y: fy, px } = FAR
    const spot = prog(t, T.pan[1] - 0.3, T.pan[1] + 0.2) * (1 - prog(t, T.reveal, T.reveal + 0.4))
    if (spot > 0) {
      const g = x.createRadialGradient(fx - 20, fy - 50, 0, fx - 20, fy - 50, 120)
      g.addColorStop(0, `rgba(255,120,110,${0.32 * spot * (0.85 + 0.15 * Math.sin(t * 6))})`); g.addColorStop(1, 'rgba(255,120,110,0)')
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(fx - 160, fy - 190, 320, 320); x.restore()
    }
    drawAsteroid(x, fx + 2 * px, fy, px)
    drawFlag(x, fx, fy, px, t, { pole: 15, fw: 9, fh: 6, dir: -1, seed: 0.7, cobweb: prog(t, T.jun - 0.25, T.jun + 0.2) })
    if (t >= T.jun && t < T.lesson) drawJunTag(x, fx + 0.5 * px, fy - 8 * px, px * 0.95, t, pop01(t, T.jun, 0.35, 2.4))
  }
  function fogDensity(t) {
    const inK = ease.inOutQuad(prog(t, T.fogIn[0], T.fogIn[1] - 1.2))
    const thin = 1 - 0.68 * ease.inOutQuad(prog(t, ...T.thin))
    const blow = 1 - ease.inCubic(prog(t, ...T.blow))
    return inK * thin * blow
  }
  const fogFrontX = t => lerp(160, 1700, ease.inOutQuad(prog(t, T.fogIn[0], T.fogIn[1])))
  const fogBackX = t => lerp(-800, 1500, ease.inCubic(prog(t, ...T.blow)))
  function drawFogBack(t) {
    const d = fogDensity(t)
    if (d <= 0.01) return
    fogBack.draw(x, t, { x0: -200, y0: 300, density: d, front: fogFrontX(t), back: fogBackX(t), frontSoft: 320, top: 360, topSoft: 260, bottom: 1500, scale: 0.05, vx: 0.32, vy: 0.05, color: [190, 184, 236], seed: 3, alphaMax: 0.9 })
  }
  function drawFogFront(t) {
    const d = fogDensity(t)
    if (d <= 0.01) return
    fogFront.draw(x, t, { x0: -200, y0: 1060, density: d, front: fogFrontX(t) - 120, back: fogBackX(t) + 200, frontSoft: 300, top: 1150, topSoft: 150, bottom: 1600, scale: 0.07, vx: 0.55, vy: 0.04, color: [214, 208, 248], seed: 9, alphaMax: 0.92 })
  }
  function drawNep(t) {
    if (t < T.nepIn[0] || t > T.nepOff[1]) return
    const e = ease.outCubic(prog(t, ...T.nepIn)), o = ease.inCubic(prog(t, ...T.nepOff))
    const nx = lerp(-180, NEP_AT[0], e) - o * 520, ny = NEP_AT[1] + Math.sin(t * 1.3) * 10 - o * 120
    let puff = 0
    for (const pf of T.puffs) { const k = t - pf; if (k >= 0 && k < 0.5) puff = Math.max(puff, Math.sin(k / 0.5 * Math.PI)) }
    if (t > T.thin[0]) puff = 0
    const mood = t >= T.reveal ? 'sheepish' : t >= T.boop ? 'wide' : 'dreamy'
    drawNeptune(x, nx, ny, NEP_AT[2], t, { mood, look: t >= T.reveal ? -1 : 1, puff })
    // the puffs: little fog clouds blown out to the right
    if (t < T.thin[0] + 0.6) for (const pf of T.puffs) {
      const k = t - pf
      if (k < 0 || k > 1.4) continue
      const q = ease.outCubic(k / 1.4)
      x.save(); x.globalAlpha = (1 - q) * 0.85
      for (let i = 0; i < 4; i++) {
        const cx = nx + 110 + q * 260 + i * 26, cy = ny + 20 + Math.sin(i * 2.1 + pf) * 24 - q * 20
        const s = Math.round((26 + i * 6) * (0.6 + q))
        x.fillStyle = i % 2 ? '#d8d2fa' : '#c4bdf0'
        x.fillRect(Math.round(cx - s / 2), Math.round(cy - s / 2), s, s)
        x.fillRect(Math.round(cx - s * 0.75), Math.round(cy - s * 0.2), Math.round(s * 1.5), Math.round(s * 0.5))
      }
      x.restore()
    }
    // caught red-handed: a flag stuck on top as it sneaks off
    if (t >= T.cascade[0]) drawFlag(x, nx + 8, ny - NEP_AT[2] * 0.44, 5, t, { pole: 12, fw: 8, fh: 5, dir: 1, k: pop01(t, T.cascade[0] + 0.05, 0.3, 2), seed: 4.4 })
  }
  function drawNarrator(t) {
    let p = null, mood = 'happy', look = [-1, 0], blink, pk = 1
    if (t >= T.starsIn[0] && t < T.starsOut[1]) {
      const e = ease.outCubic(prog(t, ...T.starsIn))
      p = [lerp(1180, STARS_AT[0], e), lerp(420, STARS_AT[1], e), STARS_AT[2]]
      const o = ease.inCubic(prog(t, ...T.starsOut)); p = [p[0] + o * 120, p[1] - o * 700, p[2]]
      // the pat: leans in to Pisces and back
      const pt = nodK(t, T.pat, 0.5); p = [p[0] - pt * 70, p[1] + pt * 14, p[2]]
      mood = t < T.l9 ? 'happy' : 'neutral'; look = t < T.nepIn[0] ? [-1, 0] : [-1, 0]
      if (t >= T.l9) blink = 0.35
    } else if (t >= T.starsPeek[0] && t < T.reveal + 0.3) {
      pk = pop01(t, T.starsPeek[0], 0.3, 2.2) * (1 - prog(t, T.reveal, T.reveal + 0.3))
      p = STARS_PEEK; mood = 'neutral'; look = [0, 0]; blink = 0.5
    } else if (t >= T.l13 - 0.4 && t < T.panelOut[1]) {
      pk = pop01(t, T.l13 - 0.4, 0.3, 2.2) * (1 - prog(t, ...T.panelOut))
      p = [930, PANEL.y - 10, 140]; mood = t < T.l13 + 0.9 ? 'happy' : 'wink'; look = [-1, 1]
    }
    if (!p || pk <= 0.01) return
    drawStarChar(x, p[0], p[1], p[2], t, { color: STAR.sky, mood, look, blink, hops: HOPS.stars, seed: SEED.stars, pop: pk, glow: 1 })
  }
  function drawPolaroidAt(t) {
    if (t < T.polaroid || t > T.retract[1] + 0.3) return
    const k = pop01(t, T.polaroid, 0.36, 2.4), o = ease.inCubic(prog(t, T.retract[0], T.retract[1] + 0.3))
    const glint = inW(t, ...T.glint) ? Math.max(0, Math.sin((t - T.glint[0]) * 9)) : 0
    drawPolaroid(x, 206 - o * 420, 690 + Math.sin(t * 1.6) * 8 - o * 40, 6 * k, t, { rot: -0.1 + 0.03 * Math.sin(t * 1.1) - o * 0.5, glint })
    if (t < T.polaroid + 0.8) sparkleRing(t, 206, 690, T.polaroid + 0.04, 8, 120, 1)
  }
  function drawHearts(t) {
    // pixel hearts float up around Pisces while it gushes
    if (t < T.land || t > T.l2) return
    for (let i = 0; i < 9; i++) {
      const born = T.land + i * 0.36, a = t - born
      if (a < 0 || a > 1.6) continue
      const side = i % 2 ? 1 : -1, xx = PIS_AT[0] + side * (150 + (i * 37) % 60) + Math.sin(a * 5 + i) * 14, yy = PIS_AT[1] + 40 - a * 190
      x.save(); x.globalAlpha = Math.min(1, a * 6) * (1 - prog(a, 1.1, 1.6)); drawPixelHeart(x, xx, yy, 5 + (i % 3), i % 3 ? '#ff4f7e' : '#ff8fc8'); x.restore()
    }
  }
  // the fog flags sink back into the fog when the glasses come off (only the tiny one stays in view), and return for the reveal
  const sunk = t => t >= T.boop + 0.1 && t < T.cascade[0]
  const sinkK = t => t < T.boop + 0.1 ? 1 : t < T.cascade[0] ? 1 - ease.inQuad(prog(t, T.boop + 0.1, T.boop + 0.5)) : pop01(t, T.cascade[0] + 0.3, 0.32, 2.2)
  function drawBoatAt(t) {
    if (t < T.boat[0] || t > T.lesson) return
    const px = 8, k = sinkK(t)
    if (k <= 0.02) return
    if (t >= T.cascade[0]) { x.save(); x.translate(156, 1000); x.scale(k, k); drawBoat(x, 0, 0, px, t); x.restore(); return }
    const e = prog(t, ...T.boat), bx = lerp(-110, 1190, e)
    x.save(); x.globalAlpha *= k; drawBoat(x, bx, BOAT_Y + Math.sin(t * 2) * 6 + (1 - k) * 60, px, t); x.restore()
  }
  function drawKiteAt(t) {
    if (t < T.kite[0] || t > T.lesson) return
    const k = sunk(t) ? sinkK(t) : t >= T.cascade[0] ? sinkK(t) : ease.outBack(prog(t, ...T.kite))
    if (k <= 0.02) return
    const kx = KITE_AT[0] + Math.sin(t * 1.2) * 16, ky = lerp(980, KITE_AT[1], k) + Math.sin(t * 2.1) * 10
    x.save(); x.globalAlpha *= clamp(k * 2); drawKite(x, kx, ky, 8, t, { stringTo: [830, 1060] }); x.restore()
  }
  function drawCakeAt(t) {
    if (t < T.cake[0] || t > T.lesson) return
    const k = sunk(t) || t >= T.cascade[0] ? sinkK(t) : pop01(t, T.cake[0], 0.3, 2.4)
    if (k <= 0.02) return
    x.save(); x.translate(CAKE_AT[0], CAKE_AT[1]); x.scale(k, k); drawCake(x, 0, 0, 8, t); x.restore()
  }
  function drawRevealFlags(t) {
    if (t < T.cascade[0] || t > T.lesson + 0.5) return
    REVEAL_FLAGS.forEach(([fx, fy, px, pole, fw, fh, dir], i) => {
      const t0 = T.cascade[0] + 0.2 + i * ((T.cascade[1] - T.cascade[0] - 0.2) / REVEAL_FLAGS.length)
      const k = pop01(t, t0, 0.3, 2.2)
      if (k <= 0) return
      if (fy < 1000 && i % 3 !== 0) drawAsteroid(x, fx + dir * 2 * px, fy, px)
      drawFlag(x, fx, fy + (1 - k) * 40, px, t, { pole, fw, fh, dir, k: clamp(k), seed: i * 1.7 })
    })
  }

  // ── stars
  function drawFriend(id, t, F, C) {
    const [px0, py0, sz] = F.p
    const ok = popOut(t, [T.out[0] + 0.04 * FRIENDS.indexOf(id), T.out[1]])
    if (ok <= 0) return null
    const m = friendMood(id, t)
    const pk = t >= T.toPanel[0] && t < T.toPanel[0] + 0.1 ? 1 : 1
    const r = drawStarChar(x, px0, py0 + (m.dy || 0), sz, t, { color: COL[id].color, glyph: sz >= 140 ? COL[id].glyph : null, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq, hops: HOPS[id], seed: SEED[id], pop: ok * pk, glow: 0.85, bob: sz * 0.025 })
    // phones in the opening
    if (t < T.phones[1] + 0.05) {
      const d = ease.inOutQuad(prog(t, ...T.phones))
      drawPhone(x, r.x - sz * 0.02, r.y + sz * 0.3 + d * 70, Math.max(3, sz / 30), 1 - d, -0.08)
    }
    friendFlag(id, t, r, sz)
    return r
  }
  function drawPisces(t) {
    const P = pisces(t)
    if (!P || P.a <= 0) return
    const [px0, py0, sz] = P.p
    if (t > T.zoom[0] && t < T.zoom[1] + 0.06) for (let k = 3; k >= 1; k--) {
      const Gh = pisces(t - k * 0.05)
      if (Gh) drawStarChar(x, Gh.p[0], Gh.p[1], Gh.p[2], t, { color: PIS.color, mood: 'heart', look: [0, 0], blink: false, tips: false, seed: SEED.pis, alpha: 0.14 * (4 - k), glow: 0.3, bob: 0 })
    }
    const m = pisMood(t)
    const opts = { color: PIS.color, glyph: sz >= 140 ? PIS.glyph : null, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq, hops: HOPS.pis, seed: SEED.pis, pop: P.a, glow: 1.05 }
    x.save(); x.translate(px0, py0); x.rotate(P.rot)
    const r = drawStarChar(x, 0, 0, sz, t, opts)
    const eyes = starEyes(0, 0, sz, t, opts)
    // the rose glasses: the heart-eyes grow into them, then they fly off on the boop
    if (t >= T.glasses && t < T.boop) drawHeartGlasses(x, eyes, pop01(t, T.glasses, 0.34, 2.6))
    // sweat in the silence
    if (inW(t, T.sweat, T.l7 + 0.4)) drawSweat(x, -sz * 0.3, -sz * 0.13 + ease.inQuad(prog(t, T.sweat, T.l7 + 0.4)) * 50, Math.max(4, sz / 22))
    // one proud tear for "he's healing"
    if (inW(t, ...T.tear1)) { const k = prog(t, ...T.tear1); drawTear(x, eyes.L[0] - 4, eyes.L[1] + 14 + ease.inQuad(k) * 70, Math.max(3, sz / 34)) }
    if (t >= T.sob && t < T.toPanel[0]) tears(eyes, sz, t, T.sob, T.toPanel[0] - 0.4, { gap: 0.08, spread: 0.9 })
    if (inW(t, T.melt, T.sit[0])) tears(eyes, sz, t, T.melt, T.sit[0] - 0.5, { gap: 0.12, spread: 0.7 })
    x.restore()
    void r
    return { x: px0, y: py0, size: sz, eyes }
  }
  function drawFlyingGlasses(t) {
    if (t < T.fly[0] || t > T.fly[1]) return
    const p = prog(t, ...T.fly), e = ease.outCubic(p)
    const ex = starEyes(PIS_AT[0], PIS_AT[1], PIS_AT[2], T.boop, { seed: SEED.pis, hops: HOPS.pis })
    x.save(); x.translate(lerp(PIS_AT[0], 1180, e), lerp(PIS_AT[1] - 10, 380, e) - Math.sin(p * Math.PI) * 120); x.rotate(p * 7)
    const c = { L: [ex.L[0] - PIS_AT[0], ex.L[1] - PIS_AT[1]], R: [ex.R[0] - PIS_AT[0], ex.R[1] - PIS_AT[1]], cell: ex.cell }
    drawHeartGlasses(x, c, 1 - p * 0.3)
    x.restore()
  }

  // ── the dealbreaker picker (screen space)
  function chip(cx, cy, w, h, label, sel, k, t) {
    x.save(); x.translate(cx, cy)
    const sc = sel ? 1 + (1 - ease.inQuad(clamp(k))) * 0.2 : 1
    const after = sel ? t - (t - 0) : 0
    void after
    x.scale(sc, sc)
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
    if (sel) { x.fillStyle = '#4a1236'; x.fill(); x.lineWidth = 4; x.strokeStyle = RED; x.stroke() }
    else { x.fillStyle = 'rgba(48,32,92,0.72)'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(154,123,224,0.55)'; x.stroke() }
    x.font = `700 30px ${MONO}`; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + (sel ? 46 : 0)
    let tx = -tw / 2
    if (sel) {
      const pxl = 4
      x.fillStyle = RED
      for (let q = -2; q <= 2; q++) { x.fillRect(tx + 12 + q * pxl, q * pxl - pxl / 2, pxl + 1, pxl + 1); x.fillRect(tx + 12 - q * pxl, q * pxl - pxl / 2, pxl + 1, pxl + 1) }
      tx += 46
    }
    x.fillStyle = sel ? '#fff1ea' : 'rgba(239,230,214,0.78)'; x.textAlign = 'left'
    x.fillText(label, tx, 2)
    x.restore()
  }
  function drawPanel(t) {
    if (t < T.panel[0] || t > T.panelOut[1]) return
    const k = easeOutBack(prog(t, ...T.panel), 1.8), o = 1 - ease.inCubic(prog(t, ...T.panelOut))
    const { x: L0, y: T0, w, h } = PANEL
    x.save()
    x.globalAlpha = clamp(k * 2) * o
    x.translate(L0 + w / 2, T0 + h / 2 + (1 - k) * 260 + (1 - o) * 120); x.scale(lerp(0.85, 1, k), lerp(0.85, 1, k)); x.translate(-(L0 + w / 2), -(T0 + h / 2))
    x.save(); x.shadowColor = rgba(GOLD, 0.45); x.shadowBlur = 50
    x.beginPath(); x.roundRect(L0, T0, w, h, 38)
    const g = x.createLinearGradient(0, T0, 0, T0 + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#160934')
    x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 5; x.strokeStyle = '#f2d27a'; x.beginPath(); x.roundRect(L0, T0, w, h, 38); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,210,122,0.3)'; x.beginPath(); x.roundRect(L0 + 14, T0 + 14, w - 28, h - 28, 28); x.stroke()
    const cx = L0 + w / 2
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.fillStyle = GOLD; x.font = `700 26px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText('DEALBREAKERS · PICK UP TO 3', cx, T0 + 74)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = BONE; x.font = `800 50px ${INTER}`
    x.fillText('What ends it', cx, T0 + 140); x.fillText('before it starts?', cx, T0 + 198)
    CHIPS.forEach((c, i) => {
      const sel = c.tap !== undefined && t >= T.taps[c.tap]
      const kk = sel ? prog(t, T.taps[c.tap] - 0.02, T.taps[c.tap] + 0.12) : 0
      chip(cx, CHIP_Y(i), c.tap !== undefined ? 600 : 520, 72, c.text, sel, kk, t)
      if (sel) {
        const a = t - T.taps[c.tap]
        if (a > 0 && a < 0.4) {
          const p = ease.outCubic(a / 0.4)
          x.save(); x.globalAlpha = (1 - p) * x.globalAlpha; x.fillStyle = '#ffd0d8'
          for (let q = 0; q < 14; q++) { const an = q / 14 * Math.PI * 2; x.fillRect(cx + Math.cos(an) * (310 + p * 60) - 4, CHIP_Y(i) + Math.sin(an) * (44 + p * 40) - 4, 8, 8) }
          x.restore()
        }
      }
    })
    x.fillStyle = 'rgba(239,230,214,0.62)'; x.font = `700 21px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('THESE GO ON YOUR CARD', cx, T0 + h - 34)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }

  // ── the rose tint (screen space): pink haze + vignette while the glasses are on
  function drawTint(t) {
    if (t < T.glasses || t > T.boop + 0.25) return
    const k = ease.outCubic(prog(t, T.glasses, T.glasses + 0.6)) * (t < T.boop ? 1 : 0)
    if (k > 0) {
      x.save(); x.globalCompositeOperation = 'screen'; x.fillStyle = `rgba(120,30,70,${0.26 * k})`; x.fillRect(0, 0, W, 1920); x.restore()
      const v = x.createRadialGradient(540, 900, 380, 540, 900, 1150)
      v.addColorStop(0, 'rgba(255,120,190,0)'); v.addColorStop(1, `rgba(255,110,180,${0.36 * k})`)
      x.fillStyle = v; x.fillRect(0, 0, W, 1920)
      // drifting hearts in the haze
      for (let i = 0; i < 10; i++) {
        const ph = ((t - T.glasses) * 0.16 + i * 0.1) % 1, hx = 60 + ((i * 263) % 960), hy = 1500 - ph * 1300
        x.save(); x.globalAlpha = 0.55 * k * Math.sin(ph * Math.PI); drawPixelHeart(x, hx + Math.sin(ph * 9 + i) * 20, hy, 5, '#ffb0d8'); x.restore()
      }
    }
    // clarity: a white flash when the glasses come off
    const fl = 1 - prog(t, T.boop, T.boop + 0.25)
    if (t >= T.boop && fl > 0) { x.fillStyle = `rgba(255,250,255,${0.35 * fl})`; x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        const outAll = popOut(t, T.out)
        const lessonOn = t >= T.lesson && t < T.lessonOut[1]
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        // far away: the tiny flag that has been there all along
        const farOnTop = t >= T.boop
        if (t < T.toPanel[0] && !farOnTop) drawFarFlag(t)
        drawFogBack(t)
        if (t < T.toPanel[0] && farOnTop) drawFarFlag(t)
        drawNep(t)
        drawRevealFlags(t)
        drawKiteAt(t); drawCakeAt(t)
        drawNarrator(t)
        const inPanel = t >= T.toPanel[0] && t < T.sit[0]
        // the couch + the friends (seated, or piled up to catch Pisces)
        const places = {}
        for (const id of FRIENDS) places[id] = friend(id, t)
        const couchA = !inPanel ? 1 : Math.max(1 - prog(t, T.toPanel[0], T.toPanel[0] + 0.35), prog(t, T.sit[0] - 0.3, T.sit[0]))
        if (couchA > 0) { x.save(); x.globalAlpha = outAll * couchA; x.translate(0, (1 - couchA) * 90); drawCouch(x, 540, SEAT_Y, 8, { part: 'back' }); if (inPanel) drawCouch(x, 540, SEAT_Y, 8, { part: 'front' }); x.restore() }
        if (!inPanel) {
          for (const id of FRIENDS) if (places[id].layer === 'seat') drawFriend(id, t, places[id], C)
          drawBoatAt(t)
          x.save(); x.globalAlpha = outAll; drawCouch(x, 540, SEAT_Y, 8, { part: 'front' }); x.restore()
          drawFogFront(t)
          drawPolaroidAt(t)
          drawHearts(t)
          if (t < T.toPanel[0]) {
            const piles = FRIENDS.filter(id => places[id].layer === 'pile')
            if (piles.length && t >= T.swoon[0]) { for (const id of piles) drawFriend(id, t, places[id], C); drawPisces(t) }
            else { drawPisces(t); for (const id of piles) drawFriend(id, t, places[id], C) }
          }
          for (const id of FRIENDS) if (places[id].layer === 'front') drawFriend(id, t, places[id], C)
          if (t >= T.sit[0]) drawPisces(t)
        }
        drawFlyingGlasses(t)
        if (t >= T.boop && t < T.boop + 0.75) {
          const k = pop01(t, T.boop, 0.25, 3), o = 1 - prog(t, T.boop + 0.5, T.boop + 0.75)
          x.save(); x.translate(420, 676); x.rotate(-0.16); x.scale(k, k); x.globalAlpha = o
          x.font = `700 50px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
          x.lineWidth = 10; x.strokeStyle = '#1a1030'; x.strokeText('boop!', 0, 0); x.fillStyle = TAG.vir; x.fillText('boop!', 0, 0)
          x.restore()
        }
        x.restore()
        // screen space
        if (inPanel) {
          // while everyone scrambles to their spots, the picker rises in front of them; then they're on top of it
          const scramble = t < T.toPanel[1] + 0.08
          if (!scramble) drawPanel(t)
          for (const id of FRIENDS) drawFriend(id, t, places[id], C)
          drawPisces(t)
          if (scramble) drawPanel(t)
          drawNarrator(t)
        }
        drawTint(t)
        if (t >= T.land && t < T.land + 0.8) sparkleRing(t, 540, 760, T.land + 0.02, 14, 300, 0.3)
        if (t >= T.glasses && t < T.glasses + 0.8) sparkleRing(t, 540, 760, T.glasses + 0.04, 12, 220, 0.9)
        if (t >= T.boop && t < T.boop + 0.8) sparkleRing(t, 470, 740, T.boop + 0.02, 10, 160, 0.2)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1080, T.out[0] + 0.1, 16, 420, 0.2)
        void lessonOn
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change where the old beat has cleared). The default selection keeps 14.25
// (labels → money), 25.95 (Neptune → the glasses) and 39.35 (the swoon → LESSON); 51.0 (the picker → the couch) is kept
// by hand so the last stretch gets one too. The rest are the film's own beats and play as such.
export const CUTS = [T.h1Out[1], T.cut1, T.h3Out[1] + 0.05, T.cut2, T.reveal, T.cut3, { t: T.cut4, keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Pitched SFX (pop, pluck, bell) are shifted into the score's key by the engine; chip/lead/snare/tom cues sit
//    on a private 'sfx' bus (not levelled with the music buses) and are written straight in A minor.
const A = { A3: 220, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880, C6: 1046.5, E6: 1318.51, A6: 1760 }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const tweet = (t, len = 0.22, g = 0.045) => [['chip', t, 2637, len, { ...FX, wave: 'square', duty: 0.5, arp: [0, 0, 1, 1, 0, 1], gain: g, decay: 0.04, sustain: 0.85 }], ['chip', t, 9000, len * 0.8, { ...FX, wave: 'noise', gain: g * 0.3, decay: 0.05, sustain: 0.5 }]]
const flagUp = (t, f, pan) => [['whoosh', t - 0.05, 0.22, 0.05], ['pop', t + 0.08, f, 0.045, pan], ...tweet(t + 0.1)]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.3, decay: 0.3 }], ['boom', t, 0.08], ['clap', t + 0.005, { ...FX, gain: 0.14 }], ['tick', t, 0.09]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const womp = t => [['chip', t, A.E4, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.36, A.C4 * 1.03, 0.8, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const puff = t => [['whoosh', t, 0.5, 0.035], ['chip', t, 400, 0.4, { ...FX, wave: 'noise', gain: 0.012, decay: 0.3, sustain: 0.3 }]]
const sigh = t => [['chip', t, A.A5, 0.7, { ...FX, wave: 'tri', slide: -9, vib: 0.02, gain: 0.03, decay: 0.4, sustain: 0.7 }]]
const buzz = t => Array.from({ length: 3 }, (_, i) => ['chip', +(t + i * 0.11).toFixed(3), 110, 0.07, { ...FX, wave: 'square', duty: 0.5, gain: 0.03, decay: 0.05, sustain: 0.6 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 12; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

const PITCH = { [NAME.pis]: 1320, [NAME.vir]: 1050, [NAME.sco]: 820, [NAME.cap]: 700, [NAME.stars]: 880, [NAME.him]: 560 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · this friend
  ...head(T.h0, 4, T.h0Land, 0),
  ['riser', 0.4, T.land, 0.05], ['whoosh', T.land - 0.42, 0.45, 0.09], ['boom', T.land, 0.12], ['pop', T.land + 0.01, 1318.51, 0.05, 0], ['glitter', T.land, T.land + 0.7],
  ...[0, 1, 2, 3].map(i => ['pop', +(T.land + 0.25 + i * 0.36).toFixed(3), NOTE[(i * 2 + 3) % 7], 0.022, i % 2 ? 0.4 : -0.4]),
  ['pop', T.polaroid, 1567.98, 0.04, -0.4], ['tick', T.polaroid, 0.06], ['glitter', T.polaroid, T.polaroid + 0.4],
  ['tick', T.phones[0] + 0.3, 0.07], ['tick', T.phones[0] + 0.33, 0.05], ['tick', T.phones[0] + 0.36, 0.05], ['pop', T.phones[0] + 0.33, 330, 0.03, 0],
  ['whoosh', T.glance[0], 0.2, 0.025],
  // the job
  ...head(T.h1, 1, T.h1Land, 2), ['pluck', T.glint[0] + 0.15, 1567.98, 0.025, 0.4, -0.4],
  ...flagUp(T.flagV, 1174.66, -0.4),
  // the labels
  ...head(T.h2, 1, T.h2Land, 3), ['bell', T.tear1[0], 1318.51, 0.02, 1.2, 0],
  ...flagUp(T.flagS, 1318.51, 0),
  // the money: the hush (the score winds down), crickets, darting eyes… then the giant flag
  ...head(T.h3, 1, T.h3Land, 4),
  ['tapeStop', T.hush[0], +(T.hush[1] - T.hush[0]).toFixed(3)],
  ...T.crick.flatMap(c => [...crickets(c), ...crickets(c + 0.2)]),
  ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.dart[0] + i * 0.36).toFixed(3), 0.03]),
  ['pop', T.sweat, 1760, 0.015, 0.3],
  ['whoosh', T.giant[0] - 0.12, 0.5, 0.11], ['boom', T.giant[0], 0.22], ['crash', T.giant[0], { bus: 'sfx', gain: 0.0035, len: 1.8 }],
  ...tweet(T.giant[0] + 0.05, 0.75, 0.06), ['pop', T.giant[0] + 0.3, 784, 0.04, 0],
  ...womp(T.womp), ['pop', T.roll[0] + 0.05, 440, 0.025, 0.3],
  ['whoosh', T.retract[0], 0.3, 0.03],
  // Neptune
  ...head(T.h4, 2, T.h4Land, 1), ['glitter', T.starsIn[0], T.starsIn[1]], ['bell', T.starsIn[1], 1174.66, 0.025, 1.6, 0.3],
  ['pop', T.pat + 0.2, 880, 0.025, 0], ['swell', T.nepIn[0], T.nepIn[1], { bus: 'sfx', gain: 0.02, f0: 300, f1: 1200 }],
  ...T.puffs.filter(p => p < T.thin[0]).flatMap(puff),
  // the glasses
  ...head(T.h5, 1, T.h5Land, 2),
  ['bell', T.glasses, 1318.51, 0.045, 1.8, 0], ['pop', T.glasses + 0.02, 1567.98, 0.04, 0], ['glitter', T.glasses, T.glasses + 0.7], ['pluck', T.glasses + 0.1, 1974.53, 0.02, 1.2, 0],
  ['pop', T.boat[0] + 0.25, 784, 0.035, -0.5], ['pop', T.kite[0] + 0.2, 987.77, 0.035, 0.5], ['pop', T.cake[0] + 0.1, 1174.66, 0.04, 0.4],
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.frantic[0] + 0.2 + i * 0.62).toFixed(3), 0.02]),
  ...sigh(T.l10 + 0.85),
  // glasses off
  ['whoosh', T.hopV[0] + 0.2, 0.4, 0.05], ['pop', T.boop, 1046.5, 0.06, 0], ['tick', T.boop, 0.1], ['whoosh', T.boop + 0.05, 0.5, 0.08],
  ...head(T.h6, 1, T.h6Land, 1),
  ['tick', T.flutter[0] + 0.05, 0.04], ['tick', T.flutter[0] + 0.25, 0.04],
  ['whoosh', T.pan[0] + 0.1, 0.6, 0.05], ['bell', T.pan[1] - 0.1, 1567.98, 0.03, 1.4, 0.4],
  ['pop', T.starsPeek[0], 880, 0.035, 0.4], ['tick', T.jun, 0.06], ['pop', T.jun, 659.25, 0.03, 0.4],
  // oh no
  ['whoosh', T.blow[0], 0.9, 0.1], ['swell', T.blow[0], T.blow[1], { bus: 'sfx', gain: 0.03, f0: 500, f1: 3000 }],
  ...head(T.h7, 2, T.h7Land, 0),
  ...REVEAL_FLAGS.map((_, i) => ['pop', +(T.cascade[0] + 0.2 + i * ((T.cascade[1] - T.cascade[0] - 0.2) / REVEAL_FLAGS.length)).toFixed(3), NOTE[i % 7] * (i > 6 ? 2 : 1), 0.028, ((i * 0.37) % 1) - 0.5]),
  ['chip', T.swoon[0], A.E5, 0.6, { ...FX, wave: 'tri', slide: -14, gain: 0.04, decay: 0.3, sustain: 0.7 }], ['tom', T.swoon[1], 70, { ...FX, gain: 0.2, decay: 0.25 }], ['tick', T.swoon[1], 0.06],
  ...sob(T.sob, A.C6), ...sob(T.sob + 0.55, A.A5), ...sob(T.sob + 1.1, A.C6, 2),
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // lesson.js plays its level-up chiptune on the 'fx' bus, which the screwed preset levels down with the vinyl crackle
  // (−21 here vs −9 in the other styles): double it, same notes and times (A minor), on this film's own sfx bus
  ...[A.A4, A.C5, A.E5, A.A5, A.C6].map((f, i) => ['chip', +(LESSON.at + i * 0.075).toFixed(3), f, 0.09, { ...FX, duty: 0.25, gain: 0.03, decay: 0.08, sustain: 0.6, dly: 0.1 }]),
  ['chip', +(LESSON.at + 0.38).toFixed(3), A.C6, 0.62, { ...FX, duty: 0.25, arp: [0, 4, 7, 12], gain: 0.026, decay: 0.4, sustain: 0.55, vib: 0.004 }],
  ['chip', +(LESSON.at + 0.38).toFixed(3), A.C5, 0.62, { ...FX, wave: 'tri', gain: 0.03, decay: 0.4, sustain: 0.6 }],
  // the picker
  ...head(T.h8, 2, T.h8Land, 3), ['whoosh', T.panel[0], 0.4, 0.06],
  ...T.taps.flatMap(stamp), ...T.taps.map((s, i) => ['pop', s + 0.22, NOTE[(i * 2) % 7], 0.03, 0]),
  ['pop', T.gasp, 392, 0.04, 0], ...cheers(T.melt, T.melt + 1.4), ...sob(T.melt + 0.2, A.E6, 2),
  // love is blind
  ...head(T.h9, 4, T.h9Land, 1), ...buzz(T.buzz[0]), ...womp(T.womp2), ['pop', T.roll2[0] + 0.05, 440, 0.025, 0],
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
