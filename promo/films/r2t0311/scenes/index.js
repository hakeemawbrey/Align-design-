// r2t0311: THE SIGNS AS… v3, BELIKE, "Zodiacs after exams | be like." (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme version of itself the minute the exam ends. Ending: group.
//   0.0–3.6    "Zodiacs after exams | *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ finished first, never saw the back page · ♉ three desserts, as a reward · ♊ "nailed it" / "i failed"
//              · ♋ care packages for the whole class · ♌ handed it in, took a bow · ♍ scored 99, filed an appeal
//              · ♎ exam's over, still on question one · ♏ "it went fine." (top of the class) · ♐ boarding pass, mid-exam
//              · ♑ already studying for next year's · ♒ showed their work, invented new math · ♓ sobbed, got an A
//  49.2        "Results come out | *next week.*"  The twelve fly up into a group photo, every face goes wide. (ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', PAPER = '#fff4e2', ORANGE = '#ffb34a'

// ── props
const CAKE = [
  '....R....',
  '...PPP...',
  '.PPPPPPP.',
  'WWWWWWWWW',
  'BBBBBBBBB',
  'WWWWWWWWW',
  'BBBBBBBBB',
]
const CAKE_C = { R: RED, P: PINK, W: PAPER, B: '#8a4a2e' }
const BASKET = [
  '...KKKKKKK...',
  '..K.......K..',
  '.K.........K.',
  'RRGGGYYYPPPRR',
  'BBBBBBBBBBBBB',
  'BWBWBWBWBWBWB',
  'BBBBBBBBBBBBB',
  '.BWBWBWBWBWB.',
  '..BBBBBBBBB..',
]
const BASKET_C = { K: '#7a5230', R: RED, G: '#5fd068', Y: GOLD, P: PINK, B: '#c98f5a', W: '#e8b77e' }
const BOOK = [
  'KKKKKKKKKKKK',
  'KRRRRRRRRRRK',
  'KRWWWWWWWWRK',
  'KRRRRRRRRRRK',
  'KRRRRRRRRRRK',
  'KKKKKKKKKKKK',
]
const BOOK_C = { K: INK, R: '#6fc3ff', W: PAPER }

