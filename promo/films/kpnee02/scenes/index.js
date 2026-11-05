// kpnee02: PLANET TALK: NEPTUNE, "Neptune to Taurus: The Memory Filter" (26 s vertical, star_advice, lofi · Ab). Loop.
//   0.00  frame 0: Neptune mid-surface out of Taurus' giant tea mug, the splash frozen in the air. "Taurus. That memory
//         has a *filter.*" · 0.6 whip zoom
//   2.6   the old photo (Taurus + the ex), drowned in a pink glow. "we were *so* happy. why did we stop?" · Pisces sobs
//   5.9   Neptune: "gorgeous shot. but that's a *filter.*"
//   8.8   Neptune peels the rose film off: under it, little notes ("plans kept cancelling", "the big talks never
//         happened"). "the good parts were *real.* so were the reasons it ended." · "miss it kindly. just don't *rewrite* it."
//  16.0   the photo goes into a box: KEPT, WITH LOVE. "keep the warmth. not the plan to *go back.*"
//  22.4   "Real memories. *No* filter." Taurus sips tea; the loop eases back into frame 0.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE } from '../../kpnee01/scenes/nepkit.js'

const D = 26
const T = { photo: 2.6, nep1: 5.9, peel: 8.8, box: 16.0, end: 22.4 }

