// kpmae07: PLANET TALK: MARS, Ep 7 · ♎ Libra · "Your eyes already voted" (25 s vertical, star_talk, house · C). Hard cut.
// Look: ../../kpmae01/marskit.js.
//   0.00 frame 0: Mars mid-cannonball into a party, the whole dance floor frozen mid-move, ♎ Libra mid-poll with a
//        clipboard. Hook: "LIBRA. Stop polling the room."   0.03 Mars lands (shake, confetti).
//   1.0  Mars: "You've been here an hour. Who've you talked to?"   3.6 the clipboard poll fills: A) them B) them C) them.
//        Libra: "I'm gathering opinions."   6.8 Mars: "Forget the poll. Who do you keep looking at?"
//   9.8  record scratch, freeze: "every. single. time." a caught circle on the window: Libra's eyes keep landing on ♒.
//  12.6  Libra: "…the one by the window."   14.8 Mars: "Walk. Over. There."  Libra crosses the room.
//  17.8  Libra: "hi, I'm Libra. great window."   20.0 ♒: "hi! it IS a great window."
//  21.4  ♓ Pisces, by the snacks, sobbing: "they're talking about the WINDOW."   23.6 "Your eyes already voted."  Cut 25.
import {
  makeEpisode, drawSign, entrance, drawEntranceFx, entranceCues, pisces, flash, hearts, rr,
  pop01, outK, prog, ease, lerp, clamp, sobCues, popCue, INK, BONE, RED, GOLD, CREAM, INTER, MONO,
} from '../../kpmae01/marskit.js'
import { screenShake, shakeCues, recordScratch, recordScratchCues, caught, caughtCues } from '../../hookkit.js'

const D = 25
const IN = { at: -0.67, x: 540, y: 660, size: 380 }
const T = { land: 0.03, thaw: 1.1, poll: [3.6, 6.6], look: 9.8, walk: [16.4, 17.6], hi: 17.8, reply: 20.0, pis: 21.0 }
const REC = { at: T.look, len: 2.6, caption: 'every. single. *time.*', top: 1500 }
const CAUGHT = { at: T.look + 0.2, x: 870, y: 1110, r: 150, out: [12.2, 12.4], label: 'THE ONE', arrow: 'tl', rec: true }
const BUB = [
  { t0: 1.0, t1: 3.4, x: 540, y: 1010, who: 'mars', text: 'You’ve been here an hour. Who’ve you *talked* to?', tail: 0, tailUp: true },
  { t0: 4.0, t1: 6.5, x: 700, y: 1290, who: 'libra', text: 'I’m gathering *opinions.*', tail: -220, tailUp: false, size: 42, maxW: 520 },
  { t0: 6.8, t1: 9.4, x: 540, y: 1010, who: 'mars', text: 'Forget the poll. Who do you keep *looking* at?', tail: 0, tailUp: true },
  { t0: 12.6, t1: 14.6, x: 480, y: 1010, who: 'libra', text: '…the one by the *window.*', tail: -200, tailUp: false },
  { t0: 14.8, t1: 16.4, x: 540, y: 1010, who: 'mars', text: 'Walk. Over. *There.*', tail: 0, tailUp: true, size: 54 },
  { t0: 17.8, t1: 19.8, x: 560, y: 1010, who: 'libra', text: 'hi, I’m Libra. great *window.*', tail: 120, tailUp: false },
  { t0: 20.0, t1: 21.6, x: 560, y: 1010, who: 'aquarius', text: 'hi! it IS a great *window.*', tail: 300, tailUp: false },
  { t0: 21.6, t1: 23.4, x: 540, y: 1840, who: 'pisces', text: 'they’re talking about the *WINDOW.*', tail: -300, tailUp: true, size: 40 },
]
const SHAKE = { at: T.land, len: 0.5, amp: 30 }
const CROWD = [['aries', 110, 1520], ['taurus', 300, 1590], ['gemini', 470, 1510], ['leo', 640, 1600], ['virgo', 800, 1520], ['scorpio', 960, 1590], ['capricorn', 860, 1720]]
const HUES = ['#ff5c8e', '#7fe0ff', '#c9a6ff', '#f2c75c']

