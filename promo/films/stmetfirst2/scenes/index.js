// stmetfirst2 — "Our Stars Met First, Ep. 2: Capricorn × Pisces" (45 s vertical Align ad, Star Talk season 3 #21)
// A sequel to stmetfirst: the same awkward-parents setup, the same look, the same lips button. story 0–40.6, then the end card.
//   0.00–4.1   "Before you meet, | your *stars* do."  EP. 2 tag. ♑ CAPRICORN (tiny tie) and ♓ PISCES (glittery, already
//              teary) face each other over a little floating patch of earth. Ep. 1's ♌ Leo (crown) and ♐ Sag (bow tie) are
//              guests in the back.  CAP: "So. Your human and my human."
//   4.1–9.5    "Round | *one.*"  CAP: "Mine has a five-year plan." (a planner flips open: gantt bars, every box ticked)
//              PIS: "Mine has a dream journal." (a moon-and-cloud journal)  The score stops dead: crickets on the patch,
//              both look away and whistle; the Ep. 1 couple trade a look.
//   9.5–15.3   "Round | *two.*"  CAP: "Mine is never late." (a tidy alarm clock at 8:59)  PIS: "Mine is never on time.
//              But always sorry." (a clock spinning out of control)  Pisces sobs; everyone droops (womp).
//  15.3        card cut (flip) to a closer two-shot.
//  15.3–22.8   "Round | *three.*"  Quieter. CAP: "…mine has never bought anyone flowers."  PIS: "…mine has never had a
//              plan."  The score stops; a long look.  BOTH: "…oh."
//  22.82       One tear rolls off Pisces, arcs, and lands on Capricorn's patch of earth: plip. The band drops in.
//  22.8–27.8   "Earth meets | *water.*"  A sprout pops up, unfurls, and blooms. A gold sextile line snaps between them.
//              THE STARS: "earth and water grow things."  Capricorn hands Pisces the flower: ★ FIRST FLOWERS. Pisces wails.
//  27.82       card cut (flip) to the phones.
//  27.8–33.9   "Card first. | Face *last.*"  Veiled mystery cards (♓ WATER on Cap's human's phone, ♑ EARTH on Pisces').
//              Pisces leans in to peek… CAP: "Faces are scheduled for later."  PIS: "Can I cry now?"
//              Capricorn writes it in: CRY · PENCILED IN.
//  33.94–38.4 ★ LESSON UNLOCKED — "The right person | doesn't fix you. | They help you *grow.*"  +1 BLOOM
//  38.3–40.55 A padlock pops between them; both turn innocent. "Our lips are | *sealed.*" "(Still no lips.)"
//  40.6        end card.
// One canvas (sky + phones + cast + props), DOM type + dialogue boxes above it, the shared lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawCrown, drawBowTie, drawPadlock, drawTears, drawSpark, drawTie, drawPlanner, drawJournal, drawClock, drawPatch, drawSprout, drawDrop } from '../props.js'

export const DURATION = 45
export const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', LEAF = '#6fe08a', AQUA = '#8fd8ff'
const CAP_C = signStar('capricorn').color, PIS_C = signStar('pisces').color, LEO_C = signStar('leo').color, SAG_C = signStar('sagittarius').color
const CAP_T = '#8ff5c9', PIS_T = '#b9b2ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  black: [0, 0.3],
  h1: 0.15, h1Land: 0.72, h1Out: [3.95, 4.15], ep: [0.35, 3.9],
  capIn: 0.2, pisIn: 0.38, bgIn: 0.75, patchIn: 0.9,
  open1: 0.83, l1: 1.05, close1: 4.05,
  // round one
  h2: 4.15, h2Land: 4.5, h2Out: [9.3, 9.48],
  open2: 4.2, l2: 4.35, plan: [4.5, 4.95], l3: 6.85, journal: 7.0, propsOut: [9.15, 9.4],
  tape1: 7.95, music1: BEAT(16),                 // 9.49: the lounge jazz limps back in
  crk: [8.15, 8.85], away1: 8.3, back1: 9.3, bgLook: 8.2, bgCringe: 8.75,
  // round two
  h3: 9.49, h3Land: 9.8, h3Out: [15.05, 15.22],
  l4: 9.7, clockCap: [9.78, 11.95], l5: 11.95, clockPis: [12.15, 13.75], sorry: 13.42, sob: [13.65, 15.1], droop: 13.8, close2: 15.15,
  cut1: 15.3,
  // round three
  h4: 15.38, h4Land: 15.7, h4Out: [21.95, 22.12],
  open3: 15.6, l6: 15.8, l7: 18.7, tape2: 19.85, turn: [20.1, 20.9], l8: 21.2, close3: 22.9,
  swell: 21.75, fall: [22.25, 22.82], drop: BEAT(40),   // 22.82: plip → the band drops in
  // earth meets water
  h5: 22.85, h5Land: 23.2, h5Out: [27.55, 27.72],
  grow: [22.85, 23.6], bloom: BEAT(42), sextile: 24.2,       // 23.93
  open4: 24.3, l9: 24.5, gift: [25.75, 26.5], stamp: 26.55, close4: 27.35,
  cut2: BEAT(49),                                // 27.82
  // card first, face last
  phones: 27.95, h6: 28.0, h6Land: 28.4, h6Out: [33.6, 33.78],
  peek: [28.35, 28.95], open5: 28.55, l10: 28.75, l11: 31.35, pencil: 32.3, close5: 33.6,
  // lesson
  lesson: BEAT(60), lessonOut: [38.2, 38.4],     // 33.94
  move2: [38.3, 38.7], lock: 38.5, lockShut: 38.86, h7: 38.4, h7Land: 38.68, h8: 39.0, innocent: 38.9, glance: 39.65,
  out: [40.18, 40.5],
}
T.hopE = [T.lesson - 0.05, T.lesson + 0.4]       // phones → the lesson: the stars hop down below the banner
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'The right person | doesn’t fix you. | They help you *grow.*', chip: '+1 BLOOM', accentColor: LEAF, dim: 0.6 }

