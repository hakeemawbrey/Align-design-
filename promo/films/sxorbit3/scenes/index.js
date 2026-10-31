// sxorbit3 — ORBIT, Ep 3: "The Comet Returns." (45 s vertical Align ad, Star Talk Shows · Show 1, music: synthwave, E minor).
// Cast from ../../sxorbit1/scenes/orbit.js: ♈ EMBER, ♋ TIDE (+ shell), ☄ STREAK (Ember's ex), ♓ Pisces with tissues.
// Story 0–40.6, then the shared end card.
//   0.00–1.00  ◀◀ PREVIOUSLY ON Orbit… (Ep 2's last shot: the comet streaking over Ember and Tide).
//   1.0–7.6    "Enter: | *Streak.*" Streak brings her OWN spotlight, her own little wind machine and a gale of glitter;
//              she lands on the drop. The wind blows Pisces' tissue box right out of frame. STREAK: "Ember, *darling.*
//              miss me?"  Tide sees only the sparkle… and the shell swallows her (zoom, DUN). Nobody notices.
//   7.7–13.4   "Ember: | *clear.*"  EMBER: "hi Streak. we're *friends* now."  STREAK: "totally! ciao, *babe!*" — and she
//              streaks off with her fan. Ember turns to introduce Tide…
//  13.6        card cut.
//  13.7–25.4   "Tide: | *gone.*" Just a shell. Rule of three:
//              "Knock *one.*" KNOCK — a tiny door slams shut. "it's not what it *looked like!*"
//              "Knock *two.*" KNOCK KNOCK — the shell scoots away. "she's my ex. we're *just friends.*"
//              "Knock… | *three?*" Ember raises a point… and doesn't knock: it slides a talk card under the door —
//              "What are you | feeling?"  EMBER: "no knocking. just *asking.*"  A heart thumps inside the shell.
//  25.6        card cut.
//  26.16–31.1  ★ LESSON UNLOCKED: "Ask before you *assume.* | The shell can't | hear your feelings."  +1 TALKED IT OUT
//  31.2–37.27  "The *reply…*" The door creaks; the card slides back out and flips: "…we need to talk." Snap zooms: Ember ·
//              the shell · Ember again: "Oh *no*." … FREEZE.
//  37.6–40.6   the pink "NEXT TIME ON Orbit…" card under the last line.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import {
  BEAT, GOLD, BONE, LAV, ORBIT_PINK, INK, MONO, r3, outK, inR, bump, rgba,
  drawEmber, drawTide, drawPisces, drawTissueBox, makeCam, snapKeys, IDN, dramaFx, sparkleRing,
  drawFreeze, showBug, buildPreviously, buildNextTime, makeTalkCard, drawStreak, drawStreakTail, TIDE,
} from '../../sxorbit1/scenes/orbit.js'
import { drawSpotlight, drawWind, drawFan, drawReply, knockText } from './props.js'

export const DURATION = 45
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const TIDE_BLUE = '#8fdcff', EMBER_RED = '#ff9a7a', STREAK_PINK = '#ffb3dc'

