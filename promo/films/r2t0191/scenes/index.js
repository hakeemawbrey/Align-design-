// r2t0191: star_talk, SOLO film, "How to spot | a Capricorn." (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole way through (makeFilm solo mode, 9 cards): the most extreme, lovable Capricorn in nine places.
//   0.0–3.6    "How to spot | *a Capricorn.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              weekend planned by the minute · briefcase at the beach · beat the sunrise to the office
//              · brought a résumé to a first date · "relaxing" on holiday, inbox counter climbing · your birthday got a
//              quarterly review · read their birth chart, made edits · piggy bank labelled RETIREMENT · a tie at the gym
//  37.8        "Grind mode. | Since *birth.*"  Capricorn comes back, big.
//  41.0        LESSON UNLOCKED: "They work so hard | so *you* can rest."  STATUS: APPRECIATED
//  46.9        "The piggy bank? | *Still saving.*"  The piggy bank comes back and takes one more coin.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const TEAL = '#2fc79a', RED = '#e23d4e', CREAM = '#fff4e2', BROWN = '#8a4a2e', ORANGE = '#ffb34a'
const S = 'capricorn'

// ── props
const BRIEFCASE = [
  '....KKKKKK....',
  '....K....K....',
  'BBBBBBBBBBBBBB',
  'BbbbbbbbbbbbbB',
  'BbbbbbbbbbbbbB',
  'BBBBBBYYBBBBBB',
  'BbbbbbYYbbbbbB',
  'BbbbbbbbbbbbbB',
  'BbbbbbbbbbbbbB',
  'BBBBBBBBBBBBBB',
]
const BRIEFCASE_C = { K: '#3a2a1a', B: BROWN, b: '#a65d38', Y: GOLD }
const UMBRELLA = [
  '.....RRRRRR.....',
  '...RRWWRRWWRR...',
  '.RRWWWRRRWWWRRR.',
  'RRWWWRRRRRWWWRRR',
  '.......K........',
  '.......K........',
  '.......K........',
  '.......K........',
  '.......K........',
  '.......K........',
  '......KK........',
]
const UMBRELLA_C = { R: '#ff6b7a', W: CREAM, K: '#3a2a1a' }
const SUN = ['...YYYY...', '.YYYYYYYY.', 'YYYYYYYYYY', 'YYYYYYYYYY']
const PIGGY = [
  '......KK.......',
  '..PPPPPPPPP....',
  '.PPPPPPPPPPP.P.',
  'PPPPPPPPPPPPPPP',
  'PPKPPPPPPPPPPPS',
  'PPPPPPPPPPPPPSS',
  'PPPPPPPPPPPPPP.',
  '.PPPPPPPPPPPP..',
  '..PP.....PP....',
  '..PP.....PP....',
]
const PIGGY_C = { P: '#ff9ccf', K: INK, S: '#ff6fae' }
const COIN = ['.YYYY.', 'YYwYYY', 'YwYYYY', 'YYYYYY', 'YYYYYY', '.YYYY.']
const COIN_C = { Y: GOLD, w: '#fff1b0' }
const TIE = ['.RRR.', '..R..', '.RRR.', '.RRR.', 'RRRRR', 'RRRRR', '.RRR.', '..R..']
const TIE_C = { R: RED }
const DUMBBELL = [
  'KK..........KK',
  'KKK........KKK',
  'KKKGGGGGGGGKKK',
  'KKK........KKK',
  'KK..........KK',
]
const DUMBBELL_C = { K: '#5a5a78', G: '#c9c9d8' }

