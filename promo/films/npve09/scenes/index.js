// npve09 · POV: You're Dating a ___ · ep 9 · "POV: you're dating a Sagittarius." (18 s vertical, chiptune · B)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♐ SAG on the snowy street, grinning, holding up its phone: a photo of you in a very tall hat.
//   2.3–5.6   (1) SAG: "honestly? that hat is a *choice.*"  Sticker: "no filter. *at all.*"
//   5.6–9.0   (2) the next photo: its home cooking (grey lumps). SAG: "honestly? it's bad. *takeout?*"
//             A takeout bag pops up. Sticker: "honest about *itself* too".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) phone away, it steps closer. SAG: "honestly? I really *like you.*"  You go wide.
//             Sticker: "*no warning.* none."  It shrugs, beaming.
//   12.95     Last line: "Honest about *everything.* Even this."  Pisces, under the lamp, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const SG = signStar('sagittarius'), GN = `${SG.glyph}︎ SAG`
const T = { swipe: 5.7, bag: [7.4, 7.8], cut: 9.15, step: [9.3, 9.9], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: GN, text: 'honestly? that hat is a *choice.*', color: '#c9a6ff' },
  { t: 6.0, speaker: GN, text: 'honestly? it’s bad. *takeout?*', color: '#c9a6ff' },
  { t: 10.0, speaker: GN, text: 'honestly? I really *like you.*', color: '#c9a6ff' },
]
const HOPS = [0.1, ...talkHops(LINES, GN), T.bag[0], T.step[1], 11.9, T.last + 0.3, T.last + 0.8]

