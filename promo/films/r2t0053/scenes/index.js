// r2t0053: star_talk, ROLLCALL, "The signs at a | retirement party." (~59 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order at Dave’s retirement party, each the most extreme version of itself.
//   0.0–3.6    "The signs at a | *retirement party.*"  the twelve line up.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries asked for the job during the toast · Taurus came for the sheet cake · Gemini signed the card, wrote a
//              novel · Cancer made a slideshow of forty years · Leo gave the toast, about themself · Virgo fixed the banner
//              · Libra matched the balloons to the cake · Scorpio read Dave’s birth chart, called it in March
//              · Sagittarius brought forty travel brochures · Capricorn talked pensions · Aquarius built a robot to do
//              the old job · Pisces read the card, sobbed, never met him
//  49.2        group: "Happy retirement, | *Dave.*"
//  52.4        LESSON: "Celebrate your people | *out loud.*"  STATUS: CHEERED
//  58.3        "Still crying? | *Pisces.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { signStar } from '../../startalk.js'

const TEAL = '#4fd1c5', CREAM = '#fff4e2', RED = '#e23d4e', GREEN = '#5fd068'

// ── props
const CAKE = [
  '....F.F.F....',
  '....R.R.R....',
  'PPPPPPPPPPPPP',
  'WWWWWWWWWWWWW',
  'SSSSSSSSSSSSS',
  'SSSSSSSSSSSSS',
  'WWWWWWWWWWWWW',
  'SSSSSSSSSSSSS',
  'SSSSSSSSSSSSS',
]
const CAKE_C = { F: GOLD, R: '#ff6f6f', P: PINK, W: CREAM, S: '#e0a45a' }
const ROBOT = [
  '....AA....',
  '....AA....',
  '.MMMMMMMM.',
  '.MCMMMMCM.',
  '.MMMMMMMM.',
  '.MMRRRRMM.',
  '..MMMMMM..',
  'MMMMMMMMMM',
  'M.MMMMMM.M',
  'M.MMTTMM.M',
  '..MMMMMM..',
  '..MM..MM..',
]
const ROBOT_C = { A: '#ff6f6f', M: '#c9c9d8', C: SKYB, R: INK, T: GOLD }
const BALLOON = ['.BBB.', 'BBBBB', 'BWBBB', 'BBBBB', '.BBB.', '..B..']

