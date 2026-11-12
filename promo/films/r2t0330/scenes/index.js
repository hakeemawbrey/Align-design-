// r2t0330: star_talk, ROLL CALL, "The signs fixing | a wobbly table." (signs3kit social cut, music: lofi · F). Ending: callback.
//   ♈ kicked the leg, now it has three · ♉ bought a new one, solid oak · ♊ asked the table its sign
//   · ♋ wobbly since grandma, it stays · ♌ stood on it to announce the fix · ♍ measured all four legs to the micron
//   · ♎ balanced it with one napkin · ♏ glared at it, it stopped · ♐ called it a fun ride · ♑ a five-year plan for it
//   · ♒ invented a self-levelling leg · ♓ felt bad for it, gave it a hug
//  49.2   "Still wobbly. | *Somehow worse.*"  Group photo.
//  52.6   callback: "The table | never wobbled again." Scorpio, still glaring; the table, very still.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', TEAL = '#2fc79a', ORANGE = '#ffb34a', GREY = '#c9c9d8', BROWN = '#8a4a2e', WOOD = '#c98f5a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a little table: top + legs. wob = rotation, legs = which of the 4 legs are drawn, top = top colour */
function table(x, cx, cy, k, { wob = 0, w = 320, legs = [1, 1, 1, 1], top = WOOD, legH = 170, short = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(wob); x.scale(k * 1.2, k * 1.2)
  const xs = [-w / 2 + 20, -w / 6, w / 6, w / 2 - 44]
  legs.forEach((on, i) => { if (!on) return; const h = i === short ? legH - 26 : legH; x.fillStyle = INK; x.fillRect(xs[i] - 4, 0, 32, h + 4); x.fillStyle = BROWN; x.fillRect(xs[i], 0, 24, h) })
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -26, w, 40)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -40, w + 12, 50); x.fillStyle = top; x.fillRect(-w / 2, -34, w, 38)
  x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-w / 2, -34, w, 8)
  x.restore()
}
const wobble = (t, a = 0.06) => a * Math.sin(t * 14)
const NAPKIN = ['WWWWWW', 'WPWWPW', 'WWWWWW']
const SPRING = ['.KKKK.', 'K....K', '.KKKK.', 'K....K', '.KKKK.', 'K....K', '.KKKK.']
const SWEAT = ['.S.', 'SSS', 'SSS', '.S.']

