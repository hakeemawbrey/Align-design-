// nrde09: RATE MY DATE IDEA, "Sagittarius plans a pottery class" (18 s vertical trial reel, music: synthwave · F#m).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “A pottery class. *Zero* experience.”  ♐ Sagittarius at a spinning wheel, clay wobbling wildly.
//   2.6–5.8   THE PLAN "go *fast.* how hard can it be?"  The wheel whirs; Sag's clay lump flies off and SPLATs on the
//             wall; the ♈ Aries date's lump wobbles too.
//   5.8       card cut.
//   5.8–9.3   BUT… "two very *lopsided* mugs."  Two wonky mugs on the table; they swap them and hold them up, delighted.
//   9.32      THE STARS RATE IT 9/10 *wobbly*.  Pisces: 10/10.   9.8 THE STARS: "Make something *badly*, together."
import { makeDate, R, box, bubble, shadow, hearts, card, table, floor, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

const CLAY = '#c98a5a', CLAYD = '#9a613a'
function wheel(x, t, cx, by, spin = 1) {
  box(x, cx - 120, by - 90, 240, 90, '#5a5470', { b: 6, hi: '#7a7496' })
  R(x, INK, cx - 140, by - 112, 280, 26); R(x, '#a8a2c4', cx - 134, by - 108, 268, 16)
  for (let i = 0; i < 4; i++) { const p = ((t * 3 * spin + i / 4) % 1); R(x, '#d9d4ee', cx - 130 + p * 260, by - 106, 18, 10) }
}
function lump(x, t, cx, by, w = 110, h = 90, wob = 1) {
  const sk = Math.sin(t * 14) * 18 * wob
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 6, by); x.quadraticCurveTo(cx + sk - 10, by - h - 30, cx + sk, by - h - 6); x.quadraticCurveTo(cx + sk + 10, by - h - 30, cx + w / 2 + 6, by); x.closePath(); x.fill()
  x.fillStyle = CLAY; x.beginPath(); x.moveTo(cx - w / 2, by); x.quadraticCurveTo(cx + sk - 10, by - h - 18, cx + sk, by - h); x.quadraticCurveTo(cx + sk + 10, by - h - 18, cx + w / 2, by); x.closePath(); x.fill()
}
function wonkyMug(x, t, cx, by, lean, col, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.rotate(lean); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-56, 0); x.lineTo(-66, -120); x.lineTo(50, -134); x.lineTo(60, 0); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-50, -6); x.lineTo(-58, -112); x.lineTo(44, -126); x.lineTo(54, -6); x.closePath(); x.fill()
  R(x, INK, 54, -96, 34, 60); R(x, col, 60, -88, 20, 44)
  R(x, 'rgba(255,255,255,0.35)', -40, -100, 12, 70)
  x.restore()
  void t
}
function splat(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [a, b, r] of [[0, 0, 46], [-50, -20, 20], [44, 26, 22], [10, -52, 16], [-30, 40, 14], [56, -30, 12]]) { x.beginPath(); x.arc(a, b, r + 5, 0, Math.PI * 2); x.fillStyle = INK; x.fill() }
  for (const [a, b, r] of [[0, 0, 46], [-50, -20, 20], [44, 26, 22], [10, -52, 16], [-30, 40, 14], [56, -30, 12]]) { x.beginPath(); x.arc(a, b, r, 0, Math.PI * 2); x.fillStyle = CLAY; x.fill() }
  x.restore()
}