const T = {
  prev: [0, 1.0],
  spot: [1.1, 1.6], wind: [2.2, 7.0], fly: [2.4, BEAT(6)], land: BEAT(6), tissue: [4.0, 5.4],   // lands 3.933
  shades: [4.55, 4.85], open1: 4.75, l1: 4.9, gasp: 6.2, hide: [6.35, BEAT(11)], zH: BEAT(11),       // shell 6.711
  l2: 8.0, l3: 10.9, close1: 13.5, exit: [12.35, 13.1],
  cut1: 13.6,
  turn: 13.75, walk: [14.0, 14.8],
  k1: BEAT(26), open2: 15.45, l4: 15.6,                                       // 15.044
  k2: [BEAT(32), r3(BEAT(32) + 0.25)], scoot: [18.45, 18.9], l5: 18.8,       // 18.378
  close2: 21.5,
  raise: [BEAT(38) - 0.3, BEAT(38)], card: [21.85, 22.45], slide: [23.1, 23.9], open3: 22.65, l6: 22.8, close3: 25.45,   // 21.711
  thump: [24.4, 25.5],
  cut2: 25.6,
  lesson: BEAT(46), lessonOut: [30.95, 31.15],                                // 26.156
  creak: [31.6, 32.0], out: [32.0, 32.7], flip: [32.75, 33.2],
  zE: BEAT(60), zS: BEAT(62), zE2: BEAT(64), freeze: BEAT(66),                // 33.933 · 35.044 · 36.156 · 37.267
  open4: 34.05, l7: 34.2,
  next: 37.6,
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Ask before you *assume.* | The shell can’t | hear your feelings.', chip: '+1 TALKED IT OUT' }

const ET = '♈︎ EMBER', ST = '☄ STREAK (the ex)'
const LINES1 = [
  { t: T.l1, speaker: ST, color: STREAK_PINK, text: 'Ember, *darling.* miss me?' },
  { t: T.l2, speaker: ET, color: EMBER_RED, text: 'hi Streak. we’re *friends* now.' },
  { t: T.l3, speaker: ST, color: STREAK_PINK, text: 'totally! ciao, *babe!*' },
]
const LINES2 = [
  { t: T.l4, speaker: ET, color: EMBER_RED, text: 'it’s not what it *looked like!*' },
  { t: T.l5, speaker: ET, color: EMBER_RED, text: 'she’s my ex. *just friends.*' },
]
const LINES3 = [{ t: T.l6, speaker: ET, color: EMBER_RED, text: 'no knocking. just *asking.*' }]
const LINES4 = [{ t: T.l7, speaker: ET, color: EMBER_RED, text: '“we need to *talk.*”' }]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3, ...LINES4]
const CPS = 28
export const LINE_TIMES = lineTimes(ALL_LINES, { cps: CPS })

