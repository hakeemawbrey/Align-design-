// r2a0343: star_advice, ADVICE SOLO, "Gemini, this is your | sign to slow down." (~43 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Gemini truth + a warm reframe, one light gag each.
//   0.0–3.6    "Gemini, this is your | sign *to slow down.*"  One big Gemini pops in, then dives away.
//   3.6–37.8   nine cards (3.8 s each):
//              three chats at once, the bubbles pile up · talking at 2× speed, the dial clicks back to 1×
//              · five new hobbies this week · lunch eaten in forty seconds, walking · a 2 a.m. idea storm, one note, sleep
//              · changed your mind again, the arrow spins · a flower says hello as you speed past
//              · an hour of scrolling, a little bird waves · a Sunday with PLANS: NONE ✓
//  37.8        group ending: "Same brilliant you. | *Half the speed.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const YEL = '#ffd23a', WOOD = '#8a4a2e', PAPER = '#fff4e2'

// ── props
const SANDWICH = [
  '..BBBBBBBBB..',
  '.BBBBBBBBBBB.',
  'GGGGGGGGGGGGG',
  'RRRRRRRRRRRRR',
  'YYYYYYYYYYYYY',
  '.BBBBBBBBBBB.',
]
const SANDWICH_C = { B: '#e8a24a', G: '#5fd068', R: '#e23d4e', Y: '#ffe7a8' }
const MOON = [
  '...YYYY.',
  '.YYYY...',
  'YYYY....',
  'YYY.....',
  'YYY.....',
  'YYYY....',
  '.YYYY...',
  '...YYYY.',
]
const MOON_C = { Y: '#ffe7a8' }
const FLOWER = [
  '..PP.PP..',
  '.PPPPPPP.',
  '.PPYYYPP.',
  'PPPYKYPPP',
  '.PPYYYPP.',
  '.PPPPPPP.',
  '..PP.PP..',
  '....G....',
  '..GGG....',
  '....GGG..',
  '....G....',
  '....G....',
]
const FLOWER_C = { P: PINK, Y: YEL, K: INK, G: '#5fd068' }
const BIRD = [
  '..BBB...',
  '.BBKBB..',
  'BBBBBBOO',
  'BBBBBB..',
  '.BBBB...',
  '..O.O...',
]
const BIRD_C = { B: '#6fc3ff', K: INK, O: '#ffb34a' }
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KKKGGKKK',
]
const PHONE_C = { K: '#2a2350', S: '#8fe3ff', W: '#ffffff', G: '#6b62a8' }
const COUCH = [
  'BBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBB',
  'ACCCCCCCCCCCCA',
  'ACCCCCCCCCCCCA',
  'AAAAAAAAAAAAAA',
  'W............W',
]
const COUCH_C = { B: '#c97bff', C: '#e0b3ff', A: '#9a5bd6', W: WOOD }

