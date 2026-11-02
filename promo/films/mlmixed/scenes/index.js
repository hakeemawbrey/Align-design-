// mlmixed: MOONLIGHT LANE · Ep 5 · "Mixed Signals" (120 s vertical, promo/films/STARTALK-EPISODES.md; music: synthwave · Am)
// The midpoint of the Libra × Scorpio slow burn. Libra keeps finding pastries in their bag and can't tell if the night
// baker likes them or is just a good baker; Scorpio thinks they're being obvious. The whole episode IS the lane story.
//   0.0–2.0     ◀◀ PREVIOUSLY ON: the last pastry (Ep 1) · Scorpio, slowing down (Ep 2) · a mystery loaf (Ep 4)
//   2.0–7.0     cold open at the flower stall: Libra squints at a croissant. "A *crush…* | or a *croissant?*"
//   7.0–10.0    title card
//  10.0–19.7    Act 1: Scorpio sneaks a bag onto the cart while Libra hums; Libra turns: "…okay WHO is doing this?"
//  19.7–29.6    the café: Scorpio thinks they've been SO obvious ("a heart-shaped bun"); Taurus: "it looked like a potato,
//               hon." Pisces sobs into the tissues.
//  29.6–40.0    the note: "have a good night." Romantic? Or polite? Libra's balance scale (LIKES ME vs GOOD BAKER) wobbles
//               and lands dead level. "perfectly balanced. As always. Ugh."
//  40.0–52.0    Act 2: emergency meeting on Libra's couch: Gemini's chart (it's going up), Aquarius' string board, Leo:
//               "just be a 10. Be mysterious." (hands over sunglasses)
//  52.0–62.0    the standoff: both in sunglasses at night, both looking away, a petal tumbles past; the bag is set down
//               without a word
//  62.0–70.0    low point: night five, Libra alone on the bench; Scorpio in the café window; Pisces weeping upstairs
//  70.0–90.0    THE STARS ADVISE (clear is kind · say one true sentence · you can ask)
//  90.0–99.8    Act 3: shades off, Libra asks… "are these pastries… f—" HONK (a bread van). The moment is lost.
//  99.8–104    next night: the bag says "for you". Progress!
// 104.0–108    LESSON UNLOCKED "*Say* the thing." · chip "+1 PASTRY, LABELED"
// 108.0–111.6  the lane tag: Scorpio finds a flower tucked in the returned bag
// 111.6–115.6  NEXT TIME ON Moonlight Lane… "Leo feels something *green.*"  ·  115.6–120 end card
// One canvas (sets, cast, props), DOM type + boxes + kit pieces, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  loadFonts, drawLane, LANE, standY, drawSign, drawPisces, drawCafe, drawCafeTable, CAFE, drawApartment, APT,
  showBug, buildCaption, captionCues, buildTitle, titleCues, buildPreviously, previouslyCues, buildAdvise, adviseCues,
  buildNextTime, nextTimeCues, drawPastry, drawBubble, sparkles, starFrame, inSprite, pop01, outK, popOut, bump, mixHex, rgba,
  BONE, INK, INTER, MONO, SERIF, ML_GOLD, PINK, r3,
} from './mlkit.js'

export const DURATION = 120
const STORY_END = DURATION - ENDCARD_LEN       // 115.6
const EP = 5

// ── speakers
const who = (sign, name) => { const S = signStar(sign); return { speaker: `${S.glyph}︎ ${name}`, color: mixHex(S.color, '#ffffff', 0.35) } }
const LIB = who('libra', 'LIBRA'), SCO = who('scorpio', 'SCORPIO'), TAU = who('taurus', 'TAURUS')
const GEM = who('gemini', 'GEMINI'), AQU = who('aquarius', 'AQUARIUS'), LEO = who('leo', 'LEO')
const STARS = { speaker: 'THE STARS' }

// ── the timeline
const T = {
  prev: 0, cold: 2, title: 7, a1: 10, cafe: 19.7, note: 29.6, couch: 40, standoff: 52, low: 62, advise: 70,
  a3: 90, next: 99.8, lesson: 104, tag: 108, nextTime: 111.6,
  // act 1a: the drop
  scoOut: 10.3, scoWalk: [10.5, 12.9], bagDrop: 13.15, scoBack: [13.5, 15.2], libTurn: 16.0, libGrab: 16.6,
  // café
  bunUp: 24.3, potato: 26.4, sob: 27.1,
  // the note + the scale
  noteIn: 29.9, noteOut: [33.0, 33.3], scaleIn: 33.2, wobble: [33.5, 36.1], scaleOut: [39.2, 39.6],
  // couch
  chartIn: 42.8, boardIn: 45.4, strings: [45.7, 47.4], leoIn: 48.4, shadesPass: [50.5, 50.95],
  // standoff
  scoOut2: 52.6, scoWalk2: [52.8, 54.6], scoShades: 55.3, petal: [56.4, 59.2], scoSide: [59.3, 59.8], bagDrop2: 59.85, scoBack2: [60.2, 61.8],
  // act 3
  shadesOff: 90.4, walk3: [91.0, 92.6], truck: [93.95, 96.15], honk: [94.12, 94.5], retreat: [98.5, 99.6],
  libIn: 100.3, forYou: 101.25, peek: 102.3,
  tagFlower: 108.6, tagHeart: 109.1,
}
const CUTS = [T.couch, T.advise, T.next]      // cardfx keeps the middle one: 70.0, into THE STARS ADVISE

