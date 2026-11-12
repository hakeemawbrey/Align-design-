// r2a0742: star_advice, ADVICE SOLO (capricorn), "How to check in | *on a Capricorn.*" (signs3kit social cut, lofi · F).
// One sign the whole way: nine gentle ways to look after the Capricorn who looks after everything. Each card: a relatable
// truth + a warm reframe, one light gag. Ending: callback (the "how are you?" answered as a spreadsheet).
//   "just busy!" (ask what's heavy) · bring a snack, skip the lecture · take one task off the list · dinner's ready,
//   the laptop closes · praise the effort (they hide behind a clipboard) · make the plan, they arrive early
//   · they budgeted your trip = "I love you" · comfy quiet on the couch · rest isn't lazy (battery charging)
//   group "Built tough. | *Loves soft.*"   last "Asked how they are. | *Got a spreadsheet.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, zzz, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#7dffb0', S = 'capricorn', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: 'They say “just busy.” | *Ask what’s heavy.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) bits(x, 'PAPERS', 800 + (i % 2) * 14, 990 - i * 66, 14 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: (i % 2 ? 0.05 : -0.04) })
      bubble(x, 800, 690, 'just busy!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 1130, 'THE PILE: TALKABLE', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Bring a snack. | *Skip the lecture.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 680, 'LUNCH: SKIPPED AGAIN', pop01(t, P.t0 + 0.2, 0.3, 2), STEEL, -0.04, 30)
      const d = ease.outCubic(clamp((lt - 0.6) / 0.5))
      if (lt > 0.6) bits(x, 'SANDWICH', lerp(980, 800, d), 900, 20)
      L(x, 800, 1090, 'NO SPEECH. JUST BREAD.', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Take one task | *off their endless list.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const done = lt > 1.2
      sheet(x, 800, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 320, h: 380, head: 'TO DO (1/47)', headBg: '#5fd068', headInk: INK, lines: [done ? ['✓ groceries', '#2f8a48'] : 'groceries', 'taxes', 'fix shelf', 'call mum', '…'], size: 30, align: 'left' })
      if (done) L(x, 800, 1110, 'DONE BY YOU ♡', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
    } },
  { sign: S, cap: 'Dinner’s ready? | *The laptop finally closes.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shut = lt > 1.2
      if (!shut) bits(x, 'LAPTOP', 800, 920, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, ['.KKKKKKKKKKKK.', 'GGGGGGGGGGGGGG', '.GGGGGGGGGGGG.'], { K: INK, G: STEEL }, 800, 990, 18)
      swapLabel(x, 800, 680, lt, 1.1, 'WORK: 9:47 PM', 'DINNER: WON', { size: 32, fromBg: STEEL, toBg: '#ffb34a' })
      if (shut) { bits(x, 'DISH', 800, 1100, 12 * pop01(t, P.t0 + 1.4, 0.3, 2.2)); }
    } },
  { sign: S, cap: 'Praise the effort. | *Not just the win.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bubble(x, 800, 690, 'you worked | so hard.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const up = ease.outCubic(clamp((lt - 1.0) / 0.4))
      if (lt > 1.0) bits(x, 'CLIP', F.x + 10, lerp(F.cy + 160, F.cy + 30, up), 22, { rot: 0.05 })
      L(x, 800, 1090, 'BLUSHING: CLASSIFIED', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Make the plan for them. | *They’ll arrive early.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 240, head: 'SATURDAY', headBg: RED, lines: ['2:00 pm', 'picnic', '(you bring nothing)'], size: 30 })
      L(x, 800, 1080, 'ARRIVED: 1:41 PM', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'They budgeted your trip? | *That’s “I love you.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 330, h: 330, bg: '#eafff2', head: 'YOUR TRIP.xls', headBg: '#2f8a48', lines: ['flights   ✓', 'hotel     ✓', 'snacks    ✓', ['backup plan ✓', '#2f8a48']], size: 28, font: "'Space Mono', monospace", weight: 700, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      hearts(x, t, 800, 700, P.t0 + 1.4, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Sit in comfy quiet. | *They’ll open up.*', mood: lt => lt > 1.5 ? 'happy' : 'sleepy', star: { x: -150, y: 20 },
    front(x, t, lt, P) {
      bits(x, 'COUCH', 620, 1010, 26 * pop01(t, P.t0 + 0.1, 0.3, 2))
      friend(x, t, 'pisces', 820, 930, 180, pop01(t, P.t0 + 0.4, 0.35, 2), { mood: 'happy', look: [-1, 0], tears: 1 })
      bubble(x, 790, 700, 'so… today was a lot', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Rest isn’t lazy. | *Tell them kindly.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BATT', 800, 880, 22 * k)
      const f = clamp((lt - 0.5) / 1.4)
      if (k > 0.9) { x.fillStyle = f < 0.4 ? RED : MINT; x.fillRect(800 - 6.5 * 22 + 22, 880 - 1.5 * 22, (10 * 22) * f, 3 * 22) }
      L(x, 800, 690, 'BATTERY: CHARGING', pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, -0.04, 32)
      if (lt > 1.2) zzz(x, t, 470, 760, { alpha: 0.9 })
      L(x, 800, 1080, 'NAP: PRODUCTIVE', pop01(t, P.t0 + 1.6, 0.3, 2.2), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0742', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'How to check in | *on a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Built tough. | *Loves soft.*', mood: 'heart' },
  last: {
    text: 'Asked how they are. | *Got a spreadsheet.*',
    draw(x, t, lt) {
      sheet(x, 540, 1060, pop01(t, t - lt + 0.6, 0.4, 2), { w: 560, h: 440, bg: '#eafff2', head: 'HOW I AM.xls', headBg: '#2f8a48', lines: ['tired:   a bit', 'proud:   yes', 'loved:   ✓', ['glad you asked', '#2f8a48']], size: 42, font: "'Space Mono', monospace", weight: 700, align: 'left', progress: clamp((lt - 0.9) / 1.4), rot: 0.02 })
      hearts(x, t, 540, 880, t - lt + 2.0, { n: 6, life: 1.6, spread: 300, cell: 8, seed: 2 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
