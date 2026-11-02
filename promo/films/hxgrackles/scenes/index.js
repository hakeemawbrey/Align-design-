// hxgrackles — "Nature's Loudest First Date." (45 s vertical Align ad, Star Talk "Wild Lessons", Houston: a nature
// documentary; music: cinematic · Dm). Story 0–40.6, then the shared end card. No show bug.
//   0.0–4.5    "Nature's *loudest* | first date."  A Houston parking lot at dusk under the night sky: a skyline on the
//              horizon, parked cars, a light pole, a shopping cart. A male great-tailed grackle is already mid-display on
//              the cart handle (puffed, beak to the sky). A hushed NARRATOR star in a pith helmet peeks from a shrub.
//              NARRATOR: "shh. here, in the wild… parking lot."
//   4.6–8.8    "The *puff.*"  Telephoto push-in; he puffs up enormous on the drop. Lower third: Quiscalus mexicanus ·
//              GREAT-TAILED GRACKLE · MALE. NARRATOR: "to impress her, he becomes… a lot."
//   8.85–11.9  "The *song.*"  Beak up: SKREEEK. A parked car's alarm goes off (Pisces is crying in its back seat, as ever).
//              Binoculars on the female up on the light pole: she tilts her head… and turns away. NARRATOR: "it sounds
//              like a rusty gate."
//   12.0–15.2  "The *strut.*"  He hops down and struts the parking stripes, kicks a fry. NARRATOR: "no plan. only
//              confidence."
//  15.3        the one card cut.
//  15.35–18.8 "Meanwhile, | a *first date.*"  A café patio under string lights: ♌ LEO puffs up its points, ♎ LIBRA
//              preens in a pocket mirror. The grackle watches from the railing. Lower thirds: Stella leonis · LEO,
//              Stella librae · LIBRA. NARRATOR: "remarkable. the same display."
//  18.85–21.5 "The *mating call.*"  LEO: "so I basically run my office."  LIBRA's too-loud laugh: HA HA HA.
//  21.6–26.05 "Then, something | *rare.*"  Leo deflates (pffft). LEO: "ok honestly? I'm so nervous."  Libra drops the
//              mirror. LIBRA: "oh thank god. me too."
//  26.15–28.7 "A sincere | *squawk.*"  They laugh; hearts. On the railing the grackle unpuffs, gives one soft chirp,
//              and the female lands beside him. Lower third: Sinceritas rara · OBSERVED: ONE REAL MOMENT.
//  28.93      ★ LESSON UNLOCKED: "Nobody's *smooth.* | Be sincere." (+1 SINCERE)
//  33.5–37.85 "Talk cards ask | the *real* thing."  A talk card ("What are you | *nervous* about?"); both play a
//              face-down answer; both flip: "This date." ✓ ✓  NARRATOR: "talk cards skip the puffing."
//  37.95–40.42 "Squawk *sincerely.*"  Whip-pan back to the lot (frame 0's shot, changed): Leo and Libra sit in the
//              cart, the two grackles share the handle, everyone chirps; Pisces sobs happily in the car. Everything
//              clears by 40.42; the end card takes over at 40.6.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, GOLD, BONE, PINK, LAV, SUN, SKYBLUE, INTER, MONO, SERIF, BEAT, R, bitmap, rgba, pop01, outK, popOut, inW, bump, keyed, S_, win,
  drawBubble, drawPixelHeart, drawTissue, makeFx, drawCardBack, drawTalkCard, drawAnswerCard, SND } from './kit.js'

export { BEAT }
export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
export const KEY = 'Dm'

const LEO = signStar('leo'), LIB = signStar('libra'), PIS = signStar('pisces')
const LEO_T = '#ffb45c', LIB_T = '#ff9fd0', NAR_T = '#cfe8a0'

// ── the timeline
export const T = {
  h0Out: [4.3, 4.48], l1: -2.0,
  // the puff
  h1: 4.6, h1Land: BEAT(8), h1Out: [8.62, 8.78], tele: [4.6, 8.75], bigPuff: BEAT(8), flick: [6.2, 7.4], l2: 4.9, lt1: [4.75, 8.6],
  // the song
  h2: 8.85, h2Land: 9.2, h2Out: [11.75, 11.9], scream: [9.25, 10.35], alarm: [9.45, 11.2], l3: 9.25, bino: [10.45, 11.8], tilt: 10.8, away: 11.35, lt2: [10.6, 11.75],
  // the strut
  h3: 12.0, h3Land: 12.3, h3Out: [15.06, 15.2], hopDown: [12.05, 12.4], strut: [12.4, 15.25], kick: 13.9, l4: 12.1, closeA: 15.1,
  cut: 15.3,
  // the date
  h4: 15.36, h4Land: 15.8, h4Out: [18.6, 18.75], l5: 15.9, lt3: [16.0, 17.35], lt4: [17.45, 18.7],
  h5: 18.85, h5Land: 19.2, h5Out: [21.36, 21.5], l6: 19.0, laugh: 20.5,
  h6: 21.6, h6Land: 22.0, h6Out: [25.9, 26.05], deflate: 21.62, l7: 21.85, l8: 24.9, drop: 24.95,
  h6b: 26.15, h6bLand: 26.5, h6bOut: [28.55, 28.7], laughs: 26.2, chirp: 26.3, land: [26.35, 26.95], lt5: [26.4, 28.6], closeB: 27.75,
  // the lesson
  lesson: BEAT(51), lessonOut: [33.25, 33.45],
  // talk cards
  h7: 33.5, h7Land: BEAT(60), h7Out: [37.7, 37.85], tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l9: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.5, 37.8], closeC: 37.7,
  // the last line
  whip: [37.82, 38.2], h8: 38.0, h8Land: BEAT(68), chirps: [38.6, 39.1, 39.55], heart: 38.7, out: [39.98, 40.42], h8Out: [40.18, 40.42],
}

