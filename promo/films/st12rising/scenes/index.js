// st12rising (20 s vertical Align ad, Star Talk season 12 "HOT TAKES", E22) · story 0–15.6, then the shared end card.
//   🔥 "Your rising sign is who shows up on the *first date*."  Heat 3.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take, ♎ Libra mid-smirk at a neon first-date table on a
//              synthwave grid, holding up a closed book whose cover reads "HI!" (the first impression). The heat meter fills.
//   2.95       OBJECTION! ♉ Taurus bursts in from the right (record scratch). TAURUS: "i'm just me, always. no *mask*."
//   ~5.8       punch-in on Libra. LIBRA: "it's the sign rising in the east at *birth*." (the Ascendant: real astronomy, the
//              sign on the eastern horizon at the moment you were born)
//   ~9.2       THE STARS RULE: "in astrology the rising is the first impression. stay for the rest."
//   12.35      AGREE / DISAGREE? pill.   12.85  "First *impression*. | Not the whole book."  The end rhymes with frame 0:
//              the same two-shot, but now the book is open and its pages flip; Taurus leans in to read.
//   Rewatch bait: the neon "TABLE FOR 2" sign behind them has a dead letter until Taurus arrives, then it reads right.
// One canvas, DOM type (sthot stamp + verdict, the dialogue box, the last line), grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 20
const KEY = 'Fm'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MAG = '#ff4fd8', CYAN = '#6fe6ff'
const LIB = signStar('libra'), TAU = signStar('taurus')

const T = {
  take: 0, takeOut: [2.75, 2.95], heat: 0.35,
  obj: 2.95, tauIn: 3.0, open: 3.2, l1: 3.35,
  punch: 5.8, l2: 5.95, close: 9.0,
  verdict: 9.25, verdictOut: [12.15, 12.35],
  pill: 12.35, pillDur: 0.55,
  last: 12.85, lastLand: 13.35, open2: 12.95, out: [15.05, 15.45],
  sign: 3.1,
}
const LI = '♎ LIBRA', TA = '♉ TAURUS'
const LINES = [
  { t: T.l1, speaker: TA, text: 'i’m just me, always. no *mask*.', color: '#9ee6a8' },
  { t: T.l2, speaker: LI, text: 'it’s the sign rising in the east at *birth*.', color: PINK },
]
const CPS = 29
const TAKE = 'Your rising sign is who shows up on the *first date*.'
const VERDICT = 'in astrology the rising is the first impression. | stay for the *rest*.'
const LAST = 'First *impression*. | Not the whole book.'

