// naske33 · Ask the Stars, Volume 2, ep 33 · "They want to settle down. I want to travel." (18 s, house · A)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "They want to settle down. I want to *travel.*"  ♐ Sag mid-sprint with a backpack (speed lines), while
//         its partner holds up a tiny house.
//   3.0   "you can want both. say both out loud."  Two signs light up: ADVENTURE · HOME.
//   5.9   "plan one trip together, then a home base."  A dotted map route that ends at a little house.
//   8.8   "a good partner is a home you can travel with."  Both walking: a suitcase, a house-lantern.
//   12.1  "Home can *travel.*"
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, hatCells, snowBank, label, drawPixelStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER } from '../../naske19/scenes/askkit2.js'

const HOUSE = ['...RR...', '..RRRR..', '.RRRRRR.', 'RRRRRRRR', '.WWWWWW.', '.WYWWDW.', '.WWWWDW.', '.WWWWDW.']
const HOUSE_C = { R: '#e8414f', W: '#f5eedf', Y: '#ffd34d', D: '#8a5a32' }
function backpack(x, cx, cy, s) { box(x, cx - s * 0.32, cy - s * 0.42, s * 0.64, s * 0.84, '#c46a2c', { b: 5, hi: '#e08a48' }); R(x, '#8a4a1c', cx - s * 0.22, cy - s * 0.05, s * 0.44, s * 0.24) }
function sign(x, cx, cy, text, on, col) {
  x.font = `800 50px ${INTER}`; const w = x.measureText(text).width + 60
  R(x, INK, cx - w / 2 - 7, cy - 47, w + 14, 94); R(x, on ? col : '#3a3358', cx - w / 2, cy - 40, w, 80)
  if (on) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.25; R(x, col, cx - w / 2 - 30, cy - 70, w + 60, 140); x.restore() }
  x.fillStyle = on ? INK : '#8a84a8'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, cx, cy + 2)
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    snowBank(x, 1215)
    // Sag sprinting on the spot (speed lines), partner with the tiny house
    const run = k === 0 ? 1 : 1 - prog(t, S.b[1], S.b[1] + 0.4)
    const o = { x: 330, y: 1010, s: 270, mood: k === 0 ? 'happy' : 'sparkle', look: [-1, -0.2], hops: k === 0 ? [-0.1, 0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.7] : S.hops(0), squash: -0.08 * run }
    backpack(x, 330 + 140, 1000, 160)
    shadow(x, 330, 1180, 230)
    S.hero(x, t, o)
    inSprite(x, starFrame(o.x, o.y, o.s, t, o), () => hatCells(x, '#ffb03c', BONE))
    if (run > 0.05) { x.save(); x.globalAlpha = run; x.fillStyle = 'rgba(255,240,220,0.8)'; for (let i = 0; i < 6; i++) { const len = 80 + (i * 37) % 90; x.fillRect(Math.round(500 + ((t * 900 + i * 70) % 160)), 880 + i * 40, len, 6) } x.restore() }
    shadow(x, 790, 1180, 200)
    S.partner(x, t, { x: 790, y: 1030, s: 230, mood: 'happy', look: [-1, -0.5], hops: [1.0, 2.0] })
    drawBits(x, HOUSE, HOUSE_C, 790, 820 + Math.sin(t * 3) * 6, 14)
    if (k === 1) {
      sign(x, 330, 640, 'ADVENTURE', t > S.b[1] + 0.5, '#ffb03c')
      sign(x, 790, 640, 'HOME', t > S.b[1] + 1.1, '#7fd0ff')
      if (t > S.b[1] + 1.4) label(x, '+', 560, 640, { size: 64, col: GOLD })
    }
    return
  }
  if (k === 2) {
    const mk = pop01(t, S.b[2] + 0.05, 0.4, 1.8)
    x.save(); x.translate(540, 820); x.scale(mk, mk); x.translate(-540, -820)
    box(x, 160, 600, 760, 440, '#f7e9c4', { b: 7 })
    x.strokeStyle = '#9fb8c8'; x.lineWidth = 8; x.beginPath(); x.moveTo(190, 700); x.bezierCurveTo(330, 650, 420, 820, 560, 760); x.bezierCurveTo(700, 700, 760, 900, 890, 860); x.stroke()
    const dp = prog(t, S.b[2] + 0.6, S.b[2] + 2.0)
    const pts = [[230, 950], [380, 680], [600, 900], [780, 700]]
    x.fillStyle = RED
    for (let i = 0; i < 3; i++) for (let d = 0; d < 8; d++) { const u = d / 8; if (u > dp * 3 - i) break; const [ax, ay] = pts[i], [bx, by] = pts[i + 1]; x.fillRect(Math.round(lerp(ax, bx, u) - 5), Math.round(lerp(ay, by, u) - 5), 10, 10) }
    drawPixelStar(x, 230, 950, 36, 2, GOLD); label(x, 'TRIP', 230, 1000, { size: 26, col: INK })
    if (dp >= 1) { drawBits(x, HOUSE, HOUSE_C, 780, 690, 9 * pop01(t, S.b[2] + 2.0, 0.3, 2.6)); label(x, 'HOME BASE', 780, 770, { size: 26, col: INK }) }
    x.restore()
    S.hero(x, t, { x: 170, y: 1150, s: 190, mood: 'happy', look: [1, -1], hops: S.hops(1) })
    return
  }
  // beat 3: walking together (the ground scrolls), a suitcase and a house-lantern
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  x.save(); x.globalAlpha = out; for (let X = -((t * 160) % 80); X < 1080; X += 80) R(x, 'rgba(239,230,214,0.25)', X, 1210, 40, 8); x.restore()
  snowBank(x, 1240, { a: out })
  const step = Math.abs(Math.sin(t * 7)) * 0.06
  S.hero(x, t, { x: 380, y: 1040, s: 240, pop: kk, mood: 'happy', look: [1, 0], hops: S.hops(2), squash: step })
  S.partner(x, t, { x: 690, y: 1040, s: 240, pop: kk, mood: 'happy', look: [-1, 0], squash: 0.06 - step })
  if (kk > 0.5) {
    box(x, 210, 1080, 90, 70, '#4a7fff', { b: 5, hi: '#7fa6ff' }); R(x, INK, 240, 1066, 30, 14)
    const sw = Math.sin(t * 3.5) * 0.12
    x.save(); x.translate(860, 980); x.rotate(sw); R(x, INK, -3, -60, 6, 60); drawBits(x, HOUSE, HOUSE_C, 0, 30, 9)
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(0, 40, 4, 0, 40, 120); g.addColorStop(0, 'rgba(255,210,120,0.45)'); g.addColorStop(1, 'rgba(255,210,120,0)'); x.fillStyle = g; x.fillRect(-130, -80, 260, 260); x.restore()
    x.restore()
  }
  hearts(x, t, S.b[3] + 1.4, 540, 860, { n: 4, cell: 6, spread: 140 })
}

