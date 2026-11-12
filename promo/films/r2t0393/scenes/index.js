// r2t0393: star_talk, ROLLCALL (twelve signs), "Signs reading | the reviews." (before buying anything; signs3kit social cut,
// music: lofi · G). Ending: lesson.
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN, DARK } from './gags.js'

/** a review card: a star row and a short quote */
function review(x, cx, cy, k, { stars = 5, quote = '', rot = 0.04, bg = BONE } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * 1.2, k * 1.2)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -100, 336, 220)
  x.fillStyle = INK; x.fillRect(-173, -113, 346, 226); x.fillStyle = bg; x.fillRect(-165, -105, 330, 210)
  for (let i = 0; i < 5; i++) drawBits(x, BITS.star5, { Y: i < stars ? GOLD : GREY }, -120 + i * 60, -50, 7)
  x.fillStyle = INK; x.font = `800 34px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
  quote.split('|').map(s => s.trim()).forEach((l, i, a) => x.fillText(l, 0, 30 + (i - (a.length - 1) / 2) * 40))
  x.restore()
}
const R = (cx, cy, at, o) => ['fn', (x, t, lt, t0) => review(x, cx, cy, pop01(t, t0 + at, 0.3, 2), typeof o === 'function' ? o(lt) : o)]

const CAMEOS = [
  cam('aries', 'Read zero reviews. | *Bought three.*', { mood: 'sparkle', hops: [0.6, 1.0, 1.4] }, [
    ['label', 790, 760, lt => `IN CART: ${Math.min(3, 1 + Math.floor(lt / 0.5))}`, 0.3, { size: 50, bg: RED, rot: -0.05, mono: true }],
    ['label', 790, 920, 'REVIEWS READ: 0', 1.3, { size: 38, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam('taurus', 'Nine hundred reviews. | For *a pillow.*', { mood: lt => lt > 1.6 ? 'sleepy' : 'squint' }, [
    ['bits', 'pillow', 790, 1000, 22, 0.2, {}],
    ['label', 790, 720, lt => `REVIEW ${Math.min(900, Math.floor(lt * 420))}/900`, 0.3, { size: 42, bg: GOLD, rot: -0.04, mono: true }],
  ]),
  cam('gemini', 'Read one review. | Now *arguing with it.*', { mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'squint' }, [
    R(760, 700, 0.2, { stars: 2, quote: '“meh.”' }),
    ['bubble', 790, 940, 'well, actually—', 0.9, { size: 46, col: GOLD, tail: 'bl' }],
  ]),
  cam('cancer', 'Read a sad review. | *Comforted the stranger.*', { mood: lt => lt > 1.2 ? 'heart' : 'wide' }, [
    R(760, 700, 0.2, { stars: 1, quote: 'it broke. | so did i.', bg: SKYB }),
    ['bubble', 790, 950, 'sending hugs ♡', 1.0, { size: 44, col: PINK, tail: 'bl' }],
  ]),
  cam('leo', 'Left a review. | *About themself.*', { mood: 'sparkle', hops: [1.0] }, [
    R(760, 820, 0.2, { stars: 5, quote: 'product: fine. | me: iconic.' }),
    ['sparkles', 790, 820, 1.0, { n: 6, R: 180 }],
  ]),
  cam('virgo', 'Fact-checked | *every review.*', { mood: 'squint' }, [
    ['doc', 790, 880, 0.2, { title: 'REVIEWS', rows: 5, marks: 3, ticks: 2, rot: 0.04 }],
    ['label', 790, 630, 'ERRORS FOUND: 7', 1.2, { size: 40, bg: RED, rot: -0.05, mono: true }],
  ]),
  cam('libra', 'Five stars, one star. | *Now can’t choose.*', { mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0] }, [
    ['fn', (x, t, lt, t0) => {
      const k = pop01(t, t0 + 0.2, 0.3, 2), tilt = Math.sin(t * 3) * 0.12
      if (k <= 0.01) return
      drawBits(x, BITS.scales, { Y: GOLD }, 790, 900, 26 * k, { rot: tilt })
    }],
    ['label', 680, 700, '★★★★★', 0.6, { size: 40, bg: MINT, rot: -0.05 }],
    ['label', 900, 760, '★', 0.9, { size: 40, bg: RED, rot: 0.05 }],
  ]),
  cam('scorpio', 'Skips the five stars. | Reads *the one-stars.*', { mood: lt => lt > 1.2 ? 'wink' : 'squint' }, [
    R(760, 820, 0.2, { stars: 1, quote: 'arrived. | i’m not ok.' }),
    ['label', 790, 1040, 'THE TRUTH', 1.2, { size: 42, bg: '#c97bff', rot: -0.04 }],
  ]),
  cam('sagittarius', 'Read reviews | in *four languages.*', { mood: 'sparkle', hops: [0.6, 1.4], star: { x: 150 }, look: [-1, 0] }, [
    ['bubble', 300, 640, 'olé!', 0.3, { size: 42, col: GOLD, tail: 'br' }],
    ['bubble', 330, 800, 'bravo!', 0.6, { size: 42, col: MINT, tail: 'br' }],
    ['bubble', 280, 960, 'super!', 0.9, { size: 42, col: PINK, tail: 'br' }],
    ['label', 330, 1110, 'TRANSLATING…', 1.3, { size: 36, bg: ORANGE, rot: -0.04, mono: true }],
  ]),
  cam('capricorn', 'Made a spreadsheet | *of the reviews.*', { mood: lt => lt < 1.2 ? 'neutral' : 'happy' }, [
    ['fn', (x, t, lt, t0) => {
      const k = pop01(t, t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 880); x.scale(k, k); x.rotate(0.03)
      x.fillStyle = INK; x.fillRect(-170, -150, 340, 300); x.fillStyle = BONE; x.fillRect(-162, -142, 324, 284)
      for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { x.fillStyle = r === 0 ? GREEN : (r + c) % 2 ? '#e8dcc6' : '#fff'; x.fillRect(-154 + c * 78, -134 + r * 45, 74, 41) }
      x.restore()
    }],
    ['label', 790, 640, 'TAB 14 OF 14', 1.1, { size: 40, bg: GOLD, rot: -0.05, mono: true }],
  ]),
  cam('aquarius', 'Everyone hated it. | *Bought two.*', { mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1] }, [
    R(760, 720, 0.2, { stars: 1, quote: 'why is it | so weird' }),
    ['label', 790, 960, 'SOLD. (TWICE.)', 1.1, { size: 44, bg: SKYB, rot: 0.04 }],
  ]),
  cam('pisces', 'Read a sweet review. | *Sobbed.*', { tears: lt => lt < 1.0 ? 2 : 3, mood: lt => lt < 1.0 ? 'sparkle' : 'wide' }, [
    R(760, 780, 0.2, { stars: 5, quote: 'changed | my life ♡', bg: PINK }),
    ['hearts', 600, 1000, 1.1, { n: 5 }],
  ]),
]

const F = makeFilm({
  id: 'r2t0393', key: 'G', accent: '#7dffb0', ending: 'lesson',
  title: 'Signs reading | *the reviews.*',
  cameos: CAMEOS,
  group: { cap: 'Cart full. | *Still reading.*' },
  lesson: { text: 'Trust your gut. | It has *great reviews.*', chip: 'GUT: TRUSTED' },
  last: {
    text: 'Virgo is still | *reading.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
