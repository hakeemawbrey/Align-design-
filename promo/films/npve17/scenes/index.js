// npve17 · POV: You're Dating a ___ · ep 17 · "POV: you're dating a Leo. The lights." (17 s vertical, house · B)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♌ LEO on a snowy front path, one hand on a giant switch, grinning into the lens. The house is dark.
//   2.3–6.0   (1) it flips it: the whole house blazes with lights, far too bright. LEO: "too much? *never.*"
//             Sticker: "*slightly* visible from space".
//   6.2       card cut.
//   6.3–9.8   (2, the turn) a second switch: the roof lights rearrange and spell out "YOU". LEO: "it's for *you.*"
//             Sticker: "okay. that's *sweet.*"
//   10.0      Last line: "Subtle was *never* an option."  Pisces, on the path, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const LE = signStar('leo'), LN = `${LE.glyph}︎ LEO`
const T = { flip: 2.4, cut: 6.2, flip2: 6.7, spell: [6.8, 7.6], last: 10.0 }
const LINES = [
  { t: 3.0, speaker: LN, text: 'too much? *never.*', color: '#ffd36a' },
  { t: 7.8, speaker: LN, text: 'it’s for *you.*', color: '#ffd36a' },
]
const HOPS = [T.flip, ...talkHops(LINES, LN), T.flip2, T.spell[1], T.last + 0.3, T.last + 0.8]
const COLS = ['#ffd36a', '#ff4f86', '#7dffb0', '#9fd8ff', '#ff8a3a']
const GLYPHS = { Y: ['B...B', 'B...B', '.B.B.', '..B..', '..B..'], O: ['.BBB.', 'B...B', 'B...B', 'B...B', '.BBB.'], U: ['B...B', 'B...B', 'B...B', 'B...B', '.BBB.'] }

