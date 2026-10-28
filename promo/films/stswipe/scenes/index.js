// stswipe — "Swipe Fatigue." (45 s vertical Align ad, Star Talk season 3 #3, synthwave · Cm) · story 0–40.6, then the
// shared end card.
//   0.00–4.95  "Swipe. Swipe. | Swipe. *Swipe.*"  ♊ GEMINI stands behind a big phone, its left point a blur; profile
//              faces smear off the screen and a pixel SWIPES / MIN speedometer climbs into the red. The sky's eyes dart
//              with every swipe. GEMINI: "left left left right left left left" (each word swipes a face; the one
//              *right* is the set-up for the match).
//   4.95–9.35  "Repetitive | *swipe* injury."  Smoke rises off Gemini's point. ♉ TAURUS (reading glasses) pops in:
//              "babe. your point is smoking." and lobs a tiny ice pack onto it (tsss). Gemini doesn't stop: the ice pack
//              blurs along. The speedometer pegs and reads ERR.
//   9.49       "It's a *match!*"  The phone bursts into hearts: two avatars, "you both swiped right". The blur stops
//              dead. GEMINI squints: "wait. who's this."  The whole sky turns, slowly, to look at Gemini. Womp womp.
//  13.93       card cut (flip).
//  13.95–18.8  "Here lies *hey.*"  The matches list, close up: row after row of "hey", no reply, cobwebs. A spider drops
//              in and waves. ♓ PISCES in a mourning veil sobs and tosses a rose onto the glass. GEMINI (beaming):
//              "they're not dead. they're resting."  The sky rolls its eyes.
//  18.8–24.5   "Quick *question.*"  ♑ CAPRICORN: "how many have you actually talked to?"  Record stop. The needle drops
//              to 0 and the plate flips to TALKED TO. Crickets. A cobweb grows on the gauge. GEMINI: "…talked to?"
//              One synced, slow blink. Capricorn taps a point.
//  24.5–28.6   "Slow it *down.*"  Gemini panic-swipes, seeing double… THE STARS: "infinite isn't abundance. it's
//              noise."  The music drops to half-time, the swipes slow to a stop on one face, the double image snaps
//              together and Gemini's eyes come into focus (sparkle).
//  28.83       card cut (deal).
//  28.93–33.1  ★ LESSON UNLOCKED: "Fewer people. | *Deeper* | conversations."  +1 FOCUS
//  33.15–37.3  "Tonight's *deck.*"  Three cards deal in slowly, one at a time. THE STARS: "a deck a night. not an
//              endless scroll."  Gemini picks the middle one; it flips to a veiled profile card; Taurus slides its
//              reading glasses onto Gemini, who reads every line… and goes heart-eyed.
//  37.3–40.6   "Stop swiping. | Start *meeting.*"  The card glides off; Gemini floats hearts in the middle; the
//              speedometer comes back as TALKED TO and ticks 0 → 1 (ding). Pisces sobs happily.
//              Everything pops out by 40.5; the end card takes over at 40.6.
// One canvas (sky + phone + cards + stars + props), DOM type + dialogue boxes + the shared LESSON beat above it, grain.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import {
  rgba, starFrame, inSprite, cellToWorld, drawGlasses, drawGlassesAt, drawVeil, drawIcePack, drawSmoke, drawTears, drawSpider,
  drawCobweb, drawFlower, drawHearts, drawHeart, drawGauge, sparkBurst, FACES, NFACE, faceSprite,
} from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN        // 40.6
export const KEY = 'Cm'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', MINT = '#7dffb0', TEAL = '#5fe3b5'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)    // the 108 bpm grid
const r3 = v => +v.toFixed(3)
const D2R = Math.PI / 180

// ── the timeline
export const T = {
  black: [0, 0.2],
  // A · the hook
  h0: 0.05, h0Gap: 0.55, drop: BEAT(2), h0Out: [4.78, 4.98], lA: 2.1,
  // B · repetitive swipe injury
  h1: 5.05, h1Out: [9.12, 9.32], wisp: 3.9, smoke: [5.0, 7.8], tauIn: 5.15, lB: 5.6, toss: [7.3, 7.76], err: 8.3,
  // C · it's a match
  match: BEAT(16), h2: 9.52, h2Land: 9.8, lC: 10.45, side: 11.75, h2Out: [13.45, 13.65],
  cut1: BEAT(24),
  // D · here lies hey
  h3: 13.98, h3Land: 14.3, spider: [14.55, 15.35], wave: [15.45, 16.3], flower: [14.85, 15.45], lD: 15.75, roll: 0, h3Out: [18.58, 18.78],
  // E · quick question
  back: [18.8, 19.25], capIn: 18.98, h4: 19.04, h4Land: 19.36, lE1: 19.5, stop: 20.92, brk: BEAT(37),
  needle: [20.98, 21.62], flip: [21.3, 21.62], crick: [21.85, 22.3], lE2: 22.62, web: [21.95, 23.5], blinkSync: 23.62,
  taps: [23.95, 24.13, 24.31], h4Out: [24.3, 24.5],
  // F · slow it down
  panic: 24.52, h5: 24.6, h5Land: 26.16, lF: 25.0, slow0: 25.7, focus: 27.2, h5Out: [28.42, 28.62], phoneOut: [28.3, 28.62],
  half: [BEAT(46), BEAT(48), BEAT(50)],
  cut2: 28.83,
  // G · LESSON
  lesson: BEAT(51),
  // H · tonight's deck
  h6: 33.15, h6Land: 33.45, deal: [33.3, 33.95, 34.6], lH: 33.6, pick: [35.3, 35.85], sideOut: [35.3, 35.75],
  glasses: [35.55, 36.0], read: [36.02, 36.75], heart: 36.8, h6Out: [37.15, 37.35],
  // I · the last line
  move7: [37.25, 37.75], h7: 37.4, h7Land: 37.9, cardOut: [37.7, 38.2], gaugeIn3: [38.05, 38.4], one: 38.85,
  out: [40.05, 40.48], h7Out: [40.2, 40.45],
}
// the lesson (shared lesson.js): out = its end + a 2.6 s hold
export const LESSON = { at: T.lesson, text: 'Fewer people. | *Deeper* | conversations.', chip: '+1 FOCUS' }
const LS = lessonTimes(LESSON)
LESSON.out = [r3(LS.end + 2.6), r3(LS.end + 2.85)]

// ── the dialogue (one box per beat)
const GEM = '♊ GEMINI', TAU = '♉ TAURUS', CAP = '♑ CAPRICORN', STARS = 'THE STARS'
const GEMC = signStar('gemini').color, TAUC = signStar('taurus').color, CAPC = '#5fe3b5'
const BOXES = [
  { cps: 30, lines: [{ t: T.lA, speaker: GEM, color: GEMC, text: 'left left left *right* left left left' }] },
  { lines: [{ t: T.lB, speaker: TAU, color: TAUC, text: 'babe. your point is *smoking.*' }] },
  { lines: [{ t: T.lC, speaker: GEM, color: GEMC, text: "wait. who's *this.*" }] },
  { lines: [{ t: T.lD, speaker: GEM, color: GEMC, text: "they're not dead. they're *resting.*" }] },
  { lines: [{ t: T.lE1, speaker: CAP, color: CAPC, text: 'how many have you actually *talked* to?' }, { t: T.lE2, speaker: GEM, color: GEMC, text: '…talked *to?*' }] },
  { lines: [{ t: T.lF, speaker: STARS, text: "infinite isn't abundance. it's *noise.*" }] },
  { lines: [{ t: T.lH, speaker: STARS, text: 'a deck a night. not an endless *scroll.*' }] },
]
for (const B of BOXES) {
  B.cps = B.cps || 28
  B.times = lineTimes(B.lines, { cps: B.cps })
  B.close = r3(B.times[B.times.length - 1].done + 1.6)
}
BOXES[0].close = 4.85; BOXES[1].close = 8.62; BOXES[2].close = 13.0; BOXES[3].close = 18.75; BOXES[4].close = 24.42; BOXES[5].close = 28.25; BOXES[6].close = 36.9
const charAt = (b, li, word) => { const L = BOXES[b].lines[li].text.replace(/\*/g, ''); return BOXES[b].times[li].chars[Math.max(0, L.indexOf(word))] }
T.roll = charAt(3, 0, 'resting')
const HOPS_OF = sp => BOXES.flatMap(B => talkHops(B.lines, sp, { cps: B.cps }))

