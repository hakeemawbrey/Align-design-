// og-kbge02: social rework of kbge02 (BIO GLOW-UP, "Just ask."). Static HOOK (outline) 0–3.0 replaces the slammed hook;
// social kit copy ../biokit.js (no bug, no flashes/shakes, quiet freeze, hosts inside the safe zones); crazier Taurus.
// Was: kbge02 (9 s vertical trial reel, star_advice; promo/films/month2/m34.md). Kit: ../../kbge01/biokit.js
//   0.00  Taurus' profile, a giant "?" mid-slam onto the two-word bio · 0.35 quiet freeze: "two words. *that's the whole bio.*"
//   1.35  circle "Just ask." → ASK WHAT? · 1.85 THE STARS · 2.75 strike · 3.2 the glow-up: the two-hour bread drive
//   glow: Pisces sobs at the bread, a 10 · a message: "ok WHERE is the bread. I have a car." · 8.5 last line.
import { makeBio, signStar, thrown, popIcon } from '../biokit.js'
const GEM = signStar('gemini')
const EP = makeBio({
  id: 'og-kbge02', sign: 'taurus', name: 'Taurus', age: 30, D: 10,
  hook: '‘Just ask.’ | Ask *what?*', hookColor: '#ffd36a', zoom0: 1.05,
  bad: 'Just ask.',
  circle: { word: 'Just ask.', label: 'ASK WHAT?' },
  says: [{ t: 1.85, text: 'ask *what*, babe? your blood type?' }],
  good: 'Will drive *two hours* for the right bread. Ask me which bakery.',
  fx: 'scratch', fxOpts: { caption: 'two words. | *that’s the whole bio.*' }, cps: 30,
  T: { strike: [2.75, 3.05], swap: 3.2 },
  reply: { body: 'ok WHERE is the *bread.* I have a car.', glyph: GEM.glyph, color: GEM.color },
  over: (x, t, S) => thrown(x, t, [{ name: 'Q', x: 790, y: 1150, cell: 16, at: 0.08, rot: 0.2, from: [200, -900] }], [S.T.strike[0] - 0.2, S.T.strike[0] + 0.15]),
  photo: (x, t, S) => popIcon(x, t, 'BREAD', 330, S.PHOTO.y + 250, 11, S.T.glow - 0.2),
  last: 'Give them something | to *ask.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
export const HOOK = 'Taurus’ whole bio: | *‘Just ask.’*'
export const HOOK_STYLE = 'outline'
export const HOOK_UNTIL = 3.0
