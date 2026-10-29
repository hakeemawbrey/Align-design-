// stfightfair (60 s vertical Align ad, Star Talk season 2 extra: "The stars' rules for fighting fair") · story 0–55.6,
// then the shared end card. A pixel boxing ring; ♈ ARIES and ♎ LIBRA in tiny gloves; REF ♑ CAPRICORN with the whistle;
// ♍ VIRGO holds up the rule cards; ♓ PISCES cries ringside; the AUNTIES work the corners; THE BOOTH calls the break.
//   0.00–4.30  "The stars' rules | for *fighting fair.*"  (on screen at frame 0) Aries and Libra bounce, gloves up, glaring.
//              REF: "Gloves up. Clean fight. Rules first."
//   4.40–14.3  whistle + DING · "Rule one: | no *'you always.'*"  REF: "Rule one: no 'you always.'"  ARIES: "You ALWAYS—"
//              FWEEET: a yellow flag flies and lands on Aries' head (womp). REF: "Flag. Try 'I felt…' instead."
//              ARIES: "…I felt ignored tonight." Libra softens.
//  14.40       card cut (flip)
//  14.5–22.4   "Rule two: | *one* topic."  REF: "Rule two: one topic at a time."  LIBRA: "And LAST YEAR, at the wedding—"
//              (a thought bubble with a wedding cake) FWEEET, record scratch, flag on Libra, the bubble pops.
//              REF: "Flag. Tonight's topic only."
//  22.5–28.6   "Rule three: | take a *break.*"  They heat up: red faces, steam from the tips, a thermometer climbs to HOT.
//              REF: "Rule three: too hot? Take a break."  REF: "Corners. Water. Breathe."
//  28.80       card cut (deal)
//  28.9–36.4   "Time | *out.*"  Corners on stools. Auntie Taurus fans Aries, Auntie Cancer hands Libra water. THE BOOTH at
//              its desk: GEMINI "And they're taking a BREATHER, folks!" SAG "Water. Deep breaths. Textbook."  A BREAK clock
//              runs down; the red cools. AUNTIE CANCER: "Okay. Now use your words, baby."
//  36.5–43.4   DING · "Back in. | *Calmer.*"  ARIES: "I need a heads-up when you're late."  LIBRA: "Fair. I'll text you.
//              Every time."  The gloves fly off, a hug, hearts; Pisces bawls ringside.
//  43.55       card cut (shuffle)
//  43.75–48.6  ★ LESSON UNLOCKED (shared lesson.js): "Fight the *problem,* | not each other."  +1 FAIR PLAY
//  48.7–51.9   "Know your | *Push.*"  The card (Push / Pull / Align); Push glows. REF: "Know your Push before round one."
//  52.0–55.45  "Final | *bell.*"  A dinner table slides into the ring. REF: "Ding ding. Round two: dinner."  Everything pops
//              out by 55.45; the end card takes over at 55.6.
// One canvas (sky + ring + cast through a camera), DOM type + the dialogue boxes, the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { cast, auntie, bmp, drawFan, drawHearts, drawSweat, pixelPanel, sparkBurst, drawWhistle, drawClipboard, drawMic, drawDesk,
  confetti, headCues, chipCue, scratchCue, wompCue, flutterCue, whistleCue, drumrollCue } from './props.js'

export const DURATION = 60
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const KEY = 'G'
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const ARI = signStar('aries'), LIB = signStar('libra'), CAP = signStar('capricorn'), VIR = signStar('virgo'), PIS = signStar('pisces')
const CAN = signStar('cancer'), TAU = signStar('taurus'), GEM = signStar('gemini'), SAG = signStar('sagittarius')
const A_TAG = `${ARI.glyph} ARIES`, L_TAG = `${LIB.glyph} LIBRA`, R_TAG = `${CAP.glyph} REF CAPRICORN`
const G_TAG = `${GEM.glyph} GEMINI · THE BOOTH`, S_TAG = `${SAG.glyph} SAG · THE BOOTH`, C_TAG = `${CAN.glyph} AUNTIE CANCER`
const A_TXT = '#ffb39a', L_TXT = '#f4a6ee', R_TXT = MINT, B_TXT = '#ffe27a', C_TXT = '#8fdcff'

