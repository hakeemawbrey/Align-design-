// r2t0337: star_talk, ROLLCALL (twelve signs), "The signs learning | to *skateboard.*" (signs3kit social cut,
// music: lofi · E). Ending: callback (Pisces' board finally rolls back home).
//   ♈ first try: the biggest ramp · ♉ sat on it, rolled to the snacks · ♊ learned one trick, teaches classes
//   · ♋ six knee pads, two helmets · ♌ can't ride yet, already has a fan club · ♍ read the manual, annotated it
//   · ♎ checked compatibility with every board · ♏ fell once, board sworn to secrecy · ♐ rolled downhill, now in another town
//   · ♑ goal: pro by Friday · ♒ rides it upside down, on purpose · ♓ the board rolled away (sobbing, waving)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, confetti, sweat, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

/** a side-view skateboard centred at (cx, cy) */
function board(x, cx, cy, k, { rot = 0, col = '#ff6b5a', w = 300, spin = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const hw = w / 2
  x.fillStyle = INK; x.beginPath(); x.roundRect(-hw - 6, -26, w + 12, 38, 16); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-hw, -20, w, 26, 12); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-hw + 20, -12, w - 40, 5)
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(s * hw * 0.62 - 14, 5, 28, 14)
    x.save(); x.translate(s * hw * 0.62, 30); x.rotate(spin)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 20, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2); x.fill()
    x.fillStyle = INK; x.fillRect(-3, -14, 6, 10)
    x.restore()
  }
  x.restore()
}
const speed = (x, t, cx, cy, n = 4, len = 90) => { x.save(); x.fillStyle = BONE; for (let i = 0; i < n; i++) { const ph = ((t * 2 + i / n) % 1 + 1) % 1; x.globalAlpha = 0.7 * (1 - ph); x.fillRect(cx - len - ph * 60, cy - 50 + i * 34, len, 8) } x.restore() }
const HELMET = ['...LLLLL...', '.LLLLLLLLL.', 'LLLLWWWLLLL', 'LLLLLLLLLLL', 'KKKKKKKKKKK']
const PAD = ['.MMMM.', 'MMWWMM', 'MMMMMM', 'MMMMMM', '.MMMM.']
const CHIPS = ['.RRRR.', 'RWWWWR', 'RWYYWR', 'RWWWWR', 'RRRRRR']

