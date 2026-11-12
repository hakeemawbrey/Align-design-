// r2t0394: star_talk, BELIKE (twelve signs), "Zodiacs when their name's spelled wrong | be like." shown as
// "Name spelled wrong? | Zodiacs *be like.*" (signs3kit social cut, music: lofi · D). Ending: lesson.
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

const CUP = (name, at = 0.2, o = {}) => ['cup', 790, 980, at, { name, ...o }]

const CAMEOS = [
  cam('aries', 'Corrected it. | *Loudly. In caps.*', { mood: 'wide', hops: [0.6, 1.0] }, [
    CUP('AIRES'),
    ['bubble', 770, 640, 'IT’S ARIES!!', 0.8, { size: 52, col: RED, tail: 'bl' }],
  ]),
  cam('taurus', 'Didn’t care. | *The muffin was good.*', { mood: lt => lt > 1.4 ? 'sleepy' : 'happy' }, [
    CUP('TORUS', 0.2, { rot: -0.06 }),
    ['bits', 'muffin', 620, 700, 14, 0.8, {}],
    ['label', 820, 650, 'NAME: WHATEVER', 1.3, { size: 34, bg: GOLD, rot: 0.05, mono: true }],
  ]),
  cam('gemini', 'Two names now. | *Answers to both.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0] }, [
    ['cup', 640, 1000, 0.2, { name: 'JEMINI', rot: -0.08, s: 0.72 }],
    ['cup', 845, 1010, 0.5, { name: 'GEMMY', rot: 0.08, col: '#4f7dff', s: 0.72 }],
    ['label', 790, 640, 'BOTH. OBVIOUSLY.', 1.2, { size: 38, bg: MINT, rot: -0.04 }],
  ]),
  cam('cancer', 'Kept the cup. | *Framed it.*', { mood: lt => lt > 1.2 ? 'heart' : 'sparkle' }, [
    ['frame', 790, 860, 0.2, { text: 'KANSER', size: 60, col: RED, bg: CREAM }],
    ['label', 790, 1080, 'A MEMORY ♡', 1.2, { size: 40, bg: PINK, rot: 0.04 }],
  ]),
  cam('leo', 'Signed the cup. | *Autograph included.*', { mood: 'sparkle', hops: [1.0] }, [
    CUP('LEEO'),
    ['label', 790, 650, '♌ SIGNED: LEO', 0.9, { size: 40, bg: ORANGE, rot: -0.04 }],
    ['sparkles', 790, 900, 1.2, { n: 6, R: 170 }],
  ]),
  cam('virgo', 'Sent a correction. | *With footnotes.*', { mood: 'squint' }, [
    ['doc', 790, 880, 0.2, { title: 'ERRATA', rows: 5, marks: 2, rot: 0.04 }],
    ['label', 790, 630, 'V-I-R-G-O ¹', 1.1, { size: 44, bg: RED, rot: -0.05, mono: true }],
  ]),
  cam('libra', 'Said “it’s fine!” | *It is not fine.*', { mood: lt => lt > 1.2 ? 'squint' : 'happy' }, [
    CUP('LIBBY'),
    ['bubble', 770, 650, 'no worries!', 0.6, { size: 46, tail: 'bl', to: 1.3 }],
    ['bubble', 770, 650, '(worries.)', 1.3, { size: 46, col: PINK, tail: 'bl' }],
  ]),
  cam('scorpio', 'Gave a fake name. | *On purpose.*', { mood: lt => lt > 1.2 ? 'wink' : 'neutral' }, [
    CUP('BOB'),
    ['label', 790, 650, 'IDENTITY: SAFE', 1.0, { size: 40, bg: '#c97bff', rot: -0.04, mono: true }],
  ]),
  cam('sagittarius', 'Laughed so hard | they *spilled it.*', { mood: 'happy', hops: [0.5, 0.9, 1.3], star: { x: 150 }, look: [-1, 0] }, [
    ['cup', 320, 960, 0.2, { name: 'SAJ', rot: lt => lt > 1.1 ? -1.3 : -0.05 }],
    ['bubble', 320, 650, 'HAHAHA', 0.6, { size: 52, col: GOLD, tail: 'br' }],
  ]),
  cam('capricorn', 'Filed a | *formal complaint.*', { mood: 'neutral', look: [1, 0] }, [
    ['doc', 790, 880, 0.2, { title: 'FORM 12-C', rows: 5, ticks: 4, rot: 0.04 }],
    ['label', 790, 640, 'RE: “CAPRICORNE”', 1.0, { size: 36, bg: GOLD, rot: -0.04, mono: true }],
  ]),
  cam('aquarius', 'Loved the new name. | *Using it now.*', { mood: 'sparkle', look: [1, -1] }, [
    CUP('ZORP'),
    ['label', 790, 650, 'HELLO, I’M ZORP', 1.0, { size: 40, bg: SKYB, rot: 0.05 }],
  ]),
  cam('pisces', 'Spelled wrong? | *Sobbed in the café.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'squint' : 'wide' }, [
    CUP('PICES'),
    ['bubble', 770, 650, 'nobody | knows me', 1.0, { size: 44, col: SKYB, tail: 'bl' }],
  ]),
]

const F = makeFilm({
  id: 'r2t0394', key: 'D', accent: '#ff8fb1', ending: 'lesson',
  title: 'Wrong name? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero right names.*' },
  lesson: { text: 'They spelled it wrong. | You’re *still you.*', chip: 'NAME: STILL YOURS' },
  last: {
    text: 'Bob says | *hi, by the way.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
