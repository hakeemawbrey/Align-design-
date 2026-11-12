// r2t0186: star_talk ROLLCALL, "The signs | at a thrift store." (~57 s vertical, signs3kit social cut, music: lofi · C).
// Ending: 'callback'.
//   0.0–3.6    "The signs | *at a thrift store.*"
//   3.6–49.2   ♈ wore the jacket out, tag still on · ♉ sat in an armchair, bought it, still sitting · ♊ two hats at once
//              · ♋ adopted a sad teddy · ♌ a velvet cape, worn to checkout · ♍ re-sorted the whole rack by colour
//              · ♎ matching sweaters for a match not met yet · ♏ trench coat, now untraceable · ♐ bought a canoe,
//              lives on floor 4 · ♑ a three-dollar suit, CEO energy · ♒ did a lamp's birth chart · ♓ cried at a stranger's postcard
//  49.2        "One shop. | *Twelve new eras.*"
//  52.6        callback: "The canoe? | *Still in the hallway.*"  Sagittarius's canoe is stuck across a doorway.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { txt, card, wheel, shadesCells, tag, CREAM, RED, ORANGE, WOOD, GREY, DEEP, GREEN, PURPLE, NIGHT } from './props.js'

const ACC = '#7dffb0', L = { x: -160 }, R = { x: 160 }

