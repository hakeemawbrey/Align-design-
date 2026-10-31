// sxsignaricap (45 s vertical Align ad · Star Talk Shows · SIGN × SIGN, EP 2: "Aries × Cancer: A Survival Guide.")
//   story 0–40.6, then the shared end card. Same field-guide look as EP 1 (notebook.js): the graph-paper notebook, sketched
//   specimens, TIP stamps, the PUSH | PULL | ALIGN meter wobbling along the bottom of the page. Generic sign stars (not
//   Orbit's Ember and Tide).
//   0.00–5.90  "Aries × Cancer: | A *survival guide.*"  fig. 1 ♈ Aries (wants: speed) vibrates; fig. 2 ♋ Cancer (wants:
//              softness) in a patchwork blanket. Arrow: "(already outside)". ARIES: "hi! date? now? I'm outside."
//              CANCER: "it's 7 AM. I'm in a blanket."  The blanket goes up to the chin; the needle slams to PUSH.
//   5.90–12.2  "Speed meets | *softness.*"  Aries zooms closer, three suitcases pop in ("(packed for two)"). ARIES: "trip?
//              tomorrow? I packed for two!"  CANCER (blanket up to the eyes): "I don't know your last name."  The needle smokes.
//  12.35       card cut (flip)
//  12.4–18.85  TIP 1 "Aries, slow | your *roll.*"  An hourglass. ARIES: "okay. slow. sloooow." (vibrating with effort, sweat)
//              … crickets … ARIES: "is it date two yet?"  Cancer giggles and peeks out; the needle drifts to PULL.
//  19.0–25.6   TIP 2 "Cancer, say when | you need *a minute.*"  Cancer vanishes into a blanket fort. ARIES: "are you mad??
//              are we over??"  A sign pokes out: "BRB ♥ 1 MIN". CANCER: "not mad. I just need a minute." Aries sits and
//              waits with a stopwatch, proud. fig. 3 becomes "pisces (also needs a minute)".
//  25.80       card cut (deal)
//  25.9–31.15  TIP 3 ↻ (the twist) "Cook | *together.*"  "(only one of you near the stove)". Aries cranks the knob to HIGH;
//              the pancake chars, smoke puffs. CANCER: "babe. that's the high setting." … "you're on salad duty."  Aries
//              holds up one lettuce leaf, beaming. fig. 3: "pisces (chopping onions)".
//  31.2–33.9   "Answers hide | till you *both* play."  A talk card: "Perfect first-date pace?"  Both answers flip together:
//              "a walk. a FAST walk." / "a walk. a slow walk." → both circled "a walk." The needle settles on ALIGN.
//  33.94–38.1 ★ LESSON UNLOCKED: "Fast hearts and soft hearts | *can* sync up."  +1 PACE YOURSELF.
//  38.15–40.5 "Gentle *fire.*"  Aries glows low and warm, Cancer out of the blanket, both heart-eyed; fig. 4 · in sync.
//              The meter is gone (no "Align" in the last 2 s). Out by 40.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { INK, RED, drawNotebook, hand, sketchCircle, sketchArrow, drawMeter, needleWobble, ZONE, tipStamp, showBug,
  BM, bmp, drawHearts, drawTears, eyesOf, drawSweat, sparkBurst, drawSmoke, rgba } from './notebook.js'

export const DURATION = 45
const EP = 2
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => 0.6 + n * 0.5556
const ARI = signStar('aries'), CAN = signStar('cancer'), PIS = signStar('pisces')
const A_TAG = `${ARI.glyph} ARIES`, C_TAG = `${CAN.glyph} CANCER`
const A_TXT = '#ff9a6e', C_TXT = '#8fdcff'
const CPS = 28

const LINES1 = [
  { t: 1.9, speaker: A_TAG, color: A_TXT, text: "hi! date? now? *I'm outside.*" },
  { t: 4.4, speaker: C_TAG, color: C_TXT, text: "it's 7 AM. I'm in *a blanket.*" },
  { t: 7.1, speaker: A_TAG, color: A_TXT, text: 'trip? tomorrow? I packed *for two!*' },
  { t: 9.6, speaker: C_TAG, color: C_TXT, text: "I don't know your *last name.*" },
]
const LINES2 = [
  { t: 13.9, speaker: A_TAG, color: A_TXT, text: 'okay. slow. *sloooow.*' },
  { t: 16.55, speaker: A_TAG, color: A_TXT, text: 'is it *date two* yet?' },
]
const LINES3 = [
  { t: 20.25, speaker: A_TAG, color: A_TXT, text: 'are you mad?? are we *over??*' },
  { t: 22.75, speaker: C_TAG, color: C_TXT, text: 'not mad. I just need *a minute.*' },
]
const LINES4 = [
  { t: 26.7, speaker: C_TAG, color: C_TXT, text: "babe. that's *the high setting.*" },
  { t: 28.85, speaker: C_TAG, color: C_TXT, text: "you're on *salad duty.*" },
]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS }), LT4 = lineTimes(LINES4, { cps: CPS })

