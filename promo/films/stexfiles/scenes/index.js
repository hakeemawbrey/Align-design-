// stexfiles — "The Ex Files." (45 s vertical Align ad, Star Talk season 3 #24, music: screwed · Ebm, noir).
// Story 0–40.6, then the shared end card. Brief: promo/films/STARTALK4.md §24.
//   0.0–4.9    "1:12 AM. | The case of *the ex.*"  A noir office: blinds, a desk lamp, a red LED clock. ♏ SCORPIO in a fedora
//              and trench coat, eye bags, stares at a phone (a sunset). "the ex posted a sunset." / "I've been staring for
//              3 hours." ♓ PISCES sobs in the back (it's a really nice sunset).
//   4.95–9.1   "The *evidence.*"  (drop) The camera pans to the corkboard: SUBJECT: THE NEW ONE. Red string snaps to three
//              cards, one per beat: LIKES: pilates · OWNS: a ring light · MUTUAL: some guy named Dave (double-take, push-in).
//   9.25–14.6  "400 *screenshots.*"  ♍ VIRGO hops in with coffee and a fat file (thud). "boss. we've got 400 screenshots."
//              SCORPIO: "…only 400?" Virgo sweats.
//  14.75      card cut.
//  14.85–20.4 ENHANCE ×3: a CRT drops from the ceiling with the ex's sunset. "Zoom. *Enhance.*" → a blob. "*Enhance.*" →
//              a bigger, blockier blob. "*ENHANCE.*" → the tape stops… "It's a *pigeon.*" (in perfect HD; it blinks; "coo.")
//              Scorpio and Virgo slowly look at each other.
//  20.45–26.6 "One more *file.*"  (breakdown) VIRGO: "boss. I opened one more file." The folder flips: CASE: YOU (stamp).
//              Three polaroids: skipped dinner · missed a friend's birthday · up at 1 AM. again. Scorpio's giant eye in the
//              magnifier… the glass slowly lowers. SCORPIO: "…that's me." Pisces bawls.
//  26.7       card cut.
//  26.8–31.0  "*Morning,* | detective."  (lift) THE STARS pull the blinds: morning floods in, the clock reads 7:02 AM,
//              everyone squints. "stop studying them. start living you."
//  31.16      ★ LESSON UNLOCKED: "Closure isn't on | their profile. | It's in *you.*" (+1 MOVING ON)
//  35.45–38.7 "Tonight's *deck.*"  The drawer opens, the case file flies in, SLAM. Tonight's deck deals in.
//              THE STARS: "new cases every night. better ones."
//  38.8–40.5  "Case *closed.*"  Scorpio tips the fedora (wink), CLOSED is stamped on the drawer, Pisces honks into a tissue.
// One canvas (sky + camera-moved office), DOM type + dialogue boxes + the shared lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { OUT, RED, starFrame, drawFedora, drawBelt, drawMagnifier, drawWall, drawWindow, drawStripes, WIN, drawCorkboard,
  drawPin, drawString, drawIndexCard, drawSubject, drawSubjectTag, drawDesk, DESK, drawLamp, lampLight, drawClock, drawMug, drawFile,
  drawPhone, photo, BLOB, drawPigeon, drawPlate, drawCake, drawCardBack, drawTear, drawSweat, drawTissue } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', MINT = '#7dffb0'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)            // 108 bpm grid (the screwed score plays it half-time)
export const KEY = 'Ebm'

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.15, h0Land: 0.95, h0Out: [4.72, 4.9], l1: 0.9, l2: 3.45, sob1: [2.2, 3.7], close1: 6.1,
  pan: [4.95, 5.7], h1: 5.0, h1Land: 5.3, cards: [BEAT(9), BEAT(11), BEAT(13)], take: [7.95, 8.4], gasp: 8.1, h1Out: [9.0, 9.15],
  vIn: [8.9, 9.45], h2: 9.25, h2Land: 9.55, l3: 9.6, thud: 9.95, mugDown: 10.25, l4: 12.65, sweat: 13.15, close2: 14.55, h2Out: [14.45, 14.6],
  cut1: 14.75,
  mon: [14.85, 15.25], e: [15.3, 16.5, 17.7], hush: [17.95, 18.55], pig: 18.6, h4Land: 18.9, coo: [19.1, 19.75], look: [19.35, 20.1],
  sob2: [19.5, 20.3], monOut: [20.2, 20.5], h4Out: [20.25, 20.4],
  brk: BEAT(36), fold: [20.45, 20.85], h5: 20.5, h5Land: 20.8, l5: 20.6, flip: [21.6, 22.0], stamp: 22.05, photos: [22.6, 23.15, 23.7],
  magUp: [22.2, 22.55], lower: [24.0, 25.4], l6: 24.6, sob3: [23.9, 26.4], close3: 26.55, foldOut: [26.3, 26.6], h5Out: [26.4, 26.55],
  cut2: 26.7,
  starsIn: [26.75, 27.2], h6: 26.85, h6Land: 27.2, pull: [BEAT(48), BEAT(48) + 0.6], l7: 27.5, squint: [27.45, 28.4], close4: 30.6, h6Out: [30.8, 30.95],
  lesson: BEAT(55), lessonOut: [35.2, 35.4],
  h7: 35.45, h7Land: 35.75, drawer: [35.45, 35.8], fly: [35.8, 36.25], shut: [36.25, 36.4], deal: [36.6, 36.85, 37.1], l8: 35.7, close5: 38.7, h7Out: [38.55, 38.7],
  h8: 38.8, h8Land: 39.05, tip: [38.95, 39.55], closed: 39.3, honk: 39.65, out: [40.05, 40.5], h8Out: [40.3, 40.5],
}

const SCO = signStar('scorpio'), VIR = signStar('virgo'), PIS = signStar('pisces')
const NAME = { sco: `${SCO.glyph}︎ SCORPIO`, vir: `${VIR.glyph}︎ VIRGO`, stars: 'THE STARS' }
const TAG = { sco: '#ff7a95', vir: '#ff8ab6', stars: GOLD }
const L = (t, id, text) => ({ t, speaker: NAME[id], color: TAG[id], text })
export const BOXES = [
  { lines: [L(T.l1, 'sco', 'the ex posted a *sunset.*'), L(T.l2, 'sco', 'I’ve been staring for 3 *hours.*')], close: T.close1 },
  { lines: [L(T.l3, 'vir', 'boss. we’ve got 400 *screenshots.*'), L(T.l4, 'sco', '…only *400?*')], close: T.close2 },
  { lines: [L(T.l5, 'vir', 'boss. I opened one more *file.*'), L(T.l6, 'sco', '…that’s *me.*')], close: T.close3 },
  { lines: [L(T.l7, 'stars', 'stop studying them. start living *you.*')], close: T.close4 },
  { lines: [L(T.l8, 'stars', 'new cases every night. *better ones.*')], close: T.close5 },
]
const CPS = 28
export const ALL_LINES = BOXES.flatMap(b => b.lines)
export const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Closure isn’t on | their profile. | It’s in *you.*', chip: '+1 MOVING ON' }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }
const arcTo = (t, [a, b], p0, p1, h) => { const p = prog(t, a, b), e = ease.inOutCubic(p); return [lerp(p0[0], p1[0], e), lerp(p0[1], p1[1], e) - Math.sin(p * Math.PI) * h, lerp(p0[2], p1[2], e)] }

