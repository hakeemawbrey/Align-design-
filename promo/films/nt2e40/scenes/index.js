// nt2e40 · NATURE DOCUMENTARY NARRATOR · "The Libra Decides" (25 s vertical, Trends Vol. 2 ep 40, music: cinematic · Gm).
// The format lives in ../../nt2e36/scenes/natkit.js (eps 36–40) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "Few creatures deliberate | like the *Libra.*" ♎ glancing between two menus. THE LIBRA · Libra ponderosa.
//   2.4   I · THE WEIGHING  "It weighs two menus. For *forty minutes.*"  The menus bob like scales; a timer runs.
//   7.4   II · THE POLL  "It polls the *entire* herd."  A crowd of little stars votes A / B, evenly split.
//   12.4  card cut. III · RARELY SEEN  "Asked what *it* wants, it chooses. Instantly."  ♒ Aquarius: "what do you want?"
//         Libra, at once: "this one!"
//   17.0  together.  17.3 THE NARRATOR: "Your own vote *counts.*"  Pisces cries in the hide.
import { makeNat } from '../../nt2e36/scenes/natkit.js'
import { menuProp, crowd, label, bubble, sparkles, prog, ease, BONE, GOLD, INTER, MONO } from '../../nt2e21/scenes/trendkit.js'

const menus = (x, t, k = 1, pick = 0) => {
  const b = Math.sin(t * 2.4) * 30 * k
  menuProp(x, 230, 900 + b - pick * 60, 'BISTRO', { rot: -0.08, s: 0.85, col: '#2f6f5a' })
  if (pick < 1) menuProp(x, 850, 900 - b, 'NOODLES', { rot: 0.08, s: 0.85, col: '#7a3a2a' })
}
const EP = makeNat({
  id: 'nt2e40', sign: 'libra', mate: 'aquarius', latin: 'Libra ponderosa', accent: '#e163d6',
  hook: 'Few creatures deliberate | like the *Libra.*',
  hookMood: 'neutral',
  hookDraw(x, t, S) { S.o.look = [Math.sin(t * 2.4) > 0 ? 1 : -1, 0]; if (!S.under) menus(x, t) },
  chapters: [
    { tag: 'THE WEIGHING', line: 'It weighs two menus. For *forty minutes.*',
      pose: (u, t) => ({ x: 540, mood: 'squint', look: [Math.sin(t * 2.4) > 0 ? 1 : -1, 0] }),
      draw(x, t, S) {
        if (S.under) return
        menus(x, t)
        const m = Math.min(40, Math.floor(S.u * 8.5))
        label(x, `0:${String(m).padStart(2, '0')}:00`, 540, 650, { size: 46, col: BONE, font: MONO })
      },
      cues: [['tick', 1, 0.02], ['tick', 2, 0.02], ['tick', 3, 0.02], ['tick', 4, 0.02]] },
    { tag: 'THE POLL', line: 'It polls the *entire* herd.',
      pose: () => ({ x: 300, mood: 'wide', look: [1, 0] }),
      draw(x, t, S) {
        if (S.under) { crowd(x, t, ['aries', 'taurus', 'cancer', 'leo', 'virgo', 'scorpio'], 470, 860, 1150, 90, { cheer: 0.6, mood: 'happy', look: [-1, -0.5] }); return }
        for (let i = 0; i < 6; i++) if (S.u > 0.9 + i * 0.25) label(x, i % 2 ? 'B' : 'A', 470 + i * 78, 1000 - (i % 2) * 18, { size: 50, col: i % 2 ? '#ff8fb1' : GOLD, font: INTER, weight: 800 })
        if (S.u > 2.6) label(x, 'A: 3 · B: 3', 660, 840, { size: 40, col: BONE, font: MONO })
      },
      cues: [['pop', 0.9, 880, 0.03, 0.2], ['pop', 1.15, 987.77, 0.03, 0.3], ['pop', 1.4, 880, 0.03, 0.4], ['pop', 1.65, 987.77, 0.03, 0.2], ['pop', 1.9, 880, 0.03, 0.3], ['pop', 2.15, 987.77, 0.03, 0.4], ['tick', 2.6, 0.05]] },
    { tag: 'RARELY SEEN', line: 'Asked what *it* wants, it chooses. Instantly.',
      pose: u => ({ x: 400, mood: u < 1.6 ? 'neutral' : 'sparkle', look: [1, 0], hops: [12.4 + 1.6] }),
      draw(x, t, S) {
        if (S.under) { S.mate(x, t, { x: 740, y: 1100, s: 240, mood: S.u < 1.8 ? 'neutral' : 'heart', look: [-1, 0], hops: [S.a + 0.6] }); return }
        const pick = ease.outCubic(prog(S.u, 1.6, 1.9))
        menus(x, t, 0.3, pick)
        sparkles(x, t, 230, 860, S.a + 1.65, 10, 120, 1)
        bubble(x, t, 720, 760, S.a + 0.6, S.b, 'what do you want?', { size: 32, col: '#c9f2d4' })
        bubble(x, t, 400, 720, S.a + 1.6, S.b, 'this one!', { size: 38 })
      },
      cues: [['pop', 0.6, 880, 0.035, 0.3], ['pop', 1.6, 1318.51, 0.05, -0.3], ['glitter', 1.65, 2.2]] },
  ],
  last: 'Your own vote *counts.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
