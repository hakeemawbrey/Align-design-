// r2a0250: star_advice, ADVICE ROLLCALL, "Each sign | remembers you." (batch topic: "What each sign remembers about you.") (~57 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "Each sign | *remembers you.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one warm, specific memory per sign (3.8 s each), each with a light visual gag:
//              ♈ the day you cheered them on · ♉ your exact coffee order · ♊ every inside joke · ♋ your mom's birthday
//              · ♌ how hard you laughed at their joke · ♍ your allergies, all of them · ♎ what you wore when you met
//              · ♏ the thing you told them at 2 a.m. (kept safe) · ♐ the trip you mentioned once (booked)
//              · ♑ your goal, and they check in on it · ♒ your weirdest fun fact · ♓ how you made them feel
//  49.2        "You’re not forgettable. | *Not even close.*"
//  52.6        callback: "Taurus brought | *your coffee.*"  Card two's cup comes back, order exactly right.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, confetti, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const ACC = PINK
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const MEGA = ['......KK', '....KKRK', '..KKRRRK', 'KKRRRRRK', 'KWRRRRRK', 'KKRRRRRK', '..KKRRRK', '....KKRK', '......KK']
const CUP = ['.LLLLLLLL.', 'LLLLLLLLLL', '.WWWWWWWW.', '.WWBBBBWW.', '.WWBBBBWW.', '..WWWWWW..', '..WWWWWW..', '...WWWW...']
const CUP_C = { L: '#ffffff', W: CREAM, B: '#8a4a2e' }
const CAKE = ['..Y..Y..Y..', '..W..W..W..', 'PPPPPPPPPPP', 'PWPWPWPWPWP', 'CCCCCCCCCCC', 'CCCCCCCCCCC', 'PPPPPPPPPPP']
const CAKE_C = { Y: SUN, W: CREAM, P: PINK, C: '#fff1e0' }
const SHIRT = ['.YYY..YYY.', 'YYYYYYYYYY', 'YYYYYYYYYY', '.YYYSSYYY.', '..YYSSYY..', '..YYYYYY..', '..YYYYYY..', '..YYYYYY..']
const DIARY = ['KKKKKKKKKK', 'KLLLLLLLGK', 'KLLHHLLLGK', 'KLHHHHLLGK', 'KLLHHLLLGK', 'KLLLLLLLGK', 'KLLLLLLLGK', 'KKKKKKKKKK']
const DIARY_C = { K: INK, L: LAV, H: PINK, G: GOLD }
const TICKET = ['YYYYYYYYYYYY', 'Y..........Y', 'Y.KK..KKKK.Y', 'Y..........Y', 'YYYYYYYYYYYY']

