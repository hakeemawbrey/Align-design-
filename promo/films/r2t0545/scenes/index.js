// r2t0545: star_talk, BELIKE, "No hot water left? | Zodiacs be like." (topic: "Zodiacs when the hot water runs out | be like.",
// shortened so the hook fits on two lines). Twelve signs in zodiac order. Ending: callback (Taurus and the four towels).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { B, C, L, sheet, phone, confetti, friend, bits, steam, swapLabel, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }

/** a shower head pouring icy drops over (cx, top..bottom) */
function coldShower(x, t, cx, top, bottom, k) {
  if (k <= 0.01) return
  bits(x, 'SHOWER', cx + 50, top, 22 * k)
  x.save(); x.globalAlpha *= clamp(k)
  for (let i = 0; i < 22; i++) {
    const ph = ((t * 1.6 + i / 22 * 3) % 1 + 1) % 1
    const dx = ((i * 37) % 9 - 4) * 20
    x.fillStyle = INK; x.fillRect(cx + dx - 3, top + 60 + ph * (bottom - top - 60) - 3, 18, 30)
    x.fillStyle = SKYB; x.fillRect(cx + dx, top + 60 + ph * (bottom - top - 60), 12, 24)
  }
  x.restore()
}
/** a stack of folded towels */
function towels(x, cx, base, k, n = 4) {
  if (k <= 0.01) return
  const cols = [PINK, MINT, GOLD, SKYB, LAV]
  for (let i = 0; i < n; i++) {
    const kk = clamp(k * n - i); if (kk <= 0) continue
    x.save(); x.translate(cx, base - i * 52); x.scale(kk, kk)
    x.fillStyle = INK; x.fillRect(-116, -26, 232, 52); x.fillStyle = cols[i % 5]; x.fillRect(-110, -20, 220, 40)
    x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-110, -20, 220, 8)
    x.restore()
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Fought the shower. | *Lost.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, -1], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      coldShower(x, t, 790, 640, 1080, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1120, 'FIGHT ME!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Four towels. | *Refused to move.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      towels(x, 790, 1060, pop01(t, P.t0 + 0.3, 0.8, 1.6))
      L(x, 790, 700, 'TOWELS: ALL OF THEM', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Narrated it live | *to the group chat.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'LIVE UPDATE', headCol: SKYB, lines: [['it’s cold', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2), true], ['COLDER', SKYB, pop01(t, P.t0 + 1.0, 0.25, 2.2), true], ['send help', PINK, pop01(t, P.t0 + 1.5, 0.25, 2.2), true]] })
    } },
  { sign: 'cancer', cap: 'Boiled kettles. | *For the whole house.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'KETTLE', 700, 960, 14 * k); bits(x, 'KETTLE', 860, 960, 14 * pop01(t, P.t0 + 0.5, 0.3, 2))
      if (k > 0.9) { steam(x, t, 700, 880); steam(x, t, 860, 880) }
      L(x, 790, 680, 'KETTLE #9', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 36)
    } },
  { sign: 'leo', cap: 'Screamed so loud | the *neighbours clapped.*', mood: lt => lt < 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'AAAAH!', pop01(t, P.t0 + 0.3, 0.25, 2.6), { size: 72, col: BONE, tail: 'bl' })
      L(x, 790, 980, 'ENCORE!', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 44)
      sparkles(x, t, 790, 980, P.t0 + 1.4, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Made a shower rota. | *Colour-coded.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      sheet(x, 790, 840, k, { w: 300, h: 360, head: 'SHOWER ROTA', headBg: MINT, headInk: INK, lines: [] })
      if (k > 0.9) { const cols = [PINK, GOLD, SKYB, LAV, MINT]; for (let i = 0; i < 5; i++) { if (lt < 0.5 + i * 0.2) continue; x.fillStyle = INK; x.fillRect(660, 770 + i * 46, 260, 34); x.fillStyle = cols[i]; x.fillRect(664, 774 + i * 46, 252, 26) } }
      L(x, 790, 1090, 'SLOTS: 4 MINUTES', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: 'libra', cap: 'Cold now or later? | *Couldn’t choose.*', mood: lt => lt > 1.6 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const a = Math.floor(lt * 2.5) % 2
      L(x, 700, 760, 'NOW', pop01(t, P.t0 + 0.3, 0.3, 2) * (a ? 1.15 : 0.9), SKYB, -0.06, 44)
      L(x, 880, 900, 'LATER', pop01(t, P.t0 + 0.5, 0.3, 2) * (a ? 0.9 : 1.15), PINK, 0.06, 44)
      L(x, 790, 1100, 'STILL IN A ROBE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Knew who did it. | *Said nothing.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, B.LENS, { ...C.LENS, K: STEEL }, 790, 800, 30 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.1 })
      L(x, 790, 1040, 'SUSPECT: TAURUS', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Showered in the lake. | *Loved it.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.fillStyle = INK; x.fillRect(196, 1000, 688, 200); x.fillStyle = '#3a7fc9'; x.fillRect(200, 1006, 680, 190)
      x.fillStyle = SKYB; for (let i = 0; i < 6; i++) x.fillRect(240 + i * 110 + Math.sin(t * 2 + i) * 14, 1030 + (i % 2) * 40, 60, 8)
      x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'FISH', 800 + 40 * Math.sin(t * 2), 1110, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 700, 'FREEZING! | AMAZING!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: GOLD, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Fixed the boiler | *before breakfast.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'WRENCH', 790, 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 + 0.3 * Math.sin(t * 6) * clamp(lt) })
      if (lt > 0.4) swapLabel(x, 790, 1040, lt, 1.3, 'HOT WATER: 0', 'HOT WATER: BACK', { size: 32, fromBg: SKYB, toBg: '#ffb34a' })
    } },
  { sign: 'aquarius', cap: 'Cold shower? | *“It’s a wellness thing.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      coldShower(x, t, 790, 640, 1000, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1100, 'TRENDSETTER', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 36)
    } },
  { sign: 'pisces', cap: 'Cold water, | *warm tears.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      coldShower(x, t, 790, 640, 1060, pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 1110, 'BALANCED IT OUT', pop01(t, P.t0 + 1.2, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0545', key: 'F', accent: ACC, ending: 'callback',
  title: 'No hot water left? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone’s cold. | *Nobody’s calm.*' },
  last: {
    text: 'Who used it all? | *Taurus. Obviously.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1080, 250 * k, { mood: lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], seed: 9 })
      towels(x, 740, 1170, pop01(t, t0 + 0.5, 0.8, 1.6))
      L(x, 740, 1290, 'CASE CLOSED', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 32)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
