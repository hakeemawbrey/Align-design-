// r2t0302: star_talk, ROLL CALL, "The signs as | *plus-ones.*" (~63 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme plus-one. Ending: card (Aries + Sagittarius pays off first in, last out).
//   0.0–3.6    "The signs as | *plus-ones.*"
//   3.6–49.2   ♈ showed up before the venue opened · ♉ here for the cake, only the cake · ♊ three different name tags
//              · ♋ got adopted by your grandma · ♌ gave a toast nobody asked for · ♍ fixed the seating chart mid-dinner
//              · ♎ danced with every single guest · ♏ guessed everyone's sign by dessert · ♐ stayed so late they stacked
//              the chairs · ♑ left with three job offers · ♒ wore a cape, it wasn't themed · ♓ cried, doesn't know the couple
//  49.2        "Invite one. | *Get a show.*"
//  52.4        LESSON UNLOCKED: "Bring the one who | makes it *fun.*"  PLUS-ONE: CHOSEN
//  58.3        "Aries opens the party. | Sag *closes it.*" over the match card: Aries + Sagittarius.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffb3d1', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const CAKE = ['....F.F.F....', '....W.W.W....', '.PPPPPPPPPPP.', '.CCCCCCCCCCC.', '.PPPPPPPPPPP.', 'CCCCCCCCCCCCC', 'CCCCCCCCCCCCC', 'PPPPPPPPPPPPP', 'KKKKKKKKKKKKK']
const CAKE_C = { F: ORANGE, W: CREAM, P: PINK, C: CREAM, K: '#9aa5c4' }
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', '..KK..']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const CHAIR = ['KKKKKK..', 'KCCCCK..', 'KCCCCK..', 'KCCCCKKK', 'KCCCCCCK', 'KKKKKKKK', 'K.K..K.K', 'K.K..K.K']
const TISSUE = ['...WW...', '..WWWW..', 'KKKKKKKK', 'KBBBBBBK', 'KBBWWBBK', 'KBBBBBBK', 'KKKKKKKK']
const CAPE = ['RRRRRRRRRR', 'RRRRRRRRRR', 'RRRRRRRRRRR', 'RRRRRRRRRRRR', 'RRRRRRRRRRRRR', 'RRRRRRRRRRRRRR', 'RRRRRRRRRRRRRRR', '.RRRRRRRRRRRRRR', '..RRRRRRRRRRRR.']

function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD, bg = BONE } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
function nametag(x, cx, cy, k, name, rot, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-126, -66, 252, 132)
  x.fillStyle = col; x.fillRect(-120, -60, 240, 44)
  x.fillStyle = CREAM; x.fillRect(-120, -16, 240, 76)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 20px ${MONO}`; x.fillText('HELLO, I’M', 0, -38)
  x.font = `800 36px ${INTER}`; x.fillText(name, 0, 22)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Showed up before | *the venue opened.*', mood: 'wide', star: ST, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      paper(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), ['opens: 6 pm'], { head: 'CLOSED', headBg: RED, w: 300, size: 36 })
      L(x, 790, 1060, 'ARIES ARRIVED: 2 PM', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Here for the cake. | *Only the cake.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 4)
      L(x, 790, 1100, `SLICES: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), PINK, 0.05, 38)
    } },
  { sign: 'gemini', cap: 'Wore three name tags. | *All different.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      nametag(x, 790, 650, pop01(t, P.t0 + 0.2, 0.3, 2), 'JORDAN', -0.08, GOLD)
      nametag(x, 790, 850, pop01(t, P.t0 + 0.6, 0.3, 2), 'J-DOG', 0.06, SKYB)
      nametag(x, 790, 1050, pop01(t, P.t0 + 1.0, 0.3, 2), 'DR. JAY', -0.05, MINT)
    } },
  { sign: 'cancer', cap: 'Got adopted by | *your grandma.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 790, 690, 'my new | grandchild!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      hearts(x, t, 640, 860, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Gave a toast. | *Nobody asked.*', mood: 'sparkle', star: ST, hops: [0.9],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, F.x + 160, F.cy + 10, 13 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.35 })
      const m = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 19)
      L(x, 800, 680, `SPEECH: ${m} MIN`, pop01(t, P.t0 + 0.5, 0.3, 2), ORANGE, 0.05, 38)
      bubble(x, 800, 1070, 'and ANOTHER | thing…', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Fixed the seating chart. | *Mid-dinner.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      paper(x, 790, 820, k, ['T1  aunt ↔ uncle', 'T2  exes ✗', 'T3  sorted ✓'], { head: 'SEATING v7', headBg: MINT, w: 360, size: 28, rot: -0.04 })
      L(x, 790, 1110, 'DINNER: PAUSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE)
    } },
  { sign: 'libra', cap: 'Danced with | *every single guest.*', mood: 'heart', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.4) / 1.6) * 5)
      const rows = ['the aunt', 'the DJ', 'the waiter', 'the cake guy', 'you'].map((r, i) => (i < n ? '✓ ' : '  ') + r)
      paper(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), rows, { head: 'DANCE MATCHES', headBg: PINK, w: 340, size: 28, rot: 0.04 })
      notes(x, t, 600, 760, { n: 3, cell: 6, col: PINK, seed: 1 })
    } },
  { sign: 'scorpio', cap: 'Guessed everyone’s sign | *by dessert.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re a | Virgo.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: '#ff6b8a', tail: 'bl' })
      bubble(x, 790, 900, '…how??', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      L(x, 790, 1100, 'GUESSED: 12 OF 12', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD)
    } },
  { sign: 'sagittarius', cap: 'Stayed so late | they *stacked the chairs.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 4)
      for (let i = 0; i < n; i++) drawBits(x, CHAIR, { K: INK, C: '#e0c4ff' }, 800, 1060 - i * 70, 22, { rot: (i % 2 ? 0.05 : -0.05) })
      L(x, 790, 620, 'STAFF: “GO HOME”', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Networked. Left with | *three job offers.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) paper(x, 740 + i * 50, 720 + i * 120, pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), ['JOB OFFER #' + (i + 1)], { w: 300, size: 30, rot: (i - 1) * 0.08, bg: [BONE, MINT, GOLD][i] })
      L(x, 790, 1120, 'CAKE EATEN: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, -0.04)
    } },
  { sign: 'aquarius', cap: 'Wore a cape. | *It wasn’t themed.*', mood: 'happy', look: [1, 0], star: { x: -40, s: 280 },
    back(x, t, lt, P, F) { drawBits(x, CAPE, { R: '#ff5a8a' }, F.x - 60 + Math.sin(t * 3) * 6, F.cy + 30, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.12 }) },
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'dress code? | vibes.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      L(x, 800, 1110, 'THEME: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE, 0.05)
    } },
  { sign: 'pisces', cap: 'Sobbing. Doesn’t even | *know the couple.*', mood: 'heart', tears: lt => lt < 0.8 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { K: INK, B: LAV, W: CREAM }, 790, 860, 30 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1100, 'TISSUES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 36)
    } },
]

const F = makeFilm({
  id: 'r2t0302', key: 'E', accent: ACC, ending: 'card',
  title: 'The signs as | *plus-ones.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'sagittarius', chip: 'PERFECT PAIR' },
  group: { cap: 'Invite one. | *Get a show.*' },
  lesson: { text: 'Bring the one who | makes it *fun.*', chip: 'PLUS-ONE: CHOSEN' },
  last: { text: 'Aries opens the party. | Sag *closes it.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
