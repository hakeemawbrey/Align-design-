// r2a0605: star_advice, ADVICE SOLO (aries), "How to thank | *an Aries.*" (signs3kit social cut, music: lofi · G).
// Nine cards, a relatable Aries truth + a warm way to say thanks: say it fast, they're already gone · give them a trophy,
// even a tiny one · notice the bravery, they were scared too · refuel the fire with snacks · tell them "you went first"
// · thank them for the push · a high five, make it loud · let them win the race to the door · keep it short, they hug
// back hard.
// Ending: callback. "That tiny trophy? | *Still on display.*" (the trophy from card two comes back).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff7a59', ST = { x: -180 }, SG = 'aries'
const HAND = ['..Y.Y.Y..', '..Y.Y.Y.Y', 'Y.Y.Y.Y.Y', 'YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYYY', '.YYYYYYY.', '..YYYYY..', '..YYYYY..']

const speed = (x, cx, cy, a) => { if (a <= 0.01) return; x.save(); x.globalAlpha = a; x.fillStyle = BONE; for (let i = 0; i < 5; i++) x.fillRect(cx - 160 - i * 18, cy - 60 + i * 30, 120, 8); x.restore() }

const CAMEOS = [
  { sign: SG, cap: 'Say thanks fast. | They’re *already gone.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'thank y—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      speed(x, 520, 900, lt > 1.0 ? clamp((lt - 1.0) * 3) * (1 - clamp((lt - 1.8) * 2)) : 0)
      L(x, 780, 1000, '…AND THEY’RE OFF', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: SG, cap: 'Give them a trophy. | Even a *tiny* one.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 9 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 780, 1020, 'WORLD’S OKAYEST ✦', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, 0.04, 32)
      sparkles(x, t, 800, 860, P.t0 + 1.2, 7, 140, 0.4)
      bubble(x, 800, 680, 'BEST DAY EVER', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
    } },
  { sign: SG, cap: 'Notice the bravery. | They were *scared too.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5], squash: lt => lt < 1.3 ? Math.sin(lt * 50) * 0.03 : 0,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'i got this (gulp)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 780, 960, 'SO BRAVE ♡ SEEN IT', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Feed them after the hustle. | *Refuel* the fire.', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 800, 840)
      L(x, 780, 1080, 'FIRE LEVEL: RESTORED', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: SG, cap: 'Tell them | *“you went first.”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2, 1.8],
    front(x, t, lt, P) {
      bubble(x, 780, 720, 'you went first ♡', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: BONE, tail: 'br' })
      L(x, 780, 950, 'FAV WORDS UNLOCKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 460, 820, P.t0 + 1.2, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: SG, cap: 'Thank them for the push. | You *needed* it.', mood: 'happy', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const go = ease.outCubic(prog(lt, 0.8, 1.4))
      friend(x, t, 'libra', lerp(700, 860, go), 930, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: go > 0.9 ? 'sparkle' : 'wide', look: [1, 0], seed: 42, hops: [P.t0 + 1.4] })
      L(x, 780, 700, go > 0.9 ? 'DID THE THING ✓' : 'TOO SCARED…', 1, go > 0.9 ? MINT : STEEL, -0.04, 34)
    } },
  { sign: SG, cap: 'A high five works. | *Make it loud.*', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const hit = ease.inCubic(prog(lt, 0.5, 1.0))
      drawBits(x, HAND, { Y: '#ffd9a8' }, lerp(920, 720, hit), 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      if (lt > 1.0) { sparkles(x, t, 700, 820, P.t0 + 1.0, 9, 160, 0.3); L(x, 780, 1020, 'SMACK!', pop01(t, P.t0 + 1.0, 0.3, 2.6), GOLD, 0.06, 48) }
    } },
  { sign: SG, cap: 'Let them win | the race *to the door.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 860, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 780, 1080, lt > 1.4 ? '1ST PLACE! (AGAIN)' : 'READY… SET…', 1, lt > 1.4 ? GOLD : BONE, -0.04, 32)
    } },
  { sign: SG, cap: 'Keep it short. | They *hug back hard.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', lerp(860, 690, ease.inOutCubic(prog(lt, 0.6, 1.1))), 900, 190, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'heart', look: [-1, 0], seed: 43 })
      L(x, 780, 1090, 'HUG: FULL FORCE', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0605', key: 'G', accent: ACC, solo: SG, ending: 'callback',
  title: 'How to thank | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Thanks received. | *Already* running.', mood: 'sparkle' },
  last: {
    text: 'That tiny trophy? | *Still on display.*',
    draw(x, t, lt) {
      bits(x, 'TROPHY', 640, 1120, 12 * pop01(lt, 0.4, 0.35, 2))
      L(x, 640, 1260, 'PLACE OF HONOUR', pop01(lt, 1.0, 0.3, 2.4), GOLD, -0.04, 30)
      signChar(x, t, SG, 400, 1130, 200 * pop01(lt, 0.2, 0.4, 1.8), { mood: 'heart', look: [1, 0], seed: 9, hops: [t - lt + 1.2] })
      sparkles(x, t, 640, 1120, t - lt + 0.8, 7, 150, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