function phone(x, t) {
  const o = ease.inCubic(prog(t, T.cut - 0.4, T.cut))
  if (o >= 1) return
  const cx = 790, cy = 900 + o * 900, w = 250, h = 420
  x.save(); x.translate(cx, cy); x.rotate(0.08 + 0.02 * Math.sin(t * 2))
  R(x, INK, -w / 2 - 12, -h / 2 - 12, w + 24, h + 24); R(x, '#2b2147', -w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
  const sw = ease.inOutCubic(prog(t, T.swipe, T.swipe + 0.35))
  // photo 1: you in a VERY tall striped hat
  x.save(); x.translate(-sw * w, 0)
  x.fillStyle = '#9fd8ff'; x.fillRect(-w / 2, -h / 2, w, h); R(x, '#f4f1ff', -w / 2, 80, w, 140)
  drawStarChar(x, 0, 110, 150, t, { color: YOU, mood: 'happy', look: [0, 0], seed: 3, tips: false })
  for (let i = 0; i < 9; i++) R(x, i % 2 ? '#fff8ef' : '#3fb08a', -34 + i * 2, 36 - i * 30, 68 - i * 4, 30)
  R(x, INK, -50, 44, 100, 16); R(x, '#3fb08a', -46, 46, 92, 12)
  x.fillStyle = '#fff8ef'; x.beginPath(); x.arc(0, -238 + 10, 26, 0, Math.PI * 2); x.fill()
  x.restore()
  // photo 2: its cooking
  x.save(); x.translate((1 - sw) * w, 0)
  x.fillStyle = '#e8d6b8'; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 40, 104, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff8ef'; x.beginPath(); x.ellipse(0, 40, 98, 40, 0, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 7; i++) { x.fillStyle = ['#8a8478', '#6f6a60', '#9a9384'][i % 3]; x.beginPath(); x.arc(-50 + (i % 4) * 32, 24 + Math.floor(i / 4) * 26, 20, 0, Math.PI * 2); x.fill() }
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('dinner (?)', 0, -110)
  x.restore()
  x.restore(); x.restore()
}
function bag(x, t) {
  const k = pop01(t, T.bag[0], 0.35, 2.4) * outK(t, [T.cut - 0.4, T.cut])
  if (k <= 0.01 || t < T.bag[0]) return
  x.save(); x.translate(310, 1210); x.scale(k, k); x.rotate(-0.08)
  R(x, INK, -100, -120, 200, 230); R(x, '#fff8ef', -94, -114, 188, 218); R(x, '#e8283c', -94, -40, 188, 50)
  x.fillStyle = '#fff8ef'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAKEOUT', 0, -14)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.arc(0, -120, 50, Math.PI, 0); x.stroke()
  x.restore()
}

const EP = makePOV({
  id: 'npve09', duration: 18, set: 'street',
  caption: 'you’re dating a *Sagittarius.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.6, out: [5.4, 5.6], text: 'no filter. *at all.*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'dark' },
    { at: 7.9, out: [8.9, 9.05], text: 'honest about *itself* too', x: 540, y: 330, rot: 2.5, size: 44, kind: 'light' },
    { at: 11.1, out: [12.6, 12.8], text: '*no warning.* none.', x: 540, y: 330, rot: -2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Honest about *everything.* Even this.', color: '#ffd36a', size: 108, accentSize: 150 },
  cuts: [T.cut],
  punch: [{ at: T.swipe, dur: 1.4, z: 0.1, x: 760, y: 920 }, { at: T.step[1], dur: 2.0, z: 0.14, x: 540, y: 1000 }],
  pitch: { [GN]: 739.99 },
  scene(x, t) {
    pisces(x, t, { x: 120, y: 1100, s: 120, tears: t > T.last ? 3 : t > T.step[1] ? 2 : 1, mood: t > T.step[1] ? 'happy' : 'sparkle', look: [1, 0], pop: pop01(t, -1) })
    const sk = ease.inOutCubic(prog(t, ...T.step))
    let mood = 'happy', look = [0.6, 0]
    if (t > 2.3) { mood = 'wink'; look = [0, 0] }
    if (t > T.swipe) { mood = 'squint'; look = [0.6, -0.2] }
    if (t > T.bag[0]) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.cut) mood = 'happy'
    if (t > 11.9) mood = 'sparkle'
    if (t > T.last) mood = 'heart'
    const o = { x: lerp(470, 540, sk), y: lerp(1010, 1060, sk), s: lerp(340, 430, sk), hops: HOPS, seed: 4 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: SG.color, glyph: SG.glyph, mood, look, hops: HOPS, seed: 4, glow: 1.1, blush: t > LINES[2].t + 0.5 ? 1 : 0 })
    beanie(x, t, o, '#8a5ad8', GOLD)
    phone(x, t); bag(x, t)
    if (t > 11.9 && t < 12.6) { x.save(); x.font = `800 40px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.globalAlpha = Math.sin(Math.PI * prog(t, 11.9, 12.6)); x.fillText('*shrug*', 540, 790); x.restore() }
    if (t > T.last) { sparkles(x, t, 540, 980, T.last + 0.35, 12, 240, 1, ['#c9a6ff', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 540 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 900 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  front(x, t) {
    // your surprise: a quick white flash on "like you"
    const f = 1 - prog(t, 10.9, 11.3)
    if (t > 10.9 && f > 0) { x.fillStyle = `rgba(255,255,255,${0.6 * f})`; x.fillRect(0, 0, 1080, 1920) }
  },
  cues: [
    ['pop', 0.3, 1479.98, 0.03, 0.3],
    ['whoosh', r3(T.swipe), 0.3, 0.035], ['tick', r3(T.swipe + 0.35), 0.05],
    ['pop', r3(T.bag[0]), 1244.51, 0.045, -0.3], ['glitter', r3(T.bag[0]), r3(T.bag[0] + 0.4)],
    ['whoosh', r3(T.step[0]), 0.5, 0.025], ['boom', 10.9, 0.08], ['bell', 10.95, 1479.98, 0.03, 1.2, 0], ['pluck', 11.9, 987.77, 0.04, 0.4, 0], ['pluck', 12.05, 1244.51, 0.035, 0.4, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
