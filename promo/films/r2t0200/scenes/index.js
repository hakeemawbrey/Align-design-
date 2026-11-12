// r2t0200: star_talk, BE LIKE (twelve signs), "Faking the plot? | Zodiacs be like." (~57 s vertical, signs3kit social cut, lofi · F)
// Movie night: each sign pretending to understand the plot, in zodiac order, each at its most extreme. Ending: callback.
//   0.0–3.6    "Faking the plot? | *Zodiacs be like.*"
//   3.6–49.2   ♈ yelled "I KNEW IT!", knew nothing · ♉ watched the popcorn, not the screen · ♊ explaining the twist (wrong
//              movie) · ♋ no idea who's who, loves them all · ♌ confused, nodding confidently (NODS: 40) · ♍ took notes,
//              still lost (???) · ♎ agrees with whoever spoke last · ♏ stares like they get it (ANALYZING…) · ♐ fell asleep,
//              five stars · ♑ checked the director's birth chart · ♒ the villain "had a point" · ♓ followed nothing, sobbed
//  49.2        "Nobody got it. | *Five stars.*"
//  52.6        CALLBACK: "Credits rolling. | *Leo, still nodding.*"  Leo is back, nodding, the counter still climbing.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', POP = '#fff1c8'

const BUCKET = ['.PPPPPPPP.', 'PPPPPPPPPP', 'RWRWRWRWRW', 'RWRWRWRWRW', '.RWRWRWRW.', '.RWRWRWRW.', '..RWRWRW..']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, X, Y, size, col = INK, font = INTER, weight = 800) { x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, X, Y) }
// a little movie screen glowing behind the star (top right)
function screen(x, t, k) {
  if (!box(x, 790, 700, 300, 170, k, '#9ab8e8')) return
  x.fillStyle = '#6b8ac8'; for (let i = 0; i < 3; i++) x.fillRect(-140 + ((t * 60 + i * 110) % 300), -40 + i * 30, 60, 20)
  x.restore()
}
const nodSq = t => 0.08 * Math.max(0, Math.sin(t * 9))

const CAMEOS = [
  { sign: 'aries', cap: 'Yelled “I KNEW IT!” | *Knew nothing.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 0.8],
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'I KNEW IT!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: '#ffd0c4', tail: 'bl' })
      label(x, 790, 1060, 'THEY DID NOT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Watched the popcorn. | *Not the screen.*', mood: 'heart', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, BUCKET, { P: POP, R: RED, W: '#fff' }, 790, 940, 24 * k)
      if (k > 0.5) for (let i = 0; i < 5; i++) { const ph = (t * 0.9 + i / 5) % 1; drawBits(x, ['.P.', 'PPP', '.P.'], { P: POP }, 720 + i * 35, 820 - Math.sin(Math.PI * ph) * 120, 8) }
      label(x, 790, 680, 'PLOT: ???', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Explained the twist. | *Wrong movie.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 780, 690, 'ok so basically…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 810, 980, 180 * k, { mood: lt > 1.5 ? 'squint' : 'neutral', look: [-1, 0], seed: 52, glyph: false })
      label(x, 810, 1140, 'DIFFERENT FILM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#ffd23a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'No idea who’s who. | *Loves them all.*', mood: 'heart', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 1060, P.t0 + 0.6, { n: 8, life: 2.6, spread: 260, cell: 8, seed: 3 })
      label(x, 790, 1120, 'WHO IS STEVE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#cfe0ff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Confused. | Nodding *confidently.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -170 }, squash: lt => nodSq(lt), hops: [0.6, 1.0, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.8) * 40)
      label(x, 790, 820, `NODS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 56, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1040, 'mm, yes.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Took notes. | *Still lost.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      if (box(x, 790, 880, 270, 330, pop01(t, P.t0 + 0.2, 0.35, 2), '#fbf7ee', 0.05)) {
        x.fillStyle = MINT; x.fillRect(-135, -165, 270, 50); text(x, 'NOTES', 0, -140, 26, INK, MONO, 700)
        const n = Math.floor(clamp((lt - 0.3) / 1.4) * 3.99)
        for (let i = 0; i < n; i++) text(x, i < 2 ? ['twins?', 'a boat??'][i] : '???', 0, -60 + i * 70, 40)
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Agrees with whoever | *spoke last.*', mood: 'happy', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'it was a dream!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 32, col: '#d8dbe8', tail: 'br' })
      bubble(x, 790, 820, 'no, it was real!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, col: '#d8dbe8', tail: 'br' })
      bubble(x, 560, 1030, 'totally. both.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: PINK, tail: 'bc' })
    } },
  { sign: 'scorpio', cap: 'Stares like they get it. | *They don’t.*', mood: 'squint', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, pop01(t, P.t0 + 0.2, 0.35, 2))
      const d = '.'.repeat(1 + Math.floor(t * 3) % 3)
      label(x, 790, 1000, 'ANALYZING' + d, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Fell asleep. | Gave it *five stars.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.5) / 1.0) * 5.99)
      label(x, 790, 860, '★'.repeat(Math.max(1, n)), pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 50, bg: GOLD, rot: 0.03 })
      label(x, 790, 1060, 'MASTERPIECE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Checked the director’s | *birth chart.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k); x.rotate(t * 0.15)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, 7); x.fill(); x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(0, 0, 130, 0, 7); x.fill()
        x.strokeStyle = '#6b62a8'; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 90, Math.sin(a) * 90); x.lineTo(Math.cos(a) * 130, Math.sin(a) * 130); x.stroke() }
        x.restore()
      }
      label(x, 790, 1080, 'MAKES SENSE NOW', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'The villain? | *“Had a point.”*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 790, 960, 'honestly? | fair.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Followed nothing. | *Sobbed at the end.*', mood: lt => lt > 1.0 ? 'wide' : 'neutral', tears: lt => lt > 1.0 ? 3 : 1, look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      screen(x, t, pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.9) label(x, 790, 700, 'THE END', pop01(t, P.t0 + 0.9 * 1.29, 0.3, 2.2), { size: 44, bg: BONE, rot: 0, font: MONO, weight: 700 })
      label(x, 790, 1060, 'SO BEAUTIFUL (WHY?)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0200', key: 'F', accent: GOLD, ending: 'callback',
  title: 'Faking the plot? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody got it. | *Five stars.*' },
  last: {
    text: 'Credits rolling. | *Leo, still nodding.*',
    draw(x, t, lt) {
      const t0 = t - lt
      x.save(); x.globalAlpha = clamp((lt - 0.2) / 0.5)
      for (let i = 0; i < 6; i++) { const y = 1500 - ((lt * 90 + i * 90) % 540); x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(440 - (i % 2) * 40, y, 200 + (i % 2) * 80, 14) }
      x.restore()
      const s = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (s > 0.01) signChar(x, t, 'leo', 540, 1000, 300 * s, { mood: 'squint', look: [0, -1], seed: 44, squash: nodSq(t) })
      const n = 40 + Math.floor(lt * 12)
      label(x, 540, 760, `NODS: ${n}`, pop01(t, t0 + 1.0, 0.3, 2.2), { size: 48, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
