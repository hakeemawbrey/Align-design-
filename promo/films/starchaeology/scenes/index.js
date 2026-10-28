// starchaeology — "That's archaeology." (45 s vertical Align ad, Star Talk season 3 #1, music: lofi, Gm).
// Story 0–40.6, then the shared end card.
//   0.00–4.95  "He *liked* | a photo."  A phone at 2:14 AM; "♥ liked your photo from 2019" SLAMS onto the lock screen
//              (shake, buzz). The stars zoom in, eyes huge. THE STARS: "no text. no 'hey'. a like. from 2019."
//              Double-take on "2019" (camera punch-in); ♎ Libra faints. Pisces starts crying.
//   4.95–11.9  "Carbon *dating.*"  ♑ CAPRICORN hops in; a pith helmet drops onto it on the music drop (5.6). The phone
//              opens the photo, buried in dust; Capricorn brushes it clean, revealing the 2019 beach pic (old orange
//              date stamp). A museum placard rises: "2019 BEACH PIC · UNEARTHED 2:14 AM". CAPRICORN: "that's not
//              interest. that's archaeology."  Everyone nods slowly.
//  12.27       card cut (flip).
//  12.3–18.4   "Keep *digging.*"  Three more artifacts fall out of the sky, each bigger (rule of three): a pottery shard
//              ("viewed your story", c. 2021), a fossil (a 🔥 pressed into stone, c. 2022), a cave painting ("we should
//              hang sometime", c. 2023, the big THUD). THE STARS list them: "a view. one 🔥. a 'we should hang'." (each
//              wiggles as it's named; synced eye-roll on the last). Silence. "babe. those are crumbs."
//  18.4–21.6   On "crumbs" every artifact crumbles into breadcrumbs that land in a trail. "It's called | *breadcrumbing.*"
//              The sign stars hop along it pecking like pigeons (the narrator eye-rolls). Pisces saves one crumb in a
//              MEMORIES jar ("for the memories") and hugs it; Capricorn confiscates it mid-air. Pisces wails.
//  21.7–27.0   "One *question.*"  Capricorn takes its helmet off: "has he ever made a plan?"  A wall calendar flips:
//              THIS WEEK (empty) · THIS MONTH (empty) · SINCE 2019 (empty, and a cricket). "*Crickets.*" Chirps,
//              a synced blink, a slow push in.
//  27.12       card cut (deal) into ★ LESSON UNLOCKED (lesson.js): "Attention isn't *intention.* | Wait for a plan."
//              +1 STANDARDS.
//  31.7–36.3   "Tonight's *deck.*"  A full fanned hand deals in and flips to veiled cards in a wave. THE STARS: "you
//              deserve a full deck. every night."  Heart eyes.
//  36.4–40.6   "Stop living | on *crumbs.*"  Capricorn sweeps the last crumbs away with its brush; they fly past Pisces,
//              who catches one… Capricorn: "ahem."… Pisces drops it. Everything pops out by 40.5; the end card takes over.
// One canvas (sky + world through a small camera), DOM type + dialogue boxes + the lesson banner above it, grain on top.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawHelmet, drawBrush, drawJar, drawCricket, drawCrumb, drawDust, drawTears, drawPixelHeart, artifact, drawPlacard, drawCalendarPage, drawRings } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5c6e', OCHRE = '#e8a35a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => +(0.6 + n * (60 / 108)).toFixed(3)     // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.25],
  // 1 · the like
  phone: 0.04, h0: 0.12, h0Out: [4.72, 4.92], slam: 0.42, buzz: [0.5, 0.82], zoom: [0.46, 0.86],
  l1: 1.3, dbl: [3.12, 3.4], cry1: 3.45, faint: 3.72, closeA: 4.85,
  // 2 · carbon dating
  capIn: 4.92, drop: BEAT(9), h1: 5.08, h1Land: BEAT(9), h1Out: [11.72, 11.92],
  open: 5.95, brush: [6.25, 7.55], placard: 7.4, l2: 8.0, cry2: 7.9, nod: [10.15, 10.95], closeB: 11.3,
  cut1: BEAT(21),                                                            // 12.267
  // 3 · keep digging
  h2: 12.33, h2Land: 12.66, h2Out: [18.2, 18.38],
  art: [BEAT(22), BEAT(23), BEAT(24)],                                       // 12.822 · 13.378 · 13.933
  l3: 14.45, l4: 17.62, crack: 18.12, crumble: 18.41, closeC: 20.25,
  // 3b · breadcrumbing
  h3: 18.45, h3Land: 18.86, h3Out: [21.45, 21.65],
  pig: [18.95, 21.4], jarIn: 19.35, peck: 19.55, hug: [19.8, 20.6], snatch: 20.75,
  // 4 · the question
  hatOff: [21.7, 22.05], h4: 21.75, h4Land: 22.08, h4Out: [24.5, 24.68],
  l5: 22.2, closeD: 24.6, cal: 23.2, flips: [24.05, 24.95, 25.85], h5: 24.75, h5Land: 25.02, sync: 26.45, h5Out: [26.85, 27.05],
  cut2: 27.12,
  // 5 · LESSON
  lesson: BEAT(48), lessonOut: [31.35, 31.6],                                // 27.267 (text in by 28.82)
  // 6 · tonight's deck
  h6: 31.7, h6Land: 32.04, h6Out: [36.05, 36.25], deal: 31.78, dealGap: 0.075, fanFlip: 32.75, flipGap: 0.07,
  l6: 32.6, hearts: 33.55, closeE: 35.7, deckOut: [35.95, 36.35],
  // 7 · stop living on crumbs
  h7: 36.4, h7Land: 37.0, sweep: [37.3, 38.3], sneak: 37.98, glare: 38.75, drop2: 39.2,
  out: [40.05, 40.5],
}

// ── the dialogue
const STARS = 'THE STARS', CAPN = '♑︎ CAPRICORN'
const CAPC = '#5fe0b4'
const LA_ = [{ t: T.l1, speaker: STARS, text: "no text. no 'hey'. a like. from *2019.*" }]
const LB_ = [{ t: T.l2, speaker: CAPN, color: CAPC, text: "that's not interest. that's *archaeology.*" }]
const LC_ = [
  { t: T.l3, speaker: STARS, text: "a view. one 🔥. a '*we should hang*'." },
  { t: T.l4, speaker: STARS, text: 'babe. those are *crumbs.*' },
]
const LD_ = [{ t: T.l5, speaker: CAPN, color: CAPC, text: 'has he ever made a *plan?*' }]
const LE_ = [{ t: T.l6, speaker: STARS, text: 'you deserve a *full deck.* every night.' }]
export const ALL_LINES = [...LA_, ...LB_, ...LC_, ...LD_, ...LE_]
export const BOXES = [[LA_, T.closeA], [LB_, T.closeB], [LC_, T.closeC], [LD_, T.closeD], [LE_, T.closeE]]
const CPS = 28
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Attention isn’t | *intention.* | Wait for a plan.', chip: '+1 STANDARDS', accentColor: GOLD, dim: 0.55 }
const LT = lineTimes(ALL_LINES, { cps: CPS })
const STAR_HOPS = talkHops(ALL_LINES, STARS, { cps: CPS })
const CAP_HOPS = talkHops(ALL_LINES, CAPN, { cps: CPS })
const charAt = (li, word) => { const s = [...ALL_LINES[li].text.replace(/\*/g, '')].join(''); const i = s.indexOf(word); return LT[li].chars[[...s.slice(0, Math.max(0, i))].length] }
const T_2019 = charAt(0, '2019'), T_ARCH = charAt(1, 'archaeology'), T_VIEW = charAt(2, 'view'), T_FIRE = charAt(2, 'one'), T_HANG = charAt(2, "'we"), T_CRUMBS = charAt(3, 'crumbs'), T_PLAN = charAt(4, 'plan'), T_FULL = charAt(5, 'full')

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const pulse = (t, t0, d = 0.5) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const inR = (t, a, b) => t >= a && t < b

// ── the cast
const CAST = {
  g0: { col: STAR.sky, glyph: null, seed: 3, gold: true },
  cap: { ...signStar('capricorn'), seed: 53 },
  pis: { ...signStar('pisces'), seed: 47, back: true },
  ari: { ...signStar('aries'), seed: 11 },
  leo: { ...signStar('leo'), seed: 29 },
  lib: { ...signStar('libra'), seed: 23 },
  sco: { ...signStar('scorpio'), seed: 41 },
  gem: { ...signStar('gemini'), seed: 37 },
  g2: { col: '#ffe08a', glyph: null, seed: 17, gold: true },
}
for (const k in CAST) if (!CAST[k].col) CAST[k].col = CAST[k].color
const ORDER = ['sco', 'gem', 'g2', 'pis', 'leo', 'lib', 'ari', 'g0', 'cap']   // back to front
const PIGEONS = ['ari', 'lib', 'gem', 'leo', 'pis']                           // lead → last

