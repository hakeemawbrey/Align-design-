// sxorbit2 — ORBIT, Ep 2: "Face Last." (45 s vertical Align ad, Star Talk Shows · Show 1, music: lofi, F major).
// Cast from ../../sxorbit1/scenes/orbit.js: ♈ EMBER, ♋ TIDE (+ shell), ☄ STREAK (cameo), ♓ Pisces with tissues.
// Story 0–40.6, then the shared end card.
//   0.00–1.00  ◀◀ PREVIOUSLY ON Orbit… (VHS band over Ep 1's last shot: two YES ✓ cards, IT'S MUTUAL, the freeze grade).
//   1.0–5.3    "The *reveal.*" The veils lift on the hit: Ember's card shows Tide, Tide's card shows Ember.
//   5.45–11.9  "Tide expected: | *mysterious.*" A pink thought bubble: Ember in dark shades, smouldering… POP.
//              "Tide got: | *golden retriever.*" The real Ember bounces, rocks side to side and wags a pixel tail:
//              "HI!! you're SO cute. is that a *shell?*"  Tide half-hides, blushing.
//  12.35       card cut.
//  12.4–23.6   "First *talk card.*" A talk card deals in: "Your perfect | Sunday?" Answers stay face down till both
//              play: Ember's slams down instantly (DONE!), Tide's after a long pencil wiggle. Both flip on the beat:
//              "a 10K run." vs "a blanket fort."  "*Gasp.*" — soap zooms: Ember · Tide · Pisces (mid-sob).
//              Silence. Then, together: "…I could try *yours.*"  "Plot twist: | *compromise.*"
//  23.75       card cut (not kept).
//  23.8–27.1   "Sunday, | *sorted.*" Ember in a patchwork blanket fort; Tide in a pink sweatband, jogging in place.
//  27.25       card cut.
//  27.82–32.5  ★ LESSON UNLOCKED: "Different isn't | a dealbreaker. | *Curious* is the move."  +1 OPEN MIND
//  32.6–37.27  "Meanwhile… | *in the sky.*" A glittery tail streaks across the stars. Ember freezes: "…*Streak?*"
//              Soap zoom on Tide: "Who is *she*?!" … FREEZE.
//  37.6–40.6   the pink "NEXT TIME ON Orbit…" card under the last line.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  BEAT, GOLD, BONE, LAV, ORBIT_PINK, INK, MONO, r3, outK, inR, bump, rgba, inSprite, starFrame,
  drawEmber, drawTide, drawPisces, drawMysteryCard, drawYes, drawStamp, makeCam, snapKeys, IDN, dramaFx, sparkleRing,
  drawFreeze, showBug, buildPreviously, buildNextTime, makeTalkCard, drawStreak, drawStreakTail, EMBER, TIDE,
} from '../../sxorbit1/scenes/orbit.js'
import { drawStarChar } from '../../startalk.js'
import { shadesCells, sweatbandCells, quiltCells, drawWagTail, drawBubble, drawAnswer } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const TIDE_BLUE = '#8fdcff', EMBER_RED = '#ff9a7a'

