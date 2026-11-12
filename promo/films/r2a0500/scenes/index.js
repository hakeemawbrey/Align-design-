// r2a0500: star_advice, ADVICE ROLLCALL, "Each sign's | *most lovable quirk.*" (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, one warm, specific, lovable quirk each, with a light visual gag. Ending: callback.
//   ♈ narrates their own wins · ♉ rates every snack out of ten · ♊ forty tabs, all fascinating · ♋ saves every
//   ticket stub · ♌ walks in like there's a soundtrack · ♍ labels everything (even the labels) · ♎ asks your
//   opinion on their opinion · ♏ knows every plot twist, won't spoil it · ♐ befriends strangers in line · ♑ secretly
//   hilarious, dry as toast · ♒ names every houseplant (full names) · ♓ cries at every ad
//   group "Your quirks are | *why we love you.*"   last "Taurus rated this video: | *ten out of ten.*" (the snack ratings, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#c9a6ff', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#2fc79a', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const COOKIE = ['..BBBBB..', '.BBKBBBB.', 'BBBBBBKBB', 'BKBBBBBBB', 'BBBBKBBBB', 'BBBBBBBKB', '.BKBBBBB.', '..BBBBB..']
const TOAST = ['.TTTTTTTT.', 'TTTTTTTTTT', 'TTCCCCCCTT', 'TTCCCCCCTT', 'TTCCCCCCTT', 'TTCCCCCCTT', 'TTCCCCCCTT', 'TTTTTTTTTT']
const PLANT = ['...G.G...', '..GGGGG..', '.GGG.GGG.', '..GGGGG..', '...GGG...', '....G....', '.RRRRRRR.', '.RRRRRRR.', '..RRRRR..', '..RRRRR..']
const POPCORN = ['.W.WW.W.', 'WWWWWWWW', '.WWWWWW.', 'RWRWRWRW', 'RWRWRWRW', '.RWRWRW.', '.RWRWRW.']
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '....K..K....', '...KKKKKK...']

const CAMEOS = [
  { sign: 'aries', cap: 'Narrates their own wins. | *Out loud.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and the crowd | goes WILD', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 790, 900, 'WIN: PARKED FIRST TRY', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 28)
      L(x, 790, 1100, 'CROWD: JUST YOU', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Rates every snack. | *Out of ten.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COOKIE, { B: '#d9a05a', K: '#5a3a1a' }, 790, 880, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 660, lt > 1.2 ? '9.5 / 10' : 'TASTING…', pop01(t, P.t0 + 0.5, 0.3, 2.2), lt > 1.2 ? GOLD : BONE, 0.05, 44)
      L(x, 790, 1100, 'NOTES: BUTTERY', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Forty tabs open. | *All fascinating.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      box(x, 790, 860, 330, 260, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        const n = Math.min(14, 2 + Math.floor(clamp((lt - 0.2) / 1.4) * 12))
        for (let i = 0; i < n; i++) { x.fillStyle = [GOLD, MINT, PINK, SKYB, LAV][i % 5]; x.fillRect(-156 + i * 22, -122, 20, 26) }
        x.fillStyle = '#140c30'; x.fillRect(-150, -88, 300, 200)
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.fillText(['octopus facts', 'how clouds float', 'medieval bread'][Math.floor(lt * 2) % 3], 0, 10)
      })
      L(x, 790, 1100, 'TABS: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Saves every ticket stub. | *Every one.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 6))
      for (let i = 0; i < n; i++) box(x, 790 + (i % 2 ? 30 : -30), 1040 - i * 60, 230, 70, 1, (i % 3 - 1) * 0.08, () => { x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText(['ADMIT ONE', 'ROW F · 12', 'ADMIT TWO', 'ZOO DAY', 'MATINEE', 'FIRST DATE'][i], 0, 2) }, [GOLD, PINK, MINT, SKYB, CREAM, LAV][i])
      L(x, 790, 610, 'SINCE 2009', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.05, 30)
    } },
  { sign: 'leo', cap: 'Walks in like | *there’s a soundtrack.*', mood: 'sparkle', look: [1, 0], star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      notes(x, t, 640, 820, { n: 6, cell: 8, col: GOLD, seed: 1 })
      L(x, 790, 680, 'NOW PLAYING: ME', pop01(t, P.t0 + 0.5, 0.3, 2.2), ORANGE, 0.05, 34)
      L(x, 790, 1100, '(it’s the grocery store)', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04, 26)
    } },
  { sign: 'virgo', cap: 'Labels everything. | *Even the labels.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      L(x, 790, 720, 'SPOONS', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.03, 40)
      L(x, 790, 850, 'LABELS', pop01(t, P.t0 + 0.8, 0.3, 2), MINT, -0.04, 40)
      L(x, 790, 980, 'LABELS FOR LABELS', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
      L(x, 790, 1110, '(LABEL)', pop01(t, P.t0 + 1.9, 0.3, 2.4), PINK, -0.05, 24)
    } },
  { sign: 'libra', cap: 'Asks your opinion. | *On their opinion.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I like the blue.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 790, 900, '…do I, though?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      L(x, 790, 1100, 'YOUR TAKE?', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Knows every plot twist. | *Won’t spoil it.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: '#4a3a8a' }, 800, 820, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, POPCORN, { W: CREAM, R: RED }, 640, 1040, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 830, 1060, 'just… watch.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Befriends strangers in line. | *Instantly.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 940, 180 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 44, glyph: false })
      bubble(x, 790, 680, 'we’re going on | a trip together', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1120, 'MET: 2 MIN AGO', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Secretly hilarious. | *Dry as toast.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TOAST, { T: '#b07a3a', C: '#e8c27a' }, 790, 880, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 790, 650, '“great. love that.”', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: SLATE, tail: 'bl' })
      L(x, 790, 1110, 'ROOM: IN TEARS', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Names every houseplant. | *Full names.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, { G: GREEN, R: '#c9653a' }, 790, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 790, 650, 'SIR LEAFSWORTH III', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, 0.05, 30)
      L(x, 790, 1120, 'BIRTH CHART: PENDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'Cries at ads. | *Every single one.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: '#6fc3ff' }, 800, 840, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 830, 'AD: A PUPPY', pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.03, 28)
      L(x, 790, 1110, 'IT WAS FOR TISSUES', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0500', key: 'G', accent: ACC,
  title: 'Each sign’s most | *lovable quirk.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Your quirks are | *why we love you.*' },
  last: {
    text: 'Taurus rated this: | *ten out of ten.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1040, 300 * k, { mood: 'heart', seed: 5, hops: [t - lt + 1.2] })
      label(x, 540, 1300, '10 / 10', pop01(t, t - lt + 1.2, 0.35, 2.6), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1040, t - lt + 1.3, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
