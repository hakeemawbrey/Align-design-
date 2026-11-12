// r2a0265: star_advice, ADVICE ROLLCALL, "Each sign's | dream job." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs, one warm and specific dream job each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *dream job.*"
//   3.6–49.2   ♈ coaching a team that never quits · ♉ bakery owner, free samples · ♊ radio host, paid to talk · ♋ kindergarten
//              teacher, snack captain · ♌ on stage every night · ♍ librarian, every shelf in order · ♎ matchmaker, every
//              couple aligned · ♏ detective, case closed by lunch · ♐ travel writer, office: everywhere · ♑ running their own
//              thing · ♒ inventor, nobody gets it yet · ♓ painting dreams, paid in feelings
//  49.2        "Twelve dreams. | *All worth chasing.*"
//  52.4        LESSON UNLOCKED: "Your dream fits you | *for a reason.*"  STATUS: INSPIRED
//  58.3        "Taurus already | *ate the samples.*"  a little Taurus with an empty sample tray.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, beam, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffd86b'
const ST = { x: -170 }
const WHISTLE = ['......K', '.SSSSSK', 'SSSSSSS', 'SSSS...', '.SS....']
const BREAD = ['...BBBBBB...', '.BBbBBbBBBB.', 'BBBBBBBBBBBB', 'BBbBBBBbBBBB', '.BBBBBBBBBB.']
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '.KKKK.']
const APPLE = ['....G.', '..RRRR.', '.RRWRRR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..']
const SHELF = ['KKKKKKKKKKKKKK', 'K1234567123456', 'K1234567123456', 'K1234567123456', 'KKKKKKKKKKKKKK']
const SHELF_C = { K: '#8a4a2e', 1: '#ff6b5a', 2: GOLD, 3: '#5fd068', 4: SKYB, 5: '#c97bff', 6: PINK, 7: ORANGE }
const GLASS = ['..KKKK....', '.K....K...', 'K..W...K..', 'K......K..', '.K....K...', '..KKKK.K..', '.......KK.', '........KK']
const GEAR = ['..G..G..', '.GGGGGG.', 'GGG..GGG', '.G....G.', '.G....G.', 'GGG..GGG', '.GGGGGG.', '..G..G..']
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..KKKK..', '..KKKK..', '...KK...']

const CAMEOS = [
  { sign: 'aries', cap: 'Coaching a team | *that never quits.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, WHISTLE, { S: GREY, K: INK }, 560, 860, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.4 + i * 0.15, 0.35, 2); if (k > 0.01) signChar(x, t, ['leo', 'sagittarius', 'gemini'][i], 700 + i * 110, 1010 - (i % 2) * 30, 120 * k, { mood: 'sparkle', look: [-1, 0], seed: 60 + i, glyph: false, hops: [P.t0 + 1.0 + i * 0.15] }) }
      label(x, 800, 690, 'GO TEAM!!', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Bakery owner. | *Free samples.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BREAD, { B: '#e8a95a', b: '#c97a3a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1080, 'TAKE ONE (OR FIVE)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Radio host. | *Paid to talk.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIC, { G: '#c9c9d8', g: '#8a8aa0', K: '#4a4378' }, 690, 950, 16 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.3 })
      label(x, 830, 660, '● ON AIR', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 830, 840, 'and ANOTHER thing', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Kindergarten teacher. | *Snack captain.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, APPLE, { R: '#ff4f5e', G: '#5fd068', W: '#fff' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'GOLD STARS FOR ALL', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 7, 170, 0.3)
    } },
  { sign: 'leo', cap: 'On stage. | *Every single night.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.8, 1.6],
    back(x, t, lt, P) { beam(x, 370, 470, 370, 1100, 200, pop01(t, P.t0 + 0.2, 0.4, 1.6)) },
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: ORANGE, seed: 2 })
      label(x, 790, 1060, 'SOLD OUT', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Librarian. | *Every shelf in order.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHELF, SHELF_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1060, 'SHHH. (KINDLY.)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Matchmaker. | *Every couple aligned.*', mood: 'heart', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.6, 1.3)), k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'capricorn', lerp(640, 720, j), 960, 150 * k, { mood: j > 0.9 ? 'heart' : 'neutral', look: [1, 0], seed: 71, glyph: false })
        signChar(x, t, 'cancer', lerp(940, 860, j), 960, 150 * k, { mood: j > 0.9 ? 'heart' : 'neutral', look: [-1, 0], seed: 72, glyph: false })
      }
      label(x, 790, 700, '✦ IT’S A MATCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 880, P.t0 + 1.3, { n: 5, life: 1.5, spread: 140, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Detective. | *Case closed by lunch.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: GOLD, W: '#ffffff' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 2) })
      label(x, 790, 1080, 'SOLVED · 11:58', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Travel writer. | *Office: everywhere.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'POSTCARD', 0, -70, { size: 30, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'wish you', 0, 0, { size: 40 }); txt(x, 'were here!', 0, 50, { size: 40 })
        x.fillStyle = PINK; x.fillRect(90, -95, 50, 60)
      })
      label(x, 790, 1080, 'DESK: A HAMMOCK', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Their own business. | *Their own rules.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 320, 140, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: GREEN, rot: -0.03 }, () => txt(x, 'NOW OPEN', 0, 4, { size: 54, color: CREAM }))
      label(x, 790, 1020, 'BOSS: ME', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Inventor. | *Nobody gets it yet.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BULB, { Y: '#ffe27a', W: '#fff', K: GREY }, 790, 780, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 2; i++) drawBits(x, GEAR, { G: i ? SKYB : '#c9c9d8' }, 700 + i * 170, 1000, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: (i ? -1 : 1) * t * 1.5 })
      bubble(x, 600, 600, 'it’s a… thing!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, col: MINT, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Painting dreams. | *Paid in feelings.*', mood: 'heart', tears: 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        const cols = [PINK, LAV, SKYB, MINT, GOLD]
        for (let i = 0; i < 5; i++) { x.fillStyle = cols[i]; x.beginPath(); x.arc(-70 + (i * 47) % 150, -60 + Math.floor(i / 3) * 110 + (i % 2) * 20, 50, 0, Math.PI * 2); x.fill() }
      })
      label(x, 790, 1100, 'MASTERPIECE (CRIED)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0265', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s | *dream job.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve dreams. | *All worth chasing.*' },
  lesson: { text: 'Your dream fits you | *for a reason.*', chip: 'STATUS: INSPIRED' },
  last: {
    text: 'Taurus already | *ate the samples.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 420, 760, 170 * k, { mood: 'heart', look: [1, 0], seed: 54 })
      card(x, 680, 790, 240, 30, pop01(t, t - lt + 0.8, 0.35, 2), { bg: GREY, rot: 0 })
      label(x, 680, 720, 'SAMPLES: 0', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
