// stname — "Even stars get a name." (45 s vertical Align ad, Star Talk season 3 #5, music: dreamy Eb).
// Story 0–40.6, then the shared end card. The whole sky is the audience; the zodiac is the punchline.
//   0.0–5.5   “so… what | are *we?*”  (— YOU, MONTH 4). The sky is packed with sign stars in rows, like bleachers. THEM's
//             box shows “. . .” (typing… typing… typing…) and over a heartbeat that speeds up every star leans in toward it,
//             wide-eyed. A tiny star in front covers its eyes with its points (and peeks once). ♒ AQUARIUS lounges at the edge
//             in sunglasses, vibing. ♍ Virgo holds a label maker (and wears its own label).
//   4.15      THEM (name tag only): "idk. I don't really do labels."  On "labels." the heartbeat stops, the pad tape-stops
//             and every star's eyes go flat at once, staring at you.  "The whole sky: | *unimpressed.*"  Aquarius nods along.
//             ♓ Pisces starts crying in the back. Crickets.
//   8.0–12.8  Whip to Aquarius: "labels are kind of a construct tbh".  "Not now, …" — one by one, every star turns to stare
//             at it (a domino of ticks) … "*Aquarius.*"  A spotlight of shame, silence, crickets. Aquarius shrinks a few
//             pixels (three steps) and its shades slide down its face.
//  12.95      card cut.
//  13.0–19.8  "The sky | *clapped back.*"  THE STARS: "we are balls of gas. and WE have a name." On the drop (15.05) they
//             snap into a ring in zodiac order, gold lines draw round it, a brass plate pops in the middle: THE ZODIAC ·
//             EST. ANTIQUITY. One spot in the ring is a dashed outline with a ♒ in it. The tiny star perches on the plate,
//             still not looking. "we've had it for thousands of years."
//  19.9–26.6 "Aquarius | has *notes.*"  AQUARIUS: "…can't we just vibe?" → a synced eye-roll round the whole ring (bwomp).
//             THE STARS: "you can vibe AND have a name." Aquarius hops eagerly to its spot… ♍ Virgo's label maker zzzts out
//             a strip and slaps it on the plate: "+ AQUARIUS (pending)".  "Status: | *pending.*"  Aquarius double-takes.
//  26.65      card cut.
//  26.71–31.1 ★ LESSON UNLOCKED: "Wanting clarity | isn't *too much.*"  (+1 CLARITY)
//  31.2–36.6  "Clear from | *day one.*"  YOUR CARD slides in: LOOKING FOR → "Something real" lights up; DEALBREAKERS →
//             "“I don't do labels”" lights up (Aquarius gulps). THE STARS: "say what you want before the first date."
//  36.6–40.6  Aquarius sighs: "ugh. fine. label me." and hops into its spot (the lift, 37.83). Shades back on, "(pending)"
//             tears off the label, the last two gold lines close the ring, the plate flashes, everyone cheers, Pisces sobs,
//             the tiny star finally looks.  "Even stars | get a *name.*"  Everything pops out by 40.45.
// One canvas (sky + camera-moved stage), a screen-space card, DOM type, the dialogue boxes, the shared lesson, grain on top.
// Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'
import { castStar, drawLabelMaker, drawLabelTape, drawPlate, drawGhostSlot, goldLine, tearFountain, slowTear, sparkleRing, sparkBurst, drawNote, drawSweat, drawTear, rgba } from './props.js'

export const DURATION = 45
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 40.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', CYAN = '#7fe0ff', DB_PINK = '#e87aa0'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
export const BEAT = n => 0.6 + n * 0.5556       // 108 bpm grid

// ── the timeline
export const T = {
  black: [0, 0.3],
  // 0 · the question
  h0: 0.1, h0Land: 0.8, you: 1.3, typing: [1.6, 2.4, 3.2], cover: 1.0, peek: [2.55, 3.3], h0Out: [5.32, 5.5],
  thumps: [0.62, 1.38, 2.08, 2.72, 3.3, 3.82, 4.3, 4.68, 5.02, 5.32],
  // 1 · the dodge
  l1: 4.15, flat: 5.62, h1: 5.68, h1Land: 5.98, nod: [5.8, 6.25, 6.7], cryP: 6.2, crickets: [6.5, 7.15], virgoLook: [6.55, 7.6], closeA: 7.3, h1Out: [7.85, 8.02],
  // 2 · not now, Aquarius
  whip: [8.02, 8.36], h2: 10.45, l2: 8.42, turn: [9.95, 10.95], h2Land: 10.98, stare: [11.0, 11.8], shrink: [11.85, 12.05, 12.25], shadesDown: [11.85, 12.3], closeB: 11.45, h2Out: [12.62, 12.8],
  cut1: 12.95,
  // 3 · the constellation
  h3: 13.06, l3: 13.2, snap: BEAT(26), h3Land: 15.1, lines: [15.55, 16.25], ghost: 16.1, plate: 16.3, tinyHop: [16.32, 16.72], l4: 16.6, proud: 18.35, closeC: 19.65, h3Out: [19.6, 19.78],
  // 4 · pending
  h4: 19.9, h4Land: 20.28, l5: 20.1, roll: [21.0, 21.95], l6: 22.55, join: [23.7, 24.1], print: [24.15, 24.7], slap: [24.72, 24.98], h4Out: [24.4, 24.58], h5: 24.62, h5Land: 25.0, dbl: [25.15, 25.65], closeD: 25.45, h5Out: [26.38, 26.55],
  cut2: 26.65,
  // 5 · the lesson
  lesson: BEAT(47), lessonOut: [30.95, 31.15],
  // 6 · on your card
  h6: 31.2, h6Land: 31.56, cardIn: [31.24, 31.74], chip1: 32.15, chip2: 32.85, gulp: 33.1, l7: 33.4, cardOut: [36.25, 36.6], h6Out: [36.4, 36.56],
  // 7 · even stars get a name
  sigh: [36.6, 37.25], h7: 37.25, l8: 36.85, hopIn: [37.5, BEAT(67)], shadesUp: [37.85, 38.02], link: [37.9, 38.24], tear: [38.0, 38.9], flash: 38.3, h7Land: 38.3, cheer: 38.34, uncover: [38.55, 38.8], closeF: 39.8, out: [40.05, 40.45], h7Out: [40.1, 40.3],
}
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Wanting clarity | isn’t *too much.*', chip: '+1 CLARITY' }

// ── the cast
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const CAST = ORDER.filter(id => id !== 'aquarius')                                // the 11 who snap into the ring
const SNAP_ORDER = ['pisces', 'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn']
const ALL = [...CAST, 'aquarius', 'tiny']
const COL = Object.fromEntries(ORDER.map(id => [id, signStar(id)]))
COL.tiny = { color: '#ff8fbf', glyph: null }
const SEED = Object.fromEntries(ALL.map((id, i) => [id, 3 + i * 7]))
// the hook: rows of stars like bleachers (world coords): [x, y, size]
const CROWD = {
  pisces: [178, 662, 108], gemini: [398, 636, 108], libra: [642, 644, 108], aries: [880, 664, 108],
  cancer: [206, 884, 144], taurus: [440, 862, 144], sagittarius: [672, 874, 144], scorpio: [896, 896, 144],
  leo: [272, 1134, 180], virgo: [548, 1152, 180], capricorn: [804, 1128, 180],
  aquarius: [944, 1296, 144], tiny: [168, 1318, 108],
}
const RING = { cx: 540, cy: 975, r: 330, size: 108 }
const slotOf = i => { const a = (330 - i * 30) * Math.PI / 180; return [RING.cx + Math.cos(a) * RING.r, RING.cy + Math.sin(a) * RING.r] }
const AQ_SLOT = slotOf(10), AQ_EDGE = [898, 1200]
const PLATE = { cx: 540, cy: 975, w: 420, h: 150 }
const TINY_PLATE = [540, 858]
const TAPE = { text: '+ AQUARIUS (pending)', h: 58, y: 1068, rot: -0.035 }
const TAPE_SPLIT = TAPE.text.indexOf('(')
// the domino turn: farthest from Aquarius turns first
const TURN_RANK = Object.fromEntries([...CAST, 'tiny'].map(id => [id, Math.hypot(CROWD[id][0] - CROWD.aquarius[0], CROWD[id][1] - CROWD.aquarius[1])]).sort((a, b) => b[1] - a[1]).map(([id], i) => [id, i]))

