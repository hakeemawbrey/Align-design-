// nrde22: RATE MY DATE IDEA, "Capricorn plans a goals whiteboard" (18 s vertical trial reel, music: lofi · B).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “New year date: our goals. On a *whiteboard.*”  ♑ Capricorn uncaps a marker at a big whiteboard.
//   2.6–5.8   THE PLAN "columns. arrows. *boxes.*"  The board fills: SAVE · LEARN · RUN, arrows, neat boxes; the ♎
//             Libra date tilts its head.
//   5.8       card cut.
//   5.8–9.3   BUT… "their date adds *kitchen dancing.*"  The date writes "dance in the kitchen" and "nap more";
//             Capricorn looks… and circles both in gold, twice.
//   9.32      THE STARS RATE IT 9/10 *soft goals count*.  Pisces: 10/10.   9.8 THE STARS: "Put *joy* on the list too."
import { makeDate, R, box, bubble, shadow, hearts, card, starFrame, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, MONO } from '../../nrde01/scenes/datekit.js'

function board(x, x0, y0, w, h) {
  box(x, x0, y0, w, h, '#f7f7fb', { b: 8 }); R(x, '#c9cfe0', x0, y0 + h - 14, w, 14)
  R(x, INK, x0 + 60, y0 + h + 8, 14, 150); R(x, INK, x0 + w - 74, y0 + h + 8, 14, 150)
}
function write(x, text, X, Y, p, { col = '#2a3a8a', size = 34, font = MONO } = {}) {
  const n = Math.floor(text.length * Math.max(0, Math.min(1, p)))
  if (n <= 0) return
  x.font = `700 ${size}px ${font}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = col; x.fillText(text.slice(0, n), X, Y)
}
function circle(x, cx, cy, rw, rh, p, col = GOLD) {
  if (p <= 0) return
  x.save(); x.strokeStyle = INK; x.lineWidth = 12; x.lineCap = 'round'; x.beginPath(); x.ellipse(cx, cy, rw, rh, -0.05, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.min(1, p)); x.stroke()
  x.strokeStyle = col; x.lineWidth = 7; x.stroke(); x.restore()
}
function marker(x, cx, cy, rot = 0.6, col = '#2a3a8a') { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -12, -60, 24, 90, '#ffffff', { b: 4 }); R(x, col, -12, -60, 24, 22); R(x, INK, -6, 30, 12, 14); x.restore() }

const EP = makeDate({
  id: 'nrde22', sign: 'capricorn', date: 'libra', accent: '#b9a6ff', deep: '#4a3a8a',
  idea: 'New year date: our goals. On a *whiteboard.*',
  hook(x, t, S) {
    board(x, 380, 720, 640, 440)
    write(x, 'GOALS:', 420, 800, (t + 1.0) / 1.4, { size: 64 })
    R(x, '#2a3a8a', 420, 850, Math.min(1, (t + 0.3) / 1.5) * 200, 6)
    const o = { x: 250, y: 1120, s: 280, mood: 'squint', look: [1, -0.4], hops: S.HOOK_HOPS }
    S.hero(x, t, o)
    marker(x, 440 + Math.sin(t * 5) * 12, 980, 0.7)
  },
  beats: [
    { caption: 'columns. arrows. *Boxes.*', draw(x, t, S) {
      const { u, hero, date } = S
      board(x, 90, 560, 900, 560)
      ;['SAVE', 'LEARN', 'RUN'].forEach((w, i) => { write(x, w, 140 + i * 290, 630, (u - i * 0.4) / 0.4, { size: 52 }); if (u > i * 0.4 + 0.4) { x.save(); x.strokeStyle = '#2a3a8a'; x.lineWidth = 6; x.strokeRect(130 + i * 290, 680, 220, 150 * Math.min(1, (u - i * 0.4 - 0.4) / 0.4)); x.restore() } })
      if (u > 1.6) for (let i = 0; i < 2; i++) { const p = Math.min(1, (u - 1.6 - i * 0.3) / 0.3); if (p > 0) { R(x, '#e8344e', 360 + i * 290, 752, 60 * p, 6); R(x, '#e8344e', 360 + i * 290 + 60 * p - 12, 740, 12, 30) } }
      write(x, 'done by spring', 140, 880, (u - 1.9) / 0.5, { size: 40, col: '#3f8a3a' })
      shadow(x, 200, 1300, 140); shadow(x, 900, 1300, 140)
      hero(x, t, { x: 180, y: 1180, s: 150, mood: 'squint', look: [1, -1], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 1.2, S.t0 + 1.6] })
      date(x, t, { x: 900, y: 1180, s: 150, mood: 'neutral', look: [-1, -1], squash: 0.05 * Math.sin(t * 2) })
    }, cues: [0, 0.4, 0.8, 1.6, 1.9].map((v, i) => ['tick', v, 0.045]).concat([['pop', 0.0, 880, 0.03, -0.3], ['pop', 0.4, 987.77, 0.03, 0], ['pop', 0.8, 1174.66, 0.03, 0.3]]) },
    { caption: 'their date adds *kitchen dancing.*', draw(x, t, S) {
      const { u, hero, date } = S
      board(x, 90, 560, 900, 560)
      ;['SAVE', 'LEARN', 'RUN'].forEach((w, i) => { write(x, w, 140 + i * 290, 630, 1, { size: 52 }); x.save(); x.strokeStyle = '#2a3a8a'; x.lineWidth = 6; x.strokeRect(130 + i * 290, 680, 220, 150); x.restore() })
      write(x, 'dance in the kitchen', 150, 910, (u - 0.2) / 0.8, { size: 64, col: '#d8205e', font: "'EB Garamond', serif" })
      write(x, 'nap more', 150, 1020, (u - 1.0) / 0.4, { size: 64, col: '#d8205e', font: "'EB Garamond', serif" })
      circle(x, 440, 910, 330, 56, (u - 1.5) / 0.4); circle(x, 280, 1020, 160, 52, (u - 1.9) / 0.35)
      shadow(x, 200, 1300, 140); shadow(x, 900, 1300, 140)
      hero(x, t, { x: 900, y: 1180, s: 150, mood: u < 1.5 ? 'wide' : 'heart', look: [-1, -1], hops: [S.t0 + 1.5, S.t0 + 1.9] })
      date(x, t, { x: 180, y: 1180, s: 150, mood: 'happy', look: [1, -1], hops: [S.t0 + 0.2, S.t0 + 1.0] })
      hearts(x, t, S.t0 + 2.3, 820, 1050, { n: 5 })
    }, cues: [['tick', 0.2, 0.04], ['tick', 1.0, 0.04], ['whoosh', 1.5, 0.4, 0.03], ['pop', 1.9, 1318.51, 0.045, 0], ['pluck', 2.3, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '9/10', word: 'soft goals count',
  last: 'Put *joy* on the list too.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, card, starFrame, lerp, ease, prog, pop01, bubble]
