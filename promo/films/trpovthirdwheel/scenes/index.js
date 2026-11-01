// trpovthirdwheel (20 s vertical, Star Talk Trends §9 POV, ep 1 · synthwave · F#m) · story 0–15.6, then the end card.
// "POV: you're the third wheel and they keep *including* you." The camera is you, across a diner booth from a couple.
//   0.0–2.6   ♋ CANCER and ♌ LEO make heart-eyes at each other (hearts float between them)… then whip round to the
//             lens in unison (on the drop, 1.71). Sticker: "table for *three*".
//   2.6–6.3   (1) a milkshake slides in with THREE straws; the third bends all the way to the camera.
//             LEO: "you HAVE to try this. *three* straws."
//   6.3–9.3   (2) a group selfie, you in the middle, flash… sticker: "it's their *lock screen* now".
//             CANCER: "group selfie! you go in the *middle.*"
//   9.35      card cut.
//   9.4–12.8  (3, the twist) they slide a blind mystery card (face down) across the table to you.
//             LEO: "also… we found you *a fourth.*"  Sticker: "now they're *matchmaking*". Your hand reaches for it.
//   12.95     Last line: "Best *wheel*."  Hearts burst. Pisces, at the next booth, fountains (happy tears all film).
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, drawImg, R, pop01, outK, popOut, prog, ease, lerp, clamp, easeOutBack, INK, BONE, HOT, GOLD, YOU, CYAN, INTER, r3, BEAT } from './povkit.js'
import { talkHops } from '../../startalk.js'

const CAN = signStar('cancer'), LEO = signStar('leo')
const CN = `${CAN.glyph}︎ CANCER`, LN = `${LEO.glyph}︎ LEO`
const T = { turn: BEAT(2), shake: [2.6, 3.0], straw: 4.2, phone: [6.25, 6.6], flash: 8.15, lock: 8.35, phoneOut: [9.0, 9.3], cut: 9.35, card: [9.55, 10.25], reach: [11.4, 12.0], last: 12.95, out: [15.1, 15.5] }
const LINES = [
  { t: 3.0, speaker: LN, text: 'you HAVE to try this. *three* straws.', color: '#ffd36a' },
  { t: 6.5, speaker: CN, text: 'group selfie! you go in the *middle.*', color: '#9fe6ff' },
  { t: 9.8, speaker: LN, text: 'also… we found you *a fourth.*', color: '#ffd36a' },
]
const CAN_P = { x: 330, y: 1000, s: 300 }, LEO_P = { x: 750, y: 1000, s: 300 }
const CAN_HOPS = [T.turn, ...talkHops(LINES, CN), T.flash, T.card[0], T.last + 0.35, T.last + 0.9]
const LEO_HOPS = [T.turn + 0.04, ...talkHops(LINES, LN), T.flash + 0.05, T.last + 0.4, T.last + 0.95]

