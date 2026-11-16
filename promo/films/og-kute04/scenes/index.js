// og-kute04: social rework of kute04, THE UNSENT TEXT, "Texting mom after the fight" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Cancer at full drama, tissues out.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute04', duration: 11,
  sign: 'cancer', name: 'Cancer', to: 'mom', status: 'online', avatar: '#f2c75c',
  hook: '', ending: 'cut', draftBase: 3,
  msgs: [{ text: 'call me when you’re ready.', at: -9, stamp: '2 hours ago' }, { text: 'love you more. call me?', at: 7.2, typing: [6.55, 7.2] }],
  drafts: [
    { text: 'fine. i’ll raise myself.', at: -2.0, cps: 16, del: -0.25, delCps: 22 },
    { text: 'you never listen (crying)', at: 1.4, cps: 17, del: 3.0, delCps: 30 },
    { text: 'i’m sorry i snapped. love you.', at: 3.5, cps: 15, send: 6.1 },
  ],
  breaks: [{ kind: 'note', at: 0.4, len: 1.2, caption: 'it was about *one spoon.*' }],
  heroTears: t => t > 7.2 ? 3 : 2,
  onHero: (c, t, S, o) => tissues(c, o.x + 110, o.y + 120, 70),
  sob: t => t > 6.1 ? 3 : 2,
  lines: [{ t: 8.2, text: 'Saying sorry first isn’t *losing.*' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'Texting mom | after *the fight.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.2
