// v3t046: THE SIGNS AS… v3, "Zodiacs flirting | be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    "Zodiacs flirting | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   how each sign flirts (3.8 s each), pushed to the extreme:
//              ♈ flirted so fast they're still loading · ♉ the slow blink · ♊ one pickup line in five parts
//              · ♋ "did you eat?" · ♌ winked so hard it echoed · ♍ "great posture." · ♎ flirts with everyone, means it
//              · ♏ one look, they forgot their own name · ♐ "wanna climb a mountain?" · ♑ flirted by email, per my last
//              · ♒ opened with a fact about eels · ♓ they said hi, Pisces is planning the honeymoon (in their head)
//  49.2        "Smooth? | *Not one of them.*"
//  52.6        callback: "Aries' line | *finally loaded.*" (the loading bar is back, full, with hearts)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ROSE = '#ff4f86'

const EEL = [
  '..........GGGG.',
  '.......GGGGGWKG',
  'G...GGGGGGGGGGG',
  'GGGGGGG....GGG.',
  '.GGG...........',
]
const EEL_C = { G: '#5fd068', W: '#ffffff', K: INK }
const MOUNT = [
  '......W......',
  '.....WWW.....',
  '....WWGWW....',
  '...GGGGGGG...',
  '..GGGGGGGGG..',
  '.GGGGGGGGGGG.',
  'GGGGGGGGGGGGG',
]
const MOUNT_C = { W: '#ffffff', G: '#7d8fc4' }

function loadBar(x, cx, cy, p, k, txt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -30, 320, 60); x.fillStyle = '#2a2350'; x.fillRect(-152, -22, 304, 44)
  x.fillStyle = p >= 1 ? MINT : PINK; x.fillRect(-152, -22, 304 * p, 44)
  x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 68)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Flirted so fast | they’re *still loading.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.3, 0.6, 0.9],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'heyy cutie wanna go—', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'bl' })
      const p = 0.12 + 0.2 * clamp((lt - 0.6) / 1.6)
      loadBar(x, 800, 900, p, pop01(t, P.t0 + 0.7, 0.3, 2), 'LOADING…')
    } },
  { sign: 'taurus', cap: 'Their move? | *The slow blink.*', mood: lt => (lt > 0.8 && lt < 1.6) ? 'sleepy' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      label(x, 800, 720, 'BLINK: 1', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 40, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      label(x, 800, 900, 'DURATION: 4 SEC', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 1060, P.t0 + 1.6, { n: 4, life: 1.2, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'gemini', cap: 'One pickup line. | *In five parts.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const parts = ['are you', 'a library', 'book?', 'bc i’m', 'checking…']
      parts.forEach((s, i) => bubble(x, 760 + (i % 2) * 70, 620 + i * 115, s, pop01(t, P.t0 + 0.2 + i * 0.32, 0.25, 2.2), { size: 34, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'cancer', cap: 'Their flirting? | *“Did you eat?”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'did you eat?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      bubble(x, 800, 900, 'drink water?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 1090, 'text me home', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, col: PINK, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Winked so hard | it *echoed.*', mood: lt => lt > 0.8 ? 'wink' : 'sparkle', star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      for (let i = 0; i < 3; i++) label(x, 780 + i * 30, 680 + i * 170, 'WINK', k, { size: 60 - i * 8, bg: [GOLD, '#ffd98a', '#fff0c8'][i], rot: (i - 1) * 0.06 })
      sparkles(x, t, 360, 760, P.t0 + 0.9, 8, 180, 0.4)
    } },
  { sign: 'virgo', cap: 'Flirty compliment: | *“great posture.”*', mood: 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'great posture.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 800, 920, 'SPINE: 10/10', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 38, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
      hearts(x, t, 800, 1060, P.t0 + 1.4, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 6 })
    } },
  { sign: 'libra', cap: 'Flirts with everyone. | *Means it.*', mood: 'heart', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -180 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      const ids = ['cancer', 'virgo', 'aries']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.4, 0.3, 2.2); if (k > 0.01) signChar(x, t, id, 720 + (i % 2) * 160, 660 + i * 200, 150 * k, { mood: 'heart', look: [-1, 0], seed: 60 + i, glyph: false, glow: 0.5 }) })
      hearts(x, t, 800, 900, P.t0 + 1.2, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'One look. | They forgot *their name.*', mood: 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 920, 200 * k, { mood: lt > 1.0 ? 'heart' : 'neutral', look: [-1, 0], seed: 13, glyph: false })
      bubble(x, 800, 660, 'i’m… uh… who?', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, tail: 'bc' })
      label(x, 820, 1130, 'NAME: ???', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Asked them out. | *Up a mountain.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      drawBits(x, MOUNT, MOUNT_C, 800, 880, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 800, 660, 'wanna climb this?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 800, 1090, 'DATE 1: 4,000 m', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Flirted. | *Via email.*', mood: 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = '#fff4e2'; x.fillRect(-162, -142, 324, 284)
        x.fillStyle = '#6b62a8'; x.fillRect(-162, -142, 324, 54)
        x.fillStyle = '#fff4e2'; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('RE: us', -140, -114)
        x.fillStyle = INK; x.font = `700 28px ${INTER}`
        ;['Hi,', 'Per my last email,', 'you’re cute.', 'Best regards.'].forEach((s, i) => x.fillText(s, -140, -50 + i * 50))
        x.restore()
      }
      label(x, 800, 1090, 'CC: NOBODY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Opened with | *a fact about eels.*', mood: 'sparkle', look: [1, 0], star: { x: -180 }, hops: [1.0],
    front(x, t, lt, P) {
      drawBits(x, EEL, EEL_C, 800, 880, 20 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.05 * Math.sin(t * 4) })
      bubble(x, 800, 680, 'eels can’t swim backwards', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 28, tail: 'bl' })
      label(x, 800, 1080, 'IT WORKED?', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'They said hi. | *Honeymoon: planned.*', mood: 'heart', tears: lt => lt > 1.0 ? 3 : 2, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'hi!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, tail: 'bl' })
      label(x, 800, 900, 'HONEYMOON: BOOKED', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      label(x, 800, 1060, '(IN MY HEAD)', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: LAV, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3t046', key: 'C', accent: PINK, ending: 'callback',
  title: 'Zodiacs flirting | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Smooth? | *Not one of them.*' },
  last: {
    text: 'Aries’ line | *finally loaded.*',
    draw(x, t, lt) {
      const t0 = t - lt
      loadBar(x, 540, 900, clamp(0.12 + (lt - 0.6) * 0.9), pop01(t, t0 + 0.3, 0.3, 2), lt > 1.6 ? 'LOADED ✓' : 'LOADING…')
      const k = pop01(t, t0 + 0.4, 0.4, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 540, 1150, 220 * k, { mood: lt > 1.6 ? 'heart' : 'happy', seed: 31, hops: [t0 + 1.7] })
      hearts(x, t, 540, 1050, t0 + 1.7, { n: 8, life: 1.8, spread: 420, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
