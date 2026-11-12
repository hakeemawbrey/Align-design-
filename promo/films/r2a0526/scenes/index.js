// r2a0526: star_advice, ADVICE SOLO, "Tauruses need | *on a bad day.*" (~43 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Taurus truth + a warm reframe, one light gag each.
// Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   a real meal · the softest blanket, no plans · no surprises · five minutes to grumble, then cake
//              · the same song on repeat · someone who just sits with them · a slow walk · a kind text from their match
//              · permission to rest
//  37.8        "Go slow today. | *You’re allowed.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4', GREEN = '#5fd068', ORANGE = '#ffb34a'

const BOWL = [
  '...S..S..S...',
  '....S..S..S..',
  '...S..S..S...',
  'OOOOOOOOOOOOO',
  'WOYYGOOYYGOOW',
  '.WWWWWWWWWWW.',
  '..WWWWWWWWW..',
  '....WWWWW....',
]
const BOWL_C = { S: 'rgba(239,230,214,0.7)', O: ORANGE, Y: GOLD, G: GREEN, W: CREAM }
const CAKE = [
  '......R......',
  '......W......',
  '..PPPPPPPPP..',
  '.PWPPWPPWPPW.',
  '.CCCCCCCCCCC.',
  '.PPPPPPPPPPP.',
  '.CCCCCCCCCCC.',
  'WWWWWWWWWWWWW',
]
const CAKE_C = { R: RED, W: CREAM, P: PINK, C: '#8a4a2e' }
const FLOWER = ['.PP.PP.', 'PPPYPPP', '.PPPPP.', '..PPP..', '...G...', 'GG.G...', '.GGG.GG', '...GGG.', '...G...', '...G...']
const DOORTAG = ['...KK...', '..K..K..', 'WWWWWWWW', 'WLLLLLLW', 'WWWWWWWW', 'WLLLLLLW', 'WWWWWWWW', 'WWWWWWWW']

/** a soft blanket draped over the star (drawn in front, below the face) */
function blanket(x, F, k, t) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  const w = 360, top = F.cy + 40, h = 190
  x.fillStyle = INK; x.beginPath(); x.roundRect(F.x - w / 2 - 6, top - 6, w + 12, h + 12, 40); x.fill()
  x.fillStyle = LAV; x.beginPath(); x.roundRect(F.x - w / 2, top, w, h, 34); x.fill()
  x.fillStyle = '#e3d2ff'; for (let i = 0; i < 5; i++) for (let j = 0; j < 3; j++) x.fillRect(F.x - w / 2 + 30 + i * 70, top + 30 + j * 55, 22, 22)
  x.restore()
}
/** a phone with one message */
function phone(x, cx, cy, k, head, msg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-132, -202, 276, 420)
  x.fillStyle = INK; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#2a2350'; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#140c30'; x.fillRect(-120, -178, 240, 356)
  x.fillStyle = MINT; x.fillRect(-108, -164, 216, 52); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -137)
  if (msg) { x.fillStyle = PINK; x.fillRect(-104, -60, 208, 120); x.fillStyle = INK; x.font = `800 30px ${INTER}`; msg.split('|').forEach((l, i) => x.fillText(l.trim(), 0, -26 + i * 46)) }
  x.restore()
}

const S = 'taurus'
const CAMEOS = [
  { sign: S, cap: 'A real meal. | *Not a snack.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, 'SECONDS: YES', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 180, 0.4)
    } },
  { sign: S, cap: 'The softest blanket. | *Zero plans.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -140 },
    front(x, t, lt, P, F) {
      blanket(x, F, ease.outCubic(prog(lt, 0.3, 0.8)), t)
      label(x, 790, 760, 'PLANS: CANCELLED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 880, 'GUILT: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'No surprises today. | *Just the usual.*', mood: 'happy', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-166, -176, 332, 352); x.fillStyle = CREAM; x.fillRect(-158, -168, 316, 336)
        x.fillStyle = GREEN; x.fillRect(-158, -168, 316, 62); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TODAY', 0, -137)
        x.font = `800 32px ${INTER}`; ['same breakfast', 'same chair', 'same show'].forEach((s, i) => { if (lt > 0.5 + i * 0.3) x.fillText(s + ' ✓', 0, -60 + i * 70) })
        x.restore()
      }
      label(x, 790, 1100, 'SURPRISES: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Five minutes to grumble. | *Then cake.*', mood: lt => lt > 1.3 ? 'heart' : 'eyeroll', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const cake = lt > 1.2
      if (!cake) bubble(x, 790, 760, 'ugh. | ugh. | UGH.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, col: SLATE, tail: 'bl' })
      else { drawBits(x, CAKE, CAKE_C, 790, 860, 22 * pop01(t, P.t0 + 1.2, 0.3, 2)); sparkles(x, t, 790, 840, P.t0 + 1.25, 7, 190, 0.2) }
      label(x, 790, 1100, cake ? 'GRUMBLE: DONE' : 'GRUMBLE TIMER: ON', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: cake ? PINK : BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their comfort song. | *Twelfth time.*', mood: 'sleepy', star: { x: -170 },
    front(x, t, lt, P, F) {
      notes(x, t, 760, 900, { n: 5, cell: 8, col: GREEN, seed: 1 })
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 11)
      label(x, 790, 640, `ON REPEAT: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: GREEN, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'still perfect.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone who sits with them. | *No fixing.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 780, 930, 230 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 790, 650, 'I’m here.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 46, col: PINK, tail: 'bc' })
      hearts(x, t, 560, 820, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'A walk outside. | *Stop for every flower.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, FLOWER, { P: [PINK, GOLD, LAV][i], Y: GOLD, G: GREEN }, 680 + i * 120, 960 - (i % 2) * 40, 14 * pop01(t, P.t0 + 0.2 + i * 0.35, 0.3, 2), { rot: Math.sin(t * 2 + i) * 0.06 })
      label(x, 790, 650, 'PACE: SNAIL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A text from their match. | *“Thinking of you.”*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), '♉︎ YOUR MATCH', lt > 0.7 ? 'thinking | of you' : '')
      hearts(x, t, 560, 800, P.t0 + 1.2, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Permission to rest. | *You earned it.*', mood: 'sleepy', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, DOORTAG, { K: INK, W: CREAM, L: SLATE }, 790, 820, 26 * k, { rot: Math.sin(t * 2) * 0.05 })
      label(x, 790, 900, 'RESTING', k, { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      label(x, 790, 1110, 'APPROVED ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0526', key: 'D', accent: GREEN, solo: S, ending: 'group',
  title: 'Tauruses need | *on a bad day.*',
  cameos: CAMEOS,
  group: { cap: 'Go slow today. | *You’re allowed.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
