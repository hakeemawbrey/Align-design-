// nsge17 · Remix: Snow Globe Cities · "Edinburgh: Old Town, New Town" (30 s vertical, music: chiptune · Eb) · story 0–25.6,
// then the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Edinburgh, in a | snow *globe.*"  Left of the glass: the castle on its rock and tall crooked old houses. Right:
//              a tidy grid of terraces (Edinburgh really has an Old Town and a New Town). ♊ Gemini hops to the left:
//              "Old Town me wants candlelight." (a candle pops up) then to the right: "New Town me wants a tidy plan."
//   5.4–13.0   "Two towns. | *Two* Geminis."  The third twist, in the middle: "…middle me wants a snack." THE STARS: "babe.
//              you can like both." Gemini spins between the two sides, dizzy.
//  13.4        card cut.
//  13.55–20.8 "Then someone | likes *both.*"  ♌ Leo walks up the hill in the middle: "candlelight AND a plan? love it."
//              GEMINI: "wait. both of me?" The candle and the plan float together over them.
//  21.0–25.5   "The right one loves | *both* of you."  A talk card ("Planned date or spontaneous date?"). Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, ICE, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], toOld: [0.0, 0.6], toNew: [3.0, 3.5],
  h1: 5.4, h1Out: [12.85, 13.05], toMid: [5.7, 6.1], snack: 6.5, starsIn: 8.3, spin: [10.4, 11.8], cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], leoIn: [14.2, 15.9], gemTo: [14.2, 15.0], both: 19.8,
  h3: 21.0, card: [21.5, 22.0], out: [25.1, 25.45],
}
const GY = G.ground - 62
const GEM_X = t => {
  if (inR(t, T.spin[0], T.spin[1])) { const p = prog(t, ...T.spin); return 540 + 170 * Math.sin(p * Math.PI * 4) }
  return walk(t, [[T.toOld[0], 500, 0], [T.toOld[1], 340, 0], [T.toNew[0], 340, 0], [T.toNew[1], 740, 0], [T.toMid[0], 740, 0], [T.toMid[1], 540, 0], [T.gemTo[0], 540, 0], [T.gemTo[1], 420, 0]])[0]
}
const LEO_X = t => walk(t, [[T.leoIn[0], 1050, 0], [T.leoIn[1], 680, 0]])[0]

