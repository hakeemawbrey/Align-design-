// r2t0342: star_talk, ROLLCALL, "The signs | at the vet." (~56 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme version of itself in the vet's waiting room.
//   0.0–3.6    "The signs | *at the vet.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ ran in yelling, it's a hiccup · ♉ vet said walk more, bought a stroller · ♊ one cat, four names
//              · ♋ packed the hamster an overnight bag · ♌ waiting-room selfie, take forty · ♍ a binder of the cat's naps
//              · ♎ said sorry to the cat eleven times · ♏ the cat hissed, Scorpio hissed back · ♐ their pet is a llama
//              · ♑ negotiated the bill, got a loyalty card · ♒ their pet is a houseplant · ♓ pet's fine, Pisces is not
//  49.2        "Every pet: fine. | *Every owner: not.*"  The twelve fly up into a group photo.
//  52.6        callback: "The llama | *got a sticker too.*" (Sagittarius' llama, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const DOG = [
  '..........EE..',
  '.........EHHH.',
  '.........HKHHN',
  'T.......HHHHHN',
  'TT.HHHHHHHHH..',
  '.THHHHHHHHHH..',
  '..HHHHHHHHHH..',
  '..H.H....H.H..',
  '..H.H....H.H..',
]
const DOG_C = { E: WOOD, H: '#e8a24a', K: INK, N: '#2a2350', T: '#e8a24a' }
const CAT = [
  '.K......K...',
  '.KK....KK...',
  '.KKKKKKKK...',
  '.KGKKKKGK...',
  '.KKKPPKKK...',
  '..KKKKKK..T.',
  '.KKKKKKKK.T.',
  '.KKKKKKKKKT.',
  '.KKKKKKKKT..',
  '.KK.KK.KK...',
]
const CAT_C = { K: '#ffb34a', G: '#5fd068', P: PINK, T: '#ffb34a' }
const CAT_HISS = [
  '.K......K...',
  '.KK....KK...',
  '.KKKKKKKK...',
  '.KGKKKKGK...',
  '.KKWWWWKK...',
  '..KKWWKK..T.',
  '.KKKKKKKK.T.',
  '.KKKKKKKKKT.',
  '.KKKKKKKKT..',
  '.KK.KK.KK...',
]
const CAT_HISS_C = { ...CAT_C, W: '#ffffff' }
const HAMSTER = [
  '.EE...EE.',
  'EHHHHHHHE',
  'HHKHHHKHH',
  'HHHHNHHHH',
  'HWWWWWWWH',
  '.WWWWWWW.',
  '..H...H..',
]
const HAMSTER_C = { E: PINK, H: '#e8a24a', K: INK, N: PINK, W: PAPER }
const BAG = [
  '...KKKKK...',
  '...K...K...',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBYYYBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
]
const BAG_C = { K: INK, B: '#c97bff', Y: GOLD }
const STROLLER = [
  '..PPPPPPPP...',
  '.PPPPPPPPPP..',
  'PP........P..',
  'P.........P..',
  'PPPPPPPPPPPHH',
  '.PPPPPPPPP..H',
  '..PPPPPPP...H',
  '..K.....K....',
  '.KKK...KKK...',
]
const STROLLER_C = { P: '#6fc3ff', H: '#c9c2e6', K: INK }
const LLAMA = [
  '.EE.....',
  '.HHH....',
  'HHKH....',
  '.HHH....',
  '.HHH....',
  '.HHH....',
  '.HHHHHHH',
  '.HRRRRHH',
  '.HHHHHHH',
  '.H.H.H.H',
  '.H.H.H.H',
]
const LLAMA_C = { E: '#e8dcc6', H: '#fff4e2', K: INK, R: '#e23d4e' }
const PLANT = [
  '..L..L..',
  '.LLL.LL.',
  'LL.LLL.L',
  '.L.LL.L.',
  '...LL...',
  '..TTTT..',
  '.TTTTTT.',
  '..TTTT..',
  '..TTTT..',
]
const PLANT_C = { L: '#5fd068', T: '#c9744a' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSYYSSK',
  'KSYYYYSK',
  'KSSYYSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', Y: GOLD, G: '#6b62a8' }

