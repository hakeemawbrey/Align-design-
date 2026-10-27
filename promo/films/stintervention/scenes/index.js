// stintervention — "The Intervention" (60 s vertical Align ad, Star Talk season 2 #4). Story 0–55.6, then the shared end card.
//   A circle of stars on folding chairs under a hand-painted "WE LOVE YOU ♥" banner. The front chair is empty: it's yours.
//   0.0–4.2   "The sky staged | an *intervention.*"  The camera pushes into the empty chair (taped sign: YOU ♥). ♑ CAPRICORN
//             blows its whistle (the drop) and everyone flinches. CAP: "Sit down. This is about your 'type.'"
//   4.2–10    "Exhibit *A.*"  Whip to ♍ VIRGO and its clipboard. "You said 'he's different.'" A record scratch, the music
//             sags, crickets: the whole circle stares at you. "He was *not* different." A red ✕ stamps the clipboard.
//  10.05      card cut.
//  10–16     "Exhibit *B.*"  ♏ SCORPIO slides over a photo-booth strip: the same guy, the same shades, four haircuts.
//             "Same person. Four haircuts." The marker circles the shades, one by one.
//  16–22     "Exhibit *C.*"  ♒ AQUARIUS, flat eyes, a guitar case by its chair. "The guy with the band. Again." The case
//             rattles out a tiny riff… womp. Everyone droops.
//  22–28     "Okay. | *Leo's* crying."  ♌ LEO wells up, leaps onto your empty chair and hugs it, tears fountaining:
//             "WE JUST WANT YOU TO BE LOVED RIGHT." A whistle tweet; Leo freezes and hops back to its seat.
//  28.1       card cut.
//  28–34     "Okay. | *Homework.*"  Capricorn holds up a glowing card: "Write down what you won't do again." The card flies
//             to you and flips: YOUR CARD, three empty dealbreaker slots. The circle scrambles to peek around it.
//  34–42     "What ends it | before it *starts?*"  Drumroll. Three chips stamp on, one per beat, the circle nodding at each:
//             ✕ NOT READY FOR A LABEL · ✕ ONLY TEXTS AFTER 11PM · ✕ "I DON'T DO FEELINGS". CAP: "Now it's on your card. Day one."
//  42.1       card cut.
//  42–47     "Group *hug.*"  Five stars squash into one glowing pile around your chair. ♓ PISCES walks in late with popcorn:
//             "sorry i'm late, i brought sn—", sees the hug, drops the popcorn and sobs.
//  47–52     ★ LESSON UNLOCKED: "If it keeps hurting, it's not your type. It's a *pattern.*" (+1 SELF-RESPECT)
//  52–55.6   "Meeting | *adjourned.*"  THE STARS: "New type: someone who's good to you." A last whistle tweet. All pop out by 55.5.
// One canvas (sky + camera-moved stage + screen-space props), DOM type + the dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { drawFoldingChair, drawChairSeat, drawYouSign, drawWhistle, drawClipboard, drawCrown, drawGuitarCase, drawPopcorn, drawSpill,
  drawTear, drawPhotoFrame, drawBanner, pixelPanel, bitmap, drawPixelHeart } from './props.js'

export const DURATION = 60
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 55.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff5c7a'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  h0: 0.15, h0Land: 0.95, h0Out: [4.02, 4.2],
  spot: 0.42, push: [0.6, 3.6], whistle: BEAT(2), l1: 2.2,
  whip1: [4.22, 4.55], h1: 4.38, h1Land: 4.62, clip: 4.62, l2: 5.3, scratch: 7.05, stare: 7.1, crickets: [7.45, 7.95], l3: BEAT(14), strike: 9.62, nodA: 9.75, h1Out: [9.82, 10.0],
  cut1: 10.05,
  h2: 10.18, h2Land: 10.42, strip: [10.5, 11.0], shots: [11.05, 11.3, 11.55, 11.8], l4: 12.0, circles: [13.75, 14.05, 14.35, 14.65], gasp: 14.95, stripOut: [15.5, 15.85], h2Out: [15.75, 15.92],
  whip2: [16.0, 16.32], h3: 16.15, h3Land: 16.4, l5: 16.9, riff: 18.95, womp: BEAT(35), roll: 21.0, h3Out: [21.75, 21.92],
  whip3: [22.02, 22.36], h4: 22.15, h4Land: 22.65, well: 22.3, leap: [22.95, 23.4], l6: 23.45, misty: 25.2, tweet: 26.35, freeze: [26.4, 27.0], back: [27.0, 27.45], h4Out: [27.75, 27.92],
  cut2: 28.1,
  h5: 28.22, h5Land: 28.62, cardUp: 28.55, l7: 29.1, fly: [31.55, 32.45], flip: [32.5, 32.95], scurry: 32.55, h5Out: [33.45, 33.62],
  h6: 33.72, h6Land: 34.15, roll2: [34.05, BEAT(62)], stamps: [BEAT(62), BEAT(65), BEAT(68)], l8: 39.3, wink: [40.7, 41.3], h6Out: [41.7, 41.88],
  cut3: 42.1,
  h7: 42.22, h7Land: 42.5, pile: 42.12, squeeze: [43.0, 44.4], pisIn: [43.55, 44.85], l9: 44.25, pisSee: 45.25, drop: 45.45, sob: 45.6, close1: 46.75, h7Out: [46.6, 46.8],
  lesson: 47.0, banner: 47.08, lText: 47.55, plus: 48.7, lessonOut: [51.75, 52.0],
  h8: 52.1, h8Land: 52.55, l10: 52.2, pisHop: [52.3, 52.75], tweet2: 54.15, close2: 55.22, out: [55.0, 55.45], h8Out: [55.2, 55.42],
}

const S = id => signStar(id)
const CAP = S('capricorn'), VIR = S('virgo'), SCO = S('scorpio'), AQU = S('aquarius'), LEO = S('leo'), PIS = S('pisces')
const NAME = { cap: '♑ CAPRICORN', vir: '♍ VIRGO', sco: '♏ SCORPIO', aqu: '♒ AQUARIUS', leo: '♌ LEO', pis: '♓ PISCES' }
const LINES1 = [
  { t: T.l1, speaker: NAME.cap, color: CAP.color, text: "Sit down. This is about your *'type.'*" },
  { t: T.l2, speaker: NAME.vir, color: VIR.color, text: "You said *'he's different.'*" },
  { t: T.l3, speaker: NAME.vir, color: VIR.color, text: 'He was *not* different.' },
  { t: T.l4, speaker: NAME.sco, color: SCO.color, text: 'Same person. *Four haircuts.*' },
  { t: T.l5, speaker: NAME.aqu, color: AQU.color, text: 'The guy with the band. *Again.*' },
  { t: T.l6, speaker: NAME.leo, color: LEO.color, text: 'WE JUST WANT YOU TO BE *LOVED RIGHT.*' },
  { t: T.l7, speaker: NAME.cap, color: CAP.color, text: "Write down what you *won't* do again." },
  { t: T.l8, speaker: NAME.cap, color: CAP.color, text: "Now it's on your card. *Day one.*" },
  { t: T.l9, speaker: NAME.pis, color: PIS.color, text: "sorry i'm late, i brought *sn—*" },
]
const LINES2 = [{ t: T.l10, speaker: 'THE STARS', color: GOLD, text: "New type: someone who's *good to you.*" }]
const CPS = 28
export const LT1 = lineTimes(LINES1, { cps: CPS }), LT2 = lineTimes(LINES2, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
const inW = (t, a, b) => t >= a && t < b
/** a quick nod: down-and-up, k 0…1 */
const nodK = (t, t0, d = 0.42) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(k / d * Math.PI) }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '60px', width: (W - 120) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// ── the stage (world coords; the camera maps (fx, fy) to screen (540, 1000) at scale s)
const CHAIR = { x: 540, y: 1255, size: 300 }               // the empty chair (seen from behind): seat line y
const SEATS = { cap: [540, 800, 200], sco: [318, 885, 180], vir: [762, 885, 180], leo: [150, 1075, 180], aqu: [928, 1075, 180] }
const PEEK = { leo: [122, 660, 140], sco: [122, 975, 140], aqu: [122, 1290, 140], vir: [958, 720, 150], cap: [958, 1090, 160] }
const PILE = { leo: [372, 1005, 200], aqu: [708, 1005, 200], sco: [458, 852, 190], vir: [622, 852, 190], cap: [540, 1030, 210] }
const PIS_STOP = [872, 1225, 190], PIS_TOP = [540, 712, 165]
const HUG = [540, 962, 214]
const COL = { cap: CAP, vir: VIR, sco: SCO, aqu: AQU, leo: LEO, pis: PIS }
const SEED = { cap: 3, vir: 11, sco: 7, aqu: 17, leo: 13, pis: 23 }
const CASE = { x: 1046, y: 1254 }

