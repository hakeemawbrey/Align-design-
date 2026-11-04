// naske10 · Ask the Stars, Volume 2, ep 10 · "How do I relax on a date?" (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♑ Capricorn, glasses-squint, reading a date agenda: 7:00 ARRIVE · 7:04 SMALL TALK · 7:09 LAUGH…
//   2.5   CAPRICORN: "you don't need a plan for every minute."  chip ♑ CARDINAL EARTH · RULED BY SATURN
//         the agenda keeps unrolling, down past its feet into the snow.
//   ~5.6  "pick one thing to do. let the rest happen."  It crumples the whole scroll into a ball (SCRUNCH) and tosses it.
//   ~8.4  "the best part is usually unplanned."  A big snowflake drifts down and lands on its tip. Pure delight.
//   box closes → "Plan less. | *Notice* more."  Pisces (left) cries happily.
import { askFilm, drawBits, drawBurst, sparkles, floatHeart, lerp, prog, ease, clamp, pop01, INK, MONO, FLAKE } from '../../naske01/askkit.js'

const ITEMS = ['7:00 ARRIVE', '7:04 SMALL TALK', '7:09 LAUGH (1x)', '7:12 ORDER', '7:15 COMPLIMENT', '7:21 DEEP TALK', '7:30 DESSERT?', '7:31 DECIDE', '7:40 WALK', '7:55 SAY GOODNIGHT']
const SX = 700, SY = 600, SW = 330

const F = askFilm({
  id: 'naske10', sign: 'capricorn',
  question: 'How do I *relax* on a date?',
  qSize: 96,
  lines: ["you don't need a plan for every minute.", 'pick one thing to do. let the rest happen.', 'the best part is usually unplanned.'],
  chip: '♑ CARDINAL EARTH · RULED BY SATURN',
  last: 'Plan less. | *Notice* more.', late: 2,
  hero: { x: 380, y: 1010, size: 340 },
  extraT: T => ({ unroll: [0, T.l[1] - 0.2], crumple: [T.l[1] + 0.3, T.l[1] + 0.75], toss: T.l[1] + 0.9, flake: [T.l[2] - 0.2, T.l[2] + 1.3] }),
  state(t, T) {
    if (t < T.crumple[0]) return { mood: 'squint', look: [1, t < 2 ? -1 : 1] }
    if (t < T.toss + 0.4) return { mood: 'wide', look: [1, 0] }
    if (t < T.flake[1]) return { mood: 'neutral', look: [0, -1] }
    return { mood: 'sparkle', look: [0, -1] }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    const c = ease.inCubic(prog(t, ...T.crumple))
    if (c < 1) {
      // the scroll: grows from 300 px to the snow, then crumples up toward the top roll
      const len = lerp(300, 1240 - SY, ease.inOutCubic(prog(t, ...T.unroll))) * (1 - c)
      x.save(); x.translate(SX, SY); x.rotate(0.04)
      x.fillStyle = INK; x.fillRect(-SW / 2 - 6, -6, SW + 12, len + 12)
      x.fillStyle = '#f5eedf'; x.fillRect(-SW / 2, 0, SW, len)
      x.beginPath(); x.rect(-SW / 2, 0, SW, len); x.clip()
      x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textBaseline = 'top'
      ITEMS.forEach((s, i) => { x.fillText(s, -SW / 2 + 18, 22 + i * 52); x.fillStyle = '#c8283c'; x.fillRect(-SW / 2 + 18, 58 + i * 52, SW - 36, 3); x.fillStyle = INK })
      x.restore()
      // the top roll
      x.fillStyle = INK; x.fillRect(SX - SW / 2 - 18, SY - 22, SW + 36, 34); x.fillStyle = '#d9c9a0'; x.fillRect(SX - SW / 2 - 14, SY - 18, SW + 28, 26)
      // the tip holding it
      x.fillStyle = H.opts.color; x.fillRect(SX - SW / 2 - 50, SY - 14, 40, 18)
    }
    // the paper ball, tossed off to the right
    if (t > T.crumple[1] - 0.05) {
      const p = clamp((t - T.toss) / 0.7)
      const bx = lerp(SX, 1250, p), by = SY + 40 - Math.sin(Math.PI * p) * 260 + p * 200
      if (p < 1) { x.save(); x.translate(bx, by); x.rotate(t * 8 * (p > 0 ? 1 : 0)); x.fillStyle = INK; x.fillRect(-48, -48, 96, 96); x.fillStyle = '#f5eedf'; x.fillRect(-42, -42, 84, 84); x.fillStyle = '#d9c9a0'; x.fillRect(-20, -30, 18, 50); x.fillRect(8, -8, 26, 14); x.restore() }
    }
    drawBurst(x, SX, SY - 90, 90, t, T.crumple[1], { word: 'SCRUNCH', size: 34, life: 0.8 })
    // the snowflake: drifts down and lands on its top tip
    if (t > T.flake[0]) {
      const p = ease.outCubic(prog(t, ...T.flake))
      const fx = lerp(H.x + 160, H.x + 4, p) + Math.sin(t * 2.5) * 30 * (1 - p), fy = lerp(380, H.y - H.size * 0.47, p)
      drawBits(x, FLAKE, { W: '#e9f6ff' }, fx, fy, 20 * ok, { rot: t * (1 - p) })
      sparkles(x, t, fx, fy, T.flake[1], 10, 110, 1, ['#e9f6ff', '#bfe6ff', '#ffffff'])
    }
    floatHeart(x, t, T.h2Land, H.x + 120, H.y - 200)
  },
  cues: T => [
    ['tick', 0.3, 0.02], ['tick', 0.7, 0.02], ['tick', 1.1, 0.02], ['whoosh', 2.0, 1.5, 0.015],
    ['whoosh', T.crumple[0], 0.4, 0.035], ['tick', T.crumple[0] + 0.1, 0.04], ['tick', T.crumple[0] + 0.2, 0.04], ['tick', T.crumple[0] + 0.3, 0.04], ['pop', T.crumple[1], 523.25, 0.04, 0.3],
    ['whoosh', T.toss, 0.5, 0.035],
    ['bell', T.flake[0], 2093, 0.012, 1.2, 0], ['pop', T.flake[1], 1567.98, 0.04, 0], ['glitter', T.flake[1], T.flake[1] + 0.6],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
