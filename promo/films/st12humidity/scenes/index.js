// st12humidity (15 s vertical Align ad, Star Talk season 12 "HOT TAKES", E27) · story 0–10.6, then the shared end card.
//   🔥 "Houston humidity is a *test* of true love."  Heat 3.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; ♋ Cancer mid-melt on a park bench under a blazing pixel
//              sun, holding hands with a bone date star, sweat drops flying. A thermometer on the lamp post. Heat meter → 3.
//   2.45       OBJECTION! The Houston star (HOU) pops up behind the bench, delighted. HOUSTON: "it’s good for your *skin!*"
//              Cancer (melting into a growing puddle) squints at it; the date star just keeps holding on.
//   ~5.0       THE STARS RULE: "if they still hold your hand in August, keep them."
//   ~8.3       AGREE / DISAGREE?  ~8.4 "Sweaty hands. | *Still* holding."  The end rhymes with frame 0: the same bench two-shot,
//              Cancer still melting, but now heart-eyed, and a pixel heart pops over the held hands.
//   Rewatch bait: the thermometer's red line creeps up all film and pops out of the top on "Still".
// Friendly teasing about the heat only. One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits, gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 15
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', SUN = '#ffcf4a', HOT = '#ff7a4a', SWEAT = '#9fe0ff'
const CAN = signStar('cancer')

const T = {
  take: 0, takeOut: [2.5, 2.65], heat: 0.3,
  obj: 2.45, houIn: 2.5, open: 2.6, l1: 2.72,
  l2: 4.85, close: 6.9,
  verdict: 7.0, verdictOut: [8.85, 9.0],
  pill: 8.7, pillDur: 0.5,
  last: 9.0, lastLand: 9.3, heart: 9.35, out: [10.2, 10.55],
}
const CA = '♋ CANCER', HO = 'HOUSTON STAR'
const LINES = [
  { t: T.l1, speaker: HO, text: 'it’s good for your *skin!*', color: '#ff9a6b' },
]
const CPS = 30
const TAKE = 'Houston humidity is a *test* of true love.'
const VERDICT = 'if they still hold your hand | in August, *keep* them.'
const LAST = 'Sweaty hands. | *Still* holding.'

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
T.punch = r3(T.l1 - 0.1); T.heart = r3(T.lastLand + 0.05)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const CAN0 = { x: 400, y: 1170, size: 270 }
const DATE0 = { x: 690, y: 1180, size: 250 }
const HOU0 = { x: 850, y: 940, size: 270 }
const BENCH = { x: 545, y: 1290 }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

