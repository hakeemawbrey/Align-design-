// kbhe17: BRAIN VS HEART, Ep 17 "Left on Read: The Whole Evening" (80.4 s vertical, LONG, star_talk post, music: synthwave · Cm).
// One evening inside ♍ Virgo's head after a "Seen 7:02 PM", in five rounds refereed by THE STARS. Hard cut.
//   0.00   frame 0: mid whip zoom; a giant SEEN 7:02 stamp slamming onto the chat, Brain mid-scream, ref mid-whistle.
//          Title "Virgo was left on read. | *7:02 p.m.*"   3.4 promise: "Stay for the twist | at *9:41.*"
//   7.0    R1 7:05 CHECK AGAIN: 14 refreshes → phone face down. (Brain)
//  21.0    R2 7:30 THE THEORIES: Brain's evidence board (busy? asleep? a portal?) vs "they're probably busy". (Heart)
//  35.0    R3 8:10 THE DOUBLE TEXT: Heart's paragraph → "not tonight", deleted. (Brain)
//  49.0    R4 8:45 DO SOMETHING ELSE: a walk, a call with Pisces (sobbing "you're amazing"), a face mask. (both)
//  63.0    R5 9:41 THE TWIST: "sorry!! I was at my grandma's birthday, phone in my coat. how was your day??" (Heart)
//  77.0    3–3. Brain throws the evidence board away: "They were at a birthday. We were at a *crime scene.*"
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, notification, notificationCues } from '../../hookkit.js'
import { drawChat, key, clamp, lerp, prog, ease, pop01, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar, bubble, sparkles } from '../../kbhe01/bhkit.js'
import { makeLong } from '../../kbhe16/longkit.js'

export const DURATION = 80.4
const SIGN = 'virgo', PIS = signStar('pisces'), VIR = signStar('virgo')
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: 'Virgo was left on read. | *7:02 p.m.*', top: 168, size: 92, out: [3.1, 3.35] }
const PROMISE = { at: 3.4, text: 'Stay for the twist | at *9:41.*', top: 180, size: 96, out: [6.6, 6.9] }
const SHAKE = { at: 0.05, len: 0.5, amp: 26 }
const R1 = 7, R2 = 21, R3 = 35, R4 = 49, R5 = 63, OUT = 77
const SHAKES = [{ at: R5 + 1.2, len: 0.5, amp: 24 }]
const NOTIF = { at: R5 + 1.2, out: [R5 + 4.6, R5 + 4.9], title: 'texts', body: 'Theo: sorry!! I was at my *grandma’s birthday*', glyph: '♉', time: '9:41', y: 110 }
const BASE = [{ at: -5, side: 'R', text: 'had the best time today, thank you!', status: 'Seen 7:02 PM' }]
const TWIST = { at: R5 + 1.2, side: 'L', text: "sorry!! I was at my grandma's birthday, phone in my coat. how was your day??" }

