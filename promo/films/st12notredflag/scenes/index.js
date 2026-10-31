// st12notredflag — Star Talk S12 "Hot Takes" E15 (20 s vertical, music: screwed · Em). Story 0–15.6, then the end card.
//   0.00       🔥 HOT TAKE: "Your sign isn't a red flag. | Your *behavior* is."  ♏ Scorpio (left, tired of the jokes)
//              smirks in a little lawn of red pixel flags the memes planted around it. HEAT 5/5 fills top-right.
//   2.90       OBJECTION! ♊ Gemini slides in with a phone showing the meme (♏ = a red flag). GEMINI: "but the *memes!*"
//   ~4.9       SCORPIO: "a meme isn't a *personality test.*"  The red flags pop away one by one.
//   ~7.6       GEMINI (sheepish, the phone dims): "okay… the memes are a little *mean.*"
//   ~10.3      THE VERDICT: "astrology describes, | it doesn't excuse. *own your actions.*"
//   12.85      AGREE / DISAGREE? pill (the cursor taps 🔥).
//   13.45      "Signs describe. | *You* decide."  The one flag left turns green; Scorpio winks, Gemini grins.
// No ghost cameo or seed constellation this season (STARTALK14.md). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, HOT, easeOutBack, outK, r3, verdictTimes,
} from '../../sthot.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const KEY = 'Em'
const SCO = signStar('scorpio'), GEM = signStar('gemini')
const SS = `${SCO.glyph}︎ SCORPIO`, SG = `${GEM.glyph}︎ GEMINI`
const GREEN = '#5fe08a', MONO = "'Space Mono', ui-monospace, monospace"

// ── the beats
const TAKE = { take: 'Your sign isn’t a red flag. | Your *behavior* is.', at: 0, out: [2.85, 3.05], accentColor: HOT.red }
const HEAT = { level: 5, at: 0.5 }
const OBJ = 2.9
const CPS = 34
/** lines chained so each stays readable ≥ 1.5 s after it finishes typing */
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: SG, color: '#ffe27a', text: 'but the *memes!*' },
  { speaker: SS, color: '#ff8fa8', text: 'a meme isn’t a *personality test.*' },
  { speaker: SG, color: '#ffe27a', text: 'okay… the memes are a little *mean.*' },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[2].done + 1.5)
const VERDICT = { at: r3(CLOSE + 0.05), text: 'astrology describes, | it doesn’t excuse. own your actions.' }
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: VERDICT.at, vEnd: verdictTimes(VERDICT.at, VERDICT.text).end }
const PILL = { at: 13.2, dur: 0.6, pick: 'agree' }
const LAST = { text: 'Signs describe. | *You* decide.', at: 13.75 }
const T = {
  slide: [OBJ - 0.05, OBJ + 0.3],
  flags: LT[1].chars.length ? LT[1].chars[8] : LINES[1].t + 0.3,
  dim: LINES[2].t,
  vOut: [r3(PILL.at - 0.15), r3(PILL.at + 0.02)],
  green: r3(LAST.at + 0.35),
  out: [STORY_END - 0.45, STORY_END - 0.1],
}
const HOPS = {
  sco: [0.3, ...talkHops(LINES, SS, { cps: CPS }), T.green + 0.05],
  gem: [OBJ + 0.32, ...talkHops(LINES, SG, { cps: CPS }), LAST.at + 0.2],
}
const SCO_P = { x: 310, y: 1060, size: 300 }, GEM_P = { x: 800, y: 1070, size: 270 }

// ── moods: [t, { mood, look, ... }]
const S_ = (mood, look = [0, 0], o = {}) => ({ mood, look, ...o })
const keyed = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
const SCO_K = [
  [0, S_('squint', [1, 0])], [OBJ, S_('eyeroll')], [OBJ + 1.1, S_('squint', [1, 0])], [LINES[1].t, S_('neutral', [1, 0])],
  [T.flags, S_('happy', [1, 0])], [LINES[2].t, S_('neutral', [1, 0])], [VERDICT.at, S_('neutral', [0, -1])], [T.green, S_('wink', [1, 0])],
]
const GEM_K = [
  [0, S_('happy', [-1, 0])], [LINES[1].t, S_('wide', [-1, 0], { blink: false })], [LINES[2].t, S_('neutral', [-1, 1])],
  [VERDICT.at, S_('neutral', [0, -1])], [LAST.at, S_('happy', [-1, 0])],
]

