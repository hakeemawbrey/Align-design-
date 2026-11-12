// r2t0163: THE SIGNS AS… v3, ROLLCALL, "The signs | at a parade." (~54 s vertical, signs3kit social cut, music: lofi · G)
//   0.0–3.6    "The signs | *at a parade.*"
//   3.6–49.2   ♈ joined the parade, now leading it · ♉ folding chair, front row since 5 a.m. · ♊ asked every float
//              "what's your sign?" · ♋ float: the family photo album · ♌ wasn't in the parade, became the parade
//              · ♍ picked up every piece of confetti · ♎ judged the floats, everyone won · ♏ sunglasses on, clapped
//              once, meant it · ♐ followed the parade to the next town · ♑ asked what the balloons cost · ♒ float:
//              a planet (theirs) · ♓ the first balloon, instant tears
//  49.2        group ending: "Nobody stayed | *in line.*"  confetti over the group photo.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, confetti, shades, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#ff8fb1'
const ST = { x: -170 }

const CHAIR = ['RRRRRRRRRR', 'RWRWRWRWRR', 'RRRRRRRRRR', 'K........K', 'KKKKKKKKKK', 'RRRRRRRRRR', 'K.K....K.K', 'K..K..K..K', 'K...KK...K', 'K..K..K..K']
const BROOM = ['....K', '...K.', '..K..', '.K...', 'YYY..', 'YYYY.', 'YYYYY']
const RIBBON = ['.GGGG.', 'GGYYGG', 'GYYYYG', 'GGYYGG', '.GGGG.', '.R..R.', 'RR..RR', 'R....R']

