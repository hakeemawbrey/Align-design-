// stfairytale — "Once Upon a Star." (60 s vertical Align ad, Star Talk "Wild Lessons" #13, music: dreamy, Ab).
// A pop-up storybook lying open in the night sky: every chapter is a page that turns, and the scenery folds up out of
// the paper. Cinderella, but the glass slipper pinched and the princess went home to her sweatpants. Story 0–55.6,
// then the shared end card.
// Cast: ♎ PRINCESS LIBRA (gown + tiara at the ball; sweatpants + messy bun at home) · ♌ PRINCE LEO (crown, velvet
// pillow, one glass slipper) · ♉ TAURUS (the neighbour: sweatpants, popcorn, ruled by Venus like Libra) · the slipper
// line: ♈ ARIES, ♍ VIRGO, ♐ SAG · ♓ PISCES (the fairy godmother on a cloud with a wand, crying at every page).
//   0.00–4.4   The book opens (hit 0.6): "A STAR TALK STORYBOOK" · "Once upon | a star."  THE STARS: "once upon a
//              time… a ball."
//   4.49–10.6  Page turn (drop). "Chapter one: | the ball." The castle folds up; Libra (gown) and Leo (crown) waltz.
//              LEO: "you're perfect. are you even real?"  LIBRA: "been getting ready since Tuesday."
//  10.6–16.1   Page turn. "Then the clock | struck twelve." The clock tower folds up, 11:59 → DONG ×3.
//              LIBRA: "gotta go! lashes melting!" — she zips off, a glass slipper tinkles onto the page.
//              LEO: "she left… a shoe?"
//  16.16       card cut (flip).
//  16.16–28.3  "He searched the | whole kingdom." Village pop-ups; Leo with the slipper on a velvet pillow.
//              Rule of three: ARIES: "it fits if I shove." (squeak squeak) · VIRGO: "has this been sanitized?"
//              (spray) · SAG (in sandals): "sorry. I'm a sandals person." Then the twist: "He knew her shoe. | Not
//              her name." LEO: "…wait. what was her name?"
//  28.38–37.2  Page turn (breakdown). "Meanwhile, | in sweatpants…" A cosy flat: Libra on the couch in sweatpants and
//              a messy bun, noodles, the gown dumped on the floor, the tiara on the lamp. LIBRA: "finally. that
//              slipper pinched." KNOCK KNOCK — Leo at the door; record scratch. LIBRA: "oh hey! it's me. off duty."
//              "He only loved | the gown." LEO: "…I'll keep looking." He backs out; Pisces bawls.
//  37.27       card cut (deal) — the lift.
//  37.27–45.5  "But someone loved | this version." TAURUS pops in, also in sweatpants, with popcorn:
//              "nice bun. want some popcorn?"  LIBRA: "you like me… like this?"  Taurus slides her fuzzy slippers:
//              "And the slipper | fit." (PERFECT FIT)  TAURUS: "this is my favourite you."
//  45.6–50.0   ★ LESSON UNLOCKED: "Find someone who loves | the sweatpants you."  +1 COMFORT
//  50.04–52.8  Page turn. "Card first. | Face last." A veiled mystery card folds up off the page: words, no face.
//  52.82–55.5  Page turn. "Happily ever | after-hours." The two of them on the couch, TV glow, popcorn, slippers;
//              "~ the end ~" on the page. Everything fades to the plain sky.
//  55.6        end card.
// One canvas (sky + book + pop-ups + cast), DOM type + dialogue box + the shared LESSON beat above it, grain on top.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, easeOutBack } from '../../wheel.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  starFrame, inSprite, cellToWorld, tiaraCells, crownCells, bunCells, sweatpantsCells, gownCells, slipperCells, sandalCells, tearsCells,
  drawBook, popUp, drawCastle, drawClockTower, drawHouse, drawApartment, drawCouch, drawTV, drawDoor,
  drawGlassSlipper, drawPillow, drawWand, drawBowl, drawSpray, drawMysteryCard, drawCloud, confetti, drawPixels, HEART, BOOK,
} from './props.js'

export const DURATION = 60
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7dffb0', CYAN = '#7fe0ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BL = 60 / 108
const BEAT = n => +(0.6 + n * BL).toFixed(3)  // 108 bpm grid
const LIB = signStar('libra'), LEO_S = signStar('leo'), TAU_S = signStar('taurus'), ARI = signStar('aries'), VIR = signStar('virgo'), SAG_S = signStar('sagittarius'), PIS = signStar('pisces')

// ── the timeline
const T = {
  black: [0, 0.3],
  bookIn: [0.15, 0.6], cover: [0.75, 1.45],
  slam: BEAT(0), title2: BEAT(1), titleOut: [4.05, 4.4],
  l0: 1.6,
  ball: BEAT(7),                                 // 4.489 page turn → chapter one (the drop)
  h1: 4.6, h1Land: 4.98, h1Out: [10.3, 10.5],
  l1: 5.3, l2: 8.25,
  mid: BEAT(18),                                 // 10.6 page turn → midnight
  h2: 10.75, h2Land: 11.15, h2Out: [15.85, 16.05],
  dong: [BEAT(20), BEAT(21), BEAT(22)],          // 11.711 12.267 12.822
  l3: 12.2, zip: [13.62, 13.92], drop: 13.95, land: 14.35, l4: 14.95,
  search: BEAT(28),                              // 16.156 card cut (flip) → the search
  h3: 16.2, h3Land: 16.6, h3Out: [25.6, 25.8],
  in1: [16.55, 17.0], l5: 17.45, shove: [18.3, 19.5], out1: [19.75, 20.05],
  in2: [20.05, 20.45], l6: 20.5, spray: 21.55, out2: [22.85, 23.15],
  in3: [23.15, 23.55], l7: 23.55, out3: [25.9, 26.25],
  h3b: 25.85, h3bLand: 26.3, h3bOut: [28.05, 28.25],
  l8: 26.4,
  home: BEAT(50),                                // 28.378 page turn → meanwhile (breakdown)
  h4: 28.45, h4Land: 28.95, h4Out: [34.55, 34.75],
  l9: 29.05, knock: [30.95, 31.3], door: [31.45, 31.75], scratch: 31.95, l10: 32.2,
  h4b: 34.75, h4bLand: 35.15, h4bOut: [37.0, 37.2],
  l11: 35.25, back: [36.1, 37.0], doorShut: [36.75, 37.05],
  tau: BEAT(66),                                 // 37.267 card cut (deal) → someone (the lift)
  h5: 37.32, h5Land: 37.82, h5Out: [41.95, 42.15],
  tauIn: [37.3, 37.75], l12: 37.8, l13: 40.55, hand: [41.75, 42.15], fit: 42.3,
  h5b: 42.3, h5bLand: 42.7, h5bOut: [45.3, 45.5],
  l14: 43.2, close: 45.62,
  lesson: BEAT(81), lessonOut: [49.8, 50.02],    // 45.6
  card: BEAT(89),                                // 50.044 page turn → card first
  h6: 50.1, h6Land: 50.5, h6Out: [52.55, 52.75], cardUp: 50.3,
  last: BEAT(94),                                // 52.822 page turn → happily ever after-hours
  h7: 52.9, h7Land: 53.4, theEnd: 53.9,
  out: [55.05, 55.5],
}
const TURNS = [T.ball, T.mid, T.search, T.home, T.tau, T.card, T.last]