function house(x, t) {
  const on = t > T.flip, glow = on ? 1 + 0.5 * (1 - prog(t, T.flip, T.flip + 0.6)) : 0
  const HX = 740, HY = 1160, W = 520, H = 330
  if (on) { const g = x.createRadialGradient(HX, HY - 300, 40, HX, HY - 300, 700); g.addColorStop(0, `rgba(255,220,140,${0.4 * glow})`); g.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = g; x.fillRect(-100, 0, 1300, 1600) }
  R(x, INK, HX - W / 2 - 6, HY - H - 6, W + 12, H + 12); R(x, '#5a3a4e', HX - W / 2, HY - H, W, H)
  x.fillStyle = INK; x.beginPath(); x.moveTo(HX - W / 2 - 50, HY - H + 6); x.lineTo(HX, HY - H - 260); x.lineTo(HX + W / 2 + 50, HY - H + 6); x.fill()
  x.fillStyle = '#3a2a3e'; x.beginPath(); x.moveTo(HX - W / 2 - 34, HY - H); x.lineTo(HX, HY - H - 240); x.lineTo(HX + W / 2 + 34, HY - H); x.fill()
  x.fillStyle = '#f4f1ff'; x.beginPath(); x.moveTo(HX - W / 2 - 40, HY - H + 4); x.lineTo(HX, HY - H - 250); x.lineTo(HX - 20, HY - H - 220); x.lineTo(HX - W / 2 - 4, HY - H); x.fill()
  R(x, INK, HX - 50, HY - 170, 100, 170); R(x, '#8a3b2e', HX - 44, HY - 164, 88, 164)
  for (const wx of [HX - 180, HX + 180]) { R(x, INK, wx - 56, HY - 260, 112, 100); R(x, on ? '#ffe2a0' : '#2a2148', wx - 50, HY - 254, 100, 88) }
  if (!on) return
  // bulbs everywhere
  const sp = ease.inOutCubic(prog(t, ...T.spell))
  const bulb = (bx, by, i) => { const c = COLS[i % COLS.length], tw = 0.7 + 0.3 * Math.sin(t * 6 + i * 1.3); x.globalAlpha = 0.4 * tw; x.fillStyle = c; x.beginPath(); x.arc(bx, by, 22, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1; R(x, INK, bx - 9, by - 9, 18, 18); R(x, c, bx - 6, by - 6, 12, 12) }
  let i = 0
  for (let k = 0; k <= 12; k++) { const p = k / 12; bulb(lerp(HX - W / 2 - 40, HX, p), lerp(HY - H, HY - H - 250, p), i++); bulb(lerp(HX + W / 2 + 40, HX, p), lerp(HY - H, HY - H - 250, p), i++) }
  for (let k = 0; k <= 10; k++) { bulb(HX - W / 2 + k * W / 10, HY - H + 14, i++); bulb(HX - W / 2 + k * W / 10, HY - 4, i++) }
  // the scattered bulbs fly into Y-O-U on the roof
  let j = 0
  ;['Y', 'O', 'U'].forEach((ch, li) => GLYPHS[ch].forEach((row, ry) => [...row].forEach((c, rx) => {
    if (c === '.') return
    const sx = 120 + ((j * 137) % 840), sy = 380 + ((j * 71) % 260)
    const tx = HX - 250 + li * 180 + rx * 28, ty = 410 + ry * 28
    bulb(lerp(sx, tx, sp), lerp(sy, ty, sp), j++)
  })))
}
function lever(x, t, cx, cy) {
  R(x, INK, cx - 70, cy - 110, 140, 220); R(x, '#c9c3e6', cx - 62, cy - 102, 124, 204)
  x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText('ON', cx, cy - 72); x.fillText('OFF', cx, cy + 92)
  const up = t > T.flip ? 1 : ease.inOutCubic(prog(t, T.flip - 0.3, T.flip))
  const a = lerp(0.7, -0.7, up)
  x.save(); x.translate(cx, cy); x.rotate(a); R(x, INK, -12, -110, 24, 110); R(x, '#d8344f', -26, -136, 52, 40); x.restore()
}

const EP = makePOV({
  id: 'npve17', duration: 17, set: 'street',
  caption: 'you’re dating a *Leo.* The lights.',
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 2.8, close: 9.8 }],
  stickers: [
    { at: 4.2, out: [5.95, 6.1], text: '*slightly* visible from space', x: 540, y: 330, rot: -2.5, size: 44, kind: 'dark' },
    { at: 8.5, out: [9.6, 9.8], text: 'okay. that’s *sweet.*', x: 540, y: 330, rot: 2, size: 48, kind: 'you' },
  ],
  last: { at: T.last, text: 'Subtle was *never* an option.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.flip, dur: 1.0, z: 0.08, x: 600, y: 900 }, { at: T.spell[0], dur: 2.8, z: 0.08, x: 700, y: 700 }],
  pitch: { [LN]: 880 },
  scene(x, t) {
    house(x, t)
    pisces(x, t, { x: 960, y: 1210, s: 115, tears: t > T.last ? 3 : t > T.flip ? 2 : 1, mood: t > T.spell[1] ? 'happy' : t > T.flip ? 'wide' : 'sparkle', look: [-1, -0.4], pop: pop01(t, -1) })
    lever(x, t, 140, 1180)
    let mood = 'sparkle', look = [0, 0]
    if (t > T.flip) { mood = 'happy'; look = [1, -0.6] }
    if (t > 3.6) { mood = 'wink'; look = [0, 0] }
    if (t > T.spell[0]) { mood = 'happy'; look = [1, -0.6] }
    if (t > 8.0) { mood = 'sparkle'; look = [0, 0] }
    if (t > T.last) mood = 'heart'
    const o = { x: 330, y: 1140, s: 320, hops: HOPS, seed: 2 }
    drawStarChar(x, o.x, o.y, o.s, t, { color: LE.color, glyph: LE.glyph, mood, look, hops: HOPS, seed: 2, glow: 1.2, blush: t > 7.8 ? 1 : 0 })
    beanie(x, t, o, '#ff8a3a', GOLD)
    if (t > T.spell[1]) sparkles(x, t, 740, 470, T.spell[1], 12, 220, 1, [GOLD, BONE, HOT])
    if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 400 + (i - 2.5) * 100 + Math.sin(ph * 4 + i) * 20, 980 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
  },
  front(x, t) {
    const f = 1 - prog(t, T.flip, T.flip + 0.5)
    if (t > T.flip && f > 0) { x.fillStyle = `rgba(255,248,220,${0.85 * f})`; x.fillRect(0, 0, 1080, 1920) }
  },
  cues: [
    ['tick', r3(T.flip - 0.05), 0.08], ['boom', r3(T.flip), 0.12], ['glitter', r3(T.flip), r3(T.flip + 0.8)], ['pop', r3(T.flip + 0.1), 1479.98, 0.045, 0],
    ['tick', r3(T.flip2), 0.06], ['riser', r3(T.spell[0]), r3(T.spell[1]), 0.014], ['bell', r3(T.spell[1]), 1975.53, 0.03, 1.2, 0], ['glitter', r3(T.spell[1]), r3(T.spell[1] + 0.6)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
