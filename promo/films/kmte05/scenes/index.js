// kmte05: MIRROR TALK No. 5, "The friend who gives advice and never takes it." (22 s vertical, star_advice post,
// funk · Bb). Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Leo mid-speech under a spotlight, crown on, mic up; the group chat mid-explosion of hearts ("LEO
//          you're so wise"). Hook "Great at advice. | *Terrible* at taking it."
//   2.9    "Meanwhile, in Leo's *own* DMs…"  them: "sorry, gotta cancel again" → Leo sends "no worries at all!!"
//          LEO: "it's fine. I'm *chill*."
//   7.0    the reflection holds up Leo's own message, caught in red: "know your worth. say what you NEED."
//          REFLECTION: "remember what you told *them*?"  LEO: "…that was for *THEM*."  REFLECTION: "you count *too*."
//   13.8   Leo sends: "actually, it stings a little. can we lock in a day?" → "you're right. thursday, for real?"
//          PISCES: "it's *beautiful*" (sobbing).  20.3 last line "Prescribe it | to *yourself.*"  Hard cut at 22.
import { makeMirror, drawPhone, hearts, sparkles, spotlight, crownCells, inSprite, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, BONE, r3, INTER, MONO } from '../../kmte01/mirrorkit.js'

const T = { mic: 0.5, dm: 2.9, cancel: 3.3, nw: 4.3, s1: 5.2, shot: 6.9, m1: 7.2, s2: 9.7, m2: 11.6, send: 14.4, typing: [15.0, 15.9], reply: 16.0, p1: 17.0, last: 20.3 }
const CHAT = [
  { at: -1, side: 'R', text: 'know your worth. say what you NEED.', col: '#f39a3a' },
  { at: -1, side: 'L', text: 'LEO you are so wise' },
  { at: -1, side: 'L', text: 'framing this' },
  { at: 0.4, side: 'L', text: 'saving this forever' },
]
const DM = [
  { at: T.cancel, side: 'L', text: 'sorry, gotta cancel again' },
  { at: T.nw, side: 'R', text: 'no worries at all!!', col: '#f39a3a' },
  { at: T.send, side: 'R', text: 'actually, it stings a little. can we lock in a day?', col: '#f39a3a' },
  { at: T.reply, side: 'L', text: "you're right. thursday, for real?" },
]

function mic(x, cx, cy, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -12, 0, 24, 110); R(x, '#5a5470', -7, 4, 14, 102)
  R(x, INK, -30, -56, 60, 64); R(x, '#cfc6e6', -24, -50, 48, 52); R(x, '#8f86a8', -24, -30, 48, 6); R(x, '#8f86a8', -24, -16, 48, 6)
  x.restore()
}

