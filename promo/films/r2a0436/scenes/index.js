// r2a0436: star_advice, ADVICE SOLO, "What Sags need | *from a friend.*" (signs3kit social cut, music: lofi · D).
// One sign the whole film (makeFilm solo mode, 9 cards): what a Sagittarius needs from a friend, a warm reframe and one gag each.
// Ending: callback (the postcard from card 2 comes back).
//   3.6–37.8   says yes to last-minute plans · room to roam (a postcard home) · honesty, back · laughs at the worst jokes
//              · patience with the late arrival · someone to chase sunsets with · says "let's go" to big ideas
//              · checks the birth chart too · space when they wander, a hug when they're home
//  37.8        "Free spirit. | *Loyal heart.*"
//  41.2        "Wish you were here. | *They mean it.*" (the postcard lands again)
import {
  makeFilm, sparkles, hearts, bubble, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import {
  L, at, phone, sheet, clock, chartWheel, buddy, postcard, drawBits, clamp, prog, ease, lerp,
  SUITCASE, suitcaseCols, SUN, SUN_C, MOON, MOON_C, PLANE, PLANE_C, RED, CREAM, ORANGE, TEAL, GREEN,
} from './props.js'

const PURPLE = '#b07bff'
const S = 'sagittarius'
const CAMEOS = [
  { sign: S, cap: 'A friend who says yes | to *last-minute plans.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 860, at(t, P, 0.15), { head: 'BESTIE', headCol: ORANGE, lines: [
        ['road trip?', PURPLE, at(t, P, 0.4)], ['leaving in 10', PURPLE, at(t, P, 0.7)], ['IN.', MINT, at(t, P, 1.3), true],
      ] })
      sparkles(x, t, 860, 880, P.t0 + 1.35, 6, 130, 0.2)
    } },
  { sign: S, cap: 'Room to roam. | They *always come back.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fly = ease.inOutCubic(prog(lt, 0.2, 1.0))
      drawBits(x, PLANE, PLANE_C, lerp(1000, 800, fly), lerp(560, 640, fly), 10 * at(t, P, 0.15), { rot: -0.1 })
      postcard(x, 790, 900, at(t, P, 1.0, 0.35, 2), { text: 'back soon ♡' })
      L(x, 790, 1110, 'POSTCARD #12', at(t, P, 1.5), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Honesty, back. | They can *take it.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'be real | with me.', at(t, P, 0.2, 0.25), { size: 44, tail: 'bl' })
      const B = buddy(x, t, 'virgo', 800, 980, 200, at(t, P, 0.6), { mood: 'neutral', look: [-1, 0], seed: 44 })
      if (B) bubble(x, 800, 1150, 'that shirt? no.', at(t, P, 1.1, 0.25), { size: 36, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Laugh at their | *worst jokes.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'why did the star…', at(t, P, 0.2, 0.25), { size: 36, tail: 'bl' })
      buddy(x, t, 'gemini', 800, 960, 210, at(t, P, 0.5), { mood: lt > 1.2 ? 'squint' : 'happy', look: [-1, 0], seed: 45, hops: [P.t0 + 1.3, P.t0 + 1.6] })
      L(x, 800, 1160, 'HA HA HA (JOKE #48)', at(t, P, 1.3), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Patience with | the *late arrival.*', mood: lt => lt > 1.4 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.4, 0.7],
    front(x, t, lt, P) {
      clock(x, 790, 820, at(t, P, 0.15), 7, Math.floor(10 + clamp(lt / 1.6) * 35), 110)
      L(x, 790, 1060, 'WORTH THE WAIT ♡', at(t, P, 1.4), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Someone to | *chase sunsets* with.', mood: 'heart', look: [1, 0], star: { x: -180 },
    back(x, t, lt, P) {
      const s = ease.inOutCubic(prog(lt, 0.2, 2.2))
      x.save(); x.beginPath(); x.rect(110, 480, 860, 740); x.clip()
      drawBits(x, SUN, SUN_C, 790, lerp(700, 900, s), 22 * at(t, P, 0.1))
      x.fillStyle = INK; x.fillRect(560, 960, 420, 8); x.fillStyle = '#3aa0d8'; x.fillRect(560, 968, 420, 120)
      x.restore()
    },
    front(x, t, lt, P) {
      buddy(x, t, 'leo', 680, 900, 160, at(t, P, 0.5), { mood: 'heart', look: [1, 0], seed: 46 })
      L(x, 790, 1150, 'RUN! IT’S SETTING!', at(t, P, 1.3), ORANGE, 0.04, 30)
    } },
  { sign: S, cap: 'Big idea? | Just say *“let’s go.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 860, at(t, P, 0.15), { w: 330, h: 330, head: 'THE PLAN', headCol: PURPLE, rot: 0.04, size: 28, rows: [
        ['1. the moon', INK, at(t, P, 0.5)], ['2. lunch there', INK, at(t, P, 0.8)], ['3. back by 6', INK, at(t, P, 1.1)],
      ] })
      drawBits(x, MOON, MOON_C, 920, 620 + 8 * Math.sin(t * 3), 12 * at(t, P, 0.9))
      L(x, 790, 1110, 'FRIEND: “LET’S GO.”', at(t, P, 1.5), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Check their | *birth chart* too.', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 830, at(t, P, 0.2), 140)
      L(x, 790, 1070, 'SAME FIRE ♡', at(t, P, 1.2), ORANGE, -0.04, 36)
      sparkles(x, t, 790, 830, P.t0 + 1.2, 7, 170, 0.6)
    } },
  { sign: S, cap: 'Space when they wander. | A *hug* when they’re home.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, SUITCASE, suitcaseCols(PURPLE), F.x - 150, F.cy + 120, 10 * at(t, P, 0.1))
      const come = ease.outCubic(prog(lt, 0.3, 1.1))
      buddy(x, t, 'cancer', lerp(900, 700, come), 930, 220, at(t, P, 0.3), { mood: lt > 1.1 ? 'heart' : 'happy', look: [-1, 0], seed: 47 })
      hearts(x, t, 590, 760, P.t0 + 1.2, { n: 6, life: 1.8, spread: 180, cell: 7, seed: 5 })
      L(x, 700, 640, 'WELCOME HOME', at(t, P, 1.3), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0436', key: 'D', accent: PURPLE, solo: S, ending: 'callback',
  title: 'What Sags need | *from a friend.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Loyal heart.*', mood: 'sparkle' },
  last: {
    text: 'Wish you were here. | *They mean it.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.6, 0.4, 2)
      postcard(x, 540, 1080, k * 1.35, { text: 'wish you were here ♡', rot: -0.05 })
      hearts(x, t, 540, 960, t - lt + 1.0, { n: 7, life: 2.0, spread: 420, cell: 8, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