// ── the timeline
const T = {
  open1: -1.3, l1: -1.1, h0Out: [4.12, 4.3],
  rule1: 4.45, h1: 4.5, h1Land: 4.95, l2: 4.75, l3: 7.45, flag1: 8.35, flag1Land: 8.95, l4: 9.6, l5: 12.0, soften: 12.9, h1Out: [14.05, 14.25],
  cut1: 14.4,
  rule2: 14.5, h2: 14.55, h2Land: 15.0, l6: 14.75, l7: 17.4, cake: 17.9, flag2: 19.05, flag2Land: 19.6, l8: 20.15, h2Out: [22.2, 22.4],
  rule3: 22.55, h3: 22.6, h3Land: 23.05, l9: 22.8, heat: [23.3, 26.0], bump: 25.0, hot: 25.9, l10: 26.3, close1: 28.45, h3Out: [28.45, 28.62],
  cut2: 28.8,
  h4: 28.9, h4Land: 29.3, open2: 29.0, l11: 29.2, l12: 31.8, clock: [29.4, 35.6], cool: [29.6, 34.5], l13: 34.0, h4Out: [36.2, 36.38],
  back: [36.4, 36.95], ding2: 36.45, h5: 36.6, h5Land: 37.05, l14: 37.05, l15: 39.45, gloves: 41.1, hug: [41.3, 41.75], close2: 42.35,
  h5Out: [43.15, 43.35], unhug: [43.2, 43.5],
  cut3: 43.55,
  lesson: 43.75, lessonOut: [48.4, 48.65],
  h7: 48.75, h7Land: 49.2, card: [48.8, 49.2], open3: 48.95, l16: 49.15, pushGlow: 49.9, cardOut: [51.6, 51.9], h7Out: [51.65, 51.85],
  h8: 51.95, h8Land: 52.35, table: [52.1, 52.6], l17: 52.3, ding3: 52.75, close3: 54.95, h8Out: [55.0, 55.2], out: [55.0, 55.45],
}
const LINES1 = [
  { t: T.l1, speaker: R_TAG, color: R_TXT, text: 'Gloves up. Clean fight. *Rules first.*' },
  { t: T.l2, speaker: R_TAG, color: R_TXT, text: "Rule one: no *'you always.'*" },
  { t: T.l3, speaker: A_TAG, color: A_TXT, text: 'You *ALWAYS*—' },
  { t: T.l4, speaker: R_TAG, color: R_TXT, text: "Flag. Try *'I felt…'* instead." },
  { t: T.l5, speaker: A_TAG, color: A_TXT, text: '…I felt *ignored* tonight.' },
  { t: T.l6, speaker: R_TAG, color: R_TXT, text: 'Rule two: *one topic* at a time.' },
  { t: T.l7, speaker: L_TAG, color: L_TXT, text: 'And *LAST YEAR,* at the wedding—' },
  { t: T.l8, speaker: R_TAG, color: R_TXT, text: "Flag. *Tonight's* topic only." },
  { t: T.l9, speaker: R_TAG, color: R_TXT, text: 'Rule three: too hot? *Take a break.*' },
  { t: T.l10, speaker: R_TAG, color: R_TXT, text: 'Corners. Water. *Breathe.*' },
]
const LINES2 = [
  { t: T.l11, speaker: G_TAG, color: B_TXT, text: "And they're taking a *BREATHER,* folks!" },
  { t: T.l12, speaker: S_TAG, color: B_TXT, text: 'Water. Deep breaths. *Textbook.*' },
  { t: T.l13, speaker: C_TAG, color: C_TXT, text: 'Okay. Now *use your words,* baby.' },
  { t: T.l14, speaker: A_TAG, color: A_TXT, text: "I need a *heads-up* when you're late." },
  { t: T.l15, speaker: L_TAG, color: L_TXT, text: "Fair. I'll text you. *Every time.*" },
]
const LINES3 = [
  { t: T.l16, speaker: R_TAG, color: READING.push, text: 'Know your *Push* before round one.' },
  { t: T.l17, speaker: R_TAG, color: R_TXT, text: 'Ding ding. *Round two: dinner.*' },
]
const CPS = 28
const ALL = [...LINES1, ...LINES2, ...LINES3]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Fight the *problem,* | not each other.', chip: '+1 FAIR PLAY', dim: 0.55 }
const BEAT = 0.5556
const bounce = t0 => { const out = []; for (let t = t0; t < t0 + 4.2; t += BEAT) out.push(+t.toFixed(3)); return out }
const A_HOPS = [...bounce(-0.2), ...talkHops(ALL, A_TAG, { cps: CPS }), T.rule1, T.rule2, T.bump, T.back[1], T.gloves, T.ding3 + 0.1]
const L_HOPS = [...bounce(-0.48), ...talkHops(ALL, L_TAG, { cps: CPS }), T.rule1 + 0.05, T.rule2 + 0.05, T.bump + 0.02, T.back[1] + 0.05, T.gloves + 0.05, T.ding3 + 0.18]
const R_HOPS = [...talkHops(ALL, R_TAG, { cps: CPS }), T.flag1, T.flag2, T.hot]
const G_HOPS = talkHops(ALL, G_TAG, { cps: CPS }), S_HOPS = talkHops(ALL, S_TAG, { cps: CPS }), C_HOPS = talkHops(ALL, C_TAG, { cps: CPS })

// ── small helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b
const hexMix = (a, b, k) => { const p = parseInt(a.slice(1), 16), q = parseInt(b.slice(1), 16); const c = s => Math.round(lerp((p >> s) & 255, (q >> s) & 255, clamp(k))); return '#' + ((1 << 24) | (c(16) << 16) | (c(8) << 8) | c(0)).toString(16).slice(1) }
/** keyframes [[t, ...v]] → values at t (eased between, held outside) */
function track(K, t, e = ease.inOutCubic) {
  if (t <= K[0][0]) return K[0].slice(1)
  for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) { const k = e(prog(t, K[i][0], K[i + 1][0])); return K[i].slice(1).map((v, j) => lerp(v, K[i + 1][j + 1], k)) }
  return K[K.length - 1].slice(1)
}
/** [[t, mood, look?]] → { mood, look } (the last entry at or before t) */
function moodAt(M, t) { let m = M[0]; for (const e of M) if (e[0] <= t) m = e; return { mood: m[1], look: m[2] } }

// ── the camera: keys [t, zoom, focusX, focusY]
const CAM = [[0, 1, 540, 1000], [8.4, 1, 540, 1000], [8.75, 1.14, 330, 1040], [11.9, 1.14, 330, 1040], [12.3, 1, 540, 1000],
  [19.05, 1, 540, 1000], [19.4, 1.14, 750, 1040], [21.7, 1.14, 750, 1040], [22.1, 1, 540, 1000], [24.6, 1, 540, 1000], [26.0, 1.08, 540, 1080],
  [28.4, 1.08, 540, 1080], [28.8, 1, 540, 1000], [41.1, 1, 540, 1000], [41.6, 1.1, 540, 1120], [43.3, 1.1, 540, 1120], [43.55, 1, 540, 1000]]
function cam(t) { const [z, fx, fy] = track(CAM, t); return { z, fx, fy } }
const toS = (C, x, y, s = 0) => ({ x: 540 + (x - C.fx) * C.z, y: 1000 + (y - C.fy) * C.z, s: s * C.z })

// ── world positions [t, x, y, size]
const ARIES_K = [[0, 270, 1180, 290], [T.cut2 - 0.02, 270, 1180, 290], [T.cut2, 215, 1200, 250], [T.back[0], 215, 1200, 250], [T.back[1], 300, 1180, 290],
  [T.hug[0], 300, 1180, 290], [T.hug[1], 425, 1170, 300], [T.unhug[0], 425, 1170, 300], [T.unhug[1], 285, 1180, 290]]
const LIBRA_K = [[0, 810, 1180, 290], [T.cut2 - 0.02, 810, 1180, 290], [T.cut2, 865, 1200, 250], [T.back[0], 865, 1200, 250], [T.back[1], 780, 1180, 290],
  [T.hug[0], 780, 1180, 290], [T.hug[1], 655, 1170, 300], [T.unhug[0], 655, 1170, 300], [T.unhug[1], 795, 1180, 290]]
const REF = { x: 540, y: 1075, s: 200 }
const VIRGO = { x: 120, y: 790, s: 130 }, PISCES = { x: 960, y: 790, s: 130 }
const TAURUS = { x: 92, y: 1010, s: 170 }, CANCER = { x: 988, y: 1010, s: 170 }
const GEMINI = { x: 420, y: 800, s: 150 }, SAGG = { x: 660, y: 800, s: 150 }

