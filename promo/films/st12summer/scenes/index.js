// st12summer (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E34) · story 0–15.6, then the shared end
// card ("SIGN UP TO VOTE YOUR CITY").
//   0.00   🔥 HOT TAKE "Houston summer is *hotter* than Miami summer."  The Houston star, mid-smirk and sweating, taps a
//          pixel thermometer climbing into the red under a huge sun (heat shimmer). Heat: 4 flames.
//   2.60   OBJECTION! (record scratch) The Miami star slides in from the right on a beach towel, sunhat on, also sweating.
//          MIAMI: "we have the *beach* right there."   HOUSTON: "we have Galveston *and* the humidity."
//          MIAMI (melting a little): "…is this a *tie?*"
//  10.60   THE STARS RULE: "it's a tie. bring water. and someone to share the AC."
//  13.05   🔥 AGREE · 🧊 DISAGREE?
//  13.35   "Hot take. | *Hotter* summer."  The frame-0 pose again, changed: the Houston star still taps the thermometer,
//          but both stars sit in front of one little window AC unit, water bottles up, breeze lines over them.
// Rewatch bait: a popsicle on the cooler melts stick-first into a puddle over the episode, and a pixel crab walks the
//          puddle at the end.
// One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues, cityStar, loadHotFonts, objectionShake, slamShake } from '../../sthot.js'

export const DURATION = 20
export const KEY = 'Am'
const NUMERAL = 'S12 E34'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', CYAN = '#7fe0ff', TEAL = '#3fd8c8'
const W = 1080

const T = {
  takeOut: [2.5, 2.65],
  obj: 2.5, miaIn: [2.5, 2.85],
  open: 2.7, l1: 2.85, l2: 5.35, l3: 8.02, close: 10.02,
  verdict: 9.97, verdictOut: [13.85, 14.05],
  pill: 13.7, pillDur: 0.6,
  last: 13.9, lastLand: 14.2, share: 12.0, out: [15.35, 15.58],
}
const HOU = 'HOUSTON STAR', MIA = 'MIAMI STAR'
const LINES = [
  { t: T.l1, speaker: MIA, text: 'we have the *beach* right there.', color: TEAL },
  { t: T.l2, speaker: HOU, text: 'we have Galveston *and* the humidity.', color: GOLD },
  { t: T.l3, speaker: MIA, text: '…is this a *tie?*', color: TEAL },
]
const CPS = 30
const HEAT = 4, PICK = 'agree'
const VERDICT = "it's a tie. bring water. | and someone to share the *AC.*"

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)

const DROP = ['.d.', 'ddd', 'ddd', '.d.']
const HAT = ['....hhhh....', '...hHHHHh...', '..hHHHHHHh..', 'hhhhrrrrhhhh', 'hhhhhhhhhhhh']
const HAT_C = { h: '#f2d08a', H: '#e8b86a', r: '#ff5fa2' }
const BOTTLE = ['.cc.', 'BBBB', 'BwwB', 'BwwB', 'BwwB', 'BBBB']
const BOTTLE_C = { c: '#3f8fd8', B: '#7fe0ff', w: '#c8f2ff' }
const CRAB = ['r.r..r.r', '.rrrrrr.', 'rrkrrkrr', '.rrrrrr.', 'r.r..r.r']
const CRAB_C = { r: '#ff5a4a', k: '#1b1236' }

const HOU_P = { x: 320, y: 1250, s: 360 }, MIA_P = { x: 790, y: 1250, s: 340 }
const THERMO = { x: 110, y: 880, h: 400 }

