// v3a014: zodiac.advice444, ADVICE SOLO, "What Cancers need | in love." (~51 s vertical, signs3kit social cut, music: lofi · G)
// One sign the whole way through (makeFilm solo mode, 9 cards): what a Cancer's heart needs from a partner, one gag each.
//   0.0–3.6    "What Cancers need | *in love.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              a "good morning" note on the mirror · someone who remembers their favourite snack · a partner who
//              unpacks the suitcase: STAYING · an umbrella on a rainy-cloud day (Taurus holds it) · inside jokes
//              ("…the duck!") · a porch light left on · showing up, ticked off day after day · someone who keeps the
//              photos too (an album) · big feelings met with a hug: HUG EXTENDED
//  37.8        "Gentle. | *And all in.*"  Cancer comes back, big.
//  41.2        CALLBACK ending: "Umbrella duty: | *Taurus. Always.*"  The rain cloud returns; Taurus holds the umbrella over Cancer.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, HEART,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SILVER = '#cfe3ff', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a'
const S = 'cancer', P2 = 'taurus'

// ── props
const SUITCASE = [
  '....KKKK....',
  '....K..K....',
  'RRRRRRRRRRRR',
  'RRRRRRRRRRRR',
  'RRYRRRRRRYRR',
  'RRRRRRRRRRRR',
  'RRRRRRRRRRRR',
  'RRYRRRRRRYRR',
  'RRRRRRRRRRRR',
  '.K........K.',
]
const SHIRT = [
  '....K....',
  '...K.K...',
  'SSS...SSS',
  'SSSSSSSSS',
  'SSSSSSSSS',
  '.SSSSSSS.',
  '..SSSSS..',
  '..SSSSS..',
  '..SSSSS..',
  '..SSSSS..',
]
const SUITCASE_C = { K: INK, R: '#6f8cff', Y: GOLD }
const LAMP = [
  '..YYYYY..',
  '.YYWWWYY.',
  'YYWWWWWYY',
  '.YYWWWYY.',
  '..YYYYY..',
  '....K....',
  '....K....',
  '....K....',
  '....K....',
  '...KKK...',
]
const LAMP_C = { Y: GOLD, W: '#fff6c8', K: '#3a3050' }
const BAG = [
  '.WWWWWWWW.',
  'WOOOOOOOOW',
  'WOOOOOOOOW',
  'WOYYYYYYOW',
  'WOYRRRRYOW',
  'WOYYYYYYOW',
  'WOOOOOOOOW',
  'WOOOOOOOOW',
  '.WWWWWWWW.',
]
const BAG_C = { W: '#fff4e2', O: ORANGE, Y: GOLD, R: RED }

