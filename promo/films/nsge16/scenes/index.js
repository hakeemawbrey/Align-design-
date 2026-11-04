// nsge16 · Remix: Snow Globe Cities · "Quebec City: maple on snow" (28 s vertical, music: jazzy · Bb) · story 0–25.6, then the short 2.4 s end card (no card cut; CHANGE 4 Nov); was
// the shared end card. Look: ../nsge15/globekit.js. Rows: promo/films/next30/b17.md.
//   0.00–5.2   "Quebec City, in a | snow *globe.*"  Stone walls, steep green roofs, the river. ♉ Taurus mid-pour of hot maple
//              syrup onto a trough of snow (a real Quebec treat: pour it on snow, roll it on a stick), making a heart for
//              ♍ Virgo. Heart one runs into a puddle. TAURUS: "why won't it hold?!"
//   5.4–13.0   "Heart number | *two.*"  A blob. TAURUS: "…that's a potato." THE STARS: "babe. let it cool a minute."
//  13.4        card cut.
//  13.55–20.8 "The hardest part: | *waiting.*"  Heart three. Taurus stares at it (COOLING…). It sets; Taurus rolls it on a
//              stick and carries it to Virgo. VIRGO: "you waited? for me?"
//  21.0–25.5   "Sweet things | take a *minute.*"  Tonight's deck deals one card between them. Pisces fountains.
import { globeFilm, G, GOLD, BONE, INK, PINK, TAU, pop01, outK, popOut, inR, walk, drawBits, heart, sparkles, chip, drawCard, bubble } from '../../nsge15/globekit.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const T = {
  h0Out: [5.0, 5.2], pour1: [0.0, 1.1], melt1: [2.4, 3.5],
  h1: 5.4, h1Out: [12.85, 13.05], pour2: [5.7, 6.6], starsIn: 8.6, cut: 13.4,
  h2: 13.55, h2Out: [20.7, 20.9], pour3: [13.9, 14.7], set: 17.2, roll: [17.6, 18.3], walk: [18.4, 19.5], give: 19.6,
  h3: 21.0, deal: [21.4, 21.9], out: [25.1, 25.45],
}
const AMBER = '#d98a2b', AMBER_L = '#f5c46a', TR = { x: 480, y: G.ground - 34, w: 230 }
const TAU_X = t => walk(t, [[T.walk[0], 300, 0], [T.walk[1], 600, 0]])[0]
const GY = G.ground - 62

