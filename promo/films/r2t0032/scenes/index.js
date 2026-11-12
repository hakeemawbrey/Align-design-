// r2t0032: star_talk SOLO, "Virgo coworkers | be like." (~50 s vertical, signs3kit social cut, music: lofi · E)
// One sign the whole film (makeFilm solo mode, 9 cards), each the most EXTREME office Virgo:
//   0.0–3.6    "Virgo coworkers | *be like.*"
//   3.6–37.8   replied-all with corrections · your yogurt expired: they emailed you · fixed the fonts on your slides
//              · disinfected your keyboard too · a calendar invite for a coffee break · "quick question": a scroll of an answer
//              · the office plant has a rota · out sick, still fixed your typo · loves your work, sent edits anyway
//  37.8        "Annoying? | *Indispensable.*"
//  41.0        LESSON: "They notice everything. | Even *your wins.*"  TEAM: ALIGNED
//  46.9        "Thanks, Virgo. | *Typo noted.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', SAGE = '#9fd8a8'
const GLYPHS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
// ── props
function paper(x, cx, cy, w, h, k, rot = 0, col = BONE) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
/** grey text lines inside a paper at (cx, cy) */
function lines(x, cx, cy, w, n, k, { gap = 34, top = 0, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); x.fillStyle = '#9aa5c4'
  for (let i = 0; i < n; i++) x.fillRect(-w / 2, top + i * gap, w - (i * 41) % 70, 12)
  x.restore()
}
function redMark(x, cx, cy, w, p) {
  if (p <= 0) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.lineCap = 'round'
  x.beginPath(); x.moveTo(cx - w / 2, cy); x.lineTo(cx - w / 2 + w * p, cy - 4); x.stroke(); x.restore()
}
const YOGURT = ['.KKKKKKK.', 'KWWWWWWWK', '.PPPPPPP.', '.PWWWWWP.', '.PWPPPWP.', '.PWWWWWP.', '..PPPPP..']
const YOGURT_C = { K: '#9aa5c4', W: BONE, P: PINK }
const SPRAY = ['..KKK...', '..KWKKKK', '..KKK...', '.BBBBB..', 'BBBBBBB.', 'BBWBBBB.', 'BBWBBBB.', 'BBBBBBB.', 'BBBBBBB.', '.BBBBB..']
const SPRAY_C = { K: INK, W: BONE, B: SKYB }
const KEYB = ['KKKKKKKKKKKKKK', 'KWKWKWKWKWKWKK', 'KKKKKKKKKKKKKK', 'KWKWKWKWKWKWKK', 'KKKKKKKKKKKKKK', 'KKKWWWWWWWWKKK', 'KKKKKKKKKKKKKK']
const KEYB_C = { K: '#3b3170', W: '#c9c2e8' }
const PLANT = ['....GG.G....', '..G.GGGG.G..', '.GGGG..GGGG.', '..GGGGGGGG..', '....GGGG....', '..TTTTTTTT..', '..TTTTTTTT..', '...TTTTTT...', '...TTTTTT...']
const PLANT_C = { G: '#7dd36b', T: '#c96a3a' }
const BLANKET = ['PPPPPPPPPPPP', 'PWPPWPPWPPWP', 'PPPPPPPPPPPP', 'PPWPPWPPWPPW', 'PPPPPPPPPPPP']
const THERMO = ['.W.', 'WRW', 'WRW', 'WRW', 'WRW', 'RRR', 'RRR']

