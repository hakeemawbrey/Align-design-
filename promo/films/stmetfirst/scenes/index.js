// stmetfirst — "Our Stars Met First" (45 s vertical Align ad, Star Talk season 2 #1) · story 0–40.6, then the shared end card.
//   0.00–4.1   "Before you meet, | your *stars* do."  ♌ LEO (crooked crown) and ♐ SAG (bow tie) face each other like two
//              parents meeting at a wedding. ♓ Pisces hovers in the back, already crying happy tears.
//              SAG: "So. Your human and my human, huh?"
//   4.1–11.7   "Say | *something.*"  The music grinds to a halt (tape stop) — real silence, crickets, a slow push-in.
//              Leo eyes its crown and straightens it; both look away at the same moment.
//              LEO: "…nice weather. In space."  SAG: "Very. Spacious."  They look away again. Cricket.
//  11.7–17.3   "It gets | *worse.*"  The lounge jazz limps back. LEO: "So what does your human do?"
//              SAG: "Something with spreadsheets."  Both droop (womp). Pisces sobs in the back.
//  17.3        card cut (flip) to a closer two-shot.
//  17.3–22.3   "Plot | *twist.*"  Sag squints, leans in at Leo's ♌ badge… gasp, record scratch, the music stops.
//              SAG: "Wait. You're FIRE?" (Leo's badge catches fire)  LEO: "YOU'RE FIRE??" (so does Sag's)
//  22.27–27.9  "Fire | meets *fire.*"  The band drops in. Hop in sync, a pixel secret handshake with their points (tap,
//              tap, spin, bump), a gold trine line snaps between them. SAG: "Our humans are gonna get along SO well."
//  28.0–34.6   "Card first. | Face *last.*"  Each star hops onto its human's phone: veiled mystery cards, sign badge glowing,
//              face hidden. LEO: "They haven't seen each other yet." Leo tries to peek… SAG: "Don't. Spoil. The face."
//  34.75       card cut (deal) into the lesson.
//  34.9–38.5   ★ LESSON UNLOCKED — "The spark | isn't the face. | It's what you *share.*"
//  38.5–40.55  A padlock pops between them; both turn innocent. "Our lips are | *sealed.*" "(We don't have lips.)"
//  40.6        end card.
// One canvas (sky + phones + cast + props), DOM type + dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawCrown, drawBowTie, drawPadlock, drawFlame, drawTears, drawSpark } from '../props.js'
import { popText, lessonBanner } from '../text.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const LEO_C = signStar('leo').color, SAG_C = signStar('sagittarius').color, PIS_C = signStar('pisces').color
const LEO_T = '#ffb45c', SAG_T = '#cfa2ff', FIRE = '#ff8a3a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  black: [0, 0.3],
  h1: 0.15, h1Land: 0.72, h1Out: [3.95, 4.15],
  leoIn: 0.2, sagIn: 0.38, pisIn: 0.7,
  open1: 0.83, l1: 1.05, close1: 4.05,
  tape1: 4.1, music1: BEAT(20),                  // 11.71: the lounge jazz limps back in
  h2: 4.5, h2Land: 5.0, h2Out: [11.42, 11.6],
  crk: [4.75, 6.6, 10.85],
  crownLook: 4.85, crown: [5.35, 5.72], away1: 6.05, back1: 6.95,
  open2: 7.0, l2: 7.2, l3: 9.75, away2: 10.62, back2: 11.75, l4: 12.05, l5: 14.6, droop: 15.72, sob: [16.0, 17.25], close2: 17.12,
  h3: 11.72, h3Land: 12.05, h3Out: [16.95, 17.15],
  cut1: 17.3,
  h4: 17.38, h4Land: 17.72, h4Out: [22.02, 22.2],
  lean: [17.6, 18.1], ring: 18.15, gasp: 18.72, build: BEAT(35),   // 20.05: the build to the drop
  open3: 18.75, l6: 18.95, leoCheck: 19.95, gasp2: 20.7, l7: 21.35, close3: 23.35,
  drop: BEAT(39),                                // 22.27
  h5: 22.3, h5Land: 22.68, h5Out: [27.68, 27.86],
  slide: [22.6, 22.85], back: [22.85, 23.0], tap2: [23.0, 23.15], apart: [23.15, 23.35], spin: [23.35, 23.85], bump: [23.88, 24.02], spring: [24.25, 24.55], trine: 24.3,
  open4: 24.68, l8: 24.9, close4: 27.85,
  move: [27.95, 28.45],
  phones: 28.05, h6: 28.1, h6Land: 28.5, h6Out: [34.42, 34.6],
  open5: 28.7, l9: 28.9, peek: [30.45, 31.75], notice: 31.05, l10: 31.8, close5: 34.52,
  cut2: 34.75,
  banner: 34.92, lesson: 35.3, lessonLand: 35.75, lessonOut: [38.28, 38.48],
  move2: [38.42, 38.82], lock: 38.62, lockShut: 38.98, h7: 38.52, h7Land: 38.8, h8: 39.12, innocent: 39.0, glance: 39.75,
  out: [40.18, 40.5],
}
const LEO = '♌ LEO STAR', SAG = '♐ SAG STAR'
const L_A = [{ t: T.l1, speaker: SAG, color: SAG_T, text: 'So. Your human and my human, *huh?*' }]
const L_B = [
  { t: T.l2, speaker: LEO, color: LEO_T, text: '…nice weather. In *space.*' },
  { t: T.l3, speaker: SAG, color: SAG_T, text: 'Very. *Spacious.*' },
  { t: T.l4, speaker: LEO, color: LEO_T, text: 'So what does your human *do?*' },
  { t: T.l5, speaker: SAG, color: SAG_T, text: 'Something with *spreadsheets.*' },
]
const L_C = [
  { t: T.l6, speaker: SAG, color: FIRE, text: "Wait. You're *FIRE?*" },
  { t: T.l7, speaker: LEO, color: FIRE, text: "YOU'RE *FIRE??*" },
]
const L_D = [{ t: T.l8, speaker: SAG, color: GOLD, text: 'Our humans are gonna get along *SO* well.' }]
const L_E = [
  { t: T.l9, speaker: LEO, color: LEO_T, text: "They haven't seen each other *yet.*" },
  { t: T.l10, speaker: SAG, color: SAG_T, text: "Don't. Spoil. The *face.*" },
]
const ALL = [...L_A, ...L_B, ...L_C, ...L_D, ...L_E]
const CPS = 28
const LT = lineTimes(ALL, { cps: CPS })
const LTC = lineTimes(L_C, { cps: CPS }), LTE = lineTimes(L_E, { cps: CPS })
const FIRE1 = LTC[0].chars[13], FIRE2 = LTC[1].chars[7]          // "FIRE" lands → the badge ignites
const DONT = LTE[1].chars.slice(0, 1).concat([LTE[1].chars[7], LTE[1].chars[14]])   // "Don't." "Spoil." "The"
const HOP = {
  leo: [T.leoIn + 0.3, ...talkHops(ALL, LEO, { cps: CPS }), T.crown[1], T.drop, T.drop + 0.56, T.trine + 0.1, T.move[1], T.move2[1]],
  sag: [T.sagIn + 0.3, ...talkHops(ALL, SAG, { cps: CPS }), T.gasp, T.drop, T.drop + 0.56, T.trine + 0.1, T.move[1] + 0.05, ...DONT, T.move2[1] + 0.05],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
/** keyframed state: the last entry with t0 ≤ t */
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }

