// r2a0654: star_advice, ADVICE SOLO, "Aries, you can | *say no.*" (topic: "Aries, you're allowed to say no", trimmed
// to fit two lines; ~51 s vertical, signs3kit social cut, music: lofi · E). One sign the whole way, 9 cards:
//   asked to help move (your back says no) · fourth plan this week (stay in) · always the leader (pass the crown)
//   · "no" is a full sentence · fixing everyone's problems (not your job today) · said yes too fast (take it back)
//   · volunteered for everything (pick one) · midnight favour ask (sleep wins) · boundaries aren't walls, they're a door
//  37.8  "Big heart. | *Bigger boundaries.*"   41.0  LESSON "Saying no to them | *is yes to you.*" STATUS: PROTECTED
//  46.9  "The crown can wait. | *Nap first.*"
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, sheet, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const S = 'aries', ACC = '#ff6b5a', ST = { x: -170 }

const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const DOOR = ['KKKKKKKK', 'KWWWWWWK', 'KWHHWWWK', 'KWHHHWWK', 'KWWHWWWK', 'KWWWWWWK', 'KWWWWWYK', 'KWWWWWWK', 'KWWWWWWK', 'KWWWWWWK', 'KKKKKKKK']
const DOOR_C = { K: INK, W: '#c98f5a', H: PINK, Y: GOLD }

const CAMEOS = [
  { sign: S, cap: 'Asked to help move? | *Your back says no.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) bits(x, 'BOX', 800 + (i % 2 ? 30 : -20), 1080 - i * 70, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      L(x, 800, 640, 'BOX 1 OF 40', pop01(t, P.t0 + 0.8, 0.3, 2.2), RED, 0.05, 36)
      bubble(x, 420, 640, 'not today ♡', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: S, cap: 'Fourth plan this week? | *Stay in. Glow.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 320, h: 330, head: 'THIS WEEK', headBg: ACC, lines: ['mon: party', 'tue: dinner', 'wed: gym date', ['thu: COUCH ♡', '#2f8a48']], size: 30, align: 'left', progress: clamp((lt - 0.3) / 1.2) })
      L(x, 800, 1100, 'GLOW MODE: ON', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Always the leader? | *Pass the crown.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      const Fc = k > 0.01 ? signChar(x, t, 'taurus', 800, 980, 200 * k, { mood: lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.3] }) : null
      const p = ease.inOutCubic(prog(lt, 0.6, 1.2))
      const fx = lerp(F.x, 800, p), fy = lerp(F.top - 30, Fc ? Fc.top - 26 : 860, p) - Math.sin(Math.PI * p) * 120
      drawBits(x, CROWN, CROWN_C, fx, fy, 14, { rot: 0.06 })
      L(x, 800, 660, 'YOUR TURN!', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, 0.05, 36)
    } },
  { sign: S, cap: '“No” is a | *full sentence.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 820, 'no ♡', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 90, tail: 'bl' })
      L(x, 800, 1060, 'NO NOTES NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 800, 820, P.t0 + 0.6, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Fixing everyone’s stuff? | *Not today’s job.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const drop = ease.outCubic(prog(lt, 0.8, 1.2))
      bits(x, 'WRENCH', 800, lerp(780, 1060, drop), 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.5, 0.2, drop) })
      L(x, 800, 650, 'TOOLS: DOWN', pop01(t, P.t0 + 1.0, 0.3, 2.2), STEEL, 0.05, 36)
      L(x, 800, 900, 'OFF DUTY ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Said yes too fast? | *You can take it back.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'YES! wait…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 42, tail: 'bl' })
      swapLabel(x, 800, 900, lt, 1.1, 'YES TO ALL', 'MAYBE LATER ♡', { size: 36, fromBg: GOLD, toBg: MINT })
      L(x, 800, 1090, 'UNDO ↺ ALLOWED', pop01(t, P.t0 + 1.7, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: S, cap: 'Volunteered for everything? | *Pick one.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 330, h: 380, head: 'SIGN-UP', headBg: MINT, headInk: INK, lines: lt > 1.4 ? [['bake sale: ARIES', '#2f8a48'], ['bake sale', '#b9b0a0'], ['car wash', '#b9b0a0'], ['face paint', '#b9b0a0'], ['clean-up', '#b9b0a0']] : ['bake sale: ARIES', 'tickets: ARIES', 'car wash: ARIES', 'face paint: ARIES', 'clean-up: ARIES'], size: 26, align: 'left', progress: clamp((lt - 0.3) / 0.9) })
      L(x, 800, 1110, 'ONE. JUST ONE.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: S, cap: 'Midnight favour ask? | *Sleep wins.*', mood: 'sleepy', star: { x: -170, y: 20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bits(x, 'PILLOW', 380, 1000, 24 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 680, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 880, 'u up? quick | favour…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'br', col: LAV })
      zzz(x, t, 520, 760, { size: 44 })
      L(x, 800, 1090, 'ANSWER: TOMORROW', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Boundaries aren’t walls. | *They’re a door.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1130, 'KNOCK FIRST ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 800, 760, P.t0 + 1.3, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0654', key: 'E', accent: ACC, solo: S, ending: 'lesson',
  title: 'Aries, you can | *say no.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Bigger boundaries.*', mood: 'sparkle' },
  lesson: { text: 'Saying no to them | *is yes to you.*', chip: 'STATUS: PROTECTED' },
  last: {
    text: 'The crown can wait. | *Nap first.*',
    draw(x, t, lt) {
      drawBits(x, CROWN, CROWN_C, 790, 980, 14 * pop01(t, t - lt + 0.8, 0.3, 2), { rot: 0.2 })
      hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
