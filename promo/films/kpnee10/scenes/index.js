// kpnee10: PLANET TALK: NEPTUNE, "Neptune to Capricorn: Permission to Daydream" (27 s vertical, star_advice, lofi · Eb).
// Hard cut.
//   0.00  frame 0: Neptune mid-burst through Capricorn's spreadsheet, cells flying like stars. "Capricorn. You're |
//         *allowed* to daydream." · 0.6 screen shake
//   2.6   LOVE: 5-YEAR PLAN (Q1 optimise profile · Q2 three dates a month · Q3 meet someone · Q4 review performance).
//         "Q3: meet someone. Q4: *review.*" · Neptune: "where's the part where you *feel* something?"
//  10.0   "feelings weren't in the *budget.*" · Neptune: "let yourself *want* things. not just schedule them."
//  17.4   a tiny daydream: a slow walk under streetlamps, two hands held. Capricorn smiles for one whole second.
//         Neptune: "see? *that.* keep that." · Pisces fountains
//  25.2   "Schedule nothing. *Feel* something." Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, rng, INK, BONE, GOLD, ROSE, NEP, MONO } from '../../kpnee01/scenes/nepkit.js'

const D = 27
const T = { plan: 2.6, nep1: 6.1, budget: 10.0, want: 12.9, dream: 17.4, see: 21.2, end: 25.2 }

