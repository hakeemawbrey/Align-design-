// r2a0100: star_advice, ADVICE ROLLCALL, "Lessons from home, | by sign." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific thing each sign learned from home, with a light visual gag. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ be brave, someone cheered loudest · ♉ food means love · ♊ every story needs voices · ♋ home is a feeling
//              · ♌ the fridge is a gallery · ♍ fold it with care · ♎ everyone gets an equal slice · ♏ family keeps your
//              secrets · ♐ road trips fix everything · ♑ phones down at dinner · ♒ be your weird self · ♓ crying at
//              movies is allowed
//  49.2        "Home taught us. | *We carry it.*"
//  52.6        CALLBACK: "Leo’s fridge art? | *Still up there.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const HONEY = '#ffcf7a', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
const POT = ['.S.S.S.S.', '..S.S.S..', 'KKKKKKKKK', 'KOOOOOOOK', 'KRRRRRRRK', 'KRRRRRRRK', '.KRRRRRK.', '..KKKKK..']
const BOOK = ['BBBBB.BBBBB', 'BWWWWBWWWWB', 'BWKKWBWKKWB', 'BWWWWBWWWWB', 'BWKKWBWKKWB', 'BWWWWBWWWWB', 'BBBBBBBBBBB']
const HOUSE = ['.....R.....', '....RRR....', '...RRRRR...', '..RRRRRRR..', '.RRRRRRRRR.', '..WWWWWWW..', '..WYYWWDW..', '..WYYWWDW..', '..WWWWWDW..']
const TOWELS = ['PPPPPPPP', 'PPPPPPPP', 'SSSSSSSS', 'SSSSSSSS', 'MMMMMMMM', 'MMMMMMMM', 'LLLLLLLL', 'LLLLLLLL']
const PIZZA = ['...CCCCC...', '.CCYYYYYCC.', 'CYYRYKYRYYC', 'CYRYYKYYRYC', 'CKKKKKKKKKC', 'CYYRYKYYRYC', 'CYRYYKYRYYC', '.CCYYKYYCC.', '...CCCCC...']
const DIARY = ['PPPPPPPPP', 'PWPPPPPPP', 'PWPPHPHPP', 'PWPHHHHHP', 'PWPPHHHPP', 'PWPPPHPPY', 'PWPPPPPPY', 'PPPPPPPPP']
const MAP = ['TTTTTTTTTT', 'TGGTTTBBTT', 'TGGGTTBBBT', 'TTGTTTTBTT', 'TTTTRRTTTT', 'TBTTRRTGGT', 'TBBTTTTGGT', 'TTTTTTTTTT']
const PLATE = ['..WWWWWWW..', '.WWGGOOGWW.', 'WWGGOOOGGWW', 'WWOOOOGGGWW', '.WWGGOOOWW.', '..WWWWWWW..']
const ROBOT = ['...KK...', '..BBBB..', '.BWBBWB.', '.BBBBBB.', '..BRRB..', 'BBBBBBBB', 'B.BBBB.B', '..B..B..', '..B..B..']
const POP = ['.W.W.W.', 'WWWWWWW', 'RWRWRWR', 'RWRWRWR', 'RWRWRWR', '.RWRWR.']
// the fridge with a crayon drawing of a star stuck on with a magnet
function fridge(x, t, cx, cy, k, lt, { tape = false } = {}) {
  if (k <= 0.01) return
  card(x, cx, cy, 260, 420, '#e8ecf4', { k })
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = '#b9c0d4'; x.fillRect(-130, -70, 260, 6); x.fillStyle = INK; x.fillRect(100, -150, 10, 60); x.fillRect(100, -20, 10, 80)
  x.save(); x.rotate(-0.06); x.fillStyle = CREAM; x.fillRect(-90, -10, 150, 170)
  x.fillStyle = ORANGE; x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 26 : 56; x.lineTo(-15 + Math.cos(a) * r, 80 + Math.sin(a) * r) } x.fill()
  x.fillStyle = '#4a7ad8'; x.fillRect(-80, 140, 40, 8); x.fillRect(20, 140, 30, 8)
  x.restore()
  x.fillStyle = RED; x.fillRect(-28, -22, 26, 22); x.fillStyle = INK; x.fillRect(-28, 0, 26, 4)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Learned: be brave. | *Someone’s cheering.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 180 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.5, P.t0 + 2.1] })
      label(x, 800, 720, 'GO, KIDDO!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Learned: food | *means love.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, POT, { S: '#c9c9d8', K: INK, O: '#3a3166', R: '#c9552e' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1090, 'SECONDS: MANDATORY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: HONEY, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Learned: every story | *needs the voices.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, BOOK, { B: '#4a7ad8', W: CREAM, K: '#9aa5c4' }, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 680, 'ROAR!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 800, 1080, 'AGAIN! AGAIN!', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Learned: home | *is a feeling.*', mood: 'heart', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, HOUSE, { R: RED, W: CREAM, Y: GOLD, D: BROWN }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 800, 760, P.t0 + 0.9, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 3 })
      label(x, 800, 1100, 'ANYWHERE WITH YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Learned: the fridge | *is a gallery.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fridge(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 1110, 'MASTERPIECE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 7, 180, 0.3)
    } },
  { sign: 'virgo', cap: 'Learned: fold it | *with care.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.2) / 0.35))
      const rows = TOWELS.slice(8 - n * 2)
      drawBits(x, rows, { P: PINK, S: SKYB, M: MINT, L: LAV }, 800, 1000 - n * 26, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 700, 'CORNERS: CRISP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Learned: everyone gets | *an equal slice.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PIZZA, { C: '#c98f2a', Y: GOLD, R: RED, K: INK }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: t * 0.2 })
      label(x, 800, 1100, 'MEASURED. FAIR.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Learned: family | *keeps your secrets.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, { P: '#8a3a6a', W: CREAM, H: PINK, Y: GOLD }, 800, 860, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.05 })
      label(x, 800, 1100, 'SAFE WITH US', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Learned: road trips | *fix everything.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      drawBits(x, MAP, { T: '#ead7a8', G: '#5fd068', B: '#59c4ff', R: RED }, 800, 860, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.05 })
      bubble(x, 800, 650, 'are we | there yet?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1090, 'SNACKS: PACKED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Learned: work hard. | *Then sit for dinner.*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PLATE, { W: CREAM, G: '#5fd068', O: ORANGE }, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 700, 'PHONES DOWN', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Learned: be | *your weird self.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, ROBOT, { K: INK, B: '#c98f2a', W: SKYB, R: RED }, 800, 870, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 4) * 0.06 })
      label(x, 800, 1110, 'MADE OF BOXES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Learned: movie tears | *are allowed.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, POP, { W: CREAM, R: RED }, 800, 880, 32 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 680, 'EVERYONE CRIED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 220 * ease.outCubic(prog(lt, 0.6, 2.0)); x.beginPath(); x.ellipse(400, 1130, pw, 24, 0, 0, Math.PI * 2); x.fill()
    } },
]

const F = makeFilm({
  id: 'r2a0100', key: 'G', accent: HONEY, ending: 'callback',
  title: 'Lessons from home, | *by sign.*',
  cameos: CAMEOS,
  group: { cap: 'Home taught us. | *We carry it.*' },
  last: {
    text: 'Leo’s fridge art? | *Still up there.*',
    draw(x, t, lt) {
      fridge(x, t, 600, 1040, pop01(t, t - lt + 0.4, 0.45, 1.8), lt)
      const k = pop01(t, t - lt + 0.8, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 340, 1120, 220 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      sparkles(x, t, 600, 1040, t - lt + 1.2, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
