// r2t0471: star_talk, BELIKE, "Touch their food? | Zodiacs be like." (topic: zodiacs when someone touches their food)
// (signs3kit social cut, music: lofi · C). Twelve signs in zodiac order, each the most extreme version of itself when
// someone takes a bite off their plate. Ending: callback (Taurus' fry, Gerald, gets a memorial).
//   ♈ ate your whole plate back · ♉ the fry had a name · ♊ didn't notice, was eating yours · ♋ made you your own plate
//   · ♌ gasped so loud the music stopped · ♍ one bite touched, plate gone · ♎ "no worries!", re-balanced the plate
//   · ♏ smiled, took your dessert later · ♐ "have some, it's not even good" · ♑ sent an invoice · ♒ food is a shared
//   concept · ♓ cried, then offered you the rest.
//   group "Hands off the plate. | *All twelve agree.*"   last "Rest in peace, | *Gerald the fry.*"
import { clamp, prog, ease } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, meter, bits, ORANGE, RED, WOOD, PAPER, SLATE, GREEN } from '../props.js'

const L = { x: -190 }
const FRYBOX = [
  '.Y.Y.YY.Y.',
  '.YY.YY.YY.',
  'YYYYYYYYYY',
  'RRRRRRRRRR',
  'RRRWRRWRRR',
  '.RRRRRRRR.',
  '.RRRRRRRR.',
  '..RRRRRR..',
]
const FRY = ['YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY', 'YY']
const PLATE = ['..WWWWWWW..', '.WWwwwwwWW.', 'WWwwwwwwwWW', '.WWwwwwwWW.', '..WWWWWWW..']
const PLATE_FULL = ['...OO.GG...', '..WOOWGGW..', '.WWwwwwwWW.', 'WWwwwwwwwWW', '.WWwwwwwWW.', '..WWWWWWW..']
const PLATE_C = { W: PAPER, w: '#e8dcc6', O: ORANGE, G: GREEN }
const CUPCAKE = ['...R...', '..PPP..', '.PPPPP.', 'PPPPPPP', '.BBBBB.', '.BWBWB.', '..BBB..']
const CUP_C = { R: RED, P: PINK, B: WOOD, W: PAPER }
const BAG = ['...WWWW...', '..W....W..', 'SSSSSSSSSS', 'SSSSSSSSSS', 'SSWWWWWWSS', 'SSSSSSSSSS', 'SSSSSSSSSS']

