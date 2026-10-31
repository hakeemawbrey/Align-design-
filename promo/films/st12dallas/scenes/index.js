// st12dallas (15 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E31) · story 0–10.6, then the shared end
// card ("SIGN UP TO VOTE YOUR CITY").
//   0.00   🔥 HOT TAKE "Dallas dresses up for brunch. Houston dresses for the *heat*."  The Dallas star, mid-smirk, straightens
//          a tiny blazer at a sunny patio table (umbrella, two glasses of iced water). Heat: 3 flames.
//   2.45   OBJECTION! (record scratch) The Houston star pops up from the right in shorts, a pixel hand fan going.
//          HOUSTON: "a *blazer?* in this heat?"   DALLAS (one sweat drop): "style doesn't *sweat.*"
//   7.35   THE STARS RULE: "dress like you, not your city. confidence is the outfit."
//   8.85   🔥 AGREE · 🧊 DISAGREE?
//   9.10   "Wear the | *confidence*."  The frame-0 pose again, changed: the Dallas star straightens the blazer collar, but
//          the blazer is now over its arm, and the Houston star fans them both.
// Rewatch bait: the ice cubes in the two water glasses melt down cube by cube through the whole episode.
// One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 15
export const KEY = 'C'
const NUMERAL = 'S12 E31'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#7fe0ff', NAVY = '#2b3f8c'
const W = 1080

const T = {
  takeOut: [2.5, 2.65],
  obj: 2.5, houIn: [2.5, 2.85], sweat: 5.6, 
  open: 2.6, l1: 2.75, l2: 5.32, close: 7.56,
  verdict: 7.51, verdictOut: [10.4, 10.58],
  pill: 9.14, pillDur: 0.6,
  last: 9.29, lastLand: 9.54, share: 7.51, out: [10.4, 10.58],
}
const DAL = 'DALLAS STAR', HOU = 'HOUSTON STAR'
const LINES = [
  { t: T.l1, speaker: HOU, text: 'a *blazer?* in this heat?', color: GOLD },
  { t: T.l2, speaker: DAL, text: "style doesn't *sweat.*", color: CYAN },
]
const CPS = 27
const HEAT = 3, PICK = null
const VERDICT = 'dress like you, not your city. | confidence is the *outfit.*'

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

const FAN = [
  '..pPpPp..',
  '.pPpPpPp.',
  'pPpPpPpPp',
  '.pPpPpPp.',
  '...wWw...',
  '....W....',
  '....W....',
]
const FAN_C = { p: '#ff8fb1', P: '#ffd1de', w: '#8a5a2a', W: '#6b4024' }
const DROP = ['.d.', 'ddd', 'ddd', '.d.']

