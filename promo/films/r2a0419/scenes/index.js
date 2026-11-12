// r2a0419: star_advice, ADVICE ROLLCALL, "Each sign, stop | apologising for…" (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: one warm, specific thing each sign can stop saying sorry for, with a light gag. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ going first (someone has to) · ♉ taking it slow (the tortoise wins) · ♊ changing your mind (version 2)
//              · ♋ caring a lot (meter: full) · ♌ taking up space · ♍ high standards (10/10) · ♎ needing time to decide
//              · ♏ feeling deeply · ♐ your honesty · ♑ resting (off the clock) · ♒ being different (one of one)
//              · ♓ crying at everything (tissues: stocked)
//  49.2        "You’re not too much. | *You’re you.*"
//  52.6        callback: "And Pisces? | *Keep the tissues.*"  Pisces and the tissue box, happy tears.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#9be7c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

// ── props
const FLAG = ['KCWCWCW', 'KWCWCWC', 'KCWCWCW', 'KWCWCWC', 'K......', 'K......', 'K......', 'K......']
const TORTOISE = ['....GGGG.....', '...GgGGgG....', '..GGGgGGGG.HH', '.GgGGGGgGGGHH', 'GGGGgGGGGGG..', '.HH..HH..HH..']
const MEDAL = ['R.....R', '.R...R.', '..RRR..', '.YYYYY.', 'YYYKYYY', 'YYKYKYY', 'YYYKYYY', '.YYYYY.']
const HOURGLASS = ['KKKKKKK', '.SSSSS.', '..SSS..', '...S...', '..S.S..', '.S...S.', 'KKKKKKK']
const HAMMOCK = ['K...............K', '.K.............K.', '..KMMMMMMMMMMMK..', '...MMMMMMMMMMM...', '....MMMMMMMMM....']
const TISSUE = ['....WWW....', '...WWWWW...', 'BBBBBBBBBBB', 'BBBBBBBBBBB', 'BBPBBPBBPBB', 'BBBBBBBBBBB', 'BBBBBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, P: PINK }

/** a meter bar filling up */
function meter(x, cx, cy, k, v, label1, col = PINK) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -40, 360, 80); x.fillStyle = '#2a2350'; x.fillRect(-170, -30, 340, 60)
  x.fillStyle = col; x.fillRect(-170, -30, 340 * v, 60)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(label1, 0, -76)
  x.restore()
}
/** bubbles rising (for the deep-feeler) */
function rising(x, t, cx, cy, n = 8) {
  x.save(); x.strokeStyle = SKYB; x.lineWidth = 4
  for (let i = 0; i < n; i++) { const ph = ((t * 0.5 + i / n) % 1 + 1) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.beginPath(); x.arc(cx + Math.sin(i * 2.3) * 120 + Math.sin(ph * 6 + i) * 14, cy - ph * 360, 8 + (i % 3) * 6, 0, Math.PI * 2); x.stroke() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Going first. | *Someone has to.*', mood: 'sparkle', star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, C: INK, W: BONE }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 * Math.sin(t * 5) })
      L(x, 790, 1110, 'LEADER: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 38)
    } },
  { sign: 'taurus', cap: 'Taking it slow. | *Slow still wins.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TORTOISE, { G: '#5fd068', g: '#2f9a4a', H: '#c7e8a0' }, lerp(700, 820, clamp(lt / 2.4)), 1000, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 720, '1ST PLACE', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.04, 44)
      sparkles(x, t, 790, 720, P.t0 + 1.3, 7, 160, 0.4)
    } },
  { sign: 'gemini', cap: 'Changing your mind. | *That’s growing.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'actually…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 900, 'OPINION: V2.0', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.04, 38)
      L(x, 790, 1060, 'UPGRADE ✓', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'cancer', cap: 'Caring a lot. | *The world needs it.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      meter(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), clamp((lt - 0.4) / 1.0), 'CARE LEVEL')
      L(x, 790, 1040, 'FULL. AND THAT’S OK', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 28)
      hearts(x, t, 790, 820, P.t0 + 1.4, { n: 5, life: 1.5, spread: 220, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Taking up space. | *The room fits you.*', mood: 'sparkle', star: { x: -150, s: 300 }, hops: [1.2],
    squash: lt => -0.06 * clamp((lt - 0.6) / 0.8),
    front(x, t, lt, P) {
      L(x, 790, 760, 'ROOM: FITS', pop01(t, P.t0 + 0.9, 0.3, 2.4), ORANGE, -0.05, 40)
      L(x, 790, 920, 'SORRY: NOT NEEDED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 28)
      sparkles(x, t, 390, 860, P.t0 + 1.2, 8, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'High standards. | *They’re a gift.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MEDAL, { R: RED, Y: GOLD, K: '#c98f2a' }, 790, 860, 24 * pop01(t, P.t0 + 0.3, 0.35, 2))
      sparkles(x, t, 790, 860, P.t0 + 0.6, 7, 170, 0.2)
      L(x, 790, 1110, 'CARE: 10/10', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 36)
    } },
  { sign: 'libra', cap: 'Needing time to decide. | *Take it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOURGLASS, { K: WOOD, S: '#ffe7a8' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.min(Math.PI, Math.max(0, (lt - 1.2) * 4)) })
      L(x, 790, 1110, 'NO RUSH', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, 0.04, 44)
    } },
  { sign: 'scorpio', cap: 'Feeling deeply. | *It’s a superpower.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { rising(x, t, 790, 1100) },
    front(x, t, lt, P) {
      meter(x, 790, 760, pop01(t, P.t0 + 0.3, 0.3, 2), clamp((lt - 0.5) / 1.0), 'DEPTH', '#ff5c8a')
      L(x, 790, 1000, 'DEPTH: MAX ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, -0.04, 34)
    } },
  { sign: 'sagittarius', cap: 'Your honesty. | *It’s a kindness.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'real talk?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 830, 980, 160 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [-1, 0], seed: 14, glyph: false })
      L(x, 760, 880, 'THANK YOU, HONESTLY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 26)
    } },
  { sign: 'capricorn', cap: 'Resting. | *You earned it.*', mood: 'sleepy', star: { x: 120, y: -20, s: 230 },
    back(x, t, lt, P) { drawBits(x, HAMMOCK, { K: WOOD, M: '#7dffb0' }, 660, 940, 30 * pop01(t, P.t0 + 0.1, 0.35, 1.8), { rot: 0.04 * Math.sin(t * 1.5) }) },
    front(x, t, lt, P) {
      L(x, 380, 640, 'OFF THE CLOCK', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 34)
      L(x, 380, 1120, 'EMAILS: LATER', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Being different. | *That’s the point.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      L(x, 790, 880, 'ONE OF ONE', pop01(t, P.t0 + 0.4, 0.3, 2.6), '#8fe3ff', -0.05, 50)
      sparkles(x, t, 790, 880, P.t0 + 0.5, 8, 200, 0.6)
      L(x, 790, 1080, 'NO COPIES EXIST', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Crying at everything. | *Feel it all.*', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 790, 960, 20 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 720, 'TISSUES: STOCKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 32)
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0419', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign, stop | *apologising for…*',
  cameos: CAMEOS,
  group: { cap: 'You’re not too much. | *You’re you.*' },
  last: {
    text: 'And Pisces? | *Keep the tissues.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 400, 1080, 280 * k, { mood: 'heart', seed: 7, look: [1, 0], tears: 3, hops: [t0 + 1.3] })
      drawBits(x, TISSUE, TISSUE_C, 730, 1120, 18 * pop01(t, t0 + 0.6, 0.4, 2))
      if (lt > 1.2) hearts(x, t, 560, 1000, t0 + 1.2, { n: 7, life: 1.8, spread: 380, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
