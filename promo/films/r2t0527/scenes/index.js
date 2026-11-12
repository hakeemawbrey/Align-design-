// r2t0527: star_talk, SOLO, "Pisces at a party | *be like.*" (~43 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards): a Pisces at a party, every feeling at full volume. Pisces cries
// in every card. Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   cried at the door (people came!) · found the dog, stayed with the dog · the birthday song: full sob
//              · a stranger is now a best friend · asked everyone's sign, cried at the chart · their song came on
//              · a quick happy cry in the hallway · goodbye hug number fourteen · home, crying about how fun it was
//  37.8        "Best night ever. | *Cried nine times.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', BLUE = '#6fc3ff', ORANGE = '#ffb34a'

const DOG = [
  'BB.......BB.',
  'BBB.....BBB.',
  '.BWWWWWWWB..',
  '.WWKWWWKWW..',
  '.WWWWNWWWW..',
  '..WWWPWWW...',
  '...WWWWW....',
  '..WWWWWWWWWT',
  '..WWWWWWWWW.',
  '..WW.WW.WW..',
]
const DOG_C = { B: BROWN, W: CREAM, K: INK, N: INK, P: PINK, T: CREAM }
const CAKE = [
  '..R...R...R..',
  '..Y...Y...Y..',
  '..W...W...W..',
  '.PPPPPPPPPPP.',
  '.PWPPWPPWPPW.',
  '.CCCCCCCCCCC.',
  '.PPPPPPPPPPP.',
  'WWWWWWWWWWWWW',
]
const CAKE_C = { R: ORANGE, Y: GOLD, W: CREAM, P: LAV, C: BROWN }
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWKKWWKKWK', 'KWKKWWKKWK', 'KWWWWWWWWK', 'KWWWWWWYWK', 'KWKKWWKKWK', 'KWKKWWKKWK', 'KWWWWWWWWK', 'KWWWWWWWWK']
const BED = ['W..........', 'WPPP.......', 'WPPPBBBBBBB', 'WBBBBBBBBBW', 'WBBBBBBBBBW', 'WWWWWWWWWWW', 'W.........W']

/** a little chart card: twelve coloured wedges and a title strip */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chartCard(x, cx, cy, k, t, head) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 312, 312)
  x.fillStyle = INK; x.fillRect(-162, -162, 324, 324); x.fillStyle = '#140c30'; x.fillRect(-154, -154, 308, 308)
  x.fillStyle = BLUE; x.fillRect(-154, -154, 308, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -123)
  x.save(); x.translate(0, 34); x.rotate(t * 0.3)
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 100, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.fill()
  x.restore(); x.restore()
}

const S = 'pisces'
const CAMEOS = [
  { sign: S, cap: 'Cried at the door. | *People came!*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, W: '#c98f5a', Y: GOLD }, 810, 860, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 620, 'you CAME!!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 800, 1110, 'GUESTS: ALL INVITED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Found the dog. | *Stayed with the dog.*', mood: 'heart', tears: 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 800, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 6) * 0.03 })
      label(x, 790, 650, 'PARTY: OVER THERE', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 640, 880, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'The birthday song. | *Full sob.*', mood: 'wide', tears: lt => lt > 1.0 ? 3 : 1, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 760, { n: 4, cell: 7, col: GOLD, seed: 3 })
      label(x, 800, 1110, 'NOT EVEN THEIR BIRTHDAY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 26, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Met a stranger. | *Best friends now.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 790, 930, 220 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 23, glyph: false })
      label(x, 790, 650, 'MET: 4 MINUTES AGO', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 420, 620, 'my soulmate!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: S, cap: 'Asked everyone’s sign. | *Cried at the chart.*', mood: 'sparkle', tears: lt => lt > 1.2 ? 3 : 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chartCard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), t, 'THE WHOLE PARTY')
      label(x, 790, 1100, 'WE’RE ALL CONNECTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their song came on. | *Emotional dance.*', mood: lt => Math.floor(lt * 2) % 2 ? 'heart' : 'sparkle', tears: 2, star: { x: -150 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P) {
      notes(x, t, 760, 920, { n: 6, cell: 8, col: BLUE, seed: 4 })
      label(x, 800, 650, 'DANCING. AND CRYING.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 820, P.t0 + 1.0, 7, 200, 0.2)
    } },
  { sign: S, cap: 'Quick break in the hallway. | *A happy cry.*', mood: 'heart', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 760, '5-MINUTE FEELINGS BREAK', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 26, bg: BLUE, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 940, 'everyone’s | so NICE', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Left at ten. | Goodbyes *till midnight.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.5) * 13)
      label(x, 790, 650, `GOODBYE HUG #${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 940, 200 * k, { mood: lt > 1.4 ? 'sleepy' : 'happy', look: [-1, 0], seed: 29, glyph: false })
      bubble(x, 790, 1130, 'one more!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Home at last. | Cried about *how fun it was.*', mood: 'heart', tears: 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BED, { W: '#c98f5a', P: CREAM, B: BLUE }, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'best night | EVER', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0527', key: 'E', accent: BLUE, solo: S, ending: 'group',
  title: 'Pisces at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Best night ever. | *Cried nine times.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
