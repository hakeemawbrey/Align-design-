// klge05 · Your Sign's Love Glitch · "Aries.exe: Day 30" (20 s vertical, star_advice post, hard cut).
//   0.0   frame 0: ARIES.EXE: bored. Day 30. Aries mid-sprint away from its date (speed lines, dust), the calendar on
//         DAY 30, the spark hearts draining. 0.5 whip onto the calendar.
//   3.0   the glitch: falling fast, then bored. Day 1 (hearts full, heart eyes) → 7 → 14 → 30 (hearts drain).
//   6.2   Aries scrolls a NEW!! feed.   7.6 error: PATIENCE.SYS missing.   9.3 Pisces pops out of the tray, crying.
//   11.3  THE STARS: "the slow part is where it gets *real.*"   13.8 patch 1.5 installs.
//   15.6  day 31: the couch, a blanket, a board game, the hearts refilling slowly in gold.
//   17.9  last line "Slow is not *boring.*", held to the cut at 20.0.
import { makeGlitch, R, box, label, drawBits, HEART, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const COZY = 15.6
const dayAt = t => t < 3 ? 30 : t < 3.9 ? 1 : t < 4.6 ? 7 : t < 5.3 ? 14 : t < COZY ? 30 : 31
const sparkAt = t => {
  if (t >= COZY) return lerp(0.4, 0.8, ease.inOutQuad(prog(t, COZY + 0.6, 19)))
  if (t < 3) return 0.2
  if (t < 3.9) return 1
  return lerp(1, 0.12, prog(t, 3.9, 6.0))
}
function calendar(x, t, X, Y, d) {
  box(x, X, Y, 200, 220, '#f4f0fa', { b: 6 }); R(x, RED, X, Y, 200, 60)
  label(x, 'DAY', X + 100, Y + 32, { size: 30, col: BONE })
  const k = 1 + 0.25 * (1 - prog(t, Math.floor(t * 10) / 10, Math.floor(t * 10) / 10 + 0.1)) * (d !== dayAt(t - 0.12) ? 1 : 0)
  label(x, String(d), X + 100, Y + 145, { size: 96 * k, col: INK, font: INTER, weight: 900 })
}
function sparkRow(x, t, v, gold) {
  label(x, 'SPARK', 110, 620, { size: 24, align: 'left', col: BONE })
  for (let i = 0; i < 10; i++) {
    const on = (i + 0.5) / 10 < v
    drawBits(x, HEART, { H: on ? (gold ? GOLD : '#ff4d6d') : '#3a2f5a' }, 230 + i * 62, 620, 7)
  }
}
function feed(x, t) {
  const k = pop01(t, 6.2, 0.25, 2.2) * outK(t, [9.2, 9.4])
  if (k <= 0.01) return
  x.save(); x.translate(780, 1010); x.scale(k, k)
  box(x, -170, -260, 340, 520, '#120d26', { b: 7 }); R(x, '#d04a2a', -170, -260, 340, 64)
  label(x, 'NEW!! NEW!!', 0, -226, { size: 26, col: BONE })
  const off = ((t - 6.2) * 260) % 150
  for (let i = 0; i < 5; i++) {
    const y = -170 + i * 150 - off
    if (y < -190 || y > 230) continue
    box(x, -140, y, 280, 120, ['#f2cf4a', '#7fd0f0', '#ff8fb1', '#9fe6b0', '#c9a6ff'][i], { b: 4 })
    label(x, ['someone NEW', 'also NEW', 'NEWER', 'brand NEW', 'new-new'][i], 0, y + 62, { size: 30, col: INK, font: INTER, weight: 900 })
  }
  x.restore()
}
function couch(x, t) {
  R(x, '#2a1d3e', 70, 556, 940, 880)
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, 1100, 30, 540, 1100, 560); g.addColorStop(0, 'rgba(255,200,120,0.26)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(70, 556, 940, 880); x.restore()
  box(x, 170, 1180, 740, 140, '#7a4a8e', { b: 6 }); box(x, 140, 1110, 80, 210, '#6a3a7e', { b: 6 }); box(x, 860, 1110, 80, 210, '#6a3a7e', { b: 6 })
  void t
}

function scene(x, t, K) {
  const cozy = t >= COZY
  if (!cozy) {
    R(x, '#1b1236', 70, 556, 940, 880); R(x, '#2e2448', 70, 1330, 940, 106)
    sparkRow(x, t, sparkAt(t), false)
    calendar(x, t, 760, 690, dayAt(t))
    // the date (Libra star), left behind
    K.star(x, t, 'libra', 280, 1240, 250, { mood: t < 3.9 && t >= 3 ? 'heart' : t < 3 ? 'wide' : 'neutral', look: [1, 0], seed: 4 })
    // Aries: mid-sprint on day 30, heart-eyed on day 1, bored by day 14
    const run = t < 3 || (t > 6.0 && t < 6.6)
    const ax = t < 3 ? 640 + Math.sin(t * 30) * 4 : t < 3.9 ? 470 : 560
    K.hero(x, t, ax, 1240, 290, { mood: t < 3 ? 'wide' : t < 3.9 ? 'heart' : t < 5.3 ? 'neutral' : t > 7.6 && t < 9.3 ? 'wide' : 'sleepy', look: run ? [1, 0] : t > 6.2 ? [1, -0.4] : [-1, 0], squash: run ? -0.14 : 0, hops: [3.0, 3.4, 3.9, 4.6, 5.3] })
    if (run) for (let i = 0; i < 4; i++) { R(x, 'rgba(239,230,214,0.6)', ax - 200 - i * 40, 1160 + i * 34, 120 - i * 18, 8) }
    if (t < 3) for (let i = 0; i < 3; i++) { const p = ((t * 1.5 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#cfc8e8', ax - 160 - p * 120, 1320 - p * 60 - i * 10, 30, 30); x.restore() }
    if (t >= 3 && t < 3.9) hearts(x, t, 3.0, 470, 1040, { n: 6 })
    feed(x, t)
  } else {
    couch(x, t)
    sparkRow(x, t, sparkAt(t), true)
    calendar(x, t, 760, 690, 31)
    // the board game between them
    box(x, 420, 1150, 240, 40, '#e9e4f2', { b: 4 }); for (let i = 0; i < 6; i++) R(x, i % 2 ? RED : '#3fb6f0', 432 + i * 38, 1158, 26, 24)
    K.star(x, t, 'libra', 330, 1110, 240, { mood: 'happy', look: [1, 0], seed: 4, hops: [16.4, 17.6] })
    K.hero(x, t, 750, 1110, 250, { mood: t > 16.6 ? 'happy' : 'neutral', look: [-1, 0], hops: [16.2, 17.2] })
    // the shared blanket
    R(x, INK, 180, 1196, 720, 92); R(x, '#e86a8a', 186, 1202, 708, 80); for (let i = 0; i < 708; i += 48) R(x, '#f39ab0', 186 + i, 1202, 24, 80)
    if (t > 16.6) sparkles(x, t, 540, 1050, 16.6, 10, 160, 2, [GOLD, BONE])
  }
}

const F = makeGlitch({
  id: 'klge05', sign: 'aries', len: 20, ending: 'cut',
  hook: 'ARIES.EXE: bored. *Day 30.*',
  err: { msg: ['Spark: low. Day: 30.', 'Now searching: "new."'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 860, y: 800, z: 0.4, hold: 0.5 }, { kind: 'glitch', at: 7.6, dur: 0.45 }, { kind: 'flash', at: COZY, col: GOLD }],
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: falling *fast*, then bored' }, { at: COZY + 0.1, out: 17.6, text: 'day 31:' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['PATIENCE.SYS', 'is missing.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.3, out: 11.2, text: 'day 30 is when it gets cozy!! *sob*', tears: 3 }],
  stars: [{ t: 11.35, text: 'the slow part is where it gets *real.*' }],
  box: { close: 13.8 },
  patch: { at: 13.8, ver: '1.5', name: 'LET IT BUILD SLOWLY', dur: 1.0, out: 15.5 },
  last: { at: 17.9, text: 'Slow is not *boring.*' },
  scene, accent: '#c4442a',
  cues: [['tick', 3.0, 0.05], ['tick', 3.9, 0.05], ['tick', 4.6, 0.05], ['tick', 5.3, 0.05], ['pop', 3.0, 1046.5, 0.04, 0], ['whoosh', 6.0, 0.3, 0.04], ['pop', 16.6, 783.99, 0.04, 0]],
  music: { style: 'chiptune', key: 'Am', seed: 1805, drop: 3.0, breakdown: [9.3], lift: [COZY] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