// ── the script
const STARS = 'THE STARS', LIBN = '♎︎ PRINCESS LIBRA', LEON = '♌︎ PRINCE LEO', ARIN = '♈︎ ARIES', VIRN = '♍︎ VIRGO', SAGN = '♐︎ SAG', TAUN = '♉︎ TAURUS'
const LIB_C = '#ff9cf0', LEO_C = '#ffc070', ARI_C = '#ff9a7a', VIR_C = '#ff9cc0', SAG_C = '#d2a8ff', TAU_C = '#ffd98a'
const LINES = [
  { t: T.l0, speaker: STARS, text: 'once upon a time… a *ball.*' },
  { t: T.l1, speaker: LEON, color: LEO_C, text: 'you’re *perfect.* are you even real?' },
  { t: T.l2, speaker: LIBN, color: LIB_C, text: 'been getting ready since *Tuesday.*' },
  { t: T.l3, speaker: LIBN, color: LIB_C, text: 'gotta go! lashes *melting!*' },
  { t: T.l4, speaker: LEON, color: LEO_C, text: 'she left… a *shoe?*' },
  { t: T.l5, speaker: ARIN, color: ARI_C, text: 'it fits if I *shove.*' },
  { t: T.l6, speaker: VIRN, color: VIR_C, text: 'has this been *sanitized?*' },
  { t: T.l7, speaker: SAGN, color: SAG_C, text: 'sorry. I’m a *sandals* person.' },
  { t: T.l8, speaker: LEON, color: LEO_C, text: '…wait. what was her *name?*' },
  { t: T.l9, speaker: LIBN, color: LIB_C, text: 'finally. that slipper *pinched.*' },
  { t: T.l10, speaker: LIBN, color: LIB_C, text: 'oh hey! it’s me. *off duty.*' },
  { t: T.l11, speaker: LEON, color: LEO_C, text: '…I’ll keep *looking.*' },
  { t: T.l12, speaker: TAUN, color: TAU_C, text: 'nice bun. want some *popcorn?*' },
  { t: T.l13, speaker: LIBN, color: LIB_C, text: 'you like me… *like this?*' },
  { t: T.l14, speaker: TAUN, color: TAU_C, text: 'this is my *favourite* you.' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Find someone who loves | the *sweatpants* you.', chip: '+1 COMFORT', accentColor: PINK, dim: 0.62 }

const HOPS = {
  lib: [4.95, ...talkHops(LINES, LIBN, { cps: CPS }), T.zip[0] - 0.1, T.scratch + 0.45, T.fit, T.fit + 0.35, T.cardUp + 0.1, 53.1, 54.0],
  leo: [4.95, ...talkHops(LINES, LEON, { cps: CPS }), 16.4, T.door[1], T.scratch],
  tau: [T.tauIn[1], ...talkHops(LINES, TAUN, { cps: CPS }), T.hand[1], T.fit + 0.2, 53.25, 54.15],
  ari: [T.in1[1], ...talkHops(LINES, ARIN, { cps: CPS })],
  vir: [T.in2[1], ...talkHops(LINES, VIRN, { cps: CPS })],
  sag: [T.in3[1], ...talkHops(LINES, SAGN, { cps: CPS }), 24.9],
  pis: [4.75, 5.5, 11.8, 12.4, T.zip[1], T.l11 + 0.4, T.l11 + 0.8, T.fit, T.fit + 0.4, 46.0, 53.5],
}

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
function talkW(t, who) {
  let w = 0
  LINES.forEach((L, i) => { if (L.speaker === who) w = Math.max(w, prog(t, L.t - 0.22, L.t) * (1 - prog(t, LT[i].done + 0.35, LT[i].done + 0.7))) })
  return ease.inOutQuad(w)
}
function sceneAt(t) {
  if (t < T.ball) return 'hook'
  if (t < T.mid) return 'ball'
  if (t < T.search) return 'mid'
  if (t < T.home) return 'search'
  if (t < T.tau) return 'home'
  if (t < T.card) return 'tau'
  if (t < T.last) return 'card'
  return 'last'
}
/** a pop-up's fold factor: folds up at a, folds down at b */
const fold = (t, a, b) => easeOutBack(prog(t, a, a + 0.45), 1.5) * (1 - ease.inCubic(prog(t, b - 0.28, b)))
/** the page leaf turning over (0…1) at the nearest turn */
function leafAt(t) { for (const s of TURNS) { const p = prog(t, s - 0.05, s + 0.5); if (p > 0 && p < 1) return ease.inOutCubic(p) } return null }

// ── geometry
const BOX = { y: 1536, width: 960, height: 250, cps: CPS }
const PIS_AT = { x: 132, y: 664 }
const BASE = BOOK.yT + 22                          // where the pop-ups stand (the back of the page)
const STAND = 1196                                 // a hero star's centre when standing on the page

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "italic 500 160px 'EB Garamond'", "600 50px 'EB Garamond'", "italic 500 50px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 27px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0a = el('div', { position: 'absolute', left: '0px', top: '590px', width: W + 'px', textAlign: 'center', font: `600 38px ${SERIF}`, letterSpacing: '0.2em', paddingLeft: '0.2em', boxSizing: 'border-box',
    color: GOLD, textShadow: '0 0 26px rgba(242,199,92,0.5), 0 4px 18px rgba(6,4,18,0.9)', whiteSpace: 'nowrap', display: 'none', transformOrigin: '50% 50%' }, root, 'A STAR TALK STORYBOOK')
  const H0b = popText(root, 'Once upon | a *star.*', { top: 656, size: 132, accentSize: 196, at: T.title2 - 0.16, gap: 0.08, late: 1, lateAt: T.title2 + 0.14, wobble: true, accentColor: PINK })
  const HD = (text, at, land, o = {}) => popText(root, text, { top: 150, size: 100, accentSize: 148, at, late: 1, lateAt: land, wobble: true, fit: true, ...o })
  const HEADS = [
    [HD('Chapter one: | the *ball.*', T.h1, T.h1Land, { accentColor: PINK, accentSize: 160 }), T.h1Out],
    [HD('Then the clock | struck *twelve.*', T.h2, T.h2Land, { accentColor: GOLD }), T.h2Out],
    [HD('He searched the | whole *kingdom.*', T.h3, T.h3Land, { accentColor: CYAN, size: 92, accentSize: 140 }), T.h3Out],
    [HD('He knew her shoe. | Not her *name.*', T.h3b, T.h3bLand, { accentColor: LEO_C, size: 92, accentSize: 148 }), T.h3bOut],
    [HD('Meanwhile, | in *sweatpants…*', T.h4, T.h4Land, { accentColor: LAV, accentSize: 150 }), T.h4Out],
    [HD('He only loved | the *gown.*', T.h4b, T.h4bLand, { accentColor: PINK, accentSize: 160 }), T.h4bOut],
    [HD('But someone loved | *this* version.', T.h5, T.h5Land, { accentColor: GOLD, size: 92, accentSize: 148 }), T.h5Out],
    [HD('And the slipper | *fit.*', T.h5b, T.h5bLand, { accentColor: PINK, accentSize: 170 }), T.h5bOut],
    [HD('Card first. | Face *last.*', T.h6, T.h6Land, { accentColor: GOLD }), T.h6Out],
    [HD('Happily ever | *after-hours.*', T.h7, T.h7Land, { accentColor: PINK, accentSize: 156 }), T.out],
  ]
  const box = dialogueBox(root, { ...BOX, lines: LINES, open: T.l0 - 0.24, close: T.close })
  // ★ LESSON UNLOCKED (shared module): after the scene layers, before grain and the card cuts
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const txt = (s, X, Y, font, col, align = 'center', base = 'middle') => { x.font = font; x.textAlign = align; x.textBaseline = base; x.fillStyle = col; x.fillText(s, X, Y) }
  const label = (s, X, Y, col, k = 1, size = 28) => {
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= clamp(k); x.translate(X, Y); x.scale(lerp(0.6, 1, clamp(k)), lerp(0.6, 1, clamp(k)))
    x.font = `700 ${size}px ${MONO}`; const tw = x.measureText(s).width + 30
    x.beginPath(); x.roundRect(-tw / 2, -size * 0.85, tw, size * 1.7, 8); x.fillStyle = 'rgba(16,9,38,0.88)'; x.fill(); x.strokeStyle = rgba(col, 0.85); x.lineWidth = 3; x.stroke()
    txt(s, 0, 1, `700 ${size}px ${MONO}`, col); x.restore()
  }
  function sparkles(t, cx, cy, t0, n, R, seed, life = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  const heart = (hx, hy, cell, a = 1) => { if (a > 0.01) drawPixels(x, HEART, hx, hy, cell, { X: '#ff5c7a', W: '#ffd2da' }, { outline: INK, alpha: a }) }

  /** one star with its costume. c = { gown, tiara, crown, crownTilt, crownLift, bun, pants, slippers, sandals, tears } */
  function star(t, P, c = {}) {
    if (P.pop <= 0.02 || P.a <= 0.01) return null
    const opts = { color: P.color, glyph: c.pants ? null : P.glyph, mood: P.mood, look: P.look, blink: P.blink, squash: P.sq || 0, hops: P.hops, seed: P.seed, pop: P.pop, glow: 0.95, bob: P.bob ?? 4 }
    x.save(); x.globalAlpha *= P.a ?? 1
    x.translate(P.x, P.y); if (P.rot) x.rotate(P.rot)
    const F = starFrame(0, 0, P.size, t, opts)
    if (c.gown) inSprite(x, F, () => gownCells(x, t, '#ff8fd8', '#c94fae'))
    drawStarChar(x, 0, 0, P.size, t, opts)
    inSprite(x, F, () => {
      if (c.pants) sweatpantsCells(x)
      if (c.slippers) slipperCells(x)
      if (c.sandals) sandalCells(x)
      if (c.tiara) tiaraCells(x)
      if (c.bun) bunCells(x)
      if (c.crown) crownCells(x, c.crownTilt || 0, c.crownLift || 0)
      if (c.tears) tearsCells(x, t, c.tears)
      if (c.sweat) { const d = (t * 0.9) % 1; x.fillStyle = INK; x.fillRect(28.8, 9 + 4 * d, 2.4, 3.4); x.fillStyle = '#8fe3ff'; x.fillRect(29.2, 9.4 + 4 * d, 1.6, 2.6) }
    })
    x.restore()
    return { F, P }
  }

  // ═══════════════════════ the pop-up scenery (per page) ═══════════════════════
  function scenery(t) {
    const sc = sceneAt(t)
    // page 1: the castle
    if (t > T.ball - 0.3 && t < T.mid + 0.05) popUp(x, 540, BASE, fold(t, T.ball + 0.3, T.mid), () => drawCastle(x, 15, t))
    // page 2: the clock tower
    if (t > T.mid && t < T.search + 0.05) {
      const hk = ease.inOutCubic(prog(t, T.dong[0] - 0.12, T.dong[0]))
      let sh = 0; for (const d of T.dong) sh = Math.max(sh, bump(t, d, 0.35))
      popUp(x, 540, BASE, fold(t, T.mid + 0.35, T.search), () => drawClockTower(x, 14, t, hk, sh))
      for (const d of T.dong) { const k = t - d; if (k > 0 && k < 0.8) { x.save(); x.globalAlpha = 1 - k / 0.8; txt('DONG', 540 + (d === T.dong[1] ? 210 : -210), 760 - k * 40, `800 ${56 + 30 * k}px ${INTER}`, GOLD); x.restore() } }
    }
    // page 3: the village
    if (t > T.search && t < T.home + 0.05) {
      const k = fold(t, T.search + 0.3, T.home)
      popUp(x, 196, BASE, k, () => drawHouse(x, 13, t, '#f3c9a8', '#b8506a'))
      popUp(x, 540, BASE - 2, fold(t, T.search + 0.4, T.home), () => drawHouse(x, 15, t, '#cfe3f2', '#5a7ac8'))
      popUp(x, 884, BASE, fold(t, T.search + 0.5, T.home), () => drawHouse(x, 13, t, '#d6f0c8', '#3f9a6a'))
    }
    // pages 4, 5 (+ the lesson) and the last page: the flat
    const flatOn = (t > T.home && t < T.card + 0.05) || t > T.last
    if (flatOn) {
      const k = t < T.card + 0.05 ? fold(t, T.home + 0.3, T.card) : fold(t, T.last + 0.3, 99) * outK(t, T.out)
      popUp(x, 540, BASE, k, () => {
        drawApartment(x, 15, t, { tiaraOnLamp: true })
        if (sc === 'home' || sc === 'tau') { x.save(); x.translate(-13 * 15, 0); drawDoor(x, 15, doorOpen(t)); x.restore() }
        x.save(); x.translate(25 * 15, 0); drawTV(x, 15, t); x.restore()
      })
      popUp(x, 660, BASE + 34, k, () => drawCouch(x, 15, 22))
    }
    void sc
  }
  function doorOpen(t) {
    return ease.outCubic(prog(t, ...T.door)) * (1 - ease.inCubic(prog(t, ...T.doorShut)))
  }

  // ═══════════════════════ Pisces, the fairy godmother ═══════════════════════
  function pisces(t) {
    const k = pop01(t, 4.3, 0.4, 1.8) * outK(t, T.out)
    if (k <= 0.02) return
    const sc = sceneAt(t)
    drawCloud(x, PIS_AT.x, PIS_AT.y + 60, 8, k)
    let mood = 'sparkle', tears = 1, look = [1, 0.4]
    if (sc === 'ball') { mood = 'heart'; tears = 2 }
    if (sc === 'mid') { mood = t > T.dong[0] ? 'wide' : 'heart'; tears = t > T.zip[0] ? 3 : 1 }
    if (sc === 'search') { tears = 2; if (t > T.l8) { mood = 'wide'; tears = 3 } }
    if (sc === 'home') { tears = t > T.l11 ? 3 : 1; mood = t > T.scratch && t < T.l11 ? 'wide' : 'sparkle' }
    if (sc === 'tau') { mood = t > T.fit ? 'heart' : 'sparkle'; tears = t > T.fit ? 3 : 2 }
    if (sc === 'card' || sc === 'last') { mood = 'heart'; tears = 3 }
    const opts = { color: PIS.color, glyph: PIS.glyph, mood, look, hops: HOPS.pis, seed: 11, pop: k, glow: 0.8, bob: 3 }
    // the wand (behind the star, waving)
    const wv = Math.sin(t * 2.6) * 0.25 + (t > T.dong[0] && t < T.zip[1] ? Math.sin(t * 20) * 0.3 : 0)
    x.save(); x.globalAlpha *= k; drawWand(x, PIS_AT.x + 62, PIS_AT.y + 10, 110, 0.5 + wv, t, drawPixelStar); x.restore()
    drawStarChar(x, PIS_AT.x, PIS_AT.y, 124, t, opts)
    const F = starFrame(PIS_AT.x, PIS_AT.y, 124, t, opts)
    inSprite(x, F, () => tearsCells(x, t, tears))
    // a little puddle grows on the cloud over the film
    const pk = clamp((t - 6) / 45)
    if (pk > 0) { x.fillStyle = rgba('#8fe3ff', 0.75 * k); x.fillRect(PIS_AT.x - 30 - 40 * pk, PIS_AT.y + 92, 60 + 80 * pk, 8) }
  }

  // ═══════════════════════ the cast, page by page ═══════════════════════
  function cast(t) {
    const sc = sceneAt(t)
    const lib = { color: LIB.color, glyph: LIB.glyph, size: 220, seed: 3, hops: HOPS.lib, pop: 1, a: 1, look: [0, 0], mood: 'happy' }
    const leo = { color: LEO_S.color, glyph: LEO_S.glyph, size: 220, seed: 5, hops: HOPS.leo, pop: 1, a: 1, look: [0, 0], mood: 'happy' }
    const tau = { color: TAU_S.color, glyph: TAU_S.glyph, size: 206, seed: 7, hops: HOPS.tau, pop: 1, a: 1, look: [-1, 0], mood: 'happy' }
    const spkLib = talkW(t, LIBN) > 0.5, spkLeo = talkW(t, LEON) > 0.5

    if (sc === 'hook') return
    if (sc === 'ball') {
      // the waltz: a slow sway, a turn every bar
      const k = pop01(t, T.ball + 0.4, 0.4, 1.6) * (1 - prog(t, T.mid - 0.2, T.mid + 0.1))
      const sw = Math.sin((t - T.ball) * Math.PI / (2 * BL)) * 36
      Object.assign(leo, { x: 410 + sw, y: STAND, pop: k, rot: sw * 0.0022, look: [1, 0], mood: spkLeo ? 'sparkle' : 'heart' })
      Object.assign(lib, { x: 668 + sw, y: STAND - 6, pop: k, rot: sw * 0.0022, look: [-1, 0], mood: t < T.l2 - 0.2 ? 'happy' : spkLib ? 'sparkle' : 'wink' })
      star(t, leo, { crown: true })
      star(t, lib, { gown: true, tiara: true })
      // little music notes
      for (let i = 0; i < 4; i++) { const ph = ((t - T.ball) * 0.5 + i / 4) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * k; drawPixels(x, ['..XX', '..XX', '..X.', '..X.', 'XXX.', 'XXX.'], 540 + (i % 2 ? 1 : -1) * (120 + 200 * ph), 1000 - 300 * ph, 6, { X: i % 2 ? GOLD : PINK }, { outline: INK }); x.restore() }
      return
    }
    if (sc === 'mid') {
      const z = ease.inCubic(prog(t, ...T.zip))
      Object.assign(leo, { x: 330, y: STAND, look: t > T.zip[0] ? [1, 0.6] : [1, 0], mood: t < T.dong[0] ? 'heart' : t < T.zip[1] ? 'wide' : spkLeo ? 'neutral' : 'squint' })
      if (t > T.l4 - 0.3) leo.look = [1, 1]
      Object.assign(lib, { x: 690 + 760 * z, y: STAND - 6, look: t < T.dong[0] ? [-1, 0] : [0, -1], mood: t < T.dong[0] ? 'happy' : 'wide', sq: -0.3 * bump(t, T.zip[0], 0.4), blink: t > T.dong[0] ? false : undefined })
      if (t > T.l3 && t < T.zip[0]) lib.look = [1, 0]
      star(t, leo, { crown: true })
      if (z < 1) {
        // speed lines on the zip
        const st = bump(t, T.zip[0] + 0.1, 0.4)
        if (st > 0.05) { x.strokeStyle = rgba(BONE, 0.7 * st); x.lineWidth = 6; x.lineCap = 'round'; for (let i = 0; i < 6; i++) { const yy = STAND - 90 + i * 34; x.beginPath(); x.moveTo(lib.x - 140 - 260 * st, yy); x.lineTo(lib.x - 140, yy); x.stroke() } }
        star(t, lib, { gown: true, tiara: true, sweat: t > T.l3 && t < T.zip[0] })
      }
      // the slipper flies off and tinkles onto the page
      if (t > T.drop) {
        const p = prog(t, T.drop, T.land), sx = lerp(820, 690, p), sy = lerp(1240, 1340, p) - Math.sin(Math.PI * p) * 120
        const bnc = bump(t, T.land, 0.25) * 14
        drawGlassSlipper(x, sx, sy - bnc, 7, t, { rot: (1 - p) * 4 })
        sparkles(t, 690, 1320, T.land, 10, 90, 0.3, 0.6, 20)
      }
      return
    }
    if (sc === 'search') {
      Object.assign(leo, { x: 268, y: STAND + 4, size: 206, look: [1, 0.3], mood: spkLeo ? 'neutral' : 'happy' })
      // the candidates
      const tries = [
        { S: ARI, name: ARIN, hops: HOPS.ari, inn: T.in1, out: T.out1, seed: 21 },
        { S: VIR, name: VIRN, hops: HOPS.vir, inn: T.in2, out: T.out2, seed: 22 },
        { S: SAG_S, name: SAGN, hops: HOPS.sag, inn: T.in3, out: T.out3, seed: 23 },
      ]
      let cand = null, ci = -1
      tries.forEach((c, i) => { if (t >= c.inn[0] && t < c.out[1]) { cand = c; ci = i } })
      if (t > T.l8 - 0.4) { leo.look = [0.6, 1]; leo.mood = t < T.l8 + 0.9 ? 'squint' : 'wide'; leo.blink = t > T.l8 + 0.9 ? false : undefined }
      else if (ci === 0 && t > T.shove[0]) leo.mood = 'wide'
      else if (ci === 1 && t > T.spray) leo.mood = 'squint'
      else if (ci === 2 && t > T.l7 + 0.6) leo.mood = 'neutral'
      star(t, leo, { crown: true, crownTilt: t > T.l8 + 0.9 ? -0.18 : 0, crownLift: 4 * bump(t, T.l8 + 0.9, 0.3) })
      // the pillow + slipper
      const onTip = ci === 0 && t > T.shove[0] - 0.25 && t < T.out1[0]
      drawPillow(x, 470, 1300 + 3 * Math.sin(t * 3), 8)
      if (cand) {
        const p = ease.outCubic(prog(t, ...cand.inn)) * (1 - ease.inCubic(prog(t, ...cand.out)))
        const P = { color: cand.S.color, glyph: cand.S.glyph, size: 196, seed: cand.seed, hops: cand.hops, pop: 1, a: 1, x: lerp(1240, 780, p), y: STAND + 2, look: [-1, 0.4], mood: 'happy' }
        const spk = talkW(t, cand.name) > 0.5
        if (ci === 0) { const sh = t > T.shove[0] && t < T.shove[1]; P.sq = sh ? 0.26 * Math.abs(Math.sin((t - T.shove[0]) * 9)) : 0; P.mood = sh ? 'squint' : spk ? 'sparkle' : 'happy'; P.look = [-1, 1] }
        if (ci === 1) { P.mood = t > T.spray ? 'squint' : spk ? 'neutral' : 'eyeroll'; P.look = [-1, 1] }
        if (ci === 2) { P.mood = spk ? 'happy' : 'wink'; P.look = [-1, 0] }
        const R = star(t, P, { sandals: ci === 2, sweat: ci === 0 && t > T.shove[0] })
        if (ci === 0 && R && onTip) {
          const [wx, wy] = cellToWorld(R.F, 6.5, 33.2)
          drawGlassSlipper(x, P.x + wx + 6, P.y + wy + 6, 6.4, t, { rot: -0.25 })
          for (let i = 0; i < 2; i++) { const s0 = T.shove[0] + 0.3 + i * 0.55, kk = t - s0; if (kk > 0 && kk < 0.5) { x.save(); x.globalAlpha = 1 - kk / 0.5; txt('squeak', P.x - 150 + i * 60, 880 - i * 60 - kk * 40, `800 ${40}px ${INTER}`, CYAN); x.restore() } }
        }
        if (ci === 1 && R) drawSpray(x, P.x - 150, P.y + 20, 7, t, T.spray)
        if (ci === 2 && R && t > T.l7 + 0.2) label('SANDALS ONLY', P.x, 1430, SAG_C, pop01(t, T.l7 + 0.2), 24)
      }
      if (!onTip) drawGlassSlipper(x, 470, 1270 + 3 * Math.sin(t * 3), 6.4, t)
      // the realisation
      if (t > T.l8 + 0.9) { const k = pop01(t, T.l8 + 0.9, 0.35, 2.2); x.save(); x.translate(268, 940); x.scale(k, k); txt('?', 0, 0, `800 120px ${INTER}`, LEO_C); x.restore() }
      return
    }
    if (sc === 'home' || sc === 'tau' || (sc === 'card' && t < T.card + 0.4)) {
      // Libra on the couch: sweatpants, messy bun, noodles (popcorn later)
      const fk = t < T.card ? 1 : 1 - prog(t, T.card, T.card + 0.35)
      Object.assign(lib, { x: 600, y: 1150, size: 210, pop: pop01(t, T.home + 0.45, 0.4, 1.6) * fk, look: [1, 0], mood: 'happy', bob: 2 })
      if (sc === 'home') {
        if (t < T.knock[0]) { lib.mood = t < T.l9 + 0.3 ? 'sleepy' : 'happy'; lib.look = [0, 0] }
        else if (t < T.scratch) { lib.mood = 'neutral'; lib.look = [-1, 0] }
        else if (t < T.l11) { lib.mood = spkLib ? 'happy' : 'wink'; lib.look = [-1, 0] }
        else lib.mood = t < T.back[1] ? 'neutral' : 'happy', lib.look = [-1, 0]
      } else if (sc === 'tau') {
        lib.look = [1, 0]
        if (t < T.l12) lib.mood = 'wide'
        else if (t < T.l13) lib.mood = 'sparkle'
        else if (t < T.fit) lib.mood = spkLib ? 'sparkle' : 'wide'
        else lib.mood = 'heart'
      }
      star(t, lib, { pants: true, bun: true, slippers: t > T.fit })
      // the gown, dumped on the floor
      if (sc !== 'card') { x.save(); x.globalAlpha *= lib.pop > 0.02 ? 1 : 0; x.translate(420, 1352); x.rotate(-0.2); x.scale(4.2, 2.6); x.translate(-18, -40); gownCells(x, 0, '#ff8fd8', '#c94fae'); x.restore() }
      // the bowl
      if (lib.pop > 0.05) drawBowl(x, 700, 1206 + 2 * Math.sin(t * 2.2 + 3), 6.5, 'noodles', 0.1)
      // Leo at the door
      if (sc === 'home' && t > T.door[0]) {
        const b = ease.inOutCubic(prog(t, ...T.back))
        const hide = 1 - prog(t, T.doorShut[0] - 0.05, T.doorShut[0] + 0.1)
        Object.assign(leo, { x: 345 - 60 * b, y: STAND - 10, size: 200, pop: pop01(t, T.door[0] + 0.12, 0.35, 1.6), a: hide, look: [1, 0.2], mood: t < T.scratch ? 'happy' : t < T.l11 ? 'wide' : 'neutral', blink: t > T.scratch && t < T.l11 ? false : undefined, sq: -0.2 * bump(t, T.scratch, 0.3) })
        if (t > T.l11 + 0.6) leo.look = [-1, 0]
        star(t, leo, { crown: true, crownLift: 10 * bump(t, T.scratch, 0.35), crownTilt: t > T.scratch ? 0.2 : 0, sweat: t > T.l10 })
        drawPillow(x, 345 + 120 - 60 * b, 1290, 7)
        drawGlassSlipper(x, 345 + 120 - 60 * b, 1264, 5.6, t, { alpha: hide })
      }
      if (sc === 'home') {
        for (let i = 0; i < 2; i++) { const s0 = T.knock[i], kk = t - s0; if (kk > 0 && kk < 0.7) { x.save(); x.globalAlpha = 1 - kk / 0.7; txt('KNOCK', 345 + (i ? 30 : -20), 860 - i * 70 - kk * 30, `800 ${54}px ${INTER}`, BONE); x.restore() } }
      }
      // Taurus, the neighbour
      if (sc === 'tau' || (sc === 'card' && t < T.card + 0.4)) {
        const p = ease.outCubic(prog(t, ...T.tauIn))
        Object.assign(tau, { x: lerp(1220, 870, p), y: STAND - 16, pop: fk, look: [-1, 0], mood: talkW(t, TAUN) > 0.5 ? 'happy' : t > T.fit ? 'heart' : 'sparkle' })
        star(t, tau, { pants: true })
        // the popcorn, then the fuzzy slippers held out
        drawBowl(x, tau.x - 112, 1238 + 2 * Math.sin(t * 2.4), 6.5, 'popcorn', -0.1)
        if (t > T.hand[0] - 0.4 && t < T.fit) {
          const h = ease.outCubic(prog(t, ...T.hand))
          const sx = lerp(tau.x - 120, 640, h), sy = lerp(1150, 1300, h)
          drawPixels(x, ['..WWW......', '.WWWWWFF...', 'WWWWWWWFFF.', 'FPPPPPPPPPF', 'FPPPPPPPPPF', '.FFFFFFFFF.'], sx, sy, 6, { W: '#ffffff', F: '#ff8fb1', P: '#ffc2d6' }, { outline: INK })
        }
        if (t > T.fit) {
          sparkles(t, 600, 1250, T.fit, 12, 140, 0.2, 0.8, 26)
          label('PERFECT FIT ✓', 600, 1452, MINT, pop01(t, T.fit + 0.1, 0.35, 2) * (1 - prog(t, T.lesson - 0.1, T.lesson + 0.2)), 28)
          const hk = pop01(t, T.l14 + 0.6, 0.4, 2.2)
          heart(735, 930 - 8 * Math.sin(t * 3), 12 * hk * (1 + 0.06 * Math.sin(t * 7)))
        }
      }
      return
    }
    if (sc === 'card') {
      const k = fold(t, T.cardUp, T.last)
      popUp(x, 540, BASE + 30, k, () => drawMysteryCard(x, 0, -300, 400, 560, t, { glyph: LIB.glyph, badge: '#ff9cf0', lines: ['COZY NIGHTS IN', 'SWEATPANTS: YES', 'SNACKS: ALWAYS'] }))
      sparkles(t, 540, 940, T.cardUp + 0.3, 12, 280, 0.4, 0.7, 24)
      return
    }
    if (sc === 'last') {
      const k = pop01(t, T.last + 0.5, 0.4, 1.6) * outK(t, T.out)
      Object.assign(lib, { x: 584, y: 1160, size: 190, pop: k, look: [1, 0], mood: t > 54.3 && t < 54.8 ? 'wink' : 'happy', bob: 2 })
      Object.assign(tau, { x: 760, y: 1160, size: 190, pop: k, look: [-1, 0], mood: 'heart', bob: 2 })
      star(t, tau, { pants: true })
      star(t, lib, { pants: true, bun: true, slippers: true })
      if (k > 0.05) { x.save(); x.globalAlpha *= outK(t, T.out); drawBowl(x, 672, 1238, 6.5, 'popcorn'); x.restore() }
      heart(672, 960 - 8 * Math.sin(t * 3), 11 * pop01(t, T.last + 0.9, 0.4, 2.2) * outK(t, T.out))
      // ~ the end ~ on the page
      const ek = prog(t, T.theEnd, T.theEnd + 0.5) * outK(t, T.out)
      if (ek > 0) { x.save(); x.globalAlpha = ek; txt('~ the end ~', 540, 1392, `italic 500 50px ${SERIF}`, '#7a2446'); x.restore() }
    }
  }

  function flash(t) {
    let f = 0
    for (const s of [T.ball, T.mid, T.home, T.card, T.last]) f = Math.max(f, 0.5 * (1 - clamp(Math.abs(t - s - 0.2) / 0.16)))
    const fl = 1 - prog(t, T.slam, T.slam + 0.3)
    if (t >= T.slam) f = Math.max(f, 0.5 * fl)
    for (const d of T.dong) f = Math.max(f, 0.25 * bump(t, d, 0.2))
    if (f > 0) { x.fillStyle = rgba('#fff6e6', 0.4 * f); x.fillRect(0, 0, W, H) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const bk = ease.outCubic(prog(t, ...T.bookIn)) * outK(t, T.out)
        // the book (and its cover swinging open)
        drawBook(x, t, { k: bk, cover: ease.inOutCubic(prog(t, ...T.cover)), leaf: leafAt(t) })
        // a few sparkles rise off the pages as it opens
        sparkles(t, 540, 1150, T.cover[1] - 0.2, 14, 320, 0.2, 0.9, 26)
        if (bk > 0.02) {
          x.save(); x.globalAlpha *= clamp(bk)
          scenery(t)
          cast(t)
          x.restore()
        }
        pisces(t)
        confetti(x, t, T.fit + 0.05, { x0: 600, y0: 1150, n: 60, seed: 9, spread: 0.8 })
        flash(t)
      }
      // cold-open title
      const tp = prog(t, T.slam, T.slam + 0.22), to = outK(t, T.titleOut)
      const showA = t >= T.slam && to > 0
      H0a.style.display = showA ? 'block' : 'none'
      if (showA) {
        H0a.style.opacity = String(clamp(tp * 3) * to)
        H0a.style.letterSpacing = lerp(0.34, 0.2, ease.outCubic(tp)).toFixed(3) + 'em'
        H0a.style.transform = `scale(${(lerp(1.15, 1, ease.outCubic(tp)) * lerp(0.94, 1, to)).toFixed(4)})`
      }
      H0b.update(t, to)
      box.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates at every page change; the default selection keeps 16.156 (→ the search, flip) and 37.267
// (→ Taurus, deal). The page turns at 4.49, 10.6, 28.38, 50.04 and 52.82 play as the book's own page turns.
export const CUTS = [T.mid, { t: T.search, kind: 'flip' }, T.home, { t: T.tau, kind: 'deal' }, T.card]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]
export const DEBUG = { T, LINES, LT, LESSON, CUTS }

// ── sound (pop / pluck / bell are shifted into the key by the engine: write them in C major)
const NOTE = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5]
const FX = { rev: 0.25, dly: 0.1, bus: 'fx' }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.024) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.022) => [...wordPops(t0, n, 0.07, base, gain), ['pop', land, 1046.5, 0.04, 0], ['pluck', land, 1046.5, 0.035, 0.6, 0]]
/** the page turn: a paper flick, a soft whoosh and a little harp glissando */
const pageTurn = t0 => [['whoosh', r3(t0 - 0.05), 0.45, 0.035], ['tick', r3(t0 + 0.02), 0.05], ['tick', r3(t0 + 0.42), 0.04],
  ...NOTE.map((f, i) => ['pluck', r3(t0 + 0.04 + i * 0.045), f, 0.022, 0.8, i % 2 ? 0.25 : -0.25])]
