// og-kute03: social rework of kute03, THE UNSENT TEXT, "The old friend you lost touch with" (star_advice). Same phone, cast and story.
// Static HOOK instead of the slammed title, no series bug, no flash / whip / shake / glitch (a calm caption sticker keeps
// the joke), no loop (hard cut on THE STARS' last line), layout inside the full-frame safe zone, Gemini juggling two phones and fourteen topics.
// Built on the og copy of the kit (../unsentkit.js).
import { makeUnsent } from '../unsentkit.js'
import { drawBits, box, R, label, hearts, sparkles, tissues, INK, GOLD, BONE, RED, PINK, ease, clamp, prog } from '../unsentkit.js'

const EP = makeUnsent({
  id: 'og-kute03', duration: 10,
  sign: 'gemini', name: 'Gemini', to: 'Rio', status: 'last seen a while ago', statusCol: '#c9a6ff', avatar: '#ffd36b',
  hook: '', ending: 'loop', draftBase: 10,
  msgs: [{ text: 'happy birthday!! miss you', at: -9, stamp: '1 year ago' }, { text: 'thank you!! miss you too', at: -8.8, from: 'me' }],
  drafts: [
    { text: 'OMG HIIII ok so 14 things', at: -2.0, cps: 16, del: -0.35, delCps: 26 },
    { text: 'sorry i vanished (both of me)', at: 1.4, cps: 18, del: 3.2, delCps: 30 },
    { text: 'saw this and thought of you', at: 3.7, cps: 15 },
  ],
  breaks: [{ kind: 'note', at: 0.4, len: 1.2, caption: 'two phones. *a whole year.*' }],
  onHero: (c, t, S, o) => {   // the second phone, juggled in the air
    const a = t * 5.2, px = o.x + 60 * Math.cos(a), py = o.y - 210 - 70 * Math.abs(Math.sin(a))
    c.save(); c.translate(px, py); c.rotate(a * 0.8); box(c, -26, -46, 52, 92, '#2a2148', { b: 5 }); R(c, '#7fd0ff', -18, -36, 36, 66); c.restore()
  },
  lines: [{ t: 6.0, text: 'They’ll be glad. *Just* say hi.' }],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const HOOK = 'A year of silence. | Draft *twelve.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.2
