// st12dealbreaker (15 s vertical Align ad, Star Talk season 12 "Hot Takes", EP 18) · story 0–10.6, then the shared end card.
//   🔥 HOT TAKE: "Astrology is a conversation starter, not a *dealbreaker*."  Heat 3.
//   0.00   THE TAKE. Virgo (left, clipboard) smirks. A star (right) holds a dating-app phone with its filter set to
//          "EARTH SIGNS ONLY" (♉ ♍ ♑).
//   2.60   OBJECTION! A STAR: "i only date *earth signs.*"
//   5.05   VIRGO taps the phone: the filter flips to "EVERYONE". VIRGO: "*ask* them a question."
//   7.20   THE VERDICT: "a sign tells you a vibe. a conversation tells you a person."
//   9.10   AGREE / DISAGREE? pill.  9.2  last line: "Ask, don't *rule out*."  The phone now shows a first question.
// No ghost cameo or seed constellation this season. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, r3, verdictTimes,
} from '../../sthot.js'

export const DURATION = 15
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', GREEN = '#5fe08a', RED = '#ff5d73'
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const VIR = signStar('virgo'), STARC = '#9fc8ff'
const VIRN = '♍ VIRGO', STARN = '★ A STAR'

// ── the timeline (15 s: the take holds 2.5 s; each box line stays ≥ 1.5 s after it finishes typing)
const CPS = 34
const OBJ = 2.5
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: STARN, text: 'i only date *earth signs.*', color: STARC },
  { speaker: VIRN, text: '*ask* them a question.', color: VIR.color },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[LT.length - 1].done + 1.5)
const TAKE = 'Astrology is a conversation starter, not a *dealbreaker*.'
const VERDICT = 'a sign tells you a vibe. | a conversation tells you a person.'
const LAST = 'Ask, don’t | *rule out.*'
const T = {
  take: 0, takeOut: 2.5, heat: 0.45, obj: OBJ,
  open: r3(LINES[0].t - 0.2), l1: LINES[0].t, l2: LINES[1].t, close: CLOSE,
  verdict: r3(CLOSE + 0.05), verdictOut: 9.15,
  pill: 9.2, last: 9.35, out: [10.2, 10.5],
}
T.tap = r3(LINES[1].t - 0.1); T.ask = r3(T.last + 0.3)
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: T.verdict, vEnd: verdictTimes(T.verdict, VERDICT).end }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

// ── layout
const VI0 = { x: 290, y: 1110, size: 310 }
const ST0 = { x: 810, y: 1120, size: 280 }
const PH0 = { x: 560, y: 1000 }
const GROUND = 1300

const VI_HOPS = [0.15, ...talkHops(LINES, VIRN, { cps: CPS }), T.tap, T.last + 0.1]
const ST_HOPS = [T.obj, ...talkHops(LINES, STARN, { cps: CPS }), T.last + 0.2]

function virgoState(t) {
  if (t < T.obj) return { mood: 'squint', look: [1, 0] }
  if (t < T.l2) return { mood: 'neutral', look: [1, 0] }
  if (t < T.verdict) return { mood: 'happy' }
  if (t < T.last) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'wink' }
}
function starState(t) {
  if (t < T.obj) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.tap) return { mood: 'squint', look: [-1, 0] }
  if (t < T.verdict) return { mood: 'wide', look: [-1, 1], blink: false }
  if (t < T.last) return { mood: 'neutral', look: [0, -1] }
  return { mood: 'sparkle', look: [-1, 0] }
}

