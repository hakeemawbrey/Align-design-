// kbhe02: BRAIN VS HEART, Ep 2 "Leave the Couch?" (14 s vertical, star_talk post, music: lofi · F). Hard cut.
// Inside ♉ Taurus' head on a cosy night in. The window: the group chat inviting Taurus to game night (the crush is going).
//   0.00   frame 0: mid whip zoom; Heart mid-yank on a rope tied to Brain, who is a blanket burrito. Title "Taurus vs. |
//          *actually* going out." 0.3 shake (the rope snaps taut).
//   1.20   BRAIN (burrito): "we have *snacks.* we have *blanket.*"   2.80 HEART: "THEY will be *there.*"
//   4.20   blink → the window shows the DECISION SCALE: snacks + blanket vs. THEM. It wobbles… 6.40 slams to THEM (shake).
//   6.70   BRAIN: "…fine. *fine.*" (the blanket drops)   7.60 Heart slams GET UP. 8.40 blink → chat: "on my way!"
//  10.00   both at the console, arms full (chip bag, blanket roll). 10.30 BRAIN: "We're bringing the *snacks,* though."
// Pisces cam: worried sniffles, then happy tears once the scale tips. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, step, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO, HEART_C } from '../../kbhe01/bhkit.js'

export const DURATION = 13.4
const SIGN = 'taurus'
const WHIP = { at: -0.18, len: 0.5, from: 2.2, cy: 1250 }
const HOOK = { at: -1, text: 'Taurus vs. | *actually* going out.', top: 168, size: 100 }
const SHAKE = { at: 0.3, len: 0.4, amp: 20 }
const SLAM = { at: 6.4, len: 0.45, amp: 26 }
const T = { scale: 4.2, tip: 6.4, drop: 6.7, press: 7.6, chat2: 8.4, sent: 8.9, armsFull: 9.9 }
const BUB = [
  { t0: 1.2, t1: 2.65, who: 'brain', x: 390, y: 1195, tail: -130, text: 'we have *snacks.* we have *blanket.*' },
  { t0: 2.8, t1: 4.1, who: 'heart', x: 690, y: 1195, tail: 130, text: 'THEY will be *there.*', size: 50, shake: 3 },
  { t0: 6.7, t1: 7.9, who: 'brain', x: 390, y: 1195, tail: -130, text: '…fine. *fine.*' },
  { t0: 10.3, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: "We're bringing the *snacks,* though.", size: 46, maxW: 560 },
]
const MSGS1 = [
  { at: -5, side: 'L', text: 'GAME NIGHT at 8!! who is in' },
  { at: -4, side: 'L', text: 'Jordan is coming btw' },
  { at: -3, side: 'L', text: 'taurus??' },
]
const MSGS2 = [...MSGS1, { at: T.sent, side: 'R', text: 'on my way! bringing snacks', status: 'Delivered' }]

function chips(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -34, -46, 68, 92); R(x, '#ffd23a', -28, -40, 56, 80); R(x, '#ff7a3a', -28, -12, 56, 22); R(x, '#fff1a8', -20, -34, 10, 18)
  x.fillStyle = INK; x.font = `800 14px ${INTER}`; x.textAlign = 'center'; x.fillText('CRUNCH', 0, 4)
  x.restore()
}
function blanketSq(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -44, -34, 88, 68); R(x, '#4fb3a6', -38, -28, 76, 56)
  for (let i = 0; i < 4; i++) { R(x, '#2f8a80', -38 + i * 20, -28, 8, 56); R(x, '#7fd8cc', -38, -22 + i * 14, 76, 4) }
  x.restore()
}

