// st9libracrew (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E34) · story 0–20.6, then the shared end card.
//   THE CREW. "'Where should we eat?' A Libra, for *45 minutes*."  A street of restaurants at 6:00 PM. Menus orbit
//   Libra's head; its air-sign crew (Gemini, Aquarius) and Taurus wait.
//   3.0   the clock rolls to 6:12. LIBRA: "thai is cozy. sushi is fresh. tacos are *tacos.*"  The menus spin faster.
//   6.8   punch on Gemini: "ooh. what about all *three?*"   9.2 punch on Aquarius: "or a place that doesn't *exist* yet."
//   12.2  6:45. Taurus has quietly walked into the taco place. TAURUS: "i ordered. for *everyone.*"
//   14.6  Taurus comes back with a tray; the menus drop. LIBRA: "…okay. that's *perfect.*"  Fact chip: Libra is the
//         only zodiac sign that's an object, not a creature.
//   17.4  frame 0's framing, everyone holding tacos, a taco on each pan of the scale on Libra's head.
//   17.6  last line: "Just *pick.* We'll love it."
//   Rewatch bait: the orbiting menus include "LIBRA'S FAVE" which is the taco menu every time; the sushi window has a
//   "DECIDING? TAKE A NUMBER" ticket roll. The ghost rises behind the Thai place's sandwich board at 8.0.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawBits } from '../../st5cast.js'
import { drawLibraScale, LIBRA } from '../../st9librahome.js'
import { makeDay, star, tag, pop01 } from '../../st9lskit.js'

const DUR = 25
const T = { hookOut: 2.8, ff1: 3.0, l1: 3.2, gem: 6.8, l2: 7.0, ghost: 8.0, aqu: 9.2, l3: 9.4, ff2: 12.2, taurusGo: 11.6, l4: 12.6, back: 14.6, drop: 14.9, l5: 15.2, fact: 13.2, rhyme: 17.4, last: 17.6 }
const LIB = tag('libra'), GEM = tag('gemini'), AQU = tag('aquarius'), TAU = tag('taurus')
const LINES = [
  { t: T.l1, speaker: LIB, text: 'thai is cozy. sushi is fresh. tacos are *tacos.*', color: LIBRA.rose },
  { t: T.l2, speaker: GEM, text: 'ooh. what about all *three?*', color: '#f2cf4a' },
  { t: T.l3, speaker: AQU, text: 'or a place that doesn’t *exist* yet.', color: '#7fdcff' },
  { t: T.l4, speaker: TAU, text: 'i ordered. for *everyone.*', color: '#f2c75c' },
  { t: T.l5, speaker: LIB, text: '…okay. that’s *perfect.*', color: LIBRA.mint },
]
const INK = '#1b1236', BONE = '#efe6d6'
const rr = Math.round
const R = (x, c, X, Y, W, H) => { x.fillStyle = c; x.fillRect(rr(X), rr(Y), rr(W), rr(H)) }
const block = (x, X, Y, W, H, c, hi, lo, o = 6) => { R(x, INK, X - o, Y - o, W + 2 * o, H + 2 * o); R(x, c, X, Y, W, H); if (hi) R(x, hi, X, Y, W, 6); if (lo) R(x, lo, X, Y + H - 6, W, 6) }
function label(x, text, cx, cy, size, col, font = "700 SIZEpx 'Space Mono', monospace") {
  x.save(); x.font = font.replace('SIZE', size); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText(text, cx + 2, cy + 3); x.fillStyle = col; x.fillText(text, cx, cy); x.restore()
}
const TACO = ['..yyyyy..', '.yGrGrGy.', 'yGrGrGrGy', 'yyyyyyyyy']
const TACO_C = { y: '#f2c75c', G: '#6fbf4a', r: '#e8382c' }
const SHOPS = [{ x: 180, name: 'THAI', col: '#2fc79a', aw: ['#2fc79a', BONE] }, { x: 540, name: 'SUSHI', col: '#ff6a5a', aw: ['#ff6a5a', BONE] }, { x: 900, name: 'TACOS', col: '#f2c75c', aw: ['#f39a3a', '#f2c75c'] }]
const DOOR_Y = 1240

