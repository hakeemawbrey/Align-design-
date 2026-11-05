// kbhe03: BRAIN VS HEART, Ep 3 "Three Chats Open" (12 s vertical, star_talk post, music: pop · A). Hard cut.
// Inside ♊ Gemini's head. The window is split three ways: the group chat, the best friend, the crush.
//   0.00   frame 0: mid whip zoom; Heart mid-juggle with three phones in the air, Brain mid-faint. Title "Gemini has |
//          *three* chats open." 0.3 shake. 1.0 all three panes ping.
//   1.30   HEART: "reply to ALL of them. *paragraphs.*"   2.90 BRAIN (back up, dizzy): "*one* at a time."
//   4.20   all three drafts type at once; loading bar "replying to everyone…" stalls at 99 % → "Error: one Gemini, three chats".
//   6.50   glitch + shake: the juggled phones go flying.  7.10 blink → only the crush's chat: "how was your day?"
//   7.50   both freeze. HEART: "…*oh.*"   8.50 BRAIN: "*that* one."   9.70 BOTH: "Okay. Just the *one* that matters."
// Pisces cam: sniffles at the chaos, then happy tears for the crush's message. Pure f(t).
import { whipZoom, whipZoomCues, slamTitle, slamTitleCues, screenShake, shakeCues, loadingBar, loadingBarCues, glitch, glitchCues } from '../../hookkit.js'
import { makeBuild, drawChat, bubbleCues, key, stepObj, clamp, lerp, prog, ease, pop01, sparkles, R, rrect, INK, BONE, GOLD, INTER } from '../../kbhe01/bhkit.js'

export const DURATION = 12.2
const SIGN = 'gemini'
const WHIP = { at: -0.18, len: 0.5, from: 2.2, cy: 1250 }
const HOOK = { at: -1, text: 'Gemini has | *three* chats open.', top: 168, size: 100 }
const SHAKE = { at: 0.3, len: 0.4, amp: 20 }
const LOAD = { at: 4.2, len: 2.3, label: 'replying to everyone…', stallAt: 99, error: 'Error: one Gemini, three chats', y: 760 }
const GL = { at: 6.5, len: 0.6, dialog: false, amp: 1 }
const SHAKE2 = { at: 6.5, len: 0.5, amp: 30 }
const T = { ping: 1.0, type: 4.2, fly: 6.5, solo: 7.1, freeze: 7.5 }
const BUB = [
  { t0: 1.3, t1: 2.75, who: 'heart', x: 680, y: 1195, tail: 150, text: 'reply to ALL of them. *paragraphs.*', size: 44, maxW: 560 },
  { t0: 2.9, t1: 4.1, who: 'brain', x: 390, y: 1195, tail: -130, text: '*one* at a time.' },
  { t0: 7.6, t1: 8.4, who: 'heart', x: 700, y: 1195, tail: 130, text: '…*oh.*', size: 52 },
  { t0: 8.5, t1: 9.55, who: 'brain', x: 390, y: 1195, tail: -130, text: '*that* one.', size: 52 },
  { t0: 9.7, t1: 99, who: { bg: '#fff1c8', fg: INK, acc: '#d0306a', tag: 'BRAIN + HEART' }, x: 540, y: 1205, tail: 0, text: 'Okay. Just the *one* that matters.', size: 46, maxW: 620 },
]
const PANES = [
  { title: 'the group', av: '#9fe6b0', msgs: [{ at: -3, side: 'L', text: 'WHO ATE MY FRIES' }, { at: T.ping, side: 'L', text: 'gemini answer the poll' }], draft: 'ok so first of all the fries were' },
  { title: 'bestie', av: '#f3a24a', msgs: [{ at: -3, side: 'L', text: 'call me??' }, { at: T.ping + 0.15, side: 'L', text: 'URGENT (not urgent)' }], draft: 'omg tell me everything from the start' },
  { title: 'Sam', av: '#c9a6ff', msgs: [{ at: -3, side: 'R', text: 'that was fun today' }, { at: T.ping + 0.3, side: 'L', text: 'how was your day?' }], draft: 'well it started at 7am when my alarm' },
]

