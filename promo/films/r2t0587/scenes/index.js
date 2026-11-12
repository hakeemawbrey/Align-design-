// r2t0587: star_talk, SOLO (gemini), "Your Gemini sibling | *be like.*" (signs3kit social cut, music: lofi · E).
// One sign the whole way: nine things a Gemini sibling does, each pushed to the extreme. Ending: group.
//   borrowed your hoodie, now it's theirs · two opinions on your haircut · forty memes from across the table
//   · started a band, quit by Thursday · argued both sides of your fight · visited your job, now everyone's friends
//   · ran your compatibility with their friends · told Mom your news before you did · fights you at noon, defends you at 12:01
//   group "Annoying. | *Irreplaceable.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'gemini', ST = { x: -180 }
const HOODIE = ['....GGGG....', '...GG..GG...', '.GGGGGGGGGG.', 'GGGGGWWGGGGG', 'GGGGGWWGGGGG', 'GG.GGGGGG.GG', 'GG.GGGGGG.GG', 'GG.GPPPPG.GG', 'YY.GPPPPG.YY', '...GGGGGG...', '...YYYYYY...']
const GUITAR = ['..........KK', '.........KK.', '........KK..', '.......KK...', '..OOO.KK....', '.OOOOKK.....', 'OOOWOOO.....', 'OOWWWOO.....', '.OOWOOO.....', '..OOOO......']

const CAMEOS = [
  { sign: S, cap: 'Borrowed your hoodie. | *Now it’s theirs.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { G: '#6fc3ff', W: BONE, P: '#4a9ad8', Y: GOLD }, 810, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      swapLabel(x, 810, 1110, lt, 1.1, 'OWNER: YOU', 'OWNER: GEMINI', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Two opinions | on *your haircut.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'love it.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: MINT, tail: 'bl' })
      bubble(x, 820, 930, 'hate it.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 50, col: '#ff6b5a', tail: 'bl' })
      L(x, 800, 1120, 'BOTH: SINCERE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Forty memes. | From *across the table.*', mood: lt => lt > 1.0 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(Math.max(0, lt - 0.3) * 22))
      phone(x, t, 810, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `MEMES: ${n}`, headCol: GOLD, lines: [['[meme]', BONE, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['[meme]', BONE, pop01(t, P.t0 + 0.8, 0.2, 2), false], ['look up', MINT, pop01(t, P.t0 + 1.3, 0.2, 2), false]] })
      L(x, 800, 1120, 'SEATED: 2 FT AWAY', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: S, cap: 'Started a band. | *Quit by Thursday.*', mood: lt => lt > 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [0.7],
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { O: '#ff9a4a', W: '#8a4a2e', K: '#e8b36a' }, 760, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      if (lt < 1.3) notes(x, t, 820, 760, { n: 4, cell: 7, col: GOLD, alpha: clamp(lt * 3) })
      swapLabel(x, 800, 1110, lt, 1.3, 'WORLD TOUR', 'BAND: DONE', { size: 34, fromBg: GOLD, toBg: STEEL })
    } },
  { sign: S, cap: 'Argued both sides | of *your fight.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'squint' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const side = Math.floor(lt * 2.5) % 2
      L(x, 800, 760, side ? 'TEAM YOU' : 'TEAM THEM', pop01(t, P.t0 + 0.2, 0.3, 2), side ? MINT : '#ff6b5a', side ? 0.05 : -0.05, 44)
      L(x, 800, 1060, 'WON BOTH', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Visited your job once. | *Now everyone’s friends.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['taurus', 'virgo', 'capricorn', 'cancer']
      ids.forEach((id, i) => friend(x, t, id, 680 + (i % 2) * 180, 760 + Math.floor(i / 2) * 200, 130, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0] }))
      L(x, 800, 1110, 'GROUP CHAT: MADE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Ran your compatibility | with *all their friends.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 800, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      bubble(x, 790, 1040, 'trust me.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Told Mom your news | *before you did.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      phone(x, t, 810, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'MOM', headCol: PINK, lines: [['guess what', GOLD, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['...', GOLD, pop01(t, P.t0 + 0.7, 0.2, 2), true], ['CONGRATS!!', MINT, pop01(t, P.t0 + 1.2, 0.2, 2), false]] })
      L(x, 800, 1120, 'SPOILER: SPOILED', pop01(t, P.t0 + 1.6, 0.3, 2.2), RED, -0.04, 30)
    } },
  { sign: S, cap: 'Fights you at noon. | *Defends you at 12:01.*', mood: lt => lt > 1.1 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.2, 1.5],
    front(x, t, lt, P) {
      bits(x, 'SHIELD', 820, 880, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      bubble(x, 790, 650, lt < 1.0 ? 'you’re so annoying' : 'that’s MY sibling.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: lt < 1.0 ? STEEL : GOLD, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0587', key: 'E', accent: ACC, solo: S, ending: 'group',
  title: 'Your Gemini sibling | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Annoying. | *Irreplaceable.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
