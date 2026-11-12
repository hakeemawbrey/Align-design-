// r2t0594: star_talk, BELIKE, "Loud party? | Zodiacs *be like.*" (topic: zodiacs when the party's too loud; signs3kit
// social cut, music: lofi · D). Twelve signs in zodiac order:
//   ♈ too loud? made it louder · ♉ found the quiet room and the snacks · ♊ can't hear a thing, still talking
//   · ♋ left early, made soup at home · ♌ became the DJ, nobody asked · ♍ measured the noise, filed a report
//   · ♎ stuck in the doorway, hour two · ♏ found the darkest corner, guessed everyone's sign · ♐ left, found a better
//   party · ♑ brought earplugs and a bedtime · ♒ built a noise-cancelling hat · ♓ song came on, wept on the dance floor.
// Ending: callback. group "Nobody heard | *a single word.*", then "Cancer made soup. | *For everyone.*"
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, bits, steam, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ff8fb1', ST = { x: -170 }

// a pixel speaker that thumps
function speaker(x, t, cx, cy, k, boom = 1) {
  if (k <= 0.01) return
  const s = 1 + 0.06 * boom * Math.max(0, Math.sin(t * 14))
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-90, -130, 180, 260)
  x.fillStyle = '#2a2350'; x.fillRect(-80, -120, 160, 240)
  for (const [y, r] of [[-60, 34], [40, 52]]) { x.fillStyle = INK; x.beginPath(); x.arc(0, y, r + 6, 0, 7); x.fill(); x.fillStyle = STEEL; x.beginPath(); x.arc(0, y, r, 0, 7); x.fill(); x.fillStyle = INK; x.beginPath(); x.arc(0, y, r * 0.35, 0, 7); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Too loud? | Made it *louder.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      speaker(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1 ? 2 : 1)
      L(x, 800, 650, lt > 1.0 ? 'VOL: 11' : 'VOL: 10', pop01(t, P.t0 + 0.4, 0.3, 2.2), lt > 1 ? RED : GOLD, 0.05, 44)
      notes(x, t, 620, 820, { n: 4, cell: 8, col: RED, seed: 1 })
    } },
  { sign: 'taurus', cap: 'Found the quiet room. | And *the snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'PIZZA', 760, 860, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.2 })
      bits(x, 'COOKIE', 900, 960, 14 * pop01(t, P.t0 + 0.7, 0.3, 2))
      L(x, 800, 660, 'QUIET ROOM', pop01(t, P.t0 + 0.2, 0.3, 2.2), MINT, 0.04, 38)
      L(x, 800, 1090, 'POPULATION: 1', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Can’t hear a thing. | Still *talking.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, '…AND THEN!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      bubble(x, 800, 930, 'WHAT?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      L(x, 800, 1090, 'KEPT GOING', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Left early. | *Made soup* at home.', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'BOWL', 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      steam(x, t, 800, 820, { n: 3, h: 140 })
      L(x, 800, 1070, 'PARTY OF ONE ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Became the DJ. | *Nobody asked.*', mood: 'sparkle', star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      speaker(x, t, 820, 880, 0.8 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'DJ LEO ✦', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, 0.05, 44)
      L(x, 800, 1100, 'REQUESTS: LEOS ONLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 28)
      notes(x, t, 600, 780, { n: 4, cell: 7, col: GOLD, seed: 3 })
    } },
  { sign: 'virgo', cap: 'Measured the noise. | Filed *a report.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 310, h: 300, head: 'NOISE REPORT', headBg: STEEL, headInk: INK, lines: ['bass: rude', 'volume: no', 'grade: D'], size: 32, align: 'left', progress: clamp((lt - 0.3) / 1.0) })
      L(x, 800, 1070, 'COPIES: 3', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Stuck in the doorway. | *Hour two.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 800, 760, Math.floor(lt * 2.5) % 2 ? 'STAY?' : 'GO?', 1, Math.floor(lt * 2.5) % 2 ? MINT : RED, 0.04, 56)
      bits(x, 'CLOCK', 800, 930, 13 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 1090, '2 HRS LATER', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Found the darkest corner. | Guessed *everyone’s sign.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'you’re a Virgo.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      bubble(x, 800, 900, 'Gemini. obviously.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 800, 1080, '12 FOR 12', pop01(t, P.t0 + 1.6, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: 'sagittarius', cap: 'Left the party. | Found *a better one.*', mood: 'sparkle', star: { x: 170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      L(x, 330, 720, 'PARTY #1: BYE', pop01(t, P.t0 + 0.3, 0.3, 2.2), STEEL, 0.04, 30)
      L(x, 330, 880, 'PARTY #2', pop01(t, P.t0 + 1.0, 0.3, 2.3), MINT, -0.04, 48)
      sparkles(x, t, 330, 880, P.t0 + 1.05, 8, 160, 0.3)
      L(x, 330, 1040, 'ON A BOAT', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Brought earplugs. | And *a bedtime.*', mood: lt => lt < 1.2 ? 'neutral' : 'sleepy', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      L(x, 330, 760, 'EARPLUGS: IN', pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, 0.04, 34)
      bits(x, 'CLOCK', 330, 920, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 330, 1080, 'LEAVING: 9:30', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Built a | *noise-cancelling hat.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P, F) {
      const drop = ease.outCubic(prog(lt, 0.4, 0.9))
      bits(x, 'GADGET', F.x, lerp(500, F.top - 60, drop), 22)
      L(x, 800, 820, 'BASS: BLOCKED', pop01(t, P.t0 + 1.0, 0.3, 2.3), SKYB, 0.04, 34)
      L(x, 800, 980, 'PATENT: PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Their song came on. | *Wept* on the dance floor.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: ST, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      notes(x, t, 800, 900, { n: 5, cell: 8, col: SKYB, seed: 5 })
      bubble(x, 800, 700, 'THIS SONG!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      L(x, 800, 1060, 'TEARS: ON BEAT', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2t0594', key: 'D', accent: ACC, ending: 'callback',
  title: 'Loud party? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody heard | *a single word.*' },
  last: {
    text: 'Cancer made soup. | *For everyone.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 380, 1100, 280 * k, { mood: lt > 1.3 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      for (let i = 0; i < 3; i++) bits(x, 'BOWL', 680 + i * 120, 1120 + (i % 2) * 30, 11 * pop01(t, t0 + 0.5 + i * 0.25, 0.3, 2))
      steam(x, t, 800, 1060, { n: 3, h: 120 })
      L(x, 800, 1290, 'TWELVE BOWLS', pop01(t, t0 + 1.4, 0.3, 2.4), PINK, -0.04, 36)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