function skyline(x, t) {
  // left: the crag and the castle
  x.fillStyle = '#2b2a48'; x.beginPath(); x.moveTo(140, 1100); x.lineTo(170, 900); x.lineTo(250, 860); x.lineTo(380, 880); x.lineTo(420, 1000); x.lineTo(430, 1100); x.closePath(); x.fill()
  x.fillStyle = INK; x.fillRect(180, 790, 210, 80)
  x.fillStyle = '#5d5873'; x.fillRect(184, 794, 202, 76)
  for (let i = 0; i < 9; i++) { x.fillStyle = '#5d5873'; x.fillRect(184 + i * 24, 776, 14, 20) }
  x.fillStyle = INK; x.fillRect(300, 720, 54, 80); x.fillStyle = '#6b6684'; x.fillRect(304, 724, 46, 72)
  x.fillStyle = '#ffd98a'; for (const [wx, wy] of [[210, 820], [250, 820], [290, 830], [318, 744], [360, 822]]) x.fillRect(wx, wy, 12, 16)
  x.fillStyle = '#e9f2ff'; x.fillRect(184, 786, 202, 6); x.fillRect(300, 716, 54, 6)
  // tall crooked old houses at the foot
  const OLD = [[180, 160, -0.03], [250, 200, 0.02], [320, 180, -0.02], [390, 150, 0.03]]
  for (const [hx, h, r] of OLD) {
    x.save(); x.translate(hx, 1110); x.rotate(r)
    x.fillStyle = INK; x.fillRect(-36, -h - 4, 72, h + 4); x.fillStyle = '#7d6a5c'; x.fillRect(-32, -h, 64, h)
    x.fillStyle = '#e9f2ff'; x.fillRect(-36, -h - 10, 72, 10)
    x.fillStyle = '#ffcf70'; for (let j = 0; j < Math.floor(h / 46); j++) { x.fillRect(-22, -h + 20 + j * 46, 12, 18); x.fillRect(10, -h + 20 + j * 46, 12, 18) }
    x.restore()
  }
  // right: the neat grid of terraces
  x.fillStyle = INK; x.fillRect(620, 940, 320, 170)
  x.fillStyle = '#c9b996'; x.fillRect(624, 944, 316, 166)
  x.fillStyle = '#e9f2ff'; x.fillRect(620, 930, 320, 14)
  x.fillStyle = '#a8977a'; for (let c = 0; c < 6; c++) x.fillRect(624 + c * 54, 944, 3, 166)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) { x.fillStyle = (r + c + Math.floor(t * 0.5)) % 5 ? '#ffe08a' : '#6a5a3a'; x.fillRect(640 + c * 54, 960 + r * 48, 20, 28) }
  // the hill path in the middle
  x.fillStyle = '#3a3658'; x.beginPath(); x.moveTo(440, 1110); x.lineTo(520, 1000); x.lineTo(560, 1000); x.lineTo(620, 1110); x.fill()
}
const CANDLE = ['..F..', '.FYF.', '..Y..', '.WWW.', '.WWW.', '.WWW.', '.WWW.', 'BBBBB']
const PLAN = ['PPPPPP', 'PLPLPL', 'PPPPPP', 'PLPLPL', 'PPPPPP', 'PLPLPL', 'PPPPPP']
const BUN = ['..CCC..', '.CCCCC.', 'CCCICCC', 'CCICCCC', '.CCCCC.']
function icons(x, t) {
  const fl = Math.sin(t * 20) > 0 ? '#ffb347' : '#ffd23a'
  const oldK = pop01(t, 1.2, 0.3, 2.6), newK = pop01(t, 3.6, 0.3, 2.6), snK = pop01(t, T.snack, 0.3, 2.6) * outK(t, [T.starsIn, T.starsIn + 0.2])
  const tog = ease.inOutCubic(prog(t, T.both - 0.1, T.both + 0.8))
  const fade = outK(t, [T.spin[0] - 0.1, T.spin[0] + 0.1]) + (t > T.leoIn[1] ? pop01(t, T.leoIn[1] + 0.3, 0.3, 2.2) : 0)
  const cxO = lerp(250, 500, tog), cxN = lerp(830, 610, tog), cy = lerp(800, 700, tog)
  if (fade > 0.01) {
    drawBits(x, CANDLE, { F: fl, Y: '#fff1c8', W: '#f4e8cc', B: '#8c5638' }, cxO, cy, 15 * oldK * clamp(fade))
    drawBits(x, PLAN, { P: '#f4f8ff', L: '#3f7cf0' }, cxN, cy + 10, 15 * newK * clamp(fade))
  }
  if (snK > 0.01) drawBits(x, BUN, { C: '#d9a05b', I: '#f4e8cc' }, 540, 800, 15 * snK)
}

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge17', plate: 'Edinburgh', lead: 'gemini', partner: 'leo',
  sky: { top: '#0b1030', bot: '#272a5a', glow: '#8fb8ff' },
  shakes: [-0.25],
  skyline,
  cast(t, K) {
    let gm = 'happy', gl = [-1, -0.5]
    if (t > T.toNew[0]) gl = [1, -0.5]
    if (t > T.toMid[0]) { gm = 'sparkle'; gl = [0, -1] }
    if (t > T.starsIn + 0.4) { gm = 'neutral'; gl = [1, -1] }
    if (inR(t, T.spin[0], T.spin[1] + 0.9)) { gm = 'eyeroll'; gl = undefined }
    if (t > T.cut) { gm = 'neutral'; gl = [1, 0] }
    if (t > T.leoIn[1] + 0.8) gm = 'happy'
    if (t > T.both) gm = 'heart'
    const lm = t < T.both ? 'happy' : 'sparkle'
    return [
      t > T.leoIn[0] ? { sign: 'leo', x: LEO_X(t), y: GY, s: 186, mood: lm, look: [-1, 0], hops: [T.leoIn[1], T.both + 0.1, 22.5, ...K.HOPS.partner], seed: 11, hat: '#ff9a3a' } : null,
      { sign: 'gemini', x: GEM_X(t), y: GY, s: 188, mood: gm, look: gl, hops: [0.0, T.toOld[1], T.toNew[1], T.toMid[1], T.spin[1], T.both, 22.3, ...K.HOPS.lead], seed: 4, hat: '#ffe27a' },
    ]
  },
  front(x, t) {
    if (t > T.both + 0.3 && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.both - 0.3 - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 550 + 26 * Math.sin(tt * 3 + i), GY - 150 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? (t > T.spin[0] ? 'eyeroll' : 'squint') : t > T.both ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    return { x: 126, y: 1200, s: 150, mood: t > T.both ? 'happy' : inR(t, T.snack, T.snack + 1) ? 'heart' : 'sparkle', look: [1, -0.2], tears: t < T.toNew[0] ? 1 : t < T.both ? 2 : 3, hops: [T.snack + 0.1, T.both + 0.2] }
  },
  over(x, t, K) {
    icons(x, t)
    chip(x, 250, 1185, 'OLD TOWN', pop01(t, 0.9, 0.3, 2.4) * outK(t, T.h1Out), { size: 26, col: '#ffcf70', bar: '#ffcf70' })
    chip(x, 830, 1185, 'NEW TOWN', pop01(t, 3.3, 0.3, 2.4) * outK(t, T.h1Out), { size: 26, col: ICE, bar: ICE })
    if (t > T.card[0]) {
      const k = ease.outBack(prog(t, ...T.card)), o = popOut(t, T.out)
      drawCard(x, K.img.talk6, lerp(560, 560, k), lerp(1400, 860, k) + 6 * Math.sin(t * 2), 180 * o, lerp(-0.5, -0.04, k))
    }
    sparkles(x, t, 560, 860, T.card[1], 12, 140, 2, [GOLD, PINK, BONE])
    sparkles(x, t, 560, 650, T.both + 0.8, 12, 150, 1, [GOLD, '#ffcf70', ICE])
  },
  heads: [
    { text: 'Edinburgh, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: '#ffcf70' },
    { text: 'Two towns. | *Two* Geminis.', at: T.h1, lateAt: T.h1 + 0.35, out: T.h1Out, accentColor: '#ffe27a' },
    { text: 'Then someone | likes *both.*', at: T.h2, lateAt: T.h2 + 0.45, out: T.h2Out, accentColor: '#ff9a3a' },
    { text: 'The right one loves | *both* of you.', at: T.h3, lateAt: T.h3 + 0.5, out: T.out, size: 90, accentColor: PINK },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'Old Town me wants *candlelight.*' },
      { t: 3.4, who: 'lead', text: 'New Town me wants *a tidy plan.*' },
      { t: 6.1, who: 'lead', text: '…middle me wants *a snack.*' },
      { t: 8.65, who: 'stars', text: 'babe. you can like *both.*' },
    ] },
    { open: 16.0, close: 22.4, lines: [
      { t: 16.2, who: 'partner', text: 'candlelight AND a plan? *love it.*' },
      { t: 19.0, who: 'lead', text: 'wait. *both* of me?' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'chiptune', key: 'Eb', seed: 1717, drop: T.h1, breakdown: [T.cut], lift: [T.leoIn[1]], hits: [T.h3] },
  cues: [
    ['whoosh', T.toOld[0] + 0.05, 0.3, 0.025], ['pluck', 1.2, 880, 0.04, 0.4, -0.4], ['whoosh', T.toNew[0], 0.35, 0.03], ['pluck', 3.6, 1174.66, 0.04, 0.4, 0.4],
    ['pop', T.snack, 659.25, 0.05, 0], ['pop', T.starsIn, 739.99, 0.035, 0.4],
    ['riser', T.spin[0], T.spin[1], 0.025], ['tick', T.spin[1], 0.05],
    ['whoosh', T.leoIn[0], 0.5, 0.03], ['pop', T.leoIn[1], 880, 0.04, 0.3],
    ['bell', T.both + 0.8, 1760, 0.03, 1, 0], ['glitter', T.both + 0.8, T.both + 1.3],
    ['whoosh', T.card[0], 0.4, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0.2],
  ],
})