/** an exam paper: lines of "writing", an optional big grade mark */
function paper(x, cx, cy, k, { rot = 0.04, grade = null, gradeCol = RED, lines = 6, w = 240, h = 310, head = 'EXAM' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = PAPER; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(head, -w / 2 + 20, -h / 2 + 30)
  x.fillStyle = '#b9b0a0'
  for (let i = 0; i < lines; i++) x.fillRect(-w / 2 + 20, -h / 2 + 70 + i * 34, (w - 40) * (i % 3 === 2 ? 0.6 : 0.9), 8)
  if (grade) {
    x.fillStyle = gradeCol; x.font = `800 ${grade.length > 2 ? 70 : 96}px ${INTER}`; x.textAlign = 'center'
    x.fillText(grade, w / 2 - 70, h / 2 - 60)
    x.strokeStyle = gradeCol; x.lineWidth = 6; x.beginPath(); x.ellipse(w / 2 - 70, h / 2 - 60, grade.length > 2 ? 78 : 64, 54, -0.1, 0, Math.PI * 2); x.stroke()
  }
  x.restore()
}
// a boarding pass, torn stub and all
function boardingPass(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-162, -82, 336, 176)
  x.fillStyle = INK; x.fillRect(-176, -96, 352, 192)
  x.fillStyle = SKYB; x.fillRect(-168, -88, 336, 176)
  x.fillStyle = '#4a9bd6'; x.fillRect(-168, -88, 336, 44)
  x.fillStyle = '#fff'; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOARDING PASS', -10, -66)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('EXAM → ANYWHERE', 0, -4)
  x.font = `700 20px ${MONO}`; x.fillText('GATE: NOW · SEAT: 1A', 0, 50)
  x.restore()
}
// a chalkboard of increasingly invented maths
function chalk(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-172, -132, 360, 280)
  x.fillStyle = '#7a5230'; x.fillRect(-186, -146, 372, 292)
  x.fillStyle = '#1f4a3a'; x.fillRect(-170, -130, 340, 260)
  const EQ = ['2 + 2 = ✦', '✦ × ☾ = 7.5?', '∑ vibes = yes', '∴ x = “x”']
  const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.35) + 1)
  x.fillStyle = '#e8f4ea'; x.font = `700 32px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  for (let i = 0; i < n; i++) x.fillText(EQ[i], -150, -86 + i * 58)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished first. | Missed *the back page.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.5],
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 1.2, 1.6))
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: flip > 0.5 ? 'PAGE 2' : 'PAGE 1', sx: 1, lines: flip > 0.5 ? 7 : 6 })
      label(x, 790, 620, 'DONE IN 4 MIN', pop01(t, P.t0 + 0.45, 0.3, 2), { size: 32, bg: RED, color: '#fff4e2', rot: -0.05 })
      label(x, 790, 1080, 'PAGE 2: BLANK', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'taurus', cap: 'Survived the exam. | Earned *three desserts.*', mood: lt => lt > 1.7 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.8],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CAKE, CAKE_C, 700 + i * 110, 930 - (i % 2) * 40, 18 * pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2), { rot: (i - 1) * 0.05 })
      label(x, 810, 690, 'REWARD: 1 → 3', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: PINK, rot: -0.04 })
      bubble(x, 800, 1100, 'i studied!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'It went great. | It went *awful.* Both.', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wide' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? -1 : 1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const ph = Math.floor(lt * 2.4) % 2
      bubble(x, 780, 700, ph ? 'i failed.' : 'nailed it!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: ph ? LAV : MINT, tail: 'bl' })
      label(x, 790, 960, 'MOOD: YES', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made care packages | for *the whole class.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BASKET, BASKET_C, 690 + i * 105, 1000 - i * 90, 13 * pop01(t, P.t0 + 0.25 + i * 0.3, 0.3, 2))
      label(x, 790, 640, 'PACKAGES: 31', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      hearts(x, t, 790, 900, P.t0 + 1.4, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Handed it in. | Took *a bow.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.1],
    squash: lt => lt > 1.0 && lt < 1.6 ? 0.18 * Math.sin(Math.PI * prog(lt, 1.0, 1.6)) : 0,
    front(x, t, lt, P) {
      paper(x, 820, 960, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08, w: 200, h: 250, lines: 4 })
      label(x, 790, 640, 'STANDING OVATION', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
      sparkles(x, t, 400, 820, P.t0 + 1.2, 8, 200, 0.4)
      bubble(x, 800, 790, 'thank you!', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Scored 99. | Filed *an appeal.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      paper(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), { grade: '99', rot: 0.04 })
      label(x, 790, 1100, 'APPEAL: PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 760, 620, 'where’s my point?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'libra', cap: 'Exam’s over. | Still on *question one.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 790, 640, 'Q1: A or B?', k, { size: 44, bg: PINK, rot: -0.04 })
      const pick = Math.floor(lt * 2.6) % 2
      label(x, 710, 830, 'A', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 64, bg: pick ? BONE : GOLD, rot: -0.06 })
      label(x, 870, 830, 'B', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 64, bg: pick ? GOLD : BONE, rot: 0.06 })
      label(x, 790, 1060, 'TIME: UP. 2 HRS AGO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: RED, color: '#fff4e2', rot: 0.03 })
    } },
  { sign: 'scorpio', cap: '“It went fine.” | *Top of the class.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'it went fine.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      const r = ease.outCubic(prog(lt, 1.2, 1.6))
      paper(x, 790, 920, pop01(t, P.t0 + 1.1, 0.3, 2), { grade: r > 0.5 ? 'A+' : null, gradeCol: '#2fc79a', w: 220, h: 280, lines: 5, rot: -0.05 })
      sparkles(x, t, 850, 980, P.t0 + 1.55, 6, 130, 0.2)
    } },
  { sign: 'sagittarius', cap: 'Last question. | Already *at the airport.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      boardingPass(x, 770, 820, pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 1040, 'pens down? bye!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Exam’s done. | Studying for *next year’s.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 1], star: { x: -170 },
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOOK, BOOK_C, 790 + (i % 2 ? 12 : -12), 1040 - i * 72, 18 * pop01(t, P.t0 + 0.2 + i * 0.18, 0.25, 2), { rot: (i % 2 ? 0.04 : -0.04) })
      label(x, 790, 650, 'NEXT YEAR’S EXAM', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04 })
      label(x, 790, 740, 'PREP: DAY 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Showed their work. | Invented *new math.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      chalk(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'PEER REVIEW: ???', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Sobbed the whole time. | Got *an A.*', mood: lt => lt > 1.5 ? 'heart' : 'wide', tears: lt => lt > 1.5 ? 2 : 3, star: { x: -170 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const g = lt > 1.3
      paper(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { grade: g ? 'A' : null, gradeCol: '#2fc79a', rot: 0.05 })
      label(x, 790, 1090, g ? 'HAPPY TEARS NOW' : 'SAD TEARS', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: g ? GOLD : LAV, rot: -0.04 })
      if (g) sparkles(x, t, 850, 900, P.t0 + 1.35, 7, 170, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2t0311', key: 'C', accent: GOLD, ending: 'group',
  title: 'Zodiacs after exams | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Results come out | *next week.*',
    moods: Array(12).fill('wide'),
    draw(x, t, lt) {
      label(x, 540, 700, 'RESULTS: NEXT WEEK', pop01(t, t - lt + 1.6, 0.35, 2.2), { size: 44, bg: RED, color: '#fff4e2', rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