const CAP = '♑ CAP STAR', PIS = '♓ PISCES STAR', BOTH = '♑ ♓ BOTH', STARS = 'THE STARS'
const L_A = [{ t: T.l1, speaker: CAP, color: CAP_T, text: 'So. Your human and my *human.*' }]
const L_B = [
  { t: T.l2, speaker: CAP, color: CAP_T, text: 'Mine has a five-year *plan.*' },
  { t: T.l3, speaker: PIS, color: PIS_T, text: 'Mine has a dream *journal.*' },
  { t: T.l4, speaker: CAP, color: CAP_T, text: 'Mine is never *late.*' },
  { t: T.l5, speaker: PIS, color: PIS_T, text: 'Mine is never on time. But always *sorry.*' },
]
const L_C = [
  { t: T.l6, speaker: CAP, color: CAP_T, text: '…mine has never bought anyone *flowers.*' },
  { t: T.l7, speaker: PIS, color: PIS_T, text: '…mine has never had a *plan.*' },
  { t: T.l8, speaker: BOTH, color: GOLD, text: '…*oh.*' },
]
const L_D = [{ t: T.l9, speaker: STARS, color: LEAF, text: 'earth and water grow *things.*' }]
const L_E = [
  { t: T.l10, speaker: CAP, color: CAP_T, text: 'Faces are scheduled for *later.*' },
  { t: T.l11, speaker: PIS, color: PIS_T, text: 'Can I cry *now?*' },
]
const ALL = [...L_A, ...L_B, ...L_C, ...L_D, ...L_E]
const CPS = 28
const LT = lineTimes(ALL, { cps: CPS })
const HOP = {
  cap: [T.capIn + 0.3, ...talkHops(ALL, CAP, { cps: CPS }), T.drop + 0.1, T.bloom, T.gift[1], T.hopE[1], T.move2[1]],
  pis: [T.pisIn + 0.3, ...talkHops(ALL, PIS, { cps: CPS }), T.bloom + 0.05, T.stamp, T.stamp + 0.45, T.hopE[1] + 0.05, T.move2[1] + 0.05],
  leo: [T.bgIn + 0.3, T.drop + 0.2, T.bloom, T.bloom + 0.5, T.stamp + 0.1],
  sag: [T.bgIn + 0.4, T.drop + 0.25, T.bloom + 0.05, T.bloom + 0.55, T.stamp + 0.15],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
/** keyframed state: the last entry with t0 ≤ t */
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }

// ── layouts per beat
const LAY = {
  A: { cap: { x: 300, y: 1090, s: 390 }, pis: { x: 780, y: 1090, s: 390 }, leo: { x: 395, y: 660, s: 120 }, sag: { x: 685, y: 660, s: 120 }, patch: { x: 540, y: 1215, c: 13 } },
  B: { cap: { x: 290, y: 1100, s: 440 }, pis: { x: 790, y: 1100, s: 440 }, leo: { x: 385, y: 640, s: 110 }, sag: { x: 695, y: 640, s: 110 }, patch: { x: 540, y: 1235, c: 14 } },
  D: { cap: { x: 300, y: 720, s: 245 }, pis: { x: 780, y: 720, s: 245 } },
  E: { cap: { x: 320, y: 1500, s: 300 }, pis: { x: 760, y: 1500, s: 300 } },
  F: { cap: { x: 345, y: 1130, s: 330 }, pis: { x: 735, y: 1130, s: 330 } },
}
const PHONE = { w: 340, h: 620, y: 1135, xs: [300, 780] }

/** where a character is at t */
function posOf(who, t) {
  if (t < T.cut1) return LAY.A[who]
  if (t < T.cut2) {
    const P = { ...LAY.B[who] }
    // the long look: they drift a little closer
    if (who === 'cap' || who === 'pis') {
      const k = ease.inOutCubic(prog(t, ...T.turn)) * (1 - ease.inOutCubic(prog(t, T.drop + 0.1, T.drop + 0.5)))
      P.x += (who === 'cap' ? 1 : -1) * 26 * k
    }
    return P
  }
  if (who === 'leo' || who === 'sag') return LAY.B[who]
  if (t < T.hopE[0]) return LAY.D[who]
  if (t < T.move2[0]) {
    const p = prog(t, ...T.hopE), e = ease.inOutCubic(p), A = LAY.D[who], E = LAY.E[who]
    return { x: lerp(A.x, E.x, e), y: lerp(A.y, E.y, e) - Math.sin(p * Math.PI) * 120, s: lerp(A.s, E.s, e) }
  }
  const p = prog(t, ...T.move2), e = ease.inOutCubic(p)
  const A = LAY.E[who], F = LAY.F[who]
  return { x: lerp(A.x, F.x, e), y: lerp(A.y, F.y, e) - Math.sin(p * Math.PI) * 120, s: lerp(A.s, F.s, e) }
}
const patchAt = t => t < T.cut1 ? LAY.A.patch : LAY.B.patch