const T = {
  black: [0, 0.3], book: [0.05, 0.6],
  h0: 0.2, h0Land: 0.95, h0Out: [5.72, 5.9],
  aIn: 0.7, cIn: 0.9, circles: 1.0, labels: 1.35, meterIn: 1.45, arrow: 2.3, pisIn: 2.7,
  push: LT1[1].chars[20], close1: 12.0,
  // 2 · speed meets softness
  h1: 6.0, h1Land: 6.4, h1Out: [12.0, 12.2], zoom: [6.55, 6.85], bags: LT1[2].chars[24], thrash: [LT1[3].done + 0.2, 12.2],
  cut1: 12.35,
  // 3 · tip 1
  h2: 12.45, h2Land: 12.85, stamp1: 12.6, h2Out: [18.65, 18.85], glass: 13.2, crickets: [15.0, 16.4], giggle: LT2[1].done + 0.1,
  close2: 18.75, glassOut: [18.5, 18.85],
  cand2: 18.95,
  // 4 · tip 2
  h3: 19.05, h3Land: 19.45, stamp2: 19.2, h3Out: [25.45, 25.65], hide: 19.85, sign: LT3[0].done + 0.25, watch: LT3[1].done + 0.2,
  close3: 25.3, unhide: LINES3[1].t,
  cut2: 25.8,
  // 5 · tip 3 (the twist)
  h4: 25.92, h4Land: 26.3, stamp3: 26.05, note: 26.5, h4Out: [31.0, 31.15], stove: 26.2, crank: 26.4, low: LT4[0].done + 0.1,
  leaf: LT4[1].done + 0.15, close4: LT4[1].done + 1.55, stoveOut: [30.9, 31.15],
  cand4: 31.2,
  // 6 · the talk card
  h5: 31.3, h5Land: 31.75, card: 31.35, flip: 32.35, match: 32.85, settle: 32.9, cardOut: [33.7, 33.92], h5Out: [33.7, 33.9],
  // 7 · lesson
  lesson: BEAT(60), lessonOut: [38.0, 38.15],
  // 8 · gentle fire
  meterOut: [37.95, 38.25], hug: [38.05, 38.45], h6: 38.2, h6Land: 38.45,
  out: [40.1, 40.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Fast hearts and soft hearts | *can* sync up.', chip: '+1 PACE YOURSELF', accentColor: GOLD, dim: 0.6 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b

const A_HOME = { x: 262, y: 985, s: 290 }, C_HOME = { x: 818, y: 985, s: 290 }
const A_ZOOM = { x: 365 }, A_HUG = { x: 420 }, C_HUG = { x: 660 }
const PIS_P = { x: 905, y: 575, s: 112 }
const STAMP = { x: 245, y: 585 }

const A_HOPS = [T.aIn + 0.3, ...talkHops(ALL, A_TAG, { cps: CPS }), T.bags, T.watch, T.leaf, T.match + 0.05, T.hug[1], T.hug[1] + 0.56]
const C_HOPS = [T.cIn + 0.3, ...talkHops(ALL, C_TAG, { cps: CPS }), T.giggle, T.giggle + 0.4, T.match + 0.1, T.hug[1] + 0.05, T.hug[1] + 0.61]

const NEEDLE = [
  [0, 0.5, 0.12], [T.push, ZONE.push, 0.04], [T.h1, 0.28, 0.14], [T.thrash[0], 0.4, 0.34], [T.thrash[1], 0.25, 0.07],
  [T.giggle, ZONE.pull, 0.04], [T.h3, 0.3, 0.1], [T.watch, 0.58, 0.04], [T.crank, 0.22, 0.12], [T.low, 0.5, 0.06],
  [T.flip, 0.62, 0.05], [T.settle, ZONE.align, 0.004],
]
function needle(t) {
  let i = 0
  for (let j = 0; j < NEEDLE.length; j++) if (t >= NEEDLE[j][0]) i = j
  const cur = NEEDLE[i], prev = NEEDLE[Math.max(0, i - 1)]
  const e = i === 0 ? 1 : ease.spring(prog(t, cur[0], cur[0] + 0.55), 0.22)
  const amp = lerp(prev[2], cur[2], prog(t, cur[0], cur[0] + 0.3))
  return needleWobble(t, lerp(prev[1], cur[1], e), amp, 7)
}

function aPos(t) {
  // Aries vibrates in place all film (it can't sit still); hardest while trying to go slow
  const jit = inR(t, [T.glass, T.giggle]) ? 4 * Math.sin(t * 61) : inR(t, [T.watch, T.cut2]) ? 2 * Math.sin(t * 53) : 1.2 * Math.sin(t * 47)
  if (t < T.zoom[0]) return { ...A_HOME, x: A_HOME.x + jit }
  if (t < T.close1) return { ...A_HOME, x: lerp(A_HOME.x, A_ZOOM.x, ease.spring(prog(t, ...T.zoom), 0.25)) + jit }
  if (t < T.cut1) return { ...A_HOME, x: lerp(A_ZOOM.x, A_HOME.x, ease.inOutCubic(prog(t, T.close1, T.cut1))) }
  if (t < T.hug[0]) return { ...A_HOME, x: A_HOME.x + jit }
  return { ...A_HOME, x: lerp(A_HOME.x, A_HUG.x, ease.spring(prog(t, ...T.hug), 0.2)), y: A_HOME.y - Math.sin(Math.PI * prog(t, ...T.hug)) * 40 }
}
function cPos(t) {
  if (t < T.hug[0]) return C_HOME
  return { ...C_HOME, x: lerp(C_HOME.x, C_HUG.x, ease.spring(prog(t, T.hug[0] + 0.05, T.hug[1] + 0.05), 0.2)), y: C_HOME.y - Math.sin(Math.PI * prog(t, ...T.hug)) * 40 }
}
// the blanket: 0 = none, 1 = up to the eyes, 1.3 = a full fort
const COVER = [[0, 0], [LINES1[1].t, 0.5], [LINES1[3].t - 0.3, 0.95], [T.cut1, 0.55], [T.giggle, 0.2], [T.hide, 1.35], [T.unhide, 0.4], [T.cut2, 0]]
function cover(t) {
  let i = 0
  for (let j = 0; j < COVER.length; j++) if (t >= COVER[j][0]) i = j
  const prev = COVER[Math.max(0, i - 1)][1], cur = COVER[i][1]
  return lerp(prev, cur, ease.spring(prog(t, COVER[i][0], COVER[i][0] + 0.45), 0.15))
}

function aState(t) {
  const st = { mood: 'happy', look: [1, 0], blink: undefined, squash: 0, sweat: 0 }
  if (t < LINES1[0].t) { st.mood = 'wide'; return st }
  if (t < LINES1[1].t) return st
  if (t < LINES1[2].t) { st.mood = t < T.push + 0.3 ? 'happy' : 'sparkle'; return st }
  if (t < LINES1[3].t) { st.mood = 'heart'; return st }
  if (t < T.cut1) { st.mood = 'wide'; st.squash = -0.1 * Math.exp(-(t - LT1[3].done) * 4) * (t > LT1[3].done ? 1 : 0); return st }
  if (t < LINES2[0].t) { st.mood = 'neutral'; st.look = [0, 0]; return st }
  if (t < T.giggle) { st.mood = t < LT2[0].done ? 'squint' : 'wide'; st.look = [0, -1]; st.sweat = 1; st.blink = false; return st }
  if (t < T.cand2) { st.mood = 'sparkle'; return st }
  if (t < LINES3[0].t) { st.mood = 'happy'; return st }
  if (t < T.sign) { st.mood = 'wide'; st.sweat = 1; return st }
  if (t < T.watch) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.cut2) { st.mood = 'happy'; return st }
  if (t < LINES4[0].t) { st.mood = 'sparkle'; return st }
  if (t < T.leaf) { st.mood = t < LINES4[1].t ? 'wide' : 'neutral'; st.look = [1, 0]; return st }
  if (t < T.cand4) { st.mood = 'sparkle'; st.look = [0, -1]; return st }
  if (t < T.match) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.hug[0]) { st.mood = 'happy'; return st }
  st.mood = 'heart'; return st
}
function cState(t) {
  const st = { mood: 'sleepy', look: [-1, 0], blink: undefined, squash: 0, sweat: 0 }
  if (t < LINES1[0].t + 0.4) { st.zzz = false; return st }
  if (t < LINES1[2].t) { st.mood = t < LINES1[1].t ? 'wide' : 'neutral'; return st }
  if (t < T.cut1) { st.mood = 'wide'; st.sweat = 1; return st }
  if (t < T.giggle) { st.mood = 'neutral'; st.look = [-1, 0]; return st }
  if (t < T.cand2) { st.mood = 'happy'; return st }
  if (t < T.unhide) { st.mood = 'neutral'; return st }
  if (t < T.cut2) { st.mood = t < T.watch ? 'happy' : 'sparkle'; return st }
  if (t < LINES4[0].t) { st.mood = 'wide'; return st }
  if (t < T.leaf) { st.mood = 'squint'; return st }
  if (t < T.cand4) { st.mood = 'happy'; return st }
  if (t < T.match) { st.mood = 'neutral'; st.look = [-1, -1]; return st }
  if (t < T.hug[0]) { st.mood = 'happy'; return st }
  st.mood = 'heart'; return st
}