const A_MOOD = [[0, 'squint', [1, 0]], [T.rule1, 'neutral', [0, -1]], [T.l3, 'squint', [1, 0]], [T.flag1Land, 'wide', [0, -1]], [T.flag1Land + 0.7, 'wide', [-1, 0]],
  [T.l4 + 0.6, 'neutral', [0, -1]], [T.l5, 'neutral', [1, 0]], [T.l6, 'neutral', [1, 0]], [T.l7 + 1, 'wide', [1, 0]], [T.flag2Land, 'squint', [1, 0]],
  [T.heat[0], 'squint', [1, 0]], [T.cut2, 'neutral', [0, 0]], [T.cool[0] + 1.5, 'sleepy', [0, 0]], [T.cool[1], 'neutral', [1, 0]], [T.back[1], 'neutral', [1, 0]],
  [T.l15 + 0.5, 'sparkle', [1, 0]], [T.gloves, 'happy'], [T.lesson, 'happy'], [T.card[0], 'neutral', [0, -1]], [T.table[0] + 0.3, 'heart', [0, 0]]]
const L_MOOD = [[0, 'squint', [-1, 0]], [T.rule1, 'neutral', [0, -1]], [T.l3, 'wide', [-1, 0]], [T.l5 + 0.4, 'sparkle', [-1, 0]], [T.l6, 'neutral', [0, -1]],
  [T.l7, 'squint', [-1, 0]], [T.flag2Land, 'wide', [0, -1]], [T.flag2Land + 0.8, 'eyeroll'], [T.l8 + 1.2, 'neutral', [-1, 0]], [T.heat[0], 'squint', [-1, 0]],
  [T.cut2, 'neutral', [0, 0]], [T.cool[0] + 1.5, 'happy', [0, 0]], [T.cool[1], 'neutral', [-1, 0]], [T.l14 + 0.8, 'sparkle', [-1, 0]], [T.gloves, 'happy'],
  [T.lesson, 'happy'], [T.card[0], 'neutral', [0, -1]], [T.table[0] + 0.3, 'heart', [0, 0]]]
const R_MOOD = [[0, 'squint', [0, 0]], [T.rule1, 'neutral', [0, 0]], [T.l3 + 0.6, 'squint', [-1, 0]], [T.flag1, 'wide', [-1, 0]], [T.l4, 'neutral', [-1, 0]],
  [T.l5 + 0.6, 'happy', [-1, 0]], [T.l6, 'neutral', [0, 0]], [T.l7 + 0.7, 'squint', [1, 0]], [T.flag2, 'wide', [1, 0]], [T.l8, 'neutral', [1, 0]],
  [T.heat[0], 'squint', [0, 0]], [T.hot, 'wide', [0, 0]], [T.l10, 'neutral', [0, 0]], [T.back[1], 'neutral', [0, 0]], [T.gloves, 'happy'],
  [T.card[0], 'neutral', [0, -1]], [T.l17, 'happy', [0, 0]]]

