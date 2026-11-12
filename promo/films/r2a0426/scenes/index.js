// r2a0426: star_advice, ADVICE SOLO, "Pisces, not every sad story | is yours to carry." (~52 s vertical, signs3kit
// social cut, music: lofi · D). Nine relatable Pisces truths, each with a warm reframe and one light visual gag; Pisces
// cries (gently) in every card. Ending: lesson.
//   0.0–3.6    "Pisces, not every | sad story | *is yours to carry.*"
//   3.6–37.8   cried for a stranger's cat (pace it) · care from the shore (a life ring) · their storm isn't your weather
//              (an umbrella) · soaked up the mood? wring it out (a sponge) · no is still kind · rescue mission #47, let them steer
//              · your feelings count in your story too · rest is recharging (a battery) · cry it out, let it float away
//  37.8        "Big heart. | *Lighter load.*"
//  41.0        LESSON UNLOCKED: "Feel it deeply. | *Then set it down.*"  HEART: LIGHTER
//  46.9        "Still crying? | *Happy tears count.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SEA = '#b7a6ff', PAPER = '#fff4e2'

// ── props
const RING = [
  '....RRWWRR....',
  '..RRRWWWWRRR..',
  '.RRRR....RRRR.',
  'RRRR......RRRR',
  'WWW........WWW',
  'WWW........WWW',
  'RRRR......RRRR',
  '.RRRR....RRRR.',
  '..RRRWWWWRRR..',
  '....RRWWRR....',
]
const RING_C = { R: '#ff6b5a', W: PAPER }
const CLOUD = [
  '....GGGG.....',
  '..GGGGGGGG...',
  '.GGGGGGGGGGG.',
  'GGGGGGGGGGGGG',
  '.GGGGGGGGGGG.',
]
const UMBRELLA = [
  '.....YY.....',
  '...YYYYYY...',
  '.YYPYYYYPYY.',
  'YYYYYYYYYYYY',
  'Y..Y..Y..Y.Y',
  '.....K......',
  '.....K......',
  '.....K......',
  '.....K.K....',
  '......K.....',
]
const UMB_C = { Y: GOLD, P: PINK, K: BONE }
const SPONGE = [
  'YYYYYYYYYYYY',
  'YYoYYYYYoYYY',
  'YYYYYoYYYYYY',
  'YoYYYYYYYoYY',
  'YYYYYYoYYYYY',
  'YYYoYYYYYYoY',
  'YYYYYYYYYYYY',
]
const SPONGE_C = { Y: '#ffe36a', o: '#d9b23a' }
const BOAT = [
  '......W......',
  '......WW.....',
  '......WWW....',
  '......WWWW...',
  '......K......',
  'BBBBBBBBBBBBB',
  '.BBBBBBBBBBB.',
  '..BBBBBBBBB..',
]
const BOAT_C = { W: PAPER, K: '#8a4a2e', B: '#6fc3ff' }
const BALLOON = [
  '..BBBBB..',
  '.BBWBBBB.',
  'BBWBBBBBB',
  'BBBBBBBBB',
  'BBBBBBBBB',
  '.BBBBBBB.',
  '..BBBBB..',
  '....B....',
]
const BALLOON_C = { B: '#9aa5c4', W: '#ffffff' }

