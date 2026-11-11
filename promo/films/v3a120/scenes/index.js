// v3a120: star_advice, ADVICE SOLO, "What Aquarians need | in love." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): what an Aquarius needs in love, a warm reframe each, one gag each.
//   0.0–3.6    "What Aquarians need | *in love.*"  One big Aquarius pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              space, not distance (a little heart planet orbits them) · best friend first (a BFF bracelet: CRUSH TOO)
//              · "what if we moved to the moon?" and Libra says "I'll pack." (with a suitcase) · three quiet days, still
//              in love · a pigeon theory board and a partner with a question · feelings loading (a progress bar)
//              · someone who joins the cause (a two-star SAVE THE BEES sign) · keeps their hobbies, Gemini peeks
//              through the telescope too · a match that loves the weird: MATCHED: FELLOW ODDBALL
//  37.8        "Free spirit. | *Big heart.*"  Aquarius comes back, big.
//  41.0        LESSON UNLOCKED: "The right love | *gives you room.*"  SPACE: GIVEN
//  46.9        "Moon trip? | Libra *already packed.*"  (the suitcase, paid off). No match card.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const AQ = '#5fc8ff', WOOD = '#c98f2a', RED = '#e23d4e'
const S = 'aquarius'

// ── props
const HEARTP = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const BEE = ['..WW.WW..', '..WW.WW..', '.YKYKYKY.', 'YYKYKYKYK', '.YKYKYKY.', '...K.K...']
const BEE_C = { W: '#e8f6ff', Y: GOLD, K: INK }
const PIGEON = ['...GGG...', '..GGGKG..', '..GGGGGO.', '.GGGGG...', 'GGGGGGG..', '.GGGGGG..', '..G..G...']
const PIGEON_C = { G: '#9aa3c7', K: INK, O: '#ffb347' }
const SUITCASE = ['...KKKK...', '...K..K...', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', 'RRRRYYRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR']
const SUIT_C = { K: INK, R: '#ff7aa8', Y: GOLD }

// a phone with a header strip and a few lines on screen
function phone(x, cx, cy, k, { head = '', headBg = MINT, lines = [], lineBg = '#2a2350', ink = BONE, rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -182, 256, 380)
  x.fillStyle = INK; x.fillRect(-134, -194, 268, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -184, 248, 368)
  x.fillStyle = '#140c30'; x.fillRect(-112, -160, 224, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-100, -146, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(head, 0, -122) }
  lines.forEach(([txt, a], i) => {
    if (a <= 0.01) return
    x.save(); x.translate(0, -40 + i * 92); x.scale(a, a)
    x.fillStyle = lineBg; x.fillRect(-96, -38, 192, 76)
    x.fillStyle = ink; x.font = `800 26px ${INTER}`
    String(txt).split('|').forEach((l, j, arr) => x.fillText(l.trim(), 0, (j - (arr.length - 1) / 2) * 30 + 2))
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You need *space.* | It’s not goodbye.', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: 0, y: 10, s: 280 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.4, 1.6)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k); x.strokeStyle = 'rgba(239,230,214,0.55)'; x.lineWidth = 5; x.setLineDash([16, 12])
      x.beginPath(); x.ellipse(540, 880, 330 * k, 120 * k, -0.2, 0, Math.PI * 2); x.stroke(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      const a = t * 1.6, px = 540 + Math.cos(a) * 330 * Math.cos(-0.2) - Math.sin(a) * 120 * Math.sin(-0.2), py = 880 + Math.cos(a) * 330 * Math.sin(-0.2) + Math.sin(a) * 120 * Math.cos(-0.2)
      drawBits(x, HEARTP, { H: '#ff4f86', W: '#fff' }, px, py, 12 * k)
      label(x, 540, 560, 'ORBIT: CLOSE BY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: AQ, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Best friend first. | *Then* the rest.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'sagittarius', 800, 960, 200 * k, { mood: lt > 1.2 ? 'heart' : 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.5] })
      // a beaded bracelet arc between them
      const b = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (b > 0.01) {
        const COLS = [AQ, PINK, GOLD, MINT, LAV]
        for (let i = 0; i < 11; i++) {
          const a = Math.PI * (0.1 + 0.8 * i / 10), bx = 570 + Math.cos(a) * 170 * b, by = 1070 + Math.sin(a) * 60 * b
          x.fillStyle = INK; x.fillRect(bx - 17, by - 17, 34, 34); x.fillStyle = COLS[i % 5]; x.fillRect(bx - 13, by - 13, 26, 26)
        }
      }
      label(x, 570, 620, 'BFF. ALSO CRUSH.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Your wild ideas | deserve *a yes.*', mood: lt => lt > 1.5 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 440, 600, 'what if we moved | to the moon?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 940, 190 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], seed: 22, glyph: false, hops: [P.t0 + 1.6] })
      drawBits(x, SUITCASE, SUIT_C, 820, 1130, 12 * pop01(t, P.t0 + 1.3, 0.3, 2.2))
      bubble(x, 790, 720, 'I’ll pack.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Quiet days | *aren’t* red flags.', mood: lt => lt > 1.4 ? 'happy' : 'sleepy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'LAST TEXT: TUES', headBg: LAV, lines: [['still thinking | of you', pop01(t, P.t0 + 0.9, 0.3, 2.2)]] })
      label(x, 790, 1120, 'STILL IN LOVE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Find someone who | asks *follow-ups.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 1.8)
      if (k > 0.01) {
        x.save(); x.translate(720, 760); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 260); x.fillStyle = '#f4eee2'; x.fillRect(-162, -142, 324, 244)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('PIGEONS:', 0, -110); x.fillText('A THEORY', 0, -80)
        x.strokeStyle = RED; x.lineWidth = 4; x.beginPath(); x.moveTo(-120, -20); x.lineTo(-20, 30); x.lineTo(110, -30); x.lineTo(60, 80); x.stroke()
        x.restore()
        drawBits(x, PIGEON, PIGEON_C, 640, 800, 9 * k)
      }
      const c = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (c > 0.01) signChar(x, t, 'virgo', 830, 1060, 170 * c, { mood: 'wide', look: [-1, -1], seed: 23, glyph: false, hops: [P.t0 + 1.5] })
      bubble(x, 600, 1120, 'wait, | part two?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Feelings load slow. | *That’s okay.*', mood: lt => lt > 1.6 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = '#140c30'; x.fillRect(-160, -30, 320, 60)
        const p = ease.inOutCubic(prog(lt, 0.3, 1.6))
        for (let i = 0; i < 10; i++) if (i < p * 10) { x.fillStyle = i % 2 ? PINK : AQ; x.fillRect(-154 + i * 31.5, -24, 27, 48) }
        x.restore()
      }
      label(x, 790, 740, 'FEELINGS: LOADING', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.03, font: MONO, weight: 700 })
      if (lt > 1.6) hearts(x, t, 790, 860, P.t0 + 2.2, { n: 5, life: 1.4, spread: 200, cell: 7, seed: 5 })
      label(x, 790, 1000, 'WORTH THE WAIT', pop01(t, P.t0 + 2.2, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Love that joins | *your causes.*', mood: 'sparkle', star: { x: -150, s: 250 }, hops: [1.2],
    front(x, t, lt, P) {
      const c = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (c > 0.01) signChar(x, t, 'cancer', 720, 940, 220 * c, { mood: 'happy', look: [-1, 0], seed: 24, glyph: false, hops: [P.t0 + 1.6] })
      const k = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 620); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-12, 40, 24, 200)
        x.fillStyle = WOOD; x.fillRect(-6, 46, 12, 190)
        x.fillStyle = INK; x.fillRect(-230, -70, 460, 120); x.fillStyle = GOLD; x.fillRect(-222, -62, 444, 104)
        x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SAVE THE BEES', -10, -8)
        x.restore()
      }
      const b = pop01(t, P.t0 + 1.4, 0.3, 2)
      drawBits(x, BEE, BEE_C, 870 + Math.sin(t * 4) * 30, 560 + Math.cos(t * 5) * 18, 8 * b)
    } },
  { sign: S, cap: 'Keep your hobbies. | The right one *joins.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, -1], star: { x: -220, s: 270 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(640, 900); x.scale(k, k)
        x.fillStyle = INK; x.save(); x.rotate(-0.55); x.fillRect(-30, -40, 260, 62); x.fillStyle = '#9aa3c7'; x.fillRect(-24, -34, 248, 50); x.fillStyle = AQ; x.fillRect(200, -34, 24, 50); x.restore()
        x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(40, 10); x.lineTo(-30, 200); x.moveTo(40, 10); x.lineTo(110, 200); x.moveTo(40, 10); x.lineTo(40, 210); x.stroke()
        x.restore()
      }
      const g = pop01(t, P.t0 + 1.1, 0.35, 2)
      if (g > 0.01) signChar(x, t, 'gemini', 870, 980, 170 * g, { mood: 'sparkle', look: [-1, -1], seed: 25, glyph: false, hops: [P.t0 + 1.7] })
      sparkles(x, t, 820, 590, P.t0 + 0.9, 6, 70, 0.3)
      bubble(x, 820, 600, 'a new star!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'br' })
    } },
  { sign: S, cap: 'Match on the chart. | Stay for *the weird.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '✦ IT’S A MATCH', headBg: MINT, lines: [['“I collect | old maps.”', pop01(t, P.t0 + 0.8, 0.3, 2.2)]], lineBg: AQ, ink: INK })
      label(x, 790, 1110, 'FELLOW ODDBALL', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'v3a120', key: 'C', accent: AQ, solo: S, ending: 'lesson',
  title: 'What Aquarians | need *in love.*',
  cameos: CAMEOS,
  group: { cap: 'Free spirit. | *Big heart.*', mood: 'sparkle' },
  lesson: { text: 'The right love | *gives you room.*', chip: 'SPACE: GIVEN' },
  last: { text: 'Moon trip? | Libra *packed.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
