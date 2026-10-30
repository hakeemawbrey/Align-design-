// stwizard — "Potion Class." (45 s vertical Align ad, Star Talk "Wild Lessons" #24, music: chiptune · G). Story 0–40.6,
// then the end card. A wizard-school parody with generic names, in the night sky, all pixel art.
//   0.0–4.6    "Gemini's brewing | a *love potion.*"  A classroom floats in the nebula: a chalkboard (POTIONS 101 · today:
//              love potions · rule 1: they don't work.), PROFESSOR SATURN (a ringed planet in a beard, half-moon glasses
//              and a wizard hat) asleep at his desk, ♓ Pisces in the back row with a tissue, and an ordinary wooden chair
//              in the corner. ♊ GEMINI in a pointy hat stirs a bubbling green cauldron with its wand.
//              GEMINI: "one sip and Taurus is *mine.*"
//   4.6–12.4   "Recipe says: | *two drops.*"  Rose petals (plop), a jar of moonlight (sparkle). The bottle floats in, labelled
//              2 DROPS ONLY. GEMINI: "label says two drops. *pfft.*" It tips the whole thing: *glug* *glug* *GLUG*…
//              KA-BLOOP: the cauldron erupts pink hearts, Gemini's hat flies off, Pisces sobs, Saturn snores through it.
//  12.55       card cut (flip).
//  12.6–17.7   "The taste *test.*"  ♉ TAURUS hops in. GEMINI: "taurus! try my... *juice.*" A goblet floats over; Taurus
//              sips (glug), POOF, its eyes spin… heart-eyes. Gemini opens its arms. Taurus's pupils drift… past Gemini…
//              to the chair. Record scratch, silence.
//  17.7–22.6   "It worked. | On a *chair.*"  Taurus floats over and hugs the chair; hearts pour off it.
//              TAURUS: "it's so... *supportive.*"  *mwah* *mwah*. GEMINI, flat-eyed: "I'm RIGHT *HERE.*" Pisces sobs.
//  22.6–25.4   "Professor Saturn | *wakes up.*"  SNORT. The rings spin up. SATURN: "you can't make anyone *feel* it."
//              He chalk-circles "rule 1: they don't work." on the board (it was there all along).
//  25.4–28.6   "The potion | *wears off.*"  pop. Taurus blinks at the chair, lets go (clunk), turns to Gemini:
//              TAURUS: "...you could've just *asked.*" Gemini blushes; a little heart pops between them.
//  28.7        card cut (deal) into ★ LESSON UNLOCKED: "You can't make | someone love you. | Let them *choose.*" (+1 FREE WILL)
//  33.3–37.3   "Card first. | Face *last.*"  A mystery card deals in and flips: GEMINI · AIR, face veiled, its line:
//              "Can't follow a recipe. Will talk to you for hours." SATURN: "let them pick the *real* you."
//  37.4–40.42  "Class *dismissed.*"  Saturn rings the hand bell (ding ding ding); Taurus hops back in still holding the
//              chair (it kept the chair); Pisces pops up sobbing. Everything pops out by 40.42; the end card at 40.6.
// One canvas (sky + world-space set and cast), DOM type + dialogue boxes + the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, lessonTimes, popText } from '../../lesson.js'
import { drawWizHat, drawWand, drawCauldron, drawBottle, drawJar, drawPetal, drawGoblet, drawChair, drawChalkboard, drawDesk,
  drawSaturn, drawBell, drawBubble, drawTear, drawPixelHeart, drawTissue, drawPuff } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', HOT = '#ff5fb0', LAV = '#c9a6ff', MINT = '#7dffb0', SKYBLUE = '#7fd0f0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'G'

const GEM = signStar('gemini'), TAU = signStar('taurus'), PIS = signStar('pisces')
const GEM_T = '#ffe27a', TAU_T = '#9be58a', SAT_T = '#e8c27a'

// ── the timeline
export const T = {
  black: [0, 0.3],
  // the hook
  h0: 0.12, h0Land: 0.9, h0Out: [4.4, 4.58], l1: 1.3,
  // the brew
  h1: 4.66, bang1: BEAT(8),                                     // 5.044: the drop
  petal: [5.2, 5.7], l2: 5.5, jar: [6.25, 6.55], pour: [6.7, 7.45], jarOut: [7.5, 7.7],
  bottle: [7.85, 8.15], l3: 8.5, tip: [9.15, 9.42], glugs: [BEAT(16), BEAT(17), BEAT(18)], boom: BEAT(19),   // 11.156
  close1: 12.2, h1Out: [12.2, 12.4],
  cut1: 12.55,
  // the taste test
  h2: 12.62, h2Land: 12.95, tauIn: [12.6, 13.1], l4: 13.3,
  gob: [14.7, 15.15], sip: [15.2, 15.75], poof: 15.85, spiral: [15.85, 16.45], heart: 16.45, open: 16.6, drift: [17.0, 17.45],
  scratch: 17.55, h2Out: [17.4, 17.55],
  // it worked. on a chair.
  glide: [17.7, 18.2], h3: 17.75, h3Land: BEAT(32),             // 18.378
  l5: 18.5, smooch: [20.0, 20.45], l6: 21.0, flat: 21.0,
  h3Out: [22.5, 22.65],
  // Saturn wakes
  snort: 22.62, wake: BEAT(40), h4: 22.7, h4Land: 23.05,        // 22.822
  l7: 23.35, circle: [24.65, 25.15], h4Out: [25.3, 25.45],
  // the potion wears off
  wear: 25.5, h5: 25.52, h5Land: 25.85, letgo: 25.8, l8: 26.1, blush: 27.25, close2: 28.65, h5Out: [28.5, 28.65],
  cut2: 28.7,
  // the lesson
  lesson: BEAT(51), lessonOut: [33.1, 33.3],                    // 28.933
  strike: 28.7,
  // card first, face last
  h6: 33.35, h6Land: 33.7, deal: [33.15, 33.55], flip: [33.55, 33.9], l9: 34.2, quote: 35.4, close3: 36.8, h6Out: [37.1, 37.28],
  // class dismissed
  h7: 37.42, h7Land: BEAT(66), bells: [37.65, 38.1, 38.55], tauBack: 37.55, pisUp: 37.8, out: [40.02, 40.42], h7Out: [40.18, 40.42],
}

