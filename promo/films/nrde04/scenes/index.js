// nrde04: RATE MY DATE IDEA, "Cancer builds a pillow fort" (16 s vertical trial reel, music: dreamy · Ab).
// Story 0–13.6, then the short 2.4 s end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A pillow fort. Two mugs. One *long* talk.”  ♋ Cancer drags a giant striped blanket across the floor.
//   2.6–5.8   THE PLAN "first a fort. then a *tunnel.* then a *tower.*"  The fort grows: walls, a tunnel, a tower, a flag.
//   5.8       jump cut (flash + zoom punch; no card transition).
//   5.8–9.3   BUT… "the fort *falls in.*"  The blanket sags and drops on Cancer and the ♏ Scorpio date; two heads pop out,
//             laughing; the two mugs, held high, didn't spill a drop.
//   9.32      THE STARS RATE IT 9/10 *structurally unsound*.  Pisces: 10/10.   9.8 THE STARS: "The fort falls. The *talk* stays."
import { makeDate, R, box, bubble, shadow, hearts, card, mug, floor, fairyLights, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

const STRIPE = ['#ff8fb1', '#ffd6e4']
function blanket(x, x0, y0, w, h, { sag = 0, rot = 0 } = {}) {
  x.save(); x.translate(x0 + w / 2, y0); x.rotate(rot)
  R(x, INK, -w / 2 - 6, -6, w + 12, h + 12)
  for (let i = 0; i < 8; i++) { const sx = -w / 2 + (i * w) / 8; R(x, STRIPE[i % 2], sx, 0 + sag * Math.sin(Math.PI * (i + 0.5) / 8), w / 8 + 1, h - sag * Math.sin(Math.PI * (i + 0.5) / 8)) }
  x.restore()
}
function pillow(x, cx, cy, w, h, col) { box(x, cx - w / 2, cy - h / 2, w, h, col, { b: 6, hi: 'rgba(255,255,255,0.3)' }) }
function flag(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -4, -120, 8, 120); R(x, GOLD, 4, -120 + Math.sin(t * 6) * 3, 70, 44); R(x, INK, 4, -120, 70, 4)
  x.restore()
}
function room(x, t) { floor(x, 1150, '#2a2148', '#3a2f62', 170); fairyLights(x, t, 60, 600, 1020, 600, { n: 13, sag: 70 }) }

