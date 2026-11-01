// trpovshoulder (20 s vertical, Star Talk Trends §9 POV, ep 4 · synthwave · Bm) · story 0–15.6, then the end card.
// "POV: you're reading their texts *over their shoulder.*" The camera is you, behind your friend ♋ CANCER, who is
// replying to their crush ("had fun tonight :)"). Rule of three, the drafts:
//   1.5    "hey"                     you: "too *cold.*"      (backspace)
//   3.5    "HEYYY!!! omg hiii!!!"    you: "too *much.*"      (wiped)
//   5.9    CANCER: "okay. what would a *normal* star say?"
//   8.0    card cut.
//   8.4    "i had fun too. same time next week?"   you: "oh that's *GOOD.*"
//   10.8   the thumb hovers over send… backs off… comes back.  CANCER: "what if they say *no?*"
//   12.4   Last line: "Send it. *SEND IT.*"  (your hand jabs at the screen)
//   13.2   sent. typing… 14.0 "yes!! ♡". You both lose it. Pisces, behind you, fountains.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawArm, R, pop01, outK, prog, ease, lerp, clamp, easeOutBack, INK, BONE, HOT, GOLD, YOU, INTER, r3 } from './povkit.js'
import { talkHops } from '../../startalk.js'

const CAN = signStar('cancer'), SCO = signStar('scorpio')
const CN = `${CAN.glyph}︎ CANCER`
const T = { d1: 1.5, d1x: 3.0, d2: 3.5, d2x: 5.4, cut: 8.0, d3: 8.4, good: 10.4, hover: 10.8, last: 12.4, send: 13.2, dots: 13.5, reply: 14.0, out: [15.1, 15.5] }
const LINES = [
  { t: 5.9, speaker: CN, text: 'okay. what would a *normal* star say?', color: '#9fe6ff' },
  { t: 11.0, speaker: CN, text: 'what if they say *no?*', color: '#9fe6ff' },
]
const D1 = 'hey', D2 = 'HEYYY!!! omg hiii!!!', D3 = 'i had fun too. same time next week?'
const PH = { cx: 640, top: 470, w: 520, h: 680 }
const FR = { x: 215, y: 1150, s: 330 }
const F_HOPS = [0.3, T.d1 + 0.9, T.d2 + 1.2, ...talkHops(LINES, CN), T.good, T.send, T.reply + 0.05, T.reply + 0.55]

