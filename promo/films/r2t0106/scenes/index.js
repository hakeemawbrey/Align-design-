// r2t0106: star_talk, BELIKE, "“Long story…” | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each one's most extreme reaction when a friend starts with "long story".
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ skip to the end, begging · ♉ got snacks, take your time · ♊ retold it before you finished
//              · ♋ made tea, cleared the evening · ♌ somehow it's about them now · ♍ fact-checking live
//              · ♎ is this about a match? · ♏ already knew, heard it Tuesday · ♐ interrupts with a longer one
//              · ♑ billed you for the hour · ♒ already pitching it as a movie · ♓ sobbing before the ending
//  49.2        "Short version? | *Never heard of it.*"
//  52.4        LESSON UNLOCKED: "Every story matters. | *Stay for the end.*"  LISTENING: ON
//  58.3        "So… what | *happened next?*"  Taurus's popcorn comes back.
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PEACH = '#ffb38a', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a'

// ── props
const POPCORN = [
  '.WW.WWW.WW.',
  'WWWWWWWWWWW',
  'WyWWWWyWWWW',
  'RRWWRRWWRRW',
  '.RWWRRWWRR.',
  '.RWWRRWWRR.',
  '.RWWRRWWRR.',
  '..WWRRWWR..',
  '..WWRRWWR..',
]
const POPCORN_C = { W: CREAM, y: '#ffd23a', R: RED }
const TEAPOT = [
  '....KK.....',
  '...TTTT....',
  'H.TTTTTT.SS',
  'HTTTTTTTTS.',
  'HTTTTTTTS..',
  'HTTTTTTTT..',
  '.TTTTTTT...',
  '..TTTTT....',
]
const TEAPOT_C = { K: INK, T: '#ffd1a8', H: '#e7a67a', S: '#e7a67a' }
const MIC = ['.GGG.', 'GGGGG', 'GgGgG', 'GGGGG', '.GGG.', '..K..', '..K..', '..K..', '.KKK.']
const MIC_C = { G: '#c9c9d6', g: '#8a8aa0', K: INK }
const CLAP = [
  'WKWKWKWKWK',
  'KWKWKWKWKW',
  'KKKKKKKKKK',
  'KWWWWWWWWK',
  'KWKKKKKKWK',
  'KWWWWWWWWK',
  'KWKKKKWWWK',
  'KWWWWWWWWK',
  'KKKKKKKKKK',
]
const CLAP_C = { K: INK, W: '#efe6d6' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BbbbbbbB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, b: '#5fb8d8' }