function table(x) {
  R(x, INK, 70, 1158, 940, 160)
  R(x, '#3a1f6e', 78, 1166, 924, 144)
  R(x, '#ff8fc8', 78, 1166, 924, 24)
  R(x, '#ffd1e8', 78, 1166, 924, 6)
  R(x, '#c8d4ff', 78, 1196, 924, 6)                       // chrome trim
  for (let i = 0; i < 12; i++) R(x, 'rgba(255,255,255,0.06)', 100 + i * 78, 1214, 40, 90)
}
function milkshake(x, t) {
  const k = easeOutBack(prog(t, ...T.shake), 1.4), gone = ease.inCubic(prog(t, T.phone[0] - 0.3, T.phone[0]))
  if (k <= 0 || gone >= 1) return
  const cx = lerp(1250, 540, k), by = 1168 + gone * 400
  const wig = Math.sin(t * 9) * 6 * prog(t, T.straw, T.straw + 0.2) * (1 - prog(t, T.straw + 1.2, T.straw + 1.6))
  x.save(); x.lineCap = 'round'
  // straws: one to each of them, and the third… to you
  const straw = (pts, w, col) => { x.strokeStyle = INK; x.lineWidth = w + 10; x.beginPath(); x.moveTo(...pts[0]); if (pts.length === 3) x.quadraticCurveTo(...pts[1], ...pts[2]); else x.lineTo(...pts[1]); x.stroke(); x.strokeStyle = col; x.lineWidth = w; x.stroke() }
  straw([[cx - 30, by - 190], [CAN_P.x + 80, 1030]], 14, '#ff4f86')
  straw([[cx + 30, by - 190], [LEO_P.x - 80, 1030]], 14, '#5fd0ff')
  const bend = ease.outBack(prog(t, T.straw, T.straw + 0.5))
  const tip = [lerp(cx, 600, bend) + wig, lerp(by - 300, 1330, bend)], tw = lerp(14, 44, bend)
  straw([[cx, by - 190], [cx + 40 + wig, lerp(by - 330, 820, bend)], tip], tw, '#fff2a8')
  // red stripes along it, and its open end pointing right at you
  x.setLineDash([18, 26]); x.strokeStyle = '#ff4f86'; x.lineWidth = tw * 0.6; x.beginPath(); x.moveTo(cx, by - 190); x.quadraticCurveTo(cx + 40 + wig, lerp(by - 330, 820, bend), ...tip); x.stroke(); x.setLineDash([])
  if (bend > 0.2) { x.fillStyle = INK; x.beginPath(); x.arc(tip[0], tip[1], tw * 0.78 + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff2a8'; x.beginPath(); x.arc(tip[0], tip[1], tw * 0.78, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3a1020'; x.beginPath(); x.arc(tip[0], tip[1], tw * 0.5, 0, Math.PI * 2); x.fill() }
  x.restore()
  // the glass
  R(x, INK, cx - 74, by - 214, 148, 220)
  R(x, 'rgba(200,230,255,0.85)', cx - 66, by - 206, 132, 206)
  R(x, '#ff7eb6', cx - 58, by - 170, 116, 162)
  R(x, '#ffb3d4', cx - 58, by - 170, 116, 18)
  for (const [dx, dy, r] of [[-40, -206, 30], [0, -222, 36], [40, -206, 30]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx, by + dy, r + 5, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[-40, -206, 30], [0, -222, 36], [40, -206, 30]]) { x.fillStyle = '#fff8ef'; x.beginPath(); x.arc(cx + dx, by + dy, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = INK; x.beginPath(); x.arc(cx + 6, by - 266, 19, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#e8283c'; x.beginPath(); x.arc(cx + 6, by - 266, 14, 0, Math.PI * 2); x.fill()
}
function phone(x, t) {
  const k = easeOutBack(prog(t, ...T.phone), 1.6), o = ease.inCubic(prog(t, ...T.phoneOut))
  if (k <= 0 || o >= 1) return
  const cx = 540, cy = lerp(1300, 690, k) - o * 900, w = 270, h = 460, rot = -0.05 + 0.02 * Math.sin(t * 3)
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -w / 2 - 12, -h / 2 - 12, w + 24, h + 24); R(x, '#2b2147', -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#ff7eb6'); g.addColorStop(1, '#5b3fa8'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  // the front camera: the three of you, squished, you in the middle
  const lock = t > T.lock
  drawStarChar(x, -78, 70, 120, t, { color: CAN.color, mood: lock ? 'happy' : 'wink', look: [0, 0], seed: 3, tips: false })
  drawStarChar(x, 78, 70, 120, t, { color: LEO.color, mood: 'happy', look: [0, 0], seed: 5, tips: false })
  drawStarChar(x, 0, 96, 132, t, { color: YOU, mood: t > T.flash ? 'wide' : 'neutral', look: [0, 0], seed: 8, tips: false, blink: false })
  if (lock) {
    x.fillStyle = 'rgba(255,255,255,0.92)'; x.textAlign = 'center'; x.font = `800 74px ${INTER}`; x.fillText('9:41', 0, -96)
    x.font = `700 20px ${INTER}`; x.fillText('Tuesday', 0, -150)
  } else {
    // shutter button + "3 2 1"
    x.fillStyle = '#fff'; x.beginPath(); x.arc(0, h / 2 - 46, 26, 0, Math.PI * 2); x.fill()
    const n = 3 - Math.floor((t - 7.3) / 0.28)
    if (t > 7.3 && n > 0) { x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.fillStyle = '#fff'; x.fillText(String(n), 0, -60) }
  }
  x.restore()
  x.restore()
}
function couple(x, t) {
  const turned = t > T.turn
  const hops = { c: CAN_HOPS, l: LEO_HOPS }
  let cm = 'heart', lm = 'heart', cl = [1, 0], ll = [-1, 0]
  if (turned) { cm = 'wide'; lm = 'wide'; cl = [0, 0]; ll = [0, 0] }
  if (t > T.turn + 0.7) { cm = 'happy'; lm = 'sparkle' }
  if (t > T.straw && t < T.phone[0]) { lm = 'happy'; cm = 'sparkle' }
  if (t > T.flash - 0.3 && t < T.lock + 0.2) { cm = 'wink'; lm = 'happy' }
  if (t > T.card[0] && t < T.last) { cm = 'sparkle'; lm = 'wink' }
  if (t > T.last) { cm = 'heart'; lm = 'heart' }
  drawStarChar(x, CAN_P.x, CAN_P.y, CAN_P.s, t, { color: CAN.color, glyph: CAN.glyph, mood: cm, look: cl, hops: hops.c, seed: 3, glow: 1.1, pop: pop01(t, 0.05, 0.35, 2) })
  drawStarChar(x, LEO_P.x, LEO_P.y, LEO_P.s, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, hops: hops.l, seed: 5, glow: 1.1, pop: pop01(t, 0.12, 0.35, 2) })
  // the hearts drifting between them (before they remember you)
  for (let i = 0; i < 5; i++) {
    const born = 0.2 + i * 0.28, ph = t - born
    if (ph < 0) continue
    const a = clamp(Math.sin(Math.PI * clamp(ph / 1.6))) * outK(t, [T.turn - 0.1, T.turn + 0.1])
    if (a > 0.01) drawBits(x, HEART, { H: '#ff4f86' }, 540 + Math.sin(ph * 3 + i) * 40, 960 - ph * 120, 8, { alpha: a })
  }
}
function card(x, t, K) {
  const k = ease.outCubic(prog(t, ...T.card))
  if (t < T.card[0]) return
  const o = popOut(t, [T.out[0] - 0.3, T.out[0]])
  const cx = 540, cy = lerp(1080, 1170, k), w = lerp(120, 240, k), rot = lerp(0.5, -0.06, k) + 0.02 * Math.sin(t * 2.4)
  drawImg(x, K.imgs.back, cx, cy, w * o, { rot })
  // a little "?" tag: the blind card
  if (k > 0.9 && o > 0.5) drawBits(x, ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '.....', '..Q..'], { Q: GOLD }, cx + 128, cy - 150, 9, { alpha: clamp((k - 0.9) * 10) * o })
}

const EP = makePOV({
  id: 'trpovthirdwheel', duration: 20,
  caption: 'you’re the third wheel and they keep *including* you.',
  images: { back: 'card-back.png' },
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.8, close: 12.6 }],
  stickers: [
    { at: 1.2, out: [2.75, 2.95], text: 'table for *three*', x: 540, y: 380, rot: 3, size: 46, kind: 'hot' },
    { at: 4.75, out: [6.0, 6.2], text: 'one’s for *you*', x: 540, y: 400, rot: -2, size: 42, kind: 'you' },
    { at: T.lock + 0.15, out: [9.0, 9.25], text: 'it’s their *lock screen* now', x: 540, y: 330, rot: -3, size: 40, kind: 'dark' },
    { at: 11.0, out: [12.65, 12.85], text: 'now they’re *matchmaking*', x: 540, y: 400, rot: 2.5, size: 42, kind: 'dark' },
  ],
  last: { at: T.last, text: 'Best *wheel.*', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.turn, dur: 0.9, z: 0.12, x: 540, y: 1000 }, { at: T.straw, dur: 1.1, z: 0.18, x: 540, y: 1150 }],
  pitch: { [LN]: 880, [CN]: 659.25 },
  scene(x, t, K) {
    pisces(x, t, { x: 950, y: 760, s: 140, tears: t > T.last ? 3 : t > T.flash ? 2 : 1, mood: t > T.last ? 'happy' : 'sparkle', look: [-1, 0], pop: pop01(t, 0.8, 0.3, 2) })
    couple(x, t)
    phone(x, t)
    table(x)
    milkshake(x, t)
    card(x, t, K)
    if (t > T.last) { sparkles(x, t, 540, 900, T.last + 0.35, 12, 260, 1, ['#ff4f86', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#ff4f86' : '#ffd36a' }, 540 + (i - 2.5) * 120 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your hand reaches for the card
    const r = ease.outCubic(prog(t, ...T.reach)) * outK(t, [12.35, 12.85])
    if (r > 0) drawArm(x, 900, lerp(1000, 690, r), lerp(2050, 1330, r), { r: 54, rot: -0.4 })
    // the selfie flash
    const f = 1 - prog(t, T.flash, T.flash + 0.35)
    if (t > T.flash && f > 0) { x.fillStyle = `rgba(255,255,255,${0.85 * f})`; x.fillRect(0, 0, 1080, 1920) }
  },
  cues: [
    ['pop', r3(T.turn), 1174.66, 0.05, -0.2], ['pop', r3(T.turn + 0.04), 1396.91, 0.05, 0.2], ['whoosh', r3(T.turn - 0.05), 0.2, 0.03],
    ['whoosh', r3(T.shake[0]), 0.4, 0.04], ['tick', r3(T.shake[1]), 0.05], ['pluck', r3(T.straw), 659.25, 0.04, 0.4, 0], ['pluck', r3(T.straw + 0.12), 987.77, 0.04, 0.4, 0],
    ['whoosh', r3(T.phone[0]), 0.3, 0.03], ['tick', 7.3, 0.03], ['tick', 7.58, 0.03], ['tick', 7.86, 0.03], ['tick', r3(T.flash), 0.08], ['boom', r3(T.flash), 0.12], ['glitter', r3(T.flash), r3(T.flash + 0.4)],
    ['whoosh', r3(T.card[0]), 0.5, 0.035], ['tick', r3(T.card[1]), 0.05], ['bell', r3(T.card[1] + 0.05), 1567.98, 0.025, 1, 0],
    ['whoosh', r3(T.reach[0]), 0.3, 0.02],
    ['pluck', 0.3, 1174.66, 0.025, 0.5, 0], ['pluck', 0.86, 1318.51, 0.025, 0.5, 0], ['pluck', 1.42, 1567.98, 0.025, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
