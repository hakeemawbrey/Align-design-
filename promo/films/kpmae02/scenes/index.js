// kpmae02: PLANET TALK: MARS, Ep 2 · ♉ Taurus · "Four months of maybe" (28 s vertical, star_advice, lofi · Eb).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-skid across a cosy living-room rug (dust, rug rucked up), a cushion mid-air, ♉ Taurus
//        mid-bite of cake on the couch. Hook: "TAURUS. Four months of 'maybe'?"   0.35 Mars stops (shake, flash).
//   1.0  Mars: "FOUR months of hanging out and nobody's said anything?"
//   3.8  a wall calendar flips: month 1 · 2 · 3 · 4, "hanging out" every time (the last: "a LOT").
//   6.8  Taurus: "I like it slow. slow is cosy."   9.6 Mars tries to sit still (vibrating): "Slow is FINE. I'm very calm."
//  12.4  Mars: "But unsaid isn't slow. It's just unsaid."   15.2 "One sentence. Your pace. Say what you want."
//  18.0  the phone. Taurus: "okay. one sentence."   19.6 sent: "I like you. like, dating like you."
//  21.2  reply: "oh thank goodness. me too."   21.8 ♓ Pisces, face on the window, sobbing: "I KNEW it."
//  24.4  the line slams: "Slow is fine. Silent isn't."   27.6 → 28.0 loop back into frame 0.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, dust, phone, stamp, flash, hearts, rr, txt,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues } from '../../hookkit.js'

