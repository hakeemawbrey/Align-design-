// r2t0497: star_talk, ROLLCALL, "The signs on | *the longest day.*" (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order on the longest day of the year, each pushed to the extreme. Ending: lesson.
//   ♈ up at dawn, ran three races · ♉ napped through most of it · ♊ made fourteen plans · ♋ watched the sunset,
//   called mom about it · ♌ thanked the sun as a colleague · ♍ scheduled every extra minute · ♎ still choosing an
//   outfit · ♏ stayed in, blinds closed · ♐ chased the sunset by car · ♑ extra daylight, extra overtime
//   · ♒ threw the sun a party · ♓ cried at the sunset, all of it
//   group "So much sun. | *Not enough nap.*"   lesson "Long days pass. | Spend them *your way.*"   last "Taurus is | *still napping.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', YEL = '#ffe36b', ORANGE = '#ff9a4a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })

const SUN = ['..Y..Y..Y..', '...........', 'Y..YYYYY..Y', '..YYYYYYY..', '..YYYYYYY..', 'Y.YYYYYYY.Y', '..YYYYYYY..', '..YYYYYYY..', 'Y..YYYYY..Y', '...........', '..Y..Y..Y..']
const HAMMOCK = ['B..............B', 'B..............B', 'BW............WB', 'B.WW........WW.B', 'B...WWWWWWWW...B', 'B..............B']
const PHONE = ['KKKKKKKK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KSSSSSSK', 'KKKWWKKK']
const BLINDS = ['KKKKKKKKKKKK', 'KBBBBBBBBBBK', 'KbbbbbbbbbbK', 'KBBBBBBBBBBK', 'KbbbbbbbbbbK', 'KBBBBBBBBBBK', 'KbbbbbbbbbbK', 'KBBBBBBBBBBK', 'KbbbbbbbbbbK', 'KKKKKKKKKKKK']
const CAR = ['....KKKKKK....', '...KSSKSSSK...', '..KSSSKSSSSK..', 'KKRRRRRRRRRRKK', 'KRRRRRRRRRRRYK', 'KRRRRRRRRRRRRK', '.KK.KK..KK.KK.', '..KKK....KKK..']
const CAR_C = { K: INK, S: SKYB, R: '#b38bff', Y: YEL }
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const LAPTOP_C = { K: INK, S: '#6fc3ff', G: '#9aa5c4' }
const HAT = ['....P....', '...PYP...', '..PPPPP..', '..PYPYP..', '.PPPPPPP.', 'PYPPYPPYP']
const HAT_C = { P: PINK, Y: YEL }

