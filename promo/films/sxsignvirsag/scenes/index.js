// sxsignvirsag (45 s vertical Align ad · Star Talk Shows · SIGN × SIGN, EP 3: "Virgo × Sagittarius: A Survival Guide.")
//   story 0–40.6, then the shared end card. Same field-guide look as EP 1–2 (notebook.js).
//   0.00–5.90  "Virgo × Sagittarius: | A *survival guide.*"  fig. 1 ♍ Virgo (wants: a plan) with a laminated clipboard;
//              fig. 2 ♐ Sagittarius (wants: adventure) with a backpack. VIRGO: "saturday: 9:00 brunch. 9:47 walk."
//              SAG: "saturday? I'll be on a mountain."  The needle slams to PUSH.
//   5.90–12.2  "Planner meets | *free spirit.*"  VIRGO: "which mountain? what time??"  SAG: "I'll know when I see it."
//              Virgo's clipboard drops; synced squint, record scratch; the needle smokes. "(bag: always packed)".
//  12.35       card cut (flip)
//  12.4–18.85  TIP 1 "Virgo, leave one | *blank square.*"  A colour-coded calendar with one empty square. VIRGO: "it's…
//              empty. it hurts." (eye twitch, crickets)  SAG sticks a star in it: "that's where the fun goes!"  Virgo
//              writes "fun (tbd)" in it, delighted. The needle swings to PULL.
//  19.0–25.6   TIP 2 "Sag, text back | when you *land.*"  A plane crosses the page. VIRGO's phone: "did you land? are you
//              alive??" (three bubbles)… buzz: "landed! ♥" + a goat photo. SAG: "landed! sent you a goat pic." Virgo melts.
//  25.80       card cut (deal)
//  25.9–31.15  TIP 3 ↻ (the twist) "Plan a *spontaneous* trip."  "(virgo colour-codes the spontaneity)". An itinerary:
//              1:00 pack snacks · 2:00 BE SPONTANEOUS · 2:15 recover. VIRGO: "2:00 to 2:15: be spontaneous."
//              SAG: "…honestly? I love this."  Both heart-eyed.
//  31.2–33.9   "Push. Pull. *Align.*"  The needle sweeps PUSH → PULL → ALIGN; a red ring stamps around ALIGN (the tie-in).
//  33.94–38.1 ★ LESSON UNLOCKED: "Structure and adventure | make a great *road trip.*"  +1 PACKED SNACKS.
//  38.15–40.5 "Bon *voyage.*"  Both stars roll across the page in a little pixel car; fig. 4 · road trip. The meter is gone
//              (no "Align" in the last 2 s). Out by 40.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { INK, RED, drawNotebook, hand, sketchCircle, sketchArrow, drawMeter, needleWobble, ZONE, tipStamp, showBug,
  BM, bmp, drawHearts, drawTears, eyesOf, drawSweat, sparkBurst, rgba } from './notebook.js'

export const DURATION = 45
const EP = 3
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BEAT = n => 0.6 + n * 0.5556
const VIR = signStar('virgo'), SAG = signStar('sagittarius'), PIS = signStar('pisces')
const V_TAG = `${VIR.glyph} VIRGO`, S_TAG = `${SAG.glyph} SAGITTARIUS`
const V_TXT = '#ff8fb8', S_TXT = '#c9a6ff'
const CPS = 28

const LINES1 = [
  { t: 1.9, speaker: V_TAG, color: V_TXT, text: 'saturday: 9:00 brunch. *9:47 walk.*' },
  { t: 4.5, speaker: S_TAG, color: S_TXT, text: "saturday? I'll be *on a mountain.*" },
  { t: 7.15, speaker: V_TAG, color: V_TXT, text: 'which mountain? *what time??*' },
  { t: 9.6, speaker: S_TAG, color: S_TXT, text: "I'll know when *I see it.*" },
]
const LINES2 = [
  { t: 13.9, speaker: V_TAG, color: V_TXT, text: "it's… empty. it *hurts.*" },
  { t: 16.55, speaker: S_TAG, color: S_TXT, text: "that's where *the fun* goes!" },
]
const LINES3 = [
  { t: 20.25, speaker: V_TAG, color: V_TXT, text: 'did you land? are you *alive??*' },
  { t: 22.75, speaker: S_TAG, color: S_TXT, text: 'landed! sent you *a goat pic.*' },
]
const LINES4 = [
  { t: 26.7, speaker: V_TAG, color: V_TXT, text: '2:00 to 2:15: *be spontaneous.*' },
  { t: 28.85, speaker: S_TAG, color: S_TXT, text: '…honestly? *I love this.*' },
]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS }), LT4 = lineTimes(LINES4, { cps: CPS })