async function build(stage) {
  await loadHotFonts()
  try { await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const take = hotStamp(root, { take: 'Houston summer is *hotter* than Miami summer.', at: 0, out: T.takeOut, accentColor: '#ff7a4a' })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const LAST = popText(root, 'Hot take. | *Hotter* summer.', { top: 220, size: 120, accentSize: 180, fit: true, at: T.last, gap: 0.1, wobble: true, accentColor: '#ff7a4a', lineHeight: 0.98 })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const HOU_HOPS = [0.3, 1.2, ...talkHops(LINES, HOU, { cps: CPS }), T.lastLand]
  const MIA_HOPS = [T.miaIn[1], ...talkHops(LINES, MIA, { cps: CPS }), T.lastLand + 0.1]

  function sun(t) {
    const cx = 540, cy = 780, pulse = 1 + 0.03 * Math.sin(t * 3)
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, 460 * pulse)
    g.addColorStop(0, 'rgba(255,200,90,0.6)'); g.addColorStop(1, 'rgba(255,90,60,0)')
    x.fillStyle = g; x.fillRect(0, 180, W, 920)
    x.fillStyle = '#ffb347'
    for (let j = -14; j <= 14; j++) { const w = Math.round(Math.sqrt(196 - j * j) * pulse) * 12; x.fillRect(cx - w, cy + j * 12, w * 2, 12) }
    x.fillStyle = '#ffd98a'
    for (let j = -9; j <= 9; j++) { const w = Math.round(Math.sqrt(81 - j * j)) * 12; x.fillRect(cx - w - 30, cy + j * 12 - 30, w * 2, 12) }
  }
  function shimmer(t) {
    x.strokeStyle = 'rgba(255,214,140,0.2)'; x.lineWidth = 5
    for (let k = 0; k < 6; k++) {
      x.beginPath()
      for (let xx = 0; xx <= W; xx += 20) { const y = 1120 + k * 30 + Math.sin(xx * 0.025 + t * 5 + k) * 7; xx ? x.lineTo(xx, y) : x.moveTo(xx, y) }
      x.stroke()
    }
  }
  function ground() {
    // half bayou-green grass (Houston side), half sand (Miami side)
    x.fillStyle = '#1e3a2a'; x.fillRect(0, 1340, W / 2, 800)
    x.fillStyle = '#c9a46a'; x.fillRect(W / 2, 1340, W / 2, 800)
    x.fillStyle = '#2a5a3a'; for (let i = 0; i < 18; i++) x.fillRect(20 + i * 30, 1340 - (i % 3) * 8, 8, 14 + (i % 3) * 8)
    x.fillStyle = '#b08a52'; for (let i = 0; i < 14; i++) x.fillRect(W / 2 + 16 + i * 38, 1380 + (i * 37 % 200), 10, 6)
  }
  function thermometer(t) {
    const { x: tx, y: ty, h } = THERMO
    const lvl = clamp(0.55 + t * 0.06, 0, 1.0)
    x.fillStyle = INK; x.fillRect(tx - 26, ty - 10, 52, h + 20)
    x.fillStyle = BONE; x.fillRect(tx - 18, ty - 2, 36, h)
    x.fillStyle = INK; x.beginPath(); x.arc(tx, ty + h + 20, 44, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ff4a3a'; x.beginPath(); x.arc(tx, ty + h + 20, 34, 0, Math.PI * 2); x.fill()
    x.fillRect(tx - 10, ty + h * (1 - lvl), 20, h * lvl + 10)
    for (let k = 1; k < 8; k++) { x.fillStyle = INK; x.fillRect(tx + 18, ty + k * h / 8, 12, 4) }
    // the needle overflows the top at the end of the take (a little red burst)
    if (lvl >= 1) { x.fillStyle = '#ff4a3a'; for (let i = 0; i < 4; i++) x.fillRect(tx - 6 + Math.sin(t * 9 + i) * 18, ty - 24 - i * 10, 10, 10) }
  }
  function popsicle(t) {
    // on the cooler between them; melts down into a puddle; a crab wanders the puddle at the end
    const cx = 560, cy = 1400
    x.fillStyle = INK; x.fillRect(cx - 70, cy - 4, 140, 80); x.fillStyle = '#3f8fd8'; x.fillRect(cx - 64, cy + 2, 128, 68)
    x.fillStyle = BONE; x.fillRect(cx - 64, cy + 2, 128, 14)
    const m = prog(t, 1, 13)
    const h = Math.round(lerp(70, 6, m))
    x.fillStyle = '#ff6a9a'; x.fillRect(cx - 18, cy - 4 - h, 36, h)
    x.fillStyle = '#c98a5a'; x.fillRect(cx - 5, cy - 4 - h - (m > 0.95 ? 0 : 0) + h, 10, 0)
    x.fillStyle = '#c98a5a'; x.fillRect(cx - 5, cy - 4 - Math.max(h, 6) - 34, 10, 34)
    const pw = Math.round(lerp(10, 150, m))
    x.fillStyle = 'rgba(255,106,154,0.75)'; x.fillRect(cx - pw / 2, cy + 76, pw, 10)
    if (t > 13.4) drawBits(x, CRAB, CRAB_C, Math.round(lerp(cx - 60, cx + 60, prog(t, 13.4, 15.4))), cy + 66, 4)
  }
  function acUnit(t, a) {
    const cx = 540, cy = 960
    x.save(); x.globalAlpha *= a
    x.fillStyle = INK; x.fillRect(cx - 120, cy - 70, 240, 140)
    x.fillStyle = '#d8d2e6'; x.fillRect(cx - 112, cy - 62, 224, 124)
    x.fillStyle = '#8d8aa6'; for (let k = 0; k < 6; k++) x.fillRect(cx - 96, cy - 46 + k * 18, 192, 6)
    x.fillStyle = '#7dffb0'; x.fillRect(cx + 80, cy + 40, 12, 10)
    // breeze lines toward both of them
    x.strokeStyle = 'rgba(160,230,255,0.6)'; x.lineWidth = 5
    for (let k = 0; k < 4; k++) {
      const ph = (t * 1.6 + k / 4) % 1
      for (const sgn of [-1, 1]) { x.beginPath(); x.moveTo(cx + sgn * (130 + ph * 120), cy - 30 + k * 22); x.lineTo(cx + sgn * (190 + ph * 120), cy - 30 + k * 22 + 10); x.stroke() }
    }
    x.restore()
  }
  function sweat(r, s, t, seed, a) {
    for (let i = 0; i < 2; i++) {
      const p = ((t + seed * 0.7 + i * 0.6) % 1.2) / 1.2
      drawBits(x, DROP, { d: CYAN }, Math.round(r.x + (i ? -1 : 1) * s * 0.22), Math.round(r.top + 80 + p * 80), 6, { alpha: (1 - p) * a })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: 0.3, moon: null })
      const day = x.createLinearGradient(0, 0, 0, 1340)
      day.addColorStop(0, 'rgba(255,120,60,0.25)'); day.addColorStop(1, 'rgba(255,190,90,0.5)')
      x.fillStyle = day; x.fillRect(0, 0, W, 1340)
      sun(t)
      ground()
      shimmer(t)
      thermometer(t)
      const ok = outK(t, T.out)
      const sharing = t > T.share
      if (sharing) acUnit(t, pop01(t, T.share, 0.35) * ok)
      popsicle(t)
      const melt = t > T.l3 && !sharing ? 0.12 : 0
      const houMood = sharing ? 'happy' : t > T.l2 && t < T.l3 ? 'wink' : t > T.obj ? 'squint' : 'wink'
      const rh = cityStar(x, HOU_P.x, HOU_P.y, HOU_P.s, t, { city: 'HOU', prop: ['hat', 'sweat'], mood: houMood, look: t > T.obj ? [1, 0] : [-1, 0], hops: HOU_HOPS, seed: 3, alpha: ok, squash: 0.06 })
      // the tap on the thermometer (frame 0 and the end)
      if (t < 2.4 || sharing) { const tp = Math.max(0, Math.sin(t * 7)); x.fillStyle = GOLD; x.fillRect(Math.round(THERMO.x + 40 + tp * 10), Math.round(THERMO.y + 220), 30, 22) }
      if (sharing) drawBits(x, BOTTLE, BOTTLE_C, Math.round(rh.x + 130), Math.round(rh.y - 30), 9, { rot: 0.2, alpha: ok })
      if (t > T.miaIn[0]) {
        const mi = ease.outBack(prog(t, ...T.miaIn))
        const mx = sharing ? lerp(MIA_P.x, 770, prog(t, T.share, T.share + 0.3)) : lerp(1320, MIA_P.x, mi)
        // the towel
        x.fillStyle = INK; x.fillRect(mx - 170, 1366, 340, 44)
        for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? TEAL : PINK; x.fillRect(mx - 164 + k * 41, 1372, 41, 32) }
        const miaMood = sharing ? 'happy' : t > T.l3 ? 'sleepy' : t > T.l2 ? 'wide' : 'wink'
        const rm = cityStar(x, mx, MIA_P.y, MIA_P.s, t, { city: 'MIA', prop: ['visor', 'sweat'], mood: miaMood, zzz: false, look: [-1, 0], hops: MIA_HOPS, seed: 8, alpha: ok, squash: 0.06 + melt })
        if (sharing) drawBits(x, BOTTLE, BOTTLE_C, Math.round(rm.x - 130), Math.round(rm.y - 30), 9, { rot: -0.2, alpha: ok })
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

const CUTS = [{ t: 9.92, kind: 'deal' }, 13.95]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: NUMERAL, corners: 'tl bl br' }), cardCuts(CUTS)]

const NOTE_HZ = [440, 493.88, 523.25, 587.33, 659.25, 783.99, 880]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur, pick: PICK }),
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.miaIn[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [HOU]: 659.25, [MIA]: 987.77 } }),
  ['whoosh', T.share, 0.5, 0.025], ['glitter', T.share + 0.1, T.share + 0.6],
  ...wordPops(T.last, 4, 0.1, 2, 0.026),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