// ── the schedule, derived: each box line reads ≥ 1.5 s after it types (+ any `gap`), the verdict holds 2.4 s after its
//    last word lands, then AGREE / DISAGREE? and the last line
const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5 + (LINES[i].gap || 0))
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.5)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 2.4), r3(VEND + 2.4 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.l2 = LINES[1].t; T.punch = r3(T.l2 - 0.15); T.open2 = r3(T.last + 0.1)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const LIB0 = { x: 320, y: 1180, size: 340 }
const TAU0 = { x: 800, y: 1190, size: 330 }
const TABLE = { x: 560, y: 1300 }

const LI_HOPS = [0.25, ...talkHops(LINES, LI, { cps: CPS }), T.last + 0.1]
const TA_HOPS = [T.tauIn + 0.2, ...talkHops(LINES, TA, { cps: CPS }), T.open2 + 0.3]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#07041a' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 104, accentSize: 160, at: T.last, gap: 0.08, accentColor: PINK, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** a synthwave horizon: sunset disc with slats + a magenta perspective grid */
  function synthwave(t, k) {
    const hy = 1000
    x.save(); x.globalAlpha = k
    const sky = x.createLinearGradient(0, 560, 0, hy)
    sky.addColorStop(0, 'rgba(60,10,90,0)'); sky.addColorStop(1, 'rgba(255,80,170,0.38)')
    x.fillStyle = sky; x.fillRect(0, 560, 1080, hy - 560)
    // sun
    const sx = 540, sy = hy - 40, R = 190
    const sg = x.createLinearGradient(0, sy - R, 0, sy)
    sg.addColorStop(0, '#ffd36e'); sg.addColorStop(1, '#ff4f9a')
    x.fillStyle = sg
    for (let yy = sy - R; yy < sy; yy += 8) {
      const band = (yy - (sy - R)) / R
      if (band > 0.45 && Math.floor((yy - (sy - R)) / 8) % 3 === 0) continue
      const w = Math.sqrt(Math.max(0, R * R - (sy - yy) ** 2))
      x.fillRect(Math.round(sx - w), yy, Math.round(2 * w), 8)
    }
    // floor
    x.fillStyle = '#12052b'; x.fillRect(0, hy, 1080, 1920 - hy)
    x.strokeStyle = MAG; x.lineWidth = 3; x.globalAlpha = k * 0.75
    for (let i = -10; i <= 10; i++) { x.beginPath(); x.moveTo(540 + i * 30, hy); x.lineTo(540 + i * 260, 1920); x.stroke() }
    const sp = (t * 0.6) % 1
    for (let j = 0; j < 12; j++) {
      const d = (j + sp) / 12, yy = hy + (1920 - hy) * d * d
      x.globalAlpha = k * (0.25 + 0.6 * d); x.beginPath(); x.moveTo(0, yy); x.lineTo(1080, yy); x.stroke()
    }
    x.restore()
  }
  /** neon "TABLE FOR 2" sign: one dead letter flickers until Taurus arrives (the rewatch bait) */
  function neonSign(t, k) {
    const fixed = t >= T.tauIn + 0.3
    const txt = 'TABLE FOR 2'
    x.save(); x.globalAlpha = k
    x.font = `700 40px 'Space Mono', monospace`; x.textAlign = 'left'; x.textBaseline = 'middle'
    const w = x.measureText(txt).width, x0 = 820 - w / 2, y0 = 720
    x.fillStyle = 'rgba(20,6,40,0.9)'; x.fillRect(x0 - 20, y0 - 34, w + 40, 68)
    x.strokeStyle = CYAN; x.lineWidth = 4; x.strokeRect(x0 - 20, y0 - 34, w + 40, 68)
    let cx = x0
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i], cw = x.measureText(ch).width
      const dead = i === 10 && !fixed
      const flick = dead ? (Math.sin(t * 37) > 0.6 ? 0.5 : 0.08) : 1
      x.shadowColor = MAG; x.shadowBlur = dead ? 0 : 18
      x.fillStyle = dead ? `rgba(255,120,220,${flick})` : '#ffb6ef'
      x.fillText(ch, cx, y0)
      cx += cw
    }
    x.restore()
  }
  function table(k) {
    if (k <= 0) return
    const { x: tx, y: ty } = TABLE
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(tx - 150, ty - 6, 300, 30); x.fillRect(tx - 14, ty + 20, 28, 170); x.fillRect(tx - 80, ty + 184, 160, 16)
    x.fillStyle = '#3b2266'; x.fillRect(tx - 144, ty, 288, 18)
    x.fillStyle = MAG; x.fillRect(tx - 144, ty, 288, 4)
    // two drinks + a candle
    for (const dx of [-90, 90]) { x.fillStyle = INK; x.fillRect(tx + dx - 16, ty - 58, 32, 58); x.fillStyle = dx < 0 ? '#ff8fb1' : '#9ee6a8'; x.fillRect(tx + dx - 11, ty - 40, 22, 36); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(tx + dx - 9, ty - 52, 6, 10) }
    x.fillStyle = INK; x.fillRect(tx - 10, ty - 44, 20, 44); x.fillStyle = BONE; x.fillRect(tx - 6, ty - 40, 12, 40)
    x.restore()
  }
  function candle(t, k) {
    const { x: tx, y: ty } = TABLE
    x.save(); x.globalAlpha = k
    const f = Math.sin(t * 11) * 2
    x.fillStyle = '#ffcf5c'; x.fillRect(tx - 5 + f, ty - 62, 10, 16); x.fillStyle = '#fff3c8'; x.fillRect(tx - 2 + f, ty - 56, 4, 8)
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(tx, ty - 50, 0, tx, ty - 50, 120); g.addColorStop(0, 'rgba(255,190,90,0.35)'); g.addColorStop(1, 'rgba(255,190,90,0)')
    x.fillStyle = g; x.fillRect(tx - 120, ty - 170, 240, 240)
    x.restore()
  }
  /** the book: closed with a "HI!" cover (the first impression), then open with flipping pages at the end */
  function book(t, cx, cy, k, open) {
    if (k <= 0) return
    x.save(); x.globalAlpha = clamp(k); x.translate(cx, cy); x.rotate(-0.08)
    const sc = k; x.scale(sc, sc)
    if (open <= 0) {
      x.fillStyle = INK; x.fillRect(-66, -84, 132, 168)
      x.fillStyle = '#e04f8a'; x.fillRect(-60, -78, 120, 156)
      x.fillStyle = '#ff8fb1'; x.fillRect(-60, -78, 14, 156)
      x.font = `700 44px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillStyle = INK; x.fillText('HI!', 8, -4); x.fillStyle = '#fff1c8'; x.fillText('HI!', 6, -8)
      drawPixelStar(x, 34, 46, 18, 1, GOLD)
    } else {
      const o = ease.outCubic(open)
      const w = lerp(66, 140, o)
      x.fillStyle = INK; x.fillRect(-w - 6, -90, 2 * w + 12, 180)
      x.fillStyle = '#e04f8a'; x.fillRect(-w, -84, 2 * w, 168)
      x.fillStyle = '#fff6e0'; x.fillRect(-w + 8, -78, w - 10, 156); x.fillRect(2, -78, w - 10, 156)
      x.fillStyle = 'rgba(27,18,54,0.55)'
      for (let i = 0; i < 7; i++) { x.fillRect(-w + 20, -60 + i * 20, w - 36, 6); x.fillRect(14, -60 + i * 20, w - 34 - (i === 6 ? 40 : 0), 6) }
      // a page flipping over, again and again
      const fp = (t * 1.6) % 1
      const pw = (w - 10) * Math.cos(Math.PI * fp)
      x.fillStyle = '#fffaf0'; x.fillRect(Math.min(2, 2 + pw), -78, Math.abs(pw), 156)
      x.fillStyle = 'rgba(27,18,54,0.3)'; x.fillRect(Math.min(2, 2 + pw), -78, 3, 156)
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      synthwave(t, 1)
      neonSign(t, ok)
      const z = gaspZoom(t, { at: T.punch, dur: 1.4, x: LIB0.x, y: LIB0.y - 60, amount: 0.22, follow: 0.5 })
      x.save(); z.apply(x)
      table(ok); candle(t, ok)
      // Libra: smirking from frame 0 (no fade in); the book is up for the thumbnail
      const libMood = t < T.obj ? { mood: 'wink', look: [0, 0] } : t < T.l2 ? { mood: 'wide', look: [1, 0], blink: false } : t < T.verdict ? { mood: 'happy', look: [1, 0] } : t < T.last ? { mood: 'neutral', look: [0, -1] } : { mood: 'happy', look: [1, 0] }
      const rl = drawStarChar(x, LIB0.x, LIB0.y, LIB0.size, t, { ...LIB, ...libMood, pop: ok, seed: 7, hops: LI_HOPS, glow: 0.9 })
      const bookOpen = prog(t, T.open2, T.open2 + 0.6)
      book(t, rl.x + 120, rl.y - 10, ok, bookOpen)
      // Taurus bursts in on the objection
      if (t >= T.tauIn) {
        const pin = pop01(t, T.tauIn, 0.36, 2.4) * ok
        const slide = lerp(260, 0, ease.outCubic(prog(t, T.tauIn, T.tauIn + 0.3)))
        const tauMood = t < T.l2 ? { mood: 'squint', look: [-1, 0] } : t < T.verdict ? { mood: 'wide', look: [-1, 0], blink: false } : t < T.last ? { mood: 'neutral', look: [0, -1] } : { mood: 'heart', look: [-1, 0] }
        const lean = t >= T.open2 ? -0.06 * ease.outCubic(prog(t, T.open2, T.open2 + 0.5)) : 0
        x.save(); x.translate(TAU0.x + slide, TAU0.y); x.rotate(lean); x.translate(-TAU0.x - slide, -TAU0.y)
        drawStarChar(x, TAU0.x + slide, TAU0.y, TAU0.size, t, { ...TAU, ...tauMood, pop: pin, seed: 12, hops: TA_HOPS, glow: 0.9 })
        x.restore()
      }
      x.restore()
      objection(x, t, { at: T.obj, x: 760, y: 860 })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E22' })]

// ── sound
const NOTE = [698.46, 783.99, 830.61, 932.33, 1046.5, 1108.73, 1244.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.tauIn + 0.3, 1046.5, 0.03, 0.5], ['tick', T.tauIn + 0.32, 0.03],
  ['pop', T.open, 830.61, 0.04, 0], ['pop', T.open + 0.06, 1108.73, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [LI]: 988, [TA]: 520 } }),
  ['whoosh', T.punch - 0.1, 0.35, 0.03],
  ['pop', T.close, 932.33, 0.03, 0], ['pop', T.close + 0.07, 698.46, 0.03, 0],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1396.91, 0.05, 0], ['pluck', T.lastLand, 1046.5, 0.045, 0.6, 0],
  ['glitter', T.open2, T.open2 + 0.8],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
export { T }
