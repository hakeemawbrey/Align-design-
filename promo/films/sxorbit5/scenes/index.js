// sxorbit5 — ORBIT · Ep 5: "The Constellation." (45 s vertical Align ad, Star Talk Shows · ORBIT, music: funk, G).
// Cast from the shared ORBIT kit (promo/films/sxorbit1/scenes/orbit.js, imported directly): ♈ EMBER, ♋ TIDE + her shell,
// ♓ PISCES (sobbing, as always). New: Ember's friends, a constellation of LOUD fire signs (♌ LEO, ♐ SAG, ♈ ALSO ARIES,
// ♌ ANOTHER LEO), and ♍ VIRGO, the one quiet star in the corner. Story 0–40.6, then the shared end card.
//   0.00–1.10  PREVIOUSLY ON ORBIT… "then… meet my friends? the whole constellation?"
//   1.10–4.90  The constellation pops in one star at a time, yelling HI. Tide: straight into the shell (DUN).
//              "The whole | *constellation.*"
//   5.00–13.7  "Loud. Louder. | *Fire signs.*"  Rule of three, each louder, each a snap-zoom on the shell scooting away:
//              LEO "WE'VE HEARD SO MUCH ABOUT YOU!!" → SAG "SKYDIVING? TONIGHT? YOU IN?!" → ALSO ARIES "RACE ME. TO THE MOON. GO!!"
//              The shell has scooted all the way into the corner… next to a quiet Virgo reading a tiny book.
//  13.85       card cut.
//  13.9–21.4   "Meanwhile, | in the *corner…*"  VIRGO: "first time with this group?"  TIDE (peeking): "…is it that obvious?"
//              VIRGO: "I bring a book. want one?"  Tide comes out; two stars, two tiny books. Pisces sobs.
//  21.4–24.2   Ember looks over… and smiles. "Ember makes *room.*"  EMBER: "inside voices, everyone." The friends shrink to
//              whispers ("hi.") and the constellation's gold lines redraw to take in Tide and Virgo.
//  24.30       card cut.  24.49 ★ LESSON UNLOCKED: "A good partner | *makes room* | for you."  +1 FOUND MY PERSON'S PEOPLE
//  28.95–32.1  "Push. Pull. *Align.*"  LEO: "ok ok. quick reading on you two." Two charts (♈ · ♋); PUSH, PULL… ALIGN (stamp).
//  32.3–36.2   A scroll drops in and unrolls: an invitation for Ember to shine in a galaxy *very* far away.
//              EMBER: "they want me to shine there?!"  TIDE: "how *far?*"  FREEZE.
//  37.65       card cut → NEXT TIME ON Orbit… → the plain sky for the end card.
// Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { rgba } from './props.js'
import { drawEmber, drawTide, drawPisces, drawFreeze, showBug, buildPreviously, buildNextTime } from '../../sxorbit1/scenes/orbit.js'

export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', ORBIT_PINK = '#ff7eb6', LAV = '#c9a6ff', CYAN = '#7fe0ff', INK = '#1b1236', ROSE = '#ff6b9a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const TAU = Math.PI * 2
const BEAT = n => +(0.6 + n * 60 / 108).toFixed(3)
const VIR = signStar('virgo')
const FR = [{ ...signStar('leo'), name: '♌︎ LEO' }, { ...signStar('sagittarius'), name: '♐︎ SAG' }, { ...signStar('aries'), name: '♈︎ ALSO ARIES' }, { ...signStar('leo'), name: '♌︎ ANOTHER LEO' }]

// ── the timeline
const T = {
  black: [0, 0.12], prevOut: [0.98, 1.1],
  pops: [BEAT(2), BEAT(2.5), BEAT(3), BEAT(3.5)], hide: [BEAT(4) - 0.18, BEAT(4)], zH: BEAT(4),
  open1: 5.0, l1: 5.2, l2: 7.85, l3: 10.8, z1: BEAT(11), z2: BEAT(16), z3: BEAT(20.5), close1: 13.7,
  cut1: 13.85,
  open2: 13.95, v1: 14.1, t1: 16.6, v2: 18.85, out: [19.6, 20.2], book2: 20.0, look: 20.9, e1: 21.6, shrink: [21.9, 22.4], lines2: [22.6, 23.9], close2: 24.1,
  cut2: 24.3,
  lesson: BEAT(43), lessonOut: [28.65, 28.85],
  cut3: 28.95,
  open3: 29.05, r1: 29.2, push: 29.9, pull: 30.4, align: 30.9, stamp: BEAT(56), readOut: [32.15, 32.45],
  scroll: [32.4, 32.85], unroll: [32.85, 33.4], s1: 33.0, dive: [34.6, 34.85], f1: 35.75, freeze: 36.15, close3: 37.6,
  cut4: 37.65, next: 37.72, nextOut: [39.95, 40.4], fade: [39.9, 40.4],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'A good partner | *makes room* | for you.', chip: '+1 FOUND MY PERSON’S PEOPLE' }

