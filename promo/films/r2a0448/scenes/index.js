// r2a0448: star_advice, ADVICE SOLO, "What Geminis need | *on a bad day.*" (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one light gag each. Ending: group.
//   3.6–37.8   a three-hour call · any distraction · permission to change plans · fast replies · both moods welcome
//              · something new to learn · snacks and a random fact · "tell me more", not "calm down" · notice the quiet twin
//  37.8        ending (group): "Talk it out. | *Then talk more.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { sheet, phone, BM, RED, CREAM, ORANGE, WOOD, GREEN, PURPLE } from './props.js'

const S = 'gemini', YEL = '#ffd23a'

/** a strike-through line across a bubble's text, drawn in from the left */
function strike(x, cx, cy, w, p) { if (p <= 0) return; x.save(); x.fillStyle = RED; x.fillRect(cx - w / 2, cy - 4, w * clamp(p), 9); x.restore() }

const CAMEOS = [
  { sign: S, cap: 'Someone to talk to. | *For three hours.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const sec = Math.floor(lt * 4000) + 10800, hh = Math.floor(sec / 3600), mm = Math.floor(sec / 60) % 60, ss = sec % 60
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'ON A CALL', headCol: MINT, lines: [
        [`${hh}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, GOLD, 1], ['…and another', BONE, pop01(t, P.t0 + 0.8, 0.2, 2)], ['thing!', BONE, pop01(t, P.t0 + 1.1, 0.2, 2)],
      ] })
    } },
  { sign: S, cap: 'A distraction. | *Any distraction.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      const B = [['otters?', 720, 650, PINK], ['space?', 880, 800, SKYB], ['snacks?', 700, 950, GOLD], ['a new hobby?', 820, 1110, MINT]]
      B.forEach(([s, bx, by, c], i) => bubble(x, bx, by, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 38, col: c, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: S, cap: 'Permission to | *change the plan.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, 'PLAN A', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      strike(x, 790, 700, 170, prog(lt, 0.5, 0.8))
      label(x, 790, 830, 'PLAN B', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 40, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      strike(x, 790, 830, 170, prog(lt, 1.0, 1.3))
      label(x, 790, 980, 'PLAN Q ♡', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 48, bg: YEL, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Fast replies. | *Fast is love.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P) {
      phone(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOU', headCol: YEL, lines: [
        ['bad day :(', BONE, pop01(t, P.t0 + 0.4, 0.2, 2), true], ['calling now', MINT, pop01(t, P.t0 + 0.7, 0.2, 2)], ['bringing snacks', MINT, pop01(t, P.t0 + 0.9, 0.2, 2)],
      ] })
      label(x, 790, 1130, 'REPLY TIME: 0.4 SEC', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Both moods | *welcome here.*', hideStar: true, star: { x: -170 },
    front(x, t, lt, P) {
      signChar(x, t, S, 330, 890, 230, { mood: 'neutral', look: [1, 1], pop: P.k, seed: 51, hops: [P.t0 + 0.1] })
      signChar(x, t, S, 590, 880, 230, { mood: 'sparkle', look: [-1, 0], pop: pop01(t, P.t0 + 0.35, 0.45, 1.8), seed: 52, hops: [P.t0 + 0.4, P.t0 + 1.6] })
      label(x, 830, 760, 'BOTH WELCOME', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 460, 820, P.t0 + 1.3, { n: 6, life: 1.8, spread: 300, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Something new to learn. | *Tonight.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BM.BOOK, BM.BOOK_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      label(x, 790, 700, 'NEW HOBBY #48', pop01(t, P.t0 + 0.7, 0.3, 2), { size: 36, bg: YEL, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'PAGE 1 OF MANY', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Snacks and | *a random fact.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      sheet(x, 780, 840, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 350, h: 300, head: 'FUN FACT', headCol: SKYB, size: 30, rows: [
        ['otters hold', INK, pop01(t, P.t0 + 0.7, 0.2, 2)], ['hands to sleep', INK, pop01(t, P.t0 + 0.9, 0.2, 2)], ['(true!) ✓', RED, pop01(t, P.t0 + 1.3, 0.2, 2)],
      ] })
      drawBits(x, BM.PIZZA, BM.PIZZA_C, 790, 1100, 11 * pop01(t, P.t0 + 0.2, 0.3, 2))
    } },
  { sign: S, cap: 'Not "calm down." | Just *"tell me more."*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'calm down', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 46, col: BONE, tail: 'bl' })
      strike(x, 780, 696, 250, prog(lt, 0.6, 0.9))
      bubble(x, 780, 920, 'tell me more!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 48, col: YEL, tail: 'bl' })
      sparkles(x, t, 780, 920, P.t0 + 1.1 * (3.1 / 2.4), 8, 200, 0.4)
    } },
  { sign: S, cap: 'Someone who notices | *the quiet twin.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, S, 780, 990, 150 * k, { mood: lt > 1.3 ? 'happy' : 'sleepy', look: [-1, 0], seed: 57, glyph: false })
      drawBits(x, BM.BLANKET, BM.BLANKET_C, 780, 1060, 12 * pop01(t, P.t0 + 0.8, 0.3, 2))
      bubble(x, 780, 750, 'hey you. | you okay?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: PINK, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2a0448', key: 'C', accent: YEL, solo: S, ending: 'group',
  title: 'What Geminis need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Talk it out. | *Then talk more.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
