// r2t0008: star_talk BELIKE, "“What's wrong?” | Zodiacs be like." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each one's most extreme answer to "what's wrong?":
//   ♈ "NOTHING!" then runs six laps · ♉ won't say, eats very loudly · ♊ "nothing" then a forty-minute rant · ♋ becomes a
//   blanket burrito · ♌ sighs until you ask again · ♍ hands you a numbered list · ♎ smiles through everything (vibes:
//   perfect?) · ♏ "you know what you did" (you don't) · ♐ "nothing lol" already out the door · ♑ works three more hours
//   · ♒ explains the problem with society · ♓ doesn't know, cries anyway
//  49.2   GROUP ENDING: "Translation: | *hug me.*"  group photo, a heart pops over the twelve.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, signChar,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, HEART,
} from '../../signs3kit.js'

const ACC = '#ff8fb1'
const DOOR = [
  'BBBBBBBBB',
  'BWWWWWWWB',
  'BWBBBBBWB',
  'BWBBBBBWB',
  'BWBBBBBWB',
  'BWWWWWYWB',
  'BWBBBBBWB',
  'BWBBBBBWB',
  'BWBBBBBWB',
  'BWWWWWWWB',
]
const DOOR_C = { B: '#8a4a2e', W: '#c98f2a', Y: GOLD }
const LAPTOP = [
  '.KKKKKKKKKK.',
  '.KSSSSSSSSK.',
  '.KSWWSSWSSK.',
  '.KSSSWWSSSK.',
  '.KSSSSSSSSK.',
  '.KKKKKKKKKK.',
  'GGGGGGGGGGGG',
]
const LAPTOP_C = { K: '#2a2350', S: '#6fc3ff', W: '#fff4e2', G: '#9aa5c4' }
const CHIPS = [
  '..RRRRRR..',
  '.RRRRRRRR.',
  'RRYYYYYYRR',
  'RRYRRRRYRR',
  'RRYYYYYYRR',
  'RRRRRRRRRR',
  '.RRRRRRRR.',
]
const CHIPS_C = { R: '#e23d4e', Y: GOLD }

