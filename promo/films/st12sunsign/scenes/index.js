// st12sunsign — Star Talk S12 "Hot Takes" E16 (20 s vertical, music: dreamy · F). Story 0–15.6, then the end card.
//   0.00       🔥 HOT TAKE: "Your sun sign is the *least* | interesting part of you."  ☽ The Moon (left) smirks; ☉ the Sun
//              (right) dozes, eyes half shut. HEAT 4/5 fills top-right.
//   2.90       OBJECTION! The Sun flares to twice its size. SUN: "EXCUSE ME? i'm the *main event.*"
//   ~4.9       MOON: "you're the core. i'm the *feelings.*"  (in astrology: the Sun = the core self, the Moon = emotions)
//   ~7.4       A little ↑ star pops up over the stage edge. THE RISING: "and i'm the *first impression!*"
//   ~10.3      THE VERDICT: "in astrology your Moon and Rising | matter too. *you're a whole chart.*"
//   13.10      AGREE / DISAGREE? pill.
//   13.65      "You're a whole | *chart.*"  A pixel chart wheel (the twelve glyphs) rings all three.
// No ghost cameo or seed constellation this season (STARTALK14.md). Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  hotStamp, heatMeter, objection, hotCues, objectionCues, verdictCard, verdictCues, agreePill, agreeCues,
  drawHotSet, objectionShake, slamShake, loadHotFonts, HOT, easeOutBack, outK, r3, verdictTimes,
} from '../../sthot.js'
import { drawMoonChar, drawSun, MOON } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN        // 15.6
const KEY = 'F'
const SUNC = '#ffb83a', LAV = '#c9b8ff', RISEC = '#ff9fc8'
const SUNN = '☉︎ THE SUN', MOONN = MOON.tag, RISEN = '↑ THE RISING'

// ── the beats
const TAKE = { take: 'Your sun sign is the *least* | interesting part of you.', at: 0, out: [2.85, 3.05], accentColor: SUNC }
const HEAT = { level: 4, at: 0.5 }
const OBJ = 2.9
const CPS = 34
function chain(lines, t0) {
  let t = t0
  return lines.map(l => { const L = { ...l, t: r3(t) }; t = lineTimes([L], { cps: CPS })[0].done + 1.5; return L })
}
const LINES = chain([
  { speaker: SUNN, color: SUNC, text: 'EXCUSE ME? i’m the *star!*' },
  { speaker: MOONN, color: LAV, text: 'you’re the core. i’m the *feelings.*' },
  { speaker: RISEN, color: RISEC, text: 'and i’m the *first impression!*' },
], OBJ + 0.1)
const LT = lineTimes(LINES, { cps: CPS })
const CLOSE = r3(LT[2].done + 1.5)
const VERDICT = { at: r3(CLOSE + 0.05), text: 'in astrology your Moon and Rising | matter too. you’re a whole chart.' }
export const TIMING = { lines: LINES.map(l => l.t), done: LT.map(l => r3(l.done)), close: CLOSE, verdict: VERDICT.at, vEnd: verdictTimes(VERDICT.at, VERDICT.text).end }
const PILL = { at: 13.2, dur: 0.6, pick: 'agree' }
const LAST = { text: 'You’re a whole | *chart.*', at: 13.75 }
const T = {
  flare: [OBJ, OBJ + 0.35],
  calm: [LINES[1].t + 0.5, LINES[1].t + 1.5],
  rise: [r3(LINES[2].t - 0.3), r3(LINES[2].t + 0.2)],
  vOut: [r3(PILL.at - 0.15), r3(PILL.at + 0.02)],
  wheel: [LAST.at - 0.05, LAST.at + 0.75],
  out: [STORY_END - 0.45, STORY_END - 0.1],
}
const FLOOR = 1290
const MO0 = { x: 270, y: 1040, r: 138 }, SU0 = { x: 790, y: 1020 }, RI0 = { x: 540, y: 1190, size: 160 }
const MOON_HOPS = [0.3, ...talkHops(LINES, MOONN, { cps: CPS }), LAST.at + 0.1]
const RISE_HOPS = [T.rise[1], ...talkHops(LINES, RISEN, { cps: CPS }), LAST.at + 0.2]
const SUN_HOPS = talkHops(LINES, SUNN, { cps: CPS })

