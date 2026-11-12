// r2a0063: ADVICE SOLO, "Pisces, before you | send that text." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Pisces texting truth + a warm reframe, one gag
// each. Pisces cries in every card (gently).
//   0.0–3.6    "Pisces, before you | *send that text.*"
//   3.6–37.8   drafted a paragraph? sleep on it · reading into one "k"? it's just a k · waiting on a reply? still lovely
//              (an hourglass) · crying while typing? feel it, then send · a song lyric as a reply? maybe just say hi
//              · texting your ex late? text your bestie · four sorrys? delete one · too many hearts? no such thing
//              · ran the compatibility check? now breathe
//  37.8        "Soft heart. | *Steady thumbs.*"
//  41.0        LESSON: "Big feelings | can *wait till morning.*"  DRAFTS: SAVED
//  46.9        "Plot twist: | *they texted first.*" over the match card: Pisces + Taurus (the waiting card, paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const S = 'pisces', PUR = '#7c74f0', RED = '#e23d4e'

// ── props
const HOURGLASS = [
  'WWWWWWWWW',
  '.G.....G.',
  '.GSSSSSG.',
  '..GSSSG..',
  '...GSG...',
  '....S....',
  '...G.G...',
  '..G.S.G..',
  '.G.SSS.G.',
  '.GSSSSSG.',
  'WWWWWWWWW',
]
const HOURGLASS_C = { W: '#c98f2a', G: '#bfe9ff', S: GOLD }
const TISSUE = [
  '...WWW...',
  '..WWWWW..',
  '...WWW...',
  'BBBBBBBBB',
  'BPBBBBBPB',
  'BBBBBBBBB',
  'BBBBBBBBB',
]
const TISSUE_C = { W: '#ffffff', B: SKYB, P: PINK }

// a phone with a slot for its screen contents
function phone(x, cx, cy, k, fn, rot = 0.05) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -176, 236, 364)
  x.fillStyle = INK; x.fillRect(-124, -188, 248, 376)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -178, 228, 356)
  x.fillStyle = '#140c30'; x.fillRect(-100, -150, 200, 300)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(); x.restore()
}
// a contact row: name with an optional strike-through
function contact(x, y, name, col, strike = 0) {
  x.fillStyle = '#3d3470'; x.fillRect(-88, y - 30, 176, 60)
  x.fillStyle = col; x.font = `800 30px ${INTER}`; x.fillText(name, 0, y + 2)
  if (strike > 0) { x.fillStyle = RED; x.fillRect(-70, y - 3, 140 * strike, 8) }
}

const CAMEOS = [
  { sign: S, cap: 'Drafted a paragraph? | *Sleep on it first.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        const n = Math.min(9, Math.floor(lt * 5))
        x.fillStyle = BONE; for (let i = 0; i < n; i++) x.fillRect(-80, -130 + i * 30, i % 3 === 2 ? 110 : 160, 12)
      })
      label(x, 790, 640, 'WORDS: 1,204', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1090, 'SAVED FOR MORNING', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04 })
    } },
  { sign: S, cap: 'Reading into one “k”? | *It’s just a k.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 2 : 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 790, 'k', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 120, col: SKYB, tail: 'bl' })
      label(x, 790, 1040, 'IT’S FINE. REALLY.', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Waiting on a reply? | *You’re still lovely.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', tears: 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HOURGLASS, HOURGLASS_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.5) * 0.06 })
      label(x, 790, 1100, 'LOVELY: CONFIRMED', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04 })
      hearts(x, t, 470, 760, P.t0 + 1.3, { n: 4, life: 1.5, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Crying while typing? | *Feel it. Then send.*', mood: 'wide', tears: 3, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 900, 26 * pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 800, 680, 'FEELINGS: VALID', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04 })
      label(x, 800, 1100, 'TISSUES: STOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04 })
    } },
  { sign: S, cap: 'Replying in song lyrics? | *Maybe just say hi.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      notes(x, t, 790, 900, { n: 5, cell: 8, col: LAV, seed: 2, alpha: 1 - prog(lt, 1.1, 1.4) })
      bubble(x, 790, 740, lt < 1.3 ? '♪ and I will | always ♪…' : 'hi :)', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1060, 'SIMPLE IS SWEET', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Texting your ex late? | *Text your bestie.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), () => {
        contact(x, -60, 'THE EX', '#9aa5c4', prog(lt, 0.8, 1.1))
        if (lt > 1.2) contact(x, 40, 'BESTIE ♥', MINT)
      })
      label(x, 790, 1100, 'CALLING BESTIE…', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Four sorrys in one text? | *Delete one.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = lt > 1.2 ? 3 : 4
      label(x, 790, 820, `SORRY ×${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 64, bg: BONE, rot: 0.03, font: MONO, weight: 700 })
      sparkles(x, t, 790, 820, P.t0 + 1.2, 7, 160, 0.3)
      label(x, 790, 1010, 'GROWTH.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05 })
    } },
  { sign: S, cap: 'Sent too many hearts? | *No such thing.*', mood: 'heart', tears: 2, look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      hearts(x, t, 790, 1060, P.t0 + 0.3, { n: 14, life: 2.2, spread: 300, cell: 9, seed: 4 })
      label(x, 790, 760, 'HEARTS SENT: 14', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'RECEIVED WITH LOVE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
    } },
  { sign: S, cap: 'Checked your compatibility? | *Now breathe.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', tears: 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 790, 720, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      const p = clamp((lt - 0.4) / 1.0)
      x.save(); x.fillStyle = INK; x.fillRect(620, 830, 340, 50); x.fillStyle = '#3d3470'; x.fillRect(628, 838, 324, 34); x.fillStyle = PINK; x.fillRect(628, 838, 324 * p, 34); x.restore()
      bubble(x, 790, 1020, 'in… and out.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: MINT, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0063', key: 'C', accent: PUR, solo: S, ending: 'card',
  title: 'Pisces, before you | *send that text.*',
  cameos: CAMEOS,
  card: { a: 'pisces', b: 'taurus', chip: "IT'S A MATCH" },
  group: { cap: 'Soft heart. | *Steady thumbs.*', mood: 'heart' },
  lesson: { text: 'Big feelings | can *wait till morning.*', chip: 'DRAFTS: SAVED' },
  last: {
    text: 'Plot twist: | *they texted first.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
