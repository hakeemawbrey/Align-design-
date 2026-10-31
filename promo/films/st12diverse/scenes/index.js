// st12diverse (20 s vertical Align ad, Star Talk season 12 "HOT TAKES", E28) · story 0–15.6, then the shared end card.
//   🔥 "In Houston, date *outside* your bubble."  Heat 3.
//   0.00       frame 0 = the thumbnail: the hot-take stamp + the take; the Houston star (HOU) mid-point at a shy grey star sealed
//              inside a big wobbly soap bubble, by the Buffalo Bayou on a pixel night map. Heat meter → 3.
//   2.95       OBJECTION! (from inside the bubble). SHY STAR: "i like my *usual*."
//   ~5.3       HOUSTON: "the Heights. Montrose. the *Bayou*."  Neighbourhood pins pop up on the map one by one (public geography).
//   ~7.9       POP: the bubble bursts; the shy star blinks in the open air, then smiles.
//   ~8.4       THE STARS RULE: "Houston is often called one of the most diverse cities in the country. say yes to new."
//              (hedged, exactly as the brief gives it)
//   ~12.9      AGREE / DISAGREE?   ~13.0 "New *neighborhood*. | New story."  The end rhymes with frame 0: the same framing, but the
//              shy star is outside, walking the bayou path with a date star, and now it's the one blowing bubbles.
//   Rewatch bait: a tiny pixel duck paddles along the bayou all film and, at the end, has a date too.
// One canvas, DOM type, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, lineTimes, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { gaspZoom } from '../../st5cast.js'
import { hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, agreePill, cityStar, verdictCues, verdictTimes, agreeCues, loadHotFonts } from '../../sthot.js'

export const DURATION = 20
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', TEAL = '#5fe0c8', PINK = '#ff8fb1', SHYC = '#b9b6cf'

const T = {
  take: 0, takeOut: [2.75, 2.95], heat: 0.35,
  obj: 2.95, open: 3.1, l1: 3.25,
  l2: 5.4, pins: [5.6, 6.0, 6.45], l3: 8.2, pop: 9.25, close: 10.25,
  verdict: 10.35, verdictOut: [12.85, 13.05],
  pill: 12.85, pillDur: 0.55,
  last: 13.3, lastLand: 13.65, walk: 13.1, out: [15.1, 15.45],
}
const HO = 'HOUSTON STAR', SH = 'SHY STAR'
const LINES = [
  { t: T.l1, speaker: SH, text: 'i like my *usual*.', color: '#d9d4f2' },
  { t: T.l2, speaker: HO, text: 'the Heights. Montrose. the *Bayou*.', color: '#ff9a6b' },
]
const CPS = 29
const TAKE = 'In Houston, date *outside* your bubble.'
const VERDICT = 'Houston is often called one of the most diverse | cities in the country. say *yes* to new.'
const LAST = 'New *neighborhood*. | New story.'

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
T.l2 = LINES[1].t; T.pins = [r3(T.l2 + 0.2), r3(T.l2 + 0.6), r3(T.l2 + 1.05)]; T.pop = r3(T.close - 0.5); T.walk = r3(T.pill - 0.2)

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const HOU0 = { x: 300, y: 1130, size: 280 }
const SHY0 = { x: 770, y: 1150, size: 220 }
const PINS = [{ name: 'THE HEIGHTS', x: 300, y: 760 }, { name: 'MONTROSE', x: 620, y: 700 }, { name: 'THE BAYOU', x: 860, y: 820 }]

