// r2t0388: star_talk, ROLLCALL (twelve signs), "The signs | on a long flight." (signs3kit social cut, music: lofi · G).
// Ending: callback (Libra lands, still deciding window or aisle).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, steam, zzz, confetti, friend, bits, RED, CREAM, STEEL, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -180 }
const flip = (lt, r = 3) => Math.floor(lt * r) % 2

const CAMEOS = [
  { sign: 'aries', cap: 'Boarded first. | Asked to *fly it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.3, 0.6],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can i | drive?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 790, 960, 'PILOT: NO.', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 40)
    } },
  { sign: 'taurus', cap: 'Carry-on bag? | *Just snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 790, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const food = ['PIZZA', 'COOKIE', 'APPLE', 'SANDWICH']
      food.forEach((f, i) => { const k = pop01(t, P.t0 + 0.7 + i * 0.2, 0.3, 2.2); if (k > 0.01) bits(x, f, 690 + i * 70, 760 - (i % 2) * 50, 9 * k, { rot: (i - 1.5) * 0.2 }) })
      L(x, 790, 1130, 'CLOTHES PACKED: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Swapped birth charts | with *the whole row.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) friend(x, t, ['libra', 'leo', 'scorpio'][i], 700 + i * 110, 900, 140, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2), { mood: i === 2 ? 'squint' : 'happy', look: [-1, 0], seed: 40 + i })
      L(x, 800, 730, 'ROW 14 GROUP CHAT', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 28)
      bubble(x, 420, 590, 'you’re a leo?!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Rebuilt their bedroom | in *seat 22B.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'PILLOW', F.x, F.top - 20, 12 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'BLANKET', F.x, F.cy + 80, 18 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bits(x, 'LAMP', 790, 840, 14 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 1060, 'HOME, AT 30,000 FT', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 28)
      if (lt > 1.2) zzz(x, t, F.x + 90, F.top - 60)
    } },
  { sign: 'leo', cap: 'Treated the aisle | like *a runway.*', mood: lt => flip(lt, 2) ? 'wink' : 'sparkle', star: { x: 0, y: -20, s: 260 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      x.save(); x.fillStyle = 'rgba(255,241,200,0.12)'; x.beginPath(); x.moveTo(480, 470); x.lineTo(600, 470); x.lineTo(760, 1180); x.lineTo(320, 1180); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      sparkles(x, t, 540, 860, P.t0 + 0.6, 7, 200, 0.2); sparkles(x, t, 540, 860, P.t0 + 1.5, 7, 220, 0.9)
      L(x, 800, 1130, 'SEATBELT SIGN: ON', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, 0.04, 28)
      bubble(x, 800, 620, 'snap. snap.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Wiped down the seat. | And *the whole row.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      bits(x, 'SPRAY', F.x + 150, F.cy, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      for (let i = 0; i < 3; i++) sparkles(x, t, 700 + i * 110, 900, P.t0 + 0.7 + i * 0.35, 5, 60, i)
      L(x, 800, 760, `ROWS CLEANED: ${1 + Math.floor(clamp((lt - 0.5) / 1.4) * 33)}`, pop01(t, P.t0 + 0.5, 0.3, 2), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Window or aisle? | Still *deciding* at landing.', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: lt => flip(lt, 3) ? [1, 0] : [-1, 0], star: { x: 0, y: 20, s: 260 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const f = flip(lt, 3)
      L(x, 300, 700, 'WINDOW?', pop01(t, P.t0 + 0.3, 0.3, 2) * (f ? 0.8 : 1.1), SKYB, -0.06, 36)
      L(x, 790, 700, 'AISLE?', pop01(t, P.t0 + 0.5, 0.3, 2) * (f ? 1.1 : 0.8), PINK, 0.06, 36)
      L(x, 540, 1140, 'NOW LANDING', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.03, 30)
    } },
  { sign: 'scorpio', cap: 'Hood up. Shades on. | *Ten hours.* Not a word.', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x + 4, F.top + 64, 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      friend(x, t, 'gemini', 790, 930, 190, pop01(t, P.t0 + 0.6, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 15 })
      bubble(x, 800, 680, 'so what’s your | sign?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 790, 1120, '…', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 44)
    } },
  { sign: 'sagittarius', cap: 'Landed. | Booked *another flight.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      bits(x, 'MAP', 790, 840, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bits(x, 'PLANE', 790 + Math.cos(lt * 2) * 140, 820 + Math.sin(lt * 2) * 60, 10 * pop01(t, P.t0 + 0.5, 0.3, 2), { rot: lt * 2 + Math.PI })
      L(x, 790, 1060, 'NEXT GATE: 9', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 34)
    } },
  { sign: 'capricorn', cap: 'Worked the whole flight. | Got *promoted* mid-air.', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      bits(x, 'LAPTOP', 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 840, 'SLIDE 88/90', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, -0.03, 26)
      L(x, 790, 1060, 'NEW TITLE: VP', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 34)
      confetti(x, t, 790, 760, P.t0 + 1.5, { n: 14, spread: 200 })
    } },
  { sign: 'aquarius', cap: 'Read the safety card. | *For fun.* Twice.', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      sheet(x, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 380, rot: 0.04, head: 'SAFETY', headBg: '#ffb34a', headInk: INK, lines: ['1. stay calm', '2. mask on', '3. ????', ['notes: GENIUS', '#3a7bd5']], size: 28, align: 'left', progress: (lt - 0.4) / 1.0 })
      bubble(x, 420, 600, 'page two!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'One sad in-flight movie. | *Flooded* the cabin.', mood: 'sparkle', tears: 3, look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'TV', 800, 780, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const lvl = clamp((lt - 0.6) / 1.6)
      if (lvl > 0) { x.save(); x.globalAlpha = 0.35; x.fillStyle = SKYB; x.fillRect(100, 1240 - lvl * 160, 880, lvl * 160); x.restore() }
      L(x, 800, 1010, 'FLOAT CUSHION: OUT', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 28)
    } },
]

const F = makeFilm({
  id: 'r2t0388', key: 'G', accent: ACC, ending: 'callback',
  title: 'The signs on | *a long flight.*',
  cameos: CAMEOS,
  group: { cap: 'Ten hours. | *Twelve moods.*', moods: ['wide', 'heart', 'happy', 'sleepy', 'wink', 'squint', 'wide', 'neutral', 'sparkle', 'neutral', 'sparkle', 'sparkle'] },
  last: {
    text: 'Libra landed. | Still *deciding.*',
    draw(x, t, lt) {
      const t0 = t - lt, f = flip(lt, 2.5)
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 540, 1080, 300 * k, { mood: 'wide', look: f ? [1, 0] : [-1, 0], seed: 7, hops: [t0 + 1.4, t0 + 2.4] })
      L(x, 280, 900, 'WINDOW?', pop01(t, t0 + 0.6, 0.3, 2) * (f ? 0.8 : 1.1), SKYB, -0.06, 34)
      L(x, 800, 900, 'AISLE?', pop01(t, t0 + 0.8, 0.3, 2) * (f ? 1.1 : 0.8), PINK, 0.06, 34)
      L(x, 540, 1300, 'FLIGHT CREW: WAITING', pop01(t, t0 + 1.6, 0.3, 2.4), GOLD, -0.03, 28)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
