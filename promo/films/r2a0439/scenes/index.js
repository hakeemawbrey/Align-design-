// r2a0439: star_advice, ADVICE ROLL CALL, "Each sign’s | *first-date tip.*" (signs3kit social cut, music: lofi · E). Ending: card.
//   twelve signs, one warm first-date tip each, with a light gag:
//   ♈ let them finish the menu · ♉ try the new place · ♊ ask, then really listen · ♋ one snack bag is plenty · ♌ ask about
//   them, they're interesting too · ♍ skip the agenda · ♎ you pick the place, you've got this · ♏ skip the deep dive, just ask
//   · ♐ be on time, just once · ♑ leave the laptop · ♒ share the weird fact · ♓ happy tears are allowed
//  49.2   "Nervous? | *Cute, actually.*"   52.4 LESSON: "Be yourself. | It’s the *best tip.*"  DATE: GOING WELL
//  58.3   "Best match? | One who *gets you.*" over the match card: Libra + Aries (Libra picked the place, Aries let them order).
import {
  makeFilm, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, sheet, clock, buddy, drawBits, clamp, prog, ease, lerp,
  LAPTOP, LAPTOP_C, BACKPACK, BACKPACK_C, FRIES, FRIES_C, RED, CREAM, ORANGE, TEAL, WOOD, GREEN,
} from './props.js'

const ROSE = '#ff7aa8'
const MIRROR = ['..GGGGGG..', '.GSSSSSSG.', 'GSSWSSSSSG', 'GSWSSSSSSG', 'GSSSSSSSSG', 'GSSSSSSSSG', 'GSSSSSSSSG', '.GSSSSSSG.', '..GGGGGG..', '....GG....', '...GGGG...']
const MIRROR_C = { G: GOLD, S: '#bfe6ff', W: '#ffffff' }
const EAR = ['..PPPP..', '.PPPPPP.', 'PPP..PPP', 'PP.PP.PP', 'PP.PP.PP', '....PPP.', '...PPP..', '..PPP...', '.PPP....']
const EAR_C = { P: '#ffb38a' }
const COIN = ['..YYYY..', '.YYWWYY.', 'YYWYYYYY', 'YWYYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..']
const COIN_C = { Y: GOLD, W: '#fff1a8' }
const OCTO = ['..PPPP..', '.PPPPPP.', 'PPKPPKPP', 'PPPPPPPP', '.PPPPPP.', 'P.P..P.P', 'P.P..P.P', '.P.PP.P.']
const OCTO_C = { P: '#ff8fb1', K: INK }

const CAMEOS = [
  { sign: 'aries', cap: 'Let them | *finish the menu.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 300, h: 340, head: 'MENU', headCol: '#ff8a7a', size: 26, rows: [
        ['soup', INK, at(t, P, 0.3)], ['pasta', INK, at(t, P, 0.4)], ['p.2…', INK, at(t, P, 0.5)], ['p.3…', INK, at(t, P, 0.6)],
      ] })
      L(x, 790, 1110, 'DEEP BREATH', at(t, P, 1.3), GOLD, 0.04, 32)
    } },
  { sign: 'taurus', cap: 'Try the | *new place.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'a NEW place?', at(t, P, 0.2, 0.25), { size: 44, tail: 'bl' })
      drawBits(x, FRIES, FRIES_C, 790, 930, 18 * at(t, P, 0.8))
      L(x, 790, 1130, 'THEY HAVE FRIES TOO', at(t, P, 1.4), MINT, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'Ask a question. | *Then really listen.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      drawBits(x, EAR, EAR_C, 790, 860, 22 * at(t, P, 0.3), { sx: 1 + 0.06 * Math.sin(t * 6) })
      L(x, 790, 640, 'LISTENING MODE: ON', at(t, P, 1.0), '#ffe35a', -0.04, 30)
    } },
  { sign: 'cancer', cap: 'One snack bag | is *plenty.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt < 1.2 ? Math.min(4, 1 + Math.floor(lt / 0.3)) : 1
      for (let i = 0; i < n; i++) drawBits(x, BACKPACK, BACKPACK_C, 700 + (i % 2) * 180, 820 + Math.floor(i / 2) * 200, 12 * at(t, P, 0.1 + i * 0.25))
      if (lt > 1.2) L(x, 790, 1120, 'OK, MAYBE TWO', at(t, P, 1.5), PINK, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Ask about them. | *They’re interesting too.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 820, 860, 20 * (1 - ease.inCubic(prog(lt, 0.7, 1.1))) * at(t, P, 0.15))
      buddy(x, t, 'pisces', 800, 920, 210, at(t, P, 1.1, 0.35, 2), { mood: 'heart', look: [-1, 0], seed: 91 })
      L(x, 800, 650, 'MIRROR: PUT AWAY', at(t, P, 1.4), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Skip | the *agenda.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 320, h: 340, head: 'DATE AGENDA', headCol: '#b6e08a', size: 26, rows: [
        ['7:00 hello', INK, 1, clamp((lt - 0.8) * 3)], ['7:05 small talk', INK, 1, clamp((lt - 1.0) * 3)], ['7:20 laugh', INK, 1, clamp((lt - 1.2) * 3)],
      ] })
      L(x, 790, 1100, 'JUST… ENJOY IT', at(t, P, 1.5), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'You pick the place. | *You’ve got this.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = prog(lt, 0.2, 1.2)
      drawBits(x, COIN, COIN_C, 790, 860 - Math.sin(Math.PI * fl) * 200, 18 * at(t, P, 0.1), { sy: Math.cos(fl * 18) || 0.1 })
      label(x, 790, 1100, 'NO COIN NEEDED', at(t, P, 1.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Skip the deep dive. | *Just ask.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'so… what’s | your sign?', at(t, P, 0.3, 0.25), { size: 42, col: '#d8b8ff', tail: 'bl' })
      L(x, 790, 1060, 'MYSTERY: FUN', at(t, P, 1.3), '#b07bff', -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Be on time. | *Just this once.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      clock(x, 790, 830, at(t, P, 0.15), 7, Math.floor(clamp(lt / 1.3) * 58) % 60, 110)
      L(x, 790, 1070, '6:59. A MIRACLE.', at(t, P, 1.4), ORANGE, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Leave | the *laptop.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.8, 1.3))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, LAPTOP, LAPTOP_C, lerp(790, 1150, go), 880, 20 * at(t, P, 0.15))
      x.restore()
      L(x, 790, 660, 'OUT OF OFFICE', at(t, P, 1.3), SKYB, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Share | the *weird fact.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, OCTO, OCTO_C, 790, 900 + 8 * Math.sin(t * 3), 22 * at(t, P, 0.2))
      bubble(x, 790, 660, 'octopuses have | three hearts!', at(t, P, 0.6, 0.25), { size: 34, tail: 'bl' })
      L(x, 790, 1120, 'DATE: CHARMED', at(t, P, 1.5), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Happy tears | are *allowed.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re so | nice!!', at(t, P, 0.3, 0.25), { size: 44, tail: 'bl' })
      L(x, 790, 1060, 'TISSUES: PACKED', at(t, P, 1.3), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0439', key: 'E', accent: ROSE, ending: 'card',
  title: 'Each sign’s | *first-date tip.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'aries', chip: 'ALIGNED' },
  group: {
    cap: 'Nervous? | *Cute, actually.*',
    moods: ['wide', 'happy', 'sparkle', 'heart', 'heart', 'happy', 'sparkle', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'],
  },
  lesson: { text: 'Be yourself. | It’s the *best tip.*', chip: 'DATE: GOING WELL' },
  last: { text: 'Best match? | One who *gets you.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