/** a card with ink border and drop shadow; fn draws inside (origin at the card's centre) */
function card(x, cx, cy, w, h, k, rot, bg, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  fn(); x.restore()
}
const txt = (x, s, X, Y, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

const S = 'gemini'
const CAMEOS = [
  { sign: S, cap: 'Three chats at once? | *Answer one. Breathe.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const W = ['so anyway—', 'wait, also!', 'ok ok ok'], C = [BONE, MINT, PINK]
      W.forEach((w, i) => bubble(x, 780 + (i % 2 ? 40 : -20), 650 + i * 130, w, pop01(t, P.t0 + 0.2 + i * 0.25, 0.25, 2.2) * (lt > 1.6 && i > 0 ? 0.0001 : 1), { size: 40, col: C[i], tail: i % 2 ? 'br' : 'bl' }))
      label(x, 790, 1080, 'ONE AT A TIME ✓', pop01(t, P.t0 + 1.8, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Talking at double speed? | *We’ll still be here.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const slow = lt > 1.3
      label(x, 790, 860, slow ? '1× SPEED' : '2× SPEED', pop01(t, P.t0 + 0.2, 0.3, 2) * (slow ? pop01(t, P.t0 + 1.3 * 1.29, 0.3, 2.4) : 1), { size: 64, bg: slow ? MINT : YEL, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 650, slow ? 'so… hi.' : 'sohiokwaitso—', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Five hobbies this week? | *Keep the favourite.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const H = ['POTTERY', 'FRENCH', 'DJ-ING', 'KAYAK', 'KNITTING']
      H.forEach((h, i) => {
        const keep = i === 4, fade = keep ? 1 : 1 - 0.55 * ease.outCubic(prog(lt, 1.4, 1.8))
        x.save(); x.globalAlpha = fade
        label(x, i % 2 ? 840 : 740, 640 + i * 105, keep && lt > 1.5 ? '♥ KNITTING' : h, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), { size: 34, bg: [GOLD, SKYB, LAV, MINT, PINK][i], rot: i % 2 ? 0.05 : -0.05 })
        x.restore()
      })
    } },
  { sign: S, cap: 'Lunch while walking? | *Sit. Taste it.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt > 1.3 ? 0 : 0.15 * Math.sin(t * 12) })
      label(x, 790, 700, lt > 1.3 ? 'LUNCH: 20 MIN ✓' : 'LUNCH: 40 SEC', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: lt > 1.3 ? MINT : YEL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '2 a.m. idea storm? | *Jot one. Sleep.*', mood: lt => lt > 1.5 ? 'sleepy' : 'sparkle', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, MOON, MOON_C, 880, 620, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      card(x, 770, 900, 280, 260, pop01(t, P.t0 + 0.5, 0.3, 2), 0.05, PAPER, () => {
        txt(x, 'IDEAS:', 0, -80, 30, INK, MONO, 700)
        txt(x, '1. a café for cats', 0, -20, 24, '#6b62a8', MONO, 700)
        x.save(); x.globalAlpha = clamp((lt - 1.2) / 0.3); txt(x, 'that’s enough.', 0, 50, 26, '#e23d4e', INTER, 800); x.restore()
      })
      if (lt > 1.6) for (let i = 0; i < 3; i++) { const ph = ((lt - 1.6) * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); txt(x, 'z', 520 + ph * 70 + i * 16, 780 - ph * 120, 36 + i * 8, BONE); x.restore() }
    } },
  { sign: S, cap: 'Changed your mind again? | *Allowed. No rush.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), spin = lt < 1.5 ? lt * 9 : 1.5 * 9 + 0
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-10, 0, 20, 220)
        x.rotate(Math.round(spin / Math.PI) * Math.PI)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-160, -24); x.lineTo(110, -24); x.lineTo(110, -56); x.lineTo(175, 0); x.lineTo(110, 56); x.lineTo(110, 24); x.lineTo(-160, 24); x.closePath(); x.fill()
        x.fillStyle = YEL; x.beginPath(); x.moveTo(-150, -14); x.lineTo(118, -14); x.lineTo(118, -40); x.lineTo(162, 0); x.lineTo(118, 40); x.lineTo(118, 14); x.lineTo(-150, 14); x.closePath(); x.fill()
        x.restore()
      }
      label(x, 790, 650, lt > 1.5 ? 'FINAL ANSWER… ish' : 'YES! NO! YES!', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 1.5 ? MINT : PINK, rot: -0.04 })
    } },
  { sign: S, cap: 'Zooming past everything? | *Notice the flowers.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, FLOWER, FLOWER_C, 800, 990, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      bubble(x, 830, 700, 'oh hello.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 46, col: PINK, tail: 'bl' })
      hearts(x, t, 800, 900, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Scrolled for an hour? | *Look up. Hi.*', mood: lt => lt > 1.3 ? 'sparkle' : 'sleepy', look: lt => lt > 1.3 ? [1, -1] : [0, 1], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, PHONE_C, 760, 1030, 18 * pop01(t, P.t0 + 0.2, 0.3, 2) * (lt > 1.3 ? 0.8 : 1), { rot: 0.08 })
      const b = pop01(t, P.t0 + 1.3 * 1.29, 0.35, 2)
      drawBits(x, BIRD, BIRD_C, 840, 700 + 8 * Math.sin(t * 6), 18 * b)
      bubble(x, 860, 560 + 20, 'hi!', b, { size: 44, tail: 'bl' })
    } },
  { sign: S, cap: 'Restless on a Sunday? | *Doing nothing counts.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      drawBits(x, COUCH, COUCH_C, 790, 1040, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
    },
    front(x, t, lt, P) {
      label(x, 790, 760, 'PLANS: NONE ✓', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 42, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 790, 760, P.t0 + 1.2, 6, 160, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2a0343', key: 'C', accent: YEL, solo: 'gemini', ending: 'group',
  title: 'Gemini, this is your | sign *to slow down.*',
  cameos: CAMEOS,
  group: { cap: 'Same brilliant you. | *Half the speed.*', mood: 'happy' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