function street(x, t, sh) {
  sh.sky(x)
  // three shopfronts
  x.save(); x.translate(0, 120)
  for (const s of SHOPS) {
    const x0 = s.x - 170, w = 340
    block(x, x0, 640, w, 600, '#3a2a44', '#4c3a58', null, 6)
    block(x, x0 + 20, 660, w - 40, 80, INK, null, null, 0); label(x, s.name, s.x, 702, 46, s.col)
    for (let k = 0; k < 8; k++) R(x, s.aw[k % 2], x0 + k * w / 8, 760, w / 8, 60)
    for (let k = 0; k < 8; k++) { x.fillStyle = s.aw[k % 2]; x.beginPath(); x.arc(x0 + (k + 0.5) * w / 8, 820, w / 16, 0, Math.PI); x.fill() }
    R(x, INK, x0, 818, w, 4)
    // the window (warm) + the door
    block(x, x0 + 30, 880, 160, 200, '#ffd98a', '#fff1c8', '#e8b84a', 6)
    block(x, x0 + 220, 900, 90, 340, '#5a3a2a', '#7a5a4a', null, 6); R(x, '#f2c75c', x0 + 290, 1060, 10, 10)
  }
  // the sushi window's ticket roll
  label(x, 'DECIDING?', 460, 935, 18, '#5a3a1e'); label(x, 'TAKE A', 460, 960, 18, '#5a3a1e'); label(x, 'NUMBER', 460, 985, 18, '#5a3a1e')
  R(x, INK, 440, 1005, 40, 40); R(x, '#ff6a5a', 444, 1009, 32, 32)
  x.restore()
  // the sidewalk
  R(x, '#4a4458', 0, DOOR_Y, 1080, 680); R(x, INK, 0, DOOR_Y - 6, 1080, 6)
  for (let xx = 0; xx < 1080; xx += 180) R(x, '#3a3448', xx, DOOR_Y, 5, 200)
  R(x, '#3a3448', 0, DOOR_Y + 200, 1080, 5); R(x, '#2a2436', 0, DOOR_Y + 380, 1080, 540)
  // the Thai sandwich board (the ghost's spot)
  block(x, 60, 1150, 110, 100, '#1e2a24', null, null, 5); label(x, 'PAD', 115, 1185, 20, BONE); label(x, 'THAI', 115, 1215, 20, '#2fc79a')
  return { win: { x0: 0, y0: 0, x1: 1, y1: 1 }, floor: DOOR_Y }
}
const MENUS = [['THAI', '#2fc79a'], ['SUSHI', '#ff6a5a'], ["LIBRA'S FAVE", '#f2c75c'], ['RAMEN', '#7fb2ff'], ['PIZZA', '#e8382c'], ['DINER', '#b48cff']]
function menuOrbit(x, t, cx, cy) {
  if (t > T.drop + 0.8) return
  const speed = t < T.ff1 ? 1.4 : t < T.ff2 ? 2.4 : 4
  const ph = t < T.ff1 ? t * 1.4 : t < T.ff2 ? T.ff1 * 1.4 + (t - T.ff1) * 2.4 : T.ff1 * 1.4 + (T.ff2 - T.ff1) * 2.4 + (t - T.ff2) * 4
  void speed
  const fall = prog(t, T.drop, T.drop + 0.8)
  MENUS.forEach(([name, col], i) => {
    const a = ph + i * Math.PI * 2 / MENUS.length
    const mx = cx + Math.cos(a) * 230, my = cy + Math.sin(a) * 70 + fall * fall * 700
    const sc = 0.8 + 0.2 * Math.sin(a)
    x.save(); x.translate(mx, my); x.rotate(Math.sin(a) * 0.15 + fall * (i % 2 ? 2 : -2)); x.scale(sc, sc); x.globalAlpha = 1 - fall
    R(x, INK, -48, -62, 96, 124); R(x, BONE, -44, -58, 88, 116); R(x, col, -44, -58, 88, 26)
    for (let k = 0; k < 4; k++) R(x, '#cfc4b4', -34, -18 + k * 18, 68, 6)
    x.font = "700 14px 'Space Mono', monospace"; x.textAlign = 'center'; x.fillStyle = INK; x.fillText(name.length > 6 ? 'FAVE' : name, 0, -40)
    x.restore()
  })
}
function tray(x, cx, cy, k = 1) {
  if (k <= 0.02) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -110, -10, 220, 28); R(x, '#c0392b', -104, -6, 208, 20)
  for (let i = 0; i < 4; i++) drawBits(x, TACO, TACO_C, -78 + i * 52, -24, 5)
  x.restore()
}

function libraState(t) {
  if (t < T.ff2) return { mood: t < T.ff1 ? 'squint' : 'wide', look: [Math.sin(t * 3) > 0 ? 1 : -1, -1], blink: false }
  if (t < T.back) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.rhyme) return { mood: 'sparkle', look: [1, 0] }
  return { mood: 'happy' }
}
const headTilt = t => t < T.back ? Math.sin(t * (t < T.ff2 ? 4 : 8)) * 0.8 : 0.5 * Math.exp(-(t - T.back) * 2) * Math.cos((t - T.back) * 10)
function taurusX(t) {
  if (t < T.taurusGo) return 880
  if (t < T.back) return lerp(880, 1000, ease.inOutQuad(prog(t, T.taurusGo, T.taurusGo + 0.6)))
  return lerp(1000, 860, ease.outCubic(prog(t, T.back, T.back + 0.6)))
}