function party(x, t, frozen) {
  const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#120826'); g.addColorStop(1, '#2a1048'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  // light beams from the disco ball
  const ph = frozen ? 0.6 : t
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 2 + Math.sin(ph * 0.9 + i * 1.6) * 0.7
    x.save(); x.globalAlpha = 0.16; x.fillStyle = HUES[i]
    x.beginPath(); x.moveTo(540, 150); x.lineTo(540 + Math.cos(a - 0.12) * 2200, 150 + Math.sin(a - 0.12) * 2200); x.lineTo(540 + Math.cos(a + 0.12) * 2200, 150 + Math.sin(a + 0.12) * 2200); x.closePath(); x.fill(); x.restore()
  }
  // disco ball
  x.strokeStyle = '#8a7fa0'; x.lineWidth = 4; x.beginPath(); x.moveTo(540, 0); x.lineTo(540, 100); x.stroke()
  x.fillStyle = '#c8c0dc'; x.beginPath(); x.arc(540, 150, 52, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff'; for (let i = 0; i < 10; i++) { const a = i * 0.63 + ph; x.globalAlpha = 0.5 + 0.5 * Math.sin(a * 3); x.fillRect(540 + Math.cos(a) * 30 - 6, 150 + Math.sin(a * 1.3) * 30 - 6, 12, 12) } x.globalAlpha = 1
  // the window, right
  x.fillStyle = '#0a0620'; rr(x, 760, 820, 240, 300, 16); x.fill()
  x.fillStyle = '#fff6dc'; for (let i = 0; i < 8; i++) x.fillRect(780 + (i * 71) % 200, 840 + (i * 43) % 260, 5, 5)
  x.strokeStyle = '#6a4a8a'; x.lineWidth = 14; rr(x, 760, 820, 240, 300, 16); x.stroke(); x.beginPath(); x.moveTo(880, 820); x.lineTo(880, 1120); x.stroke()
  // floor
  x.fillStyle = '#1a0a30'; x.fillRect(0, 1420, 1080, 500)
  for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) { x.fillStyle = HUES[(i + j + Math.floor(frozen ? 2 : t * 2)) % 4]; x.globalAlpha = 0.12; x.fillRect(i * 180, 1420 + j * 125, 178, 123) } x.globalAlpha = 1
}
function clipboard(x, t) {
  if (t < T.poll[0] - 0.3 || t > T.poll[1] + 0.3) return
  const k = pop01(t, T.poll[0] - 0.3, 0.3, 2) * outK(t, [T.poll[1], T.poll[1] + 0.3])
  x.save(); x.translate(300, 930); x.scale(k, k); x.rotate(-0.06)
  x.fillStyle = '#8a5a42'; rr(x, -200, -250, 400, 500, 20); x.fill()
  x.fillStyle = CREAM; rr(x, -175, -210, 350, 440, 10); x.fill()
  x.fillStyle = '#c0c0c8'; rr(x, -60, -270, 120, 50, 10); x.fill()
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WHO DO I TALK TO?', 0, -165)
  ;['A) them', 'B) them', 'C) them'].forEach((s, i) => {
    const y = -70 + i * 100
    x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-150, y - 22, 40, 40)
    x.fillStyle = INK; x.font = `700 34px ${INTER}`; x.textAlign = 'left'; x.fillText(s, -95, y)
    const n = clamp(Math.floor((t - T.poll[0] - 0.4 - i * 0.25) * 2.2), 0, 5)
    x.strokeStyle = RED; x.lineWidth = 5
    for (let m = 0; m < n; m++) { x.beginPath(); if (m < 4) { x.moveTo(70 + m * 16, y - 20); x.lineTo(70 + m * 16, y + 20) } else { x.moveTo(60, y + 16); x.lineTo(140, y - 16) } x.stroke() }
  })
  x.restore()
}

