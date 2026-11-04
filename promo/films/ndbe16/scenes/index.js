// ndbe16: DEALBREAKER OR NOT? E16, "They show up | *ten minutes* early." (15 s vertical trial reel, music: chiptune · B).
//   0.0–3.9   frame 0: ♈ Aries mid-bounce on a doorstep, a pot of soup in hand, the porch clock at 6:50. 1.3 the door
//             opens: ♓ Pisces in a towel turban, one sock on: "it's 6:50?!" 2.2 Aries: "I brought soup!" 2.9 Pisces
//             tears up (happy).
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    inside, both on the couch with soup bowls, Pisces (still in the turban) happy-crying; hearts.
//             THE STARS: "Early means *excited.* Let it be cute."
import { makeDeal, R, box, bubble, hearts, sparkles, floor, glow, couch, clockFace, inSprite, tearsCells, snowfall, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, T } from '../../ndbe01/scenes/dealkit.js'

export function soupPot(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -60, -40, 120, 70, '#e8344e', { b: 6, hi: '#ff6177' }); box(x, -70, -52, 140, 14, '#c42a3f', { b: 5 }); R(x, INK, -86, -24, 18, 12); R(x, INK, 68, -24, 18, 12)
  x.globalAlpha *= 0.55; for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; R(x, '#f4f0ff', -30 + i * 26 + 6 * Math.sin(t * 4 + i), -70 - p * 60, 8, 16) }
  x.restore()
}
function turban(x, F) { inSprite(x, F, () => { const C = ['..WWWWW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWWW']; C.forEach((r, j) => [...r].forEach((c, i) => { if (c === '.') return; x.fillStyle = INK; x.fillRect(11 + i * 1.6 - 0.3, 1 + j * 1.5 - 0.3, 2.2, 2.1); x.fillStyle = (i + j) % 3 ? '#ffffff' : '#bfe8ff'; x.fillRect(11 + i * 1.6, 1 + j * 1.5, 1.6, 1.5) })) }) }
const OPEN = 1.3, SOUP = 2.2, CRY = 2.9
const EP = makeDeal({
  id: 'ndbe16', sign: 'aries', date: 'pisces', verdict: 'not', accent: '#ff6b5a', castHasPisces: true,
  hook: 'They show up | *ten minutes* early.',
  last: 'Early means *excited.* Let it be cute.',
  pis: { hide: true },
  scene(x, t, S) {
    const { u, hero, date, dateF } = S
    floor(x, 1150, '#3a2a3f')
    snowfall(x, t, { top: 380, bottom: 1150, n: 26, a: 0.6 })
    // the door (opens at OPEN)
    const op = ease.outCubic(prog(u, OPEN, OPEN + 0.3))
    box(x, 600, 560, 300, 590, '#2a1a3a', { b: 7 })
    glow(x, 750, 860, 280, 0.3 * op, '255,214,150')
    x.save(); x.translate(600, 560); x.scale(1 - 0.85 * op, 1); box(x, 0, 0, 300, 590, '#8a5a3c', { b: 7, hi: '#a87452' }); R(x, GOLD, 250, 300, 18, 18); x.restore()
    clockFace(x, 440, 560, 56, 6, 50)
    if (u > OPEN) {
      const dO = { x: 760, y: 930, s: 230, pop: pop01(t, OPEN + 0.1, 0.3, 2), mood: u > CRY ? 'happy' : 'wide', look: [-1, 0], hops: [OPEN + 0.15, CRY] }
      date(x, t, dO); const F = dateF(t, dO); turban(x, F); inSprite(x, F, () => tearsCells(x, t, u > CRY ? 3 : 1))
    }
    hero(x, t, { x: 300, y: 930, s: 250, mood: 'sparkle', look: [1, 0], hops: u < OPEN ? [-0.3, 0.05, 0.4, 0.75, 1.1] : [SOUP] })
    soupPot(x, t, 300, 1090, 1)
    bubble(x, t, 780, 640, OPEN + 0.2, 3.85, "it's 6:50?!", { size: 38, tail: -0.1 })
    bubble(x, t, 300, 660, SOUP, 3.85, 'I brought soup!', { size: 38, tail: 0 })
    hearts(x, t, CRY, 760, 780, { n: 5 })
  },
  sceneCues: [['tick', 0.05, 0.04], ['tick', 0.4, 0.04], ['tick', 0.75, 0.04], ['tick', 1.1, 0.04], ['whoosh', OPEN, 0.3, 0.03], ['pop', OPEN + 0.2, 1318.51, 0.045, 0.3], ['pop', SOUP, 880, 0.045, -0.3], ['pluck', CRY, 1567.98, 0.04, 0.5, 0.3]],
  finale(x, t, S) {
    const { u, k, hero, date, dateF } = S
    floor(x, 1150, '#3a2a3f')
    if (k <= 0.01) return
    glow(x, 540, 900, 460, 0.2 * k)
    couch(x, 540, 1070, 700)
    hero(x, t, { x: 380, y: 950, s: 230, pop: k, mood: 'happy', look: [1, 0], hops: [T.stamp + 1.2] })
    const dO = { x: 700, y: 955, s: 225, pop: k, mood: 'happy', look: [-1, 0], hops: [T.stamp + 1.6] }
    date(x, t, dO); const F = dateF(t, dO); turban(x, F); inSprite(x, F, () => tearsCells(x, t, 3))
    soupPot(x, t, 540, 1170, 0.8 * k)
    hearts(x, t, T.stamp + 1.2, 540, 820, { n: 6 })
    sparkles(x, t, 540, 900, T.stamp + 1.2, 8, 150, 1, [GOLD, PINK, BONE])
  },
  finaleCues: [['pluck', 1.2, 1174.66, 0.04, 0.5, 0], ['glitter', 1.2, 1.6]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, clamp, outK]