function skyline(x, t) {
  // the river and the far shore
  x.fillStyle = '#1d2d55'; x.fillRect(140, 1000, 800, 60); x.fillStyle = '#2e4a7a'; for (let i = 0; i < 9; i++) x.fillRect(170 + i * 90, 1020 + (i % 2) * 14, 40, 4)
  x.fillStyle = '#26305a'; x.fillRect(140, 975, 800, 28)
  // the stone wall with a gate
  x.fillStyle = INK; x.fillRect(140, 1066, 800, 90)
  x.fillStyle = '#8a8496'; x.fillRect(140, 1070, 800, 82)
  x.fillStyle = '#6f6a80'; for (let r = 0; r < 4; r++) for (let c = 0; c < 20; c++) x.fillRect(140 + c * 42 + (r % 2) * 21, 1074 + r * 20, 38, 3)
  for (let c = 0; c < 20; c++) { x.fillStyle = '#8a8496'; x.fillRect(146 + c * 42, 1056, 24, 16) }
  x.fillStyle = '#e9f2ff'; for (let c = 0; c < 20; c++) x.fillRect(146 + c * 42, 1052, 24, 6)
  // steep-roofed stone houses with green copper roofs + a tall turret
  const H = [[240, 110], [340, 140], [660, 130], [780, 100], [880, 120]]
  for (const [hx, h] of H) {
    const w = 84, y0 = 1060
    x.fillStyle = INK; x.fillRect(hx - w / 2 - 3, y0 - h - 3, w + 6, h + 6)
    x.fillStyle = '#b9a98f'; x.fillRect(hx - w / 2, y0 - h, w, h)
    x.fillStyle = '#4fae8e'; x.beginPath(); x.moveTo(hx - w / 2 - 6, y0 - h); x.lineTo(hx, y0 - h - 70); x.lineTo(hx + w / 2 + 6, y0 - h); x.fill()
    x.fillStyle = '#e9f2ff'; x.beginPath(); x.moveTo(hx - 20, y0 - h - 46); x.lineTo(hx, y0 - h - 70); x.lineTo(hx + 20, y0 - h - 46); x.fill()
    x.fillStyle = Math.sin(t + hx) > -0.7 ? '#ffd98a' : '#5a4a30'; x.fillRect(hx - 22, y0 - h + 24, 16, 22); x.fillRect(hx + 6, y0 - h + 24, 16, 22)
  }
  x.fillStyle = INK; x.fillRect(500, 830, 76, 236); x.fillStyle = '#a89a82'; x.fillRect(504, 834, 68, 232)
  x.fillStyle = '#4fae8e'; x.beginPath(); x.moveTo(494, 834); x.lineTo(538, 730); x.lineTo(582, 834); x.fill()
  x.fillStyle = '#ffd98a'; x.fillRect(528, 880, 20, 26); x.fillRect(528, 950, 20, 26)
}
// the syrup shapes on the trough of snow
function syrupHeart(x, cx, cy, k, melt, blob, shine) {
  if (k <= 0.01) return
  if (blob) { drawBits(x, ['..AAAA..', '.AAAAAA.', 'AAAAAAAA', 'AAAAAAAA', '.AAAAAAA', '..AAAA..'], { A: AMBER }, cx, cy, 14 * k, { sx: 1.2 }); return }
  const sx = 1 + melt * 1.6, sy = 1 - melt * 0.75
  drawBits(x, ['.AA.AA.', 'ALAAAAA', 'AAAAAAA', '.AAAAA.', '..AAA..', '...A...'], { A: AMBER, L: shine ? '#fff1c8' : AMBER_L }, cx, cy + melt * 30, 14 * k, { sx, sy })
  if (melt > 0.3) for (let i = 0; i < 4; i++) { x.fillStyle = AMBER; x.fillRect(cx - 100 + i * 62, cy + 34, 12, 26 * melt + i * 6) }
}
function trough(x) {
  const { x: cx, y, w } = TR
  x.fillStyle = INK; x.fillRect(cx - w / 2 - 6, y - 26, w + 12, 66)
  x.fillStyle = '#8c5638'; x.fillRect(cx - w / 2, y - 20, w, 54); x.fillStyle = '#6b3d2a'; x.fillRect(cx - w / 2, y + 22, w, 12)
  x.fillStyle = '#f4f8ff'; x.fillRect(cx - w / 2 + 8, y - 34, w - 16, 18); x.fillStyle = '#ffffff'; x.fillRect(cx - w / 2 + 14, y - 34, w - 40, 5)
}
function pour(x, t, [a, b]) {
  if (!inR(t, a - 0.3, b + 0.3)) return
  const k = clamp(Math.min(prog(t, a - 0.3, a), 1 - prog(t, b, b + 0.3)))
  const tip = { x: TAU_X(t) + 92, y: GY - 70 }
  x.save(); x.translate(tip.x, tip.y); x.rotate(0.9 * k)
  drawBits(x, ['.PPPP.', 'PPPPPP', 'PPPPPP', '.PPPP.'], { P: '#6a6f8a' }, 0, 0, 8)
  x.fillStyle = INK; x.fillRect(20, -6, 34, 8); x.restore()
  if (inR(t, a, b)) { x.fillStyle = AMBER; x.fillRect(tip.x + 30, tip.y + 10, 8, TR.y - 36 - tip.y - 10) }
}

const TAU_HOPS = [0.05, 1.15, T.melt1[1], 6.7, 7.0, T.set + 0.05, T.roll[1], T.walk[1], T.give, T.deal[1], 22.6]
const VIR_HOPS = [2.0, T.give + 0.1, T.deal[1] + 0.1, 22.8]

