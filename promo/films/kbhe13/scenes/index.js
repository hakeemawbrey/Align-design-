// kbhe13: BRAIN VS HEART, Ep 13 "So… What Are We?" (12.8 s vertical, star_talk post, music: pop · E). Hard cut.
// Inside ♉ Taurus' head, four months into "just hanging out". The console's big button says WHAT ARE WE?
//   0.00   frame 0: mid whip zoom; Heart mid-faceplant onto the WHAT ARE WE? button, Brain hauling it back by the foot.
//          Title "Taurus vs. | *'so… what are we?'*"
//   1.20   the window: a page-a-day calendar flips AUG · SEP · OCT · NOV, each stamped "just hanging out".
//   2.60   BRAIN: "what if the answer is *bad?*"   3.90 HEART: "what if it's *GOOD?*"   5.20 BRAIN: "then… ask *kindly.*"
//   6.40   blink → chat; they type it together; 7.50 both press the button: "hey, I really like this. what are we?"
//   8.00   typing…  9.20 reply + notification: "I was hoping you'd ask."
//  10.00   BRAIN + HEART: "The question was scarier than the *answer.*"
// Pisces cam: nervous sniffles, happy fountains at the reply. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12.8
const SIGN = 'taurus'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Taurus vs. | *'so… what are we?'*", top: 168, size: 100 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const NOTIF = { at: 9.2, out: [11.4, 11.7], title: 'texts', body: "Sasha: I was *hoping* you'd ask", glyph: '♌', time: 'now', y: 110 }
const T = { flips: [1.2, 1.5, 1.8, 2.1], chat: 6.4, press: 7.5, typing: [8.0, 9.2], reply: 9.2, last: 10.0 }
const BOTH = { bg: '#fff1c8', fg: INK, acc: '#d0306a', tag: 'BRAIN + HEART' }
const BUB = [
  { t0: 2.6, t1: 3.8, who: 'brain', x: 400, y: 1195, tail: -140, text: 'what if the answer is *bad?*', size: 46 },
  { t0: 3.9, t1: 5.1, who: 'heart', x: 690, y: 1195, tail: 130, text: "what if it's *GOOD?*", size: 52 },
  { t0: 5.2, t1: 6.3, who: 'brain', x: 400, y: 1195, tail: -140, text: 'then… ask *kindly.*', size: 50 },
  { t0: T.last, t1: 99, who: BOTH, x: 540, y: 1205, tail: 0, text: 'The question was scarier than the *answer.*', size: 44, maxW: 640 },
]
const MSGS = [{ at: -3, side: 'L', text: 'movie night again friday?' }, { at: T.press, side: 'R', text: 'hey, I really like this. what are we?', status: 'Delivered', until: T.reply }, { at: T.press, side: 'R', text: 'hey, I really like this. what are we?', status: 'Read', from: T.reply }, { at: T.reply, side: 'L', text: "I was hoping you'd ask." }]
const MONTHS = ['AUG', 'SEP', 'OCT', 'NOV']

