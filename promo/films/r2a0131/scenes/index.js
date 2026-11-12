// r2a0131: star_advice, ADVICE SOLO, "Cancer, you can't fix | everyone." (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a relatable Cancer truth + a warm reframe, one gag each.
//   0.0–3.6    "Cancer, you can’t fix | *everyone.*"  One big Cancer pops in, then the cards start.
//   3.6–37.8   lunch packed for everyone (pack one for you) · their bad day is not your homework · checked on
//              everyone (check on you) · soup for the whole street (one bowl is love too) · hugging a cactus (some need
//              space) · back in your shell (recharging counts) · watering every plant (water you, too)
//              · remembering every birthday (yours counts) · they left the nest (you did good)
//  37.8        "Big heart. | *Soft landing.*"
//  41.0        LESSON UNLOCKED: "Love isn’t fixing. | Sometimes it’s *staying.*"  STATUS: CARED FOR
//  46.9        "Now go water | *yourself.*"  (the watering can comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP } from './props.js'

const S = 'cancer'
const CACTUS = ['...GG...', '..GGGG..', 'G.GGGG..', 'GGGGGG.G', '.GGGGGGG', '..GGGG..', '..GGGG..', 'PPPPPPPP', '.PPPPPP.', '.PPPPPP.']
const CACTUS_C = { G: '#3fae5a', P: '#c8643a' }
const CAN = ['.....GG..', 'GGGGGGG.G', 'GGGGGGG..', 'GGGGGGG..', 'GGGGGGG..', 'GGGGGGG..']
const CAN_C = { G: '#5fb3d0' }
const POT = ['.SSSSSSSSSSSS.', 'SOOOOOOOOOOOOS', 'GGGGGGGGGGGGGG', 'HGGGGGGGGGGGGH', 'HGGGGGGGGGGGGH', '.GGGGGGGGGGGG.', '.GGGGGGGGGGGG.', '..GGGGGGGGGG..']
const POT_C = { S: '#d0d6e8', O: ORANGE, G: '#9aa5c4', H: '#6b7290' }
const BOWLS = ['K......K', 'KCCCCCCK', '.KCCCCK.', '..KKKK..']
const BOWLS_C = { K: INK, C: ORANGE }
const PLANT = ['.G.G.', 'GGGGG', '.GGG.', '..G..', 'PPPPP', '.PPP.']
const PLANT_C = { G: '#5fd068', P: '#c8643a' }
const NEST = ['B..........B', 'BBBBBBBBBBBB', '.BBBBBBBBBB.', '..BBBBBBBB..']
const BIRD = ['..BB..', '.BBKB.', 'BBBBBO', '.BBBB.', '..BB..']
const BIRD_C = { B: GOLD, K: INK, O: ORANGE }

// water drops falling from a spout at (sx, sy)
function drops(x, t, sx, sy, k, len = 160) {
  if (k <= 0.01) return
  x.fillStyle = SKYB
  for (let i = 0; i < 7; i++) { const ph = (t * 1.6 + i / 7) % 1; x.globalAlpha = k * (1 - ph * 0.6); x.fillRect(sx + Math.sin(i * 2.1) * 14, sy + ph * len, 8, 14) }
  x.globalAlpha = 1
}

