// v3t091: THE SIGNS AS… v3, "The signs | ordering dinner." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs order at the same restaurant, each the most extreme version of themself. Ending: 'group'.
//   0.0–3.6    "The signs | *ordering dinner.*"
//   3.6–49.2   ♈ ordered before the waiter said hello · ♉ dessert first, mains "later" · ♊ took the next table's order
//              · ♋ brought their own lasagna (mom's) · ♌ is today's special · ♍ a salad with a receipt-long list of changes
//              · ♎ ordered the pink one to match the outfit · ♏ asked the waiter's sign, ordered accordingly
//              · ♐ hottest dish, asked for more · ♑ split the bill to the cent · ♒ ordered a dish that doesn't exist
//              · ♓ waiter said "enjoy", Pisces wept
//  49.2        group (the ending): "The waiter | needs *a minute.*"  The waiter's notepad: ORDER: ???
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CAKE = [
  '....RR....',
  '...WWWW...',
  '.PPPPPPPP.',
  'PWPPWPPWPP',
  'CCCCCCCCCC',
  'WWWWWWWWWW',
  'CCCCCCCCCC',
  'CCCCCCCCCC',
]
const CAKE_C = { R: '#e23d4e', W: '#fff4e2', P: '#ff8fb1', C: '#8a4a2e' }
const BOX = [
  'LLLLLLLLLLLL',
  'LLLLLLLLLLLL',
  'GGGGGGGGGGGG',
  'GOOOOOOOOOOG',
  'GOYYOOOYYOOG',
  'GOOOOOOOOOOG',
  'GRRRRRRRRRRG',
  'GOOOYYOOOOOG',
  'GGGGGGGGGGGG',
]
const BOX_C = { L: '#6fc3ff', G: '#d8e6f2', O: '#e8a24a', Y: GOLD, R: '#e23d4e' }
const PEPPER = [
  '.....GG.',
  '....GG..',
  '..RRRR..',
  '.RRWRRR.',
  'RRRRRRR.',
  'RRRRRR..',
  'RRRRR...',
  '.RRR....',
  '..R.....',
]
const PEPPER_C = { G: '#5fd068', R: '#e23d4e', W: '#ffb3b3' }
const PARFAIT = [
  '...RR...',
  '.WWWWWW.',
  'KPPPPPPK',
  'KPWPPWPK',
  '.KPPPPK.',
  '..KPPK..',
  '...KK...',
  '...KK...',
  '.KKKKKK.',
]
const PARFAIT_C = { R: '#e23d4e', W: '#fff4e2', P: '#ff8fb1', K: '#cfd8ff' }
const SOUP = [
  '.S....S..',
  '..S..S...',
  '.S....S..',
  'WWWWWWWWW',
  'WBBBBBBBW',
  '.WBBBBBW.',
  '..WWWWW..',
]
const SOUP_C = { S: '#cfe8ff', W: '#fff4e2', B: '#4f7dff' }