function card(x, cx, cy, w, h, k, { rot = 0, bg = CREAM, edge = INK } = {}) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
const txt = (x, s, X, Y, font, col = INK, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// Gemini’s card message: lines of scribble that fill the card, then a "turn over" arrow
function bigCard(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 300, 380, k, { rot: 0.05 })) return
  txt(x, 'Dear Dave,', 0, -150, `800 30px ${INTER}`)
  const n = Math.floor(clamp((lt - 0.3) / 1.3) * 12)
  for (let i = 0; i < n; i++) { x.fillStyle = ['#6b62a8', INK][i % 2]; x.fillRect(-124, -108 + i * 22, 248 - (i % 3) * 30, 8) }
  x.restore()
}
// Cancer’s slideshow: a projector screen flipping through photo frames
function slideshow(x, t, cx, cy, k, lt) {
  if (!card(x, cx, cy, 340, 260, k, { rot: 0, bg: '#e8ecff' })) return
  const i = Math.floor(Math.max(0, lt - 0.3) / 0.18)
  x.fillStyle = ['#ffd0a8', LAV, MINT, PINK, SKYB][i % 5]; x.fillRect(-140, -110, 280, 180)
  signChar(x, t, 'taurus', -30 + (i % 3) * 30, -20, 110, { mood: i % 2 ? 'happy' : 'wink', seed: 60 + i, glyph: false, glow: 0.4 })
  txt(x, `SLIDE ${212 + i}`, 0, 100, `700 24px ${MONO}`)
  x.restore()
}
// Virgo’s banner: HAPPY RETIRMENT, then the missing E squeezed in
function banner(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -60, 400, 120); x.fillStyle = GOLD; x.fillRect(-194, -54, 388, 108)
  txt(x, 'HAPPY', 0, -24, `800 34px ${INTER}`)
  const fix = lt > 1.2
  txt(x, fix ? 'RETIREMENT' : 'RETIRMENT', 0, 22, `800 34px ${INTER}`)
  if (fix) { x.save(); x.globalAlpha = clamp((lt - 1.2) * 3); x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.arc(30, 22, 26, 0, Math.PI * 2); x.stroke(); x.restore() }
  x.restore()
}
// Scorpio’s birth chart: a wheel with one circled planet
function chartWheel(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(lt * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
  x.strokeStyle = LAV; x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 110, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 110, Math.sin(a) * 110); x.lineTo(Math.cos(a) * 150, Math.sin(a) * 150); x.stroke() }
  x.strokeStyle = 'rgba(201,166,255,0.5)'; x.beginPath(); x.moveTo(-70, -50); x.lineTo(60, 70); x.lineTo(80, -40); x.closePath(); x.stroke()
  x.fillStyle = GOLD; x.fillRect(52, -48, 18, 18)
  if (lt > 1.2) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(61, -39, 30, 0, Math.PI * 2); x.stroke() }
  x.restore()
}
// Sagittarius’ brochures, fanned out
function brochures(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const COLS = [SKYB, MINT, GOLD, PINK, LAV]
  const n = Math.min(5, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.2))
  for (let i = 0; i < n; i++) {
    x.save(); x.translate(cx, cy + 60); x.rotate((i - 2) * 0.22); x.scale(k, k); x.translate(0, -120)
    x.fillStyle = INK; x.fillRect(-66, -96, 132, 192); x.fillStyle = COLS[i]; x.fillRect(-60, -90, 120, 180)
    x.fillStyle = CREAM; x.fillRect(-46, -70, 92, 60)
    x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['GO!', 'SEE!', 'FLY!', 'HIKE!', 'SAIL!'][i], 0, 40)
    x.restore()
  }
}
// Capricorn’s pension graph
function graph(x, cx, cy, k, lt) {
  if (!card(x, cx, cy, 330, 280, k, { rot: -0.04 })) return
  x.fillStyle = INK; x.fillRect(-130, -110, 6, 210); x.fillRect(-130, 94, 270, 6)
  const p = ease.outCubic(prog(lt, 0.3, 1.4))
  x.strokeStyle = GREEN; x.lineWidth = 10; x.beginPath()
  const pts = [[-110, 70], [-60, 40], [-10, 50], [40, 0], [90, -30], [130, -90]]
  const m = Math.max(1, Math.ceil(p * (pts.length - 1)))
  pts.slice(0, m + 1).forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke()
  txt(x, 'PENSION PLAN', 10, -118, `700 22px ${MONO}`)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Asked for their job. | *During the toast.*', mood: 'sparkle', look: [1, 0], star: { x: -190 }, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'is the desk | free yet??', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 760, 1060, 'RÉSUMÉ: ATTACHED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Came for one thing. | *The sheet cake.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 660, 'SLICE 3. CORNER.', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Signed the card. | *Wrote a novel.*', mood: lt => lt > 1.5 ? 'wink' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      bigCard(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1100, 'P.T.O. →', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Made a slideshow. | *All forty years.*', mood: 'heart', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      slideshow(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1060, 'INTERMISSION AT 300', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Gave the toast. | *About themself.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 30, 470); x.lineTo(F.x + 30, 470); x.lineTo(F.x + 200, 1100); x.lineTo(F.x - 200, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 760, 680, '…and that’s when | I got promoted', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 760, 1080, 'DAVE: ??', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Spotted the typo. | *Fixed the banner.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.25],
    front(x, t, lt, P) {
      banner(x, 780, 820, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 780, 1060, 'NOW WE CAN PARTY', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'The balloons? | *Match the cake.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      for (let i = 0; i < 7; i++) {
        const a = (i / 6) * Math.PI, k = pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2)
        drawBits(x, BALLOON, { B: [PINK, CREAM, '#e0a45a'][i % 3], W: '#ffffff' }, 780 - Math.cos(a) * 140, 920 - Math.sin(a) * 210 + Math.sin(t * 2 + i) * 6, 16 * k)
      }
      label(x, 790, 1080, 'PALETTE: APPROVED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Read Dave’s birth chart. | *Called it in March.*', mood: 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'I KNEW.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Brought Dave | *forty travel brochures.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      brochures(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 1110, 'so… where FIRST?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Talked pensions. | *At the party.*', mood: 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      graph(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 790, 1100, 'compound interest!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Built a robot | *to do Dave’s old job.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, ROBOT, ROBOT_C, 790, 880 + (lt > 1.3 ? -Math.abs(Math.sin(t * 8)) * 14 : 0), 22 * k)
      bubble(x, 790, 640, 'HELLO. I AM DAVE 2.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 30, col: SKYB, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Read the card. | Sobbed. *Never met him.*', mood: 'wide', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      if (card(x, 800, 860, 260, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })) {
        txt(x, 'Happy', 0, -50, `italic 800 38px ${INTER}`, RED); txt(x, 'retirement!', 0, -6, `italic 800 38px ${INTER}`, RED)
        txt(x, '– Accounts', 0, 60, `700 22px ${MONO}`, '#6b62a8')
        x.restore()
      }
      label(x, 800, 1080, 'WHO’S DAVE?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0053', key: 'G', accent: TEAL, ending: 'lesson',
  title: 'The signs at a | *retirement party.*',
  cameos: CAMEOS,
  group: { cap: 'Happy retirement, | *Dave.*', moods: ['sparkle', 'heart', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'squint', 'sparkle', 'neutral', 'happy', 'wide'] },
  lesson: { text: 'Celebrate your people | *out loud.*', chip: 'STATUS: CHEERED' },
  last: { text: 'Still crying? | *Pisces.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
