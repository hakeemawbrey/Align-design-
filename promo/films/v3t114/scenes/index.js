// v3t114: THE SIGNS AS… v3, "Got a compliment? | Zodiacs be like." (~62 s vertical, signs3kit social cut, music: lofi · F)
//   0.0–3.6    "Got a compliment? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign takes a compliment (3.8 s each), pushed to the extreme:
//              ♈ returned it before it ended · ♉ "nice sweater": wears it forever · ♊ told forty people before lunch
//              · ♋ cried, hugged them, baked them bread · ♌ "thanks, I know," then bowed · ♍ listed five flaws to balance it
//              · ♎ complimented back for an hour · ♏ "what do you want?" · ♐ said thanks, invited them on a trip
//              · ♑ asked for it in writing · ♒ called "normal", deeply offended · ♓ "nice shoes": happy-cried for days
//  49.2        "Nobody just | *said thanks.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Someone saw you. | *Let it land.*"  COMPLIMENT: RECEIVED
//  58.3        "Say thanks. | Then *pass one on.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', ACC = '#ff8fb1'

const SWEATER = [
  'SS.SSSS.SS',
  'SSSSWWSSSS',
  'SSSSSSSSSS',
  '.SSWSSWSS.',
  '.SSSSSSSS.',
  '.SSWSSWSS.',
  '.SSSSSSSS.',
]
const BREAD = [
  '..BBBBBB..',
  '.BbBBbBBB.',
  'BBBBBBBBBB',
  'BBBbBBBbBB',
  'BBBBBBBBBB',
  '.BBBBBBBB.',
]
const BREAD_C = { B: '#e8a24a', b: '#fff1b0' }
const ROSE = ['.RR.', 'RRRR', '.RR.', '..G.', '.GG.', '..G.']
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'SSSSSSSSSS',
  'SSWSSSSWSS',
  'SSSSSSSSSS',
  'SSWSSSSWSS',
  'SSSSSSSSSS',
]
const SHOE = ['SS......', 'SSS.....', 'SSSSSSS.', 'SSSSSSSS', 'WWWWWWWW']
const DOC = [
  'WWWWWWWWWW',
  'WKKKKKKKWW',
  'WWWWWWWWWW',
  'WKKKKKWWWW',
  'WWWWWWWWWW',
  'WKKKKKKWWW',
  'WWWWWWWWWW',
  'WWWWWWRRWW',
  'WWWWWWRRWW',
]
const DOC_C = { W: '#fff4e2', K: '#b9b0a0', R: RED }

const CAMEOS = [
  { sign: 'aries', cap: 'Returned it | *before it ended.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 800, 640, 'nice sh—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, col: LAV, tail: 'br' })
      bubble(x, 760, 820, 'YOU TOO!!', pop01(t, P.t0 + 0.6, 0.25, 2.4), { size: 54, tail: 'bl' })
      label(x, 790, 1040, 'RESPONSE: 0.2 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: '“Nice sweater.” | Wears it *forever.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: { x: -170, y: -20 },
    front(x, t, lt, P, F) {
      drawBits(x, SWEATER, { S: '#5fd068', W: '#fff4e2' }, F.x, F.cy + 110, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const day = Math.floor(1 + 399 * clamp((lt - 0.8) / 1.2))
      label(x, 790, 820, `DAY ${day}`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 48, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1000, 'still cozy', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Told forty people. | *Before lunch.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'guess what | they said!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const n = Math.min(40, Math.floor(Math.max(0, lt - 0.4) * 22) + 1)
      label(x, 790, 900, `TOLD: ${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 790, 1060, '11:58 A.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cried. Hugged them. | Baked them *bread.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt < 1.2 ? 1 : 0, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, BREAD, BREAD_C, 790, 900, 24 * pop01(t, P.t0 + 1.0, 0.35, 2))
      hearts(x, t, 790, 800, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
      label(x, 790, 1090, 'STILL WARM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 660, 'you’re so kind', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'leo', cap: '“Thanks, I know.” | Then *bowed.*', mood: 'sparkle', star: { x: -160 }, squash: lt => lt > 0.8 && lt < 1.6 ? 0.18 : 0,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) { const p = prog(lt, 0.9 + i * 0.15, 1.5 + i * 0.15); if (p > 0) drawBits(x, ROSE, { R: RED, G: '#5fd068' }, lerp(950, 440 + i * 50, ease.outCubic(p)), lerp(520, 1120 - (i % 2) * 30, ease.inQuad(p)), 10, { rot: p * 3 + i }) }
      label(x, 790, 700, 'ADDED TO BIO', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 790, 880, 'thank you, | thank you', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Listed five flaws | *to balance it out.*', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const F5 = ['1. my hair', '2. my laugh', '3. my handwriting', '4. my posture', '5. this list']
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -200, 340, 400); x.fillStyle = '#fff4e2'; x.fillRect(-162, -192, 324, 384)
        x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('MY FLAWS:', -140, -150)
        x.font = `700 24px ${MONO}`
        F5.forEach((s, i) => { if (lt > 0.4 + i * 0.3) x.fillText(s, -140, -90 + i * 62) })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'Complimented back. | *For an hour.*', mood: 'heart', star: { x: -170 },
    front(x, t, lt, P) {
      const C = ['your eyes!', 'your vibe!', 'your shoes!', 'your mom!', 'your chart!']
      const n = Math.min(C.length - 1, Math.floor(Math.max(0, lt - 0.3) / 0.38))
      bubble(x, 780, 680, C[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 900, `COMPLIMENT #${53 + n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 370, 760, P.t0 + 0.8, { n: 6, life: 2.0, spread: 220, cell: 7, seed: 4 })
    } },
  { sign: 'scorpio', cap: '“Okay. | What do you *want?*”', mood: 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'love your | jacket!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: PINK, tail: 'br' })
      label(x, 790, 860, 'MOTIVE: ???', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1010, 'CHECKING THEIR CHART…', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 26, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Said thanks. | *Booked them a trip.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { K: INK, S: ORANGE, W: '#fff4e2' }, 330, 920, 24 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.05 })
      label(x, 330, 680, 'TWO TICKETS!', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.05 })
      bubble(x, 330, 1130, 'we leave at 6!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Asked for it | *in writing.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DOC, DOC_C, 790, 860, 28 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.04 })
      label(x, 790, 640, 'SIGNED + DATED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1110, 'FILED UNDER: WINS', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: '“You’re so normal!” | *Deeply offended.*', mood: lt => lt > 1.0 ? 'eyeroll' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'so normal!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: PINK, tail: 'br' })
      label(x, 790, 880, 'NORMAL?!', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 52, bg: RED, color: '#fff4e2', rot: -0.06 })
      label(x, 790, 1050, 'NEVER SPEAKING AGAIN', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 26, bg: BONE, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: '“Nice shoes.” | Happy-cried *for days.*', mood: lt => lt < 0.8 ? 'sparkle' : 'heart', tears: lt => lt < 0.8 ? 2 : 3, star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, SHOE, { S: LAV, W: '#fff4e2' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'DAY 3 OF CRYING', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 800, P.t0 + 0.9, { n: 5, life: 1.8, spread: 160, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t114', key: 'F', accent: ACC, ending: 'lesson',
  title: 'Got a compliment? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody just | *said thanks.*' },
  lesson: { text: 'Someone saw you. | *Let it land.*', chip: 'COMPLIMENT: RECEIVED' },
  last: {
    text: 'Say thanks. | Then *pass one on.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
