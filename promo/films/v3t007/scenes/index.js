// v3t007: THE SIGNS AS… v3, "The signs on a | group project." (~63 s vertical, signs3kit social cut, music: lofi · D)
//   0.0–3.6    "The signs on a | *group project.*"
//   3.6–49.2   one group project per sign (3.8 s each), each pushed to the extreme:
//              ♈ did the whole project, day one · ♉ picked the font, won't discuss it · ♊ pitched twelve ideas, did none
//              · ♋ made the group chat, called it "family" · ♌ did one slide, presented all of them · ♍ redid everyone's part, quietly
//              · ♎ gorgeous slides, no content · ♏ knows who did nothing, has receipts · ♐ joined from another time zone
//              · ♑ a nine-phase plan for one poster · ♒ rewrote the brief the night before · ♓ it's done, misses the group
//  49.2        "Grade: *A.* | Somehow."
//  52.4        LESSON UNLOCKED: "Share the work. | *Share the credit.*"  GRADE: A
//  58.3        "Aries and Virgo | did it *twice.*" (lesson ending).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', BROWN = '#8a4a2e', GREEN = '#5fd068'

const CHECK = ['.......GG', '......GG.', 'G....GG..', 'GG..GG...', '.GGGG....', '..GG.....']
const RECEIPT = [
  'WWWWWWWW',
  'WKKKKKWW',
  'WWWWWWWW',
  'WKKKWWWW',
  'WKKKKKKW',
  'WWWWWWWW',
  'WKKKKWWW',
  'WKKKKKWW',
  'WWWWWWWW',
  'W.W.W.W.',
]
const RECEIPT_C = { W: '#fff4e2', K: '#b9b0a0' }
const CLOCK = [
  '...WWWW...',
  '.WWWWWWWW.',
  '.WWWKWWWW.',
  'WWWWKWWWWW',
  'WWWWKKKWWW',
  'WWWWWWWWWW',
  '.WWWWWWWW.',
  '.WWWWWWWW.',
  '...WWWW...',
]

