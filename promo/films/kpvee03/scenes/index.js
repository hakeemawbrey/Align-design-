// kpvee03 · Planet Talk: Venus to Gemini — "Forty Memes, No Words" (20.5 s vertical, star_talk, loop). pop · G.
//   0.00  frame 0: Venus mid-zoom out of the phone screen, meme tiles flying past like confetti; Gemini mid-thumb on the
//         40th meme. Slam "GEMINI. That's *forty* memes."  0.3 whip zoom as Venus lands.
//   3.0   Venus: "Words of affirmation is a love language." / "Memes are a dialect, darling."
//   8.0   the draft: "i like you" typed… deleted. Venus: "Type it back. I believe in you." SENT (13.0).
//  13.8   typing… "FINALLY. me too."  Gemini heart-eyes; Pisces sobs "they used WORDS".
//  18.4   slam "Forty memes. *Three* words."  Loops back into frame 0.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { episode, panel, txt, rich, heart, sparkleBurst, phone, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE } from '../../kpvee01/venuskit.js'

const T = { type1: [8.0, 8.8], del: [9.4, 9.9], type2: [12.2, 12.8], sent: 13.0, dots: [13.8, 15.0], yes: 15.0, sob: 15.8, last: 18.4 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const MEMES = ['(meme) frog on a scooter', '(meme) cat in a tiny hat', 'lol', '(meme) dog in sunglasses', 'LMAO', '(meme) duck with a briefcase']
const MSGS = [
  ...MEMES.map((m, i) => ({ at: -2 + i * 0.36, side: 'R', text: m })),
  { at: 1.4, side: 'R', text: '(meme) penguin, confused' },
  { at: T.sent, side: 'R', text: 'i like you.', color: '#ff5c8e' },
  { at: T.yes, side: 'L', text: 'FINALLY. me too.' },
]
const PH = { cx: 540, cy: 1170, w: 540, h: 600 }

function confetti(x, t) {
  const a = 1 - prog(t, 0.6, 1.4)
  if (a <= 0) return
  for (let k = 0; k < 14; k++) {
    const ph = clamp((t + 0.9) / 2.2 + fr(k, 1) * 0.3)
    const ang = fr(k, 2) * Math.PI * 2
    const px = PH.cx + Math.cos(ang) * ph * 760, py = PH.cy - 120 + Math.sin(ang) * ph * 900
    x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate((fr(k, 3) - 0.5) * 3 + t * 2)
    x.fillStyle = INK; x.fillRect(-58, -48, 116, 96)
    x.fillStyle = ['#7fd0ff', '#ffd27a', '#b5f0a0', ROSE][k % 4]; x.fillRect(-52, -42, 104, 64)
    x.fillStyle = CREAM; x.fillRect(-52, 24, 104, 16)
    x.fillStyle = INK; x.font = "800 13px Inter"; x.textAlign = 'center'; x.fillText(['lol', 'me when', 'mood', 'same'][k % 4], 0, 36)
    x.restore()
  }
}
function draft(x, t) {
  const on = t > T.type1[0] - 0.3 && t < T.sent + 0.05
  if (!on) return
  const full = 'i like you.'
  let n = 0
  if (t < T.del[0]) n = Math.floor(full.length * prog(t, ...T.type1))
  else if (t < T.type2[0]) n = Math.floor(full.length * (1 - prog(t, ...T.del)))
  else n = Math.floor(full.length * prog(t, ...T.type2))
  const k = pop01(t, T.type1[0] - 0.3, 0.3)
  panel(x, PH.cx, PH.cy + PH.h / 2 + 70, 520, 84, { fill: '#2a2058', border: INK, rad: 40, s: k, shadow: false })
  txt(x, full.slice(0, n) + (Math.floor(t * 3) % 2 ? '|' : ' '), PH.cx - 230, PH.cy + PH.h / 2 + 72, { size: 38, color: BONE, align: 'left', weight: 700, s: 1, alpha: k })
  if (t > T.del[0] && t < T.del[1]) txt(x, '⌫ ⌫ ⌫', PH.cx + 180, PH.cy + PH.h / 2 + 70, { size: 34, color: ROSE, alpha: k })
}
function counter(x, t) {
  const k = pop01(t, 0.5, 0.3) * outK(t, [7.8, 8.0])
  if (k <= 0.01) return
  const n = Math.min(40, 37 + Math.floor(Math.max(0, t - 0.5) / 0.5))
  panel(x, 790, 800, 360, 90, { fill: '#2a1648', border: INK, rad: 18, s: k, rot: 0.04 })
  rich(x, `MEMES SENT: *${n}*`, 790, 802, { size: 38, color: BONE, accent: GOLD, s: k, rot: 0.04 })
}

const EP = episode({
  sign: 'gemini', dur: 20.5, ending: 'loop',
  enter: { kind: 'zoom', at: -0.52, x: 540, y: 620, size: 360 },
  venus: [
    { t: 0, x: 540, y: 620, size: 360, mood: 'wide', look: [0, 1] },
    { t: 1.6, d: 0.6, x: 280, y: 590, size: 320, mood: 'sly', look: [1, 1] },
    { t: 5.6, mood: 'happy' },
    { t: 9.6, mood: 'wide', d: 0.1 },
    { t: 10.2, mood: 'love', look: [0.8, 1] },
    { t: 15.1, mood: 'happy' },
    { t: 19.8, d: 0.5, x: 540, y: 620, size: 360, mood: 'wide', look: [0, 1] },
  ],
  signK: [
    { t: 0, x: 810, y: 1590, size: 230, mood: 'squint', look: [-1, -1] },
    { t: 3.0, mood: 'neutral', look: [-1, -1] },
    { t: 8.0, mood: 'happy', look: [-1, -0.6] },
    { t: 9.4, mood: 'wide', look: [-1, -0.6], d: 0.1 },
    { t: 12.2, mood: 'squint', look: [-1, -0.6] },
    { t: 13.0, mood: 'wide', squash: 0.15, d: 0.1 },
    { t: 13.5, squash: 0 },
    { t: 15.1, mood: 'heart', look: [0, 0], d: 0.1 },
    { t: 19.8, mood: 'squint', look: [-1, -1] },
  ],
  pisK: [
    { t: 0, x: 220, y: 1600, size: 175, mood: 'wide', look: [1, -1], tears: 1 },
    { t: 13.1, mood: 'wide', tears: 2 },
    { t: 15.8, mood: 'happy', tears: 3, d: 0.1 },
    { t: 19.8, mood: 'wide', tears: 1 },
  ],
  bubbles: [
    { t0: 3.0, t1: 5.4, who: 'venus', text: 'Words of affirmation is a *love language.*', x: 660, y: 420, maxW: 560, tail: -200 },
    { t0: 5.6, t1: 7.8, who: 'venus', text: '*Memes* are a dialect, darling.', x: 660, y: 420, maxW: 560, tail: -200 },
    { t0: 10.2, t1: 12.6, who: 'venus', text: 'Type it back. *I* believe in you.', x: 660, y: 420, maxW: 560, tail: -200 },
    { t0: 15.8, t1: 18.1, who: 'pisces', text: 'they used *WORDS*', x: 420, y: 1790, tail: -160 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'GEMINI. That’s | *forty* memes.', top: 210, size: 110, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.32, from: 1.4, len: 0.4 }],
    ['screenShake', { at: T.sent, len: 0.35, amp: 18 }],
    ['caught', { at: T.del[0] + 0.05, x: 540, y: PH.cy + PH.h / 2 + 70, r: 280, ry: 70, label: 'DELETED IT', arrow: 'tr', rec: false, out: [10.6, 10.8] }],
    ['slamTitle', { at: T.last, text: 'Forty memes. | *Three* words.', top: 230, size: 108, out: [20.0, 20.1] }],
  ],
  mid(x, t) {
    confetti(x, t)
    phone(x, t, { ...PH, title: '♊︎ → the crush', msgs: MSGS, typing: T.dots, font: 32 })
    draft(x, t); counter(x, t)
    if (t > T.sent && t < T.sent + 1.2) txt(x, 'SENT', PH.cx, PH.cy - 60, { size: 140, color: ROSE, stroke: INK, sw: 14, s: pop01(t, T.sent, 0.25, 3), alpha: outK(t, [T.sent + 0.9, T.sent + 1.2]), rot: -0.12 })
  },
  front(x, t, S) {
    sparkleBurst(x, t, S.sign.x, S.sign.y, T.yes + 0.1, { R: 240 })
    if (t > T.yes && t < 19.6) for (let k = 0; k < 5; k++) { const ph = ((t - T.yes) * 0.6 + k / 5) % 1; heart(x, S.sign.x + Math.sin(k * 2.3 + t * 2) * 80, S.sign.y - 110 - ph * 300, 22 * (1 - ph * 0.4), { alpha: (1 - ph) * outK(t, [19.2, 19.6]) }) }
    void lerp; void ease
  },
  cues: [
    ...[0.5, 1.0, 1.5].map(a => ['pop', a, 1318.51, 0.04, 0.3]),
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.type1[0] + i * 0.08).toFixed(2), 0.03]),
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(T.del[0] + i * 0.08).toFixed(2), 0.035]),
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.type2[0] + i * 0.06).toFixed(2), 0.03]),
    ['whoosh', T.sent - 0.1, 0.35, 0.06], ['pop', T.sent, 1567.98, 0.06, 0], ['boom', T.sent, 0.2],
    ['tick', T.dots[0], 0.02], ['tick', T.dots[0] + 0.4, 0.02], ['tick', T.dots[0] + 0.8, 0.02],
    ['pop', T.yes, 880, 0.06, -0.2], ['bell', T.yes + 0.05, 1760, 0.04, 1.0, 0], ['glitter', T.yes, T.yes + 0.6],
    ...sobCues(T.sob, 4),
  ],
})
export const { DURATION, SCENES, CUES } = EP
