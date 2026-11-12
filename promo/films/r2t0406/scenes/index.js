// r2t0406: star_talk, ROLLCALL, "The signs at | a *talent show.*" (~55 s vertical, signs3kit social cut, music: lofi · C)
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one act each (3.8 s per sign), each pushed to the extreme:
//              ♈ signed up for every act · ♉ talent: eating a sandwich slowly · ♊ a duet with themself
//              · ♋ baked cookies for the judges · ♌ brought their own spotlight · ♍ fixed the sound mid-act
//              · ♎ still choosing an act on stage · ♏ magic trick, the judge vanished · ♐ juggling, one ball into the crowd
//              · ♑ networked the judges · ♒ interpretive dance about the moon · ♓ sang one note, everyone sobbed
//  49.2        group beat "Twelve acts. | *Zero rehearsals.*"  lesson, last line.
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, notes, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO,
} from '../../signs3kit.js'
import { card, txt, confetti, beam, CREAM, RED, ORANGE, GREY, DEEP, GREEN, SUN, BROWN, clamp, ease, lerp, prog } from './props.js'

const ACC = '#ff6fae'
const ST = { x: -170 }
const lab = (x, cx, cy, s, k, o = {}) => label(x, cx, cy, s, k, { size: 32, font: MONO, weight: 700, ...o })

const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', '.BBBBBBBBBB.']
const SAND_C = { B: '#e6b26a', G: GREEN, R: RED, Y: SUN }
const COOKIE = ['.CCCC.', 'CCKCCC', 'CCCCKC', 'CKCCCC', '.CCCC.']
const HAT = ['..KKKKKK..', '..KKKKKK..', '..KKKKKK..', '..KKKKKK..', '..RRRRRR..', 'KKKKKKKKKK']
const BALL = ['.BB.', 'BBBB', 'BBBB', '.BB.']
const MOON = ['..MMMM..', '.MMM....', 'MMM.....', 'MMM.....', 'MMM.....', '.MMM....', '..MMMM..']
const MICS = ['.GG.', 'GGGG', 'GGGG', '.GG.', '.KK.', '.KK.', '.KK.', '.KK.', '.KK.', '.KK.', 'KKKK']

