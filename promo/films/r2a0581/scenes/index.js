// r2a0581: star_advice, ADVICE SOLO (libra), "Libra, let yourself | *be loved.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine gentle truths about a Libra who gives love easily and takes it awkwardly, each with a warm
// reframe and one light gag. Ending: card (lesson + last line over the Libra + Taurus match card: Taurus is the friend
// Libra finally leans on, card 9).
//   keeping everyone's peace · "I don't mind" · handing compliments back · planning everyone's birthday · said sorry to a
//   chair · "are we okay?" · holding the door forever · the compatibility check · lean on someone (Taurus)
//   group "So much love to give. | *Take some back.*"  lesson "Being loved isn’t a debt. | *Let it land.*"  HEART: RECEIVING
//   last "Taurus is | *not letting go.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, scales, fitTitleScenes, meter, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fd8', S = 'libra', ST = { x: -190 }
const CHAIR = ['W.......', 'W.......', 'W.......', 'W.......', 'WWWWWWWW', 'WWWWWWWW', 'W......W', 'W......W', 'W......W']
const DOOR = ['KKKKKKKK', 'KDDDDDDK', 'KDddddDK', 'KDdDDdDK', 'KDddddDK', 'KDDDDYDK', 'KDddddDK', 'KDdDDdDK', 'KDddddDK', 'KDDDDDDK', 'KKKKKKKK']
const CAKE = ['...F.F.F...', '...C.C.C...', '.PPPPPPPPP.', 'WWWWWWWWWWW', 'PPPPPPPPPPP', 'WWWWWWWWWWW', 'PPPPPPPPPPP']

const CAMEOS = [
  { sign: S, cap: 'Always keeping the peace? | *You deserve peace too.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const tilt = lt < 1.0 ? -0.22 : lerp(-0.22, 0.22, ease.inOutCubic(prog(lt, 1.0, 1.5)))
      scales(x, 750, 920, 1.0 * pop01(t, P.t0 + 0.2, 0.3, 2), tilt, 'THEM', 'YOU')
      L(x, 800, 1150, 'BALANCE: FIXED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Said “I don’t mind”? | *You’re allowed to mind.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'I don’t mind! | (I mind.)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      if (lt > 0.6) swapLabel(x, 800, 1000, lt, 1.2, 'OPINION: HIDDEN', 'OPINION: WELCOME', { size: 32 })
    } },
  { sign: S, cap: 'Got a compliment? | *Keep it.* Don’t return it.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 810, 850, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 200, head: 'FOR YOU', headBg: ACC, headInk: INK, lines: ['you look', 'amazing'], size: 38, rot: 0.04 })
      bubble(x, 560, 620, 'no, YOU—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
      L(x, 800, 1080, 'RETURNS: NOT ACCEPTED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Planned every birthday? | *Let them plan yours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { F: GOLD, C: BONE, P: ACC, W: CREAM }, 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'PLANNED: 31 PARTIES', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, -0.04, 28)
      L(x, 800, 1100, 'THIS ONE: FOR YOU', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.04, 32)
      sparkles(x, t, 800, 880, P.t0 + 1.3, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Said sorry to a chair? | *Be that gentle with you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [0.5],
    front(x, t, lt, P) {
      const wob = lt < 0.9 ? Math.sin(t * 28) * 0.06 : 0
      drawBits(x, CHAIR, { W: '#c98f5a' }, 820, 960, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: wob })
      bubble(x, 800, 690, 'oh! sorry!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1160, 'THE CHAIR IS FINE', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Asked “are we okay?” | *Yes. Always.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'BESTIE', headCol: ACC, lines: [['are we ok?', BONE, 1, true], ['always.', MINT, lt > 1.0 ? pop01(lt, 1.0, 0.25, 2) : 0], ['why lol', MINT, lt > 1.4 ? pop01(lt, 1.4, 0.25, 2) : 0]], typing: lt > 0.5 && lt < 1.0 ? 1 : 0, size: 26 })
      hearts(x, t, 620, 820, P.t0 + 1.5, { n: 4, life: 1.5, spread: 140, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Holding every door? | *Walk through one.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, D: '#8a5a3a', d: '#6b4228', Y: GOLD }, 830, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 820, 650, 'AFTER YOU. NO, YOU.', pop01(t, P.t0 + 0.5, 0.3, 2), BONE, -0.04, 30)
      L(x, 820, 1120, 'NEXT: LIBRA ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Ran the compatibility check? | *Love said yes.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 800, 700, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), LAV, -0.03, 30)
      meter(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.3, 1.1)), { col: ACC, w: 340, title: 'LIBRA + BEING LOVED' })
      L(x, 800, 1030, 'MATCH: OBVIOUSLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 34)
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Balancing everyone? | *Lean on someone.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -150, y: 0 }, squash: lt => lt > 0.8 ? 0.04 : 0,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 700, 900, 260, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 35 })
      bubble(x, 820, 650, 'I got you.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      L(x, 760, 1140, 'LEANING: ALLOWED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
      hearts(x, t, 540, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 180, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0581', key: 'D', accent: ACC, solo: S, ending: 'card',
  title: 'Libra, let yourself | *be loved.*',
  cameos: CAMEOS,
  card: { a: 'libra', b: 'taurus', chip: 'LOVED' },
  group: { cap: 'So much love to give. | *Take some back.*', mood: 'heart' },
  lesson: { text: 'Being loved isn’t a debt. | *Let it land.*', chip: 'HEART: RECEIVING' },
  last: { text: 'Taurus is | *not letting go.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