// ── the flags: planted around Scorpio at t = 0; five pop away while it talks, the last turns green at the end
const FLOOR = 1290
const FLAG_BM = ['FFFFF.', 'FFFFFF', 'FFFFF.', 'FF....']
const FLAGS = [
  { x: 120, h: 130 }, { x: 196, h: 172 }, { x: 452, h: 160 }, { x: 540, h: 118 }, { x: 70, h: 96 }, { x: 500, h: 208, keep: true },
]
FLAGS.forEach((f, i) => { if (!f.keep) f.pop = r3(T.flags + 0.22 * i) })

async function build(stage) {
  await loadHotFonts()
  const root = fill(stage, { background: '#0a0616' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, TAKE)
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: CLOSE, cps: CPS })
  const verdict = verdictCard(root, { ...VERDICT, out: T.vOut })
  const last = popText(root, LAST.text, { top: 250, size: 112, accentSize: 168, at: LAST.at, gap: 0.12, accentColor: GREEN, wobble: true })
  const ov = layerCanvas(root), ox = ov.getContext('2d')            // the overlay canvas: meter, objection, pill
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function sparks(t, cx, cy, t0, n, R, cols, life = 0.6) {
    const d = t - t0
    if (d < 0 || d > life) return
    const p = ease.outCubic(d / life)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(d / life)
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + t0; drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), 22 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  function flag(fx, h, k, col, wave) {
    if (k <= 0.01) return
    x.save(); x.translate(fx, FLOOR + 4); x.scale(k, k)
    x.fillStyle = HOT.ink; x.fillRect(-6, -h - 6, 12, h + 6)
    x.fillStyle = '#e8d6b0'; x.fillRect(-2, -h, 4, h)
    drawBits(x, FLAG_BM, { F: col }, 32 + Math.sin(wave) * 2, -h + 22, 10, { rot: 0.05 * Math.sin(wave * 1.3) })
    x.restore()
  }
  /** Gemini's phone: the meme (♏ = 🚩); it dims when Gemini admits the memes are mean */
  function phone(cx, cy, k, t) {
    if (k <= 0.01) return
    const dim = clamp((t - T.dim) / 0.3)
    x.save(); x.translate(cx, cy); x.rotate(-0.14 + 0.03 * Math.sin(t * 3)); x.scale(k, k)
    x.fillStyle = HOT.ink; x.fillRect(-62, -100, 124, 200)
    x.fillStyle = '#3a2a5a'; x.fillRect(-56, -94, 112, 188)
    x.fillStyle = dim > 0.5 ? '#2a2248' : '#fff6e4'; x.fillRect(-46, -78, 92, 150)
    x.fillStyle = dim > 0.5 ? '#6a628f' : HOT.ink; x.font = `700 17px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('MEME', 0, -62)
    x.font = `600 52px 'EB Garamond', 'DejaVu Sans', serif`; x.fillStyle = dim > 0.5 ? '#6a628f' : SCO.color; x.fillText('♏︎', -18, -16)
    x.font = `700 30px ${MONO}`; x.fillStyle = dim > 0.5 ? '#6a628f' : HOT.ink; x.fillText('=', 22, -16)
    drawBits(x, FLAG_BM, { F: dim > 0.5 ? '#5a527f' : HOT.red }, 0, 34, 7)
    x.fillStyle = '#6a5a8a'; x.fillRect(-14, 80, 28, 6)
    x.restore()
  }

  function scene(t) {
    const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
    const fade = 1 - ease.inOutQuad(prog(t, ...T.out))
    x.clearRect(0, 0, 1080, 1920)
    x.save(); x.translate(sh, 0); x.globalAlpha = fade
    const speaking = t >= LINES[0].t && t < CLOSE ? (keyedSpeaker(t) === SS ? 'left' : 'right') : null
    drawHotSet(x, t, { heat: 0.55 + 0.4 * clamp((t - OBJ) / 0.5), dim: 0.35, spot: speaking })
    // the flags
    FLAGS.forEach((f, i) => {
      const fx = SCO_P.x + f.x - 310
      let k = 1, col = HOT.red
      if (f.pop != null) { const p = prog(t, f.pop, f.pop + 0.16); k = 1 - p; sparks(t, fx + 30, FLOOR - f.h + 22, f.pop, 8, 56, [HOT.red, HOT.bone, HOT.gold]) }
      else { const g = prog(t, T.green, T.green + 0.3); col = g > 0.5 ? GREEN : HOT.red; k = 1 + 0.3 * Math.sin(Math.PI * g); sparks(t, fx + 30, FLOOR - f.h + 22, T.green + 0.15, 10, 80, [GREEN, HOT.bone, HOT.gold]) }
      flag(fx, f.h, k, col, t * 4 + i)
    })
    // ♏ Scorpio
    drawStarChar(x, SCO_P.x, SCO_P.y, SCO_P.size, t, { color: SCO.color, glyph: SCO.glyph, ...keyed(t, SCO_K), hops: HOPS.sco, seed: 7 })
    // ♊ Gemini slides in on the objection
    if (t >= T.slide[0]) {
      const inK = easeOutBack(prog(t, ...T.slide), 1.6)
      const gx0 = lerp(1300, GEM_P.x, inK)
      const gr = drawStarChar(x, gx0, GEM_P.y, GEM_P.size, t, { color: GEM.color, glyph: GEM.glyph, ...keyed(t, GEM_K), hops: HOPS.gem, seed: 3, squash: t < T.slide[1] + 0.2 ? 0.1 * Math.sin((t - OBJ) * 20) * (1 - prog(t, OBJ, OBJ + 0.5)) : 0 })
      const pk = easeOutBack(prog(t, T.slide[1], T.slide[1] + 0.25), 2) * (1 - prog(t, VERDICT.at - 0.2, VERDICT.at))
      phone(gr.x - 175, gr.y + 20, pk, t)
    }
    x.restore()
  }
  const keyedSpeaker = t => { let s = LINES[0].speaker; for (const l of LINES) if (t >= l.t) s = l.speaker; return s }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      scene(t)
      stamp.update(t)
      box.update(t)
      verdict.update(t)
      last.update(t, t < LAST.at ? 0 : outK(t, T.out))
      ox.clearRect(0, 0, 1080, 1920)
      heatMeter(ox, t, { ...HEAT, out: [VERDICT.at - 0.2, VERDICT.at] })
      objection(ox, t, { at: OBJ, x: 560, y: 790 })
      agreePill(ox, t, PILL)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E15', corners: 'tl bl br' })]

const NOTE = [659.25, 739.99, 783.99, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY, level: HEAT.level, meterAt: HEAT.at }),
  ...objectionCues(OBJ, { key: KEY }), ['whoosh', T.slide[0], 0.35, 0.05],
  ...FLAGS.filter(f => f.pop != null).map((f, i) => ['pop', f.pop, NOTE[(5 - i) % NOTE.length], 0.035, (f.x - 310) / 500]),
  ['pop', r3(T.dim + 0.1), 330, 0.03, 0.3],
  ...verdictCues(VERDICT.at, { text: VERDICT.text, key: KEY }),
  ...agreeCues(PILL.at, PILL),
  ...wordPops(LAST.at, 4, 0.12, 1), ['pluck', r3(LAST.at + 0.12), 1174.66, 0.04, 0.6, 0],
  ['bell', r3(T.green + 0.15), 1567.98, 0.035, 1.2, 0.3], ['glitter', T.green, r3(T.green + 0.6)],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [SS]: 523.25, [SG]: 987.77 } }),
  ...endcardCues(STORY_END),
]
