// hxwave (15 s vertical Align ad, Star Talk "HOT TAKES", Houston edition) · story 0–10.6, then the shared end card.
//   🔥 "Waving someone into your lane is *flirting*."  Heat 3.
//   0.00   frame 0 = the thumbnail: the hot-take stamp + the take; two lanes seen from behind, the Houston star (HOU badge)
//          in its car on the left, a little pixel hand out of the window waving ♍ Virgo in; Virgo's car on the right,
//          blinker flashing, Virgo staring at it.
//   2.45   OBJECTION! VIRGO (clipboard face): "it’s *traffic safety.*"  …but its cheeks go pink, and it merges in.
//   ~5.1   THE STARS RULE: "A little kindness is | attractive *everywhere*."
//   ~8.4   AGREE / DISAGREE?  "Small kindness is *hot*."  The end rhymes with frame 0: the same two cars, now in one lane,
//          and it's Virgo's tiny hand out of the window doing the thank-you wave, a pixel heart over both roofs.
//   Rewatch bait: Virgo's car has a label-maker label on its trunk that just says CAR. ♓ Pisces is crying at the bus stop
//          on the sidewalk, moved by the merge.
// Friendly traffic manners only. No card transition (a 15 s film). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 15
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const BONE = '#efe6d6', INK = '#1b1236', RED = '#ff4a4a', AMBER = '#ffb03a', VIRC = '#b8e6a0'
const VIR = signStar('virgo'), PIS = signStar('pisces')

const T = { take: 0, takeOut: [2.55, 2.7], heat: 0.3, obj: 2.45, open: 2.6, l1: 2.72 }
const HO = 'HOUSTON STAR', VI = '♍ VIRGO'
const LINES = [
  { t: T.l1, speaker: VI, text: 'it’s *traffic safety.* (…thank you.)', color: VIRC },
]
const CPS = 30
const TAKE = 'Waving someone into your lane is *flirting*.'
const VERDICT = 'A little kindness is | attractive *everywhere*.'
const LAST = 'Small kindness is *hot*.'

