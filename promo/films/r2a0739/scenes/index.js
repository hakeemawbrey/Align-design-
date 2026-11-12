// r2a0739: star_advice, ADVICE SOLO (cancer), "What a Cancer | won't say out loud." (signs3kit social cut, lofi · E). Ending: callback.
// Nine things a Cancer means but won't say, each translated warmly with one light gag:
//   "go have fun!" = invite me too · "lol" = I miss you · baked cookies = I'm sorry · "come over" = I built a fort
//   · kept your sticky note for three years · caring for everyone (your turn to rest) · moody today (the moon's full, be gentle)
//   · remembers your order from one mention · a "you okay?" text makes their week
//   group "Big heart. | Quiet voice."  callback: "The fort has | room for two." (the blanket fort, back with its lights on)
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, fort, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', S = 'cancer', ST = { x: -190 }

const CAMEOS = [
  { sign: S, cap: '"Go have fun!" means | *"Invite me too."*', mood: lt => lt > 1.2 ? 'neutral' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 740, 'go have fun!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 800, 960, '(INVITE ME??)', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, 0.04, 36)
    } },
  { sign: S, cap: '"lol" means | *"I miss you."*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'YOU', headCol: SKYB, lines: [['lol', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2), true]], size: 30 })
      L(x, 800, 1120, 'TRANSLATION: MISS YOU', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: S, cap: 'Baked you cookies? | *That\'s "I\'m sorry."*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'COOKIE', 720 + i * 80, 940 - (i % 2) * 40, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      L(x, 800, 740, 'A DOZEN. STILL WARM.', pop01(t, P.t0 + 0.9, 0.3, 2.2), GOLD, -0.04, 28)
      L(x, 800, 1110, 'APOLOGY: ACCEPTED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: '"Come over" means | *"I built a fort."*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      fort(x, t, 775, 940, pop01(t, P.t0 + 0.3, 0.35, 2), 22)
      L(x, 800, 660, 'FORT: READY', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: S, cap: 'Kept your sticky note. | *From three years ago.*', mood: 'heart', star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 250, h: 230, bg: '#ffe76a', rot: 0.06, lines: ['see you', 'at 8 :)'], size: 40 })
      L(x, 800, 1100, 'FILED: FOREVER', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: S, cap: 'Caring for everyone? | *They need care too.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      const IDS = ['aries', 'leo', 'virgo', 'libra']
      IDS.forEach((id, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); if (k > 0.01) drawFriend(x, t, id, 690 + (i % 2) * 200, 820 + Math.floor(i / 2) * 170, k) })
      swapLabel(x, 800, 1130, lt, 1.3, 'CARETAKER: TIRED', 'YOUR TURN: REST', { size: 30, fromBg: STEEL, toBg: MINT })
    } },
  { sign: S, cap: 'Moody today? | *Be gentle. Moon\'s full.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 800, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 820, 800, P.t0 + 0.6, 6, 160, 0.3, [BONE, SKYB, GOLD])
      L(x, 800, 1060, 'FEELINGS: TIDAL', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, 0.04, 32)
    } },
  { sign: S, cap: 'Remembered your order. | *From one mention.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'OAT MILK, EXTRA HOT', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 28)
      bubble(x, 800, 1110, 'you said it once', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: S, cap: 'A "you okay?" text | *makes their week.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'FRIEND', headCol: MINT, lines: [['you okay?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2)]], size: 26 })
      hearts(x, t, 800, 900, P.t0 + 1.3, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
      L(x, 800, 1120, 'WEEK: MADE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 34)
    } },
]
import { signChar } from '../../signs3kit.js'
function drawFriend(x, t, id, cx, cy, k) { signChar(x, t, id, cx, cy, 130 * k, { mood: 'happy', seed: 30 + cx % 7, glyph: false }) }

const F = makeFilm({
  id: 'r2a0739', key: 'E', accent: ACC, solo: S, ending: 'callback',
  title: 'What a Cancer | won\'t say *out loud.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Quiet voice.*', mood: 'heart' },
  last: {
    text: 'The fort has | *room for two.*',
    draw(x, t, lt) {
      fort(x, t, 540, 1080, pop01(t, t - lt + 0.5, 0.4, 2), 44)
      hearts(x, t, 540, 860, t - lt + 1.4, { n: 6, life: 2.0, spread: 360, cell: 8, seed: 8 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