const JACKET = ['..DDD.DDD..', '.DDDDJDDDD.', 'DDDDDJDDDDD', 'DDDDDJDDDDD', 'DD.DDJDD.DD', 'DD.DDJDD.DD', 'DD.DDJDD.DD', 'DD.DDJDD.DD', '...DDJDD...', '...DDJDD...']
const JACKET_C = { D: '#3d6fd8', J: '#9aa5c4' }
const CHAIR = ['.AAAAAAAAAAAA.', 'AAaaaaaaaaaaAA', 'AAaaaaaaaaaaAA', 'AAaaaaaaaaaaAA', 'AAaaaaaaaaaaAA', 'AAAAAAAAAAAAAA', 'AAaaaaaaaaaaAA', 'AAAAAAAAAAAAAA', '.W..........W.', '.W..........W.']
const CHAIR_C = { A: '#b0485a', a: '#d8667a', W: WOOD }
const TOPHAT = ['..KKKKK..', '..KKKKK..', '..KKKKK..', '..RRRRR..', 'KKKKKKKKK']
const CAP = ['...YYYY....', '..YYYYYY...', '.YYYYYYYY..', 'YYYYYYYYYYY', '......YYYYY']
const TEDDY = ['.BB.....BB.', 'BbbB...BbbB', 'BBBBBBBBBBB', '.BBKBBBKBB.', '.BBBBNBBBB.', '..BBBBBBB..', '.BBBPPBBBB.', 'BBBBPPBBBBB', 'BBBBBBBBBBB', '.BB.....BB.']
const TEDDY_C = { B: '#b07a4a', b: '#e0a878', K: INK, N: '#3a2418', P: '#ff8fb1' }
const SHIRT = ['.SS.SS.', 'SSSSSSS', 'SSSSSSS', '.SSSSS.', '.SSSSS.', '.SSSSS.']
const SWEATER = ['..SS...SS..', '.SSSSSSSSS.', 'SSSSSSSSSSS', 'SSSHH.HHSSS', 'SSSHHHHHSSS', 'SS.SHHHS.SS', 'SS.SSHSS.SS', '...SSSSS...']
const CANOE = ['C..................C', 'CCwwwwwwwwwwwwwwwwCC', '.CCCCCCCCCCCCCCCCCC.', '..CCCCCCCCCCCCCCCC..']
const CANOE_C = { C: '#e0703a', w: '#8a4a2e' }
const CASE = ['...KKKK...', '...K..K...', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBGGBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const CASE_C = { K: INK, B: '#6a4028', G: GOLD }
const LAMP = ['..GGGGG..', '.LLLLLLL.', '.LlLLLLL.', '.LLLLlLL.', '.LLLLLLL.', '.LlLLLLL.', '..LLLLL..', '...GGG...', '..GGGGG..', '.GGGGGGG.']
const LAMP_C = { G: GREY, L: '#ff6bd0', l: '#ffd23a' }

/** a clothes rail with eight shirts that slide into rainbow order */
function rack(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 14); x.fillRect(-186, -150, 10, 300); x.fillRect(176, -150, 10, 300)
  x.fillStyle = GREY; x.fillRect(-186, -146, 372, 6)
  const COLS = ['#ff6b5a', '#ff9a4a', '#ffd23a', '#5fd068', '#8fe3ff', '#6f8cff', '#c97bff', '#ff8fb1']
  const START = [5, 2, 7, 0, 3, 6, 1, 4]
  const p = ease.inOutCubic(prog(lt, 0.5, 1.6))
  COLS.forEach((c, i) => {
    const px = lerp(-158 + START[i] * 45, -158 + i * 45, p)
    x.fillStyle = INK; x.fillRect(px - 2, -140, 4, 22)
    drawBits(x, SHIRT, { S: c }, px, -70, 9)
  })
  x.restore()
}
/** a postcard with a little heart and a short note */
function postcard(x, cx, cy, k) {
  card(x, cx, cy, 340, 230, k, { bg: CREAM, rot: 0.06 }, () => {
    x.fillStyle = '#8fc8ee'; x.fillRect(-150, -95, 120, 80); x.fillStyle = '#9fd8a0'; x.fillRect(-150, -40, 120, 25)
    x.fillStyle = GREY; x.fillRect(8, -100, 2, 190)
    txt(x, 'miss you', 80, -50, { size: 28, color: '#6b62a8' })
    txt(x, 'always', 80, -6, { size: 28, color: '#6b62a8' })
    drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: RED }, 80, 55, 6)
    txt(x, '1974', -90, 60, { size: 26, font: MONO, weight: 700, color: GREY })
  })
}
/** a doorway with the canoe jammed across it (the callback) */
function doorway(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -230, 260, 460); x.fillStyle = WOOD; x.fillRect(-120, -220, 240, 450); x.fillStyle = '#2a1a3a'; x.fillRect(-96, -196, 192, 426)
  x.restore()
  const wob = Math.sin(t * 9) * 0.03 * (lt > 0.8 ? 1 : 0)
  drawBits(x, CANOE, CANOE_C, cx + 20, cy + 30, 26 * k, { rot: -0.08 + wob })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saw a jacket. | *Already wearing it.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: L, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, JACKET, JACKET_C, 790, 880, 24 * k)
      tag(x, 900, 1010 + Math.sin(t * 5) * 6, 'TAG: STILL ON', pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.18, bg: GOLD, size: 26 })
      bubble(x, 790, 640, 'mine!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 46, col: CREAM, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Sat in an armchair. | *Bought it. Still sitting.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: 0, y: -10 },
    back(x, t, lt, P) { drawBits(x, CHAIR, CHAIR_C, 540, 1000, 30 * pop01(t, P.t0 + 0.15, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SOLD TO: ME', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 38, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Two hats. | *At the same time.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: 0, y: 30 }, hops: [1.0],
    front(x, t, lt, P, F) {
      const a = ease.outBack(prog(lt, 0.3, 0.7)), b = ease.outBack(prog(lt, 0.8, 1.2))
      if (a > 0.01) drawBits(x, CAP, { Y: MINT }, F.x + 6, F.top - 14 - (1 - a) * 260, 14)
      if (b > 0.01) drawBits(x, TOPHAT, { K: '#2a2350', R: PINK }, F.x, F.top - 92 - (1 - b) * 260, 14, { rot: 0.06 })
      label(x, 820, 1120, 'BOTH MOODS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Found a sad teddy. | *It needed a home.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, TEDDY, TEDDY_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: Math.sin(t * 2) * 0.05 })
      label(x, 790, 1120, 'ADOPTED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Found a velvet cape. | *Wore it to checkout.*', mood: 'sparkle', star: { x: -130 }, hops: [0.9, 1.7],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.25, 0.7))
      if (k <= 0.01) return
      const sw = Math.sin(t * 4) * 18
      x.save(); x.fillStyle = INK; x.beginPath(); x.moveTo(F.x - 90, F.cy - 40); x.lineTo(F.x + 90, F.cy - 40); x.lineTo(F.x + 160 + sw, F.cy - 40 + 300 * k); x.lineTo(F.x - 160 + sw, F.cy - 40 + 300 * k); x.closePath(); x.fill()
      x.fillStyle = RED; x.beginPath(); x.moveTo(F.x - 80, F.cy - 34); x.lineTo(F.x + 80, F.cy - 34); x.lineTo(F.x + 148 + sw, F.cy - 46 + 300 * k); x.lineTo(F.x - 148 + sw, F.cy - 46 + 300 * k); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      label(x, 810, 700, 'ICONIC', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05 })
      bubble(x, 810, 1080, 'no bag, | thanks.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
      sparkles(x, t, 430, 860, P.t0 + 0.7, 7, 220, 0.4)
    } },
  { sign: 'virgo', cap: 'Re-sorted the whole rack. | *By colour.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      rack(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1120, 'STAFF? NO.', pop01(t, P.t0 + 1.7 * 1.29, 0.3, 2.2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Bought matching sweaters. | *For a match.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, SWEATER, { S: PINK, H: RED }, 720, 880, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.08 })
      drawBits(x, SWEATER, { S: PINK, H: RED }, 880, 900, 18 * pop01(t, P.t0 + 0.45, 0.35, 2), { rot: 0.08 })
      label(x, 800, 1110, 'HAVEN’T MET THEM YET', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04 })
      hearts(x, t, 800, 760, P.t0 + 1.0, { n: 4, life: 1.6, spread: 200, cell: 6, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'Trench coat on. | *Now untraceable.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -60, y: 20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k > 0.01) inSprite(x, F, () => {
        x.globalAlpha = k
        x.fillStyle = '#b8935a'; x.fillRect(5, 24, 9, 9); x.fillRect(22, 24, 9, 9); x.fillStyle = INK; x.fillRect(13, 26, 10, 1)
        if (lt > 0.7) shadesCells(x)
      })
      label(x, 840, 680, 'INCOGNITO', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: PURPLE, color: CREAM, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 830, 1110, '…who?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 42, col: CREAM, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Bought a canoe. | *Lives in an apartment.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [-1, 0], star: R, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CANOE, CANOE_C, 330, 890, 22 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.5 })
      label(x, 320, 1120, 'FLOOR: 4', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 40, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 340, 640, 'it’ll fit.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 40, col: CREAM, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'A three-dollar suit. | *CEO energy.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      drawBits(x, CASE, CASE_C, 320, 980, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      label(x, 320, 700, 'PRICE: $3', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 330, 1150, 'per my last memo', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 32, col: CREAM, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Bought a vintage lamp. | *Did its birth chart.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, LAMP, LAMP_C, 790, 980, 22 * k)
      wheel(x, 790, 690, 90, pop01(t, P.t0 + 0.8, 0.35, 2), t, 0.25)
      label(x, 790, 1170, 'LAMP: A GEMINI', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Read a stranger’s postcard. | *Sobbed.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, -1], star: L,
    front(x, t, lt, P) {
      postcard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1110, 'WHO ARE THEY?!', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0186', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *at a thrift store.*',
  cameos: CAMEOS,
  group: { cap: 'One shop. | *Twelve new eras.*' },
  last: {
    text: 'The canoe? | *Still in the hallway.*',
    draw(x, t, lt) {
      doorway(x, t, 600, 1110, pop01(t, t - lt + 0.4, 0.4, 2), lt)
      const k = pop01(t, t - lt + 0.7, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'sagittarius', 250, 1180, 200 * k, { mood: lt > 1.6 ? 'squint' : 'sparkle', look: [1, 0], seed: 47, hops: [t - lt + 1.2, t - lt + 2.2] })
      bubble(x, 300, 950, 'almost…', pop01(t, t - lt + 1.4, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
