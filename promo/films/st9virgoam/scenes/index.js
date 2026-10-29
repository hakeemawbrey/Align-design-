// st9virgoam (24 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E26: Virgo · MORNING) · story 0–19.6, then the
// shared end card.
//   0.00  frame 0: Virgo's bedroom, 5:59 AM, bed already made with hospital corners. Virgo mid-label: the label maker is
//         printing PILLOW. Hook: "POV: a Virgo's to-do list has a *to-do* list."  The alarm rings at 6:00; Virgo is
//         already up and taps it off ("already up.").
//   2.70  cut to the kitchen, 6:05: "6:05 AM — the list for the *list.*"  The notes app: a to-do list whose first item has
//         its own sub-list, which has its own sub-list…
//   6.40  the label spree: FRIDGE · WINDOW · SHELF · COUNTER · LABEL MAKER (it labels itself) · FLOOR.
//   9.60  VIRGO: "step one: finish the list. step two: *start* the day."
//  11.90  ★ ASTROLOGY SAYS: Virgo is ruled by Mercury too, like Gemini.
//  14.20  the clipboard: "make bed" gets its tick. Virgo prints one more label, DONE, and sticks it on itself.
//  16.00  the last line, frame 0's pose (Virgo holding the label maker out): "Done is *enough*."
//   The ghost peeks up between the jars on the top shelf (11.2). Rewatch bait: the drawers say SOCKS and OTHER SOCKS; the
//   pillows say L and R.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawVirgoHome, virgoSpots, drawVirgoStar, drawLabel, drawLabelMaker, drawTodoBoard } from '../../st9virgohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 24
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN       // 19.6
const VIRN = '♍ VIRGO'

const T = {
  hookOut: 2.6, print0: [0, 0.9], alarm: 1.2, tap: 1.85, already: [1.9, 2.6],
  cutK: 2.7, st1: 2.9, st1Out: 6.1, notes: 3.0,
  spree: [6.4, 6.8, 7.2, 7.6, 8.0, 8.5],
  l1: 9.6, close: 13.7, ghost: 11.2, fact: 11.9, factDur: 2.8,
  clip: 14.0, tick: 14.6, print1: [15.0, 15.5], stick: 15.6,
  last: 16.0, lastOut: [19.2, 19.55],
}
const LINES = [{ t: T.l1, speaker: VIRN, text: 'step one: finish the list. step two: *start* the day.', color: '#ff9cc0' }]
const CPS = 28
const HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), T.tap, ...T.spree, T.tick, T.stick]
const NOTES = [
  { text: '[ ] write the to-do list', at: T.notes + 0.3 },
  { text: '[ ] ↳ pick a pen', at: T.notes + 0.8 },
  { text: '[ ] ↳↳ colour-code pens', at: T.notes + 1.4 },
  { text: '[ ] ↳↳↳ label the pens', at: T.notes + 2.0 },
  { text: '[ ] ↳↳↳↳ a list for that', at: T.notes + 2.6 },
]
const SPREE = [['FRIDGE', 940, 1060], ['WINDOW', 610, 400], ['SHELF', 205, 446], ['COUNTER', 330, 1130], ['LABEL MAKER', 640, 1010], ['FLOOR', 300, 1480]]

const roomAt = t => t < T.cutK ? 'bedroom' : 'kitchen'
const VIR_BED = { x: 600, y: 1185, size: 320 }
const VIR_K = { x: 470, y: 1215, size: 300 }
const HIDE = virgoSpots('kitchen').hide[1]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (Virgo’s kitchen)' }
const SHOTS = [
  { t: 0, x: 600, y: 1060, s: 1.08 },
  { t: T.cutK, x: 540, y: 960, s: 1 },
  { t: T.spree[0], x: 540, y: 980, s: 1.04 },
  { t: T.l1, x: 480, y: 1060, s: 1.1 },
  { t: T.clip, x: 600, y: 1020, s: 1.1 },
  { t: T.last, x: 540, y: 1000, s: 1.04 },
]

