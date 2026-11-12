// r2a0391: star_advice, ADVICE SOLO (pisces), "Pisces, you can | say no." (signs3kit social cut, music: lofi · D). Ending: callback.
//   nine cards: three plans one night · carrying everyone's feelings · the hoodie stays · rest is allowed · "no." practice
//   · real friends get it · the couch full of rescued cats · battery at 12% · saying no is yes to you
//   callback: the cats can stay (the couch of cats comes back).
import { makeFilm, hearts, drawBits, pop01, INK } from '../../signs3kit.js'
import { cam, BITS, RED, ORANGE, GREEN, GREY, CREAM, PINK, GOLD, MINT, LAV, SKYB, BONE, BROWN } from './gags.js'

const S = 'pisces'
const cry = () => ({ tears: 2 })
const CATC = { K: INK, O: ORANGE, P: PINK }
const CATS = [[-120, 0, ORANGE], [0, -14, GREY], [120, 0, '#f2c75c'], [-60, -96, CREAM], [60, -96, ORANGE]]
/** a little couch with a pile of rescued cats on it */
function couch(x, cx, cy, k, t, n = 5) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-196, -26, 392, 150); x.fillStyle = '#c97bff'; x.fillRect(-188, -18, 376, 134)
  x.fillStyle = '#a65fe0'; x.fillRect(-188, 50, 376, 66)
  x.fillStyle = INK; x.fillRect(-176, 124, 24, 30); x.fillRect(152, 124, 24, 30)
  CATS.slice(0, n).forEach(([dx, dy, col], i) => drawBits(x, BITS.cat, { ...CATC, O: col }, dx, dy + Math.sin(t * 3 + i) * 3, 15))
  x.restore()
}

const CAMEOS = [
  cam(S, 'Three plans tonight? | *One is plenty.*', { ...cry(2), mood: lt => lt > 1.4 ? 'happy' : 'wide' }, [
    ['bits', 'calendar', 790, 880, 22, 0.2, {}],
    ['label', 790, 650, 'TONIGHT: x3', 0.6, { size: 42, bg: RED, rot: -0.05, mono: true, to: 1.4 }],
    ['label', 790, 650, 'TONIGHT: x1', 1.4, { size: 42, bg: MINT, rot: 0.04, mono: true }],
  ]),
  cam(S, 'Carrying their feelings? | *Set some down.*', { ...cry(2), mood: lt => lt > 1.5 ? 'happy' : 'squint' }, [
    ['fn', (x, t, lt) => {
      const k = Math.min(1, lt / 0.3), drop = Math.max(0, Math.min(1, (lt - 1.2) / 0.4))
      for (let i = 0; i < 4; i++) {
        const top = i === 3 ? drop : 0
        drawBits(x, BITS.box, { N: BROWN, n: '#c58b5c' }, 790 + Math.sin(t * 5 + i) * 6 * (1 - drop) + top * 80, 1100 - i * 100 + top * 150, 18 * k, { alpha: 1 - top * 0.6 })
      }
    }],
    ['label', 790, 620, 'NOT YOURS', 0.5, { size: 44, bg: GOLD, rot: -0.04, mono: true }],
  ]),
  cam(S, 'Lent your hoodie again? | *Keep this one.*', { ...cry(1), mood: lt => lt > 1.2 ? 'heart' : 'happy' }, [
    ['bits', 'hoodie', 790, 900, 24, 0.2, {}],
    ['label', 790, 650, 'MINE. FOR REAL.', 1.1, { size: 40, bg: PINK, rot: 0.05 }],
  ]),
  cam(S, 'Can’t sleep for others? | *Rest is allowed.*', { ...cry(1), mood: lt => lt > 1.3 ? 'sleepy' : 'neutral' }, [
    ['bits', 'pillow', 790, 1000, 22, 0.2, {}],
    ['label', 790, 680, 'REST: ALLOWED', 1.0, { size: 42, bg: MINT, rot: -0.05, mono: true }],
  ]),
  cam(S, 'No is a full sentence. | *Practice it.*', { ...cry(2), mood: lt => lt > 1.6 ? 'sparkle' : 'wide', hops: [1.6] }, [
    ['bubble', 770, 680, lt => lt < 0.9 ? 'n-no?' : lt < 1.5 ? 'no.' : 'no! :)', 0.3, { size: 72, col: LAV, tail: 'bl' }],
    ['label', 790, 920, lt => `ATTEMPT #${lt < 0.9 ? 1 : lt < 1.5 ? 2 : 3}`, 0.5, { size: 40, bg: GOLD, rot: 0.05, mono: true }],
  ]),
  cam(S, 'Feel guilty saying no? | *Real friends get it.*', { ...cry(2), mood: lt => lt > 1.3 ? 'heart' : 'squint' }, [
    ['bubble', 770, 650, 'sorry, i can’t | make it…', 0.3, { size: 38, tail: 'bl' }],
    ['bubble', 790, 880, 'all good! | rest up', 1.1, { size: 46, col: MINT, tail: 'br' }],
    ['hearts', 790, 980, 1.4, { n: 5 }],
  ]),
  cam(S, 'Rescued every stray? | *The couch is full.*', { ...cry(2), mood: 'sparkle' }, [
    ['fn', (x, t, lt, t0) => couch(x, 770, 1000, pop01(t, t0 + 0.2, 0.3, 2), t, Math.min(5, 1 + Math.floor(lt / 0.3)))],
    ['label', 790, 680, 'VACANCY: 0', 1.5, { size: 42, bg: RED, rot: -0.05, mono: true }],
  ]),
  cam(S, 'Running on empty? | *Recharge first.*', { ...cry(1), mood: lt => lt > 1.4 ? 'happy' : 'sleepy' }, [
    ['fn', (x, t, lt, t0) => {
      const k = pop01(t, t0 + 0.2, 0.3, 2), fill = lt < 1.2 ? 0.12 : Math.min(1, 0.12 + (lt - 1.2) * 0.9)
      if (k <= 0.01) return
      x.save(); x.translate(790, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-160, -80, 320, 160); x.fillRect(160, -36, 30, 72)
      x.fillStyle = BONE; x.fillRect(-150, -70, 300, 140); x.fillRect(160, -26, 20, 52)
      x.fillStyle = '#140c30'; x.fillRect(-138, -58, 276, 116)
      x.fillStyle = fill < 0.3 ? RED : MINT; x.fillRect(-130, -50, 260 * fill, 100)
      x.restore()
    }],
    ['label', 790, 680, lt => lt < 1.2 ? 'BATTERY: LOW' : 'CHARGING…', 0.4, { size: 40, bg: GOLD, rot: 0.04, mono: true }],
  ]),
  cam(S, 'Saying no to them | is *yes to you.*', { ...cry(2), mood: 'heart', keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0] }, [
    ['bits', 'heartBig', 790, 880, 34, 0.3, {}],
    ['label', 790, 650, 'YOU: CHOSEN', 1.0, { size: 44, bg: PINK, rot: -0.05 }],
    ['hearts', 790, 900, 1.2, { n: 6, spread: 220 }],
  ]),
]

const F = makeFilm({
  id: 'r2a0391', key: 'D', accent: '#7fd8c8', solo: S, ending: 'callback',
  title: 'Pisces, you can | *say no.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong no.*', mood: 'heart' },
  last: {
    text: 'The cats | *can stay.*',
    draw(x, t, lt) {
      couch(x, 540, 1020, 1.7 * pop01(t, t - lt + 0.3, 0.4, 1.9), t, 5)
      hearts(x, t, 540, 860, t - lt + 0.9, { n: 6, life: 2, spread: 400, cell: 8, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