const T = {
  black: [0, 0.3], book: [0.05, 0.6],
  h0: 0.2, h0Land: 0.95, h0Out: [5.72, 5.9],
  vIn: 0.7, sIn: 0.9, circles: 1.0, labels: 1.35, meterIn: 1.45, arrow: 2.3, pisIn: 2.7, board: 1.1, pack: 1.3,
  push: LT1[1].chars[24], close1: 12.0,
  h1: 6.0, h1Land: 6.4, h1Out: [12.0, 12.2], drop: LT1[3].done + 0.1, squint: LT1[3].done + 0.25, thrash: [LT1[3].done + 0.25, 12.2],
  cut1: 12.35,
  h2: 12.45, h2Land: 12.95, stamp1: 12.6, h2Out: [18.65, 18.85], cal: 13.2, twitch: [LT2[0].done, 16.5], crickets: [15.1, 16.4],
  sticker: LT2[1].chars[14], fun: LT2[1].done + 0.15, calOut: [18.55, 18.85], close2: 18.75,
  cand2: 18.95,
  h3: 19.05, h3Land: 19.45, stamp2: 19.2, h3Out: [25.45, 25.65], plane: [19.5, 21.3], phone: 19.8,
  b1: LT3[0].chars[12], b2: LT3[0].done, b3: LT3[0].done + 0.45, buzz: 22.5, goat: LT3[1].chars[22], melt: LT3[1].done + 0.2,
  phoneOut: [25.3, 25.6], close3: 25.3,
  cut2: 25.8,
  h4: 25.92, h4Land: 26.35, stamp3: 26.05, note: 26.5, h4Out: [31.0, 31.15], itin: 26.25, ring: LT4[0].done + 0.05, love: LT4[1].done + 0.05,
  itinOut: [30.9, 31.15], close4: LT4[1].done + 1.55,
  cand4: 31.2,
  h5: 31.45, swP: 31.55, swU: 32.05, swA: 32.6, h5Out: [33.7, 33.9],
  lesson: BEAT(60), lessonOut: [38.0, 38.15],
  meterOut: [37.95, 38.25], car: [38.1, 38.55], h6: 38.2, h6Land: 38.45,
  out: [40.1, 40.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Structure and adventure | make a great *road trip.*', chip: '+1 PACKED SNACKS', accentColor: GOLD, dim: 0.6 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b

const V_HOME = { x: 262, y: 985, s: 290 }, S_HOME = { x: 818, y: 985, s: 290 }
const PIS_P = { x: 905, y: 575, s: 112 }
const STAMP = { x: 245, y: 585 }
const CAR_Y = 1030

const V_HOPS = [T.vIn + 0.3, ...talkHops(ALL, V_TAG, { cps: CPS }), T.fun, T.melt, T.ring, T.swA + 0.1]
const S_HOPS = [T.sIn + 0.3, ...talkHops(ALL, S_TAG, { cps: CPS }), T.sticker, T.goat, T.love, T.swA + 0.15]

const NEEDLE = [
  [0, 0.5, 0.12], [T.push, ZONE.push, 0.04], [T.h1, 0.3, 0.15], [T.thrash[0], 0.42, 0.34], [T.thrash[1], 0.28, 0.07],
  [T.fun, ZONE.pull, 0.035], [T.h3, 0.26, 0.1], [T.melt, 0.56, 0.04], [T.h4, 0.4, 0.12], [T.love, 0.62, 0.04],
  [T.swP, ZONE.push, 0.01], [T.swU, ZONE.pull, 0.01], [T.swA, ZONE.align, 0.004],
]
function needle(t) {
  let i = 0
  for (let j = 0; j < NEEDLE.length; j++) if (t >= NEEDLE[j][0]) i = j
  const cur = NEEDLE[i], prev = NEEDLE[Math.max(0, i - 1)]
  const e = i === 0 ? 1 : ease.spring(prog(t, cur[0], cur[0] + 0.55), 0.22)
  const amp = lerp(prev[2], cur[2], prog(t, cur[0], cur[0] + 0.3))
  return needleWobble(t, lerp(prev[1], cur[1], e), amp, 11)
}

// the last beat: both ride in the car, which rolls in from the left and parks centre
function carX(t) { return lerp(-360, 540, ease.outBack(prog(t, ...T.car))) }

function vState(t) {
  const st = { mood: 'neutral', look: [1, 0], blink: undefined, squash: 0, sweat: 0 }
  if (t < LINES1[0].t) { st.mood = 'happy'; return st }
  if (t < LINES1[1].t) { st.mood = 'happy'; return st }
  if (t < LINES1[2].t) { st.mood = t < T.push + 0.2 ? 'neutral' : 'wide'; return st }
  if (t < T.squint) { st.mood = t < LINES1[3].t ? 'squint' : 'wide'; st.sweat = 1; return st }
  if (t < T.cut1) { st.mood = 'squint'; st.squash = 0.12 * Math.exp(-(t - T.squint) * 5); return st }
  if (t < LINES2[0].t) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.sticker) { st.mood = inR(t, T.twitch) && Math.sin(t * 22) > 0.3 ? 'squint' : 'wide'; st.look = [1, -1]; st.sweat = 1; st.blink = false; return st }
  if (t < T.fun) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.cand2) { st.mood = 'sparkle'; return st }
  if (t < T.buzz) { st.mood = 'wide'; st.look = [1, -1]; st.sweat = t > LINES3[0].t ? 1 : 0; return st }
  if (t < T.melt) { st.mood = 'neutral'; st.look = [1, -1]; return st }
  if (t < T.cut2) { st.mood = 'heart'; return st }
  if (t < T.ring) { st.mood = 'happy'; return st }
  if (t < T.love) { st.mood = 'sparkle'; return st }
  if (t < T.cand4) { st.mood = 'heart'; return st }
  if (t < T.swA) { st.mood = 'neutral'; st.look = [1, 1]; return st }
  st.mood = t < T.car[0] ? 'happy' : 'heart'; return st
}
function sState(t) {
  const st = { mood: 'happy', look: [-1, 0], blink: undefined, squash: 0, sweat: 0 }
  if (t < LINES1[2].t) { st.mood = t < LINES1[1].t ? 'neutral' : 'happy'; st.look = t < LINES1[1].t ? [1, -1] : [-1, 0]; return st }
  if (t < T.squint) { st.mood = 'happy'; st.look = [1, -1]; return st }
  if (t < T.cut1) { st.mood = 'squint'; st.squash = 0.12 * Math.exp(-(t - T.squint) * 5); return st }
  if (t < LINES2[1].t) { st.mood = 'neutral'; return st }
  if (t < T.cand2) { st.mood = 'happy'; return st }
  if (t < T.plane[1]) { st.mood = 'sleepy'; return st }
  if (t < T.buzz) { st.mood = 'neutral'; st.look = [0, 1]; return st }
  if (t < T.cut2) { st.mood = 'happy'; return st }
  if (t < LINES4[1].t) { st.mood = t < T.ring ? 'neutral' : 'wide'; st.look = [-1, -1]; return st }
  if (t < T.love + 0.2) { st.mood = 'squint'; return st }
  if (t < T.cand4) { st.mood = 'heart'; return st }
  if (t < T.swA) { st.mood = 'neutral'; st.look = [-1, 1]; return st }
  st.mood = t < T.car[0] ? 'happy' : 'heart'; return st
}

