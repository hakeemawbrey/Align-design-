// r2t0126: star_talk, SOLO, "Pisces making plans | be like." (~51 s vertical, signs3kit social cut, music: lofi · C)
// The whole film is one sign (makeFilm solo mode, 9 cards); Pisces cries in every card.
//   0.0–3.6    "Pisces making plans | *be like.*"
//   3.6–37.8   "let's hang soon" (meant spiritually) · already lived the plan in a daydream · late, lost in a sunset
//              · said yes to three plans, same night · plans cancelled, tears of relief · picked the café by its vibe
//              · the group chat set a time, Pisces set a mood · a first coffee with a match, wrote them a song
//              · "I'm on my way" (still in bed)
//  37.8        "Every plan. | *A daydream.*"
//  41.0        LESSON: "Love a Pisces? | Leave *room to float.*"  PLANS: FLEXIBLE
//  46.9        "See you at seven. | *Ish.*"  The sunset comes back.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#6fc3ff', RED = '#e23d4e', ORANGE = '#ffb34a', CREAM = '#fff4e2'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// a calendar page with no date on it, only a little cloud
function calendar(x, cx, cy, k, lt, crossed = 0) {
  if (!card(x, cx, cy, 320, 330, BONE, k, 0.04)) return
  x.fillStyle = RED; x.fillRect(-160, -165, 320, 60)
  x.fillStyle = CREAM; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SOMEDAY', 0, -134)
  // a little cloud where the date should be
  x.fillStyle = '#c9d6f0'; for (const [a, b, r] of [[-40, 30, 46], [10, 10, 58], [60, 34, 42]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fill() }
  x.fillRect(-80, 34, 180, 40)
  if (crossed > 0) {
    x.strokeStyle = RED; x.lineWidth = 22; x.lineCap = 'round'
    const p = clamp(crossed)
    x.beginPath(); x.moveTo(-120, -80); x.lineTo(-120 + 240 * p, -80 + 220 * p); x.stroke()
    if (p > 0.5) { const q = (p - 0.5) * 2; x.beginPath(); x.moveTo(120, -80); x.lineTo(120 - 240 * q, -80 + 220 * q); x.stroke() }
  }
  x.restore()
}
// a setting sun over a striped sea
function sunset(x, t, cx, cy, k, r = 130) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.beginPath(); x.rect(-r - 20, -r - 30, 2 * r + 40, r + 30); x.clip()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, Math.PI, 0); x.fill()
  const bands = [ORANGE, '#ff8a5c', PINK]
  for (let i = 0; i < 3; i++) { x.fillStyle = bands[i]; x.beginPath(); x.arc(0, 0, r - i * 36, Math.PI, 0); x.fill() }
  x.restore()
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.fillRect(-r - 30 + i * 18, 6 + i * 26, 2 * r + 60 - i * 36, 16); x.fillStyle = i % 2 ? SKYB : SEA; x.fillRect(-r - 26 + i * 18 + 8 * Math.sin(t * 2 + i), 9 + i * 26, 2 * r + 52 - i * 36, 10) }
  x.restore()
}
// a phone with three "yes!!" replies stacking up
function phone(x, cx, cy, k, lines, lt) {
  if (!card(x, cx, cy, 280, 440, '#2a2350', k, 0.05)) return
  x.fillStyle = '#140c30'; x.fillRect(-124, -196, 248, 372)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => {
    if (lt < 0.3 + i * 0.4) return
    const y = -140 + i * 120
    x.fillStyle = INK; x.fillRect(-114, y - 46, 228, 98); x.fillStyle = i % 2 ? LAV : SKYB; x.fillRect(-108, y - 40, 216, 86)
    x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText(l[0], 0, y - 14); x.font = `800 32px ${INTER}`; x.fillText(l[1], 0, y + 20)
  })
  x.restore()
}
// a mood board: candles, fairy lights, a moon
const CANDLE = ['..F..', '.FYF.', '..F..', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW', 'WWWWW']
const CANDLE_C = { F: ORANGE, Y: GOLD, W: CREAM }
const BED = ['PP..............', 'PPLLLLLLLLLLLLLL', 'PPLLLLLLLLLLLLLL', 'PPBBBBBBBBBBBBBB', 'PPBBBBBBBBBBBBBB', 'PP............PP']
const BED_C = { P: '#8a4a2e', L: LAV, B: '#6b62a8' }
const CUP = ['.S.S..', 'S.S...', 'WWWWWW', 'WCCCCWWW', 'WCCCCW.W', 'WCCCCWWW', '.WWWW...']
const CUP_C = { S: '#c9d6f0', W: CREAM, C: '#8a4a2e' }

const S = 'pisces'
const CAMEOS = [
  // 1 · friends: "let's hang soon"
  { sign: S, cap: 'Said “let’s hang soon.” | Meant it *spiritually.*', mood: lt => lt < 1.0 ? 'happy' : 'sparkle', look: [1, 0], tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      calendar(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 760, 600, 'soon!', pop01(t, P.t0 + 0.35, 0.25, 2.2), { size: 46, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'DATE: IN THE STARS', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 30, bg: SEA, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 2 · at home: the plan, already lived in a daydream
  { sign: S, cap: 'Made a plan. | Already *lived it.*', mood: lt => lt < 1.4 ? 'sleepy' : 'wide', tears: lt => lt < 1.4 ? 2 : 1, star: { x: -180, y: 30 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) { const d = pop01(t, P.t0 + 0.15 + i * 0.1, 0.2, 2); const r = (7 + i * 5) * d; x.fillStyle = BONE; if (d > 0.01) x.fillRect(480 + i * 55 - r, 760 - i * 50 - r, 2 * r, 2 * r) }
      bubble(x, 770, 640, 'it was | beautiful', pop01(t, P.t0 + 0.4, 0.25, 2.2) * (lt < 1.4 ? 1 : 0), { size: 42, col: LAV, tail: 'bl' })
      if (lt >= 1.4) bubble(x, 770, 640, 'wait. we | didn’t go?', pop01(t, P.t0 + 1.45, 0.25, 2.2), { size: 42, tail: 'bl' })
      label(x, 790, 1080, 'PLAN: IMAGINED', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 3 · on the way: lost in a sunset
  { sign: S, cap: 'Running late. | Stopped for *a sunset.*', mood: lt => lt < 1.2 ? 'sparkle' : 'heart', look: [1, -1], tears: lt => lt < 1.2 ? 1 : 2, star: { x: -190, y: 40 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sunset(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1080, 'ETA: ???', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: PINK, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 780, 600, 'u here?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      sparkles(x, t, 780, 800, P.t0 + 0.6, 6, 170, 0.3)
    } },
  // 4 · phone: three plans, same night
  { sign: S, cap: 'Said yes to three plans. | *Same night.*', mood: lt => lt < 1.5 ? 'happy' : 'wide', tears: lt => lt < 1.5 ? 1 : 3, look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      phone(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), [['BRUNCH 7PM', 'yes!!'], ['MOVIE 7PM', 'yes!!'], ['PARTY 7PM', 'yes!!']], lt)
      label(x, 790, 1120, 'OOPS: 3', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 40, bg: RED, color: CREAM, rot: -0.05, font: MONO, weight: 700 })
    } },
  // 5 · home: plans cancelled
  { sign: S, cap: 'Plans got cancelled. | *Tears of relief.*', mood: lt => lt < 1.0 ? 'wide' : 'heart', tears: lt => lt < 1.0 ? 1 : 3, star: { x: -180, y: 20 },
    front(x, t, lt, P) {
      calendar(x, 790, 840, pop01(t, P.t0 + 0.15, 0.3, 2), lt, prog(lt, 0.5, 1.0))
      label(x, 790, 1100, 'BLANKET: ON', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 36, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 380, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 5 })
    } },
  // 6 · out: the café is chosen by vibe
  { sign: S, cap: 'Picked the café | by its *vibe.*', mood: lt => lt < 1.1 ? 'squint' : 'sparkle', look: [1, 0], tears: 1, star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 780, 620, 'it feels | purple', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 1110, 'MENU: UNREAD', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 7 · group chat: everyone sets a time, Pisces sets a mood
  { sign: S, cap: 'Chat picked a time. | Pisces picked *a mood.*', mood: 'heart', look: [1, 0], tears: 2, star: { x: -180 },
    front(x, t, lt, P) {
      bubble(x, 790, 610, 'Sat, 7pm?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'br' })
      for (let i = 0; i < 3; i++) drawBits(x, CANDLE, CANDLE_C, 690 + i * 100, 900 - (i % 2) * 30, 16 * pop01(t, P.t0 + 0.7 + i * 0.15, 0.3, 2), { rot: 0.04 * Math.sin(t * 3 + i) })
      label(x, 790, 1100, 'VIBE: CANDLELIT', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 880, P.t0 + 1.0, 6, 170, 0.6)
    } },
  // 8 · Align: a first coffee with a match
  { sign: S, cap: 'First coffee with a match. | Wrote *a song.*', mood: lt => lt < 1.0 ? 'sparkle' : 'heart', tears: lt => lt < 1.0 ? 1 : 2, look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      label(x, 790, 600, '✦ MATCH: CANCER', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      if (card(x, 790, 860, 300, 300, CREAM, pop01(t, P.t0 + 0.5, 0.3, 2), 0.05)) {
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 3; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(-120, -90 + i * 22); x.lineTo(120, -90 + i * 22); x.stroke() }
        x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 40px ${INTER}`; x.fillText('“Ode to', 0, 46); x.fillText('a Latte”', 0, 94)
        x.restore()
      }
      notes(x, t, 400, 760, { n: 4, cell: 8, col: PINK, seed: 3, alpha: clamp(lt - 0.8) })
      label(x, 790, 1110, 'TRACK 1 OF 12', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 9 · "on my way" (still in bed)
  { sign: S, cap: '“On my way!” | *Still in bed.*', mood: lt => lt < 1.2 ? 'sleepy' : 'wide', tears: lt => lt < 1.2 ? 1 : 2, star: { x: -150, y: 10 },
    back(x, t, lt, P) { drawBits(x, BED, BED_C, 560, 1050, 30 * pop01(t, P.t0 + 0.05, 0.3, 2)) },
    front(x, t, lt, P) {
      bubble(x, 790, 620, 'on my | way!!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bl' })
      label(x, 800, 820, 'DISTANCE: 0 M', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0126', key: 'C', accent: SEA, solo: 'pisces', ending: 'lesson',
  title: 'Pisces making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Every plan. | *A daydream.*', mood: 'heart' },
  lesson: { text: 'Love a Pisces? | Leave *room to float.*', chip: 'PLANS: FLEXIBLE' },
  last: {
    text: 'See you at seven. | *Ish.*',
    draw(x, t, lt) { sunset(x, t, 540, 1330, pop01(t, t - lt + 0.6, 0.4, 2), 150); sparkles(x, t, 540, 1240, t - lt + 0.9, 8, 200, 0.2) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