// ── the lines
const SG = `${GEM.glyph}︎ GEMINI`, ST = `${TAU.glyph}︎ TAURUS`, SS = 'PROF. SATURN'
const LINES1 = [
  { t: T.l1, speaker: SG, color: GEM_T, text: 'one sip and Taurus is *mine.*' },
  { t: T.l2, speaker: SG, color: GEM_T, text: 'rose petals. a pinch of *moonlight.*' },
  { t: T.l3, speaker: SG, color: GEM_T, text: 'label says two drops. *pfft.*' },
]
const LINES2 = [
  { t: T.l4, speaker: SG, color: GEM_T, text: 'taurus! try my... *juice.*' },
  { t: T.l5, speaker: ST, color: TAU_T, text: "it's so... *supportive.*" },
  { t: T.l6, speaker: SG, color: GEM_T, text: "I'm RIGHT *HERE.*" },
  { t: T.l7, speaker: SS, color: SAT_T, text: "you can't make anyone *feel* it." },
  { t: T.l8, speaker: ST, color: TAU_T, text: "...you could've just *asked.*" },
]
const LINES3 = [{ t: T.l9, speaker: SS, color: SAT_T, text: 'let them pick the *real* you.' }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })
const HOPS = {
  gem: [...talkHops(LINES1, SG, { cps: CPS }), ...talkHops(LINES2, SG, { cps: CPS })],
  tau: talkHops(LINES2, ST, { cps: CPS }),
}

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'You can’t make | someone love you. | Let them *choose.*', chip: '+1 FREE WILL', accentColor: PINK, dim: 0.6 }
export const LESSON_END = lessonTimes(LESSON).end

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })

// ── where things are
const BOARD = { cx: 430, cy: 640, w: 680, h: 250 }
const SAT_P = { x: 862, y: 800, c: 6 }
const DESK = { cx: 862, y: 925, w: 310, h: 84 }
const PIS_P = [112, 945, 140], PDESK = { cx: 112, y: 1008, w: 160, h: 44 }
const POT = { cx: 555, by: 1462, px: 9 }
const POT_TOP = POT.by - 21 * POT.px                    // the liquid's surface
const GEM_P = [240, 1268, 280], GEM_TIE = [175, 1240, 240]
const TAU_P = [830, 1262, 260], TAU_HUG = [872, 1268, 255], TAU_END = [860, 1262, 240]
const CHAIR = { x: 992, by: 1452, px: 8 }
const CARD = { cx: 640, cy: 1010, w: 460, h: 660 }
const SEED = { gem: 5, tau: 11, pis: 23 }

