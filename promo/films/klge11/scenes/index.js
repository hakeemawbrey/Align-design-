// klge11 · Your Sign's Love Glitch · "Aquarius.exe: Too Close" (21 s vertical, star_advice post, loop).
//   0.0   frame 0: AQUARIUS.EXE disconnected. No reason given. Aquarius mid-teleport out of a cuddle on a bench (a
//         pixel trail streaking up), its partner left mid-lean with hearts. 0.5 whip onto the empty half of the bench.
//   3.0   the glitch: vanishing when someone gets close. "i really like you" → Aquarius beams away to the far corner;
//         an AUTO-REPLY: "need space." The partner's phone: "last seen 3 hours ago".
//   7.4   error: SIGNAL LOST.   9.1 Pisces pops out of the tray, crying.
//   11.1  THE STARS: "space is healthy. just say *how long.*"   13.6 patch 1.11 installs.
//   15.5  Aquarius beams back: "i need an hour to recharge. then dinner?" Partner: "deal."
//   18.6  last line "Space is fine. *Say how long.*"   20.55 loop back into frame 0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const BACK = 15.5, AWAY = 3.8
const BENCH = [300, 1250], CORNER = [860, 760]
function beam(x, t, K, px, py, k, o) {
  // a teleporting star: sliced, offset rows and a vertical light column; k = 0 solid … 1 gone
  if (k >= 1) return
  x.save(); x.globalAlpha = 1 - k * 0.8
  for (let s = 0; s < 8; s++) {
    x.save(); x.beginPath(); x.rect(px - 200, py - 200 + s * 50, 400, 50); x.clip()
    const off = Math.sin(t * 40 + s * 2) * 60 * k
    K.hero(x, t, px + off, py - k * 90, 250, o)
    x.restore()
  }
  x.restore()
  if (k > 0) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.5 * Math.sin(Math.PI * k); R(x, '#7fe3ff', px - 70, 556, 140, py - 556 + 120); x.restore() }
}

function scene(x, t, K) {
  R(x, '#141038', 70, 556, 940, 880)
  // a park bench under a lamp
  R(x, '#2a2448', 70, 1340, 940, 96)
  box(x, 120, 1280, 520, 30, '#8a5a3a', { b: 5 }); box(x, 120, 1200, 520, 26, '#8a5a3a', { b: 5 }); R(x, INK, 150, 1310, 14, 60); R(x, INK, 596, 1310, 14, 60)
  R(x, INK, 700, 760, 12, 600); box(x, 670, 730, 72, 40, '#f7d98a', { b: 4 })
  x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(706, 780, 10, 706, 780, 420); g.addColorStop(0, 'rgba(255,220,150,0.25)'); g.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = g; x.fillRect(280, 400, 860, 900); x.restore()
  const back = t >= BACK
  // the partner (Scorpio star), leaning in
  const lean = t < AWAY ? 0.12 : back ? 0.04 : 0
  K.star(x, t, 'scorpio', 450, 1170, 230, { mood: back ? (t > 17.0 ? 'heart' : 'happy') : t < AWAY ? 'heart' : t > 5 ? 'neutral' : 'wide', look: [-1, 0], seed: 8, squash: lean, hops: [3.2, 17.0] })
  if (t < AWAY && t >= 3.2) hearts(x, t, 3.2, 420, 1000, { n: 4 })
  // Aquarius: mid-teleport at frame 0 (k 0.55), solid for 3.0–3.8, beams off at AWAY, sits in the far corner, beams back
  if (t < 3.0) beam(x, t, K, BENCH[0], 1170, 0.55, { mood: 'wide', look: [0, -1] })
  else if (t < AWAY + 0.5) beam(x, t, K, BENCH[0], 1170, t < AWAY ? 0 : prog(t, AWAY, AWAY + 0.5), { mood: 'wide', look: [1, 0] })
  if (t >= AWAY + 0.3 && !back) {
    const k = 1 - prog(t, AWAY + 0.3, AWAY + 0.7)
    beam(x, t, K, CORNER[0], CORNER[1] + 120, k, { mood: t > 7.4 && t < 9.1 ? 'wide' : 'sleepy', look: [-1, 0] })
    // the force-field bubble around the corner
    x.save(); x.globalAlpha = 0.35; x.strokeStyle = '#7fe3ff'; x.lineWidth = 6; x.setLineDash([16, 12]); x.lineDashOffset = -t * 40; x.beginPath(); x.arc(CORNER[0], CORNER[1] + 100, 150, 0, Math.PI * 2); x.stroke(); x.restore()
  }
  if (back) beam(x, t, K, BENCH[0] - 80, 1170, 1 - prog(t, BACK, BACK + 0.5), { mood: t > 17.0 ? 'happy' : 'neutral', look: [1, 0], hops: [15.9, 17.0] })
  sticker(x, t, 'AUTO-REPLY: "need space."', 540, 650, 4.5, 7.2, { col: '#7fe3ff', size: 36, rot: -0.04 })
  // the partner's phone: last seen
  const pk = pop01(t, 5.2, 0.25, 2.2) * outK(t, [7.2, 7.4])
  if (pk > 0.01) { x.save(); x.translate(470, 900); x.scale(pk, pk); box(x, -170, -40, 340, 80, '#f4f0fa', { b: 5 }); label(x, 'last seen 3 hours ago', 0, 2, { size: 26, col: INK, font: INTER, weight: 800 }); x.restore() }
  bubble(x, t, 470, 1000, 3.2, AWAY + 0.4, 'i really like you', { size: 30, col: '#ffd8e0' })
  bubble(x, t, 330, 880, 15.9, 18.4, 'i need an hour to recharge. then dinner?', { size: 30, maxW: 420 })
  bubble(x, t, 560, 1010, 17.0, 20.4, 'deal.', { size: 34, col: '#ffd8e0' })
  if (t > 17.0) hearts(x, t, 17.0, 370, 1040, { n: 6 })
  // a one-hour timer
  if (back) { const k = pop01(t, 16.3, 0.3, 2.4); x.save(); x.translate(860, 700); x.scale(k, k); box(x, -90, -40, 180, 80, '#2f9a6e', { b: 4 }); label(x, '1 HOUR', 0, 2, { size: 32, col: BONE, font: INTER, weight: 900 }); x.restore() }
}

