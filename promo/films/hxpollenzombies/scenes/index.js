// hxpollenzombies — "Night of the Yellow." (45 s vertical Align ad, Star Talk "Wild Lessons", Houston: a zombie movie;
// music: screwed · C#m). Story 0–40.6, then the shared end card. No show bug.
//   0.0–4.5    "The yellow | is *here.*"  A Houston street in oak-pollen season: the cars are coated yellow, pollen drifts
//              like snow, a horde of sneezing sign stars shambles past the houses. ♑ CAPRICORN (goggles, mask, a tissue-box
//              backpack) peeks over a yellow car's hood. An EMERGENCY BROADCAST ticker crawls. CAP: "stay inside. stay *alive.*"
//   4.6–8.8    "Everyone’s | *sneezing.*"  The drop: AH-CHOO from the whole horde, yellow puffs. CAP: "they were *fine*
//              yesterday."  (♓ Pisces shambles with them, crying, as ever.)
//   8.85–11.9  "Then it got | *Cancer.*"  ♋ CANCER, the date, shuffles in: dusted yellow, eyes streaming. ACHOO.
//              CANCER: "hi. *achoo.* sorry."
//  12.0–15.2   "Run? | Or *stay?*"  Capricorn's point on the car door. CANCER: "go. save *yourself.*"
//  15.3        the one card cut.
//  15.35–18.7  "The survivor | *stays.*"  Capricorn unzips the backpack: a tissue flies over. CAP: "nope. here. *tissue.*"
//  18.8–23.5   "Supplies: | *shared.*"  Goggles for Cancer too. CANCER: "you're not *scared* of me?"  CAP: "you're having a
//              bad day. *I'm here.*"
//  23.6–28.7   "Two | *survivors.*"  They sit on the hood; the horde shambles past and leaves them be; a heart.
//  28.93      ★ LESSON UNLOCKED: "Show up | on their *worst* day."
//  33.5–37.85 "Know what | they *need.*"  A talk card ("What do you need | on a *bad* day?"); both play; both flip:
//              "Someone | to stay." ✓ ✓  CANCER: "noted. for *both* of us."
//  37.95–40.42 "Bless *you.*"  Frame 0's shot, changed: the same hood, the pollen falling, two together; Cancer sneezes and
//              Capricorn already has the tissue out. Everything clears by 40.42; the end card takes over at 40.6.
// Pure f(t); nothing touches `document` at module top level.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, GOLD, BONE, PINK, LAV, MONO, BEAT, R, bitmap, rgba, pop01, outK, popOut, inW, bump, keyed, S_, win,
  drawPixelHeart, drawTissue, makeFx, drawCardBack, drawTalkCard, drawAnswerCard, SND } from './kit.js'

export { BEAT }
export const DURATION = 45
const W = 1080, H = 1920
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
export const KEY = 'C#m'
const POL = '#e6d23a', POL2 = '#c9c02a', WARN = '#ffcf3a'

const CAP = signStar('capricorn'), CAN = signStar('cancer'), PIS = signStar('pisces')
const CAP_T = '#7fe8c4', CAN_T = '#8fd4ff'

export const T = {
  h0Out: [4.3, 4.48], l1: -2.0,
  h1: 4.6, h1Land: BEAT(8), h1Out: [8.62, 8.78], chorus: [BEAT(8), 6.15, 7.3], l2: 4.95,
  h2: 8.85, h2Land: 9.25, h2Out: [11.75, 11.9], canIn: [8.9, 9.9], sneeze1: 9.95, l3: 9.95,
  h3: 12.0, h3Land: 12.4, h3Out: [15.06, 15.2], door: 12.2, l4: 12.7, turn: 13.6, closeA: 15.28,
  cut: 15.3,
  h4: 15.36, h4Land: 15.8, h4Out: [18.6, 18.75], unzip: 15.55, toss: [16.05, 16.55], l5: 15.9,
  h5: 18.85, h5Land: 19.25, h5Out: [23.4, 23.55], l6: 18.8, goggles: [19.6, 20.1], l7: 21.45, laugh: 23.1,
  h6: 23.6, h6Land: 24.0, h6Out: [28.55, 28.7], hood: [23.65, 24.15], heart1: 25.6, closeB: 24.9, sneeze2: 26.6,
  lesson: BEAT(51), lessonOut: [33.25, 33.45],
  h7: 33.5, h7Land: BEAT(60), h7Out: [37.7, 37.85], tie: [33.4, 33.9], talk: [33.5, 33.92], playA: 34.25, playB: 34.42, l9: 34.6, trem: [35.4, BEAT(64)], flip: BEAT(64),
  cardsOut: [37.5, 37.8], closeC: 37.7,
  h8: 37.98, h8Land: BEAT(68), sneeze3: 38.15, offer: 38.0, heart2: 38.9, out: [39.98, 40.42], h8Out: [40.18, 40.42],
}

