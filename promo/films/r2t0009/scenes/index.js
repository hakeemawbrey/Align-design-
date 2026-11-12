// r2t0009: star_talk ROLLCALL, "The signs | at a spa day." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order at a spa, each the most extreme version of itself:
//   ♈ speed-ran the massage (done in four minutes) · ♉ booked a nap, woke up Thursday · ♊ talked through the silent room
//   · ♋ brought face masks for everyone · ♌ a face mask, in gold, obviously · ♍ refolded every towel · ♎ still choosing a
//   scent · ♏ the sauna asked if Scorpio was okay · ♐ left mid-massage for a hike · ♑ relaxing, on a work call
//   · ♒ asked for a moon-water facial · ♓ cried at how soft the robe is
//  49.2   "Most relaxed | *chaos ever.*"  group photo
//  52.6   callback: "Libra picked a scent. | *The spa closed.*"  the scent bottles come back, Libra beaming, lights out.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#9ee6c9'
const TOWEL = ['WWWWWWWWWWW', 'WPWWWWWWWPW', 'WWWWWWWWWWW']
const BOTTLE = ['.KK.', '.KK.', 'CCCC', 'CWCC', 'CCCC', 'CCCC']
const ROBE = [
  '..WW...WW..',
  '.WWWW.WWWW.',
  'WWWWWPWWWWW',
  'WW.WWPWW.WW',
  'WW.WPPPW.WW',
  'WW.WWPWW.WW',
  '...WWPWW...',
  '...WWWWW...',
]
const ROBE_C = { W: '#fff4e2', P: '#ffb3c7' }
const MASK = ['..WWWWW..', '.WWWWWWW.', 'WW.WWW.WW', 'WWWWWWWWW', 'WWW...WWW', '.WWWWWWW.', '..WWWWW..']
const BOOT = ['..BBBB..', '..BBBB..', '..BBBB..', '..BBBBBB', 'BBBBBBBB', 'KKKKKKKK']
const BOOT_C = { B: '#a8743f', K: INK }
const JAR = ['.KKKK.', 'GGGGGG', 'GBBBBG', 'GBWBBG', 'GBBBBG', 'GGGGGG']
const JAR_C = { K: '#9aa5c4', G: '#c4f0ff', B: '#6fc3ff', W: '#fff' }

const SCENTS = ['LAVENDER?', 'ROSE?', 'MINT?', 'CEDAR?', 'LAVENDER?']
const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Speed-ran | *the massage.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const s = Math.min(4, Math.floor(prog(lt, 0.3, 1.3) * 4))
      label(x, 790, 760, `0:0${s}:00`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 56, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 960, 'DONE. NEXT?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 42, bg: '#ff6b5a', color: '#fff4e2', rot: 0.05 })
    } },
  { sign: 'taurus', cap: 'Booked a nap. | Woke up *Thursday.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = ['MON', 'TUE', 'WED', 'THU'][Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.4))]
      label(x, 790, 820, d, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 70, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      drawBits(x, TOWEL, { W: '#fff4e2', P: '#ffb3c7' }, 370, 1050, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
    } },
  { sign: 'gemini', cap: 'Talked through | *the silent room.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 650, 'SILENCE, PLEASE', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 34, bg: '#9aa5c4', rot: 0 })
      bubble(x, 790, 860, 'so ANYWAY— | did i tell you—', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, col: '#ffe36a', tail: 'bl' })
      label(x, 790, 1110, 'SHHH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: BONE, rot: 0.06 })
    } },
  { sign: 'cancer', cap: 'Brought face masks | *for everyone.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, MASK, { W: i % 2 ? '#c4f0ff' : '#9ee6c9' }, 700 + (i % 3) * 95, 780 + Math.floor(i / 3) * 120, 12 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.25, 2))
      label(x, 790, 1080, 'ONE FOR THE STAFF TOO', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'A face mask. | In *gold.* Obviously.', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MASK, { W: GOLD }, 800, 840, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 840, P.t0 + 0.6, 8, 170, 0.2)
      label(x, 790, 1100, 'MASK: 24K', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Refolded | *every towel.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) { const s = ease.outCubic(prog(lt, 0.3 + i * 0.2, 0.5 + i * 0.2)); drawBits(x, TOWEL, { W: '#fff4e2', P: '#9ee6c9' }, 790 + (1 - s) * 60 * (i % 2 ? 1 : -1), 1080 - i * 66, 22, { rot: (1 - s) * 0.3, alpha: 0.4 + 0.6 * s }) }
      label(x, 790, 620, 'FOLDED: CORRECTLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.03 })
    } },
  { sign: 'libra', cap: 'Still choosing | *a scent.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = ['#c9a6ff', '#ff8fb1', '#7dffb0', '#c98f2a']
      cols.forEach((c, i) => drawBits(x, BOTTLE, { K: INK, C: c, W: '#fff' }, 680 + i * 80, 960, 18 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.25, 2)))
      bubble(x, 790, 700, SCENTS[Math.min(4, Math.floor(Math.max(0, lt - 0.4) / 0.4))], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'The sauna asked | if *Scorpio* was okay.', mood: 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.35; x.strokeStyle = '#fff4e2'; x.lineWidth = 12; x.lineCap = 'round'
      for (const dx of [-90, 0, 90]) { x.beginPath(); for (let j = 0; j <= 12; j++) { const yy = 1150 - j * 40, xx = 370 + dx + Math.sin(j * 0.7 + t * 3 + dx) * 18; j ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke() }
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 790, 680, 'SAUNA: MAX', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 42, bg: '#ff9a4a', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'is it on?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Left mid-massage | *for a hike.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      drawBits(x, BOOT, BOOT_C, 760, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOOT, BOOT_C, 880, 1000, 22 * pop01(t, P.t0 + 0.35, 0.3, 2))
      label(x, 790, 700, 'BACK BY… JUNE?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: '#c97bff', color: '#fff4e2', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: 'Relaxing. | *On a work call.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 860, `ON CALL: 0:${String(41 + Math.floor(lt * 4)).padStart(2, '0')}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      bubble(x, 790, 650, 'per my last email…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1080, 'STATUS: “RELAXED”', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Asked for | a *moon-water* facial.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, JAR_C, 800, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'MOON WATER', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: SKYB, rot: -0.04 })
      bubble(x, 790, 1110, 'harvested tuesday.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried at | *how soft the robe is.*', mood: 'heart', tears: 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ROBE, ROBE_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'SO. SOFT.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 44, bg: PINK, rot: 0.04 })
      hearts(x, t, 800, 840, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0009', key: 'D', accent: ACC, ending: 'callback',
  title: 'The signs | *at a spa day.*',
  cameos: CAMEOS,
  group: { cap: 'Most relaxed | *chaos ever.*' },
  last: {
    text: 'Libra picked a scent. | *The spa closed.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.3, 0.4, 2)
      const cols = ['#c9a6ff', '#ff8fb1', '#7dffb0', '#c98f2a']
      cols.forEach((c, i) => drawBits(x, BOTTLE, { K: INK, C: c, W: '#fff' }, 600 + i * 100, 1150, 24 * k))
      if (k > 0.01) signChar(x, t, 'libra', 360, 1100, 300 * k, { mood: lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], seed: 85, glyph: false, hops: [t - lt + 1.0] })
      label(x, 750, 940, 'SPA: CLOSED', pop01(lt, 1.6, 0.3, 2.4), { size: 56, bg: '#9aa5c4', rot: -0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
