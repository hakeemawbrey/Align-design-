// nmue02: THE MAKE-UP TALK, Ep 2 "Curious first." (28 s vertical, promo/films/next30/b31.md, music: jazzy · Bb)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
//   0.0–3.0    "Round two? Or | *round one* of listening?"  ♉ Taurus and ♏ Scorpio, mid-hop, each hugging a fat
//              "MY SIDE" folder; the cracked heart floats between them.
//   3.0–9.6    "Two lawyers. | *Zero* listeners."  "first of all…" "well, ACTUALLY…" "see page 40!" The folders get
//              thicker and thicker; loose pages fly.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Ask *first.*"  THE STARS: "start with a *question*, not a case." → "'what was that like for *you?*'"
//              Both folders drop; a big pixel "?" card pops between them.
//   17.2–22.4  "Then | *listen.*"  SCORPIO: "what was that like for *you?*"  TAURUS: "honestly? I felt *left out.*"
//              Scorpio leans in. The heart mends (21.0).
//   22.4–25.5  "Lead with | a *question.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, RED, INTER, r3 } from '../../nmue01/scenes/mukit.js'

// a folder held in front of a star: thick = number of page layers; k = scale
function folder(x, t, cx, cy, { thick = 1, k = 1, rot = 0, col = '#e9b949', text = 'MY SIDE' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const n = Math.round(thick), w = 170, h = 120
  for (let i = n; i >= 1; i--) { const o = i * 7; box(x, -w / 2 + 4, -h / 2 - o, w - 8, h, i % 2 ? '#fbf3e0' : '#efe2c4', { b: 4 }) }
  box(x, -w / 2, -h / 2 + 4, w, h, col, { b: 6, hi: '#f7d77a' })
  box(x, -w / 2 + 10, -h / 2 - 8, 60, 16, col, { b: 5 })
  x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 10)
  x.restore()
  void t
}
// loose pages fluttering out from (cx, cy) from t0
function pages(x, t, t0, cx, cy, n = 6, dir = 1) {
  for (let i = 0; i < n; i++) {
    const b = t0 + i * 0.35, p = (t - b) / 1.6
    if (p < 0 || p > 1) continue
    const px = cx + dir * (60 + i * 18) * p * 2 + Math.sin(p * 9 + i) * 20, py = cy - 120 * Math.sin(Math.PI * p) + 260 * p * p
    x.save(); x.globalAlpha = 1 - ease.inQuad(p); x.translate(px, py); x.rotate(Math.sin(p * 8 + i) * 0.8)
    box(x, -22, -28, 44, 56, '#fbf3e0', { b: 3 }); R(x, '#9aa3c8', -14, -16, 28, 4); R(x, '#9aa3c8', -14, -4, 22, 4); R(x, '#9aa3c8', -14, 8, 26, 4)
    x.restore()
  }
}
// a big pixel question mark
const QM = ['.QQQQQ.', 'QQ...QQ', '.....QQ', '....QQ.', '...QQ..', '...QQ..', '.......', '...QQ..']

