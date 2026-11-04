// n3ae08 · 3 AM IN WINTER 8: "Scorpio writes it on the frosty window" (18 s vertical, star_advice trial reel, lofi Em).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. Frost. | *Scorpio* has a feeling."  Scorpio writes "I LIKE Y" in the window frost, wipes it at "no.", then draws a small heart.
//   1.5 / 3.6 / 5.7   thoughts: say it. · *no.* · …say it?
//   7.5    card cut. THE STARS in the window: "Wait for daylight. Then say it *simply*, out loud."
//   ~10.4  last line: "Say it *plainly*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK, clamp, prog } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'scorpio',
  caption: "3 AM. Frost. | *Scorpio* has a feeling.", captionAccent: '#ff8fa8',
  thoughts: ["say it.", "*no.*", "…say it?"],
  line: "Wait for daylight. Then say it *simply*, out loud.",
  last: "Say it *plainly*.", lastAccent: '#ff8fa8',
  me: { x: 330, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // writing in the window frost (lower-left pane): "I LIKE Y", wiped at "no.", then a small heart
    const TXT = 'I LIKE Y', X0 = 280, Y0 = 880
    const n = t < T.th[1] ? Math.min(TXT.length, Math.floor(Math.max(0, t - 0.3) * 4)) : TXT.length
    const wipe = clamp(prog(t, T.th[1] + 0.05, T.th[1] + 0.5))
    x.save(); x.globalAlpha *= (1 - wipe) * 0.85
    W.label(x, TXT.slice(0, n), X0, Y0, { size: 40, col: '#ffffff', font: MONO, align: 'left' })
    x.restore()
    if (wipe > 0 && wipe < 1) { x.fillStyle = 'rgba(216,241,255,0.35)'; x.fillRect(X0 - 10, Y0 - 30, 260 * wipe, 60) }
    if (t > T.th[2]) W.heart(x, X0 + 110, Y0, 5, { alpha: 0.8 * clamp(prog(t, T.th[2] + 0.2, T.th[2] + 0.6)), col: '#ffffff' })
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
