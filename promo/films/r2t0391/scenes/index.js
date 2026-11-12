// r2t0391: star_talk, SOLO (aquarius), "Mad Aquarians | be like." (signs3kit social cut, music: lofi · C). Ending: lesson.
//   nine cards: a research paper about you · leaves the planet · speaks only in facts · a one-star protest
//   · profile mood "detached" · goes full robot · headphones on, nothing playing · "interesting." · the peace cactus
import { hearts } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE } from './gags.js'
import { signStar } from '../../startalk.js'

const S = 'aquarius', AQ = signStar(S)

const CAMEOS = [
  cam(S, 'Mad at you? | Sends a *research paper.*', { mood: lt => lt > 1.3 ? 'squint' : 'neutral' }, [
    ['doc', 780, 860, 0.2, { title: 'RE: YOU', rows: 4, chart: true, rot: 0.05 }],
    ['label', 790, 600, 'PEER-REVIEWED', 1.1, { size: 38, bg: MINT, rot: -0.05, mono: true }],
  ]),
  cam(S, 'Won’t yell. | Just *leaves the planet.*', { mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, -1] }, [
    ['fn', (x, t, lt) => {
      const rise = Math.max(0, lt - 0.6) * 170, flick = Math.floor(t * 12) % 2
      drawRocket(x, 790, 1000 - rise, flick, lt)
    }],
    ['bubble', 760, 620, 'brb. | orbit.', 1.2, { size: 48, col: LAV, tail: 'bl' }],
  ]),
  cam(S, 'Silent treatment? | Speaks *only in facts.*', { mood: 'neutral' }, [
    ['bubble', 770, 660, 'fact: | you were late.', 0.3, { size: 40, tail: 'bl', to: 1.3 }],
    ['bubble', 770, 660, 'fact: | i am fine.', 1.3, { size: 46, col: SKYB, tail: 'bl' }],
    ['label', 790, 900, 'FEELINGS: 0', 0.7, { size: 38, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam(S, 'Holds a protest. | *About you.*', { mood: 'squint', hops: [0.8, 1.4, 2.0] }, [
    ['board', 790, 780, 0.2, { text: 'UNFAIR!', rot: -0.08 }],
    ['label', 800, 1120, 'CROWD: 1', 1.2, { size: 42, bg: ORANGE, rot: 0.05, mono: true }],
  ]),
  cam(S, 'Updated their profile. | Mood: *“detached.”*', { mood: lt => lt > 1.2 ? 'squint' : 'neutral' }, [
    ['profile', 790, 860, 0.2, { sign: S, glyph: AQ.glyph, color: AQ.color, status: lt => lt > 1.1 ? 'DETACHED' : 'GREAT!', statusCol: RED }],
  ]),
  cam(S, 'Upset? | Goes *full robot.*', { mood: 'neutral', look: [0, 0] }, [
    ['bubble', 770, 640, 'beep. | not upset.', 0.4, { size: 48, col: GREY, tail: 'bl' }],
    ['label', 790, 900, 'EMOTIONS: OFF', 1.1, { size: 40, bg: RED, rot: -0.04, mono: true }],
  ]),
  cam(S, 'Headphones on. | *Nothing playing.*', { mood: 'sleepy', look: [0, 0] }, [
    ['fn', (x, t, lt, t0) => {
      // the headphones sit on the star's head (star at 370, 880, size 300)
      if (lt > 0.2) drawBitsLocal(x, BITS.headphones, 370, 790, 30 * Math.min(1, (lt - 0.2) / 0.3))
    }],
    ['label', 790, 760, 'VOLUME: 0', 0.9, { size: 44, bg: MINT, rot: 0.05, mono: true }],
    ['label', 790, 900, 'DO NOT TALK', 1.4, { size: 34, bg: ORANGE, rot: -0.05 }],
  ]),
  cam(S, 'Says “interesting.” | You’re *in trouble.*', { mood: lt => lt > 1.2 ? 'squint' : 'neutral' }, [
    ['bubble', 770, 660, 'interesting.', 0.4, { size: 56, tail: 'bl' }],
    ['label', 790, 880, 'RUN. (KINDLY.)', 1.3, { size: 42, bg: RED, rot: 0.05 }],
  ]),
  cam(S, 'Forgives you. | With *a weird cactus.*', { mood: lt => lt > 1.2 ? 'heart' : 'happy', keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0] }, [
    ['bits', 'cactus', 790, 930, 24, 0.3, {}],
    ['label', 790, 660, 'PEACE CACTUS', 1.0, { size: 42, bg: GREEN, rot: -0.05 }],
    ['hearts', 790, 900, 1.4, { n: 4 }],
  ]),
]

import { drawBits } from '../../signs3kit.js'
import { INK } from '../../signs3kit.js'
const COLS = { K: INK, W: '#ffffff', R: RED, S: SKYB, O: ORANGE, Y: GOLD }
function drawBitsLocal(x, bm, cx, cy, cell) { drawBits(x, bm, COLS, cx, cy, cell) }
function drawRocket(x, cx, cy, flick, lt) {
  const k = Math.min(1, lt / 0.3)
  const bm = flick ? BITS.rocket : BITS.rocket.map((r, j) => j >= 10 ? r.replace(/O/g, 'T').replace(/Y/g, 'O').replace(/T/g, 'Y') : r)
  drawBits(x, bm, COLS, cx, cy, 20 * k)
}

import { makeFilm } from '../../signs3kit.js'
const F = makeFilm({
  id: 'r2t0391', key: 'C', accent: '#6fc3ff', solo: S, ending: 'lesson',
  title: 'Mad Aquarians | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Calm. | *Concerningly calm.*', mood: 'neutral' },
  lesson: { text: 'Give them space. | They *come back.*', chip: 'SPACE: GIVEN' },
  last: {
    text: 'The cactus | *means sorry.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