const EP = makeEpisode({
  id: 'nmue02', ep: 2, A: 'taurus', B: 'scorpio', accent: '#ffb38a',
  heads: {
    hook: 'Round two? Or | *round one* of listening?',
    trap: 'Two lawyers. | *Zero* listeners.',
    move: 'Ask *first.*',
    try: 'Then | *listen.*',
    last: 'Lead with | a *question.*',
  },
  lines: [
    { t: 10.25, who: 'S', text: 'start with a *question*, not a case.' },
    { t: 12.9, who: 'S', text: "'what was that like for *you?*'" },
    { t: 17.6, who: 'B', text: 'what was that like for *you?*' },
    { t: 19.15, who: 'A', text: 'honestly? I felt *left out.*' },
  ],
  hook(x, t, S) {
    room(x, t)
    S.couple(x, t, { a: { mood: 'squint', look: [1, 0], hops: [-0.1, 1.4] }, b: { mood: 'squint', look: [-1, 0], hops: [-0.03, 1.9] } })
    folder(x, t, 150, 1110, { thick: 2, rot: -0.1, k: 0.85 })
    folder(x, t, 930, 1110, { thick: 2, rot: 0.1, k: 0.85, col: '#c98ae0' })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const th = 2 + Math.min(9, u * 1.6)
    S.couple(x, t, {
      a: { mood: 'wide', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 1.9, S.t0 + 3.5, S.t0 + 5.0] },
      b: { mood: 'squint', look: [-1, 0], hops: [S.t0 + 1.1, S.t0 + 2.7, S.t0 + 4.3, S.t0 + 5.6] },
    })
    folder(x, t, 150, 1110, { k: 0.85, thick: th, rot: -0.06 + 0.03 * Math.sin(t * 6) })
    folder(x, t, 930, 1110, { k: 0.85, thick: th * 0.95, rot: 0.06 - 0.03 * Math.sin(t * 6), col: '#c98ae0' })
    pages(x, t, S.t0 + 2.4, 150, 1020, 7, -1)
    pages(x, t, S.t0 + 2.6, 930, 1020, 7, 1)
    bubble(x, t, 300, 760, S.t0 + 0.3, S.t1 - 0.1, 'first of all…', { size: 36, tail: -0.3 })
    bubble(x, t, 760, 660, S.t0 + 1.1, S.t1 - 0.1, 'well, ACTUALLY…', { size: 36, tail: 0.3, col: '#f1dcff' })
    bubble(x, t, 330, 560, S.t0 + 1.9, S.t1 - 0.1, 'exhibit B!', { size: 36, tail: -0.3 })
    bubble(x, t, 740, 460, S.t0 + 2.7, S.t1 - 0.1, 'see page 40!!', { size: 38, tail: 0.3, col: '#f1dcff' })
    if (u > 4.3) label(x, 'OBJECTION!', 540, 880 + 4 * Math.sin(t * 30), { size: 44, col: '#ffe27a', font: INTER, weight: 800, rot: -0.08 })
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const drop = ease.inCubic(prog(t, 12.9, 13.3))
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 360, y: 1130, s: 190, pop: k, mood: u > 3.5 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 720, y: 1130, s: 190, pop: k, mood: u > 3.5 ? 'sparkle' : 'neutral', look: [-1, -1], talk: false })
    if (drop < 1) {
      folder(x, t, 220, 1200 + drop * 500, { thick: 6, k: 0.8 * k, rot: -0.06 + drop * 0.9 })
      folder(x, t, 860, 1200 + drop * 500, { thick: 6, k: 0.8 * k, rot: 0.06 - drop * 0.9, col: '#c98ae0' })
    }
    const qk = easeOutBack(prog(t, 13.2, 13.6), 1.8) * ok
    if (qk > 0.01) {
      note(x, 540, 790, 300, 340, [''], { k: qk, rot: 0.04 * Math.sin(t * 2) })
      x.save(); x.translate(540, 790); x.scale(qk, qk); x.rotate(0.04 * Math.sin(t * 2))
      QM.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'Q') { R(x, '#c4544a', -84 + i * 24, -110 + j * 28, 24, 28) } }))
      x.restore()
      sparkles(x, t, 540, 790, 13.4, 10, 210, 1, [GOLD, BONE, '#ffb38a'])
    }
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const lean = ease.inOutCubic(prog(t, 19.0, 19.6))
    const soft = t > 19.4
    shadow(x, 330, 1140, 220 * ok); shadow(x, lerp(750, 700, lean), 1140, 220 * ok)
    S.A(x, t, { x: 330, y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : soft ? 'sparkle' : 'neutral', look: [1, soft ? 0.6 : 0], hops: [T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: lerp(750, 700, lean), y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : 'sparkle', look: [-1, 0], squash: -0.05 * lean * (t < T.mend ? 1 : 0), hops: [T.mend + 0.12, T.h4Land + 0.15] })
    // the "?" card, now small, held by Scorpio
    const qk = outK(t, [T.mend - 0.3, T.mend]) * ok
    if (qk > 0.01) {
      x.save(); x.translate(lerp(840, 800, lean), 1090); x.scale(0.35 * qk, 0.35 * qk)
      box(x, -150, -170, 300, 340, BONE, { b: 14 })
      QM.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'Q') R(x, '#c4544a', -84 + i * 24, -110 + j * 28, 24, 28) }))
      x.restore()
    }
    if (t > 19.3 && t < 20.6) label(x, 'oh.', 760, 850, { size: 40, col: BONE, font: INTER, weight: 800, alpha: outK(t, [20.3, 20.6]) })
  },
  cues: [
    ['pop', 3.3, 880, 0.04, -0.3], ['pop', 4.1, 1174.66, 0.04, 0.3], ['pop', 4.9, 987.77, 0.04, -0.3], ['pop', 5.7, 1318.51, 0.045, 0.3],
    ...Array.from({ length: 8 }, (_, i) => ['tick', r3(5.4 + i * 0.35), 0.025]), ['whoosh', 5.4, 0.5, 0.025], ['tom', 7.3, 110, { gain: 0.2, decay: 0.2 }], ['tick', 7.3, 0.06],
    ['whoosh', 12.9, 0.35, 0.035], ['tom', 13.3, 90, { gain: 0.18, decay: 0.25 }], ['pop', 13.4, 1174.66, 0.05, 0], ['glitter', 13.4, 13.8],
    ['pop', 19.3, 659.25, 0.03, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [RED, clamp]
