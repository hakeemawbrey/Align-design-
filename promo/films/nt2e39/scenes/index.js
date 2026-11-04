// nt2e39 · NATURE DOCUMENTARY NARRATOR · "The Sagittarius Roams" (25 s vertical, Trends Vol. 2 ep 39, music: cinematic · Fm).
// The format lives in ../../nt2e36/scenes/natkit.js (eps 36–40) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "The wild *Sagittarius* | cannot sit still." ♐ mid-pace, backpack on. THE SAGITTARIUS · Sagittarius wanderlustus.
//   2.4   I · THE PACING  "It paces the den at *dawn.*"  Back and forth, back and forth; the sky warms a little.
//   7.4   II · THE BOLT  "A new idea appears. It *bolts.*"  A paper map flutters past; Sag chases it out of frame.
//   12.4  card cut. III · RARELY SEEN  "Rarely seen: it comes back *for someone.*"  Sag runs back in with a second
//         backpack and hands it to ♌ Leo.
//   17.0  together, both backpacks on.  17.3 THE NARRATOR: "Some adventures need a *plus-one.*"  Pisces cries in the hide.
import { makeNat } from '../../nt2e36/scenes/natkit.js'
import { backpackProp, mapProp, prog, ease, lerp } from '../../nt2e21/scenes/trendkit.js'

const pack = (x, X, Y, s, col = '#4f7cd8') => backpackProp(x, X + s * 0.42, Y + s * 0.05, { s: s / 320, col, rot: 0.15 })
const EP = makeNat({
  id: 'nt2e39', sign: 'sagittarius', mate: 'leo', latin: 'Sagittarius wanderlustus', accent: '#c08cff',
  hook: 'The wild *Sagittarius* | cannot sit still.',
  hookMood: 'happy',
  hookDraw(x, t, S) { S.o.x = 540 + 120 * Math.sin(t * 2.4); S.o.look = [Math.cos(t * 2.4) > 0 ? 1 : -1, 0]; if (S.under) pack(x, S.o.x, S.o.y, S.o.s) },
  chapters: [
    { tag: 'THE PACING', line: 'It paces the den at *dawn.*',
      pose: (u, t) => ({ x: 540 + 220 * Math.sin(u * 2.2), look: [Math.cos(u * 2.2) > 0 ? 1 : -1, 0], mood: 'neutral', hops: [3.1, 4.5, 5.9] }),
      draw(x, t, S) { if (S.under) pack(x, S.ho.x, S.ho.y, S.ho.s) } },
    { tag: 'THE BOLT', line: 'A new idea appears. It *bolts.*',
      pose: u => ({ x: u < 1.6 ? 460 : lerp(460, 1400, ease.inQuad(prog(u, 1.6, 2.4))), mood: u < 1.2 ? 'neutral' : 'sparkle', look: [1, -0.4], squash: u > 1.4 && u < 1.6 ? 0.1 : 0 }),
      draw(x, t, S) {
        if (S.under) { pack(x, S.ho.x, S.ho.y, S.ho.s); return }
        const p = prog(S.u, 0.8, 3.0)
        if (p > 0 && p < 1) mapProp(x, lerp(-100, 1250, p), 760 + 60 * Math.sin(S.u * 6), { rot: Math.sin(S.u * 5) * 0.3, s: 0.7 })
      },
      cues: [['whoosh', 0.8, 1.2, 0.02], ['tick', 1.5, 0.05], ['whoosh', 1.6, 0.7, 0.035]] },
    { tag: 'RARELY SEEN', line: 'Rarely seen: it comes back *for someone.*',
      pose: u => ({ x: lerp(1300, 700, ease.outCubic(prog(u, 0.5, 1.3))), mood: 'happy', look: [-1, 0], hops: [12.4 + 1.3, 12.4 + 2.2] }),
      draw(x, t, S) {
        if (S.under) {
          S.mate(x, t, { x: 360, y: 1100, s: 250, mood: S.u < 2.2 ? 'wide' : 'heart', look: [1, 0], hops: [S.a + 2.3] })
          pack(x, S.ho.x, S.ho.y, S.ho.s)
          return
        }
        const p = ease.inOutCubic(prog(S.u, 1.6, 2.2))
        if (S.u < 2.2) backpackProp(x, lerp(S.ho.x - 120, 470, p), 1030 - Math.sin(Math.PI * p) * 80, { col: '#e9b24a', s: 0.75 })
        else pack(x, 360, 1100, 250, '#e9b24a')
      },
      cues: [['whoosh', 0.5, 0.6, 0.03], ['pop', 2.2, 1174.66, 0.04, -0.3]] },
  ],
  finaleDraw(x, t, S) { if (S.under) { pack(x, 420, 1090, 290 * S.ok); pack(x, 690, 1105, 240 * S.ok, '#e9b24a') } },
  last: 'Some adventures need a *plus-one.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
