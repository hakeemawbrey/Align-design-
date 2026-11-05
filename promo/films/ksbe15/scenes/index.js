// ksbe15: SAY IT BETTER ep 15, "You're just like my ex" (♋ Cancer to ♌ Leo, on a date). cinematic · Gm. Hard cut.
//   frame 0: a candlelit date, Leo mid-choke on noodles, "YOU'RE JUST LIKE MY EX!" slamming.
//   freeze ("oh no. *the ex.*") → Leo: "…the *ex?*" → THE STARS: "old hurts get *loud*." → "That reminded me of something
//   that hurt *before*. Give me a sec, it's not you." → Leo: "take your *time.*"  Cancer and Pisces (next table) both cry.
import { makeShort } from '../../ksbe01/scenes/sbshort.js'
import { rect, INK, BONE } from '../../ksbe01/scenes/sbkit.js'
import { prog, ease } from '../../../src/lib.js'
export const { DURATION, SCENES, CUES } = makeShort({
  ep: 15, room: 'dinner',
  A: { sign: 'cancer', red: 0.5 }, B: { sign: 'leo' }, P: { x: 945, y: 1150, s: 150, look: [-1, 0] },
  hook: 'Never compare them | to *the ex.*', caption: 'oh no. *the ex.*',
  caught: { x: 830, y: 1150, r: 160 },
  bad: { text: 'You’re just like my *ex!*' }, react: '…the *ex?*',
  stars: ['old hurts get *loud*.', 'say it’s *old*.'],
  better: 'That reminded me of something that hurt *before*. Give me a sec, it’s not you.',
  replies: ['take your *time.*', 'I’m not going *anywhere.*'],
  last: 'Old hurt, | *new* person.',
  keys: { A: [[10.3, { tears: 1 }], [13.9, { tears: 2 }]], B: [[0, { mood: 'wide', squash: 0.12 }], [0.6, { squash: 0 }]] },
  front(x, w, K) {
    const b = K.st.B; if (!b) return
    // noodles: Leo mid-choke at frame 0 (a noodle flies), then a calm bowl on the table
    rect(x, 480, 1080, 140, 36, INK); rect(x, 488, 1086, 124, 24, BONE)
    for (let i = 0; i < 4; i++) rect(x, 500 + i * 28, 1074 - (i % 2) * 6, 22, 10, '#f2c75c')
    const p = prog(w, -0.4, 0.8)
    if (p < 1) { const e = ease.outCubic(p); x.save(); x.translate(b.x - 30 + e * 260, b.y - 60 - Math.sin(Math.PI * e) * 220 + e * 80); x.rotate(e * 8); rect(x, -40, -5, 80, 10, '#f2c75c'); x.restore() }
  },
})
