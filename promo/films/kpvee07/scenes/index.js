// kpvee07 · Planet Talk: Venus to Libra — "Who Are You, Darling?" (78.4 s vertical, long, star_talk, hard cut).
// cinematic · Bb. Venus's home sign: four chapters, the promised payoff ("wait for the pineapple"), a beat every ~8 s.
//   0.00  frame 0: Venus spinning in backwards as a rose-gold blur, the menu knocked out of Libra's hands mid-air; the
//         date mid-"so what do YOU like?". Slam "LIBRA. Who *are* you, darling?"  2.9 "Wait for the *pineapple.*"
//   5.4   ch1 THE ECHO: the date loves jazz → "Love jazz! Same!"; hates mushrooms → "Ugh. Mushrooms."; morning person?
//         → "Huge morning person." (Libra yawning). AGREED counter → 9. "…so what do you like?" Loading bar
//         "finding my opinion…" → "Error: opinion not found". "…whatever you like?"
//  24.8   ch2 THE INTERVENTION: Venus pauses the date (it greys out). "In astrology I rule you, darling. Harmony is your
//         gift. Copying isn't." Libra: "But if I disagree… they'll leave." "A different opinion isn't a breakup."
//  38.8   ch3 THE BACKWARDS SPIN: true facts: Venus spins the opposite way to most planets; its day is longer than its
//         year. "Weird is fine, darling." Flash cards: I actually like… rain. I actually don't like… jazz.
//  57.8   ch4 THE CONFESSION: the date unpauses. "What should we order?" 3-2-1… "I love pineapple on pizza." Record
//         scratch, silence… "WAIT. Me too." Pisces sobs. The pizza lands: ORDERED.  75.4 last line. Hard cut.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, track, panel, txt, rich, heart, sparkleBurst, pop01, outK, win, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../../kpvee01/venuskit.js'

const C = { ch1: 5.4, ch2: 24.8, ch3: 38.8, ch4: 57.8 }
const T = { pause: [24.8, 57.8], spin: [39.0, 40.4], cards: [48.4, 51.0, 54.0], count: 60.8, conf: 62.9, rec: 65.3, yes: 66.9, sob: 69.0, pizza: 71.6, last: 75.4 }
const DATE = { x: 790, y: 1360, s: 250, col: '#ffb36b' }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
const DMOOD = [{ t: 0, mood: 'happy', look: [-1, 0] }, { t: 5.6, mood: 'happy' }, { t: 9.2, mood: 'squint' }, { t: 12.6, mood: 'neutral' }, { t: 16.8, mood: 'wide', look: [-1, 0] }, { t: 22.6, mood: 'neutral', look: [-1, 0] },
  { t: 58.6, mood: 'happy', look: [-1, 0] }, { t: 63.3, mood: 'wide' }, { t: 66.9, mood: 'heart', look: [-1, 0] }]
const AGREE = [7.6, 11.2, 14.1, 15.5, 15.75, 16.0, 16.2, 16.4, 16.55]
const dHops = [5.7, 6.2, 9.3, 9.8, 12.7, 16.9, 17.4, 58.7, 59.2, 66.95, 67.3, 67.6]