const keyed = (t, K) => { let v = K[0][1]; for (const [k, s] of K) if (t >= k) v = s; return v }
const MOON_K = [
  [0, { mood: 'happy' }], [OBJ, { mood: 'wide', look: [1, 0], blink: false }], [LINES[1].t, { mood: 'neutral', look: [1, 0] }],
  [LINES[2].t, { mood: 'neutral', look: [1, 1] }], [VERDICT.at, { mood: 'neutral', look: [0, -1] }], [LAST.at, { mood: 'heart' }],
]
const SUN_K = [
  [0, { eyes: 'half', look: [-1, 0] }], [OBJ, { eyes: 'open', look: [-1, 0] }], [LINES[1].t, { eyes: 'half', look: [-1, 0] }],
  [LINES[2].t, { eyes: 'open', look: [-1, 1] }], [VERDICT.at, { eyes: 'half', look: [0, 0] }], [LAST.at, { eyes: 'happy', look: [0, 0] }],
]
/** the Sun's size: calm, then the flare (about twice as big), easing back as the Moon explains */
function sunCell(t) {
  const up = easeOutBack(prog(t, ...T.flare), 2.2), down = ease.inOutCubic(prog(t, ...T.calm))
  const pulse = t > T.flare[1] && t < T.calm[0] ? 0.25 * Math.sin((t - T.flare[1]) * 9) * Math.exp(-(t - T.flare[1]) * 1.5) : 0
  return 4.6 + 3.0 * up * (1 - down) + pulse + 0.4 * down
}
function sunHop(t) {
  let h = -1e9; for (const v of SUN_HOPS) if (v <= t && v > h) h = v
  const d = t - h; return d < 0.3 ? 0.06 * Math.sin(Math.PI * d / 0.3) : 0
}