function draw(x, t, K) {
  const frozen = t < T.thaw
  party(x, t, frozen)
  // the crush by the window
  drawSign(x, 'aquarius', 880, 1170, 230, t, { mood: t < T.hi ? 'neutral' : t < T.reply ? 'wide' : 'happy', look: t < T.walk[1] ? [-1, 0] : [-1, 0], hops: [20.1, 20.5, 20.9, 21.3], shadow: true })
  // the crowd: frozen mid-dance on frame 0, then back to dancing
  CROWD.forEach(([s, cx, cy], i) => {
    const tt = frozen ? 0.35 + i * 0.11 : t
    const sq = 0.1 * Math.sin(tt * 9 + i * 1.3)
    drawSign(x, s, cx + (frozen ? 0 : 8 * Math.sin(t * 4.5 + i)), cy, 130, tt, { mood: frozen ? 'wide' : 'happy', look: frozen ? [0, -1] : undefined, squash: sq, bob: 0, seed: i + 3, glyph: false, alpha: 0.95 })
  })
  // Pisces by the snack table
  x.fillStyle = '#5b4a8a'; rr(x, 30, 1770, 300, 30, 8); x.fill(); x.fillStyle = GOLD; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(70 + i * 55, 1760, 20, Math.PI, 0); x.fill() }
  pisces(x, t, 180, 1640, 180, { mood: t > T.reply ? 'sparkle' : 'happy', tears: t > T.pis ? 3 : 1, look: [1, -1], hops: t > T.pis ? [21.2, 21.6, 22.0, 22.4, 22.8] : [], squash: t > T.pis ? 0.05 * Math.sin(t * 22) : 0 })
  // Libra: polls, then walks over
  const lx = lerp(260, 640, ease.inOutCubic(prog(t, ...T.walk)))
  const lm = t < 1 ? 'wide' : t < 6.6 ? 'happy' : t < 12.6 ? 'wide' : t < T.walk[0] ? 'squint' : t < T.reply ? 'neutral' : 'heart'
  const lookWin = t > T.look && t < T.look + 2.6 ? [1, 0] : t < 6.6 ? [0, -1] : t < T.walk[0] ? [1, -0.4] : [1, 0]
  drawSign(x, 'libra', lx, 1250, 260, t, { mood: lm, look: lookWin, hops: [4.1, 4.6, 5.2, 12.7, 13.2, 16.5, 16.8, 17.1, 17.4, 17.9, 18.4], sweat: t > T.walk[0] && t < T.hi, shadow: true })
  hearts(x, t, T.reply + 0.2, 760, 1150, { n: 12 })
  clipboard(x, t)
  // gaze line during the freeze
  if (t >= T.look - 0.01 && t < T.look + 2.6) {
    x.save(); x.setLineDash([18, 14]); x.strokeStyle = 'rgba(255,92,142,0.9)'; x.lineWidth = 7; x.lineDashOffset = -t * 60
    x.beginPath(); x.moveTo(lx + 40, 1220); x.quadraticCurveTo(560, 1040, 800, 1140); x.stroke(); x.restore()
  }
  // Mars: cannonball
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'mars', 'crash', t, IN)
  if (t > T.land && t < T.land + 1.4) {   // confetti splash instead of dust
    const p = (t - T.land) / 1.4
    for (let i = 0; i < 40; i++) { const a = i * 2.39, r = 80 + p * (300 + (i % 7) * 50); x.globalAlpha = 1 - p; x.fillStyle = HUES[i % 4]; x.fillRect(540 + Math.cos(a) * r, 820 + Math.sin(a) * r * 0.6 - 200 * p + 400 * p * p, 14, 22) }
    x.globalAlpha = 1
  }
  const mm = t < 3.4 ? 'angry' : t < 6.8 ? 'sly' : t < 12.6 ? 'wide' : t < 17.8 ? 'angry' : t < T.reply ? 'wide' : 'proud'
  K.mars(P.x, P.y, P.size, { rot: P.rot, squash: P.squash, alpha: P.alpha, mood: mm, look: t < T.walk[0] ? [-1, 1] : [0.6, 1], hops: [1.1, 1.7, 2.4, 6.9, 7.5, 8.2, 14.9, 15.4, 15.9] })
}
function over(x, t) { flash(x, t, T.land, { col: '#ff8fb1', d: 0.2, a: 0.5 }) }

export const { DURATION, SCENES, CUES } = makeEpisode({
  id: 'kpmae07', duration: D, end: 'cut',
  hook: { at: -1, text: 'LIBRA. Stop polling | the *room.*', out: [3.2, 3.4] },
  bubbles: BUB, draw, over, freeze: [REC],
  overlays: [screenShake(SHAKE), recordScratch(REC), caught(CAUGHT)],
  last: { at: 23.6, text: 'Your eyes already | *voted.*', top: 260 },
  cues: [
    ...shakeCues(SHAKE), ...entranceCues('crash', IN), ['glitter', T.land, T.land + 0.8], ['whoosh', 0.0, 0.4, 0.05],
    ...[0, 1, 2].flatMap(i => Array.from({ length: 4 }, (_, m) => ['tick', +(T.poll[0] + 0.4 + i * 0.25 + m / 2.2).toFixed(2), 0.02])),
    ...recordScratchCues(REC), ...caughtCues(CAUGHT),
    ...[16.5, 16.8, 17.1, 17.4].map(s => ['tick', s, 0.03]),
    popCue(T.reply, 1318.51, 0.05, 0.3), ['glitter', T.reply, T.reply + 0.8],
    ...sobCues(21.3, 4), ...sobCues(22.6, 3),
  ],
})
