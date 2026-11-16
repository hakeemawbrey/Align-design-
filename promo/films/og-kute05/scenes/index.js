// og-kute05: social rework of kute05, THE UNSENT TEXT, "Typing "congrats" and mostly meaning it" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Leo’s ego at maximum before the real congrats.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../unsentkit.js'
// Leo's tiny crown: knocked off by the shriek at frame 0, it lands back on the top point by 0.7 s
function crown(c, t, o) {
  const p = ease.outCubic(clamp((t + 0.25) / 0.95)), top = o.y - o.s * 0.55
  const x = o.x + (1 - p) * 120, y = top - 30 - (1 - p) * 140 + 60 * Math.sin(Math.PI * p) * (1 - p), rot = (1 - p) * 1.4
  drawBits(c, ['G.G.G', 'GGGGG', 'GRGRG', 'GGGGG'], { G: GOLD, R: RED }, x, y, 11, { rot })
}
const EP = makeUnsent({
  id: 'og-kute05', duration: 9,
  sign: 'leo', name: 'Leo', to: 'Nico', status: 'online', avatar: '#7fd0ff',
  hook: '', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'I GOT THE JOB!!!', at: -9, stamp: 'today 4:20 pm' }],
  drafts: [
    { text: 'must be nice!!!!', at: -1.4, cps: 14, del: -0.2, delCps: 22 },
    { text: 'congrats. (i was better)', at: 0.9, cps: 18, del: 2.4, delCps: 30 },
    { text: 'so proud of you. you earned it.', at: 2.8, cps: 16, send: 5.2 },
  ],
  breaks: [{ kind: 'note', at: 0.3, len: 1.2, caption: 'the crown *fell off.*' }],
  onHero: (c, t, S, o) => crown(c, t, o),
  sob: t => t > 5.25 ? 3 : 2, pisMood: t => t > 5.25 ? 'heart' : 'sparkle',
  lines: [{ t: 6.2, text: 'Envy and joy can share a *text.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'They got the job. | Leo types *congrats.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
