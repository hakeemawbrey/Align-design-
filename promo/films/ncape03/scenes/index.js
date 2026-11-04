// ncape03: CAPRICORN SEASON TAKEOVER, ep 3, "Cap Doesn't Cry" (25 s vertical, music: dreamy · Db). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Capricorn does *not* | cry at movies."  Frame 0: Cap stone-faced on the couch next to a sobbing Pisces.
//   2.6–7.1    "The sad *part.*"  Pisces fountains; Cap, eyes front, slides the tissue box over without looking.
//   7.1–11.6   "Then: a *gift.*"  Taurus hands Cap a small handmade card: "a year of us".
//  11.6        card cut.
//  11.6–16.1   "One *single* tear."  One pixel tear rolls down Cap's cheek. CAP: "…allergies."  Pisces gasps.
//  16.1–20.6   THE STARS: "Even *mountains* melt a little."
import { makeTakeover, R, box, ink, couch, floor, shadow, glow, sparkles, hearts, tissues, drawBits, HEART, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

function tv(x, a) { glow(x, 540, 1420, 620, 0.22 * a, '140,190,255') }
function gift(x, cx, cy, k, open = 1, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -120, -90, 240, 180, '#ffd6e4', { b: 6 })
  drawBits(x, HEART, { H: '#ff5c8a' }, 0, -30, 9)
  if (open > 0.5) { ink(x, 'a year', 0, 30, { size: 30, font: "'EB Garamond', serif", weight: 500 }); ink(x, 'of us', 0, 62, { size: 30, font: "'EB Garamond', serif", weight: 500 }) }
  x.restore()
}
const CAPP = { x: 330, y: 1050, s: 230 }, PISP = { x: 720, y: 1050, s: 230 }
function scene(x, t, S, { capMood = 'neutral', pisTears = 3, pisMood = 'wide', tear, look = [0, 1] } = {}) {
  floor(x, 1260); tv(x, 1)
  couch(x, 540, 1170, 720, '#4f6a8a')
  S.host(x, t, { ...CAPP, mood: capMood, look, bob: 0, oneTear: tear })
  S.pisces(x, t, { ...PISP, hops: [S.t0 + 0.3, S.t0 + 1.4] }, pisTears, pisMood, [0, 1])
}

const EP = makeTakeover({
  id: 'ncape03', host: 'cap', duration: 25, dy: 140,
  hook: {
    text: 'Capricorn does *not* | cry at movies.', dur: 2.6,
    draw(x, t, S) { scene(x, t, { ...S, t0: 0 }, { pisTears: 3 }) },
    cues: [['pluck', 0.2, 587.33, 0.025, 0.8, 0.4], ['pluck', 0.9, 523.25, 0.025, 0.8, 0.4]],
  },
  beats: [
    { dur: 4.5, head: 'The sad *part.*', pis: false,
      draw(x, t, S) {
        const { u } = S
        scene(x, t, S, { pisTears: 3, pisMood: 'wide' })
        const p = ease.inOutCubic(prog(u, 1.2, 1.9))
        tissues(x, lerp(160, 560, p), 1110, 90)
      },
      says: [{ at: 2.0, text: '*sob*', x: 760, y: 820, who: 'pisces', tail: 0 }],
      cues: [['whoosh', 1.2, 0.6, 0.02], ['tick', 1.9, 0.05]],
    },
    { dur: 4.5, head: 'Then: a *gift.*', pis: false,
      draw(x, t, S) {
        const { u } = S
        scene(x, t, S, { pisTears: 2, pisMood: 'sparkle', capMood: u < 1.5 ? 'neutral' : 'wide', look: [0, -1] })
        const p = ease.outCubic(prog(u, 0.3, 1.0))
        S.star(x, t, 'taurus', { x: lerp(1250, 900, p), y: 820, s: 200, mood: 'happy', look: [-1, 1], hops: [S.t0 + 1.0] })
        gift(x, lerp(1100, 380, ease.inOutCubic(prog(u, 0.8, 1.5))), lerp(860, 800, ease.inOutCubic(prog(u, 0.8, 1.5))), 1, u > 1.5 ? 1 : 0, 0.06)
      },
      cues: [['whoosh', 0.3, 0.5, 0.03], ['whoosh', 0.8, 0.5, 0.03], ['pop', 1.5, 1174.66, 0.04, -0.3]],
    },
    { dur: 4.5, head: 'One *single* tear.', pis: false,
      draw(x, t, S) {
        const { u } = S
        x.save(); x.translate(330, 1000); const z = lerp(1, 1.3, ease.inOutCubic(prog(u, 0, 0.6))); x.scale(z, z); x.translate(-330, -1000)
        scene(x, t, S, { pisTears: u < 2.2 ? 2 : 3, pisMood: u < 2.2 ? 'sparkle' : 'wide', capMood: 'sparkle', tear: Math.max(0.01, Math.min(0.94, prog(u, 0.6, 2.2))), look: [0, 0] })
        gift(x, 610, 780, 0.7, 1, 0.06)
        x.restore()
      },
      says: [{ at: 2.4, text: '…allergies.', x: 290, y: 820, who: 'host', tail: 0 }],
      cues: [['pluck', 0.6, 1567.98, 0.02, 1.0, -0.3], ['pluck', 2.2, 2093, 0.03, 0.6, -0.3], ['pop', 2.45, 659.25, 0.04, 0.4]],
    },
  ],
  last: { who: 'stars', text: 'Even *mountains* melt a little.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 420, y: 920, s: 240, pop: ok, mood: 'happy', look: [1, 0], oneTear: 0.9, hops: [S.t0 + 0.1, S.t0 + 2.6] })
    S.star(x, t, 'taurus', { x: 690, y: 920, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 3.0] })
    gift(x, 555, 720, 0.6 * ok, 1, -0.05)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, hearts, R, BONE, GOLD, INK, clamp, pop01]
