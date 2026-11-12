// r2t0344: star_talk, BELIKE, "Zodiacs in Mercury | retrograde be like." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself during Mercury retrograde.
//   0.0–3.6    "Zodiacs in Mercury | retrograde *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ replied-all, twice · ♉ refused to update anything · ♊ it's their planet, took it personally
//              · ♋ stayed in bed the whole retrograde · ♌ autocorrect spelled LEO wrong, outrage
//              · ♍ colour-coded the chaos, still chaos · ♎ sent "k" by accident, apologised all week
//              · ♏ stocked a retrograde kit in June · ♐ missed the flight, landed somewhere better
//              · ♑ doesn't believe in it, backed up everything twice · ♒ the wifi died, built their own
//              · ♓ cried in advance, it starts tomorrow
//  49.2        group ending: "Three weeks. | *Blame the planet.*" and a tiny Mercury says sorry.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const BED = [
  'H.............',
  'HPPPBBBBBBBBBB',
  'HPPPBBBBBBBBBB',
  'HBBBBBBBBBBBBB',
  'HWWWWWWWWWWWWH',
  'H............H',
]
const BED_C = { H: WOOD, P: PAPER, B: '#6fc3ff', W: '#c9744a' }
const BOX = [
  'TTTTTTTTTTT',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
]
const BOX_C = { T: '#c9744a', B: '#e8a24a' }
const ANTENNA = [
  'Y.....Y.....Y',
  '.Y....Y....Y.',
  '..Y...Y...Y..',
  '......Y......',
  '.....KKK.....',
  '.....KKK.....',
  '......K......',
  '......K......',
  '......K......',
  '....KKKKK....',
]
const ANTENNA_C = { Y: SKYB, K: '#9aa5c4' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', G: '#6b62a8' }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
/** a little grey Mercury with two dot eyes */
function mercury(x, cx, cy, r, k, t, look = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 6, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#b8b4cc'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8f8aa8'; for (const [a, b, c] of [[-0.35, -0.3, 0.18], [0.3, 0.25, 0.14], [-0.1, 0.45, 0.1]]) { x.beginPath(); x.arc(a * r, b * r, c * r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.fillRect(-r * 0.35 + look * 4, -r * 0.1, r * 0.16, r * 0.24); x.fillRect(r * 0.2 + look * 4, -r * 0.1, r * 0.16, r * 0.24)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Hit reply-all. | *Twice.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 880, 330, 220, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, PAPER, () => {
        txt(x, 'TO: EVERYONE (412)', 0, -60, 26, INK, MONO, 700)
        txt(x, 'lol who invited', 0, 0, 30, '#6b62a8')
        txt(x, 'the boss', 0, 40, 30, '#6b62a8')
      })
      label(x, 790, 1080, 'SENT ×2', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 44, bg: RED, color: PAPER, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Refused to update | *anything.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 800, 930, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      bubble(x, 800, 900, 'update?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 34, tail: 'bc' })
      label(x, 790, 1130, 'NOT UNTIL MAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 36, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'It’s their planet. | *Took it personally.*', mood: lt => lt > 1.1 ? 'wide' : 'neutral', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      mercury(x, 800, 740, 90, pop01(t, P.t0 + 0.2, 0.35, 2), t, -1)
      bubble(x, 780, 980, 'et tu, | mercury?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Stayed in bed | *the whole retrograde.*', mood: 'sleepy', star: { x: -170, y: 40 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 470, 1060, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      card(x, 830, 760, 230, 160, pop01(t, P.t0 + 0.7, 0.3, 2), 0.05, PAPER, () => {
        txt(x, 'DAY', 0, -34, 30, INK, MONO, 700)
        txt(x, String(Math.min(21, 1 + Math.floor(Math.max(0, lt - 0.7) * 14))), 0, 24, 60, RED)
      })
    } },
  { sign: 'leo', cap: 'Autocorrect said “Loe.” | *Outrage.*', mood: lt => lt > 1.0 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'i’m Loe', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 60, tail: 'bl' })
      if (lt > 0.8) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(640, 735 - 30); x.lineTo(920, 735 - 60); x.stroke(); x.restore() }
      label(x, 790, 940, 'L-E-O.', pop01(t, P.t0 + 1.1, 0.3, 2.6), { size: 72, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'virgo', cap: 'Colour-coded the chaos. | *Still chaos.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const C = [GOLD, PINK, MINT, SKYB, LAV, '#ffb34a']
      for (let i = 0; i < 6; i++) {
        const fall = lt > 1.3 ? ease.inQuad(prog(lt, 1.3 + i * 0.05, 1.9 + i * 0.05)) : 0
        const X = 700 + (i % 3) * 100, Y = 720 + Math.floor(i / 3) * 140 + fall * 260
        card(x, X, Y, 90, 90, pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2), (i % 2 ? 0.06 : -0.06) + fall * (i % 2 ? 0.9 : -0.9), C[i], () => {})
      }
    } },
  { sign: 'libra', cap: 'Sent “k” by accident. | *Apologised all week.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 680, 'k', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 72, tail: 'bl' })
      const n = Math.min(7, Math.max(0, Math.floor((lt - 0.8) * 5)))
      for (let i = 0; i < n; i++) label(x, 720 + (i % 2) * 120, 880 + Math.floor(i / 2) * 70, 'SORRY', 1, { size: 30, bg: PINK, rot: (i % 3 - 1) * 0.06 })
    } },
  { sign: 'scorpio', cap: 'Saw it coming. | *Stocked up in June.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOX, BOX_C, 800, 1030, 24 * k)
      drawBits(x, BOX, BOX_C, 800, 860, 20 * pop01(t, P.t0 + 0.5, 0.3, 2))
      if (k > 0.8) { txt(x, 'RETROGRADE', 800, 1015, 32, INK); txt(x, 'KIT', 800, 1055, 32, INK) }
      label(x, 790, 650, 'PREPARED SINCE JUNE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: '#c97bff', color: PAPER, rot: -0.05 })
    } },
  { sign: 'sagittarius', cap: 'Missed the flight. | *Landed somewhere better.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [-1, 0], star: { x: 150 }, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 330, 820, 340, 180, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, PAPER, () => {
        x.fillStyle = '#c97bff'; x.fillRect(-170, -90, 340, 50); txt(x, 'BOARDING PASS', 0, -66, 26, PAPER, MONO, 700)
        txt(x, lt > 1.1 ? 'DEST: ??? ✓' : 'DEST: HOME', 0, 10, 34, INK, MONO, 700)
        txt(x, lt > 1.1 ? 'GATE: VIBES' : 'GATE: B12', 0, 58, 26, '#6b62a8', MONO, 700)
      })
      bubble(x, 330, 1050, 'even better!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Doesn’t believe in it. | *Backed up twice.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 160 },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) {
        const p = ease.outCubic(prog(lt, 0.4 + i * 0.6, 0.9 + i * 0.6))
        card(x, 320, 760 + i * 170, 320, 120, pop01(t, P.t0 + 0.2 + i * 0.6, 0.3, 2), i ? 0.04 : -0.04, '#2a2350', () => {
          txt(x, `BACKUP ${i + 1}`, 0, -28, 28, BONE, MONO, 700)
          x.fillStyle = INK; x.fillRect(-130, 4, 260, 30); x.fillStyle = MINT; x.fillRect(-126, 8, 252 * p, 22)
        })
      }
      bubble(x, 330, 1100, 'it’s not real.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'The wifi died. | *Built their own.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, ANTENNA, ANTENNA_C, 800, 900, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 1130, 'SIGNAL: ★★★★★', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 760, P.t0 + 1.4, 6, 130, 0.2)
    } },
  { sign: 'pisces', cap: 'Cried in advance. | *It starts tomorrow.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      card(x, 800, 860, 300, 200, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, PAPER, () => {
        x.fillStyle = RED; x.fillRect(-150, -100, 300, 54); txt(x, 'CALENDAR', 0, -73, 26, PAPER, MONO, 700)
        txt(x, 'RETROGRADE:', 0, 0, 28, INK, MONO, 700)
        txt(x, 'TOMORROW', 0, 50, 36, RED)
      })
      bubble(x, 800, 640, 'it’s already | so hard.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0344', key: 'D', accent: LAV, ending: 'group',
  title: 'Zodiacs in Mercury | retrograde *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Three weeks. | *Blame the planet.*',
    draw(x, t, lt) {
      mercury(x, 870, 690, 80, pop01(t, t - lt + 1.4, 0.4, 2), t, -1)
      bubble(x, 680, 640, 'my bad!', pop01(t, t - lt + 2.0, 0.25, 2.2), { size: 36, tail: 'br' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
