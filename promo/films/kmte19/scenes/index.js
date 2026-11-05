// kmte19: MIRROR TALK No. 19 (long), 'The night before the "what are we" talk.' (75 s vertical, star_advice post,
// synthwave · Bm). Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Chapter stickers (hookkit).
//   0.00   frame 0: Gemini mid-whip-zoom onto a draft that says "we need to talk", the phone shaking. Hook "Tomorrow I ask: |
//          *what are we?*"  2.7 the promise: "Wait for the line that *fixes* it."
//   5.0    1 · THE SITUATIONSHIP  three months flash by (movie nights · their cousin's party · met the dog · the 3 a.m. call) ·
//          "three months. we've met each other's *dogs*." · "but we never said what this *is*." · "and you want to *know*."
//   18.0   2 · THE DRAFTS  TOO INTENSE "we need to talk." ✗ · TOO CASUAL "lol what are we haha jk" ✗ · A SLIDESHOW
//          "US: A PROPOSAL (1/14)" ✗ · "why is this so *hard*?" · "because you *care* how it lands."
//   32.0   3 · THE FEAR  "what if they want something *different*?" · glitch · "then you'll *know*. knowing is kinder than
//          *guessing*." · PISCES: "three months of guessing!!"
//   46.0   4 · THE LISTEN  "you're asking, not *demanding*." · "then you *listen*. all the way to the end." · listening… 100 % ·
//          "even if it's not what I *hoped*?" · "*especially* then. you'll still be okay."
//   60.0   5 · THE LINE  "say it *plain*." · typed: "I like you and I want to know where we are." · Gemini reads it out ·
//          PISCES sobs: '"I like you"!!' · "perfect. now *sleep*."
//   73.2   last line "Say it plain. | *Hear* it kind."  Hard cut at 75.
import { makeMirror, drawPhone, drawPhoto, bubble, hearts, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, RED, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const CH = [5.0, 18.0, 32.0, 46.0, 60.0]
const T = {
  promise: 2.7,
  mem: [5.5, 6.6, 7.7, 8.8], s1: 10.4, s2: 13.0, m1: 15.4,
  drafts: [18.6, 21.6, 24.6], s3: 27.6, m2: 29.8,
  s4: 32.4, glitch: 34.6, m3: 36.2, s5: 40.0, p1: 42.2,
  m4: 46.4, m5: 48.8, bar: 51.2, s6: 54.2, m6: 56.6,
  m7: 60.4, typing: [61.8, 64.4], s7: 65.2, p2: 68.0, m8: 69.6, dim: [70.0, 72.6], last: 73.2,
}
const MEM = [['movie nights', '#7fd0ff'], ['their cousin’s party', '#ffe27a'], ['met the dog', '#9fe6b0'], ['the 3 a.m. call', '#ff8fb1']]
const DRAFT = [
  { tag: 'TOO INTENSE', text: 'we need to talk.', col: '#e8344e' },
  { tag: 'TOO CASUAL', text: 'lol what are we haha jk', col: '#ffe27a' },
  { tag: 'A SLIDESHOW', text: 'US: A PROPOSAL (1/14)', col: '#c9a6ff' },
]
const LINE = 'I like you and I want to know where we are.'

function draftCard(x, t, i) {
  const d = DRAFT[i], t0 = T.drafts[i]
  const k = easeOutBack(prog(t, t0, t0 + 0.35), 1.6) * outK(t, [t0 + 2.6, t0 + 2.9]) * (i === 2 ? 1 : 1)
  if (k <= 0.01) return
  x.save(); x.translate(560, 760); x.rotate(i % 2 ? 0.04 : -0.04); x.scale(k, k)
  if (i === 2) {
    // a slideshow title slide
    box(x, -220, -150, 440, 280, '#fff4dc', { b: 6 }); R(x, d.col, -220, -150, 440, 40)
    x.font = `800 36px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('US:', 0, -50); x.fillText('A PROPOSAL', 0, 0)
    x.font = `700 22px ${MONO}`; x.fillStyle = '#6a5a8a'; x.fillText('slide 1 of 14', 0, 70)
  } else {
    box(x, -220, -110, 440, 220, '#1c1530', { b: 6 })
    R(x, '#4f8dff', -180, -30, 360, 84)
    x.font = `800 34px ${INTER}`; x.fillStyle = '#fff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(d.text, 0, 12, 340)
  }
  x.font = `700 24px ${MONO}`; x.fillStyle = d.col; x.textAlign = 'center'; x.fillText(d.tag, 0, i === 2 ? -180 : -80)
  if (t > t0 + 1.2) { const sk = pop01(t, t0 + 1.2, 0.2, 2.6); x.save(); x.translate(170, -90); x.rotate(-0.3); x.scale(sk, sk); R(x, RED, -55, -11, 110, 22); x.rotate(1.57); R(x, RED, -55, -11, 110, 22); x.restore() }
  x.restore()
}

const F = makeMirror({
  id: 'kmte19', sign: 'gemini', dur: 75,
  hook: { text: 'Tomorrow I ask: | *what are we?*', accentColor: '#c9a6ff', out: [2.45, 2.65] },
  chapters: [
    { at: CH[0], text: 'THE SITUATIONSHIP' }, { at: CH[1], text: 'THE DRAFTS' }, { at: CH[2], text: 'THE FEAR' }, { at: CH[3], text: 'THE LISTEN' }, { at: CH[4], text: 'THE LINE', out: [72.9, 73.15] },
  ],
  bulbs: t => lerp(1, 0.3, ease.inOutCubic(prog(t, ...T.dim))),
  fx: [
    { k: 'screenShake', at: 0.15, amp: 16, len: 0.6 },
    { k: 'whipZoom', at: CH[0] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m1 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[1] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.drafts[2] + 1.2, amp: 10, len: 0.3 }, { k: 'whipZoom', at: T.m2 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[2] - 0.06, from: 1.3 }, { k: 'glitch', at: T.glitch, len: 1.1, text: 'GEMINI.EXE: two answers at once', buttons: ['ASK', 'ASK'] }, { k: 'screenShake', at: T.p1, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: CH[3] - 0.06, from: 1.3 }, { k: 'loadingBar', at: T.bar, len: 2.6, label: 'listening…', stallAt: 100, error: null, y: 880 }, { k: 'whipZoom', at: T.m6 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[4] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.s7 - 0.06, from: 1.2 }, { k: 'screenShake', at: T.p2, amp: 10, len: 0.35 },
  ],
  caps: [
    { at: T.promise, out: [4.7, 4.95], text: 'Wait for the line | that *fixes* it.', accent: '#ffd36b' },
    { at: CH[0] + 0.3, out: [17.7, 17.95], text: 'Months of *“hanging out.”*', accent: '#c9a6ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[1] + 0.3, out: [31.7, 31.95], text: 'Draft. Delete. *Repeat.*', accent: '#ff8fa0', top: 240, size: 76, accentSize: 100 },
    { at: CH[2] + 0.3, out: [45.7, 45.95], text: 'Knowing beats *guessing.*', accent: '#7fd0ff', top: 240, size: 76, accentSize: 100 },
    { at: CH[3] + 0.3, out: [59.7, 59.95], text: 'Ask. Then *listen.*', accent: '#7dffb0', top: 240, size: 76, accentSize: 100 },
    { at: CH[4] + 0.3, out: [72.9, 73.15], text: 'Say it *plain.*', accent: '#ffd36b', top: 240, size: 76, accentSize: 100 },
    { at: T.last, out: [99, 100], text: 'Say it plain. | *Hear* it kind.', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "three months. we've met each other's *dogs*." },
    { t: T.s2, who: 'S', text: 'but we never said what this *is*.' },
    { t: T.m1, who: 'M', text: "and you want to *know*. that's fair." },
    { t: T.s3, who: 'S', text: 'why is this so *hard*?' },
    { t: T.m2, who: 'M', text: 'because you *care* how it lands.' },
    { t: T.s4, who: 'S', text: 'what if they want something *different*?' },
    { t: T.m3, who: 'M', text: "then you'll know. knowing is kinder than *guessing*." },
    { t: T.s5, who: 'S', text: '…guessing *is* exhausting.' },
    { t: T.p1, who: 'P', text: 'three months of *guessing*!!' },
    { t: T.m4, who: 'M', text: "you're asking, not *demanding*." },
    { t: T.m5, who: 'M', text: 'then you *listen*. all the way to the end.' },
    { t: T.s6, who: 'S', text: "even if it's not what I *hoped*?" },
    { t: T.m6, who: 'M', text: "*especially* then. you'll still be okay." },
    { t: T.m7, who: 'M', text: 'say it *plain*.' },
    { t: T.s7, who: 'S', text: 'I like you and I want to know where we *are*.' },
    { t: T.p2, who: 'P', text: '"I like *you*"!!' },
    { t: T.m8, who: 'M', text: 'perfect. now *sleep*.' },
  ],
  boxes: [[10.2, 17.7], [27.4, 31.7], [32.2, 45.7], [46.2, 50.8], [53.9, 59.7], [60.2, 61.7], [65.0, 72.8]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.6)); return { zoom: 1 + 0.2 * w, dx: -40 * w, dy: 90 * w, rot: 0.03 * w } },
  pose(t) {
    const p = { mood: 'wide', look: [1, -0.4], blink: t < 1 ? false : undefined }
    if (t > CH[0]) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0.4, 0.4] }
    if (t > T.m1) { p.mood = 'happy'; p.look = undefined }
    if (t > CH[1]) { p.mood = 'squint'; p.look = [1, -0.6] }
    if (t > T.drafts[2] + 1.2) { p.mood = 'wide'; p.look = [1, -0.6] }
    if (t > T.m2) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.s4) { p.mood = 'wide'; p.look = [1, -0.4] }
    if (t > T.m3) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.s5) { p.mood = 'sleepy'; p.look = undefined }
    if (t > T.p1) { p.mood = 'happy' }
    if (t > T.m4) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > T.s6) { p.mood = 'wide'; p.look = [1, -0.6] }
    if (t > T.m6) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.typing[0]) { p.mood = 'neutral'; p.look = [1, 0.4] }
    if (t > T.s7) { p.mood = 'heart'; p.look = undefined }
    if (t > T.m8 + 1.2) p.mood = 'sleepy'
    return p
  },
  signHops: [T.s7, T.s7 + 0.8],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t < 1) p.mood = 'wide'
    if (t > T.m1) p.mood = 'happy'
    if (t > CH[1] && t < T.s3) { p.x = 780; p.y = 1040; p.s = 170 }
    if (t > T.m3) p.mood = 'sparkle'
    if (t > T.m4) p.mood = 'happy'
    if (t > T.typing[0] && t < T.last) { p.x = 450; p.y = 1000; p.s = 180 }
    if (t > T.p2) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.p1 - 0.3 && t < CH[3]) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.p2 - 0.3) { p.tears = 3; p.mood = 'happy' }
    if (t > T.m8 + 1.2) p.mood = 'sleepy'
    return p
  },
  pisHops: [T.p1, T.p1 + 0.4, T.p2, T.p2 + 0.4],
  tissuePulls: [T.p1, T.p1 + 0.4, T.p2, T.p2 + 0.3, T.p2 + 0.6],
  glass(x, t) {
    MEM.forEach(([c, col], i) => {
      const t0 = T.mem[i], k = easeOutBack(prog(t, t0, t0 + 0.35), 1.6) * outK(t, [CH[1] - 0.4, CH[1]])
      if (k <= 0.01) return
      const pos = [[390, 640, -0.08], [620, 640, 0.07], [420, 860, 0.04], [650, 880, -0.05]][i]
      drawPhoto(x, { cx: pos[0], cy: pos[1], w: 190, rot: pos[2], k, a: '#ffe27a', b: col, capt: c, heart: i === 3 })
    })
    for (let i = 0; i < 3; i++) draftCard(x, t, i)
  },
  front(x, t) {
    // frame 0: the phone with "we need to talk", shaking, mid-zoom
    if (t < CH[0]) {
      const o = ease.inCubic(prog(t, CH[0] - 0.4, CH[0]))
      drawPhone(x, t, { cx: 660 + Math.sin(t * 40) * (t < 1 ? 8 : 2), top: 560 + o * 1500, w: 440, h: 560, title: 'drafts', size: 34, rot: -0.05, msgs: [{ at: -1, side: 'R', text: 'we need to talk.' }] })
    }
    // the line, typed
    if (t > T.typing[0] - 0.5 && t < T.last + 0.3) {
      const inn = easeOutBack(prog(t, T.typing[0] - 0.5, T.typing[0] - 0.15), 1.4), go = ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3))
      const top = 520 + (1 - inn) * 1500 + go * 1500
      drawPhone(x, t, { cx: 700, top, w: 440, h: 560, title: 'notes: tomorrow', size: 32, rot: 0.03, msgs: t > T.typing[1] ? [{ at: T.typing[1], side: 'R', text: LINE, col: '#7a3ec8' }] : [] })
      if (t < T.typing[1]) {
        const n = Math.ceil(LINE.length * prog(t, ...T.typing))
        x.save(); x.translate(700, top + 280); x.rotate(0.03)
        R(x, '#2a2147', -190, 150, 380, 100); x.font = `700 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'; x.textBaseline = 'top'
        const s = LINE.slice(0, n) + (Math.floor(t * 4) % 2 ? '|' : ''), ws = s.split(' '); let line = '', y = 160
        for (const w of ws) { const tt = line ? line + ' ' + w : w; if (x.measureText(tt).width > 350) { x.fillText(line, -175, y); y += 32; line = w } else line = tt }
        x.fillText(line, -175, y); x.restore()
      }
    }
    hearts(x, t, T.s7 + 0.4, 300, 1060, { n: 7, cell: 7, spread: 170 })
    hearts(x, t, T.p2, 800, 1080, { n: 6, cell: 6, spread: 140 })
    sparkles(x, t, 700, 900, T.typing[1], 12, 220, 2)
  },
  cues: [
    ['whoosh', 0.0, 0.45, 0.05], ['boom', 0.12, 0.14], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(0.1 + i * 0.12), 0.03]),
    ...T.mem.map((m, i) => ['pop', m, [739.99, 880, 987.77, 1174.66][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ...T.drafts.flatMap(d => [['whoosh', d, 0.35, 0.035], ['pop', r3(d + 1.2), 293.66, 0.05, 0.2]]),
    ['pop', T.s5, 587.33, 0.035, 0],
    ...Array.from({ length: 20 }, (_, i) => ['tick', r3(T.typing[0] + i * 0.13), 0.015]),
    ['pop', T.typing[1], 1174.66, 0.045, 0.2], ['glitter', T.typing[1], T.typing[1] + 0.5],
    ['pop', T.p2, 1479.98, 0.045, 0.4], ['glitter', T.p2, T.p2 + 0.6],
    ['bell', T.last + 0.5, 1479.98, 0.03, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
