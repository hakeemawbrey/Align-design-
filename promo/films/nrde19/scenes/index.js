// nrde19: RATE MY DATE IDEA, "Libra plans a party exit" (18 s vertical trial reel, music: pop · Ab).
// Story 0–13.6, then the shared end card. The format lives in ../../nrde01/scenes/datekit.js.
//   0.0–2.6   hook: “The party. But we leave at *nine* for pie.”  ♎ Libra mid-twirl at a holiday party, lights swinging.
//   2.6–5.8   THE PLAN "Libra charms *the whole room.*"  Libra hops from guest to guest (little party stars), hearts
//             everywhere; the ♒ Aquarius date watches the clock on the wall.
//   5.8       card cut.
//   5.8–9.3   BUT… "9:00. *The great escape.*"  The clock strikes 9:00; Libra waves goodbye; the two slip into a quiet
//             booth with two slices of pie and one candle.
//   9.32      THE STARS RATE IT 10/10 *best exit*.  Pisces: 11/10.   9.8 THE STARS: "The best part of the party is *after*."
import { makeDate, R, box, bubble, shadow, hearts, card, fairyLights, floor, table, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK, MONO } from '../../nrde01/scenes/datekit.js'
import { drawStarChar } from '../../startalk.js'

function clock(x, cx, cy, h, m, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.fillStyle = INK; x.fill()
  x.beginPath(); x.arc(0, 0, 62, 0, Math.PI * 2); x.fillStyle = BONE; x.fill()
  const ha = (h % 12 + m / 60) / 12 * Math.PI * 2, ma = m / 60 * Math.PI * 2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 9; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ha) * 32, -Math.cos(ha) * 32); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(ma) * 50, -Math.cos(ma) * 50); x.stroke()
  x.restore()
}
const GUESTS = [['#7fd0ff', 160], ['#9fe6b0', 400], ['#ffd36b', 680], ['#ff9f6b', 920]]
function guests(x, t, y, s = 130) { GUESTS.forEach(([c, gx], i) => drawStarChar(x, gx, y, s, t, { color: c, mood: i % 2 ? 'happy' : 'sparkle', seed: 20 + i, glow: 0.6, alpha: 0.85, look: [0, 0] })) }
function pie(x, cx, cy) {
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 60, cy + 20); x.lineTo(cx + 60, cy + 20); x.lineTo(cx + 40, cy - 30); x.closePath(); x.fill()
  x.fillStyle = '#e8a25c'; x.beginPath(); x.moveTo(cx - 50, cy + 14); x.lineTo(cx + 52, cy + 14); x.lineTo(cx + 36, cy - 22); x.closePath(); x.fill()
  R(x, '#fff6e0', cx + 10, cy - 34, 22, 12)
}

const EP = makeDate({
  id: 'nrde19', sign: 'libra', date: 'aquarius', accent: '#ffb3d1', deep: '#b03a72',
  idea: 'The party. But we leave at *nine* for pie.',
  hook(x, t, S) {
    fairyLights(x, t, 40, 620 + Math.sin(t * 2) * 10, 1040, 640, { n: 14, sag: 80 })
    floor(x, 1330, '#2a2148', '#3a2f62', 190)
    guests(x, t, 1210, 120)
    shadow(x, 540, 1340, 240)
    S.hero(x, t, { x: 540, y: 1050, s: 300, mood: 'happy', look: [Math.sin(t * 6) > 0 ? 1 : -1, 0], hops: S.HOOK_HOPS, squash: 0.08 * Math.sin(t * 6) })
  },
  beats: [
    { caption: 'Libra charms *the whole room.*', draw(x, t, S) {
      const { u, hero, date } = S
      fairyLights(x, t, 40, 600, 1040, 600, { n: 14, sag: 60 })
      floor(x, 1180, '#2a2148', '#3a2f62', 140)
      clock(x, 900, 760, 8, Math.min(59, Math.floor(u * 18)), 1)
      guests(x, t, 1080, 130)
      const gi = Math.min(3, Math.floor(u / 0.75)), hx = GUESTS[gi][1]
      hero(x, t, { x: hx, y: 900, s: 150, mood: 'sparkle', look: [0, 1], hops: [0, 0.75, 1.5, 2.25].map(v => S.t0 + v) })
      hearts(x, t, S.t0 + gi * 0.75 + 0.1, hx, 860, { n: 3 })
      date(x, t, { x: 540, y: 700, s: 130, mood: 'neutral', look: [1, -0.3] })
      label9(x, t, S)
    }, cues: [0, 0.75, 1.5, 2.25].map((v, i) => ['pop', v, [880, 987.77, 1174.66, 1318.51][i], 0.035, (i - 1.5) * 0.2]) },
    { caption: '9:00. *The great escape.*', draw(x, t, S) {
      const { u, hero, date } = S
      if (u < 1.0) {
        fairyLights(x, t, 40, 600, 1040, 600, { n: 14, sag: 60 })
        floor(x, 1180, '#2a2148', '#3a2f62', 140)
        clock(x, 540, 800, 9, 0, 1 + 0.12 * Math.exp(-u * 6) * Math.sin(u * 40))
        card(x, 540, 940, 180, 64, '9:00', { size: 40, col: GOLD, k: pop01(t, S.t0 + 0.05, 0.25, 2.6) })
        hero(x, t, { x: 330, y: 1060, s: 170, mood: 'wide', look: [1, -1], hops: [S.t0 + 0.1] })
        date(x, t, { x: 750, y: 1060, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.15] })
      } else {
        // the quiet booth: two slices of pie, one candle
        box(x, 140, 820, 800, 360, '#5a2a4a', { b: 8 }); R(x, '#7a3a62', 156, 836, 768, 40)
        table(x, 540, 1060, 520, '#8a5a3a')
        pie(x, 440, 1030); pie(x, 640, 1030)
        R(x, INK, 532, 960, 16, 70); R(x, BONE, 536, 964, 8, 62); R(x, '#ffb347', 534, 940 + Math.sin(t * 12) * 3, 12, 20)
        const k = pop01(t, S.t0 + 1.0, 0.3, 2)
        hero(x, t, { x: 280, y: 980, s: 170 * k, mood: 'heart', look: [1, 0], hops: [S.t0 + 1.6] })
        date(x, t, { x: 800, y: 980, s: 170 * k, mood: 'heart', look: [-1, 0], hops: [S.t0 + 1.7] })
        bubble(x, t, 540, 760, S.t0 + 1.3, S.t1, 'best part of the night.', { size: 32 })
        hearts(x, t, S.t0 + 2.0, 540, 900, { n: 5 })
      }
    }, cues: [['bell', 0.02, 1046.5, 0.04, 1.2, 0], ['bell', 0.32, 1046.5, 0.03, 1.0, 0], ['whoosh', 0.9, 0.4, 0.035], ['pop', 1.02, 880, 0.04, 0], ['pop', 1.32, 1174.66, 0.035, 0], ['pluck', 2.0, 1567.98, 0.035, 0, 0.3]] },
  ],
  score: '10/10', word: 'best exit',
  last: 'The best part of the party is *after*.',
})
function label9(x, t, S) { if (S.u > 1.6) bubble(x, t, 760, 640, S.t0 + 1.6, S.t1, '8:59…', { size: 32, font: MONO, weight: 700 }) }

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, lerp, ease, prog]
