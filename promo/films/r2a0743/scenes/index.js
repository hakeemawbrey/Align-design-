// r2a0743: star_advice, ADVICE SOLO (aquarius), "What Aquarians need | *on a bad day.*" (signs3kit social cut, lofi · C).
// One sign the whole way: nine kind things an Aquarius needs on a bad day, each a relatable truth + a warm reframe with
// one light gag. Ending: group.
//   space first, snack at the door · the strangest show, zero questions · hear the whole wild theory · don't fix it,
//   sit nearby · not their job to fix everything tonight · alone isn't lonely · a text with "no need to reply"
//   · look at the stars together · weird today? still your best quality
//   group "Space, snacks | *and stars.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, friend, bits, swapLabel, chart, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'
import { drawPixelStar } from '../../sky.js'

const ACC = '#6fc3ff', S = 'aquarius', ST = { x: -190 }
const SNAIL = ['...SSS....', '..SWWWS...', '.SWSSSWS..', '.SWSWSWS..', '.SWSSWWS.E', '..SWWWS..E', 'BBBBBBBBBB', '.BBBBBBBB.']

const CAMEOS = [
  { sign: S, cap: 'Space first. | *Then a snack at the door.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', star: ST,
    front(x, t, lt, P) {
      bits(x, 'DOORX', 820, 860, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const d = ease.outCubic(clamp((lt - 0.8) / 0.4))
      if (lt > 0.8) bits(x, 'COOKIE', 700, lerp(1200, 1060, d), 12)
      L(x, 800, 640, 'DO NOT DISTURB', pop01(t, P.t0 + 0.4, 0.3, 2.2), STEEL, -0.04, 32)
      L(x, 830, 1120, 'DELIVERED. NO TALKING.', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, 0.04, 26)
    } },
  { sign: S, cap: 'Pick the strangest show. | *Ask zero questions.*', mood: lt => lt > 1.2 ? 'sparkle' : 'neutral', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'TV', 800, 880, 22 * k)
      if (k > 0.9) drawBits(x, SNAIL, { S: '#ffb34a', W: '#ffe27a', B: '#c9a6ff', E: INK }, 800 + Math.sin(t) * 30, 860, 10)
      L(x, 800, 670, 'TONIGHT: DEEP-SEA SNAILS', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 26)
      L(x, 800, 1100, 'EPISODE 6 OF 40', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#6fc3ff', 0.04, 30)
    } },
  { sign: S, cap: 'Hear the wild theory. | *All of it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', star: ST, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'what if clouds | have opinions?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 800, 950, 'TAKEN SERIOUSLY ✓', pop01(t, P.t0 + 1.1, 0.3, 2.4), MINT, -0.04, 32)
      L(x, 800, 1080, 'PART 2 TOMORROW', pop01(t, P.t0 + 1.8, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: S, cap: 'Don’t fix it. | *Just sit nearby.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', star: { x: -210 },
    front(x, t, lt, P) {
      friend(x, t, 'cancer', 850, 950, 170, pop01(t, P.t0 + 0.3, 0.35, 2), { mood: 'happy', look: [-1, 0] })
      L(x, 650, 700, 'A RESPECTFUL DISTANCE', pop01(t, P.t0 + 0.8, 0.3, 2.2), CREAM, -0.04, 26)
      hearts(x, t, 620, 900, P.t0 + 1.6, { n: 4, life: 1.6, spread: 120, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Not their job | *to fix everything tonight.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 300, head: 'SAVE THE WORLD', headBg: '#6fc3ff', headInk: INK, lines: ['oceans', 'bees', 'everyone'], size: 32 })
      swapLabel(x, 800, 1090, lt, 1.2, 'DUE: TONIGHT', 'DUE: SOMEDAY. REST.', { size: 28, fromBg: RED, toBg: MINT })
    } },
  { sign: S, cap: 'Want to be alone? | *Alone isn’t lonely.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: ST,
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'ALONE ✓', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 36)
      L(x, 800, 1080, 'LONELY ✗', pop01(t, P.t0 + 1.2, 0.3, 2.2), STEEL, 0.04, 36)
    } },
  { sign: S, cap: 'Send one text. | *Then no pressure.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, t, 800, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: '1 MESSAGE', headCol: '#6fc3ff', lines: [['thinking of u', BONE, pop01(t, P.t0 + 0.6, 0.3, 2.2)], ['no need to reply', BONE, pop01(t, P.t0 + 1.0, 0.3, 2.2)], ['♡', PINK, pop01(t, P.t0 + 1.7, 0.3, 2.4), true]] })
    } },
  { sign: S, cap: 'Look at the stars together. | *Problems get smaller.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'MOON', 820, 700, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      for (let i = 0; i < 6; i++) if (lt > 0.4 + i * 0.15) drawPixelStar(x, 640 + (i * 97) % 300, 660 + (i * 61) % 220, 42 + (i % 3) * 14, 2, [GOLD, BONE, SKYB][i % 3])
      swapLabel(x, 800, 1080, lt, 1.3, 'PROBLEMS: HUGE', 'PROBLEMS: TINY', { size: 32, fromBg: STEEL, toBg: GOLD })
    } },
  { sign: S, cap: 'Feeling weird today? | *Still your best quality.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'GADGET', 800, 870, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 4) * 0.05 })
      L(x, 800, 680, 'INVENTED: ??? (WORKS)', pop01(t, P.t0 + 0.6, 0.3, 2.2), CREAM, -0.04, 28)
      L(x, 800, 1090, 'WEIRD: CERTIFIED GOOD', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#6fc3ff', 0.04, 28)
      sparkles(x, t, 800, 870, P.t0 + 1.35, 7, 160, 0.2)
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
  id: 'r2a0743', key: 'C', accent: ACC, solo: S, ending: 'group',
  title: 'What Aquarians need | *on a bad day.*',
  cameos: CAMEOS,
  group: {
    cap: 'Space, snacks | *and stars.*', mood: 'sparkle',
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