async function build(stage) {
  await loadHotFonts()

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, { take: TAKE, at: T.take, out: [T.takeOut, T.takeOut + 0.18], accentColor: VIR.color })
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const verdict = verdictCard(root, { text: VERDICT, at: T.verdict, out: [T.verdictOut, T.verdictOut + 0.15] })
  const last = popText(root, LAST, { top: 300, size: 116, accentSize: 176, at: T.last, gap: 0.07, accentColor: GOLD, wobble: true, late: 2, lateAt: T.last + 0.18, fit: true })
  const pillCv = layerCanvas(root, { pointerEvents: 'none' }), px = pillCv.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function ground() {
    x.save()
    x.fillStyle = 'rgba(20,12,44,0.85)'; x.fillRect(0, GROUND, 1080, 160)
    x.fillStyle = '#3a2f62'; x.fillRect(0, GROUND, 1080, 8)
    x.restore()
  }
  /** Virgo's clipboard, held at its right point */
  function clipboard(cx, cy, k, t) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.rotate(0.12 + 0.02 * Math.sin(t * 2)); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-46, -60, 92, 124)
    x.fillStyle = '#b07a46'; x.fillRect(-40, -54, 80, 112)
    x.fillStyle = '#fff6e4'; x.fillRect(-32, -42, 64, 92)
    x.fillStyle = '#8d86b8'; x.fillRect(-16, -62, 32, 14)
    x.fillStyle = 'rgba(27,18,54,0.5)'; for (let j = 0; j < 5; j++) x.fillRect(-24, -30 + j * 16, j === 4 ? 26 : 46, 4)
    x.fillStyle = VIR.color; x.fillRect(-26, -32, 6, 6); x.fillRect(-26, -16, 6, 6)
    x.restore()
  }
  /** the dating-app phone: a filter toggle (EARTH SIGNS ONLY → EVERYONE), then the first question */
  function phone(t, k) {
    if (k <= 0) return
    const W = 250, H = 370
    x.save(); x.translate(PH0.x, PH0.y); x.rotate(-0.05 + 0.015 * Math.sin(t * 1.4)); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-W / 2 - 10, -H / 2 - 10, W + 20, H + 20, 30); x.fill()
    x.fillStyle = '#2b2350'; x.beginPath(); x.roundRect(-W / 2, -H / 2, W, H, 24); x.fill()
    x.fillStyle = '#fff6e4'; x.beginPath(); x.roundRect(-W / 2 + 12, -H / 2 + 12, W - 24, H - 24, 16); x.fill()
    x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('FILTERS', 0, -H / 2 + 40)
    const flip = ease.inOutCubic(prog(t, T.tap, T.tap + 0.25)), asked = prog(t, T.ask, T.ask + 0.3)
    if (asked <= 0) {
      x.font = `700 17px ${MONO}`; x.fillStyle = '#5c5480'; x.fillText('SHOW ME', 0, -90)
      x.font = `700 21px ${MONO}`; x.fillStyle = INK; x.fillText(flip < 0.5 ? 'EARTH SIGNS ONLY' : 'EVERYONE', 0, -54)
      if (flip < 0.5) { x.font = `600 44px ${SYM}`; x.fillStyle = '#c98a2a'; x.fillText('♉ ♍ ♑', 0, -4) }
      else { x.font = `600 30px ${SYM}`; x.fillStyle = '#7a6ab8'; x.fillText('♈♉♊♋♌♍', 0, -16); x.fillText('♎♏♐♑♒♓', 0, 20) }
      // the toggle
      const tx = lerp(-18, 18, flip)
      x.fillStyle = flip < 0.5 ? RED : GREEN; x.beginPath(); x.roundRect(-46, 64, 92, 46, 23); x.fill()
      x.fillStyle = '#ffffff'; x.beginPath(); x.arc(tx, 87, 17, 0, Math.PI * 2); x.fill()
      x.font = `700 15px ${MONO}`; x.fillStyle = '#5c5480'; x.fillText(flip < 0.5 ? 'ON' : 'OFF', 0, 134)
    } else {
      // the first question, typed out
      const a = easeOutBack(asked, 2)
      x.save(); x.scale(a, a)
      x.fillStyle = '#4f8cff'; x.beginPath(); x.roundRect(-100, -60, 200, 100, 18); x.fill()
      x.fillStyle = '#ffffff'; x.font = `700 20px ${MONO}`
      x.fillText('so what do you', 0, -28); x.fillText('love doing?', 0, 4)
      x.restore()
      x.fillStyle = '#8d86b8'; x.font = `700 15px ${MONO}`; x.fillText('sent', 70, 60)
    }
    x.restore()
  }
  function tapSpark(t) {
    const d = t - T.tap
    if (d < 0 || d > 0.6) return
    const p = ease.outCubic(d / 0.6)
    x.save(); x.globalAlpha = 1 - ease.inQuad(d / 0.6)
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; drawPixelStar(x, PH0.x + Math.cos(a) * (60 + 110 * p), PH0.y + 87 + Math.sin(a) * (60 + 110 * p), 22, i % 2 ? 1 : 2, i % 2 ? GREEN : BONE) }
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
      const st = drawStarChar(x, ST0.x, ST0.y, ST0.size, t, { color: STARC, glyph: null, ...starState(t), seed: 9, hops: ST_HOPS, pop: ok })
      void st
      phone(t, ok)
      tapSpark(t)
      // Virgo leans toward the phone for the tap
      const lean = Math.sin(Math.PI * prog(t, T.tap - 0.25, T.tap + 0.35)) * 60
      const vi = drawStarChar(x, VI0.x + lean, VI0.y, VI0.size, t, { color: VIR.color, glyph: VIR.glyph, ...virgoState(t), seed: 4, hops: VI_HOPS, pop: ok })
      clipboard(vi.x - 150, vi.y + 20, ok, t)
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

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E18', corners: 'tl bl br' })]

// ── sound
export const CUES = [
  ...hotCues(T.take, { key: KEY, level: 3, meterAt: T.heat }),
  ...objectionCues(T.obj, { key: KEY }),
  ...talkCues(LINES, { cps: CPS, pitch: { [VIRN]: 932.33, [STARN]: 622.25 } }),
  ['tick', T.tap, 0.08], ['pop', T.tap + 0.05, 1174.66, 0.045, 0], ['pluck', T.tap + 0.1, 1396.91, 0.04, 0.5, 0],
  ...verdictCues(T.verdict, { text: VERDICT, key: KEY }),
  ...agreeCues(T.pill, { dur: 0.5, pick: 'agree' }),
  ['pop', T.last, 932.33, 0.04, 0], ['pluck', T.last + 0.18, 1396.91, 0.045, 0.6, 0],
  ['pop', T.ask, 1567.98, 0.04, 0.2],
  ['whoosh', T.out[0], 0.3, 0.03],
  ...endcardCues(STORY_END),
]
void clamp
