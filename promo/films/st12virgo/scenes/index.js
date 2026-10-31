// st12virgo (15 s vertical Align ad, Star Talk season 12 "HOT TAKES", E23) · story 0–10.6, then the shared end card.
//   🔥 "Virgos aren't picky. They have *standards*."  Heat 4.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; ♍ Virgo (the clipboard) mid-fold, a towel in thirds over
//              a perfectly square stack, smirking. The heat meter fills to four.
//   2.45       OBJECTION! ♓ Pisces bursts in, crying (the season 2 crier). PISCES: "you re-folded my *towels*."
//   ~3.6       punch-in on Pisces sobbing; a tear lands on the stack. Virgo squints (its answer is the verdict).
//   ~5.0       THE STARS RULE: "standards are good. so is letting small things go."
//   ~8.3       AGREE / DISAGREE?  ~8.4 "High standards. | *Soft* hands."  The end rhymes with frame 0: the same Virgo two-shot,
//              but now a balled-up towel (Pisces's way) sits on top of the stack, and Virgo lets it stay.
//   Rewatch bait: the clipboard's last box, "let it go", is empty all film and gets ticked at the end.
// One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 15
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', SAGE = '#9fd8a4', SEA = '#7fc8ff'
const VIR = signStar('virgo'), PIS = signStar('pisces')

const T = {
  take: 0, takeOut: [2.5, 2.65], heat: 0.3,
  obj: 2.45, pisIn: 2.5, open: 2.6, l1: 2.72,
  l2: 4.95, tear: 5.6, close: 6.95,
  verdict: 7.0, verdictOut: [8.85, 9.0],
  pill: 8.7, pillDur: 0.5,
  last: 9.0, lastLand: 9.3, ball: 9.05, tick: 9.4, out: [10.2, 10.55],
}
const VI = '♍ VIRGO', PI = '♓ PISCES'
const LINES = [
  { t: T.l1, speaker: PI, text: 'you re-folded my *towels*.', color: SEA },
]
const CPS = 31
const TAKE = 'Virgos aren’t picky. They have *standards*.'
const VERDICT = 'standards are good. | so is letting small things *go*.'
const LAST = 'High standards. | *Soft* hands.'

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
T.punch = r3(LT[0].done + 0.1); T.tear = r3(LT[0].done + 0.6); T.ball = r3(T.last + 0.05); T.tick = r3(T.lastLand + 0.1)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const VIR0 = { x: 320, y: 1150, size: 340 }
const PIS0 = { x: 810, y: 1170, size: 320 }
const STACK = { x: 540, y: 1330 }
const TOWEL_COLS = ['#f7b8c8', '#bfe3f2', '#f6e4a8', '#c9e8c2', '#e6d0f2']

