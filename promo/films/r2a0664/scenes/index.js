// r2a0664: star_advice, ADVICE SOLO (virgo), "Virgo, you're allowed | *to say no.*" (signs3kit social cut, music: lofi · E).
// Nine cards: a relatable Virgo truth + a warm reframe, one light visual gag each. Ending: callback.
//   fixing everyone's typos (pen: capped) · you don't have to redo their part · friend moving again? bring snacks
//   · your to-do list isn't your boss · their mess isn't your project · not perfect, still enough (a crooked frame,
//   left crooked) · everyone's advice line (office hours) · your body asked for rest (recharging) · boundaries on your
//   profile? attractive
//   group "Rest is | *productive too.*"   last "Frame’s still crooked. | *You’re still fine.*" (the crooked frame, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'virgo', ST = { x: -170 }
const ACC = '#ff9ec7', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#2fc79a', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
const friend = (x, t, id, cx, cy, s, k, o = {}) => { if (k > 0.01) signChar(x, t, id, cx, cy, s * k, { glyph: false, seed: 31, look: [-1, 0], ...o }) }
const PEN = ['..CCC', '.CCC.', 'RRR..', 'RRR..', 'RR...', 'R....']
const BOXP = ['BBBBBBBBBB', 'BbbbBBbbbB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const CHIPS = ['.YYYYY.', 'YRRRRRY', 'YRYYYRY', 'YRRRRRY', 'YRRRRRY', '.YYYYY.']
const MUG = ['.MMMMMM...', 'MMMMMMMMMM', 'MCCCCCCM.M', 'MCCCCCCM.M', 'MCCCCCCMMM', 'MCCCCCCM..', '.MMMMMM...']
const PILE = ['....S.....', '..SSPS....', '.PSSSSPS..', 'SSPPSSSPS.', 'SSSSPSSSSS']

function crookedFrame(x, t, cx, cy, k, rot) {
  box(x, cx, cy, 240, 190, k, rot, () => {
    x.fillStyle = '#c98f2a'; x.fillRect(-104, -79, 208, 158)
    x.fillStyle = SKYB; x.fillRect(-92, -67, 184, 134)
    x.fillStyle = GREEN; x.fillRect(-92, 20, 184, 47)
    x.fillStyle = GOLD; x.beginPath(); x.arc(40, -20, 22, 0, Math.PI * 2); x.fill()
  }, GOLD)
}

const CAMEOS = [
  { sign: SG, cap: 'Fixing everyone’s typos? | *Off the clock.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      box(x, 800, 840, 300, 220, pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-136, -96, 272, 192)
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('see you tomorow', 0, -30); x.fillText('their/there', 0, 30)
        x.fillStyle = RED; x.fillRect(-16, -48, 30, 4)
      })
      drawBits(x, PEN, { C: BONE, R: RED }, 640, 1040, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 830, 1100, 'PEN: CAPPED', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'You don’t have to | *redo their part.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 850, 300, 240, pop01(t, P.t0 + 0.15, 0.3, 2), -0.03, () => {
        x.fillStyle = CREAM; x.fillRect(-136, -106, 272, 212)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('THEIR SLIDE', 0, -76)
        x.font = `800 60px ${INTER}`; x.fillStyle = PINK; x.fillText('WordArt', 0, 10)
        x.fillStyle = GOLD; x.fillRect(-90, 60, 30, 30); x.fillStyle = SKYB; x.fillRect(60, 56, 24, 34)
      })
      L(x, 790, 1100, 'LEFT IT. (GROWTH)', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'Friend moving *again?* | Bring snacks. That counts.', mood: 'happy', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, BOXP, { B: '#c9945a', b: '#8a5a2a' }, 820, 960, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, CHIPS, { Y: GOLD, R: RED }, 700, 860, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.2 })
      L(x, 800, 660, 'SNACK DEPARTMENT', pop01(t, P.t0 + 1.1, 0.3, 2.2), PINK, 0.05, 30)
    } },
  { sign: SG, cap: 'Your to-do list | *isn’t your boss.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const unroll = ease.outCubic(prog(lt, 0.2, 1.2))
      box(x, 790, 640 + 230 * unroll, 240, 80 + 460 * unroll, pop01(t, P.t0 + 0.15, 0.3, 2), 0.02, () => {
        x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'left'
        const rows = Math.floor((80 + 460 * unroll - 40) / 32)
        for (let i = 0; i < rows; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-90, -(80 + 460 * unroll) / 2 + 24 + i * 32, 18, 18); x.fillRect(-60, -(80 + 460 * unroll) / 2 + 28 + i * 32, 140 - (i % 3) * 20, 10) }
      }, CREAM)
      L(x, 790, 1120, 'LIST: PAUSED', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: SG, cap: 'Their mess | *isn’t your project.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PILE, { S: SLATE, P: PINK }, 820, 960, 26 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bubble(x, 800, 700, 'not today ♡', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      L(x, 820, 1110, 'HANDS: OFF', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: SG, cap: 'Not perfect? | *Still enough.*', mood: lt => Math.floor(lt * 3) % 2 && lt < 1.4 ? 'squint' : 'happy', look: [1, -0.5], star: ST,
    front(x, t, lt, P) {
      crookedFrame(x, t, 800, 820, pop01(t, P.t0 + 0.15, 0.3, 2), 0.14)
      L(x, 800, 1090, 'LEFT IT CROOKED', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 32)
      bubble(x, 560, 650, 'it’s… fine.', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: SG, cap: 'Everyone’s advice line? | *Office hours apply.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      box(x, 800, 860, 300, 220, pop01(t, P.t0 + 0.15, 0.3, 2), -0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-136, -96, 272, 192)
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('ADVICE DESK', 0, -50)
        x.font = `700 26px ${MONO}`; x.fillText('OPEN 9–5', 0, 6)
        x.fillStyle = lt > 1.2 ? RED : GREEN; x.font = `800 30px ${INTER}`; x.fillText(lt > 1.2 ? 'CLOSED ♡' : 'OPEN', 0, 56)
      }, BROWN)
      L(x, 800, 660, '11:47 PM', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, 0.05, 34)
    } },
  { sign: SG, cap: 'Your body asked for rest. | *That’s allowed.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, MUG, { M: CREAM, C: '#d9a05a' }, 790, 900, 18 * pop01(t, P.t0 + 0.15, 0.3, 2))
      for (let i = 0; i < 2; i++) { const ph = (t * 0.8 + i * 0.5) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillRect(770 + i * 30 + Math.sin(ph * 6) * 8, 820 - ph * 90, 8, 22); x.globalAlpha = 1 }
      const pct = Math.round(lerp(12, 87, clamp((lt - 0.3) / 1.8)))
      box(x, 790, 660, 340, 56, pop01(t, P.t0 + 0.4, 0.3, 2), 0, () => {
        x.fillStyle = MINT; x.fillRect(-160, -18, 320 * pct / 100, 36)
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText(`RECHARGING ${pct}%`, 0, 2)
      }, '#140c30')
    } },
  { sign: SG, cap: 'Boundaries on your profile? | *Attractive.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 860, 300, 400, pop01(t, P.t0 + 0.15, 0.35, 2), 0.04, () => {
        x.fillStyle = '#140c30'; x.fillRect(-136, -186, 272, 220)
        x.fillStyle = ACC; x.font = `700 28px ${MONO}`; x.fillText('♍︎ VIRGO', 0, 76)
        x.fillStyle = MINT; x.font = `800 24px ${INTER}`; x.fillText('BOUNDARIES: HEALTHY ✓', 0, 130)
      })
      friend(x, t, SG, 790, 780, 160, pop01(t, P.t0 + 0.35, 0.3, 2), { mood: 'wink', look: [0, 0] })
      hearts(x, t, 790, 640, P.t0 + 1.3, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 5 })
      L(x, 790, 1110, '3 NEW MATCHES', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0664', key: 'E', accent: ACC, solo: SG, ending: 'callback',
  title: 'Virgo, you’re | allowed *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Rest is | *productive too.*', mood: 'heart' },
  last: {
    text: 'Frame’s still crooked. | *You’re still fine.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, SG, 380, 1080, 380 * k, { mood: Math.floor(lt * 2.5) % 3 === 0 ? 'squint' : 'happy', look: [1, -0.5], seed: 5 })
      crookedFrame(x, t, 760, 960, pop01(t, t - lt + 0.9, 0.4, 2) * 1.3, 0.16)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
