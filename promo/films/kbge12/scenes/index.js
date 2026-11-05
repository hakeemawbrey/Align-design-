// kbge12: BIO GLOW-UP, "I cry at everything, sorry" (10 s vertical trial reel, star_advice). Kit: ../../kbge01/biokit.js
//   Pisces' own profile, so the judge's corner is empty (the judge is busy being the bio).
//   0.00  Pisces in the photo mid-wobble under a fountain of tears; hook "Pisces is *apologising* | in the bio."
//   0.35  record scratch + freeze: "it’s *already* crying." · 1.35 circle "sorry." → NO NEED · 1.9 THE STARS
//   2.75  strike · 3.3 the glow-up: "I cry at dog videos and good endings. *Bring both.*" · Pisces floods happily
//   8.5 last line · 9.55–10 loop back into frame 0.
import { makeBio, signStar, starFrame, tearsAt, PIS } from '../../kbge01/biokit.js'
const CAN = signStar('cancer')
const tearLvl = (t, S) => t < S.T.circle ? 3 : t < S.T.glow ? 2 : 3
const EP = makeBio({
  id: 'kbge12', sign: 'pisces', name: 'Pisces', age: 24, D: 10, noJudge: true,
  hook: 'Pisces is *apologising* | in the bio.', hookColor: '#c9b8ff', hookSize: 92,
  bad: 'I cry at everything, sorry.',
  circle: { word: 'sorry.', label: 'NO NEED' },
  says: [{ t: 1.9, text: 'tears aren’t a *flaw*, angel.' }],
  good: 'I cry at dog videos and good endings. *Bring both.*',
  fx: 'scratch', fxOpts: { caption: 'it’s *already* crying.' }, cps: 28, end: 'loop',
  T: { strike: [2.75, 3.1], swap: 3.25 },
  mood: (t, S) => t >= S.T.glow ? 'happy' : 'wide',
  starOpts: (t, S) => ({ hops: [S.T.glow + 0.05, S.T.glow + 0.4, S.T.glow + 0.8] }),
  photo: (x, t, S) => {
    const sx = S.PHOTO.x + S.PHOTO.w / 2, sy = S.PHOTO.y + S.PHOTO.h * 0.56
    tearsAt(x, t, starFrame(sx, sy, 250, t, { hops: [S.T.glow + 0.05, S.T.glow + 0.4, S.T.glow + 0.8], seed: 3 }), tearLvl(t, S))
  },
  reply: { body: 'bringing *both*. and tissues.', glyph: CAN.glyph, color: CAN.color },
  last: 'Never say *sorry* | for feeling.',
})
void PIS
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
