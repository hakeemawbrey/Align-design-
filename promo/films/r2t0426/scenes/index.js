// r2t0426: THE SIGNS AS… v3 SOLO, "Being a Scorpio | be like." (~47 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: group.
//   0.0–3.6    "Being a Scorpio | *be like.*"  One big Scorpio pops in, then dives away.
//   3.6–37.8   nine cards (3.8 s each):
//              "whatever." (a scroll of an essay unrolls) · forgave you in 2019, still has the file · forty black shirts,
//              "variety" · learns your sign before your name · sunglasses indoors, emotionally · says nothing, you tell
//              them everything · "k." was a test · got dumped, glowed up out of spite · never says "love you", gives the hoodie
//  37.8        "Scary? | *Softest one here.*"  The big Scorpio comes back, all hearts (the ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, inSprite, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, INTER, MONO,
} from '../../signs3kit.js'

const PURPLE = '#c97bff', PAPER = '#fff4e2'

// ── props
const SHIRT = [
  '...KK.KK...',
  'KKKKKKKKKKK',
  'KKKKKKKKKKK',
  '.KKKKKKKKK.',
  '...KKKKK...',
  '...KKKKK...',
  '...KKKKK...',
  '...KKKKK...',
]
const SHIRT_C = { K: '#2b2438' }
const MIRROR = [
  '...GGGGG...',
  '..GSSSSSG..',
  '.GSWSSSSSG.',
  '.GSSWSSSSG.',
  '.GSSSSSSSG.',
  '.GSSSSSSSG.',
  '.GSSSSSSSG.',
  '..GSSSSSG..',
  '...GGGGG...',
  '.....G.....',
  '...GGGGG...',
]
const MIRROR_C = { G: GOLD, S: '#8fe3ff', W: '#ffffff' }
const HOODIE = [
  '....HHHHH....',
  '...HH...HH...',
  '..HHH...HHH..',
  '.HHHHHHHHHHH.',
  'HHHHHSHSHHHHH',
  'HHHHHSHSHHHHH',
  'HH.HHHHHHH.HH',
  'HH.HHHHHHH.HH',
  'HH.HPPPPPH.HH',
  'HH.HPPPPPH.HH',
  '...HHHHHHH...',
]
const HOODIE_C = { H: '#6b3fa8', S: BONE, P: '#57338c' }

