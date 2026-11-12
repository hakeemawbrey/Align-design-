// r2a0207: star_advice, ADVICE SOLO, "Aquarius, you belong | here too." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the sign that feels like the odd one out, gently let in.
//   0.0–3.6    "Aquarius, you belong | *here too.*"
//   3.6–37.8   nine cards (3.8 s each): odd one out, odd is our favourite · weird joke at dinner, someone laughed
//              · weird in the group chat, it's better with you · watching from the edge, a seat is saved · niche hobby,
//              your people exist · big ideas, we're all ears · rather text than hug, that counts · feel like an alien,
//              aliens get invited too · leaving early again, stay for cake
//  37.8        "Different. | *Definitely one of us.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "You don’t have to blend in | *to belong.*"  STATUS: INCLUDED
//  46.9        "Your seat? | *Still saved.*"  the reserved chair comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const S = 'aquarius', ACC = '#6fc3ff'
const ST = { x: -190 }

const CHAIR = ['RR........', 'RR........', 'RR........', 'RR........', 'RR........', 'RRrrrrrrrr', 'RRRRRRRRRR', 'RR......RR', 'RR......RR', 'RR......RR', 'RR......RR']
const CHAIR_C = { R: '#8a4a2e', r: '#c98f2a', B: '#8a4a2e' }
const ROBOT = ['...KK...', '..KKKK..', 'GGGGGGGG', 'GWWGGWWG', 'GGGGGGGG', 'GGRRRRGG', '.GGGGGG.', 'G.GGGG.G', '..G..G..']
const ROBOT_C = { K: GOLD, G: '#9aa5c4', W: SKYB, R: '#e23d4e' }
const BULB = ['..YYYY..', '.YYWYYY.', 'YYWYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..', '..GGGG..', '..GGGG..', '...GG...']
const BULB_C = { Y: SUN, W: '#fff', G: '#9aa5c4' }
const UFO = ['.....SSS.....', '....SSSSS....', '..GGGGGGGGG..', 'GGGYGGYGGYGGG', '..GGGGGGGGG..']
const UFO_C = { S: SKYB, G: '#9aa5c4', Y: GOLD }
const DOOR = ['KKKKKKKKK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBGBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KBBBBBBBK', 'KKKKKKKKK']
const CAKE = ['...F.F.F...', '...W.W.W...', '.PPPPPPPPP.', 'PPWPPWPPWPP', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'PPPPPPPPPPP', 'CCCCCCCCCCC']
const CAKE_C = { F: GOLD, W: '#fff', P: PINK, C: '#fff4e2' }

/** a reserved chair with a little sign on it */
function seat(x, cx, cy, k, txtS = 'SAVED: AQUARIUS') {
  if (k <= 0.01) return
  drawBits(x, CHAIR, CHAIR_C, cx, cy + 40 * k, 28 * k)
  label(x, cx, cy - 130 * k, txtS, k, { size: 32, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
}

const CAMEOS = [
  { sign: S, cap: 'The odd one out? | *Odd is our favourite.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const COLS = [GREY, GREY, GREY, GREY, GREY, ACC]
      COLS.forEach((c, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.07, 0.3, 2); if (k < 0.01) return; const cx = 700 + (i % 3) * 90, cy = 780 + Math.floor(i / 3) * 110; x.fillStyle = INK; if (i === 5) { drawBits(x, ['..S..', '.SSS.', 'SSSSS', '.S.S.'], { S: ACC }, cx, cy, 14 * k) } else { x.beginPath(); x.arc(cx, cy, 38 * k, 0, Math.PI * 2); x.fill(); x.fillStyle = c; x.beginPath(); x.arc(cx, cy, 32 * k, 0, Math.PI * 2); x.fill() } })
      label(x, 790, 1080, 'FAVOURITE: THIS ONE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: ACC, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) hearts(x, t, 880, 900, P.t0 + 1.4 * 1.29, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Weird joke at dinner? | *Someone laughed.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'what if clouds | had birthdays?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1000, 190 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.3, P.t0 + 1.7] })
      label(x, 820, 1150, 'HA HA HA!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Weird in the group chat? | *It’s better with you.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP', headCol: ACC, lines: [['pigeons are spies', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['LOL', MINT, pop01(t, P.t0 + 0.9, 0.25, 2)], ['saving this', MINT, pop01(t, P.t0 + 1.2, 0.25, 2)], ['more please', GOLD, pop01(t, P.t0 + 1.6, 0.25, 2.4)]] })
    } },
  { sign: S, cap: 'Watching from the edge? | *There’s a seat saved.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      seat(x, 790, 950, pop01(t, P.t0 + 0.4, 0.35, 2))
      sparkles(x, t, 790, 900, P.t0 + 0.6, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Niche hobby? | *Your people exist.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ROBOT, ROBOT_C, 630, 1020, 14 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'virgo', 860, 880, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 1.3] }); drawBits(x, ROBOT, ROBOT_C, 880, 1050, 12 * k) }
      label(x, 790, 680, 'MATCH: SAME HOBBY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big, strange ideas? | *We’re all ears.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BULB, BULB_C, 560, 610, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;['taurus', 'cancer', 'libra'].forEach((id, i) => { const k = pop01(t, P.t0 + 0.7 + i * 0.12, 0.3, 2); if (k > 0.01) signChar(x, t, id, 700 + i * 120, 960 - (i % 2) * 30, 120 * k, { mood: lt > 1.3 ? 'sparkle' : 'wide', look: [-1, -1], seed: 30 + i, glyph: false }) })
      label(x, 820, 720, 'IDEA #47', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: SUN, rot: 0.04, font: MONO, weight: 700 })
      label(x, 820, 1120, 'TELL US MORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rather text than hug? | *That counts as love.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TO: BESTIE', headCol: PINK, lines: [['sending a hug', BONE, pop01(t, P.t0 + 0.5, 0.25, 2)], ['(digital)', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)], ['received ♡', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.4)]] })
      if (lt > 1.4) hearts(x, t, 790, 760, P.t0 + 1.4 * 1.29, { n: 5, life: 1.5, spread: 200, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Feel like an alien? | *Aliens get invited too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, UFO, UFO_C, 800 + Math.sin(t * 2) * 20, 650, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      card(x, 790, 940, 320, 200, pop01(t, P.t0 + 0.8, 0.35, 2), { bg: CREAM, rot: -0.05 }, () => {
        txt(x, 'YOU’RE', 0, -40, { size: 40 }); txt(x, 'INVITED', 0, 20, { size: 40, color: '#2f7fd0' }); txt(x, '(plus one ufo)', 0, 70, { size: 24, color: '#6b62a8' })
      })
    } },
  { sign: S, cap: 'Leaving early again? | *Stay for cake.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -110 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { drawBits(x, DOOR, { K: INK, B: '#8a4a2e', G: GOLD }, 230, 860, 28 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 820, 960, 18 * pop01(t, P.t0 + 0.7, 0.35, 2))
      bubble(x, 800, 680, 'one slice?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 820, 1130, 'STAYED: 3 HOURS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0207', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aquarius, you | belong *here too.*',
  cameos: CAMEOS,
  group: { cap: 'Different. | *Definitely one of us.*', mood: 'sparkle' },
  lesson: { text: 'You don’t have to blend in | *to belong.*', chip: 'STATUS: INCLUDED' },
  last: {
    text: 'Your seat? | *Still saved.*',
    draw(x, t, lt) { seat(x, 800, 1330, pop01(t, t - lt + 0.4, 0.4, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
