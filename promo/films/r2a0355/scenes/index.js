// r2a0355: star_advice, ADVICE ROLL CALL (twelve signs), "What your sign | *needs on Sunday.*" (~54 s vertical,
// signs3kit social cut, music: lofi · G). One warm, specific Sunday need per sign with a light visual gag. Ending: group.
//   0.0–3.6    "What your sign | *needs on Sunday.*"
//   3.6–49.2   twelve cards: Aries, a long run then a nap · Taurus, a slow brunch, no alarms · Gemini, one good chat, then
//              quiet · Cancer, soup and a blanket · Leo, a little pampering · Virgo, permission not to clean · Libra,
//              something pretty · Scorpio, alone time, no explaining · Sagittarius, somewhere new, even nearby
//              · Capricorn, a real day off · Aquarius, a rabbit-hole documentary · Pisces, a sad film and a good cry
//  49.2        GROUP (the ending): "Rest looks different | *for everyone.*"  everyone in their pyjamas, a Sunday sun.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', PAPER = '#fff4e2'
const L = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 30, font: MONO, weight: 700, ...o })

// ── props
const SHOE = [
  '......RRR.',
  '....RRRRR.',
  '..RRRWRRRR',
  'RRRRRRRRRR',
  'WWWWWWWWWW',
]
const PANCAKES = [
  '....B....',
  '...BBB...',
  '.PPPPPPP.',
  'PPPPPPPPP',
  '.PPPPPPP.',
  'PPPPPPPPP',
  '.PPPPPPP.',
  'SSSSSSSSS',
]
const PANCAKES_C = { B: '#ffd23a', P: '#e8a24a', S: '#d8dbe8' }
const CLOCKX = (x, cx, cy, r, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#ff4f2e'; x.lineWidth = 12; x.beginPath(); x.moveTo(-r * 0.7, -r * 0.7); x.lineTo(r * 0.7, r * 0.7); x.moveTo(r * 0.7, -r * 0.7); x.lineTo(-r * 0.7, r * 0.7); x.stroke()
  x.restore()
}
const PHONE = ['KKKKKKKKK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KSSSSSSSK', 'KKKKWKKKK']
const SOUP = [
  '..W...W...W..',
  '...W...W...W.',
  '..W...W...W..',
  'OOOOOOOOOOOOO',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
  '....BBBBB....',
]
const SOUP_C = { W: '#d8dbe8', O: '#ffb34a', B: '#6fc3ff' }
const BLANKET = ['LLLLLLLLLLLLLLLL', 'LPLLPLLPLLPLLPLL', 'LLLLLLLLLLLLLLLL', 'LLPLLPLLPLLPLLPL', 'LLLLLLLLLLLLLLLL']
const BLANKET_C = { L: '#c97bff', P: '#e8b0ff' }
const MASK = ['.MMMMMMMMM.', 'MMMMMMMMMMM', 'MCCMMMMMCCM', 'MCCMMMMMCCM', 'MMMMMMMMMMM', '.MMMMMMMMM.']
const MASK_C = { M: '#7dffb0', C: '#ffffff' }
const MOP = ['.....H', '....H.', '...H..', '..H...', '.H....', 'SSS...', 'SSSS..', 'SSSS..']
const FLOWERS = [
  '.P...Y...R.',
  'PWP.YWY.RWR',
  '.P...Y...R.',
  '..G..G..G..',
  '...G.G.G...',
  '....GGG....',
  '...VVVVV...',
  '...VVVVV...',
  '....VVV....',
]
const FLOWERS_C = { P: '#ff8fb1', Y: '#ffd23a', R: '#ff6b5a', W: '#ffffff', G: '#5fd068', V: '#6fc3ff' }
const DOORSIGN = (x, cx, cy, k) => label(x, cx, cy, 'DO NOT DISTURB', k, { size: 32, bg: '#c97bff', rot: -0.05, font: MONO, weight: 700 })
const BIKE = [
  '.......HH....',
  '..K...KK.....',
  '...KKKKKK....',
  '..KK.K..KK...',
  '.WWW.K..WWW..',
  'W...WK.W...W.',
  'W.K.W..W.K.W.',
  'W...W..W...W.',
  '.WWW....WWW..',
]
const BIKE_C = { K: '#ff9a4a', W: '#9aa5c4', H: '#c98a4e' }
const HAMMOCK = (x, t, cx, cy, k) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#c98a4e'; x.fillRect(-180, -150, 20, 240); x.fillRect(160, -150, 20, 240)
  x.strokeStyle = MINT; x.lineWidth = 14; x.beginPath(); x.moveTo(-160, -100); x.quadraticCurveTo(0, 60 + 8 * Math.sin(t * 2), 160, -100); x.stroke()
  x.restore()
}
const TV = [
  'GGGGGGGGGGGGGGG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GSSSSSSSSSSSSSG',
  'GGGGGGGGGGGGGGG',
  '..G.........G..',
]
const TV_C = { G: '#6b62a8', S: '#2a2350' }
const OCTO = ['..PPPP..', '.PPPPPP.', 'PPWPPWPP', 'PPPPPPPP', '.PPPPPP.', 'P.P..P.P', 'P.P..P.P']
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BPBBBBPB', 'BBBBBBBB', 'BPBBBBPB']
const TISSUE_C = { W: '#ffffff', B: '#8fe3ff', P: '#ff8fb1' }
const SUN = ['...Y..Y...', 'Y..YYYY..Y', '.YYYYYYYY.', '.YYYYYYYY.', 'YYYYYYYYYY', '.YYYYYYYY.', '.YYYYYYYY.', 'Y..YYYY..Y', '...Y..Y...']

