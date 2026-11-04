// ngwe27 · Your Star Guide: Winter · ♎ Libra, winter note 3 / 4: the small gift (20 s; story 0–15.6, then the end card)
//   0.00  "Libra, the gift you secretly want."  A wrapped box wobbles in front of Libra, who leans in, squinting.
//   3.0   ♎ YOUR STAR: "you choose for everyone, all year long."  Libra's bubbles: "pasta?" "tacos?" "you pick!" "no, YOU pick!"
//   5.6   The lid flies off; a note rises out: "I PICKED THE PLACE. JUST SHOW UP."
//   6.6   "the gift? someone else deciding, with love."  Libra melts (a big squash and heart eyes).
//  10.68  card flip · "Let someone | pick for you."  Libra holds the note, totally relaxed. Pisces: happy fountains.
import { winterGuide, giftBox, paperNote, prog, ease, lerp, clamp, INK, PINK, GOLD, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const T0 = { b: [3.6, 4.3, 5.0], open: 5.6, rise: [5.7, 6.4], melt: 8.1 }
const BUB = ['pasta?', 'tacos?', 'you pick!']

const F = winterGuide({
  sign: 'libra', note: 3, duration: 20,
  hook: '*Libra,* the gift | you secretly want.',
  lines: [
    { t: 3.0, text: 'you choose for *everyone,* all year long.' },
    { t: 6.6, text: 'the gift? someone *else* deciding, with love.' },
  ],
  fact: 'LIBRA IS RULED BY VENUS', factAt: 8.6, factDur: 1.8,
  last: 'Let *someone* | pick for you.',
  guide(t) {
    const melt = t > T0.melt && t < T0.melt + 0.8 ? 0.22 * Math.sin(Math.PI * prog(t, T0.melt, T0.melt + 0.8)) : 0
    const mood = t < T0.open ? (t < 3 ? 'squint' : 'wide') : t < T0.melt ? 'sparkle' : 'heart'
    return { x: 540, y: 1130, size: 290, mood: t > 10.68 ? 'happy' : mood, look: t < T0.open ? [0, -1] : [0, -1], squash: melt + (t < 2.8 ? 0.04 * Math.sin(t * 8) : 0), lanternSize: 76 }
  },
  drawMid(x, t, K) {
    const o = K.outAll(t)
    // the gift: wobbles on frame 0, the lid flies at 5.6, then it sinks away under the note
    const gone = ease.inCubic(prog(t, 9.6, 10.4))
    if (gone < 1) {
      x.save(); x.globalAlpha *= o * (1 - gone)
      giftBox(x, 540, 800 + gone * 60, 230, t, { color: '#e163d6', ribbon: GOLD, open: prog(t, T0.open, T0.open + 0.7) * 1.3, wobble: t < T0.open ? (t < 2.8 ? 1 : 0.5) : 0 })
      x.restore()
    }
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    // Libra's indecision bubbles
    T0.b.forEach((b, i) => {
      const k = K.pop01(t, b, 0.3, 2.4) * (1 - ease.inCubic(prog(t, T0.open - 0.2, T0.open + 0.1)))
      if (t > b) K.bubble([290, 790, 290][i], [1000, 980, 760][i], BUB[i], { size: 40, k, tail: 'down' })
    })
    K.burst(540, 700, 90, t, T0.open, { word: 'POP!', size: 40 })
    // the note rises out of the box
    if (t > T0.rise[0]) {
      const p = ease.outBack(prog(t, ...T0.rise))
      const late = t > 10.68
      const y = late ? 720 : lerp(780, 600, p)
      paperNote(x, 540, y, 470, 200, ['I picked the place.', 'Just show up.'], { k: p * o, rot: -0.04 + 0.02 * Math.sin(t * 2), size: 46, kicker: 'FOR LIBRA ♡', reveal: prog(t, T0.rise[0] + 0.2, T0.rise[1] + 0.6) })
    }
    heartsUp(x, t, 540, 950, T0.melt, { n: 3, c: 7 })
    heartsUp(x, t, 540, 960, 11.6, { n: 3, c: 6 })
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.6, 0.03], ['tick', 1.4, 0.03], ['tick', 1.7, 0.03],
    ...T0.b.map((b, i) => ['pop', b, [880, 987.77, 1174.66][i], 0.04, (i - 1) * 0.3]),
    ['boom', T0.open, 0.12], ['pop', T0.open, 1318.51, 0.05, 0], ['glitter', T0.open + 0.05, T0.open + 0.6],
    ['pluck', T0.rise[1], 1567.98, 0.04, 0.8, 0],
    ['whoosh', T0.melt, 0.5, 0.03], ['pluck', T0.melt + 0.2, 1174.66, 0.04, 0.8, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
