// kbhe06: BRAIN VS HEART, Ep 6 "Voice Note, Take 14" (12.8 s vertical, star_talk post, music: jazzy · C). Hard cut.
// Inside ♍ Virgo's head. The window is the voice-note recorder; a clapper board counts the takes.
//   0.00   frame 0: mid whip zoom; Brain mid-scream at the waveform, clapper "TAKE 14", Heart face-palming.
//          Title "Virgo is re-recording. | *Take fourteen.*"
//   1.10   BRAIN: "too many *'um's.* again."  1.5 clap: TAKE 15.   2.60 HEART: "JUST SAY *HI.*"
//   3.80   claps 16 · 17 · 18 in a row (small shakes).   5.30 Heart scrolls the takes list back to "take 3 (laughs)",
//   6.20   slams SEND. 6.50 record scratch + freeze "yep. *take three.*" (the one where Virgo laughed mid-sentence).
//   8.20   Brain, horror.  typing…  9.40 reply + notification: "your laugh made my whole day"
//  10.20   BRAIN, clipboard down: "The messy take was the *good* one."
// Pisces cam: nervous sniffles, then happy tears at the reply. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, recordScratch, recordScratchCues, frozen, notification, notificationCues } from '../../hookkit.js'
import { makeBuild, drawChat, clipboard, bubbleCues, key, stepObj, step, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER, MONO } from '../../kbhe01/bhkit.js'

export const DURATION = 12.8
const SIGN = 'virgo'
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Virgo is re-recording. | *Take fourteen.*', top: 168, size: 92 }
const SHAKE = { at: 0.3, len: 0.4, amp: 18 }
const REC = { at: 6.5, len: 1.5, caption: 'yep. *take three.*', sub: 'THE ONE WHERE VIRGO LAUGHED', top: 1640 }
const NOTIF = { at: 9.4, out: [11.6, 11.9], title: 'voice notes', body: 'Remy: your laugh made my *whole day*', glyph: '♐', time: 'now', y: 110 }
const CLAPS = [[1.5, 15], [3.8, 16], [4.2, 17], [4.6, 18]]
const SHAKES = CLAPS.slice(1).map(([a]) => ({ at: a, len: 0.25, amp: 10 }))
const T = { list: 5.3, pick: 5.8, send: 6.2, typing: [8.4, 9.4], reply: 9.4, last: 10.2 }
const BUB = [
  { t0: 1.1, t1: 2.45, who: 'brain', x: 390, y: 1195, tail: -130, text: "too many *'um's.* again." },
  { t0: 2.6, t1: 3.7, who: 'heart', x: 690, y: 1195, tail: 130, text: 'JUST SAY *HI.*', size: 56, shake: 3 },
  { t0: 10.2, t1: 99, who: 'brain', x: 430, y: 1200, tail: -170, text: 'The messy take was the *good* one.', size: 46, maxW: 560 },
]
const MSGS = [{ at: -4, side: 'L', text: 'how did the presentation go?' }, { at: T.send, side: 'R', text: '▶︎  voice note · 0:06', status: 'Delivered', until: T.reply }, { at: T.send, side: 'R', text: '▶︎  voice note · 0:06', status: 'Played', from: T.reply }, { at: T.reply, side: 'L', text: 'your laugh made my whole day' }]

