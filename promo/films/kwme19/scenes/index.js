// kwme19: WAIT, THAT'S ME, "Saying “anywhere's fine” then vetoing everything" (9 s loop, star_advice trial, music: house · D).
//   0.00  frame 0: ♎ Libra mid-shrug, a menu carousel mid-spin beside it; a friend star asks "where do you wanna eat?"
//   0.32  scratch + freeze.  1.0 Libra: "anywhere’s fine!"  1.8 PIZZA ✗ · 2.3 SUSHI ✗ · 2.8 TACOS ✗ · 3.3 NOODLES ✗
//   3.7   the carousel spins so fast it smokes.  4.8–6.3 the slow turn.  6.4 last line: "…not there, though."
import { makeWM, wmMusic, box, label, bubble, drawStarChar, signStar, pop01, prog, clamp, RED, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 330, y: 1230, s: 400, face: 1 }
const ASK = -0.6, SAY = 1.0, VETO = [1.8, 2.3, 2.8, 3.3], SMOKE = 3.7, TURN = 4.8
const FOODS = ['PIZZA', 'SUSHI', 'TACOS', 'NOODLES', 'SALAD']
const FR = signStar('taurus')
function carousel(x, t) {
  const idx = t < VETO[0] ? 0 : Math.min(4, VETO.filter(v => v <= t).length)
  const spin = t > SMOKE && t < TURN ? (t - SMOKE) * 30 : t < 0.2 ? (0.2 - t) * 6 : 0
  const cx = 780, cy = 820
  for (let k = -1; k <= 1; k++) {
    const off = k + (spin % 1), xx = cx + off * 300, s = 1 - Math.abs(off) * 0.3
    const name = FOODS[((idx + k) % 5 + 5) % 5]
    x.save(); x.translate(xx, cy); x.scale(s, s); x.globalAlpha = clamp(1 - Math.abs(off) * 0.55)
    box(x, -130, -90, 260, 180, '#fff6e8', { bw: 6 }); label(x, name, 0, 4, { size: 44, col: INK, stroke: null })
    x.restore()
  }
  VETO.forEach((v, i) => { if (idx === i + 1 && t - v < 0.5) { const k = pop01(t, v, 0.2, 3); label(x, '✗', cx, cy, { size: 220 * k, col: RED }) } })
  if (t > SMOKE && t < TURN + 1.5) for (let i = 0; i < 6; i++) { const ph = ((t * 1.3 + i / 6) % 1); x.globalAlpha = 0.5 * (1 - ph); x.fillStyle = '#cfc8e8'; x.fillRect(cx - 150 + i * 60, cy - 120 - ph * 200, 40, 40); x.globalAlpha = 1 }
}
const EP = makeWM({
  id: 'kwme19', dur: 9, sign: 'libra', turn: TURN, brk: 'scratch',
  hook: 'Saying *“anywhere’s fine”* | then vetoing everything',
  last: '…not there, though.',
  hero: H, wash: '#b03a8a', hookSize: 80,
  heroOpts: (t) => ({ mood: t < VETO[0] ? 'happy' : 'squint', look: [1, -0.5], hops: [SAY, ...VETO], squash: t < 0.4 ? 0.08 : 0, tilt: 0.06 }),
  back(x, t) {
    carousel(x, t)
    drawStarChar(x, 830, 1210, 260, t, { color: FR.color, glyph: FR.glyph, mood: t > VETO[2] ? 'eyeroll' : 'happy', look: [-1, 0], seed: 5, hops: [ASK + 0.6, VETO[3] + 0.1] })
  },
  front(x, t) {
    bubble(x, t, 760, 1000, -0.4, SAY - 0.1, 'where do you wanna eat?', { size: 32, tail: 0.2 })
    bubble(x, t, 400, 960, SAY, VETO[0] + 0.4, 'anywhere’s fine!', { size: 42, tail: -0.3 })
    void BONE
  },
  cues: [['pop', SAY, 987.77, 0.04, -0.2], ...VETO.map(v => ['tick', v, 0.08]), ...VETO.map((v, i) => ['pop', v + 0.02, 220 + i * 20, 0.05, 0.3]), ['riser', SMOKE, TURN, 0.02], ['whoosh', SMOKE, 1.0, 0.04]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'house', key: 'D', seed: 2619 })
