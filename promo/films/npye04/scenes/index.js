// npye04: YOUR SIGN AT THE HOLIDAY PARTY, "Cancer at the holiday party" (16 s vertical trial reel, music: lofi · Eb).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "*Cancer* at the | holiday party:" — Cancer mid-step with a steaming cookie tin at frame 0.
//   2.4–5.2   1 "brought *homemade* cookies. and a backup tin." A second tin appears: "in case someone's hungry later."
//   5.2       card cut.
//   5.2–8.0   2 "finds the guest standing *alone.*" A quiet guest by the window; Cancer crosses the room with a
//             cookie. The guest lights up.
//   8.0–11.6  THE STARS: "Look for the quiet one. Make *room.*" The two side by side, sharing the tin.
import { makeEp, R, box, bubble, shadow, sparkles, hearts, cookie, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../npye01/scenes/kit.js'

function tin(x, t, cx, cy, w, col = '#e8344e', steam = true) {
  box(x, cx - w / 2, cy - w * 0.36, w, w * 0.5, col, { b: 6, lo: 'rgba(0,0,0,0.2)' })
  box(x, cx - w / 2 - 8, cy - w * 0.46, w + 16, w * 0.14, col, { b: 6, hi: 'rgba(255,255,255,0.3)' })
  for (let i = 0; i < 5; i++) R(x, BONE, cx - w * 0.4 + i * w * 0.2, cy - w * 0.2, 10, 10)
  if (steam) for (let i = 0; i < 3; i++) { const p = (t * 0.8 + i / 3) % 1; x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, cx - w * 0.25 + i * w * 0.25 + Math.sin(t * 4 + i) * 8, cy - w * 0.55 - p * 90, 10, 18); x.restore() }
}

const EP = makeEp({
  id: 'npye04', series: 'party', sign: 'cancer', name: 'Cancer',
  hook(x, t, S) {
    const { hero, heroHat } = S
    const X = lerp(380, 540, ease.outCubic(Math.min(1, t / 1.2)))
    shadow(x, X, 1125, 240)
    const o = { x: X, y: 950, s: 270, mood: t < 1.3 ? 'happy' : 'sparkle', look: [1, 0], hops: [-0.18, 0.3, 0.75, 1.2] }
    hero(x, t, o); heroHat(x, t, o)
    tin(x, t, X + 150, 960, 150)
    bubble(x, t, 560, 640, 1.3, 2.35, 'I baked!', { size: 40, tail: 0 })
  },
  hookCues: [['tick', 0.3, 0.04], ['tick', 0.75, 0.04], ['tick', 1.2, 0.04], ['pop', 1.3, 987.77, 0.035, 0]],
  beats: [
    { caption: 'brought *homemade* cookies. and a backup tin.',
      draw(x, t, S) {
        const { u, hero, heroHat } = S
        shadow(x, 380, 1110, 230)
        const o = { x: 380, y: 950, s: 250, mood: u < 0.9 ? 'happy' : 'sparkle', look: [1, 0], hops: [S.t0 + 0.9] }
        hero(x, t, o); heroHat(x, t, o)
        box(x, 560, 1000, 380, 26, '#7a5a44', { b: 6 }); R(x, INK, 590, 1026, 14, 124); R(x, INK, 896, 1026, 14, 124)
        tin(x, t, 690, 995, 150)
        const k = ease.outCubic(prog(u, 0.9, 1.2))
        if (u > 0.9) tin(x, t, lerp(500, 840, k), lerp(820, 995, k), 150, '#3fa862')
        sparkles(x, t, 840, 900, S.t0 + 1.2, 8, 110, 1, [GOLD, BONE, PINK])
        bubble(x, t, 560, 600, S.t0 + 1.3, S.t1, 'in case someone’s hungry later.', { size: 32, tail: -0.4 })
      },
      cues: [['whoosh', 0.9, 0.25, 0.025], ['pop', 1.2, 1318.51, 0.04, 0.3], ['pop', 1.3, 880, 0.03, 0]] },
    { caption: 'finds the guest standing *alone.*',
      draw(x, t, S) {
        const { u, hero, heroHat, guest } = S
        // the quiet guest by the window
        shadow(x, 250, 1110, 150)
        const lit = u > 1.45
        guest(x, t, 'aquarius', { x: 250, y: 990, s: 160, mood: lit ? 'happy' : 'neutral', look: lit ? [1, 0] : [0, 1], hops: lit ? [S.t0 + 1.5] : [], seed: 12, alpha: lit ? 1 : 0.85 })
        // the crowd, chatting on the right
        for (const [id, gx] of [['leo', 800], ['taurus', 940]]) guest(x, t, id, { x: gx, y: 1000, s: 130, mood: 'happy', look: [gx > 850 ? -1 : 1, 0], seed: gx })
        const walk = ease.inOutCubic(prog(u, 0.2, 1.3))
        const X = lerp(720, 420, walk)
        shadow(x, X, 1110, 200)
        const o = { x: X, y: 950, s: 220, mood: 'happy', look: [-1, 0], hops: [0.3, 0.7, 1.1, 1.45].map(h => S.t0 + h) }
        hero(x, t, o); heroHat(x, t, o)
        cookie(x, X - 120, 930, 30)
        bubble(x, t, 360, 720, S.t0 + 1.4, S.t1, 'want one? I’m Cancer.', { size: 32, tail: 0.3 })
        hearts(x, t, S.t0 + 1.6, 250, 860, { n: 5 })
      },
      pis: { x: 960, y: 760, s: 110 },
      cues: [['tick', 0.3, 0.03], ['tick', 0.7, 0.03], ['tick', 1.1, 0.03], ['pop', 1.4, 987.77, 0.035, 0], ['pluck', 1.6, 1174.66, 0.04, 0.5, 0.3]] },
  ],
  finale(x, t, S) {
    const { hero, heroHat, guest, ok, HOPS } = S
    shadow(x, 420, 1110, 230 * ok); shadow(x, 690, 1110, 170 * ok)
    const o = { x: 420, y: 900, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: HOPS }
    hero(x, t, o); heroHat(x, t, o)
    guest(x, t, 'aquarius', { x: 690, y: 950, s: 180, pop: ok, mood: 'happy', look: [-1, 0], hops: [8.7, 9.8], seed: 12 })
    if (ok > 0.3) tin(x, t, 560, 1080, 110, '#3fa862')
  },
  last: 'Look for the quiet one. Make *room.*',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