const CA_HOPS = [0.3, ...talkHops(LINES, CA, { cps: CPS }), T.heart]
const HO_HOPS = [T.houIn + 0.2, ...talkHops(LINES, HO, { cps: CPS })]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#1a0a14' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: HOT })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 110, accentSize: 170, at: T.last, gap: 0.08, accentColor: HOT, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** a hot hazy day: an orange sky wash, a big pixel sun, heat shimmer lines, grass */
  function day(t) {
    const g = x.createLinearGradient(0, 0, 0, 1920)
    g.addColorStop(0, 'rgba(255,120,60,0.25)'); g.addColorStop(0.55, 'rgba(255,170,90,0.55)'); g.addColorStop(1, 'rgba(120,50,40,0.6)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    // sun with pixel rays
    const sx = 190, sy = 760, R = 88
    x.save(); x.globalCompositeOperation = 'lighter'
    const sg = x.createRadialGradient(sx, sy, 0, sx, sy, 300); sg.addColorStop(0, 'rgba(255,220,120,0.5)'); sg.addColorStop(1, 'rgba(255,220,120,0)')
    x.fillStyle = sg; x.fillRect(sx - 300, sy - 300, 600, 600); x.restore()
    x.fillStyle = SUN
    for (let yy = -R; yy < R; yy += 8) { const w = Math.sqrt(R * R - yy * yy); x.fillRect(Math.round(sx - w), sy + yy, Math.round(2 * w), 8) }
    for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t * 0.4, d = R + 26 + 8 * Math.sin(t * 4 + i); x.fillRect(Math.round(sx + Math.cos(a) * d) - 8, Math.round(sy + Math.sin(a) * d) - 8, 16, 16) }
    // grass + path
    x.fillStyle = '#3c6a3a'; x.fillRect(0, 1240, 1080, 680)
    x.fillStyle = '#4e8248'; for (let i = 0; i < 1080; i += 24) x.fillRect(i, 1236 - ((i * 7) % 3) * 4, 8, 12)
    x.fillStyle = '#c9a77a'; x.fillRect(0, 1400, 1080, 90)
    // heat shimmer
    x.save(); x.strokeStyle = 'rgba(255,240,220,0.22)'; x.lineWidth = 4
    for (let k = 0; k < 6; k++) {
      x.beginPath()
      const by = 1000 + k * 60
      for (let xx = 0; xx <= 1080; xx += 20) { const yy = by + Math.sin(xx / 60 + t * 3 + k) * 8; if (xx === 0) x.moveTo(xx, yy); else x.lineTo(xx, yy) }
      x.stroke()
    }
    x.restore()
  }
  function bench(k) {
    if (k <= 0) return
    const { x: bx, y: by } = BENCH
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(bx - 300, by - 10, 600, 40); x.fillRect(bx - 270, by + 26, 20, 100); x.fillRect(bx + 250, by + 26, 20, 100)
    x.fillStyle = '#8a5a34'; x.fillRect(bx - 294, by - 4, 588, 14); x.fillRect(bx - 294, by + 14, 588, 10)
    x.restore()
  }
  /** the lamp-post thermometer; the red line creeps up and pops out of the top on "Still" */
  function thermometer(t, k) {
    if (k <= 0) return
    const tx = 980, ty = 900
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(tx - 8, ty + 150, 16, 340)
    x.fillRect(tx - 26, ty - 160, 52, 330)
    x.fillStyle = BONE; x.fillRect(tx - 20, ty - 154, 40, 318)
    x.fillStyle = INK; x.fillRect(tx - 8, ty - 140, 16, 260)
    const fillK = clamp(0.55 + 0.4 * (t / T.lastLand))
    const top = ty + 120 - 250 * fillK
    x.fillStyle = '#ff3b3b'; x.fillRect(tx - 4, top, 8, ty + 120 - top)
    x.beginPath(); x.arc(tx, ty + 130, 18, 0, Math.PI * 2); x.fill()
    const pp = prog(t, T.lastLand, T.lastLand + 0.6)
    if (pp > 0 && pp < 1) { x.fillRect(tx - 6, ty - 150 - 120 * ease.outCubic(pp), 12, 30); for (let i = 0; i < 5; i++) x.fillRect(tx + Math.cos(i * 1.3) * 60 * pp, ty - 170 + Math.sin(i * 1.3) * 40 * pp, 8, 8) }
    x.restore()
  }
  function sweat(t, r, k, seed) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    for (let i = 0; i < 4; i++) {
      const p = (t * 1.3 + i * 0.27 + seed * 0.13) % 1
      const side = i % 2 ? 1 : -1
      const sx = r.x + side * r.size * (0.28 + 0.1 * p), sy = r.top + r.size * 0.2 - Math.sin(Math.PI * p) * 40 + p * 60
      x.globalAlpha = k * (1 - p)
      x.fillStyle = INK; x.fillRect(Math.round(sx) - 2, Math.round(sy) - 2, 12, 16)
      x.fillStyle = SWEAT; x.fillRect(Math.round(sx), Math.round(sy), 8, 12)
    }
    x.restore()
  }
  /** a puddle under Cancer that grows: it's melting */
  function puddle(t, k) {
    const w = lerp(90, 200, clamp(t / 9))
    x.save(); x.globalAlpha = 0.7 * k
    x.fillStyle = '#8fd0ff'; x.beginPath(); x.ellipse(CAN0.x, BENCH.y + 140, w, 20, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(CAN0.x - w * 0.4, BENCH.y + 134, 30, 4)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.35, moon: null })
      day(t)
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.punch, dur: 1.4, x: HOU0.x, y: HOU0.y, amount: 0.18, follow: 0.5 })
      x.save(); z.apply(x)
      thermometer(t, ok)
      // Houston pops up behind the bench (drawn first: it's behind)
      if (t >= T.houIn) {
        const pin = pop01(t, T.houIn, 0.36, 2.4) * ok
        const hMood = t < T.l1 ? { mood: 'happy', look: [-1, 1] } : t < T.verdict ? { mood: 'sparkle', look: [-1, 1] } : { mood: 'happy', look: [-1, 1] }
        cityStar(x, HOU0.x, HOU0.y, HOU0.size, t, { city: 'HOU', ...hMood, pop: pin, seed: 5, hops: HO_HOPS, glow: 0.9 })
      }
      bench(ok); puddle(t, ok)
      const melt = 0.12 + 0.04 * Math.sin(t * 2.2)
      const cMood = t < T.l1 + 0.6 ? { mood: 'sleepy', look: [0, 0], zzz: false } : t < T.verdict ? { mood: 'squint', look: [1, -1] } : t < T.heart ? { mood: 'neutral', look: [1, 0] } : { mood: 'heart' }
      const rc = drawStarChar(x, CAN0.x, CAN0.y, CAN0.size, t, { ...CAN, ...cMood, pop: ok, seed: 2, hops: CA_HOPS, glow: 0.9, squash: melt })
      const dMood = t < T.heart ? { mood: 'happy', look: [-1, 0] } : { mood: 'heart' }
      const rd = drawStarChar(x, DATE0.x, DATE0.y, DATE0.size, t, { color: STAR.bone, ...dMood, pop: ok, seed: 8, glow: 0.7, squash: 0.06 })
      // the held hands: a little pixel knot between them, dripping
      const hx = (rc.x + rd.x) / 2, hy = (rc.y + rd.y) / 2 + 40
      x.save(); x.globalAlpha = ok
      x.fillStyle = INK; x.fillRect(hx - 26, hy - 18, 52, 36)
      x.fillStyle = '#ffe6a8'; x.fillRect(hx - 22, hy - 14, 22, 28); x.fillStyle = '#efe6d6'; x.fillRect(hx, hy - 14, 22, 28)
      const dp = (t * 1.5) % 1
      x.fillStyle = SWEAT; x.fillRect(hx - 4, hy + 18 + dp * 60, 8, 12)
      x.restore()
      sweat(t, rc, ok, 1); sweat(t, rd, ok * 0.7, 2)
      const hp = pop01(t, T.heart, 0.4, 2.6) * ok
      if (hp > 0) drawBits(x, HEART, HEART_C, hx, hy - 120 - 10 * Math.sin(t * 4), 12 * hp)
      x.restore()
      objection(x, t, { at: T.obj, x: 800, y: 760 })
      heatMeter(x, t, { level: 3, at: T.heat })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E27' })]

// ── sound
const NOTE = [880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 1108.73, 0.04, 0], ['pop', T.open + 0.06, 1318.51, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [CA]: 988, [HO]: 620 } }),
  ['whoosh', T.punch - 0.05, 0.3, 0.03],
  ['pop', T.close, 1174.66, 0.03, 0],
  ...wordPops(T.last, 2, 0.08, 0, 0.026), ['pop', T.lastLand, 1760, 0.05, 0], ['pluck', T.lastLand, 1318.51, 0.045, 0.6, 0],
  ['pop', T.lastLand + 0.05, 2217.46, 0.03, 0.6],
  ['bell', T.heart + 0.05, 1760, 0.03, 1.2, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void drawPixelStar; void lerp
export { T }
