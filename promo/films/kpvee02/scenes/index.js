// kpvee02 · Planet Talk: Venus to Taurus — "Who Feeds You?" (75 s vertical, long, star_advice, hard cut). lofi · Db.
// Venus's home sign: a heart-to-heart in four chapters, a promised payoff ("wait for Saturday"), a beat every ~8 s.
//   0.00  frame 0: Venus mid-burst in a rose-petal storm that has just blown the lid off Taurus's soup pot (lid in the
//         air, petals in the steam); slam "TAURUS. Who feeds *you?*"  2.9 "Wait for *Saturday.*"
//   5.4   ch1 THE GIVER: soup for everyone, a knitted scarf, everyone's favourite snack, a lift home. Venus: "in
//         astrology I rule you… and what you value." "So who feeds you?" Taurus: "…me? I'm easy."
//  24.8   ch2 THE BLIND SPOT: a text "what do YOU want to do this weekend?" → "oh I'm easy!" → loading bar
//         "naming one want… 4 %". Venus: "you know everyone's favourite snack. do you know yours?"
//  38.8   ch3 SPIN THE OTHER WAY: Venus spins backwards (true: Venus spins the opposite way to most planets). "Try the
//         other way: receiving." A talk card: "What's one thing you'd love someone to do for you?" Taurus: "I'd love
//         it if… you planned Saturday." Notification: "say less. Saturday's mine."
//  55.8   ch4 SATURDAY: a picnic someone else planned. The good half of the sandwich. "Just be here." Pisces sobs.
//         Achievement: received a sandwich. Venus: "Giving is gorgeous. Receiving is too."  73.6 last line. Hard cut 75.
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import { drawStarChar } from '../../startalk.js'
import { episode, panel, txt, rich, heart, sparkleBurst, phone, pop01, outK, win, sobCues, INK, ROSE, CREAM, GOLD, BONE, VRIM } from '../../kpvee01/venuskit.js'

const C = { ch1: 5.4, ch2: 24.8, ch3: 38.8, ch4: 55.8 }
const T = { spin: [39.0, 40.3], card: [46.3, 55.4], ask: 49.4, sat: 55.8, sand: 60.6, sob: 66.4, last: 73.6 }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

