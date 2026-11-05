// kbhe08: BRAIN VS HEART, Ep 8 "The Feelings Vault" (14 s vertical, star_talk post, music: synthwave · F#m). Hard cut.
// Inside ♏ Scorpio's head. The window: the chat with the crush, locked behind a steel vault door marked FEELINGS.
//   0.00   frame 0: mid whip zoom; Heart mid-sprint at the vault, Brain mid-slam on the combination dial.
//          Title "Scorpio almost said | a *feeling.*"
//   1.20   BRAIN (spinning the dial shut): "and give them *POWER?*"   2.90 HEART: "tell them you *LIKE* them."
//   4.30   Heart pulls out a tiny heart-shaped key; 5.40 click; 5.50–6.60 the vault creaks open (shake).
//   6.70   the draft types "I like you. a normal amount."  7.80 Heart slams SEND.  8.10 caught circle on it: "CAUGHT
//          CARING".  9.30 typing…  10.30 reply: "me too. an abnormal amount."
//  11.20   BRAIN, fanning itself: "A normal amount. Very cool. Very *normal.*"
// Pisces cam: tense sniffles, happy fountains at the reply. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, caught, caughtCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 14
const SIGN = 'scorpio'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Scorpio almost said | a *feeling.*', top: 168, size: 100 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const CREAK = { at: 5.5, len: 1.0, amp: 12 }
const T = { key: 4.3, click: 5.4, open: [5.5, 6.6], type: 6.7, send: 7.8, typing: [9.3, 10.3], reply: 10.3, last: 11.2 }
const CAUGHT = { at: 8.1, x: 750, y: 840, r: 260, ry: 70, out: [9.1, 9.28], label: 'CAUGHT CARING', arrow: 'bl', rec: false }
const BUB = [
  { t0: 1.2, t1: 2.75, who: 'brain', x: 390, y: 1195, tail: -130, text: 'and give them *POWER?*', size: 48 },
  { t0: 2.9, t1: 4.2, who: 'heart', x: 690, y: 1195, tail: 130, text: 'tell them you *LIKE* them.', size: 46, maxW: 520 },
  { t0: T.last, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: 'A normal amount. Very cool. Very *normal.*', size: 44, maxW: 580 },
]
const MSGS = [{ at: -3, side: 'L', text: 'today was really nice' }, { at: T.send, side: 'R', text: 'I like you. a normal amount.', status: 'Delivered', until: T.reply }, { at: T.send, side: 'R', text: 'I like you. a normal amount.', status: 'Read', from: T.reply }, { at: T.reply, side: 'L', text: 'me too. an abnormal amount.' }]

