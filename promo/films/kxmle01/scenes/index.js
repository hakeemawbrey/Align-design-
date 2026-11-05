// kxmle01 · MOONLIGHT LANE: SIDE STORIES · "Advice for Everyone But Me" (90 s vertical, star_advice; funk · G)
// Rows: promo/films/month2/m48.md. Engine: ./sidekit.js (mlkit + winter.js + hookkit, all read-only).
//   0.0   frame 0: ♊ Gemini mid-juggle of three buzzing phones in the café, their OWN phone held out (caught:
//         "aries: so what are we lol"); slam "Gives advice. | *Takes none.*"; record scratch at 0.75
//   4.4   1 · THE ADVICE DESK: Leo, Virgo, Libra get answers and talk cards · 14 the phone: four months of "hang out?"
//         · 22 Pisces: "but what ARE you two?" "we're… *vibes.*"
//  26     2 · IT GOES SIDEWAYS: loading bar "defining the relationship…" → "Error: too scared to ask" · drafts deleted ·
//         34 notification "Aries: fries?" → "YES!!" (asked nothing) · 41 the bench: "this is my… uh… *Gemini!*"
//  48     3 · THE STARS ADVISE (three cards) · 64 4 · THE ANSWER: Gemini deals a talk card to themself · 72 the bench:
//         "I like you. what are we doing?" "dating? *properly?*" · 80 LESSON · 83.5 the queue is back, the sign flips:
//         BACK IN AN HOUR · ON A DATE · hard cut on "Deal *yourself* one." Pisces cries throughout.
import { loadingBar, loadingBarCues, notification, notificationCues } from '../../hookkit.js'
import {
  makeSide, lines, hopsOf, lane, cafe, apt, star, cry, pisces, sticker, drip, phone,
  ML_GOLD, BONE, INK, PINK, MONO, INTER, r3, pop01, outK, bump, LANE, standY, drawSign, CAFE, APT,
  drawCafeTable, drawBubble, sparkles, drawTalkCard, drawPastry, key, clamp, lerp, prog, ease, signStar,
} from './sidekit.js'

const GEM = signStar('gemini'), ARI = signStar('aries')

// ── dialogue (who: sign)
const L0 = lines([{ t: 2.3, who: 'gemini', text: 'advice? *free.* my own texts? *later.*' }])
const L1 = lines([
  { t: 5.2, who: 'gemini', text: 'Leo: send the text. *tonight.*' },
  { t: 8.0, who: 'gemini', text: 'Virgo: no essay. *one* line.' },
  { t: 10.9, who: 'gemini', text: 'Libra: the tulips. *always* tulips.' },
])
const L2 = lines([{ t: 19.9, who: 'gemini', text: '…I’ll answer that one *later.*' }])
const L3 = lines([
  { t: 22.3, who: 'pisces', text: 'but what ARE you two?' },
  { t: 24.0, who: 'gemini', text: 'we’re… *vibes.*' },
])
const L4 = lines([{ t: 30.9, who: 'gemini', text: '(type. delete. type. *delete.*)' }])
const L5 = lines([
  { t: 35.5, who: 'gemini', text: 'YES!! omg *yes.*' },
  { t: 37.7, who: 'gemini', text: '…I didn’t ask *anything.* again.' },
])
const L6 = lines([
  { t: 41.7, who: 'aries', text: 'Taurus! this is my… uh…' },
  { t: 43.7, who: 'aries', text: '…my *Gemini!*' },
  { t: 45.2, who: 'gemini', text: '(their *what* now?)' },
])
const L7 = lines([{ t: 67.2, who: 'gemini', text: 'what do I want? …*them.* properly.' }])
const L8 = lines([
  { t: 72.4, who: 'gemini', text: 'I like you. what are we *doing?*' },
  { t: 75.0, who: 'aries', text: '…I was scared to ask *too.*' },
  { t: 77.0, who: 'aries', text: 'dating? *properly?*' },
  { t: 78.7, who: 'gemini', text: '*properly.*' },
])
const L9 = lines([
  { t: 83.8, who: 'leo', text: 'Gemini! should I text—' },
  { t: 85.2, who: 'gemini', text: 'ask them *plainly.* back in an hour!' },
])
const BOXES = [[L0, 2.1, 4.3], [L1, 5.0, 13.9], [L2, 19.7, 21.9], [L3, 22.1, 25.9], [L4, 30.7, 33.9], [L5, 35.3, 40.8], [L6, 41.5, 47.8], [L7, 67.0, 71.8], [L8, 72.2, 79.9], [L9, 83.6, 87.6]]
const ALL = BOXES.flatMap(b => b[0])
const H = s => hopsOf(ALL, s)

