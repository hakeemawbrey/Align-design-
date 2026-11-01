// trpovtalkcard (20 s vertical, Star Talk Trends §9 POV, ep 5 · synthwave · C#m) · story 0–15.6, then the end card.
// "POV: you're a *talk card* about to be answered." You are the card ("What's your comfort meal?").
//   0.3–2.1   the card itself floats in: sticker "this is *you*". Then the camera drops into the card's eyes.
//   2.2       looking up from the table: ♍ VIRGO and ♉ TAURUS lean in over you.
//             VIRGO: "okay. *“what’s your comfort meal?”*"
//   4.4–9.1   the suspense (rule of three, from the card's point of view): "this is my *moment.*" … Taurus picks you up
//             (the camera lifts to their face) "don't skip me. don't skip me." … TAURUS: "hmm… that's a *big* one."
//             and a drumroll: "they're *thinking*…"
//   9.2       card cut.
//   9.4       TAURUS: "my grandma’s soup. i’ll make you *some.*"  Virgo melts. Pisces, behind them, fountains.
//   11.4      "*answered.*" the card glows gold.
//   13.0      Last line: "I was *born* for this."
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawImg, R, pop01, outK, prog, ease, lerp, clamp, easeOutBack, INK, BONE, HOT, GOLD, r3 } from './povkit.js'
import { talkHops } from '../../startalk.js'

const TAU = signStar('taurus'), VIR = signStar('virgo')
const TN = `${TAU.glyph}︎ TAURUS`, VN = `${VIR.glyph}︎ VIRGO`
const T = { dive: [1.9, 2.25], pov: 2.2, pick: 5.4, drum: [7.9, 9.0], cut: 9.2, ans: 9.4, glow: 11.4, last: 13.0, out: [15.1, 15.5] }
const LINES = [
  { t: 2.6, speaker: VN, text: 'okay. *“what’s your comfort meal?”*', color: '#ffb0cc' },
  { t: 6.75, speaker: TN, text: 'hmm… that’s a *big* one.', color: '#ffe08a' },
  { t: 9.45, speaker: TN, text: 'my grandma’s soup. i’ll make you *some.*', color: '#ffe08a' },
]
const T_HOPS = [T.pov + 0.15, T.pick, ...talkHops(LINES, TN), T.glow, T.last + 0.4]
const V_HOPS = [T.pov + 0.2, ...talkHops(LINES, VN), T.ans + 1.6, T.glow + 0.1, T.last + 0.45]
const pov = t => t > T.pov

function intro(x, t, K) {
  if (t > T.dive[1]) return
  const k = easeOutBack(prog(t, 0.25, 0.7), 1.6), d = ease.inCubic(prog(t, ...T.dive))
  const w = 470 * k * (1 + d * 2.4), rot = -0.05 + 0.03 * Math.sin(t * 2) + d * 0.2
  drawImg(x, K.imgs.talk, 540, 960 + Math.sin(t * 2.4) * 10, w, { rot, alpha: 1 - d })
}

function pair(x, t) {
  if (!pov(t)) return
  const k = pop01(t, T.pov, 0.4, 1.7)
  const lean = ease.inOutQuad(prog(t, 3.2, 4.4)) * 0.6 + ease.inOutQuad(prog(t, T.drum[0], T.drum[1])) * 0.5 - ease.inOutQuad(prog(t, T.ans, T.ans + 0.5)) * 0.6
  let tm = 'neutral', tl = [0, 1], vm = 'sparkle', vl = [0, 1]
  if (t > T.pick) { tm = 'squint'; tl = [1, -1] }
  if (t > LINES[1].t) { tm = 'neutral'; tl = [-1, -1] }
  if (t > T.drum[0]) { tm = 'squint'; tl = [0, 1]; vm = 'wide' }
  if (t > T.ans) { tm = 'happy'; tl = undefined; vm = 'wide'; vl = [-1, 0] }
  if (t > T.ans + 1.6) { vm = 'heart'; vl = undefined }
  if (t > T.glow) tm = 'sparkle'
  if (t > T.last) tm = 'heart'
  drawStarChar(x, lerp(260, 300, lean), lerp(1130, 1050, lean), lerp(470, 540, lean), t, { color: TAU.color, glyph: TAU.glyph, mood: tm, look: tl, hops: T_HOPS, seed: 9, glow: 1.1, pop: k, blink: t > T.drum[0] && t < T.ans ? false : undefined })
  drawStarChar(x, lerp(830, 790, lean), lerp(1120, 1040, lean), lerp(440, 500, lean), t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, hops: V_HOPS, seed: 2, glow: 1.1, pop: pop01(t, T.pov + 0.1, 0.4, 1.7) })
  // a sweat pixel on Taurus during the drumroll
  if (t > T.drum[0] && t < T.ans) drawBits(x, ['.D.', 'DDD', 'DWD', '.D.'], { D: '#8fe3ff', W: '#fff' }, 420, 920 + ((t - T.drum[0]) * 90) % 60, 9)
}

