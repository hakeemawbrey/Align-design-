// st9virgocrew (25 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E29: Virgo · THE CREW) · story 0–20.6,
// then the shared end card.
//   0.00  frame 0: Virgo's kitchen, Saturday, 7:58 AM. Virgo holds up a laminated itinerary (the glare sweeps across it);
//         Taurus and Capricorn (the earth trio) at the counter. Hook: "A Virgo planned the group trip *to the minute*."
//   2.70  "8:00 AM — departure, *on time.*"  The rows tick by under Virgo's pointer: 8:00 leave · 8:07 gas · 8:19 snacks
//         (Taurus approved) · 9:42 scenic view (4 min) · 9:46 photo · 10:00 arrive.
//   6.60  Sagittarius bursts in with the car keys and a map. SAG: "or… a *giant donut* off exit 12?"  DETOUR stamps land on
//         the itinerary; Capricorn gasps, Taurus goes heart-eyed (snacks).
//  10.30  Virgo stares at the laminate… and laughs. It uncaps a dry-erase marker (it works on laminate) and adds a row:
//         "10:00 — ??? (fun)". VIRGO: "okay. one row for *whatever.*"  (season 4: Sag drove the van, Virgo navigated.)
//  13.60  ★ REAL SKY: Virgo is the largest zodiac constellation.
//  16.30  the last line, frame 0's pose (the itinerary held up), now with the FUN row: "Leave room for *fun*."
//   The ghost peeks up between the jars on the top shelf (9.4). Rewatch bait: the fridge board's "trip plan" is ticked; the
//   snack tin now says SAG'S SNACKS.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawVirgoHome, virgoSpots, drawVirgoStar } from '../../st9virgohome.js'
import { GOLD, BONE, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, floatHearts, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 25
const KEY = 'C'
const STORY_END = DURATION - ENDCARD_LEN       // 20.6
const VIRN = '♍ VIRGO', SAGN = '♐ SAGITTARIUS'
const MONO = "'Space Mono', monospace"
const TAU = signStar('taurus'), CAP = signStar('capricorn'), SAG = signStar('sagittarius')
const RED = '#e0525a'

const T = {
  hookOut: 2.6, st1: 2.75, st1Out: 5.4, rows: [2.9, 3.4, 3.9, 4.4, 4.9, 5.4],
  sagIn: 6.6, map: 6.9, l1: 7.0, stamps: [8.7, 9.0, 9.3], gasp: 8.75, ghost: 9.4,
  stare: 10.0, laugh: [10.6, 11.6], marker: 11.7, write: [11.9, 12.9], l2: 12.4, close: 15.8,
  fact: 13.9, factDur: 2.4,
  last: 16.3, lastOut: [20.2, 20.55],
}
const LINES = [
  { t: T.l1, speaker: SAGN, text: 'or… a *giant donut* off exit 12?', color: '#d8b0ff' },
  { t: T.l2, speaker: VIRN, text: 'okay. one row for *whatever.*', color: '#ff9cc0' },
]
const CPS = 28
const VIR_HOPS = [...talkHops(LINES, VIRN, { cps: CPS }), ...T.rows, T.laugh[0], T.laugh[0] + 0.3, T.laugh[0] + 0.6, T.marker]
const SAG_HOPS = [...talkHops(LINES, SAGN, { cps: CPS }), T.sagIn + 0.3, T.last + 0.3]
const ROWS = ['8:00 leave', '8:07 gas', '8:19 snacks (Taurus ok)', '9:42 scenic view (4 min)', '9:46 photo', '10:00 arrive']
const MAP = [{ text: 'NEW STOP: GIANT DONUT', at: T.map + 0.2 }]

const CARD = { x: 130, y: 590, w: 820, h: 480 }
const VIR0 = { x: 300, y: 1235, size: 290 }
const TAU0 = { x: 560, y: 1260, size: 230 }
const CAP0 = { x: 770, y: 1260, size: 230 }
const SAG0 = { x: 930, y: 1150, size: 220 }
const HIDE = virgoSpots('kitchen').hide[1]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where + ' (Virgo’s kitchen)' }
const SHOTS = [
  { t: 0, x: 540, y: 1000, s: 1.04 },
  { t: T.st1, x: 540, y: 960, s: 1 },
  { t: T.sagIn, x: 600, y: 1050, s: 1.06 },
  { t: T.stare, x: 420, y: 1080, s: 1.06 },
  { t: T.fact, x: 540, y: 960, s: 1 },
  { t: T.last, x: 540, y: 1000, s: 1.04 },
]

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
// the laminated itinerary: rows, a pointer, DETOUR stamps, and the hand-written FUN row
function itinerary(x, t, k, { scale = 1, ox = 0, oy = 0, tilt = -0.015 } = {}) {
  if (k <= 0) return
  const { x: px, y: py, w, h } = CARD
  x.save(); x.translate(px + w / 2 + ox, py + h / 2 + oy); x.scale(k * scale, k * scale); x.rotate(tilt); x.translate(-(px + w / 2), -(py + h / 2))
  R(x, px - 14, py - 14, w + 28, h + 28, INK); R(x, px - 8, py - 8, w + 16, h + 16, '#dfeee8')          // the laminate edge
  R(x, px, py, w, h, '#fbf6ea'); R(x, px, py, w, 66, '#4c6e58')
  x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#f4ecd6'; x.fillText('TRIP · SATURDAY · v7 (FINAL)', px + w / 2, py + 34)
  const rh = (h - 150) / ROWS.length
  ROWS.forEach((row, i) => {
    const ry = py + 84 + i * rh
    const on = t >= T.rows[i]
    x.textAlign = 'left'; x.font = `700 28px ${MONO}`; x.fillStyle = on || t < T.st1 ? INK : '#5a5448'; x.fillText(row, px + 44, ry + rh / 2)
    if (t >= T.rows[i] && t < T.rows[i] + 0.5) R(x, px + 20, ry + rh / 2 - 8, 14, 16, '#ef5c94')
  })
  // DETOUR stamps
  T.stamps.forEach((s, i) => {
    const p = pop01(t, s, 0.2, 3)
    if (p <= 0) return
    x.save(); x.translate(px + w - 170 - i * 40, py + 150 + i * 110); x.rotate(-0.2 + i * 0.12); x.scale(p * 1.4 - 0.4 * Math.min(1, p), p * 1.4 - 0.4 * Math.min(1, p))
    x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-110, -32, 220, 64)
    x.fillStyle = RED; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.fillText('DETOUR', 0, 3)
    x.restore()
  })
  // the dry-erase FUN row (written on the laminate)
  const wp = prog(t, ...T.write)
  if (wp > 0) {
    const txt = '10:00 — ??? (fun)', n = Math.ceil(txt.length * wp)
    x.save(); x.font = `italic 600 46px 'EB Garamond', serif`; x.textAlign = 'left'; x.fillStyle = '#3f6fd0'
    x.fillText(txt.slice(0, n), px + 44, py + h - 36); x.restore()
    R(x, px + 30, py + h - 70, 6, 50, '#3f6fd0')
  }
  // the glare: the laminate catches the light
  const gp = ((t * 0.45) % 1.6) - 0.3
  x.save(); x.beginPath(); x.rect(px - 8, py - 8, w + 16, h + 16); x.clip()
  x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.22
  x.fillStyle = '#ffffff'; x.beginPath(); const gx0 = px + gp * w; x.moveTo(gx0, py - 8); x.lineTo(gx0 + 90, py - 8); x.lineTo(gx0 - 110, py + h + 8); x.lineTo(gx0 - 200, py + h + 8); x.closePath(); x.fill()
  x.restore()
  x.restore()
}