// ── the dialogue
const ET = '♈︎ EMBER', TT = '♋︎ TIDE', VT = '♍︎ VIRGO'
const EC = '#ff9a7a', TC = '#8fdcff', VC = '#ff9cc0', FC = ['#ffc06b', '#d3a6ff', '#ff8f6b', '#ffc06b']
const LINES1 = [
  { t: T.l1, speaker: FR[0].name, color: FC[0], text: 'WE’VE HEARD *SO MUCH* ABOUT YOU!!' },
  { t: T.l2, speaker: FR[1].name, color: FC[1], text: 'SKYDIVING? TONIGHT? *YOU IN?!*' },
  { t: T.l3, speaker: FR[2].name, color: FC[2], text: 'RACE ME. TO THE MOON. *GO!!*' },
]
const LINES2 = [
  { t: T.v1, speaker: VT, color: VC, text: 'first time with this *group?*' },
  { t: T.t1, speaker: TT, color: TC, text: '…is it that *obvious?*' },
  { t: T.v2, speaker: VT, color: VC, text: 'I bring a book. want *one?*' },
  { t: T.e1, speaker: ET, color: EC, text: '*inside voices,* everyone.' },
]
const LINES3 = [
  { t: T.r1, speaker: FR[0].name, color: FC[0], text: 'ok ok. quick *reading* on you two.' },
  { t: T.s1, speaker: ET, color: EC, text: 'they want me to *shine* there?!' },
  { t: T.f1, speaker: TT, color: TC, text: 'how *far?*' },
]
const ALL_LINES = [...LINES1, ...LINES2, ...LINES3]
const CPS = 28

const HEADS = [
  { text: 'The whole | *constellation.*', top: 160, size: 96, accentSize: 150, at: 1.3, gap: 0.08, late: 1, lateAt: 1.75, accentColor: GOLD, out: [4.7, 4.9], fit: true },
  { text: 'Loud. Louder. | *Fire signs.*', top: 150, size: 100, accentSize: 156, at: 5.0, gap: 0.12, late: 2, lateAt: 5.4, lateGap: 0.12, accentColor: '#ff8f5a', out: [13.5, 13.7], fit: true },
  { text: 'Meanwhile, | in the *corner…*', top: 150, size: 100, accentSize: 150, at: 13.92, gap: 0.08, late: 1, lateAt: 14.25, accentColor: VC, out: [21.15, 21.35], fit: true },
  { text: 'Ember makes *room.*', top: 170, size: 104, accentSize: 156, at: 21.45, gap: 0.08, late: 1, lateAt: 21.75, accentColor: ORBIT_PINK, out: [24.0, 24.2], fit: true },
  { text: 'Push. Pull. *Align.*', top: 170, size: 104, accentSize: 160, at: T.push, gap: T.pull - T.push, late: 1, lateAt: T.align, accentColor: GOLD, out: [32.15, 32.35], fit: true },
  { text: 'How *far?*', top: 170, size: 120, accentSize: 190, at: T.freeze + 0.05, late: 1, lateAt: T.freeze + 0.25, accentColor: ORBIT_PINK, out: [37.45, 37.65] },
]
function headTimes(h) {
  const ws = h.text.trim().split(/\s+/).filter(w => w && w !== '|'), nW = ws.length, late = h.late || 0, gap = h.gap ?? 0.07, lateGap = h.lateGap ?? 0.1
  return ws.map((_, n) => { const big = late > 0 && n >= nW - late; return { t: big ? h.lateAt + (n - (nW - late)) * lateGap : h.at + n * gap, big } })
}

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const frz = t => Math.min(t, T.freeze)

// ── positions
const EMB = { x: 300, y: 1070 }, S_EMB = 270
const TIDE_PATH = [{ t: 0, x: 600 }, { t: T.z1, x: 680 }, { t: T.z2, x: 750 }, { t: T.z3, x: 800 }]
const TIDE_Y = 1090, S_TID = 230
const VIR_AT = { x: 935, y: 1250, s: 150 }
const PIS_AT = { x: 110, y: 1330, s: 108 }
const FR_AT = [{ x: 150, y: 640 }, { x: 390, y: 545 }, { x: 650, y: 545 }, { x: 900, y: 640 }]
const FR_S = 160

