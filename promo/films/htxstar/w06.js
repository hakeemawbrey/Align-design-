// Houston Star Talk · worker w06 · style "pov" (hst136–hst160). See promo/posting/htx/FARM.md and htxstar/w06kit.js.
// The viewer IS the sign: a time/place chip, a "you…" narration strip, the star talking into camera, the party ticket.
import { pov, SET, Y, holding, sweater, shades, cap, headband, clipboard, dog, phone, chatB, thermo, boba, bowl, queso, wing, raspa, kingCake, crawfish, paddle, ball, boat, mosquito, plant, palm, tree, sun, SKIES,
  taco, kolache, klobasnek, car, puffer, heatSun, sweat, label, txt, box, sparkles, clamp, prog, GOLD, BONE, PINK, INK, MONO, MINT, SKYB, LAV, BRAKE, HGREEN, streetSign, overheadSign, shield, notes, heart } from './w06kit.js'
import { W06B } from './w06b.js'
import { W06C } from './w06c.js'

const B = (d, set, chip, cap, lines = [], extra = {}) => ({ d, set, chip, cap, lines, ...extra })
const hold = f => (x, t, lt, P) => f(x, t, lt, P)

export const W06 = {
  // ── hst136 · Taurus · a slow, delicious Heights Saturday
  hst136: pov({
    sign: 'taurus', acc: PINK, hook: "POV: you're a | Houston Taurus", end: 'Bring snacks. Jan 9.', stars: ['taurus', 'libra', 'cancer', 'pisces'],
    open: { set: 'porch', o: { col: '#e8a0a0' }, front: (x, t) => dog(x, 860, Y + 120, t), mood: 'happy' },
    beats: [
      B(3.0, 'bedroom', '7:40 AM · THE HEIGHTS', "you wake up. | it's already 84°.", [[0.6, 2.0, 'you', 'five more | minutes.']], { mood: 'sleepy', you: [400, Y - 40, 260] }),
      B(3.3, 'truck', '8:15 AM · TACO TRUCK', 'first big decision | of the day:', [[0.4, 1.3, 'virgo', 'corn is the | real one.'], [1.9, 1.3, 'you', 'flour. | always flour.']],
        { o: { sky: SKIES.morning }, cast: { virgo: [[0, 790, Y, 210]] }, moods: { virgo: 'squint' }, front: (x, t, lt, P) => holding(x, P, 'taurus', (a, b) => taco(x, a, b, 0.9)) }),
      B(3.0, 'porch', '9:00 AM · YOUR PORCH', 'you + the dog + the porch.', [[0.5, 2.2, 'you', 'this is | my whole plan.']], { o: { col: '#e8a0a0' }, front: (x, t) => dog(x, 800, Y + 120, t), mood: 'heart' }),
      B(3.2, 'brunch', '11:30 AM · MIDTOWN', 'the brunch wait is 90 minutes. | you stay.', [[0.5, 2.3, 'you', "I'd wait | three hours."]], { mood: 'sparkle' }),
      B(3.6, 'brunch', '12:45 PM · STILL BRUNCH', 'your date wants a bite.', [[0.3, 1.2, 'libra', 'can I try | yours?'], [1.6, 1.0, 'you', '...'], [2.5, 1.0, 'you', 'okay. | ONE bite.']],
        { o: { wait: '0 MIN' }, cast: { libra: [[0, 780, Y, 220]] }, moods: { libra: 'sparkle' }, mood: (lt => lt < 2.4 ? 'squint' : 'heart'), front: (x, t, lt, P) => holding(x, P, 'taurus', (a, b) => queso(x, a, b + 10, 0.8)) }),
      B(3.0, 'parking', '2:00 PM · PARKING LOT', 'you find the only shade | in the whole lot.', [[0.5, 2.2, 'you', 'that tree | is mine now.']], { you: [230, Y, 260], mood: 'wink' }),
      B(3.0, 'bedroom', '3:00 PM · NAP', 'the humidity wins. | you nap. no regrets.', [[0.8, 1.8, 'you', 'zzz.']], { mood: 'sleepy', o: { ac: true, sky: SKIES.noon } }),
      B(3.3, 'truck', '8:00 PM · SAME TRUCK', 'your date texts: | "tacos again?"', [[0.4, 1.1, 'libra', 'tacos | again?'], [1.7, 1.4, 'you', 'tacos. | forever.']],
        { cast: { libra: [[0, 790, Y, 210]] }, moods: { libra: 'wide' }, mood: 'heart' }),
      B(3.2, 'porch', '10:00 PM · THE PORCH', "you never leave the Heights. | and that's okay.", [[0.6, 2.2, 'you', 'why leave? | it has tacos.']], { o: { col: '#e8a0a0', sky: SKIES.dusk }, front: (x, t) => dog(x, 800, Y + 120, t) }),
      B(3.4, 'party', 'JAN 9', 'but for this one? | you leave the Heights.', [[0.5, 2.6, 'you', "I'm bringing | the snacks."]], { you: [540, Y, 300], mood: 'sparkle', noTag: false }),
    ],
  }),
  ...W06B,
  ...W06C,
}
