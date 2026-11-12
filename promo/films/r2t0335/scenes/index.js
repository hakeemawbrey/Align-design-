// r2t0335: star_talk, BE LIKE (twelve signs), "Oven timer beeps? | Zodiacs be like." (~59 s vertical, signs3kit, lofi · F)
// The twelve signs in zodiac order, each the most extreme version of itself when the oven timer goes off. Ending: lesson.
//   0.0–3.6    "Oven timer beeps? | *Zodiacs be like.*"
//   3.6–49.2   Aries opened it before the beep · Taurus ate it off the tray · Gemini forgot they were baking · Cancer baked
//              heart cookies for their match · Leo presented the lasagna to applause · Virgo already in oven mitts
//              · Libra: is it done? · Scorpio read the cake's birth chart · Sagittarius set the timer, went on a hike
//              · Capricorn turned it off, set three more · Aquarius baked a planet cake · Pisces: cookies too cute, sobbed
//  49.2        "One beep. | *Twelve chefs.*"
//  52.4        LESSON UNLOCKED: "Good things take time. | *Worth the wait.*"  STATUS: FRESHLY BAKED
//  58.3        "And Aries? | *Burnt tongue.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', STEEL = '#c9c9d8', ORANGE = '#ffb34a'

// ── props
// an oven: steel box, glowing window, a dial; `open` drops the door
function oven(x, cx, cy, k, { glow = 1, open = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-136, -136, 288, 288)
  x.fillStyle = INK; x.fillRect(-146, -150, 292, 300)
  x.fillStyle = STEEL; x.fillRect(-138, -142, 276, 284)
  x.fillStyle = '#8a8aa0'; x.fillRect(-138, -142, 276, 50)
  for (let i = 0; i < 3; i++) { x.fillStyle = INK; x.beginPath(); x.arc(-80 + i * 60, -117, 14, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#ff4f4f'; x.fillRect(66, -130, 54, 26)
  if (open > 0) {
    x.fillStyle = '#3a2a1a'; x.fillRect(-110, -70, 220, 190)
    x.fillStyle = `rgba(255,179,74,${0.5 * glow})`; x.fillRect(-110, -70, 220, 190)
    x.fillStyle = INK; x.fillRect(-120, 120, 240, 40 * open + 8); x.fillStyle = STEEL; x.fillRect(-116, 124, 232, 40 * open)
  } else {
    x.fillStyle = INK; x.fillRect(-114, -74, 228, 198)
    x.fillStyle = `rgba(255,179,74,${0.35 + 0.35 * glow})`; x.fillRect(-106, -66, 212, 182)
    x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(-96, -56, 50, 12)
    x.fillStyle = INK; x.fillRect(-90, -60 - 18, 180, 10)
  }
  x.restore()
}
// a baking tray with n round cookies (faces optional)
function tray(x, cx, cy, k, { n = 6, faces = false, heart = false, eaten = 0, col = '#e0a85a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -76, 312, 152); x.fillStyle = '#9aa0c0'; x.fillRect(-148, -68, 296, 136)
  for (let i = 0; i < n; i++) {
    if (i < eaten) continue
    const px = -100 + (i % 3) * 100, py = -30 + Math.floor(i / 3) * 62
    if (heart) { x.restore(); drawBits(x, HEART, { H: '#ff8fb1', W: '#fff' }, cx + px * k, cy + py * k, 6 * k); x.save(); x.translate(cx, cy); x.scale(k, k); continue }
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 28, 0, Math.PI * 2); x.fill()
    x.fillStyle = col; x.beginPath(); x.arc(px, py, 24, 0, Math.PI * 2); x.fill()
    if (faces) { x.fillStyle = INK; x.fillRect(px - 11, py - 6, 6, 8); x.fillRect(px + 5, py - 6, 6, 8); x.fillRect(px - 6, py + 8, 12, 4); x.fillStyle = '#ff8fb1'; x.fillRect(px - 18, py + 2, 7, 5); x.fillRect(px + 11, py + 2, 7, 5) }
    else { x.fillStyle = '#5a3a2a'; x.fillRect(px - 8, py - 8, 6, 6); x.fillRect(px + 6, py + 2, 6, 6) }
  }
  x.restore()
}
const MITT = [
  '.MM.....',
  'MMMM.MM.',
  'MMMM.MMM',
  'MMMMMMMM',
  'MMMMMMMM',
  '.MMMMMM.',
  '.WWWWWW.',
]
const LASAGNA = [
  '..S...S...S..',
  '.S...S...S...',
  'RRRRRRRRRRRRR',
  'YYYYYYYYYYYYY',
  'RRRRRRRRRRRRR',
  'YYYYYYYYYYYYY',
  'DDDDDDDDDDDDD',
]
const LASAGNA_C = { S: '#d8dbe8', R: '#e23d4e', Y: '#ffd23a', D: '#4a4a6a' }
const PLANET = [
  '......PPPPP......',
  '....PPPpPPPPP....',
  'RR.PPPPPPPPpPP.RR',
  '.RRRRRRRRRRRRRRR.',
  '...PPpPPPPPPPP...',
  '....PPPPPpPP.....',
  '......PPPPP......',
]
const PLANET_C = { P: '#7dc7ff', p: '#c9ecff', R: GOLD }

// little rising steam
function steam(x, t, cx, cy, n = 3) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.8 + i / n) % 1 + 1) % 1
    x.save(); x.globalAlpha = 0.6 * Math.sin(Math.PI * ph); x.fillStyle = BONE
    x.fillRect(cx - 40 + i * 40 + Math.sin(ph * 6 + i) * 10, cy - ph * 120, 10, 26); x.restore()
  }
}