// ── camera
const EZ = { lin: x => x, out: ease.outCubic, io: ease.inOutCubic }
const IDN = [1, 540, 960, 540, 960]
const ECU = (z, fx, fy, sx = 540, sy = 1040) => [z, fx, fy, sx, sy]
function tideX(t) {
  let x = TIDE_PATH[0].x
  for (const k of TIDE_PATH) if (t >= k.t) x = k.x
  const prevK = [...TIDE_PATH].reverse().find(k => t >= k.t), i = TIDE_PATH.indexOf(prevK)
  if (i > 0) x = lerp(TIDE_PATH[i - 1].x, prevK.x, ease.outBack(prog(t, prevK.t, prevK.t + 0.35)))
  return x
}
const CAM = [
  [0, ...IDN],
  [T.zH, ...IDN, 'lin'], [T.zH + 0.1, ...ECU(1.9, 600, 1160), 'out'], [3.9, ...ECU(1.95, 600, 1160), 'lin'], [4.3, ...IDN, 'io'],
  [T.z1, ...IDN, 'lin'], [T.z1 + 0.1, ...ECU(2.1, 680, 1160), 'out'], [7.1, ...ECU(2.15, 680, 1160), 'lin'], [7.4, ...IDN, 'out'],
  [T.z2, ...IDN, 'lin'], [T.z2 + 0.1, ...ECU(2.3, 750, 1160), 'out'], [10.1, ...ECU(2.35, 750, 1160), 'lin'], [10.4, ...IDN, 'out'],
  [T.z3, ...IDN, 'lin'], [T.z3 + 0.1, ...ECU(2.5, 800, 1160), 'out'], [12.9, ...ECU(2.55, 800, 1160), 'lin'], [13.4, ...IDN, 'io'],
  [T.freeze, ...IDN, 'lin'], [T.freeze + 0.12, ...ECU(1.8, 800, 1100, 540, 1080), 'out'], [37.7, ...ECU(1.9, 800, 1100, 540, 1080), 'lin'],
]
function cam(t) {
  let i = 0
  while (i + 1 < CAM.length && CAM[i + 1][0] <= t) i++
  const a = CAM[i], b = CAM[i + 1]
  if (!b) return { z: a[1], fx: a[2], fy: a[3], sx: a[4], sy: a[5] }
  const e = (EZ[b[6]] || EZ.io)(prog(t, a[0], b[0]))
  return { z: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e), sx: lerp(a[4], b[4], e), sy: lerp(a[5], b[5], e) }
}
const toS = (C, wx, wy, s = 0) => ({ x: C.sx + (wx - C.fx) * C.z, y: C.sy + (wy - C.fy) * C.z, s: s * C.z })
const SNAPS = [T.zH, T.z1, T.z2, T.z3, T.freeze]
const DRAMA = [[T.zH, 4.2, 0.8], [T.z1, 7.3, 0.6], [T.z2, 10.3, 0.7], [T.z3, 13.2, 0.85], [T.freeze, 40.2, 0.9]]
const dramaK = t => DRAMA.reduce((m, [a, b, k]) => Math.max(m, k * clamp((t - a) / 0.1) * (1 - prog(t, b, b + 0.3))), 0)

// ── states
function tideHide(t) {
  if (t < T.hide[0]) return 0
  if (t < T.out[0]) return ease.inOutCubic(prog(t, ...T.hide))
  if (t < T.dive[0]) return 1 - ease.inOutCubic(prog(t, ...T.out))
  return 0
}
function tidePeek(t) {
  if (t < T.v1 - 0.4) return inR(t, T.z1 - 0.3, T.z1 + 0.6) || inR(t, T.z2 - 0.3, T.z2 + 0.6) || inR(t, T.z3 - 0.3, T.z3 + 0.6) ? 0 : 0.8
  return 1
}
function tideState(t) {
  const st = { mood: 'neutral', look: [1, 0], blush: undefined, peekLook: [-1, 0], shake: 0 }
  if (t < T.hide[0]) { st.mood = t < T.pops[0] ? 'happy' : 'wide'; st.look = [-1, -1]; return st }
  if (t < T.out[0]) {
    st.peekLook = t < T.v1 ? [-1, -1] : [1, 0]
    st.shake = [T.zH, T.z1, T.z2, T.z3].some(z => inR(t, z - 0.1, z + 0.45)) ? 1 : 0
    return st
  }
  if (t < T.look) { st.mood = 'happy'; st.look = [1, 1]; st.blush = 0.7; return st }
  if (t < T.lesson) { st.mood = 'sparkle'; st.look = [-1, 0]; st.blush = 0.9; return st }
  if (t < T.cut3) { st.mood = 'happy'; return st }
  if (t < T.scroll[0]) { st.mood = inR(t, T.stamp, T.stamp + 0.6) ? 'heart' : 'sparkle'; st.look = [0, -1]; return st }
  if (t < T.s1) { st.mood = 'wide'; st.look = [-1, -1]; return st }
  st.mood = 'wide'; st.look = [-1, 0]; st.blink = false
  return st
}
function emberState(t) {
  const st = { mood: 'happy', look: [1, 0], blink: undefined, squash: 0 }
  if (t < T.pops[0]) { st.mood = 'happy'; st.look = [1, 0]; return st }
  if (t < T.cut1) { st.mood = 'happy'; st.look = [0, -1]; return st }
  if (t < T.look) { st.mood = 'happy'; st.look = [-1, -1]; return st }
  if (t < T.e1) { st.mood = 'sparkle'; st.look = [1, 1]; return st }
  if (t < T.cut2) { st.mood = 'happy'; st.look = [1, 0]; return st }
  if (t < T.cut3) { st.mood = 'heart'; return st }
  if (t < T.scroll[0]) { st.mood = inR(t, T.stamp, T.stamp + 0.6) ? 'heart' : 'sparkle'; st.look = [0, -1]; return st }
  st.mood = 'wide'; st.look = [1, -1]; st.blink = false
  return st
}
const quietK = t => ease.inOutCubic(prog(t, ...T.shrink)) * (1 - prog(t, T.cut3, T.cut3 + 0.4))   // inside voices: the friends shrink a size

