// r2a0670: star_advice, ADVICE SOLO (sagittarius), "Sagittarius, your joy | *is contagious.*" (signs3kit social cut, music: lofi · G).
// One sign (solo, 9 cards): warm reminders of what a Sagittarius' joy does for everyone, one gag each. Ending: lesson.
//   your laugh fixes bad days (a friend perks up) · Mondays feel like Fridays · your "yes" gives people courage · fun in
//   a waiting room · your stories turn strangers into friends · a quiet day is okay too · optimism is brave (umbrella
//   up, sun out) · even your plant seems happier · your profile made a match smile
//   group "Pure sunshine. | *Zero filter.*"   LESSON "Keep shining. | It *lights us all up.*"
//   last "Contagious? | *Gladly.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, friend, zzz, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#c97bff', S = 'sagittarius', ST = { x: -190 }
const POTB = ['.OOOOO.', '.OOOOO.', '..OOO..']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']
/** a plant that grows leaves as g goes 0 → 1 */
function plant(x, t, cx, cy, k, g) {
  if (k <= 0.01) return
  const h = Math.round(2 + g * 7)
  const rows = []
  for (let j = 0; j < h; j++) rows.push(j % 2 ? 'GG.S.GG' : '...S...')
  rows.unshift(g > 0.8 ? '..PPP..' : '...G...')
  drawBits(x, [...rows, ...POTB], { G: '#5fd068', S: '#3fa35a', P: PINK, O: '#ff9a4a' }, cx, cy - h * 9, 18 * k)
}

const CAMEOS = [
  { sign: S, cap: 'Your laugh fixes | *bad days.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.7, 1.1, 1.5],
    front(x, t, lt, P) {
      const happy = lt > 1.2, k = pop01(t, P.t0 + 0.2, 0.3, 2)
      friend(x, t, 'cancer', 800, 940, 200, k, { mood: happy ? 'sparkle' : 'neutral', look: happy ? [-1, 0] : [0, 1], hops: [P.t0 + 1.6] })
      bubble(x, 780, 680, 'HA HA HA', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 1110, happy ? 'MOOD: LIFTED' : 'MOOD: MEH', k, happy ? MINT : STEEL, -0.04, 34)
    } },
  { sign: S, cap: 'You make Mondays | *feel like Fridays.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fr = lt > 1.1
      sheet(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 280, rot: 0.04, head: fr ? 'FRIDAY?!' : 'MONDAY', headBg: fr ? GOLD : STEEL, headInk: INK, lines: fr ? ['party mode', 'activated'] : ['ugh.', 'meetings.'], size: 38 })
      if (fr) sparkles(x, t, 790, 830, P.t0 + 1.1 * 3.1 / 2.4, 8, 200, 0.5)
    } },
  { sign: S, cap: 'Your “yes!” gives people | *courage.*', mood: 'wide', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      friend(x, t, 'virgo', 830, 960, 170, pop01(t, P.t0 + 0.2, 0.3, 2), { mood: lt > 1.4 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [P.t0 + 1.9] })
      bubble(x, 830, 760, 'should I | try it?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'br', col: LAV })
      bubble(x, 640, 640, 'YES!!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, tail: 'bl' })
    } },
  { sign: S, cap: 'You find the fun | *in a waiting room.*', mood: 'sparkle', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 770, 700, 'NOW SERVING: 4', pop01(t, P.t0 + 0.2, 0.3, 2.2), RED, 0.03, 32)
      bubble(x, 790, 880, 'I spy… | round 9!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 1080, 'WAIT: FUN NOW', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Your stories turn | *strangers into friends.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const ids = ['capricorn', 'scorpio', 'libra']
      ids.forEach((id, i) => friend(x, t, id, 700 + i * 110, 1000 - (i % 2) * 70, 130, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { mood: lt > 1.3 ? 'heart' : 'neutral', look: [-1, 0], seed: 40 + i }))
      bubble(x, 790, 680, 'so THEN…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      if (lt > 1.3) hearts(x, t, 810, 880, P.t0 + 1.3 * 3.1 / 2.4, { n: 5, life: 1.5, spread: 260, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A quiet day? | *Joy recharges too.*', mood: 'sleepy', look: [1, 0], star: { x: -190, y: 10 },
    back(x, t, lt, P, F) { bits(x, 'PILLOW', F.x, F.cy + 120, 16 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P, F) {
      bits(x, 'MOON', 800, 800, 24 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1050, 'JOY: RECHARGING', pop01(t, P.t0 + 1.0, 0.3, 2.2), LAV, 0.04, 36)
    } },
  { sign: S, cap: 'Your optimism isn’t naive. | It’s *brave.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'UMB', F.x + 40, F.top - 90, 16 * k)
      const sun = clamp((lt - 1.0) / 0.5)
      if (sun < 1) for (let i = 0; i < 8; i++) { const ph = ((t * 2 + i / 8) % 1); x.fillStyle = SKYB; x.globalAlpha = (1 - sun) * (1 - ph); x.fillRect(640 + i * 40, 560 + ph * 260, 8, 22) }
      x.globalAlpha = 1
      drawBits(x, SUN, { Y: GOLD }, 820, 760, 22 * sun * k)
      L(x, 790, 1080, 'FORECAST: SUNNY', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: S, cap: 'Even your plant | *seems happier.*', mood: 'heart', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      plant(x, t, 800, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.6)))
      L(x, 790, 1110, 'PLANT: THRIVING', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Your profile | *made someone smile.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: MINT, lines: [['your profile', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['made me grin', BONE, pop01(t, P.t0 + 0.8, 0.25, 2)], ['that’s the goal ♡', PINK, pop01(t, P.t0 + 1.5, 0.25, 2), true]], size: 20 })
    } },
]

const F = makeFilm({
  id: 'r2a0670', key: 'G', accent: ACC, solo: S, ending: 'lesson',
  title: 'Sagittarius, your joy | *is contagious.*',
  cameos: CAMEOS,
  group: { cap: 'Pure sunshine. | *Zero filter.*', mood: 'sparkle' },
  lesson: { text: 'Keep shining. | It *lights us all up.*', chip: 'JOY: SHARED' },
  last: { text: 'Contagious? | *Gladly.*',
    draw(x, t, lt) { plant(x, t, 760, 1240, pop01(t, t - lt + 0.8, 0.3, 2), 1); hearts(x, t, 760, 1050, t - lt + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
