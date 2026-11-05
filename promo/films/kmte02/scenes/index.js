// kmte02: MIRROR TALK No. 2, '"It's fine," said Taurus.' (18 s vertical, star_advice post, lofi · F). Loops.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Taurus mid-yell "IT'S FINE!!" at the mirror, steam puffing, the phone in front: "can we rain-check
//          tonight?". Hook: "'It's fine,' said Taurus. | It *wasn't.*"
//   0.65   record scratch + freeze: "narrator: it was *not* fine."
//   2.3    Taurus deflates. "Plans cancelled. *Again.*"  TAURUS: "it's fine. totally fine. i'm *fine*."
//   5.9    REFLECTION: "you were looking *forward* to it."  TAURUS: "…yeah. I was." (Pisces wails)
//   10.4   REFLECTION: "then say *that*. kindly." → "'I'm bummed. let's pick a *new day*.'"  Taurus types it, sends.
//   15.2   reply: "yes!! saturday?"  last line "Fine is not a *feeling*."  17.55–18: eases back into frame 0 (loop).
import { makeMirror, drawPhone, bubble, hearts, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, BONE, r3 } from '../../kmte01/mirrorkit.js'

const T = { scratch: 0.65, deflate: 2.3, l1: 3.0, r1: 5.9, l2: 8.5, r2: 10.4, r3: 12.6, type: [13.0, 14.6], send: 14.75, reply: 15.35, last: 15.7 }
const NOTE = { at: -1, side: 'L', text: 'can we rain-check tonight?' }

// steam puffs (pixel clouds) rising from both sides of the head
function steam(x, t, cx, cy, k) {
  if (k <= 0.01) return
  const CL = ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.']
  for (let i = 0; i < 6; i++) {
    const side = i % 2 ? 1 : -1, ph = ((t * 1.4 + i * 0.37) % 1 + 1) % 1
    drawBits(x, CL, { W: '#f4f0ff' }, cx + side * (110 + 60 * ph), cy - 40 - 170 * ph, 9 * (0.6 + 0.6 * ph), { alpha: k * (1 - ph) })
  }
}

