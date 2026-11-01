// trsilentdinner: SILENT REVIEW, "Silent review: a homemade dinner." (20 s vertical, Star Talk Trends §16,
// music: jazzy · F). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (identical in all five).
// ♍ Virgo, the most exacting critic in the sky, reviews a dinner ♉ Taurus cooked. Not one word: captions narrate the face.
//   0.0–2.1    hook: "Silent review: | *a homemade dinner.*" Taurus slides a silver cloche across, a little folded side note
//              tucked by the plate, and ducks behind the desk. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: the lid lifts: steaming noodles. Brows narrow. CC "[ lifts the lid ]" → a pixel ruler slides
//              over the garnish, one brow climbs: "[ measures the garnish ]".
//   5.0–7.9    REACTION 2: a forkful rises. Eyes close. CC "[ first bite ]" → three slow nods: "[ slow, serious nod ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the side note opens: "no onions. you said so once." CC "[ reads the side note ]" →
//              brows tilt, lip wobbles, ONE tear: "[ a single tear ]" → pucker, a "mwah!": "[ chef’s kiss ]".
//   11.4–15.5  THE VERDICT: Plating ★★★★☆ (it's Virgo) · Taste ★★★★★ · Remembering *the onions* · TOTAL 10/10.
//              Top caption: "*Chef's kiss.*"
import { makeSilent, R, box, drawBits, sparkles, label, HEART, ramp, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SERIF, INTER, T, REV } from './silentkit.js'

const B = T.beats
const ACC = '#ffb36a'
const NOTE = { x: 330, y: 1200 }

