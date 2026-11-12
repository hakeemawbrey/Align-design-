// r2a0160: star_advice ADVICE ROLLCALL, "Each sign on | *a big birthday.*" (topic: how each sign handles a big
// birthday; ~61 s vertical, signs3kit social cut, music: lofi · G). Twelve signs in zodiac order; one warm line each:
//   ♈ another year braver · ♉ big cake energy, deserved · ♊ two parties, both yours · ♋ let people take care of you
//   · ♌ the main event, balloons spell your name · ♍ a smudged plan is still perfect · ♎ you’re the guest today
//   · ♏ small and close counts as big · ♐ new year, new map · ♑ look how far you’ve climbed · ♒ celebrate your weird
//   way (a party on the moon) · ♓ happy tears are still happy
//  49.2   "Older. | *Even more you.*"  group photo
//  52.4   LESSON UNLOCKED: "Every year of you | *is worth a party.*"  STATUS: CELEBRATED
//  58.3   "Make a wish. | *Then eat the cake.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CORAL = '#ff9e7a', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e'
const ST = { x: -170 }

const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPYP..', '.PPPPPPP.', 'YYYYYYYYY']
const CAKE = [
  '..F...F...F..',
  '..C...C...C..',
  '..C...C...C..',
  'PPPPPPPPPPPPP',
  'WPWWPWWWPWWPW',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  'WWWWWWWWWWWWW',
  'BBBBBBBBBBBBB',
  '.DDDDDDDDDDD.',
]
const CAKE_C = { F: ORANGE, C: SKYB, P: PINK, W: BONE, B: '#c98f5a', D: '#d8dbe8' }
const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GGGGRGGGG', 'RRRRRRRRR', 'GGGGRGGGG', 'GGGGRGGGG', 'GGGGRGGGG']
const BALLOON = ['.BBB.', 'BBBBB', 'BWBBB', 'BBBBB', '.BBB.', '..B..']
const PLANET = ['....PPPP....', '..PPPPPPPP..', 'RRPPPPPPPPRR', '.RRRRRRRRRR.', '..PPPPPPPP..', '....PPPP....']

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: 'aries', cap: 'Another year braver. | *Celebrate it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { Y: GOLD, P: RED }, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 800, 'LEVEL UP', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 56, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 800, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: 'taurus', cap: 'Big cake energy. | *You deserve it.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 850, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 1080, 'THE WHOLE THING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two parties? | *Both can be yours.*', mood: 'wink', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 720, 'PARTY 1: LOUD', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 900, 'PARTY 2: COZY', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 38, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1070, 'GOING TO BOTH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Today, let people | *take care of you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GIFT, { G: MINT, R: RED }, 820, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 1100, 'YOUR TURN', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 820, 760, P.t0 + 1.2, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'The main event? | *You. Enjoy it.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const cols = [GOLD, PINK, ORANGE]
      ;['L', 'E', 'O'].forEach((ch, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2), bx = 700 + i * 100, by = 760 + Math.sin(t * 2 + i) * 12
        if (k <= 0.01) return
        x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.beginPath(); x.moveTo(bx, by + 80 * k); x.lineTo(800, 1040); x.stroke()
        drawBits(x, BALLOON, { B: cols[i], W: '#fff' }, bx, by, 24 * k)
        txt(x, ch, bx, by - 6, 52 * k, INK, MONO, 700)
      })
      label(x, 800, 1080, 'MAIN EVENT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'The plan smudged? | *Still perfect.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 830, 300, 320, BONE, k, 0.03)) {
        txt(x, 'PARTY PLAN', 0, -125, 30, INK, MONO, 700)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 5; i++) x.fillRect(-110, -70 + i * 40, 220, 14)
        if (lt > 0.8) { x.fillStyle = PINK; x.beginPath(); x.ellipse(30, 10, 70 * clamp((lt - 0.8) * 3), 40 * clamp((lt - 0.8) * 3), 0.3, 0, Math.PI * 2); x.fill() }
        x.restore()
      }
      label(x, 800, 1070, 'FROSTING = FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Stop hosting. | *You’re the guest today.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'is everyone ok?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 900, 'SIT. WE GOT IT.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Small and close | *still counts as big.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['cancer', 'pisces', 'taurus']
      ids.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 680 + i * 120, 990 - (i === 1 ? 40 : 0), 170 * k, { mood: 'heart', look: [-1, 0], seed: 30 + i, glyph: false, tears: id === 'pisces' ? 2 : 0 })
      })
      label(x, 800, 720, 'GUEST LIST: 3', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'New year? | *New map.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (sheet(x, 800, 840, 320, 260, '#e8d8b0', k, -0.04)) {
        x.fillStyle = '#5fbf8f'; x.fillRect(-120, -80, 90, 60); x.fillRect(30, 10, 100, 70); x.fillRect(-60, 40, 60, 50)
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 10)
        x.fillStyle = RED; for (let i = 0; i < n; i++) x.fillRect(-100 + i * 22, -50 + Math.sin(i * 0.9) * 50 + i * 8, 10, 10)
        if (n >= 10) txt(x, '✕', 120, 40, 44, RED)
        x.restore()
      }
      label(x, 800, 1060, 'NEXT STOP: ?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Look how far | *you’ve climbed.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 5; i++) { if (k <= 0.01) break; x.fillStyle = INK; x.fillRect(660 + i * 60 - 4, 1060 - (i + 1) * 60 - 4, 68, (i + 1) * 60 + 8); x.fillStyle = ['#7d86a8', '#9aa5c4', '#b7a6ff', MINT, GOLD][i]; x.fillRect(660 + i * 60, 1060 - (i + 1) * 60, 60, (i + 1) * 60) }
      if (lt > 1.0) { drawBits(x, HAT, { Y: GOLD, P: MINT }, 900, 720, 8); sparkles(x, t, 900, 720, P.t0 + 1.0, 6, 110, 0.4) }
      label(x, 760, 620, 'YEAR BY YEAR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Celebrate it | *your weird way.*', mood: 'wink', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANET, { P: '#8fe3d0', R: GOLD }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.12 })
      drawBits(x, HAT, { Y: GOLD, P: PINK }, 800, 760, 10 * pop01(t, P.t0 + 0.7, 0.3, 2))
      label(x, 800, 1060, 'PARTY: OFF-WORLD', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Happy tears | *are still happy.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, GIFT, { G: LAV, R: PINK }, 820, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 660, 'you guys!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0160', key: 'G', accent: CORAL, ending: 'lesson',
  title: 'Each sign on | *a big birthday.*',
  cameos: CAMEOS,
  group: { cap: 'Older. | *Even more you.*' },
  lesson: { text: 'Every year of you | *is worth a party.*', chip: 'STATUS: CELEBRATED' },
  last: {
    text: 'Make a wish. | *Then eat the cake.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CAKE, CAKE_C, 540, 720, 20 * pop01(t, t0 + 0.6, 0.4, 2))
      sparkles(x, t, 540, 680, t0 + 1.2, 8, 180, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
