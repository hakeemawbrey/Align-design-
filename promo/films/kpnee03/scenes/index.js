// kpnee03: PLANET TALK: NEPTUNE, "Neptune to Gemini: The Stranger on Platform 2" (25 s vertical, star_talk, pop · B). Hard cut.
//   0.00  frame 0: a night train. Neptune mid-pop out of a giant soap bubble on the window; Gemini mid-daydream, a
//         thought cloud already up; the stranger opposite reads. "Gemini. You named | their *dog* already?" · 0.5 whip zoom
//   2.6   the daydream: a cottage, a dog called BISCUIT, matching scarves. "we have a cottage. and a dog. *Biscuit.*"
//   6.1   Neptune: "same. I do this *daily.*" (Pisces sobs at the scarves)
//   9.6   PLATFORM 2: the stranger stands up. "in MY films, this is where you *say hi.*" · "out loud?? to a *real person?*"
//  16.8   Gemini: "hi." · the stranger: "hi! nice scarf." · hearts
//  22.8   "Ten out of ten. *Best* film." Neptune holds up a 10/10 card. Hard cut.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE, NEP } from '../../kpnee01/scenes/nepkit.js'

const D = 25
const T = { dream: 2.6, nep1: 6.1, stop: 9.6, hi: 16.8, end: 22.8 }
const STRANGER = '#b9b0d8'