const DAL_P = { x: 310, y: 1240, s: 370 }, HOU_P = { x: 790, y: 1240, s: 350 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: 'Dallas dresses up for brunch. Houston dresses for the *heat*.', at: 0, out: T.takeOut, accentColor: GOLD })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut, dim: 0.35 })
  const LAST = popText(root, 'Wear the | *confidence*.', { top: 210, size: 110, accentSize: 170, fit: true, at: T.last, late: 1, lateAt: T.lastLand, wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const DAL_HOPS = [0.3, ...talkHops(LINES, DAL, { cps: CPS }), T.lastLand]
  const HOU_HOPS = [T.houIn[1], ...talkHops(LINES, HOU, { cps: CPS }), T.lastLand + 0.1]

  function sun(t) {
    // a big low brunch sun with heat shimmer bands
    const cx = 860, cy = 620
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 300)
    g.addColorStop(0, 'rgba(255,214,120,0.55)'); g.addColorStop(1, 'rgba(255,140,80,0)')
    x.fillStyle = g; x.fillRect(cx - 300, cy - 300, 600, 600)
    x.fillStyle = '#ffd166'
    for (let j = -9; j <= 9; j++) { const w = Math.round(Math.sqrt(81 - j * j)) * 10; x.fillRect(cx - w, cy + j * 10, w * 2, 10) }
    x.strokeStyle = 'rgba(255,214,120,0.18)'; x.lineWidth = 4
    for (let k = 0; k < 5; k++) {
      x.beginPath()
      for (let xx = 0; xx <= W; xx += 20) { const y = 900 + k * 34 + Math.sin(xx * 0.03 + t * 4 + k) * 6; xx ? x.lineTo(xx, y) : x.moveTo(xx, y) }
      x.stroke()
    }
  }
  function patio(t) {
    // umbrella (striped), patio floor tiles, a little table with two water glasses
    x.fillStyle = '#0f0a24'; x.fillRect(0, 1300, W, 700)
    for (let i = 0; i < 12; i++) for (let j = 0; j < 7; j++) { x.fillStyle = (i + j) % 2 ? '#1c1440' : '#241a50'; x.fillRect(i * 90, 1300 + j * 90, 90, 90) }
    x.fillStyle = '#5a5470'; x.fillRect(536, 760, 8, 560)
    for (let i = 0; i < 10; i++) {
      x.fillStyle = i % 2 ? BONE : '#3f6fd8'
      x.beginPath(); x.moveTo(540, 700); x.lineTo(240 + i * 60, 820); x.lineTo(300 + i * 60, 820); x.closePath(); x.fill()
    }
    x.fillStyle = INK; x.fillRect(400, 1326, 280, 20); x.fillStyle = BONE; x.fillRect(404, 1322, 272, 12)
    x.fillStyle = '#5a5470'; x.fillRect(530, 1346, 20, 200)
    // the glasses: ice melts cube by cube (rewatch bait)
    for (const [gx0, seed] of [[460, 0], [600, 1]]) {
      x.fillStyle = INK; x.fillRect(gx0 - 26, 1240, 52, 84)
      x.fillStyle = 'rgba(160,220,255,0.55)'; x.fillRect(gx0 - 22, 1244, 44, 76)
      const left = Math.max(0, 3 - Math.floor((t + seed * 1.3) / 3))
      for (let k = 0; k < left; k++) { x.fillStyle = '#e8f8ff'; x.fillRect(gx0 - 16 + (k % 2) * 14, 1254 + k * 18, 16, 14) }
    }
  }
  function blazer(r, s, a) {
    // a tiny navy blazer over the lower body + lapels + pocket square
    x.save(); x.globalAlpha *= a
    const bx = r.x, by = r.y + s * 0.12
    x.fillStyle = INK; x.fillRect(bx - s * 0.24, by - 4, s * 0.48, s * 0.28)
    x.fillStyle = NAVY; x.fillRect(bx - s * 0.22, by, s * 0.44, s * 0.24)
    x.fillStyle = BONE; x.beginPath(); x.moveTo(bx - 14, by); x.lineTo(bx + 14, by); x.lineTo(bx, by + 40); x.closePath(); x.fill()
    x.fillStyle = PINK; x.fillRect(bx + s * 0.1, by + 16, 18, 12)
    x.restore()
  }
  function blazerOnArm(cx, cy, a) {
    x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.rotate(-0.4)
    x.fillStyle = INK; x.fillRect(-14, -58, 46, 116); x.fillStyle = NAVY; x.fillRect(-10, -54, 38, 108)
    x.fillStyle = PINK; x.fillRect(8, -40, 14, 10)
    x.restore()
  }
  function shorts(r, s, a) {
    x.save(); x.globalAlpha *= a
    const bx = r.x, by = r.y + s * 0.2
    x.fillStyle = INK; x.fillRect(bx - s * 0.2, by, s * 0.4, s * 0.16)
    x.fillStyle = '#ff9f43'; x.fillRect(bx - s * 0.18, by + 4, s * 0.36, s * 0.12)
    x.fillStyle = INK; x.fillRect(bx - 3, by + 12, 6, s * 0.08)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.35, moon: null })
      const day = x.createLinearGradient(0, 0, 0, 1240)
      day.addColorStop(0, 'rgba(70,120,220,0.6)'); day.addColorStop(1, 'rgba(255,170,110,0.6)')
      x.fillStyle = day; x.fillRect(0, 0, W, 1300)
      sun(t)
      patio(t)
      const ok = outK(t, T.out)
      const sharing = t > T.share
      const dalMood = sharing ? 'happy' : t > T.sweat ? 'squint' : t > T.obj ? 'eyeroll' : 'wink'
      const dalX = sharing ? lerp(DAL_P.x, 380, ease.inOutCubic(prog(t, T.share, T.share + 0.35))) : DAL_P.x
      const rd = cityStar(x, dalX, DAL_P.y, DAL_P.s, t, { city: 'DAL', prop: sharing ? false : 'blazer', mood: dalMood, look: t > T.obj ? [1, 0] : [0, 0], hops: DAL_HOPS, seed: 4, alpha: ok })
      if (sharing) blazerOnArm(rd.x - 130, rd.y + 40, ok)
      // the straighten-the-collar tug at frame 0 (and again at the end)
      const tug = (t < 1.4 || sharing) ? Math.max(0, Math.sin(t * 9)) * 6 : 0
      x.fillStyle = BONE; x.fillRect(Math.round(rd.x - DAL_P.s * 0.3), Math.round(rd.y + DAL_P.s * 0.02 - tug), 26, 26)
      // one sweat drop
      if (t > T.sweat && !sharing) {
        const p = ((t - T.sweat) % 1.2) / 1.2
        drawBits(x, DROP, { d: CYAN }, Math.round(rd.x + DAL_P.s * 0.2), Math.round(rd.top + 70 + p * 70), 6, { alpha: (1 - p) * ok })
      }
      if (t > T.houIn[0]) {
        const hi = ease.outBack(prog(t, ...T.houIn))
        const hx = sharing ? lerp(HOU_P.x, 700, ease.inOutCubic(prog(t, T.share, T.share + 0.35))) : lerp(1320, HOU_P.x, hi)
        const houMood = sharing ? 'happy' : t > T.l2 ? 'squint' : 'wide'
        const rh = cityStar(x, hx, HOU_P.y, HOU_P.s, t, { city: 'HOU', prop: ['hat', 'fan'], mood: houMood, look: [-1, 0], hops: HOU_HOPS, seed: 7, alpha: ok })
        const fanRot = Math.sin(t * (sharing ? 10 : 16)) * 0.35
        const fx = sharing ? (rh.x + rd.x) / 2 : rh.x - 140, fy = sharing ? rh.top - 40 : rh.y - 20
        if (sharing) {
          // breeze lines over both of them
          x.strokeStyle = `rgba(239,230,214,${0.5 * ok})`; x.lineWidth = 4
          for (let k = 0; k < 3; k++) { const ph = (t * 2 + k / 3) % 1; x.beginPath(); x.moveTo(fx - 220 + ph * 80, fy + 40 + k * 26); x.lineTo(fx - 140 + ph * 80, fy + 40 + k * 26); x.stroke() }
        }
      }
      take.update(t)
      box.update(t)
      verdict.update(t)
      LAST.update(t, outK(t, T.out))
      ox.clearRect(0, 0, W, 1920)
      heatMeter(ox, t, { level: HEAT, at: -1, out: [T.verdict - 0.2, T.verdict] })
      objection(ox, t, { at: T.obj, x: 560, y: 760 })
      agreePill(ox, t, { at: T.pill, dur: T.pillDur, pick: PICK })
      drawGrain(gx, t)
    },
  }
}

const CUTS = []
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' })]

const NOTE_HZ = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.houIn[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [DAL]: 880, [HOU]: 659.25 } }),
  ['tick', T.sweat, 0.02],
  ['whoosh', T.share, 0.3, 0.02],
  ...wordPops(T.last, 2, 0.08, 2, 0.026), ['pop', T.lastLand, 1046.5, 0.05, 0], ['pluck', T.lastLand + 0.1, 1318.51, 0.045, 0.7, 0],
  ...endcardCues(STORY_END),
]
