// sxsignscolib (45 s vertical Align ad · Star Talk Shows · SIGN × SIGN, EP 1: "Scorpio × Libra: A Survival Guide.")
//   story 0–40.6, then the shared end card. The show's look (notebook.js): a spiral-bound graph-paper field guide over
//   the nebula, sketched specimen circles + handwritten labels, three TIPS rubber-stamped onto the page, and a
//   PUSH | PULL | ALIGN meter along the bottom strip of the page that wobbles all film and settles at the end.
//   0.00–5.90  "Scorpio × Libra: | A *survival guide.*"  The notebook slaps up. fig. 1 ♏ Scorpio (wants: intensity) stares
//              at fig. 2 ♎ Libra (wants: harmony) — a pencil arrow: "(hasn't blinked)". fig. 3: Pisces (unrelated), crying.
//              SCORPIO: "tell me your darkest secret."  LIBRA: "um… I like everyone equally?"  The needle slams to PUSH.
//   5.90–12.2  "Depth meets | *diplomacy.*"  Scorpio leans in, Libra leans back. "why are you so nice?" / "why are you so
//              intense?"  Synced squint (record scratch); the needle thrashes and smokes. "(still hasn't blinked)".
//  12.35       card cut (flip)
//  12.4–18.85  TIP 1 "Libra, say what | you *actually* think."  A menu: PIZZA or TACOS? LIBRA: "whatever you want!" (her
//              scales go perfectly level, ding). Scorpio just stares. Crickets. LIBRA: "…fine. TACOS." The scales clunk,
//              Scorpio goes heart-eyed, TACOS gets circled, the needle swings to PULL.
//  19.0–25.6   TIP 2 "Scorpio, not *everything* | is a test."  Scorpio's clipboard: LOYALTY EXAM · Q1 of 48. SCORPIO:
//              "you're 4 minutes late. explain."  LIBRA: "I stopped to pet a dog." A dog pops in. Scorpio melts and rips
//              the exam (confetti); Pisces sobs at the dog.
//  25.80       card cut (deal)
//  25.9–31.7   TIP 3 ↻ (the twist) "Let them pick | the *restaurant.*"  "(it will take forty minutes)". A clock races
//              7:00 → 7:40, menus fly, Scorpio falls asleep, fig. 3 becomes "pisces (hungry)". LIBRA: "sushi? no. tacos? no.
//              sushi?" … "where do *you* want to go?"  Scorpio double-takes and faints (womp).
//  31.85–33.9 "Push. Pull. *Align.*"  Scorpio pops back up; the needle sweeps PUSH → PULL → ALIGN and clunks; a red ring
//              stamps around ALIGN (the tie-in: the reading shows the rub, the pull and where it holds).
//  33.94–38.1 ★ LESSON UNLOCKED: "Depth and balance | make a great *pair.*"  +1 FIELD-TESTED.
//  38.15–40.5 "*Survived.* | Thrived, even."  The two share a taco, heart-eyed; fig. 4 · thriving. The meter is gone (no
//              "Align" on screen in the last 2 s). Out by 40.5.
// One canvas (sky + notebook + cast + props + meter), DOM type + the boxes + the lesson + the show bug, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { PAGE, INK, RED, drawNotebook, hand, sketchCircle, sketchArrow, drawMeter, needleWobble, ZONE, tipStamp, showBug,
  BM, bmp, drawHearts, drawTears, eyesOf, drawSweat, sparkBurst, drawZzz, rgba } from './notebook.js'

export const DURATION = 45
const EP = 1
const KEY = 'Dm'
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556
const SCO = signStar('scorpio'), LIB = signStar('libra'), PIS = signStar('pisces')
const S_TAG = `${SCO.glyph} SCORPIO`, L_TAG = `${LIB.glyph} LIBRA`
const S_TXT = '#ff7f9c', L_TXT = '#f59cf0'
const CPS = 28

const LINES1 = [
  { t: 1.9, speaker: S_TAG, color: S_TXT, text: 'tell me your *darkest secret.*' },
  { t: 4.4, speaker: L_TAG, color: L_TXT, text: 'um… I like everyone *equally?*' },
  { t: 7.1, speaker: S_TAG, color: S_TXT, text: 'why are you *so nice?*' },
  { t: 9.35, speaker: L_TAG, color: L_TXT, text: 'why are you *so intense?*' },
]
const LINES2 = [
  { t: 13.9, speaker: L_TAG, color: L_TXT, text: 'whatever *you* want!' },
  { t: 16.55, speaker: L_TAG, color: L_TXT, text: '…fine. *TACOS.*' },
]
const LINES3 = [
  { t: 20.25, speaker: S_TAG, color: S_TXT, text: "you're 4 minutes late. *explain.*" },
  { t: 22.65, speaker: L_TAG, color: L_TXT, text: 'I stopped to pet *a dog.*' },
]
const LINES4 = [
  { t: 26.95, speaker: L_TAG, color: L_TXT, text: 'sushi? no. tacos? no. sushi?' },
  { t: 29.15, speaker: L_TAG, color: L_TXT, text: 'where do *you* want to go?' },
]
const ALL = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS }), LT4 = lineTimes(LINES4, { cps: CPS })

