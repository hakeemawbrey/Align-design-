// trpovguess (20 s vertical, Star Talk Trends §9 POV, ep 2 · synthwave · G#m) · story 0–15.6, then the end card.
// "POV: your crush says *“my sign? guess.”*" The camera is you; ♎ LIBRA, your crush, fills the frame, smug.
//   0.0–4.2   rule of three, slow: you guess "Aries?" … "Taurus??" … "…Gemini?" Each sign tile flies up into a ring
//             around them and gets a red ✗ stamp; they shake their head every time.
//   4.4       LIBRA: "nope. *cold.* freezing, even."
//   6.2–8.6   the flurry: the other nine tiles fly in, ✗ ✗ ✗ ✗ ✗ ✗ ✗ ✗ ✗, the counter ticks to 12/12 ✗. (Libra was one of
//             them. It got a ✗ too.) Pisces, in the back, gets a ✗ and bursts into tears.
//   9.05      card cut.
//   9.3       LIBRA: "okay fine. i'm a *Libra.*"  The ♎ tile at the top pulses gold under its ✗.  You: "I SAID *LIBRA.*"
//   11.9      LIBRA (blushing): "i know. you were *cute* guessing."
//   13.3      Last line: "*Wrong.* All twelve."
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, R, pop01, outK, prog, ease, lerp, clamp, easeOutBack, INK, BONE, HOT, GOLD, INTER, r3 } from './povkit.js'
import { talkHops } from '../../startalk.js'

const LIB = signStar('libra')
const LN = `${LIB.glyph}︎ LIBRA`
const T = { x0: 2.0, flurry: 6.3, gap: 0.25, cut: 9.05, reveal: 9.3, said: 10.75, blush: 11.9, last: 13.3, out: [15.1, 15.5] }
const LINES = [
  { t: 4.45, speaker: LN, text: 'nope. *cold.* freezing, even.', color: '#ff9cf0' },
  { t: 9.3, speaker: LN, text: 'okay fine. i’m a *Libra.*', color: '#ff9cf0' },
  { t: 11.9, speaker: LN, text: 'i know. you were *cute* guessing.', color: '#ff9cf0' },
]
// the twelve tiles, in your guessing order; their seat on the ring puts ♎ at the top
const ORDER = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
const TILES = ORDER.map((id, i) => {
  const s = signStar(id)
  const at = i < 3 ? [1.4, 2.5, 3.5][i] : T.flurry + (i - 3) * T.gap
  const ang = -Math.PI / 2 + (i - 6) * (Math.PI / 6)
  return { id, ...s, at, x: 540 + Math.cos(ang) * 400, y: 990 + Math.sin(ang) * 330, stamp: at + (i < 3 ? 0.45 : 0.16) }
})
const STAMPS = TILES.map(tl => tl.stamp)
const HOPS = [0.7, ...STAMPS.slice(0, 3).map(s => s + 0.05), ...talkHops(LINES, LN), T.flurry + 0.5, T.flurry + 1.2, T.flurry + 1.9, T.blush, T.last + 0.4]
const CENTER = { x: 540, y: 1000, s: 470 }
const XBM = ['X.....X', 'XX...XX', '.XX.XX.', '..XXX..', '.XX.XX.', 'XX...XX', 'X.....X']

function tile(x, t, tl, i) {
  if (t < tl.at) return
  const fly = ease.outCubic(prog(t, tl.at, tl.at + (i < 3 ? 0.35 : 0.18)))
  const o = outK(t, [T.last - 0.3, T.last])
  if (o <= 0) return
  const cx = lerp(540, tl.x, fly), cy = lerp(2000, tl.y, fly), sz = lerp(150, 104, fly) * o
  const isLib = tl.id === 'libra' && t > T.reveal
  const pulse = isLib ? 1 + 0.12 * Math.sin((t - T.reveal) * 8) : 1
  x.save(); x.translate(cx, cy); x.scale(pulse, pulse); x.rotate((i % 2 ? 0.08 : -0.08) * (1 - fly * 0.5))
  const h = sz / 2
  R(x, INK, -h - 6, -h, sz + 12, sz); R(x, INK, -h, -h - 6, sz, sz + 12)
  R(x, isLib ? GOLD : '#2a1a52', -h, -h, sz, sz)
  R(x, tl.color, -h + 6, -h + 6, sz - 12, 8)
  x.fillStyle = isLib ? INK : tl.color; x.font = `700 ${Math.round(sz * 0.56)}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', 'Noto Sans Symbols 2', serif`
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tl.glyph + '︎', 0, 4)
  x.restore()
  // the ✗ stamp
  if (t > tl.stamp) {
    const k = easeOutBack(prog(t, tl.stamp, tl.stamp + 0.18), 2.6)
    const shake = isLib ? 6 * Math.sin((t - T.reveal) * 30) * Math.exp(-(t - T.reveal) * 2) : 0
    drawBits(x, XBM, { X: '#ff3b5c' }, cx + shake + sz * 0.42, cy + sz * 0.38, 8 * k * o * pulse, { rot: -0.12 })
  }
}

