// v3t056: THE SIGNS AS… v3, "When your bestie | gets a partner." (~62 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "When your bestie | gets *a partner.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), each pushed to the extreme:
//              ♈ challenged them to arm wrestling · ♉ accepts them if they bring snacks · ♊ told the group chat first
//              · ♋ adopted them like a son · ♌ "have you seen my work?" · ♍ graded the first meeting: B-minus
//              · ♎ already booked double dates · ♏ one handshake, read their soul · ♐ invited them on a six-month trip
//              · ♑ booked a meeting, agenda attached · ♒ one hypothetical, three hours · ♓ cried at the first couple photo
//  49.2        "Approved. | *Mostly.*"
//  52.4        LESSON UNLOCKED: "Love who your friend loves. | *Make room.*"  SQUAD: +1
//  58.3        "Aries still wants | *a rematch.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', ROSE = '#ff7aa8'

const ARM = [
  '...SS...',
  '..SSSS..',
  '..SSSS..',
  '...SS...',
  '...SS...',
  '...SS...',
  'TTTTTTTT',
  'TTTTTTTT',
  '.K....K.',
]
const COOKIE = [
  '.CCCCC.',
  'CCdCCCC',
  'CCCCCdC',
  'CdCCCCC',
  'CCCCdCC',
  '.CCCCC.',
]
const PHONE = [
  'KKKKKKKK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KSWWWSSK',
  'KSSSSSSK',
  'KSWWWWSK',
  'KSSSSSSK',
  'KKKKKKKK',
]
const SUITCASE = [
  '...KKKK...',
  '...K..K...',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  'SsSSSSSSsS',
  'SSSSSSSSSS',
  '.K......K.',
]

// a sheet of paper with a big grade or a list
function paper(x, cx, cy, k, fn, { rot = 0.04, w = 280, h = 340 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.15, k * 1.15)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  fn(x)
  x.restore()
}
// a couple photo: two little stars side by side, a heart above
function couple(x, t, cx, cy, k, { a = 'virgo', b = 'aries' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k * 1.35, k * 1.35)
  x.fillStyle = INK; x.fillRect(-150, -120, 300, 240); x.fillStyle = '#fff4e2'; x.fillRect(-142, -112, 284, 224); x.fillStyle = '#ffd6e4'; x.fillRect(-126, -96, 252, 160)
  signChar(x, t, a, -50, -12, 110, { mood: 'happy', seed: 61, glyph: false, glow: 0.3 })
  signChar(x, t, b, 55, -12, 110, { mood: 'heart', seed: 62, glyph: false, glow: 0.3 })
  x.fillStyle = INK; x.font = `italic 700 28px 'EB Garamond', Georgia, serif`; x.textAlign = 'center'; x.fillText('us ♡', 0, 92)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Challenged them | to *arm wrestling.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.4, 0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, ARM, { S: '#ff9a6a', T: '#8a4a2e', K: '#5a2e1a' }, 790, 930, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 9) * 0.08 })
      label(x, 790, 660, 'BEST OF 3', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 38, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'GO!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Approves them | if *they bring snacks.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', star: { x: -180 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, COOKIE, { C: '#d9a05a', d: '#6b3a1e' }, 700 + i * 100, 900 + (i % 2) * 60, 18 * pop01(t, P.t0 + 0.6 + i * 0.25, 0.3, 2))
      label(x, 790, 660, 'ENTRY FEE', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 36, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Told the group chat | *before you did.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, PHONE, { K: INK, S: '#2a2350', W: MINT }, 790, 880, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = Math.min(99, Math.floor(lt * 50))
      label(x, 880, 700, `${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 40, bg: RED, color: '#fff4e2', rot: 0.06, font: MONO, weight: 700 })
      bubble(x, 760, 1140, 'BIG NEWS!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Adopted them. | *Like a son.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 800, 900, 200 * k, { mood: lt > 1.2 ? 'wide' : 'happy', look: [-1, 0], seed: 23, glyph: false })
      label(x, 800, 1140, 'MY BOY NOW', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04 })
      hearts(x, t, 800, 800, P.t0 + 1.3, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'First question: | *“seen my work?”*', mood: 'sparkle', star: { x: -180 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 810, 940, 230 * k, { mood: 'wide', look: [-1, 0], seed: 24, glyph: false })
      label(x, 790, 680, 'MY PORTFOLIO', pop01(t, P.t0 + 0.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 790, 700, P.t0 + 0.9, 7, 170, 0.4)
    } },
  { sign: 'virgo', cap: 'Graded the first meeting. | *B-minus.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.font = `800 26px ${INTER}`; x.fillText('MEETING #1', 0, -130)
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-100, -80 + i * 34, 200, 10)
        if (lt > 1.0) { x.fillStyle = RED; x.font = `800 110px ${INTER}`; x.fillText('B-', 0, 90) }
      })
    } },
  { sign: 'libra', cap: 'Already booked | *double dates.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.font = `800 28px ${INTER}`; x.fillText('DOUBLE DATES', 0, -130)
        x.font = `700 26px ${MONO}`; x.fillStyle = '#2a2350'
        const R = ['FRI · bowling', 'SAT · brunch', 'SUN · picnic', 'MON · again']
        R.slice(0, 1 + Math.floor(clamp((lt - 0.4) / 1.2) * 4)).forEach((r, i) => x.fillText(r, 0, -70 + i * 52))
      })
      hearts(x, t, 790, 720, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'scorpio', cap: 'One handshake. | *Read their soul.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 920, 190 * k, { mood: lt > 1.0 ? 'wide' : 'happy', look: [-1, 0], seed: 25, glyph: false })
      label(x, 800, 660, 'SCAN: DONE', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: '#ff8a9a', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 1150, 'they’re good.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Invited them | on a *six-month trip.*', mood: 'sparkle', star: { x: -180 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, { S: ORANGE, s: '#c97a2a', K: INK }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'LEAVING: NOW', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1140, 'bring a hat!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Booked a meeting. | *Agenda attached.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.font = `800 28px ${INTER}`; x.fillText('AGENDA', 0, -130)
        x.font = `700 24px ${MONO}`; x.fillStyle = '#2a2350'; x.textAlign = 'left'
        ;['1. intros', '2. intentions', '3. credit score', '4. snacks'].forEach((r, i) => x.fillText(r, -110, -70 + i * 50))
      })
      label(x, 790, 1110, '9:00 SHARP', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Asked one hypothetical. | *For three hours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'but what if | fish could talk?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      label(x, 790, 1000, `${Math.min(3, Math.floor(lt * 1.6))}:${String(Math.floor(lt * 37) % 60).padStart(2, '0')}:00`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Saw your first photo. | *Sobbed. Framed it.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      couple(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      hearts(x, t, 790, 720, P.t0 + 1.0, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
]

const F = makeFilm({
  id: 'v3t056', key: 'C', accent: ROSE, ending: 'lesson',
  title: 'When your bestie | gets *a partner.*',
  cameos: CAMEOS,
  group: { cap: 'Approved. | *Mostly.*' },
  lesson: { text: 'Love who your friend loves. | *Make room.*', chip: 'SQUAD: +1' },
  last: {
    text: 'Aries still wants | *a rematch.*',
    draw(x, t, lt) { drawBits(x, ARM, { S: '#ff9a6a', T: '#8a4a2e', K: '#5a2e1a' }, 900, 1600, 22 * pop01(t, t - lt + 0.7, 0.3, 2), { rot: Math.sin(t * 9) * 0.08 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
