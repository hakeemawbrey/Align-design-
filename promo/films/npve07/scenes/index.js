// npve07 · POV: You're Dating a ___ · ep 7 · "POV: you're dating a Libra." (18 s vertical, cinematic · Eb)
// Story 0–15.6, then the short end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♎ LIBRA and you, mid "you pick!" / "no, YOU pick!", two bubbles ping-ponging over the menu.
//   2.3–5.6   (1) LIBRA: "okay. we *both* pick. on three?"  Nobody picks. Sticker: "*nobody* has picked".
//   5.6–9.0   (2) the dessert arrives. Libra lays a ruler across it and splits it exactly down the middle.
//             LIBRA: "exactly half. *to the millimetre.*"  Sticker: "perfectly *fair*".
//   9.15      card cut.
//   9.3–12.7  (3, the twist) it scoops a bite off its own half onto yours. LIBRA: "yours has *extra.*"
//             Sticker: "…then gave you *more*".
//   12.95     Last line: "Perfectly *fair.* Then generous."  Pisces, outside the window, cries happy tears all film.
import { makePOV, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, bubble, table, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, INTER, r3 } from '../../npve01/scenes/datekit.js'
import { talkHops } from '../../startalk.js'

const LI = signStar('libra'), LN = `${LI.glyph}︎ LIBRA`
const T = { cake: [5.6, 6.0], ruler: [6.1, 6.6], split: [7.0, 7.5], cut: 9.15, scoop: [9.9, 10.7], last: 12.95 }
const LINES = [
  { t: 2.4, speaker: LN, text: 'okay. we *both* pick. on three?', color: '#ff9ec8' },
  { t: 6.2, speaker: LN, text: 'exactly half. *to the millimetre.*', color: '#ff9ec8' },
  { t: 10.8, speaker: LN, text: 'yours has *extra.*', color: '#ff9ec8' },
]
const HOPS = [0.05, 0.6, 1.15, 1.7, ...talkHops(LINES, LN), T.split[1], T.scoop[1], T.last + 0.3, T.last + 0.8]