function vault(x, t, cx, cy, Rr) {
  const o = ease.inOutCubic(prog(t, ...T.open))
  if (o >= 1) return
  // the door swings on its left hinge (squashes horizontally)
  const hx = cx - Rr, sx = Math.max(0.05, 1 - o)
  const shake = t > CREAK.at && t < CREAK.at + 1 ? Math.sin(t * 70) * 3 : 0
  x.save(); x.translate(hx + shake, cy); x.scale(sx, 1); x.translate(Rr, 0)
  x.fillStyle = 'rgba(8,4,20,0.7)'; x.fillRect(-Rr - 400, -400, 2 * Rr + 800, 800)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, Rr + 16, 0, 7); x.fill()
  const g = x.createRadialGradient(-Rr * 0.3, -Rr * 0.3, 10, 0, 0, Rr); g.addColorStop(0, '#d8dce8'); g.addColorStop(1, '#7a7f96')
  x.fillStyle = g; x.beginPath(); x.arc(0, 0, Rr, 0, 7); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * (Rr - 22) - 8, Math.sin(a) * (Rr - 22) - 8, 16, 16); R(x, '#b9bdd0', Math.cos(a) * (Rr - 22) - 5, Math.sin(a) * (Rr - 22) - 5, 10, 10) }
  // the wheel (spins while Brain spins the dial)
  const wa = key(t, [[0, 0], [1.2, 0], [2.6, 7], [T.click, 7], [T.open[0] + 0.5, 4]])
  x.save(); x.rotate(wa)
  x.strokeStyle = INK; x.lineWidth = 22; for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3; x.beginPath(); x.moveTo(Math.cos(a) * -110, Math.sin(a) * -110); x.lineTo(Math.cos(a) * 110, Math.sin(a) * 110); x.stroke() }
  x.strokeStyle = '#5a5f76'; x.lineWidth = 12; for (let k = 0; k < 3; k++) { const a = k * Math.PI / 3; x.beginPath(); x.moveTo(Math.cos(a) * -104, Math.sin(a) * -104); x.lineTo(Math.cos(a) * 104, Math.sin(a) * 104); x.stroke() }
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 34, 0, 7); x.fill(); x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(0, 0, 24, 0, 7); x.fill()
  R(x, INK, -130, Rr * 0.5, 260, 56); R(x, '#ffd23a', -124, Rr * 0.5 + 6, 248, 44)
  x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.14em'; x.fillText('FEELINGS', 4, Rr * 0.5 + 29); x.letterSpacing = '0px'
  x.restore()
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'scream', arms: [2.5, 2.9], look: [1, -1] }],
    [1.2, { mood: 'angry', mouth: 'open', arms: [2.2, 2.6], look: [1, -1] }],
    [2.9, { mood: 'sly', mouth: 'flat', arms: [0.4, 1.6], look: [1, 0] }],
    [T.click, { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8], look: [0.5, -1] }],
    [T.type, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], look: [0.5, -1], sweat: 1 }],
    [T.reply, { mood: 'wide', mouth: 'o', arms: [2.9, 2.9], sweat: 0 }],
    [T.last, { mood: 'happy', mouth: 'wobble', arms: [0.4, 2.5 + 0.35 * Math.sin(t * 22)], look: [1, 0], sweat: 1 }],
  ])
  return { ...P, x: 250, y: 1440, hops: [0.2, 1.2, 1.6, 2.0, T.click, T.reply, T.last], rot: t < 2.8 ? 0.06 * Math.sin(t * 20) : 0 }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'grin', arms: [2.4, -1.2], look: [-1, -0.5] }],
    [0.8, { mood: 'angry', mouth: 'flat', arms: [0.5, 0.5], look: [-1, 0] }],
    [2.9, { mood: 'angry', mouth: 'scream', arms: [2.6, 2.6], look: [-1, -1] }],
    [T.key, { mood: 'sly', mouth: 'grin', arms: [0.5, 2.6], look: [0, -1] }],
    [T.open[1], { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }],
    [T.send - 0.4, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9] }],
    [T.send + 0.4, { mood: 'love', mouth: 'smile', arms: [0.4, 0.4], look: [-0.5, -1] }],
    [T.reply, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [T.last, { mood: 'happy', mouth: 'grin', arms: [0.5, 2.4], look: [-1, 0] }],
  ])
  let hx = key(t, [[0, 700], [0.7, 830, ease.outBack], [T.key + 0.3, 830], [4.9, 700], [T.open[1], 700], [T.send - 0.5, 700], [T.send - 0.1, 620, ease.inCubic], [T.send + 0.5, 620], [T.send + 0.9, 830]])
  let hy = key(t, [[T.key + 0.3, 1440], [4.75, 1180, ease.outQuad], [5.1, 1180], [5.6, 1440, ease.inQuad], [T.send - 0.5, 1440], [T.send - 0.3, 1300, ease.outQuad], [T.send, 1380, ease.inQuad], [T.send + 0.5, 1380], [T.send + 0.9, 1440]])
  const rot = t < 0.7 ? -0.35 : (t > T.send - 0.4 && t < T.send + 0.4 ? -0.5 : 0)
  return { ...P, x: hx, y: hy, rot, walk: t < 0.7 ? t * 5 : null, hops: [2.9, 3.3, T.reply, T.reply + 0.4, T.last + 0.3] }
}

