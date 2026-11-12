// r2a0221: star_advice, ADVICE SOLO, "Scorpio, you're allowed | to change your mind." (~45 s vertical, signs3kit, lofi · D)
// One sign the whole way through (solo mode, 9 cards): Scorpio's all-or-nothing certainty, gently reframed.
//   0.0–3.6    "Scorpio, you’re allowed | *to change your mind.*"
//   3.6–37.8   nine cards: "never" carved in stone, now "maybe" · a grudge suitcase since 2019, set it down · hated
//              pineapple pizza, now loves it · door closed forever, open a crack · all-black wardrobe, one pink shirt
//              · "I was wrong", said it, survived · five-year plan, draft 47 · "no Geminis ever", compatibility check
//              · changing your mind is still you
//  37.8        "Same Scorpio. | *New chapter.*"   41.2  callback: "Next week: | *two pink shirts.*" (the rack returns)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'scorpio', ST = { x: -190 }, PLUM = '#c97bff'

const PIZZA = ['YYYYYYYYYYYY', 'OOOOOOOOOOOO', '.OGOOOOOGOO.', '.OOOOGOOOOO.', '..OOOOOOGO..', '..OGOOOOOO..', '...OOOGOO...', '....OOOO....', '....OOOO....', '.....OO.....']
const PIZZA_C = { Y: '#e8a24a', O: '#ffd23a', G: '#ffe066' }
const PINE = ['GG', 'YY']
const SHIRT = ['KK....KK', 'KKKKKKKK', 'KKKKKKKK', '.KKKKKK.', '.KKKKKK.', '.KKKKKK.', '.KKKKKK.']
const RACK_S = 1.15

