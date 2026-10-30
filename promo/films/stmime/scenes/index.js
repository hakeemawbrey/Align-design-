// stmime — "The Mime." (45 s vertical Align ad, Star Talk "Wild Lessons" #21, music: jazzy · Eb, shot like a silent
// picture: sepia, flicker, scratches, an iris, and a crying Pisces at the cinema piano). Story 0–40.6, then the end card.
//   0.0–4.2    Iris in. "Gemini has | a *crush.*"  ♊ GEMINI (beret, mime stripes) gazes at ♉ TAURUS on a park bench,
//              munching a croissant. THE STARS: "so just say *'I like you.'*"  Gemini zips its mouth and throws away the key.
//   4.25–9.1   "Attempt one: | *the heart.*"  Gemini traces a big heart in the air. Ta-da. TAURUS: "a peach? are you
//              *hungry?*" and offers the croissant. The heart droops and falls; womp.
//   9.15–15.1  "Attempt two: | *the box.*"  Gemini pats an invisible box (squeak, squeak, squeak) and it shrinks around it.
//              TAURUS: "you're... a window *cleaner?*"  Gemini slides down the glass.
//  15.2        card cut (flip).
//  15.3–20.85  "Attempt three: | *the rope.*"  Gemini hauls an invisible rope, and the bench scoots closer with every
//              heave (it's working!). TAURUS, beaming: "OH. you're a *plumber?*"  Gemini faints flat; bwomp.
//  20.9–24.45  "Gemini. Ruled by | *Mercury.*"  THE STARS: "babe. Mercury rules you. *use words.*"  Gemini gets up and looks
//              at its own ♊ badge.
//  24.5–27.65  "No more | *miming.*"  Pisces stops playing; the score tape-stops into silence; crickets. Gemini unzips.
//              GEMINI (slowly): "... I like you."
//  26.71       COLOUR. The sepia drains away, the music crashes back in, Pisces bangs the big chord and wails.
//              "Suddenly: | *colour.*"  TAURUS: "oh! I like you *too.*"
//  30.35       card cut (deal) into ★ LESSON UNLOCKED: "Nobody reads minds. | Say it *out loud.*" (+1 WORDS)
//  34.85–38.1  "Answers stay hidden | till you *both play.*"  A talk card ("perfect lazy Sunday?"); both play face-down;
//              both flip: "Croissants." ✓ ✓  THE STARS: "no miming *required.*"
//  38.15–40.42 "…*Merci.*"  Gemini takes a mime's bow, Taurus claps, Pisces sobs; the iris closes. End card at 40.6.
// One canvas (sky + world-space park and cast + screen-space film effects and iris), DOM type + dialogue boxes + the
// shared lesson, grain on top. Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SKY_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawBeret, drawCroissant, drawBench, drawLamp, drawPiano, drawKey, drawZipper, drawNote, drawGround, drawTear, drawSweat, drawPixelHeart, drawTissue } from './props.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', CREAM = '#f3e3bf', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'Eb'

const GEM = signStar('gemini'), TAU = signStar('taurus'), PIS = signStar('pisces')
const GEM_T = '#ffe27a', TAU_T = '#ffb45c'

// ── the timeline
export const T = {
  black: [0, 0.3], irisIn: [0.05, 1.0],
  // the hook
  h0: 0.12, h0Land: 0.95, h0Out: [4.05, 4.2], l1: 1.3, close1: 4.3, starsIn: [0.9, 1.25], starsOut: [4.0, 4.3],
  zip: [2.95, 3.35], key: [3.45, 4.5],
  // the heart
  h1: 4.25, h1Land: BEAT(8), h1Out: [8.95, 9.1], trace: [4.7, 6.2], tada: 6.25, l2: 6.6, offer: 7.5, droop: 8.35, heartFall: [8.35, 9.2], close2: 9.45,
  // the box
  h2: 9.15, h2Land: BEAT(16), h2Out: [14.95, 15.1], walls: [9.55, 9.85], pats: [9.95, 10.4, 10.85], shrink: [11.1, 11.75], l3: 12.0, slump: [13.75, 14.2], wallsOut: [14.55, 14.95], close3: 14.95,
  cut1: 15.2,
  // the rope
  h3: 15.3, h3Land: BEAT(27), h3Out: [20.7, 20.85], tugs: [BEAT(28), BEAT(29), BEAT(30), BEAT(31)], ropeOut: [18.2, 18.5], l4: 18.3,
  faint: [19.55, 19.85], up: [22.25, 22.6],
  // Mercury
  h4: 20.9, h4Land: BEAT(37), h4Out: [24.3, 24.45], l5: 20.95, close4: 24.35, stars2In: [20.6, 20.95], stars2Out: [24.2, 24.5], badge: 23.1,
  // the silence, the words
  silence: BEAT(43), h5: 24.5, h5Land: 24.95, h5Out: [26.55, 26.7], unzip: [24.55, 24.85], crk: [25.0, 25.9], l6: 24.85, close5: 27.65,
  color: BEAT(47), colorK: [BEAT(47), BEAT(47) + 0.7],
  h5b: 26.75, h5bLand: 27.1, h5bOut: [30.1, 30.3], l7: 27.95, close6: 30.3,
  cut2: 30.35,
  // the lesson
  lesson: BEAT(54), lessonOut: [34.6, 34.8],             // 30.6
  // talk cards
  h6: 34.85, h6Land: BEAT(62), h6Out: [37.95, 38.1], tie: [34.75, 35.2], talk: [34.85, 35.25], playA: 35.45, playB: 35.6, l8: 35.7, flip: BEAT(64),
  cardsOut: [37.75, 38.05], close7: 37.95, stars3In: [34.8, 35.2],
  // the last line
  h7: 38.15, h7Land: BEAT(68), h7Out: [40.18, 40.42], bow: [38.55, 38.95], claps: [38.7, 39.0, 39.3, 39.6], irisOut: [39.7, 40.42], out: [40.02, 40.42],
}

