// lonely · half A (0–15.2): the problem. 2am, a face lit by a phone; "214 MATCHES · 0 CONVERSATIONS"; small talk dying
// on read; the screen goes black; the camera pushes through the window's moon pane into the Align sky (H at 14.8).
//   room.js   A1 0–4.0 the room · A3 12.9–14.8 the push · 14.8–15.2 exactly H
//   phone.js  A2 4.0–12.9 the phone close-up
//   captions  above everything (bone type above the grain)
import { fill } from '../../../../src/scenes/common.js'
import room from './room.js'
import phone from './phone.js'
import { T, caption } from './shared.js'

async function captions(stage) {
  const root = fill(stage, { pointerEvents: 'none' })
  const caps = [
    caption(root, ["We've never been", 'more connected.'], { left: 150, top: 120, at: 0.45, lineGap: 0.42, gap: 0.12, size: 108, out: [3.62, 3.9] }),
    caption(root, ['Or more alone.'], { left: 150, top: 452, at: 4.32, gap: 0.16, size: 112, dur: 0.5, out: [6.7, 6.95] }),
    caption(root, ['Small talk.', 'Then silence.'], { left: 150, top: 384, at: [7.42, 10.5], gap: 0.14, size: 104, out: [12.0, 12.22] }),
    caption(root, ['What if someone', 'actually asked?'], { left: 150, top: 120, at: [12.36, 12.62], gap: 0.12, size: 104, out: [14.2, 14.45] }),
  ]
  return { start: 0, end: T.sky, root, update(t) { for (const c of caps) c.update(t) } }
}

export const SCENES = [room, phone, captions]

export const CUES = [
  // the room hum: a low swell under the opening line
  ['riser', 0.0, 2.6, 0.03],
  // hard, quiet cut to the phone on "Or more alone."
  ['boom', T.phoneIn, 0.16],
  // thumb flicks through the matches
  ...T.flicks.flatMap(f => [['tick', f - 0.02, 0.035], ['whoosh', f, 0.5, 0.045]]),
  ['tick', T.tap, 0.06],
  ['whoosh', T.chatIn, 0.25, 0.03],
  // messages: a soft send tick for his, a small cold bell for hers
  ...T.msgs.map((m, i) => i % 2 === 0 ? ['tick', m, 0.05] : ['bell', m, 1174.66, 0.025, 0.5, 0.25]),
  ['tick', T.seen, 0.025],
  // the dots stop. silence. the screen clicks off.
  ['tick', T.off, 0.07],
  // the push through the window: a slow breath up into the sky
  ['riser', 13.1, 14.95, 0.06],
  ['whoosh', 14.1, 0.9, 0.06],
  ['glitter', 14.5, 15.1],
]