// a slide: a framed rectangle with optional content
function slide(x, cx, cy, k, { w = 320, h = 220, title = '', bars = false, pretty = false, rot = 0.04, ts = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  if (pretty) {
    const g = x.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); g.addColorStop(0, PINK); g.addColorStop(0.5, LAV); g.addColorStop(1, SKYB)
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? GOLD : '#fff4e2'; x.fillRect(-w / 2 + 20 + i * 38, -h / 2 + 18 + (i % 3) * 60, 10, 10) }
  } else { x.fillStyle = '#fff4e2'; x.fillRect(-w / 2, -h / 2, w, h) }
  if (title) { x.fillStyle = INK; x.font = `800 ${ts || (pretty ? 34 : 28)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, pretty || ts ? 0 : -h / 2 + 34) }
  if (bars) { x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-w / 2 + 30, -h / 2 + 76 + i * 30, w - 90 - (i % 2) * 40, 10) }
  x.restore()
}
// a phase plan: nine rows filling in
function plan(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -200, 360, 400); x.fillStyle = '#fff4e2'; x.fillRect(-172, -192, 344, 384)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE POSTER: A PLAN', 0, -160)
  const C = [PINK, ORANGE, GOLD, GREEN, '#2fc79a', SKYB, LAV, '#c97bff', RED]
  const n = Math.floor(clamp((lt - 0.3) / 1.4) * 9)
  for (let i = 0; i < n; i++) { x.fillStyle = C[i]; x.fillRect(-150 + i * 22, -120 + i * 34, 120, 22) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Did the whole project. | *Day one.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      label(x, 800, 650, 'DUE: IN 3 WEEKS', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.4) / 0.25))
      for (let i = 0; i < n; i++) { label(x, 760, 780 + i * 80, `PART ${i + 1}`, 1, { size: 28, bg: MINT, rot: 0.03, font: MONO, weight: 700 }); drawBits(x, CHECK, { G: '#2fc79a' }, 900, 780 + i * 80, 7) }
      bubble(x, 380, 600, 'done!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Picked the font. | *Will not discuss it.*', mood: lt => lt > 1.1 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      slide(x, 800, 820, pop01(t, P.t0 + 0.2, 0.3, 2), { title: 'Aa', pretty: false, w: 280, h: 240, ts: 120 })
      label(x, 800, 1050, 'FONT: FINAL', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 380, 600, 'no.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 50, col: LAV, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Pitched twelve ideas. | *Did none.*', mood: lt => Math.floor(lt * 2.8) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.8) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(Math.max(0, lt - 0.2) / 0.12) + 1)
      for (let i = 0; i < n; i++) { const c = i % 4, r = Math.floor(i / 4); label(x, 680 + c * 84, 680 + r * 110, `${i + 1}`, 1, { size: 40, bg: [GOLD, PINK, SKYB, MINT][r], rot: (c - 1) * 0.06, font: MONO, weight: 700 }) }
      label(x, 800, 1080, 'DONE: 0', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made the group chat. | Named it *“family.”*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      label(x, 800, 640, '♡ family ♡', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 40, bg: PINK, rot: -0.04 })
      const M = ['ate today?', 'proud of us', 'hug emoji x9']
      M.forEach((m, i) => bubble(x, 800, 790 + i * 120, m, pop01(t, P.t0 + 0.8 + i * 0.35, 0.25, 2.2), { size: 34, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: 'leo', cap: 'Did one slide. | Presented *all of them.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'
      x.beginPath(); x.moveTo(340, 490); x.lineTo(420, 490); x.lineTo(580, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(Math.max(0, lt - 0.5) / 0.25) + 1)
      for (let i = 0; i < n; i++) slide(x, 800 + (i % 2) * 20 - 10, 680 + i * 70, 0.55, { title: `SLIDE ${i + 1}`, bars: false, rot: (i % 2 ? 0.05 : -0.05) })
      label(x, 800, 1130, 'MY PART: SLIDE 3', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 28, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Redid everyone’s part. | *Quietly.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), redo = lt > 0.9 + i * 0.3
        slide(x, 800, 680 + i * 160, 0.6 * k, { title: redo ? `PART ${i + 1} ✓` : `part ${i + 1}?`, bars: true, rot: redo ? 0 : (i - 1) * 0.12 })
      }
      bubble(x, 380, 600, 'shh.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Gorgeous slides. | *No content.*', mood: lt => lt > 1.3 ? 'heart' : 'sparkle', star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slide(x, 800, 820, pop01(t, P.t0 + 0.2, 0.35, 2), { title: '✦ vibes ✦', pretty: true, w: 340, h: 260 })
      label(x, 800, 1060, 'WORDS: 2', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 800, 820, P.t0 + 0.8, 7, 200, 0.6)
    } },
  { sign: 'scorpio', cap: 'Knows who did nothing. | *Has receipts.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, RECEIPT, RECEIPT_C, 690 + i * 110, 860 + (i % 2) * 40, 14 * pop01(t, P.t0 + 0.3 + i * 0.25, 0.3, 2), { rot: (i - 1) * 0.15 })
      label(x, 800, 650, 'EVIDENCE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: '#ff4f86', color: '#fff4e2', rot: -0.04 })
      bubble(x, 800, 1100, 'interesting.', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Joined the call | from *another time zone.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.3],
    front(x, t, lt, P) {
      drawBits(x, CLOCK, { W: '#fff4e2', K: INK }, 330, 800, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 330, 1000, 'HERE: 3 A.M.', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 620, 'can you | hear me?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Made a nine-phase plan. | For *one poster.*', mood: lt => lt < 1.2 ? 'neutral' : 'happy', look: [1, 0], star: { x: -200, s: 260 },
    front(x, t, lt, P) {
      plan(x, 760, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 760, 1110, 'PHASE 1 OF 9', pop01(t, P.t0 + 1.8, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Rewrote the brief. | *The night before.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      slide(x, 800, 820, k, { title: lt > 1.0 ? 'NEW BRIEF: ✦' : 'THE BRIEF', bars: true, w: 300, h: 260 })
      if (lt > 0.8) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(680, 760); x.lineTo(920, 900); x.stroke(); x.restore() }
      label(x, 800, 620, '11:58 P.M.', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1080, 'TRUST THE VISION', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'pisces', cap: 'The project’s done. | Pisces *misses the group.*', mood: lt => lt < 0.9 ? 'happy' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 800, 660, 'SUBMITTED ✓', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 800, 860, 'reunion | next week?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      hearts(x, t, 560, 900, P.t0 + 1.2, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'v3t007', key: 'D', accent: GOLD,
  title: 'The signs on a | *group project.*',
  cameos: CAMEOS,
  ending: 'lesson',
  group: { cap: 'Grade: *A.* | Somehow.' },
  lesson: { text: 'Share the work. | *Share the credit.*', chip: 'GRADE: A' },
  last: {
    text: 'Aries and Virgo | did it *twice.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
