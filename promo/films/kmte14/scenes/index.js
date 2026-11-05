// kmte14: MIRROR TALK No. 14, "Left on read, spiralling politely." (20 s vertical, star_advice post, lofi · G). Loops.
// Row: promo/films/month2/m21.md. No end card, no card cut.
//   0.00   frame 0: Virgo mid-stare at "Read 4:12 PM", a red marker circle slammed round it. Hook "Left on read. |
//          *Spiralling.*"  1.0–2.4: the clock jumps 4:12 → 4:47 → 6:03 (a jolt each time).
//   2.8    "Drafting an *apology*… for nothing."  The twelve-point apology writes itself. VIRGO: "what did I *do*?"
//   5.2    REFLECTION: "their silence isn't a *grade* on you." → "you'd tell a friend: go *live* your day."
//   10.4   VIRGO: "…a walk. I'll take a *walk*."  Virgo walks off; LATER…; back with a leaf. 13.5 the phone buzzes:
//          "sorry!! was in a meeting. yes to next week!"  Pisces cries at the walk.
//   14.8   last line "Silence is not | a *score.*"  16.4: the phone slides back; 19.55–20 eases into frame 0 (loop).
import { makeMirror, drawPhone, drawNote, drawClock, hearts, sparkles, drawBits, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, BONE, r3, INTER } from '../../kmte01/mirrorkit.js'

const T = { jumps: [1.0, 1.7, 2.4], note: 2.9, nl: [3.3, 3.9, 4.5, 5.0], s1: 3.2, m1: 5.2, m2: 7.8, s2: 10.4, walk: [11.7, 12.3], later: 12.5, ret: [13.0, 13.5], buzz: 13.7, last: 14.8, back: 16.4 }
const LEAF = ['..GG', '.GGG', 'GGG.', 'GG..', 'B...']

function redRing(x, t, cx, cy, rx, ry, k) {
  if (k <= 0.01) return
  x.save(); x.strokeStyle = '#ff3b3b'; x.lineWidth = 9; x.lineCap = 'round'; x.globalAlpha = k
  x.beginPath()
  for (let i = 0; i <= 40; i++) { const a = -0.4 + i / 40 * Math.PI * 2.15, w = 1 + 0.05 * Math.sin(i * 1.7); const px = cx + Math.cos(a) * rx * w, py = cy + Math.sin(a) * ry * w; if (i) x.lineTo(px, py); else x.moveTo(px, py) }
  x.stroke(); x.restore()
}

