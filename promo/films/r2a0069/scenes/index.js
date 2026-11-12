// r2a0069: star_advice, ADVICE ROLL CALL, "How to disagree | with each sign." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific tip each with a light visual gag. Ending: callback.
//   0.0–3.6    "How to disagree | *with each sign.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one tip per sign (3.8 s each):
//              ♈ say it straight, it's over in a minute (a stopwatch) · ♉ bring snacks, then your point · ♊ debate it,
//              they might switch sides (SIDES SWITCHED: 3) · ♋ lead with "I love you, but…" · ♌ compliment first
//              (the crown) · ♍ bring a source, maybe two · ♎ give them a minute, they're weighing it (the scales)
//              · ♏ be honest, they'll know anyway · ♐ keep it light, laughing is allowed · ♑ make it a plan, not a
//              feeling (an agenda) · ♒ use logic, then let them think (processing…) · ♓ speak softly, hug after
//  49.2        "Disagree kindly. | *Stay close.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "The snack plate? | *Ended it.*"  Taurus and the plate, hearts.
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', PEACH = '#ffb08a'

// ── props
const PLATE = [
  '..CC.FF.GG..',
  '.CCCFFFFGGG.',
  'WWWWWWWWWWWW',
  '.WWWWWWWWWW.',
]
const PLATE_C = { W: CREAM, C: '#d9944a', F: '#ffd23a', G: '#5fd068' }
const CROWN = [
  'Y...Y...Y',
  'YY.YYY.YY',
  'YYYYYYYYY',
  'YRYYBYYRY',
  'YYYYYYYYY',
]
const CROWN_C = { Y: GOLD, R: RED, B: SKYB }
const HEARTNOTE = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']