// ── the lines
const SGEM = `${GEM.glyph}︎ GEMINI`, STAU = `${TAU.glyph}︎ TAURUS`, SS = 'THE STARS'
const L1 = [{ t: T.l1, speaker: SS, color: GOLD, text: "so just say *'I like you.'*" }]
const L2 = [{ t: T.l2, speaker: STAU, color: TAU_T, text: 'a peach? are you *hungry?*' }]
const L3 = [{ t: T.l3, speaker: STAU, color: TAU_T, text: "you're... a window *cleaner?*" }]
const L4 = [
  { t: T.l4, speaker: STAU, color: TAU_T, text: "OH. you're a *plumber?*" },
  { t: T.l5, speaker: SS, color: GOLD, text: 'babe. Mercury rules you. *use words.*' },
]
const L5 = [{ t: T.l6, speaker: SGEM, color: GEM_T, text: '... I like *you.*' }]
const L6 = [{ t: T.l7, speaker: STAU, color: TAU_T, text: 'oh! I like you *too.*' }]
const L7 = [{ t: T.l8, speaker: SS, color: GOLD, text: 'no miming *required.*' }]
const CPS = 28, CPS_SLOW = 13
const ALL = [[L1, CPS], [L2, CPS], [L3, CPS], [L4, CPS], [L5, CPS_SLOW], [L6, CPS], [L7, CPS]]
export const LT = ALL.map(([L, c]) => lineTimes(L, { cps: c }))
const hopsOf = sp => ALL.flatMap(([L, c]) => talkHops(L, sp, { cps: c }))
const HOPS = { gem: hopsOf(SGEM), tau: hopsOf(STAU), stars: hopsOf(SS) }

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Nobody reads minds. | Say it *out loud.*', chip: '+1 WORDS', accentColor: GOLD, dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s) }
/** how much of the silent-film look is on (1 = sepia picture, 0 = full colour) */
export const silentK = t => 1 - ease.inOutQuad(prog(t, ...T.colorK))

// ── where things are (world coords == screen coords at the rest camera)
const GROUND = 1330
const GEM_P = [400, 1208, 290]
const TAU_P = [850, 1140, 250], BENCH_X = 850
const PIS_P = [128, 1140, 170], PIANO = { x0: 18, y0: 1238, w: 222, h: 170 }
const LAMP = { cx: 640, top: 640 }
const STARS_P = [905, 600, 140]
const HEART = { cx: 420, cy: 800, s: 10 }
const BOX = { cx: 400, w0: 360, h0: 360, w1: 280, h1: 290 }
const SEED = { gem: 5, tau: 17, pis: 23, stars: 11 }
const COLS = { gem: GEM, tau: TAU, pis: PIS }

