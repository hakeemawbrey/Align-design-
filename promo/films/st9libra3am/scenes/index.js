// st9libra3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E35) · story 0–27.6, then the shared end card.
//   3 AM. "A Libra at 3 AM: did I say yes to *too* much?"  The same bedroom, dark (st9librahome, ep '3am': lights off,
//   the flowers evened out, one petal on the floor). Libra sits up in bed, phone glowing, battery blinking red.
//   3.0   the desk, dark: the wall calendar overflows; yes-slips pour out and pile up. "brunch, a move, a demo, a dinner…
//         all *saturday.*"   7.2 punch-in: the scale on its head, every slip on YES, nothing on ME. "i said yes so no one
//         feels *left out.*"
//   10.8  the window, dark, every star out: Libra's stars, and the Scorpion's claws drawing on past them. Fact chip: the
//         Greeks saw Libra's stars as the Scorpion's claws. THE STARS: "even the scales started as *claws.*" → "hold on to
//         people. let go of *some* plans."
//   16.5  back at the desk: Libra texts. "can we move brunch? i overbooked." GEMINI: "of course!! ♡" … AQUARIUS:
//         "honestly? relieved." Slips peel off, a little moon lands on the ME pan, the scale levels. "…they *still* love me."
//   22.0  frame 0's framing: Libra lies down, the phone dims, z's.   23.6 last line: "*No* is balanced, too."
//   Rewatch bait: one slip reads "say no (maybe)"; it's the only one left on the calendar at the end. The ghost leans out
//   from behind the left curtain at 13.0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawLibraHome, drawLibraScale, LIBRA } from '../../st9librahome.js'
import { phoneScreen, phoneCues } from '../../st9day.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 32
const T = { hookOut: 2.8, desk: 3.0, l1: 3.4, punch: 7.2, l2: 7.4, win: 10.8, l3: 11.2, claws: 11.6, ghost: 13.0, l4: 14.2, text: 16.5, peel: 17.4, level: 19.8, l5: 20.2, bed: 22.0, lie: 22.3, last: 23.6 }
const LIB = tag('libra'), NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: LIB, text: 'brunch, a move, a demo, a dinner… all *saturday.*', color: LIBRA.rose },
  { t: T.l2, speaker: LIB, text: 'i said yes so no one feels *left out.*', color: LIBRA.rose },
  { t: T.l3, speaker: NARR, text: 'even the scales started as *claws.*' },
  { t: T.l4, speaker: NARR, text: 'hold on to people. let go of *some* plans.' },
  { t: T.l5, speaker: LIB, text: '…they *still* love me.', color: LIBRA.mint },
]
const CHAT = [
  { from: 'me', text: 'can we move brunch? i overbooked.', at: T.text + 0.4 },
  { from: 'GEMINI', text: 'of course!! ♡', at: T.text + 1.4 },
  { from: 'me', text: 'rain check on the 5k?', at: T.text + 2.2 },
  { from: 'AQUARIUS', text: 'honestly? relieved.', at: T.text + 3.0 },
]
const INK = '#1b1236', BONE = '#efe6d6', GOLD = '#f2c75c'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const SLIPS = ['brunch w/ G', 'help A move', 'Q’s demo', 'T’s dinner', 'book club', '5k??', 'volunteer', 'call mom', 'say no (maybe)', 'karaoke', 'plant sitting', 'game night']
const MAYBE = 8

/** a yes-slip: a little sticky note */
function slip(x, cx, cy, text, rot, col = '#fff3a8', a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha = a; x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -66, -20, 132, 40); R(x, col, -62, -16, 124, 32)
  x.font = "700 15px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#5a3a1e'; x.fillText(text, 0, 1)
  x.restore()
}
/** where slip i is at t: pours out of the calendar (cal rect), lands in a pile; peels off later */
function slipPos(i, t, cal) {
  const born = T.desk + 0.15 + i * 0.28
  const cx0 = (cal.x0 + cal.x1) / 2, cy0 = (cal.y0 + cal.y1) / 2
  const px = 140 + (i * 167) % 820, py = 1210 - Math.floor(i / 4) * 34 - (i % 2) * 10
  const p = ease.inQuad(prog(t, born, born + 0.6))
  let x = lerp(cx0 + (i % 3 - 1) * 30, px, p), y = lerp(cy0, py, p) - Math.sin(Math.PI * p) * 120
  let a = t < born ? 0 : 1
  if (i !== MAYBE) a *= 1 - prog(t, T.peel + i * 0.12, T.peel + i * 0.12 + 0.35)
  else if (t > T.peel) { const q = ease.outCubic(prog(t, T.peel + 1.5, T.peel + 2.2)); x = lerp(px, cx0, q); y = lerp(py, cy0 + 30, q) }
  return { x, y, a, rot: ((i * 37) % 9 - 4) * 0.04 }
}

