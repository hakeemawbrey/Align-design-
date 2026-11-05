// ksge15 · SPOT THE GREEN FLAG: "Gemini Texts First" (trial reel, ≈ 10 s, funk · A). Format: ../../ksge01/scenes/greenkit.js.
//   frame 0  both takes: a "YOU TEXTED FIRST: 14" counter mid-tick, your phone mid-flop onto the couch.
//   TAKE A   silence… you text first again (counter → 15). Gemini: "hey".
//   TAKE B   Gemini texts first: "saw this and thought of you" + a goofy pigeon photo. Counter: THEY TEXTED FIRST.
//   freeze, 3-2-1, GREEN FLAG: Take B. THE STARS: "They thought of you, *so they sent it.*"  Loops back to frame 0.
import { makeGreen, R, box, pbubble, hearts, drawBits, phone, pop01, prog, clamp, lerp, ease, INK, BONE, GOLD, GREEN, RED, INTER, MONO } from '../../ksge01/scenes/greenkit.js'
import { living, couch } from '../../ksge02/scenes/sets.js'

function counter(x, tk, n, they) {
  const punch = 1 + 0.15 * Math.exp(-Math.max(0, tk - (n === 15 ? 1.2 : -1)) * 8)
  x.save(); x.translate(252, 130); x.scale(punch, punch)
  box(x, -200, -40, 400, 80, they ? GREEN : BONE, { b: 6 })
  x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(they ? 'THEY TEXTED FIRST!' : `YOU TEXTED FIRST: ${n}`, 0, 2)
  x.restore()
}
function pigeon(q, w, h) {
  R(q, '#bfe8ff', 0, 0, w, h)
  drawBits(q, ['..GGG...', '.GGWGG..', 'GGGGGGO.', '.GGGGGG.', '..GGGGG.', '...O.O..'], { G: '#8a8aa8', W: INK, O: '#f39a3a' }, w / 2, h / 2, 8)
}
function scene(x, tk, S, mode) {
  const { hero, you } = S
  const f = S.focus[mode]
  living(x, { lamp: true })
  couch(x, 250, 570, 380)
  const n = mode === 'A' && tk > 1.2 ? 15 : 14
  const they = mode === 'B' && tk > f[0] + 0.5
  counter(x, tk, n, they)
  // the phone flops onto the couch at frame 0, then you pick it up
  const flop = ease.outCubic(clamp(prog(tk, -0.3, 0.3)))
  you(x, tk, { x: 150, y: 450, s: 170, mood: mode === 'A' ? (tk > 1.6 ? 'eyeroll' : 'neutral') : (tk > f[0] + 0.5 ? 'happy' : 'neutral'), look: [1, -0.3], hops: mode === 'B' ? [f[0] + 0.6] : [] })
  const showPic = mode === 'B' && tk > f[0] + 0.3
  phone(x, lerp(360, 330, flop), lerp(330, 430, flop), { w: 130, h: 200, rot: lerp(0.9, 0.08, flop), glow: 1, screen: (q, w, h) => {
    R(q, '#211a3e', 0, 0, w, h)
    if (showPic) { q.save(); q.translate(10, 20); pigeon(q, w - 20, 80); q.restore() }
    if (mode === 'A' && tk > 1.2) { R(q, '#7fd0ff', w - 70, 30, 60, 22); q.font = `700 13px ${INTER}`; q.fillStyle = INK; q.textAlign = 'left'; q.textBaseline = 'top'; q.fillText('hey :)', w - 64, 34) }
  } })
  const at = mode === 'A' ? 1.6 : f[0] + 0.35, ak = pop01(tk, at, 0.3, 2.2)
  if (ak > 0.01) { x.save(); x.translate(410, 590); x.scale(ak, ak); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 66, 0, 7); x.fill(); x.fillStyle = '#2e2656'; x.beginPath(); x.arc(0, 0, 60, 0, 7); x.fill(); x.beginPath(); x.arc(0, 0, 60, 0, 7); x.clip(); hero(x, tk, { x: 0, y: 14, s: 110, mood: mode === 'A' ? 'neutral' : 'happy', look: [-1, -0.5] }); x.restore() }
  if (mode === 'A') { pbubble(x, tk, 160, 300, 0.4, 1.15, '…', { size: 34 }); pbubble(x, tk, 340, 270, 1.6, 99, 'GEMINI: hey', { size: 30, tail: 0.3 }) }
  else { pbubble(x, tk, 260, 260, f[0] + 0.35, 99, 'GEMINI: saw this and\nthought of you lol', { size: 28, tail: 0.5, col: '#c9f2d4' }); hearts(x, tk, f[0] + 0.7, 150, 380, { n: 4, cell: 4 }) }
  void GOLD; void RED; void MONO
}
const EP = makeGreen({
  id: 'ksge15', sign: 'gemini', name: 'Gemini', win: 'B', ending: 'loop',
  hook: 'YOU ALWAYS TEXT FIRST. | *RIGHT?*',
  premise: 'You’re always the one who *texts first.*',
  takes: { A: { draw: (x, tk, S) => scene(x, tk, S, 'A') }, B: { draw: (x, tk, S) => scene(x, tk, S, 'B') } },
  last: 'They thought of you, *so they sent it.*',
  cues: [['tom', 0.05, 100, { gain: 0.14, decay: 0.15 }], ['tick', 1.2, 0.07], ['pop', 1.22, 523.25, 0.04, -0.4], ['pop', 1.6, 659.25, 0.03, -0.4], ['pop', 2.4, 1318.51, 0.04, 0.4], ['pop', 2.47, 1760, 0.03, 0.4], ['glitter', 2.55, 2.9]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
