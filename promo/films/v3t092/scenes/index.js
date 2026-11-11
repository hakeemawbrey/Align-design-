// v3t092: THE SIGNS AS… v3, "The signs | at the museum." (~54 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs on one museum trip, each the most extreme version of themself. Ending: 'group'.
//   0.0–3.6    "The signs | at *the museum.*"
//   3.6–49.2   ♈ saw the whole museum in four minutes · ♉ skipped the art, reviewed the café · ♊ read every plaque aloud to
//              strangers · ♋ an old teapot, called grandma · ♌ stood still, got mistaken for art · ♍ told the guard a
//              painting was crooked · ♎ loved every painting, bought the whole gift shop · ♏ guessed the artist's sign
//              from one brushstroke · ♐ touched the dinosaur · ♑ asked what the painting is worth · ♒ the empty wall is
//              the best piece · ♓ cried at a painting of a fruit bowl
//  49.2        group (the ending): "Nobody looked | at *the art.*"  A museum plaque: THE SIGNS · mixed media · priceless
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CROISSANT = [
  '...OOOO...',
  '.OOYOOYOO.',
  'OOYOOYOOYO',
  'OYOOYOOYOO',
  '.O......O.',
]
const CROISSANT_C = { O: '#e8a24a', Y: '#ffd98a' }
const TEAPOT = [
  '....KK.....',
  '...WWWW....',
  '.WWWWWWWW..',
  'WWBWWBWWWWW',
  'WWWWWWWWW.W',
  'WBWWBWWBW..',
  '.WWWWWWW...',
  '..WWWWW....',
]
const TEAPOT_C = { K: '#6fc3ff', W: '#e9f3ff', B: '#4f7dff' }
const BONES = [
  '..........WWW',
  '.........WWWW',
  '.....W..WW...',
  'W...WWWWWW...',
  'WW.WWWWWWW...',
  '.WWWWWWWWW...',
  '...WW...WW...',
  '...W.....W...',
  '..WW....WW...',
]
const BONES_C = { W: '#efe6d6' }
const BAG = [
  '..K..K..',
  '..K..K..',
  'PPPPPPPP',
  'PPPPPPPP',
  'PPWWWWPP',
  'PPPPPPPP',
  'PPPPPPPP',
]
const FRUIT = [
  '...G......',
  '..RR.YY...',
  '.RRRYYYOO.',
  'BBBBBBBBBB',
  '.BBBBBBBB.',
  '..BBBBBB..',
]
const FRUIT_C = { G: '#5fd068', R: '#e23d4e', Y: GOLD, O: '#ffb34a', B: '#8fe3ff' }

