// r2t0717: THE SIGNS AS… v3, SOLO (capricorn), "Capricorns in the | group chat." (batch hook re-cut to fit two lines) (signs3kit social cut, lofi · E).
// One sign the whole way: nine group-chat moments, each the most extreme, most efficient Capricorn version.
// Ending: callback (the "noted." from card one comes back, with cake).
//   "noted." to a birthday invite · an agenda for the group chat · pinned: read the pinned message · brunch as a
//   spreadsheet · muted the chat, unread 0 · a four-second voice memo · split the bill to the cent · one reaction a
//   year (thumbs up) · nobody planned the trip, Capricorn booked all of it
//   group "Dry texter. | Best friend."   last "The RSVP? | “Noted. Cake.”"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd0a0', S = 'capricorn', ST = { x: -190 }
const THUMB = ['....YY....', '...YYY....', '...YYY....', 'YYYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYY.', '.YYYYYYY..']
const CAKE = ['..Y..Y..Y..', '..C..C..C..', 'PPPPPPPPPPP', 'PWPWPWPWPWP', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'PPPPPPPPPPP', 'BBBBBBBBBBB', 'BBBBBBBBBBB']
const CAKE_C = { Y: GOLD, C: '#c9a6ff', P: PINK, W: '#ffffff', B: '#e8b36a' }

/** a little spreadsheet that fills cell by cell */
function grid(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -140, 336, 296)
  x.fillStyle = INK; x.fillRect(-176, -156, 352, 312)
  x.fillStyle = '#ffffff'; x.fillRect(-168, -148, 336, 296)
  x.fillStyle = ACC; x.fillRect(-168, -148, 336, 48)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  const H = ['WHO', 'EGGS', 'PAID']; H.forEach((h, i) => x.fillText(h, -112 + i * 112, -124))
  const rows = [['ari', 'yes', 'Y'], ['gem', 'no', 'N'], ['leo', 'x2', 'Y'], ['you', '?', '?']]
  const n = Math.floor(clamp((lt - 0.4) / 1.2) * 12)
  x.strokeStyle = STEEL; x.lineWidth = 2
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) {
    x.strokeRect(-168 + c * 112, -100 + r * 62, 112, 62)
    if (r * 3 + c < n) { x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(rows[r][c], -112 + c * 112, -69 + r * 62) }
  }
  x.restore()
}
/** a voice-memo bar with a wave */
function memo(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -50, 352, 100); x.fillStyle = ACC; x.fillRect(-168, -42, 336, 84)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, -20); x.lineTo(-108, 0); x.lineTo(-140, 20); x.fill()
  for (let i = 0; i < 9; i++) { const h = 10 + 26 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillRect(-80 + i * 20, -h / 2, 10, h) }
  x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('0:04', 130, 2)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Replied “noted.” | To a *birthday invite.*', mood: 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'THE GROUP (9)', headCol: GOLD, size: 26, lines: [['PARTY SAT!!!', PINK, pop01(t, P.t0 + 0.4, 0.2, 2)], ['omg yesss', BONE, pop01(t, P.t0 + 0.7, 0.2, 2)], ['cant wait!!', BONE, pop01(t, P.t0 + 0.9, 0.2, 2)], ['noted.', ACC, pop01(t, P.t0 + 1.4, 0.25, 2.2), true]] })
    } },
  { sign: S, cap: 'Gave the group chat | *an agenda.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, head: 'CHAT AGENDA', headBg: ACC, headInk: INK, lines: ['1. greetings', '2. weekend', '3. memes (5m)', '4. adjourn'], size: 30, align: 'left', progress: clamp((lt - 0.4) / 1.2) })
      L(x, 800, 1110, 'MINUTES TO FOLLOW', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Pinned a message: | *“read the pinned message.”*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      L(x, 800, 700, 'PINNED', pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.04, 40)
      sheet(x, 800, 890, pop01(t, P.t0 + 0.5, 0.3, 2), { w: 340, h: 200, lines: ['please read', 'the pinned', 'message.'], size: 36 })
      L(x, 800, 1090, 'SEEN BY 0', pop01(t, P.t0 + 1.7, 0.3, 2.2), STEEL, 0.05, 32)
    } },
  { sign: S, cap: 'Brunch plans? | Now *a spreadsheet.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      grid(x, 800, 870, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      L(x, 800, 1100, 'TAB 2 OF 6', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Muted the chat. | Read *every message.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', star: ST,
    front(x, t, lt, P) {
      const n = Math.max(0, 312 - Math.floor(clamp((lt - 0.5) / 1.1) * 312))
      L(x, 800, 720, 'MUTED', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, 0.04, 40)
      L(x, 800, 900, `UNREAD: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), n ? PINK : MINT, -0.04, 46)
      bubble(x, 800, 1090, 'caught up.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Sent a voice memo. | *Four seconds.*', mood: 'neutral', star: ST,
    front(x, t, lt, P) {
      memo(x, t, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 1020, '“yes. 7pm. bye.”', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Split the bill | *to the cent.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 300, head: 'YOU OWE', headBg: GOLD, headInk: INK, lines: ['12.37', '(the fries', 'were shared)'], size: 36, progress: clamp((lt - 0.4) / 1.0) })
      L(x, 800, 1090, 'REQUEST SENT', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'One reaction a year. | *The thumbs up.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, THUMB, { Y: '#ffd23a' }, 800, 860, 26 * pop01(t, P.t0 + 1.0, 0.35, 2.4))
      L(x, 800, 660, 'ANNUAL REACTION', pop01(t, P.t0 + 0.3, 0.3, 2), LAV, -0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.1, 8, 190, 0.2)
      bubble(x, 800, 1100, 'group: GASP', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Nobody planned the trip. | Capricorn *booked it all.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 670, 'ITINERARY: 14 PAGES', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 30)
      bubble(x, 800, 1100, 'you’re welcome.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0717', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Capricorns in the | *group chat.*',
  cameos: CAMEOS,
  group: { cap: 'Dry texter. | *Best friend.*', mood: 'happy' },
  last: {
    text: 'The RSVP? | *“Noted. Cake.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, t, 680, 1200, 1.35 * pop01(t, t0 + 0.4, 0.3, 2), { head: 'THE GROUP (9)', headCol: GOLD, size: 26, lines: [['PARTY SAT!!!', PINK, 1], ['noted.', ACC, pop01(t, t0 + 0.8, 0.25, 2), true], ['bringing cake.', ACC, pop01(t, t0 + 1.4, 0.25, 2.2), true], ['!!!!!!', BONE, pop01(t, t0 + 2.0, 0.25, 2.2)]] })
      friend(x, t, 'capricorn', 300, 1220, 200, pop01(t, t0 + 0.5, 0.35, 2), { mood: lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], seed: 44 })
      drawBits(x, CAKE, CAKE_C, 300, 1450, 16 * pop01(t, t0 + 1.5, 0.35, 2.2))
      hearts(x, t, 640, 1000, t0 + 2.0, { n: 6, life: 1.6, spread: 300, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
