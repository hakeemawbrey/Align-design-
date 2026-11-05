// kwme05: WAIT, THAT'S ME, "Saying “it's chill” while not chill" (8 s loop, star_advice trial, music: synthwave · C♯m).
//   0.00  frame 0: ♏ Scorpio in pixel shades, a teacup already rattling in its saucer; hook on.  0.32 scratch + freeze.
//   1.4   its phone sends "it's chill :)".  2.2–3.9 the cup rattles harder, the tea sloshes, steam spirals.
//   4.3–5.8  the slow turn, the shades slide down its face.  5.9  last line: "very chill. extremely."  7.55 loop back.
import { makeWM, wmMusic, box, inSprite, phone, sms, prog, ease, clamp, INK, BONE } from '../../kwme01/wmkit.js'

const H = { x: 400, y: 1170, s: 420, face: 1 }
const SEND = 1.4, TURN = 4.3
const rattle = t => (0.25 + 0.75 * clamp(prog(t, 2.2, 3.9))) * (t < TURN ? 1 : 0.3)
function cup(x, t) {
  const r = rattle(t), j = 7 * r * Math.sin(t * 47), cx = 780, cy = 1300
  box(x, cx - 140, cy + 40, 280, 22, BONE, { bw: 5 })
  x.save(); x.translate(cx + j, cy - Math.abs(j) * 0.4); x.rotate(0.05 * r * Math.sin(t * 39))
  box(x, -90, -80, 180, 120, '#efe6d6', { bw: 6 }); x.fillStyle = '#b06a3a'; x.fillRect(-84, -74, 168, 18 + 4 * Math.sin(t * 20) * r)
  box(x, 96, -55, 28, 60, '#efe6d6', { bw: 5 })
  x.restore()
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1 + 1) % 1; x.globalAlpha = 0.6 * (1 - ph); x.fillStyle = BONE; x.fillRect(cx - 30 + i * 30 + 14 * Math.sin(ph * 9 + i), cy - 110 - ph * 160, 12, 12); x.globalAlpha = 1 }
}
const EP = makeWM({
  id: 'kwme05', dur: 8, sign: 'scorpio', turn: TURN, brk: 'scratch',
  hook: 'Saying *“it’s chill”* | while not chill',
  last: 'very chill. extremely.',
  hero: H, wash: '#7a2fb0',
  heroOpts: (t) => ({ mood: 'neutral', look: [1, 1], hops: [SEND], squash: 0.03 * rattle(t) * Math.sin(t * 40) }),
  heroAfter(x, t, a, F) {
    const d = ease.inOutCubic(prog(t, 4.3 + 0.9, 4.3 + 1.6)) * 7
    inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(6, 16.5 + d, 24, 6); x.fillStyle = '#3a2d66'; x.fillRect(7.5, 17.5 + d, 8, 3.5); x.fillRect(20.5, 17.5 + d, 8, 3.5); x.fillStyle = '#ffffff'; x.fillRect(8.5, 18 + d, 2, 1); x.fillRect(21.5, 18 + d, 2, 1) })
  },
  front(x, t) {
    cup(x, t)
    phone(x, 790, 740, { w: 380, h: 500, rot: 0.08, draw: (c, w) => { sms(c, 'are you mad I rescheduled?', 'L', 40, w, { size: 28 }); if (t > SEND) sms(c, 'it’s chill :)', 'R', 200, w, { size: 32, alpha: clamp((t - SEND) * 5) }) } })
  },
  cues: [['whoosh', SEND, 0.25, 0.04], ['pop', SEND + 0.05, 880, 0.045, 0.3], ...Array.from({ length: 16 }, (_, i) => ['tick', +(0.1 + i * 0.26).toFixed(2), 0.015 + 0.002 * i])],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'synthwave', key: 'C#', seed: 2605 })