// ── moods
const GEM_K = [
  [0, S_('squint', [1, 1])], [T.l1, S_('wink', [1, 0])], [2.6, S_('squint', [1, 1])],
  [T.bang1, S_('happy', [1, 1])], [T.petal[1], S_('squint', [1, 1])], [T.l2, S_('happy', [1, 0])], [T.jar[0], S_('squint', [1, 0])],
  [T.bottle[0], S_('neutral', [1, -1])], [T.l3, S_('squint', [0, 0])], [9.8, S_('wink', [1, -1])], [T.glugs[2], S_('wide', [1, -1], { blink: false })],
  [T.boom, S_('wide', [1, -1], { blink: false, sq: -0.08 })], [T.boom + 0.6, S_('neutral', [1, 0], { blink: 0.5, sq: 0.05, dy: 6 })],
  [T.cut1, S_('neutral', [1, 0])], [T.tauIn[1], S_('heart', [1, 0])], [T.l4, S_('happy', [1, 0])], [T.gob[0], S_('squint', [1, 0])],
  [T.heart, S_('wide', [1, 0], { blink: false })], [T.open, S_('heart', [1, 0], { sq: -0.05 })], [T.drift[1], S_('neutral', [1, 0], { blink: false })],
  [T.scratch, S_('wide', [1, 0], { blink: false, sq: -0.06 })], [18.6, S_('neutral', [1, 0], { blink: 0.5 })],
  [T.flat, S_('neutral', [1, 0], { blink: 0.55, sq: 0.06 })], [T.wake, S_('wide', [1, -1], { blink: false })], [T.l7 + 0.4, S_('neutral', [1, -1])],
  [T.wear, S_('wide', [1, 0], { blink: false })], [T.l8 + 0.5, S_('neutral', [1, 0])], [T.blush, S_('sparkle', [1, 0])],
  [T.strike, S_('neutral', [0, -1])], [T.lesson + 1.2, S_('sparkle', [0, -1])], [T.lessonOut[0], S_('neutral', [1, 0])],
  [T.flip[1], S_('wide', [1, 0])], [T.quote, S_('sparkle', [1, 0])], [T.h7, S_('happy', [0, 0])], [38.9, S_('sparkle', [1, 0])],
]
const TAU_K = [
  [0, S_('neutral', [-1, 0])], [T.tauIn[1], S_('happy', [-1, 0])], [T.l4 + 0.6, S_('neutral', [-1, 0])], [T.gob[0], S_('wide', [-1, -1], { blink: false })],
  [T.sip[0], S_('happy', [0, 0])], [T.poof, S_('wide', [0, 0], { blink: false })], [T.heart, S_('heart', [-1, 0])],
  [T.drift[0], S_('heart', [0, 0])], [T.drift[0] + 0.2, S_('heart', [1, 0])], [T.glide[1], S_('heart', [1, 1], { sq: 0.05 })],
  [T.wear, S_('wide', [1, 1], { blink: false })], [T.letgo, S_('neutral', [1, 1], { blink: 0.4 })], [T.l8 - 0.1, S_('neutral', [-1, 0])], [T.l8 + 0.9, S_('happy', [-1, 0])],
  [T.tauBack, S_('happy', [-1, 0])], [38.6, S_('heart', [1, 1])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "600 32px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Gemini’s brewing | a *love potion.*', { top: 150, size: 98, accentSize: 140, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: PINK, fit: true })
  const H1 = popText(root, 'Recipe says: | *two drops.*', { top: 150, size: 104, accentSize: 150, at: T.h1, late: 2, lateAt: T.bang1, wobble: true, accentColor: MINT, fit: true })
  const H2 = popText(root, 'The taste *test.*', { top: 190, size: 118, accentSize: 164, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, fit: true })
  const H3 = popText(root, 'It worked. | On a *chair.*', { top: 150, size: 108, accentSize: 160, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, fit: true })
  const H4 = popText(root, 'Professor Saturn | *wakes up.*', { top: 150, size: 96, accentSize: 140, at: T.h4, late: 2, lateAt: T.h4Land, wobble: true, accentColor: SAT_T, fit: true })
  const H5 = popText(root, 'The potion | *wears off.*', { top: 150, size: 104, accentSize: 150, at: T.h5, late: 2, lateAt: T.h5Land, wobble: true, accentColor: LAV, fit: true })
  const H6 = popText(root, 'Card first. | Face *last.*', { top: 150, size: 108, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK, fit: true })
  const H7 = popText(root, 'Class *dismissed.*', { top: 190, size: 112, accentSize: 160, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1478, width: 960, height: 290, open: T.l4 - 0.24, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: 1478, width: 960, height: 290, open: T.l9 - 0.24, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    if (t < T.h0Out[0]) { s = 1 + 0.03 * ease.inOutQuad(prog(t, 0.3, 4.3)); fy = 1040 }
    else if (t < T.cut1) { s = 1 + 0.035 * bump(t, T.boom, 0.45) + 0.012 * T.glugs.reduce((a, g) => a + bump(t, g, 0.25), 0) }
    else if (t < T.h4) {
      // push toward Taurus as its pupils drift to the chair, hold through the hug
      const k = ease.inOutCubic(prog(t, T.drift[0], T.scratch)) * (1 - ease.inOutCubic(prog(t, 21.6, T.h4)))
      s = 1 + 0.04 * k; fx = lerp(540, 580, k); fy = lerp(1000, 1070, k)
    } else if (t < T.cut2) {
      const k = ease.inOutCubic(prog(t, T.wake - 0.1, T.wake + 0.5)) * (1 - ease.inOutCubic(prog(t, 24.9, T.wear)))
      s = 1 + 0.05 * k; fx = lerp(540, 660, k); fy = lerp(1000, 920, k)
    }
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.boom, 22], [T.bang1, 8], [T.scratch, 6], [T.snort, 8], [T.letgo + 0.2, 5]]) { const k = t - t0; if (k >= 0 && k < 0.35) a = Math.max(a, amp * (1 - k / 0.35)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

  // ── little canvas helpers
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 40, ticks = true } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.92)'; x.strokeText(text, 0, 0)
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
  function sparkleRing(t, cx, cy, t0, n, R, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
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
  /** hearts floating up from (cx, cy) between t0 and t1 */
  function heartStream(cx, cy, t, t0, t1, { gap = 0.22, spread = 90, px = 5, col = '#ff4f7e', life = 1.3 } = {}) {
    if (t < t0) return
    const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
    for (let k = k0; k <= k1; k++) {
      const a = t - (t0 + k * gap)
      if (a < 0 || a > life) continue
      const hx = cx + (((k * 0.618) % 1) - 0.5) * spread + Math.sin(a * 5 + k) * 10, hy = cy - a * 150
      x.save(); x.globalAlpha = 1 - prog(a, life * 0.6, life); drawPixelHeart(x, hx, hy, px * (0.7 + 0.3 * easeOutBack(prog(a, 0, 0.2))), k % 3 === 2 ? PINK : col); x.restore()
    }
  }

  // ── a star character
  function star(id, P, t, st, { pop = 1, hops = [], alpha = 1, rot = 0 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = { gem: GEM, tau: TAU, pis: PIS }[id]
    x.save()
    if (rot) { x.translate(px0, py0 + sz * 0.4); x.rotate(rot); x.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: col.color, glyph: sz >= 120 ? col.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, bob: sz * 0.03, alpha })
    x.restore()
    return { ...r, c: r.size / 36 }
  }

  // ── the classroom (board, Saturn + desk, Pisces + desk)
  const circleK = t => prog(t, ...T.circle)
  function drawBoard(t) {
    const { cx, cy, w, h } = BOARD
    drawChalkboard(x, cx, cy, w, h)
    x.textAlign = 'left'; x.textBaseline = 'middle'
    const L = cx - w / 2 + 36
    x.fillStyle = 'rgba(250,246,236,0.95)'; x.font = `700 46px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.fillText('POTIONS 101', L, cy - 70)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.fillStyle = 'rgba(250,246,236,0.35)'; x.fillRect(L, cy - 38, 340, 4)
    x.fillStyle = 'rgba(250,246,236,0.85)'; x.font = `700 35px ${MONO}`
    x.fillText('today: love potions', L, cy + 4)
    x.fillStyle = 'rgba(255,170,200,0.95)'
    x.fillText('rule 1: they don’t work.', L, cy + 62)
    // Saturn's chalk circle (the callback)
    const k = circleK(t)
    if (k > 0) {
      const tw = x.measureText('rule 1: they don’t work.').width
      x.strokeStyle = 'rgba(255,240,170,0.95)'; x.lineWidth = 6; x.lineCap = 'round'
      x.beginPath(); x.ellipse(L + tw / 2, cy + 62, tw / 2 + 26, 34, -0.03, -2.0, -2.0 + Math.PI * 2.15 * k); x.stroke()
      if (k >= 1) { const u = prog(t, T.circle[1], T.circle[1] + 0.25); x.fillStyle = 'rgba(255,240,170,0.95)'; x.font = `700 46px ${MONO}`; x.globalAlpha = u; x.fillText('!!', L + tw + 30, cy + 46); x.globalAlpha = 1 }
    }
  }
  function satState(t) {
    if (t < T.snort) return { eyes: 'sleep', mouth: 'snore', zzz: true, brows: 0 }
    if (t < T.wake) return { eyes: 'wide', mouth: 'o', brows: 1, look: [0, 0] }
    if (t < T.l7) return { eyes: 'wide', mouth: 'flat', brows: 1, look: [-1, 1] }
    if (t < T.circle[0]) return { eyes: 'open', mouth: 'flat', look: [-1, 1], brows: 0.3 }
    if (t < T.wear) return { eyes: 'open', mouth: 'flat', look: [-1, -1], brows: 0.5 }
    if (t < T.blush) return { eyes: 'open', mouth: 'flat', look: [-1, 1], brows: 0 }
    if (t < T.l9) return { eyes: 'happy', mouth: 'smile', brows: 0 }
    if (t < T.bells[0] - 0.1) return { eyes: 'open', mouth: 'smile', look: [-1, 1], brows: 0.2 }
    return { eyes: 'happy', mouth: 'o', brows: 1 }
  }
  function drawProf(t) {
    const st = satState(t)
    const jump = 40 * bump(t, T.snort, 0.35)
    // the rings spin up when he wakes, then settle
    const spin = t * 0.6 + 14 * ease.outCubic(prog(t, T.snort, T.wake + 1.4))
    const wob = t < T.snort ? 0.05 * Math.sin(t * 1.6) : 0
    drawSaturn(x, SAT_P.x, SAT_P.y - jump + Math.sin(t * 1.4) * 4, SAT_P.c, t, { ...st, spin, hatRot: -0.12 + wob - 0.25 * bump(t, T.snort, 0.5) })
    // the chalk: during "rule 1" his chalk flies over to the board
    drawDesk(x, DESK.cx, DESK.y, DESK.w, DESK.h, { books: true })
    // the hand bell for class dismissed
    if (t >= T.bells[0] - 0.4 && t < T.out[1]) {
      const k = pop01(t, T.bells[0] - 0.4, 0.3) * popOut(t, T.out)
      let rot = 0
      for (const b of T.bells) rot += 0.6 * Math.sin((t - b) * 22) * Math.exp(-(t - b) * 5) * (t >= b ? 1 : 0)
      x.save(); x.translate(SAT_P.x - 130, SAT_P.y + 10); x.scale(k, k); drawBell(x, 0, 0, 7, rot); x.restore()
      T.bells.forEach((b, i) => ono(i === 2 ? '*DING!*' : '*ding*', SAT_P.x - 150 + i * 30, SAT_P.y - 40 - i * 30, t, b, { size: 44 + i * 6, color: GOLD, life: 0.8, rise: 30 }))
    }
    if (t >= T.snort - 0.05 && t < T.snort + 0.9) ono('*SNORT!*', SAT_P.x, SAT_P.y - 160, t, T.snort, { size: 50, color: BONE, life: 0.9, rise: 26 })
  }
  function drawPisces(t) {
    let up = 1
    if (t >= T.strike && t < T.out[1]) up = 0           // off during lesson / tie-in / end (it pops up front for the last line)
    if (up <= 0) return
    const P = [...PIS_P]
    const cry = [[T.boom + 0.2, T.boom + 2.2], [T.l5 + 0.2, T.l6 + 0.6], [T.blush, T.cut2]]
    const crying = cry.some(([a, b]) => t >= a && t < b)
    const st = crying ? S_('sparkle', [1, 0]) : S_('neutral', [1, 0], { blink: 0.3 })
    const r = star('pis', P, t, st, { hops: [T.boom + 0.15, T.boom + 0.7, T.l5 + 0.3, T.blush + 0.1] })
    drawDesk(x, PDESK.cx, PDESK.y, PDESK.w, PDESK.h)
    if (!r) return
    drawWizHat(x, r.x + r.c, r.top + r.c * 4.5, r.c * 0.9, { color: '#2e6fd6', light: '#6aa8ff', band: '#9be0ff', rot: 0.1 })
    drawTissue(x, r.x - r.size * 0.42, r.y + r.size * 0.05, Math.max(3, r.c * 0.8), t)
    for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: 0.09, spread: 0.8 })
    if (!crying && Math.floor(t * 0.9) % 2 === 0) drawTear(x, r.x + r.size * 0.13, r.y + r.size * 0.12 + ((t * 0.8) % 1) * 18, Math.max(3, r.c * 0.75))
  }

  // ── the cauldron, ingredients, the bottle, the goblet
  const struck = t => t >= T.strike
  function liqColor(t) { return t < T.boom ? ['#5fd38a', '#b6ffcf'] : ['#ff5fb0', '#ffd0e8'] }
  function drawPot(t) {
    if (struck(t)) return
    const [liq, hi] = liqColor(t)
    const jig = bump(t, T.boom, 0.4) * 0.08
    x.save(); x.translate(POT.cx, POT.by); x.scale(1 + jig, 1 - jig); x.translate(-POT.cx, -POT.by)
    drawCauldron(x, POT.cx, POT.by, POT.px, t, { liq, liqHi: hi })
    x.restore()
    // bubbles (green circles before, hearts after the boom)
    for (let k = 0; k < 6; k++) {
      const ph = ((t * 0.7 + k * 0.17) % 1), bx = POT.cx + (((k * 0.618) % 1) - 0.5) * 200, by = POT_TOP - 12 - ph * 120
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
      if (t < T.boom) { x.fillStyle = hi; x.fillRect(Math.round(bx), Math.round(by), 12, 12); x.fillStyle = liq; x.fillRect(Math.round(bx) + 3, Math.round(by) + 3, 6, 6) }
      else drawPixelHeart(x, bx, by, 4, k % 2 ? HOT : PINK)
      x.restore()
    }
  }
  function drawIngredients(t) {
    // the petal falls in
    if (inW(t, T.petal[0], T.petal[1] + 0.05)) {
      const p = prog(t, ...T.petal)
      drawPetal(x, POT.cx - 40 + Math.sin(p * 9) * 40, lerp(780, POT_TOP - 10, ease.inQuad(p)), 7, Math.sin(p * 7) * 0.8)
    }
    ono('*plop*', POT.cx - 90, POT_TOP - 60, t, T.petal[1], { size: 40, color: PINK, life: 0.8, rise: 24 })
    // the moonlight jar pours sparkles
    if (inW(t, T.jar[0], T.jarOut[1])) {
      const k = pop01(t, T.jar[0], 0.3) * (1 - ease.inCubic(prog(t, ...T.jarOut)))
      const tilt = 1.9 * ease.inOutCubic(prog(t, T.pour[0] - 0.1, T.pour[0] + 0.2))
      x.save(); x.translate(POT.cx + 90, POT_TOP - 170); x.rotate(tilt); x.scale(k, k); drawJar(x, 0, 0, 8, t); x.restore()
      if (inW(t, ...T.pour)) for (let i = 0; i < 6; i++) {
        const ph = ((t - T.pour[0]) * 2.2 + i / 6) % 1
        drawPixelStar(x, POT.cx + 50 + Math.sin(ph * 8 + i) * 18, POT_TOP - 150 + ph * 140, 22, i % 2, i % 2 ? '#eaf4ff' : GOLD)
      }
    }
    // the bottle: floats in, tips, glugs, gets blown away by the boom
    if (inW(t, T.bottle[0], T.boom + 0.6)) {
      const k = pop01(t, T.bottle[0], 0.32)
      let bx = POT.cx + 30, by = POT_TOP - 210 + Math.sin(t * 3) * 6, rot = 0.08 * Math.sin(t * 2)
      rot += 2.2 * ease.inOutCubic(prog(t, ...T.tip))
      for (const g of T.glugs) rot += 0.18 * bump(t, g, 0.25)
      if (t >= T.boom) { const f = t - T.boom; bx += f * 900; by -= f * 700 - 900 * f * f; rot += f * 18 }
      x.save(); x.translate(bx, by); x.scale(k, k); drawBottle(x, 0, 0, 9, rot); x.restore()
      // the tag: 2 DROPS ONLY
      if (t < T.boom) {
        const tk = pop01(t, T.bottle[0] + 0.15, 0.3)
        x.save(); x.translate(bx + 150, by - 70); x.rotate(0.1); x.scale(tk, tk)
        x.fillStyle = '#1a1030'; x.fillRect(-118, -38, 236, 76); x.fillStyle = '#fbf3e2'; x.fillRect(-113, -33, 226, 66)
        x.fillStyle = '#c0213f'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2 DROPS', 0, -10)
        x.font = `700 20px ${MONO}`; x.fillStyle = '#2a1846'; x.fillText('ONLY. SERIOUSLY.', 0, 18)
        x.restore()
        // the pour
        if (t >= T.tip[1]) {
          x.fillStyle = HOT
          const sx = bx - 40, sy = by + 40
          x.fillRect(Math.round(sx - 7), Math.round(sy), 14, Math.round(POT_TOP - sy))
          x.fillStyle = '#ffd0e8'; x.fillRect(Math.round(sx - 3), Math.round(sy), 4, Math.round(POT_TOP - sy))
        }
      }
    }
    T.glugs.forEach((g, i) => ono(i === 2 ? '*GLUG!*' : '*glug*', [POT.cx - 170, POT.cx + 200, POT.cx - 150][i], [POT_TOP - 120, POT_TOP - 200, POT_TOP - 250][i], t, g, { size: 44 + i * 10, color: PINK, rot: [-0.12, 0.1, -0.06][i], life: 0.9, rise: 24 }))
    // KA-BLOOP
    const f = t - T.boom
    if (f >= 0 && f < 1.6) {
      for (let i = 0; i < 7; i++) {
        const a = -Math.PI / 2 + (i - 3) * 0.42, d = 60 + 260 * ease.outCubic(Math.min(1, f / 0.8))
        drawPuff(x, POT.cx + Math.cos(a) * d * 1.1, POT_TOP - 30 + Math.sin(a) * d * 0.9, (50 + i % 3 * 16) * (1 - 0.3 * f), i % 2 ? '#ffb3d9' : '#ff8fc8', 0.92 * (1 - prog(f, 0.9, 1.6)))
      }
      for (let i = 0; i < 12; i++) {
        const a = -Math.PI / 2 + (((i * 0.618) % 1) - 0.5) * 2.6, v = 520 + (i % 4) * 120
        const hx = POT.cx + Math.cos(a) * v * f, hy = POT_TOP + Math.sin(a) * v * f + 520 * f * f
        x.save(); x.globalAlpha = 1 - prog(f, 1.0, 1.6); drawPixelHeart(x, hx, hy, 6 + (i % 3) * 2, i % 2 ? HOT : '#ff4f7e'); x.restore()
      }
      ono('*KA-BLOOP!*', POT.cx, POT_TOP - 260, t, T.boom, { size: 74, color: '#ffd0e8', life: 1.2, rise: 30 })
    }
  }
  function drawGob(t) {
    if (t < T.gob[0] || t >= T.poof) return
    const p = prog(t, ...T.gob), e = ease.inOutCubic(p)
    const P = tauPlace(t)
    const gx0 = POT.cx, gy0 = POT_TOP - 20, gx1 = P[0] - 110, gy1 = P[1] + 40
    let gxx = lerp(gx0, gx1, e), gyy = lerp(gy0, gy1, e) - Math.sin(p * Math.PI) * 150
    if (t >= T.sip[0]) { const s = prog(t, ...T.sip); gxx = gx1 + 30 * s; gyy = gy1 - 30 * Math.sin(s * Math.PI) }
    x.save(); x.translate(gxx, gyy); x.rotate(t >= T.sip[0] ? -0.8 * Math.sin(prog(t, ...T.sip) * Math.PI) : 0); drawGoblet(x, 0, 0, 7); x.restore()
    if (inW(t, ...T.gob)) sparkleRing(t, gxx, gyy - 40, T.gob[0], 6, 60, 0.4, 0.5)
  }

  // ── Gemini
  function gemPlace(t) {
    let P = [...GEM_P]
    const f = t - T.boom
    if (f >= 0 && f < 1.2) P[0] -= 60 * Math.sin(Math.min(1, f / 0.25) * Math.PI / 2) * (1 - prog(f, 0.5, 1.2))
    if (t >= T.strike) {
      if (t < T.lessonOut[0]) P = [...GEM_TIE]
      else P = [...GEM_TIE]
    }
    return P
  }
  function hatFly(t) {   // Gemini's hat: blown off by the boom, lands back crooked
    const f = t - T.boom
    if (f < 0) return { dx: 0, dy: 0, rot: -0.1 }
    if (f < 1.1) { const p = f / 1.1; return { dx: -40 * Math.sin(p * Math.PI), dy: -300 * Math.sin(p * Math.PI), rot: -0.1 + p * Math.PI * 4 } }
    return { dx: 0, dy: 0, rot: t < T.cut1 ? 0.45 : -0.1 }
  }
  function drawGemini(t) {
    const P = gemPlace(t)
    const st = keyed(t, GEM_K)
    let sq = st.sq || 0
    for (const g of T.glugs) sq += 0.06 * bump(t, g, 0.25)
    const hops = [...HOPS.gem, T.bang1, T.open, T.open + 0.55, T.blush + 0.05, T.h7Land + 0.05, 38.9, 39.5, T.lessonOut[0] + 0.3]
    const k = popOut(t, T.out)
    const r = star('gem', P, t, { ...st, sq }, { pop: k, hops })
    if (!r) return null
    const hf = hatFly(t)
    drawWizHat(x, r.x + r.c + hf.dx, r.top + r.c * 4.5 + hf.dy, r.c * 0.95, { color: '#6a45d6', light: '#9d7cff', band: '#ffd23f', rot: hf.rot, alpha: clamp(k) })
    // the wand: stirring the pot, pointing at the bottle, raised in triumph
    if (t < T.strike) {
      let rot = -0.35 + 0.35 * Math.sin(t * 5.2)
      if (inW(t, T.bottle[0], T.boom)) rot = -0.75 + 0.06 * Math.sin(t * 20)
      if (inW(t, T.boom, T.cut1)) rot = 0.9
      if (inW(t, T.cut1, T.gob[1])) rot = -0.5 + 0.05 * Math.sin(t * 8)
      if (inW(t, T.open, T.scratch)) rot = -1.4
      if (t >= T.scratch) rot = 1.2 + 0.05 * Math.sin(t * 2)
      drawWand(x, r.x + r.size * 0.38, r.y + r.size * 0.06, Math.max(3, r.c * 0.7), rot)
      if (inW(t, T.bottle[0], T.boom) || inW(t, ...T.gob)) {
        const tx = r.x + r.size * 0.38 + Math.cos(rot) * r.c * 10, ty = r.y + r.size * 0.06 + Math.sin(rot) * r.c * 10
        drawPixelStar(x, tx, ty, 20 + 8 * Math.sin(t * 14), 1, GOLD)
      }
    }
    // soot after the boom
    if (inW(t, T.boom, T.cut1)) { x.save(); x.globalAlpha = 0.5 * (1 - prog(t, T.boom + 0.8, T.cut1)); x.fillStyle = '#2a1838'; for (const [dx, dy] of [[-0.2, -0.1], [0.15, 0.05], [-0.05, 0.2], [0.25, -0.2]]) x.fillRect(r.x + dx * r.size, r.y + dy * r.size, r.c * 3, r.c * 2); x.restore() }
    if (t >= T.blush && t < T.strike) heartStream(r.x + 20, r.top - 10, t, T.blush, T.blush + 0.01, { px: 7 })
    return r
  }

  // ── Taurus
  function tauPlace(t) {
    if (t < T.tauIn[0]) return null
    if (t < T.tauIn[1]) { const p = prog(t, ...T.tauIn), e = ease.outCubic(p); return [lerp(1260, TAU_P[0], e), TAU_P[1] - Math.sin(p * Math.PI) * 140, TAU_P[2]] }
    if (t < T.glide[0]) return TAU_P
    if (t < T.glide[1]) { const p = prog(t, ...T.glide), e = ease.inOutCubic(p); return [lerp(TAU_P[0], TAU_HUG[0], e), lerp(TAU_P[1], TAU_HUG[1], e) - Math.sin(p * Math.PI) * 50, TAU_HUG[2]] }
    if (t < T.strike) return TAU_HUG
    if (t < T.tauBack) return null
    const p = prog(t, T.tauBack, T.tauBack + 0.5), e = ease.outCubic(p)
    return [lerp(1300, TAU_END[0], e), TAU_END[1] - Math.sin(p * Math.PI) * 120, TAU_END[2]]
  }
  function drawTaurus(t) {
    const P = tauPlace(t)
    if (!P) return
    let st = keyed(t, TAU_K)
    // the spiral: pupils whirl
    if (inW(t, ...T.spiral)) { const a = (t - T.spiral[0]) * 26; st = { ...st, look: [Math.cos(a), Math.sin(a)] } }
    let sq = st.sq || 0
    if (inW(t, T.glide[1], T.wear)) sq += 0.05 * Math.sin(t * 7)        // snuggling the chair
    for (const s of [T.smooch[0], T.smooch[1]]) sq += 0.1 * bump(t, s, 0.2)
    const hops = [...HOPS.tau, T.tauIn[1], T.heart, T.wear, T.l8 + 0.9, T.tauBack + 0.5, 38.6, 39.3]
    const k = t >= T.tauBack ? popOut(t, T.out) : 1
    const r = star('tau', P, t, { ...st, sq }, { pop: k, hops })
    if (!r) return
    drawWizHat(x, r.x + r.c, r.top + r.c * 4.5, r.c * 0.9, { color: '#2f8a3e', light: '#62c46f', band: '#ffd23f', rot: 0.12, alpha: clamp(k) })
    if (t >= T.poof && t < T.poof + 0.9) {
      const f = t - T.poof
      for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; drawPuff(x, r.x + Math.cos(a) * (40 + f * 120), r.y + Math.sin(a) * (30 + f * 80), 46 * (1 - f * 0.6), i % 2 ? '#ffb3d9' : '#ffd0e8', 0.9 * (1 - f / 0.9)) }
      ono('*POOF*', r.x, r.top - 40, t, T.poof, { size: 52, color: '#ffd0e8', life: 0.9, rise: 24 })
    }
    if (t >= T.sip[0] + 0.1 && t < T.sip[1] + 0.5) ono('*gulp*', r.x - 140, r.top + 20, t, T.sip[0] + 0.15, { size: 40, color: BONE, life: 0.8, rise: 20 })
    if (t >= T.wear && t < T.wear + 0.6) { sparkleRing(t, r.x, r.y, T.wear, 8, 140, 0.2, 0.6); ono('*pop*', r.x, r.top - 30, t, T.wear, { size: 44, color: LAV, life: 0.8, rise: 20 }) }
    // the hug: hearts pour off it, smooches
    if (t >= T.glide[1] && t < T.wear) heartStream(r.x + 40, r.top + 10, t, T.glide[1], T.wear - 0.4, { gap: 0.2, spread: 140, px: 6 })
    ;[T.smooch[0], T.smooch[1]].forEach((s, i) => ono('*mwah*', CHAIR.x - 40 + i * 50, CHAIR.by - 270 - i * 40, t, s, { size: 42, color: PINK, rot: [-0.1, 0.12][i], life: 0.9, rise: 26 }))
    if (inW(t, T.heart, T.drift[1])) heartStream(r.x, r.top, t, T.heart, T.drift[1], { gap: 0.25, spread: 60, px: 5 })
  }
  function drawTheChair(t) {
    if (t >= T.strike && t < T.tauBack) return
    let cx = CHAIR.x, by = CHAIR.by, rot = 0, k = 1
    if (inW(t, T.glide[1], T.wear)) { rot = 0.04 * Math.sin(t * 7); by -= 6 * Math.abs(Math.sin(t * 7)) }         // getting squeezed
    if (inW(t, T.letgo, T.letgo + 0.35)) { const p = prog(t, T.letgo, T.letgo + 0.35); by -= 40 * Math.sin(p * Math.PI); rot = -0.15 * Math.sin(p * Math.PI) }
    if (t >= T.tauBack) {      // carried back in, hugged under Taurus's point
      const P = tauPlace(t); if (!P) return
      k = popOut(t, T.out); cx = P[0] + 95; by = P[1] + 185 + 4 * Math.sin(t * 6); rot = 0.08
    }
    x.save(); x.translate(cx, by); x.scale(k, k); drawChair(x, 0, 0, CHAIR.px, { rot }); x.restore()
    if (inW(t, T.letgo + 0.3, T.letgo + 1.0)) ono('*clunk*', CHAIR.x - 10, CHAIR.by - 220, t, T.letgo + 0.3, { size: 38, color: BONE, life: 0.7, rise: 18 })
  }

  // ── the mystery card (tie-in)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardBack(w, h) {
    rr(-w / 2, -h / 2, w, h, 34)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#6a3fd0'); g.addColorStop(1, '#3a1d86')
    x.fillStyle = g; x.fill(); x.lineWidth = 6; x.strokeStyle = 'rgba(255,240,200,0.9)'; x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3
    const r0 = w * 0.13
    x.beginPath(); x.arc(0, 0, r0, 0, Math.PI * 2); x.stroke()
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.arc(Math.cos(a) * r0, Math.sin(a) * r0, r0, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.arc(0, 0, r0 * 2, 0, Math.PI * 2); x.stroke()
  }
  function cardFace(w, h, t) {
    const L = -w / 2, Tp = -h / 2
    x.save(); x.shadowColor = 'rgba(180,108,255,0.55)'; x.shadowBlur = 60
    rr(L, Tp, w, h, 34); x.fillStyle = '#150c2c'; x.fill(); x.restore()
    const gr = x.createLinearGradient(L, Tp, L + w, Tp + h); gr.addColorStop(0, '#ffd27a'); gr.addColorStop(0.35, '#ff6fb5'); gr.addColorStop(0.7, '#b46cff'); gr.addColorStop(1, '#7fd0f0')
    x.lineWidth = 7; x.strokeStyle = gr; rr(L, Tp, w, h, 34); x.stroke()
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Mystery card', L + 34, Tp + 74)
    const pulse = 0.65 + 0.35 * Math.sin(t * 5)
    x.save(); x.shadowColor = '#b46cff'; x.shadowBlur = 20 + 22 * pulse
    x.beginPath(); x.arc(-L - 58, Tp + 58, 30, 0, Math.PI * 2); x.fillStyle = '#b46cff'; x.fill(); x.restore()
    x.font = `700 36px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
    x.fillText('♊︎', -L - 58, Tp + 61)
    const ax = L + 26, ay = Tp + 100, aw = w - 52, ah = 230
    x.save(); rr(ax, ay, aw, ah, 20); x.clip()
    const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
    g.addColorStop(0, '#ff6fb5'); g.addColorStop(0.45, '#b46cff'); g.addColorStop(1, '#2a1a6e')
    x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
    x.fillStyle = 'rgba(26,14,48,0.4)'; x.filter = 'blur(14px)'
    x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.15, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.02, aw * 0.34, ah * 0.36, 0, 0, Math.PI * 2); x.fill()
    x.filter = 'none'
    const vs = ((t * 0.5) % 1.4) - 0.2
    const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
    x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText('?', ax + aw / 2, ay + ah * 0.47)
    x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(255,111,181,0.7)'; rr(ax, ay, aw, ah, 20); x.stroke()
    x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = 'rgba(239,230,214,0.8)'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('NO PHOTO YET', ax + 16, ay + ah - 16)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    const ry = ay + ah + 54
    x.font = `600 34px ${SERIF}`; x.fillStyle = '#d2a8ff'; x.textAlign = 'left'; x.fillText('GEMINI', L + 34, ry)
    x.font = `700 18px ${MONO}`; const pw = 76, pxl = -L - pw - 30
    rr(pxl, ry - 28, pw, 38, 19); x.strokeStyle = SKYBLUE; x.lineWidth = 2.5; x.stroke()
    x.fillStyle = SKYBLUE; x.textBaseline = 'middle'; x.textAlign = 'center'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('AIR', pxl + pw / 2 + 2, ry - 8)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    const qk = prog(t, T.quote, T.quote + 0.6)
    const qy = ry + 66, lines = ['“Can’t follow a', 'recipe. Will talk', 'to you for hours.”']
    if (qk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const hg = x.createLinearGradient(L, 0, L + w, 0); hg.addColorStop(0, 'rgba(242,199,92,0)'); hg.addColorStop(0.5, `rgba(242,199,92,${0.22 * qk})`); hg.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = hg; x.fillRect(L + 14, qy - 40, w - 28, lines.length * 50 + 24)
      x.restore()
    }
    x.font = `italic 500 44px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE
    lines.forEach((ln, i) => x.fillText(ln, L + 34, qy + i * 50))
    if (qk > 0) { x.fillStyle = GOLD; lines.forEach((ln, i) => { const lw = x.measureText(ln).width, u = clamp(qk * 3 - i); if (u > 0) x.fillRect(L + 34, qy + i * 50 + 9, lw * u, 4) }) }
  }
  function drawCard(t) {
    if (t < T.deal[0] || t >= T.h6Out[1]) return
    const { cx, cy, w, h } = CARD
    const p = prog(t, ...T.deal), e = easeOutBack(p, 1.4)
    const ccx = lerp(cx + 260, cx, ease.outCubic(p)), ccy = lerp(cy + 1100, cy, e)
    const rot = lerp(0.5, 0.04, ease.outCubic(p)) + 0.012 * Math.sin(t * 1.6)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const k = 1 - ease.inCubic(prog(t, ...T.h6Out))
    x.save(); x.translate(ccx, ccy - 900 * ease.inCubic(prog(t, ...T.h6Out))); x.rotate(rot); x.scale(Math.abs(sx) * Math.max(0.01, k), Math.max(0.01, k))
    if (sx > 0) cardBack(w, h); else cardFace(w, h, t)
    x.restore()
    if (f > 0.45 && f < 1) sparkleRing(t, ccx, ccy, T.flip[0] + 0.2, 12, 320, 1)
  }

  // Pisces pops up front for the last line, sobbing (the running gag)
  function drawPisFinal(t) {
    if (t < T.pisUp) return
    const k = easeOutBack(prog(t, T.pisUp, T.pisUp + 0.4), 2.2) * popOut(t, T.out)
    if (k <= 0.02) return
    const P = [540, 1360 + (1 - Math.min(1, k)) * 120, 200]
    const r = star('pis', P, t, S_('sparkle', [0, -1]), { pop: k, hops: [T.pisUp + 0.4, 38.9, 39.5] })
    if (!r) return
    drawWizHat(x, r.x + r.c, r.top + r.c * 4.5, r.c * 0.9, { color: '#2e6fd6', light: '#6aa8ff', band: '#9be0ff', rot: 0.1, alpha: clamp(k) })
    drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02, Math.max(3, r.c), t)
    tears(r.x, r.y, r.size, t, T.pisUp + 0.3, T.out[0], { gap: 0.08, spread: 1 })
  }

  // the record scratch: a pink "?!" and a silence card
  function scratchFx(t) {
    if (inW(t, T.scratch, T.scratch + 0.8)) ono('*SCRRITCH*', 560, 980, t, T.scratch, { size: 54, color: BONE, life: 0.8, rise: 10 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawBoard(t)
        drawProf(t)
        drawPisces(t)
        drawPot(t)
        drawTaurus(t)
        drawTheChair(t)                           // always in front of Taurus (hugged, then carried)
        drawGemini(t)
        drawIngredients(t)
        drawGob(t)
        drawCard(t)
        drawPisFinal(t)
        scratchFx(t)
        x.restore()
        if (t >= T.bang1 && t < T.bang1 + 0.7) sparkleRing(t, 560, 1150, T.bang1, 10, 260, 0.6)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      box1.update(t); box2.update(t); box3.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.62 (hook → brew), 12.55 (→ the taste test, flip), 22.62 (→ Saturn wakes), 28.7 (→ the LESSON,
// deal). The default selection keeps 12.55 and 28.7.
export const CUTS = [4.62, { t: T.cut1, kind: 'flip' }, 22.62, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (chiptune · G). pop / pluck / bell are moved into G by the engine; chip cues are written straight in G major.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const G_ = { D4: 293.66, E4: 329.63, G4: 392, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880, B5: 987.77, D6: 1174.66, G6: 1567.98 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const womp = t => [['chip', t, G_.D5, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), G_.B4, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const glug = (t, f) => [['chip', t, f, 0.16, { ...FX, wave: 'tri', slide: -10, gain: 0.07, decay: 0.12, sustain: 0.3 }], ['pop', +(t + 0.06).toFixed(3), f * 0.75, 0.04, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const zap = (t, up = true) => [['chip', t, up ? G_.G4 : G_.G6, 0.35, { ...FX, wave: 'square', duty: 0.125, slide: up ? 24 : -24, gain: 0.03, decay: 0.3, sustain: 0.4 }]]
const ding = (t, f = 1567.98, g = 0.05) => [['bell', t, f, g, 1.6, -0.3], ['chip', t, G_.G6, 0.25, { ...FX, wave: 'square', duty: 0.25, gain: 0.025, decay: 0.2, sustain: 0.3 }]]
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const PITCH = { [SG]: 1040, [ST]: 620, [SS]: 520 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook
  ...head(T.h0, 5, T.h0Land, 0), ['whoosh', 0.1, 0.8, 0.05],
  ...[0.6, 1.4, 2.3, 3.2, 4.0].map((b, i) => ['pop', b, [523.25, 659.25, 587.33, 783.99, 659.25][i], 0.018, -0.2]),   // bubbling
  ['pop', T.l1 - 0.24, 659.25, 0.035, 0], ['pluck', T.l1 + 0.9, 1318.51, 0.03, 0.4, 0.3],
  // 2 · the brew
  ['whoosh', T.h0Out[0], 0.35, 0.05], ...wordPops(T.h1, 3, 0.07, 1, 0.024), ['tom', T.bang1, 82, { ...FX, gain: 0.26, decay: 0.3 }], ['pluck', T.bang1, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.petal[0], 0.4, 0.03], ['chip', T.petal[1], G_.G5, 0.18, { ...FX, wave: 'tri', slide: -14, gain: 0.06, decay: 0.12, sustain: 0.3 }],
  ['pop', T.jar[0] + 0.1, 880, 0.03, 0.3], ['glitter', T.pour[0], T.pour[1]], ['bell', T.pour[0] + 0.1, 1974, 0.02, 1.2, 0.3],
  ['pop', T.bottle[0] + 0.1, 783.99, 0.035, 0.2], ['pop', T.bottle[0] + 0.25, 1174.66, 0.03, 0.4],
  ['whoosh', T.tip[0], 0.3, 0.03],
  ...glug(T.glugs[0], G_.D5), ...glug(T.glugs[1], G_.B4), ...glug(T.glugs[2], G_.G4),
  ['boom', T.boom, 0.3], ['tom', T.boom, 60, { ...FX, gain: 0.36, decay: 0.4 }], ['whoosh', T.boom, 0.7, 0.08], ['glitter', T.boom, T.boom + 0.9], ['crash', T.boom, { bus: 'sfx', gain: 0.05 }],
  ...sob(T.boom + 0.3, G_.G6), ...sob(T.boom + 1.0, G_.D6),
  ['chip', T.boom + 0.9, G_.D5, 0.5, { ...FX, wave: 'tri', slide: -12, gain: 0.03, decay: 0.3, sustain: 0.4 }],
  // 3 · the taste test
  ...head(T.h2, 3, T.h2Land, 3), ['whoosh', T.tauIn[0], 0.4, 0.05], ['pop', T.tauIn[1], 659.25, 0.035, 0.4],
  ...zap(T.gob[0]), ['tick', T.gob[1], 0.05],
  ...glug(T.sip[0] + 0.15, G_.A4), ...glug(T.sip[0] + 0.4, G_.G4),
  ['whoosh', T.poof - 0.05, 0.4, 0.06], ['pop', T.poof, 392, 0.05, 0], ['glitter', T.poof, T.poof + 0.5],
  ...[0, 1, 2, 3, 4, 5].map(i => ['chip', +(T.spiral[0] + i * 0.1).toFixed(3), [G_.G5, G_.B5, G_.D6, G_.B5, G_.G5, G_.D6][i], 0.09, { ...FX, wave: 'square', duty: 0.25, gain: 0.02, decay: 0.08, sustain: 0.3 }]),
  ['bell', T.heart, 1567.98, 0.035, 1.2, 0.2], ['pluck', T.open, 1318.51, 0.03, 0.4, -0.3],
  ['chip', T.drift[0], G_.D6, 0.5, { ...FX, wave: 'tri', slide: -4, gain: 0.02, decay: 0.3, sustain: 0.5 }],
  ['chip', T.scratch, 880, 0.35, { ...FX, wave: 'square', duty: 0.25, slide: -14, gain: 0.03, decay: 0.3 }], ['whoosh', T.scratch, 0.2, 0.05],
  ...silence(T.scratch, 0.35, T.h3Land - 0.05),
  // 4 · it worked. on a chair.
  ...wordPops(T.h3, 3, 0.07, 2, 0.024), ['pop', T.h3Land, 1174.66, 0.05, 0], ['tom', T.h3Land, 90, { ...FX, gain: 0.22, decay: 0.25 }], ['glitter', T.h3Land, T.h3Land + 0.7],
  ...[T.smooch[0], T.smooch[1]].flatMap(s => [['pop', s, 1318.51, 0.04, 0.4], ['pop', +(s + 0.05).toFixed(3), 1760, 0.03, 0.4]]),
  ...sob(T.l5 + 0.3, G_.G6), ...womp(T.flat + 0.7),
  // 5 · Saturn wakes
  ['whoosh', T.snort - 0.1, 0.3, 0.05], ['chip', T.snort, G_.D4, 0.3, { ...FX, wave: 'square', duty: 0.5, slide: 6, gain: 0.05, decay: 0.2, sustain: 0.5 }],
  ...head(T.h4, 3, T.h4Land, 4), ['riser', T.snort, T.wake + 0.8, 0.04],
  ['whoosh', T.circle[0], 0.4, 0.03], ['tick', T.circle[1], 0.06], ['pop', T.circle[1] + 0.05, 1567.98, 0.035, 0],
  // 6 · the potion wears off
  ...head(T.h5, 3, T.h5Land, 1), ['pop', T.wear, 523.25, 0.05, 0], ...zap(T.wear, false), ['tom', T.letgo + 0.3, 110, { ...FX, gain: 0.18, decay: 0.18 }],
  ['bell', T.blush, 1974, 0.03, 1.2, 0.3], ...sob(T.blush + 0.2, G_.D6),
  // 7 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 8 · card first, face last
  ['whoosh', T.deal[0], 0.45, 0.05], ['tick', T.flip[0] + 0.15, 0.07], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.flip[0] + 0.15, T.flip[1] + 0.4],
  ...head(T.h6, 3, T.h6Land, 4), ['pop', T.l9 - 0.24, 659.25, 0.035, 0],
  ['glitter', T.quote, T.quote + 0.6], ['pluck', T.quote + 0.1, 1567.98, 0.03, 0.6, 0.2],
  // 9 · class dismissed
  ...head(T.h7, 2, T.h7Land, 1),
  ...ding(T.bells[0], 1567.98, 0.04), ...ding(T.bells[1], 1567.98, 0.045), ...ding(T.bells[2], 1975.53, 0.055),
  ['whoosh', T.tauBack, 0.4, 0.05], ['pop', T.pisUp + 0.1, 1046.5, 0.03, 0.4], ...sob(T.pisUp + 0.3, G_.G6),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }), ...talkCues(LINES3, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
