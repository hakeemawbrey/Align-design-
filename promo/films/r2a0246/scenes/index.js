// r2a0246: star_advice, ADVICE SOLO, "Sagittarius, | call home." (batch topic: "Sagittarius, this is your sign to call home.") (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the wandering Sagittarius, gently nudged to ring home.
//   0.0–3.6    "Sagittarius, | *call home.*"
//   3.6–37.8   nine cards (3.8 s each):
//              last call home: March · home is a destination too · the postcard says it, say it out loud · the kite is
//              still on its string · skip small talk, tell them a story · let them be proud · the guilt trip is cancelled
//              · a call from the airport still counts · one call makes their whole week
//  37.8        "Free spirit. | *Big heart.*"
//  41.2        callback: "Last call home: | *today.*"  Card one's phone comes back and connects.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, phone, confetti, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const S = 'sagittarius'
const ST = { x: -190 }
const ACC = '#ff9a4a'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const KITE = ['....P....', '...PPP...', '..PPGPP..', '.PPGGGPP.', 'PPGGGGGPP', '.PPGGGPP.', '..PPGPP..', '...PPP...', '....P....']
const KITE_C = { P: PINK, G: SUN }
const CASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BWBBBBBBWB', 'BBBBBBBBBB', 'BWBBBBBBWB', 'BBBBBBBBBB', '.K......K.']
const CASE_C = { K: INK, B: '#6b62a8', W: GOLD }
const MEDAL = ['RR...RR', '.RR.RR.', '..RRR..', '.YYYYY.', 'YYWYYYY', 'YYYYYYY', 'YYYYYYY', '.YYYYY.']
const MEDAL_C = { R: RED, Y: SUN, W: '#fff1b0' }
const HOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', 'RRRRRRRRRR', '.WWWWWWWW.', '.WYYWWDDW.', '.WYYWWDDW.', '.WWWWWDDW.']
const HOUSE_C = { R: RED, W: CREAM, Y: SUN, D: BROWN }

