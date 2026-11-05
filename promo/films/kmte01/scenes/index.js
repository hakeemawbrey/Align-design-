// kmte01: MIRROR TALK No. 1, "Always the one who texts first." (20 s vertical, star_advice post, funk · E)
// Row: promo/films/month2/m21.md. No end card, no card cut: the story is the whole film. Hard cut on the last line.
//   0.00   frame 0: Aries mid-crash into the mirror (squished on the glass, phone up), mid whip-zoom, screen shaking.
//          Hook: "Me, about to double-text. *Again.*"
//   0.45   Aries bounces off the glass (flash + thud); the reflection shakes it off and crosses its eyes at it.
//   1.1    the phone: four blue bubbles, zero grey, "Delivered". ARIES: "they'll answer if I send one more."
//   6.2    REFLECTION: "would you tell a *friend* to chase?"  ARIES: "…no. I'd say let it come back."
//   12.2   REFLECTION: "you reach out because you care." → "so let them *reach back*."
//   15.9   Aries puts the phone face down on the shelf. 16.9 BUZZ: "sorry!! just saw this. tacos friday?"
//   18.2   last line: "Meet them *halfway*. | Not all the way."  Pisces fountains into the tissues. Hard cut at 20.
import { makeMirror, drawPhone, bubble, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, label, R, INK, r3 } from '../../kmte01/mirrorkit.js'

const T = {
  bounce: 0.45, phoneIn: [1.0, 1.35], m: [1.2, 1.55, 1.9, 2.25], aries1: 2.7, phoneOut: [5.7, 6.05],
  r1: 6.35, aries2: 9.1, r2: 12.2, r3: 14.7,
  down: [15.9, 16.4], buzz: 16.95, note: 17.15, last: 18.2,
}
const MSGS = [
  { at: T.m[0], side: 'R', text: 'hey!' },
  { at: T.m[1], side: 'R', text: 'how was your day' },
  { at: T.m[2], side: 'R', text: 'saw a dog that looked like you' },
  { at: T.m[3], side: 'R', text: 'lol anyway' },
]

