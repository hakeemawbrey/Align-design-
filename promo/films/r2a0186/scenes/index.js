// r2a0186: star_advice, ADVICE SOLO (Leo), "Leo, you're allowed | to ask for help." (~51 s vertical, signs3kit social cut,
// music: lofi · D). Nine cards: a relatable Leo truth + a warm reframe, one light gag each. Ending: lesson.
//   0.0–3.6    "Leo, you're allowed | *to ask for help.*"
//   3.6–37.8   carries a tower of boxes, a friend takes one · barbell, "spot me?" · Gemini waves a GO LEO!! sign
//              · a little "HELP?" sign, raised bravely · the spotlight dims, cosy blanket · a group chat answers "omw!"
//              · the smiley mask comes down · a gift box marked HELP · even the sun gets a cloud day
//  37.8        "Big heart. | *Bigger with backup.*"
//  41.0        LESSON: "Let someone in. | You *shine* brighter."  HELP: ACCEPTED
//  46.9        "Ask today. | *We'll bring snacks.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, phone, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const S = 'leo', ACC = '#ffb34a', L = { x: -160 }
const BOX = ['BBBBBBBBBB', 'BbbbbTTbbB', 'BbbbbTTbbB', 'BBBBBBBBBB', 'BbbbbbbbbB', 'BbbbbbbbbB', 'BBBBBBBBBB']
const BOX_C = { B: '#c98f4a', b: '#e0b070', T: '#f2e0b0' }
const BAR = ['WW..................WW', 'WW..................WW', 'WWGGGGGGGGGGGGGGGGGGWW', 'WW..................WW', 'WW..................WW']
const BAR_C = { W: '#2a2350', G: GREY }
const MASK = ['..MMMMM..', '.MMMMMMM.', 'MMKMMMKMM', 'MMMMMMMMM', 'MKMMMMMKM', 'MMKKKKKMM', '.MMMMMMM.', '..MMMMM..', '....S....', '....S....', '....S....', '....S....']
const GIFT = ['...R.R...', '..R.R.R..', 'GGGGRGGGG', 'GGGGRGGGG', 'gggGRGggg', 'gggGRGggg', 'gggGRGggg', 'gggGRGggg', 'gggGRGggg']
const CLOUD = ['....WWWW......', '...WWWWWW.WW..', '.WWWWWWWWWWWW.', 'WWWWKWWWWKWWWW', 'WWWWWWWWWWWWWW', '.WWWWWKKWWWWW.', '..WWWWWWWWWW..']
const BLANKET = ['PPPPPPPPPPPPPPPP', 'PpPPpPPpPPpPPpPP', 'PPPPPPPPPPPPPPPP', 'PPpPPpPPpPPpPPpP', 'PPPPPPPPPPPPPPPP']
const SNACK = ['..YYYY..', '.YYRYYY.', 'YYYYYRYY', 'YRYYYYYY', 'YYYYRYYY', 'YYRYYYRY', '.YYYYYY.', '..YYYY..']

/** a little friend star that hops in from the right */
function friend(x, t, P, id, cx, cy, at, s = 200, mood = 'happy', look = [-1, 0]) {
  const k = pop01(t, P.t0 + at, 0.4, 2)
  if (k > 0.01) return signChar(x, t, id, cx, cy, s * k, { mood, look, seed: 13, glyph: false, hops: [P.t0 + at + 0.6] })
}

