// naske17 · Ask the Stars, Volume 2, ep 17 · "They're shy. I'm… not." (20 s, star_advice post)
// Story 0–15.6, then the shared end card. The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♌ Leo blasting "HELLO!!" through a pixel megaphone, sound rings flying; across the snow a small
//         star ducks behind a snowman.
//   2.5   LEO: "shy isn't uninterested. it's a pace."  chip ♌ THE LION · RULED BY THE SUN
//   ~3.7  Leo lowers the megaphone and sets it down in the snow.
//   ~5.4  "ask, then wait a beat longer than usual."  Leo waits… then a tiny bubble: "hi."
//   ~8.4  "quiet plans help. a walk beats a party."  The shy star peeks out, then steps out and waves.
//   card cut → "Turn it *down*. | Tune in."  Pisces (left) cries happily.
import { askFilm, crier, drawBits, drawBubble, floatHeart, sparkles, spritePt, lerp, prog, ease, clamp, pop01, INK, LAV } from '../../naske01/askkit.js'

const MEGA = ['......RR', '....RRRR', 'HHRRRRRR', 'HHRRRRRR', '....RRRR', '......RR']
const MEGA_C = { R: '#f2c75c', H: '#c8283c' }
const SNOWMAN = [
  '...KKK...', '..KKKKK..', '...WWW...', '..WWWWW..', '..WEWEW..', '..WWOWW..', '...WWW...',
  '..SSSSS..', '.WWWWWWW.', 'WWWWBWWWW', 'WWWWWWWWW', 'WWWWBWWWW', '.WWWWWWW.', 'WWWWWWWWW', 'WWWWWWWWW', '.WWWWWWW.',
]
const SNOWMAN_C = { K: '#2a2a3a', W: '#f4f8ff', E: '#1b1236', O: '#f39a3a', S: '#c8283c', B: '#2a2a3a' }
const SM = { x: 830, y: 1060 }

const F = askFilm({
  id: 'naske17', sign: 'leo',
  question: "They're shy. I'm… *not*.",
  qSize: 100,
  lines: ["shy isn't uninterested. it's a pace.", 'ask, then wait a beat longer than usual.', 'quiet plans help. a walk beats a party.'],
  chip: '♌ THE LION · RULED BY THE SUN',
  last: 'Turn it *down*. | Tune in.', late: 2,
  hero: { x: 360, y: 1020, size: 330 },
  extraT: T => ({ lower: T.l[0] + 1.2, hi: T.l[1] + 1.6, peek: T.l[1] + 2.4, show: T.l[2] + 0.6 }),
  state(t, T) {
    if (t < T.lower) return { mood: 'wide', look: [1, 0], blink: false, squash: -0.06 + 0.03 * Math.sin(t * 30) }
    if (t < T.hi) return { mood: 'neutral', look: [1, 0], squash: 0.06 }
    return { mood: t < T.show ? 'happy' : 'heart', look: [1, 0] }
  },
  back(x, t, T, H) {
    const ok = H.ok
    // the shy star: hidden behind the snowman (only a tip and an eye), then peeks, then steps out and waves
    const peek = ease.outCubic(prog(t, T.peek, T.peek + 0.5)), step = ease.outBack(prog(t, T.show, T.show + 0.7))
    const sx = SM.x + 115 - peek * 50 - step * 200, sy = 1110 - peek * 20
    crier(x, t, { x: sx, y: sy, size: 170 }, { color: LAV, mood: t < T.peek ? 'neutral' : t < T.show ? 'wide' : 'happy', look: [-1, 0], seed: 8, glow: 0.6, pop: ok, blush: t > T.peek, hops: t > T.show ? [T.show + 0.7, T.show + 1.3, T.h2Land] : null })
    drawBits(x, SNOWMAN, SNOWMAN_C, SM.x, SM.y, 18 * ok)
    // the wave: a little tip flapping above it
    if (t > T.show + 0.6) { const w = Math.sin(t * 10) * 0.5; x.save(); x.translate(sx - 60, sy - 70); x.rotate(-0.6 + w); x.fillStyle = INK; x.fillRect(-10, -60, 20, 60); x.fillStyle = LAV; x.fillRect(-6, -56, 12, 52); x.restore() }
  },
  front(x, t, T, H) {
    const ok = H.ok
    const m = spritePt(H.F, 30, 15)
    const lw = ease.inOutCubic(prog(t, T.lower, T.lower + 0.6))
    drawBits(x, MEGA, MEGA_C, lerp(m.x + 70, H.x + 190, lw), lerp(m.y - 10, 1190, lw), 18 * ok, { rot: lerp(-0.15, 0.3, lw) })
    // the shout + sound rings
    if (t < T.lower) {
      const a = 1 - prog(t, T.lower - 0.3, T.lower)
      x.save(); x.globalAlpha = a; x.strokeStyle = '#ffd34d'; x.lineWidth = 10
      for (let i = 0; i < 3; i++) { const ph = (t * 2.2 + i / 3) % 1; x.globalAlpha = a * (1 - ph); x.beginPath(); x.arc(m.x + 150, m.y - 10, 40 + ph * 220, -0.6, 0.6); x.stroke() }
      x.globalAlpha = a; x.font = "800 96px Inter, sans-serif"; x.textAlign = 'center'; x.lineWidth = 12; x.strokeStyle = INK; x.fillStyle = '#ffd34d'
      const s = 1 + 0.05 * Math.sin(t * 30); x.translate(660, 760); x.scale(s, s); x.rotate(-0.06); x.strokeText('HELLO!!', 0, 0); x.fillText('HELLO!!', 0, 0)
      x.restore()
    }
    // the whispered hi
    const bk = pop01(t, T.hi, 0.3, 2.2) * (1 - prog(t, T.show + 1.2, T.show + 1.5))
    if (bk > 0.01) drawBubble(x, H.x + 120, H.y - 250, 'hi.', { tx: H.x + 70, ty: H.y - 150, size: 54, scale: bk })
    sparkles(x, t, SM.x - 100, 1000, T.show + 0.5, 10, 140, 1)
    floatHeart(x, t, T.show + 0.8, SM.x - 120, 900)
    floatHeart(x, t, T.h2Land, H.x + 40, H.y - 220)
  },
  cues: T => [
    ['pop', 0.02, 659.25, 0.05, 0.2], ['pop', 0.1, 880, 0.045, 0.2], ['pop', 0.5, 659.25, 0.035, 0.2], ['pop', 0.58, 880, 0.03, 0.2], ['whoosh', 0.2, 0.5, 0.03],
    ['whoosh', T.lower, 0.5, 0.025], ['tick', T.lower + 0.6, 0.04],
    ['pop', T.hi, 1174.66, 0.02, 0], ['tick', T.peek, 0.03], ['whoosh', T.show, 0.4, 0.03], ['pop', T.show + 0.7, 1318.51, 0.035, 0.3], ['glitter', T.show + 0.5, T.show + 0.9],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
