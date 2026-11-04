// nrde23: RATE MY DATE IDEA, "Aquarius plans a time capsule" (18 s vertical trial reel, music: synthwave · Gm).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A time capsule. Open it *next winter.*”  ♒ Aquarius drops odd things into a shiny tin.
//   2.6–5.8   THE PLAN "a spoon. a ticket. *A duck.*"  Three things arc into the tin, one by one; the ♊
//             Gemini date: "…why the duck?"  Aquarius: "future us will know."
//   5.8       card cut.
//   5.8–9.3   BUT… "two notes: *for us, next year.*"  Each writes a folded note; both notes drop in; they press the lid
//             on together: SEALED.
//   9.32      THE STARS RATE IT 9/10 *future us*.  Pisces: 10/10.   9.8 THE STARS: "Write it down. *Keep* the promise."
import { makeDate, R, box, bubble, shadow, hearts, card, drawBits, sparkles, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function tin(x, cx, by, lid = 0, k = 1) {
  x.save(); x.translate(cx, by); x.scale(k, k)
  box(x, -120, -170, 240, 170, '#c9cfe0', { b: 7, hi: '#ffffff' }); R(x, '#9fa6c4', -120, -60, 240, 14); R(x, '#7fd0ff', -60, -130, 120, 40)
  x.font = "800 24px Inter"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US', 0, -110)
  const ly = -170 - (1 - lid) * 150, lr = (1 - lid) * -0.4
  x.save(); x.translate(-100 * (1 - lid), ly); x.rotate(lr); box(x, -132, -24, 264, 30, '#e1e5f2', { b: 7 }); x.restore()
  x.restore()
}
const DUCK = ['..YY...', '.YYYYO.', '.YKYY..', 'YYYYYYY', 'YYYYYYY', '.YYYYY.']
function duck(x, cx, cy, s = 10) { drawBits(x, DUCK, { Y: '#ffd84a', O: '#ff8a3a', K: INK }, cx, cy, s) }
function spoon(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); R(x, INK, -6, -50, 12, 80); R(x, '#d9dce8', -3, -48, 6, 76); x.beginPath(); x.ellipse(0, -60, 20, 26, 0, 0, Math.PI * 2); x.fillStyle = INK; x.fill(); x.beginPath(); x.ellipse(0, -60, 14, 20, 0, 0, Math.PI * 2); x.fillStyle = '#d9dce8'; x.fill(); x.restore() }
function ticket(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -50, -26, 100, 52, '#ff8fb1', { b: 5 }); R(x, INK, 14, -26, 4, 52); x.restore() }
function note(x, cx, cy, rot, col = BONE) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -40, -30, 80, 60, col, { b: 5 }); R(x, '#d8205e', -26, -14, 52, 5); R(x, '#d8205e', -26, 2, 40, 5); x.restore() }
function arc(p, x0, y0, x1, y1, hgt = 260) { return [lerp(x0, x1, p), lerp(y0, y1, p) - hgt * Math.sin(Math.PI * p)] }

