// r2a0740: star_advice, ADVICE SOLO (cancer), "How to cheer up | a Cancer." (signs3kit social cut, lofi · G). Ending: group.
// Nine warm, specific ways to cheer up a Cancer, each with one light gag:
//   show up with snacks · rewatch their comfort movie (viewing #37) · "remember when…" · ask for the family recipe
//   · a beach walk (crabs love sand) · hug three seconds longer · a playlist, sad songs welcome
//   · ask about their day, listen to all six parts · leave the porch light on
//   group "Shell open. | Mood: restored."
import { makeFilm, sparkles, hearts, bubble, notes, pop01, drawBits, signChar, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, friend, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'Show up | *with snacks.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      bits(x, 'SNACKS', 800, 930, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 800, 700, 'SNACK DELIVERY', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 800, 1130, 'MOOD: +1', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 34)
    } },
  { sign: S, cap: 'Rewatch their comfort movie. | *Again.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 800, 880, P.t0 + 0.8, { n: 4, life: 1.6, spread: 160, cell: 6, seed: 2 })
      L(x, 800, 1120, 'VIEWING #37', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 36)
    } },
  { sign: S, cap: 'Say "remember when…" | *Watch them glow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 720, 'remember when…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 380, 860, P.t0 + 1.1, 8, 190, 0.2)
      L(x, 800, 1130, 'GLOW: MAXIMUM', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Ask for the family recipe. | *Instant joy.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 320, head: "GRANDMA'S", headBg: PINK, headInk: INK, lines: ['a pinch', 'a splash', 'a lot of', 'love'], size: 32, progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1120, 'SHARED (RARE!)', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'A beach walk. | *Crabs love sand.*', mood: 'sparkle', star: { x: -190, y: -20 }, hops: [0.6, 1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = '#f2d39a'; x.fillRect(110, 1060, 860, 170); x.fillStyle = '#6fc3ff'; x.fillRect(110, 1040, 860, 26); x.restore() }
    },
    front(x, t, lt, P) {
      bits(x, 'SUN', 820, 720, 16 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bits(x, 'UMB', 820, 960, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 600, 1140, 'SAND: APPROVED', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Hug them. | *Three seconds longer.*', mood: 'heart', star: { x: -130 },
    front(x, t, lt, P) {
      friend(x, t, 'libra', 720, 900, 220, pop01(t, P.t0 + 0.2, 0.35, 2), { mood: 'heart', look: [-1, 0] })
      const n = 3 - Math.min(2, Math.floor(Math.max(0, lt - 0.6) / 0.45))
      L(x, 800, 690, `HUG: +${n} SEC`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, -0.04, 36)
      hearts(x, t, 600, 860, P.t0 + 0.9, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Make them a playlist. | *Sad songs welcome.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'CASSETTE', 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      notes(x, t, 800, 820, { n: 4, cell: 7, col: SKYB, seed: 3 })
      L(x, 800, 1120, 'TRACK 1: THE CRIER', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Ask about their day. | *Listen to all of it.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.min(5, Math.floor(Math.max(0, lt - 0.4) / 0.3))
      bubble(x, 800, 760, 'so this morning…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 960, `PART ${n} OF 6`, pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, 0.04, 38)
      L(x, 800, 1100, 'WORTH IT', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Leave the porch light on. | *Always.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.6, 1.0))
      if (g > 0.01) { x.save(); const gr = x.createRadialGradient(800, 880, 10, 800, 880, 260); gr.addColorStop(0, `rgba(255,231,140,${0.55 * g})`); gr.addColorStop(1, 'rgba(255,231,140,0)'); x.fillStyle = gr; x.fillRect(540, 620, 520, 520); x.restore() }
    },
    front(x, t, lt, P) {
      bits(x, 'HOUSE', 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'LAMP', 900, 780, 9 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1140, 'WELCOME HOME', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0740', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'How to cheer up | *a Cancer.*',
  cameos: CAMEOS,
  group: {
    cap: 'Shell open. | *Mood: restored.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 760, t - lt + 1.2, { n: 8, life: 2.2, spread: 460, cell: 8, seed: 5 }); sparkles(x, t, 540, 860, t - lt + 1.0, 9, 260, 0.1) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