const SCAP = `${CAP.glyph}︎ CAPRICORN`, SCAN = `${CAN.glyph}︎ CANCER`
const LINES_A = [
  { t: T.l1, speaker: SCAP, color: CAP_T, text: 'stay inside. stay *alive.*' },
  { t: T.l2, speaker: SCAP, color: CAP_T, text: 'they were *fine* yesterday.' },
  { t: T.l3, speaker: SCAN, color: CAN_T, text: 'hi. *achoo.* sorry.' },
  { t: T.l4, speaker: SCAN, color: CAN_T, text: 'go. save *yourself.*' },
]
const LINES_B = [
  { t: T.l5, speaker: SCAP, color: CAP_T, text: 'nope. here. *tissue.*' },
  { t: T.l6, speaker: SCAN, color: CAN_T, text: "you're not *scared* of me?" },
  { t: T.l7, speaker: SCAP, color: CAP_T, text: "you're having a bad day. *I'm here.*" },
]
const LINES_C = [{ t: T.l9, speaker: SCAN, color: CAN_T, text: 'noted. for *both* of us.' }]
const CPS = 28
export const LTA = lineTimes(LINES_A, { cps: CPS }), LTB = lineTimes(LINES_B, { cps: CPS }), LTC = lineTimes(LINES_C, { cps: CPS })
const ALL = [LINES_A, LINES_B, LINES_C]
const HOPS = { cap: ALL.flatMap(L => talkHops(L, SCAP, { cps: CPS })), can: ALL.flatMap(L => talkHops(L, SCAN, { cps: CPS })) }
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Show up | on their *worst* day.', chip: 'STAYED ★', accentColor: GOLD, dim: 0.62 }

// ── where things are
const STREET = 1060
const CAR = { cx: 360, by: 1330, w: 500 }
const CAP_HIDE = [330, 1150, 210], CAP_UP = [330, 1080, 210], CAP_SIDE = [250, 1190, 210], CAP_HOOD = [300, 1110, 200]
const CAN_FROM = [1250, 1190, 210], CAN_P = [800, 1190, 210], CAN_NEAR = [620, 1190, 210], CAN_HOOD = [520, 1110, 200]
const SEED = { cap: 6, can: 9, pis: 23 }
const HORDE = [
  { id: 'aries', y: 980, sz: 81, sp: 34, ph: 0 }, { id: 'taurus', y: 1000, sz: 85, sp: 28, ph: 260 }, { id: 'leo', y: 970, sz: 76, sp: 40, ph: 520 },
  { id: 'scorpio', y: 1010, sz: 87, sp: 30, ph: 780 }, { id: 'pisces', y: 990, sz: 84, sp: 33, ph: 1040 }, { id: 'libra', y: 975, sz: 78, sp: 37, ph: 1300 },
  { id: 'sagittarius', y: 1005, sz: 82, sp: 31, ph: 1560 }, { id: 'aquarius', y: 985, sz: 79, sp: 36, ph: 1820 },
]