// ── pixel props
const LEAF = BM(`....GG.. ..GGLG.. .GGLGGG. GGLGGGG. GLGGGG.. GGGG.... .GG.....`)
const LEAF_PAL = { G: '#4fb84a', L: '#a6e88f' }
const SUITCASE = (c) => ({ X: '#1b1236', B: c, H: '#ffffff' })

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 58px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Aries × Cancer: | A *survival guide.*', { top: 168, size: 98, accentSize: 130, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Land, lateGap: 0.12, wobble: true, accentColor: GOLD, fit: true })
  const H1 = popText(root, 'Speed meets | *softness.*', { top: 160, size: 108, accentSize: 138, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: C_TXT, fit: true })
  const H2 = popText(root, 'Aries, slow | your *roll.*', { top: 160, size: 108, accentSize: 140, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, wobble: true, accentColor: A_TXT, fit: true })
  const H3 = popText(root, 'Cancer, say when | you need *a minute.*', { top: 168, size: 96, accentSize: 124, at: T.h3, gap: 0.08, late: 2, lateAt: T.h3Land + 0.2, lateGap: 0.12, wobble: true, accentColor: C_TXT, fit: true })
  const H4 = popText(root, 'Cook | *together.*', { top: 160, size: 112, accentSize: 150, at: T.h4, late: 1, lateAt: T.h4Land + 0.15, wobble: true, accentColor: GOLD, fit: true })
  const H5 = popText(root, 'Answers hide | till you *both* play.', { top: 168, size: 98, accentSize: 128, at: T.h5, gap: 0.08, late: 0, wobble: true, accentColor: GOLD, fit: true })
  const H6 = popText(root, 'Gentle *fire.*', { top: 210, size: 128, accentSize: 176, at: T.h6, gap: 0.1, late: 1, lateAt: T.h6Land, wobble: true, accentColor: A_TXT, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.out]]
  const BOX = { y: 1450, width: 960, height: 290, cps: CPS }
  const box1 = dialogueBox(root, { lines: LINES1, ...BOX, close: T.close1 })
  const box2 = dialogueBox(root, { lines: LINES2, ...BOX, close: T.close2 })
  const box3 = dialogueBox(root, { lines: LINES3, ...BOX, close: T.close3 })
  const box4 = dialogueBox(root, { lines: LINES4, ...BOX, close: T.close4 })
  const lesson = buildLesson(root, LESSON)
  showBug(root, EP)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sketches(t, o) {
    if (o <= 0) return
    x.save(); x.globalAlpha *= clamp(o)
    const cOut = 1 - prog(t, T.hug[0] - 0.2, T.hug[0])
    sketchCircle(x, A_HOME.x, A_HOME.y - 6, 178, 172, prog(t, T.circles, T.circles + 0.45) * cOut, 2)
    sketchCircle(x, C_HOME.x, C_HOME.y - 6, 178, 172, prog(t, T.circles + 0.15, T.circles + 0.6) * cOut, 5)
    const lk = i => prog(t, T.labels + i * 0.25, T.labels + i * 0.25 + 0.45)
    hand(x, 'fig. 1 · aries', A_HOME.x, 1196, { size: 40, k: lk(0), alpha: cOut })
    hand(x, 'wants: speed', A_HOME.x, 1238, { size: 32, color: RED, k: lk(1), alpha: cOut })
    hand(x, 'fig. 2 · cancer', C_HOME.x, 1196, { size: 40, k: lk(0.5), alpha: cOut })
    hand(x, 'wants: softness', C_HOME.x, 1238, { size: 32, color: RED, k: lk(1.5), alpha: cOut })
    if (t < T.cut1) {
      const two = t >= T.bags
      const t0 = two ? T.bags + 0.2 : T.arrow
      const ao = two ? 1 - prog(t, T.close1, T.cut1) : 1 - prog(t, T.h1 - 0.1, T.h1 + 0.1)
      if (two || t < T.h1 + 0.1) {
        hand(x, two ? '(packed for two)' : '(already outside)', 520, 712, { size: 36, k: prog(t, t0, t0 + 0.5), alpha: ao, rot: -0.04 })
        sketchArrow(x, 470, 742, two ? 470 : 335, two ? 860 : 930, prog(t, t0 + 0.3, t0 + 0.7), { alpha: 0.85 * ao })
      }
    }
    if (t > T.pisIn) {
      const cap = t < T.h3 ? 'fig. 3 · pisces (unrelated)' : t < T.h4 ? 'fig. 3 · pisces (also needs a minute)' : t < T.hug[0] ? 'fig. 3 · pisces (chopping onions)' : 'fig. 3 · pisces (so happy)'
      const t0 = t < T.h3 ? T.pisIn + 0.3 : t < T.h4 ? T.h3 + 0.5 : t < T.hug[0] ? T.h4 + 0.5 : T.hug[0]
      hand(x, cap, 1000, 668, { size: 27, k: prog(t, t0, t0 + 0.5), rot: -0.03, align: 'right' })
    }
    if (t > T.hug[0]) {
      sketchCircle(x, 540, 975, 300, 190, prog(t, T.hug[0] + 0.2, T.hug[0] + 0.7), 9, { color: RED })
      hand(x, 'fig. 4 · in sync', 540, 1218, { size: 42, color: RED, k: prog(t, T.hug[0] + 0.4, T.hug[0] + 0.9) })
    }
    if (t > T.note && t < T.h4Out[1]) hand(x, '(only one of you near the stove)', 300, 668, { size: 30, color: RED, k: prog(t, T.note, T.note + 0.7), alpha: outK(t, T.h4Out), rot: -0.03 })
    x.restore()
  }

  // Cancer's patchwork blanket, pulled up to `c` (1 = the eyes, 1.3 = a full fort)
  function blanket(t, P, c, o) {
    if (c <= 0.02 || o <= 0) return
    const s = P.s, bot = P.y + 0.46 * s, top = bot - c * 0.62 * s, w = 0.6 * s
    x.save(); x.globalAlpha *= clamp(o)
    const cols = ['#f59cc4', '#8fd8f6', '#f2c75c', '#c9a6ff']
    const cell = 36
    x.beginPath()
    x.moveTo(P.x - w, bot)
    for (let i = 0; i <= 12; i++) { const u = i / 12; x.lineTo(P.x - w + 2 * w * u, top + Math.sin(u * Math.PI * 3 + t * 2) * 8 - (c > 1.1 ? Math.sin(u * Math.PI) * 60 : 0)) }
    x.lineTo(P.x + w, bot); x.closePath()
    x.fillStyle = INK; x.save(); x.translate(0, 6); x.fill(); x.restore()
    x.clip()
    for (let gy = bot; gy > top - 90; gy -= cell) for (let gxx = P.x - w; gxx < P.x + w; gxx += cell) {
      const k = Math.round((gxx - P.x + w) / cell) + Math.round((bot - gy) / cell)
      x.fillStyle = cols[((k % 4) + 4) % 4]; x.fillRect(gxx, gy - cell, cell, cell)
      x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(gxx + 4, gy - cell + 4, cell - 8, 3)
    }
    x.restore()
  }

  function suitcases(t, P) {
    if (t < T.bags || t > T.cut1) return
    const o = 1 - prog(t, T.close1, T.cut1);
    [['#f0603a', -150, 1062], ['#2fc79a', -150, 990], ['#f2c75c', -140, 925]].forEach(([c, dx, y], i) => {
      const k = pop01(t, T.bags + i * 0.12, 0.3, 2.6) * o
      if (k <= 0.01) return
      x.save(); x.translate(P.x + dx - 30, y); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-52, -34, 104, 68); x.fillStyle = c; x.fillRect(-46, -28, 92, 56)
      x.fillStyle = 'rgba(255,255,255,0.4)'; x.fillRect(-46, -28, 92, 6); x.fillStyle = INK; x.fillRect(-14, -44, 28, 10); x.fillRect(-4, -28, 8, 56)
      x.restore()
    })
  }

  function hourglass(t) {
    if (t < T.glass || t > T.glassOut[1]) return
    const k = pop01(t, T.glass, 0.36, 2.2) * outK(t, T.glassOut)
    if (k <= 0.01) return
    const sand = clamp((t - T.glass) / 6)
    x.save(); x.translate(560, 690); x.scale(k, k); x.rotate(0.04 * Math.sin(t * 2))
    x.fillStyle = '#7a4a26'; x.fillRect(-90, -130, 180, 18); x.fillRect(-90, 112, 180, 18)
    x.fillStyle = INK
    x.beginPath(); x.moveTo(-70, -112); x.lineTo(70, -112); x.lineTo(10, 0); x.lineTo(70, 112); x.lineTo(-70, 112); x.lineTo(-10, 0); x.closePath(); x.fill()
    x.fillStyle = '#eaf6ff'
    x.beginPath(); x.moveTo(-60, -104); x.lineTo(60, -104); x.lineTo(5, 0); x.lineTo(60, 104); x.lineTo(-60, 104); x.lineTo(-5, 0); x.closePath(); x.fill()
    x.fillStyle = '#e9b24a'
    const tt = 1 - sand * 0.35, by = 104 - sand * 40
    x.beginPath(); x.moveTo(-60 * tt * 0.9, -104 + 104 * (1 - tt)); x.lineTo(60 * tt * 0.9, -104 + 104 * (1 - tt)); x.lineTo(5, -4); x.lineTo(-5, -4); x.closePath(); x.fill()
    x.beginPath(); x.moveTo(-58, 104); x.lineTo(58, 104); x.lineTo(0, by - 6); x.closePath(); x.fill()
    if (Math.floor(t * 10) % 2) x.fillRect(-2, 0, 4, by - 4)
    x.restore()
    hand(x, 'speed: 0.25×', 560, 862, { size: 34, color: RED, alpha: k })
  }

  function brbSign(t, P) {
    if (t < T.sign || t > T.unhide + 0.5) return
    const k = pop01(t, T.sign, 0.3, 2.6) * (1 - prog(t, T.unhide, T.unhide + 0.4))
    if (k <= 0.01) return
    x.save(); x.translate(P.x - 40, P.y - 170 + Math.sin(t * 5) * 6); x.rotate(-0.08); x.scale(k, k)
    x.fillStyle = '#7a4a26'; x.fillRect(-5, 30, 10, 90)
    x.fillStyle = INK; x.fillRect(-110, -50, 220, 100); x.fillStyle = '#fffaf0'; x.fillRect(-104, -44, 208, 88)
    x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = RED; x.fillText('BRB ♥ 1 MIN', 0, 3)
    x.restore()
  }

  function stopwatch(t, P) {
    if (t < T.watch || t > T.cut2) return
    const k = pop01(t, T.watch, 0.32, 2.4)
    const secs = Math.min(59, Math.floor((t - T.watch) * 12))
    x.save(); x.translate(P.x + 150, 800); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-10, -88, 20, 18); x.beginPath(); x.arc(0, 0, 74, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fffaf0'; x.beginPath(); x.arc(0, 0, 64, 0, Math.PI * 2); x.fill()
    x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(`0:${String(secs).padStart(2, '0')}`, 0, 2)
    x.restore()
  }

  function stove(t) {
    if (t < T.stove || t > T.stoveOut[1]) return
    const k = pop01(t, T.stove, 0.36, 2.2) * outK(t, T.stoveOut)
    if (k <= 0.01) return
    const high = t >= T.crank && t < T.low, char = clamp(prog(t, T.crank + 0.3, T.crank + 1.8)) * (t < T.low ? 1 : 1 - prog(t, T.low, T.low + 0.6))
    x.save(); x.translate(540, 730); x.scale(k, k)
    // stovetop
    x.fillStyle = INK; x.fillRect(-170, 0, 340, 70); x.fillStyle = '#d9d4e4'; x.fillRect(-164, 6, 328, 58)
    // knob + LOW/HIGH
    const ang = high ? 1.3 : -1.3
    x.fillStyle = INK; x.beginPath(); x.arc(110, 35, 22, 0, Math.PI * 2); x.fill()
    x.strokeStyle = '#fffaf0'; x.lineWidth = 6; x.beginPath(); x.moveTo(110, 35); x.lineTo(110 + Math.sin(ang) * 18, 35 - Math.cos(ang) * 18); x.stroke()
    x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('LOW', 70, 92); x.fillStyle = high ? RED : INK; x.fillText('HIGH', 150, 92)
    // burner glow + pan
    x.fillStyle = high ? '#ff6a3a' : '#ffb04a'; x.fillRect(-120, -6, 140, 8)
    x.fillStyle = INK; x.fillRect(-140, -40, 180, 34); x.fillRect(40, -30, 90, 12)
    x.fillStyle = '#4a4470'; x.fillRect(-134, -36, 168, 26)
    // the pancake (golden → charred → golden again under Cancer)
    const c0 = [233, 178, 74], c1 = [58, 40, 30], pc = c0.map((v, i) => Math.round(lerp(v, c1[i], char)))
    x.fillStyle = `rgb(${pc})`; x.fillRect(-110, -50, 120, 18)
    x.restore()
    if (char > 0.3) drawSmoke(x, t, 500, 670, char)
  }

  function leaf(t, r) {
    if (t < T.leaf || t > T.cand4 + 0.2) return
    const k = pop01(t, T.leaf, 0.34, 2.6) * (1 - prog(t, T.cand4 - 0.2, T.cand4 + 0.2))
    x.save(); x.translate(r.x + 130, r.y - 150 + Math.sin(t * 4) * 6); x.rotate(0.2); x.scale(k, k)
    bmp(x, LEAF, -40, -35, 10, LEAF_PAL); x.restore()
    if (t < T.leaf + 0.8) sparkBurst(x, t, r.x + 130, r.y - 150, T.leaf + 0.05, { n: 8, R: 110, size: 20, seed: 2 })
  }

  // the talk card: question, two face-down answers, flipped together
  function talkCard(t) {
    if (t < T.card || t > T.cardOut[1]) return
    const k = pop01(t, T.card, 0.38, 2) * outK(t, T.cardOut)
    if (k <= 0.01) return
    x.save(); x.translate(540, 700); x.scale(k, k); x.rotate(-0.02)
    x.fillStyle = INK; x.fillRect(-260, -190, 520, 380); x.fillStyle = '#1b1236'; x.fillRect(-252, -182, 504, 364)
    x.fillStyle = GOLD; x.fillRect(-252, -182, 504, 6)
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('TALK CARD', 0, -150)
    x.font = `italic 600 44px 'EB Garamond', serif`; x.fillStyle = '#efe6d6'; x.fillText('Perfect first-date pace?', 0, -100)
    const ans = [['♈', 'a walk.', 'a FAST walk.', '#ff9a6e'], ['♋', 'a walk.', 'a slow walk.', '#8fdcff']]
    ans.forEach(([g, a1, a2, col], i) => {
      const y = -10 + i * 120, f = prog(t, T.flip, T.flip + 0.3), sx = Math.abs(Math.cos(Math.PI * f))
      x.save(); x.translate(0, y); x.scale(sx < 0.02 ? 0.02 : sx, 1)
      if (f < 0.5) { x.fillStyle = '#3b2758'; x.fillRect(-220, -46, 440, 92); x.fillStyle = '#563a80'; for (let j = 0; j < 8; j++) x.fillRect(-200 + j * 54, -30, 30, 60) }
      else {
        x.fillStyle = '#fffaf0'; x.fillRect(-220, -46, 440, 92)
        x.font = `700 30px ${MONO}`; x.textAlign = 'left'; x.fillStyle = col; x.fillText(g, -200, 2)
        x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.fillText(`${a1} ${a2.replace(a1 + ' ', '')}`, -160, 2)
      }
      x.restore()
      if (t > T.match) sketchCircle(x, 540 - 92 + 0, 700 + y, 74, 32, prog(t, T.match + i * 0.1, T.match + i * 0.1 + 0.35), 11 + i, { color: RED, width: 5 })
    })
    x.restore()
  }

  function drawPisces(t, o) {
    if (t < T.pisIn) return
    const k = pop01(t, T.pisIn, 0.4, 2.4) * o
    let mood = 'happy'
    if (inR(t, [T.h3, T.cut2])) mood = 'sleepy'
    else if (inR(t, [T.h4, T.cand4])) mood = 'squint'
    else if (t >= T.hug[0]) mood = 'sparkle'
    const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, mood, look: [-1, 1], seed: 17, pop: k, glow: 0.3, zzz: false,
      hops: [T.pisIn + 0.3, T.giggle + 0.1, T.match + 0.2, T.hug[1] + 0.1] })
    const e = eyesOf(r)
    if (k > 0.3) drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: clamp(o), seed: 4, fountain: true })
    // the onion (tip 3)
    if (inR(t, [T.h4 + 0.3, T.cand4])) { x.fillStyle = '#e8d2f0'; x.fillRect(PIS_P.x - 92, PIS_P.y + 10, 30, 28); x.fillStyle = '#9a6ab0'; x.fillRect(PIS_P.x - 84, PIS_P.y + 2, 14, 10) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const o = popOut(t, T.out)
      if (o > 0) {
        drawNotebook(x, t, { k: prog(t, ...T.book) * clamp(o), entry: 'No. 2' })
        if (t > T.book[1]) {
          sketches(t, o)
          drawPisces(t, o)
          hourglass(t)
          stove(t)
          talkCard(t)
          const ap = aPos(t), cp = cPos(t), as = aState(t), cs = cState(t)
          const ak = pop01(t, T.aIn, 0.4, 2.2) * o, ck = pop01(t, T.cIn, 0.4, 2.2) * o
          suitcases(t, ap)
          // speed lines behind Aries when it zooms
          if (inR(t, [T.zoom[0], T.zoom[1] + 0.4])) { const a = 1 - prog(t, T.zoom[1], T.zoom[1] + 0.4); x.fillStyle = rgba(INK, 0.5 * a); for (let i = 0; i < 4; i++) x.fillRect(ap.x - 260 - i * 18, ap.y - 80 + i * 50, 120, 6) }
          // the end: Aries glows low and warm (gentle fire)
          const warm = t > T.hug[0] ? 0.9 : 0.35
          const ra = drawStarChar(x, ap.x, ap.y, A_HOME.s, t, { color: ARI.color, glyph: ARI.glyph, mood: as.mood, look: as.look, blink: as.blink, squash: as.squash, hops: A_HOPS, seed: 3, pop: ak, glow: warm })
          if (as.sweat && ak > 0.5) drawSweat(x, t, ra.x + 110, ra.y - 140, 8)
          const rc = drawStarChar(x, cp.x, cp.y, C_HOME.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cs.mood, look: cs.look, blink: cs.blink, hops: C_HOPS, seed: 8, pop: ck, glow: 0.35, zzz: false })
          if (cs.sweat && ck > 0.5 && cover(t) < 1) drawSweat(x, t, rc.x + 120, rc.y - 140, 8)
          blanket(t, cp, cover(t), ck)
          brbSign(t, cp)
          stopwatch(t, ap)
          leaf(t, ra)
          if (t > T.giggle && t < T.cand2) drawHearts(x, t, T.giggle + 0.1, rc.x, rc.y - 120, { n: 4, px: 7, spread: 120 })
          if (inR(t, T.crickets)) for (let i = 0; i < 2; i++) { if (Math.sin(t * 18 + i * 2) > 0) hand(x, '♪', 420 + i * 300, 900 + (i ? -20 : 0), { size: 40, color: rgba(INK, 0.6) }) }
          if (t > T.hug[0]) drawHearts(x, t, T.hug[0] + 0.3, 540, 820, { n: 8, px: 7, spread: 300, alpha: clamp(o) })
          const mk = pop01(t, T.meterIn, 0.42, 2) * outK(t, T.meterOut)
          drawMeter(x, t, needle(t), { k: mk, smoke: inR(t, T.thrash) ? 1 - prog(t, T.thrash[1] - 0.3, T.thrash[1]) : 0, stamp: prog(t, T.settle + 0.05, T.settle + 0.2) })
          if (t > T.settle && t < T.settle + 0.9) sparkBurst(x, t, 540 + 390 * (ZONE.align * 2 - 1), 1300, T.settle + 0.05, { n: 10, R: 160, size: 22, seed: 6 })
          tipStamp(x, t, 1, T.stamp1, { ...STAMP, out: outK(t, T.h2Out) })
          tipStamp(x, t, 2, T.stamp2, { ...STAMP, out: outK(t, T.h3Out) })
          tipStamp(x, t, 3, T.stamp3, { ...STAMP, out: outK(t, T.h4Out), twist: true })
        }
      }
      box1.update(t); box2.update(t); box3.update(t); box4.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, ok] of HEADS) h.update(t, outK(t, ok))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card cuts: the default selection keeps the 2nd and 4th candidates (12.35 → tip 1, 25.8 → tip 3).