const S = (sign, o) => ({ sign, star: { x: -170 }, look: [1, 0], ...o })
const CAMEOS = [
  S('aries', { cap: 'A long run. | *Then a big nap.*', mood: lt => lt < 1.2 ? 'sparkle' : 'sleepy', hops: [0.4, 0.8],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: '#ff6b5a', W: PAPER }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, lt < 1.2 ? '10K: DONE' : 'NAP: 3 HOURS', pop01(t, P.t0 + 0.5, 0.3, 2), { bg: lt < 1.2 ? '#ff6b5a' : LAV, size: 34 })
    } }),
  S('taurus', { cap: 'A slow brunch. | *No alarms.*', mood: 'heart',
    front(x, t, lt, P) {
      drawBits(x, PANCAKES, PANCAKES_C, 760, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      CLOCKX(x, 880, 720, 70, pop01(t, P.t0 + 1.0, 0.3, 2.2))
    } }),
  S('gemini', { cap: 'One good chat. | *Then phone off.*', mood: lt => lt < 1.3 ? 'sparkle' : 'sleepy',
    front(x, t, lt, P) {
      const off = lt > 1.3
      drawBits(x, PHONE, { K: '#2a2350', S: off ? '#2a2350' : '#8fe3ff', W: '#9aa5c4' }, 790, 920, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (!off) bubble(x, 790, 680, 'okay ONE more | story', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      else L(x, 790, 680, 'SILENT MODE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: MINT, size: 32 })
    } }),
  S('cancer', { cap: 'Soup. A blanket. | *Nowhere to be.*', mood: 'heart',
    back(x, t, lt, P) { drawBits(x, BLANKET, BLANKET_C, 500, 1000, 22 * pop01(t, P.t0 + 0.6, 0.3, 2)) },
    front(x, t, lt, P) { drawBits(x, SOUP, SOUP_C, 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2)) } }),
  S('leo', { cap: 'A little pampering. | *You earned it.*', mood: 'sleepy',
    front(x, t, lt, P, F) {
      drawBits(x, MASK, MASK_C, 370, 820, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { alpha: 0.9 })
      L(x, 790, 760, 'SPA DAY: AT HOME', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: GOLD, size: 32 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 8, 140, 0.3)
    } }),
  S('virgo', { cap: 'Permission | *not to clean.*', mood: lt => lt < 1.2 ? 'squint' : 'happy',
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MOP, { H: '#c98a4e', S: '#d8dbe8' }, 790, 900, 22 * k, { rot: lt > 1.2 ? 0.8 * ease.outCubic(prog(lt, 1.2, 1.6)) : 0 })
      L(x, 790, 680, 'MOP: ON BREAK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: MINT, size: 34 })
    } }),
  S('libra', { cap: 'Something pretty. | *Flowers. Music.*', mood: 'heart',
    front(x, t, lt, P) {
      drawBits(x, FLOWERS, FLOWERS_C, 790, 930, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 800, 760, { n: 3, cell: 8, col: PINK, alpha: pop01(t, P.t0 + 0.8, 0.3, 2), seed: 3 })
    } }),
  S('scorpio', { cap: 'Alone time. | *No explaining.*', mood: 'sleepy',
    front(x, t, lt, P) {
      DOORSIGN(x, 790, 860, pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1000, '(LOVE YOU THO)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: BONE, size: 28 })
    } }),
  S('sagittarius', { cap: 'Somewhere new. | *Even nearby.*', mood: 'sparkle', hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, BIKE, BIKE_C, lerp(720, 840, ease.inOutCubic(prog(lt, 0.2, 2.0))), 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 700, 'NEW PARK, 2 STREETS AWAY', pop01(t, P.t0 + 1.1, 0.3, 2.2), { bg: '#ff9a4a', size: 26 })
    } }),
  S('capricorn', { cap: 'A day off. | *A real one.*', mood: 'sleepy', star: { x: -170, y: -40 },
    back(x, t, lt, P) { HAMMOCK(x, t, 760, 960, pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) { L(x, 800, 680, 'EMAIL: CLOSED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: MINT, size: 34 }) } }),
  S('aquarius', { cap: 'A documentary | *rabbit hole.*', mood: lt => lt < 1.2 ? 'sparkle' : 'wide',
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, TV, TV_C, 790, 880, 20 * k)
      if (k > 0.9) drawBits(x, OCTO, { P: '#ff8fb1', W: '#ffffff' }, 790, 860, 10)
      L(x, 790, 1100, 'EPISODE 7: OCTOPUSES', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: SKYB, size: 26 })
    } }),
  S('pisces', { cap: 'A sad film. | *A good cry.*', mood: 'heart', tears: 3,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, TISSUE, TISSUE_C, 800 + (i % 2 ? 12 : -12), 1080 - i * 70, 13 * pop01(t, P.t0 + 0.3 + i * 0.3, 0.2, 2))
      L(x, 800, 700, 'FEELING: BETTER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: PINK, size: 32 })
    } }),
]

const F = makeFilm({
  id: 'r2a0355', key: 'G', accent: ACC, ending: 'group',
  title: 'What your sign | *needs on Sunday.*',
  cameos: CAMEOS,
  group: {
    cap: 'Rest looks different | *for everyone.*', moods: Array(12).fill('sleepy'),
    draw(x, t, lt) {
      drawBits(x, SUN, { Y: GOLD }, 540, 760, 16 * pop01(t, t - lt + 1.2, 0.4, 2), { rot: t * 0.2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