function train(x, t, { platform = 0, sign = true } = {}) {
  drawSpace(x, t, { planet: 'neptune', seed: 31 })
  // the window band with city lights streaming past (they slow down at the platform)
  const v = lerp(900, 0, ease.outCubic(clamp(platform)))
  const off = platform > 0 ? 900 * 9.6 + (t - 9.6) * v * 0.5 : t * 900
  x.fillStyle = INK; x.fillRect(0, 380, 1080, 640)
  x.fillStyle = '#120d30'; x.fillRect(30, 410, 1020, 580)
  for (let i = 0; i < 28; i++) {
    const px = ((i * 197 - off) % 1300 + 1300) % 1300 - 110, py = 470 + (i * 53) % 480
    x.fillStyle = ['#ffd98a', '#9fc0ff', '#ff8fb1'][i % 3]; x.globalAlpha = 0.8; x.fillRect(px, py, platform > 0.8 ? 18 : 60, 14); x.globalAlpha = 1
  }
  for (const wx of [360, 720]) { x.fillStyle = INK; x.fillRect(wx - 10, 380, 20, 640) }
  if (platform > 0 && sign) {
    const k = pop01(platform, 0.2, 0.2)
    x.save(); x.translate(470, 470); x.scale(k, k)
    P.box(x, 0, 0, 460, 110, '#1e5bd8', { r: 12, lw: 8 }); P.txt(x, 'PLATFORM 2', 0, -24, { size: 60, color: BONE, shadow: false })
    x.restore()
  }
  // floor + seats
  x.fillStyle = '#2a1d4a'; x.fillRect(0, 1020, 1080, 900)
  P.box(x, 200, 1560, 340, 260, '#3d6fd8', { r: 30, lw: 8, shadow: false }); P.box(x, 880, 1560, 340, 260, '#3d6fd8', { r: 30, lw: 8, shadow: false })
  x.fillStyle = '#4a3a78'; x.fillRect(0, 1700, 1080, 220)
}
function soap(x, t) {
  const p = prog(t, -0.6, 0.25)
  if (p >= 1) return
  x.save(); x.strokeStyle = `rgba(200,230,255,${0.9 * (1 - p)})`; x.lineWidth = 12
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r = 300 + p * 220; x.beginPath(); x.arc(540, 700, r, a, a + 0.35); x.stroke() }
  x.restore()
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, r = 320 + p * 360; x.fillStyle = 'rgba(220,240,255,0.8)'; x.beginPath(); x.arc(540 + Math.cos(a) * r, 700 + Math.sin(a) * r, 14 * (1 - p), 0, Math.PI * 2); x.fill() }
}
function dream(x, w, h, t) {
  // inside the cloud: sky, a cottage, the dog, two scarves
  const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#ffd2e4'); g.addColorStop(1, '#c9e0ff'); x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#7fc27f'; x.fillRect(-w / 2, h * 0.18, w, h)
  // cottage
  x.fillStyle = '#fff1d6'; x.fillRect(-250, -60, 220, 170); x.fillStyle = '#d0574f'; x.beginPath(); x.moveTo(-270, -60); x.lineTo(-140, -170); x.lineTo(-10, -60); x.closePath(); x.fill()
  x.fillStyle = '#8a5a3a'; x.fillRect(-160, 30, 50, 80); x.fillStyle = '#9fc0ff'; x.fillRect(-230, -30, 50, 44)
  // the dog
  x.save(); x.translate(90, 90 + Math.abs(Math.sin(t * 6)) * -10)
  x.fillStyle = '#c98b52'; x.beginPath(); x.ellipse(0, 0, 70, 44, 0, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(70, -36, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#8a5a3a'; x.beginPath(); x.ellipse(60, -60, 12, 24, -0.4, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(80, -40, 5, 0, Math.PI * 2); x.fill(); x.fillRect(-40, 30, 12, 30); x.fillRect(30, 30, 12, 30)
  x.restore()
  // scarves
  for (const [sx, c] of [[240, '#e04a5f'], [320, '#e04a5f']]) { x.fillStyle = c; x.fillRect(sx - 16, -60, 32, 140); for (let i = 0; i < 4; i++) { x.fillStyle = BONE; x.fillRect(sx - 16, -40 + i * 34, 32, 10) } }
}
const ST = (t, mood, y = 1430) => ({ x: 220, y, size: 250, mood })

const E = episode({
  sign: 'gemini', duration: D, ending: 'cut',
  entrance: { kind: 'burst', at: -0.45, x: 540, y: 700, size: 420 },
  hook: { text: 'Gemini. You named | their *dog* already?', out: [2.35, 2.55], size: 104 },
  fx: [{ kind: 'whip', at: 0.5 }],
  caps: [{ at: T.end, text: 'Ten out of ten. | *Best* film.', top: 250, size: 104 }],
  cry: [[0, 2], [5.2, 3], [7.5, 2], [12.0, 3], [14.5, 2], [19.2, 3]],
  shots: [
    { a: -1, b: T.dream, bg: (x, t) => { train(x, t); soap(x, t) },
      back: (x, t) => drawSign(x, 'libra', 220, 1430, 250, t, { color: STRANGER, glyph: false, mood: 'neutral', look: [1, 0.6], seed: 7 }),
      front: (x, t) => P.thought(x, 800, 1080, 300, 210, (c, w, h) => { c.scale(0.38, 0.38); dream(c, w / 0.38, h / 0.38, t) }, { from: [800, 1290] }),
      nep: { x: 540, y: 700, size: 420, mood: 'wide' }, sign: { x: 820, y: 1430, size: 270, mood: 'sparkle', look: [-1, -0.4] } },
    { a: T.dream, b: T.stop, bg: (x, t) => train(x, t),
      back: (x, t) => drawSign(x, 'libra', 220, 1430, 250, t, { color: STRANGER, glyph: false, mood: 'neutral', look: [0.6, 0.8], seed: 7 }),
      front: (x, t) => {
        const k = pop01(t, T.dream, 0.4, 1.6)
        P.thought(x, 540, 780, 860, 640, (c, w, h) => dream(c, w, h, t), { k, from: [820, 1290] })
        P.sticker(x, 'the cottage', 330, 560, { k: pop01(t, T.dream + 0.6, 0.3), size: 34, col: BONE })
        P.sticker(x, 'the dog: BISCUIT', 640, 1010, { k: pop01(t, T.dream + 1.6, 0.3), size: 34, col: GOLD, rot: 0.04 })
        P.sticker(x, 'matching scarves', 760, 520, { k: pop01(t, T.dream + 2.6, 0.3), size: 34, col: ROSE, rot: 0.05 })
      },
      nep: { x: 120, y: 1120, size: 200, mood: [[0, 'love'], [T.nep1, 'happy']] }, sign: { x: 840, y: 1430, size: 270, mood: 'love', look: [-1, -0.4] } },
    { a: T.stop, b: T.hi, bg: (x, t) => train(x, t, { platform: prog(t, T.stop, T.stop + 1.2) }),
      back: (x, t) => { const up = ease.inOutCubic(prog(t, T.stop + 0.8, T.stop + 1.4)); drawSign(x, 'libra', 220, lerp(1430, 1300, up), 250, t, { color: STRANGER, glyph: false, mood: 'neutral', look: [1, 0], seed: 7 }) },
      nep: { x: 540, y: 820, size: 330, mood: [[0, 'happy'], [T.stop + 4, 'love']] }, sign: { x: 840, y: 1430, size: 270, mood: [[0, 'wide']], look: [-1, 0], sweat: true } },
    { a: T.hi, b: T.end, bg: (x, t) => train(x, t, { platform: 1 }),
      back: (x, t) => { drawSign(x, 'libra', 300, 1300, 260, t, { color: STRANGER, glyph: false, mood: t > T.hi + 2 ? 'happy' : 'neutral', look: [1, 0], seed: 7, hops: [T.hi + 2.1, T.hi + 2.5] }); P.hearts(x, t, T.hi + 2.4, 540, 1200, { n: 12, spread: 600 }) },
      nep: { x: 860, y: 760, size: 220, mood: [[0, 'love']], tears: [[T.hi + 2.4, 1]] }, sign: { x: 760, y: 1320, size: 270, mood: [[0, 'wide'], [T.hi + 2.2, 'heart']], look: [-1, 0] } },
    { a: T.end, b: D + 1, bg: (x, t) => train(x, t, { platform: 1, sign: false }),
      back: (x, t) => drawSign(x, 'libra', 300, 1300, 260, t, { color: STRANGER, glyph: false, mood: 'happy', look: [1, 0], seed: 7 }),
      front: (x, t, S) => P.sticker(x, '10/10', S.nep.x + 10, S.nep.y + 190, { k: pop01(t, T.end + 0.3, 0.3), size: 64, col: GOLD, rot: -0.08 }),
      nep: { x: 540, y: 820, size: 330, mood: 'proud' }, sign: { x: 760, y: 1320, size: 270, mood: 'heart', look: [-1, 0] } },
  ],
  lines: [
    { t0: T.dream + 0.3, t1: T.nep1 - 0.25, who: 'gemini', text: 'we have a cottage. and a dog. *Biscuit.*', x: 540, y: 1740, tailUp: true, tail: 250 },
    { t0: T.nep1, t1: T.stop - 0.2, who: 'neptune', text: 'same. I do this *daily.*', x: 460, y: 1740, tailUp: true, tail: -250 },
    { t0: T.stop + 1.4, t1: T.stop + 4.4, who: 'neptune', text: 'in MY films, this is where you *say hi.*', x: 540, y: 1100, tailUp: true, tail: 0 },
    { t0: T.stop + 4.6, t1: T.hi - 0.2, who: 'gemini', text: 'out loud?? to a *real person?*', x: 600, y: 1740, tailUp: true, tail: 200 },
    { t0: T.hi + 0.3, t1: T.hi + 2.0, who: 'gemini', text: 'hi.', x: 760, y: 1040, size: 64, tail: 0 },
    { t0: T.hi + 2.1, t1: T.end - 0.2, who: 'the stranger', color: STRANGER, text: 'hi! nice *scarf.*', x: 380, y: 1690, tailUp: true, tail: -100 },
  ],
  cues: [['whoosh', T.dream, 0.4, 0.04], ['glitter', T.dream + 0.2, T.dream + 0.8], ['tapeStop', T.stop, 0.6], ['bell', T.stop + 0.3, 1318.5, 0.04, 1.2, 0], ['bell', T.stop + 0.6, 1046.5, 0.04, 1.2, 0], ['glitter', T.hi + 2.2, T.hi + 3.0], ['pop', T.end + 0.3, 1567.98, 0.05, 0]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