const F = makeMirror({
  id: 'kmte01', sign: 'aries', dur: 20,
  hook: { text: 'Me, about to | double-text. *Again.*', accentColor: '#ff7a59', out: [2.45, 2.7] },
  fx: [
    { k: 'caught', at: 2.2, x: 740, y: 1060, r: 130, ry: 120, label: 'ZERO REPLIES', arrow: 'tl', rec: false, out: [5.5, 5.7] },
    { k: 'whipZoom', at: 6.12, from: 1.35 },
    { k: 'screenShake', at: T.aries2 + 0.05, amp: 12, len: 0.35 },
    { k: 'whipZoom', at: T.r2 - 0.05, from: 1.25 },
    { k: 'whipZoom', at: T.buzz, from: 1.2 },
    { k: 'notification', at: T.note, out: [T.last - 0.1, T.last + 0.15], title: 'texts', body: 'sorry!! just saw this. *tacos friday?*', glyph: '★', y: 470 },
  ],
  caps: [
    { at: 2.75, out: [5.8, 6.0], text: 'Four texts. | *Zero* replies.', accent: '#7fd0ff' },
    { at: 6.1, out: [15.7, 15.9], text: 'What would you | tell a *friend?*', accent: '#8fe9ff' },
    { at: T.last, out: [99, 100], text: 'Meet them *halfway.* | Not all the way.', accent: '#ffd36b', size: 84, accentSize: 108, gap: 0.09 },
  ],
  lines: [
    { t: T.aries1, who: 'S', text: "they'll answer if I send *one more*." },
    { t: T.r1, who: 'M', text: 'would you tell a *friend* to chase?' },
    { t: T.aries2, who: 'S', text: "…no. I'd say let it *come back*." },
    { t: T.r2, who: 'M', text: 'you reach out because you *care*.' },
    { t: T.r3, who: 'M', text: 'so let them *reach back*.' },
  ],
  boxes: [[2.5, 5.75], [6.15, 16.6]],
  pose(t) {
    // frame 0: squished on the glass, then bounces back to the stance
    const b = ease.outCubic(prog(t, T.bounce, T.bounce + 0.5))
    const squish = t < T.bounce ? 0.32 : 0.32 * (1 - b) * Math.cos(b * 9)
    const p = { x: lerp(470, 300, b), y: lerp(930, 1225, b), s: lerp(330, 280, b), squash: squish, mood: t < T.bounce ? 'wide' : 'squint', look: t < T.bounce ? [0, 0] : [1, -0.8], blink: t < T.bounce ? false : undefined }
    if (t > T.aries1 - 0.2 && t < T.phoneOut[0]) p.mood = 'neutral'
    if (t > T.r1 && t < T.aries2) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.aries2 && t < T.r2) { p.mood = 'neutral'; p.look = [0.6, 0] }
    if (t > T.r2) { p.mood = 'sparkle'; p.look = [1, -0.8] }
    if (t > T.buzz) { p.mood = 'wide'; p.look = [0.8, 0.6] }
    if (t > T.note + 0.6) { p.mood = 'heart'; p.look = undefined }
    return p
  },
  refl(t) {
    if (t < T.bounce) return { x: 520, y: 930, s: 330, squash: 0.32, mood: 'wide', look: [0, 0] }
    const b = ease.outCubic(prog(t, T.bounce, T.bounce + 0.6))
    const p = { x: lerp(560, 650, b), y: lerp(930, 905, b), s: lerp(330, 250, b), mood: 'squint', look: [-1, 0.6] }
    if (t > T.r1) p.mood = 'neutral'
    if (t > T.r2) p.mood = 'happy'
    if (t > T.buzz) { p.mood = 'wink'; p.look = [-1, 0.8] }
    return p
  },
  pis(t) {
    const p = { tears: t < 3 ? 1 : 2, mood: 'wide', look: [-1, -0.4] }
    if (t > T.r2) { p.mood = 'sparkle' }
    if (t > T.buzz) { p.tears = 3; p.mood = 'happy' }
    return p
  },
  tissuePulls: [T.r2 + 1.2, T.buzz + 0.3, T.buzz + 0.9, T.last + 0.6],
  shakes: [[0, 26, 0.5], [T.bounce, 18], [T.buzz, 10, 0.35], [T.buzz + 0.25, 8, 0.35]],
  flashes: [[T.bounce, '#ffffff', 0.16]],
  cam(t) {
    // frame 0 is mid whip-zoom (pushed in on the crash), it settles by 0.5; a small push-in on the punchline
    const w = 1 - ease.outCubic(prog(t, 0, 0.5))
    const end = ease.inOutCubic(prog(t, T.last, T.last + 1.2))
    return { zoom: 1 + 0.32 * w + 0.04 * end, dx: -40 * w, dy: 40 * w, rot: -0.03 * w }
  },
  front(x, t, K) {
    // frame 0: the phone in Aries' hand, squished against the glass too
    if (t < T.bounce + 0.3) {
      const b = ease.outCubic(prog(t, T.bounce, T.bounce + 0.3))
      drawPhone(x, t, { cx: lerp(640, 700, b), top: lerp(900, 1300, b), w: 230, h: 330, title: 'them', msgs: [{ at: -1, side: 'R', text: 'hey!' }, { at: -1, side: 'R', text: 'hello?' }, { at: -1, side: 'R', text: 'u there' }], rot: 0.18, alpha: 1 - b, size: 20 })
    }
    // the thread
    if (t > T.phoneIn[0] && t < T.phoneOut[1]) {
      const pin = easeOutBack(prog(t, ...T.phoneIn), 1.4), po = ease.inCubic(prog(t, ...T.phoneOut))
      drawPhone(x, t, { cx: 600, top: 470 + (1 - pin) * 900 + po * 900, w: 500, h: 720, title: 'them ♡', msgs: MSGS, read: { at: T.m[3] + 0.3, text: 'Delivered' }, rot: -0.03 })
      label(x, '0 replies', 600, 470 + 760 + (1 - pin) * 900 + po * 900, { size: 30, col: '#ff8fa0', alpha: clamp(prog(t, T.m[3] + 0.5, T.m[3] + 0.8)) })
    }
    // face down on the shelf, then the buzz
    if (t > T.down[0]) {
      const d = ease.outCubic(prog(t, ...T.down))
      const bz = t > T.buzz ? Math.sin((t - T.buzz) * 60) * 6 * Math.exp(-(t - T.buzz) * 2.2) : 0
      const cx = lerp(330, 470, d) + bz, cy = lerp(1050, K.SHELF.y - 14, d)
      x.save(); x.translate(cx, cy); x.rotate(lerp(-0.4, 0, d) + bz * 0.01)
      R(x, INK, -86, -20, 172, 34); R(x, '#2a2147', -80, -14, 160, 22); R(x, '#3a2e66', -80, -14, 160, 5)
      if (t > T.buzz) { x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 20); R(x, '#8fe9ff', -84, 14, 168, 4) }
      x.restore()
      if (t > T.buzz) for (let i = 0; i < 2; i++) label(x, i ? '))' : '((', cx + (i ? 120 : -120), cy - 6 + Math.sin(t * 30) * 3, { size: 40, col: '#8fe9ff', alpha: clamp(1 - prog(t, T.buzz + 1.0, T.buzz + 1.4)) })
    }
    hearts(x, t, T.note + 0.6, 300, 1060, { n: 6, cell: 7, spread: 160 })
    sparkles(x, t, 540, 640, T.note + 0.05, 10, 300, 2)
    void bubble
  },
  cues: [
    ['whoosh', 0, 0.5, 0.05], ['boom', 0.02, 0.18], ['tick', 0.05, 0.06],
    ['whoosh', T.bounce, 0.35, 0.04], ['pop', T.bounce + 0.02, 330, 0.05, 0],
    ['whoosh', T.phoneIn[0], 0.4, 0.035],
    ...MSGS.map((m, i) => ['pop', r3(m.at), [880, 987.77, 1174.66, 1318.51][i], 0.045, 0.2]),
    ['pluck', T.m[3] + 0.6, 2637, 0.012, 0.1, 0.3], ['pluck', T.m[3] + 0.69, 2637, 0.012, 0.1, 0.3], ['pluck', T.m[3] + 1.0, 2637, 0.012, 0.1, 0.3],
    ['whoosh', T.phoneOut[0], 0.35, 0.03],
    ['tick', T.down[1], 0.05], ['tom', T.down[1], 110, { gain: 0.12, decay: 0.15 }],
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.buzz + i * 0.06), 0.045]),
    ['glitter', T.note, T.note + 0.4],
    ['bell', T.last + 0.55, 1760, 0.03, 1.0, 0], ['pop', T.last + 0.55, 1174.66, 0.045, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
