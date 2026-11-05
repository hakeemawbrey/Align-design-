// kwme04: WAIT, THAT'S ME, "Planning our wedding after one good text" (10 s loop, star_advice trial, music: dreamy · E♭).
//   0.00  frame 0: ♋ Cancer mid-swoon (heart eyes), a mood board mid-slam into frame; hook on.  0.32 scratch + freeze.
//   1.3   the text "had fun today :)" is already pinned; then cake 1.6 · two rings 2.3 · a heart ♋+? 3.0 · "JUNE??" 3.7
//   5.6–7.1  the slow turn.  7.2  last line: "the text had a smiley."   9.55–10 loop back.
import { makeWM, wmMusic, box, drawBits, label, pop01, prog, ease, HEART, GOLD, BONE, INK, PINK } from '../../kwme01/wmkit.js'

const H = { x: 300, y: 1260, s: 380, face: 1 }
const B = { x: 740, y: 880, w: 520, h: 640 }
const PINS = [-0.3, 1.6, 2.3, 3.0, 3.7], TURN = 5.6
const CAKE = ['..W..', '.PPP.', '.WWW.', 'PPPPP', 'WWWWW', 'PPPPP'], RING = ['.GGG.', 'G...G', 'G...G', 'G...G', '.GGG.']
function pin(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); fn(); x.fillStyle = '#e0507a'; x.fillRect(-7, -7, 14, 14); x.restore()
}
function board(x, t) {
  const sl = ease.outBack(prog(t, -0.35, 0.2))
  const cy = B.y + (1 - sl) * -700, rot = 0.04 * (1 - sl) + 0.02
  x.save(); x.translate(B.x, cy); x.rotate(rot)
  box(x, -B.w / 2, -B.h / 2, B.w, B.h, '#c49a6c', { bw: 10, hi: '#d8b088' })
  label(x, 'OUR WEDDING', 0, -B.h / 2 + 50, { size: 40, col: INK, stroke: null })
  const k = i => pop01(t, PINS[i], 0.3, 2.6)
  pin(x, -100, -150, k(0), -0.06, () => { x.fillStyle = BONE; x.fillRect(-140, -44, 280, 88); x.font = "700 26px 'Space Mono', monospace"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('had fun today :)', 0, 2) })
  pin(x, 150, -70, k(1), 0.08, () => drawBits(x, CAKE, { W: '#fff6e8', P: PINK }, 0, 10, 16))
  pin(x, -130, 60, k(2), -0.1, () => { drawBits(x, RING, { G: GOLD }, -24, 0, 12); drawBits(x, RING, { G: GOLD }, 24, 8, 12) })
  pin(x, 120, 110, k(3), 0.06, () => { drawBits(x, HEART, { H: '#ff5c8e' }, 0, 0, 24); x.font = '800 36px Inter'; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♋︎+?', 0, -6) })
  pin(x, 0, 245, k(4), -0.04, () => label(x, 'JUNE??', 0, 0, { size: 70, col: '#ff5c8e' }))
  x.restore()
}
const EP = makeWM({
  id: 'kwme04', dur: 10, sign: 'cancer', turn: TURN, brk: 'scratch',
  hook: 'Planning our *wedding* | after one good text',
  last: 'the text had a smiley.',
  hero: H, wash: '#b0506f',
  heroOpts: () => ({ mood: 'heart', look: [1, -1], hops: PINS.map(p => p + 0.05), tilt: 0.1 }),
  back(x, t) { board(x, t) },
  cues: [...PINS.slice(1).map((p, i) => ['pop', p, 880 * (1 + i * 0.12), 0.045, 0.3]), ['tick', 0.02, 0.06], ['bell', PINS[4], 1760, 0.03, 0.8, 0.3], ['glitter', PINS[3], PINS[3] + 0.4]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'dreamy', key: 'Eb', seed: 2604 })
