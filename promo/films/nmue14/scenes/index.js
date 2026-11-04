// nmue14: THE MAKE-UP TALK, "You vs. the problem" (28 s vertical, promo/films/next30/b32.md, music: funk · E).
// ♉ Taurus × ♊ Gemini. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“This is *your* fault.” | “No, *yours!*”" Taurus and Gemini on opposite sides of a table, a giant
//             holiday TO-DO list unrolling between them: "you booked the wrong train!" / "you SAID Thursday!" /
//             "I said Thursday-ISH!"
//   6.6–12.8  UNDER IT   "Not each other. | *The list.*" The to-do list grows a grumpy pixel face and cackles (HA HA HA)
//             while the two of them argue.
//   12.8–21.6 THE TALK   "Same side | of the *table.*" TRY SAYING "Okay. Us against the train. What's plan B?"
//             Gemini: "plan B: the early bus. I'll pack snacks."
//   21.6–25.5 MADE UP    side by side, they cross items off; the list shrinks and squeaks. "*Us* versus it."
import { makeMakeUp, R, box, ink, label, sparkles, drawBits, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, MINT, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const ITEMS = ['gifts x 9', 'train tix', 'cookies', 'cards', 'wrap stuff', 'pack!!', 'call mom', 'more tape']
function table(x, y = 1250) {
  box(x, 150, y, 780, 40, '#a07850', { b: 7, hi: '#c09868' }); R(x, INK, 200, y + 40, 20, 200); R(x, INK, 860, y + 40, 20, 200)
}
// the to-do list: paper from the top, curling at the bottom; face: 0 none · 1 grumpy · 2 cackle · 3 small squeak
function todo(x, t, cx, top, len, { w = 230, crossed = 0, face = 0, k = 1 } = {}) {
  if (k <= 0.01 || len < 10) return
  x.save(); x.translate(cx, top); x.scale(k, k)
  R(x, INK, -w / 2 - 6, -6, w + 12, len + 12); R(x, '#fff8e6', -w / 2, 0, w, len)
  R(x, '#c0392b', -w / 2, 0, w, 50); ink(x, 'TO-DO', 0, 26, { size: 32, col: BONE })
  ITEMS.forEach((it, i) => {
    const y = 80 + i * 52
    if (y > len - 20) return
    R(x, INK, -w / 2 + 18, y - 12, 22, 22); R(x, '#fff8e6', -w / 2 + 21, y - 9, 16, 16)
    ink(x, it, -w / 2 + 52, y, { size: 26, col: INK, align: 'left', font: MONO, weight: 700 })
    if (i < crossed) { R(x, '#e8344e', -w / 2 + 46, y - 3, w - 66, 6); R(x, MINT, -w / 2 + 22, y - 8, 14, 14) }
  })
  // curl at the bottom
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, len, w / 2 + 6, 28, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#efe2c4'; x.beginPath(); x.ellipse(0, len, w / 2, 22, 0, 0, Math.PI * 2); x.fill()
  if (face) {
    const fy = 560, sh = face === 2 ? 4 * Math.sin(t * 30) : 0
    x.save(); x.translate(sh, fy)
    x.scale(1.4, 1.4)
    {
      R(x, INK, -70, -30, 40, 10); R(x, INK, 30, -30, 40, 10)               // angry brows
      R(x, INK, -60, -14, 24, 24); R(x, INK, 36, -14, 24, 24)
      if (face === 2) { R(x, INK, -50, 30, 100, 40); R(x, '#ff5c6b', -40, 46, 80, 20) } else R(x, INK, -40, 40, 80, 12)
    }
    x.restore()
  }
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue14', a: 'taurus', b: 'gemini',
  hook: '“This is *your* fault.” | “No, *yours!*”', hookColor: '#ffd23a',
  fight: {
    lines: [['a', 'you booked the wrong train!'], ['b', 'you SAID Thursday!'], ['a', 'I said Thursday-ISH!']],
    bubbleAt: [[330, 880], [790, 780], [330, 680]],
    posA: { x: 190, y: 1130, s: 240 }, posB: { x: 890, y: 1130, s: 240 },
    noSquiggle: true,
    draw(x, t) { table(x); todo(x, t, 540, 560,  lerp(560, 690, ease.outCubic(prog(t, -0.5, 5.5))), { w: 200 }) },
    cues: [['whoosh', 0.2, 0.6, 0.02]],
  },
  under: {
    head: 'Not each other. | *The list.*', color: '#ff7a6b',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      table(x, 1320)
      const face = u < 0.8 ? 0 : u < 1.4 ? 1 : 2
      todo(x, t, 540, 480, 800, { w: 300, face })
      if (face === 2) for (let i = 0; i < 3; i++) label(x, 'HA', 540 + [-230, 230, -230][i], 620 + i * 130 + 10 * Math.sin(t * 9 + i), { size: 52, col: '#ff7a6b', font: INTER, weight: 800, rot: [-0.2, 0.2, -0.05][i], alpha: clamp(prog(u, 1.4 + i * 0.3, 1.6 + i * 0.3)) })
      // the two of them, still bickering, small at the edges
      drawA(x, t, { x: 140, y: 1230, s: 170, mood: 'squint', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.6, S.t0 + 2.8] })
      drawB(x, t, { x: 940, y: 1230, s: 170, mood: u > 3.6 ? 'wide' : 'squint', look: u > 3.6 ? [-1, -1] : [-1, 0], hops: [S.t0 + 1.0, S.t0 + 2.2, S.t0 + 3.6] })
      if (u > 3.7) label(x, '…wait.', 940, 1050, { size: 34, col: BONE, alpha: clamp(prog(u, 3.7, 3.9)) })
    },
    pis: { x: 120, y: 1660, s: 120 },
    cues: [['pop', 0.8, 220, 0.05, 0], ['pop', 1.4, 440, 0.04, -0.3], ['pop', 1.7, 466.16, 0.04, 0.3], ['pop', 2.0, 493.88, 0.04, 0], ['pop', 3.7, 1174.66, 0.035, 0.4]],
  },
  talk: {
    head: 'Same side | of the *table.*', color: '#ffd23a',
    stars: "sit on the same side. it's you two *against the problem.*",
    script: 'Okay. *Us* against the train. What’s plan B?',
    reply: ['b', "*plan B:* the early bus. I'll pack snacks."],
  },
  made: {
    posA: { x: 260, y: 1080, s: 240 }, posB: { x: 500, y: 1080, s: 240 },
    draw(x, t, S) {
      table(x)
      const crossed = Math.min(ITEMS.length, Math.floor(prog(t, S.t0 + 0.3, S.t0 + 2.4) * (ITEMS.length + 0.99)))
      const len = lerp(560, 300, ease.inOutCubic(prog(t, S.t0 + 2.0, S.t0 + 2.8)))
      todo(x, t, 830, 560, len, { w: 230, crossed, face: 0, k: S.ok })
    },
    front(x, t, S) {
      // a pencil between them
      x.save(); x.translate(380, 1200); x.rotate(-0.5 + 0.1 * Math.sin(t * 8)); R(x, INK, -8, -70, 16, 120); R(x, '#ffd23a', -4, -66, 8, 100); R(x, '#ff8fb1', -4, -66, 8, 14); x.restore()
      if (t > S.t0 + 2.7) label(x, 'squeak.', 830, 940, { size: 30, col: BONE, alpha: S.ok })
      sparkles(x, t, 830, 700, S.t0 + 2.4, 8, 160, 2, [MINT, GOLD, BONE])
    },
    cues: [...Array.from({ length: 8 }, (_, i) => ['tick', +(0.3 + i * 0.26).toFixed(2), 0.05]), ['pop', 2.7, 1760, 0.03, 0.4]],
  },
  last: '*Us* versus it.', lastColor: '#ffd23a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [drawBits, pop01, easeOutBack, GOLD]