// a long receipt of modifications that unrolls down the panel
function receipt(x, cx, top, k, lt, lines) {
  if (k <= 0.01) return
  const n = Math.min(lines.length, Math.floor(Math.max(0, lt - 0.3) / 0.2) + 1)
  const h = 60 + n * 46
  x.save(); x.translate(cx, top); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -6, 332, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-160, 0, 320, h)
  x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.font = `800 28px ${INTER}`; x.fillText('SALAD, BUT:', -140, 30)
  x.font = `700 24px ${MONO}`
  for (let i = 0; i < n; i++) x.fillText('- ' + lines[i], -140, 76 + i * 46)
  x.restore()
}
// a chalkboard sign on an easel
function chalkboard(x, cx, cy, k, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = '#8a4a2e'; x.fillRect(-110, 120, 18, 150); x.fillRect(92, 120, 18, 150)
  x.fillStyle = INK; x.fillRect(-160, -150, 320, 290)
  x.fillStyle = '#c98f2a'; x.fillRect(-152, -142, 304, 274)
  x.fillStyle = '#23322b'; x.fillRect(-138, -128, 276, 246)
  x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 28px ${MONO}`; x.fillText(a, 0, -80)
  x.font = `800 64px ${INTER}`; x.fillStyle = '#ffb34a'; x.fillText(b, 0, 10)
  x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.fillText('market price', 0, 82)
  x.restore()
}
// a split bill: a calculator-tape label with the exact cents
function calc(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -160, 240, 320)
  x.fillStyle = '#9aa5c4'; x.fillRect(-112, -152, 224, 304)
  x.fillStyle = '#c9f5d8'; x.fillRect(-96, -136, 192, 70)
  x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
  const v = lt < 0.9 ? (Math.floor(lt * 40) % 97 + 1.13).toFixed(2) : '12.37'
  x.fillText(v, 84, -100)
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    x.fillStyle = c === 3 ? '#ffb34a' : '#2a2350'; x.fillRect(-92 + c * 48, -48 + r * 48, 40, 40)
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ordered before the waiter | said *hello.*', mood: 'sparkle', star: { x: -150 }, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'BURGER. GO.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      bubble(x, 790, 860, 'hi, I’m—', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1040, 'ORDER #1 · 0.4 SEC', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Dessert first. | Mains *“later.”*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.04 })
      label(x, 790, 680, 'DESSERT: ALL OF IT', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 30, bg: PINK, rot: -0.05 })
      label(x, 790, 1080, 'MAINS: MAYBE', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Took the next table’s | *order too.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 650, 'and for you, sir?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 830, 'TABLE 7', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 34, bg: GOLD, rot: 0.05 })
      bubble(x, 800, 1010, 'who are you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Brought their own food. | *Mom’s lasagna.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, BOX, BOX_C, 790, 900, 20 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.05 })
      label(x, 790, 700, 'MOM’S. DO NOT TOUCH', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 28, bg: PINK, rot: 0.05 })
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Asked for the special. | It’s *them.*', mood: 'sparkle', star: { x: 150 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { chalkboard(x, 300, 840, pop01(t, P.t0 + 0.3, 0.35, 2), 'TODAY’S SPECIAL', 'LEO') },
    front(x, t, lt, P) { sparkles(x, t, 300, 840, P.t0 + 1.0, 6, 170, 0.2) } },
  { sign: 'virgo', cap: 'Ordered a salad. | *Nine notes.*', mood: lt => lt > 1.8 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      receipt(x, 760, 520, pop01(t, P.t0 + 0.25, 0.3, 2), lt, ['no leaves', 'dressing: side', 'no, other side', 'croutons: 4', 'cut in squares', 'fork: washed', 'warm-ish', 'not that warm', 'thank you'])
    } },
  { sign: 'libra', cap: 'Ordered the pink one. | *Matches the outfit.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, PARFAIT, PARFAIT_C, 790, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 790, 680, 'OUTFIT: MATCHED', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: PINK, rot: -0.05 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 6, 140, 0.6)
    } },
  { sign: 'scorpio', cap: 'Asked the waiter’s sign. | Then *the chef’s.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'and your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      bubble(x, 800, 830, '…a Virgo?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 790, 1010, 'CHEF: NEXT', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 32, bg: MINT, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: 'Hottest dish there. | Asked for *more.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: 150 }, hops: [1.4],
    back(x, t, lt, P) {
      drawBits(x, PEPPER, PEPPER_C, 300, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.2 + 0.08 * Math.sin(t * 9) })
    },
    front(x, t, lt, P) {
      label(x, 300, 640, 'SPICE: 10 OF 10', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 30, bg: '#ff6b5a', rot: -0.05 })
      bubble(x, 310, 1090, 'mild, honestly', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Split the bill | *to the cent.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      calc(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 1070, 'YOU OWE: 12.37', pop01(t, P.t0 + 1.3, 0.3, 2), { size: 30, bg: MINT, rot: -0.05 })
    } },
  { sign: 'aquarius', cap: 'Ordered a dish | that *doesn’t exist.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -160 },
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'cold blue soup, | please', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      drawBits(x, SOUP, SOUP_C, 790, 900, 24 * pop01(t, P.t0 + 1.2, 0.35, 2))
      label(x, 790, 1060, 'CHEF: INSPIRED', pop01(t, P.t0 + 1.6, 0.3, 2), { size: 28, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'pisces', cap: 'Waiter said “enjoy.” | Pisces *wept.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'enjoy!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 790, 880, 'SO KIND', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 36, bg: PINK, rot: 0.05 })
      hearts(x, t, 790, 1000, P.t0 + 1.1, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

// the waiter's notepad after taking all twelve orders
function notepad(x, t, lt) {
  const k = pop01(t, t - lt + 1.6, 0.35, 2)
  if (k <= 0.01) return
  x.save(); x.translate(540, 620); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-230, -110, 460, 220)
  x.fillStyle = '#fff4e2'; x.fillRect(-222, -102, 444, 204)
  x.fillStyle = '#e23d4e'; x.fillRect(-222, -102, 444, 26)
  x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('TABLE OF 12', 0, -40)
  x.font = `800 56px ${INTER}`; x.fillText('ORDER: ???', 0, 34)
  x.restore()
}

const F = makeFilm({
  id: 'v3t091', key: 'C', accent: '#ffb34a', ending: 'group',
  title: 'The signs | *ordering dinner.*',
  cameos: CAMEOS,
  group: { cap: 'The waiter | needs *a minute.*', draw: notepad },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
