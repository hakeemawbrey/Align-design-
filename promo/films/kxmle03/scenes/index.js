// kxmle03 · MOONLIGHT LANE: SIDE STORIES · "Seen, 11:52 PM" (90 s vertical, star_advice; lofi · Eb)
// Rows: promo/films/month2/m48.md. Engine: ../../kxmle01/scenes/sidekit.js (read-only).
//   0.0   frame 0: ♍ Virgo mid-scream in the dark flat, phone glowing, a giant "Seen · 11:52 PM" receipt slamming down
//         (caught); slam "Seen. | *No reply.*"; record scratch at 0.75
//   4.4   1 · THE TEXT: earlier, the second date (♑ Capricorn: "you alphabetised the *sugar?*") · 12 "I had fun tonight :)"
//         · seen · loading bar "reading “seen”…" → "Error: 14 theories" · 20 the theory board with red string
//  26     2 · THE SPIRAL: incoming call from Leo, bad advice ("post a glow-up pic") "…no. that's a *game.*" · 34 stress-
//         cleaning at 1:14 AM · 41 phone face down: "maybe I was *too much* fun." (Pisces cries across the lane)
//  48     3 · THE STARS ADVISE · 64 4 · THE REASON: next morning, one plain text → "YES. sorry!! fell asleep holding my
//         phone." · 72 the café: Capricorn, two coffees, "I blocked Thursday. *all* of it." "…in *pen?*" "in *pen.*"
//  80     LESSON · 83.5 the phone goes in a drawer; Virgo sleeps · hard cut on "Ask *once.* | Then sleep."
import { loadingBar, loadingBarCues, incomingCall, incomingCallCues } from '../../hookkit.js'
import {
  makeSide, lines, hopsOf, lane, cafe, apt, star, cry, pisces, sticker, phone,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE, APT,
  drawCafeTable, drawBubble, sparkles, drawMug, key, clamp, lerp, prog, ease, signStar,
} from '../../kxmle01/scenes/sidekit.js'

const CAP = signStar('capricorn'), LEO = signStar('leo')
const L0 = lines([{ t: 2.3, who: 'virgo', text: 'I said “I had fun.” they *saw* it.' }])
const L1 = lines([
  { t: 5.8, who: 'capricorn', text: 'you alphabetised the *sugar?*' },
  { t: 8.3, who: 'virgo', text: 'it was *bothering* me.' },
  { t: 10.1, who: 'capricorn', text: '…that’s *adorable.*' },
])
const L3 = lines([{ t: 23.0, who: 'virgo', text: 'every theory is *bad.* and *possible.*' }])
const L4 = lines([
  { t: 28.2, who: 'leo', text: 'post a glow-up pic. make them *notice.*' },
  { t: 31.0, who: 'virgo', text: '…no. that’s a *game.*' },
])
const L5 = lines([{ t: 39.0, who: 'virgo', text: 'spotless. still *no reply.*' }])
const L6 = lines([{ t: 42.0, who: 'virgo', text: 'maybe I was *too much* fun.' }])
const L7 = lines([{ t: 69.6, who: 'virgo', text: '…they fell *asleep.*' }])
const L8 = lines([
  { t: 73.0, who: 'capricorn', text: 'I read it, then fell *asleep.*' },
  { t: 75.2, who: 'capricorn', text: 'so I blocked Thursday. *all* of it.' },
  { t: 77.6, who: 'virgo', text: '…in *pen?*' },
  { t: 78.6, who: 'capricorn', text: 'in *pen.*' },
])
const L9 = lines([{ t: 84.0, who: 'virgo', text: 'goodnight, phone. *see* you tomorrow.' }])
const BOXES = [[L0, 2.1, 4.3], [L1, 5.6, 11.9], [L3, 22.8, 25.9], [L4, 28.0, 33.8], [L5, 38.8, 40.9], [L6, 41.8, 47.8], [L7, 69.4, 71.8], [L8, 72.8, 79.9], [L9, 83.8, 87.0]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)
const T = { date: 4.4, text: 12.0, board: 20.0, call: 26.0, clean: 34.0, low: 41.0, adv: 48.0, morn: 64.0, cafe: 72.0, lesson: 80.0, end: 83.5, drawer: 84.6, sleep: 86.4 }