function stopwatch(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-16, -150, 32, 36); x.beginPath(); x.arc(0, 0, 124, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
  x.fillStyle = MINT; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 112, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * clamp(lt / 1.4)); x.closePath(); x.fill()
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); const a = -Math.PI / 2 + Math.PI * 2 * clamp(lt / 1.4); x.lineTo(Math.cos(a) * 90, Math.sin(a) * 90); x.stroke()
  x.restore()
}
function papers(x, t, cx, cy, t0) {
  for (let i = 0; i < 2; i++) {
    const k = pop01(t, t0 + 0.3 + i * 0.4, 0.3, 2)
    if (k <= 0.01) continue
    x.save(); x.translate(cx + i * 60 - 30, cy + i * 30); x.rotate(-0.08 + i * 0.14); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-100, -130, 200, 260); x.fillStyle = CREAM; x.fillRect(-94, -124, 188, 248)
    x.fillStyle = '#b9b0a0'; for (let l = 0; l < 6; l++) x.fillRect(-74, -96 + l * 30, l === 5 ? 80 : 148, 10)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`SOURCE ${i + 1}`, 0, 96)
    x.restore()
  }
}
function scales(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.25 * Math.sin(lt * 3.2)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-12, -120, 24, 230); x.fillRect(-80, 100, 160, 22)
  x.fillStyle = GOLD; x.fillRect(-6, -114, 12, 218); x.fillRect(-74, 104, 148, 14)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-150, -8, 300, 16); x.fillStyle = GOLD; x.fillRect(-146, -4, 292, 8)
  for (const s of [-1, 1]) {
    x.save(); x.translate(s * 140, 0); x.rotate(-tilt)
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-40, 70); x.moveTo(0, 0); x.lineTo(40, 70); x.stroke()
    x.fillStyle = INK; x.fillRect(-54, 66, 108, 18); x.fillStyle = s < 0 ? PINK : SKYB; x.fillRect(-50, 68, 100, 12)
    x.fillStyle = CREAM; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText(s < 0 ? 'you' : 'them', 0, 50)
    x.restore()
  }
  x.restore(); x.restore()
}
function magnifier(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.5 + 0.1 * Math.sin(t * 2)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-14, 70, 28, 130); x.fillStyle = '#8a4a2e'; x.fillRect(-8, 76, 16, 120)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#cfe8ff'; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 40, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c97bff'; x.beginPath(); x.arc(0, 0, 16, 0, Math.PI * 2); x.fill()
  x.restore()
}
function agenda(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -150, 296, 316)
  x.fillStyle = INK; x.fillRect(-150, -160, 300, 320); x.fillStyle = CREAM; x.fillRect(-142, -152, 284, 304)
  x.fillStyle = '#2a3d6a'; x.fillRect(-142, -152, 284, 50)
  x.fillStyle = CREAM; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('AGENDA', 0, -127)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'left'
  ;['1. the issue', '2. options', '3. decide', '4. snacks'].forEach((s, i) => { if (lt > 0.4 + i * 0.25) x.fillText(s, -110, -62 + i * 58) })
  x.restore()
}
function thought(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK
  for (const [a, b, r] of [[-90, 0, 76], [0, -30, 90], [90, 0, 76], [0, 40, 80]]) { x.beginPath(); x.arc(a, b, r + 7, 0, Math.PI * 2); x.fill() }
  x.fillStyle = CREAM
  for (const [a, b, r] of [[-90, 0, 76], [0, -30, 90], [90, 0, 76], [0, 40, 80]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.fillRect(-150, 150, 22, 22); x.fillRect(-180, 196, 14, 14)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(lt > 1.5 ? 'fair point.' : 'processing' + '.'.repeat(1 + Math.floor(t * 4) % 3), 0, 0)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Say it straight. | *It’s over in a minute.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.45],
    front(x, t, lt, P) {
      stopwatch(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1120, 'FRIENDS AGAIN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Bring snacks. | *Then bring your point.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLATE, PLATE_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 700, 'MOOD: SOFTENED', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1090, 'ok… I’m listening', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Debate it. | *They might switch sides.*', mood: 'sparkle', look: lt => [Math.sin(lt * 4) > 0 ? 1 : -1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const n = Math.min(3, Math.floor(lt / 0.5))
      bubble(x, 790, 760, ['you’re wrong', 'hm. fair', 'actually you’re right', 'wait no'][n], pop01(t, P.t0 + 0.2 + n * 0.5, 0.22, 2.2), { size: 36, col: GOLD, tail: 'bl' })
      label(x, 790, 1000, `SIDES SWITCHED: ${n}`, pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Lead with | *“I love you, but…”*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, HEARTNOTE, { H: PINK }, 790, 870, 40 * pop01(t, P.t0 + 0.2, 0.3, 2) * (1 + 0.05 * Math.sin(t * 5)))
      x.save(); x.globalAlpha = clamp((lt - 0.4) * 3); x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('I love you,', 790, 830); x.fillText('but…', 790, 876); x.restore()
      label(x, 790, 1110, 'CLAWS: AWAY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Compliment first. | *Then disagree.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8],
    front(x, t, lt, P, F) {
      drawBits(x, CROWN, CROWN_C, F.x, F.top - 40, 14 * pop01(t, P.t0 + 0.6, 0.3, 2.4))
      bubble(x, 790, 720, 'your hair | looks great', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: GOLD, tail: 'bl' })
      bubble(x, 790, 980, 'also, | you’re wrong', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 34, tail: 'bl' })
      sparkles(x, t, F.x, F.top - 40, P.t0 + 0.7, 6, 90, 0.3)
    } },
  { sign: 'virgo', cap: 'Bring a source. | *Maybe two.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      papers(x, t, 790, 880, P.t0)
      label(x, 790, 1130, 'CITED. RESPECTED.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Give them a minute. | *They’re weighing it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      scales(x, t, 790, 930, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'STILL COMPATIBLE', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Be honest. | *They’ll know anyway.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      magnifier(x, t, 790, 850, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1130, 'TRUST: UNLOCKED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: '#c97bff', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Keep it light. | *Laughing is allowed.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.7, 1.1, 1.5],
    front(x, t, lt, P) {
      label(x, 720, 740, 'HA', pop01(t, P.t0 + 0.4, 0.25, 2.4), { size: 60, bg: GOLD, rot: -0.12 })
      label(x, 880, 840, 'HA!', pop01(t, P.t0 + 0.7, 0.25, 2.4), { size: 60, bg: PEACH, rot: 0.1 })
      label(x, 760, 950, 'HAHA', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, bg: MINT, rot: -0.05 })
      label(x, 790, 1130, 'ARGUMENT: FORGOTTEN', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 28, bg: LAV, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Make it a plan, | *not a feeling.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      agenda(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 1000, P.t0 + 1.2, 6, 120, 0.4)
    } },
  { sign: 'aquarius', cap: 'Use logic. | *Then let them think.*', mood: lt => lt > 1.5 ? 'sparkle' : 'neutral', look: [1, -1], star: { x: -220, y: 40 },
    front(x, t, lt, P) {
      thought(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'GIVE IT A DAY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Speak softly. | *Hug after.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: 2, look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 790, 960, 220 * k, { mood: lt > 1.2 ? 'heart' : 'neutral', look: [-1, 0], seed: 23, glyph: false })
      hearts(x, t, 560, 1000, P.t0 + 1.2, { n: 7, life: 1.6, spread: 260, cell: 7, seed: 3 })
      label(x, 790, 680, 'HUG: MANDATORY', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0069', key: 'E', accent: PEACH, ending: 'callback',
  title: 'How to disagree | *with each sign.*',
  cameos: CAMEOS,
  group: { cap: 'Disagree kindly. | *Stay close.*' },
  last: {
    text: 'The snack plate? | *Ended it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 400, 1080, 240 * k, { mood: lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], seed: 40, hops: [t0 + 1.2] })
      drawBits(x, PLATE, PLATE_C, 720, 1110, 32 * pop01(t, t0 + 0.7, 0.35, 2))
      hearts(x, t, 560, 980, t0 + 1.4, { n: 6, life: 1.6, spread: 260, cell: 6, seed: 9 })
      label(x, 560, 1380, 'PEACE TREATY: SIGNED', pop01(t, t0 + 1.6, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