// ── the ring (world)
const RING = { y0: 1080, y1: 1395, xl0: 150, xr0: 930, xl1: 40, xr1: 1040 }
function drawRing(x, C, t, heat) {
  const P = (wx, wy) => toS(C, wx, wy)
  const a = P(RING.xl0, RING.y0), b = P(RING.xr0, RING.y0), c = P(RING.xr1, RING.y1), d = P(RING.xl1, RING.y1)
  // the apron face
  const af = P(RING.xl1, RING.y1)
  x.fillStyle = '#140c2c'; x.fillRect(af.x - 40 * C.z, af.y, (RING.xr1 - RING.xl1 + 80) * C.z, 600 * C.z)
  x.fillStyle = '#2b1d56'; x.fillRect(af.x - 40 * C.z, af.y, (RING.xr1 - RING.xl1 + 80) * C.z, 14 * C.z)
  // the mat
  x.fillStyle = '#3a2c6e'; x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.lineTo(c.x, c.y); x.lineTo(d.x, d.y); x.closePath(); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.05)'
  for (let i = 1; i < 6; i++) { const u = i / 6, y = lerp(a.y, d.y, u); x.fillRect(lerp(a.x, d.x, u), y, lerp(b.x, c.x, u) - lerp(a.x, d.x, u), 3 * C.z) }
  // the centre logo: a gold star in a ring, glowing hotter with the heat
  const m = P(540, 1250)
  x.save(); x.translate(m.x, m.y); x.scale(1, 0.32)
  x.strokeStyle = hexMix('#f2c75c', '#ff4040', heat); x.globalAlpha = 0.45 + 0.3 * heat; x.lineWidth = 10 * C.z
  x.beginPath(); x.arc(0, 0, 210 * C.z, 0, Math.PI * 2); x.stroke(); x.restore()
  drawPixelStar(x, m.x, m.y, 70 * C.z, 2, hexMix('#f2c75c', '#ff4040', heat))
  // posts + ropes
  const post = (wx, wy0, wy1, col) => { const p0 = P(wx, wy0), p1 = P(wx, wy1); x.fillStyle = INK; x.fillRect(p0.x - 15 * C.z, p0.y - 6 * C.z, 30 * C.z, p1.y - p0.y + 6 * C.z); x.fillStyle = col; x.fillRect(p0.x - 11 * C.z, p0.y, 22 * C.z, p1.y - p0.y); x.fillStyle = '#ffffff'; x.fillRect(p0.x - 11 * C.z, p0.y, 22 * C.z, 8 * C.z) }
  const ropes = [0, 60, 120]
  for (const r of ropes) {
    x.strokeStyle = r === 60 ? '#efe6d6' : '#ff5c7a'; x.lineWidth = 9 * C.z
    const L0 = P(RING.xl0, 820 + r), R0 = P(RING.xr0, 820 + r), L1 = P(RING.xl1, 1110 + r), R1 = P(RING.xr1, 1110 + r)
    x.beginPath(); x.moveTo(L1.x, L1.y); x.lineTo(L0.x, L0.y); x.lineTo(R0.x, R0.y); x.lineTo(R1.x, R1.y); x.stroke()
  }
  post(RING.xl0, 790, RING.y0, '#d6324d'); post(RING.xr0, 790, RING.y0, '#3a7bd5')
  post(RING.xl1, 1080, RING.y1, '#d6324d'); post(RING.xr1, 1080, RING.y1, '#3a7bd5')
  // the front rope (under the feet)
  x.strokeStyle = '#ff5c7a'; x.lineWidth = 10 * C.z
  const f0 = P(RING.xl1, 1365), f1 = P(RING.xr1, 1365)
  x.beginPath(); x.moveTo(f0.x, f0.y); x.lineTo(f1.x, f1.y); x.stroke()
  // the apron lettering
  const ap = P(540, 1835)
  x.font = `700 ${Math.round(40 * C.z)}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(242,199,92,0.55)'; x.fillText('★  STAR TALK  ·  FIGHT NIGHT  ★', ap.x, ap.y)
}

// the yellow penalty flag (px = art pixel)
const FLAG = ['..KK......', '.KYYK.....', 'KYYYYKKKK.', 'KYYYYYYYYK', 'KYYyYYYYYK', 'KYYYYYyYYK', 'KYYYYYYYYK', '.KKKKKKKK.']
const FLAG_PAL = { K: INK, Y: '#ffd83a', y: '#d9a91c' }
function drawFlag(x, px, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); bmp(x, FLAG, -5 * px, -4 * px, px, FLAG_PAL); x.restore() }
/** where a thrown flag is: a high arc from the ref to the offender's head, then it sits there */
function flagAt(t, t0, tl, from, to) {
  if (t < t0) return null
  const p = prog(t, t0, tl)
  if (p < 1) { const e = ease.inOutQuad(p); return { x: lerp(from.x, to.x, e), y: lerp(from.y, to.y, e) - Math.sin(Math.PI * p) * 260, rot: p * 9 } }
  return { x: to.x, y: to.y, rot: 0.25 + 0.05 * Math.sin((t - tl) * 3), landed: true }
}

// the round card Virgo holds up
function drawRoundCard(x, cx, cy, k, label) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.08); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-6, 0, 12, 90)
  x.fillStyle = '#a8693a'; x.fillRect(-4, 0, 8, 90)
  pixelPanel(x, -105, -78, 210, 96, { P: 6, fill: '#fbf3e2', border: GOLD, glow: 0.25 })
  x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d6324d'; x.fillText(label, 0, -28)
  x.restore()
}

// the thought bubble with a wedding cake (Libra's "last year")
const CAKE = ['....rr....', '....WW....', '..WWWWWW..', '..WpWWpW..', '.WWWWWWWW.', '.WpWWWWpW.', 'WWWWWWWWWW', 'WpWWpWWpWW', 'WWWWWWWWWW', 'GGGGGGGGGG']
function drawCakeBubble(x, t, bx, by, k) {
  if (k <= 0.01) return
  x.save()
  for (let i = 0; i < 3; i++) { const s = (8 + i * 6) * k; x.fillStyle = 'rgba(239,230,214,0.92)'; x.beginPath(); x.arc(bx + 40 + i * 30, by + 150 - i * 50, s, 0, Math.PI * 2); x.fill() }
  x.translate(bx + 130, by - 40); x.scale(k, k)
  x.fillStyle = 'rgba(239,230,214,0.95)'
  for (const [dx, dy, r] of [[0, 0, 95], [-70, 10, 62], [70, 10, 62], [-40, -55, 60], [45, -55, 62], [0, 55, 60]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  bmp(x, CAKE, -60, -66, 12, { r: '#ff5c7a', W: '#ffffff', p: '#ffb3c8', G: '#c9a6ff' })
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#5b4a7a'; x.fillText('LAST YEAR', 0, 72)
  x.restore()
}

// the thermometer (rule three)
function drawThermo(x, t, cx, top, h, level, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  const P = 6, w = 6 * P
  x.fillStyle = INK; x.fillRect(-w / 2 - P, -P, w + 2 * P, h + 2 * P); x.beginPath(); x.arc(0, h + 3 * P, 7 * P, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#efe6d6'; x.fillRect(-w / 2, 0, w, h)
  const col = hexMix('#7fe0ff', '#ff3030', level)
  const lv = h * clamp(0.12 + 0.88 * level)
  x.fillStyle = col; x.fillRect(-w / 2 + P, h - lv, w - 2 * P, lv + 2 * P); x.beginPath(); x.arc(0, h + 3 * P, 6 * P, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(27,18,54,0.5)'
  for (let i = 1; i < 6; i++) x.fillRect(w / 2 - 2 * P, h * i / 6, 2 * P, P / 2)
  if (level > 0.9) { x.font = `700 40px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#ff5050'; x.fillText('HOT', w / 2 + 14, 30 + Math.sin(t * 30) * 3) }
  x.restore()
}

// steam puffs from a star's tips
function drawSteam(x, t, r, heat, seed) {
  if (heat < 0.35 || !r) return
  const k = clamp((heat - 0.35) / 0.4)
  for (let i = 0; i < 6; i++) {
    const ph = ((t * 1.4 + i / 6 + seed * 0.37) % 1)
    const side = i % 2 ? 1 : -1
    const px = r.x + side * (12 + ph * 40) + Math.sin(ph * 8 + i) * 6, py = r.top + 10 - ph * 140
    x.save(); x.globalAlpha = k * Math.sin(Math.PI * ph) * 0.85; x.fillStyle = '#fff6ea'
    const s = Math.round(10 + ph * 18); x.fillRect(Math.round(px - s / 2), Math.round(py - s / 2), s, s); x.restore()
  }
}

// a stool + a water bottle + a towel
function drawStool(x, cx, cy, k) { if (k <= 0) return; x.save(); x.globalAlpha *= k; x.fillStyle = INK; x.fillRect(cx - 74, cy - 10, 148, 28); x.fillRect(cx - 62, cy, 16, 90); x.fillRect(cx + 46, cy, 16, 90); x.fillStyle = '#d39a5e'; x.fillRect(cx - 68, cy - 6, 136, 18); x.fillStyle = '#f0c088'; x.fillRect(cx - 68, cy - 6, 136, 5); x.fillStyle = '#8f5a32'; x.fillRect(cx - 58, cy + 12, 10, 74); x.fillRect(cx + 48, cy + 12, 10, 74); x.restore() }
const BOTTLE = ['..KK..', '.KccK.', '.KccK.', 'KBBBBK', 'KBwBBK', 'KBwBBK', 'KBBBBK', 'KBBBBK', 'KBBBBK', '.KKKK.']
function drawBottle(x, cx, cy, px, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); bmp(x, BOTTLE, -3 * px, -5 * px, px, { K: INK, c: '#7dffb0', B: '#7fe0ff', w: '#ffffff' }); x.restore() }

