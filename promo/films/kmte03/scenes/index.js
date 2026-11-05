// kmte03: MIRROR TALK No. 3, 'Five drafts for one "k."' (22 s vertical, star_advice post, chiptune · A). Hard cut.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Gemini mid-spin, five draft bubbles flying off, a giant "k." mid-zoom. Hook "They replied 'k.' |
//          I'm *spiralling.*"  1.0 loading bar "decoding 'k.'…" stalls at 99 % → "Error: too many feelings".
//   3.9    "Five drafts. *One* letter." The five drafts stack up, each longer. GEMINI: "which one sounds *normal*??"
//   9.4    REFLECTION: "what would you tell a *friend*?" → deletes them one by one ("Delete. Delete. *Delete.*")
//   12.6   GEMINI: "…just *ask*?"  REFLECTION: '"hey, did I catch you at a *bad time*?"'
//   16.2   the phone: sent → typing → "sorry! driving. call later?"  Gemini melts, Pisces fountains.
//   20.2   last line: "One kind question | beats *five* drafts."  Hard cut at 22.
import { makeMirror, drawPhone, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, BONE, r3, INTER } from '../../kmte01/mirrorkit.js'

const T = { spin: 0.55, bar: 1.0, drafts: [4.2, 4.8, 5.4, 6.0, 6.6], s1: 7.4, m1: 9.4, strikes: [11.0, 11.3, 11.6, 11.9, 12.2], s2: 12.6, m2: 14.0, phoneIn: 16.2, sent: 16.6, typing: [17.0, 17.95], reply: 18.0, last: 20.2 }
const DRAFTS = ['ok cool', 'ok cool!!', 'is everything ok?', 'did I do something??', "so I've been thinking…"]
const DCOL = ['#c9f0ff', '#ffe27a', '#ffd0a8', '#ffb3c1', '#ff8fa0']

function draftBubble(x, text, cx, cy, k, rot, col) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.font = `800 34px ${INTER}`
  const w = Math.min(560, x.measureText(text).width + 44), h = 66
  R(x, INK, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12); R(x, col, -w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2, w - 30)
  x.restore()
}

