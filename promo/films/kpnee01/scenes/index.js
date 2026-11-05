// kpnee01: PLANET TALK: NEPTUNE, "Neptune to Aries: The Two-Day Soulmate" (24 s vertical, star_talk, synthwave · E).
// Hard cut. The engine lives in ./nepkit.js (shared by kpnee01–12).
//   0.00  frame 0: Neptune mid-crash through a cinema screen, popcorn flying, Aries mid-gasp. "ARIES. Pause the *montage.*"
//   0.55  whip zoom · 1.0 record scratch: "met them *Tuesday.*" / it's thursday.
//   2.6   Aries' wedding board ("THE ONE", venue ideas) · "they're *the one.* we've met twice." · Pisces sobs at it
//   5.9   Neptune: "a whirlwind romance? I *love* it."
//   8.6   the screen: ACT I · ACT II · ACT III. "but even my favourite films have a *second act.*" · the lens line
//  15.2   Aries: "can we skip to the *ending?*" · Neptune: "the middle's the best bit. *get to know them.*"
//  22.6   the clapper snaps ACT II: "Fine. Act two starts *now.*" (held 1.4 s, hard cut).
import { episode, P, pisSeat, drawSpace, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, NEP, ROSE, INTER, MONO } from '../../kpnee01/scenes/nepkit.js'

const T = { rec: 1.0, board: 2.6, nep1: 5.9, act: 8.6, skip: 15.2, end: 22.6 }
const D = 24

function cinema(x, t, { crack = 1 } = {}) {
  drawSpace(x, t, { planet: 'neptune', seed: 2 })
  // seat rows
  for (let r = 0; r < 3; r++) for (let i = 0; i < 9; i++) {
    const cx = 60 + i * 120 + (r % 2) * 60, cy = 1640 + r * 110
    P.box(x, cx, cy, 104, 120, r === 0 ? '#7a1430' : '#5c0f25', { r: 22, lw: 6, shadow: false })
  }
  P.screen(x, 540, 760, 900, 640, sx => {
    const g = sx.createLinearGradient(0, 440, 0, 1080); g.addColorStop(0, '#ffd2e4'); g.addColorStop(1, '#9fc0ff'); sx.fillStyle = g; sx.fillRect(90, 440, 900, 640)
    P.heart(sx, 540, 760, 120, '#ff6f9f', { alpha: 0.5 })
  }, { crack, curtain: 0.15 })
}

function board(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 820); x.scale(k * 0.88, k * 0.88); x.rotate(-0.02)
  P.box(x, 0, 0, 820, 560, '#b07a4a', { r: 18, lw: 10 })
  x.fillStyle = 'rgba(0,0,0,0.12)'; for (let i = 0; i < 60; i++) x.fillRect(((i * 137) % 780) - 390, ((i * 71) % 520) - 260, 6, 6)
  // polaroid
  x.save(); x.translate(-230, -40); x.rotate(-0.08)
  x.fillStyle = BONE; x.fillRect(-120, -140, 240, 290); x.fillStyle = '#2a1f55'; x.fillRect(-100, -120, 200, 200)
  P.txt(x, '?', 0, -20, { size: 120, color: GOLD }); P.mono(x, 'TUE ♥', 0, 120, { color: INK, size: 30 })
  x.restore()
  P.heart(x, -230, -190, 26, '#e04a5f')
  // THE ONE
  P.txt(x, 'THE *ONE*', 150, -160, { size: 70, color: '#e04a5f', accentColor: '#e04a5f', shadow: false })
  // venue brochure
  x.save(); x.translate(160, 40); x.rotate(0.06)
  x.fillStyle = '#f4f0ff'; x.fillRect(-150, -70, 300, 140); P.mono(x, 'VENUE IDEAS', 0, -30, { color: INK, size: 28 })
  for (let i = 0; i < 3; i++) { x.fillStyle = ['#ffd2e4', '#c9e0ff', '#fff1b8'][i]; x.fillRect(-130 + i * 90, 0, 80, 54) }
  x.restore()
  // calendar
  x.save(); x.translate(130, 190); x.rotate(-0.04)
  x.fillStyle = BONE; x.fillRect(-190, -50, 380, 100)
  P.mono(x, 'TUE: met · THU: forever?', 0, 0, { color: INK, size: 26 })
  x.restore()
  for (const [px, py] of [[-230, -170], [150, -40], [130, 150]]) { x.fillStyle = '#e04a5f'; x.beginPath(); x.arc(px, py, 10, 0, Math.PI * 2); x.fill() }
  x.restore()
}

