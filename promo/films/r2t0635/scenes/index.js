// r2t0635: star_talk, BE LIKE (twelve signs), "Fix their grammar? | Zodiacs *be like.*" (signs3kit, lofi · F).
// Ending: callback.
//   ♈ challenged you to a spell-off · ♉ didn't look up, kept eating · ♊ corrected your correction, twice · ♋ sent a
//   thank-you card, spelled perfectly · ♌ the typo was a stylistic choice · ♍ said thanks, then fixed your comma
//   · ♎ "you're so right!", changed it back later · ♏ said "noted", it was noted · ♐ typo'd again on purpose
//   · ♑ asked for a source · ♒ grammar is a social construct · ♓ cried, that typo had feelings
//   group "Correct a sign? | *Brave choice.*"   last "Virgo's still fixing | *your comma.*" (card six, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -190 }
const COMMA = ['.RRR.', 'RRRRR', 'RRRRR', '.RRRR', '...RR', '..RR.', '.RR..']
const comma = (x, cx, cy, cell, o) => drawBits(x, COMMA, { R: RED }, cx, cy, cell, o)

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged you | to a *spell-off.*', mood: 'squint', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      L(x, 800, 720, 'SPELL-OFF: NOW', pop01(t, P.t0 + 0.2, 0.3, 2.4), RED, -0.05, 38)
      bubble(x, 800, 960, 'spell “rhythm.”', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Didn’t look up. | *Kept eating.*', mood: 'heart', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bits(x, lt > 1.2 ? 'BITTEN' : 'SANDWICH', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'it’s “whom”…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      L(x, 800, 1150, 'NOT LISTENING', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Corrected your correction. | *Twice.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 820, lt, 0.7, 'YOUR', 'YOU’RE', { size: 46, fromBg: BONE, toBg: '#ffe27a' })
      if (lt > 1.4) swapLabel(x, 800, 1000, lt, 1.6, 'YOU’RE', 'YOUR', { size: 46, fromBg: '#ffe27a', toBg: MINT })
    } },
  { sign: 'cancer', cap: 'Sent you a thank-you card. | *Spelled perfectly.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 240, rot: -0.05, bg: '#ffe6ef', lines: ['thank you', 'for teaching me'], size: 34 })
      hearts(x, t, 560, 900, P.t0 + 1.0, { n: 4, life: 1.4, spread: 180, cell: 6, seed: 7 })
      L(x, 800, 1120, 'SPELL-CHECKED ×3', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: 'leo', cap: 'That typo? | A *stylistic choice.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 220, rot: 0.04, lines: ['love, thier', 'favourite star'], size: 32 })
      L(x, 800, 1080, 'IT’S ART', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: 'virgo', cap: 'Said thanks. | Then *fixed your comma.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 220, lines: ['let’s eat   grandma'], size: 32 })
      if (lt > 0.9) comma(x, 797, 804, 6 * pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2.4))
      bits(x, 'PEN', 880, 1000, 12 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.6 })
      L(x, 760, 1100, 'GRANDMA: SAVED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: '“You’re so right!” | *Changed it back later.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'you’re so right!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 980, 'EDIT: UNDONE', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Said “noted.” | *It was noted.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 260, head: 'NOTES', headBg: '#c94a6a', lines: ['you: one comma', 'me: never forget'], size: 28 })
      L(x, 800, 1110, 'FILED: FOREVER', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c94a6a', -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Laughed. Typo’d again. | *On purpose.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CHAT', headCol: LAV, lines: [['its “your”', BONE, 1], ['lol ur rite', MINT, pop01(t, P.t0 + 1.0, 0.25, 2), true], ['definately', MINT, pop01(t, P.t0 + 1.5, 0.25, 2), true]] })
    } },
  { sign: 'capricorn', cap: 'Asked for | *a source.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 800, 930, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 700, 'citation, please.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Grammar? | *A social construct.*', mood: lt => lt > 1.1 ? 'wink' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, 'RULES: OPTIONAL', pop01(t, P.t0 + 0.3, 0.3, 2.2), '#5fd1ff', 0.04, 34)
      bubble(x, 800, 980, 'words r free', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried. That typo | *had feelings.*', mood: 'heart', look: [1, -1], tears: 3, star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'luv u 2', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: '#ffe6ef', tail: 'bl' })
      hearts(x, t, 800, 1060, P.t0 + 0.8, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
      L(x, 800, 1130, 'LEAVE IT', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0635', key: 'F', accent: ACC, ending: 'callback',
  title: 'Fix their grammar? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Correct a sign? | *Brave choice.*' },
  last: {
    text: 'Virgo’s still fixing | *your comma.*',
    draw(x, t, lt) {
      comma(x, 500, 1260, 22 * pop01(t, t - lt + 0.7, 0.35, 2))
      bits(x, 'PEN', 650, 1300, 24 * pop01(t, t - lt + 1.0, 0.35, 2), { rot: -0.6 + 0.1 * Math.sin(t * 8) })
      sparkles(x, t, 500, 1260, t - lt + 1.2, 7, 140, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
