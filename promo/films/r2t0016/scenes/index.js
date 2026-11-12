// r2t0016: star_talk, SOLO, "Pisces keeping a secret | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). Pisces cries in every card. Ending: lesson.
//   0.0–3.6    "Pisces with a secret | *be like.*"
//   3.6–37.8   promised not to tell, cried instantly (the padlock cracks) · surprise party next week, hasn't slept
//              · wrote it in the diary, twelve pages · whispered it to the moon · "you okay?" almost confessed
//              · wrote a sad song about not telling · your big match news? Pisces already knew
//              · kept it one whole hour, personal best · one hug, spilled everything
//  37.8        "Zero secrets. | *All heart.*"
//  41.0        LESSON UNLOCKED: "Can’t hide a feeling? | That’s *the gift.*"  HEART: OPEN
//  46.9        "Next secret? | *Tell the moon.*"  The moon comes back, winking.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, notes, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#6fc3ff', RED = '#e23d4e'

// ── props
const LOCK = [
  '...KKKKK...',
  '..KK...KK..',
  '..K.....K..',
  '..K.....K..',
  'GGGGGGGGGGG',
  'GYYYYYYYYYG',
  'GYYYYKYYYYG',
  'GYYYKKKYYYG',
  'GYYYYKYYYYG',
  'GYYYYKYYYYG',
  'GYYYYYYYYYG',
  'GGGGGGGGGGG',
]
const LOCK_C = { K: '#9aa5c4', G: '#c99a2e', Y: GOLD }
function crack(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = INK; x.lineWidth = 9; x.lineCap = 'square'
  const pts = [[-70, -40], [-20, 0], [-45, 30], [10, 70], [-10, 110]]
  x.beginPath(); pts.slice(0, 1 + Math.round(k * (pts.length - 1))).forEach(([a, b], i) => i ? x.lineTo(cx + a, cy + b) : x.moveTo(cx + a, cy + b)); x.stroke(); x.restore()
}
const DIARY = [
  'PPPPPPPPPPPP',
  'PWWWWWWWWWWP',
  'PWKKKKKKKKWP',
  'PWWWWWWWWWWP',
  'PWKKKKKKWWWP',
  'PWWWWWWWWWWP',
  'PWKKKKKKKKWP',
  'PWWWWWWWWWWP',
  'PWKKKKKWWWWP',
  'PWWWWWWWWWWP',
  'PWKKKKKKKWWP',
  'PPPPPPPPPPPP',
]
const MOON = [
  '...MMMM...',
  '..MMMM....',
  '.MMMM.....',
  'MMMMM.....',
  'MMMMM.....',
  'MMMMM.....',
  'MMMMMM....',
  '.MMMMMM..M',
  '..MMMMMMMM',
  '...MMMMM..',
]
const GUITAR = [
  '.........KK',
  '........KK.',
  '.......KK..',
  '......KK...',
  '..OOOKK....',
  '.OOOOOO....',
  'OOOKKOOO...',
  'OOOKKOOO...',
  '.OOOOOO....',
  '..OOOO.....',
]
function stopwatch(x, cx, cy, k, t, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-24, -150, 48, 36); x.fillStyle = '#9aa5c4'; x.fillRect(-16, -144, 32, 26)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = SEA; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  const a = -Math.PI / 2 + lt * 2.6
  x.strokeStyle = RED; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 74, Math.sin(a) * 74); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'pisces'
