// r2a0663: star_advice, ADVICE SOLO (taurus), "Taurus, stubborn | *means loyal.*" (batch topic: "Taurus, your
// stubbornness is loyalty."; re-cut to two short lines so the hook fits) (signs3kit social cut, music: lofi · C).
// Nine cards: a relatable Taurus truth + a warm reframe, one light visual gag each. Ending: group.
//   same coffee order for years (devotion) · you don't drop people · slow to trust, then it's forever (a heart lock)
//   · team you in every fight (a pennant) · keeps a plant alive by pure will · picked one match, stopped searching
//   · stays to help clean up · same comfort show, still delighted · steady, so people lean on you (a support beam)
//   group (the ending) "Stubborn? | *Call it devoted.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'taurus', ST = { x: -170 }
const ACC = '#9be37a', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#2fc79a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const MUG = ['.MMMMMM...', 'MMMMMMMMMM', 'MCCCCCCM.M', 'MCCCCCCM.M', 'MCCCCCCMMM', 'MCCCCCCM..', '.MMMMMM...']
const LOCK = ['..KKKKK..', '.K.....K.', '.K.....K.', 'GGGGGGGGG', 'GGGHHHGGG', 'GGHHHHHGG', 'GGGHHHGGG', 'GGGGHGGGG', 'GGGGGGGGG']
const PENNANT = ['P.........', 'PRRRR.....', 'PRRRRRRR..', 'PRRRRRRRRR', 'PRRRRRRR..', 'PRRRR.....', 'P.........', 'P.........', 'P.........', 'P.........']
const PLANT = ['...G.G...', '..GGGGG..', '.GGG.GGG.', '..GGGGG..', '...GGG...', '....G....', '.RRRRRRR.', '.RRRRRRR.', '..RRRRR..', '..RRRRR..']
const BROOM = ['....B', '...B.', '..B..', '.B...', 'YYY..', 'YYYY.', 'YYYYY']
const TV = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', '....K..K....', '...KKKKKK...']

const CAMEOS = [
  { sign: SG, cap: 'Same coffee order. | *For years.* That’s devotion.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { M: CREAM, C: BROWN }, 790, 880, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 680, 'the usual?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      L(x, 790, 1100, 'THE USUAL ✓ ✓ ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'You don’t drop people. | *That’s rare.*', mood: 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 790, 920, 220, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.2 ? 'heart' : 'neutral' })
      bubble(x, 790, 680, 'still here?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bc' })
      L(x, 790, 1110, 'ALWAYS.', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 40)
    } },
  { sign: SG, cap: 'Slow to trust? | Then *it’s forever.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), shut = ease.outCubic(prog(lt, 1.0, 1.3))
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(0, -90 - (1 - shut) * 50, 70, Math.PI, 0); x.stroke()
        x.lineWidth = 20; x.strokeStyle = '#c9c9d8'; x.beginPath(); x.arc(0, -90 - (1 - shut) * 50, 70, Math.PI, 0); x.stroke()
        x.restore()
        drawBits(x, LOCK.slice(3), { G: GOLD, H: PINK }, 790, 900, 26 * k)
      }
      L(x, 790, 1110, 'LOCKED IN', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 36)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 160, 0.3)
    } },
  { sign: SG, cap: 'In a friend’s fight? | *Team them.* Always.', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, PENNANT, { P: BONE, R: RED }, 800 + Math.sin(t * 4) * 6, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.06 })
      L(x, 800, 650, 'GO, YOU!', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, 0.05, 40)
      L(x, 790, 1110, 'NO NOTES. JUST YOU.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 26)
    } },
  { sign: SG, cap: 'Keeps a plant alive | *by pure will.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const perk = ease.outCubic(prog(lt, 0.5, 1.4))
      drawBits(x, PLANT, { G: GREEN, R: '#c9653a' }, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: 0.7 + 0.3 * perk, rot: (1 - perk) * 0.3 })
      bubble(x, 800, 660, 'you WILL thrive.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1110, 'IT THRIVED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), ACC, -0.04, 34)
    } },
  { sign: SG, cap: 'Picked one match. | *Stopped searching.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      box(x, 790, 850, 280, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, () => {
        x.fillStyle = '#140c30'; x.fillRect(-126, -166, 252, 260)
        x.fillStyle = PINK; x.font = `700 28px ${MONO}`; x.fillText('♍︎ VIRGO', 0, 130)
      })
      friend(x, t, 'virgo', 790, 820, 170, pop01(t, P.t0 + 0.4, 0.3, 2), { mood: 'happy', look: [0, 0] })
      L(x, 790, 1110, 'SEARCH: CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Last one at the party. | *Helping clean.*', mood: 'happy', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P, F) {
      drawBits(x, BROOM, { B: BROWN, Y: GOLD }, F.x + 130, F.cy + 40 + Math.sin(t * 6) * 8, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 6) * 0.15 })
      L(x, 810, 680, 'HOST: CRYING (HAPPY)', pop01(t, P.t0 + 0.9, 0.3, 2.2), PINK, 0.05, 26)
      L(x, 810, 1110, 'DISHES: DONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Same comfort show. | *Still delighted.*', mood: lt => Math.floor(lt * 2) % 2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TV, { K: INK, S: '#6fc3ff' }, 800, 860, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      L(x, 800, 840, 'RE-WATCH #∞', pop01(t, P.t0 + 0.5, 0.3, 2.2), BONE, 0.03, 30)
      bubble(x, 800, 1080, 'my FAVOURITE part', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: SG, cap: 'You’re steady. | *People lean on that.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 },
    front(x, t, lt, P) {
      const lean = ease.outCubic(prog(lt, 0.4, 1.0))
      x.save(); x.translate(720, 1080); x.rotate(-0.28 * lean); x.translate(-720, -1080)
      friend(x, t, 'gemini', 720, 930, 200, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: lt > 1.0 ? 'happy' : 'sleepy' })
      x.restore()
      L(x, 800, 680, 'SUPPORT BEAM', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.05, 34)
      hearts(x, t, 560, 760, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'r2a0663', key: 'C', accent: ACC, solo: SG, ending: 'group',
  title: 'Taurus, stubborn | *means loyal.*',
  cameos: CAMEOS,
  group: {
    cap: 'Stubborn? | *Call it devoted.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
