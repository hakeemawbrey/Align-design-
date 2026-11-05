// kaue12 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E12 "Pisces named the houseplant" (15 s, dreamy · Ab, hard cut).
//   Pisces is the hero this time, so there is no spectator cam: Pisces cries on screen the whole film (happy tears).
//   0.0  Frame 0: Pisces mid-gasp, nose to a tiny new leaf, tears already flying. Hook "New leaf. Pisces is *not* okay."
//   0.7  record scratch freeze: "a new *leaf.*"   2.6 ★ NEW LEAF · +1 FAMILY MEMBER
//   4.6  the name tag: MR. LEAF · "hi, Mr. Leaf. i’m your parent now."   6.4 a tiny scarf → 7.2 ★ PLANT PARENT LV 2
//   9.0  happy tears water the pot; 9.8 a second leaf pops: "we’re a family."
//   12.6 last line "Single? *I* have a family." · hard cut at 15.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, prog, ease, lerp, clamp, INK, BONE, GOLD, RED } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawPiscesHome } from '../../st9pisceshome.js'

const PX = 720, PY = 1250
function plant(x, t) {
  x.save(); x.translate(PX, PY + 270); x.scale(1.5, 1.5); x.translate(-PX, -(PY + 270))
  // stool + pot
  box(x, PX - 90, PY + 60, 180, 30, '#8a5a3a', { b: 6 }); box(x, PX - 70, PY + 90, 20, 180, '#6a4a2a', { b: 4 }); box(x, PX + 50, PY + 90, 20, 180, '#6a4a2a', { b: 4 })
  box(x, PX - 70, PY - 40, 140, 100, '#e08a52', { b: 6, hi: '#f0a26a' })
  // the stem and the leaves
  R(x, INK, PX - 7, PY - 170, 14, 134); R(x, '#4fae6a', PX - 3, PY - 166, 6, 128)
  const leaf = (lx, ly, s, dir) => { x.save(); x.translate(lx, ly); x.scale(s * dir, s); box(x, 0, -22, 70, 40, '#4fae6a', { b: 5, hi: '#7fd08a' }); R(x, '#3a8a4a', 8, -3, 54, 4); x.restore() }
  leaf(PX, PY - 150, 1, -1); leaf(PX, PY - 110, 1, 1)
  // the NEW leaf (tiny, glowing), then the second new one at 9.8
  const g = 0.55 + 0.05 * Math.sin(t * 5)
  leaf(PX, PY - 172, g, 1)
  const k2 = ease.outBack(prog(t, 9.8, 10.2)); if (k2 > 0) leaf(PX, PY - 80, 0.5 * k2, -1)
  // name tag
  const nt = ease.outBack(prog(t, 4.6, 4.95)); if (nt > 0) { x.save(); x.translate(PX, PY + 12); x.rotate(-0.06); x.scale(nt, nt); box(x, -70, -20, 140, 40, BONE, { b: 4 }); label(x, 'MR. LEAF', 0, 1, { size: 24, col: INK }); x.restore() }
  // the tiny scarf
  const sc = ease.outBack(prog(t, 6.4, 6.8)); if (sc > 0) { x.save(); x.translate(PX, PY - 124); x.scale(sc, sc); box(x, -22, -8, 44, 16, RED, { b: 3 }); box(x, 8, 4, 12, 30, RED, { b: 3 }); R(x, BONE, -14, -6, 6, 12); R(x, BONE, 2, -6, 6, 12); x.restore() }
  x.restore()
}
function scene(x, t) {
  daySky(x, t, { hour: 9 })
  drawPiscesHome(x, t, { room: 'window' })
  plant(x, t)
  const gasp = t < 0.7
  hero(x, t, 'pisces', 380, 1170, 350, { mood: gasp ? 'wide' : t < 4.6 ? 'sparkle' : t < 9 ? 'happy' : 'sparkle', look: [1, -1], tears: t < 2.6 ? 3 : t < 9 ? 2 : 3, squash: gasp ? -0.12 : 0, seed: 12, hops: [2.7, 4.7, 5.1, 7.3, 9.9], blink: gasp ? false : undefined })
  // tears arcing into the pot (9.0–9.8)
  if (t > 9.0 && t < 10.0) for (let k = 0; k < 6; k++) { const ph = ((t - 9) * 1.6 + k / 6) % 1; R(x, '#8fe3ff', lerp(480, PX, ph), 1100 - Math.sin(Math.PI * ph) * 160 + ph * 140, 12, 16) }
  sparkles(x, t, PX + 20, PY - 120, 2.6, 10, 140, 0.2)
  sparkles(x, t, PX, PY - 20, 9.9, 10, 160, 0.7)
  hearts(x, t, 10.3, 540, 1000, { n: 7 })
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 15, ending: 'cut', key: 'Ab',
  shots: [{ at: 0, cam: [1.55, 560, 1120] }, { at: 4.4, cam: [1.3, 560, 1130] }, { at: 8.8, cam: [1.5, 580, 1130] }],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 560, cy: 1100 }, { at: 4.4, from: 1.3 }],
  freezes: [{ at: 0.7, dur: 1.4, text: 'a new *leaf.*', sub: 'day 41 of plant parenthood', top: 1520 }],
  hook: { text: 'New leaf. | Pisces is *not* okay.', out: 0.7 },
  bubbles: [
    { at: 4.9, out: 6.3, x: 470, y: 900, text: 'hi, Mr. Leaf. i’m your parent now.', size: 34, tail: -0.2 },
    { at: 10.3, out: 12.2, x: 470, y: 900, text: 'we’re a family.', size: 44, tail: -0.2 },
  ],
  achs: [
    { at: 2.6, out: 4.3, title: 'NEW LEAF · +1 FAMILY MEMBER', xp: 200, size: 38, icon: 'heart' },
    { at: 7.2, out: 8.9, title: 'PLANT PARENT · LV 2', xp: 300, icon: 'star' },
  ],
  last: { at: 12.6, text: 'Single? | *I* have a family.', top: 330 },
})