const T = { desk: 4.4, phone: 14.0, pis: 22.0, aptA: 26.0, notif: 34.0, bench: 41.0, adv: 48.0, card: 64.0, flip: 65.6, bench2: 72.0, lesson: 80.0, end: 83.5, sign: 86.0 }

// ── props
function miniPhone(x, cx, cy, w, rot, { glow = 1, lines: ls = [], buzz = 0 } = {}) {
  const h = w * 1.75
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#2a2050'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = glow > 0.5 ? '#bfe9ff' : '#3a3070'; x.fillRect(-w / 2 + 8, -h / 2 + 18, w - 16, h - 36)
  if (ls.length) {
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
    ls.forEach((s, i) => { x.font = `${i ? 700 : 800} ${Math.round(w * (i ? 0.12 : 0.1))}px ${INTER}`; x.fillText(s, 0, -h * 0.18 + i * w * 0.2) })
  }
  x.restore()
  if (buzz > 0) { x.strokeStyle = `rgba(255,226,122,${buzz})`; x.lineWidth = 6; for (const d of [-1, 1]) { x.beginPath(); x.moveTo(cx + d * (w * 0.7), cy - 20); x.lineTo(cx + d * (w * 0.85), cy); x.lineTo(cx + d * (w * 0.7), cy + 20); x.stroke() } }
}
function fries(x, cx, cy, s = 6) {
  x.fillStyle = INK; x.fillRect(cx - 5 * s, cy - 2 * s, 10 * s, 9 * s)
  for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(cx - 4.5 * s + i * 2 * s, cy - 6 * s - (i % 2) * s, 1.6 * s, 5 * s); x.fillStyle = '#ffd36e'; x.fillRect(cx - 4.2 * s + i * 2 * s, cy - 5.7 * s - (i % 2) * s, 1, 1); x.fillRect(cx - 4.2 * s + i * 2 * s, cy - 5.7 * s - (i % 2) * s, 1 * s, 4.4 * s) }
  x.fillStyle = '#e8566e'; x.fillRect(cx - 4 * s, cy - 1 * s, 8 * s, 7 * s); x.fillStyle = '#fff4dc'; x.fillRect(cx - 1 * s, cy + 1 * s, 2 * s, 2 * s)
}
const deskSign = (x, t, text = 'ADVICE · FREE', k = 1) => sticker(x, 540, 1268, text, { size: 30, k, rot: 0.02, bg: '#fff4dc' })
const cafePisces = (x, t, k = 2, o = {}) => pisces(x, 92, 1250, 120, t, { tears: k, look: [1, 0], ...o })

