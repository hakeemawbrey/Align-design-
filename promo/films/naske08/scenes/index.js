// naske08 · Ask the Stars, Volume 2, ep 8 · "I hold grudges. How do I let go?" (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♏ Scorpio straining to hug a giant snowball tagged "THAT ONE TIME", trembling.
//   2.5   SCORPIO: "holding on feels safe. it's also heavy."  chip ♏ FIXED WATER · MARS (TRAD.) & PLUTO (MODERN)
//   ~5.3  "say what hurt, once, out loud."  A small bubble: "that hurt me." The snowball shrinks a little.
//   ~8.0  "then see if you're ready to set it down."  It sets the snowball down: it shrinks to a pebble, a sprout pops.
//   box closes → "Say it once. | Then *set it down*."  Scorpio, lighter, does a little hop. Pisces (left) cries happily.
import { askFilm, drawSnowball, drawSign, drawBubble, drawBits, sparkles, floatHeart, lerp, prog, ease, clamp, pop01, INK } from '../../naske01/askkit.js'

const SPROUT = ['.L.L.', 'LLLLL', '..S..', '..S..']
const SPROUT_C = { L: '#5fd38a', S: '#2f9a5a' }

const F = askFilm({
  id: 'naske08', sign: 'scorpio',
  question: 'I hold *grudges*. How do I let go?',
  lines: ["holding on feels safe. it's also heavy.", 'say what hurt, once, out loud.', "then see if you're ready to set it down."],
  chip: '♏ FIXED WATER|MARS (TRAD.) & PLUTO (MODERN)',
  chipTop: 1262,
  last: 'Say it once. | Then *set* *it* *down.*', late: 3, lastSize: 100, lastAccent: 136,
  hero: { x: 420, y: 1000, size: 340 },
  extraT: T => ({ say: T.l[1] + 0.9, down: [T.l[2] + 0.5, T.l[2] + 1.1], shrink: [T.l[2] + 1.1, T.l[2] + 1.9] }),
  state(t, T) {
    if (t < T.down[1]) return { mood: t < T.l[1] ? 'squint' : 'neutral', look: [1, 0], squash: 0.07 + 0.03 * Math.sin(t * 40) * (t < T.say ? 1 : 0.4), dx: 3 * Math.sin(t * 50) * (t < T.say ? 1 : 0.3) }
    if (t < T.shrink[1]) return { mood: 'wide', look: [1, 1] }
    return { mood: 'happy' }
  },
  front(x, t, T, H) {
    const ok = H.ok
    if (ok <= 0.01) return
    const d = ease.inOutCubic(prog(t, ...T.down)), s = ease.inCubic(prog(t, ...T.shrink))
    let R = lerp(150, 130, ease.outCubic(prog(t, T.say, T.say + 0.6)))
    R = lerp(R, 22, s)
    const bx = lerp(680, 760, d), by = lerp(985, 1205 - R, d)
    drawSnowball(x, bx + (t < T.down[0] ? 2 * Math.sin(t * 45) : 0), by, R * ok)
    // the tag on its string
    const tk = 1 - prog(t, T.shrink[0], T.shrink[0] + 0.3)
    if (tk > 0.01) {
      x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(bx + R * 0.5, by - R * 0.6); x.lineTo(bx + R * 0.9, by - R - 40); x.stroke()
      drawSign(x, bx + R * 0.9 + 20, by - R - 80, 'THAT ONE\nTIME', { w: 210, size: 30, color: '#e23d66', rot: 0.08, alpha: tk * ok })
    }
    // the sprout beside the pebble
    const sp = pop01(t, T.shrink[1], 0.4, 2.6)
    if (sp > 0.01) drawBits(x, SPROUT, SPROUT_C, bx + 50, 1180, 10 * sp * ok)
    sparkles(x, t, bx, 1170, T.shrink[1], 10, 120, 2)
    // "that hurt me."
    const bk = pop01(t, T.say, 0.32, 2.4) * (1 - prog(t, T.say + 2.0, T.say + 2.3))
    if (bk > 0.01) drawBubble(x, H.x - 40, H.y - 300, 'that hurt me.', { tx: H.x - 10, ty: H.y - 190, size: 44, scale: bk })
    floatHeart(x, t, T.h2Land + 0.1, H.x, H.y - 220)
  },
  cues: T => [
    ['tick', 0.2, 0.02], ['tick', 0.55, 0.02], ['tick', 0.9, 0.02], ['tick', 1.25, 0.02],
    ['pop', T.say, 783.99, 0.035, -0.2],
    ['whoosh', T.down[0], 0.5, 0.03], ['boom', T.down[1], 0.1], ['whoosh', T.shrink[0], 0.7, 0.03],
    ['pop', T.shrink[1], 1318.51, 0.04, 0.3], ['glitter', T.shrink[1], T.shrink[1] + 0.6], ['bell', T.shrink[1] + 0.1, 1567.98, 0.02, 0.9, 0.3],
  ],
})
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