/** a little map card: a dotted trail from the pin "you" to the house "home" */
function map(x, cx, cy, k, p, t) {
  card(x, cx, cy, 360, 320, k, { bg: '#d9f0d0', rot: -0.03 }, () => {
    x.fillStyle = SKYB; x.fillRect(-180, 60, 140, 100)
    x.fillStyle = '#b8dca8'; x.fillRect(20, -150, 160, 90)
    const pts = []; for (let i = 0; i <= 14; i++) { const u = i / 14; pts.push([lerp(-130, 110, u), lerp(110, -80, u) + Math.sin(u * 7) * 30]) }
    const n = Math.floor(p * 14)
    x.fillStyle = INK; for (let i = 0; i <= n; i++) x.fillRect(pts[i][0] - 5, pts[i][1] - 5, 10, 10)
    drawBits(x, HOUSE, HOUSE_C, 110, -90, 8)
    x.fillStyle = RED; x.beginPath(); x.arc(-130, 96, 16, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(-133, 104, 6, 26)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Last call home? | *March.*', mood: lt => lt > 1.4 ? 'wide' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'HOME ♥', headCol: PINK, lines: [['call?', SKYB, pop01(t, P.t0 + 0.6, 0.3, 2.2)]] })
      lab(x, 790, 1110, 'LAST CALL: MARCH', pop01(t, P.t0 + 1.2, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
      bubble(x, 420, 620, 'wait, March?!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Always the next adventure? | *Home is one too.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      map(x, 790, 860, pop01(t, P.t0 + 0.15, 0.35, 2), ease.inOutCubic(prog(lt, 0.4, 1.5)), t)
      lab(x, 790, 650, 'NEXT TRIP: HOME', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Postcards say it. | *So can you.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 2; i >= 0; i--) {
        const k = pop01(t, P.t0 + 0.2 + (2 - i) * 0.2, 0.3, 2.2)
        card(x, 790 + i * 22, 870 - i * 30, 330, 220, k, { bg: [CREAM, SKYB, SUN][i], rot: -0.06 + i * 0.05 }, () => {
          if (i) return
          txt(x, 'wish you', -50, -40, { size: 32 }); txt(x, 'were here', -50, 4, { size: 32 })
          x.fillStyle = PINK; x.fillRect(90, -80, 54, 64); x.fillStyle = INK; x.fillRect(-140, 50, 150, 6); x.fillRect(-140, 76, 120, 6)
        })
      }
      bubble(x, 790, 640, 'miss you all!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Freedom matters. | *So does the string.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const kx = 830 + Math.sin(t * 1.6) * 40, ky = 640 + Math.cos(t * 1.3) * 24
      if (k > 0.01) {
        x.save(); x.globalAlpha = k; x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(F.x + 90, F.cy + 10)
        x.quadraticCurveTo(700, 1000, kx, ky + 60); x.stroke(); x.restore()
      }
      drawBits(x, KITE, KITE_C, kx, ky, 17 * k, { rot: 0.2 * Math.sin(t * 1.6) })
      lab(x, 790, 1100, 'STILL CONNECTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { bg: PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Hate small talk? | *Tell them a story.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so… the weather?', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.8, 1.0)), { size: 36, col: GREY, tail: 'bl' })
      bubble(x, 780, 700, 'so there I was, | on a volcano…', pop01(t, P.t0 + 1.35, 0.3, 2.2), { size: 38, tail: 'bl' })
      lab(x, 790, 960, 'FAMILY: HOOKED', pop01(t, P.t0 + 1.9, 0.3, 2.4), { bg: MINT, rot: 0.05, size: 36 })
    } },
  { sign: S, cap: 'Busy being brave? | *Let them be proud.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MEDAL, MEDAL_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.08 * Math.sin(t * 2) })
      bubble(x, 790, 640, 'so proud | of you!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 4 })
      lab(x, 790, 1120, 'SENT BY: HOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Been too long? | *No guilt trip needed.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), fly = ease.inCubic(prog(lt, 1.3, 1.9))
      drawBits(x, CASE, CASE_C, 790 + fly * 300, 900 - Math.sin(Math.PI * fly) * 160, 22 * k, { rot: fly * 2.4, alpha: 1 - prog(fly, 0.8, 1) })
      lab(x, 790 + fly * 300, 760 - Math.sin(Math.PI * fly) * 160, 'GUILT TRIP', k * (1 - fly), { bg: LAV, rot: 0.04 })
      lab(x, 790, 1090, 'TRIP: CANCELLED', pop01(t, P.t0 + 2.3, 0.3, 2.4), { bg: MINT, rot: -0.04, size: 36 })
      sparkles(x, t, 790, 1090, P.t0 + 2.4, 6, 150, 0.3)
    } },
  { sign: S, cap: 'Calling from the airport? | *Still counts.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 380, 300, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: '#1b1236', rot: 0.02 }, () => {
        txt(x, 'DEPARTURES', 0, -110, { size: 30, font: MONO, weight: 700, color: SUN })
        const ROWS = [['LIMA', 'BOARDING'], ['OSLO', 'DELAYED'], ['HOME ♥', 'CALLING']]
        ROWS.forEach(([a, b], i) => { const me = i === 2; txt(x, a, -80, -40 + i * 60, { size: 26, font: MONO, weight: 700, color: me ? PINK : BONE }); txt(x, b, 90, -40 + i * 60, { size: 24, font: MONO, weight: 700, color: me ? MINT : GREY }) })
      })
      lab(x, 790, 1080, 'GATE 12 · 5 MIN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: SUN, rot: -0.04 })
      bubble(x, 420, 620, 'hi mom! | quick one!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: S, cap: 'One call. | *Their whole week, made.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 930, 200 * k, { mood: lt > 1.0 ? 'heart' : 'wide', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.8] })
      lab(x, 800, 740, 'HOME', pop01(t, P.t0 + 0.6, 0.3, 2), { bg: PINK, rot: 0.05 })
      lab(x, 790, 1120, 'WEEK: MADE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GOLD, rot: -0.04, size: 36 })
      hearts(x, t, 620, 900, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0246', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarius, | *call home.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  last: {
    text: 'Last call home: | *today.*',
    draw(x, t, lt) {
      const t0 = t - lt
      phone(x, 540, 1040, 1.45 * pop01(t, t0 + 0.4, 0.45, 1.8), { head: 'HOME ♥', headCol: PINK, rot: -0.03, w: 280, h: 400, size: 26,
        lines: [['calling…', SKYB, pop01(t, t0 + 0.9, 0.3, 2.2)], ['connected!', MINT, pop01(t, t0 + 1.6, 0.3, 2.4)], ['love you', PINK, pop01(t, t0 + 2.2, 0.3, 2.4)]] })
      lab(x, 540, 1420, 'LAST CALL: TODAY', pop01(t, t0 + 1.8, 0.3, 2.4), { bg: GOLD, rot: 0.03, size: 40 })
      hearts(x, t, 540, 1380, t0 + 1.7, { n: 8, life: 2.0, spread: 760, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
