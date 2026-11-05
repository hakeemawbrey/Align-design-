// kmte18: MIRROR TALK No. 18 (long), "The night before telling my best friend." (80 s vertical, star_advice post,
// dreamy · F). Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Chapter stickers (hookkit).
//   0.00   frame 0: Aquarius mid-scream into a pillow, feathers flying, the phone lit: BESTIE. Hook "Telling my best friend |
//          I *like* them."  2.7 the promise: "Stay for *the plan.*"
//   5.0    1 · THE SCREAM  "*MMMPH.*" · "want to try that without the *pillow*?" · "I like my best friend. like, *like* like." ·
//          PISCES: "I KNEW it" · "that's a big, *brave* feeling."
//   17.0   2 · THE RISK    the friendship in photos (first day · road trip · your bday · 3 a.m. fries · matching sweaters) ·
//          "what if I *ruin* all of this?" · "it's scary because it *matters*." · PISCES: "the fries one…"
//   32.0   3 · THE SCRIPT  the speech ("Dearest companion, upon careful analysis…") · crossed out: "too many big *words*." ·
//          "say it like you'd say it at 3 a.m. over *fries*." · "I like you. more than friends." · "that's *everything*."
//   48.0   4 · BOTH WAYS   IF YES (hearts) / IF NO (still friends, still fries) · "if they say *no*: you're still friends,
//          if you're both *kind*." · "then it's weird for a bit. you'll *talk*." · PISCES: "either way you were *brave*"
//   63.0   5 · THE PLAN    1. fries · 2. one honest sentence · 3. listen · the text: "fries tomorrow? I have something to
//          tell you" → "always. now I'm curious!!" · "okay. *brave* now."
//   77.8   last line "Brave now. | *Smooth* later."  Hard cut at 80.
import { makeMirror, drawPhoto, drawNote, drawPhone, hearts, sparkles, confetti, drawBits, HEART, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, box, INK, BONE, GOLD, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const CH = [5.0, 17.0, 32.0, 48.0, 63.0]
const T = {
  promise: 2.7, pillowOff: 6.4,
  s1: 5.3, m1: 6.6, s2: 9.2, shake: 11.4, p1: 11.8, m2: 14.0,
  photos: [17.4, 18.7, 20.0, 21.3, 22.6], s3: 24.4, m3: 27.0, p2: 29.6,
  sp: [32.6, 33.6, 34.6], s4: 35.8, strikes: [38.0, 38.4, 38.8], m4: 37.8, m5: 40.4, nl: 43.4, s5: 45.2, m6: 46.6,
  yes: 48.6, m7: 48.4, no: 51.6, m8: 51.4, s6: 55.4, m9: 57.8, p3: 60.4,
  m10: 63.4, s7: 65.0, plan: [66.2, 67.0, 67.8], phoneIn: 68.8, sent: 69.8, typing: [70.4, 71.4], reply: 71.6, s8: 73.4, hug: 75.2, last: 77.8,
}
const PH = [['first day', '#7fd0ff'], ['road trip', '#ffe27a'], ['your bday', '#ff8fb1'], ['3 a.m. fries', '#ffb36b'], ['matching sweaters', '#9fe6b0']]
const FRIES = ['R.Y.Y.R', 'RYYYYYR', 'RRRRRRR', 'RRRRRRR', '.RRRRR.']

function pillow(x, cx, cy, rot, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  R(x, INK, -130, -80, 260, 160); R(x, '#e9e4ff', -122, -72, 244, 144); R(x, '#cfc6f0', -122, 40, 244, 32)
  for (const [px, py] of [[-122, -72], [106, -72], [-122, 56], [106, 56]]) R(x, '#b9aee6', px, py, 16, 16)
  x.restore()
}
function feathers(x, t, t0, cx, cy, n = 14) {
  for (let i = 0; i < n; i++) {
    const p = ((t - t0) * 0.35 + i / n) % 1
    if (t < t0) continue
    const fx = cx + Math.sin(i * 2.7) * 260 * p + Math.sin(t * 2 + i) * 30, fy = cy - 200 * p + 320 * p * p
    x.save(); x.globalAlpha = 1 - p; x.translate(fx, fy); x.rotate(Math.sin(t * 3 + i)); R(x, INK, -14, -5, 28, 10); R(x, '#ffffff', -12, -3, 24, 6); x.restore()
  }
}

const F = makeMirror({
  id: 'kmte18', sign: 'aquarius', dur: 80,
  hook: { text: 'Telling my best friend | I *like* them.', accentColor: '#ff8fb1', size: 92, out: [2.45, 2.65] },
  chapters: [
    { at: CH[0], text: 'THE SCREAM' }, { at: CH[1], text: 'THE RISK' }, { at: CH[2], text: 'THE SCRIPT' }, { at: CH[3], text: 'BOTH WAYS' }, { at: CH[4], text: 'THE PLAN', out: [77.5, 77.75] },
  ],
  glassTint: ['#1d3a5c', '#2a1a4c'],
  fx: [
    { k: 'screenShake', at: 0.12, amp: 18, len: 0.8 },
    { k: 'whipZoom', at: CH[0] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.pillowOff, from: 1.2 }, { k: 'screenShake', at: T.shake, amp: 16, len: 0.45 }, { k: 'whipZoom', at: T.m2 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[1] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.m3 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[2] - 0.06, from: 1.3 }, { k: 'screenShake', at: T.strikes[0], amp: 8, len: 0.3 }, { k: 'whipZoom', at: T.m6 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: CH[3] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.no - 0.08, from: 1.2 }, { k: 'screenShake', at: T.p3, amp: 8, len: 0.3 },
    { k: 'whipZoom', at: CH[4] - 0.06, from: 1.3 }, { k: 'whipZoom', at: T.reply - 0.06, from: 1.2 },
  ],
  caps: [
    { at: T.promise, out: [4.7, 4.95], text: 'Stay for | *the plan.*', accent: '#ffd36b' },
    { at: CH[0] + 0.3, out: [16.7, 16.95], text: 'A big, *brave* feeling.', accent: '#ff8fb1', top: 240, size: 76, accentSize: 100 },
    { at: CH[1] + 0.3, out: [31.7, 31.95], text: 'Scary because it *matters.*', accent: '#7fd0ff', top: 240, size: 68, accentSize: 90 },
    { at: CH[2] + 0.3, out: [47.7, 47.95], text: 'Say it like *you.*', accent: '#ffb36b', top: 240, size: 76, accentSize: 100 },
    { at: CH[3] + 0.3, out: [62.7, 62.95], text: 'Yes or no: stay *kind.*', accent: '#7dffb0', top: 240, size: 76, accentSize: 100 },
    { at: CH[4] + 0.3, out: [77.5, 77.75], text: 'One *honest* sentence.', accent: '#c9a6ff', top: 240, size: 76, accentSize: 100 },
    { at: T.last, out: [99, 100], text: 'Brave now. | *Smooth* later.', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: '*MMMPH.*' },
    { t: T.m1, who: 'M', text: 'want to try that without the *pillow*?' },
    { t: T.s2, who: 'S', text: 'I like my best friend. like, *like* like.' },
    { t: T.p1, who: 'P', text: 'I *KNEW* it' },
    { t: T.m2, who: 'M', text: "okay. that's a big, *brave* feeling." },
    { t: T.s3, who: 'S', text: 'what if I *ruin* all of this?' },
    { t: T.m3, who: 'M', text: "it's scary because it *matters*." },
    { t: T.p2, who: 'P', text: 'the *fries* one…' },
    { t: T.s4, who: 'S', text: 'I wrote a *speech*.' },
    { t: T.m4, who: 'M', text: 'too many big *words*.' },
    { t: T.m5, who: 'M', text: "say it like you'd say it at 3 a.m. over *fries*." },
    { t: T.s5, who: 'S', text: "…that's *it*?" },
    { t: T.m6, who: 'M', text: "that's *everything*." },
    { t: T.m7, who: 'M', text: 'if they say *yes*: wonderful.' },
    { t: T.m8, who: 'M', text: "if *no*: still friends, if you're both *kind*." },
    { t: T.s6, who: 'S', text: "and if it's *weird* for a bit?" },
    { t: T.m9, who: 'M', text: "then it's weird for a bit. you'll *talk*." },
    { t: T.p3, who: 'P', text: 'either way you were *brave*' },
    { t: T.m10, who: 'M', text: 'so. the *plan*?' },
    { t: T.s7, who: 'S', text: 'tomorrow. fries. one honest *sentence*.' },
    { t: T.s8, who: 'S', text: 'okay. *brave* now.' },
  ],
  boxes: [[5.1, 16.7], [24.2, 31.7], [35.6, 47.7], [48.2, 62.7], [63.2, 67.0], [73.2, 77.4]],
  pose(t) {
    const b = ease.outCubic(prog(t, T.pillowOff, T.pillowOff + 0.5))
    const p = { x: lerp(400, 300, b), y: lerp(1120, 1225, b), s: lerp(310, 280, b), mood: 'squint', look: [0, 0], blink: t < T.pillowOff ? 1 : undefined, squash: t < T.pillowOff ? 0.06 * Math.sin(t * 28) : 0 }
    if (t > T.pillowOff) { p.mood = 'wide'; p.look = [1, -0.6] }
    if (t > T.s2) { p.mood = 'heart'; p.look = undefined }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > CH[1]) { p.mood = 'happy'; p.look = undefined }
    if (t > T.s3) { p.mood = 'wide'; p.look = [1, -0.4] }
    if (t > T.m3) { p.mood = 'neutral'; p.look = [1, -0.8] }
    if (t > CH[2]) { p.mood = 'squint'; p.look = [1, -0.4] }
    if (t > T.m4) { p.mood = 'wide'; p.look = [1, -0.8] }
    if (t > T.nl) { p.mood = 'neutral'; p.look = [1, -0.5] }
    if (t > T.m6) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.s6) { p.mood = 'neutral'; p.look = [1, -0.6] }
    if (t > T.m9 + 1) { p.mood = 'happy'; p.look = undefined }
    if (t > T.phoneIn) { p.mood = 'neutral'; p.look = [1, -0.2] }
    if (t > T.reply) { p.mood = 'heart'; p.look = undefined }
    return p
  },
  signHops: [T.shake, T.m6 + 0.6, T.reply + 0.1, T.hug],
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6] }
    if (t < T.pillowOff) { p.mood = 'squint'; p.blink = 1 }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.photos[0] && t < T.s3) { p.x = 740; p.y = 1040; p.s = 180; p.mood = 'sparkle' }
    if (t > T.m3) p.mood = 'happy'
    if (t > T.yes - 0.2 && t < T.s6) { p.x = 540; p.y = 1060; p.s = 170 }
    if (t > T.reply) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.p1 - 0.3 && t < CH[1]) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.photos[2]) { p.tears = 3; p.mood = 'sparkle' }
    if (t > CH[2]) { p.tears = 2; p.mood = 'wide' }
    if (t > T.p3 - 0.3) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  pisHops: [T.p1, T.p1 + 0.4, T.p3, T.reply],
  tissuePulls: [T.p1, T.p2, T.p2 + 0.4, T.p3, T.reply + 0.4],
  glass(x, t) {
    // the friendship, in photos
    PH.forEach(([c, col], i) => {
      const t0 = T.photos[i], k = easeOutBack(prog(t, t0, t0 + 0.35), 1.6) * outK(t, [CH[2] - 0.4, CH[2]])
      if (k <= 0.01) return
      const pos = [[380, 640, -0.08], [580, 620, 0.06], [470, 800, -0.03], [680, 820, 0.08], [400, 980, 0.04]][i]
      drawPhoto(x, { cx: pos[0], cy: pos[1], w: 190, rot: pos[2], k, a: '#7fd0ff', b: col, capt: c, heart: i === 3 })
    })
    // both ways
    const yk = easeOutBack(prog(t, T.yes, T.yes + 0.35), 1.6) * outK(t, [CH[4] - 0.4, CH[4]])
    const nk = easeOutBack(prog(t, T.no, T.no + 0.35), 1.6) * outK(t, [CH[4] - 0.4, CH[4]])
    for (const [k, cx, title, col] of [[yk, 405, 'IF YES', '#ff8fb1'], [nk, 675, 'IF NO', '#7fd0ff']]) {
      if (k <= 0.01) continue
      x.save(); x.translate(cx, 760); x.scale(k, k)
      box(x, -120, -170, 240, 340, '#1c1530', { b: 6 }); R(x, col, -120, -170, 240, 50)
      x.font = `800 30px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(title, 0, -144)
      if (title === 'IF YES') { drawBits(x, HEART, { H: '#ff4f86' }, 0, 10, 16 * (1 + 0.06 * Math.sin(t * 7))); x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.fillText('wonderful.', 0, 120) }
      else { drawBits(x, FRIES, { R: '#e8344e', Y: GOLD }, 0, 10, 14); x.font = `700 22px ${MONO}`; x.fillStyle = BONE; x.fillText('still friends.', 0, 108); x.fillText('still fries.', 0, 136) }
      x.restore()
    }
  },
  front(x, t, K) {
    // frame 0: the pillow scream + feathers + the phone lit BESTIE
    if (t < T.pillowOff + 0.5) {
      const off = ease.inCubic(prog(t, T.pillowOff, T.pillowOff + 0.5))
      pillow(x, lerp(400, 160, off), lerp(1080, 1500, off), lerp(-0.1, -0.8, off), 1)
      feathers(x, t, -2, 420, 1000)
      const pk = 1 - ease.inCubic(prog(t, CH[0] - 0.3, CH[0]))
      if (pk > 0.01) {
        x.save(); x.translate(760, 1080); x.rotate(0.1); x.scale(pk, pk)
        R(x, INK, -90, -150, 180, 300); R(x, '#2a2147', -84, -144, 168, 288); R(x, '#120d26', -76, -120, 152, 240)
        const glow = 0.6 + 0.4 * Math.sin(t * 8)
        x.fillStyle = `rgba(255,143,177,${glow})`; x.beginPath(); x.arc(0, -40, 40, 0, 7); x.fill()
        x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BESTIE', 0, 40)
        x.font = `700 18px ${MONO}`; x.fillStyle = '#cfc6e6'; x.fillText('online', 0, 76)
        x.restore()
      }
    }
    // the speech, crossed out, then the one honest line
    const nk = easeOutBack(prog(t, T.sp[0] - 0.35, T.sp[0]), 1.6) * outK(t, [CH[3] - 0.4, CH[3]])
    drawNote(x, t, { cx: 640, cy: 780, w: 470, h: 440, rot: 0.03, k: nk, size: 26, lineGap: 56, title: 'the speech', lines: [
      { text: 'Dearest companion,', at: T.sp[0], strike: T.strikes[0] }, { text: 'upon careful analysis of us,', at: T.sp[1], strike: T.strikes[1] },
      { text: 'I propose a paradigm shift.', at: T.sp[2], strike: T.strikes[2] }, { text: 'I like you. more than friends.', at: T.nl, col: '#7a3ec8', bold: true },
    ] })
    // the plan
    const pk2 = easeOutBack(prog(t, T.plan[0] - 0.35, T.plan[0]), 1.6) * outK(t, [T.phoneIn - 0.3, T.phoneIn])
    drawNote(x, t, { cx: 640, cy: 780, w: 440, h: 330, rot: -0.03, k: pk2, size: 32, lineGap: 60, title: 'THE PLAN', lines: [
      { text: '1. fries', at: T.plan[0], check: T.plan[0] + 0.4 }, { text: '2. one honest sentence', at: T.plan[1], check: T.plan[1] + 0.4 }, { text: '3. listen', at: T.plan[2], check: T.plan[2] + 0.4 },
    ] })
    if (t > T.phoneIn && t < T.last + 0.3) {
      const inn = easeOutBack(prog(t, T.phoneIn, T.phoneIn + 0.35), 1.4), go = ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3))
      drawPhone(x, t, { cx: 680, top: 520 + (1 - inn) * 1500 + go * 1500, w: 480, h: 620, title: 'BESTIE', size: 30, rot: -0.03, typing: T.typing, msgs: [
        { at: T.sent, side: 'R', text: 'fries tomorrow? I have something to tell you' }, { at: T.reply, side: 'L', text: "always. now I'm curious!!" },
      ] })
    }
    if (t > T.hug && t < T.last) pillow(x, 310, 1240, 0.05, pop01(t, T.hug, 0.3, 2) * 0.55)
    hearts(x, t, T.s2 + 0.3, 300, 1060, { n: 7, cell: 7, spread: 160 })
    hearts(x, t, T.hug + 0.1, 300, 1060, { n: 7, cell: 7, spread: 180 })
    confetti(x, t, T.reply, 680, 900)
    sparkles(x, t, 640, 900, T.nl + 0.5, 12, 220, 2)
    void K
  },
  cues: [
    ['boom', 0.0, 0.14], ...Array.from({ length: 6 }, (_, i) => ['whoosh', r3(0.05 + i * 0.5), 0.3, 0.02]),
    ['whoosh', T.pillowOff, 0.5, 0.04], ['pop', T.shake, 1396.91, 0.05, 0], ['glitter', T.s2 + 0.3, T.s2 + 0.8],
    ...T.photos.map((p, i) => ['pop', p, [698.46, 783.99, 880, 1046.5, 1174.66][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ...T.sp.flatMap(s => Array.from({ length: 6 }, (_, i) => ['tick', r3(s + i * 0.08), 0.015])), ...T.strikes.map(s => ['whoosh', s, 0.15, 0.03]),
    ['pop', T.nl, 1046.5, 0.045, 0.2], ['bell', T.m6 + 0.6, 1396.91, 0.03, 1.0, 0],
    ['pop', T.yes, 1174.66, 0.05, -0.3], ['pop', T.no, 880, 0.05, 0.3],
    ...T.plan.map((p, i) => ['pop', r3(p + 0.4), [1046.5, 1174.66, 1396.91][i], 0.045, 0.2]),
    ['whoosh', T.phoneIn, 0.4, 0.035], ['pop', T.sent, 1174.66, 0.045, 0.2], ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02],
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.reply + 0.08, 1760, 0.035, -0.2], ['glitter', T.reply, T.reply + 0.6],
    ['whoosh', T.hug, 0.4, 0.03], ['bell', T.last + 0.5, 1396.91, 0.03, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