// a fast-forward button, pressed over and over
function ffButton(x, cx, cy, k, press) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * (1 - 0.08 * press), k * (1 - 0.08 * press))
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-104, -74, 220, 160)
  x.fillStyle = INK; x.fillRect(-116, -86, 232, 172); x.fillStyle = RED; x.fillRect(-108, -78, 216, 156)
  x.fillStyle = CREAM
  for (const ox of [-52, 18]) { x.beginPath(); x.moveTo(ox, -40); x.lineTo(ox + 52, 0); x.lineTo(ox, 40); x.closePath(); x.fill() }
  x.restore()
}
// a clipboard of notes with red corrections
function clipboard(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-136, -186, 290, 392)
  x.fillStyle = INK; x.fillRect(-148, -198, 296, 396); x.fillStyle = WOOD; x.fillRect(-140, -190, 280, 380)
  x.fillStyle = CREAM; x.fillRect(-120, -160, 240, 330)
  x.fillStyle = INK; x.fillRect(-50, -210, 100, 36); x.fillStyle = '#9aa5c4'; x.fillRect(-42, -204, 84, 24)
  for (let i = 0; i < 6; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-96, -124 + i * 46, 150 + ((i * 37) % 40), 12) }
  // red corrections land one by one
  x.strokeStyle = RED; x.lineWidth = 8
  ;[[0, 0.5], [2, 0.9], [4, 1.3]].forEach(([i, at]) => { if (lt > at) { x.beginPath(); x.moveTo(-100, -118 + i * 46); x.lineTo(70, -118 + i * 46); x.stroke() } })
  if (lt > 1.6) { x.fillStyle = RED; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('it was WEDNESDAY', 0, 140) }
  x.restore()
}
// a scroll that keeps unrolling down to the floor
function scroll(x, cx, top, k, lt) {
  if (k <= 0.01) return
  const len = lerp(80, 470, ease.outCubic(prog(lt, 0.3, 2.0)))
  x.save(); x.translate(cx, top); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-114, -6, 228, len + 12); x.fillStyle = '#ead7a8'; x.fillRect(-106, 0, 212, len)
  for (let y = 26; y < len - 20; y += 34) { x.fillStyle = '#b89a62'; x.fillRect(-82, y, 150 - ((y * 7) % 50), 10) }
  x.fillStyle = INK; x.fillRect(-130, -26, 260, 36); x.fillStyle = WOOD; x.fillRect(-124, -20, 248, 24)
  x.fillStyle = INK; x.fillRect(-130, len - 8, 260, 36); x.fillStyle = WOOD; x.fillRect(-124, len - 2, 248, 24)
  x.restore()
}
// an invoice slip
function invoice(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-126, -176, 270, 372)
  x.fillStyle = INK; x.fillRect(-138, -188, 276, 376); x.fillStyle = '#ffffff'; x.fillRect(-130, -180, 260, 360)
  x.fillStyle = INK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVOICE', 0, -136)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'
  const ROWS = [['listening', '1 hr'], ['nodding', '40x'], ['“no way”', '12x']]
  ROWS.forEach(([a, b], i) => { if (lt > 0.4 + i * 0.25) { x.fillText(a, -110, -70 + i * 50); x.textAlign = 'right'; x.fillText(b, 110, -70 + i * 50); x.textAlign = 'left' } })
  x.fillStyle = INK; x.fillRect(-110, 80, 220, 4)
  if (lt > 1.3) { x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillStyle = RED; x.fillText('DUE: NOW', 0, 128) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Skip to the end. | *I’m begging.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: { x: -190 }, hops: [0.5, 0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      const press = Math.max(0, Math.sin(lt * 14))
      ffButton(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 0.4 ? press : 0)
      label(x, 790, 1090, 'SPEED: 16x', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 640, 'and THEN?', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Got snacks. | *Take your time.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P, F) {
      drawBits(x, POPCORN, POPCORN_C, 800, 900, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 3; i++) { const ph = ((lt * 1.3 + i / 3) % 1); if (lt > 0.6) drawBits(x, ['WW', 'WW'], { W: CREAM }, lerp(780 + i * 30, F.x + 60, ph), 760 - Math.sin(Math.PI * ph) * 120, 9) }
      label(x, 790, 1120, 'COMFY. GO ON.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Retold it | *before you finished.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'so basically…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 770, 870, 'ok so THEN…', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      bubble(x, 810, 1040, 'wait, it gets | better', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, col: MINT, tail: 'bl' })
      label(x, 400, 640, 'SPOILER', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.06, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made tea. | *Cleared the whole evening.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(640, 1040, 300, 22); x.fillStyle = WOOD; x.fillRect(644, 1044, 292, 14)
      drawBits(x, TEAPOT, TEAPOT_C, 790, 940, 21 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'PLANS: CANCELLED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 860, P.t0 + 1.4, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Somehow it’s now | *about them.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, MIC, MIC_C, F.x + 150, F.cy - 40, 14 * k, { rot: -0.3 })
      bubble(x, 790, 680, 'that reminds | me of ME', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1090, 'NOW STARRING: LEO', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.2, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Taking notes. | *Fact-checking live.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clipboard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
    } },
  { sign: 'libra', cap: 'Wait, is this | *about a match?*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -190 }, hops: [1.1],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -70, 340, 140); x.fillStyle = '#140c30'; x.fillRect(-162, -62, 324, 124)
        signChar(x, t, 'gemini', -100, 4, 90, { mood: 'wink', seed: 31, glyph: false })
        x.fillStyle = MINT; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('NEW MATCH', -40, -18)
        x.fillStyle = BONE; x.font = `800 28px ${INTER}`; x.fillText('♊︎ Gemini, 2 mi', -40, 22)
        x.restore()
      }
      bubble(x, 790, 1060, 'DETAILS. NOW.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 6, seed: 4 })
    } },
  { sign: 'scorpio', cap: 'Already knew. | *Heard it Tuesday.*', mood: lt => lt > 1.1 ? 'wink' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'so long story…', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      label(x, 790, 900, 'OLD NEWS', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 52, bg: RED, color: CREAM, rot: -0.06, font: MONO, weight: 700 })
      label(x, 790, 1080, 'SOURCE: SECRET', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: '#c66bff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Interrupts with | *a longer one.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.8],
    front(x, t, lt, P) {
      scroll(x, 800, 640, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 800, 600, 'PART 1 OF 9', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Billed you | *for the hour.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      invoice(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
    } },
  { sign: 'aquarius', cap: 'Already pitching it | *as a movie.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const snap = lt > 0.9 && lt < 1.1 ? -0.35 : -0.05
      drawBits(x, CLAP, CLAP_C, 790, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: snap })
      label(x, 790, 660, 'SCENE 1. TAKE 1.', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1100, 'it’s a trilogy', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Sobbing. Hasn’t heard | *the ending yet.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 800, 690, 'it’s so | beautiful', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 1130, '1 SENTENCE IN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0106', key: 'C', accent: PEACH, ending: 'lesson',
  title: '“Long story…” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Short version? | *Never heard of it.*' },
  lesson: { text: 'Every story matters. | *Stay for the end.*', chip: 'LISTENING: ON' },
  last: {
    text: 'So… what | *happened next?*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      drawBits(x, POPCORN, POPCORN_C, 540, 700, 18 * k, { rot: 0.05 * Math.sin(t * 2) })
      sparkles(x, t, 540, 700, t - lt + 0.9, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