const CAMEOS = [
  // 1 · promised not to tell
  { sign: S, cap: 'Promised not to tell. | *Cried instantly.*', mood: lt => lt < 0.9 ? 'squint' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, LOCK, LOCK_C, 790 + (lt > 0.9 ? Math.sin(t * 50) * 4 : 0), 860, 24 * k)
      crack(x, 790, 900, ease.outCubic(prog(lt, 0.9, 1.4)))
      label(x, 790, 1110, 'SECRET: LEAKING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · surprise party next week
  { sign: S, cap: 'Surprise party next week. | *Hasn’t slept since.*', mood: lt => lt < 1.0 ? 'wide' : 'sleepy', tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      const d = 7 - Math.min(5, Math.floor(prog(lt, 0.3, 1.8) * 5.99))
      label(x, 790, 760, `PARTY IN: ${d} DAYS`, pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 960, 'I know | NOTHING.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1140, 'SLEEP: 0 HRS', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 3 · wrote it in the diary
  { sign: S, cap: 'Wrote it in the diary. | *Twelve pages.*', mood: 'squint', look: [1, 1], tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, { P: SEA, W: BONE, K: '#9aa5c4' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      const n = 1 + Math.min(11, Math.floor(prog(lt, 0.5, 2.0) * 11.99))
      label(x, 790, 640, `PAGE ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 40, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1120, '“I CAN’T SAY BUT…”', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04 })
    } },
  // 4 · whispered it to the moon
  { sign: S, cap: 'Whispered it | *to the moon.*', mood: 'sparkle', look: [1, -1], tears: 1, star: { x: -170, y: 60 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, MOON, { M: '#fff1b0' }, 800, 650, 22 * k, { rot: -0.1 })
      sparkles(x, t, 800, 650, P.t0 + 0.5, 7, 150, 0.3, [GOLD, BONE, SKYB])
      bubble(x, 560, 640, 'psst…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 900, 'MOON: SWORN IN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 5 · "you okay?"
  { sign: S, cap: '“You okay?” | *Almost confessed everything.*', mood: lt => lt < 1.0 ? 'neutral' : 'wide', look: [1, 0], tears: lt => lt < 1.0 ? 1 : 3, star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 980, 200 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
      bubble(x, 820, 740, 'you okay?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 42, tail: 'bc' })
      bubble(x, 560, 600, 'NOTHING!! | I’M FINE!!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
  // 6 · wrote a sad song about it
  { sign: S, cap: 'Wrote a sad song | *about not telling.*', mood: 'sleepy', tears: 2, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GUITAR, { O: '#e0a56a', K: '#8a4a2e' }, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.1 })
      notes(x, t, 790, 760, { n: 5, cell: 9, col: SKYB, alpha: pop01(t, P.t0 + 0.6, 0.3, 2) })
      label(x, 790, 1130, 'TRACK 1: “I CAN’T”', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 7 · Align: your big match news
  { sign: S, cap: 'Your big match news? | Pisces *already knew.*', mood: lt => lt < 1.1 ? 'wide' : 'wink', tears: lt => lt < 1.1 ? 1 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 700, '✦ IT’S A MATCH', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 900, 'gasp!! | (I KNEW)', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 42, col: PINK, tail: 'bl' })
      label(x, 790, 1110, 'ACTING: BAD', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  // 8 · kept it one whole hour
  { sign: S, cap: 'Kept it one whole hour. | *Personal best.*', mood: lt => lt < 1.3 ? 'squint' : 'sparkle', tears: 1, star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      stopwatch(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), t, lt)
      label(x, 790, 1110, 'NEW RECORD: 1 HR', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 170, 0.2)
    } },
  // 9 · one hug, spilled everything
  { sign: S, cap: 'One hug. | *Spilled everything.*', mood: lt => lt < 0.9 ? 'heart' : 'wide', tears: 3, star: { x: -150 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'leo', 780, 930, 230 * k, { mood: lt < 0.9 ? 'happy' : 'wide', look: [-1, 0], seed: 33, glyph: false })
      hearts(x, t, 660, 760, P.t0 + 0.3, { n: 4, life: 1.2, spread: 140, cell: 6, seed: 5 })
      bubble(x, 560, 590, 'IT’S A | PARTY!!', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      label(x, 790, 1130, 'SURPRISE: RUINED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0016', key: 'C', accent: SEA, solo: 'pisces', ending: 'lesson',
  title: 'Pisces with a secret | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Zero secrets. | *All heart.*', mood: 'heart' },
  lesson: { text: 'Can’t hide a feeling? | That’s *the gift.*', chip: 'HEART: OPEN' },
  last: {
    text: 'Next secret? | *Tell the moon.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, MOON, { M: '#fff1b0' }, 400, 1280, 24 * k, { rot: -0.1 + 0.05 * Math.sin(t * 2) })
      sparkles(x, t, 400, 1280, t - lt + 0.9, 8, 170, 0.2, [GOLD, BONE, SKYB])
      bubble(x, 700, 1230, 'safe with me', pop01(t, t - lt + 1.4, 0.25, 2.2), { size: 46, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
