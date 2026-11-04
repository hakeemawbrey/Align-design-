// nmue19: THE MAKE-UP TALK, "Go first with your part" (28 s vertical, promo/films/next30/b32.md, music: chiptune · G).
// ♑ Capricorn × ♈ Aries. The format lives in ../../nmue13/scenes/makeupkit.js (shared by nmue13–nmue24).
//   0–6.6     THE FIGHT  "“*You* apologize first.” | “No, *you* do.”" Capricorn and Aries mid-glare in a staring contest over
//             a burnt pie, a wall clock ticking: "I'm not going first." / "neither am I." / "I can stare ALL night."
//   6.6–12.8  UNDER IT   "Two slices. | *Both* real." The pie becomes a pie chart of the fight: one slice for each of them.
//             Each one points only at the other's slice.
//   12.8–21.6 THE TALK   "Own *your* | slice." TRY SAYING "My part: I left the oven on high."
//             Aries: "my part: I said I'd watch it."
//   21.6–25.5 MADE UP    a new pie comes out golden between two oven mitts. "Go *first* | with your part."
import { makeMakeUp, R, box, ink, label, glow, sparkles, signStar, pop01, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, PINK, MONO, INTER } from '../../nmue13/scenes/makeupkit.js'

const CAP = signStar('capricorn'), ARI = signStar('aries')
function table(x, y = 1260) { box(x, 170, y, 740, 40, '#a07850', { b: 7, hi: '#c09868' }); R(x, INK, 220, y + 40, 20, 220); R(x, INK, 840, y + 40, 20, 220) }
function pie(x, t, cx, cy, w, { burnt = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 10, w / 2 + 8, w * 0.2 + 8, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9aa6c8'; x.beginPath(); x.ellipse(0, 10, w / 2, w * 0.2, 0, 0, Math.PI * 2); x.fill()
  const crust = burnt ? '#3a2a22' : '#e0a050', top = burnt ? '#2a1d18' : '#f0c070'
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -6, w / 2 - 6, w * 0.17, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = crust; x.beginPath(); x.ellipse(0, -8, w / 2 - 12, w * 0.15, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = top; for (let i = -2; i <= 2; i++) x.fillRect(i * w * 0.09 - 6, -8 - w * 0.12, 12, w * 0.24)
  if (burnt) for (let i = 0; i < 3; i++) { const p = (t * 0.5 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - p); x.fillStyle = '#6a6488'; x.fillRect(-40 + i * 40 + 12 * Math.sin(t * 2 + i), -40 - p * 160, 22, 22); x.restore() }
  else glow(x, 0, -10, w * 0.7, 1, '255,200,120')
  x.restore()
}
function wallClock(x, t, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 76, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 66, 0, Math.PI * 2); x.fill()
  const a = Math.floor(t) * (Math.PI / 30) * 5 - Math.PI / 2
  x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 52, cy + Math.sin(a) * 52); x.stroke()
  x.lineWidth = 9; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx, cy - 34); x.stroke()
}
// the pie chart of the fight
function chart(x, t, cx, cy, r, u) {
  const hi = u < 2.2 ? -1 : Math.floor(u * 1.2) % 2
  const slices = [[CAP.color, -Math.PI / 2, Math.PI * 0.45], [ARI.color, Math.PI * 0.45, Math.PI * 1.5]]
  slices.forEach(([col, a0, a1], i) => {
    const mid = (a0 + a1) / 2, off = hi === i ? 26 : 0
    x.save(); x.translate(cx + Math.cos(mid) * off, cy + Math.sin(mid) * off)
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r + 8, a0, a1); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, a0 + 0.02, a1 - 0.02); x.closePath(); x.fill()
    x.restore()
  })
  ink(x, CAP.glyph, cx + r * 0.42, cy - r * 0.35, { size: 70, col: INK }); ink(x, ARI.glyph, cx - r * 0.35, cy + r * 0.3, { size: 70, col: INK })
  label(x, 'oven on high', cx + 230, cy + r + 60, { size: 32, col: CAP.color, alpha: clamp(prog(u, 0.9, 1.2)) })
  label(x, 'said "I\'ll watch it"', cx - 210, cy + r + 60, { size: 32, col: ARI.color, alpha: clamp(prog(u, 1.3, 1.6)) })
}

