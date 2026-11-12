// r2a0247: star_advice, ADVICE SOLO, "How to check in | on an Aries." (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): warm, practical ways to look after the friend who
// always says they're fine.
//   0.0–3.6    "How to check in | *on an Aries.*"
//   3.6–37.8   nine cards (3.8 s each):
//              "I'm fine!" at full speed, ask twice · skip the speech, bring snacks · they open up on walks · let them
//              vent (the kettle whistles) · ask about their goals, bullseye · no pity, a high five · be direct · they
//              carry everyone, carry a box back · check in again tomorrow
//  37.8        "Fast. Fierce. | *Still needs a hug.*"
//  41.0        LESSON UNLOCKED: "Brave hearts need | *check-ins* too."  STATUS: CHECKED ON
//  46.9        "Aries is fine. | *Actually fine.*"
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, BROWN, GREY, DEEP, SUN, GREEN, clamp, ease, lerp, prog } from './props.js'

const S = 'aries'
const ST = { x: -190 }
const ACC = '#ff6b5a'
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const CHIPS = ['..KKKKKKKK..', '.KYYYYYYYYK.', 'KYYYYYYYYYYK', 'KYYRRRRRRYYK', 'KYYRWWWWRYYK', 'KYYRWRRWRYYK', 'KYYRRRRRRYYK', 'KYYYYYYYYYYK', 'KYYYYYYYYYYK', '.KKKKKKKKKK.']
const CHIPS_C = { K: INK, Y: SUN, R: RED, W: CREAM }
const SHOE = ['....RRRR....', '...RRWWRR...', '..RRRRRRRR..', 'RRRRRRRRRRR.', 'RRRRRRRRRRRR', 'WWWWWWWWWWWW']
const SHOE_C = { R: RED, W: CREAM }
const KETTLE = ['....KKK.....', '...KK.KK....', 'MMMMMMMMMM..', 'MMMMMMMMMMMS', 'MWMMMMMMMMS.', 'MMMMMMMMMM..', 'MMMMMMMMMM..', '.MMMMMMMM...', 'KKKKKKKKKK..']
const KETTLE_C = { K: INK, M: '#9aa5c4', W: '#ffffff', S: '#9aa5c4' }
const HAND = ['.F.F.F....', '.F.F.F.F..', '.F.F.F.F..', '.FFFFFFF..', 'FFFFFFFF..', 'FFFFFFFF..', '.FFFFFF...', '..FFFF....']
const BOXC = ['KKKKKKKK', 'KBBBBBBK', 'KBBTTBBK', 'KBBBBBBK', 'KKKKKKKK']
const BOXC_C = { K: BROWN, B: '#e8a24a', T: CREAM }

