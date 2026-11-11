// v3t020: THE SIGNS AS… v3, "The signs plan | a surprise party." (~62 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs plan | a *surprise party.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one party planner per sign (3.8 s each), each pushed to the extreme:
//              ♈ told them immediately · ♉ hid behind the couch, fell asleep · ♊ kept the secret from nobody
//              · ♋ a scrapbook of their whole life · ♌ planned your party, gave the speech · ♍ three dress rehearsals
//              · ♎ seven themes · ♏ hid so well nobody found them · ♐ picked up the wrong friend
//              · ♑ a run sheet: surprise at 8:02 · ♒ invited the whole street, and a goat · ♓ yelled SURPRISE, cried most
//  49.2        "Surprise? | *Everyone knew.*"
//  52.4        LESSON UNLOCKED: "Show up loud. | That’s *the gift.*"  PARTY: ON
//  58.3        "Taurus is still | *behind the couch.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', GREEN = '#5fd068', CREAM = '#fff4e2'

const CAKE = [
  '...Y..Y..Y...',
  '...R..R..R...',
  '.PPPPPPPPPPP.',
  '.PWPWPWPWPWP.',
  '.PPPPPPPPPPP.',
  'CCCCCCCCCCCCC',
  'CCCCCCCCCCCCC',
  'WWWWWWWWWWWWW',
]
const CAKE_C = { Y: GOLD, R: RED, P: PINK, W: CREAM, C: '#c97a3a' }
const COUCH = [
  '.GGGGGGGGGGGG.',
  'GGggggggggggGG',
  'GGggggggggggGG',
  'GGGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.K..........K.',
]
const COUCH_C = { G: '#c97bff', g: '#e0b0ff', K: '#5a2e1a' }
const BOOK = [
  'PPPPPPPPPPPPP',
  'PWWWWWPWWWWWP',
  'PWHHWWPWSSSWP',
  'PWHHWWPWSSSWP',
  'PWWWWWPWWWWWP',
  'PWKKKWPWKKKWP',
  'PPPPPPPPPPPPP',
]
const BOOK_C = { P: PINK, W: CREAM, H: GOLD, S: SKYB, K: '#9aa5c4' }
const GOAT = [
  'H.......H.',
  '.WWW...WW.',
  '.WKWWWWWW.',
  'WWWWWWWWW.',
  '..WWWWWWW.',
  '..W.W.W.W.',
]
const GOAT_C = { H: '#c9b08a', W: '#f4f0e8', K: INK }
const BALLOON = ['.BBB.', 'BBWBB', 'BBBBB', 'BBBBB', '.BBB.', '..K..', '..K..', '..K..']

