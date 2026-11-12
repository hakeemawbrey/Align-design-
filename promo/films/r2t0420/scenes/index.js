// r2t0420: star_talk, BELIKE, "House finally clean? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · F)
// Twelve signs in zodiac order, each one's most extreme reaction to the house finally being clean. Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ cleaned it in four minutes, badly · ♉ lit a candle, refuses to move · ♊ cleaned half, got distracted
//              · ♋ invited everyone over to see it · ♌ waiting for applause · ♍ found one crumb, started over
//              · ♎ rearranged the cushions for three hours · ♏ the whole mess is in one cupboard · ♐ now can't find anything
//              · ♑ made a chore chart for the guests · ♒ sorted the books by colour · ♓ so clean, happy tears
//  49.2        "Clean for | *one whole day.*"
//  52.6        callback: "Until someone | *opened it.*"  Scorpio's cupboard bursts.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', WOOD = '#c98f2a', ACC = '#7fe0d0'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
const ST = { x: -170 }

// ── props
const SOCK = ['.RRR', '.RWR', '.RRR', '.RRR', 'RRRR', 'RRR.']
const CANDLE = ['...F...', '..FYF..', '...K...', '.CCCCC.', '.CCCCC.', '.CCCCC.', '.CCCCC.']
const CUSHION = ['.PPPPPP.', 'PPPPPPPP', 'PPPWPPPP', 'PPPPPPPP', '.PPPPPP.']
const CRUMB = ['.CC', 'CCC', 'CC.']
const DOOR = ['KKKKKKK', 'KDDDDDK', 'KDDDDDK', 'KDDDDDK', 'KDDDYDK', 'KDDDDDK', 'KDDDDDK', 'KKKKKKK']