function virState(t) {
  if (t < T.alarm) return { mood: 'squint', look: [1, 0] }
  if (t < T.cutK) return { mood: 'neutral', look: [1, 0] }
  if (t < T.spree[0]) return { mood: 'squint', look: [1, -1] }
  if (t < T.l1) return { mood: 'happy', look: [0, 0] }
  if (t < T.clip) return { mood: 'neutral', look: [0, 0] }
  if (t < T.tick + 0.3) return { mood: 'squint', look: [1, -1] }
  return { mood: 'happy', look: [0, 0] }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Virgo’s to-do list has a *to-do* list.', at: 0, out: T.hookOut, top: 270, size: 90, accentSize: 130 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '6:05 AM', text: 'the list for the *list.*' })
  const box = dialogueBox(root, { lines: LINES, y: 1550, width: 960, height: 250, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Done is *enough.*', { at: T.last, lateAt: T.last + 0.4, top: 300, size: 124, accentSize: 190, late: 1, accentColor: '#ff9cc0' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const room = roomAt(t)
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawVirgoHome(x, t, { room, ep: 'am', sky: skyIn(t, room === 'bedroom' ? 6.0 : 6.3), light: 0.9 })
      const ok = popOut(t, [19.2, 19.55])
      if (room === 'bedroom') {
        drawLabel(x, 165, 1076, 'PILLOW', { size: 16, alpha: prog(t, T.print0[1], T.print0[1] + 0.1) })
        const r = drawVirgoStar(x, VIR_BED.x, VIR_BED.y, VIR_BED.size, t, { ...virState(t), hops: HOPS, seed: 2, pencil: true })
        drawLabelMaker(x, r.x - 190, r.y + 30, 7, t, { print: prog(t, ...T.print0), text: 'PILLOW' })
        // the alarm on the nightstand
        phoneScreen(x, t, { x: 920, y: 1020, w: 150, h: 240, app: 'alarm', lines: [{ text: '6:00', at: T.alarm, stop: T.tap }, { text: 'WAKE UP' }], title: 'snooze', pop: 1, glow: 0.3, size: 16 })
        if (t > T.already[0] && t < T.already[1] + 0.2) pixelBubble(x, r.x + 30, r.top - 60, 'already up.', { size: 30, alpha: pop01(t, T.already[0], 0.2) })
      } else {
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 3 })
        // the label spree (labels stay on once stuck)
        SPREE.forEach(([txt, lx, ly], i) => { const p = pop01(t, T.spree[i], 0.25, 2.6); if (p > 0) drawLabel(x, lx, ly, txt, { size: 22 * p, rot: (i % 2 ? 0.03 : -0.03) }) })
        const r = drawVirgoStar(x, VIR_K.x, VIR_K.y, VIR_K.size, t, { ...virState(t), hops: HOPS, seed: 2, pencil: true, pop: ok })
        const spreeOn = t > T.spree[0] - 0.2 && t < T.spree[5] + 0.6
        if (spreeOn || t > T.last - 0.4) drawLabelMaker(x, r.x - 180, r.y + 20, 6, t, { print: t > T.last - 0.4 ? prog(t, T.last - 0.4, T.last) : (t * 3) % 1, text: '' })
        for (let i = 0; i < 6; i++) sparkles(x, t, SPREE[i][1], SPREE[i][2], T.spree[i], 6, 60, i, [GOLD, BONE, '#ff9cc0'])
        // the clipboard: make bed gets its tick
        if (t > T.clip - 0.1 && t < T.last + 0.1) {
          const cp = pop01(t, T.clip - 0.1, 0.35, 2) * (1 - prog(t, T.last - 0.15, T.last + 0.1))
          x.save(); x.translate(r.x + 270, r.y - 160); x.rotate(0.06); x.scale(cp, cp)
          x.fillStyle = INK; x.fillRect(-170, -200, 340, 420); x.fillStyle = '#8f6a3e'; x.fillRect(-164, -194, 328, 408); x.fillStyle = '#c9c2d8'; x.fillRect(-50, -214, 100, 30)
          drawTodoBoard(x, -150, -170, 300, 370, t, { title: 'TODAY', size: 22, ticks: [1, prog(t, T.tick, T.tick + 0.35), 0, 0, 0, 0] })
          x.restore()
        }
        // DONE: printed, then stuck on Virgo's own point
        if (t > T.print1[0] && t < T.stick) drawLabelMaker(x, r.x - 180, r.y + 20, 6, t, { print: prog(t, ...T.print1), text: 'DONE' })
        if (t >= T.stick) { const sp = pop01(t, T.stick, 0.25, 2.6); drawLabel(x, r.x - 60, r.top + 80, 'DONE', { size: 36 * sp, rot: -0.25 }) }
        sparkles(x, t, r.x - 70, r.top + 70, T.stick, 10, 110, 0.3, [GOLD, '#ff9cc0', BONE])
        if (t > T.notes - 0.1 && t < T.spree[0]) phoneScreen(x, t, { x: 790, y: 760, w: 380, h: 540, app: 'notes', title: 'TO-DO (FOR TO-DO)', lines: NOTES, clock: '6:05', pop: pop01(t, T.notes - 0.1, 0.35, 2) * (1 - prog(t, T.spree[0] - 0.3, T.spree[0])), rot: 0.04, size: 22 })
      }
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.98 })
      if (t < T.cutK) drawClock(x, t, { from: '5:59', to: '6:00', at: T.alarm - 0.3, dur: 0.3, sign: 'virgo' })
      else drawClock(x, t, { from: '6:00', to: t < T.clip ? '6:05' : '6:12', at: t < T.clip ? T.cutK : T.clip, dur: 0.35, sign: 'virgo' })
      factChip(x, t, { text: 'Virgo is ruled by Mercury too, like Gemini.', at: T.fact, dur: T.factDur, y: 560, label: '★ ASTROLOGY SAYS' })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cutK, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E26' }), cardCuts(CUTS)]

