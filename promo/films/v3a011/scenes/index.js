// v3a011: zodiac.advice444, ADVICE SOLO, "Leo, you're allowed | to rest." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): permission to rest, Leo-style, one gag each.
//   0.0–3.6    "Leo, you’re allowed | *to rest.*"  One big Leo pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              the curtain closes: no show today · pajamas all day (nightcap) is still a look · a match texts, Leo is
//              asleep: reply at 9 · party invite stamped RSVP: NAP · even the sun sets (sunset + moon)
//              · the fans hold a TAKE YOUR TIME banner · resting isn't falling behind (battery recharging)
//              · birth chart forecast: NAP · blanket, tea, nothing, with Taurus under the blanket too
//  37.8        "Shine tomorrow. | *Rest tonight.*"  Leo comes back, sleepy.
//  41.0        LESSON UNLOCKED: "Rest is how | the sun *comes back.*"  BATTERY: FULL
//  46.9        "Nap buddy? | *Taurus,* obviously." over the match card: Leo + Taurus (the blanket, paid off).
import { clamp, prog, ease } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', WOOD = '#c98f2a'
const S = 'leo'

// ── props
const CAP = [
  '.........WW',
  '........WWW',
  '.......BB..',
  '.....BBBB..',
  '....BBsBB..',
  '...BBBBBBB.',
  '..BBsBBBsBB',
  'WWWWWWWWWWW',
  'WWWWWWWWWWW',
]
const CAP_C = { B: '#6f8cff', s: '#ffe7a8', W: '#fff4e2' }
const MOON = ['..YYY.', '.YY...', 'YY....', 'YY....', 'YY....', '.YY...', '..YYY.']
const MUG = [
  '.WWWWWW...',
  'WRRRRRRW..',
  'WRRRRRRWWW',
  'WRRWRRRW.W',
  'WRRRRRRWWW',
  'WRRRRRRW..',
  '.WWWWWW...',
]
const MUG_C = { W: '#fff4e2', R: PINK }

