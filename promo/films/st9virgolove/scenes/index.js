// st9virgolove (30 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E28: Virgo · DATE NIGHT) · story 0–25.6,
// then the shared end card.
//   0.00  frame 0: Virgo's kitchen, 6:30 PM. Pisces' wall calendar is up, a mess of "??" scribbles, and Virgo is mid-snap
//         sticking a colour block onto it; Pisces watches, heart-eyed. Hook: "A Virgo's love language: fixing your
//         *calendar*."
//   2.70  "6:32 PM — date night, *organised.*"  The colour blocks snap in: DENTIST · RENT · PLANT B-DAY · BAND · NAP.
//         VIRGO: "your dentist, your rent, your plant's birthday. *done.*"  PISCES: "you did all that… for *me?*"
//  11.30  Pisces turns the page to Virgo's own evening (fifteen-minute blocks). PISCES: "now yours. give me the *pen.*"
//         Pisces strikes the blocks out one by one and writes NOTHING ♥ across them. Virgo: wide eyes.
//  15.70  they look out of the window: Spica, labelled. ★ REAL SKY: Spica is the ear of wheat in the maiden's hand.
//  18.80  VIRGO: "a whole unscheduled night? …*okay.*"
//  21.90  the last line, frame 0's framing: now Pisces holds up Virgo's page (NOTHING ♥): "Let them *help* you back."
//   The ghost leans out from behind the fridge (17.0). Rewatch bait: the fridge board has one more tick than this morning
//   and a new label, PISCES' MUG.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, DAY_FONTS } from '../../st9day.js'
import { drawVirgoHome, virgoSpots, drawVirgoStar } from '../../st9virgohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, floatHearts, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 30
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const VIRN = '♍ VIRGO', PISN = '♓ PISCES'
const MONO = "'Space Mono', monospace", INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const PIS = signStar('pisces')

const T = {
  hookOut: 2.6, st1: 2.75, st1Out: 5.6, snaps: [-0.4, 3.0, 3.6, 4.2, 4.8],
  l1: 6.3, l2: 10.0, page: 11.9, l3: 12.6, strikes: [14.0, 14.3, 14.6, 14.9, 15.2], nothing: 15.5,
  win: 16.2, fact: 16.5, factDur: 2.5, ghost: 17.3,
  l4: 19.0, close: 22.0, last: 22.1, lastOut: [25.2, 25.55],
}
const LINES = [
  { t: T.l1, speaker: VIRN, text: 'dentist, rent, your plant’s birthday: *done.*', color: '#ff9cc0' },
  { t: T.l2, speaker: PISN, text: 'you did all that… for *me?*', color: '#b9b4ff' },
  { t: T.l3, speaker: PISN, text: 'now yours. give me the *pen.*', color: '#b9b4ff' },
  { t: T.l4, speaker: VIRN, text: 'a whole unscheduled night? …*okay.*', color: '#ff9cc0' },
]
const CPS = 28
const VIR_HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), ...T.snaps.slice(1)]
const PIS_HOPS = [...talkHops(LINES, PISN, { cps: CPS }), ...T.strikes, T.nothing, T.last + 0.2]
const BLOCKS = [['DENTIST', '#5f8fd6', 1, 0], ['RENT', '#e0525a', 4, 1], ['PLANT B-DAY', '#3f9a5a', 2, 2], ['BAND', '#f2c75c', 5, 2], ['NAP', '#ef5c94', 0, 3]]
const MINE = ['6:30 dinner', '6:45 dishes', '7:00 inbox', '7:15 laundry', '7:30 plan tmrw']

