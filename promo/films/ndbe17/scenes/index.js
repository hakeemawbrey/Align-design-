// ndbe17: DEALBREAKER OR NOT? E17, "They sing *loudly* | in the car." (13 s vertical trial reel, music: house · A).
//   0.0–3.9   frame 0: a little car on a night road, ♌ Leo mid-belt behind the wheel, notes flying, the car bouncing to
//             the beat. ♑ Capricorn in the passenger seat, staring ahead… 2.0 one tiny note slips out of Capricorn.
//             2.7 full duet: both singing, notes everywhere.
//   3.9 the vote · 6.1 the stamp: NOT A DEALBREAKER.
//   finale    the car rolls on past snowy lampposts, both singing, hearts mixing with the notes.
//             THE STARS: "Join the chorus. *Duets* go further."
import { makeDeal, R, box, hearts, notes, sparkles, glow, prog, lerp, ease, clamp, pop01, outK, INK, BONE, GOLD, PINK, SKYB, T } from '../../ndbe01/scenes/dealkit.js'

function road(x, t, speed = 1) {
  R(x, '#231c3c', 0, 1060, 1080, 360); R(x, INK, 0, 1054, 1080, 8)
  for (let i = 0; i < 8; i++) { const px = ((i * 200 - t * 420 * speed) % 1600 + 1600) % 1600 - 260; R(x, 'rgba(239,230,214,0.5)', px, 1240, 110, 10) }
  for (let i = 0; i < 4; i++) { const px = ((i * 360 - t * 200 * speed) % 1440 + 1440) % 1440 - 180; R(x, INK, px - 8, 640, 16, 420); box(x, px - 30, 620, 60, 30, '#4a4466', { b: 4 }); glow(x, px, 680, 160, 0.16, '255,230,170') }
}
function carBody(x, t, cx, cy, bounce, draw) {
  x.save(); x.translate(cx, cy - bounce)
  box(x, -330, -40, 660, 130, '#ff8a3a', { b: 8, hi: '#ffab66' })
  R(x, INK, -238, -250, 476, 218); R(x, '#2a2148', -230, -242, 460, 210)
  draw()
  R(x, INK, -238, -40, 476, 10); R(x, INK, -6, -250, 12, 214)
  box(x, -280, -260, 560, 22, '#ff8a3a', { b: 7 })
  R(x, '#fff1a8', 300, -10, 24, 24); R(x, '#e8344e', -326, -10, 18, 24)
  x.restore()
  for (const d of [-200, 200]) { R(x, INK, cx + d - 56, cy + 60, 112, 112); R(x, '#5a5470', cx + d - 28, cy + 88, 56, 56); R(x, BONE, cx + d - 8 + 10 * Math.cos(t * 14), cy + 108 + 10 * Math.sin(t * 14), 16, 16) }
}
const PEEP = 2.0, DUET = 2.7
const EP = makeDeal({
  id: 'ndbe17', sign: 'leo', date: 'capricorn', verdict: 'not', accent: '#ffb347',
  hook: 'They sing *loudly* | in the car.',
  last: 'Join the chorus. *Duets* go further.',
  scene(x, t, S) {
    const { u, hero, date } = S
    road(x, t)
    const beat = Math.abs(Math.sin(t * Math.PI * 2))
    const bounce = 10 * beat * (u > DUET ? 1.6 : 1)
    carBody(x, t, 540, 1000, bounce, () => {
      date(x, t, { x: 120, y: -110, s: 180, mood: u > DUET ? 'happy' : u > PEEP ? 'squint' : 'neutral', look: u > DUET ? [-1, 0] : [1, 0], squash: u > DUET ? 0.06 * beat : 0 })
      hero(x, t, { x: -120, y: -110, s: 190, mood: 'happy', look: [0, -1], squash: 0.07 * beat })
    })
    notes(x, t, -2, 4, 420, 760, { n: 6, spread: 260 })
    if (u > PEEP) notes(x, t, PEEP, u > DUET ? 4 : PEEP + 0.4, 660, 760, { n: u > DUET ? 6 : 1, spread: 160, cols: ['#9fd8f6', BONE] })
    sparkles(x, t, 660, 760, DUET, 10, 160, 1, [GOLD, PINK, SKYB])
  },
  sceneCues: [['pop', PEEP, 1318.51, 0.03, 0.3], ['pop', DUET, 1174.66, 0.045, 0.3], ['glitter', DUET, DUET + 0.5]],
  pis: { x: 960, y: 1320, s: 130 },
  finale(x, t, S) {
    const { u, k, hero, date } = S
    road(x, t, 0.6)
    if (k <= 0.01) return
    const beat = Math.abs(Math.sin(t * Math.PI * 2))
    x.save(); x.translate(540, 1000); x.scale(k, k); x.translate(-540, -1000)
    carBody(x, t, 540, 1000, 10 * beat, () => {
      hero(x, t, { x: -120, y: -110, s: 190, mood: 'happy', look: [1, 0], squash: 0.07 * beat })
      date(x, t, { x: 120, y: -110, s: 180, mood: u > 1.5 ? 'heart' : 'happy', look: [-1, 0], squash: 0.07 * beat })
    })
    x.restore()
    notes(x, t, T.stamp, T.out[0], 540, 760, { n: 7, spread: 420 })
    hearts(x, t, T.stamp + 1.5, 600, 760, { n: 5 })
    void [lerp, ease, clamp, pop01, outK]
  },
  finaleCues: [['pluck', 1.5, 1174.66, 0.04, 0.5, 0]],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
