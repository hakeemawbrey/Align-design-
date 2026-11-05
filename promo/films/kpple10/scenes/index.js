// kpple10 · Planet Talk: Pluto · "Pluto to Capricorn: The Plan With Their Name" (27.4 s vertical, hard cut) · house · C
//   0      Pluto mid-slam onto Capricorn's open planner like a giant rubber stamp · "CAPRICORN. | *Rewrite* the plan."
//          0.2 lands: boom, shake, whip, a red REVISED stamp where it hit · 1.0 Pluto bounces up and hovers
//   2.9    "The plan still has | *their* name in it." · every "with them" circled
//   5.9    ♑ "I don't *redo* plans. I *finish* them." · 9.1 ♇ "a plan changing isn't *failure.*" · 11.8 "it's a new
//          *draft.*" · 13.9 "keep your goals. let the *shape* change."
//   17.1   the eraser: "with them" rubs out · 18.6 the new draft writes in, line by line: "someday: someone kind"
//   21.8   Pisces sobbing: "*someday* is my favourite word" · 24.4 ♇ "new draft. still *counts.*"
//   26.1   "Same goals. | *New* draft." · hard cut at 27.4
import { plutoFilm } from '../../kpple01/plutokit.js'

const D = 27.4
const PL = 'pluto', CP = 'capricorn', PI = 'pisces'
const ERASE = 17.1, WRITE = 18.6
const OLD = ['2026  a trip with them', '2027  move in with them', '2028  a dog with them', '2029  ???']
const NEW = ['2026  a trip (solo!)', '2027  my own place', '2028  a dog. MY dog.', 'someday  someone kind']
const GOALS = ['promotion ✓', 'run 10k', 'learn to bake', 'see the sea']