// a free-flying boxing glove (gloves off)
const GLOVE = ['.OOOO.', 'OGGGGO', 'OGHGGO', 'OGGGGO', 'OGGGGO', 'OWWWWO', '.OOOO.']
function drawGloveFree(x, cx, cy, px, rot, col) { x.save(); x.translate(cx, cy); x.rotate(rot); bmp(x, GLOVE, -3 * px, -3.5 * px, px, { O: INK, G: col, H: '#ffffff', W: '#fbf3e2' }); x.restore() }

// the break clock
function drawClock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const p = prog(t, ...T.clock), secs = Math.round(20 * 60 * (1 - ease.inOutQuad(p)))
  const mm = String(Math.floor(secs / 60)).padStart(2, '0'), ss = String(secs % 60).padStart(2, '0')
  x.save(); x.translate(cx, cy); x.scale(k, k)
  pixelPanel(x, -190, -62, 380, 124, { P: 8, fill: 'rgba(13,8,32,0.94)', border: p >= 1 ? MINT : GOLD, glow: 0.4 })
  x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.75)'; x.fillText('BREAK', 0, -30)
  x.font = `700 58px ${MONO}`; x.fillStyle = p >= 1 ? MINT : '#ff7a6a'; x.fillText(`${mm}:${ss}`, 0, 14)
  x.restore()
}

// the tie-in card: Push / Pull / Align, Push glowing
function drawPushCard(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 820); x.rotate((1 - k) * 0.2); x.scale(k, k)
  pixelPanel(x, -330, -200, 660, 400, { P: 10, fill: 'rgba(16,9,38,0.96)', border: GOLD, glow: 0.6 })
  x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.7)'; x.fillText('YOU  +  THEM', 0, -150)
  const rows = [['PUSH', "where you'll rub", READING.push], ['PULL', 'what draws you in', READING.pull], ['ALIGN', 'where it holds', READING.align]]
  rows.forEach(([lab, sub, col], i) => {
    const y = -78 + i * 92, glow = i === 0 ? clamp((t - T.pushGlow) / 0.3) : 0
    const dim = i === 0 ? 1 : 1 - 0.55 * clamp((t - T.pushGlow) / 0.3)
    x.save(); x.globalAlpha *= dim
    if (glow > 0) { x.save(); x.shadowColor = col; x.shadowBlur = 30 + 14 * Math.sin(t * 8); x.fillStyle = 'rgba(245,156,196,0.16)'; x.fillRect(-300, y - 38, 600, 76); x.restore() }
    x.fillStyle = col; x.fillRect(-300, y - 38, 10, 76)
    x.font = `700 40px ${MONO}`; x.textAlign = 'left'; x.fillStyle = col; x.fillText(lab, -270, y)
    x.font = `italic 600 40px 'EB Garamond', serif`; x.fillStyle = BONE; x.fillText(sub, -120, y + 2)
    x.restore()
  })
  x.restore()
}