const D = 28
const IN = { at: -0.42, x: 760, y: 1170, size: 420 }
const T = { land: 0.35, cal: [3.8, 6.6], phone: [18.0, 18.4], send: 19.6, typing: [20.2, 21.2], reply: 21.2, pis: 21.8, phoneOut: [24.0, 24.35] }
const BUB = [
  { t0: 1.0, t1: 3.6, x: 540, y: 700, who: 'mars', text: 'FOUR months of hanging out and nobody’s *said* anything?', tail: 200 },
  { t0: 6.8, t1: 9.4, x: 540, y: 820, who: 'taurus', text: 'I like it *slow.* Slow is cosy.', tail: -170 },
  { t0: 9.6, t1: 12.2, x: 540, y: 760, who: 'mars', text: 'Slow is FINE. Slow is great. I’m *very* calm.', tail: 200, shake: 3 },
  { t0: 12.4, t1: 15.0, x: 540, y: 760, who: 'mars', text: 'But *unsaid* isn’t slow. It’s just unsaid.', tail: 200 },
  { t0: 15.2, t1: 17.8, x: 540, y: 760, who: 'mars', text: 'One sentence. Your pace. Say what you *want.*', tail: 200 },
  { t0: 18.5, t1: 19.5, x: 380, y: 1640, who: 'taurus', text: 'okay. *one* sentence.', tail: -60, tailUp: true, size: 42 },
  { t0: 21.9, t1: 24.1, x: 540, y: 1660, who: 'pisces', text: 'I KNEW it. I’m *so* happy.', tail: -330, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.45, amp: 24 }
const MONTHS = ['hanging out', 'hanging out', 'hanging out', 'hanging out (a LOT)']

function room(x, t) {
  const g = x.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, '#2b1838'); g.addColorStop(0.62, '#4a2a3e'); g.addColorStop(0.63, '#5a3328'); g.addColorStop(1, '#3a2018')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // wallpaper dots
  x.fillStyle = 'rgba(255,220,180,0.06)'
  for (let i = 0; i < 9; i++) for (let j = 0; j < 14; j++) { x.beginPath(); x.arc(60 + i * 120 + (j % 2) * 60, 80 + j * 85, 6, 0, Math.PI * 2); x.fill() }
  // window (night, stars) top-left
  x.fillStyle = '#120a2e'; rr(x, 70, 470, 300, 330, 18); x.fill()
  x.fillStyle = '#fff6dc'; for (let i = 0; i < 12; i++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); x.globalAlpha = a; x.fillRect(90 + (i * 97) % 260, 490 + (i * 53) % 290, 5, 5) } x.globalAlpha = 1
  x.strokeStyle = '#7a4a36'; x.lineWidth = 16; rr(x, 70, 470, 300, 330, 18); x.stroke(); x.beginPath(); x.moveTo(220, 470); x.lineTo(220, 800); x.moveTo(70, 635); x.lineTo(370, 635); x.stroke()
  // lamp glow
  const lg = x.createRadialGradient(900, 900, 0, 900, 900, 520); lg.addColorStop(0, 'rgba(255,200,130,0.28)'); lg.addColorStop(1, 'rgba(255,200,130,0)'); x.fillStyle = lg; x.fillRect(300, 380, 780, 1100)
  x.fillStyle = '#f2c75c'; x.beginPath(); x.moveTo(850, 760); x.lineTo(950, 760); x.lineTo(980, 840); x.lineTo(820, 840); x.closePath(); x.fill()
  x.fillStyle = '#6a4030'; x.fillRect(895, 840, 10, 360)
}
function rug(x, t) {
  const ruck = 1 - ease.outCubic(prog(t, -0.4, T.land + 0.3))
  x.save(); x.translate(540, 1690)
  x.fillStyle = '#a8433a'; x.beginPath(); x.ellipse(0, 0, 470, 120, 0, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#f2c75c'; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 0, 420, 98, 0, 0, Math.PI * 2); x.stroke()
  if (ruck > 0.01) { x.fillStyle = '#8c362f'; for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(160 + i * 70, -20, 30, 50 * ruck, 0.3, 0, Math.PI * 2); x.fill() } }
  x.restore()
}
function couch(x) {
  x.fillStyle = '#5b4a8a'; rr(x, 90, 1260, 560, 230, 60); x.fill()
  x.fillStyle = '#6c5aa0'; rr(x, 120, 1380, 500, 140, 40); x.fill()
  x.fillStyle = '#4a3a74'; rr(x, 60, 1330, 90, 220, 40); x.fill(); rr(x, 590, 1330, 90, 220, 40); x.fill()
  x.fillStyle = '#2a1d4a'; x.fillRect(110, 1550, 26, 50); x.fillRect(610, 1550, 26, 50)
}
function cake(x, t, X, Y, bite) {
  x.fillStyle = '#fffaf0'; x.beginPath(); x.ellipse(X, Y + 30, 90, 22, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f7d9a8'; x.beginPath(); x.moveTo(X - 60, Y + 20); x.lineTo(X + 50, Y + 20); x.lineTo(X + 50 - bite * 30, Y - 40); x.lineTo(X - 60, Y - 40); x.closePath(); x.fill()
  x.fillStyle = '#ff8fb1'; x.fillRect(X - 60, Y - 52, 110 - bite * 30, 16)
  x.fillStyle = '#e5573b'; x.beginPath(); x.arc(X - 10, Y - 62, 12, 0, Math.PI * 2); x.fill()
}

function draw(x, t, K) {
  room(x, t)
  rug(x, t)
  // the calendar on the wall
  if (t > T.cal[0] - 0.3 && t < T.cal[1] + 0.6) {
    const k = pop01(t, T.cal[0] - 0.3, 0.3, 2) * outK(t, [T.cal[1] + 0.2, T.cal[1] + 0.5])
    const i = clamp(Math.floor((t - T.cal[0]) / 0.7), 0, 3)
    const flip = (t - T.cal[0]) % 0.7
    x.save(); x.translate(560, 760); x.scale(k, k); x.rotate(-0.03)
    x.fillStyle = INK; rr(x, -250, -230, 500, 460, 26); x.fill()
    x.fillStyle = '#fffaf0'; rr(x, -240, -220, 480, 440, 20); x.fill()
    x.fillStyle = RED; rr(x, -240, -220, 480, 110, 20); x.fill(); x.fillRect(-240, -140, 480, 30)
    x.fillStyle = '#fff'; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`MONTH ${i + 1}`, 0, -160)
    x.fillStyle = INK; x.font = `800 ${i === 3 ? 44 : 52}px ${INTER}`; x.fillText(MONTHS[i], 0, 20)
    x.fillStyle = '#9a8fb0'; x.font = `700 30px ${MONO}`; x.fillText('status: ???', 0, 120)
    if (flip < 0.18 && t > T.cal[0] + 0.1 && i > 0) { x.fillStyle = '#efe6d6'; x.globalAlpha = 1 - flip / 0.18; x.fillRect(-240, -110, 480, 330 * (1 - flip / 0.18)) }
    x.restore()
  }
  couch(x)
  // Taurus on the couch with cake
  const tm = t < 1.0 ? 'wide' : t < 6.6 ? 'squint' : t < 9.4 ? 'happy' : t < 18 ? 'neutral' : t < T.send ? 'wide' : t < T.reply ? 'squint' : 'heart'
  const bite = clamp(Math.floor(t / 4) * 0.25, 0, 1)
  drawSign(x, 'taurus', 360, 1290, 270, t, { mood: tm, look: t < 3.6 ? [1, 0] : t < 18 ? [1, -0.4] : [0.4, -1], hops: [6.9, 7.4, 7.9, 18.6, 19.0, T.reply + 0.1, T.reply + 0.5], squash: t < 0.4 ? 0.12 : 0 })
  if (t < T.phone[0]) cake(x, t, 520, 1380, bite)
  // the cushion, mid-air at frame 0
  if (t < 1.4) {
    const p = prog(t, -0.6, 1.2)
    const cx = lerp(560, 230, p), cy = 1200 - Math.sin(p * Math.PI) * 600
    x.save(); x.translate(cx, cy); x.rotate(t * 7); x.fillStyle = GOLD; rr(x, -70, -55, 140, 110, 30); x.fill(); x.fillStyle = '#d9a83c'; x.beginPath(); x.arc(0, 0, 10, 0, Math.PI * 2); x.fill(); x.restore()
  }
  // Mars: skids in, then tries (and fails) to sit still on the arm of the couch
  const P = entrance('slide', t, IN)
  drawEntranceFx(x, 'mars', 'slide', t, IN)
  dust(x, t, -0.5, 900, 1500, { R: 360, life: 1.3, up: 0.5, seed: 4 })
  const fidget = t > 9.6 && t < 12.2 ? Math.sin(t * 40) * 6 : 0
  const mm = t < 3.6 ? 'angry' : t < 9.4 ? 'wide' : t < 12.2 ? 'neutral' : t < 18 ? 'happy' : t < T.reply ? 'wide' : 'proud'
  K.mars(P.x + fidget, P.y, P.size, { rot: P.rot, squash: P.squash + (fidget ? 0.04 * Math.sin(t * 33) : 0), alpha: P.alpha, mood: mm, look: [-1, 0.2], sweat: t > 9.6 && t < 12.2, hops: [1.1, 1.6, 2.2, 12.5, 13.1, 15.3, 15.9, 16.6] })
  // Pisces at the window
  if (t > T.pis - 0.1) {
    const k = pop01(t, T.pis, 0.35, 2) * outK(t, [26.8, 27.3])
    x.save(); x.beginPath(); x.rect(78, 478, 284, 314); x.clip()
    pisces(x, t, 220, lerp(900, 650, k), 220, { look: [1, 1], hops: [22.0, 22.4, 22.8, 23.2], squash: 0.06 * Math.sin(t * 20) })
    x.restore()
  }
  // the phone
  const pk = ease.outBack(prog(t, ...T.phone)) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
  if (pk > 0.01) {
    phone(x, t, { cx: 640, cy: 800, w: 520, h: 560, k: pk, rot: 0.03, title: '♉︎ → them', size: 34, typing: T.typing,
      msgs: [{ at: T.send, side: 'R', text: 'I like you. like, dating like you.' }, { at: T.reply, side: 'L', text: 'oh thank goodness. me too.' }] })
    if (t > T.send) stamp(x, t, T.send, 'SAID IT', 700, 1010, { size: 54, col: RED })
    hearts(x, t, T.reply + 0.05, 360, 1200, { n: 12 })
  }
}
function over(x, t) { flash(x, t, T.land, { col: '#ffd0b0', d: 0.2, a: 0.6 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae02', duration: D, end: 'loop',
  hook: { at: -1, text: 'TAURUS. Four months | of *‘maybe’?*', out: [3.5, 3.7] },
  bubbles: BUB, draw, over,
  overlays: [screenShake(SHAKE)],
  last: { at: 24.4, text: 'Slow is fine. | *Silent* isn’t.', top: 250 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('slide', IN), ['whoosh', 0.05, 0.6, 0.04],
    ...[0, 1, 2, 3].map(i => ['whoosh', +(T.cal[0] + i * 0.7).toFixed(2), 0.18, 0.025]), ...[0, 1, 2, 3].map(i => popCue(T.cal[0] + i * 0.7 + 0.05, 659.25 + i * 110, 0.03, 0)),
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(9.7 + i * 0.25).toFixed(2), 0.015]),
    ['whoosh', T.phone[0], 0.35, 0.03], ...thud(T.send), popCue(T.send, 880, 0.04, 0.2),
    ['tick', 20.3, 0.02], ['tick', 20.45, 0.02], ['tick', 20.6, 0.02],
    popCue(T.reply, 1318.51, 0.05, -0.2), popCue(T.reply + 0.07, 1567.98, 0.04, -0.2), ['glitter', T.reply, T.reply + 0.8],
    popCue(T.pis, 987.77, 0.04, -0.5), ...sobCues(22.1, 4), ...sobCues(23.4, 3),
    ['whoosh', T.phoneOut[0], 0.35, 0.03],
  ],
})
