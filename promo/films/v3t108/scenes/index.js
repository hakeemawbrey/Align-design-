// v3t108: THE SIGNS AS… v3, SOLO film, "Things only | Sagittarians get." (~45 s vertical, signs3kit social cut, lofi · E)
// One sign the whole way through: nine situations, each the most extreme (and lovable) Sagittarius. Ending: callback.
//   quit their job via postcard · first date in a hot-air balloon · honest feedback nobody asked for · one plate,
//   nine backpacks · phone at 1%, thriving · fourteen hobbies, a week each · got lost, loved it · laughs at their own
//   joke before the punchline · checked compatibility with the ocean
//  37.8 "Free spirit. | *Big heart.*"  ·  callback: "Sag and the ocean? | *Official now.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e', PURPLE = '#a35cf0', SEA = '#3aa0d8', ORANGE = '#ffb34a', GREEN = '#5fd068'

const BALLOON = [
  '...RRRRR...',
  '..RYRRRYR..',
  '.RRYRRRYRR.',
  'RRRYRRRYRRR',
  'RRRYRRRYRRR',
  '.RRYRRRYRR.',
  '..RRYRYRR..',
  '...RRRRR...',
  '....K.K....',
  '....K.K....',
  '...BBBBB...',
  '...BBBBB...',
]
const BALLOON_C = { R: RED, Y: GOLD, K: INK, B: BROWN }
const PACK = ['..KKKK..', '.K....K.', '.PPPPPP.', 'PPPPPPPP', 'PPPPPPPP', 'PPDDDDPP', 'PPDYDDPP', 'PPDDDDPP', '.PPPPPP.']
const WAVE = ['..WW......WW......WW..', '.WSSW....WSSW....WSSW.', 'WSSSSWWWWSSSSWWWWSSSSW', 'SSSSSSSSSSSSSSSSSSSSSS', 'SSSSSSSSSSSSSSSSSSSSSS']
const WAVE_C = { W: '#fff4e2', S: SEA }

function postcard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-156, -96, 324, 210)
  x.fillStyle = INK; x.fillRect(-166, -110, 332, 220)
  x.fillStyle = '#fff4e2'; x.fillRect(-158, -102, 316, 204)
  x.fillStyle = '#8fe3ff'; x.fillRect(-146, -90, 130, 180); x.fillStyle = '#ffd23a'; x.beginPath(); x.arc(-80, -40, 26, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#3aa0d8'; x.fillRect(-146, 30, 130, 60)
  x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('I QUIT!', 0, -40)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#4a4070'; x.fillText('wish you were', 0, 10); x.fillText('here ✦ love, sag', 0, 40)
  x.fillStyle = RED; x.fillRect(110, -90, 36, 44)
  x.restore()
}