function balloons(x, t, cx, cy, k, cols = [PINK, GOLD, MINT]) {
  cols.forEach((c, i) => drawBits(x, BALLOON, { B: c, W: '#ffffff', K: BONE }, cx + (i - 1) * 70, cy + Math.sin(t * 2 + i) * 8 - (i % 2) * 30, 14 * k))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Planned a surprise. | *Told them immediately.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: -160 }, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 780, 740, 'SURPRISE PARTY | FRIDAY! oops', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 36, tail: 'bl' })
      label(x, 790, 980, 'SECRET KEPT: 4 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Hid behind the couch. | *Fell asleep.*', mood: lt => lt > 0.9 ? 'sleepy' : 'happy', star: { x: 0, y: -10, s: 250 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 540, 1060, 34 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 800, 640, 'NAP: STARTED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Kept the secret. | From *nobody.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['shh!', 'don’t tell', 'it’s a secret', 'SURPRISE PARTY']
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 780, 760, W[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: n === 3 ? 40 : 46, tail: 'bl' })
      label(x, 790, 980, `TOLD: ${[3, 12, 40, 'ALL'][n]}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 38, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made a scrapbook. | Of *your whole life.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      const pg = Math.min(812, 1 + Math.floor(Math.max(0, lt - 0.5) * 420))
      label(x, 790, 1090, `PAGE ${pg}`, pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Planned your party. | *Gave the speech.*', mood: 'sparkle', star: { x: -150 }, hops: [0.9],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.2, 0.5))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(360, 490); x.lineTo(420, 490); x.lineTo(560, 1180); x.lineTo(220, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'a few words | about ME', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 960, 'SPEECH: 40 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 390, 860, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Ran a dress rehearsal. | *Three times.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) * 1.6))
      label(x, 790, 760, `REHEARSAL ${n}/3`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'jump out on | “SUR-”. AGAIN.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Picked the theme. | *Seven themes.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', star: { x: -170 },
    front(x, t, lt, P) {
      const TH = ['DISCO', 'GARDEN', 'ZODIAC NIGHT ✦', 'PASTEL', 'SPACE', 'BEACH', 'ALL OF THEM']
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.2) * 3.2))
      label(x, 790, 860, TH[n], pop01(t, P.t0 + 0.2, 0.3, 2), { size: 42, bg: [PINK, GREEN, GOLD, LAV, SKYB, ORANGE, PINK][n], rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, `THEME ${n + 1} OF 7`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      balloons(x, t, 790, 680, pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
  { sign: 'scorpio', cap: 'Hid so well | *nobody found them.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) {},
    front(x, t, lt, P) {
      // a curtain slides across the star
      const p = ease.inOutCubic(prog(lt, 0.6, 1.2))
      if (p > 0) {
        x.save(); x.fillStyle = INK; x.fillRect(200, 600, 380 * p + 8, 560)
        x.fillStyle = '#7a1f3d'; x.fillRect(204, 604, 380 * p, 552)
        x.fillStyle = '#5a1530'; for (let i = 0; i < 6; i++) x.fillRect(220 + i * 60 * p, 604, 14, 552)
        x.restore()
      }
      label(x, 790, 820, 'WHERE’S SCORPIO?', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: '#c97bff', color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1000, 'FOUND: 2 DAYS LATER', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Picked up the guest. | *Wrong friend.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: { x: 170 }, hops: [0.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 360, 920, 220 * k, { mood: lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], seed: 13, glyph: false })
      label(x, 360, 680, 'SURPRISE!', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 360, 1120, 'who are you?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Made a run sheet. | Surprise *at 8:02.*', mood: 'neutral', look: [-1, 0], star: { x: 160 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 860); x.scale(k, k); x.rotate(-0.04)
      x.fillStyle = INK; x.fillRect(-160, -220, 320, 440); x.fillStyle = CREAM; x.fillRect(-150, -210, 300, 420)
      x.fillStyle = INK; x.font = `800 30px Inter, Arial, sans-serif`; x.textAlign = 'left'; x.textBaseline = 'middle'
      x.fillText('RUN SHEET', -125, -165)
      const rows = ['7:58 lights off', '8:00 hide', '8:01 shh', '8:02 SURPRISE'], n = Math.floor(clamp((lt - 0.4) / 1.2) * 4.99)
      x.font = `700 26px ${MONO}`
      rows.forEach((r, i) => { if (i < n) { x.fillStyle = i === 3 ? RED : '#2a2350'; x.fillText(r, -125, -95 + i * 70) } })
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 760, 660, 'ON TIME ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: '#2fc79a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invited the whole street. | *And a goat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'GUESTS: 140', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      drawBits(x, GOAT, GOAT_C, 790, 950, 22 * pop01(t, P.t0 + 1.0, 0.35, 2))
      bubble(x, 800, 1130, 'meh.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, col: BONE, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Yelled “SURPRISE!” | Then *cried the most.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 720, 'SURPRISE!! *sob*', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t020', key: 'G', accent: GOLD, ending: 'lesson',
  title: 'The signs plan | a *surprise party.*',
  cameos: CAMEOS,
  group: { cap: 'Surprise? | *Everyone knew.*', moods: Array(12).fill('sparkle') },
  lesson: { text: 'Show up loud. | That’s *the gift.*', chip: 'PARTY: ON' },
  last: {
    text: 'Taurus is still | *behind the couch.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