function typed(t, s, t0, cps = 14) { return t < t0 ? '' : s.slice(0, Math.floor((t - t0) * cps)) }
function draftAt(t) {
  if (t < T.d1) return ''
  if (t < T.d1x) return typed(t, D1, T.d1, 10)
  if (t < T.d2) return D1.slice(0, Math.max(0, 3 - Math.floor((t - T.d1x) * 12)))
  if (t < T.d2x) return typed(t, D2, T.d2, 26)
  if (t < T.d3) return t < T.d2x + 0.25 ? D2 : ''
  if (t < T.send) return typed(t, D3, T.d3, 24)
  return ''
}
function wrap(x, text, maxW) {
  const words = text.split(' '), out = []; let cur = ''
  for (const w of words) { const tr = cur ? cur + ' ' + w : w; if (x.measureText(tr).width > maxW && cur) { out.push(cur); cur = w } else cur = tr }
  if (cur) out.push(cur)
  return out
}
function bubbleMsg(x, side, text, y, k, { col, fg } = {}) {
  x.font = `600 33px ${INTER}`
  const lines = wrap(x, text, 330), w = Math.max(...lines.map(l => x.measureText(l).width)) + 40, h = lines.length * 42 + 26
  const X = side === 'L' ? PH.cx - PH.w / 2 + 34 : PH.cx + PH.w / 2 - 34 - w
  x.save(); x.translate(X + (side === 'L' ? 0 : w), y); x.scale(k, k); x.translate(-(side === 'L' ? 0 : w), 0)
  x.fillStyle = col || (side === 'L' ? '#3a2a66' : HOT); x.beginPath(); x.roundRect(0, 0, w, h, 18); x.fill()
  x.fillStyle = fg || BONE; x.textBaseline = 'top'
  lines.forEach((l, i) => x.fillText(l, 20, 14 + i * 42))
  x.restore()
  return h
}
function phone(x, t) {
  const k = easeOutBack(prog(t, 0.15, 0.55), 1.5)
  if (k <= 0) return
  const { cx, top, w, h } = PH, X = cx - w / 2, Y = top + (1 - k) * 900
  const tilt = -0.025 + 0.01 * Math.sin(t * 1.4)
  x.save(); x.translate(cx, Y + h / 2); x.rotate(tilt); x.translate(-cx, -(Y + h / 2))
  R(x, INK, X - 16, Y - 16, w + 32, h + 32); R(x, '#2b2147', X - 10, Y - 10, w + 20, h + 20)
  R(x, '#130b26', X, Y, w, h)
  // header
  R(x, '#21143f', X, Y, w, 80)
  x.fillStyle = SCO.color; x.beginPath(); x.arc(X + 44, Y + 35, 20, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.font = `700 28px ${INTER}`; x.textBaseline = 'middle'; x.fillText('them', X + 78, Y + 40)
  x.fillStyle = INK; x.font = `700 22px 'EB Garamond', 'Segoe UI Symbol', serif`; x.textAlign = 'center'; x.fillText(SCO.glyph + '︎', X + 44, Y + 37); x.textAlign = 'left'
  // the thread
  let y = Y + 106
  y += bubbleMsg(x, 'L', 'had fun tonight :)', y, pop01(t, 0.7, 0.3, 2.2)) + 14
  if (t > T.send) {
    const sk = easeOutBack(prog(t, T.send, T.send + 0.3), 1.8)
    y += bubbleMsg(x, 'R', D3, y + (1 - sk) * 300, clamp(sk)) + 14
  }
  if (t > T.dots && t < T.reply) {
    R(x, '#3a2a66', X + 34, y, 110, 52)
    for (let i = 0; i < 3; i++) { x.fillStyle = BONE; x.globalAlpha = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - i)); x.beginPath(); x.arc(X + 62 + i * 27, y + 26, 8, 0, Math.PI * 2); x.fill() }
    x.globalAlpha = 1
  }
  if (t > T.reply) bubbleMsg(x, 'L', 'yes!! ♡', y, easeOutBack(prog(t, T.reply, T.reply + 0.3), 2.6), { col: '#ffd36a', fg: INK })
  // the draft field + send
  const d = draftAt(t)
  x.font = `600 32px ${INTER}`
  const dl = d ? wrap(x, d, w - 160) : ['']
  const fh = Math.max(76, dl.length * 40 + 34), fy = Y + h - 20 - fh
  R(x, '#efe6d6', X + 18, fy, w - 110, fh)
  x.fillStyle = d ? INK : 'rgba(27,18,54,0.4)'; x.textBaseline = 'top'
  if (d) dl.forEach((l, i) => x.fillText(l, X + 34, fy + 18 + i * 40))
  else x.fillText('message', X + 34, fy + 20)
  if ((t * 2) % 1 < 0.6 && t < T.send) { const lw = x.measureText(dl[dl.length - 1]).width; R(x, HOT, X + 36 + lw, fy + 16 + (dl.length - 1) * 40, 4, 38) }
  const pressed = t > T.send - 0.08 && t < T.send + 0.15
  x.fillStyle = HOT; x.beginPath(); x.arc(X + w - 50, fy + fh - 32, pressed ? 26 : 30, 0, Math.PI * 2); x.fill()
  drawBits(x, ['..W..', '.WWW.', 'WWWWW', '..W..', '..W..'], { W: '#fff8ef' }, X + w - 50, fy + fh - 32, 6, { outline: null })
  // the delete swipe on draft 2
  if (t > T.d2x && t < T.d2x + 0.25) { x.fillStyle = 'rgba(255,79,168,0.35)'; x.fillRect(X + 18, fy, (w - 110) * prog(t, T.d2x, T.d2x + 0.2), fh) }
  x.restore()
  return { sendX: X + w - 50, sendY: fy + fh - 32 }
}
function friend(x, t) {
  let mood = 'neutral', look = [1, -1]
  if (t > T.d1 + 1.0 && t < T.d1x + 0.3) mood = 'squint'
  if (t > T.d2 && t < T.d2x) mood = 'sparkle'
  if (t > T.d2x && t < T.d3) { mood = 'neutral'; look = [0, -1] }
  if (t > T.d3) mood = 'happy'
  if (t > T.hover) { mood = 'wide'; look = [1, 0] }
  if (t > T.send) { mood = 'wide'; look = [1, -1] }
  if (t > T.reply) mood = 'heart'
  drawStarChar(x, FR.x, FR.y, FR.s, t, { color: CAN.color, glyph: CAN.glyph, mood, look, hops: F_HOPS, seed: 3, glow: 1.0, pop: pop01(t, 0.2, 0.35, 2), blink: mood === 'wide' ? false : undefined })
}
function thumb(x, t, P) {
  // their thumb: approaches, backs off, comes back, presses
  if (t < T.d3 + 0.4 || !P) return
  const keys = [[T.d3 + 0.4, 0.0], [T.hover, 0.35], [T.hover + 0.45, 0.92], [11.6, 0.45], [12.1, 0.95], [T.send - 0.15, 0.97], [T.send, 1.06], [T.send + 0.3, 0.6], [T.out[0], 0.6]]
  let v = 0
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) { const [a, va] = keys[i - 1], [b, vb] = keys[i]; v = lerp(va, vb, ease.inOutQuad(prog(t, a, b))); break }
  const jit = t > 12.1 && t < T.send ? Math.sin(t * 40) * 5 : 0
  const hx = lerp(380, P.sendX - 18, v) + jit, hy = lerp(1260, P.sendY + 18, v)
  drawArm(x, 300, hx, hy, { r: 32, col: CAN.color, by: 1320, rot: 0.4 })
}

