// r2t0648: star_talk, BELIKE, "“Just a game”? | Zodiacs *be like.*" (topic: when someone says "it's just a game";
// ~64 s vertical, signs3kit social cut, music: lofi · G). Ending: lesson.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one game-night reaction per sign (3.8 s each):
//              ♈ lost one round, demanded ten rematches · ♉ won't leave the lucky chair · ♊ switched teams mid-game, twice
//              · ♋ still remembers who cheated in 2009 · ♌ won, gave a speech · ♍ read all forty pages of rules aloud
//              · ♎ made everyone shake hands after · ♏ poker face, for a word game · ♐ invented a new rule mid-turn
//              · ♑ has tracked the scores since 2019 · ♒ played a different game on the same board · ♓ lost, cried; won, also cried
//  49.2        "Just a game? | *Never.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Play to win. | *Stay* to laugh."  GAME NIGHT: SAVED
//  58.3        "Rematch? | *Obviously.*"
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0'
const R = { x: -170 }
const CHAIR = ['KK......', 'KK......', 'KK......', 'KK......', 'KKKKKKKK', 'KKKKKKKK', 'KK....KK', 'KK....KK', 'KK....KK']
const DIE = ['WWWWWWW', 'WKWWWKW', 'WWWWWWW', 'WWWKWWW', 'WWWWWWW', 'WKWWWKW', 'WWWWWWW']

const CAMEOS = [
  { sign: 'aries', cap: 'Lost one round. | Demanded *ten rematches.*', mood: lt => lt > 0.8 ? 'squint' : 'wide', star: R, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      drawBits(x, DIE, { W: CREAM, K: INK }, 790, 820, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 2 })
      const n = 1 + Math.min(9, Math.floor(Math.max(0, lt - 0.5) / 0.15))
      L(x, 790, 1040, `REMATCH #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), RED, -0.05, 44)
    } },
  { sign: 'taurus', cap: 'Won’t leave | their *lucky chair.*', mood: lt => lt > 1.3 ? 'squint' : 'happy', star: { x: -170, y: -20 },
    back(x, t, lt, P) { drawBits(x, CHAIR, { K: WOOD }, 370, 960, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 780, 'LUCKY CHAIR', pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.05, 40)
      bubble(x, 790, 980, 'not moving.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Switched teams | *mid-game.* Twice.', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: R,
    front(x, t, lt, P) {
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.55))
      L(x, 790, 860, ['TEAM RED', 'TEAM BLUE', 'TEAM RED'][n], pop01(t, P.t0 + 0.3, 0.3, 2), [RED, '#6fc3ff', RED][n], 0.05, 48)
    } },
  { sign: 'cancer', cap: 'Still remembers who | *cheated in 2009.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 290, h: 260, head: 'GAME NIGHT 2009', headBg: '#6fc3ff', headInk: INK, lines: ['winner: ???', ['CHEATED.', RED]], size: 34, progress: prog(lt, 0.5, 1.2) })
      L(x, 790, 1080, 'NEVER FORGET', pop01(t, P.t0 + 1.5, 0.3, 2.2), LAV, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Won. | Gave a *speech.*', mood: 'sparkle', star: R, hops: [0.9],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1030, 'I’d like | to thank me', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 800, P.t0 + 0.6, 7, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Read the rules aloud. | *All forty pages.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 790, 830, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const p = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 39)
      L(x, 790, 1050, `PAGE ${p} OF 40`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, 0.04, 36)
    } },
  { sign: 'libra', cap: 'Made everyone | *shake hands after.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 780, 'good game, | everyone!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1000, 'MANDATORY', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.05, 40)
    } },
  { sign: 'scorpio', cap: 'Poker face. | *For a word game.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bubble(x, 790, 780, '…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 60, col: LAV, tail: 'bl' })
      L(x, 790, 990, 'TELLS: NONE', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#c97bff', -0.05, 40)
    } },
  { sign: 'sagittarius', cap: 'Invented a new rule. | *Mid-turn.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: R, hops: [1.0],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 300, h: 240, head: 'RULE 14 (NEW)', headBg: GOLD, headInk: INK, lines: ['jumping', 'counts double'], size: 34, progress: prog(lt, 0.5, 1.2) })
      bubble(x, 560, 680, 'trust me', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Has tracked the scores | *since 2019.*', mood: 'neutral', look: [1, 0], star: R,
    front(x, t, lt, P) {
      bits(x, 'PAPERS', 790, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1050, 'SEASON 7 STANDINGS', pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Same board. | *Different game.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: R,
    front(x, t, lt, P) {
      drawBits(x, DIE, { W: '#6fc3ff', K: INK }, 740, 830, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.5 })
      drawBits(x, DIE, { W: MINT, K: INK }, 850, 870, 14 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: -0.3 })
      bubble(x, 790, 1050, 'it’s chess now', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Lost? Cried. | Won? *Also cried.*', mood: lt => lt < 1.2 ? 'wide' : 'heart', tears: 3, star: R,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 820, lt < 1.2 ? 'YOU LOST' : 'YOU WON!', pop01(t, P.t0 + 0.3, 0.3, 2), lt < 1.2 ? STEEL : GOLD, -0.05, 44)
      bits(x, 'TISSUE', 790, 1010, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0648', key: 'G', accent: ACC, ending: 'lesson',
  title: '“Just a game”? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Just a game? | *Never.*' },
  lesson: { text: 'Play to win. | *Stay* to laugh.', chip: 'GAME NIGHT: SAVED' },
  last: { text: 'Rematch? | *Obviously.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
