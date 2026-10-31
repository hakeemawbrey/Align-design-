// st12cancer (15 s vertical Align ad, Star Talk season 12 "Hot Takes", EP 20) · story 0–10.6, then the shared end card.
//   🔥 HOT TAKE: "Cancers aren't clingy. They're *loyal*."  Heat 3.
//   0.00   THE TAKE. Cancer (left) smiles, a little shell-shaped heart over its head.
//   2.60   OBJECTION! Sagittarius (right) holds up a phone: the badge counts up to 9.
//          SAGITTARIUS: "they texted me *9 times.*"
//   5.05   CANCER (owning it): "i got *worried.* i'll just say so."
//   7.20   THE VERDICT: "needs are valid. say them out loud, kindly."
//   9.10   AGREE / DISAGREE? pill.  9.2  last line: "Say the *need*. It's okay."  The nine bubbles become one:
//          "can we check in tonight?"  Sagittarius sends back a heart.
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
const KEY = 'Ab'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', RED = '#ff5d73', BLUE = '#4f8cff'
const MONO = "'Space Mono', ui-monospace, monospace"
const CAN = signStar('cancer'), SAG = signStar('sagittarius')
const CANN = '♋ CANCER', SAGN = '♐ SAGITTARIUS'

// ── the timeline (15 s: the take holds 2.5 s; each box line stays ≥ 1.5 s after it finishes typing)
const CPS = 34
const OBJ = 2.5
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: SAGN, text: 'they texted me *9 times.*', color: SAG.color },
  { speaker: CANN, text: 'i *worried.* i’ll say so.', color: CAN.color },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[LT.length - 1].done + 1.5)