function stamp(x, t, Rw, t0) {
  const k = clamp(1 - Math.pow(1 - prog(t, t0 - 0.25, t0), 2))
  const s = lerp(3, 1, k)
  x.save(); x.translate(560, Rw.y + 300); x.rotate(-0.12); x.scale(s, s); x.globalAlpha = clamp(k * 1.5)
  x.strokeStyle = '#ff3b5c'; x.lineWidth = 12; x.strokeRect(-250, -70, 500, 140)
  x.fillStyle = '#ff3b5c'; x.font = `800 84px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SEEN 7:02', 0, 6)
  x.restore()
}
function seenView(x, t, Rw) { drawChat(x, t, Rw, { title: 'Theo', sub: 'last seen 7:02 PM', msgs: BASE, avatar: '#e9b24a' }); stamp(x, t, Rw, 0.05) }
function refreshView(x, t, Rw, u) {
  drawChat(x, t, Rw, { title: 'Theo', sub: 'last seen 7:02 PM', msgs: BASE, avatar: '#e9b24a', dim: u > 9 ? 0.75 : 0 })
  const n = Math.min(14, Math.floor(Math.max(0, u - 3.2) * 4))
  if (n > 0 && u < 9) { R(x, INK, Rw.x + Rw.w - 300, Rw.y + 130, 270, 64); x.fillStyle = '#ffd23a'; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.fillText(`refreshed: ${n}`, Rw.x + Rw.w - 165, Rw.y + 164) }
  if (u > 3.2 && u < 6.7) { x.save(); x.translate(540, Rw.y + 150); x.rotate(t * 14); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 30, 0, 4.5); x.stroke(); x.restore() }
  if (u > 9) { x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.fillText('phone: face down.', 540, Rw.y + 300) }
  clock(x, Rw, '7:05 PM')
}
function clock(x, Rw, s) { R(x, INK, Rw.x + Rw.w - 254, Rw.y + 22, 230, 60); x.fillStyle = '#ffd23a'; x.font = `700 36px ${MONO}`; x.textAlign = 'left'; x.fillText(s, Rw.x + Rw.w - 236, Rw.y + 66) }
const NOTES = [[230, 140, 'they hate me?'], [520, 120, 'asleep?'], [800, 150, 'phone fell in soup?'], [330, 360, 'busy?'], [720, 380, 'a PORTAL?']]
function board(x, t, Rw, u) {
  x.fillStyle = '#7a5a3a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  for (let i = 0; i < 40; i++) R(x, '#6a4a2a', Rw.x + (i * 97) % Rw.w, Rw.y + (i * 53) % Rw.h, 6, 6)
  const shown = NOTES.filter((n, i) => u > 1.0 + i * 0.9)
  x.strokeStyle = '#ff3b5c'; x.lineWidth = 4; x.beginPath()
  shown.forEach(([a, b], i) => { if (i) x.lineTo(Rw.x + a, Rw.y + b); else x.moveTo(Rw.x + a, Rw.y + b) }); x.stroke()
  shown.forEach(([a, b, s], i) => {
    const k = pop01(u, 1.0 + i * 0.9, 0.3, 2.4)
    x.save(); x.translate(Rw.x + a, Rw.y + b); x.scale(k, k); x.rotate((i % 2 ? 1 : -1) * 0.06)
    x.font = `800 28px ${INTER}`; const w = x.measureText(s).width + 40
    R(x, INK, -w / 2 - 4, -38, w + 8, 76); R(x, i === 3 ? '#9fe6b0' : '#fff1a8', -w / 2, -34, w, 68); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
    R(x, '#ff3b5c', -6, -44, 12, 12); x.restore()
  })
  if (u > 9.5) { const k = pop01(u, 9.5, 0.3, 2.4); x.save(); x.translate(Rw.x + 330, Rw.y + 360); x.scale(k, k); x.strokeStyle = '#2a8a4a'; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 0, 110, 56, 0, 0, 7); x.stroke(); x.restore() }
  clock(x, Rw, '7:30 PM')
}
const PARA = 'hey!! just checking you got my text, totally fine if not, I just wanted to say I had fun and also I was thinking'
function doubleText(x, t, Rw, u) {
  drawChat(x, t, Rw, { title: 'Theo', sub: 'last seen 7:02 PM', msgs: BASE, avatar: '#e9b24a', draft: [{ t: R3 + 1.0, type: 'type', text: PARA, cps: 18 }, { t: R3 + 7.4, type: 'del', cps: 60 }] })
  if (u > 9.2) { const k = pop01(u, 9.2, 0.3, 2.4); x.save(); x.translate(540, Rw.y + 260); x.scale(k, k); R(x, INK, -260, -50, 520, 100); R(x, '#9fe6b0', -254, -44, 508, 88); x.fillStyle = INK; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('one text is enough.', 0, 2); x.restore() }
  clock(x, Rw, '8:10 PM')
}
function elseView(x, t, Rw, u) {
  const part = u < 4.4 ? 0 : u < 8.8 ? 1 : 2
  if (part === 0) { // a walk
    const g = x.createLinearGradient(0, Rw.y, 0, Rw.y + Rw.h); g.addColorStop(0, '#1a2a5a'); g.addColorStop(1, '#3a3a6a'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    for (let i = 0; i < 6; i++) { const lx = Rw.x + ((i * 220 - u * 160) % 1320 + 1320) % 1320 - 120; R(x, INK, lx, Rw.y + 120, 12, 360); R(x, '#ffd98a', lx - 14, Rw.y + 110, 40, 22) }
    R(x, '#4a4a6a', Rw.x, Rw.y + 460, Rw.w, 100)
    drawStarChar(x, 540, Rw.y + 400, 180, t, { color: VIR.color, glyph: VIR.glyph, mood: 'happy', seed: 4, hops: [R4 + 0.5, R4 + 1.1, R4 + 1.7, R4 + 2.3, R4 + 2.9, R4 + 3.5] })
    x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText('a walk around the block', 540, Rw.y + 70)
  } else if (part === 1) { // a call with Pisces
    x.fillStyle = '#14102a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText('video call · Pisces', 540, Rw.y + 60)
    drawStarChar(x, 540, Rw.y + 320, 300, t, { color: PIS.color, glyph: PIS.glyph, mood: 'sparkle', seed: 6 })
    // Pisces sobbing on the call
    for (const d of [-1, 1]) for (let q = 0; q < 6; q++) { const ph = (t * 1.6 + q / 6) % 1; R(x, '#8fe3ff', 540 + d * (40 + 140 * ph), Rw.y + 300 + 260 * ph * ph - 60 * ph, 12, 18) }
    bubble(x, u, { t0: 5.0, t1: 8.6, who: { bg: '#e0ecff', fg: INK, acc: '#3f7cf0', tag: '♓︎ PISCES' }, x: 540, y: Rw.y + 150, tail: 0, text: "you're *AMAZING* and they're lucky", size: 34, maxW: 600 })
  } else { // face mask
    x.fillStyle = '#2a3a3a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    drawStarChar(x, 540, Rw.y + 330, 300, t, { color: '#9fe6b0', mood: 'sleepy', seed: 4, zzz: false })
    for (const dx of [-60, 60]) { x.fillStyle = '#7fd08a'; x.beginPath(); x.arc(540 + dx, Rw.y + 300, 30, 0, 7); x.fill() }
    x.fillStyle = BONE; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.fillText('cucumber slices. self care.', 540, Rw.y + 70)
  }
  clock(x, Rw, '8:45 PM')
}
function twistView(x, t, Rw, u) {
  drawChat(x, t, Rw, { title: 'Theo', sub: 'online', msgs: [...BASE, TWIST], avatar: '#e9b24a', font: 34 })
  clock(x, Rw, '9:41 PM')
}

const L = makeLong({
  sign: SIGN, duration: DURATION, buttonLabel: 'DOUBLE TEXT', buttonCol: '#ff3b5c',
  cam: { tears: [[0, 2], [R4 + 4.4, 3], [R5 + 1.2, 3]], mood: [[0, 'wide'], [R4 + 4.4, 'sparkle'], [R5 + 1.2, 'happy']], look: [0, -1], hops: [R5 + 1.3, R5 + 1.7] },
  intro: {
    at: 0, len: 7, view: seenView,
    lines: [{ dt: 1.3, who: 'brain', text: '*SEEN.* and no reply.', size: 50, t1: 3.3 }, { dt: 4.3, who: 'heart', text: "it's fine. it's *totally* fine.", size: 44, t1: 6.8 }],
    brain: [[0, { mood: 'wide', mouth: 'scream', arms: [2.7, 2.7], look: [1, -1] }], [1.3, { mood: 'wide', mouth: 'open', arms: [2.4, 2.4] }], [4.3, { mood: 'sad', mouth: 'wobble', arms: [0.4, 0.4], sweat: 1 }]],
    heart: [[0, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], look: [-0.5, -1] }], [4.3, { mood: 'sad', mouth: 'smile', arms: [0.4, 0.4], sweat: 1 }]],
  },
  rounds: [
    { at: R1, len: 14, n: 1, title: '7:05 · CHECK AGAIN', view: refreshView, point: 'brain', call: 'ROUND 1: *BRAIN.*',
      lines: [{ dt: 1.0, who: 'heart', text: "maybe it *didn't* send?" }, { dt: 3.2, who: 'brain', text: 'it says *Seen.* capital S.' }, { dt: 6.8, who: 'heart', text: '…fourteen *refreshes.*' }, { dt: 9.0, who: 'brain', text: 'phone goes *face down.*' }],
      heart: [[0, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [3.2, { mood: 'angry', mouth: 'flat', arms: [0.5, 2.6], fn: (t) => ({ arms: [0.5, 2.2 + 0.6 * Math.sin(t * 16)] }) }], [6.8, { mood: 'sad', mouth: 'wobble', arms: [0.4, 0.4] }]],
      brain: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [3.2, { mood: 'angry', mouth: 'open', arms: [0.4, 2.2] }], [9.0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.4] }]] },
    { at: R2, len: 14, n: 2, title: '7:30 · THE THEORIES', view: board, point: 'heart', call: 'ROUND 2: *HEART.* (no portals)',
      lines: [{ dt: 1.0, who: 'brain', text: 'I have *evidence.*', size: 50 }, { dt: 4.6, who: 'heart', text: "they're probably just *busy.*" }, { dt: 7.2, who: 'brain', text: '…or a *portal.*', size: 50 }, { dt: 9.4, who: 'heart', text: 'it\'s *busy.*', size: 52 }],
      brain: [[0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.8] }], [4.6, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [7.2, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6] }], [9.4, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [4.6, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.2] }], [7.2, { mood: 'shut', mouth: 'flat', arms: [0.4, -2.8] }], [9.4, { mood: 'happy', mouth: 'grin', arms: [2.4, 2.4] }]] },
    { at: R3, len: 14, n: 3, title: '8:10 · THE DOUBLE TEXT', view: doubleText, point: 'brain', call: 'ROUND 3: *BRAIN.*',
      lines: [{ dt: 1.0, who: 'heart', text: 'just a *small* follow-up…', size: 46 }, { dt: 5.0, who: 'brain', text: "that's a *paragraph.*", size: 50 }, { dt: 7.4, who: 'brain', text: '*not tonight.*', size: 54 }],
      heart: [[0, { mood: 'love', mouth: 'grin', arms: [1.3, 1.3], fn: (t) => ({ x: 720 }) }], [5.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [7.4, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [9.2, { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4] }]],
      brain: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [5.0, { mood: 'angry', mouth: 'open', arms: [0.4, 2.6] }], [7.4, { mood: 'angry', mouth: 'flat', arms: [1.3, 1.3], fn: (t) => ({ x: 380 }) }], [9.2, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]] },
    { at: R4, len: 14, n: 4, title: '8:45 · DO SOMETHING ELSE', view: elseView, point: 'both', call: 'ROUND 4: *BOTH!*',
      lines: [{ dt: 1.0, who: 'brain', text: 'a *walk.* fresh air.' }, { dt: 4.6, who: 'heart', text: "let's call *Pisces.*" }, { dt: 9.0, who: 'both', text: 'and a *face mask.*', size: 50 }],
      brain: [[0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.2], fn: (t) => ({ walk: t * 3 }) }], [4.6, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }], [9.0, { mood: 'shut', mouth: 'smile', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4], fn: (t) => ({ walk: t * 3 }) }], [4.6, { mood: 'love', mouth: 'grin', arms: [2.6, 0.4] }], [9.0, { mood: 'shut', mouth: 'smile', arms: [0.4, 0.4] }]] },
    { at: R5, len: 14, n: 5, title: '9:41 · THE TWIST', view: twistView, point: 'heart', call: 'ROUND 5: *HEART!*',
      lines: [{ dt: 5.0, who: 'brain', text: 'a *birthday.*', size: 54 }, { dt: 7.2, who: 'heart', text: 'they asked about our *DAY.*', size: 48 }],
      brain: [[0, { mood: 'shut', mouth: 'smile', arms: [0.4, 0.4] }], [1.2, { mood: 'wide', mouth: 'scream', arms: [2.9, 2.9], look: [0.5, -1] }], [5.0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [8.6, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]],
      heart: [[0, { mood: 'shut', mouth: 'smile', arms: [0.4, 0.4] }], [1.2, { mood: 'love', mouth: 'scream', arms: [2.9, 2.9], look: [-0.5, -1] }], [7.2, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6], tears: 2 }]] },
  ],
  outro: {
    at: OUT, len: DURATION - OUT, view: twistView,
    lines: [{ dt: 0.5, who: 'brain', text: 'They were at a birthday. We were at a *crime scene.*', size: 42, maxW: 600, t1: 99, x: 440, tail: -190 }],
    brain: [[0, { mood: 'happy', mouth: 'grin', arms: [0.4, 2.9] }]],
    heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.6, 0.4] }]],
    props: (x, t, u, B) => { // the evidence board flies away
      const p = prog(u, 0.2, 1.3); if (p >= 1 || !B) return
      x.save(); x.translate(B.hr.x + 300 * p, B.hr.y - 60 - 500 * p + 400 * p * p); x.rotate(p * 6)
      R(x, INK, -70, -50, 140, 100); R(x, '#7a5a3a', -64, -44, 128, 88); R(x, '#fff1a8', -50, -34, 40, 30); R(x, '#fff1a8', 10, -10, 40, 30)
      x.restore()
    },
  },
})

export const SCENES = [L.build, whipZoom(WHIP), screenShake(SHAKE), ...SHAKES.map(screenShake), slamTitle(HOOK), slamTitle(PROMISE), ...L.chapters, notification(NOTIF)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...SHAKES.flatMap(shakeCues), ...slamTitleCues(HOOK), ...slamTitleCues(PROMISE),
  ['boom', 0.06, 0.3], ['tom', 0.06, 70, { gain: 0.3, decay: 0.3 }],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(R1 + 3.2 + i * 0.25).toFixed(2), 0.035]),
  ...[0, 1, 2, 3, 4].map(i => ['pop', +(R2 + 1.0 + i * 0.9).toFixed(2), [1046.5, 1174.66, 1244.51, 1396.91, 1567.98][i], 0.04, 0]),
  ...Array.from({ length: 30 }, (_, i) => ['tick', +(R3 + 1.0 + i * 0.12).toFixed(2), 0.015]), ['whoosh', R3 + 7.4, 0.5, 0.04],
  ['tick', R4 + 4.4, 0.05], ['pop', R4 + 4.5, 1567.98, 0.04, 0], ['tick', R4 + 8.8, 0.05],
  ...notificationCues(NOTIF), ['glitter', R5 + 1.3, R5 + 1.9],
  ['whoosh', OUT + 0.2, 0.6, 0.05], ['bell', OUT + 0.55, 1046.5, 0.03, 1.6, 0],
  ...L.cues,
]
