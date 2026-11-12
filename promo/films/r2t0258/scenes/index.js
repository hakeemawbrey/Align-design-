// r2t0258: star_talk, BELIKE, "Skipped breakfast? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme reaction to skipping breakfast.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ snack got stuck, personal attack · ♉ compatibility check: Taurus + brunch · ♊ told their match about every
//              pancake ever · ♋ packed snacks for everyone else · ♌ survived till ten, wants an award · ♍ made a meal plan,
//              forgot to eat · ♎ couldn't pick a cereal, still deciding · ♏ stared at your toast until you shared
//              · ♐ "I'll eat later", foraged a berry · ♑ breakfast is a 2 PM meeting · ♒ invented toast soup
//              · ♓ saw a photo of pancakes, sobbed
//  49.2        "Feed them. | *Immediately.*"
//  52.6        callback: "The machine? | *Gave up.*"  Aries' machine comes back and drops a snack.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YOLK = '#ffd23a', RED = '#e23d4e', CREAM = '#fff4e2', TOAST = '#e0a050', CRUST = '#a8641f', GREEN = '#5fd068'

// ── props
const TOASTBM = ['.CCCCCC.', 'CCTTTTCC', 'CTTTTTTC', 'CTTTTTTC', 'CTTTTTTC', 'CTTTTTTC', 'CCCCCCCC']
const TOAST_C = { C: CRUST, T: TOAST }
const TROPHY = ['YYYYYYYYY', 'Y.YYYYY.Y', 'Y.YYYYY.Y', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '...YYY...', '..KKKKK..']
const TROPHY_C = { Y: GOLD, K: INK }
const BERRY = ['...G.', '..G..', '.RRR.', 'RRRRR', 'RWRRR', 'RRRRR', '.RRR.']
const BERRY_C = { G: GREEN, R: '#8a4ad8', W: '#ffffff' }
const BAG = ['..KKKK..', '.K....K.', 'BBBBBBBB', 'BBBBBBBB', 'BBbbbbBB', 'BBBBBBBB', 'BBBBBBBB', 'BBBBBBBB']
const BAG_C = { K: INK, B: '#c9a070', b: '#a8804a' }
const SNACK = ['RRRRRR', 'RYYYYR', 'RYRRYR', 'RYYYYR', 'RRRRRR']
const SNACK_C = { R: RED, Y: YOLK }
const PANCAKES = ['....YY....', '...YYYY...', 'PPPPPPPPPP', 'pppppppppp', 'PPPPPPPPPP', 'pppppppppp', 'PPPPPPPPPP', '.WWWWWWWW.']
const PANCAKE_C = { Y: YOLK, P: TOAST, p: CRUST, W: '#d8d0f0' }

