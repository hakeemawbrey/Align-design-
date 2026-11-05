// kbhe01: BRAIN VS HEART, Ep 1 "Text Them First" (16 s vertical, star_talk post, music: chiptune · E). Hard cut.
// Inside ♈ Aries' head. The window (Aries' eyes) shows the chat with Rowan, a message already typed in the draft.
//   0.00   frame 0: mid whip zoom; Heart mid-dive at the giant SEND button, Brain hanging off its foot.
//          Slam title "Aries vs. the | *send button.*" already landed. 0.32 shake as they crash back to their sides.
//   1.30   BRAIN: "wait *20 minutes.* be cool."  A red 20:00 timer pops up in the window.
//   2.90   HEART (screaming): "20 MINUTES IS A *YEAR.*"
//   4.20   Heart yanks the TIME lever: the timer whirls down 19:59 → 0:03.  5.50 BRAIN: "that's not how *time* works!"
//   7.00   0:00. Heart slams SEND. 7.25 record scratch + freeze: "yep. *delivered.*"
//   8.95   typing… 9.10 BRAIN (sweating): "they'll think we're *too much.*"
//  10.20   notification drop + reply: "omg I was literally about to text you". Brain's clipboard goes flying.
//  11.10   HEART: "TOLD *YOU.*"  achievement pop "TEXTED FIRST · *survived.*"
//  14.20   BRAIN, glasses crooked: "Okay. Being cool is *overrated.*"  (hard cut at 16.2)
// Pisces cam: worried sniffles, then full happy fountains from the reply on. Pure f(t).
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import {
  whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, recordScratch, recordScratchCues, frozen,
  notification, notificationCues, achievement, achievementCues,
} from '../../hookkit.js'
import {
  L, drawRoom, drawWindow, drawDesk, drawBrain, drawHeart, bubble, bubbleCues, drawChat, drawLever, buildBug, clipboard,
  key, step, clamp, lerp, prog, ease, pop01, sparkles, INK, BONE, GOLD, MONO, R, signStar,
} from '../bhkit.js'

export const DURATION = 16.2
const SIGN = 'aries', ARI = signStar('aries')

// ── kit effects (one opts object each: picture + sound)
const WHIP = { at: -0.18, len: 0.5, from: 2.2, cy: 1250 }
const HOOK = { at: -1, text: 'Aries vs. the | *send button.*', top: 168, size: 104 }
const SHAKE = { at: 0.32, len: 0.45, amp: 24 }
const REC = { at: 7.25, len: 1.6, caption: 'yep. *delivered.*', sub: 'ARIES · 0 SECONDS OF CHILL', top: 1640 }
const NOTIF = { at: 10.2, out: [12.6, 12.9], title: 'texts', body: 'Rowan: omg I was *literally* about to text you', glyph: '♌', time: 'now', y: 110 }
const ACH = { at: 11.6, out: [13.7, 14.0], text: 'texted first. *survived.*', y: 1700 }

// ── the story timeline
const T = {
  timerIn: 1.45, lever: [4.2, 4.55], whirl: [4.45, 5.4], zero: 6.95, send: 7.0,
  typing: [8.95, 10.2], reply: 10.2, fly: 10.3, cheer: [10.35, 10.75, 11.15, 11.55],
}
const BUB = [
  { t0: 1.3, t1: 2.75, who: 'brain', x: 390, y: 1195, tail: -130, text: 'wait *20 minutes.* be cool.' },
  { t0: 2.9, t1: 4.15, who: 'heart', x: 690, y: 1195, tail: 130, text: '20 MINUTES IS A *YEAR.*', size: 50, shake: 3 },
  { t0: 5.5, t1: 6.9, who: 'brain', x: 390, y: 1195, tail: -130, text: "that's not how *time* works!" },
  { t0: 9.1, t1: 10.15, who: 'brain', x: 390, y: 1195, tail: -130, text: "they'll think we're *too much.*" },
  { t0: 11.1, t1: 13.9, who: 'heart', x: 700, y: 1195, tail: 120, text: 'TOLD *YOU.*', size: 56 },
  { t0: 14.2, t1: 99, who: 'brain', x: 420, y: 1200, tail: -160, text: 'Okay. Being cool is *overrated.*', size: 46, maxW: 560 },
]
const MSGS = [
  { at: -5, side: 'R', text: 'that was so fun today' },
  { at: -4, side: 'L', text: 'agreed!! same time next week?' },
  { at: -3, side: 'R', text: 'deal', status: 'Read 4:12 PM', until: T.send },
  { at: -3, side: 'R', text: 'deal', from: T.send },
  { at: T.send, side: 'R', text: 'hey! how was your day?', status: 'Delivered', until: T.reply },
  { at: T.reply, side: 'R', text: 'hey! how was your day?', status: 'Read' },
  { at: T.reply + 0.05, side: 'L', text: 'omg I was literally about to text you' },
]
const DRAFT = [{ t: -9, type: 'type', text: 'hey! how was your day?', cps: 99 }, { t: T.send, type: 'clear' }]

