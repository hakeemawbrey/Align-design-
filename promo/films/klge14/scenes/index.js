// klge14 · Your Sign's Love Glitch · "Scorpio.exe: Waiting to Be Sure" (22 s vertical, star_advice post, hard cut).
//   0.0   frame 0: SCORPIO.EXE: 99%. Won't say it. Scorpio mid-hover over SEND on a draft that says "i like you", the
//         certainty bar frozen at 99 %. 0.5 whip onto the bar.
//   3.0   the glitch: waiting to be 100 % sure. The weeks flip (WEEK 1 → 6), the bar jitters at 99 %.
//   6.2   the crush heads for the door: "guess they're not into me…"   7.6 error: CERTAINTY 99 %.
//   9.3   Pisces pops out of the tray, crying.   11.3 THE STARS: "nobody gets 100%. being *brave* is the patch."
//   13.9  patch 1.14 installs.   15.8 SEND. The bar jumps to 100 %. The crush, at the door: "WAIT. me too."
//   19.6  last line "Say *I like you* first.", held to the cut at 22.0.
import { makeGlitch, R, box, label, bubble, progressBar, hearts, sparkles, confetti, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const SEND = 15.8
const weekAt = t => t < 3.2 ? 1 : Math.min(6, 1 + Math.floor((t - 3.2) / 0.55))
function draft(x, t) {
  const sent = t >= SEND
  box(x, 110, 610, 520, 300, '#f4f0fa', { b: 6 }); R(x, '#8a1f3a', 110, 610, 520, 50)
  label(x, sent ? 'to JULES · sent ✓' : 'to JULES · draft', 130, 636, { size: 22, align: 'left', col: BONE })
  label(x, 'i like you.', 370, 730, { size: 60, col: INK, font: INTER, weight: 900 })
  const v = sent ? lerp(0.99, 1, prog(t, SEND, SEND + 0.2)) : 0.99
  progressBar(x, 140, 790, 460, v, { h: 46, col: sent ? GOLD : '#ff9aa8', text: sent ? 'CERTAINTY: 100%' : 'CERTAINTY: 99%', size: 24 })
  // the SEND button + Scorpio's hovering tip
  const press = t >= SEND - 0.1 && t < SEND + 0.2
  box(x, 450, 850, 150, 48, sent ? '#2f9a6e' : press ? '#3a2fa0' : '#5b4bd6', { b: 4 }); label(x, sent ? 'SENT' : 'SEND', 525, 875, { size: 24, col: BONE })
}
function door(x, t) {
  box(x, 820, 900, 160, 380, '#6a4a3a', { b: 6 }); R(x, '#f2c75c', 950, 1090, 14, 14)
  box(x, 836, 860, 128, 34, '#e8344e', { b: 3 }); label(x, 'EXIT', 900, 878, { size: 22, col: BONE })
}

function scene(x, t, K) {
  R(x, '#170f30', 70, 556, 940, 880); R(x, '#241a40', 70, 1300, 940, 136)
  // the week calendar
  box(x, 690, 620, 260, 200, '#f4f0fa', { b: 5 }); R(x, '#8a1f3a', 690, 620, 260, 46); label(x, 'WEEK', 820, 643, { size: 24, col: BONE })
  label(x, String(weekAt(t)), 820, 750, { size: 100, col: INK, font: INTER, weight: 900 })
  door(x, t)
  draft(x, t)
  // the crush (Libra star) drifting toward the door, then turning back
  const leave = t < 6.2 ? 0 : t < SEND + 0.5 ? ease.inOutQuad(prog(t, 6.2, 9.0)) : 1
  const back = t >= SEND + 0.5
  K.star(x, t, 'libra', lerp(620, 760, leave) - (back ? ease.outCubic(prog(t, SEND + 0.5, SEND + 1.0)) * 120 : 0), 1210, 230, { mood: back ? (t > 16.8 ? 'heart' : 'wide') : t > 6.2 ? 'neutral' : 'happy', look: back ? [-1, 0] : t > 6.2 ? [1, 0] : [-1, 0], seed: 4, hops: [16.8, 17.3] })
  // Scorpio, hovering
  const sent = t >= SEND
  K.hero(x, t, 300, 1180, 260, { mood: sent ? (t > 16.8 ? 'heart' : 'wide') : t > 7.6 && t < 9.3 ? 'wide' : 'squint', look: sent ? [1, 0] : [1, -1], squash: sent ? -0.06 : 0.04, hops: [SEND, 16.8] })
  // sweat drops while waiting
  if (!sent && Math.floor(t * 2) % 2) { R(x, '#8fd8ff', 410, 1040, 12, 18); R(x, '#8fd8ff', 404, 1058, 24, 12) }
  bubble(x, t, 680, 1000, 6.2, 9.2, 'guess they’re not into me…', { size: 28, col: '#f8d8f4', maxW: 360 })
  bubble(x, t, 640, 1000, 16.8, 19.4, 'WAIT. me too.', { size: 36, col: '#f8d8f4' })
  if (sent) { sparkles(x, t, 370, 815, SEND + 0.1, 12, 160, 1); confetti(x, t, 16.8, 540, 900) }
  if (t > 16.8) hearts(x, t, 16.8, 460, 1050, { n: 6 })
}

const F = makeGlitch({
  id: 'klge14', sign: 'scorpio', len: 22, ending: 'cut',
  hook: 'SCORPIO.EXE: 99%. *Won’t say it.*',
  err: { msg: ['Draft: "i like you."', 'Certainty: 99%. Sent: no.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 370, y: 800, z: 0.4, hold: 0.5 }, { kind: 'glitch', at: 7.6, dur: 0.45 }, { kind: 'flash', at: SEND, col: GOLD }, { kind: 'shake', at: 16.8, dur: 0.4, amp: 14 }],
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: waiting to be *100%* sure' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['CERTAINTY: 99%.', 'Waiting for: 100% (never).'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.3, out: 11.2, text: 'JUST SAY IT *sob*', tears: 3 }],
  stars: [{ t: 11.35, text: 'nobody gets 100%. being *brave* is the patch.' }],
  box: { close: 13.9 },
  patch: { at: 13.9, ver: '1.14', name: 'GO FIRST. GENTLY.', dur: 1.0, out: 15.7 },
  last: { at: 19.6, text: 'Say *I like you* first.' },
  scene, accent: '#8a1f3a',
  cues: [...[3.75, 4.3, 4.85, 5.4, 5.95].map(t => ['tick', t, 0.05]), ['pop', SEND, 987.77, 0.06, 0], ['bell', SEND + 0.2, 1567.98, 0.05, 1.2, 0], ['tom', 16.8, 110, { gain: 0.2 }], ['glitter', 16.8, 17.8]],
  music: { style: 'cinematic', key: 'Dm', seed: 1814, drop: 3.0, breakdown: [9.3], lift: [SEND] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