/** a dartboard with an arrow flying into the bullseye at p 0…1 */
function target(x, cx, cy, r, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const R = [[r + 8, INK], [r, RED], [r * 0.75, CREAM], [r * 0.5, RED], [r * 0.25, SUN]]
  for (const [rr, c] of R) { x.fillStyle = c; x.beginPath(); x.arc(0, 0, rr, 0, Math.PI * 2); x.fill() }
  const ax = lerp(-420, 0, ease.inQuad(p))
  if (p > 0) { x.fillStyle = INK; x.fillRect(ax - 150, -5, 150, 10); x.fillStyle = MINT; x.fillRect(ax - 160, -16, 26, 32); x.fillStyle = INK; x.beginPath(); x.moveTo(ax + 18, 0); x.lineTo(ax - 6, -14); x.lineTo(ax - 6, 14); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: '“I’m fine!” at full speed? | *Ask twice.*', mood: lt => lt > 1.5 ? 'neutral' : 'sparkle', look: [1, 0], star: ST, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      bubble(x, 790, 700, 'I’M FINE!!', pop01(t, P.t0 + 0.25, 0.25, 2.2) * (1 + 0.06 * Math.sin(t * 30) * (lt < 1.4 ? 1 : 0)), { size: 52, tail: 'bl' })
      for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.globalAlpha = 0.5; x.fillRect(F.x - 200 - i * 40, F.cy - 40 + i * 40, 90, 8) } x.globalAlpha = 1
      bubble(x, 790, 940, 'you sure?', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'br' })
      lab(x, 790, 1110, 'FINE: SUSPICIOUS', pop01(t, P.t0 + 1.8, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Skip the long speech. | *Bring snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 720, 300, 160, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - prog(lt, 0.9, 1.1)), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'A SPEECH', 0, -40, { size: 30, font: MONO, weight: 700 }); for (let i = 0; i < 3; i++) { x.fillStyle = GREY; x.fillRect(-110, -6 + i * 26, 220 - i * 40, 12) }
      })
      drawBits(x, CHIPS, CHIPS_C, 790, 900, 20 * pop01(t, P.t0 + 1.2, 0.35, 2.2))
      lab(x, 790, 1110, 'CHECK-IN: ACCEPTED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { bg: MINT, rot: 0.04, size: 30 })
    } },
  { sign: S, cap: 'Can’t sit still? | *They talk on walks.*', mood: lt => lt > 1.2 ? 'happy' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.1, 1.6, 2.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 2; i++) drawBits(x, SHOE, SHOE_C, 720 + i * 150, 1060 - (Math.floor(t * 4 + i) % 2) * 22, 13 * k)
      bubble(x, 790, 700, 'so anyway, | work’s been… a lot', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      lab(x, 790, 900, 'STEPS + FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: SKYB, rot: -0.04 })
    } },
  { sign: S, cap: 'Steaming quietly? | *Let them vent.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), hot = lt > 0.6 && lt < 1.6
      drawBits(x, KETTLE, KETTLE_C, 790 + (hot ? Math.sin(t * 40) * 4 : 0), 920, 22 * k)
      if (hot) for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; x.fillStyle = BONE; x.globalAlpha = 1 - ph; x.fillRect(910 + ph * 40, 860 - ph * 180 + Math.sin(ph * 9) * 12, 22, 22) }
      x.globalAlpha = 1
      bubble(x, 790, 700, 'WHEEEEE', hot ? pop01(t, P.t0 + 0.8, 0.2, 2.2) : 0, { size: 40, col: '#ffd0c8', tail: 'br' })
      lab(x, 790, 1120, 'VENTING: HEALTHY', pop01(t, P.t0 + 2.0, 0.3, 2.4), { bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Ask about their goals. | *Watch them light up.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      target(x, 800, 860, 140, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.6, 1.2))
      sparkles(x, t, 800, 860, P.t0 + 1.2 * 1.29 + 0.1, 8, 180, 0.3)
      lab(x, 800, 1080, 'BULLSEYE', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: GOLD, rot: -0.05, size: 38 })
    } },
  { sign: S, cap: 'They hate pity. | *Offer a high five.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const hit = ease.inOutCubic(prog(lt, 0.4, 1.0))
      drawBits(x, HAND, { F: '#ffd0a8' }, lerp(900, 640, hit), 820, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      sparkles(x, t, 640, 820, P.t0 + 1.0 * 1.29, 8, 120, 0.2)
      lab(x, 790, 1080, 'MORALE: RESTORED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: SUN, rot: 0.04 })
    } },
  { sign: S, cap: 'Hints don’t land. | *Just ask straight.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'are you okay? | honestly?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, col: MINT, tail: 'br' })
      bubble(x, 420, 640, 'honestly? | no. thanks.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bc' })
      lab(x, 790, 1000, 'DIRECT: RESPECTED', pop01(t, P.t0 + 1.8, 0.3, 2.2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'They carry everyone. | *Carry a box back.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const lift = ease.inOutCubic(prog(lt, 0.9, 1.5))
      for (let i = 0; i < 5; i++) {
        const top = i === 4
        drawBits(x, BOXC, BOXC_C, top ? lerp(F.x + 10, 800, lift) : F.x + 10 + (i % 2 ? 10 : -10), top ? lerp(F.top - 10 - i * 44, 820, lift) : F.top - 10 - i * 44, 13 * pop01(t, P.t0 + 0.15 + i * 0.08, 0.25, 2))
      }
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 960, 180 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      lab(x, 790, 1120, 'LOAD: SHARED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Good talk? | *Check in again tomorrow.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 320, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        x.fillStyle = RED; x.fillRect(-170, -160, 340, 60); txt(x, 'THIS WEEK', 0, -130, { size: 28, font: MONO, weight: 700, color: BONE })
        for (let i = 0; i < 7; i++) { const cx = -135 + (i % 4) * 90, cy = -50 + Math.floor(i / 4) * 100; x.fillStyle = '#e8dfcf'; x.fillRect(cx - 38, cy - 38, 76, 76) }
        const s = pop01(t, P.t0 + 1.2, 0.3, 2.4)
        if (s > 0.01) { x.save(); x.translate(-135 + 90, -50); x.scale(s, s); drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK }, 0, 0, 9); x.restore() }
      })
      lab(x, 790, 1100, 'TOMORROW: SAME TIME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { bg: MINT, rot: -0.04, size: 30 })
    } },
]

const F = makeFilm({
  id: 'r2a0247', key: 'F', accent: ACC, solo: S, ending: 'lesson',
  title: 'How to check in | *on an Aries.*',
  cameos: CAMEOS,
  group: { cap: 'Fast. Fierce. | *Still needs a hug.*', mood: 'heart' },
  lesson: { text: 'Brave hearts need | *check-ins* too.', chip: 'STATUS: CHECKED ON' },
  last: { text: 'Aries is fine. | *Actually fine.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
