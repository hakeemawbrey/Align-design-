// kpvee12 · Planet Talk: Venus to Pisces — "The Love Letter Home" (28.2 s vertical, star_advice, hard cut). dreamy · E.
//   0.00  frame 0: Venus mid-surf-landing on a giant pink seashell, a spray of glitter frozen mid-air; Pisces mid-sob,
//         writing its 30th letter to everyone else. Slam "PISCES. You're on the list *too.*"
//   2.9   record scratch + freeze: "letters written today: thirty. to: everyone else."
//   4.8   the list: the barista · a cloud I liked · my neighbour's cat · everyone I've ever met. "Everyone deserves a
//         letter!"  7.4 Venus: "In astrology I'm exalted in you, darling. So let me be blunt. You go on the list." (+ ME)
//  14.2   "Dear me, / you love so big. / save some for you."  Pisces cries (happy). Venus seals it with a glitter heart;
//         the letter flies into Pisces's own mailbox: 1 NEW LETTER · from: you. "IT'S FOR ME."
//  25.8   slam "Return address: *you*, darling." Hard cut.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { episode, panel, txt, rich, heart, sparkleBurst, pop01, outK, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../../kpvee01/venuskit.js'

const T = { rec: 2.9, list: [4.8, 13.9], plusMe: 13.0, letter: 14.2, lines: [14.6, 15.6, 16.8], seal: 21.0, fly: [21.6, 22.6], flag: 22.7, open: 23.2, sob: 23.4, last: 25.8 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const MAIL = { x: 880, y: 1470 }

function shell(x, t, V) {
  x.save(); x.translate(V.x, V.y + V.size * 0.5 + 10); x.rotate(Math.sin(t * 1.4) * 0.03)
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, 40); x.arc(0, 40, 250, Math.PI * 1.05, Math.PI * 1.95); x.closePath(); x.fill()
  for (let k = 0; k < 9; k++) { const a0 = Math.PI * 1.08 + k * (Math.PI * 0.84 / 9), a1 = a0 + Math.PI * 0.84 / 9; x.fillStyle = k % 2 ? '#ffb3c8' : '#ff8fb1'; x.beginPath(); x.moveTo(0, 40); x.arc(0, 40, 238, a0, a1); x.closePath(); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 50, 26, 0, 0, 7); x.fill(); x.fillStyle = '#ffd0de'; x.beginPath(); x.ellipse(0, 40, 42, 20, 0, 0, 7); x.fill()
  x.restore()
  // the frozen glitter spray (frame 0)
  const a = 1 - prog(t, 0.6, 1.6)
  if (a > 0) for (let k = 0; k < 22; k++) {
    const ph = clamp((t + 0.5) / 2), ang = Math.PI * (1.05 + fr(k, 1) * 0.9), R = 200 + ph * (200 + fr(k, 2) * 380)
    x.save(); x.globalAlpha = a; heart(x, V.x + Math.cos(ang) * R + 260 * (1 - ph), V.y + V.size * 0.5 + Math.sin(ang) * R * 0.7, 10 + fr(k, 3) * 12, { color: k % 3 ? ROSE : '#8fe3ff' }); x.restore()
  }
}
function envelopes(x, t) {
  const a = outK(t, [T.list[0] - 0.3, T.list[0]])
  if (a <= 0.01) return
  for (let k = 0; k < 7; k++) {
    const ex = 180 + k * 120 + (k % 2) * 20, ey = 1590 - (k % 3) * 30
    x.save(); x.globalAlpha *= a; x.translate(ex, ey); x.rotate((fr(k, 4) - 0.5) * 0.6)
    x.fillStyle = INK; x.fillRect(-56, -36, 112, 72); x.fillStyle = CREAM; x.fillRect(-52, -32, 104, 64)
    x.strokeStyle = 'rgba(27,18,54,0.5)'; x.lineWidth = 3; x.beginPath(); x.moveTo(-52, -32); x.lineTo(0, 6); x.lineTo(52, -32); x.stroke()
    heart(x, 0, 4, 9, { color: ROSE }); x.restore()
  }
}
function list(x, t) {
  const k = pop01(t, T.list[0], 0.4, 1.8) * outK(t, [T.list[1], T.list[1] + 0.25])
  if (k <= 0.01) return
  const un = ease.outCubic(prog(t, T.list[0], T.list[0] + 0.8))
  panel(x, 540, 1040, 640, 380 * un + 20, { fill: CREAM, rad: 12, s: k, rot: 0.02 })
  x.save(); x.translate(540, 1040); x.rotate(0.02); x.scale(k, k)
  x.beginPath(); x.rect(-320, -200 * un, 640, 400 * un); x.clip()
  txt(x, 'LETTERS TO WRITE', 0, -150, { size: 30, color: VRIM })
  ;['the barista', 'a cloud I liked', 'my neighbour’s cat', 'everyone I’ve ever met'].forEach((l, i) => txt(x, '♡ ' + l, -260, -86 + i * 56, { size: 40, italic: true, align: 'left', color: INK }))
  if (t > T.plusMe) { const pk = pop01(t, T.plusMe, 0.3, 3); txt(x, '+ ME', -260, 146, { size: 58, color: '#d8324a', align: 'left', s: pk, rot: -0.05 }) }
  x.restore()
}
function letter(x, t) {
  const k = pop01(t, T.letter, 0.4, 1.8)
  if (k <= 0.01) return
  const fly = ease.inOutCubic(prog(t, ...T.fly))
  if (fly >= 1) return
  const sc = lerp(1, 0.18, fly), lx = lerp(540, MAIL.x, fly), ly = lerp(1030, MAIL.y - 40, fly) - Math.sin(fly * Math.PI) * 300
  x.save(); x.translate(lx, ly); x.rotate(-0.02 + fly * 6); x.scale(k * sc, k * sc)
  panel(x, 0, 0, 620, 360, { fill: '#fff4f7', rad: 10 })
  ;['Dear me,', 'you love so big.', 'save some for *you.*'].forEach((l, i) => {
    const w = prog(t, T.lines[i], T.lines[i] + 0.8)
    if (w <= 0) return
    x.save(); x.beginPath(); x.rect(-280, -140 + i * 90, 560 * w, 90); x.clip()
    rich(x, l, i === 0 ? -150 : 0, -95 + i * 90, { size: 54, color: '#2c2a7a', accent: '#d8324a' })
    x.restore()
  })
  // the seal
  const sk = pop01(t, T.seal, 0.3, 3)
  if (sk > 0.01) { heart(x, 262, 150, 50 * sk, { color: '#ff5c8e' }); }
  x.restore()
}
function mailbox(x, t) {
  const k = pop01(t, T.fly[0], 0.4, 2)
  if (k <= 0.01) return
  x.save(); x.translate(MAIL.x, MAIL.y); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 0, 28, 170)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-104, -120, 208, 130, [80, 80, 10, 10]); x.fill()
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.roundRect(-96, -112, 192, 114, [74, 74, 6, 6]); x.fill()
  const up = ease.outBack(prog(t, T.flag, T.flag + 0.3))
  x.save(); x.translate(100, -60); x.rotate(-up * 1.5); x.fillStyle = INK; x.fillRect(-6, -80, 14, 84); x.fillStyle = '#ff5b6b'; x.fillRect(-4, -78, 50, 34); x.restore()
  x.restore()
  if (t > T.flag) {
    const nk = pop01(t, T.flag, 0.3, 2.4) * outK(t, [25.6, 25.8])
    panel(x, MAIL.x - 90, MAIL.y - 250, 330, 100, { fill: '#2a1648', rad: 18, s: nk })
    txt(x, '1 NEW LETTER', MAIL.x - 90, MAIL.y - 268, { size: 30, color: GOLD, s: nk })
    rich(x, 'from: *you*', MAIL.x - 90, MAIL.y - 228, { size: 30, color: BONE, accent: ROSE, s: nk })
  }
}

