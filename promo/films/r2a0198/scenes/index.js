// r2a0198: star_advice, ADVICE SOLO, "What Scorpios need | after a fight." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (solo mode, 9 cards): what helps a Scorpio after a fight, kind and a little funny.
//   0.0–3.6    "What Scorpios need | *after a fight.*"
//   3.6–37.8   nine cards: an hour alone, they come back softer (BACK IN 1 HR) · a real apology, not "sorry if"
//              · cards on the table, every one · proof you're not leaving (the suitcase: UNPACKED) · their quiet is just
//              processing · sit close, words optional · a Taurus leaves their favourite snack at the door ("truce?")
//              · proof you still chose them (STILL MATCHED) · then let it go: the grudge list, cleared
//  37.8        "Intense. | *And so loyal.*"
//  41.0        LESSON UNLOCKED: "Deep feelings heal | with *deep care.*"  TRUST: RESTORED
//  46.9        "Snack truce: | *accepted.*"  over the match card: Scorpio + Taurus (the snack truce, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CRIMSON = '#ff5a7a', RED = '#e23d4e', S = 'scorpio'

const SUITCASE = ['...KKKK...', '...K..K...', 'CCCCCCCCCC', 'CcCCCCCCcC', 'CCCCCCCCCC', 'CcCCCCCCcC', 'CCCCCCCCCC', '.K......K.']
const BAG = ['..KKKK..', 'BBBBBBBB', 'BbbbbbbB', 'BbYYYYbB', 'BbYYYYbB', 'BbbbbbbB', 'BBBBBBBB']
function box(x, cx, cy, w, h, k, fillC, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = fillC; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
function playCard(x, cx, cy, k, rot, sym, col) {
  if (!box(x, cx, cy, 110, 160, k, '#fbf7ee', rot)) return
  x.fillStyle = col; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(sym, 0, 4)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'An hour alone. | *They come back softer.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (box(x, 800, 880, 240, 400, pop01(t, P.t0 + 0.2, 0.35, 2), '#6b3a4a')) {
        x.fillStyle = '#8a4a5a'; x.fillRect(-90, -170, 180, 150); x.fillRect(-90, 10, 180, 150)
        x.fillStyle = GOLD; x.beginPath(); x.arc(80, 10, 12, 0, 7); x.fill()
        x.restore()
      }
      label(x, 800, 780, 'BACK IN 1 HR', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A real apology. | *Not “sorry if.”*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'sorry if…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, col: '#d8dbe8', tail: 'bl' })
      if (lt > 0.7) { const p = clamp((lt - 0.7) / 0.3); x.strokeStyle = RED; x.lineWidth = 12; x.beginPath(); x.moveTo(680, 660); x.lineTo(680 + 220 * p, 700); x.stroke() }
      bubble(x, 790, 950, 'I’m sorry. | I was wrong.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Cards on the table. | *Every single one.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const syms = ['♥', '♠', '♦', '♣', '♥']
      for (let i = 0; i < 5; i++) playCard(x, 650 + i * 75, 920 + Math.abs(i - 2) * 20, pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2.2), (i - 2) * 0.12, syms[i], i % 2 ? INK : RED)
      label(x, 800, 690, 'NO SECRETS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: CRIMSON, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Proof you’re | *not going anywhere.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, C: SKYB, c: '#5aa8d8' }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1110, 'UNPACKED ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their quiet? | *Just processing.*', mood: 'neutral', look: [0, -1], star: { x: -200 },
    front(x, t, lt, P) {
      if (box(x, 800, 860, 330, 150, pop01(t, P.t0 + 0.2, 0.35, 2), '#140c30')) {
        x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PROCESSING…', 0, -34)
        x.fillStyle = INK; x.fillRect(-140, 6, 280, 40); x.fillStyle = CRIMSON; x.fillRect(-136, 10, 272 * (0.2 + 0.75 * clamp((lt - 0.3) / 2)), 32)
        x.restore()
      }
      label(x, 800, 1080, 'PLEASE WAIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Sit close. | *Words optional.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -110 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      const slide = lerp(860, 690, ease.inOutCubic(clamp((lt - 0.4) / 0.8)))
      if (k > 0.01) signChar(x, t, 'cancer', slide, 900, 220 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 41, glyph: false })
      hearts(x, t, 560, 760, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Their favourite snack, | *left at the door.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 840, 900, 170 * k, { mood: 'happy', look: [-1, 0], seed: 43, glyph: false })
      drawBits(x, BAG, { K: '#8a5a3a', B: '#ffb34a', b: '#ffd08a', Y: RED }, 680, 1050, 16 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bubble(x, 820, 660, 'truce?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: S, cap: 'Proof you’d still | *choose them.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      if (box(x, 800, 860, 290, 360, pop01(t, P.t0 + 0.2, 0.35, 2), '#2a2350', 0.04)) {
        x.fillStyle = '#140c30'; x.fillRect(-125, -160, 250, 300)
        x.fillStyle = CRIMSON; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR MATCH', 0, -120)
        x.restore()
        signChar(x, t, 'scorpio', 790, 860, 140, { mood: 'happy', seed: 45, glyph: false, glow: 0.5 })
      }
      label(x, 800, 1080, 'STILL MATCHED ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Then let it go. | *Grudge list: cleared.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.8],
    front(x, t, lt, P) {
      if (box(x, 800, 880, 290, 400, pop01(t, P.t0 + 0.2, 0.35, 2), BONE, 0.04)) {
        x.fillStyle = INK; x.fillRect(-145, -200, 290, 56); x.fillStyle = CRIMSON; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GRUDGES', 0, -172)
        for (let i = 0; i < 6; i++) {
          const y = -110 + i * 50
          x.fillStyle = '#9a8f80'; x.fillRect(-110, y - 6, 200 - (i % 3) * 30, 12)
          const p = clamp((lt - 0.5 - i * 0.18) / 0.2)
          if (p > 0) { x.fillStyle = RED; x.fillRect(-120, y - 3, (230 - (i % 3) * 30) * p, 7) }
        }
        x.restore()
      }
      label(x, 800, 1110, 'CLEARED', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.05 })
    } },
]

const F = makeFilm({
  id: 'r2a0198', key: 'C', accent: CRIMSON, solo: S, ending: 'card',
  title: 'What Scorpios need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'scorpio', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Intense. | *And so loyal.*', mood: 'heart' },
  lesson: { text: 'Deep feelings heal | with *deep care.*', chip: 'TRUST: RESTORED' },
  last: { text: 'Snack truce: | *accepted.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