const TAKE = 'Cancers aren’t clingy. They’re *loyal*.'
const VERDICT = 'needs are valid. | say them out loud, kindly.'
const LAST = 'Say the *need.* | It’s okay.'
const T = {
  take: 0, takeOut: 2.5, heat: 0.45, obj: OBJ,
  open: r3(LINES[0].t - 0.2), l1: LINES[0].t, l2: LINES[1].t, close: CLOSE,
  verdict: r3(CLOSE + 0.05), verdictOut: 9.15,
  pill: 9.2, last: 9.35, out: [10.2, 10.5],
}
T.phoneUp = [OBJ, r3(OBJ + 0.3)]; T.count = [r3(OBJ + 0.3), r3(OBJ + 1.5)]; T.merge = [r3(T.last + 0.05), r3(T.last + 0.4)]; T.reply = r3(T.last + 0.6)
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: T.verdict, vEnd: verdictTimes(T.verdict, VERDICT).end }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const HEART = ['.HH.HH.', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

// ── layout
const CA0 = { x: 280, y: 1110, size: 310 }
const SA0 = { x: 820, y: 1125, size: 285 }
const PH0 = { x: 590, y: 960 }
const GROUND = 1300

const CA_HOPS = [0.15, ...talkHops(LINES, CANN, { cps: CPS }), T.last + 0.1]
const SA_HOPS = [T.obj, ...talkHops(LINES, SAGN, { cps: CPS }), T.reply]

function cancerState(t) {
  if (t < T.obj) return { mood: 'happy' }
  if (t < T.l2) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.verdict) return { mood: 'neutral', look: [1, 0] }
  if (t < T.last) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'sparkle', look: [1, 0] }
}
function sagState(t) {
  if (t < T.obj) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.l2) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.verdict) return { mood: 'happy' }
  if (t < T.reply) return { mood: 'neutral', look: [-1, -1] }
  return { mood: 'heart' }
}

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: [T.takeOut, T.takeOut + 0.18], accentColor: CAN.color })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: [T.verdictOut, T.verdictOut + 0.15] })
  const last = popText(root, LAST, { top: 300, size: 116, accentSize: 176, at: T.last, gap: 0.07, accentColor: CAN.color, wobble: true, late: 0, fit: true })
  const pillCv = layerCanvas(root, { pointerEvents: 'none' }), px = pillCv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function ground() {
    x.save()
    x.fillStyle = 'rgba(20,12,44,0.85)'; x.fillRect(0, GROUND, 1080, 160)
    x.fillStyle = '#3a2f62'; x.fillRect(0, GROUND, 1080, 8)
    x.restore()
  }
  const countAt = t => Math.min(9, Math.floor(prog(t, ...T.count) * 9 + (t >= T.count[0] ? 1 : 0)))
  /** Sagittarius's phone: the 9 little "you there?" pings stacking up, then the one clear message */
  function phone(t, ok) {
    const up = easeOutBack(prog(t, ...T.phoneUp), 2) * ok
    if (up <= 0) return
    const W = 250, H = 380, n = countAt(t), merged = prog(t, ...T.merge)
    x.save(); x.translate(PH0.x, PH0.y + (1 - up) * 300); x.rotate(0.06 + 0.015 * Math.sin(t * 1.5)); x.scale(up, up)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-W / 2 - 10, -H / 2 - 10, W + 20, H + 20, 30); x.fill()
    x.fillStyle = '#2b2350'; x.beginPath(); x.roundRect(-W / 2, -H / 2, W, H, 24); x.fill()
    x.fillStyle = '#120c2a'; x.beginPath(); x.roundRect(-W / 2 + 12, -H / 2 + 12, W - 24, H - 24, 16); x.fill()
    x.textAlign = 'left'; x.textBaseline = 'middle'
    if (merged < 1) {
      x.save(); x.globalAlpha = 1 - merged
      const PINGS = ['hey', 'you there?', 'hellooo', 'all good?', 'just checking', 'hi :)', 'u ok?', 'hey hey', 'still there?']
      for (let i = 0; i < n; i++) {
        const k = easeOutBack(prog(t, T.count[0] + i * (T.count[1] - T.count[0]) / 9, T.count[0] + i * (T.count[1] - T.count[0]) / 9 + 0.2), 2)
        const by = H / 2 - 44 - (n - 1 - i) * 36 + (merged * 40)
        if (by < -H / 2 + 24) continue
        x.save(); x.translate(-W / 2 + 26, by); x.scale(k, k)
        x.fillStyle = '#e8e2f4'; x.beginPath(); x.roundRect(0, -14, 20 + PINGS[i].length * 11.5, 28, 10); x.fill()
        x.fillStyle = INK; x.font = `700 17px ${MONO}`; x.fillText(PINGS[i], 10, 1)
        x.restore()
      }
      x.restore()
    }
    if (merged > 0) {
      const k = easeOutBack(merged, 2)
      x.save(); x.translate(0, -20); x.scale(k, k)
      x.fillStyle = '#e8e2f4'; x.beginPath(); x.roundRect(-104, -54, 208, 100, 18); x.fill()
      x.fillStyle = INK; x.font = `700 19px ${MONO}`; x.textAlign = 'center'
      x.fillText('can we check in', 0, -22); x.fillText('tonight?', 0, 10)
      x.restore()
      // the reply: a heart
      const r = easeOutBack(prog(t, T.reply, T.reply + 0.3), 2.4)
      if (r > 0) {
        x.fillStyle = BLUE; x.beginPath(); x.roundRect(W / 2 - 104, 60, 80, 56, 16); x.fill()
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, W / 2 - 64, 88, Math.round(6 * r), { outline: null })
      }
    }
    x.restore()
    // the badge
    if (n > 0 && merged < 1) {
      const bk = 1 + 0.3 * Math.max(0, Math.sin((t - T.count[0]) * 20)) * (t < T.count[1] ? 1 : 0)
      x.save(); x.translate(PH0.x + W / 2 - 4, PH0.y - H / 2 + 6); x.scale(bk * up * (1 - merged), bk * up * (1 - merged))
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
      x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 28, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#ffffff'; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 0, 2)
      x.restore()
    }
  }
  /** Cancer's loyal little heart over its head at the start, beating */
  function loyalHeart(t, c) {
    const o = 1 - prog(t, T.obj - 0.1, T.obj + 0.15) + prog(t, T.last, T.last + 0.3)
    if (o <= 0) return
    drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(c.x + 40), Math.round(c.top - 30), Math.round(7 * (1 + 0.15 * Math.max(0, Math.sin(t * 7))) * clamp(o)))
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
      drawStarChar(x, SA0.x, SA0.y, SA0.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), seed: 8, hops: SA_HOPS, pop: ok })
      phone(t, ok)
      const ca = drawStarChar(x, CA0.x, CA0.y, CA0.size, t, { color: CAN.color, glyph: CAN.glyph, ...cancerState(t), seed: 1, hops: CA_HOPS, pop: ok })
      loyalHeart(t, ca)
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

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E20', corners: 'tl bl br' })]

// ── sound
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...objectionCues(T.obj, { key: KEY }),
  ['whoosh', T.phoneUp[0], 0.35, 0.04],
  ...Array.from({ length: 9 }, (_, i) => ['pop', r3(T.count[0] + i * (T.count[1] - T.count[0]) / 9), 830.61 * Math.pow(2, (i % 5) / 12), 0.03, 0.4]),
  ...talkCues(LINES, { cps: CPS, pitch: { [CANN]: 830.61, [SAGN]: 554.37 } }),
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: 0.5, pick: 'agree' }),
  ['pop', T.last, 1108.73, 0.04, 0], ['whoosh', T.merge[0], 0.3, 0.03], ['pluck', T.merge[1], 1661.22, 0.045, 0.6, 0.3],
  ['bell', T.reply + 0.05, 1760, 0.03, 1.2, 0.4],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void lerp; void drawPixelStar; void BONE; void GOLD
