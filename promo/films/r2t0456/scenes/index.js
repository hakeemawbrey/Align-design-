// r2t0456: star_talk, SOLO (sagittarius), "Sag birthdays | *be like.*" (signs3kit social cut, music: lofi · C).
// Ending: callback (the birthday horse comes back: "The party ended. | The horse stayed.").
//   skipped their own party (boarding) · opened your gift, honestly hated it · birthday "walk": a mountain · forgot it was
//   their birthday · read the birthday chart, packed immediately · invited ten, two hundred came · showed up on a horse
//   · one candle blown, a speech on life · woke up a year older, booked a gap year.
//   group "Another year. | Another country."   last "The party ended. | The horse stayed."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff9a4a', CREAM = '#fff4e2', RED = '#e23d4e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

// ── props
const PLANE = [
  '.........KK.......',
  '.........KWK......',
  'K........KWWK.....',
  'KK.......KWWWK....',
  'KWKKKKKKKKWWWWKKK.',
  'KWWWWWWWWWWWWWWWWK',
  'KWBWBWBWBWBWWWWWSK',
  '.KWWWWWWWWWWWWWWK.',
  '..KKKKKKKWWWWKKK..',
  '.........KWWK.....',
  '.........KWK......',
  '.........KK.......',
]
const PLANE_C = { K: INK, W: CREAM, B: SKYB, S: ACC }
const GIFT = [
  '...RR...RR...',
  '....RR.RR....',
  '.....RRR.....',
  'PPPPPPRPPPPPP',
  'PPPPPPRPPPPPP',
  '.MMMMMRMMMMM.',
  '.MMMMMRMMMMM.',
  '.MMMMMRMMMMM.',
  '.MMMMMRMMMMM.',
  '.MMMMMRMMMMM.',
]
const GIFT_C = { R: GOLD, P: PINK, M: '#ff6fa3' }
const MOUNT = [
  '.........WW.........',
  '........WWWW........',
  '.......WWGGWW.......',
  '......GGGGGGGG......',
  '.....GGGGGGGGGG.....',
  '....GGGGDGGGGGGG....',
  '...GGGDDDGGGGDGGG...',
  '..GGGDDDDDGGDDDGGG..',
  '.GGGDDDDDDDDDDDDGGG.',
  'GGGDDDDDDDDDDDDDDGGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7f8fb8', D: '#5a678f' }
const HORSE = [
  '..........KK..',
  '.........KHHK.',
  '........KHHHHK',
  '.......KHHKHHK',
  'MM....KHHHHHK.',
  'MMMKKKHHHHKK..',
  '.MHHHHHHHHK...',
  '..HHHHHHHHK...',
  '..HHHHHHHHK...',
  '..H.H..H.H....',
  '..H.H..H.H....',
  '..K.K..K.K....',
]
const HORSE_C = { K: INK, H: '#c98f5a', M: '#6b3d22' }
const HAT = ['....Y....', '...PPP...', '..PYPYP..', '.PPPPPPP.', 'PYPYPYPYP']
const HAT_C = { Y: GOLD, P: SKYB }
const CAKE = ['......F......', '......C......', '..PPPPPPPPP..', '..PWPWPWPWP..', '.BBBBBBBBBBB.', '.BBBBBBBBBBB.', 'PPPPPPPPPPPPP', 'KKKKKKKKKKKKK']
const CAKE_C = { F: '#ffb34a', C: CREAM, P: PINK, W: CREAM, B: '#c98f5a', K: '#8a4a2e' }
const GLOBE = ['...KKKKK...', '.KKSSGSSKK.', 'KSSGGGSSSSK', 'KSGGGGSSGSK', 'KSSGGSSGGGK', 'KSSSSSSGGSK', 'KSGSSSSSGSK', '.KKSSSSSKK.', '...KKKKK...', '.....K.....', '...KKKKK...']
const GLOBE_C = { K: INK, S: SKYB, G: '#5fd068' }

/** a calendar page */
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  const W = 300, H = 300
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = CREAM; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = RED; x.fillRect(-W / 2, -H / 2, W, 70)
  x.fillStyle = CREAM; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('DEC', 0, -H / 2 + 37)
  x.fillStyle = INK; x.font = `800 130px ${INTER}`; x.fillText('12', 0, 40)
  const c = ease.outCubic(prog(lt, 0.7, 1.0))
  if (c > 0) { x.strokeStyle = PINK; x.lineWidth = 10; x.beginPath(); x.arc(0, 40, 105 * c + 1, 0, Math.PI * 2 * c); x.stroke() }
  x.restore()
}
/** a paper sheet with a coloured header and rows */
function sheet(x, cx, cy, k, { w = 330, h = 330, head = '', headCol = SLATE, rows = [], rot = 0.04, size = 30 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => {
    if (kk <= 0.01) return
    x.save(); x.globalAlpha *= clamp(kk); x.fillStyle = col || INK; x.font = `700 ${size}px ${MONO}`
    x.fillText(txt, -w / 2 + 22, -h / 2 + (head ? 60 : 0) + 44 + i * (size + 18)); x.restore()
  })
  x.restore()
}

