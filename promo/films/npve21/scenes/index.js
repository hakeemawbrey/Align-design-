// npve21 · POV: You're Dating a ___ · ep 21 · "POV: you're dating a Sagittarius. 10 PM." (17 s vertical, chiptune · E)
// Story 0–12.6, then the shared end card. Rows: promo/films/next30/b43.md. Look: ../../npve01/scenes/datekit.js.
//   0.0–2.3   hook: ♐ SAG at your door at 10 PM, snow behind, holding up a sled. Timestamp: 10:02 PM.
//   2.3–6.0   (1) it flips a talk card at you: "Planned date or spontaneous date?" SAG: "spontaneous. *obviously.*"
//             Sticker: "it's a *school night*".
//   6.2       card cut: the hill.
//   6.3–9.8   (2, the turn) after one run you both end up flat in the snow, just looking up at the winter stars.
//             SAG: "okay. this part is *better.*"  Sticker: "the best bit: *the pause*".
//   10.0      Last line: "Big *plans.* Better pauses."  Pisces cries happy tears at the door, then on the hill.
import { makePOV, drawSet, drawStarChar, signStar, drawBits, HEART, sparkles, pisces, drawImg, beanie, R, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, HOT, YOU, r3 } from '../../npve01/scenes/datekit.js'
import { drawPixelStar } from '../../sky.js'
import { talkHops } from '../../startalk.js'

const SG = signStar('sagittarius'), GN = `${SG.glyph}︎ SAG`
const T = { card: [2.4, 3.0], cut: 6.2, flop: [6.4, 7.0], last: 10.0 }
const LINES = [
  { t: 3.2, speaker: GN, text: 'spontaneous. *obviously.*', color: '#c9a6ff' },
  { t: 7.3, speaker: GN, text: 'okay. this part is *better.*', color: '#c9a6ff' },
]
const HOPS = [0.15, 0.5, ...talkHops(LINES, GN), T.last + 0.3, T.last + 0.8]

function sled(x, cx, cy, rot = 0, s = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -150, -40, 300, 60); R(x, '#d8344f', -144, -34, 288, 48); R(x, '#ff6a7a', -144, -34, 288, 10)
  x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(-150, 34); x.lineTo(150, 34); x.quadraticCurveTo(190, 34, 186, -10); x.stroke()
  x.restore()
}
function hill(x, t) {
  drawSet(x, t, 'street', { snowN: 20 })
  // a clear patch of winter sky with a few bright stars, then the snowy slope
  for (const [sx, sy, r] of [[220, 420, 40], [430, 360, 30], [620, 470, 36], [820, 380, 44], [700, 640, 28], [330, 620, 26]]) drawPixelStar(x, sx, sy, r * (0.9 + 0.1 * Math.sin(t * 3 + sx)), 2, '#fff2c8')
  x.fillStyle = INK; x.beginPath(); x.moveTo(-140, 1000); x.quadraticCurveTo(540, 900, 1220, 1060); x.lineTo(1220, 2100); x.lineTo(-140, 2100); x.fill()
  const sg = x.createLinearGradient(0, 960, 0, 1700); sg.addColorStop(0, '#dcd8f0'); sg.addColorStop(0.45, '#9690c4'); sg.addColorStop(1, '#3a3466'); x.fillStyle = sg; x.beginPath(); x.moveTo(-140, 1010); x.quadraticCurveTo(540, 912, 1220, 1070); x.lineTo(1220, 2100); x.lineTo(-140, 2100); x.fill()
}