function acts(x, t, k) {
  P.screen(x, 540, 830, 940, 480, sx => {
    sx.fillStyle = '#1d1640'; sx.fillRect(70, 590, 940, 480)
    const L = [['ACT I', 'meet'], ['ACT II', 'get to know'], ['ACT III', '♥']]
    L.forEach(([a, b], i) => {
      const cx = 255 + i * 285, on = i === 1 && t > T.act + 1.6
      const kk = pop01(t, T.act + 0.3 + i * 0.25, 0.3)
      P.box(sx, cx, 830, 250 * kk, 320 * kk, on ? GOLD : '#efe6ff', { r: 20, lw: 7 })
      if (kk > 0.6) { P.mono(sx, a, cx, 750, { color: INK, size: 34 }); P.txt(sx, b, cx, 850, { size: 40, color: INK, shadow: false, maxW: 240 }) }
    })
    if (t > T.act + 1.6) { const p = pop01(t, T.act + 1.6, 0.35); sx.save(); sx.strokeStyle = '#ff3b3b'; sx.lineWidth = 9; sx.beginPath(); sx.ellipse(540, 830, 170 * p, 210 * p, 0, 0, Math.PI * 2); sx.stroke(); sx.restore() }
  }, { curtain: 0 })
}

function clapper(x, t) {
  const k = pop01(t, T.end - 0.1, 0.3, 2), snap = ease.outBack ? 0 : 0
  if (k <= 0.01) return
  const open = 1 - ease.inCubic(prog(t, T.end + 0.05, T.end + 0.2))
  x.save(); x.translate(540, 700); x.scale(k, k); x.rotate(-0.06)
  P.box(x, 0, 60, 520, 300, '#15112e', { r: 10, lw: 8 })
  P.txt(x, 'ACT *II*', 0, 50, { size: 96, color: BONE })
  P.mono(x, 'TAKE 1 · ARIES', 0, 160, { color: GOLD, size: 30 })
  x.save(); x.translate(-260, -90); x.rotate(-0.5 * open)
  x.fillStyle = BONE; x.fillRect(0, -40, 520, 60); x.fillStyle = INK; for (let i = 0; i < 6; i++) { x.save(); x.translate(20 + i * 90, -10); x.transform(1, 0, -0.6, 1, 0, 0); x.fillRect(0, -30, 44, 60); x.restore() }
  x.lineWidth = 8; x.strokeStyle = INK; x.strokeRect(0, -40, 520, 60)
  x.restore()
  x.restore()
  P.sparkle(x, t, T.end + 0.2, 540, 700, { n: 14, dist: 380, col: GOLD })
}

