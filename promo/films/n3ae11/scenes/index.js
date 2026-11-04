// n3ae11 · 3 AM IN WINTER 11: "Aquarius wants to share the winter sky" (18 s vertical, star_advice trial reel, lofi Gm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Clear sky. | *Aquarius* is stargazing."  Aquarius beside a little telescope on a tripod pointed at the window; a name-shaped sparkle at the spiral.
//   1.5 / 3.6 / 5.7   thoughts: the stars are SO *clear* · I want to *show* someone · …who did I think of *first*?
//   7.5    card cut. THE STARS in the window: "That first name you thought of? Tell *them* tomorrow."
//   ~10.4  last line: "The first name *counts*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'aquarius',
  caption: "3 AM. Clear sky. | *Aquarius* is stargazing.", captionAccent: '#9fe8ff',
  thoughts: ["the stars are SO *clear*", "I want to *show* someone", "…who did I think of *first*?"],
  line: "That first name you thought of? Tell *them* tomorrow.",
  last: "The first name *counts*.", lastAccent: '#9fe8ff',
  me: { x: 300, y: 1228, s: 250 },
  under(x, t, W) {
    const { T } = W

    // a little telescope on a tripod, pointed at the window
    x.save(); x.translate(560, 1180); x.rotate(-0.55)
    R(x, INK, -20, -24, 190, 48); R(x, '#38c4ec', -16, -20, 182, 40); R(x, '#f6efe2', 150, -22, 20, 44); R(x, '#1b5a7a', -16, -6, 182, 8)
    x.restore()
    R(x, INK, 548, 1190, 12, 200); x.save(); x.translate(554, 1200); x.rotate(0.3); R(x, INK, -6, 0, 12, 200); x.restore(); x.save(); x.translate(554, 1200); x.rotate(-0.3); R(x, INK, -6, 0, 12, 200); x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