// ── layouts per beat
const LAY = {
  A: { leo: { x: 300, y: 1090, s: 390 }, sag: { x: 780, y: 1090, s: 390 }, pis: { x: 540, y: 690, s: 150 } },
  B: { leo: { x: 290, y: 1100, s: 440 }, sag: { x: 790, y: 1100, s: 440 }, pis: { x: 540, y: 600, s: 130 } },
  D: { leo: { x: 300, y: 720, s: 245 }, sag: { x: 780, y: 720, s: 245 }, pis: { x: 540, y: 590, s: 110 } },
  E: { leo: { x: 320, y: 1500, s: 300 }, sag: { x: 760, y: 1500, s: 300 }, pis: { x: 540, y: 1690, s: 140 } },
  F: { leo: { x: 345, y: 1130, s: 330 }, sag: { x: 735, y: 1130, s: 330 }, pis: { x: 540, y: 1480, s: 140 } },
}
const PHONE = { w: 340, h: 620, y: 1135, xs: [300, 780] }

/** half the distance between the two stars during the handshake beat (they're centred on 545) */
function hsGap(t) {
  const segs = [[T.slide, 250, 199, ease.inCubic], [T.back, 199, 228, ease.outCubic], [T.tap2, 228, 199, ease.inCubic], [T.apart, 199, 246, ease.outCubic],
    [T.bump, 246, 199, ease.inQuad], [T.spring, 199, 228, x => easeOutBack(x, 2.4)]]
  let g = 250
  for (const [[a, b], f, to, e] of segs) { if (t >= a) g = t >= b ? to : lerp(f, to, e(prog(t, a, b))) }
  return g
}
const TAPS = [T.slide[1], T.tap2[1], T.bump[1]]

/** where a character is at t */
function posOf(who, t) {
  if (t < T.cut1) return LAY.A[who]
  if (t < T.move[0]) {
    const P = { ...LAY.B[who] }
    if (who === 'pis') return P
    if (t >= T.slide[0]) { const g = hsGap(t); P.x = who === 'leo' ? 540 - g : 540 + g }
    if (who === 'sag' && t >= T.lean[0] && t < T.gasp) P.x -= 105 * ease.inOutCubic(prog(t, ...T.lean))
    if (who === 'sag' && t >= T.gasp && t < T.slide[0]) P.x -= 105 * (1 - easeOutBack(prog(t, T.gasp, T.gasp + 0.3), 2.5))
    if (who === 'leo' && t >= T.leoCheck && t < T.gasp2) P.x += 40 * ease.inOutCubic(prog(t, T.leoCheck, T.leoCheck + 0.4))
    if (who === 'leo' && t >= T.gasp2 && t < T.slide[0]) P.x += 40 * (1 - easeOutBack(prog(t, T.gasp2, T.gasp2 + 0.3), 2.5))
    return P
  }
  if (t < T.cut2) {
    // hop from the trine two-shot onto the phones (an arc; no card cut here)
    const p = prog(t, ...T.move), e = ease.inOutCubic(p)
    const A = { ...LAY.B[who] }; if (who !== 'pis') A.x = who === 'leo' ? 540 - 228 : 540 + 228
    const D = LAY.D[who]
    return { x: lerp(A.x, D.x, e), y: lerp(A.y, D.y, e) - Math.sin(p * Math.PI) * (who === 'pis' ? 60 : 180), s: lerp(A.s, D.s, e) }
  }
  if (t < T.move2[0]) return LAY.E[who]
  const p = prog(t, ...T.move2), e = ease.inOutCubic(p)
  const A = LAY.E[who], F = LAY.F[who]
  return { x: lerp(A.x, F.x, e), y: lerp(A.y, F.y, e) - Math.sin(p * Math.PI) * 120, s: lerp(A.s, F.s, e) }
}

