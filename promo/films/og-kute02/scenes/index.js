// og-kute02: social rework of kute02, THE UNSENT TEXT, "Asking them to dinner, attempt nine" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Taurus has the restaurant picked before the question.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute02', duration: 8,
  sign: 'taurus', name: 'Taurus', to: 'Sam', status: 'online', avatar: '#9fe6b0',
  hook: '', ending: 'cut', draftBase: 7,
  msgs: [{ text: 'that was so fun today!', at: -9, stamp: 'today 6:12 pm' }],
  drafts: [
    { text: 'do u wanna maybe', at: -1.4, cps: 15, del: -0.3, delCps: 24 },
    { text: 'u like bread?? i do.', at: 0.8, cps: 18, del: 2.1, delCps: 30 },
    { text: 'dinner friday? i already picked the place.', at: 2.5, cps: 20, send: 4.7 },
  ],
  breaks: [{ kind: 'note', at: 0.3, len: 1.2, caption: 'the menu is *already open.*' }],
  tilt: t => t < 0.55 ? 0.26 * (1 - ease.outCubic(clamp(t / 0.55))) * Math.cos(t * 9) : 0,
  sob: t => t > 4.75 ? 3 : 2, pisMood: t => t > 4.75 ? 'heart' : 'sparkle',
  heroHops: [-0.2, 0.15],
  lines: [{ t: 5.2, text: 'The *simple* version is the brave one.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'Asking them out: | *attempt nine.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