const S = 'sagittarius', ST = { x: -170 }
const CAMEOS = [
  // 1 · skipped their own party
  { sign: S, cap: 'Skipped their own party. | Was *on a plane.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PLANE, PLANE_C, 760 + lt * 25, 820 - lt * 40, 16 * k, { rot: -0.18 })
      L(x, 790, 1080, 'PARTY: NO-SHOW', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  // 2 · opened your gift
  { sign: S, cap: 'Opened your gift. | *Honestly* hated it.', mood: lt => lt > 1.1 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, GIFT_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 670, 'you want | the truth?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1160, 'TACT: 0%', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.05, 40)
    } },
  // 3 · the birthday "walk"
  { sign: S, cap: 'A little birthday walk. | *Up a mountain.*', mood: 'sparkle', look: [1, -1], star: { x: -190, y: 40 }, hops: [0.9, 1.5],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, HAT, HAT_C, 790, 772, 14 * pop01(t, P.t0 + 0.9, 0.3, 2.4))
      L(x, 790, 1130, 'MILE 14', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 40)
    } },
  // 4 · forgot it was their birthday
  { sign: S, cap: 'Forgot it was | *their own birthday.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 600, 'wait… me?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  // 5 · Align: the birthday chart
  { sign: S, cap: 'Read their birthday chart. | Packed *immediately.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, head: '♐︎ THIS YEAR', headCol: ACC, rows: [
        ['love: lovely', INK, pop01(t, P.t0 + 0.5, 0.2, 2)], ['work: fine', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['TRAVEL: YES!!', RED, pop01(t, P.t0 + 1.0, 0.2, 2)],
      ] })
      L(x, 790, 1100, 'BAG: PACKED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.05, 36)
    } },
  // 6 · invited ten
  { sign: S, cap: 'Invited ten friends. | *Two hundred* came.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const n = Math.min(200, Math.round(10 + 190 * ease.inCubic(prog(lt, 0.4, 1.6))))
      L(x, 790, 680, `GUESTS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, -0.04, 44)
      bubble(x, 790, 930, 'the more | the merrier!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      sparkles(x, t, 790, 680, P.t0 + 1.6, 8, 180, 0.3)
    } },
  // 7 · showed up on a horse
  { sign: S, cap: 'Birthday entrance? | *On a horse.*', mood: 'sparkle', look: [1, 0], star: { x: -190, y: -20 }, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, HORSE, HORSE_C, 800 + Math.sin(t * 6) * 6, 930 + Math.abs(Math.sin(t * 6)) * -8, 26 * k)
      drawBits(x, HAT, HAT_C, 908 + Math.sin(t * 6) * 6, 752 + Math.abs(Math.sin(t * 6)) * -8, 12 * k, { rot: 0.15 })
      L(x, 790, 1150, 'PARKED: LAWN', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 36)
    } },
  // 8 · one candle, a speech on life
  { sign: S, cap: 'Blew out one candle. | Gave *a speech on life.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 700, 'but what IS | a year, really?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  // 9 · a year older, a gap year
  { sign: S, cap: 'A year older. | Booked *a gap year.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, GLOBE_C, 800, 870, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 2) })
      L(x, 790, 1130, 'GAP YEAR: BOOKED', pop01(t, P.t0 + 1.1, 0.3, 2.4), ACC, -0.04, 34)
      sparkles(x, t, 800, 870, P.t0 + 1.2, 8, 200, 0.6)
    } },
]

const F = makeFilm({
  id: 'r2t0456', key: 'C', accent: ACC, solo: S,
  title: 'Sag birthdays | *be like.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Another year. | *Another country.*', mood: 'sparkle' },
  last: {
    text: 'The party ended. | The *horse stayed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, HORSE, HORSE_C, 540, 1120, 28 * k)
      drawBits(x, HAT, HAT_C, 660, 926, 13 * k, { rot: 0.15 })
      label(x, 540, 1440, 'STILL ON THE LAWN', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
