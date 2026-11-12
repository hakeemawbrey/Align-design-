// r2a0518: star_advice, ADVICE SOLO, "Libra, here's your | *Sunday reset.*" (~46 s vertical, signs3kit social cut,
// music: lofi · C). One sign the whole way: nine small, kind Sunday resets for a Libra, each with one visual gag.
// Ending: callback.
//   0.0–3.6    "Libra, here's your | *Sunday reset.*"
//   3.6–37.8   fresh sheets, instant main character · face mask on, do not disturb · one pretty breakfast, just for you
//              · water the plant, and yourself · tidy one corner, that counts · check your chart, then stop checking
//              · text the friend you keep meaning to · a slow walk, no destination · light the candle, Monday can wait
//  37.8        "Soft Sunday. | *Balanced again.*"
//  41.2        "Monday? | *Still in bed.*"  (the bed from the first card comes back, Libra asleep in it)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ff8fb1', GREY = '#9aa5c4', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
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

const BED = [
  'H..............',
  'H..............',
  'HPPPP..........',
  'HPPPPSSSSSSSSSS',
  'HSSSSSsSSSSsSSS',
  'HSSSSSSSSSSSSSS',
  'HWWWWWWWWWWWWWH',
  'H.............H',
]
const BED_C = { H: '#c98f2a', P: PAPER, S: '#ffd0e0', s: '#ff8fb1', W: '#b98a5a' }
const CUKE = ['.GGGG.', 'GgggGG', 'GgWgGG', 'GgggGG', '.GGGG.']
const PANCAKE = ['....BB....', '...BYYB...', '.CCCCCCCC.', 'CCCCCCCCCC', '.cccccccc.', 'CCCCCCCCCC', '.cccccccc.', 'WWWWWWWWWW']
const PANCAKE_C = { B: '#ff8fb1', Y: '#ffe36a', C: '#e0a85a', c: '#c98f2a', W: BONE }
const PLANT = ['..L..L..', '.LLL.LL.', 'LLlLLLlL', '.LLLSLL.', '....S...', '.PPPPPP.', '..PPPP..']
const GLASS = ['W....W', 'WBBBBW', 'WBbBBW', 'WBBBBW', '.WWWW.']
const BROOM = ['....K', '...K.', '..K..', '.K...', 'YYY..', 'YYYY.', 'YYYYY']
const CANDLE = ['..F..', '.FYF.', '..K..', 'PPPPP', 'PpPPP', 'PPPPP', 'PPPpP', 'PPPPP']
const SHOE = ['..SSS.....', '.SSSSS....', 'SSSSSSSSS.', 'WWWWWWWWWW']

