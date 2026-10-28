// st4aunties1 (25 s vertical Align ad, Star Talk season 4, EP 040, thread A: the end of the Houston phase)
//   story 0–20.6, then the shared end card (JOIN THE HOUSTON BETA).
//   0.00–5.70  "The Auntie Council | reviews *Houston.*"  ♋ Auntie Cancer and ♉ Auntie Taurus (staunties) float in on their
//              lace doily, reading glasses completely fogged up: it's Houston. A parchment report card floats between them.
//              CANCER: "hold on. Houston fogged my glasses."  They wipe them clear (squeak, squeak).
//   5.86–9.50  "Houston's | *report card.*"  TAURUS reads: "jacket: yes. kolache: shared. goodbyes: kind."  Each row of the
//              card gets a green tick as it's read (callbacks to EP 003, 004, 008). Cancer squints, then nods.
//   9.60–14.45 CANCER: "Houston *passed.*"  A big PASSED stamp slams onto the card; both aunties go teary and heart-eyed.
//              TAURUS: "now go show the rest of *Texas.*"
//  14.50       card cut (flip, box shut).
//  14.60–18.6  ★ LESSON UNLOCKED (shared lesson.js): "Love is mostly | *showing up.*"  +1 HOUSTON.
//  18.65–20.45 "Pass it *on*, | Houston."  Both aunties wave goodbye. Out by 20.45.
//   ghost: rises over the top edge of the report card (11.9) and blinks at you.
// One canvas (sky + constellation + doily + aunties + card), DOM type + the box + the lesson, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { auntie, makeDoily, drawDoily, drawTears, drawHearts, sparkBurst } from './props.js'

export const DURATION = 25
const EP = 40
const KEY = 'C'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', MINT = '#7dffb0', LAV = '#c9a6ff'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => 0.6 + n * 0.5556
const CAN = signStar('cancer'), TAU = signStar('taurus')
const C_TXT = '#8fdcff', T_TXT = '#ffd27a'
const C_TAG = `${CAN.glyph} AUNTIE CANCER`, T_TAG = `${TAU.glyph} AUNTIE TAURUS`
const CPS = 29
const LINES = [
  { t: BEAT(4), speaker: C_TAG, text: 'hold on. Houston fogged my glasses.', color: C_TXT },
  { t: 5.75, speaker: T_TAG, text: 'jacket: yes. kolache: shared. goodbyes: kind.', color: MINT },
  { t: 9.75, speaker: C_TAG, text: 'Houston *passed.*', color: GOLD },
  { t: 11.75, speaker: T_TAG, text: 'now go show the rest of *Texas.*', color: GOLD },
]
const LT = lineTimes(LINES, { cps: CPS })