function receipt(x, cx, cy, k, rot = -0.04) { sticker(x, cx, cy, 'Seen · 11:52 PM', { size: 66, k, rot, bg: '#ffffff', font: MONO, weight: 700 }) }
function bigPhone(x, cx, cy, w, t, rot = 0.06) {
  const h = w * 1.75
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.shadowColor = '#bfe9ff'; x.shadowBlur = 60; x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.shadowBlur = 0
  x.fillStyle = '#2a2050'; x.fillRect(-w / 2, -h / 2, w, h); x.fillStyle = '#bfe9ff'; x.fillRect(-w / 2 + 10, -h / 2 + 24, w - 20, h - 48)
  x.fillStyle = ML_GOLD; x.fillRect(-w / 2 + 40, -40, w - 60, 60); x.fillStyle = INK; x.font = `700 ${Math.round(w * 0.085)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I had fun tonight :)', 10, -10)
  x.font = `700 ${Math.round(w * 0.07)}px ${MONO}`; x.fillText('Seen 11:52 PM', 20, 50)
  x.restore()
}
const winPisces = (x, t, k = 3, mood) => { x.save(); x.beginPath(); x.rect(APT.window.x + 20, APT.window.y + 300, 150, 190); x.clip(); pisces(x, APT.window.x + 95, APT.window.y + 520, 90, t, { tears: k, mood }); x.restore() }

function hook(x, t) {
  apt(x, t, { lamp: 0.25, time: 'late' })
  x.fillStyle = 'rgba(6,4,24,0.35)'; x.fillRect(0, 0, 1080, 1920)
  winPisces(x, t, 3)
  star(x, t, { sign: 'virgo', size: 290, x: 400, y: 1440, seed: 6, walk: false, hops: [0, 0.4, 2.3, 2.9], moods: [[-1, 'wide', [1, -1]], [2.2, 'squint', [1, -1]]] })
  bigPhone(x, 780, 1080, 230, t)
  const s = ease.outBack(prog(t, -0.5, -0.05))
  receipt(x, 560, 820, 1 + 0.6 * (1 - s))
}
function date(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  pisces(x, 92, 1250, 120, t, { tears: 2, look: [1, 0] })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'virgo', size: 220, x: S0.x, y: S0.y, seed: 6, walk: false, hops: H('virgo'), moods: [[0, 'happy', [1, 0]], [10.3, 'heart', undefined]] })
  star(x, t, { sign: 'capricorn', size: 220, x: S1.x, y: S1.y, seed: 5, walk: false, hops: [9.9, ...H('capricorn')], moods: [[0, 'happy', [-1, 0]], [5.6, 'wide', [-1, 1]], [9.9, 'heart', undefined]] })
  drawCafeTable(x, t, { cups: 2, pastry: 'croissant' })
  // the sugar packets, alphabetised
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(470 + i * 30, 1230, 24, 34); x.fillStyle = ['#ffffff', '#ffd2e0', '#c9f7e0', '#ffe27a', '#bcd8f0'][i]; x.fillRect(473 + i * 30, 1233, 18, 28) }
  sparkles(x, t, 540, 1100, 10.1, 14, 220, 3, [PINK, ML_GOLD, BONE])
}
function textScene(x, t) {
  apt(x, t, { lamp: 0.5, time: 'late' })
  star(x, t, { sign: 'virgo', size: 220, x: 200, y: 1450, seed: 6, walk: false, hops: [13.4, 17.5], moods: [[0, 'happy', [1, -1]], [13.4, 'wide', [1, -1]], [17.6, 'squint', [1, -1]]] })
  const pin = ease.outBack(prog(t, 12.0, 12.4))
  phone(x, 620, 900 + (1 - pin) * 1100, 560, 760, t, { title: `${CAP.glyph}︎ Capricorn`, msgs: [{ at: 12.6, side: 'R', text: 'I had fun tonight :)' }] })
  receipt(x, 680, 1390, pop01(t, 13.4, 0.3, 2.4), 0.04)
}
function board(x, t) {
  apt(x, t, { lamp: 0.6, time: 'late' })
  x.fillStyle = INK; x.fillRect(110, 470, 560, 600); x.fillStyle = '#b58a5a'; x.fillRect(122, 482, 536, 576)
  const notes = [[20.4, 250, 600, 'THEY HATE ME'], [21.3, 520, 700, 'I SAID “FUN” WRONG'], [22.2, 300, 900, 'MARRIED TO | THEIR JOB']]
  const on = notes.filter(n => t >= n[0])
  x.strokeStyle = '#e8303a'; x.lineWidth = 6; x.beginPath(); on.forEach((n, i) => (i ? x.lineTo(n[1], n[2]) : x.moveTo(n[1], n[2]))); x.stroke()
  for (const [a, nx, ny, s] of notes) sticker(x, nx, ny, s, { size: 30, k: pop01(t, a, 0.25, 2.4), rot: (nx % 7 - 3) * 0.02, bg: '#fff7a8' })
  star(x, t, { sign: 'virgo', size: 240, x: 830, y: 1440, seed: 6, walk: false, hops: [20.4, 21.3, 22.2, ...H('virgo')], moods: [[0, 'squint', [-1, -1]], [23.0, 'wide', [-1, 0]]] })
  cry(x, 830, standY(240, 1440), 240, t, t > 24 ? 1 : 0)
}
function call(x, t) {
  apt(x, t, { lamp: 0.6, time: 'late' })
  star(x, t, { sign: 'virgo', size: 250, x: 560, y: 1440, seed: 6, walk: false, hops: H('virgo'), moods: [[0, 'neutral', [1, 0]], [28.4, 'wide', [1, 0]], [30.9, 'squint', [1, 0]], [32.0, 'happy', [0, -1]]] })
  // Leo on the little phone screen
  const k = clamp((t - 27.7) / 0.3)
  if (k > 0) {
    x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(720, 760, 260, 420); x.fillStyle = '#ffd9a8'; x.fillRect(732, 772, 236, 396)
    drawSign(x, 'leo', 850, standY(170, 1140), 170, t, { mood: t > 31 ? 'wide' : 'wink', look: [-1, 0], hops: H('leo'), seed: 7 })
    x.restore()
  }
  sticker(x, 300, 860, 'NO GAMES', { size: 44, k: pop01(t, 31.3, 0.3, 2.4) * outK(t, [33.4, 33.7]), rot: -0.08, bg: '#c9f7e0' })
}
function clean(x, t) {
  apt(x, t, { lamp: 1, time: 'late' })
  const xs = [[34, 200], [34.8, 860], [35.6, 300], [36.4, 820], [37.2, 260], [38.0, 760], [38.8, 560]]
  star(x, t, { sign: 'virgo', size: 220, x: xs, seed: 6, step: 0.2, hops: H('virgo'), moods: [[0, 'sparkle', undefined], [38.8, 'neutral', [0, 1]]] })
  for (let i = 0; i < 6; i++) sparkles(x, t, [200, 860, 300, 820, 260, 760][i], 1250, r3(34.6 + i * 0.8), 8, 140, 10 + i, ['#ffffff', '#bcd8f0', ML_GOLD])
  sticker(x, 860, 860, '1:14 AM', { size: 52, bg: '#1b1236', fg: '#7dffb0', font: MONO, weight: 700, rot: 0.03 })
}
function low(x, t) {
  apt(x, t, { lamp: 0.3, time: 'late' })
  winPisces(x, t, 3)
  star(x, t, { sign: 'virgo', size: 240, x: APT.couch.seats[0], y: APT.couch.seatY, seed: 6, walk: false, squash: 0.08, hops: H('virgo'), moods: [[0, 'neutral', [0, 1]], [42.0, 'squint', [0, 1]]] })
  cry(x, APT.couch.seats[0], standY(240, APT.couch.seatY), 240, t, 1, { squash: 0.08, seed: 6 })
  x.fillStyle = INK; x.fillRect(640, 1290, 120, 26); x.fillStyle = '#2a2050'; x.fillRect(646, 1294, 108, 18)
  sticker(x, 700, 1240, 'face down', { size: 26, rot: 0.05, bg: '#ffd2e0', k: pop01(t, 43.0, 0.3, 2) })
}
function morning(x, t) {
  apt(x, t, { lamp: 0.2, time: 'dusk' })
  star(x, t, { sign: 'virgo', size: 220, x: 200, y: 1450, seed: 6, walk: false, hops: [64.8, 67.3, 67.6, 68.0, ...H('virgo')], moods: [[0, 'neutral', [1, -1]], [67.2, 'wide', [1, -1]], [68.6, 'sparkle', [1, -1]], [69.6, 'heart', undefined]] })
  const msgs = [{ at: 64.8, side: 'R', text: 'Hey, I liked last night. Want to do it again?' }, { at: 67.2, side: 'L', text: 'YES. sorry!! fell asleep holding my phone.' }, { at: 68.4, side: 'L', text: '6 AM meeting. still a mess.' }]
  phone(x, 620, 960, 560, 820, t, { title: `${CAP.glyph}︎ Capricorn`, msgs, typing: [65.9, 67.2] })
  sparkles(x, t, 620, 1100, 67.3, 14, 240, 4, [ML_GOLD, PINK, BONE])
}
function cafe2(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  pisces(x, 92, 1250, 120, t, { tears: 3, mood: 'happy', look: [1, 0], pull: bump(t, 78.8, 0.6) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'virgo', size: 220, x: S0.x, y: S0.y, seed: 6, walk: false, hops: H('virgo'), moods: [[0, 'happy', [1, 0]], [75.4, 'wide', [1, 0]], [78.6, 'heart', undefined]] })
  star(x, t, { sign: 'capricorn', size: 220, x: [[72, 1180], [72.8, S1.x]], y: S1.y, seed: 5, hops: H('capricorn'), moods: [[0, 'wide', [-1, 0]], [74.0, 'happy', [-1, 0]], [78.6, 'heart', undefined]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  sticker(x, 560, 1000, 'THURSDAY | VIRGO · ALL DAY', { size: 38, k: pop01(t, 75.6, 0.3, 2.4), rot: -0.05, bg: '#fff4dc' })
  sparkles(x, t, 560, 1000, 78.6, 14, 230, 6, [PINK, ML_GOLD, BONE])
}
function ending(x, t) {
  apt(x, t, { lamp: key(t, [[85.6, 1], [86.0, 0.25]]), time: 'late' })
  winPisces(x, t, 3, 'happy')
  // a side table with a drawer; the phone slides in
  x.fillStyle = INK; x.fillRect(780, 1210, 220, 220); x.fillStyle = '#8a5a3a'; x.fillRect(788, 1218, 204, 204); x.fillStyle = '#6e4428'; x.fillRect(800, 1260, 180, 60)
  const p = ease.inOutCubic(prog(t, T.drawer, T.drawer + 0.7))
  if (p < 1) { x.fillStyle = INK; x.fillRect(lerp(700, 830, p), lerp(1150, 1270, p), 100, 30); x.fillStyle = '#bfe9ff'; x.fillRect(lerp(706, 836, p), lerp(1154, 1274, p), 88, 22) }
  star(x, t, { sign: 'virgo', size: 240, x: [[0, 640], [T.sleep - 0.6, 640], [T.sleep, APT.couch.seats[0]]], y: [[0, 1440], [T.sleep - 0.3, 1440], [T.sleep, APT.couch.seatY]], seed: 6, hops: H('virgo'),
    moods: [[0, 'happy', [1, 0]], [T.sleep, 'sleepy', undefined]] })
}

const CALL = { at: 26.3, out: [27.9, 28.05], name: 'Leo', sub: 'incoming call…', glyph: LEO.glyph, color: LEO.color, answerAt: 27.3 }
const S = makeSide({
  id: 'kxmle03', duration: 90, lastAt: 88.3,
  music: { style: 'lofi', key: 'Eb', seed: 4803, hits: [13.4, 31.3, 67.2, 78.6] },
  hook: { text: 'Seen. | *No reply.*', size: 124 },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Virgo.*', sub: 'eleven minutes ago' },
  caught: { x: 560, y: 820, r: 290, ry: 120, label: 'SEEN', arrow: 'bl' },
  promise: 'wait for the *reason*',
  chapters: [{ at: T.date, title: 'the text' }, { at: T.call + 1.9, title: 'the spiral' }, { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.morn, title: 'the reason' }],
  scenes: [[0, hook], [T.date, date], [T.text, textScene], [T.board, board], [T.call, call], [T.clean, clean], [T.low, low], [T.adv, low], [T.morn, morning], [T.cafe, cafe2], [T.end, ending]],
  boxes: BOXES,
  caps: [
    { text: 'Second date. | *Great* date.', kicker: 'EARLIER · 8:30 PM', at: 4.6, out: [8.4, 8.7], late: 1, lateAt: 5.2 },
    { text: 'Theory | *board.*', at: 20.2, out: [22.7, 23.0], size: 100, late: 1, lateAt: 20.6 },
    { text: 'Stress-cleaning | at *1:14 AM.*', at: 34.2, out: [38.5, 38.8], late: 2, lateAt: 34.9 },
    { text: 'One plain | *text.*', kicker: 'NEXT MORNING · 9:02 AM', at: 64.3, out: [66.8, 67.1], late: 1, lateAt: 64.9 },
    { text: 'Ask *once.* | Then sleep.', at: 87.6, out: null, size: 108, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'moon', head: 'Seen isn’t a *verdict.*', body: 'People fall asleep, get busy or need time. Don’t write the ending.' },
      { at: 54.3, icon: 'check', head: 'One text is *enough.*', body: 'You said a kind thing. Let it sit. No follow-up flood.' },
      { at: 59.3, icon: 'chat', head: 'Ask *once,* plainly.', body: 'Next day: “Hey, I liked last night. Want to do it again?”' },
    ],
    lines: [
      { t: 49.1, text: 'Virgo, this one’s *yours.*' },
      { t: 51.6, text: 'a read receipt isn’t a *review.*' },
      { t: 54.6, text: 'you already said the kind *thing.*' },
      { t: 57.2, text: 'let it sit. go to *sleep.*' },
      { t: 59.6, text: 'tomorrow, ask once. *plainly.*' },
      { t: 61.6, text: 'then believe the *answer.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Seen isn’t | a *verdict.*', chip: '+1 THURSDAY (BLOCKED)' },
  fx: [
    [loadingBar, { at: 14.6, len: 3.4, label: 'reading “seen”…', stallAt: 99, error: 'Error: 14 theories', y: 560 }, loadingBarCues],
    [incomingCall, CALL, incomingCallCues],
  ],
  cues: [
    ['boom', 0.0, 0.05], ['whoosh', T.date, 0.4, 0.04], ['glitter', 10.1, 10.8], ['pop', 8.3, 987.77, 0.03, 0.2],
    ['whoosh', T.text, 0.45, 0.05], ['pop', 12.6, 1174.66, 0.04, 0.25], ['pop', 13.4, 392, 0.05, 0], ['tick', 13.45, 0.05],
    ['whoosh', T.board, 0.4, 0.04], ...[20.4, 21.3, 22.2].flatMap(a => [['pop', a, 523.25, 0.04, 0.2], ['tick', r3(a + 0.05), 0.04]]),
    ['pop', 31.3, 1318.51, 0.04, -0.2], ['whoosh', T.clean, 0.4, 0.04], ...[34.6, 35.4, 36.2, 37.0, 37.8, 38.6].map(a => ['glitter', a, r3(a + 0.4)]),
    ['whoosh', T.low, 0.4, 0.035], ['pop', 43.0, 392, 0.03, 0.2],
    ['whoosh', T.morn, 0.4, 0.04], ['pop', 64.8, 1174.66, 0.04, 0.25], ['pop', 67.2, 880, 0.05, -0.25], ['glitter', 67.3, 68.0], ['pop', 68.4, 880, 0.04, -0.25],
    ['whoosh', T.cafe, 0.4, 0.04], ['pop', 75.6, 1318.51, 0.045, 0], ['bell', 78.6, 1760, 0.035, 1.4, 0], ['glitter', 78.6, 79.3],
    ['whoosh', T.end, 0.4, 0.04], ['whoosh', T.drawer, 0.35, 0.03], ['tick', 85.3, 0.06], ['pluck', T.sleep, 659.25, 0.03, 1.2, 0],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
