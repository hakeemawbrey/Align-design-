// r2a0601: star_advice, ADVICE SOLO (scorpio), "Scorpio, you can | *ask for help.*" (signs3kit social cut, music: lofi · D).
// Nine cards, a relatable Scorpio truth + a warm reframe: carrying it all alone (an overweight backpack) · asking is trust
// · fixing it at 3 a.m. · the help squad is ready · moving solo? let them bring pizza · feelings count as a reason to
// call · you keep everyone's secrets, let someone keep yours · a tiny white flag still counts · help received, lighter.
// Ending: group. "Strongest move? | *Asking.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, B, C, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b8a', ST = { x: -180 }, SG = 'scorpio'
const FLAG = ['KWWWWW', 'KWWWWW', 'KWWWWW', 'KWWWWW', 'K.....', 'K.....', 'K.....', 'K.....', 'K.....', 'K.....']
const FLAG_C = { K: '#8a4a2e', W: '#ffffff' }

const CAMEOS = [
  { sign: SG, cap: 'Carrying it all alone? | You *don’t have to.*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: ST, hops: [1.6],
    back(x, t, lt, P, F) { bits(x, 'BACKPACK', F.x - 60, F.cy - 20, 30 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.12 }) },
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 320, h: 260, head: 'INSIDE THE BAG', headBg: ACC, headInk: INK, align: 'left', lines: ['work stuff', 'family stuff', 'everyone’s stuff'], size: 30, progress: clamp((lt - 0.7) / 0.8) })
      L(x, 800, 1070, 'BAGGAGE: OVERWEIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Asking isn’t weakness. | It’s *trust.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      const s = 'can you… help?'.slice(0, Math.max(0, Math.floor((lt - 0.3) / 0.08)))
      bubble(x, 790, 700, s || '…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      L(x, 800, 980, 'COURAGE: 100%', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 40)
      sparkles(x, t, 800, 900, P.t0 + 1.5, 7, 170, 0.2)
    } },
  { sign: SG, cap: 'Fixing it alone at 3 a.m.? | *Sleep.* Ask tomorrow.', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 740, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'WRENCH', 800, 950, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.3 + Math.sin(t * 9) * 0.15 * (lt < 1.4 ? 1 : 0) })
      L(x, 800, 1100, lt > 1.4 ? 'BEDTIME ♡' : '3:07 AM', 1, lt > 1.4 ? LAV : RED, -0.04, 36)
    } },
  { sign: SG, cap: 'Your people | *want* to show up.', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 720, 900, 170, pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 33, hops: [P.t0 + 0.9] })
      friend(x, t, 'taurus', 880, 900, 170, pop01(t, P.t0 + 0.55, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 34, hops: [P.t0 + 1.2] })
      L(x, 800, 1110, 'HELP SQUAD: READY', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, -0.04, 32)
      hearts(x, t, 800, 820, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: SG, cap: 'Moving house solo? | Let them *bring pizza.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'BOX', 780, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BOX', 800, 860, 18 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.05 })
      bits(x, 'PIZZA', 820, 680, 16 * pop01(t, P.t0 + 1.0, 0.35, 2.2), { rot: 0.2 })
      L(x, 800, 1120, 'PAYMENT: PIZZA', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: SG, cap: 'Feelings count | as a *reason* to call.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const ring = lt < 1.2 ? Math.sin(t * 40) * 0.06 : 0
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: lt < 1.2 ? 'CALLING: BESTIE' : 'CONNECTED ♡', headCol: lt < 1.2 ? SKYB : MINT, rot: 0.05 + ring, size: 26, lines: [['hey… u free?', BONE, pop01(t, P.t0 + 0.5, 0.2, 2), false], ['always ♡', PINK, pop01(t, P.t0 + 1.3, 0.2, 2), true]] })
      L(x, 800, 1110, 'PICKED UP: 1 RING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'You keep everyone’s secrets. | Let someone *keep yours.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 810, 920, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: 'sparkle', look: [-1, 0], seed: 35 })
      bubble(x, 800, 680, 'tell me. it stays here.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, col: BONE, tail: 'bc' })
      L(x, 800, 1110, 'VAULT: SHARED ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: SG, cap: 'A tiny white flag | still *counts.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      drawBits(x, FLAG, FLAG_C, F.x + 150, F.cy - 90, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 + Math.sin(t * 6) * 0.08 })
      bubble(x, 820, 700, '(help?)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
      L(x, 810, 1040, 'SURRENDER ACCEPTED ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: SG, cap: 'Help received. | *Lighter* already.', mood: 'heart', look: [1, 0], star: ST, hops: [0.9, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const off = ease.inOutCubic(prog(lt, 0.3, 1.1))
      friend(x, t, 'taurus', 860, 950, 180, pop01(t, P.t0 + 0.1, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 38 })
      bits(x, 'BACKPACK', lerp(420, 860, off), lerp(860, 800, off) - Math.sin(Math.PI * off) * 120, 16, { rot: lerp(-0.12, 0.1, off) })
      L(x, 800, 1120, 'BAGGAGE: SHARED', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 420, 820, P.t0 + 1.2, 7, 160, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0601', key: 'D', accent: ACC, solo: SG, ending: 'group',
  title: 'Scorpio, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Strongest move? | *Asking.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 700, t - lt + 0.8, { n: 10, life: 2.6, spread: 600, cell: 8, seed: 6 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
