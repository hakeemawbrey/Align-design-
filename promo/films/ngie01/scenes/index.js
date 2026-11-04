// ngie01: THE SIGNS AS WINTER GIFTS, "Aries as a winter gift" (16 s vertical trial reel, music: pop · E).
// Story 0–11.6, then the shared end card. The format look lives in ../../npye01/scenes/kit.js.
//   0.0–2.4   hook "If *Aries* were a | winter gift:" — Aries mid-tug on the ribbon of a red box at frame 0: "open it!
//             open it!" The bow pops loose.
//   2.4–5.2   1 "hand warmers that heat up *instantly.*" Lid off: two warmers rise, glowing, heat waves.
//   5.2       card cut.
//   5.2–8.0   2 "comes with: a note, *'race you outside.'*" The note; Aries already bouncing in the snow.
//   8.0–11.6  THE STARS: "Let their *excitement* be a gift too."
import { makeEp, R, box, bubble, shadow, sparkles, note, giftHook, giftReveal, hookCuesGift, revealCues, prog, ease, INK, BONE, GOLD } from '../../npye01/scenes/kit.js'

function warmers(x, t, cx, cy, k) {
  for (const d of [-1, 1]) {
    const X = cx + d * 80, Y = cy + Math.sin(t * 3 + d) * 6
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(X, Y, 10, X, Y, 140); g.addColorStop(0, `rgba(255,140,80,${0.45 * k})`); g.addColorStop(1, 'rgba(255,140,80,0)'); x.fillStyle = g; x.fillRect(X - 140, Y - 140, 280, 280); x.restore()
    box(x, X - 55 * k, Y - 70 * k, 110 * k, 140 * k, d < 0 ? '#ff7a4a' : '#ffb040', { b: 6, hi: 'rgba(255,255,255,0.35)' })
    for (let i = 0; i < 3; i++) { const p = (t * 1.2 + i / 3) % 1; x.save(); x.globalAlpha = (1 - p) * k; R(x, '#ffd9a8', X - 30 + i * 25 + Math.sin(t * 6 + i) * 6, Y - 90 - p * 80, 8, 20); x.restore() }
  }
}

const EP = makeEp({
  id: 'ngie01', series: 'gifts', sign: 'aries', name: 'Aries', boxCol: '#d83a3a', ribbon: GOLD, finGift: warmers,
  hook(x, t, S) { giftHook(x, t, S, { line: 'open it! open it!' }) },
  hookCues: hookCuesGift,
  beats: [
    { caption: 'hand warmers that heat up *instantly.*',
      draw(x, t, S) { giftReveal(x, t, S, warmers, { line: 'ready in zero seconds.' }) },
      cues: [...revealCues, ['riser', 0.6, 1.4, 0.012], ['pop', 1.2, 987.77, 0.035, 0]] },
    { caption: 'comes with: a note, *‘race you outside.’*',
      draw(x, t, S) {
        const { u, hero } = S
        note(x, 640, 760, ['race you outside.', '— Aries'], { k: ease.outCubic(prog(u, 0, 0.35)), rot: 0.04 })
        const bounce = [0.4, 0.75, 1.1, 1.45, 1.8, 2.15].map(h => S.t0 + h)
        shadow(x, 330, 1125, 220)
        hero(x, t, { x: 330, y: 970, s: 230, mood: 'happy', look: [1, 0], hops: bounce, squash: 0.04 * Math.sin(u * 12) })
        for (let i = 0; i < 3; i++) { const p = ((u * 1.5 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; R(x, '#ffffff', 300 + i * 30, 1120 - p * 90, 12, 12); x.restore() }
        bubble(x, t, 330, 640, S.t0 + 1.2, S.t1, 'GO GO GO!', { size: 40 })
      },
      cues: [['pop', 0.1, 1174.66, 0.04, 0], ['tick', 0.4, 0.03], ['tick', 0.75, 0.03], ['tick', 1.1, 0.03], ['pop', 1.2, 1318.51, 0.04, 0]] },
  ],
  last: 'Let their *excitement* be a gift too.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, INK, BONE]