/** a broom with a speed blur */
function broom(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.5 * Math.sin(t * 16)); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-8, -200, 16, 200); x.fillStyle = WOOD; x.fillRect(-4, -196, 8, 192)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-50, 0); x.lineTo(50, 0); x.lineTo(70, 90); x.lineTo(-70, 90); x.fill()
  x.fillStyle = '#e7c35a'; x.beginPath(); x.moveTo(-42, 8); x.lineTo(42, 8); x.lineTo(60, 82); x.lineTo(-60, 82); x.fill()
  x.restore()
}
/** a cupboard; burst (0..1) swings the door open and stuff spills out */
function cupboard(x, t, cx, cy, k, burst) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -190, 300, 380); x.fillStyle = WOOD; x.fillRect(-140, -180, 280, 360)
  x.fillStyle = '#5b2e1a'; x.fillRect(-130, -170, 260, 340)
  x.fillStyle = INK; x.fillRect(-4, -180, 8, 360)
  const open = ease.outBack ? clamp(ease.outBack(burst)) : burst
  x.fillStyle = INK; x.fillRect(4, -180, 136 * (1 - open) + 6, 360); x.fillStyle = '#d59a4a'; x.fillRect(8, -176, 130 * (1 - open), 352)
  x.fillStyle = INK; x.fillRect(-140, -176, 132, 352); x.fillStyle = '#d59a4a'; x.fillRect(-136, -172, 124, 344)
  x.fillStyle = GOLD; x.fillRect(-30, -10, 14, 30); if (open < 0.5) x.fillRect(16, -10, 14, 30)
  if (burst > 0) {
    const STUFF = [[SOCK, { R: RED, W: '#fff' }], [CUSHION, { P: PINK, W: '#fff' }], [CANDLE, { F: ORANGE, Y: '#ffe76a', K: INK, C: CREAM }], [SOCK, { R: MINT, W: '#fff' }], [CUSHION, { P: SKYB, W: '#fff' }], [SOCK, { R: GOLD, W: '#fff' }]]
    STUFF.forEach(([bm, c], i) => { const a = -2.6 + i * 0.42, d = 260 * ease.outCubic(burst); drawBits(x, bm, c, Math.cos(a) * d * 1.1 + 60, Math.sin(a) * d * 0.8 - 40 + 160 * burst * burst, 16, { rot: burst * (i - 2.5) }) })
  }
  x.restore()
}
/** a shelf of books, sorted into a rainbow */
function books(x, cx, cy, k, sorted) {
  if (k <= 0.01) return
  const COLS = [RED, ORANGE, '#ffe76a', '#5fd068', SKYB, '#6b62ff', '#b44ad6', PINK]
  const ORDER = sorted ? [0, 1, 2, 3, 4, 5, 6, 7] : [4, 0, 6, 2, 7, 1, 5, 3]
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, 120, 400, 26); x.fillStyle = WOOD; x.fillRect(-196, 124, 392, 18)
  ORDER.forEach((c, i) => { const h = 160 + (c % 3) * 30; x.fillStyle = INK; x.fillRect(-190 + i * 48, 120 - h, 44, h); x.fillStyle = COLS[c]; x.fillRect(-186 + i * 48, 124 - h, 36, h - 8) })
  x.restore()
}
/** a wall chore chart with names and ticks */
function chart(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-180, -170, 360, 340); x.fillStyle = CREAM; x.fillRect(-172, -162, 344, 324)
  x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('GUEST CHORES', 0, -128)
  const ROWS = ['DISHES', 'MOP', 'SMILE']
  x.font = `700 22px ${MONO}`; x.textAlign = 'left'
  ROWS.forEach((r, i) => {
    const y = -60 + i * 70; x.fillStyle = INK; x.fillText(r, -150, y)
    for (let j = 0; j < 3; j++) { x.fillStyle = INK; x.fillRect(10 + j * 52, y - 18, 40, 36); x.fillStyle = '#ffffff'; x.fillRect(14 + j * 52, y - 14, 32, 28); if (lt > 0.5 + (i * 3 + j) * 0.12) { x.fillStyle = '#2f9a4a'; x.fillRect(24 + j * 52, y - 4, 8, 10); x.fillRect(30 + j * 52, y - 10, 8, 16) } }
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cleaned it in *four minutes.* | Badly.', mood: 'sparkle', star: ST, hops: [0.4, 0.8, 1.2],
    front(x, t, lt, P) {
      broom(x, t, 760, 960, pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, SOCK, { R: RED, W: '#fff' }, 900, 1120, 12 * pop01(t, P.t0 + 1.2, 0.3, 2))
      L(x, 790, 660, 'SPEEDRUN: DONE', pop01(t, P.t0 + 0.9, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Lit a candle. | *Refuses to move.*', mood: lt => lt > 1.2 ? 'sleepy' : 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CANDLE, { F: Math.floor(t * 6) % 2 ? ORANGE : '#ffe76a', Y: '#ffe76a', K: INK, C: CREAM }, 790, 900, 22 * pop01(t, P.t0 + 0.3, 0.35, 2))
      L(x, 790, 1110, 'COSY: LOCKED IN', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'gemini', cap: 'Cleaned half. | Then *got distracted.*', mood: lt => lt > 1.1 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      x.save(); const k = pop01(t, P.t0 + 0.2, 0.3, 2); x.globalAlpha = clamp(k)
      x.fillStyle = 'rgba(255,255,255,0.10)'; x.fillRect(560, 560, 200, 560)
      x.fillStyle = 'rgba(120,80,40,0.25)'; x.fillRect(760, 560, 200, 560); x.restore()
      for (let i = 0; i < 4; i++) drawBits(x, CRUMB, { C: '#8a5a2e' }, 820 + (i % 2) * 70, 700 + i * 110, 10 * k)
      L(x, 760, 900, '50% DONE', pop01(t, P.t0 + 0.8, 0.3, 2.4), LAV, -0.05, 44)
      bubble(x, 760, 1110, 'ooh, a bird', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Invited everyone over | to *see it.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DOOR, { K: INK, D: '#d59a4a', Y: GOLD }, 800, 900, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 800, 1140, 'OPEN HOUSE', pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, -0.04, 36)
      bubble(x, 800, 640, 'come see!!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'leo', cap: 'Waiting for | *applause.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', star: ST, hops: [1.0, 1.8],
    front(x, t, lt, P) {
      L(x, 790, 780, 'I CLEANED.', pop01(t, P.t0 + 0.4, 0.3, 2.4), ORANGE, -0.05, 46)
      L(x, 790, 960, 'APPLAUSE: PENDING', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, 0.04, 30)
      sparkles(x, t, 390, 820, P.t0 + 1.0, 8, 190, 0.4)
    } },
  { sign: 'virgo', cap: 'Found *one crumb.* | Started over.', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.5, 0.3, 2)
      drawBits(x, CRUMB, { C: '#8a5a2e' }, 790, 1040, 14 * k)
      if (lt > 0.9) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(790, 1040, 70 + 6 * Math.sin(t * 8), 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 790, 720, 'RE-CLEAN #4', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 38)
    } },
  { sign: 'libra', cap: 'Fixed the cushions. | *For three hours.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const COLS = [PINK, LAV, MINT]
      COLS.forEach((c, i) => { const sh = Math.sin(t * 3 + i * 2) * clamp(1.6 - lt) * 30; drawBits(x, CUSHION, { P: c, W: '#fff' }, 680 + i * 110 + sh, 980, 15 * pop01(t, P.t0 + 0.2 + i * 0.1, 0.3, 2), { rot: 0.1 * Math.sin(t * 2 + i) * clamp(1.6 - lt) }) })
      L(x, 790, 720, 'TRY #47', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, -0.04, 40)
      if (lt > 1.6) L(x, 790, 1130, 'PERFECT. DON’T SIT.', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 26)
    } },
  { sign: 'scorpio', cap: 'The whole mess? | *In one cupboard.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      cupboard(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2) * 0.8, 0)
      L(x, 790, 1120, 'DO NOT OPEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), RED, -0.04, 36)
    } },
  { sign: 'sagittarius', cap: 'So tidy now | they *can’t find anything.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'where are | my keys??', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 790, 960, 'LOST: EVERYTHING', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Made a chore chart. | *For the guests.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) { chart(x, 790, 870, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'aquarius', cap: 'Sorted the books | *by colour.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      books(x, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.1)
      sparkles(x, t, 790, 830, P.t0 + 1.1, 8, 190, 0.3)
      L(x, 790, 1110, 'READ: NONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'It’s *so clean.* | Happy tears.', mood: 'heart', tears: lt => lt > 0.9 ? 3 : 2, look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sparkles(x, t, 790, 860, P.t0 + 0.4, 10, 220, 0.1, [SKYB, BONE, PINK])
      sparkles(x, t, 790, 860, P.t0 + 1.2, 10, 160, 0.5, [SKYB, BONE, PINK])
      L(x, 790, 880, 'SPARKLING', pop01(t, P.t0 + 0.6, 0.3, 2.4), SKYB, -0.04, 44)
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 5, life: 1.6, spread: 220, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2t0420', key: 'F', accent: ACC, ending: 'callback',
  title: 'House finally clean? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Clean for | *one whole day.*' },
  last: {
    text: 'Until someone | *opened it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      cupboard(x, t, 480, 1060, pop01(t, t0 + 0.2, 0.4, 2) * 1.25, ease.outCubic(prog(lt, 1.0, 1.6)))
      if (lt > 1.6) { const k = pop01(t, t0 + 1.6, 0.35, 2); signChar(x, t, 'scorpio', 830, 1200, 200 * k, { mood: 'wide', look: [-1, 0], seed: 9, glyph: false }) }
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
