// stcartoon — "Saturday Morning Stars." (45 s vertical Align ad, Star Talk "Wild Lessons" #7, music: chiptune · C, an 80s
// cartoon). Story 0–40.6, then the shared end card.
//    0.0–7.4    THE THEME SONG. A cartoon starburst spins up behind the logo "Saturday Morning *Stars!*". A bouncing-ball
//               sing-along runs along the bottom ("♪ Sat-ur-day mor-ning STARS! ♪" · "♪ one does ALL the little things! ♪")
//               over a chiptune theme, while the roll call pops in on coloured swoosh bands: ♌ LEO as YOUR STAR · ♍ VIRGO
//               as THE PARTNER · ♓ PISCES as HERSELF (crying). Group pose, "da-da!".
//    7.45       card cut (deal) into the TITLE CARD: "Today's episode Nº 47: The Week Nobody *Noticed.*" Virgo tiptoes
//               across the bottom with a mug. Nobody notices.
//    9.3–20.1   THE WEEK, on a floating cloud home. Leo admires itself in a hand mirror the whole time (running gag); Virgo
//               does the little things; a chalkboard keeps score: "THANKED THIS WEEK".
//                 Monday: she made the *coffee*. Virgo pours, slides the mug over. LEO: "thank you, *coffee.*" (hugs the mug)
//                 Wednesday: she saved the last *slice*. A sticky note "SAVED 4 U ♥". LEO: "thank you, *fridge.*" (hugs it)
//                 Friday: she remembered the *dentist*. Virgo circles Friday; Leo's phone buzzes. LEO: "aww. my phone
//                 *loves* me." (kisses the phone). The board adds VIRGO ✗; Virgo's glow dims with a little "…".
//               Pisces sobs harder each day (*sob* · *SOB* · *SOB!!*).
//   20.15       card cut (flip): THE TAPE. THE STARS swoop in: "hold up. let's *rewind* that." VHS rewind: the whole week
//               plays backwards (◀◀ REWIND, tracking lines, a red marker ring on Virgo: "SHE DID THAT"). ▶ PLAY.
//               LEO, double-take: "wait. it was *you?* all week?" VIRGO (shy bubble): "just little stuff."
//               LEO: "it's not little. *thank you.*" Virgo's glow floods back (level-up), the board flips to VIRGO ✓✓✓,
//               Leo hands her its crown. Pisces bawls.
//   29.1–30.6   THE MORAL SEGMENT. The starburst returns, Leo spins to camera: "And remember, | *kids…*" (wink)
//   30.6        ★ LESSON UNLOCKED: "Notice the little things. | Say *thank you.*" (+1 GRATITUDE)
//   34.9        card cut (deal): "Tonight's *deck.*" Three cards deal in. THE STARS: "new deck. every night. *you're
//               welcome.*" LEO + VIRGO: "THANK YOU!!" (the stars blush: they learned it too).
//   38.4–40.55  "Same star time, | *next week!*" Everyone waves; Pisces sobs; a cartoon iris closes on Leo's wink.
// One canvas (sky + set + cast), DOM type + dialogue boxes + the shared lesson, an iris layer, grain. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { bitmap, drawBubble, drawTear, drawSweat, drawPixelHeart, drawCrown, drawTissue, drawMug, drawPot, drawTable, drawMirror,
  drawFridge, drawPhone, drawCalendar, drawPencil, drawCloudFloor, drawBurst, drawBoardPanel } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#e8344e', INK = '#1b1236', MINT = '#7dffb0', SKYBLUE = '#7fd0f0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const GLYPH = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'C'

const LEO = signStar('leo'), VIR = signStar('virgo'), PIS = signStar('pisces')
const LEO_T = '#ffb347', VIR_T = '#9fe3a0'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the theme song
  h0: 0.12, h0Land: BEAT(1), h0Out: [7.12, 7.32],
  roll: { leo: 1.0, vir: 2.6, pis: 4.2, grp: 5.85 }, rollOut: [7.12, 7.4],
  lyrA: [1.45, 4.42], lyrB: [4.42, 7.25], tag: [7.0, 7.14],
  cut1: 7.45,
  // the title card
  h1: 7.52, h1Land: 7.95, tiptoe: [7.55, 9.3], h1Out: [9.1, 9.3],
  // the week
  setIn: [9.25, 9.6],
  h2: 9.45, h2Land: 9.8, mugIn: 9.6, pour: [9.95, 10.75], potOut: 10.95, turn1: 11.0, l1: 11.25, hug1: [12.05, 12.6], h2Out: [12.7, 12.88], tableOut: [12.7, 12.9],
  h3: 12.92, h3Land: 13.3, fridgeIn: [12.9, 13.2], virOpen: [13.35, 13.6], slice: 13.75, virClose: [13.95, 14.15], leoOpen: [14.3, 14.5], l2: 14.6, hug2: [15.4, 16.0], h3Out: [16.25, 16.45], fridgeOut: [16.25, 16.5],
  h4: 16.5, h4Land: 16.9, calIn: [16.5, 16.8], write: [16.8, 17.25], buzz: 17.3, l3: 17.6, kiss: 18.75, sigh: 19.15, h4Out: [19.92, 20.1], calOut: [19.9, 20.1], close1: 20.1,
  cut2: 20.15,
  // the tape
  starsIn: [20.2, 20.6], h5: 20.22, h5Land: 20.6, l4: 20.65, rew: [21.45, 23.35], h5Out: [23.2, 23.38],
  h6: 23.42, h6Land: 23.8, l5: 23.45, shy: [25.0, 26.3], h6Out: [26.15, 26.32],
  h7: 26.35, h7Land: 26.7, l6: 26.35, glow: BEAT(49), crown: [28.1, 28.6], close2: 29.05, h7Out: [28.9, 29.05],
  // the moral
  strike: [29.05, 29.32], toCenter: [29.1, 29.45], spin: [29.28, 29.6], h8: 29.15, h8Land: 29.55, wink: 29.7, h8Out: [30.42, 30.58],
  lesson: BEAT(54), lessonOut: [34.7, 34.9],
  cut4: 34.9,
  // tonight's deck
  h9: 34.95, h9Land: 35.3, deal: [35.1, 35.45, 35.8], flip: [36.2, 36.55], l7: 35.1, shout: [37.0, 38.15], blush: 37.3, close3: 38.38, deckOut: [38.05, 38.35], h9Out: [38.1, 38.3],
  // the last line
  h10: 38.4, h10Land: 38.75, iris: [39.95, 40.55],
}
const SOB = [12.15, 15.5, 18.85]
const ROWS = [[12.1, 'COFFEE', 'check'], [15.45, 'FRIDGE', 'check'], [18.8, 'PHONE', 'heart'], [19.35, 'VIRGO', 'x']]

// ── the lines
const SL = `${LEO.glyph}︎ LEO`, SS = 'THE STARS'
const LINES1 = [
  { t: T.l1, speaker: SL, color: LEO_T, text: 'thank you, *coffee.*' },
  { t: T.l2, speaker: SL, color: LEO_T, text: 'thank you, *fridge.*' },
  { t: T.l3, speaker: SL, color: LEO_T, text: 'aww. my phone *loves* me.' },
]
const LINES2 = [
  { t: T.l4, speaker: SS, color: GOLD, text: "hold up. let's *rewind* that." },
  { t: T.l5, speaker: SL, color: LEO_T, text: 'wait. it was *you?* all week?' },
  { t: T.l6, speaker: SL, color: LEO_T, text: "it's not little. *thank you.*" },
]
const LINES3 = [{ t: T.l7, speaker: SS, color: GOLD, text: "new deck. every night. *you're welcome.*" }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })
const HOPS = {
  leo: [...talkHops(LINES1, SL, { cps: CPS }), ...talkHops(LINES2, SL, { cps: CPS })],
  stars: [...talkHops(LINES2, SS, { cps: CPS }), ...talkHops(LINES3, SS, { cps: CPS })],
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Notice the little things. | Say *thank you.*', chip: '+1 GRATITUDE', accentColor: GOLD, dim: 0.62 }

// the theme song: syllables on the beat grid (one beat = BL), sung with a bouncing ball
const E8 = BL / 2
const LYR_A = [['Sat', BEAT(2)], ['ur', BEAT(2) + E8], ['day', BEAT(3)], [' mor', BEAT(4)], ['ning', BEAT(4) + E8], [' STARS!', BEAT(5)]]
const LYR_B = [['one', BEAT(7)], [' does', BEAT(7) + E8], [' ALL', BEAT(8)], [' the', BEAT(9)], [' lit', BEAT(9) + E8], ['tle', BEAT(10)], [' things!', BEAT(10) + E8]]

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const mv = (t, [a, b], P0, P1, arc = 0) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(P0[0], P1[0], e), lerp(P0[1], P1[1], e) - Math.sin(Math.PI * p) * arc, lerp(P0[2], P1[2], e)] }