const CAMEOS = [
  { sign: S, cap: 'You carry everyone. | *Let them carry you.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.15) / 0.18) + 1)
      const take = ease.inOutCubic(prog(lt, 1.1, 1.6))
      for (let i = 0; i < n; i++) {
        const top = i === n - 1 && n === 4
        const bx = top ? lerp(F.x, 760, take) : F.x, by = top ? lerp(F.top - 40 - i * 60, 900, take) : F.top - 40 - i * 60
        drawBits(x, BOX, BOX_C, bx + (i % 2 ? 6 : -6), by, 12)
      }
      friend(x, t, P, 'cancer', 800, 1010, 0.8, 200, lt > 1.4 ? 'heart' : 'happy')
      bubble(x, 820, 650, 'I got this one.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'Strong isn’t | *doing it alone.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, -1], star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      const lift = ease.inOutCubic(prog(lt, 1.2, 1.7))
      drawBits(x, BAR, BAR_C, F.x + 20, F.top - 30 - lift * 30 + (lt < 1.2 ? Math.sin(t * 18) * 3 : 0), 12, { rot: lt < 1.2 ? -0.08 : 0 })
      bubble(x, 800, 680, 'spot me?', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
      friend(x, t, P, 'taurus', 800, 990, 1.0, 200, 'sparkle')
    } },
  { sign: S, cap: 'You hype everyone. | *Let them hype you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: L,
    front(x, t, lt, P) {
      const Ff = friend(x, t, P, 'gemini', 790, 1000, 0.25, 210, 'sparkle')
      if (Ff) label(x, 790, 700 + Math.sin(t * 8) * 8, 'GO LEO!!', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 52, bg: PINK, rot: Math.sin(t * 8) * 0.08 })
      label(x, 400, 1130, 'YOUR #1 FAN', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 380, 860, P.t0 + 1.3, 7, 190, 0.4)
    } },
  { sign: S, cap: 'Asking isn’t weak. | It’s *brave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, -1], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const up = ease.outBack(prog(lt, 0.4, 0.9))
      x.fillStyle = INK; x.fillRect(F.x + 120, F.cy - 40 - up * 130, 10, 220)
      card(x, F.x + 125, F.cy - 120 - up * 130, 210, 110, clamp(up), { bg: CREAM, rot: -0.05 }, () => txt(x, 'help?', 0, 2, { size: 52 }))
      label(x, 790, 1120, 'COURAGE +100', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x + 125, F.cy - 250, P.t0 + 1.2, 6, 150, 0.2)
    } },
  { sign: S, cap: 'Not every day | *needs a spotlight.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: 0, y: 20 },
    back(x, t, lt, P, F) {
      const dim = 1 - ease.inOutCubic(prog(lt, 0.6, 1.3))
      if (dim > 0.01) { x.save(); x.globalAlpha = 0.35 * dim; x.fillStyle = '#fff1a8'; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1150); x.lineTo(320, 1150); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 1.1, 1.5))
      if (k > 0.01) drawBits(x, BLANKET, { P: LAV, p: CREAM }, F.x, F.cy + 125 + (1 - k) * 60, 20, { alpha: k })
      label(x, 800, 620, 'COSY MODE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 38, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your people want | *to show up.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      phone(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 }, () => {
        txt(x, 'THE GROUP', 0, -130, { size: 22, font: MONO, weight: 700, color: GOLD })
        const M = [['need a hand?', 0.4, ORANGE, -1], ['omw!', 0.8, PINK, 1], ['omw!!', 1.0, MINT, 1], ['bringing tea', 1.25, SKYB, 1]]
        M.forEach(([s, at, c, side], i) => {
          const k = pop01(lt, at, 0.25, 2)
          if (k <= 0.01) return
          x.save(); x.translate(side * 20, -80 + i * 62); x.scale(k, k)
          x.font = `800 22px ${INTER}`; const w = x.measureText(s).width + 26
          x.fillStyle = c; x.fillRect(-w / 2, -20, w, 40); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 1)
          x.restore()
        })
      })
      hearts(x, t, 790, 700, P.t0 + 1.6, { n: 4, life: 1.4, spread: 200, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'You don’t have | *to perform “fine.”*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P, F) {
      const down = ease.inOutCubic(prog(lt, 0.9, 1.4))
      drawBits(x, MASK, { M: GOLD, K: INK, S: WOOD }, lerp(F.x, 760, down), lerp(F.cy - 10, 1020, down), 20 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: down * 0.5 })
      bubble(x, 820, 660, 'honestly? | rough week.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: CREAM, tail: 'bl' })
    } },
  { sign: S, cap: 'Being helped | *is a gift too.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, GIFT, { R: RED, G: PINK, g: '#ff6b9a' }, 790, 920 + Math.sin(t * 3) * 6, 24 * k)
      label(x, 790, 680, 'TO: LEO', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: CREAM, rot: 0.06, font: MONO, weight: 700 })
      label(x, 790, 1140, 'CONTAINS: HELP', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even the sun | *gets a cloud day.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [0, -1], star: { x: 0, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const d = ease.outCubic(prog(lt, 0.3, 1.0))
      drawBits(x, CLOUD, { W: '#f4f0ff', K: '#8a80b8' }, F.x + 10, lerp(420, F.top - 50, d), 18, { alpha: clamp(d * 3) })
      label(x, 800, 1140, 'FORECAST: REST', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0186', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Leo, you’re allowed | *to ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger with backup.*', mood: 'sparkle' },
  lesson: { text: 'Let someone in. | You *shine* brighter.', chip: 'HELP: ACCEPTED' },
  last: {
    text: 'Ask today. | *We’ll bring snacks.*',
    draw(x, t, lt) {
      for (let i = 0; i < 3; i++) drawBits(x, SNACK, { Y: '#d89a4a', R: '#5a3418' }, 380 + i * 160, 1150 + (i % 2) * 30, 18 * pop01(t, t - lt + 0.6 + i * 0.2, 0.35, 2.2), { rot: (i - 1) * 0.2 })
      hearts(x, t, 540, 1100, t - lt + 1.2, { n: 8, life: 2.0, spread: 500, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
