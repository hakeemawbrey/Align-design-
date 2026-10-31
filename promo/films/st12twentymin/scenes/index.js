// st12twentymin (15 s vertical Align ad, Star Talk season 12 "HOT TAKES", E26) · story 0–10.6, then the shared end card.
//   🔥 "In Houston, 20 minutes away is *long distance*."  Heat 4.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; the Houston star (HOU badge) mid-sigh in a tiny pixel car,
//              stuck in a sea of brake lights on the Katy Freeway (a green overhead sign: "I-10 · KATY FWY"). Heat meter → 4.
//   2.45       OBJECTION! ♐ Sagittarius pops up on the shoulder with a backpack. SAG: "it’s a *short drive!*"
//   ~3.6       the dashboard GPS bubble over the car updates: "ETA 20 MIN" → "ETA 20 MIN (IN THEORY)"; the traffic inches one car length.
//   ~5.0       THE STARS RULE: "Houston is huge. meet in the middle, take turns driving."
//   ~8.3       AGREE / DISAGREE?  ~8.4 "Meet in the *middle*. | Literally."  The end rhymes with frame 0: the same car framing,
//              but the jam has cleared, a map pin reads "MIDDLE" and Sag's car is parked right next to Houston's.
//   Rewatch bait: the car in front has a bumper sticker that just reads "SAME".
// Friendly teasing about size and traffic only. One canvas, DOM type, grain on top. Pure f(t).
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
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff4a4a', SIGN_G = '#1f7a4a', SAGC = '#c58cff'
const SAG = signStar('sagittarius')

const T = {
  take: 0, takeOut: [2.5, 2.65], heat: 0.3,
  obj: 2.45, sagIn: 2.5, open: 2.6, l1: 2.72,
  l2: 4.8, inch: 5.4, close: 6.9,
  verdict: 7.0, verdictOut: [8.85, 9.0],
  pill: 8.7, pillDur: 0.5,
  last: 9.0, lastLand: 9.3, clear: 8.9, out: [10.2, 10.55],
}
const HO = 'HOUSTON STAR', SA = '♐ SAGITTARIUS'
const LINES = [
  { t: T.l1, speaker: SA, text: 'it’s a *short drive!*', color: SAGC },
]
const CPS = 30
const TAKE = 'In Houston, 20 minutes away is *long distance*.'
const VERDICT = 'Houston is huge. | meet in the *middle*, take turns driving.'
const LAST = 'Meet in the *middle*. | Literally.'

