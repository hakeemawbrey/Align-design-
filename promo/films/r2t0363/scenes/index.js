// r2t0363: star_talk, BE LIKE (twelve signs), "Horoscope readers | be like." (~54 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, each the most extreme version of itself reading today's horoscope. Ending: group.
//   ♈ read one word, already left · ♉ it said "change", Taurus said no · ♊ read both, picked the better one
//   · ♋ saw "family", called mom · ♌ not about them? wrote a new one · ♍ citation needed · ♎ read four, still deciding
//   · ♏ "it's fake", read it three times · ♐ "travel soon", already at the gate · ♑ scheduled the lucky hour
//   · ♒ argued with Saturn · ♓ "big emotions today", every day (crying)
//  49.2  group (the ending): "Same stars. | *Twelve meltdowns.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const ACC = '#ffd86b', GREY = '#9aa5c4', RED = '#ff6b5a'
const M = { font: MONO, weight: 700 }
const ST = { x: -170 }
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

/** a parchment horoscope: a headline and a few lines (some of which can be a highlighted word) */
function scroll(x, cx, cy, k, rot, head, line, { lines = 3, hi = null } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const W = 300, H = 330
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#f3e2b8'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#d9c28e'; x.fillRect(-W / 2, -H / 2, W, 18); x.fillRect(-W / 2, H / 2 - 18, W, 18)
  txt(x, head, 0, -H / 2 + 56, `700 28px ${MONO}`, INK)
  if (line) { if (hi) { x.fillStyle = hi; x.fillRect(-W / 2 + 24, -H / 2 + 92, W - 48, 50) } txt(x, line, 0, -H / 2 + 118, `800 36px ${INTER}`, INK) }
  x.fillStyle = '#b39b6a'
  for (let i = 0; i < lines; i++) x.fillRect(-W / 2 + 30, -H / 2 + 172 + i * 34, i % 2 ? 180 : 240, 10)
  x.restore()
}
function phone(x, cx, cy, k, rot, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -172, 240, 360)
  x.fillStyle = INK; x.fillRect(-120, -180, 240, 360)
  x.fillStyle = '#2a2350'; x.fillRect(-110, -170, 220, 340)
  inner(x)
  x.restore()
}
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'KKKKKKKKKKKK',
  'KOOOOOOOOOOK',
  'KOWWOOOOWWOK',
  'KOOOOOOOOOOK',
  'KOOOOOOOOOOK',
  'KOWWOOOOWWOK',
  'KOOOOOOOOOOK',
  'KKKKKKKKKKKK',
  '.K........K.',
]
const SUIT_C = { K: INK, O: '#ff9a4a', W: BONE }
const GLASS = [
  '..KKKKK....',
  '.KWWWWWK...',
  'KWBBWWWWK..',
  'KWBWWWWWK..',
  'KWWWWWWWK..',
  'KWWWWWWWK..',
  '.KWWWWWK...',
  '..KKKKKHH..',
  '.......HHH.',
  '........HHH',
  '.........HH',
]
const GLASS_C = { K: INK, W: '#cfefff', B: '#ffffff', H: '#8a4a2e' }

