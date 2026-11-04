// n3ae09 · 3 AM IN WINTER 9: "Sag plans a second date across three mountains" (18 s vertical, star_advice trial reel, lofi Fm).
// Rows: promo/films/next30/b40.md. The format engine is ../../n3ae01/amkit.js (shared by n3ae01–n3ae12).
//   0      "3 AM. A map. | *Sag* has a date idea."  Sag holds up a big map; a cabin, a lake and a mountain pin pop on, joined by a dotted route.
//   1.5 / 3.6 / 5.7   thoughts: second date idea: · a cabin! a lake! a *mountain*! · …for a *second* date?
//   7.5    card cut. THE STARS in the window: "Big plans can wait. Start with a *walk* in the snow."
//   ~10.4  last line: "Start with a *walk*."  ♓ Pisces cries all film (in the lit window across the street).
import { makeAM, R, INK, MONO, INTER, pop01, outK, lerp } from '../../n3ae01/amkit.js'

const AM = makeAM({
  sign: 'sagittarius',
  caption: "3 AM. A map. | *Sag* has a date idea.", captionAccent: '#d0a0ff',
  thoughts: ["second date idea:", "a cabin! a lake! a *mountain*!", "…for a *second* date?"],
  line: "Big plans can wait. Start with a *walk* in the snow.",
  last: "Start with a *walk*.", lastAccent: '#d0a0ff',
  me: { x: 300, y: 1228, s: 250 },
  over(x, t, W) {
    const { T } = W

    // the map, held up; three pins pop on at the second thought
    const M = { x: 470, y: 1120, w: 300, h: 220 }
    x.save(); x.translate(M.x + M.w / 2, M.y + M.h / 2); x.rotate(-0.04 + Math.sin(t * 2) * 0.01)
    R(x, INK, -M.w / 2 - 5, -M.h / 2 - 5, M.w + 10, M.h + 10); R(x, '#f3e3b8', -M.w / 2, -M.h / 2, M.w, M.h)
    R(x, '#9fd0a0', -M.w / 2 + 20, -M.h / 2 + 20, 110, 70); R(x, '#8fc0e8', 20, 10, 90, 60); R(x, '#d8c890', -60, 40, 70, 50)
    const pins = [[-90, -40, '#a35cf0'], [60, 40, '#3fb6f0'], [100, -60, '#ffffff']]
    pins.forEach(([u, v, c], i) => {
      const k = pop01(t, T.th[1] + 0.15 + i * 0.3, 0.3, 2.4)
      if (k <= 0.01) return
      R(x, INK, u - 12 * k, v - 12 * k, 24 * k, 24 * k); R(x, c, u - 8 * k, v - 8 * k, 16 * k, 16 * k)
      if (i) for (let d = 0; d < 6; d++) { const a = d / 6; R(x, '#5a3a20', lerp(pins[i - 1][0], u, a) - 2, lerp(pins[i - 1][1], v, a) - 2, 5, 5) }
    })
    x.restore()
  },
})
void INK; void MONO; void INTER; void pop01; void outK; void R

export const DURATION = AM.DURATION
export const SCENES = AM.SCENES
export const CUES = AM.CUES
export const MUSIC = AM.MUSIC
export const TIMES = AM.T