function menu(x, t) {
  const f = prog(t, -0.7, 1.6)
  if (f >= 1) return
  const mx = lerp(330, 120, f) , my = 1180 - Math.sin(f * Math.PI) * 520 + f * 500, rot = -0.4 + f * 6
  x.save(); x.translate(mx, my); x.rotate(rot); x.globalAlpha *= 1 - prog(t, 1.2, 1.6)
  panel(x, 0, 0, 180, 250, { fill: '#7a2a3a', rad: 10, shadow: false })
  txt(x, 'MENU', 0, -70, { size: 34, color: GOLD })
  for (let j = 0; j < 4; j++) { x.fillStyle = 'rgba(255,240,220,0.6)'; x.fillRect(-60, -20 + j * 36, 120, 8) }
  x.restore()
}
function table(x, t) {
  x.fillStyle = INK; x.fillRect(210, 1520, 26, 160); x.fillRect(844, 1520, 26, 160)
  x.fillStyle = INK; x.beginPath(); x.roundRect(170, 1478, 740, 64, 16); x.fill()
  x.fillStyle = '#f4e8cc'; x.beginPath(); x.roundRect(178, 1484, 724, 50, 12); x.fill()
  x.fillStyle = '#d8324a'; x.fillRect(178, 1520, 724, 14)
  // candle (cleared away when the pizza lands)
  x.save(); x.globalAlpha *= outK(t, [T.pizza - 0.3, T.pizza])
  x.fillStyle = INK; x.fillRect(527, 1404, 26, 80); x.fillStyle = CREAM; x.fillRect(531, 1408, 18, 72)
  x.fillStyle = 'rgba(255,214,120,0.35)'; x.beginPath(); x.arc(540, 1390, 34, 0, 7); x.fill()
  x.fillStyle = '#ffd27a'; x.beginPath(); x.ellipse(540, 1390 + Math.sin(t * 9) * 2, 9, 16, 0, 0, 7); x.fill()
  x.restore()
  // pizza payoff
  const pk = pop01(t, T.pizza, 0.4, 2.4)
  if (pk > 0.01) {
    const py = lerp(900, 1470, ease.outCubic(prog(t, T.pizza, T.pizza + 0.35)))
    x.save(); x.translate(545, py); x.scale(pk, pk * 0.42)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill(); x.fillStyle = '#e8a64a'; x.beginPath(); x.arc(0, 0, 122, 0, 7); x.fill()
    x.fillStyle = '#d84a32'; x.beginPath(); x.arc(0, 0, 104, 0, 7); x.fill(); x.fillStyle = '#ffe08a'; x.beginPath(); x.arc(0, 0, 96, 0, 7); x.fill()
    for (let k = 0; k < 9; k++) { const a = k * 0.7, r = 30 + (k % 3) * 26; x.fillStyle = INK; x.fillRect(Math.cos(a) * r - 13, Math.sin(a) * r - 13, 26, 26); x.fillStyle = '#ffd23a'; x.fillRect(Math.cos(a) * r - 10, Math.sin(a) * r - 10, 20, 20) }
    x.restore()
    if (t > T.pizza + 0.5) txt(x, 'ORDERED', 545, 1370, { size: 58, color: ROSE, stroke: INK, sw: 10, rot: -0.14, s: pop01(t, T.pizza + 0.5, 0.25, 3), alpha: outK(t, [75.0, 75.3]) })
  }
}
function counter(x, t) {
  const k = pop01(t, AGREE[0], 0.3) * outK(t, [C.ch2 - 0.4, C.ch2 - 0.2])
  if (k <= 0.01) return
  const n = AGREE.filter(a => t >= a).length
  panel(x, 540, 925, 520, 92, { fill: '#2a1648', rad: 18, s: k, rot: -0.03 })
  rich(x, `AGREED WITH THEM: *${n}*`, 540, 927, { size: 38, color: BONE, accent: GOLD, s: k, rot: -0.03 })
}
function flashCard(x, t, at, text, done) {
  const k = pop01(t, at, 0.35, 2.2) * outK(t, [at + 2.3, at + 2.5])
  if (k <= 0.01) return
  panel(x, 540, 985, 640, 150, { fill: CREAM, rad: 16, s: k, rot: 0.03 })
  rich(x, text, 540, 985, { size: 46, color: INK, accent: VRIM, s: k, rot: 0.03 })
  if (done && t > at + 1.4) txt(x, '✓', 830, 940, { size: 80, color: '#2a9a5a', stroke: INK, sw: 8, s: pop01(t, at + 1.4, 0.25, 3) })
}

