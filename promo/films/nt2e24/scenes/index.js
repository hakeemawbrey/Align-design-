// nt2e24 · THE BARE MINIMUM · "Virgo Grades a Text" (18 s vertical, Trends Vol. 2 ep 24, music: funk · A).
// The format lives in ../../nt2e21/scenes/barekit.js (eps 21–25) on ../../nt2e21/scenes/trendkit.js.
//   0.0   hook: "They did the *bare minimum.* | (I'm a Virgo.)" ♍ mid-slap of a gold star sticker.
//   2.1   1 "they used *a period.*"  ♉ hops the floor-level bar: "see you at 7."  Virgo awards a giant gold star:
//         "punctuation!!"
//   4.85  2 "they were *on time.* (ish)"  ♉: "here! (7:02)"  Virgo holds up a report card: A+. "A+ effort!"
//   7.6   flash cut. 3 "then THE STARS *raised the bar.*"  Taurus clears the high bar: "i made the plan. you just show
//         up."  Virgo drops the clipboard: "a… plan?"
//   11.45 stamp "NEW *STANDARD.*"  12.0 THE STARS: "Let someone *else* hold the clipboard."  Pisces: A++, fountaining.
import { makeBare } from '../../nt2e21/scenes/barekit.js'
import { goldStarSticker, paperProp, clipboardProp, sparkles, pop01, outK, prog, ease, GOLD, BONE } from '../../nt2e21/scenes/trendkit.js'

const EP = makeBare({
  id: 'nt2e24', sign: 'virgo', date: 'taurus', deep: '#b02a5e', accent: '#ef5c94',
  hookDraw(x, t, { o }) { goldStarSticker(x, o.x + 150, o.y + 100 + 10 * Math.sin(t * 6), 1.1, 0.2); clipboardProp(x, o.x - 170, o.y + 120, { rot: -0.15, s: 0.8 }) },
  beats: [
    { caption: 'they used *a period.*', gesture: 'see you at 7.', reply: 'punctuation!!',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.2, 0.35, 2.8) * outK(t, [S.b - 0.15, S.b])
        if (k > 0.01) goldStarSticker(x, 830, 470, 2.2 * k, 0.15 * Math.sin(t * 3))
        sparkles(x, t, 830, 470, S.a + 1.25, 10, 140, 1, [GOLD, BONE])
      },
      cues: [['pop', 1.2, 1567.98, 0.045, 0.4], ['glitter', 1.25, 1.8]] },
    { caption: 'they were *on time.* (ish)', gesture: 'here! (7:02)', reply: 'A+ effort!',
      draw(x, t, S) {
        if (S.under) return
        const k = pop01(t, S.a + 1.2, 0.35, 2.4) * outK(t, [S.b - 0.15, S.b])
        if (k > 0.01) { x.save(); x.translate(820, 470); x.scale(k, k); paperProp(x, 0, 0, 220, 170, { rot: 0.08, title: 'REPORT CARD', big: 'A+', lines: 0 }); x.restore() }
      },
      cues: [['tick', 1.2, 0.05], ['pop', 1.3, 1318.51, 0.04, 0.4]] },
    { caption: 'then THE STARS *raised the bar.*', gesture: 'i made the plan. you just show up.', reply: 'a… plan?',
      draw(x, t, S) {
        if (S.under) return
        const p = ease.inQuad(prog(S.u, 2.75, 3.3))
        clipboardProp(x, 1010, 1000 + p * 140, { rot: -0.2 + p * 1.4, s: 0.7 })
      },
      cues: [['tick', 3.3, 0.06]] },
  ],
  last: 'Let someone *else* hold the clipboard.',
  pisCard: 'A++',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
