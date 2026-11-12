// r2t0002: star_talk, BELIKE, "Four-leaf clover? | Zodiacs be like." (~61 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each one's most extreme reaction to finding a four-leaf clover.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ found it first, victory lap · ♉ is it edible? · ♊ told every match, it had three leaves
//              · ♋ scrapbooked it, named it · ♌ assumed the clover found them · ♍ counted the leaves four times
//              · ♎ shared the luck with every match · ♏ already has a map of every clover · ♐ felt lucky, packed for anywhere
//              · ♑ filed it under "assets" · ♒ wanted a five-leaf, built one · ♓ too lucky, happy tears
//  49.2        "One clover. | *Twelve meltdowns.*"
//  52.4        LESSON UNLOCKED: "Luck finds everyone. | *Notice yours.*"  LUCK: FOUND
//  58.3        "Today’s lucky sign? | *Yours.*"  A big clover, sparkling.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#5fd068', DG = '#2f9a4a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'

// ── props
const CLOVER = [
  '..GGG...GGG..',
  '.GGGGG.GGGGG.',
  '.GGgGGGGGgGG.',
  '..GGGGGGGGG..',
  '...GGGGGGG...',
  '.GGGGGGGGGGG.',
  'GGgGGG.GGGgGG',
  '.GGGGG.GGGGG.',
  '..GGG..DGGG..',
  '.......D.....',
  '......D......',
  '.....D.......',
]
const CLOVER3 = [
  '.....GGG.....',
  '....GGGGG....',
  '....GGgGG....',
  '.....GGG.....',
  '......G......',
  '.GGGGG.GGGGG.',
  'GGgGGG.GGGgGG',
  '.GGGGG.GGGGG.',
  '..GGG..DGGG..',
  '.......D.....',
  '......D......',
  '.....D.......',
]
const CLOVER5 = [
  '.....GGG.....',
  '..G.GGGGG.G..',
  '.GGGGGgGGGGG.',
  'GGgGGGGGGGgGG',
  '.GGGGGGGGGGG.',
  '.GGGGG.GGGGG.',
  'GGgGGG.GGGgGG',
  '.GGGGG.GGGGG.',
  '..GGG..DGGG..',
  '.......D.....',
  '......D......',
  '.....D.......',
]
const CLOVER_C = { G: GREEN, g: '#a6f08a', D: DG }
const LEAF = ['.GG.', 'GGGG', 'GgGG', '.GG.']
const GLASS = [
  '..KKKK....',
  '.KSSSSK...',
  'KSWSSSSK..',
  'KSSSSSSK..',
  'KSSSSSSK..',
  '.KSSSSK...',
  '..KKKKBB..',
  '......BBB.',
  '.......BBB',
  '........BB',
]
const GLASS_C = { K: INK, S: 'rgba(143,227,255,0.45)', W: '#ffffff', B: WOOD }
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'OOOOOOOOOOOO',
  'OOyOOOOOOyOO',
  'OOyOOOOOOyOO',
  'OOyOOOOOOyOO',
  'OOyOOOOOOyOO',
  'OOOOOOOOOOOO',
  '.K........K.',
]
const SUITCASE_C = { K: INK, O: '#ffb34a', y: '#c98f2a' }
const WRENCH = ['.GG..', 'GG...', 'GGG..', '..GG.', '...GG', '....G']

