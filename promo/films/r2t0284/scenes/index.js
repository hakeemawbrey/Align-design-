// r2t0284: star_talk, BELIKE (twelve signs), "Zodiacs when they're told no | be like." (~57 s vertical, lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself hearing the word "no".
//   0.0–3.6    "Zodiacs told no | *be like.*"
//   3.6–49.2   ♈ asked louder · ♉ said okay, didn't move · ♊ asked again as the twin · ♋ baked a sad cake · ♌ "no"? never heard
//              of her · ♍ wants it in writing · ♎ agreed, then polled five friends · ♏ smiled, wrote it down · ♐ already
//              gone · ♑ five-year plan to yes · ♒ started a petition · ♓ cried, then cried more
//  49.2        "Twelve signs. | *Zero acceptance.*"
//  52.6        callback: "Aries is still | *asking. Louder.*" Aries' bubble comes back, bigger.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#ff9a8a'
const ST = { x: -170 }
const CAKE = ['....F....', '....C....', 'PPPPPPPPP', 'PPKPPPKPP', 'PPPPPPPPP', 'PPKKKKKPP', 'PKPPPPPKP', 'SSSSSSSSS', 'SSSSSSSSS']
const CAKE_C = { F: ORANGE, C: CREAM, P: '#9fb4ff', K: INK, S: '#c98f6a' }

