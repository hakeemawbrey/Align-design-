// nrde03: RATE MY DATE IDEA, "Gemini plans a bookshop swap" (16 s vertical trial reel, music: jazzy · F).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Pick a book *for each other.*”  ♊ Gemini bounces in front of a bookshelf, arms full of books.
//   2.6–5.8   THE PLAN "one book? I picked *nine.*"  Gemini's stack for the ♒ Aquarius date grows, wobbling; BOOKS: 9.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "their pick: *one tiny book.*"  The date holds out one small book; Gemini reads the
//             cover ("for people who talk a lot and mean it"), goes quiet, then heart-eyed.
//   9.32      THE STARS RATE IT 10/10 *they get you*.  Pisces: 11/10.   9.8 THE STARS: "Choose one. *Mean* it."
import { makeDate, R, box, bubble, shadow, hearts, card, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

const SPINES = ['#e8605c', '#4f7cd8', '#9fd36a', '#f2c75c', '#c9a6ff', '#ff8fb1', '#3fb08a', '#f39a3a', '#7fd0ff']
function shelf(x, y0 = 560, y1 = 1320) {
  box(x, 90, y0, 900, y1 - y0, '#5a3d2a', { b: 8 })
  for (let r = 0; r < 4; r++) {
    const sy = y0 + 20 + r * ((y1 - y0 - 40) / 4), h = (y1 - y0 - 40) / 4
    R(x, '#3b271b', 104, sy, 872, h - 14)
    let cx = 110
    for (let i = 0; cx < 960; i++) { const w = 26 + ((i * 7 + r * 3) % 4) * 8, hh = h - 30 - ((i * 5 + r) % 3) * 14; R(x, INK, cx, sy + h - 14 - hh, w, hh); R(x, SPINES[(i + r * 2) % 9], cx + 3, sy + h - 14 - hh + 3, w - 6, hh - 3); cx += w + 2 }
    R(x, '#7a5638', 96, sy + h - 14, 888, 14)
  }
  x.save(); x.globalAlpha = 0.55; R(x, '#05030c', 90, y0, 900, y1 - y0); x.restore()
}
function stack(x, cx, by, n, wob = 0) {
  for (let i = 0; i < n; i++) {
    const w = 170 - (i % 3) * 18, sx = cx + Math.sin(i * 1.7) * 14 + wob * i * i * 0.6
    box(x, sx - w / 2, by - (i + 1) * 40, w, 32, SPINES[i % 9], { b: 4 })
    R(x, BONE, sx - w / 2 + 10, by - (i + 1) * 40 + 8, w - 20, 4)
  }
}

const EP = makeDate({
  id: 'nrde03', sign: 'gemini', date: 'aquarius', accent: '#ffd36b', deep: '#a7740f',
  idea: 'Pick a book *for each other.*',
  hook(x, t, S) {
    shelf(x, 600, 1360)
    shadow(x, 520, 1370, 340)
    const o = { x: 430, y: 1100, s: 300, mood: 'happy', look: [0, 0], hops: S.HOOK_HOPS }
    S.hero(x, t, o)
    stack(x, 760 + Math.sin(t * 5) * 6, 1350, 6, Math.sin(t * 6) * 0.8)
  },
  beats: [
    { caption: 'one book? they picked *nine.*', draw(x, t, S) {
      const { u, hero, date } = S
      shelf(x, 560, 1320)
      const n = Math.min(9, 1 + Math.floor(u / 0.3))
      shadow(x, 300, 1250, 200)
      hero(x, t, { x: 300, y: 1090, s: 220, mood: 'sparkle', look: [1, -0.4], hops: Array.from({ length: 9 }, (_, i) => S.t0 + i * 0.3) })
      stack(x, 560, 1300, n, Math.sin(t * 7) * (n / 9) * 1.2)
      shadow(x, 830, 1250, 180)
      date(x, t, { x: 830, y: 1100, s: 200, mood: n > 6 ? 'wide' : 'neutral', look: [-1, -0.6], hops: [S.t0 + 2.2] })
      card(x, 820, 700, 230, 84, `BOOKS: ${n}`, { size: 44, rot: 0.05, k: pop01(t, S.t0 + 0.2, 0.3, 2.4) })
    }, cues: Array.from({ length: 9 }, (_, i) => ['tick', +(i * 0.3).toFixed(2), 0.045]) },
    { caption: 'their pick: *one tiny book.*', draw(x, t, S) {
      const { u, hero, date } = S
      shelf(x, 560, 1320)
      shadow(x, 330, 1250, 200); shadow(x, 760, 1250, 190)
      const quiet = u > 1.1
      hero(x, t, { x: 330, y: 1080, s: 230, mood: u < 1.1 ? 'wide' : u < 2.0 ? 'sparkle' : 'heart', look: [1, 0.3], hops: u > 2.0 ? [S.t0 + 2.05] : [], bob: quiet ? 0 : undefined })
      date(x, t, { x: 760, y: 1090, s: 210, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.2] })
      // the tiny book, held out
      const k = pop01(t, S.t0 + 0.25, 0.3, 2.4), bx = lerp(640, 540, ease.inOutCubic(prog(u, 0.3, 0.9)))
      if (k > 0.01) { x.save(); x.translate(bx, 980); x.scale(k, k); box(x, -46, -60, 92, 120, '#4f7cd8', { b: 5 }); R(x, GOLD, -30, -40, 60, 8); R(x, GOLD, -30, -24, 40, 6); x.restore() }
      card(x, 540, 720, 640, 120, 'for people who talk a lot\nand mean every word', { size: 34, k: pop01(t, S.t0 + 1.0, 0.3, 2.2), rot: -0.02 })
      bubble(x, t, 330, 860, S.t0 + 1.25, S.t0 + 2.0, '…', { size: 40 })
      hearts(x, t, S.t0 + 2.1, 330, 900, { n: 6 })
    }, cues: [['pop', 0.27, 880, 0.04, 0.3], ['pop', 1.02, 1174.66, 0.04, 0], ['pluck', 2.08, 1318.51, 0.04, -0.3, 0.3], ['pluck', 2.2, 1760, 0.035, -0.3, 0.3]] },
  ],
  score: '10/10', word: 'they get you',
  last: 'Choose one. *Mean* it.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void PINK
