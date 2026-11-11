// v3t054: THE SIGNS AS… v3, "The signs at | trivia night." (~57 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "The signs at | *trivia night.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one trivia night per sign (3.8 s each), each pushed to the extreme:
//              ♈ buzzed in before the question · ♉ only came for the nachos · ♊ renamed the team six times
//              · ♋ every answer: "my mom" · ♌ won one point, gave a speech · ♍ corrected the quizmaster
//              · ♎ A or B? wrote both · ♏ knew every answer, won't say how · ♐ every question: "been there"
//              · ♑ studied for three weeks · ♒ "what time is it?" "time is fake." · ♓ got one right, happy-cried
//  49.2        "Final score: | *pure chaos.*"
//  52.6        callback: "Final question? | Cancer: *“my mom.”*"  The answer card comes back: CORRECT.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', PURPLE = '#b48cff'

const BUZZER = [
  '...RRRR...',
  '..RRrRRR..',
  '.RRRRRRRR.',
  'GGGGGGGGGG',
  'GggggggggG',
  'GGGGGGGGGG',
]
const BUZZER_C = { R: RED, r: '#ff9a9a', G: '#6b62a8', g: '#4a4070' }
const NACHOS = [
  '.....Y.....',
  '....YYY..Y.',
  '..Y.YYYYYYY',
  '.YYYYoYYYY.',
  'YYoYYYYYoYY',
  'BBBBBBBBBBB',
  '.BBBBBBBBB.',
]
const NACHOS_C = { Y: GOLD, o: ORANGE, B: '#c24a6a' }
const TROPHY = [
  'Y.YYYYYY.Y',
  'YYYYYYYYYY',
  'Y.YYYYYY.Y',
  '..YYYYYY..',
  '...YYYY...',
  '....YY....',
  '....YY....',
  '..BBBBBB..',
]
const CLOCK = [
  '..WWWWW..',
  '.WWWKWWW.',
  'WWWWKWWWW',
  'WWWWKWWWW',
  'WWWWKKKWW',
  'WWWWWWWWW',
  'WWWWWWWWW',
  '.WWWWWWW.',
  '..WWWWW..',
]