// timer value in seconds
function timerAt(t) {
  if (t < T.whirl[0]) return 1200 - Math.max(0, Math.floor(t - T.timerIn - 0.6))
  if (t < T.whirl[1]) return Math.round(lerp(1199, 3, ease.inOutCubic(prog(t, ...T.whirl))))
  return Math.max(0, 3 - Math.floor((t - T.whirl[1]) / ((T.zero - T.whirl[1]) / 3)))
}
const mmss = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

function drawTimer(x, t) {
  if (t < T.timerIn) return
  const k = pop01(t, T.timerIn, 0.3, 2.4) * (1 - ease.inQuad(prog(t, T.send + 0.1, T.send + 0.35)))
  if (k <= 0.01) return
  const v = timerAt(t), whirl = t > T.whirl[0] && t < T.whirl[1]
  x.save(); x.translate(800, 640); x.scale(k, k); x.rotate(whirl ? 0.04 * Math.sin(t * 50) : 0.03)
  R(x, INK, -170, -70, 340, 140); R(x, '#2a0a14', -160, -60, 320, 120)
  x.font = `700 92px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = v <= 3 ? '#ffe27a' : '#ff3b5c'
  x.shadowColor = x.fillStyle; x.shadowBlur = 18
  x.fillText(mmss(v), 0, 6)
  x.restore()
}

// poses
function brainP(t) {
  let px = key(t, [[0, 470], [0.3, 470], [0.75, 250, ease.outCubic]])
  let py = key(t, [[0, 1340], [0.3, 1340], [0.75, 1440, ease.inQuad]])
  let rot = key(t, [[0, 0.5], [0.3, 0.5], [0.75, 0, ease.outBack]])
  let mood = 'wide', mouth = 'scream', arms = [2.5, 2.9], look = [1, -1], tears = 0, sweat = 0
  if (t > 0.75) { mood = 'dizzy'; mouth = 'wobble'; arms = [0.6, 0.6] }
  if (t > 1.2) { mood = 'neutral'; mouth = 'flat'; arms = [0.4, 1.6]; look = [1, 0] }
  if (t > 2.9) { mood = 'wide'; mouth = 'o'; arms = [0.3, 0.3] }
  if (t > 4.2) { mood = 'wide'; mouth = 'scream'; arms = [2.6, 2.6]; look = [1, -1] }
  if (t > 5.5) { mood = 'angry'; mouth = 'open'; arms = [0.9, 2.0]; look = [1, 0] }
  if (t > T.send) { mood = 'wide'; mouth = 'scream'; arms = [2.8, 2.8]; look = [0, -1] }
  if (t > T.typing[0]) { mood = 'sad'; mouth = 'wobble'; arms = [0.2, 0.2]; sweat = 1; look = [0.5, -1] }
  if (t > T.reply) { mood = 'wide'; mouth = 'o'; arms = [2.9, 2.9]; sweat = 0 }
  if (t > T.reply + 0.6) { mood = 'dizzy'; mouth = 'wobble'; arms = [0.9, 0.9]; rot = 0.25 * Math.sin((t - T.reply) * 6) * Math.exp(-(t - T.reply) * 1.2) }
  if (t > 12.4) { mood = 'neutral'; mouth = 'flat'; look = [1, 0]; rot = 0 }
  if (t > 14.2) { mood = 'happy'; mouth = 'smile'; arms = [0.5, 2.3]; rot = -0.08 }
  const hops = [1.3, 5.5, 5.9, 14.2, 14.6]
  const prop = t < T.fly ? clipboard('l') : null
  return { x: px, y: py, mood, mouth, arms, look, rot, tears, sweat, hops, prop, c: 14 }
}
function heartP(t) {
  let px = key(t, [[0, 640], [0.3, 640], [0.8, 830, ease.outBack]])
  let py = key(t, [[0, 1240], [0.3, 1240], [0.8, 1440, ease.inQuad]])
  let rot = key(t, [[0, -0.75], [0.3, -0.75], [0.8, 0, ease.outBack]])
  let mood = 'angry', mouth = 'grin', arms = [2.9, 2.9], look = [-1, 0], walk = null
  if (t > 0.8) { mood = 'angry'; mouth = 'flat'; arms = [0.5, 0.5] }
  if (t > 2.9) { mood = 'angry'; mouth = 'scream'; arms = [2.5, 2.5]; look = [-1, -1] }
  // to the lever and back
  if (t > 4.0 && t < 5.6) { px = key(t, [[4.0, 830], [4.25, 700, ease.outCubic], [5.4, 700], [5.6, 830]]); mood = 'sly'; mouth = 'grin'; arms = [0.5, -2.6 + 1.6 * prog(t, ...T.lever)]; walk = t * 3 }
  if (t > 5.6) { mood = 'love'; mouth = 'grin'; arms = [0.7, 0.7] }
  if (t > 6.6) { mood = 'angry'; mouth = 'grin'; px = key(t, [[6.6, 830], [6.95, 640, ease.inCubic], [7.25, 640]]); py = key(t, [[6.6, 1440], [6.8, 1240, ease.outQuad], [7.0, 1340, ease.inQuad]]); arms = [2.9, 2.9]; rot = key(t, [[6.6, 0], [6.9, -0.6]]) }
  if (t > 8.85) { px = key(t, [[8.85, 640], [9.3, 830]]); py = 1440; rot = 0; mood = 'love'; mouth = 'smile'; arms = [0.3, 0.3] }
  if (t > T.reply) { mood = 'love'; mouth = 'grin'; arms = [2.8, 2.8] }
  if (t > 12.4) { mood = 'happy'; mouth = 'grin'; arms = [0.6, 0.6] }
  if (t > 14.2) { mood = 'happy'; mouth = 'smile'; arms = [2.5, 0.5]; look = [-1, 0] }
  const hops = [2.9, 3.3, 3.7, ...T.cheer, 11.1, 11.5, 15.0]
  return { x: px, y: py, mood, mouth, arms, look, rot, walk, hops, c: 14 }
}

async function build(stage) {
  const root = fill(stage, { background: '#120826' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const bug = buildBug(root, { sign: SIGN })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: DURATION + 1, root,
    update(t) {
      drawRoom(x, t, { sign: SIGN, alarm: t > 2.9 && t < 4.1 ? 0.6 : 0 })
      drawWindow(x, t, (c, Rw) => {
        drawChat(c, t, Rw, { title: 'Rowan', sub: t > T.typing[0] && t < T.reply ? 'typing…' : 'online', msgs: MSGS, typing: T.typing, draft: DRAFT, avatar: '#f3a24a', sendFlash: [T.send] })
        drawTimer(c, t)
      }, { sign: SIGN, blinks: [3.6, 8.9, 12.9] })
      drawLever(x, t, { x: 702, y: 1442, a: prog(t, ...T.lever) * (1 - prog(t, 5.4, 5.6)), label: 'TIME', col: '#ffd23a' })
      drawDesk(x, t, {
        button: { label: 'SEND', press: [T.send, -0.05], glow: t < T.send + 0.4 ? 0.9 : 0.3 },
        score: { b: [[0, 0]], h: [[0, 0], [T.reply + 0.4, 1]] },
        cam: { tears: [[0, 1], [T.send, 2], [T.reply, 3]], mood: [[0, 'wide'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4, 11.2] },
      })
      const B = drawBrain(x, t, brainP(t))
      drawHeart(x, t, heartP(t))
      // the clipboard goes flying
      if (t > T.fly && t < T.fly + 1.6 && B) {
        const p = (t - T.fly)
        const cx = 250 - 40 - 380 * p, cy = 1330 - 900 * p + 900 * p * p
        x.save(); x.translate(cx, cy); x.rotate(p * 9)
        R(x, INK, -36, -48, 72, 96); R(x, '#c98a4a', -31, -43, 62, 86); R(x, '#fffbea', -25, -34, 50, 72)
        x.restore()
      }
      sparkles(x, t, 540, 1380, T.send + 0.02, 12, 160, 1, [GOLD, BONE, '#ff3b5c'])
      sparkles(x, t, 830, 1270, T.reply + 0.1, 12, 170, 2, ['#ff3b5c', BONE, GOLD])
      for (const b of BUB) bubble(x, t, b)
      bug.update(t)
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), recordScratch(REC), notification(NOTIF), achievement(ACH)]

// ── sound
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ['pop', T.timerIn, 1318.51, 0.05, 0.3], ['tick', T.timerIn + 0.1, 0.05],
  ...Array.from({ length: 4 }, (_, i) => ['tick', +(T.timerIn + 1 + i).toFixed(2), 0.03]),
  ['whoosh', T.lever[0], 0.3, 0.05], ['tick', T.lever[1], 0.08], ['riser', T.whirl[0], T.whirl[1], 0.05],
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.whirl[0] + i * 0.08).toFixed(2), 0.03]),
  ['bell', T.whirl[1], 1318.51, 0.03, 0.6, 0.3],
  ['tick', 5.9, 0.04], ['tick', 6.4, 0.04], ['tick', 6.9, 0.05],
  ['whoosh', 6.65, 0.35, 0.05], ['boom', T.send, 0.25], ['tom', T.send, 80, { gain: 0.3, decay: 0.3 }], ['pop', T.send + 0.03, 1318.51, 0.05, 0], ['glitter', T.send, T.send + 0.3],
  ...recordScratchCues(REC),
  ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02],
  ...notificationCues(NOTIF), ['pop', T.reply + 0.05, 987.77, 0.05, -0.2],
  ['whoosh', T.fly, 0.5, 0.05], ...T.cheer.map((c, i) => ['pop', c, NOTE[i + 1], 0.04, 0.3]), ['glitter', T.reply + 0.1, T.reply + 0.6],
  ...achievementCues(ACH),
  ...bubbleCues(BUB),
  ['pluck', 14.2, 659.25, 0.05, 0.6, -0.2], ['bell', 14.25, 1318.51, 0.03, 1.2, 0],
]
