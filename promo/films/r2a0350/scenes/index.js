// r2a0350: star_advice, ADVICE ROLLCALL, "Each sign’s perfect | *study buddy.*" (signs3kit social cut, music: lofi · G).
// Ending: group ("Find your people. | *Study happier.*").
//   ♈ races you to the last page · ♉ has a really comfy couch · ♊ lets you explain it out loud · ♋ says "you've got
//   this" · ♌ makes glitter flashcards · ♍ lets you colour-code everything · ♎ studies somewhere pretty · ♏ goes deep on
//   one topic · ♐ turns facts into adventures · ♑ respects the schedule (study match) · ♒ asks the wild "what if"
//   · ♓ soft music and tissues (crying, happily)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', STEEL = '#9aa5c4', ACC = '#ffd36a', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, color, font: MONO, weight: 700 })
const COUCH = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPWWWWWWWWWWPP', 'PPWWWWWWWWWWPP', 'PPPPPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.K..........K.']
const NOTE = ['YYYYYYYY', 'YYYYYYYY', 'YYYRRYYY', 'YYRRRRYY', 'YYYRRYYY', 'YYYYYYYY']
const HIGH = ['.K.', 'KKK', 'CCC', 'CCC', 'CCC', 'CCC', 'CCC', 'CCC']
const PLANT = ['..G.G..', '.GGGGG.', 'GG.G.GG', '..GGG..', '...G...', '.BBBBB.', '.BBBBB.', '..BBB..']
const GLASS = ['..KKKK...', '.KWWWWK..', 'KWWWWWWK.', 'KWWWWWWK.', '.KWWWWK..', '..KKKKK..', '......KK.', '.......KK']
const GLOBE = ['...BBBB...', '.BBGGBBBB.', 'BBGGGBBGBB', 'BGGBBBGGGB', 'BBBBBBGGBB', '.BBGGBBBB.', '...BBBB...', '....KK....', '..KKKKKK..']
const TISSUE = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BPPBBBBPPB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const S2 = { x: -180 }

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who races you | *to the last page.*', mood: 'sparkle', look: [1, 0], star: S2, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const pg = Math.min(200, Math.floor(clamp((lt - 0.3) / 1.6) * 200))
      L(x, 800, 820, `PAGE ${pg}/200`, pop01(t, P.t0 + 0.2, 0.3, 2), BONE, 0.04, 44)
      L(x, 800, 1020, 'FINISH LINE: FRIENDSHIP', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Someone with | *a really comfy couch.*', mood: lt => lt > 1.0 ? 'sleepy' : 'heart', star: { x: -40, y: -70, s: 240 },
    back(x, t, lt, P) { drawBits(x, COUCH, { P: '#c98a5a', W: '#ffd9a0', K: INK }, 540, 980, 38 * pop01(t, P.t0 + 0.1, 0.3, 2)) },
    front(x, t, lt, P) { L(x, 800, 640, 'STUDY MODE: COZY', pop01(t, P.t0 + 1.2, 0.3, 2.4), ACC, 0.05, 32) } },
  { sign: 'gemini', cap: 'Someone who lets you | *explain it out loud.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wide' : 'sparkle', star: S2,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'ok so basically…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 800, 960, 170 * k, { mood: 'happy', look: [-1, 0], seed: 13, glyph: false })
      L(x, 800, 1130, 'LISTENING: 100%', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Someone who says | *“you’ve got this.”*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, NOTE, { Y: '#ffe76a', R: PINK }, 800, 840, 28 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: 0.06 })
      L(x, 780, 1060, 'YOU’VE GOT THIS ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 370, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Someone who makes | *glitter flashcards.*', mood: 'sparkle', look: [1, 0], star: S2, hops: [1.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(-0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#ffb34a'; x.fillRect(-162, -102, 324, 204)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MITOSIS ✦', 0, 0)
        x.restore()
      }
      sparkles(x, t, 800, 860, P.t0 + 0.6, 10, 230, 0.2)
      sparkles(x, t, 800, 860, P.t0 + 1.4, 8, 200, 1.3, [GOLD, PINK, BONE])
      L(x, 800, 1110, 'GLITTER: EVERYWHERE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Someone who lets you | *colour-code everything.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      const C = [PINK, '#ffe76a', MINT, SKYB, LAV]
      C.forEach((c, i) => drawBits(x, HIGH, { K: INK, C: c }, 660 + i * 70, 900, 16 * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: 0.1 }))
      L(x, 800, 700, 'PINK = IMPORTANT', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, 0.04, 30)
      L(x, 800, 1110, 'NO JUDGEMENT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Someone who studies | *somewhere pretty.*', mood: 'sparkle', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(820, 780); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -120, 240, 240); x.fillStyle = SKYB; x.fillRect(-110, -110, 220, 220)
        x.fillStyle = INK; x.fillRect(-4, -110, 8, 220); x.fillRect(-110, -4, 220, 8)
        x.fillStyle = '#ffe7a8'; x.beginPath(); x.arc(50, -50, 26, 0, Math.PI * 2); x.fill()
        x.restore()
      }
      drawBits(x, PLANT, { G: '#5fd068', B: '#c98a5a' }, 680, 1040, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 840, 1080, 'VIEW: GORGEOUS', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Someone who goes deep | *on one topic.*', mood: 'squint', look: [1, 0], star: S2,
    front(x, t, lt, P) {
      drawBits(x, GLASS, { K: INK, W: '#c9e8ff' }, 800, 860, 32 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.1 * Math.sin(t * 2) })
      const h = 1 + Math.floor(clamp((lt - 0.6) / 1.2) * 3)
      L(x, 800, 1100, `RABBIT HOLE: ${h} HRS`, pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Someone who turns facts | *into adventures.*', mood: 'sparkle', look: [1, 0], star: S2, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { B: SKYB, G: '#5fd068', K: BROWN }, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: Math.sin(t * 1.5) * 0.15 })
      bubble(x, 800, 660, 'road trip to | the textbook!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1110, 'GEOGRAPHY: FUN NOW', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, 0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Someone who respects | *the study schedule.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: S2,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = BONE; x.fillRect(-152, -142, 304, 284)
        x.font = `700 28px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
        ;[['4:00 read', 0.4], ['4:50 break', 0.7], ['5:00 quiz', 1.0], ['5:30 done!', 1.3]].forEach(([s, at], i) => {
          x.fillStyle = INK; x.fillText(s, -110, -90 + i * 60)
          if (lt > at) { x.fillStyle = '#2fa86a'; x.font = `800 34px ${INTER}`; x.fillText('✓', 90, -90 + i * 60); x.font = `700 28px ${INTER}` }
        })
        x.restore()
      }
      L(x, 800, 1110, 'STUDY MATCH: ALIGNED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: 'aquarius', cap: 'Someone who asks | *the wild “what if?”*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, -1], star: S2,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what if gravity | took a day off?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 960 - Math.sin(t * 3) * 30, 160 * k, { mood: 'wide', look: [-1, 0], seed: 15, glyph: false })
      L(x, 800, 1130, 'NOTES: 9 PAGES', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Someone with soft music | *and spare tissues.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', tears: lt => lt > 0.8 ? 2 : 1, star: S2,
    front(x, t, lt, P, F) {
      notes(x, t, F.x + 40, F.cy - 120, { n: 4, cell: 7, col: LAV, seed: 2 })
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, P: PINK }, 800, 960, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 800, 720, 'SAD BOOK, CH. 4', pop01(t, P.t0 + 0.8, 0.3, 2.2), LAV, 0.04, 32)
      L(x, 800, 1120, 'CRYING: SUPPORTED', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0350', key: 'G', accent: ACC, ending: 'group',
  title: 'Each sign’s perfect | *study buddy.*',
  cameos: CAMEOS,
  group: {
    cap: 'Find your people. | *Study happier.*',
    moods: ['sparkle', 'sleepy', 'sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'squint', 'sparkle', 'happy', 'wide', 'heart'],
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.4, { n: 8, life: 2.0, spread: 760, cell: 8, seed: 6 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