export const { DURATION, SCENES, CUES, MUSIC } = globeFilm({
  id: 'nsge16', plate: 'Quebec City', lead: 'taurus', partner: 'virgo',
  sky: { top: '#0b1236', bot: '#2a2f62', glow: '#f5c46a' },
  shakes: [-0.25],
  skyline,
  back(x, t) {
    trough(x)
    const cx = TR.x, cy = TR.y - 78
    // heart one: forms while pouring, then melts into a puddle
    if (t < T.h1Out[0]) {
      if (t < T.pour2[0]) syrupHeart(x, cx, cy, ease.outCubic(prog(t, ...T.pour1)), ease.inOutQuad(prog(t, ...T.melt1)), false, false)
      else syrupHeart(x, cx, cy, ease.outBack(prog(t, ...T.pour2)), 0, true)
    }
    // heart three: poured, waits, sets (shine), then leaves on the stick
    if (t > T.pour3[0] && t < T.roll[0]) syrupHeart(x, cx, cy, ease.outCubic(prog(t, ...T.pour3)), 0, false, t > T.set)
    pour(x, t, T.pour1); pour(x, t, T.pour2); pour(x, t, T.pour3)
  },
  cast(t, K) {
    let tm = 'happy', tl = [1, 0.6]
    if (t > T.melt1[0]) tm = 'wide'
    if (t > T.melt1[1] + 0.4) tm = 'squint'
    if (t > T.pour2[0]) tm = 'happy'
    if (t > 6.9) tm = 'eyeroll'
    if (t > T.starsIn + 0.4) { tm = 'neutral'; tl = [1, -1] }
    if (t > T.cut) { tm = 'happy'; tl = [1, 0.6] }
    if (t > T.pour3[1]) tm = 'squint'
    if (t > T.set) tm = 'sparkle'
    if (t > T.walk[0]) { tm = 'happy'; tl = [1, 0] }
    if (t > T.give + 0.4) tm = 'heart'
    const vm = t < T.give ? (t > T.melt1[0] && t < 4.5 ? 'wide' : 'neutral') : t < T.give + 1.2 ? 'wide' : 'sparkle'
    return [
      { sign: 'virgo', x: 770, y: GY, s: 176, mood: vm, look: t < T.walk[0] ? [-1, 0.4] : [-1, 0], hops: [...VIR_HOPS, ...K.HOPS.partner], seed: 7, hat: '#5fd38a' },
      { sign: 'taurus', x: TAU_X(t), y: GY, s: 190, mood: tm, look: tl, hops: [...TAU_HOPS, ...K.HOPS.lead], seed: 9, hat: '#d8484a' },
    ]
  },
  front(x, t) {
    // the rolled heart on its stick, carried to Virgo
    if (t > T.roll[0] && t < T.out[1]) {
      const k = ease.outBack(prog(t, ...T.roll)), hx = t < T.give ? TAU_X(t) + 96 : lerp(TAU_X(t) + 96, 690, ease.inOutCubic(prog(t, T.give, T.give + 0.4)))
      const hy = GY - 40 - 40 * k
      x.fillStyle = INK; x.fillRect(hx - 5, hy, 10, 96); x.fillStyle = '#e8d2a8'; x.fillRect(hx - 3, hy, 6, 92)
      drawBits(x, ['.AA.AA.', 'ALAAAAA', 'AAAAAAA', '.AAAAA.', '..AAA..', '...A...'], { A: AMBER, L: '#fff1c8' }, hx, hy - 20, 10 * k)
    }
    if (t > T.give + 0.4 && t < T.out[1]) for (let i = 0; i < 3; i++) { const tt = t - T.give - 0.4 - i * 0.4; if (tt > 0 && tt < 2.4) heart(x, 690 + 26 * Math.sin(tt * 3 + i), GY - 170 - tt * 70, 6, i % 2 ? '#ff4f86' : '#ff8fb1', { alpha: 1 - tt / 2.4 }) }
  },
  stars(t) {
    const k = pop01(t, T.starsIn, 0.4, 2.1) * popOut(t, T.out)
    return { x: 925, y: 650, s: 125, mood: t < T.cut ? 'squint' : t > T.give ? 'sparkle' : 'happy', look: [-1, 0.7], pop: k }
  },
  pisces(t) {
    const tears = t < T.melt1[0] ? 1 : t < T.give ? 2 : 3
    const mood = inR(t, T.melt1[0], T.melt1[1] + 0.6) ? 'wide' : t > T.give ? 'happy' : 'sparkle'
    return { x: 126, y: 1200, s: 150, mood, look: [1, -0.2], tears, hops: [T.melt1[1], T.set + 0.1, T.give + 0.2] }
  },
  over(x, t, K) {
    const ck = pop01(t, T.pour3[1] + 0.1, 0.3, 2.4) * outK(t, [T.set - 0.1, T.set + 0.1])
    const dots = '.'.repeat(1 + Math.floor((t * 3) % 3))
    chip(x, TR.x, 880, 'COOLING' + dots.padEnd(3, ' '), ck, { size: 32, col: '#9fd8ff', bar: '#9fd8ff' })
    chip(x, TR.x, 880, 'SET!', pop01(t, T.set, 0.3, 2.8) * outK(t, [T.roll[0], T.roll[0] + 0.2]), { size: 36, col: GOLD })
    sparkles(x, t, TR.x, TR.y - 50, T.set, 10, 110, 1, [GOLD, '#fff1c8', BONE])
    bubble(x, 480, 930, 'potato?', pop01(t, 7.0, 0.25, 2.6) * outK(t, [8.4, 8.6]), { size: 40, tail: 0 })
    // tonight's deck deals one card between them
    if (t > T.deal[0]) {
      const k = ease.outBack(prog(t, ...T.deal)), o = popOut(t, T.out)
      drawCard(x, K.img.back, lerp(1250, 660, k), lerp(700, 900, k) + 6 * Math.sin(t * 2), 170 * o, lerp(1.2, -0.06, k))
    }
    sparkles(x, t, 660, 900, T.deal[1], 12, 140, 2, [GOLD, PINK, BONE])
  },
  heads: [
    { text: 'Quebec City, in a | snow *globe.*', at: -1, lateAt: -0.6, out: T.h0Out, accentColor: AMBER_L },
    { text: 'Heart number | *two.*', at: T.h1, lateAt: T.h1 + 0.4, out: T.h1Out, accentColor: '#ff8fb1' },
    { text: 'The hardest part: | *waiting.*', at: T.h2, lateAt: T.h2 + 0.45, out: T.h2Out, accentColor: '#9fd8ff' },
    { text: 'Sweet things | take a *minute.*', at: T.h3, lateAt: T.h3 + 0.4, out: T.out, accentColor: GOLD },
  ],
  boxes: [
    { open: 0.8, close: 12.8, lines: [
      { t: 1.0, who: 'lead', text: 'a maple heart for *the Virgo.*' },
      { t: 3.6, who: 'lead', text: "why won't it *hold?!*" },
      { t: 7.15, who: 'lead', text: "…that's a *potato.*" },
      { t: 9.0, who: 'stars', text: 'babe. let it *cool* a minute.' },
    ] },
    { open: 14.9, close: 22.3, lines: [
      { t: 15.1, who: 'lead', text: 'is it a minute yet? *now?*' },
      { t: 19.75, who: 'partner', text: 'you *waited?* for me?' },
    ] },
  ],
  cuts: [T.h1Out[1] - 0.6, { t: T.cut, kind: 'flip' }, T.h2Out[1]],
  music: { style: 'jazzy', key: 'Bb', seed: 1616, drop: T.h1, breakdown: [T.cut], lift: [T.set], hits: [T.h3] },
  cues: [
    ['riser', T.pour1[0] + 0.02, T.pour1[1], 0.02], ['pluck', T.melt1[0], 523.25, 0.04, 0.6, 0], ['pluck', T.melt1[0] + 0.3, 466.16, 0.04, 0.6, 0], ['pluck', T.melt1[0] + 0.6, 392, 0.04, 0.9, 0],
    ['riser', T.pour2[0], T.pour2[1], 0.02], ['pop', 6.9, 440, 0.05, 0], ['tom', 6.9, 110, { gain: 0.15, decay: 0.2 }],
    ['pop', T.starsIn, 739.99, 0.035, 0.4], ['riser', T.pour3[0], T.pour3[1], 0.02],
    ...[15.8, 16.3, 16.8].map(c => ['tick', c, 0.03]),
    ['bell', T.set, 1760, 0.035, 1.0, 0], ['glitter', T.set, T.set + 0.5], ['whoosh', T.roll[0], 0.3, 0.03], ['whoosh', T.walk[0], 0.4, 0.025],
    ['pluck', T.give, 1174.66, 0.04, 0.5, 0.2], ['whoosh', T.deal[0], 0.4, 0.04], ['tick', T.deal[1], 0.05], ['glitter', T.deal[1], T.deal[1] + 0.5],
  ],
})
