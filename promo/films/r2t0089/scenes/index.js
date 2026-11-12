// r2t0089: star_talk SOLO, "Cancers shopping | be like." (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards), every card the most extreme Cancer version of a shopping trip:
//   went in for milk, bought you a gift · tried it on, called mom first · a mug that says "home"? bought four
//   · a cart of snacks for the group · asked the cashier about their family · bought the saddest plant (it needed them)
//   · kept the receipt for sentimental value · lost in the blanket aisle · matching pajamas for the whole family
//  37.8   GROUP ENDING: "Shopping for one? | *Never.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CANC = '#8fe3ff', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

// ── props
const BAG = ['...KKKK...', '..K....K..', '..K....K..', 'PPPPPPPPPP', 'PPPPPPPPPP', 'PPPHHPHHPP', 'PPPHHHHHPP', 'PPPPHHHPPP', 'PPPPPHPPPP', 'PPPPPPPPPP', 'PPPPPPPPPP']
const MILK = ['.WWW.', 'WWWWW', 'WBBBW', 'WBWBW', 'WBBBW', 'WWWWW', 'WWWWW']
const MUG = ['WWWWWWW..', 'WCCCCCWWW', 'WCHCHCW.W', 'WCHHHCW.W', 'WCCHCCWWW', 'WCCCCCW..', '.WWWWW...']
const CART = [
  'K..............',
  '.K.............',
  '..KKKKKKKKKKKKK',
  '..K.K.K.K.K.K.K',
  '..KKKKKKKKKKKKK',
  '...K.K.K.K.K.K.',
  '...KKKKKKKKKKK.',
  '....K.......K..',
  '...KKK.....KKK.',
]
const PLANT_SAD = ['..G......', '...G.....', '....G.GG.', '.GG.G.G..', '...GGG...', '....G....', 'TTTTTTTTT', '.TTTTTTT.', '..TTTTT..']
const PLANT_OK = ['..GG.GG..', '.GGG.GGG.', '..GGGGG..', 'GG..G..GG', '.GGGGGGG.', '....G....', 'TTTTTTTTT', '.TTTTTTT.', '..TTTTT..']
const PJ = ['.PPP.PPP.', 'PPPPPPPPP', 'PWPPPPPWP', 'PPPPPPPPP', '.PPPPPPP.', '.PPP.PPP.', '.PPP.PPP.', '.PPP.PPP.']
const SNACK = ['RRRRR', 'RYYYR', 'RYRYR', 'RYYYR', 'RRRRR']

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'Went in for milk. | *Bought you a gift.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MILK, { W: '#ffffff', B: SKYB }, 700, 1000, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BAG, { K: INK, P: PINK, H: RED }, 850, 900, 20 * pop01(t, P.t0 + 0.9, 0.3, 2.2), { rot: 0.06 })
      label(x, 790, 650, 'IT’S FOR YOU!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Tried it on. | *Called mom first.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'mom, is it cute?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 900, 'SO cute!!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, col: PINK, tail: 'br' })
      hearts(x, t, 900, 1080, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'Mug says “home.” | *Bought four.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, MUG, { W: BONE, C: CANC, H: RED }, 700 + (i % 2) * 170, 800 + Math.floor(i / 2) * 170, 17 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2))
      label(x, 790, 1120, 'ONE FOR EVERYONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: CANC, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Snacks for themself? | No. *For the group.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, CART, { K: '#c9c9d8' }, 800, 980, 20 * k)
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 9)
      for (let i = 0; i < n; i++) drawBits(x, SNACK, { R: [RED, GREEN, '#c97bff'][i % 3], Y: GOLD }, 720 + (i % 5) * 44, 880 - Math.floor(i / 5) * 46, 9)
      label(x, 790, 650, 'SERVES: 30', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asked the cashier | about *their family.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 820, 990, 190 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 790, 680, 'and how’s your mom?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 820, 1150, 'LINE: 40 MIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saddest plant there? | *It needed them.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ok = lt > 1.3
      drawBits(x, ok ? PLANT_OK : PLANT_SAD, { G: ok ? GREEN : '#9aa58a', T: BROWN }, 800, 920, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (ok) { sparkles(x, t, 800, 880, P.t0 + 1.3 * 1.29 + 0.05, 7, 150, 0.4); hearts(x, t, 800, 820, P.t0 + 1.8, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 6 }) }
      label(x, 790, 650, ok ? 'THRIVING' : 'CLEARANCE', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: ok ? MINT : RED, color: ok ? INK : '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Kept the receipt. | *Sentimental value.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-96, -196, 192, 392); x.fillStyle = '#ffffff'; x.fillRect(-88, -188, 176, 376)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('THANK YOU', 0, -150)
        x.fillStyle = '#9aa5c4'; for (let i = 0; i < 9; i++) { x.fillRect(-70, -116 + i * 30, 90 - (i % 3) * 14, 10); x.fillRect(40, -116 + i * 30, 30, 10) }
        x.fillStyle = RED; x.font = `800 60px ${INTER}`; x.fillText('♥', 40, 170)
        x.restore()
      }
      label(x, 790, 1130, 'FILED: MEMORIES', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Blanket aisle. | *Never seen again.*', mood: 'sleepy', star: { x: -40, y: 60 },
    front(x, t, lt, P, F) {
      // blankets pile up around the star
      const COLS = [PINK, LAV, CANC, GOLD, MINT]
      for (let i = 0; i < 5; i++) {
        const k = pop01(t, P.t0 + 0.4 + i * 0.18, 0.3, 2)
        if (k <= 0.01) continue
        x.save(); x.translate(F.x + (i % 2 ? 1 : -1) * (60 + i * 18), 1100 - i * 30); x.rotate((i % 2 ? 0.08 : -0.08)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -34, 340, 68); x.fillStyle = COLS[i]; x.fillRect(-164, -28, 328, 56)
        x.fillStyle = 'rgba(255,255,255,0.35)'; for (let j = 0; j < 6; j++) x.fillRect(-150 + j * 56, -20, 24, 40)
        x.restore()
      }
      label(x, 540, 640, 'MISSING: 3 HOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Matching pajamas. | *For the whole family.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, PJ, { P: RED, W: '#fff4e2' }, 700 + (i % 2) * 170, 800 + Math.floor(i / 2) * 190, (i < 2 ? 15 : 11) * pop01(t, P.t0 + 0.2 + i * 0.2, 0.25, 2.2))
      label(x, 790, 1140, 'EVEN THE DOG', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: CANC, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0089', key: 'D', accent: CANC, solo: 'cancer', ending: 'group',
  title: 'Cancers shopping | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Shopping for one? | *Never.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