const HEADS = [
  { text: 'Enter: | *Streak.*', top: 160, size: 112, accentSize: 176, at: 1.15, late: 1, lateAt: T.land, accentColor: STREAK_PINK, out: [7.45, 7.6] },
  { text: 'Ember: | *clear.*', top: 160, size: 112, accentSize: 176, at: 7.75, late: 1, lateAt: T.l2 + 0.5, accentColor: EMBER_RED, out: [13.2, 13.4] },
  { text: 'Tide: | *gone.*', top: 160, size: 112, accentSize: 176, at: T.turn, late: 1, lateAt: 14.3, accentColor: TIDE_BLUE, out: [14.85, 15.0] },
  { text: 'Knock *one.*', top: 180, size: 112, accentSize: 176, at: 15.02, late: 1, lateAt: T.k1 + 0.05, accentColor: GOLD, out: [18.2, 18.35] },
  { text: 'Knock *two.*', top: 180, size: 112, accentSize: 176, at: 18.36, late: 1, lateAt: T.k2[1], accentColor: GOLD, out: [21.5, 21.65] },
  { text: 'Knock… | *three?*', top: 160, size: 112, accentSize: 176, at: 21.68, late: 1, lateAt: 22.1, accentColor: ORBIT_PINK, out: [25.35, 25.5] },
  { text: 'The *reply…*', top: 180, size: 120, accentSize: 190, at: 31.3, late: 1, lateAt: 31.6, accentColor: TIDE_BLUE, out: [36.0, 36.12] },
  { text: 'Oh *no.*', top: 180, size: 150, accentSize: 240, at: T.zE2, late: 1, lateAt: T.zE2 + 0.35, accentColor: ORBIT_PINK, out: [99, 100] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

const E_HOME = { x: 260, y: 1200 }, E_NEAR = { x: 470, y: 1200 }, T_HOME = { x: 810, y: 1200 }, S_E = 280, S_T = 270
const P_AT = { x: 175, y: 1395, s: 110 }
const STREAK_AT = { x: 600, y: 820 }, S_R = 92
const TALK = { x: 540, y: 770, body: 310 }

const CAM = makeCam([
  [0, ...IDN],
  ...snapKeys(T.zH, 7.5, 1.5, 830, 1150, 540, 1220),
  ...snapKeys(T.zE, 34.7, 1.6, 470, 1130, 540, 1180),
  ...snapKeys(T.zS, 35.8, 1.6, 880, 1150, 540, 1200),
  ...snapKeys(T.zE2, 37.6, 1.9, 470, 1140, 540, 1200, 0.01),
])
const DRAMA = [[T.zH, 7.5, 0.9], [T.zE, 34.7, 0.8], [T.zS, 35.8, 0.8], [T.zE2, 99, 1]]
const SNAPS = [T.zH, T.zE, T.zS, T.zE2]

const E_HOPS = [0.4, T.land + 0.1, ...talkHops(ALL_LINES, ET, { cps: CPS }), T.turn, T.k1, T.k2[0], T.k2[1], T.slide[1], T.lesson + 0.2, T.flip[1] + 0.1]
const KNOCKS = [T.k1, T.k2[0], T.k2[1]]

function emberPos(t) {
  if (t < T.walk[0]) return E_HOME
  const p = ease.inOutCubic(prog(t, ...T.walk))
  return { x: lerp(E_HOME.x, E_NEAR.x, p), y: E_HOME.y - Math.sin(Math.PI * p) * 40 }
}
function emberState(t) {
  const st = { mood: 'happy', look: [1, -1], blink: undefined, rot: 0 }
  if (t < T.prev[1]) { st.mood = 'wide'; st.look = [1, -1]; return st }
  if (t < T.land) { st.mood = 'squint'; st.look = [1, -1]; st.rot = -0.18 * clamp(prog(t, ...T.wind) * 4); return st }
  if (t < T.l2) { st.mood = 'wide'; st.look = [1, -1]; st.rot = -0.14 * (1 - prog(t, 6.6, 7.0)); return st }
  if (t < T.turn) { st.mood = inR(t, T.l2, T.l3) ? 'neutral' : 'happy'; st.look = [1, -1]; return st }
  if (t < T.k1) { st.mood = 'wide'; st.look = [1, 0]; st.blink = false; return st }
  if (t < T.raise[0]) { st.mood = 'neutral'; st.look = [1, 0]; st.rot = 0.22 * Math.max(...KNOCKS.map(k => bump(t, k - 0.08, 0.2))); return st }
  if (t < T.slide[1]) { st.mood = 'sparkle'; st.look = [1, 1]; st.rot = t < T.card[0] ? 0.25 * prog(t, ...T.raise) : 0.25 * (1 - prog(t, T.card[0], T.card[0] + 0.3)); return st }
  if (t < T.out[0]) { st.mood = 'sparkle'; st.look = [1, 0]; return st }
  if (t < T.zE) { st.mood = 'happy'; st.look = [1, 1]; return st }
  st.mood = 'wide'; st.look = t < T.zS ? [0, 0] : [1, 0]; st.blink = false
  return st
}
function tideState(t) {
  const st = { mood: 'happy', look: [-1, -1], blink: undefined, blush: undefined, hide: 0, peek: 0, peekLook: [-1, 0], thump: 0, door: 0, shake: 0, dx: 0 }
  if (t < T.prev[1]) { st.mood = 'happy'; return st }
  if (t < T.gasp) { st.mood = t < T.land ? 'squint' : 'wide'; st.look = [-1, -1]; st.blink = false; return st }
  st.hide = t < T.hide[1] ? ease.inCubic(prog(t, ...T.hide)) : 1
  if (t < T.hide[0]) { st.mood = 'wide'; st.look = [-1, -1]; return st }
  st.door = t < T.k1 ? 0 : t < T.creak[0] ? clamp((t - T.k1 - 0.15) / 0.12) : 1 - 0.55 * ease.outCubic(prog(t, ...T.creak))
  st.shake = Math.max(...KNOCKS.map(k => bump(t, k, 0.25)))
  st.dx = 70 * ease.outBack(prog(t, ...T.scoot), 1.6)
  st.thump = t >= T.thump[0] && t < T.lesson ? Math.max(bump(t, T.thump[0], 0.22), bump(t, T.thump[0] + 0.24, 0.22), bump(t, T.thump[0] + 1.11, 0.22), bump(t, T.thump[0] + 1.35, 0.22)) + 0.25 : 0
  st.peek = t >= T.creak[0] && t < T.freeze + 1 ? clamp((t - T.creak[0]) / 0.3) : (inR(t, 13.9, 14.6) ? clamp((t - 13.9) / 0.1) * (1 - clamp((t - 14.5) / 0.1)) : 0)
  st.peekLook = t >= T.creak[0] ? [-1, 0] : [-1, -1]
  return st
}
function streakPos(t) {
  if (t < T.fly[0]) return null
  if (t < T.fly[1]) {
    const p = ease.outCubic(prog(t, ...T.fly)), q = 1 - p, P0 = { x: 1400, y: 120 }, P1 = { x: 1050, y: 900 }, P2 = STREAK_AT
    return { x: q * q * P0.x + 2 * q * p * P1.x + p * p * P2.x, y: q * q * P0.y + 2 * q * p * P1.y + p * p * P2.y, flying: true }
  }
  if (t >= T.exit[0]) {
    const p = ease.inCubic(prog(t, ...T.exit))
    if (p >= 1) return null
    return { x: lerp(STREAK_AT.x, -300, p), y: lerp(STREAK_AT.y, 140, p), leaving: true }
  }
  return { x: STREAK_AT.x, y: STREAK_AT.y + Math.sin(t * 2.2) * 10 }
}
const windK = t => t < T.wind[0] ? 0 : t < T.wind[1] ? clamp(prog(t, T.wind[0], T.wind[0] + 0.4)) * (1 - prog(t, T.wind[1] - 0.6, T.wind[1])) : bump(t, T.exit[0] + 0.1, 0.8) * 0.8

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "italic 600 52px 'EB Garamond'", "700 52px 'Space Mono'", "400 21px 'Space Mono'", "700 18px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const talkImg = await loadImg('card-talk-1.png')
  const TALKC = makeTalkCard(document, talkImg, ['What are you', 'feeling?'])
  const TALK_BODY = 612 / 732

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bug = showBug(root, 3, { at: 0 })
  const prev = buildPreviously(root, { at: T.prev[0], len: T.prev[1] - T.prev[0] })
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
    dialogueBox(root, { ...BOX, lines: LINES4, open: T.open4, close: T.next - 0.05 }),
  ]
  const next = buildNextTime(root, { at: T.next, top: 1460 })
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.7 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const withCam = (C, fn) => { x.save(); x.setTransform(C.z, 0, 0, C.z, C.sx - C.fx * C.z, C.sy - C.fy * C.z); fn(); x.restore() }
  let shellGeo = { x: T_HOME.x, y: T_HOME.y, c: 9 }

  function streak(t) {
    const P = streakPos(t)
    if (!P) return
    const sq = t >= T.land && t < T.land + 0.6 ? 0.26 * Math.exp(-(t - T.land) * 8) * Math.cos((t - T.land) * 22) : 0
    const ang = P.flying ? Math.atan2(120 - 820, 1400 - 600) : P.leaving ? Math.atan2(820 - 140, 600 + 300) : -0.5
    drawStreakTail(x, P.x, P.y, S_R, t, { ang, len: P.flying || P.leaving ? 6 : 3.8, wag: P.flying ? 0 : 0.08 })
    drawStreak(x, P.x, P.y, S_R, t, { shades: 1 - ease.inOutCubic(prog(t, ...T.shades)), mood: inR(t, T.l3 + 0.4, T.l3 + 0.9) ? 'wink' : 'happy', look: [-1, 0], squash: sq, stretch: P.flying || P.leaving ? 0.3 : 0, stretchAng: ang + Math.PI, glint: T.land + 0.3, tilt: inR(t, T.l1, T.l1 + 1.2) ? 0.1 * Math.sin((t - T.l1) * 9) : 0 })
    // her personal wind machine rides along
    if (!P.flying) drawFan(x, P.x + 150, P.y + 130, 6, t, 1)
  }
  function pisces(t) {
    const flown = t >= T.tissue[0]
    const sob = t >= T.tissue[0] + 0.3
    drawPisces(x, P_AT.x, P_AT.y, P_AT.s, t, { mood: sob ? 'wide' : 'sparkle', look: sob ? [-1, -1] : [1, -1], tears: sob ? (t > T.flip[1] ? 3 : 2) : 1, box: !flown, hops: [T.tissue[0] + 0.05, T.tissue[0] + 0.4, T.zS + 0.05] })
    if (flown && t < T.tissue[1]) {
      const p = prog(t, ...T.tissue)
      x.save(); x.translate(lerp(P_AT.x + 55, -160, p), P_AT.y + 40 - Math.sin(p * Math.PI) * 420); x.rotate(-p * 9)
      drawTissueBox(x, 0, 0, 4, t, { pull: 1 }); x.restore()
      for (let i = 0; i < 5; i++) { const q = clamp(p * 1.3 - i * 0.08); x.globalAlpha = 1 - q; x.fillStyle = '#fffaf2'; x.fillRect(lerp(P_AT.x + 60, -100, q) + i * 30, P_AT.y - q * 600 + i * 40, 22, 16) }
      x.globalAlpha = 1
    }
    if (sob && t < T.lesson) { const k = (t * 0.7) % 1; x.globalAlpha = Math.sin(Math.PI * k); x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#c9c2ff'; x.fillText('my tissues…', P_AT.x + 30, P_AT.y - 100 - k * 30); x.globalAlpha = 1 }
  }
  function talkCard(t) {
    if (!TALKC || t < T.card[0] || t > T.slide[1]) return
    const p = prog(t, ...T.card), e = ease.outCubic(p), s = prog(t, ...T.slide), se = ease.inCubic(s)
    const door = { x: shellGeo.x, y: shellGeo.y - 2 * shellGeo.c }
    const cx = lerp(lerp(E_NEAR.x - 80, TALK.x, e), door.x, se), cy = lerp(lerp(1150, TALK.y, e), door.y, se)
    const wBody = TALK.body * lerp(0.4, 1, e) * (1 - 0.88 * se)
    const w = wBody / TALK_BODY, h = w * TALKC.height / TALKC.width
    x.save(); x.translate(cx, cy); x.rotate(lerp(-0.4, -0.03, e) + se * 1.4); x.globalAlpha = 1 - prog(s, 0.85, 1); x.drawImage(TALKC, -w / 2, -h / 2, w, h); x.restore()
    sparkleRing(x, t, TALK.x, TALK.y, T.card[1], 12, 240, 0.4)
  }
  function reply(t) {
    if (t < T.out[0]) return
    const door = { x: shellGeo.x, y: shellGeo.y - 2 * shellGeo.c }
    const p = ease.outCubic(prog(t, ...T.out))
    const cx = lerp(door.x, 640, p), cy = lerp(door.y, 900, p) - Math.sin(Math.PI * p) * 120
    drawReply(x, cx, cy, lerp(60, 240, p), t, { flip: ease.inOutCubic(prog(t, ...T.flip)), rot: lerp(1.2, -0.05, p) })
    sparkleRing(x, t, 640, 900, T.flip[1], 12, 220, 0.2, [ORBIT_PINK, TIDE.color, BONE, GOLD], 0.8, 30)
  }
  function cast(t) {
    const eS = emberState(t), tS = tideState(t), P = emberPos(t)
    const r = drawTide(x, T_HOME.x + tS.dx, T_HOME.y, S_T, t, { mood: tS.mood, look: tS.look, blink: tS.blink, blush: tS.blush, hops: [0.5, T.gasp], hide: tS.hide, peek: tS.peek, peekLook: tS.peekLook, thump: clamp(tS.thump), door: tS.door, shake: tS.shake })
    shellGeo = r.shell
    drawEmber(x, P.x, P.y, S_E, t, { mood: eS.mood, look: eS.look, blink: eS.blink, hops: E_HOPS, rot: eS.rot })
    // KNOCK bursts by the shell
    const kx = T_HOME.x + tS.dx - 40, ky = T_HOME.y - 230
    knockText(x, kx, ky, 'KNOCK', t, T.k1)
    knockText(x, kx - 30, ky - 10, 'KNOCK', t, T.k2[0])
    knockText(x, kx + 40, ky - 80, 'KNOCK', t, T.k2[1])
    knockText(x, T_HOME.x + 110, T_HOME.y - 120, 'slam.', t, T.k1 + 0.15, TIDE_BLUE, 48)
    knockText(x, T_HOME.x + 140, T_HOME.y - 150, 'scoot.', t, T.scoot[0] + 0.05, TIDE_BLUE, 44)
    knockText(x, T_HOME.x + 20, T_HOME.y - 260, 'creak…', t, T.creak[0], TIDE_BLUE, 44)
    knockText(x, E_HOME.x + 20, E_HOME.y - 240, 'sweat.', t, T.zE + 0.25, '#9ad8f0', 44)
    if (inR(t, T.gasp, T.gasp + 0.6)) knockText(x, T_HOME.x + 40, T_HOME.y - 230, 'sparkly…', t, T.gasp, TIDE_BLUE, 44)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const tf = Math.min(t, T.freeze)
      const C = CAM(tf)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, tf, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      withCam(C, () => {
        const sp = tf < T.spot[0] ? 0 : tf < T.exit[1] ? clamp(prog(tf, ...T.spot)) * (1 - prog(tf, T.exit[0], T.exit[1])) : 0
        drawSpotlight(x, STREAK_AT.x, STREAK_AT.y, sp, tf)
        if (tf < T.prev[1]) { const p = tf; drawStreakTail(x, lerp(1100, 200, p), 470, 60, tf, { ang: -0.1, len: 6 }); drawStreak(x, lerp(1100, 200, p), 470, 60, tf, { stretch: 0.25, stretchAng: Math.PI }) }
        streak(tf)
        pisces(tf)
        cast(tf)
        talkCard(tf)
        reply(tf)
        sparkleRing(x, tf, STREAK_AT.x, STREAK_AT.y, T.land, 16, 240, 0.3, [STREAK_PINK, GOLD, BONE, LAV], 0.9, 36)
      })
      drawWind(x, tf, windK(tf))
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

// card-motif candidates. The default selection keeps 2 of these 4 (indices 1 and 3): 13.6 (→ "Tide: gone."), 25.6 (→ the lesson).
export const CUTS = [7.65, T.cut1, 21.66, T.cut2]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { E3: 164.81, G3: 196.0, A3: 220.0, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.0, B4: 493.88, E5: 659.25, C3: 130.81 }
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.2, ...FXB }], ['tom', r3(t), low, { gain: 0.32, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const scratch = t0 => [['tapeStop', t0, 0.42], ['chip', t0, 1600, 0.08, { wave: 'noise', slide: 70, gain: 0.05, decay: 0.05, sustain: 0.8, rev: 0, dly: 0, bus: 'fx' }], ['chip', r3(t0 + 0.09), 5200, 0.14, { wave: 'noise', slide: -60, gain: 0.045, decay: 0.08, sustain: 0.7, rev: 0, dly: 0, bus: 'fx' }]]
const knock = t0 => [['tom', r3(t0), 140, { gain: 0.3, decay: 0.12, rev: 0.15, bus: 'fx' }], ['tick', r3(t0), 0.08]]
export const CUES = [
  ['chip', 0.02, 2400, 0.9, { wave: 'noise', slide: -12, gain: 0.025, decay: 0.8, sustain: 0.6, rev: 0, dly: 0, bus: 'fx' }], ['tick', 0.1, 0.05], ['tick', 0.95, 0.05], ['whoosh', 0.85, 0.3, 0.05],
  // the entrance
  ['chip', T.spot[0], 300, 0.4, { wave: 'tri', slide: 10, gain: 0.03, decay: 0.3, sustain: 0.6, rev: 0.3, dly: 0, bus: 'fx' }], ['tom', T.spot[0], 58, { gain: 0.3, decay: 0.6, rev: 0.4, bus: 'fx' }],
  ...headCues(HEADS[0]),
  ['chip', T.wind[0], 900, 4.4, { wave: 'noise', slide: -4, gain: 0.018, decay: 4.0, sustain: 0.8, rev: 0.2, dly: 0, bus: 'fx' }],
  ['riser', T.fly[0], T.land, 0.05], ['whoosh', r3(T.land - 0.5), 0.7, 0.09], ['glitter', T.fly[0], r3(T.land + 0.6)],
  ...sting(T.land, [N.E3, N.B3, N.E4, N.G4, N.B4], 1.2, 0.05, 60), ['boom', T.land, 0.32], ['bell', r3(T.land + 0.3), 2349.3, 0.03, 1.2, 0.3],
  ['whoosh', T.tissue[0], 0.6, 0.06], ['pop', r3(T.tissue[0] + 0.05), 1318.51, 0.03, -0.5],
  ['chip', T.shades[0], 600, 0.25, { duty: 0.25, slide: 24, gain: 0.022, decay: 0.2, sustain: 0.6, rev: 0.1, dly: 0, bus: 'fx' }],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ST]: 1174.66, [ET]: 1046.5 } }),
  ['pop', T.gasp, 1318.51, 0.03, 0.4], ['chip', r3(T.hide[0]), 900, 0.3, { wave: 'tri', slide: -20, gain: 0.04, decay: 0.25, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ...sting(T.zH, [N.E3, N.G3, N.B3, N.E4], 0.9, 0.05, 62),
  ...headCues(HEADS[1]),
  ['whoosh', T.exit[0], 0.8, 0.09], ['glitter', T.exit[0], r3(T.exit[1] + 0.4)], ['bell', r3(T.exit[0] + 0.2), 1760, 0.02, 1.0, -0.5],
  // the shell
  ...headCues(HEADS[2]), ['pluck', 14.0, 1318.51, 0.02, 0.5, 0.3], ['whoosh', T.walk[0], 0.3, 0.03],
  ...knock(T.k1), ['tom', r3(T.k1 + 0.15), 100, { gain: 0.32, decay: 0.2, rev: 0.2, bus: 'fx' }], ['clap', r3(T.k1 + 0.15), { gain: 0.25, rev: 0.2, bus: 'fx' }], ...headCues(HEADS[3]),
  ...knock(T.k2[0]), ...knock(T.k2[1]), ['chip', T.scoot[0], 300, 0.35, { wave: 'tri', slide: 8, gain: 0.03, decay: 0.3, sustain: 0.5, rev: 0.1, dly: 0, bus: 'fx' }], ...headCues(HEADS[4]),
  ...headCues(HEADS[5]), ['whoosh', r3(T.card[0] + 0.1), 0.4, 0.05], ['bell', T.card[1], 1318.51, 0.03, 1.2, 0], ['glitter', T.card[1], r3(T.card[1] + 0.5)],
  ['chip', T.slide[0], 1200, 0.8, { wave: 'noise', slide: -10, gain: 0.02, decay: 0.7, sustain: 0.6, rev: 0.1, dly: 0, bus: 'fx' }], ['pop', T.slide[1], 523.25, 0.035, 0.3],
  ...[0, 0.24, 1.11, 1.35].map((d, i) => ['tom', r3(T.thump[0] + d), i % 2 ? 58 : 66, { gain: i % 2 ? 0.2 : 0.3, decay: 0.3, rev: 0.25, bus: 'fx' }]),
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Em' }),
  // the reply
  ...headCues(HEADS[6]),
  ['chip', T.creak[0], 220, 0.45, { wave: 'tri', slide: 6, gain: 0.02, decay: 0.4, sustain: 0.6, rev: 0.2, dly: 0, bus: 'fx' }],
  ['whoosh', T.out[0], 0.5, 0.05], ['tick', T.flip[0], 0.05], ['pop', T.flip[1], 1318.51, 0.04, 0], ['glitter', T.flip[1], r3(T.flip[1] + 0.4)],
  ...sting(T.zE, [N.E3, N.B3, N.E4], 0.45, 0.042, 80), ...sting(T.zS, [N.G3, N.B3, N.D4, N.G4], 0.45, 0.042, 76),
  ...sting(T.zE2, [N.C3, N.G3, N.C4, N.E4], 1.0, 0.05, 58), ['boom', T.zE2, 0.3], ...headCues(HEADS[7]),
  ...scratch(T.freeze), ['boom', T.freeze, 0.3],
  ['whoosh', r3(T.next - 0.05), 0.5, 0.06], ['glitter', T.next, r3(T.next + 0.7)],
  ['strings', T.next, STORY_END, [N.E4, N.G4, N.B4, N.E5], { gain: 0.012, attack: 0.1, release: 0.8, rev: 0.5, bus: 'fx' }],
  ['brass', r3(T.next + 0.05), [N.C4, N.E4, N.G4], 1.0, { gain: 0.045, bright: 1.15, ...FXB }], ['tom', r3(T.next + 0.05), 62, { gain: 0.3, decay: 0.8, rev: 0.4, bus: 'fx' }],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void rgba; void INK