const E_HOPS = [...talkHops(ALL_LINES, ET, { cps: CPS }), T.pops[0], T.stamp + 0.05]
const T_HOPS = [...talkHops(ALL_LINES, TT, { cps: CPS }), T.out[1], T.stamp + 0.1]
const V_HOPS = [...talkHops(ALL_LINES, VT, { cps: CPS }), T.book2]
const FR_HOPS = FR.map(f => [...talkHops(ALL_LINES, f.name, { cps: CPS }), T.stamp + 0.15])

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 46px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 600 150px 'EB Garamond'", "italic 500 58px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const heads = HEADS.map(h => ({ pt: popText(root, h.text, { ...h, wobble: true }), out: h.out }))
  const BOX = { y: 1470, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES1, open: T.open1, close: T.close1 }),
    dialogueBox(root, { ...BOX, lines: LINES2, open: T.open2, close: T.close2 }),
    dialogueBox(root, { ...BOX, lines: LINES3, open: T.open3, close: T.close3 }),
  ]
  const lesson = buildLesson(root, { ...LESSON, accentColor: ORBIT_PINK, dim: 0.62 })
  const prev = buildPreviously(root, { at: 0, len: 1.1 })
  const next = buildNextTime(root, { at: T.next, out: T.nextOut, top: 560 })
  const bug = showBug(root, 5)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const stroked = (txt, X, Y, size, col, lw = 10, font = INTER, weight = 800) => { x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = lw; x.strokeStyle = INK; x.strokeText(txt, X, Y); x.fillStyle = col; x.fillText(txt, X, Y) }
  function sparkleRing(t, cx, cy, t0, n, R0, seed, cols = [GOLD, BONE, PINK, LAV, CYAN], dur = 0.7, size = 28) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) { const a = (i / n) * TAU + seed; drawPixelStar(x, cx + Math.cos(a) * R0 * (0.6 + 0.6 * p), cy + Math.sin(a) * R0 * (0.6 + 0.6 * p), size * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function pop(t, t0, txt, X, Y, size, col, life = 0.9, rot = -0.08) {
    const k = t - t0
    if (k < 0 || k > life) return
    x.save(); x.globalAlpha = 1 - prog(k, life - 0.25, life); x.translate(X, Y - k * 30); x.rotate(rot); const s = easeOutBack(prog(k, 0, 0.18), 3); x.scale(s, s)
    stroked(txt, 0, 0, size, col, Math.max(6, size / 5)); x.restore()
  }

  function dramaFx(t) {
    const k = dramaK(t)
    if (k > 0.01) {
      const g = x.createRadialGradient(540, 1000, 300, 540, 1000, 1180)
      g.addColorStop(0, 'rgba(150,10,74,0)'); g.addColorStop(0.55, `rgba(150,10,74,${0.2 * k})`); g.addColorStop(1, `rgba(56,0,30,${0.75 * k})`)
      x.fillStyle = g; x.fillRect(0, 0, W, H)
    }
    for (const s of SNAPS) {
      const dt = t - s
      if (dt < 0 || dt > 0.34) continue
      const a = 1 - dt / 0.34, r = rng(Math.round(s * 100))
      x.save(); x.globalAlpha = 0.5 * a; x.strokeStyle = '#fff1f6'; x.lineCap = 'round'
      for (let i = 0; i < 44; i++) {
        const ang = r() * TAU, r0 = 300 + r() * 240 + dt * 900, len = 420 + r() * 700
        x.lineWidth = 2 + r() * 6
        x.beginPath(); x.moveTo(540 + Math.cos(ang) * r0, 1040 + Math.sin(ang) * r0); x.lineTo(540 + Math.cos(ang) * (r0 + len), 1040 + Math.sin(ang) * (r0 + len)); x.stroke()
      }
      x.restore()
      if (dt < 0.09) { x.fillStyle = `rgba(255,240,246,${0.22 * (1 - dt / 0.09)})`; x.fillRect(0, 0, W, H) }
    }
  }

  // ═══════════════════════ the constellation ═══════════════════════
  function friendPos(i, t) { return FR_AT[i] }
  function constellation(t, C) {
    // gold lines: the friends (from the pops) … then, after "inside voices", a loop that takes in Ember, Tide and Virgo
    const pts = FR_AT.map(p => toS(C, p.x, p.y))
    x.save(); x.lineWidth = 5 * Math.min(1.5, C.z); x.setLineDash([16, 12]); x.lineDashOffset = -t * 30
    for (let i = 0; i < 3; i++) {
      const p = clamp((t - T.pops[i + 1] - 0.1) / 0.3)
      if (p <= 0) continue
      x.strokeStyle = rgba(GOLD, 0.7); x.beginPath(); x.moveTo(pts[i].x, pts[i].y); x.lineTo(lerp(pts[i].x, pts[i + 1].x, p), lerp(pts[i].y, pts[i + 1].y, p)); x.stroke()
    }
    // making room: Another Leo → Virgo → Tide → Ember → Leo
    const E = toS(C, EMB.x, EMB.y), Tp = toS(C, tideX(t), TIDE_Y), V = toS(C, VIR_AT.x, VIR_AT.y)
    const chain = [pts[3], V, Tp, E, pts[0]]
    for (let i = 0; i < chain.length - 1; i++) {
      const p = clamp((t - T.lines2[0] - i * 0.3) / 0.35)
      if (p <= 0) continue
      x.strokeStyle = rgba(i === 1 ? ORBIT_PINK : GOLD, 0.8); x.beginPath(); x.moveTo(chain[i].x, chain[i].y); x.lineTo(lerp(chain[i].x, chain[i + 1].x, p), lerp(chain[i].y, chain[i + 1].y, p)); x.stroke()
      if (p >= 1) sparkleRing(t, chain[i + 1].x, chain[i + 1].y, T.lines2[0] + i * 0.3 + 0.35, 8, 70, i, [GOLD, BONE, PINK], 0.6, 20)
    }
    x.restore()
  }
  function friends(t, C) {
    const tt = frz(t), q = quietK(tt)
    FR.forEach((f, i) => {
      const k = pop01(tt, T.pops[i], 0.34, 2.4)
      if (k <= 0.01) return
      const p = FR_AT[i], S = toS(C, p.x, p.y, FR_S * (1 - 0.32 * q))
      const speaking = LINES1.findIndex(L => L.speaker === f.name)
      const yell = speaking >= 0 && inR(tt, LINES1[speaking].t, LINES1[speaking].t + 2.2)
      const mood = q > 0.5 ? (inR(tt, T.stamp, T.stamp + 0.8) ? 'heart' : 'happy') : yell ? 'wide' : i % 2 ? 'happy' : 'sparkle'
      const lean = yell ? 0.18 * Math.sin(tt * 18) * 0.3 : 0
      x.save(); x.translate(S.x, S.y); x.rotate(lean)
      drawStarChar(x, 0, 0, S.s, tt, { color: f.color, glyph: S.s >= 120 ? f.glyph : null, mood, look: q > 0.5 ? [0, 1] : [i < 2 ? 1 : -1, 1], hops: FR_HOPS[i], seed: 40 + i, pop: k, glow: 1.3, squash: yell ? 0.06 * Math.sin(tt * 30) : 0 })
      x.restore()
      // the arrival yell, then the whisper
      pop(tt, T.pops[i] + 0.05, ['HIII!!', 'HEYYY!', 'HI HI HI!', 'WELCOME!!'][i], S.x, S.y - 110 * C.z, 44 * C.z, [GOLD, LAV, '#ff8f6b', GOLD][i], 1.1, (i % 2 ? 1 : -1) * 0.12)
      pop(tt, T.shrink[1] + i * 0.18, 'hi.', S.x + 50, S.y - 70, 30, BONE, 1.0, 0)
      pop(tt, T.stamp + 0.15 + i * 0.12, 'yay.', S.x, S.y - 80, 30, GOLD, 0.9, 0)
    })
    // confetti on the arrival
    const dt = tt - T.pops[0]
    if (dt > 0 && dt < 2.4) {
      const r = rng(55)
      for (let i = 0; i < 60; i++) {
        const x0 = r() * W, sp = 380 + r() * 300, d = r() * 0.5, ph = r() * TAU, col = [GOLD, ORBIT_PINK, '#ff8f5a', LAV, CYAN][i % 5]
        const tt2 = dt - d; if (tt2 < 0) continue
        const y = -30 + sp * tt2, xx = x0 + Math.sin(tt2 * 3 + ph) * 40
        x.globalAlpha = clamp((2.4 - dt) / 0.5); x.fillStyle = col; x.fillRect(xx, y, 12, 8 + 6 * Math.abs(Math.sin(tt2 * 6 + ph)))
      }
      x.globalAlpha = 1
    }
  }

  // ═══════════════════════ tiny books ═══════════════════════
  function book(cx, cy, c, col, t, open = 1) {
    x.save(); x.translate(Math.round(cx), Math.round(cy))
    const w = 12 * c, h = 8 * c
    x.fillStyle = INK; x.fillRect(-w / 2 - c, -h / 2 - c, w + 2 * c, h + 2 * c)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#fff8ea'; x.fillRect(-w / 2 + c, -h / 2 + c, w / 2 - 1.5 * c, h - 2 * c); x.fillRect(0.5 * c, -h / 2 + c, w / 2 - 1.5 * c, h - 2 * c)
    x.fillStyle = 'rgba(27,18,54,0.45)'; for (let j = 0; j < 3; j++) { x.fillRect(-w / 2 + 2 * c, -h / 2 + (2 + j * 1.6) * c, 3 * c, 0.6 * c); x.fillRect(1.5 * c, -h / 2 + (2 + j * 1.6) * c, 3 * c, 0.6 * c) }
    x.restore()
  }

  // ═══════════════════════ the cast ═══════════════════════
  function drawVirgo(t, C) {
    const tt = frz(t), S = toS(C, VIR_AT.x, VIR_AT.y, VIR_AT.s)
    const talking = inR(tt, T.v1 - 0.3, T.out[1])
    drawStarChar(x, S.x, S.y, S.s, tt, { color: VIR.color, glyph: VIR.glyph, mood: inR(tt, T.out[1], T.cut2) ? 'happy' : tt >= T.cut2 && tt < T.scroll[0] ? 'sparkle' : 'neutral', look: talking ? [-1, 0] : [0, 1], hops: V_HOPS, seed: 51, blush: tt > T.out[1] ? 0.7 : undefined })
    book(S.x, S.y + S.s * 0.36, 4 * C.z, '#5fbf8f', tt)
  }
  function drawTideAt(t, C) {
    const tt = frz(t), st = tideState(tt), S = toS(C, tideX(tt), TIDE_Y, S_TID)
    drawTide(x, S.x, S.y, S.s, tt, { hide: tideHide(tt), peek: tidePeek(tt), peekLook: st.peekLook, shake: st.shake, mood: st.mood, look: st.look, blush: st.blush, blink: st.blink, hops: T_HOPS })
    if (tt >= T.book2 && tt < T.cut2) { const k = pop01(tt, T.book2, 0.3, 2.4); x.save(); x.globalAlpha = clamp(k); book(S.x, S.y + S.s * 0.38, 4 * C.z * k, '#ff8fb1', tt); x.restore() }
  }
  function drawEmberAt(t, C) {
    const tt = frz(t), st = emberState(tt), S = toS(C, EMB.x, EMB.y, S_EMB)
    const k = pop01(tt, 0.02, 0.3, 1.6)
    drawEmber(x, S.x, S.y, S.s, tt, { mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, hops: E_HOPS, pop: k })
  }
  function drawPiscesAt(t, C) {
    const tt = frz(t), S = toS(C, PIS_AT.x, PIS_AT.y, PIS_AT.s)
    const big = inR(tt, T.out[0], T.cut2) || inR(tt, T.stamp, T.stamp + 1.4)
    drawPisces(x, S.x, S.y, S.s, tt, { tears: big ? 3 : 1, hank: big && Math.floor(tt * 5) % 2 ? 1 : 0, pull: bump(tt, T.out[1], 0.5), look: [1, -1], mood: big ? 'happy' : 'sparkle' })
  }

  // ═══════════════════════ the reading (screen space) ═══════════════════════
  function reading(t) {
    if (t < T.push - 0.4 || t > T.readOut[1]) return
    const k = pop01(t, T.push - 0.4, 0.4, 1.8) * (1 - ease.inCubic(prog(t, ...T.readOut)))
    const A = { x: 270, y: 640 }, B = { x: 810, y: 640 }, R = 118
    x.save(); x.globalAlpha = clamp(k)
    x.fillStyle = 'rgba(10,6,28,0.78)'; x.beginPath(); x.roundRect(70, 420, 940, 470, 40); x.fill()
    x.strokeStyle = rgba(GOLD, 0.6); x.lineWidth = 3; x.stroke()
    for (const [P, s, nm] of [[A, signStar('aries'), 'EMBER'], [B, signStar('cancer'), 'TIDE']]) {
      x.strokeStyle = rgba(s.color, 0.9); x.lineWidth = 6; x.beginPath(); x.arc(P.x, P.y, R, 0, TAU); x.stroke()
      x.strokeStyle = rgba(BONE, 0.25); x.lineWidth = 2
      for (let i = 0; i < 12; i++) { const a = i / 12 * TAU + t * 0.2; x.beginPath(); x.moveTo(P.x + Math.cos(a) * R * 0.72, P.y + Math.sin(a) * R * 0.72); x.lineTo(P.x + Math.cos(a) * R, P.y + Math.sin(a) * R); x.stroke() }
      x.font = `700 90px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = s.color; x.fillText(s.glyph + '︎', P.x, P.y + 4)
      x.font = `700 26px ${MONO}`; x.fillStyle = rgba(BONE, 0.8); x.fillText(nm, P.x, P.y + R + 40)
    }
    const LS = [[T.push, READING.push, 'PUSH', -100], [T.pull, READING.pull, 'PULL', 100], [T.align, READING.align, 'ALIGN', 0]]
    LS.forEach(([t0, col, lab, bend], i) => {
      const p = ease.outCubic(prog(t, t0, t0 + 0.35))
      if (p <= 0) return
      const x0 = A.x + R, x1 = B.x - R, my = A.y + bend
      x.strokeStyle = col; x.lineWidth = i === 2 ? 12 : 6; x.lineCap = 'round'
      x.beginPath(); x.moveTo(x0, A.y)
      const N = 24
      for (let n = 1; n <= N * p; n++) { const u = n / N; x.lineTo(lerp(x0, x1, u), (1 - u) * (1 - u) * A.y + 2 * u * (1 - u) * my + u * u * B.y) }
      x.stroke()
      if (p >= 1 && i < 2) { x.font = `800 ${i === 2 ? 40 : 30}px ${INTER}`; x.textAlign = 'center'; x.fillStyle = col; x.fillText(lab, 540, i === 2 ? my - 32 : bend > 0 ? (A.y + B.y) / 2 + bend / 2 + 40 : (A.y + B.y) / 2 + bend / 2 - 26) }
    })
    x.restore()
    // the stamp
    const sk = t - T.stamp
    if (sk >= 0) {
      const s = lerp(2.2, 1, ease.outCubic(prog(sk, 0, 0.16))) * (1 - ease.inCubic(prog(t, ...T.readOut)))
      x.save(); x.globalAlpha = clamp(sk / 0.06) * k; x.translate(540, 820); x.rotate(-0.12); x.scale(s, s)
      x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.roundRect(-190, -52, 380, 104, 18); x.stroke()
      x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.fillText('ALIGN ✓', 0, 4)
      x.restore()
      sparkleRing(t, 540, 820, T.stamp, 14, 260, 0.3)
    }
  }

  // ═══════════════════════ the scroll ═══════════════════════
  function scroll(t) {
    if (t < T.scroll[0] || t > T.fade[1]) return
    const tt = frz(t)
    const drop = ease.outBack(prog(tt, ...T.scroll)), un = ease.outCubic(prog(tt, ...T.unroll))
    const cx = 540, cy = lerp(-200, 640, drop), w = 640, h = lerp(30, 470, un)
    x.save(); x.globalAlpha = 1 - ease.inQuad(prog(t, ...T.fade))
    x.translate(cx, cy); x.rotate(0.03 * Math.sin(tt * 2))
    // paper
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#fff3d6'); g.addColorStop(1, '#f1d9a6')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    // rollers
    for (const yy of [-h / 2, h / 2]) { x.fillStyle = INK; x.fillRect(-w / 2 - 34, yy - 22, w + 68, 44); x.fillStyle = '#c98a3a'; x.fillRect(-w / 2 - 28, yy - 16, w + 56, 32); x.fillStyle = '#e8b260'; x.fillRect(-w / 2 - 28, yy - 16, w + 56, 8) }
    if (un > 0.7) {
      x.save(); x.globalAlpha *= clamp((un - 0.7) / 0.3); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#5a2a10'
      x.font = `700 26px ${MONO}`; x.letterSpacing = '6px'; x.fillText('AN INVITATION', 4, -h / 2 + 70); x.letterSpacing = '0px'
      x.font = `800 64px ${INTER}`; x.fillStyle = '#c23a2a'; x.fillText('EMBER ♈︎', 0, -h / 2 + 145)
      x.font = `italic 500 50px ${SERIF}`; x.fillStyle = '#4a2410'
      x.fillText('come shine in a galaxy', 0, -h / 2 + 230)
      x.fillText('very, very far away.', 0, -h / 2 + 290)
      // wax seal
      x.fillStyle = '#d6407f'; x.beginPath(); x.arc(0, h / 2 - 70, 40, 0, TAU); x.fill(); x.fillStyle = '#ff8fc0'; x.font = `800 40px ${INTER}`; x.fillText('★', 0, h / 2 - 68)
      x.restore()
    }
    x.restore()
    sparkleRing(t, cx, 640, T.unroll[1], 12, 330, 0.5)
  }

  function previouslyGrade(t) {
    if (t >= T.prevOut[1]) return
    const k = 1 - prog(t, ...T.prevOut)
    x.save(); x.globalAlpha = k; x.globalCompositeOperation = 'color'; x.fillStyle = '#ff6fae'; x.fillRect(0, 0, W, H)
    x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(70,0,40,0.3)'; x.fillRect(0, 0, W, H); x.restore()
    if (t > 1.0) { x.fillStyle = `rgba(255,240,248,${0.6 * bump(t, 1.0, 0.16)})`; x.fillRect(0, 0, W, H) }
  }
  // the recap (0–1.1): the end of Ep 4 — Ember asking, the constellation looming, Tide in the shell
  function recap(t, C) {
    x.save()
    drawEmber(x, 300, 1070, 270, 0.6, { mood: 'sparkle', look: [1, -1], blink: false })
    drawTide(x, 760, 1090, 230, 0.6, { hide: 1, peek: 1, peekLook: [-1, -1] })
    FR.forEach((f, i) => drawStarChar(x, FR_AT[i].x, FR_AT[i].y, 150, 0.6 + i, { color: f.color, mood: 'wide', look: [0, 1], seed: 40 + i, blink: false }))
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      const zs = 1 + (C.z - 1) * 0.12
      drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * zs, dx: (540 - C.fx) * 0.06 * (C.z - 1), dy: (960 - C.fy) * 0.06 * (C.z - 1), moon: { ...SKY_H.moon, alpha: clamp(1.4 - C.z * 0.4) } })
      const outA = 1 - ease.inQuad(prog(t, ...T.fade))
      if (t < 1.1) recap(t, C)
      else if (t < T.fade[1] + 0.02) {
        x.save(); x.globalAlpha = outA
        constellation(frz(t), C)
        friends(t, C)
        drawPiscesAt(t, C)
        drawVirgo(t, C)
        drawEmberAt(t, C)
        drawTideAt(t, C)
        reading(t)
        scroll(t)
        dramaFx(t)
        x.restore()
        x.save(); x.globalAlpha = outA; drawFreeze(x, t, T.freeze); x.restore()
      }
      previouslyGrade(t)
      for (const b of boxes) b.update(t)
      for (const h of heads) h.pt.update(t, outK(t, h.out))
      lesson.update(t)
      prev.update(t)
      next.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card cuts: the loud friends → the corner, making room → the lesson, the freeze → NEXT TIME
export const CUTS = [{ t: T.cut1, keep: true }, T.cut2, T.cut3, T.cut4]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ═══════════════════════════════════════ sound ═══════════════════════════════════════
// pop / pluck / bell are written in the films' D-major palette (the engine moves them into G); brass / chip are absolute (G).
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const N = { G2: 98.0, D3: 146.83, G3: 196.0, A3: 220.0, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392.0, B4: 493.88, D5: 587.33 }
const r3 = v => +v.toFixed(3)
const FXB = { rev: 0.45, dly: 0, bus: 'fx' }
const sting = (t, notes, len = 0.45, gain = 0.04, low = 72) => [['brass', r3(t), notes, len, { gain, bright: 1.25, ...FXB }], ['tom', r3(t), low, { gain: 0.32, decay: 0.7, rev: 0.4, bus: 'fx' }], ['whoosh', r3(t + 0.04), 0.3, 0.06]]
const headCues = h => headTimes(h).flatMap((w, i) => w.big ? [['pop', r3(w.t), 1174.66, 0.05, 0], ['pluck', r3(w.t), 1174.66, 0.04, 0.6, 0]] : [['pop', r3(w.t), NOTE[i % NOTE.length], 0.026, i % 2 ? 0.15 : -0.15]])
const shellShut = t0 => [['chip', r3(t0 - 0.15), 900, 0.2, { wave: 'tri', slide: -20, gain: 0.04, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }], ['pop', r3(t0), 220, 0.07, 0.3], ['tick', r3(t0), 0.06]]
const scoot = t0 => [['whoosh', r3(t0), 0.25, 0.05], ...[0, 1, 2].map(i => ['tick', r3(t0 + 0.05 + i * 0.06), 0.03])]
export const CUES = [
  ['whoosh', 0.05, 0.5, 0.05], ['bell', 0.18, 1760, 0.025, 1.0, 0], ['whoosh', 0.95, 0.3, 0.06], ['pop', 1.08, 880, 0.035, 0],
  ...headCues(HEADS[0]),
  // the constellation arrives
  ...T.pops.flatMap((p, i) => [['pop', p, NOTE[(i * 2) % 7] * 1.5, 0.05, (i - 1.5) * 0.3], ['clap', r3(p + 0.02), { gain: 0.16, pan: (i - 1.5) * 0.3, rev: 0.2, bus: 'fx' }]]),
  ['glitter', T.pops[0], r3(T.pops[0] + 1.6)],
  ...shellShut(T.hide[1]), ...sting(T.zH, [N.G2, N.D3, N.G3, N.B3], 0.8, 0.045, 64),
  // loud, louder, fire signs
  ...headCues(HEADS[1]),
  ...talkCues(ALL_LINES, { cps: CPS, pitch: { [ET]: 1046.5, [TT]: 740, [VT]: 660, [FR[0].name]: 1174.66, [FR[1].name]: 1318.51, [FR[2].name]: 1396.91 } }),
  ...[T.z1, T.z2, T.z3].flatMap((z, i) => [...scoot(z - 0.05), ...sting(z, [[N.G3, N.D4, N.G4], [N.A3, N.E4, N.A3 * 2], [N.B3, N.Fs4, N.B4]][i], 0.4 + i * 0.1, 0.04 + i * 0.004, 78 - i * 6)]),
  // the corner
  ...headCues(HEADS[2]),
  ['pop', T.out[0], 523.25, 0.03, 0.4], ['glitter', T.out[1], r3(T.out[1] + 0.5)], ['bell', T.out[1], 1318.51, 0.03, 1.2, 0.3],
  ['pop', T.book2, 880, 0.04, 0.4], ['tick', r3(T.book2 + 0.05), 0.04],
  // making room
  ...headCues(HEADS[3]),
  ['chip', T.shrink[0], 900, 0.4, { duty: 0.25, slide: -14, gain: 0.025, decay: 0.3, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.shrink[1] + i * 0.18), 1760, 0.012, (i - 1.5) * 0.3]),
  ...[0, 1, 2, 3].map(i => ['bell', r3(T.lines2[0] + i * 0.3 + 0.35), NOTE[2 + i] * 2, 0.02, 0.9, (i - 1.5) * 0.3]), ['glitter', T.lines2[0], T.lines2[1]],
  // lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: 'G' }),
  // the reading
  ...headCues(HEADS[4]),
  ['whoosh', r3(T.push - 0.35), 0.4, 0.05],
  ['chip', T.push, 520, 0.3, { duty: 0.5, slide: 6, gain: 0.03, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ['chip', T.pull, 660, 0.3, { duty: 0.5, slide: 6, gain: 0.03, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ['chip', T.align, 784, 0.4, { duty: 0.5, slide: 8, gain: 0.034, decay: 0.3, sustain: 0.5, rev: 0.2, dly: 0, bus: 'fx' }],
  ['tom', T.stamp, 70, { gain: 0.34, decay: 0.4, rev: 0.3, bus: 'fx' }], ['clap', T.stamp, { gain: 0.25, rev: 0.3, bus: 'fx' }], ['glitter', T.stamp, r3(T.stamp + 0.6)], ['bell', r3(T.stamp + 0.04), 1760, 0.03, 1.4, 0],
  ...[0, 1, 2, 3].map(i => ['pop', r3(T.stamp + 0.15 + i * 0.12), 1318.51, 0.012, (i - 1.5) * 0.3]),
  // the scroll
  ['whoosh', r3(T.scroll[0] + 0.1), 0.4, 0.06], ['pop', T.scroll[1], 330, 0.05, 0], ['chip', T.unroll[0], 300, 0.5, { wave: 'noise', slide: 20, gain: 0.02, decay: 0.4, sustain: 0.5, rev: 0.1, dly: 0, bus: 'fx' }],
  ['brass', T.unroll[1], [N.G3, N.B3, N.D4, N.G4], 0.9, { gain: 0.04, bright: 1.2, ...FXB }], ['bell', T.unroll[1], 2349.3, 0.025, 1.4, 0],
  // the freeze
  ...sting(T.freeze, [N.G2, N.D3, N.G3, N.B3, N.D4, N.G4], 1.4, 0.05, 58), ['boom', T.freeze, 0.34], ['tapeStop', r3(T.freeze + 0.02), 0.3],
  ...headCues(HEADS[5]).filter(c => c[0] !== 'pluck'),
  // NEXT TIME ON
  ['glitter', T.next, r3(T.next + 0.6)], ...[0, 1, 2, 3, 4, 5].map(i => ['pluck', r3(T.next + 0.05 + i * 0.06), NOTE[i], 0.03, 0.6, (i % 2 ? 0.3 : -0.3)]),
  ['brass', r3(T.next + 0.4), [N.G3, N.B3, N.D4, N.G4], 1.2, { gain: 0.04, bright: 1.1, ...FXB }],
  ['whoosh', r3(T.nextOut[0] + 0.05), 0.35, 0.04],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
