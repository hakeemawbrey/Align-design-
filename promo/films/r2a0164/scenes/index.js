// r2a0164: star_advice, ADVICE ROLLCALL, "Each sign’s | work superpower." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs, one warm, specific "this is what you bring" line each, with a light visual gag.
//   0.0–3.6    "Each sign’s | *work superpower.*"
//   3.6–49.2   ♈ you start things, teams need a spark · ♉ you finish things, calmly · ♊ you can talk to anyone in the
//              building · ♋ you notice who's having a hard day (a cup of tea arrives) · ♌ you make Mondays an event
//              · ♍ you catch the mistake first · ♎ you turn arguments into agreements · ♏ you find the answer nobody
//              could · ♐ your big ideas move everyone · ♑ you're the plan when there's no plan · ♒ you see the fix
//              nobody thought of · ♓ you make the office kinder
//  49.2        "Twelve signs. | *All brilliant.*"
//  52.6        callback: "And Cancer brought | *everyone tea.*"  a row of steaming cups slides in.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, bar, confetti, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const ACC = '#7dffb0'
const ST = { x: -170 }

const MUG = ['WWWWWWWW...', 'WTTTTTTW.WW', 'WTTTTTTWW.W', 'WTTTTTTW..W', 'WTTTTTTWWW.', 'WTTTTTTW...', '.WWWWWW....']
const MUG_C = { W: '#ff8fb1', T: '#c98f6a' }
const BULB = ['...YYYY...', '..YYYYYY..', '.YYYWYYYY.', '.YYWYYYYY.', '.YYYYYYYY.', '..YYYYYY..', '...YYYY...', '...GGGG...', '...gggg...', '...GGGG...', '....gg....']
const BULB_ON = { Y: '#ffe27a', W: '#ffffff', G: '#9aa5c4', g: '#6b7594' }, BULB_OFF = { Y: '#6b6480', W: '#8a84a0', G: '#9aa5c4', g: '#6b7594' }
const ROCKET = ['...R...', '..RRR..', '..WWW..', '.WWSWW.', '.WWWWW.', '.WWWWW.', 'RWWWWWR', 'R.OOO.R', '..O.O..']
const ROCKET_C = { R: RED, W: CREAM, S: SKYB, O: ORANGE }