const T = {
  black: [0, 0.3], book: [0.05, 0.6],
  h0: 0.2, h0Land: 0.95, h0Out: [5.72, 5.9],
  sIn: 0.7, lIn: 0.9, circles: 1.0, labels: 1.35, meterIn: 1.45, arrow: 2.3, pisIn: 2.7,
  push: LT1[1].chars[22], close1: 12.0,
  // 2 · depth meets diplomacy
  h1: 6.0, h1Land: 6.4, h1Out: [12.0, 12.2], lean: [6.55, 6.95], back: [7.75, 8.1], squint: LT1[3].done + 0.2, thrash: [LT1[3].done + 0.2, 12.2],
  cut1: 12.35,
  // 3 · tip 1
  h2: 12.45, h2Land: 12.95, stamp1: 12.6, h2Out: [18.65, 18.85], menu: 13.25, level: LT2[0].done + 0.05,
  crickets: [15.1, 16.3], tacos: LT2[1].done + 0.05, close2: 18.75, menuOut: [18.55, 18.85],
  cand2: 18.95,
  // 4 · tip 2
  h3: 19.05, h3Land: 19.45, stamp2: 19.2, h3Out: [25.45, 25.65], board: 19.75, dog: LT3[1].chars[20], melt: LT3[1].done + 0.25,
  rip: LT3[1].done + 0.85, close3: 25.3, dogOut: [25.35, 25.65],
  cut2: 25.8,
  // 5 · tip 3 (the twist)
  h4: 25.92, h4Land: 26.3, stamp3: 26.05, note: 26.55, h4Out: [31.5, 31.7], clock: 26.5, ff: [26.9, 29.7], menus: [26.8, 30.0],
  sleep: 28.0, take: LT4[1].done + 0.12, faint: [LT4[1].done + 0.4, LT4[1].done + 0.7], close4: LT4[1].done + 1.55, clockOut: [31.45, 31.7],
  cand4: 31.82,
  // 6 · settle
  up: 31.9, h5: 31.95, swP: 32.05, swU: 32.5, swA: 32.95, h5Out: [33.75, 33.92],
  // 7 · lesson
  lesson: BEAT(60), lessonOut: [38.0, 38.15],
  // 8 · survived
  meterOut: [37.95, 38.25], hug: [38.05, 38.45], h6: 38.15, h6Land: 38.3, taco: 38.25,
  out: [40.1, 40.5],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Depth and balance | make a great *pair.*', chip: '+1 FIELD-TESTED', accentColor: GOLD, dim: 0.6 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, [a, b]) => t >= a && t < b

// ── layout (screen px; everything sits on the notebook page)
const S_HOME = { x: 262, y: 985, s: 290 }, L_HOME = { x: 818, y: 985, s: 290 }
const S_LEAN = { x: 330, y: 985 }, L_BACK = { x: 868, y: 992 }
const S_HUG = { x: 420, y: 985 }, L_HUG = { x: 660, y: 985 }
const PIS_P = { x: 905, y: 575, s: 112 }
const STAMP = { x: 245, y: 585 }

const S_HOPS = [T.sIn + 0.3, ...talkHops(ALL, S_TAG, { cps: CPS }), T.tacos + 0.1, T.melt, T.rip, T.take, T.up + 0.15, T.swA + 0.1, T.hug[1], T.hug[1] + 0.56]
const L_HOPS = [T.lIn + 0.3, ...talkHops(ALL, L_TAG, { cps: CPS }), T.level, T.tacos, T.swA + 0.15, T.hug[1] + 0.05, T.hug[1] + 0.61]

// the needle: [t, base, amp] keys, sprung between
const NEEDLE = [
  [0, 0.5, 0.12], [T.push, ZONE.push, 0.04], [T.h1, 0.32, 0.16], [T.thrash[0], 0.42, 0.34], [T.thrash[1], 0.3, 0.07],
  [T.tacos, ZONE.pull, 0.035], [T.h3, 0.3, 0.09], [T.melt, 0.56, 0.04], [T.h4, 0.5, 0.2], [T.faint[0], 0.1, 0.03],
  [T.swP, ZONE.push, 0.01], [T.swU, ZONE.pull, 0.01], [T.swA, ZONE.align, 0.004],
]
function needle(t) {
  let i = 0
  for (let j = 0; j < NEEDLE.length; j++) if (t >= NEEDLE[j][0]) i = j
  const cur = NEEDLE[i], prev = NEEDLE[Math.max(0, i - 1)]
  const e = i === 0 ? 1 : ease.spring(prog(t, cur[0], cur[0] + 0.55), 0.22)
  const amp = lerp(prev[2], cur[2], prog(t, cur[0], cur[0] + 0.3))
  // the slow restaurant wander in tip 3: drift the base back and forth
  const drift = inR(t, [T.h4, T.faint[0]]) ? 0.18 * Math.sin((t - T.h4) * 1.7) : 0
  return needleWobble(t, lerp(prev[1], cur[1], e) + drift, amp, 3)
}

function sPos(t) {
  if (t < T.lean[0]) return S_HOME
  if (t < T.close1) return { ...S_HOME, x: lerp(S_HOME.x, S_LEAN.x, ease.spring(prog(t, ...T.lean), 0.2)) }
  if (t < T.cut1) return { ...S_HOME, x: lerp(S_LEAN.x, S_HOME.x, ease.inOutCubic(prog(t, T.close1, T.cut1))) }
  if (t < T.hug[0]) return S_HOME
  return { ...S_HOME, x: lerp(S_HOME.x, S_HUG.x, ease.spring(prog(t, ...T.hug), 0.2)), y: S_HOME.y - Math.sin(Math.PI * prog(t, ...T.hug)) * 40 }
}
function lPos(t) {
  if (t < T.back[0]) return L_HOME
  if (t < T.close1) { const e = ease.spring(prog(t, ...T.back), 0.2); return { ...L_HOME, x: lerp(L_HOME.x, L_BACK.x, e), y: lerp(L_HOME.y, L_BACK.y, e), rot: 0.14 * e } }
  if (t < T.cut1) { const e = ease.inOutCubic(prog(t, T.close1, T.cut1)); return { ...L_HOME, x: lerp(L_BACK.x, L_HOME.x, e), rot: 0.14 * (1 - e) } }
  if (t < T.hug[0]) return L_HOME
  return { ...L_HOME, x: lerp(L_HOME.x, L_HUG.x, ease.spring(prog(t, T.hug[0] + 0.05, T.hug[1] + 0.05), 0.2)), y: L_HOME.y - Math.sin(Math.PI * prog(t, ...T.hug)) * 40 }
}

function sState(t) {
  const st = { mood: 'neutral', look: [1, 0], blink: false, squash: 0, rot: 0, sweat: 0 }
  if (t < T.push) { st.mood = t < LINES1[0].t ? 'squint' : 'neutral'; return st }
  if (t < LINES1[2].t) { st.mood = 'squint'; return st }
  if (t < T.squint) { st.mood = t < LT1[2].done ? 'neutral' : 'squint'; return st }
  if (t < T.cut1) { st.mood = 'squint'; st.squash = 0.12 * Math.exp(-(t - T.squint) * 5); return st }
  if (t < T.tacos) { st.mood = 'squint'; st.look = t > T.crickets[0] && t < T.crickets[1] ? [0, 0] : [1, 0]; return st }
  if (t < T.cand2) { st.mood = 'heart'; st.blink = undefined; return st }
  if (t < T.melt) { st.mood = t < T.board + 0.3 ? 'neutral' : 'squint'; st.look = [1, 0]; return st }
  if (t < T.rip) { st.mood = 'sparkle'; st.blink = undefined; return st }
  if (t < T.cut2) { st.mood = 'happy'; return st }
  if (t < T.sleep) { st.mood = 'neutral'; st.look = [1, -1]; st.blink = undefined; return st }
  if (t < T.take) { st.mood = 'sleepy'; st.squash = 0.05; return st }
  if (t < T.faint[0]) { st.mood = 'wide'; st.look = [1, 0]; st.squash = -0.12; return st }
  if (t < T.up) { st.mood = 'neutral'; st.blink = 1; st.rot = Math.PI / 2 * ease.inQuad(prog(t, ...T.faint)); return st }
  if (t < T.swA + 0.1) { st.mood = 'wide'; st.look = [1, 1]; st.blink = undefined; return st }
  if (t < T.hug[0]) { st.mood = 'happy'; st.blink = undefined; return st }
  st.mood = 'heart'; st.blink = undefined; return st
}
function lState(t) {
  const st = { mood: 'happy', look: [-1, 0], blink: undefined, squash: 0, sweat: 0 }
  if (t < LINES1[0].t + 0.5) return st
  if (t < LINES1[1].t) { st.mood = 'wide'; st.sweat = 1; return st }
  if (t < LINES1[2].t) { st.mood = 'happy'; st.sweat = 1; return st }
  if (t < LINES1[3].t) { st.mood = 'wide'; st.sweat = 1; return st }
  if (t < T.squint) { st.mood = 'neutral'; return st }
  if (t < T.cut1) { st.mood = 'squint'; st.squash = 0.12 * Math.exp(-(t - T.squint) * 5); return st }
  if (t < T.crickets[0]) { st.mood = 'happy'; return st }
  if (t < LINES2[1].t) { st.mood = 'neutral'; st.look = t < 15.7 ? [-1, 0] : [0, 0]; st.sweat = 1; return st }
  if (t < T.tacos) { st.mood = 'squint'; st.look = [0, 0]; return st }
  if (t < T.cand2) { st.mood = 'happy'; return st }
  if (t < LINES3[1].t) { st.mood = t < LT3[0].done ? 'happy' : 'wide'; st.sweat = t > LT3[0].done ? 1 : 0; return st }
  if (t < T.cut2) { st.mood = t < T.dog + 0.2 ? 'happy' : 'sparkle'; st.look = [-1, 1]; return st }
  if (t < LINES4[1].t) { st.mood = 'eyeroll'; return st }
  if (t < T.take) { st.mood = 'happy'; return st }
  if (t < T.up) { st.mood = 'wide'; st.look = [-1, 1]; return st }
  if (t < T.hug[0]) { st.mood = 'happy'; st.look = [0, 1]; return st }
  st.mood = 'heart'; return st
}

// Libra's scales: tilt (radians; + = right pan down)
function scalesTilt(t) {
  if (t < T.level - 0.05) return 0.22 * Math.sin(t * 2.3) + (inR(t, T.thrash) ? 0.2 * Math.sin(t * 17) : 0)
  if (t < T.tacos) return 0.004 * Math.sin(t * 3)
  if (t < T.cand2) return lerp(0, 0.38, ease.spring(prog(t, T.tacos, T.tacos + 0.6), 0.25))
  if (t < T.hug[0]) return 0.12 * Math.sin(t * 2.1 + 1) + (inR(t, T.menus) ? 0.25 * Math.sin(t * 7) : 0)
  return lerp(0.12 * Math.sin(T.hug[0] * 2.1 + 1), 0, ease.outCubic(prog(t, ...T.hug)))
}

// ── pixel food + friends
const PIZZA = BM(`CCCCCCCCC CYRYYYRYC .YYYYRYY. .YRYYYY.. ..YYYRY.. ..YYYY... ...YY.... ...Y.....`)
const TACO = BM(`...SSSSS... ..SGRGRGS.. .SGRGGRGRS. SYGRGRGRGYS SYYYYYYYYYS .SYYYYYYYS. ..SSSSSSS..`)
const FOOD = { C: '#c9823a', Y: '#f4c542', R: '#d8392f', S: '#b9822e', G: '#5cbf4a' }
const DOG = [BM(`..XX.......... .XXXX........T .XEXXX......T. NXXXXXXXXXXXT. ..XXXXXXXXXX.. ..XXXXXXXXXX.. ..X.X....X.X.. ..X.X....X.X..`),
  BM(`..XX.......... .XXXX......... .XEXXX......TT NXXXXXXXXXXXT. ..XXXXXXXXXX.. ..XXXXXXXXXX.. ..X.X....X.X.. ..X.X....X.X..`)]
const DOG_PAL = { X: '#b5763a', E: '#1b1236', N: '#1b1236', T: '#b5763a' }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 58px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "700 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Scorpio × Libra: | A *survival guide.*', { top: 168, size: 98, accentSize: 130, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Land, lateGap: 0.12, wobble: true, accentColor: GOLD, fit: true })
  const H1 = popText(root, 'Depth meets | *diplomacy.*', { top: 160, size: 108, accentSize: 138, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: S_TXT, fit: true })
  const H2 = popText(root, 'Libra, say what | you *actually* think.', { top: 168, size: 100, accentSize: 128, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: L_TXT, fit: true })
  const H3 = popText(root, 'Scorpio, not *everything* | is a test.', { top: 168, size: 100, accentSize: 128, at: T.h3, gap: 0.08, late: 3, lateAt: T.h3Land + 0.15, lateGap: 0.1, wobble: true, accentColor: S_TXT, fit: true })
  const H4 = popText(root, 'Let them pick | the *restaurant.*', { top: 168, size: 104, accentSize: 140, at: T.h4, gap: 0.08, late: 1, lateAt: T.h4Land + 0.25, wobble: true, accentColor: GOLD, fit: true })
  const H5 = popText(root, 'Push. Pull. *Align.*', { top: 230, size: 112, accentSize: 150, at: T.swP, gap: T.swU - T.swP, late: 1, lateAt: T.swA, wobble: true, accentColor: GOLD, fit: true })
  const H6 = popText(root, '*Survived.* | Thrived, even.', { top: 150, size: 100, accentSize: 150, at: T.h6 + 0.18, gap: 0.09, late: 0, wobble: true, accentColor: GOLD, fit: true })
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

  // ── page sketches: specimen circles, labels, the "(hasn't blinked)" arrow, Pisces' caption
  function sketches(t, o) {
    if (o <= 0) return
    x.save(); x.globalAlpha *= clamp(o)
    const cOut = 1 - prog(t, T.hug[0] - 0.2, T.hug[0])
    sketchCircle(x, S_HOME.x, S_HOME.y - 6, 178, 172, prog(t, T.circles, T.circles + 0.45) * cOut, 2)
    sketchCircle(x, L_HOME.x, L_HOME.y - 6, 178, 172, prog(t, T.circles + 0.15, T.circles + 0.6) * cOut, 5)
    const lk = i => prog(t, T.labels + i * 0.25, T.labels + i * 0.25 + 0.45)
    hand(x, 'fig. 1 · scorpio', S_HOME.x, 1196, { size: 40, k: lk(0), alpha: cOut })
    hand(x, 'wants: intensity', S_HOME.x, 1238, { size: 32, color: RED, k: lk(1), alpha: cOut })
    hand(x, 'fig. 2 · libra', L_HOME.x, 1196, { size: 40, k: lk(0.5), alpha: cOut })
    hand(x, 'wants: harmony', L_HOME.x, 1238, { size: 32, color: RED, k: lk(1.5), alpha: cOut })
    // the stare arrow: "(hasn't blinked)" → "(still hasn't blinked)" → gone
    if (t < T.cut1) {
      const still = t >= T.h1 + 0.4
      const ak = still ? prog(t, T.h1 + 0.4, T.h1 + 0.9) : prog(t, T.arrow, T.arrow + 0.5)
      const ao = still ? 1 - prog(t, T.close1, T.cut1) : 1 - prog(t, T.h1 - 0.1, T.h1 + 0.1)
      hand(x, still ? '(still hasn’t blinked)' : '(hasn’t blinked)', 530, 712, { size: 36, k: ak, alpha: ao, rot: -0.04 })
      sketchArrow(x, 470, 742, 335, 930, prog(t, (still ? T.h1 + 0.4 : T.arrow) + 0.3, (still ? T.h1 + 0.4 : T.arrow) + 0.7), { alpha: 0.85 * ao })
    }
    // Pisces' caption
    if (t > T.pisIn) {
      const cap = t < T.h4 ? 'fig. 3 · pisces (unrelated)' : t < T.hug[0] ? 'fig. 3 · pisces (hungry)' : 'fig. 3 · pisces (so happy)'
      const ck = t < T.h4 ? prog(t, T.pisIn + 0.3, T.pisIn + 0.8) : t < T.hug[0] ? prog(t, T.h4 + 0.5, T.h4 + 1.0) : prog(t, T.hug[0], T.hug[0] + 0.5)
      hand(x, cap, 870, 668, { size: 27, k: ck, rot: -0.03 })
    }
    // fig. 4
    if (t > T.hug[0]) {
      sketchCircle(x, 540, 975, 300, 190, prog(t, T.hug[0] + 0.2, T.hug[0] + 0.7), 9, { color: RED })
      hand(x, 'fig. 4 · thriving', 540, 1218, { size: 42, color: RED, k: prog(t, T.hug[0] + 0.4, T.hug[0] + 0.9) })
    }
    // tip 3's footnote
    if (t > T.note && t < T.h4Out[1]) hand(x, '(it will take forty minutes)', 250, 668, { size: 31, color: RED, k: prog(t, T.note, T.note + 0.7), alpha: outK(t, T.h4Out), rot: -0.03 })
    x.restore()
  }

  function scales(t, P, o) {
    const k = pop01(t, T.lIn + 0.2, 0.4, 2) * o
    if (k <= 0.01) return
    const cx = P.x, cy = P.y - 228, tilt = scalesTilt(t)
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-5, -4, 10, 64); x.fillRect(-26, 56, 52, 10)
    x.save(); x.rotate(tilt)
    x.fillStyle = INK; x.fillRect(-92, -8, 184, 12); x.fillStyle = GOLD; x.fillRect(-90, -6, 180, 8)
    x.restore()
    for (const side of [-1, 1]) {
      const ex = side * 86 * Math.cos(tilt), ey = side * 86 * Math.sin(tilt)
      x.strokeStyle = INK; x.lineWidth = 3
      x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 26, ey + 46); x.moveTo(ex, ey); x.lineTo(ex + 26, ey + 46); x.stroke()
      x.fillStyle = INK; x.fillRect(ex - 34, ey + 44, 68, 14); x.fillStyle = GOLD; x.fillRect(ex - 30, ey + 46, 60, 8)
      // the tacos land in the right pan
      if (side === 1 && t > T.tacos && t < T.hug[0]) bmp(x, TACO, ex - 22, ey + 26, 4, FOOD, clamp((t - T.tacos) * 6))
    }
    x.restore()
    if (t > T.level && t < T.level + 0.8) sparkBurst(x, t, cx, cy, T.level, { n: 8, R: 120, size: 20, seed: 4 })
  }

  function drawMenu(t) {
    if (t < T.menu || t > T.menuOut[1]) return
    const k = pop01(t, T.menu, 0.38, 2.2) * outK(t, T.menuOut)
    if (k <= 0.01) return
    x.save(); x.translate(540, 660 + Math.sin(t * 1.6) * 5); x.rotate(0.03); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-162, -140, 324, 280); x.fillStyle = '#fffaf0'; x.fillRect(-156, -134, 312, 268)
    hand(x, 'tonight?', 0, -98, { size: 44 })
    x.fillStyle = rgba(INK, 0.35); x.fillRect(-120, -66, 240, 3)
    bmp(x, PIZZA, -128, -46, 6, FOOD); bmp(x, TACO, -134, 40, 6, FOOD)
    x.font = `700 36px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.fillText('PIZZA', -40, -18); x.fillText('TACOS', -40, 64)
    x.restore()
    // pencil circle round TACOS once she says it
    if (t > T.tacos) sketchCircle(x, 580, 724, 130, 46, prog(t, T.tacos, T.tacos + 0.4) * k, 7, { color: RED, width: 6 })
  }

  function drawBoard(t, P) {
    if (t < T.board || t > T.rip + 0.9) return
    const k = pop01(t, T.board, 0.36, 2.2)
    const rp = prog(t, T.rip, T.rip + 0.6)
    const bx = P.x + 190, by = 760
    for (const half of [-1, 1]) {
      x.save(); x.translate(bx + half * rp * 160, by + ease.inQuad(rp) * 300); x.rotate(-0.08 + half * rp * 1.2); x.scale(k, k); x.globalAlpha *= 1 - rp
      x.beginPath(); half < 0 ? x.rect(-150, -190, 150, 380) : x.rect(0, -190, 150, 380); x.clip()
      x.fillStyle = '#7a4a26'; x.fillRect(-118, -158, 236, 316); x.fillStyle = '#fffaf0'; x.fillRect(-104, -128, 208, 274)
      x.fillStyle = '#b9b4c8'; x.fillRect(-40, -170, 80, 30); x.fillStyle = '#ece8f4'; x.fillRect(-40, -170, 80, 8)
      x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillStyle = RED; x.fillText('LOYALTY EXAM', 0, -98)
      hand(x, 'Q1 of 48', 0, -60, { size: 32 })
      for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-84, -24 + i * 40, 22, 22); x.fillStyle = '#fffaf0'; x.fillRect(-80, -20 + i * 40, 14, 14); x.fillStyle = rgba(INK, 0.4); x.fillRect(-50, -16 + i * 40, i % 2 ? 100 : 130, 6) }
      x.restore()
    }
    // paper confetti
    if (rp > 0 && rp < 1) for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2, r = 40 + rp * 260
      x.fillStyle = i % 3 ? '#fffaf0' : RED; x.globalAlpha = 1 - rp
      x.fillRect(Math.round(bx + Math.cos(a) * r), Math.round(by + Math.sin(a) * r * 0.7 + rp * rp * 200), 12, 8)
      x.globalAlpha = 1
    }
  }

  function drawDog(t) {
    if (t < T.dog || t > T.dogOut[1]) return
    const k = pop01(t, T.dog, 0.35, 2.6) * outK(t, T.dogOut)
    if (k <= 0.01) return
    const hop = Math.abs(Math.sin((t - T.dog) * 7)) * 10
    x.save(); x.translate(545, 1050 - hop); x.scale(k, k)
    bmp(x, DOG[Math.floor(t * 8) % 2], -77, -60, 11, DOG_PAL)
    x.restore()
    drawHearts(x, t, T.dog + 0.2, 560, 1010, { n: 5, px: 6, spread: 120, life: 1.4 })
  }

  function drawClock(t) {
    if (t < T.clock || t > T.clockOut[1]) return
    const k = pop01(t, T.clock, 0.36, 2.2) * outK(t, T.clockOut)
    if (k <= 0.01) return
    const m = 40 * ease.inOutQuad(prog(t, ...T.ff))
    const shake = inR(t, T.ff) ? Math.sin(t * 40) * 3 : 0
    x.save(); x.translate(540 + shake, 690); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fffaf0'; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.fillStyle = INK; x.fillRect(Math.cos(a) * 76 - 4, Math.sin(a) * 76 - 4, 8, 8) }
    const ma = -Math.PI / 2 + m / 60 * Math.PI * 2, ha = -Math.PI / 2 + (7 + m / 60) / 12 * Math.PI * 2
    x.strokeStyle = INK; x.lineCap = 'square'
    x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 46, Math.sin(ha) * 46); x.stroke()
    x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 74, Math.sin(ma) * 74); x.stroke()
    x.restore()
    hand(x, `7:${String(Math.floor(m)).padStart(2, '0')} pm`, 540, 836, { size: 44, color: m >= 39.5 ? RED : INK, alpha: k })
  }

  const MENUS = ['SUSHI', 'TACOS', 'PHO', 'PIZZA', 'SUSHI']
  function drawMenus(t, P) {
    if (!inR(t, T.menus)) return
    MENUS.forEach((name, i) => {
      const t0 = T.menus[0] + i * 0.62, p = prog(t, t0, t0 + 1.1)
      if (p <= 0 || p >= 1) return
      const side = i % 2 ? 1 : -1
      const mx = P.x - 40 + side * 30 + (i % 2 ? 140 : -260) * p, my = P.y - 150 - Math.sin(Math.PI * p) * 300 + p * 120
      x.save(); x.translate(mx, my); x.rotate((p * 5 + i) * side); x.globalAlpha *= 1 - ease.inQuad(p)
      x.fillStyle = INK; x.fillRect(-48, -60, 96, 120); x.fillStyle = '#fffaf0'; x.fillRect(-44, -56, 88, 112)
      x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.fillStyle = RED; x.fillText(name, 0, -30)
      x.fillStyle = rgba(INK, 0.4); for (let j = 0; j < 4; j++) x.fillRect(-30, -6 + j * 16, 60 - (j % 2) * 16, 5)
      x.restore()
    })
  }

  function drawPisces(t, o) {
    if (t < T.pisIn) return
    const k = pop01(t, T.pisIn, 0.4, 2.4) * o
    let mood = 'happy', tears = 1, fountain = true
    if (inR(t, [T.dog, T.cut2])) mood = 'heart'
    else if (inR(t, [T.h4, T.up])) { mood = 'neutral'; fountain = true }
    else if (t >= T.hug[0]) mood = 'sparkle'
    const r = drawStarChar(x, PIS_P.x, PIS_P.y, PIS_P.s, t, { color: PIS.color, mood, look: [-1, 1], seed: 17, pop: k, glow: 0.3,
      hops: [T.pisIn + 0.3, T.dog + 0.1, T.swA + 0.2, T.hug[1] + 0.1] })
    const e = eyesOf(r)
    if (k > 0.3) drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: tears * clamp(o), seed: 4, fountain })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const o = popOut(t, T.out)
      if (o > 0) {
        drawNotebook(x, t, { k: prog(t, ...T.book) * clamp(o), entry: 'No. 1' })
        if (t > T.book[1]) {
          sketches(t, o)
          drawPisces(t, o)
          drawMenu(t)
          drawClock(t)
          // the stars
          const sp = sPos(t), lp = lPos(t), ss = sState(t), ls = lState(t)
          const sk = pop01(t, T.sIn, 0.4, 2.2) * o, lk = pop01(t, T.lIn, 0.4, 2.2) * o
          drawMenus(t, lp)
          scales(t, lp, o)
          // Scorpio (rotates about its base when it faints)
          x.save(); x.translate(sp.x, sp.y + 0.44 * S_HOME.s); x.rotate(ss.rot); x.translate(-sp.x, -sp.y - 0.44 * S_HOME.s)
          const rs = drawStarChar(x, sp.x, sp.y, S_HOME.s, t, { color: SCO.color, glyph: SCO.glyph, mood: ss.mood, look: ss.look, blink: ss.blink, squash: ss.squash, hops: S_HOPS, seed: 3, pop: sk, glow: 0.35 })
          x.restore()
          if (ss.mood === 'sleepy') drawZzz(x, t, sp.x + 90, sp.y - 120, 8)
          if (t > T.faint[1] && t < T.up) for (let i = 0; i < 3; i++) { const a = t * 4 + i * 2.094; bmp(x, BM('.X. XXX .X.'), sp.x + 150 + Math.cos(a) * 60, sp.y + 60 + Math.sin(a) * 18, 7, { X: [GOLD, RED, PINK][i] }) }
          x.save(); x.translate(lp.x, lp.y + 0.44 * L_HOME.s); x.rotate(lp.rot || 0); x.translate(-lp.x, -lp.y - 0.44 * L_HOME.s)
          const rl = drawStarChar(x, lp.x, lp.y, L_HOME.s, t, { color: LIB.color, glyph: LIB.glyph, mood: ls.mood, look: ls.look, blink: ls.blink, squash: ls.squash, hops: L_HOPS, seed: 8, pop: lk, glow: 0.35 })
          x.restore()
          if (ls.sweat && lk > 0.5) drawSweat(x, t, rl.x + 110, rl.y - 140, 8)
          drawBoard(t, sp)
          drawDog(t)
          if (ss.mood === 'heart' && t < T.cand2) drawHearts(x, t, T.tacos + 0.1, rs.x, rs.y - 120, { n: 5, px: 7, spread: 120 })
          // the crickets: two tiny ink chirp marks
          if (inR(t, T.crickets)) for (let i = 0; i < 2; i++) { const on = Math.sin(t * 18 + i * 2) > 0; if (on) hand(x, '♪', 470 + i * 140, 860 + (i ? -20 : 0), { size: 40, color: rgba(INK, 0.6) }) }
          // the shared taco (callback)
          if (t > T.taco) {
            const tk = pop01(t, T.taco, 0.36, 2.4) * o
            x.save(); x.translate(540, 845 + Math.sin(t * 3) * 4); x.scale(tk, tk); bmp(x, TACO, -55, -35, 10, FOOD); x.restore()
            drawHearts(x, t, T.taco + 0.2, 540, 800, { n: 8, px: 7, spread: 300, alpha: clamp(o) })
          }
          // the meter (gone 2.4 s before the end card: no "Align" on screen at the end)
          const mk = pop01(t, T.meterIn, 0.42, 2) * outK(t, T.meterOut)
          drawMeter(x, t, needle(t), { k: mk, smoke: inR(t, T.thrash) ? 1 - prog(t, T.thrash[1] - 0.3, T.thrash[1]) : 0, stamp: prog(t, T.swA + 0.05, T.swA + 0.2) })
          if (t > T.swA && t < T.swA + 0.9) sparkBurst(x, t, 540 + 390 * (ZONE.align * 2 - 1), 1300, T.swA + 0.05, { n: 10, R: 160, size: 22, seed: 6 })
          // the TIP stamps (stamped onto the page, top-left)
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

// card cuts: candidates at every beat change; the default selection keeps the 2nd and 4th (12.35 → tip 1, 25.8 → tip 3),
// one per ~13 s. The end card flips at 40.6.
const CUTS = [5.9, { t: T.cut1, kind: 'flip' }, T.cand2, { t: T.cut2, kind: 'deal' }, T.cand4]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are shifted into the score's key by the engine; chip / snare / tom sit on music buses)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const land = (t, f = 1046.5) => [['pop', +t.toFixed(3), f, 0.05, 0], ['pluck', +t.toFixed(3), f, 0.04, 0.6, 0]]
const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
const scratch = t => [chip(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chip(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', t, 0.06]]
const womp = t => [[466.16, 0], [440, 0.36], [415.3, 0.72]].map(([f, d]) => chip(t + d, f, 0.3, { duty: 0.5, gain: 0.06, slide: -0.6, decay: 0.2, sustain: 0.6 })).concat([chip(t + 1.08, 392, 0.95, { duty: 0.5, gain: 0.06, slide: -2.2, vib: 0.03, decay: 0.4, sustain: 0.7 })])
const stampHit = t => [['boom', +t.toFixed(3), 0.2], ['tom', +t.toFixed(3), 70, { gain: 0.22, decay: 0.3, rev: 0.15 }], ['tick', +t.toFixed(3), 0.07]]
const crickets = ([a, b]) => { const out = []; for (let t = a; t < b; t += 0.42) out.push(chip(t, 4300, 0.035, { gain: 0.022, rev: 0.2, dly: 0 }), chip(t + 0.07, 4300, 0.035, { gain: 0.018, rev: 0.2, dly: 0 })); return out }
const flutter = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (1 - i / n * 0.5)])

export const CUES = [
  // 1 · the notebook slaps up
  ['whoosh', T.book[0], 0.45, 0.05], ['boom', T.book[1] - 0.05, 0.16], ['tick', T.book[1] - 0.05, 0.06],
  ...wordPops(T.h0, 3, 0.08, 0, 0.022), ...land(T.h0Land), ['pop', T.h0Land + 0.12, 1174.66, 0.04, 0],
  ['pop', T.sIn + 0.05, 523.25, 0.04, -0.3], ['pop', T.lIn + 0.05, 659.25, 0.04, 0.3],
  ...flutter(T.circles, 8, 0.06, 0.02), ...flutter(T.labels, 10, 0.07, 0.018),
  ['pop', T.meterIn + 0.1, 880, 0.03, 0], ['pop', T.pisIn + 0.1, 1174.66, 0.03, 0.5], ['glitter', T.pisIn + 0.1, T.pisIn + 0.5],
  ...flutter(T.arrow, 6, 0.07, 0.018),
  ['pop', T.push, 392, 0.05, -0.2], ['tom', T.push, 90, { gain: 0.18, decay: 0.25, rev: 0.15 }],
  // 2 · depth meets diplomacy
  ...wordPops(T.h1, 2, 0.08, 2), ...land(T.h1Land),
  ['whoosh', T.lean[0], 0.3, 0.03], ['whoosh', T.back[0], 0.3, 0.025],
  ...scratch(T.squint), ['pop', T.squint + 0.05, 330, 0.04, -0.3], ['pop', T.squint + 0.1, 330, 0.04, 0.3],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.thrash[0] + 0.1 + i * 0.13).toFixed(3), 0.03]),
  // 3 · tip 1
  ...stampHit(T.stamp1), ...wordPops(T.h2, 4, 0.08, 1), ...land(T.h2Land), ['pop', T.h2Land + 0.12, 1174.66, 0.04, 0],
  ['pop', T.menu + 0.05, 783.99, 0.035, 0], ['whoosh', T.menu, 0.3, 0.025],
  ['bell', T.level, 1567.98, 0.04, 1.4, 0.3], ['glitter', T.level, T.level + 0.5],
  ...crickets(T.crickets),
  ['tom', T.tacos, 80, { gain: 0.24, decay: 0.35, rev: 0.2 }], ['pop', T.tacos + 0.05, 1046.5, 0.04, 0.3], ...flutter(T.tacos + 0.05, 6, 0.05, 0.02),
  ['pluck', T.tacos + 0.12, 1318.51, 0.04, 0.6, -0.3],
  // 4 · tip 2
  ...stampHit(T.stamp2), ...wordPops(T.h3, 3, 0.08, 3), ...land(T.h3Land + 0.15), ['pop', T.h3Land + 0.25, 1174.66, 0.04, 0],
  ['pop', T.board + 0.05, 659.25, 0.035, -0.3], ['tick', T.board + 0.12, 0.04],
  ['pop', T.dog, 1318.51, 0.05, 0.2], chip(T.dog + 0.12, 1400, 0.06, { gain: 0.04 }), chip(T.dog + 0.24, 1600, 0.06, { gain: 0.04 }),
  ['bell', T.melt, 1318.51, 0.035, 1.4, -0.3], ['glitter', T.melt, T.melt + 0.5],
  chip(T.rip, 2600, 0.24, { wave: 'noise', slide: -30, gain: 0.07, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.1, dly: 0 }), ...flutter(T.rip + 0.05, 8, 0.05, 0.025),
  // 5 · tip 3
  ...stampHit(T.stamp3), ...wordPops(T.h4, 3, 0.08, 4), ...land(T.h4Land + 0.25), ...flutter(T.note, 9, 0.07, 0.018),
  ['pop', T.clock + 0.05, 880, 0.035, 0],
  ...Array.from({ length: 26 }, (_, i) => ['tick', +(T.ff[0] + i * 0.1).toFixed(3), 0.022 + 0.012 * (i % 2)]),
  ...[0, 1, 2, 3, 4].map(i => ['whoosh', +(T.menus[0] + i * 0.62).toFixed(3), 0.25, 0.02]),
  ['bell', T.ff[1], 1046.5, 0.04, 1.2, 0], ['pop', T.sleep, 392, 0.025, -0.3],
  ['pop', T.take, 392, 0.05, -0.3], ['pop', T.take + 0.05, 349.23, 0.05, -0.2], ['whoosh', T.faint[0], 0.3, 0.04], ['boom', T.faint[1], 0.14],
  ...womp(T.faint[1] + 0.1),
  // 6 · settle
  ['pop', T.up, 1046.5, 0.04, -0.3], ['whoosh', T.swP - 0.1, 0.4, 0.03],
  ['pluck', T.swP, 783.99, 0.04, 0.4, -0.4], ['pluck', T.swU, 987.77, 0.04, 0.4, 0], ['pluck', T.swA, 1174.66, 0.05, 0.8, 0.4],
  ...stampHit(T.swA + 0.1), ['glitter', T.swA + 0.1, T.swA + 0.7], ['bell', T.swA + 0.15, 1567.98, 0.035, 1.6, 0.3],
  // 7 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // 8 · survived
  ['whoosh', T.hug[0], 0.35, 0.03], ['pop', T.taco + 0.05, 783.99, 0.04, 0], ['glitter', T.taco + 0.1, T.taco + 0.6],
  ...wordPops(T.h6 + 0.18, 3, 0.09, 0, 0.028), ['pluck', T.h6 + 0.2, 1318.51, 0.045, 0.8, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  // dialogue blips
  ...talkCues(ALL, { cps: CPS, pitch: { [S_TAG]: 440, [L_TAG]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