// an answer card (a white card, hand-written answer)
function card(x, cx, cy, text, k, { rot = 0.04, w = 300, size = 40, bg = '#fff4e2', head = 'ANSWER' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -82, w, 180)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -96, w + 12, 192)
  x.fillStyle = bg; x.fillRect(-w / 2, -90, w, 180)
  x.fillStyle = '#6b62a8'; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -58)
  x.fillStyle = INK; x.font = `italic 700 ${size}px 'EB Garamond', Georgia, serif`
  String(text).split('|').forEach((l, i, a) => x.fillText(l.trim(), 0, 14 + (i - (a.length - 1) / 2) * size * 1.05))
  x.restore()
}
// a stack of flashcards fanning out
function flashcards(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = 1 + Math.floor(clamp((lt - 0.2) / 1.4) * 5)
  for (let i = 0; i < n; i++) card(x, cx + (i - 2) * 16, cy - i * 22, i === n - 1 ? `card ${n * 97}` : '', k, { rot: -0.08 + i * 0.04, w: 260, size: 34, head: 'FLASHCARD' })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Buzzed in | before *the question.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: -170 }, hops: [0.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const press = lt > 0.3 && lt < 0.6 ? 0.85 : 1
      drawBits(x, BUZZER, BUZZER_C, 790, 1000, 26 * pop01(t, P.t0 + 0.1, 0.3, 2), { sy: press })
      bubble(x, 790, 680, 'question one is—', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 790, 850, 'BZZT!', pop01(t, P.t0 + 0.35, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.06 })
    } },
  { sign: 'taurus', cap: 'Didn’t answer once. | Came *for the nachos.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, NACHOS, NACHOS_C, 790, 930, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'SCORE: 0', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1130, 'NACHOS: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Renamed the team. | *Six times.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const NAMES = ['Quiz Kids', 'Brainstorm', 'Big Brains', 'Wait, No', 'The Twins', 'Quiz Kids 2']
      card(x, 790, 860, NAMES[Math.min(5, Math.floor(lt * 2.5))], pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'TEAM NAME', w: 330, size: 46 })
      label(x, 790, 1080, `VERSION ${Math.min(6, 1 + Math.floor(lt * 2.5))}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Every answer: | *“my mom.”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) card(x, 760 + i * 30, 1010 - i * 150, 'my mom', pop01(t, P.t0 + 0.25 + i * 0.4, 0.3, 2), { rot: -0.06 + i * 0.06, w: 260, size: 44, head: `Q${i + 1}` })
    } },
  { sign: 'leo', cap: 'Won one point. | Gave *a speech.*', mood: 'sparkle', star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, B: '#8a4a2e' }, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 640, '+1', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 46, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'I’d like to | thank me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 170, 0.5)
    } },
  { sign: 'virgo', cap: 'Corrected | *the quizmaster.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 800, 980, 170 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 21, glyph: false })
      bubble(x, 600, 640, 'actually…', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: MINT, tail: 'bc' })
      label(x, 820, 760, 'HOST', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'A or B? | Wrote *both.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', star: { x: -180 },
    front(x, t, lt, P) {
      card(x, 790, 860, 'A… | and B', pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, size: 52 })
      label(x, 790, 1080, 'BOTH COUNT?', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Knew every answer. | *Won’t say how.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 790, 700, 'SCORE: 50/50', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 950, 'I just | know.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: '#ff8a9a', tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Every question: | *“been there.”*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const STAMPS = [[700, 700, '#ff8a6a', -0.2], [880, 760, MINT, 0.15], [740, 940, SKYB, 0.1], [890, 1000, GOLD, -0.12]]
      STAMPS.forEach(([a, b, c, r], i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.6); if (k <= 0.01) return; x.save(); x.translate(a, b); x.rotate(r); x.scale(k, k); x.strokeStyle = c; x.lineWidth = 7; x.strokeRect(-70, -44, 140, 88); x.fillStyle = c; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('VISITED', 0, 2); x.restore() })
      bubble(x, 790, 1140, 'been there', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Studied for trivia. | *Three weeks.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -200, s: 270 },
    front(x, t, lt, P) {
      flashcards(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'DAY 21', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: '“What time is it?” | *“Time is fake.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOCK, { W: '#fff4e2', K: INK }, 790, 860, 26 * k, { rot: lt > 1.2 ? Math.sin(t * 9) * 0.25 : 0 })
      label(x, 790, 1110, 'POINTS: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Got one right. | *Happy-cried.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 }, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 820, 'dolphins?', pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, size: 48 })
      label(x, 790, 1060, 'CORRECT!', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05 })
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t054', key: 'F', accent: PURPLE, ending: 'callback',
  title: 'The signs at | *trivia night.*',
  cameos: CAMEOS,
  group: { cap: 'Final score: | *pure chaos.*' },
  last: {
    text: 'Final question? | Cancer: *“my mom.”*',
    draw(x, t, lt) {
      const t0 = t - lt
      x.save(); x.translate(540, 980); x.scale(1.5, 1.5); card(x, 0, 0, 'my mom', pop01(t, t0 + 0.4, 0.35, 2), { w: 380, size: 70, head: 'FINAL ANSWER', rot: -0.03 }); x.restore()
      label(x, 540, 1200, '✦ CORRECT ✦', pop01(t, t0 + 1.5, 0.3, 2.4), { size: 46, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 540, 1040, t0 + 1.5, 8, 260, 0.3)
      const k = pop01(t, t0 + 0.7, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 540, 1420, 190 * k, { mood: lt > 1.5 ? 'heart' : 'happy', seed: 9, glyph: false, hops: [t0 + 1.6] })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