const S = { star: { x: -170 }, look: [1, 0] }
const CAMEOS = [
  { sign: 'aries', cap: 'Opened the oven | *before the beep.*', mood: lt => lt > 1.1 ? 'sparkle' : 'squint', ...S, hops: [1.1],
    front(x, t, lt, P) {
      oven(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { open: lt > 1.0 ? 1 : 0 })
      label(x, 790, 700, 'TIMER: 9 MIN LEFT', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 540, 1130, 'it’s fine.', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Ate it | *straight off the tray.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', ...S,
    front(x, t, lt, P) {
      const e = Math.floor(clamp((lt - 0.6) / 1.4) * 6)
      tray(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { eaten: e })
      steam(x, t, 790, 820)
      label(x, 790, 1080, e >= 6 ? 'PLATES: SKIPPED' : 'COOLING: NO', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: e >= 6 ? MINT : PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Beep? | Forgot they were *baking.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', ...S,
    front(x, t, lt, P) {
      oven(x, 800, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { glow: 0.6 + 0.4 * Math.sin(lt * 8) })
      label(x, 800, 720, 'BEEP BEEP BEEP', pop01(t, P.t0 + 0.4, 0.3, 2.2) * (1 + 0.05 * Math.sin(lt * 20)), { size: 34, bg: '#ff4f4f', color: '#fff', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 520, 640, 'what’s that?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Baked for their match. | *Hearts, obviously.*', mood: lt => lt > 1.1 ? 'heart' : 'sparkle', ...S, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tray(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { heart: true })
      label(x, 790, 720, 'FOR: MY MATCH', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 620, 1060, P.t0 + 1.1, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Presented the lasagna. | *Waited for applause.*', mood: 'sparkle', ...S, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, LASAGNA, LASAGNA_C, 790, 900, 18 * pop01(t, P.t0 + 0.2, 0.35, 2))
      steam(x, t, 790, 820)
      label(x, 790, 700, 'TA-DAAA', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
      label(x, 790, 1090, 'APPLAUSE: PENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Beep. | *Already in oven mitts.*', mood: 'squint', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, MITT, { M: '#ff8fb1', W: PAPER }, 560, 1060, 12 * k, { rot: -0.2 })
      drawBits(x, MITT, { M: '#ff8fb1', W: PAPER }, 230, 1050, 12 * k, { rot: 0.2, sx: -1 })
      oven(x, 820, 900, pop01(t, P.t0 + 0.3, 0.35, 2))
      label(x, 820, 690, 'RESPONSE: 0.0 SEC', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Is it done? | *Is it though?*', mood: 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], ...S,
    front(x, t, lt, P) {
      tray(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { n: 3 })
      const done = Math.floor(lt * 2.5) % 2
      label(x, 790, 720, done ? 'DONE?' : 'NOT DONE?', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 44, bg: done ? MINT : LAV, rot: done ? 0.05 : -0.05, font: MONO, weight: 700 })
      label(x, 790, 1090, 'CHECKED ×14', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Didn’t need a timer. | *Read the cake’s chart.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', ...S,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-120, -60, 240, 130); x.fillStyle = '#f4e0b8'; x.fillRect(-112, -52, 224, 114)
        x.fillStyle = '#ff8fb1'; x.fillRect(-112, -52, 224, 26)
        x.restore()
      }
      const c = pop01(t, P.t0 + 0.7, 0.35, 2)
      if (c > 0.01) {
        x.save(); x.translate(790, 730); x.scale(c, c); x.rotate(t * 0.2)
        x.strokeStyle = GOLD; x.lineWidth = 5; x.beginPath(); x.arc(0, 0, 90, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.arc(0, 0, 58, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.beginPath(); x.moveTo(Math.cos(a) * 58, Math.sin(a) * 58); x.lineTo(Math.cos(a) * 90, Math.sin(a) * 90); x.stroke() }
        x.restore()
      }
      label(x, 790, 1110, 'CAKE RISING: YES', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Set the timer. | *Went on a hike.*', mood: 'sparkle', look: [-1, 0], star: { x: -200, y: -60, s: 220 }, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      oven(x, 800, 960, pop01(t, P.t0 + 0.2, 0.35, 2), { glow: 0.6 + 0.4 * Math.sin(lt * 8) })
      label(x, 800, 720, 'BEEP… BEEP…', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 34, bg: '#ff4f4f', color: '#fff', rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 360, 1080, 'mountain view!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Turned off the timer. | *Set three more.*', mood: 'neutral', ...S,
    front(x, t, lt, P) {
      const n = Math.min(4, 1 + Math.floor(Math.max(0, lt - 0.6) / 0.35))
      for (let i = 0; i < n; i++) label(x, 790 + (i % 2 ? 40 : -40), 700 + i * 100, ['TIMER 1: OFF', 'TIMER 2: 4:00', 'TIMER 3: 9:00', 'TIMER 4: 12:30'][i], pop01(t, P.t0 + 0.3 + i * 0.35, 0.3, 2.2), { size: 30, bg: i ? GOLD : BONE, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Baked a cake | *shaped like a planet.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', ...S, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PLANET, PLANET_C, 790, 900, 17 * pop01(t, P.t0 + 0.3, 0.4, 2), { rot: Math.sin(lt * 2) * 0.08 })
      label(x, 790, 1080, 'FLAVOUR: SATURN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 8, 200, 0.4)
    } },
  { sign: 'pisces', cap: 'Cookies came out cute. | *Sobbed.*', mood: lt => lt > 0.9 ? 'wide' : 'sparkle', tears: lt => lt > 0.9 ? 3 : 1, ...S,
    front(x, t, lt, P) {
      tray(x, 790, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { faces: true, col: '#f2c79a' })
      bubble(x, 790, 720, 'i can’t eat | THEM', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0335', key: 'F', accent: ORANGE, ending: 'lesson',
  title: 'Oven timer beeps? | *Zodiacs be like.*',
  cameos: CAMEOS,
  group: { cap: 'One beep. | *Twelve chefs.*' },
  lesson: { text: 'Good things take time. | *Worth the wait.*', chip: 'STATUS: FRESHLY BAKED' },
  last: {
    text: 'And Aries? | *Burnt tongue.*',
    draw(x, t, lt) { oven(x, 540, 690, pop01(t, t - lt + 0.6, 0.35, 2) * 0.7, { open: 1 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
