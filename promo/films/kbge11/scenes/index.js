// kbge11: BIO GLOW-UP, "I'm not like other people" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Aquarius' profile mid-glitch, the card splitting into RGB copies; hook "Aquarius, *show* it. | Don’t say it."
//   −0.1–0.75 glitch · 1.35 circle "not like other people." → SAYS, DOESN'T SHOW · 1.9 THE STARS · 2.75 strike
//   3.5   the glow-up: "Runs a tiny Thursday *board-game night.* One seat open." · a chair pops in · Pisces cries · 8.5 last line. Hard cut.
import { makeBio, signStar, popIcon, tag } from '../../kbge01/biokit.js'
const GEM = signStar('gemini')
const EP = makeBio({
  id: 'kbge11', sign: 'aquarius', name: 'Aquarius', age: 29, D: 10,
  hook: 'Aquarius, *show* it. | Don’t say it.', hookColor: '#7fe0ff',
  bad: 'I’m not like other people.',
  circle: { word: 'not like other people.', label: 'SAYS, DOESN’T SHOW' },
  says: [{ t: 1.9, text: 'ok, *how* though?' }],
  good: 'Runs a tiny Thursday *board-game night.* One seat open.',
  fx: 'glitch', fxOpts: { at: -0.1, len: 0.8 }, cps: 28,
  reply: { body: 'I call dibs on the *one seat*', glyph: GEM.glyph, color: GEM.color },
  photo: (x, t, S) => { popIcon(x, t, 'CHAIR', S.PHOTO.x + 570, S.PHOTO.y + 255, 12, S.T.glow - 0.1, 1e9, { bob: 0 }); tag(x, t, S.PHOTO.x + 570, S.PHOTO.y + 140, S.T.glow + 0.1, 'OPEN', { col: '#2bb673', size: 26, rot: 0.08 }) },
  last: 'Show the weird. | Don’t *announce* it.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
