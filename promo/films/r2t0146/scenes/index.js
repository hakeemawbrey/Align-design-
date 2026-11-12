// r2t0146: THE SIGNS AS… v3, BELIKE, "Zodiacs when the sun comes out | be like." (~56 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Zodiacs when the | *sun’s out be like.*"
//   3.6–49.2   ♈ sprinted outside, forgot shoes · ♉ found the one sunbeam, lives there now · ♊ nine plans before noon
//              · ♋ packed snacks for the whole park · ♌ the sun came out for them (sun sign: Leo) · ♍ SPF reapplied every
//              ten minutes · ♎ eleven outfits for one profile pic · ♏ stayed inside, sunglasses on anyway
//              · ♐ already at a beach, another country · ♑ took the laptop to the park · ♒ solar-charged everything
//              · ♓ cried: it's just so warm
//  49.2        "Twelve signs. | *One sunbeam.*"
//  52.6        callback: "It’s sunset. | Taurus *stayed.*"  Taurus asleep in the last orange beam.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, sun, beam, shades, laptop, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffd23a'
const ST = { x: -170 }

const SHOE = ['....KKKK..', '...KWWWWK.', 'KKKWWWWWWK', 'KRRRRRRRRK', 'KKKKKKKKKK']
const SHOE_C = { K: INK, W: '#fff4e2', R: RED }
const BASKET = ['...BBBBBB...', '..B......B..', '.B........B.', 'WWRWWRWWRWWR', 'BWBWBWBWBWBW', 'WBWBWBWBWBWB', 'BWBWBWBWBWBW', '.BBBBBBBBBB.']
const BASKET_C = { B: WOOD, W: '#e8c27a', R: RED }
const BOTTLE = ['..KK..', '..KK..', '.WWWW.', 'WWWWWW', 'WOOOOW', 'WOSSOW', 'WOSSOW', 'WOOOOW', 'WWWWWW', 'WWWWWW']
const BOTTLE_C = { K: INK, W: '#fff4e2', O: ORANGE, S: SUN }
const HANGER = ['....KK....', '...K..K...', '......K...', '.....K....', '..KKKKKK..', '.K......K.', 'KKKKKKKKKK']
const CURTAIN = ['PPPPPPPPPPPPPP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP', 'PpPPpPPPPpPPpP']
const CURTAIN_C = { P: '#6b3fa0', p: '#4a2a78' }
const UMBRELLA = ['....RRRRR....', '..RRWWRRWWR..', '.RWWRRWWRRWW.', 'RRRRRRRRRRRRR', '......K......', '......K......', '......K......', '......K......', '......K......', '.....KK......']
const UMB_C = { R: RED, W: '#fff4e2', K: INK }
const PANEL_BM = ['KKKKKKKKKKKK', 'KBBKBBKBBKBK', 'KBBKBBKBBKBK', 'KKKKKKKKKKKK', 'KBBKBBKBBKBK', 'KBBKBBKBBKBK', 'KKKKKKKKKKKK', '.....KK.....', '.....KK.....', '....KKKK....']
const PANEL_C = { K: INK, B: '#3f6fd0' }

