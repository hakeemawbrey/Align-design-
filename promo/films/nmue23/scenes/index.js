// nmue23: THE MAKE-UP TALK, "Let it rest" (28 s vertical, promo/films/next30/b32.md, music: dreamy · Db).
// ♍ Virgo × ♎ Libra. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
// Chapter tabs: THE OLD JOKE · UNDER IT · THE TALK · MADE UP. A mended heart (gold seams, the eps 1–12 repair motif)
// floats between them.
//   0–6.6     "“Remember when you | *forgot my birthday?*”" Virgo mid-joke; Libra's smile slides off; the mended heart
//             wobbles at each line: "classic you!" / "…ha. yeah." / "you'll never live it down!"
//   6.6–12.8  UNDER IT   "Every joke | *pokes the seam.*" The joke comes back at breakfast, at the party, in the car; each
//             time it pokes the heart and one seam glows red.
//   12.8–21.6 THE TALK   "Healed | means *healed.*" TRY SAYING "That one's healed. I'll let it rest."
//             Libra: "thank you. it really is healed."
//   21.6–25.5 MADE UP    the heart goes into a little box with a bow; a NEW inside joke arrives ("the pancake thing").
//             "Mended means | *mended*."
import { makeMakeUp, R, box, ink, label, glow, sparkles, drawBits, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const BIG_HEART = [
  '..HHH...HHH..',
  '.HHHHH.HHHHH.',
  'HHHHHHSHHHHHH',
  'HHHHHSHHHHHHH',
  'HHHHHHSHHHHHH',
  '.HHHHHHSHHHH.',
  '..HHHHSHHHH..',
  '...HHHHSHH...',
  '....HHSHH....',
  '.....HSH.....',
  '......H......',
]
function heart(x, t, cx, cy, cell, { wob = 0, hot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  const rot = wob * 0.18 * Math.sin(t * 22)
  drawBits(x, BIG_HEART, { H: '#ff5c8a', S: hot > 0.5 && Math.floor(t * 6) % 2 ? '#ff2a2a' : GOLD }, cx, cy, cell * k, { rot })
  if (hot <= 0.5) glow(x, cx, cy, cell * 8, 0.5 * k, '242,199,92')
}
// the last poke time ≤ t (for a decaying wobble)
const wobAt = (t, list) => { let w = 0; for (const p of list) if (t >= p && t < p + 0.8) w = Math.max(w, Math.exp(-(t - p) * 4)); return w }
function poke(x, t, cx, cy, t0) {
  const p = prog(t, t0 - 0.25, t0), back = prog(t, t0 + 0.1, t0 + 0.5)
  if (p <= 0 || back >= 1) return
  const d = (1 - ease.inCubic(p)) * 160 + ease.outCubic(back) * 160
  x.save(); x.translate(cx + d, cy); R(x, INK, 0, -10, 200, 20); R(x, '#c09868', 4, -6, 192, 12); x.restore()
}
function giftBox(x, t, cx, cy, k, lid) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -110, -60, 220, 140, '#7fd0ff', { b: 7 }); R(x, PINK, -14, -60, 28, 140)
  const ly = -60 - (1 - lid) * 160
  box(x, -125, ly - 40, 250, 44, '#9fe0ff', { b: 7 }); R(x, PINK, -14, ly - 40, 28, 44)
  drawBits(x, ['PP.PP', 'PPPPP', '..P..'], { P: PINK }, 0, ly - 60, 12)
  x.restore()
}

const EP = makeMakeUp({
  id: 'nmue23', a: 'virgo', b: 'libra',
  chapters: ['THE OLD JOKE', 'UNDER IT', 'THE TALK', 'MADE UP'],
  hook: '“Remember when you | *forgot my birthday?*”', hookColor: '#ff8fb1',
  fight: {
    lines: [['a', 'classic you!'], ['b', '…ha. yeah.'], ['a', "you'll never live it down!"]],
    bubbleAt: [[300, 860], [800, 860], [380, 1420]],
    moods: { a: 'happy', b: t => t < 1.9 ? 'happy' : t < 4 ? 'neutral' : 'squint' },
    noSquiggle: true, noSteam: true,
    front(x, t) { heart(x, t, 540, 620, 18, { wob: wobAt(t, [-0.3, 1.85, 3.9]) }) },
    cues: [['pluck', 1.9, 523.25, 0.03, 0.5, 0], ['pluck', 3.95, 493.88, 0.03, 0.5, 0]],
  },
  under: {
    head: 'Every joke | *pokes the seam.*', color: '#ff8fb1',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      const P = [0.9, 2.3, 3.7].map(v => S.t0 + v)
      heart(x, t, 540, 820, 24, { wob: wobAt(t, P), hot: u > 3.7 ? 1 : 0 })
      P.forEach(p => poke(x, t, 720, 820, p))
      ;['at breakfast', 'at the party', 'in the car'].forEach((s, i) => label(x, s, 540, 1110, { size: 40, col: GOLD, alpha: clamp(prog(u, [0.6, 2.0, 3.4][i], [0.8, 2.2, 3.6][i])) * (1 - clamp(prog(u, [1.9, 3.3, 9][i], [2.0, 3.4, 9.1][i]))) }))
      drawA(x, t, { x: 220, y: 1330, s: 200, mood: 'happy', look: [1, -0.5], hops: P })
      drawB(x, t, { x: 860, y: 1330, s: 200, mood: u > 3.7 ? 'squint' : 'neutral', look: [-1, -0.5] })
    },
    pis: { x: 540, y: 1660, s: 110 },
    cues: [0.9, 2.3, 3.7].flatMap(v => [['whoosh', +(v - 0.25).toFixed(2), 0.2, 0.03], ['pop', v, 330, 0.05, 0.3], ['tick', v, 0.06]]),
  },
  talk: {
    head: 'Healed | means *healed.*', color: '#f2c75c',
    stars: "once it's repaired, let it rest. jokes can *reopen* it.",
    script: 'That one’s *healed.* I’ll let it rest.',
    reply: ['b', 'thank you. *it really is healed.*'],
  },
  made: {
    posA: { x: 270, y: 1100, s: 240 }, posB: { x: 810, y: 1100, s: 240 },
    draw(x, t, S) {
      const into = ease.inOutCubic(prog(t, S.t0 + 0.3, S.t0 + 1.0))
      const lid = ease.outBack(prog(t, S.t0 + 1.0, S.t0 + 1.3))
      giftBox(x, t, 540, 1240, pop01(t, S.t0 + 0.1, 0.3, 2) * S.ok, lid)
      if (lid < 0.5) heart(x, t, 540, lerp(760, 1180, into), lerp(16, 8, into), { k: S.ok })
      sparkles(x, t, 540, 1180, S.t0 + 1.3, 10, 170, 1, [GOLD, PINK, BONE])
    },
    front(x, t, S) {
      if (t > S.t0 + 1.8) {
        x.save(); x.globalAlpha = S.ok * clamp(prog(t, S.t0 + 1.8, S.t0 + 2.1))
        box(x, 270, 820, 540, 74, '#fff8e6', { b: 6 }); ink(x, 'new joke: the pancake thing', 540, 858, { size: 30, font: MONO, weight: 700, col: INK })
        x.restore()
      }
    },
    cues: [['whoosh', 0.3, 0.6, 0.03], ['tick', 1.0, 0.07], ['bell', 1.3, 1760, 0.035, 1.2, 0], ['glitter', 1.3, 1.7], ['pop', 1.8, 1174.66, 0.04, 0]],
  },
  last: 'Mended means | *mended*.', lastColor: '#f2c75c',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [easeOutBack, INTER]
