// r2t0332: star_talk, SOLO, "Aries at a party | be like." (~51 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole way: nine party moments, each the most extreme (and lovable) Aries version. Ending: lesson.
//   0.0–3.6    "Aries at a party | *be like.*"  One big Aries pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              arrived before the host · started the dance floor, alone · party game became a final (gold medal)
//              · met every guest in ten minutes · asked your sign, then challenged it · ate the cake before the song
//              · lost one card game, rematch number seven · music too slow, took over the speaker · left before
//              goodbyes, off to party two
//  37.8        "First in. | *Loudest out.*"  Aries comes back, big.
//  41.0        LESSON UNLOCKED: "Every party needs a spark. | Aries *is the match.*"  STATUS: ENERGIZED
//  46.9        "Next party? | *Already there.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#ff5a4f', PAPER = '#fff4e2'

// ── props
const DISCO = [
  '....K....',
  '....K....',
  '..SsSsS..',
  '.SsSsSsS.',
  'SsSsSsSsS',
  'sSsSsSsSs',
  'SsSsSsSsS',
  '.SsSsSsS.',
  '..SsSsS..',
]
const MEDAL = [
  'R.......R',
  '.R.....R.',
  '..R...R..',
  '...RRR...',
  '..YYYYY..',
  '.YYyyyYY.',
  '.YyYYYyY.',
  '.YYyyyYY.',
  '..YYYYY..',
]
const MEDAL_C = { R: RED, Y: GOLD, y: '#fff1b0' }
const CAKE = [
  '..F..F..F..',
  '..W..W..W..',
  '.PPPPPPPPP.',
  'PpPPpPPpPPp',
  'CCCCCCCCCCC',
  'HHHHHHHHHHH',
  'CCCCCCCCCCC',
  'CCCCCCCCCCC',
]
const CAKE_C = { F: '#ffb34a', W: BONE, P: '#ffffff', p: '#ffc2d6', C: '#c98f5a', H: '#ff4f86' }
const SPEAKER = [
  'KKKKKKKKK',
  'KGGGGGGGK',
  'KGGKKKGGK',
  'KGKGGGKGK',
  'KGGKKKGGK',
  'KGGGGGGGK',
  'KGGKKKGGK',
  'KGKGGGKGK',
  'KGKGGGKGK',
  'KGGKKKGGK',
  'KKKKKKKKK',
]
const SPEAKER_C = { K: '#2a2350', G: '#6b62a8' }

