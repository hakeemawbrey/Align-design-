// kpvee01 · Planet Talk: Venus to Aries — "The Date-Three Flash Mob" (24 s vertical, star_talk, hard cut). funk · A.
//   0.00  frame 0: Venus mid-crash through the sky, spinning the wrong way, glitter mid-air; Aries on a ladder hanging
//         a giant banner "WILL YOU BE MY…"; slam title "ARIES. Drop the *banner*, darling." already landed.
//   0.35  Venus lands: whip zoom + shake. 2.9 Aries: "I know what I want!" 3.2 the banner's second half drops:
//         "…PERSON? (DATE 3)", caught circle on DATE 3.
//   5.5   Venus: "In astrology I rule love." / "You rule starting things."  10.5 slam "Love language: acts of courage."
//  13.2   Venus: "Gorgeous. On date thirty."  15.8 the banner rolls up; a tiny note card: "had the best time. again
//         friday?" Venus: "Send this instead, darling."  18.4 notification: "YES. friday!"  Aries heart-eyes,
//         Pisces sobs ("date THIRTY? I'll be ready.").  22.6 slam "Grand gesture? Date thirty, darling." Hard cut 24.
import { prog, ease, lerp } from '../../../src/lib.js'
import { episode, panel, txt, heart, sparkleBurst, pop01, outK, INK, ROSE, CREAM, VRIM, sobCues } from '../../kpvee01/venuskit.js'

const T = { unroll: 3.2, rollUp: [15.8, 16.35], card: 16.2, notif: 18.4, heart: 18.8, sob: 19.0, last: 22.6 }
const LADDER = { x: 700, top: 1420, bot: 1700 }

function banner(x, t) {
  const up = ease.inCubic(prog(t, ...T.rollUp))
  if (up >= 1) return
  const sway = Math.sin(t * 1.7) * 0.012
  x.save(); x.translate(540, 900); x.scale(1, 1 - up); x.translate(-540, -900)
  // ropes
  x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.moveTo(-10, 860); x.lineTo(80, 930); x.moveTo(1090, 860); x.lineTo(1000, 930); x.stroke()
  panel(x, 540, 1010, 920, 150, { fill: CREAM, rad: 10, rot: sway, shadow: true })
  txt(x, 'WILL YOU BE MY…', 540, 1012, { size: 82, color: '#d8324a', rot: sway })
  const u = ease.outCubic(prog(t, T.unroll, T.unroll + 0.45))
  if (u > 0) {
    x.save(); x.beginPath(); x.rect(0, 1095, 1080, 190 * u); x.clip()
    panel(x, 540, 1180, 880, 150, { fill: '#ffe1ea', rad: 10, rot: -sway, shadow: false })
    txt(x, '…PERSON? ♥ (DATE 3)', 540, 1182, { size: 70, color: INK, rot: -sway })
    x.restore()
  }
  x.restore()
}
function ladder(x, t) {
  x.save(); x.strokeStyle = '#a7703e'; x.lineWidth = 16; x.lineCap = 'round'
  x.beginPath(); x.moveTo(LADDER.x - 70, LADDER.top); x.lineTo(LADDER.x - 90, LADDER.bot); x.moveTo(LADDER.x + 70, LADDER.top); x.lineTo(LADDER.x + 90, LADDER.bot); x.stroke()
  x.lineWidth = 11
  for (let k = 0; k < 4; k++) { const yy = LADDER.top + 40 + k * 68, dx = 74 + k * 5; x.beginPath(); x.moveTo(LADDER.x - dx, yy); x.lineTo(LADDER.x + dx, yy); x.stroke() }
  x.restore(); void t
}
function noteCard(x, t) {
  const k = pop01(t, T.card, 0.35, 2.2)
  if (k <= 0.01) return
  panel(x, 540, 1060, 640, 230, { fill: CREAM, rad: 18, rot: -0.04, s: k })
  x.save(); x.translate(540, 1060); x.rotate(-0.04); x.scale(k, k)
  txt(x, 'had the best time.', 0, -38, { size: 52, italic: true, color: INK })
  txt(x, 'again friday?', 0, 34, { size: 52, italic: true, color: VRIM })
  x.restore()
  heart(x, 820, 960, 34 * k, { rot: 0.2 })
}