function virState(t) {
  if (t < T.sagIn) return { mood: 'happy', look: [1, -1] }
  if (t < T.stamps[0]) return { mood: 'neutral', look: [1, 0] }
  if (t < T.laugh[0]) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.laugh[1]) return { mood: 'happy', look: [0, 0], squash: 0.07 * Math.sin(t * 34) }
  return { mood: 'happy', look: [1, -1] }
}
const tauState = t => t < T.rows[2] ? { mood: 'neutral', look: [-1, -1] } : t < T.sagIn ? { mood: 'happy', look: [-1, -1] } : t < T.last ? { mood: 'heart', look: [1, 0] } : { mood: 'happy', look: [0, 0] }
const capState = t => t < T.sagIn ? { mood: 'squint', look: [-1, -1] } : t < T.stamps[2] + 1 ? { mood: 'wide', look: [1, 0], blink: false } : t < T.laugh[0] ? { mood: 'squint', look: [-1, 0] } : { mood: 'happy', look: [-1, 0] }
const sagState = t => t < T.l1 + 1.6 ? { mood: 'sparkle', look: [-1, 0] } : { mood: 'happy', look: [-1, 0] }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "italic 600 46px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Virgo planned the group trip *to the minute*.', at: 0, out: T.hookOut, top: 238, size: 86, accentSize: 124 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '8:00 AM', text: 'departure, *on time.*' })
  const box = dialogueBox(root, { lines: LINES, y: 1560, width: 960, height: 240, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Leave room for *fun.*', { at: T.last, lateAt: T.last + 0.45, top: 250, size: 110, accentSize: 170, late: 1, accentColor: '#ff9cc0' })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      const z = gaspZoom(t, { at: T.gasp, dur: 1.1, x: CAP0.x, y: CAP0.y, amount: 0.25, follow: 0.5, cy: 1150 })
      x.save(); camApply(x, cam); z.apply(x)
      drawVirgoHome(x, t, { room: 'kitchen', ep: 'crew', sky: skyIn(t, 8.0), light: 0.8 })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 3 })
      const ok = popOut(t, [20.2, 20.55])
      drawStarChar(x, TAU0.x, TAU0.y, TAU0.size, t, { color: TAU.color, glyph: TAU.glyph, ...tauState(t), seed: 21, pop: ok, hops: [T.rows[2] + 0.1, T.sagIn + 0.6] })
      drawStarChar(x, CAP0.x, CAP0.y, CAP0.size, t, { color: CAP.color, glyph: CAP.glyph, ...capState(t), seed: 22, pop: ok, hops: [T.gasp, T.laugh[0] + 0.4] })
      if (t > T.sagIn) {
        const sp = pop01(t, T.sagIn, 0.35, 2.2) * ok, sx = SAG0.x + (1 - clamp((t - T.sagIn) / 0.35)) * 220
        const sr = drawStarChar(x, sx, SAG0.y, SAG0.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), seed: 23, pop: sp, hops: SAG_HOPS })
        // the car keys, jingling
        const kx = sr.x - 120, ky = sr.y + 20 + Math.sin(t * 14) * 6
        R(x, kx - 14, ky - 14, 28, 28, INK); R(x, kx - 9, ky - 9, 18, 18, '#c9c2d8'); R(x, kx + 8, ky + 4, 36, 10, INK); R(x, kx + 10, ky + 6, 32, 6, GOLD)
      }
      if (t > T.stamps[2] && t < T.last) floatHearts(x, t, TAU0.x, TAU0.y - 140, T.stamps[2], T.last, 2, 4)
      const vr = drawVirgoStar(x, VIR0.x, VIR0.y, VIR0.size, t, { ...virState(t), hops: VIR_HOPS, seed: 3, pencil: t < T.marker, pop: ok })
      if (t > T.marker && t < T.last) { R(x, vr.x + 120, vr.y - 70, 22, 90, INK); R(x, vr.x + 124, vr.y - 66, 14, 70, '#3f6fd0'); R(x, vr.x + 124, vr.y - 66, 14, 14, '#fff') }
      if (t > T.laugh[0] && t < T.laugh[1] + 0.2) pixelBubble(x, vr.x + 20, vr.top - 70, 'ha. HA. haha.', { size: 28, alpha: pop01(t, T.laugh[0], 0.2) })
      x.restore()
      drawGaspLines(x, t, { at: T.gasp, dur: 1.1, x: CAP0.x, y: CAP0.y, follow: 0.5, cy: 1150, color: GOLD })
      // the itinerary (held up; it shrinks aside while Sag's map is out, and comes back up for the last line)
      const ik = t < T.sagIn ? 1 : t < T.stamps[0] - 0.4 ? lerp(1, 0.62, ease.inOutCubic(prog(t, T.sagIn, T.sagIn + 0.4))) : t < T.stamps[0] ? lerp(0.62, 1, prog(t, T.stamps[0] - 0.4, T.stamps[0] - 0.1)) : 1
      const io = t < T.sagIn ? 0 : t < T.stamps[0] - 0.4 ? -220 * prog(t, T.sagIn, T.sagIn + 0.4) : -220 * (1 - prog(t, T.stamps[0] - 0.4, T.stamps[0] - 0.1))
      const show = t < T.fact - 0.2 || t > T.last - 0.3
      const fk = t < T.fact - 0.2 ? 1 - prog(t, T.fact - 0.5, T.fact - 0.2) : pop01(t, T.last - 0.3, 0.35, 2) * (1 - prog(t, 20.15, 20.5))
      if (show) itinerary(x, t, fk * (t < T.fact ? 1 : 0.86), { scale: ik, ox: io, oy: t > T.last - 0.3 ? -20 : 0 })
      // Sag's map
      if (t > T.map && t < T.stamps[0] + 0.2) phoneScreen(x, t, { x: 790, y: 760, w: 320, h: 500, app: 'map', title: 'Maps', lines: MAP, clock: '8:02', accent: '#ff9a3a', pop: pop01(t, T.map, 0.35, 2) * (1 - prog(t, T.stamps[0] - 0.1, T.stamps[0] + 0.2)), rot: 0.06, size: 22 })
      T.stamps.forEach((s, i) => sparkles(x, t, CARD.x + CARD.w - 170 - i * 40, CARD.y + 150 + i * 110, s, 6, 80, i, ['#e0525a', GOLD, BONE]))
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.67 })
      drawClock(x, t, { from: '7:58', to: t < T.sagIn ? '8:00' : t < T.last ? '8:03' : '8:20', at: t < T.sagIn ? T.st1 : t < T.last ? T.sagIn : T.last, dur: 0.35, sign: 'virgo' })
      factChip(x, t, { text: 'Virgo is the largest zodiac constellation.', at: T.fact, dur: T.factDur, y: 520, label: '★ REAL SKY' })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.sagIn, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E29' }), cardCuts(CUTS)]

