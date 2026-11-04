// nmue04: THE MAKE-UP TALK, Ep 4 "Say it back." (28 s vertical, promo/films/next30/b31.md, music: dreamy · Ab)
// The show's spine lives in ../../nmue01/scenes/mukit.js. Story 0–25.6, then the shared short end card.
//   0.0–3.0    "Are you even | *listening?*"  ♎ Libra mid-sentence; ♑ Capricorn nods along while a thought bubble
//              drafts "COUNTERPOINTS: 1. 2. 3."
//   3.0–9.6    "Nodding… while | *loading a reply.*"  Libra: "and I just felt—"; Capricorn's thought bubble shows a
//              loading bar; at 100% it fires early: "WELL, technically—" and Libra's "—rushed." gets squashed.
//   9.6        hard cut into the move (no card transition).
//   9.7–17.2   "Say it *back.*"  THE STARS: "before you answer, say it *back.*" → "'so you felt rushed when I *planned
//              it all?*'"  A pixel hand mirror shows "I felt rushed." and its reflection.
//   17.2–22.4  "Then *check.*"  CAPRICORN: "so you felt rushed when I *planned it all?*"  LIBRA: "YES. *that.*"
//              Libra's shoulders drop (it bounces). The heart mends (21.0).
//   22.4–25.5  "Heard comes | before *fixed.*"
import { makeEpisode, T, R, box, bubble, label, note, shadow, room, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, MINT, INTER, MONO, r3 } from '../../nmue01/scenes/mukit.js'

// a cloud-ish thought bubble (pixel) with content drawn by fn(x) centred at (0, 0)
function thought(x, cx, cy, w, h, k, fn, tailX = -1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -w / 2, -h / 2, w, h, '#f4eefc', { b: 6 })
  box(x, -w / 2 + 14, -h / 2 - 10, w - 28, 10, '#f4eefc', { b: 0 })
  for (const [dx, dy, s] of [[tailX * 40, h / 2 + 26, 18], [tailX * 70, h / 2 + 58, 12]]) box(x, dx - s / 2, dy - s / 2, s, s, '#f4eefc', { b: 5 })
  fn(x)
  x.restore()
}

