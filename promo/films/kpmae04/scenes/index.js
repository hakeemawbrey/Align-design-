// kpmae04: PLANET TALK: MARS, Ep 4 · ♋ Cancer · "You can go first" (30 s vertical, star_advice, dreamy · Db).
// Loops back to frame 0. Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-crash onto ♋ Cancer's sea-side porch, planks jumping, mouth wide mid-shout.
//        Hook: "Cancer. You're allowed to go first."   0.1 lands (shake).   0.9 Mars: "CANCER! YOU—"
//   2.0  record scratch, freeze: "okay. inside voice."   3.8 Mars whispers: "(whispering) you're allowed to go first."
//   6.6  Cancer: "but if I go first and they don't feel the same… I'll crumble."
//  10.0  the waiting counter: DAY 1 → DAY 47 ("waiting for them to make the move"). Mars: "how long have you been waiting?"
//  12.8  Mars, softer than ever: "A no is information. Not a verdict on you."   16.0 "Go first. Gently. Like this:"
//  17.6  a talk card: "I'd love to see you again. No pressure."   20.2 SENT.   21.4 the reply drops in.
//  22.6  ♓ Pisces pops out of the next shell over, sobbing: "this is the most beautiful text."
//  25.6  the line slams: "Go first. Go gently."   29.6 → 30.0 loop back into frame 0.
import {
  makeEpisode, drawSign, drawSpace, entrance, drawEntranceFx, entranceCues, pisces, dust, stamp, flash, hearts, rr, talkCard,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, thud, INK, BONE, RED, GOLD, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues, recordScratch, recordScratchCues, notification, notificationCues } from '../../hookkit.js'

const D = 30
const IN = { at: -0.6, x: 740, y: 1130, size: 430 }
const T = { land: 0.1, wait: [10.0, 12.6], card: 17.6, send: 20.2, reply: 21.4, pis: 22.6, cardOut: [24.9, 25.3] }
const REC = { at: 2.0, len: 1.6, caption: 'okay. *inside voice.*', top: 1480 }
const BUB = [
  { t0: 0.9, t1: 1.95, x: 540, y: 720, who: 'mars', text: 'CANCER! *YOU—*', size: 66, tail: 200, shake: 5 },
  { t0: 3.8, t1: 6.4, x: 560, y: 720, who: 'mars', text: '(whispering) you’re allowed to go *first.*', size: 36, tail: 180 },
  { t0: 6.6, t1: 9.8, x: 520, y: 760, who: 'cancer', text: 'but if I go first and they don’t feel the same… I’ll *crumble.*', tail: -200, tailUp: false, maxW: 760 },
  { t0: 10.2, t1: 12.5, x: 560, y: 720, who: 'mars', text: 'How long have you been *waiting?*', size: 42, tail: 180 },
  { t0: 12.8, t1: 15.8, x: 540, y: 720, who: 'mars', text: 'A no is *information.* Not a verdict on you.', size: 44, tail: 200 },
  { t0: 16.0, t1: 17.5, x: 560, y: 720, who: 'mars', text: 'Go first. *Gently.* Like this:', size: 44, tail: 180 },
  { t0: 22.8, t1: 25.3, x: 540, y: 1740, who: 'pisces', text: 'this is the most *beautiful* text.', tail: 300, tailUp: true },
]
const SHAKE = { at: T.land, len: 0.5, amp: 30 }
const NOTE = { at: T.reply, out: [24.9, 25.2], title: 'messages', body: 'them: I was *hoping* you’d say that.', glyph: '♡', y: 130 }

function porch(x, t) {
  drawSpace(x, t, { planet: 'moon', tint: '#3a6fb0', seed: 4, horizon: { y: 1080, color: '#10284a', rim: '#7fc0ff' } })
  // moonlight path on the sea
  for (let i = 0; i < 9; i++) {
    const y = 1110 + i * 38, w = 60 + i * 30 + 20 * Math.sin(t * 2 + i)
    x.fillStyle = `rgba(220,235,255,${0.28 - i * 0.025})`; x.fillRect(540 - w / 2 + 30 * Math.sin(t + i * 1.7), y, w, 6)
  }
  // planks (they jump on the crash)
  const jolt = t > T.land - 0.05 && t < T.land + 0.5 ? Math.exp(-(t - T.land) * 9) : t < T.land ? 0 : 0
  for (let i = 0; i < 8; i++) {
    const y = 1440 + i * 62, jy = -jolt * 60 * Math.abs(Math.sin(i * 1.9 + 1)) * (i % 2 ? 1 : 0.6)
    x.fillStyle = i % 2 ? '#7a4a36' : '#8a5a42'; x.fillRect(-10, y + jy, 1100, 58)
    x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(-10, y + 54 + jy, 1100, 6)
  }
  // rail posts + porch light
  x.fillStyle = '#5a3328'; for (let i = 0; i < 6; i++) x.fillRect(30 + i * 210, 1300, 22, 150)
  x.fillRect(0, 1290, 1080, 22)
  const lg = x.createRadialGradient(140, 1250, 0, 140, 1250, 420); lg.addColorStop(0, 'rgba(255,214,150,0.35)'); lg.addColorStop(1, 'rgba(255,214,150,0)'); x.fillStyle = lg; x.fillRect(0, 830, 600, 900)
}
function shell(x, X, Y, s, open) {
  x.save(); x.translate(X, Y)
  x.fillStyle = '#f7c6a8'; x.strokeStyle = INK; x.lineWidth = 8
  x.beginPath(); x.moveTo(-s, 0); x.quadraticCurveTo(0, -s * 0.2 - open * s * 0.9, s, 0); x.lineTo(s * 0.8, s * 0.35); x.lineTo(-s * 0.8, s * 0.35); x.closePath(); x.fill(); x.stroke()
  x.strokeStyle = 'rgba(160,80,80,0.5)'; x.lineWidth = 5
  for (let i = -2; i <= 2; i++) { x.beginPath(); x.moveTo(i * s * 0.18, s * 0.33); x.lineTo(i * s * 0.35, -s * 0.05 - open * s * 0.6); x.stroke() }
  x.restore()
}