// ── moods (state = { mood, look, blink, squash, dy, rot })
const LEO_K = [
  [0, { mood: 'neutral', look: [1, 0] }], [0.95, { mood: 'neutral', look: [0, 0] }], [1.35, { mood: 'neutral', look: [1, 0] }],
  [2.3, { mood: 'happy' }], [3.0, { mood: 'neutral', look: [1, 0] }],
  [4.1, { mood: 'neutral', look: [0, 0], blink: false }], [T.crownLook, { mood: 'neutral', look: [0, -1], blink: false }],
  [T.crown[0], { mood: 'squint', look: [0, -1] }], [T.crown[1], { mood: 'happy' }],
  [T.away1, { mood: 'neutral', look: [-1, -1], blink: false }], [T.back1, { mood: 'neutral', look: [1, 0] }],
  [T.l2 + 0.3, { mood: 'neutral', look: [0, 0] }], [LT[1].done, { mood: 'happy' }], [T.l3 - 0.1, { mood: 'neutral', look: [1, 0] }],
  [T.away2, { mood: 'neutral', look: [-1, -1], blink: false }], [T.back2, { mood: 'neutral', look: [1, 0] }],
  [T.l4, { mood: 'sparkle', look: [1, 0] }], [LT[3].done + 0.2, { mood: 'neutral', look: [1, 0] }],
  [T.droop, { mood: 'sleepy', squash: 0.16, dy: 22 }],
  [T.cut1, { mood: 'neutral', look: [1, 0] }], [T.lean[0] + 0.2, { mood: 'neutral', look: [1, 1] }],
  [T.gasp, { mood: 'wide', look: [1, 0] }], [FIRE1 - 0.05, { mood: 'wide', look: [1, 1] }],
  [T.leoCheck, { mood: 'squint', look: [1, 1] }], [T.gasp2, { mood: 'wide', look: [1, 0] }],
  [T.drop, { mood: 'happy' }], [T.slide[0], { mood: 'happy' }], [T.spin[0], { mood: 'wide', look: [0, 0] }], [T.spin[1], { mood: 'happy' }],
  [T.bump[1], { mood: 'heart' }], [T.l8, { mood: 'sparkle', look: [1, 0] }], [LT[7].done + 0.2, { mood: 'happy' }],
  [T.move[1], { mood: 'happy' }], [T.l9, { mood: 'neutral', look: [0, 1] }], [LT[8].done, { mood: 'squint', look: [0, 1] }],
  [T.peek[0], { mood: 'squint', look: [0, 1], dy: 46, squash: 0.12 }], [T.peek[0] + 0.55, { mood: 'heart', dy: 52, squash: 0.12 }], [DONT[0], { mood: 'wide', look: [1, 0], dy: -6 }],
  [LT[9].done + 0.3, { mood: 'happy', look: [0, 0] }],
  [T.cut2, { mood: 'sparkle', look: [0, -1] }], [T.lessonLand + 0.4, { mood: 'sparkle', look: [0, -1] }], [37.3, { mood: 'happy' }],
  [T.move2[0], { mood: 'happy' }], [T.innocent, { mood: 'neutral', look: [-1, -1], blink: false }], [T.glance, { mood: 'wink' }],
]
const SAG_K = [
  [0, { mood: 'neutral', look: [-1, 0] }], [T.l1, { mood: 'sparkle', look: [-1, 0] }], [LT[0].done + 0.1, { mood: 'happy' }], [3.1, { mood: 'neutral', look: [-1, 0] }],
  [4.1, { mood: 'neutral', look: [0, 0], blink: false }], [T.crown[0] - 0.1, { mood: 'neutral', look: [-1, -1] }], [T.crown[1] + 0.1, { mood: 'neutral', look: [0, 0] }],
  [T.away1, { mood: 'neutral', look: [1, -1], blink: false }], [T.back1, { mood: 'neutral', look: [-1, 0] }],
  [T.l3, { mood: 'neutral', look: [-1, 0] }], [LT[2].done - 0.3, { mood: 'happy' }],
  [T.away2, { mood: 'neutral', look: [1, -1], blink: false }], [T.back2, { mood: 'neutral', look: [-1, 0] }],
  [T.l5, { mood: 'neutral', look: [0, 0] }], [T.droop, { mood: 'sleepy', squash: 0.16, dy: 22 }],
  [T.cut1, { mood: 'neutral', look: [-1, 0] }], [T.lean[0], { mood: 'squint', look: [-1, 1], squash: -0.05 }],
  [T.gasp, { mood: 'wide', look: [-1, 1] }], [T.l6 + 0.3, { mood: 'wide', look: [-1, 0] }],
  [T.leoCheck, { mood: 'neutral', look: [-1, 0] }], [T.gasp2, { mood: 'wide', look: [-1, 0] }], [FIRE2, { mood: 'wide', look: [1, 1] }],
  [T.drop, { mood: 'happy' }], [T.spin[0], { mood: 'wide', look: [0, 0] }], [T.spin[1], { mood: 'happy' }],
  [T.bump[1], { mood: 'heart' }], [T.l8, { mood: 'sparkle', look: [0, 0] }], [LT[7].done + 0.2, { mood: 'happy' }],
  [T.move[1], { mood: 'happy' }], [T.l9, { mood: 'neutral', look: [0, 1] }], [T.notice, { mood: 'wide', look: [-1, 0] }],
  [T.l10, { mood: 'squint', look: [-1, 0] }], [LT[9].done + 0.3, { mood: 'happy', look: [0, 0] }],
  [T.cut2, { mood: 'sparkle', look: [0, -1] }], [37.3, { mood: 'happy' }],
  [T.move2[0], { mood: 'happy' }], [T.innocent + 0.05, { mood: 'neutral', look: [1, -1], blink: false }], [T.glance + 0.08, { mood: 'happy' }],
]
// Pisces: always crying happy tears (k = tear intensity)
const PIS_K = [
  [0, { mood: 'happy', k: 0.5 }], [4.1, { mood: 'neutral', k: 0.35, look: [-1, 0] }], [5.5, { mood: 'neutral', k: 0.35, look: [1, 0] }],
  [T.away1, { mood: 'neutral', k: 0.35, look: [0, 0] }], [8.5, { mood: 'neutral', k: 0.35, look: [-1, 0] }], [T.l3, { mood: 'neutral', k: 0.35, look: [1, 0] }],
  [T.away2, { mood: 'neutral', look: [0, 0], k: 0.35 }],
  [T.music1, { mood: 'happy', k: 0.45 }], [T.sob[0], { mood: 'neutral', blink: 1, k: 1.6, shake: 1 }], [T.sob[1], { mood: 'happy', k: 0.5 }],
  [T.gasp, { mood: 'wide', k: 0.3, look: [0, 1] }], [T.drop, { mood: 'happy', k: 0.8 }], [T.bump[1], { mood: 'happy', k: 1.9, shake: 0.5 }],
  [T.move[0], { mood: 'happy', k: 0.6 }], [T.peek[0] + 0.3, { mood: 'wide', k: 0.3, look: [-1, 1] }], [T.l10, { mood: 'happy', k: 0.6 }],
  [T.cut2, { mood: 'happy', k: 0.9 }], [T.lessonLand, { mood: 'happy', k: 1.8, shake: 0.4 }],
  [T.move2[0], { mood: 'happy', k: 0.8 }],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H1 = popText(root, 'Before you meet, | your *stars* do.', { top: 200, size: 104, accentSize: 150, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.14, wobble: true, gap: 0.08, accentColor: GOLD })
  const H2 = popText(root, 'Say | *something.*', { top: 200, size: 112, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: LAV })
  const H3 = popText(root, 'It gets | *worse.*', { top: 200, size: 112, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'Plot | *twist.*', { top: 200, size: 120, accentSize: 180, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: FIRE })
  const H5 = popText(root, 'Fire | meets *fire.*', { top: 200, size: 120, accentSize: 176, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: FIRE })
  const H6 = popText(root, 'Card first. | Face *last.*', { top: 200, size: 112, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'Our lips are | *sealed.*', { top: 190, size: 112, accentSize: 168, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
  const H8 = popText(root, '(We don’t have lips.)', { top: 590, size: 64, at: T.h8, gap: 0.06, color: 'rgba(239,230,214,0.92)' })
  const LES = popText(root, 'The spark | isn’t the face. | It’s what you *share.*', { top: 880, size: 88, accentSize: 122, at: T.lesson, late: 1, lateAt: T.lessonLand, gap: 0.075, wobble: false, accentColor: GOLD, lineHeight: 1.08, side: 40 })
  const BAN = lessonBanner(root, { at: T.banner, out: T.lessonOut, top: 640 })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.out], [H8, T.out], [LES, T.lessonOut]]
  const BOXES = [
    dialogueBox(root, { lines: L_A, y: 1400, open: T.open1, close: T.close1, cps: CPS }),
    dialogueBox(root, { lines: L_B, y: 1400, open: T.open2, close: T.close2, cps: CPS }),
    dialogueBox(root, { lines: L_C, y: 1400, open: T.open3, close: T.close3, cps: CPS }),
    dialogueBox(root, { lines: L_D, y: 1400, open: T.open4, close: T.close4, cps: CPS }),
    dialogueBox(root, { lines: L_E, y: 1500, open: T.open5, close: T.close5, cps: CPS }),
  ]
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera (characters + props only): a slow excruciating push-in during the silence, a punch-in on the gasp
  function cam(t) {
    let s = 1, cy = 1060
    if (t < T.tape1) s = 1 + 0.02 * prog(t, 0, 4)
    else if (t < T.music1 - 0.06) s = 1.02 + 0.15 * ease.inOutQuad(prog(t, 4.3, 11.4))
    else if (t < T.cut1) s = lerp(1.17, 1, easeOutBack(prog(t, T.music1 - 0.06, T.music1 + 0.25), 1.4))
    else if (t < T.slide[0]) { cy = 1110; s = t < T.gasp ? 1 + 0.03 * prog(t, T.cut1, T.gasp) : lerp(1.03, 1.1, easeOutBack(prog(t, T.gasp, T.gasp + 0.18), 2)) - 0.07 * ease.inOutCubic(prog(t, T.drop - 0.05, T.drop + 0.3)) }
    return { s, cx: 540, cy }
  }

  // ── a character
  function drawChar(who, t, alpha = 1) {
    const P = { ...posOf(who, t) }
    const K = who === 'leo' ? LEO_K : who === 'sag' ? SAG_K : PIS_K
    const st = keyed(t, K)
    const col = who === 'leo' ? LEO_C : who === 'sag' ? SAG_C : PIS_C
    const glyph = who === 'leo' ? '♌' : who === 'sag' ? '♐' : '♓'
    // pop-in / pop-out
    let pk = 1
    const tin = who === 'leo' ? T.leoIn : who === 'sag' ? T.sagIn : T.pisIn
    pk *= pop01(t, tin, 0.42, 2.2)
    if (t >= T.cut1 && t < T.cut1 + 0.6) pk *= pop01(t, T.cut1 + 0.06 + (who === 'sag' ? 0.05 : who === 'pis' ? 0.1 : 0), 0.34, 2.2)
    if (t >= T.cut2 && t < T.cut2 + 0.6) pk *= pop01(t, T.cut2 + 0.12 + (who === 'sag' ? 0.05 : who === 'pis' ? 0.1 : 0), 0.34, 2.2)
    pk *= popOut(t, T.out)
    if (pk <= 0.02) return
    let rot = 0
    if (who === 'pis' && t >= T.sob[0] - 0.1 && t < T.sob[1] + 0.3) { const k = Math.sin(Math.PI * prog(t, T.sob[0] - 0.1, T.sob[1] + 0.3)) ; P.s *= 1 + 0.35 * Math.min(1, k * 2.5); }
    if (t >= T.spin[0] && t < T.spin[1]) rot = (who === 'leo' ? -1 : 1) * Math.PI * 2 * ease.inOutCubic(prog(t, ...T.spin))
    let dx = 0
    if (st.shake) dx = Math.sin(t * 60) * 5 * st.shake
    const dy = st.dy || 0
    const hops = who === 'pis' ? [T.pisIn + 0.3, T.drop, T.bump[1] + 0.1, T.bump[1] + 0.5, T.lessonLand + 0.1, T.lessonLand + 0.5] : HOP[who]
    x.save()
    x.translate(P.x + dx, P.y + dy); if (rot) x.rotate(rot)
    const r = drawStarChar(x, 0, 0, P.s, t, { color: col, glyph: P.s >= 150 ? glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash || 0, hops, seed: who === 'leo' ? 3 : who === 'sag' ? 7 : 11, pop: pk, alpha, zzz: false, glow: who === 'pis' ? 0.7 : 1 })
    const c = r.size / 36
    // props ride on the character
    if (who === 'leo') {
      const fix = easeOutBack(prog(t, ...T.crown), 2.2)
      const crooked = 1 - clamp(fix, -0.2, 1.2)
      const squ = (st.squash || 0)
      drawCrown(x, crooked * -3.2 * c, r.top + (3.6 + crooked * 1.4 + squ * 10) * c, c * 0.9, crooked * -0.72)
    }
    if (who === 'sag') drawBowTie(x, 0, r.y + 7.4 * c, c * 0.8)
    if (who === 'pis') {
      drawTears(x, -7 * c, r.y + 1.6 * c, c, t, (st.k || 0.5) * pk, -1, 1)
      drawTears(x, 7 * c, r.y + 1.6 * c, c, t + 0.31, (st.k || 0.5) * pk, 1, 2)
    }
    // the fire badges
    const fireAt = who === 'leo' ? FIRE1 : who === 'sag' ? FIRE2 : Infinity
    if (t >= fireAt && t < T.move[0] + 0.2 && P.s >= 150) {
      const fk = easeOutBack(prog(t, fireAt, fireAt + 0.3), 2.6) * (1 - prog(t, T.move[0] - 0.1, T.move[0] + 0.15))
      drawFlame(x, 9.6 * c, r.y + 8.2 * c, c * 0.9, t, who === 'leo' ? 0 : 1, fk)
    }
    x.restore()
    return { ...r, x: P.x + dx, y: r.y + P.y + dy, top: r.top + P.y + dy, c }
  }

  // ── the "zoom ring" on Leo's badge (Sag's squint)
  function badgeRing(t, leo) {
    if (!leo || t < T.ring || t > T.gasp + 0.5) return
    const p = prog(t, T.ring, T.ring + 0.3), o = 1 - prog(t, T.gasp, T.gasp + 0.5)
    const bx = leo.x + 9.6 * leo.c, by = leo.y + 11.4 * leo.c
    const R = lerp(15, 6.2, ease.outCubic(p)) * leo.c + 5 * Math.sin(t * 9)
    x.save(); x.globalAlpha = clamp(p * 2) * o
    x.strokeStyle = GOLD; x.lineWidth = 6; x.setLineDash([14, 10]); x.lineDashOffset = -t * 60
    x.beginPath(); x.arc(bx, by, R, 0, Math.PI * 2); x.stroke(); x.setLineDash([])
    x.font = `800 64px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'
    x.fillText('?', bx + R * 0.95, by - R * 0.8)
    x.restore()
  }

  // ── innocent whistling while they both look away (♪ notes drifting off their outer shoulders)
  function whistle(t, leo, sag) {
    for (const [a, b] of [[T.away1, T.back1], [T.away2, T.back2], [T.innocent, T.glance]]) {
      if (t < a || t > b) continue
      for (const [S, dir] of [[leo, -1], [sag, 1]]) {
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

  // ── contact sparks + the trine line
  function handshakeFx(t, leo, sag) {
    if (t < T.slide[0] || t > T.move[0]) return
    const cy = (leo.y + sag.y) / 2 - 3.8 * leo.c
    TAPS.forEach((tt, i) => {
      const k = t - tt
      if (k < 0 || k > 0.4) return
      drawSpark(x, 540, cy, (i === 2 ? 230 : 110) * (0.6 + 0.6 * ease.outCubic(k / 0.4)), 1 - k / 0.4)
      if (i === 2) sparkles(t, 540, cy, tt, 12, 220, 2)
    })
    // the trine: a gold line snapping between their top tips + label
    if (t >= T.trine) {
      const p = ease.outCubic(prog(t, T.trine, T.trine + 0.22)), o = 1 - prog(t, T.move[0] - 0.15, T.move[0] + 0.05)
      const ax = leo.x, ay = leo.top - 18, bx = sag.x, by = sag.top - 18, mx = (ax + bx) / 2, my = (ay + by) / 2
      const lx0 = lerp(mx, ax, p), lx1 = lerp(mx, bx, p), ly0 = lerp(my, ay, p), ly1 = lerp(my, by, p)
      x.save(); x.globalAlpha = o
      x.globalCompositeOperation = 'lighter'
      x.strokeStyle = rgba(GOLD, 0.35); x.lineWidth = 26; x.lineCap = 'round'; x.beginPath(); x.moveTo(lx0, ly0); x.lineTo(lx1, ly1); x.stroke()
      x.globalCompositeOperation = 'source-over'
      x.strokeStyle = '#ffe9a8'; x.lineWidth = 12; x.beginPath(); x.moveTo(lx0, ly0); x.lineTo(lx1, ly1); x.stroke()
      // shimmer bead running along the line
      const sp = ((t - T.trine) * 0.9) % 1
      if (p >= 1) drawPixelStar(x, lerp(ax, bx, sp), lerp(ay, by, sp), 26, 1, '#fffbe8')
      // endpoints
      for (const [ex, ey] of [[lx0, ly0], [lx1, ly1]]) { x.fillStyle = GOLD; x.fillRect(ex - 9, ey - 9, 18, 18); x.fillStyle = '#fff6d0'; x.fillRect(ex - 4, ey - 4, 8, 8) }
      // label
      const lp = easeOutBack(prog(t, T.trine + 0.15, T.trine + 0.45), 2.4)
      if (lp > 0) {
        x.translate(mx, my - 78); x.scale(lp, lp)
        x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        const label = '△ TRINE'
        const tw = x.measureText(label).width + 56
        x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-tw / 2, -42, tw, 84)
        x.fillStyle = GOLD; x.fillRect(-tw / 2, -42, tw, 6); x.fillRect(-tw / 2, 36, tw, 6); x.fillRect(-tw / 2, -42, 6, 84); x.fillRect(tw / 2 - 6, -42, 6, 84)
        x.fillStyle = GOLD; x.fillText(label, 0, 2)
      }
      x.restore()
      if (t < T.trine + 0.6) sparkles(t, mx, my, T.trine + 0.1, 10, 200, 0)
    }
  }

  // ── phones with veiled mystery cards (Leo's human sees the ♐ card, Sag's human sees the ♌ card)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  const CARDS = [
    { glyph: '♐', name: 'SAGITTARIUS', a1: '#b46cff', a2: '#3a2a9e', a3: '#ff6fb5' },
    { glyph: '♌', name: 'LEO', a1: '#ffb347', a2: '#d2381e', a3: '#ff6f91' },
  ]
  function drawPhones(t) {
    if (t < T.phones || t > T.cut2 + 0.05) return
    PHONE.xs.forEach((px, i) => {
      const k = easeOutBack(prog(t, T.phones + i * 0.08, T.phones + i * 0.08 + 0.45), 1.7)
      if (k <= 0) return
      const card = CARDS[i], w = PHONE.w, h = PHONE.h
      const py = lerp(2300, PHONE.y, k)
      // Leo peeking at its phone: the veil thins; Sag's "Don't." snaps it back
      const peek = i === 0 ? clamp(prog(t, T.peek[0] + 0.2, T.peek[1])) * (t < DONT[0] ? 1 : 1 - prog(t, DONT[0], DONT[0] + 0.15)) : 0
      x.save(); x.translate(px, py); x.rotate((i ? 4 : -4) * Math.PI / 180)
      x.save(); x.shadowColor = rgba(card.a1, 0.6); x.shadowBlur = 50
      rr(-w / 2, -h / 2, w, h, 52); x.fillStyle = '#140d2a'; x.fill(); x.restore()
      x.lineWidth = 6; x.strokeStyle = rgba(BONE, 0.85); rr(-w / 2, -h / 2, w, h, 52); x.stroke()
      const sx = -w / 2 + 14, sy = -h / 2 + 14, sw = w - 28, sh = h - 28
      x.save(); rr(sx, sy, sw, sh, 40); x.clip()
      x.fillStyle = '#0d0820'; x.fillRect(sx, sy, sw, sh)
      // the card
      const cx0 = sx + 18, cy0 = sy + 54, cw = sw - 36, ch = sh - 84
      x.save(); rr(cx0, cy0, cw, ch, 24); x.fillStyle = '#150c2c'; x.fill()
      const gr = x.createLinearGradient(cx0, cy0, cx0 + cw, cy0 + ch); gr.addColorStop(0, card.a1); gr.addColorStop(0.5, card.a3); gr.addColorStop(1, '#7fd0f0')
      x.lineWidth = 4; x.strokeStyle = gr; x.stroke(); x.clip()
      // veiled photo: an aura with a blurred silhouette
      const ax = cx0 + 14, ay = cy0 + 66, aw = cw - 28, ah = ch * 0.5
      rr(ax, ay, aw, ah, 16); x.save(); x.clip()
      const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
      g.addColorStop(0, card.a3); g.addColorStop(0.45, card.a1); g.addColorStop(1, card.a2)
      x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
      const sil = 0.32 + 0.55 * peek
      x.fillStyle = rgba('#1a0e30', sil); x.filter = `blur(${lerp(14, 6, peek)}px)`
      x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.17, 0, Math.PI * 2); x.fill()
      x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.02, aw * 0.36, ah * 0.36, 0, 0, Math.PI * 2); x.fill()
      x.filter = 'none'
      // shimmering veil
      const vs = ((t * 0.5 + i * 0.4) % 1.4) - 0.2
      const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
      x.font = `800 ${Math.round(aw * 0.36)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(BONE, 0.85 - 0.4 * peek)
      x.fillText('?', ax + aw / 2, ay + ah * 0.46)
      x.restore()
      x.font = `700 15px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = rgba(BONE, 0.75)
      x.fillText('NO PHOTO YET', ax + 10, ay + ah - 12)
      // glowing sign coin (top right) + header
      const pulse = 0.65 + 0.35 * Math.sin(t * 5 + i)
      const gx2 = cx0 + cw - 40, gy2 = cy0 + 34
      x.save(); x.shadowColor = card.a1; x.shadowBlur = 26 + 22 * pulse
      x.beginPath(); x.arc(gx2, gy2, 24, 0, Math.PI * 2); x.fillStyle = card.a1; x.fill(); x.restore()
      x.font = `700 30px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
      x.fillText(card.glyph + '︎', gx2, gy2 + 2)
      x.font = `italic 500 34px 'EB Garamond', serif`; x.textAlign = 'left'; x.fillStyle = BONE; x.fillText('Mystery card', cx0 + 16, cy0 + 38)
      // sign + fire pill
      const ry = ay + ah + 44
      x.font = `600 25px 'EB Garamond', serif`; x.fillStyle = card.a1; x.textAlign = 'left'; x.fillText(card.name, cx0 + 16, ry)
            x.font = `700 16px ${MONO}`
      const pw = 74, pxl = cx0 + cw - pw - 14
      rr(pxl, ry - 18, pw, 32, 16); x.strokeStyle = rgba(FIRE, 0.9); x.lineWidth = 2; x.stroke()
      x.fillStyle = FIRE; x.textBaseline = 'middle'; x.fillText('FIRE', pxl + 16, ry - 1)
      // placeholder text rows
      x.fillStyle = rgba(BONE, 0.18)
      for (let r = 0; r < 4; r++) x.fillRect(cx0 + 16, ry + 34 + r * 26, cw * (r % 2 ? 0.58 : 0.78), 10)
      x.restore()
      // status bar
      x.fillStyle = '#140d2a'; rr(-50, sy + 12, 100, 26, 13); x.fill()
      x.restore()
      x.restore()
      if (peek > 0.05 && i === 0) sparkles(t, px, PHONE.y - 120, T.peek[0] + 0.5, 6, 130, 3)
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
  // the lesson's sparkle burst (pixel stars flung out from the banner)
  function lessonBurst(t) {
    const tt = t - T.banner
    if (tt < 0 || tt > 1.1) return
    const p = ease.outCubic(tt / 1.1)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 1.1)
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + 0.3, d = (300 + (i * 53) % 220) * p
      drawPixelStar(x, 540 + Math.cos(a) * d * 1.3, 709 + Math.sin(a) * d * 0.7 + 80 * p * p, 52 * (1 - 0.5 * p), i % 3, [GOLD, '#fff1c8', PINK, LAV][i % 4])
    }
    x.restore()
  }

  // a cricket: a tiny pixel bug chirping in the corner during the silence
  function cricketNote(t) {
    for (const c of T.crk) {
      const k = t - c
      if (k < 0 || k > 1.1) continue
      const a = Math.min(1, k / 0.1) * (1 - prog(k, 0.8, 1.1))
      x.save(); x.globalAlpha = a
      x.font = `700 40px ${MONO}`; x.fillStyle = rgba(BONE, 0.85); x.textAlign = 'right'
      x.fillText('*chirp*', 990, 1330 - k * 30)
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
        drawChar('pis', t, t < T.cut1 || (t >= T.move[0] && t < T.cut2) ? 0.9 : 1)
        const leo = drawChar('leo', t), sag = drawChar('sag', t)
        badgeRing(t, leo)
        whistle(t, leo, sag)
        if (leo && sag) handshakeFx(t, leo, sag)
        drawLock(t)
        x.restore()
        lessonBurst(t)
        cricketNote(t)
      }
      for (const b of BOXES) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      BAN.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 11.62 (silence → "It gets worse"), 17.3 (small talk → plot twist, flip), 27.97 (trine → phones),
// 34.75 (box shut → the lesson, deal). The default selection keeps 17.3 and 34.75. End card flips at 40.6.
const CUTS = [11.62, { t: T.cut1, kind: 'flip' }, 27.97, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the film's key by the engine; chip notes below are written in B♭)
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
const scratch = t => [['whoosh', t, 0.09, 0.16], ['whoosh', t + 0.08, 0.15, 0.18], ['tick', t, 0.1], ['tick', t + 0.085, 0.07]]
const BB = [466.16, 587.33, 698.46, 932.33, 1174.66, 1396.91, 1864.66]
const levelUp = t => [
  ...BB.map((f, i) => ['chip', +(t + i * 0.06).toFixed(3), f, i === BB.length - 1 ? 0.5 : 0.07, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.08, sustain: i === BB.length - 1 ? 0.5 : 0.3, vib: i === BB.length - 1 ? 0.01 : 0, dly: 0.15 }]),
  ...[587.33, 739.99, 880, 1174.66, 1479.98, 1760].map((f, i) => ['pop', +(t + i * 0.06).toFixed(3), f, 0.028, (i - 2.5) * 0.12]),
  ['bell', t + 0.42, 1760, 0.035, 1.6, 0], ['glitter', t + 0.05, t + 0.9],
]
export const CUES = [
  // 1 · before you meet
  ...head(T.h1, 3, T.h1Land, 0), ['pop', T.h1Land + 0.14, 1174.66, 0.045, 0],
  ['pop', T.leoIn + 0.12, 659.25, 0.035, -0.4], ['pop', T.sagIn + 0.12, 783.99, 0.035, 0.4], ['pop', T.pisIn + 0.1, 1046.5, 0.02, 0],
  ['pop', T.open1, 659.25, 0.04, 0], ['pop', T.open1 + 0.06, 880, 0.03, 0],
  ...talkCues(ALL, { cps: CPS, pitch: { [LEO]: 660, [SAG]: 880 } }),
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // 2 · say something (the score stops dead; crickets)
  ...silence(T.tape1, 0.55, T.music1),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.5), ...cricket(T.crk[2]),
  ['tick', T.crownLook, 0.02], ['bell', T.crown[1] - 0.04, 1760, 0.03, 0.8, -0.3], ['pop', T.crown[1], 1318.51, 0.025, -0.3],
  ['tick', T.away1, 0.035], ['tick', T.away1 + 0.02, 0.03], ['tick', T.away2, 0.035], ['tick', T.away2 + 0.02, 0.03],
  ['pop', T.open2, 659.25, 0.035, 0], ['pop', T.open2 + 0.06, 880, 0.025, 0],
  // 3 · it gets worse
  ...head(T.h3, 2, T.h3Land, 2),
  ['pluck', T.droop, 220, 0.075, 0.32, 0], ['pluck', T.droop + 0.3, 207.65, 0.08, 0.9, 0],
  ...[0, 0.16, 0.3, 0.5, 0.64, 0.82].map((d, i) => ['pop', +(T.sob[0] + d).toFixed(3), [659.25, 587.33, 523.25, 659.25, 587.33, 493.88][i], 0.022, 0]),
  ['pop', T.close2, 880, 0.03, 0], ['pop', T.close2 + 0.07, 587.33, 0.03, 0],
  // 4 · plot twist
  ...head(T.h4, 1, T.h4Land, 3),
  ['tick', T.lean[0] + 0.1, 0.03], ['tick', T.lean[0] + 0.3, 0.03], ['pluck', T.ring, 1318.51, 0.03, 0.4, -0.3],
  ...scratch(T.gasp), ...silence(T.gasp, 0.28, T.build), ['pop', T.gasp, 392, 0.04, 0.2],
  ['pop', T.open3, 659.25, 0.035, 0],
  ['whoosh', FIRE1 - 0.05, 0.3, 0.07], ['pop', FIRE1, 880, 0.04, -0.3], ['tick', T.leoCheck + 0.1, 0.03],
  ['pop', T.gasp2, 440, 0.04, -0.2], ['whoosh', FIRE2 - 0.05, 0.3, 0.07], ['pop', FIRE2, 1046.5, 0.04, 0.3],
  // 5 · fire meets fire (the drop)
  ...head(T.h5, 2, T.h5Land, 1),
  ['pop', T.drop, 783.99, 0.04, -0.3], ['pop', T.drop, 987.77, 0.04, 0.3], ['pop', T.drop + 0.56, 880, 0.035, -0.3], ['pop', T.drop + 0.56, 1174.66, 0.035, 0.3],
  ['pop', TAPS[0], 880, 0.05, 0], ['pop', TAPS[0] + 0.02, 1318.51, 0.03, 0], ['pop', TAPS[1], 1046.5, 0.05, 0], ['pop', TAPS[1] + 0.02, 1567.98, 0.03, 0],
  ['whoosh', T.spin[0], 0.5, 0.06],
  ['bell', TAPS[2], 1174.66, 0.045, 1.4, 0], ['boom', TAPS[2], 0.14], ['glitter', TAPS[2], TAPS[2] + 0.6],
  ['pluck', T.trine, 1174.66, 0.045, 0.8, 0], ['bell', T.trine + 0.12, 1567.98, 0.035, 1.6, 0], ['bell', T.trine + 0.24, 1760, 0.025, 1.6, 0],
  ['pop', T.open4, 659.25, 0.035, 0], ['pop', T.open4 + 0.06, 880, 0.025, 0],
  ['pop', T.close4, 880, 0.03, 0], ['pop', T.close4 + 0.07, 587.33, 0.03, 0],
  // 6 · card first, face last
  ['whoosh', T.move[0], 0.4, 0.05], ['pop', T.phones + 0.3, 659.25, 0.035, -0.3], ['pop', T.phones + 0.38, 783.99, 0.035, 0.3],
  ...head(T.h6, 3, T.h6Land, 4), ['glitter', T.phones + 0.4, T.phones + 0.9],
  ['pop', T.open5, 659.25, 0.035, 0],
  ['tick', T.peek[0] + 0.1, 0.03], ['tick', T.peek[0] + 0.5, 0.03], ['glitter', T.peek[0] + 0.5, T.peek[0] + 0.9], ['pop', T.notice, 440, 0.03, 0.3],
  ...DONT.map((d, i) => ['pop', +d.toFixed(3), [392, 440, 493.88][i], 0.045, 0.2]), ['whoosh', DONT[0], 0.18, 0.05],
  ['pop', T.close5, 880, 0.03, 0], ['pop', T.close5 + 0.07, 587.33, 0.03, 0],
  // 7 · ★ lesson unlocked
  ...levelUp(T.banner),
  ...wordPops(T.lesson, 8, 0.075, 2, 0.022), ['pop', T.lessonLand, 1174.66, 0.05, 0], ['pluck', T.lessonLand, 1174.66, 0.045, 0.8, 0], ['glitter', T.lessonLand, T.lessonLand + 0.5],
  // 8 · our lips are sealed
  ['whoosh', T.lessonOut[0], 0.3, 0.035],
  ...head(T.h7, 3, T.h7Land, 0),
  ['pop', T.lock + 0.08, 880, 0.035, 0], ['tick', T.lockShut, 0.12], ['pop', T.lockShut + 0.01, 293.66, 0.05, 0], ['glitter', T.lockShut, T.lockShut + 0.4],
  ['pluck', T.innocent + 0.1, 1567.98, 0.028, 0.35, -0.3], ['pluck', T.innocent + 0.32, 1318.51, 0.028, 0.5, 0.3],
  ...wordPops(T.h8, 4, 0.06, 3, 0.02),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