const r3 = v => +v.toFixed(3)
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[0].done + 1.4)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 1.6), r3(VEND + 1.6 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.pillDur = 0.55
T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.3), r3(STORY_END - 0.03)]
T.blush = r3(LT[0].done - 0.6)                        // the "(…thank you.)" part: Virgo blushes, gasp zoom
T.merge = [r3(LT[0].done - 0.2), r3(LT[0].done + 0.9)] // Virgo merges in front of Houston
T.end = r3(T.pill + 0.1)                               // Virgo's thank-you wave

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HO_C = { x: 300, y: 1420 }, VI_A = { x: 790, y: 1250 }, VI_B = { x: 330, y: 1075 }
const HO_HOPS = [0.25, 0.9, T.verdict - 0.3, T.last + 0.1]
const VI_HOPS = [T.obj + 0.05, ...talkHops(LINES, VI, { cps: CPS }), T.end, T.last + 0.2]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#0b0816' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ff9ad0' })
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 116, accentSize: 176, at: T.last, gap: 0.08, accentColor: '#ff9ad0', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  function tears(cx, cy, size, t) {
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.6 + i / 3 + (side > 0 ? 0.17 : 0)) % 1)
      x.globalAlpha = 1 - ph; R('#8fd6ff', cx + side * size * 0.17 + side * ph * size * 0.08 - 3, cy + size * 0.02 + ph * size * 0.5, 6, 8)
    }
    x.globalAlpha = 1
  }
  /** a car from behind; blink = the right turn signal state; label = Virgo's label-maker tag */
  function car(cx, cy, col, w, { blink = false, label = false, brake = 0 } = {}) {
    const h = 64
    R(INK, cx - w / 2 - 6, cy - h / 2 - 30, w + 12, h + 36)
    R(col, cx - w / 2, cy - h / 2, w, h)
    R(col, cx - w / 2 + 22, cy - h / 2 - 24, w - 44, 26)
    R('rgba(180,220,255,0.55)', cx - w / 2 + 30, cy - h / 2 - 18, w - 60, 16)
    R(INK, cx - w / 2 + 14, cy + h / 2 - 6, 30, 18); R(INK, cx + w / 2 - 44, cy + h / 2 - 6, 30, 18)
    R(brake ? RED : '#7a2a2a', cx - w / 2 + 6, cy - 10, 18, 12)
    R(blink ? AMBER : brake ? RED : '#7a2a2a', cx + w / 2 - 24, cy - 10, 18, 12)
    if (blink) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx + w / 2 - 15, cy - 4, 0, cx + w / 2 - 15, cy - 4, 46); g.addColorStop(0, 'rgba(255,176,58,0.6)'); g.addColorStop(1, 'rgba(255,176,58,0)'); x.fillStyle = g; x.fillRect(cx + w / 2 - 61, cy - 50, 92, 92); x.restore() }
    if (label) { R(INK, cx - 34, cy + 4, 68, 22); R('#ffffff', cx - 31, cy + 7, 62, 16); x.font = `700 13px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('CAR', cx, cy + 15) }
  }
  /** a little pixel waving hand (stars have no hands; the cars do) */
  function hand(hx, hy, t, k, side = -1) {
    if (k <= 0) return
    const a = Math.sin(t * 12) * 0.35
    x.save(); x.translate(hx, hy); x.scale(side * k, k); x.rotate(a)
    const HAND = ['.X.X.X.', '.XYXYXY', 'XYXYXYX', 'XYYYYYX', 'XYYYYX.', '.XYYYX.', '..XYX..', '..XYX..']
    const s = 10
    HAND.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(ch === 'X' ? INK : '#ffe2b8', (i - 3.5) * s, (j - 8) * s, s, s) }))
    x.restore()
  }
  function road(t) {
    // a skyline under the night sky
    for (let i = 0; i < 9; i++) { const bw = 70 + (i * 37) % 60, bh = 120 + (i * 53) % 160; R('#1d1838', i * 120 - 10, 960 - bh, bw, bh); for (let w = 0; w < 4; w++) if ((i + w) % 3) R('#ffd27a', i * 120 + 6 + (w % 2) * 24, 960 - bh + 16 + Math.floor(w / 2) * 30, 10, 12) }
    R('#26222e', 0, 1000, 1080, 920)
    R('#3a3444', 0, 1000, 1080, 8)
    const flow = (t * 220) % 140
    for (let i = -1; i < 16; i++) R('rgba(255,230,140,0.7)', 540 - 4, 1020 + i * 140 + flow, 8, 70)
    // the sidewalk + bus stop on the right edge, Pisces moved to tears
    R('#4a4458', 0, 960, 1080, 44)
    R(INK, 900, 820, 10, 150); R(INK, 860, 800, 140, 40); R('#3a6ab0', 864, 804, 132, 32)
    x.font = `700 20px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('BUS', 930, 821)
    const pis = drawStarChar(x, 990, 910, 92, t, { ...PIS, glyph: null, mood: 'sparkle', look: [-1, 1], seed: 21, glow: 0.5, bob: 1 })
    tears(pis.x, pis.y, 92, t)
  }
  function heart(hx, hy, k) {
    if (k <= 0) return
    const H = ['.XX.XX.', 'XPPXPPX', 'XPPPPPX', '.XPPPX.', '..XPX..', '...X...']
    const s = 14 * k
    H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(ch === 'X' ? INK : '#ff5d8a', hx + (i - 3.5) * s, hy + (j - 3) * s, s, s) }))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.blush, dur: 1.3, x: VI_A.x, y: VI_A.y - 170, amount: 0.22, follow: 0.5 })
      x.save(); z.apply(x)
      road(t)
      const mK = ease.inOutCubic(prog(t, T.merge[0], T.merge[1]))
      const vx = lerp(VI_A.x, VI_B.x, mK), vy = lerp(VI_A.y, VI_B.y, mK) + Math.sin(t * 5 + 1) * 2
      const blink = mK < 1 && Math.floor(t * 3) % 2 === 0
      // Virgo (further ahead, so drawn first, smaller)
      const vMood = t < T.obj ? { mood: 'wide', look: [-1, 1], blink: false } : t < T.blush ? { mood: 'squint', look: [-1, 1] } : t < T.end ? { mood: 'sparkle', look: [-1, 1], blush: 1 } : { mood: 'heart', look: [-1, 1] }
      drawStarChar(x, vx, vy - lerp(135, 110, mK), lerp(200, 170, mK), t, { ...VIR, ...vMood, pop: ok, seed: 11, hops: VI_HOPS, glow: 0.9 })
      x.save(); x.globalAlpha = ok; x.translate(vx, vy); x.scale(lerp(1.3, 1.05, mK), lerp(1.3, 1.05, mK)); car(0, 0, '#d8f0c8', 190, { blink, label: true }); x.restore()
      hand(vx - 130, vy - 20, t, pop01(t, T.end, 0.3, 2.4) * ok, 1)
      // Houston (closer, bigger), waving Virgo in
      const hMood = t < T.obj ? { mood: 'happy', look: [1, -1] } : t < T.blush ? { mood: 'neutral', look: [1, -1] } : t < T.end ? { mood: 'wink', look: [1, -1] } : { mood: 'happy', look: [0, -1] }
      cityStar(x, HO_C.x, HO_C.y - 175, 270, t, { city: 'HOU', ...hMood, pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      x.save(); x.globalAlpha = ok; x.translate(HO_C.x, HO_C.y); x.scale(1.6, 1.6); car(0, 0, '#ff9a6b', 200, { brake: mK > 0 && mK < 1 ? 1 : 0 }); x.restore()
      hand(HO_C.x + 210, HO_C.y - 40, t, (t < T.merge[1] + 0.2 ? 1 : 0) * ok, 1)
      heart((HO_C.x + vx) / 2 + 60, Math.min(vy, HO_C.y) - 360, pop01(t, T.end + 0.15, 0.35, 2.6) * ok)
      x.restore()
      objection(x, t, { at: T.obj, x: 680, y: 900 })
      x.save(); x.beginPath(); x.rect(0, 0, 1080, 124); x.clip(); heatMeter(x, t, { level: 3, at: T.heat }); x.restore()   // its n/5 score line is clipped: no numbers on screen
      agreePill(x, t, { at: T.pill, dur: T.pillDur })
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// no card-motif cut (a 15 s film has zero): the verdict's gavel slam is the big transition
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' })]

// ── sound
const NOTE = [880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const blinkTicks = Array.from({ length: 8 }, (_, i) => ['tick', r3(0.2 + i * 0.667), 0.025]).filter(c => c[1] < T.obj)
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ...blinkTicks,
  ['pop', T.open, 1108.73, 0.04, 0], ['pop', T.open + 0.06, 1318.51, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [VI]: 1108.73 } }),
  ['whoosh', T.blush - 0.05, 0.3, 0.03], ['bell', T.blush + 0.1, 1760, 0.025, 1.0, 0.3],
  ['whoosh', T.merge[0], 0.6, 0.035],
  ['pop', T.close, 1318.51, 0.03, 0],
  ['pop', T.end, 1479.98, 0.035, -0.2], ['pop', T.end + 0.12, 1760, 0.03, -0.2],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1760, 0.05, 0], ['pluck', T.lastLand, 1318.51, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void drawPixelStar
export { T }
