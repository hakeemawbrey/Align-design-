// hxpatio (15 s vertical Align ad, Star Talk "HOT TAKES", Houston edition) · story 0–10.6, then the shared end card.
//   🔥 "Patio dates in August are *brave*."  Heat 5 (it is August).
//   0.00   frame 0 = the thumbnail: the hot-take stamp + the take; a blazing pixel sun over a patio with string lights,
//          the Houston star (HOU badge, hand fan, sweat drop) and ♋ Cancer at a little table, two sweating iced drinks.
//   2.45   OBJECTION! ♋ Cancer starts to melt (squashing flat, a puddle spreading under its chair):
//          CANCER: "I’m not sweating. I’m *melting.*"  The gasp zoom lands on the puddle.
//   ~5.4   THE STARS RULE: "Pick the spot that keeps them | *comfortable*, not cute."
//   ~8.6   AGREE / DISAGREE?  "Comfort is *romantic*."  The end rhymes with frame 0: the same table, the same two stars,
//          but now indoors by a window (the hot patio is outside the glass), cool blue light, Cancer solid again.
//   Rewatch bait: the patio thermometer has no numbers, just HOT · HOTTER · NOPE, and it's pinned on NOPE; inside it
//          reads NICE. ♓ Pisces is at the next table crying (or sweating; it won't say).
// Friendly heat teasing only (no disaster). No card transition (a 15 s film). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 15
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const BONE = '#efe6d6', INK = '#1b1236', CANC = '#9fd8ff'
const CAN = signStar('cancer'), PIS = signStar('pisces')

const T = { take: 0, takeOut: [2.55, 2.7], heat: 0.3, obj: 2.45, open: 2.6, l1: 2.72 }
const HO = 'HOUSTON STAR', CA = '♋ CANCER'
const LINES = [
  { t: T.l1, speaker: CA, text: 'I’m not sweating. I’m *melting.*', color: CANC },
]
const CPS = 30
const TAKE = 'Patio dates in August are *brave*.'
const VERDICT = 'Pick the spot that keeps them | *comfortable*, not cute.'
const LAST = 'Comfort is *romantic*.'

