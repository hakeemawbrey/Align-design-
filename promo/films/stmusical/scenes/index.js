// stmusical — "Leo: The Musical." (45 s vertical Align ad, Star Talk "Wild Lessons" #6, music: pop · G). Story 0–40.6,
// then the end card. A pixel theatre floats in the night sky: red curtains, a pelmet, wooden boards and footlights,
// ♓ Pisces sobbing in the opera box on the right.
//   0.0–4.8    "Leo has a crush. | So: a *musical.*"  ♌ LEO (crown) belts on a little riser in one warm spotlight, pixel
//              notes pouring out of it. LEO ♪ "I saw them at the coffee cart!"
//   4.9–10.4   "Spotlights. | *Obviously.*"  Two more spots clunk on and the LEO · The Musical marquee drops in, bulbs
//              chasing (the drop). LEO ♪ "they said 'excuse me.' TO ME!"  ♍ VIRGO, the stage manager (headset,
//              clipboard), peeks out of the wing: "you talked for two seconds."
//  10.4–15.8   "Cue the | *kick line.*"  ♈ ♉ ♊ ♋ hop in wearing top hats and pixel tap-shoe legs and kick on every beat,
//              echoing "EXCUSE ME!" LEO ♪ "someday I'll walk right up and say…"
//  16.0        card cut (flip) into "And now: | a *key change.*"  A KEY CHANGE ↑ sign drops from the flies, the riser
//              scissors up, confetti, brass. LEO ♪ "HELLOOOOOOOOOOOO—"
//  18.3–24.8   The crush (♒ AQUARIUS, a to-go coffee) wanders on from the right. Leo sees them. The music cuts DEAD:
//              the spots clunk off, the notes in the air drop and clink on the boards, the kick line freezes mid-kick
//              (Taurus topples over, thud), the sign swings crooked. "Oh no. | It's *them.*"  Crickets. Leo, tiny:
//              "…hi."  The crush, beaming: "hi!"  And walks off, waving.
//  25.04      "They said | *hi back.*"  Everything erupts: spots, confetti, kicks, Pisces wailing. VIRGO: "two letters.
//              standing ovation."
//  28.3        card cut (deal) into ★ LESSON UNLOCKED: "You don't need | a whole number. | Just say *hi.*" (+1 COURAGE)
//  33.1–37.2   "Card first. | Face *last.*"  A mystery card deals in and flips (Aquarius, face veiled): "I always say hi
//              back." THE STARS: "no big number. a card, then a hi."
//  37.3–40.42  "Curtain. Applause. | *Hi.*"  The curtains swing shut, applause, roses from the opera box. Leo pops out in
//              front of the curtain and whispers its tiny "hi." Out by 40.42; the end card takes over at 40.6.
// One canvas (sky + world-space set and cast), DOM type + dialogue boxes + the shared lesson, grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawCurtain, drawValance, drawStage, drawMarquee, drawSpot, drawRiser, drawBalcony, drawKeySign, drawTopHat, drawCane,
  drawHeadset, drawClipboard, drawCup, drawRose, drawNote, drawLegs, drawBubble, drawTear, drawSweat, drawPixelHeart, drawCrown, drawTissue } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#e8344e', SKYBLUE = '#7fd0f0', ORANGE = '#ffb347'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BL = 60 / 108
export const BEAT = n => +(0.6 + n * BL).toFixed(3)      // 108 bpm grid
export const KEY = 'G'

const LEO = signStar('leo'), VIR = signStar('virgo'), AQU = signStar('aquarius'), PIS = signStar('pisces')
const ARI = signStar('aries'), TAU = signStar('taurus'), GEM = signStar('gemini'), CAN = signStar('cancer')
const LEO_T = '#ffb347', VIR_T = '#9fe0a8'

// ── the timeline
export const T = {
  // the hook
  h0: 0.05, h0Land: BEAT(2), h0Out: [4.62, 4.8], l1: 1.95,
  // spotlights + marquee
  h1: 4.9, spot1: 4.93, drop: BEAT(8), marq: [4.72, BEAT(8)], h1Out: [10.22, 10.4],
  l2: 5.45, vir: [8.05, 8.4], l3: 8.5,
  // the kick line
  h2: 10.42, h2Land: BEAT(18), kick: [10.42, 10.9], chorus: [BEAT(19), BEAT(21)], l5: 12.6, h2Out: [15.6, 15.78],
  // the key change
  cut1: 16.0, h3: 16.05, h3Land: 16.45, key: BEAT(28), rise: [BEAT(28), BEAT(28) + 0.5], sign: [16.0, 16.42], l6: 16.55, h3Out: [19.3, 19.48],
  // the crush walks by
  crushIn: [18.3, 20.5], signFall: [20.05, 20.6], spotted: 19.12, dead: BEAT(34), close1: 19.5, spotsOff: [19.62, 19.92], taurus: [20.45, 20.9],
  h4: 19.75, h4Land: 20.35, crk: [20.95, 21.45], whisper: 21.9, hi: 23.0, crushOut: [23.75, 24.85], roll: [23.93, BEAT(44)], h4Out: [24.62, 24.8],
  // the eruption
  erupt: BEAT(44), h5: 24.85, l7: 25.25, close2: 28.32, h5Out: [28.1, 28.28],
  // the lesson
  cut2: 28.3, lesson: BEAT(50), lessonOut: [32.9, 33.1],
  // card first, face last
  deal: [32.9, 33.3], flip: [33.3, 33.65], h6: 33.15, h6Land: 33.5, starsIn: 33.45, l8: 33.95, quote: 35.95, soft: 36.4, close3: 37.35,
  h6Out: [37.0, 37.18], cardOut: [37.0, 37.3],
  // curtain
  ret: 37.3, shut: [37.3, 37.85], h7: 37.25, h7Land: 37.85, leoOut: 38.25, tinyHi: 38.7, roses: 38.95, out: [40.0, 40.42], h7Out: [40.18, 40.42],
}
const KICKS = [...Array.from({ length: 15 }, (_, i) => BEAT(19 + i)), ...Array.from({ length: 5 }, (_, i) => BEAT(45 + i))]   // 11.16 … 18.93, 25.6 … 27.82
const KICK_FREEZE = T.dead - 0.4

// ── the lines
const SLEO = `${LEO.glyph}︎ LEO ♪`, SVIR = `${VIR.glyph}︎ VIRGO · STAGE MGR`, SS = 'THE STARS'
const LINES1 = [
  { t: T.l1, speaker: SLEO, color: LEO_T, text: '♪ I saw them at the *coffee cart!* ♪' },
  { t: T.l2, speaker: SLEO, color: LEO_T, text: "♪ they said *'excuse me.'* TO ME! ♪" },
  { t: T.l3, speaker: SVIR, color: VIR_T, text: 'you talked for *two seconds.*' },
  { t: T.l5, speaker: SLEO, color: LEO_T, text: "♪ someday I'll walk right up and say… ♪" },
  { t: T.l6, speaker: SLEO, color: LEO_T, text: '♪ *HELLOOOOOOOOOOOOO—*' },
]
const LINES2 = [{ t: T.l7, speaker: SVIR, color: VIR_T, text: 'two letters. *standing ovation.*' }]
const LINES3 = [{ t: T.l8, speaker: SS, color: GOLD, text: 'no big number. a card, then a *hi.*' }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS }), LT3 = lineTimes(LINES3, { cps: CPS })
const HOPS = {
  leo: talkHops(LINES1, SLEO, { cps: CPS }),
  vir: [...talkHops(LINES1, SVIR, { cps: CPS }), ...talkHops(LINES2, SVIR, { cps: CPS })],
  stars: talkHops(LINES3, SS, { cps: CPS }),
}
/** Leo is singing (mouth open) while a sung line types, and through the held belt */
const SING = [[LT1[0].start, LT1[0].done + 0.5], [LT1[1].start, LT1[1].done + 0.5], [LT1[3].start, LT1[3].done + 0.4], [LT1[4].start, T.dead]]

