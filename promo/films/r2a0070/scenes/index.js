// r2a0070: star_advice, ADVICE ROLL CALL, "Each sign's | way to unwind." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific way to unwind each, with a light visual gag. Ending: lesson.
//   0.0–3.6    "Each sign’s | *way to unwind.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one way per sign (3.8 s each):
//              ♈ a hard run, then a real nap · ♉ a long bath, do not disturb · ♊ two podcasts at once · ♋ cooking
//              for one, enough for six · ♌ dancing alone, full choreography · ♍ organising one drawer, pure peace
//              · ♎ straightening the picture frame (ROOM: BALANCED) · ♏ lights off, a mystery novel · ♐ a drive
//              to anywhere (ROUTE: VIBES) · ♑ a 1,000-piece puzzle, tonight · ♒ stargazing, naming the stars
//              · ♓ rain sounds, happy-crying anyway
//  49.2        "Twelve ways | *to exhale.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Rest isn’t lazy. | *It’s refuelling.*"  STATUS: UNWOUND
//  58.3        "Your turn. | *Do nothing, nicely.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', DUSK = '#b9a6ff'

// ── props
const SHOE = ['....RRRR', '..RRRRRR', 'RRRRRWRR', 'RRRRRRRR', 'WWWWWWWW']
const TUB = [
  '.B..B.B..B..B.',
  'B.BB.BB.BB.B..',
  'WWWWWWWWWWWWWW',
  'WSSSSSSSSSSSSW',
  'WSSSSSSSSSSSSW',
  '.WWWWWWWWWWWW.',
  '.K..........K.',
]
const TUB_C = { B: CREAM, W: '#e8e4f0', S: SKYB, K: INK }
const HEADPHONES = [
  '..HHHHHHHH..',
  '.H........H.',
  'H..........H',
  'H..........H',
  'PP........PP',
  'PP........PP',
  'PP........PP',
]
const POT = [
  '..s...s...s.',
  '.s...s...s..',
  'KKKKKKKKKKKK',
  'PPPPPPPPPPPP',
  'KPPPPPPPPPPK',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  '..PPPPPPPP..',
]
const POT_C = { s: 'rgba(239,230,214,0.7)', K: INK, P: '#e23d4e' }
const BOOK = [
  'BBBBBBBBBBBB',
  'BWWWWWBWWWWW',
  'BWKKKWBWKKKW',
  'BWWWWWBWWWWW',
  'BWKKWWBWKKKW',
  'BWWWWWBWWWWW',
  'BBBBBBBBBBBB',
]
const BOOK_C = { B: '#6b2a8a', W: CREAM, K: '#b9b0a0' }
const TELESCOPE = [
  '..........TT',
  '........TTTT',
  '......TTTT..',
  '....TTTT....',
  '..TTTT......',
  '...LL.......',
  '..L..L......',
  '.L....L.....',
]
const TELESCOPE_C = { T: '#9aa5c4', L: '#c98f2a' }
const CLOUD = [
  '....GGGG......',
  '..GGGGGGGG.GG.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
]