// the dinner table
function drawTable(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -14, 300, 32); x.fillRect(-120, 10, 18, 110); x.fillRect(102, 10, 18, 110)
  x.fillStyle = '#fbf3e2'; x.fillRect(-146, -10, 292, 24); x.fillStyle = '#ff8fb1'; for (let i = -146; i < 146; i += 24) x.fillRect(i, 8, 12, 6)
  for (const d of [-80, 80]) { x.fillStyle = INK; x.fillRect(d - 42, -26, 84, 16); x.fillStyle = '#ffffff'; x.fillRect(d - 38, -24, 76, 12); x.fillStyle = '#f39a3a'; x.fillRect(d - 18, -30, 36, 10) }
  x.fillStyle = INK; x.fillRect(-7, -76, 14, 66); x.fillStyle = '#efe6d6'; x.fillRect(-4, -72, 8, 62)
  const fl = Math.sin(t * 17) * 2
  x.fillStyle = '#ffb347'; x.fillRect(-6 + fl, -96, 12, 20); x.fillStyle = '#fff3b0'; x.fillRect(-3 + fl, -90, 6, 12)
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "700 50px Inter", "italic 500 190px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H = (text, at, land, out, o = {}) => [popText(root, text, { top: 160, size: 112, accentSize: 156, at, late: 1, lateAt: land, wobble: true, fit: true, ...o }), out]
  const HEADS = [
    H("The stars' rules | for *fighting fair.*", -1.2, -0.7, T.h0Out, { size: 104, accentSize: 150, late: 2, lateGap: 0.12 }),
    H("Rule one: | no *'you always.'*", T.h1, T.h1Land, T.h1Out, { late: 2, lateGap: 0.12, accentColor: A_TXT }),
    H('Rule two: | *one* topic.', T.h2, T.h2Land, T.h2Out, { accentColor: L_TXT }),
    H('Rule three: | take a *break.*', T.h3, T.h3Land, T.h3Out, { accentColor: '#ff7a6a' }),
    H('Time | *out.*', T.h4, T.h4Land, T.h4Out, { accentColor: '#7fe0ff' }),
    H('Back in. | *Calmer.*', T.h5, T.h5Land, T.h5Out, { accentColor: MINT }),
    H('Know your | *Push.*', T.h7, T.h7Land, T.h7Out, { accentColor: READING.push }),
    H('Final | *bell.*', T.h8, T.h8Land, T.h8Out, { accentColor: GOLD }),
  ]
  const BOX_Y = 1450
  const box1 = dialogueBox(root, { lines: LINES1, y: BOX_Y, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: BOX_Y, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: BOX_Y, width: 960, height: 290, open: T.open3, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const heatAt = t => t < T.heat[0] ? 0 : t < T.cut2 ? ease.inOutQuad(prog(t, ...T.heat)) : 1 - ease.inOutQuad(prog(t, ...T.cool))
  const segPop = (t, a, b) => (t < a || t >= b) ? 0 : pop01(t, a, 0.32, 2) * popOut(t, [b - 0.3, b])

  function aries(t, C, heat) {
    const [px, py, ps] = track(ARIES_K, t), m = moodAt(A_MOOD, t), S = toS(C, px, py, ps)
    const off = t >= T.gloves
    const punch = inR(t, [T.l3, T.flag1]) ? Math.max(0, Math.sin((t - T.l3) * 10)) : inR(t, [T.bump - 0.1, T.bump + 0.4]) ? 0.6 : 0
    const breathe = inR(t, [T.cut2, T.back[0]]) ? 0.06 * Math.sin((t - T.cut2) * 2.4) : 0
    return cast(x, S.x, S.y, S.s, t, { color: hexMix(ARI.color, '#ff2a2a', heat * 0.7), glyph: ARI.glyph, mood: m.mood, look: m.look, hops: A_HOPS, seed: 3,
      pop: popOut(t, T.out), squash: breathe + (inR(t, [T.bump, T.bump + 0.35]) ? 0.15 : 0), gloves: off ? null : { col: '#e8303f', r: punch, l: 0 } })
  }
  function libra(t, C, heat) {
    const [px, py, ps] = track(LIBRA_K, t), m = moodAt(L_MOOD, t), S = toS(C, px, py, ps)
    const off = t >= T.gloves
    const point = inR(t, [T.l7, T.flag2]) ? 0.5 + 0.3 * Math.sin((t - T.l7) * 8) : 0
    const breathe = inR(t, [T.cut2, T.back[0]]) ? 0.06 * Math.sin((t - T.cut2) * 2.4 + 1) : 0
    return cast(x, S.x, S.y, S.s, t, { color: hexMix(LIB.color, '#ff2a2a', heat * 0.7), glyph: LIB.glyph, mood: m.mood, look: m.look, hops: L_HOPS, seed: 7,
      pop: popOut(t, T.out), squash: breathe + (inR(t, [T.bump, T.bump + 0.35]) ? 0.15 : 0), gloves: off ? null : { col: '#3a7bd5', l: point, r: 0 } })
  }
  function ref(t, C) {
    const k = t < T.cut2 ? 1 : t < T.back[0] ? 0 : t < T.cut3 ? pop01(t, T.back[0], 0.35, 2) : t < T.lessonOut[1] ? 0 : pop01(t, T.lessonOut[1], 0.35, 2) * popOut(t, T.out)
    if (k <= 0.01) return null
    const m = moodAt(R_MOOD, t), S = toS(C, REF.x, REF.y, REF.s)
    // the ref steps back for the hug, then returns
    const r = cast(x, S.x, S.y, S.s, t, { color: CAP.color, glyph: CAP.glyph, mood: m.mood, look: m.look, hops: R_HOPS, seed: 11, pop: k })
    const blow = [T.rule1, T.flag1, T.rule2, T.flag2, T.rule3, T.hot, T.ding2].reduce((a, w) => Math.max(a, inR(t, [w - 0.05, w + 0.6]) ? Math.sin(Math.PI * prog(t, w - 0.05, w + 0.6)) : 0), 0)
    drawWhistle(x, r.x - 4 * C.z, r.y + r.size * 0.12, Math.max(3, Math.round(r.size / 46)), { blow })
    return r
  }
  function virgo(t, C) {
    const m = t < T.rule1 ? { mood: 'squint', look: [1, 0] } : { mood: 'neutral', look: [1, 1] }
    const S = toS(C, VIRGO.x, VIRGO.y, VIRGO.s)
    const r = cast(x, S.x, S.y, S.s, t, { color: VIR.color, glyph: null, mood: m.mood, look: m.look, seed: 21, pop: popOut(t, T.out), hops: [T.rule1, T.rule2, T.rule3, T.ding2] })
    // the round card, raised at each rule; the clipboard otherwise
    const card = [[T.rule1, T.cut1 - 0.2, 'RULE 1'], [T.rule2, T.rule3 - 0.1, 'RULE 2'], [T.rule3, T.cut2 - 0.2, 'RULE 3'], [T.back[0], T.cut3 - 0.2, 'ROUND 2']].find(([a, b]) => inR(t, [a, b + 0.3]))
    if (card) drawRoundCard(x, r.x + 60 * C.z, r.top - 50 * C.z, pop01(t, card[0], 0.3, 2.2) * popOut(t, [card[1], card[1] + 0.3]) * C.z, card[2])
    else drawClipboard(x, r.x + r.size * 0.42, r.y + r.size * 0.1, Math.max(3, Math.round(r.size / 40)), { rot: 0.15 })
    return r
  }
  function pisces(t, C) {
    const S = toS(C, PISCES.x, PISCES.y, PISCES.s)
    const big = inR(t, [T.gloves, T.lessonOut[1]]) || t >= T.ding3
    const tears = big ? 3 : inR(t, [T.l5 + 0.6, T.cut1]) ? 2 : inR(t, [T.l15, T.gloves]) ? 2 : 1
    return cast(x, S.x, S.y, S.s, t, { color: PIS.color, glyph: null, mood: big ? 'happy' : 'sparkle', look: [-1, 0], seed: 17, pop: popOut(t, T.out), tears, hops: [T.gloves + 0.1, T.gloves + 0.7, T.ding3] })
  }
  function corners(t, C) {
    const k = segPop(t, T.cut2 + 0.05, T.back[0] + 0.25)
    if (k <= 0.01) return
    drawStool(x, toS(C, 215, 1310).x, toS(C, 215, 1310).y, 1)
    drawStool(x, toS(C, 865, 1310).x, toS(C, 865, 1310).y, 1)
    const St = toS(C, TAURUS.x, TAURUS.y, TAURUS.s), Sc = toS(C, CANCER.x, CANCER.y, CANCER.s)
    const rt = auntie(x, St.x, St.y, St.s, t, { color: TAU.color, glyph: null, mood: 'happy', look: [1, 0], seed: 8, pop: k, glasses: { frame: '#5a2e14', hi: '#ffd98a' } })
    drawFan(x, rt.x + rt.size * 0.55, rt.y - rt.size * 0.05, rt.size * 0.45 * k, -0.2 + 0.45 * Math.sin((t - T.cut2) * 12), clamp(k))
    const rc = auntie(x, Sc.x, Sc.y, Sc.s, t, { color: CAN.color, glyph: null, mood: inR(t, [T.l13, T.l13 + 2]) ? 'wink' : 'happy', look: [-1, 0], seed: 3, pop: k, hops: C_HOPS, glasses: { frame: '#b3203f', hi: '#ffe08a', chain: true } })
    drawBottle(x, rc.x - rc.size * 0.6, rc.y - rc.size * 0.05, 7 * k, -0.5 + 0.1 * Math.sin(t * 3))
  }
  function booth(t, C) {
    const k = segPop(t, T.cut2 + 0.1, T.back[0] + 0.2)
    if (k <= 0.01) return
    const rise = (1 - k) * 260
    x.save(); x.translate(0, rise)
    const Sg = toS(C, GEMINI.x, GEMINI.y, GEMINI.s), Ss = toS(C, SAGG.x, SAGG.y, SAGG.s)
    cast(x, Sg.x, Sg.y, Sg.s, t, { color: GEM.color, glyph: null, mood: inR(t, [T.l11, T.l11 + 2.3]) ? 'wide' : 'happy', look: [1, 0], seed: 5, hops: G_HOPS, headset: '#ff8fb1' })
    cast(x, Ss.x, Ss.y, Ss.s, t, { color: SAG.color, glyph: null, mood: inR(t, [T.l12, T.l12 + 2]) ? 'squint' : 'happy', look: [-1, 0], seed: 9, hops: S_HOPS, headset: '#7fe0ff' })
    const dk = toS(C, 540, 850)
    drawDesk(x, dk.x - 230, dk.x + 230, dk.y, 90)
    drawMic(x, dk.x, dk.y + 4, Math.sin(t * 2) * 0.15 + (inR(t, [T.l12, T.l13]) ? 0.4 : -0.4), 0.8)
    x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillStyle = GOLD; x.fillText('THE BOOTH', dk.x, dk.y + 64)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), heat = heatAt(t)
        if (heat > 0) { x.save(); x.fillStyle = `rgba(255,40,40,${0.12 * heat})`; x.fillRect(0, 0, 1080, 1920); x.restore() }
        drawRing(x, C, t, heat)
        virgo(t, C); pisces(t, C)
        drawThermo(x, t, toS(C, 540, 560).x, toS(C, 540, 560).y, 300 * C.z, heat, segPop(t, T.heat[0] - 0.2, T.cut2) * C.z)
        corners(t, C)
        booth(t, C)
        drawClock(x, t, 540, 560, segPop(t, T.clock[0], T.h4Out[1]))
        const rR = ref(t, C)
        const rA = aries(t, C, heat), rL = libra(t, C, heat)
        drawSteam(x, t, rA, heat, 1); drawSteam(x, t, rL, heat, 2)
        if (heat > 0.6 && t < T.cut2) { drawSweat(x, t, rA.x + rA.size * 0.36, rA.y - rA.size * 0.45, 6, 1); drawSweat(x, t + 0.4, rL.x - rL.size * 0.4, rL.y - rL.size * 0.45, 6, 1) }
        // the flags
        if (rR || t >= T.flag1) {
          const from = rR ? { x: rR.x, y: rR.y - 40 } : { x: 540, y: 1000 }
          if (t < T.cut2) {
            const f1 = flagAt(t, T.flag1, T.flag1Land, from, { x: rA.x + 10, y: rA.top + 16 })
            if (f1 && t < T.l5 + 0.9) drawFlag(x, 9 * C.z, f1.x, f1.y, f1.rot)
            else if (f1 && t < T.l5 + 1.3) { const p = prog(t, T.l5 + 0.9, T.l5 + 1.3); drawFlag(x, 7 * C.z, rA.x - 120 * p, rA.top + 16 + 300 * p * p, 0.25 - p * 2) }
            const f2 = flagAt(t, T.flag2, T.flag2Land, from, { x: rL.x - 10, y: rL.top + 16 })
            if (f2 && t < T.rule3) drawFlag(x, 9 * C.z, f2.x, f2.y, -f2.rot)
          }
        }
        // FOUL! tags over the flagged star
        for (const [t0, r] of [[T.flag1Land, rA], [T.flag2Land, rL]]) {
          const k = pop01(t, t0, 0.3, 2.6) * (1 - ease.inCubic(prog(t, t0 + 1.5, t0 + 1.75)))
          if (t < t0 || k <= 0.01 || t > T.rule3) continue
          x.save(); x.translate(r.x, r.top - 70 * C.z); x.rotate(-0.06); x.scale(k * C.z, k * C.z)
          pixelPanel(x, -110, -40, 220, 80, { P: 6, fill: '#ffd83a', border: INK, glow: 0.2 })
          x.font = `700 46px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d6324d'; x.fillText('FOUL!', 0, 2)
          x.restore()
        }
        drawCakeBubble(x, t, rL.x - 300 * C.z, rL.top - 260 * C.z, pop01(t, T.cake, 0.35, 2.2) * (1 - ease.inCubic(prog(t, T.flag2Land - 0.05, T.flag2Land + 0.12))) * (t < T.rule3 ? 1 : 0))
        if (inR(t, [T.flag2Land - 0.05, T.flag2Land + 0.6])) sparkBurst(x, t, rL.x - 170 * C.z, rL.top - 300 * C.z, T.flag2Land - 0.05, { n: 10, R: 160, size: 22, seed: 4, cols: [BONE, '#ffb3c8'] })
        if (inR(t, [T.flag1Land, T.flag1Land + 0.6])) sparkBurst(x, t, rA.x, rA.top, T.flag1Land, { n: 8, R: 110, size: 18, seed: 6, cols: ['#ffd83a', BONE] })
        if (inR(t, [T.bump, T.bump + 0.7])) sparkBurst(x, t, 540, rA.y - 40, T.bump, { n: 12, R: 220, size: 26, seed: 2, cols: ['#ff5050', '#ffb347', BONE] })
        // gloves off: four gloves fly up and away, spinning
        if (inR(t, [T.gloves, T.gloves + 1.6])) {
          const dt = t - T.gloves
          ;[[rA, -1, '#e8303f', -380], [rA, 1, '#e8303f', 120], [rL, -1, '#3a7bd5', -140], [rL, 1, '#3a7bd5', 400]].forEach(([r, s, col, vx], i) => {
            const gx0 = r.x + s * r.size * 0.47, gy0 = r.y - r.size * 0.12
            drawGloveFree(x, gx0 + vx * dt, gy0 - 1500 * dt + 1500 * dt * dt, Math.round(r.size / 36), dt * (8 + i) * (s), col)
          })
        }
        if (inR(t, [T.hug[1] - 0.1, T.unhug[0]])) drawHearts(x, t, T.hug[1] - 0.1, 540, rA.top + 40, { n: 8, px: 8, spread: 260, life: 1.5 })
        confetti(x, t, T.hug[1] - 0.05, { x0: 540, y0: 1300, n: 70, seed: 3, life: 2.4 })
        drawPushCard(x, t, easeOutBack(prog(t, ...T.card), 1.8) * (1 - ease.inCubic(prog(t, ...T.cardOut))))
        const tk = pop01(t, T.table[0], 0.45, 1.8) * popOut(t, T.out)
        if (t >= T.table[0]) drawTable(x, t, 540 + (1 - ease.outCubic(prog(t, ...T.table))) * 700, toS(C, 540, 1235).y, tk * C.z)
        if (inR(t, [T.ding3, T.ding3 + 0.9])) drawHearts(x, t, T.ding3, 540, 1000, { n: 6, px: 7, spread: 380, life: 1.4 })
      }
      box1.update(t); box2.update(t); box3.update(t)
      lesson.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: every beat change; the default selection keeps 14.4, 28.8 and 43.55 (one per ~14.5 s)
const CUTS = [4.38, { t: T.cut1, kind: 'flip' }, 22.5, { t: T.cut2, kind: 'deal' }, 36.4, { t: T.cut3, kind: 'shuffle' }, 51.95]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const ding = t => [['bell', +t.toFixed(3), 1567.98, 0.05, 1.6, 0], ['bell', +(t + 0.02).toFixed(3), 2349.32, 0.025, 1.2, 0], ['tick', +t.toFixed(3), 0.05]]
export const CUES = [
  // 0 · the hook: gloves bouncing
  ...[0.3, 1.4, 2.5, 3.6].map(t => ['tom', t, 70, { gain: 0.12, decay: 0.2, rev: 0.1 }]),
  ['pop', T.open1, 659.25, 0.04, 0],
  // 1 · rule one
  ...whistleCue(T.rule1), ...ding(T.rule1 + 0.55), ...headCues(T.h1, 3, T.h1Land, 0),
  ...[0, 1, 2, 3].map(i => ['tom', +(T.l3 + 0.1 + i * 0.16).toFixed(3), 110 - i * 8, { gain: 0.1, decay: 0.12 }]),
  ...whistleCue(T.flag1, 0.6), ['whoosh', T.flag1 + 0.1, 0.5, 0.05], ['pop', T.flag1Land, 392, 0.05, -0.3],
  ...wompCue(T.flag1Land + 0.3, 493.88),
  ['bell', T.soften, 1318.51, 0.025, 1.2, 0.3], ['glitter', T.soften, T.soften + 0.5],
  // 2 · rule two
  ...whistleCue(T.rule2), ...ding(T.rule2 + 0.55), ...headCues(T.h2, 3, T.h2Land, 2),
  ['pop', T.cake, 1046.5, 0.04, 0.3], ['bell', T.cake + 0.1, 1567.98, 0.02, 1, 0.3],
  ...whistleCue(T.flag2, 0.5), ...scratchCue(T.flag2 + 0.05), ['pop', T.flag2Land, 330, 0.05, 0.3], ['pop', T.flag2Land + 0.05, 220, 0.04, 0.3],
  // 3 · rule three: heat
  ...whistleCue(T.rule3), ...ding(T.rule3 + 0.55), ...headCues(T.h3, 3, T.h3Land, 4),
  ['swell', T.heat[0], T.hot, { gain: 0.05, f0: 300, f1: 4000, bus: 'drums' }], ...drumrollCue(T.heat[0] + 1.0, T.bump),
  ['boom', T.bump, 0.14], ['crash', T.bump, { gain: 0.06, len: 1.5 }],
  chipCue(T.hot - 0.3, 2400, 0.8, { wave: 'square', duty: 0.5, gain: 0.03, vib: 0.08, slide: 6 }),             // the kettle
  ...whistleCue(T.hot + 0.05, 0.7),
  // 4 · time out
  ...headCues(T.h4, 2, T.h4Land, 1), ['pop', T.open2, 659.25, 0.04, 0],
  ...Array.from({ length: 8 }, (_, i) => ['brush', +(T.cut2 + 0.4 + i * 0.5).toFixed(3), { gain: 0.025, len: 0.18, bus: 'drums' }]),   // the fan
  ['whoosh', T.cool[0] + 1.2, 1.2, 0.02], ['whoosh', T.cool[0] + 3.0, 1.2, 0.02],                                // deep breaths
  ...flutterCue(T.clock[1] - 1.2, 10, 0.12, 0.02), ['bell', T.clock[1], 2093, 0.03, 0.8, 0],
  // 5 · back in
  ...ding(T.ding2), ['whoosh', T.back[0], 0.4, 0.04], ...headCues(T.h5, 2, T.h5Land, 3),
  ['pluck', LT2[4].done, 1318.51, 0.035, 0.6, 0],
  ['whoosh', T.gloves, 0.6, 0.06], ['pop', T.gloves + 0.05, 880, 0.05, -0.4], ['pop', T.gloves + 0.1, 988, 0.05, 0.4],
  ['crash', T.hug[1], { gain: 0.05, len: 2 }], ['swell', T.hug[0], T.hug[1] + 1.4, { gain: 0.05, f0: 800, f1: 5000, bus: 'drums' }], ['glitter', T.hug[1], T.hug[1] + 0.8],
  ['pop', T.hug[1], 523.25, 0.045, -0.3], ['pop', T.hug[1] + 0.05, 659.25, 0.045, 0.3],
  // 6 · lesson unlocked
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 7 · tie-in + last line
  ...headCues(T.h7, 2, T.h7Land, 0), ['whoosh', T.card[0], 0.4, 0.04], ['pop', T.card[1], 784, 0.04, 0], ['bell', T.pushGlow, 1318.51, 0.03, 1.2, 0],
  ['pop', T.open3, 659.25, 0.035, 0],
  ...headCues(T.h8, 2, T.h8Land, 2), ['whoosh', T.table[0], 0.4, 0.04], ['pop', T.table[1], 659.25, 0.04, 0],
  ...ding(T.ding3), ...ding(T.ding3 + 0.45),
  ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue blips
  ...talkCues(LINES1, { cps: CPS, pitch: { [R_TAG]: 587.33, [A_TAG]: 880, [L_TAG]: 1046.5 } }),
  ...talkCues(LINES2, { cps: CPS, pitch: { [G_TAG]: 987.77, [S_TAG]: 783.99, [C_TAG]: 880, [A_TAG]: 880, [L_TAG]: 1046.5 } }),
  ...talkCues(LINES3, { cps: CPS, pitch: { [R_TAG]: 587.33 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