// a little judges' table with score paddles
function judges(x, t, cx, cy, k, scores, { col = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, 0, 340, 70); x.fillStyle = BROWN; x.fillRect(-162, 8, 324, 54)
  scores.forEach((s, i) => {
    const px = -110 + i * 110
    x.fillStyle = INK; x.fillRect(px - 4, -60, 8, 64)
    x.fillStyle = INK; x.fillRect(px - 44, -130, 88, 76); x.fillStyle = col; x.fillRect(px - 38, -124, 76, 64)
    txt(x, s, px, -92, { size: 34, font: MONO, weight: 700 })
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Signed up | for *every act.*', mood: 'sparkle', star: ST, hops: [0.5, 1.0, 1.5, 2.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'LINE-UP', 0, -150, { size: 34, font: MONO, weight: 700, color: RED })
        const n = Math.min(6, 1 + Math.floor(Math.max(0, lt - 0.4) / 0.22))
        for (let i = 0; i < n; i++) txt(x, `${i + 1}. ARIES`, 0, -90 + i * 46, { size: 32 })
      })
      lab(x, 790, 1110, 'ALSO THE HOST', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: RED, color: BONE, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'Their talent? | Eating a *sandwich.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), bites = Math.floor(clamp((lt - 0.6) / 1.4) * 3)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k); x.translate(-790, -900)
        drawBits(x, SANDWICH, SAND_C, 790, 900, 24)
        x.fillStyle = '#140c30'; for (let i = 0; i < bites; i++) { x.beginPath(); x.arc(790 + 150, 830 + i * 50, 34, 0, Math.PI * 2); x.fill() }
        x.restore()
      }
      judges(x, t, 790, 1140, pop01(t, P.t0 + 1.4, 0.3, 2), ['10', '10', '10'], { col: MINT })
    } },
  { sign: 'gemini', cap: 'A duet. | *With themself.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 790, 920, 240 * k, { mood: lt > 1.3 ? 'wink' : 'sparkle', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.2, P.t0 + 2.0] })
      bubble(x, 420, 600, 'my part!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 38, tail: 'br' })
      bubble(x, 790, 1130, 'no, MY part!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc', col: SUN })
    } },
  { sign: 'cancer', cap: 'Baked cookies | for *the judges.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 190, 50, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#d8dbe8'; x.beginPath(); x.ellipse(0, 34, 180, 42, 0, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 5; i++) drawBits(x, COOKIE, { C: '#d99a4e', K: BROWN }, -110 + i * 55, 6 - (i % 2) * 34, 12)
        x.restore()
      }
      lab(x, 790, 700, 'ACT: HOMEMADE', pop01(t, P.t0 + 0.8, 0.3, 2), { bg: PINK, rot: 0.05 })
      lab(x, 790, 1110, 'JUDGES: CRYING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: SKYB, rot: -0.04 })
    } },
  { sign: 'leo', cap: 'Brought their | *own spotlight.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: { x: -60 }, hops: [1.2],
    back(x, t, lt, P, F) {
      beam(x, 260, 470, F.x, 1150, 220, pop01(t, P.t0 + 0.4, 0.35, 2), { a: 0.38 })
    },
    front(x, t, lt, P) {
      x.save(); x.translate(250, 520); x.rotate(0.5); x.scale(pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 0.2, 0.3, 2))
      x.fillStyle = INK; x.fillRect(-60, -46, 120, 92); x.fillStyle = GREY; x.fillRect(-52, -38, 104, 76); x.fillStyle = '#fff1b0'; x.fillRect(40, -30, 22, 60)
      x.restore()
      lab(x, 800, 1130, 'BYO LIGHTING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GOLD, rot: 0.04 })
      sparkles(x, t, 480, 820, P.t0 + 1.1, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Stopped mid-act | to *fix the sound.*', mood: 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, MICS, { G: '#c9c9d8', K: '#2a2350' }, 790, 930, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const lv = Math.min(5, Math.floor(Math.max(0, lt - 0.5) / 0.25))
      lab(x, 790, 650, `MIC CHECK ${lv + 1}`, pop01(t, P.t0 + 0.5, 0.3, 2), { bg: MINT, rot: 0.04, size: 40 })
      bubble(x, 790, 1150, 'ok. NOW we start.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Still choosing an act. | *On stage.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const opts = ['juggle?', 'sing?', 'mime?', 'tap dance?']
      const i = Math.min(3, Math.floor(Math.max(0, lt - 0.3) / 0.45))
      bubble(x, 790, 720, opts[i], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bl', col: PINK })
      const m = Math.floor(clamp((lt - 0.4) / 1.8) * 9)
      lab(x, 790, 1060, `ON STAGE: ${m} MIN`, pop01(t, P.t0 + 0.6, 0.3, 2), { bg: GOLD, rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Magic trick. | The judge *vanished.*', mood: lt => lt > 1.2 ? 'squint' : 'sparkle', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, HAT, { K: INK, R: RED }, 640, 1100, 18 * k, { outline: '#3a2f66' })
      const gone = ease.inCubic(prog(lt, 0.9, 1.25))
      if (gone < 1) signChar(x, t, 'capricorn', 830, 900, 180 * k, { mood: 'wide', look: [-1, 0], seed: 19, glyph: false, alpha: 1 - gone, pop: 1 - gone * 0.6 })
      sparkles(x, t, 830, 900, P.t0 + 0.9 * 1.29, 8, 140, 0.3, [LAV, BONE, PINK])
      lab(x, 830, 700, 'BACK IN 5 (?)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: LAV, rot: 0.04 })
    } },
  { sign: 'sagittarius', cap: 'Juggling. One ball | went *into the crowd.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const cols = [RED, SUN, MINT]
      for (let i = 0; i < 3; i++) {
        let bx, by
        if (i === 2 && lt > 1.0) { const p = clamp((lt - 1.0) / 0.8); bx = lerp(F.x + 60, 850, p); by = lerp(F.top - 160, 600, p) - Math.sin(Math.PI * p) * 80 }
        else { const a = t * 5 + i * 2.1; bx = F.x + Math.cos(a) * 90; by = F.top - 120 + Math.sin(a) * 50 }
        drawBits(x, BALL, { B: cols[i] }, bx, by, 22 * k)
      }
      lab(x, 790, 1100, 'SORRY ROW 3', pop01(t, P.t0 + 1.7, 0.3, 2.4), { bg: SUN, rot: -0.04, size: 36 })
    } },
  { sign: 'capricorn', cap: 'Skipped the act. | *Networked the judges.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const kk = pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2)
        card(x, 700 + i * 90, 760 + i * 70, 220, 120, kk, { bg: CREAM, rot: -0.12 + i * 0.12 }, () => {
          txt(x, 'CAPRICORN', 0, -22, { size: 26, font: MONO, weight: 700 }); txt(x, 'CEO, PROBABLY', 0, 22, { size: 18, font: MONO, weight: 700, color: GREY })
        })
      }
      lab(x, 790, 1120, 'LET’S CONNECT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { bg: GREEN, rot: -0.04 })
    } },
  { sign: 'aquarius', cap: 'Interpretive dance | about *the moon.*', mood: 'sparkle', look: [1, -1], star: ST, hops: [0.5, 1.1, 1.7],
    squash: lt => 0.08 * Math.sin(lt * 9),
    front(x, t, lt, P) {
      drawBits(x, MOON, { M: '#fff1b0' }, 800, 700, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.2 * Math.sin(t * 2) })
      lab(x, 790, 1080, 'CROWD: ???', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GREY, rot: 0.04, size: 38 })
      bubble(x, 790, 920, 'it’s about time', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl', col: SKYB })
    } },
  { sign: 'pisces', cap: 'Sang one note. | *Everyone sobbed.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      notes(x, t, 560, 720, { n: 3, cell: 8, col: SKYB, seed: 1 })
      judges(x, t, 790, 1080, pop01(t, P.t0 + 0.6, 0.3, 2), ['T_T', 'T_T', 'T_T'], { col: SKYB })
      lab(x, 790, 700, 'STANDING OVATION', pop01(t, P.t0 + 1.4, 0.3, 2.4), { bg: GOLD, rot: 0.04 })
    } },
]

const F = makeFilm({
  id: 'r2t0406', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs at | a *talent show.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve acts. | *Zero rehearsals.*',
    draw(x, t, lt) { confetti(x, t, 540, 1050, t - lt + 1.0, { n: 26, spread: 420, h: 700 }) },
  },
  lesson: { text: 'Getting on stage is brave. | *Cheer loud.*', chip: 'APPLAUSE: MAX' },
  last: {
    text: 'The winner? | *The sandwich.*',
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
