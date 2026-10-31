// st12houstonbest (20 s vertical Align ad, Star Talk season 12 "HOT TAKES", E25) · story 0–15.6, then the shared end card.
//   🔥 "Houston is the *best* dating city in Texas."  Heat 5.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; the Houston star (HOU) mid-shout behind the centre podium of
//              a pixel TV debate ("THE GREAT TEXAS DATE DEBATE" chyron, a LIVE bug, a countdown clock). Heat meter → 5.
//   2.95       OBJECTION! The Austin star (ATX) pops up at the left podium. AUSTIN: "we have *live music*, y’all."
//   ~5.6       OBJECTION! again: the Dallas star (DAL) at the right podium. DALLAS: "and we dress *up*. every date."
//   ~7.9       punch-in on Houston, sparkle-eyed; the debate clock runs out: BZZT.
//   ~8.5       THE STARS RULE: "the best city is the one where you actually show up."
//   ~12.6      AGREE / DISAGREE?   ~12.7 "Best city? | The one you *show up* in."  The end rhymes with frame 0: the same podium
//              shot, but all three stars have squeezed in behind the centre podium together, and its sign now reads "SHOW UP".
//   Rewatch bait: a pixel tumbleweed rolls across the debate floor, and comes back the other way at the end.
// Friendly city teasing (music, dressing up, food in general); no brands, no businesses. One canvas, DOM type. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, lineTimes, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 20
const KEY = 'Gm'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#e2455c', BLUE = '#3d6ad8'

const T = {
  take: 0, takeOut: [2.75, 2.95], heat: 0.35,
  obj1: 2.95, atxIn: 3.0, open: 3.15, l1: 3.3,
  obj2: 5.55, dalIn: 5.6, l2: 5.75,
  punch: 8.15, l3: 8.25, buzz: 9.7, close: 10.6,
  verdict: 10.7, verdictOut: [13.1, 13.3],
  pill: 13.1, pillDur: 0.55,
  last: 13.5, lastLand: 13.85, squeeze: 13.3, out: [15.1, 15.45],
}
const HO = 'HOUSTON STAR', AU = 'AUSTIN STAR', DA = 'DALLAS STAR'
const LINES = [
  { t: T.l1, speaker: AU, text: 'we have *live music*, y’all.', color: '#ffb35c' },
  { t: T.l2, speaker: DA, text: 'and we dress *up*. every date.', color: '#8fb8ff' },
]
const CPS = 30
const TAKE = 'Houston is the *best* dating city in Texas.'
const VERDICT = 'the best city is the one | where you actually *show up*.'
const LAST = 'Best city? | The one you *show up* in.'

// ── the schedule, derived: each box line reads ≥ 1.5 s after it types (+ any `gap`), the verdict holds 2.5 s after its
//    last word lands, then AGREE / DISAGREE? and the last line
const r3 = v => +v.toFixed(3)
for (let i = 1; i < LINES.length; i++) LINES[i].t = r3(lineTimes([LINES[i - 1]], { cps: CPS })[0].done + 1.5 + (LINES[i].gap || 0))
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.5)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 2.5), r3(VEND + 2.5 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.35), r3(STORY_END - 0.05)]
T.l2 = LINES[1].t; T.obj2 = r3(T.l2 - 0.2); T.dalIn = r3(T.l2 - 0.15); T.punch = r3(LT[1].done + 0.2); T.buzz = r3(T.close - 0.35); T.squeeze = r3(T.pill - 0.2)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const POD = [{ x: 190, city: 'ATX' }, { x: 540, city: 'HOU' }, { x: 890, city: 'DAL' }]
const POD_Y = 1250, STAR_Y = 1060, SIZE = 230

