// kbhe18: BRAIN VS HEART, Ep 18 "The Ex Texted 'hey'" (75.6 s vertical, LONG, star_talk post, music: dreamy · F). Hard cut.
// Inside ♎ Libra's head the night the ex texts "hey", in five rounds refereed by THE STARS.
//   0.00   frame 0: mid whip zoom; a giant "hey" slams into the window, Heart mid-faint, Brain mid-catch.
//          Title "Libra's ex just | texted *'hey.'*"   3.4 promise: "Wait for | the *final reply.*"
//   7.0    R1 REPLY?: Heart types "heyyy omg hi!!"; Brain unplugs the keyboard. (Brain)
//  20.0    R2 THE MEMORY MONTAGE: Heart's good bits vs Brain's slideshow of why it ended. (Brain)
//  33.0    R3 CALL A FRIEND: Pisces on video, sobbing "you deserve *SO* much". (Heart)
//  46.0    R4 THE DRAFTS: too cold ✕ · too warm ✕ · just right ✓. (both)
//  59.0    R5 SEND: "hey. glad you're doing okay. I'm doing good too." Sent. Phone face down. (both)
//  72.0    High five. BRAIN + HEART: "Kind. Short. Done. We're *proud* of us."
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues } from '../../hookkit.js'
import { drawChat, key, clamp, lerp, prog, ease, pop01, R, rrect, INK, BONE, GOLD, INTER, MONO, drawStarChar, signStar, bubble, sparkles } from '../../kbhe01/bhkit.js'
import { makeLong } from '../../kbhe16/longkit.js'

export const DURATION = 75.6
const SIGN = 'libra', PIS = signStar('pisces')
const WHIP = { at: -0.24, len: 0.5, from: 2.4, cy: 1250 }
const HOOK = { at: -1, text: "Libra's ex just | texted *'hey.'*", top: 168, size: 100, out: [3.1, 3.35] }
const PROMISE = { at: 3.4, text: 'Wait for | the *final reply.*', top: 180, size: 104, out: [6.6, 6.9] }
const SHAKE = { at: 0.05, len: 0.5, amp: 26 }
const R1 = 7, R2 = 20, R3 = 33, R4 = 46, R5 = 59, OUT = 72
const SHAKES = [{ at: R1 + 5.6, len: 0.4, amp: 18 }]
const HEY = [{ at: -5, side: 'R', text: 'take care of yourself', status: 'March' }, { at: -0.4, side: 'L', text: 'hey' }]
const FINAL = "hey. glad you're doing okay. I'm doing good too."