/** a binder: a thick ring folder with a label on the spine side */
function binder(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -182, 300, 380)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380)
  x.fillStyle = '#2fc79a'; x.fillRect(-144, -184, 288, 368)
  x.fillStyle = '#1f8e6e'; x.fillRect(-144, -184, 40, 368)
  x.fillStyle = PAPER; x.fillRect(-80, -130, 200, 120)
  x.fillStyle = INK; x.font = `700 24px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('CAT NAPS', 20, -100); x.fillText('VOL. 3', 20, -60)
  x.fillStyle = '#6b62a8'; for (let i = 0; i < 6; i++) x.fillRect(-150 + 4, 150 - i * 6, 300 - 8, 3)
  x.restore()
}
/** a loyalty card with ten stamps; the stamps fill in */
function loyalty(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-172, -102, 352, 220)
  x.fillStyle = INK; x.fillRect(-180, -110, 360, 220)
  x.fillStyle = PAPER; x.fillRect(-172, -102, 344, 204)
  x.fillStyle = INK; x.font = `700 26px 'Space Mono', monospace`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LOYALTY CARD', 0, -70)
  for (let i = 0; i < 10; i++) {
    const X = -128 + (i % 5) * 64, Y = -14 + Math.floor(i / 5) * 64
    x.strokeStyle = '#9aa5c4'; x.lineWidth = 3; x.beginPath(); x.arc(X, Y, 22, 0, Math.PI * 2); x.stroke()
    if (i < n) { x.fillStyle = i === 9 ? GOLD : '#2fc79a'; x.beginPath(); x.arc(X, Y, 18, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Ran in yelling. | It’s *a hiccup.*', mood: lt => lt > 1.3 ? 'squint' : 'wide', star: { x: -170 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'EMERGENCY!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 50, col: '#ff8f7a', tail: 'bl' })
      const hic = lt > 1.2 && (Math.floor((lt - 1.2) * 2.5) % 2 === 0)
      drawBits(x, DOG, DOG_C, 790, 1020 - (hic ? 14 : 0), 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      if (lt > 1.2) bubble(x, 870, 860, 'hic!', hic ? 1 : 0.85, { size: 40, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Vet said walk more. | *Bought a stroller.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2), dx = 10 * Math.sin(t * 2)
      drawBits(x, STROLLER, STROLLER_C, 790 + dx, 1030, 20 * k)
      drawBits(x, DOG, DOG_C, 770 + dx, 960, 11 * k)
      label(x, 790, 720, 'WALKIES ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Brought one cat. | Gave *four names.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 800, 1030, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const N = ['MOCHI?', 'BEAN?', 'KEVIN?', 'SIR?']
      N.forEach((n, i) => label(x, i % 2 ? 870 : 720, 640 + i * 70, n, pop01(t, P.t0 + 0.5 + i * 0.3, 0.3, 2.2), { size: 32, bg: [GOLD, MINT, PINK, LAV][i], rot: i % 2 ? 0.06 : -0.06 }))
    } },
  { sign: 'cancer', cap: 'Packed the hamster | *an overnight bag.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BAG, BAG_C, 860, 1020, 22 * pop01(t, P.t0 + 0.7, 0.3, 2))
      drawBits(x, HAMSTER, HAMSTER_C, 690, 1060, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'snacks, blanket, | photo of mom.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Waiting-room selfie. | *Take forty.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      const n = Math.min(40, Math.max(1, Math.floor(lt * 20)))
      label(x, 800, 640, `TAKE ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      if (Math.floor(lt * 5) % 3 === 0 && lt > 0.5) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#fff'; x.beginPath(); x.arc(800, 900, 120, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 800, 1120, 'the cat? oh. yes.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Brought a binder | of *the cat’s naps.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      binder(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1140, 'COLOUR-CODED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Said sorry to the cat. | *Eleven times.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAT, CAT_C, 810, 1030, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(11, Math.max(1, Math.floor(lt * 5.5)))
      bubble(x, 760, 680, `sorry! (${n})`, pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 48, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'The cat hissed. | Scorpio *hissed back.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, lt > 0.5 ? CAT_HISS : CAT, lt > 0.5 ? CAT_HISS_C : CAT_C, 820, 1030, 18 * k)
      bubble(x, 870, 800, 'hss', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bc' })
      bubble(x, 600, 680, 'HSSS.', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 60, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Brought their pet. | It’s *a llama.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, LLAMA, LLAMA_C, 330, 960, 30 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 330, 640, 'his name is | doug.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Haggled the bill. | *Got a loyalty card.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      loyalty(x, 320, 880, pop01(t, P.t0 + 0.2, 0.3, 2), Math.min(10, Math.floor(prog(lt, 0.5, 1.6) * 10)))
      label(x, 320, 1090, '10TH VISIT: FREE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Their pet? | *A houseplant.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 800, 990, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 660, 'he seems | sad today.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Pet’s totally fine. | *Pisces is not.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 810, 1030, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'HEALTHY ✓', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: MINT, rot: -0.05 })
      hearts(x, t, 800, 920, P.t0 + 1.1, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0342', key: 'E', accent: SKYB, ending: 'callback',
  title: 'The signs | *at the vet.*',
  cameos: CAMEOS,
  group: { cap: 'Every pet: fine. | *Every owner: not.*' },
  last: {
    text: 'The llama | *got a sticker too.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      drawBits(x, LLAMA, LLAMA_C, 600, 1100, 32 * k)
      if (k > 0.01) signChar(x, t, 'sagittarius', 330, 1180, 260 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 12, hops: [t - lt + 1.3] })
      label(x, 640, 1150, '★ BRAVE', pop01(t, t - lt + 1.1, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.12 })
      sparkles(x, t, 640, 1150, t - lt + 1.2, 6, 140, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