const LESSON = { at: T.lesson, out: T.lessonOut, text: 'You don’t need | a whole number. | Just say *hi.*', chip: '+1 COURAGE', accentColor: GOLD, dim: 0.62 }

// ── helpers
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inW = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const keyed = (t, list) => { let s = list[0][1]; for (const [k, v] of list) if (t >= k) s = v; else break; return s }
const springStep = (d, w = 22, k = 7) => d <= 0 ? 0 : 1 - Math.exp(-d * k) * Math.cos(d * w)
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
/** the theatre is up (struck under the lesson cut, back for the curtain call) */
const setUp = t => t < T.cut2 || t >= T.ret

// ── where things are
const RISER = { cx: 540, w: 230, lo: 1150, hi: 1000, bottom: 1250 }
const STAGE = { y0: 1240, y1: 1450 }
const LEO_SZ = 280
const KL = [{ id: 'ari', x: 165, col: ARI }, { id: 'tau', x: 320, col: TAU }, { id: 'gem', x: 760, col: GEM }, { id: 'can', x: 915, col: CAN }]
const KL_Y = 1150, KL_SZ = 136
const VIR_P = [168, 830, 150]
const PIS_P = [952, 742, 124]
const BALC = { x: 862, y: 760, w: 196, h: 112 }
const CRUSH_Y = 1380, CRUSH_SZ = 190, CRUSH_STOP = 650
const TIE_LEO = [262, 1238, 240]
const STARS_TIE = [176, 690, 150]
const CARD = { cx: 690, cy: 1000, w: 470, h: 690 }
const MARQ = { cx: 540, cy: 540, w: 520, h: 132 }
const SEED = { leo: 5, vir: 3, aqu: 9, pis: 23, stars: 11, ari: 13, tau: 17, gem: 7, can: 19 }

function riserTop(t) {
  if (t < T.rise[0]) return RISER.lo
  const p = prog(t, ...T.rise)
  let y = lerp(RISER.lo, RISER.hi, ease.outCubic(p))
  // it sags a touch when the music dies, and stays up
  if (t >= T.dead) y += 14 * ease.outCubic(prog(t, T.dead, T.dead + 0.3)) * (1 - prog(t, T.erupt, T.erupt + 0.3))
  return y
}

