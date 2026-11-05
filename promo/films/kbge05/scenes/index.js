// kbge05: BIO GLOW-UP, "All about me, me, me" (11 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   0.00  Leo's profile mid-spin, five trophies bouncing off the card; hook "Leo’s bio has | *five* trophies."
//   0.35  whip zoom · 1.35 circle "Best everything." → CAUGHT · 1.9 THE STARS · 2.75 strike, the trophies fly off
//   3.5   the glow-up: "Great cook, better host. Tell me your best story; I'll ask for *more.*"
//   glow: an empty chair labelled YOU pops in next to Leo in the photo, Pisces weeps · a message · 9.5 last line. Hard cut.
import { makeBio, signStar, thrown, popIcon, tag } from '../../kbge01/biokit.js'
const SAG = signStar('sagittarius')
const TR = [[260, 560, -0.08], [820, 610, 0.3], [205, 930, 0.6], [880, 1010, -0.3], [520, 455, 0.1]]
const EP = makeBio({
  id: 'kbge05', sign: 'leo', name: 'Leo', age: 28, D: 11,
  hook: 'Leo’s bio has | *five* trophies.', hookColor: '#ffc94a',
  bad: 'Best dancer. Best cook. Best everything.',
  circle: { word: 'Best everything.', label: 'CAUGHT' },
  says: [{ t: 1.9, text: 'and what’s *their* best thing?' }],
  good: 'Great cook, better host. Tell me your best story; I’ll ask for *more.*',
  fx: 'whip', shake0: 8, cps: 30,
  reply: { body: 'ok story time: I once *won a pie contest*', glyph: SAG.glyph, color: SAG.color },
  starXY: (t, S) => [S.PHOTO.x + (t >= S.T.glow - 0.2 ? 240 : S.PHOTO.w / 2), S.PHOTO.y + S.PHOTO.h * 0.56],
  over: (x, t, S) => thrown(x, t, TR.map(([px, py, r], i) => ({ name: 'TROPHY', x: px, y: py, cell: 10, at: -0.2 + i * 0.08, rot: r, from: [(px - 540) * 0.6, -300] })), [S.T.strike[0], S.T.strike[0] + 0.5]),
  photo: (x, t, S) => { popIcon(x, t, 'CHAIR', S.PHOTO.x + 500, S.PHOTO.y + 250, 13, S.T.glow - 0.1, 1e9, { bob: 0 }); tag(x, t, S.PHOTO.x + 500, S.PHOTO.y + 120, S.T.glow + 0.1, 'YOU', { col: '#c2306f', size: 30, rot: 0.08 }) },
  last: 'Leave room for | *their* story.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
