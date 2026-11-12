// r2a0443: star_advice, ADVICE SOLO, "Signs an Aries | *misses you.*" (~47 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): the sweet, loud ways an Aries misses you, one light gag each.
// Ending: group (the group beat is the punchline).
//   0.0–3.6    hook
//   3.6–37.8   forty memes in a row · a random rematch request · they show up with snacks · a trip planned before asking
//              · grumpy until you're back · they call instead of texting · they re-check your match
//              · they sprint in for the hug · "you're late!" (they counted)
//  37.8        "They miss you. | *Loudly.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, GLYPH_FONT,
} from '../../signs3kit.js'

const CORAL = '#ff6b5a', CREAM = '#fff8ea', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4'

function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -212, 296, 440)
  x.fillStyle = INK; x.fillRect(-154, -224, 308, 448)
  x.fillStyle = '#2a2350'; x.fillRect(-144, -214, 288, 428)
  x.fillStyle = '#140c30'; x.fillRect(-130, -188, 260, 376)
  if (head) { x.fillStyle = headCol; x.fillRect(-118, -174, 236, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -147) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `800 32px ${INTER}`; const w = x.measureText(txt).width + 30
    x.save(); x.translate(right ? 112 - w : -112, -70 + i * 76); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -27, w, 54); x.fillStyle = INK; x.fillText(txt, 15, 2)
    x.restore()
  })
  x.restore()
}
function clock(x, cx, cy, k, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const ha = (7 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.lineCap = 'square'; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ha) * 56, Math.sin(ha) * 56); x.stroke()
  x.lineWidth = 9; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ma) * 88, Math.sin(ma) * 88); x.stroke()
  x.fillStyle = INK; x.fillRect(-10, -10, 20, 20)
  x.restore()
}
const PADDLE = ['.RRRR.', 'RRRRRR', 'RRRRRR', 'RRRRRR', 'RRRRRR', '.RRRR.', '..BB..', '..BB..', '..BB..']
const BAG = ['...KKKK...', '..K....K..', 'BBBBBBBBBB', 'BBSSSSSSBB', 'BBSYYYYSBB', 'BBSYYYYSBB', 'BBSSSSSSBB', 'BBBBBBBBBB']
const DOOR = ['KKKKKKKKKK', 'KWWWWWWWWK', 'KWKKWWKKWK', 'KWKKWWKKWK', 'KWWWWWWWWK', 'KWWWWWWYWK', 'KWKKWWKKWK', 'KWKKWWKKWK', 'KWWWWWWWWK', 'KWWWWWWWWK']

