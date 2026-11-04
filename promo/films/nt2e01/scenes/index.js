// nt2e01: THINGS THAT JUST MAKE SENSE: cold nights (20 s vertical, Trends Vol. 2 format 1; row in
// promo/films/next30/b11.md; music dreamy · E). Format look: ./sensekit.js (shared with nt2e02–nt2e05).
//   0.0–2.1    hook (frame 0): "Things that just *make sense:* | cold nights". Taurus mid-hop under a blanket pile.
//   2.1–5.0    1 "Taurus + *a five-blanket couch*": five blankets stacked on a couch, Taurus burrowed in: "one more."
//   5.0–7.9    2 "Cancer + *soup made for two*": a steaming pot, two bowls already out: "made extra. obviously."
//   7.9        card cut.
//   7.9–11.3   3 (twist) "Capricorn + *a spare scarf*": Gemini shivers; Capricorn produces a second scarf: "in case
//              you forgot yours." Gemini melts.
//   11.35      stamp MAKES SENSE. · THE STARS: "Cozy is a *plan*, not a mood." · Pisces: SO TRUE, fountaining.
import { makeSense, easeOutBack, starOf, withProps, bubble, shadow, box, R, hearts, label, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK } from './sensekit.js'

const TAURUS = starOf('taurus', 3), CANCER = starOf('cancer', 4), CAP = starOf('capricorn', 5), GEM = starOf('gemini', 7)
const BL = [['#e36b8c', '#f59ab3'], ['#5aa9e6', '#8fcaf5'], ['#f2c75c', '#ffe29a'], ['#7be3a0', '#b4f2c8'], ['#c9a6ff', '#e2cfff']]

function blanket(x, cx, cy, w, h, [a, b], rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, a, { b: 5 })
  for (let i = 0; i < w; i += 40) R(x, b, -w / 2 + i, -h / 2, 18, h)
  R(x, 'rgba(255,255,255,0.18)', -w / 2, -h / 2, w, 6)
  x.restore()
}
function couch(x, cx, cy) {
  box(x, cx - 330, cy - 150, 660, 130, '#7b4f8e', { b: 7, hi: '#9a6aae' })
  box(x, cx - 380, cy - 40, 760, 120, '#8f5fa3', { b: 7, hi: '#a979bd' })
  box(x, cx - 400, cy - 110, 70, 190, '#6a427c', { b: 7 }); box(x, cx + 330, cy - 110, 70, 190, '#6a427c', { b: 7 })
  R(x, INK, cx - 360, cy + 86, 26, 40); R(x, INK, cx + 334, cy + 86, 26, 40)
}
function scarfOn(x, F, col, col2) {
  // a scarf wrapped under the face (sprite cells)
  void F
  R(x, INK, 7, 25, 22, 6); R(x, col, 8, 26, 20, 4); for (let i = 9; i < 28; i += 4) R(x, col2, i, 26, 2, 4)
  R(x, INK, 22, 28, 6, 9); R(x, col, 23, 29, 4, 7); R(x, col2, 23, 33, 4, 1)
}