// ── where things are
const ROLL_P = [540, 1000, 340]
const GRP = { leo: [290, 1060, 250], vir: [548, 1075, 225], pis: [800, 1085, 200] }
const FLOOR_Y = 1320
const LEO_H = [330, 1185, 270], VIR_H = [800, 1200, 230], PIS_W = [92, 1240, 120]
const BOARD = { x: 686, y: 468, w: 350, h: 318 }
const PROP_X = 565
const CAL = { x: 520, y: 900 }
const STARS_P = [190, 650, 160]
const MORAL = { leo: [540, 1125, 330], vir: [880, 1262, 180], pis: [140, 1300, 140] }
const TIE = { leo: [250, 1250, 220], vir: [478, 1268, 190], stars: [850, 1180, 190], pis: [985, 1335, 110] }
const DECK = [{ x: 292, y: 742, r: -0.1 }, { x: 540, y: 716, r: 0 }, { x: 788, y: 742, r: 0.1 }], CARD_W = 214
const SEED = { leo: 5, vir: 3, pis: 23, stars: 9 }

// ── the week's moods, keyed by "week time" (so the VHS rewind can replay them)
const LEO_WK = [
  [0, S_('sparkle', [-1, -1], { mirror: 1 })],
  [T.turn1, S_('wide', [1, 0], { blink: false })], [T.l1, S_('heart', [1, 0])], [T.hug1[1] + 0.1, S_('happy', [0, 0])],
  [T.h3, S_('sparkle', [-1, -1], { mirror: 1 })], [T.leoOpen[0], S_('wide', [1, 0], { blink: false })], [T.leoOpen[1] + 0.05, S_('heart', [1, 0])], [T.hug2[1] + 0.1, S_('happy', [0, 0])],
  [T.h4, S_('sparkle', [-1, -1], { mirror: 1 })], [T.buzz, S_('wide', [1, -1], { blink: false, phone: 1 })], [T.l3, S_('heart', [1, -1], { phone: 1 })], [T.kiss + 0.6, S_('happy', [0, 0], { phone: 1 })],
]
const VIR_WK = [
  [0, S_('happy', [-1, 1])], [T.pour[1], S_('sparkle', [-1, 0])], [T.l1 + 0.55, S_('neutral', [-1, 0], { blink: 0.45 })], [T.hug1[1], S_('neutral', [0, 0], { blink: 0.45, sweat: 1 })],
  [T.h3, S_('happy', [-1, 0])], [T.virClose[1], S_('sparkle', [-1, 0])], [T.l2 + 0.55, S_('neutral', [-1, 0], { blink: 0.45 })], [T.hug2[0], S_('neutral', [0, 0], { blink: 0.5, sweat: 1 })],
  [T.h4, S_('squint', [-1, -1])], [T.write[1] + 0.1, S_('sparkle', [-1, 0])], [T.l3 + 0.6, S_('neutral', [-1, 0], { blink: 0.45 })],
  [T.sigh, S_('neutral', [0, 1], { blink: 0.55, sq: 0.08, dy: 10, dim: 1 })],
]
// Virgo's place in the week
function virWeekP(te) {
  let P = VIR_H
  if (te < T.h3) {
    if (te >= T.pour[0] - 0.3 && te < T.pour[1] + 0.3) P = mv(te, [T.pour[0] - 0.3, T.pour[0]], VIR_H, [735, 1010, 230], 30)
    if (te >= T.pour[1]) P = mv(te, [T.pour[1], T.pour[1] + 0.3], [735, 1010, 230], VIR_H, 20)
  } else if (te < T.h4) {
    if (te < T.virClose[1]) P = mv(te, [T.h3 + 0.1, T.virOpen[0]], VIR_H, [745, 1200, 230], 40)
    else P = mv(te, [T.virClose[1], T.virClose[1] + 0.3], [745, 1200, 230], VIR_H, 30)
  } else {
    if (te < T.write[1] + 0.05) P = mv(te, [T.h4 + 0.05, T.write[0]], VIR_H, [720, 1000, 220], 30)
    else P = mv(te, [T.write[1] + 0.05, T.write[1] + 0.4], [720, 1000, 220], VIR_H, 20)
  }
  return P
}
function leoWeekP(te) {
  let P = LEO_H
  if (te < T.h3) { if (te >= T.hug1[0] - 0.2) P = mv(te, [T.hug1[0] - 0.2, T.hug1[0]], LEO_H, [412, 1185, 270], 30); if (te >= T.hug1[1]) P = mv(te, [T.hug1[1], T.hug1[1] + 0.3], [412, 1185, 270], LEO_H, 20) }
  else if (te < T.h4) { if (te >= T.leoOpen[0] - 0.2) P = mv(te, [T.leoOpen[0] - 0.2, T.leoOpen[0]], LEO_H, [372, 1185, 270], 26); if (te >= T.hug2[1]) P = mv(te, [T.hug2[1], T.hug2[1] + 0.3], [372, 1185, 270], LEO_H, 20) }
  return P
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "600 32px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 440), FACE = bake(faceIm, 600)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Saturday Morning | *Stars!*', { top: 168, size: 104, accentSize: 190, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: GOLD })
  const H1 = popText(root, 'The Week Nobody | *Noticed.*', { top: 792, size: 92, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.07, accentColor: PINK })
  const H2 = popText(root, 'Monday: | she made the *coffee.*', { top: 172, size: 92, accentSize: 132, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.06, accentColor: GOLD })
  const H3 = popText(root, 'Wednesday: | she saved the *last slice.*', { top: 172, size: 88, accentSize: 120, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, gap: 0.06, accentColor: GOLD, fit: true })
  const H4 = popText(root, 'Friday: | she remembered | the *dentist.*', { top: 150, size: 84, accentSize: 120, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, gap: 0.06, accentColor: GOLD })
  const H5 = popText(root, 'Hold up. | Roll the *tape.*', { top: 172, size: 104, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, gap: 0.07, accentColor: RED })
  const H6 = popText(root, 'Every little thing | was *her.*', { top: 172, size: 96, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, gap: 0.07, accentColor: VIR_T })
  const H7 = popText(root, 'Two little *words.*', { top: 200, size: 104, accentSize: 156, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const H8 = popText(root, 'And remember, | *kids…*', { top: 172, size: 110, accentSize: 190, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const H9 = popText(root, 'Tonight’s *deck.*', { top: 196, size: 116, accentSize: 170, at: T.h9, late: 1, lateAt: T.h9Land, wobble: true, accentColor: LAV })
  const H10 = popText(root, 'Same star time, | *next week!*', { top: 172, size: 104, accentSize: 168, at: T.h10, late: 2, lateAt: T.h10Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out], [H9, T.h9Out], [H10, [40.2, 40.42]]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1478, width: 960, height: 290, open: T.l4 - 0.24, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: 1478, width: 960, height: 290, open: T.l7 - 0.24, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const irisC = layerCanvas(root, { pointerEvents: 'none' }), ix = irisC.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── little helpers drawn on the canvas
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 46, ticks = true } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
    if (ticks) {
      const w = x.measureText(text).width / 2 + size * 0.3, q = prog(k, 0, 0.3)
      x.fillStyle = color; x.globalAlpha *= 1 - q
      for (const [dx, dy, a] of [[-w, -size * 0.45, -0.6], [w, -size * 0.45, 0.6], [-w - 6, size * 0.25, -2.6], [w + 6, size * 0.25, 2.6]]) {
        x.save(); x.translate(dx * (1 + 0.2 * q), dy); x.rotate(a); x.fillRect(-3, -size * 0.28, 6, size * 0.32); x.restore()
      }
    }
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, R, seed, life = 0.7, cols = [GOLD, BONE, PINK, LAV], sz = 30) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p) * 0.8, sz * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (110 + ((k * 37) % 5) * 24) * spread * size / 200, vy = -(150 + ((k * 53) % 4) * 36) * size / 200
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }
  /** a steady trickle (between the big sobs) */
  function trickle(r, t) {
    const px = Math.max(3, r.size / 40)
    for (const side of [-1, 1]) { const ph = ((t * 0.9) + (side > 0 ? 0.5 : 0)) % 1; x.save(); x.globalAlpha *= 1 - ph * 0.6; drawTear(x, r.x + side * r.size * 0.13, r.y + r.size * 0.1 + ph * r.size * 0.25, px); x.restore() }
  }
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0, sx = 1, glow = 0.9 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = { leo: LEO, vir: VIR, pis: PIS }[id]
    x.save()
    if (rot || sx !== 1) { x.translate(px0, py0 + sz * 0.4); x.rotate(rot); x.scale(sx, 1); x.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : col.color, glyph: glyph && sz >= 120 && id !== 'stars' ? col.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: st.glow ?? glow, blush: st.blush, bob: sz * 0.03, alpha })
    x.restore()
    return { ...r, c: r.size / 36 }
  }
  const crownOn = (r, rot = -0.12) => drawCrown(x, r.x + r.c * 0.6, r.top + r.c * 3.6, Math.max(3, r.c * 0.95), rot)
  function label(text, cx, cy, { size = 26, bg = RED, fg = '#fff1ea', rot = 0, k = 1 } = {}) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.font = `700 ${size}px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    const w = x.measureText(text).width + size * 1.2, h = size * 1.8
    x.fillStyle = '#1a1030'; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = fg; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 2, 2)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
  }

  // ═══════════════════════ 1 · the theme song ═══════════════════════
  const BANDS = { leo: [LEO.color, '#ffe08a'], vir: [VIR.color, '#d9ffd0'], pis: [PIS.color, '#cfe6ff'] }
  function band(t, t0, t1, cols, dir) {
    const pin = prog(t, t0, t0 + 0.28), pout = prog(t, t1 - 0.05, t1 + 0.2)
    if (pin <= 0 || pout >= 1) return
    const off = (1 - ease.outCubic(pin)) * -1500 * dir + ease.inCubic(pout) * 1500 * dir
    x.save(); x.translate(540 + off, 1010); x.rotate(-0.16 * dir)
    x.fillStyle = 'rgba(10,6,24,0.5)'; x.fillRect(-1000, -250, 2000, 520)
    x.fillStyle = cols[0]; x.globalAlpha = 0.85; x.fillRect(-1000, -240, 2000, 480)
    x.globalAlpha = 0.5; x.fillStyle = cols[1]; x.fillRect(-1000, -240, 2000, 34); x.fillRect(-1000, 206, 2000, 34)
    // speed stripes
    x.globalAlpha = 0.35; x.fillStyle = '#ffffff'
    for (let k = 0; k < 6; k++) { const sx = ((k * 331 + (t - t0) * 2600 * dir) % 2400) - 1200; x.fillRect(sx, -170 + k * 62, 260, 10) }
    x.restore()
  }
  function plate(t, t0, t1, name, nameCol, role, extra = null) {
    const k = pop01(t, t0 + 0.12, 0.3, 2.2) * (1 - ease.inCubic(prog(t, t1 - 0.05, t1 + 0.12)))
    if (k <= 0.02) return
    x.save(); x.translate(540, 1300); x.scale(k, k); x.rotate(-0.03)
    const w = 640, h = 170
    x.fillStyle = '#1a1030'; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    x.fillStyle = '#fbf3e2'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = nameCol; x.fillRect(-w / 2, -h / 2, w, 10)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `800 68px ${INTER}`; x.fillStyle = '#2a1846'
    const glyph = name.split(' ')[0], word = name.slice(glyph.length + 1)
    x.font = `800 68px ${INTER}`; const ww = x.measureText(word).width
    x.font = `700 60px ${GLYPH}`; x.fillStyle = nameCol; x.fillText(glyph + '︎', -ww / 2 - 22, -26)
    x.font = `800 68px ${INTER}`; x.fillStyle = '#2a1846'; x.fillText(word, 22, -24)
    x.font = `italic 500 50px ${SERIF}`; x.fillStyle = '#5a3a7a'; x.fillText(role, 0, 44)
    x.restore()
    if (extra) label(extra, 790, 1218, { size: 26, bg: '#3a7bd5', rot: 0.12, k: pop01(t, t0 + 0.75, 0.3, 2.6) * (1 - ease.inCubic(prog(t, t1 - 0.05, t1 + 0.12))) })
  }
  function drawTheme(t) {
    if (t >= T.rollOut[1] + 0.05) return
    const o = 1 - ease.inCubic(prog(t, ...T.rollOut))
    // the starburst, spinning up
    drawBurst(x, 540, 1000, t, 0.16 * clamp(t / 0.6) * o, { spin: 0.18 + 0.1 * clamp(t / 2) })
    const R = T.roll
    band(t, R.leo, R.vir, BANDS.leo, 1); band(t, R.vir, R.pis, BANDS.vir, -1); band(t, R.pis, R.grp, BANDS.pis, 1)
    // the solo roll call
    const solo = [['leo', R.leo, R.vir], ['vir', R.vir, R.pis], ['pis', R.pis, R.grp]]
    for (const [id, a, b] of solo) {
      if (t < a || t >= b + 0.2) continue
      const k = pop01(t, a + 0.08, 0.34, 2.2) * (1 - ease.inCubic(prog(t, b - 0.05, b + 0.15)))
      const st = id === 'leo' ? S_('wink', [0, 0]) : id === 'vir' ? S_('happy', [0, 0]) : S_('sparkle', [0, -1])
      const hops = [a + 0.42, a + 0.42 + BL, a + 0.42 + 2 * BL]
      const r = star(id, ROLL_P, t, st, { pop: k, hops })
      if (!r) continue
      if (id === 'leo') { crownOn(r, -0.18); drawMirror(x, r.x - r.size * 0.5, r.y + r.size * 0.12, Math.max(4, r.c * 0.8), -0.5) }
      if (id === 'vir') drawMug(x, r.x - r.size * 0.52, r.y + r.size * 0.14, Math.max(4, r.c * 0.75), t)
      if (id === 'pis') { drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, Math.max(4, r.c * 0.9), t); tears(r.x, r.y, r.size, t, a + 0.3, b, { gap: 0.08 }) }
    }
    plate(t, R.leo, R.vir, `${LEO.glyph} LEO`, '#e8851a', 'as Your Star')
    plate(t, R.vir, R.pis, `${VIR.glyph} VIRGO`, '#2f9a4c', 'as The Partner')
    plate(t, R.pis, R.grp, `${PIS.glyph} PISCES`, '#3a7bd5', 'as Herself', '(CRYING)')
    // the group pose
    if (t >= R.grp) {
      const order = ['leo', 'vir', 'pis']
      order.forEach((id, i) => {
        const k = pop01(t, R.grp + 0.05 + i * 0.08, 0.34, 2.4) * o
        const st = id === 'leo' ? S_('happy', [0, 0]) : id === 'vir' ? S_('happy', [0, 0]) : S_('sparkle', [0, -1])
        const r = star(id, GRP[id], t, st, { pop: k, hops: [R.grp + 0.4 + i * 0.05, T.tag[0], T.tag[1] + 0.1] })
        if (!r) return
        if (id === 'leo') crownOn(r, -0.18)
        if (id === 'vir') drawMug(x, r.x - r.size * 0.52, r.y + r.size * 0.14, Math.max(4, r.c * 0.75), t)
        if (id === 'pis') { drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, Math.max(4, r.c * 0.9), t); tears(r.x, r.y, r.size, t, R.grp + 0.3, T.rollOut[0], { gap: 0.08 }) }
      })
      sparkleRing(t, 540, 1060, T.tag[0], 14, 380, 0.4, 0.7)
    }
    // the bouncing-ball sing-along
    drawLyrics(t, LYR_A, T.lyrA, 0); drawLyrics(t, LYR_B, T.lyrB, 1)
  }
  function drawLyrics(t, syl, [a, b], idx) {
    if (t < a - 0.1 || t >= b + 0.2) return
    const k = pop01(t, a - 0.1, 0.25, 2) * (1 - ease.inCubic(prog(t, b - 0.02, b + 0.18)))
    if (k <= 0.02) return
    const y = 1640, size = 56
    x.save(); x.translate(540, y); x.scale(k, k); x.translate(-540, -y)
    // the strip
    x.fillStyle = 'rgba(10,6,24,0.78)'; x.fillRect(40, y - 78, 1000, 132)
    x.fillStyle = GOLD; x.fillRect(40, y - 78, 1000, 5); x.fillRect(40, y + 49, 1000, 5)
    x.font = `800 ${size}px ${INTER}`
    const parts = [['♪ ', -1], ...syl.map(([s, ts]) => [s, ts]), [' ♪', -1]]
    const widths = parts.map(([s]) => x.measureText(s).width), total = widths.reduce((p, c) => p + c, 0)
    const fit = Math.min(1, 940 / total)
    x.save(); x.translate(540, y); x.scale(fit, fit)
    let cx = -total / 2
    x.textAlign = 'left'; x.textBaseline = 'middle'
    const centers = []
    parts.forEach(([s, ts], i) => {
      const sung = ts >= 0 && t >= ts
      x.lineJoin = 'round'; x.lineWidth = 9; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(s, cx, 0)
      x.fillStyle = ts < 0 ? LAV : sung ? GOLD : BONE
      x.fillText(s, cx, 0)
      if (ts >= 0) centers.push([cx + widths[i] / 2 + (s.startsWith(' ') ? x.measureText(' ').width / 2 : 0), ts])
      cx += widths[i]
    })
    // the ball: a gold pixel star hopping syllable to syllable
    let bx = centers[0][0], by = -70
    for (let i = 0; i < centers.length; i++) {
      const [c0, t0] = centers[i], nxt = centers[i + 1]
      if (t < t0) { if (i === 0) { const p = prog(t, a, t0); bx = lerp(centers[0][0] - 120, c0, p); by = -70 - Math.sin(Math.PI * p) * 60 } break }
      if (!nxt) { bx = c0; by = -70 - Math.abs(Math.sin((t - t0) * 6)) * 10; break }
      if (t < nxt[1]) { const p = prog(t, t0, nxt[1]); bx = lerp(c0, nxt[0], p); by = -70 - Math.sin(Math.PI * p) * 52; break }
    }
    drawPixelStar(x, bx, by, 40, 2, GOLD)
    x.restore()
    x.restore()
    void idx
  }

  // ═══════════════════════ 2 · the title card ═══════════════════════
  function drawTitle(t) {
    if (t < T.cut1 - 0.02 || t >= T.h1Out[1] + 0.1) return
    const k = pop01(t, T.cut1 - 0.02, 0.35, 1.8) * (1 - ease.inCubic(prog(t, T.h1Out[0], T.h1Out[1] + 0.05)))
    drawBurst(x, 540, 920, t, 0.12 * k, { cols: ['#c9a6ff', '#ff8fb1'], spin: 0.12, n: 22 })
    x.save(); x.translate(540, 900); x.scale(k, k)
    const w = 940, h = 560
    x.fillStyle = 'rgba(8,4,20,0.55)'; x.fillRect(-w / 2 + 14, -h / 2 + 18, w, h)
    x.fillStyle = '#1a1030'; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
    x.fillStyle = GOLD; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
    x.fillStyle = '#1a1030'; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#3a1d86'); g.addColorStop(1, '#1d1150')
    x.fillStyle = g; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
    // corner stars
    for (const [cx, cy] of [[-w / 2 + 48, -h / 2 + 48], [w / 2 - 48, -h / 2 + 48], [-w / 2 + 48, h / 2 - 48], [w / 2 - 48, h / 2 - 48]]) drawPixelStar(x, cx, cy, 30, 2, GOLD)
    x.font = `700 30px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '6px'
    x.fillText('TODAY’S EPISODE · Nº 47', 0, -h / 2 + 90)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = 'rgba(242,199,92,0.5)'; x.fillRect(-180, -h / 2 + 122, 360, 4)
    x.restore()
    // Virgo tiptoes across the bottom with a mug. Nobody notices.
    const p = prog(t, ...T.tiptoe)
    if (p > 0 && p < 1) {
      const vx = lerp(-120, 1200, p), step = Math.abs(Math.sin(p * Math.PI * 9))
      const r = star('vir', [vx, 1330 - step * 22, 150], t, S_('happy', [1, 0]), { hops: [] })
      if (r) drawMug(x, r.x + r.size * 0.5, r.y + r.size * 0.12, 4, t)
      ;[0.18, 0.42, 0.66].forEach((q, i) => ono('tip', lerp(-120, 1200, q), 1200, t, lerp(T.tiptoe[0], T.tiptoe[1], q), { size: 30, color: 'rgba(239,230,214,0.85)', life: 0.7, rise: 20, ticks: false, rot: i % 2 ? 0.1 : -0.1 }))
    }
  }

  // ═══════════════════════ 3 · the week (drawn at "week time" te, so the tape can rewind it) ═══════════════════════
  function weekTime(t) {
    if (inW(t, ...T.rew)) { const p = prog(t, ...T.rew); return lerp(19.95, 9.7, ease.inOutQuad(p)) }
    return t
  }
  const rewinding = t => inW(t, ...T.rew)
  function setK(t) {
    // the set (floor + board) is up from setIn to the moral strike
    return easeOutBack(prog(t, ...T.setIn), 1.6) * (1 - ease.inCubic(prog(t, ...T.strike)))
  }
  function drawBoard(t, te, k) {
    if (k <= 0.02) return
    const { x: bx, y: by, w, h } = BOARD
    x.save(); x.translate(bx + w / 2, by + h); x.scale(k, k); x.translate(-(bx + w / 2), -(by + h))
    drawBoardPanel(x, bx, by, w, h, 6)
    x.font = `700 23px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.9)'; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '2px'
    x.fillText('THANKED THIS WEEK', bx + w / 2, by + 42)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(bx + 30, by + 62, w - 60, 3)
    const fixed = !rewinding(t) && t >= T.glow
    ROWS.forEach(([t0, name, kind], i) => {
      if (te < t0) return
      const rk = pop01(te, t0, 0.3, 2.6)
      const ry = by + 104 + i * 54
      x.save(); x.translate(bx + 40, ry); x.scale(rk, rk)
      x.font = `800 38px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      const isV = kind === 'x'
      x.fillStyle = isV ? (fixed ? GOLD : '#ff9aa8') : BONE
      x.fillText(name, 0, 2)
      // the mark
      const mx = 210
      if (kind === 'check' || kind === 'heart') bitmap(x, ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: MINT }, mx, -16, 5)
      if (kind === 'heart') drawPixelHeart(x, mx + 62, -2, 4)
      if (isV && !fixed) {
        const wob = te < t0 + 0.5 ? Math.sin((te - t0) * 30) * 3 : 0
        bitmap(x, ['R...R', '.R.R.', '..R..', '.R.R.', 'R...R'], { R: '#ff4a5e' }, mx + wob, -14, 6)
      }
      if (isV && fixed) {
        for (let j = 0; j < 3; j++) { const jk = pop01(t, T.glow + 0.1 + j * 0.12, 0.25, 2.8); if (jk > 0) { x.save(); x.translate(mx + 16 + j * 38, 2); x.scale(jk, jk); bitmap(x, ['......G', '.....GG', 'G...GG.', 'GG.GG..', '.GGG...', '..G....'], { G: GOLD }, -18, -16, 5); x.restore() } }
      }
      x.restore()
    })
    x.restore()
  }
  function drawWeekProps(t, te) {
    // Monday: the table + the mug (+ the pot in Virgo's hand, drawn with Virgo)
    if (te >= T.mugIn && te < T.tableOut[1]) {
      const k = pop01(te, T.mugIn - 0.1, 0.3, 1.8) * (1 - ease.inCubic(prog(te, ...T.tableOut)))
      x.save(); x.translate(PROP_X, FLOOR_Y); x.scale(k, k); x.translate(-PROP_X, -FLOOR_Y)
      drawTable(x, PROP_X, FLOOR_Y - 13 * 9, 9)
      const fillK = prog(te, T.pour[0] + 0.2, T.pour[1] - 0.1)
      // the mug slides toward Leo after the pour
      const slide = ease.inOutCubic(prog(te, T.pour[1] + 0.05, T.pour[1] + 0.35))
      drawMug(x, PROP_X + 20 - slide * 60, FLOOR_Y - 13 * 9, 7, t, { steam: fillK, fill: fillK > 0.2 ? 1 : 0 })
      x.restore()
      if (te >= T.l1 && te < T.hug1[1]) { const hk = bump(te, T.hug1[0], 0.6); if (hk > 0) drawPixelHeart(x, PROP_X - 20, FLOOR_Y - 230 - hk * 40, 6) }
    }
    // Wednesday: the fridge
    if (te >= T.fridgeIn[0] && te < T.fridgeOut[1]) {
      const k = easeOutBack(prog(te, ...T.fridgeIn), 1.8) * (1 - ease.inCubic(prog(te, ...T.fridgeOut)))
      let open = 0
      if (te < T.virClose[1]) open = ease.outCubic(prog(te, ...T.virOpen)) * (1 - ease.inCubic(prog(te, ...T.virClose)))
      else open = ease.outBack(prog(te, ...T.leoOpen))
      const sq = te >= T.hug2[0] && te < T.hug2[1] ? 0.06 * Math.sin(Math.PI * prog(te, ...T.hug2)) : 0
      x.save(); x.translate(PROP_X + 40, FLOOR_Y); x.scale(k * (1 - sq), k * (1 + sq * 0.5)); x.translate(-(PROP_X + 40), -FLOOR_Y)
      drawFridge(x, PROP_X + 40, FLOOR_Y, 6, clamp(open), t, { slice: te >= T.slice })
      x.restore()
      if (te >= T.slice && te < T.slice + 0.6) sparkleRing(t, PROP_X + 40, FLOOR_Y - 150, T.slice + (t - te), 8, 90, 0.2, 0.6)
      if (te >= T.hug2[0] && te < T.hug2[1] + 0.3) { const hk = bump(te, T.hug2[0], 0.8); if (hk > 0) { drawPixelHeart(x, PROP_X - 30, FLOOR_Y - 360 - hk * 50, 6); drawPixelHeart(x, PROP_X + 90, FLOOR_Y - 330 - hk * 30, 5) } }
    }
    // Friday: the calendar
    if (te >= T.calIn[0] && te < T.calOut[1]) {
      const k = easeOutBack(prog(te, ...T.calIn), 1.8) * (1 - ease.inCubic(prog(te, ...T.calOut)))
      x.save(); x.translate(CAL.x, CAL.y); x.scale(k, k); x.rotate(-0.04); x.translate(-CAL.x, -CAL.y)
      drawCalendar(x, CAL.x, CAL.y, 6, prog(te, ...T.write))
      x.restore()
    }
  }
  function drawWeekCast(t, te) {
    const live = te === t
    // ── Pisces (left, small, always crying)
    {
      const k = setK(t)
      const r = star('pis', PIS_W, t, SOB.some(s => inW(te, s, s + 0.9)) ? S_('sparkle', [1, -1], { sq: -0.05 }) : S_('sparkle', [1, -1]), { pop: k, hops: SOB.map(s => s + 0.02) })
      if (r) {
        drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, 3, t)
        let crying = false
        SOB.forEach((s, i) => { if (inW(te, s, s + 0.9 + i * 0.3)) { crying = true; tears(r.x, r.y, r.size, te, s, s + 0.6 + i * 0.3, { gap: 0.07, spread: 0.7 + i * 0.25 }) } })
        if (!crying) trickle(r, t)
        ;['*sob*', '*SOB*', '*SOB!!*'].forEach((s, i) => { if (live) ono(s, r.x + 40, r.top - 40, t, SOB[i], { size: 34 + i * 8, color: '#bfe6ff', life: 0.95, rise: 30 }) })
      }
    }
    // ── Virgo
    {
      const P = virWeekP(te)
      const st = keyed(te, VIR_WK)
      const hops = [T.pour[1] + 0.1, T.virClose[1] + 0.1, T.write[1] + 0.12, T.l1 + 0.6, T.l2 + 0.6]
      const r = star('vir', P, t, { ...st, glow: st.dim ? lerp(0.9, 0.25, prog(te, T.sigh, T.sigh + 0.5)) : 0.9 }, { pop: setK(t), hops })
      if (r) {
        // the pot (Monday): in Virgo's left hand, tipping over the mug
        if (te >= T.h2 && te < T.potOut) {
          const tilt = ease.inOutCubic(prog(te, T.pour[0], T.pour[0] + 0.25)) * (1 - ease.inOutCubic(prog(te, T.pour[1] - 0.2, T.pour[1])))
          const gx = r.x - r.size * 0.42, gy = r.y + r.size * 0.02
          const pk = 1 - prog(te, T.potOut - 0.15, T.potOut)
          x.save(); x.globalAlpha *= pk; drawPot(x, gx, gy, 6, tilt * 0.9); x.restore()
          if (tilt > 0.6) { x.fillStyle = '#7a4220'; x.fillRect(PROP_X + 22, gy - 4, 8, FLOOR_Y - 13 * 9 - 60 - gy + 4) }
        }
        // the pencil (Friday): circling Friday on the calendar
        if (te >= T.h4 + 0.1 && te < T.write[1] + 0.3) {
          const fx = CAL.x - 102 + 4.5 * 204 / 7, fy = CAL.y - 90 + 16.8 * 6
          const a = -1.9 + Math.PI * 2.15 * prog(te, ...T.write)
          const tx = fx + Math.cos(a) * 26, ty = fy + Math.sin(a) * 24
          drawPencil(x, tx, ty, 5, -2.3)
        }
        if (st.sweat) drawSweat(x, r.x + r.size * 0.36, r.top + r.size * 0.32 + ((t * 0.7) % 1) * 16, 4)
        // the sigh: a little "…" bubble
        if (te >= T.sigh + 0.1) {
          const bk = pop01(te, T.sigh + 0.1, 0.3, 2.2) * (live ? 1 - ease.inCubic(prog(t, T.cut2 - 0.15, T.cut2)) : 1)
          if (bk > 0.02) {
            x.save(); x.translate(r.x - 40, r.top - 40); x.scale(bk, bk)
            drawBubble(x, -80, -80, 160, 70, { tail: 'down', tailX: 110, px: 5 })
            x.fillStyle = '#2a1846'; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('…', 0, -52)
            x.restore()
          }
        }
      }
    }
    // ── Leo
    {
      const P = leoWeekP(te)
      const st = keyed(te, LEO_WK)
      const hops = [...HOPS.leo.filter(h => h < T.close1), T.hug1[0], T.hug1[0] + 0.3, T.leoOpen[1], T.hug2[0], T.kiss]
      let sq = st.sq || 0
      if (inW(te, ...T.hug1)) sq += 0.1 * Math.sin(Math.PI * prog(te, ...T.hug1))
      if (inW(te, ...T.hug2)) sq += 0.14 * Math.sin(Math.PI * prog(te, ...T.hug2))
      const r = star('leo', P, t, { ...st, sq }, { pop: setK(t), hops })
      if (r) {
        crownOn(r)
        // the mirror: Leo admiring itself while the little things happen
        if (st.mirror) drawMirror(x, r.x - r.size * 0.44, r.y + r.size * 0.16, 6, -0.35 + 0.05 * Math.sin(t * 3))
        if (st.phone) {
          const nk = prog(te, T.buzz, T.buzz + 0.25)
          const kissK = bump(te, T.kiss - 0.1, 0.35)
          drawPhone(x, r.x + r.size * 0.52 - kissK * 24, r.y - r.size * 0.12, 8, 0.16, { notif: nk, t: te < T.buzz + 1.2 ? t : 99 })
          if (te >= T.kiss) { const hk = te - T.kiss; if (hk < 1.0) { x.save(); x.globalAlpha *= 1 - prog(hk, 0.6, 1); drawPixelHeart(x, r.x + r.size * 0.5, r.y - r.size * 0.35 - hk * 90, 7); x.restore() } }
          if (live) ono('*mwah*', r.x + r.size * 0.62, r.top - 10, t, T.kiss, { size: 40, color: PINK, life: 0.9, rise: 30 })
        }
      }
    }
  }

  // ═══════════════════════ 4 · the tape (live, after Friday) ═══════════════════════
  const LEO_LIVE = [
    [T.cut2, S_('neutral', [-1, -1])], [T.l4 + 0.5, S_('squint', [-1, -1])],
    [T.rew[1], S_('neutral', [0, 0], { blink: false })], [T.rew[1] + 0.25, S_('wide', [1, 0], { blink: false, sq: -0.06 })],
    [T.l5 + 1.0, S_('wide', [1, 0])], [T.shy[0], S_('sparkle', [1, 0])], [T.l6, S_('sparkle', [1, 0])],
    [T.glow, S_('happy', [1, 0])], [T.crown[1] + 0.2, S_('happy', [0, 0])],
  ]
  const VIR_LIVE = [
    [T.cut2, S_('neutral', [0, 1], { blink: 0.55, sq: 0.08, dy: 10, dim: 1 })],
    [T.rew[1] + 0.35, S_('neutral', [-1, 0], { blink: 0.4, sq: 0.05, dy: 6, dim: 1 })],
    [T.shy[0], S_('happy', [0, 1], { dim: 1, blush: 1 })], [T.l6 + 0.4, S_('wide', [-1, 0], { blink: false, dim: 1 })],
    [T.glow, S_('sparkle', [-1, 0], { sq: -0.08 })], [T.glow + 0.4, S_('sparkle', [0, -1])], [T.crown[1], S_('happy', [0, 0])],
  ]
  function leoLiveP(t) {
    let P = LEO_H
    if (t >= T.l6) P = mv(t, [T.l6, T.l6 + 0.4], LEO_H, [430, 1185, 270], 30)
    return P
  }
  function drawLive(t) {
    // Pisces
    const k = setK(t)
    {
      const r = star('pis', PIS_W, t, S_('sparkle', [1, -1]), { pop: k, hops: [T.glow + 0.1, T.glow + 0.5] })
      if (r) { drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, 3, t); if (t >= T.glow) tears(r.x, r.y, r.size, t, T.glow, T.strike[0], { gap: 0.06, spread: 1.1 }); else trickle(r, t); ono('*WAAAH*', r.x + 70, r.top - 50, t, T.glow + 0.15, { size: 40, color: '#bfe6ff', life: 1.1, rise: 30 }) }
    }
    // Virgo
    let vr = null
    {
      const st = keyed(t, VIR_LIVE)
      const glow = st.dim ? 0.25 : lerp(0.25, 1.4, ease.outCubic(prog(t, T.glow, T.glow + 0.4))) - 0.4 * ease.inOutQuad(prog(t, T.glow + 1, T.glow + 2))
      vr = star('vir', VIR_H, t, { ...st, glow }, { pop: k, hops: [T.rew[1] + 0.35, T.glow + 0.02, T.glow + 0.5, T.crown[1] + 0.05] })
      if (vr) {
        if (inW(t, ...T.shy)) {
          const bk = pop01(t, T.shy[0], 0.3, 2.2) * (1 - ease.inCubic(prog(t, T.shy[1] - 0.15, T.shy[1])))
          x.save(); x.translate(vr.x - 10, vr.top - 46); x.scale(bk, bk)
          drawBubble(x, -190, -100, 380, 86, { tail: 'down', tailX: 200, px: 5 })
          x.fillStyle = '#2f7a44'; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('just little stuff.', 0, -57)
          x.restore()
        }
        if (t >= T.crown[1]) crownOn(vr, 0.16)
        sparkleRing(t, vr.x, vr.y, T.glow, 14, 200, 0.3, 0.8, [GOLD, MINT, BONE, PINK], 34)
        sparkleRing(t, vr.x, vr.y, T.glow + 0.35, 10, 260, 1.1, 0.7, [GOLD, MINT, BONE], 26)
      }
    }
    // Leo
    {
      const st = keyed(t, LEO_LIVE)
      const P = leoLiveP(t)
      const r = star('leo', P, t, st, { pop: k, hops: [...HOPS.leo.filter(h => h > T.cut2), T.rew[1] + 0.25, T.glow + 0.05, T.crown[0]] })
      if (r) {
        // the crown: on Leo until it flies over to Virgo
        if (t < T.crown[0]) crownOn(r)
        else if (t < T.crown[1] && vr) {
          const p = prog(t, ...T.crown), e = ease.inOutCubic(p)
          const ax = r.x + r.c * 0.6, ay = r.top + r.c * 3.6, bx = vr.x + vr.c * 0.6, by = vr.top + vr.c * 3.6
          drawCrown(x, lerp(ax, bx, e), lerp(ay, by, e) - Math.sin(Math.PI * p) * 140, Math.max(3, lerp(r.c, vr.c, e) * 0.95), lerp(-0.12, 0.16, e) + p * Math.PI * 2)
        }
        // the double-take: a sweat drop + "!?"
        if (inW(t, T.rew[1] + 0.25, T.shy[0])) drawSweat(x, r.x + r.size * 0.38, r.top + r.size * 0.3 + ((t * 0.7) % 1) * 16, 5)
        ono('!?', r.x + r.size * 0.3, r.top - 20, t, T.rew[1] + 0.25, { size: 64, color: GOLD, life: 0.9, rise: 26 })
      }
    }
  }
  function drawStars(t) {
    if (t < T.starsIn[0] || t >= T.strike[1]) return
    let P = STARS_P
    if (t < T.starsIn[1]) { const p = prog(t, ...T.starsIn), e = ease.outCubic(p); P = [lerp(-150, STARS_P[0], e), lerp(300, STARS_P[1], e), STARS_P[2]] }
    let st = S_('neutral', [1, 1], { blink: 0.45 })
    if (t >= T.l4) st = S_('squint', [1, 1])
    if (rewinding(t)) st = S_('squint', [1, 1])
    if (t >= T.rew[1]) st = S_('neutral', [1, 1], { blink: 0.4 })
    if (t >= T.glow) st = S_('happy', [1, 1])
    if (t >= T.glow + 0.8) st = S_('sparkle', [1, 1])
    const k = popOut(t, T.strike)
    const r = star('stars', P, t, st, { pop: k, hops: [...HOPS.stars.filter(h => h < T.close2), T.starsIn[1], T.glow + 0.1] })
    if (!r) return
    if (t < T.starsIn[1] + 0.3) sparkleRing(t, r.x, r.y, T.starsIn[1] - 0.1, 10, 120, 0.3, 0.6)
    if (inW(t, T.starsIn[0], T.starsIn[1])) for (let i = 1; i <= 4; i++) { const tt = Math.max(T.starsIn[0], t - i * 0.05), p = prog(tt, ...T.starsIn), e = ease.outCubic(p); drawPixelStar(x, lerp(-150, STARS_P[0], e) - 30, lerp(300, STARS_P[1], e) - 20, 30 - i * 5, i % 2, GOLD) }
  }
  /** the VHS rewind overlay (screen space, over the canvas, under the DOM type) */
  function drawVHS(t, te) {
    const inK = prog(t, T.rew[0] - 0.12, T.rew[0]), outKk = 1 - prog(t, T.rew[1], T.rew[1] + 0.15)
    const k = Math.min(inK, outKk)
    if (k <= 0) return
    // tint
    x.save(); x.globalAlpha = 0.22 * k; x.fillStyle = '#3a6bff'; x.globalCompositeOperation = 'color'; x.fillRect(0, 0, W, 1920); x.restore()
    x.save(); x.globalAlpha = 0.12 * k; x.fillStyle = '#7fd0f0'; x.fillRect(0, 0, W, 1920); x.restore()
    // scanlines
    x.save(); x.globalAlpha = 0.18 * k; x.fillStyle = '#05040c'
    for (let y = 0; y < 1920; y += 6) x.fillRect(0, y, W, 2)
    x.restore()
    // tracking tears: bright noisy bands rolling up
    const r = rng(Math.floor(t * 24))
    x.save(); x.globalAlpha = 0.5 * k
    for (let b = 0; b < 3; b++) {
      const by = ((1 - ((t * (0.9 + b * 0.37)) % 1)) * 2200) - 140
      for (let i = 0; i < 26; i++) { x.fillStyle = r() > 0.5 ? 'rgba(255,255,255,0.7)' : 'rgba(190,220,255,0.5)'; x.fillRect(r() * W, by + r() * 40, 20 + r() * 120, 3) }
    }
    x.restore()
    // the HUD: ◀◀ REWIND (blinking) + the day it's at
    const blink = Math.floor(t * 3) % 2 === 0
    x.save(); x.font = `700 54px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = 'rgba(5,4,12,0.85)'
    const hy = 1392
    if (blink) { x.strokeText('◀◀ REWIND', 70, hy); x.fillStyle = '#ffffff'; x.fillText('◀◀ REWIND', 70, hy) }
    const day = te < T.h3 ? 'MON' : te < T.h4 ? 'WED' : 'FRI'
    const hh = 8 + Math.floor(((te * 7.3) % 12)), mm = Math.floor((te * 97) % 60)
    x.font = `700 40px ${MONO}`
    const tc = `${day} ${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')} AM`
    x.textAlign = 'right'; x.strokeText(tc, 1010, hy); x.fillStyle = '#ffffff'; x.fillText(tc, 1010, hy)
    x.restore()
    // the marker ring on Virgo
    const P = virWeekP(te)
    const rr = P[2] * 0.72 + 8 * Math.sin(t * 14)
    x.save(); x.globalAlpha = k; x.strokeStyle = '#ff2e4f'; x.lineWidth = 10; x.lineCap = 'round'
    x.beginPath(); x.ellipse(P[0], P[1] + 6, rr, rr * 0.9, -0.1, 0, Math.PI * 2); x.stroke(); x.restore()
    label('SHE DID THAT', clamp(P[0], 230, 850), P[1] - P[2] * 0.72 - 64, { size: 30, bg: '#ff2e4f', rot: -0.05, k: k })
  }
  /** a quick "▶ PLAY" flash when the tape stops */
  function drawPlay(t) {
    const k = t - T.rew[1]
    if (k < 0 || k > 0.7) return
    x.save(); x.globalAlpha = 1 - prog(k, 0.45, 0.7)
    x.font = `700 54px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 10; x.strokeStyle = 'rgba(5,4,12,0.85)'
    x.strokeText('▶ PLAY', 70, 1392); x.fillStyle = MINT; x.fillText('▶ PLAY', 70, 1392)
    x.restore()
  }

  // ═══════════════════════ 5 · the moral segment ═══════════════════════
  function drawMoral(t) {
    if (t < T.strike[0] || t >= T.cut4) return
    const bk = ease.outCubic(prog(t, T.strike[0], T.strike[0] + 0.4))
    drawBurst(x, 540, 1080, t, 0.2 * bk, { cols: ['#ffd23f', '#ff6fb5', '#7fd0f0'], n: 24, spin: 0.35 })
    // Pisces, bottom left, still going
    {
      const P = mv(t, T.toCenter, PIS_W, MORAL.pis, 30)
      const r = star('pis', P, t, S_('sparkle', [1, -1]), { hops: [T.wink] })
      if (r) { drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, 4, t); tears(r.x, r.y, r.size, t, T.strike[0], T.cut4, { gap: 0.09, spread: 0.9 }) }
    }
    // Virgo, crowned, glowing
    {
      const P = mv(t, T.toCenter, VIR_H, MORAL.vir, 30)
      const r = star('vir', P, t, S_('happy', [-1, 0]), { hops: [T.wink + 0.05] })
      if (r) crownOn(r, 0.16)
    }
    // Leo spins to camera
    {
      const P = mv(t, T.toCenter, [430, 1185, 270], MORAL.leo, 60)
      const sp = prog(t, ...T.spin), sx = Math.cos(sp * Math.PI * 2) || 0.02
      const st = t < T.wink ? S_('happy', [0, 0]) : t < T.wink + 0.5 ? S_('wink', [0, 0]) : S_('happy', [0, 0])
      const r = star('leo', P, t, st, { hops: [T.toCenter[1], T.wink], sx: Math.abs(sx) < 0.05 ? 0.05 : sx })
      if (r) {
        if (t >= T.wink && t < T.wink + 0.7) sparkleRing(t, r.x + r.size * 0.18, r.y - r.size * 0.1, T.wink, 6, 60, 0.5, 0.55, [BONE, GOLD], 26)
        ono('*ding!*', r.x + r.size * 0.4, r.top - 10, t, T.wink, { size: 44, color: GOLD, life: 0.8, rise: 24 })
      }
    }
  }

  // ═══════════════════════ 6 · tonight's deck ═══════════════════════
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal[0] || t > T.deckOut[1]) return
    const o = prog(t, ...T.deckOut)
    DECK.forEach((D, i) => {
      const t0 = T.deal[i], p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.6)
      const cx = lerp(540 + (i - 1) * 60, D.x, e), cy = lerp(-260, D.y, e) - ease.inCubic(o) * 1400, rot = lerp(2.6 + i, D.r, ease.outCubic(p))
      if (i === 1) {
        const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
        const wB = CARD_W * (1 + 0.1 * clamp(f * 2))
        if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy, wB, rot, sx)
        else drawCardImg(FACE, FACE_BODY, cx, cy, wB, rot, -sx)
        if (f > 0.4) sparkleRing(t, cx, cy, T.flip[0] + 0.2, 12, 230, 2)
      } else drawCardImg(BACK, BACK_BODY, cx, cy, CARD_W, rot)
      sparkleRing(t, D.x, D.y, t0 + 0.32, 8, 150, i, 0.55, [GOLD, BONE, LAV, MINT], 22)
    })
  }
  const outEnd = [40.15, 40.5]
  function drawTie(t) {
    if (t < T.cut4) return
    const ko = popOut(t, outEnd)
    // THE STARS (right): smug, then blushing at the THANK YOU
    {
      const st = t < T.l7 + 1.4 ? S_('happy', [-1, 0]) : t < T.blush ? S_('wink', [-1, 0]) : t < T.blush + 1.2 ? S_('sparkle', [-1, 0], { blush: 1 }) : t < 39.6 ? S_('happy', [0, 0]) : S_('wink', [0, 0])
      const r = star('stars', TIE.stars, t, { ...st }, { pop: pop01(t, T.cut4 + 0.05, 0.34, 2) * ko, hops: [...HOPS.stars.filter(h => h > T.cut4), T.blush, T.blush + 0.4, T.h10Land, T.h10Land + BL] })
      if (r && t >= T.blush && t < T.blush + 1.4) { const k = pop01(t, T.blush, 0.25, 2.4) * (1 - prog(t, T.blush + 1.1, T.blush + 1.4)); drawPixelHeart(x, r.x + r.size * 0.45, r.top + 10, 6 * k) }
    }
    // Pisces (bottom right corner), sobbing
    {
      const r = star('pis', TIE.pis, t, S_('sparkle', [-1, -1]), { pop: pop01(t, 37.6, 0.34, 2.4) * ko, hops: [37.95, T.h10Land + 0.1, 39.3] })
      if (r) { drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, 3, t); tears(r.x, r.y, r.size, t, 37.8, outEnd[0], { gap: 0.07, spread: 0.9 }) }
    }
    // Virgo (crowned) + Leo
    let lr = null
    {
      const st = t < T.shout[0] ? S_('sparkle', [1, -1]) : t < T.shout[1] ? S_('happy', [1, 0]) : S_('happy', [0, 0])
      const r = star('vir', TIE.vir, t, st, { pop: pop01(t, T.cut4 + 0.1, 0.34, 2) * ko, hops: [T.shout[0], T.shout[0] + 0.3, T.h10Land + 0.05, T.h10Land + BL + 0.05, 39.4] })
      if (r) crownOn(r, 0.16)
    }
    {
      const st = t < T.shout[0] ? S_('sparkle', [1, -1]) : t < T.shout[1] ? S_('happy', [1, 0]) : t < T.iris[0] - 0.1 ? S_('happy', [0, 0]) : S_('wink', [0, 0])
      lr = star('leo', TIE.leo, t, st, { pop: pop01(t, T.cut4 + 0.05, 0.34, 2), hops: [T.shout[0], T.shout[0] + 0.3, T.h10Land, T.h10Land + BL, 39.3, T.iris[0] - 0.05] })
    }
    // THANK YOU!! (both of them)
    if (inW(t, ...T.shout)) {
      const k = pop01(t, T.shout[0], 0.3, 2.4) * (1 - ease.inCubic(prog(t, T.shout[1] - 0.15, T.shout[1])))
      x.save(); x.translate(365, 1050); x.scale(k, k); x.rotate(-0.04)
      drawBubble(x, -230, -70, 460, 116, { tail: 'down', tailX: 130, px: 6 })
      x.fillStyle = '#d0307a'; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THANK YOU!!', 0, -10)
      x.restore()
    }
    // waves for the last line
    if (t >= T.h10Land) {
      for (const [P, i] of [[TIE.leo, 0], [TIE.vir, 1]]) ono('*wave*', P[0] + 70, P[1] - P[2] * 0.75, t, T.h10Land + i * 0.25, { size: 32, color: BONE, life: 0.9, rise: 26, ticks: false })
    }
    return lr
  }

  // the iris-out (on its own layer, above the type)
  function drawIris(t) {
    ix.clearRect(0, 0, W, 1920)
    if (t < T.iris[0] || t >= STORY_END) return
    const p = prog(t, ...T.iris)
    const cx = TIE.leo[0], cy = TIE.leo[1] - 10
    // close fast to a ring around Leo, hold a beat on the wink, then shut
    const r = p < 0.5 ? lerp(2100, 190, ease.inOutCubic(p / 0.5)) : p < 0.75 ? 190 : lerp(190, 0, ease.inCubic((p - 0.75) / 0.25))
    ix.save(); ix.fillStyle = '#05040c'
    ix.beginPath(); ix.rect(0, 0, W, 1920); ix.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2, true); ix.fill('evenodd')
    // a gold rim on the iris edge
    if (r > 2) { ix.strokeStyle = 'rgba(242,199,92,0.7)'; ix.lineWidth = 6; ix.beginPath(); ix.arc(cx, cy, r, 0, Math.PI * 2); ix.stroke() }
    ix.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawTheme(t)
      drawTitle(t)
      // the week + the tape share the cloud home
      if (t >= T.setIn[0] && t < T.strike[1]) {
        const te = weekTime(t)
        const k = setK(t)
        if (k > 0.02) {
          x.save(); x.translate(540, FLOOR_Y); x.scale(1, k); x.translate(-540, -FLOOR_Y)
          drawCloudFloor(x, 30, 1050, FLOOR_Y, 6)
          x.restore()
        }
        drawBoard(t, te, k)
        if (te < T.cut2 || rewinding(t)) { drawWeekProps(t, te); drawWeekCast(t, te) }
        else if (t < T.strike[0]) drawLive(t)
        drawStars(t)
        drawVHS(t, te)
        drawPlay(t)
      }
      drawMoral(t)
      if (t >= T.cut4) { drawDeck(t); drawTie(t) }
      if (t >= outEnd[0] - 0.1 && t < outEnd[1] + 0.3) sparkleRing(t, 540, 1150, outEnd[0], 16, 420, 0.2)
      box1.update(t); box2.update(t); box3.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawIris(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.45 (theme → title card, kept), 20.15 (the week → the tape, flip), 29.1 (→ the moral), 34.9
// (lesson → tonight's deck, deal). The default selection keeps 20.15 and 34.9; 7.45 is kept on top (≈ one per 13 s).
export const CUTS = [{ t: T.cut1, kind: 'deal', keep: true }, { t: T.cut2, kind: 'flip' }, 29.1, { t: T.cut4, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. The score is the chiptune engine in C; the theme song, the sobs and the gags ride the 'sfx' bus in C major.
const C_ = { C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880, B5: 987.77, C6: 1046.5, E6: 1318.51, G6: 1567.98 }
const NOTE = [C_.C5, C_.D5, C_.E5, C_.G5, C_.A5, C_.C6, C_.E6]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, C_.C6, 0.05, 0], ['pluck', land, C_.C6, 0.04, 0.6, 0]]
const lead = (t, f, len, g = 0.05) => ['chip', r3(t), f, r3(len), { ...FX, wave: 'square', duty: 0.25, vib: 0.01, gain: g, decay: 0.18, sustain: 0.75, dly: 0.12 }]
const harm = (t, f, len, g = 0.022) => ['chip', r3(t), f, r3(len), { ...FX, wave: 'square', duty: 0.125, gain: g, decay: 0.15, sustain: 0.6, pan: -0.3 }]
const ckick = (t, g = 0.14) => ['chip', r3(t), 140, 0.11, { ...FX, wave: 'tri', slide: -90, gain: g, decay: 0.05, sustain: 0, rev: 0 }]
const csnare = (t, g = 0.06) => ['chip', r3(t), 5200, 0.12, { ...FX, wave: 'noise', gain: g, decay: 0.07, sustain: 0, rev: 0.05 }]
const womp = t => [['chip', r3(t), C_.G4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', r3(t + 0.34), C_.E4, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const slideWhistle = (t, up = true) => ['chip', r3(t), up ? C_.C5 : C_.C6, 0.32, { ...FX, wave: 'tri', slide: up ? 12 : -12, gain: 0.035, decay: 0.3, sustain: 0.8, vib: 0.01 }]
const buzz = t => [0, 0.16, 0.32].map(d => ['chip', r3(t + d), 110, 0.1, { ...FX, wave: 'square', duty: 0.5, gain: 0.03, decay: 0.08, sustain: 0.8 }])
const sigh = t => ['chip', r3(t), C_.E5, 0.7, { ...FX, wave: 'tri', slide: -7, gain: 0.03, decay: 0.5, sustain: 0.6 }]
const levelUp = t => [C_.C5, C_.E5, C_.G5, C_.C6, C_.E6].map((f, i) => ['chip', r3(t + i * 0.06), f, 0.12, { ...FX, wave: 'square', duty: 0.25, gain: 0.032, decay: 0.1, sustain: 0.6, dly: 0.2 }])
/** the VHS rewind: chipmunk chatter, falling */
const chatter = (t0, t1) => { const out = []; let k = 0; for (let t = t0; t < t1; t += 0.055, k++) out.push(['chip', r3(t), +(1800 - 900 * ((t - t0) / (t1 - t0)) + ((k * 137) % 5) * 90).toFixed(1), 0.04, { ...FX, wave: 'square', duty: 0.5, gain: 0.013, decay: 0.03, sustain: 0.4, rev: 0 }]); return out }
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
// the theme melody (on the syllables)
const MEL_A = [C_.G4, C_.A4, C_.C5, C_.E5, C_.D5, C_.G5], LEN_A = [E8, E8, BL, E8, E8, 2 * BL]
const MEL_B = [C_.E5, C_.E5, C_.A5, C_.G5, C_.F5, C_.E5, C_.C5], LEN_B = [E8, E8, BL, E8, E8, E8, 1.1]
const THEME = [
  ...LYR_A.flatMap(([, t], i) => [lead(t, MEL_A[i], LEN_A[i] * 0.92), harm(t, MEL_A[i] / 2, LEN_A[i] * 0.9)]),
  ...LYR_B.flatMap(([, t], i) => [lead(t, MEL_B[i], LEN_B[i] * 0.92), harm(t, MEL_B[i] / 2, LEN_B[i] * 0.9)]),
  lead(T.tag[0], C_.G5, 0.12, 0.05), lead(T.tag[1], C_.C6, 0.5, 0.055), harm(T.tag[1], C_.E5, 0.5),
  // a chiptune drum kit under the theme (the arranged score only kicks in at the week)
  ...Array.from({ length: 11 }, (_, i) => ckick(BEAT(1 + i))), ...Array.from({ length: 5 }, (_, i) => csnare(BEAT(2 + 2 * i))),
  ['chip', BEAT(1), 5200, 0.3, { ...FX, wave: 'noise', gain: 0.05, decay: 0.25, sustain: 0, rev: 0.2 }],
]
// the last line: "Same star time, next week!" sung back as the theme's tag
const OUTRO = [lead(T.h10Land, C_.E5, 0.24), lead(T.h10Land + E8, C_.G5, 0.24), lead(T.h10Land + BL, C_.A5, 0.5), lead(T.h10Land + 2 * BL, C_.G5, 0.24), lead(T.h10Land + 2.5 * BL, C_.C6, 0.9, 0.055), harm(T.h10Land + 2.5 * BL, C_.E5, 0.9)]
const PITCH = { [SL]: 980, [SS]: 760 }

// my pop / pluck / bell are written in C; the engine moves those kinds from D into the score's key, so lift them to D first
const toD = c => (c[0] === 'pop' || c[0] === 'pluck' || c[0] === 'bell') ? [c[0], c[1], +(c[2] * 1.122462).toFixed(2), ...c.slice(3)] : c
const MINE = [
  // 1 · the theme song
  ...head(T.h0, 2, T.h0Land, 0), ['whoosh', 0.05, 0.6, 0.05], ['glitter', 0.3, 1.2],
  ...THEME,
  ...['leo', 'vir', 'pis'].flatMap((id, i) => { const t0 = T.roll[id]; return [['whoosh', r3(t0), 0.3, 0.05], ['pop', r3(t0 + 0.12), NOTE[(i * 2) % 7], 0.035, 0], ['pop', r3(t0 + 0.24), NOTE[(i * 2 + 2) % 7], 0.03, 0]] }),
  ...sob(T.roll.pis + 0.35, C_.A5), ...sob(T.roll.pis + 0.95, C_.G5),
  ['whoosh', T.roll.grp, 0.3, 0.05], ['glitter', T.tag[0], T.tag[0] + 0.6],
  // 2 · the title card
  ...head(T.h1, 3, T.h1Land, 2),
  ...[0.18, 0.42, 0.66].map(q => ['pop', r3(lerp(T.tiptoe[0], T.tiptoe[1], q)), 1567.98, 0.018, 0.2]),
  // 3 · the week
  ['whoosh', T.setIn[0], 0.3, 0.04], ['tick', T.setIn[1], 0.05],
  // Monday
  slideWhistle(T.h2 - 0.05), ...head(T.h2, 4, T.h2Land, 0),
  ['pop', T.mugIn, 783.99, 0.025, 0.2],
  ...Array.from({ length: 8 }, (_, i) => ['chip', r3(T.pour[0] + 0.2 + i * 0.07), 2600 - i * 120, 0.05, { ...FX, wave: 'noise', gain: 0.012, decay: 0.03, sustain: 0.3 }]),
  ['whoosh', T.pour[1] + 0.05, 0.25, 0.03], ['tick', T.pour[1] + 0.35, 0.05],
  ['pop', T.turn1, 523.25, 0.03, -0.2],
  ['pop', T.hug1[0], 1046.5, 0.035, -0.2], ['pop', T.hug1[0] + 0.3, 1318.51, 0.03, -0.2],
  ['pop', ROWS[0][0], 1567.98, 0.03, 0.4], ...sob(SOB[0], C_.A5, 2),
  // Wednesday
  slideWhistle(T.h3 - 0.05), ...head(T.h3, 5, T.h3Land, 1),
  ['tom', T.fridgeIn[1], 80, { ...FX, gain: 0.16, decay: 0.2 }], ['tick', T.virOpen[0], 0.06], ['glitter', T.slice, T.slice + 0.5], ['tick', T.virClose[1], 0.07],
  ['tick', T.leoOpen[0], 0.06], ['bell', T.leoOpen[1], 1567.98, 0.03, 1.2, 0],
  ['pop', T.hug2[0], 1046.5, 0.035, -0.2], ['pop', T.hug2[0] + 0.25, 1318.51, 0.03, -0.2], ['tom', T.hug2[0] + 0.05, 70, { ...FX, gain: 0.12, decay: 0.2 }],
  ['pop', ROWS[1][0], 1567.98, 0.03, 0.4], ...sob(SOB[1], C_.A5, 3), ...sob(SOB[1] + 0.5, C_.G5, 2),
  // Friday
  slideWhistle(T.h4 - 0.05), ...head(T.h4, 5, T.h4Land, 2),
  ['whoosh', T.write[0], 0.45, 0.025], ...buzz(T.buzz),
  ['pop', T.kiss, 2093, 0.04, 0.3], ['pop', T.kiss + 0.06, 1567.98, 0.03, 0.3],
  ['pop', ROWS[2][0], 1567.98, 0.03, 0.4], ...sob(SOB[2], C_.C6, 3), ...sob(SOB[2] + 0.5, C_.A5, 3),
  sigh(T.sigh), ...womp(ROWS[3][0] + 0.05),
  // 4 · the tape
  ['whoosh', T.starsIn[0], 0.5, 0.06], ['glitter', T.starsIn[0] + 0.1, T.starsIn[1] + 0.2], ['bell', T.starsIn[1], 1318.51, 0.03, 1.2, 0.3],
  ...head(T.h5, 4, T.h5Land, 3),
  ...silence(T.rew[0], 0.4, T.rew[1]),
  ['whoosh', T.rew[0], 0.5, 0.05], ...chatter(T.rew[0] + 0.1, T.rew[1] - 0.05),
  ['tick', T.rew[1], 0.09], ['pop', T.rew[1] + 0.02, 783.99, 0.03, 0],
  ['whoosh', T.rew[1] + 0.25, 0.18, 0.05], ['chip', r3(T.rew[1] + 0.25), C_.C6, 0.25, { ...FX, wave: 'square', duty: 0.25, slide: 9, gain: 0.03, decay: 0.2, sustain: 0.7 }],
  ...head(T.h6, 4, T.h6Land, 1),
  ['pop', T.shy[0], 783.99, 0.03, 0.3], ['pop', T.shy[0] + 0.08, 659.25, 0.025, 0.3],
  ...head(T.h7, 3, T.h7Land, 4),
  ...levelUp(T.glow), ['glitter', T.glow, T.glow + 1.0], ['bell', T.glow + 0.3, 2093, 0.035, 1.6, 0.3],
  ...[0, 1, 2].map(j => ['pop', r3(T.glow + 0.1 + j * 0.12), NOTE[(j + 3) % 7], 0.03, 0.4]),
  ...sob(T.glow + 0.15, C_.C6, 3), ...sob(T.glow + 0.7, C_.A5, 3),
  ['whoosh', T.crown[0], 0.4, 0.04], ['pop', T.crown[1], 1046.5, 0.04, 0.3], ['bell', T.crown[1] + 0.02, 1567.98, 0.03, 1.2, 0.3],
  // 5 · the moral
  ['whoosh', T.strike[0], 0.4, 0.05], ['glitter', T.strike[0] + 0.1, T.strike[0] + 0.6],
  ['whoosh', T.spin[0], 0.3, 0.04], ...head(T.h8, 2, T.h8Land, 2),
  ['bell', T.wink, 2093, 0.04, 1.4, 0], ['pop', T.wink, 1567.98, 0.035, 0],
  // 6 · tonight's deck
  ...head(T.h9, 2, T.h9Land, 4),
  ...T.deal.flatMap(d => [['whoosh', r3(d), 0.25, 0.035], ['tick', r3(d + 0.34), 0.06]]),
  ['tick', T.flip[0] + 0.15, 0.07], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.flip[0] + 0.15, T.flip[1] + 0.4],
  ...wordPops(T.shout[0], 3, 0.09, 3, 0.04), ['bell', T.blush, 1760, 0.03, 1.2, 0.3], ['pop', T.blush, 1318.51, 0.03, 0.3],
  ...sob(37.85, C_.A5, 3),
  // 7 · the last line
  ...head(T.h10, 3, T.h10Land, 1), ...OUTRO,
  ['whoosh', T.iris[0], 0.35, 0.04], ['pop', T.iris[0] + 0.3, 1567.98, 0.035, 0], ['tick', T.iris[1] - 0.05, 0.06],
]
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...MINE.map(toD),
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }), ...talkCues(LINES3, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
