// kgse13: GUESS THE SIGN, "Great advice, none taken" (10 s vertical, star_advice trial, lofi · Em, hard cut).
//   0.00  frame 0: the silhouette mid-lecture at a whiteboard of advice for a friend, pointer up.
//         Hook: "Gives great advice. *Takes none of it.*"
//   0.35  colour flash · the friend: "thank you!!" · then its OWN phone buzzes: the same problem, unanswered for 3 days
//   C1 "a tidy desk" · C2 "a highlighter" · buzz · 3·2·1 · reveal: VIRGO · last line, hard cut
import { makeGuess, box, R, phone, bubble, shadow, label, chat, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, RED, CYAN, MINT, PINK, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const ADVICE = ['1. say how you feel', '2. don’t overthink it', '3. you deserve kindness']
function board(x, u) {
  box(x, 150, 520, 780, 380, '#f4f1ea', { b: 8 }); R(x, '#c9c4d8', 140, 900, 800, 14)
  x.font = `800 30px ${INTER}`; x.fillStyle = '#3a6ad0'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('ADVICE FOR BESTIE', 180, 565)
  ADVICE.forEach((a, i) => { x.font = `700 38px ${INTER}`; x.fillStyle = INK; x.fillText(a, 190, 640 + i * 76); R(x, 'rgba(255,230,90,0.55)', 186, 656 + i * 76, 420 + i * 20, 12) })
  if (u > 3.6) { x.save(); x.globalAlpha = clamp((u - 3.6) * 3); x.font = `900 34px ${INTER}`; x.fillStyle = RED; x.fillText('…for me too??', 610, 860); x.restore() }
}
function own(u) {
  return (x, w, h) => {
    R(x, '#1a1634', 0, 0, w, h)
    x.font = `800 16px ${INTER}`; x.fillStyle = CYAN; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('my crush', 10, 18)
    chat(x, 'are we still on for fri?', 8, 36, { size: 15 })
    x.font = `700 14px ${MONO}`; x.fillStyle = '#ff8a9a'; x.fillText('unanswered · 3 days', 10, h - 40)
    x.fillStyle = BONE; x.fillText('draft: (empty)', 10, h - 18)
  }
}
function highlighter(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.5); x.scale(k, k)
  box(x, -70, -18, 140, 36, '#ffe65a', { b: 5 }); R(x, INK, 70, -12, 20, 24); R(x, '#ffe65a', 74, -8, 14, 16); R(x, '#d9c040', -70, -18, 30, 36)
  x.restore()
}
function desk(x, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  box(x, 690, 1150, 330, 30, '#a07850', { b: 5 })
  for (let i = 0; i < 4; i++) box(x, 710 + i * 36, 1110 - i * 4, 28, 40 + i * 4, ['#ef5c94', '#7fd0ff', '#9fe6b0', GOLD][i], { b: 3 })
  box(x, 880, 1100, 110, 50, BONE, { b: 4 }); for (let i = 0; i < 3; i++) R(x, '#8a8098', 892, 1112 + i * 12, 80, 4)
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse13', sign: 'virgo', D: 10, ending: 'cut', brk: 'flash', flashCol: '#ffe65a',
  hook: 'Gives great advice. | *Takes none of it.*',
  clues: ['a tidy desk', 'a highlighter'],
  last: 'Say it to yourself | *in that voice.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    board(x, u)
    // the friend (left of stage) leaves happy
    const fk = outK(t, [3.0, 3.3])
    if (fk > 0.01) { S.star('sagittarius', { x: 170, y: 1110, s: 160, mood: u > 1.4 ? 'happy' : 'wide', look: [1, -0.2], seed: 11, alpha: fk, hops: [1.4, 1.8] }); bubble(x, t, 210, 960, 1.4, 3.0, 'thank you!!', { size: 30 }) }
    const own0 = 3.2
    const o = { x: 520, y: 1060, s: 330, mood: rv > 0.5 ? 'sparkle' : u > own0 + 0.2 ? 'wide' : 'happy', look: u > own0 ? [1, 0.4] : [-1, -0.4], hops: [0.1, 0.8, 1.5, own0 + 0.1].filter(h => h < S.R), rot: u < own0 ? -0.18 * Math.exp(-u * 1.5) + 0.06 * Math.sin(u * 5) : 0.05, squash: -0.06 * Math.exp(-u * 3) }
    shadow(x, 520, 1270, 280)
    S.sil(o)
    // pointer
    if (u < own0) { x.save(); x.translate(o.x - 120, o.y - 100); x.rotate(-1.0 + 0.2 * Math.sin(u * 5)); R(x, INK, -6, -150, 12, 150); R(x, RED, -4, -150, 8, 20); x.restore() }
    // its own phone buzzes
    const pk = pop01(t, own0, 0.3, 2.4)
    if (pk > 0.01) phone(x, 800 + 6 * Math.sin(t * 40) * outK(t, [own0 + 0.4, own0 + 0.6]), 1000, { w: 210, h: 300, rot: 0.12, k: pk, fn: own(u) })
    desk(x, T.C1 && t > T.C1 ? pop01(t, T.C1 + 0.05, 0.3, 2) : 0)
    if (T.C2 != null) highlighter(x, 320, 1220, pop01(t, T.C2 + 0.05, 0.3, 2.6))
    if (rv > 0.5) bubble(x, t, 300, 950, S.R + 0.3, S.D + 1, '“yes! friday!” sent.', { size: 32 })
  },
  cues: [['pop', 1.4, 1174.66, 0.04, -0.3], ['pop', 1.48, 1567.98, 0.03, -0.3], ['pop', 3.2, 220, 0.06, 0.3], ['pop', 3.3, 220, 0.06, 0.3], ['tick', 3.6, 0.06]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
