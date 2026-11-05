// kmte12: MIRROR TALK No. 12, "Comparing myself to their new person." (25 s vertical, star_advice post, dreamy · Ab).
// Hard cut. Row: promo/films/month2/m21.md. No end card, no card cut. Pisces is the lead (and cries the whole way).
//   0.00   frame 0: Pisces mid-cry, tears fountaining onto the glass, the ex's new photo mid-zoom in the mirror.
//          Hook "Comparing myself to | their *new person.*"  0.4: a pink colour flash.
//   2.9    "They seem *perfect.*"  Pisces' list: great hair · runs at dawn · has a BOAT?? · probably never cries.
//          PISCES: "they have great hair. and a *boat*??"
//   6.0    the reflection passes a tissue through the glass: "you'd never let a friend talk about themselves like *this*."
//          PISCES: "…no. I'd *hug* them."  REFLECTION: "so hug *you*."  13.0: Pisces hugs itself (still crying, happy now).
//   13.8   the reflection rewrites the list: THINGS I LIKE ABOUT ME · I feel everything · I remember birthdays · I give
//          the best hugs.  19.6: the ex's photo swaps for a selfie, "me :)".
//   22.8   last line "Be your own | *best friend.*"  Hard cut at 25.
import { makeMirror, inSprite, tearsCells, drawPhoto, drawNote, hearts, sparkles, pop01, outK, prog, lerp, clamp, ease, easeOutBack, R, INK, r3 } from '../../kmte01/mirrorkit.js'

const T = { flash: 0.4, list: [3.4, 4.2, 5.0, 5.8], s1: 3.3, tissue: [6.0, 6.7], m1: 6.2, s2: 9.6, m2: 11.6, hug: 13.0, strike: [13.8, 14.0, 14.2, 14.4], newT: 14.7, nl: [15.2, 16.0, 16.8], mhug: 18.2, swap: 19.6, last: 22.8 }
const PISC = '#9f8cf0'

