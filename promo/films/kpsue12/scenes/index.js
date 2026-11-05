// kpsue12: PLANET TALK: THE SUN, Ep 12 "Pisces, Main Character" (28 s vertical, star_advice post, dreamy · E). Loop.
// Frame 0: the Sun mid-rise over the horizon, Pisces mid-sob into a tissue, hook "PISCES. Your turn to shine."
//   3.0 Pisces: my best friend got engaged, I'm just happy for them · 6.4 CRIED THIS WEEK (my own love life: "skip")
//   9.0 "I'm the sidekick" · 11.2 Sun: you hold everyone's heart, who holds yours? · 14.8 "…main character?"
//   16.6 the spotlight turns onto Pisces · 17.4 Sun: you deserve a love story too, start with how you talk to yourself
//   21.6 "Say it. Out loud." · 23.2 "Crying. In my spotlight." → loops to the sunrise.
import { episode, drawPanel, drawSpot, hearts, rr, key, INK } from '../../kpsue01/sunkit.js'

const CRIED = [{ at: 6.6, text: 'Mia & Jo got engaged' }, { at: 7.0, text: 'Sam’s first date went well' }, { at: 7.4, text: 'a stranger’s proposal video' }, { at: 7.8, text: 'my own love life: “skip”', color: '#c23a3a' }]

function tissues(x, t) {
  x.save(); x.translate(830, 1580); x.rotate(0.05)
  x.fillStyle = INK; rr(x, -90, -50, 180, 100, 14); x.fill(); x.fillStyle = '#c9e6ff'; rr(x, -82, -42, 164, 84, 10); x.fill()
  x.fillStyle = '#8fb0e0'; for (let i = 0; i < 4; i++) x.fillRect(-82 + i * 44, -42, 20, 84)
  const wv = Math.sin(t * 5) * 6
  x.fillStyle = '#fffdf6'; x.strokeStyle = INK; x.lineWidth = 4
  x.beginPath(); x.moveTo(-26, -42); x.quadraticCurveTo(-30 + wv, -100, 0, -116); x.quadraticCurveTo(30 + wv, -100, 26, -42); x.closePath(); x.fill(); x.stroke()
  x.restore()
}

const E = episode({
  sign: 'pisces', duration: 28, ending: 'loop',
  entrance: { kind: 'rise', at: -0.9, x: 540, y: 690, size: 640 },
  horizon: 1250,
  hook: { text: 'PISCES. Your *turn* | to shine.', top: 1640 },
  tint: '#8f7fff',
  sun: { mood: [[0, 'happy'], [3.0, 'love'], [6.4, 'wide'], [8.0, 'sad'], [11.2, 'happy'], [14.8, 'proud'], [16.6, 'love'], [17.4, 'happy'], [21.6, 'proud'], [23.2, 'love'], [27.4, 'happy']], tears: [[0, 0], [23.4, 1], [27.0, 0]], hops: [11.2, 17.4, 21.6] },
  me: {
    base: { x: 540, y: 1390, size: 360 },
    mood: [[0, 'sparkle'], [6.4, 'sparkle'], [9.0, 'neutral'], [11.2, 'wide'], [14.8, 'sparkle'], [16.6, 'wide'], [17.4, 'sparkle'], [23.2, 'happy'], [27.3, 'sparkle']],
    look: [[0, [0, -1]], [3.0, [0, 0]], [6.4, [0, -1]], [9.0, [0, 0]], [11.2, [0, -1]], [23.2, [0, 0]], [27.3, [0, -1]]],
    tears: [[0, 3], [9.0, 2], [11.2, 2], [16.6, 3]],
    hops: [16.7, 17.0, 23.3, 23.7],
  },
  bubbles: [
    { t0: 3.0, t1: 6.2, who: 'pisces', text: 'My best friend got engaged! I’m just *happy for them!*' },
    { t0: 9.0, t1: 11.0, who: 'pisces', text: 'I’m the sidekick. *Sidekicks are fine.*' },
    { t0: 11.2, t1: 14.6, who: 'sun', text: 'You hold everyone’s heart. Who holds *yours?*', y: 1110 },
    { t0: 14.8, t1: 16.8, who: 'pisces', text: '…me? *Main* character?' },
    { t0: 17.4, t1: 21.4, who: 'sun', text: 'You deserve a love story too. Start with how you talk to *yourself.*', y: 1110 },
    { t0: 21.6, t1: 23.0, who: 'sun', text: 'Say it. *Out loud.*', y: 1110 },
    { t0: 23.2, t1: 27.4, who: 'pisces', text: 'Crying. *In my* spotlight.', size: 56 },
  ],
  back(x, t) {
    const a = key(t, [[0, 0], [16.5, 0], [17.1, 1], [27.2, 1], [27.6, 0]])
    drawSpot(x, { sx: 540 + (1 - a) * 400, sy: -60, tx: 540, ty: 1400, w: 260, a })
  },
  front(x, t) {
    tissues(x, t)
    const p = Math.min(1, Math.max(0, (t - 6.3) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - 10.8) / 0.3)))
    if (p > 0.01) drawPanel(x, t, { x: 540, y: 1000, w: 760, h: 400, title: 'CRIED THIS WEEK', color: '#c9a6ff', pop: p, rows: CRIED, size: 36 })
    hearts(x, t, { at: 16.7, cx: 540, cy: 1250, color: '#c9a6ff' })
    hearts(x, t, { at: 23.3, cx: 540, cy: 1250, color: '#f2c75c' })
  },
  cues: [...CRIED.map((r, i) => ['pop', r.at, 659.25 + i * 70, 0.03, 0.2]), ['riser', 15.8, 16.7, 0.05], ['bell', 16.7, 659.25, 0.05, 2.4, 0], ['glitter', 16.6, 17.4], ['pluck', 23.25, 987.77, 0.05, 1.0, 0]],
})
export const { DURATION, SCENES, CUES } = E