const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5]
const FX = { bus: 'sfx', rev: 0.15, dly: 0 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...stampCues(T.st1), ...clockCues(T.st1, 0.35),
  ...T.rows.map((s, i) => ['pop', s, NOTE[i], 0.04, -0.3 + i * 0.12]),
  ['whoosh', T.sagIn - 0.1, 0.35, 0.04], ['pop', T.sagIn + 0.1, 880, 0.04, 0.6], ...clockCues(T.sagIn, 0.35),
  ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.sagIn + 0.2 + i * 0.09), 0.04]),
  ...phoneCues(MAP, { app: 'map' }),
  ...talkCues(LINES, { cps: CPS, pitch: { [SAGN]: 587, [VIRN]: 880 } }),
  ...T.stamps.map(s => ['tom', s, 90, { ...FX, gain: 0.22, decay: 0.2 }]), ...gaspCues(T.gasp, { key: KEY }).filter(c => c[0] !== 'crash'),
  ['tick', T.ghost + 0.05, 0.015],
  ...[0, 0.3, 0.6].map((d, i) => ['pop', r3(T.laugh[0] + d), [659.25, 783.99, 1046.5][i], 0.04, -0.2]),
  ['tick', T.marker, 0.08], ['whoosh', T.write[0], 1.0, 0.02],
  ...factChipCues(T.fact, { dur: T.factDur }),
  ['pop', T.last, 783.99, 0.035, 0], ['pop', r3(T.last + 0.45), 1046.5, 0.05, 0], ['pluck', r3(T.last + 0.5), 1046.5, 0.045, 0.6, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void BONE
