// r2a0400: star_advice ADVICE ROLLCALL, "What each sign is | secretly proud of." (signs3kit social cut, music: lofi · G). Ending: callback.
//   ♈ first to say sorry · ♉ every plant still alive · ♊ remembers everyone's inside jokes · ♋ the family recipe, perfected
//   · ♌ hypes friends louder than themselves · ♍ one perfectly folded fitted sheet · ♎ made the shy guest feel included
//   · ♏ every secret ever told, kept · ♐ got lost, found the best café · ♑ a savings jar named "Future" · ♒ makes the group
//   chat laugh · ♓ cries at every friend's win.   group: "Small wins. | Big pride."   callback: "The fitted sheet? | Still perfect."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#7dffb0', RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', '..G..', 'TTTTT', '.TTT.', '.TTT.']
const POT = ['.S.S.S.', '..S.S..', 'KKKKKKK', 'KRRRRRK', 'KRRRRRK', '.KRRRK.']
const MEGA = ['......YY', '....YYYY', 'KKYYYYYY', 'KKYYYYYY', '....YYYY', '......YY']
const SHEET = ['WWWWWWWWWW', 'WBWWWWWWBW', 'WWWWWWWWWW', 'WWWWWWWWWW', 'WBWWWWWWBW', 'WWWWWWWWWW']
const SHEET_C = { W: '#e8f0ff', B: '#c4d4f0' }
const VAULT = ['.KKKKKKKK.', 'KSSSSSSSSK', 'KSSSYYSSSK', 'KSSYKKYSSK', 'KSSYKKYSSK', 'KSSSYYSSSK', 'KSSSSSSSSK', '.KKKKKKKK.']
const CUP = ['.W.W.', '..W..', 'BBBBBB', 'BCCCBB', 'BCCCB.', '.BBB..']
const JAR = ['.KKKKK.', 'KWWWWWK', 'KWYWWYK', 'KWWYWWK', 'KYWWYWK', 'KWYYWYK', '.KKKKK.']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Being first | *to say sorry.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      bubble(x, 800, 760, 'sorry! my bad!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 960, 'FIRST. AS ALWAYS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'taurus', cap: 'Their plants. | *All still alive.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, PLANT, { G: '#5fd068', T: '#c98f5a' }, 680 + i * 120, 920, 18 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 700, 'ALIVE: ALL 14', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 36)
      L(x, 800, 1110, 'EACH HAS A SIGN', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Remembering everyone’s | *inside jokes.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['the duck thing!', 'NOT the soup…', 'Tuesday, ha!'].forEach((s, i) => bubble(x, 700 + (i % 2) * 150, 660 + i * 150, s, pop01(t, P.t0 + 0.3 + i * 0.35, 0.25, 2.2), { size: 32, col: i % 2 ? '#ffe36a' : BONE, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'The family recipe. | *Perfected.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, POT, { S: '#ffffff', K: INK, R: RED }, 800, 960, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 800, 690, 260, 120, pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.05 }, () => { x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NANA’S SOUP', 0, -18); x.fillText('v. 31 (best)', 0, 22) })
      hearts(x, t, 370, 800, P.t0 + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Hyping friends | *louder than themselves.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, MEGA, { Y: GOLD, K: INK }, F.x + 170, F.cy - 10, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'THAT’S MY FRIEND!!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1110, 'VOLUME: MAX', pop01(t, P.t0 + 1.4, 0.3, 2.4), ACC, 0.04, 34)
    } },
  { sign: 'virgo', cap: 'One perfectly folded | *fitted sheet.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.4, 1.2))
      drawBits(x, SHEET, SHEET_C, 800, 900, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: lerp(1.4, 0.7, f), sy: lerp(1.6, 0.6, f), rot: lerp(0.3, 0, f) })
      if (lt > 1.2) { L(x, 800, 720, 'IMPOSSIBLE. DONE.', pop01(t, P.t0 + 1.25, 0.3, 2.4), MINT, -0.04, 32); sparkles(x, t, 800, 900, P.t0 + 1.25, 7, 140, 0.3) }
    } },
  { sign: 'libra', cap: 'Making the shy guest | *feel included.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 820, 960, 150 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 620, 720, 'come sit with us!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 32, col: PINK, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 820, 860, t - lt + 1.3, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Every secret ever told. | *Still kept.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, VAULT, { K: INK, S: '#6b62a8', Y: GOLD }, 800, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 0.9 && lt < 1.3 ? 0.04 * Math.sin(t * 40) : 0 })
      L(x, 800, 1110, 'VAULT: SEALED', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#c97bff', -0.04, 34, CREAM)
    } },
  { sign: 'sagittarius', cap: 'Got very lost. | *Found the best café.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      L(x, 800, 690, 'WRONG TURN #6', pop01(t, P.t0 + 0.3, 0.3, 2), BONE, -0.04, 34)
      drawBits(x, CUP, { W: '#ffffff', B: '#ffb34a', C: '#8a4a2e' }, 800, 910, 26 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      L(x, 800, 1110, 'HIDDEN GEM', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'A savings jar | named *“Future.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, W: '#c4f0ff', Y: GOLD }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, '“FUTURE”', pop01(t, P.t0 + 0.8, 0.3, 2.2), BONE, 0.04, 40)
      L(x, 800, 1110, 'GROWING, SLOWLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Making the group chat | *actually laugh.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      ;['HAHAHA', 'stop it', 'crying'].forEach((s, i) => bubble(x, 760 + (i % 2) * 80, 680 + i * 140, s, pop01(t, P.t0 + 0.4 + i * 0.35, 0.25, 2.2), { size: 36, col: i % 2 ? SKYB : MINT, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'pisces', cap: 'Crying at | *every friend’s win.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, 800, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 690, 'YOU DID IT!!', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, -0.04, 38)
      sparkles(x, t, 800, 900, P.t0 + 0.9, 8, 150, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0400', key: 'G', accent: ACC, ending: 'callback',
  title: 'What each sign is | secretly *proud of.*',
  cameos: CAMEOS,
  group: { cap: 'Small wins. | *Big pride.*' },
  last: {
    text: 'The fitted sheet? | *Still perfect.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'sparkle', seed: 7, look: [1, 0], hops: [t0 + 1.3] })
      drawBits(x, SHEET, SHEET_C, 740, 1110, 36 * pop01(t, t0 + 0.6, 0.4, 2), { sx: 0.7, sy: 0.6 })
      if (lt > 1.0) L(x, 740, 960, 'DAY 400', pop01(t, t0 + 1.0, 0.3, 2.4), GOLD, -0.05, 44)
      if (lt > 1.2) sparkles(x, t, 740, 1110, t0 + 1.2, 8, 150, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