// a "HELLO my name is" sticker
function nameTag(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 312, 212)
  x.fillStyle = INK; x.fillRect(-160, -110, 320, 220)
  x.fillStyle = RED; x.fillRect(-152, -102, 304, 84)
  x.fillStyle = PAPER; x.fillRect(-152, -18, 304, 120)
  x.fillStyle = '#fff'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('HELLO', 0, -60)
  x.fillStyle = INK; x.font = `800 50px ${INTER}`; x.fillText('ARIES!!', 0, 42)
  x.restore()
}
// a fan of playing cards
function cards(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 3; i++) {
    x.save(); x.rotate((i - 1) * 0.28); x.translate(0, -40)
    x.fillStyle = INK; x.fillRect(-66, -96, 132, 192)
    x.fillStyle = PAPER; x.fillRect(-60, -90, 120, 180)
    x.fillStyle = i === 1 ? RED : INK; x.font = `800 56px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['7', 'A', '2'][i], 0, 0)
    x.restore()
  }
  x.restore()
}
// a door, ajar, with motion lines out of it
function door(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -200, 220, 400)
  x.fillStyle = '#1e1446'; x.fillRect(-100, -190, 200, 390)
  const open = clamp((lt - 0.4) / 0.5)
  x.fillStyle = '#c98f5a'; x.fillRect(-100, -190, 200 * (1 - 0.65 * open), 390)
  x.fillStyle = GOLD; x.fillRect(-100 + 200 * (1 - 0.65 * open) - 30, 0, 14, 14)
  x.fillStyle = BONE
  for (let i = 0; i < 3; i++) if (open > 0.6) x.fillRect(40 + i * 8, -80 + i * 60, 60 + 20 * Math.sin(lt * 8 + i), 8)
  x.restore()
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Arrived first. | *Before the host.*', mood: 'sparkle', ...S, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 990, 200 * k, { mood: 'sleepy', look: [-1, 0], seed: 15, glyph: false })
      label(x, 800, 700, 'PARTY STARTS: 9PM', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 820, 'it’s 6pm??', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
    } },
  { sign: 'aries', cap: 'Started the dance floor. | *Alone.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', ...S, hops: [0.5, 0.9, 1.3, 1.7, 2.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      x.save(); x.fillStyle = BONE; x.globalAlpha = 0.5 * k; x.fillRect(797, 600, 6, 70); x.restore()
      drawBits(x, DISCO, { K: BONE, S: '#d8dbe8', s: '#9aa0c0' }, 800, 730, 20 * k, { rot: Math.sin(lt * 3) * 0.08 })
      notes(x, t, 400, 760, { n: 4, cell: 7, col: RED, seed: 3 })
      label(x, 800, 1060, 'DANCERS: 1', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Casual party game? | Now *it’s a final.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', ...S, hops: [1.45],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 680, 'PARTY GAME: FINAL', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, MEDAL, MEDAL_C, 800, 900, 20 * pop01(t, P.t0 + 1.3, 0.35, 2.2))
      sparkles(x, t, 800, 920, P.t0 + 1.4, 8, 170, 0.2)
      bubble(x, 800, 1110, 'GOLD. MINE.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Met every guest | *in ten minutes.*', mood: 'sparkle', ...S, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      nameTag(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = Math.round(clamp((lt - 0.4) / 1.6) * 40)
      label(x, 790, 1100, `GUESTS MET: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Asked your sign. | Then *challenged it.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', ...S, hops: [1.25],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 990, 200 * k, { mood: lt > 1.3 ? 'wide' : 'happy', look: [-1, 0], seed: 16, glyph: false })
      bubble(x, 560, 640, 'your sign?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      bubble(x, 800, 760, 'virgo.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'br' })
      label(x, 700, 1150, 'ARIES VS VIRGO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: RED, color: '#fff', rot: -0.03 })
    } },
  { sign: 'aries', cap: 'Ate the cake | *before the song.*', mood: lt => lt > 1.2 ? 'wide' : 'heart', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CAKE, CAKE_C, 800, 920, 22 * k)
      if (lt > 0.8 && k > 0.5) { x.fillStyle = '#140c30'; x.beginPath(); x.arc(800 - 120, 940, 60, 0, Math.PI * 2); x.fill() }
      bubble(x, 800, 690, 'happy birth—', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
      label(x, 800, 1110, 'ONE BITE', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aries', cap: 'Lost one card game. | *Rematch number seven.*', mood: lt => lt > 1.5 ? 'squint' : 'neutral', ...S,
    front(x, t, lt, P) {
      cards(x, 800, 930, pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.4) * 6)
      label(x, 800, 690, `REMATCH #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 42, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1130, 'best of fifty?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aries', cap: 'Music too slow? | *Took the speaker.*', mood: 'sparkle', ...S, hops: [0.9, 1.5, 2.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2) * (1 + 0.06 * Math.max(0, Math.sin(lt * 18)) * (lt > 0.9 ? 1 : 0))
      drawBits(x, SPEAKER, SPEAKER_C, 800, 920, 22 * k)
      label(x, 800, 660, lt > 0.9 ? 'TEMPO: MAX' : 'TEMPO: CHILL', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 38, bg: lt > 0.9 ? RED : SKYB, color: lt > 0.9 ? '#fff' : INK, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 0.9) notes(x, t, 600, 1080, { n: 5, cell: 8, col: GOLD, seed: 1 })
    } },
  { sign: 'aries', cap: 'Left before goodbyes. | *Off to party two.*', mood: 'wink', ...S, star: { x: -190 },
    front(x, t, lt, P) {
      door(x, 800, 920, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 800, 660, 'PARTY #2 →', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 520, 640, 'bye-ee!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0332', key: 'E', accent: RED, solo: 'aries', ending: 'lesson',
  title: 'Aries at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'First in. | *Loudest out.*', mood: 'sparkle' },
  lesson: { text: 'Every party needs a spark. | Aries *is the match.*', chip: 'STATUS: ENERGIZED' },
  last: {
    text: 'Next party? | *Already there.*',
    draw(x, t, lt) { sparkles(x, t, 540, 1200, t - lt + 0.6, 10, 260, 0.3) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