// ── the stage (world coords; the camera maps (fx, fy) to screen (540, 1000) at scale s)
const SCO_AT = [540, 1075, 290]
const VIR_AT = [835, 1092, 210]
const PIS_AT = [930, 848, 118]
const STARS_AT = [905, 610, 150]
const FILE_AT = [745, 1196], MUG_AT = [880, 1198], CLOCK_AT = [290, 1150]
const SUBJ = [300, 600], SUBJ_PIN = [300, 508]
const CARDS = [
  { at: [468, 548], w: 168, h: 92, rot: 0.05, lines: ['LIKES:', 'pilates'] },
  { at: [160, 812], w: 188, h: 92, rot: -0.06, lines: ['OWNS:', 'a ring light'] },
  { at: [432, 824], w: 200, h: 118, rot: 0.04, lines: ['MUTUAL:', 'some guy', 'named Dave'] },
]
const MON = { x: 120, y: 452, w: 840, h: 490, ix: 140, iy: 476, iw: 800, ih: 440 }
const FOLD = { x: 120, y: 452, w: 840, h: 450 }
const DEAL = [[300, 770, -0.12], [540, 756, 0], [780, 770, 0.12]]
const SEED = { sco: 7, vir: 11, pis: 5, stars: 9 }

// camera keys: [t, s, fx, fy]
const CAM = [
  [0, 1.28, 540, 1060], [4.6, 1.14, 540, 1040], [T.pan[0], 1.14, 540, 1040], [T.pan[1], 1.42, 310, 690], [T.take[0], 1.42, 310, 690],
  [T.take[1], 1.58, 380, 760], [T.vIn[0], 1.58, 380, 760], [T.vIn[1] + 0.1, 1, 540, 1000], [T.l4 - 0.05, 1, 540, 1000], [T.l4 + 0.35, 1.15, 560, 1060],
  [T.cut1, 1.15, 560, 1060], [T.cut1 + 0.01, 1, 540, 990], [T.e[0], 1, 540, 990], [T.e[2] + 0.4, 1.08, 540, 975], [T.monOut[0], 1.08, 540, 975],
  [T.fold[0], 1, 540, 975], [T.lower[0], 1, 540, 975], [T.lower[1], 1.1, 540, 1000], [T.cut2, 1.1, 540, 1000], [T.cut2 + 0.01, 1, 540, 1000],
  [T.h8, 1, 540, 1000], [T.h8 + 0.6, 1.1, 540, 1035], [T.out[1], 1.12, 540, 1035],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}

const HOPS = {}
for (const id of ['sco', 'vir', 'stars']) HOPS[id] = talkHops(ALL_LINES, NAME[id], { cps: CPS })
HOPS.sco.push(...T.e, T.take[0] + 0.05, T.deal[1], T.tip[0])
HOPS.vir.push(T.vIn[1], T.flip[0], T.mugDown + 0.1)
HOPS.pis = [T.gasp, T.honk, T.pig + 0.6]