const r3 = v => +v.toFixed(3)
const LT = lineTimes(LINES, { cps: CPS })
T.close = r3(LT[LT.length - 1].done + 1.4)
T.verdict = r3(T.close + 0.05)
const VEND = verdictTimes(T.verdict, VERDICT).end
T.verdictOut = [r3(VEND + 1.6), r3(VEND + 1.6 + 0.18)]
T.pill = r3(T.verdictOut[0] - 0.05); T.pillDur = 0.55
T.last = r3(T.verdictOut[0] + 0.05); T.lastLand = r3(T.last + 0.3)
T.out = [r3(STORY_END - 0.3), r3(STORY_END - 0.03)]
T.melt = [T.obj, r3(LT[0].done + 0.2)]                // Cancer flattens over its line
T.punch = r3(LT[0].done - 0.3)                        // gasp zoom on the puddle
T.inside = r3(T.verdict + 0.4)                        // behind the verdict scrim the scene moves indoors

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HO_P = { x: 330, y: 1190 }, CA_P = { x: 760, y: 1200 }
const HO_HOPS = [0.25, T.verdict - 0.3, T.last + 0.1]
const CA_HOPS = [T.obj + 0.05, ...talkHops(LINES, CA, { cps: CPS }), T.last + 0.2]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#2a1020' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: '#ffd23f' })
  const box = dialogueBox(root, { lines: LINES, y: 1530, width: 960, height: 250, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 116, accentSize: 176, at: T.last, gap: 0.08, accentColor: '#8fe6ff', wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  const R = (c, x0, y0, w, h) => { x.fillStyle = c; x.fillRect(Math.round(x0), Math.round(y0), Math.round(w), Math.round(h)) }
  function tears(cx, cy, size, t) {
    for (const side of [-1, 1]) for (let i = 0; i < 3; i++) {
      const ph = ((t * 1.6 + i / 3 + (side > 0 ? 0.17 : 0)) % 1)
      x.globalAlpha = 1 - ph; R('#8fd6ff', cx + side * size * 0.17 + side * ph * size * 0.08 - 3, cy + size * 0.02 + ph * size * 0.5, 6, 8)
    }
    x.globalAlpha = 1
  }
  /** the sky out there: banded blazing gradient + a huge pixel sun + heat shimmer lines */
  function hotSky(t) {
    const bands = ['#ffd27a', '#ffbe6a', '#ffa45a', '#ff8a4e', '#f26f48', '#d85a46']
    bands.forEach((c, i) => R(c, 0, i * 170, 1080, 172))
    const sx = 860, sy = 260, r = 120 + Math.sin(t * 3) * 4
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(sx, sy, 0, sx, sy, 360); g.addColorStop(0, 'rgba(255,240,180,0.6)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(sx - 360, sy - 360, 720, 720)
    x.restore()
    for (let j = -r; j <= r; j += 12) { const hw = Math.sqrt(r * r - j * j); R(j % 24 ? '#fff4c2' : '#ffe58a', sx - hw, sy + j, hw * 2, 12) }
    // shimmer
    x.strokeStyle = 'rgba(255,250,220,0.35)'; x.lineWidth = 4
    for (let k = 0; k < 5; k++) { x.beginPath(); for (let i = 0; i <= 30; i++) { const px = 80 + k * 200 + Math.sin(i * 0.7 + t * 6 + k) * 10, py = 760 + i * 8; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  }
  /** the patio: a wall, string lights, the thermometer (HOT · HOTTER · NOPE), deck boards, Pisces' table */
  function patio(t) {
    R('#7a3a3a', 0, 980, 1080, 940)
    R('#8f4a40', 0, 980, 1080, 10)
    for (let i = 0; i < 9; i++) R(i % 2 ? '#6a3034' : '#743638', 0, 1060 + i * 100, 1080, 96)
    // string lights sagging across
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 840); x.quadraticCurveTo(540, 960, 1080, 840); x.stroke()
    for (let i = 1; i < 12; i++) { const u = i / 12, px = u * 1080, py = (1 - u) * (1 - u) * 840 + 2 * u * (1 - u) * 960 + u * u * 840; R(INK, px - 9, py, 18, 24); R(Math.floor(t * 3 + i) % 3 ? '#fff1a8' : '#ffd23f', px - 6, py + 3, 12, 18) }
    // the thermometer on the post
    R(INK, 80, 640, 14, 360)
    R(INK, 54, 680, 90, 260); R(BONE, 60, 686, 78, 248)
    x.font = `700 18px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const inside = t >= T.inside
    const labels = inside ? ['HOT', 'NICE', 'COLD'] : ['NOPE', 'HOTTER', 'HOT']
    labels.forEach((l, i) => { x.fillStyle = INK; x.fillText(l, 99, 712 + i * 70) })
    R(INK, 92, 728, 14, 172); R('#ffffff', 95, 731, 8, 166)
    const lvl = inside ? 0.45 : 0.98 + Math.sin(t * 8) * 0.02
    R('#ff3b3b', 95, 897 - 166 * lvl, 8, 166 * lvl); R('#ff3b3b', 88, 900, 22, 22)
    // Pisces at the next table, back left, crying (or sweating; it won't say)
    const pis = drawStarChar(x, 930, 1000, 110, t, { ...PIS, glyph: null, mood: 'squint', look: [-1, 1], seed: 21, glow: 0.5, bob: 1 })
    tears(pis.x, pis.y, 110, t)
    R(INK, 868, 1040, 124, 14); R('#c9b8ff', 872, 1042, 116, 8); R(INK, 924, 1054, 12, 70)
  }
  /** indoors (the rhyme): cool wall, a big window with the hot patio outside, a soft lamp */
  function indoors(t) {
    R('#22385a', 0, 0, 1080, 1920)
    R('#2c4670', 0, 0, 1080, 980)
    // the window, top right-ish, showing the blazing patio
    R(INK, 600, 640, 420, 320)
    x.save(); x.beginPath(); x.rect(612, 652, 396, 296); x.clip()
    ;['#ffbe6a', '#ffa45a', '#ff8a4e', '#f26f48'].forEach((c, i) => R(c, 612, 652 + i * 74, 396, 76))
    for (let j = -40; j <= 40; j += 8) { const hw = Math.sqrt(1600 - j * j); R('#fff4c2', 920 - hw, 720 + j, hw * 2, 8) }
    R('#7a3a3a', 612, 880, 396, 70)
    x.restore()
    R(INK, 806, 652, 8, 296); R(INK, 612, 796, 396, 8)
    R('#d8e6ff', 600, 960, 420, 14)
    // a little potted plant + lamp glow on the left
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(200, 760, 0, 200, 760, 300); g.addColorStop(0, 'rgba(255,230,170,0.25)'); g.addColorStop(1, 'rgba(255,230,170,0)'); x.fillStyle = g; x.fillRect(-100, 460, 600, 600)
    x.restore()
    R(INK, 186, 700, 28, 260); R(INK, 130, 640, 140, 70); R('#ffe6a8', 136, 646, 128, 58)
    R('#1d2e4a', 0, 980, 1080, 940); R('#2a4064', 0, 980, 1080, 10)
    // the thermometer again, now NICE
    R(INK, 54, 680, 90, 260); R(BONE, 60, 686, 78, 248)
    x.font = `700 18px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
    ;['HOT', 'NICE', 'COLD'].forEach((l, i) => { x.fillStyle = INK; x.fillText(l, 99, 712 + i * 70) })
    R(INK, 92, 728, 14, 172); R('#ffffff', 95, 731, 8, 166); R('#5fb0ff', 95, 897 - 80, 8, 80); R('#5fb0ff', 88, 900, 22, 22)
    // Pisces came inside too, still crying (happily, now)
    const pis = drawStarChar(x, 930, 1080, 110, t, { ...PIS, glyph: null, mood: 'happy', look: [-1, 1], seed: 21, glow: 0.5, bob: 1 })
    tears(pis.x, pis.y, 110, t)
  }
  function table(t, cold) {
    // umbrella pole + table
    R(INK, 530, 1130, 20, 220)
    R(INK, 300, 1300, 480, 36); R(cold ? '#d8e6ff' : '#fff1c8', 306, 1304, 468, 26)
    R(INK, 360, 1330, 20, 150); R(INK, 700, 1330, 20, 150)
    // two iced drinks; outside they sweat rivers
    for (const [dx, col] of [[440, '#ffcf5c'], [640, '#ff8fb1']]) {
      R(INK, dx - 26, 1214, 52, 90); R('rgba(220,240,255,0.8)', dx - 22, 1218, 44, 82); R(col, dx - 22, 1244, 44, 56)
      R('#ffffff', dx - 16, 1250, 12, 12); R('#ffffff', dx + 2, 1262, 12, 12)
      if (!cold) for (let i = 0; i < 3; i++) { const ph = (t * 1.2 + i / 3 + dx * 0.01) % 1; R('#bfe8ff', dx - 22 + i * 18, 1230 + ph * 70, 5, 10) }
    }
  }
  function puddle(cx, cy, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = 0.85
    const w = 70 + 170 * k, h = 14 + 22 * k
    x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w + 6, h + 5, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = CAN.color; x.beginPath(); x.ellipse(cx, cy, w, h, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(cx - w * 0.4, cy - h * 0.4, w * 0.25, 5)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ok = popOut(t, T.out)
      const inside = t >= T.inside
      const meltK = inside ? 0 : ease.inOutQuad(prog(t, T.melt[0], T.melt[1]))
      const z = gaspZoom(t, { at: T.punch, dur: 1.3, x: CA_P.x, y: CA_P.y + 120, amount: 0.25, follow: 0.5 })
      x.save(); z.apply(x)
      if (inside) indoors(t); else { hotSky(t); patio(t) }
      // a dark heat-haze band behind the take so it reads on the blazing sky (fades with the stamp)
      { const k = 1 - prog(t, T.takeOut[0], T.takeOut[1] + 0.2); if (k > 0) { const g = x.createLinearGradient(0, 0, 0, 720); g.addColorStop(0, `rgba(40,8,24,${0.82 * k})`); g.addColorStop(0.75, `rgba(40,8,24,${0.6 * k})`); g.addColorStop(1, 'rgba(40,8,24,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 720) } }
      // the umbrella canopy (outside only)
      if (!inside) {
        x.fillStyle = INK; x.beginPath(); x.moveTo(250, 1150); x.lineTo(540, 1020); x.lineTo(830, 1150); x.fill()
        x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(266, 1142); x.lineTo(540, 1032); x.lineTo(814, 1142); x.fill()
        for (let i = 0; i < 4; i++) { x.fillStyle = '#ff5d73'; x.beginPath(); x.moveTo(540, 1032); x.lineTo(266 + i * 137, 1142); x.lineTo(266 + i * 137 + 68, 1142); x.fill() }
      }
      puddle(CA_P.x, CA_P.y + 150, meltK)
      const hMood = t < T.obj ? { mood: 'squint', look: [1, 0] } : t < T.verdict ? { mood: 'wide', look: [1, 0.3], blink: false } : { mood: 'happy', look: [1, 0] }
      cityStar(x, HO_P.x, HO_P.y, 250, t, { city: 'HOU', ...hMood, prop: inside ? ['hat'] : ['fan', 'sweat'], pop: ok, seed: 4, hops: HO_HOPS, glow: 0.9 })
      const cMood = t < T.obj ? { mood: 'squint', look: [-1, 0] } : t < T.verdict ? { mood: 'sleepy', zzz: false, look: [-1, 1] } : { mood: 'heart', look: [-1, 0] }
      const cy = CA_P.y + meltK * 60
      drawStarChar(x, CA_P.x, cy, 250, t, { ...CAN, ...cMood, squash: meltK * 0.55, pop: ok, seed: 11, hops: meltK > 0.1 ? [] : CA_HOPS, glow: 0.9 })
      // drips off Cancer while melting
      if (meltK > 0.05) for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; R(CAN.color, CA_P.x - 90 + i * 60, cy + 40 + ph * 80, 10, 14) }
      table(t, inside)
      x.restore()
      objection(x, t, { at: T.obj, x: 640, y: 900 })
      x.save(); x.beginPath(); x.rect(0, 0, 1080, 124); x.clip(); heatMeter(x, t, { level: 5, at: T.heat }); x.restore()   // its n/5 score line is clipped: no numbers on screen
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
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 5, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 880, 0.04, 0], ['pop', T.open + 0.06, 1046.5, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [CA]: 1174.66 } }),
  ['pluck', T.obj + 0.3, 523.25, 0.03, 0.5, 0.2], ['pluck', T.obj + 0.7, 466.16, 0.03, 0.5, 0.2], ['pluck', T.obj + 1.1, 415.3, 0.03, 0.6, 0.2],
  ['whoosh', T.punch - 0.05, 0.3, 0.03],
  ['pop', T.close, 1046.5, 0.03, 0],
  ['bell', T.inside + 0.1, 1567.98, 0.02, 0.9, 0.3],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1396.91, 0.05, 0], ['pluck', T.lastLand, 1046.5, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void lerp; void drawPixelStar; void pop01
export { T }
