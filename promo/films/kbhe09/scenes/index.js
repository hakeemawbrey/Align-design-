// kbhe09: BRAIN VS HEART, Ep 9 "Date Three, Big Trip" (12.4 s vertical, star_talk post, music: funk · Bb). Hard cut.
// Inside ♐ Sagittarius' head, after date three. The window: a big road map.
//   0.00   frame 0: mid whip zoom; Heart mid-leap onto an overstuffed suitcase, Brain with a calendar.
//          Title "Date three. | Sagittarius wants *a trip.*"
//   1.20   HEART: "ROAD TRIP. *ten cities.*" (a zig-zag route draws across ten pins)   2.80 BRAIN: "maybe… a *day trip* first?"
//   4.20   the map folds smaller and smaller, pins pop off one by one, until one pin is left: "THE LAKE · 1 HR".
//   6.40   the suitcase shrinks into a little picnic basket.  7.00 blink → chat: "picnic at the lake saturday?" sent 7.9.
//   8.80   reply + notification: "yes!! I'll bring the blanket"
//   9.80   BRAIN + HEART: "Small trip. Big *feelings.*"
// Pisces cam: overwhelmed sniffles, happy tears at the yes. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12.4
const SIGN = 'sagittarius'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Date three. | Sagittarius wants *a trip.*', top: 168, size: 92 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const NOTIF = { at: 8.8, out: [10.9, 11.2], title: 'texts', body: 'Noor: yes!! I’ll bring the *blanket*', glyph: '♎', time: 'now', y: 110 }
const T = { route: [1.3, 2.6], fold: [4.2, 6.0], pin: 6.2, basket: 6.4, chat: 7.0, send: 7.9, reply: 8.8, last: 9.8 }
const BOTH = { bg: '#fff1c8', fg: INK, acc: '#d0306a', tag: 'BRAIN + HEART' }
const BUB = [
  { t0: 1.2, t1: 2.65, who: 'heart', x: 690, y: 1195, tail: 130, text: 'ROAD TRIP. *ten cities.*', size: 50 },
  { t0: 2.8, t1: 4.1, who: 'brain', x: 400, y: 1195, tail: -140, text: 'maybe… a *day trip* first?', size: 46 },
  { t0: T.last, t1: 99, who: BOTH, x: 540, y: 1205, tail: 0, text: 'Small trip. Big *feelings.*', size: 54 },
]
const MSGS = [{ at: -3, side: 'L', text: 'tonight was the best date' }, { at: T.send, side: 'R', text: 'picnic at the lake saturday?', status: 'Delivered' }, { at: T.reply, side: 'L', text: "yes!! I'll bring the blanket" }]
const PINS = [[200, 360], [300, 230], [400, 420], [500, 260], [600, 400], [690, 200], [780, 380], [850, 250], [920, 420], [960, 300]].map(([a, b]) => [a + 40, b])