const EP = makeDate({
  id: 'nrde04', sign: 'cancer', date: 'scorpio', accent: '#cfe0ff', deep: '#3a5ea8',
  idea: 'A pillow fort. Two mugs. One *long* talk.',
  hook(x, t, S) {
    fairyLights(x, t, 60, 640, 1020, 640, { n: 13, sag: 70 })
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    // the blanket trails behind Cancer, who pulls it to the right
    const pull = Math.sin(t * 3) * 20
    blanket(x, 40 + pull, 1190, 600, 150, { sag: 34, rot: -0.03 })
    shadow(x, 760 + pull, 1340, 240)
    S.hero(x, t, { x: 760 + pull, y: 1110, s: 300, mood: 'squint', look: [1, 0], hops: S.HOOK_HOPS, squash: -0.05 })
  },
  hookPis: { x: 940, y: 1690 },
  beats: [
    { caption: 'a fort. then a *tunnel.* then a *tower.*', draw(x, t, S) {
      const { u, hero } = S
      room(x, t)
      const k1 = pop01(t, S.t0 + 0.1, 0.3, 2), k2 = pop01(t, S.t0 + 0.9, 0.3, 2), k3 = pop01(t, S.t0 + 1.7, 0.3, 2)
      // walls + roof
      if (k1 > 0.01) { pillow(x, 300, 1080, 120, 150, '#9fd8f6'); pillow(x, 720, 1080, 120, 150, '#c9a6ff'); blanket(x, 230, 960 - 30 * k1, 560, 70, { sag: 16 }) }
      // tunnel
      if (k2 > 0.01) { x.save(); x.translate(840, 1100); x.scale(k2, k2); R(x, INK, 0, -70, 200, 130); R(x, '#ffd6e4', 6, -64, 188, 118); R(x, '#4a2a4a', 40, -30, 120, 90); x.restore() }
      // tower
      if (k3 > 0.01) { x.save(); x.translate(300, 1000); x.scale(k3, k3); pillow(x, 0, -110, 110, 110, '#f2c75c'); pillow(x, 0, -220, 100, 100, '#9fe6b0'); x.restore(); flag(x, t, 300, 730, pop01(t, S.t0 + 2.3, 0.3, 2.6)) }
      shadow(x, 520, 1150, 200)
      hero(x, t, { x: 520, y: 1020, s: 200, mood: 'sparkle', look: [0, -1], hops: [S.t0 + 0.1, S.t0 + 0.9, S.t0 + 1.7, S.t0 + 2.3] })
      card(x, 760, 700, 260, 84, 'FORT v3', { size: 44, rot: 0.05, k: pop01(t, S.t0 + 1.7, 0.3, 2.4) })
      void u
    }, cues: [['pop', 0.1, 880, 0.04, -0.3], ['pop', 0.9, 1174.66, 0.04, 0.3], ['pop', 1.7, 1318.51, 0.04, -0.3], ['pluck', 2.3, 1760, 0.04, 0, 0.3]] },
    { caption: 'the fort *falls in.*', draw(x, t, S) {
      const { u, hero, date } = S
      room(x, t)
      const fall = ease.inCubic(prog(u, 0.5, 0.85))
      const heads = pop01(t, S.t0 + 1.3, 0.35, 2.6)
      // the two of them inside, seen at first (before the fall)
      if (fall < 1) {
        pillow(x, 290, 1080, 120, 150, '#9fd8f6'); pillow(x, 790, 1080, 120, 150, '#c9a6ff')
        shadow(x, 450, 1150, 170); shadow(x, 630, 1150, 170)
        hero(x, t, { x: 450, y: 1030, s: 170, mood: 'happy', look: [1, 0] })
        date(x, t, { x: 630, y: 1030, s: 170, mood: u < 0.5 ? 'happy' : 'wide', look: [-1, -1] })
        blanket(x, 220, lerp(900, 1060, fall), 640, lerp(70, 110, fall), { sag: lerp(16, 60, prog(u, 0.2, 0.5)) })
      } else {
        // collapsed heap with two heads popping out, laughing
        R(x, INK, 150, 1060, 780, 100)
        for (let i = 0; i < 10; i++) R(x, STRIPE[i % 2], 156 + i * 77, 1066 - 30 * Math.sin(Math.PI * (i + 0.5) / 10), 77, 88 + 30 * Math.sin(Math.PI * (i + 0.5) / 10))
        if (heads > 0.01) {
          hero(x, t, { x: 410, y: 1000 - 30 * heads, s: 170, pop: heads, mood: 'happy', look: [1, 0], hops: [S.t0 + 1.7, S.t0 + 2.1, S.t0 + 2.5] })
          date(x, t, { x: 670, y: 1000 - 30 * heads, s: 170, pop: heads, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.85, S.t0 + 2.25, S.t0 + 2.65] })
        }
        // the mugs, held up high: safe
        const mk = pop01(t, S.t0 + 1.9, 0.3, 2.4)
        if (mk > 0.01) { mug(x, t, 300, 870, 1.1 * mk, '#e8605c'); mug(x, t, 790, 870, 1.1 * mk, '#4f7cd8'); card(x, 540, 690, 330, 80, 'MUGS: SAFE', { size: 40, k: mk, rot: -0.03 }) }
        hearts(x, t, S.t0 + 2.2, 540, 940, { n: 5 })
      }
      bubble(x, t, 540, 760, S.t0 + 0.15, S.t0 + 0.75, 'is it… leaning?', { size: 34 })
    }, cues: [['pop', 0.18, 880, 0.03, 0], ['whoosh', 0.45, 0.4, 0.04], ['boom', 0.86, 0.22], ['tom', 0.86, 110, { gain: 0.2, decay: 0.25 }], ['pop', 1.32, 1174.66, 0.04, -0.3], ['pop', 1.4, 1318.51, 0.04, 0.3], ['pluck', 1.92, 1567.98, 0.04, 0, 0.3]] },
  ],
  score: '9/10', word: 'structurally unsound',
  last: 'The fort falls. The *talk* stays.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK]
