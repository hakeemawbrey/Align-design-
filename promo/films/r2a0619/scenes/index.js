// r2a0619: star_advice, ADVICE SOLO (aquarius), "Aquarius, weird | *is wonderful.*" (signs3kit social cut, lofi · E).
// One sign the whole way: nine gentle truths about an Aquarius being delightfully odd, each with a warm reframe.
// Ending: callback (the socks that never match come back: today's pair still doesn't).
//   cereal for dinner · talks to the plant (it's thriving) · whale-song playlist · invented a holiday · "but why?"
//   · socks never match · hobby number 47 · a random friend group (Pisces cries) · one of one
//   group "Unusual. | *Unforgettable.*"   last "Today's socks? | *Still don't match.*"
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, label, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, friend, swapLabel, confetti, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const PLANT = ['..G.G..', '.GGGGG.', 'GGLGGLG', '.GGGGG.', '..GGG..', '...G...', 'PPPPPPP', '.PPPPP.', '.PPPPP.', '..PPP..']
const PLANT_C = { G: '#4fbf6a', L: '#8fdc6a', P: '#c9683a' }
const SOCK = ['.AAA.', '.BBB.', '.AAA.', '.BBB.', '.AAA.', '.BBB.', 'AAAA.', 'BBBBB', 'AAAAA']
const sock = (x, cx, cy, cell, a, b, rot = 0) => drawBits(x, SOCK, { A: a, B: b }, cx, cy, cell, { rot })

const CAMEOS = [
  { sign: S, cap: 'Cereal for dinner? | *Rules are suggestions.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'MOON', 900, 680, 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1070, 'DINNER: CEREAL', pop01(t, P.t0 + 1.2 * 1.29, 0.3, 2.2), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'You talk to your plant? | *Look how it’s growing.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = 1 + 0.35 * ease.outCubic(prog(lt, 0.8, 1.8))
      drawBits(x, PLANT, PLANT_C, 820, 900 - 60 * (g - 1), 20 * g * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 660, 'good morning, | kevin', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 820, 1110, 'PLANT: THRIVING', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Your playlist confuses people? | *It’s a vibe.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 800, 920, { n: 5, cell: 9, col: SKYB, alpha: clamp((lt - 0.2) / 0.4) })
      L(x, 800, 700, 'NOW: WHALE SONGS', pop01(t, P.t0 + 0.4, 0.3, 2), LAV, 0.04, 34)
      L(x, 800, 1070, 'NEXT: KAZOO JAZZ', pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Invented your own holiday? | *Celebrate it big.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'MARCH 3', headBg: ACC, headInk: INK, lines: ['NATIONAL', 'SOCK-PUPPET', 'DAY'], size: 36 })
      confetti(x, t, 800, 800, P.t0 + 1.2 * 1.29, { n: 22, spread: 280 })
      L(x, 800, 1080, 'GUESTS: JUST ME', pop01(t, P.t0 + 1.5 * 1.29, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'Asked “but why?” again? | *Curious is good.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      ;[[790, 680, 0.2], [840, 840, 0.8], [770, 1000, 1.4]].forEach(([bx, by, a], i) => bubble(x, bx, by, i === 2 ? 'but WHY though?' : 'but why?', pop01(t, P.t0 + a, 0.25, 2.2), { size: 36 + i * 4, col: [BONE, SKYB, MINT][i], tail: 'bl' }))
    } },
  { sign: S, cap: 'Socks never match? | *Neither do galaxies.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sock(x, 730, 850, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), '#ff6b5a', GOLD, -0.12)
      sock(x, 880, 870, 22 * pop01(t, P.t0 + 0.5, 0.3, 2), '#4fbf6a', LAV, 0.12)
      sparkles(x, t, 800, 860, P.t0 + 1.3, 8, 190, 0.5, [LAV, MINT, BONE])
      L(x, 800, 1100, 'PAIR: ✓ (TRUST ME)', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'New hobby every month? | *Collect them all.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const hob = ['KITES', 'BEEKEEPING', 'YODELLING', 'MINI GOLF'], i = Math.min(3, Math.floor(clamp((lt - 0.3) / 1.5) * 4))
      L(x, 800, 820, `#${44 + i}: ${hob[i]}`, pop01(t, P.t0 + 0.2, 0.3, 2), [SKYB, GOLD, PINK, MINT][i], -0.04, 32)
      sparkles(x, t, 800, 820, P.t0 + 1.0, 7, 160, 0.2)
      bubble(x, 800, 1020, 'this one’s | the one!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Your friend group is “random”? | *You collect good people.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friend(x, t, 'taurus', 680, 1010, 160, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      friend(x, t, 'pisces', 870, 1010, 160, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'wide', look: [-1, 0], tears: 3 })
      friend(x, t, 'leo', 775, 770, 160, pop01(t, P.t0 + 0.9, 0.35, 2), { mood: 'sparkle', look: [-1, 0] })
      hearts(x, t, 800, 1120, P.t0 + 1.5, { n: 4, life: 1.2, spread: 300, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Different from the crowd? | *That’s why we notice.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      L(x, 800, 820, 'ONE OF ONE', pop01(t, P.t0 + 0.4, 0.35, 2.2), ACC, -0.05, 56)
      sparkles(x, t, 800, 820, P.t0 + 1.0, 10, 200, 0.4, [SKYB, LAV, BONE])
      L(x, 800, 1020, 'NO COPIES MADE', pop01(t, P.t0 + 1.4 * 1.29, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0619', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarius, weird | *is wonderful.*',
  cameos: CAMEOS,
  group: { cap: 'Unusual. | *Unforgettable.*', mood: 'sparkle' },
  last: {
    text: 'Today’s socks? | *Still don’t match.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) friend(x, t, 'aquarius', 360, 1120, 320, k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], hops: [t0 + 1.4] })
      sock(x, 680, 1100, 20 * pop01(t, t0 + 0.7, 0.3, 2), SKYB, PINK, -0.12)
      sock(x, 820, 1110, 20 * pop01(t, t0 + 0.9, 0.3, 2), GOLD, '#4fbf6a', 0.12)
      sparkles(x, t, 750, 1100, t0 + 1.3, 8, 170, 0.4, [LAV, MINT, BONE])
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
