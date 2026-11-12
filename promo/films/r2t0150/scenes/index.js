// r2t0150: THE SIGNS AS… v3, SOLO film, "Aries on a day off | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine "relaxing" moments, each the most extreme (and lovable) Aries version.
//   0.0–3.6    "Aries on a day off | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              no alarm, up at 5 a.m. anyway · planned to relax, ran a half marathon · tried meditating, lasted forty
//              seconds · bought a guitar, started a band the same day · texted the group "who's up for ANYTHING?"
//              · watched a movie at double speed · tried a nap, three minutes, refreshed · no work today, visited work to say hi
//              · opened their matches, three dates tonight
//  37.8        "Day off. | *Zero chill.*"
//  41.2        callback: "Day two? | *41 seconds.*"  the meditation timer comes back: NEW RECORD.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'aries', AR = '#f0603a'
const ST = { x: -180 }

const CUSHION = ['..PPPPPPPPPP..', '.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
const GUITAR = ['..........KK', '.........KWK', '........KWK.', '.......KWK..', '..OOO.KWK...', '.OOOOOWK....', 'OOOKOOOO....', 'OOKKKOOO....', 'OOOKOOOO....', '.OOOOOO.....', '..OOOO......']
const GUITAR_C = { K: INK, W: WOOD, O: ORANGE }
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '....K..K....', '...KKKKKK...']
const BED = ['WW..........', 'WWPPPPPPPPPP', 'WWPPPPPPPPPP', 'BBBBBBBBBBBB', 'B..........B']
const BED_C = { W: '#fff4e2', P: '#e8775a', B: '#8a4a2e' }
const OFFICE = ['KKKKKKKKKK', 'KWWKWWKWWK', 'KWWKWWKWWK', 'KKKKKKKKKK', 'KWWKWWKWWK', 'KWWKWWKWWK', 'KKKKKKKKKK', 'KWWKDDKWWK', 'KWWKDDKWWK', 'KKKKKKKKKK']
const OFFICE_C = { K: '#5a5f80', W: '#cfeeff', D: WOOD }

/** a big digital timer */
function timer(x, cx, cy, k, s, { col = MINT } = {}) {
  card(x, cx, cy, 300, 140, k, { bg: '#14202a', rot: 0.03 }, () => {
    txt(x, `0:${String(Math.floor(s)).padStart(2, '0')}`, 0, 4, { size: 84, font: MONO, weight: 700, color: col })
  })
}

