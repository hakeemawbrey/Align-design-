// st12gemini (15 s vertical Align ad, Star Talk season 12 "Hot Takes", EP 19) · story 0–10.6, then the shared end card.
//   🔥 HOT TAKE: "Geminis aren't two-faced. They're *two-hearted*."  Heat 3.
//   0.00   THE TAKE. Gemini (left) winks, two pixel hearts orbiting it.
//   2.60   OBJECTION! Capricorn (right) raises one skeptical eyebrow. CAPRICORN: "two-hearted? sounds like *spin.*"
//   5.15   GEMINI: "i feel *two* things at once."  The hearts beat in turn; a "MIXED FEELINGS: NORMAL" stamp lands.
//   7.55   THE VERDICT: "people are complicated. that's not fake, that's human."
//   9.25   AGREE / DISAGREE? pill.  9.35  last line: "Complex isn't *fake*."  Capricorn's eyebrow drops; it gets a heart.
// No ghost cameo or seed constellation this season. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, r3, verdictTimes,
} from '../../sthot.js'

export const DURATION = 15
const KEY = 'D'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1'
const MONO = "'Space Mono', ui-monospace, monospace"
const GEM = signStar('gemini'), CAP = signStar('capricorn')
const GEMN = '♊ GEMINI', CAPN = '♑ CAPRICORN'

// ── the timeline (15 s: the take holds 2.5 s; each box line stays ≥ 1.5 s after it finishes typing)
const CPS = 34
const OBJ = 2.5
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: CAPN, text: 'nice *spin,* Gemini.', color: CAP.color },
  { speaker: GEMN, text: 'i feel *two* things at once.', color: GEM.color },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[LT.length - 1].done + 1.5)
const TAKE = 'Geminis aren’t two-faced. They’re *two-hearted*.'
const VERDICT = 'people are complicated. | that’s not fake, that’s human.'
const LAST = 'Complex isn’t | *fake.*'
const T = {
  take: 0, takeOut: 2.5, heat: 0.45, obj: OBJ,
  open: r3(LINES[0].t - 0.2), l1: LINES[0].t, l2: LINES[1].t, close: CLOSE,
  verdict: r3(CLOSE + 0.05), verdictOut: 9.15,
  pill: 9.2, last: 9.35, out: [10.2, 10.5],
}
T.brow = r3(OBJ + 0.05); T.stampIn = r3(LT[1].done + 0.15); T.share = r3(T.last + 0.25)
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: T.verdict, vEnd: verdictTimes(T.verdict, VERDICT).end }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── layout
const GE0 = { x: 300, y: 1100, size: 320 }
const CA0 = { x: 790, y: 1115, size: 295 }
const GROUND = 1300

const GE_HOPS = [0.15, ...talkHops(LINES, GEMN, { cps: CPS }), T.last + 0.1]
const CA_HOPS = [T.obj, ...talkHops(LINES, CAPN, { cps: CPS }), T.share]

