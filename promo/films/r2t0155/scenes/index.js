// r2t0155: star_talk BELIKE, "“Who goes first?” | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · F).
// (topic: zodiacs when they're asked to speak first.) Ending: 'group'.
//   0.0–3.6    "“Who goes first?” | Zodiacs *be like.*"
//   3.6–49.2   ♈ already talking, before the question · ♉ "pass," not leaving this chair · ♊ three stories at once
//              · ♋ starts with a thank-you speech · ♌ already at the podium · ♍ forty cue cards · ♎ "no, you go!"
//              · ♏ one stare, someone else volunteers · ♐ "so, on my road trip—" · ♑ an agenda for the intro
//              · ♒ answers a different question · ♓ cried before saying their name
//  49.2        "So… | *who’s going first?*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#c9a6ff', L = { x: -160 }, R = { x: 160 }
const MIC = ['.KKK.', 'KGGGK', 'KGGGK', 'KGGGK', '.KKK.', '..K..', '..K..', '..K..', '..K..', '.KKK.']
const CHAIR = ['RR........', 'RR........', 'RR........', 'RR........', 'RRRRRRRRRR', 'RRRRRRRRRR', 'WW......WW', 'WW......WW', 'WW......WW']
const PODIUM = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', '..PPPPPPPP..', '..PPPGGPPP..', '..PPPPPPPP..', '..PPPPPPPP..', '..PPPPPPPP..', '.PPPPPPPPPP.']

const CAMEOS = [
  { sign: 'aries', cap: 'Already talking. | *Before the question.*', mood: 'sparkle', look: [1, 0], star: L, hops: [0.4, 0.9],
    front(x, t, lt, P) {
      drawBits(x, MIC, { K: INK, G: GREY }, 560, 980, 16 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.2 })
      bubble(x, 800, 720, 'okay so first—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      label(x, 800, 980, 'QUESTION: NOT ASKED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“Pass.” | *Not leaving this chair.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -160, y: -20 },
    back(x, t, lt, P, F) { drawBits(x, CHAIR, { R: GREEN, W: WOOD }, F.x + 20, F.cy + 90, 26 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'pass.', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 64, col: CREAM, tail: 'bl' })
      label(x, 790, 980, 'ROOTED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 44, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Says yes. | Tells *three stories at once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const W = ['so my cousin—', 'oh, the boat!', 'wait, the cake—']
      W.forEach((s, i) => bubble(x, 760 + (i % 2) * 40, 660 + i * 170, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 36, col: [CREAM, MINT, GOLD][i], tail: 'bl' }))
    } },
  { sign: 'cancer', cap: 'Starts with | *a thank-you speech.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const L2 = ['first, my mom.', 'then my nan.', 'and all of you.']
      const n = Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.5))
      bubble(x, 790, 760, L2[n - 1], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      label(x, 790, 1020, `THANKED: ${n * 7}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 38, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) hearts(x, t, 370, 860, P.t0 + 1.3 * 1.29, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Already | *at the podium.*', mood: 'sparkle', look: [1, 0], star: { x: -160, y: -60 }, hops: [0.6],
    front(x, t, lt, P, F) {
      drawBits(x, PODIUM, { W: CREAM, P: ORANGE, G: GOLD }, F.x, 1080, 24 * pop01(t, P.t0 + 0.1, 0.3, 2))
      label(x, 790, 760, 'BEEN READY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'hold your | applause.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: CREAM, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Brought | *forty cue cards.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(10, Math.floor(Math.max(0, lt - 0.2) / 0.1))
      for (let i = 0; i < n; i++) card(x, 790 + Math.sin(i * 1.7) * 14, 980 - i * 26, 260, 160, 1, { bg: i % 2 ? CREAM : '#ffe7a8', rot: Math.sin(i * 2.3) * 0.06 }, () => { if (i === n - 1) { txt(x, 'CARD 1/40', 0, -40, { size: 28, font: MONO, weight: 700 }); txt(x, '“Hello.”', 0, 20, { size: 34 }) } })
      label(x, 790, 640, 'ALPHABETIZED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“No, you go!” | *“No, YOU go!”*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aquarius', 840, 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      const flip = Math.floor(lt * 2.5) % 2
      bubble(x, flip ? 840 : 600, 700, flip ? 'no, YOU!' : 'you go!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: flip ? SKYB : PINK, tail: flip ? 'bc' : 'bl' })
      label(x, 790, 1150, 'MEETING: 40 MIN LATE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'One stare. | *Someone else volunteers.*', mood: 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1000, 180 * k, { mood: lt > 1.1 ? 'wide' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.2 * 1.29] })
      bubble(x, 830, 760, 'I’ll go!!', pop01(t, P.t0 + 1.2 * 1.29, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Opens with | *“so, on my road trip—”*', mood: 'sparkle', look: [-1, 0], star: R, hops: [0.8],
    front(x, t, lt, P) {
      bubble(x, 330, 700, 'so, on my | road trip—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: CREAM, tail: 'br' })
      label(x, 330, 960, 'STORY LENGTH: ∞', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Made an agenda | *for the intro.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      card(x, 330, 860, 320, 400, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        x.fillStyle = WOOD; x.fillRect(-60, -215, 120, 34)
        txt(x, 'AGENDA', 0, -140, { size: 36, font: MONO, weight: 700 })
        const A = ['1. name', '2. sign', '3. 5-yr plan']
        A.forEach((s, i) => { if (lt > 0.5 + i * 0.3) txt(x, s, -130, -60 + i * 70, { size: 36, align: 'left' }) })
      })
      label(x, 330, 1120, 'TIME: 0:45 EACH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: GREEN, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Answers | *a different question.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'name?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: GREY, tail: 'br' })
      bubble(x, 790, 900, 'what if fish | could vote?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Cried before | *saying their name.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'hi, i’m—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: CREAM, tail: 'bl' })
      label(x, 790, 980, 'TISSUES: PASSED', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0155', key: 'F', accent: ACC, ending: 'group',
  title: '“Who goes first?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'So… | *who’s going first?*', moods: ['sparkle', 'sleepy', 'wink', 'heart', 'sparkle', 'squint', 'wink', 'neutral', 'sparkle', 'neutral', 'happy', 'wide'] },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