// ── moods (state = { mood, look, blink, squash, dy, k (tears), shake })
const CAP_K = [
  [0, { mood: 'neutral', look: [1, 0] }], [T.l1, { mood: 'neutral', look: [1, 0], blink: false }], [LT[0].done + 0.3, { mood: 'happy' }], [3.3, { mood: 'neutral', look: [1, 0] }],
  [T.l2, { mood: 'sparkle', look: [1, 0] }], [LT[1].done + 0.2, { mood: 'happy' }],
  [T.l3, { mood: 'neutral', look: [1, 0] }], [T.journal + 0.4, { mood: 'squint', look: [1, -1] }],
  [T.tape1, { mood: 'neutral', look: [0, 0], blink: false }], [T.away1, { mood: 'neutral', look: [-1, -1], blink: false }], [T.back1, { mood: 'neutral', look: [1, 0] }],
  [T.l4, { mood: 'sparkle', look: [1, 0] }], [LT[3].done + 0.2, { mood: 'happy' }],
  [T.l5, { mood: 'neutral', look: [1, 0] }], [T.clockPis[0] + 0.2, { mood: 'wide', look: [1, -1] }], [T.sorry, { mood: 'squint', look: [1, 0] }],
  [T.droop, { mood: 'sleepy', squash: 0.14, dy: 20 }],
  [T.cut1, { mood: 'neutral', look: [0, 1], blink: false }], [T.l6 + 0.4, { mood: 'neutral', look: [0, 1] }], [LT[5].done + 0.3, { mood: 'neutral', look: [1, 0] }],
  [T.l7, { mood: 'neutral', look: [1, 0] }], [LT[6].done + 0.2, { mood: 'wide', look: [1, 0] }], [T.turn[0], { mood: 'neutral', look: [1, 0], blink: false }],
  [T.l8, { mood: 'wide', look: [1, 0] }], [T.fall[0], { mood: 'wide', look: [1, 1] }],
  [T.drop, { mood: 'wide', look: [1, 1] }], [T.bloom, { mood: 'sparkle', look: [1, 1] }], [T.sextile, { mood: 'happy' }],
  [T.gift[0], { mood: 'happy', look: [1, 0] }], [T.stamp, { mood: 'heart' }],
  [T.cut2, { mood: 'happy' }], [T.peek[0] + 0.1, { mood: 'wide', look: [1, 0] }], [T.l10, { mood: 'squint', look: [1, 0] }], [LT[9].done + 0.3, { mood: 'neutral', look: [1, 0] }],
  [T.pencil - 0.4, { mood: 'squint', look: [-1, -1] }], [T.pencil, { mood: 'wink' }],
  [T.lesson, { mood: 'sparkle', look: [0, -1] }], [36.6, { mood: 'happy' }],
  [T.move2[0], { mood: 'happy' }], [T.innocent, { mood: 'neutral', look: [-1, -1], blink: false }], [T.glance, { mood: 'wink' }],
]
const PIS_K = [
  [0, { mood: 'happy', k: 0.6, look: [-1, 0] }], [T.l1, { mood: 'sparkle', k: 0.5, look: [-1, 0] }], [3.3, { mood: 'happy', k: 0.5 }],
  [T.l2, { mood: 'neutral', k: 0.4, look: [-1, -1] }], [T.plan[1], { mood: 'sparkle', k: 0.8, look: [-1, -1] }],
  [T.l3, { mood: 'happy', k: 0.6 }],
  [T.tape1, { mood: 'neutral', k: 0.35, look: [0, 0], blink: false }], [T.away1, { mood: 'neutral', k: 0.35, look: [1, -1], blink: false }], [T.back1, { mood: 'neutral', k: 0.35, look: [-1, 0] }],
  [T.l4, { mood: 'neutral', k: 0.35, look: [-1, 0] }], [T.l5, { mood: 'happy', k: 0.5 }],
  [T.sob[0], { mood: 'neutral', blink: 1, k: 1.7, shake: 1 }], [T.sob[1], { mood: 'sleepy', k: 0.6, squash: 0.12, dy: 16 }],
  [T.cut1, { mood: 'neutral', k: 0.35, look: [-1, 0] }], [T.l6 + 1.0, { mood: 'sparkle', k: 0.5, look: [-1, 0] }],
  [T.l7, { mood: 'neutral', k: 0.35, look: [0, 1], blink: false }], [LT[6].done + 0.2, { mood: 'wide', k: 0, look: [-1, 0] }],
  [T.turn[0], { mood: 'neutral', k: 0, look: [-1, 0], blink: false }], [T.l8, { mood: 'wide', k: 0, look: [-1, 0] }],
  [T.swell, { mood: 'sparkle', k: 0, look: [-1, 0] }], [T.fall[0], { mood: 'wide', k: 0, look: [-1, 1] }],
  [T.bloom, { mood: 'heart', k: 1.0 }], [T.gift[0], { mood: 'wide', k: 0.4, look: [-1, 0] }], [T.stamp, { mood: 'happy', k: 2.0, shake: 0.5 }],
  [T.cut2, { mood: 'happy', k: 0.6 }], [T.peek[0], { mood: 'squint', k: 0.4, look: [-1, 1], dy: 28, squash: 0.1 }], [T.l10 + 0.25, { mood: 'wide', k: 0.3, look: [-1, 0] }],
  [T.l11, { mood: 'sparkle', k: 0.8, look: [-1, 0] }], [T.pencil, { mood: 'happy', k: 1.8, shake: 0.4 }],
  [T.lesson, { mood: 'happy', k: 1.0 }], [T.lesson + 1.7, { mood: 'happy', k: 1.9, shake: 0.4 }], [37.2, { mood: 'happy', k: 0.9 }],
  [T.move2[0], { mood: 'happy', k: 0.7 }], [T.innocent + 0.05, { mood: 'neutral', look: [1, -1], blink: false, k: 0.5 }], [T.glance + 0.08, { mood: 'happy', k: 0.8 }],
]
// the Ep. 1 couple in the back (leo looks right at sag, sag looks left)
const bgK = s => [
  [0, { mood: 'happy' }], [T.l2, { mood: 'neutral', look: [-1, 1] }], [T.l3, { mood: 'neutral', look: [1, 1] }],
  [T.bgLook, { mood: 'neutral', look: [s, 0], blink: false }], [T.bgCringe, { mood: 'eyeroll' }], [T.back1 + 0.1, { mood: 'neutral', look: [0, 1] }],
  [T.l4, { mood: 'neutral', look: [-1, 1] }], [T.l5, { mood: 'neutral', look: [1, 1] }], [T.droop, { mood: 'sleepy', squash: 0.14, dy: 6 }],
  [T.cut1, { mood: 'neutral', look: [0, 1] }], [T.l8, { mood: 'wide', look: [0, 1] }],
  [T.drop, { mood: 'wide', look: [0, 1] }], [T.bloom, { mood: 'heart' }], [T.gift[0], { mood: 'sparkle', look: [s * -0.2, 1] }], [T.stamp, { mood: 'happy' }],
]
const LEO_K = bgK(1), SAG_K = bgK(-1)

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H1 = popText(root, 'Before you meet, | your *stars* do.', { top: 200, size: 104, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.14, wobble: true, gap: 0.08, accentColor: GOLD })
  const H2 = popText(root, 'Round | *one.*', { top: 200, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, 'Round | *two.*', { top: 200, size: 112, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Round | *three.*', { top: 200, size: 112, accentSize: 176, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: AQUA })
  const H5 = popText(root, 'Earth meets | *water.*', { top: 200, size: 112, accentSize: 176, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: LEAF })
  const H6 = popText(root, 'Card first. | Face *last.*', { top: 200, size: 112, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'Our lips are | *sealed.*', { top: 190, size: 112, accentSize: 168, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
  const H8 = popText(root, '(Still no lips.)', { top: 590, size: 64, at: T.h8, gap: 0.07, color: 'rgba(239,230,214,0.92)' })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.out], [H8, T.out]]
  // the episode tag
  const EP = el('div', { position: 'absolute', left: '50%', top: '118px', transform: 'translateX(-50%)', padding: '8px 22px 6px', border: `3px solid ${rgba(GOLD, 0.85)}`,
    background: 'rgba(16,9,38,0.8)', font: `700 30px ${MONO}`, letterSpacing: '0.14em', color: GOLD, whiteSpace: 'nowrap', display: 'none' }, root, 'EP. 2 · CAPRICORN × PISCES')
  const BOXES = [
    dialogueBox(root, { lines: L_A, y: 1400, open: T.open1, close: T.close1, cps: CPS }),
    dialogueBox(root, { lines: L_B, y: 1400, open: T.open2, close: T.close2, cps: CPS }),
    dialogueBox(root, { lines: L_C, y: 1400, open: T.open3, close: T.close3, cps: CPS }),
    dialogueBox(root, { lines: L_D, y: 1400, open: T.open4, close: T.close4, cps: CPS }),
    dialogueBox(root, { lines: L_E, y: 1500, open: T.open5, close: T.close5, cps: CPS }),
  ]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera (characters + props only): slow excruciating push-ins during the silences, a snap back when the music returns
  function cam(t) {
    let s = 1, cy = 1060
    if (t < T.tape1) s = 1 + 0.02 * prog(t, 0, 4)
    else if (t < T.music1 - 0.06) s = 1.02 + 0.09 * ease.inOutQuad(prog(t, T.tape1 + 0.2, T.music1 - 0.1))
    else if (t < T.cut1) s = lerp(1.11, 1, easeOutBack(prog(t, T.music1 - 0.06, T.music1 + 0.25), 1.4))
    else if (t < T.cut2) {
      cy = 1110
      if (t < T.drop) s = 1 + 0.12 * ease.inOutQuad(prog(t, T.tape2, T.fall[0]))
      else s = lerp(1.12, 1, easeOutBack(prog(t, T.drop, T.drop + 0.35), 1.6))
    }
    return { s, cx: 540, cy }
  }

  // ── a character
  const KEYS = { cap: CAP_K, pis: PIS_K, leo: LEO_K, sag: SAG_K }
  const COLS = { cap: CAP_C, pis: PIS_C, leo: LEO_C, sag: SAG_C }
  const GLY = { cap: '♑', pis: '♓', leo: '♌', sag: '♐' }
  const SEED = { cap: 5, pis: 11, leo: 3, sag: 7 }
  function drawChar(who, t, alpha = 1) {
    const bg = who === 'leo' || who === 'sag'
    if (bg && t >= T.cut2) return null
    const P = { ...posOf(who, t) }
    const st = keyed(t, KEYS[who])
    let pk = pop01(t, who === 'cap' ? T.capIn : who === 'pis' ? T.pisIn : T.bgIn + (who === 'sag' ? 0.08 : 0), 0.42, 2.2)
    const d = who === 'pis' ? 0.05 : bg ? 0.1 : 0
    if (t >= T.cut1 && t < T.cut1 + 0.6) pk *= pop01(t, T.cut1 + 0.06 + d, 0.34, 2.2)
    if (t >= T.cut2 && t < T.cut2 + 0.6) pk *= pop01(t, T.cut2 + 0.12 + d, 0.34, 2.2)
    pk *= popOut(t, T.out)
    if (pk <= 0.02) return null
    if (who === 'pis' && t >= T.sob[0] - 0.1 && t < T.sob[1] + 0.2) P.s *= 1 + 0.22 * Math.min(1, Math.sin(Math.PI * prog(t, T.sob[0] - 0.1, T.sob[1] + 0.2)) * 2.5)
    const dx = st.shake ? Math.sin(t * 60) * 5 * st.shake : 0
    const dy = st.dy || 0
    x.save()
    x.translate(P.x + dx, P.y + dy)
    const r = drawStarChar(x, 0, 0, P.s, t, { color: COLS[who], glyph: P.s >= 150 ? GLY[who] : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash || 0, hops: HOP[who], seed: SEED[who], pop: pk, alpha, zzz: false, glow: bg ? 0.6 : 1 })
    const c = r.size / 36
    if (who === 'cap') drawTie(x, 0, r.y + 5.6 * c, c * 0.72)
    if (who === 'leo') drawCrown(x, 0, r.top + 3.6 * c + (st.squash || 0) * 10 * c, c * 0.9, 0)
    if (who === 'sag') drawBowTie(x, 0, r.y + 7.4 * c, c * 0.8)
    if (who === 'pis') {
      // glitter: a few pixel sparkles orbiting Pisces at all times
      for (let k = 0; k < 5; k++) {
        const a = t * 1.3 + k * 1.2566, ph = (t * 0.9 + k * 0.31) % 1
        const sa = Math.sin(Math.PI * ph)
        if (sa > 0.2) drawPixelStar(x, Math.cos(a) * 21 * c, r.y + Math.sin(a) * 15 * c - 2 * c, 9 * c * sa, k % 2 ? 1 : 2, [LAV, '#fff1c8', AQUA, PINK, '#ffffff'][k])
      }
      drawTears(x, -7 * c, r.y + 1.6 * c, c, t, (st.k ?? 0.5) * pk, -1, 1)
      drawTears(x, 7 * c, r.y + 1.6 * c, c, t + 0.31, (st.k ?? 0.5) * pk, 1, 2)
    }
    x.restore()
    return { ...r, x: P.x + dx, y: r.y + P.y + dy, top: r.top + P.y + dy, c }
  }

  // ── props held up over a shoulder: planner (cap, left), journal (pis, right)
  function heldProps(t, cap, pis) {
    if (cap && t >= T.plan[0] && t < T.propsOut[1]) {
      const k = pop01(t, T.plan[0], 0.32, 2.2) * outK(t, T.propsOut)
      const open = ease.inOutCubic(prog(t, T.plan[0] + 0.25, T.plan[1]))
      const u = cap.c * 0.78
      x.save(); x.translate(cap.x - 9.5 * cap.c, cap.y - 15 * cap.c); x.scale(k, k); x.rotate(-0.06)
      drawPlanner(x, 0, 0, u, open, t); x.restore()
    }
    if (pis && t >= T.journal && t < T.propsOut[1]) {
      const k = pop01(t, T.journal, 0.32, 2.2) * outK(t, T.propsOut)
      x.save(); x.translate(pis.x + 10 * pis.c, pis.y - 15 * pis.c); x.scale(k, k); x.rotate(0.08 + 0.03 * Math.sin(t * 3))
      drawJournal(x, 0, 0, pis.c * 0.85, t); x.restore()
      if (t > T.journal + 0.2) sparkles(t, pis.x + 10 * pis.c, pis.y - 15 * pis.c, T.journal + 0.15, 6, 110, 1)
    }
    // round two: the clocks over their heads
    if (cap && t >= T.clockCap[0] && t < T.clockCap[1] + 0.3) {
      const k = pop01(t, T.clockCap[0], 0.3, 2.4) * outK(t, [T.clockCap[1], T.clockCap[1] + 0.25])
      x.save(); x.translate(cap.x, cap.top - 70); x.scale(k, k); drawClock(x, 0, 0, 54, t, 'neat'); x.restore()
    }
    if (pis && t >= T.clockPis[0] && t < T.clockPis[1] + 0.3) {
      const k = pop01(t, T.clockPis[0], 0.3, 2.4) * outK(t, [T.clockPis[1], T.clockPis[1] + 0.25])
      x.save(); x.translate(pis.x, pis.top - 70); x.scale(k, k); drawClock(x, 0, 0, 54, t, 'chaos'); x.restore()
      if (t > T.clockPis[0] + 0.3) for (let i = 0; i < 3; i++) {     // motion ticks around the rattling clock
        const a = t * 9 + i * 2.1
        x.fillStyle = rgba(BONE, 0.8); x.fillRect(pis.x + Math.cos(a) * 92 - 4, pis.top - 70 + Math.sin(a) * 80 - 4, 8, 8)
      }
    }
    // the tie-in: Capricorn checks the planner, then pencils in the crying
    if (cap && t >= T.l10 - 0.05 && t < T.lesson + 0.1) {
      const k = pop01(t, T.l10 - 0.05, 0.3, 2.2) * outK(t, [T.lesson - 0.1, T.lesson + 0.1])
      x.save(); x.translate(cap.x - 3 * cap.c, cap.y - 21 * cap.c); x.scale(k, k); x.rotate(-0.05)
      drawPlanner(x, 0, 0, cap.c * 0.95, ease.inOutCubic(prog(t, T.l10 + 0.1, T.l10 + 0.5)), t); x.restore()
      if (t >= T.pencil - 0.35 && t < T.pencil) {      // scribbling: the pencil wiggles on the page
        const w = Math.sin(t * 40) * 10
        x.fillStyle = '#f2c75c'; x.fillRect(cap.x - 3 * cap.c + 30 + w, cap.y - 21 * cap.c - 34, 12, 46)
        x.fillStyle = '#ff8fb1'; x.fillRect(cap.x - 3 * cap.c + 30 + w, cap.y - 21 * cap.c - 46, 12, 12)
      }
    }
  }

  // ── stamps / tags (canvas, Space Mono)
  function tag(t, t0, tOut, cx, cy, label, col, rot = -0.08, size = 40) {
    if (t < t0 || t > tOut[1]) return
    const k = easeOutBack(prog(t, t0, t0 + 0.22), 3) * outK(t, tOut)
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(lerp(1.6, 1, clamp(k)) * k, lerp(1.6, 1, clamp(k)) * k)
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const tw = x.measureText(label).width + 44, th = size * 1.7
    x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-tw / 2, -th / 2, tw, th)
    x.fillStyle = col; x.fillRect(-tw / 2, -th / 2, tw, 6); x.fillRect(-tw / 2, th / 2 - 6, tw, 6); x.fillRect(-tw / 2, -th / 2, 6, th); x.fillRect(tw / 2 - 6, -th / 2, 6, th)
    x.fillText(label, 0, 3)
    x.restore()
  }

  // ── the patch of earth, the tear, the sprout, the flower
  function flowerAt(t, pis) {
    // where the bloom's stem base is, and its cell size
    const pa = patchAt(t)
    const base = { x: pa.x, y: pa.y - pa.c * 1.5, c: pa.c * 1.25 }
    if (t < T.gift[0] || !pis) return { ...base, held: false }
    const hand = { x: pis.x - 13.6 * pis.c, y: pis.y - 3 * pis.c, c: pis.c * 0.9 }
    if (t >= T.gift[1]) return { ...hand, held: true }
    const p = ease.inOutCubic(prog(t, ...T.gift))
    return { x: lerp(base.x, hand.x, p), y: lerp(base.y, hand.y, p) - Math.sin(p * Math.PI) * 140, c: lerp(base.c, hand.c, p), held: true }
  }
  function earth(t, pis) {
    if (t >= T.cut2) return
    const pa = patchAt(t)
    let k = pop01(t, T.patchIn, 0.4, 2.2)
    if (t >= T.cut1 && t < T.cut1 + 0.6) k *= pop01(t, T.cut1 + 0.12, 0.34, 2.2)
    if (k <= 0.02) return
    const bob = Math.sin(t * 1.9) * 6
    x.save(); x.translate(pa.x, pa.y + bob); x.scale(k, k)
    drawPatch(x, 0, 0, pa.c)
    // the cricket on the patch during the silence
    if (t >= T.tape1 && t < T.music1) {
      const hop = T.crk.some(c => t - c >= 0 && t - c < 0.35) ? -8 : 0
      x.fillStyle = '#3fae5a'; x.fillRect(30, -pa.c * 1.5 - 20 + hop, 26, 12); x.fillStyle = '#1b3a1b'; x.fillRect(50, -pa.c * 1.5 - 24 + hop, 8, 8)
      x.fillStyle = '#6fe08a'; x.fillRect(24, -pa.c * 1.5 - 30 + hop, 4, 14); x.fillRect(56, -pa.c * 1.5 - 34 + hop, 4, 12)
    }
    x.restore()
    // the sprout, then the bloom (until it's handed over)
    const g = ease.outCubic(prog(t, ...T.grow)), b = easeOutBack(prog(t, T.bloom, T.bloom + 0.35), 2)
    if (g > 0 && t < T.gift[0]) drawSprout(x, pa.x, pa.y + bob - pa.c * 1.5, pa.c * 1.25, g, b, t)
    if (t >= T.drop && t < T.drop + 0.6) sparkles(t, pa.x, pa.y - 30, T.drop, 8, 120, 0.5)
    if (t >= T.bloom && t < T.bloom + 0.8) sparkles(t, pa.x, pa.y - 150, T.bloom, 10, 150, 0)
  }
  function heldFlower(t, pis) {
    if (t < T.gift[0] || !pis) return
    const f = flowerAt(t, pis)
    drawSprout(x, f.x, f.y, f.c, 1, 1, t)
  }
  // the one tear: swells on Pisces' inner eye, rolls off, arcs down onto the patch
  function bigTear(t, pis) {
    if (!pis || t < T.swell || t > T.drop + 0.3) return
    const eye = { x: pis.x - 7 * pis.c, y: pis.y + 2.6 * pis.c }
    const pa = patchAt(t), land = { x: pa.x, y: pa.y - pa.c * 1.2 }
    if (t < T.fall[0]) {
      const k = ease.outCubic(prog(t, T.swell, T.fall[0]))
      drawDrop(x, eye.x, eye.y + 10 * k, pis.c * lerp(0.3, 1.0, k))
      return
    }
    if (t < T.drop) {
      const p = prog(t, ...T.fall)
      const px = lerp(eye.x, land.x, p), py = lerp(eye.y, land.y, ease.inQuad(p)) - Math.sin(p * Math.PI) * 70
      drawDrop(x, px, py, pis.c * 1.0)
      return
    }
    // splash
    const k = prog(t, T.drop, T.drop + 0.3)
    x.save(); x.globalAlpha = 1 - k; x.fillStyle = AQUA
    for (let i = 0; i < 6; i++) { const a = Math.PI + (i / 5) * Math.PI; x.fillRect(land.x + Math.cos(a) * 70 * k - 5, land.y + Math.sin(a) * 50 * k - 5, 10, 10) }
    x.restore()
  }

  // ── the sextile: a gold line snapping between their top tips + label
  function sextileFx(t, cap, pis) {
    if (!cap || !pis || t < T.sextile || t > T.gift[0] + 0.3) return
    const p = ease.outCubic(prog(t, T.sextile, T.sextile + 0.22)), o = 1 - prog(t, T.gift[0], T.gift[0] + 0.3)
    const ax = cap.x, ay = cap.top - 18, bx = pis.x, by = pis.top - 18, mx = (ax + bx) / 2, my = (ay + by) / 2
    const lx0 = lerp(mx, ax, p), lx1 = lerp(mx, bx, p), ly0 = lerp(my, ay, p), ly1 = lerp(my, by, p)
    x.save(); x.globalAlpha = o
    x.globalCompositeOperation = 'lighter'
    x.strokeStyle = rgba(GOLD, 0.35); x.lineWidth = 26; x.lineCap = 'round'; x.beginPath(); x.moveTo(lx0, ly0); x.lineTo(lx1, ly1); x.stroke()
    x.globalCompositeOperation = 'source-over'
    x.strokeStyle = '#ffe9a8'; x.lineWidth = 12; x.beginPath(); x.moveTo(lx0, ly0); x.lineTo(lx1, ly1); x.stroke()
    const sp = ((t - T.sextile) * 0.9) % 1
    if (p >= 1) drawPixelStar(x, lerp(ax, bx, sp), lerp(ay, by, sp), 26, 1, '#fffbe8')
    for (const [ex, ey] of [[lx0, ly0], [lx1, ly1]]) { x.fillStyle = GOLD; x.fillRect(ex - 9, ey - 9, 18, 18); x.fillStyle = '#fff6d0'; x.fillRect(ex - 4, ey - 4, 8, 8) }
    const lp = easeOutBack(prog(t, T.sextile + 0.15, T.sextile + 0.45), 2.4)
    if (lp > 0) {
      x.translate(mx, my - 78); x.scale(lp, lp)
      x.font = `700 50px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      const label = 'SEXTILE', lw = x.measureText(label).width, tw = lw + 56 + 52
      x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-tw / 2, -42, tw, 84)
      x.fillStyle = GOLD; x.fillRect(-tw / 2, -42, tw, 6); x.fillRect(-tw / 2, 36, tw, 6); x.fillRect(-tw / 2, -42, 6, 84); x.fillRect(tw / 2 - 6, -42, 6, 84)
      // a six-spoke sextile mark, drawn (60° apart)
      const sx = -tw / 2 + 50
      x.strokeStyle = GOLD; x.lineWidth = 6; x.lineCap = 'square'
      for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3 + Math.PI / 2; x.beginPath(); x.moveTo(sx - Math.cos(a) * 20, 2 - Math.sin(a) * 20); x.lineTo(sx + Math.cos(a) * 20, 2 + Math.sin(a) * 20); x.stroke() }
      x.fillStyle = GOLD; x.fillText(label, sx + 34, 3)
    }
    x.restore()
    if (t < T.sextile + 0.6) sparkles(t, mx, my, T.sextile + 0.1, 10, 200, 0)
  }

  // ── innocent whistling while they both look away (♪ notes drifting off their outer shoulders)
  function whistle(t, cap, pis) {
    for (const [a, b] of [[T.away1, T.back1], [T.innocent, T.glance]]) {
      if (t < a || t > b) continue
      for (const [S, dir] of [[cap, -1], [pis, 1]]) {
        if (!S) continue
        for (let k = 0; k < 2; k++) {
          const ph = ((t - a) * 1.1 + k * 0.5) % 1
          const al = Math.sin(Math.PI * ph) * (1 - prog(t, b - 0.15, b))
          x.save(); x.globalAlpha = al
          x.font = `800 ${Math.round(S.c * 6.5)}px ${INTER}`; x.textAlign = 'center'; x.fillStyle = k ? LAV : BONE
          x.fillText(k ? '♫' : '♪', S.x + dir * S.c * (13 + 6 * ph), S.top + S.c * (8 - 12 * ph) + Math.sin(ph * 9) * 6)
          x.restore()
        }
      }
    }
  }

  // ── phones with veiled mystery cards (Cap's human sees the ♓ card, Pisces' human sees the ♑ card)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const CARDS = [
    { glyph: '♓', name: 'PISCES', el: 'WATER', elc: AQUA, a1: '#8a7cf0', a2: '#2a2a8e', a3: '#7fd0f0' },
    { glyph: '♑', name: 'CAPRICORN', el: 'EARTH', elc: LEAF, a1: '#2fc79a', a2: '#1e5a4a', a3: '#c9e86f' },
  ]
  function drawPhones(t) {
    if (t < T.phones || t > T.hopE[1]) return
    const fade = 1 - prog(t, T.hopE[0], T.hopE[1])
    PHONE.xs.forEach((px, i) => {
      const k = easeOutBack(prog(t, T.phones + i * 0.08, T.phones + i * 0.08 + 0.45), 1.7)
      if (k <= 0) return
      const card = CARDS[i], w = PHONE.w, h = PHONE.h
      const py = lerp(2300, PHONE.y, k) + (1 - fade) * 200
      // Pisces leaning in to peek at its phone: the veil thins, then snaps back
      const peek = i === 1 ? clamp(prog(t, T.peek[0] + 0.1, T.peek[1])) * (1 - prog(t, T.l10, T.l10 + 0.15)) : 0
      x.save(); x.globalAlpha = fade; x.translate(px, py); x.rotate((i ? 4 : -4) * Math.PI / 180)
      x.save(); x.shadowColor = rgba(card.a1, 0.6); x.shadowBlur = 50
      rr(-w / 2, -h / 2, w, h, 52); x.fillStyle = '#140d2a'; x.fill(); x.restore()
      x.lineWidth = 6; x.strokeStyle = rgba(BONE, 0.85); rr(-w / 2, -h / 2, w, h, 52); x.stroke()
      const sx = -w / 2 + 14, sy = -h / 2 + 14, sw = w - 28, sh = h - 28
      x.save(); rr(sx, sy, sw, sh, 40); x.clip()
      x.fillStyle = '#0d0820'; x.fillRect(sx, sy, sw, sh)
      const cx0 = sx + 18, cy0 = sy + 54, cw = sw - 36, ch = sh - 84
      x.save(); rr(cx0, cy0, cw, ch, 24); x.fillStyle = '#150c2c'; x.fill()
      const gr = x.createLinearGradient(cx0, cy0, cx0 + cw, cy0 + ch); gr.addColorStop(0, card.a1); gr.addColorStop(0.5, card.a3); gr.addColorStop(1, '#ff8fb1')
      x.lineWidth = 4; x.strokeStyle = gr; x.stroke(); x.clip()
      const ax = cx0 + 14, ay = cy0 + 66, aw = cw - 28, ah = ch * 0.5
      rr(ax, ay, aw, ah, 16); x.save(); x.clip()
      const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
      g.addColorStop(0, card.a3); g.addColorStop(0.45, card.a1); g.addColorStop(1, card.a2)
      x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
      const sil = 0.32 + 0.5 * peek
      x.fillStyle = rgba('#1a0e30', sil); x.filter = `blur(${lerp(14, 7, peek)}px)`
      x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.17, 0, Math.PI * 2); x.fill()
      x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.02, aw * 0.36, ah * 0.36, 0, 0, Math.PI * 2); x.fill()
      x.filter = 'none'
      const vs = ((t * 0.5 + i * 0.4) % 1.4) - 0.2
      const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
      x.font = `800 ${Math.round(aw * 0.36)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(BONE, 0.85 - 0.4 * peek)
      x.fillText('?', ax + aw / 2, ay + ah * 0.46)
      x.restore()
      x.font = `700 15px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(BONE, 0.75)
      x.fillText('NO PHOTO YET', ax + 10, ay + ah - 12)
      const pulse = 0.65 + 0.35 * Math.sin(t * 5 + i)
      const gx2 = cx0 + cw - 40, gy2 = cy0 + 34
      x.save(); x.shadowColor = card.a1; x.shadowBlur = 26 + 22 * pulse
      x.beginPath(); x.arc(gx2, gy2, 24, 0, Math.PI * 2); x.fillStyle = card.a1; x.fill(); x.restore()
      x.font = `700 30px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
      x.fillText(card.glyph + '︎', gx2, gy2 + 2)
      x.font = `italic 500 34px 'EB Garamond', serif`; x.textAlign = 'left'; x.fillStyle = BONE; x.fillText('Mystery card', cx0 + 16, cy0 + 38)
      const ry = ay + ah + 44
      x.font = `600 25px 'EB Garamond', serif`; x.fillStyle = card.a1; x.textAlign = 'left'; x.fillText(card.name, cx0 + 16, ry)
      x.font = `700 16px ${MONO}`
      const pw = 86, pxl = cx0 + cw - pw - 12
      rr(pxl, ry - 18, pw, 32, 16); x.strokeStyle = rgba(card.elc, 0.9); x.lineWidth = 2; x.stroke()
      x.fillStyle = card.elc; x.textBaseline = 'middle'; x.textAlign = 'center'; x.fillText(card.el, pxl + pw / 2, ry - 1)
      x.fillStyle = rgba(BONE, 0.18)
      for (let r = 0; r < 4; r++) x.fillRect(cx0 + 16, ry + 34 + r * 26, cw * (r % 2 ? 0.58 : 0.78), 10)
      x.restore()
      x.fillStyle = '#140d2a'; rr(-50, sy + 12, 100, 26, 13); x.fill()
      x.restore()
      x.restore()
      if (peek > 0.05 && i === 1) sparkles(t, px, PHONE.y - 120, T.peek[0] + 0.4, 6, 130, 3)
    })
  }

  // ── the padlock
  function drawLock(t) {
    if (t < T.lock) return
    const k = pop01(t, T.lock, 0.36, 2.6) * popOut(t, T.out)
    if (k <= 0.02) return
    const shut = ease.inCubic(prog(t, T.lockShut - 0.12, T.lockShut))
    const jig = t > T.lockShut ? 0.12 * Math.sin((t - T.lockShut) * 30) * Math.exp(-(t - T.lockShut) * 7) : 0
    x.save(); x.translate(540, 1095 + Math.sin(t * 2.4) * 6); x.scale(k, k)
    const g = x.createRadialGradient(0, 0, 0, 0, 0, 150); g.addColorStop(0, rgba(GOLD, 0.35)); g.addColorStop(1, rgba(GOLD, 0))
    x.fillStyle = g; x.fillRect(-150, -150, 300, 300)
    drawPadlock(x, 0, 0, 9, 1 - shut, jig)
    x.restore()
    if (t > T.lockShut) sparkles(t, 540, 1080, T.lockShut, 8, 120, 1)
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

  // the crickets: '*chirp*' rising off the patch
  function cricketNote(t) {
    for (const c of T.crk) {
      const k = t - c
      if (k < 0 || k > 1.1) continue
      const a = Math.min(1, k / 0.1) * (1 - prog(k, 0.8, 1.1))
      const pa = patchAt(t)
      x.save(); x.globalAlpha = a
      x.font = `700 40px ${MONO}`; x.fillStyle = rgba(BONE, 0.85); x.textAlign = 'center'
      x.fillText('*chirp*', pa.x + 40, pa.y - 70 - k * 40)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawPhones(t)
        const C = cam(t)
        x.save(); x.translate(C.cx, C.cy); x.scale(C.s, C.s); x.translate(-C.cx, -C.cy)
        drawChar('leo', t, 0.85); drawChar('sag', t, 0.85)
        earth(t)
        const cap = drawChar('cap', t), pis = drawChar('pis', t)
        bigTear(t, pis)
        heldFlower(t, pis)
        heldProps(t, cap, pis)
        whistle(t, cap, pis)
        sextileFx(t, cap, pis)
        cricketNote(t)
        if (pis) tag(t, T.stamp, [T.cut2 - 0.35, T.cut2 - 0.1], pis.x - 40, pis.top - 80, '★ FIRST FLOWERS', PINK, -0.07, 40)
        if (cap) tag(t, T.pencil, [T.lesson - 0.1, T.lesson + 0.1], 570, 560, 'CRY · PENCILED IN', LEAF, -0.06, 34)
        drawLock(t)
        x.restore()
      }
      for (const b of BOXES) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      const ek = t >= T.ep[0] && t < T.ep[1] + 0.2 ? clamp(pop01(t, T.ep[0], 0.3, 2.2)) * outK(t, [T.ep[1], T.ep[1] + 0.2]) : 0
      EP.style.display = ek > 0 ? 'block' : 'none'
      if (ek > 0) { EP.style.opacity = String(ek); EP.style.transform = `translateX(-50%) scale(${lerp(0.7, 1, ek).toFixed(3)})` }
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 9.42 (round one → two), 15.3 (round two → three, flip), 22.8 (the plip — kept out), 27.82 (the
// bloom → the phones, flip). The default selection keeps 15.3 and 27.82; the end card flips at 40.6 (12.5 / 12.8 s apart).
export const CUTS = [9.42, { t: T.cut1, kind: 'flip' }, 21.0, { t: T.cut2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
/** real silence in the score: a tape stop at t0, then more tape stops chained over its own silent tail, so the music
 *  stays stopped until `until` (each stop only ever reads the already-silent tail of the one before it) */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L }
  return out
}
const cricket = (t, pan = 0.55) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const sobs = t => [0, 0.16, 0.3, 0.5, 0.64, 0.82].map((d, i) => ['pop', +(t + d).toFixed(3), [659.25, 587.33, 523.25, 659.25, 587.33, 493.88][i], 0.022, 0.3])
const close = t => [['pop', t, 880, 0.03, 0], ['pop', t + 0.07, 587.33, 0.03, 0]]
const open = t => [['pop', t, 659.25, 0.035, 0], ['pop', t + 0.06, 880, 0.025, 0]]
export const CUES = [
  // 1 · before you meet
  ...head(T.h1, 3, T.h1Land, 0), ['pop', T.h1Land + 0.14, 1174.66, 0.045, 0],
  ['pop', T.capIn + 0.12, 587.33, 0.035, -0.4], ['pop', T.pisIn + 0.12, 987.77, 0.035, 0.4], ['pop', T.bgIn + 0.1, 1318.51, 0.018, -0.1], ['pop', T.bgIn + 0.18, 1567.98, 0.018, 0.1],
  ['pluck', T.patchIn + 0.05, 392, 0.035, 0.4, 0], ['tick', T.ep[0], 0.03],
  ...open(T.open1),
  ...talkCues(ALL, { cps: CPS, pitch: { [CAP]: 587, [PIS]: 988, [BOTH]: 740, [STARS]: 880 } }),
  ...close(T.close1),
  // 2 · round one
  ...head(T.h2, 1, T.h2Land, 2), ...open(T.open2),
  ['pop', T.plan[0] + 0.05, 659.25, 0.035, -0.4], ['whoosh', T.plan[0] + 0.25, 0.25, 0.04], ['tick', T.plan[1], 0.05], ['pluck', T.plan[1], 1318.51, 0.03, 0.5, -0.4],
  ['pop', T.journal + 0.05, 1174.66, 0.035, 0.4], ['glitter', T.journal + 0.1, T.journal + 0.6],
  ['whoosh', T.propsOut[0], 0.25, 0.03],
  ...silence(T.tape1, 0.5, T.music1),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.5),
  ['tick', T.away1, 0.035], ['tick', T.away1 + 0.02, 0.03],
  // 3 · round two
  ...head(T.h3, 1, T.h3Land, 3),
  ['pop', T.clockCap[0] + 0.05, 783.99, 0.035, -0.4], ...[0.5, 1.0, 1.5, 2.0].map(d => ['tick', +(T.clockCap[0] + d).toFixed(3), 0.03]),
  ['pop', T.clockPis[0] + 0.05, 987.77, 0.035, 0.4], ['whoosh', T.clockPis[0] + 0.1, 0.9, 0.05],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.clockPis[0] + 0.15 + i * 0.09).toFixed(3), 0.022]),
  ...sobs(T.sob[0]),
  ['pluck', T.droop, 220, 0.075, 0.32, 0], ['pluck', T.droop + 0.3, 207.65, 0.08, 0.9, 0],
  ...close(T.close2),
  // 4 · round three (quiet, then the score stops for the long look)
  ...head(T.h4, 1, T.h4Land, 4), ...open(T.open3),
  ...silence(T.tape2, 0.6, T.drop),
  ['tick', T.turn[0], 0.02], ['tick', T.turn[1], 0.02],
  ['pluck', T.swell, 1318.51, 0.02, 0.4, 0.3], ['whoosh', T.fall[0], 0.5, 0.025],
  // 5 · plip → earth meets water (the drop)
  ['pop', T.drop, 1567.98, 0.06, 0], ['pluck', T.drop, 1567.98, 0.05, 0.7, 0], ['glitter', T.drop, T.drop + 0.4],
  ...[0.1, 0.22, 0.34, 0.46, 0.58].map((d, i) => ['pop', +(T.drop + d).toFixed(3), [523.25, 659.25, 783.99, 1046.5, 1318.51][i], 0.03, 0]),
  ...head(T.h5, 2, T.h5Land, 1),
  ['bell', T.bloom, 1174.66, 0.045, 1.4, 0], ['boom', T.bloom, 0.14], ['glitter', T.bloom, T.bloom + 0.7],
  ['pluck', T.sextile, 1174.66, 0.045, 0.8, 0], ['bell', T.sextile + 0.12, 1567.98, 0.035, 1.6, 0], ['bell', T.sextile + 0.24, 1760, 0.025, 1.6, 0],
  ...open(T.open4),
  ['whoosh', T.gift[0], 0.6, 0.04], ['pop', T.gift[1], 1318.51, 0.04, 0.3],
  ['boom', T.stamp, 0.1], ['tick', T.stamp, 0.1], ['pop', T.stamp + 0.01, 783.99, 0.045, 0.3], ['glitter', T.stamp, T.stamp + 0.5], ...sobs(T.stamp + 0.15),
  ...close(T.close4),
  // 6 · card first, face last
  ['pop', T.phones + 0.3, 659.25, 0.035, -0.3], ['pop', T.phones + 0.38, 783.99, 0.035, 0.3],
  ...head(T.h6, 3, T.h6Land, 4), ['glitter', T.phones + 0.4, T.phones + 0.9],
  ['tick', T.peek[0] + 0.1, 0.03], ['tick', T.peek[0] + 0.4, 0.03], ['whoosh', T.l10 - 0.05, 0.18, 0.05], ['pop', T.l10 - 0.02, 440, 0.04, -0.3],
  ...open(T.open5),
  ...[0, 0.08, 0.16, 0.24].map(d => ['tick', +(T.pencil - 0.35 + d).toFixed(3), 0.03]), ['pop', T.pencil, 1046.5, 0.045, -0.3], ['pluck', T.pencil, 1318.51, 0.03, 0.5, -0.3],
  ...close(T.close5),
  // 7 · ★ lesson unlocked
  ['whoosh', T.hopE[0], 0.4, 0.035],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 8 · our lips are sealed
  ['whoosh', T.lessonOut[0], 0.3, 0.035],
  ...head(T.h7, 3, T.h7Land, 0),
  ['pop', T.lock + 0.08, 880, 0.035, 0], ['tick', T.lockShut, 0.12], ['pop', T.lockShut + 0.01, 293.66, 0.05, 0], ['glitter', T.lockShut, T.lockShut + 0.4],
  ['pluck', T.innocent + 0.1, 1567.98, 0.028, 0.35, -0.3], ['pluck', T.innocent + 0.32, 1318.51, 0.028, 0.5, 0.3],
  ...wordPops(T.h8, 3, 0.07, 3, 0.02),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
