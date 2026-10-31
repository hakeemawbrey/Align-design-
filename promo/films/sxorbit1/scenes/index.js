// sxorbit1 — ORBIT, Ep 1: "Dealt." (45 s vertical Align ad, Star Talk Shows · Show 1, music: cinematic, D minor).
// A glossy star soap. Cast (promo/films/sxorbit1/scenes/orbit.js, shared by every episode): ♈ EMBER (Aries red, bold,
// impulsive, big heart) and ♋ TIDE (Cancer silvery-blue, shy, with a tiny pearl shell to hide in). ♓ Pisces sobs into a
// tissue box in the back, like a soap viewer. Story 0–40.6, then the shared end card.
//   0.00–2.70  The glossy "Orbit" title swoops in on the hit (EPISODE 1 · Dealt.) and shrinks into the ORBIT · EP 1 bug.
//   2.75–10.4  "Tonight's deck | is *dealing.*"  The deck deals two blind mystery cards: ♋ to Ember, ♈ to Tide.
//              Soap snap-zoom on Ember: "a mystery card? for ME?!"  Snap-zoom on Tide: "a mystery card… for me?"
//  10.55       card cut.
//  10.6–16.0   "Ember says | *yes.*"  Rule of three on the beat: the stamps slam "yes." · "YES." · "YESSS!!" (the pill goes
//              pink). Ember: "I said yes before it landed."  Then it stares at the card, refreshing (↻ ↻ ↻).
//  16.2–26.0   "Tide… | *hides.*"  Gasp → the tiny shell grows and swallows her (zoom, DUN). "She *peeks…*" two eyes in the
//              doorway → Ember hops, waving → "…and *hides.*" (zoom, DUN). Peek two: "what if they're too much?" (Ember, in
//              the back, is doing star-jumps.) Hidden again. "Ba-dum. | *Ba-dum.*" A pink heart thumps through the shell:
//              "but my heart is doing a thing."
//  26.25       card cut.
//  26.4–31.6   "Then… | *tap.*" Silence: Tide slowly comes out, blushing… hops… taps YES on the beat. Crash zoom, "IT'S
//              MUTUAL". Ember faints flat backward, heart-eyed; Pisces wails. Ember (from the floor): "best. day. of my LIFE."
//  31.71–36.1  ★ LESSON UNLOCKED: "Nervous and *interested* | can live in | the same star."  +1 COURAGE
//  36.1–37.27  "And now… | the *faces…*" Both cards float up side by side; the veils begin to lift… FREEZE (record stop,
//              pink grade, scanlines).
//  37.6–40.6   the pink "NEXT TIME ON Orbit…" card + the last line: "*Face* last, darling."
// One canvas (sky + world through a camera), DOM type + dialogue boxes + the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  BEAT, GOLD, BONE, PINK, LAV, CYAN, ORBIT_PINK, INK, MONO, r3, pop01, outK, popOut, inR, bump, rgba,
  drawEmber, drawTide, drawPisces, drawMysteryCard, drawYes, drawStamp, drawDeck, makeCam, snapKeys, IDN, toS, dramaFx, sparkleRing,
  drawFreeze, showBug, buildLogo, buildNextTime,
} from './orbit.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const W = 1080, H = 1920
const TIDE_BLUE = '#8fdcff', EMBER_RED = '#ff9a7a'

