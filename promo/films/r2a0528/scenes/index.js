// r2a0528: star_advice, ADVICE SOLO, "Cancer, your sign | *to slow down.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one light gag each.
// Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   let someone host you · plans for twelve, keep one · mute the group chat · celebrate your own birthday
//              · stay in your shell · feel it slowly (tea, steeping) · a match checks on you · leftovers count as cooking
//              · nap first, feelings after
//  37.8        "Rest is | *love too.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', SEA = '#8fe3ff', ORANGE = '#ffb34a'

function phone(x, cx, cy, k, head, msg, col = PINK, headCol = MINT) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -202, 276, 420)
  x.fillStyle = INK; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#2a2350'; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#140c30'; x.fillRect(-120, -178, 240, 356)
  x.fillStyle = headCol; x.fillRect(-108, -164, 216, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -137)
  if (msg) { const ls = msg.split('|'); x.fillStyle = col; x.fillRect(-106, -70, 212, 40 + ls.length * 44); x.fillStyle = INK; x.font = `800 30px ${INTER}`; ls.forEach((l, i) => x.fillText(l.trim(), 0, -28 + i * 44)) }
  x.restore()
}
function sheet(x, cx, cy, k, head, rows, headCol = SEA) {
  if (k <= 0.01) return
  const w = 330, h = 90 + rows.length * 56 + 20
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2 + 14, -h / 2 + 18, w - 28, 54)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 46)
  rows.forEach(([s, crossed], i) => {
    const ry = -h / 2 + 90 + i * 56 + 28
    x.fillStyle = crossed ? SLATE : INK; x.font = `800 30px ${INTER}`; x.fillText(s, 0, ry)
    if (crossed) { x.fillStyle = RED; x.fillRect(-110, ry - 3, 220, 6) }
  })
  x.restore()
}
const CAKE = ['......R......', '......Y......', '......W......', '.PPPPPPPPPPP.', '.PWPPWPPWPPW.', '.CCCCCCCCCCC.', '.PPPPPPPPPPP.', 'WWWWWWWWWWWWW']
const HOUSE = ['.....RR.....', '....RRRR....', '...RRRRRR...', '..RRRRRRRR..', '.RRRRRRRRRR.', '..WWWWWWWW..', '..WYYWWBBW..', '..WYYWWBBW..', '..WWWWWBBW..', '..WWWWWBBW..']
const CUP = ['..S..S..', '.S..S...', '..S..S..', 'WWWWWWWW.', 'WTTTTTTWWW', 'WTTTTTTW.W', 'WWWWWWWWWW', '.WWWWWW...']
const BOX = ['.LLLLLLLLL.', 'LLLLLLLLLLL', 'KCCCCCCCCCK', 'KCOOCGGCCCK', 'KCOOCGGCOCK', 'KCCCCCCCCCK', '.KKKKKKKKK.']
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWLLWWWWLLWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']

const S = 'cancer'
const CAMEOS = [
  { sign: S, cap: 'You host everyone. | *Let someone host you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 790, 940, 210 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 790, 680, 'sit. I’ll cook.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: MINT, tail: 'bc' })
      label(x, 790, 1120, 'GUEST OF HONOUR: YOU', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Plans with twelve people? | *Keep one.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.5) / 1.0) * 3)
      sheet(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), 'THIS WEEK', [['brunch ×3', n > 0], ['movers', n > 1], ['baby shower', n > 2], ['soup with you', false]])
    } },
  { sign: S, cap: 'The group chat can wait. | *Mute it.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const muted = lt > 1.1
      phone(x, 790, 870, pop01(t, P.t0 + 0.15, 0.3, 2), muted ? 'MUTED ✓' : '99+ NEW', muted ? 'see you | tomorrow' : 'who’s | bringing | what??', muted ? MINT : LAV, muted ? MINT : RED)
    } },
  { sign: S, cap: 'You remember every birthday. | *Celebrate yours.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { R: ORANGE, Y: GOLD, W: CREAM, P: SEA, C: BROWN }, 790, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1090, 'FOR: YOU. JUST YOU.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 190, 0.3)
    } },
  { sign: S, cap: 'Your shell is allowed. | *Stay in.*', mood: 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, HOUSE, { R: SEA, W: CREAM, Y: GOLD, B: BROWN }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1110, 'STATUS: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Feeling everything? | *Feel it slowly.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, { S: 'rgba(239,230,214,0.7)', W: CREAM, T: '#c98f5a' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const dots = '.'.repeat(1 + Math.floor(lt * 2) % 3)
      label(x, 790, 650, 'STEEPING' + dots, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1100, 'NO RUSH', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You check on everyone. | *Let them check on you.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), '♋︎ YOUR MATCH', lt > 0.7 ? 'how are | YOU?' : '')
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Leftovers count | *as cooking.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BOX, { L: SEA, K: INK, C: CREAM, O: ORANGE, G: '#5fd068' }, 790, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1080, 'CHEF’S KISS', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.25, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Nap first. | *Feelings after.*', mood: 'sleepy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PILLOW, { W: CREAM, L: SEA }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'FEELINGS: ON HOLD', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'BACK IN 20', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0528', key: 'C', accent: SEA, solo: S, ending: 'group',
  title: 'Cancer, your sign | *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Rest is | *love too.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
