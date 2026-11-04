// npye12: YOUR SIGN AT THE HOLIDAY PARTY, "Pisces at the holiday party" (14 s vertical trial reel, music: dreamy · Gb).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
// Pisces is the hero, so Pisces is the one crying all the way through (the running gag, front and centre).
//   0.0–2.4   hook "*Pisces* at the | holiday party:" — Pisces mid-sniffle under the string lights, a tissue box out:
//             "the lights are just SO pretty."
//   2.4–5.2   1 "cries in the *group photo.*" A camera on a tripod, three, two, one, FLASH: fountains.
//   5.2       hard cut (white flash).
//   5.2–8.0   2 "hugs the host goodbye for *twenty minutes.*" The clock hands spin. Cancer: "…we're still hugging."
//   8.0–11.6  THE STARS: "Bring your big *feelings.* They're invited."
import { makeEp, R, box, bubble, shadow, sparkles, hearts, tissues, tearsCells, clock, label, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT } from '../../npye01/scenes/kit.js'

function camera(x, cx, cy) {
  for (const d of [-1, 0, 1]) { x.save(); x.translate(cx, cy + 40); x.rotate(d * 0.35); R(x, INK, -6, 0, 12, 260); x.restore() }
  box(x, cx - 80, cy - 50, 160, 100, '#3a3352', { b: 6 }); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#6a8ab8'; x.beginPath(); x.arc(cx, cy, 28, 0, Math.PI * 2); x.fill(); R(x, '#c9c2dc', cx + 40, cy - 66, 34, 18)
}
const crying = (S, x, t, o, k) => { S.hero(x, t, o); S.heroHat(x, t, o); S.dress(x, t, o, () => tearsCells(x, t, k)) }

const EP = makeEp({
  id: 'npye12', series: 'party', sign: 'pisces', name: 'Pisces', friend: 'cancer',
  hook(x, t, S) {
    shadow(x, 520, 1125, 240)
    const o = { x: 520, y: 950, s: 280, mood: 'sparkle', look: [0, -1], hops: [-0.2, 0.9] }
    crying(S, x, t, o, 2)
    tissues(x, 760, 1060, 110)
    bubble(x, t, 520, 650, 0.8, 2.35, 'the lights are just SO pretty.', { size: 34, col: '#e6e2ff' })
  },
  hookCues: [['pop', 0.8, 987.77, 0.035, 0], ['glitter', 0.8, 1.2]],
  beats: [
    { caption: 'cries in the *group photo.*',
      draw(x, t, S) {
        const { u, guest } = S
        camera(x, 860, 820)
        const n = Math.max(0, 3 - Math.floor(u / 0.4))
        if (u < 1.2) label(x, String(n || 1), 860, 700, { size: 64, col: GOLD })
        ;[['aries', 160], ['leo', 640]].forEach(([id, gx], i) => guest(x, t, id, { x: gx, y: 1000, s: 150, mood: u > 1.2 ? 'happy' : 'neutral', look: [1, 0], seed: 100 + i, hops: [S.t0 + 1.2] }))
        shadow(x, 400, 1110, 220)
        crying(S, x, t, { x: 400, y: 960, s: 230, mood: 'sparkle', look: [1, 0], hops: [S.t0 + 1.2, S.t0 + 1.8] }, u > 1.2 ? 3 : 1)
        const fl = u > 1.2 && u < 1.45 ? 1 - (u - 1.2) / 0.25 : 0
        if (fl > 0) { x.fillStyle = `rgba(255,255,255,${0.7 * fl})`; x.fillRect(0, 0, 1080, 1920) }
        bubble(x, t, 400, 690, S.t0 + 1.5, S.t1, 'I just love you all!!', { size: 34, col: '#e6e2ff' })
      },
      cues: [['tick', 0.0, 0.05], ['tick', 0.4, 0.05], ['tick', 0.8, 0.05], ['boom', 1.2, 0.12], ['pop', 1.22, 1760, 0.04, 0.3], ['pop', 1.5, 987.77, 0.035, 0]] },
    { caption: 'hugs the host goodbye for *twenty minutes.*',
      draw(x, t, S) {
        const { u, guest } = S
        const m = ease.inOutCubic(prog(u, 0.2, 2.0)) * 20
        clock(x, 830, 620, 66, 11, 30 + m)
        label(x, `+${Math.round(m)} min`, 830, 730, { size: 34, col: GOLD, alpha: u > 0.3 ? 1 : 0 })
        shadow(x, 470, 1110, 300)
        guest(x, t, 'cancer', { x: 560, y: 960, s: 230, mood: u > 1.5 ? 'happy' : 'neutral', look: [-1, 0], seed: 110, squash: 0.06 })
        crying(S, x, t, { x: 400, y: 960, s: 240, mood: 'happy', look: [1, 0], squash: 0.06, hops: [S.t0 + 0.6, S.t0 + 1.4] }, 2)
        hearts(x, t, S.t0 + 0.3, 480, 820, { n: 6 })
        bubble(x, t, 600, 680, S.t0 + 1.4, S.t1, '…we’re still hugging.', { size: 32, col: '#dff1ff' })
      },
      cues: [['riser', 0.2, 2.0, 0.01], ['tick', 0.6, 0.03], ['tick', 1.0, 0.03], ['tick', 1.4, 0.03], ['pop', 1.4, 1174.66, 0.035, 0.3]] },
  ],
  finale(x, t, S) {
    const { ok, HOPS } = S
    shadow(x, 480, 1110, 240 * ok)
    crying(S, x, t, { x: 480, y: 900, s: 270, pop: ok, mood: 'sparkle', look: [0, 0], hops: HOPS }, 3)
    sparkles(x, t, 480, 860, 8.6, 8, 200, 1, [PINK, BONE, '#8fe3ff'])
  },
  last: 'Bring your big *feelings.* They’re invited.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [R, lerp, MINT]