const EP = makeDate({
  id: 'nrde23', sign: 'aquarius', date: 'gemini', accent: '#7fd0ff', deep: '#1f6aa8',
  idea: 'A time capsule. Open it *next winter.*',
  hook(x, t, S) {
    R(x, '#2a2148', 0, 1330, 1080, 190); R(x, '#3a2f62', 0, 1330, 1080, 8)
    tin(x, 740, 1330, 0, 1.1)
    const p = ((t + 0.3) % 1.3) / 1.3
    const [dx, dy] = arc(p, 470, 980, 740, 1180, 200)
    duck(x, dx, dy, 15)
    shadow(x, 360, 1340, 220)
    S.hero(x, t, { x: 360, y: 1110, s: 280, mood: 'sparkle', look: [1, 0], hops: S.HOOK_HOPS })
  },
  beats: [
    { caption: 'a spoon. a ticket. *A duck.*', draw(x, t, S) {
      const { u, hero, date } = S
      R(x, '#2a2148', 0, 1180, 1080, 140); R(x, '#3a2f62', 0, 1180, 1080, 8)
      tin(x, 540, 1180, 0)
      const items = [[0.0, (a, b) => spoon(x, a, b, u * 6)], [0.6, (a, b) => ticket(x, a, b, u * 4)], [1.2, (a, b) => duck(x, a, b, 9)]]
      items.forEach(([d, fn]) => { const p = prog(u, d, d + 0.55); if (p > 0 && p < 1) { const [a, b] = arc(p, 260, 900, 540, 1060); fn(a, b) } })
      shadow(x, 220, 1190, 150); shadow(x, 870, 1190, 150)
      hero(x, t, { x: 220, y: 1040, s: 170, mood: 'happy', look: [1, -0.3], hops: [S.t0, S.t0 + 0.6, S.t0 + 1.2, S.t0 + 2.4] })
      date(x, t, { x: 870, y: 1040, s: 160, mood: u < 1.6 ? 'neutral' : 'squint', look: [-1, 0] })
      bubble(x, t, 820, 820, S.t0 + 1.7, S.t1, '…why the duck?', { size: 32, tail: 0.3 })
      bubble(x, t, 260, 760, S.t0 + 2.3, S.t1, 'future us will know.', { size: 30, tail: -0.3 })
    }, cues: [['whoosh', 0.0, 0.5, 0.025], ['tick', 0.55, 0.05], ['whoosh', 0.6, 0.5, 0.025], ['tick', 1.15, 0.05], ['whoosh', 1.2, 0.5, 0.025], ['pop', 1.75, 1318.51, 0.04, 0], ['pop', 1.72, 659.25, 0.03, 0.3], ['pop', 2.32, 880, 0.03, -0.3]] },
    { caption: 'two notes: *for us, next year.*', draw(x, t, S) {
      const { u, hero, date } = S
      R(x, '#2a2148', 0, 1180, 1080, 140); R(x, '#3a2f62', 0, 1180, 1080, 8)
      const lid = ease.outBack ? ease.outCubic(prog(u, 1.7, 2.1)) : prog(u, 1.7, 2.1)
      tin(x, 540, 1180, lid)
      ;[[0.4, 300, BONE], [0.8, 780, '#ffd6e4']].forEach(([d, sx, c], i) => { const p = prog(u, d, d + 0.5); if (p < 1) { const [a, b] = p <= 0 ? [sx, 860] : arc(p, sx, 860, 540, 1060, 120); note(x, a, b, i ? 0.2 : -0.2, c) } })
      shadow(x, 330, 1190, 150); shadow(x, 750, 1190, 150)
      hero(x, t, { x: 330, y: 1040, s: 160, mood: u < 1.7 ? 'happy' : 'heart', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 1.7] })
      date(x, t, { x: 750, y: 1040, s: 160, mood: u < 1.7 ? 'happy' : 'heart', look: [-1, 0], hops: [S.t0 + 0.8, S.t0 + 1.75] })
      card(x, 540, 760, 260, 84, 'SEALED', { size: 48, col: GOLD, k: pop01(t, S.t0 + 2.1, 0.3, 2.6), rot: -0.05 })
      sparkles(x, t, 540, 1000, S.t0 + 2.1, 10, 160, 1)
      hearts(x, t, S.t0 + 2.3, 540, 960, { n: 5 })
    }, cues: [['whoosh', 0.4, 0.5, 0.025], ['whoosh', 0.8, 0.5, 0.025], ['tick', 2.1, 0.09], ['tom', 2.1, 140, { gain: 0.18, decay: 0.2 }], ['pop', 2.12, 1318.51, 0.05, 0], ['glitter', 2.12, 2.5]] },
  ],
  score: '9/10', word: 'future us',
  last: 'Write it down. *Keep* the promise.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