const F = plutoFilm({
  id: 'kpple10', sign: CP, dur: D, ending: 'cut',
  hook: { text: 'CAPRICORN. | *Rewrite* the plan.', out: [2.5, 2.75] },
  enter: { kind: 'crash', at: -0.9, len: 1.0, x: 540, y: 820, size: 260 },
  shots: [{ at: 16.9, z: 1.12, cx: 540, cy: 1100, d: 0.6 }, { at: 21.6, z: 1, cx: 540, cy: 960, d: 0.5 }],
  says: [
    { t0: 5.9, t1: 8.8, who: CP, text: "I don't *redo* plans. I *finish* them.", x: 540, y: 1800, tailUp: true, tail: 200 },
    { t0: 9.1, t1: 11.6, who: PL, text: "a plan changing isn't *failure.*", x: 540, y: 330 },
    { t0: 11.8, t1: 13.6, who: PL, text: "it's a new *draft.*", x: 540, y: 330 },
    { t0: 13.9, t1: 16.9, who: PL, text: 'keep your goals. let the *shape* change.', x: 540, y: 330 },
    { t0: 21.8, t1: 24.2, who: PI, text: '*someday* is my favourite word', x: 430, y: 1820, tailUp: true, tail: -100 },
    { t0: 24.4, t1: 25.9, who: PL, text: 'new draft. still *counts.*', x: 540, y: 330 },
  ],
  heads: [{ text: 'The plan still has | *their* name in it.', at: 2.9, out: [5.6, 5.85], y: 290, size: 76 }],
  last: { text: 'Same goals. | *New* draft.', at: 26.1, y: 290 },
  bg(x, t, K) {
    K.room(x, t, { wall: '#2a2e3a', wall2: '#151822', floor: '#3a2e2a', floorY: 1700, window: false, warm: 0.45 })
    K.rect(x, -300, 1380, 1680, 60, '#6a4a32'); K.rect(x, -300, 1440, 1680, 260, '#4a3222')
  },
  paint(x, t, K) {
    // the open planner
    const sq = t > K.LAND ? 0.04 * Math.exp(-(t - K.LAND) * 6) * Math.cos((t - K.LAND) * 30) : 0
    x.save(); x.translate(540, 1380); x.scale(1 + sq, 1 - sq); x.translate(-540, -1380)
    K.box(x, 80, 860, 920, 530, '#3a2a4a', { o: 6 })
    K.rect(x, 100, 878, 430, 494, '#f8f3e8'); K.rect(x, 550, 878, 430, 494, '#f4efe2'); K.rect(x, 532, 870, 16, 510, '#c9b9a0')
    K.txt(x, '5-YEAR PLAN', 315, 930, { size: 32, color: '#2a2030', font: K.INTER, weight: 900 })
    K.txt(x, 'GOALS', 765, 930, { size: 32, color: '#2a2030', font: K.INTER, weight: 900 })
    const er = K.prog(t, ERASE, WRITE)
    OLD.forEach((s, i) => {
      const y = 1010 + i * 82
      const wk = K.prog(t, WRITE + i * 0.7, WRITE + i * 0.7 + 0.5)
      if (er < 1) { x.save(); x.globalAlpha = 1 - K.prog(er, i * 0.2, i * 0.2 + 0.4); K.txt(x, s, 120, y, { size: 24, align: 'left', color: '#2a2030' }); x.restore() }
      if (wk > 0) { x.save(); x.beginPath(); x.rect(110, y - 30, 410 * wk, 60); x.clip(); K.txt(x, NEW[i], 120, y, { size: 24, align: 'left', color: i === 3 ? '#c04a7a' : '#2a6a4a' }); x.restore() }
      // the circles on "with them"
      if (i < 3 && t > 3.4 + i * 0.3 && t < ERASE + 0.4) {
        const k = K.prog(t, 3.4 + i * 0.3, 3.7 + i * 0.3)
        x.save(); x.globalAlpha = 1 - K.prog(t, ERASE, ERASE + 0.4); x.strokeStyle = '#e03a3a'; x.lineWidth = 5; x.beginPath(); x.ellipse(440, y, 80, 26, -0.05, 0, Math.PI * 2 * k); x.stroke(); x.restore()
      }
    })
    GOALS.forEach((s, i) => K.txt(x, s, 580, 1010 + i * 82, { size: 24, align: 'left', color: '#2a2030' }))
    // the REVISED stamp where Pluto hit
    if (t > K.LAND) { const k = K.pop01(t, K.LAND, 0.2, 2.6); x.save(); x.translate(760, 1290); x.rotate(-0.12); x.scale(k, k); x.globalAlpha = 0.85; x.strokeStyle = '#e03a3a'; x.lineWidth = 7; x.strokeRect(-150, -42, 300, 84); K.txt(x, 'REVISED', 0, 2, { size: 52, font: K.INTER, weight: 900, color: '#e03a3a' }); x.restore() }
    x.restore()
    // the eraser
    if (t > ERASE - 0.2 && t < WRITE + 0.2) { const p = K.prog(t, ERASE, WRITE); x.save(); x.translate(160 + 300 * (0.5 + 0.5 * Math.sin(p * 18)), 1000 + p * 260); x.rotate(-0.4); K.box(x, -60, -30, 120, 60, '#ff9ab0', { o: 5 }); K.rect(x, -60, -30, 40, 60, '#5a8ad0'); x.restore() }
    // Pluto: slams down, then bounces up and hovers above the planner
    const up = K.ease.outBack(K.prog(t, 1.0, 1.6))
    K.pluto(x, t, { y: K.lerp(820, 640, up), mood: t < 5.8 ? 'angry' : t > 24.3 ? 'proud' : t > 18.5 ? 'happy' : 'neutral', look: t > 5.8 && t < 8.9 ? [1, 1] : t > ERASE && t < 21.5 ? [0, 1] : undefined })
    K.sign(x, t, CP, { x: 800, y: 1560, size: 250, mood: t < 2.7 ? 'wide' : t < 9 ? 'squint' : t < 17 ? 'neutral' : 'happy', look: t < 2.7 ? [0, -1] : [-1, -1] })
    if (t > 21.6) K.pisces(x, t, { x: 260, y: 1570, size: 220, pop: K.pop01(t, 21.6, 0.35), look: [1, -0.6] })
  },
  cues: [
    ['pop', 3.4, 523.25, 0.03, 0], ['pop', 3.7, 587.33, 0.03, 0], ['pop', 4.0, 659.25, 0.03, 0],
    ...Array.from({ length: 6 }, (_, i) => ['whoosh', +(ERASE + i * 0.25).toFixed(2), 0.15, 0.025]),
    ...NEW.map((s, i) => ['pop', +(WRITE + i * 0.7).toFixed(2), 880 + i * 110, 0.03, 0]), ['glitter', WRITE + 2.1, WRITE + 3], ['glitter', 21.8, 22.8],
  ],
  music: { style: 'house', key: 'C', seed: 11010, sections: { breakdown: [9.1], lift: [WRITE] } },
})
export const DURATION = F.DURATION, SCENES = F.SCENES, CUES = F.CUES, MUSIC = F.MUSIC
