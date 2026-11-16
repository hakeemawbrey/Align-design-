// og-kbge04: social rework of kbge04 (static HOOK outline 0–3.0 replaces the slammed hook; social kit copy
// ../../og-kbge02/biokit.js: no bug, no flashes/shakes/glitch, hosts inside the safe zones; crazier Cancer). Was:
// kbge04: BIO GLOW-UP, "The ex is in the bio" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Cancer's profile mid-glitch, a grey ex silhouette flickering behind Cancer in the photo; hook "Why is your | *ex* in here?"
//   0.35  glitch · 1.35 circle "my ex" → EX MENTION · 1.9 THE STARS · 2.75 strike, the ex is swept out of the photo
//   3.5   the glow-up: "Looking for someone who texts *good morning* and loves soup." · glow: Pisces cries into the tissue
//   a message: "good morning!! (I also love soup)" · 8.5 last line. Hard cut.
import { makeBio, signStar, drawStarChar, prog, ease, lerp } from '../../og-kbge02/biokit.js'
const TAU = signStar('taurus')
const EP = makeBio({
  id: 'og-kbge04', sign: 'cancer', name: 'Cancer', age: 29, D: 11,
  hook: 'Why is your | *ex* in here?', hookColor: '#9fd8ff',
  bad: 'Not looking for anyone like my ex. Or my ex’s cousin. Or my ex’s *dentist.*',
  circle: { word: 'like my ex.', label: 'EX MENTION' },
  says: [{ t: 1.9, text: 'the ex has *three cameos*, love.' }],
  good: 'Looking for someone who texts *good morning* and lets me make them soup. Daily.',
  fx: 'glitch', fxOpts: { at: -0.1, len: 0.75 }, cps: 28,
  reply: { body: 'good morning!! I will eat *all* the soup', glyph: TAU.glyph, color: TAU.color },
  starXY: (t, S) => [S.PHOTO.x + S.PHOTO.w * 0.58, S.PHOTO.y + S.PHOTO.h * 0.56],
  photoUnder: (x, t, S) => {
    // the ex: a grey star behind Cancer's left shoulder, flickering, swept off at the strike
    const sw = ease.inCubic(prog(t, S.T.strike[0], S.T.strike[0] + 0.45))
    if (sw >= 1) return
    const fl = (Math.floor(t * 14) % 5 === 0) ? 0.25 : 0.75
    drawStarChar(x, lerp(S.PHOTO.x + 190, S.PHOTO.x - 260, sw), S.PHOTO.y + 205, 210, t, { color: '#8a8597', mood: 'neutral', look: [1, 0], glow: 0, alpha: fl * (1 - sw), seed: 9 })
  },
  last: 'Your ex doesn’t | get *bio space.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
export const HOOK = 'Cancer’s bio | *mentions the ex.*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
