// og-kbge11: social rework of kbge11 (static HOOK box 0–3.0 replaces the slammed hook; social kit copy
// ../../og-kbge02/biokit.js: no bug, no flashes/shakes/glitch, hosts inside the safe zones; crazier Aquarius). Was:
// kbge11: BIO GLOW-UP, "I'm not like other people" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Aquarius' profile mid-glitch, the card splitting into RGB copies; hook "Aquarius, *show* it. | Don’t say it."
//   −0.1–0.75 glitch · 1.35 circle "not like other people." → SAYS, DOESN'T SHOW · 1.9 THE STARS · 2.75 strike
//   3.5   the glow-up: "Runs a tiny Thursday *board-game night.* One seat open." · a chair pops in · Pisces cries · 8.5 last line. Hard cut.
import { makeBio, signStar, popIcon, tag } from '../../og-kbge02/biokit.js'
const GEM = signStar('gemini')
const EP = makeBio({
  id: 'og-kbge11', sign: 'aquarius', name: 'Aquarius', age: 29, D: 11,
  hook: 'Aquarius, *show* it. | Don’t say it.', hookColor: '#7fe0ff',
  bad: 'I’m not like other people. Other people are not like me either.',
  circle: { word: 'not like other people.', label: 'SAYS, DOESN’T SHOW' },
  says: [{ t: 1.9, text: 'ok, *how* though? show your work.' }],
  good: 'Hosts a Thursday *board-game night* with rules I wrote myself. One seat open.',
  fx: 'glitch', fxOpts: { at: -0.1, len: 0.8 }, cps: 28,
  reply: { body: 'dibs on the seat. I bring *snacks.*', glyph: GEM.glyph, color: GEM.color },
  photo: (x, t, S) => { popIcon(x, t, 'CHAIR', S.PHOTO.x + 570, S.PHOTO.y + 255, 12, S.T.glow - 0.1, 1e9, { bob: 0 }); tag(x, t, S.PHOTO.x + 570, S.PHOTO.y + 140, S.T.glow + 0.1, 'OPEN', { col: '#2bb673', size: 26, rot: 0.08 }) },
  last: 'Show the weird. | Don’t *announce* it.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
export const HOOK = 'Aquarius’ bio: | *‘I’m different.’*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