// red stage curtains drawn closed over the right half of the panel
function curtains(x, cx, top, bottom, w, p) {
  if (p <= 0.01) return
  const half = w / 2, cover = half * p
  for (const side of [-1, 1]) {
    x.save()
    const edge = cx + side * (half - cover)
    const l = side < 0 ? cx - half : edge, r = side < 0 ? edge : cx + half
    x.fillStyle = INK; x.fillRect(l - 4, top, r - l + 8, bottom - top)
    x.fillStyle = '#b8283a'; x.fillRect(l, top, r - l, bottom - top)
    x.fillStyle = '#8f1d2c'; for (let fx = l + 14; fx < r - 6; fx += 34) x.fillRect(fx, top, 10, bottom - top)
    x.restore()
  }
  x.fillStyle = INK; x.fillRect(cx - half - 10, top - 18, w + 20, 26); x.fillStyle = GOLD; x.fillRect(cx - half - 6, top - 14, w + 12, 18)
}
// a phone with one sleepy-hours message
function phone(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 380)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#2a2350'; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-102, -160, 204, 320)
  x.fillStyle = BONE; x.font = `700 44px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('2:14', 0, -110)
  x.fillStyle = LAV; x.fillRect(-92, -50, 184, 108)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('✦ NEW MATCH', 0, -24)
  x.font = `800 30px ${INTER}`; x.fillText('“you up?”', 0, 18)
  x.restore()
}
// a party invitation card
function invite(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -112, 316, 240)
  x.fillStyle = INK; x.fillRect(-164, -126, 328, 252)
  x.fillStyle = '#fff4e2'; x.fillRect(-156, -118, 312, 236)
  x.fillStyle = PINK; x.fillRect(-156, -118, 312, 54)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `800 30px ${INTER}`; x.fillText('YOU’RE INVITED!', 0, -90)
  x.font = `800 40px ${INTER}`; x.fillText('BIG PARTY', 0, -10)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('tonight · 10 p.m.', 0, 44)
  if (stamp > 0.01) {
    x.save(); x.translate(10, 30); x.rotate(-0.22); x.scale(stamp, stamp)
    x.fillStyle = '#e8fff0'; x.fillRect(-132, -40, 264, 80)
    x.strokeStyle = '#2f9e5a'; x.lineWidth = 8; x.strokeRect(-132, -40, 264, 80)
    x.fillStyle = '#2f9e5a'; x.font = `800 42px ${INTER}`; x.fillText('RSVP: NAP', 0, 2)
    x.restore()
  }
  x.restore()
}
// the sun going down behind a hill line on the right of the panel, then the moon
function sunset(x, cx, horizon, p, moonK) {
  x.save()
  x.beginPath(); x.rect(560, 470, 420, horizon - 470); x.clip()
  const g = x.createLinearGradient(0, 470, 0, horizon)
  g.addColorStop(0, 'rgba(255,143,177,0)'); g.addColorStop(1, `rgba(255,143,177,${(0.45 * (1 - p)).toFixed(3)})`)
  x.fillStyle = g; x.fillRect(560, 470, 420, horizon - 470)
  const sy = horizon - 150 + p * 120
  x.fillStyle = INK; x.beginPath(); x.arc(cx, sy, 112, 0, Math.PI * 2); x.fill()
  x.fillStyle = ORANGE; x.beginPath(); x.arc(cx, sy, 104, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(cx - 24, sy - 24, 54, 0, Math.PI * 2); x.fill()
  x.restore()
  x.fillStyle = INK; x.fillRect(560, horizon - 4, 408, 12); x.fillStyle = "#3a2d70"; x.fillRect(560, horizon + 4, 408, 70)
  drawBits(x, MOON, { Y: '#fff1b0' }, 900, 560, 12 * moonK)
}
// a long banner held up by three small fans
function banner(x, t, lt, P, k) {
  if (k <= 0.01) return
  const ids = ['aries', 'gemini', 'sagittarius'], xs = [620, 790, 960 - 30]
  ids.forEach((id, i) => signChar(x, t, id, xs[i], 1080, 130 * k, { mood: 'happy', seed: 30 + i, glyph: false, hops: [P.t0 + 1.4 + i * 0.15] }))
  x.save(); x.translate(790, 900); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -46, 392, 92); x.fillRect(-170, 40, 10, 90); x.fillRect(160, 40, 10, 90)
  x.fillStyle = BONE; x.fillRect(-190, -40, 380, 80)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAKE YOUR TIME', 0, 2)
  x.restore()
}
// a battery that fills, segment by segment
function battery(x, cx, cy, k, fillP) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -68, 316, 152)
  x.fillStyle = INK; x.fillRect(-160, -80, 320, 160); x.fillRect(160, -34, 34, 68)
  x.fillStyle = BONE; x.fillRect(-148, -68, 296, 136); x.fillRect(160, -24, 22, 48)
  x.fillStyle = '#140c30'; x.fillRect(-136, -56, 272, 112)
  const n = Math.floor(clamp(fillP) * 5)
  for (let i = 0; i < 5; i++) { x.fillStyle = i < n ? MINT : '#2a2350'; x.fillRect(-126 + i * 52, -46, 42, 92) }
  x.restore()
}
// a birth chart wheel with a one-word forecast
function chartWheel(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const COLS = ['#ff6b6b', '#7dffb0', '#ffd23a', '#8fe3ff', ORANGE, '#c9f27a', PINK, '#b07dff', '#ff9f5a', '#9aa7c7', SKYB, LAV]
  x.save(); x.translate(cx, cy); x.rotate(t * 0.15); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 182, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 172, i * Math.PI / 6, (i + 1) * Math.PI / 6); x.closePath(); x.fill() }
  x.strokeStyle = INK; x.lineWidth = 4; for (let i = 0; i < 12; i++) { x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(i * Math.PI / 6) * 172, Math.sin(i * Math.PI / 6) * 172); x.stroke() }
  x.rotate(-t * 0.15)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 92, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 84, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NAP', 0, 3)
  x.restore()
}
// a quilted blanket tucked over the bottom of the panel
function blanket(x, k) {
  if (k <= 0.01) return
  x.save(); x.translate(0, (1 - clamp(k)) * 200)
  const top = 990, l = 150, r = 930
  x.fillStyle = INK; x.fillRect(l - 6, top - 6, r - l + 12, 200)
  const COLS = [LAV, PINK, '#fff4e2', MINT]
  for (let i = 0; i * 78 < r - l; i++) for (let j = 0; j < 3; j++) { x.fillStyle = COLS[(i + j) % 4]; x.fillRect(l + i * 78, top + j * 64, Math.min(78, r - l - i * 78) - 4, 60) }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You don’t have to | *perform today.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -190 }, hops: [1.6],
    front(x, t, lt, P) {
      curtains(x, 790, 490, 1220, 360, ease.inOutCubic(prog(lt, 0.3, 1.2)))
      label(x, 790, 820, 'SHOW’S OFF', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.05 })
      label(x, 790, 900, '(NAP INSTEAD)', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Pajamas all day | *is still a look.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, CAP, CAP_C, F.x + 22, F.top - 4, 12 * pop01(t, P.t0 + 0.3, 0.35, 2.2), { rot: 0.18 })
      label(x, 780, 760, 'OUTFIT: COZY', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 40, bg: LAV, rot: 0.05 })
      label(x, 780, 900, 'STILL ICONIC', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 370, 760, P.t0 + 1.4, 6, 150, 0.4)
    } },
  { sign: S, cap: 'Your match can | *wait till morning.*', mood: 'sleepy', star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, t, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'REPLY AT 9 A.M.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Skipping the party | *is allowed.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 }, hops: [1.5],
    front(x, t, lt, P) {
      invite(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.0, 0.3, 2.4))
      bubble(x, 790, 1080, 'have fun! | (from bed)', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: S, cap: 'Even the sun | *sets every night.*', mood: lt => lt > 1.3 ? 'sleepy' : 'happy', look: [1, 0], star: { x: -200 },
    back(x, t, lt, P) { sunset(x, 790, 1040, ease.inOutCubic(prog(lt, 0.2, 1.4)), pop01(t, P.t0 + 1.7, 0.35, 2)) },
    front(x, t, lt, P) {
      label(x, 790, 1150, 'GOODNIGHT, SUN', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: ORANGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your fans | *will still be here.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -220 }, hops: [1.5],
    front(x, t, lt, P) {
      banner(x, t, lt, P, pop01(t, P.t0 + 0.3, 0.35, 2))
      hearts(x, t, 790, 840, P.t0 + 1.4, { n: 5, life: 1.8, spread: 260, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Resting isn’t | *falling behind.*', mood: 'sleepy', star: { x: -180 },
    front(x, t, lt, P) {
      battery(x, 760, 830, pop01(t, P.t0 + 0.2, 0.3, 2), prog(lt, 0.4, 2.0) + 0.01)
      label(x, 760, 1010, 'RECHARGING…', pop01(t, P.t0 + 0.8, 0.3, 2.2), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your chart today: | *nap.*', mood: lt => lt > 1.3 ? 'sleepy' : 'wide', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chartWheel(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 610, 'TODAY’S FORECAST', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 840, P.t0 + 0.9, 8, 200, 0.3)
    } },
  { sign: S, cap: 'Blanket. Tea. Nothing. | *Perfect plans.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', star: { x: -190, y: 30 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 700, 920, 230 * k, { mood: lt > 1.2 ? 'sleepy' : 'happy', look: [-1, 0], seed: 15, glyph: false })
      blanket(x, prog(lt, 0.8, 1.3))
      drawBits(x, MUG, MUG_C, 880, 940, 9 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 600, 620, 'PLANS: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'v3a011', key: 'D', accent: ORANGE, solo: S,
  title: 'Leo, you’re allowed | *to rest.*',
  cameos: CAMEOS,
  card: { a: 'leo', b: 'taurus', chip: 'ALIGNED' },
  group: { cap: 'Shine tomorrow. | *Rest tonight.*', mood: 'sleepy' },
  lesson: { text: 'Rest is how | the sun *comes back.*', chip: 'BATTERY: FULL' },
  last: {
    text: 'Nap buddy? | *Taurus,* obviously.',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