const EP = makeDate({
  id: 'nrde09', sign: 'sagittarius', date: 'aries', accent: '#c9a6ff', deep: '#6a3fb0',
  idea: 'A pottery class. *Zero* experience.',
  hook(x, t, S) {
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    wheel(x, t, 720, 1330, 1.6)
    lump(x, t, 720, 1218, 130, 120, 1.4)
    for (let i = 0; i < 5; i++) { const p = (t * 1.4 + i / 5) % 1; R(x, CLAY, 720 + Math.cos(i * 2.3) * (60 + p * 260), 1130 - p * 200 + p * p * 260, 14, 14) }
    shadow(x, 360, 1340, 220)
    S.hero(x, t, { x: 360, y: 1120, s: 290, mood: 'wide', look: [1, 0.4], hops: S.HOOK_HOPS })
  },
  beats: [
    { caption: 'go *fast.* how hard can it be?', draw(x, t, S) {
      const { u, hero, date } = S
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      wheel(x, t, 330, 1180, 2.2); wheel(x, t, 760, 1180, 0.8)
      const fly = prog(u, 1.0, 1.4)
      if (u < 1.0) lump(x, t, 330, 1068, 110, 100, 1.6)
      else if (fly < 1) { const fx = lerp(330, 640, fly), fy = lerp(1000, 640, fly) - 120 * Math.sin(Math.PI * fly); R(x, INK, fx - 34, fy - 34, 68, 68); R(x, CLAY, fx - 28, fy - 28, 56, 56) }
      splat(x, 640, 640, pop01(t, S.t0 + 1.4, 0.15, 2))
      if (u > 1.4) card(x, 640, 780, 200, 74, 'SPLAT', { size: 40, col: GOLD, k: pop01(t, S.t0 + 1.42, 0.25, 2.6), rot: 0.08 })
      lump(x, t, 760, 1068, 100, 80, 0.6)
      shadow(x, 170, 1180, 150); shadow(x, 940, 1180, 150)
      hero(x, t, { x: 160, y: 1030, s: 170, mood: u < 1.4 ? 'happy' : 'wide', look: u < 1.4 ? [1, 0.5] : [1, -1], hops: [S.t0 + 0.4, S.t0 + 1.45] })
      date(x, t, { x: 950, y: 1030, s: 160, mood: u < 1.4 ? 'squint' : 'wide', look: [-1, -0.8], hops: [S.t0 + 1.5] })
    }, cues: [['riser', 0.0, 1.0, 0.012], ['whoosh', 1.0, 0.4, 0.04], ['boom', 1.4, 0.18], ['tick', 1.4, 0.07], ['pop', 1.44, 1318.51, 0.04, 0.2]] },
    { caption: 'two very *lopsided* mugs.', draw(x, t, S) {
      const { u, hero, date } = S
      table(x, 540, 1180, 960, '#6b4a2f')
      const sw = ease.inOutCubic(prog(u, 0.9, 1.5))
      wonkyMug(x, t, lerp(430, 650, sw), 1176 - 160 * Math.sin(Math.PI * sw), -0.18, '#7fd0ff', pop01(t, S.t0 + 0.1, 0.3, 2.4))
      wonkyMug(x, t, lerp(650, 430, sw), 1176 - 100 * Math.sin(Math.PI * sw), 0.2, '#ff8fb1', pop01(t, S.t0 + 0.25, 0.3, 2.4))
      shadow(x, 200, 1170, 160); shadow(x, 880, 1170, 160)
      hero(x, t, { x: 200, y: 1010, s: 180, mood: u < 1.5 ? 'happy' : 'heart', look: [1, 0.2], hops: [S.t0 + 0.9, S.t0 + 1.6, S.t0 + 2.2] })
      date(x, t, { x: 880, y: 1010, s: 180, mood: u < 1.5 ? 'happy' : 'heart', look: [-1, 0.2], hops: [S.t0 + 0.95, S.t0 + 1.65, S.t0 + 2.25] })
      card(x, 540, 760, 300, 80, 'SWAP!', { size: 46, col: GOLD, k: pop01(t, S.t0 + 1.0, 0.3, 2.6), rot: -0.05 })
      hearts(x, t, S.t0 + 1.6, 540, 1060, { n: 6 })
    }, cues: [['pop', 0.12, 880, 0.04, -0.3], ['pop', 0.27, 987.77, 0.04, 0.3], ['whoosh', 0.9, 0.5, 0.03], ['pop', 1.02, 1318.51, 0.05, 0], ['pluck', 1.6, 1567.98, 0.04, 0, 0.3]] },
  ],
  score: '9/10', word: 'wobbly',
  last: 'Make something *badly*, together.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, CLAYD, bubble]