// ── the lines
const SNAR = '◉ THE NARRATOR', SLEO = `${LEO.glyph}︎ LEO`, SLIB = `${LIB.glyph}︎ LIBRA`
const LINES_A = [
  { t: T.l1, speaker: SNAR, color: NAR_T, text: 'shh. here, in the wild… *parking lot.*' },
  { t: T.l2, speaker: SNAR, color: NAR_T, text: 'to impress her, he becomes… *a lot.*' },
  { t: T.l3, speaker: SNAR, color: NAR_T, text: 'it sounds like a *rusty gate.*' },
  { t: T.l4, speaker: SNAR, color: NAR_T, text: 'no plan. only *confidence.*' },
]
const LINES_B = [
  { t: T.l5, speaker: SNAR, color: NAR_T, text: 'remarkable. the *same* display.' },
  { t: T.l6, speaker: SLEO, color: LEO_T, text: 'so I basically *run* my office.' },
  { t: T.l7, speaker: SLEO, color: LEO_T, text: "ok honestly? I'm *so* nervous." },
  { t: T.l8, speaker: SLIB, color: LIB_T, text: 'oh thank god. *me too.*' },
]
const LINES_C = [{ t: T.l9, speaker: SNAR, color: NAR_T, text: 'talk cards skip the *puffing.*' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const HOPS = {
  nar: [...talkHops(LINES_A, SNAR, { cps: CPS }), ...talkHops(LINES_B, SNAR, { cps: CPS }), ...talkHops(LINES_C, SNAR, { cps: CPS })],
  leo: talkHops(LINES_B, SLEO, { cps: CPS }), lib: talkHops(LINES_B, SLIB, { cps: CPS }),
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Nobody’s *smooth.* | Be sincere.', chip: 'SINCERE ★', accentColor: GOLD, dim: 0.62 }

// ── where things are (world coords; the lot is x 0…1080, the café patio x 1080…2160)
const PX0 = 1080
const HORIZON = 1090
const POLE = { x: 112, top: 600 }, FEM_POLE = [196, 590]
const CART = { x0: 430, x1: 760, top: 1080, bot: 1196, handle: [190, 440, 1056] }
const MALE_CART = [372, 1056], MALE_END = [244, 1056], FEM_END = [436, 1056]
const STRUT_Y = 1330
const CAR_A = { cx: 300, w: 360, col: '#b8455a' }, CAR_P = { cx: 870, w: 390, col: '#3f8f9a' }
const RAIL = { x0: PX0 + 820, y: 970 }, MALE_RAIL = [PX0 + 920, 970], FEM_RAIL = [PX0 + 1010, 970]
const LEO_P = [PX0 + 320, 1105, 240], LIB_P = [PX0 + 760, 1105, 240]
const LEO_CART = [528, 1040, 190], LIB_CART = [672, 1040, 190]
const CAFE_WIN = { x0: PX0 + 100, x1: PX0 + 470, y0: 720, y1: 990 }
const NAR = [962, 1362, 128]
const SEED = { leo: 5, lib: 8, pis: 23, nar: 11 }

const LEO_K = [
  [0, S_('happy', [1, 0])], [T.h4, S_('happy', [1, -1], { sq: -0.04 })], [T.l6, S_('happy', [1, 0])], [T.laugh, S_('wide', [1, 0], { blink: false })],
  [T.deflate, S_('wide', [0, 1], { blink: false })], [T.deflate + 0.5, S_('neutral', [0, 1], { blink: 0.35 })], [T.l7 + 0.9, S_('neutral', [1, 0], { blink: 0.3 })],
  [T.l8, S_('wide', [1, 0], { blink: false })], [T.l8 + 0.7, S_('happy', [1, 0])], [T.laughs, S_('happy', [0, 0])], [T.laughs + 0.8, S_('heart', [1, 0])],
  [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('happy', [1, 0])],
  [T.whip[0], S_('heart', [1, 0])], [39.0, S_('happy', [0, 0])], [39.5, S_('heart', [1, 0])],
]
const LIB_K = [
  [0, S_('squint', [1, 0])], [T.h4, S_('squint', [1, 0], { blink: false })], [T.h4 + 1.1, S_('sparkle', [1, 0])], [T.l6, S_('sparkle', [-1, 0])],
  [T.laugh, S_('happy', [-1, -1])], [T.laugh + 0.9, S_('sparkle', [-1, 0])],
  [T.deflate, S_('wide', [-1, 0], { blink: false })], [T.deflate + 0.8, S_('wide', [-1, 0])], [T.l8, S_('happy', [-1, 0])],
  [T.laughs, S_('happy', [0, 0])], [T.laughs + 0.8, S_('heart', [-1, 0])],
  [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('happy', [-1, 0])],
  [T.whip[0], S_('heart', [-1, 0])], [39.2, S_('happy', [0, 0])], [39.7, S_('heart', [-1, 0])],
]

// ── the grackle (pixel art, facing right; anchor = between the feet)
const G_CALM = [
  '.............OOOO.......',
  '............OKKKKO......',
  '...........OKKKKYEO.....',
  '...........OKKKKKKOOOO..',
  '...........OKKKKKKLLLLO.',
  '..........OKKBKKKOOOO...',
  'OOO......OKKBBKKKO......',
  'OKKOO...OKKBPBKKKO......',
  '.OKKKOOOKKBPPBKKKO......',
  '..OKKKKKKKBPBKKKO.......',
  '...OOKKKKKKBBKKO........',
  '.....OOOKKKKKKO.........',
  '........OOOOOO..........',
  '.........L..L...........',
  '.........L..L...........',
  '........LL.LL...........',
]
const G_PUFF = [
  '...............OO.......',
  '..............OLLO......',
  '..............OLLO......',
  '.............OKKKKO.....',
  '............OKKYEKO.....',
  '...O.O.O...OKKKKKKO.....',
  '..OKOKOKO.OKKBKKKKKO....',
  '.OKKKKKKKOKKBBKKKKKKO...',
  'OKKKKKKKKKKBBPBKKKKKO...',
  '.OKKKKKKKKBBPPBKKKKKO.O.',
  '..OKKKKKKKKBPBKKKKKKOKO.',
  '.OKKKKKKKKKKBBKKKKKO.O..',
  '..OOKKKKKKKKKKKKKKO.....',
  '....OOOKKKKKKKKKOO......',
  '.......OOOOOOOOO........',
  '.........L....L.........',
  '.........L....L.........',
  '........LL...LL.........',
]
const G_FOOT = { calm: 10.5, puff: 12 }   // the column between the feet
function grackle(x, fx, fy, px, t, { dir = 1, female = false, puff = 0, scale = 1, rot = 0, alpha = 1, dy = 0 } = {}) {
  if (alpha <= 0.01) return
  const rows = puff > 0.5 ? G_PUFF : G_CALM, foot = puff > 0.5 ? G_FOOT.puff : G_FOOT.calm
  const sh = 0.5 + 0.5 * Math.sin(t * 2.4 + fx * 0.01)
  const pal = female
    ? { O: '#120a12', K: '#6e4a34', B: '#8a6044', P: '#9c7252', Y: '#efd98c', E: '#120a12', L: '#3a2a26' }
    : { O: '#0b0814', K: '#1e1832', B: sh > 0.5 ? '#3b4fb0' : '#344296', P: sh > 0.5 ? '#6b3fa6' : '#7a4ab8', Y: '#ffe24a', E: '#0b0814', L: '#2c2740' }
  x.save(); x.globalAlpha *= alpha
  x.translate(fx, fy + dy); x.rotate(rot); x.scale(dir * scale, scale)
  bitmap(x, rows, pal, -foot * px, -rows.length * px, px)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 500 48px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { ono, sparkleRing, tears, streaks } = makeFx(x)
  const maskC = document.createElement('canvas'); maskC.width = W; maskC.height = H

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Nature’s *loudest* | first date.', { top: 172, size: 104, accentSize: 150, at: -2, late: 1, lateAt: -1, accentColor: SUN })
  const H1 = popText(root, 'The *puff.*', { top: 196, size: 124, accentSize: 190, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GOLD })
  const H2 = popText(root, 'The *song.*', { top: 196, size: 124, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: SKYBLUE })
  const H3 = popText(root, 'The *strut.*', { top: 196, size: 124, accentSize: 190, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Meanwhile, | a *first date.*', { top: 172, size: 100, accentSize: 150, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: LEO_T, fit: true })
  const H5 = popText(root, 'The *mating call.*', { top: 196, size: 104, accentSize: 160, at: T.h5, late: 2, lateAt: T.h5Land, wobble: true, accentColor: GOLD, fit: true })
  const H6 = popText(root, 'Then, something | *rare.*', { top: 172, size: 100, accentSize: 176, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV })
  const H6b = popText(root, 'A sincere | *squawk.*', { top: 172, size: 104, accentSize: 176, at: T.h6b, late: 1, lateAt: T.h6bLand, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'Talk cards ask | the *real* thing.', { top: 168, size: 92, accentSize: 140, at: T.h7, late: 2, lateAt: T.h7Land, wobble: true, accentColor: LAV, fit: true })
  const H8 = popText(root, 'Squawk *sincerely.*', { top: 196, size: 108, accentSize: 168, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, gap: 0.08, accentColor: PINK, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H6b, T.h6bOut], [H7, T.h7Out], [H8, T.h8Out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1478, width: 960, height: 290, open: -2.3, close: T.closeA, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1478, width: 960, height: 290, open: T.l5 - 0.24, close: T.closeB, cps: CPS })
  const boxC = dialogueBox(root, { lines: LINES_C, y: 1478, width: 960, height: 290, open: T.l9 - 0.24, close: T.closeC, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── camera: world (fx, fy) maps to the screen (540, 1000) at scale s
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    if (t < T.cut) {
      s = 1 + 0.025 * ease.inOutQuad(prog(t, 0, 4.4))
      const kt = ease.inOutCubic(prog(t, T.tele[0], T.tele[0] + 0.4)) * (1 - ease.inOutCubic(prog(t, T.tele[1] - 0.3, T.tele[1] + 0.1)))
      s = lerp(s, 1.75 + 0.06 * prog(t, T.tele[0], T.tele[1]), kt); fx = lerp(fx, 420, kt); fy = lerp(fy, 975, kt)
      const kb = ease.inOutCubic(prog(t, T.bino[0], T.bino[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, T.bino[1] - 0.15, T.bino[1] + 0.05)))
      s = lerp(s, 2.6, kb); fx = lerp(fx, FEM_POLE[0] + 10, kb); fy = lerp(fy, FEM_POLE[1] - 56, kb)
      const ks = ease.inOutCubic(prog(t, T.strut[0] - 0.2, T.strut[0] + 0.3))
      s = lerp(s, 1.18, ks); fx = lerp(fx, 500, ks); fy = lerp(fy, 1110, ks)
    } else if (t < T.whip[0]) {
      fx = PX0 + 540
      const kc = win(t, T.h5, T.h6 - 0.1, 0.35)
      s = 1 + 0.08 * kc; fx = lerp(fx, LEO_P[0] + 60, kc); fy = lerp(fy, 1040, kc)
      const kr = ease.inOutCubic(prog(t, T.h6, T.h6 + 3.0)) * (1 - ease.inOutCubic(prog(t, T.laughs, T.laughs + 0.6)))
      s += 0.14 * kr; fy = lerp(fy, 1080, kr)
    } else {
      const p = ease.inOutCubic(prog(t, ...T.whip))
      fx = lerp(PX0 + 540, 540, p)
      const ke = ease.inOutCubic(prog(t, T.whip[1], T.whip[1] + 0.6))
      s = lerp(1, 1.32, ke) + 0.03 * ease.inOutQuad(prog(t, T.whip[1], T.out[0])); fx = lerp(fx, 450, ke); fy = lerp(fy, 1010, ke)
    }
    s += 0.05 * bump(t, T.bigPuff, 0.35) + 0.03 * bump(t, T.scream[0], 0.3) + 0.03 * bump(t, T.deflate, 0.3) + 0.03 * bump(t, T.laughs, 0.35)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.bigPuff, 8], [T.scream[0], 7], [T.scream[1], 5], [T.alarm[0], 4], [T.laugh, 4], [T.drop + 0.25, 4]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  const worldK = t => 1 - ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))

  // ── the lot
  function drawSkyline(t) {
    const B = [[0, 150, 170], [150, 90, 250], [240, 110, 200], [350, 70, 300], [420, 120, 360], [540, 80, 280], [620, 130, 230], [750, 70, 320], [820, 120, 190], [940, 140, 260]]
    for (const [bx, bw, bh] of B) {
      R(x, bx, HORIZON - bh, bw - 8, bh, '#221535')
      for (let wy = HORIZON - bh + 24; wy < HORIZON - 20; wy += 34) for (let wx = bx + 14; wx < bx + bw - 26; wx += 26) {
        const on = ((wx * 7 + wy * 13) % 11) < 3
        if (on) R(x, wx, wy, 10, 14, `rgba(255,207,106,${0.35 + 0.15 * Math.sin(t * 0.7 + wx)})`)
      }
    }
    // a low glow along the horizon (the city at dusk)
    const g = x.createLinearGradient(0, HORIZON - 260, 0, HORIZON)
    g.addColorStop(0, 'rgba(255,140,90,0)'); g.addColorStop(1, 'rgba(255,140,90,0.22)')
    x.fillStyle = g; x.fillRect(-300, HORIZON - 260, W + 600, 260)
  }
  function drawAsphalt(x0, x1) {
    const g = x.createLinearGradient(0, HORIZON, 0, H + 200)
    g.addColorStop(0, '#3c3554'); g.addColorStop(0.4, '#2a2440'); g.addColorStop(1, '#16122a')
    x.fillStyle = g; x.fillRect(x0, HORIZON, x1 - x0, H + 400 - HORIZON)
    R(x, x0, HORIZON, x1 - x0, 6, '#4c4468')
    // parking stripes in perspective
    x.fillStyle = 'rgba(239,230,214,0.32)'
    for (let k = -2; k < 9; k++) {
      const xt = x0 + 60 + k * 150, xb = x0 + 60 + (k - 4) * 290
      x.beginPath(); x.moveTo(xt, HORIZON + 70); x.lineTo(xt + 10, HORIZON + 70); x.lineTo(xb + 22, H + 300); x.lineTo(xb, H + 300); x.closePath(); x.fill()
    }
    // oil stains and pebbles
    for (let i = 0; i < 30; i++) { const px = x0 + (i * 157.3) % (x1 - x0), py = HORIZON + 40 + (i * 61.7) % 700; R(x, px, py, 6 + (i % 2) * 6, 6, i % 3 ? 'rgba(200,190,230,0.12)' : 'rgba(10,6,20,0.3)') }
  }
  function drawCar(cx, by, w, col, t, { alarm = 0 } = {}) {
    const h = w * 0.36, x0 = cx - w / 2
    R(x, x0 - 6, by - h * 0.55 - 6, w + 12, h * 0.55 + 6, OUT)
    R(x, x0, by - h * 0.55, w, h * 0.55 - 10, col)
    R(x, x0, by - h * 0.55, w, 8, 'rgba(255,255,255,0.18)')
    // the cabin
    const c0 = x0 + w * 0.18, c1 = x0 + w * 0.82, ct = by - h - 4
    R(x, c0 - 6, ct - 6, c1 - c0 + 12, h * 0.45 + 12, OUT)
    R(x, c0, ct, c1 - c0, h * 0.45 + 6, col)
    const win0 = { x0: c0 + 12, x1: (c0 + c1) / 2 - 6, y0: ct + 10, y1: ct + h * 0.45 }
    const win1 = { x0: (c0 + c1) / 2 + 6, x1: c1 - 12, y0: ct + 10, y1: ct + h * 0.45 }
    for (const wv of [win0, win1]) R(x, wv.x0, wv.y0, wv.x1 - wv.x0, wv.y1 - wv.y0, '#2a3d5c')
    // wheels
    for (const wx of [x0 + w * 0.2, x0 + w * 0.8]) { R(x, wx - 32, by - 30, 64, 40, OUT); R(x, wx - 22, by - 22, 44, 26, '#4a4660') }
    // lights (the alarm blinks them)
    const on = alarm > 0 && Math.floor(t * 6) % 2 === 0
    R(x, x0 + 4, by - h * 0.45, 22, 14, on ? '#ffd23f' : '#ffcf8a'); R(x, x0 + w - 26, by - h * 0.45, 22, 14, on ? '#ff5a5a' : '#c8324a')
    if (on) {
      for (const lx of [x0 + 15, x0 + w - 15]) { const g = x.createRadialGradient(lx, by - h * 0.4, 0, lx, by - h * 0.4, 90); g.addColorStop(0, 'rgba(255,200,80,0.5)'); g.addColorStop(1, 'rgba(255,200,80,0)'); x.fillStyle = g; x.fillRect(lx - 90, by - h * 0.4 - 90, 180, 180) }
    }
    return { win0, win1 }
  }
  function drawPole(t) {
    const { x: px, top } = POLE
    R(x, px - 13, top - 4, 26, HORIZON + 70 - top, OUT); R(x, px - 8, top, 16, HORIZON + 66 - top, '#59526e')
    R(x, px - 8, top, 4, HORIZON + 66 - top, '#6e6788')
    // the arm + lamp head (the female perches on top)
    R(x, px, top + 10, 70, 12, OUT); R(x, px + 4, top + 12, 62, 8, '#59526e')
    R(x, px + 44, top - 4, 92, 30, OUT); R(x, px + 48, top, 84, 22, '#6e6788'); R(x, px + 52, top + 22, 76, 8, '#fff1b0')
    const g = x.createLinearGradient(0, top + 30, 0, HORIZON + 60)
    g.addColorStop(0, `rgba(255,236,170,${0.22 + 0.02 * Math.sin(t * 9)})`); g.addColorStop(1, 'rgba(255,236,170,0)')
    x.fillStyle = g; x.beginPath(); x.moveTo(px + 52, top + 30); x.lineTo(px + 128, top + 30); x.lineTo(px + 300, HORIZON + 60); x.lineTo(px - 120, HORIZON + 60); x.closePath(); x.fill()
  }
  function drawCart(front) {
    const { x0, x1, top, bot } = CART, [h0, h1, hy] = CART.handle
    if (!front) {
      // the back wall of the basket + wheels + the handle
      R(x, x0 - 4, top - 4, x1 - x0 + 8, 8, OUT)
      for (const wx of [x0 + 40, x1 - 30]) { R(x, wx - 18, bot + 40, 36, 30, OUT); R(x, wx - 11, bot + 46, 22, 18, '#3c3854') }
      R(x, x0 + 10, bot + 24, x1 - x0 - 20, 10, OUT); R(x, x0 + 16, bot + 26, x1 - x0 - 32, 6, '#a8a4c0')
      for (const lx of [x0 + 30, x1 - 30]) R(x, lx - 4, bot, 8, 44, '#8c88a6')
      R(x, h0 - 6, hy - 6, h1 - h0 + 12, 18, OUT); R(x, h0, hy - 2, h1 - h0, 10, '#c8324a')
      R(x, h1 - 4, hy, 10, top - hy + 6, '#8c88a6')
      return
    }
    // the wire basket in front (anyone sitting in it shows through)
    x.fillStyle = '#b8b4d0'
    for (let gx2 = x0; gx2 <= x1; gx2 += 30) { const sk = (gx2 - x0) / (x1 - x0); x.fillRect(Math.round(gx2 + sk * -16), top, 5, bot - top) }
    for (let gy = top; gy <= bot; gy += 26) x.fillRect(x0 - 8 * (gy - top) / (bot - top), gy, x1 - x0, 5)
    R(x, x0 - 6, top - 6, x1 - x0 + 12, 12, OUT); R(x, x0 - 4, top - 4, x1 - x0 + 8, 8, '#d8d4ec')
    R(x, x0 - 12, bot - 2, x1 - x0 + 8, 10, '#8c88a6')
  }
  function drawShrubLot(cx, by, w) {
    for (const [dx, dy, r, c] of [[-0.35, -0.2, 0.32, '#2f6a4c'], [0.3, -0.25, 0.34, '#2f6a4c'], [0, -0.45, 0.36, '#3f8a5a'], [-0.1, -0.15, 0.3, '#3f8a5a'], [0.15, -0.6, 0.18, '#58aa72']]) {
      const rr2 = r * w, cx2 = cx + dx * w, cy2 = by + dy * w
      for (let yy = -rr2; yy <= rr2; yy += 8) { const hw = Math.sqrt(Math.max(0, rr2 * rr2 - yy * yy)); R(x, cx2 - hw, cy2 + yy, hw * 2, 8, c) }
    }
    R(x, cx - w * 0.55, by - 4, w * 1.1, 14, '#2a2440')
  }
  function drawPottedPlant(cx, by, w) {
    for (const [dx, dy, a] of [[-0.2, -0.7, -0.5], [0.2, -0.75, 0.5], [0, -0.9, 0], [-0.32, -0.5, -0.9], [0.34, -0.52, 0.9]]) {
      x.save(); x.translate(cx + dx * w * 0.4, by - w * 0.32); x.rotate(a)
      R(x, -10, dy * w * 0.6, 20, -dy * w * 0.6, '#3f8a5a'); R(x, -4, dy * w * 0.6, 8, -dy * w * 0.6, '#6cc08a')
      x.restore()
    }
    R(x, cx - w * 0.36, by - w * 0.36, w * 0.72, w * 0.36, OUT); R(x, cx - w * 0.32, by - w * 0.33, w * 0.64, w * 0.31, '#c8643a'); R(x, cx - w * 0.36, by - w * 0.36, w * 0.72, 14, '#e07a48')
  }

  // ── the patio
  function drawPatio(t) {
    const xa = PX0, xb = PX0 + 1080
    // floor tiles
    for (let ty = 1200, r = 0; ty < H + 300; ty += 70, r++) for (let tx = xa - 70, c = 0; tx < xb + 70; tx += 90, c++) R(x, tx + (r % 2) * 45, ty, 88, 68, (r + c) % 2 ? '#3a2a40' : '#33243a')
    R(x, xa, 1196, 1080, 10, '#1c1226')
    // the café wall
    R(x, xa, 560, 1080, 640, '#5a2e3c')
    for (let by = 580, r = 0; by < 1196; by += 34, r++) { R(x, xa, by, 1080, 4, '#45222f'); for (let bx = xa + (r % 2) * 40; bx < xb; bx += 80) R(x, bx, by, 4, 34, '#45222f') }
    // the window, lit warm
    const wv = CAFE_WIN
    R(x, wv.x0 - 12, wv.y0 - 12, wv.x1 - wv.x0 + 24, wv.y1 - wv.y0 + 24, OUT)
    const g = x.createLinearGradient(0, wv.y0, 0, wv.y1); g.addColorStop(0, '#ffcf6a'); g.addColorStop(1, '#e08a3c')
    x.fillStyle = g; x.fillRect(wv.x0, wv.y0, wv.x1 - wv.x0, wv.y1 - wv.y0)
    // awning
    for (let k = 0; k < 9; k++) R(x, wv.x0 - 30 + k * 48, 640, 48, 50, k % 2 ? '#efe6d6' : '#2f7a5a')
    R(x, wv.x0 - 34, 636, 440, 8, OUT); R(x, wv.x0 - 34, 690, 440, 8, OUT)
    // the sign
    R(x, wv.x0 + 70, 572, 230, 56, OUT); R(x, wv.x0 + 76, 578, 218, 44, '#efd9a8')
    x.fillStyle = '#3a1c18'; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAFÉ', wv.x0 + 185, 601)
    // the door
    R(x, xa + 560, 760, 150, 440, OUT); R(x, xa + 568, 768, 134, 432, '#3c2440'); R(x, xa + 584, 790, 102, 170, '#ffcf6a'); R(x, xa + 680, 990, 12, 12, GOLD)
    // the railing
    R(x, RAIL.x0, RAIL.y - 6, xb - RAIL.x0 + 40, 16, OUT); R(x, RAIL.x0, RAIL.y - 2, xb - RAIL.x0 + 40, 8, '#2a2236')
    for (let px = RAIL.x0 + 10; px < xb + 40; px += 46) R(x, px, RAIL.y + 6, 10, 1200 - RAIL.y - 6, '#2a2236')
    R(x, RAIL.x0, 1120, xb - RAIL.x0 + 40, 8, '#2a2236')
    // string lights
    for (let i = 0; i <= 26; i++) {
      const u = i / 26, bx = lerp(xa - 20, xb + 20, u), by = 500 + Math.sin(u * Math.PI * 2) * 0 + Math.sin(u * Math.PI) * 70
      if (i) { const pu = (i - 1) / 26; x.strokeStyle = '#1a1030'; x.lineWidth = 3; x.beginPath(); x.moveTo(lerp(xa - 20, xb + 20, pu), 500 + Math.sin(pu * Math.PI) * 70); x.lineTo(bx, by); x.stroke() }
      if (i % 2 === 0) {
        const tw = 0.75 + 0.25 * Math.sin(t * 3 + i * 1.7)
        const gg = x.createRadialGradient(bx, by + 16, 0, bx, by + 16, 40); gg.addColorStop(0, `rgba(255,214,120,${0.45 * tw})`); gg.addColorStop(1, 'rgba(255,214,120,0)')
        x.fillStyle = gg; x.fillRect(bx - 40, by - 24, 80, 80)
        R(x, bx - 6, by + 6, 12, 18, `rgba(255,236,170,${tw})`)
      }
    }
  }
  function drawTable(t) {
    const cx = PX0 + 540, ty = 1236
    R(x, cx - 14, ty, 28, 170, OUT); R(x, cx - 8, ty, 16, 166, '#5a5070')
    R(x, cx - 90, ty + 160, 180, 18, OUT)
    x.fillStyle = OUT; x.beginPath(); x.ellipse(cx, ty, 196, 40, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d8d4ec'; x.beginPath(); x.ellipse(cx, ty - 4, 188, 32, 0, 0, Math.PI * 2); x.fill()
    // two cups
    for (const dx of [-80, 80]) { R(x, cx + dx - 22, ty - 46, 44, 40, OUT); R(x, cx + dx - 18, ty - 42, 36, 34, '#fffaf0'); R(x, cx + dx + 18, ty - 34, 12, 16, OUT); const s = Math.sin(t * 2 + dx); x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(cx + dx - 4 + s * 4, ty - 80, 6, 24) }
  }

  // ── the cast
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, scale = 1, color } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = color || (id === 'leo' ? LEO.color : id === 'lib' ? LIB.color : id === 'pis' ? PIS.color : STAR.sky)
    const g = glyph && sz >= 120 ? (id === 'leo' ? LEO.glyph : id === 'lib' ? LIB.glyph : null) : null
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz * scale, t, { color: col, glyph: g, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, alpha })
    return { ...r, c: r.size / 36 }
  }
  // the male grackle: where, how puffed, which way
  function maleState(t) {
    if (t < T.cut) {
      let puff = 1
      if (t < T.h1) puff = inW(t, 1.55, 2.6) ? 0 : 1
      let big = ease.outBack(prog(t, T.bigPuff - 0.05, T.bigPuff + 0.25)) * (1 - ease.inCubic(prog(t, T.h1Out[0], T.h1Out[1] + 0.2)))
      big += 0.06 * (bump(t, T.flick[0], 0.25) + bump(t, T.flick[1], 0.25))
      let [fx, fy] = MALE_CART, dir = -1, rot = 0, dy = 0
      if (inW(t, 1.45, 1.65) || inW(t, 2.55, 2.75)) dy = -10
      if (t >= T.hopDown[0]) {
        const p = prog(t, ...T.hopDown), e = ease.inOutQuad(p)
        fx = lerp(MALE_CART[0], 330, e); fy = lerp(MALE_CART[1], STRUT_Y, e) - Math.sin(p * Math.PI) * 120
        puff = 0.8
      }
      if (t >= T.strut[0]) {
        // strutting: across and back, chest out, a bob per step
        const u = (t - T.strut[0])
        const ph = u / 1.45, leg = Math.floor(ph) % 2, f = ph % 1
        fx = leg === 0 ? lerp(330, 680, f) : lerp(680, 330, f); dir = leg === 0 ? 1 : -1
        fy = STRUT_Y; dy = -Math.abs(Math.sin(u * Math.PI * 3.2)) * 18; rot = 0.08 * Math.sin(u * Math.PI * 3.2)
        puff = 1
      }
      const beak = inW(t, T.scream[0] - 0.1, T.scream[0] + 0.5) || inW(t, T.scream[1] - 0.1, T.scream[1] + 0.5)
      return { fx, fy, dir, puff, scale: 1 + 0.3 * clamp(big) + (beak ? 0.06 : 0), rot, dy, px: 13 }
    }
    if (t < T.whip[0]) {
      // on the patio railing, watching the date
      const turn = t >= T.land[0] + 0.2 ? 1 : -1
      const dy = -14 * bump(t, T.chirp, 0.25) - 10 * bump(t, T.deflate + 0.3, 0.25)
      const tilt = inW(t, T.deflate + 0.2, T.deflate + 1.6) ? -0.18 : inW(t, T.l8, T.l8 + 1.2) ? 0.16 : 0
      const puff = t < T.deflate + 0.4 ? 1 : 0
      return { fx: MALE_RAIL[0], fy: MALE_RAIL[1], dir: turn, puff, scale: 1, rot: tilt, dy, px: 7 }
    }
    const dy = -12 * Math.max(...T.chirps.map(c => bump(t, c, 0.24)))
    return { fx: MALE_END[0], fy: MALE_END[1], dir: 1, puff: 0, scale: 1, rot: 0, dy, px: 10 }
  }
  function femState(t) {
    if (t < T.cut) {
      const dir = t >= T.away ? -1 : 1
      const rot = inW(t, T.tilt, T.away) ? -0.25 : 0
      return { fx: FEM_POLE[0], fy: FEM_POLE[1], dir, rot, dy: 0, px: 7, alpha: 1 }
    }
    if (t < T.whip[0]) {
      if (t < T.land[0]) return null
      const p = prog(t, ...T.land), e = ease.outCubic(p)
      return { fx: lerp(PX0 + 1200, FEM_RAIL[0], e), fy: lerp(760, FEM_RAIL[1], e) - Math.sin(p * Math.PI) * 60, dir: -1, rot: (1 - p) * 0.4, dy: 0, px: 6, alpha: 1 }
    }
    const dy = -12 * Math.max(...T.chirps.map(c => bump(t, c + 0.18, 0.24)))
    return { fx: FEM_END[0], fy: FEM_END[1], dir: -1, rot: 0, dy, px: 9, alpha: 1 }
  }
  function drawGrackles(t, k) {
    const m = maleState(t), f = femState(t)
    if (f) grackle(x, f.fx, f.fy, f.px, t, { dir: f.dir, female: true, rot: f.rot, dy: f.dy, alpha: f.alpha * clamp(k) })
    grackle(x, m.fx, m.fy, m.px, t, { dir: m.dir, puff: m.puff, scale: m.scale * Math.max(0.01, k), rot: m.rot, dy: m.dy })
    return { m, f }
  }
  // Pisces: crying in a parked car's back seat (the lot) / inside the café window (the patio)
  function drawPisces(t, winRect, k) {
    if (!winRect || k <= 0.02) return
    const { x0, x1, y0, y1 } = winRect
    x.save(); x.beginPath(); x.rect(x0, y0, x1 - x0, y1 - y0); x.clip()
    const sz = Math.min(110, (y1 - y0) * 1.3)
    const up = (t >= T.alarm[0] && t < T.alarm[1] + 0.6) || t >= T.whip[1] ? 1 : 0.4
    const P = [(x0 + x1) / 2, y1 + sz * 0.5 - (sz * 0.5 + (y1 - y0) * (0.12 + 0.22 * up)) * k, sz]
    const r = star('pis', P, t, S_('sparkle', [0, 0]), { hops: [T.alarm[0], T.laughs, T.heart, ...T.chirps], glyph: false })
    x.restore()
    if (r) {
      drawTissue(x, r.x + r.size * 0.42, y1 - 10, 3, t)
      for (const [a, b] of [[0.6, 3.6], [T.alarm[0], T.alarm[1] + 0.4], [T.l8, T.closeB], [T.whip[1], T.out[0]]]) tears(r.x, r.y, r.size, t, a, b, { gap: 0.11, spread: 0.6, life: 0.45 })
    }
  }

  // ── the narrator (screen space: always peeking from the bottom right, hushed)
  const HELMET = ['....OOOOOO....', '..OOHHHHHHOO..', '.OHHHLLHHHHHO.', '.OHHHHHHHHHHO.', 'OOBBBBBBBBBBOO', 'OHHHHHHHHHHHHO', '.OOOOOOOOOOOO.']
  function drawNarrator(t) {
    const k = pop01(t, -1, 0.3) * popOut(t, T.out)
    if (k <= 0.02) return
    const inLot = t < T.cut || t >= T.whip[0] + 0.15
    const look = t < T.cut ? [-1, -1] : [-1, -1]
    const st = inW(t, T.laughs, T.laughs + 1.2) ? S_('sparkle', look) : inW(t, T.scream[0], T.scream[0] + 0.6) ? S_('wide', look, { blink: false }) : S_('neutral', look, { blink: 0.25 })
    const r = star('nar', NAR, t, st, { pop: k, hops: HOPS.nar })
    if (!r) return
    const c = r.size / 36
    const hp = r.size / 13
    bitmap(x, HELMET, { O: OUT, H: '#d9c08a', L: '#f1dfae', B: '#6e4f2c' }, r.x - 7 * hp, r.top - 2.2 * hp, hp)
    // the hushed mic on a little pole
    R(x, r.x - r.size * 0.62, r.y - r.size * 0.1, 10, r.size * 0.6, '#3c3654')
    R(x, r.x - r.size * 0.62 - 12, r.y - r.size * 0.22, 34, 30, OUT); R(x, r.x - r.size * 0.62 - 8, r.y - r.size * 0.22 + 4, 26, 22, '#8c88a6')
    if (inLot) drawShrubLot(NAR[0] - 10, NAR[1] + 165, 160)
    else drawPottedPlant(NAR[0] - 6, NAR[1] + 186, 170)
  }

  // ── nature-doc lower thirds (screen space)
  function lowerThird(t, [a, b], latin, sub, { y = 1300, x0 = 54 } = {}) {
    const k = ease.outCubic(prog(t, a, a + 0.35)) * (1 - ease.inCubic(prog(t, b - 0.25, b)))
    if (k <= 0.01) return
    x.save(); x.globalAlpha = k
    x.font = `italic 500 60px ${SERIF}`; const w1 = x.measureText(latin).width
    x.font = `700 24px ${MONO}`; if ('letterSpacing' in x) x.letterSpacing = '4px'; const w2 = x.measureText(sub).width
    const w = Math.max(w1, w2) + 70, dx = (1 - k) * -60
    const g = x.createLinearGradient(x0, 0, x0 + w + 120, 0); g.addColorStop(0, 'rgba(8,5,20,0.82)'); g.addColorStop(0.75, 'rgba(8,5,20,0.6)'); g.addColorStop(1, 'rgba(8,5,20,0)')
    x.fillStyle = g; x.fillRect(x0 + dx, y, w + 120, 128)
    R(x, x0 + dx, y, 8, 128, GOLD)
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `italic 500 60px ${SERIF}`; if ('letterSpacing' in x) x.letterSpacing = '0px'; x.fillText(latin, x0 + 34 + dx, y + 62)
    x.font = `700 24px ${MONO}`; if ('letterSpacing' in x) x.letterSpacing = '4px'; x.fillStyle = GOLD; x.fillText(sub, x0 + 36 + dx, y + 104)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }
  function drawBinoculars(t) {
    const k = ease.inOutCubic(prog(t, T.bino[0], T.bino[0] + 0.22)) * (1 - ease.inOutCubic(prog(t, T.bino[1] - 0.15, T.bino[1])))
    if (k <= 0.01) return
    const r = lerp(900, 300, k)
    const mx = maskC.getContext('2d')
    mx.globalCompositeOperation = 'source-over'; mx.clearRect(0, 0, W, H); mx.fillStyle = 'rgba(4,2,10,0.97)'; mx.fillRect(0, 0, W, H)
    mx.globalCompositeOperation = 'destination-out'; mx.fillStyle = '#000'
    for (const cx of [355, 725]) { mx.beginPath(); mx.arc(cx, 1000, r, 0, Math.PI * 2); mx.fill() }
    x.save(); x.drawImage(maskC, 0, 0)
    // a reticle tick + the focus hint
    x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 3
    for (const cx of [355, 725]) { x.beginPath(); x.moveTo(cx - 30, 1000); x.lineTo(cx + 30, 1000); x.moveTo(cx, 970); x.lineTo(cx, 1030); x.stroke() }
    x.restore()
  }
  function drawVignette(t) {
    const k = win(t, T.tele[0], T.tele[1], 0.35)
    if (k <= 0.01) return
    const g = x.createRadialGradient(540, 1000, 300, 540, 1000, 1100); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(4,2,10,${0.65 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    // the telephoto letterbox
    x.fillStyle = `rgba(4,2,10,${0.9 * k})`; x.fillRect(0, 0, W, 120 * k); x.fillRect(0, H - 120 * k, W, 120 * k)
  }

  // ── the date: Leo's puff, Libra's mirror
  const leoPuff = t => ease.outBack(prog(t, T.h4, T.h4 + 0.5)) * (1 - ease.inCubic(prog(t, T.deflate, T.deflate + 0.35)))
  function placeDate(t, who) {
    const P0 = who === 'leo' ? LEO_P : LIB_P, PC = who === 'leo' ? LEO_CART : LIB_CART
    if (t < T.whip[0]) return P0
    return PC
  }
  function drawDater(t, who, k) {
    const P = placeDate(t, who), st = keyed(t, who === 'leo' ? LEO_K : LIB_K)
    const hops = [...(who === 'leo' ? HOPS.leo : HOPS.lib), T.laughs + 0.02, T.laughs + 0.5, T.flip + 0.35, T.heart, ...T.chirps]
    if (who === 'lib') hops.push(T.laugh, T.laugh + 0.28, T.laugh + 0.56)
    let scale = 1, sq = st.sq || 0
    if (who === 'leo') {
      const pf = leoPuff(t)
      scale = 1 + 0.2 * pf
      // the deflate: a wobble back to size
      if (t >= T.deflate) sq += 0.12 * Math.sin((t - T.deflate) * 22) * Math.exp(-(t - T.deflate) * 5)
    }
    const r = star(who, P, t, { ...st, sq }, { pop: k, hops, scale })
    if (!r) return null
    if (who === 'leo' && leoPuff(t) > 0.5 && t < T.deflate) {
      // puffed: little gold sparkle ticks round its points
      for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * Math.PI * 2 / 5 + Math.sin(t * 2) * 0.05, d = r.size * 0.62; if ((Math.floor(t * 4) + i) % 2) drawPixelStar(x, r.x + Math.cos(a) * d, r.y + Math.sin(a) * d, 22, 1, GOLD) }
    }
    if (who === 'lib' && inW(t, T.h4 - 0.2, T.whip[0])) {
      // the pocket mirror: held up, then dropped
      let mx = r.x + r.size * 0.5, my = r.y - r.size * 0.05, mr = 0.25
      if (t >= T.drop) { const a = t - T.drop; my += Math.min(260, 500 * a * a + 40 * a); mr += a * 8; if (my > 1290) my = 1290 }
      if (t < T.lessonOut[0]) {
        x.save(); x.translate(mx, my); x.rotate(mr)
        R(x, -8, 22, 16, 50, OUT); R(x, -5, 24, 10, 46, '#c8932f')
        x.fillStyle = OUT; x.beginPath(); x.ellipse(0, 0, 34, 40, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#bff0ff'; x.beginPath(); x.ellipse(0, 0, 26, 32, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(-14, -18, 8, 16)
        x.restore()
      }
    }
    return r
  }

  // ── the tie-in: a talk card, two face-down answers, one flip
  const TALK_AT = { x: 540, y: 760, w: 410 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1250, from: 'leo', tp: T.playA, rot: -0.06 }, { x: 692, y: 1250, from: 'lib', tp: T.playB, rot: 0.06 }]
  function drawTie(t, toScreen) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.5 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    const g = x.createRadialGradient(TALK_AT.x, TALK_AT.y, 0, TALK_AT.x, TALK_AT.y, 460)
    g.addColorStop(0, rgba(LAV, 0.28 * clamp(tp) * (1 - o))); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(TALK_AT.x - 460, TALK_AT.y - 460, 920, 920)
    drawTalkCard(x, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * clamp(tp, 0, 1.2), 'What are you | *nervous* about?', { rot: (1 - clamp(tp)) * -0.4, alpha: clamp(tp * 3) * (1 - o) })
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = toScreen(placeDate(t, C.from)), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardBack(x, cx, cy, ANS_W, { rot, sx, alpha: clamp(p * 4) })
      else drawAnswerCard(x, cx, cy, ANS_W, 'This | date.', { rot, sx: -sx, stampK: prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1) })
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t), wk = worldK(t)
        const toScreen = P => [540 + (P[0] - C.fx) * C.s, 1000 + (P[1] - C.fy) * C.s]
        x.save()
        x.globalAlpha = wk
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        const showLot = C.fx < PX0 + 540 - 1 || t < T.cut, showPatio = C.fx > 541 && t >= T.cut
        let carWin = null, cafeWin = null
        if (showLot) {
          drawSkyline(t)
          drawAsphalt(-400, PX0 + 20)
          const ca = drawCar(CAR_A.cx, HORIZON + 130, CAR_A.w, CAR_A.col, t)
          void ca
          const cp = drawCar(CAR_P.cx, HORIZON + 150, CAR_P.w, CAR_P.col, t, { alarm: inW(t, ...T.alarm) ? 1 : 0 })
          carWin = cp.win1
          drawPisces(t, carWin, popOut(t, T.out))
          drawPole(t)
          drawCart(false)
          if (t >= T.whip[0]) {
            const kk = popOut(t, T.out)
            drawDater(t, 'leo', kk); drawDater(t, 'lib', kk)
          }
          drawCart(true)
          // the fry (kicked during the strut)
          if (t < T.cut) {
            const a = t - T.kick
            const fxp = a < 0 ? 590 : 590 + 520 * a, fyp = a < 0 ? STRUT_Y - 6 : STRUT_Y - 6 - 600 * a + 900 * a * a
            if (a < 0.9) { x.save(); x.translate(fxp, fyp); x.rotate(a > 0 ? a * 14 : 0.3); R(x, -20, -5, 40, 10, OUT); R(x, -18, -3, 36, 6, '#ffd23f'); x.restore() }
          }
        }
        if (showPatio) {
          drawPatio(t)
          cafeWin = CAFE_WIN
          drawPisces(t, { x0: cafeWin.x0 + 120, x1: cafeWin.x0 + 260, y0: cafeWin.y0 + 110, y1: cafeWin.y1 }, 1)
          if (t < T.whip[0]) { drawDater(t, 'leo', 1); drawDater(t, 'lib', 1) }
          drawTable(t)
        }
        drawGrackles(t, popOut(t, T.out))
        // onomatopoeia in the world
        const m = maleState(t)
        ono('SKREEEK!', m.fx - 30, m.fy - 260, t, T.scream[0], { size: 64, life: 0.95, rise: 30, rot: -0.08, color: '#ffe24a' })
        ono('SKRAWK!', m.fx + 30, m.fy - 250, t, T.scream[1], { size: 60, life: 0.9, rise: 30, rot: 0.08, color: '#ffe24a' })
        ono('WEE-OO', CAR_P.cx, HORIZON - 60, t, T.alarm[0], { size: 44, life: 0.8, rise: 18, color: '#ff8a8a' })
        ono('WEE-OO', CAR_P.cx + 20, HORIZON - 70, t, T.alarm[0] + 0.85, { size: 44, life: 0.8, rise: 18, color: '#ff8a8a' })
        ono('?', FEM_POLE[0] + 40, FEM_POLE[1] - 120, t, T.tilt, { size: 44, life: 0.6, rise: 10, ticks: false })
        ono('*strut*', 500, STRUT_Y - 190, t, T.strut[0] + 0.1, { size: 44, life: 0.8, rise: 16 })
        ono('*strut*', 520, STRUT_Y - 200, t, T.strut[0] + 1.55, { size: 44, life: 0.8, rise: 16, rot: 0.08 })
        ono('*boop*', 650, STRUT_Y - 120, t, T.kick, { size: 40, life: 0.6, rise: 16 })
        ono('HA HA HA!', LIB_P[0], LIB_P[1] - 210, t, T.laugh, { size: 56, life: 1.0, rise: 24, color: LIB_T })
        ono('*pfffft*', LEO_P[0], LEO_P[1] - 200, t, T.deflate, { size: 50, life: 0.9, rise: 26 })
        ono('*clink*', LIB_P[0] + 60, 1290, t, T.drop + 0.4, { size: 40, life: 0.7, rise: 14 })
        ono('*chrrp*', MALE_RAIL[0] - 10, MALE_RAIL[1] - 150, t, T.chirp, { size: 40, life: 0.8, rise: 18, color: '#cfe8a0' })
        T.chirps.forEach((c, i) => ono('*chirp*', [MALE_END[0], 600, FEM_END[0] + 40][i], [MALE_END[1] - 200, 900, MALE_END[1] - 210][i], t, c, { size: 40, life: 0.7, rise: 16, color: '#cfe8a0' }))
        if (t >= T.land[1] && t < T.lessonOut[0]) {
          const hk = pop01(t, T.land[1], 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.lesson, T.lesson + 0.3)))
          if (hk > 0.02) { x.save(); x.translate((MALE_RAIL[0] + FEM_RAIL[0]) / 2, MALE_RAIL[1] - 150 - 6 * Math.sin(t * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 7); x.restore() }
        }
        if (t >= T.heart) {
          const hk = pop01(t, T.heart, 0.34, 2.4) * popOut(t, T.out)
          if (hk > 0.02) { x.save(); x.translate((MALE_END[0] + FEM_END[0]) / 2, MALE_END[1] - 190 - 8 * Math.sin((t - T.heart) * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 10); x.restore() }
        }
        x.restore()
        // the deflated-laugh sparkle + whip streaks (screen space)
        if (t >= T.laughs && t < T.laughs + 0.7) sparkleRing(t, 540, 1080, T.laughs, 12, 340, 0.6)
        streaks(t, bump(t, (T.whip[0] + T.whip[1]) / 2, T.whip[1] - T.whip[0] + 0.1), { dir: 1 })
        drawTie(t, toScreen)
        drawVignette(t)
        drawBinoculars(t)
        lowerThird(t, T.lt1, 'Quiscalus mexicanus', 'GREAT-TAILED GRACKLE · MALE')
        lowerThird(t, T.lt2, 'Quiscalus mexicanus', 'FEMALE · NOT CONVINCED', { y: 1310 })
        lowerThird(t, T.lt3, 'Stella leonis', 'LEO · FIRST DATE')
        lowerThird(t, T.lt4, 'Stella librae', 'LIBRA · ALSO FIRST DATE')
        lowerThird(t, T.lt5, 'Sinceritas rara', 'OBSERVED: ONE REAL MOMENT')
        drawNarrator(t)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      boxA.update(t); boxB.update(t); boxC.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// the one card transition: the lot → the café patio (cardfx plays exactly this one)
export const CUTS = [T.cut]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const { N, FX } = SND
const squeak = (t, f0 = 900, len = 0.5, g = 0.045) => [
  ['chip', +t.toFixed(3), f0, len * 0.5, { ...FX, wave: 'square', duty: 0.18, slide: 19, vib: 0.06, gain: g, decay: 0.08, sustain: 0.8 }],
  ['chip', +(t + len * 0.5).toFixed(3), f0 * 1.9, len * 0.5, { ...FX, wave: 'square', duty: 0.12, slide: 7, vib: 0.08, gain: g * 0.8, decay: 0.08, sustain: 0.7 }],
]
const chirp = (t, f = 2200, g = 0.03) => [['chip', +t.toFixed(3), f, 0.08, { ...FX, wave: 'tri', slide: 6, gain: g, decay: 0.05, sustain: 0.5 }], ['chip', +(t + 0.1).toFixed(3), f * 1.12, 0.07, { ...FX, wave: 'tri', slide: 4, gain: g * 0.8, decay: 0.05, sustain: 0.5 }]]
const alarm = (t0, t1) => { const out = []; let k = 0; for (let t = t0; t < t1; t += 0.22, k++) out.push(['chip', +t.toFixed(3), k % 2 ? 980 : 720, 0.2, { ...FX, wave: 'square', duty: 0.4, gain: 0.022, decay: 0.02, sustain: 0.9, pan: 0.45 }]); return out }
const pffft = t => [['whoosh', +t.toFixed(3), 0.6, 0.05], ['chip', +t.toFixed(3), 520, 0.55, { ...FX, wave: 'tri', slide: -22, gain: 0.03, decay: 0.3, sustain: 0.5 }]]
const PITCH = { [SNAR]: 520, [SLEO]: 900, [SLIB]: 1180 }
const CUES_ = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook: the lot, the display already on
  ...squeak(0.15, 820, 0.55, 0.035), ['whoosh', 0.1, 0.5, 0.02], ...squeak(2.75, 860, 0.5, 0.035),
  // 2 · the puff
  ...SND.head(T.h1, 1, T.h1Land, 2), ['boom', T.bigPuff, 0.06], ['whoosh', T.bigPuff - 0.12, 0.3, 0.05], ['swell', T.tele[0], T.bigPuff, { bus: 'sfx', gain: 0.03, f0: 300, f1: 1400 }],
  ...T.flick.flatMap(f => [['whoosh', f, 0.18, 0.04], ['tick', f + 0.05, 0.05]]),
  // 3 · the song: the screams, the car alarm, the binoculars, the tilt, the turn
  ...SND.head(T.h2, 1, T.h2Land, 3),
  ...squeak(T.scream[0], 760, 0.7, 0.06), ...squeak(T.scream[1], 700, 0.6, 0.055),
  ...alarm(T.alarm[0], T.alarm[1]), ...SND.sob(T.alarm[0] + 0.3, N.E6), ...SND.sob(T.alarm[0] + 1.0, N.D6),
  ['whoosh', T.bino[0], 0.25, 0.05], ['tick', T.bino[0] + 0.22, 0.06], ['pop', T.tilt, N.B5, 0.03, -0.3], ['whoosh', T.away, 0.2, 0.04], ...SND.womp(T.away + 0.1),
  // 4 · the strut
  ...SND.head(T.h3, 1, T.h3Land, 1),
  ['whoosh', T.hopDown[0], 0.3, 0.04], ...SND.thud(T.hopDown[1], 0.1, 140),
  ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.strut[0] + 0.1 + i * 0.31).toFixed(3), 0.05 + 0.01 * (i % 2)]),
  ['pop', T.kick, N.D6, 0.04, 0.2], ['whoosh', T.kick, 0.4, 0.03],
  // 5 · the café patio: the same display
  ...SND.head(T.h4, 2, T.h4Land, 0), ['swell', T.h4, T.h4 + 0.5, { bus: 'sfx', gain: 0.03, f0: 400, f1: 1800 }], ...SND.sparkle(T.h4 + 0.3),
  ['whoosh', T.lt3[0], 0.25, 0.03], ['whoosh', T.lt4[0], 0.25, 0.03],
  ['pop', T.h4 + 1.1, N.E6, 0.025, 0.4], ['pop', T.h4 + 1.3, N.Fs5, 0.02, 0.4],
  ...SND.sob(T.h4 + 0.8, N.E6, 2),
  // 6 · the mating call: the office line, the fake laugh
  ...SND.head(T.h5, 2, T.h5Land, 2),
  ...[0, 0.28, 0.56].flatMap(d => [['chip', +(T.laugh + d).toFixed(3), 1300 - d * 200, 0.14, { ...FX, wave: 'square', duty: 0.3, gain: 0.03, decay: 0.05, sustain: 0.6 }]]),
  // 7 · something rare: the deflate, the dropped mirror
  ...SND.head(T.h6, 1, T.h6Land, 4), ...pffft(T.deflate),
  ['whoosh', T.drop, 0.3, 0.03], ['pop', T.drop + 0.4, N.E6, 0.04, 0.3], ['tick', T.drop + 0.42, 0.06],
  // 8 · a sincere squawk: the laugh, the chirp, she lands
  ...SND.head(T.h6b, 1, T.h6bLand, 2), ['bell', T.laughs, N.A5, 0.04, 1.6, 0], ['glitter', T.laughs, T.laughs + 0.8],
  ...chirp(T.chirp, 2000, 0.035), ['whoosh', T.land[0], 0.5, 0.035], ['pop', T.land[1], N.A5, 0.04, 0.3], ['bell', T.land[1] + 0.05, N.E6, 0.03, 1.2, 0.3],
  ...SND.sob(T.l8 + 0.3, N.E6),
  // 9 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 10 · talk cards
  ...SND.head(T.h7, 4, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N.E6, 0.04, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 11 · squawk sincerely
  ['whoosh', T.whip[0], 0.4, 0.07], ...SND.head(T.h8, 1, T.h8Land, 0),
  ...T.chirps.flatMap((c, i) => [...chirp(c, 1900 + i * 150, 0.03), ...chirp(c + 0.18, 2300 + i * 120, 0.025)]),
  ['pop', T.heart, N.A5, 0.04, 0], ['bell', T.heart + 0.02, N.E6, 0.03, 1.2, 0], ...SND.sob(T.whip[1] + 0.2, N.D6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH, gain: 0.014 }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH, gain: 0.014 }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = CUES_.filter(c => typeof c[1] !== 'number' || c[1] >= 0)
