// trexpectpicnic (20 s vertical, Star Talk Trends · EXPECTATION vs REALITY · 1) "Reality wins." · lofi Am.
// The format's shared look lives in ./evr.js (identical in all five trexpect films). Story 0–15.6, then the end card.
//   EXPECTATION  "Expectation: | the *perfect* picnic."  Golden hour on a rolling hill: a checkered blanket, a basket, a
//                neat tower of sandwiches and a bowl of strawberries. ♉ TAURUS and ♊ GEMINI clink glasses (sparkle),
//                little hearts float up.
//   REALITY      "Reality: | *nature* had plans."  An overcast hill, a crumpled blanket. Three stickers:
//                ANTS (a marching line heads for the basket) · WIND (a gust slaps the napkin over Gemini's face) ·
//                ONE SANDWICH (Taurus opens the basket: one lonely sandwich… which the ants carry off; the sticker is
//                struck through: "zero.").  A hush. They look at each other… and crack up.
//   card cut     at the laugh.
//   TURN         "They laughed | till they *cried.*"  Reality fills the frame: off to the side, the ants are having the
//                perfect picnic with the sandwich, and ♓ Pisces sits on a rock sobbing happy tears. Box (GEMINI):
//                "best picnic of my *life.*"
//   LAST         "Reality *wins.*"  A stamp THUNKs on: 10/10.
import { makeEVR, BEAT, r3, INK, BONE, GOLD, PINK, HOT, clamp, lerp, prog, ease, easeOutBack } from './evr.js'

const CHECK = ['#e8475a', '#fff2e6']
const BASKET = ['..hhhhhhhhhh..', '.h..........h.', 'h............h', 'WWWWWWWWWWWWWW', 'wWwWwWwWwWwWwW', 'WwWwWwWwWwWwWw', 'wWwWwWwWwWwWwW', 'WwWwWwWwWwWwWw', '.wWwWwWwWwWwW.']
const BASK_C = { h: '#8a5a2b', W: '#c88a4a', w: '#a8693a' }
const LID = ['WWWWWWWWWWWWWW', 'wWwWwWwWwWwWwW']
const SANDWICH = ['..bbbbbbbb..', '.bBBBBBBBBb.', 'gggggggggggg', 'rrrrrrrrrrrr', '.bBBBBBBBBb.', '..bbbbbbbb..']
const SAND_C = { b: '#d99a4e', B: '#f4cf8a', g: '#5fc75a', r: '#e8475a' }
const STRAW = ['.g.', 'rrr', 'rRr', '.r.']
const STRAW_C = { g: '#5fc75a', r: '#e8344a', R: '#ff8a8a' }
const BOWL = ['WWWWWWWWWW', '.WwwwwwwW.', '..WWWWWW..']
const GLASS = ['GpppG', 'GpPpG', '.GpG.', '..G..', '..G..', '.GGG.']
const GLASS_C = { G: '#e8f6ff', p: '#ff8fb1', P: '#ffd0e0' }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const ANT = ['a.a.a', '.aaa.', 'aAaAa']
const ANT_C = { a: '#241a2e', A: '#3a2c48' }
const TREE = ['....LLLL....', '..LLLLLLLL..', '.LLLLlLLLLL.', 'LLLlLLLLLlLL', 'LLLLLLLLLLLL', '.LLLLLlLLLL.', '..LLLLLLLL..', '.....tt.....', '.....tt.....', '.....tt.....', '.....tt.....', '....tttt....']
const PLATE = ['.WWWW.', 'WwwwwW', 'WwwwwW', '.WWWW.']

const STAR_Y = 1084, STAR_S = 176, TAU_X = 410, GEM_X = 668
const G1 = BEAT(9), G2 = BEAT(11), G3 = BEAT(13)
const T2 = {
  clink: BEAT(3), hearts: BEAT(5),
  lid: G3 - 0.05, sandUp: G3 + 0.05, antsTake: G3 + 0.42, strike: G3 + 0.52,
  napFly: 8.32,
}

function hill(x, H, top, col, colD, amp, seed) {
  for (let X = 0; X < 1080; X += 12) {
    const y = top + amp * Math.sin(X / 170 + seed) + amp * 0.5 * Math.sin(X / 63 + seed * 2)
    H.px(X, y, 12, 1400 - y, col)
    H.px(X, y, 12, 6, colD)
  }
}
function blanket(x, H, t, { rumple = 0 } = {}) {
  const L = 324, Tp = 1146, cs = 24, nx = 18, ny = 5
  H.px(L - 6, Tp - 6, nx * cs + 12, ny * cs + 12, INK)
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const dy = rumple ? Math.round(rumple * 6 * Math.sin(i * 1.3 + j * 0.7)) : 0
    H.px(L + i * cs, Tp + j * cs + dy, cs, cs, CHECK[(i + j) % 2])
  }
}

