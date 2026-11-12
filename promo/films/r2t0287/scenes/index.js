// r2t0287: star_talk, BE LIKE, "Zodiacs binging TV | *be like.*" (topic: zodiacs binge-watching a show) (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, each the most extreme binge-watcher of itself. Ending: lesson.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ whole season before dinner · ♉ snacks for one episode: seven bowls · ♊ four shows at once
//              · ♋ shared their comfort show on date one · ♌ paused it to act the scene (take 2) · ♍ spotted a continuity error
//              · ♎ two hours choosing what to watch · ♏ guessed the twist in episode one · ♐ skipped the intro (and episode two)
//              · ♑ allowed one episode, it's 4 a.m. · ♒ did the villain's birth chart · ♓ cried at the trailer
//  49.2        "Just one | *more episode.*"
//  52.4        LESSON: "Rest counts, | even *in pyjamas.*"  EPISODE: NEXT
//  58.3        "Season two? | *Already started.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', TEAL = '#5ad1c8'

// ── props
/** a pixel TV; inner(x) draws on the screen, in screen coordinates centred on 0,0 (screen is 280 × 190) */
function tv(x, cx, cy, k, inner, { rot = 0.03, s = 1, body = '#4a3a6a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-162, -118, 340, 250)
  x.fillStyle = INK; x.fillRect(-170, -130, 340, 250); x.fillStyle = body; x.fillRect(-160, -120, 320, 230)
  x.fillStyle = '#140c30'; x.fillRect(-140, -100, 280, 190)
  x.fillStyle = INK; x.fillRect(-60, 120, 20, 40); x.fillRect(40, 120, 20, 40)
  x.save(); x.beginPath(); x.rect(-140, -100, 280, 190); x.clip(); x.translate(0, -5)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  inner(x)
  x.restore(); x.restore()
}
const BOWL = ['.YWYYWYWYYWY.', 'YYYYYYYYYYYYY', 'RRRRRRRRRRRRR', '.RRRRRRRRRRR.', '..RRRRRRRRR..', '....KKKKK....']
const TISSUE = ['....WW....', '...WWWW...', 'BBBBBBBBBB', 'BBBKKKKBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.font = `800 ${r * 0.6}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.rotate(-t * 0.3); x.fillText('?', 0, 4)
  x.restore()
}
function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  const am = m / 60 * Math.PI * 2 - Math.PI / 2, ah = (h % 12 + m / 60) / 12 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * r * 0.5, Math.sin(ah) * r * 0.5); x.stroke()
  x.lineWidth = 6; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * r * 0.78, Math.sin(am) * r * 0.78); x.stroke()
  x.restore()
}
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
const POSTER_C = [PINK, MINT, SKYB, GOLD, LAV, ORANGE, TEAL, RED]