const CAL = { x: 150, y: 540, w: 780, h: 540 }
const VIR0 = { x: 320, y: 1235, size: 300 }
const PIS0 = { x: 760, y: 1245, size: 290 }
const WIN = virgoSpots('kitchen').win
const SPICA = { x: WIN.x + 170, y: WIN.y + 130 }
const HIDE = virgoSpots('kitchen').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (Virgo’s kitchen)' }
const SHOTS = [
  { t: 0, x: 540, y: 1000, s: 1.04 },
  { t: T.st1, x: 540, y: 960, s: 1 },
  { t: T.l1, x: 540, y: 1060, s: 1.06 },
  { t: T.page, x: 540, y: 960, s: 1 },
  { t: T.win, x: SPICA.x, y: SPICA.y + 140, s: 1.9 },
  { t: T.l4, x: 540, y: 1060, s: 1.08 },
  { t: T.last, x: 540, y: 1000, s: 1.04 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
function scribble(x, cx, cy, w, seed) {
  x.save(); x.strokeStyle = '#8a8478'; x.lineWidth = 3; x.beginPath()
  for (let i = 0; i <= 12; i++) { const px = cx - w / 2 + (i / 12) * w, py = cy + Math.sin(i * 2.3 + seed) * 8; i ? x.lineTo(px, py) : x.moveTo(px, py) }
  x.stroke(); x.restore()
}
// Pisces' month (a mess of "??"), then Virgo's blocks snap in
function pisCalendar(x, t, k) {
  if (k <= 0) return
  const { x: px, y: py, w, h } = CAL
  x.save(); x.translate(px + w / 2, py + h / 2); x.scale(k, k); x.rotate(-0.02); x.translate(-(px + w / 2), -(py + h / 2))
  R(x, px - 8, py - 8, w + 16, h + 16, INK); R(x, px, py, w, h, '#fbf6ea'); R(x, px, py, w, 70, PIS.color)
  x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('♓ PISCES · THIS MONTH', px + w / 2, py + 36)
  const cw = w / 7, ch = (h - 80) / 4
  for (let i = 1; i < 7; i++) R(x, px + i * cw - 1, py + 70, 2, h - 70, '#d8d2c0')
  for (let j = 1; j < 4; j++) R(x, px, py + 70 + j * ch - 1, w, 2, '#d8d2c0')
  x.font = `700 30px ${INTER}`; x.fillStyle = '#8a8478'
  ;[[0, 0], [3, 0], [6, 1], [1, 2], [3, 3], [5, 3], [2, 1]].forEach(([c, r], i) => { if (i % 2) x.fillText('??', px + c * cw + cw / 2, py + 70 + r * ch + ch / 2); else scribble(x, px + c * cw + cw / 2, py + 70 + r * ch + ch / 2, cw * 0.7, i) })
  BLOCKS.forEach(([lab, col, c, r], i) => {
    const p = pop01(t, T.snaps[i], 0.25, 2.8)
    if (p <= 0) return
    const bx = px + c * cw + cw / 2, by = py + 70 + r * ch + ch / 2
    x.save(); x.translate(bx, by); x.scale(p, p); x.rotate((i % 2 ? 0.04 : -0.04))
    R(x, -cw / 2 + 4, -ch / 2 + 10, cw - 8, ch - 20, INK); R(x, -cw / 2 + 8, -ch / 2 + 14, cw - 16, ch - 28, col)
    x.fillStyle = '#fff'; x.font = `700 ${lab.length > 8 ? 13 : 17}px ${MONO}`; x.fillText(lab, 0, 2)
    x.restore()
  })
  x.restore()
}
// Virgo's own evening, then struck out and NOTHING ♥ written across
function virPage(x, t, k, { tilt = 0.02 } = {}) {
  if (k <= 0) return
  const { x: px, y: py, w, h } = CAL
  x.save(); x.translate(px + w / 2, py + h / 2); x.scale(k, k); x.rotate(tilt); x.translate(-(px + w / 2), -(py + h / 2))
  R(x, px - 8, py - 8, w + 16, h + 16, INK); R(x, px, py, w, h, '#fbf6ea'); R(x, px, py, w, 70, '#ef5c94')
  x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('♍ VIRGO · TONIGHT', px + w / 2, py + 36)
  const rh = (h - 100) / MINE.length
  MINE.forEach((m, i) => {
    const ry = py + 90 + i * rh
    R(x, px + 30, ry + 6, w - 60, rh - 12, ['#cfe0f7', '#f7d0d3', '#d4ecd9', '#fbeec6', '#f9d3e3'][i])
    x.textAlign = 'left'; x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.fillText(m, px + 54, ry + rh / 2)
    const sp = prog(t, T.strikes[i], T.strikes[i] + 0.25)
    if (sp > 0) { R(x, px + 40, ry + rh / 2 - 3, (w - 80) * sp, 7, '#7c74f0') }
  })
  const np = pop01(t, T.nothing, 0.35, 3)
  if (np > 0) {
    x.save(); x.translate(px + w / 2, py + h / 2 + 30); x.rotate(-0.12); x.scale(np, np)
    x.font = `italic 600 120px 'EB Garamond', serif`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('nothing ♥', 4, 4); x.fillStyle = '#7c74f0'; x.fillText('nothing ♥', 0, 0)
    x.restore()
  }
  x.restore()
}

function virState(t) {
  if (t < T.st1) return { mood: 'squint', look: [1, -1] }
  if (t < T.l2) return { mood: 'happy', look: [1, -1] }
  if (t < T.page) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.nothing + 0.3) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.win) return { mood: 'neutral', look: [1, -1] }
  if (t < T.l4) return { mood: 'sparkle', look: [1, -1] }
  return { mood: 'happy', look: [1, 0] }
}
function pisState(t) {
  if (t < T.l2) return { mood: 'heart', look: [-1, -1] }
  if (t < T.page) return { mood: 'sparkle', look: [-1, 0] }
  if (t < T.nothing + 0.4) return { mood: 'squint', look: [-1, -1] }
  if (t < T.l4) return { mood: 'happy', look: [-1, -1] }
  return { mood: 'heart', look: [-1, 0] }
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "700 30px Inter", "italic 500 160px 'EB Garamond'", "italic 600 120px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Virgo’s love language: fixing your *calendar*.', at: 0, out: T.hookOut, top: 238, size: 86, accentSize: 124 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '6:32 PM', text: 'date night, *organised.*' })
  const box = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1560, width: 960, height: 250, open: T.l1 - 0.2, close: T.win - 0.3, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1560, width: 960, height: 250, open: T.l4 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Let them *help* you back.', { at: T.last, lateAt: T.last + 0.45, top: 270, size: 104, accentSize: 160, late: 2, accentColor: '#b9b4ff' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      x.save(); camApply(x, cam)
      drawVirgoHome(x, t, { room: 'kitchen', ep: 'love', sky: skyIn(t, 19.4), light: 0 })
      // Spica in the window (from the window shot on)
      if (t > T.win - 0.2) {
        const k = prog(t, T.win, T.win + 0.5)
        x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(SPICA.x, SPICA.y, 0, SPICA.x, SPICA.y, 60); g.addColorStop(0, `rgba(170,200,255,${0.7 * k})`); g.addColorStop(1, 'rgba(170,200,255,0)'); x.fillStyle = g; x.fillRect(SPICA.x - 60, SPICA.y - 60, 120, 120); x.restore()
        drawPixelStar(x, SPICA.x, SPICA.y, 30 + 4 * Math.sin(t * 4), 2, '#dfe8ff')
        if (t < T.l4 + 0.5) { x.save(); x.globalAlpha = k; x.font = `700 20px ${MONO}`; x.textAlign = 'left'; x.fillStyle = '#dfe8ff'; x.fillText('SPICA', SPICA.x + 26, SPICA.y - 18); x.restore() }
      }
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 3 })
      const ok = popOut(t, [25.2, 25.55])
      const vr = drawVirgoStar(x, VIR0.x, VIR0.y, VIR0.size, t, { ...virState(t), hops: VIR_HOPS, seed: 3, pencil: t < T.page, pop: ok })
      const pr = drawStarChar(x, PIS0.x, PIS0.y, PIS0.size, t, { color: PIS.color, glyph: PIS.glyph, ...pisState(t), hops: PIS_HOPS, seed: 12, pop: ok })
      if (t < T.l2) floatHearts(x, t, pr.x, pr.top, 0, T.l2, 1)
      if (t > T.l4 + 1) floatHearts(x, t, (vr.x + pr.x) / 2, Math.min(vr.top, pr.top), T.l4 + 1, T.last + 3, 5)
      // the dream bubble once the evening is free: the two of them under the stars
      if (t > T.nothing + 0.6 && t < T.win) pixelBubble(x, pr.x - 40, pr.top - 70, 'stargazing. that’s it.', { size: 26, alpha: pop01(t, T.nothing + 0.6, 0.25) })
      x.restore()
      // the pages
      const calK = t < T.page ? 1 - prog(t, T.page - 0.25, T.page) : 0
      pisCalendar(x, t, calK)
      for (let i = 0; i < BLOCKS.length; i++) { const [, , c, r] = BLOCKS[i]; sparkles(x, t, CAL.x + (c + 0.5) * CAL.w / 7, CAL.y + 70 + (r + 0.5) * (CAL.h - 80) / 4, T.snaps[i], 6, 60, i) }
      const pageK = t < T.page ? 0 : t < T.win ? pop01(t, T.page, 0.3, 2) * (1 - prog(t, T.win - 0.3, T.win)) : t > T.last - 0.1 ? 0.7 * pop01(t, T.last - 0.1, 0.35, 2) * (1 - prog(t, 25.15, 25.5)) : 0
      if (t > T.last - 0.1) { x.save(); x.translate(260, 220); virPage(x, t, pageK, { tilt: 0.08 }); x.restore() }
      else virPage(x, t, pageK)
      sparkles(x, t, 540, 780, T.nothing, 12, 260, 0.4, ['#b9b4ff', GOLD, BONE])
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.55 })
      drawClock(x, t, { from: '6:30', to: t < T.win ? '6:32' : '8:10', at: t < T.win ? T.st1 : T.win, dur: t < T.win ? 0.3 : 0.6, ampm: 'PM', sign: 'virgo' })
      factChip(x, t, { text: 'Spica is the ear of wheat in the maiden’s hand.', at: T.fact, dur: T.factDur, y: 300, label: '★ REAL SKY' })
      hook.update(t); st1.update(t); box.update(t); box2.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.win, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E28' }), cardCuts(CUTS)]

