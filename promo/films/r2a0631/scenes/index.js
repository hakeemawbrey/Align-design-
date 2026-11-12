// r2a0631: star_advice, ADVICE SOLO (gemini), "What Geminis need | *to feel heard.*" (signs3kit social cut, lofi · D).
// Nine gentle truths about being heard as a Gemini, each with a warm reframe and one light gag. Ending: group.
//   ten topics, one breath · a nine-minute voice note · changed their mind (ask what changed) · the 2 a.m. idea
//   · two moods at once · the joke that flopped · three new hobbies · talking fast = trust · phone down, they glow
//   group (the ending) "Ask them one | *more question.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, phone, bits, swapLabel, RED, CREAM, STEEL, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffe27a', S = 'gemini', ST = { x: -190 }
const BULB = ['..YYYY..', '.YYYYYY.', 'YYWYYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..SSSS..', '..SSSS..', '...SS...']
const WAVE = [3, 6, 9, 5, 8, 4, 10, 6, 3, 7, 9, 5, 4, 8, 6]

const CAMEOS = [
  { sign: S, cap: 'Ten topics in one breath? | *Ask about all ten.*', mood: lt => lt > 1.5 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(clamp((lt - 0.3) / 1.3) * 10))
      const words = ['space', 'soup', 'exes', 'owls', 'jobs', 'dreams', 'tea', 'maps', 'jazz', 'bees']
      for (let i = 0; i < Math.min(n, 6); i++) bubble(x, 690 + (i % 2) * 210, 640 + Math.floor(i / 2) * 130, words[i + Math.max(0, n - 6)], 1, { size: 34, col: i % 2 ? CREAM : '#fff2b0', tail: i % 2 ? 'br' : 'bl' })
      L(x, 800, 1130, `TOPIC ${n} OF 10`, pop01(t, P.t0 + 0.4, 0.3, 2.2), ACC, -0.04, 32)
    } },
  { sign: S, cap: 'A nine-minute voice note? | *Listen to all of it.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -70, 360, 140); x.fillStyle = MINT; x.fillRect(-172, -62, 344, 124)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -24); x.lineTo(-110, 0); x.lineTo(-150, 24); x.fill()
        const played = clamp((lt - 0.4) / 1.8)
        WAVE.forEach((h, i) => { x.fillStyle = i / WAVE.length < played ? INK : '#3a8a64'; x.fillRect(-90 + i * 16, -h * 4, 10, h * 8) })
        x.restore()
      }
      L(x, 800, 1060, '9:02 · PLAYING', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, 0.04, 32)
    } },
  { sign: S, cap: 'Changed their mind again? | *Ask what changed.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 800, 800, lt, 0.9, 'PLAN: BEACH', 'PLAN: MUSEUM', { size: 40, fromBg: SKYB, toBg: LAV })
      bubble(x, 800, 1040, 'ooh, why?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'A 2 a.m. idea? | Say *“tell me more.”*', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 900, 660, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const glow = lt > 0.6 ? 0.5 + 0.5 * Math.sin(t * 8) : 0
      drawBits(x, BULB, { Y: glow > 0.5 ? '#fff27a' : '#ffd23a', W: '#ffffff', S: STEEL }, 780, 820, 20 * pop01(t, P.t0 + 0.5, 0.3, 2.2))
      L(x, 800, 1090, 'IDEA #47 TONIGHT', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Two moods at once? | *Both are real.*', mood: lt => lt % 1.2 < 0.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'SUN', 680, 820, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'CLOUD', 860, 830, 15 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 1060, 'BOTH: VALID', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Their joke flopped? | *Laugh anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'why did the | star blush?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 900, 'CRICKETS…', pop01(t, P.t0 + 0.7, 0.3, 2), STEEL, -0.05, 32)
      L(x, 800, 1060, 'YOU: HA HA HA', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 34)
      hearts(x, t, 560, 820, P.t0 + 1.5, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Three new hobbies? | *Cheer for every one.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 690, 840, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PEN', 830, 820, 12 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: -0.5 })
      bits(x, 'TENT', 760, 990, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 790, 650, 'GO YOU! ×3', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: S, cap: 'Talking super fast? | That means *they trust you.*', mood: 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const lines = ['and then—', 'wait, also—', 'okay so—']
      lines.forEach((l, i) => bubble(x, 800 + (i % 2 ? 40 : -20), 680 + i * 140, l, pop01(t, P.t0 + 0.3 + i * 0.4, 0.25, 2.2), { size: 38, col: i === 1 ? '#fff2b0' : BONE, tail: 'bl' }))
      L(x, 800, 1130, 'SAFE PLACE: YOU', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Phone down, eyes up. | *Watch them glow.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const away = ease.inOutCubic(prog(lt, 0.4, 1.0))
      phone(x, t, lerp(800, 800, away), lerp(860, 1080, away), pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - 0.6 * away), { head: 'NOTIFS', headCol: STEEL, rot: lerp(0.05, 1.2, away) })
      L(x, 790, 700, 'FULL ATTENTION', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 34)
      sparkles(x, t, 350, 880, P.t0 + 1.2, 8, 190, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2a0631', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'What Geminis need | *to feel heard.*',
  cameos: CAMEOS,
  group: {
    cap: 'Ask them one | *more question.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