// a sticky note on a round mirror
function mirrorNote(x, cx, cy, k, nk) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 190, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = WOOD; x.beginPath(); x.ellipse(0, 0, 142, 182, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#bfe3ff'; x.beginPath(); x.ellipse(0, 0, 122, 162, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-80, -120, 20, 90); x.fillRect(-50, -130, 12, 60)
  if (nk > 0.01) {
    x.save(); x.translate(10, 20); x.rotate(0.08); x.scale(nk, nk)
    x.fillStyle = INK; x.fillRect(-98, -78, 196, 156); x.fillStyle = '#fff59a'; x.fillRect(-92, -72, 184, 144)
    x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('good', 0, -34); x.fillText('morning,', 0, 2); x.fillText('you ♥︎', 0, 38)
    x.restore()
  }
  x.restore()
}
// a small grey rain cloud with drops, over the star's head
function rainCloud(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const puff = (px, py, r) => { x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; for (const [px, py, r] of [[-60, 0, 50], [0, -24, 62], [60, 0, 50]]) puff(px, py, r + 6)
  x.fillStyle = '#9aa7c7'; for (const [px, py, r] of [[-60, 0, 50], [0, -24, 62], [60, 0, 50]]) puff(px, py, r)
  x.restore()
  for (let i = 0; i < 7; i++) {
    const ph = (t * 1.6 + i / 7) % 1, dx = cx + (i - 3) * 26 * k, dy = cy + 50 * k + ph * 200
    x.globalAlpha = Math.sin(Math.PI * ph) * clamp(k); x.fillStyle = SKYB; x.fillRect(dx, dy, 6, 18); x.globalAlpha = 1
  }
}
// an umbrella held up by the partner
function umbrella(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.25); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 176, Math.PI, 0); x.closePath(); x.fill()
  const COLS = [PINK, '#fff4e2', PINK, '#fff4e2', PINK]
  for (let i = 0; i < 5; i++) { x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 168, Math.PI + i * Math.PI / 5, Math.PI + (i + 1) * Math.PI / 5); x.closePath(); x.fill() }
  x.fillStyle = INK; x.fillRect(-6, 0, 12, 230); x.fillRect(-6, 220, 40, 12)
  x.restore()
}
// a checklist that ticks itself
function checklist(x, cx, cy, k, n) {
  if (k <= 0.01) return
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI']
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -176, 316, 370)
  x.fillStyle = INK; x.fillRect(-162, -188, 324, 376)
  x.fillStyle = '#fff4e2'; x.fillRect(-154, -180, 308, 360)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('SHOWED UP:', -126, -144)
  days.forEach((d, i) => {
    const y = -88 + i * 60
    x.fillStyle = INK; x.fillRect(-126, y - 20, 40, 40); x.fillStyle = '#fff4e2'; x.fillRect(-121, y - 15, 30, 30)
    if (i < n) { x.fillStyle = '#2f9e5a'; x.fillRect(-118, y - 2, 10, 10); x.fillRect(-110, y + 4, 10, 10); x.fillRect(-102, y - 6, 10, 10); x.fillRect(-94, y - 14, 10, 10) }
    x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.fillText(d, -66, y + 2)
  })
  x.restore()
}
// an open photo album: four little photos of two stars
function album(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-200, -130, 416, 280)
  x.fillStyle = INK; x.fillRect(-212, -142, 424, 284)
  x.fillStyle = '#b8283a'; x.fillRect(-206, -136, 412, 272)
  x.fillStyle = '#fff4e2'; x.fillRect(-194, -124, 186, 248); x.fillRect(8, -124, 186, 248)
  const spots = [[-150, -64], [-52, 40], [52, -64], [150, 40]]
  spots.forEach(([px, py], i) => {
    x.fillStyle = INK; x.fillRect(px - 44, py - 48, 88, 96); x.fillStyle = ['#ffd6e6', '#d6f0ff', '#e6ffd6', '#fff1c8'][i]; x.fillRect(px - 39, py - 43, 78, 72)
    signChar(x, t, S, px - 14, py - 8, 44, { mood: 'happy', seed: 60 + i, glyph: false, glow: 0.3 })
    signChar(x, t, P2, px + 16, py - 8, 44, { mood: 'happy', seed: 70 + i, glyph: false, glow: 0.3 })
  })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'A good morning note. | *Every morning.*', mood: lt => lt > 1.3 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P) {
      mirrorNote(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 0.8, 0.3, 2.4))
      hearts(x, t, 380, 780, P.t0 + 1.4, { n: 4, life: 1.6, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: S, cap: 'They remember | *your favourite snack.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, P2, 820, 990, 200 * k, { mood: 'happy', look: [-1, 0], seed: 15, glyph: false })
      drawBits(x, BAG, BAG_C, 650, 950, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: -0.12 })
      bubble(x, 800, 650, 'got your | favourite!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 34, tail: 'bc' })
      sparkles(x, t, 650, 950, P.t0 + 1.4, 7, 120, 0.4)
    } },
  { sign: S, cap: 'A love that | *unpacks the suitcase.*', mood: lt => lt > 1.5 ? 'heart' : 'neutral', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const open = prog(lt, 0.8, 1.4)
      drawBits(x, SUITCASE, SUITCASE_C, 790, 960, 18 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: 0.04 })
      const rk = pop01(t, P.t0 + 0.9, 0.3, 1.6)
      if (rk > 0.01) {
        x.save(); x.globalAlpha = clamp(rk); x.fillStyle = INK; x.fillRect(620, 640, 340, 10); x.restore()
        const COLS = [PINK, MINT, GOLD]
        COLS.forEach((c, i) => {
          const k = pop01(t, P.t0 + 1.0 + i * 0.15, 0.3, 2)
          if (k > 0.01) drawBits(x, SHIRT, { S: c, K: INK }, 680 + i * 110, 715, 9 * k)
        })
      }
      label(x, 790, 1120, 'UNPACKED. STAYING.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Rainy day? | *Umbrella’s here.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: lt => lt > 1.3 ? [1, 0] : [0, -1], star: { x: -170 },
    front(x, t, lt, P) {
      rainCloud(x, t, 370, 580, pop01(t, P.t0 + 0.1, 0.3, 2) * (1 - ease.inCubic(prog(lt, 1.8, 2.3))))
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, P2, 760, 990, 200 * k, { mood: 'happy', look: [-1, 0], seed: 16, glyph: false, hops: [P.t0 + 0.9] })
      umbrella(x, lerp(700, 450, ease.inOutCubic(prog(lt, 0.8, 1.3))), 720, pop01(t, P.t0 + 0.8, 0.35, 2))
    } },
  { sign: S, cap: 'Inside jokes | *only you two get.*', mood: lt => Math.floor(lt * 3) % 2 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 }, hops: [0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, P2, 810, 980, 210 * k, { mood: Math.floor(lt * 3) % 2 ? 'happy' : 'squint', look: [-1, 0], seed: 17, glyph: false, hops: [P.t0 + 0.9, P.t0 + 1.3, P.t0 + 1.7] })
      bubble(x, 600, 620, '…the DUCK!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bc' })
      label(x, 600, 1140, 'NOBODY ELSE GETS IT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Someone who leaves | *the light on.*', mood: lt => lt > 1.4 ? 'heart' : 'sleepy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    back(x, t, lt, P) {
      const on = clamp((lt - 0.7) * 3)
      if (on > 0) { const g = x.createRadialGradient(790, 760, 10, 790, 760, 360); g.addColorStop(0, `rgba(255,236,160,${(0.45 * on).toFixed(3)})`); g.addColorStop(1, 'rgba(255,236,160,0)'); x.fillStyle = g; x.fillRect(110, 480, 860, 740) }
    },
    front(x, t, lt, P) {
      const on = lt > 0.7
      drawBits(x, LAMP, on ? LAMP_C : { Y: '#6b6280', W: '#8a8aa0', K: '#3a3050' }, 790, 860, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1140, 'HOME SAFE? ♥︎', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'A good match is nice. | *Showing up* is nicer.', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      checklist(x, t, 0, 0, 0)
      checklistReal(x, t, lt, P)
    } },
  { sign: S, cap: 'Someone who keeps | *the photos too.*', mood: 'heart', star: { x: -10, y: 200, s: 200 }, hops: [1.4],
    front(x, t, lt, P) {
      album(x, t, 540, 760, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1110, 'VOL. 3', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Big feelings, | *met with a hug.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: lt => 0, s: 300 },
    front(x, t, lt, P) {},
  },
]
// card 7's real draw (kept separate so the checklist reads its own clock)
function checklistReal(x, t, lt, P) {
  checklist(x, 780, 850, pop01(t, P.t0 + 0.2, 0.35, 2), Math.floor(clamp((lt - 0.5) / 1.3) * 5.99))
  sparkles(x, t, 780, 850, P.t0 + 1.9, 7, 210, 0.3)
}
// card 9: the partner slides in from the right and they squish into a hug
CAMEOS[8] = { sign: S, cap: 'Big feelings, | *met with a hug.*', mood: lt => lt > 1.0 ? 'heart' : 'neutral', look: [1, 0], star: { x: -150 },
  squash: lt => lt > 1.0 && lt < 2.4 ? 0.08 : 0,
  front(x, t, lt, P) {
    const k = pop01(t, P.t0 + 0.3, 0.35, 2), slide = ease.inOutCubic(prog(lt, 0.4, 1.0))
    if (k > 0.01) signChar(x, t, P2, lerp(900, 610, slide), 880, 280 * k, { mood: lt > 1.0 ? 'heart' : 'happy', look: [-1, 0], seed: 18, glyph: false, squash: lt > 1.0 ? 0.08 : 0 })
    label(x, 540, 1140, 'HUG: EXTENDED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 40, bg: GOLD, rot: -0.04 })
    hearts(x, t, 500, 760, P.t0 + 1.1, { n: 7, life: 2.0, spread: 280, cell: 8, seed: 6 })
  } }
CAMEOS[6].front = function (x, t, lt, P) { checklistReal(x, t, lt, P) }

const F = makeFilm({
  id: 'v3a014', key: 'G', accent: SILVER, solo: S,
  title: 'What Cancers need | *in love.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Gentle. | *And all in.*', mood: 'heart' },
  last: {
    text: 'Umbrella duty: | *Taurus. Always.*',
    draw(x, t, lt) {
      const t0 = t - lt
      rainCloud(x, t, 540, 760, 1.4 * pop01(t, t0 + 0.2, 0.35, 2))
      const a = pop01(t, t0 + 0.4, 0.4, 1.8), b = pop01(t, t0 + 0.55, 0.4, 1.8)
      if (a > 0.01) signChar(x, t, S, 400, 1250, 320 * a, { mood: 'heart', look: [1, 0], seed: 81, glyph: false })
      if (b > 0.01) signChar(x, t, P2, 690, 1250, 320 * b, { mood: 'happy', look: [-1, 0], seed: 82, glyph: false, hops: [t0 + 1.3] })
      umbrella(x, 600, 1000, 1.4 * pop01(t, t0 + 1.0, 0.35, 2))
      hearts(x, t, 540, 1200, t0 + 1.4, { n: 6, life: 2.0, spread: 300, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
