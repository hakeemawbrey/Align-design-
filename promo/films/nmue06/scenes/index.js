// nmue06: THE MAKE-UP TALK, Ep 6 "Swap 'or' for 'and'." (30 s vertical, promo/films/next30/b31.md, music: pop · C)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared end card.
//   0.0–3.0    "Your family | *or* mine?"  ♊ Gemini and ♐ Sagittarius each grab one side of a December calendar.
//   3.0–9.6    "A tug of war | *nobody* wins."  The calendar stretches between them under a giant pixel OR; it rips in
//              two and both tumble back onto the rug.
//   9.6        card cut.
//   9.7–17.2   "Trade *or* | for *and.*"  THE STARS: "'or' makes it a contest someone *loses.*" → "ask: 'how do we do
//              *both*, kindly?'"  The big OR flips over like a sign: AND.
//   17.2–22.4  "Plan it | *together.*"  The calendar, whole again, on one table between them. GEMINI: "Eve at yours,
//              brunch at mine?"  SAGITTARIUS: "*deal.* nobody loses."  Two heart stickers land on two dates. The heart
//              mends (21.0).
//   22.4–25.5  "Swap *or* | for *and.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, hearts, pop01, outK, prog, lerp, clamp, ease, easeOutBack, drawBits, HEART, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

