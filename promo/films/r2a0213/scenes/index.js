// r2a0213: star_advice, ADVICE SOLO, "What Cancers need | after a fight." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "What Cancers need | *after a fight.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              goes quiet (a blanket shell, brb) · needs to hear "we're okay" · a hug fixes more than words
//              · replays it all night (the replay, paused) · soup and an honest talk · sorry goes both ways
//              · feelings aren't too much (a heart that keeps growing) · a match sends a flower · after the storm, a rainbow
//  37.8        "Soft heart. | *Strong love.*"  Cancer comes back, big.
//  41.0        LESSON UNLOCKED: "Feelings first. | *Then* fixing."  STATUS: MADE UP
//  46.9        "Best part of a fight? | *Making up.*" over the match card: Cancer + Taurus (the hug, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEARL = '#cfe8ff', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', GREEN = '#5fd068'
const S = 'cancer'

// ── props
const BOWL = [
  '.s..s..s.',
  's..s..s..',
  '.........',
  'WWWWWWWWW',
  'WOOOOOOOW',
  '.WWWWWWW.',
  '..WWWWW..',
]
const BOWL_C = { W: CREAM, O: ORANGE, s: 'rgba(239,230,214,0.7)' }
const FLOWER = [
  '..PP.PP..',
  '.PPPPPPP.',
  '..PPYPP..',
  '.PPPPPPP.',
  '..PP.PP..',
  '....G....',
  '..GGG....',
  '....GGG..',
  '....G....',
]
const FLOWER_C = { P: PINK, Y: GOLD, G: GREEN }
const CLOUD = [
  '....GGGG......',
  '..GGGGGGGG.GG.',
  '.GGGGGGGGGGGGG',
  'GGGGGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
]

// a TV with a looping "replay" and a pause overlay
function tv(x, t, cx, cy, k, paused) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = '#2a2350'; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = '#140c30'; x.fillRect(-146, -106, 292, 202)
  x.fillStyle = INK; x.fillRect(-60, 120, 120, 16); x.fillRect(-12, 112, 24, 14)
  x.fillStyle = paused ? '#8a8aa0' : RED; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(paused ? 'PAUSED' : `REPLAY #${1 + Math.floor((t * 6) % 40)}`, 0, -60)
  if (paused) { x.fillStyle = CREAM; x.fillRect(-34, -20, 24, 80); x.fillRect(10, -20, 24, 80) }
  else { x.fillStyle = CREAM; x.beginPath(); x.moveTo(-26, -20); x.lineTo(34, 20); x.lineTo(-26, 60); x.fill() }
  x.restore()
}
// a notification card
function notif(x, cx, cy, k, title, body) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -50, 312, 112)
  x.fillStyle = INK; x.fillRect(-160, -62, 320, 116); x.fillStyle = '#2a2350'; x.fillRect(-152, -54, 304, 100)
  x.fillStyle = MINT; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -134, -24)
  x.fillStyle = CREAM; x.font = `800 28px ${INTER}`; x.fillText(body, -134, 16)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You go quiet after a fight. | *Space is okay.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', star: { x: -40, y: 20, s: 280 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 40); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 190, 120, 0, Math.PI, 0); x.fill(); x.fillRect(-190, 40, 380, 100)
        x.fillStyle = LAV; x.beginPath(); x.ellipse(0, 46, 180, 110, 0, Math.PI, 0); x.fill(); x.fillRect(-180, 46, 360, 86)
        x.fillStyle = '#a88ae0'; for (let i = 0; i < 5; i++) x.fillRect(-150 + i * 70, 60, 30, 60)
        x.restore()
      }
      label(x, 760, 620, 'IN MY SHELL · BRB', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: PEARL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You need to hear | *“we’re okay.”*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'hey. | we’re okay.', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 790, 1050, 'EXHALE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 44, bg: PEARL, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 980, P.t0 + 1.4, { n: 5, life: 1.2, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'A hug fixes | *more than words.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: { x: -120 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const d = ease.inOutCubic(prog(lt, 0.4, 1.0))
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', lerp(900, 680, d), 900, 280 * k, { mood: d >= 1 ? 'heart' : 'happy', look: [-1, 0], seed: 46, glyph: false })
      label(x, 540, 1130, 'HUG: APPLIED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
      hearts(x, t, 540, 800, P.t0 + 1.2, { n: 7, life: 1.6, spread: 260, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Replaying it all night? | *Press pause.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      tv(x, t, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), lt > 1.3)
      label(x, 790, 1080, 'REST MODE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Comfort food helps. | *So does talking.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 660, 'can we talk?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1100, 'SOUP + HONESTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Always say sorry first? | *Let them, too.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 560, 640, 'sorry.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 860, 'no, I’m | sorry.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'br' })
      label(x, 790, 1110, 'BOTH SORRY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: PEARL, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your feelings | *aren’t too much.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.2, 1.4))
      const beat = 1 + 0.06 * Math.sin(t * 9)
      drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 790, 860, (8 + 26 * g) * beat * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 1110, 'SIZE: JUST RIGHT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your match sent a flower? | *Let it in.*', mood: lt => lt > 1.3 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      notif(x, 760, 660, 1.25 * pop01(t, P.t0 + 0.2, 0.3, 2), '✦ YOUR MATCH', 'sent you: a flower')
      const d = ease.outCubic(prog(lt, 0.8, 1.3))
      drawBits(x, FLOWER, FLOWER_C, lerp(900, 700, d), lerp(1100, 930, d), 20 * pop01(t, P.t0 + 0.9, 0.3, 2), { rot: -0.1 })
      sparkles(x, t, 700, 930, P.t0 + 1.4 * 1.29, 7, 150, 0.4)
    } },
  { sign: S, cap: 'After the storm? | *You’re still you two.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const r = ease.outCubic(prog(lt, 1.0, 1.7))
      if (r > 0.01) {
        const COLS = [RED, ORANGE, GOLD, GREEN, SKYB, LAV]
        x.save(); x.lineWidth = 22
        COLS.forEach((c, i) => { x.strokeStyle = c; x.beginPath(); x.arc(770, 1060, 200 - i * 20, Math.PI, Math.PI + Math.PI * r); x.stroke() })
        x.restore()
      }
      drawBits(x, CLOUD, { G: '#7a7f99' }, 790 + 300 * prog(lt, 0.7, 1.4), 760, 14 * pop01(t, P.t0 + 0.15, 0.3, 2), { alpha: 1 - prog(lt, 1.0, 1.4) })
      label(x, 790, 1110, 'STILL US', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: PEARL, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0213', key: 'C', accent: PEARL, solo: S, ending: 'card',
  title: 'What Cancers need | *after a fight.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'taurus', chip: 'MADE UP' },
  group: { cap: 'Soft heart. | *Strong love.*', mood: 'sparkle' },
  lesson: { text: 'Feelings first. | *Then* fixing.', chip: 'STATUS: MADE UP' },
  last: { text: 'Best part of a fight? | *Making up.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