const EP = episode({
  sign: 'pisces', dur: 28.2, ending: 'cut',
  enter: { kind: 'slide', at: -0.4, x: 540, y: 560, size: 360 },
  venus: [
    { t: 0, x: 540, y: 560, size: 360, mood: 'happy', look: [0, 1] },
    { t: 1.5, mood: 'sly', look: [0, 1] },
    { t: 7.4, mood: 'love' },
    { t: 10.2, mood: 'sly' },
    { t: 12.0, mood: 'happy' },
    { t: 18.4, mood: 'cry', tears: 1 },
    { t: 21.0, mood: 'love', tears: 0 },
    { t: 25.6, mood: 'proud' },
  ],
  signK: [
    { t: 0, x: 420, y: 1400, size: 290, mood: 'squint', look: [0.6, 1], tears: 3 },
    { t: 1.2, mood: 'wide', look: [0.4, -1], tears: 2 },
    { t: 5.0, mood: 'sparkle', look: [0, -0.4], tears: 1 },
    { t: 12.2, mood: 'wide', look: [0.4, -1], tears: 2 },
    { t: 14.6, mood: 'neutral', look: [0.4, -1], tears: 2 },
    { t: 18.2, mood: 'happy', tears: 3 },
    { t: 22.0, d: 0.6, x: 560, mood: 'wide', look: [1, 0], tears: 2 },
    { t: 23.3, mood: 'sparkle', tears: 3 },
  ],
  bubbles: [
    { t0: 5.0, t1: 7.2, who: 'pisces', text: 'Everyone deserves a *letter!*', x: 480, y: 1780 },
    { t0: 7.4, t1: 10.0, who: 'venus', text: 'In astrology I’m exalted in *you*, darling.', y: 270 },
    { t0: 10.2, t1: 11.8, who: 'venus', text: 'So let me be *blunt.*', y: 270 },
    { t0: 12.0, t1: 13.8, who: 'venus', text: '*You* go on the list.', y: 270, size: 60 },
    { t0: 18.4, t1: 20.6, who: 'pisces', text: 'I’ve never been *written to* by me', x: 480, y: 1780 },
    { t0: 23.4, t1: 25.5, who: 'pisces', text: 'IT’S *FOR ME*', x: 480, y: 1780, size: 62, shake: 3 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'PISCES. You’re on | the list *too.*', top: 160, size: 106, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.33, from: 1.35, len: 0.4 }],
    ['screenShake', { at: 0.35, len: 0.5, amp: 24 }],
    ['recordScratch', { at: T.rec, len: 1.6, caption: 'letters written today: *thirty.*', sub: 'to: everyone else', top: 1060 }],
    ['screenShake', { at: T.seal, len: 0.3, amp: 12 }],
    ['slamTitle', { at: T.last, text: 'Return address: | *you*, darling.', top: 160, size: 108 }],
  ],
  back(x, t, S) { shell(x, t, S.venus); envelopes(x, t) },
  mid(x, t) { list(x, t) },
  front(x, t, S) {
    letter(x, t); mailbox(x, t)
    sparkleBurst(x, t, 540, 1030, T.plusMe + 0.1, { R: 160, n: 8 })
    sparkleBurst(x, t, 760, 1150, T.seal, { R: 220 })
    sparkleBurst(x, t, MAIL.x, MAIL.y - 60, T.fly[1], { R: 200 })
    if (t > T.open && t < 28) for (let k = 0; k < 5; k++) { const ph = ((t - T.open) * 0.6 + k / 5) % 1; heart(x, S.sign.x + Math.sin(k * 2.3 + t * 2) * 110, S.sign.y - 120 - ph * 340, 22 * (1 - ph * 0.4), { alpha: 1 - ph }) }
  },
  cues: [
    ['whoosh', T.list[0], 0.4, 0.05], ['pop', T.plusMe, 1318.51, 0.06, 0], ['glitter', T.plusMe, T.plusMe + 0.4],
    ['whoosh', T.letter, 0.35, 0.05], ...T.lines.flatMap(l => Array.from({ length: 8 }, (_, i) => ['tick', +(l + i * 0.1).toFixed(2), 0.012])),
    ['boom', T.seal, 0.22], ['pop', T.seal, 1567.98, 0.05, 0], ['glitter', T.seal, T.seal + 0.5],
    ['whoosh', T.fly[0], 0.8, 0.06], ['pop', T.fly[1], 1174.66, 0.05, 0.4], ['bell', T.flag, 1760, 0.05, 1.2, 0.4],
    ...sobCues(18.3, 4), ...sobCues(T.sob, 5),
  ],
})
export const { DURATION, SCENES, CUES } = EP
