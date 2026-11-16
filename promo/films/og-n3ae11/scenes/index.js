// og-n3ae11: social rework of n3ae11 (static HOOK box 0–3.5 replaces the animated caption; no bug, no end card;
// Aquarius has built a second telescope out of a lamp). Kit: ../amkit.js (og copy of ../../n3ae01/amkit.js).
// Was: n3ae11 · 3 AM IN WINTER 11: "Aquarius wants to share the winter sky" (16 s vertical, star_advice trial reel, lofi Gm).
// Rows: promo/films/next30/b40.md. The original engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Clear sky. | *Aquarius* is stargazing."  Aquarius beside a little telescope on a tripod pointed at the window; a name-shaped sparkle at the spiral.
//   1.5 / 3.6 / 5.7   thoughts: the stars are SO *clear* · I want to *show* someone · …who did I think of *first*?
//   7.5    beat change. THE STARS in the window: "That first name you thought of? Tell *them* tomorrow."
//   ~10.4  last line: "The first name *counts*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../amkit.js'

export const HOOK = 'Aquarius at 3 AM: | *one name* pops up.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.5

const AM = makeAM({
  sign: 'aquarius',
  caption: "3 AM. Clear sky. | *Aquarius* is stargazing.", captionAccent: '#9fe8ff',
  thoughts: ["2 telescopes. *homemade.*", "must *show* someone. NOW.", "…who did I think of *first*?"],
  line: "That first name you thought of? Tell *them* tomorrow.",
  last: "The first name *counts*.", lastAccent: '#9fe8ff',
  me: { x: 300, y: 1228, s: 250 },
  under(x, t, W) {
    const { T } = W

    // a little telescope on a tripod, pointed at the window
    x.save(); x.translate(560, 1180); x.rotate(-0.55)
    R(x, INK, -20, -24, 190, 48); R(x, '#38c4ec', -16, -20, 182, 40); R(x, '#f6efe2', 150, -22, 20, 44); R(x, '#1b5a7a', -16, -6, 182, 8)
    x.restore()
    // og: a second, homemade telescope (a lamp tube on a stack of books)
    x.save(); x.translate(655, 1250); x.rotate(-0.9)
    R(x, INK, -14, -18, 140, 36); R(x, '#ffcf7a', -10, -14, 132, 28); R(x, '#f6efe2', 108, -16, 16, 32)
    x.restore()
    R(x, INK, 605, 1300, 110, 90); R(x, '#c0305a', 609, 1304, 102, 26); R(x, '#2fc79a', 609, 1332, 102, 26); R(x, '#4a6ad8', 609, 1360, 102, 26)
    R(x, INK, 548, 1190, 12, 200); x.save(); x.translate(554, 1200); x.rotate(0.3); R(x, INK, -6, 0, 12, 200); x.restore(); x.save(); x.translate(554, 1200); x.rotate(-0.3); R(x, INK, -6, 0, 12, 200); x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
