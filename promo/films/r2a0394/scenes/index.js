// r2a0394: star_advice, ADVICE ROLLCALL (twelve signs), "How signs keep | friends close." (signs3kit social cut,
// music: lofi · E). Ending: callback (Aquarius is back: "so anyway—").
import { makeFilm, hearts, drawBits, pop01, bubble, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

const CAMEOS = [
  cam('aries', 'Shows up first. | *Every single time.*', { mood: 'sparkle', hops: [0.5, 1.1] }, [
    ['label', 790, 760, 'EARLY: 40 MIN', 0.3, { size: 44, bg: RED, rot: -0.05, mono: true }],
    ['bubble', 790, 940, 'i’m here! | where r u', 1.0, { size: 44, tail: 'br' }],
  ]),
  cam('taurus', 'Feeds you. | *Love, in snacks.*', { mood: lt => lt > 1.3 ? 'heart' : 'happy' }, [
    ['bits', 'plate', 790, 1020, 22, 0.2, {}],
    ['bits', 'muffin', 730, 950, 12, 0.4, {}],
    ['bits', 'cake', 850, 950, 12, 0.6, {}],
    ['label', 790, 700, 'TAKE SOME HOME', 1.2, { size: 40, bg: GOLD, rot: 0.04 }],
  ]),
  cam('gemini', 'Sends memes daily. | *That’s the love.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle' }, [
    ['phone', 770, 900, 0.2, { head: lt => `${Math.min(47, 3 + Math.floor(lt * 20))} NEW`, headCol: GOLD, lines: [['lol', SKYB, 1], ['THIS IS U', PINK, 1], ['lmaooo', SKYB, 1]] }],
  ]),
  cam('cancer', 'Remembers every birthday. | *Even your cat’s.*', { mood: 'heart' }, [
    ['bits', 'cake', 790, 960, 22, 0.2, {}],
    ['bits', 'cat', 650, 1080, 14, 0.8, {}],
    ['label', 790, 690, 'HBD, MITTENS', 1.1, { size: 44, bg: PINK, rot: -0.05 }],
  ]),
  cam('leo', 'Hypes you up. | *Loudest in the room.*', { mood: 'sparkle', hops: [0.6, 1.2, 1.8] }, [
    ['bubble', 770, 680, 'THAT’S MY | FRIEND!!', 0.3, { size: 58, col: ORANGE, tail: 'bl' }],
    ['sparkles', 790, 680, 0.9, { n: 8, R: 200 }],
    ['label', 790, 960, 'VOLUME: MAX', 1.2, { size: 42, bg: GOLD, rot: 0.05, mono: true }],
  ]),
  cam('virgo', 'Fixes your problems. | *Quietly. Perfectly.*', { mood: lt => lt > 1.4 ? 'happy' : 'squint' }, [
    ['doc', 790, 880, 0.2, { title: 'YOUR TO-DO', rows: 5, ticks: 5, rot: 0.04 }],
    ['label', 790, 630, 'ALL HANDLED ✓', 1.3, { size: 42, bg: MINT, rot: -0.05 }],
  ]),
  cam('libra', 'Plans the hangout. | *Everyone’s invited.*', { mood: 'happy' }, [
    ['bits', 'calendar', 790, 900, 22, 0.2, {}],
    ['label', 790, 660, lt => `GUESTS: ${Math.min(12, 1 + Math.floor(lt * 7))}`, 0.4, { size: 44, bg: PINK, rot: -0.05, mono: true }],
  ]),
  cam('scorpio', 'Keeps your secrets. | *Like a vault.*', { mood: lt => lt > 1.2 ? 'wink' : 'neutral' }, [
    ['bits', 'vault', 790, 920, 26, 0.2, {}],
    ['label', 790, 660, 'SAFE WITH ME', 1.0, { size: 44, bg: '#c97bff', rot: 0.05 }],
  ]),
  cam('sagittarius', 'Drags you on adventures. | *You’ll thank them.*', { mood: 'sparkle', hops: [0.5, 1.0, 1.5], star: { x: 150 }, look: [-1, 0] }, [
    ['bits', 'backpack', 320, 960, 22, 0.2, {}],
    ['bubble', 320, 660, 'get in, | we’re going!', 0.8, { size: 44, col: GOLD, tail: 'br' }],
  ]),
  cam('capricorn', 'Shows love | by *helping you plan.*', { mood: lt => lt < 1.2 ? 'neutral' : 'happy' }, [
    ['doc', 790, 880, 0.2, { title: 'YOUR GOALS', rows: 4, chart: true, rot: -0.04 }],
    ['label', 790, 630, 'WE GOT THIS', 1.2, { size: 44, bg: GREEN, rot: 0.05 }],
  ]),
  cam('aquarius', 'Gone a month? | *Picks right back up.*', { mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, -1] }, [
    ['label', 790, 700, 'LAST SEEN: OCTOBER', 0.3, { size: 36, bg: GREY, rot: -0.04, mono: true }],
    ['bubble', 790, 920, 'so anyway—', 1.0, { size: 60, col: SKYB, tail: 'bl' }],
  ]),
  cam('pisces', 'Feels it with you. | *Cries for you too.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'squint' : 'wide' }, [
    ['bubble', 770, 680, 'i’m crying | FOR you', 0.4, { size: 46, col: SKYB, tail: 'bl' }],
    ['hearts', 790, 960, 1.0, { n: 5 }],
  ]),
]

const F = makeFilm({
  id: 'r2a0394', key: 'E', accent: '#7dffb0', ending: 'callback',
  title: 'How signs keep | *friends close.*',
  cameos: CAMEOS,
  group: { cap: 'Different ways. | *Same love.*' },
  last: {
    text: 'Aquarius is back. | *Missed you too.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bubble(x, 540, 980, 'so anyway—', 1.3 * pop01(t, t0 + 0.4, 0.3, 2.2), { size: 70, col: SKYB, tail: 'bc' })
      hearts(x, t, 540, 1380, t0 + 1.0, { n: 7, life: 2, spread: 820, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
