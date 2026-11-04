// n3ae04 · 3 AM IN WINTER 4: "Cancer knits a scarf after two dates" (18 s vertical, star_advice trial reel, lofi Cm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Row 40. | *Cancer* is knitting."  Cancer with two needles and a striped scarf that keeps growing down to the floor.
//   1.5 / 3.6 / 5.7   thoughts: almost done… · it's for *them* · we've had *two* dates.
//   7.5    card cut. THE STARS in the window: "A scarf is *warmth*, not a promise. Give it lightly."
//   ~10.4  last line: "It's a scarf, not a *vow*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'cancer',
  caption: "3 AM. Row 40. | *Cancer* is knitting.", captionAccent: '#9fe0ff',
  thoughts: ["almost done…", "it's for *them*", "we've had *two* dates."],
  line: "A scarf is *warmth*, not a promise. Give it lightly.",
  last: "It's a scarf, not a *vow*.", lastAccent: '#ffb0c8',
  me: { x: 330, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // the needles and a striped scarf growing down to the floor
    const F = W.starFrame(W.ME.x, W.ME.y, W.ME.s, t, { seed: 3 })
    const len = Math.min(560, 260 + t * 30)
    const sx = W.ME.x + 120, sy = F.cy + 10
    for (let i = 0; i * 24 < len; i++) { R(x, INK, sx - 4 + Math.sin(i * 0.5) * 6, sy + i * 24 - 2, 58, 28); R(x, i % 2 ? '#ff8fb1' : '#f6efe2', sx + Math.sin(i * 0.5) * 6, sy + i * 24, 50, 24) }
    const w = Math.sin(t * 9) * 0.15
    x.save(); x.translate(sx + 25, sy - 10); x.rotate(-0.6 + w); R(x, INK, -4, -80, 12, 90); R(x, '#d9c08a', -1, -76, 6, 84); x.restore()
    x.save(); x.translate(sx + 25, sy - 10); x.rotate(0.6 - w); R(x, INK, -4, -80, 12, 90); R(x, '#d9c08a', -1, -76, 6, 84); x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
