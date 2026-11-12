// r2a0237: star_advice, ADVICE SOLO, "Capricorn, you're not | too much." (~42 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the serious, driven, plan-everything Capricorn, told
// warmly that all of it is welcome.
//   0.0–3.6    "Capricorn, you’re not | *too much.*"
//   3.6–37.8   nine cards (3.8 s each): you plan everything, that's care · high standards, bigger heart · quiet when busy,
//              friends get it · "too serious"? your laugh is gold · love shown as help counts · ambition is hope with a plan
//              · alone time is allowed · feelings allowed on weekdays · the right people want all of you
//  37.8        group ending: "Not too much. | *Just right.*"  Capricorn comes back, big.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, sheet, handset, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, WOOD } from './props.js'

const S = 'capricorn', ACC = '#7dffb0'
const ST = { x: -180 }
const LBL = { font: MONO, weight: 700 }
const FLAG = ['K.RRRR', 'K.RRRR', 'K.RRR.', 'K.....', 'K.....']

/** a week calendar strip: days Mon–Fri, with slots; fill(i) returns [text, colour] or null */
function week(x, cx, cy, k, fill) {
  card(x, cx, cy, 330, 320, k, { bg: CREAM, rot: 0.04 }, () => {
    x.fillStyle = RED; x.fillRect(-165, -160, 330, 56); txt(x, 'THIS WEEK', 0, -132, { size: 28, font: MONO, weight: 700, color: CREAM })
    ;['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((d, i) => {
      txt(x, d, -120, -70 + i * 50, { size: 22, font: MONO, weight: 700, align: 'left' })
      const f = fill(i)
      if (f) { x.fillStyle = f[1]; x.fillRect(-50, -90 + i * 50, 190, 40); txt(x, f[0], 45, -70 + i * 50, { size: 20, font: MONO, weight: 700 }) }
    })
  })
}

const CAMEOS = [
  { sign: S, cap: 'You plan everything. | *That’s care, not control.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, 280, 360, pop01(t, P.t0 + 0.2, 0.35, 2), 'TRIP PLAN v9', { rot: 0.04, size: 26 }, () => {
        ;['snacks: packed', 'maps: printed', 'plan B: yes', 'plan C: yes'].forEach((s, i) => txt(x, s, -115, -60 + i * 38, { size: 22, font: MONO, weight: 700, align: 'left' }))
      })
      bubble(x, 800, 610, 'you thought | of everything!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Your standards are high. | *So is your heart.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const BARS = ['#9aa5c4', '#6fc3ff', '#2fc79a', SUN]
      for (let i = 0; i < 4; i++) { const h = 80 + i * 80, g = ease.outCubic(prog(lt, 0.3 + i * 0.15, 0.7 + i * 0.15)); x.fillStyle = INK; x.fillRect(650 + i * 80 - 4, 1120 - h * g - 4, 64, h * g + 4); x.fillStyle = BARS[i]; x.fillRect(650 + i * 80, 1120 - h * g, 56, h * g) }
      hearts(x, t, 918, 760, P.t0 + 1.2, { n: 5, life: 1.8, spread: 80, cell: 9, seed: 4 })
      label(x, 760, 620, 'BAR: HIGH · HEART: HIGHER', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 26, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Quiet when you’re busy? | *Your people get it.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      handset(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        x.fillStyle = MINT; x.fillRect(-90, -120, 180, 54); txt(x, 'busy, ily', 0, -93, { size: 26 })
        if (lt > 1.0) { x.fillStyle = PINK; x.fillRect(-60, -40, 150, 54); txt(x, 'ily too ♥', 15, -13, { size: 24 }) }
        if (lt > 1.4) { x.fillStyle = GOLD; x.fillRect(-60, 30, 150, 54); txt(x, 'proud of u', 15, 57, { size: 24 }) }
      })
      label(x, 790, 1110, 'NO HARD FEELINGS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: '“Too serious”? | *Your laugh is gold.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'ha.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 90, col: GOLD, tail: 'bl' })
      label(x, 790, 1000, 'RARE LAUGH: UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, ...LBL })
      sparkles(x, t, 790, 760, P.t0 + 1.0, 8, 200, 0.2)
    } },
  { sign: S, cap: 'You love by helping. | *That counts.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, 290, 340, pop01(t, P.t0 + 0.2, 0.35, 2), 'YOUR MOVE: PLANNED', { rot: -0.04, size: 22 }, () => {
        ;['8:00 boxes', '9:00 van', '10:00 snacks', '12:00 done!'].forEach((s, i) => txt(x, s, -120, -60 + i * 38, { size: 22, font: MONO, weight: 700, align: 'left' }))
      })
      bubble(x, 800, 620, 'best friend ever', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, col: PINK, tail: 'bl' })
    } },
  { sign: S, cap: 'Ambition isn’t cold. | *It’s hope with a plan.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 5; i++) { x.fillStyle = INK; x.fillRect(620 + i * 70 - 4, 1120 - (i + 1) * 70 * k - 4, 68, (i + 1) * 70 * k + 4); x.fillStyle = i === 4 ? SUN : '#6b62a8'; x.fillRect(620 + i * 70, 1120 - (i + 1) * 70 * k, 60, (i + 1) * 70 * k) }
      drawBits(x, FLAG, { K: INK, R: RED }, 920, 730, 12 * ease.outBack(prog(lt, 1.0, 1.3)))
      label(x, 720, 640, 'NEXT STEP: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'Need alone time? | *That’s allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 860, 260, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: BROWN, rot: 0 }, () => {
        x.fillStyle = SUN; x.fillRect(90, 0, 18, 18)
        x.save(); x.rotate(0.05 * Math.sin(t * 2)); x.fillStyle = INK; x.fillRect(-104, -134, 208, 120); x.fillStyle = CREAM; x.fillRect(-98, -128, 196, 108)
        txt(x, 'RECHARGING', 0, -92, { size: 24, font: MONO, weight: 700 }); txt(x, 'back soon ♥', 0, -52, { size: 22, font: MONO, weight: 700, color: RED }); x.restore()
      })
      label(x, 800, 1110, 'DO NOT DISTURB (NICELY)', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.04, ...LBL })
    } },
  { sign: S, cap: 'Feelings are allowed. | *Even on weekdays.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      week(x, 800, 860, pop01(t, P.t0 + 0.2, 0.35, 2), i => i === 1 ? (lt > 0.9 ? ['FEELINGS ♥', PINK] : null) : ['work', '#9aa5c4'])
      label(x, 800, 1110, 'PENCILLED IN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, ...LBL })
    } },
  { sign: S, cap: 'The right people | *want all of you.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'taurus', 720, 990, 150 * k, { mood: 'heart', look: [-1, 0], seed: 31, glyph: false }); signChar(x, t, 'virgo', 880, 1010, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 32, glyph: false }) }
      bubble(x, 800, 740, 'yes, ALL of it', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
      hearts(x, t, 800, 880, P.t0 + 1.3, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0237', key: 'F', accent: ACC, solo: S, ending: 'group',
  title: 'Capricorn, you’re | not *too much.*',
  cameos: CAMEOS,
  group: { cap: 'Not too much. | *Just right.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
