// r2t0301: star_talk, ROLL CALL, "The signs as | *the weather.*" (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, each the most extreme weather version of itself. Ending: lesson.
//   0.0–3.6    "The signs as | *the weather.*"
//   3.6–49.2   ♈ lightning, struck first · ♉ fog that settled in since March · ♊ sun, rain, snow before lunch
//              · ♋ warm rain that brings you soup · ♌ a heatwave named after themself · ♍ rain at 3:04, not 3:05
//              · ♎ mild, can't pick a season · ♏ storm cloud, holds a grudge · ♐ a breeze that left the country
//              · ♑ snowed in, still clocked in · ♒ snow falling upward · ♓ a rainbow, but it's crying
//  49.2        "Forecast: | *all of it.*"
//  52.4        LESSON UNLOCKED: "Every sky gets | *its sunny day.*"  FORECAST: CLEARING
//  58.3        "Still, pack an umbrella | for *Pisces.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fd0ff', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

const BOLT = ['....YYYY', '...YYYY.', '..YYYY..', '.YYYYYYY', '....YYY.', '...YYY..', '..YYY...', '.YYY....', 'YY......']
const CLOUD = ['....CCCC......', '..CCCCCCCC....', '.CCCCCCCCCCCC.', 'CCCCCCCCCCCCCC', 'CCCCCCCCCCCCCC', '.CCCCCCCCCCCC.']
const SUN = ['...Y..Y..Y...', '.............', 'Y...OOOOO...Y', '...OOOOOOO...', '..OOOOOOOOO..', 'Y.OOOOOOOOO.Y', '..OOOOOOOOO..', '...OOOOOOO...', 'Y...OOOOO...Y', '.............', '...Y..Y..Y...']
const FLAKE = ['..W..', 'W.W.W', '.WWW.', 'WWWWW', '.WWW.', 'W.W.W', '..W..']
const DROP = ['.B.', 'BBB', 'BBB', '.B.']
const BOWL = ['.S.S.S.', 'S.S.S..', 'KKKKKKK', 'KRRRRRK', '.KRRRK.', '..KKK..']
const CROWN = ['Y...Y...Y', 'YY.YYY.YY', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY']
const CASE = ['...KKKK...', '...K..K...', 'KKKKKKKKKK', 'KBBBBBBBBK', 'KBBBGGBBBK', 'KBBBBBBBBK', 'KBBBBBBBBK', 'KKKKKKKKKK']
const SCALE = ['......K......', '.....KKK.....', 'KKKKKKKKKKKKK', 'K.....K.....K', 'K.....K.....K', 'K.....K.....K', '......K......', '......K......', '....KKKKK....']

const cloud = (x, cx, cy, cell, col = '#c9d3ea', alpha = 1) => drawBits(x, CLOUD, { C: col }, cx, cy, cell, { alpha })
function rain(x, t, cx, cy, w, h, n, col = SKYB, rate = 1.2) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * rate + i * 0.173) % 1 + 1) % 1
    drawBits(x, DROP, { B: col }, cx - w / 2 + ((i * 97) % w), cy + ph * h, 7, { alpha: Math.sin(Math.PI * ph) })
  }
}
function snow(x, t, cx, cy, w, h, n, up = false, rate = 0.4) {
  for (let i = 0; i < n; i++) {
    const ph = ((t * rate + i * 0.211) % 1 + 1) % 1
    const py = up ? cy + h - ph * h : cy + ph * h
    drawBits(x, FLAKE, { W: CREAM }, cx - w / 2 + ((i * 113) % w) + Math.sin(t * 2 + i) * 12, py, 6, { alpha: Math.sin(Math.PI * ph) })
  }
}
function paper(x, cx, cy, k, lines, { w = 330, size = 30, rot = 0.04, head = null, headBg = GOLD } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.45, h = lines.length * lh + 40 + (head ? 60 : 0)
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 20
  if (head) { x.fillStyle = headBg; x.fillRect(-w / 2, -h / 2, w, 60); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -h / 2 + 31); y0 += 60 }
  x.fillStyle = INK; x.font = `800 ${size}px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -w / 2 + 24, y0 + lh * (i + 0.5)))
  x.restore()
}
function rainbow(x, cx, cy, R, k) {
  if (k <= 0.01) return
  const COLS = ['#ff5a6a', ORANGE, GOLD, MINT, SKYB, LAV]
  x.save(); x.lineWidth = 22
  COLS.forEach((c, i) => { x.strokeStyle = c; x.beginPath(); x.arc(cx, cy, (R - i * 22) * k, Math.PI, Math.PI * 2); x.stroke() })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Lightning. Struck *first.* | Asked questions never.', mood: 'wide', star: ST, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cloud(x, 790, 640, 16 * k, '#9aa5c4')
      const flash = lt > 0.7 && (Math.floor(lt * 8) % 3 !== 0)
      if (lt > 0.6) drawBits(x, BOLT, { Y: flash ? '#fff6b0' : GOLD }, 790, 860, 24 * k, { rot: 0.1 })
      L(x, 790, 1110, 'STRIKES TODAY: 40', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD)
    } },
  { sign: 'taurus', cap: 'Fog that settled in. | *Since March.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.5, 1.4)
      x.save(); x.globalAlpha = 0.55 * clamp(k)
      for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? '#d8dbe8' : '#b9bfd6'; x.fillRect(150 + Math.sin(t * 0.6 + i) * 30, 640 + i * 110, 800, 56) }
      x.restore()
      paper(x, 790, 760, pop01(t, P.t0 + 0.6, 0.3, 2), ['mon: fog', 'tue: fog', 'may: fog'], { head: 'FORECAST', headBg: '#c9d3ea', w: 300, rot: 0.05 })
      L(x, 790, 1080, 'MOVING: NO', pop01(t, P.t0 + 1.5, 0.3, 2.4), BONE)
    } },
  { sign: 'gemini', cap: 'Sun, rain, snow. | *Before lunch.*', mood: lt => lt > 1.6 ? 'wide' : 'wink', star: ST, hops: [0.8, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const ph = lt < 0.8 ? 0 : lt < 1.4 ? 1 : 2
      if (ph === 0) drawBits(x, SUN, { Y: GOLD, O: ORANGE }, 790, 800, 20 * k)
      if (ph === 1) { cloud(x, 790, 740, 16, '#9aa5c4'); rain(x, t, 790, 800, 220, 260, 10) }
      if (ph === 2) { cloud(x, 790, 740, 16, '#d8dbe8'); snow(x, t, 790, 800, 240, 260, 9) }
      L(x, 790, 1100, ['11:00 SUNNY', '11:20 RAIN', '11:40 SNOW'][ph], k, [GOLD, SKYB, BONE][ph])
    } },
  { sign: 'cancer', cap: 'Warm rain that | *brings you soup.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cloud(x, 790, 640, 15 * k, '#c9d3ea')
      rain(x, t, 790, 700, 220, 200, 8, '#a8e6ff', 0.8)
      drawBits(x, BOWL, { K: INK, R: ORANGE, S: CREAM }, 790, 960, 24 * pop01(t, P.t0 + 0.9, 0.3, 2.2))
      L(x, 790, 1130, 'SOUP DELIVERED ♥', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK)
    } },
  { sign: 'leo', cap: 'A heatwave named | *after themself.*', mood: 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      x.save(); x.translate(790, 820); x.rotate(t * 0.4); x.translate(-790, -820)
      drawBits(x, SUN, { Y: GOLD, O: ORANGE }, 790, 820, 24 * k); x.restore()
      if (lt > 0.8) drawBits(x, CROWN, { Y: GOLD, R: RED, B: SKYB }, 790, 660, 12 * pop01(t, P.t0 + 0.8, 0.3, 2.4))
      L(x, 790, 1100, 'HEATWAVE ♌︎ LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), ORANGE, 0.05, 34)
    } },
  { sign: 'virgo', cap: 'Rain at 3:04. | *Not 3:05.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      paper(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), ['3:03 dry', '3:04 RAIN', '3:09 stop'], { head: 'MY FORECAST', headBg: MINT, w: 320, rot: -0.04 })
      if (lt > 1.2) rain(x, t, 790, 920, 240, 180, 8)
      L(x, 790, 1130, 'ON SCHEDULE ✓', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT)
    } },
  { sign: 'libra', cap: 'Mild. Pleasant. | *Can’t pick a season.*', mood: lt => lt > 1.5 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), tilt = 0.12 * Math.sin(lt * 4)
      x.save(); x.translate(790, 820); x.rotate(tilt); x.translate(-790, -820)
      drawBits(x, SCALE, { K: INK }, 790, 830, 20 * k, { outline: BONE })
      drawBits(x, SUN, { Y: GOLD, O: ORANGE }, 670, 760, 7 * k)
      drawBits(x, FLAKE, { W: CREAM }, 910, 760, 12 * k)
      x.restore()
      L(x, 790, 1100, 'MATCH: EVERY SEASON', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'A storm cloud | that *holds a grudge.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cloud(x, 790, 760, 18 * k, '#4a4470')
      if (lt > 0.8) rain(x, t, 790, 830, 240, 200, 9, '#9aa5c4', 1.6)
      bubble(x, 760, 600, 'remember | last june?', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: '#ff6b8a', tail: 'br' })
      L(x, 790, 1100, 'FORGIVEN: NEVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), BONE)
    } },
  { sign: 'sagittarius', cap: 'A breeze that | *left the country.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.3],
    front(x, t, lt, P) {
      const go = prog(lt, 0.9, 2.2)
      x.save(); x.strokeStyle = CREAM; x.lineWidth = 8; x.lineCap = 'round'
      for (let i = 0; i < 4; i++) { const y = 700 + i * 70, o = ((t * 500 + i * 90) % 260); x.globalAlpha = 0.8; x.beginPath(); x.moveTo(620 + o, y); x.lineTo(760 + o, y); x.arc(760 + o, y - 22, 22, Math.PI / 2, -Math.PI / 2, true); x.stroke() }
      x.restore()
      paper(x, 790 + go * 40, 1010, pop01(t, P.t0 + 0.5, 0.3, 2), ['from: here', 'to: everywhere'], { head: 'BOARDING', headBg: '#c58bff', w: 330, rot: 0.05 })
    } },
  { sign: 'capricorn', cap: 'Snowed in? | Still *clocked in.*', mood: lt => lt > 1.2 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      snow(x, t, 540, 560, 760, 600, 16)
      drawBits(x, CASE, { K: INK, B: '#c98f5a', G: GOLD }, 790, 860, 22 * pop01(t, P.t0 + 0.3, 0.3, 2))
      L(x, 790, 1090, 'CLOCKED IN: 6:00 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), BONE, -0.05, 30)
    } },
  { sign: 'aquarius', cap: 'Snow, but | *falling upward.*', mood: 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      snow(x, t, 760, 560, 440, 620, 14, true, 0.5)
      bubble(x, 790, 1060, 'physics? | optional.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 36, col: SKYB, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'A rainbow, but | *it’s crying.*', mood: 'heart', tears: lt => lt < 1.0 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      rainbow(x, 790, 900, 220, pop01(t, P.t0 + 0.2, 0.4, 1.8))
      if (lt > 1.0) rain(x, t, 790, 920, 300, 180, 8)
      L(x, 790, 1110, 'IT’S JUST SO PRETTY', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV)
    } },
]

const F = makeFilm({
  id: 'r2t0301', key: 'C', accent: ACC, ending: 'lesson',
  title: 'The signs as | *the weather.*',
  cameos: CAMEOS,
  group: { cap: 'Forecast: | *all of it.*' },
  lesson: { text: 'Every sky gets | *its sunny day.*', chip: 'FORECAST: CLEARING' },
  last: {
    text: 'Still, pack an umbrella | for *Pisces.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      cloud(x, 952, 1196, 7 * k, '#9aa5c4')
      rain(x, t, 952, 1212, 100, 60, 5)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
