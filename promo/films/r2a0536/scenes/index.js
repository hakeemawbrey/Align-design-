// r2a0536: star_advice, ADVICE SOLO (scorpio), "Scorpio, soft | *is not weak.*" (signs3kit social cut, music: lofi · D).
// One sign the whole way: nine relatable Scorpio truths, each with a warm reframe and one light gag.
//   secret tear at a puppy video · "i missed you" said, still standing · the vault opens a crack · the armour clocks off
//   · asking for a hug is a power move · lost the staring contest (worth it) · the bear named Mr. Fangs
//   · even the birth chart says "soft: secretly" · "that hurt" said out loud, level up
//   group "Still intense. | *Just softer.*"  lesson "Soft and strong | can *share a heart.*"  last "Mr. Fangs | *is proud of you.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { phone, note, bits, ORANGE, RED, WOOD, PAPER, SLATE } from '../props.js'

const ACC = '#ff6b8a', S = 'scorpio', ST = { x: -180 }
const BEAR = ['.BB.....BB.', 'BBBBBBBBBBB', '.BBBBBBBBB.', '.BKBBBBBKB.', '.BBBLLLBBB.', '.BBBLKLBBB.', '..BBBLBBB..', '.BBBBBBBBB.', 'BBBPPPPPBBB', 'BBBPPPPPBBB', '.BBBBBBBBB.', '.BB.....BB.']
const BEAR_C = { B: '#c98f5a', K: INK, L: '#f2d3a8', P: PINK }
const SHIELD = ['SSSSSSSSS', 'SGGGGGGGS', 'SGGGRGGGS', 'SGGRRRGGS', 'SGGGRGGGS', '.SGGGGGS.', '..SGGGS..', '...SSS...']
const SHIELD_C = { S: '#9aa5c4', G: '#5a4a8a', R: ACC }

function vault(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 290, 290)
  x.fillStyle = INK; x.fillRect(-150, -150, 300, 300); x.fillStyle = '#6b6f8a'; x.fillRect(-140, -140, 280, 280)
  x.fillStyle = '#fff1b0'; x.globalAlpha = 0.9 * open; x.fillRect(120, -136, 18 * open + 4, 272); x.globalAlpha = 1
  x.fillStyle = '#8a8fa8'; x.fillRect(-120, -120, 240, 240)
  x.save(); x.rotate(open * 3); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#c9d4ff'; x.beginPath(); x.arc(0, 0, 54, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.fillRect(-5, -54, 10, 30); x.restore()
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Cried at a puppy video? | *Big heart, not weak.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', tears: lt => lt > 0.7 ? 1 : 0, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { top: '11:58', head: 'NEW VIDEO', msg: 'puppy | meets | snow', bg: SKYB })
      label(x, 800, 620, 'ONE SECRET TEAR', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saying “I missed you” | *won’t break you.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'i... missed | you.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, col: PINK, tail: 'bl' })
      label(x, 800, 960, 'STILL STANDING ✓', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 900, P.t0 + 1.5, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'Letting someone in | *is brave, not risky.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      vault(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inOutCubic(prog(lt, 0.8, 1.5)))
      label(x, 800, 620, 'VAULT: OPEN 1%', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The armour can rest. | *You’re safe here.*', mood: lt => lt > 1.4 ? 'sleepy' : 'neutral', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.7, 1.3))
      drawBits(x, SHIELD, SHIELD_C, 800, lerp(820, 1080, d), 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0, 0.5, d) })
      label(x, 800, 640, 'ARMOUR: OFF DUTY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Asking for a hug | *is a power move.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST, hops: [1.3, 1.8],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'hug? | (just one.)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 800, 960, 'POWER MOVE', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 44, bg: ACC, color: '#fff', rot: -0.05 })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.8, spread: 180, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Blinking first | *is allowed.*', mood: lt => (lt > 1.0 && lt < 1.15) ? 'sleepy' : lt > 1.15 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 650, 'STARING CONTEST', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: PAPER, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 790, 'DAY 3', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 48, bg: GOLD, rot: 0.05 })
      bubble(x, 800, 990, 'okay, you | win. hi.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Loving cute things | *is not a weakness.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BEAR, BEAR_C, 800, 900, 20 * pop01(t, P.t0 + 0.25, 0.35, 2), { rot: 0.05 * Math.sin(t * 2) })
      label(x, 800, 640, 'NAME: MR. FANGS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.05 })
      hearts(x, t, 800, 820, P.t0 + 1.4, { n: 4, life: 1.6, spread: 150, cell: 6, seed: 7 })
    } },
  { sign: S, cap: 'Even your chart | *has a soft side.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 800, 860, k, 'intense: yes | loyal: very | ' + (lt > 1.2 ? 'soft: SECRETLY' : 'soft: ???'), { head: '♏︎ BIRTH CHART', headBg: ACC, size: 32, w: 360, rot: -0.04 })
      sparkles(x, t, 800, 920, P.t0 + 1.25 * 1.29, 7, 170, 0.5)
    } },
  { sign: S, cap: 'Saying “that hurt” | *takes real strength.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: ST, hops: [1.4, 1.9],
    front(x, t, lt, P) {
      bubble(x, 800, 690, 'that hurt | my feelings.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 800, 950, 'LEVEL UP ✦', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 46, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 800, 950, P.t0 + 1.45, 8, 180, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0536', key: 'D', accent: ACC, solo: S, ending: 'lesson',
  title: 'Scorpio, soft | *is not weak.*',
  cameos: CAMEOS,
  group: { cap: 'Still intense. | *Just softer.*', mood: 'heart' },
  lesson: { text: 'Soft and strong | can *share a heart.*', chip: 'ARMOUR: OPTIONAL' },
  last: {
    text: 'Mr. Fangs | *is proud of you.*',
    draw(x, t, lt) {
      drawBits(x, BEAR, BEAR_C, 830, 1170, 22 * pop01(t, t - lt + 0.6, 0.35, 2))
      hearts(x, t, 830, 1060, t - lt + 1.2, { n: 6, life: 2.0, spread: 300, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
