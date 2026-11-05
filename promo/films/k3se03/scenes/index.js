// k3se03: 3-SECOND ADVICE · "The 2 a.m. Paragraph" (8.5 s vertical trial reel, loops, music: lofi · Am). Format: k3se01/threekit.js.
//   0.00  frame 0: ♊ Gemini sitting up in bed, typing frantically; a text bubble grows up out of the phone and off the
//         top of the frame; the bedside clock reads 2:07. A loading bar "sending feelings…" is already at 70 %.
//         Hook: "2 a.m. paragraph *loading…*"  Pisces sniffles in the corner.
//   0.50  whip zoom onto the phone; the frame holds, the bar stalls at 99 %.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Save it as a draft. | *Read it at noon.*"  Gemini taps SAVE DRAFT: the paragraph folds into a
//         tiny envelope and drops into DRAFTS; the clock ticks to 2:09; Gemini yawns and dozes off (z z z).
//   8.05–8.5  loop: eases back into frame 0.
import { makeThree, R, box, bubble, label, shadow, phone, clockBadge, sparkles, drawBits, lerp, prog, ease, clamp, INK, BONE, GOLD, RED, MINT, INTER, MONO } from '../../k3se01/threekit.js'
import { loadingBar, loadingBarCues } from '../../hookkit.js'

const LB = { at: -1.0, len: 3.35, label: 'sending feelings…', stallAt: 99, error: null, y: 1330 }
const LINES = ['ok so i was thinking', 'and honestly like', 'remember that time', 'not to be dramatic', 'but also one more', 'thing about tuesday', 'and another thing', 'anyway that’s all', 'jk one more thing']
function room(x) {
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  // nightstand + lamp
  box(x, 70, 960, 180, 190, '#5a3d2a', { b: 6, hi: '#6e4b33' })
  R(x, INK, 150, 860, 12, 100); box(x, 100, 800, 110, 70, '#f2c75c', { b: 6 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(155, 840, 10, 155, 840, 260); g.addColorStop(0, 'rgba(255,220,140,0.3)'); g.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = g; x.fillRect(0, 600, 420, 500); x.restore()
}
function bed(x) {
  box(x, 270, 1010, 760, 140, '#3f6fb8', { b: 7, hi: '#5d8ad0' })
  box(x, 270, 920, 40, 230, '#5a3d2a', { b: 6 })
  for (let i = 0; i < 5; i++) R(x, '#36609f', 330 + i * 140, 1040, 70, 90)
}
// the growing paragraph
function paragraph(x, t, px, topY, k = 1) {
  if (k <= 0.01) return
  const bot = 790, h = Math.max(0, bot - topY)
  x.save(); x.translate(px, bot); x.scale(k, k); x.translate(-px, -bot)
  box(x, px - 175, topY, 350, h, '#4f7cd8', { b: 7 })
  x.save(); x.beginPath(); x.rect(px - 175, topY, 350, h); x.clip()
  x.font = `700 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
  const n = Math.ceil(h / 40) + 1
  for (let i = 0; i < n; i++) x.fillText(LINES[i % LINES.length], px - 150, bot - 30 - i * 40)
  x.restore()
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  room(x)
  if (phase === 'hook') {
    clockBadge(x, 160, 930, '2:07')
    paragraph(x, t, 720, 420 - 260 * u)
    hero(x, t, { x: 500, y: 880, s: 300, mood: 'wide', look: [1, -0.4], squash: 0.03 * Math.sin(t * 40) })
    bed(x)
    const sh = 5 * Math.sin(t * 55)
    phone(x, 720 + sh, 880, { w: 150, h: 250, rot: 0.08, draw: (c, w, h) => { c.fillStyle = '#4f7cd8'; c.fillRect(10, 10, w - 20, h - 60); c.fillStyle = BONE; c.fillRect(14, h - 36, 6, 22 * (Math.sin(t * 14) > 0 ? 1 : 0)) } })
    label(x, 'tap tap tap', 720, 1060, { size: 30, col: MINT, rot: -0.05 })
    return
  }
  // fix: save as draft → fold → doze off
  const fold = ease.inOutCubic(prog(u, 0.45, 0.95))
  clockBadge(x, 160, 930, u > 1.4 ? '2:09' : '2:07')
  if (fold < 1) paragraph(x, t, 720, lerp(420 - 130, 760, fold), 1 - 0.6 * fold)
  // the envelope drops into the DRAFTS folder
  const ev = prog(u, 0.95, 1.5)
  box(x, 860, 640, 170, 110, '#f2c75c', { b: 6, hi: '#ffe08a' }); R(x, '#d9a93c', 860, 620, 70, 26)
  label(x, 'DRAFTS', 945, 700, { size: 26, col: INK, font: INTER, weight: 800 })
  if (ev > 0 && ev < 1) {
    const ex = lerp(720, 945, ease.inOutCubic(ev)), ey = lerp(760, 680, ease.inOutCubic(ev)) - 120 * Math.sin(Math.PI * ev)
    box(x, ex - 40, ey - 26, 80, 52, BONE, { b: 5 }); R(x, '#c9bfae', ex - 34, ey - 20, 68, 6)
  }
  if (u > 1.5) { sparkles(x, t, 945, 690, 2.45 + 1.5, 8, 110, 1); label(x, 'read at 12:00', 945, 800, { size: 28, col: GOLD, alpha: clamp(prog(u, 1.6, 1.8)) }) }
  const sleepy = u > 2.0
  hero(x, t, { x: 500, y: lerp(880, 930, ease.inOutCubic(prog(u, 2.3, 3.0))), s: 300, mood: u < 0.4 ? 'neutral' : sleepy ? 'sleepy' : 'happy', look: [1, -0.4], hops: [2.45 + 0.05, 2.45 + 1.55] })
  bed(x)
  // the phone: SAVE DRAFT pill, then face down on the blanket
  if (u < 2.0) {
    phone(x, 720, 880, { w: 150, h: 250, rot: 0.08, draw: (c, w, h) => { c.fillStyle = '#4f7cd8'; c.fillRect(10, 10, w - 20, (h - 60) * (1 - fold)) } })
    const pk = clamp(prog(u, 0.1, 0.3)) * (1 - prog(u, 1.4, 1.6))
    if (pk > 0) bubble(x, t, 720, 1070, 0, 99, 'SAVE DRAFT', { size: 30, col: MINT, k: pk, tailUp: true })
  } else box(x, 640, 1000, 150, 22, '#2a2148', { b: 6 })
  if (u > 2.0 && u < 2.6) label(x, '*yawn*', 360, 760, { size: 40, col: BONE, alpha: 1 - prog(u, 2.45, 2.6) })
}

const EP = makeThree({
  id: 'k3se03', sign: 'gemini', dur: 8.5, brk: 'whip', ending: 'loop', focus: [720, 860],
  hook: '2 a.m. paragraph | *loading…*', accent: '#ffd36b',
  advice: 'Save it as a draft. | *Read it at noon.*',
  scene, loopExtra: [loadingBar(LB)],
  cues: [
    ...loadingBarCues(LB).filter(c => c[1] >= 0),
    ['tick', 2.6, 0.08], ['pop', 2.62, 1318.51, 0.04, 0.3], ['whoosh', 2.9, 0.45, 0.03], ['pop', 3.5, 880, 0.04, 0.4], ['glitter', 3.95, 4.3],
    ['pluck', 4.5, 659.25, 0.03, -0.3, 0.5], ['pluck', 5.0, 523.25, 0.025, -0.3, 0.6],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
