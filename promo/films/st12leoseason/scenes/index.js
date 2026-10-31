// st12leoseason — Star Talk S12 "Hot Takes" E21 (20 s vertical, music: funk · C). Story 0–15.6, then the end card.
//   0.00       🔥 HOT TAKE: "Leo season is the | *best* season."  ♌ Leo (centre stage, crown, mic) winks in its own
//              spotlight; the other eleven sign stars sit in a front row below the stage. HEAT 4/5 fills top-right.
//   2.90       OBJECTION! The front row erupts: pixel "BOO" bubbles. THE OTHER ELEVEN: "*BOO!*"
//   ~4.5       LEO: "it's my *birthday* season!"
//   ~6.9       ♑ CAPRICORN hops up from the row: "mine's in *winter.* where's my party?"
//   ~9.9       THE VERDICT: "every season is someone's birthday. | celebrate them all."
//   13.20      AGREE / DISAGREE? pill.
//   13.75      "Every season is | *someone's.*"  The spotlight widens over all twelve; party hats and confetti for everyone.
// No ghost cameo or seed constellation this season (STARTALK14.md). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawBits } from '../../st5cast.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, HOT, easeOutBack, outK, r3, rgba, verdictTimes,
} from '../../sthot.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const KEY = 'C'
const LEO = signStar('leo'), CAP = signStar('capricorn')
const SL = `${LEO.glyph}︎ LEO`, SC = `${CAP.glyph}︎ CAPRICORN`, SE = '★ THE OTHER ELEVEN'
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"

// ── the beats
const TAKE = { take: 'Leo season is the | *best* season.', at: 0, out: [2.85, 3.05], accentColor: LEO.color }
const HEAT = { level: 4, at: 0.5 }
const OBJ = 2.9
const CPS = 34
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: SE, color: '#9fe8ff', text: '*BOO!*' },
  { speaker: SL, color: '#ffc27a', text: 'it’s my *birthday* season!' },
  { speaker: SC, color: '#7df0c8', text: 'mine’s in *winter.* where’s my party?' },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[2].done + 1.5)
const VERDICT = { at: r3(CLOSE + 0.05), text: 'every season is someone’s birthday. | celebrate them all.' }
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: VERDICT.at, vEnd: verdictTimes(VERDICT.at, VERDICT.text).end }
const PILL = { at: 13.2, dur: 0.6, pick: 'agree' }
const LAST = { text: 'Every season is | *someone’s.*', at: 13.75 }
const T = {
  boo: [OBJ, r3(LT[0].done + 1.2)],
  capUp: [r3(LINES[2].t - 0.25), r3(CLOSE)],
  vOut: [r3(PILL.at - 0.15), r3(PILL.at + 0.02)],
  party: r3(LAST.at + 0.3),
  out: [STORY_END - 0.45, STORY_END - 0.1],
}

// ── layout: Leo centre stage; the other eleven in a front row just below the stage edge
const FLOOR = 1290
const LEO_P = { x: 540, y: 905, size: 340 }
const CROWD = SIGNS.filter(s => s.id !== 'leo').map((s, i) => ({ id: s.id, x: Math.round(76 + i * 92.8), y: 1222 + (i % 2) * 14, size: 118, seed: 20 + i }))
const CAPM = CROWD.find(c => c.id === 'capricorn')
const HOPS = {
  leo: [0.3, ...talkHops(LINES, SL, { cps: CPS }), LAST.at + 0.15, T.party + 0.2],
  cap: [T.capUp[0] + 0.2, ...talkHops(LINES, SC, { cps: CPS })],
}