const EP = makePOV({
  id: 'trpovtalkcard', duration: 20,
  caption: 'you’re a *talk card* about to be answered.',
  images: { talk: 'card-talk-5.png' },
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.45, close: 12.7 }],
  stickers: [
    { at: 0.85, out: [1.8, 1.95], text: 'this is *you*', x: 790, y: 1560, rot: -5, size: 50, kind: 'hot' },
    { at: 4.4, out: [5.3, 5.45], text: 'this is my *moment.*', x: 540, y: 400, rot: -3, size: 46, kind: 'dark' },
    { at: 5.55, out: [6.6, 6.75], text: 'don’t skip me. *don’t skip me.*', x: 540, y: 400, rot: 2, size: 42, kind: 'dark' },
    { at: 8.0, out: [9.0, 9.15], text: 'they’re *thinking*…', x: 540, y: 400, rot: -2, size: 48, kind: 'dark' },
    { at: T.glow, out: [12.8, 13.0], text: '*answered.* ✓', x: 540, y: 400, rot: 3, size: 56, kind: 'hot' },
  ],
  last: { at: T.last, text: 'I was *born* for this.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.pov, dur: 0.5, z: 0.04 }, { at: T.pick, dur: T.ans - T.pick - 0.05, z: 0.28, x: 300, y: 1060 }, { at: T.ans + 1.6, dur: 0.8, z: 0.05 }],
  pitch: { [TN]: 587.33, [VN]: 880 },
  scene(x, t, K) {
    if (pov(t)) pisces(x, t, { x: 540, y: 800, s: 140, tears: t > T.ans ? 3 : 1, mood: t > T.ans ? 'happy' : 'wide', look: [0, 1], pop: pop01(t, T.pov + 0.6, 0.3, 2) })
    else pisces(x, t, { x: 900, y: 1250, s: 120, tears: 1, mood: 'sparkle', look: [-1, -1], pop: pop01(t, 0.6, 0.3, 2) * outK(t, T.dive) })
    pair(x, t)
    if (t > T.ans + 1.6) for (let i = 0; i < 6; i++) { const ph = t - T.ans - 1.6 - i * 0.15; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#ff4f86' : '#ffd36a' }, 540 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 16, 980 - ph * 140, 9, { alpha: clamp(1 - ph / 2.2) * outK(t, T.out) }) }
    intro(x, t, K)
  },
  front(x, t) {
    // the dive into the card: a white blink
    const b = 1 - prog(t, T.dive[1] - 0.05, T.dive[1] + 0.3)
    if (t > T.dive[1] - 0.05 && b > 0) { x.fillStyle = `rgba(255,248,239,${0.8 * b})`; x.fillRect(0, 0, 1080, 1920) }
    // POV from inside the card: a soft gold card edge; it glows when you're answered
    if (pov(t)) {
      const g = 0.25 + 0.75 * ease.outCubic(prog(t, T.glow, T.glow + 0.5))
      x.save(); x.strokeStyle = `rgba(242,199,92,${0.35 * g + 0.15})`; x.lineWidth = 10 + 14 * g; x.shadowColor = GOLD; x.shadowBlur = 40 * g
      x.beginPath(); x.roundRect(84, 84, 912, 1752, 48); x.stroke(); x.restore()
      sparkles(x, t, 540, 420, T.glow + 0.05, 14, 360, 1, [GOLD, BONE, HOT])
    }
  },
  cues: [
    ['whoosh', 0.25, 0.4, 0.035], ['pluck', 0.7, 1318.51, 0.035, 0.5, 0],
    ['whoosh', r3(T.dive[0]), 0.4, 0.045], ['pop', r3(T.dive[1]), 1567.98, 0.04, 0], ['glitter', r3(T.dive[1]), r3(T.dive[1] + 0.4)],
    ['whoosh', r3(T.pick), 0.4, 0.04], ['tick', r3(T.pick + 0.1), 0.05],
    ['riser', r3(T.drum[0]), r3(T.drum[1] + 0.2), 0.04], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.drum[0] + i * 0.09), 0.025 + i * 0.002]),
    ['pluck', r3(T.ans + 1.6), 1174.66, 0.045, 0.5, 0], ['pluck', r3(T.ans + 1.72), 1567.98, 0.04, 0.5, 0],
    ['bell', r3(T.glow), 1760, 0.035, 1.2, 0], ['glitter', r3(T.glow), r3(T.glow + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK; void R