// ── moods
const GEM_K = [
  [0, S_('heart', [1, 0])], [T.l1 + 0.6, S_('wide', [0, -1], { blink: false })], [T.zip[0], S_('squint', [0, 0])], [T.key[0], S_('happy', [-1, -1])], [T.key[1], S_('heart', [1, 0])],
  [T.h1, S_('squint', [1, -1])], [T.trace[0], S_('neutral', [1, -1], { blink: false })], [T.tada, S_('sparkle', [1, 0])], [T.l2 + 0.5, S_('wide', [1, 0], { blink: false })], [T.droop, S_('eyeroll', [0, -1])], [T.droop + 0.8, S_('squint', [1, 0])],
  [T.walls[0], S_('wide', [1, 0], { blink: false })], [T.pats[0] + 0.3, S_('squint', [1, 0])], [T.shrink[0], S_('wide', [0, -1], { blink: false })], [T.l3 + 0.6, S_('wide', [1, 0], { blink: false })], [T.slump[0], S_('eyeroll', [0, -1])], [T.slump[1] + 0.4, S_('neutral', [1, 0])],
  [T.h3, S_('squint', [1, 0])], [T.tugs[0], S_('squint', [1, 0], { blink: false })], [T.tugs[3] + 0.4, S_('sparkle', [1, 0])], [T.l4 + 0.5, S_('wide', [1, 0], { blink: false })], [T.faint[0], S_('sleepy', [0, 0], { zzz: false })],
  [T.up[0], S_('neutral', [0, -1])], [T.badge, S_('wide', [1, 1], { blink: false })], [T.badge + 0.9, S_('neutral', [1, 0], { blink: 0.35 })],
  [T.silence, S_('neutral', [1, 0], { blink: false })], [T.l6 + 0.4, S_('squint', [1, 0], { blink: false })], [T.color, S_('wide', [1, 0], { blink: false, sq: -0.06 })], [T.l7 + 0.6, S_('heart', [1, 0])],
  [T.lessonOut[0], S_('happy', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('heart', [1, 0])], [T.h7, S_('happy', [0, 0])], [T.bow[1] + 0.3, S_('wink', [0, 0])],
]
const TAU_K = [
  [0, S_('neutral', [1, 0], { blink: 0.4 })], [T.l1, S_('happy', [1, -1])],
  [T.trace[0], S_('neutral', [-1, -1])], [T.l2 - 0.4, S_('squint', [-1, 0])], [T.offer, S_('happy', [-1, 0])],
  [T.walls[0], S_('neutral', [-1, 0])], [T.l3 - 0.3, S_('squint', [-1, 0])], [T.l3 + 1.0, S_('happy', [-1, 0])],
  [T.tugs[0], S_('wide', [-1, 0], { blink: false })], [T.l4, S_('sparkle', [-1, 0])], [T.faint[0] + 0.2, S_('wide', [-1, 1], { blink: false })], [T.faint[1] + 0.6, S_('neutral', [-1, 1])],
  [T.silence, S_('neutral', [-1, 0], { blink: false })], [T.l6 + 0.8, S_('wide', [-1, 0], { blink: false })], [T.color, S_('heart', [-1, 0])],
  [T.lessonOut[0], S_('happy', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('heart', [-1, 0])], [T.h7, S_('happy', [-1, 0])],
]
const STARS_K = [[0, S_('happy', [-1, 1])], [T.l1, S_('neutral', [-1, 1], { blink: 0.4 })], [T.zip[0], S_('wide', [-1, 1], { blink: false })],
  [T.stars2In[0], S_('neutral', [-1, 1], { blink: 0.5 })], [T.stars3In[0], S_('happy', [-1, 1])], [T.flip + 0.3, S_('sparkle', [-1, 1])]]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 500 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 44px 'Space Mono'", "700 32px 'Space Mono'", "700 17px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-3.png')])
  const BACK = bake(backIm, 400), TALK = bake(talkIm, 560)
  const BACK_BODY = 1320 / 1528, TALK_BODY = 600 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  // the mime's stripes are painted on an offscreen copy of the star
  const off = document.createElement('canvas'); off.width = 640; off.height = 640
  const ox = off.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Gemini has | a *crush.*', { top: 172, size: 112, accentSize: 176, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, accentColor: CREAM })
  const H1 = popText(root, 'Attempt one: | *the heart.*', { top: 172, size: 100, accentSize: 156, at: T.h1, late: 2, lateAt: T.h1Land, wobble: true, accentColor: CREAM, fit: true })
  const H2 = popText(root, 'Attempt two: | *the box.*', { top: 172, size: 100, accentSize: 156, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, accentColor: CREAM, fit: true })
  const H3 = popText(root, 'Attempt three: | *the rope.*', { top: 172, size: 100, accentSize: 156, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, accentColor: CREAM, fit: true })
  const H4 = popText(root, 'Gemini. Ruled by | *Mercury.*', { top: 172, size: 96, accentSize: 156, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: CREAM, fit: true })
  const H5 = popText(root, 'No more | *miming.*', { top: 172, size: 110, accentSize: 172, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CREAM })
  const H5b = popText(root, 'Suddenly: | *colour.*', { top: 172, size: 110, accentSize: 176, at: T.h5b, late: 1, lateAt: T.h5bLand, wobble: true, accentColor: PINK })
  const H6 = popText(root, 'Answers stay hidden | till you *both play.*', { top: 168, size: 82, accentSize: 112, at: T.h6, late: 2, lateAt: T.h6Land, wobble: true, accentColor: LAV, lineHeight: 1.12, fit: true })
  const H7 = popText(root, '…*Merci.*', { top: 196, size: 130, accentSize: 200, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H5b, T.h5bOut], [H6, T.h6Out], [H7, T.h7Out]]
  const BOXY = { y: 1478, width: 960, height: 290 }
  const boxes = [
    dialogueBox(root, { lines: L1, ...BOXY, open: T.l1 - 0.24, close: T.close1, cps: CPS }),
    dialogueBox(root, { lines: L2, ...BOXY, open: T.l2 - 0.24, close: T.close2, cps: CPS }),
    dialogueBox(root, { lines: L3, ...BOXY, open: T.l3 - 0.24, close: T.close3, cps: CPS }),
    dialogueBox(root, { lines: L4, ...BOXY, open: T.l4 - 0.24, close: T.close4, cps: CPS }),
    dialogueBox(root, { lines: L5, ...BOXY, open: T.l6 - 0.24, close: T.close5, cps: CPS_SLOW }),
    dialogueBox(root, { lines: L6, ...BOXY, open: T.l7 - 0.24, close: T.close6, cps: CPS }),
    dialogueBox(root, { lines: L7, ...BOXY, open: T.l8 - 0.24, close: T.close7, cps: CPS }),
  ]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── camera
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    s += 0.02 * ease.inOutQuad(prog(t, 0.3, 4.2))
    // the silence: a slow push on Gemini, released by the colour
    const k = ease.inOutCubic(prog(t, T.silence, T.l6 + 1.2)) * (1 - ease.inOutCubic(prog(t, T.color, T.color + 0.9)))
    s += 0.14 * k; fx = lerp(fx, 520, k); fy = lerp(fy, 1080, k)
    s += 0.03 * bump(t, T.faint[1], 0.35) + 0.04 * bump(t, T.color, 0.45)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.faint[1], 10], [T.color, 12], [T.shrink[1], 5], ...T.tugs.map(v => [v, 4])]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

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
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0, ctx = x } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    ctx.save()
    if (rot) { ctx.translate(px0, py0 + sz * 0.4); ctx.rotate(rot); ctx.translate(-px0, -(py0 + sz * 0.4)) }
    const r = drawStarChar(ctx, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : COLS[id].color, glyph: glyph && sz >= 120 && id !== 'stars' ? COLS[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, zzz: st.zzz !== false, alpha })
    ctx.restore()
    return { ...r, c: r.size / 36 }
  }

  // ── the park
  function drawPark(t) {
    drawLamp(x, LAMP.cx, LAMP.top, GROUND, 0.85 + 0.15 * Math.sin(t * 7) * silentK(t))
    // a few trees as dark pixel blobs on the horizon
    x.fillStyle = '#16222a'
    for (const [tx, tw, th] of [[60, 160, 170], [960, 200, 210], [300, 120, 110], [770, 140, 130]]) { x.fillRect(tx - tw / 2, GROUND - th, tw, th); x.fillRect(tx - tw / 2 + 18, GROUND - th - 26, tw - 36, 26) }
    drawGround(x, GROUND, W, H - GROUND + 200)
  }

  // ── Taurus + the bench (the bench scoots closer with each heave of the rope)
  function benchShift(t) { let s = 0; T.tugs.forEach((v, i) => { s += 34 * ease.outBack(prog(t, v + 0.05, v + 0.3)) * (i < 4 ? 1 : 0) }); return -s }
  function drawTaurus(t) {
    const dx = benchShift(t)
    drawBench(x, BENCH_X + dx, GROUND, 6, 380)
    const k = popOut(t, T.out)
    const st = keyed(t, TAU_K)
    const hops = [...HOPS.tau, ...T.tugs.map(v => v + 0.05), T.color + 0.02, T.color + 0.55, T.color + 1.1, T.flip + 0.35, ...T.claps]
    const r = star('tau', [TAU_P[0] + dx, TAU_P[1], TAU_P[2]], t, st, { pop: k, hops })
    if (!r) return null
    // the croissant: munched, offered at the peach, wobbling on the tugs
    const offer = ease.outBack(prog(t, T.offer, T.offer + 0.3)) * (1 - ease.inOutCubic(prog(t, T.walls[0], T.walls[1])))
    const munch = !inW(t, T.offer, T.walls[1]) && t < T.cut2 && Math.floor(t * 3) % 3 === 0
    const cxr = lerp(r.x + r.size * 0.42, r.x - r.size * 0.62, offer), cyr = r.y + r.size * 0.3 - (munch ? 6 : 0) - offer * 30
    if (t < T.cut2 || t >= T.lessonOut[0]) drawCroissant(x, cxr, cyr, Math.max(3, Math.round(r.c * 0.7)), -0.2 + 0.3 * offer + 0.15 * Math.sin(t * 2))
    // claps at the bow: little sparkle pops
    for (const c of T.claps) ono('*clap*', r.x + 10, r.top - 30, t, c, { size: 34, life: 0.4, rise: 20, ticks: false, color: CREAM })
    return r
  }

  // ── Pisces, the cinema pianist (always crying)
  function drawPisces(t) {
    const k = easeOutBack(prog(t, 0.4, 0.8), 2) * popOut(t, T.out)
    const playing = t < T.silence || t >= T.color
    const sway = playing ? Math.sin(t * 5.6) * 6 : 0
    let st = S_('sparkle', [1, -1])
    if (inW(t, T.silence, T.color)) st = S_('wide', [1, -1], { blink: false })
    else if (inW(t, T.faint[0], T.faint[1] + 1)) st = S_('wide', [1, 0], { blink: false })
    const hops = [T.color, T.color + 0.4, T.color + 0.8, T.color + 1.2, T.flip + 0.2, T.bow[0], T.bow[0] + 0.5]
    const r = star('pis', [PIS_P[0] + sway, PIS_P[1], PIS_P[2]], t, st, { pop: k, hops, glyph: false })
    drawPiano(x, PIANO.x0, PIANO.y0, PIANO.w, PIANO.h)
    if (!r) return
    drawTissue(x, r.x + r.size * 0.55, r.y - r.size * 0.2, 4, t)
    for (const [a, b] of [[0.9, T.silence], [T.color, T.color + 2.2], [T.flip + 0.2, T.flip + 1.4], [T.bow[0], T.out[0]]]) tears(r.x, r.y, r.size, t, a, b, { gap: 0.11, spread: 0.7, life: 0.5 })
    // notes float up off the piano while it plays
    if (playing && t < T.out[0]) for (let i = 0; i < 4; i++) {
      const ph = ((t * 0.55 + i / 4) % 1)
      x.save(); x.globalAlpha = Math.sin(ph * Math.PI) * 0.85
      drawNote(x, PIANO.x0 + 60 + i * 40 + Math.sin(ph * 6 + i) * 18, PIANO.y0 - 70 - ph * 220, 5, t >= T.color ? [PINK, GOLD, LAV, MINT][i] : CREAM)
      x.restore()
    }
    // the big chord at the colour
    if (t >= T.color && t < T.color + 0.6) for (let i = 0; i < 7; i++) { const a = t - T.color; drawNote(x, PIANO.x0 + PIANO.w / 2 + (i - 3) * 60 * (1 + a * 2), PIANO.y0 - 40 - a * 380 + Math.abs(i - 3) * 20, 6, [PINK, GOLD, LAV, MINT][i % 4]) }
  }

  // ── Gemini, the mime: the star plus stripes, a beret, a zip and a thrown key
  function gemPlace(t) {
    let [gxp, gyp, gs] = GEM_P, rot = 0, sq = 0
    // the box: pats lean into each wall, the shrink squeezes it, the slump slides it down the glass
    if (inW(t, T.walls[0], T.wallsOut[1])) {
      const pats = T.pats.map((p, i) => bump(t, p, 0.32) * [1, -1, 0][i]); gxp += 26 * (pats[0] + pats[1])
      sq -= 0.08 * bump(t, T.pats[2], 0.32)
      const s = ease.inOutCubic(prog(t, ...T.shrink)) * (1 - ease.inOutCubic(prog(t, ...T.wallsOut)))
      sq -= 0.14 * s; gs *= 1 - 0.08 * s
      const sl = ease.inCubic(prog(t, ...T.slump)) * (1 - ease.inOutCubic(prog(t, ...T.wallsOut)))
      sq += 0.3 * sl; gxp -= 50 * sl; rot -= 0.12 * sl
    }
    // the rope: lean back, a heave on every beat
    if (inW(t, T.h3, T.l4 + 0.4)) {
      const lean = ease.inOutCubic(prog(t, T.h3 + 0.2, T.tugs[0])) * (1 - ease.inOutCubic(prog(t, T.ropeOut[0], T.ropeOut[1])))
      rot -= 0.22 * lean
      for (const v of T.tugs) { gxp -= 16 * bump(t, v, 0.3); rot -= 0.1 * bump(t, v, 0.3) }
    }
    // the faint: flat on its back, then up again
    const f = ease.outCubic(prog(t, ...T.faint)), u = ease.inOutCubic(prog(t, ...T.up))
    rot -= 1.5 * f * (1 - u)
    // the bow
    const b = ease.inOutCubic(prog(t, ...T.bow)) * (1 - ease.inOutCubic(prog(t, T.bow[1] + 0.5, T.bow[1] + 0.9)))
    rot += 0.45 * b
    // the tie-in: to the left a bit so the answer card has room
    return { P: [gxp, gyp, gs], rot, sq }
  }
  function drawGemini(t) {
    const { P, rot, sq: sq0 } = gemPlace(t)
    const st = keyed(t, GEM_K)
    const k = popOut(t, T.out)
    const hops = [...HOPS.gem, T.tada, T.pats[0], T.pats[1], T.color + 0.02, T.color + 0.5, T.color + 1.0, T.flip + 0.35, T.up[1]]
    // paint the star on the offscreen canvas, stripe it, then stamp it
    ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, 640, 640)
    const OC = [320, 360]
    const r0 = star('gem', [OC[0], OC[1], P[2]], t, { ...st, sq: (st.sq || 0) + sq0 }, { pop: k, hops, ctx: ox })
    if (!r0) return null
    ox.save(); ox.globalCompositeOperation = 'source-atop'
    const band = Math.max(8, Math.round(r0.size / 18))
    for (let yy = r0.y + r0.size * 0.2; yy < r0.y + r0.size * 0.6; yy += band * 2) { ox.fillStyle = 'rgba(24,18,44,0.55)'; ox.fillRect(0, Math.round(yy), 640, band) }
    ox.restore()
    // stamp (rotated about the feet)
    x.save()
    const fx = P[0], fy = P[1] + P[2] * 0.4
    x.translate(fx, fy); x.rotate(rot); x.translate(-fx, -fy)
    x.drawImage(off, P[0] - OC[0], P[1] - OC[1])
    const r = { ...r0, x: r0.x - OC[0] + P[0], y: r0.y - OC[1] + P[1], top: r0.top - OC[1] + P[1] }
    const c = r.size / 36
    // the red neck scarf
    x.fillStyle = '#1a1030'; x.fillRect(Math.round(r.x - c * 5), Math.round(r.y + r.size * 0.13), Math.round(c * 10), Math.round(c * 2.4))
    x.fillStyle = '#c8324a'; x.fillRect(Math.round(r.x - c * 4.5), Math.round(r.y + r.size * 0.13 + c * 0.4), Math.round(c * 9), Math.round(c * 1.6))
    x.fillRect(Math.round(r.x + c * 2), Math.round(r.y + r.size * 0.13 + c * 1.8), Math.round(c * 2), Math.round(c * 2.6))
    // the zip: closed over the mouth from the hook until the unzip
    const zk = ease.inOutCubic(prog(t, ...T.zip)) * (1 - ease.inOutCubic(prog(t, ...T.unzip)))
    drawZipper(x, r.x, r.y + r.size * 0.105, r.size * 0.2, zk, Math.max(3, Math.round(c * 0.6)))
    // the beret (it pops off at the colour and lands back on for the bow)
    let by = r.top + c * 3.2, br = -0.2
    if (inW(t, T.color, T.color + 0.9)) { const p = prog(t, T.color, T.color + 0.9); by -= Math.sin(p * Math.PI) * 220; br += p * Math.PI * 2 }
    if (inW(t, ...T.bow)) br -= 0.2 * prog(t, ...T.bow)
    drawBeret(x, r.x - c * 0.6, by, Math.max(3, Math.round(c * 0.85)), br, clamp(k))
    // sweat while it struggles
    if (inW(t, T.shrink[0], T.slump[1]) || inW(t, T.tugs[0], T.l4)) drawSweat(x, r.x - r.size * 0.34, r.top + r.size * 0.3 + ((t * 0.8) % 1) * 18, Math.max(3, Math.round(c * 0.75)))
    if (inW(t, T.l6 - 0.2, T.color)) drawSweat(x, r.x + r.size * 0.34, r.top + r.size * 0.3 + ((t * 0.5) % 1) * 18, Math.max(3, Math.round(c * 0.75)))
    // the badge glows when it remembers who it is
    if (inW(t, T.badge, T.badge + 1.2)) {
      const g = x.createRadialGradient(r.x + r.size * 0.27, r.y + r.size * 0.28, 0, r.x + r.size * 0.27, r.y + r.size * 0.28, 90)
      g.addColorStop(0, `rgba(255,240,180,${0.8 * bump(t, T.badge, 1.2)})`); g.addColorStop(1, 'rgba(255,240,180,0)')
      x.fillStyle = g; x.fillRect(r.x - 200, r.y - 200, 600, 600)
    }
    x.restore()
    if (inW(t, T.badge, T.badge + 0.8)) sparkleRing(t, r.x + r.size * 0.27, r.y + r.size * 0.28, T.badge, 8, 80, 0.4, 0.7)
    return r
  }
  // the key: tossed off to the left
  function drawThrownKey(t) {
    if (!inW(t, ...T.key)) return
    const p = prog(t, ...T.key)
    drawKey(x, lerp(GEM_P[0] - 40, -80, p), GEM_P[1] - 60 - Math.sin(p * Math.PI) * 360 + p * 260, 6, p * 14)
  }

  // ── attempt one: the heart, traced in the air (then it droops and falls like a peach)
  function heartPt(u) { const a = Math.PI * 2 * u; return [16 * Math.sin(a) ** 3, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))] }
  function drawHeart(t) {
    if (!inW(t, T.trace[0], T.heartFall[1])) return
    const p = ease.inOutQuad(prog(t, ...T.trace)), fall = ease.inQuad(prog(t, ...T.heartFall))
    const N = 70, n = Math.floor(N * p)
    const s = HEART.s * (1 + 0.08 * bump(t, T.tada, 0.35))
    x.save(); x.translate(HEART.cx, HEART.cy + fall * 520); x.rotate(fall * 0.8); x.globalAlpha = 1 - fall * 0.8
    for (let i = 0; i <= n; i++) {
      const [hx, hy] = heartPt(i / N)
      x.fillStyle = i % 2 ? CREAM : PINK; x.fillRect(Math.round(hx * s) - 5, Math.round(hy * s) - 5, 10, 10)
    }
    x.restore()
    // the "pen": a sparkle at the tracing tip, and a dotted line from Gemini's point to it
    if (p > 0 && p < 1) {
      const [hx, hy] = heartPt(n / N)
      drawPixelStar(x, HEART.cx + hx * s, HEART.cy + hy * s, 40, 2, GOLD)
    }
    if (t >= T.tada && t < T.tada + 0.7) sparkleRing(t, HEART.cx, HEART.cy, T.tada, 10, 190, 0.2, 0.7)
  }

  // ── attempt two: the invisible box (a faint, glinting outline that shrinks)
  function drawBox(t) {
    if (!inW(t, T.walls[0], T.wallsOut[1])) return
    const a = ease.outCubic(prog(t, ...T.walls)) * (1 - ease.inCubic(prog(t, ...T.wallsOut)))
    const s = ease.inOutCubic(prog(t, ...T.shrink))
    const w = lerp(BOX.w0, BOX.w1, s), h = lerp(BOX.h0, BOX.h1, s)
    const x0 = BOX.cx - w / 2, y0 = GROUND - h
    x.save(); x.globalAlpha = 0.75 * a
    x.fillStyle = 'rgba(200,230,255,0.07)'; x.fillRect(x0, y0, w, h)
    x.fillStyle = 'rgba(230,245,255,0.85)'
    const dash = (xa, ya, xb, yb) => { const L = Math.hypot(xb - xa, yb - ya), n = Math.floor(L / 22); for (let i = 0; i < n; i++) { const u = i / n; x.fillRect(Math.round(lerp(xa, xb, u)) - 3, Math.round(lerp(ya, yb, u)) - 3, 10, 6) } }
    dash(x0, y0, x0 + w, y0); dash(x0, y0, x0, GROUND); dash(x0 + w, y0, x0 + w, GROUND)
    // glints
    x.fillStyle = 'rgba(255,255,255,0.7)'
    for (const [gxp, gyp] of [[x0 + 24, y0 + 30], [x0 + w - 60, y0 + 60]]) for (let i = 0; i < 5; i++) x.fillRect(gxp + i * 8, gyp + i * 8, 8, 8)
    x.restore()
    T.pats.forEach((p, i) => ono('*squeak*', [x0 + w + 20, x0 - 20, BOX.cx][i], [GROUND - 160, GROUND - 200, y0 - 40][i], t, p, { size: 38, life: 0.6, rise: 18, color: '#bff0ff', rot: [0.15, -0.15, 0][i] }))
  }

  // ── attempt three: the rope (a faint imaginary dotted line to the bench)
  function drawRope(t, rg, rt) {
    if (!rg || !rt || !inW(t, T.tugs[0] - 0.4, T.ropeOut[1])) return
    const a = ease.outCubic(prog(t, T.tugs[0] - 0.4, T.tugs[0])) * (1 - ease.inCubic(prog(t, ...T.ropeOut)))
    const xa = rg.x + rg.size * 0.42, ya = rg.y - rg.size * 0.05, xb = rt.x - rt.size * 0.3, yb = rt.y + rt.size * 0.05
    const taut = T.tugs.reduce((m, v) => Math.max(m, bump(t, v, 0.3)), 0)
    x.save(); x.globalAlpha = 0.5 * a
    for (let i = 0; i <= 24; i++) {
      const u = i / 24, sag = Math.sin(u * Math.PI) * 60 * (1 - taut)
      x.fillStyle = CREAM; x.fillRect(Math.round(lerp(xa, xb, u)) - 4, Math.round(lerp(ya, yb, u) + sag) - 4, 8, 8)
    }
    x.restore()
    T.tugs.forEach((v, i) => ono('*heave*', rg.x - 40, rg.top - 40, t, v, { size: 40, life: 0.5, rise: 18, rot: -0.12 + i * 0.08, color: CREAM }))
  }

  // ── THE STARS (top right)
  function drawStars(t) {
    const wins = [[T.starsIn, T.starsOut], [T.stars2In, T.stars2Out], [T.stars3In, [T.cardsOut[0], T.cardsOut[1]]]]
    for (const [inn, outt] of wins) {
      if (!inW(t, inn[0], outt[1])) continue
      const pIn = prog(t, ...inn)
      const P = [lerp(1220, STARS_P[0], ease.outCubic(pIn)), lerp(300, STARS_P[1], ease.outCubic(pIn)), STARS_P[2]]
      const k = popOut(t, outt)
      const r = star('stars', P, t, keyed(t, STARS_K), { pop: k, hops: [...HOPS.stars, inn[1]] })
      if (r && pIn < 1) for (let i = 1; i <= 4; i++) drawPixelStar(x, P[0] + 30 * i, P[1] - 20 * i, 30 - i * 5, i % 2, GOLD)
      if (r && t < inn[1] + 0.6) sparkleRing(t, r.x, r.y, inn[1] - 0.1, 10, 110, 0.3, 0.6)
    }
  }

  // ── the tie-in: a talk card, two face-down answers, one flip
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardImg(img, body, cx, cy, wBody, rot = 0, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / body, h = w * img.height / img.width
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function answerFace(cx, cy, w, sx, stampK, rot = 0) {
    const h = w * 1.52
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    x.save(); x.shadowColor = 'rgba(242,199,92,0.5)'; x.shadowBlur = 30
    rr(-w / 2, -h / 2, w, h, 20); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2e1c62'); g.addColorStop(1, '#130a2e'); x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = GOLD; rr(-w / 2, -h / 2, w, h, 20); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,199,92,0.55)'; rr(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 10); x.stroke()
    x.fillStyle = GOLD; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('A N S W E R', 0, -h / 2 + 40)
    x.fillStyle = BONE; x.font = `italic 500 40px ${SERIF}`
    x.fillText('Croissants.', 0, -h / 2 + 112)
    drawCroissant(x, 0, -h / 2 + 186, 6)
    if (stampK > 0) {
      const k = easeOutBack(clamp(stampK), 2.6)
      x.save(); x.translate(0, h / 2 - 50); x.rotate(-0.18); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#46cf82'; x.beginPath(); x.arc(0, 0, 33, 0, Math.PI * 2); x.fill()
      x.strokeStyle = '#ffffff'; x.lineWidth = 9; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); x.moveTo(-15, 2); x.lineTo(-4, 13); x.lineTo(17, -12); x.stroke()
      x.restore()
    }
    x.restore()
  }
  const TALK_AT = { x: 540, y: 760, w: 350 }, ANS_W = 200
  const ANS = [{ x: 380, y: 1240, from: () => GEM_P, tp: T.playA, rot: -0.06 }, { x: 700, y: 1240, from: t => [TAU_P[0] + benchShift(t), TAU_P[1]], tp: T.playB, rot: 0.06 }]
  function drawTie(t) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.5 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    const g = x.createRadialGradient(TALK_AT.x, TALK_AT.y, 0, TALK_AT.x, TALK_AT.y, 460)
    g.addColorStop(0, rgba(LAV, 0.28 * clamp(tp) * (1 - o))); g.addColorStop(1, rgba(LAV, 0)); x.fillStyle = g; x.fillRect(TALK_AT.x - 460, TALK_AT.y - 460, 920, 920)
    cardImg(TALK, TALK_BODY, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * tp, (1 - clamp(tp)) * -0.4, 1, clamp(tp * 3) * (1 - o))
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = C.from(t), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const cx = lerp(S0[0], C.x, e), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) cardImg(BACK, BACK_BODY, cx, cy, ANS_W, rot, sx, clamp(p * 4))
      else answerFace(cx, cy, ANS_W, -sx, prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1), rot)
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  // ── the silent picture: flicker, scratches, dust, vignette, and the iris
  function filmFX(t) {
    const k = silentK(t)
    // vignette (a little stays in colour)
    const v = x.createRadialGradient(540, 1000, 380, 540, 1000, 1180)
    v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, `rgba(8,5,2,${0.25 + 0.4 * k})`)
    x.fillStyle = v; x.fillRect(0, 0, W, H)
    if (k <= 0.01) return
    const f = Math.floor(t * 18)
    x.fillStyle = `rgba(10,6,0,${k * (0.03 + 0.07 * hash(f))})`; x.fillRect(0, 0, W, H)
    if (hash(f + 7) > 0.8) { x.fillStyle = `rgba(255,245,220,${k * 0.05})`; x.fillRect(0, 0, W, H) }
    // scratches
    for (let i = 0; i < 2; i++) {
      if (hash(f * 3 + i) < 0.45) continue
      const sx = hash(f * 5 + i * 13) * W
      x.fillStyle = `rgba(240,230,210,${k * 0.28})`; x.fillRect(Math.round(sx), 0, 3, H)
    }
    // dust specks + a hair now and then
    for (let i = 0; i < 6; i++) {
      const dx = hash(f * 7 + i) * W, dy = hash(f * 11 + i * 3) * H, s = 4 + hash(f + i) * 8
      x.fillStyle = `rgba(20,12,4,${k * 0.55})`; x.fillRect(Math.round(dx), Math.round(dy), s, s)
    }
    if (hash(f * 13) > 0.85) { x.fillStyle = `rgba(20,12,4,${k * 0.5})`; const hx = hash(f * 17) * W, hy = hash(f * 19) * H; for (let i = 0; i < 14; i++) x.fillRect(hx + i * 6, hy + Math.sin(i * 0.8) * 14, 5, 5) }
  }
  function iris(t) {
    let rad = null, cx = 470, cy = 1080
    if (t < T.irisIn[1]) rad = lerp(0, 1500, ease.inOutCubic(prog(t, ...T.irisIn)))
    else if (t >= T.irisOut[0]) { rad = lerp(1500, 0, ease.inOutCubic(prog(t, ...T.irisOut))); cx = 610; cy = 1120 }
    if (rad === null) return
    x.save(); x.fillStyle = '#050302'; x.beginPath(); x.rect(0, 0, W, H); x.arc(cx, cy, Math.max(0, rad), 0, Math.PI * 2, true); x.fill('evenodd')
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const k = silentK(t)
      root.style.filter = k > 0.01 ? `grayscale(${(0.95 * k).toFixed(3)}) sepia(${(0.75 * k).toFixed(3)}) contrast(${(1 + 0.12 * k).toFixed(3)})` : 'none'
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        const weave = k * (hash(Math.floor(t * 18)) - 0.5) * 4
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1] + weave); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawPark(t)
        drawStars(t)
        const rt = drawTaurus(t)
        drawHeart(t)
        drawBox(t)
        const rg = drawGemini(t)
        drawRope(t, rg, rt)
        drawThrownKey(t)
        drawPisces(t)
        if (rg) {
          ono('*zip*', rg.x + 40, rg.y - 40, t, T.zip[1] - 0.1, { size: 44, life: 0.7, rise: 20, color: CREAM })
          ono('*zip*', rg.x + 40, rg.y - 40, t, T.unzip[1] - 0.1, { size: 44, life: 0.7, rise: 20, color: CREAM })
          ono('*ta-da!*', rg.x + 30, rg.top - 60, t, T.tada, { size: 46, life: 0.9, rise: 26, color: GOLD })
          ono('*thud*', rg.x - 80, GROUND - 40, t, T.faint[1], { size: 50, life: 0.8, rise: 20 })
          ono('*gulp*', rg.x - 20, rg.top - 50, t, T.l6 - 0.35, { size: 40, life: 0.7, rise: 16, ticks: false, color: CREAM })
        }
        ono('*womp*', HEART.cx, HEART.cy + 300, t, T.droop + 0.2, { size: 46, life: 0.8, rise: 20, color: CREAM })
        drawTie(t)
        x.restore()
        // the crickets in the silence
        T.crk.forEach((c, i) => ono('*chirp*', [820, 260][i], [1360, 1290][i], t, c, { size: 40, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24, ticks: false }))
        if (t >= T.color && t < T.color + 0.9) {
          const a = 1 - prog(t, T.color, T.color + 0.5); x.fillStyle = `rgba(255,250,235,${0.35 * a})`; x.fillRect(0, 0, W, H)
          sparkleRing(t, 620, 1050, T.color, 16, 420, 0.6, 0.9)
          for (let i = 0; i < 14; i++) { const a2 = t - T.color, ang = i / 14 * Math.PI * 2; drawPixelHeart(x, 620 + Math.cos(ang) * 500 * a2, 1000 + Math.sin(ang) * 400 * a2 + 300 * a2 * a2, 5, [PINK, '#ff4f7e', GOLD][i % 3]) }
        }
        filmFX(t)
        iris(t)
      }
      boxes.forEach(b => b.update(t))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.2 (hook → heart), 15.2 (box → rope, flip), 24.45 (Mercury → silence), 30.35 (→ the LESSON,
// deal). The default selection keeps 15.2 and 30.35; the others stay inert.
export const CUTS = [4.2, { t: T.cut1, kind: 'flip' }, 24.45, { t: T.cut2, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are moved by the engine from the D-major palette up a semitone into Eb, so they're
//    written in D; chip / lead / tom ride the 'sfx' bus as written (in Eb).
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const N_ = { D4: 293.66, Fs4: 369.99, A4: 440, B4: 493.88, D5: 587.33, E5: 659.25, Fs5: 739.99, A5: 880, D6: 1174.66, Fs6: 1479.98 }
const E_ = { Eb3: 155.56, Bb3: 233.08, Eb4: 311.13, G4: 392, Bb4: 466.16, C5: 523.25, Eb5: 622.25, G5: 783.99, Bb5: 932.33 }
const POPN = [N_.A4, N_.B4, N_.D5, N_.E5, N_.Fs5, N_.A5, N_.D6]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), POPN[(base + i) % POPN.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, N_.A5, 0.05, 0], ['pluck', land, N_.A5, 0.04, 0.6, 0]]
const womp = t => [['chip', t, E_.G4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), 277.18, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const squeak = (t, f = 1800) => [['chip', t, f, 0.14, { ...FX, wave: 'square', duty: 0.15, slide: 14, vib: 0.05, gain: 0.025, decay: 0.08, sustain: 0.7 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.045, f0: 900, f1: 2600 }]]; for (let k = 0; k < 14; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
/** the honky-tonk piano: Pisces' little runs (lead voice on the sfx bus, in Eb) */
const run = (t0, notes, gap = 0.09, gain = 0.035) => notes.map((f, i) => ['lead', +(t0 + i * gap).toFixed(3), f, 0.22, { ...FX, wave: 'tri', gain, detune: 0.004, cutoff: 5000, env: 0, attack: 0.005, decay: 0.15, sustain: 0.4, release: 0.1, rev: 0.25 }])
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const PITCH = { [SGEM]: 980, [STAU]: 560, [SS]: 760 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // the projector: crackle under the whole silent picture
  ['vinyl', 0, T.color, { gain: 0.035, rate: 9 }],
  // 1 · the hook
  ...head(T.h0, 3, T.h0Land, 0),
  ...run(0.4, [E_.Eb4, E_.G4, E_.Bb4, E_.Eb5, E_.G5, E_.Bb5]),
  ['whoosh', T.starsIn[0], 0.4, 0.05], ['bell', T.starsIn[1], N_.Fs6, 0.025, 1.2, 0.3],
  ['whoosh', T.zip[0], 0.35, 0.05], ...squeak(T.zip[0] + 0.05, 1200), ['tick', T.zip[1], 0.06],
  ['whoosh', T.key[0], 0.5, 0.04], ['pop', T.key[0] + 0.05, N_.D6, 0.03, -0.4], ['tick', T.key[1] - 0.05, 0.05],
  // 2 · the heart
  ...head(T.h1, 3, T.h1Land, 2),
  ['glitter', T.trace[0], T.trace[1]], ...[0, 1, 2, 3, 4, 5].map(i => ['pop', +(T.trace[0] + i * 0.25).toFixed(3), POPN[i], 0.022, 0.2]),
  ['bell', T.tada, N_.A5, 0.04, 1.4, 0], ['pluck', T.tada, N_.D6, 0.035, 0.6, 0.2], ...run(T.tada + 0.05, [E_.Bb4, E_.Eb5, E_.G5]),
  ['pop', T.offer, N_.Fs5, 0.03, 0.4],
  ['whoosh', T.heartFall[0] + 0.1, 0.6, 0.035], ...womp(T.droop + 0.2),
  // 3 · the box
  ...head(T.h2, 3, T.h2Land, 1),
  ['bell', T.walls[0], N_.Fs6, 0.02, 0.8, 0],
  ...T.pats.flatMap((p, i) => squeak(p, 1700 + i * 200)),
  ['whoosh', T.shrink[0], 0.6, 0.04], ...squeak(T.shrink[1] - 0.1, 2400),
  ['chip', T.slump[0], E_.Bb4, 0.5, { ...FX, wave: 'tri', slide: -14, gain: 0.03, decay: 0.3, sustain: 0.5 }], ...squeak(T.slump[0] + 0.05, 1500),
  // 4 · the rope
  ...head(T.h3, 3, T.h3Land, 3),
  ...T.tugs.flatMap((v, i) => [['tom', v, 90 + i * 12, { ...FX, gain: 0.14, decay: 0.15 }], ['whoosh', +(v - 0.06).toFixed(3), 0.2, 0.035], ['tick', +(v + 0.25).toFixed(3), 0.04]]),
  ['pop', T.l4 - 0.1, N_.D6, 0.035, 0.3],
  ['whoosh', T.faint[0], 0.3, 0.05], ['tom', T.faint[1], 70, { ...FX, gain: 0.26, decay: 0.3 }], ['boom', T.faint[1], 0.05], ...womp(T.faint[1] + 0.15),
  // 5 · Mercury
  ...head(T.h4, 3, T.h4Land, 0),
  ['whoosh', T.stars2In[0], 0.4, 0.05], ['glitter', T.stars2In[0], T.stars2In[1] + 0.2],
  ['chip', T.up[0], E_.Eb4, 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 30, gain: 0.03, decay: 0.1, sustain: 0.6 }],
  ['bell', T.badge, N_.D6, 0.04, 1.6, 0.2], ['glitter', T.badge, T.badge + 0.6],
  // 6 · the silence, the words, the colour
  ...silence(T.silence, 0.55, T.color - 0.02),
  ...head(T.h5, 2, T.h5Land, 2),
  ['whoosh', T.unzip[0], 0.3, 0.04], ...squeak(T.unzip[0] + 0.05, 1100),
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.4),
  ['pop', T.l6 - 0.35, N_.D4, 0.04, 0],
  ['boom', T.color, 0.07], ['bell', T.color, N_.D5, 0.05, 2, -0.2], ['bell', T.color, N_.Fs5, 0.05, 2, 0.2], ['bell', T.color + 0.02, N_.A5, 0.04, 2, 0], ['glitter', T.color, T.color + 1.0],
  ...run(T.color + 0.02, [E_.Eb3, E_.Bb3, E_.Eb4, E_.G4, E_.Bb4, E_.Eb5, E_.G5, E_.Bb5], 0.05, 0.045),
  ...cheers(T.color + 0.1, T.color + 1.8), ...sob(T.color + 0.3, 1568), ...sob(T.color + 0.9, 1318.5),
  ...head(T.h5b, 2, T.h5bLand, 4),
  // 7 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 8 · talk cards
  ...head(T.h6, 5, T.h6Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N_.Fs6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N_.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N_.Fs6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N_.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N_.Fs6, 0.04, 0.3],
  ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 9 · merci
  ...head(T.h7, 1, T.h7Land, 0),
  ['whoosh', T.bow[0], 0.4, 0.035], ...run(T.bow[1], [E_.Bb4, E_.G4, E_.Eb4], 0.12, 0.035),
  ...T.claps.map((c, i) => ['clap', c, { ...FX, gain: 0.08, pan: i % 2 ? 0.3 : -0.3 }]),
  ...sob(T.bow[0] + 0.2, 1568),
  ['whoosh', T.irisOut[0], 0.6, 0.03],
  ...ALL.flatMap(([L, c]) => talkCues(L, { cps: c, pitch: PITCH })),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