function scaleView(x, t, Rw) {
  const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#1a1438'); g.addColorStop(1, '#2a1c50')
  x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  x.font = `800 34px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.letterSpacing = '0.2em'; x.fillText('DECISION SCALE', 540, Rw.y + 70); x.letterSpacing = '0px'
  const a = key(t, [[T.scale, 0], [T.scale + 0.5, -0.32, ease.outBack], [5.1, -0.1], [5.5, -0.26], [6.0, 0.02], [T.tip - 0.05, -0.12], [T.tip + 0.15, 0.38, ease.outBack]])
  const cx = 540, cy = Rw.y + 210, L2 = 280
  R(x, INK, cx - 16, cy, 32, 260); R(x, '#d8dce8', cx - 9, cy, 18, 260); R(x, INK, cx - 90, cy + 250, 180, 30)
  x.save(); x.translate(cx, cy); x.rotate(a)
  R(x, INK, -L2 - 10, -14, 2 * L2 + 20, 28); R(x, '#f2c75c', -L2, -8, 2 * L2, 16)
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 22, 0, 7); x.fill(); x.fillStyle = GOLD; x.beginPath(); x.arc(cx, cy, 14, 0, 7); x.fill()
  for (const side of [-1, 1]) {
    const px = cx + Math.cos(a) * L2 * side, py = cy + Math.sin(a) * L2 * side
    x.strokeStyle = BONE; x.lineWidth = 4; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 70, py + 110); x.moveTo(px, py); x.lineTo(px + 70, py + 110); x.stroke()
    R(x, INK, px - 100, py + 104, 200, 24); R(x, '#c9c2dc', px - 94, py + 108, 188, 14)
    if (side < 0) { chips(x, px - 40, py + 56, 0.8, -0.1); blanketSq(x, px + 40, py + 70, 0.75, 0.1) }
    else {
      const hb = 1 + 0.08 * Math.sin(t * 8)
      x.save(); x.translate(px, py + 60); x.scale(hb, hb); x.fillStyle = INK; x.font = `800 110px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = HEART_C; x.fillText('♥︎', 0, 0); x.restore()
    }
    x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.fillText(side < 0 ? 'SNACKS + BLANKET' : 'THEM', px, py + 168)
  }
  if (t > T.tip) { x.font = `800 46px ${INTER}`; x.fillStyle = HEART_C; const k = pop01(t, T.tip + 0.1, 0.3, 2.6); x.save(); x.translate(540, Rw.y + Rw.h - 40); x.scale(k, k); x.fillText('THEM WINS.', 0, 0); x.restore() }
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'wide', mouth: 'o', arms: [0.2, 0.2], look: [1, 0] }],
    [0.6, { mood: 'happy', mouth: 'smile', arms: [0.2, 0.2], look: [0, 0] }],
    [2.8, { mood: 'sad', mouth: 'frown', look: [1, 0] }],
    [4.3, { mood: 'neutral', mouth: 'flat', look: [0.6, -1] }],
    [T.tip, { mood: 'wide', mouth: 'scream', look: [0.6, -1] }],
    [T.drop, { mood: 'shut', mouth: 'wobble', arms: [0.6, 0.6] }],
    [T.press, { mood: 'wide', mouth: 'o', arms: [1.2, 1.2] }],
    [T.armsFull, { mood: 'happy', mouth: 'grin', arms: [2.2, 2.2], look: [1, 0] }],
  ])
  const x0 = key(t, [[0, 330], [0.35, 300, ease.outBack], [T.armsFull - 0.4, 300], [T.armsFull, 400]])
  return { ...P, x: x0, y: 1440, rot: t < 0.35 ? 0.15 : 0, hops: [1.2, 1.7, T.drop, 10.3, 10.8], legs: t > T.drop, walk: t > T.armsFull - 0.4 && t < T.armsFull ? t * 3 : null }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'scream', arms: [-1.9, -2.2], look: [-1, 0] }],
    [0.7, { mood: 'angry', mouth: 'flat', arms: [-1.4, -1.6] }],
    [2.8, { mood: 'angry', mouth: 'scream', arms: [2.6, 2.6], look: [-1, -1] }],
    [4.3, { mood: 'neutral', mouth: 'o', arms: [0.6, 0.6], look: [-0.6, -1] }],
    [T.tip, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [T.press - 0.5, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9] }],
    [T.press + 0.4, { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }],
    [T.armsFull, { mood: 'happy', mouth: 'grin', arms: [2.2, 2.2], look: [-1, 0] }],
  ])
  let px = key(t, [[0, 830], [T.press - 0.5, 830], [T.press - 0.05, 620, ease.inCubic], [T.press + 0.5, 620], [T.press + 0.9, 830], [T.armsFull - 0.4, 830], [T.armsFull, 720]])
  let py = key(t, [[T.press - 0.5, 1440], [T.press - 0.25, 1300, ease.outQuad], [T.press, 1380, ease.inQuad], [T.press + 0.5, 1380], [T.press + 0.9, 1440]])
  const rot = t < 0.7 ? 0.42 : (t > T.press - 0.5 && t < T.press + 0.5 ? -0.5 : 0)
  return { ...P, x: px, y: py, rot, hops: [2.8, 3.2, 3.6, T.tip + 0.1, T.tip + 0.5, 10.6], walk: t > T.armsFull - 0.4 && t < T.armsFull ? t * 3 : null }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.scale, T.chat2],
  view: (x, t, Rw) => {
    if (t < T.scale || t >= T.chat2) drawChat(x, t, Rw, { title: 'game night crew', sub: '5 members', msgs: t < T.chat2 ? MSGS1 : MSGS2, avatar: '#9fe6b0', draft: [{ t: T.chat2, type: 'type', text: 'on my way! bringing snacks', cps: 60 }, { t: T.sent, type: 'clear' }], sendFlash: [T.sent] })
    else scaleView(x, t, Rw)
  },
  desk: t => ({ button: { label: 'GET UP', press: [T.press], glow: t < T.press + 0.4 ? 0.8 : 0.25, col: '#ff8a3a' }, score: { b: [[0, 0]], h: [[0, 0], [T.tip + 0.3, 1]] }, cam: { tears: [[0, 1], [T.tip, 3]], mood: [[0, 'wide'], [T.tip, 'happy']], look: [0, -1], hops: [T.tip, T.tip + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 2.8 && t < 4.0 ? 0.5 : 0),
  front: (x, t, B, H) => {
    // the blanket burrito wrapped round Brain (falls away at T.drop)
    if (B && t < T.drop + 0.5) {
      const f = ease.inCubic(prog(t, T.drop, T.drop + 0.5))
      x.save(); x.translate(0, f * 260); x.globalAlpha = 1 - f
      const bx = B.cx, by = B.cy + B.bh * 0.12
      x.fillStyle = INK; rrect(x, bx - B.bw / 2 - 18, by - 6, B.bw + 36, B.bh * 0.62 + 60, 26); x.fill()
      x.fillStyle = '#4fb3a6'; rrect(x, bx - B.bw / 2 - 10, by + 2, B.bw + 20, B.bh * 0.62 + 44, 22); x.fill()
      for (let i = 0; i < 6; i++) R(x, '#2f8a80', bx - B.bw / 2 + i * 44, by + 2, 12, B.bh * 0.62 + 44)
      for (let i = 0; i < 4; i++) R(x, '#7fd8cc', bx - B.bw / 2 - 10, by + 22 + i * 34, B.bw + 20, 6)
      x.restore()
    }
    // the rope from Heart's hands to the burrito
    if (B && H && t < T.drop) {
      const k = 1 - prog(t, 0.6, 0.9)
      if (k > 0) { x.save(); x.globalAlpha = k; x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(H.hl.x, H.hl.y); x.quadraticCurveTo((H.hl.x + B.cx) / 2, Math.max(H.hl.y, B.cy) + (t < 0.3 ? 0 : 40), B.cx + B.bw / 2 + 10, B.cy + 30); x.stroke(); x.strokeStyle = '#d9a35a'; x.lineWidth = 7; x.stroke(); x.restore() }
    }
    if (t > T.armsFull) {
      const k = pop01(t, T.armsFull, 0.3, 2.4)
      if (B) chips(x, (B.hl.x + B.hr.x) / 2, Math.min(B.hl.y, B.hr.y) - 10, 0.9 * k, -0.15)
      if (H) blanketSq(x, (H.hl.x + H.hr.x) / 2, Math.min(H.hl.y, H.hr.y) - 6, 0.9 * k, 0.12)
    }
    sparkles(x, t, 540, 1380, T.press + 0.02, 12, 160, 1, [GOLD, BONE, '#ff8a3a'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SLAM), slamTitle(HOOK)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK), ['whoosh', 0.25, 0.3, 0.05],
  ['whoosh', T.scale, 0.3, 0.04], ['tick', T.scale + 0.5, 0.06], ['tick', 5.1, 0.05], ['tick', 5.5, 0.05], ['tick', 6.0, 0.05],
  ...shakeCues(SLAM), ['bell', T.tip + 0.1, 1396.91, 0.035, 1.0, 0.2], ['glitter', T.tip + 0.1, T.tip + 0.6],
  ['whoosh', T.drop, 0.4, 0.05], ['boom', T.press, 0.22], ['tom', T.press, 82, { gain: 0.28, decay: 0.3 }], ['glitter', T.press, T.press + 0.3],
  ['whoosh', T.chat2 - 0.05, 0.2, 0.03], ['pop', T.sent, 1046.5, 0.05, 0.2],
  ['pop', T.armsFull, 880, 0.04, -0.3], ['pop', T.armsFull + 0.1, 1174.66, 0.04, 0.3],
  ...bubbleCues(BUB), ['pluck', 10.3, 698.46, 0.05, 0.6, -0.2],
]