// ── scenes
function hook(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'wide', look: [-1, 1], seed: 9 }) })
  cafePisces(x, t, 3, { look: [1, -1] })
  star(x, t, { sign: 'gemini', size: 300, x: 520, y: 1440, seed: 8, walk: false, hops: [0.0, 0.55, 1.1, 2.3, 2.8, 3.3], moods: [[-1, 'wide', [0, -1]], [2.2, 'happy', [1, 0]]] })
  // three phones in the air, juggled
  for (let i = 0; i < 3; i++) {
    const p = ((t * 0.9 + i / 3) % 1 + 1) % 1
    const px = lerp(330, 700, p), py = 1080 - Math.sin(Math.PI * p) * 520
    miniPhone(x, px, py, 74, p * 6.28 * (i % 2 ? 1 : -1), { buzz: 0.6 + 0.4 * Math.sin(t * 30 + i), glow: 1 })
  }
  // their OWN phone, held out, unanswered
  miniPhone(x, 820, 1010, 210, 0.08, { lines: ['ARIES', 'so what', 'are we lol'], glow: 1 })
  sparkles(x, t, 520, 900, -0.2, 10, 260, 3, [ML_GOLD, '#ffe27a', BONE])
}
function desk(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  cafePisces(x, t, 2)
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  // the client in the left seat changes: Leo → Virgo → Libra; the next one waits by the door
  const who = t < 7.7 ? 'leo' : t < 10.6 ? 'virgo' : 'libra'
  const t0 = t < 7.7 ? T.desk : t < 10.6 ? 7.7 : 10.6
  star(x, t, { sign: who, size: 210, x: [[t0, 120], [t0 + 0.5, S0.x]], y: S0.y, seed: 3, hops: [t0 + 2.4, t0 + 2.7], moods: [[0, 'neutral', [1, 0]], [t0 + 2.3, 'sparkle', undefined]] })
  star(x, t, { sign: 'gemini', size: 220, x: S1.x, y: S1.y, seed: 8, walk: false, hops: H('gemini'), moods: [[0, 'wink', [-1, 0]], [12.2, 'happy', [-1, 0]]] })
  drawCafeTable(x, t, { cups: 2, pastry: null })
  deskSign(x, t)
  for (const d of [5.6, 8.4, 11.3]) { const k = pop01(t, d, 0.3, 2) * outK(t, [d + 1.9, d + 2.2]); if (k > 0.01) drawTalkCard(x, lerp(S1.x, S0.x + 60, ease.outCubic(prog(t, d, d + 0.4))), 1180, 120 * k, t, { back: true, rot: -0.1 }) }
  for (const d of [7.0, 9.9]) sparkles(x, t, S0.x, 1150, d, 8, 130, 4)
}
function phoneScene(x, t) {
  lane(x, t, { pan: 300, time: 'late', dim: 0.45, flakes: 60 })
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(0, 0, 1080, 1920)
  const msgs = [
    { at: 14.6, side: 'L', text: 'SEPT · hang out tonight?' }, { at: 15.1, side: 'R', text: 'always :)' },
    { at: 15.9, side: 'L', text: 'OCT · hang out tonight?' }, { at: 16.4, side: 'R', text: 'always :)' },
    { at: 17.2, side: 'L', text: 'NOV · hang out tonight?' }, { at: 17.7, side: 'R', text: 'always :)' },
    { at: 18.9, side: 'L', text: 'so what are we lol' },
  ]
  const pin = ease.outBack(prog(t, 14.0, 14.4))
  phone(x, 560, 1060 + (1 - pin) * 1100, 680, 860, t, { title: `${ARI.glyph}︎ Aries`, msgs, typing: [19.3, 21.9] })
  star(x, t, { sign: 'gemini', size: 230, x: 170, y: 1470, seed: 8, walk: false, hops: [18.95, ...H('gemini')], moods: [[0, 'happy', [1, -1]], [18.95, 'wide', [1, -1]]] })
  cry(x, 170, standY(230, 1470), 230, t, t > 21 ? 1 : 0)
}
function pisAsk(x, t) {
  cafe(x, t, { view: 'late' })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'pisces', size: 220, x: S0.x, y: S0.y, seed: 12, walk: false, tears: 3, hops: H('pisces'), moods: [[0, 'wide', [1, 0]]] })
  star(x, t, { sign: 'gemini', size: 220, x: S1.x, y: S1.y, seed: 8, walk: false, hops: H('gemini'), moods: [[0, 'neutral', [-1, 0]], [24.0, 'wink', [0, -1]]] })
  drawCafeTable(x, t, { cups: 2, pastry: 'bun' })
  drawBubble(x, S1.x + 40, 1050, '~vibes~', { size: 34, col: '#ffe27a', k: pop01(t, 24.4, 0.25, 2.2) * outK(t, [25.6, 25.8]) })
}
function aptA(x, t) {
  apt(x, t, { time: 'night' })
  star(x, t, { sign: 'gemini', size: 240, x: APT.couch.seats[1], y: APT.couch.seatY, seed: 8, walk: false, squash: 0.05, hops: [27.2, 30.6, ...H('gemini')],
    moods: [[0, 'neutral', [-1, -1]], [27.1, 'squint', [0, -1]], [30.4, 'wide', [-1, 0]], [31.0, 'squint', [-1, 0]]] })
  // drafts typed and deleted
  const drafts = [[31.2, 32.0, 'what are we'], [32.6, 33.4, 'lol random q']]
  for (const [a, b, s] of drafts) {
    const k = pop01(t, a, 0.25, 2) * outK(t, [b + 0.3, b + 0.5])
    if (k <= 0.01) continue
    drawBubble(x, 420, 1010, s, { size: 40, col: ML_GOLD, k })
    if (t > b) { x.save(); x.globalAlpha = k; x.strokeStyle = '#ff3b3b'; x.lineWidth = 12; x.beginPath(); x.moveTo(250, 960); x.lineTo(590, 1060); x.moveTo(590, 960); x.lineTo(250, 1060); x.stroke(); x.restore() }
  }
  // across the lane: Pisces' window (a tiny inset), crying at the moon
  x.save(); x.beginPath(); x.rect(APT.window.x + 20, APT.window.y + 300, 150, 190); x.clip()
  pisces(x, APT.window.x + 95, APT.window.y + 520, 90, t, { tears: 3 })
  x.restore()
}
function notifScene(x, t) {
  apt(x, t, { time: 'night' })
  const up = t > 34.9
  star(x, t, { sign: 'gemini', size: 240, x: [[34, APT.couch.seats[1]], [34.9, APT.couch.seats[1]], [35.3, 560]], y: [[34, APT.couch.seatY], [34.9, APT.couch.seatY], [35.2, LANE.feet]],
    seed: 8, hops: [34.95, 35.5, 35.9, 36.3, ...H('gemini')], moods: [[0, 'squint', [0, -1]], [34.6, 'sparkle', [0, -1]], [37.6, 'wide', [1, 0]], [39.0, 'squint', [0, 1]]] })
  if (up) phone(x, 800, 900, 360, 520, t, { title: `${ARI.glyph}︎ Aries`, msgs: [{ at: 34.3, side: 'L', text: 'fries? now?' }, { at: 35.6, side: 'R', text: 'YES!!' }], alpha: clamp((t - 34.9) / 0.2) * outK(t, [40.5, 40.9]) })
  sparkles(x, t, 560, 1150, 35.0, 12, 200, 6, [ML_GOLD, PINK, '#ffe27a'])
  sticker(x, 300, 860, 'QUESTIONS ASKED: 0', { size: 34, k: pop01(t, 38.6, 0.3, 2.2) * outK(t, [40.6, 40.9]), bg: '#ffd2e0', rot: -0.07 })
}
function bench(x, t, late = false) {
  const B = LANE.bench
  lane(x, t, { pan: 640, time: late ? 'late' : 'night', depth: 0.7, moon: { x: 860, y: 520, r: 110 } }, c => {
    pisces(c, LANE.pisces.x, LANE.pisces.y + 8 + standY(104, 0) * 0 + 0, 104, t, { tears: 3, look: [1, 1] })
    if (!late) {
      star(c, t, { sign: 'aries', size: 220, x: B.seats[0] - 10, y: B.seatY, seed: 1, walk: false, hops: H('aries'), moods: [[0, 'happy', [1, 0]], [41.6, 'happy', [1, 0]], [43.6, 'sparkle', [1, 0]]] })
      star(c, t, { sign: 'gemini', size: 220, x: B.seats[1] + 20, y: B.seatY, seed: 8, walk: false, hops: H('gemini'), moods: [[0, 'happy', [-1, 0]], [43.9, 'wide', [-1, 0]], [45.0, 'squint', [0, 1]]] })
      fries(c, B.seats[0] - 130, 1395, 5)
      star(c, t, { sign: 'taurus', size: 210, x: [[41, 1700], [42.4, 1480], [44.6, 1480], [46.6, 1720]], seed: 9, moods: [[0, 'happy', [-1, 0]], [44.6, 'happy', [1, 0]]] })
    } else {
      star(c, t, { sign: 'aries', size: 220, x: B.seats[0] - 10, y: B.seatY, seed: 1, walk: false, hops: H('aries'), moods: [[0, 'neutral', [1, 0]], [74.9, 'wide', [1, 0]], [76.6, 'happy', [1, 0], 0.9], [78.8, 'heart', undefined]] })
      star(c, t, { sign: 'gemini', size: 220, x: B.seats[1] + 20, y: B.seatY, seed: 8, walk: false, hops: H('gemini'), moods: [[0, 'neutral', [-1, 0]], [74.5, 'neutral', [-1, 0], 0.5], [76.8, 'sparkle', [-1, 0], 0.9], [78.8, 'heart', undefined]] })
      sparkles(c, t, B.x, 1180, 78.8, 16, 240, 7, [PINK, ML_GOLD, '#ffe27a', BONE])
    }
  })
  drip(x, LANE.pisces.x - 640, LANE.pisces.y + 40, 1320, t, late ? 77.6 : 46.2)
}
function selfCard(x, t) {
  cafe(x, t, { chairsUp: 1, view: 'late', lights: 0.8 })
  cafePisces(x, t, 2, { look: [1, 0] })
  const S1 = CAFE.seats[1]
  star(x, t, { sign: 'gemini', size: 220, x: S1.x, y: S1.y, seed: 8, walk: false, hops: [64.6, T.flip, ...H('gemini')], moods: [[0, 'neutral', [-1, -1]], [T.flip, 'wide', [-1, -1]], [67.2, 'happy', [-1, -1], 0.9], [69.5, 'sparkle', [-1, -1]]] })
  drawCafeTable(x, t, { cups: 1, pastry: null })
  deskSign(x, t, 'ADVICE · FREE · (ME TOO)', pop01(t, 70.0, 0.3, 2))
  // the deck fans, then one card turns for Gemini
  for (let i = 0; i < 5; i++) drawTalkCard(x, S1.x - 120 + (i - 2) * 22, 1180, 80, t, { back: true, rot: (i - 2) * 0.15, alpha: outK(t, [T.flip, T.flip + 0.3]) })
  if (t > 64.8) {
    const p = ease.outCubic(prog(t, 64.8, T.flip)), sx = Math.cos((1 - p) * 6.28)
    drawTalkCard(x, lerp(S1.x - 120, 540, p), lerp(1160, 990, p) - Math.sin(Math.PI * p) * 100, lerp(80, 360, p), t, { back: sx < 0, scaleX: Math.max(0.04, Math.abs(sx)), q: 'What do you want, really?', glow: bump(t, T.flip, 1.2) })
    sparkles(x, t, 540, 990, T.flip, 12, 200, 8)
  }
}
function ending(x, t) {
  cafe(x, t, { behind: c => drawSign(c, 'taurus', CAFE.counter.x + 80, standY(200, CAFE.counter.y), 200, t, { mood: 'happy', look: [-1, 1], seed: 9 }) })
  cafePisces(x, t, 3, { mood: 'happy', look: [1, 0], pull: bump(t, 88.2, 0.6) })
  const S0 = CAFE.seats[0], S1 = CAFE.seats[1]
  star(x, t, { sign: 'leo', size: 220, x: S0.x, y: S0.y, seed: 7, walk: false, hops: H('leo'), moods: [[0, 'neutral', [1, 0]], [86.2, 'wide', [1, 0]], [87.4, 'happy', [1, 0]]] })
  star(x, t, { sign: 'gemini', size: 220, x: [[0, S1.x], [86.3, S1.x], [87.6, 1000]], y: [[0, S1.y], [86.3, S1.y], [86.6, LANE.feet]], seed: 8, hops: H('gemini'), moods: [[0, 'wink', [-1, 0]], [86.3, 'heart', [1, 0]]] })
  // Aries waves at the café window
  x.save(); x.beginPath(); x.rect(CAFE.window.x, CAFE.window.y, CAFE.window.w, CAFE.window.h); x.clip()
  drawSign(x, 'aries', CAFE.window.x + 300, standY(150, CAFE.window.y + CAFE.window.h + 10), 150, t, { mood: 'happy', look: [1, 0], hops: [84.2, 84.7, 85.2, 87.0], seed: 1 })
  x.restore()
  drawCafeTable(x, t, { cups: 2, pastry: null })
  const fl = prog(t, T.sign, T.sign + 0.35), sx = Math.cos(fl * Math.PI)
  x.save(); x.translate(540, 1268); x.scale(Math.max(0.05, Math.abs(sx)), 1); x.translate(-540, -1268)
  deskSign(x, t, fl < 0.5 ? 'ADVICE · FREE' : 'BACK IN AN HOUR · ON A DATE')
  x.restore()
  sparkles(x, t, 540, 1240, T.sign + 0.2, 10, 160, 9)
}

