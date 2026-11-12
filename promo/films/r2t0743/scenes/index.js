// r2t0743: THE SIGNS AS… v3, "Zodiacs when someone | remembers a tiny detail | *be like.*" (the batch hook, re-split to
// fit) (~56 s vertical, signs3kit social cut, music: lofi · G). Twelve signs when someone remembers the small thing. Ending: callback.
//   ♈ best friends, effective now · ♉ no pickles: loyal for life · ♊ remembered one story, here are nine more
//   · ♋ the dog's birthday: you're family now · ♌ remembered their good angle, signed your arm · ♍ how they take tea:
//   marriage material · ♎ fave colour: wedding theme set · ♏ middle name: trust unlocked · ♐ their trip story: booked
//   part two · ♑ the big meeting: inner circle · ♒ their weird fact: soulmate · ♓ remembered their name: tears
//   group "Tiny detail. | *Huge feelings.*"   last "Ten years later? | *Still no pickles.*"
import { makeFilm, sparkles, hearts, bubble, pop01, drawBits, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, friend, bits, swapLabel, steam, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }
const BURGER = ['...CCCCCC...', '.CCWCCCWCCC.', 'CCCCCCCCCCCC', 'LLLLLLLLLLLL', 'MMMMMMMMMMMM', 'YYYYYYYYYYYY', 'CCCCCCCCCCCC', '.CCCCCCCCCC.']
const BURGER_C = { C: '#e8b36a', W: '#fff4e2', L: '#8fdc6a', M: '#8a4a2e', Y: '#ffd23a' }
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYKKYYY', 'YYYKKYYY', 'YYYYYYYY']
const OPEN = ['..KKKK..', '.K....K.', '.K......', '.K......', 'YYYYYYYY', 'YYYKKYYY', 'YYYYYYYY']
const LOCK_C = { K: STEEL, Y: GOLD }

