// kbhe15: BRAIN VS HEART, Ep 15 "The Old Chat at 2 A.M." (12 s vertical, star_talk post, music: lofi · G). LOOPS.
// Inside ♊ Gemini's head at 2:14 a.m. The window: an old chat, scrolling back months.
//   0.00   frame 0: mid whip zoom; Heart mid-scroll (the chat a speed blur), Brain asleep face-down on the console.
//          Title "2 a.m. Gemini, | rereading the *old chat.*"
//   1.20   HEART: "*one* more message."   2.40 Brain wakes: "it's *2:14.*"
//   3.60   the scroll goes faster; loading bar "sleep…" stalls at 3 % → "Error: still scrolling".
//   5.80   Brain gently takes the phone and plugs it in (the window goes dark, charging).  7.00 Brain tucks Heart in with a sock.
//   8.00   BRAIN: "The chat can wait. Sleep *can't.*"   10.30 Heart opens one eye and sneaks back; the chat lights up again;
//  11.5–12.0 loop-back to frame 0.
// Pisces cam: sleepy sniffles, soft happy tears at the tuck-in. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, loadingBar, loadingBarCues, loopBack, loopCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12
const SIGN = 'gemini'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: '2 a.m. Gemini, | rereading the *old chat.*', top: 168, size: 96 }
const SHAKE = { at: 0.3, len: 0.4, amp: 14 }
const LOAD = { at: 3.6, len: 2.0, label: 'sleep…', stallAt: 3, error: 'Error: still scrolling', y: 760 }
const T = { wake: 2.4, take: 5.8, plug: 6.3, tuck: 7.0, last: 8.0, sneak: 10.3, relight: 10.8 }
const BUB = [
  { t0: 1.2, t1: 2.3, who: 'heart', x: 690, y: 1195, tail: 130, text: '*one* more message.', size: 50 },
  { t0: T.wake, t1: 3.5, who: 'brain', x: 390, y: 1195, tail: -130, text: "it's *2:14.*", size: 56 },
  { t0: T.last, t1: 10.25, who: 'brain', x: 430, y: 1200, tail: -170, text: "The chat can wait. Sleep *can't.*", size: 46, maxW: 560 },
]
const OLD = ['haha remember the bus?', 'that was the best day', 'ok goodnight for real', 'goodnight!!', 'wait one more thing', 'lol', 'miss this', 'same', 'see you sunday?', 'yes!!', 'bring the umbrella', 'it did not rain lol']

function oldChat(x, t, Rw) {
  // fake fast scroll: the messages slide by, faster during the loading bar
  const speed = t < 3.6 ? 900 : t < 5.8 ? 2200 : 0
  const off = (t < 5.8 ? t * speed : (t - T.relight) * 900) % (OLD.length * 110)
  x.fillStyle = '#17112e'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  x.save(); x.beginPath(); x.rect(Rw.x, Rw.y + 104, Rw.w, Rw.h - 104); x.clip()
  if (speed > 1000) x.filter = 'blur(3px)'
  for (let k = -1; k < OLD.length + 6; k++) {
    const i = ((k % OLD.length) + OLD.length) % OLD.length, side = i % 3 ? 'L' : 'R'
    const y = Rw.y + 140 + k * 110 - off + (OLD.length * 110) * 0
    const yy = ((y - Rw.y) % (OLD.length * 110) + OLD.length * 110) % (OLD.length * 110) + Rw.y
    if (yy > Rw.y + Rw.h) continue
    x.font = `600 34px ${INTER}`; const w = x.measureText(OLD[i]).width + 44
    x.fillStyle = side === 'L' ? '#3b3466' : '#6c5cf0'; rrect(x, side === 'L' ? Rw.x + 34 : Rw.x + Rw.w - 34 - w, yy, w, 70, 22); x.fill()
    x.fillStyle = BONE; x.fillText(OLD[i], (side === 'L' ? Rw.x + 34 : Rw.x + Rw.w - 34 - w) + 22, yy + 46)
  }
  x.filter = 'none'; x.restore()
  x.fillStyle = '#231a48'; x.fillRect(Rw.x, Rw.y, Rw.w, 104)
  x.fillStyle = '#7fd0ff'; x.beginPath(); x.arc(Rw.x + 92, Rw.y + 56, 29, 0, 7); x.fill()
  x.fillStyle = BONE; x.font = `800 36px ${INTER}`; x.textAlign = 'left'; x.fillText('Jules', Rw.x + 142, Rw.y + 50)
  x.fillStyle = '#9a90c8'; x.font = `600 22px ${INTER}`; x.fillText('last seen in March', Rw.x + 142, Rw.y + 82)
  x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'right'; x.fillText('2:14 AM', Rw.x + Rw.w - 34, Rw.y + 64); x.textAlign = 'left'
}
function charging(x, t, Rw) {
  x.fillStyle = '#05030c'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  const k = 0.6 + 0.4 * Math.sin(t * 2)
  x.save(); x.globalAlpha = k
  R(x, '#5fd38a', 470, Rw.y + 220, 140, 70); R(x, '#05030c', 478, Rw.y + 228, 124, 54); R(x, '#5fd38a', 610, Rw.y + 240, 14, 30)
  R(x, '#5fd38a', 484, Rw.y + 234, 112 * clamp(prog(t, T.plug, T.plug + 3)) + 6, 42)
  x.fillStyle = '#5fd38a'; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.fillText('charging · goodnight', 540, Rw.y + 360)
  x.restore()
}