function cakeTop(x, t) {
  if (t < T.cake[0]) return
  const k = ease.outBack(prog(t, ...T.cake)), sp = ease.outCubic(prog(t, ...T.split)) * 50
  const cy = lerp(1600, 1300, k), cx = 540
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * sp, 0); x.beginPath(); x.rect(d < 0 ? cx - 400 : cx, cy - 200, 400, 400); x.clip()
    x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy + 22, 196, 70, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c87a3a'; x.fillRect(cx - 190, cy - 6, 380, 30)
    x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 196, 70, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#ffd1a0'; x.beginPath(); x.ellipse(cx, cy, 188, 63, 0, 0, Math.PI * 2); x.fill()
    for (let i = 0; i < 7; i++) drawBits(x, ['RR', 'RR'], { R: '#e8283c' }, cx - 140 + i * 46, cy - 10 + (i % 2) * 22, 9)
    x.restore()
  }
  // the extra bite moving from its half to yours
  if (t > T.scoop[0]) { const s = ease.inOutCubic(prog(t, ...T.scoop)); const bx = lerp(cx + 120 + sp, cx - 120 - sp, s), by = cy - 30 - Math.sin(Math.PI * s) * 160; x.fillStyle = INK; x.beginPath(); x.ellipse(bx, by, 40, 26, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffd1a0'; x.beginPath(); x.ellipse(bx, by, 34, 20, 0, 0, Math.PI * 2); x.fill(); drawBits(x, ['RR', 'RR'], { R: '#e8283c' }, bx, by - 6, 8) }
}
function ruler(x, t) {
  if (t < T.ruler[0] || t > T.split[1] + 0.5) return
  const k = ease.outCubic(prog(t, ...T.ruler)) * outK(t, [T.split[1], T.split[1] + 0.5])
  x.save(); x.translate(540, lerp(900, 1300, k)); x.rotate(Math.PI / 2); x.globalAlpha = clamp(k * 2)
  R(x, INK, -230, -36, 460, 72); R(x, '#ffd36a', -224, -30, 448, 60)
  for (let i = 0; i <= 22; i++) R(x, INK, -220 + i * 20, -30, 3, i % 5 ? 14 : 26)
  x.restore()
  if (t > T.split[0] - 0.4) { x.save(); x.setLineDash([14, 10]); x.strokeStyle = HOT; x.lineWidth = 5; x.beginPath(); x.moveTo(540, 1200); x.lineTo(540, 1400); x.stroke(); x.restore() }
}

const EP = makePOV({
  id: 'npve07', duration: 18, set: 'cafe',
  caption: 'you’re dating a *Libra.*',
  lines: LINES,
  boxes: [{ from: 0, to: 3, open: 2.2, close: 12.75 }],
  stickers: [
    { at: 3.9, out: [5.3, 5.5], text: '*nobody* has picked', x: 540, y: 330, rot: -2.5, size: 46, kind: 'dark' },
    { at: 7.6, out: [8.9, 9.05], text: 'perfectly *fair*', x: 540, y: 330, rot: 2.5, size: 48, kind: 'light' },
    { at: 11.2, out: [12.6, 12.8], text: '…then gave you *more*', x: 540, y: 330, rot: -2, size: 46, kind: 'you' },
  ],
  last: { at: T.last, text: 'Perfectly *fair.* Then generous.', color: '#ff9ec8' },
  cuts: [T.cut],
  punch: [{ at: T.split[0], dur: 1.6, z: 0.12, x: 540, y: 1250 }, { at: T.scoop[0], dur: 1.6, z: 0.08, x: 540, y: 1150 }],
  pitch: { [LN]: 783.99 },
  scene(x, t) {
    pisces(x, t, { x: 230, y: 720, s: 130, tears: t > T.last ? 3 : t > T.scoop[0] ? 2 : 1, mood: t > T.scoop[0] ? 'happy' : 'sparkle', look: [1, 0.3], pop: pop01(t, -1) })
    let mood = 'wide', look = [0, 0]
    if (t < 2.3) mood = Math.floor(t / 0.55) % 2 ? 'wide' : 'happy'
    else if (t < 5.6) { mood = t > 4.2 ? 'squint' : 'happy'; look = t > 4.2 ? [-1, 0] : [0, 0] }
    else if (t < T.cut) { mood = t > T.split[1] ? 'sparkle' : 'squint'; look = [0, 1] }
    else mood = t > T.scoop[1] ? 'wink' : 'happy'
    if (t > T.last) mood = 'heart'
    drawStarChar(x, 560, 980, 350, t, { color: LI.color, glyph: LI.glyph, mood, look, hops: HOPS, seed: 8, glow: 1.1, blush: t > T.scoop[1] ? 1 : 0 })
    table(x, 1150)
    // the menu (hook), then the dessert
    if (t < T.cake[0]) { const a = outK(t, [5.2, 5.6]); x.save(); x.globalAlpha = a; x.translate(540, 1290); x.rotate(-0.04); R(x, INK, -170, -110, 340, 220); R(x, '#fff8ef', -164, -104, 328, 208); x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.fillText('MENU', 0, -60); for (let i = 0; i < 4; i++) R(x, '#c9c3e6', -120, -30 + i * 30, 240 - (i % 2) * 60, 10); x.restore() }
    cakeTop(x, t); ruler(x, t)
    // hook: the ping-pong
    for (let i = 0; i < 4; i++) { const a = i * 0.55; if (t < 2.3) { const me = i % 2 === 1; if ((t > a || i === 0) && t < a + 0.55) bubble(x, t, me ? 700 : 790, me ? 1240 : 690, i === 0 ? -1 : a, me ? 'no, YOU pick!' : 'you pick!', { size: 42, col: me ? YOU : '#ff9ec8' }) } }
    if (t > 3.0 && t < 5.4) { const n = Math.floor((t - 3.0) / 0.5); if (n < 3) bubble(x, t, 780, 720, 3.0 + n * 0.5, ['one…', 'two…', 'three…'][n], { size: 40, out: [3.0 + (n + 1) * 0.5 - 0.05, 3.0 + (n + 1) * 0.5] }); else bubble(x, t, 780, 720, 4.5, '…', { size: 44, out: [5.2, 5.4] }) }
    if (t > T.split[1]) sparkles(x, t, 540, 1290, T.split[1], 10, 180, 1, [GOLD, BONE, HOT])
    if (t > T.last) { sparkles(x, t, 560, 960, T.last + 0.35, 12, 240, 1, ['#ff9ec8', GOLD, BONE]); for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 560 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 880 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) } }
  },
  cues: [
    ...[0, 0.55, 1.1, 1.65].map((a, i) => ['pop', r3(a + 0.03), i % 2 ? 622.25 : 932.33, 0.04, i % 2 ? 0.3 : -0.3]),
    ['tick', 3.02, 0.04], ['tick', 3.52, 0.04], ['tick', 4.02, 0.04],
    ['whoosh', r3(T.cake[0]), 0.4, 0.03], ['tick', r3(T.ruler[1]), 0.05], ['whoosh', r3(T.split[0]), 0.25, 0.03], ['pop', r3(T.split[1]), 1244.51, 0.04, 0], ['glitter', r3(T.split[1]), r3(T.split[1] + 0.4)],
    ['whoosh', r3(T.scoop[0]), 0.7, 0.025], ['bell', r3(T.scoop[1]), 1567.98, 0.028, 1, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