// the zoom: 0 … 3 (3 = the pigeon)
const ZW = [1, 0.2, 0.045]
const ZC = [10, 20, 40]
const zoomK = t => T.e.reduce((s, e, i) => s + ease.inOutCubic(prog(t, i === 2 ? T.pig - 0.06 : e + 0.08, i === 2 ? T.pig : e + 0.42)), 0)

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 88px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "700 19px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const HT = (text, o) => popText(root, text, { top: 190, size: 104, accentSize: 140, wobble: true, ...o })
  const H0 = HT('1:12 AM. | The case of *the ex.*', { size: 92, accentSize: 128, at: T.h0, late: 2, lateAt: T.h0Land, lateGap: 0.14, gap: 0.08, accentColor: TAG.sco })
  const H1 = HT('The *evidence.*', { size: 120, accentSize: 168, at: T.h1, late: 1, lateAt: T.h1Land, accentColor: RED })
  const H2 = HT('400 *screenshots.*', { size: 112, accentSize: 150, at: T.h2, late: 1, lateAt: T.h2Land, accentColor: TAG.vir })
  const E1 = HT('Zoom. *Enhance.*', { size: 104, accentSize: 140, at: T.e[0] - 0.2, late: 1, lateAt: T.e[0], accentColor: MINT })
  const E2 = HT('*Enhance.*', { size: 120, accentSize: 176, at: T.e[1], late: 1, lateAt: T.e[1], accentColor: MINT })
  const E3 = HT('*ENHANCE.*', { size: 110, accentSize: 158, fit: true, at: T.e[2], late: 1, lateAt: T.e[2], accentColor: RED })
  const H4 = HT('It’s a *pigeon.*', { size: 116, accentSize: 164, at: T.pig, late: 1, lateAt: T.h4Land, accentColor: '#b9bdd0' })
  const H5 = HT('One more *file.*', { size: 116, accentSize: 164, at: T.h5, late: 1, lateAt: T.h5Land, accentColor: '#e2b765' })
  const H6 = HT('*Morning,* | detective.', { size: 100, accentSize: 150, at: T.h6, late: 0, accentColor: '#ffc77a' })
  const H7 = HT('Tonight’s *deck.*', { size: 116, accentSize: 164, at: T.h7, late: 1, lateAt: T.h7Land, accentColor: LAV })
  const H8 = HT('Case *closed.*', { size: 120, accentSize: 168, at: T.h8, late: 1, lateAt: T.h8Land, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [E1, [T.e[1] - 0.12, T.e[1]]], [E2, [T.e[2] - 0.12, T.e[2]]], [E3, [T.pig - 0.15, T.pig]],
    [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const boxes = BOXES.map(b => dialogueBox(root, { lines: b.lines, y: 1480, width: 960, height: 300, open: b.lines[0].t - 0.22, close: b.close, cps: CPS }))
  const lesson = buildLesson(root, { ...LESSON, dim: 0.6 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const shakeAt = t => {
    let a = 0
    for (const [t0, amp] of [[T.thud, 10], [T.pig, 6], [T.stamp, 12], [T.shut[1], 12], [T.closed, 10], ...T.cards.map(c => [c, 4])]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
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
  function tears(eyes, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 30)
    ;[eyes.L, eyes.R].forEach(([ex, ey], si) => {
      const side = si ? 1 : -1
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (90 + ((k * 37) % 5) * 20) * spread, vy = -(130 + ((k * 53) % 4) * 30)
        drawTear(x, ex + vx * a, ey + 6 + vy * a + 800 * a * a, px)
      }
    })
  }
  const morningK = t => ease.inOutQuad(prog(t, T.pull[0] + 0.1, T.pull[1] + 0.4))

  // ── characters
  function scoMood(t) {
    const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0 })
    const TIRED = { blink: 0.45 }
    if (t < T.pan[0]) return st('neutral', [-1, 1], TIRED)
    if (t < T.cards[2]) return st('squint', [-1, -1])
    if (t < T.take[0]) return st('neutral', [1, 0], TIRED)                                  // looks away…
    if (t < T.vIn[0]) return st('wide', [-1, -1], { sq: -0.08 * nodK(t, T.take[0], 0.4) })   // …double-take
    if (t < T.l4) return st('neutral', [1, 0], TIRED)
    if (t < T.cut1) return st('squint', [1, 0])
    if (t < T.pig) return st('wide', [0, -1], { blink: false })
    if (t < T.look[0]) return st('wide', [0, -1], { blink: false })
    if (t < T.fold[0]) return st('neutral', [1, 0], { blink: 0.55 })
    if (t < T.magUp[0]) return st('neutral', [0, -1], TIRED)
    if (t < T.lower[0]) return st('wide', [0, -1], { blink: false })
    if (t < T.cut2) return st('neutral', [0, 1], { blink: 0.4, sq: 0.07 * ease.inOutQuad(prog(t, ...T.lower)) })
    if (t < T.squint[0]) return st('neutral', [1, -1], TIRED)
    if (t < T.squint[1]) return st('squint', [1, -1])
    if (t < T.lesson) return st('happy', [0, 0])
    if (t < T.h7) return st('sparkle', [0, 0])
    if (t < T.deal[0]) return st('happy', [0, 0])
    if (t < T.h8) return st('sparkle', [-1, -1])
    return st(t < T.tip[0] + 0.15 ? 'happy' : 'wink', [0, 0])
  }
  function virMood(t) {
    const st = (mood, look, o = {}) => ({ mood, look, blink: o.blink, sq: o.sq || 0 })
    if (t < T.l4) return st('neutral', [-1, 0], { blink: 0.3 })
    if (t < T.cut1) return st(t < T.sweat ? 'neutral' : 'wide', [-1, 0], { blink: t < T.sweat ? 0.3 : false, sq: -0.06 * nodK(t, T.sweat, 0.4) })
    if (t < T.look[0]) return st('squint', [-1, -1])
    if (t < T.fold[0]) return st('neutral', [-1, 0], { blink: 0.55 })
    if (t < T.cut2) return st('neutral', [-1, 0], { blink: 0.3 })
    if (t < T.squint[1]) return st(t < T.squint[0] ? 'neutral' : 'squint', [-1, -1])
    if (t < T.lesson) return st('happy', [0, 0])
    if (t < T.h7) return st('sparkle', [0, 0])
    return st('happy', [-1, 0])
  }
  function pisMood(t) {
    if (inW(t, T.gasp, T.gasp + 0.8)) return { mood: 'wide', look: [-1, -1], blink: false }
    if (inW(t, ...T.sob1) || inW(t, ...T.sob2) || inW(t, ...T.sob3)) return { mood: 'neutral', look: [0, 0], blink: 1 }
    if (inW(t, T.pull[1], T.lesson)) return { mood: 'happy', look: [0, 0] }
    if (inW(t, T.lesson, T.lessonOut[1])) return { mood: 'sparkle', look: [0, 0] }
    if (inW(t, T.honk - 0.2, T.honk + 0.6)) return { mood: 'squint', look: [0, 0], sq: 0.12 * nodK(t, T.honk, 0.4) }
    return { mood: 'sparkle', look: [-1, 0] }
  }

  function drawPisces(t, a) {
    const m = pisMood(t)
    const [px0, py0, sz] = PIS_AT
    const opts = { color: PIS.color, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq || 0, hops: HOPS.pis, seed: SEED.pis, glow: 0.7, pop: a }
    drawStarChar(x, px0, py0, sz, t, opts)
    const f = starFrame(px0, py0, sz, t, opts)
    for (const [s0, s1, g] of [[T.sob1[0], T.sob1[1], 0.12], [T.sob2[0], T.sob2[1], 0.11], [T.sob3[0], T.sob3[1], 0.07], [T.lesson + 0.8, T.lessonOut[0], 0.16]]) {
      if (inW(t, s0, s1 + 0.7)) tears(f, sz, t, s0, s1, { gap: g, spread: 0.7 })
    }
    // the tissue, up for the sobs and the honk
    const tUp = [T.sob1, T.sob3, [T.honk - 0.3, T.honk + 0.7]].some(([a0, b0]) => inW(t, a0, b0 + 0.3))
    if (tUp) drawTissue(x, px0 - sz * 0.45, py0 + sz * 0.1, 5, t)
    if (t >= T.honk && t < T.honk + 0.5) {
      const k = pop01(t, T.honk, 0.2, 3), o = 1 - prog(t, T.honk + 0.3, T.honk + 0.5)
      x.save(); x.translate(px0 - 60, py0 - 90); x.rotate(-0.2); x.scale(k, k); x.globalAlpha = o
      x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'
      x.lineWidth = 9; x.strokeStyle = OUT; x.strokeText('HONK', 0, 0); x.fillStyle = '#b7b1ff'; x.fillText('HONK', 0, 0)
      x.restore()
    }
  }

  function scoOpts(t) {
    const m = scoMood(t)
    return { color: SCO.color, glyph: SCO.glyph, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq, hops: HOPS.sco, seed: SEED.sco, glow: 0.8, pop: popOut(t, T.out) }
  }
  function drawScorpio(t) {
    const [sx, sy, sz] = SCO_AT
    const o = scoOpts(t)
    if (o.pop <= 0) return null
    const f = starFrame(sx, sy, sz, t, o)
    drawStarChar(x, sx, sy, sz, t, o)
    drawBelt(x, f)
    // eye bags until the morning
    if (t < T.pull[1]) {
      x.save(); x.globalAlpha *= 1 - prog(t, T.pull[0], T.pull[1])
      for (const e of [f.L, f.R]) { x.fillStyle = '#6a3b7a'; x.fillRect(Math.round(e[0] - 2 * f.cell), Math.round(e[1] + 3.2 * f.cell), 4 * f.cell, f.cell); x.fillRect(Math.round(e[0] - 1 * f.cell), Math.round(e[1] + 4.2 * f.cell), 2 * f.cell, f.cell) }
      x.restore()
    }
    // the fedora (tipped at the end)
    const tip = nodK(t, T.tip[0], T.tip[1] - T.tip[0])
    drawFedora(x, f, { lift: tip * 40, tilt: -0.1 - tip * 0.35 })
    return f
  }
  function drawScoHeld(t, f) {
    if (!f) return
    const [sx, sy, sz] = SCO_AT
    // the phone (the hook): held up on the left point, then dropped behind the desk on the pan
    if (t < T.pan[1]) {
      const d = ease.inCubic(prog(t, T.pan[0], T.pan[1]))
      drawPhone(x, sx - sz * 0.43, sy + sz * 0.08 + d * 260, 5, { rot: 0.18, glow: 1 - d })
    }
    // the magnifier: resting on the right point; up to the eye for CASE: YOU; then slowly lowered
    const rest = [sx + sz * 0.5, sy + sz * 0.02]
    let p = rest, eye = null, r = 46
    if (t >= T.magUp[0] && t < T.lower[1] + 0.4) {
      const up = ease.outBack(prog(t, ...T.magUp)), dn = ease.inOutQuad(prog(t, ...T.lower))
      const at = [f.R[0], f.R[1]], below = [f.R[0] + 40, 1330]
      p = [lerp(lerp(rest[0], at[0], up), below[0], dn), lerp(lerp(rest[1], at[1], up), below[1], dn)]
      r = lerp(46, 64, up * (1 - dn))
      if (up > 0.5 && dn < 0.6) eye = { lx: 0, ly: dn > 0.1 ? 1 : -0.4, lid: dn > 0.15 ? 0.35 : 0, lidColor: '#c0566b' }
    } else if (t >= T.lower[1] + 0.4 && t < T.lesson) p = [rest[0] + 40, 1330]
    drawMagnifier(x, p[0], p[1], r, { ang: 0.85, eye, t })
  }

  function drawVirgo(t) {
    if (t < T.vIn[0]) return
    const p = t < T.vIn[1] ? arcTo(t, T.vIn, [1220, 820, 210], VIR_AT, 180) : VIR_AT
    const m = virMood(t)
    const o = { color: VIR.color, glyph: VIR.glyph, mood: m.mood, look: m.look, blink: m.blink, squash: m.sq, hops: HOPS.vir, seed: SEED.vir, glow: 0.8, pop: popOut(t, [T.out[0] + 0.05, T.out[1]]) }
    drawStarChar(x, p[0], p[1], p[2], t, o)
    // carrying the file + the coffee in
    if (t < T.thud) drawFile(x, p[0] - p[2] * 0.42, p[1] + p[2] * 0.2, 5, { label: 'THE EX' })
    if (t < T.mugDown) drawMug(x, p[0] + p[2] * 0.45, p[1] + p[2] * 0.12, 5, t)
    if (inW(t, T.sweat, T.cut1)) drawSweat(x, p[0] + p[2] * 0.3, p[1] - p[2] * 0.2 + ease.inQuad(prog(t, T.sweat, T.cut1)) * 40, 6)
  }

  function drawNarrator(t) {
    let pk = 0
    if (t >= T.starsIn[0] && t < T.close4 + 0.3) pk = pop01(t, T.starsIn[0], 0.35, 2) * (1 - prog(t, T.close4, T.close4 + 0.3))
    if (t >= T.l8 - 0.4 && t < T.close5 + 0.3) pk = pop01(t, T.l8 - 0.4, 0.35, 2) * (1 - prog(t, T.close5, T.close5 + 0.3))
    if (pk <= 0.01) return
    let [nx, ny, ns] = STARS_AT
    const tug = nodK(t, T.pull[0], 0.6)
    ny += tug * 50
    // the blind cord, held on the right point during the pull
    if (t < T.close4 + 0.3) {
      const cy = WIN.y + WIN.h * (1 - ease.inOutQuad(prog(t, ...T.pull)) * 0.55) + 60
      x.fillStyle = '#d8cbb5'; x.fillRect(WIN.x + WIN.w - 26, cy, 4, Math.max(0, ny - cy + 10))
    }
    const mood = t < T.pull[1] ? 'squint' : t < T.l8 ? 'happy' : 'wink'
    drawStarChar(x, nx, ny, ns, t, { color: STAR.sky, mood, look: [-1, 1], hops: HOPS.stars, seed: SEED.stars, pop: pk, glow: 1.1 })
  }

  // ── the board
  function drawBoard(t) {
    drawCorkboard(x)
    drawSubject(x, SUBJ[0], SUBJ[1])
    drawPin(x, ...SUBJ_PIN)
    drawSubjectTag(x, SUBJ[0], SUBJ[1] + 128)
    CARDS.forEach((c, i) => {
      const t0 = T.cards[i]
      if (t < t0 - 0.25) return
      const sk = ease.outCubic(prog(t, t0 - 0.25, t0))
      const pin = [c.at[0] + Math.sin(c.rot) * c.h / 2, c.at[1] - Math.cos(c.rot) * c.h / 2 + 4]
      drawString(x, SUBJ_PIN, pin, sk, 26)
      drawIndexCard(x, c.at[0], c.at[1], c.w, c.h, c.lines, { rot: c.rot, k: pop01(t, t0, 0.3, 2.4) })
    })
    // a red marker circle around Dave on the double-take
    if (t >= T.take[0] + 0.15) {
      const c = CARDS[2], k = clamp(prog(t, T.take[0] + 0.15, T.take[0] + 0.55))
      x.save(); x.strokeStyle = RED; x.lineWidth = 6; x.beginPath()
      x.ellipse(c.at[0] + 8, c.at[1] + 36, 104, 30, 0.04, -0.4, -0.4 + k * Math.PI * 2.1); x.stroke(); x.restore()
    }
  }

  // ── the ENHANCE monitor (world, on the wall)
  function drawMonitor(t) {
    if (t < T.mon[0] || t > T.monOut[1]) return
    const k = ease.outBack(prog(t, ...T.mon)), o = ease.inCubic(prog(t, ...T.monOut))
    const dy = (1 - k) * -620 - o * 700
    const { x: mx, y: my, w: mw, h: mh, ix, iy, iw, ih } = MON
    x.save(); x.translate(0, dy)
    // cables to the ceiling
    x.fillStyle = OUT; x.fillRect(mx + 120, my - 900, 10, 900); x.fillRect(mx + mw - 130, my - 900, 10, 900)
    x.fillStyle = OUT; x.fillRect(mx - 6, my - 6, mw + 12, mh + 12)
    x.fillStyle = '#2c2a3c'; x.fillRect(mx, my, mw, mh); x.fillStyle = '#3d3a52'; x.fillRect(mx, my, mw, 8)
    x.save(); x.beginPath(); x.rect(ix, iy, iw, ih); x.clip()
    const z = zoomK(t)
    if (t < T.pig) {
      const Lv = Math.min(2, Math.floor(z)), fr = z - Lv
      const w0 = ZW[Lv], w1 = ZW[Math.min(2, Lv + 1)]
      const w = Lv >= 2 ? ZW[2] : Math.exp(lerp(Math.log(w0), Math.log(w1), fr))
      const m = clamp(z)
      const cu = lerp(0.5, BLOB.u, m), cvv = lerp(0.5, BLOB.v, m)
      const cell = ZC[Math.min(2, Math.round(z))]
      const soft = 0.35 + Math.min(2, z) * 0.5
      for (let py = 0; py < ih; py += cell) for (let pxx = 0; pxx < iw; pxx += cell) {
        const u = cu + ((pxx + cell / 2) / iw - 0.5) * w, v = cvv + ((py + cell / 2) / ih - 0.5) * w
        const c = photo(u, v, soft)
        x.fillStyle = `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`; x.fillRect(ix + pxx, iy + py, cell + 0.5, cell + 0.5)
      }
      // the reticle on the blob
      const bx = ix + ((BLOB.u - cu) / w + 0.5) * iw, by = iy + ((BLOB.v - cvv) / w + 0.5) * ih
      const rr = Math.max(40, Math.min(240, BLOB.ru / w * iw * 1.6))
      const pulse = 0.75 + 0.25 * Math.sin(t * 12)
      x.strokeStyle = `rgba(255,59,79,${pulse})`; x.lineWidth = 5
      x.strokeRect(bx - rr, by - rr * 0.8, rr * 2, rr * 1.6)
      x.fillStyle = `rgba(255,59,79,${pulse})`; x.fillRect(bx - rr - 30, by - 2, 24, 5); x.fillRect(bx + rr + 6, by - 2, 24, 5)
    } else {
      // the culprit in glorious HD
      const g = x.createLinearGradient(0, iy, 0, iy + ih); g.addColorStop(0, '#8a4a9a'); g.addColorStop(1, '#e8707a')
      x.fillStyle = g; x.fillRect(ix, iy, iw, ih)
      const wy = iy + ih * 0.7
      x.fillStyle = '#1e1428'; x.fillRect(ix, wy, iw, 10)
      const bob = T.coo.reduce((s, c) => s + nodK(t, c, 0.35), 0)
      drawPigeon(x, ix + iw * 0.55, wy, 16, t, { blink: inW(t, T.look[0], T.look[0] + 0.15) ? 1 : 0, bob })
      for (const c of T.coo) {
        if (t < c || t > c + 0.55) continue
        const kk = pop01(t, c, 0.18, 3), oo = 1 - prog(t, c + 0.4, c + 0.55)
        x.save(); x.translate(ix + 200, iy + 110); x.scale(kk, kk); x.globalAlpha = oo
        x.fillStyle = OUT; x.beginPath(); x.roundRect(-92, -44, 184, 88, 20); x.fill()
        x.fillStyle = BONE; x.beginPath(); x.roundRect(-86, -38, 172, 76, 16); x.fill()
        x.fillRect(70, 20, 30, 20)
        x.fillStyle = '#1d1640'; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('coo.', 0, 2)
        x.restore()
      }
    }
    // the flash on each zoom
    for (const [i, e] of T.e.entries()) {
      const t0 = i === 2 ? T.pig : e + 0.42, fl = 1 - prog(t, t0, t0 + 0.22)
      if (t >= t0 && fl > 0) { x.fillStyle = `rgba(230,255,240,${0.55 * fl})`; x.fillRect(ix, iy, iw, ih) }
    }
    // scanlines + readouts
    x.fillStyle = 'rgba(0,0,0,0.16)'; for (let yy = iy; yy < iy + ih; yy += 6) x.fillRect(ix, yy, iw, 2)
    x.font = `700 24px ${MONO}`; x.textBaseline = 'top'; x.fillStyle = MINT
    x.textAlign = 'left'; x.fillText('SUNSET.JPG', ix + 16, iy + 14)
    x.textAlign = 'right'; x.fillText(t < T.pig ? `ZOOM ×${[1, 5, 22][Math.min(2, Math.round(zoomK(t)))]}` : 'ZOOM ×∞', ix + iw - 16, iy + 14)
    if (t >= T.pig) { x.textAlign = 'left'; x.fillStyle = '#ffd27a'; x.fillText('MATCH: PIGEON', ix + 16, iy + ih - 40) }
    x.restore()
    x.restore()
  }

  // ── the CASE: YOU folder (world, held up on the wall)
  function polaroid(t, cx, cy, rot, k, i) {
    if (k <= 0) return
    const w = 232, h = 292
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = 'rgba(20,10,30,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
    x.fillStyle = OUT; x.fillRect(-w / 2 - 3, -h / 2 - 3, w + 6, h + 6)
    x.fillStyle = '#f7f2e6'; x.fillRect(-w / 2, -h / 2, w, h)
    const ix = -w / 2 + 12, iy = -h / 2 + 12, iw = w - 24, ih = 182
    x.save(); x.beginPath(); x.rect(ix, iy, iw, ih); x.clip()
    if (i === 0) drawPlate(x, ix, iy, iw, ih)
    else if (i === 1) drawCake(x, ix, iy, iw, ih, t)
    else {
      x.fillStyle = '#0d0a1c'; x.fillRect(ix, iy, iw, ih)
      const g = x.createRadialGradient(0, iy + 120, 0, 0, iy + 120, 120); g.addColorStop(0, 'rgba(160,210,255,0.45)'); g.addColorStop(1, 'rgba(160,210,255,0)')
      x.fillStyle = g; x.fillRect(ix, iy, iw, ih)
      const so = { color: SCO.color, mood: 'neutral', look: [0, 1], blink: 0.5, seed: 3, glow: 0.4, bob: 0 }
      drawStarChar(x, 0, iy + 112, 130, 3, so)
      drawFedora(x, starFrame(0, iy + 112, 130, 3, so), {})
      drawPhone(x, 0, iy + 168, 3, { glow: 0.6 })
      x.fillStyle = '#ff4a5e'; x.font = `700 20px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'top'; x.fillText('1:04 AM', ix + iw - 8, iy + 8)
    }
    x.restore()
    const cap = [['skipped', 'dinner.'], ['missed a friend’s', 'birthday.'], ['up at 1 AM.', 'again.']][i]
    x.fillStyle = '#1d1640'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    cap.forEach((l, j) => x.fillText(l, 0, h / 2 - 54 + j * 26))
    x.restore()
    drawPin(x, cx + Math.sin(rot) * h / 2, cy - Math.cos(rot) * h / 2 + 6)
  }
  function drawFolder(t) {
    if (t < T.fold[0] || t > T.foldOut[1]) return
    const k = easeOutBack(prog(t, ...T.fold), 1.6), o = 1 - ease.inCubic(prog(t, ...T.foldOut))
    const { x: fx, y: fy, w: fw, h: fh } = FOLD
    const p = prog(t, ...T.flip), sxk = Math.max(0.02, Math.abs(Math.cos(p * Math.PI))), back = p >= 0.5
    x.save()
    x.globalAlpha *= clamp(k * 2) * o
    x.translate(fx + fw / 2, fy + fh / 2 + (1 - k) * 300 + (1 - o) * 200); x.scale(sxk * lerp(0.85, 1, k), lerp(0.85, 1, k)); x.translate(-(fx + fw / 2), -(fy + fh / 2))
    // the tab + the body
    x.fillStyle = OUT; x.fillRect(fx + 30, fy - 46, 330, 56); x.fillRect(fx - 5, fy - 5, fw + 10, fh + 10)
    x.fillStyle = back ? '#f0cf86' : '#e2b765'; x.fillRect(fx + 35, fy - 41, 320, 50); x.fillRect(fx, fy, fw, fh)
    x.fillStyle = back ? '#f8e2a8' : '#f0cf86'; x.fillRect(fx, fy, fw, 8)
    x.fillStyle = '#5a2e1a'; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(back ? 'CASE: YOU' : 'CASE: THE EX', fx + 56, fy - 15)
    if (!back) {
      x.textAlign = 'center'; x.font = `800 84px ${INTER}`; x.fillText('THE EX FILES', fx + fw / 2, fy + 190)
      x.font = `700 28px ${MONO}`; x.fillText('400 SCREENSHOTS · 1 SUNSET', fx + fw / 2, fy + 270)
      x.save(); x.translate(fx + fw / 2 + 200, fy + 360); x.rotate(-0.12); x.strokeStyle = RED; x.lineWidth = 5; x.strokeRect(-170, -32, 340, 64)
      x.fillStyle = RED; x.font = `700 36px ${MONO}`; x.fillText('CONFIDENTIAL', 0, 2); x.restore()
    } else {
      T.photos.forEach((pt, i) => polaroid(t, fx + 180 + i * 240, fy + 270, [-0.07, 0.04, -0.03][i], pop01(t, pt, 0.3, 2.2), i))
      // the stamp: CASE: YOU
      if (t >= T.stamp) {
        const s = pop01(t, T.stamp, 0.18, 1.2)
        x.save(); x.translate(fx + fw / 2, fy + 66); x.rotate(-0.05); x.scale(1 + (1 - s) * 1.6, 1 + (1 - s) * 1.6); x.globalAlpha *= clamp(s * 3)
        x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-230, -40, 460, 80)
        x.fillStyle = RED; x.font = `700 56px ${MONO}`; x.textAlign = 'center'; x.fillText('CASE: YOU', 0, 4)
        x.restore()
      }
    }
    x.restore()
  }

  // ── tonight's deck
  function drawDeck(t) {
    if (t < T.deal[0] || t > T.out[1]) return
    const o = 1 - ease.inCubic(prog(t, T.h8 - 0.1, T.h8 + 0.3))
    if (o <= 0) return
    x.save(); x.globalAlpha *= o
    x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.globalAlpha *= clamp(prog(t, T.deal[0], T.deal[0] + 0.3))
    x.fillStyle = 'rgba(18,10,34,0.92)'; x.beginPath(); x.roundRect(170, 470, 740, 60, 30); x.fill(); x.lineWidth = 3; x.strokeStyle = GOLD; x.stroke()
    x.fillStyle = GOLD; x.fillText('TONIGHT’S DECK · NEW CASES', 540, 502)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    x.restore()
    DEAL.forEach(([dx, dy, rot], i) => {
      const t0 = T.deal[i], p = prog(t, t0 - 0.25, t0)
      if (p <= 0) return
      const e = ease.outCubic(p)
      x.save(); x.globalAlpha *= o
      drawCardBack(x, lerp(FILE_AT[0], dx, e), lerp(1250, dy, e), 186, 272, { rot: rot + (1 - e) * 2.4, k: lerp(0.4, 1, e), glow: i === 1 ? 0.6 + 0.4 * Math.sin(t * 4) : 0.25, t })
      x.restore()
    })
  }

  // ── the morning (screen space)
  function drawMorning(t) {
    const m = morningK(t)
    if (m <= 0) return
    x.save(); x.globalCompositeOperation = 'screen'; x.fillStyle = `rgba(120,70,30,${0.3 * m})`; x.fillRect(0, 0, W, 1920); x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(900, 500, 50, 900, 600, 1200); g.addColorStop(0, `rgba(255,200,130,${0.32 * m})`); g.addColorStop(1, 'rgba(255,170,110,0)')
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    x.restore()
    const fl = 1 - prog(t, T.pull[1] - 0.1, T.pull[1] + 0.35)
    if (t >= T.pull[1] - 0.1 && fl > 0) { x.fillStyle = `rgba(255,240,210,${0.4 * fl})`; x.fillRect(0, 0, W, 1920) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.05) {
        const C = cam(t), sh = shakeAt(t), mk = morningK(t)
        const allOut = popOut(t, T.out)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawWall(x)
        drawWindow(x, t, { up: ease.inOutQuad(prog(t, ...T.pull)), morning: mk })
        drawBoard(t)
        drawStripes(x, { alpha: 0.12 * (1 - mk), color: [150, 180, 255] })
        drawStripes(x, { alpha: 0.2 * mk, color: [255, 200, 130] })
        drawMonitor(t)
        drawFolder(t)
        drawDeck(t)
        drawPisces(t, popOut(t, [T.out[0] + 0.1, T.out[1]]))
        drawNarrator(t)
        const f = drawScorpio(t)
        drawVirgo(t)
        drawScoHeld(t, f)
        // the desk + what's on it
        const drawerK = t < T.drawer[0] ? 0 : t < T.shut[0] ? ease.outBack(prog(t, ...T.drawer)) : 1 - ease.inQuad(prog(t, ...T.shut))
        x.save(); x.globalAlpha *= allOut > 0 ? 1 : 0
        drawDesk(x, { drawer: drawerK, stamp: t >= T.closed ? pop01(t, T.closed, 0.16, 1.2) : 0 })
        drawClock(x, CLOCK_AT[0], CLOCK_AT[1], t < T.pull[0] + 0.3 ? '1:12' : '7:02', { glow: 1 - mk * 0.5 })
        x.fillStyle = '#ff4a5e'; x.font = `700 18px ${MONO}`; x.textAlign = 'center'; x.fillText('AM', CLOCK_AT[0] + 70, CLOCK_AT[1] - 22)
        if (t >= T.thud && t < T.fly[1]) {
          let fp = [FILE_AT[0], FILE_AT[1]], fs = 6
          if (t >= T.fly[0]) { const e = ease.inOutCubic(prog(t, ...T.fly)); fp = [lerp(FILE_AT[0], 540, e), lerp(FILE_AT[1], 1290, e) - Math.sin(e * Math.PI) * 200]; fs = lerp(6, 4, e) }
          x.save(); x.translate(fp[0], fp[1]); x.rotate(t >= T.fly[0] ? prog(t, ...T.fly) * 6.2 : 0); drawFile(x, 0, 0, fs, { label: 'THE EX' }); x.restore()
        }
        if (t >= T.mugDown) drawMug(x, MUG_AT[0], MUG_AT[1], 6, t)
        drawLamp(x, { on: 1 })
        x.restore()
        lampLight(x, 1 - mk * 0.7, 0.92 + 0.08 * Math.sin(t * 13) * Math.sin(t * 3.1))
        x.restore()
        drawMorning(t)
        // noir: the room is dark but for the lamp (heavier in the hook, lifting on the pan, gone in the morning)
        const dk = (0.55 * (1 - ease.inOutQuad(prog(t, T.pan[0], T.pan[1]))) + 0.28) * (1 - mk)
        if (dk > 0.01) {
          const v = x.createRadialGradient(470, 1090, 160, 470, 1090, 900)
          v.addColorStop(0, 'rgba(6,4,14,0)'); v.addColorStop(1, `rgba(6,4,14,${dk})`)
          x.fillStyle = v; x.fillRect(0, 0, W, 1920)
        }
        if (t >= T.vIn[1] && t < T.vIn[1] + 0.8) sparkleRing(t, 840, 1000, T.vIn[1], 10, 150, 0.4)
        if (t >= T.pig && t < T.pig + 0.8) sparkleRing(t, 560, 720, T.pig + 0.02, 12, 300, 0.2)
        if (t >= T.deal[1] && t < T.deal[1] + 0.8) sparkleRing(t, 540, 690, T.deal[1], 12, 260, 0.6)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1080, T.out[0] + 0.1, 16, 420, 0.2)
      }
      for (const b of boxes) b.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates. The default selection keeps 14.75 (the screenshots → ENHANCE) and 26.7 (CASE: YOU → morning).
export const CUTS = [T.pan[0], T.cut1, T.fold[0] - 0.05, T.cut2, T.lessonOut[1]]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Pitched SFX (pop, pluck, bell) are shifted into the score's key by the engine; chip/tom cues sit on a private
//    'sfx' bus and are written straight in Eb minor.
const N = { Eb3: 155.56, Gb3: 185, Bb3: 233.08, Db4: 277.18, Eb4: 311.13, Gb4: 369.99, Bb4: 466.16, Db5: 554.37, Eb5: 622.25, Gb5: 739.99, Bb5: 932.33, Eb6: 1244.51 }
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.024) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', r3(t + i * 0.035), 3520, 0.012, 0.5])
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.3, decay: 0.3 }], ['boom', t, 0.08], ['clap', t + 0.005, { ...FX, gain: 0.14 }], ['tick', t, 0.09]]
const thud = (t, g = 0.28) => [['tom', t, 70, { ...FX, gain: g, decay: 0.28 }], ['boom', t, 0.1], ['tick', t, 0.06]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const womp = t => [['chip', t, N.Bb4, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.045, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.36, N.Gb4 * 1.03, 0.8, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.045, decay: 0.3, sustain: 0.8 }]]
const coo = t => [['chip', t, 420, 0.14, { ...FX, wave: 'tri', slide: 3, gain: 0.05, decay: 0.08, sustain: 0.7, vib: 0.03 }], ['chip', t + 0.16, 380, 0.22, { ...FX, wave: 'tri', slide: -4, gain: 0.05, decay: 0.1, sustain: 0.7, vib: 0.03 }]]
const enhance = (t, i) => [
  ['whoosh', t + 0.05, 0.4, 0.06 + i * 0.02], ['riser', t - 0.05, t + 0.42, 0.03],
  ...Array.from({ length: 6 }, (_, k) => ['chip', r3(t + 0.08 + k * 0.05), 1200 + k * 260 + i * 200, 0.04, { ...FX, wave: 'square', duty: 0.5, gain: 0.018, decay: 0.03, sustain: 0.5 }]),
  ['pop', r3(t + 0.42), [880, 1046.5, 1318.51][i], 0.05, 0], ['tick', r3(t + 0.42), 0.07],
]
const honk = t => [['chip', t, 196, 0.32, { ...FX, wave: 'square', duty: 0.4, slide: 2, gain: 0.06, decay: 0.2, sustain: 0.8, vib: 0.05 }], ['chip', t, 98, 0.32, { ...FX, wave: 'saw', gain: 0.03, decay: 0.2, sustain: 0.8 }]]

const PITCH = { [NAME.sco]: 520, [NAME.vir]: 1050, [NAME.stars]: 880 }
const KS = 2 ** (-6 / 12)                     // lesson.js's arpeggio, moved to Eb minor (the same shift lessonCues uses)
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · 1:12 AM
  ...head(T.h0, 5, T.h0Land, 0), ['tick', 0.4, 0.05], ['tick', 1.4, 0.05],
  ...sob(T.sob1[0] + 0.1, N.Eb6), ...sob(T.sob1[0] + 0.8, N.Bb5, 2),
  // the evidence
  ['whoosh', T.pan[0], 0.6, 0.06], ...head(T.h1, 1, T.h1Land, 2),
  ...T.cards.flatMap((c, i) => [['whoosh', r3(c - 0.25), 0.25, 0.03], ['tick', c, 0.08], ['pop', c, NOTE[(i * 2 + 1) % 7], 0.04, -0.3 + i * 0.3], ['tom', c, 140, { ...FX, gain: 0.08, decay: 0.08 }]]),
  ['chip', T.take[0], N.Bb5, 0.1, { ...FX, wave: 'square', duty: 0.25, gain: 0.04, decay: 0.05, sustain: 0.6 }], ['chip', T.take[0] + 0.12, N.Eb6, 0.14, { ...FX, wave: 'square', duty: 0.25, gain: 0.04, decay: 0.05, sustain: 0.6 }],
  ['pop', T.gasp, 1318.51, 0.035, 0.6], ['whoosh', T.take[0] + 0.15, 0.4, 0.03],
  // 400 screenshots
  ['whoosh', T.vIn[0], 0.5, 0.06], ['pop', T.vIn[1], 987.77, 0.04, 0.4], ...head(T.h2, 1, T.h2Land, 4),
  ...thud(T.thud), ['tick', T.mugDown, 0.06], ['pop', T.mugDown, 659.25, 0.03, 0.3],
  ['pop', T.sweat, 1760, 0.02, 0.4], ...womp(T.sweat + 0.1),
  // ENHANCE ×3, the tape stop, the pigeon
  ['whoosh', T.mon[0], 0.4, 0.07], ['tom', T.mon[1] - 0.1, 60, { ...FX, gain: 0.16, decay: 0.2 }],
  ...enhance(T.e[0], 0), ...enhance(T.e[1], 1), ['riser', T.e[2] - 0.05, T.hush[0], 0.05],
  ...Array.from({ length: 6 }, (_, k) => ['chip', r3(T.e[2] + 0.08 + k * 0.04), 1800 + k * 300, 0.035, { ...FX, wave: 'square', duty: 0.5, gain: 0.018, decay: 0.03, sustain: 0.5 }]),
  ['tapeStop', T.hush[0], r3(T.hush[1] - T.hush[0])],
  ['pop', T.pig, 1567.98, 0.05, 0], ['glitter', T.pig, T.pig + 0.6], ['boom', T.pig, 0.06],
  ...head(T.pig, 2, T.h4Land, 1), ...coo(T.coo[0]), ...coo(T.coo[1]),
  ...crickets(T.look[0]), ...crickets(T.look[0] + 0.3), ['tick', T.look[0] + 0.1, 0.03], ['tick', T.look[0] + 0.5, 0.03],
  ...sob(T.sob2[0], N.Eb6, 2),
  // one more file: CASE: YOU
  ['whoosh', T.monOut[0], 0.4, 0.05], ['whoosh', T.fold[0], 0.4, 0.05], ...head(T.h5, 2, T.h5Land, 3),
  ['whoosh', T.flip[0], 0.4, 0.07], ...stamp(T.stamp),
  ...T.photos.map((p, i) => ['pop', p, [N.Gb5, N.Eb5, N.Bb4][i] * 2, 0.04, -0.4 + i * 0.4]), ...T.photos.map(p => ['tick', p, 0.05]),
  ['chip', T.magUp[0], N.Eb5, 0.25, { ...FX, wave: 'tri', slide: 7, gain: 0.03, decay: 0.15, sustain: 0.6 }],
  ['chip', T.lower[0], N.Bb4, 1.3, { ...FX, wave: 'tri', slide: -7, vib: 0.02, gain: 0.03, decay: 0.6, sustain: 0.7 }],
  ...sob(T.sob3[0] + 0.2, N.Eb6), ...sob(T.sob3[0] + 0.9, N.Bb5), ...sob(T.sob3[0] + 1.6, N.Gb5 * 2, 2),
  // morning
  ['pop', T.starsIn[1], 880, 0.035, 0.4], ...head(T.h6, 2, T.h6Land, 1),
  ...Array.from({ length: 10 }, (_, k) => ['tick', r3(T.pull[0] + k * 0.05), 0.04]), ['whoosh', T.pull[0], 0.6, 0.08],
  ['swell', T.pull[0], T.pull[1] + 0.4, { bus: 'sfx', gain: 0.035, f0: 600, f1: 3200 }], ['bell', T.pull[1], 1318.51, 0.04, 1.8, 0.3], ['glitter', T.pull[1], T.pull[1] + 0.8],
  ['tick', T.pull[0] + 0.3, 0.05],
  // the lesson
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  // lesson.js plays its level-up chiptune on the 'fx' bus, which the screwed preset levels down (mix.fx −21): double it,
  // same notes and times (moved to Eb minor exactly as lessonCues does), on this film's own sfx bus
  ...[440, 523.25, 659.25, 880, 1046.5].map((f, i) => ['chip', r3(LESSON.at + i * 0.075), +(f * KS).toFixed(2), 0.09, { ...FX, duty: 0.25, gain: 0.03, decay: 0.08, sustain: 0.6, dly: 0.1 }]),
  ['chip', r3(LESSON.at + 0.38), +(1046.5 * KS).toFixed(2), 0.62, { ...FX, duty: 0.25, arp: [0, 4, 7, 12], gain: 0.026, decay: 0.4, sustain: 0.55, vib: 0.004 }],
  ['chip', r3(LESSON.at + 0.38), +(523.25 * KS).toFixed(2), 0.62, { ...FX, wave: 'tri', gain: 0.03, decay: 0.4, sustain: 0.6 }],
  ...sob(T.lesson + 0.9, N.Eb6, 2),
  // tonight's deck
  ...head(T.h7, 1, T.h7Land, 2), ['whoosh', T.drawer[0], 0.3, 0.05], ['tick', T.drawer[1], 0.05],
  ['whoosh', T.fly[0], 0.45, 0.07], ...thud(T.shut[1], 0.32),
  ...T.deal.flatMap((d, i) => [['whoosh', r3(d - 0.25), 0.25, 0.04], ['pop', d, NOTE[(i * 2 + 2) % 7], 0.04, -0.4 + i * 0.4], ['tick', d, 0.05]]),
  ['bell', T.deal[1] + 0.1, 1567.98, 0.025, 1.4, 0], ['glitter', T.deal[1], T.deal[1] + 0.6],
  // case closed
  ...head(T.h8, 1, T.h8Land, 0), ['pop', T.tip[0] + 0.1, 1318.51, 0.03, 0], ['whoosh', T.tip[0], 0.3, 0.03],
  ...stamp(T.closed), ...honk(T.honk),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(ALL_LINES, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