/** a parade float: a decorated cart on wheels; fn draws on its deck at (0, 0) */
function float(x, cx, cy, k, col, fn, { w = 320 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -6, w + 12, 92)
  x.fillStyle = col; x.fillRect(-w / 2, 0, w, 80)
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? GOLD : CREAM; x.beginPath(); x.moveTo(-w / 2 + i * w / 8, 80); x.lineTo(-w / 2 + (i + 1) * w / 8, 80); x.lineTo(-w / 2 + (i + 0.5) * w / 8, 112); x.fill() }
  for (const d of [-1, 1]) { x.fillStyle = INK; x.beginPath(); x.arc(d * (w / 2 - 50), 116, 30, 0, Math.PI * 2); x.fill(); x.fillStyle = GREY; x.beginPath(); x.arc(d * (w / 2 - 50), 116, 18, 0, Math.PI * 2); x.fill() }
  if (fn) fn()
  x.restore()
}
/** a balloon on a string */
function balloon(x, cx, cy, r, col, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, r); x.quadraticCurveTo(12, r + 60, -6, r + 130); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, r + 6, r * 1.15 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, r, r * 1.15, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.ellipse(-r * 0.35, -r * 0.4, r * 0.18, r * 0.3, -0.4, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Joined the parade. | *Now leading it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(F.x + 130, F.cy - 40); x.scale(k, k); x.fillStyle = INK; x.fillRect(-6, -160, 12, 260); x.fillStyle = RED; x.beginPath(); x.moveTo(6, -160); x.lineTo(130, -120 + 8 * Math.sin(t * 8)); x.lineTo(6, -80); x.fill(); x.restore() }
      for (let i = 0; i < 3; i++) if (lt > 0.9 + i * 0.25) signChar(x, t, ['taurus', 'leo', 'virgo'][i], 700 + i * 110, 1020, 110, { mood: 'wide', look: [-1, 0], seed: 30 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.3] })
      label(x, 790, 720, 'NEW LEADER', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Folding chair. | *Front row since 5 a.m.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -170, y: -10 },
    back(x, t, lt, P) { drawBits(x, CHAIR, { R: '#5fd068', W: CREAM, K: INK }, 370, 1050, 18 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 760, 'SEAT SAVED: 5:00', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'PARADE STARTS: 2:00', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1060, 'worth it.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 44, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Asked every float: | *“What’s your sign?”*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const p = prog(lt, 0.1, 2.4)
      float(x, lerp(1000, 640, p), 980, pop01(t, P.t0 + 0.1, 0.3, 2) * 0.8, SKYB, () => signChar(x, t, 'aquarius', 0, -60, 120, { mood: 'happy', look: [-1, 0], seed: 9, glyph: false }))
      bubble(x, 760, 650, 'what’s your sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      bubble(x, 790, 790, 'aquarius!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: MINT, tail: 'br' })
    } },
  { sign: 'cancer', cap: 'Their float: | *the family photo album.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      float(x, 780, 960, pop01(t, P.t0 + 0.2, 0.35, 2), PINK, () => {
        for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.6 + i * 0.3, 0.3, 2.2); x.save(); x.translate(-100 + i * 100, -80); x.rotate((i - 1) * 0.12); x.scale(k, k); x.fillStyle = INK; x.fillRect(-46, -56, 92, 112); x.fillStyle = CREAM; x.fillRect(-40, -50, 80, 100); x.fillStyle = [SKYB, GOLD, MINT][i]; x.fillRect(-32, -42, 64, 64); x.restore() }
      })
      label(x, 790, 680, 'BABY PICS: ALL OF THEM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Wasn’t in the parade. | *Became the parade.*', hideStar: true, star: { x: 0 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.05, 0.45, 1.8), rise = ease.outCubic(prog(lt, 0.5, 1.2))
      float(x, 540, 1010, pop01(t, P.t0 + 0.3, 0.35, 2) * 1.4, ORANGE, () => txt(x, '✦ LEO ✦', 0, 40, { size: 40, font: MONO, weight: 700 }))
      signChar(x, t, 'leo', 540, lerp(880, 820, rise), lerp(240, 300, rise), { mood: rise > 0.5 ? 'sparkle' : 'happy', pop: k, seed: 8, hops: [P.t0 + 0.1, P.t0 + 1.7] })
      if (rise > 0.9) sparkles(x, t, 540, 780, P.t0 + 1.2 * 1.29, 8, 220, 0.5)
      label(x, 790, 620, 'FLOAT #1 OF 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Picked up every piece | *of confetti.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 1], star: ST,
    back(x, t, lt, P) {
      const left = 1 - prog(lt, 0.5, 2.3)
      for (let i = 0; i < 26; i++) if (i / 26 < left) { x.fillStyle = [GOLD, PINK, MINT, SKYB, ORANGE][i % 5]; x.save(); x.translate(560 + (i * 137 % 400), 760 + (i * 71 % 380)); x.rotate(i); x.fillRect(-14, -8, 28, 16); x.restore() }
    },
    front(x, t, lt, P, F) {
      drawBits(x, BROOM, { K: '#8a4a2e', Y: GOLD }, F.x + 110, F.cy + 60, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: Math.sin(t * 8) * 0.15 })
      label(x, 790, 1120, `CONFETTI LEFT: ${Math.max(0, Math.ceil(26 * (1 - prog(lt, 0.5, 2.3))))}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Judged the floats. | *Everyone won.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) drawBits(x, RIBBON, { G: GOLD, Y: CREAM, R: [RED, SKYB, MINT][i % 3] }, 640 + (i % 3) * 150, 760 + Math.floor(i / 3) * 200, 14 * pop01(t, P.t0 + 0.4 + i * 0.18, 0.3, 2.2), { rot: (i % 2 ? 0.1 : -0.1) })
      label(x, 790, 1110, '1ST PLACE: ALL', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Sunglasses on. | Clapped once. *Meant it.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      shades(x, F.x, F.cy - 6, 18, pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 820, '*clap*', pop01(t, P.t0 + 1.2, 0.25, 2.6), { size: 64, col: LAV, tail: 'bl' })
      label(x, 790, 1020, 'HIGHEST HONOUR', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Followed the parade | *to the next town.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 860); x.scale(k, k); x.fillStyle = INK; x.fillRect(-10, 0, 20, 260); x.fillStyle = INK; x.fillRect(-180, -60, 340, 110); x.fillStyle = GREEN; x.fillRect(-174, -54, 328, 98); x.beginPath(); x.moveTo(154, -54); x.lineTo(200, -5); x.lineTo(154, 44); x.fill()
      txt(x, 'NEXT TOWN', -10, -5, { size: 40, color: CREAM }); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 370, 640, 'one more town!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: GOLD, tail: 'bc' })
      label(x, 790, 1150, 'DAY 3 OF PARADE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Asked what | *the balloons cost.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) balloon(x, 680 + i * 110, 700 + (i % 2) * 40 + 8 * Math.sin(t * 2 + i), 46, [RED, GOLD, SKYB][i], pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2))
      card(x, 790, 1040, 340, 130, pop01(t, P.t0 + 0.9, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => { txt(x, 'COST PER BALLOON?', 0, -24, { size: 28, font: MONO, weight: 700 }); txt(x, 'RETURN ON JOY?', 0, 28, { size: 28, font: MONO, weight: 700, color: GREEN }) })
    } },
  { sign: 'aquarius', cap: 'Their float: | *a planet. Theirs.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.8), y = 780 + 12 * Math.sin(t * 2)
      if (k > 0.01) {
        x.save(); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(790, y + 110 * k); x.lineTo(760, 1150); x.stroke()
        x.translate(790, y); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 116, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6fc3ff'; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.fill()
        x.fillStyle = MINT; x.fillRect(-60, -50, 50, 30); x.fillRect(20, 20, 60, 34); x.fillRect(-30, 50, 30, 20)
        x.strokeStyle = GOLD; x.lineWidth = 14; x.beginPath(); x.ellipse(0, 0, 180, 40, -0.25, 0.15, Math.PI - 0.15); x.stroke()
        x.restore()
      }
      label(x, 790, 1100, 'POPULATION: 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'First balloon floated off. | *Instant tears.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const up = ease.inCubic(prog(lt, 0.5, 2.4))
      balloon(x, 790 + 30 * Math.sin(t * 2), lerp(860, 480, up), 60, PINK, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'GOODBYE, FRIEND', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0163', key: 'G', accent: ACC, ending: 'group',
  title: 'The signs | *at a parade.*',
  cameos: CAMEOS,
  group: {
    cap: 'Nobody stayed | *in line.*',
    moods: ['sparkle', 'sleepy', 'wink', 'heart', 'sparkle', 'squint', 'heart', 'neutral', 'sparkle', 'neutral', 'sparkle', 'wide'],
    draw(x, t, lt) { confetti(x, t, 540, 1150, t - lt + 1.0, { n: 30, spread: 460, h: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
