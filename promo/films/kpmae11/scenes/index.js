// kpmae11: PLANET TALK: MARS, Ep 11 · ♒ Aquarius · "Label it, nerd" (24 s vertical, star_talk, chiptune · G). Hard cut.
// Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-bounce off the ceiling (squashed flat against it) with a label maker, a label mid-print
//        ("DO YOU LIKE TH—"); ♒ Aquarius on a beanbag mid-"I don't do labels." Hook: "AQUARIUS. Okay, but do you LIKE them?"
//   1.8  Mars: "Same hoodie. Inside jokes. 4 a.m. chats."  (three ✓ stamps on the pair)   4.6 Aquarius: "we're just… vibes."
//   6.8  Mars: "Vibes are great. Clear is better."   9.2 "You don't need MY label. Type your own."
//  12.0  Aquarius prints "I LIKE YOU" and sticks it on ♌'s hoodie.   14.4 ♌ prints one back: "SAME".
//  16.2  ♌: "labels are cute, actually."   18.2 ♓ Pisces pops in wearing a label that says CRYING. "I made one too."
//  20.6  Mars: "A genius who says it plainly? Iconic."   22.6 "Unusual? Sure. Unclear? No."  Cut at 24.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, dust, flash, hearts, rr, stamp,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 24
const T = { fall: [0, 0.55], land: 0.55, ev: [2.0, 2.8, 3.6], hand: [11.6, 12.0], print1: [12.2, 13.4], stick1: [13.6, 14.1], print2: [14.6, 15.4], stick2: [15.6, 16.0], pis: 18.2 }
const BUB = [
  { t0: -1, t1: 1.6, x: 420, y: 1110, who: 'aquarius', text: 'I don’t do *labels.*', tail: -100, tailUp: false },
  { t0: 1.8, t1: 4.4, x: 520, y: 1160, who: 'mars', text: 'Same hoodie. Inside jokes. *4 a.m.* chats.', tail: 220, tailUp: true },
  { t0: 4.6, t1: 6.6, x: 440, y: 1110, who: 'aquarius', text: 'we’re just… *vibes.*', tail: -100, tailUp: false },
  { t0: 6.8, t1: 9.0, x: 520, y: 1050, who: 'mars', text: 'Vibes are great. Clear is *better.*', tail: 220, tailUp: true },
  { t0: 9.2, t1: 11.6, x: 520, y: 1050, who: 'mars', text: 'You don’t need MY label. Type your *own.*', tail: 220, tailUp: true },
  { t0: 16.2, t1: 18.0, x: 620, y: 1110, who: 'leo', text: 'labels are *cute,* actually.', tail: 120, tailUp: false },
  { t0: 18.5, t1: 20.4, x: 560, y: 1780, who: 'pisces', text: 'I made one *too.*', tail: 300, tailUp: true },
  { t0: 20.6, t1: 22.4, x: 520, y: 1050, who: 'mars', text: 'A genius who says it *plainly?* Iconic.', tail: 220, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.45, amp: 24 }

function room(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#0e2236'); g.addColorStop(0.75, '#16344a'); g.addColorStop(0.76, '#2a1d4a'); g.addColorStop(1, '#1a1030'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // ceiling beam + lamp strips
  x.fillStyle = '#0a1828'; x.fillRect(0, 0, 1080, 130); x.fillStyle = '#8fe6e8'; x.globalAlpha = 0.7; x.fillRect(0, 126, 1080, 6); x.globalAlpha = 1
  // posters: circuits, a planet with a sideways ring (Uranus, the Aquarius ruler, is tilted on its side)
  x.fillStyle = '#20405a'; rr(x, 70, 260, 220, 300, 12); x.fill(); x.strokeStyle = '#8fe6e8'; x.lineWidth = 4
  for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(100, 300 + i * 50); x.lineTo(180, 300 + i * 50); x.lineTo(200, 320 + i * 50); x.lineTo(260, 320 + i * 50); x.stroke() }
  x.fillStyle = '#20405a'; rr(x, 820, 300, 200, 240, 12); x.fill(); x.fillStyle = '#8fe6e8'; x.beginPath(); x.arc(920, 420, 50, 0, Math.PI * 2); x.fill(); x.strokeStyle = '#bff3f5'; x.lineWidth = 6; x.beginPath(); x.ellipse(920, 420, 18, 85, 0.1, 0, Math.PI * 2); x.stroke()
  // beanbags
  x.fillStyle = '#3fb3c4'; x.beginPath(); x.ellipse(330, 1540, 220, 110, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e3a03a'; x.beginPath(); x.ellipse(730, 1550, 210, 105, 0, 0, Math.PI * 2); x.fill()
}
function labelMaker(x, X, Y, rot = 0, s = 1) {
  x.save(); x.translate(X, Y); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; rr(x, -70, -50, 140, 100, 18); x.fill(); x.fillStyle = '#ffb431'; rr(x, -62, -42, 124, 84, 14); x.fill()
  x.fillStyle = '#1b1236'; rr(x, -46, -30, 92, 28, 6); x.fill(); x.fillStyle = '#7dffb0'; x.font = `700 16px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LABEL', 0, -16)
  for (let i = 0; i < 6; i++) { x.fillStyle = '#fff'; x.fillRect(-46 + i * 16, 10, 12, 10) }
  x.restore()
}
function strip(x, text, X, Y, n, rot = 0, col = CREAM) {
  const s = text.slice(0, Math.max(0, Math.floor(n)))
  x.save(); x.translate(X, Y); x.rotate(rot)
  x.font = `800 40px ${MONO}`; const w = x.measureText(text).width + 40
  x.fillStyle = col; rr(x, 0, -30, Math.max(30, x.measureText(s).width + 40), 60, 6); x.fill()
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(s, 20, 2)
  x.restore(); void w
}

function draw(x, t, K) {
  room(x, t)
  // the pair on the beanbags
  const am = t < 1.8 ? 'neutral' : t < 6.6 ? 'squint' : t < 12 ? 'wide' : t < T.stick2[0] ? 'happy' : 'heart'
  const A = { x: 330, y: 1400 }, L = { x: 730, y: 1410 }
  drawSign(x, 'aquarius', A.x, A.y, 270, t, { mood: am, look: t < 12 ? [0.4, -1] : [1, 0], hops: [0.15, 0.6, 4.7, 5.2, 12.3, 12.8, 16.1, 16.5], seed: 3 })
  drawSign(x, 'leo', L.x, L.y, 250, t, { mood: t < T.stick1[1] ? 'happy' : t < 16 ? 'wide' : 'heart', look: [-1, 0], hops: [14.2, 14.6, 16.3, 16.8, 17.3], seed: 6 })
  // matching hoodie stripes
  for (const P of [A, L]) { x.fillStyle = '#ff5c8e'; x.globalAlpha = 0.85; rr(x, P.x - 60, P.y + 40, 120, 16, 8); x.fill(); x.globalAlpha = 1 }
  // the evidence stamps
  ;['SAME HOODIE ✓', 'INSIDE JOKES ✓', '4 A.M. CHATS ✓'].forEach((s, i) => { if (t > T.ev[i] && t < 6.7) stamp(x, t, T.ev[i], s, [240, 840, 540][i], [840, 840, 960][i], { size: 40, col: '#7dffb0', rot: [-0.12, 0.1, -0.05][i] }) })
  // labels: printed, then stuck on
  if (t > T.print1[0]) {
    const n = (t - T.print1[0]) / (T.print1[1] - T.print1[0]) * 10
    const sk = ease.inOutCubic(prog(t, ...T.stick1))
    strip(x, 'I LIKE YOU', lerp(A.x + 60, L.x - 120, sk), lerp(A.y - 210, L.y + 20, sk), n, lerp(0, -0.12, sk))
  }
  if (t > T.print2[0]) {
    const n = (t - T.print2[0]) / (T.print2[1] - T.print2[0]) * 4
    const sk = ease.inOutCubic(prog(t, ...T.stick2))
    strip(x, 'SAME', lerp(L.x - 40, A.x - 70, sk), lerp(L.y - 210, A.y + 20, sk), n, lerp(0, 0.1, sk), '#ffe27a')
    labelMaker(x, L.x + 10, L.y - 150, -0.2, 0.8 * (1 - prog(t, 16.4, 16.7)))
  }
  hearts(x, t, T.stick1[1], L.x, L.y - 60, { n: 10 }); hearts(x, t, T.stick2[1], A.x, A.y - 60, { n: 10, seed: 8 })
  // Pisces, wearing its own label
  if (t > T.pis) {
    const k = ease.outBack(prog(t, T.pis, T.pis + 0.4))
    pisces(x, t, lerp(1250, 930, k), 1640, 200, { look: [-1, -0.5], hops: [18.6, 19.0, 19.4, 19.8, 20.2], squash: 0.05 * Math.sin(t * 22) })
    strip(x, 'CRYING', lerp(1250, 930, k) - 90, 1720, 6, -0.1, '#8fd0ff')
  }
  // Mars: bounces off the ceiling, then holds out the label maker
  let mx = 760, my = 640, sq = 0, rot = 0
  if (t < T.land) { const p = prog(t, ...T.fall); my = lerp(318, 640, ease.inQuad(p)); sq = p < 0.08 ? 0.3 : -0.12 * p; rot = 0.5 * (1 - p) }
  else { const d = t - T.land; sq = 0.22 * Math.exp(-d * 8) * Math.cos(d * 22); my = 640 - 60 * Math.abs(Math.sin(d * 7)) * Math.exp(-d * 5) }
  if (t < T.land + 0.5) dust(x, t, -0.3, 760, 140, { R: 300, up: -0.4, seed: 12, life: 1.0 })
  const mm = t < 1.8 ? 'angry' : t < 6.8 ? 'sly' : t < 12 ? 'happy' : t < 18.2 ? 'love' : 'proud'
  K.mars(mx, my, 360, { rot, squash: sq, mood: mm, look: [-1, 1], hops: [1.9, 2.5, 3.2, 6.9, 7.5, 9.3, 9.9, 10.6, 20.7, 21.3] })
  // the label maker in Mars's "hand", then handed to Aquarius
  const hd = ease.inOutCubic(prog(t, ...T.hand))
  if (t < T.print2[0]) {
    const lx = lerp(mx - 230, A.x, hd), ly = lerp(my + 80, A.y - 150, hd)
    labelMaker(x, lx, ly, lerp(-0.3, 0.1, hd), 1)
    if (t < T.hand[0]) strip(x, 'DO YOU LIKE TH—', lx + 60, ly - 6, t < 0.8 ? 13 : 15, -0.05)
  }
}
function over(x, t) { flash(x, t, T.land, { col: '#bff3f5', d: 0.2, a: 0.5 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae11', duration: D, end: 'cut',
  hook: { at: -1, text: 'AQUARIUS. Okay, but | do you *LIKE* them?', out: [1.7, 1.85], top: 780, size: 100 },
  bubbles: BUB, draw, over,
  overlays: [screenShake({ at: 0.0, len: 0.3, amp: 30, seed: 2 }), screenShake(SHAKE)],
  last: { at: 22.6, text: 'Unusual? Sure. | *Unclear?* No.', top: 880 },
  cues: [
    ...shakeCues({ at: 0.0, len: 0.3 }), ['boom', 0.0, 0.2], ...shakeCues(SHAKE), ['whoosh', 0.05, 0.45, 0.05],
    ...T.ev.map((e, i) => popCue(e, 880 + i * 110, 0.04, 0)),
    ['whoosh', T.hand[0], 0.35, 0.03],
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.print1[0] + i * 0.12).toFixed(2), 0.03]), ['whoosh', T.stick1[0], 0.3, 0.03], ['pop', T.stick1[1], 1174.66, 0.04, 0.3],
    ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.print2[0] + i * 0.2).toFixed(2), 0.03]), ['whoosh', T.stick2[0], 0.3, 0.03], ['pop', T.stick2[1], 1318.51, 0.04, -0.3],
    ['glitter', T.stick2[1], T.stick2[1] + 0.8],
    ['whoosh', T.pis, 0.3, 0.03], ...sobCues(18.6, 4), ...sobCues(19.8, 3),
  ],
})