// ── the swipes: one card per swipe (card j shows face j), a full stroke of the arm per swipe
const SW = (() => {
  const out = [], add = (t, dir = -1) => out.push({ t: r3(t), dir })
  let t = 0.1, iv = 0.27
  while (t < T.lA - 0.04) { add(t); t += iv; iv = Math.max(0.15, iv * 0.92) }
  // one swipe per word of Gemini's line, as each word finishes typing
  const B = BOXES[0], txt = B.lines[0].text.replace(/\*/g, ''), ch = B.times[0].chars
  let ci = 0
  for (const w of txt.split(' ')) { add(ch[ci + w.length - 1] + 1 / B.cps, w === 'right' ? 1 : -1); ci += w.length + 1 }
  t = out[out.length - 1].t + 0.15
  while (t < T.match - 0.1) { add(t); t += t < T.toss[1] ? 0.145 : 0.112 }
  // the panic, then the slow-down to one face
  t = T.panic
  while (t < T.slow0) { add(t); t += 0.12 }
  for (const g of [0.15, 0.19, 0.25, 0.33, 0.45]) { add(t); t += g }
  out.forEach((s, i) => { const nx = out[i + 1]; s.gap = nx && nx.t - s.t < 0.6 ? nx.t - s.t : 0.5; s.dur = clamp(s.gap * 0.8, 0.1, 0.34) })
  return out
})()
const R_SWIPE = SW.findIndex(s => s.dir > 0)                    // the one right swipe → the match
const SEQS = [[0.1, T.match - 0.08], [T.panic, T.focus]]
const swipesBy = t => { let n = 0; while (n < SW.length && SW[n].t <= t) n++; return n }
/** the arm's stroke phase: +1 per swipe while a run is on (null at rest) */
function strokePhase(t) {
  const seq = SEQS.find(([a, b]) => t >= a - 0.05 && t < b + 0.35)
  if (!seq) return null
  const n = swipesBy(t)
  if (n === 0) return 0
  const s = SW[n - 1]
  return n - 1 + clamp((t - s.t) / Math.max(0.1, s.gap))
}
/** how much blur / smear (0…1) */
function blurK(t) {
  if (t < T.match) return clamp(prog(t, 0, 0.3) * (1 - prog(t, T.match - 0.08, T.match + 0.02)))
  if (t >= T.panic - 0.02 && t < T.focus + 0.1) return prog(t, T.panic - 0.02, T.panic + 0.12) * (1 - ease.inQuad(prog(t, T.slow0, T.focus)))
  return 0
}
/** seeing double: the ghost's offset amplitude (px) */
function ghostAmp(t) {
  if (t < T.match) return lerp(5, 14, prog(t, 0, 3)) + (t > T.toss[1] ? 4 : 0) - 18 * prog(t, T.match - 0.1, T.match)
  if (t >= T.panic && t < T.focus) return 15 * prog(t, T.panic, T.panic + 0.2) * (1 - ease.inCubic(prog(t, T.slow0 + 0.3, T.focus)))
  return 0
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }

// ── the cast
const CAST = {
  gem: { ...signStar('gemini'), seed: 5 },
  tau: { ...signStar('taurus'), seed: 13 },
  cap: { ...signStar('capricorn'), seed: 53 },
  pis: { ...signStar('pisces'), seed: 47 },
  ari: { ...signStar('aries'), seed: 11 },
  lib: { ...signStar('libra'), seed: 23 },
  aqu: { ...signStar('aquarius'), seed: 43 },
  sco: { ...signStar('scorpio'), seed: 41 },
  g0: { color: STAR.sky, glyph: null, seed: 3, gold: true },
  g1: { color: '#ffe08a', glyph: null, seed: 17, gold: true },
  g2: { color: '#f5b85a', glyph: null, seed: 31, gold: true },
}
const ORDER = ['pis', 'sco', 'aqu', 'g2', 'ari', 'lib', 'g1', 'g0', 'tau', 'cap']
const BOTTOM = { aqu: [150, 1812, 108], sco: [410, 1815, 112], g2: [680, 1815, 104], pis: [935, 1800, 124] }
const LAY = {
  A: { gem: [690, 1000, 330], g0: [112, 735, 118], ari: [104, 985, 104], lib: [990, 850, 100], g1: [990, 1222, 96], ...BOTTOM },
  D: { gem: [960, 1212, 176], pis: [132, 1205, 170], tau: [112, 980, 112], g0: [112, 735, 104], g1: [975, 742, 96], lib: [985, 975, 96], aqu: BOTTOM.aqu, sco: BOTTOM.sco, g2: BOTTOM.g2 },
  E: { gem: [690, 1000, 330], g0: [112, 735, 118], ari: [104, 985, 104], lib: [990, 850, 100], tau: [112, 1238, 160], cap: [975, 1262, 168], ...BOTTOM },
  L: { gem: [540, 1490, 230], tau: [212, 1455, 128], cap: [868, 1455, 128], ari: [118, 1745, 108], lib: [962, 1745, 108], pis: [340, 1775, 104], aqu: [740, 1775, 104], g0: [540, 1800, 92] },
  H: { gem: [905, 1110, 236], tau: [150, 1290, 150], g0: [118, 650, 100], g1: [972, 700, 96], ari: [150, 1812, 108], cap: [410, 1815, 112], aqu: [680, 1815, 104], pis: [935, 1800, 124] },
  I: { gem: [540, 1085, 330], tau: [168, 1300, 150], pis: [912, 1300, 150], g0: [118, 740, 100], g1: [972, 760, 96], ari: [150, 1812, 108], cap: [410, 1815, 112], aqu: [680, 1815, 104], lib: [935, 1800, 110] },
}
LAY.B = { ...LAY.A, tau: [112, 1238, 160] }
const SEG = [
  { t: 0, L: LAY.A },
  { t: T.tauIn, L: LAY.B, anim: 0.34 },
  { t: T.cut1, L: LAY.D },
  { t: T.back[0], L: LAY.E, anim: 0.42 },
  { t: T.cut2, L: LAY.L },
  { t: T.h6 - 0.1, L: LAY.H, anim: 0.45 },
  { t: T.move7[0], L: LAY.I, anim: 0.5 },
]
/** where actor k is at t → { p: [x, y, s], pk } or null */
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.025
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + (k === 'gem' ? 0 : stag), p = prog(t, t0, t0 + S.anim)
    if (cur && prev) {
      const e = ease.inOutCubic(p), same = cur[0] === prev[0] && cur[1] === prev[1]
      return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - (same ? 0 : Math.sin(Math.PI * p) * 70), lerp(prev[2], cur[2], e)], pk: 1 }
    }
    if (cur) return { p: cur, pk: pop01(t, t0, 0.34, 2.2) }
    if (prev) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!cur) return null
  let pk = 1
  if (i === 0) pk = k === 'gem' ? 1 : pop01(t, 0.2 + stag * 2, 0.4, 1.6)
  else if (t < S.t + 0.7) pk = pop01(t, S.t + 0.06 + stag, 0.32, 2.2)
  return { p: cur, pk }
}

// ── the phone (local units 420 × 800, centred)
const PH = { A: { x: 392, y: 1010, s: 0.86, r: -2 }, C: { x: 398, y: 990, s: 0.94, r: 0 }, D: { x: 540, y: 952, s: 1.1, r: 0 } }
const mixP = (a, b, e) => ({ x: lerp(a.x, b.x, e), y: lerp(a.y, b.y, e), s: lerp(a.s, b.s, e), r: lerp(a.r, b.r, e) })
function phonePos(t) {
  if (t < T.match - 0.05) return PH.A
  if (t < T.cut1) return mixP(PH.A, PH.C, ease.inOutCubic(prog(t, T.match - 0.05, T.match + 0.3)))
  if (t < T.back[0]) return PH.D
  if (t < T.phoneOut[1]) { const p = prog(t, ...T.back), P = mixP(PH.D, PH.A, ease.inOutCubic(p)); P.y -= Math.sin(Math.PI * p) * 40; return P }
  return null
}
const GA = { x: 822, y: 604 }                       // the speedometer
const DECK = { y: 1010, xs: [250, 470, 690], w: 190 }

