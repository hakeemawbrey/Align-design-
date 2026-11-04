// ngie12: THE SIGNS AS WINTER GIFTS, "Pisces as a winter gift" (14 s vertical trial reel, music: dreamy · E).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
// Pisces is the hero and cries the whole way through; the recipient is Cancer.
//   0.0–2.4   hook "If *Pisces* were a | winter gift:" — Pisces mid-tug (and mid-sob) on the ribbon of a sea-blue box:
//             "I'm not crying, YOU'RE crying."
//   2.4–5.2   1 "a jar of notes for every *cold day.*" A glass jar of folded paper notes rises, glowing.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "Pisces cried *writing* every one." Flashback: Pisces at a desk, a pile of notes, a pile of tissues.
//   8.0–11.6  THE STARS: "Soft hearts make the *warmest* gifts."
import { makeEp, R, box, bubble, shadow, tissues, tearsCells, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

function jar(x, t, cx, cy, k) {
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 0, 20, 0, 0, 220); g.addColorStop(0, 'rgba(255,230,160,0.35)'); g.addColorStop(1, 'rgba(255,230,160,0)'); x.fillStyle = g; x.fillRect(-220, -220, 440, 440); x.restore()
  box(x, -120, -150, 240, 290, 'rgba(190,230,255,0.45)', { b: 7 })
  box(x, -100, -190, 200, 40, '#c9a06a', { b: 6 })
  const C = ['#fff1a8', '#ffd1dc', '#dff1ff', '#e6ffe8', BONE]
  for (let i = 0; i < 18; i++) { const px = -95 + (i * 53) % 180, py = 110 - Math.floor(i / 4) * 52 + (i % 2) * 10; x.save(); x.translate(px + 10, py); x.rotate((i % 5 - 2) * 0.3); R(x, INK, -22, -14, 44, 28); R(x, C[i % 5], -19, -11, 38, 22); x.restore() }
  R(x, 'rgba(255,255,255,0.45)', -96, -130, 18, 200)
  x.restore()
}
const crying = (S, x, t, o, k) => { S.hero(x, t, o); S.dress(x, t, o, () => tearsCells(x, t, k)) }

const EP = makeEp({
  id: 'ngie12', series: 'gifts', sign: 'pisces', name: 'Pisces', boxCol: '#3a8fd0', ribbon: BONE, friend: 'cancer',
  hook(x, t, S) {
    giftHook(x, t, S, { line: 'I’m not crying, YOU are.' })
    S.dress(x, t, { x: 300 - (t > 1.7 ? 0 : (0.5 + 0.5 * Math.sin(t * 7)) * 18), y: 960, s: 250, hops: [-0.2, 1.72] }, () => tearsCells(x, t, 2))
  },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'a jar of notes for every *cold day.*',
      draw(x, t, S) {
        giftReveal(x, t, S, jar, { line: 'open one when it snows.', heroMood: 'sparkle' })
        S.dress(x, t, { x: 270, y: 970, s: 220, hops: [S.t0 + 0.6, S.t0 + 1.5] }, () => tearsCells(x, t, 2))
        S.guest(x, t, 'cancer', { x: 930, y: 1060, s: 150, mood: S.u > 0.8 ? 'heart' : 'wide', look: [-1, -0.5], seed: 120, hops: [S.t0 + 0.8] })
      },
      cues: [...revealCues, ['glitter', 0.7, 1.4], ['pop', 1.2, 987.77, 0.035, 0]] },
    { caption: 'Pisces cried *writing* every one.',
      draw(x, t, S) {
        const { u } = S
        x.fillStyle = 'rgba(40,20,70,0.45)'; x.fillRect(0, 380, 1080, 1540)
        box(x, 260, 1000, 560, 30, '#7a5a44', { b: 6 }); R(x, INK, 290, 1030, 14, 120); R(x, INK, 776, 1030, 14, 120)
        const n = Math.min(9, Math.floor(u * 4) + 2)
        for (let i = 0; i < n; i++) { x.save(); x.translate(640 + (i % 3) * 40, 985 - Math.floor(i / 3) * 18); x.rotate((i % 4 - 1.5) * 0.25); R(x, INK, -26, -10, 52, 20); R(x, ['#fff1a8', '#ffd1dc', '#dff1ff'][i % 3], -23, -7, 46, 14); x.restore() }
        tissues(x, 340, 980, 90)
        for (let i = 0; i < 5; i++) R(x, '#ffffff', 400 + i * 22, 990 - (i % 2) * 10, 18, 14)
        crying(S, x, t, { x: 520, y: 860, s: 230, mood: 'sparkle', look: [1, 1], hops: [S.t0 + 0.5, S.t0 + 1.2, S.t0 + 1.9] }, 3)
        bubble(x, t, 540, 620, S.t0 + 1.0, S.t1, 'note 47: you’re so warm.', { size: 32, col: '#e6e2ff' })
      },
      cues: [['whoosh', 0.0, 0.4, 0.02], ['tick', 0.25, 0.03], ['tick', 0.5, 0.03], ['tick', 0.75, 0.03], ['tick', 1.0, 0.03], ['pop', 1.0, 987.77, 0.035, 0]] },
  ],
  finale(x, t, S) {
    const { ok, HOPS, hero, dress } = S
    shadow(x, 480, 1110, 240 * ok)
    const o = { x: 480, y: 900, s: 270, pop: ok, mood: 'sparkle', look: [0, 0], hops: HOPS }
    hero(x, t, o); dress(x, t, o, () => tearsCells(x, t, 3))
    if (ok > 0.2) jar(x, t, 700, 1000, 0.45 * ok)
  },
  last: 'Soft hearts make the *warmest* gifts.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [GOLD, PINK]