const F = makeMirror({
  id: 'kmte02', sign: 'taurus', dur: 18, loop: true,
  hook: { text: '“It’s fine,” said Taurus. | It *wasn’t.*', accentColor: '#9fe6b0', out: [2.55, 2.8] },
  fx: [
    { k: 'recordScratch', at: T.scratch, len: 1.45, caption: 'narrator: it was *not* fine.', top: 1500 },
    { k: 'screenShake', at: T.deflate, amp: 14, len: 0.4 },
    { k: 'whipZoom', at: T.r1 - 0.08, from: 1.3 },
    { k: 'screenShake', at: T.l2 + 0.9, amp: 10, len: 0.4 },
    { k: 'whipZoom', at: T.r2 - 0.08, from: 1.22 },
  ],
  caps: [
    { at: 2.85, out: [8.2, 8.4], text: 'Plans cancelled. | *Again.*', accent: '#9fe6b0' },
    { at: 8.45, out: [15.45, 15.65], text: 'Name the | *real* feeling.', accent: '#8fe9ff' },
    { at: T.last, out: [17.5, 17.95], text: 'Fine is not | a *feeling.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.l1, who: 'S', text: "it's fine. totally fine. i'm *fine*." },
    { t: T.r1, who: 'M', text: 'you were looking *forward* to it.' },
    { t: T.l2, who: 'S', text: '…yeah. I *was*.' },
    { t: T.r2, who: 'M', text: 'then say *that*. kindly.' },
    { t: T.r3, who: 'M', text: "\"I'm bummed. let's pick a *new day*.\"" },
  ],
  boxes: [[2.85, 15.3]],
  pose(t) {
    const d = ease.outCubic(prog(t, T.deflate, T.deflate + 0.55))
    const p = { x: lerp(430, 300, d), y: lerp(1090, 1225, d), s: lerp(350, 280, d), mood: 'wide', look: [0, -0.2], blink: false, squash: t < T.deflate ? -0.12 + 0.03 * Math.sin(t * 40) : 0.22 * (1 - d) * Math.cos(d * 7) + 0.06 * d }
    if (t > T.deflate) { p.mood = 'neutral'; p.look = [0.4, 1]; p.blink = undefined }
    if (t > T.l1 && t < T.r1) { p.mood = 'squint'; p.look = [1, -0.6] }
    if (t > T.r1) { p.mood = 'wide'; p.look = [1, -0.9] }
    if (t > T.l2) { p.mood = 'neutral'; p.look = [0, 1] }
    if (t > T.r2) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.type[0]) { p.mood = 'neutral'; p.look = [1, 0.8] }
    if (t > T.reply) { p.mood = 'heart'; p.look = undefined }
    p.draw = (x, tt, Fr) => steam(x, tt, Fr.ox, Fr.cy - Fr.S * 0.18, 1 - prog(tt, T.deflate - 0.2, T.deflate + 0.3))
    return p
  },
  refl(t) {
    if (t < T.deflate) return { x: 560, y: 900, s: 330, mood: 'wide', look: [-0.3, 0], squash: -0.1 }
    const b = ease.outCubic(prog(t, T.deflate, T.deflate + 0.6))
    const p = { x: lerp(560, 650, b), y: 905, s: lerp(330, 250, b), mood: 'neutral', look: [-1, 0.6] }
    if (t > T.r1) p.mood = 'happy'
    if (t > T.l2 + 0.6 && t < T.r2) p.mood = 'sparkle'
    if (t > T.reply) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 1, mood: 'wide' }
    if (t > T.deflate) p.tears = 2
    if (t > T.l2 + 0.5) { p.tears = 3; p.mood = 'wide' }
    if (t > T.reply) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  tissuePulls: [T.l2 + 0.7, T.l2 + 1.1, T.reply + 0.3],
  front(x, t, K) {
    // the yell (frame 0) and the phone in front of Taurus
    bubble(x, t, 470, 820, -1, T.deflate, "IT'S FINE!!", { size: 56, col: '#ff8f8f', tail: -0.6, rot: -0.04 })
    const out = t > T.deflate && t < T.l1 + 1 ? ease.inCubic(prog(t, T.deflate, T.deflate + 0.4)) : 0
    const back = ease.outCubic(prog(t, T.type[0] - 0.4, T.type[0]))
    const msgs = [NOTE, ...(t > T.send ? [{ at: T.send, side: 'R', text: "I'm bummed! let's pick a new day?" }] : []), { at: T.reply, side: 'L', text: 'yes!! saturday?' }]
    if (t < T.deflate + 0.4) drawPhone(x, t, { cx: 720, top: 980 + out * 700, w: 300, h: 420, title: 'them ♡', msgs, rot: 0.12, size: 24 })
    if (back > 0) {
      const typed = "I'm bummed! let's pick a new day?"
      drawPhone(x, t, { cx: 720, top: lerp(1700, 880, back), w: 380, h: 520, title: 'them ♡', msgs, rot: 0.06, size: 28, typing: t < T.send ? [T.type[0] - 1, T.send] : null })
      if (t < T.send) {
        const n = Math.ceil(typed.length * prog(t, ...T.type))
        x.save(); x.translate(720, lerp(1700, 880, back) + 260); x.rotate(0.06)
        R(x, '#2a2147', -170, 178, 340, 50); x.font = "700 20px Inter, Arial"; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'middle'
        x.fillText(typed.slice(0, n) + (Math.floor(t * 4) % 2 ? '|' : ''), -160, 203, 320); x.restore()
      }
    }
    hearts(x, t, T.reply + 0.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 700, 1200, T.send, 10, 160, 2)
    void K
  },
  cues: [
    ['boom', 0.0, 0.16], ['pop', 0.02, 220, 0.05, 0],
    ...Array.from({ length: 5 }, (_, i) => ['whoosh', r3(0.1 + i * 0.4), 0.25, 0.02]),
    ['whoosh', T.deflate, 0.5, 0.035], ['pluck', T.deflate + 0.05, 392, 0.04, 0.6, 0], ['pluck', T.deflate + 0.25, 349.23, 0.04, 0.8, 0],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.type[0] + i * 0.15), 0.02]),
    ['whoosh', T.send, 0.3, 0.04], ['pop', T.send + 0.02, 1174.66, 0.045, 0.2],
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.reply + 0.08, 1760, 0.035, -0.2], ['glitter', T.reply, T.reply + 0.4],
    ['bell', T.last + 0.4, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