function draw(x, t, K) {
  porch(x, t)
  // the next shell over (Pisces lives in it)
  const op = ease.outBack(prog(t, T.pis, T.pis + 0.4)) * outK(t, [28.4, 28.9])
  if (t > T.pis) pisces(x, t, 890, lerp(1700, 1540, op), 200, { pop: op, look: [-1, -1], hops: [23.0, 23.4, 23.8, 24.2], squash: 0.05 * Math.sin(t * 20) })
  shell(x, 890, 1660, 150, op)
  // Cancer on the step
  const cm = t < 2 ? 'wide' : t < 6.4 ? 'neutral' : t < 12.6 ? 'squint' : t < 17.5 ? 'neutral' : t < T.reply ? 'wide' : 'heart'
  drawSign(x, 'cancer', 300, 1330, 280, t, { mood: cm, look: t < 6.4 ? [1, -0.5] : t < 12.6 ? [0, 1] : [1, -0.3], hops: [6.7, 7.2, 7.8, 8.4, T.reply + 0.2, T.reply + 0.6], squash: t > 6.6 && t < 9.8 ? 0.06 : 0, shadow: true })
  // the waiting counter
  if (t > T.wait[0] - 0.2 && t < T.wait[1] + 0.4) {
    const k = pop01(t, T.wait[0] - 0.2, 0.3, 2) * outK(t, [T.wait[1], T.wait[1] + 0.3])
    const day = Math.max(1, Math.round(1 + 46 * ease.inOutQuad(prog(t, T.wait[0] + 0.2, T.wait[1] - 0.5))))
    x.save(); x.translate(540, 470); x.scale(k, k); x.rotate(-0.03)
    x.fillStyle = INK; rr(x, -330, -110, 660, 220, 30); x.fill(); x.strokeStyle = '#8fd0ff'; x.lineWidth = 6; rr(x, -320, -100, 640, 200, 24); x.stroke()
    x.fillStyle = '#8fd0ff'; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('waiting for them to make the move', 0, -52)
    x.fillStyle = BONE; x.font = `800 88px ${INTER}`; x.fillText(`DAY ${day}`, 0, 30)
    x.restore()
  }
  // Mars
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'mars', 'crash', t, IN)
  dust(x, t, T.land, 740, 1330, { R: 420, seed: 7 })
  const mm = t < 2 ? 'angry' : t < 3.8 ? 'wide' : t < 6.4 ? 'neutral' : t < 10 ? 'sad' : t < 17.5 ? 'happy' : t < T.reply ? 'wide' : 'love'
  K.mars(P.x, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: [-1, 0.4], talk: t < 0.9 ? 0.9 : undefined, hops: [1.0, 1.4, 13.0, 13.6, 14.4, 16.1, 16.7] })
  // the talk card + SENT
  talkCard(x, t, { at: T.card, out: T.cardOut, cx: 560, cy: 820, w: 500, text: 'I’d love to see you again. | *No pressure.*', rot: 0.04 })
  if (t > T.send && t < T.cardOut[0]) stamp(x, t, T.send, 'SENT', 620, 1030, { size: 70, col: '#8fd0ff' })
  hearts(x, t, T.reply + 0.1, 300, 1230, { n: 12, col: '#8fd0ff' })
}
function over(x, t) { flash(x, t, T.land, { col: '#cfe6ff', d: 0.2, a: 0.6 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae04', duration: D, end: 'loop',
  hook: { at: -1, text: 'Cancer. You’re allowed | to go *first.*', out: [1.85, 2.0], size: 96 },
  bubbles: BUB, draw, over, freeze: [REC],
  overlays: [screenShake(SHAKE), recordScratch(REC), notification(NOTE)],
  last: { at: 25.6, text: 'Go first. | Go *gently.*', top: 300 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('crash', IN), ...recordScratchCues(REC), ...notificationCues(NOTE),
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(10.3 + i * 0.16).toFixed(2), 0.02]),
    ['whoosh', T.card - 0.1, 0.4, 0.04], ['pluck', T.card + 0.3, 1318.51, 0.04, 0.6, 0.2],
    ...thud(T.send), popCue(T.send, 880, 0.04, 0.2), ['glitter', T.reply, T.reply + 0.8],
    ['whoosh', T.pis, 0.3, 0.03], popCue(T.pis + 0.2, 987.77, 0.04, 0.5), ...sobCues(23.0, 4), ...sobCues(24.3, 3),
  ],
})
