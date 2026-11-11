// v3a073: star_advice, ADVICE SOLO, "Taurus, stop doing | this in love." (~43 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Taurus love habit, a warm reframe, one gag each.
//   0.0–3.6    "Taurus, stop doing | *this in love.*"  One big Taurus pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              "I'm fine." (not fine, and that's okay) · the grudge rock: heavy, put it down · carrying every bag: let
//              them help · the comfy armchair: comfy, or happy? · snacks are love: "also… I like you" · same date spot,
//              ninth time: new spot? · the lonely I WAS RIGHT trophy · the safe opens: a soft heart · the hourglass: slow is good
//  37.8        group ending: "Stubborn heart. | *Worth the wait.*"  Taurus comes back, hearts.
import { clamp, prog, lerp, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2', GREEN = '#2fc79a', BROWN = '#8a4a2e'
const S = 'taurus'

function paper(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, head, headBg = PINK, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 54); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 29) }
  for (const l of lines) { if (l.k !== undefined && l.k <= 0.01) continue; x.fillStyle = l.color || INK; x.font = l.font || `800 ${l.size || 34}px ${INTER}`; x.fillText(l.text, l.x || 0, l.y) }
  x.restore()
}

// ── props
const ROCK = [
  '....GGGGG.....',
  '..GGGGGGGGGG..',
  '.GGgGGGGGGGGG.',
  'GGGGGGGGGgGGGG',
  'GGGGGGGGGGGGGG',
  'GGGgGGGGGGGGGG',
  '.GGGGGGGGGGGG.',
]
const ROCK_C = { G: '#8d8aa8', g: '#6c6888' }
const BAG = [
  '..L..YY.L..',
  '.LL.YYYYLL.',
  '.GG.YYY.GG.',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
  'BBBBBBBBBBB',
]
const BAG_C = { L: '#5fd38a', G: '#2f8f55', Y: '#ffd23a', B: '#d9b98a' }
const CHAIR = [
  '..PPPPPPPP..',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  '.PPPPPPPPPP.',
  'AAPPPPPPPPAA',
  'AACCCCCCCCAA',
  'AACCCCCCCCAA',
  'AAAAAAAAAAAA',
  '.L........L.',
]
const CHAIR_C = { P: '#c97dff', A: '#9b5fd6', C: '#e3b3ff', L: BROWN }
const COOKIE = [
  '..CCCCC..',
  '.CCdCCCC.',
  'CCCCCdCCC',
  'CdCCCCCCC',
  'CCCCdCCdC',
  '.CCCCCCC.',
  '..CCCCC..',
]
const COOKIE_C = { C: '#d9a45a', d: '#5a3420' }
const TROPHY = [
  'G.GGGGGG.G',
  'GGGGGGGGGG',
  'G.GGGGGG.G',
  '..GGGGGG..',
  '...GGGG...',
  '....GG....',
  '....GG....',
  '..BBBBBB..',
  '..BBBBBB..',
]
const TROPHY_C = { G: GOLD, B: BROWN }
const GLASS = [
  'WWWWWWWWW',
  '.GsssssG.',
  '..GsssG..',
  '...GsG...',
  '....G....',
  '...G.G...',
  '..G.s.G..',
  '.G.sss.G.',
  'WWWWWWWWW',
]
const GLASS_C = { W: BROWN, G: '#bfe9ff', s: '#f3dfae' }

function safe(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -140, 296, 296)
  x.fillStyle = INK; x.fillRect(-152, -152, 304, 304)
  x.fillStyle = '#7d86a8'; x.fillRect(-144, -144, 288, 288)
  x.fillStyle = '#140c30'; x.fillRect(-116, -116, 232, 232)
  if (open > 0.01) drawBits(x, HEART, { H: '#ff4f86', W: '#fff' }, 0, 0, 22 * clamp(open * 1.4))
  // the door swings open (squashes towards the left hinge)
  const w = 232 * (1 - open)
  if (w > 2) {
    x.fillStyle = '#9aa3c4'; x.fillRect(-116, -116, w, 232)
    if (w > 120) { x.fillStyle = INK; x.beginPath(); x.arc(-116 + w / 2, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9d1e0'; x.beginPath(); x.arc(-116 + w / 2, 0, 30, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Saying “I’m fine.” | *Say the real thing.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, "I'm fine.", pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 50, tail: 'bl' })
      bubble(x, 790, 920, 'okay… I was | a little hurt.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 400, 760, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: S, cap: 'That grudge? | *Set it down.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const drop = ease.inCubic(prog(lt, 1.0, 1.3))
      drawBits(x, ROCK, ROCK_C, 790, lerp(800, 1090, drop), 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, lerp(800, 1090, drop), 'GRUDGE', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 640, 'SO MUCH LIGHTER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: S, cap: 'Carrying it all? | *Let them help.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -150, y: 20 },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BAG, BAG_C, F.x - 165, F.cy + 90, 13 * k, { rot: -0.08 })
      drawBits(x, BAG, BAG_C, F.x + 165, F.cy + 90, 13 * k, { rot: 0.08 })
      drawBits(x, BAG, BAG_C, F.x, F.top - 60, 12 * k, { rot: 0.1 })
      bubble(x, 800, 700, 'need a hand?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 1060, 'YES, PLEASE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Comfy isn’t | *always right.*', mood: lt => lt > 1.4 ? 'neutral' : 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'COMFY?', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 40, bg: LAV, rot: -0.05 })
      label(x, 790, 750, 'OR HAPPY?', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Snacks are love. | *Say it too.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, COOKIE, COOKIE_C, 760, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, COOKIE, COOKIE_C, 840, 900, 22 * pop01(t, P.t0 + 0.35, 0.3, 2))
      bubble(x, 790, 680, 'also… | I like you.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      hearts(x, t, 790, 860, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Same date spot? | *Try somewhere new.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 820, 300, 250, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04, head: 'DATE NIGHT', headBg: GOLD,
        lines: [{ text: 'the usual spot', y: -10, size: 34 }, { text: 'visit #9', y: 50, size: 34, color: RED }] })
      bubble(x, 790, 1080, 'new spot?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
    } },
  { sign: S, cap: 'Being right | *isn’t the prize.*', mood: lt => lt > 1.4 ? 'neutral' : 'wink', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, TROPHY_C, 790, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'I WAS RIGHT', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
      label(x, 790, 1090, 'TABLE FOR ONE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'That soft heart? | *Let them see it.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      safe(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.9, 1.4)))
      sparkles(x, t, 790, 860, P.t0 + 1.4, 8, 190, 0.3, [PINK, BONE, GOLD])
      label(x, 790, 1100, 'UNLOCKED', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You love slowly. | *That’s a gift.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, GLASS, GLASS_C, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 * Math.sin(t * 2) })
      label(x, 790, 1110, 'SLOW IS GOOD', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04 })
      hearts(x, t, 790, 760, P.t0 + 1.5, { n: 5, life: 1.8, spread: 200, cell: 7, seed: 7 })
    } },
]

const F = makeFilm({
  id: 'v3a073', key: 'F', accent: GREEN, solo: S, ending: 'group',
  title: 'Taurus, stop doing | *this in love.*',
  cameos: CAMEOS,
  group: { cap: 'Stubborn heart. | *Worth the wait.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