function grid(x, t, { hole = 0 } = {}) {
  drawSpace(x, t, { planet: 'neptune', seed: 101 })
  x.save(); x.globalAlpha = 0.9
  for (let r = 0; r < 21; r++) for (let c = 0; c < 8; c++) {
    const cx = 20 + c * 135, cy = 540 + r * 66
    const dx = cx + 60 - 540, dy = cy + 30 - 1000, d = Math.hypot(dx, dy)
    if (hole > 0 && d < hole * 520) continue
    x.fillStyle = (r + c) % 2 ? '#e9f2e6' : '#dbe9d6'; x.fillRect(cx, cy, 130, 62)
    if (r === 0) { x.fillStyle = '#4a8a5a'; x.fillRect(cx, cy, 130, 62) }
  }
  x.restore()
  if (hole > 0) {
    const R = rng(7)
    for (let i = 0; i < 26; i++) {
      const a = R() * Math.PI * 2, sp = 300 + R() * 700, tt = t + 1
      const px = 540 + Math.cos(a) * (hole * 480 + sp * tt * 0.4), py = 1000 + Math.sin(a) * (hole * 480 + sp * tt * 0.4)
      x.save(); x.translate(px, py); x.rotate(a + tt * 3); x.fillStyle = i % 3 ? '#e9f2e6' : '#ffd98a'; x.fillRect(-40, -20, 80, 40); x.strokeStyle = INK; x.lineWidth = 4; x.strokeRect(-40, -20, 80, 40); x.restore()
    }
  }
}
function plan(x, t, { k = 1, cross = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 790); x.scale(k, k)
  P.box(x, 0, 0, 760, 640, '#eef5ea', { r: 10, lw: 8 })
  x.fillStyle = '#4a8a5a'; x.fillRect(-372, -312, 744, 90)
  P.mono(x, 'LOVE: 5-YEAR PLAN', 0, -266, { color: BONE, size: 40 })
  const rows = [['Q1', 'optimise profile'], ['Q2', '3 dates / month'], ['Q3', 'meet someone'], ['Q4', 'review performance'], ['Q5', 'feelings?  (TBD)']]
  rows.forEach(([q, s], i) => {
    const y = -170 + i * 100, kk = pop01(t, T.plan + 0.3 + i * 0.35, 0.3)
    if (kk <= 0.01) return
    x.globalAlpha = clamp(kk)
    x.fillStyle = INK; x.font = `700 36px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText(q, -330, y); x.fillText(s, -220, y)
    x.strokeStyle = 'rgba(27,18,54,0.2)'; x.lineWidth = 3; x.beginPath(); x.moveTo(-350, y + 50); x.lineTo(350, y + 50); x.stroke()
    x.globalAlpha = 1
  })
  if (cross > 0) { x.save(); x.rotate(-0.06); P.sticker(x, 'NOT IN BUDGET', 60, 230, { k: pop01(cross, 0, 0.3), col: '#ff6b6b', size: 40 }); x.restore() }
  x.restore()
}
function daydream(x, w, h, t) {
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2a2370'); g.addColorStop(1, '#5a4aa0'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  for (const lx of [-260, 0, 260]) { x.fillStyle = INK; x.fillRect(lx - 6, -120, 12, 260); x.fillStyle = '#ffd98a'; x.beginPath(); x.arc(lx, -130, 22, 0, Math.PI * 2); x.fill(); P.glow(x, lx, -100, 160, '#ffd98a', 0.35) }
  x.fillStyle = '#3a2f70'; x.fillRect(-w / 2, 130, w, h)
  const walk = (t * 30) % 120
  drawSign(x, 'capricorn', -70 + walk * 0.3, 60, 150, t, { mood: 'happy', glyph: false, blink: false })
  drawSign(x, 'libra', 70 + walk * 0.3, 60, 150, t, { mood: 'happy', glyph: false, blink: false, color: '#ffb38a' })
  P.heart(x, walk * 0.3, -40, 22, ROSE)
}

const E = episode({
  sign: 'capricorn', duration: D, ending: 'cut',
  entrance: { kind: 'burst', at: -0.45, x: 540, y: 1000, size: 440 },
  hook: { text: 'Capricorn. You’re | *allowed* to daydream.', out: [2.35, 2.55], size: 100 },
  fx: [{ kind: 'shake', at: 0.6, len: 0.5 }],
  caps: [{ at: T.end, text: 'Schedule nothing. | *Feel* something.', top: 250, size: 100 }],
  cry: [[0, 2], [6.6, 3], [9.0, 2], [13.4, 3], [15.8, 2], [18.6, 3]],
  shots: [
    { a: -1, b: T.plan, bg: (x, t) => grid(x, t, { hole: 1 }),
      nep: { x: 540, y: 1000, size: 440, mood: 'wide' }, sign: { x: 800, y: 1560, size: 260, mood: 'wide', look: [-1, -1] } },
    { a: T.plan, b: T.budget, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 102 }), mid: (x, t) => plan(x, t, { k: pop01(t, T.plan, 0.4) }),
      nep: { x: 160, y: 1360, size: 230, mood: [[0, 'wide'], [T.nep1, 'sad']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'proud']], look: [-1, -1] } },
    { a: T.budget, b: T.dream, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 102 }), mid: (x, t) => plan(x, t, { cross: t - T.budget - 0.3 }),
      nep: { x: 160, y: 1360, size: 230, mood: [[0, 'sad'], [T.want, 'love']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'neutral'], [T.want + 2, 'squint']], look: [-1, -1] } },
    { a: T.dream, b: T.end, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 103 }); P.filmEdge(x, t, { alpha: 0.5 }) },
      front: (x, t) => { P.thought(x, 520, 820, 820, 600, (c, w, h) => daydream(c, w, h, t), { k: pop01(t, T.dream + 0.3, 0.5, 1.6), from: [760, 1250] }); P.sticker(x, 'SMILE: 1 FULL SECOND', 760, 1190, { k: pop01(t, T.dream + 2.2, 0.3) * outK(t, [T.dream + 3.4, T.dream + 3.6]), col: GOLD, size: 32 }) },
      nep: { x: 150, y: 1380, size: 220, mood: [[0, 'love']], tears: [[T.dream + 1.6, 1]] }, sign: { x: 780, y: 1430, size: 290, mood: [[0, 'neutral'], [T.dream + 2.2, 'happy'], [T.dream + 3.4, 'neutral'], [T.see + 0.8, 'happy']], look: [-0.3, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 104 }); P.hearts(x, t, T.end, 540, 1500, { n: 8, spread: 800 }) },
      nep: { x: 320, y: 1050, size: 320, mood: 'proud' }, sign: { x: 760, y: 1350, size: 300, mood: 'happy', look: [-0.6, -0.4] } },
  ],
  lines: [
    { t0: T.plan + 1.0, t1: T.nep1 - 0.25, who: 'capricorn', text: 'Q3: meet someone. Q4: *review.*', x: 600, y: 1720, tailUp: true, tail: 200 },
    { t0: T.nep1, t1: T.budget - 0.2, who: 'neptune', text: "where's the part where you *feel* something?", x: 520, y: 1720, tailUp: true, tail: -280 },
    { t0: T.budget + 0.3, t1: T.want - 0.2, who: 'capricorn', text: "feelings weren't in the *budget.*", x: 600, y: 1720, tailUp: true, tail: 200 },
    { t0: T.want, t1: T.dream - 0.2, who: 'neptune', text: 'let yourself *want* things. not just schedule them.', x: 540, y: 1720, tailUp: true, tail: -280 },
    { t0: T.see, t1: T.end - 0.2, who: 'neptune', text: 'see? *that.* keep that.', x: 520, y: 1720, tailUp: true, tail: -280 },
  ],
  cues: [['whoosh', T.plan, 0.4, 0.04], ...Array.from({ length: 5 }, (_, i) => ['tick', +(T.plan + 0.3 + i * 0.35).toFixed(2), 0.04]), ['boom', T.budget + 0.3, 0.15], ['glitter', T.dream + 0.3, T.dream + 1.2], ['bell', T.dream + 2.2, 1760, 0.03, 1.2, 0]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
