// kwme12: WAIT, THAT'S ME, "Crying at a stranger's proposal video" (9 s loop, star_advice trial, music: cinematic · E).
// Pisces is the hero here (no corner cameo): it is already fountaining at frame 0.
//   0.00  frame 0: ♓ Pisces mid-sob at a tiny phone, tears flying sideways; hook on.  0.32 scratch + freeze.
//   1.0   on the phone a little star kneels with a ring box…  1.9 "YES!!"  2.2–4.2 tissues fly out of the box, one by one.
//   5.0–6.5  the slow turn, still streaming.  6.6  last line: "I don’t know them. I love them."   8.55–9 loop back.
import { makeWM, wmMusic, phone, drawStarChar, inSprite, tearsCells, tissue, box, label, drawBits, pop01, prog, ease, lerp, GOLD, BONE } from '../../kwme01/wmkit.js'

const H = { x: 360, y: 1180, s: 430, face: 1 }
const KNEEL = 1.0, YES = 1.9, TISSUES = [2.2, 2.6, 2.95, 3.3, 3.6, 3.9, 4.2], TURN = 5.0
function video(t) {
  return (c, w, h) => {
    c.fillStyle = '#2a3a6a'; c.fillRect(0, 0, w, h)
    c.fillStyle = '#3a6a3a'; c.fillRect(0, h * 0.72, w, h * 0.28)
    const k = ease.outCubic(prog(t, KNEEL - 0.3, KNEEL + 0.3))
    drawStarChar(c, w * 0.32, h * 0.62 + k * 30, 120, t, { color: '#7fd0f0', mood: 'happy', look: [1, 0], seed: 2, tips: false, squash: 0.2 * k })
    drawStarChar(c, w * 0.7, h * 0.58, 130, t, { color: '#f39a3a', mood: t > YES ? 'heart' : 'wide', look: [-1, 0], seed: 5, tips: false, hops: [YES, YES + 0.4] })
    if (k > 0.5) { c.fillStyle = '#c8283c'; c.fillRect(w * 0.42, h * 0.56, 34, 26); c.fillStyle = GOLD; c.fillRect(w * 0.44, h * 0.53, 20, 10) }
    const yk = pop01(t, YES, 0.3, 3)
    if (yk > 0.01) { c.save(); c.translate(w / 2, h * 0.25); c.scale(yk, yk); c.font = "800 52px Inter"; c.textAlign = 'center'; c.lineWidth = 8; c.strokeStyle = '#1b1236'; c.strokeText('YES!!', 0, 0); c.fillStyle = GOLD; c.fillText('YES!!', 0, 0); c.restore() }
  }
}
const EP = makeWM({
  id: 'kwme12', dur: 9, sign: 'pisces', turn: TURN, brk: 'scratch', pis: false,
  hook: '*Crying* at a stranger’s | proposal video',
  last: 'I don’t know them. I love them.',
  hero: H, wash: '#3a5ab0', lastTop: 1500,
  heroOpts: (t) => ({ mood: t < YES ? 'sparkle' : 'wide', look: [1, 0.3], hops: [YES + 0.1, ...TISSUES.map(v => v + 0.05)], tilt: 0.05 }),
  heroAfter(x, t, a, F) { inSprite(x, F, () => tearsCells(x, t, 3)) },
  front(x, t) {
    phone(x, 790, 1060, { w: 380, h: 600, rot: -0.05, draw: video(t) })
    box(x, 120, 1380, 170, 90, '#9fd0ff', { bw: 6 }); label(x, 'tissues', 205, 1425, { size: 26, col: '#1b1236', stroke: null, font: "'Space Mono', monospace", weight: 700 })
    TISSUES.forEach((v, i) => {
      const tt = t - v
      if (tt < 0 || tt > 2.4) return
      const xx = lerp(205, 120 + i * 130, Math.min(1, tt * 1.4)), yy = 1360 - 520 * Math.sin(Math.min(1, tt * 1.4) * Math.PI * 0.6) + tt * tt * 160
      tissue(x, xx, yy, 14, t + i)
    })
    void drawBits; void BONE
  },
  cues: [['pop', KNEEL, 659.25, 0.035, 0.3], ['bell', YES, 1760, 0.035, 1.0, 0.3], ['glitter', YES, YES + 0.5], ...TISSUES.map((v, i) => ['whoosh', v, 0.2, 0.025 + 0.002 * i])],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'cinematic', key: 'E', seed: 2612 })