// ── the timeline
const T = {
  black: [0, 0.2],
  logo: 0.6, fly: [2.2, 2.7], bug: 2.55,
  deckIn: 2.75, eIn: 3.0, tIn: 3.15, pIn: 3.5,
  deal1: [BEAT(6) - 0.4, BEAT(6)], deal2: [BEAT(7) - 0.4, BEAT(7)],            // land 3.933 · 4.489
  deckOut: [4.6, 4.95],
  zE: BEAT(8), zEend: 6.75, zT: BEAT(12), zTend: 9.3,                          // 5.044 · 7.267
  open1: 5.0, l1: 5.15, l2: 7.75, close1: 10.4,
  cut1: 10.55,
  stamp: [BEAT(19), BEAT(20), BEAT(21)],                                       // 11.156 · 11.711 · 12.267
  open2: 12.6, l3: 12.75, refresh: [14.3, 15.9], close2: 15.95,
  cut1b: 16.1,
  gasp: 16.3, hide1: [16.45, BEAT(29)], zH: BEAT(29),                          // shell shut on 16.711
  peek1: [BEAT(32), 19.55], wave: BEAT(34), zH2: 19.6, zH2end: 20.4,           // 18.378 · 19.489
  peek2: [20.55, 22.3], open3: 20.6, l4: 20.75, jacks: [20.6, 22.6],
  beats: [BEAT(40), r3(BEAT(40) + 0.24), BEAT(42), r3(BEAT(42) + 0.24), BEAT(44), r3(BEAT(44) + 0.24), BEAT(46), r3(BEAT(46) + 0.24)],
  l5: 23.3, close3: 26.0,
  cut2: 26.25,
  emerge: [26.45, 27.45], tap: BEAT(49), zTap: BEAT(49), zTapEnd: 28.2,         // 27.822
  faint: [28.25, 28.65], open4: 28.6, l6: 28.75, close4: 31.5,
  lesson: BEAT(56), lessonOut: [35.85, 36.05],                                 // 31.711
  getUp: [33.2, 33.8],
  rise: [35.95, 36.5], lift: [36.5, 37.267], freeze: 37.267,
  next: 37.6, last: 38.25,
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Nervous and *interested* | can live in | the same star.', chip: '+1 COURAGE' }

// ── the dialogue
const ET = '♈︎ EMBER', TT = '♋︎ TIDE', TS = '♋︎ TIDE (in the shell)'
const LINES1 = [
  { t: T.l1, speaker: ET, color: EMBER_RED, text: 'a *mystery card?* for ME?!' },
  { t: T.l2, speaker: TT, color: TIDE_BLUE, text: 'a mystery card… for *me?*' },
]
const LINES2 = [{ t: T.l3, speaker: ET, color: EMBER_RED, text: 'I said yes before it *landed.*' }]
const LINES3 = [
  { t: T.l4, speaker: TS, color: TIDE_BLUE, text: 'what if they’re *too much?*' },
  { t: T.l5, speaker: TS, color: PINK, text: 'but my heart is doing a *thing.*' },
]
const LINES4 = [{ t: T.l6, speaker: '♈︎ EMBER (on the floor)', color: EMBER_RED, text: 'best. day. of my *LIFE.*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const CPS = 28
export const LINE_TIMES = lineTimes(ALL_LINES, { cps: CPS })

// ── headlines
const HEADS = [
  { text: 'Tonight’s deck | is *dealing.*', top: 160, size: 100, accentSize: 150, at: 3.0, late: 1, lateAt: T.deal1[1], accentColor: ORBIT_PINK, out: [4.88, 5.03] },
  { text: 'Ember says | *yes.*', top: 160, size: 108, accentSize: 170, at: 10.68, late: 1, lateAt: T.stamp[0], accentColor: ORBIT_PINK, out: [15.85, 16.05] },
  { text: 'Tide… *hides.*', top: 1500, size: 112, accentSize: 170, at: 16.25, late: 1, lateAt: T.zH, accentColor: TIDE_BLUE, out: [18.18, 18.33] },
  { text: 'She *peeks…*', top: 190, size: 112, accentSize: 170, at: 18.4, late: 1, lateAt: 18.6, accentColor: TIDE_BLUE, out: [19.45, 19.58] },
  { text: '…and *hides.*', top: 1500, size: 112, accentSize: 170, at: 19.6, late: 1, lateAt: 19.62, accentColor: TIDE_BLUE, out: [20.38, 20.52] },
  { text: 'Peek *two.*', top: 190, size: 112, accentSize: 170, at: 20.6, late: 1, lateAt: 20.8, accentColor: TIDE_BLUE, out: [22.6, 22.75] },
  { text: 'Ba-dum. | *Ba-dum.*', top: 160, size: 112, accentSize: 170, at: T.beats[0], late: 1, lateAt: T.beats[2], accentColor: PINK, out: [25.95, 26.1] },
  { text: 'Then… | *tap.*', top: 160, size: 120, accentSize: 190, at: 26.42, late: 1, lateAt: T.tap, accentColor: ORBIT_PINK, out: [31.4, 31.6] },
  { text: 'And now… | the *faces…*', top: 160, size: 104, accentSize: 156, at: 36.15, late: 1, lateAt: 36.55, accentColor: ORBIT_PINK, out: [37.85, 38.0] },
  { text: '*Face* last, | darling.', top: 200, size: 120, accentSize: 190, at: T.last, gap: 0.12, accentColor: ORBIT_PINK, out: [99, 100] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── the world
const E_HOME = { x: 270, y: 1185 }, T_HOME = { x: 810, y: 1185 }, S_E = 290, S_T = 280
const P_AT = { x: 540, y: 1360, s: 104 }
const DECK = { x: 540, y: 740, w: 200 }
const EC = { x: 270, y: 715, w: 230 }, TC = { x: 810, y: 715, w: 230 }          // Ember's card (♋) · Tide's card (♈)
const EC2 = { x: 385, y: 760, w: 250 }, TC2 = { x: 695, y: 760, w: 250 }         // the cliffhanger: side by side
const PILL_DY = 222, PILL_S = 0.78

const CAM = makeCam([
  [0, ...IDN],
  ...snapKeys(T.zE, T.zEend, 1.7, 270, 1150, 540, 1180),
  ...snapKeys(T.zT, T.zTend, 1.7, 810, 1150, 540, 1180),
  ...snapKeys(T.zH, 17.95, 1.5, 810, 1120, 540, 1250),
  ...snapKeys(T.zH2, T.zH2end, 1.65, 810, 1130, 540, 1270),
  ...snapKeys(T.zTap, T.zTapEnd, 1.32, 540, 860, 540, 900),
  [36.0, ...IDN, 'lin'],
])
const DRAMA = [[T.zE, T.zEend, 0.8], [T.zT, T.zTend, 0.8], [T.zH, 17.95, 1], [T.zH2, T.zH2end, 0.9], [T.zTap, T.zTapEnd, 0.7], [T.lift[0], 99, 0.6]]
const SNAPS = [T.zE, T.zT, T.zH, T.zH2, T.zTap]

// hops
const E_LINES_HOPS = talkHops(ALL_LINES, ET, { cps: CPS }).concat(talkHops(ALL_LINES, '♈︎ EMBER (on the floor)', { cps: CPS }))
const REFRESH = [14.35, 14.85, 15.35, 15.85].filter(v => v < T.refresh[1])
const JACKS = [20.65, 21.2, 21.75, 22.3]
const E_HOPS = [T.eIn + 0.3, T.deal1[1] + 0.05, ...E_LINES_HOPS, ...T.stamp, ...REFRESH, 17.4, 18.0, T.wave, T.wave + 0.42, ...JACKS, 24.2, 25.3, T.tap + 0.12, T.getUp[1], 36.5]
const T_HOPS = [T.tIn + 0.35, T.deal2[1] + 0.05, ...talkHops(ALL_LINES, TT, { cps: CPS }), T.gasp, T.tap - 0.05, T.tap + 0.6, 36.5]

function emberState(t) {
  const st = { mood: 'neutral', look: [1, -1], blink: undefined, squash: 0, rot: 0, dx: 0, dy: 0 }
  if (t < T.deal1[1]) { st.look = [1, -1]; return st }
  if (t < T.zE) { st.mood = 'wide'; st.look = [0, -1]; return st }
  if (t < T.l1 + 1.2) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; return st }
  if (t < T.cut1) { st.mood = 'sparkle'; st.look = [0, -1]; return st }
  if (t < T.stamp[0]) { st.mood = 'happy'; return st }
  if (t < T.stamp[2] + 0.5) { st.mood = 'wide'; st.look = [0, -1]; st.blink = false; st.squash = 0.06; return st }
  if (t < T.refresh[0]) { st.mood = 'heart'; st.look = [1, 0]; return st }
  if (t < T.refresh[1]) { st.mood = 'neutral'; st.look = [0, -1]; st.blink = false; return st }
  if (t < T.wave - 0.1) { st.mood = 'happy'; return st }
  if (t < T.wave + 0.9) { st.mood = 'sparkle'; st.look = [1, 0]; return st }
  if (t < T.jacks[0]) { st.mood = 'happy'; return st }
  if (t < T.jacks[1]) { st.mood = 'squint'; st.squash = 0.08 * Math.sin((t - T.jacks[0]) * 11); return st }
  if (t < T.tap) { st.mood = 'neutral'; st.look = [0, -1]; return st }
  if (t < T.faint[0]) { st.mood = 'wide'; st.look = [1, -1]; st.blink = false; return st }
  if (t < T.getUp[1]) {
    const f = easeOutBack(prog(t, ...T.faint), 1.4), g = ease.inOutCubic(prog(t, ...T.getUp))
    st.mood = 'heart'; st.rot = lerp(0, -1.5, f) * (1 - g); st.dy = 30 * f * (1 - g); return st
  }
  st.mood = t < T.rise[0] ? 'happy' : 'sparkle'; st.look = t < T.rise[0] ? [1, 0] : [1, -1]
  return st
}
function tideState(t) {
  const st = { mood: 'neutral', look: [-1, -1], blink: undefined, blush: undefined, hide: 0, peek: 0, peekLook: [-1, 0], thump: 0, squash: 0 }
  if (t < T.deal2[1]) return st
  if (t < T.zT) { st.mood = 'wide'; st.look = [0, -1]; return st }
  if (t < T.l2) { st.mood = 'wide'; st.look = [0, 0]; st.blink = false; return st }
  if (t < T.cut1) { st.mood = 'sparkle'; st.look = [0, 0]; st.blush = 0.9; return st }
  if (t < T.gasp) { st.mood = 'neutral'; st.look = inR(t, T.stamp[0], 13.5) ? [-1, 0] : [0, -1]; return st }
  if (t < T.hide1[0]) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.emerge[0]) {
    st.mood = 'wide'; st.blink = false
    st.hide = t < T.hide1[1] ? ease.inCubic(prog(t, ...T.hide1)) : 1
    const pk = (a, b) => clamp((t - a) / 0.15) * (1 - clamp((t - b) / 0.08))
    st.peek = Math.max(pk(...T.peek1), pk(...T.peek2))
    st.peekLook = inR(t, T.peek1[0], T.peek1[0] + 0.45) ? [1, 0] : inR(t, T.peek1[0] + 0.45, T.peek1[0] + 0.9) ? [-1, -1] : t < T.peek2[0] ? [-1, 0] : inR(t, T.peek2[0], 21.6) ? [-1, 1] : [0, 0]
    st.thump = T.beats.reduce((m, b) => Math.max(m, bump(t, b, 0.22)), 0) + (t > T.beats[0] ? 0.25 : 0)
    return st
  }
  if (t < T.tap) { st.hide = 1 - ease.inOutCubic(prog(t, ...T.emerge)); st.mood = 'sparkle'; st.look = [-1, -1]; st.blush = 1; st.thump = 0.25 * (1 - prog(t, ...T.emerge)); return st }
  if (t < T.faint[1]) { st.mood = 'happy'; st.blush = 1; return st }
  if (t < T.rise[0]) { st.mood = 'heart'; st.look = [-1, 0]; return st }
  st.mood = 'sparkle'; st.look = [-1, -1]; st.blush = 0.8
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [1, -1], tears: 1, pull: 0 }
  if (t >= T.zH && t < T.emerge[0]) { st.tears = 2; st.look = [1, 0] }
  if (inR(t, T.zH, T.zH + 0.6) || inR(t, T.zH2, T.zH2 + 0.6)) st.pull = 1
  if (t >= T.tap && t < T.rise[0]) { st.tears = 3; st.mood = 'happy'; st.pull = bump(t, T.tap + 0.1, 0.5) }
  if (t >= T.rise[0]) { st.tears = 2; st.look = [0, -1]; st.mood = 'wide' }
  return st
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "700 44px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "italic 500 34px 'EB Garamond'", "600 30px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "700 14px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const logo = buildLogo(root, 1, 'Dealt.', { at: T.logo, fly: T.fly })
  const bug = showBug(root, 1, { at: T.bug })
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, open: T.open4, close: T.close4 }),
  ]
  const next = buildNextTime(root, { at: T.next, top: 1090 })
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const stroked = (txt, X, Y, size, col, lw = 10) => { x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }

  // card positions (world)
  function cardGeo(t, which) {
    const D = which === 'E' ? T.deal1 : T.deal2, P = which === 'E' ? EC : TC, P2 = which === 'E' ? EC2 : TC2
    if (t < D[0]) return null
    if (t < D[1]) {
      const p = ease.outCubic(prog(t, ...D))
      return { x: lerp(DECK.x, P.x, p), y: lerp(DECK.y, P.y, p) - Math.sin(Math.PI * p) * 120, w: lerp(DECK.w, P.w, p), rot: lerp(0, which === 'E' ? -0.07 : 0.07, p) + (1 - p) * (which === 'E' ? -6.28 : 6.28), sx: Math.cos((1 - p) * Math.PI * 2) }
    }
    const k = ease.inOutCubic(prog(t, ...T.rise))
    const bob = Math.sin(t * 1.8 + (which === 'E' ? 0 : 1.7)) * 8
    return { x: lerp(P.x, P2.x, k), y: lerp(P.y, P2.y, k) + bob, w: lerp(P.w, P2.w, k), rot: lerp(which === 'E' ? -0.07 : 0.07, which === 'E' ? -0.04 : 0.04, k), sx: 1 }
  }

  function drawCards(t, tf) {
    for (const which of ['E', 'T']) {
      const g = cardGeo(tf, which)
      if (!g) continue
      const lift = which ? ease.inQuad(prog(tf, ...T.lift)) * 0.5 : 0
      const glow = which === 'E' ? bump(tf, T.stamp[2], 0.8) : bump(tf, T.tap, 0.8)
      if (g.sx < 0) {
        // back side while spinning out of the deck
        x.save(); x.translate(g.x, g.y); x.rotate(g.rot); x.scale(Math.abs(g.sx), 1)
        drawDeck(x, 0, 0, g.w, tf, { n: 1, glow: 0 })
        x.restore()
      } else drawMysteryCard(x, g.x, g.y, g.w, tf, { sign: which === 'E' ? 'cancer' : 'aries', rot: g.rot, scaleX: Math.max(0.02, g.sx), lift, glow: glow + 0.3 * lift, seed: which === 'E' ? 0 : 2 })
      // the YES pill
      if (tf >= (which === 'E' ? T.deal1[1] : T.deal2[1]) && tf < T.rise[0] + 0.3) {
        const on = which === 'E' ? (tf >= T.stamp[0] ? 1 : 0) : (tf >= T.tap ? 1 : 0)
        const press = which === 'E' ? T.stamp.reduce((m, s) => Math.max(m, bump(tf, s, 0.18)), 0) : bump(tf, T.tap, 0.2)
        const a = pop01(tf, which === 'E' ? T.deal1[1] : T.deal2[1], 0.3) * (1 - prog(tf, T.rise[0], T.rise[0] + 0.3))
        drawYes(x, g.x, g.y + PILL_DY, PILL_S * a, tf, { on, press })
      }
    }
  }
  function drawStamps(t) {
    const life = 16.0 - T.stamp[0]
    drawStamp(x, EC.x - 10, EC.y - 70, 'yes.', 56, t, T.stamp[0], { rot: -0.18, life })
    drawStamp(x, EC.x + 14, EC.y + 20, 'YES.', 78, t, T.stamp[1], { rot: 0.1, life: life - 0.55 })
    drawStamp(x, EC.x + 40, EC.y + 120, 'YESSS!!', 92, t, T.stamp[2], { rot: -0.08, life: life - 1.1, col: '#ffd84a' })
    // IT'S MUTUAL
    drawStamp(x, 540, 610, 'IT’S MUTUAL', 96, t, T.tap + 0.05, { rot: -0.06, life: T.lesson - T.tap - 0.1, col: '#ffd84a' })
    // refresh glyphs over Ember's card
    for (const r of REFRESH) {
      const k = t - r
      if (k < 0 || k > 0.8) continue
      x.globalAlpha = Math.sin(Math.PI * k / 0.8); stroked('↻', EC.x + 150, EC.y - 120 - k * 80, 64, ORBIT_PINK, 12); x.globalAlpha = 1
    }
  }
  function drawCast(t, tf, C) {
    const eS = emberState(tf), tS = tideState(tf), pS = pisState(tf)
    const kE = pop01(t, T.eIn, 0.36, 2), kT = pop01(t, T.tIn, 0.36, 2), kP = pop01(t, T.pIn, 0.36, 2)
    if (kP > 0.01) drawPisces(x, P_AT.x, P_AT.y, P_AT.s, tf, { mood: pS.mood, look: pS.look, tears: pS.tears, pull: pS.pull, pop: kP, hops: [T.zH + 0.05, T.tap + 0.1, T.tap + 0.5, T.tap + 0.9] })
    if (kE > 0.01) {
      // star-jumps while Tide peeks (a little side hop), a lean on the wave
      const jx = inR(tf, ...T.jacks) ? 22 * Math.sin((tf - T.jacks[0]) * 11) : 0
      drawEmber(x, E_HOME.x + jx + eS.dx, E_HOME.y + eS.dy, S_E, tf, { mood: eS.mood, look: eS.look, blink: eS.blink, squash: eS.squash, hops: E_HOPS, pop: kE, rot: eS.rot })
    }
    if (kT > 0.01) drawTide(x, T_HOME.x, T_HOME.y, S_T, tf, { mood: tS.mood, look: tS.look, blink: tS.blink, blush: tS.blush, hops: T_HOPS, pop: kT, hide: tS.hide, peek: tS.peek, peekLook: tS.peekLook, thump: clamp(tS.thump) })
  }
  function worldText(t) {
    // hearts floating off Ember on the floor
    if (inR(t, T.faint[0], T.getUp[0])) {
      for (let i = 0; i < 5; i++) {
        const ph = ((t - T.faint[0]) * 0.6 + i / 5) % 1
        x.globalAlpha = Math.sin(Math.PI * ph); stroked('♥', E_HOME.x - 100 + i * 50, E_HOME.y - 60 - ph * 220, 46, i % 2 ? ORBIT_PINK : '#ffd3ea', 10); x.globalAlpha = 1
      }
    }
    // "waves both arms" — a pair of motion arcs at the wave
    const wv = t - T.wave
    if (wv >= 0 && wv < 0.9) { x.globalAlpha = 1 - wv / 0.9; stroked('HI!!', E_HOME.x, E_HOME.y - 230 - wv * 60, 56, '#ffd84a', 12); x.globalAlpha = 1 }
    // "gasp."
    const gp = t - T.gasp
    if (gp >= 0 && gp < 0.6) { x.globalAlpha = 1 - gp / 0.6; stroked('gasp.', T_HOME.x + 40, T_HOME.y - 220 - gp * 50, 44, TIDE_BLUE, 10); x.globalAlpha = 1 }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const tf = Math.min(t, T.freeze)           // the world freezes on the cliffhanger
      const C = CAM(tf)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, tf, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      withCam(C, () => {
        // the deck
        if (tf >= T.deckIn && tf < T.deckOut[1]) {
          const k = pop01(tf, T.deckIn, 0.4, 1.8) * (1 - ease.inCubic(prog(tf, ...T.deckOut)))
          drawDeck(x, DECK.x, DECK.y - 30 * (1 - k), DECK.w * k, tf, { n: tf < T.deal1[0] ? 5 : tf < T.deal2[0] ? 4 : 3, glow: 0.8 })
          sparkleRing(x, tf, DECK.x, DECK.y, T.deckIn + 0.1, 10, 180, 0.2)
        }
        drawCast(t, tf, C)
        drawCards(t, tf)
        drawStamps(tf)
        worldText(tf)
        sparkleRing(x, tf, EC.x, EC.y, T.deal1[1], 10, 170, 0.1)
        sparkleRing(x, tf, TC.x, TC.y, T.deal2[1], 10, 170, 0.5)
        sparkleRing(x, tf, TC.x, TC.y + PILL_DY, T.tap, 14, 160, 0.3, [ORBIT_PINK, GOLD, BONE, PINK], 0.9, 34)
        sparkleRing(x, tf, T_HOME.x, T_HOME.y - 40, T.zH, 10, 170, 0.7, [TIDE_BLUE, BONE, LAV], 0.6, 26)
      })
      dramaFx(x, tf, SNAPS, DRAMA)
      drawFreeze(x, t, T.freeze)
      logo.update(t)
      bug.update(t)
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      next.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (beat changes). The default selection keeps 2 of these 4 (indices 1 and 3):
// 10.55 (→ Ember says yes) and 26.25 (→ "Then… tap.").
export const CUTS = [T.fly[1] + 0.03, T.cut1, T.cut1b, T.cut2]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into F major = D minor's relative);
// brass / strings / chip are written straight in D minor.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, Bb3: 233.08, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, Bb4: 466.16, C5: 523.25, D5: 587.33 }
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [
  ['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }],
  ['tom', r3(t), low, { gain: 0.34, decay: 0.7, rev: 0.4, bus: 'fx' }],
  ['whoosh', r3(t + 0.04), 0.3, 0.06],
]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const stampCue = (t0, k) => [['tom', r3(t0), 90 - k * 8, { gain: 0.28 + 0.06 * k, decay: 0.35, rev: 0.3, bus: 'fx' }], ['clap', r3(t0), { gain: 0.22 + 0.06 * k, rev: 0.3, bus: 'fx' }], ['pop', r3(t0 + 0.01), NOTE[3 + k], 0.04, 0.2]]
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
const shellShut = t0 => [['chip', r3(t0 - 0.2), 900, 0.22, { wave: 'tri', slide: -20, gain: 0.04, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }], ['pop', r3(t0), 220, 0.07, 0.3], ['tick', r3(t0), 0.06]]
const peekCue = t0 => [['pluck', r3(t0), 1318.51, 0.025, 0.5, 0.3], ['pop', r3(t0 + 0.06), 1760, 0.02, 0.3]]
export const CUES = [
  // 0 · the title
  ['whoosh', 0.3, 0.5, 0.06], ['glitter', 0.45, 1.4],
  ['brass', T.logo, [N.D3, N.A3, N.D4, N.F4, N.A4], 1.6, { gain: 0.05, bright: 1.2, ...FXB }], ['tom', T.logo, 60, { gain: 0.34, decay: 0.9, rev: 0.4, bus: 'fx' }], ['boom', T.logo, 0.3],
  ['strings', T.logo, 2.4, [N.D4, N.F4, N.A4, N.D5], { gain: 0.012, attack: 0.05, release: 0.7, rev: 0.5, bus: 'fx' }],
  ['bell', 1.0, 1760, 0.03, 1.4, 0], ['whoosh', 2.25, 0.45, 0.05],
  // 1 · the deal
  ['pop', T.deckIn, 523.25, 0.04, 0], ['glitter', T.deckIn, r3(T.deckIn + 0.5)],
  ...headCues(HEADS[0]),
  ['whoosh', r3(T.deal1[0] + 0.05), 0.35, 0.06], ['tick', T.deal1[1], 0.06], ['pop', T.deal1[1], 784, 0.04, -0.3],
  ['whoosh', r3(T.deal2[0] + 0.05), 0.35, 0.06], ['tick', T.deal2[1], 0.06], ['pop', T.deal2[1], 880, 0.04, 0.3],
  ...sting(T.zE, [N.D3, N.A3, N.D4, N.F4], 0.5, 0.042, 80),
  ...sting(T.zT, [N.Bb3, N.D4, N.F4, N.Bb4], 0.5, 0.042, 76),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ET]: 1046.5, [TT]: 740, [TS]: 660, '♈︎ EMBER (on the floor)': 990 } }),
  // 2 · yes, YES, YESSS
  ...headCues(HEADS[1]),
  ...T.stamp.flatMap((s, k) => stampCue(s, k)), ['glitter', T.stamp[2], r3(T.stamp[2] + 0.5)],
  ...REFRESH.map(r => ['pop', r3(r + 0.05), 1318.51, 0.025, 0.4]),
  // 3 · Tide hides
  ['pop', T.gasp, 1174.66, 0.03, 0.3], ['chip', T.gasp, 900, 0.15, { duty: 0.25, slide: 12, gain: 0.02, decay: 0.12, sustain: 0.5, rev: 0.1, dly: 0, bus: 'fx' }],
  ...shellShut(T.zH), ...sting(T.zH, [N.D3, N.F3, N.A3, N.D4, N.F4], 1.0, 0.05, 62), ['boom', T.zH, 0.3],
  ...headCues(HEADS[2]), ...headCues(HEADS[3]), ...peekCue(T.peek1[0]),
  ['pop', T.wave, 1318.51, 0.035, -0.3], ['pop', r3(T.wave + 0.42), 1174.66, 0.03, -0.3],
  ...shellShut(T.zH2), ...sting(T.zH2, [N.E3, N.G3, N.Bb3, N.E4], 0.6, 0.045, 70), ...headCues(HEADS[4]),
  ...headCues(HEADS[5]), ...peekCue(T.peek2[0]), ...JACKS.map(j => ['tick', r3(j + 0.3), 0.03]),
  ...shellShut(T.peek2[1] + 0.05),
  ...T.beats.map((b, i) => ['tom', b, i % 2 ? 58 : 66, { gain: i % 2 ? 0.2 : 0.3, decay: 0.3, rev: 0.25, bus: 'fx' }]),
  ...headCues(HEADS[6]).filter(c => c[0] !== 'pluck'),
  // 4 · the tap
  ...headCues(HEADS[7]).filter(c => c[0] !== 'pluck'),
  ['chip', T.emerge[0], 500, 1.0, { wave: 'tri', slide: 14, gain: 0.018, decay: 0.9, sustain: 0.6, rev: 0.3, dly: 0, bus: 'fx' }],
  ['bell', r3(T.tap - 0.6), 1318.51, 0.015, 0.8, 0.3],
  ...sting(T.tap, [N.D4, N.F4, N.A4, N.D5], 1.2, 0.05, 64), ['glitter', T.tap, r3(T.tap + 0.9)], ['bell', T.tap, 2349.3, 0.035, 1.6, 0], ['pluck', r3(T.tap + 0.06), 1760, 0.03, 0.8, 0],
  ['clap', r3(T.tap + 0.05), { gain: 0.3, rev: 0.3, bus: 'fx' }],
  ['whoosh', T.faint[0], 0.45, 0.06], ['chip', T.faint[0], 900, 0.4, { wave: 'tri', slide: -30, gain: 0.04, decay: 0.35, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }], ['tom', T.faint[1], 70, { gain: 0.3, decay: 0.4, rev: 0.3, bus: 'fx' }],
  // 5 · lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Dm' }),
  ['pop', T.getUp[1], 659.25, 0.02, -0.3],
  // 6 · the cliffhanger
  ...headCues(HEADS[8]), ['whoosh', r3(T.rise[0] + 0.1), 0.45, 0.05], ['riser', T.lift[0], T.freeze, 0.05], ['glitter', T.lift[0], T.freeze],
  ...scratch(T.freeze), ['boom', T.freeze, 0.32], ['brass', T.freeze, [N.D3, N.A3, N.D4, N.F4], 0.3, { gain: 0.045, bright: 1.3, ...FXB }],
  ['whoosh', r3(T.next - 0.05), 0.5, 0.06], ['glitter', T.next, r3(T.next + 0.7)],
  ['strings', T.next, STORY_END, [N.D4, N.F4, N.A4, N.D5], { gain: 0.012, attack: 0.1, release: 0.8, rev: 0.5, bus: 'fx' }],
  ['brass', r3(T.next + 0.05), [N.Bb3, N.D4, N.F4, N.Bb4], 1.0, { gain: 0.045, bright: 1.15, ...FXB }], ['tom', r3(T.next + 0.05), 62, { gain: 0.3, decay: 0.8, rev: 0.4, bus: 'fx' }],
  ...headCues(HEADS[9]),
  ['brass', r3(T.last + 0.6), [N.A3, 277.18, N.E4, N.A4], 0.9, { gain: 0.04, bright: 1.1, ...FXB }],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
