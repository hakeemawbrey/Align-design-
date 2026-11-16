// og-kute09: social rework of kute09, THE UNSENT TEXT, "Cancelling plans, again" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Sagittarius cancelling for a spontaneous trip before owning it.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, BLUE, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute09', duration: 8,
  sign: 'sagittarius', name: 'Sagittarius', to: 'Dani', status: 'online', avatar: '#f2c75c',
  hook: '', ending: 'cut', draftBase: 2,
  msgs: [{ text: 'still on for tonight?', at: -9, stamp: '6:40 pm' }],
  drafts: [
    { text: 'so about tonight...', at: -1.5, cps: 15, del: -0.25, delCps: 26 },
    { text: 'something came up!! (a trip)', at: 1.3, cps: 22, del: 2.7, delCps: 34 },
    { text: 'sorry i keep cancelling. sunday, my treat?', at: 3.0, cps: 20, send: 5.3 },
  ],
  breaks: [{ kind: 'note', at: 0.4, len: 1.2, caption: 'third time *this month.*' }],
  heroHops: [-0.3, -0.05],
  sob: t => t > 5.35 ? 3 : 2,
  lines: [{ t: 5.6, text: 'Own it, then *offer* a real plan.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'Cancelling plans. | *Again.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
