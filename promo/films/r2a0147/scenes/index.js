// r2a0147: star_advice, ADVICE SOLO, "Sagittarius, have | you eaten today?" (~51 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through (makeFilm solo mode, 9 cards): the explorer who forgets to refuel, gently looked after.
//   0.0–3.6    "Sagittarius, have | you *eaten today?*"
//   3.6–37.8   nine cards (3.8 s each):
//              skipped lunch for an adventure, pack a snack · running on coffee and vibes, water counts too · dinner was
//              trail mix, have a real meal · booked a trip at 3 a.m., sleep then pack · laughing through a hard week, you can
//              talk too · always on the move, your bed misses you · map full of pins, add home · said yes to every plan,
//              rest is a plan · checked on everyone else, now check on you
//  37.8        "Explorer mode: | *needs snacks.*"  Sagittarius comes back, big.
//  41.0        LESSON UNLOCKED: "Adventures need fuel. | *Feed the explorer.*"  STATUS: FED
//  46.9        "Now go. | *After lunch.*"  a sandwich lands next to Sagittarius.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, clock, bar, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN } from './props.js'

const S = 'sagittarius', SAG = '#a35cf0'
const ST = { x: -190 }

const PACK = ['...GGGGG...', '..G.....G..', '.GGGGGGGGG.', 'GGGGGGGGGGG', 'GGgggggggGG', 'GGgGGGGGgGG', 'GGgggggggGG', 'GGGGGGGGGGG', 'GGGGGGGGGGG', '.GGGGGGGGG.']
const PACK_C = { G: '#7a5cc4', g: '#a98bf0' }
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'YYYYYYYYYYYY', 'RRRRRRRRRRRR', '.BBBBBBBBBB.']
const SAND_C = { B: '#e8a24a', G: '#5fd068', Y: '#ffd86b', R: '#d0453a' }
const CUP = ['.WWWWWW.', 'WBBBBBBW', 'WBBBBBBWWW', 'WBBBBBBW.W', 'WBBBBBBWWW', 'WBBBBBBW', '.WWWWWW.']
const CUP_C = { W: '#fff4e2', B: '#6b3a1e' }
const GLASS = ['K......K', 'K......K', 'K......K', 'K......K', 'K......K', 'K......K', 'KKKKKKKK']
const BAG = ['.KKKKKK.', 'KMMMMMMK', 'KMNMMNMK', 'KMMNMMMK', 'KMNMMNMK', 'KMMMMMMK', 'KKKKKKKK']
const BAG_C = { K: INK, M: '#c98f6a', N: '#6b3a1e' }
const BOWL = ['.S..S..S.', '..S..S...', 'OOOOOOOOO', 'KWWWWWWWK', '.KWWWWWK.', '..KKKKK..']
const BOWL_C = { S: '#ffffff', O: ORANGE, W: '#fff4e2', K: INK }
const BED = ['WW..........', 'WWPPPPPPPPPP', 'WWPPPPPPPPPP', 'BBBBBBBBBBBB', 'B..........B']
const BED_C = { W: '#fff4e2', P: '#7a5cc4', B: '#8a4a2e' }
const PIN = ['.RRR.', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..']
const HOUSE = ['...KK...', '..KRRK..', '.KRRRRK.', 'KRRRRRRK', '.WWWWWW.', '.WWKKWW.', '.WWKKWW.']
const HOUSE_C = { K: INK, R: RED, W: '#fff4e2' }

/** a folded paper map with pins at [x, y] (local), the last one optional */
function map(x, cx, cy, k, pins, home) {
  card(x, cx, cy, 380, 280, k, { bg: '#e8f0d0', rot: -0.03 }, () => {
    x.fillStyle = '#b7d8a0'; x.fillRect(-190, -140, 120, 280); x.fillRect(70, -140, 120, 280)
    x.fillStyle = '#8fc3e8'; x.beginPath(); x.ellipse(-20, 40, 90, 50, 0.3, 0, Math.PI * 2); x.fill()
    for (const [px, py] of pins) drawBits(x, PIN, { R: RED, W: '#fff' }, px, py, 6)
    if (home > 0.01) drawBits(x, HOUSE, HOUSE_C, 120, 70, 9 * home)
  })
}

const CAMEOS = [
  { sign: S, cap: 'Skipped lunch for an adventure? | *Pack a snack.*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, PACK, PACK_C, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const d = ease.outBack(prog(lt, 0.9, 1.3))
      if (lt > 0.85) drawBits(x, SANDWICH, SAND_C, 790, lerp(560, 760, d), 13, { rot: 0.1 })
      label(x, 790, 1130, 'PACKED: LUNCH', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Running on coffee and vibes? | *Water counts too.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      drawBits(x, CUP, CUP_C, 680, 960, 16 * k)
      const g = k > 0.01 ? 1 : 0
      if (g) {
        x.save(); const f = clamp((lt - 0.7) / 1.0); x.fillStyle = SKYB; x.fillRect(840, 1010 - 130 * f, 100, 130 * f); x.restore()
        drawBits(x, GLASS, { K: INK }, 890, 960, 18 * k, { outline: null })
      }
      label(x, 790, 700, 'VIBES: 100 · WATER: 0', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 890, 1120, 'SIP!', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Dinner was trail mix? | *Have a real meal.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const swap = ease.inOutCubic(prog(lt, 0.9, 1.2))
      drawBits(x, BAG, BAG_C, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - swap))
      drawBits(x, BOWL, BOWL_C, 790, 900, 22 * swap)
      label(x, 790, 680, lt > 1.1 ? 'WARM SOUP' : 'DINNER?', pop01(t, P.t0 + 0.4, 0.3, 2.2), { size: 40, bg: lt > 1.1 ? ORANGE : BONE, rot: -0.04, font: MONO, weight: 700 })
      if (swap > 0.5) hearts(x, t, 790, 860, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Booking a trip at 3 a.m.? | *Sleep, then pack.*', mood: lt => lt > 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      clock(x, 790, 780, 110, pop01(t, P.t0 + 0.2, 0.35, 2), 3, 0)
      label(x, 790, 980, 'FLIGHT: TOMORROW', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1110, 'BED: NOW', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Laughing through a hard week? | *You can talk too.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 410, 620, 'ha ha! i’m fine!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'br' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 800, 990, 200 * k, { mood: 'heart', look: [-1, 0], seed: 15, glyph: false, hops: [P.t0 + 1.2] })
      bubble(x, 800, 760, 'i’m listening.', pop01(t, P.t0 + 1.1, 0.25, 2.2), { size: 38, col: MINT, tail: 'bc' })
    } },
  { sign: S, cap: 'Always on the move? | *Your bed misses you.*', mood: lt => lt > 1.4 ? 'sleepy' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BED, BED_C, 790, 980, 26 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 760, 'come home…', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 42, col: LAV, tail: 'bc' })
      if (lt > 1.2) hearts(x, t, 820, 900, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 140, cell: 7, seed: 8 })
    } },
  { sign: S, cap: 'Map full of pins? | Add *“home”* too.', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const pins = [[-140, -90], [-60, -40], [20, -100], [100, -60], [-120, 60], [60, 20]].slice(0, Math.max(0, Math.floor((lt - 0.3) / 0.15)))
      map(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), pins, ease.outBack(prog(lt, 1.3, 1.6)))
      label(x, 790, 1080, 'PIN: HOME', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 36, bg: RED, color: CREAM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Said yes to every plan? | *Rest is a plan.*', mood: lt => lt > 1.4 ? 'sleepy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 300, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'SATURDAY', 0, -110, { size: 30, font: MONO, weight: 700 })
        const L = ['hike', 'kayak', 'concert']
        L.forEach((s, i) => { txt(x, s, 0, -50 + i * 50, { size: 32, color: lt > 1.0 ? '#b9b0a0' : INK }); if (lt > 1.0) { x.fillStyle = RED; x.fillRect(-70, -52 + i * 50, 140 * clamp((lt - 1.0 - i * 0.1) / 0.2), 5) } })
        if (lt > 1.3) txt(x, 'NAP!', 0, 110, { size: 40, color: '#2fa36b' })
      })
      label(x, 790, 650, 'PLANS: 3 → 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Checked on everyone else? | *Now check on you.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NOTE TO SELF', headCol: SAG, lines: [['u ok, Sam?', BONE, pop01(t, P.t0 + 0.4, 0.25, 2)], ['eaten, Jo?', BONE, pop01(t, P.t0 + 0.6, 0.25, 2)], ['and YOU?', GOLD, pop01(t, P.t0 + 1.1, 0.25, 2.4)], ['…i’m hungry', MINT, pop01(t, P.t0 + 1.6, 0.25, 2)]] })
    } },
]

const F = makeFilm({
  id: 'r2a0147', key: 'F', accent: SAG, solo: S, ending: 'lesson',
  title: 'Sagittarius, have | you *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Explorer mode: | *needs snacks.*', mood: 'sparkle' },
  lesson: { text: 'Adventures need fuel. | *Feed the explorer.*', chip: 'STATUS: FED' },
  last: {
    text: 'Now go. | *After lunch.*',
    draw(x, t, lt) {
      const d = ease.outBack(prog(lt, 0.4, 0.9))
      if (lt > 0.35) drawBits(x, SANDWICH, SAND_C, 800, lerp(500, 1120, d), 18, { rot: 0.08 })
      label(x, 800, 1270, 'LUNCH: PACKED', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 40, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