const EP = makePOV({
  id: 'trpovshoulder', duration: 20,
  caption: 'you’re reading their texts *over their shoulder.*',
  lines: LINES,
  boxes: [{ from: 0, to: 1, open: 5.75, close: 8.9 }],
  stickers: [
    { at: T.d1 + 0.85, out: [3.2, 3.4], text: 'too *cold.*', x: 700, y: 1240, rot: -3, size: 50, kind: 'you' },
    { at: T.d2 + 1.15, out: [5.45, 5.65], text: 'too *much.*', x: 700, y: 1240, rot: 3, size: 50, kind: 'you' },
    { at: T.good, out: [11.0, 11.2], text: 'oh that’s *GOOD.*', x: 680, y: 1240, rot: -2, size: 52, kind: 'you' },
    { at: 11.1, out: [12.25, 12.45], text: 'what if they say *no?*', x: 640, y: 1250, rot: 2, size: 46, kind: 'dark' },
  ],
  last: { at: T.last, text: 'Send it. *SEND IT.*', top: 1440, size: 112, accentSize: 160, color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.d2 + 1.15, dur: 0.8, z: 0.05, x: 600, y: 900 }, { at: T.last + 0.35, dur: 0.9, z: 0.06, x: 560, y: 900 }],
  pitch: { [CN]: 659.25 },
  scene(x, t) {
    pisces(x, t, { x: 975, y: 410, s: 120, tears: t > T.reply ? 3 : t > T.hover ? 2 : 1, mood: t > T.reply ? 'happy' : 'wide', look: [-1, 1], pop: pop01(t, 0.9, 0.3, 2) })
    friend(x, t)
    const P = phone(x, t)
    thumb(x, t, P)
    if (t > T.reply) for (let i = 0; i < 6; i++) { const ph = t - T.reply - 0.1 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? '#ff4f86' : '#ffd36a' }, 215 + (i - 2.5) * 50 + Math.sin(ph * 4 + i) * 16, 940 - ph * 160, 8, { alpha: clamp(1 - ph / 1.6) }) }
    sparkles(x, t, 215, 1050, T.reply + 0.05, 10, 200, 1, ['#ffd36a', HOT, BONE])
  },
  front(x, t) {
    // your hand: jabbing at the screen on the last line, then both arms up
    const jab = pop01(t, T.last + 0.3, 0.3, 1.6) * outK(t, [T.reply - 0.1, T.reply + 0.15])
    if (jab > 0.01) { const j = Math.sin(t * 22) * 14; drawArm(x, 1220, lerp(1250, 950, jab) + j, lerp(1330, 1150, jab) + j * 0.4, { r: 44, rot: -0.6, by: 1330 }) }
    const up = ease.outBack(prog(t, T.reply + 0.05, T.reply + 0.4)) * outK(t, [T.out[0] - 0.4, T.out[0] - 0.1])
    if (up > 0.01) for (const s of [-1, 1]) drawArm(x, 540 + s * 560, 540 + s * lerp(560, 400, up) + Math.sin(t * 12 + s) * 10, lerp(2050, 1700, up), { r: 46 })
  },
  cues: [
    ...[...D1].map((_, i) => ['tick', r3(T.d1 + i / 10), 0.025]),
    ['tick', r3(T.d1x), 0.02], ['tick', r3(T.d1x + 0.08), 0.02], ['tick', r3(T.d1x + 0.16), 0.02],
    ...[...D2].filter((_, i) => i % 2 === 0).map((_, i) => ['tick', r3(T.d2 + i * 2 / 26), 0.025]),
    ['whoosh', r3(T.d2x), 0.2, 0.03],
    ...[...D3].filter((_, i) => i % 2 === 0).map((_, i) => ['tick', r3(T.d3 + i * 2 / 24), 0.022]),
    ['pop', r3(T.hover + 0.45), 1318.51, 0.025, 0.3], ['pop', 11.6, 880, 0.025, 0.3], ['pop', 12.1, 1318.51, 0.025, 0.3], ['riser', 12.1, r3(T.send), 0.03],
    ['whoosh', r3(T.send), 0.35, 0.05], ['pop', r3(T.send + 0.05), 1567.98, 0.05, 0.2],
    ['tick', r3(T.dots + 0.1), 0.02], ['tick', r3(T.dots + 0.3), 0.02],
    ['pop', r3(T.reply), 1174.66, 0.06, -0.2], ['bell', r3(T.reply + 0.05), 2349.32, 0.03, 1.2, 0], ['glitter', r3(T.reply), r3(T.reply + 0.6)], ['boom', r3(T.reply), 0.12],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void YOU; void GOLD