const CAMEOS = [
  { sign: S, cap: 'You pack lunch for everyone. | Pack *one for you.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, LAV, GOLD], NAMES = ['MOM', 'BOSS', 'NEIGHBOUR', 'THE DOG', 'ME']
      NAMES.forEach((n, i) => {
        const k = pop01(t, P.t0 + 0.2 + i * (i === 4 ? 0.3 : 0.15), 0.25, 2.2)
        card(x, 790, 1100 - i * 100, 280, 76, k, { bg: COLS[i], rot: (i % 2 ? 0.03 : -0.03) }, () => txt(x, n, 0, 2, { size: i === 4 ? 40 : 30, font: MONO, weight: 700 }))
      })
      sparkles(x, t, 790, 700, P.t0 + 1.4, 6, 150, 0.5)
    } },
  { sign: S, cap: 'Their bad day | isn’t *your homework.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      card(x, 790, 860, 270, 340, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: CREAM, rot: 0.04 }, () => {
        x.fillStyle = '#6b62a8'; x.fillRect(-135, -170, 270, 64); txt(x, 'HOMEWORK', 0, -137, { size: 32, color: CREAM })
        txt(x, 'fix their', 0, -60, { size: 28, weight: 700 }); txt(x, 'whole week', 0, -20, { size: 28, weight: 700 })
        for (let i = 0; i < 3; i++) { x.fillStyle = '#b9b0a0'; x.fillRect(-100, 30 + i * 40, 200, 10) }
      })
      label(x, 790, 900, 'NOT YOURS', pop01(t, P.t0 + 1.2, 0.3, 2.6), { size: 50, bg: RED, color: CREAM, rot: -0.18 })
    } },
  { sign: S, cap: 'Checked on everyone? | *Check on you.*', mood: lt => lt > 1.5 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.15, 0.3, 2), { head: 'SENT', headCol: SKYB, lines: [
        ['you ok?', BONE, pop01(t, P.t0 + 0.3, 0.25, 2.2)], ['you ok??', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['you ok? ♡', BONE, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['me: am I ok?', MINT, pop01(t, P.t0 + 1.4, 0.3, 2.4)]] })
    } },
  { sign: S, cap: 'Soup for the whole street? | One bowl *is love too.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', star: { x: -200 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, POT, POT_C, 790, 780, 22 * k)
      for (let i = 0; i < 3; i++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect(730 + i * 50 + Math.sin(t * 3 + i) * 8, 690 - ((t * 60 + i * 30) % 60), 10, 26) }
      label(x, 790, 640, 'SERVES: 40', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      const b = pop01(t, P.t0 + 1.4, 0.3, 2.4)
      drawBits(x, BOWLS, BOWLS_C, 790, 1050, 18 * b); hearts(x, t, 790, 1060, P.t0 + 1.5, { n: 3, life: 1.4, spread: 100, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'Hugging a cactus? | Some *need space.*', mood: lt => lt > 1.0 ? 'squint' : 'heart', star: { x: -110 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const back = ease.outCubic(prog(lt, 1.1, 1.5))
      drawBits(x, CACTUS, CACTUS_C, lerp(F.x + 150, 820, back), 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (lt > 0.9 && lt < 1.6) bubble(x, 560, 620, 'ow.', pop01(t, P.t0 + 0.9, 0.2, 2.4), { size: 50, tail: 'bc' })
      label(x, 820, 1150, 'GIVE IT ROOM', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04 })
    } },
  { sign: S, cap: 'Back in your shell? | *Recharging counts.*', mood: 'sleepy', star: { x: -150, y: 20 },
    back(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(F.x, 1000); x.scale(k, k)
      x.fillStyle = INK; x.beginPath(); x.moveTo(-230, 140); x.lineTo(0, -230); x.lineTo(230, 140); x.fill()
      x.fillStyle = '#ff9ccf'; x.beginPath(); x.moveTo(-210, 130); x.lineTo(0, -205); x.lineTo(210, 130); x.fill()
      x.fillStyle = '#3a2a5a'; x.beginPath(); x.moveTo(-120, 130); x.lineTo(0, -60); x.lineTo(120, 130); x.fill()
      x.restore()
    },
    front(x, t, lt, P) {
      card(x, 800, 720, 230, 160, pop01(t, P.t0 + 0.7, 0.3, 2), { bg: DEEP, rot: 0.05 }, () => {
        x.fillStyle = BONE; x.fillRect(-80, -40, 150, 80); x.fillRect(70, -16, 12, 32)
        x.fillStyle = MINT; x.fillRect(-72, -32, 134 * clamp((lt - 0.7) / 1.4), 64)
      })
      label(x, 800, 870, 'RECHARGING', pop01(t, P.t0 + 1.0, 0.3, 2), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You water every plant. | *Water you, too.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, -1], star: { x: -170 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      for (let i = 0; i < 4; i++) drawBits(x, PLANT, PLANT_C, 690 + i * 80, 1110 - (i % 2) * 30, 12 * k)
      const turn = ease.inOutCubic(prog(lt, 1.0, 1.4))
      const cx = lerp(820, F.x + 80, turn), cy = lerp(880, F.top - 120, turn)
      drawBits(x, CAN, CAN_C, cx, cy, 16 * k, { rot: 0.5 })
      drops(x, t, cx + 70, cy + 40, k, turn > 0.9 ? 140 : 200)
      label(x, 790, 640, turn > 0.9 ? 'YOU: WATERED' : 'PLANTS: 47', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: turn > 0.9 ? MINT : GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You remember every birthday. | *Yours counts too.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      card(x, 790, 850, 300, 320, pop01(t, P.t0 + 0.2, 0.3, 2), { bg: BONE, rot: 0.04 }, () => {
        x.fillStyle = RED; x.fillRect(-150, -160, 300, 56); txt(x, 'BIRTHDAYS', 0, -132, { size: 30, color: CREAM })
        for (let d = 0; d < 20; d++) {
          const c = d % 5, r = Math.floor(d / 5), px = -116 + c * 58, py = -70 + r * 58
          const me = d === 17, on = me ? lt > 1.3 : lt > 0.4 + d * 0.04
          x.fillStyle = on ? (me ? GOLD : PINK) : '#d9cfbf'; x.fillRect(px - 22, py - 22, 44, 44)
          if (me && on) txt(x, 'ME', px, py + 2, { size: 22 })
        }
      })
      sparkles(x, t, 790 + 58, 850 + 104, P.t0 + 1.35, 6, 90, 0.2)
    } },
  { sign: S, cap: 'They left the nest. | You *did good.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, NEST, { B: BROWN }, 790, 1060, 18 * k)
      const f = ease.inOutCubic(prog(lt, 0.6, 1.8))
      drawBits(x, BIRD, BIRD_C, lerp(790, 900, f), lerp(1020, 660, f), 14 * k, { rot: -0.2 * f })
      bubble(x, 760, 600, 'bye! love you!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, tail: 'br' })
      label(x, 790, 1170, 'PROUD', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: PINK, rot: -0.04 })
    } },
]

const F = makeFilm({
  id: 'r2a0131', key: 'D', accent: SKYB, solo: S, ending: 'lesson',
  title: 'Cancer, you can’t | fix *everyone.*',
  cameos: CAMEOS,
  group: { cap: 'Big heart. | *Soft landing.*', mood: 'heart' },
  lesson: { text: 'Love isn’t fixing. | Sometimes it’s *staying.*', chip: 'STATUS: CARED FOR' },
  last: {
    text: 'Now go water | *yourself.*',
    draw(x, t, lt) {
      const k = pop01(lt, 0.4, 0.35, 2)
      drawBits(x, CAN, CAN_C, 660, 1130, 20 * k, { rot: 0.5 })
      drops(x, t, 740, 1180, k, 140)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