function flipCal(x, t, Rw) {
  x.fillStyle = '#1a1438'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  let i = 0; for (let k = 0; k < 4; k++) if (t >= T.flips[k]) i = k
  const cx = 540, cy = Rw.y + Rw.h / 2
  R(x, INK, cx - 230, cy - 210, 460, 420); R(x, '#fffbea', cx - 222, cy - 202, 444, 404); R(x, '#ff5c7a', cx - 222, cy - 202, 444, 100)
  for (let r = 0; r < 6; r++) R(x, INK, cx - 180 + r * 72, cy - 222, 14, 40)
  x.fillStyle = '#fff'; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(MONTHS[i], cx, cy - 150)
  x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.fillText('just hanging out', cx, cy + 20)
  x.font = `700 26px ${MONO}`; x.fillStyle = '#7a6fa8'; x.fillText(`month ${i + 1}`, cx, cy + 120)
  // the page flipping over
  for (const f of T.flips.slice(1)) { const p = prog(t, f - 0.15, f); if (p > 0 && p < 1) { x.save(); x.translate(cx, cy - 202); x.scale(1, 1 - p); R(x, '#f0e6d0', -222, 0, 444, 404); x.restore() } }
  const sk = pop01(t, T.flips[3] + 0.15, 0.25, 2.8)
  if (sk > 0.01) { x.save(); x.translate(cx + 150, cy + 100); x.rotate(-0.25); x.scale(sk, sk); x.strokeStyle = '#ff3b5c'; x.lineWidth = 8; x.strokeRect(-110, -36, 220, 72); x.fillStyle = '#ff3b5c'; x.font = `800 40px ${INTER}`; x.fillText('…STILL?', 0, 3); x.restore() }
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'wide', mouth: 'scream', arms: [2.3, 2.7], look: [1, 0] }],
    [0.9, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4], look: [0.5, -1] }],
    [2.6, { mood: 'sad', mouth: 'wobble', arms: [0.3, 0.3], look: [1, 0], sweat: 1 }],
    [5.2, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.0], look: [1, 0], sweat: 0 }],
    [T.chat + 0.6, { mood: 'shut', mouth: 'flat', arms: [2.2, 2.2], look: [0, 0] }],
    [T.press + 0.3, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], look: [0.5, -1], sweat: 1 }],
    [T.reply, { mood: 'happy', mouth: 'grin', arms: [2.8, 2.8], sweat: 0 }],
    [T.last, { mood: 'happy', mouth: 'grin', arms: [0.5, 1.6], look: [1, 0] }],
  ])
  const xx = key(t, [[0, 450], [0.4, 450], [0.9, 250, ease.outCubic], [T.chat + 0.2, 250], [T.chat + 0.6, 440], [T.press + 0.3, 440], [T.press + 0.7, 250], [T.last - 0.3, 250], [T.last, 370, ease.outBack]])
  return { ...P, x: xx, y: 1440, hops: [2.6, 5.2, T.press, T.reply, T.last] }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'shut', mouth: 'grin', arms: [2.9, 2.9], look: [0, 0] }],
    [0.9, { mood: 'love', mouth: 'smile', arms: [0.5, 0.5], look: [-0.5, -1] }],
    [3.9, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6], look: [-1, 0] }],
    [5.2, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4], look: [-1, 0] }],
    [T.chat + 0.6, { mood: 'shut', mouth: 'flat', arms: [2.2, 2.2], look: [0, 0] }],
    [T.press + 0.3, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], look: [-0.5, -1] }],
    [T.reply, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [T.last, { mood: 'love', mouth: 'grin', arms: [1.6, 0.5], look: [-1, 0] }],
  ])
  const xx = key(t, [[0, 600], [0.4, 600], [0.9, 830, ease.outCubic], [T.chat + 0.2, 830], [T.chat + 0.6, 640], [T.press + 0.3, 640], [T.press + 0.7, 830], [T.last - 0.3, 830], [T.last, 710, ease.outBack]])
  const yy = key(t, [[0, 1320], [0.4, 1320], [0.9, 1440, ease.inQuad]])
  return { ...P, x: xx, y: yy, rot: key(t, [[0, -1.3], [0.4, -1.3], [0.9, 0, ease.outBack]]), hops: [3.9, 4.3, T.reply, T.reply + 0.4] }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.chat],
  view: (x, t, Rw) => (t < T.chat ? flipCal(x, t, Rw) : drawChat(x, t, Rw, { title: 'Sasha', sub: t > T.typing[0] && t < T.reply ? 'typing…' : 'online', msgs: MSGS, typing: T.typing, avatar: '#f39a3a', draft: [{ t: T.chat + 0.4, type: 'type', text: 'hey, I really like this. what are we?', cps: 40 }, { t: T.press, type: 'clear' }], sendFlash: [T.press] })),
  desk: t => ({ button: { label: 'WHAT ARE WE?', press: [T.press, -0.1], glow: 0.8, col: '#ff5c7a' }, score: { b: [[0, 0], [T.press + 0.2, 1]], h: [[0, 0], [T.press + 0.2, 1]] }, cam: { tears: [[0, 1], [T.press, 2], [T.reply, 3]], mood: [[0, 'wide'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 2.6 && t < 3.8 ? 0.35 : 0),
  front: (x, t) => { sparkles(x, t, 540, 1380, T.press + 0.02, 14, 170, 1, [GOLD, BONE, '#ff5c7a']); sparkles(x, t, 540, 1150, T.reply + 0.1, 12, 220, 2, ['#ff3b5c', BONE, GOLD]) },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), notification(NOTIF)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK), ['tom', 0.1, 100, { gain: 0.2, decay: 0.2 }],
  ...T.flips.map((f, i) => ['whoosh', f - 0.12, 0.15, 0.04]), ['tick', 2.25, 0.07], ['pop', 2.3, 1318.51, 0.04, 0.3],
  ['whoosh', T.chat, 0.2, 0.03], ...Array.from({ length: 18 }, (_, i) => ['tick', +(T.chat + 0.4 + i * 0.05).toFixed(2), 0.02]),
  ['boom', T.press, 0.24], ['tom', T.press, 82, { gain: 0.3, decay: 0.3 }], ['pop', T.press + 0.05, 1318.51, 0.05, 0], ['glitter', T.press, T.press + 0.3],
  ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02],
  ...notificationCues(NOTIF), ['glitter', T.reply + 0.1, T.reply + 0.6],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1318.51, 0.03, 1.4, 0],
]