const keyed = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
const LEO_K = [
  [0, { mood: 'wink' }], [OBJ, { mood: 'wide', look: [0, 1], blink: false }], [LINES[1].t, { mood: 'sparkle', look: [0, 0] }],
  [LINES[2].t, { mood: 'wide', look: [1, 1], blink: false }], [LT[2].done + 0.3, { mood: 'neutral', look: [1, 1] }],
  [VERDICT.at, { mood: 'neutral', look: [0, -1] }], [LAST.at, { mood: 'happy' }],
]
function crowdState(t, m) {
  if (t < OBJ) return { mood: 'neutral', look: [clamp((540 - m.x) / 400, -1, 1), -1] }
  if (t < T.boo[1]) return { mood: 'squint', look: [clamp((540 - m.x) / 400, -1, 1), -1] }
  if (t < LINES[2].t) return { mood: 'eyeroll' }
  if (t < VERDICT.at) return m.id === 'capricorn' ? { mood: 'squint', look: [-1, -1] } : { mood: 'neutral', look: [clamp((CAPM.x - m.x) / 300, -1, 1), 0] }
  if (t < LAST.at) return { mood: 'neutral', look: [0, -1] }
  return { mood: (m.seed % 3) ? 'happy' : 'sparkle' }
}

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HAT = ['...W...', '..PYP..', '..YPY..', '.PYPYP.', '.YPYPY.', 'PYPYPYP']
const MIC = ['.KKK.', 'KGGGK', 'KGWGK', 'KGGGK', '.KKK.', '..D..', '..D..', '..D..', '..D..']
const MIC_C = { K: '#3a3358', G: '#9a92b8', W: '#efe6d6', D: '#2a2448' }
const CONF = ['#ff5d73', '#ffd23f', '#7fdcff', '#7dffb0', '#c9a6ff', '#ff8fb1']