const EP = makePOV({
  id: 'npve21', duration: 17,
  set: (x, t) => t < T.cut ? drawSet(x, t, 'door') : hill(x, t),
  caption: 'you’re dating a *Sagittarius.* 10 PM.',
  captionSize: 44,
  images: { talk: 'card-talk-6.png' },
  lines: LINES,
  boxes: [{ from: 0, to: 2, open: 3.0, close: 9.8 }],
  stickers: [
    { at: -1, out: [2.1, 2.3], text: '10:02 PM', x: 850, y: 330, rot: 3, size: 44, kind: 'dark' },
    { at: 4.4, out: [5.95, 6.1], text: 'it’s a *school night*', x: 540, y: 330, rot: -2.5, size: 46, kind: 'light' },
    { at: 8.3, out: [9.6, 9.8], text: 'the best bit: *the pause*', x: 540, y: 330, rot: 2, size: 44, kind: 'you' },
  ],
  last: { at: T.last, text: 'Big *plans.* Better pauses.', color: '#ffd36a' },
  cuts: [T.cut],
  punch: [{ at: T.card[0], dur: 1.8, z: 0.1, x: 760, y: 1000 }],
  pitch: { [GN]: 739.99 },
  scene(x, t, K) {
    if (t < T.cut) {
      pisces(x, t, { x: 850, y: 1290, s: 100, tears: 2, mood: 'sparkle', look: [-1, -0.5], pop: pop01(t, -1) })
      const o = { x: 520, y: 1060, s: 340, hops: HOPS, seed: 4 }
      sled(x, 250, 1060 + 6 * Math.sin(t * 4), -1.35, 1.0)
      drawStarChar(x, o.x, o.y, o.s, t, { color: SG.color, glyph: SG.glyph, mood: t > 3.0 ? 'wink' : 'sparkle', look: [0, 0], hops: HOPS, seed: 4, glow: 1.1 })
      beanie(x, t, o, '#8a5ad8', GOLD)
      if (t > T.card[0]) { const k = ease.outBack(prog(t, ...T.card)); drawImg(x, K.imgs.talk, 790, lerp(1400, 1010, k), 230, { rot: 0.08 }) }
    } else {
      pisces(x, t, { x: 900, y: 1010, s: 105, tears: t > T.last ? 3 : 2, mood: 'happy', look: [-1, -0.5], pop: 1 })
      // flat in the snow, looking up (the star lies tilted), you beside it
      const f = ease.outBack(prog(t, ...T.flop))
      x.save(); x.translate(lerp(540, 400, f), lerp(980, 1210, f)); x.rotate(lerp(0, -1.2, f))
      drawStarChar(x, 0, 0, 330, t, { color: SG.color, glyph: SG.glyph, mood: t > T.last ? 'heart' : t > 7.2 ? 'happy' : 'wide', look: [0, -1], hops: HOPS, seed: 4, glow: 1.1, bob: 0 })
      x.restore()
      x.save(); x.translate(lerp(760, 760, f), lerp(1000, 1260, f)); x.rotate(lerp(0, 1.2, f)); drawStarChar(x, 0, 0, 280, t, { color: YOU, mood: t > 7.6 ? 'happy' : 'wide', look: [0, -1], seed: 3, bob: 0, blush: t > 8 ? 1 : 0 }); x.restore()
      sled(x, 190, 1390, 0.2, 0.7)
      for (let i = 0; i < 8; i++) { const ph = prog(t, T.flop[0], T.flop[0] + 0.6); if (ph > 0 && ph < 1) { x.globalAlpha = 1 - ph; R(x, '#f4f1ff', 580 + Math.cos(i) * 260 * ph, 1220 - Math.abs(Math.sin(i)) * 200 * ph, 20, 20); x.globalAlpha = 1 } }
      if (t > T.last) for (let i = 0; i < 6; i++) { const ph = t - T.last - 0.3 - i * 0.12; if (ph > 0) drawBits(x, HEART, { H: i % 2 ? HOT : GOLD }, 580 + (i - 2.5) * 110 + Math.sin(ph * 4 + i) * 20, 980 - ph * 160, 9, { alpha: clamp(1 - ph / 2.2) }) }
    }
  },
  cues: [
    ['pop', 0.2, 1318.51, 0.04, 0.3],
    ['whoosh', r3(T.card[0]), 0.4, 0.035], ['tick', r3(T.card[1]), 0.05], ['bell', r3(T.card[1] + 0.05), 1318.51, 0.025, 1, 0.3],
    ['whoosh', r3(T.cut - 0.1), 0.7, 0.035], ['tick', r3(T.flop[1] - 0.2), 0.07], ['pluck', r3(T.flop[1] + 0.4), 659.25, 0.03, 1.2, 0], ['bell', 8.2, 1975.53, 0.02, 1.6, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