const S = makeSide({
  id: 'kxmle01', duration: 90, lastAt: 88.3,
  music: { style: 'funk', key: 'G', seed: 4801, hits: [19.0, 43.7, 65.6, 78.8] },
  hook: { text: 'Gives advice. | *Takes none.*' },
  rec: { at: 0.75, len: 1.4, caption: 'yep. that’s *Gemini.*', sub: 'the lane’s 24/7 advice line' },
  caught: { x: 820, y: 1010, r: 200, label: 'THEIR OWN TEXTS', arrow: 'bl' },
  promise: 'wait for Gemini’s *own* card',
  chapters: [
    { at: T.desk, title: 'the advice desk' }, { at: T.aptA, title: 'it goes sideways' },
    { at: T.adv + 0.1, title: 'the stars advise', y: 1215 }, { at: T.card, title: 'the answer' },
  ],
  scenes: [[0, hook], [T.desk, desk], [T.phone, phoneScene], [T.pis, pisAsk], [T.aptA, aptA], [T.notif, notifScene], [T.bench, (x, t) => bench(x, t, false)],
    [T.adv, (x, t) => bench(x, t, false)], [T.card, selfCard], [T.bench2, (x, t) => bench(x, t, true)], [T.end, ending]],
  boxes: BOXES,
  caps: [
    { text: 'The lane’s | *advice desk.*', at: 4.6, out: [8.6, 8.9], late: 2, lateAt: 5.1 },
    { text: 'Four months of | *“hanging out.”*', kicker: 'GEMINI’S PHONE', at: 14.1, out: [18.7, 18.95], late: 2, lateAt: 14.8 },
    { text: 'Just ask | *the question.*', at: 26.2, out: [30.4, 30.7], late: 2, lateAt: 26.8 },
    { text: 'My… | *Gemini?*', at: 43.9, out: [47.5, 47.8], size: 110, late: 1, lateAt: 44.2 },
    { text: 'Gemini’s turn | at the *desk.*', kicker: 'CLOSING TIME', at: 64.3, out: [66.6, 66.9], late: 1, lateAt: 64.9 },
    { text: '*Deal yourself* one.', at: 87.7, out: null, size: 104, late: 2, lateAt: 88.0 },
  ],
  advise: {
    at: T.adv, out: [63.55, 64.0],
    cards: [
      { at: 49.3, icon: 'chat', head: 'Your advice works on *you.*', body: 'Say what you’d tell a friend in your shoes.' },
      { at: 54.3, icon: 'question', head: 'Not knowing is *heavy.*', body: 'Comfy-but-unclear wears you down. You can ask.' },
      { at: 59.3, icon: 'heart', head: 'Ask it *plainly.*', body: '“I like you. What are we doing?”' },
    ],
    lines: [
      { t: 49.1, text: 'Gemini, this one’s *yours.*' },
      { t: 51.6, text: 'you’d tell a friend to *ask.* so…' },
      { t: 54.6, text: 'four months of maybe is *heavy.*' },
      { t: 57.2, text: 'you’re allowed to want *more.*' },
      { t: 59.6, text: 'one plain question. no *jokes.*' },
      { t: 61.6, text: 'then let them *answer.*' },
    ],
  },
  lesson: { at: T.lesson, out: [83.25, 83.5], text: 'Your advice | works on *you.*', chip: '+1 ANSWER (FINALLY)' },
  fx: [
    [loadingBar, { at: 27.0, len: 3.4, label: 'defining the relationship…', stallAt: 99, error: 'Error: too scared to ask', y: 900 }, loadingBarCues],
    [notification, { at: 34.3, out: [36.4, 36.7], title: 'texts', body: 'Aries: fries? *now?*', glyph: ARI.glyph, time: 'now' }, notificationCues],
  ],
  cues: [
    ...[0.1, 0.4, 0.7].map((a, i) => ['tick', a, 0.04]), ['pop', 2.3, 880, 0.03, 0.2],
    ['whoosh', T.desk, 0.4, 0.04], ...[5.6, 8.4, 11.3].flatMap(d => [['whoosh', d, 0.3, 0.035], ['tick', r3(d + 0.3), 0.05]]), ['glitter', 7.0, 7.5], ['glitter', 9.9, 10.4], ['whoosh', 7.7, 0.3, 0.03], ['whoosh', 10.6, 0.3, 0.03],
    ['whoosh', T.phone, 0.45, 0.05], ...[14.6, 15.1, 15.9, 16.4, 17.2, 17.7].map((a, i) => ['pop', a, i % 2 ? 987.77 : 659.25, 0.035, i % 2 ? 0.25 : -0.25]), ['pop', 18.9, 392, 0.05, -0.2], ['bell', 18.95, 523.25, 0.03, 1.2, 0],
    ...[19.4, 19.55, 19.7].map(a => ['tick', a, 0.02]),
    ['whoosh', T.pis, 0.35, 0.035], ['pop', 24.4, 1318.51, 0.04, 0.2], ['glitter', 24.4, 24.9],
    ['whoosh', T.aptA, 0.4, 0.04], ['pop', 31.2, 880, 0.035, -0.2], ['crash', 32.0, { gain: 0.012, len: 0.3 }], ['pop', 32.6, 880, 0.035, -0.2], ['crash', 33.4, { gain: 0.012, len: 0.3 }],
    ['pop', 35.0, 1318.51, 0.05, 0.1], ['glitter', 35.0, 35.6], ['pop', 35.6, 1174.66, 0.04, 0.3], ['tick', 38.6, 0.05], ['pop', 38.6, 392, 0.04, -0.3],
    ['whoosh', T.bench, 0.4, 0.04], ['pop', 44.0, 523.25, 0.05, 0.2], ['pluck', 46.2, 1567.98, 0.03, 0.5, -0.3],
    ['whoosh', T.card, 0.4, 0.04], ['whoosh', 64.8, 0.45, 0.04], ['pop', T.flip, 1318.51, 0.05, 0], ['bell', T.flip, 1975.5, 0.03, 1.4, 0], ['glitter', T.flip, 66.3], ['pop', 70.0, 987.77, 0.035, 0.2],
    ['whoosh', T.bench2, 0.4, 0.04], ['bell', 78.8, 1567.98, 0.035, 1.6, 0], ['glitter', 78.8, 79.6], ['pluck', 77.6, 1567.98, 0.03, 0.5, -0.3],
    ['whoosh', T.end, 0.4, 0.04], ['whoosh', T.sign, 0.3, 0.04], ['pop', 86.2, 1174.66, 0.05, 0], ['glitter', 86.2, 86.8], ['pluck', 88.2, 1567.98, 0.03, 0.5, -0.3],
  ],
})
export const { DURATION, SCENES, CUES, MUSIC, CHECK } = S