/** the window sky overlay: Libra's stars, and the claws drawing on toward the scorpion */
function claws(x, t, win) {
  const k = prog(t, T.win + 0.3, T.win + 1.0), c = prog(t, T.claws, T.claws + 1.6)
  if (k <= 0) return
  // Libra (schematic, in window coordinates): a quadrilateral of four stars, the scales beam between the top two
  const L = [[0.36, 0.36], [0.56, 0.3], [0.62, 0.55], [0.4, 0.6]].map(([u, v]) => [win.x0 + u * (win.x1 - win.x0), win.y0 + v * (win.y1 - win.y0)])
  const S = [[0.82, 0.42], [0.9, 0.5], [0.96, 0.62]].map(([u, v]) => [win.x0 + u * (win.x1 - win.x0), win.y0 + v * (win.y1 - win.y0)])
  x.save(); x.globalAlpha = k
  x.strokeStyle = 'rgba(242,199,92,0.7)'; x.lineWidth = 4; x.beginPath(); L.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.closePath(); x.stroke()
  if (c > 0) {
    // the claws: from the scorpion's head (right) reaching out to grab Libra's two brightest stars
    x.strokeStyle = 'rgba(255,106,90,0.85)'; x.setLineDash([12, 8])
    for (const tgt of [L[1], L[2]]) { x.beginPath(); x.moveTo(...S[0]); x.lineTo(lerp(S[0][0], tgt[0], c), lerp(S[0][1], tgt[1], c)); x.stroke() }
    x.setLineDash([]); x.beginPath(); S.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.stroke()
  }
  for (const p of [...L, ...(c > 0 ? S : [])]) { R(x, '#fff6dc', p[0] - 5, p[1] - 5, 10, 10); R(x, '#fff6dc', p[0] - 12, p[1] - 1, 24, 2); R(x, '#fff6dc', p[0] - 1, p[1] - 12, 2, 24) }
  x.font = "700 22px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = GOLD
  x.fillText('LIBRA', (L[0][0] + L[2][0]) / 2, L[3][1] + 50)
  if (c > 0.6) { x.fillStyle = '#ff8a7a'; x.globalAlpha = k * prog(c, 0.6, 1); x.fillText('SCORPIUS →', S[1][0] - 20, S[2][1] + 50) }
  x.restore()
}

function libraState(t) {
  if (t < T.desk) return { mood: 'wide', look: [1, 1], blink: false }
  if (t < T.win) return { mood: t < T.punch ? 'wide' : 'squint', look: [-1, -1], blink: t > T.punch }
  if (t < T.text) return { mood: 'neutral', look: [0, -1] }
  if (t < T.level) return { mood: 'neutral', look: [1, 0] }
  if (t < T.lie) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'sleepy' }
}
function headPans(t) {
  const yes = (c, px, py) => { for (let i = 0; i < 4; i++) { R(c, INK, px - 26, py - 10 - i * 12, 52, 12); R(c, '#fff3a8', px - 23, py - 8 - i * 12, 46, 8) } }
  const moon = (c, px, py) => { R(c, INK, px - 16, py - 32, 30, 30); R(c, '#fff1c8', px - 12, py - 28, 22, 22); R(c, '#2a2050', px - 4, py - 30, 14, 16) }
  if (t < T.peel) return { left: yes, right: null, tilt: -0.95 }
  if (t < T.level) return { left: yes, right: null, tilt: lerp(-0.95, -0.5, prog(t, T.peel, T.level)) }
  return { left: null, right: moon, tilt: 0.3 * Math.exp(-(t - T.level) * 3) * Math.cos((t - T.level) * 10) }
}

