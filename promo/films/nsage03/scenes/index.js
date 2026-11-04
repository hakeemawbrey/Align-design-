// nsage03: SAG SEASON TAKEOVER, ep 3, "Honest to a Fault" (23 s vertical, music: lofi · Am). promo/films/next30/b10.md.
// Story 0–20.6, then the short (2.4 s) end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag, *be honest:* | how do I look?"  Frame 0: Leo mid-spin in a giant sparkly jacket; Sag watching.
//   2.6–7.6    "Sag is *always* | honest."  SAG: "the jacket is… a lot."  Record scratch. LEO: "A LOT??"
//   7.6–11.8   "Pisces *can't* | watch."  Pisces peeks through its fingers, crying. PISCES: "I can't watch. I'm watching."
//  11.8–16.1   "Honest *and* kind."  SAG: "and you look SO happy in it. wear it."  Leo glows; the jacket sparkles more.
//  16.1–20.6   Sag and Leo side by side. SAG: "Truth, with a *hug* attached."  Pisces fountains.
import { makeTakeover, R, floor, shadow, glow, sparkles, hearts, drawPixelStar, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

// the giant sparkly jacket: shoulder pads + lapels drawn over a star at (cx, cy, s); sp = extra sparkle 0…1
function jacket(x, t, cx, cy, s, sp = 0, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  for (const d of [-1, 1]) {
    const px = d * s * 0.27, py = s * 0.24, w = s * 0.24, h = s * 0.15
    R(x, INK, px - w / 2 - 6, py - h / 2 - 6, w + 12, h + 12)
    R(x, '#ff5fa2', px - w / 2, py - h / 2, w, h)
    R(x, '#ff9cc8', px - w / 2, py - h / 2, w, h * 0.3)
    for (let i = 0; i < 6 + Math.round(sp * 6); i++) {
      const on = Math.sin(t * 7 + i * 1.9 + d) > 0.2
      if (on) R(x, i % 2 ? GOLD : '#fff', px - w / 2 + ((i * 37) % 100) / 100 * w, py - h / 2 + ((i * 53) % 100) / 100 * h, 7, 7)
    }
  }
  x.restore()
  if (sp > 0) for (let i = 0; i < 5; i++) { const a = t * 1.5 + i * 1.26; if (Math.sin(t * 5 + i) > 0) drawPixelStar(x, cx + Math.cos(a) * s * 0.7, cy - s * 0.1 + Math.sin(a) * s * 0.5, 22, 2, i % 2 ? GOLD : '#fff') }
}
// a disco-ish spotlight floor circle
function spot(x, cx, by, w, a) { x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = `rgba(255,236,180,${0.2 * a})`; x.beginPath(); x.ellipse(cx, by, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill(); x.restore() }

const LEO_HOOK = { x: 650, y: 1000, s: 320 }

const EP = makeTakeover({
  id: 'nsage03', host: 'sag', duration: 25, dy: 200,
  hook: {
    text: 'Sag, *be honest:* | how do I look?', dur: 2.6, accent: '#f39a3a',
    draw(x, t, S) {
      floor(x, 1220)
      spot(x, 650, 1210, 420, 1)
      glow(x, 650, 950, 420, 0.14)
      const spin = t < 1.1 ? Math.sin(t * 14) * 0.18 * (1 - t / 1.1) : 0
      shadow(x, 650, 1215, 300)
      S.star(x, t, 'leo', { ...LEO_HOOK, mood: t < 1.1 ? 'happy' : 'sparkle', look: [-1, 0], squash: t < 1.1 ? 0.08 * Math.sin(t * 14) : 0, hops: [1.1, 1.6] })
      jacket(x, t, 650 + spin * 200, 1000, 320, 0, spin)
      shadow(x, 220, 1215, 190)
      S.host(x, t, { x: 220, y: 1070, s: 200, mood: 'neutral', look: [1, 0], hops: [1.9] })
    },
    cues: [['whoosh', 0, 0.5, 0.04], ['whoosh', 0.45, 0.4, 0.03], ['glitter', 0.1, 0.8]],
  },
  beats: [
    { dur: 5.0, head: 'Sag is *always* | honest.',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        spot(x, 700, 1210, 380, 1)
        shadow(x, 300, 1215, 230)
        S.host(x, t, { x: 300, y: 1040, s: 260, mood: u < 1.5 ? 'neutral' : 'squint', look: [1, 0], hops: [S.t0 + 0.6, S.t0 + 1.0] })
        const lm = u < 1.5 ? 'sparkle' : 'wide'
        const sq = u > 1.5 && u < 1.8 ? -0.14 : 0
        shadow(x, 740, 1215, 260)
        S.star(x, t, 'leo', { x: 740, y: 1020, s: 280, mood: lm, look: [-1, 0], squash: sq, hops: [S.t0 + 1.5, S.t0 + 2.5, S.t0 + 2.8] })
        jacket(x, t, 740, 1020, 280, 0)
      },
      says: [
        { at: 0.55, text: 'the jacket is… a lot.', x: 330, y: 790, who: 'host', tail: -0.2 },
        { at: 2.45, text: 'A LOT??', x: 760, y: 720, who: 'leo', tail: 0, size: 48, col: '#ffe0b8' },
      ],
      pis: { x: 950, y: 1670, s: 120 },
      cues: [['whoosh', 1.5, 0.18, 0.06], ['tick', 1.5, 0.08], ['tick', 1.56, 0.06], ['tick', 1.62, 0.05], ['pop', 2.45, 1567.98, 0.05, 0.3]],
    },
    { dur: 4.2, head: 'Pisces *can’t* | watch.', pis: false,
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        // Sag and Leo frozen small in the back
        S.host(x, t, { x: 230, y: 1130, s: 140, mood: 'neutral', look: [1, 0], bob: 0 })
        S.star(x, t, 'leo', { x: 850, y: 1130, s: 150, mood: 'wide', look: [-1, 0], bob: 0 })
        jacket(x, t, 850, 1130, 150, 0)
        // Pisces up close, peeking through its "fingers"
        const F = S.pisces(x, t, { x: 540, y: 1020, s: 340, hops: [S.t0 + 0.3, S.t0 + 1.6] }, 3, 'wide', [0, 0])
        const peek = 0.5 + 0.5 * Math.sin(u * 4)
        for (const d of [-1, 1]) for (let i = 0; i < 3; i++) R(x, '#9fb7ff', 540 + d * (60 + peek * 30) + i * 22 * d - 9, F.cy - 40, 18, 70)
      },
      says: [{ at: 0.9, text: "I can't watch. I'm watching.", x: 540, y: 690, who: 'pisces', tail: 0 }],
      cues: [['pluck', 0.3, 659.25, 0.03, 0.6, 0], ['pluck', 0.5, 587.33, 0.03, 0.6, 0]],
    },
    { dur: 4.3, head: 'Honest *and* kind.',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1220)
        const shine = clamp(prog(u, 2.0, 2.6))
        spot(x, 720, 1210, 380 + 120 * shine, 1 + shine)
        glow(x, 720, 980, 460, 0.22 * shine)
        shadow(x, 300, 1215, 230)
        S.host(x, t, { x: 300, y: 1040, s: 260, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8, S.t0 + 1.2] })
        shadow(x, 740, 1215, 260)
        S.star(x, t, 'leo', { x: 740, y: 1020, s: 280, mood: u < 2.0 ? 'wide' : 'sparkle', look: [-1, 0], hops: [S.t0 + 2.0, S.t0 + 2.4, S.t0 + 3.0] })
        jacket(x, t, 740, 1020, 280, shine)
        sparkles(x, t, 740, 980, S.t0 + 2.05, 12, 220, 1)
      },
      says: [{ at: 0.35, text: 'and you look SO happy in it. wear it.', x: 360, y: 760, who: 'host', tail: -0.2, maxW: 560 }],
      pis: { x: 950, y: 1670, s: 130, tears: 3 },
      cues: [['bell', 2.05, 1760, 0.035, 1.2, 0.3], ['glitter', 2.05, 2.6], ['pluck', 2.4, 1318.51, 0.04, 0.5, 0.3]],
    },
  ],
  last: { who: 'host', text: 'Truth, with a *hug* attached.' },
  finale(x, t, S) {
    const { ok, u } = S
    const lean = ease.inOutCubic(prog(u, 0.2, 0.7))
    shadow(x, 420, 1120, 220 * ok); shadow(x, 680, 1120, 240 * ok)
    S.host(x, t, { x: lerp(380, 440, lean), y: 920, s: 260, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    S.star(x, t, 'leo', { x: lerp(720, 660, lean), y: 910, s: 260, pop: ok, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.75, S.t0 + 2.8] })
    jacket(x, t, lerp(720, 660, lean), 910, 260 * ok, 1)
    hearts(x, t, S.t0 + 0.8, 550, 760, { n: 6 })
  },
  finalePis: { x: 940, y: 1250, s: 140 },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [BONE, pop01]