function threeView(x, t, Rw) {
  const w = (Rw.w - 24) / 3
  PANES.forEach((P, i) => {
    const r = { x: Rw.x + i * (w + 12), y: Rw.y, w, h: Rw.h }
    drawChat(x, t, r, { title: P.title, sub: '', msgs: P.msgs, avatar: P.av, font: 24, draft: [{ t: T.type + i * 0.1, type: 'type', text: P.draft, cps: 22 }] })
    // ping badge
    const k = pop01(t, T.ping + i * 0.15, 0.25, 2.6)
    if (k > 0.01) { x.save(); x.translate(r.x + w - 24, r.y + 22); x.scale(k * 0.8, k * 0.8); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 24, 0, 7); x.fill(); x.fillStyle = '#ff3b5c'; x.beginPath(); x.arc(0, 0, 19, 0, 7); x.fill(); x.fillStyle = '#fff'; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(2 + i), 0, 1); x.restore() }
  })
}
function soloView(x, t, Rw) {
  drawChat(x, t, Rw, { title: 'Sam', sub: 'online', msgs: PANES[2].msgs, avatar: '#c9a6ff', font: 46 })
  const k = pop01(t, T.freeze, 0.3, 2.4)
  if (k > 0.01) { x.save(); x.globalAlpha = 0.5 + 0.3 * Math.sin(t * 6); x.strokeStyle = GOLD; x.lineWidth = 8; rrect(x, Rw.x + 24, Rw.y + Rw.h - 136, 420, 92, 26); x.stroke(); x.restore() }
}

function phone(x, cx, cy, rot, col) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -34, -60, 68, 120); R(x, col, -28, -54, 56, 108); R(x, '#14102a', -22, -44, 44, 82)
  R(x, '#ff3b5c', 8, -40, 12, 12)
  x.restore()
}

function brainP(t) {
  const P = stepObj(t, [
    [0, { mood: 'dizzy', mouth: 'wobble', arms: [2.4, 0.4], look: [0, 0] }],
    [1.6, { mood: 'dizzy', mouth: 'wobble', arms: [0.6, 0.6] }],
    [2.9, { mood: 'angry', mouth: 'open', arms: [0.4, 2.3], look: [1, 0] }],
    [4.2, { mood: 'wide', mouth: 'scream', arms: [2.7, 2.7], look: [0, -1] }],
    [T.fly, { mood: 'dizzy', mouth: 'wobble', arms: [1.2, 1.2] }],
    [T.freeze, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], look: [0.5, -1] }],
    [8.5, { mood: 'happy', mouth: 'smile', arms: [0.3, 2.4], look: [1, 0] }],
    [9.7, { mood: 'happy', mouth: 'grin', arms: [0.5, 1.6], look: [1, 0] }],
  ])
  const rot = key(t, [[0, -1.0], [1.3, -1.0], [1.6, 0, ease.outBack]])
  const y = key(t, [[0, 1440], [1.3, 1440], [1.45, 1380, ease.outQuad], [1.6, 1440, ease.inQuad]])
  const xx = key(t, [[9.4, 250], [9.7, 380, ease.outBack]])
  return { ...P, rot, y, x: xx, hops: [2.9, 3.3, 8.5, 9.7, 10.1], tears: 0 }
}
function heartP(t) {
  const P = stepObj(t, [
    [0, { mood: 'love', mouth: 'grin', arms: [2.6, 2.6], look: [0, -1] }],
    [1.3, { mood: 'angry', mouth: 'scream', arms: [2.7, 2.4] }],
    [2.9, { mood: 'angry', mouth: 'grin', arms: [2.6, 2.6] }],
    [T.fly, { mood: 'dizzy', mouth: 'o', arms: [2.9, 2.9] }],
    [T.freeze, { mood: 'wide', mouth: 'o', arms: [0.3, 0.3], look: [-0.5, -1] }],
    [8.0, { mood: 'love', mouth: 'smile', arms: [0.5, 0.5] }],
    [9.7, { mood: 'love', mouth: 'grin', arms: [1.6, 0.5], look: [-1, 0] }],
  ])
  const xx = key(t, [[9.4, 830], [9.7, 700, ease.outBack]])
  const juggling = t < T.fly
  return { ...P, x: xx, y: 1440, hops: juggling ? [0, 0.45, 0.9, 1.35, 1.8, 2.25, 2.7, 3.15, 3.6, 4.05, 4.5, 4.95, 5.4, 5.85, 6.3] : [8.0, 9.7, 10.1], rot: 0.08 * Math.sin(t * 7) * (juggling ? 1 : 0) }
}