const CAMEOS = [
  { sign: 'aries', cap: 'You took one bite. | They *ate your whole plate.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const full = lt < 1.1
      drawBits(x, full ? PLATE_FULL : PLATE, PLATE_C, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 680, 'FAIR IS FAIR.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.05 })
      sparkles(x, t, 800, 920, P.t0 + 1.1, 7, 160, 0.2, [GOLD, ORANGE, BONE])
    } },
  { sign: 'taurus', cap: 'You ate one fry. | *Its name was Gerald.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FRYBOX, { Y: GOLD, R: RED, W: PAPER }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 650, 'we were | so close.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Didn’t even notice. | *Was eating yours.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: L, hops: [0.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PLATE, PLATE_C, 720, 1010, 16 * k)
      drawBits(x, PLATE_FULL, PLATE_C, 890, 1010, 16 * k)
      label(x, 720, 1110, 'MINE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 890, 1110, 'YOURS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 800, 700, 'wait, which | one’s mine?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Made you your own plate. | *Three courses.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L, hops: [1.3],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 2.99)
      note(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['soup', 'pasta', 'pie'].slice(0, n).join(' | '), { head: 'FOR YOU', headBg: PINK, size: 40, w: 300, rot: 0.04 })
      hearts(x, t, 800, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Gasped so loud | *the music stopped.*', mood: 'wide', look: [1, -1], star: { x: -180, y: -20 }, hops: [0.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'HOW. DARE.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 56, tail: 'bl' })
      label(x, 800, 1010, 'RESTAURANT: SILENT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'One bite touched. | *Whole plate: gone.*', mood: lt => lt > 1.2 ? 'neutral' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 1.0, 1.5))
      if (go < 1) drawBits(x, PLATE_FULL, PLATE_C, 800 + go * 260, 930 - go * 60, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: go * 0.8, alpha: 1 - go })
      label(x, 800, 680, 'CONTAMINATED', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 36, bg: RED, color: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 800, 1100, 'NEW PLATE, PLEASE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“No worries!” | *Re-balanced the plate.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const tilt = 0.28 * (1 - ease.inOutCubic(prog(lt, 0.9, 1.5)))
      if (k > 0.01) {
        x.save(); x.translate(800, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-14, -150, 28, 210); x.fillRect(-70, 50, 140, 26)
        x.fillStyle = GOLD; x.fillRect(-8, -144, 16, 198); x.fillRect(-64, 54, 128, 18)
        x.rotate(tilt)
        x.fillStyle = INK; x.fillRect(-180, -158, 360, 20); x.fillStyle = GOLD; x.fillRect(-176, -154, 352, 12)
        drawBits(x, FRY, { Y: GOLD }, -150, -215, 12); drawBits(x, FRY, { Y: GOLD }, -130, -215, 12)
        drawBits(x, FRY, { Y: GOLD }, 130, -215, 12); if (lt > 1.2) drawBits(x, FRY, { Y: GOLD }, 150, -215, 12)
        x.restore()
      }
      label(x, 800, 640, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Smiled sweetly. | *Took your dessert later.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const slide = ease.inOutCubic(prog(lt, 1.0, 1.6))
      drawBits(x, CUPCAKE, CUP_C, 860 - slide * 220, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'no, it’s fine :)', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 820, 1130, 'EVEN NOW.', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: '#c2375a', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Have some.” | *“It’s not even good.”*', mood: lt => lt > 1.0 ? 'happy' : 'sparkle', look: [1, 0], star: L, hops: [0.7],
    front(x, t, lt, P) {
      drawBits(x, PLATE_FULL, PLATE_C, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      label(x, 800, 690, 'REVIEW: 2 STARS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'One bite. | *Sent you an invoice.*', mood: 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const r = lt > 0.9 ? 1 : 0
      note(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), r ? '1 bite: $1.40 | service fee | DUE: FRIDAY' : '1 bite: $1.40 | service fee', { head: 'INVOICE #001', headBg: BONE, size: 34, w: 380, font: MONO, weight: 700, rot: -0.03 })
      bubble(x, 440, 640, 'business.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'Didn’t mind at all. | Food is *a shared concept.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what is “mine,” | really?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      drawBits(x, PLATE_FULL, PLATE_C, 800, 1010, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      sparkles(x, t, 800, 720, P.t0 + 1.4, 7, 180, 0.4, [SKYB, BONE, LAV])
    } },
  { sign: 'pisces', cap: 'Cried a little. | *Then offered you the rest.*', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 1, look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, PLATE_FULL, PLATE_C, 800 + ease.outCubic(prog(lt, 1.2, 1.7)) * 60, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'no, you | have it…', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0471', key: 'C', accent: ORANGE, ending: 'callback',
  title: 'Touch their food? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Hands off the plate. | *All twelve agree.*' },
  last: {
    text: 'Rest in peace, | *Gerald the fry.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      drawBits(x, FRY, { Y: GOLD }, 540, 1050, 30 * k, { rot: 0.08 })
      x.save(); x.globalAlpha *= clamp(k)
      x.fillStyle = INK; x.fillRect(420, 1210, 240, 30); x.fillStyle = WOOD; x.fillRect(426, 1214, 228, 22); x.restore()
      hearts(x, t, 540, 980, t - lt + 1.2, { n: 5, life: 1.8, spread: 200, cell: 6, seed: 7 })
      label(x, 540, 1360, 'GONE TOO SOON', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
