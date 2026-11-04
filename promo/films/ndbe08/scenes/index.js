// ndbe08: DEALBREAKER OR NOT? E8, "They lied about | something *small.*" (15 s vertical trial reel, music: cinematic · Cm).
//   0.0–3.9   frame 0: ♏ Scorpio mid-squint at a little potted plant on a shelf. 0.6 the grey date (no sign): "I water it
//             every day!" 1.6 a price tag flips out of the pot and swings: PLASTIC. 2.3 Scorpio's eyebrow climbs (one
//             pixel brow, up up up); the date sweats.
//   3.9 the vote · 6.1 the stamp: DEALBREAKER. + "ADDED TO MY DEALBREAKERS".
//   finale    Scorpio at home with a real plant (a tiny new sprout) and a watering can, content; the sprout grows a leaf.
//             THE STARS: "Small fibs make *big* doubts."
import { makeDeal, R, box, bubble, label, sparkles, floor, glow, prog, lerp, ease, clamp, pop01, outK, starFrame, inSprite, drawBits, INK, BONE, GOLD, T } from '../../ndbe01/scenes/dealkit.js'

function pot(x, cx, cy, k = 1) { x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -50, -60, 100, 70, '#c4673a', { b: 6, hi: '#e0844e' }); x.restore() }
function fakePlant(x, t, cx, cy) {
  pot(x, cx, cy)
  drawBits(x, ['..L.L..', '.LLLLL.', 'LLL.LLL', '.LLLLL.', '..LLL..', '...S...', '...S...'], { L: '#3fcf7a', S: '#2a8a4a' }, cx, cy - 110, 16)
  R(x, 'rgba(255,255,255,0.5)', cx - 40, cy - 160, 10, 10); R(x, 'rgba(255,255,255,0.5)', cx + 20, cy - 140, 10, 10)
}
const SAY = 0.6, TAG = 1.6, BROW = 2.3
const EP = makeDeal({
  id: 'ndbe08', sign: 'scorpio', date: 'grey', verdict: 'deal', accent: '#ff6177', voteMood: 'squint',
  hook: 'They lied about | something *small.*',
  last: 'Small fibs make *big* doubts.',
  scene(x, t, S) {
    const { u, hero, date, heroF } = S
    floor(x, 1150, '#2a2040')
    box(x, 380, 980, 320, 26, '#8a5a3c', { b: 6, hi: '#a87452' }); R(x, INK, 400, 1006, 16, 144); R(x, INK, 664, 1006, 16, 144)
    fakePlant(x, t, 540, 975)
    // the price tag: swings out of the pot on a string
    if (u > TAG) {
      const a = 0.9 * Math.exp(-(u - TAG) * 2) * Math.sin((u - TAG) * 9)
      x.save(); x.translate(590, 930); x.rotate(a); R(x, INK, -2, 0, 4, 70); box(x, -54, 70, 108, 50, BONE, { b: 5 })
      x.font = "800 22px Inter, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d8283f'; x.fillText('PLASTIC', 0, 96); x.restore()
    }
    const ho = { x: 260, y: 900, s: 250, mood: 'squint', look: [1, 0.4], hops: [TAG + 0.1, BROW] }
    hero(x, t, ho)
    // the eyebrow climbing
    const bu = clamp(prog(u, BROW, BROW + 0.6))
    if (u > BROW) { const F = heroF(t, ho); inSprite(x, F, () => { x.fillStyle = INK; x.fillRect(19.5, 13.5 - 3.5 * bu, 6, 1.4) }) }
    date(x, t, { x: 820, y: 910, s: 240, mood: u > TAG ? 'wide' : 'happy', look: [-1, 0.3], hops: [SAY, TAG + 0.2] })
    bubble(x, t, 790, 650, SAY, TAG + 0.5, 'I water it every day!', { size: 34, tail: 0.2 })
    if (u > TAG + 0.4) for (let i = 0; i < 3; i++) { const p = ((u * 1.4 + i / 3) % 1); R(x, '#8fe3ff', 880 + i * 20, 780 + p * 60, 8, 12) }
    label(x, '…hm.', 260, 660, { size: 46, col: BONE, alpha: prog(u, BROW + 0.3, BROW + 0.5) })
  },
  sceneCues: [['pop', SAY, 880, 0.045, 0.3], ['tick', TAG, 0.07], ['pop', TAG + 0.02, 523.25, 0.045, 0.2], ['riser', BROW, BROW + 0.6, 0.02], ['pluck', BROW + 0.6, 1046.5, 0.035, 0.5, -0.3]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero } = S
    floor(x, 1150, '#2a2040')
    if (k <= 0.01) return
    glow(x, 600, 950, 300, 0.2 * k, '255,220,160')
    hero(x, t, { x: 360, y: 900, s: 250, pop: k, mood: u > 1.5 ? 'happy' : 'neutral', look: [1, 0.5], hops: [T.stamp + 1.5] })
    box(x, 470, 1000, 300, 22, '#8a5a3c', { b: 6 })
    pot(x, 620, 995, k)
    const g = clamp(prog(u, 1.4, 2.2))
    drawBits(x, g > 0.5 ? ['L.L', 'LSL', '.S.', '.S.'] : ['.L.', '.S.', '.S.'], { L: '#5fe397', S: '#2a8a4a' }, 620, 930 - g * 14, 12 * k)
    // watering can tilting
    x.save(); x.translate(720, 880); x.rotate(-0.4 * Math.sin(Math.PI * clamp(prog(u, 0.7, 1.6)))); box(x, -40, -30, 80, 60, '#7fd0ff', { b: 5 }); R(x, INK, -84, -26, 46, 12); R(x, '#7fd0ff', -80, -22, 40, 6); x.restore()
    if (u > 0.9 && u < 1.6) for (let i = 0; i < 3; i++) R(x, '#8fe3ff', 640 + i * 6, 900 + ((u * 3 + i / 3) % 1) * 60, 6, 10)
    sparkles(x, t, 620, 920, T.stamp + 1.6, 8, 70, 2, ['#5fe397', GOLD, BONE])
  },
  finaleCues: [['whoosh', 0.8, 0.4, 0.02], ['pluck', 1.6, 1174.66, 0.04, 0.5, 0], ['glitter', 1.6, 1.9]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, outK, pop01, starFrame, GOLD]
