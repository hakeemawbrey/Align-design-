// nrde21: RATE MY DATE IDEA, "Sagittarius plans sledding with no hills" (18 s vertical trial reel, music: screwed · Am).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “Sledding. In a city with *no hills.*”  ♐ Sagittarius sits in a laundry basket on top of a tiny bump.
//   2.6–5.8   THE PLAN "behold: *the mountain.*"  Sag presents the "mountain" (a grassy bump, a flag on top); the ♉
//             Taurus date climbs in behind. A dramatic countdown: 3… 2… 1…
//   5.8       card cut.
//   5.8–9.3   BUT… "they slide about *two feet.*"  The basket scoots, stops, tips over; both roll out laughing till they cry.
//   9.32      THE STARS RATE IT 10/10 *for the laugh (slope: 6/10)*.  Pisces: 11/10.   9.8 THE STARS: "Go anyway. Laugh *anyway*."
import { makeDate, R, box, bubble, shadow, hearts, card, starFrame, inSprite, tearsCells, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../nrde01/scenes/datekit.js'

function bump(x, cx, by, w = 520, h = 110, bot = 1320) {
  x.fillStyle = INK; x.beginPath(); x.ellipse(cx, by, w / 2 + 6, h + 6, 0, Math.PI, 0); x.fill()
  x.fillStyle = '#4fa86a'; x.beginPath(); x.ellipse(cx, by, w / 2, h, 0, Math.PI, 0); x.fill()
  for (let i = 0; i < 9; i++) R(x, '#6fc888', cx - w / 2 + 40 + i * (w - 80) / 8, by - h * Math.sin(Math.PI * (0.1 + i * 0.1)) + 12, 8, 14)
  R(x, '#3f8a56', 0, by, 1080, bot - by)
}
function basket(x, cx, by, rot = 0, s = 1) {
  x.save(); x.translate(cx, by); x.rotate(rot); x.scale(s, s)
  box(x, -110, -70, 220, 70, '#7fd0ff', { b: 6 })
  for (let i = 0; i < 6; i++) R(x, '#4f9ac8', -96 + i * 36, -60, 14, 50)
  R(x, INK, -126, -84, 252, 18); R(x, '#a8e2ff', -120, -80, 240, 10)
  x.restore()
}
function flag(x, t, cx, by) { R(x, INK, cx - 4, by - 110, 8, 110); R(x, '#ff6b5a', cx + 4, by - 110 + Math.sin(t * 7) * 3, 60, 36) }

const EP = makeDate({
  id: 'nrde21', sign: 'sagittarius', date: 'taurus', accent: '#c9a6ff', deep: '#6a3fb0',
  idea: 'Sledding. In a city with *no hills.*',
  hook(x, t, S) {
    bump(x, 540, 1330, 700, 140, 1520)
    flag(x, t, 760, 1240)
    const o = { x: 520, y: 1060, s: 280, mood: 'sparkle', look: [1, 0.3], hops: S.HOOK_HOPS }
    S.hero(x, t, o)
    basket(x, 520, 1200, -0.08 + Math.sin(t * 6) * 0.04, 1.2)
  },
  beats: [
    { caption: 'behold: *the mountain.*', draw(x, t, S) {
      const { u, hero, date } = S
      bump(x, 540, 1180, 640, 120)
      flag(x, t, 700, 1080)
      const cd = u < 1.0 ? null : u < 1.6 ? '3…' : u < 2.2 ? '2…' : '1…'
      basket(x, 480, 1080, -0.05, 1.3)
      hero(x, t, { x: 420, y: 930, s: 170, mood: u < 1 ? 'sparkle' : 'squint', look: [1, 0], hops: [S.t0 + 0.2, S.t0 + 1.0, S.t0 + 1.6, S.t0 + 2.2] })
      date(x, t, { x: 560, y: 940, s: 160, mood: u < 1 ? 'neutral' : 'wide', look: [-1, 0.3], hops: [S.t0 + 0.6] })
      if (cd) card(x, 540, 700, 200, 110, cd, { size: 72, col: GOLD, k: pop01(t, S.t0 + (u < 1.6 ? 1.0 : u < 2.2 ? 1.6 : 2.2), 0.25, 2.8) })
      bubble(x, t, 820, 820, S.t0 + 0.2, S.t0 + 1.0, 'very steep. be brave.', { size: 30, tail: -0.4 })
    }, cues: [['pop', 0.22, 880, 0.035, 0.3], ['tick', 1.0, 0.07], ['tick', 1.6, 0.07], ['tick', 2.2, 0.08], ['riser', 1.0, 1.8, 0.014]] },
    { caption: 'they slide about *two feet.*', draw(x, t, S) {
      const { u, hero, date } = S
      bump(x, 540, 1180, 640, 120)
      flag(x, t, 700, 1080)
      const slide = ease.outCubic(prog(u, 0.0, 0.5)), tip = ease.inOutCubic(prog(u, 0.6, 0.9))
      const bx = lerp(480, 560, slide), rot = -0.05 + tip * 1.4
      if (tip < 0.6) {
        basket(x, bx, 1080 + slide * 20, rot, 1.3)
        hero(x, t, { x: bx - 60, y: 935 + tip * 40, s: 170, mood: 'wide', look: [1, 0] })
        date(x, t, { x: bx + 80, y: 945 + tip * 40, s: 160, mood: 'wide', look: [-1, 0.3] })
        card(x, 540, 720, 240, 80, '2 ft', { size: 50, k: pop01(t, S.t0 + 0.5, 0.25, 2.6), rot: 0.06 })
      } else {
        basket(x, 640, 1110, 1.4, 1.3)
        const laugh = { mood: 'happy', hops: [0.95, 1.15, 1.35, 1.55, 1.75, 2.0, 2.25].map(v => S.t0 + v) }
        const o1 = { x: 340, y: 1060, s: 170, look: [1, 0], ...laugh }, o2 = { x: 860, y: 1070, s: 160, look: [-1, 0], ...laugh }
        hero(x, t, { ...o1, tears: u > 1.4 ? 2 : 0 }); date(x, t, { ...o2, tears: u > 1.4 ? 2 : 0 })
        bubble(x, t, 540, 760, S.t0 + 1.0, S.t1, 'BEST. MOUNTAIN. EVER.', { size: 34 })
        hearts(x, t, S.t0 + 1.8, 540, 960, { n: 5 })
      }
    }, cues: [['whoosh', 0.0, 0.5, 0.03], ['tick', 0.5, 0.06], ['whoosh', 0.6, 0.3, 0.03], ['tom', 0.9, 110, { gain: 0.2, decay: 0.2 }], ['pop', 1.02, 987.77, 0.04, 0], ['pop', 1.2, 1174.66, 0.035, -0.3], ['pop', 1.4, 1318.51, 0.035, 0.3]] },
  ],
  score: '10/10', word: 'for the laugh (slope: 6/10)',
  last: 'Go anyway. Laugh *anyway*.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, PINK, starFrame, inSprite, tearsCells]
