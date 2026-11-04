// nrde18: RATE MY DATE IDEA, "Virgo plans a gift-wrapping shift" (16 s vertical trial reel, music: chiptune · C).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Date idea: we wrap gifts for the *toy drive.*”  ♍ Virgo lines up a box with a ruler, perfectly.
//   2.6–5.8   THE PLAN "perfect corners. *one* per minute."  Virgo's single, flawless gift; a timer ticks; the ♈ Aries
//             date's pile of lumpy wraps grows beside it: 1, 2, 3, 4, 5…
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their wraps are *lumpy.* and fast."  Virgo looks at the lumpy pile… laughs, and sticks a label on
//             it: MADE WITH LOVE. The whole lumpy pile goes into the toy-drive bin.
//   9.32      THE STARS RATE IT 10/10 *kind*.  Pisces: 11/10.   9.8 THE STARS: "Doing good *together* counts as a date."
import { makeDate, R, box, bubble, shadow, hearts, card, table, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, RED } from '../../nrde01/scenes/datekit.js'

const PAPER = ['#e8344e', '#3fb08a', '#4f7cd8', '#f2c75c', '#c9a6ff']
function gift(x, cx, by, w, h, col, { ribbon = GOLD, lumpy = 0, rot = 0 } = {}) {
  x.save(); x.translate(cx, by); x.rotate(rot)
  if (!lumpy) { box(x, -w / 2, -h, w, h, col, { b: 5 }); R(x, ribbon, -6, -h, 12, h); R(x, ribbon, -w / 2, -h / 2 - 6, w, 12); box(x, -22, -h - 18, 18, 18, ribbon, { b: 3 }); box(x, 4, -h - 18, 18, 18, ribbon, { b: 3 }) }
  else {
    x.fillStyle = INK; x.beginPath(); x.moveTo(-w / 2 - 6, 4); x.lineTo(-w / 2 + 6, -h - 4); x.lineTo(-6, -h - 14); x.lineTo(w / 2 - 2, -h + 6); x.lineTo(w / 2 + 6, 4); x.closePath(); x.fill()
    x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2, -2); x.lineTo(-w / 2 + 10, -h + 2); x.lineTo(-6, -h - 8); x.lineTo(w / 2 - 6, -h + 10); x.lineTo(w / 2, -2); x.closePath(); x.fill()
    R(x, '#ffffff', -w / 4, -h / 2, w / 2, 8); R(x, BONE, w / 2 - 20, -h - 6, 26, 10)
  }
  x.restore()
}
function ruler(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -150, -18, 300, 36, '#f2d16b', { b: 5 }); for (let i = 0; i < 15; i++) R(x, INK, -140 + i * 20, -18, 3, i % 5 ? 10 : 18); x.restore() }
function bin(x, cx, by, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, by); x.scale(k, k); box(x, -150, -170, 300, 170, '#4f7cd8', { b: 6, hi: '#7fa0ea' }); x.font = "800 30px Inter"; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TOY DRIVE', 0, -90); x.restore() }

const EP = makeDate({
  id: 'nrde18', sign: 'virgo', date: 'aries', accent: '#9fe6b0', deep: '#2f7a4a',
  idea: 'Date idea: we wrap gifts for the *toy drive.*',
  hook(x, t, S) {
    table(x, 540, 1330, 960, '#6b4a2f')
    gift(x, 720, 1326, 220, 150, PAPER[1])
    ruler(x, 720, 1140 + Math.sin(t * 4) * 6, -0.05 + Math.sin(t * 3) * 0.04)
    shadow(x, 330, 1340, 220)
    S.hero(x, t, { x: 330, y: 1110, s: 280, mood: 'squint', look: [1, 0.6], hops: S.HOOK_HOPS })
  },
  beats: [
    { caption: 'perfect corners. *One* per minute.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      gift(x, 300, 1176, 200, 140, PAPER[1])
      const n = Math.min(6, 1 + Math.floor(u / 0.45))
      for (let i = 0; i < n; i++) gift(x, 640 + (i % 3) * 110, 1176 - Math.floor(i / 3) * 105, 110, 90, PAPER[(i + 2) % 5], { lumpy: 1, rot: (i % 2 ? 0.12 : -0.1) })
      card(x, 300, 820, 200, 70, '1:00', { size: 40, k: pop01(t, S.t0 + 0.2, 0.3, 2.4) })
      card(x, 750, 760, 200, 70, `${n}!!`, { size: 40, col: GOLD, k: pop01(t, S.t0 + 0.4, 0.3, 2.4), rot: 0.06 })
      hero(x, t, { x: 160, y: 980, s: 150, mood: u < 1.6 ? 'squint' : 'wide', look: [1, 0.5], hops: [S.t0 + 1.6] })
      date(x, t, { x: 960, y: 960, s: 150, mood: 'happy', look: [-1, 0.5], hops: Array.from({ length: 6 }, (_, i) => S.t0 + i * 0.45) })
    }, cues: Array.from({ length: 6 }, (_, i) => ['pop', +(i * 0.45).toFixed(2), [880, 987.77, 1174.66, 1318.51, 1567.98, 1760][i], 0.03, 0.3]).concat([['tick', 0.2, 0.05], ['tick', 1.2, 0.05], ['tick', 2.2, 0.05]]) },
    { caption: 'their wraps are *lumpy.* And fast.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 1000, '#6b4a2f')
      // the lumpy pile slides into the toy-drive bin at the end
      const go = ease.inOutCubic(prog(u, 2.0, 2.6))
      bin(x, 860, 1176, pop01(t, S.t0 + 1.8, 0.3, 2))
      for (let i = 0; i < 6; i++) gift(x, lerp(330 + (i % 3) * 110, 860, go), lerp(1176 - Math.floor(i / 3) * 105, 1010, go), 110, 90, PAPER[(i + 2) % 5], { lumpy: 1, rot: (i % 2 ? 0.12 : -0.1) })
      card(x, 440, 880, 340, 70, 'MADE WITH LOVE', { size: 32, col: '#ffd6e4', ink: RED, k: pop01(t, S.t0 + 1.0, 0.3, 2.6) * (1 - go), rot: -0.06 })
      shadow(x, 150, 1180, 140); shadow(x, 620, 1180, 0)
      hero(x, t, { x: 150, y: 1030, s: 160, mood: u < 0.7 ? 'squint' : 'happy', look: [1, 0.2], hops: [S.t0 + 0.7, S.t0 + 0.95, S.t0 + 1.2] })
      date(x, t, { x: 720, y: 870, s: 140, mood: u < 1.0 ? 'neutral' : 'heart', look: [-1, 0.6], hops: [S.t0 + 1.05] })
      bubble(x, t, 190, 800, S.t0 + 0.75, S.t0 + 1.9, 'ha! I love them.', { size: 32 })
      hearts(x, t, S.t0 + 2.6, 860, 900, { n: 5 })
    }, cues: [['pop', 0.72, 987.77, 0.035, -0.3], ['pop', 1.02, 1318.51, 0.05, 0], ['pop', 1.82, 880, 0.04, 0.3], ['whoosh', 2.0, 0.5, 0.035], ['tick', 2.55, 0.05], ['pluck', 2.6, 1567.98, 0.035, 0.3, 0.3]] },
  ],
  score: '10/10', word: 'kind',
  last: 'Doing good *together* counts as a date.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK]