const F = makeGlitch({
  id: 'klge11', sign: 'aquarius', len: 21, ending: 'loop',
  hook: 'AQUARIUS.EXE disconnected. *No reason given.*', hookSize: 78,
  err: { msg: ['Closeness detected.', 'Auto-reply: "need space."'], out: 2.75 },
  notResp: [[-1, 2.7], [7.4, 9.0]],
  hits: [{ kind: 'whip', at: 0.5, x: 300, y: 1100, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: AWAY, dur: 0.4, g: 0.6 }, { kind: 'glitch', at: 7.4, dur: 0.45 }, { kind: 'flash', at: BACK, col: '#7fe3ff' }],
  caps: [{ at: 3.0, out: 7.2, text: 'the glitch: *vanishing* when someone gets close' }],
  errs: [{ at: 7.4, out: 9.0, msg: ['SIGNAL LOST.', 'Partner: confused.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.1, out: 11.0, text: 'where did they GO *sob*', tears: 3 }],
  stars: [{ t: 11.15, text: 'space is healthy. just say *how long.*' }],
  box: { close: 13.6 },
  patch: { at: 13.6, ver: '1.11', name: 'SAY IT: "I NEED AN HOUR."', dur: 1.0, out: 15.4 },
  last: { at: 18.6, text: 'Space is fine. *Say how long.*' },
  scene, accent: '#2a8ab0',
  cues: [['swell', AWAY, AWAY + 0.5, { gain: 0.04 }], ['swell', BACK, BACK + 0.5, { gain: 0.04 }], ['pop', 3.2, 783.99, 0.04, 0.3], ['pop', 4.5, 1046.5, 0.04, 0], ['pop', 5.2, 659.25, 0.035, 0], ['pop', 15.9, 880, 0.04, -0.3], ['bell', 17.0, 1318.51, 0.04, 1, 0]],
  music: { style: 'chiptune', key: 'Cm', seed: 1811, drop: 3.0, breakdown: [9.1], lift: [BACK] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