const HO_HOPS = [0.25, ...talkHops(LINES, HO, { cps: CPS }), T.pop + 0.1]
const SH_HOPS = [T.obj + 0.05, ...talkHops(LINES, SH, { cps: CPS }), T.pop + 0.05, T.last]

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#060a18' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: T.takeOut, accentColor: TEAL })
  const box = dialogueBox(root, { lines: LINES, y: 1500, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: T.verdictOut })
  const last = popText(root, LAST, { top: 250, size: 100, accentSize: 150, at: T.last, gap: 0.08, accentColor: TEAL, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** the night city: a skyline silhouette, the bayou winding across, a path */
  function city(t) {
    x.save()
    x.fillStyle = '#0f1630'
    const B = [[40, 120], [120, 220], [200, 160], [270, 300], [350, 200], [430, 340], [520, 260], [600, 380], [690, 240], [770, 310], [850, 180], [930, 250], [1010, 140]]
    for (const [bx, h] of B) x.fillRect(bx, 1000 - h, 74, h)
    x.fillStyle = 'rgba(255,214,120,0.55)'
    for (const [bx, h] of B) for (let wy = 1000 - h + 16; wy < 990; wy += 26) for (let wx = bx + 10; wx < bx + 64; wx += 20) if (((wx * 7 + wy * 3) % 5) < 2) x.fillRect(wx, wy, 8, 10)
    x.fillStyle = '#16301f'; x.fillRect(0, 1000, 1080, 920)
    // the bayou
    x.fillStyle = '#1d4a6a'
    for (let yy = 1330; yy < 1500; yy += 4) { const off = Math.sin(yy / 40) * 40; x.fillRect(0, yy, 1080, 4); void off }
    x.strokeStyle = 'rgba(160,220,255,0.35)'; x.lineWidth = 3
    for (let k = 0; k < 3; k++) { x.beginPath(); for (let xx = 0; xx <= 1080; xx += 20) { const yy = 1360 + k * 40 + Math.sin(xx / 70 + t * 1.5 + k) * 6; if (xx === 0) x.moveTo(xx, yy); else x.lineTo(xx, yy) } x.stroke() }
    // path along it
    x.fillStyle = '#5a4a3a'; x.fillRect(0, 1270, 1080, 50)
    x.restore()
  }
  /** the duck (the rewatch bait): paddles left to right; has a date by the end */
  function duck(t, k) {
    const dx = ((t * 40) % 1300) - 110, dy = 1420 + Math.sin(t * 3) * 3
    const one = (cx, col) => { x.fillStyle = INK; x.fillRect(cx - 16, dy - 26, 36, 26); x.fillStyle = col; x.fillRect(cx - 12, dy - 22, 28, 18); x.fillRect(cx + 4, dy - 36, 14, 14); x.fillStyle = '#ff9a3a'; x.fillRect(cx + 18, dy - 30, 8, 5) }
    x.save(); x.globalAlpha = k; one(dx, '#f7e08a'); if (t >= T.walk) one(dx - 46, '#e6e6ee'); x.restore()
  }
  function pins(t, k) {
    PINS.forEach((p, i) => {
      const s = pop01(t, T.pins[i], 0.36, 2.4) * k
      if (s <= 0) return
      x.save(); x.translate(p.x, p.y); x.scale(s, s)
      x.fillStyle = INK; x.beginPath(); x.arc(0, -40, 34, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-26, -20); x.lineTo(0, 16); x.lineTo(26, -20); x.fill()
      x.fillStyle = [PINK, TEAL, GOLD][i]; x.beginPath(); x.arc(0, -40, 28, 0, Math.PI * 2); x.fill(); x.beginPath(); x.moveTo(-22, -24); x.lineTo(0, 8); x.lineTo(22, -24); x.fill()
      x.fillStyle = BONE; x.fillRect(-8, -48, 16, 16)
      x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const w = x.measureText(p.name).width + 24
      x.fillStyle = 'rgba(14,10,30,0.92)'; x.fillRect(-w / 2, 22, w, 40); x.fillStyle = BONE; x.fillText(p.name, 0, 43)
      x.restore()
    })
  }
  /** a wobbly soap bubble with a rainbow rim; bursts at T.pop into droplets */
  function bubble(t, cx, cy, R, at) {
    const pp = prog(t, at, at + 0.45)
    if (pp >= 1) return
    x.save()
    if (pp <= 0) {
      const wob = 1 + 0.03 * Math.sin(t * 5), wob2 = 1 - 0.03 * Math.sin(t * 5)
      x.globalAlpha = 0.18; x.fillStyle = '#bfe8ff'; x.beginPath(); x.ellipse(cx, cy, R * wob, R * wob2, 0, 0, Math.PI * 2); x.fill()
      x.globalAlpha = 0.85; x.lineWidth = 8
      const g = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
      g.addColorStop(0, '#9fe8ff'); g.addColorStop(0.35, '#ff9fe0'); g.addColorStop(0.7, '#ffe48a'); g.addColorStop(1, '#9fffd0')
      x.strokeStyle = g; x.beginPath(); x.ellipse(cx, cy, R * wob, R * wob2, 0, 0, Math.PI * 2); x.stroke()
      x.globalAlpha = 0.8; x.fillStyle = '#ffffff'; x.fillRect(cx - R * 0.55, cy - R * 0.6, 22, 22); x.fillRect(cx - R * 0.4, cy - R * 0.7, 12, 12)
    } else {
      for (let i = 0; i < 18; i++) {
        const a = i / 18 * Math.PI * 2, d = R * (1 + 0.6 * ease.outCubic(pp))
        x.globalAlpha = 1 - pp; x.fillStyle = ['#9fe8ff', '#ff9fe0', '#ffe48a'][i % 3]
        x.fillRect(cx + Math.cos(a) * d - 6, cy + Math.sin(a) * d - 6, 12, 12)
      }
    }
    x.restore()
  }
  /** small bubbles blown at the end (the rhyme) */
  function smallBubbles(t, cx, cy, k) {
    if (k <= 0) return
    for (let i = 0; i < 5; i++) {
      const p = ((t - T.walk) * 0.7 + i * 0.2) % 1
      if (t < T.walk + i * 0.15) continue
      const bx = cx + p * 160 + Math.sin(p * 9 + i) * 20, by = cy - p * 300
      x.save(); x.globalAlpha = k * (1 - p) * 0.9; x.strokeStyle = ['#9fe8ff', '#ff9fe0', '#ffe48a'][i % 3]; x.lineWidth = 4
      x.beginPath(); x.arc(bx, by, 16 + i * 4, 0, Math.PI * 2); x.stroke(); x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      city(t)
      const ok = popOut(t, T.out)
      pins(t, ok * (1 - prog(t, T.walk - 0.3, T.walk)))
      duck(t, ok)
      const z = gaspZoom(t, { at: T.pop - 0.05, dur: 1.3, x: SHY0.x, y: SHY0.y - 40, amount: 0.25, follow: 0.6 })
      x.save(); z.apply(x)
      const walkK = ease.inOutQuad(prog(t, T.walk, T.walk + 0.8))
      // Houston: mid-point at frame 0, steps back at the end
      const hx = lerp(HOU0.x, 200, walkK)
      const hMood = t < T.obj ? { mood: 'wink', look: [1, 0] } : t < T.l2 ? { mood: 'wide', look: [1, 0], blink: false } : t < T.pop ? { mood: 'sparkle', look: [1, 0] } : { mood: 'happy', look: [1, 0] }
      const rh = cityStar(x, hx, HOU0.y, HOU0.size, t, { city: 'HOU', ...hMood, pop: ok, seed: 6, hops: HO_HOPS, glow: 0.9 })
      // the pointing hand (frame 0)
      const pk = 1 - prog(t, T.obj, T.obj + 0.3)
      if (pk > 0 && rh) { x.save(); x.globalAlpha = pk * ok; x.fillStyle = INK; x.fillRect(hx + 140, HOU0.y - 30, 90, 30); x.fillStyle = '#ffd9a8'; x.fillRect(hx + 144, HOU0.y - 26, 82, 22); x.fillRect(hx + 214, HOU0.y - 34, 22, 14); x.restore() }
      // the shy star, in its bubble, then out walking with a date
      const sx = lerp(SHY0.x, 620, walkK), sy = lerp(SHY0.y, 1180, walkK)
      const sMood = t < T.obj ? { mood: 'neutral', look: [-1, 0] } : t < T.l2 + 1.2 ? { mood: 'squint', look: [-1, 0] } : t < T.pop ? { mood: 'neutral', look: [0, 1] } : t < T.pop + 0.6 ? { mood: 'wide', look: [0, 0], blink: false } : { mood: 'happy', look: [1, 0] }
      drawStarChar(x, sx, sy, SHY0.size, t, { color: SHYC, ...sMood, pop: ok, seed: 13, hops: SH_HOPS, glow: 0.6 })
      bubble(t, SHY0.x, SHY0.y - 20, 170, T.pop)
      if (walkK > 0) {
        drawStarChar(x, lerp(1200, 860, walkK), 1190, 220, t, { color: STAR.bone, mood: 'happy', look: [-1, 0], pop: ok, seed: 21, glow: 0.7 })
        smallBubbles(t, sx + 60, sy - 80, ok)
      }
      x.restore()
      objection(x, t, { at: T.obj, x: 770, y: 860 })
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
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E28' })]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: T.pillDur }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [HO]: 620, [SH]: 1174.66 } }),
  ...T.pins.map((p, i) => ['pop', p + 0.05, NOTE[(i * 2 + 1) % NOTE.length], 0.04, [-0.4, 0.1, 0.5][i]]),
  ['pop', T.pop, 1760, 0.06, 0.4], ['glitter', T.pop, T.pop + 0.6], ['whoosh', T.pop - 0.1, 0.3, 0.03],
  ['pop', T.close, 880, 0.03, 0],
  ['whoosh', T.walk, 0.5, 0.03],
  ...wordPops(T.last, 3, 0.08, 0, 0.026), ['pop', T.lastLand, 1479.98, 0.05, 0], ['pluck', T.lastLand, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...endcardCues(STORY_END),
]
void clamp; void drawPixelStar
export { T }
