// r2t0221: star_talk, ROLLCALL, "The signs at | a spelling bee." (~59 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself at a spelling bee.
//   0.0–3.6    "The signs at | *a spelling bee.*"
//   3.6–49.2   ♈ buzzed in before the word · ♉ got "croissant", ate the word · ♊ spelled it two ways at once
//              · ♋ hugged the kid who got it wrong · ♌ asked for a harder word ("compatibility") · ♍ corrected the judge
//              · ♎ still deciding on the first letter · ♏ had the word list since March · ♐ spelled it in French, unasked
//              · ♑ brought last year's trophy, as a warning · ♒ invented a word, the judges allowed it · ♓ spelled
//              "soulmate", sobbed with joy
//  49.2        "Nobody spelled | it *quietly.*"
//  52.4        LESSON UNLOCKED: "Spell it wrong out loud. | Brave *still counts.*"  STATUS: BRAVE
//  58.3        "Every sign gets | a *gold star.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

// ── props
const BELL = ['....KK....', '...GGGG...', '..GGWGGG..', '.GGWGGGGG.', '.GGGGGGGG.', 'GGGGGGGGGG', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BELL_C = { K: INK, G: GOLD, W: '#fff1b0', B: BROWN }
const CROISSANT = ['....OOOO....', '..OOYOOYOO..', '.OOYOOOOYOO.', 'OOYOOOOOOYOO', 'OO........OO', 'O..........O']
const CROISSANT_C = { O: ORANGE, Y: '#ffe7a8' }
const TROPHY = ['YYYYYYYYYY', 'YWYYYYYYYY', 'YYYYYYYYYY', '.YYYYYYYY.', '..YYYYYY..', '...YYYY...', '....YY....', '....YY....', '..BBBBBB..', '.BBBBBBBB.']
const TROPHY_C = { Y: GOLD, W: '#fff1b0', B: BROWN }
const BOOK = ['RRRRRRRRRRRR', 'RWWWWWWWWWWR', 'RWKKKKKKKKWR', 'RWWWWWWWWWWR', 'RWKKKKKKWWWR', 'RWWWWWWWWWWR', 'RWKKKKKKKKWR', 'RRRRRRRRRRRR']
const BOOK_C = { R: '#2fc79a', W: CREAM, K: '#6b62a8' }

/** a manila folder stamped TOP SECRET */
function folder(x, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -100, 316, 226)
  x.fillStyle = INK; x.fillRect(-166, -126, 332, 246); x.fillRect(-166, -150, 130, 30)
  x.fillStyle = '#e8c27a'; x.fillRect(-160, -120, 320, 234); x.fillRect(-160, -144, 118, 26)
  if (open > 0) {
    x.fillStyle = CREAM; x.fillRect(-130, -100 - 50 * open, 260, 150)
    for (let i = 0; i < 4; i++) { x.fillStyle = '#6b62a8'; x.fillRect(-110, -80 - 50 * open + i * 30, 160 + (i % 2) * 40, 12) }
  }
  x.save(); x.rotate(-0.12); x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-130, 20, 260, 64)
  txt(x, 'TOP SECRET', 0, 54, { size: 36, font: MONO, weight: 700, color: RED }); x.restore()
  x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Buzzed in | *before the word.*', mood: lt => lt > 0.9 ? 'sparkle' : 'wide', star: L, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), hit = lt > 0.45 && lt < 0.7
      drawBits(x, BELL, BELL_C, 790, 1050 + (hit ? 8 : 0), 22 * k)
      if (lt > 0.45) sparkles(x, t, 790, 1000, P.t0 + 0.6, 6, 130, 0.3)
      bubble(x, 780, 690, 'C-A-T!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 54, tail: 'bl' })
      label(x, 790, 860, 'WORD: NOT ASKED YET', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Got “croissant.” | *Ate the word.*', mood: lt => lt > 1.4 ? 'sleepy' : 'heart', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 650, 'C-R-O-I-S…', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      drawBits(x, CROISSANT, CROISSANT_C, 790, 880, 26 * k, { alpha: 1 - prog(lt, 1.0, 1.4) })
      if (lt > 1.0 && lt < 1.6) for (let i = 0; i < 6; i++) { x.fillStyle = '#ffe7a8'; x.fillRect(720 + i * 26, 900 + ((i * 37) % 50) + (lt - 1) * 120, 12, 12) }
      label(x, 790, 1080, 'WORD: EATEN', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: ORANGE, rot: 0.05 })
    } },
  { sign: 'gemini', cap: 'Spelled it two ways. | *Both confidently.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'C-O-L-O-R', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 860, 'C-O-L-O-U-R', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: SKYB, tail: 'bl' })
      label(x, 790, 1040, 'FINAL ANSWER: YES', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Hugged the kid | who *got it wrong.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 790, 960, 200 * k, { mood: lt > 1.3 ? 'happy' : 'neutral', look: lt > 1.3 ? [0, 0] : [0, 1], seed: 12, glyph: false, hops: [P.t0 + 1.5] })
      label(x, 790, 720, '✗ INCORRECT', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 560, 620, 'group hug!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
      hearts(x, t, 620, 940, P.t0 + 1.1, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Asked for a harder word. | For *the crowd.*', mood: 'sparkle', star: L, hops: [1.2],
    front(x, t, lt, P) {
      label(x, 790, 690, 'NEXT WORD:', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 760, 860, 'COMPATIBILITY', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1050, 'too easy.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 760, 860, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Corrected the judge’s | *pronunciation.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 790, 900, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: 0.05 })
      bubble(x, 790, 680, 'actually…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1080, 'JUDGE: CORRECTED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Still picking | *the first letter.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2 ? 'K…?' : 'C…?'
      bubble(x, 780, 700, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 70, tail: 'bl' })
      const m = 1 + Math.floor(clamp((lt - 0.6) / 1.6) * 44)
      label(x, 790, 960, `TIMER: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Had the word list. | *Since March.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      folder(x, 790, 860, pop01(t, P.t0 + 0.25, 0.35, 2), ease.outCubic(prog(lt, 0.8, 1.2)))
      bubble(x, 790, 640, 'next one’s | “lighthouse.”', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Spelled it in French. | Wasn’t *asked to.*', mood: 'sparkle', star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      bubble(x, 320, 680, 'B-O-N-J-O-U-R!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 320, 880, 'WORD WAS: “HELLO”', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      label(x, 320, 1040, '+ 1 LANGUAGE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04 })
    } },
  { sign: 'capricorn', cap: 'Brought last year’s trophy. | *As a warning.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      drawBits(x, TROPHY, TROPHY_C, 310, 870, 24 * k)
      if (k > 0.9 && lt > 0.8) { const g = prog(lt, 0.8, 1.2); x.save(); x.globalAlpha = Math.sin(Math.PI * g) * 0.8; x.fillStyle = '#fff'; x.fillRect(250 + g * 90, 770, 14, 120); x.restore() }
      label(x, 310, 1090, 'CHAMPION (STILL)', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented a word. | The judges *allowed it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: L, hops: [1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'Z-O-R-B-L-I-X', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      label(x, 790, 880, 'JUDGES: …SURE?', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1040, '✓ ACCEPTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Spelled “soulmate.” | *Sobbed* with joy.', mood: lt => lt < 1.0 ? 'sparkle' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 680, 'S-O-U-L-M-A-T-E', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 38, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 880, '✓ CORRECT', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 44, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1040, P.t0 + 1.0, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

/** gold pixel stars raining over everyone for the last line */
const STARB = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '..Y.Y..', '.Y...Y.']
const F = makeFilm({
  id: 'r2t0221', key: 'C', accent: GOLD, ending: 'lesson',
  title: 'The signs at | *a spelling bee.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody spelled | it *quietly.*' },
  lesson: { text: 'Spell it wrong out loud. | Brave *still counts.*', chip: 'STATUS: BRAVE' },
  last: {
    text: 'Every sign gets | a *gold star.*',
    draw(x, t, lt) {
      for (let i = 0; i < 12; i++) {
        const ph = ((lt * 0.35 + i * 0.083) % 1)
        drawBits(x, STARB, { Y: i % 3 ? GOLD : '#fff1b0' }, 140 + i * 72 + Math.sin(t * 2 + i) * 14, 760 + ph * 700, 9, { alpha: clamp(lt * 2) * Math.sin(Math.PI * ph) })
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