const NOTE = [622.25, 698.46, 783.99, 932.33, 1046.5, 1244.51]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...stampCues(T.st1), ...clockCues(T.st1, 0.3),
  ...T.snaps.slice(1).map((s, i) => ['pop', s, NOTE[i + 1], 0.05, (i % 2 ? 0.3 : -0.3)]),
  ...talkCues(LINES, { cps: CPS, pitch: { [VIRN]: 880, [PISN]: 660 } }),
  ['whoosh', T.page, 0.35, 0.035], ['tick', T.page + 0.1, 0.06],
  ...T.strikes.map((s, i) => ['whoosh', s, 0.18, 0.03 + i * 0.002]),
  ['pluck', T.nothing, 1046.5, 0.05, 0.7, 0], ['bell', T.nothing + 0.1, 1567.98, 0.035, 1.4, 0], ['glitter', T.nothing, T.nothing + 0.8],
  ['whoosh', T.win - 0.1, 0.4, 0.03], ...clockCues(T.win, 0.6), ['bell', T.win + 0.3, 2093, 0.025, 2.0, 0.3],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['tick', T.ghost + 0.05, 0.015],
  ['pop', T.last, 783.99, 0.035, 0], ['pop', r3(T.last + 0.45), 1046.5, 0.05, 0], ['pluck', r3(T.last + 0.55), 1244.51, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void lerp; void ease; void clamp