function drawer(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -90, 340, 180); x.fillStyle = '#c98f2a'; x.fillRect(-162, -82, 324, 164)
  x.fillStyle = '#3a2a10'; x.fillRect(-150, -70, 300, 140)
  const COLS = [RED, GOLD, MINT, SKYB, PINK, LAV]
  const neat = ease.inOutCubic(prog(lt, 0.4, 1.2))
  for (let i = 0; i < 6; i++) {
    const nx = -125 + i * 50, ny = -10
    const mx = -100 + ((i * 97) % 200), my = -40 + ((i * 53) % 80)
    x.save(); x.translate(mx + (nx - mx) * neat, my + (ny - my) * neat); x.rotate((1 - neat) * (i - 2.5) * 0.4)
    x.fillStyle = INK; x.fillRect(-16, -50, 32, 100); x.fillStyle = COLS[i]; x.fillRect(-12, -46, 24, 92)
    x.restore()
  }
  x.restore()
}
function frame(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.35 * (1 - ease.outBack(prog(lt, 0.6, 1.1)))
  x.save(); x.translate(cx, cy); x.rotate(tilt); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -110, 280, 220); x.fillStyle = GOLD; x.fillRect(-132, -102, 264, 204)
  x.fillStyle = '#2a3d6a'; x.fillRect(-112, -82, 224, 164)
  x.fillStyle = '#5fd068'; x.beginPath(); x.moveTo(-112, 82); x.lineTo(-40, -10); x.lineTo(20, 50); x.lineTo(70, 0); x.lineTo(112, 82); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(60, -40, 20, 0, Math.PI * 2); x.fill()
  x.restore()
}
function mapPin(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#c8f0c0'; x.fillRect(-162, -112, 324, 224)
  x.strokeStyle = GOLD; x.lineWidth = 10; x.setLineDash([18, 14]); x.beginPath(); x.moveTo(-140, 90); x.bezierCurveTo(-60, -80, 20, 120, 120, -60); x.stroke(); x.setLineDash([])
  x.fillStyle = INK; x.beginPath(); x.arc(120, -76, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(120, -76, 22, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 120, -74)
  x.restore()
}
function puzzle(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const COLS = ['#ff9a4a', '#6fc3ff', '#5fd068', GOLD, PINK, LAV, '#9aa5c4', MINT, SKYB]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) {
    const r = Math.floor(i / 3), c = i % 3, placed = lt > 0.3 + i * 0.13
    const px = (c - 1) * 92 + (placed ? 0 : (i % 2 ? 160 : -160)), py = (r - 1) * 92 + (placed ? 0 : 60)
    x.fillStyle = INK; x.fillRect(px - 46, py - 46, 92, 92); x.fillStyle = COLS[i]; x.fillRect(px - 42, py - 42, 84, 84)
    x.fillStyle = COLS[i]; x.beginPath(); x.arc(px + 42, py, 14, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
function rain(x, t, l, tp, w, h, a) {
  if (a <= 0.01) return
  x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip(); x.globalAlpha = a
  x.strokeStyle = 'rgba(143,227,255,0.6)'; x.lineWidth = 5; x.lineCap = 'round'
  for (let i = 0; i < 14; i++) { const rx = l + ((i * 61) % w), ry = tp + (((i * 47) + t * 420) % (h + 60)) - 30; x.beginPath(); x.moveTo(rx, ry); x.lineTo(rx - 6, ry + 30); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'A hard run. | *Then a real nap.*', mood: lt => lt > 1.2 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [0.3, 0.5, 0.7],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { R: RED, W: CREAM }, 760, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.1 * Math.sin(t * 14) : 0 })
      if (lt > 1.2) { x.save(); x.fillStyle = BONE; x.font = `800 60px ${INTER}`; x.globalAlpha = 0.6 + 0.4 * Math.sin(t * 3); x.fillText('z', 820, 760); x.font = `800 44px ${INTER}`; x.fillText('z', 880, 700); x.restore() }
      label(x, 790, 1120, 'RECOVERY: EARNED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'A long bath. | *Phone in another room.*', mood: 'sleepy', look: [1, 0], star: { x: -60, y: 20, s: 240 },
    front(x, t, lt, P, F) {
      drawBits(x, TUB, TUB_C, 540, 1040, 32 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'A podcast. | *Two podcasts. At once.*', mood: 'sparkle', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -220 },
    back(x, t, lt, P, F) {
      drawBits(x, HEADPHONES, { H: '#9aa5c4', P: PINK }, F.x, F.cy - 20, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P, F) {
      bubble(x, 780, 700, 'and that’s | why bees…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: GOLD, tail: 'bl' })
      bubble(x, 800, 950, '…the Roman | empire was', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, col: SKYB, tail: 'bl' })
      label(x, 790, 1150, 'SPEED: 2×', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cooking for one. | *Enough for six.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, POT, POT_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1120, 'LEFTOVERS: ALL WEEK', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Dancing alone. | *Full choreography.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.5, 0.9, 1.3, 1.7], squash: lt => 0.06 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      notes(x, t, 790, 1050, { n: 6, cell: 13, col: GOLD, alpha: pop01(t, P.t0 + 0.3, 0.3, 2) })
      label(x, 790, 640, 'ENCORE (SELF-REQUESTED)', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 340, 880, P.t0 + 1.0, 8, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Organising one drawer. | *Pure peace.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawer(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'HEART RATE: CALM', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Straightening one frame. | *Ahh. Balance.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      frame(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1110, 'ROOM: BALANCED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.1, 8, 170, 0.3)
    } },
  { sign: 'scorpio', cap: 'Lights off. | *A mystery novel.*', mood: 'squint', look: [1, 1], star: { x: -220 },
    back(x, t, lt, P) { x.save(); x.fillStyle = `rgba(5,4,12,${(0.45 * clamp(lt * 2)).toFixed(3)})`; x.fillRect(120, 480, 840, 740); x.restore() },
    front(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.35; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(700, 560); x.lineTo(620, 900); x.lineTo(960, 900); x.closePath(); x.fill(); x.restore()
      drawBits(x, BOOK, BOOK_C, 790, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      label(x, 790, 1120, 'CHAPTER 40 BY 2 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: '#c97bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'A drive to | *anywhere.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8],
    front(x, t, lt, P) {
      mapPin(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'ROUTE: VIBES', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: '#ff9a4a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A 1,000-piece puzzle. | *Tonight.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      puzzle(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1130, '9 DOWN. 991 TO GO.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Stargazing. | *Naming the stars.*', mood: 'sparkle', look: [1, -1], star: { x: -220, y: 40 },
    front(x, t, lt, P) {
      drawBits(x, TELESCOPE, TELESCOPE_C, 700, 950, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 860, 640, P.t0 + 0.7, 6, 60, 0.3, [GOLD, CREAM])
      label(x, 820, 740, 'THAT ONE’S “GARY”', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 28, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'STARS NAMED: 48', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Rain sounds. | *Happy-crying anyway.*', mood: 'heart', tears: 2, star: { x: -200 },
    back(x, t, lt, P) { rain(x, t, 120, 480, 840, 740, clamp(lt * 2)) },
    front(x, t, lt, P) {
      drawBits(x, CLOUD, { G: '#7a7f99' }, 790, 700 + Math.sin(t * 2) * 6, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'VIBE: SOFT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 1.2, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0070', key: 'G', accent: DUSK, ending: 'lesson',
  title: 'Each sign’s | *way to unwind.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to exhale.*' },
  lesson: { text: 'Rest isn’t lazy. | *It’s refuelling.*', chip: 'STATUS: UNWOUND' },
  last: { text: 'Your turn. | *Do nothing, nicely.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
