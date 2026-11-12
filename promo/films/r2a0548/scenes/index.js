// r2a0548: star_advice, ADVICE SOLO (aries), "Aries, you can | *ask for help.*" (signs3kit social cut, music: lofi · C).
// One sign the whole way: nine gentle nudges for the Aries who does everything alone, each a relatable truth + a warm
// reframe and one light gag. Ending: lesson.
//   every bag in one trip · no instructions · asking is a team win · lost for an hour · the jar lid · your friends want
//   to help · even the chart says teamwork · rest is refuelling · saying "help" is brave
//   group "Fearless. | *And not alone.*"  lesson "Strong people | *ask for help.*"  TEAM: ASSEMBLED
//   last "Two trips. | *Still a legend.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, chart, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }
const JAR = ['.KKKKK.', 'KRRRRRK', '.KKKKK.', 'GGGGGGG', 'GOOOOOG', 'GOOOOOG', 'GOOOOOG', 'GGGGGGG']
const JAR_C = { K: INK, R: RED, G: '#9fd8ff', O: '#ffb34a' }
const SBAG = ['..HHHH..', '.H....H.', 'GGGGGGGG', 'GGGGGGGG', 'GGWGGGGG', 'GGGGGGGG', 'GGGGGGGG']
const BAGC = ['#ff8fb1', '#7dffb0', '#ffe27a', '#8fe3ff', '#c9a6ff', '#ffb34a']
const bag = (x, i, cx, cy, cell, o) => drawBits(x, SBAG, { H: BONE, G: BAGC[i % 6], W: '#ffffff' }, cx, cy, cell, o)

const CAMEOS = [
  { sign: S, cap: 'Every bag in one trip? | *Two trips is fine.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(lt / 0.22))
      for (let i = 0; i < n; i++) bag(x, i, 780 + Math.sin(t * 6 + i) * 6 * i * clamp(lt - 0.8), 1040 - i * 72, 10 * pop01(t, P.t0 + i * 0.22, 0.2, 2), { rot: Math.sin(t * 5 + i) * 0.04 * i })
      L(x, 800, 600, 'BAGS: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Skipped the instructions? | *Page one helps.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 700, 960, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.4 })
      sheet(x, 840, 820, pop01(t, P.t0 + 0.5, 0.35, 2), { w: 280, h: 260, head: 'STEP 1', headBg: STEEL, headInk: INK, lines: ['read me', 'first :)'], size: 34 })
      L(x, 800, 1100, 'SPARE SCREWS: 9', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Asking isn’t losing. | *It’s a team win.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 800, 860, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 190, 0.3)
      L(x, 800, 1080, 'WINNERS: 2', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 36)
    } },
  { sign: S, cap: 'Lost for an hour? | *Directions are free.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MAP', 800, 860, 28 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: lt < 1.0 ? Math.PI : 0 })
      bubble(x, 800, 640, 'it’s upside | down, hon.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      L(x, 800, 1080, 'MAP: FLIPPED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Jar won’t open? | *Hand it over.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt < 1.0 ? Math.sin(t * 40) * 0.06 : 0
      drawBits(x, JAR, JAR_C, 640, 920, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: shake })
      friend(x, t, 'taurus', 850, 930, 190, pop01(t, P.t0 + 0.7, 0.35, 2), { mood: 'happy', look: [-1, 0], seed: 34 })
      L(x, 800, 1110, 'OPENED. FIRST TRY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Your friends want to help. | *Let them.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      ;['leo', 'gemini', 'libra'].forEach((id, i) => friend(x, t, id, 680 + i * 130, 920 - (i % 2) * 40, 140, pop01(t, P.t0 + 0.2 + i * 0.2, 0.35, 2), { mood: 'sparkle', seed: 31 + i }))
      hearts(x, t, 800, 820, P.t0 + 1.0, { n: 5, life: 1.6, spread: 260, cell: 6, seed: 3 })
      L(x, 800, 1090, 'HELP SQUAD', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, 0.04, 36)
    } },
  { sign: S, cap: 'Even your chart says: | *teamwork.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 800, 830, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1070, '♈︎ TODAY: TEAMWORK', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Resting isn’t quitting. | *It’s refuelling.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), p = 0.15 + 0.85 * ease.inOutCubic(prog(lt, 0.4, 1.6))
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -70, 340, 140); x.fillRect(170, -30, 26, 60)
        x.fillStyle = '#2a2350'; x.fillRect(-160, -60, 320, 120)
        x.fillStyle = p > 0.8 ? MINT : GOLD; x.fillRect(-160, -60, 320 * p, 120)
        x.restore()
      }
      L(x, 800, 1060, p > 0.95 ? 'FULLY CHARGED' : 'CHARGING…', pop01(t, P.t0 + 0.6, 0.3, 2.2), p > 0.95 ? MINT : STEEL, 0.04, 32)
    } },
  { sign: S, cap: 'Saying “help” | *is brave too.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'help?', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 70, col: BONE, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.0, { n: 7, life: 1.8, spread: 260, cell: 7, seed: 5 })
      L(x, 800, 1080, 'BRAVEST MOVE YET', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0548', key: 'C', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aries, you can | *ask for help.*',
  cameos: CAMEOS,
  group: { cap: 'Fearless. | *And not alone.*', mood: 'sparkle' },
  lesson: { text: 'Strong people | *ask for help.*', chip: 'TEAM: ASSEMBLED' },
  last: {
    text: 'Two trips. | *Still a legend.*',
    draw(x, t, lt) {
      bag(x, 0, 290, 1000, 18 * pop01(t, t - lt + 0.6, 0.3, 2), { rot: -0.08 })
      bag(x, 1, 790, 1000, 18 * pop01(t, t - lt + 0.9, 0.3, 2), { rot: 0.08 })
      sparkles(x, t, 540, 1000, t - lt + 1.2, 8, 220, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