/** a paper scroll that unrolls downward to length u (0..1) */
function scroll(x, cx, top, k, u) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  const W = 250, H = 30 + 430 * u
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -5, W + 10, H + 10)
  x.fillStyle = PAPER; x.fillRect(-W / 2, 0, W, H)
  x.fillStyle = '#b8ad97'
  for (let y = 26; y < H - 18; y += 26) x.fillRect(-W / 2 + 22, y, (y / 26) % 3 === 0 ? 150 : 200, 8)
  x.fillStyle = INK; x.fillRect(-W / 2 - 18, H - 8, W + 36, 26)
  x.fillStyle = '#d9c28e'; x.fillRect(-W / 2 - 14, H - 4, W + 28, 18)
  x.restore()
}
/** a manila case file */
function caseFile(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  const W = 330, H = 250
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10); x.fillRect(-W / 2 - 5, -H / 2 - 45, 140, 50)
  x.fillStyle = '#e8c27a'; x.fillRect(-W / 2, -H / 2, W, H); x.fillRect(-W / 2, -H / 2 - 40, 130, 44)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('2019', -W / 2 + 65, -H / 2 - 16)
  x.font = `800 40px ${INTER}`; x.fillText('THE INCIDENT', 0, -40)
  x.fillStyle = '#b08a4a'; x.fillRect(-120, 10, 240, 8); x.fillRect(-120, 40, 200, 8)
  if (stamp > 0.01) {
    x.save(); x.translate(10, 80); x.rotate(-0.12); x.scale(stamp, stamp)
    x.strokeStyle = '#2fc79a'; x.lineWidth = 6; x.strokeRect(-120, -28, 240, 56)
    x.fillStyle = '#2fc79a'; x.font = `800 34px ${INTER}`; x.fillText('FORGIVEN', 0, 2)
    x.restore()
  }
  x.restore()
}
/** a match profile: the sign filled in, the name still blank */
function signFirst(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  const W = 340, H = 300
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = PAPER; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('NAME:', -W / 2 + 24, -70); x.fillText('SIGN:', -W / 2 + 24, 30)
  x.fillStyle = '#9aa5c4'; x.fillRect(-W / 2 + 140, -72, 160, 6)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('???', -W / 2 + 160, -90)
  if (lt > 0.6) { x.fillStyle = '#ffb34a'; x.font = `800 44px ${INTER}`; x.fillText('LEO ✓', -W / 2 + 140, 30) }
  if (lt > 1.0) { x.fillStyle = '#6b62a8'; x.font = `700 24px ${MONO}`; x.fillText('RISING: GEMINI ✓', -W / 2 + 24, 100) }
  x.restore()
}
/** sunglasses on the sprite, sliding down from the forehead */
function shades(x, F, k) {
  if (k <= 0.01) return
  inSprite(x, F, () => {
    const dy = -9 * (1 - k)
    x.fillStyle = INK; x.fillRect(5.5, 16 + dy, 11, 7); x.fillRect(19.5, 16 + dy, 11, 7); x.fillRect(15, 17 + dy, 6, 1.6)
    x.fillStyle = '#2b2438'; x.fillRect(6.5, 17 + dy, 9, 5); x.fillRect(20.5, 17 + dy, 9, 5)
    x.fillStyle = '#ffffff'; x.fillRect(7.5, 17.6 + dy, 2, 1.2); x.fillRect(21.5, 17.6 + dy, 2, 1.2)
  })
}

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Says “whatever.” | Means *a whole essay.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 600, 'whatever.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      scroll(x, 790, 690, pop01(t, P.t0 + 0.8, 0.3, 2), ease.inOutCubic(prog(lt, 0.8, 2.0)))
      label(x, 790, 1150, 'PAGE 1 OF 40', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Forgave you in 2019. | Still *has the file.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      caseFile(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.9, 0.25, 2.6))
      label(x, 780, 1110, 'NOT FORGOTTEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PURPLE, color: PAPER, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Owns forty black shirts. | Calls it *variety.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = BONE; x.fillRect(612, 760, 356, 8); x.restore() }
      for (let j = 0; j < 5; j++) drawBits(x, SHIRT, SHIRT_C, 650 + j * 70, 830 + (j % 2) * 12, 9 * pop01(t, P.t0 + 0.25 + j * 0.1, 0.25, 2), { outline: '#9aa5c4', rot: (j - 2) * 0.03 })
      bubble(x, 790, 1040, 'this one’s | different.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 640, 'NEW ARRIVAL: BLACK', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Learns your sign | *before your name.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      signFirst(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'PRIORITIES', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sunglasses indoors. | *Emotionally.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      shades(x, F, ease.outCubic(prog(lt, 0.3, 0.6)))
      label(x, 790, 760, 'FEELINGS: HIDDEN', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: PURPLE, color: PAPER, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 900, '(BARELY)', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.05 })
      if (lt > 1.6) hearts(x, t, 370, 760, P.t0 + 1.7, { n: 3, life: 1.2, spread: 90, cell: 6, seed: 4 })
    } },
  { sign: S, cap: 'Says nothing. | You *tell them everything.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 800, 1000, 210 * k, { mood: 'wide', look: [-1, 0], seed: 17, glyph: false })
      bubble(x, 800, 720, 'okay so i’ve | never told anyone…', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      const n = Math.min(214, Math.floor(Math.max(0, lt - 1.0) * 180))
      label(x, 500, 1150, `SECRETS KEPT: ${n}`, pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Texted you “k.” | It was *a test.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'k.', pop01(t, P.t0 + 0.3, 0.25, 2.4), { size: 130, col: LAV, tail: 'bl' })
      label(x, 790, 1030, 'YOUR REPLY: PENDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'RESULTS: SEALED', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: PURPLE, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Got dumped. | Glowed up *out of spite.*', mood: lt => lt > 1.0 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, MIRROR, MIRROR_C, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 370, 860, P.t0 + 1.0, 8, 200, 0.4)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 170, 0.1)
      label(x, 790, 1150, 'GLOW-UP: PETTY', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Never says “love you.” | Gives you *the hoodie.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, HOODIE, HOODIE_C, lerp(560, 790, ease.outCubic(prog(lt, 0.6, 1.1))), 890, 20 * k, { rot: 0.05 })
      label(x, 790, 640, 'TRANSLATION: LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.5, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2t0426', key: 'C', accent: PURPLE, solo: S, ending: 'group',
  title: 'Being a Scorpio | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Scary? | *Softest one here.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
