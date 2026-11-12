// r2t0684: star_talk, SOLO (sagittarius), "Sagittarians at a party | *be like.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine party moments, each the most extreme Sagittarius version.
// Ending: callback (the road trip with strangers: they're best friends now).
//   arrived late, from another country · thirty new friends before the snacks · the mountain story, ninth time
//   · started a dance-off, lost, thrilled · said something honest, room went quiet · road trip with strangers, leaving now
//   · stepped out for air, found another party · invented a new game · host says goodbye: "after-party?"
//   group "Life of the party. | *Every party.*"   last "The strangers? | *Best friends now.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, signChar, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, confetti, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Arrived late. | *From another country.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 800, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.06 })
      L(x, 800, 1120, '✈ JUST LANDED', pop01(t, P.t0 + 0.7, 0.3, 2.2), SKYB, -0.04, 38)
      L(x, 800, 650, 'PARTY STARTED: 8PM', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Thirty new friends | *before the snacks.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['aries', 'taurus', 'leo', 'virgo', 'libra', 'aquarius']
      ids.forEach((id, i) => friend(x, t, id, 650 + (i % 3) * 140, 840 + Math.floor(i / 3) * 150, 110, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { mood: 'happy', seed: 50 + i }))
      const n = Math.min(30, Math.floor(Math.max(0, lt - 0.2) * 16))
      L(x, 800, 650, `FRIENDS: ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), MINT, 0.04, 40)
      L(x, 800, 1140, 'SNACKS: NOT OUT YET', pop01(t, P.t0 + 1.7, 0.3, 2.2), BONE, -0.04, 28)
    } },
  { sign: S, cap: 'Told the mountain story. | *Ninth time tonight.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOUNT', 800, 930, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 690, 'so there i was…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 1120, 'TELLING #9', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Started a dance-off. | Lost. *Thrilled.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'leo', 810, 960, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'sparkle', look: [-1, 0], hops: [P.t0 + 0.6, P.t0 + 1.1, P.t0 + 1.6] })
      notes(x, t, 600, 800, { n: 4, cell: 7, col: ACC, seed: 1 })
      L(x, 810, 690, 'WINNER: LEO', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 34)
      L(x, 380, 1130, 'BEST NIGHT EVER', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Said something honest. | Room went *silent.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'your band is | kinda mid', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (lt > 1.1) { x.save(); x.fillStyle = BONE; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.globalAlpha = clamp((lt - 1.1) * 3); x.fillText('. . .', 800, 980); x.restore() }
      L(x, 800, 1110, 'VOLUME: 0', pop01(t, P.t0 + 1.4, 0.3, 2.2), STEEL, -0.04, 34)
    } },
  { sign: S, cap: 'Met strangers. | Road trip. *Leaving now.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const dx = lerp(0, 60, ease.inCubic(prog(lt, 1.4, 2.4)))
      bits(x, 'CAR', 800 + dx, 950, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      friend(x, t, 'taurus', 740 + dx, 830, 80, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'wide', seed: 60 })
      friend(x, t, 'virgo', 860 + dx, 830, 80, pop01(t, P.t0 + 0.75, 0.3, 2), { mood: 'wide', seed: 61 })
      L(x, 800, 660, 'DESTINATION: ???', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Stepped out for air. | Found *another party.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOOR', 800, 880, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 1.0) { confetti(x, t, 800, 820, P.t0 + 1.0 * 1.29, { n: 18, spread: 220 }); notes(x, t, 800, 760, { n: 3, cell: 6, col: GOLD, seed: 3 }) }
      L(x, 800, 1120, 'PARTY #2: FOUND', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Played every game. | *Invented one more.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 340, head: 'NEW GAME', headBg: ACC, headInk: INK, lines: ['rule 1: run', 'rule 2: yell', 'rule 3: ???', 'rule 4: fun'], size: 34, align: 'left', progress: prog(lt, 0.4, 1.6) })
    } },
  { sign: S, cap: 'Host: “goodnight!” | Sag: *“after-party?”*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'capricorn', 820, 980, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: lt > 1.3 ? 'wide' : 'sleepy', look: [-1, 0] })
      bubble(x, 820, 760, 'goodnight!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 400, 640, 'AFTER-PARTY?!', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.05, 36)
      bits(x, 'CLOCK', 940, 620, 8 * pop01(t, P.t0 + 0.6, 0.3, 2))
    } },
]

const F = makeFilm({
  id: 'r2t0684', key: 'D', accent: ACC, solo: S, ending: 'callback',
  title: 'Sagittarians | at a party *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Life of the party. | *Every party.*', mood: 'sparkle' },
  last: {
    text: 'The strangers? | *Best friends now.*',
    draw(x, t, lt) {
      const t0 = t - lt
      bits(x, 'CAR', 540, 1330, 36 * pop01(t, t0 + 0.3, 0.4, 2))
      friend(x, t, 'taurus', 420, 1140, 170, pop01(t, t0 + 0.7, 0.3, 2), { mood: 'heart', seed: 60, hops: [t0 + 1.4] })
      friend(x, t, 'sagittarius', 540, 1110, 190, pop01(t, t0 + 0.6, 0.3, 2), { mood: 'sparkle', seed: 62, hops: [t0 + 1.3] })
      friend(x, t, 'virgo', 660, 1140, 170, pop01(t, t0 + 0.8, 0.3, 2), { mood: 'heart', seed: 61, hops: [t0 + 1.5] })
      L(x, 540, 1560, 'TRIP #4 BOOKED', pop01(t, t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 36)
      hearts(x, t, 540, 1050, t0 + 1.4, { n: 6, life: 2, spread: 360, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