const F = makeMirror({
  id: 'kmte05', sign: 'leo', dur: 22,
  hook: { text: 'Great at advice. | *Terrible* at taking it.', accentColor: '#f39a3a', out: [2.65, 2.9] },
  fx: [
    { k: 'whipZoom', at: T.dm - 0.06, from: 1.3 },
    { k: 'caught', at: T.shot + 0.5, x: 640, y: 770, r: 180, ry: 110, label: 'YOU!!', arrow: 'bl', rec: true, out: [11.3, 11.5] },
    { k: 'screenShake', at: T.s2 + 0.05, amp: 12, len: 0.4 },
    { k: 'whipZoom', at: T.m2 - 0.06, from: 1.25 },
    { k: 'whipZoom', at: T.reply - 0.06, from: 1.2 },
  ],
  caps: [
    { at: T.dm, out: [6.7, 6.9], text: 'Meanwhile, in | Leo’s *own* DMs…', accent: '#f39a3a', size: 86, accentSize: 112 },
    { at: 11.5, out: [19.9, 20.1], text: 'You count *too.*', accent: '#8fe9ff', size: 104, accentSize: 140 },
    { at: T.last, out: [99, 100], text: 'Prescribe it | to *yourself.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: "it's fine. I'm *chill*." },
    { t: T.m1, who: 'M', text: 'remember what you told *them*?' },
    { t: T.s2, who: 'S', text: '…that was for *THEM*.' },
    { t: T.m2, who: 'M', text: 'you count *too*.' },
    { t: T.p1, who: 'P', text: "it's *beautiful*" },
  ],
  boxes: [[5.0, 13.5], [16.8, 19.9]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.55)); return { zoom: 1 + 0.25 * w, dx: 30 * w, dy: 30 * w } },
  pose(t) {
    const b = ease.outCubic(prog(t, T.dm - 0.2, T.dm + 0.4))
    const p = { x: lerp(330, 300, b), y: lerp(1150, 1225, b), s: lerp(320, 280, b), mood: 'sparkle', look: [0, -0.3] }
    if (t > T.cancel) { p.mood = 'wide'; p.look = [1, -0.4] }
    if (t > T.nw - 0.3) { p.mood = 'squint'; p.look = [1, 0] }
    if (t > T.m1) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.s2) { p.mood = 'eyeroll'; p.look = undefined }
    if (t > T.s2 + 1.2) { p.mood = 'neutral'; p.look = [0, 1] }
    if (t > T.m2 + 0.4) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.reply) { p.mood = 'heart'; p.look = undefined }
    p.draw = (x, tt, Fr) => {
      inSprite(x, Fr, () => crownCells(x))
      const m = 1 - ease.inCubic(prog(tt, T.dm - 0.2, T.dm + 0.2))
      if (m > 0.01) mic(x, Fr.ox + Fr.S * 0.42, Fr.cy - Fr.S * 0.1 + (1 - m) * 200, 0.35)
    }
    return p
  },
  refl(t) {
    const p = { mood: 'happy', look: [-1, 0.6] }
    if (t < T.dm) { p.mood = 'sparkle'; p.look = [-0.5, 0] }
    if (t > T.shot && t < T.m2) { p.x = 470; p.y = 1000; p.s = 210; p.mood = 'neutral'; p.look = [-1, 0.6] }
    if (t > T.m2) p.mood = 'happy'
    if (t > T.reply) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'sparkle', look: [-1, -0.4] }
    if (t > T.dm) { p.mood = 'wide'; p.tears = 1 }
    if (t > T.m2) { p.tears = 2; p.mood = 'sparkle' }
    if (t > T.reply) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  tissuePulls: [T.m2 + 0.5, T.p1, T.p1 + 0.4],
  back(x, t) {
    const a = 1 - ease.inCubic(prog(t, T.dm - 0.3, T.dm + 0.2))
    spotlight(x, 330, 0, 330, 1340, 520, a)
  },
  glass(x, t) {
    // the reflection holds up Leo's own words (a screenshot)
    if (t > T.shot && t < T.m2 + 0.4) {
      const k = easeOutBack(prog(t, T.shot, T.shot + 0.35), 1.6) * outK(t, [T.m2, T.m2 + 0.4])
      x.save(); x.translate(700, 770); x.rotate(-0.04); x.scale(k, k)
      R(x, INK, -250, -120, 500, 240); R(x, '#1d1636', -242, -112, 484, 224)
      x.font = `700 22px ${MONO}`; x.fillStyle = '#cfc6e6'; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText('the group chat · 4 min ago', -222, -84)
      R(x, '#f39a3a', -222, -56, 444, 110)
      x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText('know your worth.', -200, -24); x.fillText('say what you NEED.', -200, 20)
      x.font = `700 22px ${MONO}`; x.fillStyle = '#f39a3a'; x.textAlign = 'right'; x.fillText('— you', 222, 84)
      x.restore()
    }
  },
  front(x, t) {
    // the group chat (frame 0), then Leo's own DMs
    if (t < T.dm + 0.2) {
      const o = ease.inCubic(prog(t, T.dm - 0.3, T.dm + 0.1))
      drawPhone(x, t, { cx: 740, top: 600 + o * 1500, w: 420, h: 560, title: 'the group chat', msgs: CHAT, size: 26, rot: 0.06 })
      for (let i = 0; i < 4; i++) hearts(x, t, -1.2 + i * 0.7, 740, 760, { n: 7, cell: 8, spread: 380, life: 1.6 })
    }
    const inK = easeOutBack(prog(t, T.dm, T.dm + 0.35), 1.4), outv = ease.inCubic(prog(t, T.shot - 0.4, T.shot)), back = easeOutBack(prog(t, T.m2 + 1.6, T.m2 + 2.0), 1.4)
    if (t > T.dm && t < T.last + 0.3) {
      const y = t < T.m2 ? 560 + (1 - inK) * 1500 + outv * 1500 : 560 + (1 - back) * 1300 + ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3)) * 1300
      drawPhone(x, t, { cx: 700, top: y, w: 480, h: 640, title: 'them ♡', msgs: DM, typing: T.typing, size: 28, rot: -0.03 })
    }
    hearts(x, t, T.reply + 0.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 700, 1000, T.reply, 10, 220, 2)
  },
  cues: [
    ['boom', 0.0, 0.14], ['whoosh', 0.02, 0.4, 0.04],
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(0.1 + i * 0.35), [880, 1046.5, 1174.66, 1318.51, 1567.98, 1760][i], 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['pop', T.cancel, 440, 0.05, 0.2], ['pop', T.nw, 1174.66, 0.045, 0.2],
    ['whoosh', T.shot, 0.4, 0.035], ['pop', T.shot + 0.3, 987.77, 0.04, 0],
    ['whoosh', T.m2 + 1.6, 0.4, 0.035], ['pop', T.send, 1174.66, 0.045, 0.2],
    ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02],
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.reply + 0.08, 1760, 0.035, -0.2], ['glitter', T.reply, T.reply + 0.4],
    ['bell', T.last + 0.5, 1760, 0.03, 1.0, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
