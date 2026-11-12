// r2a0638: star_advice, ADVICE SOLO (scorpio), "How to cheer up | *a Scorpio.*" (signs3kit social cut, music: lofi · C).
// Nine gentle tips for the people who love a Scorpio, each a relatable truth with a warm reframe and one light gag; the
// Scorpio slowly comes round. Ending: group.
//   skip "what's wrong?", bring snacks · sit in comfy silence · remember the tiny details · let them vent, don't fix it
//   · a blanket fort, no questions · read their chart: moon in "nap" · show up again and again (visit 12) · a dark
//   playlist, they feel seen · don't rush the smile (SMILE LOADING… then it lands)
//   group "Snacks. Silence. | Scorpio: *smiling.*" (the big star, smiling at last)
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, chart, RED, CREAM, STEEL, NIGHT, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff5a7a', S = 'scorpio', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Skip “what’s wrong?” | *Bring snacks.*', mood: lt => lt > 1.4 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 650, 'what’s wro—', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 0.9 ? 1 : 0), { size: 42, col: STEEL, tail: 'bl' })
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 700 + i * 100, 930 - (i % 2) * 40, 16 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.3, 2))
      L(x, 800, 1110, 'COOKIES: ACCEPTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Sit with them. | *Comfy silence.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'COUCH', 560, 1040, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      friend(x, t, 'taurus', 780, 900, 190, pop01(t, P.t0 + 0.5, 0.3, 2), { mood: 'happy' })
      L(x, 810, 650, 'WORDS: 0 · LOVE: MAX', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 30)
    } },
  { sign: S, cap: 'Remember tiny details. | *They notice.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 380, h: 250, head: 'THEY ONCE SAID', headBg: '#ff5a7a', headInk: INK, lines: ['“I like the', 'black jellybeans”'], size: 32 })
      bits(x, 'GIFT', 800, 1050, 15 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      sparkles(x, t, 800, 1050, P.t0 + 1.3, 7, 150, 0.4)
    } },
  { sign: S, cap: 'Let them vent. | *Don’t fix it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const RANT = ['and ANOTHER thing', 'AND ANOTHER', 'also, Tuesday?!']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 800, 680, RANT[n], pop01(t, P.t0 + 0.3 + n * 0.45, 0.22, 2.2), { size: 42, col: '#ff8a9a', tail: 'bl' })
      bits(x, 'WRENCH', 800, 900, 14 * (lt < 1.5 ? 1 : 0) * pop01(t, P.t0 + 0.8, 0.3, 2), { alpha: 0.9 })
      if (lt >= 1.5) L(x, 800, 900, 'YOU: JUST NODDING', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'A blanket fort. | *No questions asked.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: { x: -190, y: 30 },
    front(x, t, lt, P) {
      bits(x, 'BLANKET', 360, 1040, 26 * pop01(t, P.t0 + 0.4, 0.35, 2))
      bits(x, 'LAMP', 800, 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'FORT: BUILT', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.05, 38)
    } },
  { sign: S, cap: 'Read their chart. | Moon in *“nap.”*', mood: lt => lt > 1.3 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.3, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 800, 820, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1060, 'MOON IN: NAP', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 38)
    } },
  { sign: S, cap: 'Show up again. | *And again.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 800, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 620, `VISIT #${Math.min(12, 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 11))}`, pop01(t, P.t0 + 0.3, 0.3, 2), MINT, -0.04, 38)
      bubble(x, 800, 1110, 'knock knock :)', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 38, tail: 'bc' })
    } },
  { sign: S, cap: 'Sent a moody playlist? | *They feel seen.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 840, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FOR YOU ♏', headCol: '#ff5a7a', size: 30,
        lines: [['track 1: rain', LAV, pop01(t, P.t0 + 0.5, 0.25, 2), false], ['track 2: more', LAV, pop01(t, P.t0 + 0.8, 0.25, 2), false], ['rain', LAV, pop01(t, P.t0 + 1.0, 0.25, 2), false]] })
      notes(x, t, 560, 760, { n: 4, col: '#ff5a7a', alpha: clamp((lt - 0.8) * 2) })
    } },
  { sign: S, cap: 'Don’t rush the smile. | *It’s coming.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: lt => lt > 1.6 ? [0, 0] : [1, 0], star: ST, hops: [1.7],
    keyCue: t0 => ['pluck', t0 + 2.1, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.3) / 1.3)
      L(x, 800, 720, p < 1 ? 'SMILE LOADING…' : 'SMILE: ON ✓', pop01(t, P.t0 + 0.2, 0.3, 2), p < 1 ? STEEL : MINT, -0.04, 38)
      x.save(); x.fillStyle = INK; x.fillRect(640, 820, 320, 40); x.fillStyle = '#ff5a7a'; x.fillRect(646, 826, 308 * p, 28); x.restore()
      if (p >= 1) { sparkles(x, t, 360, 860, P.t0 + 1.65, 8, 200, 0.2); hearts(x, t, 800, 1020, P.t0 + 1.7, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 }) }
    } },
]

const F = makeFilm({
  id: 'r2a0638', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'How to cheer up | *a Scorpio.*',
  cameos: CAMEOS,
  group: { cap: 'Snacks. Silence. | Scorpio: *smiling.*', mood: 'happy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