const EVR = makeEVR({
  id: 'trexpectpicnic', pair: ['taurus', 'gemini'],
  heads: {
    expect: 'Expectation: | the *perfect* picnic.',
    reality: 'Reality: | *nature* had plans.',
    turn: 'They laughed | till they *cried.*',
    last: 'Reality *wins.*',
  },
  accents: { reality: '#9fe6b0' },
  stickers: [{ text: 'ANTS', x: -120, y: 610, rot: -0.08 }, { text: 'WIND', x: 110, y: 680, rot: 0.06 }, { text: 'ONE SANDWICH', x: -10, y: 780, rot: -0.04, strike: { at: G3 + 0.52, text: 'zero.' } }],
  stamp: '10/10',
  clock: { expect: '5:30 PM', reality: '5:34 PM' },
  line: { who: 1, text: 'best picnic of my *life.*' },
  gloss: ['#ffc4dc', '#ffcf94'],
  real: ['#8c93ab', '#5d5b78'],

  glossy(x, t, W) {
    const { px, bits } = W
    // the golden-hour sun
    const sg = x.createRadialGradient(560, 760, 0, 560, 760, 260); sg.addColorStop(0, 'rgba(255,250,210,0.95)'); sg.addColorStop(0.35, 'rgba(255,224,150,0.6)'); sg.addColorStop(1, 'rgba(255,200,140,0)')
    x.fillStyle = sg; x.fillRect(200, 500, 700, 600)
    bits(['..SSSS..', '.SSSSSS.', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS', 'SSSSSSSS', '.SSSSSS.', '..SSSS..'], { S: '#fff3c0' }, 560, 760, 16, { outline: null })
    hill(x, W, 1010, '#7fd37a', '#a6ec8e', 22, 1)
    blanket(x, W, t)
    // the spread: a tidy sandwich tower, the strawberry bowl, the basket
    for (let i = 0; i < 3; i++) bits(SANDWICH, SAND_C, 540, 1214 - i * 24, 5.5)
    bits(BOWL, { W: '#fff', w: '#ffd0e0' }, 458, 1232, 7)
    for (let i = 0; i < 4; i++) bits(STRAW, STRAW_C, 432 + i * 17, 1218 - (i % 2) * 6, 5)
    bits(BASKET, BASK_C, 736, 1196, 7)
    // the stars, posed + the clink
    const ck = ease.inOutCubic(prog(t, T2.clink - 0.5, T2.clink)) * (1 - ease.inOutCubic(prog(t, T2.clink + 0.4, T2.clink + 0.9)))
    const mood = t > T2.hearts - 0.2 ? 'heart' : 'sparkle'
    W.star(0, TAU_X, STAR_Y, STAR_S, { mood, look: [1, 0], hops: [1.0, T2.clink + 0.05], pop: W.pop01(t, 0.7, 0.35, 2) })
    W.star(1, GEM_X, STAR_Y, STAR_S, { mood, look: [-1, 0], hops: [1.15, T2.clink + 0.08], pop: W.pop01(t, 0.82, 0.35, 2) })
    const gk = W.pop01(t, 1.2, 0.3, 2)
    if (gk > 0.01) {
      bits(GLASS, GLASS_C, lerp(486, 522, ck), 1012 - 26 * ck, 6, { rot: 0.35 * ck, sx: gk, sy: gk })
      bits(GLASS, GLASS_C, lerp(594, 558, ck), 1012 - 26 * ck, 6, { rot: -0.35 * ck, sx: gk, sy: gk })
    }
    W.sparkles(t, 540, 990, T2.clink, 8, 60, 1, [GOLD, '#fff', PINK])
    // hearts float up
    for (let i = 0; i < 5; i++) {
      const b = T2.hearts + i * 0.32, q = prog(t, b, b + 2.2)
      if (q <= 0 || q >= 1) continue
      bits(HEART, { H: i % 2 ? HOT : PINK }, 540 + (i - 2) * 60 + 18 * Math.sin(t * 3 + i), 960 - q * 380, 5, { alpha: Math.sin(Math.PI * q) })
    }
  },

  scrappy(x, t, W) {
    const { px, bits, T } = W
    const wind = t > G2 - 0.1 && t < T.hush[0] + 0.4
    // overcast clouds
    for (let i = 0; i < 6; i++) {
      const cx = ((i * 230 + t * (wind ? 120 : 30)) % 1400) - 160, cy = 600 + (i % 3) * 70
      px(cx - 110, cy - 26, 220, 52, 'rgba(200,204,222,0.5)'); px(cx - 70, cy - 52, 140, 104, 'rgba(200,204,222,0.42)')
    }
    hill(x, W, 1010, '#5b8d5c', '#729f68', 22, 1)
    // the tree with a paper plate stuck in it (revealed by the widen)
    bits(TREE, { L: '#4f7d4f', l: '#6a9a5f', t: '#6b4a2e' }, 136, 1000, 16)
    bits(PLATE, { W: '#fff', w: '#e9e2d6' }, 120 + 3 * Math.sin(t * 9), 914, 8, { rot: 0.4 + 0.15 * Math.sin(t * 7) })
    // grass blades bend in the wind
    for (let X = 40; X < 1060; X += 38) {
      const b = wind ? 10 + 4 * Math.sin(t * 18 + X) : 2 * Math.sin(t * 2 + X)
      px(X, 1050 + 12 * Math.sin(X / 170 + 1), 5, 14, '#3f6a42'); px(X + b * 0.6, 1040 + 12 * Math.sin(X / 170 + 1), 5, 12, '#3f6a42')
    }
    blanket(x, W, t, { rumple: 1 })
    // the basket: the lid flips open at gag 3
    const lid = ease.outBack(prog(t, T2.lid, T2.lid + 0.3))
    bits(BASKET, BASK_C, 736, 1196, 7)
    bits(LID, BASK_C, 736 + 30 * lid, 1170 - 30 * lid, 7, { rot: 1.2 * lid })
    // ONE sandwich rises out of the basket… then the ants carry it off to the right
    const up = ease.outBack(prog(t, T2.sandUp, T2.sandUp + 0.3))
    const take = prog(t, T2.antsTake, T2.antsTake + 3.2)
    let sx = 736, sy = 1170 - 46 * up
    if (take > 0) { sx = lerp(736, 960, ease.inOutQuad(take)); sy = lerp(1124, 1220, ease.outCubic(prog(t, T2.antsTake, T2.antsTake + 0.3))) }
    if (t > T2.sandUp && t < T2.antsTake + 3.4) bits(SANDWICH, SAND_C, sx, sy + 2 * Math.sin(t * 20) * (take > 0 ? 1 : 0), 6, { rot: take > 0 ? 0.08 * Math.sin(t * 14) : 0 })
    if (t > T2.sandUp && t < T2.sandUp + 0.7) W.sparkles(t, 736, 1110, T2.sandUp + 0.05, 6, 50, 2, [GOLD, '#fff'])
    // the ants: march in from the left, along the blanket edge, to the basket; then under the sandwich, off to the right
    for (let i = 0; i < 9; i++) {
      const s0 = G1 - 0.35 + i * 0.12
      if (t < s0) continue
      let ax, ay = 1262
      const march = (t - s0) * 150
      ax = 230 + march
      if (take > 0) {
        if (i < 4) { ax = sx - 42 + i * 26; ay = sy + 26 }            // four carriers under the sandwich
        else { ax = Math.min(ax, 700 + (i - 4) * 14) + take * 230 }
      } else ax = Math.min(ax, 640 + i * 12)
      bits(ANT, ANT_C, ax, ay + (Math.floor(t * 10 + i) % 2) * 2, 3.4, { outline: null })
    }
    // the ants' own perfect picnic, revealed by the widen (a tiny blanket, the sandwich lands on it)
    if (W.wk > 0 || t > T.widen[0]) {
      const L = 890, Tp = 1236
      px(L - 4, Tp - 4, 6 * 14 + 8, 3 * 14 + 8, INK)
      for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) px(L + i * 14, Tp + j * 14, 14, 14, CHECK[(i + j) % 2])
      bits(SANDWICH, SAND_C, 932, 1222, 5)
      for (let i = 0; i < 5; i++) bits(ANT, ANT_C, 884 + i * 22 + (i > 1 ? 20 : 0), 1290 + (Math.floor(t * 4 + i) % 2) * 2, 3.4, { outline: null })
      bits(['.p.', 'ppp', '.p.'], { p: '#ff8fb1' }, 1010, 1262, 4)
    }
    // Pisces on a rock, sobbing happy tears (revealed by the widen)
    px(860, 1150, 120, 44, INK); px(866, 1154, 108, 36, '#8a8aa0'); px(872, 1154, 96, 8, '#a8a8bc')
    W.pisces(918, 1084, 140, t > T.laugh ? 3 : 2, t > T.laugh ? 'happy' : 'wide', { look: [-1, 0], hops: [T.widen[1] + 0.05, T.widen[1] + 0.5] })

    // the couple
    const hush = t > T.hush[0] && t < T.laugh
    let tm = 'neutral', gm = 'happy', tl = [1, 0], gl = [-1, 0]
    if (t > G1 && t < G2) { tm = 'wide'; tl = [-1, 1]; gm = 'squint'; gl = [-1, 1] }
    if (t > G2 && t < G3) { tm = 'wide'; tl = [1, 0]; gm = 'wide'; gl = [0, 0] }
    if (t > G3) { tm = 'sparkle'; tl = [1, 0]; gm = 'wide' }
    if (t > T2.antsTake) { tm = 'wide'; tl = [1, 1] }
    if (hush) { tm = 'neutral'; tl = [1, 0]; gm = 'neutral'; gl = [-1, 0] }
    if (t > T.laugh) { tm = 'happy'; gm = 'happy'; tl = gl = undefined }
    if (t > T.line - 0.1) { tm = 'heart' }
    const tears = t > T.laugh + 0.5 ? 2 : 0
    const sq = t > T.laugh && t < T.laugh + 2 ? 0.06 * Math.sin((t - T.laugh) * 30) : 0
    W.star(0, TAU_X, STAR_Y, STAR_S, { mood: tm, look: tl, tears, squash: sq, hops: [T.Rin[1] + 0.1, T2.sandUp + 0.1, ...W.laughHops] })
    const F = W.star(1, GEM_X, STAR_Y, STAR_S, { mood: gm, look: gl, tears, squash: -sq, hops: [T.Rin[1] + 0.2, G2 + 0.05, ...W.laughHops.map(h => r3(h + 0.12)), T.line + 0.1] })
    // WIND: the napkin slaps over Gemini's face, then blows away at the hush
    const nIn = ease.outBack(prog(t, G2 - 0.08, G2 + 0.18)), nOut = ease.inCubic(prog(t, T2.napFly, T2.napFly + 0.5))
    if (nIn > 0 && nOut < 1) {
      const nx = lerp(820, F.ox, nIn) + nOut * 420, ny = lerp(1180, F.cy - 6, nIn) - nOut * 260
      x.save(); x.translate(nx, ny); x.rotate(0.12 * Math.sin(t * 17) + nOut * 1.4)
      px(-62, -34, 124, 68, INK)
      for (let j = 0; j < 4; j++) for (let i = 0; i < 7; i++) px(-58 + i * 16.6, -30 + j * 15, 16.6, 15, CHECK[(i + j) % 2])
      x.restore()
    }
    // wind streaks
    if (wind) for (let i = 0; i < 7; i++) {
      const q = ((t * 1.7 + i * 0.29) % 1), X = lerp(-100, 1180, q), Y = 640 + i * 70
      px(X, Y, 120, 4, 'rgba(240,244,255,0.6)'); px(X + 140, Y, 40, 4, 'rgba(240,244,255,0.6)')
    }
  },

  cues(T) {
    return [
      // glossy: the clink + the hearts
      ['bell', r3(T2.clink), 2349.32, 0.04, 1.6, 0], ['bell', r3(T2.clink + 0.03), 2793.83, 0.025, 1.4, 0.2], ['glitter', T2.clink, r3(T2.clink + 0.4)],
      ...Array.from({ length: 5 }, (_, i) => ['pluck', r3(T2.hearts + i * 0.32), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.022, 0.4, (i - 2) * 0.2]),
      // ants march (tiny ticks)
      ...Array.from({ length: 18 }, (_, i) => ['tick', r3(G1 - 0.3 + i * 0.12), 0.012]),
      // wind gust + napkin slap
      ['whoosh', r3(G2 - 0.2), 0.9, 0.06], ['tick', r3(G2 + 0.12), 0.07], ['snare', r3(G2 + 0.12), { gain: 0.05, decay: 0.12, tone: 220 }],
      // the basket: creak, ta-da, then the sad slide as the ants take it
      ['tick', r3(T2.lid), 0.05], ['pluck', r3(T2.sandUp + 0.05), 1318.51, 0.04, 0.5, 0.3], ['pluck', r3(T2.sandUp + 0.15), 1760, 0.035, 0.5, 0.3],
      ['pluck', r3(T2.antsTake + 0.1), 659.25, 0.035, 0.6, 0.3], ['pluck', r3(T2.antsTake + 0.32), 587.33, 0.035, 0.6, 0.3], ['pluck', r3(T2.antsTake + 0.54), 523.25, 0.035, 0.9, 0.3],
      ['tick', r3(T2.strike), 0.05], ['whoosh', r3(T2.strike), 0.2, 0.025],
      ['whoosh', r3(T2.napFly), 0.4, 0.03],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = EVR
