// klge06 · Your Sign's Love Glitch · "Taurus.exe: Too Comfy" (22 s vertical, star_advice post, hard cut).
//   0.0   frame 0: TAURUS.EXE won't close this tab. Taurus mid-sink into a giant couch under a blanket, snacks
//         stacked; the dialog asks "close this tab?" Taurus: "…maybe later." 0.5 whip onto the couch.
//   3.0   the glitch: staying because it's comfy. The months flip (MAR → JUN → SEP); JUNE's texts pile up
//         ("are we ok?", "you seem far away", "do you still want this?"); Taurus sinks deeper.
//   7.6   error: COMFORT MODE 100 %, happiness not found.   9.3 Pisces pops out of the tray, crying.
//   11.3  THE STARS: "comfortable and happy are *different settings.*"   13.9 patch 1.6 installs.
//   15.8  Taurus climbs out and opens the window: dawn. Texts JUNE "can we talk honestly tonight?" → "yes. i've wanted to."
//   19.6  last line "Comfy isn't the same as *happy.*", held to the cut at 22.0.
import { makeGlitch, R, box, label, phone, meter, hearts, sparkles, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const UP = 15.8
const CHAT = [
  { from: 'JUNE', text: 'are we ok?', at: 3.4 },
  { from: 'JUNE', text: 'you seem far away', at: 4.7 },
  { from: 'JUNE', text: 'do you still want this?', at: 5.9 },
  { from: 'me', text: 'can we talk honestly tonight?', at: 16.6 },
  { from: 'JUNE', text: 'yes. i’ve wanted to.', at: 17.5 },
]
const monthAt = t => t < 3.6 ? 'MAR' : t < 4.8 ? 'JUN' : t < UP ? 'SEP' : 'SEP'

function windowPane(x, t, open) {
  // a real window on the wall: night → dawn when opened
  const X = 120, Y = 610, W = 360, H = 300
  const dawn = open
  const g = x.createLinearGradient(0, Y, 0, Y + H)
  g.addColorStop(0, dawn > 0 ? `rgba(${Math.round(lerp(20, 255, dawn))},${Math.round(lerp(18, 170, dawn))},${Math.round(lerp(50, 120, dawn))},1)` : '#141038')
  g.addColorStop(1, dawn > 0 ? `rgba(${Math.round(lerp(30, 255, dawn))},${Math.round(lerp(24, 220, dawn))},${Math.round(lerp(70, 160, dawn))},1)` : '#221a50')
  box(x, X, Y, W, H, '#000', { b: 8 }); x.fillStyle = g; x.fillRect(X, Y, W, H)
  if (dawn > 0) { x.save(); x.globalAlpha = dawn; x.fillStyle = '#ffe9a8'; x.beginPath(); x.arc(X + W / 2, Y + H - 20, 60, Math.PI, 0); x.fill(); x.restore() }
  // panes swing open
  const sw = open * W / 2
  R(x, INK, X + W / 2 - 4 - sw, Y, 8, H); R(x, INK, X, Y + H / 2 - 4, W, 8)
  if (open > 0) { R(x, '#cfc8e8', X - sw * 0.2, Y, 10, H); R(x, '#cfc8e8', X + W - 10 + sw * 0.2, Y, 10, H) }
  // curtains (blowing when open)
  const blow = open * Math.sin(t * 5) * 18
  R(x, '#6a8a4a', X - 50, Y - 20, 60 + blow, H + 60); R(x, '#6a8a4a', X + W - 10 - blow, Y - 20, 60 + blow, H + 60)
}
function couch(x, t, sink) {
  box(x, 110, 1180, 560, 200, '#8a5a3a', { b: 7 })            // seat
  box(x, 90, 1090, 90, 290, '#7a4a2e', { b: 7 }); box(x, 600, 1090, 90, 290, '#7a4a2e', { b: 7 })
  box(x, 150, 1000, 480, 150, '#9a6a48', { b: 7 })            // back
  void t; void sink
}

function scene(x, t, K) {
  const up = t >= UP
  R(x, up ? '#3a2a48' : '#1e1634', 70, 556, 940, 880)
  if (up) { x.save(); x.globalAlpha = 0.25 * clamp(prog(t, UP, UP + 1)); R(x, '#ffcf8a', 70, 556, 940, 880); x.restore() }
  R(x, '#3a2a40', 70, 1380, 940, 56)
  windowPane(x, t, up ? ease.outCubic(prog(t, UP + 0.4, UP + 1.0)) : 0)
  // the month calendar
  box(x, 520, 640, 140, 150, '#f4f0fa', { b: 5 }); R(x, '#5a8a3a', 520, 640, 140, 40); label(x, '2026', 590, 661, { size: 20, col: BONE }); label(x, monthAt(t), 590, 740, { size: 46, col: INK, font: INTER, weight: 900 })
  couch(x, t, 0)
  const sink = up ? 0 : t < 3 ? 0.55 : lerp(0.55, 1, prog(t, 3, 7.4))
  // Taurus: sinking into the seat (drawn, then the seat front + blanket over it)
  const ty = up ? lerp(1240, 1150, ease.outBack ? ease.outCubic(prog(t, UP, UP + 0.6)) : 1) : 1100 + sink * 70
  const tx = up ? lerp(380, 300, ease.outCubic(prog(t, UP, UP + 0.6))) : 380
  K.hero(x, t, tx, ty, 280, { mood: up ? (t > 17.5 ? 'happy' : 'neutral') : t > 7.6 && t < 9.3 ? 'wide' : 'sleepy', look: up ? [1, -0.3] : [0, 0], squash: up ? -0.04 : 0.12 + sink * 0.06, hops: [UP + 0.1, 16.6, 17.6], zzz: !up })
  if (!up) {
    // the blanket over Taurus + the seat lip
    R(x, INK, 150, 1262, 470, 118); R(x, '#5aa0c8', 156, 1268, 458, 106); for (let i = 0; i < 458; i += 40) R(x, '#7fc0e0', 156 + i, 1268, 20, 106)
    // the snack stack
    const n = Math.min(6, 2 + Math.floor(Math.max(0, t - 3) / 0.8))
    for (let i = 0; i < n; i++) { box(x, 560 - (i % 2) * 14, 1150 - i * 34, 70, 26, '#d9a35a', { b: 3 }); R(x, '#7a4a2a', 572 - (i % 2) * 14, 1158 - i * 34, 10, 8); R(x, '#7a4a2a', 600 - (i % 2) * 14, 1160 - i * 34, 10, 8) }
    meter(x, t, 720, 1180, 70, 180, lerp(0.8, 1.15, prog(t, 0, 7.4)), { title: 'COMFY' })
  } else {
    meter(x, t, 720, 1180, 70, 180, lerp(1.0, 0.6, prog(t, UP, UP + 1)), { title: 'COMFY' })
    if (t > 17.5) { hearts(x, t, 17.5, tx, 1000, { n: 5 }); sparkles(x, t, 300, 760, UP + 0.6, 10, 150, 2, [GOLD, BONE]) }
  }
  phone(x, t, { cx: 850, cy: 880, w: 300, h: 560, title: 'JUNE', lines: CHAT, typing: [17.0, 17.5], size: 26, rot: 0.04, clock: up ? '6:58' : '11:40', accent: '#5a8a3a' })
}

const F = makeGlitch({
  id: 'klge06', sign: 'taurus', len: 22, ending: 'cut',
  hook: 'TAURUS.EXE won’t *close this tab.*',
  err: { msg: ['Close this tab?', 'Taurus: "…maybe later."'], buttons: ['LATER', 'CLOSE'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 380, y: 1150, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.6, dur: 0.45 }, { kind: 'flash', at: UP, col: '#ffd98a' }],
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: staying because it’s *comfy*' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['COMFORT MODE: 100%', 'Happiness: not found.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.3, out: 11.2, text: 'i’m crying into this blanket', tears: 3 }],
  stars: [{ t: 11.35, text: 'comfortable and happy are *different settings.*' }],
  box: { close: 13.9 },
  patch: { at: 13.9, ver: '1.6', name: 'AM I HAPPY, OR JUST USED TO IT?', dur: 1.1, out: 15.7 },
  last: { at: 19.5, text: 'Comfy isn’t the same as *happy.*' },
  scene, accent: '#5a8a3a',
  cues: [['tick', 3.6, 0.05], ['tick', 4.8, 0.05], ['pop', 3.4, 659.25, 0.03, 0.4], ['pop', 4.7, 659.25, 0.03, 0.4], ['pop', 5.9, 659.25, 0.03, 0.4], ['whoosh', UP + 0.4, 0.6, 0.05], ['glitter', UP + 0.5, UP + 1.4], ['pop', 16.6, 880, 0.04, 0.3], ['bell', 17.5, 1318.51, 0.04, 1, 0]],
  music: { style: 'jazzy', key: 'Bb', seed: 1806, drop: 3.0, breakdown: [9.3], lift: [UP] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
