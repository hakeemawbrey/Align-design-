// npye10: YOUR SIGN AT THE HOLIDAY PARTY, "Capricorn at the holiday party" (16 s vertical trial reel, music: lofi · Ab).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Capricorn* at the | holiday party:" — Capricorn mid-glance at the clock (9:25), coat over its arm.
//   2.4–5.2   1 "planned to leave at *9:30.*" The clock hands spin past it to 11:50: "okay, ONE more goodbye."
//   5.2       card cut.
//   5.2–8.0   2 "is the last one there, *doing the dishes.*" Lights low, a sink of bubbles. The host: "you don't have
//             to!" Capricorn: "I want to."
//   8.0–11.6  THE STARS: "Staying to help says what words *can't.*"
import { makeEp, R, box, bubble, shadow, sparkles, hearts, clock, plate, prog, lerp, ease, INK, BONE, GOLD, PINK, MINT } from '../../npye01/scenes/kit.js'

function coat(x, cx, cy) { box(x, cx - 40, cy - 30, 80, 150, '#5a4a7a', { b: 6, hi: '#6e5e92' }); R(x, GOLD, cx - 6, cy, 12, 12); R(x, GOLD, cx - 6, cy + 40, 12, 12) }
function sink(x, t, u) {
  box(x, 560, 960, 420, 50, '#c9c2dc', { b: 7 }); box(x, 600, 1010, 340, 140, '#8a84a2', { b: 6 })
  R(x, INK, 760, 870, 14, 90); R(x, INK, 760, 870, 60, 14); R(x, '#8fe3ff', 812, 884, 6, 40 + 20 * Math.sin(t * 8))
  for (let i = 0; i < 9; i++) { const p = (t * 0.5 + i / 9) % 1; const bx = 620 + (i * 47) % 300, by = 950 - p * 160; x.save(); x.globalAlpha = 0.8 * (1 - p); x.strokeStyle = '#ffffff'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, 10 + (i % 3) * 6, 0, Math.PI * 2); x.stroke(); x.restore() }
  for (let i = 0; i < Math.min(4, Math.floor(u * 2)); i++) plate(x, 470, 1080 - i * 16, 120)
}

const EP = makeEp({
  id: 'npye10', series: 'party', sign: 'capricorn', name: 'Capricorn', room: { wreathOn: false },
  hook(x, t, S) {
    const { hero, heroHat } = S
    clock(x, 820, 620, 70, 9, 25 + t)
    shadow(x, 460, 1125, 240)
    const o = { x: 460, y: 950, s: 270, mood: 'neutral', look: [1, -1], hops: [-0.15, 1.2] }
    hero(x, t, o); heroHat(x, t, o)
    coat(x, 300, 950)
    bubble(x, t, 470, 650, 0.9, 2.35, 'five more minutes. tops.', { size: 34 })
  },
  hookCues: [['tick', 0.0, 0.05], ['tick', 0.5, 0.04], ['tick', 1.0, 0.04], ['tick', 1.5, 0.04], ['pop', 0.9, 880, 0.03, 0]],
  beats: [
    { caption: 'planned to leave at *9:30.*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        const m = 30 + ease.inOutCubic(prog(u, 0.2, 1.6)) * 140
        clock(x, 820, 620, 70, 9 + Math.floor(m / 60), m % 60)
        ;[['leo', 230], ['libra', 820]].forEach(([id, gx], i) => guest(x, t, id, { x: gx, y: 1010, s: 140, mood: 'happy', look: [gx < 540 ? 1 : -1, 0], seed: 80 + i, hops: [S.t0 + 0.4 + i * 0.5, S.t0 + 1.4 + i * 0.3] }))
        shadow(x, 500, 1110, 230)
        const o = { x: 500, y: 950, s: 250, mood: u < 1.6 ? 'happy' : 'wide', look: u < 1.6 ? [-1, 0] : [1, -1], hops: [S.t0 + 0.3, S.t0 + 1.0, S.t0 + 1.7] }
        hero(x, t, o); heroHat(x, t, o)
        coat(x, 350, 950)
        bubble(x, t, 500, 650, S.t0 + 1.7, S.t1, 'okay, ONE more goodbye.', { size: 34 })
      },
      cues: [['riser', 0.2, 1.6, 0.012], ['tick', 0.5, 0.03], ['tick', 0.8, 0.03], ['tick', 1.1, 0.03], ['tick', 1.4, 0.03], ['pop', 1.7, 987.77, 0.035, 0]] },
    { caption: 'is the last one there, *doing the dishes.*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        x.fillStyle = 'rgba(8,4,20,0.32)'; x.fillRect(0, 380, 1080, 800)
        sink(x, t, u)
        shadow(x, 330, 1110, 220)
        const o = { x: 330, y: 950, s: 240, mood: u > 1.4 ? 'happy' : 'neutral', look: [1, 0.5], hops: [S.t0 + 1.4], squash: 0.03 * Math.sin(u * 10) }
        hero(x, t, o); heroHat(x, t, o)
        guest(x, t, 'taurus', { x: 160, y: 1000, s: 140, mood: u > 1.6 ? 'heart' : 'wide', look: [1, 0], seed: 85, hops: [S.t0 + 0.3, S.t0 + 1.7] })
        bubble(x, t, 260, 760, S.t0 + 0.3, S.t0 + 1.35, 'you don’t have to!', { size: 30, col: '#fff3d6' })
        bubble(x, t, 400, 650, S.t0 + 1.4, S.t1, 'I want to.', { size: 38 })
        hearts(x, t, S.t0 + 1.7, 160, 880, { n: 5 })
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['glitter', 0.0, 0.6], ['pop', 0.3, 1174.66, 0.03, -0.4], ['pop', 1.4, 739.99, 0.035, 0], ['pluck', 1.7, 1174.66, 0.04, 0.5, -0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    shadow(x, 430, 1110, 230 * ok); shadow(x, 700, 1110, 170 * ok)
    const o = { x: 430, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'taurus', { x: 700, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.8], seed: 85 })
    sparkles(x, t, 560, 860, 8.6, 8, 200, 1, [GOLD, BONE, MINT])
  },
  last: 'Staying to help says what words *can’t.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, PINK]
