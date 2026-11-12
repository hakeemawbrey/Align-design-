// r2t0077: star_talk ROLLCALL, "The signs at | a kid's party." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order at a five-year-old's birthday party, each the most extreme version of itself:
//   ♈ won musical chairs, against the kids · ♉ here for the cake, slice four · ♊ the clown, then the magician
//   · ♋ packed wipes for every child · ♌ blew out the kid's candles · ♍ cut the cake into exact squares
//   · ♎ forty photos for their profile · ♏ shook every gift, knows what's inside · ♐ hasn't left the bouncy castle
//   · ♑ ran the party like a meeting · ♒ read the kid's birth chart · ♓ cried at the birthday wish
//  49.2   "Best party ever. | *Kid’s asleep.*"  group photo
//  52.6   CALLBACK: "Party’s over. | Taurus? *Slice nine.*"  Taurus and the cake, still going.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const BALLOON = '#ff6f91', RED = '#e23d4e', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const ST = { x: -170 }

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

// ── props
const CAKE = [
  '..F..F..F..',
  '..W..W..W..',
  '..W..W..W..',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  'BPBPBPBPBPB',
  'BBBBBBBBBBB',
  'PPPPPPPPPPP',
  'BBBBBBBBBBB',
  '.GGGGGGGGG.',
]
const CAKE_C = { F: ORANGE, W: '#fff4e2', P: PINK, B: '#fff4e2', G: GOLD }
const CAKE_OUT = CAKE.map((r, i) => i === 0 ? '...........' : r)
const SLICE = ['P....', 'PPP..', 'BBBB.', 'BPBPB', 'BBBBB', 'GGGGG']
const CHAIR = ['WWW.....', 'W.W.....', 'W.W.....', 'WWWWWWWW', 'WWWWWWWW', 'W......W', 'W......W', 'W......W']
const HAT = ['..KKKKK..', '..KKKKK..', '..KKKKK..', '..RRRRR..', 'KKKKKKKKK']
const GIFT = [
  '...R.R...',
  '....R....',
  'BBBBRBBBB',
  'BBBBRBBBB',
  'RRRRRRRRR',
  'BBBBRBBBB',
  'BBBBRBBBB',
  'BBBBRBBBB',
]
const CAMERA = ['..KKK.....', 'KKKKKKKKKK', 'KWWWWWWWWK', 'KWWKKKWWWK', 'KWKSSSKWWK', 'KWKSSSKWWK', 'KWWKKKWWWK', 'KKKKKKKKKK']
const BALL = ['.BBB.', 'BWBBB', 'BBBBB', 'BBBBB', '.BBB.', '..B..', '..K..', '..K..', '..K..', '..K..']
// a bouncy castle
function castle(x, cx, cy, k, t) {
  if (k <= 0.01) return
  const sq = 1 + 0.04 * Math.sin(t * 9)
  x.save(); x.translate(cx, cy); x.scale(k, k * sq)
  const T = (bx, by, w, h, c) => { x.fillStyle = INK; x.fillRect(bx - 6, by - 6, w + 12, h + 12); x.fillStyle = c; x.fillRect(bx, by, w, h) }
  T(-220, -80, 440, 200, RED)
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? GOLD : SKYB; x.fillRect(-214 + i * 86, -74, 86, 188) }
  T(-240, -200, 80, 320, SKYB); T(160, -200, 80, 320, SKYB)
  T(-250, -230, 100, 40, GOLD); T(150, -230, 100, 40, GOLD)
  x.restore()
}
// a clipboard agenda
function agenda(x, cx, cy, k) {
  if (!card(x, cx, cy, 270, 340, BONE, k, 0.04)) return
  x.fillStyle = BROWN; x.fillRect(-60, -186, 120, 30)
  text(x, 'AGENDA', 0, -120, 32, INK, MONO, 700)
  const rows = ['2:00 cake', '2:07 gifts', '2:15 fun', '2:16 done']
  rows.forEach((r, i) => text(x, r, 0, -60 + i * 52, 26, '#4b3f82', MONO, 700))
  x.restore()
}
function chart(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  const cols = [SKYB, BONE, LAV, '#2a2350']
  for (let i = 0; i < 12; i++) { x.fillStyle = cols[i % 4]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 120, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Won musical chairs. | *Against the kids.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170, y: -40 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      drawBits(x, CHAIR, { W: BROWN }, 370, 1070, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 760, '1ST PLACE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 980, 'not fair!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Here for the cake. | *Only* the cake.', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 3)
      label(x, 790, 650, `SLICE ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Was the clown. | *Then the magician.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P, F) {
      const swap = lt > 1.2
      if (!swap) { x.fillStyle = INK; x.beginPath(); x.arc(F.x, F.cy + 10, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = RED; x.beginPath(); x.arc(F.x, F.cy + 10, 24, 0, Math.PI * 2); x.fill() }
      else drawBits(x, HAT, { K: '#2a2350', R: RED }, F.x, F.top - 30, 14)
      bubble(x, 790, 780, swap ? 'ta-da!' : 'honk honk', pop01(t, P.t0 + (swap ? 1.2 : 0.4), 0.25, 2.2), { size: 44, tail: 'bl' })
      if (swap) sparkles(x, t, F.x, F.top, P.t0 + 1.2 * 1.29, 7, 120, 0.3)
    } },
  { sign: 'cancer', cap: 'Packed wipes | for *every single child.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (card(x, 790, 890, 260, 200, SKYB, k, 0.04)) { x.fillStyle = BONE; x.fillRect(-90, -40, 180, 50); text(x, 'WIPES', 0, -14, 34, INK); x.restore() }
      const n = Math.floor(clamp((lt - 0.4) / 1.4) * 400)
      label(x, 790, 1080, `x ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Blew out | *the kid’s candles.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const out = lt > 1.0
      drawBits(x, out ? CAKE_OUT : CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      if (out) { x.save(); x.globalAlpha = 0.6; x.fillStyle = '#c9c9d8'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.beginPath(); x.arc(735 + i * 55, 760 - ph * 110, 14 + ph * 14, 0, Math.PI * 2); x.fill() } x.restore() }
      bubble(x, 790, 610, 'hey!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 44, col: LAV, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Cut the cake | into *exact squares.*', mood: 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (card(x, 790, 900, 280, 280, '#fff4e2', k)) {
        const cut = clamp((lt - 0.4) / 1.2)
        x.fillStyle = PINK; x.fillRect(-140, -140, 280, 40)
        x.fillStyle = INK; for (let i = 1; i < 4; i++) { x.fillRect(-140 + i * 70 - 2, -140, 4, 280 * cut); x.fillRect(-140, -140 + i * 70 - 2, 280 * cut, 4) }
        x.restore()
      }
      label(x, 790, 1120, '7.0 CM EACH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Forty party photos. | *For their profile.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAMERA, { K: '#2a2350', W: '#c9c9d8', S: SKYB }, 790, 880, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 39)
      label(x, 790, 650, `PHOTO ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1080, 'NEW PROFILE PIC', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (Math.floor(lt * 4) % 3 === 0 && lt > 0.4) { x.save(); x.globalAlpha = 0.25; x.fillStyle = '#fff'; x.fillRect(130, 490, 820, 720); x.restore() }
    } },
  { sign: 'scorpio', cap: 'Shook every gift. | *Knows what’s inside.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt < 1.2 ? Math.sin(t * 40) * 0.12 : 0
      drawBits(x, GIFT, { B: MINT, R: RED }, 790, 920, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: shake })
      bubble(x, 790, 650, 'it’s a robot.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Bouncy castle. | Still *hasn’t left.*', mood: 'sparkle', look: [0, 0], star: { x: 0, y: -90, s: 240 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9, 2.3],
    back(x, t, lt, P) { castle(x, 540, 1040, pop01(t, P.t0 + 0.05, 0.3, 2), t) },
    front(x, t, lt, P) {
      const h = 1 + Math.floor(clamp((lt - 0.5) / 1.3) * 2)
      label(x, 820, 620, `HOUR ${h}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Ran the party | *like a meeting.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      agenda(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 380, 600, 'any questions?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Read the kid’s | *birth chart.* Age five.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, t, 790, 820, pop01(t, P.t0 + 0.15, 0.35, 2))
      label(x, 790, 1080, 'FUTURE: VISIONARY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at | *the birthday wish.*', mood: 'sparkle', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BALL, { B: [BALLOON, GOLD, SKYB][i], W: '#fff', K: BONE }, 700 + i * 90, 820 - (i % 2) * 50 + Math.sin(t * 2 + i) * 10, 14 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2))
      bubble(x, 790, 1080, 'so beautiful', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0077', key: 'E', accent: BALLOON, ending: 'callback',
  title: 'The signs at | *a kid’s party.*',
  cameos: CAMEOS,
  group: { cap: 'Best party ever. | *Kid’s asleep.*' },
  last: {
    text: 'Party’s over. | Taurus? *Slice nine.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 1080, 280 * k, { mood: 'heart', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      drawBits(x, SLICE, { P: PINK, B: '#fff4e2', G: GOLD }, 720, 1100, 36 * pop01(t, t - lt + 0.8, 0.35, 2))
      label(x, 720, 900, 'SLICE 9', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 44, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