/** a steam squiggle */
function steam(x, cx, cy, t, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a; x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 10; i++) { const yy = cy - i * 8, xx = cx + Math.sin(i * 0.9 + t * 5) * 7; i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke(); x.restore()
}
/** balance scales, tilt in −1…1 */
function scales(x, cx, cy, k, tilt, { l = '', r = '' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 240); x.fillRect(-80, 110, 160, 24); x.fillStyle = GOLD; x.fillRect(-5, -116, 10, 232)
  x.save(); x.translate(0, -110); x.rotate(tilt * 0.25)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const [d, s] of [[-1, l], [1, r]]) {
    x.save(); x.translate(d * 150, 0); x.rotate(-tilt * 0.25)
    x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 80); x.moveTo(0, 0); x.lineTo(50, 80); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 78, 128, 20); x.fillStyle = GOLD; x.fillRect(-60, 80, 120, 14)
    if (s) txt(x, s, 0, 50, { size: 44, color: CREAM, font: MONO, weight: 700 })
    x.restore()
  }
  x.restore(); x.restore()
}
/** a target board with an arrow that lands at `hit` (0…1) */
function target(x, cx, cy, k, hit) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [r, c] of [[110, INK], [104, CREAM], [80, RED], [56, CREAM], [32, RED]]) { x.fillStyle = c; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill() }
  if (hit > 0.01) { const ax = lerp(-420, 0, hit); x.fillStyle = INK; x.fillRect(ax - 150, -4, 150, 8); x.fillStyle = GOLD; x.beginPath(); x.moveTo(ax, -14); x.lineTo(ax + 22, 0); x.lineTo(ax, 14); x.fill(); x.fillStyle = PINK; x.fillRect(ax - 150, -14, 30, 28) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'You start things. | *Teams need a spark.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [0.5],
    front(x, t, lt, P) {
      const lift = ease.inCubic(prog(lt, 0.9, 2.2))
      drawBits(x, ROCKET, ROCKET_C, 790, lerp(940, 620, lift), 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (lt > 0.9) for (let i = 0; i < 3; i++) { x.fillStyle = [GOLD, ORANGE, RED][i]; x.fillRect(770 + i * 20 - 7, lerp(940, 620, lift) + 120 + i * 8, 14, 30 + 20 * Math.sin(t * 20 + i)) }
      label(x, 790, 1110, 'PROJECT: LAUNCHED', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'You finish things. | *Calmly. Beautifully.*', mood: lt => lt > 1.6 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const p = ease.inOutCubic(prog(lt, 0.3, 1.8))
      bar(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), p, `DONE: ${Math.round(p * 100)}%`, { col: GREEN, w: 330 })
      label(x, 790, 1000, 'NO RUSH. NO MESS.', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      if (p >= 1) sparkles(x, t, 790, 820, P.t0 + 1.8 * 1.29, 6, 190, 0.2, [GREEN, BONE, GOLD])
    } },
  { sign: 'gemini', cap: 'You can talk | *to anyone in the building.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const B = [['hi, IT!', 650, 650, 'bl'], ['love the shoes!', 820, 760, 'br'], ['how’s the baby?', 660, 880, 'bl'], ['you’re a legend', 820, 1000, 'br'], ['hey, boss!', 680, 1110, 'bl']]
      B.forEach(([s, bx, by, tl], i) => bubble(x, bx, by, s, pop01(t, P.t0 + 0.3 + i * 0.3, 0.25, 2.2), { size: 30, col: [GOLD, PINK, MINT, SKYB, LAV][i], tail: tl }))
    } },
  { sign: 'cancer', cap: 'You notice | *who’s having a hard day.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 1000, 170 * k, { mood: lt > 1.4 ? 'heart' : 'sleepy', look: [-1, 0], seed: 17, glyph: false })
      const slide = ease.outCubic(prog(lt, 0.8, 1.3))
      drawBits(x, MUG, MUG_C, lerp(500, 680, slide), 1060, 17 * clamp(slide * 3))
      steam(x, lerp(490, 670, slide), 990, t, slide * 0.8)
      label(x, 790, 720, 'TEA: DELIVERED', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'You make Mondays | *feel like an event.*', mood: lt => lt > 0.9 ? 'sparkle' : 'happy', star: { x: -150 }, hops: [1.0, 1.5],
    back(x, t, lt, P) { confetti(x, t, 540, 860, P.t0 + 0.9 * 1.29, { n: 18, spread: 330, h: 640 }) },
    front(x, t, lt, P) {
      card(x, 790, 820, 330, 200, pop01(t, P.t0 + 0.3, 0.35, 2), { bg: DEEP, rot: -0.03 }, () => {
        txt(x, '✦ MONDAY ✦', 0, -40, { size: 42, color: GOLD }); txt(x, 'THE PREMIERE', 0, 30, { size: 30, color: BONE, font: MONO, weight: 700 })
      })
      label(x, 790, 1060, 'ATTENDANCE: GLOWING', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'You catch the mistake | *before anyone sees it.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const fix = lt > 1.2
      card(x, 790, 820, 340, 180, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        txt(x, 'TO: EVERYONE', 0, -50, { size: 24, font: MONO, weight: 700, color: GREY })
        txt(x, fix ? 'Big news!' : 'Bgi news!', 0, 20, { size: 52, color: fix ? INK : RED })
        if (!fix && lt > 0.6) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-62, 22, 50, 34, 0, 0, Math.PI * 2); x.stroke() }
      })
      label(x, 790, 1020, 'FIXED BEFORE SENDING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'You turn arguments | *into agreements.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tilt = lt < 1.3 ? Math.sin(t * 5) * 0.9 : lerp(Math.sin(t * 5) * 0.9, 0, ease.outCubic(prog(lt, 1.3, 1.7)))
      scales(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), tilt, { l: 'A', r: 'B' })
      label(x, 790, 700, lt > 1.6 ? 'A + B = DEAL' : 'A vs B', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 36, bg: lt > 1.6 ? PINK : BONE, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.7) hearts(x, t, 790, 800, P.t0 + 1.7 * 1.29, { n: 4, life: 1.4, spread: 200, cell: 7, seed: 2 })
    } },
  { sign: 'scorpio', cap: 'You find the answer | *nobody else could.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      for (let i = 0; i < 4; i++) card(x, 760 + i * 24, 900 - i * 30, 260, 180, k, { bg: ['#e8dfcf', '#efe6d6', '#f4ecdf', CREAM][i], rot: 0.06 - i * 0.03 }, i === 3 ? () => { txt(x, 'FILE #4,812', 0, -40, { size: 26, font: MONO, weight: 700 }); txt(x, lt > 1.2 ? 'FOUND IT.' : '…', 0, 20, { size: 40, color: lt > 1.2 ? GREEN : INK }) } : null)
      if (lt > 1.2) sparkles(x, t, 830, 820, P.t0 + 1.2 * 1.29, 6, 170, 0.3)
      label(x, 790, 1120, 'CASE: CLOSED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Your big ideas | *move everyone forward.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      target(x, 820, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.inCubic(prog(lt, 0.6, 1.1)))
      if (lt > 1.1) sparkles(x, t, 820, 860, P.t0 + 1.1 * 1.29, 7, 150, 0.4)
      label(x, 790, 680, 'BIG IDEA', pop01(t, P.t0 + 0.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'TEAM: INSPIRED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'You’re the plan | *when there’s no plan.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const STEPS = ['1. breathe', '2. list it', '3. do step 1', '4. coffee']
      card(x, 790, 860, 340, 360, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.03 }, () => {
        x.fillStyle = BROWN; x.fillRect(-60, -196, 120, 36)
        txt(x, 'THE PLAN', 0, -130, { size: 34, font: MONO, weight: 700 })
        STEPS.forEach((s, i) => { if (lt > 0.4 + i * 0.3) txt(x, s, -130, -66 + i * 58, { size: 30, font: MONO, weight: 700, align: 'left' }) })
      })
      bubble(x, 420, 620, 'what now?!', pop01(t, P.t0 + 0.1, 0.25, 2.2) * (1 - prog(lt, 1.6, 1.8)), { size: 34, col: BONE, tail: 'bc' })
    } },
  { sign: 'aquarius', cap: 'You see the fix | *nobody’s thought of.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const on = lt > 1.0
      if (on) { x.save(); x.globalAlpha = 0.3; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(790, 800, 190, 0, Math.PI * 2); x.fill(); x.restore() }
      drawBits(x, BULB, on ? BULB_ON : BULB_OFF, 790, 820, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      if (on) sparkles(x, t, 790, 790, P.t0 + 1.0 * 1.29, 8, 200, 0.2)
      label(x, 790, 1110, 'WAIT… WHAT IF—', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'You make the office | *feel kinder.*', mood: lt => lt < 0.9 ? 'happy' : 'heart', tears: lt => lt < 0.9 ? 1 : 2, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { hearts(x, t, 790, 1060, P.t0 + 0.6, { n: 8, life: 2.4, spread: 300, cell: 8, seed: 5 }) },
    front(x, t, lt, P) {
      card(x, 790, 800, 300, 200, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffe3ec', rot: 0.05 }, () => { txt(x, 'THANK YOU', 0, -30, { size: 40, color: RED }); txt(x, 'from: everyone', 0, 30, { size: 26, weight: 700, color: BROWN }) })
      label(x, 790, 1080, 'HAPPY TEARS ONLY', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0164', key: 'E', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *work superpower.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *All brilliant.*', moods: ['sparkle', 'happy', 'wink', 'heart', 'sparkle', 'happy', 'heart', 'wink', 'sparkle', 'happy', 'sparkle', 'heart'] },
  last: {
    text: 'And Cancer brought | *everyone tea.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 540, 900, 250 * k, { mood: 'heart', seed: 52, hops: [t - lt + 1.4, t - lt + 2.4] })
      for (let i = 0; i < 6; i++) {
        const s = ease.outCubic(prog(lt, 0.9 + i * 0.15, 1.3 + i * 0.15)), cx = 215 + i * 130
        drawBits(x, MUG, { W: ['#ff8fb1', '#7dffb0', '#ffd23a', '#8fe3ff', '#c9a6ff', '#ffb34a'][i], T: '#c98f6a' }, cx, lerp(1420, 1220, s), 15 * clamp(s * 3))
        steam(x, cx - 10, 1150, t + i, s * 0.8)
      }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