// ── the schedule, derived: each box line reads ≥ 1.5 s after it types (+ any `gap`), the verdict holds 1.8 s after its
//    last word lands, then AGREE / DISAGREE? and the last line
const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5 + (LINES[i].gap || 0))
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.5)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 1.8), r3(VEND + 1.8 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.inch = r3(LT[0].done + 0.3); T.gps = r3(LT[0].done + 0.2); T.punch = r3(LT[0].done + 0.1); T.clear = r3(T.pill + 0.2)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const CAR0 = { x: 380, y: 1390 }
const SAG0 = { x: 850, y: 1250, size: 260 }
const LANES = [1030, 1130, 1230]
const CAR_COLS = ['#5fb0ff', '#ffcf5c', '#9ee6a8', '#ff8fb1', '#c9b8ff', '#ffa86b', '#e6e6ee']

const HO_HOPS = [0.25, ...talkHops(LINES, HO, { cps: CPS }), T.last + 0.1]
const SA_HOPS = [T.sagIn + 0.2, ...talkHops(LINES, SA, { cps: CPS }), T.last + 0.2]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#0b0816' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ff9a6b' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 110, accentSize: 170, at: T.last, gap: 0.08, accentColor: '#ff9a6b', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function car(cx, cy, col, w = 150, { brake = 1, sticker = false } = {}) {
    const h = 64
    x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, cy - h / 2 - 30, w + 12, h + 36)
    x.fillStyle = col; x.fillRect(cx - w / 2, cy - h / 2, w, h)
    x.fillRect(cx - w / 2 + 22, cy - h / 2 - 24, w - 44, 26)
    x.fillStyle = 'rgba(180,220,255,0.55)'; x.fillRect(cx - w / 2 + 30, cy - h / 2 - 18, w - 60, 16)
    x.fillStyle = INK; x.fillRect(cx - w / 2 + 14, cy + h / 2 - 6, 30, 18); x.fillRect(cx + w / 2 - 44, cy + h / 2 - 6, 30, 18)
    // brake lights (we see the backs of the cars)
    x.fillStyle = brake > 0.5 ? RED : '#7a2a2a'; x.fillRect(cx - w / 2 + 6, cy - 10, 18, 12); x.fillRect(cx + w / 2 - 24, cy - 10, 18, 12)
    if (brake > 0.5) {
      x.save(); x.globalCompositeOperation = 'lighter'
      for (const lx of [cx - w / 2 + 15, cx + w / 2 - 15]) { const g = x.createRadialGradient(lx, cy - 4, 0, lx, cy - 4, 50); g.addColorStop(0, 'rgba(255,60,60,0.45)'); g.addColorStop(1, 'rgba(255,60,60,0)'); x.fillStyle = g; x.fillRect(lx - 50, cy - 54, 100, 100) }
      x.restore()
    }
    if (sticker) { x.fillStyle = BONE; x.fillRect(cx - 30, cy + 8, 60, 18); x.font = `700 14px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('SAME', cx, cy + 18) }
  }
  /** the freeway: lots of lanes, an overhead sign, a sea of brake lights (clears at the end) */
  function freeway(t, clearK) {
    x.fillStyle = '#26222e'; x.fillRect(0, 980, 1080, 940)
    x.fillStyle = '#3a3444'; x.fillRect(0, 980, 1080, 10)
    x.fillStyle = 'rgba(255,230,140,0.7)'
    for (const ly of LANES) for (let i = -1; i < 12; i++) x.fillRect(i * 110 + 20, ly + 66, 54, 6)
    // overhead sign gantry
    x.fillStyle = INK; x.fillRect(80, 700, 14, 290); x.fillRect(986, 700, 14, 290); x.fillRect(80, 700, 920, 14)
    x.fillStyle = INK; x.fillRect(266, 716, 548, 116)
    x.fillStyle = SIGN_G; x.fillRect(272, 722, 536, 104)
    x.strokeStyle = BONE; x.lineWidth = 3; x.strokeRect(282, 732, 516, 84)
    x.font = `700 46px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    x.fillText('I-10 · KATY FWY', 540, 776)
    // the jam: rows of cars, brake lights
    const shift = lerp(0, 1400, ease.inCubic(clearK))
    LANES.forEach((ly, li) => {
      for (let i = -1; i < 6; i++) {
        const cx = i * 230 + (li % 2 ? 120 : 0) + 60
        if (li === 2 && Math.abs(cx - CAR0.x) < 130) { car(cx - shift, ly, CAR_COLS[(i + li * 3 + 7) % CAR_COLS.length], 150, { sticker: true }); continue }
        car(cx + (li % 2 ? shift : -shift), ly, CAR_COLS[(i + li * 3 + 7) % CAR_COLS.length], 150, { brake: Math.sin(t * 3 + i + li) > -0.8 ? 1 : 0 })
      }
    })
  }
  /** the dashboard GPS bubble: "ETA 20 MIN", then the honest update (the rewatch bait) */
  function gps(t, gx0, gy0, k) {
    if (k <= 0 || t >= T.clear) return
    const upd = t >= T.gps
    const txt = upd ? 'ETA 20 MIN (IN THEORY)' : 'ETA 20 MIN'
    x.save(); x.globalAlpha = k
    x.font = `700 28px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const w = x.measureText(txt).width + 36, bump = upd ? 1 + 0.15 * Math.max(0, 1 - (t - T.gps) / 0.25) : 1
    x.translate(gx0, gy0); x.scale(bump, bump)
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -26, w + 8, 52)
    x.fillStyle = '#1d3a5a'; x.fillRect(-w / 2, -22, w, 44)
    x.fillStyle = upd ? '#ffcf5c' : '#9fe0ff'; x.fillText(txt, 0, 1)
    x.restore()
  }
  /** the end: a map pin that reads MIDDLE */
  function pin(t, k) {
    if (k <= 0) return
    const px = 585, py = 1060
    x.save(); x.translate(px, py); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.arc(0, -70, 62, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-46, -36); x.lineTo(0, 20); x.lineTo(46, -36); x.fill()
    x.fillStyle = '#ff5d73'; x.beginPath(); x.arc(0, -70, 54, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-40, -40); x.lineTo(0, 10); x.lineTo(40, -40); x.fill()
    drawPixelStar(x, 0, -70, 44, 1, '#fff1c8')
    x.font = `700 34px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillRect(-90, 24, 180, 50); x.fillStyle = GOLD; x.fillText('MIDDLE', 0, 50)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.5 })
      const ok = popOut(t, T.out)
      const clearK = prog(t, T.clear - 0.4, T.clear + 0.3)
      const z = gaspZoom(t, { at: T.punch, dur: 1.4, x: CAR0.x, y: CAR0.y - 140, amount: 0.2, follow: 0.5 })
      x.save(); z.apply(x)
      freeway(t, clearK)
      // our car inches forward at T.inch
      const inch = lerp(0, -40, ease.inOutQuad(prog(t, T.inch, T.inch + 0.6)))
      const cy = CAR0.y + inch
      // the Houston star sits in the car, head out of the sunroof
      const hMood = t < T.obj ? { mood: 'squint', look: [-1, -1] } : t < T.punch ? { mood: 'wide', look: [1, -1], blink: false } : t < T.verdict ? { mood: 'squint', look: [1, -1] } : t < T.clear ? { mood: 'neutral', look: [1, 0] } : { mood: 'happy', look: [1, 0] }
      const rH = cityStar(x, CAR0.x, cy - 170, 300, t, { city: 'HOU', ...hMood, prop: ['hat', 'sweat'], pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      x.save(); x.globalAlpha = ok; x.translate(CAR0.x, cy); x.scale(1.5, 1.5); car(0, 0, '#ff9a6b', 190, { brake: t < T.clear ? 1 : 0 }); x.restore()
      gps(t, CAR0.x + 60, rH.top - 50, ok)
      // Sagittarius: on the shoulder first, then in its own car beside Houston at the end
      if (t >= T.sagIn) {
        const pinK = pop01(t, T.sagIn, 0.36, 2.4) * ok
        const endK = ease.outCubic(prog(t, T.clear, T.clear + 0.4))
        const sx = lerp(SAG0.x, 790, endK), sy = lerp(SAG0.y, cy - 170, endK)
        const sMood = t < T.punch ? { mood: 'happy', look: [-1, 0] } : t < T.verdict ? { mood: 'wide', look: [-1, 0], blink: false } : { mood: 'happy', look: [-1, 0] }
        drawStarChar(x, sx, sy, SAG0.size, t, { ...SAG, ...sMood, pop: pinK, seed: 11, hops: SA_HOPS, glow: 0.9 })
        if (endK > 0) { x.save(); x.globalAlpha = endK * ok; x.translate(790, cy); x.scale(1.5, 1.5); car(0, 0, SAGC, 190, { brake: 0 }); x.restore() }
        else { // the backpack
          x.fillStyle = INK; x.fillRect(sx + 70, sy - 10, 64, 84); x.fillStyle = '#7a5a3a'; x.fillRect(sx + 76, sy - 4, 52, 72); x.fillStyle = '#9a7a52'; x.fillRect(sx + 82, sy + 20, 40, 20)
        }
      }
      pin(t, pop01(t, T.clear + 0.2, 0.4, 2.4) * ok)
      x.restore()
      objection(x, t, { at: T.obj, x: 800, y: 900 })
      heatMeter(x, t, { level: 4, at: T.heat })
      agreePill(x, t, { at: T.pill, dur: T.pillDur })
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

// no card-motif cut: the verdict's gavel slam is this season's big transition
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E26' })]

// ── sound
const NOTE = [622.25, 698.46, 783.99, 830.61, 932.33, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 4, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 783.99, 0.04, 0], ['pop', T.open + 0.06, 932.33, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [SA]: 1046.5 } }),
  ['whoosh', T.punch - 0.05, 0.3, 0.03], ['pop', T.gps, 1244.51, 0.04, -0.3], ['pop', T.gps + 0.5, 830.61, 0.04, -0.3],
  ['tick', T.inch, 0.04], ['tick', T.inch + 0.3, 0.03],
  ['pop', T.close, 932.33, 0.03, 0],
  ['whoosh', T.clear - 0.3, 0.5, 0.04],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1244.51, 0.05, 0], ['pluck', T.lastLand, 932.33, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp
export { T }
