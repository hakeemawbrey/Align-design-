// kwme13: WAIT, THAT'S ME, "Catching feelings in the grocery line" (9 s loop, star_advice trial, music: pop · F).
//   0.00  frame 0: ♈ Aries mid-reach for the last loaf on the shelf; a stranger star's point touches it too; hook on.
//   0.32  scratch + freeze.  1.1 eye contact: a heart-rate HUD slams on (THUMP · THUMP, the pixel heart pounds).
//   2.6   the stranger: "you take it!" and strolls off (3.0–4.2).  Aries is left hugging the bread.
//   4.8–6.3  the slow turn.  6.4  last line: "we shared a bread moment."   8.55–9 loop back.
import { makeWM, wmMusic, box, drawBits, label, bubble, drawStarChar, signStar, pop01, outK, prog, ease, lerp, HEART, GOLD, RED, MINT, INK } from '../../kwme01/wmkit.js'

const H = { x: 330, y: 1220, s: 400, face: 1 }
const LOOK = 1.1, SAYS = 2.6, LEAVE = [3.0, 4.2], TURN = 4.8
const ST = signStar('libra')
const LOAF = ['..BBBBBB..', '.BbBbBbBB.', 'BBBBBBBBBB', 'BBBBBBBBBB', '.BBBBBBBB.']
function shelf(x) {
  box(x, 90, 860, 900, 26, '#8a6a4a', { bw: 6 }); box(x, 90, 560, 900, 26, '#8a6a4a', { bw: 6 })
  for (let i = 0; i < 5; i++) box(x, 140 + i * 170, 470, 110, 90, ['#e0507a', '#7fd0ff', '#ffe27a', '#9fe6b0', '#c9a6ff'][i], { bw: 5 })
  box(x, 150, 800, 120, 60, '#c9a6ff', { bw: 5 })
}
function loafPos(t) {
  const lv = ease.inOutCubic(prog(t, SAYS + 0.3, LEAVE[0] + 0.3))
  return { x: lerp(560, H.x + 70, lv), y: lerp(810, H.y + 175, lv) }
}
const EP = makeWM({
  id: 'kwme13', dur: 9, sign: 'aries', turn: TURN, brk: 'scratch',
  hook: 'Catching *feelings* | in the grocery line',
  last: 'we shared a bread moment.',
  hero: H, wash: '#2fa06a',
  heroOpts: (t) => ({ mood: t < LOOK ? 'wide' : t < LEAVE[1] ? 'heart' : 'sparkle', look: t < LOOK ? [1, -1] : [1, -0.3], hops: [-0.2, LOOK, LEAVE[0] + 0.1], tilt: 0.08 }),
  back(x, t) {
    shelf(x)
    const lp = prog(t, ...LEAVE)
    drawStarChar(x, lerp(800, 1300, ease.inCubic(lp)), 1120, 320, t, { color: ST.color, glyph: ST.glyph, mood: t < LOOK ? 'wide' : 'happy', look: t > LEAVE[0] ? [1, 0] : [-1, -0.5], seed: 7, blush: t > LOOK ? 1 : 0, hops: [LOOK + 0.1, SAYS, 3.3, 3.7, 4.1] })
  },
  front(x, t) {
    const L = loafPos(t)
    drawBits(x, LOAF, { B: '#d99a52', b: '#f2c98a' }, L.x, L.y, 14)
    // the heart-rate HUD
    const k = pop01(t, LOOK, 0.25, 2.8) * outK(t, [TURN, TURN + 0.2])
    if (k > 0.01) {
      const beat = 1 + 0.25 * Math.max(0, Math.sin(t * 14))
      x.save(); x.translate(800, 680); x.scale(k, k); box(x, -170, -70, 340, 140, '#14102a', { bw: 6, ink: MINT })
      drawBits(x, HEART, { H: RED }, -105, 0, 12 * beat)
      label(x, 'THUMP', 50, -20, { size: 40, col: MINT, stroke: null, font: "'Space Mono', monospace", weight: 700 }); label(x, 'THUMP', 50, 28, { size: 40, col: MINT, stroke: null, font: "'Space Mono', monospace", weight: 700 })
      x.restore()
    }
    bubble(x, t, 860, 900, SAYS, LEAVE[0] + 0.6, 'you take it!', { size: 40, tail: -0.2 })
  },
  cues: [['tom', LOOK, 80, { gain: 0.2, decay: 0.2 }], ...Array.from({ length: 10 }, (_, i) => ['tom', +(LOOK + 0.25 + i * 0.45).toFixed(2), 70, { gain: 0.14, decay: 0.15 }]), ['pop', SAYS, 1174.66, 0.04, 0.4], ['whoosh', LEAVE[0], 1.2, 0.02]],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'pop', key: 'F', seed: 2613 })
void [GOLD, INK]