function map(x, t, Rw) {
  x.fillStyle = '#0f1430'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  const f = prog(t, ...T.fold), folds = Math.floor(f * 4), ff = f * 4 - folds
  const sc = Math.pow(0.8, folds + ease.inOutCubic(ff)) // smaller each fold
  x.save(); x.translate(540, Rw.y + Rw.h / 2); x.scale(sc, sc); x.translate(-540, -(Rw.y + Rw.h / 2))
  // paper map
  R(x, INK, Rw.x + 30, Rw.y + 30, Rw.w - 60, Rw.h - 60); R(x, '#f1e3bf', Rw.x + 38, Rw.y + 38, Rw.w - 76, Rw.h - 76)
  for (let i = 1; i < 4; i++) R(x, 'rgba(160,130,80,0.35)', Rw.x + 38 + i * (Rw.w - 76) / 4, Rw.y + 38, 3, Rw.h - 76)
  x.fillStyle = '#a8d8a0'; x.beginPath(); x.ellipse(Rw.x + 260, Rw.y + 380, 140, 70, 0.3, 0, 7); x.fill()
  x.fillStyle = '#7fc0e8'; x.beginPath(); x.ellipse(Rw.x + 520, Rw.y + 300, 70, 46, -0.2, 0, 7); x.fill()
  x.fillStyle = '#a8d8a0'; x.beginPath(); x.ellipse(Rw.x + 740, Rw.y + 160, 120, 60, 0, 0, 7); x.fill()
  // route
  const r = prog(t, ...T.route), n = Math.round(r * (PINS.length - 1))
  const alive = i => i === 4 || t < T.fold[0] + (i < 4 ? i : i - 1) * 0.18
  x.strokeStyle = '#ff3b5c'; x.lineWidth = 7; x.setLineDash([18, 12]); x.beginPath()
  PINS.slice(0, n + 1).forEach(([a, b], i) => { if (!alive(i)) return; i ? x.lineTo(Rw.x + a - 40, Rw.y + b) : x.moveTo(Rw.x + a - 40, Rw.y + b) }); x.stroke(); x.setLineDash([])
  PINS.forEach(([a, b], i) => {
    if (i > n || !alive(i)) return
    const k = pop01(t, T.route[0] + i * 0.13, 0.25, 2.6)
    const px = Rw.x + a - 40, py = Rw.y + b
    x.save(); x.translate(px, py); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.arc(0, -26, 20, 0, 7); x.fill(); x.beginPath(); x.moveTo(-16, -18); x.lineTo(0, 6); x.lineTo(16, -18); x.fill(); x.fillStyle = i === 4 ? '#5fd38a' : '#ff3b5c'; x.beginPath(); x.arc(0, -26, 14, 0, 7); x.fill(); x.restore()
  })
  x.restore()
  if (t > T.pin) {
    const k = pop01(t, T.pin, 0.35, 2.4)
    x.save(); x.translate(540, Rw.y + Rw.h - 80); x.scale(k, k)
    R(x, INK, -230, -44, 460, 88); R(x, '#5fd38a', -224, -38, 448, 76)
    x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE LAKE · 1 HR', 0, 2)
    x.restore()
  }
}
function suitcase(x, cx, cy, s, t) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  const b = 1 + 0.04 * Math.sin(t * 14)
  R(x, INK, -110 * b, -150, 220 * b, 160); R(x, '#d86a3a', -102 * b, -142, 204 * b, 144); R(x, '#a84a2a', -102 * b, -80, 204 * b, 10)
  R(x, INK, -40, -176, 80, 30); R(x, '#d86a3a', -32, -170, 64, 18)
  // stuff poking out
  R(x, INK, -90, -164, 50, 30); R(x, '#7fd0ff', -86, -160, 42, 22); R(x, INK, 40, -168, 46, 34); R(x, '#ffd23a', 44, -164, 38, 26)
  x.restore()
}
function basket(x, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, -70, 60, Math.PI, 0); x.stroke(); x.strokeStyle = '#c98a4a'; x.lineWidth = 7; x.stroke()
  R(x, INK, -84, -76, 168, 80); R(x, '#c98a4a', -78, -70, 156, 68); for (let i = 0; i < 5; i++) R(x, '#a86a30', -78 + i * 34, -70, 8, 68)
  R(x, '#ff5c7a', -78, -76, 156, 14); for (let i = 0; i < 8; i++) R(x, '#fff', -78 + i * 20, -76, 10, 14)
  x.restore()
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'open', arms: [1.4, 1.6], look: [0, 1] }],
    [1.2, { mood: 'wide', mouth: 'o', arms: [1.4, 1.6], look: [1, -1] }],
    [2.8, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.2], look: [1, 0] }],
    [T.fold[0], { mood: 'happy', mouth: 'smile', arms: [0.4, 2.4], look: [0.5, -1] }],
    [T.chat, { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4], look: [0.5, -1] }],
    [T.reply, { mood: 'happy', mouth: 'grin', arms: [2.7, 2.7] }],
    [T.last, { mood: 'happy', mouth: 'grin', arms: [0.5, 1.7], look: [1, 0] }],
  ])
  const xx = key(t, [[9.5, 250], [T.last, 370, ease.outBack]])
  return { ...P, x: xx, y: 1440, hops: [0.15, 0.4, 2.8, T.reply, T.last] }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8], look: [0, 1] }],
    [1.2, { mood: 'love', mouth: 'scream', arms: [2.7, 2.4], look: [-1, -1] }],
    [2.8, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4], look: [-1, 0] }],
    [T.fold[0], { mood: 'wide', mouth: 'o', arms: [0.4, 0.4], look: [-0.5, -1] }],
    [T.pin, { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }],
    [T.reply, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [T.last, { mood: 'love', mouth: 'grin', arms: [1.7, 0.5], look: [-1, 0] }],
  ])
  const onCase = t < T.basket
  const yy = key(t, [[0, 1250], [0.5, 1290, ease.outQuad], [T.basket - 0.1, 1290], [T.basket + 0.3, 1440, ease.outBack]])
  const xx = key(t, [[9.5, 860], [T.last, 710, ease.outBack]])
  return { ...P, x: xx, y: yy, rot: t < 0.4 ? -0.3 : 0, hops: onCase ? [1.2, 1.6, 2.0] : [T.reply, T.reply + 0.4, T.last] }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.chat],
  view: (x, t, Rw) => (t < T.chat ? map(x, t, Rw) : drawChat(x, t, Rw, { title: 'Noor', sub: 'online', msgs: MSGS, avatar: '#e1b0e8', draft: [{ t: T.chat + 0.1, type: 'type', text: 'picnic at the lake saturday?', cps: 40 }, { t: T.send, type: 'clear' }], sendFlash: [T.send] })),
  desk: t => ({ button: { label: 'SEND', press: [T.send], glow: 0.4, col: '#f08a3a' }, score: { b: [[0, 0], [T.pin + 0.2, 1]], h: [[0, 0], [T.reply + 0.3, 1]] }, cam: { tears: [[0, 2], [T.reply, 3]], mood: [[0, 'wide'], [T.pin, 'sparkle'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4] } }),
  brain: brainP, heart: heartP,
  back: (x, t) => {
    if (t < T.basket + 0.25) suitcase(x, 860, 1440, lerp(1, 0.3, ease.inCubic(prog(t, T.basket, T.basket + 0.25))) , t)
    else basket(x, 700, 1440, pop01(t, T.basket + 0.25, 0.3, 2.4) * 0.8)
  },
  front: (x, t, B) => {
    if (B && t < T.chat) { // the calendar in Brain's hands
      const cx = (B.hl.x + B.hr.x) / 2, cy = Math.min(B.hl.y, B.hr.y) - 20
      R(x, INK, cx - 60, cy - 50, 120, 100); R(x, '#fffbea', cx - 54, cy - 44, 108, 88); R(x, '#ff5c7a', cx - 54, cy - 44, 108, 22)
      for (let i = 0; i < 3; i++) for (let j = 0; j < 4; j++) R(x, j === 2 && i === 1 ? '#5fd38a' : '#c9c2dc', cx - 46 + j * 25, cy - 14 + i * 20, 18, 14)
    }
    sparkles(x, t, 540, 900, T.pin, 12, 200, 1, [GOLD, BONE, '#5fd38a'])
    sparkles(x, t, 700, 1380, T.basket + 0.25, 10, 140, 2, [GOLD, BONE])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), slamTitle(HOOK), notification(NOTIF)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK), ['tom', 0.45, 90, { gain: 0.2, decay: 0.2 }],
  ...Array.from({ length: 10 }, (_, i) => ['pop', +(T.route[0] + i * 0.13).toFixed(2), [932.33, 1046.5, 1174.66, 1396.91][i % 4], 0.03, (i / 5 - 1) * 0.5]),
  ...[0, 1, 2, 3].map(i => ['whoosh', +(T.fold[0] + i * 0.45).toFixed(2), 0.25, 0.045]),
  ...Array.from({ length: 9 }, (_, i) => ['tick', +(T.fold[0] + i * 0.18).toFixed(2), 0.03]),
  ['pop', T.pin, 1396.91, 0.05, 0], ['bell', T.pin + 0.05, 1864.66, 0.03, 1.0, 0], ['glitter', T.pin, T.pin + 0.4],
  ['whoosh', T.basket, 0.3, 0.04], ['pop', T.basket + 0.25, 932.33, 0.05, 0.3],
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.chat + 0.1 + i * 0.06).toFixed(2), 0.02]), ['pop', T.send, 1174.66, 0.05, 0.2],
  ...notificationCues(NOTIF), ['glitter', T.reply + 0.05, T.reply + 0.6],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1864.66, 0.03, 1.4, 0],
]
