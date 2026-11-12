// r2a0386: star_advice, ADVICE SOLO (capricorn), "Capricorn, have you | eaten today?" (signs3kit social cut, music: lofi · D). Ending: group.
//   nine cards, each a relatable Capricorn truth + a warm reframe: coffee isn't lunch · dinner vs the inbox · rest is fuel
//   · you carry everyone · celebrate the goal first · the unfinished list · be kind to you · 2 a.m. emails · plan a snack
//   group ending: "Goals can wait. | Go eat something."
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, steam, zzz, swapLabel, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const S = 'capricorn', ACC = '#7dffb0', ST = { x: -170 }

const CAMEOS = [
  { sign: S, cap: 'Coffee is not lunch. | *Real food* counts too.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bits(x, 'MUG', 720, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 705, 820, { n: 2 })
      L(x, 720, 720, 'LUNCH?', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, -0.05, 34)
      bits(x, 'APPLE', 880, 920, 16 * pop01(t, P.t0 + 1.3, 0.35, 2.4))
      sparkles(x, t, 880, 920, P.t0 + 1.4, 6, 100, 0.3)
      L(x, 800, 1110, 'NOW IT’S LUNCH', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Working through dinner? | The inbox *can wait.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 800, `INBOX: ${200 + Math.floor(clamp(lt / 1.2) * 14)}`, pop01(t, P.t0 + 0.4, 0.3, 2), RED, -0.03, 30)
      if (lt > 1.2) { bits(x, 'PLATE', 790, 1040, 16 * pop01(t, P.t0 + 1.2, 0.35, 2.2)); steam(x, t, 790, 990) }
      bubble(x, 420, 590, 'dinner first.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Rest isn’t lazy. | It’s *fuel.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: ST, hops: [],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BATT', 790, 840, 22 * k)
      if (k > 0.5) {
        const f = clamp((lt - 0.9) / 1.2), w = Math.round(10 * Math.max(0.1, f))
        x.fillStyle = f < 0.4 ? RED : f < 0.8 ? GOLD : MINT
        x.fillRect(790 - 6.5 * 22 + 22, 840 - 2.5 * 22 + 22, w * 22, 3 * 22)
      }
      L(x, 790, 1040, lt > 2.0 ? 'CHARGED' : 'CHARGING…', pop01(t, P.t0 + 0.7, 0.3, 2), lt > 2.0 ? MINT : GOLD, -0.04, 34)
      if (lt > 1.2) zzz(x, t, 440, 700)
    } },
  { sign: S, cap: 'You carry everyone. | *Let someone* carry you.', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const n = lt > 1.3 ? 1 : 3
      for (let i = 0; i < n; i++) bits(x, 'BOX', F.x + 10, F.top - 40 - i * 64, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      if (lt > 1.2) {
        const kf = pop01(t, P.t0 + 1.2, 0.35, 2)
        const Ff = friend(x, t, 'taurus', 790, 960, 200, kf, { mood: 'happy', look: [-1, 0], seed: 14 })
        if (Ff) { bits(x, 'BOX', 790, Ff.top - 40, 12); bits(x, 'BOX', 790, Ff.top - 104, 12) }
      }
      L(x, 790, 1150, 'I GOT THESE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Hit a big goal? | *Celebrate* before the next.', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 800, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (pop01(t, P.t0 + 0.4, 0.3, 2) > 0.5) swapLabel(x, 790, 1020, lt, 1.0, 'NEXT GOAL?', 'PARTY FIRST', { size: 36, toBg: GOLD })
      sparkles(x, t, 790, 800, P.t0 + 1.4, 8, 170, 0.2)
    } },
  { sign: S, cap: 'Didn’t finish the list? | You’re *still enough.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 380, head: 'TO DO', headBg: STEEL, headInk: INK, lines: ['[x] work', '[x] gym', '[ ] taxes', '[ ] everything'], size: 30, align: 'left' })
      L(x, 790, 1080, 'STILL ENOUGH', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
      hearts(x, t, 640, 1000, P.t0 + 1.5, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Tough on yourself? | Talk like *your best friend.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 790, 800, pop01(t, P.t0 + 0.25, 0.35, 2), { w: 290, h: 290, rot: 0.05, bg: '#ffe76a', lines: ['be nice', 'to me.', ['– me', '#6b62a8']], size: 40 })
      bubble(x, 790, 1060, 'you did great.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Emails at 2 a.m.? | *Sleep* is productive too.', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 860, 640, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const fade = 1 - clamp((lt - 1.1) / 0.5)
      if (fade > 0.01) { x.save(); x.globalAlpha = fade; bits(x, 'LAPTOP', 790, 880, 18 * pop01(t, P.t0 + 0.3, 0.3, 2)); L(x, 790, 860, 'RE: RE: RE:', 1, STEEL, -0.03, 26); x.restore() }
      if (lt > 1.2) { bits(x, 'PILLOW', 790, 920, 18 * pop01(t, P.t0 + 1.2, 0.35, 2)); zzz(x, t, 450, 700) }
      L(x, 790, 1110, 'OUT OF OFFICE', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'You plan for everyone. | *Plan a snack* for you.', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 810, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 340, h: 360, head: 'CALENDAR', headBg: ACC, headInk: INK, lines: ['09:00 meeting', '11:00 meeting', ['15:00 SNACK', RED], '16:00 meeting'], size: 28, align: 'left', progress: (lt - 0.4) / 0.8 })
      bits(x, 'COOKIE', 920, 1040, 14 * pop01(t, P.t0 + 1.4, 0.35, 2.4))
      L(x, 740, 1080, 'NON-NEGOTIABLE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2a0386', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, have you | *eaten today?*',
  cameos: CAMEOS,
  group: {
    cap: 'Goals can wait. | *Go eat something.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
