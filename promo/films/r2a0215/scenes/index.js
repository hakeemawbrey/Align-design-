// r2a0215: star_advice, ADVICE ROLLCALL, "How each sign | builds confidence." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "How each sign | *builds confidence.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ by going first (messaged the match first) · ♉ one steady brick at a time · ♊ by learning something new
//              · ♋ by keeping their people close · ♌ by celebrating small wins (a trophy for making the bed)
//              · ♍ practice, then more practice · ♎ by saying what they want · ♏ by trusting their gut (a compass)
//              · ♐ by saying yes to new things · ♑ by keeping promises to themself (a streak) · ♒ by being proudly weird
//              · ♓ by being gentle with themself
//  49.2        "Confidence | is *a practice.*"  The twelve fly up into a group photo.
//  52.6        callback: "Leo’s next trophy? | *Drank some water.*"  The trophy comes back with a new plaque.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', GREEN = '#5fd068', CORAL = '#ff8a5c'

// ── props
const TROPHY = [
  'YYYYYYYYYYY',
  'Y.YYYYYYY.Y',
  'Y.YYWYYYY.Y',
  '.YYYWYYYYY.',
  '..YYYYYYY..',
  '....YYY....',
  '.....Y.....',
  '....YYY....',
  '..KKKKKKK..',
  '..KKKKKKK..',
]
const BRICK = ['RRRRRR', 'RrRRRR', 'RRRRRR']
const COMPASS_R = 120

