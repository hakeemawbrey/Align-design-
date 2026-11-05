// kbge01: BIO GLOW-UP, "Reply fast or don't bother" (10 s vertical trial reel, star_advice; promo/films/month2/m34.md)
// The series look lives in ../biokit.js (kbge02–24 import it read-only). No end card, no card cut.
//   0.00  frame 0: Aries' profile card jittering, the red pen already mid-slash through the bio; hook slammed:
//         "Aries, your bio is *yelling.*"   0.35 whip zoom (the slash rewinds)
//   1.35  the pen circles "don't bother" → tag DEMAND · 1.9 THE STARS: "that's a *warning label*, babe."
//   2.75  the pen strikes the bio · 3.5 the glow-up types: "I reply *fast.* You can take your time."
//   ~5.3  GLOWED UP: the card turns gold, Pisces the bio judge sobs and raises a 10 · a new message drops:
//         "‘take your time’?? that's *so* kind."
//   8.5   last line slams: "Offer something. Don't *demand* it." Hard cut at 10.
import { makeBio, signStar } from '../biokit.js'

const LIB = signStar('libra')
const EP = makeBio({
  id: 'kbge01', sign: 'aries', name: 'Aries', age: 27, D: 10,
  hook: 'Aries, your bio | is *yelling.*', hookColor: '#ff6a4d',
  bad: 'Reply fast or don’t bother.',
  circle: { word: 'don’t bother', label: 'DEMAND' },
  says: [{ t: 1.9, text: 'that’s a *warning label*, babe.' }],
  good: 'I reply *fast.* You can take your time.',
  fx: 'whip', preSlash: { line: 0, p: 0.5 },
  shake0: 6, end: 'cut', cps: 22, bioSize: 52,
  reply: { body: '“take your time”?? that’s *so* kind.', glyph: LIB.glyph, color: LIB.color },
  last: 'Offer something. | Don’t *demand* it.',
  mood: (t, S) => t >= S.T.glow ? 'sparkle' : t >= S.T.circle ? 'wide' : 'squint',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