const CAP_K = [
  [0, S_('squint', [1, 0])], [T.l2, S_('squint', [1, 0])], [T.chorus[0], S_('wide', [1, 0], { blink: false })], [T.chorus[0] + 0.8, S_('squint', [1, 0])],
  [T.canIn[0], S_('wide', [1, 0], { blink: false })], [T.l3 + 0.6, S_('neutral', [1, 0])], [T.l4, S_('neutral', [1, 0], { blink: 0.3 })],
  [T.h4, S_('happy', [1, 0])], [T.l6, S_('neutral', [1, 0])], [T.l7, S_('happy', [1, 0])], [T.laugh, S_('happy', [1, 0])],
  [T.heart1, S_('heart', [1, 0])], [T.sneeze2, S_('wide', [1, 0], { blink: false })], [T.sneeze2 + 0.5, S_('happy', [1, 0])],
  [T.lessonOut[0], S_('neutral', [1, -1])], [T.flip, S_('wide', [1, 0])], [T.flip + 0.4, S_('happy', [1, 0])],
  [T.h8, S_('happy', [1, 0])], [T.heart2, S_('heart', [1, 0])],
]
const CAN_K = [
  [0, S_('sleepy', [0, 0])], [T.canIn[1], S_('squint', [-1, 0])], [T.sneeze1 - 0.3, S_('squint', [0, -1], { sq: -0.1 })], [T.sneeze1, S_('wide', [0, 0], { sq: 0.2 })],
  [T.sneeze1 + 0.4, S_('sparkle', [-1, 0])], [T.l4, S_('sparkle', [-1, 1])], [T.turn, S_('sparkle', [1, 1])],
  [T.toss[1], S_('wide', [-1, 0], { blink: false })], [T.toss[1] + 0.6, S_('sparkle', [-1, 0])], [T.l6, S_('sparkle', [-1, 0])], [T.l7 + 1.2, S_('heart', [-1, 0])],
  [T.laugh, S_('happy', [-1, 0])], [T.heart1, S_('heart', [-1, 0])],
  [T.sneeze2 - 0.3, S_('squint', [0, -1], { sq: -0.1 })], [T.sneeze2, S_('wide', [0, 0], { sq: 0.2 })], [T.sneeze2 + 0.4, S_('happy', [-1, 0])],
  [T.lessonOut[0], S_('neutral', [-1, -1])], [T.flip, S_('wide', [-1, 0])], [T.flip + 0.4, S_('happy', [-1, 0])],
  [T.sneeze3 - 0.3, S_('squint', [0, -1], { sq: -0.1 })], [T.sneeze3, S_('wide', [0, 0], { sq: 0.2 })], [T.sneeze3 + 0.45, S_('heart', [-1, 0])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "italic 500 190px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 36px 'Space Mono'", "700 28px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const { ono, sparkleRing, tears } = makeFx(x)

  const H0 = popText(root, 'The yellow | is *here.*', { top: 172, size: 116, accentSize: 186, at: -2, late: 1, lateAt: -1, accentColor: POL })
  const H1 = popText(root, 'Everyone’s | *sneezing.*', { top: 172, size: 108, accentSize: 170, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: POL })
  const H2 = popText(root, 'Then it got | *Cancer.*', { top: 172, size: 108, accentSize: 170, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: CAN_T })
  const H3 = popText(root, 'Run? | Or *stay?*', { top: 172, size: 116, accentSize: 180, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK })
  const H4 = popText(root, 'The survivor | *stays.*', { top: 172, size: 104, accentSize: 170, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: CAP_T })
  const H5 = popText(root, 'Supplies: | *shared.*', { top: 172, size: 108, accentSize: 170, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: GOLD })
  const H6 = popText(root, 'Two | *survivors.*', { top: 172, size: 112, accentSize: 176, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'Know what | they *need.*', { top: 168, size: 100, accentSize: 156, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: LAV, fit: true })
  const H8 = popText(root, 'Bless *you.*', { top: 196, size: 130, accentSize: 200, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, gap: 0.12, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const box = (L, open, close) => dialogueBox(root, { lines: L, y: 1478, width: 960, height: 290, open, close, cps: CPS })
  const boxes = [box(LINES_A, -2.3, T.closeA), box(LINES_B, T.l5 - 0.24, T.closeB), box(LINES_C, T.l9 - 0.24, T.closeC)]
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function cam(t) {
    let s = 1.32 + 0.03 * ease.inOutQuad(prog(t, 0, 4.4)), fx = 520, fy = 1130
    const kd = win(t, T.h3, T.h3Out[1], 0.4)
    s += 0.12 * kd; fx = lerp(fx, 480, kd); fy = lerp(fy, 1160, kd)
    const kh = win(t, T.h6, T.lesson, 0.6)
    s += 0.1 * kh; fx = lerp(fx, 420, kh); fy = lerp(fy, 1150, kh)
    const ke = ease.inOutCubic(prog(t, T.h8, T.h8 + 0.8))
    s += 0.06 * ke; fx = lerp(fx, 430, ke); fy = lerp(fy, 1140, ke)
    s += 0.05 * bump(t, T.chorus[0], 0.35) + 0.05 * bump(t, T.sneeze1, 0.3) + 0.04 * bump(t, T.sneeze2, 0.3) + 0.05 * bump(t, T.sneeze3, 0.3)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.chorus[0], 9], [T.chorus[1], 5], [T.chorus[2], 5], [T.sneeze1, 8], [T.sneeze2, 6], [T.sneeze3, 8]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }
  const worldK = t => 1 - ease.inCubic(prog(t, T.out[0] + 0.1, T.out[1]))

  // ── the street
  function drawStreet(t) {
    // houses (bungalows) along the far side
    const HS = [[-40, 230, 200, '#3a2a4a'], [200, 250, 230, '#2e2a50'], [460, 220, 190, '#3c2840'], [690, 240, 220, '#2a3048'], [930, 230, 200, '#3a2a4a']]
    for (const [hx, hw, hh, c] of HS) {
      R(x, hx - 6, STREET - hh - 6, hw + 12, hh + 6, OUT); R(x, hx, STREET - hh, hw, hh, c)
      for (let k = 0; k < 5; k++) R(x, hx - 20 + k * 10, STREET - hh - 70 + k * 14, hw + 40 - k * 20, 16, '#1c1430')
      R(x, hx + hw * 0.18, STREET - hh * 0.62, hw * 0.28, hh * 0.3, '#ffcf6a'); R(x, hx + hw * 0.6, STREET - hh * 0.62, hw * 0.24, hh * 0.3, '#ffcf6a')
      R(x, hx, STREET - hh - 70, hw, 6, POL2)
    }
    // two oaks, shedding the yellow
    for (const ox of [130, 900]) {
      R(x, ox - 26, 760, 52, STREET - 760, '#2a1c22')
      for (const [dx, dy, r] of [[-70, 700, 110], [60, 670, 120], [0, 610, 110], [130, 720, 90]]) for (let j = -r; j <= r; j += 10) { const hw = Math.sqrt(Math.max(0, r * r - j * j)); R(x, ox + dx - hw, dy + j, hw * 2, 10, j < -r * 0.5 ? '#3e5a2a' : '#2a4020') }
      for (let k = 0; k < 6; k++) R(x, ox - 120 + k * 46, 700 + ((k * 37) % 50), 8, 22, POL)
    }
    // the road, the curb, a yellow film everywhere
    const g = x.createLinearGradient(0, STREET, 0, H + 200); g.addColorStop(0, '#4a4440'); g.addColorStop(1, '#1c1820')
    x.fillStyle = g; x.fillRect(-300, STREET, W + 600, H + 400 - STREET)
    R(x, -300, STREET, W + 600, 14, '#8a8470'); R(x, -300, STREET + 14, W + 600, 6, POL2)
    for (let i = 0; i < 90; i++) { const px = (i * 131.7) % (W + 200) - 100, py = STREET + 30 + (i * 47.3) % 820; R(x, px, py, 10 + (i % 3) * 6, 6, rgba(POL, 0.35)) }
    for (let k = 0; k < 6; k++) R(x, k * 220 - 60, 1500, 120, 12, rgba('#efe6d6', 0.25))
  }
  function drawCar(t) {
    const { cx, by, w } = CAR, h = w * 0.36, x0 = cx - w / 2
    R(x, x0 - 6, by - h * 0.55 - 6, w + 12, h * 0.55 + 6, OUT); R(x, x0, by - h * 0.55, w, h * 0.55 - 10, '#a33a4a')
    const c0 = x0 + w * 0.2, c1 = x0 + w * 0.8, ct = by - h - 4
    R(x, c0 - 6, ct - 6, c1 - c0 + 12, h * 0.45 + 12, OUT); R(x, c0, ct, c1 - c0, h * 0.45 + 6, '#a33a4a')
    R(x, c0 + 12, ct + 10, (c1 - c0) / 2 - 18, h * 0.45 - 10, '#3a3a50'); R(x, (c0 + c1) / 2 + 6, ct + 10, (c1 - c0) / 2 - 18, h * 0.45 - 10, '#3a3a50')
    // the pollen coat, with one wiper streak
    R(x, c0 - 6, ct - 10, c1 - c0 + 12, 14, POL); R(x, x0 - 6, by - h * 0.55 - 10, w + 12, 16, POL)
    for (let i = 0; i < 18; i++) R(x, c0 + 14 + (i * 37) % (c1 - c0 - 30), ct + 12 + (i * 23) % (h * 0.4 - 16), 10, 6, rgba(POL, 0.8))
    x.save(); x.strokeStyle = '#3a3a50'; x.lineWidth = 10; x.beginPath(); x.arc((c0 + c1) / 2 - 40, ct + h * 0.45, 80, Math.PI * 1.15, Math.PI * 1.75); x.stroke(); x.restore()
    for (const wx of [x0 + w * 0.2, x0 + w * 0.8]) { R(x, wx - 36, by - 32, 72, 44, OUT); R(x, wx - 24, by - 22, 48, 28, '#4a4660') }
    void t
  }
  // pollen snow (world space, falling)
  const PP = Array.from({ length: 90 }, (_, i) => ({ x: (i * 97.13) % 1240 - 80, y: (i * 211.7) % 1900, s: 4 + (i % 3) * 3, v: 30 + (i % 5) * 14, w: 1 + (i % 4) }))
  function drawPollen(t, k = 1) {
    x.save(); x.globalAlpha *= k
    for (const p of PP) {
      const yy = (p.y + t * p.v) % 1900, xx = p.x + Math.sin(t * 0.8 * p.w + p.y) * 30
      R(x, xx, yy + 100, p.s, p.s, p.s > 7 ? POL : rgba(POL, 0.7))
    }
    x.restore()
  }
  function puff(px, py, t, t0, { r = 120, dir = 1 } = {}) {
    const a = t - t0
    if (a < 0 || a > 1.0) return
    const e = ease.outCubic(a / 1.0)
    x.save(); x.globalAlpha *= 1 - e
    for (let i = 0; i < 14; i++) {
      const ang = (i / 14) * Math.PI - Math.PI / 2 + (dir > 0 ? 0 : Math.PI), d = r * e * (0.5 + (i % 3) * 0.25)
      R(x, px + Math.cos(ang) * d * dir * 0.2 + dir * d * 0.8, py + Math.sin(ang) * d * 0.5, 14 + (i % 3) * 6, 14 + (i % 3) * 6, i % 2 ? POL : '#f4ec9a')
    }
    x.restore()
  }

  // ── the cast
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, color } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = color || (id === 'cap' ? CAP.color : id === 'can' ? CAN.color : PIS.color)
    const g = glyph && sz >= 120 ? (id === 'cap' ? CAP.glyph : id === 'can' ? CAN.glyph : null) : null
    return drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: col, glyph: g, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id] || 3, pop, glow: 0.8, alpha })
  }
  const hopTo = (t, A, B, a, b, hgt = 90) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(A[0], B[0], e), lerp(A[1], B[1], e) - Math.sin(p * Math.PI) * hgt, lerp(A[2], B[2], e)] }
  function placeCap(t) {
    if (t < 1.2) return hopTo(t, CAP_HIDE, CAP_UP, -0.6, 0, 0)
    if (t < T.door) return CAP_UP
    if (t < T.hood[0]) return hopTo(t, CAP_UP, CAP_SIDE, T.door, T.door + 0.45)
    return hopTo(t, CAP_SIDE, CAP_HOOD, ...T.hood, 110)
  }
  function placeCan(t) {
    if (t < T.canIn[0]) return CAN_FROM
    if (t < T.toss[1]) {
      const p = prog(t, ...T.canIn), e = ease.outCubic(p)
      const P = [lerp(CAN_FROM[0], CAN_P[0], e), CAN_P[1] - Math.abs(Math.sin(p * Math.PI * 4)) * 16, CAN_P[2]]
      if (t >= T.turn) P[0] += 40 * ease.inOutCubic(prog(t, T.turn, T.turn + 0.5))
      return P
    }
    if (t < T.hood[0]) return hopTo(t, [CAN_P[0] + 40, CAN_P[1], CAN_P[2]], CAN_NEAR, T.toss[1] + 0.2, T.toss[1] + 0.7)
    return hopTo(t, CAN_NEAR, CAN_HOOD, T.hood[0] + 0.1, T.hood[1] + 0.1, 110)
  }
  function drawGoggles(r, col = '#2a2440') {
    const c = r.size / 36
    x.save(); x.fillStyle = col
    x.fillRect(Math.round(r.x - r.size * 0.3), Math.round(r.y - c * 1), Math.round(r.size * 0.6), Math.round(c * 1.5))
    for (const s of [-1, 1]) { x.strokeStyle = col; x.lineWidth = c * 1.3; x.strokeRect(Math.round(r.x + s * r.size * 0.13 - r.size * 0.085), Math.round(r.y - r.size * 0.02), Math.round(r.size * 0.17), Math.round(r.size * 0.14)); x.fillStyle = 'rgba(190,240,255,0.25)'; x.fillRect(Math.round(r.x + s * r.size * 0.13 - r.size * 0.085), Math.round(r.y - r.size * 0.02), Math.round(r.size * 0.17), Math.round(r.size * 0.14)) }
    x.restore()
  }
  function drawSurvivor(t, k) {
    const P = placeCap(t), st = keyed(t, CAP_K)
    const r = star('cap', P, t, st, { pop: k, hops: [...HOPS.cap, T.heart1, T.flip + 0.35, T.heart2, 39.4] })
    if (!r) return null
    // the tissue-box backpack peeking out on its left
    const c = r.size / 36
    R(x, r.x - r.size * 0.62, r.y - c * 2, c * 10, c * 8, OUT); R(x, r.x - r.size * 0.62 + c, r.y - c, c * 8, c * 6, '#7fc7e6')
    R(x, r.x - r.size * 0.62 + c * 3, r.y - c * 3, c * 4, c * 2.5, '#ffffff')
    drawGoggles(r)
    return r
  }
  function drawDate(t, k) {
    const P = placeCan(t), st = keyed(t, CAN_K)
    if (t < T.canIn[0] - 0.01) return null
    const r = star('can', P, t, st, { pop: k, hops: [...HOPS.can, T.sneeze1, T.heart1, T.sneeze2, T.flip + 0.35, T.sneeze3, T.heart2] })
    if (!r) return null
    // dusted yellow + streaming eyes
    const c = r.size / 36
    for (let i = 0; i < 12; i++) R(x, r.x + (((i * 37) % 21) - 10) * c * 1.4, r.y + (((i * 53) % 19) - 12) * c * 1.2, c * 1.4, c * 1.4, rgba(POL, 0.85))
    const cry = [[T.canIn[0], T.h4 + 1.0], [T.sneeze2, T.sneeze2 + 0.8], [T.sneeze3, T.sneeze3 + 0.6]]
    for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: 0.18, spread: 0.4, life: 0.4 })
    if (t >= T.goggles[1]) drawGoggles(r, '#3a3060')
    else if (inW(t, ...T.goggles)) {
      // the spare goggles fly over from Capricorn
      const cp = placeCap(t), p = ease.inOutCubic(prog(t, ...T.goggles))
      drawGoggles({ x: lerp(cp[0], r.x, p), y: lerp(cp[1], r.y, p) - Math.sin(p * Math.PI) * 120, size: r.size }, '#3a3060')
    }
    // a tissue in hand once it's been tossed over
    if (t >= T.toss[1]) drawTissue(x, r.x - r.size * 0.48, r.y + r.size * 0.2, Math.max(3, c * 0.8), t)
    return r
  }
  function drawHorde(t, k) {
    const out = Math.min(k, 1 - ease.inCubic(prog(t, T.h6 + 2.5, T.h6 + 3.6)))
    if (out <= 0.02) return
    HORDE.forEach((z, i) => {
      // shamble right → left, wrapping
      const xx = ((z.ph - t * z.sp) % 1500 + 1500) % 1500 - 200
      const sw = Math.sin(t * 2.1 + i) * 0.12
      const sneezing = T.chorus.some(c => inW(t, c, c + 0.4)) || inW(t, ((i * 1.37) % 5) + 0.6 + 5 * Math.floor(t / 5), ((i * 1.37) % 5) + 0.9 + 5 * Math.floor(t / 5))
      const st = sneezing ? S_('wide', [-1, 0], { sq: 0.18 }) : S_(i % 2 ? 'sleepy' : 'squint', [-1, 1], { zzz: false })
      x.save(); x.translate(xx, z.y + 50); x.rotate(sw); x.translate(-xx, -(z.y + 50))
      const r = drawStarChar(x, xx, z.y, z.sz, t, { color: signStar(z.id).color, mood: st.mood, look: st.look, squash: st.sq || 0, seed: 30 + i, glow: 0.5, alpha: out, zzz: false, hops: T.chorus.map(c => c + 0.02 * i) })
      x.restore()
      for (let j = 0; j < 6; j++) R(x, r.x + (((j * 31 + i) % 15) - 7) * 4, r.y + (((j * 17 + i) % 11) - 6) * 4, 6, 6, rgba(POL, 0.8 * out))
      if (z.id === 'pisces') { drawTissue(x, r.x - 50, r.y + 20, 3, t); tears(r.x, r.y, r.size, t, 0, T.h6 + 3.6, { gap: 0.12, spread: 0.5, life: 0.4 }) }
      for (const c of T.chorus) puff(r.x - 40, r.y, t, c + 0.02 * i, { r: 90, dir: -1 })
    })
  }

  // ── the emergency broadcast (zombie-movie chrome, no numbers)
  const TICK = '  ⚠ EMERGENCY BROADCAST  ·  THE OAKS HAVE RELEASED THE YELLOW  ·  STAY INDOORS  ·  WASH YOUR CAR LATER  ·  CHECK ON YOUR PEOPLE  ·'
  function drawTicker(t) {
    const k = 1 - ease.inCubic(prog(t, T.closeA - 0.3, T.closeA))
    if (k <= 0.01) return
    const y = 1384
    x.save(); x.globalAlpha = k
    R(x, 0, y, W, 66, 'rgba(10,6,20,0.92)')
    for (let i = -1; i < 30; i++) { x.fillStyle = i % 2 ? WARN : '#1a1030'; x.beginPath(); const xx = i * 40 - ((t * 60) % 80); x.moveTo(xx, y); x.lineTo(xx + 40, y); x.lineTo(xx + 20, y + 8); x.lineTo(xx - 20, y + 8); x.fill() }
    R(x, 0, y + 8, 250, 58, '#c8243a')
    x.fillStyle = '#fff'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('⚠ ALERT', 125, y + 38)
    x.save(); x.beginPath(); x.rect(250, y + 8, W - 250, 58); x.clip()
    x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.fillStyle = WARN
    const tw = x.measureText(TICK).width, off = (t * 190) % tw
    x.fillText(TICK, 260 - off, y + 38); x.fillText(TICK, 260 - off + tw, y + 38)
    x.restore(); x.restore()
  }
  function drawZombieChrome(t) {
    const g = x.createRadialGradient(540, 1000, 380, 540, 1000, 1150); g.addColorStop(0, 'rgba(40,36,0,0)'); g.addColorStop(1, 'rgba(20,16,4,0.55)')
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    x.fillStyle = 'rgba(230,210,58,0.06)'; x.fillRect(0, 0, W, H)
  }

  // ── the tissue toss
  function drawToss(t) {
    if (!inW(t, ...T.toss)) return
    const a = placeCap(t), b = placeCan(t), p = ease.inOutQuad(prog(t, ...T.toss))
    drawTissue(x, lerp(a[0] + 60, b[0] - 60, p), lerp(a[1] - 40, b[1] - 40, p) - Math.sin(p * Math.PI) * 220, 5, t)
  }

  // ── the tie-in
  const TALK_AT = { x: 540, y: 760, w: 400 }, ANS_W = 182
  const ANS = [{ x: 388, y: 1260, from: 'cap', tp: T.playA, rot: -0.06 }, { x: 692, y: 1260, from: 'can', tp: T.playB, rot: 0.06 }]
  function drawTie(t, toScreen) {
    if (t < T.tie[0] || t >= T.cardsOut[1]) return
    const o = ease.inCubic(prog(t, ...T.cardsOut))
    x.fillStyle = rgba('#07041a', 0.55 * ease.outCubic(prog(t, ...T.tie)) * (1 - o)); x.fillRect(0, 0, W, H)
    const tp = easeOutBack(prog(t, ...T.talk), 1.6)
    drawTalkCard(x, TALK_AT.x, TALK_AT.y - o * 800, TALK_AT.w * clamp(tp, 0, 1.2), 'What do you need | on a *bad* day?', { rot: (1 - clamp(tp)) * -0.4, alpha: clamp(tp * 3) * (1 - o) })
    ANS.forEach((C, i) => {
      if (t < C.tp) return
      const S0 = toScreen(C.from === 'cap' ? placeCap(t) : placeCan(t)), p = prog(t, C.tp, C.tp + 0.36), e = ease.outCubic(p)
      const tr = prog(t, ...T.trem), jit = tr > 0 && tr < 1 ? 2 + tr * 6 : 0
      const cx = lerp(S0[0], C.x, e) + jit * Math.sin(t * 61 + i * 2), cy = lerp(S0[1] - 60, C.y, e) - Math.sin(Math.PI * p) * 80 + o * 900
      const rot = lerp(i ? 0.8 : -0.8, C.rot, e)
      const f = prog(t, T.flip, T.flip + 0.22), sx = Math.cos(f * Math.PI)
      if (sx > 0) drawCardBack(x, cx, cy, ANS_W, { rot, sx, alpha: clamp(p * 4) })
      else drawAnswerCard(x, cx, cy, ANS_W, 'Someone | to stay.', { rot, sx: -sx, stampK: prog(t, T.flip + 0.3 + i * 0.1, T.flip + 0.55 + i * 0.1) })
      if (f > 0.5 && f < 1) sparkleRing(t, cx, cy, T.flip + 0.1, 10, 170, 1 + i, 0.7)
    })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t), wk = worldK(t), k = popOut(t, T.out)
        const toScreen = P => [540 + (P[0] - C.fx) * C.s, 1000 + (P[1] - C.fy) * C.s]
        x.save(); x.globalAlpha = wk
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawStreet(t)
        drawHorde(t, k)
        const onHood = t >= T.door + 0.2
        if (!onHood) { drawSurvivor(t, k) }
        drawCar(t)
        if (onHood) drawSurvivor(t, k)
        const rc = drawDate(t, k)
        drawToss(t)
        // sneezes: the puffs and the ACHOOs
        const pc = placeCan(t)
        for (const s of [T.sneeze1, T.sneeze2, T.sneeze3]) puff(pc[0] - 60, pc[1] - 10, t, s, { r: 160, dir: -1 })
        ono('AH-CHOO!', 560, 900, t, T.chorus[0], { size: 72, life: 1.0, rise: 30, color: POL })
        ono('achoo!', 300, 930, t, T.chorus[1], { size: 48, life: 0.8, rise: 20, color: POL, rot: -0.1 })
        ono('ACHOO', 820, 920, t, T.chorus[2], { size: 52, life: 0.8, rise: 20, color: POL, rot: 0.1 })
        ono('ACHOO!', pc[0] - 40, pc[1] - 180, t, T.sneeze1, { size: 60, life: 0.9, rise: 24, color: POL })
        ono('achoo!', pc[0] - 30, pc[1] - 170, t, T.sneeze2, { size: 46, life: 0.8, rise: 20, color: POL })
        ono('ACHOO!', pc[0] - 40, pc[1] - 180, t, T.sneeze3, { size: 60, life: 0.9, rise: 24, color: POL })
        ono('*zip*', placeCap(t)[0] - 120, placeCap(t)[1] - 120, t, T.unzip, { size: 40, life: 0.6, rise: 14 })
        ono('*click*', placeCan(t)[0], placeCan(t)[1] - 160, t, T.goggles[1], { size: 38, life: 0.6, rise: 14 })
        ono('*shuffle*', 900, 900, t, 2.2, { size: 34, life: 1.0, rise: 10, ticks: false, color: 'rgba(239,230,214,0.8)' })
        if (t >= T.heart1 && t < T.lessonOut[0]) {
          const hk = pop01(t, T.heart1, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.lesson, T.lesson + 0.3)))
          if (hk > 0.02) { x.save(); x.translate((CAP_HOOD[0] + CAN_HOOD[0]) / 2, CAP_HOOD[1] - 170 - 6 * Math.sin(t * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 9); x.restore() }
        }
        if (t >= T.heart2) {
          const hk = pop01(t, T.heart2, 0.34, 2.4) * popOut(t, T.out)
          if (hk > 0.02) { x.save(); x.translate((CAP_HOOD[0] + CAN_HOOD[0]) / 2, CAP_HOOD[1] - 170 - 8 * Math.sin((t - T.heart2) * 3)); x.scale(hk, hk); drawPixelHeart(x, 0, 0, 10); x.restore() }
        }
        // Capricorn's tissue held out at the end (ready before the sneeze)
        if (t >= T.offer) {
          const cp = placeCap(t), ok = pop01(t, T.offer, 0.3, 2.2) * popOut(t, T.out)
          if (ok > 0.02) { x.save(); x.translate(cp[0] + 120, cp[1] - 10); x.scale(ok, ok); drawTissue(x, 0, 0, 6, t); x.restore() }
        }
        drawPollen(t, 1)
        x.restore()
        drawZombieChrome(t)
        drawTicker(t)
        if (t >= T.laugh && t < T.laugh + 0.7) sparkleRing(t, 540, 1080, T.laugh, 12, 320, 0.6)
        drawTie(t, toScreen)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
        void rc
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// the one card transition: "Run? Or stay?" → "The survivor stays."
export const CUTS = [T.cut]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const { N, FX } = SND
const achoo = (t, g = 0.05, f = 600) => [['whoosh', +(t - 0.35).toFixed(3), 0.3, g * 0.5], ['chip', +(t - 0.3).toFixed(3), f, 0.28, { ...FX, wave: 'tri', slide: 7, gain: g * 0.5, decay: 0.2, sustain: 0.6 }], ['chip', +t.toFixed(3), f * 1.3, 0.25, { ...FX, wave: 'noise', slide: -12, gain: g, decay: 0.15, sustain: 0.3 }], ['clap', +t.toFixed(3), { ...FX, gain: g * 1.6 }]]
const groan = (t, f = 140) => [['chip', +t.toFixed(3), f, 0.9, { ...FX, wave: 'tri', slide: -3, vib: 0.03, gain: 0.02, decay: 0.5, sustain: 0.6 }]]
const PITCH = { [SCAP]: 760, [SCAN]: 1080 }
const CUES_ = [
  ['busFx', 'sfx', { gain: 25 }],
  ...groan(0.4), ...groan(2.2, 120), ...achoo(1.4, 0.025, 520),
  // 2 · everyone's sneezing
  ...SND.head(T.h1, 1, T.h1Land, 2), ...T.chorus.flatMap((c, i) => [...achoo(c, i ? 0.035 : 0.06, 560 + i * 60), ...achoo(c + 0.12, 0.025, 700)]), ['boom', T.chorus[0], 0.05],
  ...SND.sob(T.chorus[1] + 0.3, N.E6),
  // 3 · then it got cancer
  ...SND.head(T.h2, 2, T.h2Land, 3), ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.canIn[0] + 0.15 + i * 0.25).toFixed(3), 0.04]), ...achoo(T.sneeze1, 0.06, 680),
  // 4 · run or stay
  ...SND.head(T.h3, 2, T.h3Land, 1), ['tick', T.door, 0.06], ['swell', T.h3, T.cut, { bus: 'sfx', gain: 0.03, f0: 300, f1: 1200 }], ['whoosh', T.turn, 0.3, 0.03],
  // 5 · the survivor stays
  ...SND.head(T.h4, 2, T.h4Land, 0), ['chip', T.unzip, 300, 0.3, { ...FX, wave: 'noise', slide: 10, gain: 0.03, decay: 0.2, sustain: 0.4 }],
  ['whoosh', T.toss[0], 0.5, 0.04], ['pop', T.toss[1], N.A5, 0.04, 0.2], ['bell', T.toss[1] + 0.02, N.E6, 0.03, 1.2, 0],
  // 6 · supplies shared
  ...SND.head(T.h5, 2, T.h5Land, 2), ['whoosh', T.goggles[0], 0.4, 0.04], ['tick', T.goggles[1], 0.06], ['pop', T.laugh, N.D6, 0.04, 0], ['glitter', T.laugh, T.laugh + 0.6],
  // 7 · two survivors
  ...SND.head(T.h6, 1, T.h6Land, 4), ['whoosh', T.hood[0], 0.4, 0.04], ...SND.thud(T.hood[1], 0.1, 140),
  ['pop', T.heart1, N.A5, 0.04, 0], ['bell', T.heart1 + 0.02, N.E6, 0.03, 1.2, 0], ...achoo(T.sneeze2, 0.04, 640), ...SND.sob(T.heart1 + 0.4, N.D6),
  // 8 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 9 · talk cards
  ...SND.head(T.h7, 2, T.h7Land, 2),
  ['whoosh', T.talk[0], 0.4, 0.05], ['bell', T.talk[1], N.E6, 0.03, 1.2, 0],
  ['whoosh', T.playA, 0.25, 0.04], ['tick', T.playA + 0.36, 0.06], ['whoosh', T.playB, 0.25, 0.04], ['tick', T.playB + 0.36, 0.06],
  ['tick', T.flip, 0.08], ['bell', T.flip + 0.1, N.A5, 0.04, 1.6, -0.2], ['bell', T.flip + 0.1, N.E6, 0.03, 1.6, 0.2], ['glitter', T.flip, T.flip + 0.6],
  ['pop', T.flip + 0.3, N.D6, 0.04, -0.3], ['pop', T.flip + 0.4, N.E6, 0.04, 0.3], ['whoosh', T.cardsOut[0], 0.3, 0.035],
  // 10 · bless you
  ...SND.head(T.h8, 1, T.h8Land, 0), ['pop', T.offer + 0.05, N.A5, 0.03, -0.2], ...achoo(T.sneeze3, 0.06, 680),
  ['pop', T.heart2, N.A5, 0.04, 0], ['bell', T.heart2 + 0.02, N.E6, 0.03, 1.2, 0],
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES_A, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_B, { cps: CPS, pitch: PITCH }), ...talkCues(LINES_C, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
export const CUES = CUES_.filter(c => typeof c[1] !== 'number' || c[1] >= 0)