async function build(stage) {
  await loadHotFonts()
  const root = fill(stage, { background: '#0a0616' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, TAKE)
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: CLOSE, cps: CPS })
  const verdict = verdictCard(root, { ...VERDICT, out: T.vOut })
  const last = popText(root, LAST.text, { top: 250, size: 112, accentSize: 176, at: LAST.at, gap: 0.12, accentColor: LEO.color, wobble: true })
  const ov = layerCanvas(root), ox = ov.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** the spotlight: tight on Leo, widening over everyone at the end */
  function spotlight(t) {
    const w = ease.inOutCubic(prog(t, LAST.at - 0.1, LAST.at + 0.6))
    const top = lerp(70, 300, w), bot = lerp(260, 700, w)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, 0, 0, FLOOR + 8)
    g.addColorStop(0, rgba('#fff1c8', 0.02)); g.addColorStop(1, rgba('#ffd27a', 0.3 + 0.08 * Math.sin(t * 5)))
    x.fillStyle = g; x.beginPath(); x.moveTo(540 - top, 0); x.lineTo(540 + top, 0); x.lineTo(540 + bot, FLOOR + 8); x.lineTo(540 - bot, FLOOR + 8); x.closePath(); x.fill()
    x.restore()
    x.save(); x.fillStyle = rgba('#ffe7b0', 0.16); x.beginPath(); x.ellipse(540, FLOOR + 8, bot * 0.9, 26, 0, 0, Math.PI * 2); x.fill(); x.restore()
  }
  /** a pixel "BOO" speech bubble over a crowd star */
  function booBubble(cx, cy, k, rot) {
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
    x.fillStyle = HOT.ink; x.fillRect(-48, -28, 96, 56); x.fillRect(-10, 26, 16, 14)
    x.fillStyle = '#fffbea'; x.fillRect(-42, -22, 84, 44); x.fillRect(-6, 20, 8, 12)
    x.fillStyle = HOT.ink; x.font = `900 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOO', 0, 2)
    x.restore()
  }
  function confetti(t) {
    const d = t - T.party
    if (d < 0) return
    for (let i = 0; i < 70; i++) {
      const h = Math.sin(i * 91.7) * 43758.5453, r = h - Math.floor(h)
      const x0 = 40 + ((i * 137) % 1000), vy = 300 + r * 380, sway = Math.sin(d * 4 + i) * 20
      const y = -40 + (d * vy + r * 500) % 1500
      if (d * vy + r * 500 < 0) continue
      x.save(); x.translate(x0 + sway, y); x.rotate(d * 6 + i)
      x.fillStyle = CONF[i % CONF.length]; x.fillRect(-7, -4, 14, 8)
      x.restore()
    }
  }
  function burst(t, cx, cy, t0, n, R, cols) {
    const d = t - t0
    if (d < 0 || d > 0.6) return
    const p = ease.outCubic(d / 0.6)
    x.save(); x.globalAlpha *= 1 - ease.inQuad(d / 0.6)
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), 22, i % 2 ? 1 : 2, cols[i % cols.length]) }
    x.restore()
  }
  const speakerAt = t => { let s = null; for (const l of LINES) if (t >= l.t) s = l.speaker; return t < CLOSE ? s : null }

  function scene(t) {
    const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
    const fade = 1 - ease.inOutQuad(prog(t, ...T.out))
    x.clearRect(0, 0, 1080, 1920)
    x.save(); x.translate(sh, 0); x.globalAlpha = fade
    const sp = speakerAt(t)
    drawHotSet(x, t, { heat: 0.5 + 0.4 * clamp((t - OBJ) / 0.5), dim: 0.45, spot: sp === SC ? 'right' : null })
    spotlight(t)
    // ♌ Leo with its crown and mic
    const lr = drawStarChar(x, LEO_P.x, LEO_P.y, LEO_P.size, t, { color: LEO.color, glyph: LEO.glyph, ...keyed(t, LEO_K), hops: HOPS.leo, seed: 5, squash: t > OBJ && t < OBJ + 0.4 ? 0.1 * Math.sin((t - OBJ) * 22) : 0 })
    drawBits(x, CROWN, CROWN_C, Math.round(lr.x + 6), Math.round(lr.top + 6), 9, { rot: -0.14 + 0.04 * Math.sin(t * 3) })
    drawBits(x, MIC, MIC_C, Math.round(lr.x + 170), Math.round(lr.y + 10), 8, { rot: -0.35 })
    // the other eleven
    for (const m of CROWD) {
      const st = signStar(m.id)
      let my = m.y, sz = m.size
      if (m.id === 'capricorn') { const u = easeOutBack(prog(t, T.capUp[0], T.capUp[0] + 0.3), 2) * (1 - ease.inOutCubic(prog(t, T.capUp[1], T.capUp[1] + 0.4))); my -= 110 * u; sz += 40 * u }
      const booHop = t >= OBJ && t < T.boo[1] ? [OBJ + (m.seed % 4) * 0.07, LINES[0].t + 0.1 + (m.seed % 3) * 0.08] : []
      const r = drawStarChar(x, m.x, my, sz, t, { color: st.color, glyph: st.glyph, ...crowdState(t, m), seed: m.seed, glow: 0.7, hops: [...booHop, ...(m.id === 'capricorn' ? HOPS.cap : []), T.party + (m.seed % 5) * 0.05] })
      // BOO bubbles: every other star, staggered
      if (m.seed % 2 === 0 || m.id === 'aries') {
        const b0 = OBJ + 0.05 + (m.seed % 5) * 0.08
        const k = easeOutBack(prog(t, b0, b0 + 0.2), 2.6) * (1 - prog(t, T.boo[1] - 0.2, T.boo[1]))
        booBubble(r.x + (m.seed % 3 - 1) * 14, r.top - 46 - (m.seed % 2) * 20, k, (m.seed % 3 - 1) * 0.15)
      }
      // party hats at the end
      const hk = easeOutBack(prog(t, T.party + (m.seed % 6) * 0.05, T.party + 0.25 + (m.seed % 6) * 0.05), 2.2)
      if (hk > 0.01) drawBits(x, HAT, { W: '#fffbea', P: CONF[m.seed % CONF.length], Y: HOT.gold }, Math.round(r.x + 4), Math.round(r.top - 10 * hk), Math.round(6 * hk), { rot: ((m.seed % 3) - 1) * 0.15 })
      burst(t, r.x, r.top, T.party + (m.seed % 6) * 0.05, 6, 40, CONF)
    }
    confetti(t)
    x.restore()
  }

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
      objection(ox, t, { at: OBJ, x: 560, y: 720 })
      agreePill(ox, t, PILL)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E21', corners: 'tl bl br' })]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY, level: HEAT.level, meterAt: HEAT.at }),
  ...objectionCues(OBJ, { key: KEY }),
  ...CROWD.filter(m => m.seed % 2 === 0 || m.id === 'aries').map(m => ['pop', r3(OBJ + 0.05 + (m.seed % 5) * 0.08), 220 + (m.seed % 5) * 20, 0.03, (m.x - 540) / 600]),
  ['whoosh', T.capUp[0], 0.3, 0.04], ['pop', r3(T.capUp[0] + 0.2), 659.25, 0.04, 0.4],
  ...verdictCues(VERDICT.at, { text: VERDICT.text, key: KEY }),
  ...agreeCues(PILL.at, PILL),
  ...wordPops(LAST.at, 4, 0.12, 1), ['pluck', r3(LAST.at + 0.36), 1318.51, 0.045, 0.6, 0],
  ['crash', T.party, { gain: 0.05, len: 1.6 }], ['glitter', T.party, r3(T.party + 1.0)],
  ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.party + i * 0.05), NOTE[(i * 2) % NOTE.length], 0.03, (i - 2.5) * 0.2]),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [SL]: 659.25, [SC]: 493.88, [SE]: 330 } }),
  ...endcardCues(STORY_END),
]
