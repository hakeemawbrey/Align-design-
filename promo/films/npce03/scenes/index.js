// npce03: PISCES CRIES ABOUT… "a dog in a sweater." (12 s vertical trial reel, promo/films/next30/b48.md,
// music: chiptune · D). Story 0–9.6, then the shared end card. The format lives in ../../npce01/scenes/criekit.js.
//   0.0       hook: a pixel dog in a striped sweater trots in from the right; Pisces watches, already welling up.
//   1.3       the dog stops and wags.  2.75 sticker "it has a *pocket.*" (the little pocket gets a POCKET tag).
//   3.8       the dog trots over and sits right next to Pisces.  4.4 fountains.
//   5.6       flash cut. THE STARS: "Delight is allowed to be this big."
import { makeCry, box, R, shadow, glow, label, sparkles, hearts, pop01, prog, lerp, ease, INK, BONE, GOLD, PINK } from '../../npce01/scenes/criekit.js'

const FUR = '#c98a4b', FUR_D = '#8a5a2e', SW = '#d8434e'
// the dog (facing left), feet on y = g, centred on cx; walk 0…1 phase, wag speed
export function dog(x, t, cx, g, { walk = 0, wag = 6, sit = 0, sc = 1, pocketTag = 0 } = {}) {
  x.save(); x.translate(cx, g); x.scale(sc, sc)
  const bob = walk ? Math.abs(Math.sin(walk * Math.PI * 2)) * 6 : 0
  // legs
  const legs = [[-70, 0], [-40, 0.5], [50, 0.25], [80, 0.75]]
  for (const [lx, ph] of legs) {
    const sw = walk ? Math.sin((walk + ph) * Math.PI * 2) * 12 : 0
    const back = lx > 0
    const lh = back && sit ? 22 : 58
    R(x, INK, lx - 13 + sw, -lh - 4, 26, lh + 4); R(x, FUR, lx - 9 + sw, -lh, 18, lh - 4); R(x, FUR_D, lx - 9 + sw, -10, 18, 6)
  }
  x.translate(0, -bob - (sit ? -18 : 0)); x.rotate(sit ? -0.18 : 0)
  // tail
  x.save(); x.translate(108, -96); x.rotate(-0.6 + 0.5 * Math.sin(t * wag)); R(x, INK, -8, -60, 18, 64); R(x, FUR, -4, -56, 10, 56); x.restore()
  // body in a sweater
  box(x, -100, -128, 210, 76, SW, { b: 6 })
  for (let i = 0; i < 4; i++) R(x, BONE, -84 + i * 52, -128, 18, 76)
  R(x, '#a92f3a', -100, -60, 210, 8)
  box(x, 20, -104, 44, 36, '#b8323e', { b: 4 }); R(x, BONE, 20, -104, 44, 6)          // the pocket
  // head
  box(x, -168, -196, 90, 82, FUR, { b: 6 })
  box(x, -204, -150, 46, 38, FUR, { b: 5 })                                              // snout
  R(x, INK, -214, -152, 18, 16)                                                           // nose
  R(x, INK, -142, -172, 14, 16); R(x, '#ffffff', -140, -170, 5, 5)                        // eye
  x.save(); x.translate(-100, -192); x.rotate(0.25 + 0.08 * Math.sin(t * 5)); box(x, -14, 0, 30, 62, FUR_D, { b: 5 }); x.restore()   // ear
  R(x, '#ff7d95', -196, -116, 14, 14 + 6 * Math.abs(Math.sin(t * 7)))                     // tongue
  x.restore()
  if (pocketTag > 0.01) {
    x.save(); x.translate(cx + 42 * sc, g - 200 * sc); x.scale(pocketTag, pocketTag)
    box(x, -90, -34, 180, 56, GOLD, { b: 5 }); x.font = `700 30px 'Space Mono', monospace`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('POCKET', 0, -6)
    R(x, INK, -6, 22, 12, 40 + 6 * Math.sin(t * 6)); x.restore()
  }
}

const EP = makeCry({
  id: 'npce03', topic: 'a dog in a sweater', accent: '#ff9aa6', deep: '#d8434e',
  sticker: 'it has a *pocket.*', peak: 4.4,
  tissues: [1.35, 2.8, 3.3, 4.4, 4.65, 4.9],
  scene(x, t, S) {
    glow(x, 540, 1100, 600, 0.35)
    R(x, '#231c3c', 0, 1180, 1080, 160); R(x, '#2e2650', 0, 1180, 1080, 10)
    // the dog: trots in (0–1.3), stops, then trots to Pisces (3.4–3.8) and sits
    const a = ease.outCubic(prog(t, 0, 1.3)), b = ease.inOutCubic(prog(t, 3.3, 3.85))
    const cx = lerp(lerp(860, 700, a), 540, b)
    const walk = (t < 1.3 || (t > 3.3 && t < 3.85)) ? t * 2.2 : 0
    const tag = pop01(t, 2.85, 0.3, 2.4) * (1 - ease.inQuad(prog(t, 3.25, 3.4)))
    shadow(x, cx, 1188, 280)
    // Pisces (left), turning toward the dog
    shadow(x, 230, 1190, 220)
    S.pis(x, t, { x: 240, y: 1010, s: 260, mood: t < 1.3 ? 'wide' : 'sparkle', look: [1, 0.3], hops: [1.35, 2.82, 3.9, 4.42, 4.8] })
    dog(x, t, cx, 1180, { walk, wag: t > 1.3 ? 18 : 8, sit: t > 3.85 ? 1 : 0, sc: 1.1, pocketTag: tag })
    if (t > 3.85) hearts(x, t, 3.9, 360, 900, { n: 6 })
    sparkles(x, t, 600, 1020, 2.8, 8, 120, 0.2, [GOLD, BONE, PINK])
  },
  finale(x, t, { ok }) { if (ok > 0.01) { x.save(); x.globalAlpha = ok; dog(x, t, 520, 1330, { sit: 1, wag: 18, sc: 0.75 }); x.restore() } },
  last: 'Delight is allowed to be this big.',
  cues: [['tick', 0.2, 0.03], ['tick', 0.45, 0.03], ['tick', 0.7, 0.03], ['tick', 0.95, 0.03], ['pop', 1.35, 1318.51, 0.035, 0.3], ['pop', 2.87, 1567.98, 0.04, 0.1],
    ['tick', 3.45, 0.03], ['tick', 3.65, 0.03], ['pop', 3.88, 987.77, 0.04, -0.2]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void label