function poseAt(t) {
  const b = stepObj(t, [
    [0, { mood: 'shut', mouth: 'flat', arms: [1.6, 1.6] }],
    [T.wake, { mood: 'wide', mouth: 'open', arms: [2.6, 2.6], look: [1, -1] }],
    [3.6, { mood: 'angry', mouth: 'flat', arms: [0.4, 1.8], look: [1, 0] }],
    [T.take, { mood: 'neutral', mouth: 'smile', arms: [1.7, 1.7], look: [1, 0] }],
    [T.tuck, { mood: 'happy', mouth: 'smile', arms: [1.4, 1.4], look: [1, 0] }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0], look: [1, 0] }],
    [T.sneak, { mood: 'shut', mouth: 'flat', arms: [1.6, 1.6] }],
  ])
  const bx = key(t, [[T.take - 0.3, 250], [T.take, 560], [T.tuck - 0.3, 560], [T.tuck, 640], [T.last, 520], [T.sneak, 520], [T.sneak + 0.6, 250]])
  const sleeping = t < T.wake || t > T.sneak + 0.6
  const brot = sleeping ? 1.25 : 0, by = sleeping ? 1372 : 1440
  const h = stepObj(t, [
    [0, { mood: 'wide', mouth: 'o', arms: [0.5, 2.4], look: [0, -1] }],
    [1.2, { mood: 'love', mouth: 'smile', arms: [0.5, 2.4], look: [-0.5, -1] }],
    [T.take, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4], look: [-1, 0] }],
    [T.tuck, { mood: 'shut', mouth: 'smile', arms: [0.4, 0.4] }],
    [T.sneak, { mood: 'sly', mouth: 'smile', arms: [0.5, 2.0], look: [0, -1] }],
    [T.relight + 0.4, { mood: 'wide', mouth: 'o', arms: [0.5, 2.4], look: [0, -1] }],
  ])
  const swipe = (t < T.take || t > T.relight) ? 0.9 * Math.sin(t * 16) : 0
  h.arms = [h.arms[0], h.arms[1] + swipe * (t < T.take || t > T.relight ? 1 : 0)]
  const hsq = t > T.tuck && t < T.sneak ? 0.18 : 0
  return { b: { ...b, x: bx, y: by, rot: brot, hops: [T.wake, T.tuck, T.last] }, h: { ...h, x: 830, y: 1440, squash: hsq, hops: [1.2, T.sneak] } }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.take + 0.1, T.relight],
  view: (x, t, Rw) => (t < T.take + 0.1 || t >= T.relight ? oldChat(x, t, Rw) : charging(x, t, Rw)),
  desk: t => ({ button: { label: 'SLEEP', press: [T.plug], glow: 0.3, col: '#6a7ad8' }, score: { b: [[0, 0], [T.tuck + 0.3, 1]], h: [[0, 0]] }, cam: { tears: [[0, 1], [T.tuck, 2]], mood: [[0, 'sleepy'], [T.tuck, 'sparkle'], [T.sneak, 'sleepy']], look: [0, -1] } }),
  brain: t => poseAt(t).b, heart: t => poseAt(t).h,
  alarm: t => (t > 3.6 && t < 5.6 ? 0.3 : 0),
  front: (x, t, B, H) => {
    // z's over sleeping Brain
    if (B && (t < T.wake || t > T.sneak + 0.6)) for (let k = 0; k < 3; k++) { const ph = (t * 0.5 + k / 3) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.font = `800 ${30 + 20 * ph}px ${INTER}`; x.fillText('z', B.cx + 60 + 30 * ph, B.cy - 80 - 120 * ph); x.restore() }
    // the sock blanket over Heart
    if (H && t > T.tuck && t < T.sneak + 0.3) {
      const k = ease.outBack(prog(t, T.tuck, T.tuck + 0.4)) * (1 - prog(t, T.sneak, T.sneak + 0.3))
      x.save(); x.translate(H.cx, H.cy + 50); x.scale(k, k)
      R(x, INK, -140, -40, 280, 120); R(x, '#ff8fa0', -134, -34, 268, 108); for (let i = 0; i < 4; i++) R(x, '#fff1c8', -134, -24 + i * 26, 268, 8)
      R(x, INK, 110, -40, 60, 120); R(x, '#ff5c7a', 116, -34, 48, 108)
      x.restore()
    }
    // the charging cable from the desk into the window
    if (t > T.plug && t < T.relight) { x.strokeStyle = INK; x.lineWidth = 16; x.beginPath(); x.moveTo(560, 1440); x.bezierCurveTo(560, 1250, 520, 1150, 540, 1030); x.stroke(); x.strokeStyle = '#efe6d6'; x.lineWidth = 8; x.stroke() }
    sparkles(x, t, 830, 1290, T.tuck + 0.1, 10, 150, 1, [GOLD, BONE, '#ff8fa0'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), loadingBar(LOAD), loopBack([build, whipZoom(WHIP), slamTitle(HOOK)], { duration: DURATION, len: 0.5 })]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...Array.from({ length: 20 }, (_, i) => ['tick', +(i * 0.18).toFixed(2), 0.015]),
  ['pop', T.wake, 1567.98, 0.05, -0.3], ...loadingBarCues(LOAD),
  ['whoosh', T.take, 0.3, 0.04], ['tick', T.plug, 0.08], ['bell', T.plug + 0.05, 1174.66, 0.03, 1.0, 0], ['whoosh', T.tuck, 0.4, 0.04], ['glitter', T.tuck + 0.1, T.tuck + 0.5],
  ['pluck', T.sneak, 783.99, 0.04, 0.5, 0.3], ['tick', T.relight, 0.06],
  ...bubbleCues(BUB), ...loopCues({ duration: DURATION, len: 0.5 }),
]
