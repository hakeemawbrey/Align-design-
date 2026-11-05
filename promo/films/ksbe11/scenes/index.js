// ksbe11: SAY IT BETTER ep 11, "You care more about your friends" (♒ Aquarius to ♐ Sagittarius). pop · D. Hard cut.
//   frame 0: Sag's phone mid-buzz (a group-chat notification already down), Aquarius mid-spin shouting.
//   freeze ("what it *really* means…") → "they're just *memes*…" → THE STARS: "under that is *I miss you*." →
//   "I *miss* you. Can we keep Thursdays just for us?" → Sag turns the phone face-down.  Pisces at the window cries.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { drawPhoneSmall, rect, INK } from '../../ksbe01/scenes/sbkit.js'
import { notification, notificationCues } from '../../hookkit.js'
const N1 = { at: -0.6, out: [2.2, 2.4], title: 'group chat', body: 'the crew: *47 new messages*', glyph: '♐', time: 'now', y: 150 }
const DOWN = 15.9
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 11, room: 'living',
  A: { sign: 'aquarius', red: 0.6 }, B: { sign: 'sagittarius' }, P: { x: 820, y: 640, s: 130 },
  hook: 'Jealous of the | *group chat?*', hookOpts: { top: 330 }, caption: 'what it *really* means…',
  bad: { text: 'You care more about your *friends!*', cy: 760 }, react: 'they’re just *memes*…',
  stars: ['under that is *I miss you*.', 'so say *that*.'],
  better: 'I *miss* you. Can we keep Thursdays just for us?',
  replies: ['*Thursdays are ours.*', 'phone’s *face-down.* I’m here.'],
  last: 'Under the complaint | is a *wish.*',
  keys: { A: [[0, { rot: 0.25 }], [0.3, { rot: 0, d: 0.4 }]] },
  front(x, w, K) {
    const b = K.st.B; if (!b) return
    if (w < DOWN) { const bz = w < 4.5 ? Math.sin(w * 60) * 6 : 0; drawPhoneSmall(x, b.x + 130 + bz, b.y - 30, 0.9, w, { rot: -0.2, lines: [60, 40, 70, 50], glow: w < 10 ? 1 : 0.4 }) }
    else { rect(x, b.x - 40, 1238, 110, 22, INK); rect(x, b.x - 34, 1242, 98, 12, '#2a2266') }   // face-down on the floor
  },
  kit: [[notification, notificationCues, N1]],
  cues: [...[0.4, 0.7, 1.0, 2.5, 2.8, 3.1, 3.4].map(t => ['tick', t, 0.05]), ['tom', DOWN, 160, { gain: 0.15, decay: 0.12 }]],
})