function heyView(x, t, Rw, u) {
  drawChat(x, t, Rw, { title: 'Morgan', sub: 'online', msgs: HEY, avatar: '#ff8fa0', font: 40 })
  const k = clamp(1 - Math.pow(1 - prog(t, -0.25, 0.1), 2)), s = lerp(3.2, 1, k)
  if (u < 3) { x.save(); x.globalAlpha = clamp(k * 1.5) * (1 - prog(u, 2.4, 3)); x.translate(540, Rw.y + 260); x.scale(s, s); x.fillStyle = '#ff8fa0'; x.font = `800 150px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('hey', 0, 0); x.restore() }
}
function replyView(x, t, Rw, u) {
  const unplug = u > 5.6
  drawChat(x, t, Rw, { title: 'Morgan', sub: 'online', msgs: HEY, avatar: '#ff8fa0', draft: [{ t: R1 + 3.2, type: 'type', text: 'heyyy omg hi!! I was literally just', cps: 12 }, { t: R1 + 5.6, type: 'type', text: '', cps: 1 }], dim: unplug ? 0.5 : 0 })
  if (unplug) { const k = pop01(u, 5.7, 0.3, 2.4); x.save(); x.translate(540, Rw.y + 240); x.scale(k, k); R(x, INK, -280, -50, 560, 100); R(x, '#ffd23a', -274, -44, 548, 88); x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('KEYBOARD UNPLUGGED', 0, 2); x.restore() }
}
const GOOD = [['#ffd23a', 'the pancakes'], ['#7fd0ff', 'the beach'], ['#ff8fa0', 'the song in the car']]
const WHY = ['plans kept getting cancelled', 'I felt like the only one trying', 'we wanted different things']
function montage(x, t, Rw, u) {
  if (u < 4.2) {
    x.fillStyle = '#3a2a4a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(540, Rw.y + 280, 40, 540, Rw.y + 280, 500); g.addColorStop(0, 'rgba(255,200,150,0.3)'); g.addColorStop(1, 'rgba(255,200,150,0)'); x.fillStyle = g; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h); x.restore()
    GOOD.forEach(([c, s], i) => { const k = pop01(u, 0.6 + i * 0.6, 0.3, 2.2); x.save(); x.translate(260 + i * 280, Rw.y + 260); x.rotate((i - 1) * 0.1); x.scale(k, k); R(x, INK, -110, -130, 220, 250); R(x, '#fffbea', -104, -124, 208, 238); R(x, c, -90, -110, 180, 160); x.fillStyle = INK; x.font = `700 22px ${INTER}`; x.textAlign = 'center'; x.fillText(s, 0, 90); x.restore() })
    x.fillStyle = BONE; x.font = `italic 600 36px 'EB Garamond', serif`; x.textAlign = 'center'; x.fillText('the good bits', 540, Rw.y + 500)
  } else {
    x.fillStyle = '#10142a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
    x.fillStyle = GOLD; x.font = `800 36px ${INTER}`; x.textAlign = 'center'; x.fillText('WHY IT ENDED · a presentation', 540, Rw.y + 80)
    WHY.forEach((s, i) => { const k = pop01(u, 4.6 + i * 1.3, 0.3, 2.2); if (k <= 0.01) return; x.save(); x.translate(540, Rw.y + 190 + i * 110); x.scale(k, k); R(x, INK, -380, -42, 760, 84); R(x, '#231a48', -374, -36, 748, 72); x.fillStyle = BONE; x.font = `700 34px ${INTER}`; x.fillText(`${i + 1}. ${s}`, 0, 12); x.restore() })
  }
}
function pisCall(x, t, Rw, u) {
  x.fillStyle = '#14102a'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  x.fillStyle = BONE; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillText(u < 1.8 ? 'calling Pisces…' : 'video call · Pisces', 540, Rw.y + 60)
  if (u < 1.8) { for (let i = 0; i < 3; i++) { const p = ((u * 0.8 + i / 3) % 1); x.strokeStyle = `rgba(143,227,255,${1 - p})`; x.lineWidth = 6; x.beginPath(); x.arc(540, Rw.y + 300, 60 + p * 180, 0, 7); x.stroke() } return }
  drawStarChar(x, 540, Rw.y + 330, 300, t, { color: PIS.color, glyph: PIS.glyph, mood: u > 6 ? 'heart' : 'sparkle', seed: 6 })
  for (const d of [-1, 1]) for (let q = 0; q < 8; q++) { const ph = (t * 1.8 + q / 8) % 1; R(x, '#8fe3ff', 540 + d * (40 + 180 * ph), Rw.y + 300 + 280 * ph * ph - 80 * ph, 12, 18) }
  bubble(x, u, { t0: 2.6, t1: 12.6, who: { bg: '#e0ecff', fg: INK, acc: '#3f7cf0', tag: '♓︎ PISCES' }, x: 540, y: Rw.y + 160, tail: 0, text: 'you deserve *SO* much. so much!!', size: 36, maxW: 620 })
}
const DRAFTS = [['who is this?', 'TOO COLD', '#7fd0ff', '✕'], ['omg hiii I miss you so much!!', 'TOO WARM', '#ff8a5a', '✕'], [FINAL, 'JUST RIGHT', '#5fd38a', '✓']]
function drafts(x, t, Rw, u) {
  x.fillStyle = '#1a1438'; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h)
  DRAFTS.forEach(([s, tag, c, mk], i) => {
    const k = pop01(u, 0.8 + i * 2.6, 0.3, 2.2); if (k <= 0.01) return
    const y = Rw.y + 90 + i * 150
    x.save(); x.translate(540, y); x.scale(k, k)
    R(x, INK, -430, -56, 860, 112); R(x, '#2a2050', -424, -50, 848, 100)
    x.fillStyle = BONE; x.font = `600 28px ${INTER}`; x.textAlign = 'left'; x.fillText(s.length > 46 ? s.slice(0, 46) + '…' : s, -400, 10)
    if (u > 1.8 + i * 2.6) { R(x, c, 230, -38, 180, 76); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.fillText(`${mk} ${tag}`, 320, 10) }
    x.restore()
  })
}
function sendView(x, t, Rw, u) {
  const msgs = [...HEY, { at: R5 + 3.4, side: 'R', text: FINAL, status: 'Delivered' }]
  drawChat(x, t, Rw, { title: 'Morgan', sub: 'online', msgs, avatar: '#ff8fa0', draft: [{ t: R5 + 0.6, type: 'type', text: FINAL, cps: 22 }, { t: R5 + 3.4, type: 'clear' }], sendFlash: [R5 + 3.4], font: 34 })
  const fd = ease.inOutCubic(prog(u, 6.2, 6.8))
  if (fd > 0) { x.fillStyle = `rgba(5,3,12,${0.92 * fd})`; x.fillRect(Rw.x, Rw.y, Rw.w, Rw.h); x.globalAlpha = fd; x.fillStyle = '#9fe6b0'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillText('phone: face down. tea: on.', 540, Rw.y + Rw.h / 2); x.globalAlpha = 1 }
}

const L = makeLong({
  sign: SIGN, duration: DURATION, buttonLabel: 'REPLY', buttonCol: '#ff8fa0',
  cam: { tears: [[0, 2], [R3, 3]], mood: [[0, 'wide'], [R3, 'sparkle'], [R5 + 3.4, 'happy']], look: [0, -1], hops: [R5 + 3.5, R5 + 3.9, OUT + 0.4] },
  intro: {
    at: 0, len: 7, view: heyView,
    lines: [{ dt: 1.3, who: 'heart', text: "*HEY?* just 'hey'??", size: 52, t1: 3.3 }, { dt: 4.3, who: 'brain', text: 'deep breaths. *five rounds.*', size: 46, t1: 6.8 }],
    heart: [[0, { mood: 'dizzy', mouth: 'o', arms: [2.6, 2.6], fn: (t, u) => ({ rot: key(u, [[0, -1.1], [0.8, -1.1], [1.2, 0, ease.outBack]]), x: key(u, [[0, 640], [0.8, 640], [1.2, 830]]) }) }], [1.3, { mood: 'wide', mouth: 'scream', arms: [2.8, 2.8] }], [4.3, { mood: 'sad', mouth: 'wobble', arms: [0.4, 0.4], tears: 1 }]],
    brain: [[0, { mood: 'wide', mouth: 'scream', arms: [1.6, 1.6], look: [1, -0.5], fn: (t, u) => ({ x: key(u, [[0, 460], [0.8, 460], [1.2, 250]]) }) }], [1.3, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [4.3, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.2] }]],
  },
  rounds: [
    { at: R1, len: 13, n: 1, title: 'REPLY?', view: replyView, point: 'brain', call: 'ROUND 1: *BRAIN.*',
      lines: [{ dt: 1.0, who: 'heart', text: 'reply *right now.* be cute.', size: 46 }, { dt: 5.6, who: 'brain', text: '*nope.*', size: 60 }, { dt: 7.6, who: 'heart', text: '…*rude.*', size: 54 }],
      heart: [[0, { mood: 'love', mouth: 'grin', arms: [2.4, 2.4] }], [3.0, { mood: 'love', mouth: 'grin', arms: [1.3, 1.3], fn: (t) => ({ x: 720 }) }], [5.6, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6], fn: () => ({ x: 720 }) }], [7.6, { mood: 'angry', mouth: 'frown', arms: [0.4, 0.4] }]],
      brain: [[0, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [4.8, { mood: 'angry', mouth: 'grin', arms: [1.8, 1.8], fn: (t, u) => ({ x: key(u, [[4.8, 250], [5.4, 420], [7.0, 420], [7.5, 250]]) }) }], [7.6, { mood: 'sly', mouth: 'smile', arms: [0.4, 2.6] }]],
      props: (x, t, u) => { // the keyboard + its cable, yanked at 5.6
        R(x, INK, 300, 1448, 480, 70); R(x, '#4a4070', 306, 1454, 468, 58)
        for (let i = 0; i < 12; i++) for (let j = 0; j < 2; j++) R(x, (u > 3 && u < 5.6 && Math.floor(t * 12 + i * 3 + j) % 9 === 0) ? '#ffd23a' : '#c9c2dc', 314 + i * 38, 1460 + j * 26, 30, 20)
        const yank = prog(u, 5.6, 6.0)
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(780, 1480); x.bezierCurveTo(880, 1480 - 40 * yank, 900 - 200 * yank, 1360, 960 - 500 * yank, 1300 - 100 * yank); x.stroke()
        x.strokeStyle = '#c9c2dc'; x.lineWidth = 6; x.stroke()
      } },
    { at: R2, len: 13, n: 2, title: 'THE MEMORY MONTAGE', view: montage, point: 'brain', call: 'ROUND 2: *BRAIN.*',
      lines: [{ dt: 1.0, who: 'heart', text: 'remember the *pancakes?*' }, { dt: 4.4, who: 'brain', text: 'remember *why* it ended.' }, { dt: 9.0, who: 'heart', text: '…*oh.* right.', size: 52 }],
      heart: [[0, { mood: 'love', mouth: 'smile', arms: [0.4, 0.4], look: [-0.5, -1] }], [4.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [9.0, { mood: 'sad', mouth: 'frown', arms: [0.3, 0.3], tears: 1 }]],
      brain: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [4.4, { mood: 'neutral', mouth: 'smile', arms: [0.4, 2.6] }], [9.0, { mood: 'sad', mouth: 'smile', arms: [0.4, 0.4] }]] },
    { at: R3, len: 13, n: 3, title: 'CALL A FRIEND', view: pisCall, point: 'heart', call: 'ROUND 3: *HEART.*',
      lines: [{ dt: 0.8, who: 'heart', text: 'calling *Pisces.*', size: 50 }, { dt: 7.4, who: 'brain', text: "…they're *right,* you know.", size: 44 }],
      heart: [[0, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.6] }], [2.6, { mood: 'cry', mouth: 'smile', arms: [2.4, 2.4], tears: 2 }]],
      brain: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 0.4] }], [2.6, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [7.4, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.0], tears: 1 }]] },
    { at: R4, len: 13, n: 4, title: 'THE DRAFTS', view: drafts, point: 'both', call: 'ROUND 4: *BOTH!*',
      lines: [{ dt: 1.8, who: 'brain', text: 'too *cold.*', size: 52 }, { dt: 4.4, who: 'heart', text: 'too *warm.*', size: 52 }, { dt: 7.0, who: 'both', text: '*just right.*', size: 56 }],
      brain: [[0, { mood: 'neutral', mouth: 'flat', arms: [0.4, 2.2] }], [4.4, { mood: 'sly', mouth: 'smile', arms: [0.4, 0.4] }], [7.0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6] }]],
      heart: [[0, { mood: 'sad', mouth: 'frown', arms: [0.4, 0.4] }], [4.4, { mood: 'wide', mouth: 'o', arms: [0.4, 0.4] }], [7.0, { mood: 'happy', mouth: 'grin', arms: [2.6, 2.6] }]] },
    { at: R5, len: 13, n: 5, title: 'SEND', view: sendView, point: 'both', call: 'ROUND 5: *BOTH!*',
      lines: [{ dt: 1.0, who: 'heart', text: '*send* it.', size: 54 }, { dt: 4.2, who: 'brain', text: '…and phone *face down.*', size: 46 }],
      heart: [[0, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }], [3.0, { mood: 'angry', mouth: 'grin', arms: [2.9, 2.9], fn: (t, u) => ({ x: key(u, [[3.0, 830], [3.35, 620], [3.8, 620], [4.1, 830]]) }) }], [4.2, { mood: 'happy', mouth: 'smile', arms: [0.4, 0.4] }]],
      brain: [[0, { mood: 'neutral', mouth: 'smile', arms: [0.4, 0.4] }], [3.4, { mood: 'wide', mouth: 'o', arms: [2.6, 2.6] }], [4.2, { mood: 'happy', mouth: 'smile', arms: [0.4, 2.2] }]] },
  ],
  outro: {
    at: OUT, len: DURATION - OUT, view: (x, t, Rw) => sendView(x, t, Rw, 9),
    lines: [{ dt: 0.6, who: 'both', text: "Kind. Short. Done. We're *proud* of us.", size: 46, maxW: 620, t1: 99 }],
    brain: [[0, { mood: 'happy', mouth: 'grin', arms: [0.4, 2.9], fn: (t, u) => ({ x: key(u, [[0, 250], [0.4, 420, ease.outBack]]) }) }]],
    heart: [[0, { mood: 'happy', mouth: 'grin', arms: [2.9, 0.4], fn: (t, u) => ({ x: key(u, [[0, 830], [0.4, 660, ease.outBack]]) }) }]],
    props: (x, t, u) => sparkles(x, t, 540, 1150, OUT + 0.45, 14, 160, 3, [GOLD, BONE, '#ff8fa0']),
  },
})

export const SCENES = [L.build, whipZoom(WHIP), screenShake(SHAKE), ...SHAKES.map(screenShake), slamTitle(HOOK), slamTitle(PROMISE), ...L.chapters]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...SHAKES.flatMap(shakeCues), ...slamTitleCues(HOOK), ...slamTitleCues(PROMISE),
  ['pop', 0.05, 1396.91, 0.05, 0], ['boom', 0.06, 0.25],
  ...Array.from({ length: 16 }, (_, i) => ['tick', +(R1 + 3.2 + i * 0.12).toFixed(2), 0.02]), ['whoosh', R1 + 5.6, 0.4, 0.06], ['tick', R1 + 5.7, 0.09],
  ...[0, 1, 2].map(i => ['pop', +(R2 + 0.6 + i * 0.6).toFixed(2), 1046.5, 0.035, 0]), ...[0, 1, 2].map(i => ['tick', +(R2 + 4.6 + i * 1.3).toFixed(2), 0.06]),
  ...[0, 0.6, 1.2].map(d => ['pluck', +(R3 + 0.2 + d).toFixed(2), 1318.51, 0.03, 0.4, 0]), ['bell', R3 + 2.6, 1396.91, 0.03, 1.2, 0],
  ...[0, 1, 2].map(i => ['pop', +(R4 + 0.8 + i * 2.6).toFixed(2), 880, 0.04, 0]), ...[0, 1, 2].map(i => ['tick', +(R4 + 1.8 + i * 2.6).toFixed(2), 0.07]),
  ...Array.from({ length: 20 }, (_, i) => ['tick', +(R5 + 0.6 + i * 0.12).toFixed(2), 0.02]), ['boom', R5 + 3.4, 0.22], ['pop', R5 + 3.45, 1396.91, 0.05, 0], ['whoosh', R5 + 6.2, 0.5, 0.04],
  ['tom', OUT + 0.45, 120, { gain: 0.25, decay: 0.2 }], ['tick', OUT + 0.45, 0.1], ['glitter', OUT + 0.45, OUT + 1.0],
  ...L.cues,
]