function geminiState(t) {
  if (t < T.obj) return { mood: 'wink' }
  if (t < T.l2) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.verdict) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.last) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'happy' }
}
function capState(t) {
  if (t < T.obj) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.stampIn) return { mood: 'squint', look: [-1, 0] }
  if (t < T.verdict) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.share) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'heart' }
}

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: [T.takeOut, T.takeOut + 0.18], accentColor: PINK })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: [T.verdictOut, T.verdictOut + 0.15] })
  const last = popText(root, LAST, { top: 300, size: 116, accentSize: 200, at: T.last, gap: 0.07, accentColor: PINK, wobble: true, late: 1, lateAt: T.last + 0.2, fit: true })
  const pillCv = layerCanvas(root, { pointerEvents: 'none' }), px = pillCv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function ground() {
    x.save()
    x.fillStyle = 'rgba(20,12,44,0.85)'; x.fillRect(0, GROUND, 1080, 160)
    x.fillStyle = '#3a2f62'; x.fillRect(0, GROUND, 1080, 8)
    x.restore()
  }
  /** Gemini's two hearts: orbiting, beating in turn while it explains; one flies to Capricorn at the end */
  function hearts(t, g, ok) {
    const shareP = ease.inOutCubic(prog(t, T.share - 0.35, T.share + 0.15))
    for (let i = 0; i < 2; i++) {
      const a = t * 1.6 + i * Math.PI
      let hx = g.x + Math.cos(a) * 190, hy = g.y - 40 + Math.sin(a) * 60
      const beat = t > T.l2 && t < T.verdict ? 1 + 0.35 * Math.max(0, Math.sin((t - T.l2) * 8 + i * Math.PI)) : 1 + 0.08 * Math.sin(t * 5 + i)
      if (i === 1 && shareP > 0) { hx = lerp(hx, CA0.x + 120, shareP); hy = lerp(hy, CA0.y - 150, shareP) - Math.sin(Math.PI * shareP) * 140 }
      const col = i === 0 ? { H: '#ff4f86', W: '#ffd1de' } : { H: '#ff9a3a', W: '#ffe2b8' }
      drawBits(x, HEART, col, Math.round(hx), Math.round(hy), Math.round(8 * beat * ok))
    }
  }
  /** Capricorn's skeptical eyebrow: a pixel bar over its left eye, raised from the objection until the stamp lands */
  function eyebrow(t, c) {
    const up = easeOutBack(prog(t, T.brow, T.brow + 0.25), 3) * (1 - ease.inOutCubic(prog(t, T.stampIn, T.stampIn + 0.4)))
    if (up <= 0.01) return
    const s = c.size / 36
    x.save(); x.translate(c.x - 6 * s, c.y - 4.5 * s - up * 2.2 * s); x.rotate(-0.28 * up)
    x.fillStyle = INK; x.fillRect(-3 * s, -0.8 * s, 6 * s, 1.6 * s)
    x.restore()
  }
  /** the stamp over Gemini's hearts: "MIXED FEELINGS: NORMAL" */
  function feelingsStamp(t) {
    const p = prog(t, T.stampIn, T.stampIn + 0.25), o = 1 - prog(t, T.verdict - 0.2, T.verdict)
    if (p <= 0 || o <= 0) return
    const k = lerp(1.8, 1, ease.outCubic(p))
    x.save(); x.translate(GE0.x + 20, GE0.y - 260); x.rotate(-0.12); x.scale(k, k); x.globalAlpha = clamp(p * 3) * o
    x.strokeStyle = '#5fe08a'; x.lineWidth = 6; x.strokeRect(-190, -42, 380, 84)
    x.fillStyle = '#5fe08a'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('MIXED FEELINGS:', 0, -14); x.fillText('NORMAL ✓', 0, 18)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      x.clearRect(0, 0, 1080, 1920)
      const ok = outK(t, T.out)
      const shake = objectionShake(t, T.obj) + slamShake(t, verdict.slam, 6)
      const sp = t >= T.l1 && t < T.close ? (t >= T.l2 ? 'left' : 'right') : null
      x.save(); x.translate(shake, 0); x.globalAlpha = ok
      drawHotSet(x, t, { heat: 0.4 + 0.35 * Math.min(1, Math.max(0, (t - T.obj) / 0.5)), dim: 0.35, spot: sp })
      x.restore()
      x.save(); x.translate(shake, -shake * 0.4)
      const ca = drawStarChar(x, CA0.x, CA0.y, CA0.size, t, { color: CAP.color, glyph: CAP.glyph, ...capState(t), seed: 6, hops: CA_HOPS, pop: ok })
      eyebrow(t, ca)
      const ge = drawStarChar(x, GE0.x, GE0.y, GE0.size, t, { color: GEM.color, glyph: GEM.glyph, ...geminiState(t), seed: 2, hops: GE_HOPS, pop: ok })
      hearts(t, ge, ok)
      feelingsStamp(t)
      x.restore()
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, t < T.last ? 0 : ok)
      px.clearRect(0, 0, 1080, 1920)
      heatMeter(px, t, { level: 3, at: T.heat, out: [T.verdict - 0.2, T.verdict] })
      objection(px, t, { at: T.obj, x: 560, y: 780 })
      agreePill(px, t, { at: T.pill, dur: 0.5, pick: 'agree' })
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E19', corners: 'tl bl br' })]

// ── sound
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...objectionCues(T.obj, { key: KEY }),
  ['pluck', T.brow + 0.05, 587.33, 0.04, 0.4, 0.4],
  ...talkCues(LINES, { cps: CPS, pitch: { [GEMN]: 1174.66, [CAPN]: 493.88 } }),
  ['tick', T.stampIn, 0.1], ['boom', T.stampIn, 0.12], ['pop', T.stampIn + 0.05, 1479.98, 0.04, -0.3],
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: 0.5, pick: 'agree' }),
  ['pop', T.last, 1174.66, 0.04, 0], ['pluck', T.last + 0.2, 1479.98, 0.045, 0.6, 0],
  ['whoosh', T.share - 0.3, 0.4, 0.03], ['bell', T.share + 0.15, 1760, 0.03, 1.2, 0.4],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void drawPixelStar; void BONE; void GOLD
