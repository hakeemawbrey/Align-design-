// nt2e23 · THE BARE MINIMUM · "Libra Gets Asked" (20 s vertical, Trends Vol. 2 ep 23, music: funk · G).
// The format lives in ../../nt2e21/scenes/barekit.js (eps 21–25) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "They did the *bare minimum.* | (I'm a Libra.)" ♎ mid-twirl under bunting.
//   2.1   1 "they asked *where* I wanted to eat."  ♊ hops the floor-level bar: "where do you want to eat?"
//         Libra throws a parade: bunting drops, confetti: "they ASKED me!!"
//   4.85  2 "they let me pick *the song.*"  A tiny star choir sings behind Libra: "a choir for this!"
//   7.6   card cut. 3 "then THE STARS *raised the bar.*"  Gemini clears the high bar: "booked the place you mentioned
//         in july." Libra, quiet: "you were listening?"
//   11.45 stamp "NEW *STANDARD.*"  12.0 THE STARS: "Being heard is the *starting line.*"  Pisces: HEARD!, fountaining.
import { makeBare } from '../../nt2e21/scenes/barekit.js'
import { bunting, confetti, crowd, label, pop01, outK, GOLD, INTER } from '../../nt2e21/scenes/trendkit.js'

const EP = makeBare({
  id: 'nt2e23', sign: 'libra', date: 'gemini', deep: '#9a2a8e', accent: '#e163d6',
  hookDraw(x, t) { bunting(x, t, 180, 940, 500, { sag: 70 }) },
  beats: [
    { caption: 'they asked *where* I wanted to eat.', gesture: 'where do you want to eat?', reply: 'they ASKED me!!',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.2, 0.4, 2) * outK(t, [S.b - 0.15, S.b])
        bunting(x, t, 120, 980, 400, { k, sag: 60 }); bunting(x, t, 200, 900, 470, { k: k * 0.9, sag: 50, n: 7 })
        confetti(x, t, S.a + 1.2, 905, 780)
      },
      cues: [['glitter', 1.2, 1.9], ['clap', 1.4, { gain: 0.12 }]] },
    { caption: 'they let me pick *the song.*', gesture: 'you pick the song!', reply: 'a choir for this!',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.15, 0.4, 2) * outK(t, [S.b - 0.15, S.b])
        if (k <= 0.01) return
        x.save(); x.globalAlpha *= Math.min(1, k); crowd(x, t, ['aries', 'cancer', 'leo', 'virgo', 'scorpio'], 200, 880, 500, 80, { cheer: 0.5, mood: 'happy' }); x.restore()
        for (let i = 0; i < 5; i++) { const ph = (t * 0.7 + i / 5) % 1; label(x, i % 2 ? '♪' : '♫', 220 + i * 165 + Math.sin(ph * 6) * 12, 420 - ph * 120, { size: 44, col: GOLD, alpha: k * (1 - ph), font: INTER, weight: 800 }) }
      },
      cues: [['pluck', 1.2, 1046.5, 0.04, 0.6, -0.3], ['pluck', 1.4, 1318.51, 0.04, 0.6, 0], ['pluck', 1.6, 1567.98, 0.04, 0.6, 0.3], ['bell', 1.8, 2093, 0.025, 1, 0]] },
    { caption: 'then THE STARS *raised the bar.*', gesture: 'booked the place you mentioned in july.', gestureSize: 28, reply: 'you were listening?' },
  ],
  last: 'Being heard is the *starting line.*',
  pisCard: 'HEARD!',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