const CAMEOS = [
  { sign: 'aries', cap: 'Sprinted outside. | Forgot *shoes.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      sun(x, t, 790, 640, 60, pop01(t, P.t0 + 0.2, 0.35, 2))
      drawBits(x, SHOE, SHOE_C, 700, 1080, 14 * pop01(t, P.t0 + 1.3, 0.3, 2))
      drawBits(x, SHOE, SHOE_C, 860, 1080, 14 * pop01(t, P.t0 + 1.4, 0.3, 2), { sx: -1 })
      label(x, 780, 940, 'SHOES: INSIDE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Found the one sunbeam. | *Lives there now.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -150, y: 40 },
    back(x, t, lt, P) { beam(x, 300, 480, 390, 1150, 210, ease.outCubic(prog(lt, 0.2, 0.6))) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'DO NOT DISTURB', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'my spot.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Nine plans. | *Before noon.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const PL = ['picnic!', 'beach!', 'brunch!', 'hike!', 'picnic AND beach!']
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.4))
      bubble(x, 780, 700, PL[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 880, `PLANS: ${Math.min(9, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.22))}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1040, 'IT IS 9:04 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed snacks | for *the whole park.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BASKET, BASKET_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 700, 'SNACKS FOR: 40', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1110, 'everyone eat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'The sun came out. | For *them,* obviously.', mood: 'sparkle', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sun(x, t, 790, 680, 70, pop01(t, P.t0 + 0.2, 0.35, 2), { face: true })
      label(x, 790, 900, 'SUN SIGN: LEO', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1070, "you're welcome.", pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.1, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Reapplied SPF | every *ten minutes.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOTTLE, BOTTLE_C, 760, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.08 })
      label(x, 790, 650, 'SPF 100', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: SUN, rot: -0.05, font: MONO, weight: 700 })
      const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.25))
      label(x, 790, 1130, `COAT ${n} OF 6`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Eleven outfits. | For *one profile pic.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [PINK, MINT, SKYB, GOLD, LAV]
      for (let i = 0; i < 5; i++) drawBits(x, HANGER, { K: INK }, 640 + i * 75, 620, 6 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2))
      for (let i = 0; i < 5; i++) { const k = pop01(t, P.t0 + 0.3 + i * 0.08, 0.3, 2); if (k > 0.01) { x.fillStyle = INK; x.fillRect(612 + i * 75, 650, 56 * k, 110 * k); x.fillStyle = COLS[i]; x.fillRect(618 + i * 75, 656, 44 * k, 98 * k) } }
      label(x, 790, 880, `LOOK ${Math.min(11, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.17))}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 48, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'okay… one more', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Stayed inside. | Sunglasses *on anyway.*', mood: 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      drawBits(x, CURTAIN, CURTAIN_C, 790, 860, 24 * k)
    },
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.5, 0.9))
      if (lt > 0.45) shades(x, F.x, lerp(F.cy - 260, F.cy - 6, d), 15)
      label(x, 790, 1130, 'CURTAINS: SHUT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Already at a beach. | In *another country.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.3],
    back(x, t, lt, P) { drawBits(x, UMBRELLA, UMB_C, 330, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 320, 650, 'TIMEZONE: ???', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 320, 1100, 'just got here!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Took the laptop | *to the park.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = MINT; for (let i = 0; i < 4; i++) { const h = 30 + i * 22, g = ease.outCubic(prog(lt, 0.5 + i * 0.15, 0.8 + i * 0.15)); x.fillRect(-90 + i * 48, 60 - h * g, 32, h * g) }
      })
      label(x, 790, 650, 'OUT OF OFFICE: NO', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 30, bg: GREEN, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1080, 'quick call?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Solar-charged | *everything.* Even the cat.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANEL_BM, PANEL_C, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.06 })
      bar(x, 790, 1100, pop01(t, P.t0 + 0.6, 0.3, 2), clamp((lt - 0.6) / 1.4), 'CAT: CHARGING', { col: MINT, w: 300 })
    } },
  { sign: 'pisces', cap: 'Cried. | It’s just *so warm.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sun(x, t, 790, 720, 80, pop01(t, P.t0 + 0.2, 0.35, 2), { face: true })
      label(x, 790, 1000, 'SO. BEAUTIFUL.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: PINK, rot: 0.04 })
      hearts(x, t, 790, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0146', key: 'C', accent: ACC, ending: 'callback',
  title: 'Zodiacs when the | *sun’s out be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One sunbeam.*' },
  last: {
    text: 'It’s sunset. | Taurus *stayed.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 1.8)
      beam(x, 540, 700, 540, 1290, 250, k, { col: '#ffb070', a: 0.4 })
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1170, 300 * k, { mood: 'sleepy', seed: 51, hops: [] })
      label(x, 760, 960, 'STILL MY SPOT', pop01(t, t - lt + 1.3, 0.3, 2.4), { size: 40, bg: GREEN, rot: -0.06, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
