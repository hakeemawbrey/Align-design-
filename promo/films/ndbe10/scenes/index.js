// ndbe10: DEALBREAKER OR NOT? E10, "They go to bed | at *9:30.*" (13 s vertical trial reel, music: lofi · Ab).
//   0.0–3.9   frame 0: ♑ Capricorn mid-yawn in a nightcap, the wall clock at 9:30 (YAWN). 0.9 ♌ Leo bursts in, all party
//             sparkle: "party?!" (clock 9:31). 1.8 Capricorn's lamp clicks off; zzz. 2.6 SUNRISE: Capricorn at Leo's door
//             with two coffees: "breakfast?" — Leo, bleary, melts (3.3).
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    breakfast by the window at sunrise: pancakes, two mugs, both happy; hearts.
//             THE STARS: "Early nights, *bright* mornings. Do breakfast."
import { makeDeal, R, box, bubble, label, hearts, sparkles, floor, glow, clockFace, inSprite, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'
import { mug } from '../../ndbe01/scenes/index.js'

function nightcap(x, F) { inSprite(x, F, () => { const C = ['......B', '.....BW', '....BBB', '...BBBB', '..BBBBB', '.BBBBBB', 'WWWWWWWW']; C.forEach((r, j) => [...r].forEach((c, i) => { if (c === '.') return; x.fillStyle = INK; x.fillRect(12 + i * 1.6 - 0.3, -3 + j * 1.3 - 0.3, 2.2, 1.9); x.fillStyle = c === 'W' ? BONE : '#5a7ad8'; x.fillRect(12 + i * 1.6, -3 + j * 1.3, 1.6, 1.3) })) }) }
function lamp(x, t, cx, cy, on) {
  if (on > 0) glow(x, cx, cy - 80, 260, 0.3 * on, '255,214,150')
  box(x, cx - 50, cy - 130, 100, 60, on > 0.5 ? '#ffe6a8' : '#8a84a0', { b: 5 }); R(x, INK, cx - 5, cy - 70, 10, 70); box(x, cx - 40, cy - 6, 80, 12, '#6b4a2f', { b: 4 })
}
function sunrise(x, a) { if (a <= 0) return; x.save(); x.globalAlpha = a; const g = x.createLinearGradient(0, 400, 0, 1150); g.addColorStop(0, '#ff9a6b'); g.addColorStop(0.6, '#ffd27a'); g.addColorStop(1, '#ffe9b8'); x.fillStyle = g; x.fillRect(0, 380, 1080, 770); x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(540, 1150, 170, Math.PI, 0); x.fill(); x.restore() }
function pancakes(x, cx, cy, k) { x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -70, -6, 140, 12, BONE, { b: 4 }); for (let i = 0; i < 3; i++) box(x, -50, -26 - i * 20, 100, 16, '#e0a24a', { b: 4 }); R(x, '#ffd23a', -14, -76, 28, 10); x.restore() }
const LEO = 0.9, OFF = 1.8, SUN = 2.6, MELT = 3.3
const EP = makeDeal({
  id: 'ndbe10', sign: 'capricorn', date: 'leo', verdict: 'not', accent: '#9fd8f6',
  hook: 'They go to bed | at *9:30.*',
  last: 'Early nights, *bright* mornings. Do breakfast.',
  scene(x, t, S) {
    const { u, hero, date, heroF } = S
    const sun = clamp(prog(u, SUN, SUN + 0.2))
    floor(x, 1150, '#2a2040')
    if (sun < 1) {
      const on = 1 - prog(u, OFF, OFF + 0.05)
      clockFace(x, 820, 560, 70, 9, u < LEO ? 30 : 31)
      lamp(x, t, 170, 1150, on)
      const ho = { x: 420, y: 930, s: 260, mood: u < OFF ? (u < 0.6 ? 'wide' : 'sleepy') : 'sleepy', look: [1, 0], hops: [LEO + 0.1] }
      hero(x, t, ho); nightcap(x, heroF(t, ho))
      const yk = outK(t, [0.5, 0.7]); if (yk > 0.01) label(x, 'YAWN', 420, 690, { size: 48, col: BONE, font: 'Inter, sans-serif', weight: 800, alpha: yk })
      const lx = lerp(1250, 800, ease.outCubic(prog(u, LEO, LEO + 0.35)))
      if (u > LEO) { date(x, t, { x: lx, y: 930, s: 240, mood: 'sparkle', look: [-1, 0], hops: [LEO + 0.35, LEO + 0.7, 1.4] }); sparkles(x, t, lx, 900, LEO + 0.3, 10, 150, 1, [GOLD, PINK, BONE]) }
      bubble(x, t, 800, 720, LEO + 0.3, OFF + 0.4, 'party?!', { size: 40, tail: 0.2 })
      if (u > OFF) { x.save(); x.globalAlpha = 0.55 * prog(u, OFF, OFF + 0.05); x.fillStyle = '#05030c'; x.fillRect(0, 380, 1080, 1040); x.restore(); label(x, 'z z z', 470, 720, { size: 44, col: '#c9a6ff', alpha: prog(u, OFF + 0.2, OFF + 0.4) }) }
    }
    if (sun > 0) {
      sunrise(x, sun)
      box(x, 700, 640, 200, 510, '#8a5a3c', { b: 7, hi: '#a87452' }); R(x, GOLD, 870, 900, 14, 14)
      const ho = { x: 400, y: 950, s: 250, mood: 'happy', look: [1, 0], hops: [SUN + 0.2, MELT] }
      hero(x, t, ho)
      mug(x, t, 270, 1040, 1.3); mug(x, t, 530, 1040, 1.3)
      date(x, t, { x: 800, y: 900, s: 200, mood: u > MELT ? 'heart' : 'sleepy', look: [-1, 0], hops: [MELT], zzz: false })
      bubble(x, t, 420, 720, SUN + 0.15, 3.85, 'breakfast?', { size: 40, tail: -0.1 })
      hearts(x, t, MELT, 800, 780, { n: 4 })
    }
  },
  sceneCues: [['pop', LEO, 1174.66, 0.045, 0.3], ['glitter', LEO + 0.3, LEO + 0.7], ['tick', OFF, 0.08], ['bell', SUN, 1760, 0.03, 1.0, 0], ['glitter', SUN, SUN + 0.5], ['pop', SUN + 0.15, 880, 0.04, -0.3], ['pluck', MELT, 1567.98, 0.04, 0.5, 0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date, heroF } = S
    sunrise(x, k > 0 ? 1 : 0)
    floor(x, 1150, '#6a4a5a')
    if (k <= 0.01) return
    hero(x, t, { x: 330, y: 900, s: 240, pop: k, mood: 'happy', look: [1, 0], hops: [T.stamp + 1.2] })
    date(x, t, { x: 750, y: 900, s: 240, pop: k, mood: u > 1.2 ? 'heart' : 'happy', look: [-1, 0], hops: [T.stamp + 1.2, T.stamp + 2.2] })
    box(x, 260, 1020, 560, 24, '#8a5a3c', { b: 6, hi: '#a87452' }); R(x, INK, 520, 1044, 40, 106)
    pancakes(x, 540, 1015, k); mug(x, t, 400, 990, 1.1 * k); mug(x, t, 680, 990, 1.1 * k)
    hearts(x, t, T.stamp + 1.25, 540, 820, { n: 5 })
    void heroF
  },
  finaleCues: [['pluck', 1.2, 1174.66, 0.04, 0.5, 0], ['pluck', 1.32, 1567.98, 0.035, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [pop01, outK]