async function build(stage) {
  await loadHotFonts()
  const root = fill(stage, { background: '#0a0616' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const stamp = hotStamp(root, TAKE)
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 270, open: LINES[0].t - 0.2, close: CLOSE, cps: CPS })
  const verdict = verdictCard(root, { ...VERDICT, out: T.vOut })
  const last = popText(root, LAST.text, { top: 250, size: 112, accentSize: 190, at: LAST.at, gap: 0.12, accentColor: HOT.gold, wobble: true })
  const ov = layerCanvas(root), ox = ov.getContext('2d')
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** the chart wheel: twelve glyph segments ring around the three (the last-line rhyme) */
  function chartWheel(t) {
    const p = prog(t, ...T.wheel)
    if (p <= 0) return
    const cx = 540, cy = 1060, R = 480, sweep = Math.PI * 2 * ease.outCubic(p)
    x.save()
    x.lineWidth = 6; x.strokeStyle = 'rgba(255,210,63,0.65)'
    x.beginPath(); x.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + sweep); x.stroke()
    x.lineWidth = 3; x.strokeStyle = 'rgba(239,230,214,0.35)'
    x.beginPath(); x.arc(cx, cy, R - 76, -Math.PI / 2, -Math.PI / 2 + sweep); x.stroke()
    x.font = `600 46px 'EB Garamond', 'DejaVu Sans', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const k = prog(p, i / 14, i / 14 + 0.25)
      if (k <= 0) return
      const a = -Math.PI / 2 + (i + 0.5) / 12 * Math.PI * 2, b = -Math.PI / 2 + i / 12 * Math.PI * 2
      x.globalAlpha = 0.9 * k; x.fillStyle = s.color
      x.fillText(s.glyph + '︎', cx + Math.cos(a) * (R - 38), cy + Math.sin(a) * (R - 38) - 6 * (1 - k))
      x.strokeStyle = 'rgba(239,230,214,0.3)'; x.lineWidth = 2
      x.beginPath(); x.moveTo(cx + Math.cos(b) * (R - 76), cy + Math.sin(b) * (R - 76)); x.lineTo(cx + Math.cos(b) * R, cy + Math.sin(b) * R); x.stroke()
    })
    x.restore()
  }
  function flareSparks(t) {
    const d = t - T.flare[0]
    if (d < 0 || d > 0.8) return
    const p = ease.outCubic(d / 0.8)
    x.save(); x.globalAlpha = 1 - ease.inQuad(d / 0.8)
    for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; drawPixelStar(x, SU0.x + Math.cos(a) * (170 + 200 * p), SU0.y + Math.sin(a) * (170 + 200 * p), 24, i % 2 ? 1 : 2, i % 3 ? SUNC : HOT.bone) }
    x.restore()
  }
  const speakerAt = t => { let s = null; for (const l of LINES) if (t >= l.t) s = l.speaker; return t < CLOSE ? s : null }

  function scene(t) {
    const sh = objectionShake(t, OBJ) + slamShake(t, verdict.slam, 6)
    const fade = 1 - ease.inOutQuad(prog(t, ...T.out))
    x.clearRect(0, 0, 1080, 1920)
    x.save(); x.translate(sh, 0); x.globalAlpha = fade
    const sp = speakerAt(t)
    drawHotSet(x, t, { heat: 0.45 + 0.4 * clamp((t - OBJ) / 0.5) * (1 - 0.5 * prog(t, ...T.calm)), dim: 0.35, spot: sp === MOONN ? 'left' : sp === SUNN ? 'right' : null })
    chartWheel(t)
    // the Rising: pops up from behind the stage edge (the "horizon")
    const rp = prog(t, ...T.rise)
    if (rp > 0) {
      const ry = lerp(FLOOR + 110, RI0.y, easeOutBack(rp, 2.2))
      x.save(); x.beginPath(); x.rect(0, 0, 1080, FLOOR + 2); x.clip()
      drawStarChar(x, RI0.x, ry, RI0.size, t, { color: RISEC, glyph: null, ...keyed(t, [[0, { mood: 'wide', blink: false, look: [0, 0] }], [LT[2].done + 0.3, { mood: 'happy' }], [LAST.at, { mood: 'sparkle', look: [0, 0] }]]), seed: 5, hops: RISE_HOPS })
      x.restore()
      x.save(); x.globalAlpha *= clamp(rp * 2) * (1 - prog(t, VERDICT.at - 0.2, VERDICT.at))
      x.font = `700 22px 'Space Mono', monospace`; x.fillStyle = RISEC; x.textAlign = 'center'; x.fillText('↑ EAST HORIZON', RI0.x, FLOOR + 40)
      x.restore()
    }
    // ☉ the Sun
    const hs = sunHop(t)
    x.save(); x.translate(SU0.x, SU0.y); x.scale(1 + hs, 1 - hs * 0.8); x.translate(-SU0.x, -SU0.y)
    drawSun(x, SU0.x, SU0.y + Math.sin(t * 1.6) * 6, sunCell(t), t, { ...keyed(t, SUN_K), rot: 0.05 * Math.sin(t * 0.9), glow: t > T.flare[0] && t < T.calm[1] ? 1.4 : 1 })
    x.restore()
    flareSparks(t)
    // ☽ the Moon
    drawMoonChar(x, MO0.x, MO0.y, MO0.r, t, { ...keyed(t, MOON_K), seed: 3, hops: MOON_HOPS })
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
      objection(ox, t, { at: OBJ, x: 560, y: 760 })
      agreePill(ox, t, PILL)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S12 E16', corners: 'tl bl br' })]

const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91]
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...hotCues(0, { key: KEY, level: HEAT.level, meterAt: HEAT.at }),
  ...objectionCues(OBJ, { key: KEY }),
  ['riser', r3(T.flare[0] - 0.1), T.flare[1], 0.06], ['glitter', T.flare[0], r3(T.flare[0] + 0.7)],
  ['whoosh', T.rise[0], 0.45, 0.04], ['pop', T.rise[1], 1396.91, 0.045, 0], ['bell', r3(T.rise[1] + 0.05), 1760, 0.025, 1.2, 0],
  ...verdictCues(VERDICT.at, { text: VERDICT.text, key: KEY }),
  ...agreeCues(PILL.at, PILL),
  ...wordPops(LAST.at, 4, 0.12, 1), ['pluck', r3(LAST.at + 0.36), 1396.91, 0.045, 0.6, 0],
  ['glitter', T.wheel[0], T.wheel[1]], ['bell', T.wheel[1], 2093, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...talkCues(LINES, { cps: CPS, pitch: { [SUNN]: 392, [MOONN]: 880, [RISEN]: 1174.66 } }),
  ...endcardCues(STORY_END),
]
