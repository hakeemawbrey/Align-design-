// r2t0613: star_talk, SOLO (taurus), "Tauruses on their | birthday *be like.*" (~51 s vertical, signs3kit social cut, music: lofi · G).
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: lesson.
//   breakfast in bed, then a second one · wanted one gift, sent a 40-item list · blew out the candles, ate the whole cake
//   · surprise party, didn't get off the couch · not a birthday, a birthday month · got a candle, sniffed it for an hour
//   · the same restaurant, visit #9 · read their birthday chart: it said "nap." · party till ten, Taurus left at nine
//   group "Twenty-four hours. | *Zero sharing.*"   lesson "Let them have | *the big slice.*" CAKE: ALL THEIRS
//   last "Happy birthday, | *you comfy legend.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { L, sheet, bits, chart, zzz, confetti, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', S = 'taurus', ST = { x: -190 }
const CAKE = ['...Y...Y...Y...', '...W...W...W...', '.PPPPPPPPPPPPP.', '.PCCPPCCPPCCPP.', '.BBBBBBBBBBBBB.', '.BBBBBBBBBBBBB.', '.PPPPPPPPPPPPP.', '.BBBBBBBBBBBBB.', '.BBBBBBBBBBBBB.', 'DDDDDDDDDDDDDDD']
const CAKE_C = { Y: '#ffb34a', W: CREAM, P: PINK, C: '#fff4e2', B: '#e8b36a', D: BONE }
const CRUMBS = ['...............', '...............', '...............', '...............', '...............', '..B......B.....', '.....B......B..', '...B....B......', '.......B....B..', 'DDDDDDDDDDDDDDD']

/** a month calendar where every day gets circled */
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 320, 330)
  x.fillStyle = INK; x.fillRect(-168, -168, 336, 336); x.fillStyle = CREAM; x.fillRect(-160, -160, 320, 320)
  x.fillStyle = RED; x.fillRect(-160, -160, 320, 60); x.fillStyle = CREAM; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MAY', 0, -128)
  const n = Math.floor(clamp(prog(lt, 0.3, 1.6)) * 31)
  for (let i = 0; i < 31; i++) {
    const cx2 = -132 + (i % 6) * 53, cy2 = -78 + Math.floor(i / 6) * 46
    x.fillStyle = STEEL; x.fillRect(cx2 - 6, cy2 - 6, 12, 12)
    if (i < n) { x.strokeStyle = PINK; x.lineWidth = 5; x.beginPath(); x.arc(cx2, cy2, 17, 0, Math.PI * 2); x.stroke() }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Breakfast in bed. | *Then a second one.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PLATE', 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PLATE', 800, 960, 20 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      L(x, 800, 1130, 'BREAKFAST: 2 OF 2', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Wanted one gift. | *Sent a 40-item list.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 400, head: 'WISHLIST', headBg: PINK, headInk: INK, lines: ['1. one gift', '2. also this', '3. and this', '4. ooh, this', '5. …'], size: 30, align: 'left', progress: prog(lt, 0.3, 1.2) })
      L(x, 800, 1110, `ITEMS: ${Math.min(40, Math.round(lerp(1, 40, ease.inCubic(prog(lt, 0.3, 1.6)))))}`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Blew out the candles. | *Ate the whole cake.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, lt < 1.2 ? CAKE : CRUMBS, CAKE_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'SLICES SHARED: 0', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Surprise party? | *Didn’t get off the couch.*', mood: 'happy', look: [1, 0], star: { x: -190, y: 30 }, squash: 0.1,
    back(x, t, lt, P) { bits(x, 'COUCH', 350, 980, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      confetti(x, t, 790, 900, P.t0 + 0.6, { n: 24, spread: 260 })
      bubble(x, 790, 700, 'SURPRISE!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 46, col: GOLD, tail: 'br' })
      L(x, 790, 1100, 'COUCH: OCCUPIED', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Not a birthday. | *A birthday month.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      calendar(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1110, 'DAYS CELEBRATED: 31', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Got a candle. | *Sniffed it for an hour.*', mood: lt => lt > 0.8 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 760, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, `SNIFF #${Math.min(61, 1 + Math.floor(lt * 26))}`, pop01(t, P.t0 + 0.6, 0.3, 2), LAV, -0.04, 40)
      hearts(x, t, 760, 700, P.t0 + 1.0, { n: 4, life: 1.6, spread: 150, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Birthday dinner? | *Same place. Ninth time.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'the usual. | birthday size.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bits(x, 'DISH', 800, 930, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1110, 'VISIT #9', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 40)
    } },
  { sign: S, cap: 'Read their birthday chart. | *It said “nap.”*', mood: lt => lt > 1.4 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 800, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1080, 'FORECAST: NAP', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'Party till ten. | *Taurus left at nine.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 790, 770, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PILLOW', 800, 1000, 20 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1130, 'IN BED: 9:01', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0613', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Tauruses on their | birthday *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twenty-four hours. | *Zero sharing.*', mood: 'heart' },
  lesson: { text: 'Let them have | *the big slice.*', chip: 'CAKE: ALL THEIRS' },
  last: { text: 'Happy birthday, | *you comfy legend.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
