// v3t009: THE SIGNS AS… v3, "The signs on a | double date." (~63 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "The signs on a | *double date.*"
//   3.6–49.2   one double date per sign (3.8 s each), each pushed to the extreme:
//              ♈ made it a competition · ♉ split the bill, not the dessert · ♊ talked to the other couple more than their date
//              · ♋ adopted the other couple, calls them "the kids" · ♌ out-dressed everyone, even the waiter
//              · ♍ split the bill to the cent · ♎ checked all four signs, everyone's compatible · ♏ figured them out in five minutes
//              · ♐ invited the waiter, now it's a triple date · ♑ networked, two job offers · ♒ started a debate about spoons
//              · ♓ the other couple got engaged, Pisces cried the most
//  49.2        ending 'group': "Next time? | Table for *twelve.*" (the triple date, escalated) with a RESERVED: 12 sign.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const CAKE = [
  '....R....',
  '..WWWWW..',
  '.PPPPPPP.',
  'WWWWWWWWW',
  'PPPPPPPPP',
  'PPPPPPPPP',
]
const CAKE_C = { R: RED, W: '#fff4e2', P: PINK }
const TIE = ['YYYYY', '.YRY.', '..Y..', '.YYY.', '.YRY.', 'YYYYY', '.YYY.', '..Y..']
const SPOON = ['.SSS.', 'SSSSS', 'SSSSS', '.SSS.', '..S..', '..S..', '..S..', '..S..', '..S..']
const RING = ['..DD..', '.DWWD.', '..DD..', '.YYYY.', 'YY..YY', 'Y....Y', 'YY..YY', '.YYYY.']
const RING_C = { D: SKYB, W: '#ffffff', Y: GOLD }

// a receipt with a long calculation
function bill(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = '#fff4e2'; x.fillRect(-122, -182, 244, 364)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  const L = ['you: 12.45', 'me: 11.90', 'tip: 4.87', 'sauce: 0.35', 'bread: 0.01']
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 5 + 0.001)
  for (let i = 0; i < Math.min(n + 1, 5); i++) x.fillText(L[i], -100, -140 + i * 52)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Made it | *a competition.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#1b1236'; x.fillRect(-162, -102, 324, 204)
        x.fillStyle = GOLD; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('US    THEM', 0, -60)
        const a = Math.min(9, Math.floor(lt * 4)), b = Math.min(2, Math.floor(lt))
        x.font = `700 72px ${MONO}`; x.fillStyle = MINT; x.fillText(String(a), -70, 20); x.fillStyle = RED; x.fillText(String(b), 70, 20)
        x.restore()
      }
      bubble(x, 800, 1070, 'we’re winning', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Split the bill. | Did *not* split dessert.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 800, 690, 'SHARE?', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 40, bg: BONE, rot: 0.05 })
      label(x, 800, 1090, 'MINE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 46, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Talked to the other couple. | *All night.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'libra', 720, 900, 170 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false }); signChar(x, t, 'leo', 870, 920, 170 * k, { mood: 'happy', look: [-1, 0], seed: 32, glyph: false }) }
      bubble(x, 560, 600, 'so ANYWAY—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 800, 1110, 'THEIR DATE: ALONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Adopted the other couple. | Calls them *“the kids.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) { signChar(x, t, 'aries', 720, 920, 170 * k, { mood: 'wide', look: [-1, 0], seed: 33, glyph: false }); signChar(x, t, 'sagittarius', 870, 920, 170 * k, { mood: 'wide', look: [-1, 0], seed: 34, glyph: false }) }
      bubble(x, 560, 600, 'eat your veg, | kids', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Out-dressed everyone. | *Even the waiter.*', mood: 'sparkle', star: { x: -170 }, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, TIE, { Y: GOLD, R: RED }, F.x, F.cy + 90, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 800, 720, 'DRESS CODE: CASUAL', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 880, 'LEO: GALA', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 380, 860, P.t0 + 0.9, 7, 170, 0.3)
    } },
  { sign: 'virgo', cap: 'Split the bill. | *To the cent.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bill(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 1110, 'BALANCED.', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Checked all four signs. | *Everyone’s compatible.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      const G = ['♎︎', '♌︎', '♊︎', '♒︎']
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-150, -90, 300, 180); x.fillStyle = '#2a2350'; x.fillRect(-142, -82, 284, 164)
        x.font = `700 60px 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
        G.forEach((g, i) => { x.fillStyle = [PINK, ORANGE, GOLD, SKYB][i]; x.fillText(g, -105 + i * 70, 0) })
        x.restore()
      }
      label(x, 800, 1060, 'ALL: ALIGNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 840, P.t0 + 1.5, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 6 })
    } },
  { sign: 'scorpio', cap: 'Figured them out. | In *five minutes.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 660, '0:05', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 46, bg: '#ff4f86', color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      const F = ['met at a wedding', 'hates olives', 'planning a trip']
      F.forEach((f, i) => label(x, 790, 800 + i * 100, f, pop01(t, P.t0 + 0.7 + i * 0.35, 0.3, 2.2), { size: 34, bg: BONE, rot: i % 2 ? 0.03 : -0.03, font: MONO, weight: 700 }))
    } },
  { sign: 'sagittarius', cap: 'Invited the waiter. | Now it’s *a triple date.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 330, 900, 210 * k, { mood: lt > 1.3 ? 'happy' : 'wide', look: [1, 0], seed: 41, glyph: false, hops: [P.t0 + 1.4] })
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(300, 1010, 60, 14); x.fillStyle = BONE; x.fillRect(304, 1013, 52, 8) }
      bubble(x, 330, 640, 'pull up | a chair!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, tail: 'br' })
      label(x, 330, 1120, 'TABLE FOR 5', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Networked. | Got *two job offers.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) label(x, 800, 700 + i * 150, `OFFER #${i + 1}`, pop01(t, P.t0 + 0.6 + i * 0.5, 0.3, 2.2), { size: 40, bg: [MINT, GOLD][i], rot: i ? 0.05 : -0.05, font: MONO, weight: 700 })
      bubble(x, 800, 1070, 'here’s my card', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Started a debate. | About *spoons.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, SPOON, { S: '#d8dbe8' }, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.2 })
      bubble(x, 800, 620, 'hear me out:', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1110, 'HOUR 2 OF DEBATE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'They got engaged. | Pisces *cried the most.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, RING, RING_C, 800, 860, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 860, P.t0 + 0.5, 6, 140, 0.3)
      label(x, 800, 1080, 'TISSUES: ALL', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t009', key: 'F', accent: PINK,
  title: 'The signs on a | *double date.*',
  cameos: CAMEOS,
  ending: 'group',
  group: { cap: 'Next time? | Table for *twelve.*', draw(x, t, lt) { label(x, 540, 760, 'RESERVED: 12', pop01(t, t - lt + 1.6, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 }) } },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