const STACK_N = { x: 540, y: 820, size: 470 }, STACK_S = { x: 540, y: 1420, size: 300 }
const E = episode({
  sign: 'aries', duration: D, ending: 'cut',
  entrance: { kind: 'burst', at: -0.4, x: 540, y: 860, size: 520 },
  hook: { text: 'ARIES. | Pause the *montage.*', out: [2.35, 2.55], size: 116 },
  fx: [{ kind: 'whip', at: 0.55 }, { kind: 'rec', at: T.rec, len: 1.35, caption: 'met them *Tuesday.*', sub: 'it is now thursday.' }],
  caps: [{ at: T.end, text: 'Fine. Act two | starts *now.*', top: 1430, size: 100 }],
  cry: [[0, 2], [3.3, 3], [6.4, 2], [10.4, 3], [12.5, 2], [18.6, 3], [T.end + 0.2, 3]],
  shots: [
    { a: -1, b: T.board, bg: (x, t) => { cinema(x, t, { crack: clamp((t + 0.1) * 4) }); P.popcorn(x, t, -0.3, 540, 1500, { n: 30 }); P.speed(x, t, 540, 760, { a: 1 - prog(t, 0.3, 0.9) }) },
      nep: { x: 540, y: 860, size: 520, mood: 'wide' }, sign: { x: 540, y: 1430, size: 300, mood: 'wide', look: [0, -1] } },
    { a: T.board, b: T.act, bg: (x, t, S) => { drawSpace(x, t, { planet: 'neptune', seed: 4 }); board(x, t, pop01(t, T.board, 0.4)); P.hearts(x, t, T.board + 0.4, 540, 1100, { n: 8, spread: 700 }) },
      nep: { x: 170, y: 1170, size: 260, mood: [[0, 'love']] }, sign: { x: 640, y: 1350, size: 310, mood: [[0, 'heart'], [T.nep1, 'happy']], look: [0, -1] } },
    { a: T.act, b: T.skip, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 5 }); acts(x, t) },
      nep: { x: 300, y: 1260, size: 380, mood: [[0, 'happy'], [T.act + 3.4, 'love']] }, sign: { x: 800, y: 1370, size: 270, mood: [[0, 'neutral'], [T.act + 1.7, 'squint']], look: [-1, -0.4] } },
    { a: T.skip, b: T.end, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 6 }); P.filmEdge(x, t, { alpha: 0.7 }) },
      nep: { ...STACK_N, mood: [[0, 'wide'], [T.skip + 2.6, 'happy']], glasses: false }, sign: { ...STACK_S, mood: [[0, 'wink'], [T.skip + 2.5, 'squint'], [T.skip + 5.5, 'happy']], look: [0, -1] } },
    { a: T.end, b: D + 1, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 7 }); clapper(x, t) },
      nep: { x: 200, y: 560, size: 250, mood: 'happy' }, sign: { x: 540, y: 1130, size: 260, mood: 'happy', look: [0, 0] } },
  ],
  lines: [
    { t0: T.board + 0.15, t1: T.nep1 - 0.25, who: 'aries', text: "they're *the one.* we've met twice.", x: 600, y: 1700, tailUp: true, tail: 0 },
    { t0: T.nep1, t1: T.act - 0.2, who: 'neptune', text: 'a whirlwind romance? I *love* it.', x: 470, y: 1640, tailUp: true, tail: -200 },
    { t0: T.act + 0.6, t1: T.act + 3.6, who: 'neptune', text: 'but even my favourite films have a *second act.*', x: 540, y: 1650, tailUp: true, tail: -200 },
    { t0: T.act + 3.8, t1: T.skip - 0.2, who: 'neptune', text: 'in astrology I rule *dreams.* this one needs a middle.', x: 540, y: 1650, tailUp: true, tail: -200 },
    { t0: T.skip + 0.1, t1: T.skip + 2.5, who: 'aries', text: 'can we skip to the *ending?*', x: 560, y: 1720, tailUp: true, tail: 0 },
    { t0: T.skip + 2.7, t1: T.end - 0.25, who: 'neptune', text: "the middle's the best bit. *get to know them.*", x: 540, y: 1150, tailUp: true, tail: 0 },
  ],
  cues: [['crash', 0.02, { gain: 0.07 }], ['boom', T.end + 0.18, 0.25], ['tick', T.end + 0.18, 0.08], ['whoosh', T.board, 0.4, 0.04], ['whoosh', T.act, 0.4, 0.04], ['whoosh', T.skip, 0.35, 0.035]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