function crush(x, t) {
  let mood = 'wink', look = [0, 0]
  const lastStamp = STAMPS.filter(s => s <= t).pop() ?? -9
  if (t > 1.4 && t < T.flurry) { mood = 'neutral'; look = [0, 0] }
  if (t - lastStamp < 0.45 && t < T.flurry) { mood = 'happy'; look = [Math.sin((t - lastStamp) * 30) > 0 ? 1 : -1, 0] }
  if (t > T.flurry - 0.1 && t < 8.7) { mood = 'happy'; look = undefined }
  if (t > 8.7 && t < T.reveal) mood = 'wink'
  if (t > T.reveal && t < T.said) { mood = 'squint'; look = [1, -1] }
  if (t > T.said && t < T.blush) { mood = 'wide'; look = [0, 0] }
  if (t > T.blush) { mood = 'heart'; look = [0, 0] }
  if (t > T.last) mood = 'sparkle'
  const squash = t > T.said && t < T.said + 0.3 ? -0.1 : 0
  drawStarChar(x, CENTER.x, CENTER.y, CENTER.s, t, { color: LIB.color, glyph: LIB.glyph, mood, look, hops: HOPS, seed: 4, glow: 1.15, squash, blink: mood === 'wide' ? false : undefined, pop: pop01(t, 0.4, 0.4, 2) })
  // laughing "ha" pops during the flurry
  if (t > T.flurry && t < 8.7) for (let k = 0; k < 4; k++) {
    const t0 = T.flurry + 0.2 + k * 0.55, ph = t - t0
    if (ph < 0 || ph > 0.5) continue
    x.save(); x.globalAlpha *= 1 - ph / 0.5; x.font = `800 44px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('ha', 540 + (k % 2 ? 230 : -230), 760 - ph * 120); x.restore()
  }
}

const EP = makePOV({
  id: 'trpovguess', duration: 20,
  caption: 'your crush says *“my sign? guess.”*',
  lines: LINES,
  boxes: [{ from: 0, to: 1, open: 4.25, close: 7.6 }, { from: 1, to: 3, open: 9.15, close: 14.75 }],
  stickers: [
    { at: 1.4, out: [2.35, 2.5], text: 'Aries?', x: 300, y: 400, rot: -4, size: 52, kind: 'you' },
    { at: 2.5, out: [3.35, 3.5], text: 'Taurus??', x: 780, y: 410, rot: 3, size: 52, kind: 'you' },
    { at: 3.5, out: [6.0, 6.2], text: '…Gemini?', x: 540, y: 400, rot: -2, size: 52, kind: 'you' },
    { at: T.said, out: [12.9, 13.15], text: 'I SAID *LIBRA.*', x: 540, y: 380, rot: -3, size: 60, kind: 'hot' },
  ],
  last: { at: T.last, text: '*Wrong.* All twelve.', top: 420, size: 110, accentSize: 156, color: '#ff6b8a' },
  cuts: [T.cut],
  punch: [{ at: 1.4, dur: 0.7, z: 0.06 }, { at: T.flurry, dur: 2.3, z: 0.1 }, { at: T.said, dur: 1.0, z: 0.22, x: 540, y: 760 }],
  pitch: { [LN]: 783.99 },
  scene(x, t) {
    const lastPis = TILES[11].stamp
    pisces(x, t, { x: 945, y: 1265, s: 150, tears: t > T.blush ? 3 : t > lastPis ? 3 : 1, mood: t > T.blush ? 'happy' : t > lastPis ? 'wide' : 'sparkle', look: [-1, -1], pop: pop01(t, 1.0, 0.3, 2) })
    crush(x, t)
    TILES.forEach((tl, i) => tile(x, t, tl, i))
    if (t > T.blush) for (let i = 0; i < 5; i++) { const ph = t - T.blush - i * 0.2; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#ff4f86' : '#ff9cf0' }, 540 + (i - 2) * 110 + Math.sin(ph * 4 + i) * 16, 820 - ph * 130, 9, { alpha: clamp(1 - ph / 2) * outK(t, T.out) }) }
    sparkles(x, t, TILES[6].x, TILES[6].y, T.reveal + 0.2, 10, 120, 2, [GOLD, BONE, HOT])
    sparkles(x, t, 540, 900, T.last + 0.35, 12, 300, 1, ['#ff6b8a', GOLD, BONE])
  },
  front(x, t) {
    // the counter during the flurry
    const n = TILES.filter(tl => t > tl.stamp).length
    const k = pop01(t, T.flurry - 0.1, 0.3, 2.4) * outK(t, [8.85, 9.0])
    if (k > 0.01 && t > T.flurry - 0.1) {
      x.save(); x.translate(540, 430); x.scale(k, k); x.rotate(-0.04)
      R(x, INK, -190, -52, 380, 104); R(x, '#ff3b5c', -184, -46, 368, 92)
      x.fillStyle = '#fff8ef'; x.font = `800 58px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`✗ ${n}/12`, 0, 4)
      x.restore()
    }
  },
  cues: [
    ...TILES.map((tl, i) => ['whoosh', r3(tl.at), i < 3 ? 0.3 : 0.14, i < 3 ? 0.03 : 0.018]),
    ...TILES.map((tl, i) => ['pop', r3(tl.stamp), i < 3 ? 220 : 196 + i * 4, i < 3 ? 0.06 : 0.04, (i % 2 ? 0.3 : -0.3)]),
    ...TILES.slice(0, 3).map(tl => ['tick', r3(tl.stamp), 0.07]),
    ['riser', r3(T.flurry), 8.6, 0.03],
    ['bell', r3(T.reveal + 0.2), 1567.98, 0.03, 1, 0], ['glitter', r3(T.reveal + 0.2), r3(T.reveal + 0.6)],
    ['boom', r3(T.said), 0.14], ['pluck', r3(T.blush), 1174.66, 0.045, 0.5, 0], ['pluck', r3(T.blush + 0.12), 1567.98, 0.04, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