function recorder(x, t, Rw) {
  x.fillStyle = '#120c26'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  const take = step(t, CLAPS, 14)
  // clapper board
  let snap = 0; for (const [a] of CLAPS) { const d = t - a; if (d >= -0.15 && d < 0.1) snap = Math.max(snap, d < 0 ? 1 + d / 0.15 : 1 - d / 0.1) }
  x.save(); x.translate(Rw.x + 170, Rw.y + 130)
  R(x, INK, -120, -36, 240, 130); R(x, '#26203f', -112, -28, 224, 114)
  x.save(); x.translate(-120, -36); x.rotate(-0.5 * snap); R(x, INK, 0, -34, 240, 36); for (let i = 0; i < 6; i++) R(x, i % 2 ? '#fff' : '#26203f', 6 + i * 38, -28, 34, 24); x.restore()
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('TAKE', 0, 20); x.font = `700 48px ${MONO}`; x.fillStyle = '#ffd23a'; x.fillText(String(take), 0, 72)
  x.restore()
  // waveform
  const amp = t < 0.9 ? 1 : 0.5
  for (let i = 0; i < 34; i++) {
    const h = 20 + 140 * Math.abs(Math.sin(t * 7 + i * 0.7) * Math.sin(i * 0.37 + t * 2)) * amp
    R(x, i % 6 === 2 && t < 1 ? '#ff3b5c' : '#9fe6b0', Rw.x + 300 + i * 18, Rw.y + 330 - h / 2, 10, h)
  }
  if (t < 1) { x.fillStyle = '#ff3b5c'; x.font = `800 28px ${INTER}`; x.textAlign = 'left'; x.fillText('"um"', Rw.x + 360, Rw.y + 450); x.fillText('"um"', Rw.x + 600, Rw.y + 210) }
  if (Math.floor(t * 1.6) % 2 === 0) { x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(Rw.x + Rw.w - 140, Rw.y + 60, 12, 0, 7); x.fill() }
  x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText('REC 0:0' + Math.floor((t * 2) % 7), Rw.x + Rw.w - 120, Rw.y + 68)
  // the takes list
  const lk = ease.outCubic(prog(t, T.list, T.list + 0.3))
  if (lk > 0) {
    const lx = Rw.x + Rw.w - 420 * lk
    R(x, INK, lx - 6, Rw.y, 426, Rw.h); R(x, '#231a48', lx, Rw.y, 420, Rw.h)
    const rows = ['take 18 · 0:41', 'take 17 · 0:39', 'take 16 · 0:44', '…', 'take 4 · 0:12', 'take 3 · 0:06 (laughs)']
    const sc = ease.inOutCubic(prog(t, T.list + 0.2, T.pick)) * 0
    rows.forEach((r, i) => {
      const y = Rw.y + 60 + i * 82 - sc
      const hl = i === 5 && t > T.pick
      if (hl) { R(x, '#ffd23a', lx + 14, y - 34, 392, 66) }
      x.fillStyle = hl ? INK : BONE; x.font = `${hl ? 800 : 600} 30px ${INTER}`; x.textAlign = 'left'; x.fillText(r, lx + 30, y + 10)
    })
  }
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'angry', mouth: 'scream', arms: [2.6, 2.6], look: [0, -1] }],
    [1.1, { mood: 'angry', mouth: 'open', arms: [0.4, 2.0], look: [1, 0] }],
    [2.6, { mood: 'shut', mouth: 'flat', arms: [0.4, 2.0] }],
    [3.8, { mood: 'angry', mouth: 'scream', arms: [0.4, 2.0], look: [0, -1] }],
    [T.list, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [1, -1] }],
    [8.0, { mood: 'wide', mouth: 'scream', arms: [2.9, 2.9], look: [0, -1] }],
    [8.6, { mood: 'sad', mouth: 'wobble', arms: [0.3, 0.3], sweat: 1 }],
    [T.reply, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], sweat: 0, look: [0.5, -1] }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.3, 0.3], look: [1, 0] }],
  ])
  const bx = key(t, [[0, 470], [0.6, 470], [1.0, 250, ease.outCubic]]), by = key(t, [[0, 1280], [0.6, 1280], [1.0, 1440, ease.inQuad]])
  return { ...P, x: bx, y: by, hops: [1.1, 3.8, 4.2, 4.6, 8.0, T.last], prop: t < T.last ? clipboard('r') : null }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'shut', mouth: 'flat', arms: [0.4, -2.8], look: [-1, 0] }],
    [2.6, { mood: 'angry', mouth: 'scream', arms: [2.6, 2.6], look: [-1, -1] }],
    [3.8, { mood: 'shut', mouth: 'frown', arms: [0.4, -2.8] }],
    [T.list - 0.3, { mood: 'sly', mouth: 'grin', arms: [0.5, 2.7], look: [0, -1] }],
    [T.send - 0.4, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9] }],
    [T.send + 0.4, { mood: 'love', mouth: 'grin', arms: [0.6, 0.6] }],
    [T.reply, { mood: 'love', mouth: 'grin', arms: [2.8, 2.8] }],
    [T.last, { mood: 'happy', mouth: 'smile', arms: [0.5, 2.3], look: [-1, 0] }],
  ])
  const hx = key(t, [[T.send - 0.5, 830], [T.send - 0.1, 620, ease.inCubic], [T.send + 0.5, 620], [T.send + 0.9, 830]])
  const hy = key(t, [[T.send - 0.5, 1440], [T.send - 0.3, 1300, ease.outQuad], [T.send, 1380, ease.inQuad], [T.send + 0.5, 1380], [T.send + 0.9, 1440]])
  return { ...P, x: hx, y: hy, rot: t > T.send - 0.4 && t < T.send + 0.4 ? -0.5 : 0, hops: [2.6, 3.0, T.list, T.reply, T.reply + 0.4] }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.send + 0.1],
  view: (x, t, Rw) => (t < T.send + 0.1 ? recorder(x, t, Rw) : drawChat(x, t, Rw, { title: 'Remy', sub: t > T.typing[0] && t < T.reply ? 'typing…' : 'online', msgs: MSGS, typing: T.typing, avatar: '#f0603a' })),
  desk: t => ({ button: { label: 'SEND', press: [T.send], glow: t < T.send + 0.3 ? 0.7 : 0.2, col: '#5fd38a' }, score: { b: [[0, 0]], h: [[0, 0], [T.reply + 0.3, 1]] }, cam: { tears: [[0, 1], [T.send, 2], [T.reply, 3]], mood: [[0, 'wide'], [T.reply, 'happy']], look: [0, -1], hops: [T.reply, T.reply + 0.4] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 3.8 && t < 5.0 ? 0.4 : 0),
  front: (x, t) => { sparkles(x, t, 540, 1380, T.send + 0.02, 12, 160, 1, [GOLD, BONE, '#5fd38a']); sparkles(x, t, 830, 1250, T.reply + 0.1, 12, 170, 2, ['#ff3b5c', BONE, GOLD]) },
  bubbles: BUB,
})

export const SCENES = [frozen(build, [REC]), whipZoom(WHIP), screenShake(SHAKE), ...SHAKES.map(screenShake), slamTitle(HOOK), recordScratch(REC), notification(NOTIF)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...CLAPS.flatMap(([a]) => [['tick', a, 0.1], ['tom', a, 140, { gain: 0.16, decay: 0.12 }]]),
  ['whoosh', T.list, 0.3, 0.04], ['pop', T.pick, 1318.51, 0.04, 0.3],
  ['boom', T.send, 0.22], ['tom', T.send, 82, { gain: 0.28, decay: 0.3 }], ['pop', T.send + 0.05, 1046.5, 0.05, 0], ['glitter', T.send, T.send + 0.3],
  ...recordScratchCues(REC),
  ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02],
  ...notificationCues(NOTIF), ['glitter', T.reply + 0.1, T.reply + 0.6],
  ...bubbleCues(BUB), ['bell', T.last + 0.05, 1046.5, 0.03, 1.4, 0],
]