// a little vending machine; `drop` 0…1 drops a snack into the tray
function vending(x, t, cx, cy, k, { shake = 0, drop = -1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx + Math.sin(t * 60) * shake * 6, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = RED; x.fillRect(-126, -196, 252, 392)
  x.fillStyle = '#140c30'; x.fillRect(-106, -176, 160, 260)
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) drawBits(x, SNACK, SNACK_C, -80 + c * 54, -136 + r * 82, 6, { alpha: drop >= 0 && r === 0 && c === 1 ? 0 : 1 })
  x.fillStyle = '#c9c9d8'; x.fillRect(66, -150, 40, 120)
  x.fillStyle = INK; x.fillRect(-106, 120, 212, 56)
  if (drop >= 0) drawBits(x, SNACK, SNACK_C, -26, lerp(-136, 146, ease.outBounce ? ease.outBounce(drop) : ease.inQuad(drop)), 6)
  x.restore()
}
// a profile card with a little star (or a food) and a name
function profile(x, t, cx, cy, k, { id, title, draw, rot = 0.05 }) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-106, -136, 212, 272)
  x.fillStyle = '#2a2350'; x.fillRect(-100, -130, 200, 260)
  x.fillStyle = '#140c30'; x.fillRect(-88, -118, 176, 180)
  if (id) signChar(x, t, id, 0, -24, 130, { mood: 'heart', seed: 77, glyph: false, glow: 0.7 })
  if (draw) draw()
  x.fillStyle = GOLD; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, 98)
  x.restore()
}
// a phone, face up: a header and up to three chips
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 14 : -14, -60 + i * 66); x.scale(kk, kk)
    x.font = `800 26px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -26, w, 52); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}
// a sheet of paper with ruled rows and a title
function sheet(x, cx, cy, k, title, rows, { rot = -0.05, w = 300, h = 340, hcol = MINT } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = hcol; x.fillRect(-w / 2, -h / 2, w, 56)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -h / 2 + 30)
  rows.forEach(([s, col], i) => {
    if (!s) return
    const py = -h / 2 + 96 + i * 54
    if (col) { x.fillStyle = col; x.fillRect(-w / 2 + 16, py - 22, w - 32, 44) }
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(s, 0, py + 2)
  })
  x.restore()
}
// a cereal box
function cereal(x, cx, cy, k, col, name, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-78, -130, 156, 260)
  x.fillStyle = col; x.fillRect(-70, -122, 140, 244)
  x.fillStyle = CREAM; x.fillRect(-56, -96, 112, 60)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -66)
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 40, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(-16 + (i % 3) * 16, 28 + Math.floor(i / 3) * 22, 7, 0, Math.PI * 2); x.fill() }
  x.restore()
}
// a soup bowl with a slice of toast sticking out
function soup(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, TOASTBM, TOAST_C, 30, -60, 14, { rot: 0.4 })
  x.fillStyle = INK; x.beginPath(); x.moveTo(-150, -20); x.lineTo(150, -20); x.lineTo(110, 90); x.lineTo(-110, 90); x.closePath(); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(-140, -12); x.lineTo(140, -12); x.lineTo(104, 82); x.lineTo(-104, 82); x.closePath(); x.fill()
  x.fillStyle = '#e8c070'; x.fillRect(-140, -16, 280, 14)
  x.globalAlpha = 0.5; x.fillStyle = CREAM
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.8 + i / 3) % 1); x.fillRect(-60 + i * 50 + Math.sin(ph * 8) * 6, -40 - ph * 90, 8, 22) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Snack got stuck. | *Personal attack.*', mood: lt => lt > 0.8 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      vending(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { shake: lt > 0.8 && lt < 2 ? 1 : 0 })
      bubble(x, 420, 640, 'I PAID!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, tail: 'bc' })
      label(x, 800, 1110, 'SNACK: STUCK', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Ran a compatibility check. | Taurus + *brunch.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      profile(x, t, 800, 850, pop01(t, P.t0 + 0.3, 0.35, 2), { title: 'BRUNCH', draw: () => drawBits(x, PANCAKES, PANCAKE_C, 0, -28, 13) })
      label(x, 800, 1100, 'SOULMATES ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 820, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'Told their match | about *every pancake ever.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.6) * 60) + 1
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ YOUR MATCH', lines: [
        ['ok so pancakes', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['and ANOTHER', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], [`(${n} more)`, YOLK, pop01(t, P.t0 + 1.0, 0.25, 2.2)],
      ] })
      label(x, 800, 1110, 'STILL HUNGRY', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Packed snacks | for *everyone else.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.5],
    front(x, t, lt, P) {
      ;[0, 1, 2].forEach(i => drawBits(x, BAG, BAG_C, 700 + i * 100, 960 - (i % 2) * 30, 13 * pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)))
      label(x, 790, 700, 'FOR: EVERYONE ♡', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 400, 650, '*stomach growls*', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, tail: 'bc' })
    } },
  { sign: 'leo', cap: 'Survived till 10 AM. | Wants *an award.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 800, 880, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 800, 1090, 'BRAVEST 10 AM', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 860, P.t0 + 1.0, 8, 200, 0.4)
      bubble(x, 420, 650, 'thank you', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Made a meal plan. | *Forgot to eat.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'MEAL PLAN', [
        [lt > 0.5 ? 'MON · oats' : '', '#b8e07a'], [lt > 0.65 ? 'TUE · eggs' : '', SKYB], [lt > 0.8 ? 'WED · toast' : '', YOLK], [lt > 0.95 ? 'TODAY · ???' : '', PINK],
      ])
      label(x, 800, 1110, 'IT’S 3 PM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Couldn’t pick a cereal. | *Still deciding.*', mood: 'neutral', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: 0, y: 30, s: 260 },
    front(x, t, lt, P) {
      cereal(x, 290, 900, pop01(t, P.t0 + 0.2, 0.3, 2), PINK, 'LOOPS', -0.08)
      cereal(x, 790, 900, pop01(t, P.t0 + 0.35, 0.3, 2), SKYB, 'FLAKES', 0.08)
      const mins = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 44)
      label(x, 540, 620, `${mins} MIN`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Stared at your toast | *until you shared.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 170 * k, { mood: lt > 1.2 ? 'happy' : 'wide', look: [-1, 0], seed: 15, glyph: false })
      const give = ease.inOutCubic(prog(lt, 1.1, 1.5))
      drawBits(x, TOASTBM, TOAST_C, lerp(820, 560, give), lerp(820, 800, give), 13 * k, { rot: 0.1 })
      label(x, 790, 640, '…', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 50, bg: LAV, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: '“I’ll eat later.” | *Foraged a berry.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, BERRY, BERRY_C, 800, 860, 26 * pop01(t, P.t0 + 0.5, 0.35, 2))
      label(x, 800, 640, 'BRUNCH: WILD', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1090, 'nature provides', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Breakfast? | Scheduled *for 2 PM.*', mood: 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      sheet(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), 'TODAY', [
        ['9:00 · meeting', LAV], ['11:00 · meeting', LAV], [lt > 0.9 ? '2:00 · BREAKFAST' : '', YOLK], ['3:00 · meeting', LAV],
      ], { hcol: '#a8a0c8', rot: 0.04 })
      label(x, 800, 1110, 'PRODUCTIVE.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a new breakfast. | *Toast soup.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 1], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      soup(x, 800, 900, pop01(t, P.t0 + 0.3, 0.35, 2), t)
      label(x, 800, 650, 'PATENT PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw a photo of pancakes. | *Sobbed.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 1, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 800, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'PHOTO', headCol: YOLK })
      drawBits(x, PANCAKES, PANCAKE_C, 806, 880, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.05 })
      label(x, 800, 1110, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0258', key: 'G', accent: YOLK, ending: 'callback',
  title: 'Skipped breakfast? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Feed them. | *Immediately.*' },
  last: {
    text: 'The machine? | *Gave up.*',
    draw(x, t, lt) {
      const t0 = t - lt
      vending(x, t, 640, 1060, 1.3 * pop01(t, t0 + 0.5, 0.4, 2), { drop: clamp((lt - 1.2) / 0.6) })
      signChar(x, t, 'aries', 330, 1180, 210 * pop01(t, t0 + 0.7, 0.35, 2), { mood: lt > 1.8 ? 'sparkle' : 'squint', look: [1, 0], seed: 44, glyph: false, hops: [t0 + 1.9, t0 + 2.4] })
      sparkles(x, t, 610, 1250, t0 + 1.8, 8, 160, 0.3)
      label(x, 640, 1420, 'SNACK: FREED', pop01(t, t0 + 1.9, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