const HO_HOPS = [0.2, 0.6, ...talkHops(LINES, HO, { cps: CPS }), T.squeeze + 0.3]
const AU_HOPS = [T.atxIn + 0.2, ...talkHops(LINES, AU, { cps: CPS }), T.squeeze + 0.35]
const DA_HOPS = [T.dalIn + 0.2, ...talkHops(LINES, DA, { cps: CPS }), T.squeeze + 0.4]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#07061a' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: GOLD })
  const box = dialogueBox(root, { lines: LINES, y: 1520, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 100, accentSize: 156, at: T.last, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** the debate studio: red/blue light wash, a lit backdrop with stars, the floor */
  function studio(t) {
    x.save()
    const g = x.createLinearGradient(0, 0, 1080, 0)
    g.addColorStop(0, 'rgba(226,69,92,0.22)'); g.addColorStop(0.5, 'rgba(20,14,50,0)'); g.addColorStop(1, 'rgba(61,106,216,0.26)')
    x.fillStyle = g; x.fillRect(0, 640, 1080, 700)
    x.fillStyle = '#1a1438'; x.fillRect(0, 1300, 1080, 620)
    x.fillStyle = '#2a2250'; for (let i = 0; i < 1080; i += 120) x.fillRect(i, 1300, 4, 620)
    x.fillStyle = '#3a3168'; x.fillRect(0, 1300, 1080, 8)
    // spotlights sweeping
    x.globalCompositeOperation = 'lighter'
    for (let i = 0; i < 3; i++) {
      const a = Math.sin(t * 0.9 + i * 2) * 0.25, sx = 180 + i * 360
      x.save(); x.translate(sx, 640); x.rotate(a)
      const lg = x.createLinearGradient(0, 0, 0, 700); lg.addColorStop(0, 'rgba(255,240,200,0.16)'); lg.addColorStop(1, 'rgba(255,240,200,0)')
      x.fillStyle = lg; x.beginPath(); x.moveTo(-20, 0); x.lineTo(20, 0); x.lineTo(140, 700); x.lineTo(-140, 700); x.fill(); x.restore()
    }
    x.restore()
  }
  function podium(px, label, k, hot) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(px - 110, POD_Y - 10, 220, 250)
    x.fillStyle = hot ? '#4a2a5a' : '#2e2a5a'; x.fillRect(px - 104, POD_Y - 4, 208, 238)
    x.fillStyle = '#4a4386'; x.fillRect(px - 120, POD_Y - 22, 240, 20)
    x.fillStyle = INK; x.fillRect(px - 84, POD_Y + 40, 168, 64)
    x.fillStyle = hot ? GOLD : BONE; x.fillRect(px - 78, POD_Y + 46, 156, 52)
    x.font = `700 ${label.length > 4 ? 32 : 40}px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(label, px, POD_Y + 73)
    x.fillStyle = RED; x.fillRect(px - 104, POD_Y + 130, 208, 10); x.fillStyle = BLUE; x.fillRect(px - 104, POD_Y + 150, 208, 10)
    // a mic
    x.fillStyle = INK; x.fillRect(px - 4, POD_Y - 70, 8, 52); x.fillRect(px - 12, POD_Y - 86, 24, 22)
    x.restore()
  }
  /** TV debate chrome: LIVE bug, chyron with the title, a countdown clock that buzzes out at T.buzz */
  function chrome(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = k
    // chyron
    x.fillStyle = INK; x.fillRect(0, 1404, 1080, 92)
    x.fillStyle = RED; x.fillRect(0, 1410, 300, 80)
    x.fillStyle = '#efe6d6'; x.fillRect(300, 1410, 780, 80)
    x.font = `700 32px 'Space Mono', monospace`; x.textBaseline = 'middle'; x.textAlign = 'center'
    x.fillStyle = BONE; x.fillText('★ DEBATE', 150, 1450)
    x.fillStyle = INK; x.font = `700 28px 'Space Mono', monospace`; x.fillText('THE GREAT TEXAS DATE DEBATE', 690, 1450)
    // the clock
    const left = Math.max(0, Math.ceil(T.buzz - t))
    const buzzed = t >= T.buzz
    x.fillStyle = INK; x.fillRect(440, 640, 200, 74)
    x.fillStyle = buzzed && Math.sin(t * 30) > 0 ? RED : '#1d1a3a'; x.fillRect(446, 646, 188, 62)
    x.font = `700 44px 'Space Mono', monospace`; x.fillStyle = buzzed ? BONE : (left <= 3 ? '#ff6b6b' : GOLD)
    x.fillText(`0:${String(left).padStart(2, '0')}`, 540, 678)
    x.restore()
  }
  function tumbleweed(t) {
    const go = (t0, dir) => {
      const p = prog(t, t0, t0 + 3.2)
      if (p <= 0 || p >= 1) return
      const cx = dir > 0 ? lerp(-80, 1160, p) : lerp(1160, -80, p), cy = 1370 - Math.abs(Math.sin(p * 14)) * 30
      x.save(); x.translate(cx, cy); x.rotate(p * 12 * dir)
      x.strokeStyle = '#a07a4a'; x.lineWidth = 5
      for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(0, 0, 18 + (i % 3) * 8, i, i + 2.4); x.stroke() }
      x.restore()
    }
    go(1.0, 1); go(12.0, -1)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.45 })
      studio(t)
      const ok = popOut(t, T.out)
      const z = gaspZoom(t, { at: T.punch, dur: 1.4, x: 540, y: STAR_Y, amount: 0.22, follow: 0.5 })
      x.save(); z.apply(x)
      tumbleweed(t)
      const sq = ease.inOutCubic(prog(t, T.squeeze, T.squeeze + 0.5))
      // the side podiums slide away at the end; everyone squeezes behind HOU's podium
      podium(POD[0].x - 400 * sq, 'ATX', ok * pop01(t, T.atxIn - 0.1, 0.3, 2), false)
      podium(POD[2].x + 400 * sq, 'DAL', ok * pop01(t, T.dalIn - 0.1, 0.3, 2), false)
      const moodOf = (who) => {
        if (t >= T.squeeze) return { mood: 'happy', look: [0, 0] }
        if (t >= T.verdict) return { mood: 'neutral', look: [0, -1] }
        if (who === 'HOU') return t < T.obj1 ? { mood: 'wink', look: [0, 0] } : t < T.punch ? { mood: 'wide', look: [t < T.obj2 ? -1 : 1, 0], blink: false } : { mood: 'sparkle', look: [0, 0] }
        if (who === 'ATX') return t < T.punch ? { mood: 'squint', look: [1, 0] } : { mood: 'wide', look: [1, 0], blink: false }
        return t < T.punch ? { mood: 'squint', look: [-1, 0] } : { mood: 'wide', look: [-1, 0], blink: false }
      }
      if (t >= T.atxIn) cityStar(x, lerp(POD[0].x, 380, sq), STAR_Y, SIZE, t, { city: 'ATX', ...moodOf('ATX'), pop: pop01(t, T.atxIn, 0.36, 2.4) * ok, seed: 3, hops: AU_HOPS, glow: 0.9 })
      if (t >= T.dalIn) cityStar(x, lerp(POD[2].x, 700, sq), STAR_Y, SIZE, t, { city: 'DAL', ...moodOf('DAL'), pop: pop01(t, T.dalIn, 0.36, 2.4) * ok, seed: 9, hops: DA_HOPS, glow: 0.9 })
      cityStar(x, POD[1].x, STAR_Y - 20, SIZE + 20, t, { city: 'HOU', ...moodOf('HOU'), pop: ok, seed: 5, hops: HO_HOPS, glow: 0.95 })
      podium(POD[1].x, t >= T.squeeze + 0.2 ? 'SHOW UP' : 'HOU', ok, true)
      x.restore()
      chrome(t, ok)
      objection(x, t, { at: T.obj1, x: 260, y: 860 })
      objection(x, t, { at: T.obj2, x: 820, y: 860 })
      heatMeter(x, t, { level: 5, at: T.heat })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E25' })]

// ── sound
const NOTE = [783.99, 880, 932.33, 1046.5, 1174.66, 1244.51, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 5, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj1, { key: KEY }),
  ...objectionCues(T.obj2, { key: KEY }),
  ['pop', T.open, 932.33, 0.04, 0], ['pop', T.open + 0.06, 1174.66, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [AU]: 880, [DA]: 740 } }),
  ['whoosh', T.punch - 0.1, 0.35, 0.03],
  ['tick', T.buzz - 3, 0.03], ['tick', T.buzz - 2, 0.03], ['tick', T.buzz - 1, 0.03], ['crash', T.buzz, { gain: 0.04, len: 0.8 }],
  ['pop', T.close, 1046.5, 0.03, 0],
  ['whoosh', T.squeeze, 0.45, 0.035],
  ...wordPops(T.last, 4, 0.08, 0, 0.026), ['pop', T.lastLand, 1567.98, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void drawPixelStar
export { T }