const popUpS = (t0, f = 392) => [['pluck', r3(t0 + 0.1), f, 0.04, 0.4, 0], ['tick', r3(t0 + 0.12), 0.03], ['pop', r3(t0 + 0.3), f * 2, 0.025, 0]]
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
const squeak = t0 => [['chip', r3(t0), 1400, 0.12, { wave: 'square', duty: 0.25, slide: 9, gain: 0.02, decay: 0.08, sustain: 0.6, ...FX }], ['chip', r3(t0 + 0.13), 1700, 0.1, { wave: 'square', duty: 0.25, slide: -7, gain: 0.018, decay: 0.08, sustain: 0.6, ...FX }]]
const knock = t0 => [['boom', t0, 0.12], ['tick', t0, 0.09], ['boom', r3(t0 + 0.13), 0.1], ['tick', r3(t0 + 0.13), 0.08]]
const womp = t0 => [[311.13, 0, 0.26], [293.66, 0.3, 0.26], [277.18, 0.6, 0.26], [261.63, 0.9, 0.9]].map(([f, d, len]) => ['lead', r3(t0 + d), f * 1.6, len, { wave: 'tri', gain: 0.035, cutoff: 1800, vib: d > 0.8 ? 0.02 : 0.006, vibRate: 5.5, decay: 0.3, sustain: 0.85, release: 0.12, ...FX }])
export const CUES = [
  // 0 · the book opens
  ['whoosh', 0.2, 0.4, 0.03], ['tick', T.cover[0] + 0.1, 0.05], ...pageTurn(T.cover[0] + 0.2),
  ['bell', T.slam, 1046.5, 0.04, 2.2, 0], ['glitter', T.slam, T.slam + 1.0], ['boom', T.slam, 0.2],
  ...wordPops(T.title2 - 0.16, 2, 0.08, 1), ['pop', T.title2 + 0.14, 1046.5, 0.045, 0], ['pluck', T.title2 + 0.14, 1046.5, 0.04, 0.7, 0],
  ['pop', T.l0 - 0.24, 659.25, 0.03, 0], ['pop', T.l0 - 0.18, 880, 0.022, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [STARS]: 760, [LIBN]: 1150, [LEON]: 560, [ARIN]: 700, [VIRN]: 980, [SAGN]: 820, [TAUN]: 480 } }),
  // 1 · chapter one: the ball
  ...pageTurn(T.ball), ...head(T.h1, 2, T.h1Land, 0), ...popUpS(T.ball + 0.3, 392),
  ['bell', T.l2 + 1.0, 1318.51, 0.025, 1.2, 0.3],
  // 2 · midnight
  ...pageTurn(T.mid), ...head(T.h2, 3, T.h2Land, 2), ...popUpS(T.mid + 0.35, 330),
  ['tick', T.dong[0] - 0.12, 0.08],
  ...T.dong.map(d => ['bell', d, 261.63, 0.07, 2.6, 0]), ...T.dong.map(d => ['boom', d, 0.12]),
  ['whoosh', T.zip[0], 0.3, 0.06], ['chip', T.zip[0], 520, 0.28, { wave: 'square', slide: 24, gain: 0.02, decay: 0.2, sustain: 0.5, ...FX }],
  ['bell', T.land, 2093, 0.035, 0.8, 0.3], ['bell', T.land + 0.1, 2637, 0.025, 0.7, 0.3], ['glitter', T.land, T.land + 0.5],
  // 3 · the search (card cut at 16.156)
  ...head(T.h3, 3, T.h3Land, 4), ...popUpS(T.search + 0.3, 392), ...popUpS(T.search + 0.5, 440),
  ['whoosh', T.in1[0], 0.35, 0.03], ['whoosh', T.in2[0], 0.35, 0.03], ['whoosh', T.in3[0], 0.35, 0.03],
  ...squeak(T.shove[0] + 0.3), ...squeak(T.shove[0] + 0.85),
  ['whoosh', T.spray, 0.25, 0.04], ['whoosh', T.spray + 0.35, 0.2, 0.03],
  ['pop', T.l7 + 0.2, 784, 0.03, 0.3],
  ...head(T.h3b, 3, T.h3bLand, 1), ['pop', T.l8 + 0.9, 1318.51, 0.04, -0.3], ['tick', T.l8 + 0.9, 0.05],
  // 4 · meanwhile, in sweatpants (breakdown)
  ...pageTurn(T.home), ...head(T.h4, 1, T.h4Land, 3), ...popUpS(T.home + 0.3, 349.23),
  ...knock(T.knock[0]), ...knock(T.knock[1]), ['tick', T.door[0], 0.05], ['whoosh', T.door[0], 0.3, 0.02],
  ...scratch(T.scratch),
  ...head(T.h4b, 3, T.h4bLand, 0),
  ...womp(T.back[0] + 0.1), ['boom', T.doorShut[1], 0.12], ['tick', T.doorShut[1], 0.06],
  // 5 · someone loved this version (the lift; card cut at 37.267)
  ...head(T.h5, 3, T.h5Land, 2),
  ['whoosh', T.tauIn[0], 0.4, 0.03],
  ['whoosh', T.hand[0], 0.3, 0.03],
  ['bell', T.fit, 1318.51, 0.04, 1.6, 0], ['bell', T.fit + 0.12, 1567.98, 0.03, 1.4, 0.2], ['glitter', T.fit, T.fit + 0.9],
  ['swell', T.fit - 0.4, T.fit + 0.9, { gain: 0.03, f0: 600, f1: 3500 }],
  ...head(T.h5b, 3, T.h5bLand, 4),
  ['pop', T.l14 + 0.6, 1174.66, 0.03, 0.2], ['pop', T.close, 880, 0.022, 0],
  // 6 · ★ LESSON UNLOCKED
  ['whoosh', T.lesson - 0.1, 0.3, 0.03],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Ab' }),
  // 7 · card first, face last
  ...pageTurn(T.card), ...head(T.h6, 3, T.h6Land, 2), ...popUpS(T.cardUp, 523.25), ['glitter', T.cardUp + 0.3, T.cardUp + 0.9],
  // 8 · happily ever after-hours
  ...pageTurn(T.last), ...head(T.h7, 2, T.h7Land, 0), ...popUpS(T.last + 0.3, 392),
  ['bell', T.theEnd, 1046.5, 0.03, 2.0, 0], ['pluck', 54.32, 1567.98, 0.03, 0.5, -0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