const CAMEOS = [
  { sign: 'aries', cap: 'Finished the whole season. | *Before dinner.*', mood: lt => lt > 1.6 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [0.5, 1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = Math.min(10, 1 + Math.floor(Math.max(0, lt - 0.3) / 0.13))
      tv(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.fillText(`EPISODE ${n}/10`, 0, -30)
        x.fillStyle = INK; x.fillRect(-110, 20, 220, 26); x.fillStyle = RED; x.fillRect(-106, 24, 212 * (n / 10), 18)
      })
      label(x, 800, 620, n >= 10 ? 'DINNER: NOT YET' : '▶▶ 2× SPEED', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: n >= 10 ? MINT : GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Snacks for one episode. | *Seven bowls.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', star: { x: -170 },
    back(x, t, lt, P) {
      for (let i = 0; i < 7; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.14, 0.3, 2)
        drawBits(x, BOWL, { Y: i % 2 ? '#ffe7a8' : '#ffd23a', W: '#fff4e2', R: POSTER_C[i], K: '#8a4a2e' }, 680 + (i % 3) * 120, 1120 - Math.floor(i / 3) * 92, 13 * k)
      }
    },
    front(x, t, lt, P) {
      label(x, 790, 640, 'SNACKS: 7 · EPISODES: 1', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Watching four shows. | *At once.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const POS = [[680, 720], [890, 720], [680, 980], [890, 980]]
      POS.forEach(([cx, cy], i) => tv(x, cx, cy, pop01(t, P.t0 + 0.2 + i * 0.18, 0.3, 2), x => {
        x.fillStyle = POSTER_C[(i * 2 + Math.floor(lt * 4)) % 8]; x.fillRect(-140, -100, 280, 200)
        x.fillStyle = INK; x.font = `800 70px ${INTER}`; x.fillText(String(i + 1), 0, 4)
      }, { s: 0.55, rot: (i % 2 ? 1 : -1) * 0.05 }))
    } },
  { sign: 'cancer', cap: 'First date? | Their *comfort show.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'IT’S A MATCH', headCol: PINK, lines: [
        ['hi :)', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['date idea:', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2), true],
        ['my show, ep 1', SKYB, pop01(t, P.t0 + 1.1, 0.25, 2.2), true],
        ['(seen it 30×)', SKYB, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
      hearts(x, t, 560, 820, P.t0 + 1.6, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Paused it to | *act the scene.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -170 }, hops: [1.0, 1.6],
    front(x, t, lt, P) {
      tv(x, 790, 760, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = BONE; x.fillRect(-30, -40, 22, 80); x.fillRect(8, -40, 22, 80)
      }, { s: 0.8 })
      bubble(x, 560, 590, '“I’ll never | let go!”', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 40, col: '#ffe08a', tail: 'bl' })
      label(x, 790, 1060, 'TAKE 2 · BIGGER', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: ORANGE, rot: 0.05, font: MONO, weight: 700 })
      sparkles(x, t, 370, 860, P.t0 + 1.1, 6, 180, 0.2)
    } },
  { sign: 'virgo', cap: 'The cup moved between shots. | *Emailed them.*', mood: lt => lt > 1.4 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        const cx = lt > 0.9 ? 60 : -60
        x.fillStyle = INK; x.fillRect(-140, 40, 280, 50); x.fillStyle = '#c98f5a'; x.fillRect(-140, 44, 280, 46)
        x.fillStyle = INK; x.fillRect(cx - 26, -10, 52, 56); x.fillStyle = BONE; x.fillRect(cx - 20, -4, 40, 48)
        if (lt > 0.9) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.arc(cx, 18, 50, 0, Math.PI * 2); x.stroke() }
      })
      label(x, 790, 1070, 'ERROR: REPORTED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Two hours | *choosing what to watch.*', mood: lt => lt > 1.8 ? 'sleepy' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      tv(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        const off = (lt * 160) % 70
        for (let r = -1; r < 4; r++) for (let c = 0; c < 4; c++) { x.fillStyle = POSTER_C[(r * 4 + c + 40) % 8]; x.fillRect(-128 + c * 66, -90 + r * 70 - off, 54, 60) }
      })
      label(x, 790, 1090, 'STILL SCROLLING', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Guessed the twist | in *episode one.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 770, 650, 'it’s the aunt.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      tv(x, 800, 930, pop01(t, P.t0 + 0.7, 0.3, 2), x => { x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.fillText('EPISODE 1', 0, -20); x.fillText('00:04', 0, 26) }, { s: 0.75 })
      label(x, 800, 1120, 'CALLED IT', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: '#c97bff', color: BONE, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Skipped the intro. | And *episode two.*', mood: lt => lt > 1.4 ? 'happy' : 'sparkle', star: { x: -170 }, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      tv(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.fillText(lt > 1.2 ? 'EPISODE 3' : 'EPISODE 1', 0, -10)
      })
      label(x, 830, 1060, lt > 1.2 ? 'SKIP EPISODE ▶▶' : 'SKIP INTRO ▶', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Allowed one episode. | It’s *4 a.m.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const m = Math.floor(clamp((lt - 0.3) / 1.1) * 300)
      clock(x, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.3, 2), 23 + Math.floor(m / 60), m % 60)
      label(x, 790, 1090, lt > 1.4 ? 'EPISODE 9 OF “1”' : 'JUST ONE.', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: lt > 1.4 ? LAV : MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Did the villain’s birth chart. | *Explains a lot.*', mood: lt => lt > 1.4 ? 'wink' : 'sparkle', star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 790, 140, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      label(x, 790, 1060, 'VILLAIN: SCORPIO MOON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the trailer. | *The trailer.*', mood: 'wide', tears: lt => lt > 0.7 ? 3 : 1, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tv(x, 800, 760, pop01(t, P.t0 + 0.2, 0.3, 2), x => { x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.fillText('TRAILER', 0, -16); x.fillStyle = MINT; x.fillText('0:30', 0, 30) }, { s: 0.75 })
      drawBits(x, TISSUE, { W: '#fff8ea', B: SKYB, K: INK }, 800, 1050, 26 * pop01(t, P.t0 + 0.9, 0.3, 2))
      label(x, 800, 600, 'TISSUES: OUT', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0287', key: 'E', accent: TEAL, ending: 'lesson',
  title: 'Zodiacs binging TV | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Just one | *more episode.*' },
  lesson: { text: 'Rest counts, | even *in pyjamas.*', chip: 'EPISODE: NEXT' },
  last: {
    text: 'Season two? | *Already started.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