// layouts: key → [x, y, size]
const ROW = { sco: [150, 1815, 112], gem: [400, 1818, 108], g2: [665, 1820, 104], pis: [930, 1805, 126] }
const LAY = {
  A: { g0: [170, 770, 190], ari: [915, 755, 150], leo: [150, 1185, 150], lib: [935, 1190, 140], ...ROW },
  B: { g0: [128, 690, 150], ari: [962, 585, 118], leo: [124, 1105, 132], cap: [805, 880, 262], lib: [150, 1815, 112], sco: [400, 1818, 108], gem: [665, 1820, 104], pis: ROW.pis },
  C: { g0: [112, 700, 150], g2: [972, 700, 136], cap: [540, 1165, 200], lib: [130, 1815, 108], ari: [345, 1818, 108], leo: [560, 1820, 108], gem: [770, 1818, 104], pis: [955, 1805, 120] },
  P: { g0: [190, 745, 170], cap: [865, 735, 210], g2: [975, 555, 104], sco: [110, 1300, 0] },
  D: { cap: [835, 1015, 255], g0: [150, 1805, 118], ari: [370, 1818, 108], lib: [590, 1820, 106], gem: [800, 1818, 104], pis: [985, 1800, 116], leo: [108, 600, 0] },
  L: { g0: [540, 1520, 225], cap: [215, 1470, 150], ari: [865, 1470, 132], leo: [140, 1752, 118], lib: [940, 1752, 118], pis: [345, 1778, 104], gem: [735, 1778, 104] },
  E: { g0: [150, 690, 168], cap: [930, 690, 168], ari: [140, 1815, 108], leo: [375, 1820, 104], lib: [705, 1820, 104], gem: [940, 1815, 106], pis: [540, 1790, 122] },
  F: { g0: [540, 935, 225], ari: [185, 760, 128], lib: [895, 760, 128], cap: [800, 1215, 205], pis: [285, 1225, 165], leo: [150, 1580, 116], gem: [930, 1585, 112] },
}
const SEG = [
  { t: 0, L: LAY.A },
  { t: T.capIn - 0.02, L: LAY.B, anim: 0.4 },
  { t: T.cut1, L: LAY.C },
  { t: T.crumble + 0.1, L: LAY.P, anim: 0.42 },
  { t: T.hatOff[0] - 0.05, L: LAY.D, anim: 0.42 },
  { t: T.lesson - 0.1, L: LAY.L, anim: 0.4 },
  { t: T.h6 - 0.1, L: LAY.E, anim: 0.42 },
  { t: T.h7 - 0.12, L: LAY.F, anim: 0.46 },
]
/** where actor k is at t → { p: [x, y, s], pk } or null */
function place(k, t) {
  let i = 0
  for (let j = 0; j < SEG.length; j++) if (t >= SEG[j].t) i = j
  const S = SEG[i], cur = S.L[k], stag = (CAST[k].seed % 7) * 0.025
  const ok = v => v && v[2] > 0
  if (S.anim && i > 0) {
    const prev = SEG[i - 1].L[k], t0 = S.t + stag, p = prog(t, t0, t0 + S.anim)
    if (ok(cur) && ok(prev)) {
      const e = ease.inOutCubic(p)
      return { p: [lerp(prev[0], cur[0], e), lerp(prev[1], cur[1], e) - Math.sin(Math.PI * p) * 70, lerp(prev[2], cur[2], e)], pk: 1 }
    }
    if (ok(cur)) return { p: cur, pk: pop01(t, t0, 0.34, 2.2) }
    if (ok(prev)) { const o = popOut(t, [t0, t0 + 0.28]); return o > 0 ? { p: prev, pk: o } : null }
    return null
  }
  if (!ok(cur)) return null
  let pk = 1
  if (i === 0) pk = pop01(t, 0.18 + stag * 2, 0.4, 1.6)
  else if (t < S.t + 0.7) pk = pop01(t, S.t + 0.06 + stag, 0.32, 2.2)
  return { p: cur, pk }
}

// phone placements
const PH = { A: { x: 540, y: 1010, s: 0.86, r: -1.5 }, B: { x: 430, y: 930, s: 0.78, r: -3 } }
function phonePos(t) {
  if (t < T.capIn) return PH.A
  if (t < T.cut1) { const e = ease.inOutCubic(prog(t, T.capIn, T.capIn + 0.45)); return { x: lerp(PH.A.x, PH.B.x, e), y: lerp(PH.A.y, PH.B.y, e), s: lerp(PH.A.s, PH.B.s, e), r: lerp(PH.A.r, PH.B.r, e) } }
  return null
}
// the dig: artifact spots (centre x, y; cell px), crumble chunks land on the trail
const ART = [
  { kind: 'shard', x: 250, y: 1128, cell: 7, tag: 'c. 2021', rot: -0.06 },
  { kind: 'fossil', x: 832, y: 1124, cell: 7, tag: 'c. 2022', rot: 0.05 },
  { kind: 'cave', x: 540, y: 735, cell: 9, tag: 'c. 2023', rot: -0.02 },
]
const TRAIL_Y = 1165
const trailAt = u => ({ x: lerp(-30, 1110, u), y: TRAIL_Y + Math.sin(u * 9.5) * 16 })
const CRUMBS = (() => {
  const R = rng(404), out = []
  for (let i = 0; i < 27; i++) {
    const u = (i + 0.5) / 27 + (R() - 0.5) * 0.015, p = trailAt(u)
    const src = u < 0.36 ? 0 : u > 0.64 ? 1 : 2
    out.push({ u, x: p.x + (R() - 0.5) * 14, y: p.y + (R() - 0.5) * 10, src, seed: i * 3 + 1, ox: (R() - 0.5), oy: (R() - 0.5), delay: R() * 0.22, rot: (R() - 0.5) * 0.8 })
  }
  return out
})()

// the camera: keys [t, zoom, focusX, focusY] (eased), plus impact shakes [t, amp]
const CAM = [[0, 1, 540, 960], [1.25, 1, 540, 960], [3.05, 1.05, 540, 990], [3.16, 1.13, 540, 1000], [3.55, 1.1, 540, 1000], [4.75, 1.1, 540, 1000], [5.15, 1, 540, 960],
  [24.9, 1, 540, 960], [27.0, 1.04, 470, 950], [27.1, 1, 540, 960]]
