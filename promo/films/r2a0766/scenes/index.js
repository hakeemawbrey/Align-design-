// r2a0766: star_advice, ADVICE SOLO (taurus), "What a Taurus | *won't say out loud.*" (signs3kit social cut, lofi · D).
// One sign the whole way: nine quiet Taurus truths, each with a warm reframe and one light gag.
// Ending: group (the group beat is the punchline: "Say it anyway. | *We're listening.*").
//   plans changed, buffering · fourteen drafts of "miss you" · the 2014 hoodie is a wearable hug · tired, not lazy
//   · wanted the last bite, ask · remembers everyone's order · slow is still moving (snail on a finish line)
//   · being held feels nice too · more soft than stubborn
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dd18a', S = 'taurus', ST = { x: -180 }
const HOODIE = ['...HHHH...', '..HH..HH..', '.HHHDDHHH.', 'HHHHDDHHHH', 'HHHHHHHHHH', 'HH.HHHH.HH', 'HH.HPPH.HH', 'HH.HHHH.HH', 'HH.HHHH.HH', '...HHHH...']
const SNAIL = ['.....K..K..', '......K.K..', '..SSS..YYY.', '.SWWSS.YKY.', 'SWSSWSYYYY.', 'SWSWWSYYY..', '.SSSSYYYYY.', 'YYYYYYYYYYY']
const FRY = ['Y', 'Y', 'Y', 'Y', 'Y', 'Y']

const CAMEOS = [
  { sign: S, cap: 'Plans changed last minute? | *You’re allowed a minute.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 770, 720, lt, 0.8, 'DINNER AT 7', 'DINNER: NOW?!', { size: 32, fromBg: CREAM, toBg: RED })
      const dots = '.'.repeat(1 + Math.floor(t * 3) % 3)
      L(x, 770, 930, `BUFFERING${dots}`, pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, 0.04, 32)
      L(x, 770, 1090, 'TAKE THE MINUTE', pop01(t, P.t0 + 1.9, 0.3, 2.2), MINT, -0.04, 32)
    } },
  { sign: S, cap: '“Miss you” in drafts? | *Send it.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.2) * 13)
      phone(x, t, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: `DRAFTS: ${n}`, headCol: ACC, lines: [['miss u', BONE, 1, true], ['miss u?', BONE, 1, true], ['hey stranger', BONE, 1, true], ['miss you ♡', MINT, pop01(t, P.t0 + 1.7, 0.3, 2.4), true]], typing: lt < 1.6 ? 1 : 0 })
      L(x, 800, 1110, 'SENT. THEY SMILED.', pop01(t, P.t0 + 2.0, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Same hoodie since 2014? | *It’s a wearable hug.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOODIE, { H: '#b7a6ff', D: '#8a78d8', P: '#8a78d8' }, 800, 870, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 800, 640, 'HOODIE, AGE 12', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 800, 1100, 'NOT GIVING IT UP', pop01(t, P.t0 + 1.5, 0.3, 2.2), ACC, 0.04, 30)
      hearts(x, t, 560, 900, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Tired isn’t lazy. | *Rest counts too.*', mood: lt => lt > 1.0 ? 'sleepy' : 'neutral', star: { x: -180, y: 20 },
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      zzz(x, t, F.x + 90, F.top - 10, { alpha: clamp((lt - 0.9) * 2), size: 46 })
      L(x, 800, 700, 'NAP: SCHEDULED', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, -0.04, 34)
      L(x, 800, 1110, 'GUILT: CANCELLED', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Wanted the last fry? | *Just ask.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'PLATE', 790, 920, 26 * k)
      drawBits(x, FRY, { Y: '#ffd23a' }, 790, 850, 16 * k, { rot: 0.3 + Math.sin(t * 3) * 0.05 })
      L(x, 790, 1100, 'ONE (1) FRY LEFT', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 30)
      bubble(x, 800, 670, 'you take it!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl', col: PINK })
    } },
  { sign: S, cap: 'You know everyone’s order. | *That’s love.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 330, head: 'MEMORISED', headBg: ACC, headInk: INK, lines: ['mom: oat, extra hot', 'sam: no pickles', 'jo: half sweet', 'you: …?'], size: 26, progress: clamp((lt - 0.3) / 1.3) })
      L(x, 800, 1100, 'NOW ORDER YOURS', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Change feels scary? | *Slow still gets there.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), m = ease.inOutCubic(clamp((lt - 0.3) / 1.5))
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = BONE
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? INK : BONE; x.fillRect(900, 860 + i * 24, 24, 24); x.fillStyle = i % 2 ? BONE : INK; x.fillRect(924, 860 + i * 24, 24, 24) }
      x.restore()
      drawBits(x, SNAIL, { K: INK, S: '#c98f5a', W: '#8a5a32', Y: '#ffe7a8' }, lerp(640, 830, m), 950, 18 * k)
      L(x, 790, 700, 'PACE: SNAIL', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 32)
      L(x, 790, 1110, 'STILL ARRIVED', pop01(t, P.t0 + 1.9, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Always the comfy one? | *Get held too.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 770, 950, 220, pop01(t, P.t0 + 0.35, 0.35, 2), { mood: 'heart', look: [-1, 0], hops: [P.t0 + 1.2] })
      L(x, 780, 1120, 'HUG: INCOMING', pop01(t, P.t0 + 0.8, 0.3, 2.2), PINK, -0.04, 32)
      hearts(x, t, 620, 820, P.t0 + 1.3, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Called stubborn a lot? | *We see the soft.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      swapLabel(x, 780, 760, lt, 1.0, 'STUBBORN', 'SECRETLY SOFT', { size: 36, fromBg: STEEL, toBg: PINK })
      L(x, 790, 1040, 'WE KNEW', pop01(t, P.t0 + 1.9, 0.3, 2.2), GOLD, 0.04, 36)
      sparkles(x, t, 790, 760, P.t0 + 1.5, 7, 170, 0.4)
    } },
]

const F = makeFilm({
  id: 'r2a0766', key: 'D', accent: ACC, solo: S, ending: 'group',
  title: 'What a Taurus | won’t *say out loud.*',
  cameos: CAMEOS,
  group: {
    cap: 'Say it anyway. | *We’re listening.*', mood: 'heart',
    draw(x, t, lt) { hearts(x, t, 540, 700, t - lt + 1.2, { n: 8, life: 2.6, spread: 460, cell: 8, seed: 7 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
