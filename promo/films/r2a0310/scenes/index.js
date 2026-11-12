// r2a0310: star_advice, ADVICE ROLLCALL, "Each sign's gentle | goal this month." (signs3kit social cut, music: lofi · G). Ending: group.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
/** a square sticky note with a few lines of text */
function note(x, cx, cy, k, lines, { rot = -0.05, bg = '#ffe76a', size = 34 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -134, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304); x.fillStyle = bg; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, (i - (lines.length - 1) / 2) * size * 1.25))
  x.restore()
}
/** a pixel phone with a header bar and chat chips: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** a crossed-out sticker swapped for a new one */
function swapLabel(x, cx, cy, lt, at, from, to, { size = 40, fromBg = '#9aa5c4', toBg = MINT } = {}) {
  if (lt < at) { L(x, cx, cy, from, 1, fromBg, -0.04, size); return }
  const p = clamp((lt - at) / 0.25)
  if (p < 1) {
    L(x, cx, cy, from, 1, fromBg, -0.04, size)
    x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(cx - 150, cy + 10); x.lineTo(cx - 150 + 300 * p, cy - 10); x.stroke(); x.restore()
    return
  }
  L(x, cx, cy, to, pop01(lt, at + 0.3, 0.3, 2.4), toBg, 0.04, size)
}
/** little "z z z" drifting up */
function zzz(x, t, cx, cy, { alpha = 1, size = 40 } = {}) {
  x.save(); x.fillStyle = BONE; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = ((t * 0.6 + i / 3) % 1 + 1) % 1; x.globalAlpha = alpha * Math.sin(Math.PI * ph); x.fillText('z', cx + i * 26 + Math.sin(ph * 6) * 8, cy - ph * 120) }
  x.restore()
}
const ST = { x: -170 }

const ACC = '#9fd8a8'
const BOOK = ['KKKKKKKKKKKKKK', 'KGGGGGGKWWWWWK', 'KGYYYYGKWKKKWK', 'KGGGGGGKWWWWWK', 'KGYYYYGKWKKKWK', 'KGGGGGGKWWWWWK', 'KGGGGGGKWKKKWK', 'KKKKKKKKKKKKKK']
const CAKE = ['.....Y.....', '.....R.....', '.....W.....', '.KKKKKKKKK.', 'KPPPPPPPPPK', 'KCCCCCCCCCK', 'KPPPPPPPPPK', 'KCCCCCCCCCK', 'KKKKKKKKKKK']
const CASE = ['...KKKKK...', '...K...K...', 'KKKKKKKKKKK', 'KOOOOOOOOOK', 'KOKOOOOOKOK', 'KOKOOOOOKOK', 'KOKOOOOOKOK', 'KOOOOOOOOOK', 'KKKKKKKKKKK', '.K.......K.']
const GLASSW = ['K......K', 'KBBBBBBK', 'KBWBBBBK', 'KBBBBBBK', 'KBBBBBBK', '.KBBBBK.', '.KKKKKK.']
const FRAME = ['KKKKKKKKKK', 'KYYYYYYYYK', 'KYSSSSSSYK', 'KYSGGSSSYK', 'KYSSSSSGYK', 'KYSSSSSSYK', 'KYYYYYYYYK', 'KKKKKKKKKK']
const LADLE = ['.KKK.', 'KMMMK', 'KMMMK', '.KKK.', '..K..', '..K..', '..K..', '..K..', '..K..']