/** a ticket stub */
function ticket(x, cx, cy, k, a, b) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -80, 352, 176)
  x.fillStyle = INK; x.fillRect(-182, -92, 364, 184)
  x.fillStyle = GOLD; x.fillRect(-174, -84, 348, 168)
  x.fillStyle = INK; for (let i = 0; i < 6; i++) x.fillRect(80, -74 + i * 28, 6, 14)
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(a, -48, -22)
  x.font = `700 28px ${MONO}`; x.fillText(b, -48, 34)
  x.font = `700 56px ${GLYPH_FONT}`; x.fillText('✈︎', 130, 4)
  x.restore()
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Forty memes in a row? | *That’s “I miss you.”*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const n = Math.min(40, 1 + Math.floor(clamp((lt - 0.3) / 1.4) * 40))
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: `${n} NEW`, headCol: CORAL, lines: [
        ['lol look', BONE, pop01(t, P.t0 + 0.4, 0.25, 2.2)], ['LOOK', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['this is us', BONE, pop01(t, P.t0 + 1.0, 0.25, 2.2)], ['miss u', PINK, pop01(t, P.t0 + 1.6, 0.25, 2.2)],
      ] })
    } },
  { sign: S, cap: 'A random rematch request? | *They miss you.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PADDLE, { R: RED, B: BROWN }, 800, 930, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.4 + Math.sin(t * 5) * 0.08 })
      bubble(x, 790, 650, 'rematch. | right now.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: CORAL, tail: 'bl' })
      label(x, 800, 1160, 'LAST GAME: 2019', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They just show up. | *With your snacks.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, DOOR, { K: INK, W: '#c98f5a', Y: GOLD }, 810, 880, 28 * k)
      label(x, 800, 640, 'KNOCK KNOCK KNOCK', pop01(t, P.t0 + 0.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      drawBits(x, BAG, { K: INK, B: '#e0a050', S: RED, Y: GOLD }, 640, 1060, 16 * pop01(t, P.t0 + 1.1, 0.3, 2))
    } },
  { sign: S, cap: 'A trip, already booked. | *For you two.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      ticket(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), 'YOU + ME', 'LEAVING: SAT')
      bubble(x, 790, 650, 'pack a bag!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1100, 'ASKED YOU: NOT YET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Grumpy all week? | *Until you’re back.*', mood: lt => lt > 1.3 ? 'heart' : 'eyeroll', look: [1, 0], star: { x: -170 }, squash: lt => lt > 1.3 ? 0.04 : 0,
    front(x, t, lt, P) {
      const back = lt > 1.3
      label(x, 790, 760, back ? 'MOOD: SUNSHINE' : 'MOOD: GRUMPY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 44, bg: back ? GOLD : SLATE, rot: 0.04, font: MONO, weight: 700 })
      if (back) { bubble(x, 790, 980, 'you’re HOME!', pop01(t, P.t0 + 1.35 * 3.1 / 2.4, 0.25, 2.2), { size: 42, col: PINK, tail: 'bc' }); hearts(x, t, 790, 1050, P.t0 + 1.4 * 3.1 / 2.4, { n: 6, life: 1.6, spread: 240, cell: 7, seed: 4 }) }
    } },
  { sign: S, cap: 'They call, not text. | *Pick up.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ring = lt < 1.4
      phone(x, 790, 880, pop01(t, P.t0 + 0.15, 0.3, 2), { head: ring ? 'CALLING… (3)' : 'CONNECTED ♡', headCol: ring ? CORAL : MINT, rot: ring ? Math.sin(t * 30) * 0.03 : 0.04, lines: ring ? [] : [['HI!!!!!', GOLD, 1]] })
      if (ring) for (let i = 0; i < 3; i++) { x.strokeStyle = BONE; x.lineWidth = 6; x.globalAlpha = 0.6; x.beginPath(); x.arc(790, 880, 200 + i * 26 + (t * 60 % 26), -0.5, 0.5); x.stroke(); x.globalAlpha = 1 }
    } },
  { sign: S, cap: 'They re-check your match. | *Still a yes.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -150, 312, 312)
        x.fillStyle = INK; x.fillRect(-162, -162, 324, 324); x.fillStyle = '#140c30'; x.fillRect(-154, -154, 308, 308)
        x.fillStyle = CORAL; x.fillRect(-154, -154, 308, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('COMPATIBILITY', 0, -123)
        x.fillStyle = BONE; x.font = `700 90px ${GLYPH_FONT}`; x.fillText('♈︎ ♋︎', 0, 10)
        x.restore()
      }
      label(x, 790, 1080, lt < 1.2 ? 'CHECKING… AGAIN' : 'STILL A MATCH ✓', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: lt < 1.2 ? BONE : MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'They sprint in for the hug. | *Brace yourself.*', mood: 'heart', look: [1, 0], star: { x: lt => 0 }, hops: [0.4, 0.8, 1.2],
    back(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillRect(160, 760 + i * 50, 120 + (i % 2) * 60, 10) }
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 900, 220 * k, { mood: lt > 1.2 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false })
      label(x, 800, 650, 'HUG: 0 TO 60', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: CORAL, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 680, 820, P.t0 + 1.3, { n: 6, life: 1.6, spread: 220, cell: 7, seed: 8 })
    } },
  { sign: S, cap: '“You’re late!” | *They counted every minute.*', mood: lt => lt > 1.4 ? 'heart' : 'eyeroll', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), 2 + Math.min(4, lt * 3))
      bubble(x, 790, 620, 'FOUR minutes late!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 38, col: CORAL, tail: 'bl' })
      label(x, 790, 1100, '(missed you)', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]
CAMEOS[7].star = { x: -180 }

const F = makeFilm({
  id: 'r2a0443', key: 'C', accent: CORAL, solo: S, ending: 'group',
  title: 'Signs an Aries | *misses you.*',
  cameos: CAMEOS,
  group: {
    cap: 'They miss you. | *Loudly.*', mood: 'heart',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