const CAMEOS = [
  { sign: 'aries', cap: 'The day you | *cheered them on.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [0.8, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, R: RED, W: SUN }, 860, 900, 18 * pop01(t, P.t0 + 0.15, 0.3, 2), { sx: -1 })
      bubble(x, 760, 700, 'GO ARIES!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 44, col: SUN, tail: 'br' })
      lab(x, 790, 1100, 'REPLAYED: DAILY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Your exact | *coffee order.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.35, 2))
      card(x, 790, 700, 300, 120, pop01(t, P.t0 + 0.7, 0.3, 2.2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'oat milk,', 0, -20, { size: 30 }); txt(x, 'extra hot', 0, 22, { size: 30 }) })
      lab(x, 790, 1110, 'MEMORISED. FOREVER.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: GOLD, rot: -0.04, size: 30 })
    } },
  { sign: 'gemini', cap: 'Every inside joke. | *Every single one.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const J = [['the duck!', 700, 680, PINK], ['“no, YOU”', 860, 820, SKYB], ['the bus thing', 720, 960, MINT], ['ha. lamp.', 860, 1100, SUN]]
      J.forEach(([s, px, py, c], i) => bubble(x, px, py, s, pop01(t, P.t0 + 0.2 + i * 0.35, 0.25, 2.2), { size: 32, col: c, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Your mom’s | *birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 660, 'CARD: ALREADY SENT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: PINK, rot: 0.04, size: 30 })
      hearts(x, t, 920, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 80, cell: 7, seed: 2 })
      bubble(x, 790, 1100, 'tell her hi!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'How hard you laughed | at *their joke.*', mood: 'sparkle', star: { x: -150 }, hops: [1.0],
    front(x, t, lt, P) {
      const lv = ease.outCubic(prog(lt, 0.4, 1.2))
      card(x, 790, 860, 140, 360, pop01(t, P.t0 + 0.15, 0.3, 2), { bg: '#1b1236', rot: 0 }, () => {
        for (let i = 0; i < 8; i++) { const on = i < Math.round(lv * 8); x.fillStyle = on ? [MINT, MINT, SUN, SUN, ORANGE, ORANGE, RED, RED][i] : '#2a2350'; x.fillRect(-46, 140 - i * 40, 92, 30) }
      })
      lab(x, 790, 640, 'LAUGH-O-METER', pop01(t, P.t0 + 0.3, 0.3, 2.2), { bg: ORANGE, rot: -0.04 })
      lab(x, 790, 1100, 'SAVED TO: HEART', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: GOLD, rot: 0.04 })
    } },
  { sign: 'virgo', cap: 'Your allergies. | *All of them.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 360, pop01(t, P.t0 + 0.15, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'YOU: AVOID', 0, -140, { size: 28, font: MONO, weight: 700 })
        const L = ['peanuts', 'kiwi', 'cats (sadly)', 'cilantro?']
        L.forEach((s, i) => { if (lt > 0.4 + i * 0.3) { txt(x, s, -120, -70 + i * 60, { size: 30, align: 'left' }); x.fillStyle = RED; x.fillRect(-130, -72 + i * 60, 250, 5) } })
      })
      lab(x, 790, 1110, 'SNACKS: SAFE', pop01(t, P.t0 + 1.8, 0.3, 2.2), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'What you wore | when *you met.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHIRT, { Y: SUN, S: '#ffffff' }, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 680, 'THE YELLOW ONE', pop01(t, P.t0 + 0.8, 0.3, 2.2), { bg: PINK, rot: -0.04 })
      bubble(x, 790, 1100, 'iconic, honestly', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'What you told them | at *2 a.m.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      lab(x, 790, 680, 'LOCKED. SAFE.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { bg: LAV, rot: 0.04, size: 34 })
      bubble(x, 790, 1100, 'never telling.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'The trip you | *mentioned once.*', mood: 'sparkle', look: [-1, 0], star: { x: 160 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) drawBits(x, TICKET, { Y: GOLD, K: INK }, 320 + i * 30, 840 + i * 80, 22 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { rot: -0.1 + i * 0.12 })
      lab(x, 330, 1100, 'BOOKED. SURPRISE!', pop01(t, P.t0 + 1.3, 0.3, 2.4), { bg: SUN, rot: -0.04 })
      sparkles(x, t, 330, 880, P.t0 + 1.4, 6, 160, 0.3)
    } },
  { sign: 'capricorn', cap: 'Your big goal. | *They check in on it.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 260, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = MINT; x.fillRect(-170, -130, 340, 60); txt(x, 'REMINDER', 0, -100, { size: 28, font: MONO, weight: 700 })
        txt(x, 'ask about', 0, -20, { size: 32 }); txt(x, 'the marathon', 0, 24, { size: 32 })
        txt(x, 'every friday', 0, 80, { size: 24, font: MONO, weight: 700, color: GREY })
      })
      lab(x, 790, 1110, 'PROUD: QUIETLY', pop01(t, P.t0 + 1.5, 0.3, 2.2), { bg: GOLD, rot: 0.04 })
    } },
  { sign: 'aquarius', cap: 'Your weirdest fun fact. | *Their favourite.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      hearts(x, t, 790, 1000, P.t0 + 1.0, { n: 3, life: 1.4, spread: 160, cell: 9, seed: 6 })
      lab(x, 790, 1100, 'TOLD EVERYONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: MINT, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'How you made them | *feel.* Forever.', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 1.0 ? 2 : 1, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hearts(x, t, 790, 1050, P.t0 + 0.4, { n: 8, life: 2.4, spread: 260, cell: 9, seed: 4 })
      lab(x, 790, 700, 'FEELING: KEPT', pop01(t, P.t0 + 1.0, 0.3, 2.2), { bg: SKYB, rot: 0.04, size: 34 })
      bubble(x, 790, 1100, 'you were SO kind', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0250', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign | *remembers you.*',
  cameos: CAMEOS,
  group: { cap: 'You’re not forgettable. | *Not even close.*' },
  last: {
    text: 'Taurus brought | *your coffee.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const s = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'taurus', 390, 1140, 380 * s, { mood: 'heart', seed: 52, hops: [t0 + 1.6] })
      drawBits(x, CUP, CUP_C, 760, 1140, 28 * pop01(t, t0 + 0.9, 0.4, 2))
      card(x, 760, 900, 300, 120, pop01(t, t0 + 1.3, 0.3, 2.2), { bg: CREAM, rot: 0.04 }, () => { txt(x, 'oat milk,', 0, -20, { size: 30 }); txt(x, 'extra hot', 0, 22, { size: 30 }) })
      label(x, 560, 1420, 'ORDER: EXACTLY RIGHT', pop01(t, t0 + 1.8, 0.3, 2.4), { size: 36, font: MONO, weight: 700, bg: GOLD, rot: -0.03 })
      hearts(x, t, 560, 1100, t0 + 1.9, { n: 6, life: 2.0, spread: 500, cell: 8, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