const SHAKE = [[T.slam, 16], [T.drop, 7], [T.art[0], 5], [T.art[1], 8], [T.art[2], 15], [T.crumble, 9]]
function cam(t) {
  let a = CAM[0], b = CAM[0]
  for (let i = 0; i < CAM.length; i++) if (CAM[i][0] <= t) { a = CAM[i]; b = CAM[i + 1] || CAM[i] }
  const e = b === a ? 0 : ease.inOutCubic(prog(t, a[0], b[0]))
  const k = a.slice(1).map((v, i) => lerp(v, b[i + 1], e))
  let sx = 0, sy = 0
  for (const [t0, amp] of SHAKE) { const d = t - t0; if (d >= 0 && d < 0.45) { const f = amp * Math.exp(-d * 9); sx += f * Math.sin(d * 71); sy += f * Math.cos(d * 59) } }
  return { z: k[0], fx: k[1], fy: k[2], sx, sy }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "500 30px Inter", "700 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'", "700 40px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const FACE_FILES = ['card-profile-3.png', 'card-profile-1.png', 'card-profile-5.png', 'card-profile-2.png', 'card-profile-6.png', 'card-profile-4.png', 'card-profile-1.png']
  const [backIm, ...faceIms] = await Promise.all([loadImg('card-back.png'), ...[1, 2, 3, 4, 5, 6].map(i => loadImg(`card-profile-${i}.png`))])
  const BACK = bake(backIm, 420), FACES = faceIms.map(im => bake(im, 440))
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496
  const faceFor = i => FACES[(+FACE_FILES[i].match(/\d/)[0]) - 1]

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'He *liked* | a photo.', { top: 196, size: 124, accentSize: 168, at: T.h0, gap: 0.09, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H1 = popText(root, 'Carbon *dating.*', { top: 214, size: 120, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: OCHRE })
  const H2 = popText(root, 'Keep *digging.*', { top: 214, size: 120, accentSize: 168, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: OCHRE })
  const H3 = popText(root, "It's called | *breadcrumbing.*", { top: 190, size: 104, accentSize: 130, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 1.06 })
  const H4 = popText(root, 'One *question.*', { top: 214, size: 120, accentSize: 168, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: CAPC })
  const H5 = popText(root, '*Crickets.*', { top: 196, size: 170, accentSize: 200, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: '#9fe07a' })
  const H6 = popText(root, "Tonight's *deck.*", { top: 214, size: 120, accentSize: 168, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: LAV })
  const H7 = popText(root, 'Stop living | on *crumbs.*', { top: 196, size: 118, accentSize: 168, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD, lineHeight: 1.04, gap: 0.08 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, [T.out[0] + 0.1, T.out[1]]]]
  const boxes = BOXES.map(([lines, close]) => dialogueBox(root, { lines, y: 1400, width: 960, height: 300, close, cps: CPS }))

  // ── ★ LESSON UNLOCKED (shared lesson.js): above the scene, below the grain and the card cuts
  const lesson = buildLesson(root, LESSON)

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ─────────────────────────────── the phone (local units: 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawPhone(t) {
    const P = phonePos(t)
    if (!P) return
    let k = easeOutBack(prog(t, T.phone, T.phone + 0.45), 1.7)
    k *= 1 - ease.inCubic(prog(t, T.cut1 - 0.3, T.cut1 - 0.04))
    if (k <= 0.01) return
    let bz = 0
    { const u = t - T.buzz[0]; if (u >= 0 && u < T.buzz[1] - T.buzz[0]) bz = 1 - u / (T.buzz[1] - T.buzz[0]) }
    const jolt = 18 * pulse(t, T.slam, 0.16)
    const jx = bz * 8 * Math.sin(t * 190), jr = bz * 2.6 * Math.sin(t * 160 + 1)
    x.save()
    x.translate(P.x + jx, P.y + jolt); x.rotate((P.r + jr) * Math.PI / 180); x.scale(P.s * k, P.s * k)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    if (bz > 0) {
      x.save(); x.strokeStyle = rgba(BONE, 0.85 * bz); x.lineWidth = 8; x.lineCap = 'round'
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { x.beginPath(); x.arc(0, -hh + 300, hw + 34 + i * 30, sd < 0 ? Math.PI - 0.32 : -0.32, sd < 0 ? Math.PI + 0.32 : 0.32); x.stroke() }
      x.restore()
    }
    x.save(); x.shadowColor = rgba(t < T.open ? PINK : GOLD, 0.55); x.shadowBlur = 70
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh)
    g.addColorStop(0, '#24164f'); g.addColorStop(0.6, '#3b2370'); g.addColorStop(1, '#5b2a74')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    const f = prog(t, T.open, T.open + 0.25)
    if (f < 1) drawLock(t, sx, sy, sw, sh, 1 - f)
    if (f > 0) drawPhoto(t, sx, sy, sw, sh, f)
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()      // notch
    x.globalAlpha = 0.08; x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(sx, sy); x.lineTo(sx + sw * 0.55, sy); x.lineTo(sx, sy + sh * 0.45); x.fill(); x.globalAlpha = 1
    x.restore()
    // the notification card slams in OVER the glass (big → into its slot), then sits in it
    if (t < T.open + 0.25) drawNotif(t, sx, sy, sw, 1 - f)
    x.restore()
  }
  function drawLock(t, sx, sy, sw, sh, a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = rgba(BONE, 0.9); x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.font = `500 30px ${INTER}`; x.fillText('Tuesday', 0, sy + 104)
    x.font = `800 128px ${INTER}`; x.fillText('2:14', 0, sy + 226)
    x.font = `700 34px ${MONO}`; x.fillText('AM', 0, sy + 274)
    x.restore()
  }
  function drawNotif(t, sx, sy, sw, a) {
    const p = prog(t, T.slam - 0.06, T.slam + 0.2)
    if (p <= 0 || a <= 0) return
    const sc = lerp(2.4, 1, ease.inCubic(Math.min(1, p * 1.05))) + 0.06 * pulse(t, T.slam + 0.14, 0.2)
    const nw = sw - 28, nh = 178, ny = sy + 318
    x.save(); x.globalAlpha = a * clamp(p * 2.5)
    x.translate(0, ny + nh / 2); x.scale(sc, sc); x.rotate((1 - Math.min(1, p * 1.05)) * -0.1)
    x.save(); x.shadowColor = 'rgba(255,92,142,0.55)'; x.shadowBlur = 40
    rr(-nw / 2, -nh / 2, nw, nh, 30); x.fillStyle = 'rgba(46,26,84,0.96)'; x.fill(); x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(255,190,215,0.6)'; rr(-nw / 2, -nh / 2, nw, nh, 30); x.stroke()
    // avatar: a little moon, "him", "now"
    const top = -nh / 2
    x.fillStyle = '#c9a6ff'; x.beginPath(); x.arc(-nw / 2 + 50, top + 46, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(40,24,80,0.95)'; x.beginPath(); x.arc(-nw / 2 + 60, top + 39, 18, 0, Math.PI * 2); x.fill()
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.fillText('him', -nw / 2 + 86, top + 58)
    x.font = `500 24px ${INTER}`; x.fillStyle = rgba(BONE, 0.65); x.textAlign = 'right'; x.fillText('now', nw / 2 - 22, top + 56)
    // ♥ liked your photo / from 2019
    drawPixelHeart(x, -nw / 2 + 40, top + 106, 5, '#ff4d78')
    x.textAlign = 'left'; x.fillStyle = BONE; x.font = `700 36px ${INTER}`; x.fillText('liked your photo', -nw / 2 + 72, top + 118)
    x.font = `800 40px ${INTER}`; x.fillStyle = '#ffcf5a'; x.fillText('from 2019', -nw / 2 + 72, top + 162)
    x.restore()
    // impact ring + sparks at the slam
    const ip = prog(t, T.slam + 0.12, T.slam + 0.55)
    if (ip > 0 && ip < 1) {
      x.save(); x.globalAlpha = (1 - ip) * 0.8; x.strokeStyle = PINK; x.lineWidth = 10 * (1 - ip)
      rr(-nw / 2 - 40 * ip * 3, ny - 40 * ip * 3, nw + 80 * ip * 3, nh + 80 * ip * 3, 40); x.stroke(); x.restore()
    }
  }
  // the photo view: "Jul 14, 2019", the beach pic (dusty until brushed), the like row
  const DUST = (() => { const R = rng(77), d = []; for (let j = 0; j < 34; j++) for (let i = 0; i < 18; i++) d.push({ u: (i + 0.5 + (R() - 0.5) * 0.7) / 18, v: (j + 0.5 + (R() - 0.5) * 0.7) / 34, s: 0.7 + R() * 0.8, c: R() }); return d })()
  const BR_N = 4
  const brushTip = t => {                                    // the brush tip in phone-local coords while brushing
    const p = prog(t, ...T.brush), band = Math.min(BR_N - 1, Math.floor(p * BR_N)), q = p * BR_N - band
    const dir = band % 2 === 0 ? 1 : -1, u = dir > 0 ? q : 1 - q
    return { lx: lerp(-150, 150, u), ly: -250 + (band + 0.5) / BR_N * 560, band, u, dir }
  }
  const clearAt = (u, v) => {                                 // when the brush passes over (u, v) of the screen
    const band = Math.min(BR_N - 1, Math.floor(v * BR_N)), dir = band % 2 === 0 ? 1 : -1, along = dir > 0 ? u : 1 - u
    return T.brush[0] + ((band + along) / BR_N) * (T.brush[1] - T.brush[0])
  }
  function drawPhoto(t, sx, sy, sw, sh, a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = '#0d0820'; x.fillRect(sx, sy, sw, sh)
    // header
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `700 44px ${INTER}`; x.fillText('‹', sx + 18, sy + 104)
    x.textAlign = 'center'; x.font = `700 30px ${INTER}`; x.fillText('Jul 14, 2019', 0, sy + 100)
    // the picture
    const S = artifact('beach'), cell = sw / S.w, ph = S.h * cell, py = sy + 130
    x.imageSmoothingEnabled = false; x.drawImage(S.c, sx, py, sw, ph); x.imageSmoothingEnabled = true
    // the old camera date stamp
    x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.fillStyle = '#ff9a3a'; x.shadowColor = 'rgba(255,120,40,0.8)'; x.shadowBlur = 8
    x.fillText("'19 7 14", sx + sw - 18, py + ph - 18); x.shadowBlur = 0
    // the like row
    const ly = py + ph + 64
    const hp = 1 + 0.35 * pulse(t, T.open + 0.25, 0.3)
    x.save(); x.translate(sx + 44, ly - 12); x.scale(hp, hp); drawPixelHeart(x, 0, 0, 6, '#ff4d78'); x.restore()
    x.textAlign = 'left'; x.fillStyle = BONE; x.font = `700 30px ${INTER}`; x.fillText('liked · just now', sx + 84, ly)
    // dust: khaki clumps everywhere until the brush passes
    for (const d of DUST) {
      const tc = clearAt(d.u, d.v), age = t - tc
      if (age > 0.35) continue
      const px = Math.round(sx + d.u * sw), pyy = Math.round(sy + 60 + d.v * (sh - 80)), s = Math.round(16 * d.s)
      if (age > 0) { x.globalAlpha = a * (1 - age / 0.35); x.fillStyle = '#e2cf9e'; x.fillRect(px - s / 2 + age * 220 * (d.c - 0.5), pyy - s / 2 - age * 150, Math.ceil(s * 0.5), Math.ceil(s * 0.5)); continue }
      x.globalAlpha = a
      x.fillStyle = d.c < 0.25 ? '#7d6942' : d.c < 0.6 ? '#a08654' : d.c < 0.9 ? '#bca06c' : '#d9c28e'
      x.fillRect(px - s, pyy - s / 2, s * 2, s); x.fillRect(px - s / 2, pyy - s, s, s * 2)
    }
    x.restore()
  }

  // ─────────────────────────────── the dig: artifacts, tags, crumbs
  function artLand(i) { return T.art[i] }
  function drawArtifacts(t) {
    if (t < T.cut1 - 0.1 || t > T.crumble + 0.3) return
    ART.forEach((a, i) => {
      const S = artifact(a.kind), w = S.w * a.cell, h = S.h * a.cell, t0 = artLand(i)
      const fall = prog(t, t0 - 0.38, t0)
      if (fall <= 0) return
      drawDust(x, a.x, a.y + h / 2 - 10, w * 0.62, prog(t, t0, t0 + 0.6), 7 + i, { n: 12 })     // landing dust, behind the slab
      let yy = a.y - (1 - ease.inQuad(fall)) * 1300, sq = 0
      const land = t - t0
      if (land >= 0) sq = 0.16 * Math.exp(-land * 9) * Math.cos(land * 22)
      // named: a wiggle as the stars list it
      const named = [T_VIEW, T_FIRE, T_HANG][i]
      const wig = pulse(t, named, 0.45)
      // crack + crumble
      const shake = t >= T.crack ? Math.sin(t * 90 + i) * 6 * prog(t, T.crack, T.crumble) : 0
      let k = 1
      if (t >= T.crumble) { const c = prog(t, T.crumble, T.crumble + 0.14); k = c >= 1 ? 0 : 1 + 0.1 * Math.sin(Math.PI * c) - c * 0.5 }
      if (k <= 0) return
      x.save()
      x.translate(a.x + shake, yy + h / 2); x.rotate(a.rot + wig * 0.08 * Math.sin((t - named) * 30)); x.scale((1 + sq) * k * (1 + wig * 0.08), (1 - sq * 0.8) * k * (1 + wig * 0.08)); x.translate(0, -h / 2)
      x.globalAlpha = t >= T.crumble ? clamp(1 - prog(t, T.crumble + 0.04, T.crumble + 0.14)) : 1
      // glow when named
      if (wig > 0) { const gg = x.createRadialGradient(0, 0, 0, 0, 0, w * 0.8); gg.addColorStop(0, rgba(GOLD, 0.35 * wig)); gg.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gg; x.fillRect(-w, -h, w * 2, h * 2) }
      x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 14, w, h)
      x.imageSmoothingEnabled = false; x.drawImage(S.c, -w / 2, -h / 2, w, h); x.imageSmoothingEnabled = true
      inscription(a.kind, w, h)
      if (t >= T.crack) cracks(w, h, prog(t, T.crack, T.crumble), i)
      x.restore()
      // tag
      const tp = pop01(t, t0 + 0.2, 0.3, 2) * (t >= T.crumble ? 1 - prog(t, T.crumble, T.crumble + 0.12) : 1)
      if (tp > 0.02) tag(a.tag, a.x + (i === 2 ? w * 0.36 : 0), a.y + h / 2 + (i === 2 ? -8 : 22), tp)
    })
  }
  function inscription(kind, w, h) {
    x.textAlign = 'center'; x.textBaseline = 'middle'
    if (kind === 'shard') {
      x.fillStyle = '#2a140a'; x.font = `700 36px ${MONO}`
      x.fillText('viewed', 0, 14); x.fillText('your story', 0, 56)
    } else if (kind === 'cave') {
      x.fillStyle = '#9e2a18'
      const lines = [['we should hang', -6], ['sometime', 50]]
      x.font = `800 48px ${INTER}`
      lines.forEach(([s, dy], li) => {
        const tw = x.measureText(s).width; let cx = -tw / 2 - 30
        ;[...s].forEach((ch, ci) => { const cw = x.measureText(ch).width; x.save(); x.translate(cx + cw / 2, dy + Math.sin(ci * 1.7 + li) * 3); x.rotate(Math.sin(ci * 2.3 + li) * 0.06); x.fillText(ch, 0, 0); x.restore(); cx += cw })
      })
    }
  }
  function cracks(w, h, p, i) {
    if (p <= 0) return
    const R = rng(91 + i), n = Math.ceil(p * 5)
    x.fillStyle = '#1a0c06'
    for (let c = 0; c < n; c++) {
      let px = (R() - 0.5) * w * 0.6, py = (R() - 0.5) * h * 0.6
      for (let s = 0; s < 9; s++) { x.fillRect(Math.round(px), Math.round(py), 6, 6); px += (R() - 0.3) * 18; py += (R() - 0.5) * 18 }
    }
  }
  function tag(s, cx, cy, k) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 26px ${MONO}`; const tw = x.measureText(s).width + 30
    x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(-tw / 2 + 5, -20, tw, 44)
    x.fillStyle = '#f6eedb'; x.fillRect(-tw / 2, -24, tw, 44)
    x.fillStyle = '#c9a24a'; x.fillRect(-tw / 2, -24, tw, 4)
    x.fillStyle = '#2a1a10'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 0)
    x.restore()
  }
  // crumbs: burst out of the artifacts on "crumbs", land on the trail, stay until the final sweep
  function crumbPos(c, t) {
    const a = ART[c.src], S = artifact(a.kind), w = S.w * a.cell, h = S.h * a.cell
    const t0 = T.crumble + c.delay * 0.4, p = prog(t, t0, t0 + 0.55 + c.delay)
    const fx = a.x + c.ox * w * 0.7, fy = a.y + c.oy * h * 0.7
    if (p < 1) return { x: lerp(fx, c.x, p), y: lerp(fy, c.y, ease.inQuad(p)) - Math.sin(Math.PI * p) * 140, rot: c.rot * (1 - p) * 6, on: t >= t0 }
    return { x: c.x, y: c.y + 8 * Math.exp(-(t - t0 - 0.55 - c.delay) * 10) * Math.sin((t - t0) * 30), rot: c.rot, on: true }
  }
  function drawCrumbs(t) {
    if (t < T.crumble || t > T.hatOff[0] + 0.6) return
    const fade = 1 - prog(t, T.hatOff[0] + 0.1, T.hatOff[0] + 0.5)
    for (const c of CRUMBS) {
      const P = crumbPos(c, t)
      if (!P.on) continue
      if (c.jar && t >= T.peck) continue
      drawCrumb(x, P.x, P.y, 6, c.seed, { rot: P.rot, alpha: fade })
    }
    for (const [i, a] of ART.entries()) drawDust(x, a.x, a.y, 175, prog(t, T.crumble, T.crumble + 0.55), 30 + i, { n: 12, col: '#d6b07a', alpha: 0.85 })
  }
  CRUMBS[1].jar = true         // the one Pisces saves

  // the final beat's crumbs: Capricorn sweeps them left, they fly off past Pisces, who catches one (CATCH)
  const LAST = Array.from({ length: 9 }, (_, i) => ({ x: 412 + i * 34 + ((i * 37) % 11) - 5, y: 1336 + ((i * 53) % 15) - 7, seed: i * 5 + 2 }))
  const CATCH = 4
  const PIS_HOLD = () => { const L = LAY.F.pis; return { x: L[0] + L[2] * 0.56, y: L[1] - L[2] * 0.22 } }
  const lastHit = i => T.sweep[0] + (T.sweep[1] - T.sweep[0]) * (0.08 + ((LAST.length - 1 - i) / LAST.length) * 0.8)
  function drawLastCrumbs(t) {
    if (t < T.h7 - 0.12 || t > T.out[1]) return
    const ok = popOut(t, T.out)
    LAST.forEach((c, i) => {
      const ap = pop01(t, T.h7 + 0.05 + i * 0.03, 0.3, 2)
      if (ap <= 0) return
      if (i === CATCH) {                            // flies into Pisces' grip at T.sneak (then Pisces holds it)
        const f = prog(t, T.sneak - 0.42, T.sneak)
        if (f >= 1) return
        const H = PIS_HOLD()
        drawCrumb(x, lerp(c.x, H.x, ease.outQuad(f)), lerp(c.y, H.y, f) - Math.sin(Math.PI * f) * 150, 7 * ap, c.seed, { rot: f * 6, alpha: ok })
        return
      }
      const hit = lastHit(i), f = prog(t, hit, hit + 0.6)
      if (f >= 1) return
      const X = c.x - ease.outCubic(f) * (c.x + 160), Y = c.y - Math.sin(Math.PI * Math.min(1, f * 1.25)) * 170 * (0.6 + (i % 3) * 0.2)
      drawCrumb(x, X, Y, 7 * ap, c.seed, { rot: -f * 8, alpha: ok })
    })
    if (t >= T.sweep[0] - 0.1 && t < T.sweep[1] + 0.6) for (let k = 0; k < 3; k++) drawDust(x, 640 - k * 70, 1330, 110, prog(t, T.sweep[0] + k * 0.33, T.sweep[0] + k * 0.33 + 0.5), 60 + k, { n: 8, col: '#d6b07a' })
  }

  // ─────────────────────────────── the calendar
  const CAL = { x: 345, y: 905, w: 480, h: 520 }
  const PAGES = [{ label: 'THIS WEEK' }, { label: 'THIS MONTH' }, { label: 'SINCE 2019', cricket: true }]
  function drawCalendar(t) {
    if (t < T.cal || t > T.cut2 + 0.05) return
    const k = pop01(t, T.cal, 0.4, 1.9)
    const X = CAL.x - CAL.w / 2, Y = CAL.y - CAL.h / 2
    x.save(); x.translate(CAL.x, Y); x.scale(k, k); x.translate(-CAL.x, -Y)
    x.fillStyle = 'rgba(6,4,18,0.5)'; x.fillRect(X + 12, Y + 16, CAL.w, CAL.h)
    // which page is on top, and the one flipping
    let top = 0
    for (const f of T.flips) if (t >= f + 0.32) top++
    top = Math.min(top, PAGES.length - 1)
    const under = Math.min(PAGES.length - 1, top + 1)
    let flipping = -1, fp = 0
    T.flips.forEach((f, i) => { if (inR(t, f, f + 0.32) && i < PAGES.length - 1) { flipping = i; fp = prog(t, f, f + 0.32) } })
    const cricket = (cx, cy) => drawCricket(x, cx, cy, 6, { t, chirp: t > T.flips[1] + 0.32 ? clamp(Math.sin((t - T.flips[1]) * 3.2)) : 0 })
    const pg = i => ({ cricket: PAGES[i].cricket ? cricket : null, stamp: pop01(t, (i === 0 ? T.cal + 0.4 : T.flips[i - 1] + 0.35), 0.25, 1.6) })
    if (flipping >= 0) {
      drawCalendarPage(x, X, Y, CAL.w, CAL.h, PAGES[flipping + 1].label, { t, ...pg(flipping + 1) })
      const c = Math.cos(Math.PI * fp)
      x.save(); x.translate(0, Y); x.scale(1, c); x.translate(0, -Y)
      if (c < 0) x.globalAlpha *= clamp(1 + c * 1.15)          // the page's back fades as it swings up past the binding
      drawCalendarPage(x, X, Y, CAL.w, CAL.h, PAGES[flipping].label, { t, back: c < 0, ...pg(flipping) })
      x.restore()
    } else drawCalendarPage(x, X, Y, CAL.w, CAL.h, PAGES[top].label, { t, ...pg(top) })
    void under
    drawRings(x, X, Y, CAL.w)
    x.restore()
  }

  // ─────────────────────────────── tonight's deck: a full fanned hand, flipping to veiled cards in a wave
  const FAN_N = 7, FAN_R = 640, FAN_PY = 1640, CARD_W = 214
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal || t > T.deckOut[1]) return
    for (let i = 0; i < FAN_N; i++) {
      const t0 = T.deal + i * T.dealGap, p = prog(t, t0, t0 + 0.42)
      if (p <= 0) continue
      const deg = (i - (FAN_N - 1) / 2) * 10.5, a = deg * Math.PI / 180, e = easeOutBack(p, 1.4)
      const fx = 540 + Math.sin(a) * FAN_R, fy = FAN_PY - Math.cos(a) * FAN_R
      const o = prog(t, T.deckOut[0] + Math.abs(i - 3) * 0.03, T.deckOut[1])
      const cx = lerp(540 + (i - 3) * 30, fx, e), cy = lerp(2350, fy, e) + ease.inCubic(o) * 1200, rot = lerp(a * 2.2 + 0.5, a, e)
      const lift = 26 * pulse(t, T.fanFlip + i * T.flipGap, 0.5)
      const f = prog(t, T.fanFlip + i * T.flipGap, T.fanFlip + i * T.flipGap + 0.3), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy - lift, CARD_W, rot, sx)
      else drawCardImg(faceFor(i), FACE_BODY, cx, cy - lift, CARD_W, rot, -sx)
    }
    sparkles(t, 540, 980, T.fanFlip + 0.2, 14, 420, 0.4, 0.9, 30)
    sparkles(t, 540, 980, T.hearts, 10, 330, 1.3, 0.8, 26)
  }

  function sparkles(t, cx, cy, t0, n, R, seed, dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.6 + 0.6 * p), cy + Math.sin(a) * R * (0.6 + 0.6 * p) * 0.8, size * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  // ─────────────────────────────── the cast: moods, reactions, props
  const toward = (p, tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
  // pigeons: half-beat hops along the trail, pecking between hops
  const HOPDT = 60 / 108 / 2
  const pigeonHops = k => { const i = PIGEONS.indexOf(k), out = []; for (let h = T.pig[0] + i * 0.05; h < T.pig[1]; h += HOPDT) { if (k === 'pis' && h > T.peck - 0.1) break; out.push(+h.toFixed(3)) } return out }
  const PIG_X0 = { ari: 845, lib: 680, gem: 515, leo: 350, pis: 185 }
  function pigeonAt(k, t) {
    const hops = pigeonHops(k)
    let n = 0, frac = 0
    for (const h of hops) { if (t >= h + 0.31) n++; else if (t >= h) frac = ease.inOutQuad((t - h) / 0.31) }
    const px = PIG_X0[k] + (n + frac) * 40
    const tr = trailAt(clamp((px + 30) / 1140))
    return { x: px, y: tr.y - 68, s: 132, hops }
  }
  function hopsFor(k) {
    const C = CAST[k], st = (C.seed % 5) * 0.03
    const h = [T.slam + 0.04 + st * 0.3, T.dbl[1] + st * 0.3, ...T.art.map(a => a + 0.03 + st * 0.3), T.crumble + 0.02 + st * 0.3, T.hearts + st, T.lesson + 0.08 + st]
    if (C.gold && k === 'g0') h.push(...STAR_HOPS)
    if (k === 'cap') h.push(...CAP_HOPS, T.drop + 0.02, T_ARCH, T.snatch + 0.05)
    if (k === 'pis') h.push(T.snatch + 0.1, T.drop2)
    return h
  }
  const HOPS = Object.fromEntries(Object.keys(CAST).map(k => [k, hopsFor(k)]))

  function stateOf(k, t, p) {
    const C = CAST[k]
    let mood = 'neutral', look, blink, squash = 0, dx = 0, dy = 0, tears = 0, grow = 1, rot = 0
    const ph = phonePos(t) || { x: 540, y: 1000 }
    if (t < T.capIn) {                                               // ── the like
      if (t >= T.slam) {
        mood = 'wide'; look = toward(p, ph.x, ph.y); blink = false
        const z = ease.outCubic(prog(t, ...T.zoom))
        grow = 1 + 0.16 * z
        dx = Math.sign(ph.x - p[0]) * 55 * z; dy = Math.sign(ph.y - p[1]) * 22 * z
        squash = -0.22 * Math.exp(-(t - T.slam) * 6) * Math.cos((t - T.slam) * 22)
        if (t >= T.l1 + 0.3 && t < T.dbl[0]) { mood = 'squint'; blink = undefined }
        if (t >= T.dbl[0] && t < T.dbl[1]) { mood = 'neutral'; look = [0, 0]; blink = false }
        if (t >= T.dbl[1]) { mood = 'wide'; look = toward(p, ph.x, ph.y); blink = false; squash += -0.2 * Math.exp(-(t - T.dbl[1]) * 7) * Math.cos((t - T.dbl[1]) * 24) }
        if (t >= T.dbl[1] + 0.9) { mood = 'squint'; blink = undefined }
      }
      if (k === 'g0' && t >= T.l1 && t < LT[0].done + 0.1 && t < T.dbl[0]) { look = [0, 0] }
      if (k === 'pis' && t >= T.cry1) { tears = 0.6; mood = 'squint' }
      if (k === 'lib' && t >= T.faint) { const f = prog(t, T.faint, T.faint + 0.28); rot = -1.5 * ease.outQuad(f) - 0.12 * Math.sin(Math.PI * clamp((t - T.faint - 0.28) / 0.25)); dy = 30 * f; blink = 1; mood = 'neutral'; squash = 0 }
    } else if (t < T.cut1) {                                          // ── carbon dating
      const P = PH.B
      mood = 'neutral'; look = toward(p, P.x, P.y)
      if (k === 'cap') {
        mood = 'squint'; look = [-1, 0]
        const kk = t - T.drop
        if (kk >= 0) squash += 0.24 * Math.exp(-kk * 8) * Math.cos(kk * 24)
        if (inR(t, T.brush[0] - 0.15, T.brush[1] + 0.1)) { const bt = brushTip(t), k = clamp(prog(t, T.brush[0] - 0.15, T.brush[0] + 0.1)) * (1 - prog(t, T.brush[1] - 0.05, T.brush[1] + 0.1)); dx = (bt.lx * PH.B.s * 0.55 - 55) * k; dy = (bt.ly * PH.B.s * 0.28 + Math.sin(t * 24) * 5) * k; look = [-1, bt.ly > 60 ? 1 : 0] }
        if (t >= T.brush[1] + 0.05) { mood = 'wide'; look = [-1, 0] }
        if (t >= T.l2 - 0.1) { mood = 'neutral'; look = [0, 0] }
        if (t >= T_ARCH) mood = 'squint'
        if (t >= LT[1].done + 0.6) { mood = 'happy' }
      } else {
        if (t >= T.brush[1]) mood = 'wide'
        if (t >= T.l2 + 0.2) mood = 'neutral'
        if (t >= T_ARCH) { mood = 'wide'; look = [0, 0] }
        if (t >= T.nod[0]) { mood = 'squint'; look = [0, 0]; squash = 0.09 * Math.abs(Math.sin((t - T.nod[0]) * Math.PI / 0.4)) * (t < T.nod[1] ? 1 : 0) }
      }
      if (k === 'pis') { tears = t >= T.cry2 ? 1 : 0.5; mood = t >= T.cry2 ? 'squint' : mood }
    } else if (t < T.crumble + 0.1) {                                 // ── keep digging
      look = [0, 0]; mood = 'neutral'
      let tgt = null
      for (let i = 0; i < 3; i++) if (t >= T.art[i]) tgt = ART[i]
      if (tgt) { look = toward(p, tgt.x, tgt.y); mood = 'wide' }
      if (t >= T.l3) {
        const named = t >= T_HANG ? ART[2] : t >= T_FIRE ? ART[1] : t >= T_VIEW ? ART[0] : null
        if (named) look = toward(p, named.x, named.y)
        mood = 'neutral'
      }
      if (t >= T_HANG + 0.15 && t < LT[2].done + 0.9) { mood = 'eyeroll'; if (k === 'g0') mood = 'neutral' }
      if (t >= LT[2].done + 0.9 && t < T.l4) { mood = 'neutral'; look = [0, 0]; blink = false }       // the stare
      if (t >= T.l4) { mood = k === 'g0' ? 'squint' : 'neutral'; look = [0, 0] }
      if (k === 'g0' && t >= T.l3) look = [0, 0]
      if (k === 'cap') { if (!tgt) { mood = 'squint'; look = [0, -1] } }
      if (t >= T.crumble) { mood = 'wide'; look = [0, -1]; blink = false }
      if (k === 'pis') tears = 0.5
    } else if (t < T.hatOff[0]) {                                      // ── breadcrumbing
      mood = 'neutral'; look = [0, 0]
      if (k === 'g0') { mood = t < T.pig[0] + 1.3 ? 'eyeroll' : 'squint'; look = [1, 1] }
      if (k === 'cap') { mood = 'squint'; look = t >= T.peck ? [-1, 1] : [0, 1]; if (t >= T.snatch) { mood = 'squint'; look = [-1, 0] } }
      if (k === 'g2' || k === 'sco') { mood = 'squint'; look = [0, 1] }
      if (k === 'pis') tears = t >= T.snatch + 0.1 ? 1 : 0
    } else if (t < T.lesson - 0.1) {                                   // ── the question
      mood = 'neutral'; look = toward(p, CAL.x, CAL.y)
      if (k === 'cap') { mood = 'neutral'; look = t < T.cal + 0.3 ? [0, 0] : [-1, 0]; if (t >= T.l5 && t < LT[4].done + 0.3) look = [0, 0] }
      if (t < T.cal) look = toward(p, 835, 1015)
      if (t >= T.flips[2] + 0.35) { mood = 'neutral'; blink = false }
      const sb = t - T.sync; if (sb >= 0 && sb < 0.3) blink = sb < 0.08 ? 0.5 : sb < 0.22 ? 1 : 0.5
      if (k === 'pis') { tears = 0.55; mood = 'squint' }
    } else if (t < T.h6 - 0.1) {                                       // ── lesson
      mood = 'sparkle'; look = toward(p, 540, 640)
      if (t > T.lesson + 1.3) mood = 'happy'
      if (k === 'pis') tears = 0.9
    } else if (t < T.h7 - 0.12) {                                      // ── tonight's deck
      mood = 'neutral'; look = toward(p, 540, 980)
      if (t >= T.fanFlip) mood = 'wide'
      if (t >= T.hearts + (p[0] / W) * 0.12) mood = 'heart'
      if (k === 'cap' && t >= T.hearts) { mood = 'happy'; squash = 0.07 * Math.abs(Math.sin((t - T.hearts) * 6)) }
      if (k === 'pis') tears = t >= T.hearts ? 0.85 : 0.4
    } else {                                                           // ── stop living on crumbs
      mood = 'happy'; look = [0, 0]
      if (k === 'cap') {
        mood = 'squint'; look = [-1, 1]
        if (inR(t, T.sweep[0] - 0.1, T.sweep[1])) { const ph2 = (t - T.sweep[0]) / ((T.sweep[1] - T.sweep[0]) / 3); dx = -Math.abs(Math.sin(ph2 * Math.PI)) * 28; rot = -Math.sin(ph2 * Math.PI * 2) * 0.1 }
        if (t >= T.sweep[1]) { mood = 'happy'; look = [0, 0] }
        if (t >= T.glare) { mood = 'squint'; look = [-1, 0]; blink = false }
        if (t >= T.drop2 + 0.35) { mood = 'happy'; look = [0, 0]; blink = undefined }
      }
      if (k === 'pis') {
        tears = 0.3; look = [1, 1]
        if (t >= T.sneak - 0.1 && t < T.glare) { mood = 'sparkle'; look = [1, 0]; tears = 0 }
        if (t >= T.glare && t < T.drop2) { mood = 'wide'; look = [1, 0]; blink = false; tears = 0 }
        if (t >= T.drop2) { mood = 'happy'; look = [0, 0]; tears = 0.45 }
      }
      if (k !== 'cap' && k !== 'pis' && t >= T.sneak + 0.2 && t < T.drop2 + 0.25) { look = toward(p, LAY.F.pis[0], LAY.F.pis[1]); if (t >= T.glare) mood = 'neutral' }
    }
    return { mood, look, blink, squash, dx, dy, tears, grow, rot }
  }

  // the helmet: drops onto Capricorn on the drop, comes off at the question, back on for the deck
  function helmetFor(t, R) {
    const on = (hx, hy) => ({ x: hx, y: hy, rot: -0.05, a: 1 })
    const hx = R.x + R.size * 0.02, hy = R.top + R.size * 0.12
    if (t < T.drop - 0.4) return null
    if (t < T.drop) { const p = prog(t, T.drop - 0.4, T.drop); return { x: hx, y: lerp(hy - 700, hy, ease.inQuad(p)), rot: (1 - p) * 0.8, a: 1 } }
    if (t < T.hatOff[0]) return on(hx, hy)
    if (t < T.lesson - 0.1) {      // off: lifted and held at its side
      const p = ease.inOutCubic(prog(t, ...T.hatOff))
      return { x: lerp(hx, R.x - R.size * 0.52, p), y: lerp(hy, R.y + R.size * 0.05, p) - Math.sin(Math.PI * p) * 60, rot: lerp(-0.05, -0.5, p), a: 1 }
    }
    if (t < T.h6 - 0.1) return null
    const p = prog(t, T.h6 + 0.2, T.h6 + 0.55)
    if (p <= 0) return null
    return { x: hx, y: lerp(hy - 260, hy, easeOutBack(p, 1.6)), rot: -0.05, a: clamp(p * 3) }
  }

  function drawActor(k, t, ok) {
    let P = place(k, t)
    // pigeons override the layout while they parade
    const pg = PIGEONS.includes(k) && t >= T.crumble + 0.1 && t < T.hatOff[0] + 0.45
    let pigeon = null
    if (pg) {
      pigeon = pigeonAt(k, t)
      const from = place(k, T.crumble + 0.09), e = ease.inOutCubic(prog(t, T.crumble + 0.1, T.crumble + 0.52))
      const back = ease.inOutCubic(prog(t, T.hatOff[0] - 0.05, T.hatOff[0] + 0.4))
      const to = SEG[4].L[k]
      let px = pigeon.x, py = pigeon.y, ps = pigeon.s
      if (from && e < 1) { px = lerp(from.p[0], px, e); py = lerp(from.p[1], py, e) - Math.sin(Math.PI * e) * 90; ps = lerp(from.p[2], ps, e) }
      if (back > 0 && to) { px = lerp(px, to[0], back); py = lerp(py, to[1], back) - Math.sin(Math.PI * back) * 90; ps = lerp(ps, to[2], back) }
      P = { p: [px, py, ps], pk: 1 }
    }
    if (!P) return
    const p = P.p, pk = P.pk * ok
    if (pk <= 0.02 || p[2] <= 0) return
    const C = CAST[k], st = stateOf(k, t, p)
    let mood = st.mood, look = st.look, rot = st.rot, hops = HOPS[k]
    if (pigeon && t < T.hatOff[0]) {
      mood = 'happy'; look = [1, 1]; hops = pigeon.hops
      // peck: a quick forward tip between hops
      let last = -1e9; for (const h of pigeon.hops) if (h <= t) last = h
      const since = t - last - 0.31
      if (since > 0 && since < 0.2) rot = 0.32 * Math.sin(Math.PI * since / 0.2)
      if (k === 'pis' && t >= T.peck - 0.1) {
        mood = t >= T.peck && t < T.hug[0] ? 'wide' : 'sparkle'; look = [1, 0]
        if (t >= T.snatch) { mood = 'squint'; look = [1, -1] }
        rot = 0
      }
    }
    const size = p[2] * st.grow
    const alpha = C.back ? 0.94 : 1
    x.save()
    if (rot) { x.translate(p[0] + st.dx, p[1] + st.dy + size * 0.3); x.rotate(rot); x.translate(-(p[0] + st.dx), -(p[1] + st.dy + size * 0.3)) }
    const R = drawStarChar(x, p[0] + st.dx, p[1] + st.dy, size, t, { color: C.col, glyph: size >= 110 ? C.glyph : null, mood, look, blink: st.blink, squash: st.squash, hops, seed: C.seed, pop: pk, glow: C.gold ? 1.1 : 0.85, alpha })
    x.restore()
    const S = R.size
    if (k === 'cap') {
      const hm = helmetFor(t, R)
      if (hm && hm.a > 0) drawHelmet(x, hm.x, hm.y, S * 0.6 * pk, { rot: hm.rot, alpha: hm.a })
      // the brush: while brushing (on the phone), at its side in the dig, sweeping at the end
      if (inR(t, T.drop + 0.3, T.cut1 - 0.2)) {
        if (inR(t, T.brush[0] - 0.1, T.brush[1] + 0.1)) {
          const P0 = phonePos(t), bt = brushTip(t)
          const tx = P0.x + bt.lx * P0.s, ty = P0.y + bt.ly * P0.s
          drawBrush(x, tx, ty, 8, { rot: -0.3 + Math.sin(t * 26) * 0.12 })
        } else drawBrush(x, R.x - S * 0.7, R.y + S * 0.1, 7, { rot: -0.5 })
      }
      if (t >= T.h7 && t < T.out[1]) {
        const sw = inR(t, T.sweep[0] - 0.1, T.sweep[1]) ? Math.sin((t - T.sweep[0]) / ((T.sweep[1] - T.sweep[0]) / 3) * Math.PI) : 0
        drawBrush(x, R.x - S * 0.66 - sw * 60, R.y + S * 0.34, 7, { rot: 0.3 + sw * 0.3, alpha: pk })
      }
      // the confiscated jar, held at its side
      if (t >= T.snatch + 0.36 && t < T.hatOff[0] + 0.3) drawJar(x, R.x + S * 0.58, R.y + S * 0.12, 7, { crumbs: 1, alpha: 1 - prog(t, T.hatOff[0], T.hatOff[0] + 0.3) })
    }
    if (k === 'pis') {
      // the jar: pops in beside Pisces, the crumb drops in, the hug, then it's yanked to Capricorn
      if (t >= T.jarIn && t < T.snatch) {
        const jp = pop01(t, T.jarIn, 0.3, 2)
        let jx = R.x - S * 0.7, jy = R.y + S * 0.12, rotJ = 0
        if (inR(t, ...T.hug)) { jx = R.x - S * 0.5; rotJ = Math.sin((t - T.hug[0]) * 9) * 0.08 }
        drawJar(x, jx, jy, 8, { crumbs: t >= T.peck + 0.3 ? 1 : 0, alpha: jp, rot: rotJ })
        // the saved crumb arcs into the jar
        if (inR(t, T.peck, T.peck + 0.3)) { const q = prog(t, T.peck, T.peck + 0.3), cp = crumbPos(CRUMBS[1], t); drawCrumb(x, lerp(cp.x, jx, q), lerp(cp.y, jy, q) - Math.sin(Math.PI * q) * 120, 6, CRUMBS[1].seed) }
        if (inR(t, ...T.hug)) for (let h = 0; h < 2; h++) { const hp = ((t - T.hug[0]) * 1.4 + h / 2) % 1; drawPixelHeart(x, R.x - S * 0.5 + h * 50 + Math.sin(hp * 6 + h) * 10, R.y - S * 0.35 - hp * 80, 4, '#ff7aa8') }
        const bk = pop01(t, T.peck + 0.2, 0.3, 2.2) * (1 - prog(t, T.snatch, T.snatch + 0.12))
        if (bk > 0.02) speech('for the memories', R.x + 70, R.y - S * 0.95, bk, R.x + 6, R.y - S * 0.52)
      }
      // the last sneaky crumb
      if (t >= T.sneak && t < T.out[1]) {
        const fall = prog(t, T.drop2, T.drop2 + 0.45), hx = R.x + S * 0.56, hy = R.y + S * 0.08
        const lift = (1 - fall) * S * 0.3 * easeOutBack(prog(t, T.sneak, T.sneak + 0.3), 2)
        if (fall < 1) drawCrumb(x, hx, hy - lift + ease.inQuad(fall) * 380, 12, LAST[CATCH].seed, { rot: fall * 5 })
        if (t < T.drop2 && Math.floor((t - T.sneak) * 4) % 2 === 0) drawPixelStar(x, hx + 38, hy - lift - 36, 30, 1, '#fff3c8')
      }
    }
    const tearsK = st.tears * (k === 'pis' && t >= T.snatch && t < T.hatOff[0] ? 1.6 : 1)
    if (tearsK > 0) {
      const ey = R.y + S * 0.07, exo = S * 0.17
      drawTears(x, [[R.x - exo, ey], [R.x + exo, ey]], t, 0, { cell: Math.max(4, S / 22), strength: Math.min(1.4, tearsK) })
    }
  }

  /** a little pixel speech bubble centred on (cx, cy) with a tail toward (tx, ty) */
  function speech(text, cx, cy, k, tx, ty) {
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 34px ${MONO}`
    const w = Math.round(x.measureText(text).width + 44), h = 66, P = 6, INKB = '#2a1440', FILLB = '#fff3dc'
    const dx = (tx - cx) / k, dy = (ty - cy) / k
    const box = (o, col) => { x.fillStyle = col; x.fillRect(-w / 2 - o + P, -h / 2 - o, w + 2 * o - 2 * P, h + 2 * o); x.fillRect(-w / 2 - o, -h / 2 - o + P, w + 2 * o, h + 2 * o - 2 * P) }
    // the tail: rows narrowing from the bubble's bottom edge to the tip
    const bx0 = clamp(dx * 0.35, -w / 2 + 40, w / 2 - 40), y0 = h / 2 - 2, y1 = Math.max(y0 + 18, Math.min(dy, y0 + 44))
    const tail = (o, col) => { x.fillStyle = col; for (let yy = y0; yy < y1; yy += P) { const f = (yy - y0) / (y1 - y0), cxr = lerp(bx0, bx0 + (dx - bx0) * 0.5, f), ww = lerp(30, 6, f) + 2 * o; x.fillRect(Math.round(cxr - ww / 2), Math.round(yy), Math.round(ww), P + (o ? o : 0)) } }
    box(P, INKB); tail(P, INKB); box(0, FILLB); tail(0, FILLB)
    x.fillStyle = '#5a2a7a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 3)
    x.restore()
  }

  function drawCast(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    for (const k of ORDER) drawActor(k, t, ok)
    // the confiscation: the jar flies from Pisces to Capricorn, over everyone
    if (inR(t, T.snatch, T.snatch + 0.36)) {
      const P0 = pigeonAt('pis', T.snatch), C0 = LAY.P.cap, q = ease.inOutCubic(prog(t, T.snatch, T.snatch + 0.36))
      const ax = P0.x - P0.s * 0.7, ay = P0.y + P0.s * 0.12, bx = C0[0] + C0[2] * 0.58, by = C0[1] + C0[2] * 0.12
      drawJar(x, lerp(ax, bx, q), lerp(ay, by, q) - Math.sin(Math.PI * q) * 260, lerp(8, 7, q), { crumbs: 1, rot: q * 6.3 })
    }
    // the final glare: Capricorn clears its throat
    const ak = pop01(t, T.glare + 0.05, 0.25, 2.4) * (1 - prog(t, T.drop2 + 0.25, T.drop2 + 0.4))
    if (ak > 0.02) { const C1 = LAY.F.cap; speech('ahem.', C1[0] + 20, C1[1] - C1[2] * 0.98, ak, C1[0] - 30, C1[1] - C1[2] * 0.5) }
  }

  // ─────────────────────────────── the world
  function drawWorld(t) {
    drawSky(x, t, { ...SKY_H })
    // the lesson dim lives in lesson.js; a soft lift of light behind the like at the slam
    const fl = pulse(t, T.slam, 0.4)
    if (fl > 0) { x.fillStyle = rgba('#ffd0e0', 0.12 * fl); x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawWorld(t)
      if (t < T.out[1] + 0.02) {
        const C = cam(t)
        x.save(); x.translate(540 + C.sx, 960 + C.sy); x.scale(C.z, C.z); x.translate(-C.fx, -C.fy)
        drawArtifacts(t)
        drawCalendar(t)
        drawDeck(t)
        drawPhone(t)
        drawCrumbs(t)
        drawCast(t)
        drawLastCrumbs(t)
        // placard beside the photo
        const pk = pop01(t, T.placard, 0.36, 1.9) * (1 - ease.inCubic(prog(t, T.cut1 - 0.3, T.cut1 - 0.04)))
        if (pk > 0.02) { x.save(); x.translate(790, 1160); x.scale(pk, pk); drawPlacard(x, 0, 0, { title: '2019 BEACH PIC', sub: 'UNEARTHED 2:14 AM', w: 420, h: 124, post: 70 }); x.restore() }
        if (t >= T.brush[1] && t < T.brush[1] + 0.8) sparkles(t, PH.B.x, PH.B.y, T.brush[1], 10, 260, 0.5, 0.7, 26)
        sparkles(t, 540, 1080, T.h7Land, 10, 360, 0.2, 0.7, 24)
        x.restore()
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (default selection keeps the 2nd + 4th: 12.27 flip and 27.12 deal). The others stay inert:
// 4.92 (the like → carbon dating), 21.66 (breadcrumbs → the question), 31.6 (lesson → the deck).
export const CUTS = [4.92, { t: T.cut1, kind: 'flip' }, 21.66, { t: T.cut2, kind: 'deal' }, 31.6]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine; written in the D-major palette)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const buzz = t0 => Array.from({ length: 7 }, (_, i) => ['pop', r3(t0 + i * 0.045), 150 + (i % 2) * 20, 0.05, 0])
const chirp = (t0, gain = 0.016) => [0, 1, 2].map(i => ['pop', r3(t0 + i * 0.045), 4186, gain, 0.4])
const sob = (t0, gain = 0.022) => [['pop', r3(t0), 659.25, gain, 0.35], ['pop', r3(t0 + 0.11), 587.33, gain * 0.9, 0.35], ['pop', r3(t0 + 0.22), 493.88, gain * 0.8, 0.35]]
const thud = (t0, big = 1) => [['boom', t0, 0.12 * big], ['pop', t0, 196, 0.04 * big, 0], ['tick', r3(t0 + 0.05), 0.04], ['tick', r3(t0 + 0.11), 0.025], ['whoosh', r3(t0 - 0.3), 0.3, 0.03 * big]]
const crunch = (t0, n = 14) => Array.from({ length: n }, (_, i) => ['tick', r3(t0 + i * 0.022 + (i % 3) * 0.006), 0.05 * (1 - i / n) + 0.012])
const coo = (t0, pan = 0) => [['pop', r3(t0), 330, 0.02, pan], ['pop', r3(t0 + 0.13), 294, 0.018, pan]]
const scrub = (a, b) => { const n = Math.round((b - a) / 0.11); return Array.from({ length: n }, (_, i) => ['whoosh', r3(a + i * 0.11), 0.1, 0.022]) }
const cheer = (t0) => [['whoosh', r3(t0 + 0.2), 0.4, 0.035], ['glitter', r3(t0), r3(t0 + 0.22)], ['pop', r3(t0 + 0.02), NOTE[3], 0.035, 0]]
const PITCH = { [STARS]: 880, [CAPN]: 587.33 }

export const CUES = [
  // 1 · the like slams in
  ...head(T.h0, 4, r3(T.h0 + 0.27), 0),
  ['whoosh', r3(T.slam - 0.25), 0.28, 0.05], ['boom', T.slam, 0.22], ['pop', T.slam, 880, 0.04, 0], ['bell', r3(T.slam + 0.02), 1318.51, 0.03, 0.9, 0],
  ...buzz(T.buzz[0]), ...buzz(r3(T.buzz[0] + 0.4)),
  ['riser', T.zoom[0], r3(T.zoom[1] + 0.1), 0.02],
  ['pop', r3(T.l1 - 0.2), 659.25, 0.035, 0],
  ['whoosh', T.dbl[0], 0.12, 0.05], ['whoosh', T.dbl[1], 0.14, 0.06], ['pop', T.dbl[1], 1174.66, 0.045, 0], ['bell', r3(T.dbl[1] + 0.02), 1567.98, 0.025, 0.8, 0],
  ...sob(T.cry1, 0.018),
  ['whoosh', T.faint, 0.2, 0.03], ['pop', r3(T.faint + 0.28), 196, 0.035, 0.4], ['tick', r3(T.faint + 0.3), 0.035],
  // 2 · carbon dating
  ['whoosh', T.capIn, 0.35, 0.05],
  ...head(T.h1, 1, T.h1Land, 1),
  ['whoosh', r3(T.drop - 0.35), 0.35, 0.04], ['pop', T.drop, 247, 0.05, 0], ['tick', r3(T.drop + 0.02), 0.05], ['pluck', r3(T.drop + 0.05), 392, 0.03, 0.4, 0],
  ['pop', T.open, 1174.66, 0.025, 0], ['tick', r3(T.open + 0.25), 0.03],
  ...scrub(...T.brush),
  ['glitter', T.brush[1], r3(T.brush[1] + 0.5)], ['bell', T.brush[1], 1318.51, 0.035, 1.4, 0],
  ['pop', T.placard, 587.33, 0.035, 0.2], ['tick', r3(T.placard + 0.1), 0.04],
  ...sob(T.cry2), ...sob(r3(T.cry2 + 0.7), 0.018),
  ['pop', r3(T.l2 - 0.2), 587.33, 0.035, 0],
  ['pluck', r3(T_ARCH), 880, 0.03, 0.5, 0],
  ['pop', T.nod[0], 392, 0.02, 0], ['pop', r3(T.nod[0] + 0.4), 392, 0.02, 0],
  // 3 · keep digging: three thuds (each bigger), the list, the stare, "crumbs" → crunch
  ...head(T.h2, 1, T.h2Land, 2),
  ...thud(T.art[0], 0.7), ...thud(T.art[1], 1), ...thud(T.art[2], 1.6),
  ['pop', r3(T.l3 - 0.2), 659.25, 0.035, 0],
  ['bell', T_VIEW, 1174.66, 0.02, 0.6, -0.3], ['bell', T_FIRE, 1318.51, 0.02, 0.6, 0.3], ['bell', T_HANG, 1567.98, 0.02, 0.6, 0],
  ['pluck', r3(T_HANG + 0.3), 440, 0.03, 0.8, 0], ['pluck', r3(T_HANG + 0.5), 392, 0.028, 0.9, 0],
  ...crunch(T.crack, 6),
  ...crunch(T.crumble), ['whoosh', T.crumble, 0.4, 0.05], ['boom', T.crumble, 0.08],
  // 3b · breadcrumbing: pigeon coos and pecks, the jar, the snatch
  ...head(T.h3, 2, T.h3Land, 3),
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['tick', r3(T.pig[0] + 0.31 + i * HOPDT_C()), 0.02]),
  ...coo(r3(T.pig[0] + 0.2), -0.3), ...coo(r3(T.pig[0] + 0.9), 0.3), ...coo(r3(T.pig[0] + 1.6), -0.1), ...coo(r3(T.pig[0] + 2.2), 0.2),
  ['pop', T.jarIn, 880, 0.03, 0.3], ['pluck', r3(T.peck + 0.3), 1760, 0.03, 0.4, 0.3], ['pop', r3(T.peck + 0.2), 1174.66, 0.03, -0.2], ['pop', r3(T.peck + 0.27), 1318.51, 0.025, -0.2],
  ...[0, 1, 2].map(i => ['pop', r3(T.hug[0] + i * 0.2), NOTE[4 + (i % 2)], 0.02, 0.3]),
  ['whoosh', T.snatch, 0.3, 0.06], ['pop', r3(T.snatch + 0.36), 587.33, 0.04, -0.2],
  ...sob(r3(T.snatch + 0.45), 0.026), ...sob(r3(T.snatch + 0.8), 0.022),
  // 4 · the question: tape stop, the calendar, crickets
  ['tapeStop', 21.25, 0.45],
  ['pluck', T.hatOff[0], 523.25, 0.03, 0.6, 0],
  ...head(T.h4, 1, T.h4Land, 0),
  ['pop', r3(T.l5 - 0.2), 587.33, 0.035, 0],
  ['pop', T.cal, 659.25, 0.035, 0], ['tick', r3(T.cal + 0.1), 0.04],
  ...T.flips.flatMap((f, i) => [['whoosh', f, 0.2, 0.04], ['tick', r3(f + 0.3), 0.035], ...chirp(r3(f + 0.4 + i * 0.05)), ...chirp(r3(f + 0.62 + i * 0.05), 0.012)]),
  ...head(T.h5, 0, T.h5Land, 0),
  ...chirp(r3(T.flips[2] + 1.1), 0.014), ...chirp(r3(T.flips[2] + 1.35), 0.01),
  ['tick', T.sync, 0.03],
  // 5 · LESSON UNLOCKED (level-up in Gm, the word pops, the chip)
  ['riser', r3(T.lesson - 1.1), r3(T.lesson - 0.05), 0.025],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Gm' }),
  // 6 · tonight's deck
  ...head(T.h6, 1, T.h6Land, 3),
  ...Array.from({ length: 7 }, (_, i) => ['tick', r3(T.deal + i * T.dealGap + 0.2), 0.05]),
  ['pop', r3(T.l6 - 0.2), 659.25, 0.035, 0],
  ...Array.from({ length: 7 }, (_, i) => ['pop', r3(T.fanFlip + i * T.flipGap + 0.15), NOTE[i % 7], 0.022, (i - 3) * 0.12]),
  ['glitter', r3(T.fanFlip + 0.2), r3(T.fanFlip + 0.9)], ['bell', r3(T.fanFlip + 0.5), 1318.51, 0.03, 1.4, 0],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.hearts + 0.04 * i), NOTE[(i * 2 + 3) % 7], 0.02, (i % 2 ? 0.4 : -0.4)]),
  ['whoosh', T.deckOut[0], 0.35, 0.035],
  // 7 · stop living on crumbs
  ...wordPops(T.h7, 3, 0.08, 1, 0.022), ['pop', T.h7Land, 1174.66, 0.045, 0], ['pluck', T.h7Land, 880, 0.04, 0.8, 0],
  ...[0, 1, 2].flatMap(k => [['whoosh', r3(T.sweep[0] + k * 0.35), 0.22, 0.05], ['tick', r3(T.sweep[0] + k * 0.35 + 0.1), 0.03]]),
  ...cheer(r3(T.sweep[1] + 0.05)),
  ['pop', T.sneak, 1318.51, 0.03, -0.3], ['bell', r3(T.sneak + 0.05), 1760, 0.02, 0.6, -0.3], ['pop', r3(T.glare + 0.05), 294, 0.04, 0.3], ['pop', r3(T.glare + 0.19), 247, 0.035, 0.3], ['pluck', r3(T.drop2 + 0.42), 1760, 0.025, 0.3, -0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function HOPDT_C() { return 60 / 108 / 2 }
