// butterflies · half A (0–15.2): the problem. THEN (warm, golden, grainy film: her, the passed note, her smile, a racing
// heart) cut against NOW (cold, grey, fast: a swipe stack, a dead chat). The cold wins; the screen goes black. In the
// dark, one tiny pixel butterfly of light rises and the sky blooms around it. From 14.75 exactly H: the sky, nothing else.
//   memory.js  THEN shots m1 0–3.3 · m2 4.05–6.05 · m3 6.75–7.65 (+ two 2–3 frame flashes inside the cold)
//   now.js     NOW shots n1 3.3–4.05 · n2 6.05–6.75 · n3 7.65–12.9
//   end.js     the dark → the butterfly → the sky (12.9–15.2), exactly H from 14.75
//   one picture canvas · one grain layer (0.5) · captions above the grain
import { fill } from '../../../../src/scenes/common.js'
import { T, shotAt, canvasLayer, grain, caption, ALL_SWIPES, N3_SWIPES } from './shared.js'
import { prepMemory } from './memory.js'
import { prepNow } from './now.js'
import { prepEnd } from './end.js'

async function picture(stage) {
  const root = fill(stage, { background: '#05060a' })
  const c = canvasLayer(root), ctx = c.getContext('2d')
  const M = await prepMemory(), N = await prepNow(), E = prepEnd()
  const gr = grain(root, 0.5)
  return {
    start: 0, end: T.end, root,
    update(t) {
      const s = shotAt(t)
      ctx.save()
      if (s === 'm1') M.m1(ctx, t)
      else if (s === 'm2') M.m2(ctx, t)
      else if (s === 'm3') M.m3(ctx, t)
      else if (s === 'n2') N.draw(ctx, t, 'chat')
      else if (s === 'n1' || s === 'n3') N.draw(ctx, t, 'swipe')
      else E.draw(ctx, t)
      ctx.restore()
      // open from black (0–0.35)
      if (t < 0.35) { ctx.fillStyle = `rgba(0,0,0,${(1 - t / 0.35).toFixed(3)})`; ctx.fillRect(0, 0, 1920, 1080) }
      gr.update(t, 0.5)
    },
  }
}

async function captions(stage) {
  const root = fill(stage, { pointerEvents: 'none' })
  const caps = [
    caption(root, ['Remember', 'butterflies?'], { left: 150, top: 330, at: [0.2, 0.42], gap: 0.12, size: 128, out: [2.98, 3.24] }),
    caption(root, ['When did dating', 'get so numb?'], { left: 150, top: 360, at: [8.15, 8.75], gap: 0.13, size: 112, out: [12.05, 12.35] }),
  ]
  return { start: 0, end: T.end, root, update(t) { for (const c of caps) c.update(t) } }
}

export const SCENES = [picture, captions]

const thump = (b, g = 0.14) => [['boom', b, g], ['boom', b + 0.17, g * 0.55]]
export const CUES = [
  // THEN: a warm swell, a slow heartbeat
  ['riser', 0.0, 3.0, 0.035],
  ...T.heartsM1.flatMap(b => thump(b, 0.1)),
  // NOW: hard cut, cold flicks
  ['tick', T.n1, 0.07],
  ...T.swipesN1.flatMap(s => [['tick', s - 0.02, 0.035], ['whoosh', s, 0.3, 0.045]]),
  // THEN: the note; the pencil ticks yes
  ...T.heartsM2.flatMap(b => thump(b, 0.11)),
  ['tick', T.m2 + 1.45, 0.05], ['tick', T.m2 + 1.56, 0.04],
  // NOW: the chat
  ['tick', 6.12, 0.05], ['bell', 6.27, 1174.66, 0.025, 0.5, 0.25], ['tick', 6.42, 0.05],
  // THEN: racing heart, the burn
  ...T.heartsM3.flatMap(b => thump(b, 0.13)),
  ['riser', 7.0, 7.62, 0.05],
  // NOW: the stack, faster and faster, then dead stop
  ['boom', T.n3, 0.12],
  ...N3_SWIPES.filter((s, i) => i < 9 || i % 2 === 0).map(s => ['tick', s, 0.03]),
  ['whoosh', 9.6, 1.4, 0.05],
  ...T.flashes.map(([a]) => ['bell', a, 880, 0.02, 0.6, -0.2]),
  ['tick', T.stop, 0.06],
  ['tick', 12.28, 0.06],
  // the dark → the butterfly → the sky
  ['glitter', 13.0, 14.7],
  ['riser', 13.1, 14.85, 0.06],
  ['bell', 14.58, 1318.5, 0.03, 1.2, 0.2],
]
export { ALL_SWIPES }
