// r2t0235: star_talk, SOLO, "Your Leo mom | be like." (~45 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the Leo mom, pushed to the most extreme (and lovable).
//   0.0–3.6    "Your Leo mom | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              your school play, she took a bow · picked you up in sunglasses, at night · told the whole street about
//              your B+ · checked your date's birth chart · your birthday cake has her face on it · hugs you in front of
//              everyone · signs cards "Love, The Queen" · tells your wins better than you · defends you like a lioness
//  37.8        "Loud love. | *Every single day.*"  Leo comes back, big.
//  41.2        callback: "Your wedding cake? | *Her face. Again.*"  a three-tier cake with Leo's face on top.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO } from '../../signs3kit.js'
import { card, txt, chart, shades, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN } from './props.js'

const LEO = '#ffb34a'
const S = 'leo', ST = { x: -170 }
const M = { font: MONO, weight: 700 }

const MEGA = ['.......KK', '.....KKYK', '...KKYYYK', 'KKKYYYYYK', 'KYYYYYYYK', 'KKKYYYYYK', '.K.KKYYYK', '.K...KKYK', '.......KK']

/** a cake with Leo's face on top; tiers 1–3 */
function cake(x, t, cx, cy, k, tiers) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < tiers; i++) { const w = 300 - i * 70, y = -i * 90; x.fillStyle = INK; x.fillRect(-w / 2 - 6, y - 96, w + 12, 102); x.fillStyle = i % 2 ? '#ffd86b' : CREAM; x.fillRect(-w / 2, y - 90, w, 90); x.fillStyle = PINK; for (let j = 0; j < w / 30; j++) x.fillRect(-w / 2 + j * 30, y - 90, 18, 16) }
  const fy = -tiers * 90 - 60
  x.fillStyle = INK; x.beginPath(); x.arc(0, fy, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e2862a'; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.5; x.beginPath(); x.arc(Math.cos(a) * 54, fy + Math.sin(a) * 54, 24, 0, Math.PI * 2); x.fill() }
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, fy, 48, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.fillRect(-22, fy - 14, 10, 12); x.fillRect(12, fy - 14, 10, 12); x.lineWidth = 6; x.strokeStyle = INK; x.beginPath(); x.arc(0, fy + 4, 20, 0.3, Math.PI - 0.3); x.stroke()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Your school play. | *She* took a bow.', mood: 'sparkle', star: ST, hops: [0.9, 1.5],
    back(x, t, lt, P) { const k = ease.outCubic(prog(lt, 0.3, 0.6)); if (k > 0.01) { x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(350, 490); x.lineTo(430, 490); x.lineTo(590, 1180); x.lineTo(190, 1180); x.closePath(); x.fill(); x.restore() } },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 1040, 130 * k, { mood: 'wide', look: [-1, 0], seed: 21, glyph: false })
      label(x, 820, 930, 'YOU (A TREE)', k, { size: 26, bg: GREEN, rot: 0.04, ...M })
      bubble(x, 780, 690, 'thank you, | thank you!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 390, 860, P.t0 + 1.1, 7, 170, 0.3)
    } },
  { sign: S, cap: 'Picked you up | in sunglasses. *At night.*', mood: 'happy', star: ST,
    front(x, t, lt, P, F) {
      if (lt > 0.4) shades(x, F.x, F.cy + 4 * F.cell, F.cell * 2.6, pop01(t, P.t0 + 0.4, 0.3, 2.4))
      drawBits(x, ['..YYY.', '.YY...', 'YY....', 'YY....', '.YY...', '..YYY.'], { Y: GOLD }, 820, 680, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 880, 'TIME: 9 P.M.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, ...M })
      bubble(x, 790, 1050, 'hop in, star', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Told the whole street | *about your B+.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MEGA, { K: INK, Y: GOLD }, 600, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 830, 700, 'A B+!!!', pop01(t, P.t0 + 0.6, 0.25, 2.2) * (1 + 0.05 * Math.sin(t * 18)), { size: 56, col: GOLD, tail: 'bl' })
      label(x, 820, 1000, 'NEIGHBOURS: 40', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: LEO, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Checked your date’s | *birth chart.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.6)
      label(x, 790, 1060, 'APPROVED. BARELY.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'Your birthday cake? | *Her face on it.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cake(x, t, 790, 1100, pop01(t, P.t0 + 0.2, 0.35, 2), 2)
      label(x, 790, 680, 'HAPPY BDAY (TO HER)', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'Hugs you | *in front of everyone.*', mood: 'heart', star: ST, hops: [0.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 590, 1030, 150 * k, { mood: 'wide', look: [-1, 0], seed: 23, glyph: false, tears: 1 })
      label(x, 790, 720, 'YOUR FRIENDS: WATCHING', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 26, bg: GOLD, rot: 0.04, ...M })
      bubble(x, 800, 900, 'MY BABY!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      hearts(x, t, 460, 720, P.t0 + 0.9, { n: 6, life: 2.0, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Signs every card | *“Love, The Queen.”*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.05 }, () => {
        txt(x, 'happy', 0, -90, { size: 34, weight: 700 }); txt(x, 'Tuesday!', 0, -40, { size: 34, weight: 700 })
        if (lt > 0.9) { txt(x, 'love,', 0, 40, { size: 30, color: '#e2862a', weight: 700 }); txt(x, 'The Queen ♛', 0, 90, { size: 36, color: '#e2862a' }) }
      })
      sparkles(x, t, 790, 900, P.t0 + 1.0, 6, 170, 0.4)
    } },
  { sign: S, cap: 'Your big win? | She tells it *better.*', mood: lt => Math.floor(lt * 3) % 2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'and THEN my baby…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 860, 'STORY: MINUTE 20', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: LEO, rot: 0.04, ...M })
      bubble(x, 790, 1030, '(it was a spelling bee)', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 28, col: GREY, tail: 'bl' })
    } },
  { sign: S, cap: 'Mess with her kid? | *Meet the lioness.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: ST, squash: lt => lt > 0.9 && lt < 1.6 ? 0.06 * Math.sin(lt * 30) : 0,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'ROAR.', pop01(t, P.t0 + 0.9, 0.25, 2.4) * (1 + 0.06 * Math.sin(t * 20)), { size: 80, col: LEO, tail: 'bl' })
      label(x, 790, 1000, '(she means: love you)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2t0235', key: 'F', accent: LEO, solo: S, ending: 'callback',
  title: 'Your Leo mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Loud love. | *Every single day.*', mood: 'sparkle' },
  last: {
    text: 'Your wedding cake? | *Her face. Again.*',
    draw(x, t, lt) {
      const t0 = t - lt
      cake(x, t, 680, 1380, 1.25 * pop01(t, t0 + 0.3, 0.45, 1.8), 3)
      const k = pop01(t, t0 + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 290, 1200, 240 * k, { mood: lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], seed: 44, hops: [t0 + 1.4] })
      sparkles(x, t, 680, 1000, t0 + 1.3, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
