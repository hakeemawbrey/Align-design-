// kpsue07: PLANET TALK: THE SUN, Ep 7 "Libra Loves Hiking (Libra Hates Hiking)" (23.8 s, star_talk post, house · Eb).
// Hard cut. Frame 0: the Sun mid-crash onto the hiking trail, Libra mid-stumble under a giant backpack, hook
// "LIBRA. You hate hiking."
//   3.0 Libra: my date loves hiking, so I LOVE hiking · 5.8 THINGS I "LOVE" NOW · 8.6 caught: BLISTERS.
//   10.8 Sun: be liked for what you ACTUALLY like · 14.4 "museums. and naps." (the backpack drops)
//   17.0 the confession text · 18.6 "wait. ME TOO." · 19.0 Pisces weeps · 21.6 "Real likes. Nap included."
import { episode, drawPanel, drawPhone, hearts, rr, key, INK } from '../../kpsue01/sunkit.js'
import { caught, caughtCues } from '../../hookkit.js'

const CAUGHT = { at: 8.6, x: 540, y: 1560, r: 190, ry: 70, out: [10.6, 10.9], label: 'BLISTERS.', arrow: 'bl', rec: false }
const LIKES = ['hiking', 'extra-spicy everything', '5 a.m. runs', 'their favourite band (never heard it)']
const MSGS = [{ at: 17.0, side: 'R', text: 'confession: I hate hiking. I like museums and naps' }, { at: 18.6, side: 'L', text: 'wait. ME TOO. I only said hiking for you' }]

function trail(x, t) {
  x.save()
  x.fillStyle = '#2b1d4a'; x.beginPath(); x.moveTo(-20, 1300); x.lineTo(180, 1060); x.lineTo(340, 1240); x.lineTo(560, 980); x.lineTo(800, 1250); x.lineTo(960, 1100); x.lineTo(1100, 1260); x.lineTo(1100, 1940); x.lineTo(-20, 1940); x.fill()
  x.fillStyle = '#efe6ff'; x.globalAlpha = 0.5; x.beginPath(); x.moveTo(560, 980); x.lineTo(610, 1036); x.lineTo(510, 1036); x.fill(); x.globalAlpha = 1
  x.fillStyle = '#3d2a52'; x.beginPath(); x.moveTo(-20, 1560); x.quadraticCurveTo(540, 1500, 1100, 1580); x.lineTo(1100, 1940); x.lineTo(-20, 1940); x.fill()
  x.fillStyle = '#5a4068'; for (let i = 0; i < 8; i++) { x.beginPath(); x.ellipse(80 + i * 140, 1640 + (i % 2) * 60, 26, 12, 0, 0, Math.PI * 2); x.fill() }
  // trail sign
  x.fillStyle = INK; x.fillRect(150, 1380, 16, 190); rr(x, 60, 1340, 220, 80, 10); x.fill(); x.fillStyle = '#c98a5a'; rr(x, 68, 1348, 204, 64, 8); x.fill()
  x.fillStyle = '#fff8ea'; x.font = '800 30px Inter'; x.textAlign = 'center'; x.fillText('SUMMIT 9 MI ↑', 170, 1392)
  x.restore()
}
function backpack(x, t) {
  // huge backpack behind Libra until 14.4, then it drops and rolls away
  const d = Math.max(0, t - 14.4)
  const bx = 540 + 150 + d * 500, by = 1340 + Math.min(1, d * 3) * 140, r = d * 6
  if (bx > 1300) return
  x.save(); x.translate(bx, by); x.rotate(0.2 + r)
  x.fillStyle = INK; rr(x, -115, -175, 230, 330, 50); x.fill()
  x.fillStyle = '#4f8a5a'; rr(x, -105, -165, 210, 310, 44); x.fill()
  x.fillStyle = '#3a6a44'; rr(x, -75, -30, 150, 110, 20); x.fill()
  x.fillStyle = '#e9b24a'; x.fillRect(-105, -110, 210, 16)
  x.fillStyle = '#c98a5a'; rr(x, -90, -220, 180, 60, 26); x.fill()
  x.restore()
}

