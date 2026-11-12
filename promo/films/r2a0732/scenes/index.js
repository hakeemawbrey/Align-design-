// r2a0732: star_advice, ADVICE SOLO (capricorn), "How to apologise | *to a Capricorn.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle, relatable tips for saying sorry to a Capricorn, each with a warm reframe and one
// light gag. Ending: lesson.
//   be specific (they kept notes) · bullet points, not a speech · show up on time · bring a plan (a little gantt)
//   · fix the thing (the shelf) · one sorry is plenty · a coffee helps · give them time (forgiveness: scheduled)
//   · say it face to face (Aries says it)
//   group "Firm outside. | *Soft inside.*"  lesson "Mean it. Mend it. | They *remember both.*"
//   last "Forgiven. | *Tuesday, 3 p.m.*" (the scheduled forgiveness, paid off)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, steam, friend, plan, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#5fd6a8', S = 'capricorn', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Be specific. | They *kept notes.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'NOTEPAD', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 690, 'NOTES: PAGE 1 OF 4', pop01(t, P.t0 + 0.7, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 800, 1110, 'DATED. TIMED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Skip the speech. | *Bullet points.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'MY APOLOGY', headBg: '#2fc79a', lines: ['• I was wrong', '• here’s why', '• here’s the fix'], size: 30, progress: clamp((lt - 0.3) / 1.1) })
      L(x, 800, 1110, 'READ TIME: 9 SEC', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Show up | *on time.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CLOCK', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'YOU: 1 MIN EARLY', pop01(t, P.t0 + 0.7, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1120, 'RESPECT: UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Bring a plan. | *They love a plan.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plan(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt, [['SORRY', 0, 0.4, '#ff6b5a'], ['FIX IT', 0.3, 0.8, GOLD], ['DO BETTER', 0.6, 1.0, '#2fc79a']])
      L(x, 785, 1110, 'THIS IS ROMANTIC', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Fix the thing. | *Actions count.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fixed = lt > 1.2
      bits(x, 'SHELF', 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: fixed ? 0 : 0.22 })
      bits(x, 'WRENCH', 800, 820, 14 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: fixed ? 0 : Math.sin(t * 10) * 0.4 })
      swapLabel(x, 800, 1130, lt, 1.2, 'SHELF: WONKY', 'SHELF: FIXED', { size: 32, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'One sorry | is *plenty.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'sorry sorry sorry | sorry sorry—', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (lt < 1.2 ? 1 : 0), { size: 32, tail: 'bl' })
      if (lt >= 1.2) bubble(x, 800, 740, 'sorry.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 800, 960, lt < 1.2 ? 'TOO MUCH' : 'PERFECT', 1, lt < 1.2 ? STEEL : MINT, 0.04, 36)
    } },
  { sign: S, cap: 'A coffee helps. | *Black, no fuss.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'MUG', 800, 980, 18 * k)
      steam(x, t, 790, 900, { n: 3, alpha: 0.7 * k, h: 120 })
      L(x, 800, 720, 'PEACE OFFERING', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Give them time. | They’ll *come round.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 280, head: 'CALENDAR', headBg: '#6b62a8', lines: ['mon: think', 'tue 3pm:', ['forgive you', '#2fc79a']], size: 30, progress: clamp((lt - 0.3) / 1.2) })
      L(x, 780, 1100, 'FORGIVENESS: BOOKED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Say it face to face. | *They respect that.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'aries', 820, 960, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: lt > 1.5 ? 'happy' : 'neutral', look: [-1, 0] })
      bubble(x, 820, 730, 'I’m sorry. | I mean it.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      hearts(x, t, 680, 920, P.t0 + 1.8, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'r2a0732', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to apologise | *to a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Firm outside. | *Soft inside.*', mood: 'heart' },
  lesson: { text: 'Mean it. Mend it. | They *remember both.*', chip: 'TRUST: RESTORED' },
  last: {
    text: 'Forgiven. | *Tuesday, 3 p.m.*',
    draw(x, t, lt) { sparkles(x, t, 540, 860, t - lt + 0.8, 9, 240, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
