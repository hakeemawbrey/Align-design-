// r2a0745: star_advice, ADVICE SOLO (aquarius), "How to make friends | *with an Aquarius.*" (signs3kit social cut, lofi · G).
// One sign the whole way: nine kind, honest tips for befriending an Aquarius, each with one light gag. Ending: group.
//   ask their weirdest opinion · they warm up slowly (the thermometer) · say yes to the odd plans (the fungus walk)
//   · slow to text back, still your friend · ask about their cause, clear your evening · sunglasses at night, together
//   · big plans? leave a side door · talk about the future, they live there · friendship is a slow orbit
//   group "Weird, loyal | *and worth it.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const THERMO = ['..KKK..', '..KWK..', '..KWK..', '..KWK..', '..KWK..', '..KWK..', '..KWK..', '..KWK..', '.KKWKK.', 'KWWWWWK', 'KWWWWWK', '.KKKKK.']
const MUSH = ['..RRRRR..', '.RRWRRRR.', 'RRRRRRWRR', 'RWRRRRRRR', '...CCC...', '...CCC...', '...CCC...']

/** the thermometer: the mercury rises from cool to cosy over lt */
function thermo(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const c = 26 * k
  drawBits(x, THERMO, { K: INK, W: '#e8f6ff' }, cx, cy, c)
  const f = clamp((lt - 0.4) / 1.4), col = f > 0.6 ? '#ff6b5a' : '#6fc3ff'
  x.fillStyle = col
  x.fillRect(cx - c * 2.5, cy + c * 3, c * 5, c * 2)
  const top = cy + c * 3 - f * c * 7.5
  x.fillRect(cx - c * 0.5, top, c, cy + c * 3 - top)
}

const CAMEOS = [
  { sign: S, cap: 'Ask their weirdest opinion. | *Then share yours.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'is a hotdog | a sandwich?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      bubble(x, 800, 920, 'it’s a taco.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 40, tail: 'br', col: '#bfe6ff' })
      L(x, 800, 1100, 'BOND: FORMING', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'They warm up slowly. | *Worth the wait.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      thermo(x, 820, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      swapLabel(x, 820, 640, lt, 1.4, 'FRIENDSHIP: COOL', 'FRIENDSHIP: COSY', { size: 30, fromBg: SKYB, toBg: '#ff8a6a' })
    } },
  { sign: S, cap: 'Say yes to the odd plans. | *Even the fungus walk.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, MUSH, { R: '#ff6b5a', W: CREAM, C: '#e8d8b8' }, 760, 920, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, MUSH, { R: '#c97bff', W: CREAM, C: '#e8d8b8' }, 890, 980, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 680, 'FUNGUS WALK: 2 SPOTS', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1110, 'BEST DAY EVER', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Slow to text back? | *Still your friend.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'SEEN: 3 WEEKS', headCol: STEEL, lines: [['you ok?', BONE, 1, true], ['HEY!! anyway', '#bfe6ff', pop01(t, P.t0 + 1.1, 0.3, 2.4)], ['so about owls', '#bfe6ff', pop01(t, P.t0 + 1.5, 0.3, 2.4)]] })
    } },
  { sign: S, cap: 'Ask about their cause. | *Clear your evening.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', star: ST, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'so, the bees…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      const h = 1 + Math.floor(clamp((lt - 0.6) / 1.5) * 2)
      L(x, 800, 920, `HOUR ${h} OF 3`, pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 36)
      L(x, 800, 1080, 'NOW YOU CARE TOO', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'Sunglasses at night? | *Wear yours too.*', mood: 'happy', star: ST,
    front(x, t, lt, P, F) {
      bits(x, 'SHADES', F.x, F.cy - 10, 11 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const Fp = friend(x, t, 'gemini', 830, 950, 180, pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      if (Fp && lt > 1.1) bits(x, 'SHADES', 830, Fp.cy - 6, 7 * pop01(t, P.t0 + 1.1, 0.3, 2.4))
      bits(x, 'MOON', 820, 660, 10 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 1110, 'TWO ODD ONES', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#6fc3ff', 0.04, 32)
    } },
  { sign: S, cap: 'Big group plans? | *Leave a side door.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 820, 870, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 650, 'PARTY: 40 PEOPLE', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 30)
      L(x, 790, 1110, 'EXIT ANYTIME. NO GUILT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), MINT, 0.04, 24)
    } },
  { sign: S, cap: 'Talk about the future. | *They live there.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 3) * 0.06 })
      L(x, 800, 680, 'NOW: TUESDAY', 1, STEEL, -0.04, 30)
      L(x, 800, 1090, 'AQUARIUS: YEAR 3025', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#6fc3ff', 0.04, 30)
      sparkles(x, t, 800, 880, P.t0 + 1.1, 7, 150, 0.6)
    } },
  { sign: S, cap: 'A slow orbit? | *Keep circling.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      chart(x, 800, 860, 120, k, t * 0.3)
      if (k > 0.9) { const a = t * 1.6; drawPixelStar(x, 800 + Math.cos(a) * 190, 860 + Math.sin(a) * 120, 44, 2, PINK) }
      L(x, 800, 1100, 'ORBIT: ONE OF MANY', pop01(t, P.t0 + 1.3, 0.3, 2.2), LAV, -0.04, 30)
    } },
]

// the long hook: shrink the title so it fits the width and stays above the stage card's name tab
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

const F = makeFilm({
  id: 'r2a0745', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'How to make friends | *with an Aquarius.*',
  cameos: CAMEOS,
  group: { cap: 'Weird, loyal | *and worth it.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
