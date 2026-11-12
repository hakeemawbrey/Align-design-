// r2t0325: star_talk, SOLO (virgo), "Virgos on their | birthday be like." (signs3kit social cut, music: lofi · F). Ending: callback.
//   planned their own party, itinerary attached · no gifts, then a list · blew out the candles, then dusted · re-folded the
//   wrapping paper · surprise party? already approved · fact-checked the horoscope card · a 1 mm cake stain, day ruined
//   · thank-you notes sent the same night · wished for everyone else.
//  37.8 "Perfect day. | Slightly edited."   41.2 callback: "The stain? | Still thinking about it."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#7dffb0'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const CAKE = ['..Y..Y..Y..Y..', '..R..R..R..R..', '.PPPPPPPPPPPP.', '.PWWWWWWWWWWP.', '.PPPPPPPPPPPP.', 'CCCCCCCCCCCCCC', 'CCCCCCCCCCCCCC', 'KKKKKKKKKKKKKK']
const CAKE_OUT = CAKE.map((r, i) => i === 0 ? r.replace(/Y/g, '.') : r)
const DUSTER = ['PP.PP', 'PPPPP', '.PPP.', '..K..', '..K..', '..K..', '..K..', '..K..']
const SHIRT = ['.WWW..WWW.', 'WWWWWWWWWW', 'WWWWWWWWWW', '..WWWWWW..', '..WWWWWW..', '..WWWWWW..', '..WWWWWW..', '..WWWWWW..']
const ENV = ['KKKKKKKKKK', 'KWKWWWWKWK', 'KWWKWWKWWK', 'KWWWKKWWWK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const GIFT = ['...R.R....', '....R.....', 'GGGGRGGGGG', 'GGGGRGGGGG', 'GGGGRGGGGG', 'GGGGRGGGGG', 'GGGGRGGGGG']

function sheet(x, cx, cy, k, head, lines, { rot = 0.04, w = 320, headCol = ACC, size = 26, mono = true } = {}) {
  if (k <= 0.01) return
  const h = 86 + lines.length * 46
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 54)
  x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 28)
  x.font = mono ? `700 ${size}px ${MONO}` : `800 ${size}px ${INTER}`
  lines.forEach((l, i) => { x.fillStyle = l.startsWith('!') ? RED : INK; x.fillText(l.replace(/^!/, ''), 0, -h / 2 + 84 + i * 46) })
  x.restore()
}

const S = 'virgo', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Planned their own party. | *Itinerary attached.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const all = ['7:00 arrive', '7:04 cake', '7:06 photos', '7:09 gifts', '7:15 bed']
      sheet(x, 790, 860, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), 'MY BIRTHDAY', all.slice(0, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 4)))
    } },
  { sign: S, cap: 'Said no gifts. | *Then sent a list.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 620, 'no gifts, please.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      sheet(x, 790, 920, pop01(t, P.t0 + 0.9, 0.3, 2), 'GIFT LIST', ['1. label maker', '2. a nicer label maker', '!page 1 of 3'], { headCol: PINK, w: 380, size: 24 })
    } },
  { sign: S, cap: 'Blew out the candles. | *Then dusted.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, lt < 0.6 ? CAKE : CAKE_OUT, { Y: GOLD, R: RED, P: PINK, W: CREAM, C: '#fff0f5', K: INK }, 790, 980, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      drawBits(x, DUSTER, { P: PINK, K: '#8a4a2e' }, 790 + 60 * Math.sin(t * 9), 780, 16 * k, { rot: 0.3 * Math.sin(t * 9) })
      L(x, 790, 620, 'CRUMBS: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Opened the gift. | *Saved the paper.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.4, 1.3))
      drawBits(x, GIFT, { R: RED, G: '#5fd068' }, 790, 900, lerp(22, 10, p) * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: p * 0.2 })
      L(x, 790, 1080, 'FOLDED. FILED.', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Surprise party? | *Already approved it.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 640, 'SURPRISE!!', pop01(t, P.t0 + 0.2, 0.3, 2.4), { size: 50, col: GOLD, tail: 'bl' })
      sparkles(x, t, 780, 640, P.t0 + 0.3, 8, 180, 0.4)
      L(x, 790, 900, 'ON SCHEDULE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 36)
      bubble(x, 790, 1080, 'two min late.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Birthday horoscope card? | *Fact-checked.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 'VIRGO TODAY', ['lucky colour: red', lt > 1.0 ? '!source?' : 'big changes!', lt > 1.4 ? '!(chart: verified)' : ''], { headCol: LAV, mono: false, size: 28 })
    } },
  { sign: S, cap: 'Crumb on the shirt. | *Day: ruined.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { W: '#ffffff' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.7) { x.fillStyle = '#e8a24a'; x.fillRect(800, 880, 8, 8) }
      L(x, 790, 1100, 'STAIN: 1 MM', pop01(t, P.t0 + 1.1, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: S, cap: 'Thank-you notes. | *Same night.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.3) * 7)
      for (let i = 0; i < n; i++) drawBits(x, ENV, { K: INK, W: CREAM }, 790 + (i % 2 ? 16 : -16), 1110 - i * 52, 14, { rot: (i % 3 - 1) * 0.06 })
      L(x, 790, 620, '11:58 P.M. ALL SENT', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Made a wish. | *For everyone else.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, -1], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you all okay? | eat something?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: ACC, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0325', key: 'F', accent: ACC, solo: 'virgo', ending: 'callback',
  title: 'Virgos on their | birthday *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Perfect day. | *Slightly edited.*', mood: 'sparkle' },
  last: {
    text: 'The stain? | *Still on their mind.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.0 ? 'squint' : 'neutral', seed: 7, look: [1, 0] })
      drawBits(x, SHIRT, { W: '#ffffff' }, 760, 1060, 20 * pop01(t, t0 + 0.6, 0.4, 2))
      if (lt > 1.0) { x.fillStyle = '#e8a24a'; x.fillRect(770, 1060, 8, 8); L(x, 760, 1230, '1 MM. STILL.', pop01(t, t0 + 1.2, 0.3, 2.4), RED, -0.04, 34) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
