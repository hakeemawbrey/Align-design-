// kbhe11: BRAIN VS HEART, Ep 11 "lol cool" (12.4 s vertical, star_talk post, music: synthwave · Am). Hard cut.
// Inside ♒ Aquarius' head. The window: the crush asks "want to come to the stargazing thing friday?"
//   0.00   frame 0: mid whip zoom; Heart mid-pound inside a glass box labelled CHILL, Brain in tiny sunglasses at the
//          keyboard; the draft already says "lol cool maybe". Title "Aquarius typed 'lol cool.' | *It's not.*"
//   1.20   BRAIN: "keep it *mysterious.*"   2.60 the box lid flies off (shake), Heart grabs the keys:
//          "YES I WOULD LOVE THAT!!!!!!"   4.20 BRAIN: "*too* much!" delete, delete.  4.90 glitch: "CHILL.EXE has stopped responding".
//   6.30   they type together: "I'd really like that."  7.80 SEND.  8.40 reply: "yay! I'll save you a spot". Heart melts.
//   9.60   Brain takes the sunglasses off: "Turns out caring is pretty *cool.*"
// Pisces cam: sniffles at "lol cool", happy tears at the reply. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, glitch, glitchCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12.4
const SIGN = 'aquarius'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Aquarius typed 'lol cool.' | *It's not.*", top: 168, size: 92 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const BURST = { at: 2.6, len: 0.5, amp: 26 }
const GL = { at: 4.9, len: 1.2, text: 'CHILL.EXE has stopped responding', buttons: ['WAIT', 'CARE'] }
const T = { burst: 2.6, heartType: 2.8, del: 4.3, together: 6.4, send: 7.8, reply: 8.4, last: 9.6 }
const BUB = [
  { t0: 1.2, t1: 2.5, who: 'brain', x: 390, y: 1195, tail: -130, text: 'keep it *mysterious.*', size: 48 },
  { t0: 4.2, t1: 4.9, who: 'brain', x: 390, y: 1195, tail: -130, text: '*too* much!', size: 56, shake: 3 },
  { t0: T.last, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: 'Turns out caring is pretty *cool.*', size: 46, maxW: 560 },
]
const DRAFT = [
  { t: -9, type: 'type', text: 'lol cool maybe', cps: 99 },
  { t: T.heartType, type: 'clear' }, { t: T.heartType, type: 'type', text: 'YES I WOULD LOVE THAT!!!!!!', cps: 24 },
  { t: T.del, type: 'del', cps: 40 },
  { t: T.together, type: 'type', text: "I'd really like that.", cps: 20 },
  { t: T.send, type: 'clear' },
]
const MSGS = [{ at: -3, side: 'L', text: 'want to come to the stargazing thing friday?' }, { at: T.send, side: 'R', text: "I'd really like that.", status: 'Delivered' }, { at: T.reply, side: 'L', text: "yay! I'll save you a spot" }]

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'sly', mouth: 'smile', arms: [1.3, 1.3], look: [0, 1] }],
    [1.2, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.2], look: [1, 0] }],
    [T.burst, { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8], look: [1, -1] }],
    [T.del - 0.1, { mood: 'angry', mouth: 'open', arms: [1.3, 1.3], look: [0, 1] }],
    [5.0, { mood: 'dizzy', mouth: 'wobble', arms: [0.6, 0.6] }],
    [6.2, { mood: 'happy', mouth: 'smile', arms: [1.3, 1.3], look: [0, 1] }],
    [T.reply, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.8], look: [1, 0] }],
  ])
  const xx = key(t, [[T.together - 0.4, 250], [T.together - 0.1, 400, ease.outCubic], [T.send + 0.2, 400], [T.send + 0.5, 250]])
  return { ...P, x: xx, y: 1440, hops: [1.2, T.del, T.del + 0.3, T.last], prop: (x, t2, o) => {
    // tiny sunglasses until T.last, then they fly off
    const p = prog(t2, T.last, T.last + 0.6)
    if (p >= 1) return
    const gx = o.cx + p * 300, gy = o.cy + o.c * 1.3 - p * 260 + p * p * 120
    x.save(); x.translate(gx, gy); x.rotate(p * 5)
    R(x, INK, -o.c * 7.5, -o.c * 1.6, o.c * 15, o.c * 3.4); R(x, '#2a1a50', -o.c * 7, -o.c * 1.1, o.c * 5.5, o.c * 2.4); R(x, '#2a1a50', o.c * 1.5, -o.c * 1.1, o.c * 5.5, o.c * 2.4)
    R(x, '#7fd0f0', -o.c * 6.4, -o.c * 0.8, o.c * 1.6, o.c * 0.7); R(x, '#7fd0f0', o.c * 2.1, -o.c * 0.8, o.c * 1.6, o.c * 0.7)
    x.restore()
  } }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'scream', arms: [2.3, 2.0], look: [-1, 0] }],
    [T.burst, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9], look: [0, -1] }],
    [T.heartType, { mood: 'love', mouth: 'scream', arms: [1.3, 1.3], look: [0, 1] }],
    [T.del, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4], look: [-1, 0] }],
    [6.2, { mood: 'love', mouth: 'smile', arms: [1.3, 1.3], look: [0, 1] }],
    [T.reply, { mood: 'love', mouth: 'grin', arms: [0.4, 0.4], look: [-0.5, -1] }],
    [T.last, { mood: 'love', mouth: 'grin', arms: [2.4, 0.5], look: [-1, 0] }],
  ])
  let xx = key(t, [[T.burst + 0.1, 830], [T.heartType, 700, ease.outCubic], [T.del, 700], [T.del + 0.3, 830], [T.together - 0.4, 830], [T.together - 0.1, 680, ease.outCubic], [T.send + 0.2, 680], [T.send + 0.5, 830]])
  const pound = t < T.burst ? 0.08 * Math.sin(t * 18) : 0
  const melt = t > T.reply ? 0.2 * ease.outCubic(prog(t, T.reply, T.reply + 0.6)) : 0
  return { ...P, x: xx, y: 1440, rot: pound, squash: melt, hops: t < T.burst ? [0.1, 0.5, 0.9, 1.3, 1.7, 2.1, 2.5] : [T.heartType, T.reply + 0.1] }
}