const CUTS = [5.9, { t: T.cut1, kind: 'flip' }, T.cand2, { t: T.cut2, kind: 'deal' }, T.cand4]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const land = (t, f = 1046.5) => [['pop', +t.toFixed(3), f, 0.05, 0], ['pluck', +t.toFixed(3), f, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const scratch = t => [chip(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chip(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', t, 0.06]]
const stampHit = t => [['boom', +t.toFixed(3), 0.2], ['tom', +t.toFixed(3), 70, { gain: 0.22, decay: 0.3, rev: 0.15 }], ['tick', +t.toFixed(3), 0.07]]
const crickets = ([a, b]) => { const out = []; for (let t = a; t < b; t += 0.42) out.push(chip(t, 4300, 0.035, { gain: 0.022, rev: 0.2, dly: 0 }), chip(t + 0.07, 4300, 0.035, { gain: 0.018, rev: 0.2, dly: 0 })); return out }
const flutter = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (1 - i / n * 0.5)])

export const CUES = [
  ['whoosh', T.book[0], 0.45, 0.05], ['boom', T.book[1] - 0.05, 0.16], ['tick', T.book[1] - 0.05, 0.06],
  ...wordPops(T.h0, 3, 0.08, 0, 0.022), ...land(T.h0Land), ['pop', T.h0Land + 0.12, 1174.66, 0.04, 0],
  ['pop', T.aIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.cIn + 0.05, 523.25, 0.04, 0.3],
  ...flutter(T.circles, 8, 0.06, 0.02), ...flutter(T.labels, 10, 0.07, 0.018),
  ['pop', T.meterIn + 0.1, 880, 0.03, 0], ['pop', T.pisIn + 0.1, 1174.66, 0.03, 0.5], ['glitter', T.pisIn + 0.1, T.pisIn + 0.5],
  ...flutter(T.arrow, 6, 0.07, 0.018),
  ['pop', T.push, 392, 0.05, -0.2], ['tom', T.push, 90, { gain: 0.18, decay: 0.25, rev: 0.15 }], ['whoosh', LINES1[1].t, 0.3, 0.02],
  ...wordPops(T.h1, 2, 0.08, 2), ...land(T.h1Land),
  ['whoosh', T.zoom[0], 0.25, 0.05], ...[0, 1, 2].map(i => ['pop', +(T.bags + i * 0.12).toFixed(3), [659.25, 783.99, 880][i], 0.04, -0.3]),
  ...scratch(LT1[3].done + 0.15), ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.thrash[0] + 0.1 + i * 0.13).toFixed(3), 0.03]),
  ...stampHit(T.stamp1), ...wordPops(T.h2, 2, 0.08, 1), ...land(T.h2Land), ['pop', T.h2Land + 0.14, 1174.66, 0.04, 0],
  ['pop', T.glass + 0.05, 783.99, 0.035, 0], ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.glass + 0.4 + i * 0.4).toFixed(3), 0.015]),
  ...crickets(T.crickets),
  ['pluck', T.giggle, 1318.51, 0.04, 0.5, 0.3], ['pop', T.giggle + 0.15, 1174.66, 0.03, 0.3], ['pop', T.giggle + 0.3, 1318.51, 0.03, 0.3], ['glitter', T.giggle, T.giggle + 0.5],
  ...stampHit(T.stamp2), ...wordPops(T.h3, 4, 0.08, 3), ...land(T.h3Land + 0.2), ['pop', T.h3Land + 0.32, 1174.66, 0.04, 0],
  ['whoosh', T.hide, 0.3, 0.04], ['pop', T.hide + 0.2, 392, 0.04, 0.3],
  ['pop', T.sign, 1046.5, 0.045, 0.2], ['tick', T.sign + 0.05, 0.04],
  ['bell', T.watch, 1567.98, 0.035, 1.2, -0.3], ...Array.from({ length: 8 }, (_, i) => ['tick', +(T.watch + 0.3 + i * 0.25).toFixed(3), 0.02]),
  ...stampHit(T.stamp3), ...wordPops(T.h4, 1, 0.08, 4), ...land(T.h4Land + 0.15), ...flutter(T.note, 9, 0.07, 0.018),
  ['pop', T.stove + 0.05, 880, 0.035, 0], ['tick', T.crank, 0.05], chip(T.crank + 0.05, 300, 0.4, { slide: 6, gain: 0.04, duty: 0.5 }),
  ['whoosh', T.crank + 0.6, 0.8, 0.02], ['whoosh', T.crank + 1.2, 0.8, 0.02],
  ['tick', T.low, 0.05], ['pluck', T.low + 0.05, 783.99, 0.035, 0.5, 0],
  ['pop', T.leaf, 1318.51, 0.05, -0.3], ['bell', T.leaf + 0.05, 1567.98, 0.035, 1.2, -0.3], ['glitter', T.leaf, T.leaf + 0.5],
  ['whoosh', T.card, 0.35, 0.03], ...wordPops(T.h5, 6, 0.08, 0, 0.022),
  ['tick', T.flip, 0.05], ['tick', T.flip + 0.15, 0.05], ['pluck', T.flip + 0.2, 1046.5, 0.04, 0.6, 0],
  ['pluck', T.match, 1318.51, 0.045, 0.8, -0.3], ['pluck', T.match + 0.1, 1567.98, 0.045, 0.8, 0.3],
  ...stampHit(T.settle + 0.1), ['glitter', T.settle + 0.1, T.settle + 0.7], ['bell', T.settle + 0.15, 1567.98, 0.035, 1.6, 0.3],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.hug[0], 0.35, 0.03], ['glitter', T.hug[0] + 0.2, T.hug[0] + 0.8],
  ...wordPops(T.h6, 1, 0.1, 0, 0.028), ...land(T.h6Land, 1318.51),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL, { cps: CPS, pitch: { [A_TAG]: 880, [C_TAG]: 587.33 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