/** a gilded picture frame; inner(x) draws inside (origin at the frame centre) */
function frame(x, cx, cy, w, h, k, { rot = 0, inner = null, bg = '#2a2350' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = GOLD; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#c98f2a'; x.fillRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24)
  x.fillStyle = bg; x.fillRect(-w / 2 + 22, -h / 2 + 22, w - 44, h - 44)
  if (inner) inner(x)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Saw the whole museum | in *four minutes.*', mood: 'sparkle', star: { x: -150 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      label(x, 790, 650, 'EXIT →', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 44, bg: MINT, rot: -0.04 })
      label(x, 790, 830, 'TIME: 4:00', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 36, bg: GOLD, rot: 0.05 })
      bubble(x, 790, 1010, 'done. next?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Skipped the art. | Reviewed *the café.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, CROISSANT, CROISSANT_C, 790, 880, 26 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.06 })
      label(x, 790, 680, 'CAFÉ: ★★★★★', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04 })
      label(x, 790, 1040, 'ART: DIDN’T SEE', pop01(t, P.t0 + 1.5, 0.3, 2), { size: 28, bg: PINK, rot: -0.05 })
    } },
  { sign: 'gemini', cap: 'Read every plaque. | To *strangers.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      const LINES = ['fun fact!', 'oh, and this one—', 'the artist? | a Gemini!']
      const n = Math.min(2, Math.floor(Math.max(0, lt - 0.3) / 0.6))
      bubble(x, 780, 660, LINES[n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 900, 'AUDIENCE: 14', pop01(t, P.t0 + 1.2, 0.3, 2), { size: 32, bg: GOLD, rot: 0.05 })
    } },
  { sign: 'cancer', cap: 'Saw an old teapot. | *Called grandma.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -160 },
    front(x, t, lt, P) {
      drawBits(x, TEAPOT, TEAPOT_C, 790, 880, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 790, 660, 'you had this one!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      hearts(x, t, 790, 860, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Stood very still. | Got *mistaken for art.*', mood: 'sparkle', star: { y: -20, s: 280 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) {
      frame(x, 540, 860, 400, 440, pop01(t, P.t0 + 0.5, 0.35, 2), { bg: '#5b2e1a' })
    },
    front(x, t, lt, P) {
      label(x, 540, 1130, 'MASTERPIECE · NOT FOR SALE', pop01(t, P.t0 + 1.1, 0.3, 2), { size: 28, bg: BONE, rot: -0.02 })
      sparkles(x, t, 540, 860, P.t0 + 1.0, 6, 220, 0.2)
    } },
  { sign: 'virgo', cap: 'Told the guard | a painting was *crooked.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const r = lerp(0.09, 0, ease.inOutCubic(prog(lt, 1.2, 1.6)))
      frame(x, 790, 780, 250, 200, pop01(t, P.t0 + 0.25, 0.35, 2), { rot: r, bg: '#6fc3ff', inner(x) { x.fillStyle = '#5fd068'; x.fillRect(-80, 20, 160, 36); x.fillStyle = GOLD; x.fillRect(30, -50, 36, 36) } })
      label(x, 790, 1000, lt > 1.6 ? 'FIXED: 2 MM' : 'CROOKED: 2 MM', pop01(t, P.t0 + 0.8, 0.3, 2), { size: 30, bg: MINT, rot: -0.05 })
    } },
  { sign: 'libra', cap: 'Loved every painting. | Bought *the gift shop.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', star: { x: -160 },
    front(x, t, lt, P) {
      const cols = [PINK, LAV, MINT, GOLD]
      for (let i = 0; i < 4; i++) drawBits(x, BAG, { K: INK, P: cols[i], W: '#fff4e2' }, 700 + (i % 2) * 150, 820 + Math.floor(i / 2) * 170, 16 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { rot: (i % 2 ? 0.08 : -0.06) })
      label(x, 790, 640, 'ONE OF EACH', pop01(t, P.t0 + 1.4, 0.3, 2), { size: 34, bg: PINK, rot: 0.04 })
    } },
  { sign: 'scorpio', cap: 'Guessed the artist’s sign | from *one brushstroke.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: { x: -160 },
    front(x, t, lt, P) {
      frame(x, 790, 800, 240, 260, pop01(t, P.t0 + 0.25, 0.35, 2), { bg: '#fff4e2', inner(x) { x.strokeStyle = '#c97bff'; x.lineWidth = 18; x.lineCap = 'round'; x.beginPath(); x.moveTo(-60, 50); x.quadraticCurveTo(0, -80, 60, 30); x.stroke() } })
      bubble(x, 790, 1040, 'a Scorpio. | obviously.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Touched the dinosaur. | *Rode* the dinosaur.', mood: lt => lt > 1.0 ? 'wide' : 'sparkle', star: { x: 130, y: -70, s: 240 }, hops: [0.9, 1.5],
    back(x, t, lt, P) {
      drawBits(x, BONES, BONES_C, 470, 920, 40 * pop01(t, P.t0 + 0.2, 0.35, 2))
    },
    front(x, t, lt, P) {
      label(x, 300, 640, 'DO NOT TOUCH', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 34, bg: '#ff6b5a', rot: -0.06 })
      bubble(x, 790, 1060, 'yeehaw!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Asked what it’s | *worth.*', mood: lt => lt < 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      frame(x, 790, 780, 250, 220, pop01(t, P.t0 + 0.25, 0.35, 2), { bg: '#ffd23a', inner(x) { x.fillStyle = '#e23d4e'; x.beginPath(); x.arc(0, 0, 50, 0, Math.PI * 2); x.fill() } })
      bubble(x, 790, 1010, 'resale value?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Found the best piece: | an *empty wall.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 },
    front(x, t, lt, P) {
      frame(x, 790, 780, 250, 280, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: '#140c30' })
      label(x, 790, 980, 'PROFOUND', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: SKYB, rot: 0.05 })
      bubble(x, 790, 1100, 'it’s a fire alarm', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 30, col: LAV, tail: 'br' })
    } },
  { sign: 'pisces', cap: 'Cried at a painting | of *a fruit bowl.*', mood: lt => lt < 1.0 ? 'happy' : 'wide', tears: lt => lt < 1.0 ? 2 : 3, star: { x: -160 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      frame(x, 790, 820, 280, 240, pop01(t, P.t0 + 0.25, 0.35, 2), { bg: '#fff4e2', inner(x) { drawBits(x, FRUIT, FRUIT_C, 0, 10, 18) } })
      label(x, 790, 1040, 'SO MOVING', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: PINK, rot: -0.05 })
    } },
]

// the ending: a museum plaque for the group photo
function plaque(x, t, lt) {
  const k = pop01(t, t - lt + 1.6, 0.35, 2)
  if (k <= 0.01) return
  x.save(); x.translate(540, 620); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-230, -100, 460, 200)
  x.fillStyle = BONE; x.fillRect(-222, -92, 444, 184)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 52px ${INTER}`; x.fillText('THE SIGNS', 0, -36)
  x.font = `700 26px ${MONO}`; x.fillText('mixed media · priceless', 0, 22)
  x.fillText('please do not touch', 0, 60)
  x.restore()
}

const F = makeFilm({
  id: 'v3t092', key: 'D', accent: '#c9a6ff', ending: 'group',
  title: 'The signs | at *the museum.*',
  cameos: CAMEOS,
  group: { cap: 'Nobody looked | at *the art.*', draw: plaque },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
