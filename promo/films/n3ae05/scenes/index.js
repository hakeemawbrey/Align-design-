// n3ae05 · 3 AM IN WINTER 5: "Leo rehearses the party entrance" (16 s vertical, star_advice trial reel, lofi C#m).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "Party tomorrow. | *Leo* is rehearsing."  Leo posing at a tall mirror; pose sparkles on each practised move, then it deflates at the third thought.
//   1.5 / 3.6 / 5.7   thoughts: outfit: *picked* · entrance: *practised* · what if they don't *notice*?
//   7.5    beat change. THE STARS in the window: "Skip the entrance. Walk over and say *hi*."
//   ~10.4  last line: "Less entrance, more *hi*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'leo',
  caption: "Party tomorrow. | *Leo* is rehearsing.", captionAccent: '#ffc07a',
  thoughts: ["outfit: *picked*", "entrance: *practised*", "what if they don't *notice*?"],
  line: "Skip the entrance. Walk over and say *hi*.",
  last: "Less entrance, more *hi*.", lastAccent: '#ffd27a',
  me: { x: 360, y: 1228, s: 250 },
  under(x, t, W) {
    const { T } = W

    // a tall standing mirror, Leo's reflection in it
    const M = { x: 590, y: 1040, w: 150, h: 300 }
    R(x, INK, M.x - 8, M.y - 8, M.w + 16, M.h + 16); R(x, '#f2c75c', M.x - 4, M.y - 4, M.w + 8, M.h + 8); R(x, '#8fb8e8', M.x, M.y, M.w, M.h)
    x.save(); x.beginPath(); x.rect(M.x, M.y, M.w, M.h); x.clip(); x.globalAlpha = 0.6
    W.star(x, M.x + M.w / 2, M.y + 190, 170, t, { color: W.SG.color, mood: t > T.th[2] && t < T.cut ? 'wide' : 'sparkle', look: [-1, 0], seed: 3, glow: 0, tips: false })
    x.restore(); R(x, 'rgba(255,255,255,0.3)', M.x + 14, M.y + 10, 12, M.h - 20)
    R(x, INK, M.x + 20, M.y + M.h + 8, 12, 40); R(x, INK, M.x + M.w - 32, M.y + M.h + 8, 12, 40)
  },
  over(x, t, W) {
    const { T } = W

    for (const v of [0.4, 0.9, T.th[1] + 0.2, T.th[1] + 0.9]) W.sparkles(x, t, W.ME.x, W.ME.y - 40, v, 8, 170, v)
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
