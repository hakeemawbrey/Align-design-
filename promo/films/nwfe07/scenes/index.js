// nwfe07: WAIT FOR IT, "Both. Side by side." (18 s vertical trial reel, Wait for It Vol. 2 ep 7, music: screwed · G#m)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Libra is choosing | *an ornament.*" + "wait for it…". ♎ Libra, mid-weigh, holds a pink ornament and a
//             teal one like a pair of scales; ♑ Capricorn waits by a little tree.
//   3.95–9.3  "This could | *take all night…*"  Stickers: "option one, *option two*" · "five minutes: *undecided*" ·
//             "…it put *both* back?!". The ornaments see-saw, then drop back into their box.
//   9.45      card cut.
//   9.5–13.4  "Which one? | *Both.*"  On the drop both fly onto the same branch, side by side, tagged L and C.
//             ♎ LIBRA: "couldn't choose. so, *together*."
//   13.45–15.5 "*Both*. Side by side."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const TREE = { x: 600, base: 1210 }
const BOX = { x: 400, y: 1215 }
const BRANCH = [[560, 1005], [636, 1005]]
const OCOL = [['#ff8fb1', '#d8577f'], ['#5fd0c0', '#2f9a8c']]

function tree(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  const { x: cx, base } = TREE
  R(x, INK, cx - 26, base - 70, 52, 76); R(x, '#7a4a2a', cx - 20, base - 66, 40, 70)
  const tiers = [[base - 70, 300, 110], [base - 160, 240, 110], [base - 250, 170, 100], [base - 330, 100, 90]]
  for (const [y, w, h] of tiers) { R(x, INK, cx - w / 2 - 6, y - h - 6, w + 12, h + 12) }
  for (const [y, w, h] of tiers) { R(x, '#2f8a5a', cx - w / 2, y - h, w, h); R(x, '#45b070', cx - w / 2, y - h, w, 14); R(x, '#eef6ff', cx - w / 2, y - h, w * 0.4, 8) }
  // tiny lights
  for (let i = 0; i < 9; i++) { const ly = base - 100 - i * 32, lx = cx + ((i % 2) ? 1 : -1) * (90 - i * 8); R(x, (i + Math.floor(t * 2)) % 3 ? GOLD : '#fff3c4', lx - 5, ly - 5, 10, 10) }
  // the star on top
  R(x, INK, cx - 22, base - 470, 44, 44); R(x, GOLD, cx - 16, base - 464, 32, 32)
  x.restore()
}

function ornament(x, cx, cy, i, s = 1, tag = null, tagK = 0) {
  const [c, d] = OCOL[i]
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -3, -60, 6, 26)
  R(x, INK, -14, -40, 28, 18); R(x, '#c9ccd8', -10, -36, 20, 12)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 32, 0, Math.PI * 2); x.fill()
  x.fillStyle = c; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.fill()
  R(x, d, -26, 4, 52, 8); R(x, '#ffffff', -14, -16, 9, 9)
  if (tag && tagK > 0.01) {
    x.save(); x.translate(0, 52); x.scale(tagK, tagK)
    R(x, INK, -20, -14, 40, 34); R(x, BONE, -16, -10, 32, 26)
    x.font = "800 20px Inter, Arial, sans-serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, 4)
    x.restore()
  }
  x.restore()
}

function ornaments(x, t, T, ctx) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const H = ctx.hero || { ...ctx.P.hero, F: { cy: ctx.P.hero.y } }
  const back = ease.inOutCubic(prog(t, T.stk[2] - 0.3, T.stk[2] + 0.3))
  const fly = ease.inOutCubic(prog(t, T.reveal + 0.02, T.reveal + 0.55))
  x.save(); x.globalAlpha = k
  // the box (appears for the "put both back" beat, and stays)
  const bk = pop01(t, T.stk[2] - 0.5, 0.3, 2.2)
  if (bk > 0.01) { x.save(); x.translate(BOX.x, BOX.y); x.scale(bk, bk); R(x, INK, -70, -50, 140, 56); R(x, '#c94f6d', -64, -44, 128, 44); R(x, GOLD, -8, -44, 16, 44); x.restore() }
  const seesaw = Math.sin(t * 2.6) * (1 - back)
  for (let i = 0; i < 2; i++) {
    const d = i ? 1 : -1
    const hx = H.x + 105 + d * 70, hy = H.F.cy - 120 + d * 40 * seesaw
    const bx = BOX.x + d * 26, by = BOX.y - 60
    let ox = lerp(hx, bx, back), oy = lerp(hy, by, back)
    oy -= 120 * Math.sin(Math.PI * fly) * (fly > 0 && fly < 1 ? 1 : 0)
    ox = lerp(ox, BRANCH[i][0], fly); oy = lerp(oy, BRANCH[i][1] + 60, fly)
    const tagK = pop01(t, T.reveal + 0.65 + i * 0.12, 0.3, 2.4)
    ornament(x, ox, oy, i, lerp(1.35, 0.95, fly), i ? 'C' : 'L', tagK)
  }
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe07', key: 'G#m', seed: 4707,
  hero: { sign: 'libra', lineColor: '#ffb3cc' },
  date: { sign: 'capricorn' },
  pos: { hero: { x: 180, y: 1080, s: 220 }, date: { x: 915, y: 1090, s: 195 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Libra is choosing | *an ornament.*', h0Accent: '#ffb3cc',
  h1: 'This could | *take all night…*',
  h2: 'Which one? | *Both.*', h2Accent: PINK,
  last: '*Both*. Side by side.', lastAccent: GOLD,
  stickers: ['option one, *option two*', 'five minutes: *undecided*', '…it put *both* back?!'],
  line: { who: 'hero', text: 'couldn’t choose. so, *together*.' },
  focus: { x: 560, y: 980 },
  glow: { x: 598, y: 1040 },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: t > T.stk[2] ? 'squint' : 'neutral', look: [Math.sin(t * 2.6) > 0 ? 1 : -1, -0.6] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'build') return { mood: t > T.stk[1] ? 'eyeroll' : 'neutral', look: [-1, 0] }
    if (ph === 'reveal' && t > T.reveal + 0.6) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 26, seed: 2, alpha: 0.45 * clamp(popOut(t, T.out)), y1: 940, speed: 0.6 }) },
  mid(x, t, T) { tree(x, t, T) },
  front(x, t, T, ctx) {
    ornaments(x, t, T, ctx)
    sparkles(x, t, 598, 1060, T.reveal + 0.55, 12, 140, 1, [GOLD, PINK, '#5fd0c0'])
  },
  cues: T => [
    ...Array.from({ length: 12 }, (_, i) => ['pop', r3(0.6 + i * 1.208), i % 2 ? 659.25 : 587.33, 0.012, i % 2 ? 0.3 : -0.3]).filter(c => c[1] < T.stk[2] - 0.3),
    ['whoosh', r3(T.stk[2] - 0.3), 0.4, 0.03], ['tick', r3(T.stk[2] + 0.3), 0.04],
    ['whoosh', r3(T.reveal + 0.02), 0.5, 0.04], ['pop', r3(T.reveal + 0.55), 1318.51, 0.035, -0.1], ['pop', r3(T.reveal + 0.6), 1567.98, 0.035, 0.1],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