/** a storybook: "MY STORY" with a little Pisces on the cover */
function book(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  const W = 280, H = 360
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#6b3fa8'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = '#57338c'; x.fillRect(-W / 2, -H / 2, 26, H)
  x.fillStyle = GOLD; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('MY STORY', 13, -H / 2 + 60)
  x.restore()
  if (k > 0.5) signChar(x, t, 'pisces', cx + 18, cy + 50, 150 * k, { mood: 'sparkle', seed: 23, tears: 1, glyph: false })
}
/** a battery that charges from low to full */
function battery(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -80, 300, 160); x.fillRect(150, -34, 30, 68)
  x.fillStyle = BONE; x.fillRect(-140, -70, 280, 140); x.fillRect(150, -26, 22, 52)
  x.fillStyle = '#140c30'; x.fillRect(-128, -58, 256, 116)
  x.fillStyle = p < 0.3 ? '#ff6b5a' : p < 0.7 ? GOLD : MINT; x.fillRect(-122, -52, 244 * p, 104)
  x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${Math.round(lerp(12, 100, p))}%`, 0, 4)
  x.restore()
}

// three lines and a long line: shrink the title so it fits the width and stays above the stage card's name tab
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const S = 'pisces', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Cried for a stranger’s cat. | Big heart. *Pace it.*', mood: 'wide', tears: 3, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'my cousin’s | neighbor’s cat…', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 860, 'TISSUES: BOX 3', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
      label(x, 790, 1000, 'HEART: HUGE', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 34, bg: PINK, rot: 0.05 })
    } },
  { sign: S, cap: 'You can care | *from the shore.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', tears: 1, look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = '#6fc3ff'; for (let i = 0; i < 4; i++) x.fillRect(640 + i * 80 + Math.sin(t * 3 + i) * 10, 1120, 50, 10); x.restore() }
      drawBits(x, RING, RING_C, 800, 1010 + Math.sin(t * 2.4) * 8, 15 * k, { rot: Math.sin(t * 1.8) * 0.08 })
      bubble(x, 790, 700, 'here, catch!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 830, 'YOU: STILL DRY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Their storm | *isn’t your weather.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', tears: 1, look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CLOUD, { G: '#6b62a8' }, 800, 700, 20 * k)
      if (k > 0.9) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 9; i++) { const ph = (t * 1.6 + i * 0.37) % 1; x.fillRect(700 + (i * 23) % 200, 760 + ph * 260, 6, 22) } x.restore() }
    },
    front(x, t, lt, P) {
      drawBits(x, UMBRELLA, UMB_C, 370, 620, 18 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 800, 1110, 'FORECAST: NOT YOURS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Soaked up the mood? | *Wring it out.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), sq = lt > 0.9 ? 1 - 0.35 * Math.abs(Math.sin((lt - 0.9) * 5)) : 1
      drawBits(x, SPONGE, SPONGE_C, 800, 860, 24 * k, { sy: sq, sx: 2 - sq })
      if (lt > 0.9) { x.save(); x.fillStyle = SKYB; for (let i = 0; i < 6; i++) { const ph = (t * 1.4 + i / 6) % 1; x.globalAlpha = 1 - ph; x.fillRect(700 + i * 38, 960 + ph * 150, 10, 16) } x.restore() }
      label(x, 790, 650, 'OTHER PEOPLE’S MOODS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 26, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'SQUEEZED: DONE', pop01(t, P.t0 + 1.9, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Saying no | *is still kind.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', tears: 1, look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'can you | fix my life?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 40, col: BONE, tail: 'br' })
      bubble(x, 790, 940, 'no. but | i love you.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 52, col: LAV, tail: 'bl' })
      hearts(x, t, 470, 900, P.t0 + 1.3, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Rescue mission #47? | *Let them steer.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BOAT, BOAT_C, lerp(720, 830, ease.inOutCubic(prog(lt, 0.8, 2.3))), 960 + Math.sin(t * 2.6) * 6, 20 * k)
      if (k > 0.01) { x.save(); x.globalAlpha = k; x.fillStyle = '#6fc3ff'; x.fillRect(620, 1060, 340, 12); x.restore() }
      label(x, 790, 680, 'CAPTAIN: THEM', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'YOU: CHEERING', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04 })
    } },
  { sign: S, cap: 'Your feelings count | *in your story too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', tears: 1, look: [1, 0], star: ST,
    front(x, t, lt, P) {
      book(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 1100, 'MAIN CHARACTER: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.3, 6, 190, 0.4)
    } },
  { sign: S, cap: 'Rest isn’t selfish. | It’s *recharging.*', mood: lt => lt > 1.8 ? 'sparkle' : 'sleepy', tears: 1, look: [1, 0], star: ST, hops: [1.9],
    keyCue: t0 => ['pluck', t0 + 2.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      battery(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ease.inOutCubic(prog(lt, 0.5, 1.8)))
      label(x, 790, 680, 'DO NOT DISTURB', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.8) sparkles(x, t, 790, 860, P.t0 + 1.85 * 1.29, 6, 190, 0.2)
    } },
  { sign: S, cap: 'Cry it out. | Then *let it float.*', mood: lt => lt > 1.5 ? 'happy' : 'wide', tears: lt => lt > 1.5 ? 1 : 2, look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), up = ease.inCubic(prog(lt, 1.0, 2.4)) * 420
      if (k > 0.01) {
        x.save(); x.globalAlpha = k * (1 - prog(lt, 2.0, 2.4)); x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(790, 960 - up); x.lineTo(780, 1130 - up * 0.2); x.stroke(); x.restore()
        drawBits(x, BALLOON, BALLOON_C, 790, 900 - up, 22 * k, { alpha: 1 - prog(lt, 2.0, 2.4) })
        label(x, 790, 880 - up, 'THE SAD STORY', k * (1 - prog(lt, 2.0, 2.4)), { size: 30, bg: BONE, rot: -0.05, font: MONO, weight: 700 })
      }
      bubble(x, 790, 1080, 'bye now.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2a0426', key: 'D', accent: SEA, solo: S, ending: 'lesson',
  title: 'Pisces, not every | sad story | *is yours to carry.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Lighter load.*', mood: 'heart' },
  lesson: { text: 'Feel it deeply. | *Then set it down.*', chip: 'HEART: LIGHTER' },
  last: {
    text: 'Still crying? | *Happy tears count.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.4, { n: 8, life: 2.0, spread: 600, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