function blanket(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 20, 190, 150, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8fe3ff'; x.beginPath(); x.ellipse(0, 20, 180, 140, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c4f0ff'; for (let i = -2; i <= 2; i++) x.fillRect(i * 60 - 8, -100, 16, 240)
  x.fillStyle = '#140c30'; x.fillRect(-70, -40, 140, 44)
  x.fillStyle = '#fff'; const bl = Math.sin(t * 2) > 0.95 ? 2 : 14
  x.fillRect(-46, -26 + (14 - bl) / 2, 18, bl); x.fillRect(28, -26 + (14 - bl) / 2, 18, bl)
  x.restore()
}
function whiteboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -150, 360, 280); x.fillStyle = '#fff4e2'; x.fillRect(-170, -140, 340, 260)
  x.fillStyle = '#9aa5c4'; x.fillRect(-150, 130, 16, 150); x.fillRect(134, 130, 16, 150)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE SYSTEM', 0, -105)
  x.strokeStyle = '#6b62a8'; x.lineWidth = 6
  const p = prog(lt, 0.4, 1.8)
  const pts = [[-120, -40], [0, 60], [100, -50], [-40, 30], [120, 80], [-110, 90]]
  x.beginPath(); pts.forEach(([a, b], i) => { if (i / pts.length <= p) i ? x.lineTo(a, b) : x.moveTo(a, b) }); x.stroke()
  x.fillStyle = '#e23d4e'; for (const [a, b] of pts) x.fillRect(a - 8, b - 8, 16, 16)
  x.restore()
}

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: '*“NOTHING!”* | Runs six laps.', mood: 'squint', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'NOTHING!', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 60, col: '#ff6b5a', tail: 'bl' })
      label(x, 790, 950, `LAP ${Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.25))}`, pop01(t, P.t0 + 0.7, 0.3, 2), { size: 52, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Won’t say. | Eating *very loudly.*', mood: 'squint', look: [1, 0], star: ST, squash: lt => 0.05 * Math.sin(lt * 20),
    front(x, t, lt, P) {
      drawBits(x, CHIPS, CHIPS_C, 790, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      ;['CRUNCH', 'CRUNCH.', 'CRUNCH!!'].forEach((s, i) => label(x, 700 + i * 90, 640 + i * 90, s, pop01(t, P.t0 + 0.7 + i * 0.35, 0.25, 2.4), { size: 30 + i * 6, bg: i === 2 ? '#ff6b5a' : BONE, rot: (i - 1) * 0.08 }))
    } },
  { sign: 'gemini', cap: '“Nothing.” | Then a *forty-minute rant.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'nothing.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 780, 860, 'okay so FIRST— | and THEN— | and ALSO—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: '#ffe36a', tail: 'bl' })
      label(x, 790, 1120, `MINUTE ${Math.min(40, 1 + Math.floor(Math.max(0, lt - 1.0) * 30))}`, pop01(t, P.t0 + 1.2, 0.3, 2), { size: 34, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: '“Nothing.” | Becomes *a blanket burrito.*', mood: 'neutral', look: [1, 0], star: ST, hideStar: true,
    front(x, t, lt, P) {
      const wrap = ease.inOutCubic(prog(lt, 0.5, 1.0))
      if (wrap < 1) signChar(x, t, 'cancer', 540 - 170, 880, 300, { mood: 'wide', pop: P.k * (1 - wrap), seed: 6 })
      blanket(x, 370 + 300 * ease.outCubic(prog(lt, 0.9, 1.4)), 900, wrap, t)
      bubble(x, 790, 640, 'mmf. fine.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bc' })
    } },
  { sign: 'leo', cap: '“Nothing.” | Sighs till *you ask again.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bubble(x, 760, 650 + i * 160, 'sigh' + '.'.repeat(i + 1), pop01(t, P.t0 + 0.3 + i * 0.5, 0.25, 2.2), { size: 40 + i * 16, col: i === 2 ? '#ffb34a' : BONE, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Hands you | *a numbered list.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      const unroll = ease.outCubic(prog(lt, 0.4, 1.6)), H = 160 + 380 * unroll
      x.save(); x.translate(790, 560); x.rotate(0.03); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-150, -5, 300, H + 10); x.fillStyle = '#fff4e2'; x.fillRect(-145, 0, 290, H)
      x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
      for (let i = 0; i < 14; i++) { const y = 34 + i * 38; if (y + 14 < H) { x.fillText(`${i + 1}.`, -128, y); x.fillStyle = '#9aa5c4'; x.fillRect(-70, y - 5, 160 - (i * 23) % 60, 10); x.fillStyle = INK } }
      x.restore()
    } },
  { sign: 'libra', cap: '“Nothing!” | *Smiles through everything.*', mood: 'happy', look: [0, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 790, 760, 'VIBES: PERFECT', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 42, bg: PINK, rot: -0.04 })
      label(x, 900, 880, '(?)', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 50, bg: BONE, rot: 0.1 })
      sparkles(x, t, 370, 860, P.t0 + 0.6, 8, 170, 0.1, [PINK, BONE, GOLD])
    } },
  { sign: 'scorpio', cap: '“You know | *what you did.*”', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'you know | what you did.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 980, 'YOU DON’T.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 46, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'sagittarius', cap: '“Nothing lol.” | Already *out the door.*', mood: 'sparkle', look: [1, 0], star: ST, hideStar: true,
    front(x, t, lt, P) {
      drawBits(x, DOOR, DOOR_C, 800, 900, 34 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const run = ease.inCubic(prog(lt, 0.7, 1.2))
      if (run < 1) signChar(x, t, 'sagittarius', lerp(370, 800, run), 900, 300 * (1 - 0.5 * run), { mood: 'sparkle', pop: P.k, seed: 9, alpha: 1 - run })
      bubble(x, 520, 640, 'nothing lol', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'br' })
      label(x, 800, 1150, 'BRB (NEVER)', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: '#c97bff', color: '#fff4e2', rot: -0.04 })
    } },
  { sign: 'capricorn', cap: '“Nothing.” | Works *three more hours.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, LAPTOP_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, `HOUR ${Math.min(3, 1 + Math.floor(Math.max(0, lt - 0.5) / 0.5))} OF 3`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'FEELINGS: LATER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: BONE, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Explains the problem | *with society.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { whiteboard(x, 790, 820, pop01(t, P.t0 + 0.15, 0.3, 2), lt) } },
  { sign: 'pisces', cap: 'Doesn’t know. | *Cries anyway.*', mood: 'wide', tears: lt => lt < 0.8 ? 1 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 770, 680, 'i don’t know!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: SKYB, tail: 'bl' })
      label(x, 790, 950, 'TISSUES: ALL', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 38, bg: BONE, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0008', key: 'G', accent: ACC, ending: 'group',
  title: '“What’s wrong?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Translation: | *hug me.*',
    draw(x, t, lt) {
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 540, 700, 22 * pop01(lt, 1.6, 0.4, 2.4) * (1 + 0.06 * Math.sin(t * 8)))
      hearts(x, t, 540, 1150, t - lt + 1.8, { n: 10, life: 2.4, spread: 800, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
