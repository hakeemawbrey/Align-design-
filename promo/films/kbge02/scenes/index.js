// kbge02: BIO GLOW-UP, "Just ask." (9 s vertical trial reel, star_advice; promo/films/month2/m34.md). Kit: ../../kbge01/biokit.js
//   0.00  Taurus' profile mid-zoom, a giant "?" mid-slam onto the two-word bio; hook "‘Just ask.’ | Ask *what?*"
//   0.35  record scratch + freeze: "two words. *that's it.*" · 1.35 circle "Just ask." → ASK WHAT? · 1.9 THE STARS
//   2.75  strike · 3.3 the glow-up: "Will drive 40 minutes for the right *bread.* Ask me where." · bread pops in the photo
//   glow: Pisces sobs at the bread, a 10 · a message: "ok WHERE is the bread" · 7.5 last line. Hard cut.
import { makeBio, signStar, thrown, popIcon } from '../../kbge01/biokit.js'
const GEM = signStar('gemini')
const EP = makeBio({
  id: 'kbge02', sign: 'taurus', name: 'Taurus', age: 30, D: 9,
  hook: '‘Just ask.’ | Ask *what?*', hookColor: '#ffd36a', zoom0: 1.12,
  bad: 'Just ask.',
  circle: { word: 'Just ask.', label: 'ASK WHAT?' },
  says: [{ t: 1.85, text: 'ask *what*, babe?' }],
  good: 'Will drive 40 minutes for the right *bread.* Ask me where.',
  fx: 'scratch', fxOpts: { caption: 'two words. *that’s it.*' }, cps: 30,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'ok but WHERE is the *bread*', glyph: GEM.glyph, color: GEM.color },
  over: (x, t, S) => thrown(x, t, [{ name: 'Q', x: 790, y: 1150, cell: 16, at: 0.08, rot: 0.2, from: [200, -900] }], [S.T.strike[0] - 0.2, S.T.strike[0] + 0.15]),
  photo: (x, t, S) => popIcon(x, t, 'BREAD', 330, S.PHOTO.y + 250, 11, S.T.glow - 0.2),
  last: 'Give them something | to *ask.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
