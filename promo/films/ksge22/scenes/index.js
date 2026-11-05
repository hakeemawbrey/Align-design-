// ksge22 · SPOT THE GREEN FLAG: "Capricorn, the Worst Week" (trial reel, ≈ 11 s, cinematic · F). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: you mid-faceplant into the couch, papers flying.
//   TAKE A   Capricorn wheels in a whiteboard: "okay. step one: we make a plan."
//   TAKE B   Capricorn sits down with a blanket: "I'm here. tell me everything."
//   freeze, 3-2-1, the TWIST: both flags go green. THE STARS: "Fix it or hear it? *Just ask.*"  Hard cut.
import { makeGreen, R, box, pbubble, hearts, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK, RED, GREEN, MONO } from '../../ksge01/scenes/greenkit.js'
import { living, couch } from '../../ksge02/scenes/sets.js'

function papers(x, tk) {
  const p = clamp(prog(tk, -0.4, 0.9))
  if (p >= 1) return
  for (let i = 0; i < 6; i++) { const a = -2.6 + i * 0.45; x.save(); x.translate(200 + Math.cos(a) * 220 * p, 420 + Math.sin(a) * 200 * p + 260 * p * p); x.rotate(p * (3 + i)); R(x, INK, -24, -30, 48, 60); R(x, BONE, -21, -27, 42, 54); R(x, '#b8b0a0', -14, -16, 28, 4); R(x, '#b8b0a0', -14, -6, 22, 4); x.restore() }
}
function whiteboard(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, 260); x.scale(k, k)
  box(x, -110, -80, 220, 150, '#f4f1ea', { b: 6 }); R(x, INK, -6, 76, 12, 80)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#3f7cf0'; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('THE PLAN', -94, -56); x.fillStyle = INK; x.fillText('1. sleep', -94, -22); x.fillText('2. one email', -94, 6); x.fillText('3. snacks', -94, 34)
  x.restore()
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  living(x, { lamp: true })
  couch(x, 200, 570, 340)
  // you: mid-faceplant at frame 0, then sit up
  const up = ease.outCubic(prog(tk, 0.6, 1.0))
  x.save(); x.translate(160, 470); x.rotate(lerp(1.3, 0, up)); x.translate(-160, -470)
  you(x, tk, { x: 160, y: 470, s: 160, mood: tk < 0.6 ? 'sleepy' : (tk > (mode === 'A' ? 1.4 : f[0] + 0.6) ? 'happy' : 'wide'), zzz: false, look: [1, 0] })
  x.restore()
  papers(x, tk)
  if (mode === 'A') {
    whiteboard(x, 300, ease.outBack ? ease.outBack(clamp(prog(tk, 0.8, 1.1))) : clamp(prog(tk, 0.8, 1.1)))
    hero(x, tk, { x: 420, y: 470, s: 170, mood: 'sparkle', look: [-1, 0], hops: [1.0] })
    pbubble(x, tk, 300, 640, 1.2, 99, 'okay. step one:\nwe make a plan.', { size: 28, tail: 0.6, tailUp: true })
  } else {
    hero(x, tk, { x: 330, y: 480, s: 170, mood: 'happy', look: [-1, 0] })
    const bk = clamp(prog(tk, f[0] + 0.4, f[0] + 0.7)); if (bk > 0) box(x, 90, 500, 290 * bk, 50, PINK, { b: 6, hi: '#ffb3c9' })
    pbubble(x, tk, 260, 250, f[0] + 0.25, 99, 'I’m here.\ntell me everything.', { size: 30, tail: 0.4 })
  }
  hearts(x, tk, S.T.reveal + 0.3, 250, 560, { n: 5, cell: 4 })
  void GOLD; void RED; void GREEN
}
const EP = makeGreen({
  id: 'ksge22', sign: 'capricorn', name: 'Capricorn', win: 'both', ending: 'cut', hold: 2.0,
  hook: 'YOU HAD | *THE WORST WEEK.*',
  premise: 'You vent about *your week.*',
  ask: 'Which take is the *green flag?* Careful.',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'Fix it or hear it? *Just ask.*',
  cues: [['tom', 0.0, 80, { gain: 0.18, decay: 0.2 }], ['whoosh', 0.0, 0.6, 0.03], ['whoosh', 0.8, 0.3, 0.025], ['pop', 1.2, 987.77, 0.035, -0.4], ['pop', 2.3, 659.25, 0.035, 0.4], ['whoosh', 2.45, 0.3, 0.02], ['bell', 6.25, 2637.02, 0.03, 1.2, 0.3]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