function petals(x, t) {
  const storm = 1 - ease.inQuad(prog(t, 1.2, 3.2))
  const n = Math.round(14 + 40 * storm)
  for (let k = 0; k < n; k++) {
    const sp = 0.3 + fr(k, 2) * 0.8 + storm * 2.4
    const px = ((fr(k, 1) * 1300 + t * 220 * sp) % 1300) - 110
    const py = ((fr(k, 3) * 2100 + t * 90 * sp + Math.sin(t * 2 + k) * 60) % 2100) - 90
    x.save(); x.translate(px, py); x.rotate(t * (1 + fr(k, 4) * 3) + k)
    x.globalAlpha = 0.45 + 0.5 * storm
    x.fillStyle = k % 3 ? ROSE : '#ffd0de'; x.strokeStyle = INK; x.lineWidth = 3
    x.beginPath(); x.ellipse(0, 0, 18 + fr(k, 5) * 10, 9 + fr(k, 6) * 5, 0, 0, Math.PI * 2); x.fill(); x.stroke()
    x.restore()
  }
}
function pot(x, t) {
  if (t > C.ch4 - 0.3) return
  const a = outK(t, [C.ch4 - 0.5, C.ch4 - 0.3])
  x.save(); x.globalAlpha *= a
  // steam
  x.strokeStyle = 'rgba(255,250,240,0.5)'; x.lineWidth = 10; x.lineCap = 'round'
  for (let k = 0; k < 3; k++) { x.beginPath(); for (let j = 0; j < 12; j++) { const yy = 1380 - j * 22, xx = 260 + k * 40 + Math.sin(t * 3 + j * 0.6 + k) * 14; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
  x.fillStyle = INK; x.beginPath(); x.roundRect(170, 1410, 260, 190, [10, 10, 60, 60]); x.fill()
  x.fillStyle = '#c0523f'; x.beginPath(); x.roundRect(180, 1420, 240, 170, [6, 6, 54, 54]); x.fill()
  x.fillStyle = '#ffb36b'; x.fillRect(180, 1420, 240, 24)
  x.fillStyle = INK; x.fillRect(140, 1450, 40, 18); x.fillRect(420, 1450, 40, 18)
  x.restore()
  // the lid: blown off at frame 0, lands back at 2.2
  const fly = prog(t, -0.35, 2.2)
  if (fly < 1) {
    const lx = lerp(300, 300, fly) - Math.sin(fly * Math.PI) * 260, ly = 1405 - Math.sin(fly * Math.PI) * 820, rot = fly * 9
    x.save(); x.translate(lx, ly); x.rotate(rot)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 140, 30, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d8d0e0'; x.beginPath(); x.ellipse(0, -2, 130, 22, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(-18, -42, 36, 24)
    x.restore()
  } else {
    x.save(); x.globalAlpha *= a; x.fillStyle = INK; x.beginPath(); x.ellipse(300, 1405, 140, 30, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#d8d0e0'; x.beginPath(); x.ellipse(300, 1403, 130, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(282, 1362, 36, 24); x.restore()
  }
}
const GIFTS = [
  { at: 7.0, label: 'soup for six', draw: (x) => { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI); x.fill(); x.fillStyle = '#ff9a4a'; x.fillRect(-56, -6, 112, 12) } },
  { at: 9.2, label: 'a knitted scarf', draw: (x) => { for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(-64 + k * 22 - 3, -40 + Math.sin(k) * 8 - 3, 26, 86); x.fillStyle = k % 2 ? ROSE : GOLD; x.fillRect(-64 + k * 22, -40 + Math.sin(k) * 8, 20, 80) } } },
  { at: 11.4, label: 'everyone’s fave snack', draw: (x) => { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d99a55'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#5a3420'; for (let k = 0; k < 6; k++) x.fillRect(Math.cos(k * 1.7) * 28 - 6, Math.sin(k * 2.3) * 26 - 6, 12, 12) } },
  { at: 13.6, label: 'a lift home', draw: (x) => { x.fillStyle = INK; x.beginPath(); x.roundRect(-74, -34, 148, 60, 18); x.fill(); x.fillStyle = '#7fd0ff'; x.beginPath(); x.roundRect(-66, -26, 132, 44, 14); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(-40, 30, 18, 0, 7); x.arc(40, 30, 18, 0, 7); x.fill() } },
]
function gifts(x, t) {
  if (t < GIFTS[0].at || t > C.ch2 + 0.2) return
  const o = outK(t, [C.ch2 - 0.4, C.ch2 - 0.1])
  GIFTS.forEach((g, i) => {
    const k = pop01(t, g.at, 0.35, 2.4) * o
    if (k <= 0.01) return
    const gx = 150 + i * 260, gy = 975
    panel(x, gx, gy, 210, 220, { fill: 'rgba(255,250,240,0.95)', rad: 22, s: k, rot: (i % 2 ? 0.05 : -0.05) })
    x.save(); x.translate(gx, gy - 30); x.scale(k, k); g.draw(x); x.restore()
    txt(x, g.label, gx, gy + 70, { size: 24, s: k, color: INK })
  })
  const tk = pop01(t, 15.6, 0.3) * o
  rich(x, 'GIVEN TODAY: *everything.*', 540, 1135, { size: 40, color: BONE, accent: ROSE, s: tk, stroke: INK })
}
function talkCard(x, t) {
  const k = pop01(t, T.card[0], 0.4, 1.8) * outK(t, [T.card[1], T.card[1] + 0.3])
  if (k <= 0.01) return
  const flip = ease.inOutCubic(prog(t, T.card[0] + 0.3, T.card[0] + 0.8))
  x.save(); x.translate(540, 1010); x.scale(k * Math.max(0.02, Math.abs(Math.cos(Math.PI * (1 - flip) / 1))) , k); x.rotate(-0.03)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-300, -170, 600, 340, 30); x.fill()
  x.fillStyle = flip < 0.5 ? '#3a1f5e' : '#2a1648'; x.beginPath(); x.roundRect(-290, -160, 580, 320, 24); x.fill()
  x.strokeStyle = GOLD; x.lineWidth = 4; x.beginPath(); x.roundRect(-270, -140, 540, 280, 16); x.stroke()
  if (flip >= 0.5) {
    txt(x, 'TALK CARD', 0, -100, { size: 24, color: GOLD, font: "700 24px 'Space Mono', monospace" })
    txt(x, 'What’s one thing you’d', 0, -30, { size: 44, color: BONE, weight: 700 })
    txt(x, 'love someone to', 0, 24, { size: 44, color: BONE, weight: 700 })
    txt(x, 'do for you?', 0, 80, { size: 50, color: ROSE, italic: true })
  } else txt(x, '♀', 0, 0, { size: 120, color: GOLD })
  x.restore()
}
function picnic(x, t) {
  const k = ease.outCubic(prog(t, T.sat, T.sat + 0.6))
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  // lanterns
  for (let i = 0; i < 6; i++) { const lx = 120 + i * 168, ly = 1060 + Math.sin(i * 1.3) * 30 + Math.sin(t * 1.5 + i) * 6; x.fillStyle = 'rgba(255,214,150,0.25)'; x.beginPath(); x.arc(lx, ly, 46, 0, 7); x.fill(); x.fillStyle = INK; x.fillRect(lx - 16, ly - 20, 32, 40); x.fillStyle = '#ffd27a'; x.fillRect(lx - 11, ly - 15, 22, 30) }
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 1010); for (let i = 0; i < 6; i++) x.lineTo(120 + i * 168, 1040 + Math.sin(i * 1.3) * 30); x.lineTo(1080, 1010); x.stroke()
  // blanket
  x.save(); x.beginPath(); x.moveTo(120, 1700); x.lineTo(960, 1700); x.lineTo(860, 1470); x.lineTo(220, 1470); x.closePath(); x.fillStyle = INK; x.fill(); x.clip()
  for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? ROSE : CREAM; x.fillRect(120 + i * 72, 1470 + j * 60, 72, 60) }
  x.restore()
  // basket
  x.fillStyle = INK; x.beginPath(); x.roundRect(630, 1500, 170, 110, 16); x.fill(); x.fillStyle = '#c98a4b'; x.beginPath(); x.roundRect(638, 1508, 154, 94, 12); x.fill()
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.arc(715, 1508, 60, Math.PI, 0); x.stroke()
  x.restore()
}
function sandwich(x, t) {
  const k = pop01(t, T.sand, 0.4, 2)
  if (k <= 0.01) return
  const mv = ease.inOutCubic(prog(t, T.sand + 0.5, T.sand + 1.3))
  const sx = lerp(720, 560, mv), sy = lerp(1310, 1470, mv)
  x.save(); x.translate(sx, sy); x.scale(k, k); x.rotate(-0.15)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-70, 50); x.lineTo(70, 50); x.lineTo(0, -70); x.closePath(); x.fill()
  x.fillStyle = '#f3d49a'; x.beginPath(); x.moveTo(-58, 42); x.lineTo(58, 42); x.lineTo(0, -56); x.closePath(); x.fill()
  x.fillStyle = '#7ccf6b'; x.fillRect(-50, 18, 100, 10); x.fillStyle = '#ff7a7a'; x.fillRect(-44, 28, 88, 8)
  x.restore()
  txt(x, 'THE GOOD HALF', sx, sy - 100, { size: 26, color: GOLD, alpha: clamp(k) * outK(t, [T.sand + 3.2, T.sand + 3.5]), font: "700 26px 'Space Mono', monospace", stroke: INK, sw: 6 })
}