// a folder labelled ASSETS with the clover filed inside
function folder(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -140, 340, 270); x.fillStyle = '#e7b46a'; x.fillRect(-162, -132, 324, 254)
  x.fillStyle = INK; x.fillRect(-170, -170, 140, 40); x.fillStyle = '#e7b46a'; x.fillRect(-162, -162, 124, 32)
  const ins = ease.inOutCubic(prog(lt, 0.6, 1.1))
  drawBits(x, CLOVER, CLOVER_C, 40, lerp(-210, -40, ins), 8, { alpha: 1 - 0.6 * ins })
  x.fillStyle = '#d59a4a'; x.fillRect(-162, -40, 324, 162)
  x.fillStyle = CREAM; x.fillRect(-110, 20, 220, 64); x.fillStyle = INK; x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ASSETS', 0, 54)
  x.restore()
}
// a scrapbook page: the clover taped in, a name underneath
function scrapbook(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -170, 316, 360)
  x.fillStyle = INK; x.fillRect(-162, -182, 324, 364); x.fillStyle = '#ffe1ec'; x.fillRect(-154, -174, 308, 348)
  drawBits(x, CLOVER, CLOVER_C, 0, -40, 14)
  x.fillStyle = 'rgba(255,241,176,0.8)'; x.save(); x.rotate(-0.4); x.fillRect(-90, -150, 90, 26); x.restore(); x.save(); x.rotate(0.4); x.fillRect(10, -150, 90, 26); x.restore()
  if (lt > 1.2) { x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('“Kevin” ♡', 0, 130) }
  x.restore()
}
// a treasure map with clover marks
function map(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-182, -152, 364, 304); x.fillStyle = '#ead7a8'; x.fillRect(-174, -144, 348, 288)
  x.strokeStyle = '#b89a62'; x.lineWidth = 6; x.setLineDash([14, 12]); x.beginPath(); x.moveTo(-140, 100); x.bezierCurveTo(-60, -40, 40, 120, 140, -90); x.stroke(); x.setLineDash([])
  const P = [[-120, -80], [-30, 60], [60, -60], [130, 80], [-130, 110], [20, -110]]
  P.forEach(([px, py], i) => { if (lt > 0.4 + i * 0.15) drawBits(x, LEAF, CLOVER_C, px, py, 8) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Found it first. | *Victory lap.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOVER, CLOVER_C, F.x + 140, F.cy - 110, 11 * k, { rot: Math.sin(t * 8) * 0.25 })
      label(x, 800, 1060, 'WINNER: ME', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.05 })
      bubble(x, 800, 660, 'nobody | else play', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Lucky? Sure. | But *is it edible?*', mood: lt => lt > 1.1 ? 'heart' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      x.fillStyle = INK; x.beginPath(); x.ellipse(790, 1010, 170, 46, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = CREAM; x.beginPath(); x.ellipse(790, 1004, 160, 38, 0, 0, Math.PI * 2); x.fill()
      drawBits(x, CLOVER, CLOVER_C, 790, 940, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 690, 'salad?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 50, tail: 'bl' })
      label(x, 400, 1150, 'FORK: READY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told every match. | It had *three leaves.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, CLOVER3, CLOVER_C, 790, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 620, 'LUCKIEST | PERSON ALIVE', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.3 ? 1 : 0), { size: 32, tail: 'bl' })
      label(x, 790, 640, 'LEAVES: 3', pop01(t, P.t0 + 1.35, 0.3, 2.4), { size: 44, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'MESSAGES SENT: ALL', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Scrapbooked it. | *Named it.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      scrapbook(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      hearts(x, t, 790, 760, P.t0 + 1.3, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Assumed the clover | found *them.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -170 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOVER, CLOVER_C, 800, 900, 15 * k, { rot: -0.1 })
      bubble(x, 800, 640, 'naturally.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, tail: 'bl' })
      label(x, 800, 1110, 'IT KNEW.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 })
      sparkles(x, t, 800, 900, P.t0 + 0.5, 7, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Counted the leaves. | *Four times.*', mood: 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, CLOVER, CLOVER_C, 790, 900, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const g = pop01(t, P.t0 + 0.4, 0.3, 2), sweep = Math.sin(lt * 4) * 70
      drawBits(x, GLASS, GLASS_C, 800 + sweep, 860 + Math.cos(lt * 4) * 40, 16 * g)
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.4))
      label(x, 790, 640, `COUNT ${n}/4`, pop01(t, P.t0 + 0.5, 0.3, 2), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'VERIFIED.', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'libra', cap: 'Shared the luck | with *every match.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P, F) {
      const IDS = ['aries', 'cancer', 'aquarius', 'virgo']
      IDS.forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2)
        const tx = 690 + (i % 2) * 190, ty = 700 + Math.floor(i / 2) * 290
        if (k > 0.01) signChar(x, t, id, tx, ty, 130 * k, { mood: lt > 1.0 + i * 0.15 ? 'heart' : 'happy', seed: 30 + i, glyph: false })
        const fly = ease.inOutCubic(prog(lt, 0.7 + i * 0.12, 1.1 + i * 0.12))
        if (lt > 0.6) drawBits(x, LEAF, CLOVER_C, lerp(F.x + 90, tx, fly), lerp(F.cy - 40, ty - 80, fly) - Math.sin(Math.PI * fly) * 80, 9)
      })
    } },
  { sign: 'scorpio', cap: 'Already has a map | of *every clover.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      map(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 650, 'CLASSIFIED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Felt lucky. | Packed for *anywhere.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P, F) {
      drawBits(x, SUITCASE, SUITCASE_C, 800, 950, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.04 })
      drawBits(x, CLOVER, CLOVER_C, F.x + 120, F.cy - 120, 8 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: 0.3 })
      label(x, 800, 690, 'DESTINATION: ???', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1150, 'bye!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Filed it under | *“assets.”*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      folder(x, 790, 900, pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 790, 650, 'PORTFOLIO: +1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Wanted a five-leaf. | *Built one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const done = lt > 1.2
      drawBits(x, done ? CLOVER5 : CLOVER, CLOVER_C, 790, 880, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (!done) drawBits(x, WRENCH, { G: '#9aa5c4' }, 880 + Math.sin(lt * 18) * 14, 780, 14, { rot: Math.sin(lt * 18) * 0.4 })
      sparkles(x, t, 790, 880, P.t0 + 1.25, 7, 170, 0.4)
      label(x, 790, 1130, 'PATENT PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Too lucky. | *Happy tears.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CLOVER, CLOVER_C, 800, 880, 15 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.fillStyle = 'rgba(143,227,255,0.6)'; const pw = 250 * ease.outCubic(prog(lt, 0.6, 2.0)); x.beginPath(); x.ellipse(420, 1130, pw, 26, 0, 0, Math.PI * 2); x.fill()
      bubble(x, 800, 650, 'it’s so | beautiful', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1110, 'PUDDLE: GROWING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0002', key: 'E', accent: GREEN, ending: 'lesson',
  title: 'Four-leaf clover? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One clover. | *Twelve meltdowns.*' },
  lesson: { text: 'Luck finds everyone. | *Notice yours.*', chip: 'LUCK: FOUND' },
  last: {
    text: 'Today’s lucky sign? | *Yours.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, CLOVER, CLOVER_C, 540, 720, 18 * k, { rot: 0.06 * Math.sin(t * 2) })
      sparkles(x, t, 540, 720, t - lt + 0.9, 8, 180, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