const CAMEOS = [
  { sign: 'aries', cap: 'Heard "no." | *Asked louder.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.1, 1.5], squash: lt => lt > 1.1 && lt < 1.4 ? -0.1 : 0,
    front(x, t, lt, P) {
      label(x, 800, 660, 'no.', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GREY, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 760, 900, 'WHAT ABOUT NOW?', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 44, col: GOLD, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Said "okay." | *Didn\'t move.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      label(x, 800, 700, 'no.', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 44, bg: GREY, rot: 0.05, font: MONO, weight: 700 })
      const h = Math.floor(clamp((lt - 0.8) / 1.2) * 3)
      label(x, 790, 960, `STILL HERE · ${h + 1} HR${h ? 'S' : ''}`, pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Asked again | *as the twin.*', mood: 'wink', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2.2)
      if (k > 0.01) {
        const F2 = signChar(x, t, 'gemini', 790, 920, 240 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false })
        x.fillStyle = INK; x.fillRect(F2.x - 50, F2.cy + 4, 100, 12)
      }
      label(x, 790, 1130, 'TOTALLY NEW PERSON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Went quiet. | Baked *a sad cake.*', mood: 'sleepy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 950, 22 * pop01(t, P.t0 + 0.4, 0.35, 2))
      label(x, 790, 700, 'it’s fine :(', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: -0.04 })
    } },
  { sign: 'leo', cap: '"No"? | *Never heard of it.*', mood: 'sparkle', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 880, 330, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: '#ffffff', rot: 0.03 }, () => {
        x.fillStyle = ORANGE; x.fillRect(-165, -100, 330, 48)
        txt(x, 'DICTIONARY', 0, -76, { size: 26, font: MONO, weight: 700 })
        txt(x, 'no (n.):', -140, -10, { size: 30, align: 'left' })
        txt(x, 'word not found', -140, 46, { size: 28, align: 'left', font: MONO, weight: 700, color: RED })
      })
      sparkles(x, t, 400, 820, P.t0 + 1.3, 6, 160, 0.2)
    } },
  { sign: 'virgo', cap: 'Requested the no | *in writing.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 870, 320, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        txt(x, 'FORM 7B', 0, -130, { size: 30, font: MONO, weight: 700 })
        txt(x, 'reason for "no":', -130, -70, { size: 26, align: 'left', weight: 700 })
        x.fillStyle = '#c3cbe0'; for (let i = 0; i < 4; i++) x.fillRect(-130, -30 + i * 44, 260, 6)
        txt(x, 'signed: ______', -130, 140, { size: 24, align: 'left', font: MONO, weight: 700 })
      })
      label(x, 600, 640, 'IN TRIPLICATE', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Agreed. | *Then polled five friends.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 870, 330, 300, k, { bg: '#ffffff', rot: 0.03 }, () => {
        txt(x, 'POLL: was it no?', 0, -110, { size: 28 })
        const p = ease.outCubic(prog(lt, 0.6, 1.5))
        ;[['yes', 0.2, RED], ['no', 0.4, MINT], ['ask again', 0.9, GOLD]].forEach(([s, v, c], i) => {
          const py = -40 + i * 70
          x.fillStyle = '#e8e4f4'; x.fillRect(-140, py - 22, 280, 44); x.fillStyle = c; x.fillRect(-140, py - 22, 280 * v * p, 44)
          txt(x, s, -125, py + 2, { size: 26, align: 'left', font: MONO, weight: 700 })
        })
      })
    } },
  { sign: 'scorpio', cap: 'Smiled sweetly. | *Wrote it down.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 330, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#2a1640', rot: -0.03 }, () => {
        txt(x, 'NOTED.', 0, -120, { size: 38, color: '#ff7ab6' })
        ;['said no · tues', 'tone: rude?', 'will remember'].forEach((s, i) => { if (lt > 0.6 + i * 0.3) txt(x, s, -125, -40 + i * 60, { size: 26, align: 'left', font: MONO, weight: 700, color: BONE }) })
      })
    } },
  { sign: 'sagittarius', cap: 'Heard "no." | *Already gone.*', mood: 'sparkle', star: { x: 120 }, hops: [0.3],
    front(x, t, lt, P, F) {
      x.save(); x.globalAlpha = clamp(1 - lt / 1.6)
      x.fillStyle = BONE; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(F.x - 200 - i * 50, F.cy + 120 - (i % 2) * 30, 40 - i * 4, 0, Math.PI * 2); x.fill() }
      x.restore()
      x.fillStyle = BONE; for (let i = 0; i < 4; i++) x.fillRect(F.x - 380 + (i % 2) * 40, F.cy - 80 + i * 50, 120, 10)
      label(x, 330, 660, 'no.', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: GREY, rot: -0.05, font: MONO, weight: 700 })
      label(x, 700, 1100, 'BYE!', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Made a five-year plan | *to get a yes.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 880, 340, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.02 }, () => {
        for (let i = 0; i < 5; i++) { const h = 30 + i * 40, s = ease.outBack(prog(lt, 0.4 + i * 0.18, 0.7 + i * 0.18)); if (s <= 0) continue; x.fillStyle = INK; x.fillRect(-150 + i * 62, 110 - h * s, 50, h * s); x.fillStyle = [LAV, SKYB, MINT, GOLD, GREEN][i]; x.fillRect(-146 + i * 62, 114 - h * s, 42, h * s - 4) }
        txt(x, 'Y1   Y2   Y3   Y4   Y5', 0, 135, { size: 20, font: MONO, weight: 700 })
      })
      label(x, 900, 690, 'YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 44, bg: MINT, rot: 0.06, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Said "interesting." | *Started a petition.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 880, 300, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffffff', rot: -0.04 }, () => {
        x.fillStyle = INK; x.fillRect(-50, -196, 100, 30)
        txt(x, 'PETITION', 0, -130, { size: 34, font: MONO, weight: 700 })
        txt(x, 'overturn the no', 0, -86, { size: 24, weight: 700, color: '#6b62a8' })
        const n = Math.floor(clamp((lt - 0.4) / 1.4) * 6)
        for (let i = 0; i < n; i++) { x.strokeStyle = [SKYB, PINK, GREEN][i % 3]; x.lineWidth = 5; x.beginPath(); x.moveTo(-110, -30 + i * 32); for (let j = 0; j < 6; j++) x.lineTo(-110 + j * 36, -30 + i * 32 + (j % 2 ? -10 : 8)); x.stroke() }
      })
    } },
  { sign: 'pisces', cap: 'Cried. | *Then cried more.*', mood: 'wide', tears: lt => lt > 1.1 ? 3 : 2, look: [0, 1], star: { x: -60 },
    front(x, t, lt, P, F) {
      const w = lerp(60, 300, ease.outCubic(prog(lt, 0.3, 2.2)))
      x.fillStyle = INK; x.beginPath(); x.ellipse(F.x, F.cy + 190, w + 8, 30, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = SKYB; x.beginPath(); x.ellipse(F.x, F.cy + 190, w, 24, 0, 0, Math.PI * 2); x.fill()
      label(x, 800, 650, 'no.', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 44, bg: GREY, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0284', key: 'D', accent: ACC, ending: 'callback',
  title: 'Zodiacs told no | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero acceptance.*' },
  last: {
    text: 'Aries is still | *asking. Louder.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.4, 2)
      if (k > 0.01) signChar(x, t, 'aries', 440, 1150, 380 * k, { mood: 'wide', seed: 5, hops: [t0 + 1.0, t0 + 1.6] })
      bubble(x, 700, 880, 'WHAT ABOUT NOW??', pop01(t, t0 + 0.9, 0.3, 2.4), { size: 50, col: GOLD, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
