// kgse18: GUESS THE SIGN, "Left on read, fifty push-ups" (8 s vertical, star_advice trial, house · F, loop).
//   0.00  frame 0: the silhouette mid-push-up, a phone on the floor reading "Read 6:14".
//         Hook: "Left on read. *Did fifty push-ups.*"
//   0.35  whip zoom · the rep counter races 1 → 50
//   C1 "a red headband" · C2 "a jump rope" · buzz · 3·2·1 · reveal: ARIES · last line · loop
import { makeGuess, box, R, phone, bubble, shadow, chat, label, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, CYAN, PINK, MINT, RED, INTER, MONO } from '../../kgse01/scenes/guesskit.js'

const REP = 0.11      // seconds per rep
function floorPhone(u) {
  return (x, w, h) => {
    R(x, '#1a1634', 0, 0, w, h)
    chat(x, 'so are we still on?', w - 8, 20, { me: true, size: 14 })
    x.font = `700 13px ${MONO}`; x.fillStyle = '#ff8a9a'; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText('Read 6:14', w - 10, 66)
  }
}
function rope(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.lineWidth = 8; x.strokeStyle = INK; x.beginPath(); x.moveTo(-60, 0); x.quadraticCurveTo(0, 120 + 30 * Math.sin(t * 6), 60, 0); x.stroke()
  x.lineWidth = 4; x.strokeStyle = GOLD; x.stroke()
  for (const d of [-1, 1]) box(x, d * 60 - 10, -40, 20, 50, RED, { b: 4 })
  x.restore()
}

export const EP = makeGuess({
  id: 'kgse18', sign: 'aries', D: 8, ending: 'loop', brk: 'whip',
  hook: 'Left on read. | *Did fifty push-ups.*',
  clues: ['a red headband', 'a jump rope'],
  last: 'Move the feeling. | *Then let it go.*',
  draw(x, S) {
    const { t, u, rv, T } = S
    const reps = rv > 0.5 ? 50 : Math.min(50, Math.max(1, Math.floor((u - 0.6) / REP) + 1))
    const ph = rv > 0.5 ? 0 : Math.sin(u * Math.PI * 2 / (u < 0.6 ? 0.5 : REP * 2))
    const o = { x: 560, y: 1110 + 22 * ph, s: 330, mood: rv > 0.5 ? 'happy' : 'squint', look: [-1, 0.6], hops: [], rot: rv > 0.5 ? 0 : 0.5, squash: rv > 0.5 ? 0 : 0.18 + 0.06 * ph, bob: 0 }
    phone(x, 230, 1215, { w: 200, h: 110, rot: 0, fn: floorPhone(u) })
    shadow(x, 560, 1250, 330)
    S.sil(o)
    if (t > T.C1) { const k = pop01(t, T.C1 + 0.05, 0.3, 2); x.save(); x.globalAlpha = clamp(k * 2); x.translate(o.x, o.y); x.rotate(o.rot); R(x, INK, -o.s * 0.32, -o.s * 0.24, o.s * 0.64, 30); R(x, RED, -o.s * 0.3, -o.s * 0.235, o.s * 0.6, 20); x.restore() }
    // the rep counter
    x.save(); x.translate(800, 760); x.rotate(0.06)
    box(x, -150, -70, 300, 140, '#14102a', { b: 7 })
    x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('REPS', 0, -40)
    x.font = `900 74px ${INTER}`; x.fillStyle = reps >= 50 ? MINT : GOLD; x.fillText(String(reps), 0, 18)
    x.restore()
    if (T.C2 != null) rope(x, 860, 1120, pop01(t, T.C2 + 0.05, 0.3, 2.4), t)
    if (rv > 0.5) bubble(x, t, 560, 860, S.R + 0.3, S.D + 1, 'okay. feel better. no double text.', { size: 28 })
  },
  cues: Array.from({ length: 24 }, (_, i) => ['tick', +(1.0 + i * 0.22).toFixed(3), 0.035]).filter(c => c[1] < 4.6),
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