function trophy(x, cx, cy, k, plaque) {
  if (k <= 0.01) return
  drawBits(x, TROPHY, { Y: GOLD, W: '#fff1b0', K: '#5b3a1e' }, cx, cy, 18 * k)
  if (plaque) label(x, cx, cy + 120 * k, plaque, k, { size: 26, bg: BONE, rot: 0, font: MONO, weight: 700 })
}
function notif(x, cx, cy, k, title, body) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -50, 312, 112)
  x.fillStyle = INK; x.fillRect(-160, -62, 320, 116); x.fillStyle = '#2a2350'; x.fillRect(-152, -54, 304, 100)
  x.fillStyle = MINT; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(title, -134, -24)
  x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.fillText(body, -134, 16)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Aries builds it | *by going first.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      notif(x, 770, 740, 1.3 * pop01(t, P.t0 + 0.3, 0.3, 2), '✦ SENT', 'you messaged first')
      bubble(x, 790, 960, 'hi! :)', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 790, 1120, 'BRAVE: UNLOCKED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus builds it | *brick by brick.*', mood: lt => lt > 1.6 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.5) * 10)
      for (let i = 0; i < n; i++) { const row = Math.floor(i / 3), col = i % 3; drawBits(x, BRICK, { R: CORAL, r: '#d9663a' }, 690 + col * 100 + (row % 2) * 30, 1070 - row * 64, 15) }
      label(x, 800, 650, 'SLOW. SOLID. YOU.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: '#9fe0a8', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Gemini learns | *something new.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, -0.5], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const F = ['did you know…', 'otters hold hands!', 'NOW I KNOW!']
      F.forEach((f, i) => label(x, 790, 680 + i * 150, f, pop01(t, P.t0 + 0.3 + i * 0.5, 0.3, 2.2), { size: 32, bg: [BONE, MINT, GOLD][i], rot: (i % 2 ? 0.04 : -0.04) }))
      sparkles(x, t, 790, 980, P.t0 + 1.4, 6, 150, 0.2)
    } },
  { sign: 'cancer', cap: 'Cancer keeps | *their people close.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      ;['taurus', 'virgo', 'capricorn'].forEach((id, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.2, 0.3, 2)
        if (k > 0.01) signChar(x, t, id, 660 + i * 120, 960 - (i % 2) * 40, 140 * k, { mood: 'happy', look: [-1, 0], seed: 30 + i, glyph: false, hops: [P.t0 + 1.2 + i * 0.1] })
      })
      bubble(x, 780, 680, 'we got you!', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'bl' })
      hearts(x, t, 780, 900, P.t0 + 1.4, { n: 5, life: 1.4, spread: 260, cell: 6, seed: 3 })
    } },
  { sign: 'leo', cap: 'Leo celebrates | *every small win.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      trophy(x, 790, 820, pop01(t, P.t0 + 0.3, 0.35, 2), 'MADE MY BED')
      sparkles(x, t, 790, 800, P.t0 + 0.7, 8, 200, 0.5)
      bubble(x, 790, 1110, 'speech! speech!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Virgo builds it | *through practice.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-152, -142, 304, 284)
        x.strokeStyle = '#b9b0a0'; x.lineWidth = 3; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(-130, -100 + i * 60); x.lineTo(130, -100 + i * 60); x.stroke() }
        const p = clamp((lt - 0.3) / 1.4)
        x.strokeStyle = GREEN; x.lineWidth = 10; x.beginPath()
        const PTS = [[-130, 110], [-80, 80], [-40, 90], [0, 30], [40, 40], [80, -30], [130, -100]]
        PTS.forEach(([px, py], i) => { if (i / (PTS.length - 1) <= p + 0.001) i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke()
        x.restore()
      }
      label(x, 790, 1100, 'GETTING THERE ✓', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: '#9fe0a8', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra says | *what they want.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'um, whatever | you like…', pop01(t, P.t0 + 0.3, 0.25, 2.2) * (1 - prog(lt, 1.0, 1.15)), { size: 34, col: LAV, tail: 'bl' })
      bubble(x, 790, 720, 'I’d love | the window seat.', pop01(t, P.t0 + 1.0 * 1.29 + 0.1, 0.25, 2.2), { size: 36, col: PINK, tail: 'bl' })
      label(x, 790, 1000, 'SAID IT!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Scorpio trusts | *their gut.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, COMPASS_R + 12, 0, Math.PI * 2); x.fill()
        x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, COMPASS_R + 4, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, COMPASS_R - 6, 0, Math.PI * 2); x.fill()
        const ang = lt < 1.2 ? Math.sin(lt * 14) * 1.6 : Math.sin(1.2 * 14) * 1.6 * Math.exp(-(lt - 1.2) * 6)
        x.rotate(ang); x.fillStyle = RED; x.beginPath(); x.moveTo(0, -96); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
        x.fillStyle = '#8a8aa0'; x.beginPath(); x.moveTo(0, 96); x.lineTo(16, 0); x.lineTo(-16, 0); x.fill()
        x.restore()
      }
      label(x, 790, 1100, 'GUT: RIGHT AGAIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius says | *yes to new things.*', mood: lt => lt > 1 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.1, 1.7],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 850); x.rotate(-0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -80, 320, 160); x.fillStyle = '#c9a6ff'; x.fillRect(-152, -72, 304, 144)
        x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ADMIT ONE', 0, -36); x.font = `800 32px ${INTER}`; x.fillText('salsa class', 0, 14)
        x.restore()
      }
      label(x, 800, 880, 'YES!', pop01(t, P.t0 + 1.0, 0.25, 2.8), { size: 64, bg: GREEN, rot: -0.2, font: MONO, weight: 700 })
      label(x, 790, 1110, 'NEW THING: TRIED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn keeps | *promises to themself.*', mood: lt => lt > 1.6 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-152, -142, 304, 284)
        const n = Math.floor(clamp((lt - 0.2) / 1.4) * 20)
        for (let i = 0; i < 20; i++) {
          const px = -120 + (i % 5) * 60, py = -100 + Math.floor(i / 5) * 62
          x.fillStyle = '#d8d0c0'; x.fillRect(px - 24, py - 24, 48, 48)
          if (i < n) { x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.moveTo(px - 16, py - 16); x.lineTo(px + 16, py + 16); x.moveTo(px + 16, py - 16); x.lineTo(px - 16, py + 16); x.stroke() }
        }
        x.restore()
      }
      label(x, 790, 1100, `STREAK: ${Math.round(clamp((lt - 0.2) / 1.4) * 20)} DAYS`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: '#9fb7c9', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius stays | *proudly weird.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 840); x.rotate(0.06 * Math.sin(t * 3)); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#6fe3ff'; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CERTIFIED', 0, -20); x.fillText('ODD ✦', 0, 26)
        x.restore()
      }
      label(x, 790, 1100, 'WEARING IT PROUDLY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces is gentle | *with themself.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', tears: lt => lt > 1.2 ? 1 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'you’re doing | your best.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
      label(x, 790, 1000, 'KIND WORDS ONLY', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 980, P.t0 + 1.3, { n: 5, life: 1.3, spread: 120, cell: 6, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0215', key: 'G', accent: CORAL, ending: 'callback',
  title: 'How each sign | *builds confidence.*',
  cameos: CAMEOS,
  group: { cap: 'Confidence | is *a practice.*' },
  last: {
    text: 'Leo’s next trophy? | *Drank some water.*',
    draw(x, t, lt) {
      const t0 = t - lt
      trophy(x, 540, 1040, 1.7 * pop01(t, t0 + 0.6, 0.35, 2), 'DRANK WATER')
      sparkles(x, t, 540, 1040, t0 + 1.0, 8, 240, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
