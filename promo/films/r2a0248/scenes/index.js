// r2a0248: star_advice, ADVICE SOLO, "Capricorns need | to feel heard." (batch topic: "What Capricorns need to feel heard.") (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quiet, capable Capricorn and the small things that
// make them feel listened to.
//   0.0–3.6    "Capricorns need | *to feel heard.*"
//   3.6–37.8   nine cards (3.8 s each):
//              they won't say it twice, turn the volume up · don't fix it, just nod · ask about the plan · quiet is
//              busy, not cold (a flower on the rock) · notice the effort out loud · on time is their love language
//              · they vent in bullet points, read every one · schedule the deep talk · a heard Capricorn softens
//  37.8        group ending: "Listen once. | *Loved for life.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, clock, bar, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const S = 'capricorn'
const ST = { x: -190 }
const ACC = GOLD
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const TOOLBOX = ['...KKKKKK...', '...K....K...', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'KKKKKYYKKKKK', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRR']
const ROCK = ['.....FFF.......', '....FFYFF......', '.....FFF.......', '......V.V......', '.......V.......', '..GGGGGGGGGG...', '.GGGGGLGGGGGG..', 'GGGLGGGGGGGGGG.', 'GGGGGGGGGLGGGGG', '.GGGGGGGGGGGGG.']
const ROCK_C = { F: PINK, Y: SUN, V: '#5fd068', G: '#6e6a8a', L: '#8e8aa8' }
const MUG = ['..S..S...', '...S..S..', 'WWWWWWW...', 'WCCCCCWWW.', 'WCCCCCW.W.', 'WCCCCCWWW.', 'WCCCCCW...', '.WWWWW....']
const MUG_C = { S: BONE, W: CREAM, C: '#8a4a2e' }

const CAMEOS = [
  { sign: S, cap: 'They won’t say it twice. | *Listen the first time.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'I’m tired.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: GREY, tail: 'br' })
      bar(x, 790, 900, pop01(t, P.t0 + 0.5, 0.3, 2), lerp(0.12, 1, ease.inOutCubic(prog(lt, 0.8, 1.5))), 'VOLUME', { col: MINT, w: 320 })
      lab(x, 790, 1080, 'HEARD: FIRST TIME', pop01(t, P.t0 + 1.8, 0.3, 2.4), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Don’t fix it for them. | *Just nod.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.7, 1.1))
      drawBits(x, TOOLBOX, { K: INK, R: RED, Y: SUN }, 790, 920, 20 * pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - 0.2 * shut))
      lab(x, 790, 760, shut > 0.5 ? 'TOOLS: AWAY' : 'FIX-IT KIT', pop01(t, P.t0 + 0.4, 0.3, 2), { bg: shut > 0.5 ? MINT : SUN, rot: 0.04 })
      bubble(x, 790, 1100, 'mhm. that’s hard.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'They plan everything. | *Ask about the plan.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      card(x, 790, 820, 340, 280, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: '#f4f8ff', rot: 0.02 }, () => {
        txt(x, 'THE PLAN', 0, -105, { size: 28, font: MONO, weight: 700 })
        x.strokeStyle = SKYB; x.lineWidth = 6; x.beginPath(); x.moveTo(-130, 80); x.lineTo(-60, 20); x.lineTo(10, 40); x.lineTo(120, -60); x.stroke()
        for (const [px, py] of [[-130, 80], [-60, 20], [10, 40], [120, -60]]) { x.fillStyle = INK; x.fillRect(px - 9, py - 9, 18, 18) }
      })
      bubble(x, 790, 1050, 'tell me more?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
      sparkles(x, t, 380, 820, P.t0 + 1.8, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Quiet means busy. | *Not cold.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.8, 1.3))
      const bm = g < 0.5 ? ROCK.map((r, j) => j < 5 ? r.replace(/[FYV]/g, '.') : r) : ROCK
      drawBits(x, bm, ROCK_C, 790, 930, 22 * pop01(t, P.t0 + 0.15, 0.35, 2))
      lab(x, 790, 700, 'WARM INSIDE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK, rot: -0.04, size: 34 })
      if (lt > 1.0) hearts(x, t, 790, 760, P.t0 + 1.3, { n: 3, life: 1.4, spread: 100, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Notice the effort. | *Out loud.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 340, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'DONE TODAY', 0, -130, { size: 26, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) { x.fillStyle = GREY; x.fillRect(-110, -80 + i * 50, 180, 12); x.fillStyle = MINT; x.fillRect(90, -88 + i * 50, 26, 26) }
      })
      const s = pop01(t, P.t0 + 0.9, 0.35, 2.6)
      if (s > 0.01) drawBits(x, ['....Y....', '...YYY...', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '.YYY.YYY.', 'YY.....YY'], { Y: SUN }, 900, 700, 14 * s, { rot: 0.2 })
      bubble(x, 790, 1110, 'you did SO much', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Show up on time. | *That’s the love language.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      clock(x, 790, 820, 120, pop01(t, P.t0 + 0.15, 0.35, 2), 6, lerp(50, 60, ease.inOutCubic(prog(lt, 0.2, 1.0))))
      lab(x, 790, 1040, 'ARRIVED: 7:00 SHARP', pop01(t, P.t0 + 1.1, 0.3, 2.4), { bg: GOLD, rot: -0.04, size: 30 })
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'They vent in bullet points. | *Read every one.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 380, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = BROWN; x.fillRect(-60, -206, 120, 36)
        txt(x, 'FEELINGS:', -40, -140, { size: 28, font: MONO, weight: 700 })
        for (let i = 0; i < 5; i++) {
          const y = -80 + i * 54
          x.fillStyle = INK; x.fillRect(-140, y - 6, 12, 12); x.fillStyle = GREY; x.fillRect(-110, y - 6, 170 - (i * 23) % 50, 12)
          if (lt > 0.6 + i * 0.25) { x.fillStyle = MINT; x.fillRect(100, y - 14, 28, 28); x.fillStyle = INK; x.fillRect(106, y - 2, 6, 10); x.fillRect(112, y + 2, 12, 6) }
        }
      })
      lab(x, 790, 640, 'READ: ALL OF THEM', pop01(t, P.t0 + 1.9, 0.3, 2.2), { bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Schedule the deep talk. | *Honestly? They’d love that.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 300, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: '#f4f8ff', rot: -0.02 }, () => {
        x.fillStyle = LAV; x.fillRect(-180, -150, 360, 70); txt(x, 'INVITE', 0, -115, { size: 28, font: MONO, weight: 700 })
        txt(x, 'Feelings chat', 0, -40, { size: 34 }); txt(x, 'Thu · 7:00 pm', 0, 6, { size: 28, font: MONO, weight: 700, color: GREY })
        const a = lt > 1.2
        x.fillStyle = a ? MINT : '#e8dfcf'; x.fillRect(-120, 50, 240, 64); txt(x, a ? 'ACCEPTED' : 'ACCEPT', 0, 84, { size: 30, font: MONO, weight: 700 })
      })
      sparkles(x, t, 790, 940, P.t0 + 1.2 * 1.29 + 0.1, 6, 160, 0.3)
    } },
  { sign: S, cap: 'A heard Capricorn | *softens fast.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      drawBits(x, MUG, MUG_C, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      lab(x, 790, 680, 'GUARD: DOWN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: GOLD, rot: -0.04, size: 34 })
      lab(x, 790, 1100, 'COZY: UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { bg: PINK, rot: 0.05 })
    } },
]

const F = makeFilm({
  id: 'r2a0248', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorns need | *to feel heard.*',
  cameos: CAMEOS,
  group: {
    cap: 'Listen once. | *Loved for life.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