const T = {
  prev: [0, 1.0], reveal: [1.0, BEAT(2)], revealOut: [5.0, 5.35],             // faces land on 1.711
  bubble: [5.6, 5.95], bubbleOut: [BEAT(14) - 0.15, BEAT(14)], real: BEAT(14), // 8.378: POP → the real Ember
  open1: 9.05, l1: 9.2, close1: 12.2, halfHide: [9.9, 10.3],
  cut1: 12.35,
  talk: [12.5, 13.0], eAns: 14.0, tScribble: [14.3, 15.75], tAns: 15.75, flip: [BEAT(28) - 0.2, BEAT(28)],   // flip lands 16.156
  zE: BEAT(30), zT: BEAT(32), zP: BEAT(34), zPend: 20.1,                      // 17.267 · 18.378 · 19.489
  open2: 21.0, l2: BEAT(37), close2: 23.6, talkOut: [23.3, 23.7],               // 21.156
  cut2: 23.75,
  sorted: 23.85, cut3: 27.25,
  lesson: BEAT(49), lessonOut: [32.35, 32.55],                                 // 27.822
  streak: [33.6, 34.75], open3: 34.85, l3: 35.0, zTide: BEAT(64), freeze: BEAT(66),   // 36.156 · 37.267
  next: 37.6,
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Different isn’t | a dealbreaker. | *Curious* is the move.', chip: '+1 OPEN MIND' }

const ET = '♈︎ EMBER', TT = '♋︎ TIDE', BOTH = '♈︎ EMBER + ♋︎ TIDE'
const LINES1 = [{ t: T.l1, speaker: ET, color: EMBER_RED, text: 'HI!! you’re SO cute. is that a *shell?*' }]
const LINES2 = [{ t: T.l2, speaker: BOTH, color: ORBIT_PINK, text: '…I could try *yours.*' }]
const LINES3 = [{ t: T.l3, speaker: ET, color: EMBER_RED, text: '…*Streak?*' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3]
const CPS = 28
export const LINE_TIMES = lineTimes(ALL_LINES, { cps: CPS })

const HEADS = [
  { text: 'The *reveal.*', top: 170, size: 120, accentSize: 190, at: 1.05, late: 1, lateAt: T.reveal[1], accentColor: ORBIT_PINK, out: [5.15, 5.35] },
  { text: 'Tide expected: | *mysterious.*', top: 160, size: 96, accentSize: 150, at: 5.5, late: 1, lateAt: 6.2, accentColor: LAV, out: [8.15, 8.3] },
  { text: 'Tide got: | *golden retriever.*', top: 160, size: 96, accentSize: 132, at: T.real + 0.02, late: 2, lateAt: T.real + 0.35, lateGap: 0.12, accentColor: '#ffb347', out: [12.05, 12.25], fit: true },
  { text: 'First *talk card.*', top: 170, size: 104, accentSize: 156, at: 12.45, late: 2, lateAt: 12.9, accentColor: GOLD, out: [16.9, 17.1] },
  { text: '*Gasp.*', top: 1520, size: 120, accentSize: 210, at: T.zE, accentColor: ORBIT_PINK, out: [20.25, 20.45] },
  { text: 'Plot twist: | *compromise.*', top: 160, size: 100, accentSize: 150, at: 21.1, late: 1, lateAt: 22.0, accentColor: ORBIT_PINK, out: [23.5, 23.68] },
  { text: 'Sunday, | *sorted.*', top: 170, size: 116, accentSize: 180, at: 23.9, late: 1, lateAt: 24.45, accentColor: GOLD, out: [27.0, 27.18] },
  { text: 'Meanwhile… | *in the sky.*', top: 160, size: 100, accentSize: 150, at: 32.7, late: 3, lateAt: 33.4, lateGap: 0.1, accentColor: ORBIT_PINK, out: [35.95, 36.1] },
  { text: 'Who is *she*?!', top: 190, size: 130, accentSize: 210, at: T.zTide, late: 1, lateAt: T.zTide + 0.25, accentColor: ORBIT_PINK, out: [99, 100] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

const E_HOME = { x: 270, y: 1200 }, T_HOME = { x: 810, y: 1200 }, S_E = 280, S_T = 270
const P_AT = { x: 540, y: 1370, s: 104 }
const EC2 = { x: 385, y: 760, w: 250 }, TC2 = { x: 695, y: 760, w: 250 }
const TALK = { x: 540, y: 690, body: 340 }
const ANS_E = { x: 205, y: 1010, w: 260 }, ANS_T = { x: 875, y: 1010, w: 260 }

const CAM = makeCam([
  [0, ...IDN],
  ...snapKeys(T.zE, 18.1, 1.7, 270, 1150, 540, 1150),
  ...snapKeys(T.zT, 19.2, 1.7, 810, 1150, 540, 1150),
  ...snapKeys(T.zP, T.zPend, 2.4, 540, 1350, 540, 1180),
  ...snapKeys(T.zTide, 37.5, 1.55, 810, 1180, 540, 1180, 0.01),
])
const DRAMA = [[T.zE, 18.1, 0.8], [T.zT, 19.2, 0.8], [T.zP, T.zPend, 0.9], [T.zTide, 99, 0.9]]
const SNAPS = [T.zE, T.zT, T.zP, T.zTide]

const E_HOPS = [0.4, T.reveal[1] + 0.05, T.real, T.real + 0.35, T.real + 0.7, T.real + 1.05, ...talkHops(ALL_LINES, ET, { cps: CPS }), T.eAns - 0.1, T.flip[1], T.l2, 24.3, 25.4, 26.5, T.lesson + 0.2]
const T_HOPS = [0.5, T.reveal[1] + 0.1, 4.1, T.tAns, T.flip[1] + 0.05, T.l2 + 0.05, 24.6, 24.95, 25.3, 25.65, 26.0, 26.35, 26.7, T.lesson + 0.25]
const JOG = [24.6, 24.95, 25.3, 25.65, 26.0, 26.35, 26.7]

function emberState(t) {
  const st = { mood: 'happy', look: [1, -1], blink: undefined, squash: 0, rot: 0, wag: 0 }
  if (t < T.reveal[1]) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.real) { st.mood = 'heart'; st.look = [1, -1]; return st }
  if (t < T.cut1) { st.mood = t < T.l1 ? 'sparkle' : 'happy'; st.look = [1, 0]; st.rot = 0.22 * Math.sin((t - T.real) * 14); st.wag = 1; return st }
  if (t < T.eAns) { st.mood = 'sparkle'; st.look = [1, -1]; st.wag = 0.4; return st }
  if (t < T.flip[1]) { st.mood = 'happy'; st.look = [1, 0]; st.wag = 0.6; return st }
  if (t < T.l2) { st.mood = 'wide'; st.look = [1, 0]; st.blink = false; return st }
  if (t < T.sorted) { st.mood = 'sparkle'; st.look = [1, 0]; return st }
  if (t < T.streak[0] + 0.2) { st.mood = 'happy'; st.look = [1, 0]; st.wag = 0.5; return st }
  st.mood = 'wide'; st.look = [1, -1]; st.blink = false
  return st
}
function tideState(t) {
  const st = { mood: 'neutral', look: [-1, -1], blink: undefined, blush: undefined, hide: 0, peek: 0, peekLook: [-1, 0] }
  if (t < T.reveal[1]) { st.mood = 'wide'; st.look = [-1, -1]; return st }
  if (t < T.bubble[0]) { st.mood = 'sparkle'; st.look = [-1, -1]; st.blush = 0.8; return st }
  if (t < T.real) { st.mood = 'happy'; st.look = [0, -1]; st.blush = 1; return st }
  if (t < T.halfHide[0]) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.cut1) { st.mood = 'sparkle'; st.look = [-1, 0]; st.blush = 1; st.hide = 0.55 * ease.outCubic(prog(t, ...T.halfHide)); return st }
  if (t < T.flip[1]) { st.mood = inR(t, ...T.tScribble) ? 'squint' : 'neutral'; st.look = [-1, 1]; return st }
  if (t < T.l2) { st.mood = 'wide'; st.look = [-1, 0]; st.blink = false; return st }
  if (t < T.streak[0] + 0.4) { st.mood = 'happy'; st.look = [-1, 0]; st.blush = 0.8; return st }
  if (t < T.zTide) { st.mood = 'neutral'; st.look = [-1, -1]; return st }
  st.mood = 'wide'; st.look = [-1, 0]; st.blink = false
  return st
}
function pisState(t) {
  const st = { mood: 'sparkle', look: [0, -1], tears: 1, pull: 0 }
  if (t >= T.flip[1] && t < T.zPend) { st.mood = 'wide'; st.look = [0, 0]; st.tears = 3; st.pull = 1 }
  if (t >= T.l2 && t < T.lesson) { st.mood = 'happy'; st.tears = 2 }
  if (t >= T.streak[0]) { st.mood = 'wide'; st.look = [1, -1]; st.tears = 2 }
  return st
}
function streakPos(t) {
  if (t < T.streak[0] || t > T.streak[1] + 0.6) return null
  const p = prog(t, ...T.streak)
  return { x: lerp(1300, -260, p), y: 470 + 120 * Math.sin(p * Math.PI) - p * 60 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 44px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "italic 600 40px 'EB Garamond'", "600 30px 'EB Garamond'", "700 52px 'Space Mono'", "400 21px 'Space Mono'", "700 14px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const talkImg = await loadImg('card-talk-3.png')
  const TALKC = makeTalkCard(document, talkImg, ['Your perfect', 'Sunday?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bug = showBug(root, 2, { at: 0 })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0] })
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.next - 0.05 }),
  ]
  const next = buildNextTime(root, { at: T.next, top: 1460 })
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  void el

  const stroked = (txt, X, Y, size, col, lw = 10) => { x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  const faceOf = (who, t) => (ctx, X, Y, size) => drawStarChar(ctx, X, Y + size * 0.06, size, t, { color: who === 'E' ? EMBER.color : TIDE.color, mood: who === 'E' ? 'happy' : 'sparkle', look: [0, 0], tips: false, bob: 0, seed: who === 'E' ? 3 : 6, blush: 0.9 })

  function revealCards(t) {
    if (t >= T.revealOut[1]) return
    const lift = t < T.prev[1] ? 0 : ease.inQuad(prog(t, ...T.reveal))
    const faceK = t < T.prev[1] ? 0 : clamp(prog(t, T.reveal[1] - 0.05, T.reveal[1] + 0.35))
    const o = 1 - ease.inCubic(prog(t, ...T.revealOut))
    for (const [which, P] of [['E', EC2], ['T', TC2]]) {
      const bob = Math.sin(t * 1.8 + (which === 'E' ? 0 : 1.7)) * 8
      drawMysteryCard(x, P.x, P.y + bob - 200 * (1 - o), P.w, t, { sign: which === 'E' ? 'cancer' : 'aries', rot: which === 'E' ? -0.04 : 0.04, lift: t < T.prev[1] ? 0.5 : Math.max(0.5, lift), glow: 0.4 + bump(t, T.reveal[1], 0.9), alpha: o, face: faceOf(which === 'E' ? 'T' : 'E', t), faceK, seed: which === 'E' ? 0 : 2 })
      if (t < T.prev[1]) drawYes(x, P.x, P.y + 222, 0.78, t, { on: 1 })
    }
    if (t < T.prev[1]) drawStamp(x, 540, 600, 'IT’S MUTUAL', 96, t, -1, { rot: -0.06, col: '#ffd84a' })
    sparkleRing(x, t, EC2.x, EC2.y - 40, T.reveal[1], 12, 190, 0.2, [ORBIT_PINK, GOLD, BONE, LAV], 0.8, 32)
    sparkleRing(x, t, TC2.x, TC2.y - 40, T.reveal[1] + 0.05, 12, 190, 0.6, [ORBIT_PINK, GOLD, BONE, LAV], 0.8, 32)
  }
  function expectation(t) {
    const k = t < T.bubble[0] ? 0 : t < T.bubbleOut[0] ? ease.outBack(prog(t, ...T.bubble), 1.6) : 1 + 0.25 * prog(t, ...T.bubbleOut)
    if (k <= 0 || t >= T.bubbleOut[1]) return
    const a = t < T.bubbleOut[0] ? 1 : 1 - prog(t, ...T.bubbleOut)
    x.save(); x.globalAlpha = a
    const bx = 560, by = 760
    drawBubble(x, bx, by, 560, 420, k, { tx: T_HOME.x - 40, ty: T_HOME.y - 160 })
    if (k > 0.6) {
      // the imagined Ember: shades, a slow smoulder, dramatic underlight, smoke
      const s = 250
      x.save(); x.globalAlpha *= clamp((k - 0.6) / 0.3)
      const g = x.createRadialGradient(bx, by + 40, 10, bx, by + 40, 240); g.addColorStop(0, 'rgba(120,60,200,0.45)'); g.addColorStop(1, 'rgba(120,60,200,0)'); x.fillStyle = g; x.fillRect(bx - 260, by - 220, 520, 440)
      const opts = { color: '#8e3a3a', glyph: null, mood: 'neutral', look: [0, 0], blink: false, seed: 3, glow: 0.3, bob: 0, tips: false }
      drawStarChar(x, bx, by + 20, s, t, opts)
      // shades seated on the sprite
      inSprite(x, starFrame(bx, by + 20, s, t, opts), () => shadesCells(x))
      for (let i = 0; i < 3; i++) { const ph = (t * 0.5 + i / 3) % 1; x.globalAlpha = 0.5 * Math.sin(Math.PI * ph); x.fillStyle = '#e8e0ff'; x.fillRect(bx + 120 + Math.sin(ph * 6 + i) * 20, by - 40 - ph * 160, 14, 14) }
      x.restore()
    }
    x.restore()
  }
  function talkCard(t) {
    if (!TALKC || t < T.talk[0] || t > T.talkOut[1]) return
    const p = prog(t, ...T.talk), e = ease.outCubic(p), o = ease.inCubic(prog(t, ...T.talkOut))
    const cx = lerp(1240, TALK.x, e), cy = lerp(260, TALK.y, e) - Math.sin(p * Math.PI) * 90 + Math.sin(t * 2) * 6 * e - o * 140
    const rot = lerp(1.5, -0.03, e) + 0.02 * Math.sin(t * 1.5) * e
    const w = TALK.body / TALK_BODY, h = w * TALKC.height / TALKC.width
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, 420); gl.addColorStop(0, rgba(GOLD, 0.3 * e * (1 - o))); gl.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = gl; x.fillRect(cx - 420, cy - 420, 840, 840)
    x.save(); x.globalAlpha = 1 - o; x.translate(cx, cy); x.rotate(rot); x.drawImage(TALKC, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(x, t, cx, cy, T.talk[1] - 0.05, 12, 230, 0.4)
  }
  function answers(t) {
    if (t < T.eAns - 0.2 || t > T.talkOut[1]) return
    const o = 1 - ease.inCubic(prog(t, ...T.talkOut))
    const fl = ease.inOutCubic(prog(t, ...T.flip))
    // Ember's slams down instantly
    const eIn = clamp(prog(t, T.eAns - 0.2, T.eAns)), eY = lerp(700, ANS_E.y, ease.inQuad(eIn))
    if (eIn > 0) drawAnswer(x, ANS_E.x, eY, ANS_E.w, t, { flip: fl, text: 'a 10K run.', who: '♈︎ EMBER', col: EMBER.color, alpha: o, rot: -0.05 })
    if (t >= T.eAns) { const k = t - T.eAns; if (k < 0.9) { x.globalAlpha = 1 - k / 0.9; stroked('DONE!', ANS_E.x, ANS_E.y - 110 - k * 60, 44, '#ffd84a', 10); x.globalAlpha = 1 } }
    // Tide's: a long pencil wiggle, then it slides down
    if (inR(t, ...T.tScribble)) {
      const k = t - T.tScribble[0]
      x.save(); x.translate(ANS_T.x + 40 * Math.sin(k * 18), ANS_T.y - 30 + 10 * Math.cos(k * 23)); x.rotate(0.6)
      x.fillStyle = INK; x.fillRect(-10, -60, 20, 110); x.fillStyle = '#ffd84a'; x.fillRect(-7, -56, 14, 80); x.fillStyle = '#ff9ec8'; x.fillRect(-7, -56, 14, 14); x.fillStyle = '#fff0d8'; x.fillRect(-7, 24, 14, 16); x.fillStyle = INK; x.fillRect(-3, 40, 6, 8)
      x.restore()
      stroked('…', ANS_T.x, ANS_T.y - 110, 60, TIDE_BLUE, 10)
    }
    const tIn = clamp(prog(t, T.tAns - 0.3, T.tAns))
    if (tIn > 0) drawAnswer(x, ANS_T.x, lerp(780, ANS_T.y, ease.outCubic(tIn)), ANS_T.w, t, { flip: fl, text: 'a blanket fort.', who: '♋︎ TIDE', col: TIDE.color, alpha: o * tIn, rot: 0.05 })
    sparkleRing(x, t, ANS_E.x, ANS_E.y, T.flip[1], 10, 150, 0.1, [EMBER.color, GOLD, BONE], 0.7, 26)
    sparkleRing(x, t, ANS_T.x, ANS_T.y, T.flip[1], 10, 150, 0.5, [TIDE.color, GOLD, BONE], 0.7, 26)
  }
  function drawCast(t, tf) {
    const eS = emberState(tf), tS = tideState(tf), pS = pisState(tf)
    drawPisces(x, P_AT.x, P_AT.y, P_AT.s, tf, { mood: pS.mood, look: pS.look, tears: pS.tears, pull: pS.pull, hops: [T.flip[1] + 0.05, T.zP + 0.05, T.l2 + 0.1, T.l2 + 0.5] })
    const sorted = tf >= T.sorted && tf < T.lesson + 2
    if (eS.wag > 0) drawWagTail(x, E_HOME.x - 100, E_HOME.y + 70, 7, tf, eS.wag)
    drawEmber(x, E_HOME.x, E_HOME.y, S_E, tf, { mood: eS.mood, look: eS.look, blink: eS.blink, squash: eS.squash, hops: E_HOPS, rot: eS.rot,
      overlay: sorted || tf >= T.lesson + 2 ? F => inSprite(x, F, () => quiltCells(x)) : null })
    const jog = sorted ? JOG : []
    drawTide(x, T_HOME.x, T_HOME.y, S_T, tf, { mood: tS.mood, look: tS.look, blink: tS.blink, blush: tS.blush, hops: [...T_HOPS, ...jog], hide: tS.hide, peek: tS.peek,
      overlay: tf >= T.sorted ? F => inSprite(x, F, () => sweatbandCells(x)) : null })
    if (tf >= T.real && tf < T.cut1) {
      const k = tf - T.real
      x.globalAlpha = clamp(k / 0.15) * (1 - prog(tf, 11.6, 12.0)); stroked('HIIIII!!', E_HOME.x + 20, E_HOME.y - 230 + 8 * Math.sin(tf * 20), 58, '#ffd84a', 12); x.globalAlpha = 1
    }
    // the reveal reactions: Ember melts into hearts, Tide squeaks
    for (let i = 0; i < 5; i++) {
      const k = tf - 3.0 - i * 0.18
      if (k < 0 || k > 1.2) continue
      x.globalAlpha = Math.sin(Math.PI * k / 1.2); stroked('♥', E_HOME.x - 90 + i * 45, E_HOME.y - 170 - k * 160, 46, i % 2 ? ORBIT_PINK : '#ffd3ea', 10); x.globalAlpha = 1
    }
    const ep = tf - 4.1
    if (ep >= 0 && ep < 0.9) { x.globalAlpha = Math.sin(Math.PI * ep / 0.9); stroked('eep.', T_HOME.x + 30, T_HOME.y - 220 - ep * 40, 46, TIDE_BLUE, 10); x.globalAlpha = 1 }
    if (sorted && tf < T.lesson) {
      x.globalAlpha = clamp((tf - 24.5) / 0.3); stroked('cozy.', E_HOME.x, E_HOME.y - 220, 46, GOLD, 10); stroked('1k… ish.', T_HOME.x, T_HOME.y - 230, 44, TIDE_BLUE, 10); x.globalAlpha = 1
    }
  }
  function streak(t) {
    const P = streakPos(t)
    if (!P) return
    const a = 1 - prog(t, T.streak[1], T.streak[1] + 0.6)
    drawStreakTail(x, P.x, P.y, 70, t, { ang: -0.1, len: 6, alpha: a })
    drawStreak(x, P.x, P.y, 70, t, { alpha: a, shades: 1, stretch: 0.25, stretchAng: Math.PI, glint: T.streak[0] + 0.5 })
    // glitter rain left behind
    for (let i = 0; i < 26; i++) {
      const t0 = T.streak[0] + i * 0.045, dt = t - t0
      if (dt < 0 || dt > 2.4) continue
      const sx0 = lerp(1300, -260, prog(t0, ...T.streak))
      x.globalAlpha = (1 - dt / 2.4) * (0.6 + 0.4 * Math.sin(t * 12 + i)); x.fillStyle = ['#ffd84a', '#ffd0ec', '#ffffff'][i % 3]
      x.fillRect(sx0 + Math.sin(i) * 30, 490 + dt * 140 + (i % 5) * 12, 9, 9)
    }
    x.globalAlpha = 1
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const tf = Math.min(t, T.freeze)
      const C = CAM(tf)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, tf, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      withCam(C, () => {
        streak(tf)
        drawCast(t, tf)
        revealCards(tf)
        expectation(tf)
        talkCard(tf)
        answers(tf)
      })
      if (t < T.prev[1]) drawFreeze(x, 1, 0)
      dramaFx(x, tf, SNAPS, DRAMA)
      drawFreeze(x, t, T.freeze)
      bug.update(t)
      prev.update(t)
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      next.update(t)
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates. The default selection keeps 2 of these 4 (indices 1 and 3): 12.35 (→ the talk card), 27.25 (→ the lesson).
export const CUTS = [5.42, T.cut1, T.cut2, T.cut3]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { F3: 174.61, G3: 196.0, A3: 220.0, Bb3: 233.08, C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, C5: 523.25, D3: 146.83 }
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.2, ...FXB }], ['tom', r3(t), low, { gain: 0.32, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
export const CUES = [
  // previously on: a VHS rewind
  ['chip', 0.02, 2400, 0.9, { wave: 'noise', slide: -12, gain: 0.025, decay: 0.8, sustain: 0.6, rev: 0, dly: 0, bus: 'fx' }], ['tick', 0.1, 0.05], ['tick', 0.95, 0.05], ['whoosh', 0.85, 0.3, 0.05],
  // the reveal
  ['riser', 1.0, T.reveal[1], 0.04], ['glitter', 1.1, r3(T.reveal[1] + 0.5)],
  ...sting(T.reveal[1], [N.F3, N.C4, N.F4, N.A4], 1.2, 0.045, 64), ['bell', T.reveal[1], 1760, 0.035, 1.6, 0], ['boom', T.reveal[1], 0.25],
  ...headCues(HEADS[0]),
  // expectation → reality
  ['whoosh', T.bubble[0], 0.4, 0.05], ['pop', r3(T.bubble[0] + 0.2), 659.25, 0.035, 0.2], ...headCues(HEADS[1]),
  ['pop', 4.1, 1318.51, 0.03, 0.3], ...[0, 1, 2, 3, 4].map(i => ['pop', r3(3.0 + i * 0.18), 880 + i * 110, 0.02, -0.3]),
  ['strings', 6.2, 8.1, [N.D4, N.F4, N.A4], { gain: 0.01, attack: 0.3, release: 0.4, rev: 0.6, bus: 'fx' }],
  ['pop', T.real, 196, 0.08, 0], ['pop', r3(T.real + 0.03), 1318.51, 0.05, 0], ['glitter', T.real, r3(T.real + 0.4)], ...headCues(HEADS[2]),
  ...[0, 0.35, 0.7, 1.05].map(d => ['pop', r3(T.real + d + 0.05), 1046.5, 0.025, d % 0.7 ? 0.4 : -0.4]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ET]: 1046.5, [TT]: 740, [BOTH]: 880 } }),
  ['chip', T.halfHide[0], 800, 0.2, { wave: 'tri', slide: -10, gain: 0.03, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  // the talk card
  ['whoosh', r3(T.talk[0] + 0.25), 0.45, 0.05], ['pop', T.talk[1], 784, 0.04, 0], ['bell', r3(T.talk[1] + 0.02), 1318.51, 0.03, 1.2, 0], ['glitter', r3(T.talk[1] - 0.05), r3(T.talk[1] + 0.5)],
  ...headCues(HEADS[3]),
  ['tom', T.eAns, 90, { gain: 0.3, decay: 0.3, rev: 0.2, bus: 'fx' }], ['clap', T.eAns, { gain: 0.2, rev: 0.2, bus: 'fx' }], ['pop', r3(T.eAns + 0.02), 1174.66, 0.035, -0.3],
  ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.tScribble[0] + i * 0.12), 0.018]), ['pop', T.tAns, 880, 0.03, 0.3],
  ['tick', T.flip[0], 0.05], ['whoosh', T.flip[0], 0.3, 0.05], ['pop', T.flip[1], 1318.51, 0.04, 0], ['glitter', T.flip[1], r3(T.flip[1] + 0.4)],
  ...sting(T.zE, [N.F3, N.C4, N.F4], 0.45, 0.042, 80), ...headCues(HEADS[4]),
  ...sting(T.zT, [N.G3, N.Bb3, N.D4, N.G4], 0.45, 0.042, 76),
  ...sting(T.zP, [N.A3, N.C4, N.E4, N.A4], 0.9, 0.05, 62), ['boom', T.zP, 0.25],
  ...headCues(HEADS[5]), ['bell', 22.0, 1760, 0.03, 1.4, 0],
  // sorted
  ...headCues(HEADS[6]), ['glitter', 24.4, 25.0], ...JOG.map(j => ['tick', r3(j + 0.3), 0.025]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'F' }),
  // the comet
  ...headCues(HEADS[7]), ['riser', 33.0, T.streak[0] + 0.3, 0.04], ['whoosh', T.streak[0], 1.1, 0.09], ['glitter', T.streak[0], r3(T.streak[1] + 0.8)],
  ['bell', r3(T.streak[0] + 0.5), 2349.3, 0.03, 1.2, -0.3],
  ...sting(T.zTide, [N.D3, N.A3, N.D4, N.F4], 1.0, 0.05, 60), ['boom', T.zTide, 0.3], ...headCues(HEADS[8]),
  ...scratch(T.freeze), ['boom', T.freeze, 0.3],
  ['whoosh', r3(T.next - 0.05), 0.5, 0.06], ['glitter', T.next, r3(T.next + 0.7)],
  ['strings', T.next, STORY_END, [N.F4, N.A4, N.C5], { gain: 0.012, attack: 0.1, release: 0.8, rev: 0.5, bus: 'fx' }],
  ['brass', r3(T.next + 0.05), [N.Bb3, N.D4, N.F4], 1.0, { gain: 0.045, bright: 1.15, ...FXB }], ['tom', r3(T.next + 0.05), 62, { gain: 0.3, decay: 0.8, rev: 0.4, bus: 'fx' }],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