const build = makeBuild({
  sign: SIGN, blinks: [],
  view: (x, t, Rw) => drawChat(x, t, Rw, { title: 'Wren', sub: 'online', msgs: MSGS, avatar: '#ffd23a', draft: DRAFT, sendFlash: [T.send], font: 38 }),
  desk: t => ({ button: { label: 'SEND', press: [T.send], glow: 0.4, col: '#3fa8e0' }, score: { b: [[0, 0], [T.send + 0.2, 1]], h: [[0, 0], [T.send + 0.2, 1]] }, cam: { tears: [[0, 1], [T.reply, 3]], mood: [[0, 'wide'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > T.heartType && t < T.del ? 0.45 : 0),
  back: (x, t) => {
    // the keyboard on the console
    R(x, INK, 300, 1448, 480, 70); R(x, '#4a4070', 306, 1454, 468, 58)
    for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) { const hit = Math.floor(t * 12 + i * 3 + j) % 9 === 0 && ((t > T.heartType && t < 4.0) || (t > T.together && t < 7.4) || t < 0.6); R(x, hit ? '#ffd23a' : '#c9c2dc', 314 + i * 38, 1460 + j * 26, 30, 20) }
  },
  front: (x, t) => {
    // the glass CHILL box around Heart (lid flies off at T.burst)
    const p = prog(t, T.burst, T.burst + 0.6)
    if (p < 1) {
      x.save(); x.globalAlpha = 1 - p
      x.strokeStyle = '#bfefff'; x.lineWidth = 8; x.strokeRect(690, 1150, 280, 300)
      x.fillStyle = 'rgba(190,240,255,0.14)'; x.fillRect(690, 1150, 280, 300)
      x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(710, 1170, 14, 120)
      x.restore()
      x.save(); x.translate(830 + p * 260, 1140 - p * 500 + p * p * 300); x.rotate(p * 4); R(x, INK, -150, -24, 300, 48); R(x, '#7fd0f0', -144, -18, 288, 36); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHILL', 0, 2); x.restore()
    }
    sparkles(x, t, 830, 1250, T.burst, 12, 180, 1, ['#bfefff', BONE, GOLD])
    sparkles(x, t, 830, 1250, T.reply + 0.1, 12, 170, 2, ['#ff3b5c', BONE, GOLD])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(BURST), slamTitle(HOOK), glitch(GL)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...Array.from({ length: 7 }, (_, i) => ['tom', +(0.1 + i * 0.4).toFixed(2), 160, { gain: 0.1, decay: 0.1 }]),
  ...shakeCues(BURST), ['whoosh', T.burst, 0.5, 0.05], ['glitter', T.burst, T.burst + 0.4],
  ...Array.from({ length: 16 }, (_, i) => ['tick', +(T.heartType + i * 0.07).toFixed(2), 0.025]),
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(T.del + i * 0.06).toFixed(2), 0.03]),
  ...glitchCues(GL), ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.together + i * 0.09).toFixed(2), 0.02]),
  ['boom', T.send, 0.2], ['tom', T.send, 82, { gain: 0.26, decay: 0.3 }], ['pop', T.send + 0.05, 1318.51, 0.05, 0],
  ['pop', T.reply, 987.77, 0.05, -0.2], ['glitter', T.reply + 0.1, T.reply + 0.6], ['whoosh', T.last, 0.5, 0.04],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1318.51, 0.03, 1.4, 0],
]