// ── pixel props
const GOAT = BM(`..H.....H.. ..HH...HH.. ...WWWWW... ..WWEWEWW.. ..WWWWWWW.. ...WWNWW... ....WWW.... ....B.B....`)
const GOAT_PAL = { H: '#b9b4c8', W: '#ffffff', E: '#1b1236', N: '#ff8fb1', B: '#b9b4c8' }
const PLANE = BM(`....X....... ....XX...... XXXXXXXXXXX. .XXXXXXXXXXX ....XX...... ....X.......`)
const CAL_COLS = ['#f59cc4', '#8fd8f6', '#f2c75c', '#7dffb0', '#c9a6ff']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 58px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Virgo × Sagittarius: | A *survival guide.*', { top: 168, size: 92, accentSize: 128, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Land, lateGap: 0.12, wobble: true, accentColor: GOLD, fit: true })
  const H1 = popText(root, 'Planner meets | *free spirit.*', { top: 160, size: 106, accentSize: 136, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: S_TXT, fit: true })
  const H2 = popText(root, 'Virgo, leave one | *blank square.*', { top: 160, size: 100, accentSize: 134, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: V_TXT, fit: true })
  const H3 = popText(root, 'Sag, text back | when you *land.*', { top: 160, size: 104, accentSize: 140, at: T.h3, gap: 0.08, late: 1, lateAt: T.h3Land + 0.25, wobble: true, accentColor: S_TXT, fit: true })
  const H4 = popText(root, 'Plan a *spontaneous* | trip.', { top: 160, size: 104, accentSize: 136, at: T.h4, gap: 0.08, late: 2, lateAt: T.h4Land, lateGap: 0.18, wobble: true, accentColor: GOLD, fit: true })
  const H5 = popText(root, 'Push. Pull. *Align.*', { top: 230, size: 112, accentSize: 150, at: T.swP, gap: T.swU - T.swP, late: 1, lateAt: T.swA, wobble: true, accentColor: GOLD, fit: true })
  const H6 = popText(root, 'Bon *voyage.*', { top: 210, size: 128, accentSize: 176, at: T.h6, gap: 0.1, late: 1, lateAt: T.h6Land, wobble: true, accentColor: GOLD, fit: true })
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
    const cOut = 1 - prog(t, T.car[0] - 0.2, T.car[0])
    sketchCircle(x, V_HOME.x, V_HOME.y - 6, 178, 172, prog(t, T.circles, T.circles + 0.45) * cOut, 2)
    sketchCircle(x, S_HOME.x, S_HOME.y - 6, 178, 172, prog(t, T.circles + 0.15, T.circles + 0.6) * cOut, 5)
    const lk = i => prog(t, T.labels + i * 0.25, T.labels + i * 0.25 + 0.45)
    hand(x, 'fig. 1 · virgo', V_HOME.x, 1196, { size: 40, k: lk(0), alpha: cOut })
    hand(x, 'wants: a plan', V_HOME.x, 1238, { size: 32, color: RED, k: lk(1), alpha: cOut })
    hand(x, 'fig. 2 · sagittarius', S_HOME.x, 1196, { size: 40, k: lk(0.5), alpha: cOut })
    hand(x, 'wants: adventure', S_HOME.x, 1238, { size: 32, color: RED, k: lk(1.5), alpha: cOut })
    if (t < T.cut1) {
      const two = t >= T.h1 + 0.4, t0 = two ? T.h1 + 0.4 : T.arrow
      const ao = two ? 1 - prog(t, T.close1, T.cut1) : 1 - prog(t, T.h1 - 0.1, T.h1 + 0.1)
      if (two || t < T.h1 + 0.1) {
        hand(x, two ? '(bag: always packed)' : '(laminated)', 540, 712, { size: 36, k: prog(t, t0, t0 + 0.5), alpha: ao, rot: -0.04 })
        sketchArrow(x, two ? 590 : 480, 742, two ? 660 : 430, two ? 900 : 870, prog(t, t0 + 0.3, t0 + 0.7), { alpha: 0.85 * ao })
      }
    }
    if (t > T.pisIn) {
      const cap = t < T.h3 ? 'fig. 3 · pisces (unrelated)' : t < T.h4 ? 'fig. 3 · pisces (wants the goat)' : t < T.car[0] ? 'fig. 3 · pisces (packed tissues)' : 'fig. 3 · pisces (so happy)'
      const t0 = t < T.h3 ? T.pisIn + 0.3 : t < T.h4 ? T.h3 + 0.5 : t < T.car[0] ? T.h4 + 0.5 : T.car[0]
      hand(x, cap, 1000, 668, { size: 27, k: prog(t, t0, t0 + 0.5), rot: -0.03, align: 'right' })
    }
    if (t > T.car[0]) hand(x, 'fig. 4 · road trip', 540, 1250, { size: 42, color: RED, k: prog(t, T.car[1], T.car[1] + 0.5) })
    if (t > T.note && t < T.h4Out[1]) hand(x, '(virgo colour-codes the spontaneity)', 330, 668, { size: 29, color: RED, k: prog(t, T.note, T.note + 0.7), alpha: outK(t, T.h4Out), rot: -0.03 })
    x.restore()
  }

  // Virgo's laminated clipboard (it drops at "I'll know when I see it.")
  function clipboard(t) {
    if (t < T.board || t > T.drop + 1.0) return
    const k = pop01(t, T.board, 0.35, 2.2)
    const d = prog(t, T.drop, T.drop + 0.7)
    x.save(); x.translate(V_HOME.x + 168 + d * 30, 925 + ease.inQuad(d) * 260); x.rotate(0.12 + d * 2.2); x.scale(k * 0.7, k * 0.7); x.globalAlpha *= 1 - ease.inQuad(d)
    x.fillStyle = '#7a4a26'; x.fillRect(-80, -110, 160, 220); x.fillStyle = '#fffaf0'; x.fillRect(-68, -88, 136, 186)
    x.fillStyle = '#b9b4c8'; x.fillRect(-30, -122, 60, 24)
    CAL_COLS.forEach((c, i) => { x.fillStyle = c; x.fillRect(-56, -72 + i * 34, 112, 24) })
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.moveTo(-68, 40); x.lineTo(-20, -88); x.lineTo(0, -88); x.lineTo(-68, 80); x.fill()
    x.restore()
  }
  function backpack(t, P) {
    const k = pop01(t, T.pack, 0.35, 2.2)
    if (k <= 0.01 || t > T.car[0]) return
    x.save(); x.translate(P.x - 150, P.y + 10); x.rotate(-0.1); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-46, -66, 92, 132); x.fillStyle = '#5a7a3a'; x.fillRect(-40, -60, 80, 120)
    x.fillStyle = '#7a9a4a'; x.fillRect(-40, -60, 80, 30); x.fillStyle = INK; x.fillRect(-28, 0, 56, 6); x.fillRect(-30, 20, 60, 36)
    x.fillStyle = '#9ab86a'; x.fillRect(-26, 24, 52, 28)
    x.restore()
  }

  function calendar(t) {
    if (t < T.cal || t > T.calOut[1]) return
    const k = pop01(t, T.cal, 0.38, 2.2) * outK(t, T.calOut)
    if (k <= 0.01) return
    const C = 68, cols = 5, rows = 3
    x.save(); x.translate(540, 700); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-cols * C / 2 - 8, -rows * C / 2 - 56, cols * C + 16, rows * C + 64)
    x.fillStyle = '#fffaf0'; x.fillRect(-cols * C / 2, -rows * C / 2 - 48, cols * C, 40)
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    ;['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => x.fillText(d, -cols * C / 2 + C * (i + 0.5), -rows * C / 2 - 28))
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const cx = -cols * C / 2 + c * C, cy = -rows * C / 2 + r * C
      x.fillStyle = '#fffaf0'; x.fillRect(cx + 3, cy + 3, C - 6, C - 6)
      if (r === 1 && c === 2) {
        // the blank square: a blinking dashed outline, then Sag's star sticker and "fun (tbd)"
        if (t < T.sticker && Math.sin(t * 8) > 0) { x.fillStyle = RED; for (let i = 0; i < 6; i++) { x.fillRect(cx + 6 + i * 10, cy + 5, 6, 3); x.fillRect(cx + 6 + i * 10, cy + C - 8, 6, 3) } }
        if (t >= T.sticker) {
          const sk = pop01(t, T.sticker, 0.3, 2.8)
          x.save(); x.translate(cx + C / 2, cy + C / 2 - 6); x.scale(sk, sk); bmp(x, BM('...X... ..XXX.. XXXXXXX .XXXXX. .XX.XX.'), -14, -10, 4, { X: GOLD }); x.restore()
        }
        continue
      }
      x.fillStyle = CAL_COLS[(r * 5 + c * 3) % 5]; x.fillRect(cx + 8, cy + 8, C - 16, C - 16)
      x.fillStyle = rgba(INK, 0.35); x.fillRect(cx + 14, cy + 18, C - 28, 5); x.fillRect(cx + 14, cy + 32, C - 36, 5)
    }
    x.restore()
    if (t > T.fun) hand(x, 'fun (tbd)', 540, 830, { size: 40, color: RED, k: prog(t, T.fun, T.fun + 0.5) * k })
  }

  function plane(t) {
    if (!inR(t, T.plane)) return
    const p = prog(t, ...T.plane), px = lerp(60, 1020, p), py = 640 - Math.sin(p * Math.PI) * 40
    for (let i = 0; i < 10; i++) { const tx = px - 40 - i * 26; if (tx > 80) { x.fillStyle = rgba(INK, 0.35 * (1 - i / 10)); x.fillRect(tx, py + 8, 14, 4) } }
    bmp(x, PLANE, px - 36, py - 18, 6, { X: INK })
  }

  function phone(t) {
    if (t < T.phone || t > T.phoneOut[1]) return
    const k = pop01(t, T.phone, 0.38, 2.2) * outK(t, T.phoneOut)
    if (k <= 0.01) return
    const buzz = inR(t, [T.buzz, T.buzz + 0.4]) ? Math.sin(t * 90) * 5 : 0
    x.save(); x.translate(540 + buzz, 740); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-140, -230, 280, 440); x.fillStyle = '#efe9f8'; x.fillRect(-126, -206, 252, 392)
    x.fillStyle = INK; x.fillRect(-30, -222, 60, 8)
    const bubble = (y, w, txt, mine, at) => {
      const bk = pop01(t, at, 0.25, 2.6); if (bk <= 0) return
      x.save(); x.translate(mine ? 110 - w / 2 : -110 + w / 2, y); x.scale(bk, bk)
      x.fillStyle = mine ? '#ef5c94' : '#a35cf0'; x.fillRect(-w / 2, -24, w, 48)
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#ffffff'; x.fillText(txt, 0, 2)
      x.restore()
    }
    bubble(-160, 200, 'did you land?', true, T.b1)
    bubble(-100, 140, 'alive??', true, T.b2)
    bubble(-40, 90, '??', true, T.b3)
    bubble(30, 170, 'landed! ♥', false, T.buzz)
    if (t > T.goat) {
      const gk = pop01(t, T.goat, 0.3, 2.4)
      x.save(); x.translate(-30, 120); x.scale(gk, gk)
      x.fillStyle = '#8fd8f6'; x.fillRect(-80, -56, 160, 112); x.fillStyle = '#5cbf4a'; x.fillRect(-80, 30, 160, 26)
      bmp(x, GOAT, -44, -42, 8, GOAT_PAL); x.restore()
    }
    x.restore()
  }

  function itinerary(t) {
    if (t < T.itin || t > T.itinOut[1]) return
    const k = pop01(t, T.itin, 0.38, 2.2) * outK(t, T.itinOut)
    if (k <= 0.01) return
    const ROWS = [['1:00', 'pack snacks', '#7dffb0'], ['2:00', 'BE SPONTANEOUS', '#f59cc4'], ['2:15', 'recover', '#8fd8f6']]
    x.save(); x.translate(540, 822); x.scale(k * 0.85, k * 0.85); x.rotate(0.02)
    x.fillStyle = INK; x.fillRect(-250, -120, 500, 240); x.fillStyle = '#fffaf0'; x.fillRect(-244, -114, 488, 228)
    ROWS.forEach(([tm, what, c], i) => {
      const y = -70 + i * 70
      x.fillStyle = c; x.fillRect(-220, y - 26, 440, 52)
      x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(tm, -204, y + 2)
      x.font = `800 30px ${INTER}`; x.fillText(what, -110, y + 2)
      if (i === 1) for (let j = 0; j < 6; j++) { const ph = (t * 1.3 + j / 6) % 1; if (ph < 0.5) bmp(x, BM('.X. XXX .X.'), -200 + j * 76, y - 34 + (j % 2) * 56, 4, { X: '#ffffff' }) }
    })
    x.restore()
    if (t > T.ring) sketchCircle(x, 540, 822, 215, 40, prog(t, T.ring, T.ring + 0.4) * k, 3, { color: RED, width: 6 })
  }

  function car(t, o, rv, rs) {
    const cx = carX(t)
    x.save(); x.translate(cx, CAR_Y); x.globalAlpha *= clamp(o)
    x.fillStyle = INK; x.fillRect(-300, -60, 600, 130); x.fillRect(-250, -100, 500, 50)
    x.fillStyle = '#ef5c94'; x.fillRect(-292, -52, 584, 114); x.fillStyle = '#ff8fb8'; x.fillRect(-292, -52, 584, 18)
    x.fillStyle = '#f2c75c'; x.fillRect(260, -20, 26, 22); x.fillStyle = '#ffffff'; x.fillRect(-292, -10, 18, 16)
    for (const wx of [-180, 180]) {
      x.fillStyle = INK; x.beginPath(); x.arc(wx, 70, 48, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#b9b4c8'; x.beginPath(); x.arc(wx, 70, 20, 0, Math.PI * 2); x.fill()
      const a = t * 12; x.fillStyle = INK; x.fillRect(wx + Math.cos(a) * 12 - 4, 70 + Math.sin(a) * 12 - 4, 8, 8)
    }
    // the snack bag on the back seat
    x.fillStyle = INK; x.fillRect(-40, -96, 64, 48); x.fillStyle = '#f2c75c'; x.fillRect(-34, -90, 52, 40); x.fillStyle = '#d8392f'; x.fillRect(-34, -76, 52, 10)
    x.restore()
    // road dashes
    if (t > T.car[0]) for (let i = 0; i < 9; i++) { const dx = ((i * 130 - t * 520) % 1170 + 1170) % 1170 - 40; x.fillStyle = rgba(INK, 0.5 * clamp(o)); x.fillRect(Math.max(80, dx), CAR_Y + 130, 60, 8) }
  }

  function drawPisces(t, o) {
    if (t < T.pisIn) return
    const k = pop01(t, T.pisIn, 0.4, 2.4) * o
    let mood = 'happy'
    if (inR(t, [T.goat, T.cut2])) mood = 'heart'
    else if (t >= T.car[0]) mood = 'sparkle'
    const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, mood, look: [-1, 1], seed: 17, pop: k, glow: 0.3,
      hops: [T.pisIn + 0.3, T.goat + 0.1, T.swA + 0.2, T.car[1] + 0.1] })
    const e = eyesOf(r)
    if (k > 0.3) drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: clamp(o), seed: 4, fountain: true })
    if (inR(t, [T.h4 + 0.3, T.car[0]])) { x.fillStyle = INK; x.fillRect(PIS_P.x - 104, PIS_P.y + 2, 40, 34); x.fillStyle = '#ffffff'; x.fillRect(PIS_P.x - 100, PIS_P.y + 6, 32, 26); x.fillRect(PIS_P.x - 92, PIS_P.y - 6, 16, 12) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const o = popOut(t, T.out)
      if (o > 0) {
        drawNotebook(x, t, { k: prog(t, ...T.book) * clamp(o), entry: 'No. 3' })
        if (t > T.book[1]) {
          sketches(t, o)
          drawPisces(t, o)
          calendar(t)
          itinerary(t)
          const vs = vState(t), ss = sState(t)
          const vk = pop01(t, T.vIn, 0.4, 2.2) * o, sk = pop01(t, T.sIn, 0.4, 2.2) * o
          // in the last beat both ride in the car
          const inCar = t >= T.car[0]
          const cx = carX(t)
          const VP = inCar ? { x: cx - 130, y: CAR_Y - 140, s: 230 } : V_HOME
          const SP = inCar ? { x: cx + 130, y: CAR_Y - 140, s: 230 } : S_HOME
          backpack(t, SP)
          const rv = drawStarChar(x, VP.x, VP.y, VP.s, t, { color: VIR.color, glyph: VIR.glyph, mood: vs.mood, look: vs.look, blink: vs.blink, squash: vs.squash, hops: V_HOPS, seed: 3, pop: vk, glow: 0.35 })
          const rs = drawStarChar(x, SP.x, SP.y, SP.s, t, { color: SAG.color, glyph: SAG.glyph, mood: ss.mood, look: ss.look, blink: ss.blink, squash: ss.squash, hops: S_HOPS, seed: 8, pop: sk, glow: 0.35 })
          if (vs.sweat && vk > 0.5) drawSweat(x, t, rv.x + 110, rv.y - 140, 8)
          if (inCar) { car(t, o, rv, rs); drawHearts(x, t, T.car[1], 540, 850, { n: 8, px: 7, spread: 300, alpha: clamp(o) }) }
          clipboard(t)
          plane(t)
          phone(t)
          if (t > T.fun && t < T.cand2) drawHearts(x, t, T.fun + 0.1, rv.x, rv.y - 120, { n: 4, px: 7, spread: 120 })
          if (t > T.melt && t < T.cut2) drawHearts(x, t, T.melt, rv.x, rv.y - 120, { n: 5, px: 7, spread: 120 })
          if (t > T.love && t < T.cand4) { drawHearts(x, t, T.love, rv.x, rv.y - 120, { n: 4, px: 7, spread: 120 }); drawHearts(x, t, T.love + 0.1, rs.x, rs.y - 120, { n: 4, px: 7, spread: 120 }) }
          if (inR(t, T.crickets)) for (let i = 0; i < 2; i++) { if (Math.sin(t * 18 + i * 2) > 0) hand(x, '♪', 440 + i * 220, 900 + (i ? -20 : 0), { size: 40, color: rgba(INK, 0.6) }) }
          const mk = pop01(t, T.meterIn, 0.42, 2) * outK(t, T.meterOut)
          drawMeter(x, t, needle(t), { k: mk, smoke: inR(t, T.thrash) ? 1 - prog(t, T.thrash[1] - 0.3, T.thrash[1]) : 0, stamp: prog(t, T.swA + 0.05, T.swA + 0.2) })
          if (t > T.swA && t < T.swA + 0.9) sparkBurst(x, t, 540 + 390 * (ZONE.align * 2 - 1), 1300, T.swA + 0.05, { n: 10, R: 160, size: 22, seed: 6 })
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
  ['pop', T.vIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.sIn + 0.05, 523.25, 0.04, 0.3], ['pop', T.board + 0.1, 880, 0.03, -0.3], ['pop', T.pack + 0.1, 784, 0.03, 0.3],
  ...flutter(T.circles, 8, 0.06, 0.02), ...flutter(T.labels, 10, 0.07, 0.018),
  ['pop', T.meterIn + 0.1, 880, 0.03, 0], ['pop', T.pisIn + 0.1, 1174.66, 0.03, 0.5], ['glitter', T.pisIn + 0.1, T.pisIn + 0.5],
  ...flutter(T.arrow, 6, 0.07, 0.018),
  ['pop', T.push, 392, 0.05, -0.2], ['tom', T.push, 90, { gain: 0.18, decay: 0.25, rev: 0.15 }],
  ...wordPops(T.h1, 2, 0.08, 2), ...land(T.h1Land),
  ['whoosh', T.drop, 0.3, 0.04], ['tom', T.drop + 0.6, 110, { gain: 0.18, decay: 0.2, rev: 0.1 }],
  ...scratch(T.squint), ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.thrash[0] + 0.1 + i * 0.13).toFixed(3), 0.03]),
  ...stampHit(T.stamp1), ...wordPops(T.h2, 3, 0.08, 1), ...land(T.h2Land), ['pop', T.h2Land + 0.12, 1174.66, 0.04, 0],
  ['pop', T.cal + 0.05, 783.99, 0.035, 0], ...crickets(T.crickets),
  ['pop', T.sticker, 1318.51, 0.05, 0], ['glitter', T.sticker, T.sticker + 0.4], ...flutter(T.fun, 8, 0.06, 0.02), ['bell', T.fun + 0.4, 1567.98, 0.035, 1.2, -0.3],
  ...stampHit(T.stamp2), ...wordPops(T.h3, 4, 0.08, 3), ...land(T.h3Land + 0.25),
  ['whoosh', T.plane[0], 1.6, 0.04], ['pop', T.phone + 0.05, 659.25, 0.035, 0],
  ['pop', T.b1, 880, 0.035, 0.3], ['pop', T.b2, 880, 0.035, 0.3], ['pop', T.b3, 880, 0.035, 0.3],
  ...Array.from({ length: 6 }, (_, i) => chip(T.buzz + i * 0.06, 110, 0.05, { wave: 'square', gain: 0.03, bus: 'drums', rev: 0, dly: 0 })),
  ['pop', T.buzz + 0.05, 1174.66, 0.045, -0.3], ['pop', T.goat, 1318.51, 0.05, 0], chip(T.goat + 0.1, 700, 0.12, { vib: 0.4, gain: 0.04, duty: 0.5 }),
  ['bell', T.melt, 1318.51, 0.035, 1.4, 0], ['glitter', T.melt, T.melt + 0.5],
  ...stampHit(T.stamp3), ...wordPops(T.h4, 2, 0.08, 4), ...land(T.h4Land), ...flutter(T.note, 9, 0.07, 0.018),
  ['pop', T.itin + 0.05, 880, 0.035, 0], ['glitter', T.itin + 0.3, T.itin + 0.8],
  ...flutter(T.ring, 6, 0.06, 0.02), ['pluck', T.love, 1318.51, 0.045, 0.7, 0.3], ['glitter', T.love, T.love + 0.6],
  ['whoosh', T.swP - 0.1, 0.4, 0.03],
  ['pluck', T.swP, 783.99, 0.04, 0.4, -0.4], ['pluck', T.swU, 987.77, 0.04, 0.4, 0], ['pluck', T.swA, 1174.66, 0.05, 0.8, 0.4],
  ...stampHit(T.swA + 0.1), ['glitter', T.swA + 0.1, T.swA + 0.7], ['bell', T.swA + 0.15, 1567.98, 0.035, 1.6, 0.3],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ['whoosh', T.car[0], 0.5, 0.05], chip(T.car[1], 660, 0.12, { gain: 0.04 }), chip(T.car[1] + 0.16, 660, 0.12, { gain: 0.04 }),
  ...wordPops(T.h6, 1, 0.1, 0, 0.028), ...land(T.h6Land, 1318.51), ['glitter', T.h6Land, T.h6Land + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(ALL, { cps: CPS, pitch: { [V_TAG]: 880, [S_TAG]: 587.33 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