const CAMEOS = [
  { sign: 'aries', cap: 'Walk somewhere. | *Don’t run.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      L(x, 790, 720, 'PACE: STROLL', pop01(t, P.t0 + 0.3, 0.3, 2), ACC, 0.04, 38)
      L(x, 790, 880, 'FLOWERS: NOTICED', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 32)
      bubble(x, 790, 1060, 'oh, this is nice', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Take a new route | *to the usual café.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -140, 300, 280); x.fillStyle = '#e8f3d6'; x.fillRect(-142, -132, 284, 264)
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 14; x.beginPath(); x.moveTo(-110, 100); x.lineTo(-110, -90); x.lineTo(110, -90); x.stroke()
        const p = clamp((lt - 0.5) / 1.0)
        x.strokeStyle = RED; x.lineWidth = 8; x.setLineDash([16, 10]); x.beginPath(); x.moveTo(-110, 100); x.lineTo(-110 + 220 * Math.min(1, p * 2), 100); if (p > 0.5) x.lineTo(110, 100 - 190 * (p - 0.5) * 2); x.stroke(); x.setLineDash([])
        x.fillStyle = '#8a4a2e'; x.fillRect(90, -110, 40, 40)
        x.restore()
      }
      L(x, 790, 1100, 'ROUTE: NEW · CAFÉ: SAME', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'gemini', cap: 'Finish *one* book | before buying three.', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOOK, { K: INK, G: '#ffd23a', Y: '#ff9a4a', W: CREAM }, 790, 860, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const pg = Math.round(312 * ease.inOutQuad(prog(lt, 0.4, 1.4)))
      L(x, 790, 680, `PAGE ${pg} OF 312`, pop01(t, P.t0 + 0.4, 0.3, 2), GOLD, 0.04, 32)
      if (lt > 1.4) L(x, 790, 1060, 'THE END ✓', pop01(t, P.t0 + 1.8, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'cancer', cap: 'Let someone else | *cook for you.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'leo', 830, 950, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 13, glyph: false })
      drawBits(x, LADLE, { K: INK, M: '#c9d2e8' }, 930, 880, 12 * k, { rot: 0.4 + 0.2 * Math.sin(t * 5) })
      L(x, 800, 700, 'CHEF: NOT YOU', pop01(t, P.t0 + 0.8, 0.3, 2), PINK, 0.04, 34)
      L(x, 800, 1120, 'YOU: SIT. ENJOY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Rest with | *no audience.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      L(x, 790, 720, 'CROWD: NONE', pop01(t, P.t0 + 0.3, 0.3, 2), '#9aa5c4', 0.04, 36)
      L(x, 790, 880, 'SPOTLIGHT: OFF', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
      L(x, 790, 1040, 'STILL A STAR ✦', pop01(t, P.t0 + 1.6, 0.3, 2.4), '#ffb34a', 0.04, 34)
    } },
  { sign: 'virgo', cap: 'Leave *one* thing | a little crooked.', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const r = lt < 0.6 ? 0 : 0.18 * ease.outBack(clamp((lt - 0.6) / 0.4))
      drawBits(x, FRAME, { K: INK, Y: GOLD, S: SKYB, G: '#5fd068' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: r })
      L(x, 790, 1090, 'CROOKED: ON PURPOSE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Share your opinion | *first, for once.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.9],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'I want tacos.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      L(x, 790, 900, 'DECIDED IN: 1 SEC', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.04, 30)
      L(x, 790, 1040, 'EVERYONE: RELIEVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Tell *one* secret | to someone safe.', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 850, 980, 160 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 14, glyph: false })
      bubble(x, 740, 700, 'ok, so… | I love musicals.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
      L(x, 760, 1130, 'SECRET: SAFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Unpack the bag | *from the last trip.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CASE, { K: INK, O: '#ff9a4a' }, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'PACKED SINCE: MARCH', pop01(t, P.t0 + 0.6, 0.3, 2), GOLD, 0.04, 30)
      L(x, 790, 1110, 'UNPACKED ✓ (FINALLY)', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Celebrate a win | *before the next goal.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CAKE, { K: INK, P: PINK, C: CREAM, Y: GOLD, R: '#ff9a4a', W: '#ffffff' }, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9) sparkles(x, t, 790, 820, P.t0 + 0.9, 8, 170, 0.3)
      L(x, 790, 680, 'PARTY: 10 MIN', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, 0.04, 34)
      L(x, 790, 1110, '(SCHEDULED, BUT STILL)', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 26)
    } },
  { sign: 'aquarius', cap: 'Call a friend | *just to say hi.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING…', headCol: SKYB, lines: [
        ['no reason. hi!', BONE, pop01(t, P.t0 + 0.6, 0.25, 2.2), true],
        ['best call ever', MINT, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
      ] })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Drink water | *between happy cries.*', mood: lt => lt > 1.0 ? 'happy' : 'wide', tears: lt => lt > 1.0 ? 2 : 3, star: ST,
    front(x, t, lt, P) {
      drawBits(x, GLASSW, { K: INK, B: SKYB, W: '#ffffff' }, 790, 900, 18 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 700, 'HYDRATION: ✓', pop01(t, P.t0 + 0.8, 0.3, 2), SKYB, 0.04, 34)
      L(x, 790, 1080, 'TEARS: ALSO ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0310', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s gentle | *goal this month.*',
  cameos: CAMEOS,
  group: {
    cap: 'Small goals. | *Soft month.*',
    draw(x, t, lt) { L(x, 540, 760, 'GOALS: GENTLE ✓', pop01(t, t - lt + 1.4, 0.35, 2.4), ACC, -0.03, 40) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