// ── dialogue (≤ ~46 chars, each held ≥ 1.5 s after it types)
const BOX_Y = 1585, BOX_H = 250, CPS = 28
const L = s => s
const LINES = {
  a1: [
    { t: 10.5, ...STARS, text: 'Moonlight Lane. Midnight. A *pastry* appears.' },
    { t: 13.9, ...STARS, text: 'Every night. Same bag. No *explanation.*' },
    { t: 16.9, ...LIB, text: '…okay, WHO is doing *this?*' },
  ],
  cafe: [
    { t: 20.0, ...SCO, text: "I've been *so* obvious." },
    { t: 22.2, ...TAU, text: 'you put a bun in a bag, hon.' },
    { t: 24.4, ...SCO, text: 'a *heart-shaped* bun.' },
    { t: 26.4, ...TAU, text: 'it looked like a *potato.*' },
  ],
  note: [
    { t: 30.1, ...LIB, text: '“have a good night.” Romantic? Or *polite?*' },
    { t: 33.4, ...STARS, text: 'Libra can weigh *anything.* Except this.' },
    { t: 36.4, ...LIB, text: 'perfectly balanced. As *always.* Ugh.' },
  ],
  couch: [
    { t: 43.0, ...GEM, text: "I made a chart. It's going *up.*" },
    { t: 45.8, ...AQU, text: 'the bun. The note. The *cap.* It’s love.' },
    { t: 48.8, ...LEO, text: 'just be a 10. Be *mysterious.*' },
  ],
  standoff: [
    { t: 55.6, ...STARS, text: 'two people. Both pretending not to *care.*' },
    { t: 59.0, ...STARS, text: "it's going *great.*" },
  ],
  low: [
    { t: 63.8, ...LIB, text: 'being cool is *so* lonely.' },
    { t: 66.3, ...SCO, text: "…they didn't even *look* at me." },
  ],
  a3: [
    { t: 90.3, ...STARS, text: "Tonight's move: *ask.*" },
    { t: 92.9, ...LIB, text: 'hi! Um. Are these pastries… f—' },
    { t: 96.3, ...SCO, text: '…sorry, *what?*' },
    { t: 97.4, ...LIB, text: 'nothing! *Goodnight!*' },
  ],
  next: [
    { t: 101.0, ...LIB, text: 'it says “for *you.*”' },
  ],
}
const BOXES = {
  a1: { open: 10.3, close: 19.55 }, cafe: { open: 19.85, close: 29.45 }, note: { open: 29.9, close: 39.5 },
  couch: { open: 42.85, close: 51.85 }, standoff: { open: 55.4, close: 61.75 }, low: { open: 63.6, close: 69.6 },
  a3: { open: 90.15, close: 99.65 }, next: { open: 100.8, close: 103.85 },
}
const ALL_LINES = Object.values(LINES).flat()
void L

// ── captions
const CAPS = [
  { text: 'A *crush…* | or a *croissant?*', at: 2.15, out: [6.6, 6.9], kicker: 'FLOWER STALL · 11:48 PM' },
  { text: 'Emergency | *meeting.*', at: 40.2, out: [42.5, 42.8], kicker: "LIBRA'S COUCH · 12:30 AM" },
  { text: 'Playing it | *cool.*', at: 52.25, out: [55.0, 55.3], kicker: 'NIGHT 3' },
  { text: 'Night five. | Still *cool.*', at: 62.2, out: [64.9, 65.2], kicker: 'NIGHT 5' },
  { text: 'The *next* bag…', at: 99.95, out: [101.7, 102.0], kicker: 'NEXT NIGHT' },
  { text: '*Progress!*', at: 102.15, out: [103.65, 103.95] },
  { text: 'A *reply.*', at: 108.25, out: [111.1, 111.45], kicker: 'THE CAFÉ · 4:12 AM' },
]

// ── THE STARS ADVISE
const ADVISE = {
  at: T.advise, out: [89.5, 89.95],
  cards: [
    { at: 71.0, icon: 'moon', head: 'Clear is *kind.*', body: 'Mystery is fun for a night. Weeks of guessing is just stressful.' },
    { at: 76.8, icon: 'chat', head: 'Say one *true* sentence.', body: 'Try: “I like talking to you.” Short, true, and enough.' },
    { at: 82.6, icon: 'question', head: 'You can *ask.*', body: '“Are these pastries… for me?” One question beats a month of guessing.' },
  ],
  lines: [
    { t: 71.4, text: 'Libra, Scorpio: this one’s for *both* of you.' },
    { t: 77.3, text: 'guessing isn’t romance. It’s *homework.*' },
    { t: 83.2, text: 'ask the question. Then *listen.*' },
  ],
}
const LESSON = { at: T.lesson, out: [107.6, 107.9], text: '*Say* the thing.', chip: '+1 PASTRY, LABELED' }

// ═══════════════════════════════════════ small helpers ═══════════════════════════════════════
const walkX = (t, [a, b], x0, x1) => lerp(x0, x1, ease.inOutQuad(prog(t, a, b)))
const steps = ([a, b], dt = 0.3) => { const o = []; for (let s = a; s < b - 0.05; s += dt) o.push(r3(s)); return o }
const SEED = { libra: 3, scorpio: 7, taurus: 9, gemini: 4, aquarius: 11, leo: 5, pisces: 12 }
/** a cast member standing with feet on `feet`; returns the sprite frame (for overlays) */
function cast(c, sign, x, feet, size, t, o = {}) {
  const y = standY(size, feet), opts = { seed: SEED[sign] ?? 1, ...o }
  drawSign(c, sign, x, y, size, t, opts)
  const F = starFrame(x, y, size, t, opts)
  if (o.shades && (o.alpha ?? 1) > 0 && (o.pop ?? 1) > 0) drawShades(c, F, o.shades, o.alpha ?? 1)
  return { F, x, y, size, top: F.cy - size * 0.5 }
}