// ── moods
const LEO_K = [
  [0, S_('heart', [0, -1])], [1.4, S_('happy', [0, 0])], [3.6, S_('heart', [0, 0])], [T.drop, S_('happy', [0, 0])], [6.9, S_('sparkle', [0, -1])],
  [T.l3 + 0.2, S_('neutral', [-1, 0], { blink: false })], [9.7, S_('squint', [-1, 0])], [10.2, S_('happy', [0, 0])],
  [T.kick[1], S_('happy', [0, 0])], [12.2, S_('sparkle', [0, -1])], [T.key, S_('happy', [0, -1])], [17.4, S_('sparkle', [0, -1])],
  [T.spotted, S_('wide', [1, 1], { blink: false })], [T.dead, S_('wide', [1, 1], { blink: false, sq: -0.06 })], [T.dead + 0.4, S_('wide', [1, 1], { blink: false })],
  [T.whisper - 0.3, S_('neutral', [1, 1], { blink: 0.3, blush: 1 })], [T.whisper + 0.9, S_('neutral', [1, 1], { blink: 0.45, blush: 1 })],
  [T.hi, S_('wide', [1, 1], { blink: false })], [T.crushOut[0] + 0.2, S_('wide', [-1, 1], { blink: false })], [24.35, S_('heart', [-1, 1])],
  [T.erupt, S_('happy', [0, -1], { sq: -0.05 })], [25.5, S_('heart', [0, 0])], [26.6, S_('happy', [0, 0])],
  [T.cut2, S_('neutral', [0, -1])], [T.lesson + 1.2, S_('sparkle', [0, -1])], [T.lessonOut[0], S_('neutral', [1, 0])],
  [T.flip[1], S_('wide', [1, 0])], [T.flip[1] + 0.4, S_('neutral', [1, -1])], [T.quote, S_('wide', [1, 0], { blink: false })], [T.soft, S_('heart', [1, 0])],
  [T.leoOut, S_('neutral', [0, 0], { blink: 0.3, blush: 1 })], [T.tinyHi + 0.8, S_('happy', [0, 0])],
]
const VIR_K = [
  [0, S_('squint', [1, 0])], [T.l3, S_('squint', [1, -1])], [9.9, S_('neutral', [1, -1], { blink: 0.5 })],
  [T.kick[0], S_('wide', [1, 0], { blink: false })], [11.6, S_('squint', [1, 0])], [T.key, S_('eyeroll', [0, -1])], [T.key + 0.9, S_('squint', [1, -1])],
  [T.dead, S_('wide', [1, 1], { blink: false })], [T.whisper, S_('wide', [1, 0], { blink: false })], [T.hi + 0.1, S_('happy', [1, 1])],
  [T.crushOut[0], S_('neutral', [1, 1])], [T.erupt, S_('happy', [1, 0])], [T.l7 + 0.2, S_('wink', [1, 0])], [26.4, S_('happy', [1, -1])],
]
const AQU_K = [
  [0, S_('neutral', [-1, 0])], [T.crushIn[1] - 0.1, S_('neutral', [-1, -1])], [21.3, S_('neutral', [-1, -1], { blink: false })],
  [T.whisper + 0.5, S_('happy', [-1, -1])], [T.hi, S_('happy', [-1, -1], { sq: -0.04 })], [T.crushOut[0], S_('happy', [-1, 0])],
]
const PIS_K = [
  [0, S_('sparkle', [-1, 0])], [T.dead, S_('wide', [-1, 1], { blink: false })], [T.hi + 0.1, S_('sparkle', [-1, 1])],
  [T.erupt, S_('sparkle', [-1, 0])], [T.ret, S_('sparkle', [-1, 1])],
]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 64px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "600 32px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type (DOM, above the canvas)
  const H0 = popText(root, 'Leo has a crush. | So: a *musical.*', { top: 176, size: 96, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: ORANGE })
  const H1 = popText(root, 'Spotlights. | *Obviously.*', { top: 176, size: 104, accentSize: 156, at: T.h1, late: 1, lateAt: T.drop, wobble: true, gap: 0.07, accentColor: PINK })
  const H2 = popText(root, 'Cue the | *kick line.*', { top: 176, size: 108, accentSize: 160, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, gap: 0.07, accentColor: GOLD })
  const H3 = popText(root, 'And now: | a *key change.*', { top: 176, size: 104, accentSize: 156, at: T.h3, late: 2, lateAt: T.h3Land, lateGap: 0.12, wobble: true, gap: 0.08, accentColor: GOLD })
  const H4 = popText(root, 'Oh no. | It’s *them.*', { top: 176, size: 112, accentSize: 170, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, gap: 0.12, accentColor: SKYBLUE })
  const H5 = popText(root, 'They said | *hi back.*', { top: 176, size: 112, accentSize: 172, at: T.h5, late: 2, lateAt: T.erupt, lateGap: 0.1, wobble: true, gap: 0.07, accentColor: GOLD })
  const H6 = popText(root, 'Card first. | Face *last.*', { top: 176, size: 108, accentSize: 160, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, accentColor: PINK })
  const H7 = popText(root, 'Curtain. Applause. | *Hi.*', { top: 176, size: 96, accentSize: 190, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, gap: 0.14, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1478, width: 960, height: 290, open: T.l1 - 0.24, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1478, width: 960, height: 290, open: T.l7 - 0.22, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: 1478, width: 960, height: 290, open: T.l8 - 0.24, close: T.close3, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── camera: (fx, fy) maps to the screen (540, 1000) at scale s
  function cam(t) {
    let s = 1, fx = 540, fy = 1000
    if (t < T.cut1) s = 1 + 0.02 * ease.inOutQuad(prog(t, 0.2, 4.6)) * (1 - ease.inOutQuad(prog(t, 4.6, 5.0))) + 0.02 * bump(t, T.drop, 0.35)
    else if (t < T.dead) { s = 1 + 0.04 * ease.outCubic(prog(t, T.key, T.key + 0.6)) + 0.025 * bump(t, T.key, 0.3) }
    else if (t < T.erupt) {
      // the silence: a slow creep in on Leo and the crush
      const k = ease.inOutCubic(prog(t, T.dead, T.hi + 0.4))
      s = lerp(1.04, 1.11, k); fx = lerp(540, 575, k); fy = lerp(1000, 1060, k)
      if (t > T.roll[0]) { const r = ease.inQuad(prog(t, T.roll[0], T.erupt)); s += 0.03 * r }
    } else if (t < T.cut2) s = 1 + 0.05 * bump(t, T.erupt, 0.45)
    return { s, fx, fy }
  }
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.drop, 10], [T.key, 14], [T.taurus[1], 7], [T.erupt, 16], [T.dead, 4]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
  }

  // ── canvas helpers
  function ono(text, px, py, t, t0, { size = 46, color = BONE, rot = 0, life = 0.95, rise = 46, ticks = true } = {}) {
    const k = t - t0
    if (k < 0 || k > life) return
    const p = easeOutBack(prog(k, 0, 0.2), 2.6), fade = 1 - prog(k, life - 0.25, life)
    x.save(); x.translate(px, py - rise * ease.outCubic(k / life)); x.rotate(rot); x.scale(p, p); x.globalAlpha *= fade
    x.font = `700 ${size}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.lineJoin = 'round'; x.lineWidth = size * 0.2; x.strokeStyle = 'rgba(10,6,24,0.9)'; x.strokeText(text, 0, 0)
    x.fillStyle = color; x.fillText(text, 0, 0)
    if (ticks) {
      const w = x.measureText(text).width / 2 + size * 0.3, q = prog(k, 0, 0.3)
      x.fillStyle = color; x.globalAlpha *= 1 - q
      for (const [dx, dy, a] of [[-w, -size * 0.45, -0.6], [w, -size * 0.45, 0.6], [-w - 6, size * 0.25, -2.6], [w + 6, size * 0.25, 2.6]]) {
        x.save(); x.translate(dx * (1 + 0.2 * q), dy); x.rotate(a); x.fillRect(-3, -size * 0.28, 6, size * 0.32); x.restore()
      }
    }
    x.restore()
  }
  function sparkleRing(t, cx, cy, t0, n, R, seed, life = 0.7) {
    const tt = t - t0
    if (tt < 0 || tt > life) return
    const p = ease.outCubic(tt / life)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / life)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p) * 0.8, 30 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (110 + ((k * 37) % 5) * 24) * spread * size / 200, vy = -(150 + ((k * 53) % 4) * 36) * size / 200
        drawTear(x, ex + vx * a, ey + vy * a + 800 * a * a, px)
      }
    }
  }
  const CONF = ['#ffd23f', '#ff6fb5', '#7fe0ff', '#9fe0a8', '#c9a6ff', '#ffffff', '#ff8a3a']
  /** a confetti burst from (cx, cy) at t0: pure f(t), flutters down and fades */
  function confetti(t, t0, cx, cy, n = 60, life = 2.6, spread = 1) {
    const a = t - t0
    if (a < 0 || a > life) return
    x.save(); x.globalAlpha = 1 - prog(a, life - 0.6, life)
    for (let i = 0; i < n; i++) {
      const ang = -Math.PI / 2 + (((i * 0.6180339) % 1) - 0.5) * 2.6 * spread, sp = 700 + ((i * 0.7548) % 1) * 700
      const vx = Math.cos(ang) * sp, vy = Math.sin(ang) * sp
      const drag = 1 - Math.exp(-a * 2.2)
      const px = cx + vx * drag / 2.2 + Math.sin(a * 5 + i) * 18, py = cy + vy * drag / 2.2 + 260 * a * a * 0.9
      const w = 10 + (i % 3) * 4, h = 6 + Math.abs(Math.sin(a * 9 + i)) * 10
      x.fillStyle = CONF[i % CONF.length]; x.fillRect(Math.round(px), Math.round(py), w, h)
    }
    x.restore()
  }

  // ── a character
  function star(id, P, t, st, { pop = 1, hops = [], glyph = true, alpha = 1, rot = 0 } = {}) {
    const [px0, py0, sz] = P
    if (pop <= 0.02 || alpha <= 0) return null
    const col = { leo: LEO, vir: VIR, aqu: AQU, pis: PIS, ari: ARI, tau: TAU, gem: GEM, can: CAN }[id]
    x.save()
    if (rot) { const fy = py0 + sz * 0.44; x.translate(px0, fy); x.rotate(rot); x.translate(-px0, -fy) }
    const r = drawStarChar(x, px0, py0 + (st.dy || 0), sz, t, { color: id === 'stars' ? STAR.sky : col.color, glyph: glyph && sz >= 120 && id !== 'stars' ? col.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[id], pop, glow: 0.9, bob: sz * 0.03, alpha, blush: st.blush })
    x.restore()
    return { ...r, c: r.size / 36 }
  }
  /** an open singing mouth under the eyes; open = 0…1 */
  function mouth(r, open) {
    if (open <= 0.05) return
    const c = r.c, w = c * 3.2, h = c * (1 + 2.4 * open)
    const mx = Math.round(r.x - w / 2), my = Math.round(r.y + c * 4.2)
    x.fillStyle = '#3a0f2a'; x.fillRect(mx, my, Math.round(w), Math.round(h)); x.fillRect(mx + c * 0.6, my - c * 0.5, Math.round(w - c * 1.2), Math.round(h + c))
    if (h > c * 2) { x.fillStyle = '#ff6f8f'; x.fillRect(mx + c * 0.6, my + h - c * 1.1, Math.round(w - c * 1.2), Math.round(c * 1.1)) }
  }

  // ── Leo
  function leoPlace(t) {
    if (t < T.cut2) return [RISER.cx, riserTop(t) - LEO_SZ * 15.84 / 36 + 6, LEO_SZ]
    if (t < T.ret) return TIE_LEO
    return [540, 1236, 230]
  }
  function singOpen(t) {
    for (const [a, b] of SING) if (t >= a && t < b) {
      const k = t - a
      if (a === LT1[4].start) return 0.85 + 0.15 * Math.sin(k * 22)                       // the held belt
      return 0.45 + 0.4 * Math.abs(Math.sin(k * 9.5)) * clamp((b - t) * 4)
    }
    return 0
  }
  function drawLeo(t) {
    const P = leoPlace(t)
    let st = keyed(t, LEO_K)
    let k = 1
    if (t >= T.ret) {
      // hidden behind the closing curtains, then pops out in front of them
      if (t < T.leoOut) return null
      k = pop01(t, T.leoOut, 0.38, 2.2) * popOut(t, T.out)
    } else if (t >= T.cut2) k = 1
    const hops = [...HOPS.leo, ...KICKS.slice(0, 15).filter((_, i) => i % 2 === 0), T.rise[1], T.erupt + 0.02, T.erupt + 0.58, T.erupt + 1.14, T.soft + 0.1, T.leoOut + 0.38]
      .filter(h => !(h > T.dead - 0.05 && h < T.erupt))
    let sq = st.sq || 0
    // frozen solid: a tiny shiver
    let dx = 0
    if (inW(t, T.dead, T.whisper)) dx = Math.sin(t * 60) * 1.6 * (1 - prog(t, T.dead + 1.2, T.whisper))
    const r = star('leo', [P[0] + dx, P[1], P[2]], t, { ...st, sq }, { pop: k, hops })
    if (!r) return null
    mouth(r, singOpen(t))
    // the whisper: the smallest possible mouth
    if (inW(t, T.whisper, T.whisper + 0.8) || inW(t, T.tinyHi, T.tinyHi + 0.6)) { x.fillStyle = '#3a0f2a'; x.fillRect(Math.round(r.x - r.c * 0.6), Math.round(r.y + r.c * 4.6), Math.round(r.c * 1.2), Math.round(r.c * 1.2)) }
    // the crown: bounces on the key change, slides crooked when the music dies, straightens at the eruption
    let crot = -0.12, cdy = 0
    if (t >= T.key) cdy = -50 * Math.sin(Math.PI * prog(t, T.key, T.key + 0.5))
    if (t >= T.dead && t < T.erupt) crot = -0.12 + 0.55 * springStep(t - T.dead - 0.05, 14, 5)
    if (t >= T.erupt) crot = -0.12 - 0.3 * Math.sin(Math.PI * prog(t, T.erupt, T.erupt + 0.5))
    drawCrown(x, r.x + r.c * 0.6 + (crot - -0.12) * 30, r.top + r.c * 3.6 + cdy, Math.max(3, r.c * 0.95), crot)
    // sweat while frozen
    if (t >= T.dead + 0.3 && t < T.erupt) {
      for (let i = 0; i < 2; i++) {
        const ph = ((t - T.dead) * 0.75 + i * 0.5) % 1
        x.save(); x.globalAlpha = Math.min(1, ph * 6) * (1 - prog(ph, 0.8, 1))
        drawSweat(x, r.x + (i ? -0.36 : 0.36) * r.size, r.top + r.size * (0.28 + 0.25 * ph), Math.max(3, Math.round(r.c * 0.8)))
        x.restore()
      }
    }
    // hearts after "hi!"
    if (t >= 24.35 && t < T.erupt + 0.6) {
      for (let i = 0; i < 4; i++) {
        const ph = ((t - 24.35) * 0.9 + i * 0.25) % 1
        x.save(); x.globalAlpha = Math.sin(ph * Math.PI) * (1 - prog(t, T.erupt + 0.2, T.erupt + 0.6))
        drawPixelHeart(x, r.x + (i % 2 ? 1 : -1) * r.size * (0.3 + 0.1 * i) + Math.sin(ph * 6 + i) * 10, r.top - ph * 120, 5)
        x.restore()
      }
    }
    if (t >= T.soft && t < T.cardOut[1]) {
      for (let i = 0; i < 3; i++) {
        const ph = ((t - T.soft) * 0.8 + i / 3) % 1
        x.save(); x.globalAlpha = Math.sin(ph * Math.PI)
        drawPixelHeart(x, r.x + (i - 1) * 60, r.top - 10 - ph * 110, 5)
        x.restore()
      }
    }
    return r
  }

  // ── the notes pouring out of Leo (pure: note i is born at i·NG; when the music dies they all drop and clink)
  const NG = 0.3, NLIFE = 2.3
  function noteAt(i, a, base) {
    const side = i % 2 ? 1 : -1, sw = ((i * 0.618) % 1)
    const px = base[0] + side * (90 + sw * 220) * ease.outCubic(a / NLIFE) + Math.sin(a * 3 + i) * 22
    const py = base[1] - 60 - a * (170 + sw * 90)
    return [px, py]
  }
  function drawNotes(t) {
    if (t >= T.erupt + 0.4 || t >= T.cut2) return
    const base = [RISER.cx, riserTop(Math.min(t, T.dead)) - 180]
    const tEnd = Math.min(t, T.dead)
    const i1 = Math.floor(tEnd / NG)
    for (let i = Math.max(0, Math.floor((tEnd - NLIFE) / NG)); i <= i1; i++) {
      const born = i * NG
      if (born < 0.05) continue
      const aNow = tEnd - born
      if (aNow < 0 || aNow > NLIFE) continue
      let [px, py] = noteAt(i, aNow, base)
      let alpha = Math.min(1, aNow * 5) * (1 - prog(aNow, NLIFE - 0.5, NLIFE)), rot = Math.sin(aNow * 4 + i) * 0.2
      const col = [GOLD, PINK, SKYBLUE, '#9fe0a8'][i % 4]
      if (t >= T.dead) {
        // drop: gravity onto the boards, a little bounce, then lie there (gone at the eruption)
        const d = t - T.dead, floor = STAGE.y0 + 30 + (i % 5) * 26
        const fallT = Math.sqrt(Math.max(0, floor - py) * 2 / 2600)
        if (d < fallT) py += 0.5 * 2600 * d * d
        else { const b = d - fallT; py = floor - Math.max(0, 60 * Math.sin(Math.min(Math.PI, b * 9)) * Math.exp(-b * 3)); rot = 1.4 * (i % 2 ? 1 : -1) * clamp(b * 4) }
        alpha = Math.max(alpha, 0.85) * (1 - prog(t, T.erupt, T.erupt + 0.3))
      }
      x.save(); x.globalAlpha *= alpha
      drawNote(x, px, py, 6, i % 3 === 0 ? 2 : 1, col, rot)
      x.restore()
    }
  }

  // ── the spotlights
  function spotOn(t, which) {
    if (!setUp(t) || t >= T.cut2) return 0
    if (which === 0) return t < T.dead ? 1 : t < T.spotsOff[1] + 0.25 ? 1 : 0.85
    const on = which === 1 ? T.spot1 : T.drop
    const off = which === 1 ? T.spotsOff[0] : T.spotsOff[1]
    if (t < on) return 0
    if (t < off) return 1
    if (t < T.erupt) return 0
    return 1
  }
  function drawSpots(t) {
    if (t >= T.cut2) return
    const top = riserTop(t)
    const sweep = t >= T.erupt ? Math.sin((t - T.erupt) * 2.4) : 0
    const flick = k => (t >= T.spotsOff[0] - 0.12 && t < T.erupt && Math.floor(t * 30) % 3 === 0 && t < k) ? 0.4 : 1
    drawSpot(x, 540, 120, RISER.cx, top + 2, 170, 'rgba(255,238,196,A)', spotOn(t, 0))
    drawSpot(x, 40, 160, RISER.cx - 30 + sweep * 260, t >= T.erupt ? 1300 : top + 6, 150, 'rgba(255,110,190,A)', spotOn(t, 1) * flick(T.spotsOff[0]))
    drawSpot(x, 1040, 160, RISER.cx + 30 - sweep * 260, t >= T.erupt ? 1300 : top + 6, 150, 'rgba(110,220,255,A)', spotOn(t, 2) * flick(T.spotsOff[1]))
    // a little spot finds the crush when it says hi
    if (t >= T.hi - 0.05 && t < T.erupt) { const P = crushPlace(t); if (P) drawSpot(x, 900, 120, P[0], CRUSH_Y + 80, 110, 'rgba(255,238,196,A)', 0.7 * pop01(t, T.hi - 0.05, 0.2, 1.4) * (1 - prog(t, T.crushOut[0] + 0.4, T.crushOut[1]))) }
  }

  // ── the set
  function curtainEdges(t) {
    // [left panel's inner edge, right panel's inner edge]
    if (t < T.ret) return [102, 978]
    const p = ease.inOutCubic(prog(t, ...T.shut))
    let L = lerp(-40, 548, p), Rr = lerp(1120, 532, p)
    // the curtain parts a crack for Leo
    const gap = 26 * pop01(t, T.leoOut - 0.15, 0.3, 1.6)
    return [L - gap, Rr + gap]
  }
  function drawSetBack(t) {
    if (!setUp(t)) return
    const a = t >= T.ret ? clamp(prog(t, T.ret, T.ret + 0.25)) : 1
    x.save(); x.globalAlpha = a
    const sy = t >= T.ret ? (1 - ease.outCubic(prog(t, T.ret, T.ret + 0.45))) * 260 : 0
    x.translate(0, sy)
    drawStage(x, STAGE.y0, STAGE.y1, t, t < T.dead || t >= T.erupt ? 1 : 0.15)
    x.restore()
  }
  function drawMarq(t) {
    let y
    if (t < T.marq[0]) return
    if (t < T.cut2) y = lerp(-260, MARQ.cy, easeOutBack(prog(t, ...T.marq), 1.6))
    else if (t >= T.ret) y = lerp(-260, MARQ.cy, easeOutBack(prog(t, T.ret + 0.2, T.ret + 0.6), 1.6))
    else return
    let on = 1
    if (t >= T.dead && t < T.erupt) on = Math.floor(t * 14) % 3 === 0 && t < T.dead + 0.5 ? 0.6 : 0
    x.save(); x.globalAlpha *= popOut(t, T.out)
    // its chains
    x.fillStyle = '#5a5070'; x.fillRect(MARQ.cx - 200, y - 700, 6, 700 - MARQ.h / 2); x.fillRect(MARQ.cx + 194, y - 700, 6, 700 - MARQ.h / 2)
    drawMarquee(x, MARQ.cx, y, MARQ.w, MARQ.h, t, on)
    x.restore()
  }
  function drawSign(t) {
    if (t < T.sign[0] || t >= T.signFall[1]) return
    let cy = lerp(-200, 664, easeOutBack(prog(t, ...T.sign), 1.5))
    x.save()
    let rot = 0
    // the music dies: one rope gives, it swings, then the whole thing drops out of the flies
    if (t >= T.dead) rot = 0.4 * springStep(t - T.dead - 0.1, 9, 2.4)
    if (t >= T.signFall[0]) { const f = prog(t, ...T.signFall); cy += 1300 * f * f; rot += 1.2 * f }
    x.translate(540, cy); x.rotate(rot); x.translate(-540, -cy)
    drawKeySign(x, 540, cy, 0.84, t >= T.dead ? 0 : t)
    x.restore()
  }
  function drawRiserAt(t) {
    if (t >= T.cut2) return
    drawRiser(x, RISER.cx, riserTop(t), RISER.w, RISER.bottom)
  }
  function drawCurtains(t) {
    if (!setUp(t)) return
    const [Lx, Rx] = curtainEdges(t)
    drawCurtain(x, -1, -20, Lx, 120, 1470, t)
    drawCurtain(x, 1, Rx, 1100, 120, 1470, t)
    // tie-back tassels while open
    if (t < T.ret) {
      for (const [tx, s] of [[Lx - 34, -1], [Rx + 34, 1]]) { x.fillStyle = '#e0a53a'; x.fillRect(tx - 30, 1010, 60, 14); x.fillRect(tx - 8 + s * 14, 1024, 16, 40); x.fillStyle = '#b5740e'; x.fillRect(tx - 12 + s * 14, 1060, 24, 10) }
    }
    const vy = t >= T.ret ? lerp(-120, 150, ease.outCubic(prog(t, T.ret, T.ret + 0.4))) : 150
    drawValance(x, vy, t)
  }

  // ── Virgo, the stage manager, peeking out of the left wing (drawn before the curtains: half of it is backstage)
  function drawVirgo(t) {
    if (t < T.vir[0] || t >= T.cut2) return null
    const p = easeOutBack(prog(t, ...T.vir), 1.8)
    const P = [lerp(40, VIR_P[0], p), VIR_P[1], VIR_P[2]]
    const st = keyed(t, VIR_K)
    const r = star('vir', P, t, st, { hops: [...HOPS.vir, T.erupt + 0.05, T.erupt + 0.6], rot: lerp(-0.25, 0.08, p) })
    if (!r) return null
    drawHeadset(x, r.x, r.top, r.c)
    const flip = inW(t, T.l3, T.l3 + 0.6) ? Math.sin((t - T.l3) * 20) * 0.2 : 0
    drawClipboard(x, r.x + r.size * 0.44, r.y + r.size * 0.16, Math.max(3, r.c * 0.75), -0.14 + flip)
    return r
  }

  // ── the kick line
  function kickAng(t) {
    // the kicking leg's angle: up fast, down slower; frozen mid-kick while the music's dead
    const tt = t >= T.dead && t < T.erupt ? KICK_FREEZE : t
    let a = 0, which = 1
    for (let i = 0; i < KICKS.length; i++) {
      const k = tt - KICKS[i]
      if (k >= 0 && k < 0.5) { a = k < 0.16 ? 1.85 * ease.outCubic(k / 0.16) : 1.85 * (1 - ease.inOutQuad((k - 0.16) / 0.34)); which = i % 2 ? -1 : 1 }
    }
    return { a, which }
  }
  function drawKickLine(t) {
    if (t < T.kick[0] || t >= T.cut2) return
    const { a, which } = kickAng(t)
    KL.forEach((m, i) => {
      const t0 = T.kick[0] + i * 0.08
      const p = ease.outCubic(prog(t, t0, t0 + 0.4))
      const fromX = i < 2 ? -160 : 1240
      const px = lerp(fromX, m.x, p)
      let rot = 0
      if (m.id === 'tau' && t >= T.taurus[0] && t < T.erupt + 0.4) rot = -1.42 * ease.inCubic(prog(t, ...T.taurus)) * (1 - easeOutBack(prog(t, T.erupt, T.erupt + 0.4), 1.6))
      const frozen = t >= T.dead && t < T.erupt
      let st
      if (t < T.dead) st = S_('happy', [0, 0])
      else if (frozen) st = S_('wide', i < 2 ? [1, 1] : [-1, 1], { blink: false })
      else st = S_(i % 2 ? 'sparkle' : 'happy', [0, -1])
      if (frozen && t >= T.hi + 0.05 && t < T.hi + 0.8) st = S_('wide', [0, 1], { blink: false, sq: -0.06 })
      const hops = t < T.kick[0] + 0.6 ? [t0 + 0.4] : []
      const lift = (!frozen && a > 0) ? a * 10 : 0
      const fyy = KL_Y + KL_SZ * 0.44
      x.save()
      if (rot) { x.translate(px, fyy + 40); x.rotate(rot); x.translate(-px, -(fyy + 40)) }
      const r = drawStarChar(x, px, KL_Y - lift, KL_SZ, t, { color: m.col.color, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq || 0, hops, seed: SEED[m.id], glow: 0.8, bob: frozen ? 0 : 2 })
      const R = { ...r, c: r.size / 36 }
      const ang = a
      drawLegs(x, R, which < 0 ? ang : 0.12, which > 0 ? ang : 0.12)
      drawTopHat(x, R.x + R.c * 0.6, R.top + R.c * 2.6, Math.max(3, R.c * 1.35), (which > 0 ? 0.08 : -0.08) * (frozen ? 1 : Math.sin(t * 5.6)))
      if (i === 0 || i === 3) drawCane(x, R.x + (i ? -1 : 1) * R.size * 0.42, R.y - R.c * 2, Math.max(3, R.c * 0.8), i ? -0.35 : 0.35)
      x.restore()
    })
  }

  // ── the crush
  function crushPlace(t) {
    if (t < T.crushIn[0] || t >= T.crushOut[1]) return null
    if (t < T.crushIn[1]) return [lerp(1200, CRUSH_STOP, ease.outQuad(prog(t, ...T.crushIn))), CRUSH_Y, CRUSH_SZ]
    if (t < T.crushOut[0]) return [CRUSH_STOP, CRUSH_Y, CRUSH_SZ]
    return [lerp(CRUSH_STOP, -170, ease.inQuad(prog(t, ...T.crushOut))), CRUSH_Y, CRUSH_SZ]
  }
  const CRUSH_HOPS = [...Array.from({ length: 7 }, (_, i) => +(T.crushIn[0] + 0.1 + i * 0.3).toFixed(3)), T.hi + 0.02, ...Array.from({ length: 4 }, (_, i) => +(T.crushOut[0] + 0.05 + i * 0.27).toFixed(3))]
  function drawCrush(t) {
    const P = crushPlace(t)
    if (!P) return null
    const st = keyed(t, AQU_K)
    const r = star('aqu', P, t, st, { hops: CRUSH_HOPS })
    if (!r) return null
    // the coffee: a sip on the way in, held out on the way out
    const sip = bump(t, 19.4, 0.7)
    drawCup(x, r.x - r.size * 0.46 + sip * 20, r.y + r.size * 0.2 - sip * 40, Math.max(3, r.c * 0.9), t)
    // the wave on the way out
    if (t >= T.crushOut[0]) {
      const wv = Math.sin((t - T.crushOut[0]) * 16)
      x.fillStyle = '#efe6d6'; x.save(); x.translate(r.x + r.size * 0.42, r.y - r.size * 0.12); x.rotate(0.3 * wv)
      for (const [dx, dy] of [[-4, -22], [6, -18], [14, -10]]) x.fillRect(dx, dy, 6, 6)
      x.restore()
    }
    return r
  }

  // ── Pisces in the opera box (sobbing at the whole thing)
  function drawPisces(t) {
    if (!setUp(t)) return
    const k = t >= T.ret ? pop01(t, T.ret + 0.35, 0.4, 2) * popOut(t, T.out) : 1
    const st = keyed(t, PIS_K)
    const r = star('pis', [PIS_P[0], PIS_P[1] + (1 - Math.min(1, k)) * 60, PIS_P[2]], t, st, { pop: k, hops: [T.drop + 0.05, T.key + 0.05, T.erupt + 0.05, T.erupt + 0.6, T.roses] })
    if (r) {
      const frozen = t >= T.dead && t < T.hi + 0.1
      drawTissue(x, r.x - r.size * 0.46, r.y - r.size * 0.02 - (frozen ? 24 : 0), Math.max(3, r.c * 0.85), frozen ? 0 : t)
      const cry = [[0.4, 4.4], [T.drop, 9.2], [12.4, T.dead], [T.hi + 0.2, T.cut2], [T.ret + 0.6, T.out[0]]]
      for (const [a, b] of cry) tears(r.x, r.y, r.size, t, a, b, { gap: t >= T.erupt && t < T.cut2 ? 0.06 : 0.11, spread: 0.85 })
    }
    drawBalcony(x, BALC.x, BALC.y, BALC.w, BALC.h)
  }

  // ── bubbles: the whisper, the hi, the curtain-call hi
  function bubbleText(t, t0, t1, bx, by, bw, bh, tailX, text, font, color) {
    if (t < t0 || t >= t1) return
    const k = pop01(t, t0, 0.26, 2.2) * (1 - ease.inQuad(prog(t, t1 - 0.2, t1)))
    if (k <= 0.01) return
    x.save(); x.translate(bx + tailX, by + bh); x.scale(k, k); x.translate(-(bx + tailX), -(by + bh))
    drawBubble(x, bx, by, bw, bh, { tail: 'down', tailX, px: 5 })
    x.fillStyle = color; x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, bx + bw / 2, by + bh / 2 + 2)
    x.restore()
  }

  // ── THE STARS (tie-in)
  function drawStars(t) {
    if (t < T.starsIn || t >= T.cardOut[1]) return
    const k = pop01(t, T.starsIn, 0.36, 2.2) * (1 - ease.inQuad(prog(t, T.cardOut[0], T.cardOut[1])))
    const st = t < T.l8 ? S_('happy', [1, 1]) : t < T.soft ? S_('neutral', [1, 1], { blink: 0.4 }) : S_('wink', [1, 1])
    const r = star('stars', STARS_TIE, t, st, { pop: k, hops: HOPS.stars })
    if (r && t < T.starsIn + 0.7) sparkleRing(t, r.x, r.y, T.starsIn, 8, 100, 0.9, 0.6)
  }

  // ── the mystery card (tie-in)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function cardBack(w, h) {
    rr(-w / 2, -h / 2, w, h, 34)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#6a3fd0'); g.addColorStop(1, '#3a1d86')
    x.fillStyle = g; x.fill(); x.lineWidth = 6; x.strokeStyle = 'rgba(255,240,200,0.9)'; x.stroke()
    x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3
    const r0 = w * 0.13
    x.beginPath(); x.arc(0, 0, r0, 0, Math.PI * 2); x.stroke()
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.arc(Math.cos(a) * r0, Math.sin(a) * r0, r0, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.arc(0, 0, r0 * 2, 0, Math.PI * 2); x.stroke()
  }
  function cardFace(w, h, t) {
    const L = -w / 2, Tp = -h / 2
    x.save(); x.shadowColor = 'rgba(180,108,255,0.55)'; x.shadowBlur = 60
    rr(L, Tp, w, h, 34); x.fillStyle = '#150c2c'; x.fill(); x.restore()
    const gr = x.createLinearGradient(L, Tp, L + w, Tp + h); gr.addColorStop(0, '#ffd27a'); gr.addColorStop(0.35, '#ff6fb5'); gr.addColorStop(0.7, '#b46cff'); gr.addColorStop(1, '#7fd0f0')
    x.lineWidth = 7; x.strokeStyle = gr; rr(L, Tp, w, h, 34); x.stroke()
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `italic 500 46px ${SERIF}`; x.fillText('Mystery card', L + 34, Tp + 74)
    const pulse = 0.65 + 0.35 * Math.sin(t * 5)
    x.save(); x.shadowColor = '#7fd0f0'; x.shadowBlur = 20 + 22 * pulse
    x.beginPath(); x.arc(-L - 58, Tp + 58, 30, 0, Math.PI * 2); x.fillStyle = '#7fd0f0'; x.fill(); x.restore()
    x.font = `700 36px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#1a0e30'
    x.fillText('♒︎', -L - 58, Tp + 61)
    const ax = L + 26, ay = Tp + 100, aw = w - 52, ah = 236
    x.save(); rr(ax, ay, aw, ah, 20); x.clip()
    const g = x.createRadialGradient(ax + aw / 2, ay + ah * 0.55, 10, ax + aw / 2, ay + ah * 0.55, aw * 0.75)
    g.addColorStop(0, '#7fd0f0'); g.addColorStop(0.45, '#b46cff'); g.addColorStop(1, '#2a1a6e')
    x.fillStyle = g; x.fillRect(ax, ay, aw, ah)
    x.fillStyle = 'rgba(26,14,48,0.4)'; x.filter = 'blur(14px)'
    x.beginPath(); x.arc(ax + aw / 2, ay + ah * 0.42, aw * 0.15, 0, Math.PI * 2); x.fill()
    x.beginPath(); x.ellipse(ax + aw / 2, ay + ah * 1.02, aw * 0.34, ah * 0.36, 0, 0, Math.PI * 2); x.fill()
    x.filter = 'none'
    const vs = ((t * 0.5) % 1.4) - 0.2
    const vg = x.createLinearGradient(ax + aw * vs - 60, ay, ax + aw * vs + 60, ay + ah); vg.addColorStop(0, 'rgba(255,255,255,0)'); vg.addColorStop(0.5, 'rgba(255,255,255,0.22)'); vg.addColorStop(1, 'rgba(255,255,255,0)')
    x.fillStyle = vg; x.fillRect(ax, ay, aw, ah)
    x.font = `800 120px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = 'rgba(239,230,214,0.85)'; x.fillText('?', ax + aw / 2, ay + ah * 0.47)
    x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(127,208,240,0.7)'; rr(ax, ay, aw, ah, 20); x.stroke()
    x.font = `700 18px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = 'rgba(239,230,214,0.8)'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('NO PHOTO YET', ax + 16, ay + ah - 16)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    const ry = ay + ah + 54
    x.font = `600 34px ${SERIF}`; x.fillStyle = '#9fdcff'; x.textAlign = 'left'; x.fillText('AQUARIUS', L + 34, ry)
    x.font = `700 18px ${MONO}`; const pw = 76, pxl = -L - pw - 30
    rr(pxl, ry - 28, pw, 38, 19); x.strokeStyle = '#7fd0f0'; x.lineWidth = 2.5; x.stroke()
    x.fillStyle = '#7fd0f0'; x.textBaseline = 'middle'; x.textAlign = 'center'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('AIR', pxl + pw / 2 + 2, ry - 8)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    const qk = prog(t, T.quote, T.quote + 0.6)
    const qy = ry + 76, lines = ['“I always say', 'hi back.”']
    if (qk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const hg = x.createLinearGradient(L, 0, L + w, 0); hg.addColorStop(0, 'rgba(242,199,92,0)'); hg.addColorStop(0.5, `rgba(242,199,92,${0.22 * qk})`); hg.addColorStop(1, 'rgba(242,199,92,0)')
      x.fillStyle = hg; x.fillRect(L + 14, qy - 44, w - 28, lines.length * 56 + 26)
      x.restore()
    }
    x.font = `italic 500 52px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillStyle = BONE
    lines.forEach((ln, i) => x.fillText(ln, L + 34, qy + i * 56))
    if (qk > 0) { x.fillStyle = GOLD; lines.forEach((ln, i) => { const lw = x.measureText(ln).width, u = clamp(qk * 2 - i); if (u > 0) x.fillRect(L + 34, qy + i * 56 + 10, lw * u, 4) }) }
  }
  function drawCard(t) {
    if (t < T.deal[0] || t >= T.cardOut[1]) return
    const { cx, cy, w, h } = CARD
    const p = prog(t, ...T.deal), e = easeOutBack(p, 1.4)
    const ccx = lerp(cx + 260, cx, ease.outCubic(p)), ccy = lerp(cy + 1100, cy, e)
    const rot = lerp(0.5, 0.05, ease.outCubic(p)) + 0.012 * Math.sin(t * 1.6)
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const k = 1 - ease.inCubic(prog(t, ...T.cardOut))
    const lean = 1 + 0.05 * ease.inOutCubic(prog(t, T.quote, T.quote + 0.7))
    x.save(); x.translate(ccx, ccy); x.rotate(rot); x.scale(Math.abs(sx) * k * lean, k * lean)
    if (sx > 0) cardBack(w, h); else cardFace(w, h, t)
    x.restore()
    if (f > 0.45 && f < 1) sparkleRing(t, ccx, ccy, T.flip[0] + 0.2, 12, 330, 1)
  }

  // ── the curtain call: applause + roses
  function drawCurtainCall(t) {
    if (t < T.ret) return
    const claps = [[38.05, 220, 1180, -0.12], [38.3, 880, 1290, 0.1], [38.6, 300, 960, 0.06], [38.95, 800, 1300, -0.08], [39.3, 210, 1330, 0.1], [39.55, 880, 960, -0.1]]
    for (const [c, px, py, rot] of claps) ono('*clap*', px, py, t, c, { size: 50, rot, life: 0.9, rise: 26 })
    for (let i = 0; i < 3; i++) {
      const t0 = T.roses + i * 0.22, a = t - t0
      if (a < 0) continue
      const land = 0.55, tx = 330 + i * 150, ty = 1452 - (i % 2) * 14
      let px, py, rot
      if (a < land) { const p = a / land; px = lerp(930, tx, p); py = lerp(760, ty, p) - Math.sin(p * Math.PI) * 260; rot = p * 7 }
      else { px = tx; py = ty; rot = 1.5 + i * 0.3 }
      x.save(); x.globalAlpha *= popOut(t, T.out)
      drawRose(x, px, py, 6, rot)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        // back to front: the marquee, the sign, the boards, spot pools, Virgo + curtains, the riser + Leo, the kick line,
        // the notes, the crush, Pisces in her box, bubbles
        if (t < T.ret) drawMarq(t)
        drawSetBack(t)
        drawSpots(t)
        drawSign(t)
        drawRiserAt(t)
        if (t < T.ret) drawLeo(t)
        drawVirgo(t)
        drawCurtains(t)
        if (t >= T.ret) { drawMarq(t); drawLeo(t) }
        drawKickLine(t)
        drawNotes(t)
        drawCrush(t)
        drawPisces(t)
        drawStars(t)
        drawCard(t)
        drawCurtainCall(t)
        // the chorus echoes, the crickets, the clunks, the thud
        ono('*EXCUSE ME!*', 240, 1000, t, T.chorus[0], { size: 40, color: PINK, rot: -0.08, life: 1.3, rise: 30 })
        ono('*(EXCUSE ME!)*', 840, 980, t, T.chorus[1], { size: 40, color: SKYBLUE, rot: 0.08, life: 1.3, rise: 30 })
        ono('*scrrtch*', 760, 1180, t, T.dead, { size: 54, color: '#ffd0d8', rot: 0.1, life: 0.9, rise: 20 })
        ;[T.spotsOff[0], T.spotsOff[1]].forEach((c, i) => ono('*clunk*', [150, 930][i], 360 + 520, t, c, { size: 40, life: 0.75, rise: 18, ticks: false }))
        ono('*thud*', 300, 1290, t, T.taurus[1], { size: 44, life: 0.8, rise: 16 })
        T.crk.forEach((c, i) => ono('*chirp*', 330 + i * 70, 930 + i * 50, t, c, { size: 38, color: 'rgba(239,230,214,0.92)', life: 1.0, rise: 24, ticks: false }))
        // the whisper (the joke is how small it is), the hi, the curtain-call hi
        bubbleText(t, T.whisper, T.hi + 0.9, 652, 640, 230, 96, 40, '…hi.', `700 30px ${MONO}`, '#2a1846')
        bubbleText(t, T.hi, T.crushOut[0] + 0.45, 548, 1140, 220, 110, 112, 'hi!', `800 66px ${INTER}`, '#1f6fa8')
        bubbleText(t, T.tinyHi, T.out[0], 610, 1010, 210, 90, 34, 'hi.', `700 30px ${MONO}`, '#2a1846')
        x.restore()
        // bursts in screen space
        confetti(t, T.key + 0.02, 540, 760, 70, 2.8)
        confetti(t, T.erupt + 0.02, 300, 900, 50, 2.6, 0.8)
        confetti(t, T.erupt + 0.02, 780, 900, 50, 2.6, 0.8)
        confetti(t, T.shut[1] + 0.05, 540, 820, 60, 2.6)
        if (t >= T.drop && t < T.drop + 0.7) sparkleRing(t, MARQ.cx, MARQ.cy, T.drop, 12, 300, 0.6)
        if (t >= T.erupt && t < T.erupt + 0.7) sparkleRing(t, 540, 860, T.erupt, 14, 360, 0.2)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      box1.update(t); box2.update(t); box3.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.85 (→ spotlights), 16.0 (→ the key change, flip), 24.85 (→ hi back), 28.3 (→ the LESSON, deal),
// 33.05 (→ card first). The default selection keeps 16.0 and 28.3.
export const CUTS = [4.85, { t: T.cut1, kind: 'flip' }, 24.85, { t: T.cut2, kind: 'deal' }, 33.05]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are moved into G by the engine (written in the films' D palette); chip / brass / tom /
//    clap cues are written straight in G major.
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const G_ = { D3: 146.83, G3: 196, A3: 220, B3: 246.94, C4: 261.63, D4: 293.66, E4: 329.63, Fs4: 369.99, G4: 392, A4: 440, B4: 493.88, C5: 523.25, D5: 587.33, E5: 659.25, Fs5: 739.99, G5: 783.99, A5: 880, B5: 987.77, D6: 1174.66, G6: 1567.98 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, gap = 0.07) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const claps = (t, g = 0.16, pan = 0) => [['clap', t, { ...FX, gain: g, pan, tone: 1300 }], ['clap', +(t + 0.012).toFixed(3), { ...FX, gain: g * 0.6, pan: -pan, tone: 1050 }]]
const clunk = (t, pan = 0) => [['tom', t, 64, { ...FX, gain: 0.2, decay: 0.16, pan }], ['tick', t, 0.08], ['chip', t, 98, 0.08, { ...FX, wave: 'noise', gain: 0.03, decay: 0.05, sustain: 0 }]]
const womp = t => [['chip', t, G_.D4, 0.3, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', +(t + 0.34).toFixed(3), G_.B3, 0.7, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cricket = (t, pan = 0.5) => [0, 0.045, 0.09, 0.26, 0.305, 0.35].map(d => ['pop', +(t + d).toFixed(3), 4186, 0.022, pan])
const snareRoll = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.045) out.push(['snare', +t.toFixed(3), { ...FX, gain: 0.04 + 0.1 * ((t - t0) / (t1 - t0)), decay: 0.07, tone: 200 }]); return out }
const cheers = (t0, t1, n = 16) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', +(t0 + 0.1 + k * 0.11 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.08, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), +(f * (1 - i * 0.06)).toFixed(2), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.018, decay: 0.08, sustain: 0.5 }])
const tap = (t, pan = 0) => [['tick', t, 0.05], ['rim', t, { ...FX, gain: 0.06, pan }]]
const stab = (t, freqs, len = 0.35, gain = 0.03) => [['brass', t, freqs, len, { gain, bus: 'sfx', rev: 0.2 }]]
/** real silence in the score: a tape stop at t0, then more stops chained over its own silent tail until `until` */
function silence(t0, len, until) {
  const out = [['tapeStop', t0, len]]
  let q0 = t0 + len * 0.84, q = len * 0.16
  while (q0 + q < until - 1e-3) { const L = Math.min(2.5 * q, until - q0); out.push(['tapeStop', +q0.toFixed(4), +L.toFixed(4)]); q = L; q0 = +(q0 + L * 0.84).toFixed(4) }
  return out
}
const PITCH = { [SLEO]: 900, [SVIR]: 1180, [SS]: 760 }
// the notes clinking on the boards (one tick each, as they land)
const CLINKS = [0.22, 0.29, 0.34, 0.41, 0.47, 0.55, 0.62].map((d, i) => ['pop', +(T.dead + d).toFixed(3), [2349, 2637, 2093, 2794, 2349, 3136, 2637][i], 0.018, ((i * 0.37) % 1) - 0.5])
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // 1 · the hook
  ...head(T.h0, 6, T.h0Land, 0, 0.026, 0.08),
  ...stab(0.05, [G_.G4, G_.B4, G_.D5], 0.5, 0.028),
  // 2 · spotlights: clunk, clunk + the marquee drops (the drop)
  ...clunk(T.spot1, -0.5), ['whoosh', T.marq[0], 0.35, 0.05], ...clunk(T.drop, 0.5), ['tom', T.drop, 80, { ...FX, gain: 0.22, decay: 0.3 }],
  ...stab(T.drop, [G_.G4, G_.B4, G_.D5, G_.G5], 0.45, 0.034), ['glitter', T.drop, T.drop + 0.7],
  ...head(T.h1, 1, T.drop, 2),
  ['whoosh', T.vir[0], 0.25, 0.03], ['pop', T.vir[1], 1046.5, 0.03, -0.5],
  ...sob(4.6, G_.G5, 2),
  // 3 · the kick line hops in, then taps every kick
  ...head(T.h2, 2, T.h2Land, 4),
  ['whoosh', T.kick[0], 0.4, 0.05], ...[0, 1, 2, 3].map(i => ['pop', +(T.kick[0] + i * 0.08 + 0.4).toFixed(3), NOTE[(i * 2) % 7], 0.025, -0.5 + i * 0.33]),
  ...KICKS.slice(0, 15).flatMap((k, i) => tap(k, i % 2 ? 0.3 : -0.3)),
  ...stab(T.chorus[0], [G_.D5, G_.G5], 0.25, 0.022), ...stab(T.chorus[1], [G_.E5, G_.A5], 0.25, 0.022),
  // 4 · the key change: brass pickup (V) → the big chord, the riser, confetti
  ...stab(BEAT(27), [G_.D4, G_.Fs4, G_.A4, G_.D5], 0.3, 0.03), ...stab(BEAT(27.5), [G_.E4, G_.G4, G_.B4, G_.E5], 0.28, 0.03),
  ...stab(T.key, [G_.G4, G_.B4, G_.D5, G_.G5], 0.9, 0.04), ['boom', T.key, 0.12], ['glitter', T.key, T.key + 1.0],
  ...head(T.h3, 2, T.h3Land, 1, 0.022, 0.08),
  ['whoosh', T.sign[0] + 0.05, 0.4, 0.05], ['tom', T.sign[1], 90, { ...FX, gain: 0.14, decay: 0.2 }],
  ['chip', T.rise[0], G_.G4, 0.5, { ...FX, wave: 'square', duty: 0.25, slide: 12, gain: 0.03, decay: 0.3, sustain: 0.6 }],
  ...sob(17.6, G_.B5, 3),
  // 5 · the crush walks by: the music cuts DEAD
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', +(T.crushIn[0] + 0.1 + i * 0.3).toFixed(3), 0.03]),
  ['chip', T.dead - 0.02, 1400, 0.22, { ...FX, wave: 'noise', slide: -30, gain: 0.05, decay: 0.12, sustain: 0.3 }],
  ['chip', T.dead, G_.D5, 0.2, { ...FX, wave: 'square', slide: -24, gain: 0.03, decay: 0.12, sustain: 0.2 }],
  ...silence(T.dead, 0.18, T.roll[0]),
  ...CLINKS, ['whoosh', T.signFall[0], 0.4, 0.04], ['tom', T.signFall[1], 52, { ...FX, gain: 0.2, decay: 0.35 }],
  ...clunk(T.spotsOff[0], -0.5), ...clunk(T.spotsOff[1], 0.5),
  ...head(T.h4, 2, T.h4Land, 3, 0.02, 0.12),
  ['whoosh', T.taurus[0] + 0.1, 0.4, 0.03], ['tom', T.taurus[1], 58, { ...FX, gain: 0.18, decay: 0.3 }],
  ...cricket(T.crk[0]), ...cricket(T.crk[1], -0.4),
  ['pop', T.whisper, 1318.51, 0.012, 0.3],            // the tiniest blip
  ['pop', T.hi, 880, 0.04, 0.2], ['pop', T.hi + 0.07, 1174.66, 0.04, 0.2], ['bell', T.hi + 0.1, 1760, 0.02, 1.0, 0.2],
  ...[0, 1, 2, 3].map(i => ['tick', +(T.crushOut[0] + 0.05 + i * 0.27).toFixed(3), 0.03]),
  ...snareRoll(T.roll[0], T.roll[1]),
  // 6 · they said hi back: everything erupts
  ...head(T.h5, 2, T.erupt, 5),
  ...stab(T.erupt, [G_.G4, G_.B4, G_.D5, G_.G5], 0.9, 0.045), ['boom', T.erupt, 0.14], ['glitter', T.erupt, T.erupt + 0.9],
  ...cheers(T.erupt + 0.05, T.erupt + 2.2),
  ...sob(T.erupt + 0.3, G_.G6), ...sob(T.erupt + 0.9, G_.D6),
  ...KICKS.slice(15).flatMap((k, i) => tap(k, i % 2 ? 0.3 : -0.3)),
  // 7 · the lesson
  ...lessonCues(LESSON.at, { text: LESSON.text, chip: LESSON.chip, key: KEY }),
  // 8 · card first, face last
  ['whoosh', T.deal[0], 0.45, 0.05], ['tick', T.flip[0] + 0.15, 0.07], ['bell', T.flip[1], 1318.51, 0.035, 1.4, 0], ['glitter', T.flip[0] + 0.15, T.flip[1] + 0.4],
  ...head(T.h6, 3, T.h6Land, 4),
  ['whoosh', T.starsIn, 0.3, 0.04], ['bell', T.starsIn + 0.2, 1567.98, 0.025, 1.0, -0.3],
  ['glitter', T.quote, T.quote + 0.6], ['pluck', T.quote + 0.1, 1567.98, 0.03, 0.6, 0.2],
  ['bell', T.soft, 1760, 0.025, 1.4, -0.2],
  // 9 · curtain, applause, hi
  ['whoosh', T.shut[0], 0.6, 0.06], ['tom', T.shut[1], 72, { ...FX, gain: 0.16, decay: 0.3 }],
  ...head(T.h7, 2, T.h7Land, 1, 0.026, 0.14),
  ...stab(T.h7Land, [G_.G4, G_.B4, G_.D5, G_.G5], 0.7, 0.03),
  ...cheers(37.95, 39.7, 14),
  ['pop', T.leoOut + 0.1, 1046.5, 0.03, 0], ['pop', T.tinyHi, 1318.51, 0.012, 0.2],
  ...[0, 1, 2].map(i => ['whoosh', +(T.roses + i * 0.22).toFixed(3), 0.3, 0.02]),
  ...sob(T.ret + 0.7, G_.G5), ...sob(39.2, G_.B5),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }), ...talkCues(LINES3, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