// a December calendar page; stretch widens it, rip splits it (two halves pulled apart), stickers: dates with hearts
function calendar(x, t, cx, cy, { w = 300, stretch = 0, rip = 0, k = 1, rot = 0, stickers = [] } = {}) {
  if (k <= 0.01) return
  const W = w * (1 + stretch), H = 250
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const half = (side) => {
    x.save(); x.translate(side * rip * 120, rip * 40); x.rotate(side * rip * 0.25)
    x.beginPath(); side < 0 ? x.rect(-W / 2 - 20, -H / 2 - 40, W / 2 + 20 + (rip > 0 ? 0 : 1), H + 80) : x.rect(0, -H / 2 - 40, W / 2 + 20, H + 80); x.clip()
    box(x, -W / 2, -H / 2, W, H, BONE, { b: 6 })
    R(x, '#d23a4e', -W / 2, -H / 2, W, 56)
    x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff1c8'; x.fillText('DECEMBER', 0, -H / 2 + 30)
    for (const dx of [-W / 2 + 40, W / 2 - 40]) { R(x, INK, dx - 6, -H / 2 - 22, 12, 30) }
    // a grid of days (the last two weeks)
    const cols = 7, cw = (W - 40) / cols
    for (let r = 0; r < 3; r++) for (let c = 0; c < cols; c++) {
      const d = 15 + r * 7 + c
      if (d > 31) continue
      const gx = -W / 2 + 20 + c * cw, gy = -H / 2 + 70 + r * 56
      R(x, d === 24 || d === 25 ? '#ffe1d6' : '#f4ecdc', gx + 3, gy, cw - 6, 50)
      x.font = `700 ${Math.min(22, cw * 0.45)}px ${INTER}`; x.fillStyle = INK; x.fillText(String(d), gx + cw / 2, gy + 25)
      const st = stickers.find(s => s.d === d)
      if (st && t > st.at) drawBits(x, HEART, { H: '#ff4f86' }, gx + cw / 2 + 10, gy + 14, 3.4 * pop01(t, st.at, 0.25, 3))
    }
    x.restore()
  }
  half(-1); half(1)
  x.restore()
}
// the big pixel sign word (OR / AND), flip 0…1 rotates it about the vertical axis
function bigWord(x, cx, cy, word, { k = 1, sx = 1, col = '#ffd23a' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k * sx, k)
  x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.lineWidth = 18; x.strokeStyle = INK; x.lineJoin = 'round'; x.strokeText(word, 0, 0)
  x.fillStyle = col; x.fillText(word, 0, 0)
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue06', ep: 6, A: 'gemini', B: 'sagittarius', accent: '#ffd23a',
  heads: {
    hook: 'Your family | *or* mine?',
    trap: 'A tug of war | *nobody* wins.',
    move: 'Trade *or* | for *and.*',
    try: 'Plan it | *together.*',
    last: 'Swap *or* | for *and.*',
  },
  heart: { hook: { x: 540, y: 560, cell: 14 } },
  lines: [
    { t: 10.25, who: 'S', text: "'or' makes it a contest someone *loses.*" },
    { t: 13.0, who: 'S', text: "ask: 'how do we do *both*, kindly?'" },
    { t: 17.6, who: 'A', text: 'Eve at yours, brunch at *mine?*' },
    { t: 19.2, who: 'B', text: '*deal.* nobody loses.' },
  ],
  hook(x, t, S) {
    room(x, t)
    const tug = 8 * Math.sin(t * 6)
    S.couple(x, t, { a: { x: 230 - tug, mood: 'squint', look: [1, 0], hops: [-0.1, 1.6] }, b: { x: 850 + tug, mood: 'squint', look: [-1, 0], hops: [-0.04, 2.0] } })
    calendar(x, t, 540, 1010, { stretch: 0.15 + 0.03 * Math.sin(t * 6), k: 0.95 })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const ripT = 4.4, rip = ease.outCubic(prog(u, ripT, ripT + 0.4))
    const stretch = Math.min(0.8, u * 0.18) * (1 - rip) + 0.15
    const fall = ease.outCubic(prog(u, ripT, ripT + 0.5))
    const tug = (1 - rip) * 10 * Math.sin(t * 9)
    shadow(x, 200, 1150, 200); shadow(x, 880, 1150, 200)
    S.A(x, t, { x: 220 - tug - fall * 70, y: 1020 + fall * 50, s: 220, mood: rip > 0 ? 'wide' : 'squint', look: [1, 0], squash: rip > 0 && u < ripT + 0.8 ? 0.2 : 0.05 * Math.sin(t * 9), hops: [S.t0 + 0.6, S.t0 + 2.2] })
    S.B(x, t, { x: 860 + tug + fall * 70, y: 1020 + fall * 50, s: 220, mood: rip > 0 ? 'wide' : 'squint', look: [-1, 0], squash: rip > 0 && u < ripT + 0.8 ? 0.2 : 0.05 * Math.sin(t * 9), hops: [S.t0 + 1.4, S.t0 + 3.0] })
    calendar(x, t, 540, 1000 + rip * 60, { stretch, rip, k: 0.9 })
    const ok = pop01(t, S.t0 + 0.6, 0.4, 2.2)
    bigWord(x, 540, 640 + 10 * Math.sin(t * 3), 'OR', { k: ok * (1 + 0.04 * Math.sin(t * 9)) })
    if (rip > 0) { label(x, 'RRRIP', 540, 870, { size: 48, col: '#ffe27a', font: INTER, weight: 800, rot: -0.1, alpha: outK(t, [S.t0 + ripT + 1.2, S.t0 + ripT + 1.5]) }); sparkles(x, t, 540, 1000, S.t0 + ripT, 10, 160, 1, [BONE, '#d23a4e']) }
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 330, y: 1170, s: 170, pop: k, mood: u > 3.6 ? 'happy' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 750, y: 1170, s: 170, pop: k, mood: u > 3.6 ? 'sparkle' : 'neutral', look: [-1, -1], talk: false })
    // the flip: OR (scale x → 0) then AND (0 → 1)
    const f = prog(t, 13.3, 13.8), sx = Math.abs(Math.cos(Math.PI * f))
    const word = f < 0.5 ? 'OR' : 'AND', col = f < 0.5 ? '#ffd23a' : '#7dffb0'
    R(x, INK, 536, 430, 8, 250 * k)
    bigWord(x, 540, 800, word, { k: k * (f >= 1 ? 1 + 0.06 * Math.exp(-(t - 13.8) * 4) * Math.sin((t - 13.8) * 18) : 1), sx: Math.max(0.02, sx), col })
    sparkles(x, t, 540, 800, 13.8, 12, 260, 1, ['#7dffb0', GOLD, BONE])
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    shadow(x, 280, 1140, 210 * ok); shadow(x, 800, 1140, 210 * ok)
    S.A(x, t, { x: 280, y: 1020, s: 220, pop: ok, mood: t > T.mend ? 'happy' : 'sparkle', look: [1, 0.5], hops: [19.0, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 800, y: 1020, s: 220, pop: ok, mood: t > 19.2 ? 'happy' : 'neutral', look: [-1, 0.5], hops: [19.9, T.mend + 0.12, T.h4Land + 0.15] })
    calendar(x, t, 540, 1040, { k: 0.8 * ok, stickers: [{ d: 24, at: 18.6 }, { d: 25, at: 19.6 }] })
    hearts(x, t, 19.7, 540, 940, { n: 4, cell: 5, spread: 200 })
  },
  cues: [
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(3.4 + i * 0.8), 0.025]), ['pop', 3.6, 880, 0.04, 0], ['pop', 3.7, 1174.66, 0.035, 0],
    ['riser', 5.4, 7.4, 0.025], ['whoosh', 7.4, 0.3, 0.05], ['tick', 7.4, 0.07], ['tom', 7.5, 100, { gain: 0.2, decay: 0.2 }], ['tom', 7.6, 95, { gain: 0.2, decay: 0.2 }],
    ['whoosh', 13.3, 0.5, 0.04], ['tick', 13.55, 0.05], ['pop', 13.8, 1318.51, 0.05, 0], ['bell', 13.85, 1760, 0.03, 1.0, 0], ['glitter', 13.8, 14.2],
    ['pop', 18.6, 987.77, 0.04, -0.2], ['pop', 19.6, 1174.66, 0.04, 0.2], ['pluck', 19.7, 1318.51, 0.03, 0.5, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, note, bubble, clamp, lerp, easeOutBack, GOLD]
