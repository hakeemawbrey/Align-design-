// r2t0024: THE SIGNS AS… v3, BE LIKE, "Early bedtime? | Zodiacs be like." (~54 s vertical, signs3kit, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of themselves trying to go to bed early.
//   0.0–3.6    "Early bedtime? | Zodiacs *be like.*"
//   3.6–49.2   ♈ forty push-ups instead · ♉ asleep mid-cookie · ♊ lights off, group chat on (142 new) · ♋ replayed 2014
//              · ♌ skincare step 14 of 22 · ♍ pillow adjustment #40 · ♎ said goodnight to 23 friends · ♏ in bed, plotting
//              · ♐ booked a 4 a.m. sunrise hike · ♑ answered one email, then forty · ♒ invented a telepathic toaster
//              · ♓ one rescued-puppy video, sobbing till 1
//  49.2        GROUP ENDING: "Bedtime: 9 p.m. | Asleep: *3 a.m.*"  (a moon clock reads 3:00 over the photo)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', BROWN = '#8a4a2e'

// ── props
const COOKIE = ['..CCCCC..', '.CCKCCCC.', 'CCCCCCKCC', 'CKCCCCCCC', 'CCCCKCCC.', '.CCCCCC..', '..CCC....']
const COOKIE_C = { C: '#e8a24a', K: BROWN }
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSWWWWSK', 'KSSSSSSK', 'KSWWWSSK', 'KSSSSSSK', 'KSWWWWSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKGGKKK', 'KKKKKKKK']
const PHONE_C = { K: '#2a2350', S: SKYB, W: '#ffffff', G: '#6b62a8' }
const PILLOW = ['.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']
const JAR = ['.KKKKK.', 'KGGGGGK', 'KWWWWWK', 'KWWWWWK', 'KWWWWWK', '.KKKKK.']
const TOASTER = ['..A...A..', '.KKKKKKK.', 'KSSSSSSSK', 'KS.SSS.SK', 'KSSSSSSSK', 'KSSSSSSSK', '.KK...KK.']

const CAMEOS = [
  { sign: 'aries', cap: 'Tried to sleep. | Did *forty push-ups.*', mood: 'squint', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.8, 1.1, 1.4, 1.7, 2.0],
    front(x, t, lt, P) {
      const n = Math.min(40, Math.floor(prog(lt, 0.3, 2.0) * 40))
      label(x, 790, 760, `PUSH-UPS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 930, 'BEDTIME: 9:00', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Fell asleep | *mid-cookie.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, COOKIE, COOKIE_C, 640, 990, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      label(x, 800, 720, 'ZZZ…', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 56, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Lights off. | *Group chat on.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const n = 3 + Math.floor(prog(lt, 0.4, 2.0) * 139)
      label(x, 790, 650, `${n} NEW`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 44, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Almost asleep. | Then *replayed 2014.*', mood: lt => lt > 1.1 ? 'wide' : 'sleepy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'that time I said | “you too”…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 980, '▶ 2014, AGAIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Night skincare. | *Two hours.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;[0, 1, 2].forEach(i => drawBits(x, JAR, { K: INK, G: [GOLD, PINK, MINT][i], W: BONE }, 700 + i * 90, 1000, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2)))
      const n = 3 + Math.floor(prog(lt, 0.4, 2.0) * 11)
      label(x, 790, 760, `STEP ${n} OF 22`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 42, bg: '#ffb34a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Fixed the pillow. | *Forty times.*', mood: 'squint', look: [-1, 1], star: { x: -170 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) { drawBits(x, PILLOW, { W: BONE }, 380, 1080, 24 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 0.06 * Math.sin(lt * 9) }) },
    front(x, t, lt, P) {
      const n = Math.floor(prog(lt, 0.3, 2.0) * 40)
      label(x, 790, 800, `FLUFF #${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 990, 'almost…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Said goodnight | to *everyone.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'night! ♡', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      const n = 1 + Math.floor(prog(lt, 0.4, 2.0) * 22)
      label(x, 790, 940, `GOODNIGHTS: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'In bed by ten. | *Plotting till two.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'phase one…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 940, '1:58 AM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 50, bg: '#6b62a8', color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Early night? | *Booked a 4 a.m. hike.*', mood: 'sparkle', look: [-1, 0], star: { x: 170 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      label(x, 320, 760, 'SUNRISE HIKE', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 320, 920, 'MEET: 4:00 AM', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: '#ff9a3a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Answered one email. | *Then forty.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(prog(lt, 0.5, 2.0) * 39)
      label(x, 320, 820, `REPLIED: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 48, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
      label(x, 320, 980, '11:47 PM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Lay down. | *Invented a toaster.*', mood: lt => lt > 1.0 ? 'sparkle' : 'sleepy', look: [1, -1], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, TOASTER, { A: '#e8a24a', K: INK, S: '#9aa5c4' }, 790, 880, 26 * pop01(t, P.t0 + 0.8, 0.3, 2))
      label(x, 790, 650, 'IT’S TELEPATHIC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.1, 6, 160, 0.5, [MINT, BONE, SKYB])
    } },
  { sign: 'pisces', cap: 'One puppy video. | *Sobbing* till 1.', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      label(x, 790, 660, 'HE GOT ADOPTED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.1, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0024', key: 'D', accent: LAV, ending: 'group',
  title: 'Early bedtime? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Bedtime: 9 p.m. | Asleep: *3 a.m.*',
    moods: ['sleepy', 'sleepy', 'happy', 'sleepy', 'sparkle', 'squint', 'sleepy', 'wink', 'sparkle', 'neutral', 'sleepy', 'sleepy'],
    draw(x, t, lt) { label(x, 540, 740, '☾ NOW: 3:00 AM', pop01(t, t - lt + 1.6, 0.35, 2.4), { size: 40, bg: LAV, rot: -0.03, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
