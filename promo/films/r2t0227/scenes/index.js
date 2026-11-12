// r2t0227: THE SIGNS AS… v3, "The signs | at the garden." (rollcall, botanical garden, star_talk, music: lofi · E). Ending: group.
//   ♈ whole garden in eleven minutes · ♉ found the one bench, lives there now · ♊ named every plant, all wrong
//   · ♋ adopted a sad fern · ♌ posed with every flower, the flowers lost · ♍ corrected the plant labels, with a pen
//   · ♎ smelled every rose, can't pick · ♏ skipped the roses for the flytraps · ♐ left the path, found a jungle
//   · ♑ asked the oldest tree for career advice · ♒ the cactus gets them · ♓ one tiny flower, sobbed
//   group (the ending): "Touched grass. | *Literally.*"  flowers pop up along the bottom
import { prog, ease } from '../../../src/lib.js'
import { makeFilm, sparkles, hearts, bubble, label, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, PAPER, WOOD, GREEN } from '../props.js'

const L = { x: -150 }, R = { x: 150 }
const DG = '#2f8f4a'
const BENCH = [['WWWWWWWWWWWWW', 'DDDDDDDDDDDDD', 'WWWWWWWWWWWWW', '.D.........D.', '.D.........D.', '.D.........D.'], { W: WOOD, D: '#8a4a2e' }]
const FLYTRAP = [['G.G.G...G.G.G', 'GGGGG...GGGGG', '.GRRG...GRRG.', '..GRRG.GRRG..', '...GGGGGGG...', '......G......', '.....GG......', '......G......', '...PPPPPPP...', '...PPPPPPP...', '....PPPPP....'], { G: GREEN, R: '#ff6b8a', P: ORANGE }]
const CACTUS = [['....GG....', '....GG....', 'G...GG....', 'G...GG..G.', 'GG..GG..G.', '.GGGGG.GG.', '....GGGG..', '....GG....', '..PPPPPP..', '..PPPPPP..', '...PPPP...'], { G: GREEN, P: RED }]
const TREE = [['...GGGGG...', '.GGGGGGGGG.', 'GGGDGGGGGGG', 'GGGGGGGDGGG', '.GGGGGGGGG.', '...GGGGG...', '....BBB....', '....BBB....', '....BBB....', '...BBBBB...', '..BB.B.BB..'], { G: DG, D: GREEN, B: '#8a4a2e' }]
const FERN = [['..G...G..', '.G.G.G.G.', 'G..GGG..G', '.G..G..G.', '..G.G.G..', '....G....', '..PPPPP..', '..PPPPP..', '...PPP...'], { G: '#9fb06a', P: SKYB }]

const CAMEOS = [
  { sign: 'aries', cap: 'Saw the whole garden. | In *eleven minutes.*', mood: 'wide', star: L, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      const s = Math.min(11, Math.floor(lt * 6))
      label(x, 790, 680, `TIMER: ${s} MIN`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 48, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'GARDEN: DONE ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the one bench. | *Lives there now.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: 0, y: -40 },
    back(x, t, lt, P) { drawBits(x, BENCH[0], BENCH[1], 540, 1060, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 780, 640, 'RESIDENT', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Named every plant. | *All of them wrong.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      bits(x, 'plant', 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const N = ['that’s Kevin.', 'a tulip, probably', 'no wait, Kevin']
      bubble(x, 790, 700, N[Math.min(2, Math.floor(Math.max(0, lt - 0.4) / 0.6))], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Found a sad little fern. | *Adopted it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L,
    front(x, t, lt, P) {
      drawBits(x, FERN[0], FERN[1], 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1 ? 0 : -0.15 })
      bubble(x, 790, 660, 'you’re coming | home, baby.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 680, 1140, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Posed with every flower. | *The flowers lost.*', mood: 'sparkle', star: L, hops: [0.9],
    front(x, t, lt, P) {
      bits(x, 'flower', 760, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.2 ? 0.5 : 0 })
      label(x, 790, 700, 'BEST BLOOM: LEO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Fixed the plant labels. | *With a pen.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      note(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), 'Rosa rossa | Rosa rosa', { head: 'PLANT LABEL', headBg: GREEN, size: 40, w: 340, strike: lt > 0.9 ? [0] : [] })
      label(x, 790, 1020, 'TYPOS FIXED: 14', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Smelled every rose. | *Can’t pick one.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'flower', 680 + i * 110, 1000, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      bubble(x, 790, 700, Math.floor(lt * 2.5) % 2 ? 'this one?' : 'no, this one?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Skipped the roses. | Visited *the flytraps.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, FLYTRAP[0], FLYTRAP[1], 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'my people.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Left the path. | Found *a jungle.*', mood: 'sparkle', star: R, hops: [0.6, 1.4],
    back(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, TREE[0], TREE[1], 200 + i * 130, 980 - (i % 2) * 70, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 330, 640, 'MAP: UNHELPFUL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked the oldest tree | for *career advice.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, TREE[0], TREE[1], 310, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 330, 640, 'grow slow. | stay rooted.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Talked to the cactus. | It *gets them.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, CACTUS[0], CACTUS[1], 790, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'same.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 52, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Saw one tiny flower. | *Sobbed* for ten minutes.', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'flower', 800, 1000, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'it’s so | brave!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0227', key: 'E', accent: MINT, ending: 'group',
  title: 'The signs | *at the garden.*',
  cameos: CAMEOS,
  group: {
    cap: 'Touched grass. | *Literally.*',
    draw(x, t, lt) { for (let i = 0; i < 7; i++) bits(x, i % 2 ? 'plant' : 'flower', 160 + i * 127, 1410, 11 * pop01(t, t - lt + 1.6 + i * 0.1, 0.3, 2.2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