const CAMEOS = [
  { sign: 'sagittarius', cap: 'Quit their job. | Via *postcard.*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      postcard(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), lt)
      label(x, 790, 640, 'POSTMARK: FAR AWAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'NO REGRETS', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'First date? | A *hot-air balloon.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: 0, y: 160, s: 220 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const rise = ease.inOutCubic(prog(lt, 0.6, 2.2))
      drawBits(x, BALLOON, BALLOON_C, 760, 800 - rise * 60, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 330, 640, 'too much?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      label(x, 760, 1150, 'DATE TWO: SPACE?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Honest feedback. | *Nobody asked.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 930, 200 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 700, 650, 'love the outfit! | mostly.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1150, 'FILTER: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Owns one plate. | And *nine backpacks.*', mood: 'sparkle', star: { x: -200 },
    front(x, t, lt, P) {
      const C = [PURPLE, ORANGE, GREEN, SKYB, RED, GOLD, PINK, MINT, LAV]
      for (let i = 0; i < 9; i++) drawBits(x, PACK, { P: C[i], K: INK, D: 'rgba(20,12,48,0.35)', Y: '#fff4e2' }, 670 + (i % 3) * 115, 690 + Math.floor(i / 3) * 150, 13 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      const k = pop01(t, P.t0 + 1.5, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.beginPath(); x.ellipse(400, 1120, 76, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(400, 1117, 68, 17, 0, 0, Math.PI * 2); x.fill(); x.restore() }
      label(x, 400, 1050, 'THE PLATE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Phone at 1%. | *Thriving.*', mood: 'sparkle', star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -70, 300, 140); x.fillRect(150, -30, 24, 60)
        x.fillStyle = '#2a2350'; x.fillRect(-138, -58, 276, 116)
        x.fillStyle = RED; x.fillRect(-126, -46, 14, 92)
        x.fillStyle = '#fff4e2'; x.font = `800 48px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('1%', 20, 2)
        x.restore()
      }
      label(x, 800, 650, 'CHARGER: AT HOME', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1080, 'it’s fine!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Fourteen hobbies. | *A week* each.', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const H = ['POTTERY', 'SALSA', 'BEEKEEPING', 'JUGGLING', 'BANJO', 'ORIGAMI', 'SURFING']
      const n = Math.min(7, 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 7))
      for (let i = 0; i < n; i++) label(x, 800 + (i % 2 ? 30 : -30), 620 + i * 78, H[i], pop01(t, P.t0 + (0.3 + i * 0.23) * 1.29, 0.25, 2.2), { size: 28, bg: [GOLD, PINK, MINT, SKYB, LAV, ORANGE, BONE][i], rot: (i % 2 ? 0.05 : -0.05), font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Got lost. | *Loved it.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = '#f0e2c0'; x.fillRect(-152, -142, 304, 284)
        x.strokeStyle = '#8fb88a'; x.lineWidth = 10; x.beginPath(); x.moveTo(-140, 60); x.bezierCurveTo(-60, -80, 40, 120, 140, -60); x.stroke()
        x.strokeStyle = RED; x.lineWidth = 6; x.setLineDash([12, 10]); x.beginPath(); x.moveTo(-120, 100); x.bezierCurveTo(-40, 20, -100, -100, 20, -60); x.bezierCurveTo(120, -20, 40, 100, 110, 110); x.stroke(); x.setLineDash([])
        x.fillStyle = INK; x.font = `800 60px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', 110, 100)
        x.restore()
      }
      label(x, 800, 640, 'YOU ARE: ???', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1090, 'BEST DAY EVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Laughed at their joke. | *Before the punchline.*', mood: lt => lt > 0.8 ? 'squint' : 'happy', star: { x: -180 }, hops: [0.9, 1.1, 1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 650, 'so a horse walks | into a—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      if (lt > 0.8) { const n = Math.min(4, Math.floor((lt - 0.8) / 0.25) + 1); for (let i = 0; i < n; i++) label(x, 700 + (i % 2) * 180, 860 + Math.floor(i / 2) * 120, 'HA', pop01(t, P.t0 + (0.8 + i * 0.25) * 1.29, 0.25, 2.4), { size: 50, bg: [GOLD, PINK, MINT, SKYB][i], rot: (i % 2 ? 0.1 : -0.1) }) }
    } },
  { sign: 'sagittarius', cap: 'Checked compatibility. | With *the ocean.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      drawBits(x, WAVE, WAVE_C, 540, 1130 + Math.sin(t * 2) * 6, 34 * k)
    },
    front(x, t, lt, P) {
      label(x, 790, 660, '♐︎ + 🌊'.replace(' 🌊', ' OCEAN'), pop01(t, P.t0 + 0.4, 0.3, 2), { size: 38, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 820, 'IT’S A MATCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04 })
      hearts(x, t, 790, 980, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'v3t108', key: 'E', accent: PURPLE, solo: 'sagittarius', ending: 'callback',
  title: 'Things only | *Sagittarians* get.',
  cameos: CAMEOS,
  card: { a: 'sagittarius', b: 'aquarius', chip: 'ALIGNED' },
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  last: {
    text: 'Sag and the ocean? | *Official now.*',
    draw(x, t, lt) {
      drawBits(x, WAVE, WAVE_C, 540, 1180 + Math.sin(t * 2) * 6, 40 * pop01(t, t - lt + 0.2, 0.4, 2))
      const g = pop01(t, t - lt + 0.4, 0.4, 2)
      if (g > 0.01) signChar(x, t, 'sagittarius', 540, 920, 280 * g, { mood: 'heart', seed: 71, hops: [t - lt + 1.2, t - lt + 2.0] })
      hearts(x, t, 540, 820, t - lt + 1.0, { n: 8, life: 2.2, spread: 420, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