const VI_HOPS = [0.2, ...talkHops(LINES, VI, { cps: CPS }), T.last + 0.05]
const PI_HOPS = [T.pisIn + 0.2, ...talkHops(LINES, PI, { cps: CPS }), T.tear]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#0a0718' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: SAGE })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 110, accentSize: 170, at: T.last, gap: 0.08, accentColor: SAGE, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** a cozy jazz-club laundry room: a warm lamp pool, a shelf, a bit of wallpaper stripe */
  function room(t) {
    x.save()
    const g = x.createLinearGradient(0, 640, 0, 1920)
    g.addColorStop(0, 'rgba(50,30,70,0)'); g.addColorStop(0.35, 'rgba(60,34,70,0.85)'); g.addColorStop(1, '#1a1030')
    x.fillStyle = g; x.fillRect(0, 640, 1080, 1280)
    x.fillStyle = 'rgba(255,220,170,0.05)'; for (let i = 0; i < 1080; i += 72) x.fillRect(i, 700, 30, 560)
    x.fillStyle = '#2a1a40'; x.fillRect(0, 1290, 1080, 630)
    x.fillStyle = '#3b2656'; x.fillRect(0, 1290, 1080, 10)
    x.globalCompositeOperation = 'lighter'
    const l = x.createRadialGradient(540, 760, 0, 540, 760, 620); l.addColorStop(0, 'rgba(255,200,120,0.22)'); l.addColorStop(1, 'rgba(255,200,120,0)')
    x.fillStyle = l; x.fillRect(0, 140, 1080, 1240)
    x.restore()
    // the pendant lamp
    x.fillStyle = INK; x.fillRect(536, 560, 8, 120); x.fillRect(490, 676, 100, 30)
    x.fillStyle = '#f2c75c'; x.fillRect(496, 680, 88, 20); x.fillStyle = '#fff3c8'; x.fillRect(520, 700, 40, 8 + 2 * Math.sin(t * 3))
  }
  /** the towel stack on a little table; a balled towel on top at the end; a tear splashes at T.tear */
  function stack(t, k) {
    if (k <= 0) return
    const { x: sx, y: sy } = STACK
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(sx - 120, sy - 6, 240, 26); x.fillRect(sx - 100, sy + 20, 16, 140); x.fillRect(sx + 84, sy + 20, 16, 140)
    x.fillStyle = '#5a3a2a'; x.fillRect(sx - 114, sy, 228, 14)
    for (let i = 0; i < 5; i++) {
      const y = sy - 30 - i * 30
      x.fillStyle = INK; x.fillRect(sx - 82, y - 3, 164, 32)
      x.fillStyle = TOWEL_COLS[i]; x.fillRect(sx - 78, y, 156, 26)
      x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(sx - 78, y, 156, 5)
      x.fillStyle = 'rgba(27,18,54,0.25)'; x.fillRect(sx - 26, y + 6, 3, 20); x.fillRect(sx + 26, y + 6, 3, 20)   // the thirds
    }
    // the ball (Pisces's way), allowed to stay
    const bp = pop01(t, T.ball, 0.4, 2.6)
    if (bp > 0) {
      const y = sy - 30 - 5 * 30 - 12
      x.save(); x.translate(sx + 8, y); x.scale(bp, bp); x.rotate(Math.sin(t * 2) * 0.05)
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 66, 42, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#bfe3f2'; x.beginPath(); x.ellipse(0, 0, 60, 36, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = 'rgba(27,18,54,0.3)'; x.fillRect(-30, -10, 40, 4); x.fillRect(-10, 8, 36, 4); x.fillRect(16, -22, 4, 22)
      x.fillStyle = '#f7b8c8'; x.fillRect(30, 14, 34, 14)
      x.restore()
    }
    // the tear splash
    const tp = prog(t, T.tear, T.tear + 0.5)
    if (tp > 0 && tp < 1) {
      x.fillStyle = SEA
      for (let i = 0; i < 6; i++) { const a = -Math.PI * (0.15 + 0.7 * i / 5); x.fillRect(sx + 40 + Math.cos(a) * 50 * tp, sy - 180 + Math.sin(a) * 40 * tp, 8, 8) }
    }
    x.restore()
  }
  /** the towel Virgo is folding at frame 0: a strip mid-fold, flipping between thirds */
  function foldingTowel(t, cx, cy, k) {
    if (k <= 0) return
    const f = 0.5 + 0.5 * Math.sin(t * 5)
    x.save(); x.globalAlpha = k; x.translate(cx, cy); x.rotate(-0.1)
    x.fillStyle = INK; x.fillRect(-74, -22, 148, 44)
    x.fillStyle = '#c9e8c2'; x.fillRect(-70, -18, 140, 36)
    const w = 46 * Math.cos(Math.PI * f)
    x.fillStyle = INK; x.fillRect(24 - 2, -24, Math.abs(w) + 4 + 46 * 0, 48)
    x.fillStyle = '#e4f5df'; x.fillRect(24, -20, Math.max(4, Math.abs(w)), 40)
    x.restore()
  }
  /** Virgo's clipboard: three ticked boxes and an empty "let it go" (ticked at the end) */
  function clipboard(t, cx, cy, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k; x.translate(cx, cy); x.rotate(0.12)
    x.fillStyle = INK; x.fillRect(-58, -76, 116, 152)
    x.fillStyle = '#b8864f'; x.fillRect(-52, -70, 104, 140)
    x.fillStyle = '#fbf6ea'; x.fillRect(-44, -56, 88, 120)
    x.fillStyle = '#8a8a96'; x.fillRect(-18, -80, 36, 16)
    const tick = t >= T.tick
    for (let i = 0; i < 4; i++) {
      const y = -42 + i * 26
      x.fillStyle = INK; x.fillRect(-36, y, 14, 14); x.fillStyle = '#fbf6ea'; x.fillRect(-33, y + 3, 8, 8)
      x.fillStyle = 'rgba(27,18,54,0.6)'; x.fillRect(-16, y + 4, i === 3 ? 44 : 52, 6)
      if (i < 3 || tick) { x.fillStyle = i === 3 ? '#e2455c' : '#3c9a52'; x.fillRect(-34, y + 6, 4, 4); x.fillRect(-30, y + 9, 4, 4); x.fillRect(-26, y + 5, 4, 4); x.fillRect(-22, y + 1, 4, 4) }
    }
    x.restore()
  }
  function tears(t, r, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 3; i++) {
      const p = ((t * 1.8 + i / 3 + (side > 0 ? 0.5 : 0)) % 1)
      x.fillStyle = SEA; x.fillRect(Math.round(r.x + side * r.size * 0.2 + side * p * 40), Math.round(r.y - r.size * 0.02 + p * 70), 10, 14)
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.4 })
      room(t)
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.punch, dur: 1.4, x: PIS0.x, y: PIS0.y - 60, amount: 0.2, follow: 0.5 })
      x.save(); z.apply(x)
      stack(t, ok)
      const vMood = t < T.obj ? { mood: 'wink', look: [1, 0] } : t < T.punch ? { mood: 'wide', look: [1, 0], blink: false } : t < T.verdict ? { mood: 'squint', look: [1, 0] } : t < T.ball ? { mood: 'neutral', look: [1, 1] } : { mood: 'happy', look: [1, 0] }
      const rv = drawStarChar(x, VIR0.x, VIR0.y, VIR0.size, t, { ...VIR, ...vMood, pop: ok, seed: 3, hops: VI_HOPS, glow: 0.9 })
      clipboard(t, rv.x - 150, rv.y + 40, ok)
      foldingTowel(t, rv.x + 140, rv.y - 20, ok * (1 - prog(t, T.obj, T.obj + 0.2)))
      if (t >= T.pisIn) {
        const pin = pop01(t, T.pisIn, 0.36, 2.4) * ok
        const slide = lerp(280, 0, ease.outCubic(prog(t, T.pisIn, T.pisIn + 0.3)))
        const pMood = t < T.verdict ? { mood: 'wide', look: [-1, 0], blink: false } : t < T.ball ? { mood: 'neutral', look: [-1, 1] } : { mood: 'heart', look: [-1, 0] }
        const crying = t < T.verdict ? 1 : 0
        const rp = drawStarChar(x, PIS0.x + slide, PIS0.y, PIS0.size, t, { ...PIS, ...pMood, pop: pin, seed: 9, hops: PI_HOPS, glow: 0.9, squash: crying * 0.04 * Math.sin(t * 18) })
        tears(t, rp, crying * pin)
        if (t >= T.ball) drawPixelStar(x, rp.x + 90, rp.top + 10, 26, 1, '#ff8fb1')
      }
      x.restore()
      objection(x, t, { at: T.obj, x: 780, y: 880 })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E23' })]

// ── sound
const NOTE = [932.33, 1046.5, 1174.66, 1244.51, 1396.91, 1567.98, 1760]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 4, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 1174.66, 0.04, 0], ['pop', T.open + 0.06, 1396.91, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [VI]: 880, [PI]: 1174.66 } }),
  ['whoosh', T.punch - 0.05, 0.3, 0.03],
  ['pluck', T.tear, 1567.98, 0.035, 0.4, 0.2],
  ['pop', T.close, 1046.5, 0.03, 0],
  ['pop', T.ball + 0.1, 932.33, 0.04, 0],
  ...wordPops(T.last, 2, 0.08, 0, 0.026), ['pop', T.lastLand, 1864.66, 0.05, 0], ['pluck', T.lastLand, 1396.91, 0.045, 0.6, 0],
  ['tick', T.tick, 0.04],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
export { T }