const EP = makeDay({
  numeral: 'S9 E34', sign: 'libra', ep: 'crew', duration: DUR, key: 'G',
  hook: { text: '“Where should we eat?” A Libra, for *45 minutes.*', out: [T.hookOut - 0.2, T.hookOut], accentColor: LIBRA.rose, size: 88, accentSize: 128 },
  shots: [
    { at: 0, room: 'street', set: street, hour: 18, zoom: { x: 540, y: 1040, s: 1.12 } },
    { at: T.gem, room: 'street', set: street, hour: 18.2, zoom: { x: 230, y: 1080, s: 1.45 } },
    { at: T.aqu, room: 'street', set: street, hour: 18.4, zoom: { x: 360, y: 1080, s: 1.5 } },
    { at: T.ff2, room: 'street', set: street, hour: 18.75, zoom: { x: 540, y: 1040, s: 1.12 } },
    { at: T.back, room: 'street', set: street, hour: 18.8, zoom: { x: 700, y: 1040, s: 1.3 } },
    { at: T.rhyme, room: 'street', set: street, hour: 19, zoom: { x: 540, y: 1040, s: 1.12 } },
  ],
  clock: [{ at: 0, from: '6:00', ampm: 'PM' }, { at: T.ff1, dur: 0.8, from: '6:00', to: '6:12', ampm: 'PM' }, { at: T.ff2, dur: 1.2, from: '6:12', to: '6:45', ampm: 'PM' }],
  stamps: [
    { at: T.ff1 + 0.2, out: T.gem - 0.2, time: '6:12 PM', text: 'option 7 of *31*' },
    { at: T.ff2 + 0.2, out: T.back - 0.1, time: '6:45 PM', text: 'Taurus has *left*' },
  ],
  lines: LINES, box: { close: 17.4 },
  fact: { at: T.fact, dur: 3.9, label: '★ REAL SKY', text: 'Libra is the only zodiac sign that’s an object, the scales, not a creature.', color: LIBRA.rose },
  ghost: { room: 'street', at: T.ghost, x: 115, y: 1150, from: 'below' },
  battery: 0.32,
  pitch: { [LIB]: 880, [GEM]: 1046.5, [AQU]: 740, [TAU]: 440 },
  cuts: [{ t: T.ff2, kind: 'flip' }],
  draw(x, t, a, sh) {
    const tx = taurusX(t), inside = t > T.taurusGo + 0.5 && t < T.back
    const rG = star(x, 'gemini', 140, 1140, 200, t, { mood: t < T.gem ? 'neutral' : t < T.back ? 'sparkle' : 'happy', look: [1, -1], seed: 4, hops: [T.l2, T.l2 + 0.4] })
    const rQ = star(x, 'aquarius', 330, 1170, 200, t, { mood: t < T.aqu ? 'neutral' : t < T.back ? 'sparkle' : 'happy', look: [1, -1], seed: 7, hops: [T.l3, T.l3 + 0.5] })
    if (!inside) {
      const rT = star(x, 'taurus', tx, 1150, 210, t, { mood: t < T.taurusGo ? 'sleepy' : 'happy', zzz: false, look: [-1, 0], seed: 5, hops: [T.taurusGo, T.back, T.back + 0.4], alpha: t > T.taurusGo ? 1 - prog(t, T.taurusGo + 0.3, T.taurusGo + 0.5) + prog(t, T.back, T.back + 0.2) : 1 })
      if (t > T.back) tray(x, rT.x - 20, rT.y + 50, pop01(t, T.back, 0.3, 2))
      if (t < T.taurusGo) label(x, 'grr', rT.x - 40, rT.y + 120, 26, '#f2c75c', "800 SIZEpx Inter")
    }
    if (inside) label(x, '“i’ll have four…”', 900, 960, 22, '#5a3a1e', "800 SIZEpx Inter")
    const rL = star(x, 'libra', 610, 1130, 250, t, { ...libraState(t), seed: 3, hops: [T.l1, T.l5, T.rhyme + 0.1] })
    const tc = () => (c, px, py) => drawBits(c, TACO, TACO_C, rr(px), rr(py - 14), 5)
    drawLibraScale(x, t, rr(rL.x), rr(rL.top + 8), 5, headTilt(t), t > T.rhyme ? { left: tc(), right: tc() } : {})
    menuOrbit(x, t, rL.x, rL.top - 80)
    if (t > T.rhyme) for (const r of [rG, rQ, rL]) drawBits(x, TACO, TACO_C, rr(r.x + r.size * 0.32), rr(r.y + 40), 5)
    void a; void clamp
  },
  last: { at: T.last, text: 'Just *pick.* We’ll love it.', accentColor: LIBRA.rose },
  cues: [
    ...Array.from({ length: 10 }, (_, i) => ['tick', +(0.4 + i * 1.1).toFixed(3), 0.025]),
    ['whoosh', T.ff2, 0.6, 0.03],
    ['pop', T.taurusGo, 440, 0.04, 0.6], ['tick', T.taurusGo + 0.4, 0.04],
    ['pop', T.back, 523.25, 0.05, 0.4], ['pop', T.back + 0.1, 659.25, 0.05, 0.4],
    ['whoosh', T.drop, 0.5, 0.04], ['tom', T.drop + 0.7, 0.06], ['glitter', T.l5, T.l5 + 0.7],
  ],
})
export const { DURATION, SCENES, CUES } = EP
export { T }