const F = makeMirror({
  id: 'kmte14', sign: 'virgo', dur: 20, loop: true,
  hook: { text: 'Left on read. | *Spiralling.*', accentColor: '#ff6b7f', out: [2.55, 2.8] },
  fx: [
    ...[1.0, 1.7, 2.4].map(at => ({ k: 'screenShake', at, amp: 14, len: 0.3 })),
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'whipZoom', at: T.s2 - 0.08, from: 1.2 },
    { k: 'whipZoom', at: T.buzz - 0.06, from: 1.25 },
  ],
  caps: [
    { at: 2.85, out: [8.8, 9.0], text: 'An apology… | for *nothing.*', accent: '#ff8fa0' },
    { at: 9.05, out: [14.5, 14.7], text: 'Go *live* | your day.', accent: '#7dffb0' },
    { at: T.last, out: [19.5, 19.95], text: 'Silence is not | a *score.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'what did I *do*?' },
    { t: T.m1, who: 'M', text: "their silence isn't a *grade* on you." },
    { t: T.m2, who: 'M', text: "you'd tell a friend: go *live* your day." },
    { t: T.s2, who: 'S', text: "…a walk. I'll take a *walk*." },
  ],
  boxes: [[3.0, 11.9]],
  pose(t) {
    const st = ease.outCubic(prog(t, 2.5, 3.0)), back = ease.inOutCubic(prog(t, T.back, 19.5)), m = st * (1 - back)
    const p = { x: lerp(400, 300, m), y: lerp(1110, 1225, m), s: lerp(300, 280, m), mood: 'wide', look: [1, -0.5], blink: false, squash: m < 0.5 ? 0.03 * Math.sin(t * 25) : 0 }
    if (t > 3.0 && t < T.back) { p.mood = 'wide'; p.look = [1, -0.6]; p.blink = undefined }
    if (t > T.m1 && t < T.back) { p.mood = 'neutral'; p.look = [1, -0.9] }
    if (t > T.m2 && t < T.back) p.mood = 'sparkle'
    if (t > T.s2 && t < T.back) { p.mood = 'happy'; p.look = undefined }
    if (t > T.walk[0] && t < T.ret[1]) { const w = ease.inCubic(prog(t, ...T.walk)), r = ease.outCubic(prog(t, ...T.ret)); p.x = lerp(lerp(300, -220, w), 300, r); p.rot = 0.08 * Math.sin(t * 14) }
    if (t > T.buzz && t < T.back) { p.mood = 'heart'; p.look = undefined }
    p.draw = (x, tt, Fr) => { if (tt > T.ret[0] && tt < T.back) drawBits(x, LEAF, { G: '#5fd38a', B: '#7a4f2a' }, Fr.ox + Fr.S * 0.4, Fr.cy - Fr.S * 0.3, 9) }
    return p
  },
  signHops: [T.ret[1], T.buzz + 0.1],
  refl(t) {
    const st = ease.outCubic(prog(t, 2.5, 3.0)), back = ease.inOutCubic(prog(t, T.back, 19.5)), m = st * (1 - back)
    const p = { x: lerp(500, 650, m), y: lerp(870, 905, m), s: lerp(260, 250, m), mood: 'wide', look: [1, 0.3] }
    if (t > 3 && t < T.back) { p.mood = 'neutral'; p.look = [-1, 0.6] }
    if (t > T.m1 && t < T.back) p.mood = 'happy'
    if (t > T.buzz && t < T.back) p.mood = 'wink'
    return p
  },
  pis(t) {
    const p = { tears: 2, mood: 'wide' }
    if (t > T.walk[0] && t < T.back) { p.tears = 3; p.mood = 'sparkle' }
    if (t > T.buzz && t < T.back) p.mood = 'happy'
    return p
  },
  pisHops: [T.walk[0] + 0.2],
  tissuePulls: [T.walk[0] + 0.3, T.walk[0] + 0.7, T.buzz + 0.4],
  front(x, t) {
    // the phone: big at frame 0 (and back for the loop), tucked to the side mid-film
    const side = ease.inOutCubic(prog(t, 2.5, 3.0)) * (1 - ease.inOutCubic(prog(t, T.back, 19.5)))
    const hide = ease.inOutCubic(prog(t, T.note - 0.2, T.note + 0.2)) * (1 - ease.inOutCubic(prog(t, 11.4, 11.9)))
    const msgs = [{ at: -1, side: 'R', text: 'so fun today! same time next week?' }, ...(t > T.buzz && t < T.back ? [{ at: T.buzz, side: 'L', text: 'sorry!! was in a meeting. yes to next week!' }] : [])]
    const top = lerp(680, 600, side) + hide * 1500 + (t > T.last && t < T.back ? ease.inCubic(prog(t, T.last - 0.1, T.last + 0.3)) * 1500 : 0) - (t > T.back ? 0 : 0)
    const backIn = t > T.back ? (1 - ease.outCubic(prog(t, T.back, T.back + 0.6))) * 1500 : 0
    const cx = lerp(650, 760, side), w = lerp(440, 380, side), h = lerp(440, 520, side)
    const read = (t < T.buzz || t > T.back) ? { at: -1, text: 'Read 4:12 PM' } : null
    drawPhone(x, t, { cx, top: top + backIn, w, h, title: 'them ♡', size: lerp(34, 26, side), msgs, read, rot: lerp(-0.04, 0.04, side) })
    const rk = t < 2.6 ? 1 - prog(t, 2.4, 2.6) : t > T.back ? ease.outCubic(prog(t, T.back + 0.6, 19.4)) : 0
    redRing(x, t, cx + w / 2 - 110, top + backIn + h - 40, 120, 46, rk)
    // the clock jumps
    if (t > T.jumps[0] - 0.05 && t < 2.8) {
      const i = t > T.jumps[2] ? 2 : t > T.jumps[1] ? 1 : 0
      drawClock(x, 360, 560, ['4:47 PM', '6:03 PM', '9:30 PM'][i], { k: pop01(t, T.jumps[i], 0.2, 2.6) * outK(t, [2.6, 2.8]), size: 56, col: '#ff8fa0' })
    }
    // the apology draft
    const nk = easeOutBack(prog(t, T.note, T.note + 0.35), 1.6) * outK(t, [11.4, 11.8])
    drawNote(x, t, { cx: 660, cy: 800, w: 420, h: 420, rot: 0.03, k: nk, size: 26, lineGap: 54, title: 'apology (draft 4)', lines: [
      { text: '1. sorry if that was a lot', at: T.nl[0], strike: T.m1 + 0.6 }, { text: "2. sorry for 'same time'", at: T.nl[1], strike: T.m1 + 0.9 },
      { text: '3. sorry in general', at: T.nl[2], strike: T.m1 + 1.2 }, { text: '…9 more', at: T.nl[3], col: '#e8344e' },
    ] })
    // LATER…
    if (t > T.later && t < T.ret[1] + 0.3) {
      const k = pop01(t, T.later, 0.25, 2.6) * outK(t, [T.ret[1], T.ret[1] + 0.3])
      x.save(); x.translate(330, 1000); x.rotate(-0.08); x.scale(k, k); R(x, INK, -150, -46, 300, 92); R(x, '#ffe27a', -142, -38, 284, 76)
      x.font = `800 48px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LATER…', 0, 3); x.restore()
    }
    hearts(x, t, T.buzz + 0.3, 300, 1080, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 760, 900, T.buzz, 10, 200, 2)
  },
  cues: [
    ['boom', 0.0, 0.12], ['tick', 0.05, 0.05],
    ...[1.0, 1.7, 2.4].map(a => ['tick', a, 0.06]), ...[1.0, 1.7, 2.4].map((a, i) => ['pop', a + 0.02, [523.25, 466.16, 392][i], 0.045, 0]),
    ...[3.3, 3.9, 4.5, 5.0].flatMap(n => Array.from({ length: 5 }, (_, i) => ['tick', r3(n + i * 0.07), 0.015])),
    ...[0.6, 0.9, 1.2].map(d => ['whoosh', r3(T.m1 + d), 0.15, 0.02]),
    ['whoosh', T.walk[0], 0.5, 0.03], ['pop', T.later, 783.99, 0.045, 0], ['whoosh', T.ret[0], 0.4, 0.03],
    ...Array.from({ length: 5 }, (_, i) => ['tick', r3(T.buzz + i * 0.06), 0.04]),
    ['pop', T.buzz + 0.1, 1318.51, 0.05, 0.3], ['pop', T.buzz + 0.18, 1760, 0.035, 0.3], ['glitter', T.buzz, T.buzz + 0.5],
    ['bell', T.last + 0.5, 1567.98, 0.03, 1.0, 0], ['whoosh', T.back, 0.5, 0.035],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