function plate(x, t, P, S) {
  const g = S.gift
  if (g <= 0) return
  const cx = lerp(250, 590, g), cy = 1160
  // the plate + noodles
  x.save(); x.translate(cx, cy)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.beginPath(); x.ellipse(10, 34, 180, 40, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 18, 178, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#f4efe6'; x.beginPath(); x.ellipse(0, 14, 170, 44, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#d8d0c2'; x.beginPath(); x.ellipse(0, 14, 120, 28, 0, 0, Math.PI * 2); x.fill()
  // a heap of noodles (pixel squiggles)
  for (let i = 0; i < 9; i++) for (let j = 0; j < 4; j++) {
    const px = -96 + i * 24, py = -34 + j * 12 + Math.abs(i - 4) * 6
    R(x, INK, px - 3, py - 3, 26, 14); R(x, j % 2 ? '#f2c75c' : '#ffd97a', px, py, 20, 8)
  }
  R(x, INK, -40, -48, 34, 22); R(x, '#c4402e', -36, -44, 26, 14)        // a tomato
  R(x, INK, 10, -54, 36, 20); R(x, '#4fae6a', 14, -50, 28, 12)          // basil
  x.restore()
  // steam once the lid is off
  const lid = ease.inOutCubic(prog(t, B[0][0] + 0.2, B[0][0] + 0.6))
  if (t > B[0][0] + 0.3 && P.ph !== 'score') for (let k = 0; k < 4; k++) {
    const ph = (t * 0.6 + k / 4) % 1
    x.save(); x.globalAlpha = 0.5 * Math.sin(Math.PI * ph)
    for (let s = 0; s < 5; s++) R(x, BONE, cx - 70 + k * 46 + 10 * Math.sin(ph * 8 + s), cy - 70 - ph * 150 - s * 14, 8, 10)
    x.restore()
  }
  // the cloche: on until reaction 1, then lifts and flies off up-right
  if (lid < 1) {
    const ly = cy - 20 - lid * 260, lx = cx + lid * 520, rot = lid * 0.6
    x.save(); x.translate(lx, ly); x.rotate(rot)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 190, 128, 0, Math.PI, 0); x.fill(); R(x, INK, -196, -6, 392, 18)
    x.fillStyle = '#c7cbe0'; x.beginPath(); x.ellipse(0, 0, 182, 120, 0, Math.PI, 0); x.fill()
    x.fillStyle = '#eef0fb'; R(x, '#eef0fb', -120, -84, 26, 46); R(x, '#a4a9c6', -190, -2, 380, 10)
    box(x, -16, -148, 32, 22, '#c7cbe0', { b: 5 })
    x.restore()
  }
  // the side note, tucked on the left (opens in reaction 3)
  const op = P.ph === 'score' ? 1 : P.i === 2 ? ease.outBack(prog(P.u, 0.25, 0.55)) : 0
  const nx = lerp(250, NOTE.x, g), w = lerp(120, 270, op), h = lerp(70, 128, op)
  x.save(); x.translate(nx, NOTE.y); x.rotate(-0.05)
  box(x, -w / 2, -h / 2, w, h, '#fbf3e2', { b: 5 })
  if (op < 0.4) drawBits(x, HEART, { H: RED }, 0, 0, 4)
  else {
    x.globalAlpha = clamp((op - 0.4) / 0.4)
    x.fillStyle = '#2a2a6a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `italic 500 34px ${SERIF}`
    x.fillText('no onions.', 0, -24); x.font = `italic 500 27px ${SERIF}`; x.fillText('you said so once.', 0, 22)
  }
  x.restore()
  // the Virgo ruler over the garnish (reaction 1)
  if (P.i === 0) {
    const rk = clamp(prog(P.u, 1.35, 1.55)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (rk > 0.01) {
      const rx = lerp(cx - 120, cx - 10, ease.inOutQuad(prog(P.u, 1.5, 2.5)))
      x.save(); x.globalAlpha = rk; x.translate(rx, cy - 74); x.rotate(-0.08)
      box(x, -150, -18, 300, 36, '#ffd23a', { b: 5 })
      for (let i = 0; i <= 14; i++) R(x, INK, -140 + i * 20, -18, 3, i % 5 ? 12 : 22)
      x.restore()
    }
  }
  // the fork (reaction 2): plate → mouth → plate
  if (P.i === 1) {
    const up = ease.inOutCubic(prog(P.u, 0.15, 0.55)) * (1 - ease.inOutCubic(prog(P.u, 0.85, 1.2)))
    if (P.u < 1.25) {
      const fx = lerp(cx + 40, REV.x + 40, up), fy = lerp(cy - 30, 990, up)
      x.save(); x.translate(fx, fy); x.rotate(lerp(0.5, -0.3, up))
      R(x, INK, -7, 0, 14, 150); R(x, '#c7cbe0', -3, 2, 6, 146)
      for (const d of [-14, -5, 4, 13]) { R(x, INK, d - 3, -38, 8, 42); R(x, '#eef0fb', d - 1, -36, 4, 38) }
      if (up > 0.2 && P.u < 0.75) { R(x, INK, -22, -52, 44, 18); R(x, '#ffd97a', -18, -48, 36, 10) }
      x.restore()
    }
  }
  // the chef's kiss (reaction 3)
  if (P.i === 2) {
    const kk = pop01k(t, B[2][0] + 2.35) * (1 - clamp(prog(P.u, 3.2, 3.4)))
    if (kk > 0.01) {
      drawBits(x, ['.LL.LL.', 'LLLLLLL', '.LLLLL.', '..LLL..'], { L: '#ff4f86' }, REV.x + 60 + 50 * kk, 960 - 40 * kk, 9 * kk)
      label(x, 'mwah!', REV.x + 200, 900 - 30 * kk, { size: 54 * kk, col: PINK, font: INTER, weight: 800, rot: 0.15 })
    }
    sparkles(x, t, REV.x + 120, 950, B[2][0] + 2.35, 10, 130, 1, [PINK, GOLD, BONE])
    sparkles(x, t, NOTE.x, NOTE.y, B[2][0] + 0.5, 8, 120, 2, [GOLD, BONE, PINK])
  }
}
const pop01k = (t, t0) => ease.outBack(prog(t, t0, t0 + 0.3))

const EP = makeSilent({
  id: 'trsilentdinner', reviewer: 'virgo', giver: 'taurus', gift: 'a homemade dinner.', accent: ACC,
  hookCC: '[ respectful silence ]', plate: 'VIRGO · CRITIC',
  beats: [
    { cc: [[0.35, '[ lifts the lid ]'], [1.4, '[ measures the *garnish* ]']],
      cues: [['pluck', 0.2, 1567.98, 0.03, 0.6, 0.3], ['whoosh', 0.25, 0.45, 0.035], ['glitter', 0.3, 0.6], ['tick', 1.4, 0.04],
        ['pluck', 1.3, 659.25, 0.04, 0.35, 0], ['pluck', 1.42, 1318.51, 0.035, 0.4, 0],
        ...[1.6, 1.8, 2.0, 2.2, 2.4].map(u => ['tick', u, 0.025])] },
    { cc: [[0.3, '[ first bite ]'], [1.1, '[ slow, serious nod ]']],
      cues: [['whoosh', 0.15, 0.35, 0.025], ['pop', 0.55, 659.25, 0.035, 0], ['tick', 0.62, 0.03],
        ['tom', 1.28, 72, { gain: 0.12, decay: 0.22 }], ['tom', 2.03, 70, { gain: 0.12, decay: 0.22 }], ['tom', 2.78, 68, { gain: 0.12, decay: 0.22 }]] },
    { cc: [[0.4, '[ reads the side note ]'], [1.55, '[ a single tear ]'], [2.3, '[ chef’s *kiss* ]']],
      cues: [['pluck', 0.3, 1174.66, 0.03, 0.5, -0.4], ['glitter', 0.5, 0.8], ['pop', 1.0, 659.25, 0.03, 0],
        ['bell', 1.4, 2637.02, 0.026, 1.8, -0.2], ['pop', 2.35, 1567.98, 0.045, 0.3], ['pop', 2.42, 2093, 0.03, 0.3], ['glitter', 2.35, 2.7]] },
  ],
  face(t, P, f) {
    const u = P.u
    if (P.i === 0) {
      f.look = [0, 1]
      f.brows = { l: ramp(u, 0.5, 0.8, 0, -0.3), r: ramp(u, 1.25, 1.5, -0.3 * clamp(prog(u, 0.5, 0.8)), 1), sl: ramp(u, 0.5, 0.8, 0, -0.7), sr: ramp(u, 0.5, 0.8, 0, -0.5) }
      if (u > 1.5 && u < 2.7) { f.mood = 'squint'; f.look = [lerp(-1, 0.5, prog(u, 1.5, 2.5)), 1] }
      f.mouth = 'flat'
    } else if (P.i === 1) {
      f.look = u < 0.5 ? [0.3, 1] : [0, 0]
      f.mood = u > 0.62 ? 'sleepy' : 'neutral'
      f.mouth = u > 0.45 && u < 0.62 ? 'o' : u > 0.62 && u < 1.1 ? 'wobble' : 'tight'
      f.nod = [{ at: P.t0 + 1.0, n: 3, period: 0.75, amp: 22 }]
      f.brows = { l: 0.25, r: 0.25, sl: 0.4 * clamp(prog(u, 0.62, 0.9)), sr: 0.4 * clamp(prog(u, 0.62, 0.9)) }
      f.blink = undefined
    } else {
      f.look = u < 1.0 ? [-1, 1] : [0, 0]
      if (u > 0.9 && u < 1.15) f.mood = 'wide'
      const touched = ramp(u, 1.05, 1.35, 0, 1)
      f.brows = { l: 0.35 * touched, r: 0.35 * touched, sl: 0.95 * touched, sr: 0.95 * touched }
      f.mouth = u > 2.2 && u < 2.6 ? 'o' : u > 2.6 ? 'smile' : u > 1.1 ? 'wobble' : 'flat'
      if (u > 2.6) f.mood = 'happy'
      f.tear = P.t0 + 1.4
      f.shake = u > 1.1 && u < 2.2 ? 1.5 : 0
      f.blush = u > 1.1 ? 0.75 : 0
      f.hops = [P.t0 + 2.35]
    }
    return f
  },
  desk: plate,
  score: { rows: [['Plating', 4], ['Taste', 5], ['Remembering', '*the onions*']], total: '10/10' },
  last: '*Chef’s kiss.*',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, GOLD]
