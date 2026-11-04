// nmue22: THE MAKE-UP TALK, "Guess kind, then ask" (28 s vertical, promo/films/next30/b32.md, music: jazzy · C).
// ♐ Sagittarius × ♒ Aquarius. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
// Chapter tabs: THE SPIRAL · UNDER IT · THE TALK · MADE UP (the fight starts in Sag's head).
//   0–6.6     "“Where *are* they??”" Sag mid-pace by an unlit light display (7:20 PM, "no new messages"); three worst-case
//             stories pop up: "they forgot me." / "they're bored of me." / "they're…"
//   6.6–12.8  UNDER IT   "The real story: | *a very long line.*" Aquarius runs in, breathless, with two hot drinks from the
//             stand down the path (a long queue of stars behind); Sag's stories pop like bubbles.
//   12.8–21.6 THE TALK   "Your first guess | isn’t *the story.*" TRY SAYING "I got worried. What happened?"
//             Aquarius: "huge line. my phone died. sorry!"
//   21.6–25.5 MADE UP    the light arch switches on bulb by bulb; both laugh. "Guess *kind*, | then ask."
import { makeMakeUp, R, box, ink, label, glow, sparkles, phone, drawStarChar, signStar, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const BULBS = ['#ff5c8a', GOLD, '#7fd0ff', '#9fe6b0', '#ffb347']
function arch(x, t, cx, by, w, h, on = 0) {
  // posts
  box(x, cx - w / 2 - 14, by - h, 28, h, '#4a3a78', { b: 6 }); box(x, cx + w / 2 - 14, by - h, 28, h, '#4a3a78', { b: 6 })
  const n = 18
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (i / (n - 1)) * Math.PI, px = cx + Math.cos(a) * w / 2, py = by - h + Math.sin(a) * h * 0.55
    const lit = i / n < on
    if (lit) glow(x, px, py, 60, 1, ['255,92,138', '242,199,92', '127,208,255', '159,230,176', '255,179,71'][i % 5])
    R(x, INK, px - 13, py - 13, 26, 26); R(x, lit ? BULBS[i % 5] : '#3a3060', px - 8, py - 8, 16, 16)
  }
  if (on <= 0) label(x, 'LIGHTS · 7 PM', cx, by - h - 10, { size: 26, col: '#8a86a8' })
}
function cup(x, cx, cy, col, t) {
  box(x, cx - 22, cy - 30, 44, 56, col, { b: 5 }); R(x, BONE, cx - 22, cy - 18, 44, 10)
  for (let i = 0; i < 2; i++) { const p = (t * 0.9 + i * 0.5) % 1; x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#f4eefc', cx - 8 + i * 10, cy - 50 - p * 40, 8, 12); x.restore() }
}

const EP = makeMakeUp({
  id: 'nmue22', a: 'sagittarius', b: 'aquarius',
  chapters: ['THE SPIRAL', 'UNDER IT', 'THE TALK', 'MADE UP'],
  hook: '“Where *are* they??”', hookColor: '#c9a6ff',
  fight: {
    lines: [['a', 'they forgot me.'], ['a', "they're bored of me."], ['a', "they're…"]],
    bubbleAt: [[300, 640], [760, 760], [330, 880]],
    allSpiky: false,
    noPair: true,
    draw(x, t, S) {
      R(x, '#e9f2ff', 0, 1300, 1080, 24); R(x, 'rgba(233,242,255,0.18)', 0, 1324, 1080, 600)
      arch(x, t, 540, 1300, 760, 560, 0)
      const px = 540 + 260 * Math.sin(t * 1.4)
      S.drawA(x, t, { x: px, y: 1170, s: 250, mood: t > 3.9 ? 'wide' : 'neutral', look: [Math.sign(Math.cos(t * 1.4)), 0], hops: [-0.12, 0.6, 1.3, 2.0, 2.7, 3.4, 4.1, 4.8, 5.5] })
      phone(x, 860, 1480, { w: 170, h: 260, rot: 0.1 }, c => { ink(c, '7:20 PM', 0, -60, { size: 26, font: MONO, col: BONE }); ink(c, 'no new', 0, 0, { size: 22, font: MONO, col: '#8a86a8' }); ink(c, 'messages', 0, 26, { size: 22, font: MONO, col: '#8a86a8' }) })
    },
    pis: { x: 160, y: 1660, s: 120 },
    cues: [['tick', 0.6, 0.03], ['tick', 1.3, 0.03], ['tick', 2.0, 0.03], ['tick', 2.7, 0.03], ['tick', 3.4, 0.03], ['tick', 4.1, 0.03], ['tick', 4.8, 0.03]],
  },
  under: {
    head: 'The real story: | *a very long line.*', color: '#7fd0ff',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      R(x, '#e9f2ff', 0, 1300, 1080, 24); R(x, 'rgba(233,242,255,0.18)', 0, 1324, 1080, 600)
      // the drink stand and its very long queue, far back
      box(x, 760, 560, 260, 160, '#c0392b', { b: 7 }); ink(x, 'HOT DRINKS', 890, 600, { size: 30, col: BONE })
      for (let i = 0; i < 9; i++) drawStarChar(x, 860 - i * 70, 790 + (i % 2) * 10, 70, t, { color: ['#ff8a5a', '#f2c75c', '#ff8fb1', '#9fe6b0', '#c9a6ff'][i % 5], mood: 'sleepy', seed: 30 + i, glow: 0.3, tips: false, zzz: false })
      label(x, '(the line)', 560, 880, { size: 26, col: '#8a86a8' })
      drawA(x, t, { x: 260, y: 1170, s: 240, mood: u > 1.3 ? 'sparkle' : 'wide', look: [1, 0], hops: [S.t0 + 1.4] })
      // Aquarius runs in with two drinks
      const run = ease.outCubic(prog(u, 0.2, 1.3))
      const bx = lerp(1200, 760, run)
      drawB(x, t, { x: bx, y: 1170, s: 240, mood: u > 1.3 ? 'happy' : 'wide', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 0.6, S.t0 + 0.9, S.t0 + 1.2] })
      cup(x, bx - 150, 1170, '#ff8fb1', t); cup(x, bx + 140, 1180, '#9fe6b0', t)
      if (u > 1.2 && u < 3.2) label(x, '*huff huff*', bx, 960, { size: 32, col: BONE })
      // the stories pop
      ;['they forgot me.', "they're bored of me.", "they're…"].forEach((s, i) => {
        const at = 2.0 + i * 0.35, k = 1 - clamp(prog(u, at, at + 0.12))
        const P = [[300, 640], [760, 1010], [330, 520]][i]
        if (k > 0.01 && u > 0) { x.save(); x.globalAlpha = k; label(x, s, P[0], P[1], { size: 32, col: '#c9c4e0', font: INTER, weight: 800 }); x.restore() }
        sparkles(x, t, P[0], P[1], S.t0 + at, 8, 90, i, [BONE, '#c9a6ff'])
      })
    },
    pis: { x: 960, y: 1660, s: 120 },
    cues: [['whoosh', 0.2, 1.0, 0.04], ['pop', 1.3, 880, 0.04, 0.3], ['pop', 2.0, 1318.51, 0.035, -0.3], ['pop', 2.35, 1567.98, 0.035, 0.3], ['pop', 2.7, 1760, 0.035, -0.2]],
  },
  talk: {
    head: 'Your first guess | isn’t *the story.*', color: '#7fd0ff',
    stars: 'before you assume the worst, guess the *kind* reason. then ask.',
    script: 'I got *worried.* What happened?',
    reply: ['b', 'huge line. my phone died. *sorry!*'],
  },
  made: {
    draw(x, t, S) {
      x.save(); x.globalAlpha = S.ok
      R(x, '#e9f2ff', 0, 1300, 1080, 24); R(x, 'rgba(233,242,255,0.18)', 0, 1324, 1080, 600)
      arch(x, t, 540, 1300, 860, 480, clamp(prog(t, S.t0 + 0.4, S.t0 + 1.6)))
      x.restore()
    },
    front(x, t, S) {
      cup(x, 280, 1200, '#ff8fb1', t); cup(x, 800, 1200, '#9fe6b0', t)
      if (t > S.t0 + 1.7) label(x, 'ha!', 400, 860, { size: 44, col: GOLD, font: INTER, weight: 800, rot: -0.1, alpha: S.ok })
      if (t > S.t0 + 1.9) label(x, 'ha!', 690, 880, { size: 44, col: GOLD, font: INTER, weight: 800, rot: 0.1, alpha: S.ok })
      sparkles(x, t, 540, 800, S.t0 + 1.6, 12, 300, 1, [GOLD, BONE, PINK])
    },
    cues: [...Array.from({ length: 9 }, (_, i) => ['pop', +(0.4 + i * 0.13).toFixed(2), [587.33, 659.25, 739.99, 880, 987.77][i % 5] * 2, 0.025, (i / 4 - 1)]), ['bell', 1.6, 1760, 0.035, 1.2, 0], ['pop', 1.7, 1174.66, 0.035, -0.3], ['pop', 1.9, 1318.51, 0.035, 0.3]],
  },
  last: 'Guess *kind*, | then ask.', lastColor: '#c9a6ff',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [signStar, easeOutBack, MINT, pop01]
