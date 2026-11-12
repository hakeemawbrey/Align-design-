// r2a0555: star_advice ADVICE ROLLCALL, "What each sign | should stop comparing." (signs3kit social cut, music: lofi · G).
// Ending: group. One warm, specific line per sign about letting go of a comparison, each with a light visual gag:
//   ♈ your speed · ♉ your pace · ♊ this week's you vs last week's · ♋ your family vs the ones online · ♌ your shine
//   · ♍ your draft vs their final copy · ♎ your choices · ♏ your healing timeline · ♐ your path vs a straight line
//   · ♑ your life vs a highlight reel · ♒ your weird vs their normal · ♓ your feelings vs how "fine" others look (tears).
//   group: "Eyes on your path. | It's a good one."
import { makeFilm, sparkles, hearts, bubble, drawBits, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c9a6ff', ST = { x: -180 }
const SNAIL = ['...PPPP....', '..PPLLPP...', '.PPLPPLPP..', '.PLPPPPLP..', '.PPLLLLPP.K', 'GGGGGGGGGGK', 'GGGGGGGGGG.']
const SNAIL_C = { P: '#c98f5a', L: '#ffe27a', G: '#7dd18a', K: INK }

const CAMEOS = [
  { sign: 'aries', cap: 'Your speed to theirs. | *Run your own lap.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'wait, who’s racing?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 800, 880, 'LANE: YOURS', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 38)
      L(x, 800, 1070, 'RIVALS: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Your pace to anyone’s. | *Slow still arrives.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 740 + clamp(lt / 3) * 120, 880, 16 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1070, 'ARRIVED: ON TIME', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'This week’s you | to *last week’s you.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      L(x, 800, 720, 'ME (MON): GREAT', pop01(t, P.t0 + 0.3, 0.3, 2.2), SKYB, 0.04, 30)
      L(x, 800, 830, 'ME (FRI): GREAT', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 800, 1060, 'BOTH: VALID', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Your family to | *the ones online.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1060, 'YOURS: REAL & ENOUGH', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 28)
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 12 })
    } },
  { sign: 'leo', cap: 'Your shine to theirs. | *The sky fits everyone.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'sagittarius', 760, 800, 100, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'sparkle', seed: 55 })
      friend(x, t, 'pisces', 880, 880, 100, pop01(t, P.t0 + 0.55, 0.3, 2), { mood: 'happy', seed: 56, tears: 1 })
      sparkles(x, t, 820, 840, P.t0 + 0.9, 9, 190, 0.7)
      L(x, 800, 1070, 'ROOM FOR ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'virgo', cap: 'Your messy draft | to *their final copy.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 280, head: 'DRAFT 1', headBg: STEEL, headInk: INK, lines: ['~~ idea ~~', 'idk?? maybe', 'arrows →→'], size: 28 })
      L(x, 800, 1080, 'MESS: ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'Your choices | to *everyone else’s.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      if (lt > 0.3) swapLabel(x, 800, 830, lt, 1.2, 'WHAT WOULD THEY DO?', 'WHAT DO I WANT?', { size: 30, toBg: PINK })
      L(x, 800, 1060, 'DECIDED. HAPPY.', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'scorpio', cap: 'Your healing to | *anyone’s timeline.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'HEARTB', 800, 830, 22 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 + 0.05 * Math.max(0, Math.sin(t * 5))))
      L(x, 800, 1060, 'ON YOUR TIME', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Your path to | *a straight line.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.4) * 14)
      x.save(); x.fillStyle = GOLD
      for (let i = 0; i < n; i++) x.fillRect(660 + i * 20, 840 + Math.sin(i * 0.9) * 90, 14, 14)
      x.restore()
      L(x, 800, 1070, 'DETOURS: SCENIC', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Your real life to | *a highlight reel.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, t, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BEST BITS ONLY', headCol: GOLD, lines: [['✦ perfect day', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)], ['✦ perfect hair', PINK, pop01(t, P.t0 + 0.8, 0.25, 2.2)]] })
      L(x, 800, 1090, 'YOURS: THE FULL MOVIE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Your weird | to *their normal.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 830, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 7) * 0.05 })
      L(x, 800, 1060, 'WEIRD: WONDERFUL', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Your feelings to | how *“fine”* others look.', mood: lt => lt > 1.5 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      bits(x, 'TISSUE', 800, 860, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 690, 'feeling is allowed', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 800, 1070, 'HEART: BIG & GOOD', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0555', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign: stop | *comparing this.*',
  cameos: CAMEOS,
  group: { cap: 'Eyes on your path. | *It’s a good one.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
