// r2a0077: star_advice ADVICE SOLO, "Leo, you don't owe | an instant reply." (~46 s vertical, signs3kit social cut,
// music: lofi · F). One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe,
// one visual gag each.
//   0.0–3.6    "Leo, you don’t owe | *an instant reply.*"
//   3.6–37.8   chat hit 200 messages (mute it, glow later) · mid-nap (the fans can wait) · your crown needs charging too
//              · replying in an hour is still royal · hair day (messages can wait) · saw it, smiled, answered tomorrow
//              · new match texting (let them miss you) · the sun sets too (log off) · real friends wait and still adore you
//  37.8        "Warm heart. | *Your own timing.*"
//  41.2        CALLBACK: "Crown: charged. | *Now* reply."  The crown battery comes back full.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', SUNC = '#ffd23a'
const S = 'leo'

function card(x, cx, cy, w, h, bg, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function text(x, s, px, py, size, col = INK, font = INTER, weight = 800) {
  x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py)
}
function phone(x, cx, cy, k, draw, rot = 0.05) {
  if (!card(x, cx, cy, 250, 400, '#2a2350', k, rot)) return
  x.fillStyle = '#140c30'; x.fillRect(-110, -170, 220, 340)
  draw(); x.restore()
}
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
// a crown with a battery bar under it (0…1 charge)
function crownBattery(x, cx, cy, k, charge) {
  if (k <= 0.01) return
  drawBits(x, CROWN, CROWN_C, cx, cy - 80, 22 * k)
  x.save(); x.translate(cx, cy + 70); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-120, -44, 240, 88); x.fillRect(120, -18, 18, 36)
  x.fillStyle = '#140c30'; x.fillRect(-110, -34, 220, 68)
  const n = Math.max(1, Math.round(charge * 5))
  for (let i = 0; i < n; i++) { x.fillStyle = charge < 0.3 ? RED : MINT; x.fillRect(-104 + i * 43, -28, 36, 56) }
  x.restore()
}
const PILLOW = ['.LLLLLLLLLLLL.', 'LLLLLLLLLLLLLL', 'LLLWLLLLLLLLLL', 'LLLLLLLLLLLLLL', 'LLLLLLLLLLLLLL', '.LLLLLLLLLLLL.']
const HOURGLASS = ['KKKKKKKKK', '.KSSSSSK.', '..KSSSK..', '...KSK...', '....K....', '...K.K...', '..K.S.K..', '.KSSSSSK.', 'KKKKKKKKK']
const COMB = ['PPPPPPPPPPPP', 'PPPPPPPPPPPP', 'P.P.P.P.P.P.', 'P.P.P.P.P.P.', 'P.P.P.P.P.P.']
const SUN = ['...Y..Y..Y...', '.Y.........Y.', '....OOOOO....', '...OOOOOOO...', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '...OOOOOOO...', '....OOOOO....']
// a little dating-profile card ("NEW MATCH")
function profile(x, t, cx, cy, k, sign) {
  if (!card(x, cx, cy, 260, 330, BONE, k, 0.04)) return
  x.fillStyle = '#2a2350'; x.fillRect(-110, -145, 220, 190)
  x.restore()
  if (k > 0.5) signChar(x, t, sign, cx, cy - 55, 150 * k, { mood: 'wink', seed: 11, glyph: false })
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  text(x, 'NEW MATCH', 0, 100, 30, INK, MONO, 700)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Chat hit 200 messages? | *Mute it. Glow later.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(200, 12 + Math.floor(clamp((lt - 0.2) / 1.0) * 188)), muted = lt > 1.3
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        x.fillStyle = muted ? '#9aa5c4' : RED; x.fillRect(-80, -100, 160, 90)
        text(x, muted ? 'MUTED' : String(n), 0, -54, muted ? 36 : 54, BONE, MONO, 700)
        for (let i = 0; i < 3; i++) { x.fillStyle = '#4b3f82'; x.fillRect(-90, 20 + i * 44, 180 - i * 30, 26) }
      })
      label(x, 790, 1110, 'GLOW MODE: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Mid-nap? | *The fans can wait.*', mood: 'sleepy', look: [1, 0], star: { x: -100, y: 30 },
    back(x, t, lt, P) { drawBits(x, PILLOW, { L: LAV, W: BONE }, 440, 990, 30 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) {
      label(x, 800, 700, 'FANS: WAITING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 820, 'DO NOT DISTURB', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your crown needs | *charging too.*', mood: lt => lt > 1.5 ? 'sparkle' : 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      crownBattery(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), clamp((lt - 0.5) / 1.2) * 0.9 + 0.1)
      label(x, 790, 1080, 'RECHARGING', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'An hour to reply? | *Still royal.*', mood: 'wink', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.2))
      drawBits(x, HOURGLASS, { K: '#c98f2a', S: GOLD }, 790, 860, 24 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: flip * Math.PI })
      drawBits(x, CROWN, CROWN_C, 790, 690, 12 * pop01(t, P.t0 + 1.2, 0.3, 2.2))
      label(x, 790, 1090, 'REPLY: 1 HR', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hair day? | *Messages can wait.*', mood: 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, COMB, { P: PINK }, F.x + 40 + Math.sin(t * 7) * 30, F.top - 10, 10 * k, { rot: 0.2 })
      bubble(x, 800, 760, 'almost done', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1000, 'HOUR 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.top, P.t0 + 1.6, 7, 140, 0.3)
    } },
  { sign: S, cap: 'Saw it. Smiled. | Answered *tomorrow.*', mood: 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), () => {
        x.fillStyle = LAV; x.fillRect(-90, -110, 180, 70); text(x, 'miss u!', 0, -75, 32, INK, INTER, 800)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 0, 30, 12)
      })
      label(x, 790, 1110, 'TOMORROW: OK', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'New match texting? | Let them *miss you.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      profile(x, t, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 'aquarius')
      bubble(x, 790, 600, 'hello?? :)', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
      label(x, 790, 1110, 'SUSPENSE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Even the sun sets. | *Log off.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      const set = ease.inOutCubic(prog(lt, 0.4, 1.8))
      x.save(); x.beginPath(); x.rect(600, 560, 380, 470); x.clip()
      drawBits(x, SUN, { Y: GOLD, O: SUNC }, 790, lerp(760, 1060, set), 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      x.restore()
      x.fillStyle = INK; x.fillRect(600, 1024, 380, 12); x.fillStyle = ORANGE; x.fillRect(600, 1030, 380, 6)
      label(x, 790, 1110, 'OFFLINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Real friends wait. | *And still adore you.*', mood: 'heart', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'cancer', 720, 960, 170 * k, { mood: 'heart', look: [-1, 0], seed: 17, glyph: false })
        signChar(x, t, 'pisces', 870, 960, 170 * k, { mood: 'sparkle', look: [-1, 0], seed: 19, glyph: false, tears: 1 })
      }
      label(x, 790, 700, 'STILL ADORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 3 })
    } },
]

const F = makeFilm({
  id: 'r2a0077', key: 'F', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Leo, you don’t owe | *an instant reply.*',
  cameos: CAMEOS,
  group: { cap: 'Warm heart. | *Your own timing.*', mood: 'sparkle' },
  last: {
    text: 'Crown: charged. | *Now* reply.',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 380, 1080, 260 * k, { mood: lt > 1.4 ? 'wink' : 'sparkle', look: [1, 0], seed: 40, hops: [t - lt + 1.2] })
      crownBattery(x, 720, 1060, 1.5 * pop01(t, t - lt + 0.7, 0.35, 2), 1)
      sparkles(x, t, 720, 960, t - lt + 1.2, 7, 220, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