const build = makeBuild({
  sign: SIGN, blinks: [T.solo],
  view: (x, t, Rw) => (t < T.solo ? threeView(x, t, Rw) : soloView(x, t, Rw)),
  desk: t => ({ button: { label: 'REPLY', press: [], glow: 0.4, col: '#7fd0ff' }, score: { b: [[0, 0], [8.7, 1]], h: [[0, 0], [8.1, 1]] }, cam: { tears: [[0, 1], [T.freeze, 3]], mood: [[0, 'wide'], [T.freeze, 'happy']], look: [0, -1] } }),
  brain: brainP, heart: heartP,
  alarm: t => (t > 4.2 && t < 6.5 ? 0.45 : 0),
  front: (x, t, B, H) => {
    if (!H) return
    const cols = ['#9fe6b0', '#f3a24a', '#c9a6ff']
    for (let i = 0; i < 3; i++) {
      if (t < T.fly) {
        const a = t * 4.4 + i * 2.094, cx = H.cx + Math.cos(a) * 120, cy = H.top - 90 - Math.abs(Math.sin(a)) * 150
        phone(x, cx, cy, a * 0.6, cols[i])
      } else {
        const p = t - T.fly, dir = [-1, 0.2, 1][i]
        const cx = H.cx + dir * 900 * p, cy = H.top - 120 - 1300 * p + 1400 * p * p
        if (p < 1.4) phone(x, cx, cy, p * 14 * (i - 1 || 1), cols[i])
      }
    }
    sparkles(x, t, 540, 820, T.freeze, 12, 200, 2, [GOLD, BONE, '#c9a6ff'])
  },
  bubbles: BUB,
})

export const SCENES = [build, whipZoom(WHIP), screenShake(SHAKE), screenShake(SHAKE2), slamTitle(HOOK), loadingBar(LOAD), glitch(GL)]
export const CUES = [
  ...whipZoomCues(WHIP), ...shakeCues(SHAKE), ...slamTitleCues(HOOK),
  ...[0, 1, 2].flatMap(i => [['pop', +(T.ping + i * 0.15).toFixed(2), [1318.51, 1174.66, 1567.98][i], 0.05, (i - 1) * 0.4], ['pop', +(T.ping + i * 0.15 + 0.08).toFixed(2), 1760, 0.03, (i - 1) * 0.4]]),
  ...Array.from({ length: 13 }, (_, i) => ['whoosh', +(0.3 + i * 0.45).toFixed(2), 0.15, 0.012]),
  ...Array.from({ length: 20 }, (_, i) => ['tick', +(T.type + i * 0.09).toFixed(2), 0.018]),
  ...loadingBarCues(LOAD), ...glitchCues(GL), ...shakeCues(SHAKE2), ['whoosh', T.fly + 0.05, 0.5, 0.06],
  ['whoosh', T.solo - 0.05, 0.2, 0.03], ['bell', T.freeze, 1760, 0.035, 1.2, 0], ['glitter', T.freeze, T.freeze + 0.5],
  ...bubbleCues(BUB), ['pluck', 9.7, 880, 0.05, 0.6, 0], ['bell', 9.75, 1760, 0.03, 1.2, 0],
]