// a sheet of paper with a coloured header and lines of text
function sheet(x, cx, cy, k, { w = 300, h = 400, rot = 0.05, head = '', headCol = TEAL, lines = [], size = 26 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = headCol; x.fillRect(-w / 2, -h / 2, w, 60)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31)
  x.textAlign = 'left'
  lines.forEach(([txt, a, col], i) => {
    if (a <= 0.01) return
    x.globalAlpha = clamp(a); x.fillStyle = col || INK; x.font = `700 ${size}px ${MONO}`
    x.fillText(txt, -w / 2 + 22, -h / 2 + 100 + i * (size * 1.7))
    x.globalAlpha = 1
  })
  x.restore()
}
// a little laptop with an inbox counter
function laptop(x, cx, cy, k, n) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -126, 312, 212); x.fillStyle = '#2a2350'; x.fillRect(-148, -118, 296, 196)
  x.fillStyle = '#140c30'; x.fillRect(-134, -104, 268, 168)
  x.fillStyle = INK; x.fillRect(-190, 86, 380, 34); x.fillStyle = '#c9c9d8'; x.fillRect(-182, 90, 364, 22)
  x.fillStyle = SKYB; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INBOX', 0, -66)
  x.fillStyle = BONE; x.font = `800 72px ${INTER}`; x.fillText(String(n), 0, 6)
  x.fillStyle = MINT; x.font = `700 22px ${MONO}`; x.fillText('ANSWERED', 0, 52)
  x.restore()
}
// a quarterly review chart: four bars climbing, an arrow up
function review(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-152, -172, 320, 352)
  x.fillStyle = INK; x.fillRect(-166, -186, 332, 360); x.fillStyle = CREAM; x.fillRect(-158, -178, 316, 344)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR YEAR: Q4', 0, -140)
  x.fillStyle = INK; x.fillRect(-126, 120, 252, 6); x.fillRect(-126, -100, 6, 226)
  const COLS = [SKYB, LAV, ORANGE, TEAL]
  for (let i = 0; i < 4; i++) {
    const g = ease.outCubic(clamp((lt - 0.4 - i * 0.18) / 0.4))
    const h = (50 + i * 50) * g
    x.fillStyle = INK; x.fillRect(-100 + i * 58 - 3, 120 - h - 3, 42, h + 3); x.fillStyle = COLS[i]; x.fillRect(-100 + i * 58, 120 - h, 36, h)
  }
  x.fillStyle = '#6b62a8'; x.font = `700 20px ${MONO}`; x.fillText('FUN  NAPS  CAKE  GROWTH', 0, 148)
  x.restore()
}
// a birth chart wheel, with a red pen circling and crossing things out
function chartWheel(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 162, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#6b62a8'; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 112, Math.sin(a) * 112); x.lineTo(Math.cos(a) * 162, Math.sin(a) * 162); x.stroke() }
  x.strokeStyle = LAV; x.lineWidth = 3
  for (let i = 0; i < 5; i++) { const a = i * 1.3, b = a + 2.1; x.beginPath(); x.moveTo(Math.cos(a) * 100, Math.sin(a) * 100); x.lineTo(Math.cos(b) * 100, Math.sin(b) * 100); x.stroke() }
  // red pen edits
  x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'round'
  const e1 = clamp((lt - 0.6) / 0.4), e2 = clamp((lt - 1.1) / 0.3), e3 = clamp((lt - 1.4) / 0.3)
  if (e1 > 0) { x.beginPath(); x.arc(-60, -70, 46, -Math.PI / 2, -Math.PI / 2 + e1 * Math.PI * 2); x.stroke() }
  if (e2 > 0) { x.beginPath(); x.moveTo(30, 40); x.lineTo(30 + 90 * e2, 40 + 60 * e2); x.stroke() }
  if (e3 > 0) { x.beginPath(); x.moveTo(120, 40); x.lineTo(120 - 90 * e3, 40 + 60 * e3); x.stroke() }
  x.restore()
}
// a dark office window with the sun only just peeking up
function sunrise(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -190, 340, 330)
  x.fillStyle = '#1d2050'; x.fillRect(-160, -180, 320, 310)
  x.save(); x.beginPath(); x.rect(-160, -180, 320, 310); x.clip()
  const up = ease.outCubic(clamp((lt - 0.3) / 1.6))
  drawBits(x, SUN, { Y: '#ffb34a' }, 0, 150 - up * 26, 22)
  x.fillStyle = '#2a2350'; x.fillRect(-160, 110, 320, 30)
  x.restore()
  x.fillStyle = INK; x.fillRect(-6, -180, 12, 310); x.fillRect(-160, -30, 320, 12)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Planned the weekend. | *By the minute.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      const L = ['07:00 wake', '07:04 hydrate', '07:06 goals', '07:09 relax', '07:10 stop'], k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 780, 850, k, { head: 'SATURDAY', size: 30, w: 330, lines: L.map((s, i) => [s, clamp((lt - 0.4 - i * 0.22) / 0.2), i === 4 ? RED : INK]) })
      label(x, 780, 1110, 'VOL. 3 OF 12', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Beach day. | Brought a *briefcase.*', mood: 'happy', star: { x: -150 }, hops: [1.3],
    back(x, t, lt, P) {
      drawBits(x, UMBRELLA, UMBRELLA_C, 330, 760, 17 * pop01(t, P.t0 + 0.15, 0.3, 2), { rot: -0.1 })
      x.fillStyle = 'rgba(255,214,140,0.28)'; x.fillRect(110, 1080, 860, 140)
    },
    front(x, t, lt, P, F) {
      drawBits(x, BRIEFCASE, BRIEFCASE_C, F.x + 220, F.cy + 90, 15 * pop01(t, P.t0 + 0.35, 0.3, 2), { rot: 0.05 * Math.sin(t * 3) })
      bubble(x, 790, 620, 'quick call', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 46, tail: 'bl' })
    } },
  { sign: S, cap: 'Beat the sunrise | *to the office.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', star: { x: -190, y: 30 }, hops: [1.5],
    front(x, t, lt, P) {
      sunrise(x, 780, 820, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 780, 1080, '4:58 AM', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 400, 610, 'late, sun.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, tail: 'bc' })
    } },
  { sign: S, cap: 'First date. | Brought a *résumé.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const L = ['goals: yes', 'plan: 10 yr', 'refs: mom', 'sign: ♑︎']
      sheet(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'RÉSUMÉ', headCol: GOLD, size: 32, w: 320, lines: L.map((s, i) => [s, clamp((lt - 0.5 - i * 0.2) / 0.2)]) })
      label(x, 780, 1100, 'MATCH: IN REVIEW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'On holiday. | Still *answering emails.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      laptop(x, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), 1 + Math.floor(clamp((lt - 0.4) / 1.8) * 46))
      label(x, 780, 620, 'OUT OF OFFICE?', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 780, 1110, 'this IS relaxing', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 32, tail: 'bc' })
    } },
  { sign: S, cap: 'Your birthday? | Got a *yearly review.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.6],
    front(x, t, lt, P) {
      review(x, 780, 840, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1100, 'EXCEEDS GOALS', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 780, 840, P.t0 + 1.55, 7, 190, 0.4)
    } },
  { sign: S, cap: 'Read their birth chart. | Made *edits.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chartWheel(x, t, 780, 840, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1080, 'NEEDS STRUCTURE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Age seven. | Saving for *retirement.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -190, s: 260, y: 30 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, PIGGY, PIGGY_C, 790, 900, 22 * k)
      label(x, 790, 1060, 'RETIREMENT', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      for (let i = 0; i < 3; i++) {
        const d = prog(lt, 0.9 + i * 0.35, 1.25 + i * 0.35)
        if (d > 0 && d < 1) drawBits(x, COIN, COIN_C, 780, lerp(560, 780, ease.inQuad(d)), 9)
      }
      sparkles(x, t, 790, 800, P.t0 + 1.8, 6, 130, 0.2)
    } },
  { sign: S, cap: 'Gym day. | Wore a *tie.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', star: { x: -120 }, hops: [0.9, 1.7],
    front(x, t, lt, P, F) {
      drawBits(x, TIE, TIE_C, F.x, F.cy + 120, 12 * pop01(t, P.t0 + 0.3, 0.3, 2.2), { rot: 0.08 * Math.sin(t * 5) })
      drawBits(x, DUMBBELL, DUMBBELL_C, F.x + 230, F.cy + 20 - 30 * Math.abs(Math.sin(t * 3)), 16 * pop01(t, P.t0 + 0.5, 0.3, 2))
      bubble(x, 790, 620, 'leg day. tie day.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0191', key: 'C', accent: TEAL, solo: S, ending: 'lesson',
  title: 'How to spot | *a Capricorn.*',
  cameos: CAMEOS,
  group: { cap: 'Grind mode. | Since *birth.*', mood: 'sparkle' },
  lesson: { text: 'They work so hard | so *you* can rest.', chip: 'STATUS: APPRECIATED' },
  last: {
    text: 'The piggy bank? | *Still saving.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      drawBits(x, PIGGY, PIGGY_C, 830, 1150, 18 * k)
      const d = prog(lt, 1.2, 1.6)
      if (d > 0 && d < 1) drawBits(x, COIN, COIN_C, 810, lerp(900, 1080, ease.inQuad(d)), 7)
      sparkles(x, t, 820, 1100, t - lt + 1.6, 6, 110, 0.5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