const S = 'virgo'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Replied all. | *With corrections.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 840, 320, 380, k, 0.02)
      label(x, 790, 690, 'RE: RE: RE:', k, { size: 30, bg: LAV, font: MONO, weight: 700, rot: 0.02 })
      lines(x, 790, 760, 240, 6, k, { gap: 44 })
      for (let i = 0; i < 4; i++) redMark(x, 770, 766 + i * 88, 200, prog(lt, 0.6 + i * 0.22, 0.85 + i * 0.22))
      label(x, 790, 1120, 'CC: EVERYONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your yogurt expired. | *They emailed you.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, YOGURT, YOGURT_C, 790, 820, 24 * pop01(t, P.t0 + 0.15, 0.3, 2))
      label(x, 790, 640, 'EXP: YESTERDAY', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: RED, color: BONE, font: MONO, weight: 700 })
      label(x, 790, 1100, 'SUBJECT: URGENT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700, rot: 0.04 })
    } },
  { sign: S, cap: 'Fixed the fonts | *on your slides.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), fix = lt > 1.1
      paper(x, 790, 820, 360, 260, k, 0, '#2a2350')
      if (k > 0.01) {
        x.save(); x.translate(790, 820); x.scale(k, k); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
        const fonts = fix ? [`800 40px ${INTER}`, `800 40px ${INTER}`, `800 40px ${INTER}`] : [`italic 700 46px Georgia, serif`, `700 30px ${MONO}`, `800 52px ${INTER}`]
        ;['Q3 GOALS', 'sales up', 'yay!!'].forEach((s, i) => { x.font = fonts[i]; x.fillText(s, (fix ? 0 : (i - 1) * 40), -70 + i * 70) })
        x.restore()
      }
      label(x, 790, 1100, 'FONTS: 3 → 1', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Disinfected their keyboard. | *And yours.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, KEYB, KEYB_C, 790, 980, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, SPRAY, SPRAY_C, 820, 740, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.2 })
      if (lt > 0.8 && lt < 2.0) { x.save(); x.fillStyle = 'rgba(239,246,255,0.7)'; for (let i = 0; i < 10; i++) { const a = i * 0.6 + t * 3; x.beginPath(); x.arc(720 + Math.cos(a) * 60 - (lt - 0.8) * 30, 800 + Math.sin(a * 1.3) * 50 + (lt - 0.8) * 120, 10, 0, Math.PI * 2); x.fill() } x.restore() }
      sparkles(x, t, 790, 980, P.t0 + 1.5, 8, 170, 0.3)
    } },
  { sign: S, cap: 'Sent a calendar invite | *for a coffee break.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      paper(x, 790, 830, 340, 280, k, -0.03)
      if (k > 0.01) {
        x.save(); x.translate(790, 830); x.rotate(-0.03); x.scale(k, k)
        x.fillStyle = RED; x.fillRect(-170, -140, 340, 60)
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -108)
        x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('Coffee', 0, -20); x.font = `700 30px ${MONO}`; x.fillText('10:15–10:22', 0, 40)
        x.restore()
      }
      label(x, 790, 1100, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: GOLD, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Quick question?” | *Got a scroll back.*', mood: 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), un = ease.outCubic(prog(lt, 0.5, 1.6)), h = lerp(70, 640, un)
      paper(x, 790, 540 + h / 2, 230, h, k)
      if (k > 0.01) { x.save(); x.beginPath(); x.rect(675, 540, 230, h); x.clip(); lines(x, 790, 570, 180, 18, 1, { gap: 34 }); x.restore() }
      bubble(x, 420, 620, 'quick q?', pop01(t, P.t0 + 0.2, 0.25, 2.4), { size: 38, tail: 'bl' })
      label(x, 790, 1150, 'PART 1 OF 4', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The office plant? | *Has a rota.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, PLANT_C, 790, 900, 22 * pop01(t, P.t0 + 0.15, 0.3, 2))
      const k = pop01(t, P.t0 + 0.7, 0.3, 2)
      paper(x, 790, 640, 300, 120, k, 0.03)
      if (k > 0.01) { x.save(); x.translate(790, 640); x.rotate(0.03); x.scale(k, k); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MON 9:00 · 120 ML', 0, -18); x.fillText('THU 9:00 · 120 ML', 0, 22); x.restore() }
      label(x, 790, 1130, 'PLANT: THRIVING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Out sick. | *Still fixed your typo.*', mood: 'sleepy', star: { x: -120, y: 40, s: 270 },
    back(x, t, lt, P) { drawBits(x, BLANKET, { P: LAV, W: BONE }, 420, 1010, 26 * pop01(t, P.t0 + 0.05, 0.3, 1.8)) },
    front(x, t, lt, P) {
      drawBits(x, THERMO, { W: BONE, R: RED }, 520, 860, 10 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.5 })
      paper(x, 800, 820, 240, 170, pop01(t, P.t0 + 0.5, 0.3, 2), 0.05, '#2a2350')
      lines(x, 800, 780, 170, 3, pop01(t, P.t0 + 0.5, 0.3, 2), { gap: 34, rot: 0.05 })
      label(x, 790, 1120, 'TYPO: FIXED (FROM BED)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: SAGE, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Loves your work. | *Sent edits anyway.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.9],
    front(x, t, lt, P) {
      label(x, 790, 740, 'LOVE IT!', pop01(t, P.t0 + 0.2, 0.3, 2.2), { size: 56, bg: GOLD, rot: -0.04 })
      label(x, 800, 900, '+ 12 EDITS', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 40, bg: RED, color: BONE, font: MONO, weight: 700, rot: 0.05 })
      hearts(x, t, 790, 680, P.t0 + 1.4, { n: 5, life: 1.8, spread: 220, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0032', key: 'E', accent: SAGE, solo: 'virgo', ending: 'lesson',
  title: 'Virgo coworkers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Annoying? | *Indispensable.*', mood: 'sparkle' },
  lesson: { text: 'They notice everything. | Even *your wins.*', chip: 'TEAM: ALIGNED' },
  last: {
    text: 'Thanks, Virgo. | *Typo noted.*',
    draw(x, t, lt) { label(x, 540, 1300, 'RE: THANKS (EDITED)', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 34, bg: SAGE, font: MONO, weight: 700 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
