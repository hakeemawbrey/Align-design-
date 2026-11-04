// nt2e22 · THE BARE MINIMUM · "Leo Gets a Thumbs-Up" (20 s vertical, Trends Vol. 2 ep 22, music: funk · F).
// The format lives in ../../nt2e21/scenes/barekit.js (eps 21–25) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "They did the *bare minimum.* | (I'm a Leo.)" ♌ mid-bow, hugging a trophy.
//   2.1   1 "they *liked* my photo."  ♈ hops the floor-level bar: "liked your photo!"  Leo, under a spotlight, trophy
//         raised: "i’d like to thank…"
//   4.85  2 "they said *‘nice jacket.’*"  A crowd of tiny stars cheers, roses land at Leo's feet: "you’re too kind!!"
//   7.6   card cut. 3 "then THE STARS *raised the bar.*"  Aries clears the high bar: "saved you a seat. front row."
//         Leo, quiet: "…at my recital?"
//   11.45 stamp "NEW *STANDARD.*"  12.0 THE STARS: "Showing up is the *real* applause."  Pisces: ENCORE!, fountaining.
import { makeBare } from '../../nt2e21/scenes/barekit.js'
import { trophyProp, roseProp, crowd, spotlight, pop01, outK, prog, ease } from '../../nt2e21/scenes/trendkit.js'

const EP = makeBare({
  id: 'nt2e22', sign: 'leo', date: 'aries', deep: '#b0520e', accent: '#f39a3a',
  hookDraw(x, t, { o }) { trophyProp(x, o.x + 150, o.y + 150, 0.9) },
  beats: [
    { caption: 'they *liked* my photo.', gesture: 'liked your photo!', reply: 'i’d like to thank…',
      draw(x, t, S) {
        const k = pop01(t, S.a + 1.2, 0.35, 2.4) * outK(t, [S.b - 0.15, S.b])
        if (S.under) { spotlight(x, 905, 300, 905, 1170, 360, k); return }
        if (k > 0.01) trophyProp(x, 760, 560 - 40 * ease.outCubic(prog(t, S.a + 1.2, S.a + 1.6)), 0.75 * k)
      },
      cues: [['glitter', 1.2, 1.8], ['bell', 1.3, 1567.98, 0.03, 1, 0.4]] },
    { caption: 'they said *‘nice jacket.’*', gesture: 'nice jacket!', reply: 'you’re too kind!!',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.15, 0.4, 2) * outK(t, [S.b - 0.15, S.b])
        if (k > 0.01) { x.save(); x.globalAlpha *= Math.min(1, k); crowd(x, t, ['taurus', 'gemini', 'virgo', 'libra', 'aquarius', 'capricorn'], 140, 940, 520, 80, { cheer: 1 }); x.restore() }
        for (let i = 0; i < 4; i++) { const p = ease.outCubic(prog(t, S.a + 1.4 + i * 0.15, S.a + 1.9 + i * 0.15)); if (p > 0) roseProp(x, 780 + i * 60, 600 + p * 520, 1.2 + i, 1) }
      },
      cues: [['clap', 1.25, { gain: 0.14, pan: -0.4 }], ['clap', 1.4, { gain: 0.14, pan: 0.4 }], ['clap', 1.55, { gain: 0.14, pan: -0.2 }], ['clap', 1.7, { gain: 0.14, pan: 0.2 }], ['glitter', 1.4, 2.1]] },
    { caption: 'then THE STARS *raised the bar.*', gesture: 'saved you a seat. front row.', reply: '…at my recital?' },
  ],
  last: 'Showing up is the *real* applause.',
  pisCard: 'ENCORE!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
