// og-stunbox — social rework of stunbox ("Unboxing Your Match", ♍ Virgo's ASMR review desk). --social: story 0–37.0,
// no end card. HOOK (static, main.js, box style) on screen 0–4.4; the film's own animated title "Unboxing your match." is
// removed, frame 0 already shows the desk (no fade from black), and the top-of-frame REC / ASMR UNBOXING label is gone.
//   0.0–4.4    (hook up.) A review desk under a ring light, a boom mic, a lilac box ("YOUR MATCH · 1 UNIT").
//              ♍ VIRGO leans in to the mic: "(whispering) hi besties. I ironed the *box.*" Three soft *tap*s on the box.
//   4.55–9.4   "First, the *peel.*"  Virgo peels the film in one glossy strip: "I'm framing this *peel.*" ♓ PISCES pops
//              up over the desk, sobbing: "I'm crying at a *sticker.*" The lid lifts with a slow *fwoomp* (the drop).
//   9.5–14.3   "The *specs.*"  BUILD QUALITY · emotionally available ✓ · BATTERY · texts back ✓ — VIRGO: "it texts back??
//              I need to *lie down.*" — WATER RESISTANCE · cries at trailers ✓ (Pisces, sobbing: "same").
//  14.42–18.9 "Chemistry: | sold *separately.*"  CHEMISTRY · sold separately, NOT INCLUDED. Tape-stop, crickets.
//              VIRGO: "…where's the chemistry? I checked *twice.*" The box is shaken: one silica packet. DO NOT EAT.
//  19.05–23.3 "Check the *manual.*"  Ch. 7, "How they make you *feel*": blank. VIRGO: "chapter seven is blank. I'm
//              filing a *complaint.*" Flip: "(this one too)". Flip: "(have you tried… meeting them?)"
//  23.42–29.15 "Some things don't | come in a *box.*"  THE STARS appear in the ring light: "babe. you can't unbox a
//              *person.*" · "chemistry ships *in person.*" Virgo's eyes go soft.
//  29.49–33.9 ★ LESSON UNLOCKED: "Specs aren't | the person. | Go *meet* them." (+1 CURIOSITY)
//              (the old mystery-card app beat that followed is cut; the finale moves up 3.6 s and DURATION 45 → 41.4)
//  34.14–37.0 "Five stars. | *Literally.*"  Virgo's review clipboard fills ★★★★★ and five actual stars pop up out of the
//              box; the fifth is Pisces, sobbing. Virgo winks. The pop-out is pushed past the story end, so the last
//              frame holds on the five stars.
// og full frame: sheet, manual, Pisces and the dialogue box nudged inside the safe zone (x 60–960, y 470–1560).
// One canvas (sky + camera-moved stage + screen-space bits), DOM type + dialogue boxes + the shared lesson, grain on top.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import { drawDesk, drawRingLight, drawBoom, drawBox, drawBeam, drawPacket, drawBattery, drawClipboard, drawBubble, drawTear,
  drawSweat, drawPixelHeart, RED } from './props.js'

export const DURATION = 41.4
export const HOOK = 'Great specs. | Chemistry: *missing.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 4.4
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 37.0
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)            // 108 bpm grid
export const KEY = 'Bb'

// ── the lesson (its schedule decides when it may fade)
const LESSON_AT = BEAT(52)                                       // 29.49
const LESSON_TEXT = 'Specs aren’t | the person. | Go *meet* them.'
const LESSON_CHIP = '+1 CURIOSITY'
const LT = lessonTimes({ at: LESSON_AT, text: LESSON_TEXT, chip: LESSON_CHIP })
const LESSON_OUT = [+(LT.end + 2.65).toFixed(2), +(LT.end + 2.9).toFixed(2)]

// ── the timeline
export const T = {
  closeA: 4.3, recOut: [29.0, 29.2],
  lean: [0.55, 1.1], l1: 1.25, taps: [3.0, 3.28, 3.56],
  h1: 4.55, h1Land: 4.95, peel: [BEAT(8), 7.0], l2: 5.2, pisUp: [7.05, 7.35], l3: 7.45, lidLift: [7.85, BEAT(14)], pop: BEAT(14),
  close2: 9.62, h1Out: [9.25, 9.42],
  h2: 9.5, h2Land: 9.8, sheet: [BEAT(16), BEAT(16) + 0.55], rows: [BEAT(18), BEAT(20), BEAT(22), BEAT(25)], l4: 11.95, same: [13.05, 14.2],
  close3: 14.15, h2Out: [14.15, 14.3],
  cut1: 14.35,
  h3: 14.42, h3Land: 14.95, stampC: BEAT(26), hush: [BEAT(25), 1.2], take: [15.05, 15.55, 15.95], crick: [15.35, 15.85],
  l5: 16.25, sheetOut: [16.95, 17.3], flipBox: [17.3, 17.62], shake: [17.62, 18.5], drop: [18.05, 18.38], unflip: [18.55, 18.9],
  h3Out: [18.85, 19.0],
  h4: 19.05, h4Land: 19.35, man: [19.05, 19.45], l6: 19.95, flips: [21.05, 21.75], manOut: [23.05, 23.32], pisSob: [21.9, 23.2],
  close4: 22.95, h4Out: [23.15, 23.3],
  lift: BEAT(41), starsIn: [BEAT(41) - 0.05, BEAT(41) + 0.35],
  h5: 23.42, h5Land: 23.93, l7: 23.75, l8: 26.6, soft: 27.3, close5: 29.15, h5Out: [28.98, 29.14], starsOut: [29.0, 29.25],
  cut2: 29.22,
  lesson: LESSON_AT, lessonOut: LESSON_OUT, move: [29.6, 30.6],
  // (the mystery-card beat is cut; the finale follows the lesson, 3.6 s earlier than the original)
  h7: 34.14, h7Land: 35.35, clip: [34.14, 34.44], pops: [0, 1, 2, 3, 4].map(i => +(BEAT(61 + i * 0.5) - 0.02).toFixed(3)),
  wink: 36.05, out: [38.5, 38.6], h7Out: [38.5, 38.6],   // social: hold the payoff to the last frame (no pop-out to empty sky)
}