const T = {
  h0: 0.12, h0Out: [5.5, 5.68], doily: 0.2, cIn: 0.4, tIn: 0.55, cardIn: 0.9, open: 2.66,
  wipeC: [LT[0].chars[20], LT[0].chars[20] + 0.7], wipeT: [LT[0].done + 0.1, LT[0].done + 0.8],
  h1: 5.86, h1Land: 6.3, h1Out: [9.42, 9.6],
  ticks: [LT[1].chars[11], LT[1].chars[28], LT[1].done],
  squint: LT[1].done + 0.2, nod: LT[1].done + 0.9,
  stamp: LT[2].done + 0.1, tears: LT[2].done + 0.4,
  ghost: 11.9, close: 14.42, cut: 14.5,
  lesson: 14.6, lessonOut: [18.45, 18.6],
  h2: 18.64, h2Land: 18.9, wave: 18.7,
  out: [20.08, 20.45],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Love is mostly | *showing up.*', chip: '+1 HOUSTON', accentColor: GOLD, dim: 0.55 }

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── layout
const SEAT_C = { x: 215, y: 1130, s: 330 }, SEAT_T = { x: 865, y: 1130, s: 330 }
const DOILY = { x: 540, y: 1290, rx: 530, ry: 120 }
const CARD = { x0: 150, x1: 930, y0: 530, y1: 960 }
const ROWS = ['BRING A JACKET INDOORS', 'SHARE THE LAST KOLACHE', 'KIND GOODBYES']

const C_HOPS = [T.cIn + 0.3, ...talkHops(LINES, C_TAG, { cps: CPS }), T.nod, T.stamp + 0.05, T.wave, T.wave + 0.56, T.wave + 1.12]
const T_HOPS = [T.tIn + 0.3, ...talkHops(LINES, T_TAG, { cps: CPS }), T.stamp + 0.1, T.wave + 0.1, T.wave + 0.66, T.wave + 1.22]

function fogOf(t, wipe) { return t < wipe[0] ? 0.9 + 0.1 * Math.sin(t * 9) : 1 - ease.inOutQuad(prog(t, ...wipe)) }
function cState(t) {
  const g = { frame: '#b3203f', hi: '#ffe08a', chain: true, down: 0, fog: fogOf(t, T.wipeC) }
  let mood = 'neutral', look = [0, 0], blink
  if (t < T.wipeC[0]) { mood = 'squint'; look = [0, 0] }
  else if (t < T.wipeC[1]) { mood = 'happy' }
  else if (t < LINES[1].t) { mood = 'sparkle'; look = [1, -1] }
  else if (t < T.squint) { mood = 'neutral'; look = [1, -1] }
  else if (t < T.nod) { mood = 'squint'; look = [1, -1]; g.down = ease.outBack(prog(t, T.squint, T.squint + 0.15)) }
  else if (t < T.stamp) { mood = 'happy' }
  else if (t < LINES[3].t) { mood = 'heart' }
  else if (t < T.wave) { mood = 'sparkle'; look = [0, 0] }
  else { mood = t > 19.6 && t < 20.0 ? 'wink' : 'happy' }
  return { mood, look, blink, g }
}
function tState(t) {
  const g = { frame: '#5a2e14', hi: '#ffd98a', down: 0, fog: fogOf(t, T.wipeT) }
  let mood = 'neutral', look = [-1, -1], blink
  if (t < T.wipeT[0]) { mood = t < LINES[0].t + 0.6 ? 'squint' : 'eyeroll'; look = [0, 0] }
  else if (t < T.wipeT[1]) { mood = 'happy' }
  else if (t < T.stamp) { mood = 'neutral'; look = [-1, -1]; g.down = 0.6 }
  else if (t < LINES[3].t) { mood = 'sparkle'; look = [0, 0] }
  else if (t < T.wave) { mood = 'happy'; look = [0, 0] }
  else { mood = 'heart' }
  return { mood, look, blink, g }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 30px 'Space Mono'", "italic 600 54px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const DOILY_IMG = makeDoily(document, 66)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The Auntie Council | reviews *Houston.*', { top: 190, size: 100, accentSize: 150, at: T.h0, gap: 0.08, accentColor: GOLD, wobble: true, fit: true })
  const H1 = popText(root, "Houston's | *report card.*", { top: 190, size: 112, accentSize: 160, at: T.h1, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: MINT, fit: true })
  const H2 = popText(root, 'Pass it *on*, | Houston.', { top: 190, size: 128, accentSize: 190, at: T.h2, late: 1, lateAt: T.h2Land + 0.2, gap: 0.1, wobble: true, accentColor: GOLD, fit: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawCard(t, o) {
    const k = pop01(t, T.cardIn, 0.5, 1.6) * o
    if (k <= 0.01) return
    const { x0, x1, y0, y1 } = CARD, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2
    x.save(); x.translate(cx, cy + Math.sin(t * 1.4) * 6); x.rotate(-0.02 + 0.01 * Math.sin(t)); x.scale(k, k)
    const w = x1 - x0, h = y1 - y0
    x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
    const g = x.createLinearGradient(-w / 2, 0, w / 2, 0)
    g.addColorStop(0, '#e6cf9f'); g.addColorStop(0.1, '#f7ead0'); g.addColorStop(0.9, '#f7ead0'); g.addColorStop(1, '#dcc290')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#c9a66b'; x.fillRect(-w / 2 + 20, -h / 2 + 108, w - 40, 4)
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.font = `italic 600 54px ${SERIF}`; x.fillStyle = '#5a2e14'; x.fillText('Houston · report card', 0, -h / 2 + 60)
    x.font = `700 30px ${MONO}`; x.textAlign = 'left'
    ROWS.forEach((r, i) => {
      const ry = -h / 2 + 168 + i * 78
      x.fillStyle = '#3a2416'; x.fillText(r, -w / 2 + 110, ry)
      // the tick box
      x.fillStyle = '#5a2e14'; x.fillRect(-w / 2 + 40, ry - 24, 48, 48); x.fillStyle = '#fff8e8'; x.fillRect(-w / 2 + 46, ry - 18, 36, 36)
      const tk = pop01(t, T.ticks[i], 0.25, 2.6)
      if (tk > 0) {
        x.save(); x.translate(-w / 2 + 64, ry); x.scale(tk, tk)
        const c = 6, TICK = [[-3, 0], [-2, 1], [-1, 2], [0, 1], [1, 0], [2, -1], [3, -2], [4, -3]]
        x.fillStyle = '#1f8a4a'; for (const [i2, j2] of TICK) x.fillRect(i2 * c - c / 2, j2 * c - c / 2, c * 1.4, c * 1.4)
        x.restore()
      }
    })
    // the PASSED stamp
    const sp = prog(t, T.stamp - 0.12, T.stamp)
    if (sp > 0) {
      const s = lerp(2.2, 1, ease.inQuad(sp)), a = sp
      x.save(); x.translate(w / 2 - 190, h / 2 - 70); x.rotate(-0.16); x.scale(s, s); x.globalAlpha *= a
      x.strokeStyle = '#d0344a'; x.lineWidth = 8; x.strokeRect(-150, -44, 300, 88)
      x.font = `800 64px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.fillStyle = '#d0344a'; x.fillText('PASSED', 0, 4)
      x.restore()
    }
    x.restore()
    if (t > T.stamp && t < T.stamp + 0.9) sparkBurst(x, t, x1 - 190, y1 - 70, T.stamp, { n: 12, R: 220 })
  }

  function drawAunties(t, o) {
    const cs = cState(t), ts = tState(t)
    const nod = t > T.nod && t < T.nod + 0.6 ? 0.1 * Math.max(0, Math.sin((t - T.nod) * Math.PI / 0.3)) : 0
    const wave = t > T.wave ? 0.06 * Math.sin((t - T.wave) * 10) : 0
    const cp = pop01(t, T.cIn, 0.4, 2) * o, tp = pop01(t, T.tIn, 0.4, 2) * o
    const rc = auntie(x, SEAT_C.x, SEAT_C.y + Math.sin(t * 1.3) * 5, SEAT_C.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cs.mood, look: cs.look, blink: cs.blink, squash: nod + wave, hops: C_HOPS, seed: 3, pop: cp, glasses: cs.g })
    const rt = auntie(x, SEAT_T.x, SEAT_T.y + Math.sin(t * 1.3 + 1) * 5, SEAT_T.s, t, { color: TAU.color, glyph: TAU.glyph, mood: ts.mood, look: ts.look, blink: ts.blink, squash: -wave, hops: T_HOPS, seed: 8, pop: tp, glasses: ts.g })
    // happy tears once Houston passes
    if (t > T.tears && t < T.cut) {
      const k = clamp(prog(t, T.tears, T.tears + 0.3))
      if (rc.eyeY) drawTears(x, t, rc.x, rc.eyeY + rc.cell * 3, rc.eyeDX, Math.max(8, rc.cell * 1.15), { amount: k * o, seed: 2, fountain: false })
      if (rt.eyeY) drawTears(x, t, rt.x, rt.eyeY + rt.cell * 3, rt.eyeDX, Math.max(8, rt.cell * 1.15), { amount: k * o, seed: 5, fountain: false })
    }
    // the wipe: a little cloth swiping the lenses
    for (const [r, w] of [[rc, T.wipeC], [rt, T.wipeT]]) {
      if (!r.eyeY || t < w[0] || t > w[1]) continue
      const ph = prog(t, ...w), sw = Math.sin(ph * Math.PI * 4)
      x.fillStyle = BONE; x.fillRect(Math.round(r.x + sw * r.eyeDX * 1.2 - 22), Math.round(r.eyeY - 10), 44, 30)
      x.fillStyle = '#d9c9b4'; x.fillRect(Math.round(r.x + sw * r.eyeDX * 1.2 - 22), Math.round(r.eyeY + 14), 44, 6)
    }
    // humidity: steam pixels rising before the wipe
    if (t < T.wipeT[1]) for (let i = 0; i < 16; i++) {
      const ph = (t * 0.5 + i / 16) % 1, a = (1 - ph) * 0.5 * (1 - prog(t, T.wipeC[0], T.wipeT[1]))
      x.fillStyle = rgba('#dff4ff', a); x.fillRect(Math.round(80 + (i * 67) % 920 + Math.sin(ph * 6 + i) * 14), Math.round(1250 - ph * 520), 10, 10)
    }
    if (t > T.stamp) drawHearts(x, t, T.stamp + 0.2, 540, 1000, { n: 8, spread: 380, alpha: clamp(o) * (1 - prog(t, T.cut - 0.4, T.cut)) })
    if (t > T.wave) drawHearts(x, t, T.wave + 0.2, 540, 1040, { n: 8, spread: 420, alpha: clamp(o) })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const o = popOut(t, T.out)
      if (o > 0) {
        const dk = ease.outCubic(prog(t, T.doily, T.doily + 0.6)) * clamp(o)
        drawDoily(x, DOILY_IMG, DOILY.x, DOILY.y + Math.sin(t * 1.3) * 5, DOILY.rx * dk, DOILY.ry * dk, dk)
        drawAunties(t, o)
        if (t < T.cut + 0.1) drawCard(t, clamp(o) * (1 - prog(t, T.cut - 0.05, T.cut + 0.05)))
        drawGhostCameo(x, t, { x: 800, y: CARD.y0 - 8, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, ok] of HEADS) h.update(t, outK(t, ok))
      lesson.update(t)
      drawGrain(gx, t)
    },
  }
}

// card cuts: 5.72 (H0 → H1), 14.55 (box shut → the lesson) and 18.62 (lesson out → the last line); a 25 s film keeps
// one (14.55). End card flips at 20.6.
const CUTS = [5.72, { t: T.cut, kind: 'flip' }, 18.62]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 5, 0.08, 0, 0.022),
  ['whoosh', T.doily, 0.6, 0.03], ['pop', T.cIn + 0.05, 659.25, 0.04, -0.3], ['pop', T.tIn + 0.05, 587.33, 0.04, 0.3],
  ['whoosh', T.cardIn, 0.4, 0.025], ['pop', T.cardIn + 0.3, 880, 0.03, 0],
  ['pop', T.open, 659.25, 0.035, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [C_TAG]: 640, [T_TAG]: 470 } }),
  ...[0, 0.18, 0.36, 0.54].map(d => ['tick', +(T.wipeC[0] + d).toFixed(3), 0.03]), ...[0, 0.18, 0.36, 0.54].map(d => ['tick', +(T.wipeT[0] + d).toFixed(3), 0.03]),
  ['pluck', T.wipeT[1], 1318.51, 0.035, 0.5, 0.3],
  ...wordPops(T.h1, 1, 0.08, 2, 0.024), ['pop', T.h1Land, 1046.5, 0.04, 0], ['pop', T.h1Land + 0.12, 1174.66, 0.04, 0],
  ...T.ticks.map((tk, i) => ['pluck', +tk.toFixed(3), [1046.5, 1174.66, 1318.51][i], 0.04, 0.4, 0.2]),
  ['tick', T.squint, 0.03], ['pop', T.nod, 783.99, 0.03, -0.3],
  ['boom', T.stamp, 0.22], ['tick', T.stamp, 0.07], ['glitter', T.stamp + 0.05, T.stamp + 0.7], ['bell', T.stamp + 0.1, 1567.98, 0.03, 1.6, 0],
  ['pop', T.ghost + 0.1, 1567.98, 0.012, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: KEY }),
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land + 0.2, 1318.51, 0.05, 0], ['pluck', T.h2Land + 0.2, 1046.5, 0.045, 0.7, 0],
  ['glitter', T.wave, T.wave + 0.6],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