const CAMEOS = [
  { sign: 'aries', cap: 'Kicked the leg. | *Now it has three.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', star: { x: -170 }, hops: [0.6],
    front(x, t, lt, P) {
      const broke = lt > 0.8
      table(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: broke ? 0.22 : wobble(t), legs: broke ? [1, 1, 1, 0] : [1, 1, 1, 1] })
      if (broke) { x.save(); x.translate(lerp(900, 980, clamp((lt - 0.8) / 0.4)), 1150); x.rotate(1.4); x.fillStyle = INK; x.fillRect(-4, -4, 32, 178); x.fillStyle = BROWN; x.fillRect(0, 0, 24, 170); x.restore() }
      L(x, 800, 700, 'FIXED (?)', pop01(t, P.t0 + 1.0, 0.3, 2.4), ORANGE, 0.05, 40)
    } },
  { sign: 'taurus', cap: 'Bought a new table. | *Solid oak.*', mood: lt => lt > 1.1 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const p = clamp((lt - 0.4) / 0.4)
      table(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2) * (1 - p), { wob: wobble(t) })
      table(x, 800, 940, pop01(t, P.t0 + 0.7, 0.35, 2), { w: 380, top: '#a0662e', legH: 190 })
      L(x, 800, 700, 'WEIGHT: ONE CAR', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'gemini', cap: 'Asked the table | *its sign.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      table(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: wobble(t) })
      bubble(x, 760, 660, 'what’s your sign?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 830, 'TABLE: ALSO GEMINI', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'Wobbly since grandma. | *It stays.*', mood: 'heart', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      table(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: wobble(t), top: '#d9a6c0' })
      L(x, 800, 760, 'FAMILY HEIRLOOM', pop01(t, P.t0 + 0.8, 0.3, 2.4), SKYB, -0.04, 34)
      hearts(x, t, 560, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Stood on it | to *announce the fix.*', mood: 'sparkle', star: { x: 0, y: -110, s: 250 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 2)
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1c8'; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1180); x.lineTo(320, 1180); x.closePath(); x.fill(); x.restore()
      table(x, 540, 1000, k, { wob: wobble(t, 0.04), w: 380 })
    },
    front(x, t, lt, P) {
      bubble(x, 800, 600, 'LADIES, GENTS…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      sparkles(x, t, 540, 760, P.t0 + 1.0, 8, 220, 0.3)
    } },
  { sign: 'virgo', cap: 'Measured all four legs. | *To the micron.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      table(x, 800, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: wobble(t, 0.02), short: 3 })
      const leg = Math.min(3, Math.floor(lt * 2.2))
      x.save(); x.strokeStyle = GOLD; x.lineWidth = 4; x.setLineDash([10, 8]); const lx = 800 + [-140, -53, 53, 116][leg] * 1.2 + 14; x.beginPath(); x.moveTo(lx - 30, 1115); x.lineTo(lx + 30, 1115); x.stroke(); x.restore()
      L(x, 800, 690, `LEG ${leg + 1}: 0.003 MM OFF`, pop01(t, P.t0 + 0.6, 0.3, 2.2), '#a8d86a', 0.04, 28)
    } },
  { sign: 'libra', cap: 'Balanced it perfectly. | With *one napkin.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const fixed = lt > 1.0
      table(x, 800, 940, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: fixed ? 0 : wobble(t), short: 3 })
      drawBits(x, NAPKIN, { W: '#ffffff', P: PINK }, 954, lerp(1175, 1128, clamp((lt - 0.6) / 0.4)), 12 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 800, 700, 'BALANCE: RESTORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      if (fixed) sparkles(x, t, 800, 920, P.t0 + 1.05, 6, 190, 0.2)
    } },
  { sign: 'scorpio', cap: 'Glared at it. | *It stopped.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      table(x, 800, 960, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: lt < 0.9 ? wobble(t) : 0 })
      if (lt > 0.9) drawBits(x, SWEAT, { S: SKYB }, 960, 880, 10 * pop01(t, P.t0 + 1.0, 0.25, 2.4))
      L(x, 800, 720, lt < 0.9 ? 'WOBBLE: YES' : 'WOBBLE: NEVER AGAIN', 1 * pop01(t, P.t0 + 0.3, 0.3, 2), lt < 0.9 ? GREY : LAV, 0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Didn’t fix it. | Called it *a fun ride.*', mood: 'sparkle', look: [1, 0], star: { x: 0, y: -110, s: 240 }, hops: [0.5, 1.0, 1.5],
    back(x, t, lt, P) { table(x, 540, 1000, pop01(t, P.t0 + 0.1, 0.3, 2), { wob: 0.14 * Math.sin(t * 7), w: 380 }) },
    front(x, t, lt, P) {
      bubble(x, 820, 600, 'wheee!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 46, tail: 'bl' })
      L(x, 280, 700, 'RIDE: 10/10', pop01(t, P.t0 + 1.3, 0.3, 2.4), ORANGE, -0.06, 32)
    } },
  { sign: 'capricorn', cap: 'Wrote a five-year plan | for *the table.*', mood: 'neutral', look: [-1, 0], star: { x: 170 },
    front(x, t, lt, P) {
      table(x, 300, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: wobble(t), w: 280 })
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(300, 720); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -140, 320, 280); x.fillStyle = CREAM; x.fillRect(-152, -132, 304, 264)
        x.fillStyle = TEAL; x.fillRect(-152, -132, 304, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TABLE: 5-YR PLAN', 0, -109)
        x.textAlign = 'left'; x.font = `700 22px ${MONO}`; ['Y1: stability', 'Y2: growth', 'Y3: new leg', 'Y5: IPO'].forEach((s, i) => { if (lt > 0.6 + i * 0.2) x.fillText(s, -130, -54 + i * 46) })
        x.restore()
      }
    } },
  { sign: 'aquarius', cap: 'Invented a | *self-levelling leg.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      table(x, 800, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: lt < 1.0 ? wobble(t) : 0, legs: [1, 1, 1, 0] })
      drawBits(x, SPRING, { K: MINT }, 954, 1020 + 8 * Math.sin(t * 9), 12 * pop01(t, P.t0 + 0.6, 0.3, 2.2), { sy: 1 + 0.15 * Math.sin(t * 9) })
      sparkles(x, t, 954, 1020, P.t0 + 0.9, 6, 90, 0.4, [MINT, SKYB, BONE])
      L(x, 800, 700, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Felt bad for it. | *Gave it a hug.*', mood: 'heart', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 0], star: { x: -60 }, hops: [1.0],
    front(x, t, lt, P) {
      table(x, 760, 980, pop01(t, P.t0 + 0.15, 0.3, 2), { wob: lt < 1.0 ? wobble(t) : 0.01 * Math.sin(t * 3) })
      hearts(x, t, 680, 900, P.t0 + 0.9, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 13 })
      L(x, 800, 700, 'IT’S OKAY, BUDDY', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0330', key: 'F', accent: '#c98f5a', ending: 'callback',
  title: 'The signs fixing | *a wobbly table.*',
  cameos: CAMEOS,
  group: { cap: 'Still wobbly. | *Somehow worse.*', moods: ['wide', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'happy', 'squint', 'sparkle', 'neutral', 'squint', 'wide'] },
  last: {
    text: 'It never | *wobbled again.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 380, 1080, 270 * k, { mood: 'squint', seed: 8, look: [1, 0], hops: [t0 + 1.3] })
      table(x, 760, 1120, pop01(t, t0 + 0.5, 0.4, 2), { w: 300 })
      if (lt > 1.1) drawBits(x, SWEAT, { S: SKYB }, 930, 1040, 10 * pop01(t, t0 + 1.1, 0.25, 2.4))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