const VIR = signStar('virgo'), PIS = signStar('pisces'), LEO = signStar('leo'), TAU = signStar('taurus'), CAN = signStar('cancer')
const NAME = { vir: `${VIR.glyph}︎ VIRGO`, pis: `${PIS.glyph}︎ PISCES`, stars: 'THE STARS' }
const TAG = { vir: '#ff8ab6', pis: '#b7b1ff', stars: GOLD }
const L = (t, id, text) => ({ t, speaker: NAME[id], color: TAG[id], text })
const LINES = {
  a: [L(T.l1, 'vir', '(whispering) hi besties. I ironed the *box.*')],
  b: [L(T.l2, 'vir', 'I’m framing this *peel.*'), L(T.l3, 'pis', 'I’m crying at a *sticker.*')],
  c: [L(T.l4, 'vir', 'it texts back?? I need to *lie down.*')],
  d: [L(T.l5, 'vir', '…where’s the chemistry? I checked *twice.*'), L(T.l6, 'vir', 'chapter seven is blank. I’m filing a *complaint.*')],
  e: [L(T.l7, 'stars', 'babe. you can’t unbox a *person.*'), L(T.l8, 'stars', 'chemistry ships *in person.*')],
}
export const BOXES = [
  { lines: LINES.a, close: T.closeA }, { lines: LINES.b, close: T.close2 }, { lines: LINES.c, close: T.close3 },
  { lines: LINES.d, close: T.close4 }, { lines: LINES.e, close: T.close5 },
]
const CPS = 28
export const ALL_LINES = BOXES.flatMap(b => b.lines)
export const LESSON = { at: T.lesson, out: T.lessonOut, text: LESSON_TEXT, chip: LESSON_CHIP }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
const arcTo = (t, [a, b], p0, p1, h) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(p0[0], p1[0], e), lerp(p0[1], p1[1], e) - Math.sin(p * Math.PI) * h, lerp(p0[2], p1[2], e)] }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── the stage (world coords; the camera maps (fx, fy) to screen (540, 1000) at scale s)
const DESK_Y = 1270
const BOX = { cx: 700, bottom: 1264, px: 8 }                  // body 540–860 × 1088–1264, lid on top
const RING = { cx: 800, cy: 650, r: 150 }
const BOOM = [-30, 500, 318, 772]
const VIR_AT = [300, 1060, 270], VIR_B = [210, 1150, 220]
const PIS_DESK = [895, 1222, 150], PIS_UP = [895, 1150, 150]   // og: clear of the side buttons (x 960+)
const STARS_RING = [RING.cx, RING.cy + 14, 190]
const SHEET = { x: 396, y: 480, w: 564, h: 610 }              // og: right edge at x 960
const ROW_Y = i => SHEET.y + 150 + i * 120
const MAN = { cx: 560, cy: 820, w: 780, h: 520 }               // og: inside x 60–960
const PACKET_AT = [700, 1240]
const ROW5 = [[195, 905], [370, 905], [545, 905], [720, 905], [895, 905]]
const FIVE = [{ color: STAR.sky }, LEO, TAU, CAN, PIS]
const SEED = { vir: 4, pis: 5, stars: 9 }