const EP = episode({
  sign: 'aries', dur: 24, ending: 'cut',
  enter: { kind: 'crash', at: -0.58, x: 540, y: 670, size: 440 },
  venus: [
    { t: 0, x: 540, y: 670, size: 440, mood: 'love', look: [0.3, 1] },
    { t: 1.4, mood: 'sly', look: [0.6, 1] },
    { t: 5.2, d: 0.6, x: 270, y: 700, size: 360, mood: 'sly', look: [1, 0.6] },
    { t: 10.4, mood: 'happy' },
    { t: 13.1, mood: 'love', look: [1, 1] },
    { t: 18.6, mood: 'happy' },
    { t: 22.4, mood: 'sly', look: [0.5, 0.2] },
  ],
  signK: [
    { t: 0, x: LADDER.x, y: 1330, size: 250, mood: 'wide', look: [-0.6, -1] },
    { t: 2.8, mood: 'happy', look: [-0.8, -0.6] },
    { t: 8.0, mood: 'neutral', look: [-1, -0.5] },
    { t: 13.4, mood: 'wide', look: [-1, -0.6], squash: 0.15, d: 0.2 },
    { t: 15.6, squash: 0, mood: 'neutral', look: [-0.3, -0.5] },
    { t: 18.8, mood: 'heart', look: [0, 0], d: 0.15 },
  ],
  pisK: [
    { t: 0, x: 230, y: 1540, size: 200, mood: 'wide', look: [0.6, -1], tears: 1 },
    { t: 6, mood: 'sparkle', tears: 2 },
    { t: 19.0, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 2.9, t1: 5.1, who: 'aries', text: 'I know what I *want!*', x: 640, y: 1790, tail: 60 },
    { t0: 5.5, t1: 7.8, who: 'venus', text: 'In astrology I rule *love*, darling.', x: 660, y: 470, maxW: 600, tail: -220 },
    { t0: 8.0, t1: 10.3, who: 'venus', text: 'You rule *starting* things.', x: 660, y: 470, maxW: 600, tail: -220 },
    { t0: 13.2, t1: 15.6, who: 'venus', text: 'Gorgeous. On date *thirty.*', x: 660, y: 470, maxW: 600, tail: -220 },
    { t0: 16.0, t1: 18.2, who: 'venus', text: 'Send *this* instead.', x: 660, y: 470, maxW: 600, tail: -220 },
    { t0: 19.4, t1: 22.3, who: 'pisces', text: 'date THIRTY? I’ll be *ready.*', x: 470, y: 1790, tail: -200 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'ARIES. Drop the | *banner*, darling.', top: 230, size: 104, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.1, from: 1.35, len: 0.4 }],
    ['screenShake', { at: 0.13, len: 0.5, amp: 26 }],
    ['caught', { at: 3.75, x: 800, y: 1182, r: 150, ry: 70, label: 'DATE THREE', arrow: 'tl', rec: false, out: [5.5, 5.7] }],
    ['slamTitle', { at: 10.5, text: 'Love language: | *acts of courage.*', top: 250, size: 96, out: [12.9, 13.1] }],
    ['notification', { at: T.notif, out: [21.7, 22.0], title: 'texts', body: 'them: *YES.* friday!', glyph: '♈' }],
    ['slamTitle', { at: T.last, text: 'Grand gesture? | *Date thirty*, darling.', top: 250, size: 96 }],
  ],
  back(x, t) { ladder(x, t) },
  mid(x, t) { banner(x, t) },
  front(x, t, S) {
    noteCard(x, t)
    if (t > T.heart) { for (let k = 0; k < 5; k++) { const ph = ((t - T.heart) * 0.6 + k / 5) % 1; heart(x, S.sign.x + Math.sin(k * 2.3 + t * 2) * 90, S.sign.y - 120 - ph * 360, 24 * (1 - ph * 0.4), { alpha: 1 - ph }) } }
    sparkleBurst(x, t, S.sign.x, S.sign.y, T.heart, { R: 260 })
    void lerp; void outK; void ROSE
  },
  cues: [
    ['whoosh', T.unroll, 0.35, 0.05], ['tick', T.unroll + 0.4, 0.05],
    ['whoosh', T.rollUp[0], 0.4, 0.05],
    ['pop', T.card, 1318.51, 0.05, 0], ['glitter', T.card, T.card + 0.4],
    ['bell', T.heart, 1760, 0.04, 1.0, 0], ['glitter', T.heart, T.heart + 0.6],
    ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