// camera keys: [t, s, fx, fy]; consecutive keys tween (inOutCubic); a key 0.001 s after another = a hard cut
const CAM = [
  [0, 1, 540, 1000], [T.push[0], 1, 540, 1000], [T.push[1], 1.14, 540, 1000], [T.whip1[0], 1.15, 540, 1000],
  [T.whip1[1], 1.45, 762, 935], [T.cut1 - 0.001, 1.52, 762, 935],
  [T.cut1, 1.45, 318, 955], [T.whip2[0], 1.5, 318, 955],
  [T.whip2[1], 1.7, 960, 1060], [T.whip3[0], 1.78, 960, 1060],
  [T.whip3[1], 1.12, 400, 1060], [T.leap[1], 1.14, 400, 1060], [24.3, 1.4, 540, 1000], [T.back[0], 1.42, 540, 1000], [T.back[1], 1.15, 400, 1060], [T.cut2 - 0.001, 1.16, 400, 1060],
  [T.cut2, 1.4, 540, 862], [T.fly[0], 1.45, 540, 862], [T.fly[1], 1, 540, 1000],
  [T.cut3, 1, 540, 1000], [T.lesson, 1.07, 540, 1060], [T.out[1], 1.02, 540, 1020],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const fast = d < 0.5, e = (fast ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}
const toScreen = (C, x, y) => [540 + (x - C.fx) * C.s, 1000 + (y - C.fy) * C.s]

// talk hops
const HOPS = {}
for (const id of Object.keys(NAME)) HOPS[id] = talkHops(LINES1, NAME[id], { cps: CPS })

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 82px Inter", "800 40px Inter", "italic 500 190px 'EB Garamond'", "italic 500 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'The sky staged | an *intervention.*', { top: 190, size: 104, accentSize: 140, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const H1 = popText(root, 'Exhibit *A.*', { top: 200, size: 128, accentSize: 180, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: VIR.color })
  const H2 = popText(root, 'Exhibit *B.*', { top: 200, size: 128, accentSize: 180, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: SCO.color })
  const H3 = popText(root, 'Exhibit *C.*', { top: 200, size: 128, accentSize: 180, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: AQU.color })
  const H4 = popText(root, 'Okay. | *Leo’s* crying.', { top: 190, size: 112, accentSize: 156, at: T.h4, late: 2, lateAt: T.h4Land, lateGap: 0.16, wobble: true, accentColor: LEO.color })
  const H5 = popText(root, 'Okay. | *Homework.*', { top: 190, size: 112, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CAP.color })
  const H6 = popText(root, 'What ends it | before it *starts?*', { top: 190, size: 96, accentSize: 136, at: T.h6, late: 1, lateAt: T.h6Land, wobble: true, gap: 0.07, accentColor: RED })
  const H7 = popText(root, 'Group *hug.*', { top: 200, size: 128, accentSize: 180, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, accentColor: PINK })
  const H8 = popText(root, 'Meeting | *adjourned.*', { top: 190, size: 112, accentSize: 160, at: T.h8, late: 1, lateAt: T.h8Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out], [H8, T.h8Out]]
  const LESSON = popText(root, 'If it keeps hurting, | it’s not your type. | It’s a *pattern.*', { top: 786, size: 84, accentSize: 134, at: T.lText, late: 1, lateAt: T.lText + 0.85, wobble: true, gap: 0.075, accentColor: GOLD, lineHeight: 1.12 })
  const box1 = dialogueBox(root, { lines: LINES1, y: 1480, width: 960, height: 300, open: T.l1 - 0.25, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1480, width: 960, height: 300, open: T.l10 - 0.25, close: T.close2, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── who is where (world coords) and how they feel
  function place(id, t) {
    const seat = SEATS[id]
    if (id === 'pis') {
      if (t < T.pisIn[0]) return null
      if (t < T.pisIn[1]) { const p = prog(t, ...T.pisIn); return { p: [lerp(1220, PIS_STOP[0], ease.outCubic(p)), PIS_STOP[1], PIS_STOP[2]], layer: 'front' } }
      if (t < T.pisHop[0]) return { p: PIS_STOP, layer: 'front' }
      const p = prog(t, ...T.pisHop), e = ease.inOutCubic(p)
      return { p: [lerp(PIS_STOP[0], PIS_TOP[0], e), lerp(PIS_STOP[1], PIS_TOP[1], e) - Math.sin(p * Math.PI) * 200, lerp(PIS_STOP[2], PIS_TOP[2], e)], layer: p < 1 ? 'front' : 'pile' }
    }
    if (t >= T.cut3) return { p: PILE[id], layer: 'pile' }
    if (t >= T.scurry) {
      const i = ['leo', 'sco', 'aqu', 'vir', 'cap'].indexOf(id), t0 = T.scurry + i * 0.07, p = prog(t, t0, t0 + 0.42), e = ease.inOutCubic(p)
      if (p <= 0) return { p: seat, layer: 'seat' }
      const P = PEEK[id]
      return { p: [lerp(seat[0], P[0], e), lerp(seat[1], P[1], e) - Math.sin(p * Math.PI) * 120, lerp(seat[2], P[2], e)], layer: 'front' }
    }
    if (id === 'leo' && t >= T.leap[0] && t < T.back[1]) {
      if (t < T.leap[1]) { const p = prog(t, ...T.leap), e = ease.inOutQuad(p); return { p: [lerp(seat[0], HUG[0], e), lerp(seat[1], HUG[1], e) - Math.sin(p * Math.PI) * 260, lerp(seat[2], HUG[2], e)], layer: 'front' } }
      if (t < T.back[0]) {
        // clutching the chair back: a little sob-shudder, sliding down a touch
        const sl = ease.inOutQuad(prog(t, 25.0, 26.3)) * 26
        return { p: [HUG[0] + Math.sin(t * 40) * 2.5, HUG[1] + sl, HUG[2]], layer: 'hug' }
      }
      const p = prog(t, ...T.back), e = ease.inOutQuad(p)
      return { p: [lerp(HUG[0], seat[0], e), lerp(HUG[1] + 26, seat[1], e) - Math.sin(p * Math.PI) * 180, lerp(HUG[2], seat[2], e)], layer: 'front' }
    }
    return { p: seat, layer: 'seat' }
  }

  // the looks: toward a world point from a world point (pupils snap to −1/0/1)
  const toward = (from, tx, ty) => [Math.abs(tx - from[0]) > 60 ? Math.sign(tx - from[0]) : 0, Math.abs(ty - from[1]) > 120 ? Math.sign(ty - from[1]) : 0]
  const YOU = [540, 1500]   // "you": the empty chair's sitter, just below the camera
  function mood(id, t, P) {
    let m = 'neutral', look = [0, 0], blink, sq = 0, dy = 0
    const st = (mm, lk, o = {}) => ({ mood: mm, look: lk, blink: o.blink, sq: o.sq || 0, dy: o.dy || 0 })
    // the opening chatter: everyone glancing round the circle
    if (t < T.whistle) {
      if (id === 'cap') return st(t < 1.2 ? 'neutral' : 'squint', t < 1.2 ? [1, 0] : [0, 1])
      const nb = { sco: [540, 800], vir: [540, 800], leo: [318, 885], aqu: [762, 885] }[id]
      return st(t < 0.9 ? 'happy' : 'neutral', toward(P, ...nb))
    }
    // the whistle: a flinch
    if (t < T.whistle + 0.45 && id !== 'cap') { const k = 1 - prog(t, T.whistle, T.whistle + 0.45); return st('wide', [0, -1], { sq: -0.14 * k, dy: -16 * k, blink: false }) }
    if (t < T.whip1[0]) {
      if (id === 'cap') return st(t < T.l1 ? 'wide' : 'squint', [0, 0])
      return st('neutral', [0, 0])
    }
    // ── exhibit A (Virgo)
    if (t < T.cut1) {
      if (t >= T.stare && t < T.l3) return st(id === 'vir' ? 'squint' : 'neutral', [0, 0], { blink: false })           // the silent stare
      const nk = nodK(t, T.nodA + (id.length % 3) * 0.05)
      if (id === 'vir') {
        if (t < T.l2) return st('neutral', [-1, 1])
        if (t < T.scratch) return st('neutral', [0, 0])
        if (t < T.strike) return st('squint', [0, 0])
        return st('happy', [0, 0], { sq: 0.1 * nk, dy: 10 * nk })
      }
      if (nk > 0) return st('happy', [0, 1], { sq: 0.12 * nk, dy: 12 * nk })
      return st(t > T.strike ? 'happy' : 'neutral', toward(P, ...SEATS.vir))
    }
    // ── exhibit B (Scorpio)
    if (t < T.whip2[0]) {
      if (id === 'sco') return st(t < T.l4 ? 'squint' : t < T.circles[0] ? 'neutral' : 'squint', t < T.l4 ? [1, 1] : t < T.circles[0] ? [0, 0] : [1, 1])
      if (t >= T.gasp) return st('wide', [0, 1], { blink: false })
      return st('neutral', toward(P, 540, 1300))
    }
    // ── exhibit C (Aquarius)
    if (t < T.whip3[0]) {
      const droop = t >= T.womp ? ease.outCubic(prog(t, T.womp, T.womp + 0.3)) : 0
      if (id === 'aqu') {
        if (t >= T.roll && t < T.roll + 0.8) return st('eyeroll', [0, -1], { sq: 0.1 * droop, dy: 8 * droop })
        return st('neutral', t >= T.riff && t < T.womp ? [1, 0] : [0, 0], { blink: 0.55, sq: 0.1 * droop, dy: 8 * droop })
      }
      if (t >= T.riff && t < T.womp) return st('wide', toward(P, CASE.x, CASE.y - 100))
      if (droop > 0) return st('neutral', [0, 1], { blink: 0.55, sq: 0.12 * droop, dy: 10 * droop })
      return st('neutral', toward(P, ...SEATS.aqu))
    }
    // ── Leo
    if (t < T.cut2) {
      if (id === 'leo') {
        if (t < T.leap[0]) return st('sparkle', [0, 0], { sq: 0.03 * Math.sin(t * 60) * prog(t, T.well, T.leap[0]) })
        if (t < T.leap[1]) return st('wide', [0, -1], { blink: false })
        if (t >= T.freeze[0] && t < T.freeze[1]) return st('wide', [0, 0], { blink: false })
        if (t >= T.back[0]) return st('neutral', [-1, 0])
        return st('sparkle', [0, 0])
      }
      if (t < T.leap[0]) return st('neutral', toward(P, ...SEATS.leo))
      if (t >= T.freeze[0] && t < T.freeze[1]) return st(id === 'cap' ? 'squint' : 'wide', id === 'cap' ? toward(P, ...HUG) : toward(P, ...HUG), { blink: false })
      if (t < T.misty) return st('wide', toward(P, ...HUG))
      return st('sparkle', toward(P, ...HUG))
    }
    // ── homework (Capricorn hands you the card)
    if (t < T.scurry) {
      if (id === 'cap') return st(t < T.l7 ? 'happy' : t < T.fly[0] ? 'neutral' : 'sparkle', t < T.l7 ? [1, -1] : [0, 0])
      if (id === 'leo') return st('neutral', [1, -1], { blink: 0.4 })     // sniffling
      if (t >= T.fly[0]) return st('wide', [0, 0])
      return st('neutral', toward(P, 626, 760))
    }
    // ── the dealbreaker card: they peek round it, nodding at each stamp
    if (t < T.cut3) {
      const side = P[0] < 540 ? 1 : -1
      let nk = 0
      for (const s of T.stamps) nk = Math.max(nk, nodK(t, s + 0.18 + (id.length % 2) * 0.05, 0.5))
      if (nk > 0) return st('happy', [side, 1], { sq: 0.14 * nk, dy: 14 * nk })
      if (T.stamps.some(s => t >= s - 0.02 && t < s + 0.18)) return st('wide', [side, 0], { blink: false })
      if (id === 'cap' && t >= T.wink[0] && t < T.wink[1]) return st('wink', [0, 0])
      if (t >= T.l8) return st(id === 'cap' ? 'happy' : 'sparkle', [side, 0])
      return st('neutral', [side, 0])
    }
    // ── group hug
    if (id === 'pis') {
      if (t < T.pisSee) return st('happy', [-1, 0])
      if (t < T.drop) return st('wide', [-1, 0], { blink: false })
      if (t < T.pisHop[0]) return st('sparkle', [-1, 0], { sq: 0.04 * Math.sin(t * 50) })
      return st(t < T.pisHop[1] ? 'wide' : 'sparkle', [0, 0])
    }
    const sqz = Math.max(0, Math.sin((t - T.squeeze[0]) * 4.4)) * (inW(t, T.squeeze[0], T.squeeze[1]) ? 1 : 0)
    if (t < T.lesson) {
      if (t >= T.pisSee && t < T.lesson) return st('wide', [1, 0], { blink: false })
      return st(id === 'cap' || id === 'leo' ? 'heart' : 'happy', [0, 0], { sq: 0.1 + 0.08 * sqz })
    }
    if (t < T.h8) return st('sparkle', [0, 0], { sq: 0.08 })
    if (id === 'cap' && t >= T.tweet2 - 0.1 && t < T.tweet2 + 0.5) return st('squint', [0, 0], { sq: -0.06 })
    return st('happy', [0, 0], { sq: 0.06 })
  }

  // ── tears: drops arc out of both eyes from t0 on, every `gap` s (pure f(t))
  function tears(cx, cy, size, t, t0, t1, { gap = 0.1, spread = 1, life = 0.62 } = {}) {
    if (t < t0) return
    const px = Math.max(3, size / 34)
    for (const side of [-1, 1]) {
      const ex = cx + side * size * 0.13, ey = cy + size * 0.04
      const k0 = Math.max(0, Math.floor((t - life - t0) / gap)), k1 = Math.floor((Math.min(t, t1) - t0) / gap)
      for (let k = k0; k <= k1; k++) {
        const born = t0 + k * gap, a = t - born
        if (a < 0 || a > life) continue
        const vx = side * (130 + ((k * 37) % 5) * 28) * spread, vy = -(170 + ((k * 53) % 4) * 40)
        drawTear(x, ex + vx * a, ey + vy * a + 900 * a * a, px)
      }
    }
  }

  // ── a star (with its props)
  function drawCast(id, t, P, C) {
    const [px0, py0, sz] = P.p
    let pk = 1
    if (t >= T.cut3 && t < T.cut3 + 0.5 && id !== 'pis') pk = pop01(t, T.cut3 + 0.04 + 0.04 * Object.keys(PILE).indexOf(id), 0.34, 2.4)
    if (id === 'pis' && t < T.pisIn[1]) pk = 1
    const ok = popOut(t, [T.out[0] + 0.05 * (SEED[id] % 5), T.out[1]])
    if (ok <= 0 || pk <= 0.02) return
    const st = mood(id, t, [px0, py0])
    const hops = [...(HOPS[id] || [])]
    if (id === 'pis') for (let h = T.pisIn[0]; h < T.pisIn[1] - 0.1; h += 0.3) hops.push(h)
    if (id === 'leo') hops.push(T.leap[1], T.back[1])
    hops.push(T.scurry + 0.42 + 0.07 * ['leo', 'sco', 'aqu', 'vir', 'cap'].indexOf(id), T.h8Land + (SEED[id] % 3) * 0.06)
    const r = drawStarChar(x, px0, py0 + st.dy, sz, t, { color: COL[id].color, glyph: sz >= 120 ? COL[id].glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.sq, hops, seed: SEED[id], pop: pk * ok, glow: 0.9, bob: sz * 0.03 })
    const cs = sz * pk * ok
    // props
    if (id === 'leo') drawCrown(x, r.x + cs * 0.02, r.top + cs * 0.1, Math.max(3, cs / 34))
    if (id === 'cap') {
      const blowing = [T.whistle, T.tweet, T.tweet2].some(b => inW(t, b - 0.12, b + 0.55))
      const showW = t < T.cardUp || blowing || t >= T.h8
      if (showW && ok > 0.3) {
        const bk = Math.max(...[T.whistle, T.tweet, T.tweet2].map(b => inW(t, b, b + 0.55) ? Math.sin(Math.PI * prog(t, b, b + 0.55)) : 0))
        drawWhistle(x, r.x - cs * 0.47 + bk * 6, r.y - cs * 0.06, Math.max(3, cs / 30), { blow: bk })
      }
    }
    if (id === 'vir' && t >= T.clip && t < T.cut1 + 0.2) {
      const k = pop01(t, T.clip, 0.36, 2.2)
      const strike = prog(t, T.strike, T.strike + 0.16)
      drawClipboard(x, r.x - cs * 0.62, r.y + cs * 0.04 - (1 - k) * 40, Math.max(3, cs / 27) * k, { strike, rot: -0.14 + 0.05 * Math.sin(t * 2), page: prog(t, T.l3 - 0.2, T.l3) })
    }
    if (id === 'pis' && t < T.drop + 0.6) {
      const dk = prog(t, T.drop, T.drop + 0.45)
      drawPopcorn(x, r.x - cs * 0.55, r.y + cs * 0.06 + ease.inQuad(dk) * 170, Math.max(3, cs / 22), { tilt: -0.15 - dk * 1.6 })
    }
    if (id === 'pis') drawSpill(x, px0 - sz * 0.5, py0 + 160, Math.max(3, sz / 30), prog(t, T.drop + 0.35, T.drop + 1.0), 3)
    // tears
    if (id === 'leo') tears(r.x, r.y, cs, t, T.leap[1] - 0.1, T.freeze[0], { gap: 0.07, spread: 1.15 })
    if (id === 'leo' && t >= T.well && t < T.leap[0]) { const k = prog(t, T.well, T.well + 0.4); drawTear(x, r.x - cs * 0.13, r.y + cs * 0.12 + k * 14, Math.max(3, cs / 34)); drawTear(x, r.x + cs * 0.13, r.y + cs * 0.12 + k * 10, Math.max(3, cs / 34)) }
    if (id === 'leo' && t >= T.cut2 && t < T.scurry) drawTear(x, r.x + cs * 0.13, r.y + cs * 0.1 + ((t * 0.8) % 1) * 30, Math.max(3, cs / 34))
    if (id === 'pis') tears(r.x, r.y, cs, t, T.sob, 99, { gap: 0.08, spread: 1 })
    if (st.mood === 'sparkle' && id !== 'leo' && id !== 'pis' && t >= T.misty && t < T.cut2) drawTear(x, r.x - cs * 0.13, r.y + cs * 0.1 + ((t * 0.7 + SEED[id] * 0.3) % 1) * 26, Math.max(3, cs / 34))
    return r
  }

  // ── the set
  function drawRug(t) {
    x.save()
    x.fillStyle = 'rgba(201,166,255,0.08)'; x.beginPath(); x.ellipse(540, 1150, 500, 175, 0, 0, Math.PI * 2); x.fill()
    x.strokeStyle = 'rgba(239,230,214,0.18)'; x.lineWidth = 4; x.setLineDash([18, 14]); x.beginPath(); x.ellipse(540, 1150, 470, 160, 0, 0, Math.PI * 2); x.stroke()
    x.setLineDash([]); x.restore()
  }
  function drawSpot(t) {
    const k = t < T.spot ? 0 : clamp((t - T.spot) / 0.06) * (t < T.spot + 0.25 ? (Math.floor(t * 30) % 3 ? 1 : 0.5) : 1)
    const fade = 1 - prog(t, T.whip3[0], T.whip3[1]) * 0.55 + prog(t, T.cut3, T.cut3 + 0.3) * 0.4
    if (k <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 420, 0, 1420)
    g.addColorStop(0, `rgba(255,236,180,${0.0})`); g.addColorStop(0.5, `rgba(255,236,180,${0.07 * k * fade})`); g.addColorStop(1, `rgba(255,236,180,${0.16 * k * fade})`)
    x.fillStyle = g; x.beginPath(); x.moveTo(500, 420); x.lineTo(580, 420); x.lineTo(760, 1420); x.lineTo(320, 1420); x.closePath(); x.fill()
    const p = x.createRadialGradient(540, 1400, 0, 540, 1400, 260)
    p.addColorStop(0, `rgba(255,236,180,${0.22 * k * fade})`); p.addColorStop(1, 'rgba(255,236,180,0)')
    x.fillStyle = p; x.beginPath(); x.ellipse(540, 1400, 260, 70, 0, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function drawEmptyChair(t) {
    drawFoldingChair(x, CHAIR.x, CHAIR.y, CHAIR.size, { back: true })
    const p = Math.max(2, Math.round(CHAIR.size / 26))
    drawYouSign(x, CHAIR.x, CHAIR.y - 10.5 * p, Math.max(2, p * 0.42 * 2) / 2 * 1.9, t)
  }
  function drawCase(t) {
    if (t >= T.scurry + 0.6) return
    const rk = t >= T.riff && t < T.womp ? 1 : 0
    // rattles + hops to the riff, then (womp) slowly keels over to the right and stays down
    const fall = ease.inCubic(prog(t, T.womp + 0.05, T.womp + 0.75)), land = t - T.womp - 0.75
    const bounce = land > 0 && land < 0.5 ? -0.08 * Math.exp(-land * 8) * Math.abs(Math.sin(land * 22)) : 0
    const wig = rk ? Math.sin((t - T.riff) * 30) * 0.6 : (fall * 1.2 + bounce) / 0.12
    const hop = rk ? -Math.abs(Math.sin((t - T.riff) * Math.PI / 0.2)) * 22 : 0
    drawGuitarCase(x, CASE.x, CASE.y + hop, 9, { wiggle: wig, lid: rk })
    // music notes leak out during the riff
    if (t >= T.riff && t < T.womp + 0.8) {
      for (let k = 0; k < 5; k++) {
        const b = T.riff + k * 0.2, a = t - b
        if (a < 0 || a > 1.1) continue
        const fall = t > T.womp ? ease.inQuad(prog(t, T.womp, T.womp + 0.6)) : 0
        x.save(); x.globalAlpha = (1 - a / 1.1) * (1 - fall * 0.8)
        bitmap(x, ['...XX', '...XX', '...X.', '...X.', '.XXX.', 'XXXX.', '.XX..'], { X: k % 2 ? GOLD : '#4fd8c0' }, CASE.x - 40 - k * 26 + Math.sin(a * 6 + k) * 16, CASE.y - 280 - a * 170 + fall * 260, 9)
        x.restore()
      }
    }
  }

  // ── the photo strip (screen space)
  const MONTHS = ['MAR', 'JUN', 'SEP', 'DEC']
  function drawStrip(t) {
    if (t < T.strip[0] || t > T.stripOut[1]) return
    const pin = ease.outBack(prog(t, ...T.strip)), pout = ease.inCubic(prog(t, ...T.stripOut))
    const ox = (1 - pin) * -1100 + pout * 1200
    const fw = 200, fh = 252, gap = 214, y0 = 1235
    x.save(); x.translate(ox, 0)
    // the film-strip backing
    x.fillStyle = '#1c1230'; x.fillRect(540 - 2 * gap - 18, y0 - fh / 2 - 22, 4 * gap + 36, fh + 44)
    x.fillStyle = 'rgba(239,230,214,0.35)'
    for (let i = 0; i < 22; i++) { x.fillRect(540 - 2 * gap - 6 + i * 40, y0 - fh / 2 - 16, 18, 8); x.fillRect(540 - 2 * gap - 6 + i * 40, y0 + fh / 2 + 8, 18, 8) }
    for (let k = 0; k < 4; k++) {
      const sh = T.shots[k], on = t >= sh
      const fx = 540 + (k - 1.5) * gap
      if (!on) { x.fillStyle = '#2c2046'; x.fillRect(fx - fw / 2, y0 - fh / 2, fw, fh); continue }
      const flash = 1 - prog(t, sh, sh + 0.25)
      const circle = prog(t, T.circles[k], T.circles[k] + 0.25)
      drawPhotoFrame(x, fx, y0, fw, fh, k, { flash, label: MONTHS[k], circle, rot: [-0.03, 0.02, -0.015, 0.03][k] })
    }
    x.restore()
  }

  // ── the card (screen space): Capricorn's glowing card → flies to you → flips to YOUR CARD → dealbreakers stamp on
  const CARD_W = 600, CARD_H = 850, CARD_C = [540, 935]
  const CHIPS = ['NOT READY FOR A LABEL', 'ONLY TEXTS AFTER 11PM', "'I DON'T DO FEELINGS'"]
  function cardBack(cx, cy, w, h, rot, sx, glow) {
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
    if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 0, 0, 0, w * 1.3); g.addColorStop(0, rgba(GOLD, 0.45 * glow)); g.addColorStop(1, rgba(GOLD, 0)); x.fillStyle = g; x.fillRect(-w * 1.3, -w * 1.3, w * 2.6, w * 2.6); x.restore() }
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, w * 0.07)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#6a3fd0'); g.addColorStop(1, '#3a1d86')
    x.fillStyle = g; x.fill(); x.lineWidth = Math.max(2, w * 0.012); x.strokeStyle = 'rgba(255,240,200,0.9)'; x.stroke()
    // seed of life
    x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = Math.max(1, w * 0.006)
    const rr = w * 0.13
    x.beginPath(); x.arc(0, 0, rr, 0, Math.PI * 2); x.stroke()
    for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; x.beginPath(); x.arc(Math.cos(a) * rr, Math.sin(a) * rr, rr, 0, Math.PI * 2); x.stroke() }
    x.beginPath(); x.arc(0, 0, rr * 2, 0, Math.PI * 2); x.stroke()
    x.restore()
  }
  function cardFace(cx, cy, w, h, sx, t) {
    x.save(); x.translate(cx, cy); x.scale(sx, 1)
    const L = -w / 2, Tp = -h / 2
    x.save(); x.shadowColor = rgba(GOLD, 0.55); x.shadowBlur = 60
    x.beginPath(); x.roundRect(L, Tp, w, h, 34)
    const g = x.createLinearGradient(0, Tp, 0, Tp + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#170a36')
    x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = '#f2d27a'; x.beginPath(); x.roundRect(L, Tp, w, h, 34); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,210,122,0.35)'; x.beginPath(); x.roundRect(L + 16, Tp + 16, w - 32, h - 32, 24); x.stroke()
    // title + coin
    x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.font = `italic 500 62px ${SERIF}`; x.fillText('You', L + 44, Tp + 96)
    x.fillStyle = '#b48cff'; x.beginPath(); x.arc(-L - 70, Tp + 76, 30, 0, Math.PI * 2); x.fill()
    drawPixelStar(x, -L - 70, Tp + 76, 34, 2, '#fff6dc')
    // the art window: a warm aura and a pixel heart
    const wx = L + 40, wy = Tp + 132, ww = w - 80, wh = 222
    x.save(); x.beginPath(); x.roundRect(wx, wy, ww, wh, 16); x.clip()
    const a = x.createRadialGradient(0, wy + wh * 0.6, 0, 0, wy + wh * 0.6, ww * 0.7); a.addColorStop(0, '#ffcf7a'); a.addColorStop(0.45, '#c2508a'); a.addColorStop(1, '#2a1250')
    x.fillStyle = a; x.fillRect(wx, wy, ww, wh)
    drawPixelHeart(x, 0, wy + wh * 0.52 + Math.sin(t * 3) * 4, 13, '#fff1e6')
    x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(242,210,122,0.6)'; x.beginPath(); x.roundRect(wx, wy, ww, wh, 16); x.stroke()
    // dealbreakers
    x.fillStyle = GOLD; x.font = `700 28px ${MONO}`; x.textAlign = 'center'
    if ('letterSpacing' in x) x.letterSpacing = '5px'
    x.fillText('DEALBREAKERS', 0, Tp + 412)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    CHIPS.forEach((c, i) => {
      const cy2 = Tp + 448 + i * 92, cw = w - 60, ch = 70
      const s0 = T.stamps[i], k = prog(t, s0 - 0.12, s0)
      if (t < s0 - 0.12) {
        x.setLineDash([10, 9]); x.lineWidth = 3; x.strokeStyle = 'rgba(239,230,214,0.32)'
        x.beginPath(); x.roundRect(-cw / 2, cy2, cw, ch, 35); x.stroke(); x.setLineDash([])
        return
      }
      const sc = 1 + (1 - ease.inQuad(k)) * 0.9, after = t - s0
      const wob = after > 0 ? Math.exp(-after * 10) * Math.sin(after * 40) * 0.04 : 0
      x.save(); x.translate(0, cy2 + ch / 2); x.scale(sc + wob, sc - wob); x.rotate((i % 2 ? 1 : -1) * 0.025)
      x.globalAlpha = clamp(k * 1.5)
      x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 35); x.fillStyle = '#4a1236'; x.fill()
      x.lineWidth = 4; x.strokeStyle = RED; x.stroke()
      // pixel ✕
      const px = 4, xx = -cw / 2 + 30
      x.fillStyle = RED
      for (let q = -2; q <= 2; q++) { x.fillRect(xx + q * px, q * px - px / 2, px + 1, px + 1); x.fillRect(xx - q * px, q * px - px / 2, px + 1, px + 1) }
      x.fillStyle = '#fff1ea'; x.font = `700 29px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText(c, -cw / 2 + 60, 1)
      x.restore()
      // stamp dust
      if (after > 0 && after < 0.4) {
        const p = ease.outCubic(after / 0.4)
        x.save(); x.globalAlpha = 1 - p; x.fillStyle = '#ffd0d8'
        for (let q = 0; q < 14; q++) { const an = q / 14 * Math.PI * 2; x.fillRect(Math.cos(an) * (cw * 0.5 + 10 + p * 60) * 0.98 - 4, cy2 + ch / 2 + Math.sin(an) * (ch * 0.5 + 10 + p * 40) - 4, 8, 8) }
        x.restore()
      }
    })
    // footer
    x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('PICKED AT SIGNUP · ON YOUR CARD', 0, -Tp - 34)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // the YOUR CARD stamp tag
    const tk = pop01(t, T.flip[1] + 0.05, 0.34, 2.6)
    if (tk > 0) {
      x.save(); x.translate(-L - 96, Tp - 6); x.rotate(-0.1); x.scale(tk, tk)
      x.shadowColor = 'rgba(6,3,18,0.5)'; x.shadowBlur = 12
      x.beginPath(); x.roundRect(-128, -30, 256, 60, 16); x.fillStyle = '#f7f1ff'; x.fill(); x.shadowBlur = 0
      x.fillStyle = '#2a1846'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      if ('letterSpacing' in x) x.letterSpacing = '4px'
      x.fillText('✦ YOUR CARD', 0, 2)
      if ('letterSpacing' in x) x.letterSpacing = '0px'
      x.restore()
    }
    x.restore()
  }
  function drawCard(t, C) {
    if (t < T.cardUp || t >= T.cut3) return
    const up = pop01(t, T.cardUp, 0.4, 2.2)
    // in Capricorn's hand: world (628, 760) → screen
    const hand = toScreen(C, SEATS.cap[0] + 92, SEATS.cap[1] - 40)
    const hw = 112 * C.s
    if (t < T.fly[0]) {
      const bob = Math.sin(t * 3) * 6
      cardBack(hand[0], hand[1] + bob - (1 - up) * 30, hw * up, hw * 1.42 * up, 0.12 + 0.05 * Math.sin(t * 2), 1, 1)
      if (t < T.cardUp + 0.7) sparkleRing(t, hand[0], hand[1], T.cardUp + 0.1, 8, 110, 2)
      return
    }
    // fly in: from the hand (as seen at fly start) to centre stage, spinning a full turn
    const C0 = cam(T.fly[0]), h0 = toScreen(C0, SEATS.cap[0] + 92, SEATS.cap[1] - 40), w0 = 112 * C0.s
    const p = prog(t, ...T.fly), e = ease.inOutCubic(p)
    const cx = lerp(h0[0], CARD_C[0], e), cy = lerp(h0[1], CARD_C[1], e) - Math.sin(p * Math.PI) * 120
    const w = lerp(w0, CARD_W, e), h = w * CARD_H / CARD_W
    const f = prog(t, ...T.flip), sx = Math.cos(f * Math.PI)
    const rot = (1 - e) * 0.12 + Math.sin(p * Math.PI) * 0.25
    const shake = shakeAt(t)
    if (sx > 0) cardBack(cx + shake[0] * 0.5, cy + shake[1] * 0.5, w, h, rot, sx, 1 - f * 0.6)
    else cardFace(cx + shake[0] * 0.5, cy + shake[1] * 0.5, w, h, -sx, t)
    if (f > 0.4 && f < 1) sparkleRing(t, cx, cy, T.flip[0] + 0.25, 12, 360, 1)
  }

  // ── screen shake (stamps, the whistle, Leo's landing)
  function shakeAt(t) {
    let a = 0
    for (const [t0, amp] of [[T.whistle, 9], ...T.stamps.map(s => [s, 16]), [T.leap[1], 10], [T.drop + 0.4, 5]]) { const k = t - t0; if (k >= 0 && k < 0.3) a = Math.max(a, amp * (1 - k / 0.3)) }
    return [a * Math.sin(t * 97), a * Math.cos(t * 83)]
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

  // ── the LESSON banner (screen space)
  function drawLesson(t) {
    if (t < T.lesson || t > T.lessonOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.lessonOut))
    // scrim
    x.fillStyle = `rgba(6,3,18,${0.8 * clamp(prog(t, T.lesson, T.lesson + 0.3)) * ok})`; x.fillRect(0, 0, W, 1920)
    // flash
    const fl = 1 - prog(t, T.banner, T.banner + 0.25)
    if (fl > 0 && fl < 1) { x.fillStyle = `rgba(255,240,200,${0.35 * fl})`; x.fillRect(0, 0, W, 1920) }
    const k = easeOutBack(prog(t, T.banner, T.banner + 0.42), 2.4)
    if (k <= 0) return
    const pw = 880, ph = 136, py = 610
    x.save(); x.globalAlpha = ok; x.translate(540, py + ph / 2); x.scale(k, k); x.translate(-540, -(py + ph / 2))
    pixelPanel(x, 540 - pw / 2, py, pw, ph, { px: 8, glow: 0.8 + 0.3 * Math.sin(t * 5) })
    // pixel stars either side
    const tw = Math.floor(t * 6) % 2
    drawPixelStar(x, 540 - pw / 2 + 74, py + ph / 2, 52, tw ? 2 : 1, GOLD)
    drawPixelStar(x, 540 + pw / 2 - 74, py + ph / 2, 52, tw ? 1 : 2, GOLD)
    x.fillStyle = GOLD; x.font = `700 54px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    if ('letterSpacing' in x) x.letterSpacing = '4px'
    x.shadowColor = 'rgba(242,199,92,0.6)'; x.shadowBlur = 18
    x.fillText('LESSON UNLOCKED', 544, py + ph / 2 + 3)
    x.shadowBlur = 0
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // a sheen sweeping across
    const sw = prog(t, T.banner + 0.45, T.banner + 1.0)
    if (sw > 0 && sw < 1) {
      x.save(); x.beginPath(); x.rect(540 - pw / 2 + 16, py + 16, pw - 32, ph - 32); x.clip()
      x.globalCompositeOperation = 'lighter'; x.fillStyle = 'rgba(255,245,210,0.35)'
      const sx = 540 - pw / 2 + sw * (pw + 200) - 100
      x.beginPath(); x.moveTo(sx, py); x.lineTo(sx + 50, py); x.lineTo(sx - 10, py + ph); x.lineTo(sx - 60, py + ph); x.closePath(); x.fill()
      x.restore()
    }
    x.restore()
    sparkleRing(t, 540, py + ph / 2, T.banner + 0.05, 16, 470, 0.4, 0.9)
    sparkleRing(t, 540, py + ph / 2, T.banner + 0.25, 10, 300, 1.2, 0.8)
    // +1 SELF-RESPECT
    const pp = prog(t, T.plus, T.plus + 1.6)
    if (pp > 0 && pp < 1) {
      x.save(); x.globalAlpha = ok * Math.min(1, pp * 6) * (1 - ease.inQuad(prog(pp, 0.6, 1)))
      x.fillStyle = '#7dffb0'; x.font = `700 36px ${MONO}`; x.textAlign = 'center'
      x.shadowColor = 'rgba(6,3,18,0.9)'; x.shadowBlur = 10
      x.fillText('+1 SELF-RESPECT', 540, 1330 - ease.outCubic(pp) * 70)
      x.restore()
    }
  }

  const SEAT_ORDER = ['cap', 'sco', 'vir', 'leo', 'aqu']
  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        const C = cam(t), sh = shakeAt(t)
        const outAll = popOut(t, T.out)
        // the banner hangs in screen space (a gentle parallax with the camera) so it never climbs into the headlines
        const lessonK = clamp(prog(t, T.lesson, T.lesson + 0.3)) * (1 - prog(t, ...T.lessonOut))
        x.save(); x.globalAlpha = outAll * (1 - 0.85 * lessonK)
        const bs = 1 + Math.min(0.1, (C.s - 1) * 0.3)
        x.translate(540 - (C.fx - 540) * 0.6 + sh[0] * 0.5, 572); x.scale(bs, bs)
        drawBanner(x, 0, 0, t, { k: ease.outCubic(prog(t, 0.05, 0.6)) })
        x.restore()
        x.save()
        x.translate(540 + sh[0], 1000 + sh[1]); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        // set dressing
        x.globalAlpha = outAll
        drawRug(t)
        x.globalAlpha = 1
        drawSpot(t)
        const places = {}
        for (const id of ['cap', 'sco', 'vir', 'leo', 'aqu', 'pis']) places[id] = place(id, t)
        // chairs + seated stars, back to front
        for (const id of SEAT_ORDER) {
          const [sx0, sy0, sz] = SEATS[id], seatY = sy0 + sz * 0.42
          drawFoldingChair(x, sx0, seatY, sz, { alpha: outAll })
          if (places[id] && places[id].layer === 'seat') drawCast(id, t, places[id], C)
          drawChairSeat(x, sx0, seatY, sz, { alpha: outAll })
          if (id === 'aqu') { x.globalAlpha = outAll; drawCase(t); x.globalAlpha = 1 }
        }
        // the pile + Leo's hug sit behind the empty chair
        const behind = Object.entries(places).filter(([, P]) => P && (P.layer === 'pile' || P.layer === 'hug')).sort((a, b) => a[1].p[1] - b[1].p[1])
        for (const [id, P] of behind) drawCast(id, t, P, C)
        if (t >= T.cut3 && t < T.out[1]) {
          // the pile's shared glow
          x.save(); x.globalCompositeOperation = 'lighter'
          const g = x.createRadialGradient(540, 1060, 0, 540, 1060, 420); g.addColorStop(0, `rgba(255,200,140,${0.22 * outAll})`); g.addColorStop(1, 'rgba(255,200,140,0)')
          x.fillStyle = g; x.fillRect(120, 640, 840, 840); x.restore()
        }
        x.globalAlpha = outAll
        drawEmptyChair(t)
        x.globalAlpha = 1
        for (const [id, P] of Object.entries(places)) if (P && P.layer === 'front') drawCast(id, t, P, C)
        // Leo's tears fly in front of the chair
        x.restore()
        // screen space
        drawStrip(t)
        drawCard(t, C)
        drawLesson(t)
        if (t >= T.cut3 && t < T.cut3 + 0.8) sparkleRing(t, 540, 1080, T.cut3 + 0.05, 14, 380, 0.7)
        if (t >= T.out[0] && t < T.out[1] + 0.3) sparkleRing(t, 540, 1050, T.out[0] + 0.1, 16, 420, 0.2)
      }
      box1.update(t); box2.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      LESSON.update(t, outK(t, T.lessonOut))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (every beat change). The default selection keeps 10.05 (Virgo → Scorpio), 28.1 (Leo → homework)
// and 42.1 (the card → the group hug); the others are the film's own whips/pops and play as such.
export const CUTS = [T.whip1[0], T.cut1, T.whip2[0], T.whip3[0], T.cut2, 33.62, T.cut3, 46.98]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. Pitched SFX (pop, pluck, bell) are shifted into the score's key by the engine; chip/lead/snare/tom cues sit
//    on a private 'sfx' bus (not levelled with the music buses) and are written straight in F major.
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const F = { F3: 174.61, G3: 196, A3: 220, Bb3: 233.08, C4: 261.63, D4: 293.66, Eb4: 311.13, F4: 349.23, A4: 440, C5: 523.25, F5: 698.46, G5: 783.99, A5: 880, C6: 1046.5, D6: 1174.66, F6: 1396.91, A6: 1760, C7: 2093 }
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
const whistle = (t, len = 0.5, g = 0.05) => [['chip', t, 2793.8, len, { ...FX, wave: 'square', duty: 0.5, arp: [0, 0, 1, 1, 0, 1], gain: g, decay: 0.04, sustain: 0.85 }], ['chip', t, 9000, len * 0.8, { ...FX, wave: 'noise', gain: g * 0.35, decay: 0.05, sustain: 0.5 }]]
const scratch = t => [['whoosh', t + 0.06, 0.12, 0.2], ['whoosh', t + 0.2, 0.16, 0.24], ['tick', t, 0.08], ['tick', t + 0.13, 0.06]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.32, decay: 0.3 }], ['boom', t, 0.09], ['clap', t + 0.005, { ...FX, gain: 0.16 }], ['tick', t, 0.09]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const snareRoll = (t0, t1) => { const out = []; for (let t = t0, i = 0; t < t1; t += 0.045, i++) out.push(['snare', +t.toFixed(3), { ...FX, gain: 0.05 + 0.1 * ((t - t0) / (t1 - t0)), decay: 0.07, tone: 200 }]); return out }
const levelUp = t => [
  ...[F.F5, F.A5, F.C6, F.F6, F.A6, F.C7].map((f, i) => ['chip', +(t + i * 0.07).toFixed(3), f, 0.09, { ...FX, wave: 'square', duty: 0.25, gain: 0.038, decay: 0.06, sustain: 0.6 }]),
  ['chip', +(t + 0.42).toFixed(3), F.F6, 0.7, { ...FX, wave: 'square', duty: 0.125, arp: [0, 4, 7, 12], gain: 0.032, decay: 0.3, sustain: 0.6, vib: 0.01 }],
  ['chip', +(t + 0.42).toFixed(3), F.F4, 0.7, { ...FX, wave: 'tri', gain: 0.06, decay: 0.4, sustain: 0.5 }],
  ['bell', t + 0.42, 1174.66, 0.04, 1.8, 0], ['glitter', t + 0.1, t + 1.0],
]
const riff = t => [[F.F3, 0.12], [F.Ab3 || 207.65, 0.12], [F.Bb3, 0.12], [F.C4, 0.1], [F.Eb4, 0.1], [F.C4, 0.24]].map(([f, len], i, a) => ['lead', +(t + a.slice(0, i).reduce((s, b) => s + b[1], 0)).toFixed(3), f * 2, len, { ...FX, wave: 'saw', cutoff: 2600, env: 1800, q: 2, gain: 0.07, decay: 0.15, sustain: 0.5 }])
const womp = t => [['chip', t, F.D4, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.05, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.36, F.Bb3 * 1.06, 0.75, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.05, decay: 0.3, sustain: 0.8 }]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.05, f0: 900, f1: 2600 }]]; for (let k = 0; k < 18; k++) out.push(['clap', +(t0 + 0.1 + k * 0.13 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain: 0.08, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

const PITCH = { [NAME.cap]: 700, [NAME.vir]: 1050, [NAME.sco]: 820, [NAME.aqu]: 940, [NAME.leo]: 1180, [NAME.pis]: 1320, 'THE STARS': 880 }
export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],   // the private sfx bus rides inside the music mix (which is levelled ~36 dB down): bring it back up
  // 1 · the intervention
  ...head(T.h0, 4, T.h0Land, 0),
  ['tick', T.spot, 0.09], ['boom', T.spot, 0.12],
  ['riser', 0.6, T.whistle, 0.04],
  ...whistle(T.whistle, 0.55, 0.08),
  ['pop', T.l1 - 0.25, 659.25, 0.035, 0], ['pop', T.l1 - 0.19, 880, 0.03, 0],
  // exhibit A
  ['whoosh', T.whip1[0] + 0.12, 0.35, 0.07], ...head(T.h1, 1, T.h1Land, 2),
  ['pop', T.clip + 0.05, 783.99, 0.04, -0.2],
  ...scratch(T.scratch), ['tapeStop', T.scratch, T.l3 - T.scratch],
  ...crickets(T.crickets[0]), ...crickets(T.crickets[1]), ...crickets(T.crickets[0] + 0.25), ...crickets(T.crickets[1] + 0.25),
  ...stamp(T.strike).slice(0, 2), ['pop', T.nodA + 0.15, 523.25, 0.03, 0],
  // exhibit B
  ...head(T.h2, 1, T.h2Land, 3),
  ['whoosh', T.strip[0] + 0.2, 0.4, 0.06],
  ...T.shots.flatMap((s, i) => [['tick', s, 0.1], ['pop', s + 0.02, 1318.51 + i * 60, 0.025, (i - 1.5) * 0.3]]),
  ...T.circles.map((s, i) => ['pluck', s + 0.1, NOTE[(i + 2) % 7] * 2, 0.03, 0.25, (i - 1.5) * 0.3]),
  ['pop', T.gasp, 392, 0.04, 0], ['whoosh', T.stripOut[0] + 0.2, 0.35, 0.05],
  // exhibit C
  ['whoosh', T.whip2[0] + 0.12, 0.35, 0.07], ...head(T.h3, 1, T.h3Land, 4),
  ...riff(T.riff), ...womp(T.womp), ['tom', T.womp + 0.76, 70, { ...FX, gain: 0.22, decay: 0.25 }], ['tick', T.womp + 0.76, 0.07], ['pop', T.roll + 0.05, 440, 0.025, 0.3],
  // Leo
  ['whoosh', T.whip3[0] + 0.12, 0.35, 0.07], ...head(T.h4, 2, T.h4Land, 1),
  ['pop', T.well, 1567.98, 0.02, -0.3], ['whoosh', T.leap[0] + 0.2, 0.4, 0.06], ['boom', T.leap[1], 0.07], ['tick', T.leap[1], 0.06],
  ...sob(T.leap[1] + 0.1, F.A5), ...sob(24.95, F.G5), ...sob(25.85, F.A5, 2),
  ...whistle(T.tweet, 0.16, 0.04), ['pop', T.back[1], 523.25, 0.035, -0.4],
  // homework
  ...head(T.h5, 1, T.h5Land, 2),
  ['bell', T.cardUp + 0.05, 1567.98, 0.03, 1.4, 0.2], ['glitter', T.cardUp + 0.05, T.cardUp + 0.6],
  ['whoosh', T.fly[0] + 0.45, 0.6, 0.08], ['tick', T.flip[0] + 0.2, 0.08], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[0] + 0.2, T.flip[1] + 0.5],
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.scurry + 0.42 + i * 0.07).toFixed(3), NOTE[(i * 2) % 7], 0.025, i < 3 ? -0.4 : 0.4]),
  // dealbreakers
  ...head(T.h6, 3, T.h6Land, 0),
  ...snareRoll(T.roll2[0], T.roll2[1]),
  ...T.stamps.flatMap(stamp),
  ...T.stamps.map(s => ['pop', s + 0.25, 523.25, 0.03, 0]),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  // group hug
  ...head(T.h7, 1, T.h7Land, 4), ...cheers(T.cut3 + 0.05, T.cut3 + 1.6),
  ...[0, 1, 2, 3].map(i => ['pop', +(T.squeeze[0] + 0.36 + i * 0.714).toFixed(3), 392, 0.025, 0]),
  ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.pisIn[0] + i * 0.3).toFixed(3), 0.03]),
  ['pop', T.pisSee, 1567.98, 0.03, 0.3], ['tick', T.drop + 0.4, 0.06], ['pop', T.drop + 0.42, 330, 0.03, 0.3],
  ...sob(T.sob, F.C6), ...sob(T.sob + 0.55, F.A5), ...sob(T.sob + 1.1, F.C6, 2),
  // the lesson
  ...levelUp(T.banner),
  ...wordPops(T.lText, 9, 0.075, 1, 0.022), ['pop', T.lText + 0.85, 1046.5, 0.05, 0], ['pluck', T.lText + 0.85, 1046.5, 0.045, 0.7, 0],
  ['chip', T.plus, F.C6, 0.08, { ...FX, wave: 'square', duty: 0.25, gain: 0.03, decay: 0.05, sustain: 0.5 }], ['chip', T.plus + 0.08, F.F6, 0.14, { ...FX, wave: 'square', duty: 0.25, gain: 0.03, decay: 0.08, sustain: 0.5 }],
  // meeting adjourned
  ...head(T.h8, 1, T.h8Land, 2),
  ['whoosh', T.pisHop[0] + 0.25, 0.35, 0.04], ['pop', T.pisHop[1], 659.25, 0.035, 0],
  ...whistle(T.tweet2, 0.2, 0.035),
  ['whoosh', T.out[0], 0.35, 0.04], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(LINES1, { cps: CPS, pitch: PITCH }), ...talkCues(LINES2, { cps: CPS, pitch: PITCH }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