const E = episode({
  sign: 'libra', duration: 23.8, ending: 'cut',
  entrance: { kind: 'crash', at: -0.6, x: 540, y: 560, size: 500 },
  hook: { text: 'LIBRA. You | *hate* hiking.', top: 860 },
  tint: '#7fb06a',
  sun: { mood: [[0, 'wide'], [0.6, 'sly'], [3.0, 'neutral'], [5.8, 'sly'], [8.6, 'wide'], [10.8, 'happy'], [14.4, 'love'], [16.9, 'happy'], [18.6, 'love'], [21.6, 'happy']], shades: [[0, true], [10.7, false]], hops: [10.8, 11.3, 18.7] },
  me: {
    base: { x: 540, y: 1420, size: 300 },
    pos: [[0, { x: 540 }]],
    mood: [[0, 'wide'], [1.2, 'squint'], [3.0, 'happy'], [5.8, 'sparkle'], [8.6, 'wide'], [10.8, 'neutral'], [14.4, 'sleepy'], [15.6, 'happy'], [18.6, 'heart'], [21.6, 'happy']],
    look: [[0, [0, -1]], [3.0, [0, 0]], [8.6, [0, 1]], [10.8, [0, -1]], [17.0, [0, -1]]],
    squash: [[-1, -0.12], [0, -0.12], [0.3, 0.12], [0.6, 0], [14.4, 0], [14.6, -0.1], [14.9, 0]],
    sweat: [[0, true], [14.6, false]],
    hops: [18.7, 19.0, 19.3],
  },
  bubbles: [
    { t0: 3.0, t1: 5.6, who: 'libra', text: 'My date loves hiking. So I *LOVE* hiking.' },
    { t0: 10.8, t1: 14.2, who: 'sun', text: 'LIBRA! Be liked for what you *ACTUALLY* like.', y: 1040, shake: 2 },
    { t0: 14.4, t1: 16.8, who: 'libra', text: '…I like museums. And *naps.*' },
    { t0: 19.6, t1: 21.4, who: 'pisces', text: 'TWO nap people. I’m *weeping.*' },
    { t0: 21.6, who: 'libra', text: 'Real likes. *Nap* included.', size: 54, x: 470, maxW: 700, tail: 60 },
  ],
  pisces: { at: 19.0, tears: [[19.0, 3]], hops: [19.6, 20.0] },
  fx: [caught(CAUGHT)], fxCues: caughtCues(CAUGHT),
  back: trail,
  mid(x, t) { backpack(x, t) },
  front(x, t) {
    const pv = (a, b) => Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - b) / 0.3)))
    const p1 = pv(5.8, 10.6)
    if (p1 > 0.01) drawPanel(x, t, { x: 540, y: 1030, w: 780, h: 380, title: 'THINGS I “LOVE” NOW', color: '#f7a8c0', pop: p1, rows: LIKES.map((text, i) => ({ at: 6.0 + i * 0.4, text })), size: 36 })
    // blister plasters on Libra's lower points
    if (t > 8.5 && t < 14.4) for (const s of [-1, 1]) { x.save(); x.translate(540 + s * 95, 1540); x.rotate(s * 0.5); x.fillStyle = INK; rr(x, -34, -14, 68, 28, 10); x.fill(); x.fillStyle = '#f2c79a'; rr(x, -30, -10, 60, 20, 8); x.fill(); x.restore() }
    const ph = pv(16.8, 21.4)
    if (ph > 0.01) drawPhone(x, t, { x: 540, y: 960, s: 0.95, pop: ph, title: 'Ren', msgs: MSGS, typing: [17.5, 18.6] })
    hearts(x, t, { at: 18.7, cx: 540, cy: 900, color: '#f7a8c0' })
    void key
  },
  cues: [...LIKES.map((_, i) => ['pop', +(6.0 + i * 0.4).toFixed(2), 880 + i * 70, 0.03, 0.2]), ['tom', 14.6, 70, { gain: 0.3, decay: 0.4 }], ['whoosh', 14.5, 0.6, 0.08], ['whoosh', 17.0, 0.3, 0.06], ['pop', 18.6, 1318.51, 0.05, 0.3], ['glitter', 18.6, 19.2]],
})
export const { DURATION, SCENES, CUES } = E