// ── the lines
const NAME = { them: 'THEM', aqu: '♒︎ AQUARIUS', stars: 'THE STARS' }
const THEM_C = '#c3bce0', AQ_C = '#7fdcf5'
const DOTS = '.\u00a0\u00a0.\u00a0\u00a0.'
const LINES_A = [
  ...T.typing.map(t => ({ t, speaker: NAME.them, color: THEM_C, text: DOTS, dots: true })),       // THEM is typing…
  { t: T.l1, speaker: NAME.them, color: THEM_C, text: 'idk. I don’t really do *labels.*' },
]
const LINES_B = [{ t: T.l2, speaker: NAME.aqu, color: AQ_C, text: 'labels are kind of a *construct* tbh' }]
const LINES_C = [
  { t: T.l3, speaker: NAME.stars, color: GOLD, text: 'we are balls of gas. and WE have a *name.*' },
  { t: T.l4, speaker: NAME.stars, color: GOLD, text: 'we’ve had it for *thousands of years.*' },
]
const LINES_D = [
  { t: T.l5, speaker: NAME.aqu, color: AQ_C, text: '…can’t we just *vibe?*' },
  { t: T.l6, speaker: NAME.stars, color: GOLD, text: 'you can vibe AND *have a name.*' },
]
const LINES_E = [
  { t: T.l7, speaker: NAME.stars, color: GOLD, text: 'say what you want *before the first date.*' },
  { t: T.l8, speaker: NAME.aqu, color: AQ_C, text: 'ugh. fine. *label me.*' },
]
const ALL_LINES = [...LINES_A, ...LINES_B, ...LINES_C, ...LINES_D, ...LINES_E]
const CPS = 28
export const LT = lineTimes(ALL_LINES, { cps: CPS })
const STAR_HOPS = talkHops(ALL_LINES, NAME.stars, { cps: CPS })
const AQ_HOPS = talkHops(ALL_LINES, NAME.aqu, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const toward = (from, to) => [Math.abs(to[0] - from[0]) > 50 ? Math.sign(to[0] - from[0]) : 0, Math.abs(to[1] - from[1]) > 90 ? Math.sign(to[1] - from[1]) : 0]

// every hop, per star (talk hops + the story's own hops); pure lists, built once
const HOPS = {}
for (const id of ALL) {
  const h = []
  if (CAST.includes(id)) {
    const d = (SEED[id] % 5) * 0.012
    for (const v of STAR_HOPS) h.push(v + d)
    h.push(T.snap + SNAP_ORDER.indexOf(id) * 0.045 + 0.42)                         // landing in the ring
    h.push(T.cheer + (SEED[id] % 6) * 0.035, T.cheer + 0.62 + (SEED[id] % 4) * 0.04)  // the cheer
  }
  if (id === 'aquarius') h.push(...AQ_HOPS, T.join[1], T.hopIn[1], T.dbl[0] + 0.27)
  if (id === 'tiny') h.push(T.tinyHop[1], T.cheer + 0.1, T.cheer + 0.7)
  HOPS[id] = h.sort((a, b) => a - b)
}

// ── camera keys: [t, s, fx, fy]: world (fx, fy) lands at screen (540, 1000) at scale s; 0.001 s apart = a hard cut
const CAM = [
  [0, 1.0, 540, 1000], [0.5, 1.0, 540, 1000], [4.1, 1.1, 540, 1030], [T.flat, 1.1, 540, 1030], [T.flat + 0.22, 1.0, 540, 1000],
  [T.whip[0], 1.0, 540, 1000], [T.whip[1], 1.5, 890, 1240], [T.turn[0] - 0.05, 1.52, 890, 1240], [T.turn[0] + 0.75, 1.0, 560, 1010],
  [T.cut1 - 0.001, 1.02, 560, 1010],
  [T.cut1, 1.0, 540, 1000], [T.snap, 1.0, 540, 1000], [T.snap + 0.12, 1.03, 540, 995], [T.plate + 0.3, 1.0, 540, 1000],
  [T.roll[0] - 0.35, 1.03, 540, 1000], [T.roll[0], 1.12, 560, 990], [T.roll[1] + 0.1, 1.12, 560, 990], [T.l6 + 0.4, 1.04, 560, 1010], [T.join[0], 1.04, 560, 1010], [T.print[0], 1.1, 590, 1040], [T.cut2 - 0.001, 1.12, 600, 1045],
  [T.cut2, 1.0, 540, 1000], [T.sigh[0], 1.0, 540, 1000], [T.hopIn[0], 1.08, 660, 1060], [T.flash, 1.08, 660, 1060], [T.flash + 0.6, 1.06, 540, 990],
]
function cam(t) {
  if (t <= CAM[0][0]) return { s: CAM[0][1], fx: CAM[0][2], fy: CAM[0][3] }
  for (let i = 1; i < CAM.length; i++) {
    if (t < CAM[i][0]) {
      const a = CAM[i - 1], b = CAM[i], d = b[0] - a[0]
      const e = (d < 0.5 ? ease.inOutQuad : ease.inOutCubic)(clamp((t - a[0]) / d))
      return { s: lerp(a[1], b[1], e), fx: lerp(a[2], b[2], e), fy: lerp(a[3], b[3], e) }
    }
  }
  const z = CAM[CAM.length - 1]; return { s: z[1], fx: z[2], fy: z[3] }
}

// ── the heartbeat: how far everyone has leaned in, and the flinch on each thump
const leanK = t => clamp(T.thumps.reduce((s, th) => s + 0.17 * ease.outCubic(prog(t, th, th + 0.3)), 0), 0, 1)
const flinch = t => T.thumps.reduce((m, th) => Math.max(m, bump(t, th, 0.22), 0.6 * bump(t, th + 0.17, 0.2)), 0)
const peekK = t => clamp(prog(t, T.peek[0], T.peek[0] + 0.12)) * (1 - prog(t, T.peek[1] - 0.12, T.peek[1]))

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 40px Inter", "italic 500 160px 'EB Garamond'", "italic 500 64px 'EB Garamond'", "600 60px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, '“so… what | are *we?*”', { top: 150, size: 108, accentSize: 158, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: PINK })
  const you = el('div', { position: 'absolute', left: 0, top: '458px', width: W + 'px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.2em', color: 'rgba(239,230,214,0.78)', textShadow: '0 3px 0 rgba(6,4,18,0.9)', display: 'none' }, root, '— YOU, MONTH 4')
  const H1 = popText(root, 'The whole sky: | *unimpressed.*', { top: 160, size: 96, accentSize: 150, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, gap: 0.07, accentColor: THEM_C })
  const H2 = popText(root, 'Not now, | *Aquarius.*', { top: 160, size: 110, accentSize: 164, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: CYAN })
  const H3 = popText(root, 'The sky | *clapped back.*', { top: 160, size: 110, accentSize: 156, at: T.h3, late: 2, lateAt: T.h3Land, lateGap: 0.3, wobble: true, accentColor: GOLD })
  const H4 = popText(root, 'Aquarius | has *notes.*', { top: 160, size: 110, accentSize: 164, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: CYAN })
  const H5 = popText(root, 'Status: | *pending.*', { top: 160, size: 110, accentSize: 170, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: CYAN })
  const H6 = popText(root, 'Clear from | *day one.*', { top: 160, size: 110, accentSize: 164, at: T.h6, late: 2, lateAt: T.h6Land, lateGap: 0.3, wobble: true, accentColor: GOLD })
  const H7 = popText(root, 'Even stars | get a *name.*', { top: 160, size: 110, accentSize: 170, at: T.h7, late: 1, lateAt: T.h7Land, wobble: true, gap: 0.08, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out], [H7, T.h7Out]]
  const BOX = { y: 1480, width: 960, height: 250, cps: CPS }
  const boxes = [
    dialogueBox(root, { ...BOX, lines: LINES_A, open: T.typing[0] - 0.25, close: T.closeA }),
    dialogueBox(root, { ...BOX, lines: LINES_B, open: T.l2 - 0.22, close: T.closeB }),
    dialogueBox(root, { ...BOX, lines: LINES_C, open: T.l3 - 0.15, close: T.closeC }),
    dialogueBox(root, { ...BOX, lines: LINES_D, open: T.l5 - 0.2, close: T.closeD }),
    dialogueBox(root, { ...BOX, lines: LINES_E, open: T.l7 - 0.25, close: T.closeF }),
  ]
  // the shared LESSON UNLOCKED beat: after the scene layers, before the grain
  const lesson = buildLesson(root, { ...LESSON, accentColor: GOLD, dim: 0.72 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── where everyone is (world coords) at t: { x, y, size, scale }
  function aqScale(t) {
    let s = 1
    T.shrink.forEach((t0, i) => { if (t >= t0) s = [0.92, 0.85, 0.78][i] })
    return lerp(s, 0.75, ease.inOutQuad(prog(t, ...T.hopIn)))
  }
  function place(id, t) {
    if (id === 'aquarius') {
      const c = CROWD.aquarius
      let p = [c[0], c[1]]
      if (t >= T.join[0]) { const k = prog(t, ...T.join), e = ease.inOutQuad(k); p = [lerp(c[0], AQ_EDGE[0], e), lerp(c[1], AQ_EDGE[1], e) - Math.sin(k * Math.PI) * 90] }
      if (t >= T.hopIn[0]) { const k = prog(t, ...T.hopIn), e = ease.inOutQuad(k); p = [lerp(AQ_EDGE[0], AQ_SLOT[0], e), lerp(AQ_EDGE[1], AQ_SLOT[1], e) - Math.sin(k * Math.PI) * 120] }
      return { x: p[0], y: p[1], size: c[2], scale: aqScale(t) }
    }
    if (id === 'tiny') {
      const c = CROWD.tiny, k = prog(t, ...T.tinyHop), e = ease.inOutQuad(k)
      return { x: lerp(c[0], TINY_PLATE[0], e), y: lerp(c[1], TINY_PLATE[1], e) - Math.sin(k * Math.PI) * 300, size: c[2], scale: 1 }
    }
    const c = CROWD[id], sl = slotOf(ORDER.indexOf(id))
    const h0 = T.snap + SNAP_ORDER.indexOf(id) * 0.045, k = prog(t, h0, h0 + 0.42)
    if (k <= 0) return { x: c[0], y: c[1], size: c[2], scale: 1 }
    if (k >= 1) return { x: sl[0], y: sl[1], size: RING.size, scale: 1 }
    const e = ease.inOutQuad(k)
    const arc = clamp(Math.min(c[1], sl[1]) - 610, 30, 160)
    return { x: lerp(c[0], sl[0], e), y: lerp(c[1], sl[1], e) - Math.sin(k * Math.PI) * arc, size: c[2], scale: lerp(1, RING.size / c[2], e) }
  }

  // ── how everyone feels at t: { mood, look, blink, sq, dy, sc, mitts, shadesDown }
  function pose(id, t, P) {
    const o = { mood: 'neutral', look: [0, 0], blink: undefined, sq: 0, dx: 0, dy: 0, sc: 1, mitts: null }
    const set = (m, lk, extra = {}) => Object.assign(o, { mood: m, look: lk }, extra)
    const here = [P.x, P.y]
    const aqNow = place('aquarius', t)
    const tinyMitts = (peek = 0) => ({ cover: easeOutBack(prog(t, T.cover, T.cover + 0.3), 2), peek })
    // ── 0 · the question: leaning in over the heartbeat
    if (t < T.flat) {
      const L = leanK(t), fl = flinch(t)
      if (id === 'aquarius') return set('happy', [1, 0], { sq: 0.05 + 0.03 * Math.sin(t * 4.2), dy: -3 * Math.abs(Math.sin(t * 4.2)) })   // vibing
      if (id === 'tiny') { const pk = peekK(t); return set(pk > 0.5 ? 'wide' : 'neutral', [0, 1], { blink: pk > 0.5 ? false : 1, mitts: tinyMitts(pk), sq: 0.04 * fl }) }
      return set(id === 'pisces' ? 'sparkle' : 'wide', [0, 1], { blink: false, dx: (540 - P.x) * 0.08 * L, dy: L * P.size * 0.16, sc: 1 + 0.11 * L, sq: -0.06 * L + 0.07 * fl })
    }
    // ── 1 · the dodge: flat eyes, all at once
    if (t < T.whip[0]) {
      const rel = 1 - ease.outCubic(prog(t, T.flat, T.flat + 0.25)), slump = 0.07 * ease.outCubic(prog(t, T.flat, T.flat + 0.2))
      if (id === 'aquarius') { const nk = Math.max(...T.nod.map(n => bump(t, n, 0.32))); return set('happy', [0, 0], { dy: nk * 12, sq: 0.06 * nk + 0.04 }) }
      if (id === 'tiny') return set('neutral', [0, 1], { blink: 1, mitts: tinyMitts(0) })
      if (id === 'pisces') return set('sparkle', [0, 0], { blink: false, dx: (540 - P.x) * 0.08 * rel, dy: rel * P.size * 0.16, sc: 1 + 0.11 * rel, sq: slump })
      const lk = id === 'virgo' && inR(t, ...T.virgoLook) ? [1, 1] : [0, 0]
      return set('neutral', lk, { blink: 0.55, dx: (540 - P.x) * 0.08 * rel, dy: rel * P.size * 0.16, sc: 1 + 0.11 * rel, sq: slump })
    }
    // ── 2 · not now, Aquarius
    if (t < T.cut1) {
      if (id === 'aquarius') {
        if (t < T.turn[0] + 0.6) return set('happy', [-1, 0], { sq: 0.04 })
        return set('wide', [-1, 0], { blink: false, sq: -0.05 * bump(t, T.turn[0] + 0.6, 0.3) })
      }
      const ti = T.turn[0] + TURN_RANK[id] * 0.085
      if (t < ti) {
        if (id === 'tiny') return set('neutral', [0, 1], { blink: 1, mitts: tinyMitts(0) })
        if (id === 'pisces') return set('sparkle', [0, 0], { blink: false, sq: 0.07 })
        return set('neutral', [0, 0], { blink: 0.55, sq: 0.07 })
      }
      const lk = toward(here, [aqNow.x, aqNow.y]), tk = bump(t, ti, 0.25)
      if (id === 'tiny') return set('wide', lk, { blink: false, mitts: tinyMitts(1) })
      return set('squint', lk, { sq: 0.05 - 0.08 * tk })
    }
    // ── 3 · the constellation
    if (t < T.l5 - 0.1) {
      if (id === 'aquarius') {
        if (inR(t, 18.4, 19.3)) return set('sparkle', [-1, -1], { sq: -0.04 })                       // a longing look at its spot
        if (inR(t, 19.3, 19.6)) return set('neutral', [1, 0])                                         // …caught; looks away
        return set(t < T.plate ? 'wide' : 'neutral', [-1, -1], { blink: t < T.plate ? false : undefined })
      }
      if (id === 'tiny') return set('neutral', [0, 1], { blink: 1, mitts: tinyMitts(0) })
      if (t < T.snap) return set('squint', [0, 0], { sq: 0.03 })                                  // "…and WE have a name."
      const h0 = T.snap + SNAP_ORDER.indexOf(id) * 0.045
      if (t < h0 + 0.42) return set('wide', [0, -1], { blink: false })
      const nk = bump(t, T.proud + (SEED[id] % 3) * 0.05, 0.42)
      if (id === 'pisces' && t > T.l4) return set('sparkle', [-1, 0], { dy: nk * 10, sq: 0.08 * nk })
      if (t < T.plate + 0.1) return set('happy', [0, 0])
      return set('happy', toward(here, [PLATE.cx, PLATE.cy]), { dy: nk * 10, sq: 0.08 * nk })
    }
    // ── 4 · can't we just vibe? → (pending)
    if (t < T.lesson) {
      if (id === 'aquarius') {
        if (t < T.l6) return set('happy', [-1, -1])
        if (t < T.join[0]) return set('neutral', [-1, 0])
        if (t < T.print[0] + 0.1) return set('sparkle', [-1, -1], { blink: false })
        if (t < T.dbl[0]) return set('wide', [-1, -1], { blink: false })
        if (t < T.dbl[0] + 0.15) return set('neutral', [-1, -1])
        if (t < T.dbl[0] + 0.27) return set('neutral', [1, 0])                                   // looks away…
        if (t < T.dbl[1] + 0.1) return set('wide', [-1, -1], { blink: false })                    // …snaps back
        return set('neutral', [-1, -1], { blink: 0.55 })
      }
      if (id === 'tiny') { const pk = clamp(prog(t, T.slap[1] + 0.1, T.slap[1] + 0.2)) * (1 - prog(t, T.slap[1] + 0.9, T.slap[1] + 1.0)); return set(pk > 0.5 ? 'wide' : 'neutral', [0, 1], { blink: pk > 0.5 ? false : 1, mitts: tinyMitts(pk) }) }
      if (inR(t, ...T.roll)) return set('eyeroll', [0, -1], { sq: 0.04 })
      if (t < T.join[0]) return set(t < T.roll[1] + 0.4 ? 'neutral' : 'squint', toward(here, [aqNow.x, aqNow.y]), { blink: t < T.roll[1] + 0.4 ? 0.55 : undefined })
      if (t < T.print[0]) return set('wide', toward(here, [aqNow.x, aqNow.y]), { blink: false })
      if (t < T.slap[1]) return set(id === 'virgo' ? 'squint' : 'neutral', id === 'virgo' ? [1, 1] : toward(here, [330, 1062]))
      const nk = bump(t, T.slap[1] + 0.12 + (SEED[id] % 3) * 0.04, 0.4)
      return set('happy', toward(here, [PLATE.cx, TAPE.y]), { dy: nk * 10, sq: 0.08 * nk })
    }
    // ── 5 · the lesson (dimmed behind the banner)
    if (t < T.lessonOut[1]) {
      if (id === 'aquarius') return set('neutral', [-1, -1], { blink: 0.55 })
      if (id === 'tiny') return set('neutral', [0, 1], { blink: 1, mitts: tinyMitts(0) })
      return set('happy', [0, -1])
    }
    // ── 6 · the card
    if (t < T.cardOut[1]) {
      if (id === 'aquarius') {
        const gk = bump(t, T.gulp, 0.35)
        if (t >= T.chip2 && t < T.chip2 + 1.6) return set('wide', [-1, -1], { blink: false, sq: 0.12 * gk })
        return set('neutral', [-1, -1])
      }
      if (id === 'tiny') return set('neutral', [0, 1], { blink: 1, mitts: tinyMitts(0) })
      const nk = Math.max(bump(t, T.chip1 + 0.1 + (SEED[id] % 3) * 0.04, 0.4), bump(t, T.chip2 + 0.1 + (SEED[id] % 3) * 0.04, 0.4))
      return set(t > T.chip1 ? 'happy' : 'wide', toward(here, [540, 1010]), { dy: nk * 10, sq: 0.08 * nk, blink: t > T.chip1 ? undefined : false })
    }
    // ── 7 · even stars get a name
    if (id === 'aquarius') {
      const sk = bump(t, T.sigh[0], T.sigh[1] - T.sigh[0])
      if (t < T.sigh[1]) return set('sleepy', [0, 0], { sq: 0.17 * sk })
      if (t < T.hopIn[0]) return set('neutral', [-1, -1])
      if (t < T.hopIn[1]) return set('wide', [-1, -1], { blink: false })
      return set('happy', [0, 0])
    }
    if (id === 'tiny') {
      const uk = prog(t, ...T.uncover)
      if (uk < 1) return set('neutral', [0, 1], { blink: 1, mitts: { cover: 1 - ease.inOutQuad(uk), peek: 0 } })
      return set('sparkle', [0, 0])
    }
    if (t < T.flash) return set('wide', toward(here, [aqNow.x, aqNow.y]), { blink: false })
    return set(id === 'cancer' || id === 'taurus' || id === 'leo' ? 'heart' : id === 'pisces' ? 'sparkle' : 'happy', [0, 0])
  }

  // ── one star (with its props)
  const FR = {}            // this frame's geometry (filled while drawing; read later in the same frame)
  function drawCast(id, t, P, alpha) {
    const ps = pose(id, t, P)
    const i = ALL.indexOf(id)
    const pin = pop01(t, 0.05 + i * 0.04, 0.32, 2.2)
    const pout = popOut(t, [T.out[0] + (SEED[id] % 5) * 0.05, T.out[1]])
    const pk = pin * pout
    if (pk <= 0.02) return null
    const shadesDown = id === 'aquarius' ? clamp(ease.inOutQuad(prog(t, ...T.shadesDown)) - ease.inOutQuad(prog(t, ...T.shadesUp))) : 0
    const r = castStar(x, P.x + ps.dx, P.y + ps.dy, P.size, t, {
      color: COL[id].color, glyph: COL[id].glyph, mood: ps.mood, look: ps.look, blink: ps.blink, squash: ps.sq, hops: HOPS[id], seed: SEED[id],
      pop: pk, alpha, glow: 0.85, bob: P.size * 0.03, scale: P.scale * ps.sc, zzz: false,
      glasses: id === 'cancer' || id === 'taurus' ? { glint: T.thumps.some(th => inR(t, th, th + 0.12)), frame: id === 'cancer' ? '#7a1f3d' : '#5a3a12' } : null,
      shades: id === 'aquarius' ? { down: shadesDown } : null,
      crown: id === 'leo', mitts: ps.mitts,
    })
    FR[id] = r
    const cs = r.size
    // Virgo's label maker, always in hand (it buzzes while it prints)
    if (id === 'virgo') {
      const buzz = inR(t, ...T.print) ? 1 : 0, big = 1 + 0.25 * clamp(prog(t, T.print[0] - 0.3, T.print[0])) * (1 - prog(t, T.slap[1], T.slap[1] + 0.4))
      FR.maker = { x: r.x + cs * 0.6, y: r.y + cs * (t >= T.snap ? 0.72 : 0.42), px: Math.max(3, cs / 34) * big }
      x.save(); x.globalAlpha *= alpha * clamp(pk)
      drawLabelMaker(x, FR.maker.x, FR.maker.y, FR.maker.px, { rot: 0.14 - 0.1 * buzz, buzz, t, stub: !inR(t, T.print[0], T.slap[1]) })
      drawLabelTape(x, r.x - cs * 0.3, r.y + cs * 0.3, 'VIRGO', { h: Math.max(14, cs * 0.13), rot: -0.08 })
      x.restore()
    }
    // Pisces: the running gag
    if (id === 'pisces') {
      x.save(); x.globalAlpha *= alpha
      if (inR(t, T.cryP, T.cut1)) { slowTear(x, t, r.ex - r.edx, r.ey, r.px, T.cryP, { period: 0.9, drop: cs * 0.45 }); slowTear(x, t, r.ex + r.edx, r.ey, r.px, T.cryP + 0.45, { period: 0.9, drop: cs * 0.45 }) }
      if (inR(t, T.l4 + 0.2, T.closeC)) { slowTear(x, t, r.ex - r.edx, r.ey, r.px, T.l4, { period: 1.0, drop: cs * 0.4 }); slowTear(x, t, r.ex + r.edx, r.ey, r.px, T.l4 + 0.5, { period: 1.0, drop: cs * 0.4 }) }
      if (t >= T.flash + 0.1) tearFountain(x, t, r.ex, r.ey, r.edx, r.px, T.flash + 0.1, T.out[0], { gap: 0.08 })
      x.restore()
    }
    // Aquarius: vibing notes, the sweat, the sigh
    if (id === 'aquarius') {
      x.save(); x.globalAlpha *= alpha * clamp(pk)
      if (t < T.turn[0] + 0.6) for (let k = 0; k < 14; k++) {
        const b = 0.45 + k * 0.68, a = t - b
        if (a < 0 || a > 1.6) continue
        x.save(); x.globalAlpha *= Math.sin(Math.PI * a / 1.6) * 0.9
        drawNote(x, r.x + cs * (0.42 + 0.1 * Math.sin(a * 3 + k)), r.top - a * 70 + cs * 0.1, Math.max(3, Math.round(cs / 30)), k % 2 ? CYAN : GOLD)
        x.restore()
      }
      if (inR(t, T.stare[0] + 0.3, T.cut1) || inR(t, T.gulp - 0.05, T.gulp + 1.4)) {
        const t0 = t < T.cut1 ? T.stare[0] + 0.3 : T.gulp - 0.05, a = ((t - t0) % 1.1) / 1.1
        x.save(); x.globalAlpha *= 1 - a * a
        drawSweat(x, r.x + cs * 0.4, r.top + cs * 0.22 + a * cs * 0.35, Math.max(3, Math.round(cs / 30)))
        x.restore()
      }
      if (inR(t, T.sigh[0] + 0.15, T.sigh[1] + 0.5)) {
        const a = prog(t, T.sigh[0] + 0.15, T.sigh[1] + 0.5)
        x.save(); x.globalAlpha *= Math.sin(Math.PI * a) * 0.85; x.fillStyle = '#eef6ff'
        const q = Math.max(3, Math.round(cs / 26))
        for (let k = 0; k < 3; k++) { const px0 = r.x - cs * (0.35 + 0.18 * k) - a * 60, py0 = r.top + cs * 0.05 - a * 40 - k * q * 3; x.fillRect(Math.round(px0), Math.round(py0), q * (3 - k), q * (2 - (k > 1 ? 1 : 0))) }
        x.restore()
      }
      x.restore()
    }
    return r
  }

  // ── the ring: gold lines (in ring order, Pisces round to Capricorn) + the two that close it at the end
  const SEGS = Array.from({ length: 10 }, (_, k) => [ORDER[(11 + k) % 12], ORDER[k % 12]])
  function drawLines(t, alpha) {
    if (t < T.lines[0]) return
    const n = SEGS.length, d = (T.lines[1] - T.lines[0]) / n
    SEGS.forEach(([a, b], k) => {
      const A = slotOf(ORDER.indexOf(a)), B = slotOf(ORDER.indexOf(b))
      goldLine(x, A[0], A[1] + 5, B[0], B[1] + 5, prog(t, T.lines[0] + k * d, T.lines[0] + k * d + 0.12), { alpha })
    })
    const L0 = slotOf(9), L2 = slotOf(11)
    goldLine(x, L0[0], L0[1] + 5, AQ_SLOT[0], AQ_SLOT[1] + 5, prog(t, T.link[0], T.link[0] + 0.16), { alpha })
    goldLine(x, L2[0], L2[1] + 5, AQ_SLOT[0], AQ_SLOT[1] + 5, prog(t, T.link[0] + 0.16, T.link[1]), { alpha })
    // the closing flash: the whole ring glows once
    const fk = Math.exp(-Math.max(0, t - T.flash) * 3) * (t >= T.flash ? 1 : 0)
    if (fk > 0.01) {
      x.save(); x.globalAlpha = alpha * fk; x.globalCompositeOperation = 'lighter'
      x.strokeStyle = 'rgba(255,226,140,0.9)'; x.lineWidth = 18; x.shadowColor = 'rgba(242,199,92,1)'; x.shadowBlur = 50
      x.beginPath(); x.arc(RING.cx, RING.cy + 5, RING.r, 0, Math.PI * 2); x.stroke()
      x.restore()
    }
  }
  function drawGhost(t, alpha) {
    if (t < T.ghost || t >= T.hopIn[1]) return
    const k = pop01(t, T.ghost, 0.36, 2.4), near = inR(t, T.join[1], T.hopIn[1]) ? 0.25 * (0.5 + 0.5 * Math.sin(t * 9)) : 0
    x.save(); x.translate(AQ_SLOT[0], AQ_SLOT[1]); x.scale(k, k)
    drawGhostSlot(x, 0, 0, 52, t, { alpha: alpha * (0.85 + near) })
    x.restore()
  }
  function drawPlateAndTape(t, alpha) {
    if (t < T.plate) return
    const pk = pop01(t, T.plate, 0.42, 2.2) * popOut(t, [T.out[0] + 0.1, T.out[1]])
    if (pk <= 0.01) return
    const fl = t >= T.flash ? Math.exp(-(t - T.flash) * 2.2) : 0
    x.save(); x.globalAlpha *= alpha; x.translate(PLATE.cx, PLATE.cy); x.scale(pk, pk); x.translate(-PLATE.cx, -PLATE.cy)
    drawPlate(x, PLATE.cx, PLATE.cy, PLATE.w, PLATE.h, t, { flash: fl })
    // the label, once it's slapped on
    if (t >= T.slap[1]) {
      const sw = x.measureText ? 0 : 0
      void sw
      const after = t - T.slap[1], land = 1 + Math.exp(-after * 14) * Math.sin(after * 40) * 0.06
      const tw = tapeW()
      x.save(); x.translate(PLATE.cx, TAPE.y); x.scale(land, 2 - land)
      drawLabelTape(x, -tw / 2, 0, TAPE.text, { h: TAPE.h, rot: TAPE.rot, split: TAPE_SPLIT, tear: prog(t, ...T.tear), glow: fl })
      x.restore()
    }
    x.restore()
  }
  let TW = 0
  function tapeW() {
    if (!TW) { x.save(); x.font = `700 ${Math.round(TAPE.h * 0.54)}px ${MONO}`; TW = x.measureText(TAPE.text).width + TAPE.h * 0.9; x.restore() }
    return TW
  }
  /** the label coming out of Virgo's label maker, then flying onto the plate */
  function drawTapeFlight(t) {
    if (t < T.print[0] || t >= T.slap[1] || !FR.maker) return
    const m = FR.maker, tw = tapeW()
    const sx = m.x + m.px * 6.5, sy = m.y + m.px * 4
    if (t < T.slap[0]) {
      drawLabelTape(x, sx, sy, TAPE.text, { h: TAPE.h, reveal: ease.outQuad(prog(t, ...T.print)), rot: 0.03 * Math.sin(t * 40) * (t < T.print[1] ? 1 : 0) })
      return
    }
    const k = prog(t, ...T.slap), e = ease.inOutQuad(k)
    const fx = lerp(sx, PLATE.cx - tw / 2, e), fy = lerp(sy, TAPE.y, e) - Math.sin(k * Math.PI) * 90
    drawLabelTape(x, fx, fy, TAPE.text, { h: TAPE.h, rot: lerp(0, TAPE.rot, e) - Math.sin(k * Math.PI) * 0.12 })
  }

  // ── the spotlight of shame: everything but Aquarius dims while the sky stares (screen space)
  function spotlight(t, C) {
    const k = clamp(prog(t, T.stare[0] - 0.3, T.stare[0])) * (1 - prog(t, T.cut1 - 0.2, T.cut1))
    if (k <= 0) return
    const a = place('aquarius', t), sx = 540 + (a.x - C.fx) * C.s, sy = 1000 + (a.y - C.fy) * C.s
    const g = x.createRadialGradient(sx, sy, 90, sx, sy, 420)
    g.addColorStop(0, 'rgba(6,3,18,0)'); g.addColorStop(1, `rgba(6,3,18,${0.55 * k})`)
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    x.save(); x.globalCompositeOperation = 'lighter'
    const s2 = x.createRadialGradient(sx, sy, 0, sx, sy, 150); s2.addColorStop(0, `rgba(255,236,180,${0.16 * k})`); s2.addColorStop(1, 'rgba(255,236,180,0)')
    x.fillStyle = s2; x.fillRect(sx - 160, sy - 160, 320, 320); x.restore()
  }

  // ── the heartbeat glow (screen space)
  function heartGlow(t) {
    if (t > T.flat + 0.3) return
    let a = 0
    for (const th of T.thumps) { const d = t - th; if (d >= 0 && d < 0.6) a = Math.max(a, Math.exp(-d * 7)); const d2 = d - 0.17; if (d2 >= 0 && d2 < 0.5) a = Math.max(a, 0.6 * Math.exp(-d2 * 8)) }
    if (a <= 0.01) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 1700, 0, 540, 1700, 1100)
    g.addColorStop(0, `rgba(255,92,138,${0.2 * a})`); g.addColorStop(1, 'rgba(255,92,138,0)')
    x.fillStyle = g; x.fillRect(0, 0, W, 1920); x.restore()
  }

  // ── YOUR CARD (screen space): LOOKING FOR + DEALBREAKERS, two chips light up
  const CARD = { w: 600, h: 820, cx: 540, cy: 1010 }
  function chip(cx, top, w, h, text, t0, t, accent) {
    const k = prog(t, t0, t0 + 0.3), lit = t >= t0
    const sc = lit ? 1 + 0.16 * Math.sin(Math.PI * Math.min(1, k)) : 1
    x.save(); x.translate(cx, top + h / 2); x.scale(sc, sc)
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, h / 2)
    if (!lit) {
      x.setLineDash([12, 10]); x.lineWidth = 3; x.strokeStyle = 'rgba(239,230,214,0.35)'; x.stroke(); x.setLineDash([])
    } else {
      x.save(); x.shadowColor = rgba(accent, 0.85); x.shadowBlur = 36 + 40 * (1 - k)
      const g = x.createLinearGradient(-w / 2, 0, w / 2, 0); g.addColorStop(0, '#fff8ea'); g.addColorStop(0.55, '#f7eefe'); g.addColorStop(1, '#e9f3ff')
      x.fillStyle = g; x.fill(); x.restore()
    }
    x.font = `700 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = lit ? '#1f1440' : 'rgba(239,230,214,0.42)'
    x.fillText(text, 0, 2)
    x.restore()
  }
  function drawCard(t) {
    if (t < T.cardIn[0] || t >= T.cardOut[1]) return
    const kin = prog(t, ...T.cardIn), kout = prog(t, ...T.cardOut)
    const e = easeOutBack(kin, 1.5), eo = ease.inCubic(kout)
    const cy = lerp(CARD.cy + 1250, CARD.cy, e) + eo * 1250, rot = (1 - ease.outCubic(kin)) * 0.22 - eo * 0.28
    const sk = clamp(kin * 2) * (1 - kout)
    x.fillStyle = `rgba(6,3,18,${0.5 * sk})`; x.fillRect(0, 0, W, 1920)
    x.save(); x.translate(CARD.cx, cy); x.rotate(rot)
    const w = CARD.w, h = CARD.h, L = -w / 2, Tp = -h / 2
    x.save(); x.shadowColor = rgba(GOLD, 0.5); x.shadowBlur = 60
    x.beginPath(); x.roundRect(L, Tp, w, h, 34)
    const g = x.createLinearGradient(0, Tp, 0, Tp + h); g.addColorStop(0, '#2c1660'); g.addColorStop(1, '#170a36')
    x.fillStyle = g; x.fill(); x.restore()
    x.lineWidth = 6; x.strokeStyle = '#f2d27a'; x.beginPath(); x.roundRect(L, Tp, w, h, 34); x.stroke()
    x.lineWidth = 2; x.strokeStyle = 'rgba(242,210,122,0.35)'; x.beginPath(); x.roundRect(L + 16, Tp + 16, w - 32, h - 32, 24); x.stroke()
    // header: You + a coin
    x.fillStyle = BONE; x.font = `italic 500 66px ${SERIF}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText('You', L + 46, Tp + 100)
    x.fillStyle = '#b48cff'; x.beginPath(); x.arc(-L - 74, Tp + 78, 32, 0, Math.PI * 2); x.fill()
    drawPixelStar(x, -L - 74, Tp + 78, 36, 2, '#fff6dc')
    // the aura window, with a pixel heart beating (the opening heartbeat, calmer now)
    const wx = L + 40, wy = Tp + 134, ww = w - 80, wh = 196
    x.save(); x.beginPath(); x.roundRect(wx, wy, ww, wh, 18); x.clip()
    const a = x.createRadialGradient(0, wy + wh * 0.62, 0, 0, wy + wh * 0.62, ww * 0.72); a.addColorStop(0, '#ffcf7a'); a.addColorStop(0.45, '#c2508a'); a.addColorStop(1, '#2a1250')
    x.fillStyle = a; x.fillRect(wx, wy, ww, wh)
    const hb = 1 + 0.08 * Math.max(bump(t % 0.95, 0, 0.16), 0.6 * bump(t % 0.95, 0.17, 0.14))
    x.save(); x.translate(0, wy + wh * 0.52); x.scale(hb, hb)
    const hp = 12
    ;['.XX.XX.', 'XWXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((row, j) => [...row].forEach((ch, i2) => { if (ch !== '.') { x.fillStyle = ch === 'W' ? '#ffffff' : '#fff1e6'; x.fillRect((i2 - 3.5) * hp, (j - 3) * hp, hp, hp) } }))
    x.restore()
    x.restore()
    x.lineWidth = 3; x.strokeStyle = 'rgba(242,210,122,0.6)'; x.beginPath(); x.roundRect(wx, wy, ww, wh, 18); x.stroke()
    // LOOKING FOR
    x.textAlign = 'center'; x.font = `700 26px ${MONO}`
    if ('letterSpacing' in x) x.letterSpacing = '6px'
    x.fillStyle = GOLD; x.fillText('LOOKING FOR', 3, Tp + 392)
    x.fillStyle = DB_PINK; x.fillText('DEALBREAKERS', 3, Tp + 566)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    chip(0, Tp + 414, w - 90, 96, '✓ Something real', T.chip1, t, GOLD)
    chip(0, Tp + 588, w - 90, 96, '✓ “I don’t do labels”', T.chip2, t, PINK)
    // footer
    x.fillStyle = 'rgba(239,230,214,0.6)'; x.font = `700 19px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    if ('letterSpacing' in x) x.letterSpacing = '3px'
    x.fillText('PICKED AT SIGNUP · ON YOUR CARD', 0, -Tp - 30)
    if ('letterSpacing' in x) x.letterSpacing = '0px'
    // the YOUR CARD tag
    const tk = pop01(t, T.cardIn[1] - 0.05, 0.34, 2.6)
    if (tk > 0) {
      x.save(); x.translate(-L - 110, Tp - 8); x.rotate(-0.1); x.scale(tk, tk)
      x.shadowColor = 'rgba(6,3,18,0.5)'; x.shadowBlur = 12
      x.beginPath(); x.roundRect(-124, -30, 248, 60, 16); x.fillStyle = '#f7f1ff'; x.fill(); x.shadowBlur = 0
      x.fillStyle = '#2a1846'; x.font = `700 25px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      if ('letterSpacing' in x) x.letterSpacing = '4px'
      x.fillText('✦ YOUR CARD', 2, 2)
      if ('letterSpacing' in x) x.letterSpacing = '0px'
      x.restore()
    }
    x.restore()
    // sparkles as each chip lights
    sparkleRing(x, t, CARD.cx, cy + Tp + 462, T.chip1 + 0.02, { n: 12, R0: 300, size: 26, squash: 0.35 })
    sparkleRing(x, t, CARD.cx, cy + Tp + 636, T.chip2 + 0.02, { n: 12, R0: 300, size: 26, squash: 0.35, seed: 1.1, cols: [PINK, BONE, GOLD, LAV] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const C = cam(t)
      drawSky(x, t, { ...SKY_H, dx: -(C.fx - 540) * 0.12, dy: -(C.fy - 1000) * 0.12, zoom: SKY_H.zoom * (1 + (C.s - 1) * 0.12) })
      if (t < T.out[1] + 0.02) {
        heartGlow(t)
        const outAll = popOut(t, T.out)
        const lineA = clamp(outAll) * (1 - 0.5 * clamp(prog(t, T.cardIn[0], T.cardIn[1])) * (1 - prog(t, ...T.cardOut)))
        x.save()
        x.translate(540, 1000); x.scale(C.s, C.s); x.translate(-C.fx, -C.fy)
        drawLines(t, lineA)
        drawGhost(t, clamp(outAll))
        drawPlateAndTape(t, 1)
        for (const k of Object.keys(FR)) delete FR[k]
        const list = ALL.map(id => ({ id, P: place(id, t) })).sort((a, b) => a.P.y - b.P.y || (a.id < b.id ? -1 : 1))
        for (const { id, P } of list) drawCast(id, t, P, 1)
        drawTapeFlight(t)
        // the snap: a sparkle ring as the zodiac forms; the plate pops; the close
        sparkleRing(x, t, RING.cx, RING.cy, T.lines[1] - 0.1, { n: 16, R0: 420, size: 30, squash: 1, life: 0.8 })
        sparkBurst(x, t, PLATE.cx, PLATE.cy, T.plate + 0.05, { n: 14, R0: 300, seed: 3 })
        sparkBurst(x, t, AQ_SLOT[0], AQ_SLOT[1], T.hopIn[1], { n: 12, R0: 200, seed: 11 })
        sparkleRing(x, t, RING.cx, RING.cy, T.flash, { n: 20, R0: 470, size: 34, squash: 1, life: 0.9 })
        if (t >= T.out[0]) sparkleRing(x, t, RING.cx, RING.cy, T.out[0] + 0.08, { n: 16, R0: 380, size: 30, squash: 1, life: 0.6 })
        x.restore()
        spotlight(t, C)
        drawCard(t)
      }
      for (const b of boxes) b.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      const yk = pop01(t, T.you, 0.34, 2.2) * outK(t, T.h0Out)
      you.style.display = yk > 0.01 ? 'block' : 'none'
      if (yk > 0.01) { you.style.opacity = String(clamp(yk)); you.style.transform = `translateY(${((1 - yk) * 16).toFixed(1)}px) scale(${(0.7 + 0.3 * yk).toFixed(4)})` }
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates (each a beat change where the old beat has cleared). The default selection keeps 12.95 (the stare →
// the constellation, a deal) and 26.65 (pending → LESSON UNLOCKED, pinned to a flip so it doesn't eat "Status: pending.");
// the others are the film's own whips/pops and play as such.
export const CUTS = [T.whip[0], T.cut1, 19.82, { t: T.cut2, kind: 'flip' }, T.cardIn[0] - 0.06]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound. pop / pluck / bell are written in the films' D-major palette and moved into Eb by the engine; chip / lead / tom
//    cues are written straight in Eb major and ride the music's 'fx' bus (like the shared level-up).
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const EB = { Eb3: 155.56, G3: 196, Ab3: 207.65, Bb3: 233.08, C4: 261.63, Eb4: 311.13, F4: 349.23, G4: 392, Ab4: 415.3, Bb4: 466.16, C5: 523.25, D5: 587.33, Eb5: 622.25, F5: 698.46, G5: 783.99, Ab5: 830.61, Bb5: 932.33, C6: 1046.5, D6: 1174.66, Eb6: 1244.51, G6: 1567.98, Bb6: 1864.66 }
const FX = { bus: 'fx', rev: 0.12, dly: 0 }
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, land, base, gain = 0.026, lands = 1, lateGap = 0.1) => [...wordPops(t0, n, 0.08, base, gain), ...Array.from({ length: lands }, (_, i) => [['pop', r3(land + i * lateGap), 1174.66, 0.05, 0], ['pluck', r3(land + i * lateGap), 1174.66, 0.04, 0.6, 0]]).flat()]
const heart = (t, g = 1) => [
  ['chip', t, 72, 0.12, { ...FX, wave: 'tri', slide: -16, gain: 0.12 * g, decay: 0.09, sustain: 0.2 }], ['pop', t, 104, 0.06 * g, 0], ['tick', t, 0.014 * g],
  ['chip', r3(t + 0.17), 64, 0.1, { ...FX, wave: 'tri', slide: -16, gain: 0.085 * g, decay: 0.08, sustain: 0.2 }], ['pop', r3(t + 0.17), 92, 0.042 * g, 0],
]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', r3(t + i * 0.035), 3520, 0.012, 0.5])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.02, decay: 0.08, sustain: 0.5 }])
const bwomp = t => [['lead', t, EB.Bb3, 0.42, { ...FX, from: EB.Eb4, glide: 0.34, wave: 'saw', cutoff: 1400, env: 600, gain: 0.05, decay: 0.3, sustain: 0.8, release: 0.12, vib: 0.02 }]]
const shrinkBlip = (t, f) => [['chip', t, f, 0.09, { ...FX, wave: 'square', duty: 0.25, slide: -10, gain: 0.03, decay: 0.06, sustain: 0.5 }], ['tick', t, 0.03]]
const zzzt = (t0, t1) => { const out = [['chip', t0, 1800, t1 - t0, { ...FX, wave: 'noise', gain: 0.022, decay: 0.5, sustain: 0.9 }]]; for (let t = t0; t < t1; t += 0.045) out.push(['tick', r3(t), 0.022]); return out }
const thwap = t => [['tom', t, 92, { ...FX, gain: 0.26, decay: 0.2 }], ['clap', r3(t + 0.004), { ...FX, gain: 0.14 }], ['tick', t, 0.08], ['boom', t, 0.05]]
const cheers = (t0, t1) => { const out = [['swell', t0, t1, { bus: 'fx', gain: 0.04, f0: 900, f1: 2600 }]]; for (let k = 0; k < 16; k++) out.push(['clap', r3(t0 + 0.08 + k * 0.12 + (k * 0.037) % 0.05), { ...FX, gain: 0.07, pan: ((k * 0.61) % 1) - 0.5 }]); return out }
const fanfare = t => [EB.Eb5, EB.G5, EB.Bb5, EB.Eb6].map((f, i) => ['chip', r3(t + i * 0.07), f, 0.14, { ...FX, wave: 'square', duty: 0.25, gain: 0.026, decay: 0.08, sustain: 0.6 }])
const PITCH = { [NAME.them]: 500, [NAME.aqu]: 1180, [NAME.stars]: 860 }
const lessonC = lessonCues(T.lesson, { ...LESSON, key: 'Eb' })
export const CUES = [
  // 0 · the question
  ...head(T.h0, 3, T.h0Land, 0),
  ...T.thumps.flatMap((th, i) => heart(th, i < 6 ? 0.8 + i * 0.04 : 1.05)),
  ...Array.from({ length: 13 }, (_, i) => ['pop', r3(0.05 + i * 0.04 + 0.12), NOTE[(i * 3) % 7] * 2, 0.012, ((i % 5) / 4 - 0.5)]),   // the crowd pops in
  ['pop', T.you + 0.05, 659.25, 0.025, 0], ['tick', T.you + 0.05, 0.03],
  ['pop', T.cover + 0.05, 1318.51, 0.02, -0.4], ['pop', T.peek[0], 1567.98, 0.018, -0.4], ['pop', T.peek[1] - 0.1, 1318.51, 0.016, -0.4],
  // 1 · the dodge
  ['tick', T.flat, 0.09], ['pop', T.flat, 196, 0.05, 0], ['tapeStop', T.flat - 0.02, 0.6],
  ...head(T.h1, 3, T.h1Land, 2),
  ...crickets(T.crickets[0]), ...crickets(T.crickets[1]), ...crickets(T.crickets[0] + 0.25), ...crickets(T.crickets[1] + 0.25),
  ...T.nod.map((n, i) => ['pop', r3(n + 0.1), 784 + i * 60, 0.014, 0.4]),
  ...sob(T.cryP + 0.1, EB.C6), ...sob(T.cryP + 0.9, EB.Bb5, 2),
  // 2 · not now, Aquarius
  ['whoosh', T.whip[0] + 0.1, 0.35, 0.07], ...head(T.h2, 2, T.h2Land, 4),
  ...Object.values(TURN_RANK).map(rk => ['tick', r3(T.turn[0] + rk * 0.085), 0.028]),
  ...Object.values(TURN_RANK).map(rk => ['pop', r3(T.turn[0] + rk * 0.085), 220 + rk * 8, 0.012, 0]),
  ...crickets(T.stare[0] + 0.15), ...crickets(T.stare[0] + 0.5),
  ...T.shrink.flatMap((s, i) => shrinkBlip(s, [EB.Eb5, EB.C5, EB.Ab4][i])),
  ['chip', T.shadesDown[0] + 0.05, EB.G5, 0.22, { ...FX, wave: 'tri', slide: -30, gain: 0.02, decay: 0.2, sustain: 0.6 }],
  ['pop', T.stare[0] + 0.32, 1567.98, 0.016, 0.5],
  // 3 · the constellation
  ...head(T.h3, 2, T.h3Land, 1, 0.026, 2, 0.3),
  ['whoosh', T.snap, 0.5, 0.06], ['swell', T.snap - 0.6, T.snap, { bus: 'fx', gain: 0.03, f0: 500, f1: 3000 }],
  ...SNAP_ORDER.map((id, i) => ['pop', r3(T.snap + i * 0.045 + 0.42), NOTE[i % 7] * (i >= 7 ? 2 : 1), 0.03, ((i % 5) / 4 - 0.5)]),
  ...Array.from({ length: 10 }, (_, k) => ['pluck', r3(T.lines[0] + k * 0.07 + 0.04), NOTE[(k * 2) % 7] * (k >= 5 ? 2 : 1), 0.03, 0.4, ((k % 5) / 4 - 0.5)]),
  ['bell', T.ghost + 0.05, 659.25, 0.025, 1.4, 0.5],
  ['bell', T.plate + 0.04, 1174.66, 0.045, 2.2, 0], ['glitter', T.plate + 0.05, T.plate + 0.9], ['tick', T.plate, 0.06], ...fanfare(T.plate + 0.06),
  ['whoosh', T.tinyHop[0] + 0.1, 0.3, 0.03], ['pop', T.tinyHop[1], 1567.98, 0.025, 0],
  ...[0, 1, 2].map(i => ['pop', r3(T.proud + 0.12 + i * 0.05), NOTE[i * 2], 0.016, 0]),
  // 4 · pending
  ...head(T.h4, 2, T.h4Land, 3),
  ...bwomp(T.roll[0] + 0.05),
  ['whoosh', T.join[0] + 0.05, 0.35, 0.04], ['pop', T.join[1], 880, 0.03, 0.3],
  ...zzzt(T.print[0], T.print[1]), ['tick', T.slap[0], 0.07],
  ['whoosh', T.slap[0] + 0.04, 0.22, 0.04], ...thwap(T.slap[1]),
  ...head(T.h5, 1, T.h5Land, 2),
  ['pop', T.dbl[0] + 0.15, 740, 0.025, 0.4], ['pop', T.dbl[0] + 0.27, 1100, 0.03, 0.4],
  ...[0, 1, 2].map(i => ['pop', r3(T.slap[1] + 0.25 + i * 0.05), NOTE[i * 2 + 1], 0.016, 0]),
  // 5 · the lesson
  ...lessonC,
  // 6 · on your card
  ...head(T.h6, 2, T.h6Land, 0, 0.026, 2, 0.3),
  ['whoosh', T.cardIn[0] + 0.05, 0.45, 0.06], ['tick', T.cardIn[1], 0.05], ['pop', T.cardIn[1] + 0.02, 659.25, 0.03, 0],
  ['bell', T.chip1, 1318.51, 0.04, 1.6, -0.2], ['pluck', T.chip1, 1174.66, 0.035, 0.6, -0.2], ['glitter', T.chip1, T.chip1 + 0.5],
  ['bell', T.chip2, 1567.98, 0.04, 1.6, 0.2], ['pluck', T.chip2, 1318.51, 0.035, 0.6, 0.2], ['glitter', T.chip2, T.chip2 + 0.5],
  ['chip', T.gulp, EB.G4, 0.1, { ...FX, wave: 'tri', slide: 24, gain: 0.03, decay: 0.08, sustain: 0.5 }],
  ['whoosh', T.cardOut[0] + 0.05, 0.4, 0.04],
  // 7 · even stars get a name
  ['chip', T.sigh[0] + 0.12, 3000, 0.6, { ...FX, wave: 'noise', slide: -24, gain: 0.016, decay: 0.5, sustain: 0.7 }],
  ['chip', T.sigh[0] + 0.12, EB.Bb4, 0.55, { ...FX, wave: 'tri', slide: -14, gain: 0.024, decay: 0.4, sustain: 0.7 }],
  ...wordPops(T.h7, 4, 0.08, 1),
  ['whoosh', T.hopIn[0] + 0.05, 0.3, 0.05], ['pop', T.hopIn[1], 1174.66, 0.04, 0.3], ['tick', T.hopIn[1], 0.06], ['boom', T.hopIn[1], 0.06],
  ['pluck', T.shadesUp[0] + 0.05, 1760, 0.025, 0.3, 0.3],
  ['chip', T.tear[0], 2600, 0.12, { ...FX, wave: 'noise', slide: 40, gain: 0.03, decay: 0.1, sustain: 0.5 }],
  ['pluck', T.link[0] + 0.08, 1318.51, 0.035, 0.5, 0.3], ['pluck', T.link[0] + 0.24, 1567.98, 0.035, 0.5, 0.3],
  ['pop', T.h7Land, 1174.66, 0.05, 0], ['pluck', T.h7Land, 1174.66, 0.04, 0.6, 0],
  ['bell', T.flash, 1760, 0.045, 2.4, 0], ['glitter', T.flash, T.flash + 1.0], ...fanfare(T.flash + 0.02),
  ...cheers(T.cheer, T.cheer + 1.6),
  ...sob(T.flash + 0.2, EB.C6), ...sob(T.flash + 0.75, EB.Eb6, 2),
  ['pluck', T.uncover[1], 1567.98, 0.03, 0.5, -0.3], ['pop', T.uncover[1] + 0.05, 1760, 0.02, -0.3],
  ['whoosh', T.out[0], 0.35, 0.035], ['glitter', T.out[0] + 0.1, T.out[0] + 0.5],
  ...talkCues(ALL_LINES.filter(L => !L.dots), { cps: CPS, pitch: PITCH }),
  ...T.typing.map((tt, i) => ['tick', r3(tt + 0.05), 0.02 + i * 0.004]),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