const CAMEOS = [
  { sign: S, cap: 'No alarm set. | Up at *5 a.m. anyway.*', mood: lt => lt > 0.9 ? 'wide' : 'sleepy', star: ST, hops: [1.0],
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.2, 0.35, 2), 5, 0)
      label(x, 790, 1040, 'ALARM: OFF', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'GOOD MORNING!!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Planned to relax. | *Ran a half marathon.*', mood: 'sparkle', star: { x: -180 }, hops: [0.3, 0.6, 0.9, 1.2, 1.5, 1.8],
    back(x, t, lt, P, F) {
      x.fillStyle = 'rgba(239,230,214,0.6)'
      for (let i = 0; i < 4; i++) { const ph = (t * 2 + i * 0.25) % 1; x.globalAlpha = 1 - ph; x.fillRect(F.x - 170 - ph * 120, F.cy - 60 + i * 40, 80, 8) }
      x.globalAlpha = 1
    },
    front(x, t, lt, P) {
      const km = Math.round(lerp(1, 21, clamp((lt - 0.3) / 1.6)))
      label(x, 790, 780, `KM ${km}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 64, bg: AR, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, '“RELAXING”', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Tried meditating. | Lasted *forty seconds.*', mood: lt => lt > 1.6 ? 'wide' : 'sleepy', star: { x: -180, y: -20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P, F) { drawBits(x, CUSHION, { P: LAV }, F.x, 1060, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      timer(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), Math.min(40, lerp(0, 40, clamp((lt - 0.4) / 1.3))), { col: lt > 1.7 ? RED : MINT })
      label(x, 790, 1020, lt > 1.7 ? 'OKAY DONE.' : 'BE STILL…', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: lt > 1.7 ? AR : LAV, color: lt > 1.7 ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Bought a guitar. | *Started a band. Same day.*', mood: 'sparkle', star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P, F) {
      drawBits(x, GUITAR, GUITAR_C, F.x + 150, F.cy + 30, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      notes(x, t, 700, 860, { n: 4, cell: 7, col: AR, seed: 3 })
      label(x, 790, 650, 'BAND NAME: RAM', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, 'FIRST GIG: 8 P.M.', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted the group: | *“who’s up for ANYTHING?”*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: AR, lines: [['who’s up for', GOLD, pop01(t, P.t0 + 0.4, 0.25, 2)], ['ANYTHING??', GOLD, pop01(t, P.t0 + 0.6, 0.25, 2.4)], ['it’s 6 a.m.', BONE, pop01(t, P.t0 + 1.3, 0.25, 2)], ['…', BONE, pop01(t, P.t0 + 1.7, 0.25, 2)]] })
    } },
  { sign: S, cap: 'Watched a movie. | *At double speed.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, TV, { K: INK, S: '#6b62a8' }, 790, 860, 22 * k)
      if (k > 0.9) { x.fillStyle = [PINK, MINT, GOLD, SKYB][Math.floor(t * 12) % 4]; x.fillRect(690, 770, 200, 110) }
      label(x, 790, 1080, '▶▶ 2×', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'skip the slow bit', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Tried a nap. | *Three minutes. Refreshed!*', mood: lt => lt > 1.2 ? 'sparkle' : 'sleepy', star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 980, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 780, lt > 1.2 ? 'NAP: 3 MIN' : 'NAP: …', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 620, 'BACK!', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 48, tail: 'bl' })
    } },
  { sign: S, cap: 'No work today. | Visited *work to say hi.*', mood: 'sparkle', star: ST, hops: [1.0],
    back(x, t, lt, P) { drawBits(x, OFFICE, OFFICE_C, 800, 880, 30 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'hi team!!', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 44, tail: 'bl' })
      label(x, 800, 1130, 'STAYED 6 HOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Opened their matches. | *Three dates. Tonight.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ MATCHES', headCol: PINK, lines: [['date 1: 6 pm', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['date 2: 8 pm', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['date 3: 10 pm', BONE, pop01(t, P.t0 + 1.2, 0.25, 2)], ['efficient!', GOLD, pop01(t, P.t0 + 1.7, 0.25, 2.4)]] })
      if (lt > 1.2) hearts(x, t, 560, 980, P.t0 + 1.2 * 1.29, { n: 5, life: 1.7, spread: 120, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2t0150', key: 'F', accent: AR, solo: S, ending: 'callback',
  title: 'Aries on a day off | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Day off. | *Zero chill.*', mood: 'sparkle' },
  last: {
    text: 'Day two? | *41 seconds.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      drawBits(x, CUSHION, { P: LAV }, 330, 1170, 20 * k)
      if (k > 0.01) signChar(x, t, S, 330, 1060, 260 * k, { mood: lt > 1.6 ? 'sparkle' : 'sleepy', seed: 46, hops: [t - lt + 1.7] })
      timer(x, 750, 1000, 1.1 * pop01(t, t - lt + 0.8, 0.35, 2), Math.min(41, lerp(30, 41, clamp((lt - 0.9) / 0.8))))
      label(x, 760, 1170, 'NEW RECORD!', pop01(t, t - lt + 1.8, 0.3, 2.6), { size: 44, bg: GOLD, rot: -0.06, font: MONO, weight: 700 })
      sparkles(x, t, 750, 1000, t - lt + 1.8, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