const ST = { x: -170, y: -40 }
const RIDE = (col, rot = 0) => (x, t, lt, P, F) => board(x, F.x, F.cy + 140, P.k, { col, rot, spin: t * 6 })
const CAMEOS = [
  { sign: 'aries', cap: 'First try? | *The biggest ramp.*', mood: 'wide', look: [1, -1], star: { x: -200, y: 60, s: 260 }, hops: [1.4],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.4, 1.8)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = k; x.fillStyle = INK; x.beginPath(); x.moveTo(250, 1200); x.quadraticCurveTo(900, 1200, 940, 520); x.lineTo(980, 520); x.lineTo(980, 1210); x.lineTo(250, 1210); x.fill()
      x.fillStyle = '#c98f5a'; x.beginPath(); x.moveTo(270, 1196); x.quadraticCurveTo(886, 1192, 930, 530); x.lineTo(966, 530); x.lineTo(966, 1196); x.fill(); x.restore()
    },
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 125, P.k, { col: '#ff6b5a', rot: 0, spin: t * 6 })
      L(x, 820, 560, 'RAMP: HUGE', pop01(t, P.t0 + 0.5, 0.3, 2), RED, 0.05, 32, CREAM)
      bubble(x, 420, 640, 'LET’S GO!!', pop01(t, P.t0 + 1.1, 0.25, 2.4), { size: 44, tail: 'bc' })
    } },
  { sign: 'taurus', cap: 'Sat on it. | Rolled *to the snacks.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140, P.k, { col: '#5fd068', spin: t * 3 })
      speed(x, t, F.x - 140, F.cy + 60, 3, 70)
      card(x, 820, 870, 250, 200, pop01(t, P.t0 + 0.4, 0.3, 2), 0.05, x => lines(x, ['SNACK', 'TABLE'], { size: 46 }), '#ffe7a8')
      if (lt > 1.4) L(x, 820, 1080, 'DESTINATION', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Learned one trick. | *Now teaches classes.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.8],
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140 - Math.max(0, Math.sin(Math.PI * clamp((lt - 0.7) / 0.5))) * 60, P.k, { col: '#ffd23a', rot: Math.sin(Math.PI * clamp((lt - 0.7) / 0.5)) * 0.4, spin: t * 6 })
      card(x, 800, 820, 300, 240, pop01(t, P.t0 + 0.9, 0.35, 2), 0.04, x => { lines(x, ['SKATE 101', 'with Gemini'], { size: 34, y: -30 }); x.fillStyle = MINT; x.fillRect(-90, 50, 180, 50); lines(x, ['SIGN UP'], { size: 28, y: 76, font: MONO, weight: 700 }) })
    } },
  { sign: 'cancer', cap: 'Six knee pads. | *Two helmets.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [0, 1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140, P.k, { col: '#8fe3ff', spin: 0 })
      drawBits(x, HELMET, { L: MINT, W: CREAM, K: PURP }, F.x, F.top - 4, 13 * pop01(t, P.t0 + 0.3, 0.3, 2))
      drawBits(x, HELMET, { L: PINK, W: CREAM, K: PURP }, F.x, F.top - 64, 13 * pop01(t, P.t0 + 0.6, 0.3, 2))
      const pads = [[700, 700], [840, 700], [700, 840], [840, 840], [700, 980], [840, 980]]
      pads.forEach(([px, py], i) => drawBits(x, PAD, { M: [LAV, GOLD, SKYB][i % 3], W: CREAM }, px, py, 16 * pop01(t, P.t0 + 0.5 + i * 0.15, 0.25, 2)))
      if (lt > 1.7) L(x, 770, 1110, 'SPEED: 0', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'leo', cap: 'Can’t ride yet. | Has a *fan club.*', mood: 'sparkle', star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140, P.k, { col: '#ffb34a', spin: 0 })
      card(x, 810, 800, 290, 260, pop01(t, P.t0 + 0.4, 0.35, 2), -0.05, x => { lines(x, ['LEO', 'FAN CLUB'], { size: 40, y: -40 }); lines(x, ['est. today'], { size: 26, y: 50, font: MONO, weight: 700, color: '#6b62a8' }) }, '#ffe7a8')
      if (lt > 1.3) bubble(x, 820, 1060, 'autographs!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'virgo', cap: 'Read the manual. | *Annotated it.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140, P.k, { col: '#7dffb0', spin: 0 })
      card(x, 800, 840, 320, 400, pop01(t, P.t0 + 0.25, 0.35, 2), 0.04, x => {
        lines(x, ['SKATEBOARD', 'MANUAL'], { size: 34, y: -140 })
        x.fillStyle = '#c9cde0'; for (let i = 0; i < 5; i++) x.fillRect(-120, -60 + i * 40, 240, 12)
        x.strokeStyle = RED; x.lineWidth = 4
        for (let i = 0; i < 5; i++) if (lt > 0.6 + i * 0.25) { x.beginPath(); x.moveTo(-124, -46 + i * 40); x.lineTo(110, -46 + i * 40); x.stroke(); x.fillStyle = RED; x.font = `800 26px ${INTER}`; x.textAlign = 'right'; x.fillText(['typo', 'source?', 'unclear', 'nope', 'see p.2'][i], 150, -70 + i * 40) }
      })
    } },
  { sign: 'libra', cap: 'Checked compatibility | with *every board.*', mood: lt => lt > 1.6 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      const cols = ['#ff6b5a', '#5fd068', '#c97bff']
      cols.forEach((c, i) => board(x, 800, 660 + i * 150, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2) * 0.75, { col: c, rot: (i - 1) * 0.06 }))
      const pick = Math.min(2, Math.floor(clamp((lt - 0.6) / 0.9) * 3))
      if (lt > 0.6) L(x, 940, 640 + pick * 150, pick < 2 ? 'HMM' : '✦ MATCH', 1, pick < 2 ? GREY : GOLD, 0.06, 26)
      if (lt > 1.6) hearts(x, t, 800, 960, P.t0 + 1.6, { n: 5, life: 1.5, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Fell once. | Board *sworn to secrecy.*', mood: lt => lt > 1.2 ? 'squint' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      board(x, 800, 900, k, { col: '#c97bff', rot: -0.3 })
      bubble(x, 800, 680, 'you saw nothing.', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 36, tail: 'bc' })
      if (lt > 1.5) L(x, 800, 1080, 'CLASSIFIED', pop01(t, P.t0 + 1.5, 0.3, 2.4), INK, -0.04, 38, '#ff6b9a')
    } },
  { sign: 'sagittarius', cap: 'Rolled downhill. | *Now in another town.*', mood: 'sparkle', look: [1, 0], star: { x: -60, y: -40, s: 220 }, hops: [0.7],
    back(x, t, lt, P) {
      card(x, 790, 760, 280, 170, pop01(t, P.t0 + 1.0, 0.35, 2), 0.06, x => { lines(x, ['WELCOME TO', 'SOMEWHERE'], { size: 32 }) }, '#5fd068')
      x.fillStyle = INK; x.fillRect(782, 850, 16, 260)
    },
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 100, P.k * 0.8, { col: '#ff9a4a', rot: 0.12, spin: t * 12 })
      speed(x, t, F.x - 110, F.cy + 30, 4, 100)
      bubble(x, 330, 620, 'see you!!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Goal set: | *pro by Friday.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P, F) {
      board(x, F.x, F.cy + 140, P.k, { col: '#9aa5c4', spin: t * 2 })
      card(x, 800, 830, 310, 360, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => {
        lines(x, ['THE PLAN'], { size: 36, y: -130 })
        const r = ['MON: stand', 'TUE: roll', 'WED: ollie', 'FRI: PRO']
        x.font = `700 26px ${MONO}`; x.textAlign = 'left'
        r.forEach((s, i) => { if (lt > 0.5 + i * 0.3) { x.fillStyle = i === 3 ? RED : INK; x.fillText(s, -120, -60 + i * 52) } })
      })
    } },
  { sign: 'aquarius', cap: 'Rides it upside down. | *On purpose.*', mood: 'wink', look: [1, 0], star: { x: -170, y: 80 }, squash: 0,
    front(x, t, lt, P, F) {
      // the board on top of the star's head, wheels up
      board(x, F.x, F.top - 30, P.k, { col: '#6fc3ff', rot: Math.PI, spin: t * 6 })
      L(x, 800, 720, 'INNOVATION', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, 0.05, 36)
      if (lt > 1.4) bubble(x, 800, 960, 'it’s a vibe.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Board rolled away. | Pisces *waved goodbye.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const d = ease.inOutQuad(prog(lt, 0.4, 2.2))
      board(x, lerp(620, 860, d), 1080, lerp(1, 0.45, d) * pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#b7a6ff', spin: t * 8 })
      bubble(x, 780, 640, 'bye, friend…', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0337', key: 'E', accent: SKYB, ending: 'callback',
  title: 'The signs learning | to *skateboard.*',
  cameos: CAMEOS,
  group: { cap: 'Zero tricks. | *Full confidence.*' },
  last: {
    text: 'Pisces’ board | *came back home.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      const d = ease.outCubic(prog(lt, 0.5, 1.5))
      if (k > 0.01) signChar(x, t, 'pisces', 400, 1060, 280 * k, { mood: lt > 1.5 ? 'heart' : 'wide', seed: 7, look: [1, 0], tears: 2, hops: [t0 + 1.6, t0 + 2.2] })
      board(x, lerp(1100, 720, d), 1220, 1, { col: '#b7a6ff', spin: t * 8 * (1 - d) })
      if (lt > 1.5) hearts(x, t, 560, 1000, t0 + 1.5, { n: 7, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