const CAMEOS = [
  { sign: 'aries', cap: 'Read one word. | *Already left.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', look: [-1, 0], star: { x: -60 }, hops: [0.8],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 0.9, 1.4))
      scroll(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'ARIES TODAY', 'Be patient…', { hi: '#ffd0c8' })
      label(x, 790, 1120, 'READ: 1 WORD', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: RED, color: BONE, rot: -0.05, ...M })
      if (go > 0) { x.save(); x.globalAlpha = 0.6 * (1 - go); x.fillStyle = '#ff6b5a'; for (let i = 0; i < 4; i++) x.fillRect(260 - go * 200, 820 + i * 34, 120, 10); x.restore() }
    } },
  { sign: 'taurus', cap: 'It said “change.” | Taurus *said no.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scroll(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, 'TAURUS TODAY', 'embrace change', { hi: '#c8f0c0' })
      bubble(x, 800, 1100, 'no.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 80, col: BONE, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Read both signs. | *Picked the better one.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pick = lt > 1.2
      scroll(x, 700, 860, pop01(t, P.t0 + 0.2, 0.3, 2) * (pick ? 0.82 : 1), -0.08, 'GEMINI', 'rough day', { lines: 2 })
      scroll(x, 880, 900, pop01(t, P.t0 + 0.45, 0.3, 2) * (pick ? 1.05 : 0.9), 0.08, 'LEO', 'you’re a star', { lines: 2, hi: pick ? '#ffe7a0' : null })
      if (pick) label(x, 880, 1120, 'NOW I’M A LEO', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.05, ...M })
    } },
  { sign: 'cancer', cap: 'Saw the word “family.” | *Called their mom.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        txt(x, 'CALLING', 0, -120, `700 24px ${MONO}`, LAV)
        txt(x, 'MOM ♥', 0, -60, `800 48px ${INTER}`, BONE)
        x.fillStyle = MINT; x.beginPath(); x.arc(0, 80, 40, 0, Math.PI * 2); x.fill()
      })
      bubble(x, 720, 600, 'hi mom!! | just because', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: BONE, tail: 'br' })
    } },
  { sign: 'leo', cap: 'Not about them? | *Wrote a new one.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const redo = lt > 1.0
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, redo ? 'BY LEO, FOR LEO' : 'LEO TODAY', redo ? 'you’re iconic' : 'listen more', { hi: redo ? '#ffe7a0' : null })
      if (redo) sparkles(x, t, 790, 860, P.t0 + 1.0, 6, 190, 0.4, [GOLD, BONE, '#ffb34a'])
      label(x, 790, 1120, 'EDITED: BY ME', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'virgo', cap: 'Fact-checked | *the stars.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, 'VIRGO TODAY', 'luck is coming')
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      drawBits(x, GLASS, GLASS_C, 760 + Math.sin(t * 2) * 30, 830, 14 * k)
      label(x, 790, 1120, 'CITATION NEEDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: RED, color: BONE, rot: 0.05, ...M })
    } },
  { sign: 'libra', cap: 'Read four of them. | *Still deciding.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) scroll(x, 700 + i * 60, 800 + i * 50, 0.62 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), -0.12 + i * 0.08, `SITE ${i + 1}`, '', { lines: 3 })
      bubble(x, 800, 1130, 'hmm.', pop01(t, P.t0 + 1.3, 0.25, 2.4), { size: 56, col: PINK, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Says it’s fake. | *Read it three times.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(3, 1 + Math.floor(lt / 0.6))
      scroll(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'SCORPIO TODAY', 'trust someone')
      bubble(x, 760, 600, 'not real.', pop01(t, P.t0 + 0.4, 0.25, 2), { size: 44, col: LAV, tail: 'bl' })
      label(x, 790, 1120, `READ: ${n}×`, pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: '#c97bff', color: BONE, rot: -0.05, ...M })
    } },
  { sign: 'sagittarius', cap: '“Travel soon.” | *Already at the gate.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.1],
    front(x, t, lt, P) {
      drawBits(x, SUITCASE, SUIT_C, 800, 940, 22 * pop01(t, P.t0 + 0.6, 0.3, 2.2))
      label(x, 790, 640, 'GATE 12: BOARDING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, ...M })
      bubble(x, 400, 590, 'read it | 2 min ago', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: BONE, tail: 'bc' })
    } },
  { sign: 'capricorn', cap: 'Lucky day? | *Scheduled it.*', mood: lt => lt > 1.2 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 870); x.rotate(0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-156, -176, 312, 352); x.fillStyle = BONE; x.fillRect(-150, -170, 300, 340)
        x.fillStyle = '#7fd1c7'; x.fillRect(-150, -170, 300, 60); txt(x, 'THURSDAY', 0, -140, `800 34px ${INTER}`, INK)
        ;['9:00 work', '1:00 work', '2:00 LUCK', '3:00 work'].forEach((s, i) => {
          if (i === 2) { x.fillStyle = GOLD; x.fillRect(-130, -78 + i * 64, 260, 50) }
          txt(x, s, -114, -52 + i * 64, `700 30px ${MONO}`, INK, 'left')
        })
        x.restore()
      }
      label(x, 790, 1130, 'LUCK: 1 HOUR. MAX.', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, ...M })
    } },
  { sign: 'aquarius', cap: 'Read it to argue | *with Saturn.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(820, 760); x.scale(k, k)
        x.strokeStyle = '#e8c88a'; x.lineWidth = 14; x.beginPath(); x.ellipse(0, 0, 130, 34, -0.2, 0, Math.PI * 2); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#f2c78a'; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#d9a45e'; x.fillRect(-60, -16, 120, 12); x.fillRect(-50, 18, 100, 10)
        x.strokeStyle = '#e8c88a'; x.beginPath(); x.ellipse(0, 0, 130, 34, -0.2, 0, Math.PI); x.stroke()
        x.restore()
      }
      bubble(x, 780, 1050, 'saturn, | explain.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 50, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: '“Big emotions today.” | *Every day.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      scroll(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, 'PISCES TODAY', 'big emotions', { hi: '#cfe8ff' })
      label(x, 790, 1110, 'ACCURATE. AGAIN.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, ...M })
    } },
]

const F = makeFilm({
  id: 'r2t0363', key: 'G', accent: ACC, ending: 'group',
  title: 'Horoscope readers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Same stars. | *Twelve meltdowns.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