const BEDS = { x: 255, y: 1080 }
const EP = makeDay({
  numeral: 'S9 E35', sign: 'libra', ep: '3am', home: drawLibraHome, duration: DUR, key: 'Db',
  hook: { text: 'A Libra at 3 AM: did I say yes to *too* much?', out: [T.hookOut - 0.2, T.hookOut], accentColor: LIBRA.rose, size: 84, accentSize: 124 },
  shots: [
    { at: 0, room: 'bedroom', dark: 1, hour: 3, zoom: { x: 380, y: 1010, s: 1.25 } },
    { at: T.desk, room: 'desk', dark: 1, hour: 3.1, zoom: { x: 560, y: 980, s: 1.1 } },
    { at: T.punch, room: 'desk', dark: 1, hour: 3.15, zoom: { x: 420, y: 900, s: 1.5 } },
    { at: T.win, room: 'window', dark: 1, hour: 3.2, zoom: { x: 540, y: 960, s: 1.05 } },
    { at: T.text, room: 'desk', dark: 1, hour: 3.3, zoom: { x: 560, y: 980, s: 1.1 } },
    { at: T.bed, room: 'bedroom', dark: 1, hour: 3.4, zoom: { x: 380, y: 1010, s: 1.25 } },
  ],
  homeOpts: (t, sh) => {
    const on = sh.room === 'bedroom' ? (t < T.lie ? 1 : 1 - prog(t, T.lie + 0.5, T.lie + 1.5)) : sh.room === 'desk' ? 1 : 0
    const gx = sh.room === 'bedroom' ? BEDS.x + 120 : 430
    return { glows: on > 0 ? [{ x: gx, y: sh.room === 'bedroom' ? 1080 : 1020, r: 280, color: '#9fc4ff', a: 0.4 * on }] : [] }
  },
  clock: [{ at: 0, from: '3:02' }, { at: T.desk, dur: 0.6, from: '3:02', to: '3:07' }, { at: T.win, dur: 0.6, from: '3:07', to: '3:15' }, { at: T.text, dur: 0.6, from: '3:15', to: '3:21' }, { at: T.bed, dur: 0.8, from: '3:21', to: '3:33' }],
  stamps: [
    { at: T.desk + 0.2, out: T.punch - 0.1, time: '3:07 AM', text: 'said *yes* to everything' },
    { at: T.text + 0.2, out: T.level + 0.2, time: '3:21 AM', text: 'sending the *hard* texts' },
  ],
  lines: LINES, box: { close: 23.4 },
  fact: { at: T.claws + 0.2, dur: 3.2, label: '★ REAL SKY', text: 'The Greeks saw Libra’s stars as the Scorpion’s claws. Two star names still mean “claw.”', color: '#ff8a7a' },
  ghost: { room: 'window', at: T.ghost, x: 94, y: 760, from: 'left' },
  battery: 0.12,
  pitch: { [LIB]: 880, [NARR]: 784 },
  cuts: [{ t: T.win, kind: 'flip' }],
  draw(x, t, a, sh) {
    if (sh.room === 'bedroom') {
      // Libra sitting up in bed (then lying down), the phone in front of it
      const lie = ease.inOutQuad(prog(t, T.lie, T.lie + 0.8))
      const r = star(x, 'libra', BEDS.x + 60, lerp(1050, 1120, lie), 220, t, { ...libraState(t), seed: 3, glow: 0.6, squash: 0.18 * lie, hops: [T.hookOut] })
      if (t < T.desk) drawLibraScale(x, t, rr(r.x), rr(r.top + 8), 4, Math.sin(t * 3) * 0.6)
      // the blanket over its lower half
      R(x, INK, 30, 1150, 450, 140); R(x, '#8a78c0', 36, 1156, 438, 128); R(x, '#a493d8', 36, 1156, 438, 10)
      const on = t < T.lie ? 1 : 1 - prog(t, T.lie + 0.5, T.lie + 1.5)
      if (on > 0) { R(x, INK, r.x + 80, 1060, 58, 96); x.globalAlpha = on; R(x, '#9fc4ff', r.x + 86, 1066, 46, 78); x.globalAlpha = 1 }
    } else if (sh.room === 'desk') {
      // the calendar's red "!!" + the slips
      const cal = a.cal
      if (t < T.peel) { x.save(); x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 12); R(x, '#ff5d73', cal.x1 - 34, cal.y0 - 20, 34, 34); x.restore() }
      const r = star(x, 'libra', 420, 1130, 240, t, { ...libraState(t), seed: 3, glow: 0.7, hops: [T.l1, T.l2, T.level, T.l5] })
      const hp = headPans(t)
      drawLibraScale(x, t, rr(r.x), rr(r.top + 8), 6, hp.tilt, { left: hp.left, right: hp.right })
      if (sh.at === T.punch) {
        x.save(); x.font = "800 30px Inter"; x.textAlign = 'center'; x.fillStyle = GOLD
        x.fillText('YES', r.x - 78, r.top - 210); x.fillStyle = LIBRA.mint; x.fillText('ME', r.x + 78, r.top - 210); x.restore()
      }
      SLIPS.forEach((s, i) => { const p = slipPos(i, t, cal); slip(x, p.x, p.y, s, p.rot, i === MAYBE ? '#ffd1e8' : '#fff3a8', p.a) })
    } else {
      claws(x, t, a.win)
      const r = star(x, 'libra', 540, 1170, 230, t, { ...libraState(t), seed: 3, glow: 0.7, look: [0, -1] })
      drawLibraScale(x, t, rr(r.x), rr(r.top + 8), 5, -0.6 + 0.1 * Math.sin(t * 2))
    }
  },
  over(x, t, sh) {
    if (sh.room === 'desk' && t > T.text) phoneScreen(x, t, { x: 800, y: 860, w: 360, h: 600, lines: CHAT, app: 'chat', title: 'SATURDAY??', clock: '3:21', pop: pop01(t, T.text, 0.35, 2), rot: 0.04, accent: LIBRA.color })
  },
  last: { at: T.last, text: '*No* is balanced, too.', accentColor: LIBRA.mint },
  cues: [
    ...SLIPS.map((_, i) => ['pop', +(T.desk + 0.2 + i * 0.28).toFixed(3), [659.25, 783.99, 880, 1046.5][i % 4], 0.025, (i % 2 ? 0.3 : -0.3)]),
    ['tom', T.punch + 0.05, 0.06],
    ['riser', T.claws, T.claws + 1.6, 0.04], ['bell', T.claws + 1.6, 1567.98, 0.02, 1.4, 0],
    ...phoneCues(CHAT, { app: 'chat' }),
    ...SLIPS.map((_, i) => ['tick', +(T.peel + i * 0.12).toFixed(3), 0.02]),
    ['pop', T.level, 1046.5, 0.04, 0], ['glitter', T.level, T.level + 0.7],
    ['whoosh', T.lie, 0.5, 0.02],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
