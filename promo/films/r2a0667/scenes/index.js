// r2a0667: star_advice, ADVICE SOLO (aries), "How to cheer up | *an Aries.*" (signs3kit social cut, music: lofi · F).
// One sign (solo, 9 cards): warm, practical ways to lift an Aries back up, one gag each. Ending: lesson.
//   challenge them to a race · let them vent (the storm is over in minutes) · snacks, immediately · tell them they're
//   your hero · plan something new today · never say "calm down" · let them win, just this once · a full-volume pep
//   talk · a match who's up for anything
//   group "Small spark. | *Big comeback.*"   LESSON "Their fire comes back fast. | Just *stay close.*"
//   last "Rematch at dawn? | *Already up.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, confetti, RED, CREAM, STEEL, PLUM, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff6b5a', S = 'aries', ST = { x: -190 }
const FLAG = ['WKWKWK', 'KWKWKW', 'WKWKWK', 'KWKWKW', 'S.....', 'S.....', 'S.....', 'S.....', 'S.....']
const FLAG_C = { W: '#ffffff', K: INK, S: BONE }
const CLOUD = ['..GGG.....', '.GGGGG.GG.', 'GGGGGGGGGG', 'GGGGGGGGGG', '.GGGGGGGG.']
/** a little storm cloud that clears to a sun */
function storm(x, t, cx, cy, k, clear) {
  if (k <= 0.01) return
  const c = clamp(clear)
  drawBits(x, ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...'], { Y: GOLD }, cx + 70, cy - 40, 20 * k * c)
  drawBits(x, CLOUD, { G: '#6b6f8a' }, cx - 40 * c, cy, 24 * k * (1 - 0.6 * c), { alpha: 1 - c })
  if (c < 0.6) for (let i = 0; i < 6; i++) { const ph = ((t * 2 + i / 6) % 1); x.fillStyle = SKYB; x.globalAlpha = (1 - c) * (1 - ph); x.fillRect(cx - 100 + i * 36, cy + 70 + ph * 120, 8, 22) }
  x.globalAlpha = 1
}

const CAMEOS = [
  { sign: S, cap: 'Challenge them | to *a race.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      drawBits(x, FLAG, FLAG_C, 820, 850, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) })
      bubble(x, 790, 640, 'race you!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl', col: LAV })
      L(x, 790, 1090, 'MOOD: RESTORED', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: S, cap: 'Let them vent. | It’s *over in minutes.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      storm(x, t, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.9, 1.5))
      L(x, 790, 1090, lt > 1.4 ? 'STORM: OVER' : 'STORM: ACTIVE', 1 * pop01(t, P.t0 + 0.4, 0.3, 2.2), lt > 1.4 ? GOLD : STEEL, -0.04, 36)
    } },
  { sign: S, cap: 'Snacks. | *Immediately.*', mood: lt => lt > 0.9 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const d = ease.outBack ? ease.outBack(prog(lt, 0.3, 0.8)) : ease.outCubic(prog(lt, 0.3, 0.8))
      bits(x, 'SANDWICH', lerp(1100, 790, d), 880, 22)
      L(x, 790, 1080, 'DELIVERED: 0:09', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 36)
    } },
  { sign: S, cap: 'Remind them | they’re *your hero.*', mood: 'sparkle', look: [1, 0], star: ST, keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TROPHY', 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 860, P.t0 + 0.6, 8, 190, 0.2)
      L(x, 790, 1080, 'MY HERO', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 44)
    } },
  { sign: S, cap: 'Plan something new. | *Today.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 300, rot: 0.04, head: 'TODAY', headBg: RED, headInk: CREAM, lines: ['rock climbing', 'then tacos', ['then MORE?', RED]], size: 34, progress: clamp((lt - 0.3) / 1.2) })
      bubble(x, 790, 1080, 'LET’S GO!!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: S, cap: 'Never say | *“calm down.”*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 760, 820, lt, 0.9, '“calm down”', '“you’re right!”', { size: 36, fromBg: STEEL, toBg: MINT })
      if (lt > 1.4) hearts(x, t, 790, 760, P.t0 + 1.4 * 3.1 / 2.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'Let them win. | Just *this once.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.3, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 790, 820, k, { w: 300, h: 260, rot: -0.04, head: 'SCORE', headBg: GOLD, headInk: INK, lines: [`ARIES: ${lt > 1.2 ? 10 : 9}`, 'YOU: 9…ish'], size: 38 })
      if (lt > 1.2) confetti(x, t, 790, 760, P.t0 + 1.2 * 3.1 / 2.4, { n: 18, spread: 220 })
      L(x, 790, 1070, 'CHAMPION (AGAIN)', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'A pep talk | at *full volume.*', mood: 'wide', look: [1, 0], star: ST, hops: [1.2], keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MEGA', 770, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bubble(x, 800, 660, 'YOU’VE | GOT THIS!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 790, 1090, 'VOLUME: 11', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, -0.04, 38)
    } },
  { sign: S, cap: 'A match who’s | *up for anything.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 830, 1.15 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH ✦', headCol: MINT, lines: [['race you to', BONE, pop01(t, P.t0 + 0.7, 0.25, 2)], ['the corner?', BONE, pop01(t, P.t0 + 0.9, 0.25, 2)], ['ALREADY RUNNING', PINK, pop01(t, P.t0 + 1.5, 0.25, 2), true]], size: 20 })
    } },
]

const F = makeFilm({
  id: 'r2a0667', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to cheer up | *an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Small spark. | *Big comeback.*', mood: 'sparkle' },
  lesson: { text: 'Their fire comes back fast. | Just *stay close.*', chip: 'SPIRIT: RESTORED' },
  last: {
    text: 'Rematch at dawn? | *Already up.*',
    draw(x, t, lt) { drawBits(x, FLAG, FLAG_C, 760, 1120, 18 * pop01(t, t - lt + 0.8, 0.3, 2), { rot: 0.05 * Math.sin(t * 5) }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