const EP = makeEpisode({
  id: 'nmue04', ep: 4, A: 'libra', B: 'capricorn', accent: '#f7a6c8',
  heart: { hook: { x: 540, y: 545, cell: 13 } },
  heads: {
    hook: 'Are you even | *listening?*',
    trap: 'Nodding… while | *loading a reply.*',
    move: 'Say it *back.*',
    try: 'Then *check.*',
    last: 'Heard comes | before *fixed.*',
  },
  lines: [
    { t: 10.25, who: 'S', text: 'before you answer, say it *back.*' },
    { t: 12.9, who: 'S', text: "'so you felt rushed when I *planned it all?*'" },
    { t: 17.6, who: 'B', text: 'so you felt rushed when I *planned it all?*' },
    { t: 19.65, who: 'A', text: 'YES. *that.*' },
  ],
  hook(x, t, S) {
    room(x, t)
    const nod = 0.06 * Math.max(0, Math.sin(t * 7))
    S.couple(x, t, { a: { mood: 'wide', look: [1, 0], hops: [-0.12, 0.8, 1.6, 2.3] }, b: { mood: 'neutral', look: [-1, -0.6], squash: nod, hops: [-0.04] } })
    bubble(x, t, 280, 780, -1, 9, 'and then you just—', { size: 34, tail: -0.2 })
    thought(x, 790, 640, 300, 150, 1, (c) => {
      c.font = `700 26px ${MONO}`; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = INK
      c.fillText('COUNTERPOINTS:', -126, -36); c.fillText('1. ___', -126, 0); c.fillText('2. ___   3.', -126, 34)
    })
  },
  trap(x, t, S) {
    const u = S.u
    room(x, t)
    const fire = S.t0 + 3.6
    const nod = t < fire ? 0.06 * Math.max(0, Math.sin(t * 7)) : 0
    S.couple(x, t, {
      a: { mood: t < fire ? 'neutral' : 'wide', look: [1, 0], hops: [S.t0 + 0.3, S.t0 + 1.1, S.t0 + 1.9, S.t0 + 2.7], squash: t > fire && t < fire + 0.6 ? 0.18 : 0 },
      b: { mood: t < fire ? 'neutral' : 'squint', look: [-1, -0.6], squash: nod, hops: [fire, fire + 0.4] },
    })
    // Libra keeps going
    bubble(x, t, 290, 800, S.t0 + 0.2, fire, 'and I just felt—', { size: 34, tail: -0.2 })
    // the loading bar in Capricorn's head
    const lp = clamp(u / 3.5)
    const tk = outK(t, [fire + 0.1, fire + 0.35])
    thought(x, 790, 620, 320, 150, tk, (c) => {
      c.font = `700 24px ${MONO}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK
      c.fillText(`LOADING REPLY… ${Math.round(lp * 100)}%`, 0, -30)
      box(c, -130, 6, 260, 30, '#2a2148', { b: 4 }); R(c, lp > 0.99 ? '#e8344e' : '#5fd38a', -126, 10, 252 * lp, 22)
    })
    // it fires early
    bubble(x, t, 720, 800, fire, S.t1 - 0.1, 'WELL, technically—', { size: 40, tail: 0.25, col: '#ffe1a6' })
    if (t > fire) {
      const sq = ease.outCubic(prog(t, fire, fire + 0.3))
      x.save(); x.translate(330, 800); x.scale(1 - 0.25 * sq, 1 - 0.45 * sq); x.rotate(-0.12 * sq); x.globalAlpha = 1 - 0.3 * sq
      bubble(x, t, 0, 0, fire - 1, S.t1 - 0.1, '—rushed.', { size: 34 })
      x.restore()
      sparkles(x, t, 540, 800, fire, 8, 120, 2, ['#ffe1a6', BONE])
    }
  },
  move(x, t, S) {
    const u = S.u, ok = outK(t, [S.t1 - 0.2, S.t1])
    room(x, t, { a: ok })
    const k = pop01(t, S.t0 + 0.05, 0.3, 2) * ok
    S.A(x, t, { x: 360, y: 1140, s: 180, pop: k, mood: u > 4 ? 'sparkle' : 'neutral', look: [1, -1], talk: false })
    S.B(x, t, { x: 720, y: 1140, s: 180, pop: k, mood: u > 4 ? 'happy' : 'neutral', look: [-1, -1], talk: false })
    // a pixel hand mirror: the words on the left, their reflection on the right
    const mk = easeOutBack(prog(t, 10.6, 11.0), 1.6) * ok
    if (mk > 0.01) {
      x.save(); x.translate(540, 790); x.scale(mk, mk); x.rotate(0.03 * Math.sin(t * 1.6))
      box(x, -14, 150, 28, 150, '#b98a4a', { b: 6 })
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 200, 170, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#d6b36a'; x.beginPath(); x.ellipse(0, 0, 188, 158, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#cfe8f6'; x.beginPath(); x.ellipse(0, 0, 166, 136, 0, 0, Math.PI * 2); x.fill()
      x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(-120, -80, 40, 10); x.fillRect(-130, -60, 20, 10)
      x.restore()
      const wk = clamp(prog(t, 13.1, 13.4)) * ok
      if (wk > 0.01) {
        x.save(); x.globalAlpha = wk; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = INK; x.fillText('I felt rushed.', 540, 760)
        x.save(); x.translate(540, 830); x.scale(1, -1); x.fillStyle = 'rgba(27,18,54,0.45)'; x.fillText('I felt rushed.', 0, 0); x.restore()
        x.restore()
      }
      sparkles(x, t, 540, 790, 13.15, 10, 220, 1, [GOLD, BONE, '#f7a6c8'])
    }
  },
  try(x, t, S) {
    const ok = S.ok
    room(x, t, { a: ok })
    const relief = t > 19.7
    shadow(x, 330, 1140, 220 * ok); shadow(x, 750, 1140, 220 * ok)
    S.A(x, t, { x: 330, y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : relief ? 'sparkle' : 'neutral', look: [1, 0], squash: relief && t < 20.4 ? 0.1 : 0, hops: [19.7, 20.05, T.mend + 0.05, T.h4Land + 0.05] })
    S.B(x, t, { x: 750, y: 1020, s: 240, pop: ok, mood: t > T.mend ? 'happy' : 'neutral', look: [-1, 0], hops: [T.mend + 0.12, T.h4Land + 0.15] })
    if (t > 19.75 && t < 21.2) label(x, '*exhale*', 330, 860, { size: 30, col: MINT, alpha: outK(t, [20.9, 21.2]) })
  },
  cues: [
    ['pop', 3.2, 880, 0.035, -0.3], ...Array.from({ length: 7 }, (_, i) => ['tick', r3(3.4 + i * 0.5), 0.02]),
    ['pop', 6.6, 1318.51, 0.05, 0.3], ['pop', 6.66, 1567.98, 0.035, 0.3], ['whoosh', 6.6, 0.25, 0.04], ['tick', 6.65, 0.06],
    ['pluck', 6.9, 440, 0.025, 0.4, -0.3],
    ['whoosh', 10.6, 0.4, 0.035], ['pop', 10.85, 987.77, 0.04, 0], ['glitter', 13.15, 13.5], ['bell', 13.2, 1760, 0.02, 0.9, 0],
    ['pluck', 19.75, 659.25, 0.03, 0.5, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp]