const THEM = { x: 790, y: 1380, s: 240 }
const themHops = [59.9, 60.4, 61.0, 64.9, 65.4, 66.0]

const EP = episode({
  sign: 'taurus', dur: 75, ending: 'cut',
  enter: { kind: 'burst', at: -0.42, x: 540, y: 660, size: 450 },
  venus: [
    { t: 0, x: 540, y: 660, size: 450, mood: 'wide', look: [-0.3, 1] },
    { t: 1.6, mood: 'love', look: [0.2, 1] },
    { t: 8.0, mood: 'happy' },
    { t: 19.0, mood: 'sly', look: [0.2, 1] },
    { t: 25.0, mood: 'neutral', look: [0, 1] },
    { t: 33.0, mood: 'sad', look: [0.2, 1] },
    { t: 40.4, mood: 'happy', look: [0, 0.5] },
    { t: 49.4, mood: 'love', look: [0.2, 1] },
    { t: 56.4, d: 0.7, x: 840, y: 660, size: 300, mood: 'happy', look: [-1, 1] },
    { t: 66.4, mood: 'love' },
    { t: 70.0, mood: 'proud' },
    { t: 73.2, mood: 'love', look: [-0.6, 0.6] },
  ],
  signK: [
    { t: 0, x: 640, y: 1330, size: 290, mood: 'wide', look: [-0.3, -1] },
    { t: 2.4, mood: 'neutral', look: [-0.2, -1] },
    { t: 5.6, mood: 'happy', look: [0, 0] },
    { t: 19.1, mood: 'wide', look: [-0.2, -1], squash: 0.14, d: 0.2 },
    { t: 21.0, mood: 'squint', squash: 0, look: [0.4, 0] },
    { t: 27.0, mood: 'happy', look: [0, -0.4] },
    { t: 29.4, mood: 'wide', look: [0, -0.4] },
    { t: 35.8, mood: 'squint', look: [-0.4, -1] },
    { t: 44.0, mood: 'neutral', look: [-0.2, -0.6] },
    { t: 49.4, mood: 'wide', look: [0, -0.5] },
    { t: 51.2, mood: 'sparkle', look: [0, 0] },
    { t: 56.4, d: 0.7, x: 420, y: 1400, size: 260, mood: 'happy', look: [1, 0] },
    { t: 62.3, mood: 'wide', look: [1, 0] },
    { t: 64.8, mood: 'sparkle', look: [1, 0] },
    { t: 70.0, mood: 'happy', look: [0, 0] },
  ],
  pisK: [
    { t: 0, x: 925, y: 1570, size: 170, mood: 'wide', look: [-0.6, -1], tears: 1 },
    { t: 6, mood: 'sparkle', tears: 1 },
    { t: 19.3, mood: 'wide', tears: 2 },
    { t: 35.9, mood: 'wide', tears: 3 },
    { t: 40.0, mood: 'sparkle', tears: 2 },
    { t: 51.3, mood: 'happy', tears: 3 },
    { t: 56.3, d: 0.6, x: 160, y: 1560, size: 170, mood: 'sparkle', tears: 2 },
    { t: 66.4, mood: 'happy', tears: 3, d: 0.1 },
  ],
  bubbles: [
    { t0: 3.0, t1: 5.2, who: 'venus', text: 'Darling. We need to *talk.*', y: 1060 },
    { t0: 5.7, t1: 7.9, who: 'taurus', text: 'Soup’s ready! Who’s *hungry?*' },
    { t0: 8.2, t1: 10.8, who: 'venus', text: 'Look at you. Feeding the *whole street.*', y: 365 },
    { t0: 11.2, t1: 13.6, who: 'venus', text: 'In astrology I rule *you*, darling…', y: 365 },
    { t0: 13.8, t1: 16.2, who: 'venus', text: '…and I rule what you *value.*', y: 365 },
    { t0: 16.5, t1: 18.8, who: 'taurus', text: 'I value *everyone* being fed!' },
    { t0: 19.0, t1: 21.2, who: 'venus', text: 'So who feeds *you?*', y: 365, size: 60 },
    { t0: 21.5, t1: 24.2, who: 'taurus', text: '…me? Oh, I’m *easy.*' },
    { t0: 33.2, t1: 35.6, who: 'venus', text: 'You know everyone’s *favourite* snack.', y: 365 },
    { t0: 35.8, t1: 38.0, who: 'venus', text: 'Do you know *yours?*', y: 365, size: 60 },
    { t0: 36.6, t1: 38.4, who: 'pisces', text: 'I don’t know mine *either*', x: 600 },
    { t0: 40.5, t1: 43.4, who: 'venus', text: 'I spin the *opposite* way to most planets.', y: 365 },
    { t0: 43.6, t1: 46.0, who: 'venus', text: 'So try the other way: *receiving.*', y: 365 },
    { t0: 47.0, t1: 49.1, who: 'venus', text: 'Read it out loud, darling.', y: 365 },
    { t0: 49.4, t1: 52.5, who: 'taurus', text: 'I’d love it if… you planned *Saturday.*' },
    { t0: 59.8, t1: 62.1, who: 'them', text: 'Sit. I’ve got *everything.*', x: 620, y: 1120, tail: 160, tailUp: false, color: '#7fc8ff' },
    { t0: 62.4, t1: 64.6, who: 'taurus', text: 'I don’t have to *do* anything?', x: 520, y: 1790, tail: -100 },
    { t0: 64.8, t1: 66.9, who: 'them', text: 'Nope. Just *be* here.', x: 620, y: 1120, tail: 160, tailUp: false, color: '#7fc8ff' },
    { t0: 67.0, t1: 69.4, who: 'pisces', text: 'they’re being *FED*', x: 460, y: 1800, tail: -260 },
    { t0: 70.0, t1: 72.8, who: 'venus', text: 'Giving is gorgeous. *Receiving* is too.', x: 540, y: 365, tail: 220, tailUp: false },
  ],
  fx: [
    ['slamTitle', { at: -1, text: 'TAURUS. | Who feeds *you?*', top: 210, size: 116, out: [2.6, 2.8] }],
    ['whipZoom', { at: 0.15, from: 1.45, len: 0.45 }],
    ['screenShake', { at: 0.2, len: 0.5, amp: 24 }],
    ['slamTitle', { at: 2.9, text: 'Wait for | *Saturday.*', top: 1760 - 1760 + 230, size: 100, out: [4.95, 5.15], accentColor: ROSE }],
    ['chapter', { at: C.ch1, out: [C.ch2 - 0.3, C.ch2 - 0.1], n: 1, title: 'THE GIVER', y: 160 }],
    ['chapter', { at: C.ch2, out: [C.ch3 - 0.3, C.ch3 - 0.1], n: 2, title: 'THE BLIND SPOT', y: 160 }],
    ['loadingBar', { at: 29.4, len: 3.5, label: 'naming one want…', stallAt: 4, error: 'Error: never asked before', y: 1000 }],
    ['chapter', { at: C.ch3, out: [C.ch4 - 0.3, C.ch4 - 0.1], n: 3, title: 'SPIN THE OTHER WAY', y: 160 }],
    ['slamTitle', { at: T.spin[0] + 0.1, text: '↺ *Backwards*, darling.', top: 250, size: 100, out: [40.25, 40.45], accentColor: ROSE }],
    ['notification', { at: 52.9, out: [55.3, 55.6], title: 'texts', body: 'them: say less. *Saturday’s mine.*', glyph: '♉' }],
    ['chapter', { at: C.ch4, out: [72.9, 73.1], n: 4, title: 'SATURDAY', y: 160 }],
    ['slamTitle', { at: 56.6, text: 'Planned by | *someone else.*', top: 240, size: 96, out: [59.3, 59.5], accentColor: ROSE }],
    ['achievement', { at: 67.4, out: [69.7, 70.0], text: '*received* a sandwich', y: 1130 }],
    ['slamTitle', { at: T.last, text: 'You’re worth a | *Saturday,* too.', top: 240, size: 104 }],
  ],
  back(x, t) { petals(x, t); picnic(x, t) },
  mid(x, t, S) {
    pot(x, t); gifts(x, t)
    // the phone (ch2)
    const pk = pop01(t, 25.1, 0.4, 1.8) * outK(t, [29.0, 29.3])
    if (pk > 0.01) phone(x, t, { cx: 540, cy: 1000, w: 560, h: 520, s: 0.95 * pk, title: 'them', msgs: [{ at: 25.6, side: 'L', text: 'what do YOU want to do this weekend?' }, { at: 27.0, side: 'R', text: 'oh I’m easy!' }, { at: 28.2, side: 'L', text: 'you always say that' }] })
    talkCard(x, t)
    // them (ch4)
    const tk = pop01(t, 57.2, 0.4, 2)
    if (tk > 0.01) drawStarChar(x, THEM.x, THEM.y, THEM.s, t, { color: '#7fc8ff', mood: t > 66.9 ? 'happy' : t > 60.4 ? 'happy' : 'wink', look: [-1, 0], pop: tk, hops: themHops, seed: 12 })
    void S
  },
  front(x, t, S) {
    sandwich(x, t)
    sparkleBurst(x, t, S.sign.x, S.sign.y, 51.2, { R: 280 })
    sparkleBurst(x, t, 540, 1010, T.card[0] + 0.55, { R: 340, n: 16 })
    if (t > 64.8 && t < 73) { for (let k = 0; k < 6; k++) { const ph = ((t - 64.8) * 0.5 + k / 6) % 1; heart(x, 600 + Math.sin(k * 2.1 + t) * 220, 1320 - ph * 420, 22 * (1 - ph * 0.4), { alpha: (1 - ph) * outK(t, [72.6, 73]) }) } }
    // Venus spins backwards (ch3): a big ↺ arrow behind the beat
    if (t > T.spin[0] && t < T.spin[1] + 0.3) { const a = win(t, T.spin[0], T.spin[1]); x.save(); x.globalAlpha *= a; x.strokeStyle = ROSE; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.arc(S.venus.x, S.venus.y, S.venus.size * 0.62, -0.4 - t * 3, -0.4 - t * 3 - 4.2, true); x.stroke(); x.restore() }
  },
  cues: [
    ...GIFTS.map((g, i) => ['pop', g.at, [880, 987.77, 1108.73, 1318.51][i], 0.05, (i - 1.5) * 0.3]),
    ['bell', 15.6, 1760, 0.03, 0.8, 0],
    ['whoosh', 25.1, 0.4, 0.04], ['pop', 25.6, 880, 0.04, -0.2], ['pop', 27.0, 660, 0.04, 0.2], ['pop', 28.2, 880, 0.04, -0.2],
    ['riser', T.spin[0], T.spin[1], 0.06], ['whoosh', T.spin[0] + 0.3, 0.6, 0.08], ['glitter', T.spin[1] - 0.2, T.spin[1] + 0.3],
    ['whoosh', T.card[0], 0.4, 0.05], ['tick', T.card[0] + 0.55, 0.05], ['glitter', T.card[0] + 0.55, T.card[0] + 1.0],
    ['bell', 51.2, 1760, 0.04, 1.2, 0], ['glitter', 51.2, 51.8], ...sobCues(51.4, 3),
    ['whoosh', T.sat - 0.1, 0.6, 0.06], ['bell', T.sat + 0.3, 1174.66, 0.03, 1.4, 0],
    ['pop', 57.2, 784, 0.04, 0.3], ['pop', T.sand, 1318.51, 0.04, 0.3], ['whoosh', T.sand + 0.5, 0.4, 0.04],
    ...sobCues(T.sob, 5),
  ],
})
export const { DURATION, SCENES, CUES } = EP
