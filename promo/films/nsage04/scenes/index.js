// nsage04: SAG SEASON TAKEOVER, ep 4, "Sag's Itinerary" (30 s vertical, music: cinematic · Dm). promo/films/next30/b10.md.
// Story 0–25.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag planned our | *whole weekend.*"  Frame 0: Sag mid-reach, handing Libra a TINY note.
//   2.6–8.1    "The *itinerary:*"  The note, up close: "DAY 1: wake up." "DAY 2: figure it out."  Libra's little scale
//              tips over. LIBRA: "that's… it?"
//   8.1–13.6   "Libra *asks.*"  LIBRA: "do you not want to plan with me?"  Sag's smile drops.
//  13.6        card cut.
//  13.6–21.0   "Sag, *honestly:*"  SAG: "I don't plan because I'm scared it won't go right."  LIBRA: "then let's figure it
//              out together."  They flip the note and write one plan on the back.
//  21.0–25.6   THE STARS: "Unplanned is fine. *Unsaid* isn't."  Pisces fountains.
import { makeTakeover, R, box, ink, note, floor, shadow, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

const LIB = '#7fd0a8'
// Libra's little balance scale; tip −1…1
function scale(x, cx, by, tip = 0, s = 1) {
  x.save(); x.translate(cx, by); x.scale(s, s)
  box(x, -50, -14, 100, 14, '#c9c3dd', { b: 5 })
  box(x, -7, -170, 14, 156, '#c9c3dd', { b: 5 })
  x.translate(0, -170); x.rotate(tip * 0.6)
  box(x, -110, -6, 220, 12, GOLD, { b: 5 })
  for (const d of [-1, 1]) { R(x, INK, d * 100 - 2, 0, 4, 60); box(x, d * 100 - 36, 60, 72, 14, GOLD, { b: 4 }) }
  x.restore()
}

const EP = makeTakeover({
  id: 'nsage04', host: 'sag', duration: 30, dy: 200,
  hook: {
    text: 'Sag planned our | *whole weekend.*', dur: 2.6,
    draw(x, t, S) {
      floor(x, 1220)
      shadow(x, 320, 1215, 240); shadow(x, 760, 1215, 260)
      S.host(x, t, { x: 320, y: 1030, s: 270, mood: 'happy', look: [1, 0], squash: -0.05, hops: [0.6, 1.4] })
      S.star(x, t, 'libra', { x: 770, y: 1020, s: 280, mood: t < 1.3 ? 'sparkle' : 'wide', look: [-1, 0.5], hops: [0.3, 1.3] })
      // the tiny note, held out between them
      note(x, 540 + 6 * Math.sin(t * 6), 980, 70, [{ text: '.', size: 12 }], { size: 12, rot: -0.1, pin: null })
      sparkles(x, t, 545, 970, 0.15, 6, 60, 1)
    },
    cues: [['pop', 0.15, 1318.51, 0.03, 0], ['pluck', 1.3, 587.33, 0.03, 0.6, 0.3]],
  },
  beats: [
    { dur: 5.5, head: 'The *itinerary:*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        const k = pop01(t, S.t0 + 0.1, 0.4, 2)
        x.save(); x.translate(540, 700); x.scale(k, k)
        note(x, 0, 0, 640, [
          { text: 'THE WEEKEND', size: 38 },
          { text: 'DAY 1: wake up.', size: 40, hide: u < 0.6 },
          { text: 'DAY 2: figure it out.', size: 40, hide: u < 1.5 },
        ], { rot: -0.03, lh: 1.6 })
        x.restore()
        const tip = ease.outBounce ? ease.outBounce(prog(u, 2.3, 2.9)) : ease.outCubic(prog(u, 2.3, 2.9))
        shadow(x, 780, 1215, 240)
        S.star(x, t, 'libra', { x: 780, y: 1080, s: 220, mood: u < 2.3 ? 'neutral' : 'wide', look: [-1, -1], hops: [S.t0 + 2.3, S.t0 + 3.0] })
        scale(x, 940, 1215, -tip, 0.8)
        shadow(x, 260, 1215, 200)
        S.host(x, t, { x: 260, y: 1090, s: 200, mood: 'sparkle', look: [1, -1], hops: [S.t0 + 0.6, S.t0 + 1.5] })
      },
      says: [{ at: 3.0, text: "that's… it?", x: 780, y: 935, who: 'libra', tail: 0 }],
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['tick', 0.6, 0.05], ['tick', 0.7, 0.04], ['tick', 1.5, 0.05], ['tick', 1.6, 0.04], ['tick', 2.35, 0.07], ['tom', 2.5, 110, { gain: 0.15, decay: 0.2 }], ['pluck', 3.0, 659.25, 0.03, 0.6, 0.3]],
    },
    { dur: 5.5, head: 'Libra *asks.*', accent: LIB,
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        shadow(x, 320, 1215, 240); shadow(x, 760, 1215, 260)
        S.host(x, t, { x: 320, y: 1030, s: 270, mood: u < 1.8 ? 'happy' : 'neutral', look: u < 1.8 ? [1, 0] : [0, 1], squash: u > 1.8 ? 0.05 : 0, hops: [S.t0 + 1.8] })
        S.star(x, t, 'libra', { x: 760, y: 1020, s: 280, mood: 'neutral', look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 0.9, S.t0 + 1.3] })
        note(x, 560, 1170, 70, [{ text: '.', size: 12 }], { size: 12, rot: 0.4, pin: null })
      },
      says: [{ at: 0.4, text: 'do you not want to plan with me?', x: 700, y: 760, who: 'libra', tail: 0.2, maxW: 560 }],
      pis: { x: 950, y: 1680, s: 125 },
      cues: [['pluck', 1.8, 440, 0.03, 0.8, -0.3]],
    },
    { dur: 7.4, head: 'Sag, *honestly:*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        glow(x, 540, 1000, 500, 0.12 * clamp(prog(u, 3.0, 4.0)))
        const close = ease.inOutCubic(prog(u, 3.4, 4.2))
        shadow(x, lerp(300, 380, close), 1215, 240); shadow(x, lerp(780, 700, close), 1215, 260)
        S.host(x, t, { x: lerp(300, 380, close), y: 1040, s: 260, mood: u < 3.0 ? 'neutral' : 'happy', look: u < 3.0 ? [0, 1] : [1, 0], hops: [S.t0 + 0.3, S.t0 + 0.8, S.t0 + 1.4, S.t0 + 4.2] })
        S.star(x, t, 'libra', { x: lerp(780, 700, close), y: 1030, s: 270, mood: u < 2.9 ? 'wide' : 'happy', look: [-1, 0], hops: [S.t0 + 2.9, S.t0 + 3.4, S.t0 + 4.2] })
        // the note flips and they write one plan together
        const nk = pop01(t, S.t0 + 4.6, 0.4, 2)
        if (nk > 0.01) {
          x.save(); x.translate(540, 760); x.scale(nk, nk)
          note(x, 0, 0, 600, [
            { text: 'OUR WEEKEND', size: 36 },
            { text: 'SAT: you pick.', size: 38, hide: u < 5.2 },
            { text: 'SUN: I pick.', size: 38, hide: u < 5.8 },
          ], { rot: 0.03, lh: 1.6, col: '#d9f5e6' })
          x.restore()
          hearts(x, t, S.t0 + 6.1, 540, 650, { n: 5 })
        }
      },
      says: [
        { at: 0.3, until: 4.5, text: "I don't plan because I'm scared it won't go right.", x: 360, y: 690, who: 'host', tail: -0.3, maxW: 560 },
        { at: 2.9, until: 4.5, text: "then let's figure it out together.", x: 700, y: 880, who: 'libra', tail: 0.1, maxW: 520 },
      ],
      pis: { x: 950, y: 1680, s: 130, tears: 3 },
      cues: [['whoosh', 4.5, 0.4, 0.03], ['pop', 4.6, 1174.66, 0.04, 0], ['tick', 5.2, 0.05], ['tick', 5.3, 0.04], ['tick', 5.8, 0.05], ['tick', 5.9, 0.04], ['bell', 6.1, 1760, 0.03, 1.0, 0]],
    },
  ],
  last: { who: 'stars', text: "Unplanned is fine. *Unsaid* isn't." },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 700, 1120, 230 * ok)
    S.host(x, t, { x: 420, y: 920, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, S.t0 + 2.8] })
    S.star(x, t, 'libra', { x: 690, y: 910, s: 250, pop: ok, mood: 'happy', look: [-1, 0], hops: [S.t0 + 0.25, S.t0 + 3.0] })
    x.save(); x.translate(555, 700); x.scale(ok, ok); note(x, 0, 0, 200, [{ text: 'SAT ✓', size: 26 }, { text: 'SUN ✓', size: 26 }], { rot: -0.06, col: '#d9f5e6' }); x.restore()
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [ink, BONE]