// ═══════════════════════════════════════ props ═══════════════════════════════════════
function R(c, x, y, w, h, col) { c.fillStyle = col; c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)) }
/** pixel sunglasses over the eyes (k: 0…1 pop) */
function drawShades(c, F, k = 1, alpha = 1) {
  if (k <= 0.01) return
  c.save(); c.globalAlpha *= alpha
  inSprite(c, F, () => {
    c.translate(18, 19); c.scale(k, k); c.translate(-18, -19)
    c.fillStyle = INK; c.fillRect(8.4, 16.6, 8.6, 5.2); c.fillRect(19, 16.6, 8.6, 5.2); c.fillRect(16.4, 17.2, 3.2, 1.4)
    c.fillStyle = '#2a1f55'; c.fillRect(9.2, 17.4, 7, 3.6); c.fillRect(19.8, 17.4, 7, 3.6)
    c.fillStyle = '#7fe0ff'; c.fillRect(9.8, 17.8, 1.6, 1); c.fillRect(20.4, 17.8, 1.6, 1)
  })
  c.restore()
}
/** shades on their own (flying, being handed over) */
function drawShadesFree(c, x, y, s, rot = 0, alpha = 1) {
  c.save(); c.globalAlpha *= alpha; c.translate(x, y); c.rotate(rot); c.scale(s, s)
  c.fillStyle = INK; c.fillRect(-10, -3, 9, 6); c.fillRect(1, -3, 9, 6); c.fillRect(-1.5, -2, 3, 1.5)
  c.fillStyle = '#2a1f55'; c.fillRect(-9, -2, 7, 4); c.fillRect(2, -2, 7, 4)
  c.fillStyle = '#7fe0ff'; c.fillRect(-8.4, -1.6, 1.8, 1); c.fillRect(2.6, -1.6, 1.8, 1)
  c.restore()
}
/** the pastry bag (kraft paper, folded top, a little gold sticker) · text: marker writing on the front */
function drawBag(c, cx, cy, s, { text = null, alpha = 1, rot = 0, flower = 0 } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  c.save(); c.globalAlpha *= alpha; c.translate(Math.round(cx), Math.round(cy)); c.rotate(rot); c.scale(s, s)
  if (flower > 0.01) {     // a flower tucked in the top (the lane tag)
    c.save(); c.translate(14, -48); c.scale(flower, flower)
    R(c, -2, -6, 4, 40, '#3f8a5a'); R(c, 2, 4, 10, 4, '#4fae72')
    R(c, -12, -26, 24, 22, INK); R(c, -10, -24, 20, 18, '#ff8fb1'); R(c, -14, -20, 28, 10, INK); R(c, -12, -18, 24, 6, '#ff8fb1'); R(c, -4, -18, 8, 6, ML_GOLD)
    c.restore()
  }
  R(c, -34, -44, 68, 92, INK); R(c, -30, -40, 60, 84, '#c9955a'); R(c, -30, -40, 60, 14, '#a8743e')
  for (let i = 0; i < 6; i++) R(c, -30 + i * 10, -28, 5, 3, '#a8743e')
  R(c, -30, 34, 60, 10, '#b5824a')
  R(c, 14, -20, 10, 10, INK); R(c, 15, -19, 8, 8, ML_GOLD)
  if (text) {
    c.fillStyle = '#2a1430'; c.font = `italic 600 22px ${SERIF}`; c.textAlign = 'center'; c.textBaseline = 'middle'
    c.save(); c.rotate(-0.08); c.fillText(text, -2, 10); c.restore()
    R(c, -18, 22, 30, 2, '#2a1430')
  }
  c.restore()
}
/** a little note card (cream, gold edge, serif writing, a doodled croissant) */
function drawNote(c, cx, cy, w, text, k = 1, rot = -0.05) {
  if (k <= 0.01) return
  const h = w * 0.56
  c.save(); c.translate(cx, cy); c.rotate(rot); c.scale(k, k)
  c.fillStyle = 'rgba(6,4,18,0.45)'; c.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
  R(c, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, INK); R(c, -w / 2, -h / 2, w, h, '#fff6e2'); R(c, -w / 2, -h / 2, w, 10, ML_GOLD)
  c.fillStyle = '#3a2148'; c.font = `italic 600 ${Math.round(w * 0.11)}px ${SERIF}`; c.textAlign = 'center'; c.textBaseline = 'middle'
  c.fillText(text, 0, -h * 0.06)
  drawPastry(c, w * 0.33, h * 0.28, w * 0.009, 'croissant')
  c.fillStyle = '#7a5a8a'; c.font = `italic 500 ${Math.round(w * 0.06)}px ${SERIF}`; c.fillText('—', -w * 0.05, h * 0.28)
  c.restore()
}
/** Libra's balance scale: tilt in radians (+ = right pan down) */
function drawScale(c, cx, cy, s, tilt, k = 1, labels = ['LIKES ME', 'GOOD BAKER']) {
  if (k <= 0.01) return
  c.save(); c.translate(cx, cy); c.scale(s * k, s * k)
  R(c, -6, 0, 12, 170, INK); R(c, -3, 0, 6, 170, ML_GOLD); R(c, -60, 166, 120, 16, INK); R(c, -56, 168, 112, 10, ML_GOLD)
  R(c, -14, -14, 28, 28, INK); R(c, -10, -10, 20, 20, '#fff1c8')
  c.save(); c.rotate(tilt)
  R(c, -230, -6, 460, 12, INK); R(c, -226, -3, 452, 6, ML_GOLD)
  c.restore()
  for (const d of [-1, 1]) {
    const ex = Math.cos(tilt) * 220 * d, ey = Math.sin(tilt) * 220 * d
    c.strokeStyle = INK; c.lineWidth = 4
    c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - 70, ey + 110); c.moveTo(ex, ey); c.lineTo(ex + 70, ey + 110); c.stroke()
    R(c, ex - 90, ey + 106, 180, 20, INK); R(c, ex - 84, ey + 108, 168, 12, '#f2c75c')
    // the label plate on each pan
    c.font = `700 22px ${MONO}`; const tw = c.measureText(labels[d < 0 ? 0 : 1]).width + 22
    R(c, ex - tw / 2 - 4, ey + 44, tw + 8, 46, INK); R(c, ex - tw / 2, ey + 48, tw, 38, d < 0 ? '#ff8fb1' : '#ffd98a')
    c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(labels[d < 0 ? 0 : 1], ex, ey + 68)
    if (d < 0) { R(c, ex - 30, ey + 82, 60, 22, INK); R(c, ex - 26, ey + 85, 18, 16, PINK); R(c, ex + 6, ey + 85, 18, 16, PINK) }
    else drawPastry(c, ex, ey + 94, 3.4, 'bun')
  }
  c.restore()
}
/** Gemini's flip chart: "PASTRIES" bars, an arrow that keeps going up (and off the paper) */
function drawChart(c, x, y, t, k, g) {
  if (k <= 0.01) return
  c.save(); c.translate(x, y); c.scale(k, k)
  R(c, -150, 340, 10, 260, INK); R(c, 140, 340, 10, 260, INK); R(c, -5, 340, 10, 230, INK)
  R(c, -190, -20, 380, 380, INK); R(c, -182, -12, 364, 364, '#fffaf0'); R(c, -190, -32, 380, 20, '#5a4a7a')
  c.fillStyle = INK; c.font = `700 30px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('PASTRIES', 0, 26)
  R(c, -150, 300, 300, 4, INK); R(c, -150, 70, 4, 234, INK)
  const H = [50, 90, 140, 200]
  H.forEach((h, i) => { const hh = h * clamp(g * 1.6 - i * 0.2); R(c, -128 + i * 70, 300 - hh, 46, hh, ['#ff8fb1', '#ffd36e', '#7fe0ff', '#e163d6'][i]) })
  c.font = `700 18px ${MONO}`; ['MON', 'TUE', 'WED', 'THU'].forEach((d, i) => { c.fillStyle = INK; c.fillText(d, -105 + i * 70, 322) })
  // the arrow: up and to the right, then right off the paper
  const a = clamp(g * 1.3 - 0.3)
  if (a > 0) {
    c.strokeStyle = '#e8566e'; c.lineWidth = 10; c.lineCap = 'square'; c.beginPath()
    const pts = [[-130, 260], [-60, 210], [10, 150], [80, 80], [150, -10], [200, -110]]
    const n = (pts.length - 1) * a
    c.moveTo(...pts[0])
    for (let i = 1; i <= Math.ceil(n); i++) { const f = Math.min(1, n - (i - 1)); c.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)) }
    c.stroke()
    if (a >= 1) { R(c, 186, -136, 30, 12, '#e8566e'); R(c, 206, -136, 12, 30, '#e8566e') }
  }
  c.restore()
}
/** Aquarius' theory board: four pinned polaroids, red string wiring up as `g` goes 0 → 1 */
function drawBoard(c, x, y, t, k, g) {
  if (k <= 0.01) return
  c.save(); c.translate(x, y); c.scale(k, k)
  R(c, -200, -150, 400, 300, INK); R(c, -192, -142, 384, 284, '#b07a4a')
  for (let i = 0; i < 40; i++) R(c, -180 + ((i * 97) % 360), -130 + ((i * 53) % 260), 4, 4, '#9a6a3e')
  const P = [[-120, -70, 'bun'], [110, -80, 'note'], [-100, 70, 'cap'], [120, 64, '?']]
  // string first (under the pins)
  const E = [[0, 1], [1, 3], [3, 2], [2, 0], [0, 3]]
  c.strokeStyle = '#e8304a'; c.lineWidth = 4
  E.forEach(([a, b], i) => {
    const f = clamp(g * E.length - i); if (f <= 0) return
    const A = P[a], B = P[b]
    c.beginPath(); c.moveTo(A[0], A[1]); c.lineTo(lerp(A[0], B[0], f), lerp(A[1], B[1], f)); c.stroke()
  })
  P.forEach(([px, py, kind], i) => {
    c.save(); c.translate(px, py); c.rotate([-0.08, 0.06, 0.05, -0.07][i])
    R(c, -54, -50, 108, 100, INK); R(c, -50, -46, 100, 92, '#fffaf0'); R(c, -42, -38, 84, 62, '#2a2050')
    if (kind === 'bun') drawPastry(c, 0, -8, 4, 'bun')
    if (kind === 'note') { R(c, -26, -24, 52, 32, '#fff6e2'); R(c, -18, -12, 36, 3, '#3a2148'); R(c, -18, -4, 24, 3, '#3a2148') }
    if (kind === 'cap') { R(c, -22, -24, 44, 22, '#fffaf0'); R(c, -14, -2, 28, 8, '#e8dcc8') }
    if (kind === '?') { c.fillStyle = ML_GOLD; c.font = `800 52px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('?', 0, -6) }
    R(c, -6, -56, 12, 12, '#e8304a')
    c.restore()
  })
  c.restore()
}
/** the "flower catalog" Libra pretends to read (upside down) */
function drawCatalog(c, x, y, s) {
  c.save(); c.translate(x, y); c.scale(s, s)
  R(c, -50, -36, 100, 72, INK); R(c, -46, -32, 44, 64, '#7dd0b0'); R(c, 2, -32, 44, 64, '#a0e0c8')
  c.save(); c.rotate(Math.PI); c.fillStyle = INK; c.font = `700 11px ${MONO}`; c.textAlign = 'center'; c.fillText('FLOWERS', 24, 4); c.restore()
  R(c, -34, -10, 14, 14, '#ff8fb1'); R(c, -30, 4, 6, 16, '#3f8a5a')
  c.restore()
}
/** a pink flower head rolling like a tumbleweed */
function drawPetal(c, x, y, s, rot) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(s, s)
  for (let i = 0; i < 5; i++) { c.save(); c.rotate(i * Math.PI * 2 / 5); R(c, -8, -26, 16, 22, INK); R(c, -6, -24, 12, 18, '#ff8fb1'); c.restore() }
  R(c, -8, -8, 16, 16, INK); R(c, -6, -6, 12, 12, ML_GOLD)
  c.restore()
}
/** Scorpio's "heart-shaped" bun (it looks like a potato) */
const HEART_BUN = ['...KKK..KKKK...', '..KOOOKKOOOOK..', '.KOOYOOOOOYOOK.', 'KOOOOOOOOOOOOOK', 'KOOYOOOOOOYOOOK', '.KOOOOOOOOOOOK.', '..KOOOOYOOOOK..', '...KOOOOOOOK...', '....KKOOOKK....', '......KKK......']
function drawHeartBun(c, x, y, cell) {
  const pal = { K: '#3a1e14', O: '#d98a3a', Y: '#ffd27a' }
  c.save(); c.translate(Math.round(x - 7.5 * cell), Math.round(y - 5 * cell)); c.scale(cell, cell)
  HEART_BUN.forEach((row, j) => { for (let i = 0; i < row.length; i++) { const col = pal[row[i]]; if (col) { c.fillStyle = col; c.fillRect(i, j, 1.02, 1.02) } } })
  c.restore()
}
/** the bread van (no name, just a loaf on the side) driving right → left in screen space; p 0…1 */
function drawVan(c, p, t) {
  if (p <= 0 || p >= 1) return
  const W0 = 820, x = lerp(1180 + W0 / 2, -W0 / 2 - 120, p), y = 1330
  const shake = Math.sin(t * 50) * 3
  c.save(); c.translate(Math.round(x), Math.round(y + shake))
  R(c, -W0 / 2, -330, W0 - 180, 300, INK); R(c, -W0 / 2 + 8, -322, W0 - 196, 284, '#f3e6d0')
  R(c, -W0 / 2 + 8, -200, W0 - 196, 26, '#e163d6'); R(c, -W0 / 2 + 8, -160, W0 - 196, 10, '#7fe0ff')
  drawPastry(c, -80, -268, 9, 'loaf')
  // cab (front = left)
  R(c, -W0 / 2 - 150, -240, 170, 210, INK); R(c, -W0 / 2 - 142, -232, 154, 194, '#f3e6d0'); R(c, -W0 / 2 - 126, -220, 100, 80, '#2a3a6a'); R(c, -W0 / 2 - 118, -214, 30, 20, '#7fe0ff')
  R(c, -W0 / 2 - 160, -70, 20, 30, '#ffd36e')
  for (const wx of [-W0 / 2 - 60, W0 / 2 - 290]) {
    R(c, wx - 52, -60, 104, 104, INK); R(c, wx - 44, -52, 88, 88, '#3a3550'); c.save(); c.translate(wx, -8); c.rotate(-t * 14); R(c, -12, -36, 24, 72, '#8a85a8'); c.restore()
  }
  // exhaust puffs
  for (let i = 0; i < 3; i++) { const ph = (t * 3 + i / 3) % 1; c.globalAlpha = 0.5 * (1 - ph); R(c, W0 / 2 - 170 + ph * 120, -60 - ph * 60, 30 + ph * 30, 24 + ph * 20, '#c8c4e0') }
  c.restore()
}
function honkText(c, t, t0, x, y, rot) {
  const k = pop01(t, t0, 0.18, 3) * outK(t, [t0 + 0.9, t0 + 1.15])
  if (k <= 0.01) return
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(k, k)
  c.font = `800 92px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'
  c.lineWidth = 16; c.strokeStyle = INK; c.strokeText('HONK!', 0, 0); c.fillStyle = '#ffd36e'; c.fillText('HONK!', 0, 0)
  c.restore()
}
/** music notes floating up from a humming star */
function hum(c, t, x, y, t0, t1) {
  for (let i = 0; i < 4; i++) {
    const ph = ((t * 0.7 + i / 4) % 1)
    if (t < t0 || t > t1) continue
    c.save(); c.globalAlpha = Math.sin(Math.PI * ph); c.translate(x + Math.sin(ph * 6 + i) * 18 + i * 14, y - ph * 120)
    R(c, 0, 0, 14, 12, INK); R(c, 10, -26, 4, 28, INK); R(c, 10, -26, 14, 6, INK); R(c, 2, 2, 10, 8, ML_GOLD)
    c.restore()
  }
}

// ═══════════════════════════════════════ build ═══════════════════════════════════════
async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const caps = CAPS.map(c => buildCaption(root, c))
  const boxes = Object.entries(LINES).map(([k, lines]) => dialogueBox(root, { lines, y: BOX_Y, height: BOX_H, size: 46, cps: CPS, ...BOXES[k] }))
  const adv = buildAdvise(root, ADVISE)
  const lesson = buildLesson(root, { ...LESSON, accentColor: PINK, dim: 0.62 })
  const next = buildNextTime(root, { at: T.nextTime, out: [115.2, 115.55], teaser: 'Leo feels something *green.*' })
  const title = buildTitle(root, { ep: EP, title: 'Mixed Signals', at: T.title, len: 3 })
  const prev = buildPreviously(root, { at: T.prev, len: 2, stills: [
    { caption: 'The last pastry.', scene: c => { drawCafe(c, 5, {}); drawSign(c, 'libra', 330, standY(240, 1400), 240, 5, { mood: 'happy', seed: 3 }); drawSign(c, 'scorpio', 750, standY(240, 1400), 240, 5, { mood: 'happy', seed: 7, blush: 0.9 }); drawCafeTable(c, 5, { cups: 0, pastry: 'croissant' }) }, crop: [60, 820, 960, 1130] },
    { caption: 'Scorpio, slowing down.', scene: c => drawLane(c, 3, { pan: 700 }, g => drawSign(g, 'scorpio', 1240, standY(240), 240, 3, { mood: 'squint', seed: 7 })), crop: [260, 760, 800, 945] },
    { caption: 'A mystery loaf.', scene: c => drawLane(c, 4, { pan: 1080, zoom: 1.5, focus: [540, 1300] }, g => { drawPastry(g, 1860, 1270, 7, 'loaf'); drawSign(g, 'libra', 1960, standY(200), 200, 4, { mood: 'wide', seed: 3, look: [-1, 0.5] }) }), crop: [140, 760, 800, 945] },
  ] })
  const bug = showBug(root, EP)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── scenes (each paints the whole frame)
  function cold(t) {
    drawLane(x, t, { pan: 1180, zoom: 1.25, focus: [540, 1250] }, c => {
      const k = pop01(t, 2.3, 0.35, 2)
      const L0 = cast(c, 'libra', 1850, LANE.feet, 240, t, { mood: t > 4.4 ? 'squint' : 'neutral', look: [-1, -0.6], hops: [2.5, 4.4], pop: k })
      // the croissant, held up to the lamp light like evidence
      const lift = ease.outBack(prog(t, 2.6, 3.0))
      drawPastry(c, 1680 + Math.sin(t * 2) * 3, lerp(1330, 1120, lift), 12, 'croissant')
      drawBag(c, 1990, 1330, 1.1, {})
      if (t > 3.2) sparkles(c, t, 1680, 1120, 3.0, 8, 90, 2)
      drawBubble(c, 1850, L0.top - 60, 'that’s four this week.', { k: pop01(t, 4.5, 0.25, 2.2) * outK(t, [6.6, 6.9]), size: 28 })
    })
  }
  function act1(t) {
    const pan = lerp(520, 1080, ease.inOutCubic(prog(t, 10.6, 12.9)))
    drawLane(x, t, { pan }, c => {
      // Libra at the stall, turned away, humming over the buckets
      const turned = t > T.libTurn
      const lm = t > T.libGrab + 0.3 ? 'squint' : turned ? 'wide' : 'happy'
      cast(c, 'libra', 1960, LANE.feet, 210, t, { mood: lm, look: turned ? [-1, 0.4] : [1, -0.3], hops: [T.libTurn, T.libGrab, 17.1, 17.6] })
      hum(c, t, 2010, 1180, 10.2, T.libTurn - 0.2)
      if (turned && t < T.libTurn + 0.6) drawBubble(c, 1960, 1080, '!', { k: pop01(t, T.libTurn, 0.2, 2.6), size: 44 })
      // Scorpio: out of the café door, tiptoe to the cart, drop, scurry back
      if (t >= T.scoOut && t < T.scoBack[1] + 0.2) {
        let sx = walkX(t, T.scoWalk, LANE.cafeDoor.x, 1780)
        if (t > T.scoBack[0]) sx = walkX(t, T.scoBack, 1780, 900)
        const ok = pop01(t, T.scoOut, 0.3, 2) * outK(t, [T.scoBack[1] - 0.1, T.scoBack[1] + 0.15])
        const S0 = cast(c, 'scorpio', sx, LANE.feet, 190, t, { mood: t > T.bagDrop && t < T.scoBack[0] + 0.2 ? 'wink' : 'squint', look: t > T.scoBack[0] ? [-1, 0] : [1, 0], hops: [...steps(T.scoWalk, 0.28), ...steps(T.scoBack, 0.2)], pop: ok })
        if (t < T.bagDrop) drawBag(c, sx + 100, S0.y + 40, 0.9, {})
      }
      // the bag on the cart
      if (t >= T.bagDrop && t < T.libGrab) drawBag(c, 1800, 1258, 0.9 * pop01(t, T.bagDrop, 0.25, 2.4), {})
      if (t >= T.libGrab) drawBag(c, lerp(1800, 1860, ease.outCubic(prog(t, T.libGrab, T.libGrab + 0.3))), lerp(1258, 1290, ease.outCubic(prog(t, T.libGrab, T.libGrab + 0.3))), 0.95, { rot: 0.05 * Math.sin(t * 3) })
    })
  }
  function cafe(t) {
    drawCafe(x, t, { behind: c => {
      cast(c, 'scorpio', 690, CAFE.counter.y, 220, t, { mood: t > T.potato + 0.1 ? 'wide' : t > T.bunUp ? 'heart' : 'happy', look: [1, 0], blush: t < T.potato ? 0.9 : 0.4, hops: [...talkHops(LINES.cafe, SCO.speaker, { cps: CPS }), T.bunUp] })
    } })
    // Taurus, out front with a tray-side manner
    cast(x, 'taurus', 900, 1330, 210, t, { mood: t > T.potato + 0.8 ? 'happy' : t > 22 ? 'squint' : 'neutral', look: [-1, -0.6], hops: talkHops(LINES.cafe, TAU.speaker, { cps: CPS }) })
    // the heart-shaped bun, held up proudly
    const bk = pop01(t, T.bunUp, 0.35, 2.2)
    if (bk > 0.01) { drawHeartBun(x, 520, 720 - 20 * bk, 12 * bk); sparkles(x, t, 520, 700, T.bunUp + 0.1, 8, 120, 4, [PINK, ML_GOLD, BONE]) }
    if (t > T.potato + 0.2) drawBubble(x, 560, 560, 'it’s a HEART.', { k: pop01(t, T.potato + 1.4, 0.25, 2.2), size: 28 })
    // Pisces at the front table, weeping at the romance of it all
    drawPisces(x, CAFE.seats[0].x, standY(200, CAFE.seats[0].y), 200, t, { tears: t > T.sob ? 3 : 2, pull: bump(t, T.sob, 0.6), mood: 'sparkle', hops: [T.sob, T.sob + 0.5] })
    drawCafeTable(x, t, { cups: 1, pastry: 'bun' })
    if (t > T.sob) drawBubble(x, 330, 1060, '*sob* so romantic', { k: pop01(t, T.sob + 0.1, 0.25, 2.2), size: 26 })
  }
  function note(t) {
    drawLane(x, t, { pan: 1230, zoom: 1.4, focus: [540, 1300] }, c => {
      const wob = prog(t, ...T.wobble)
      const happy = t > T.wobble[1] && t < 36.4
      cast(c, 'libra', 1860, LANE.feet, 210, t, { mood: t > 36.4 ? 'eyeroll' : happy ? 'wide' : 'squint', look: t < T.noteOut[0] ? [-0.5, -1] : [0, -1], hops: [30.1, 33.6, 34.4, 35.2, T.wobble[1]] })
      void wob
    })
    // the note (screen space)
    drawNote(x, 540, 640, 700, 'have a good night.', pop01(t, T.noteIn, 0.35, 2) * outK(t, T.noteOut))
    // the scale: wobbles, then lands exactly level
    const sk = pop01(t, T.scaleIn, 0.4, 2) * outK(t, T.scaleOut)
    const p = prog(t, ...T.wobble)
    const tilt = p >= 1 ? 0 : 0.42 * Math.sin(p * Math.PI * 5.5) * (1 - p) * (1 - p * 0.2)
    drawScale(x, 540, 470, 1.05, tilt, sk)
    if (t > T.wobble[1]) sparkles(x, t, 540, 470, T.wobble[1], 10, 200, 6, [ML_GOLD, BONE])
    if (t > T.wobble[1] + 0.1) { const kk = pop01(t, T.wobble[1] + 0.1, 0.3, 2.4) * outK(t, T.scaleOut); if (kk > 0.01) { x.save(); x.translate(540, 760); x.scale(kk, kk); x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText('= DEAD LEVEL =', 0, 0); x.fillStyle = ML_GOLD; x.fillText('= DEAD LEVEL =', 0, 0); x.restore() } }
  }
  function couch(t) {
    drawApartment(x, t, {})
    const g = prog(t, T.chartIn + 0.2, T.chartIn + 2.4)
    drawChart(x, 790, 470, t, pop01(t, T.chartIn, 0.4, 2), g)
    drawBoard(x, 280, 560, t, pop01(t, T.boardIn, 0.4, 2), prog(t, ...T.strings))
    const FEET2 = 1540
    // on the couch: Libra (middle), Pisces (right)
    const shadesOn = t > T.shadesPass[1]
    cast(x, 'libra', 470, APT.couch.seatY, 210, t, { mood: shadesOn ? 'happy' : t > 48.8 ? 'wide' : 'neutral', look: t < 45.6 ? [1, -0.6] : t < 48.6 ? [-1, -0.6] : [0.5, 0.5], hops: [43.4, 46.0, T.shadesPass[1] + 0.05], shades: shadesOn ? pop01(t, T.shadesPass[1], 0.2, 2.6) : 0 })
    drawPisces(x, 720, standY(170, APT.couch.seatY), 170, t, { tears: t > 46.5 ? 3 : 2, look: [-1, 0], hops: [46.6, 47.1] })
    // the friends
    cast(x, 'gemini', 905, FEET2, 190, t, { mood: 'sparkle', look: [-1, -1], pop: pop01(t, T.chartIn - 0.1, 0.35, 2), hops: talkHops(LINES.couch, GEM.speaker, { cps: CPS }) })
    cast(x, 'aquarius', 150, FEET2, 190, t, { mood: t > 46.4 ? 'wide' : 'neutral', look: [1, -1], pop: pop01(t, T.boardIn - 0.1, 0.35, 2), hops: talkHops(LINES.couch, AQU.speaker, { cps: CPS }) })
    const lk = pop01(t, T.leoIn, 0.35, 2)
    const leoX = lerp(1180, 640, ease.outCubic(prog(t, T.leoIn, T.leoIn + 0.5)))
    if (t > T.leoIn) cast(x, 'leo', leoX, FEET2 + 10, 210, t, { mood: 'wink', look: [-1, 0], pop: lk, hops: [T.leoIn + 0.5, ...talkHops(LINES.couch, LEO.speaker, { cps: CPS })], shades: t < T.shadesPass[0] ? 0 : 0 })
    // Leo produces a pair of sunglasses and passes them to Libra
    if (t > T.leoIn + 0.3 && t < T.shadesPass[1]) {
      const p = ease.inOutCubic(prog(t, ...T.shadesPass))
      drawShadesFree(x, lerp(leoX + 30, 470, p), lerp(1290, 1180, p) - Math.sin(Math.PI * p) * 120, 5.5, p * 6.28)
    }
  }
  function standoff(t) {
    const z = 0.91, pan = 909
    drawLane(x, t, { pan, zoom: z, focus: [540, 1300] }, c => {
      // Libra, "reading" the catalog upside down, shades on, looking anywhere but the café
      const L0 = cast(c, 'libra', 1920, LANE.feet, 200, t, { mood: 'neutral', look: [1, -0.4], shades: 1, hops: [56.0, 60.6], squash: 0 })
      drawCatalog(c, 2030, L0.y + 40, 1.3)
      if (t > 60.4 && t < 61.6) drawBubble(c, 1920, L0.top - 30, '…', { k: pop01(t, 60.45, 0.2, 2.4), size: 34 })
      // Scorpio: out with the bag, sees the shades, puts on their own
      if (t >= T.scoOut2) {
        let sx = walkX(t, T.scoWalk2, LANE.cafeDoor.x, 1430)
        if (t > T.scoSide[0]) sx = walkX(t, T.scoSide, 1430, 1640)
        if (t > T.scoBack2[0]) sx = walkX(t, T.scoBack2, 1640, LANE.cafeDoor.x)
        const ok = pop01(t, T.scoOut2, 0.3, 2) * outK(t, [T.scoBack2[1] - 0.1, T.scoBack2[1] + 0.15])
        const S0 = cast(c, 'scorpio', sx, LANE.feet, 190, t, { mood: t > T.scoShades - 0.6 && t < T.scoShades ? 'wide' : 'neutral', look: t > T.scoShades - 0.6 && t < T.scoShades ? [1, 0] : [-1, -0.5], pop: ok, hops: [...steps(T.scoWalk2, 0.3), T.scoShades, ...steps(T.scoSide, 0.25), ...steps(T.scoBack2, 0.3)], shades: pop01(t, T.scoShades, 0.2, 2.6) })
        if (t < T.bagDrop2) drawBag(c, sx + 95, S0.y + 40, 0.9, {})
      }
      if (t >= T.bagDrop2) drawBag(c, 1745, 1258, 0.9 * pop01(t, T.bagDrop2, 0.25, 2.4), {})
      // the petal tumbles past in the silence
      const pp = prog(t, ...T.petal)
      if (pp > 0 && pp < 1) drawPetal(c, lerp(2080, 1060, pp), 1440 - Math.abs(Math.sin(pp * Math.PI * 4)) * 60, 1.4, -pp * 14)
    })
  }
  function low(t) {
    drawLane(x, t, { time: 'late', pan: 600, lit: ['a4', 'pisces', 'cafe', 'd6'] }, c => {
      // Scorpio in the café window, looking out
      cast(c, 'scorpio', 760, 1312, 120, t, { mood: 'neutral', look: [1, 0.3], alpha: 0.9, hops: talkHops(LINES.low, SCO.speaker, { cps: CPS }) })
      // Pisces upstairs, inconsolable
      drawPisces(c, LANE.pisces.x, LANE.pisces.y + 10, 110, t, { tears: 3, pull: bump(t, 65.0, 0.6) + bump(t, 67.6, 0.6), mood: 'wide', look: [1, 1] })
      // Libra alone on the bench, shades on at midnight, the bag beside them
      cast(c, 'libra', LANE.bench.seats[0] + 30, LANE.bench.seatY, 190, t, { mood: 'neutral', look: [0, 1], shades: 1, squash: 0.06 * bump(t, 64.9, 0.8), hops: talkHops(LINES.low, LIB.speaker, { cps: CPS }) })
      drawBag(c, LANE.bench.seats[1] + 30, 1352, 0.75, {})
    })
  }
  function act3(t) {
    drawLane(x, t, { pan: 909, zoom: 0.91, focus: [540, 1300] }, c => {
      const startled = t > T.honk[0] && t < 98.5
      // Libra: shades off, walks to the middle, asks… then retreats
      let lx = walkX(t, T.walk3, 1860, 1520)
      if (t > T.retreat[0]) lx = walkX(t, T.retreat, 1520, 1880)
      const lm = t > T.retreat[0] ? 'squint' : startled ? 'wide' : t > 92.8 ? 'happy' : 'neutral'
      cast(c, 'libra', lx, LANE.feet, 200, t, { mood: lm, look: t > T.retreat[0] ? [1, 0] : [-1, -0.2], blush: t > 92.8 ? 0.9 : 0, hops: [T.shadesOff, ...steps(T.walk3, 0.3), ...talkHops(LINES.a3, LIB.speaker, { cps: CPS }), T.honk[0] + 0.02, ...steps(T.retreat, 0.22)], shades: 1 - prog(t, T.shadesOff - 0.05, T.shadesOff + 0.1) })
      // Scorpio: out with tonight's bag
      if (t >= 90.8) {
        let sx = walkX(t, T.walk3, LANE.cafeDoor.x, 1210)
        if (t > T.retreat[0]) sx = walkX(t, T.retreat, 1210, LANE.cafeDoor.x)
        const ok = pop01(t, 90.8, 0.3, 2) * outK(t, [T.retreat[1] - 0.05, T.retreat[1] + 0.2])
        const S0 = cast(c, 'scorpio', sx, LANE.feet, 190, t, { mood: startled ? 'wide' : t > 92.9 ? 'sparkle' : 'neutral', look: t > T.retreat[0] ? [-1, 0] : [1, -0.2], blush: t > 92.9 ? 0.7 : 0, pop: ok, hops: [...steps(T.walk3, 0.3), T.honk[0] + 0.05, ...talkHops(LINES.a3, SCO.speaker, { cps: CPS }), ...steps(T.retreat, 0.22)] })
        drawBag(c, sx + 95, S0.y + 40, 0.9, { alpha: ok })
      }
    })
    // the shades fly off
    const sp = prog(t, T.shadesOff, T.shadesOff + 0.8)
    if (sp > 0 && sp < 1) drawShadesFree(x, lerp(1180, 1240, sp), lerp(1240, 900, sp) + sp * sp * 700, 5, sp * 9)
    // HONK
    drawVan(x, prog(t, ...T.truck), t)
    honkText(x, t, T.honk[0], 300, 860, -0.12); honkText(x, t, T.honk[1], 760, 780, 0.1)
  }
  function nextNight(t) {
    drawLane(x, t, { pan: 1230, zoom: 1.4, focus: [540, 1300] }, c => {
      const lk = pop01(t, T.libIn, 0.35, 2)
      cast(c, 'libra', 1900, LANE.feet, 210, t, { mood: t > T.forYou ? 'heart' : 'wide', look: [-1, 0.6], blush: t > T.forYou ? 1 : 0, pop: lk, hops: [T.libIn + 0.3, T.forYou, T.forYou + 0.45, 105.5, 106.8] })
      // Scorpio, peeking round the lamp post
      const pk = ease.outBack(prog(t, T.peek, T.peek + 0.4))
      if (pk > 0.01) cast(c, 'scorpio', lerp(1700, 1660, pk), 1350, 110, t, { mood: 'happy', look: [1, 0], blush: 0.9, alpha: clamp(pk * 2) })
    })
    // the bag, labeled (screen space, big)
    const bk = pop01(t, T.next + 0.25, 0.35, 2)
    drawBag(x, 220, 1170, 3.0 * bk, { text: 'for you', rot: -0.04 })
    sparkles(x, t, 220, 1170, T.forYou, 12, 230, 9, [PINK, ML_GOLD, BONE])
  }
  function tag(t) {
    drawCafe(x, t, { view: 'late', chairsUp: 1, behind: c => {
      cast(c, 'scorpio', 560, CAFE.counter.y, 230, t, { mood: t > T.tagHeart ? 'heart' : 'wide', look: [1, 0.5], blush: t > T.tagHeart ? 1 : 0, hops: [T.tagFlower + 0.1, T.tagHeart, T.tagHeart + 0.4] })
    } })
    drawBag(x, 760, 812, 1.8, { flower: pop01(t, T.tagFlower, 0.35, 2.4) })
    sparkles(x, t, 760, 760, T.tagFlower, 10, 130, 11, [PINK, ML_GOLD, BONE])
    drawPisces(x, CAFE.seats[0].x, standY(190, CAFE.seats[0].y), 190, t, { tears: 3, mood: 'happy', look: [1, -1], hops: [T.tagHeart + 0.1] })
    drawCafeTable(x, t, { cups: 1, pastry: null })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      if (t < T.cold) drawSky(x, t, SKY_H)
      else if (t < T.title) cold(t)
      else if (t < T.a1) drawSky(x, t, SKY_H)
      else if (t < T.cafe) act1(t)
      else if (t < T.note) cafe(t)
      else if (t < T.couch) note(t)
      else if (t < T.standoff) couch(t)
      else if (t < T.low) standoff(t)
      else if (t < T.advise) low(t)
      else if (t < T.a3) { if (t < T.advise + 0.7) low(t); else drawSky(x, t, SKY_H) }
      else if (t < T.next) act3(t)
      else if (t < T.tag) nextNight(t)
      else if (t < T.nextTime) tag(t)
      else drawSky(x, t, SKY_H)
      for (const c of caps) c.update(t)
      for (const b of boxes) b.update(t)
      adv.update(t); lesson.update(t); next.update(t); title.update(t); prev.update(t)
      bug.update(t, title.on(t) || prev.on(t) || t >= STORY_END ? 0 : 1)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const footsteps = (rng0, gain = 0.014) => rng0.map((s, i) => ['tick', s, gain * (i % 2 ? 0.8 : 1)])
export const CUES = [
  ...previouslyCues(T.prev, 3, 2),
  ...titleCues(T.title, 3),
  ...CAPS.flatMap(c => captionCues(c)),
  ...talkCues(ALL_LINES, { cps: CPS }),
  // cold open: the croissant held up
  ['whoosh', 2.6, 0.3, 0.03], ['bell', 3.0, 1760, 0.02, 0.9, 0.3], ['pop', 4.5, 880, 0.03, 0.3],
  // act 1: the sneaky drop
  ['pop', T.scoOut, 659.25, 0.03, -0.3], ...footsteps(steps(T.scoWalk, 0.28)), ['pluck', T.bagDrop, 987.77, 0.035, 0.3, 0.3],
  ...footsteps(steps(T.scoBack, 0.2), 0.012), ['pop', T.libTurn, 1318.51, 0.045, 0.3], ['pop', T.libTurn + 0.06, 1567.98, 0.03, 0.3], ['tick', T.libGrab, 0.04],
  // café: the bun, the potato, the sob
  ['pop', T.bunUp, 1174.66, 0.045, -0.1], ['glitter', T.bunUp + 0.1, T.bunUp + 0.6], ['pluck', T.potato + 1.0, 330, 0.035, 0.4, 0.1],
  ['pop', T.sob, 739.99, 0.03, -0.4], ['pop', T.sob + 0.5, 659.25, 0.03, -0.4],
  // the note + the scale
  ['whoosh', T.noteIn, 0.35, 0.035], ['pluck', T.noteIn + 0.25, 1174.66, 0.03, 0.6, 0],
  ['whoosh', T.scaleIn, 0.4, 0.035], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.wobble[0] + i * (T.wobble[1] - T.wobble[0]) / 5.5), 0.04 * (1 - i * 0.12)]),
  ['bell', T.wobble[1], 1760, 0.03, 1.2, 0], ['glitter', T.wobble[1], T.wobble[1] + 0.5],
  // couch: chart, string, sunglasses
  ['whoosh', T.chartIn, 0.35, 0.035], ['riser', T.chartIn + 0.2, T.chartIn + 2.4, 0.025],
  ['whoosh', T.boardIn, 0.35, 0.035], ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T.strings[0] + i * 0.34), NOTE[(i * 2) % 7] / 2, 0.03, 0.25, -0.3]),
  ['pop', T.leoIn, 880, 0.035, 0.4], ['whoosh', T.shadesPass[0], 0.3, 0.03], ['pop', T.shadesPass[1], 1318.51, 0.04, 0], ['bell', T.shadesPass[1] + 0.05, 2349.32, 0.015, 0.5, 0],
  // standoff
  ['pop', T.scoOut2, 659.25, 0.03, -0.3], ...footsteps(steps(T.scoWalk2, 0.3)), ['pop', T.scoShades, 1318.51, 0.04, 0], ['bell', T.scoShades + 0.05, 2349.32, 0.015, 0.5, 0],
  ['whoosh', T.petal[0], 2.6, 0.02], ['pluck', T.bagDrop2, 987.77, 0.03, 0.3, 0.3], ...footsteps(steps(T.scoBack2, 0.3), 0.012),
  // low point
  ['pop', 65.0, 587.33, 0.02, -0.4], ['pop', 67.6, 587.33, 0.02, -0.4],
  // advise
  ...adviseCues(ADVISE),
  // act 3: shades off, walk, HONK
  ['whoosh', T.shadesOff, 0.4, 0.035], ['pop', T.shadesOff, 1174.66, 0.03, 0.3], ...footsteps(steps(T.walk3, 0.3)),
  ['whoosh', T.truck[0], 2.2, 0.05], ['boom', T.truck[0] + 0.1, 0.12],
  ['brass', T.honk[0], [349.23, 440], 0.28, { gain: 0.06, bright: 1.6 }], ['brass', T.honk[1], [349.23, 440], 0.36, { gain: 0.06, bright: 1.6 }],
  ...footsteps(steps(T.retreat, 0.22), 0.012),
  // next night: for you
  ['pop', T.libIn, 880, 0.035, 0.3], ['pop', T.forYou, 1174.66, 0.05, 0], ['pluck', T.forYou + 0.05, 1567.98, 0.04, 0.8, 0], ['glitter', T.forYou, T.forYou + 0.6],
  ['pop', T.peek, 739.99, 0.025, -0.3],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Am' }),
  // the tag: a flower in the bag
  ['pop', T.tagFlower, 1318.51, 0.045, 0.3], ['glitter', T.tagFlower, T.tagFlower + 0.5], ['pluck', T.tagHeart, 1174.66, 0.04, 0.6, 0],
  ...nextTimeCues(T.nextTime),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