async function build(stage) {
  try {
    await Promise.all(["800 124px Inter", "800 42px Inter", "700 46px Inter", "600 26px Inter", "italic 500 172px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 22px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-3.png')])
  const BACK = bake(backIm, 520), FACE = bake(faceIm, 640)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496
  const SPR = Array.from({ length: NFACE }, (_, i) => faceSprite(document, i))

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HEADS = [
    [popText(root, 'Swipe. Swipe. | Swipe. *Swipe.*', { top: 182, size: 118, accentSize: 162, at: T.h0, gap: T.h0Gap, late: 1, lateAt: T.drop, wobble: true, accentColor: PINK, lineHeight: 1.04 }), T.h0Out],
    [popText(root, 'Repetitive | *swipe* injury.', { top: 182, size: 112, accentSize: 156, at: T.h1, gap: 0.13, accentColor: CYAN, lineHeight: 1.04 }), T.h1Out],
    [popText(root, "It's a *match!*", { top: 212, size: 116, accentSize: 150, fit: true, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: PINK }), T.h2Out],
    [popText(root, 'Here lies *hey.*', { top: 210, size: 124, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: LAV }), T.h3Out],
    [popText(root, 'Quick *question.*', { top: 212, size: 112, accentSize: 148, fit: true, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: TEAL }), T.h4Out],
    [popText(root, 'Slow it *down.*', { top: 210, size: 124, accentSize: 176, at: T.h5, gap: 0.32, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CYAN }), T.h5Out],
    [popText(root, "Tonight's *deck.*", { top: 210, size: 120, accentSize: 168, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV }), T.h6Out],
    [popText(root, 'Stop swiping. | Start *meeting.*', { top: 182, size: 112, accentSize: 158, at: T.h7, gap: 0.08, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD, lineHeight: 1.06 }), T.h7Out],
  ]
  const boxes = BOXES.map(B => dialogueBox(root, { lines: B.lines, y: 1400, width: 960, height: 300, close: B.close, cps: B.cps }))
  const lesson = buildLesson(root, { ...LESSON, accentColor: CYAN, dim: 0.55 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ─────────────────────────────── a profile card (phone-local units), with an optional ✕ / ♥ stamp
  function drawProfile(j, cx, cy, w, h, rot, sc, alpha, sd = 0, sk = 0, gray = 0) {
    if (alpha <= 0.01) return
    const f = FACES[j % NFACE], spr = SPR[j % NFACE]
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sc, sc)
    rr(-w / 2, -h / 2, w, h, 28); x.save(); x.clip()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, f.bg[0]); g.addColorStop(1, f.bg[1]); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    const cell = 17, pw = 20 * cell, phh = 22 * cell
    const sm = x.imageSmoothingEnabled; x.imageSmoothingEnabled = false
    x.drawImage(spr, -pw / 2, h / 2 - phh, pw, phh)
    x.imageSmoothingEnabled = sm
    const ig = x.createLinearGradient(0, h / 2 - 140, 0, h / 2); ig.addColorStop(0, 'rgba(10,6,28,0)'); ig.addColorStop(1, 'rgba(10,6,28,0.88)'); x.fillStyle = ig; x.fillRect(-w / 2, h / 2 - 140, w, 140)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE
    x.font = `800 46px ${INTER}`; x.fillText(String(f.age), -w / 2 + 28, h / 2 - 32)
    x.font = `700 44px ${GLYPH_FONT}`; x.fillText(f.glyph + '︎', -w / 2 + 92, h / 2 - 32)
    if (gray > 0) { x.fillStyle = `rgba(40,34,60,${0.55 * gray})`; x.fillRect(-w / 2, -h / 2, w, h) }
    x.restore()
    x.lineWidth = 4; x.strokeStyle = 'rgba(255,255,255,0.32)'; rr(-w / 2, -h / 2, w, h, 28); x.stroke()
    if (sk > 0 && sd) {
      x.save(); x.globalAlpha *= clamp(sk); x.translate(sd < 0 ? w * 0.18 : -w * 0.18, -h * 0.28); x.rotate(sd < 0 ? 0.3 : -0.3)
      const col = sd < 0 ? '#ff5a6e' : '#ff6fae'
      x.lineWidth = 9; x.strokeStyle = col; rr(-62, -56, 124, 112, 18); x.stroke()
      x.fillStyle = col; x.textAlign = 'center'; x.font = `800 84px ${INTER}`; x.fillText(sd < 0 ? '✕' : '♥', 0, 30)
      x.restore()
    }
    x.restore()
  }

  // ─────────────────────────────── the phone
  function drawPhone(t) {
    const P = phonePos(t)
    if (!P) return
    let k = easeOutBack(prog(t, -0.05, 0.3), 1.6)
    if (t >= T.phoneOut[0]) k *= 1 - ease.inCubic(prog(t, ...T.phoneOut))
    if (k <= 0.01) return
    const mb = pulse(t, T.match, 0.35), pn = pulse(t, T.panic, 0.25)
    x.save()
    x.translate(P.x, P.y); x.rotate(P.r * D2R); x.scale(P.s * k * (1 + 0.05 * mb + 0.03 * pn), P.s * k * (1 + 0.05 * mb - 0.02 * pn))
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    const glowC = t >= T.match && t < T.cut1 ? PINK : t >= T.cut1 && t < T.panic ? '#8f88a3' : LAV
    x.save(); x.shadowColor = rgba(glowC, 0.6); x.shadowBlur = 70
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#24164f'); g.addColorStop(0.6, '#3b2370'); g.addColorStop(1, '#5b2a74')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    if (t < T.match || t >= T.panic) drawFeed(t, sx, sy, sw, sh)
    else if (t < T.cut1) drawMatch(t, sx, sy, sw, sh)
    else drawList(t, sx, sy, sw, sh)
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()      // notch
    x.globalAlpha = 0.07; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    x.restore()
  }
  function drawFeed(t, sx, sy, sw, sh) {
    x.fillStyle = 'rgba(10,6,28,0.45)'; x.fillRect(sx, sy, sw, 92)
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.font = `700 24px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.fillText('✦ DISCOVER ✦', 0, sy + 70)
    const cw = 332, ch = 476, cy = sy + 118 + ch / 2
    const n = swipesBy(t)
    const prev = n > 0 ? SW[n - 1] : null
    const up = prev ? clamp((t - prev.t) / prev.dur) : 1
    drawProfile(n, 0, cy, cw, ch, 0, lerp(0.92, 1, ease.outCubic(up)), 1)
    for (let j = Math.max(0, n - 4); j < n; j++) {
      const s = SW[j], p = (t - s.t) / s.dur
      if (p < 0 || p >= 1.4) continue
      for (const [lag, a] of [[0.42, 0.12], [0.28, 0.22], [0.14, 0.4], [0, 1]]) {
        const q = p - lag
        if (q < 0 || q >= 1) continue
        const e = ease.inQuad(q)
        drawProfile(j, s.dir * e * 600, cy + e * 50, cw, ch, s.dir * 0.45 * e, 1, a * (1 - q * 0.25), s.dir, clamp(q * 4))
      }
    }
    // buttons: ✕ and ♥ (each flashes when used)
    const by = sy + sh - 92
    let fl = 0, fr = 0
    if (prev && t - prev.t < 0.14) { if (prev.dir < 0) fl = 1; else fr = 1 }
    for (const [bx, sym, col, f] of [[-84, '✕', '#ff5a6e', fl], [84, '♥', '#ff6fae', fr]]) {
      x.save(); x.translate(bx, by); x.scale(1 + 0.18 * f, 1 + 0.18 * f)
      x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fillStyle = f ? col : 'rgba(15,8,34,0.75)'; x.fill()
      x.lineWidth = 4; x.strokeStyle = col; x.stroke()
      x.fillStyle = f ? '#ffffff' : col; x.textAlign = 'center'; x.font = `800 44px ${INTER}`; x.fillText(sym, 0, 16)
      x.restore()
    }
  }
  function drawMatch(t, sx, sy, sw, sh) {
    const p = prog(t, T.match - 0.02, T.match + 0.08)
    const g = x.createRadialGradient(0, sy + 360, 20, 0, sy + 360, 520)
    g.addColorStop(0, rgba('#ff7fb8', 0.95 * p)); g.addColorStop(0.55, rgba('#a04fd0', 0.9 * p)); g.addColorStop(1, rgba('#3a1a6a', 0.9 * p))
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    // rays
    x.save(); x.globalAlpha = 0.18 * p; x.fillStyle = '#ffffff'
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * 0.4; x.beginPath(); x.moveTo(0, sy + 330); x.arc(0, sy + 330, 600, a, a + 0.12); x.closePath(); x.fill() }
    x.restore()
    // two avatars + a beating heart
    const ap = easeOutBack(prog(t, T.match + 0.05, T.match + 0.45), 2.2)
    const ay = sy + 330, R = 82
    if (ap > 0) {
      x.save(); x.translate(-74 * ap - (1 - ap) * 200, ay)
      x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.fillStyle = GEMC; x.fill(); x.lineWidth = 8; x.strokeStyle = '#fff1c8'; x.stroke()
      x.fillStyle = '#2a1a4a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 92px ${GLYPH_FONT}`; x.fillText('♊︎', 0, 6)
      x.restore()
      x.save(); x.translate(74 * ap + (1 - ap) * 200, ay)
      x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.save(); x.clip()
      const f = FACES[R_SWIPE % NFACE]; const gg = x.createLinearGradient(0, -R, 0, R); gg.addColorStop(0, f.bg[0]); gg.addColorStop(1, f.bg[1]); x.fillStyle = gg; x.fillRect(-R, -R, 2 * R, 2 * R)
      const sm = x.imageSmoothingEnabled; x.imageSmoothingEnabled = false; x.drawImage(SPR[R_SWIPE % NFACE], -80, -70, 160, 176); x.imageSmoothingEnabled = sm
      x.restore(); x.lineWidth = 8; x.strokeStyle = '#ff8fb1'; x.beginPath(); x.arc(0, 0, R, 0, Math.PI * 2); x.stroke()
      x.restore()
    }
    const hb = 1 + 0.12 * Math.max(0, Math.sin(t * 9))
    if (ap > 0.5) drawHeart(x, 0, ay - 128, 9 * hb, '#ff3d6e')
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.globalAlpha = clamp(prog(t, T.match + 0.25, T.match + 0.5))
    x.font = `800 58px ${INTER}`; x.fillStyle = '#fff6e6'; x.fillText('MATCH!', 0, sy + 520)
    x.font = `600 26px ${INTER}`; x.fillStyle = rgba(BONE, 0.85); x.fillText('you both swiped right', 0, sy + 566)
    rr(-118, sy + 612, 236, 70, 35); x.fillStyle = 'rgba(255,255,255,0.16)'; x.fill(); x.lineWidth = 3; x.strokeStyle = 'rgba(255,255,255,0.7)'; x.stroke()
    x.font = `700 26px ${MONO}`; x.fillStyle = '#ffffff'; x.fillText('SAY HI', 0, sy + 656)
    x.globalAlpha = 1
    // confetti
    const cr = rng(9)
    for (let i = 0; i < 40; i++) {
      const t0 = T.match + cr() * 0.4, life = 1.6 + cr() * 1.2, q = (t - t0) / life
      const cx0 = (cr() - 0.5) * sw, vy = 260 + cr() * 260, col = [PINK, GOLD, LAV, CYAN, '#ffffff'][i % 5], s = 8 + Math.round(cr() * 6)
      if (q < 0 || q > 1) continue
      x.fillStyle = col; x.globalAlpha = 1 - q * 0.6
      x.fillRect(Math.round(cx0 + Math.sin(q * 9 + i) * 24), Math.round(sy + 40 + vy * q * life * 0.9), s, Math.round(s * (0.5 + 0.5 * Math.abs(Math.sin(q * 12 + i)))))
    }
    x.globalAlpha = 1
  }
  // the matches list: row after row of "hey", no reply, cobwebs; it scrolls forever
  const AGO = ['2 mo', '5 mo', '1 yr', '3 wk', '8 mo', '4 mo', '1 yr', '6 mo']
  function listScroll(t) {
    if (t < T.cut1 + 0.2) return 0
    const t1 = Math.min(t, T.stop)
    let s = (t1 - (T.cut1 + 0.2)) * 70
    if (t > T.stop) s += 18 * ease.outCubic(prog(t, T.stop, T.stop + 0.3))
    return s
  }
  function drawList(t, sx, sy, sw, sh) {
    x.fillStyle = 'rgba(10,6,28,0.55)'; x.fillRect(sx, sy, sw, 104)
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.fillText('MATCHES', sx + 34, sy + 78)
    x.font = `800 46px ${INTER}`; x.fillStyle = GOLD; x.fillText('∞', sx + 222, sy + 80)
    x.save(); x.beginPath(); x.rect(sx, sy + 104, sw, sh - 104); x.clip()
    const RH = 128, off = listScroll(t), first = Math.floor(off / RH)
    for (let r = first; r < first + 7; r++) {
      const yy = sy + 112 + r * RH - off
      const j = (r * 5 + 3) % NFACE
      x.fillStyle = r % 2 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'; x.fillRect(sx, yy, sw, RH - 6)
      // avatar (faded)
      const ax = sx + 74, ay = yy + RH / 2 - 3
      x.save(); x.beginPath(); x.arc(ax, ay, 44, 0, Math.PI * 2); x.clip()
      x.fillStyle = '#4a4262'; x.fillRect(ax - 44, ay - 44, 88, 88)
      x.globalAlpha = 0.45; const sm = x.imageSmoothingEnabled; x.imageSmoothingEnabled = false; x.drawImage(SPR[j], ax - 44, ay - 40, 88, 97); x.imageSmoothingEnabled = sm
      x.restore()
      x.fillStyle = rgba(BONE, 0.88); x.font = `700 46px ${INTER}`; x.fillText('hey', sx + 140, yy + 60)
      x.fillStyle = rgba(BONE, 0.42); x.font = `700 20px ${MONO}`; x.fillText(`NO REPLY · ${AGO[((r % 8) + 8) % 8]}`, sx + 142, yy + 96)
      // cobwebs on most rows, alternating corners
      if (((r % 3) + 3) % 3 !== 1) drawCobweb(x, r % 2 ? sx + sw - 6 : sx + 4, yy + 2, 64 + (r % 4) * 8, { sx: r % 2 ? -1 : 1, alpha: 0.6, px: 3 })
      // dust
      x.fillStyle = 'rgba(239,230,214,0.25)'
      for (let d = 0; d < 6; d++) x.fillRect(Math.round(sx + 150 + ((r * 37 + d * 53) % 190)), Math.round(yy + 18 + ((r * 13 + d * 29) % 90)), 3, 3)
    }
    x.restore()
  }

  // ─────────────────────────────── Gemini: the body (behind the phone) and its blurred swiping point (in front)
  const ARM = (() => {
    const a = 198 * D2R, d = [Math.cos(a), Math.sin(a)]
    const v9 = [18 + 8 * Math.cos(234 * D2R), 19.6 + 8 * Math.sin(234 * D2R)], v7 = [18 + 8 * Math.cos(162 * D2R), 19.6 + 8 * Math.sin(162 * D2R)]
    const at = (v, e) => [v[0] + d[0] * e, v[1] + d[1] * e], E0 = 3.2
    return { a, poly: [at(v9, E0), at(v9, 30), at(v7, 30), at(v7, E0)], piv: [(v9[0] + v7[0]) / 2 + d[0] * E0, (v9[1] + v7[1]) / 2 + d[1] * E0], tip: [18 + 16.6 * Math.cos(a), 19.6 + 16.6 * Math.sin(a)], pack: [18 + 13.6 * Math.cos(a), 19.6 + 13.6 * Math.sin(a)] }
  })()
  function armMap(F, th, ext) {
    const pv = cellToWorld(F, ...ARM.piv), ca = Math.cos(ARM.a), sa = Math.sin(ARM.a), ct = Math.cos(th), st = Math.sin(th)
    return c => {
      const wq = cellToWorld(F, ...c); let vx = wq[0] - pv[0], vy = wq[1] - pv[1]
      const u = (vx * ca + vy * sa) * ext, v = -vx * sa + vy * ca
      vx = u * ca - v * sa; vy = u * sa + v * ca
      return [pv[0] + vx * ct - vy * st, pv[1] + vx * st + vy * ct]
    }
  }
  const ARM_BASE = -10 * D2R, ARM_AMP = 24 * D2R
  const armTheta = (ph, k) => ARM_BASE * k + ARM_AMP * k * Math.sin(Math.PI * 2 * ph)
  let GEMF = null
  function gemOpts(t, st, pk) { const C = CAST.gem; return { color: C.color, glyph: C.glyph, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS.gem, seed: C.seed, pop: pk, glow: 0.95 } }
  function wedgePath(F, map) { const wp = ARM.poly.map(c => map ? map(c) : cellToWorld(F, ...c)); x.moveTo(...wp[0]); for (let i = 1; i < 4; i++) x.lineTo(...wp[i]); x.closePath() }
  function drawGemBody(t) {
    GEMF = null
    const pl = place('gem', t)
    if (!pl) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const p = pl.p, st = stateOf('gem', t, p), o = gemOpts(t, st, pl.pk * ok)
    const X = p[0] + st.dx, Y = p[1] + st.dy, S = p[2]
    const F = starFrame(X, Y, S, t, o)
    const bk = blurK(t), ga = ghostAmp(t)
    GEMF = { F, X, Y, S, o, bk, st }
    const clipBody = () => { x.beginPath(); x.rect(-60, -60, W + 120, H + 120); wedgePath(F); x.clip('evenodd') }
    if (ga > 0.5) {
      x.save(); if (bk > 0) clipBody()
      drawStarChar(x, X + ga * Math.sin(t * 37), Y + ga * 0.3 * Math.cos(t * 29), S, t, { ...o, glow: 0, tips: false, alpha: 0.36 })
      x.restore()
    }
    if (bk <= 0) { drawStarChar(x, X, Y, S, t, o); drawGemProps(t, F, S); return }
    x.save(); clipBody(); drawStarChar(x, X, Y, S, t, o); x.restore()
    drawGemProps(t, F, S)
  }
  function drawGemProps(t, F, S) {
    if (t >= T.glasses[1] - 0.02) drawGlasses(x, F)
    if (t >= T.heart && t < T.out[1]) drawHearts(x, t, T.heart + 0.1, F.ox, F.oy - F.S * 0.62, { n: 14, px: Math.max(5, Math.round(S / 46)), spread: S * 0.9, life: 1.7, every: 0.24 })
  }
  function drawGemArm(t) {
    if (!GEMF || GEMF.bk <= 0) { if (GEMF && t >= T.toss[1] && t < T.cut1) drawIce(t, GEMF.F, armMap(GEMF.F, 0, 1), 0); return }
    const { F, X, Y, S, o, bk } = GEMF
    const ph = strokePhase(t) ?? 0, ext = 1 + 0.75 * bk
    // the smear fan + speed lines
    const pv = cellToWorld(F, ...ARM.piv), Lr = 8.6 * F.cell * ext
    x.save(); x.globalAlpha = 0.16 * bk; x.fillStyle = CAST.gem.color
    x.beginPath(); x.moveTo(pv[0], pv[1]); x.arc(pv[0], pv[1], Lr, ARM.a + ARM_BASE * bk - ARM_AMP * bk, ARM.a + ARM_BASE * bk + ARM_AMP * bk); x.closePath(); x.fill()
    x.globalAlpha = 0.6 * bk; x.fillStyle = '#ffffff'
    for (const [dr, span] of [[18, 0.8], [36, 0.65], [54, 0.45]]) {
      const a0 = ARM.a + ARM_BASE * bk - ARM_AMP * bk * span, a1 = ARM.a + ARM_BASE * bk + ARM_AMP * bk * span, n = 14
      for (let i = 0; i <= n; i++) { const a = lerp(a0, a1, i / n); x.fillRect(Math.round(pv[0] + Math.cos(a) * (Lr + dr) - 3), Math.round(pv[1] + Math.sin(a) * (Lr + dr) - 3), 6, 6) }
    }
    x.restore()
    // ghost strokes trailing the live one, then the live one on top
    for (const [lag, a] of [[0.24, 0.16], [0.16, 0.26], [0.08, 0.42], [0, 1]]) {
      const th = armTheta(ph - lag, bk), al = lag ? a * bk : 1
      x.save(); x.globalAlpha = al
      x.translate(pv[0], pv[1]); x.rotate(th); x.rotate(ARM.a); x.scale(ext, 1); x.rotate(-ARM.a); x.translate(-pv[0], -pv[1])
      x.beginPath(); wedgePath(F); x.clip()
      drawStarChar(x, X, Y, S, t, { ...o, glow: 0, tips: false })
      x.restore()
      if (!lag && t >= T.toss[1] && t < T.cut1) drawIce(t, F, armMap(F, th, ext), th)
    }
  }
  function drawIce(t, F, map, th) {
    const [ix, iy] = map(ARM.pack)
    drawIcePack(x, ix, iy, Math.max(4, F.cell * 0.95), th + ARM.a + Math.PI / 2 + 0.2)
  }
  /** the arm tip at rest-mean (for smoke and the ice-pack throw) */
  function armTipMean(t) { if (!GEMF) return [560, 960]; const bk = GEMF.bk; return armMap(GEMF.F, ARM_BASE * bk, 1 + 0.75 * bk)(ARM.tip) }

  // ─────────────────────────────── the cast: moods, reactions, props
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  function hopsFor(k) {
    const C = CAST[k], st = (C.seed % 5) * 0.03
    const h = [T.drop + 0.02 + st * 0.3, T.match + 0.03 + st * 0.4, T.stop + 0.04 + st * 0.3, T.focus + 0.05 + st, T.lesson + 0.08 + st, LS.end + st, T.heart + 0.1 + st, T.one + 0.05 + st]
    if (C.gold) h.push(...HOPS_OF(STARS))
    if (k === 'gem') h.push(...HOPS_OF(GEM))
    if (k === 'tau') h.push(...HOPS_OF(TAU), T.toss[0])
    if (k === 'cap') h.push(...HOPS_OF(CAP))
    return h
  }
  const HOPS = Object.fromEntries(Object.keys(CAST).map(k => [k, hopsFor(k)]))
  const B4 = BOXES[4].times, B2 = BOXES[2].times, B3 = BOXES[3].times
  function stateOf(k, t, p) {
    const C = CAST[k]
    let mood = 'neutral', look = [0, 0], blink, squash = 0, dx = 0, dy = 0, tears = 0, veil = 0
    const ph = phonePos(t) || { x: 540, y: 1000 }
    const gp = (place('gem', t) || { p: [690, 1000, 330] }).p
    if (t < T.match) {                                                   // A + B: the frenzy
      const n = swipesBy(t), s = n ? SW[n - 1] : null
      const dart = s && t - s.t < Math.min(0.13, s.gap * 0.7) ? s.dir : 0
      if (k === 'gem') {
        mood = 'wide'; look = [dart || -1, 1]; blink = false
        if (t >= T.toss[1] && t < T.toss[1] + 0.5) { mood = 'happy' }
      } else if (k === 'tau') {
        const tip = armTipMean(t); look = toward(p, tip[0], tip[1])
        mood = t < T.lB ? 'wide' : 'neutral'
        if (t >= BOXES[1].times[0].done - 0.3 && t < T.toss[0]) mood = 'squint'
        if (t >= T.toss[0]) mood = 'happy'
        if (t >= T.err) { mood = 'wide'; look = toward(p, GA.x, GA.y) }
      } else {
        mood = (C.seed % 3) ? 'wide' : 'neutral'; look = [dart, 0]
        if (t >= T.wisp + 1.3 && t < T.toss[0]) { const tip = armTipMean(t); look = toward(p, tip[0], tip[1] - 120); mood = 'wide' }
        if (t >= T.err && t < T.err + 1.0) { mood = 'wide'; look = toward(p, GA.x, GA.y); blink = false }
      }
    } else if (t < T.cut1) {                                              // C: it's a match
      const kk = t - T.match
      mood = 'wide'; look = toward(p, ph.x, ph.y)
      squash = -0.16 * Math.exp(-kk * 6) * Math.cos(kk * 20)
      if (k === 'pis') tears = 0.9
      if (k === 'gem') {
        look = [-1, 1]; blink = kk < 0.8 ? false : undefined
        if (t >= T.lC) { mood = 'squint'; look = [-1, 0] }
        if (t >= B2[0].done + 0.3) { mood = 'neutral'; look = [0, 0] }
      } else if (t >= T.side) {
        const e = prog(t, T.side + (C.seed % 5) * 0.02, T.side + 0.45)
        look = e > 0.5 ? toward(p, gp[0], gp[1]) : look
        mood = e > 0.5 ? 'squint' : 'neutral'; blink = false
        if (k === 'pis') { mood = 'squint'; tears = 0.5 }
      }
    } else if (t < T.back[0]) {                                            // D: here lies hey
      look = toward(p, ph.x, ph.y); mood = 'squint'
      if (k === 'pis') { veil = 1; mood = 'squint'; tears = 1; look = [1, 0]; squash = 0.05 * Math.abs(Math.sin(t * 9)) }
      if (k === 'gem') {
        mood = 'neutral'; look = [-1, 0]
        if (t >= T.lD) { mood = 'happy'; look = [0, 0] }
      } else if (k !== 'pis' && t >= T.roll && t < T.roll + 1.2) { mood = 'eyeroll'; blink = false }
      if (k === 'tau' && t >= T.spider[1] && t < T.lD) { mood = 'wide'; look = [1, -1] }
    } else if (t < T.panic) {                                             // E: quick question
      const tq = t >= T.stop
      mood = 'neutral'; look = toward(p, ph.x, ph.y)
      if (k === 'gem') {
        mood = 'neutral'; look = [-1, 1]
        if (tq) { mood = 'wide'; blink = false; look = [1, 1]; const kk = t - T.stop; squash = 0.2 * Math.exp(-kk * 7) * Math.cos(kk * 26) }
        if (t >= T.lE2) look = [0, 0]
        if (t >= B4[1].done + 0.2) { mood = 'wide'; look = [0, 0] }
      } else if (k === 'cap') {
        mood = 'squint'; look = toward(p, gp[0], gp[1])
        for (const tp of T.taps) { const u = t - tp; if (u >= 0 && u < 0.14) squash += 0.12 * Math.sin(Math.PI * u / 0.14) }
      } else {
        if (t >= T.lE1) look = toward(p, (place('cap', t) || { p: [975, 1262] }).p[0], 1262)
        if (tq) { mood = 'wide'; look = toward(p, gp[0], gp[1]); blink = false }
        if (t >= T.lE2) { mood = 'neutral'; look = toward(p, gp[0], gp[1]) }
        if (k === 'pis') tears = tq ? 0.7 : 0.3
      }
      const bs = t - T.blinkSync
      if (bs >= 0 && bs < 0.34) blink = 1
      else if (t >= T.lE2 && bs < 0 && k !== 'cap') blink = false
    } else if (t < T.cut2) {                                               // F: slow it down
      look = toward(p, ph.x, ph.y)
      mood = t < T.focus ? 'wide' : 'happy'
      if (k === 'gem') {
        mood = 'wide'; look = [-1, 1]; blink = false
        const n = swipesBy(t), s = n ? SW[n - 1] : null
        if (s && t - s.t < Math.min(0.12, s.gap * 0.6)) look = [s.dir, 1]
        if (t >= T.focus) { mood = 'sparkle'; look = t < T.focus + 0.6 ? [-1, 0] : [0, 0]; blink = undefined }
      }
      if (C.gold && t >= T.lF && t < T.focus) mood = 'neutral'
      if (k === 'pis') tears = t >= T.focus ? 0.8 : 0.4
      if (k === 'cap' && t >= T.focus) mood = 'happy'
    } else if (t < T.h6 - 0.1) {                                            // G: the lesson
      mood = 'sparkle'; look = toward(p, 540, 650)
      if (t > LS.end) mood = 'happy'
      if (k === 'pis') tears = 0.9
    } else if (t < T.move7[0]) {                                             // H: tonight's deck
      const cardX = t < T.pick[0] ? 470 : 470, cardY = 950
      look = toward(p, cardX, cardY); mood = 'neutral'
      if (t >= T.pick[1] - 0.1) mood = 'wide'
      if (t >= T.heart + 0.12 + (p[0] / W) * 0.12) mood = 'heart'
      if (k === 'gem') {
        look = [-1, 0]; mood = 'neutral'
        for (const d of T.deal) if (t >= d + 0.4 && t < d + 0.75) mood = 'wide'
        if (t >= T.pick[0]) mood = 'wide'
        if (t >= T.read[0] && t < T.heart) {      // reading every line: left → right, top → bottom
          const u = (t - T.read[0]) / (T.read[1] - T.read[0]), row = Math.min(2, Math.floor(u * 3)), fx = (u * 3 - row)
          look = [fx < 0.5 ? -1 : 0, row - 1]; mood = 'neutral'; blink = false
        }
        if (t >= T.heart) mood = 'heart'
      }
      if (k === 'tau') {
        look = toward(p, gp[0], gp[1])
        if (t >= T.glasses[0]) mood = t < T.glasses[1] + 0.4 ? 'happy' : 'squint'
      }
      if (k === 'pis') tears = t >= T.heart ? 1 : 0.3
    } else {                                                                 // I: stop swiping, start meeting
      mood = 'happy'; look = toward(p, gp[0], gp[1])
      if (k === 'gem') { mood = 'heart'; look = [0, 0] }
      if (k === 'pis') { tears = 1; mood = 'happy' }
      if (k === 'tau') mood = 'squint'
      if (k === 'cap') { const u = t - T.one; if (u >= 0 && u < 0.6) squash = 0.1 * Math.sin(u * 20) * Math.exp(-u * 4) }
      if (t >= T.gaugeIn3[0] && t < T.one + 0.6 && k !== 'gem') look = toward(p, GA.x, GA.y)
    }
    return { mood, look, blink, squash, dx, dy, tears, veil }
  }

  // Taurus's reading glasses: on Taurus until they fly to Gemini
  function drawActor(k, t, ok) {
    const pl = place(k, t)
    if (!pl) return
    const p = pl.p, pk = pl.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return
    const C = CAST[k], st = stateOf(k, t, p)
    const o = { color: C.color, glyph: p[2] >= 110 ? C.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: HOPS[k], seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, bob: p[2] * 0.04 }
    const X = p[0] + st.dx, Y = p[1] + st.dy
    drawStarChar(x, X, Y, p[2], t, o)
    const F = starFrame(X, Y, p[2], t, o)
    if (k === 'tau' && t < T.glasses[0]) drawGlasses(x, F)
    if (st.veil > 0) drawVeil(x, F, st.veil)
    if (st.tears > 0) {
      const [ex, ey] = cellToWorld(F, 18, 20.6), exo = F.S * 0.17
      drawTears(x, [[ex - exo, ey], [ex + exo, ey]], t, 0, { cell: Math.max(4, F.S / 22), strength: st.tears })
    }
    if (k === 'tau' && t >= T.glasses[0] && t < T.glasses[1]) {             // the glasses fly over to Gemini
      const gp = place('gem', t)
      if (gp) {
        const u = ease.inOutCubic(prog(t, ...T.glasses)), [ax, ay] = cellToWorld(F, 18, 16.5)
        const GF = starFrame(gp.p[0], gp.p[1], gp.p[2], t, { pop: gp.pk, hops: HOPS.gem, seed: CAST.gem.seed })
        const [bx, by] = cellToWorld(GF, 18, 16.5)
        drawGlassesAt(x, lerp(ax, bx, u), lerp(ay, by, u) - Math.sin(Math.PI * u) * 160, lerp(F.cell, GF.cell, u), Math.sin(Math.PI * u) * 0.6)
      }
    }
  }
  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) drawActor(k, t, ok)
  }

  // ─────────────────────────────── the gauge
  function gaugeState(t) {
    let k = 0, v = 0, read = '0', label = 'SWIPES / MIN', hot = 0, web = 0, flip = 0, heart = 0, readCol = null
    const jit = 0.012 * Math.sin(t * 43) + 0.008 * Math.sin(t * 71)
    if (t < T.cut1) {
      k = easeOutBack(prog(t, 0.12, 0.45), 1.8) * popOut(t, [T.match, T.match + 0.26])
      v = 0.05 + 0.93 * ease.inOutQuad(prog(t, 0.3, 4.6)) + jit
      if (t >= T.toss[1]) v = 1.0 + 0.03 * Math.sin(t * 50)
      hot = clamp((v - 0.72) / 0.2)
      read = v >= 0.96 ? '999+' : String(Math.max(0, Math.round(v / 0.96 * 999)))
      if (t >= T.err) { read = Math.floor((t - T.err) * 5) % 2 ? '' : 'ERR'; v = 1.06 + 0.02 * Math.sin(t * 90); hot = 1 }
    } else if (t >= T.back[0] && t < T.cut2) {
      k = easeOutBack(prog(t, T.back[0] + 0.1, T.back[0] + 0.45), 1.8) * popOut(t, [T.panic, T.panic + 0.26])
      const dropP = prog(t, ...T.needle)
      v = lerp(0.98 + jit, 0, ease.inCubic(dropP)) + (dropP >= 1 ? 0.04 * Math.exp(-(t - T.needle[1]) * 8) * Math.sin((t - T.needle[1]) * 30) : 0)
      hot = clamp((v - 0.72) / 0.2)
      read = v >= 0.96 ? '999+' : String(Math.max(0, Math.round(v / 0.96 * 999)))
      flip = prog(t, ...T.flip)
      if (flip >= 0.5) { label = 'TALKED TO'; read = '0'; readCol = '#ff6f7e' }
      web = prog(t, ...T.web)
    } else if (t >= T.gaugeIn3[0]) {
      k = easeOutBack(prog(t, ...T.gaugeIn3), 1.8) * popOut(t, T.out)
      label = 'TALKED TO'; read = '0'; readCol = '#ff6f7e'
      const u = t - T.one
      if (u >= 0) { v = 0.07 + 0.03 * Math.exp(-u * 6) * Math.sin(u * 26); read = '1'; readCol = MINT; heart = clamp(u * 3) }
    }
    return { k, v, read, label, hot, web, flip, heart, readCol }
  }

  // ─────────────────────────────── tonight's deck (H) and the read card
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img || alpha <= 0) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] || t > T.cardOut[1]) return
    for (let i = 0; i < 3; i++) {
      const t0 = T.deal[i], p = prog(t, t0, t0 + 0.55)
      if (p <= 0) continue
      const e = easeOutBack(p, 1.25)
      let cx = lerp(DECK.xs[i] - 120, DECK.xs[i], e), cy = lerp(2200, DECK.y, e), rot = lerp(-0.5, (i - 1) * 0.05, e), wB = DECK.w
      if (i === 1) {
        const r = ease.inOutCubic(prog(t, ...T.pick)), f = prog(t, T.pick[0] + 0.12, T.pick[1])
        cx = lerp(cx, 470, r); cy = lerp(cy, 905, r) + ease.inCubic(prog(t, ...T.cardOut)) * 1400; wB = lerp(DECK.w, 400, r); rot = lerp(rot, -0.025, r)
        if (r > 0 && r < 1) sparkBurst(x, t, cx, cy, T.pick[1] - 0.1, { n: 12, R: 300, size: 28, seed: 2 })
        const sx = Math.cos(f * Math.PI)
        if (r > 0.02) {
          const halo = r * (1 - prog(t, ...T.cardOut))
          const gg = x.createRadialGradient(cx, cy, 0, cx, cy, 520); gg.addColorStop(0, rgba(LAV, 0.28 * halo)); gg.addColorStop(1, rgba(LAV, 0)); x.fillStyle = gg; x.fillRect(cx - 520, cy - 520, 1040, 1040)
        }
        if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy, wB, rot, sx)
        else drawCardImg(FACE, FACE_BODY, cx, cy, wB, rot, -sx)
      } else {
        const s = ease.inCubic(prog(t, ...T.sideOut))
        if (s >= 1) continue
        drawCardImg(BACK, BACK_BODY, cx + (i - 1) * s * 260, cy + s * 1300, wB, rot + (i - 1) * s * 0.5)
      }
    }
  }

  // ─────────────────────────────── the world
  function drawStreaks(t, k) {
    if (k <= 0.01) return
    for (let i = 0; i < 26; i++) {
      const r = rng(i * 31 + 7); r()
      const y = 470 + r() * 1300, len = 90 + r() * 260, sp = 1500 + r() * 1700
      const xx = (((r() * 2000 - t * sp) % 1500) + 1500) % 1500 - 260
      x.fillStyle = rgba([PINK, LAV, CYAN, BONE][i % 4], (0.07 + r() * 0.14) * k)
      x.fillRect(Math.round(xx), Math.round(y), Math.round(len), 4)
    }
  }
  function drawWorld(t) {
    const quiet = clamp(prog(t, T.stop, T.stop + 0.3) - prog(t, T.panic, T.panic + 0.2))
    drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * (1 - 0.25 * quiet) })
    drawStreaks(t, blurK(t))
    // the match: a pink flash
    const mf = pulse(t, T.match - 0.02, 0.5)
    if (mf > 0) { x.fillStyle = rgba('#ffb3d4', 0.22 * mf); x.fillRect(0, 0, W, H) }
    // the focus: a soft white flash
    const ff = pulse(t, T.focus - 0.02, 0.45)
    if (ff > 0) { x.fillStyle = rgba('#fff6e0', 0.14 * ff); x.fillRect(0, 0, W, H) }
  }

  // ─────────────────────────────── one-off props: smoke, the ice pack throw, the spider, the rose
  function drawSmokeFx(t) {
    if (t < T.wisp || t > T.toss[1] + 2) return
    const [tx, ty] = armTipMean(t)
    drawSmoke(x, t, tx + 10, ty - 20, T.wisp, T.smoke[0], { rate: 3, px: 5, life: 0.9, grow: 0.6, seed: 2 })
    drawSmoke(x, t, tx + 10, ty - 24, T.smoke[0], T.toss[1], { rate: 8, px: 7, life: 1.2, grow: 1.1, seed: 5 })
    drawSmoke(x, t, tx + 10, ty - 24, T.toss[1], T.toss[1] + 0.9, { rate: 9, px: 6, life: 1.0, steam: true, grow: 0.9, seed: 9, rise: 230 })
  }
  function drawIceThrow(t) {
    if (t < T.toss[0] || t >= T.toss[1]) return
    const tp = place('tau', t)
    if (!tp || !GEMF) return
    const u = prog(t, ...T.toss), [tx, ty] = armTipMean(t)
    const ax = tp.p[0] + 50, ay = tp.p[1] - 60
    drawIcePack(x, lerp(ax, tx, u), lerp(ay, ty, u) - Math.sin(Math.PI * u) * 260, 8, u * 9)
  }
  function drawSpiderFx(t) {
    if (t < T.spider[0] || t >= T.back[0] + 0.3) return
    const P = phonePos(t) || PH.D
    const top = P.y - 400 * P.s, sx0 = P.x + 120 * P.s
    const d = ease.outCubic(prog(t, ...T.spider)), bob = Math.sin((t - T.spider[1]) * 3.2) * 10 * clamp((t - T.spider[1]) * 2)
    const a = 1 - prog(t, T.back[0], T.back[0] + 0.25)
    drawSpider(x, sx0, top, top + 30 + d * 250 + bob, 7, t, t >= T.wave[0] && t < T.wave[1] ? 1 : 0, a)
  }
  function drawRose(t) {
    if (t < T.flower[0] || t >= T.back[0] + 0.3) return
    const pp = place('pis', t)
    const u = ease.inOutQuad(prog(t, ...T.flower)), a = 1 - prog(t, T.back[0], T.back[0] + 0.2)
    const ax = pp ? pp.p[0] + 60 : 200, ay = pp ? pp.p[1] - 60 : 1150, bx = 470, by = 1235
    drawFlower(x, lerp(ax, bx, u), lerp(ay, by, u) - Math.sin(Math.PI * u) * 240, 7, lerp(-0.6, 0.9, u) + (u < 1 ? u * 6 : 0), a)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, W, H)
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        drawGemBody(t)
        drawPhone(t)
        drawRose(t)
        drawSpiderFx(t)
        drawGemArm(t)
        drawSmokeFx(t)
        drawDeck(t)
        drawCast(t)
        drawIceThrow(t)
        const gs = gaugeState(t)
        drawGauge(x, GA.x, GA.y, gs.k, t, gs)
        sparkBurst(x, t, GEMF ? GEMF.F.ox : 600, GEMF ? GEMF.F.oy - 160 : 900, T.focus, { n: 14, R: 240, size: 30, seed: 1 })
        sparkBurst(x, t, GA.x, GA.y + 70, T.one, { n: 10, R: 170, size: 24, seed: 3 })
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (the default selection keeps the 2nd + 4th: 13.93 flip and 28.83 deal). The others stay inert.
export const CUTS = [9.35, { t: T.cut1, kind: 'flip' }, 18.8, { t: T.cut2, kind: 'deal' }, 33.12]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in the D-major palette; the engine moves them into C minor)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ...(land ? [['pop', r3(land), 1174.66, 0.05, 0], ['pluck', r3(land), 1174.66, 0.04, 0.6, 0]] : [])]
const scratch = t0 => [['whoosh', r3(t0 + 0.07), 0.1, 0.13], ['whoosh', r3(t0 + 0.17), 0.08, 0.1], ['whoosh', r3(t0 + 0.27), 0.14, 0.13], ['tapeStop', t0, 0.45]]
const chirp = (t0, gain = 0.014) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.022, pan = -0.35) => [['pop', r3(t0), 659.25, gain, pan], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, pan], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, pan]]
const womp = (t0, gain = 0.035) => [['pop', r3(t0), 392, gain, 0], ['pluck', r3(t0), 392, gain * 0.8, 0.5, 0], ['pop', r3(t0 + 0.26), 293.66, gain, 0], ['pluck', r3(t0 + 0.26), 293.66, gain * 0.8, 0.8, 0]]
const FX = { bus: 'fx', rev: 0.06, dly: 0 }
const PITCH = { [STARS]: 880, [GEM]: 1046.5, [TAU]: 587.33, [CAP]: 659.25 }