const CAMEOS = [
  { sign: 'aries', cap: 'Their coffee order? | *Best friends. Effective now.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: ST, hops: [0.9, 1.3],
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'EXTRA HOT, NO FOAM', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1090, 'FRIENDSHIP: SIGNED', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#ff6b5a', 0.04, 32)
    } },
  { sign: 'taurus', cap: '“No pickles”? | *Loyal for life.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BURGER, BURGER_C, 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'NO PICKLES ✓', pop01(t, P.t0 + 0.7, 0.3, 2.4), '#5fd068', -0.04, 36)
      hearts(x, t, 800, 820, P.t0 + 1.1, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Remembered one story? | *Here are nine more.*', mood: lt => Math.floor(lt * 3) % 2 ? 'happy' : 'wide', star: ST, hops: [0.7, 1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'ok so THEN…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      const n = 2 + Math.floor(clamp((lt - 0.6) / 1.4) * 8)
      L(x, 800, 930, `STORY ${n} OF 10`, pop01(t, P.t0 + 0.7, 0.3, 2.2), '#ffd23a', -0.04, 36)
      L(x, 800, 1080, 'NO BREATHS TAKEN', pop01(t, P.t0 + 1.6, 0.3, 2.2), STEEL, 0.04, 30)
    } },
  { sign: 'cancer', cap: 'The dog’s birthday? | *You’re family now.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bits(x, 'GIFT', 800, 880, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'BISCUIT TURNS FOUR', pop01(t, P.t0 + 0.4, 0.3, 2.2), CREAM, -0.04, 30)
      L(x, 800, 1090, 'SEAT AT XMAS: YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Their good angle? | *Leo signed your arm.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'the left side, | right?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const p = clamp((lt - 1.0) / 0.8)
      if (p > 0) { x.save(); x.strokeStyle = GOLD; x.lineWidth = 10; x.lineCap = 'round'; x.beginPath(); for (let i = 0; i <= 30 * p; i++) { const u = i / 30; const xx = 680 + u * 240, yy = 960 + Math.sin(u * 16) * 34 * (1 - u * 0.4); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) } x.stroke(); x.restore() }
      L(x, 800, 1090, 'AUTOGRAPH: FREE', pop01(t, P.t0 + 1.8, 0.3, 2.2), '#ffb34a', 0.04, 32)
    } },
  { sign: 'virgo', cap: 'How they take tea? | *Marriage material.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', star: ST,
    front(x, t, lt, P) {
      bits(x, 'MUG', 800, 900, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      steam(x, t, 790, 830, { n: 3, alpha: 0.7, h: 110 })
      L(x, 800, 690, 'STEEPED: 4 MIN EXACTLY', pop01(t, P.t0 + 0.5, 0.3, 2.2), MINT, -0.04, 28)
      L(x, 800, 1090, 'INSPECTION: PASSED', pop01(t, P.t0 + 1.4, 0.3, 2.4), '#5fd068', 0.04, 30)
    } },
  { sign: 'libra', cap: 'Their fave colour? | *Wedding theme: set.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (const [i, c] of ['#ffb0c8', PINK, '#ff6b9a'].entries()) { x.save(); x.globalAlpha = k; x.fillStyle = INK; x.fillRect(700 + i * 70 - 6, 790 - 6, 72, 182); x.fillStyle = c; x.fillRect(700 + i * 70, 790, 60, 170); x.restore() }
      L(x, 800, 690, 'DUSTY ROSE?', pop01(t, P.t0 + 0.5, 0.3, 2.2), CREAM, -0.04, 34)
      L(x, 800, 1090, 'SAVE THE DATE', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Their middle name? | *Trust: unlocked.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, lt > 1.1 ? OPEN : LOCK, LOCK_C, 800, 880, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 680, 'TRUST LEVEL: 0', 1, STEEL, -0.04, 32)
      if (lt > 1.1) L(x, 800, 1090, 'TRUST LEVEL: MAX', pop01(t, P.t0 + 1.1, 0.3, 2.4), '#c97bff', 0.04, 34)
      sparkles(x, t, 800, 860, P.t0 + 1.15, 7, 160, 0.4)
    } },
  { sign: 'sagittarius', cap: 'Their trip story? | *Booked part two.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      bits(x, 'STUB', 760, 860, 16 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.1 })
      bits(x, 'STUB', 840, 920, 16 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.1 })
      L(x, 800, 690, 'TWO SEATS. LEAVING FRIDAY.', pop01(t, P.t0 + 1.1, 0.3, 2.2), '#ff9a4a', -0.04, 26)
      L(x, 800, 1090, 'YOU’RE COMING', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Their big meeting? | *Welcome to the inner circle.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 700, 'how did the | pitch go?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      swapLabel(x, 800, 960, lt, 1.2, 'INNER CIRCLE: 2', 'INNER CIRCLE: 3', { size: 34, fromBg: STEEL, toBg: MINT })
    } },
  { sign: 'aquarius', cap: 'Their weird fact? | *Soulmate. Obviously.*', mood: lt => lt > 1.1 ? 'heart' : 'wide', star: ST,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'octopuses have | three hearts!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1000, 'SOULMATE DETECTED', pop01(t, P.t0 + 1.1, 0.3, 2.4), '#6fc3ff', 0.04, 32)
      hearts(x, t, 800, 940, P.t0 + 1.2, { n: 3, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: 'pisces', cap: 'Just their name? | *Pisces is in tears.*', mood: 'wide', look: [1, 0], star: ST, tears: 3,
    front(x, t, lt, P) {
      bubble(x, 800, 720, 'hi, pisces!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      L(x, 800, 1000, 'THEY REMEMBERED ♡', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, 0.04, 32)
    } },
]

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

const F = makeFilm({
  id: 'r2t0743', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs when someone | remembers a tiny detail | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Tiny detail. | *Huge feelings.*' },
  last: {
    text: 'Ten years later? | *Still no pickles.*',
    draw(x, t, lt) {
      drawBits(x, BURGER, BURGER_C, 540, 1010, 30 * pop01(t, t - lt + 0.6, 0.4, 2))
      L(x, 540, 1240, 'NO PICKLES ✓', pop01(t, t - lt + 1.3, 0.3, 2.4), '#5fd068', -0.03, 40)
      hearts(x, t, 540, 860, t - lt + 1.5, { n: 6, life: 1.8, spread: 300, cell: 8, seed: 7 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