const EP = makeMakeUp({
  id: 'nmue19', a: 'capricorn', b: 'aries',
  hook: '“*You* apologize first.” | “No, *you* do.”', hookColor: '#ff8a5a',
  fight: {
    lines: [['a', "I'm not going first."], ['b', 'neither am I.'], ['a', 'I can stare ALL night.']],
    bubbleAt: [[300, 840], [790, 740], [330, 630]],
    moods: { a: 'wide', b: 'wide' },
    noSteam: true,
    draw(x, t) { wallClock(x, t, 540, 560 + 20); table(x); pie(x, t, 540, 1230, 230, { burnt: 1 }) },
    cues: [0.5, 1.5, 2.5, 3.5, 4.5, 5.5].map(v => ['tick', v, 0.05]),
  },
  under: {
    head: 'Two slices. | *Both* real.', color: '#ff8a5a',
    draw(x, t, S) {
      const { u, drawA, drawB } = S
      const k = easeOutBack(prog(u, 0.2, 0.7), 2)
      x.save(); x.translate(540, 820); x.scale(k, k); x.translate(-540, -820); chart(x, t, 540, 820, 230, u); x.restore()
      // each one points at the other's slice
      drawA(x, t, { x: 230, y: 1300, s: 210, mood: u > 2.2 ? 'squint' : 'neutral', look: [1, -1], hops: [S.t0 + 2.3, S.t0 + 3.9] })
      drawB(x, t, { x: 850, y: 1300, s: 210, mood: u > 2.2 ? 'squint' : 'neutral', look: [-1, -1], hops: [S.t0 + 3.1, S.t0 + 4.7] })
      if (u > 2.3) label(x, '"YOURS!"', 230, 1160, { size: 40, col: CAP.color, font: INTER, weight: 800, rot: -0.1, alpha: clamp(prog(u, 2.3, 2.5)) })
      if (u > 3.1) label(x, '"no, YOURS!"', 850, 1160, { size: 40, col: ARI.color, font: INTER, weight: 800, rot: 0.1, alpha: clamp(prog(u, 3.1, 3.3)) })
    },
    pis: { x: 540, y: 1660, s: 110 },
    cues: [['pop', 0.3, 659.25, 0.045, 0], ['pop', 0.9, 880, 0.035, 0.3], ['pop', 1.3, 739.99, 0.035, -0.3], ['pop', 2.3, 987.77, 0.04, -0.4], ['pop', 3.1, 1174.66, 0.04, 0.4]],
  },
  talk: {
    head: 'Own *your* | slice.', color: '#ff8a5a',
    stars: 'own your part, even a small one. it makes room for *theirs.*',
    script: '*My part:* I left the oven on high.',
    reply: ['b', "*my part:* I said I'd watch it."],
  },
  made: {
    draw(x, t, S) { table(x, 1290) },
    front(x, t, S) {
      const k = pop01(t, S.t0 + 0.4, 0.35, 2.2) * S.ok
      pie(x, t, 540, 1260, 260, { k })
      for (const d of [-1, 1]) if (k > 0.01) { x.save(); x.translate(540 + d * 175, 1250); x.scale(d * k, k); box(x, -30, -40, 60, 70, '#ff7a6b', { b: 6 }); box(x, 24, -40, 24, 36, '#ff7a6b', { b: 5 }); x.restore() }
      sparkles(x, t, 540, 1220, S.t0 + 0.7, 10, 200, 1, [GOLD, BONE, PINK])
      label(x, 'golden.', 540, 1400, { size: 40, col: GOLD, font: INTER, weight: 800, alpha: S.ok * clamp(prog(t, S.t0 + 1.0, S.t0 + 1.3)) })
    },
    cues: [['pop', 0.4, 880, 0.04, 0], ['glitter', 0.7, 1.1], ['bell', 1.0, 1760, 0.03, 1.0, 0]],
  },
  last: 'Go *first* | with your part.', lastColor: '#ff8a5a',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, ease, MONO]