export const CUES = [
  // 1 · the hook: every swipe is a little whoosh + flick; the one right swipe dings
  ...SW.flatMap((s, i) => {
    const slow = s.t > T.slow0
    const out = [['whoosh', s.t, slow ? r3(0.1 + s.gap * 0.5) : 0.09, slow ? r3(0.03 - (s.t - T.slow0) * 0.006) : (s.dir > 0 ? 0.03 : 0.02)], ['tick', r3(s.t + 0.01), slow ? 0.02 : 0.013]]
    if (s.dir > 0) out.push(['pop', s.t, 1174.66, 0.045, 0.3], ['bell', r3(s.t + 0.02), 1318.51, 0.025, 0.7, 0.3])
    void i
    return out
  }),
  ...head(T.h0, 3, T.h0Gap, T.drop, 0),
  ['boom', T.drop, 0.18], ...[587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', r3(T.drop + i * 0.008), f, 0.026, 1.4, (i - 1.5) * 0.2]),
  ['chip', 0.3, 196, 4.3, { wave: 'tri', slide: 24 / 4.3, gain: 0.011, decay: 0.3, sustain: 0.9, ...FX }],
  // 2 · smoke, Taurus, the ice pack, ERR
  ...wordPops(T.h1, 3, 0.13, 2),
  ['whoosh', r3(T.wisp + 0.6), 1.0, 0.016], ['whoosh', T.smoke[0], 1.4, 0.026], ...[0, 1, 2, 3, 4, 5].map(i => ['tick', r3(T.smoke[0] + 0.2 + i * 0.23), 0.016]),
  ['pop', T.tauIn, 659.25, 0.035, -0.4], ['pop', r3(T.tauIn + 0.07), 880, 0.03, -0.4],
  ['whoosh', T.toss[0], 0.42, 0.04], ['pluck', T.toss[0], 880, 0.02, 0.4, -0.3],
  ['pop', T.toss[1], 330, 0.06, 0.1], ['tick', T.toss[1], 0.05], ['whoosh', r3(T.toss[1] + 0.03), 0.9, 0.05],
  ...[0, 1, 2].map(i => ['chip', r3(T.err + i * 0.2), 1567.98, 0.1, { duty: 0.5, gain: 0.016, decay: 0.05, sustain: 0.8, ...FX }]),
  // 3 · it's a match
  ['boom', T.match, 0.16], ...[587.33, 739.99, 880, 1174.66, 1479.98].map((f, i) => ['bell', r3(T.match + i * 0.05), f, 0.03, 1.6, (i - 2) * 0.2]),
  ['glitter', T.match, r3(T.match + 0.8)], ['whoosh', r3(T.match + 0.35), 0.8, 0.04],
  ...head(T.h2, 2, 0.07, T.h2Land, 3),
  ...sob(r3(T.match + 0.5), 0.02, 0.4),
  ['tick', r3(B_done(2) + 0.25), 0.03], ['whoosh', T.side, 0.3, 0.025], ...womp(r3(T.side + 0.5)),
  // 4 · here lies hey
  ...head(T.h3, 2, 0.07, T.h3Land, 1),
  ['bell', r3(T.h3 + 0.05), 293.66, 0.035, 3.2, 0], ['bell', r3(T.h3 + 1.4), 293.66, 0.025, 3.2, 0],
  ...sob(14.5, 0.022), ...sob(15.2, 0.02), ...sob(17.4, 0.018), ...sob(18.1, 0.016),
  ['pluck', T.spider[0], 1318.51, 0.02, 0.5, 0.3], ...[0, 1, 2, 3].map(i => ['tick', r3(T.spider[0] + 0.1 + i * 0.18), 0.012]),
  ['pop', r3(T.wave[0] + 0.05), 1567.98, 0.02, 0.3], ['pop', r3(T.wave[0] + 0.22), 1760, 0.02, 0.3],
  ['whoosh', T.flower[0], 0.4, 0.03], ['pluck', T.flower[1], 880, 0.025, 0.7, -0.1],
  ['pop', T.roll, 659.25, 0.022, 0], ['pop', r3(T.roll + 0.16), 587.33, 0.02, 0],
  // 5 · quick question: record stop, the needle falls, crickets
  ...head(T.h4, 1, 0.07, T.h4Land, 4),
  ['whoosh', T.back[0], 0.4, 0.035], ['pop', T.capIn, 523.25, 0.035, 0.4], ['pop', r3(T.capIn + 0.07), 659.25, 0.03, 0.4],
  ...scratch(T.stop), ['boom', r3(T.stop + 0.02), 0.08],
  ['chip', T.needle[0], 880, 0.64, { wave: 'tri', slide: -30 / 0.64, gain: 0.02, decay: 0.3, sustain: 0.8, ...FX }],
  ['tick', r3(T.flip[0] + 0.16), 0.05], ['pop', r3(T.flip[1]), 440, 0.025, 0.3],
  ...chirp(T.crick[0]), ...chirp(r3(T.crick[0] + 0.22), 0.011), ...chirp(T.crick[1]), ...chirp(r3(T.crick[1] + 0.22), 0.011), ...chirp(r3(T.lE2 + 0.75), 0.011),
  ['tick', T.blinkSync, 0.03], ['tick', r3(T.blinkSync + 0.2), 0.03],
  ...T.taps.map(tp => ['tick', tp, 0.035]),
  ...sob(23.1, 0.016),
  // 6 · slow it down: the panic, half-time, focus
  ...wordPops(T.h5, 2, 0.32, 5, 0.024), ['pop', T.h5Land, 1174.66, 0.045, 0], ['pluck', T.h5Land, 880, 0.04, 1.0, 0],
  ['whoosh', T.panic, 0.3, 0.04],
  ['kick', T.half[0], { gain: 0.5, f1: 140, decay: 0.32, bus: 'drums' }], ['snare', T.half[1], { gated: 0.27, tone: 200, rev: 0.4, gain: 0.24, bus: 'drums' }], ['kick', T.half[2], { gain: 0.5, f1: 140, decay: 0.32, bus: 'drums' }],
  ['bell', T.focus, 1760, 0.035, 1.6, 0], ['glitter', T.focus, r3(T.focus + 0.6)], ['pluck', T.focus, 1174.66, 0.03, 0.9, 0],
  ['whoosh', T.phoneOut[0], 0.35, 0.03],
  // 7 · LESSON UNLOCKED
  ...lessonCues(T.lesson, { ...LESSON, key: KEY }),
  ['whoosh', LESSON.out[0], 0.35, 0.03],
  // 8 · tonight's deck, read properly
  ...head(T.h6, 1, 0.07, T.h6Land, 3),
  ...T.deal.flatMap((d, i) => [['whoosh', d, 0.45, 0.022], ['tick', r3(d + 0.42), 0.05], ['pluck', r3(d + 0.42), NOTE[i * 2], 0.026, 0.8, (i - 1) * 0.3]]),
  ['whoosh', T.pick[0], 0.4, 0.035], ['whoosh', T.sideOut[0], 0.35, 0.025], ['bell', T.pick[1], 1318.51, 0.035, 1.4, 0], ['glitter', r3(T.pick[1] - 0.1), r3(T.pick[1] + 0.4)],
  ['whoosh', T.glasses[0], 0.35, 0.025], ['pop', T.glasses[1], 1174.66, 0.035, 0.2], ['tick', T.glasses[1], 0.04],
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', r3(T.read[0] + 0.06 + i * 0.125), 0.014]),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.heart + 0.04 * i), NOTE[(i * 2 + 3) % 7], 0.022, (i % 2 ? 0.4 : -0.4)]), ['glitter', T.heart, r3(T.heart + 0.5)],
  ...sob(r3(T.heart + 0.3), 0.018, 0.4),
  // 9 · stop swiping, start meeting
  ...wordPops(T.h7, 4, 0.08, 1, 0.022), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0],
  ['whoosh', T.cardOut[0], 0.35, 0.03], ['pop', T.gaugeIn3[0], 659.25, 0.03, 0.4],
  ['pop', T.one, 1318.51, 0.04, 0.3], ['bell', r3(T.one + 0.02), 1760, 0.03, 1.4, 0.3], ['glitter', T.one, r3(T.one + 0.4)],
  ...sob(39.3, 0.016, 0.4),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...BOXES.flatMap(B => talkCues(B.lines, { cps: B.cps, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function B_done(b) { return BOXES[b].times[BOXES[b].times.length - 1].done }