const EP = makeSense({
  id: 'nt2e01', topic: 'cold nights', accent: '#9fd8f6', deep: '#3a6fb0', badge: '#9fd8f6',
  hook(x, t) {
    shadow(x, 540, 1200, 420)
    for (let i = 0; i < 4; i++) blanket(x, 540 + (i % 2 ? 30 : -30), 1150 - i * 46, 560 - i * 50, 60, BL[i], (i % 2 ? 0.04 : -0.05))
    const o = { x: 540, y: 880, s: 330, mood: 'happy', look: [0, 0], hops: [-0.2, 0.55, 1.25, 1.9] }
    TAURUS(x, t, o)
    withProps(x, t, o, () => { R(x, INK, 3, 3, 30, 8); R(x, BL[4][0], 4, 4, 28, 6); for (let i = 5; i < 31; i += 5) R(x, BL[4][1], i, 4, 2, 6) })
    label(x, 'brrr', 860, 700, { size: 40, col: '#bfe8ff', rot: 0.12 })
  },
  eqs: [
    { caption: 'Taurus + *a five-blanket couch*', check: [880, 560],
      draw(x, t, S) {
        couch(x, 540, 1080)
        const n = Math.min(5, Math.floor(S.u / 0.22) + 1)
        for (let i = 0; i < n; i++) { const k = pop01(t, S.t0 + i * 0.22, 0.25, 2.2); blanket(x, 540 + (i % 2 ? 14 : -14), 1010 - i * 36 - (1 - k) * 80, 640 - i * 30, 52, BL[i], (i % 2 ? 0.03 : -0.03)) }
        const up = easeOutBack(prog(S.u, 1.0, 1.35), 2)
        TAURUS(x, t, { x: 540, y: lerp(1010, 830, up), s: 230, mood: S.u > 1.5 ? 'happy' : 'sleepy', look: [0, 0], hops: [S.t0 + 1.0], zzz: false })
        blanket(x, 540, 900, 520, 70, BL[1])
        bubble(x, t, 540, 660, S.t0 + 1.9, S.t1, 'one more.', { size: 40 })
      },
      cues: [['pop', 0.02, 659.25, 0.03, -0.2], ['pop', 0.24, 739.99, 0.03, 0.2], ['pop', 0.46, 880, 0.03, -0.2], ['pop', 0.68, 987.77, 0.03, 0.2], ['pop', 0.9, 1174.66, 0.03, 0], ['whoosh', 1.0, 0.25, 0.02]] },
    { caption: 'Cancer + *soup made for two*', check: [880, 560],
      draw(x, t, S) {
        // table + pot + two bowls
        box(x, 140, 1110, 800, 40, '#8a5a3c', { b: 7, hi: '#a8724e' })
        const o = { x: 330, y: 960, s: 240, mood: 'happy', look: [1, 0.2], hops: [S.t0 + 0.4, S.t0 + 1.2] }
        CANCER(x, t, o)
        box(x, 500, 990, 170, 110, '#d2d6e6', { b: 6, hi: '#eef0f8' }); R(x, INK, 470, 1010, 30, 14); R(x, INK, 670, 1010, 30, 14)
        for (const [bx, k0] of [[760, 0.7], [880, 1.0]]) {
          const k = pop01(t, S.t0 + k0, 0.28, 2.4); if (k <= 0.01) continue
          x.save(); x.translate(bx, 1100); x.scale(k, k)
          box(x, -50, -46, 100, 46, '#f0a34a', { b: 5 }); R(x, '#ffd27a', -42, -46, 84, 10)
          x.restore()
          for (let s = 0; s < 3; s++) { const p = ((t * 0.8 + s / 3 + bx) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, bx - 20 + s * 16 + Math.sin(t * 3 + s) * 6, 1030 - p * 110, 8, 18); x.restore() }
        }
        for (let s = 0; s < 4; s++) { const p = ((t * 0.7 + s / 4) % 1); x.save(); x.globalAlpha = 0.7 * (1 - p); R(x, BONE, 540 + s * 26 + Math.sin(t * 2 + s) * 8, 960 - p * 160, 10, 24); x.restore() }
        bubble(x, t, 420, 700, S.t0 + 1.7, S.t1, 'made extra. obviously.', { size: 36, tail: -0.4 })
      },
      cues: [['pop', 0.7, 987.77, 0.035, 0.3], ['pop', 1.0, 1174.66, 0.035, 0.5], ['pluck', 1.72, 1318.51, 0.03, 0.4, 0]] },
    { caption: 'Capricorn + *a spare scarf*, just in case', check: [880, 520], pis: { x: 940, y: 1690 },
      draw(x, t, S) {
        shadow(x, 330, 1150, 230); shadow(x, 740, 1150, 230)
        const shiver = S.u < 1.3 ? 6 * Math.sin(t * 50) : 0
        const warm = S.u > 1.3
        const g = { x: 740 + shiver, y: 960, s: 230, mood: warm ? (S.u > 1.9 ? 'heart' : 'wide') : 'squint', look: [-1, 0], hops: [S.t0 + 1.32], blush: warm ? 1 : 0 }
        GEM(x, t, g)
        if (warm) withProps(x, t, g, () => scarfOn(x, null, '#e8344e', '#ffd0d8'))
        const c = { x: 330, y: 960, s: 240, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.7] }
        CAP(x, t, c)
        withProps(x, t, c, () => scarfOn(x, null, '#e8344e', '#ffd0d8'))
        // the spare scarf, pulled out and handed over
        const pk = pop01(t, S.t0 + 0.7, 0.3, 2.4), hand = ease.inOutCubic(prog(S.u, 1.0, 1.3))
        if (pk > 0.01 && !warm) { x.save(); x.translate(lerp(470, 640, hand), lerp(900, 930, hand)); x.rotate(-0.3 + 0.3 * hand); x.scale(pk, pk); box(x, -80, -16, 160, 32, '#e8344e', { b: 5 }); for (let i = -70; i < 80; i += 28) R(x, '#ffd0d8', i, -16, 8, 32); x.restore() }
        if (!warm) label(x, 'brrr', 860, 800, { size: 38, col: '#bfe8ff', rot: 0.1 })
        hearts(x, t, S.t0 + 1.95, 740, 820, { n: 6 })
        bubble(x, t, 360, 690, S.t0 + 0.45, S.t0 + 1.9, 'brought a spare.', { size: 36, tail: -0.3 })
        bubble(x, t, 420, 690, S.t0 + 1.95, S.t1, 'in case you forgot yours.', { size: 34, tail: -0.4 })
      },
      cues: [['pop', 0.72, 880, 0.035, -0.3], ['whoosh', 1.0, 0.3, 0.025], ['pop', 1.32, 1318.51, 0.04, 0.3], ['pluck', 1.96, 1174.66, 0.04, 0.5, 0.3], ['pluck', 2.08, 1567.98, 0.035, 0.5, 0.3]] },
  ],
  finale(x, t, { ok }) {
    shadow(x, 400, 1060, 220 * ok); shadow(x, 680, 1070, 200 * ok)
    const c = { x: 420, y: 880, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: [11.4, 11.9] }
    CAP(x, t, c); withProps(x, t, c, () => scarfOn(x, null, '#e8344e', '#ffd0d8'))
    const g = { x: 680, y: 900, s: 220, pop: ok, mood: 'heart', look: [-1, 0], hops: [11.5, 13.5] }
    GEM(x, t, g); withProps(x, t, g, () => scarfOn(x, null, '#e8344e', '#ffd0d8'))
  },
  hookCues: [['pop', 0.55, 880, 0.03, 0], ['pop', 1.25, 987.77, 0.03, 0], ['pop', 1.9, 1174.66, 0.03, 0]],
  last: 'Cozy is a *plan*, not a mood.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, GOLD]
