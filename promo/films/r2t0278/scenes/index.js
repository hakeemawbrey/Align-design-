// r2t0278: star_talk, BELIKE (twelve signs), "Friend driving? | Zodiacs be like." (~54 s vertical, signs3kit, lofi · G)
// Twelve signs in the passenger seat, each the most extreme passenger version of itself.
//   0.0–3.6    "Friend driving? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ yells GO at every yellow light · ♉ snacks for a five-minute drive · ♊ changed the song nine times
//              · ♋ holding the handle since the driveway · ♌ window down, waving at strangers · ♍ backseat GPS, better
//              than the GPS · ♎ fixing their hair in the side mirror · ♏ silently rating your parking · ♐ "take this
//              exit!" (it leaves the country) · ♑ split the gas money to the cent · ♒ window down, chatting to a cow
//              · ♓ a sad song came on, sobbing at a red light
//  49.2        the group beat is the ending: "Same car. | *Twelve passengers.*" a little pixel car crosses the photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ffb34a'
const ST = { x: -170 }

const LIGHT = ['KKKKK', 'KRRRK', 'KRRRK', 'KKKKK', 'KYYYK', 'KYYYK', 'KKKKK', 'KGGGK', 'KGGGK', 'KKKKK', '..K..', '..K..', '..K..']
const LIGHT_ON = c => ({ K: INK, R: c === 'r' ? '#ff4f5e' : '#5a2430', Y: c === 'y' ? SUN : '#5a4a20', G: c === 'g' ? '#5fd068' : '#1f4a2a' })
const CHIPS = ['..KKKKKK..', '.KRRRRRRK.', 'KRYYYYYYRK', 'KRYWWWWYRK', 'KRYWWWWYRK', 'KRYYYYYYRK', '.KRRRRRRK.', '..KKKKKK..']
const CHIPS_C = { K: INK, R: ORANGE, Y: SUN, W: CREAM }
const HANDLE = ['KKKKKKKKKK', 'KGGGGGGGGK', 'KGK....KGK', 'KGK....KGK', 'KK......KK']
const COW = ['.K......K.', 'KWWWWWWWWK', 'KWKWWWWKWW', 'KWWWWWWWWW', 'KWWKKWWWWW', 'WWPPPPWWWW', '.WPKPKWWWW', '..PPPP....']
const COW_C = { K: INK, W: '#fff4e2', P: PINK }
const MIRROR = ['.KKKKKKKK.', 'KSSSSSSSSK', 'KSWSSSSSSK', 'KSSWSSSSSK', 'KSSSSSSSSK', 'KSSSSSSSSK', '.KKKKKKKK.', '....KK....', '....KK....']
const MIRROR_C = { K: INK, S: '#9fd8f0', W: '#ffffff' }
const CAR = ['....KKKKKK......', '...KRRRRRRK.....', '..KRSSRSSSRK....', 'KKRRRRRRRRRRKKK.', 'KRRRRRRRRRRRRRRK', 'KRRRRRRRRRRRRRRK', 'KKKWWKKKKKKWWKKK', '...KWWK....KWWK.', '....KK......KK..']
const CAR_C = { K: INK, R: '#ff6b5a', S: SKYB, W: GREY }