function sunsetSky(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 260)
  const g = x.createLinearGradient(0, -122, 0, 122); g.addColorStop(0, '#ff8fb1'); g.addColorStop(0.6, ORANGE); g.addColorStop(1, '#5a3a7a')
  x.fillStyle = g; x.fillRect(-162, -122, 324, 244)
  x.fillStyle = YEL; x.beginPath(); x.arc(0, 40 + lt * 20, 56, Math.PI, 0); x.fill()
  x.fillStyle = '#2a2350'; x.fillRect(-162, 60, 324, 62)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Up at dawn. | Ran *three races.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 2.99)
      L(x, 790, 700, `RACE ${n} OF 3`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, 0.05, 44)
      L(x, 790, 860, '5:12 A.M.', pop01(t, P.t0 + 0.7, 0.3, 2.2), BONE, -0.05, 34)
      bubble(x, 790, 1060, 'what now??', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Napped through | *most of it.*', mood: 'sleepy', star: { x: -40, y: 20 },
    back(x, t, lt, P) { drawBits(x, HAMMOCK, { B: BROWN, W: CREAM }, 500, 950, 28 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${40 + i * 10}px ${INTER}`; x.fillText('z', 700 + ph * 120 + i * 20, 720 - ph * 140); x.restore() }
      L(x, 790, 600, 'DAYLIGHT: 16 HRS', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 30)
      L(x, 790, 1150, 'AWAKE: 2', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.05, 32)
    } },
  { sign: 'gemini', cap: 'Made plans. | *Fourteen of them.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.6) * 13.99)
      L(x, 790, 720, `PLAN ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.05, 54)
      const ideas = ['brunch!', 'beach!', 'museum!', 'karaoke!', 'picnic!']
      bubble(x, 790, 920, ideas[Math.floor(lt * 3) % 5], pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 1110, 'ATTENDED: 0', pop01(t, P.t0 + 1.9, 0.3, 2.4), PINK, -0.05, 30)
    } },
  { sign: 'cancer', cap: 'Watched the sunset. | *Called mom about it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      sunsetSky(x, 790, 760, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      drawBits(x, PHONE, { K: INK, S: '#6fc3ff', W: BONE }, F.x + 150, F.cy, 10 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: 0.2 })
      bubble(x, 790, 1050, 'mom. MOM. look.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Thanked the sun. | *As a colleague.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SUN, { Y: YEL }, 800, 680, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: t * 0.3 })
      bubble(x, 790, 920, 'great work today, | colleague.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1120, 'BOTH STARS', pop01(t, P.t0 + 1.7, 0.3, 2.4), ORANGE, -0.05, 34)
    } },
  { sign: 'virgo', cap: 'Scheduled every | *extra minute.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -200, 320, 400); x.fillStyle = CREAM; x.fillRect(-152, -192, 304, 384)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        const R = ['8:58 PM  sunset', '8:59 PM  admire', '9:00 PM  reflect', '9:01 PM  stretch', '9:02 PM  hydrate', '9:03 PM  sleep']
        R.forEach((r, i) => { x.fillText(r, -132, -150 + i * 60); if (lt > 0.5 + i * 0.2) { x.fillStyle = '#2fc79a'; x.fillText('✓', 118, -150 + i * 60); x.fillStyle = INK } })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Still choosing | *an outfit.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp(lt / 2) * 22)
      L(x, 790, 720, `OUTFIT ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 0.05, 48)
      L(x, 790, 900, lt > 1.6 ? 'SUN: SET' : 'SUN: UP', pop01(t, P.t0 + 0.6, 0.3, 2.2), lt > 1.6 ? LAV : GOLD, -0.05, 36)
      bubble(x, 790, 1080, 'hmm, the blue?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Stayed inside. | *Blinds closed.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, BLINDS, { K: INK, B: '#5a3a7a', b: '#3a2a5a' }, 790, 840, 26 * k)
      if (k > 0.9 && lt > 0.8) { x.save(); x.globalAlpha = 0.5; x.fillStyle = YEL; x.fillRect(650, 830, 300, 8); x.restore() }
      bubble(x, 790, 1120, 'too bright.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Chased the sunset. | *Three states west.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const p = prog(lt, 0.2, 2.2)
      sunsetSky(x, 790, 720, pop01(t, P.t0 + 0.15, 0.3, 2), 0)
      drawBits(x, CAR, CAR_C, lerp(660, 860, p), 960, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 1120, 'STILL DRIVING', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Extra daylight? | *Extra overtime.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const h = 8 + Math.floor(clamp((lt - 0.3) / 1.6) * 8)
      L(x, 790, 660, `HOURS: ${h}`, pop01(t, P.t0 + 0.4, 0.3, 2), MINT, 0.05, 42)
      L(x, 790, 1120, 'SUN CLOCKED OUT FIRST', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.05, 26)
    } },
  { sign: 'aquarius', cap: 'Threw a party. | *For the sun.*', mood: 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SUN, { Y: YEL }, 790, 860, 18 * k, { rot: t * 0.3 })
      drawBits(x, HAT, HAT_C, 790, 700, 12 * pop01(t, P.t0 + 0.7, 0.3, 2.4), { rot: 0.1 })
      L(x, 790, 1110, 'GUEST OF HONOUR', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.05, 32)
      sparkles(x, t, 790, 800, P.t0 + 1.0, 7, 160, 0.5)
    } },
  { sign: 'pisces', cap: 'Cried at the sunset. | *All four hours.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sunsetSky(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      L(x, 790, 1080, 'TISSUES: OUT', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.05, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0497', key: 'E', accent: ACC,
  title: 'The signs on | *the longest day.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'So much sun. | *Not enough nap.*' },
  lesson: { text: 'Long days pass. | Spend them *your way.*', chip: 'DAYLIGHT: USED' },
  last: { text: 'Taurus is | *still napping.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