function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 376)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = DEEP; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
const S = 'libra', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Fresh sheets. | *Instant main character.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 790, 980, P.t0 + 1.0, 7, 170, 0.4)
      L(x, 790, 720, 'SHEETS: CRISP', pop01(t, P.t0 + 1.3, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: S, cap: 'Face mask on. | *Do not disturb.*', mood: 'sleepy', star: ST,
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.4, 0.3, 2)
      drawBits(x, CUKE, { G: '#3f9e4a', g: '#9ae58a', W: '#e8f8ea' }, F.x - 54, F.cy - 4, 12 * k)
      drawBits(x, CUKE, { G: '#3f9e4a', g: '#9ae58a', W: '#e8f8ea' }, F.x + 54, F.cy - 4, 12 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 800, 820, 'SPA: OPEN', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 40)
      L(x, 800, 1020, 'CALLS: LATER', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 32)
    } },
  { sign: S, cap: 'One pretty breakfast. | *Just for you.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PANCAKE, PANCAKE_C, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 700, 'PLATED: BEAUTIFULLY', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 800, 1140, 'GUESTS: JUST YOU', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Water the plant. | *And yourself.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PLANT, { L: '#5fd068', l: '#9ae58a', S: '#3f9e4a', P: '#e07a4a' }, 720, 990, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, { W: BONE, B: SKYB, b: '#ffffff' }, 890, 1010, 22 * pop01(t, P.t0 + 0.8, 0.3, 2))
      L(x, 800, 720, 'BOTH: HYDRATED', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 32)
    } },
  { sign: S, cap: 'Tidy one corner. | *That counts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, BROOM, { K: '#c98f2a', Y: '#ffe36a' }, 760, 1040, 30 * k, { rot: Math.sin(t * 6) * 0.15 })
      sparkles(x, t, 890, 1030, P.t0 + 1.1, 6, 80, 0.2)
      L(x, 870, 820, 'THIS BIT: SPOTLESS', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, -0.04, 26)
    } },
  { sign: S, cap: 'Check your chart. | *Then stop checking.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.strokeStyle = LAV; x.lineWidth = 6; x.beginPath(); x.arc(0, -30, 80, 0, Math.PI * 2); x.stroke()
        for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = i === 6 ? PINK : GREY; x.fillRect(Math.cos(a) * 62 - 7, -30 + Math.sin(a) * 62 - 7, 14, 14) }
        x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('MY CHART', 0, 100)
        if (lt > 1.1) { x.fillStyle = 'rgba(20,12,48,0.8)'; x.fillRect(-100, -160, 200, 320); x.fillStyle = MINT; x.font = `800 30px ${INTER}`; x.fillText('phone down', 0, 0) }
      })
      L(x, 800, 1150, 'LOOKS GREAT. DONE.', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Text the friend | *you keep meaning to.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        const a = pop01(t, P.t0 + 0.6, 0.25, 2.2), b = pop01(t, P.t0 + 1.4, 0.25, 2.2)
        if (a > 0.01) { x.save(); x.translate(10, -60); x.scale(a, a); x.fillStyle = PINK; x.fillRect(-80, -30, 160, 60); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('miss you!', 0, 2); x.restore() }
        if (b > 0.01) { x.save(); x.translate(-10, 40); x.scale(b, b); x.fillStyle = BONE; x.fillRect(-80, -30, 160, 60); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('omg SAME', 0, 2); x.restore() }
      })
      hearts(x, t, 800, 1000, P.t0 + 1.8, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 6 })
    } },
  { sign: S, cap: 'A slow walk. | *No destination.*', mood: 'happy', look: [1, 0], star: ST, hops: [0.7, 1.3, 1.9],
    front(x, t, lt, P) {
      drawBits(x, SHOE, { S: PINK, W: BONE }, 800, 1030, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 760, 'ETA: WHENEVER', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 36)
      L(x, 800, 1150, 'STEPS: NOT COUNTED', pop01(t, P.t0 + 1.7, 0.3, 2.2), LAV, 0.04, 28)
    } },
  { sign: S, cap: 'Light the candle. | *Monday can wait.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, CANDLE, { F: '#ffb34a', Y: '#ffe36a', K: INK, P: '#ffd0e0', p: PINK }, 760, 980, 30 * k)
      card(x, 900, 800, 130, 130, pop01(t, P.t0 + 0.6, 0.3, 2), 0.08, x => { x.fillStyle = '#e23d4e'; x.fillRect(-65, -65, 130, 36); x.fillStyle = INK; x.font = `800 36px ${INTER}`; x.fillText('MON', 0, 20) })
      if (lt > 1.2) { x.save(); x.globalAlpha = clamp((lt - 1.2) * 2) * 0.7; x.fillStyle = '#140c30'; x.fillRect(830, 730, 145, 145); x.restore() }
      L(x, 800, 1150, 'MONDAY: ON HOLD', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2a0518', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Libra, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Soft Sunday. | *Balanced again.*', mood: 'heart' },
  last: {
    text: 'Monday? | *Still in bed.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, BED, BED_C, 540, 1080, 30 * pop01(t, t0 + 0.4, 0.35, 2))
      signChar(x, t, 'libra', 470, 990, 220 * pop01(t, t0 + 0.7, 0.4, 2), { mood: 'sleepy', seed: 12, glyph: false })
      sparkles(x, t, 540, 1050, t0 + 1.4, 8, 260, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