const F = makeMirror({
  id: 'kmte12', sign: 'pisces', dur: 25,
  hook: { text: 'Comparing myself to | their *new person.*', accentColor: '#ff8fb1', size: 90, out: [2.65, 2.9] },
  glassTint: ['#1d2f55', '#2a1a4c'],
  fx: [
    { k: 'whipZoom', at: T.m1 - 0.08, from: 1.3 },
    { k: 'screenShake', at: T.s2 + 0.05, amp: 9, len: 0.3 },
    { k: 'whipZoom', at: T.m2 - 0.08, from: 1.35 },
    { k: 'screenShake', at: T.hug, amp: 12, len: 0.4 },
    { k: 'whipZoom', at: T.swap - 0.06, from: 1.25 },
  ],
  flashes: [[T.flash, '#ff8fb1', 0.22]],
  caps: [
    { at: 2.95, out: [11.3, 11.5], text: 'They seem *perfect.*', accent: '#ff8fb1', size: 100, accentSize: 134 },
    { at: 11.55, out: [22.5, 22.7], text: 'So hug *you.*', accent: '#8fe9ff', size: 110, accentSize: 150, late: 1, lateAt: T.m2 + 0.4 },
    { at: T.last, out: [99, 100], text: 'Be your own | *best friend.*', accent: '#ffd36b', gap: 0.1 },
  ],
  lines: [
    { t: T.s1, who: 'S', text: 'they have great hair. and a *boat*??' },
    { t: T.m1, who: 'M', text: "you'd never let a friend talk about themselves like *this*." },
    { t: T.s2, who: 'S', text: "…no. I'd *hug* them." },
    { t: T.m2, who: 'M', text: 'so hug *you*.' },
  ],
  boxes: [[3.1, 13.6]],
  noTissues: false,
  cam(t) { const w = 1 - ease.outCubic(prog(t, 0, 0.6)); return { zoom: 1 + 0.2 * w, dy: 30 * w } },
  pose(t) {
    const b = ease.outCubic(prog(t, 0.5, 1.1))
    const p = { x: lerp(430, 300, b), y: lerp(1090, 1225, b), s: lerp(330, 280, b), mood: 'wide', look: [1, -0.6], blink: false, squash: t < 1 ? 0.04 * Math.sin(t * 30) : 0 }
    if (t > 1.2) p.blink = undefined
    if (t > T.s1) { p.mood = 'wide'; p.look = [1, -0.3] }
    if (t > T.m1) { p.mood = 'sparkle'; p.look = [1, -0.9] }
    if (t > T.s2) { p.mood = 'neutral'; p.look = [0.3, 0.6] }
    if (t > T.m2) { p.mood = 'wide'; p.look = [1, -1] }
    if (t > T.hug) { p.mood = 'happy'; p.look = undefined; p.squash = 0.14 * Math.exp(-(t - T.hug) * 1.2) * (0.7 + 0.3 * Math.sin((t - T.hug) * 9)) }
    if (t > T.swap + 0.8) p.mood = 'heart'
    const tears = t > T.hug ? 2 : 3
    p.draw = (x, tt, Fr) => {
      // the hug: two little arms wrapped round (pixel bars)
      if (tt > T.hug && tt < T.last + 1) {
        const k = pop01(tt, T.hug, 0.3, 2.2)
        x.save(); x.translate(Fr.ox, Fr.cy + Fr.S * 0.24); x.scale(k, k)
        R(x, INK, -Fr.S * 0.36, -12, Fr.S * 0.72, 30); R(x, '#c9bbff', -Fr.S * 0.34, -6, Fr.S * 0.68, 18)
        x.restore()
      }
      inSprite(x, Fr, () => tearsCells(x, tt, tears))
    }
    return p
  },
  refl(t) {
    const p = { mood: 'neutral', look: [-1, 0.6], x: 690, y: 960, s: 220 }
    if (t < 0.6) { p.alpha = 0.5 }
    if (t > T.m1) p.mood = 'happy'
    if (t > T.hug) p.mood = 'sparkle'
    if (t > T.mhug) { p.mood = 'happy'; p.squash = 0.12 * Math.exp(-(t - T.mhug) * 1.5) }
    return p
  },
  pis(t) { return { hide: true } },
  glass(x, t) {
    // the ex's new photo, mid-zoom at frame 0; swaps for a selfie at the end
    const z = lerp(1.7, 1, ease.outCubic(prog(t, -0.3, 0.9)))
    const sw = ease.inOutCubic(prog(t, T.swap, T.swap + 0.5))
    if (sw < 1) drawPhoto(x, { cx: 440, cy: 720, w: 230 * z, rot: -0.06, k: 1 - sw, a: '#ffb36b', b: '#7fd0ff', capt: 'new + happy', heart: true })
    if (sw > 0) drawPhoto(x, { cx: 440, cy: 720, w: 230, rot: 0.05, k: easeOutBack(sw, 1.6), a: PISC, b: PISC, capt: 'me :)', heart: true })
    // the list (comparison, then rewritten)
    const lk = easeOutBack(prog(t, T.list[0] - 0.3, T.list[0]), 1.6) * outK(t, [T.last - 0.15, T.last + 0.2])
    const re = t > T.newT
    drawNote(x, t, { cx: 665, cy: 700, w: 380, h: 360, rot: 0.04, k: lk * (re ? pop01(t, T.newT, 0.3, 2) : 1) * (t > T.strike[3] + 0.2 && !re ? 1 - prog(t, T.strike[3] + 0.2, T.newT) : 1), size: 27, lineGap: 52,
      title: re ? 'I like that…' : 'THEM:', lines: re
        ? [{ text: 'I feel everything', at: T.nl[0] }, { text: 'I remember birthdays', at: T.nl[1] }, { text: 'I give great hugs', at: T.nl[2], col: '#7a3ec8', bold: true }]
        : [{ text: 'great hair', at: T.list[0], strike: T.strike[0] }, { text: 'runs at dawn', at: T.list[1], strike: T.strike[1] }, { text: 'has a BOAT??', at: T.list[2], strike: T.strike[2] }, { text: 'probably never cries', at: T.list[3], strike: T.strike[3] }] })
  },
  over(x, t) {
    // the tissue passed through the glass
    if (t > T.tissue[0] && t < T.tissue[1] + 0.4) {
      const p = ease.inOutCubic(prog(t, ...T.tissue))
      x.save(); x.translate(lerp(640, 380, p), lerp(930, 1100, p) - Math.sin(Math.PI * p) * 140); x.rotate(p * 4)
      R(x, INK, -22, -22, 44, 44); R(x, '#fff', -18, -18, 36, 36); x.restore()
    }
    hearts(x, t, T.hug + 0.2, 300, 1080, { n: 7, cell: 7, spread: 180 })
    hearts(x, t, T.mhug, 690, 900, { n: 5, cell: 6, spread: 140 })
    sparkles(x, t, 440, 720, T.swap + 0.5, 10, 200, 2)
  },
  cues: [
    ['whoosh', 0.0, 0.5, 0.04], ['pluck', T.flash, 830.61, 0.04, 0.9, 0], ['glitter', T.flash, T.flash + 0.4],
    ...T.list.map((l, i) => ['tick', l, 0.03]),
    ['whoosh', T.tissue[0], 0.5, 0.03], ['pop', T.tissue[1], 1244.51, 0.04, -0.2],
    ['swell', T.hug - 0.4, T.hug + 0.6, { gain: 0.04, f0: 500, f1: 4000 }], ['glitter', T.hug, T.hug + 0.6],
    ...T.strike.map(s => ['whoosh', s, 0.15, 0.025]), ['pop', T.newT, 1046.5, 0.045, 0.2], ...T.nl.map((n, i) => ['pluck', n, [1046.5, 1244.51, 1396.91][i], 0.03, 0.5, 0.2]),
    ['pop', T.mhug, 932.33, 0.035, 0.3], ['whoosh', T.swap, 0.4, 0.035], ['bell', T.swap + 0.5, 1661.22, 0.03, 1.0, -0.2],
    ['bell', T.last + 0.55, 1661.22, 0.03, 1.2, 0],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