/** a stone tablet with a carved word; crack 0…1 */
function tablet(x, cx, cy, k, word, crack, { col = GREY } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.03); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -150, 296, 320)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-156, -176, 312, 340, [90, 90, 10, 10]); x.fill()
  x.fillStyle = col; x.beginPath(); x.roundRect(-146, -166, 292, 320, [82, 82, 6, 6]); x.fill()
  txt(x, word, 0, -10, { size: 64, font: MONO, weight: 700, color: '#4a4466' })
  if (crack > 0) {
    x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(-20, -166)
    const pts = [[10, -110], [-25, -50], [20, 10], [-15, 70], [15, 150]]
    pts.slice(0, Math.ceil(crack * pts.length)).forEach(([a, b]) => x.lineTo(a, b)); x.stroke()
  }
  x.restore()
}
/** a heavy suitcase with a tag */
function suitcase(x, cx, cy, k, tag) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-60, -150, 120, 60); x.fillStyle = DEEP; x.fillRect(-40, -134, 80, 40)
  x.fillStyle = INK; x.fillRect(-166, -106, 332, 230)
  x.fillStyle = '#8a4a2e'; x.fillRect(-156, -96, 312, 210)
  x.fillStyle = '#5b2e1a'; x.fillRect(-156, -10, 312, 14); x.fillRect(-90, -96, 14, 210); x.fillRect(76, -96, 14, 210)
  txt(x, tag, 0, 60, { size: 34, font: MONO, weight: 700, color: CREAM })
  x.restore()
}
/** a clothes rail with black shirts and n pink ones at the end */
function rack(x, cx, cy, k, pinks, popAt, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * RACK_S, k * RACK_S)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 12); x.fillRect(-190, -150, 10, 330); x.fillRect(180, -150, 10, 330)
  const n = 6
  for (let i = 0; i < n; i++) {
    const pink = i >= n - pinks, s = pink ? pop01(t, popAt + (i - (n - pinks)) * 0.25, 0.35, 2.4) : 1
    x.fillStyle = BONE; x.fillRect(-150 + i * 58, -146, 4, 22)
    drawBits(x, SHIRT, { K: pink ? PINK : '#4a4466' }, -155 + i * 62, -70, 7.5 * s, { outline: INK })
  }
  x.restore()
}
/** a mini profile card for the compatibility check */
function mini(x, t, cx, cy, id, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-96, -126, 192, 252); x.fillStyle = '#2a2350'; x.fillRect(-88, -118, 176, 236)
  x.restore()
  signChar(x, t, id, cx, cy - 20 * k, 130 * k, { mood: 'happy', seed: id.length, glyph: false, glow: 0.7 })
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k); txt(x, id.toUpperCase(), 0, 90, { size: 24, font: MONO, weight: 700, color: GOLD }); x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Said “never” once? | *Never can change.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      tablet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.3 ? 'MAYBE' : 'NEVER', clamp((lt - 0.7) / 0.6))
      if (lt > 1.3) sparkles(x, t, 790, 860, P.t0 + 1.3 * 1.29, 7, 190, 0.3)
      label(x, 790, 1090, 'UPDATED: MAYBE', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A grudge since 2019? | *You can set it down.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), down = ease.outBounce ? ease.outBounce(prog(lt, 0.8, 1.2)) : ease.outCubic(prog(lt, 0.8, 1.2))
      suitcase(x, 790, lerp(820, 960, down) + (lt < 0.8 ? Math.sin(t * 30) * 4 : 0), k, 'GRUDGE')
      label(x, 790, 640, 'EST. 2019', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 1150, 'ARMS: FREE', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Hated it. Now love it? | *That’s growth.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, PIZZA, PIZZA_C, 790, 880, 24 * k, { rot: 0.1 })
      for (const [a, b] of [[-60, -50], [40, -20], [-10, 40]]) drawBits(x, PINE, { G: GREEN, Y: '#ffe066' }, 790 + a * k, 880 + b * k, 14 * k)
      bubble(x, 790, 660, lt > 1.2 ? '…it’s good.' : 'pineapple? no.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1110, 'OPINION: UPDATED', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Closed a door forever? | *A crack is fine.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2), op = ease.inOutCubic(prog(lt, 0.9, 1.4))
      if (k <= 0.01) return
      x.save(); x.translate(790, 870); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-130, -230, 260, 440)
      x.fillStyle = '#fff1b0'; x.fillRect(-120, -220, 240, 420)
      x.fillStyle = '#5b2e1a'; x.fillRect(-120 + 40 * op, -220, 240 - 40 * op, 420)
      x.fillStyle = GOLD; x.fillRect(80, -10, 20, 20)
      x.restore()
      label(x, 800, 760, lt > 1.3 ? 'OPEN (A LITTLE)' : 'CLOSED FOREVER', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 32, bg: lt > 1.3 ? MINT : RED, color: lt > 1.3 ? INK : CREAM, rot: -0.04, font: MONO, weight: 700 })
      if (lt > 1.3) sparkles(x, t, 690, 870, P.t0 + 1.4 * 1.29, 6, 120, 0.3)
    } },
  { sign: S, cap: 'All black, always? | *One pink shirt counts.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      rack(x, 730, 860, pop01(t, P.t0 + 0.2, 0.35, 2), 1, P.t0 + 1.1 * 1.29, t)
      label(x, 790, 1150, 'NEW ERA: UNLOCKED', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Wrong about someone? | *Saying so is strong.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST, hops: [1.5],
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.4, 1.3))
      bubble(x, 790, 760, 'i was wrong.', pop01(t, P.t0 + 0.3, 0.25, 2.2) * lerp(0.45, 1.25, g), { size: 44, tail: 'bl' })
      label(x, 790, 1040, 'SAID IT. SURVIVED.', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Rewrote the five-year plan? | *Plans are drafts.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 870, 300, 380, k, { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'THE PLAN', 0, -150, { size: 32, font: MONO, weight: 700 })
        for (let i = 0; i < 6; i++) { x.fillStyle = '#6b62a8'; x.fillRect(-110, -100 + i * 40, 180 + (i % 3) * 20, 14) }
      })
      const s = pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.6)
      if (s > 0.01) { x.save(); x.translate(800, 930); x.rotate(-0.2); x.scale(s, s); x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-140, -44, 280, 88); txt(x, 'DRAFT 47', 0, 2, { size: 46, font: MONO, weight: 700, color: RED }); x.restore() }
    } },
  { sign: S, cap: 'Said “no Geminis, ever”? | *Worth a second look.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.35, 2)
      label(x, 790, 640, '✦ COMPATIBILITY', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 30, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
      mini(x, t, 790, 860, 'gemini', k, 0.05)
      label(x, 790, 1080, 'RESULT: SURPRISING', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.6, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'A new mind | *is still you.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', star: { x: -150 }, hops: [1.0, 1.6],
    back(x, t, lt, P) { hearts(x, t, 390, 1000, P.t0 + 1.1, { n: 6, life: 2.0, spread: 300, cell: 8, seed: 7 }) },
    front(x, t, lt, P) {
      label(x, 790, 720, 'STILL: MYSTERIOUS', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 32, bg: PLUM, rot: -0.04, font: MONO, weight: 700 })
      label(x, 790, 900, 'STILL: LOYAL', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1080, 'NOW: FREE', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 36, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0221', key: 'D', accent: PLUM, solo: S, ending: 'callback',
  title: 'Scorpio, you’re allowed | *to change your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Same Scorpio. | *New chapter.*', mood: 'sparkle' },
  last: {
    text: 'Next week: | *two pink shirts.*',
    draw(x, t, lt) {
      rack(x, 540, 1080, 1.6 * pop01(t, t - lt + 0.3, 0.4, 2), 2, t - lt + 1.0, t)
      sparkles(x, t, 540, 1000, t - lt + 1.3, 8, 260, 0.2)
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: widen the title box so each ' | ' line stays on one line, then scale it down to the safe width
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.84)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