/** a green road sign */
function roadSign(x, cx, cy, k, a, b) {
  card(x, cx, cy, 340, 170, k, { bg: '#2f8a4a', rot: -0.03 }, () => {
    x.strokeStyle = CREAM; x.lineWidth = 5; x.strokeRect(-156, -71, 312, 142)
    txt(x, a, 0, -28, { size: 34, color: CREAM }); txt(x, b, 0, 28, { size: 30, font: MONO, weight: 700, color: CREAM })
  })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Yelling “GO” | at *every* yellow light.', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      const c = lt < 0.8 ? 'g' : 'y'
      drawBits(x, LIGHT, LIGHT_ON(c), 880, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 680, 660, 'GO GO GO', pop01(t, P.t0 + 0.9, 0.25, 2.6), { size: 52, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Packed snacks. | For *a five-minute drive.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CHIPS, CHIPS_C, 700 + i * 100, 960 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.15 })
      label(x, 790, 700, 'TRIP: 5 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed the song | *nine times.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(8, Math.floor(Math.max(0, lt - 0.3) / 0.2))
      label(x, 790, 800, `SONG ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 64, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      notes(x, t, 790, 1020, { n: 5, cell: 7, col: GOLD, seed: 1 })
      bubble(x, 790, 1080, 'no wait, this one', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Holding the handle. | *Since the driveway.*', mood: 'wide', look: [1, -1], star: { x: -170, y: 30 },
    front(x, t, lt, P) {
      drawBits(x, HANDLE, { K: INK, G: GREY }, 590, 640, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 820, 'SPEED: 12', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 48, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1030, 'slow DOWN', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Window down. | *Waving at strangers.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const IDS = ['virgo', 'capricorn']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.5 + i * 0.4, 0.35, 2); if (k > 0.01) signChar(x, t, id, 720 + i * 170, 1000, 140 * k, { mood: 'wide', look: [-1, 0], seed: 70 + i, glyph: false }) })
      bubble(x, 790, 700, 'HELLO, FANS!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: GOLD, tail: 'bl' })
      sparkles(x, t, 370, 860, P.t0 + 0.9, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Backseat GPS. | *Better* than the GPS.', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 820, 1.1 * pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'MAP', headCol: MINT, size: 26, lines: [['turn left', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)]] })
      bubble(x, 790, 1080, 'actually, RIGHT.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 42, col: GOLD, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Fixing their hair | in *the side mirror.*', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 800, 860, 32 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 })
      label(x, 800, 1110, 'LOOK 47 OF 50', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 840, P.t0 + 1.2, 6, 140, 0.6)
    } },
  { sign: 'scorpio', cap: 'Silently rating | your *parking.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 3)
      label(x, 790, 720, `ATTEMPT ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GREY, rot: 0.04, font: MONO, weight: 700 })
      card(x, 790, 960, 220, 160, pop01(t, P.t0 + 1.3, 0.35, 2.2), { bg: CREAM, rot: -0.05 }, () => {
        txt(x, 'SCORE', 0, -40, { size: 26, font: MONO, weight: 700, color: '#6b62a8' }); txt(x, '3/10', 0, 22, { size: 60, color: RED })
      })
    } },
  { sign: 'sagittarius', cap: '“Take this exit!” | It leaves *the country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      roadSign(x, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2), 'EXIT 9 →', 'BORDER: 2 KM')
      bubble(x, 790, 1010, 'road trip!!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 46, col: LAV, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Split the gas money. | *To the cent.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 300, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'GAS SPLIT', 0, -120, { size: 32, font: MONO, weight: 700 })
        txt(x, 'YOU: 4.37', 0, -40, { size: 32, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, 'ME: 4.37', 0, 20, { size: 32, font: MONO, weight: 700, color: '#6b62a8' })
        txt(x, lt > 1.1 ? 'GUM: 0.25' : '', 0, 80, { size: 32, font: MONO, weight: 700, color: RED })
      })
      label(x, 790, 1110, 'INVOICE SENT', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Window down. | Now *chatting to a cow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, COW, COW_C, 830, 960, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 740, 680, 'how’s your day?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 860, 790, 'moo.', pop01(t, P.t0 + 1.4, 0.25, 2.4), { size: 40, col: MINT, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'A sad song came on. | *Sobbing* at a red light.', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, LIGHT, LIGHT_ON('r'), 880, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      notes(x, t, 680, 900, { n: 3, cell: 6, col: SKYB, seed: 4 })
      label(x, 700, 660, 'TISSUES: OUT', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0278', key: 'G', accent: ACC, ending: 'group',
  title: 'Friend driving? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Same car. | *Twelve passengers.*',
    draw(x, t, lt) { const p = prog(lt, 1.6, 4.6); if (p > 0 && p < 1) drawBits(x, CAR, CAR_C, lerp(-60, 1140, p), 860 + 4 * Math.sin(t * 20), 14) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