function kitchen(x, t) {
  drawSpace(x, t, { planet: 'neptune', seed: 21 })
  // a cosy window and a shelf
  x.fillStyle = '#3d2a20'; x.fillRect(80, 1560, 920, 30)
}
function mug(x, t, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.lineWidth = 12; x.strokeStyle = INK
  x.beginPath(); x.arc(250, 40, 90, -1.2, 1.2); x.lineWidth = 40; x.stroke(); x.lineWidth = 24; x.strokeStyle = '#f2a3b8'; x.stroke()
  x.beginPath(); x.moveTo(-260, -120); x.lineTo(260, -120); x.lineTo(230, 230); x.quadraticCurveTo(0, 270, -230, 230); x.closePath()
  x.fillStyle = '#f2a3b8'; x.fill(); x.lineWidth = 12; x.strokeStyle = INK; x.stroke()
  x.fillStyle = '#7a4a2a'; x.beginPath(); x.ellipse(0, -120, 255, 40, 0, 0, Math.PI * 2); x.fill(); x.stroke()
  P.heart(x, 0, 70, 54, '#ff6f9f')
  x.restore()
}
function splash(x, t, cx, cy) {
  // frozen-ish splash drops (they keep falling slowly)
  for (let i = 0; i < 16; i++) {
    const a = -Math.PI / 2 + (i / 15 - 0.5) * 2.4, r = 180 + (i % 4) * 70 + t * 40
    const px = cx + Math.cos(a) * r * 1.3, py = cy + Math.sin(a) * r + t * t * 60
    x.fillStyle = INK; x.beginPath(); x.arc(px, py, 22 - (i % 3) * 4, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#c08a5a'; x.beginPath(); x.arc(px, py, 16 - (i % 3) * 4, 0, Math.PI * 2); x.fill()
  }
}
function photo(x, t, cx, cy, { tint = 1, peel = 0, notes = 0, k = 1, rot = -0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-300, -340, 600, 680)
  x.fillStyle = BONE; x.fillRect(-290, -330, 580, 660)
  x.save(); x.beginPath(); x.rect(-250, -290, 500, 480); x.clip()
  const g = x.createLinearGradient(0, -290, 0, 190); g.addColorStop(0, '#8fb3ff'); g.addColorStop(1, '#ffd9a8'); x.fillStyle = g; x.fillRect(-250, -290, 500, 480)
  x.fillStyle = '#5a9a5a'; x.fillRect(-250, 100, 500, 90)
  drawSign(x, 'taurus', -100, 20, 190, 2.0, { mood: 'happy', glyph: false, blink: false })
  drawSign(x, 'libra', 110, 20, 190, 2.0, { mood: 'happy', glyph: false, blink: false, color: '#a9a2c8' })
  // the notes under the filter
  if (notes > 0) {
    P.sticker(x, 'plans kept cancelling', -40, -200, { k: pop01(notes, 0.05, 0.3), col: BONE, size: 30, rot: -0.06 })
    P.sticker(x, 'the big talks never happened', 20, 150, { k: pop01(notes, 0.45, 0.3), col: BONE, size: 28, rot: 0.04 })
  }
  // the rose filter, peeling from the bottom-right corner
  if (tint > 0) {
    const px = lerp(250, -260, peel), py = lerp(190, -300, peel)
    x.save(); x.beginPath(); x.moveTo(-250, -290); x.lineTo(250, -290); x.lineTo(250, py + (190 - py) * 0); x.lineTo(px, 190); x.lineTo(-250, 190); x.closePath()
    if (peel > 0) { x.beginPath(); x.moveTo(-250, -290); x.lineTo(250, -290); x.lineTo(250, lerp(190, -290, peel)); x.lineTo(lerp(250, -250, peel), 190); x.lineTo(-250, 190); x.closePath() }
    x.clip(); x.fillStyle = `rgba(255,110,170,${0.55 * tint})`; x.fillRect(-250, -290, 500, 480)
    for (let i = 0; i < 6; i++) P.heart(x, -200 + i * 80, -240 + (i % 2) * 380, 18, 'rgba(255,255,255,0.7)', { outline: false })
    x.restore()
    if (peel > 0 && peel < 1) { // the curled flap
      const fx = lerp(250, -250, peel), fy = lerp(190, -290, peel)
      x.fillStyle = 'rgba(255,170,205,0.95)'; x.strokeStyle = INK; x.lineWidth = 6
      x.beginPath(); x.moveTo(fx, 190); x.lineTo(250, fy); x.lineTo(250 + (250 - fx) * 0.25, 190 + (190 - fy) * 0.25); x.closePath(); x.fill(); x.stroke()
    }
  }
  x.restore()
  x.fillStyle = INK; x.font = "italic 600 44px 'EB Garamond', Georgia, serif"; x.textAlign = 'center'; x.fillText('us, that summer', 0, 270)
  x.restore()
}
function memBox(x, t, k, lid) {
  if (k <= 0.01) return
  x.save(); x.translate(540, 1020); x.scale(k, k)
  P.box(x, 0, 60, 560, 300, '#c9a6ff', { r: 14, lw: 10 })
  P.sticker(x, 'KEPT, WITH LOVE', 0, 80, { col: BONE, size: 40, rot: -0.03 })
  x.save(); x.translate(0, -90 - lid * 40); x.rotate(-0.3 * (1 - lid)); P.box(x, 0, 0, 600, 70, '#b38cf0', { r: 12, lw: 10 }); x.restore()
  x.restore()
}

const E = episode({
  sign: 'taurus', duration: D, ending: 'loop',
  entrance: { kind: 'burst', at: -0.45, x: 540, y: 1100, size: 470 },
  hook: { text: 'Taurus. That memory | has a *filter.*', out: [2.35, 2.55], size: 108 },
  fx: [{ kind: 'whip', at: 0.6 }],
  caps: [{ at: T.end, text: 'Real memories. | *No* filter.', top: 250, size: 104, out: [D - 0.5, D - 0.3] }],
  cry: [[0, 2], [3.6, 3], [6.5, 2], [10.2, 3], [13.5, 2], [17.0, 3], [T.end, 2]],
  shots: [
    { a: -1, b: T.photo, bg: (x, t) => { kitchen(x, t); splash(x, t, 540, 1250) }, front: (x, t) => mug(x, t, 470, 1420, 1.0),
      nep: { x: 540, y: 1100, size: 470, mood: 'wide' }, sign: { x: 900, y: 1530, size: 230, mood: 'wide', look: [-1, -1] } },
    { a: T.photo, b: T.peel, bg: (x, t) => { kitchen(x, t); P.glow(x, 540, 800, 600, ROSE, 0.35) }, mid: (x, t) => photo(x, t, 540, 820, { k: pop01(t, T.photo, 0.4) }),
      nep: { x: 180, y: 1300, size: 260, mood: [[0, 'love'], [T.nep1, 'happy']] }, sign: { x: 760, y: 1370, size: 280, mood: [[0, 'sparkle'], [T.nep1 + 1, 'sad']], look: [-0.5, -1] } },
    { a: T.peel, b: T.box, bg: (x, t) => kitchen(x, t), mid: (x, t) => photo(x, t, 540, 820, { peel: ease.inOutCubic(prog(t, T.peel + 0.3, T.peel + 1.6)), notes: t - T.peel - 1.5, tint: 1 - prog(t, T.peel + 1.5, T.peel + 1.7) }),
      nep: { x: 180, y: 1300, size: 260, mood: [[0, 'happy'], [T.peel + 4.4, 'sad'], [T.peel + 5, 'love']] }, sign: { x: 780, y: 1370, size: 270, mood: [[0, 'wide'], [T.peel + 2.5, 'sad'], [T.peel + 6, 'neutral']], tears: [[0, 0], [T.peel + 2.5, 1], [T.peel + 6, 0]], look: [-0.5, -1] } },
    { a: T.box, b: T.end, bg: (x, t) => kitchen(x, t), mid: (x, t) => { const d = ease.inCubic(prog(t, T.box + 0.3, T.box + 1.2)); if (d < 1) photo(x, t, 540, lerp(820, 1000, d), { tint: 0, notes: 3, k: 1 - d * 0.6, rot: -0.05 + d * 0.3 }); memBox(x, t, pop01(t, T.box, 0.35), ease.outBack ? clamp(prog(t, T.box + 1.2, T.box + 1.5)) : 1) },
      nep: { x: 220, y: 600, size: 280, mood: 'love' }, sign: { x: 780, y: 1390, size: 280, mood: [[0, 'neutral'], [T.box + 1.5, 'happy']], look: [-0.6, -0.6] } },
    { a: T.end, b: D + 1, tr: 0.5, bg: (x, t) => kitchen(x, t), front: (x, t) => mug(x, t, 470, 1420, 1.0),
      nep: { x: 540, y: 1100, size: 470, mood: 'love' }, sign: { x: 900, y: 1530, size: 230, mood: 'happy', look: [-1, -1] } },
  ],
  lines: [
    { t0: T.photo + 0.3, t1: T.nep1 - 0.25, who: 'taurus', text: 'we were *so* happy. why did we stop?', x: 560, y: 1700, tailUp: true, tail: 150 },
    { t0: T.nep1, t1: T.peel - 0.2, who: 'neptune', text: "gorgeous shot. but that's a *filter.*", x: 520, y: 1700, tailUp: true, tail: -250 },
    { t0: T.peel + 1.7, t1: T.peel + 4.6, who: 'neptune', text: 'the good parts were *real.* so were the reasons it ended.', x: 540, y: 1680, tailUp: true, tail: -250 },
    { t0: T.peel + 4.8, t1: T.box - 0.2, who: 'neptune', text: "miss it kindly. just don't *rewrite* it.", x: 540, y: 1680, tailUp: true, tail: -250 },
    { t0: T.box + 1.6, t1: T.end - 0.2, who: 'neptune', text: 'keep the warmth. not the plan to *go back.*', x: 540, y: 1700, tailUp: true, tail: 0 },
  ],
  cues: [['whoosh', T.photo, 0.4, 0.04], ['riser', T.peel + 0.3, T.peel + 1.6, 0.03], ['glitter', T.peel + 1.5, T.peel + 2.0], ['tick', T.box + 1.2, 0.08], ['tom', T.box + 1.25, 110, { gain: 0.2 }]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
