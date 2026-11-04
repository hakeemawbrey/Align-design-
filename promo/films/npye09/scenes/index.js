// npye09: YOUR SIGN AT THE HOLIDAY PARTY, "Sagittarius at the holiday party" (16 s vertical trial reel, music: house · G).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Sagittarius* at the | holiday party:" — Sag mid-skid through the door at frame 0, snow on its
//             backpack: "sorry! long story!"
//   2.4–5.2   1 "arrives *late,* with a story." The clock says 9:40; guests gather: "you will NOT believe this bus
//             ride."
//   5.2       card cut.
//   5.2–8.0   2 "invites everyone on a *snow walk.* right now." A sign: SNOW WALK? WHO'S IN? Scarves pop on, one by
//             one, and one guest happily stays by the fire.
//   8.0–11.6  THE STARS: "Make the plan. Ask who *wants* in."
import { makeEp, R, box, bubble, card, shadow, sparkles, hatCells, scarfCells, clock, snowfall, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED } from '../../npye01/scenes/kit.js'

function door(x, t) {
  const X = 650, Y = 560, W = 300, H = 590
  R(x, INK, X - 16, Y - 16, W + 32, H + 16)
  const g = x.createLinearGradient(0, Y, 0, Y + H); g.addColorStop(0, '#1a2a52'); g.addColorStop(1, '#3a4f80')
  x.fillStyle = g; x.fillRect(X, Y, W, H)
  snowfall(x, t, X, Y, W, H, { n: 18, size: 6, speed: 90 })
  R(x, '#e6eef9', X, Y + H - 60, W, 60)
  x.save(); x.translate(X + W, Y); x.scale(0.25, 1); box(x, 0, 0, W, H, '#3a6a8a', { b: 8 }); x.restore()
}
function pack(x, F, t) { void t; box(x, F.ox - 150, F.oy - 190, 90, 120, '#6b8a3a', { b: 6, hi: '#8aa84a' }); R(x, '#ffffff', F.ox - 150, F.oy - 196, 90, 14) }

const EP = makeEp({
  id: 'npye09', series: 'party', sign: 'sagittarius', name: 'Sagittarius', room: { wreathOn: false },
  hook(x, t, S) {
    const { hero, heroHat, dress } = S
    door(x, t)
    const p = ease.outCubic(clamp(t / 0.7))
    const X = lerp(720, 500, p)
    shadow(x, X, 1125, 240)
    const o = { x: X, y: 960, s: 270, mood: t < 0.7 ? 'wide' : 'happy', look: [-1, 0], squash: t < 0.7 ? 0.12 * (1 - p) : 0, hops: [0.75, 1.5] }
    dress(x, t, o, () => {})
    hero(x, t, o); heroHat(x, t, o)
    for (let i = 0; i < 6; i++) { const q = ((t * 2 + i / 6) % 1); if (t < 0.8) { x.save(); x.globalAlpha = 1 - q; R(x, '#ffffff', X + 120 + q * 80, 1090 - q * 60 - i * 6, 14, 14); x.restore() } }
    bubble(x, t, 500, 650, 0.9, 2.35, 'sorry! long story!', { size: 38 })
  },
  hookCues: [['whoosh', 0.0, 0.6, 0.03], ['tom', 0.72, 110, { gain: 0.14, decay: 0.2 }], ['pop', 0.9, 1174.66, 0.035, 0]],
  beats: [
    { caption: 'arrives *late,* with a story.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        clock(x, 820, 600, 62, 9, 40 + u * 2)
        ;[['taurus', 220], ['virgo', 820], ['cancer', 900]].forEach(([id, gx], i) => guest(x, t, id, { x: gx, y: 1010, s: 130, mood: u > 0.8 ? 'wide' : 'neutral', look: [gx < 540 ? 1 : -1, 0], seed: 70 + i, hops: [S.t0 + 0.3 + i * 0.2] }))
        shadow(x, 520, 1110, 230)
        const o = { x: 520, y: 950, s: 250, mood: 'sparkle', look: [0, 0], hops: [0.2, 0.6, 1.0, 1.4, 1.8].map(h => S.t0 + h), squash: 0.05 * Math.sin(u * 14) }
        hero(x, t, o); heroHat(x, t, o)
        bubble(x, t, 500, 640, S.t0 + 0.5, S.t1, 'you will NOT believe this bus ride.', { size: 32 })
      },
      cues: [['pop', 0.5, 987.77, 0.035, 0], ['tick', 1.0, 0.04], ['tick', 1.4, 0.04]] },
    { caption: 'invites everyone on a *snow walk.* right now.',
      draw(x, t, S) {
        const { u, hero, heroHat, guest, dress } = S
        const G = [['taurus', 230, RED], ['virgo', 780, MINT], ['cancer', 900, GOLD]]
        G.forEach(([id, gx, sc], i) => {
          const g = { x: gx, y: 1010, s: 130, mood: 'happy', look: [gx < 540 ? 1 : -1, 0], seed: 70 + i, hops: [S.t0 + 0.7 + i * 0.4] }
          guest(x, t, id, g)
          if (i < 2 && u > 0.7 + i * 0.4) dress(x, t, g, () => scarfCells(x, sc, BONE))
        })
        bubble(x, t, 800, 850, S.t0 + 1.6, S.t1, 'I’ll keep the cocoa warm!', { size: 26, col: '#dff1ff', tail: 0 })
        shadow(x, 520, 1110, 230)
        const o = { x: 520, y: 960, s: 240, mood: 'happy', look: [0, 0], hops: [0.1, 0.7, 1.1, 1.5].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        card(x, 520, 640, 420, 150, ['SNOW WALK?', 'WHO’S IN?'], { size: 44, rot: -0.04 * Math.sin(u * 5), k: ease.outCubic(prog(u, 0, 0.3)) })
        sparkles(x, t, 520, 640, S.t0 + 0.3, 8, 220, 2, [GOLD, BONE, '#a35cf0'])
      },
      pis: { x: 950, y: 760, s: 110 },
      cues: [['pop', 0.3, 1318.51, 0.04, 0], ['pop', 0.7, 987.77, 0.03, -0.3], ['pop', 1.1, 1174.66, 0.03, 0.3], ['pop', 1.6, 880, 0.03, 0.4]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, dress, ok, HOPS } = S
    shadow(x, 420, 1110, 230 * ok); shadow(x, 690, 1110, 170 * ok)
    const o = { x: 420, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o); dress(x, t, o, () => scarfCells(x, '#a35cf0', GOLD))
    const g = { x: 690, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.8], seed: 71 }
    guest(x, t, 'virgo', g); dress(x, t, g, () => scarfCells(x, MINT, BONE))
  },
  last: 'Make the plan. Ask who *wants* in.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [pack, hatCells, PINK]
