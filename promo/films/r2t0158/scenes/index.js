// r2t0158: star_talk SOLO (libra), "Libras running late | *be like.*" (~45 s vertical, signs3kit social cut, music:
// lofi · G). Nine cards, each the most extreme Libra version of running late:
//   "five minutes" (an hour) · outfit seven · couldn’t pick shoes, brought both · texted "omw" from the shower
//   · stopped to straighten a stranger’s painting · arrived late with flowers for everyone · mirror check, again
//   · held the door for the whole street · late to the first date, the match is still smitten
//  37.8   "Late, but | *gorgeous.*"  Libra comes back, big.
//  41.2   callback: "Picked the shoes. | *One of each.*"  the two shoes from card 3 return, mismatched.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', ROSE = '#ff9ad5'
const ST = { x: -170 }
const S = 'libra'

const SHOE = [
  '.........HH',
  '........HHH',
  'SSSS...HHH.',
  'SSSSSSSSSH.',
  'SSSSSSSSSS.',
  'WWWWWWWWWWW',
]
const CLOCK_R = 70
function clock(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, CLOCK_R + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, CLOCK_R, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 56 - 4, Math.sin(a) * 56 - 4, 8, 8) }
  const a = -Math.PI / 2 + lt * 6
  x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 52, Math.sin(a) * 52); x.stroke()
  x.strokeStyle = INK; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a / 12) * 34, Math.sin(a / 12) * 34); x.stroke()
  x.restore()
}
const SHIRT = [
  'CC.....CC',
  'CCCC.CCCC',
  'CCCCCCCCC',
  '.CCCCCCC.',
  '..CCCCC..',
  '..CCCCC..',
  '..CCCCC..',
]
const FLOWER = ['.P.P.', 'PPYPP', '.PPP.', '..G..', '..G..']
const MIRROR = [
  '..FFFFF..',
  '.FMMMMMF.',
  'FMMMMMMMF',
  'FMMMMMMMF',
  'FMMMMMMMF',
  'FMMMMMMMF',
  'FMMMMMMMF',
  '.FMMMMMF.',
  '..FFFFF..',
  '....F....',
  '...FFF...',
]

function sheet(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function txt(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}

const CAMEOS = [
  { sign: S, cap: 'Said “five minutes.” | It’s been *an hour.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 800, 640, 'almost ready!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 800, 1010, 'STILL ALMOST', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Outfit change | *number seven.*', mood: lt => lt > 1.6 ? 'squint' : 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const i = Math.min(6, Math.floor(lt / 0.3))
      const col = [PINK, SKYB, MINT, GOLD, LAV, ORANGE, ROSE][i]
      drawBits(x, SHIRT, { C: col }, 800, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.08) })
      label(x, 800, 1040, `OUTFIT ${i + 1}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Couldn’t pick the shoes. | *Brought both pairs.*', mood: 'wink', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, SHOE, { S: RED, H: RED, W: BONE }, 800, 730, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08 })
      drawBits(x, SHOE, { S: SKYB, H: SKYB, W: BONE }, 800, 900, 22 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.08 })
      label(x, 800, 1060, 'DECIDE LATER', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted “omw.” | Still *in the shower.*', mood: 'happy', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      x.fillStyle = SKYB
      for (let i = 0; i < 14; i++) { const ph = (t * 1.6 + i * 0.37) % 1; x.fillRect(240 + (i * 53) % 280, 560 + ph * 480, 6, 26) }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (sheet(x, 800, 820, 230, 360, '#2a2350', k, 0.05)) {
        x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 320)
        x.fillStyle = PINK; x.fillRect(-80, -60, 160, 70); txt(x, 'omw!!', 0, -25, 40, INK, MONO, 700)
        x.restore()
      }
      bubble(x, 410, 620, 'la la la', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: S, cap: 'Stopped to straighten | a *stranger’s painting.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), rot = lerp(0.3, 0, ease.inOutCubic(prog(lt, 0.7, 1.4)))
      if (sheet(x, 800, 790, 280, 220, GOLD, k, rot)) {
        x.fillStyle = '#5b8adf'; x.fillRect(-120, -90, 240, 180)
        x.fillStyle = '#5fd17a'; x.fillRect(-120, 20, 240, 70)
        x.fillStyle = BONE; x.beginPath(); x.arc(60, -30, 26, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      label(x, 800, 1020, lt > 1.4 ? 'BALANCED.' : 'NOPE.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: lt > 1.4 ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.4) sparkles(x, t, 800, 790, P.t0 + 1.4, 7, 180, 0.3)
    } },
  { sign: S, cap: 'Arrived late. | With *flowers for all.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 7; i++) drawBits(x, FLOWER, { P: [PINK, ROSE, LAV, GOLD][i % 4], Y: GOLD, G: '#5fd17a' }, 690 + (i % 4) * 70 + (i > 3 ? 35 : 0), 780 + (i > 3 ? 90 : 0), 18 * k, { rot: (i - 3) * 0.08 })
      bubble(x, 800, 620, 'sorry!! for you!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1030, 'FORGIVEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'One last mirror check. | *The eleventh one.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MIRROR, { F: GOLD, M: '#bfe8ff' }, 800, 830, 30 * k)
      if (k > 0.6) signChar(x, t, S, 800, 790, 130, { mood: Math.floor(lt * 2.5) % 2 ? 'sparkle' : 'wink', seed: 81, glyph: false, glow: 0.3, alpha: 0.85 })
      label(x, 800, 1090, 'CHECK #11', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: ROSE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Held the door | for *the whole street.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 620, 'after you!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      const ids = ['taurus', 'virgo', 'capricorn', 'cancer', 'sagittarius', 'aquarius']
      for (let i = 0; i < ids.length; i++) {
        const ph = (lt * 0.8 + i / ids.length) % 1
        signChar(x, t, ids[i], lerp(960, 620, ph), 980, 150 * pop01(t, P.t0 + 0.3, 0.3, 2), { mood: 'happy', look: [-1, 0], seed: 50 + i, glyph: false, alpha: Math.sin(Math.PI * ph) })
      }
    } },
  { sign: S, cap: 'Late to the first date. | Match: *still smitten.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'aries', 820, 960, 200 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 1.3] })
      bubble(x, 800, 640, 'worth the wait', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      hearts(x, t, 820, 860, P.t0 + 1.3, { n: 5, life: 1.5, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0158', key: 'G', accent: ROSE, solo: S, ending: 'callback',
  title: 'Libras running late | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Late, but | *gorgeous.*', mood: 'sparkle' },
  last: {
    text: 'Picked the shoes. | *One of each.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, SHOE, { S: RED, H: RED, W: BONE }, 400, 1080, 26 * pop01(t, t0 + 0.5, 0.35, 2), { rot: -0.06 })
      drawBits(x, SHOE, { S: SKYB, H: SKYB, W: BONE }, 680, 1080, 26 * pop01(t, t0 + 0.8, 0.35, 2), { rot: 0.06, sx: -1 })
      label(x, 540, 1270, 'ICONIC', pop01(t, t0 + 1.3, 0.3, 2.4), { size: 56, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1080, t0 + 1.3, 8, 240, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