const F = makeMirror({
  id: 'kmte03', sign: 'gemini', dur: 22,
  hook: { text: 'They replied “k.” | I’m *spiralling.*', accentColor: '#ffe27a', out: [3.55, 3.8] },
  fx: [
    { k: 'loadingBar', at: T.bar, len: 2.7, label: 'decoding “k.”…', stallAt: 99, error: 'Error: too many feelings', y: 1000 },
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'screenShake', at: T.s2 + 0.05, amp: 10, len: 0.35 },
    { k: 'whipZoom', at: T.reply - 0.06, from: 1.25 },
  ],
  caps: [
    { at: 3.9, out: [10.0, 10.2], text: 'Five drafts. | *One* letter.', accent: '#ffe27a' },
    { at: 10.25, out: [19.9, 20.1], text: 'Delete. Delete. | *Delete.*', accent: '#ff8fa0', late: 1, lateAt: T.strikes[4] - 0.05 },
    { at: T.last, out: [99, 100], text: 'One kind question | beats *five* drafts.', accent: '#8fe9ff', size: 88, accentSize: 112, gap: 0.09 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'which one sounds *normal*??' },
    { t: T.m1, who: 'M', text: 'what would you tell a *friend*?' },
    { t: T.s2, who: 'S', text: '…just *ask*?' },
    { t: T.m2, who: 'M', text: '"hey, did I catch you at a *bad time*?"' },
  ],
  boxes: [[7.2, 16.4]],
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.6)); return { zoom: 1 + 0.3 * w, dx: 0, dy: 60 * w, rot: 0.04 * w } },
  pose(t) {
    const b = ease.outCubic(prog(t, T.spin, T.spin + 0.55))
    const p = { x: lerp(470, 300, b), y: lerp(1060, 1225, b), s: lerp(330, 280, b), rot: t < T.spin ? 0.45 - 0.2 * t : (0.34) * (1 - b) * Math.cos(b * 8), mood: 'wide', look: [0.3, -0.6], blink: t < 1 ? false : undefined }
    if (t > 1.2 && t < 3.6) { p.mood = 'wide'; p.look = [0, -1]; p.squash = 0.04 * Math.sin(t * 30) }
    if (t > 3.9) { p.mood = 'neutral'; p.look = [1, -1] }
    if (t > T.s1) p.mood = 'wide'
    if (t > T.m1) { p.mood = 'squint'; p.look = [1, -0.8] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0.5, -0.5] }
    if (t > T.m2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.phoneIn && t < T.last + 0.3) { p.mood = 'neutral'; p.look = [1, -0.3] }
    if (t > T.reply) { p.mood = 'heart'; p.look = undefined }
    return p
  },
  refl(t) {
    if (t < T.spin) return { x: 560, y: 860, s: 300, mood: 'wide', look: [-0.3, 0.3] }
    const b = ease.outCubic(prog(t, T.spin, T.spin + 0.6))
    const p = { x: lerp(560, 650, b), y: lerp(860, 905, b), s: lerp(300, 250, b), mood: 'neutral', look: [-1, 0.6] }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.strikes[0] && t < T.s2) { p.mood = 'squint'; p.squash = 0.05 * Math.sin(t * 25) }
    if (t > T.m2) p.mood = 'happy'
    if (t > T.reply) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: t < 4 ? 1 : 2, mood: 'wide' }
    if (t > T.strikes[0] && t < T.s2) p.tears = 3
    if (t > T.reply) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  tissuePulls: [T.strikes[1], T.strikes[3], T.reply + 0.3, T.reply + 0.8],
  over(x, t) {
    // frame 0: the giant "k." and the drafts flung off the phone
    const fly = ease.inCubic(prog(t, 0, 0.75))
    if (t < 0.8) {
      DRAFTS.forEach((d, i) => {
        const a = -2.4 + i * 1.15, R0 = 300 + 60 * i
        draftBubble(x, d.length > 18 ? d.slice(0, 16) + '…' : d, 540 + Math.cos(a) * (R0 + fly * 700), 1000 + Math.sin(a) * (R0 * 0.8 + fly * 700), 0.85, a * 0.3 + fly * 2, DCOL[i])
      })
    }
    const kk = (t < 3.4 ? 1 : 1 - ease.inCubic(prog(t, 3.4, 3.75)))
    if (kk > 0.01) {
      const ky = 690, wob = t < 1 ? 0.06 * Math.sin(t * 30) : 0
      x.save(); x.translate(560, ky); x.rotate(-0.06 + wob); x.scale(kk, kk)
      R(x, INK, -170, -110, 340, 220); R(x, '#3b335c', -162, -102, 324, 204); R(x, INK, -150, 102, 40, 30); R(x, '#3b335c', -142, 102, 26, 18)
      x.font = `800 150px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('k.', 0, 6)
      x.restore()
    }
    // the five drafts, stacked over the glass, struck and flung away
    DRAFTS.forEach((d, i) => {
      const at = T.drafts[i], s = T.strikes[4 - i]
      if (t < at) return
      const k = easeOutBack(prog(t, at, at + 0.28), 2)
      const f = ease.inCubic(prog(t, s + 0.12, s + 0.5))
      if (f >= 1) return
      const cy = 560 + i * 98
      draftBubble(x, d, 540 + f * 900 * (i % 2 ? 1 : -1), cy - f * 160, k, (i % 2 ? 0.03 : -0.03) + f * (i % 2 ? 1.2 : -1.2), DCOL[i])
      if (t > s) { const sp = ease.outCubic(prog(t, s, s + 0.12)); x.save(); x.translate(540 + f * 900 * (i % 2 ? 1 : -1), cy - f * 160); x.rotate(f * (i % 2 ? 1.2 : -1.2)); R(x, '#e8344e', -280, -5, 560 * sp, 10); x.restore() }
      label(x, `DRAFT ${i + 1}`, 540 - 330, cy, { size: 20, col: '#cfc6e6', alpha: (1 - f) * clamp(k) * (t < s ? 1 : 0) })
    })
    // the phone: the one kind question, then the reply
    if (t > T.phoneIn && t < T.last + 0.3) {
      const pin = easeOutBack(prog(t, T.phoneIn, T.phoneIn + 0.35), 1.4) * outK(t, [T.last - 0.1, T.last + 0.3])
      drawPhone(x, t, { cx: 620, top: 520 + (1 - pin) * 1200, w: 520, h: 640, title: 'them', size: 30, msgs: [{ at: -1, side: 'L', text: 'k.' }, { at: T.sent, side: 'R', text: 'hey, did I catch you at a bad time?' }, { at: T.reply, side: 'L', text: 'sorry! driving. call later?' }], typing: T.typing, rot: -0.03 })
    }
    hearts(x, t, T.reply + 0.2, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 620, 1000, T.reply, 10, 220, 2)
  },
  cues: [
    ...Array.from({ length: 5 }, (_, i) => ['whoosh', r3(0.02 + i * 0.08), 0.3, 0.025]),
    ['pop', 0.6, 440, 0.04, 0],
    ...T.drafts.map((d, i) => ['pop', d, [880, 987.77, 1108.73, 1318.51, 1479.98][i], 0.045, (i % 2 ? 0.3 : -0.3)]),
    ...T.strikes.map((s, i) => ['chip', s, [1046.5, 987.77, 880, 783.99, 659.25][i], 0.09, { gain: 0.04, wave: 'square', duty: 0.5, decay: 0.08, sustain: 0.5 }]), ...T.strikes.map((s, i) => ['whoosh', r3(s + 0.12), 0.3, 0.03]),
    ['whoosh', T.phoneIn, 0.4, 0.035], ['pop', T.sent, 1174.66, 0.045, 0.2],
    ['tick', T.typing[0], 0.02], ['tick', T.typing[0] + 0.15, 0.02], ['tick', T.typing[0] + 0.3, 0.02],
    ['pop', T.reply, 1318.51, 0.05, -0.2], ['pop', T.reply + 0.08, 1760, 0.035, -0.2], ['glitter', T.reply, T.reply + 0.4],
    ['bell', T.last + 0.6, 1760, 0.03, 1.0, 0],
  ],
})

function label(x, text, cx, cy, { size, col, alpha }) {
  if (alpha <= 0.01) return
  x.save(); x.globalAlpha = alpha; x.font = `700 ${size}px 'Space Mono', monospace`; x.fillStyle = col; x.textAlign = 'center'; x.textBaseline = 'middle'; x.translate(cx, cy); x.rotate(-1.5708); x.fillText(text, 0, 0); x.restore()
}

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
