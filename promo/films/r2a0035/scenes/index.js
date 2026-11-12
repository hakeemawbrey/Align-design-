// r2a0035: star_advice ADVICE ROLLCALL, "What every sign | hopes you ask." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, the one warm question each sign secretly hopes you'll ask, with a light gag:
//   ♈ "what's your next big idea?" (has forty) · ♉ "what's your comfort meal?" · ♊ "what's your rising sign?"
//   · ♋ "how's your family?" · ♌ "can I see your art?" · ♍ "how are you, really?" · ♎ "what do YOU want to do?"
//   · ♏ "what's your biggest dream?" · ♐ "where to next?" · ♑ "are you proud of yourself?"
//   · ♒ "what's your wildest theory?" · ♓ "what song made you cry today?"
//  49.2   "Ask their sign. | Then *the real stuff.*"  group photo
//  52.6   CALLBACK: "Libra’s answer? | *Still deciding.*"  Libra between the two options
import { prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff9fc4', BROWN = '#8a4a2e'
const WHEEL_COLS = ['#ff6b5a', '#9fd8a8', GOLD, SKYB, '#ffb34a', MINT, PINK, LAV, '#ff9a4a', '#9aa5c4', '#8fe3ff', '#b7a6ff']
// ── props
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL_COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, i / 12 * Math.PI * 2, (i + 1) / 12 * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.55, 0, Math.PI * 2); x.fill()
  x.restore()
}
function card(x, cx, cy, w, h, k, rot = 0, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
const BULB = ['.YYYY.', 'YYYYYY', 'YYWYYY', 'YYYYYY', '.YYYY.', '..SS..', '..SS..']
const BOWL = ['..S.S.S..', '...S.S...', 'WWWWWWWWW', 'WRRRRRRRW', '.WRRRRRW.', '..WWWWW..']
const ALBUM = ['BBBBBBBBBBBB', 'BPPPPBPPPPPB', 'BPWWPBPWWWPB', 'BPWWPBPWWWPB', 'BPPPPBPPPPPB', 'BBBBBBBBBBBB']
const TROPHY = ['GGGGGGGGG', 'GGGGGGGGG', '.GGGGGGG.', '..GGGGG..', '...GGG...', '....G....', '...GGG...', '..BBBBB..']
const GLOBE = ['...BBBB...', '.BBGGBBBB.', 'BBGGGGBBBB', 'BBBGGBBGGB', 'BBBBBBGGGB', '.BBBBBBGB.', '...BBBB...']
const UFO = ['....GGG....', '...GWWWG...', '.SSSSSSSSS.', 'SSYSSYSSYSS', '.SSSSSSSSS.']

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: '“What’s your | *next big idea?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, BULB, { Y: '#fff1b0', W: BONE, S: '#9aa5c4' }, 680 + (i % 3) * 110, 700 + Math.floor(i / 3) * 150, 12 * pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2.2))
      label(x, 790, 1080, 'HAS FORTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: '#ff6b5a', font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“What’s your | *comfort meal?*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, { S: BONE, W: BONE, R: '#e8a24a' }, 790, 830, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1070, 'how long have you got?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'gemini', cap: '“What’s your | *rising sign?*”', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 800, 130, pop01(t, P.t0 + 0.2, 0.3, 2), t)
      label(x, 790, 1070, 'TALKS: 1 HOUR', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: '“How’s | *your family?*”', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, ALBUM, { B: BROWN, P: '#ffb38a', W: SKYB }, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      hearts(x, t, 790, 740, P.t0 + 0.9, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 3 })
      label(x, 790, 1060, 'PHOTOS: 300', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: '“Can I see | *your art?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 800, 300, 260, k, 0.02, BROWN)
      card(x, 790, 800, 260, 220, k, 0.02, '#fff4e2')
      if (k > 0.01) { x.save(); x.translate(790, 800); x.scale(k, k); x.fillStyle = GOLD; x.beginPath(); x.arc(-40, -20, 50, 0, Math.PI * 2); x.fill(); x.fillStyle = '#7dd36b'; x.fillRect(-120, 40, 240, 50); x.restore() }
      sparkles(x, t, 790, 800, P.t0 + 0.9, 8, 190, 0.2)
      label(x, 790, 1080, 'SELF-PORTRAIT #12', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: '“How are you, | *really?*”', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'oh. um.', pop01(t, P.t0 + 0.5, 0.25, 2.4), { size: 50, tail: 'bl' })
      bubble(x, 790, 900, 'nobody asks that.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, col: MINT, tail: 'bl' })
      label(x, 790, 1080, 'LIST: PUT DOWN', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: MINT, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: '“What do *you* | want to do?”', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 700, 720, 'PICNIC', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: ROSE, font: MONO, weight: 700, rot: -0.06 })
      label(x, 880, 860, 'MOVIES', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 40, bg: LAV, font: MONO, weight: 700, rot: 0.06 })
      label(x, 790, 1080, 'FIRST TIME ASKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: '“What’s your | *biggest dream?*”', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const open = ease.outCubic(prog(lt, 0.7, 1.2)), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      card(x, 790, 820, 300, 220, k, 0, '#3b2a70')
      if (k > 0.01) { x.save(); x.translate(790, 820); x.scale(k, k); x.fillStyle = BONE; x.fillRect(-140 * open, -100, 140 * open, 200); x.fillStyle = '#9aa5c4'; for (let i = 0; i < 4; i++) x.fillRect(-120 * open, -60 + i * 40, 100 * open, 10); x.restore() }
      label(x, 790, 1070, 'DIARY: UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: '#c97bff', color: BONE, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: '“Where | *to next?*”', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: '#4a8fe0', G: '#7dd36b' }, 790, 820, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: t * 0.6 })
      label(x, 790, 1070, 'BAG: ALREADY PACKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: '#ff9a4a', font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: '“Are you | *proud of yourself?*”', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { G: GOLD, B: BROWN }, 790, 810, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 1060, '…actually, yes.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: '“What’s your | *wildest theory?*”', mood: 'sparkle', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, UFO, { G: SKYB, W: BONE, S: '#9aa5c4', Y: GOLD }, 790, 760 + Math.sin(t * 3) * 12, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1060, 'SLIDES: READY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: SKYB, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“What song made you | *cry today?*”', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notes(x, t, 790, 960, { n: 5, cell: 9, col: LAV, alpha: pop01(t, P.t0 + 0.3, 0.3, 1.5) })
      label(x, 790, 1080, 'SONGS: SIX', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: LAV, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0035', key: 'G', accent: ROSE, ending: 'callback',
  title: 'What every sign | *hopes you ask.*',
  cameos: CAMEOS,
  group: { cap: 'Ask their sign. | Then *the real stuff.*' },
  last: {
    text: 'Libra’s answer? | *Still deciding.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'libra', 540, 1080, 260 * k, { mood: lt > 1.6 ? 'squint' : 'happy', look: [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], seed: 40, hops: [t - lt + 1.2] })
      label(x, 290, 920, 'PICNIC', pop01(t, t - lt + 0.8, 0.3, 2.2), { size: 44, bg: ROSE, font: MONO, weight: 700, rot: -0.08 })
      label(x, 790, 920, 'MOVIES', pop01(t, t - lt + 1.0, 0.3, 2.2), { size: 44, bg: LAV, font: MONO, weight: 700, rot: 0.08 })
      label(x, 540, 1320, '…BOTH?', pop01(t, t - lt + 2.0, 0.3, 2.4), { size: 44, bg: GOLD, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
