// r2t0392: star_talk, BELIKE (twelve signs), "Zodiacs cooking | be like." (first time in the kitchen; signs3kit social cut,
// music: lofi · E). Ending: callback (Capricorn's restaurant now serves Aquarius' cereal soup).
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN } from './gags.js'

const CAMEOS = [
  cam('aries', 'Skipped the recipe. | Started *at step nine.*', { mood: 'sparkle', hops: [0.6, 1.2] }, [
    ['bits', 'pot', 790, 960, 22, 0.2, {}],
    ['label', 790, 680, 'STEP 9 OF 9', 0.6, { size: 44, bg: RED, rot: -0.05, mono: true }],
  ]),
  cam('taurus', 'Ate the ingredients. | *Dinner’s done.*', { mood: lt => lt > 1.5 ? 'sleepy' : 'happy' }, [
    ['bits', 'plate', 790, 1040, 22, 0.2, {}],
    ['bits', 'muffin', 790, 960, 16, 0.2, { to: 1.0 }],
    ['label', 790, 700, 'GROCERIES: EATEN', 1.1, { size: 36, bg: GOLD, rot: 0.05, mono: true }],
  ]),
  cam('gemini', 'Two recipes. | *One pot.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0] }, [
    ['bits', 'pot', 790, 980, 22, 0.2, {}],
    ['label', 790, 680, 'PASTA + CAKE', 0.7, { size: 44, bg: MINT, rot: -0.04 }],
  ]),
  cam('cancer', 'Called mom. | *Forty times.*', { mood: lt => lt > 1.4 ? 'happy' : 'wide' }, [
    ['phone', 770, 940, 0.2, { head: 'MOM', headCol: PINK, big: '☎' }],
    ['label', 720, 640, lt => `CALL #${Math.min(40, 1 + Math.floor(lt * 18))}`, 0.4, { size: 42, bg: PINK, rot: 0.05, mono: true }],
  ]),
  cam('leo', 'Filmed every step. | *Forgot to cook.*', { mood: 'sparkle', hops: [0.9] }, [
    ['bits', 'camera', 790, 900, 20, 0.2, {}],
    ['label', 790, 680, '● REC', 0.5, { size: 48, bg: RED, rot: -0.04, mono: true }],
    ['label', 790, 1100, 'FOOD: RAW', 1.4, { size: 38, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam('virgo', 'Measured the salt. | *Per grain.*', { mood: 'squint' }, [
    ['label', 790, 860, lt => `GRAIN ${Math.min(212, Math.floor(lt * 90))}/212`, 0.3, { size: 46, bg: BONE, rot: 0.03, mono: true }],
    ['bubble', 770, 650, 'shh. | counting.', 1.0, { size: 44, tail: 'bl' }],
  ]),
  cam('libra', 'Bought eight spatulas. | *All matching.*', { mood: lt => lt > 1.3 ? 'heart' : 'happy' }, [
    ['fn', (x, t, lt, t0) => {
      for (let i = 0; i < 8; i++) {
        const k = pop01(t, t0 + 0.2 + i * 0.12, 0.25, 2)
        drawBits(x, BITS.spatula, { A: PINK, N: BONE }, 640 + i * 44, 950, 13 * k, { rot: (i - 3.5) * 0.06 })
      }
    }],
    ['label', 790, 700, 'AESTHETIC: ON', 1.3, { size: 40, bg: PINK, rot: -0.04 }],
  ]),
  cam('scorpio', 'Secret ingredient? | Won’t *ever say.*', { mood: lt => lt > 1.2 ? 'wink' : 'neutral' }, [
    ['bits', 'jar', 790, 940, 22, 0.2, {}],
    ['label', 790, 680, 'TOP SECRET', 0.8, { size: 46, bg: '#c97bff', rot: 0.05 }],
  ]),
  cam('sagittarius', 'Ten spices. | From *ten countries.*', { mood: 'sparkle', hops: [0.5, 1.2], star: { x: 150 }, look: [-1, 0] }, [
    ['fn', (x, t, lt, t0) => {
      const cols = [RED, ORANGE, GOLD, GREEN, '#c58b5c', RED, ORANGE, GOLD, GREEN, '#c58b5c']
      for (let i = 0; i < 10; i++) {
        const k = pop01(t, t0 + 0.2 + i * 0.1, 0.25, 2)
        drawBits(x, BITS.jar, { N: BROWN, W: BONE, O: cols[i], R: INK }, 170 + (i % 5) * 88, 960 + Math.floor(i / 5) * 120, 11 * k)
      }
    }],
    ['label', 340, 690, 'PASSPORT: STAMPED', 1.2, { size: 34, bg: ORANGE, rot: -0.05, mono: true }],
  ]),
  cam('capricorn', 'Made pasta once. | *Opened a restaurant.*', { mood: lt => lt > 1.2 ? 'happy' : 'neutral' }, [
    ['board', 790, 780, 0.3, { text: 'GRAND | OPENING', bg: GOLD, col: INK, size: 52, rot: 0.04 }],
    ['label', 800, 1110, 'EST. TODAY', 1.3, { size: 38, bg: BONE, rot: -0.04, mono: true }],
  ]),
  cam('aquarius', 'Invented a dish. | *Cereal soup.*', { mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1] }, [
    ['bits', 'bowl', 790, 960, 22, 0.2, {}],
    ['label', 790, 700, 'NEW! (WHY)', 1.0, { size: 44, bg: SKYB, rot: 0.05 }],
  ]),
  cam('pisces', 'Cried chopping onions. | *Then about life.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'squint' : 'wide' }, [
    ['bits', 'onion', 790, 960, 22, 0.2, {}],
    ['bubble', 770, 660, 'it’s just | so beautiful', 1.1, { size: 40, col: SKYB, tail: 'bl' }],
  ]),
]

const F = makeFilm({
  id: 'r2t0392', key: 'E', accent: '#ffb34a', ending: 'callback',
  title: 'Zodiacs cooking | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Dinner? | *We ordered in.*' },
  last: {
    text: 'Now serving: | *cereal soup.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, BITS.bowl, { K: INK, W: '#fff', C: CREAM, Y: GOLD, O: ORANGE, S: SKYB }, 540, 1080, 44 * pop01(t, t0 + 0.4, 0.4, 1.9))
      const k = pop01(t, t0 + 0.9, 0.3, 2)
      if (k > 0.01) {
        const { label } = LBL
        label(x, 540, 850, 'TABLE FOR 12', k, { size: 48, bg: GOLD, rot: -0.04 })
      }
      hearts(x, t, 540, 1240, t0 + 1.2, { n: 6, life: 2, spread: 600, cell: 8, seed: 4 })
    },
  },
})
import * as LBL from '../../signs3kit.js'
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