const EP = episode({
  sign: 'libra', dur: 78.4, ending: 'cut',
  enter: { kind: 'spin', at: -0.62, x: 540, y: 600, size: 400 },
  venus: [
    { t: 0, x: 540, y: 600, size: 400, mood: 'wide', look: [-0.4, 1] },
    { t: 1.6, mood: 'sly', look: [-0.4, 1] },
    { t: 5.6, d: 0.6, x: 540, y: 560, size: 330, mood: 'sly', look: [0, 1] },
    { t: 14.0, mood: 'wide' },
    { t: 19.0, mood: 'sad' },
    { t: 25.8, d: 0.8, x: 540, y: 800, size: 380, mood: 'love', look: [-0.6, 1] },
    { t: 31.2, mood: 'sly' },
    { t: 36.0, mood: 'love' },
    { t: 41.0, mood: 'happy', look: [0, 0.6] },
    { t: 48.2, mood: 'sly', look: [-0.6, 1] },
    { t: 50.8, mood: 'happy' },
    { t: 58.4, d: 0.8, x: 540, y: 560, size: 320, mood: 'sly', look: [0, 1] },
    { t: 63.3, mood: 'wide' },
    { t: 67.0, mood: 'love' },
    { t: 72.6, mood: 'proud' },
    { t: 75.2, mood: 'love', look: [-0.3, 1] },
  ],
  signK: [
    { t: 0, x: 300, y: 1360, size: 260, mood: 'wide', look: [1, -1], squash: 0.12 },
    { t: 1.0, mood: 'neutral', look: [1, 0], squash: 0 },
    { t: 7.4, mood: 'happy', look: [1, 0] },
    { t: 13.8, mood: 'sleepy' },
    { t: 15.4, mood: 'happy' },
    { t: 16.9, mood: 'wide', look: [1, 0] },
    { t: 22.4, mood: 'squint' },
    { t: 25.9, mood: 'wide', look: [0.5, -1] },
    { t: 33.2, mood: 'squint', look: [0.5, -1] },
    { t: 38.0, mood: 'neutral', look: [0.5, -1] },
    { t: 48.8, mood: 'happy', look: [0.5, -1] },
    { t: 51.4, mood: 'wink' },
    { t: 54.4, mood: 'wide' },
    { t: 58.6, mood: 'neutral', look: [1, 0] },
    { t: 60.8, mood: 'squint', look: [1, 0] },
    { t: 62.9, mood: 'wide', look: [1, 0], squash: 0.12, d: 0.15 },
    { t: 63.6, squash: 0 },
    { t: 66.9, mood: 'heart', look: [1, 0], d: 0.1 },
    { t: 72.0, mood: 'happy' },
  ],
  pisK: [
    { t: 0, x: 960, y: 1720, size: 150, mood: 'wide', look: [-1, -1], tears: 1 },
    { t: 17.0, tears: 2 },
    { t: 34.0, mood: 'wide', tears: 3 },
    { t: 38.4, mood: 'sparkle', tears: 1 },
    { t: 65.4, mood: 'wide', tears: 2 },
    { t: 69.0, d: 0.5, x: 900, y: 1640, size: 200, mood: 'happy', tears: 3 },
  ],
  bubbles: [
    { t0: -0.9, t1: 2.6, who: 'the date', text: 'so what do *YOU* like?', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col, size: 46 },
    { t0: 5.6, t1: 7.2, who: 'the date', text: 'I love *jazz.*', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col },
    { t0: 7.3, t1: 9.0, who: 'libra', text: 'Love jazz! *Same!*', x: 380, y: 1760, tail: -60 },
    { t0: 9.2, t1: 10.8, who: 'the date', text: 'I hate *mushrooms.*', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col },
    { t0: 10.9, t1: 12.4, who: 'libra', text: 'Ugh. *Mushrooms.*', x: 380, y: 1760, tail: -60 },
    { t0: 12.6, t1: 13.8, who: 'the date', text: 'Morning person?', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col },
    { t0: 13.9, t1: 15.4, who: 'libra', text: '*Huge* morning person.', x: 380, y: 1760, tail: -60 },
    { t0: 16.8, t1: 19.0, who: 'the date', text: '…so what do *you* like?', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col },
    { t0: 22.4, t1: 24.4, who: 'libra', text: '…whatever *you* like?', x: 380, y: 1760, tail: -60 },
    { t0: 26.4, t1: 28.8, who: 'venus', text: 'In astrology I rule *you*, darling.', y: 470 },
    { t0: 29.0, t1: 31.0, who: 'venus', text: 'Harmony is your *gift.*', y: 470 },
    { t0: 31.2, t1: 33.0, who: 'venus', text: '*Copying* isn’t.', y: 470, size: 62 },
    { t0: 33.2, t1: 35.8, who: 'libra', text: 'But if I disagree… they’ll *leave.*', x: 420, y: 1760, tail: -100 },
    { t0: 36.0, t1: 38.4, who: 'venus', text: 'A different opinion isn’t a *breakup.*', y: 470 },
    { t0: 40.6, t1: 43.2, who: 'venus', text: 'I spin the *opposite* way to most planets.', y: 470 },
    { t0: 43.4, t1: 45.8, who: 'venus', text: 'And my day is longer than my *year.*', y: 470 },
    { t0: 46.0, t1: 48.0, who: 'venus', text: 'Weird is *fine*, darling.', y: 470 },
    { t0: 48.8, t1: 50.7, who: 'libra', text: 'I actually like… *rain.*', x: 400, y: 1760, tail: -80 },
    { t0: 51.4, t1: 53.6, who: 'libra', text: '…*jazz.* Sorry, jazz.', x: 400, y: 1760, tail: -80 },
    { t0: 54.4, t1: 56.6, who: 'libra', text: 'I’ll tell you *at dinner.*', x: 400, y: 1760, tail: -80 },
    { t0: 58.6, t1: 60.6, who: 'the date', text: 'So! What should we *order?*', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col },
    { t0: 62.9, t1: 65.2, who: 'libra', text: 'I love *pineapple* on pizza.', x: 420, y: 1760, tail: -100, size: 54 },
    { t0: 66.9, t1: 68.8, who: 'the date', text: 'WAIT. *Me too.*', x: 720, y: 1110, tail: 80, tailUp: false, color: DATE.col, size: 60, shake: 3 },
    { t0: 69.0, t1: 71.4, who: 'pisces', text: 'PINEAPPLE *UNITES* US', x: 560, y: 1800, tail: 300 },
    { t0: 72.6, t1: 75.0, who: 'venus', text: 'Look at that. A *real* opinion.', y: 400 },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'LIBRA. Who *are* | you, darling?', top: 150, size: 106, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.4, from: 1.4, len: 0.4 }],
    ['screenShake', { at: 0.42, len: 0.5, amp: 24 }],
    ['slamTitle', { at: 2.9, text: 'Wait for the | *pineapple.*', top: 170, size: 104, out: [5.0, 5.2], accentColor: ROSE }],
    ['chapter', { at: C.ch1, out: [C.ch2 - 0.3, C.ch2 - 0.1], n: 1, title: 'THE ECHO', y: 150 }],
    ['loadingBar', { at: 19.2, len: 3.0, label: 'finding my opinion…', stallAt: 12, error: 'Error: opinion not found', y: 930 }],
    ['chapter', { at: C.ch2, out: [C.ch3 - 0.3, C.ch3 - 0.1], n: 2, title: 'THE INTERVENTION', y: 150 }],
    ['slamTitle', { at: 24.9, text: '*PAUSED.*', top: 1000, size: 120, out: [26.2, 26.4], accentColor: ROSE }],
    ['chapter', { at: C.ch3, out: [C.ch4 - 0.3, C.ch4 - 0.1], n: 3, title: 'THE BACKWARDS SPIN', y: 150 }],
    ['slamTitle', { at: T.spin[0] + 0.1, text: 'Watch me spin | the *wrong* way.', top: 270, size: 92, out: [40.3, 40.5], accentColor: ROSE }],
    ['chapter', { at: C.ch4, out: [75.1, 75.3], n: 4, title: 'THE CONFESSION', y: 150 }],
    ['countdown', { at: T.count, from: 3, gap: 0.5, go: null, y: 960 }],
    ['recordScratch', { at: T.rec, len: 1.4, caption: 'the date has *stopped chewing.*', sub: 'silence.', top: 960 }],
    ['screenShake', { at: T.yes, len: 0.5, amp: 26 }],
    ['slamTitle', { at: T.last, text: 'Your opinion is | the *cute* part.', top: 170, size: 104 }],
  ],
  back(x, t) { table(x, t) },
  mid(x, t, S) {
    menu(x, t)
    // the date (greyed and frozen while Venus pauses the room)
    const paused = t > T.pause[0] && t < T.pause[1]
    const tt = paused ? T.pause[0] : t
    const dm = track(DMOOD, tt)
    const unp = ease.outCubic(prog(t, T.pause[1], T.pause[1] + 0.4))
    x.save(); if (paused) x.filter = 'grayscale(1) brightness(0.8)'
    drawStarChar(x, DATE.x, DATE.y, DATE.s, tt, { color: DATE.col, mood: dm.mood, look: dm.look, hops: dHops, seed: 21, squash: unp > 0 && unp < 1 ? 0.1 * Math.sin(unp * Math.PI) : 0 })
    x.restore()
    if (paused) txt(x, '⏸', DATE.x, DATE.y - 190, { size: 70, color: BONE, stroke: INK, sw: 8, alpha: 0.9 })
    counter(x, t)
    flashCard(x, t, T.cards[0], 'I actually like… *___*', true)
    flashCard(x, t, T.cards[1], 'I actually don’t like… *___*', true)
    flashCard(x, t, T.cards[2], 'My order is… *___*', false)
    if (t > T.spin[0] && t < T.spin[1] + 0.3) { const a = win(t, T.spin[0], T.spin[1]); x.save(); x.globalAlpha *= a; x.strokeStyle = ROSE; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.arc(S.venus.x, S.venus.y, S.venus.size * 0.64, -0.4 - t * 3, -0.4 - t * 3 - 4.2, true); x.stroke(); x.restore() }
  },
  front(x, t, S) {
    sparkleBurst(x, t, DATE.x, DATE.y, T.yes, { R: 280 })
    sparkleBurst(x, t, S.sign.x, S.sign.y, T.yes + 0.1, { R: 260 })
    if (t > T.yes && t < 75.2) for (let k = 0; k < 6; k++) { const ph = ((t - T.yes) * 0.5 + k / 6) % 1; heart(x, 540 + Math.sin(k * 2.1 + t) * 260, 1300 - ph * 400, 22 * (1 - ph * 0.4), { alpha: (1 - ph) * outK(t, [74.8, 75.2]) }) }
    void clamp; void fr
  },
  cues: [
    ['whoosh', -0.1 + 0.2, 0.4, 0.04],
    ...AGREE.map((a, i) => ['pop', a, 880 * Math.pow(2, i / 12), 0.045, 0]),
    ['tapeStop', T.pause[0], 0.5], ['tick', T.pause[0] + 0.05, 0.06],
    ['riser', T.spin[0], T.spin[1], 0.06], ['whoosh', T.spin[0] + 0.3, 0.6, 0.08], ['glitter', T.spin[1] - 0.2, T.spin[1] + 0.3],
    ...T.cards.flatMap(c => [['whoosh', c, 0.3, 0.04], ['pop', c + 0.1, 1108.73, 0.04, 0]]), ['pop', T.cards[0] + 1.4, 1318.51, 0.05, 0], ['pop', T.cards[1] + 1.4, 1318.51, 0.05, 0],
    ['bell', T.pause[1], 1174.66, 0.04, 1.0, 0], ['whoosh', T.pause[1], 0.4, 0.04],
    ['bell', T.yes, 1760, 0.05, 1.4, 0], ['glitter', T.yes, T.yes + 0.8], ...sobCues(T.sob, 5),
    ['whoosh', T.pizza, 0.35, 0.05], ['boom', T.pizza + 0.35, 0.25], ['pop', T.pizza + 0.5, 1567.98, 0.05, 0],
  ],
})
export const { DURATION, SCENES, CUES } = EP