// camera keys: [t, s, fx, fy]; consecutive keys tween (inOutCubic; < 0.5 s apart: inOutQuad)
const CAM = [
  [0, 1.07, 600, 1040], [T.lean[1], 1.07, 600, 1040], [2.4, 1, 540, 1000],
  [T.peel[0] - 0.2, 1, 540, 1000], [T.peel[0] + 0.4, 1.13, 660, 1090], [T.lidLift[0], 1.13, 660, 1090], [T.pop, 1, 540, 1000],
  [T.take[2], 1, 540, 1000], [T.l5 + 0.4, 1.05, 520, 1010], [T.sheetOut[1], 1.05, 520, 1010], [T.flipBox[1], 1, 540, 1000],
  [T.starsIn[1], 1, 540, 1000], [T.l8 - 0.1, 1, 540, 1000], [T.l8 + 0.5, 1.06, 600, 960], [T.close5, 1.06, 600, 960], [T.lesson, 1, 540, 1000],
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
for (const id of ['vir', 'pis', 'stars']) HOPS[id] = talkHops(ALL_LINES, NAME[id], { cps: CPS })
HOPS.vir.push(...T.taps.map(s => s - 0.05), T.pop + 0.05, T.rows[1] + 0.05, T.take[0], T.wink - 0.15)
HOPS.pis.push(T.pisUp[1], T.rows[2] + 0.3)
HOPS.stars.push(T.starsIn[1])

// Virgo's moods: [from, mood, look, opts]
const S_ = (mood, look, o = {}) => ({ mood, look, ...o })
const VIR_K = [
  [0, S_('neutral', [1, 1])], [T.lean[0], S_('happy', [0, 0])], [T.l1 + 1.6, S_('neutral', [1, 1], { blink: 0.25 })],
  [T.h1, S_('squint', [1, 1])], [T.peel[0] + 0.1, S_('happy', [0, 0], { blush: 1 })], [T.l3, S_('neutral', [1, 0], { blink: 0.5 })],
  [T.lidLift[0], S_('wide', [1, 0], { blink: false })], [T.pop, S_('sparkle', [1, 0])],
  [T.sheet[0], S_('wide', [1, -1], { blink: false })], [T.rows[0], S_('sparkle', [1, -1])], [T.rows[1], S_('heart', [1, -1])],
  [T.rows[2], S_('happy', [1, 0])], [T.rows[3], S_('neutral', [1, -1])],
  [T.take[0], S_('wide', [0, 0], { blink: false })], [T.take[1], S_('wide', [1, -1], { blink: false })], [T.take[2], S_('squint', [0, 0])],
  [T.flipBox[0], S_('wide', [1, 0], { blink: false })], [T.drop[1], S_('neutral', [1, 1], { blink: 0.55 })],
  [T.man[0], S_('squint', [1, -1])], [T.flips[0], S_('wide', [1, -1], { blink: false })], [T.flips[1] + 0.1, S_('wide', [0, 0], { blink: false })],
  [T.starsIn[0], S_('wide', [1, -1], { blink: false })], [T.l7 + 0.4, S_('neutral', [1, -1], { blink: 0.3 })], [T.soft, S_('sparkle', [1, -1])],
  [T.lesson, S_('sparkle', [0, -1])],
  [T.h7, S_('happy', [1, 0])], [T.pops[0], S_('wide', [1, -1], { blink: false })], [T.pops[4] + 0.2, S_('sparkle', [1, -1])],
  [T.wink, S_('wink', [0, 0])],
]
const PIS_K = [
  [0, S_('sparkle', [-1, 0])], [T.l3 + 0.9, S_('sparkle', [-1, -1])], [T.rows[2], S_('wide', [-1, -1], { blink: false })],
  [T.same[0], S_('sparkle', [0, 0])], [T.same[1], S_('neutral', [-1, -1])], [T.rows[3], S_('wide', [-1, -1], { blink: false })],
  [T.take[2], S_('neutral', [-1, 0], { blink: 0.4 })], [T.man[0], S_('wide', [-1, -1])], [T.pisSob[0], S_('sparkle', [-1, -1])],
  [T.starsIn[0], S_('wide', [-1, -1], { blink: false })], [T.soft, S_('sparkle', [-1, -1])],
  [T.pops[4], S_('sparkle', [0, 0])],
]
const STARS_K = [[0, S_('happy', [-1, 1])], [T.l8, S_('neutral', [-1, 1], { blink: 0.3 })], [T.l8 + 1.2, S_('wink', [-1, 1])]]
const keyed = (t, K) => { let s = K[0][1]; for (const [k, v] of K) if (t >= k) s = v; return s }

// spec rows
const SPECS = [
  { k: 'BUILD QUALITY', v: 'emotionally available' },
  { k: 'BATTERY', v: 'texts back', battery: true },
  { k: 'WATER RESISTANCE', v: 'cries at trailers' },
  { k: 'CHEMISTRY', v: 'sold separately', bad: true },
]
const MAN_PAGES = ['(this page intentionally', 'left blank)', '(this one too)', '', '(have you tried…', 'meeting them?)']

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 88px Inter", "800 40px Inter", "italic 500 150px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { top: 190, size: 104, accentSize: 140, wobble: true, ...o })
  const H1 = HT('First, the *peel.*', { size: 108, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: '#bfe6ff' })
  const H2 = HT('The *specs.*', { size: 128, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: MINT })
  const H3 = HT('Chemistry: | sold *separately.*', { size: 100, accentSize: 140, at: T.h3, late: 1, lateAt: T.h3Land, accentColor: RED })
  const H4 = HT('Check the *manual.*', { size: 104, accentSize: 146, at: T.h4, late: 1, lateAt: T.h4Land, accentColor: GOLD })
  const H5 = HT('Some things don’t | come in a *box.*', { size: 92, accentSize: 132, at: T.h5, late: 1, lateAt: T.h5Land, gap: 0.08, accentColor: LAV })
  const H7 = HT('Five stars. | *Literally.*', { size: 112, accentSize: 168, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: GOLD })
  const HEADS = [[H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H7, T.h7Out]]
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1330, width: 900, height: 230, W: 1020, open: b.lines[0].t - 0.22, close: b.close, cps: CPS }))
  const lesson = buildLesson(root, { ...LESSON, dim: 0.62 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── helpers
  const shakeAt = t => {
    let a = 0
    for (const [t0, amp] of [[T.pop, 10], [T.stampC, 14], [T.drop[1], 7], ...T.pops.map(s => [s + 0.1, 5])]) { const k = t - t0; if (k >= 0 && k < 0.32) a = Math.max(a, amp * (1 - k / 0.32)) }
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
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 40, font = MONO, weight = 700 } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.22; x.strokeStyle = 'rgba(10,6,24,0.92)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
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
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }

  // ── the cast
  function virgoPlace(t) {
    if (t < T.move[0]) return VIR_AT
    if (t < T.move[1]) return arcTo(t, T.move, VIR_AT, VIR_B, 60)
    return VIR_B
  }
  function drawVirgo(t) {
    const P = virgoPlace(t)
    let [vx, vy, sz] = P
    const st = keyed(t, VIR_K)
    let sq = 0, dy = 0
    // the whisper lean: lean toward the mic
    const lean = ease.inOutCubic(prog(t, ...T.lean)) * (1 - ease.inOutCubic(prog(t, T.l1 + 1.6, T.l1 + 2.1)))
    vx += lean * 10; dy -= lean * 16
    // double-take
    if (inW(t, T.take[0], T.take[0] + 0.3)) sq = -0.08 * nodK(t, T.take[0], 0.3)
    // the squint creep in the silence
    if (inW(t, T.take[2], T.l5 + 0.8)) sq = -0.05
    const k = popOut(t, T.out)
    if (k <= 0) return null
    const r = drawStarChar(x, vx, vy + dy, sz, t, { color: VIR.color, glyph: VIR.glyph, mood: st.mood, look: st.look, blink: st.blink, blush: st.blush, squash: sq, hops: HOPS.vir, seed: SEED.vir, pop: k, glow: 0.95, bob: sz * 0.025 })
    // sweat on the third flip ("have you tried… meeting them?")
    if (inW(t, T.flips[1] + 0.1, T.manOut[0])) drawSweat(x, vx + sz * 0.33, vy - sz * 0.12 + ease.inQuad(prog(t, T.flips[1] + 0.1, T.manOut[0])) * 40, 5)
    if (inW(t, T.take[2], T.l5 + 1)) drawSweat(x, vx + sz * 0.33, vy - sz * 0.14 + ease.inQuad(prog(t, T.take[2], T.l5 + 1)) * 36, 5)
    // hearts on "texts back??"
    if (inW(t, T.rows[1], T.rows[2])) for (let i = 0; i < 6; i++) {
      const a = t - (T.rows[1] + i * 0.18)
      if (a < 0 || a > 1.2) continue
      const side = i % 2 ? 1 : -1
      x.save(); x.globalAlpha = Math.min(1, a * 6) * (1 - prog(a, 0.8, 1.2)); drawPixelHeart(x, vx + side * (sz * 0.5 + (i * 23) % 40), vy - 20 - a * 170, 5, i % 3 ? '#ff4f7e' : '#ff8fc8'); x.restore()
    }
    // the review clipboard (the five-star finale)
    if (t >= T.h7 - 0.3) {
      const ck = pop01(t, T.h7 - 0.3, 0.35, 2.2) * k
      if (ck > 0.02) {
        x.save(); x.translate(vx + sz * 0.62, vy + sz * 0.12); x.scale(ck, ck)
        const lit = t < T.clip[0] ? 0 : Math.min(5, Math.floor((t - T.clip[0]) / 0.07) + 0)
        drawClipboard(x, 0, 0, 6, { stars: Math.min(5, lit), rot: 0.12 + 0.04 * Math.sin(t * 2), check: 0 })
        x.restore()
      }
    }
    return r
  }
  function pisPlace(t) {
    if (t < T.pisUp[0]) return null
    const up = easeOutBack(prog(t, ...T.pisUp), 2)
    let p = [PIS_DESK[0], lerp(PIS_DESK[1] + 140, PIS_DESK[1], up), PIS_DESK[2]]
    // pops up higher for its lines / big moments
    const hi = Math.max(nodK(t, T.l3 - 0.1, 1.9), nodK(t, T.same[0] - 0.15, 1.4), nodK(t, T.pisSob[0] - 0.1, 1.4))
    p[1] -= hi * 70
    // the finale: hops into the five-star row as #5
    if (t >= T.pops[4] - 0.35) p = arcTo(t, [T.pops[4] - 0.35, T.pops[4] + 0.05], PIS_DESK, [...ROW5[4], 150], 220)
    return p
  }
  function drawPisces(t) {
    const P = pisPlace(t)
    if (!P) return
    const st = keyed(t, PIS_K), k = popOut(t, T.out)
    if (k <= 0) return
    const r = drawStarChar(x, P[0], P[1], P[2], t, { color: PIS.color, glyph: PIS.glyph, mood: st.mood, look: st.look, blink: st.blink, hops: HOPS.pis, seed: SEED.pis, pop: k, glow: 0.9, bob: P[2] * 0.03 })
    const cry = [[T.l3 - 0.05, T.l3 + 1.6], [T.same[0], T.same[1]], [T.pisSob[0], T.pisSob[1]], [T.soft + 0.2, T.close5], [T.close5, T.lesson + 1.2], [T.pops[4] + 0.05, T.out[0]]]
    for (const [a, b] of cry) tears(P[0], P[1], P[2], t, a, b, { gap: 0.09, spread: 0.9 })
    // the trickle in between (always a little bit crying)
    if (!cry.some(([a, b]) => t >= a && t < b + 0.6) && Math.floor(t * 0.9) % 2 === 0) drawTear(x, P[0] + P[2] * 0.13, P[1] + P[2] * 0.12 + ((t * 0.8) % 1) * 22, 4)
    // "same" bubble
    if (inW(t, T.same[0] + 0.1, T.same[1])) {
      const b = pop01(t, T.same[0] + 0.1, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.same[1] - 0.2, T.same[1])))
      x.save(); x.translate(P[0] - 40, P[1] - 120); x.scale(b, b)
      drawBubble(x, -90, -40, 180, 76, { tail: 'down', tailX: 120, px: 5 })
      x.fillStyle = '#2a1846'; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('same', 0, -2)
      x.restore()
    }
    void r
  }
  function drawStars(t) {
    let P = null, k = 0
    if (t >= T.starsIn[0] && t < T.starsOut[1]) {
      const e = ease.outCubic(prog(t, ...T.starsIn))
      P = [lerp(STARS_RING[0] + 260, STARS_RING[0], e), lerp(STARS_RING[1] - 420, STARS_RING[1], e), STARS_RING[2]]
      k = 1 - ease.inCubic(prog(t, ...T.starsOut))
    }
    if (!P || k <= 0.02) return
    const st = keyed(t, STARS_K)
    drawStarChar(x, P[0], P[1], P[2], t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, hops: HOPS.stars, seed: SEED.stars, pop: k, glow: 1.1 })
    if (t < T.starsIn[1] + 0.3) sparkleRing(t, STARS_RING[0], STARS_RING[1], T.starsIn[1] - 0.1, 10, 140, 0.3, 0.6)
  }

  // ── the set
  function drawRec(t) {
    // og: the top-row REC · ASMR UNBOXING · timecode label is removed (the top of the frame is the hook's); corners stay
    if (t > T.recOut[1]) return
    const k = outK(t, T.recOut)
    x.save(); x.globalAlpha = k
    // viewfinder corners
    x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 4
    for (const [cx, cy, dx, dy] of [[50, 70, 1, 1], [1030, 70, -1, 1], [50, 1440, 1, -1], [1030, 1440, -1, -1]]) {
      x.beginPath(); x.moveTo(cx, cy + dy * 46); x.lineTo(cx, cy); x.lineTo(cx + dx * 46, cy); x.stroke()
    }
    x.restore()
  }
  function boxState(t) {
    // lid: lifts on the suction pull, then flies up/off on the pop
    let lid = 0, lidRot = 0
    if (t >= T.lidLift[0]) lid = 0.08 * ease.inOutQuad(prog(t, T.lidLift[0], T.lidLift[1]))
    if (t >= T.pop) { lid = 0.08 + 2 * ease.outCubic(prog(t, T.pop, T.pop + 0.5)); lidRot = 0.5 * prog(t, T.pop, T.pop + 0.5) }
    const film = t < T.peel[0] ? 0 : t < T.peel[1] ? ease.inOutQuad(prog(t, ...T.peel)) : 1
    // the shake: flips upside down, lifts, rattles, flips back
    let rot = 0, lift = 0, dx = 0
    if (t >= T.flipBox[0] && t < T.unflip[1]) {
      const f = ease.inOutCubic(prog(t, ...T.flipBox)), u = ease.inOutCubic(prog(t, ...T.unflip))
      rot = Math.PI * (f - u)
      lift = 150 * Math.sin(Math.min(1, f) * Math.PI / 2) * (1 - u)
      if (inW(t, ...T.shake)) dx = Math.sin((t - T.shake[0]) * 48) * 18 * (1 - prog(t, ...T.shake) * 0.4)
    }
    return { lid, lidRot, film, rot, lift, dx }
  }
  function drawProductBox(t) {
    if (t >= T.out[1]) return
    const s = boxState(t)
    const k = popOut(t, T.out)
    if (k <= 0) return
    const beamK = t >= T.pop ? pop01(t, T.pop, 0.4, 1.5) * (0.75 + 0.25 * Math.sin(t * 3)) * (1 - ease.inCubic(prog(t, T.sheet[0], T.sheet[1] + 0.3))) : 0
    const boxTop = BOX.bottom - 22 * BOX.px
    if (beamK > 0) drawBeam(x, BOX.cx, boxTop, 300, 560, beamK, t)
    x.save()
    x.translate(BOX.cx + s.dx, BOX.bottom - 88 - s.lift); x.rotate(s.rot); x.scale(k, k); x.translate(-BOX.cx, -(BOX.bottom - 88))
    drawBox(x, BOX.cx, BOX.bottom, BOX.px, t, { lid: s.lid, lidRot: s.lidRot, film: s.film })
    x.restore()
  }
  function drawSheet(t) {
    if (t < T.sheet[0] || t >= T.sheetOut[1]) return
    const up = ease.outBack(prog(t, ...T.sheet)), dn = ease.inCubic(prog(t, ...T.sheetOut))
    const sy = clamp(up * (1 - dn), 0, 1.1)
    if (sy <= 0.01) return
    const { x: X0, y: Y0, w, h } = SHEET
    x.save()
    x.translate(0, Y0 + h); x.scale(1, sy); x.translate(0, -(Y0 + h))
    // paper with fold creases
    x.save(); x.shadowColor = 'rgba(6,3,16,0.55)'; x.shadowBlur = 30
    x.fillStyle = '#fbf6ea'; x.fillRect(X0, Y0, w, h); x.restore()
    for (let i = 1; i < 4; i++) { x.fillStyle = 'rgba(160,140,190,0.25)'; x.fillRect(X0, Y0 + (h / 4) * i - 1, w, 3) }
    x.fillStyle = '#2a1846'; x.fillRect(X0, Y0, w, 96)
    x.textAlign = 'left'; x.textBaseline = 'middle'
    x.font = `700 26px ${MONO}`; x.fillStyle = GOLD
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText('SPEC SHEET', X0 + 30, Y0 + 36)
    x.font = `700 20px ${MONO}`; x.fillStyle = 'rgba(239,230,214,0.8)'
    x.fillText('MODEL: YOUR MATCH · v1.0', X0 + 30, Y0 + 70)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    SPECS.forEach((s, i) => {
      const t0 = T.rows[i]
      if (t < t0) return
      const p = easeOutBack(prog(t, t0, t0 + 0.3), 2), y = ROW_Y(i)
      x.save(); x.globalAlpha *= clamp(p * 1.5); x.translate((1 - Math.min(1, p)) * 40, 0)
      if (s.bad) { x.fillStyle = 'rgba(255,79,106,0.14)'; x.fillRect(X0 + 12, y - 52, w - 24, 104) }
      x.font = `700 22px ${MONO}`; x.fillStyle = s.bad ? '#c2203c' : '#8a6a2a'
      if ('letterSpacing' in x) x.letterSpacing = '3px'
      x.fillText(s.k, X0 + 30, y - 24)
      if ('letterSpacing' in x) x.letterSpacing = '0px'
      x.font = `800 36px ${INTER}`; x.fillStyle = s.bad ? '#d0263f' : '#1d1238'
      x.fillText(s.v, X0 + 30, y + 18)
      if (s.battery) drawBattery(x, X0 + 300, y + 18, 4, prog(t, t0 + 0.15, t0 + 0.75), t)
      if (!s.bad) {
        const ck = pop01(t, t0 + 0.35, 0.25, 2.6)
        if (ck > 0) {
          x.save(); x.translate(X0 + w - 56, y); x.scale(ck, ck)
          x.fillStyle = '#2fbf71'; x.beginPath(); x.arc(0, 0, 24, 0, Math.PI * 2); x.fill()
          x.strokeStyle = '#fff'; x.lineWidth = 6; x.lineCap = 'round'; x.lineJoin = 'round'
          x.beginPath(); x.moveTo(-10, 0); x.lineTo(-3, 8); x.lineTo(11, -8); x.stroke()
          x.restore()
        }
      }
      if (i < 3) { x.fillStyle = 'rgba(42,24,70,0.12)'; x.fillRect(X0 + 24, y + 56, w - 48, 2) }
      x.restore()
    })
    // the NOT INCLUDED stamp
    if (t >= T.stampC) {
      const a = t - T.stampC, sc = a < 0.12 ? lerp(2.2, 1, ease.inQuad(a / 0.12)) : 1
      x.save(); x.translate(X0 + w - 122, ROW_Y(3) + 2); x.rotate(-0.16); x.scale(sc * 0.78, sc * 0.78); x.globalAlpha *= clamp(a / 0.08)
      x.strokeStyle = '#e8344e'; x.lineWidth = 6; rr(-130, -40, 260, 80, 10); x.stroke()
      x.lineWidth = 2; rr(-120, -31, 240, 62, 6); x.stroke()
      x.font = `800 34px ${INTER}`; x.fillStyle = '#e8344e'; x.textAlign = 'center'; x.fillText('NOT INCLUDED', 0, 2)
      x.restore()
    }
    x.restore()
  }
  function drawSilica(t) {
    if (t < T.drop[0] || t >= T.man[0] + 0.3) return
    const p = prog(t, ...T.drop), fall = ease.inQuad(p)
    const s = boxState(t)
    const y0 = BOX.bottom - 88 - s.lift + 90
    const yy = lerp(y0, PACKET_AT[1], fall) - (t > T.drop[1] ? Math.abs(Math.sin((t - T.drop[1]) * 14)) * 18 * Math.exp(-(t - T.drop[1]) * 6) : 0)
    const k = 1 - ease.inCubic(prog(t, T.man[0], T.man[0] + 0.3))
    x.save(); x.globalAlpha *= k
    drawPacket(x, PACKET_AT[0] + s.dx * (1 - fall), yy, 5, lerp(0.6, -0.08, ease.outCubic(p)))
    x.restore()
  }
  function drawManual(t) {
    if (t < T.man[0] || t >= T.manOut[1]) return
    const k = easeOutBack(prog(t, ...T.man), 1.8) * (1 - ease.inCubic(prog(t, ...T.manOut)))
    if (k <= 0.01) return
    const { cx, cy, w, h } = MAN
    x.save(); x.translate(cx, cy + (1 - k) * 200); x.scale(k, k); x.rotate(-0.03)
    // cover + pages
    x.fillStyle = '#4a2b8c'; rr(-w / 2 - 16, -h / 2 - 14, w + 32, h + 30, 14); x.fill()
    x.fillStyle = '#fbf6ea'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = 'rgba(80,60,120,0.25)'; x.fillRect(-4, -h / 2, 8, h)
    const g = x.createLinearGradient(-40, 0, 40, 0); g.addColorStop(0, 'rgba(80,60,120,0)'); g.addColorStop(0.5, 'rgba(80,60,120,0.18)'); g.addColorStop(1, 'rgba(80,60,120,0)')
    x.fillStyle = g; x.fillRect(-40, -h / 2, 80, h)
    // left page
    const lx = -w / 2 + 40
    x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `700 20px ${MONO}`; x.fillStyle = '#8a6a2a'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('OWNER’S MANUAL', lx, -h / 2 + 56)
    x.fillText('CH. 7', lx, -h / 2 + 96)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.font = `800 50px ${INTER}`; x.fillStyle = '#1d1238'
    x.fillText('How they', lx, -h / 2 + 190); x.fillText('make you', lx, -h / 2 + 248)
    x.font = `italic 500 76px ${SERIF}`; x.fillStyle = '#c2203c'; x.fillText('feel', lx, -h / 2 + 322)
    x.font = `700 18px ${MONO}`; x.fillStyle = 'rgba(42,24,70,0.45)'; x.fillText('p. 77', lx, h / 2 - 30)
    // right page: which spread?
    let page = 0
    T.flips.forEach((f, i) => { if (t >= f + 0.2) page = i + 1 })
    x.font = `italic 500 36px ${SERIF}`; x.fillStyle = 'rgba(42,24,70,0.62)'; x.textAlign = 'center'
    const rx = w / 4
    const txt = [MAN_PAGES.slice(0, 2), MAN_PAGES.slice(2, 4), MAN_PAGES.slice(4, 6)][page]
    if (page === 2) { x.font = `italic 500 44px ${SERIF}`; x.fillStyle = '#c2203c' }
    txt.forEach((ln, i) => x.fillText(ln, rx, 30 + i * 48))
    // the page flip (a sheet sweeping right → left)
    T.flips.forEach(f => {
      const p = prog(t, f, f + 0.4)
      if (p <= 0 || p >= 1) return
      const sx = Math.cos(p * Math.PI)
      x.save(); x.scale(sx, 1)
      x.fillStyle = sx > 0 ? '#f3ecdc' : '#ece3cf'; x.fillRect(0, -h / 2, w / 2, h)
      x.fillStyle = 'rgba(80,60,120,0.18)'; x.fillRect(0, -h / 2, 10, h)
      x.restore()
    })
    x.restore()
  }
  // the finale: five actual stars pop up out of the box (the fifth is Pisces, who hops over from the desk)
  function drawFive(t) {
    for (let i = 0; i < 4; i++) {
      const t0 = T.pops[i]
      if (t < t0) continue
      const k = popOut(t, [T.out[0] + i * 0.03, T.out[1]])
      if (k <= 0) continue
      const P = t < t0 + 0.42 ? arcTo(t, [t0, t0 + 0.42], [BOX.cx, BOX.bottom - 150, 40], [...ROW5[i], 150], 180) : [...ROW5[i], 150]
      const c = FIVE[i]
      drawStarChar(x, P[0], P[1], P[2], t, { color: c.color, glyph: i ? c.glyph : null, mood: i === 0 ? 'wink' : 'happy', look: [0, 0], hops: [t0 + 0.42, T.pops[4] + 0.1 + i * 0.04], seed: 20 + i, pop: k, glow: 1, bob: 4 })
      if (t < t0 + 0.9) sparkleRing(t, ROW5[i][0], ROW5[i][1], t0 + 0.38, 8, 90, i, 0.5)
    }
    for (let i = 0; i < 5; i++) ono('★', ROW5[i][0], ROW5[i][1] - 120, t, T.pops[i] + 0.4, { size: 54, color: GOLD, life: 0.9, rise: 50, font: SERIF, weight: 500 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        const outAll = popOut(t, T.out)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        // the set: ring light (+ THE STARS inside it), the boom mic
        const setA = outAll * (1 - ease.inCubic(prog(t, T.h7, T.h7 + 0.4)))
        drawRingLight(x, RING.cx, RING.cy, RING.r, t, { on: 1, standTo: DESK_Y - 30, alpha: setA })
        drawStars(t)
        drawBoom(x, BOOM[0], BOOM[1], BOOM[2], BOOM[3], 7, t, { alpha: 1 - ease.inCubic(prog(t, T.move[0], T.move[0] + 0.5)) })
        drawPisces(t)
        drawDesk(x, DESK_Y, W, { alpha: outAll, matX: BOX.cx })
        drawVirgo(t)
        drawProductBox(t)
        drawSheet(t)
        drawSilica(t)
        drawManual(t)
        drawFive(t)
        // onomatopoeia
        T.taps.forEach((s, i) => ono('tap', BOX.cx - 120 + i * 120, 1050 - i * 14, t, s, { size: 40, color: LAV, life: 0.7, rise: 30, rot: (i - 1) * 0.12 }))
        ono('shhhhrrrk', BOX.cx - 20, 1000, t, T.peel[0] + 0.35, { size: 50, color: '#bfe6ff', life: 1.6, rise: 50, rot: -0.08 })
        ono('fwoomp', BOX.cx, 940, t, T.pop, { size: 62, color: GOLD, life: 1.0, rise: 60 })
        T.crick.forEach((c, i) => ono('chirp', 130 + i * 150, 640 - i * 60, t, c, { size: 40, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24 }))
        ono('shake shake', BOX.cx, 820, t, T.shake[0] + 0.05, { size: 46, color: LAV, life: 0.9, rise: 30, rot: 0.06 })
        ono('plip', PACKET_AT[0] + 150, PACKET_AT[1] - 70, t, T.drop[1], { size: 40, color: BONE, life: 0.8, rise: 26 })
        T.flips.forEach((f, i) => ono('flip', MAN.cx + 330, MAN.cy - 300 + i * 30, t, f, { size: 38, color: GOLD, life: 0.6, rise: 26 }))
        ono('sob', PIS_DESK[0] - 20, PIS_DESK[1] - 160, t, T.pisSob[0] + 0.1, { size: 40, color: '#9fd8ff', life: 0.9, rise: 30 })
        x.restore()
        // screen space
        drawRec(t)
        if (t >= T.pop && t < T.pop + 0.8) sparkleRing(t, BOX.cx, 1000, T.pop + 0.02, 14, 260, 0.3)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1000, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = '0'   // frame 0 already shows the scene (no fade from black under the hook)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (off in --social): 4.5 (hook → peel), 14.35 (specs → chemistry), 23.36 (manual → THE STARS),
// 29.22 (→ the LESSON, deal).
export const CUTS = [4.5, { t: T.cut1, kind: 'flip' }, 23.36, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Pitched SFX (pop, pluck, bell) are shifted into the score's key by the engine; chip cues sit on a private 'sfx'
//    bus and are written straight in B♭ major.
const B = { Bb3: 233.08, D4: 293.66, F4: 349.23, Bb4: 466.16, C5: 523.25, D5: 587.33, Eb5: 622.25, F5: 698.46, G5: 783.99, A5: 880, Bb5: 932.33, D6: 1174.66, F6: 1396.91, Bb6: 1864.66 }
const NOTE = [B.Bb4, B.C5, B.D5, B.F5, B.G5, B.Bb5, B.D6]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, B.D6, 0.05, 0], ['pluck', land, B.D6, 0.04, 0.6, 0]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.3, decay: 0.3 }], ['boom', t, 0.1], ['clap', t + 0.005, { ...FX, gain: 0.14 }], ['tick', t, 0.09]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const womp = t => [['chip', t, B.F4 * 2, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.045, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.36, B.D4 * 1.03, 0.8, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.045, decay: 0.3, sustain: 0.8 }]]
const tap = t => [['tick', t, 0.08], ['chip', t, 1800, 0.03, { ...FX, wave: 'noise', gain: 0.03, decay: 0.02, sustain: 0.2 }], ['pop', t + 0.005, 1400, 0.012, 0.2]]
const peel = (t0, t1) => { const out = []; for (let k = 0; t0 + k * 0.06 < t1; k++) out.push(['chip', +(t0 + k * 0.06).toFixed(3), 6000 + ((k * 37) % 7) * 500, 0.07, { ...FX, wave: 'noise', gain: 0.022 * (0.6 + 0.4 * Math.sin(k * 0.9)), decay: 0.04, sustain: 0.4 }]); return out }
const rattle = (t0, t1) => { const out = []; for (let k = 0; t0 + k * 0.065 < t1; k++) out.push(['tick', +(t0 + k * 0.065).toFixed(3), 0.05], ['pop', +(t0 + k * 0.065).toFixed(3), k % 2 ? 1100 : 900, 0.012, k % 2 ? 0.3 : -0.3]); return out }
const pageFlip = t => [['whoosh', t, 0.25, 0.04], ['chip', t + 0.05, 3000, 0.12, { ...FX, wave: 'noise', gain: 0.02, decay: 0.08, sustain: 0.3 }]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.035, f0: 900, f1: 2600 }]]; for (let k = 0; k < 10; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.06, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

const PITCH = { [NAME.vir]: 1050, [NAME.pis]: 1320, [NAME.stars]: 880 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // the opening (whisper-quiet; the old title's word-pops are removed)
  ...T.taps.flatMap(tap),
  // the peel
  ...head(T.h1, 2, T.h1Land, 2),
  ['whoosh', T.peel[0], 1.9, 0.03], ...peel(T.peel[0] + 0.05, T.peel[1] - 0.1), ['glitter', T.peel[1] - 0.3, T.peel[1] + 0.3],
  ['pop', T.pisUp[1], B.F5, 0.035, 0.5], ...sob(T.l3 + 0.7, B.D6),
  ['swell', T.lidLift[0], T.lidLift[1], { bus: 'sfx', gain: 0.025, f0: 200, f1: 900 }],
  ['whoosh', T.pop - 0.1, 0.5, 0.08], ['boom', T.pop, 0.12], ['pop', T.pop + 0.01, B.Bb5, 0.05, 0], ['glitter', T.pop, T.pop + 0.9], ['bell', T.pop + 0.05, B.D6, 0.03, 1.6, 0],
  // the specs
  ...head(T.h2, 1, T.h2Land, 4), ['whoosh', T.sheet[0], 0.4, 0.05],
  ...T.rows.slice(0, 3).flatMap((r, i) => [['tick', r, 0.06], ['pop', r + 0.02, NOTE[(i * 2) % 7], 0.035, 0.3], ['pluck', r + 0.37, NOTE[(i * 2 + 2) % 7] * 2, 0.025, 0.5, 0.4]]),
  ...[0, 1, 2, 3].map(i => ['pop', +(T.rows[1] + 0.2 + i * 0.13).toFixed(3), [B.Bb4, B.D5, B.F5, B.Bb5][i], 0.025, 0]),
  ...sob(T.same[0] + 0.15, B.Bb5),
  // the catch: CHEMISTRY · sold separately, the score winds down into silence
  ...head(T.h3, 2, T.h3Land, 1),
  ['tick', T.rows[3], 0.06], ['pop', T.rows[3] + 0.02, 311, 0.04, 0],
  ['tapeStop', T.hush[0], T.hush[1]],
  ...stamp(T.stampC),
  ...T.take.map(s => ['tick', s, 0.04]), ['whoosh', T.take[0], 0.15, 0.03],
  ...T.crick.flatMap(c => [...crickets(c), ...crickets(c + 0.2)]),
  ['whoosh', T.sheetOut[0], 0.3, 0.03], ['whoosh', T.flipBox[0], 0.3, 0.05],
  ...rattle(T.shake[0], T.shake[1]),
  ['pop', T.drop[1], 392, 0.04, 0], ['tick', T.drop[1], 0.07], ...womp(T.drop[1] + 0.25),
  ['whoosh', T.unflip[0], 0.3, 0.03],
  // the manual
  ...head(T.h4, 2, T.h4Land, 3), ['whoosh', T.man[0], 0.35, 0.05], ['pop', T.man[0] + 0.3, B.F5, 0.03, 0],
  ...T.flips.flatMap(pageFlip), ['pluck', T.flips[1] + 0.25, B.G5, 0.03, 0.8, 0], ['pop', T.flips[1] + 0.25, B.D5, 0.03, 0],
  ...sob(T.pisSob[0] + 0.1, B.D6), ...sob(T.pisSob[0] + 0.6, B.Bb5, 2),
  // THE STARS on the ring light
  ...head(T.h5, 4, T.h5Land, 2),
  ['glitter', T.starsIn[0], T.starsIn[1] + 0.3], ['bell', T.starsIn[1], B.F6, 0.03, 1.8, 0.3], ['pop', T.starsIn[1], B.D6, 0.03, 0.3],
  ['bell', T.soft, B.D6, 0.02, 1.6, -0.2], ...sob(T.soft + 0.3, B.Bb5, 2),
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // five stars. literally.
  ...head(T.h7, 2, T.h7Land, 0),
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.clip[0] + i * 0.07).toFixed(3), NOTE[i + 2], 0.02, 0.4]),
  ...T.pops.flatMap((s, i) => [['whoosh', s, 0.25, 0.04], ['pop', +(s + 0.4).toFixed(3), [B.Bb4, B.D5, B.F5, B.Bb5, B.D6][i], 0.045, (i - 2) * 0.25], ['bell', +(s + 0.42).toFixed(3), [B.Bb5, B.D6, B.F6, B.Bb6 / 2 * 2, B.Bb6][i], 0.018, 1.0, (i - 2) * 0.25]]),
  ...cheers(T.pops[4] + 0.4, T.pops[4] + 1.3), ...sob(T.pops[4] + 0.45, B.D6),
  ['pop', T.wink, B.Bb5, 0.03, 0],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