const NOTE = [698.46, 783.99, 880, 1046.5, 1174.66, 1396.91]
const printCues = (a, b) => Array.from({ length: Math.round((b - a) / 0.07) }, (_, i) => ['tick', r3(a + i * 0.07), 0.03])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...printCues(...T.print0), ['pop', T.print0[1], 1046.5, 0.035, -0.3],
  ...clockCues(T.alarm - 0.3, 0.3),
  ...phoneCues([{ text: '6:00', at: T.alarm, stop: T.tap }], { app: 'alarm' }), ['tick', T.tap, 0.1], ['pop', T.already[0], 880, 0.04, 0.2],
  ['whoosh', T.cutK - 0.1, 0.25, 0.03], ...clockCues(T.cutK, 0.35), ...stampCues(T.st1),
  ...phoneCues(NOTES, { app: 'notes' }),
  ...T.spree.flatMap((s, i) => [...printCues(s - 0.2, s), ['pop', s, NOTE[i], 0.05, (i % 2 ? 0.3 : -0.3)]]),
  ...talkCues(LINES, { cps: CPS, pitch: { [VIRN]: 880 } }),
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pop', T.clip, 783.99, 0.04, 0.3], ...clockCues(T.clip, 0.35), ['pluck', T.tick + 0.1, 1396.91, 0.045, 0.5, 0.3], ['bell', T.tick + 0.15, 1760, 0.03, 1.0, 0.3],
  ...printCues(...T.print1), ['pop', T.stick, 1174.66, 0.05, 0], ['glitter', T.stick, T.stick + 0.6],
  ['pop', T.last, 880, 0.035, 0], ['pop', r3(T.last + 0.4), 1396.91, 0.05, 0], ['pluck', r3(T.last + 0.45), 1396.91, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lerp; void clamp; void ease