const build = makeBuild({
  sign: SIGN, blinks: [],
  view: (x, t, Rw) => {
    drawChat(x, t, Rw, { title: 'Ash', sub: t > T.typing[0] && t < T.reply ? 'typing…' : 'online', msgs: MSGS, typing: T.typing, avatar: '#7fd0f0', draft: [{ t: T.type, type: 'type', text: 'I like you. a normal amount.', cps: 26 }, { t: T.send, type: 'clear' }], sendFlash: [T.send] })
    vault(x, t, 540, Rw.y + Rw.h / 2, 230)
  },
  desk: t => ({ button: { label: 'SEND', press: [T.send], glow: t > T.type && t < T.send + 0.3 ? 0.8 : 0.15, col: '#c4302b' }, score: { b: [[0, 0]], h: [[0, 0], [T.reply + 0.3, 1]] }, cam: { tears: [[0, 1], [T.click, 2], [T.reply, 3]], mood: [[0, 'wide'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > T.click && t < T.open[1] ? 0.4 : 0),
  back: (x, t) => {
    // the combination dial on the console (Brain's side)
    const a = key(t, [[0, 0], [1.2, 0], [2.6, 9]])
    x.save(); x.translate(400, 1400)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 50, 0, 7); x.fill(); x.fillStyle = '#c9cfe0'; x.beginPath(); x.arc(0, 0, 42, 0, 7); x.fill()
    x.rotate(a); for (let i = 0; i < 10; i++) { x.rotate(Math.PI / 5); R(x, INK, -3, -40, 6, 12) } R(x, '#ff3b5c', -5, -42, 10, 20)
    x.restore()
  },
  front: (x, t, B, H) => {
    if (H && t > T.key && t < T.open[0] + 0.2) {
      const k = pop01(t, T.key, 0.3, 2.6) * (1 - prog(t, T.open[0], T.open[0] + 0.2)), h = H.hr
      x.save(); x.translate(h.x + 10, h.y - 30); x.scale(k, k); x.rotate(0.3)
      x.fillStyle = INK; x.font = `800 74px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥︎', 2, 2); x.fillStyle = '#ff6f86'; x.fillText('♥︎', 0, 0)
      R(x, INK, -6, 22, 12, 60); R(x, GOLD, -3, 24, 6, 56); R(x, GOLD, 3, 60, 14, 6); R(x, GOLD, 3, 72, 10, 6)
      x.restore()
    }
    sparkles(x, t, 540, 750, T.click, 12, 200, 1, [GOLD, BONE, '#ff6f86'])
    sparkles(x, t, 540, 1380, T.send + 0.02, 12, 160, 2, [GOLD, BONE, '#c4302b'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(CREAK), slamTitle(HOOK), caught(CAUGHT)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(1.2 + i * 0.12).toFixed(2), 0.05]), ['tom', 2.6, 70, { gain: 0.25, decay: 0.3 }],
  ['pluck', T.key, 1479.98, 0.04, 0.6, 0.3], ['glitter', T.key, T.key + 0.3], ['whoosh', 4.5, 0.3, 0.04],
  ['tick', T.click, 0.1], ['pop', T.click + 0.02, 1760, 0.04, 0], ...shakeCues(CREAK), ['riser', T.open[0], T.open[1], 0.05], ['boom', T.open[1], 0.2],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(T.type + i * 0.07).toFixed(2), 0.02]),
  ['boom', T.send, 0.22], ['tom', T.send, 82, { gain: 0.28, decay: 0.3 }], ['pop', T.send + 0.05, 1479.98, 0.05, 0],
  ...caughtCues(CAUGHT), ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02],
  ['pop', T.reply, 1108.73, 0.05, -0.2], ['glitter', T.reply + 0.05, T.reply + 0.6],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1479.98, 0.03, 1.4, 0],
]
