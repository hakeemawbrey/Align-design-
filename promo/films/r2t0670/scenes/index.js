// r2t0670: star_talk, SOLO (taurus), "Tauruses at a party | *be like.*" (signs3kit social cut, music: lofi · F).
// One sign the whole way: nine party moments, each the most extreme Taurus version. Ending: callback.
//   found the snack table, never left · brought their own slippers · arrived, asked about dessert · claimed the best
//   seat for four hours · someone took their chip, silence fell · checked the guest list for compatible signs · rated
//   the playlist out loud · made one friend: the host's dog · left at 9 p.m., bed was calling
//   group "Snacks first. | *People second.*"
//   last "Best part? | *The dog.*" (card 8, paid off: the dog comes back, tail going)
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd068', S = 'taurus', ST = { x: -190 }
const DOG = ['.BB.......', 'BBBB......', 'BKBBB.....', 'BBBBBBBBB.', '.BBBBBBBBT', '..BBBBBBB.', '..B.B..B.B', '..B.B..B.B']
const DOG_C = { B: '#c98f2a', K: INK, T: '#c98f2a' }
const SLIP = ['..PPPPP.', '.PPWWWPP', 'PPPPPPPP', 'SSSSSSSS']
const SLIP_C = { P: PINK, W: '#ffffff', S: STEEL }
const CHIPS = ['.Y.Y.Y.Y.', 'YYYYYYYYY', 'RRRRRRRRR', '.RRRRRRR.', '..RRRRR..']
const CHIPS_C = { Y: '#ffd23a', R: '#ff6b5a' }
function dog(x, t, cx, cy, cell, k = 1) {
  if (k <= 0.01) return
  const wag = Math.sin(t * 18) > 0
  const bm = DOG.map((r, j) => j === 4 ? (wag ? '.BBBBBBBBT' : '.BBBBBBBB.') : j === 3 ? (wag ? 'BBBBBBBBB.' : 'BBBBBBBBBT') : r)
  drawBits(x, bm, DOG_C, cx, cy, cell * k, { sx: -1 })
}
/** a round clock at h:m with a little moon */
function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  const hand = (a, len, w) => { x.save(); x.rotate(a); x.fillStyle = INK; x.fillRect(-w / 2, -len, w, len); x.restore() }
  hand(((h % 12) + m / 60) / 12 * Math.PI * 2, r * 0.5, 12); hand(m / 60 * Math.PI * 2, r * 0.75, 7)
  x.fillStyle = RED; x.fillRect(-8, -8, 16, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Found the snack table. | *Never left.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, 'HOME BASE', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 42)
      L(x, 790, 1080, `HOUR ${1 + Math.floor(clamp((lt - 0.6) / 1.4) * 3)}`, pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 38)
    } },
  { sign: S, cap: 'Brought their own | *slippers.*', mood: 'happy', look: [0, 1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      drawBits(x, SLIP, SLIP_C, F.x - 50, F.cy + 175, 11 * k); drawBits(x, SLIP, SLIP_C, F.x + 50, F.cy + 175, 11 * k, { sx: -1 })
      L(x, 770, 800, 'DRESS CODE: COZY', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 30)
      bubble(x, 790, 1010, 'it’s fine. | I’m fine.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Arrived. | Asked about *dessert.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'hi! dessert?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 790, 900, '…we just | opened the door', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      L(x, 790, 1090, 'PRIORITIES: CLEAR', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Claimed the best seat. | *For four hours.*', mood: 'sleepy', look: [1, 0], star: { x: -190, y: -20 },
    back(x, t, lt, P, F) { bits(x, 'COUCH', F.x + 10, F.cy + 120, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      L(x, 790, 760, 'RESERVED', pop01(t, P.t0 + 0.6, 0.3, 2.2), RED, 0.06, 44)
      L(x, 790, 1040, 'MOVING: NEVER', pop01(t, P.t0 + 1.3, 0.3, 2.2), STEEL, -0.04, 36)
    } },
  { sign: S, cap: 'Someone took their chip. | *Silence fell.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const off = ease.inOutCubic(prog(lt, 0.4, 0.9))
      drawBits(x, ['YYYY', 'YYYY', 'YYY.', '.Y..'], { Y: '#ffd23a' }, lerp(720, 860, off), lerp(900, 760, off), 22 * k)
      bubble(x, 790, 980, 'that was | MY chip.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (lt > 0.9) { x.save(); x.globalAlpha = 0.15; x.fillStyle = '#000'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 1120, 'FRIENDSHIP: PAUSED', pop01(t, P.t0 + 1.5, 0.3, 2.2), RED, -0.04, 32)
    } },
  { sign: S, cap: 'Checked the guest list | for *compatible signs.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 360, rot: 0.04, head: 'GUESTS', headBg: MINT, headInk: INK, lines: ['Virgo ✓', 'Capricorn ✓', 'Cancer ✓', ['Taurus ✓✓', '#2f9a52']], size: 34, align: 'left', progress: clamp((lt - 0.3) / 1.4) })
    } },
  { sign: S, cap: 'Rated every song. | *Out loud.*', mood: lt => Math.floor(lt * 1.4) % 2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 9, col: GOLD, seed: 3 })
      const r = ['banger', 'skip.', 'GOOD one', 'skip.'][Math.min(3, Math.floor(clamp((lt - 0.3) / 1.9) * 4))]
      bubble(x, 790, 700, r, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 1080, 'DJ: NERVOUS', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 38)
    } },
  { sign: S, cap: 'Made one friend. | *The host’s dog.*', mood: 'heart', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      dog(x, t, 800, 960, 24, pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 860, P.t0 + 0.8, { n: 6, life: 2, spread: 200, cell: 8, seed: 2 })
      L(x, 790, 700, 'BEST FRIEND ✓', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 38)
    } },
  { sign: S, cap: 'Left at 9 p.m. | *Bed was calling.*', mood: 'sleepy', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 820, 130, pop01(t, P.t0 + 0.2, 0.3, 2), 9, 0)
      bubble(x, 790, 1060, 'byeee ♡', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, tail: 'bl', col: LAV })
    } },
]

const F = makeFilm({
  id: 'r2t0670', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Tauruses at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Snacks first. | *People second.*', mood: 'heart' },
  last: {
    text: 'Best part? | *The dog.*',
    draw(x, t, lt) {
      dog(x, t, 540, 1080, 22, pop01(t, t - lt + 0.6, 0.35, 2))
      hearts(x, t, 540, 980, t - lt + 1.2, { n: 8, life: 2, spread: 360, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
