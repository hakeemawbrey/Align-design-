// r2a0368: star_advice, ADVICE SOLO, "Aries, you’re doing | *so much better.*" (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way: nine warm reminders for an Aries, each a relatable truth + a warm reframe. Ending: lesson.
//   0.0–3.6    "Aries, you’re doing | *so much better.*"
//   3.6–37.8   nine cards: you started, the hardest part · second place, but you showed up first · your energy lifts the room
//              · you apologised fast, that counts · half-done projects still taught you things · people feel braver near you
//              · slow week = refuelling · you're allowed to rest · look how far you've already run
//  37.8        "Fast, brave, | *and doing great.*"
//  41.0        LESSON UNLOCKED: "You don’t have to win | *to be winning.*"  PROGRESS: REAL
//  46.9        "Proud of you, | *Aries.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b5a', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

// ── props
const FLAG = ['KWKWKWK', 'WKWKWKW', 'KWKWKWK', 'WKWKWKW', 'G......', 'G......', 'G......', 'G......', 'G......', 'G......']
const MEDAL = ['R.....R', '.R...R.', '..R.R..', '...S...', '..SSS..', '.SSWSS.', '.SSSSS.', '..SSS..']
const BANDAID = ['..PPPPPPPP..', '.PPPPPPPPPP.', 'PPPWWWWWWPPP', 'PPPWHWWHWPPP', 'PPPWWWWWWPPP', '.PPPPPPPPPP.', '..PPPPPPPP..']
const BIRDHOUSE = ['....RR....', '...RRRR...', '..RRRRRR..', '.RRRRRRRR.', '..WW..WW..', '..WW..WW..', '..WW..WW..', '..WWWWWW..', '....GG....', '....GG....']
const COUCH = ['.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCPPPPCCPPPPCC', 'CCPPPPCCPPPPCC', 'CCCCCCCCCCCCCC', 'C.KK......KK.C']
/** a row of light bulbs that switch on one by one */
function bulbs(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-200, -60); x.quadraticCurveTo(0, 20, 200, -60); x.stroke()
  for (let i = 0; i < 5; i++) {
    const bx = -160 + i * 80, by = -40 + 18 * Math.sin(Math.PI * i / 4), on = i < n
    if (on) { x.fillStyle = 'rgba(242,199,92,0.3)'; x.beginPath(); x.arc(bx, by + 30, 44, 0, 7); x.fill() }
    x.fillStyle = INK; x.beginPath(); x.arc(bx, by + 30, 26, 0, 7); x.fill()
    x.fillStyle = on ? GOLD : '#4a4470'; x.beginPath(); x.arc(bx, by + 30, 20, 0, 7); x.fill()
  }
  x.restore()
}
/** a fuel gauge with a needle */
function gauge(x, cx, cy, k, f) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, Math.PI, 0); x.closePath(); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, 146, Math.PI, 0); x.closePath(); x.fill()
  const C = [RED, '#ffb34a', GOLD, MINT]
  for (let i = 0; i < 4; i++) { x.strokeStyle = C[i]; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, 118, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.stroke() }
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('E', -118, 30); x.fillText('F', 118, 30)
  const a = Math.PI + f * Math.PI
  x.strokeStyle = BONE; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 16, 0, 7); x.fill()
  x.restore()
}
/** a trail of footprints winding back into the distance */
function footprints(x, t, k, n) {
  for (let i = 0; i < n; i++) {
    const u = i / 11, px = lerp(900, 560, u) + 50 * Math.sin(u * 7), py = lerp(1120, 560, u), s = lerp(1, 0.45, u)
    x.save(); x.translate(px + (i % 2 ? 18 : -18) * s, py); x.scale(s * k, s * k)
    x.fillStyle = INK; x.fillRect(-16, -26, 32, 52); x.fillStyle = ACC; x.fillRect(-11, -21, 22, 42)
    x.restore()
  }
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'You started. | *That’s the hard part.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, FLAG, { K: INK, W: BONE, G: '#9aa0b4' }, 800, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.06 * Math.sin(t * 5) })
      L(x, 790, 1110, 'STEP ONE: DONE', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD)
    } },
  { sign: S, cap: 'Came second? | You *showed up first.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MEDAL, { R: SKYB, S: '#c9c9d9', W: '#fff' }, 790, 820, 30 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1100, 'ARRIVED: 6 A.M.', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: S, cap: 'Your energy | *lifts the whole room.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bulbs(x, t, 780, 760, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.3) / 1.2) * 5.99))
      L(x, 790, 1080, 'ROOM: LIT UP', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.05, 38)
    } },
  { sign: S, cap: 'Snapped, then said sorry? | *That counts.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'ugh, FINE.', pop01(t, P.t0 + 0.2, 0.25, 2.2) * (lt < 0.9 ? 1 : 0.85), { size: 40, col: BONE, tail: 'bl' })
      bubble(x, 790, 860, 'sorry. | i mean it.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      drawBits(x, BANDAID, { P: '#f3c49a', W: CREAM, H: '#ff4f86' }, 790, 1070, 14 * pop01(t, P.t0 + 1.5, 0.3, 2), { rot: -0.2 })
    } },
  { sign: S, cap: 'Half-built projects | *still taught you stuff.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.beginPath(); x.rect(600, 600, 400, 300); x.clip(); drawBits(x, BIRDHOUSE, { R: RED, W: '#c98f2a', G: '#5a8f6a' }, 790, 820, 24 * k); x.restore()
      L(x, 790, 1060, 'SKILLS: +3', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 40)
    } },
  { sign: S, cap: 'People feel braver | *around you.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;['cancer', 'libra', 'pisces'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.3, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, 640 + i * 130, 1010 - i * 30, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 17 + i, glyph: false, tears: id === 'pisces' ? 1 : 0, hops: [P.t0 + 1.9 + i * 0.15] })
      })
      bubble(x, 760, 680, 'let’s GO!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: S, cap: 'Slow week? | *You’re refuelling.*', mood: lt => lt > 1.6 ? 'happy' : 'sleepy', star: ST,
    front(x, t, lt, P) {
      gauge(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.1 + 0.85 * ease.inOutCubic(clamp((lt - 0.4) / 1.4)))
      L(x, 790, 1060, 'NOT FAILING. FUELLING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.03, 28)
    } },
  { sign: S, cap: 'Rest isn’t losing. | *Sit down a sec.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -200, y: -10 },
    front(x, t, lt, P) {
      drawBits(x, COUCH, { C: '#c97bff', P: '#e0b3ff', K: INK }, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, 'PERMISSION: GRANTED', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Look back. | *Look how far you ran.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, -1], star: { x: -220 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      footprints(x, t, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(12, Math.floor(clamp((lt - 0.2) / 1.2) * 12)))
      L(x, 760, 600, 'MILES: SO MANY', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 34)
    } },
]

const F = makeFilm({
  id: 'r2a0368', key: 'C', accent: ACC, solo: 'aries', ending: 'lesson',
  title: 'Aries, you’re doing | *so much better.*',
  cameos: CAMEOS,
  group: { cap: 'Fast, brave, | *and doing great.*', mood: 'sparkle' },
  lesson: { text: 'You don’t have to win | *to be winning.*', chip: 'PROGRESS: REAL' },
  last: { text: 'Proud of you, | *Aries.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
