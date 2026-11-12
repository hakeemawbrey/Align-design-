// r2a0683: star_advice, ADVICE SOLO (aries), "How to give an Aries | *space.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine kind ways to give an Aries room to cool off, each with a warm reframe and one light gag.
// Ending: lesson.
//   let them run a lap · don't chase, they circle back fast · give the energy a job · text once, not forty times
//   · snacks at the door · space isn't goodbye (recharging) · let them win one small thing · they'll say sorry first
//   · welcome them back warmly (Libra opens the door)
//   group "Hot head. | *Warm heart.*"   lesson "Space isn’t distance. | It’s *trust.*"   last "Give them room. | They *run back.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Stormed off? | *Let them run a lap.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.8) * 4)
      L(x, 800, 760, `LAP ${n}`, pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.05, 56)
      bits(x, 'SHOE', 800, 980, 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1120, 'MOOD: COOLING', pop01(t, P.t0 + 1.6, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: S, cap: 'Don’t chase. | *They circle back fast.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = lt * 3.2
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.35)'; x.lineWidth = 6; x.setLineDash([16, 14]); x.beginPath(); x.ellipse(790, 860, 130, 110, 0, 0, Math.PI * 2); x.stroke(); x.restore()
      bits(x, 'SHOE', 790 + Math.cos(a) * 130, 860 + Math.sin(a) * 110, 13 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1100, 'BACK IN: 5 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'All that fire? | *Give it a job.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const done = lt > 0.6 + i * 0.4; bits(x, 'BOX', 800, 1090 - i * 110 - (done ? 0 : 400), 14 * pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2), { alpha: done ? 1 : 0 }) }
      L(x, 800, 640, 'MOVING DAY?', pop01(t, P.t0 + 0.2, 0.3, 2), GOLD, 0.04, 40)
      bubble(x, 800, 790, 'DONE. MORE?', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: S, cap: 'Text once. | *Not forty times.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'PHONE1', 800, 960, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 800, 690, 'here when | you’re ready', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bc' })
      L(x, 800, 1130, 'SENT: 1. NICE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Leave snacks | *at the door.* Then go.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOOR', 820, 860, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'SNACK', 820, 1100, 13 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 820, 630, 'NO KNOCK NEEDED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Space isn’t goodbye. | *It’s a recharge.*', mood: lt => lt > 1.6 ? 'sparkle' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), f = clamp((lt - 0.3) / 1.5)
      if (k > 0.01) { bits(x, 'BATT', 800, 860, 22 * k); x.fillStyle = f > 0.7 ? MINT : ACC; x.fillRect(800 - 6.5 * 22 + 22, 860 - 2.5 * 22 + 22, Math.round(10 * f) * 22, 3 * 22) }
      bits(x, 'FIRE', 800, 680, 9 * pop01(t, P.t0 + 1.6, 0.3, 2.4))
      L(x, 800, 1080, f >= 1 ? 'FIRE: BACK ON' : 'CHARGING…', 1, f >= 1 ? GOLD : STEEL, -0.04, 34)
    } },
  { sign: S, cap: 'Let them win | *one small thing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 14 * pop01(t, P.t0 + 1.0, 0.35, 2.4))
      L(x, 800, 660, 'RACE TO THE CAR', pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.04, 34)
      L(x, 800, 1080, 'WINNER: ARIES', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 36)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 7, 140, 0.2)
    } },
  { sign: S, cap: 'Cooled off? | *They’ll say sorry first.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'ok. i was | a LOT. sorry.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1020, 'TIME TAKEN: 4 MIN', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
      hearts(x, t, 380, 760, P.t0 + 1.2, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Back already? | *Welcome them warmly.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'libra', 800, 940, 220, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0], hops: [P.t0 + 1.3] })
      bubble(x, 800, 690, 'missed you!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bl' })
      hearts(x, t, 620, 880, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
]

const F = makeFilm({
  id: 'r2a0683', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to give | an Aries *space.*',
  cameos: CAMEOS,
  group: { cap: 'Hot head. | *Warm heart.*', mood: 'heart' },
  lesson: { text: 'Space isn’t distance. | It’s *trust.*', chip: 'STATUS: COOLED' },
  last: {
    text: 'Give them room. | They *run back.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