const EP = makeAsk({
  sign: 'sagittarius', name: 'SAGITTARIUS', partner: 'cancer',
  question: 'They want to settle down. | I want to *travel.*',
  lines: ['you can want both. say both out loud.', 'plan one trip together, then a home base.', 'a good partner is a home you can travel with.'],
  chip: '♐ NATURAL RULER OF THE 9TH HOUSE: TRAVEL',
  last: 'Home can | *travel.*',
  scene, qSize: 70,
  pis: { x: 965, y: 1290, s: 96 },
  cues: [
    ['tick', 0.3, 0.025], ['tick', 0.7, 0.025], ['tick', 1.1, 0.025], ['tick', 1.5, 0.025], ['tick', 1.9, 0.025], ['tick', 2.3, 0.025], ['tick', 2.7, 0.025],
    ['pop', 3.5, 880, 0.045, -0.4], ['pop', 4.1, 1174.66, 0.045, 0.4], ['glitter', 4.2, 4.6],
    ['whoosh', 5.95, 0.3, 0.03], ['pop', 6.7, 659.25, 0.02, 0], ['pop', 7.2, 739.99, 0.02, 0], ['pop', 7.7, 880, 0.02, 0], ['pop', 7.95, 1318.51, 0.04, 0.3],
    ['tick', 9.2, 0.03], ['tick', 9.65, 0.03], ['tick', 10.1, 0.03], ['tick', 10.55, 0.03], ['glitter', 10.3, 10.8],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
