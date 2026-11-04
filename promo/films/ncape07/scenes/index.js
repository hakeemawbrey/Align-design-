// ncape07: CAPRICORN SEASON TAKEOVER, ep 7, "Cap's Snow Day" (25 s vertical, music: screwed · Fm). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Cap's plans got | *snowed in.*"  Frame 0: Cap mid-stare out a frosty window, planner in hand.
//   2.6–7.1    "Nothing *to do.*"  Cap paces; every page of the planner says MOVED.
//   7.1–11.6   "Then: a *snowman?*"  AQUARIUS: "let's build a snowman."  Cap unrolls a blueprint.
//  11.6        card cut.
//  11.6–16.1   "The *results.*"  Cap's snowman: perfect. Aquarius's: lumpy and grinning. The photo: Cap keeps the lumpy
//              one. Pisces cries at the snowman.
//  16.1–20.6   CAP: "Best day I *didn't* plan."
import { makeTakeover, R, box, ink, floor, shadow, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD, RED } from '../../nsage01/scenes/takekit.js'

function snow(x, t, X0, Y0, w, h, n = 40) {
  x.save(); x.beginPath(); x.rect(X0, Y0, w, h); x.clip()
  for (let i = 0; i < n; i++) { const sx = X0 + ((i * 137) % w) + Math.sin(t + i) * 14, sy = Y0 + (((i * 71) % h) + t * (40 + (i % 5) * 12)) % h; R(x, '#ffffff', sx, sy, 8 + (i % 3) * 3, 8 + (i % 3) * 3) }
  x.restore()
}
function windowFrame(x, t, cx, cy, w, h) {
  R(x, '#9fc4e8', cx - w / 2, cy - h / 2, w, h)
  R(x, '#dfeefa', cx - w / 2, cy + h / 2 - 90, w, 90)
  snow(x, t, cx - w / 2, cy - h / 2, w, h)
  x.save(); x.globalAlpha = 0.35; R(x, '#ffffff', cx - w / 2, cy - h / 2, w, 30); R(x, '#ffffff', cx - w / 2, cy - h / 2, 30, h); x.restore()
  R(x, INK, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, 14); R(x, INK, cx - w / 2 - 14, cy + h / 2, w + 28, 14)
  R(x, INK, cx - w / 2 - 14, cy - h / 2, 14, h); R(x, INK, cx + w / 2, cy - h / 2, 14, h); R(x, INK, cx - 7, cy - h / 2, 14, h); R(x, INK, cx - w / 2, cy - 7, w, 14)
}
function planner(x, cx, cy, rot, page = '') { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -70, -90, 140, 180, '#2e5f5a', { b: 6 }); R(x, BONE, -58, -78, 116, 156); if (page) ink(x, page, 0, 0, { size: 24, col: RED, rot: -0.2 }); x.restore() }
function circ(x, cx, cy, r, col = '#ffffff') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
function snowmanPerfect(x, cx, by, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k)
  circ(x, 0, -90, 90); circ(x, 0, -240, 66); circ(x, 0, -350, 48)
  R(x, INK, -20, -362, 9, 9); R(x, INK, 11, -362, 9, 9); R(x, '#ff8a3a', -4, -350, 24, 9); R(x, INK, -4, -255, 9, 9); R(x, INK, -4, -225, 9, 9)
  R(x, INK, -36, -404, 72, 14); box(x, -26, -446, 52, 40, '#2e5f5a', { b: 4 })
  x.restore()
}
function snowmanLumpy(x, cx, by, k = 1, t = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, by); x.scale(k, k); x.rotate(0.06 * Math.sin(t))
  circ(x, -10, -80, 96); circ(x, 22, -100, 70); circ(x, 10, -230, 58); circ(x, -14, -320, 54)
  R(x, INK, -34, -334, 10, 10); R(x, INK, 4, -330, 10, 10); R(x, '#ff8a3a', -16, -318, 30, 10)
  for (let i = 0; i < 5; i++) R(x, INK, -38 + i * 12, -296 + (i === 0 || i === 4 ? -6 : 0), 8, 8)
  R(x, '#ff5c8a', -60, -280, 130, 18); R(x, '#ff5c8a', 40, -280, 18, 60)
  x.restore()
}
function blueprint(x, cx, cy, k) { if (k <= 0.01) return; x.save(); x.translate(cx, cy); x.scale(1, k); box(x, -260, -170, 520, 340, '#2f5fb0', { b: 6 }); for (let i = 1; i < 10; i++) R(x, 'rgba(255,255,255,0.18)', -260 + i * 52, -170, 2, 340); for (let j = 1; j < 7; j++) R(x, 'rgba(255,255,255,0.18)', -260, -170 + j * 48, 520, 2); x.strokeStyle = '#ffffff'; x.lineWidth = 4; for (const [y, r] of [[90, 60], [-10, 44], [-90, 32]]) { x.beginPath(); x.arc(0, y, r, 0, Math.PI * 2); x.stroke() } ink(x, 'r = 60', 140, 90, { size: 22, col: '#ffffff' }); ink(x, 'r = 44', 130, -10, { size: 22, col: '#ffffff' }); x.restore() }

const EP = makeTakeover({
  id: 'ncape07', host: 'cap', duration: 25, dy: 100,
  hook: {
    text: "Cap's plans got | *snowed in.*", dur: 2.6,
    draw(x, t, S) {
      floor(x, 1270)
      windowFrame(x, t, 600, 760, 520, 440)
      S.host(x, t, { x: 560, y: 1110, s: 260, mood: 'neutral', look: [0.5, -1], bob: 0 })
      planner(x, 300, 1140, -0.2)
    },
  },
  beats: [
    { dur: 4.5, head: 'Nothing *to do.*',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1270)
        windowFrame(x, t, 600, 700, 420, 340)
        const px = 540 + 280 * Math.sin(u * 2.4)
        S.host(x, t, { x: px, y: 1110, s: 240, mood: 'squint', look: [Math.cos(u * 2.4) > 0 ? 1 : -1, 0], hops: [0.4, 0.9, 1.4, 1.9, 2.4, 2.9, 3.4].map(v => S.t0 + v) })
        const pages = ['MOVED', 'MOVED', 'MOVED', 'MOVED?']
        planner(x, px - 150, 1150, -0.15, pages[Math.min(3, Math.floor(u / 1.0))])
      },
      pis: { x: 950, y: 1690, s: 115 },
      cues: [['tick', 0.4, 0.04], ['tick', 1.0, 0.05], ['tick', 2.0, 0.05], ['tick', 3.0, 0.05]],
    },
    { dur: 4.5, head: 'Then: a *snowman?*', accent: '#7fd0ff',
      draw(x, t, S) {
        const { u } = S
        floor(x, 1270)
        windowFrame(x, t, 600, 640, 380, 300)
        S.star(x, t, 'aquarius', { x: 830, y: 1100, s: 220, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 0.4, S.t0 + 0.8] })
        S.host(x, t, { x: 250, y: 1110, s: 220, mood: u < 1.8 ? 'wide' : 'happy', look: [1, 0], hops: [S.t0 + 1.8] })
        blueprint(x, 520, 880, pop01(t, S.t0 + 2.0, 0.4, 1.6))
      },
      says: [{ at: 0.4, until: 2.2, text: "let's build a snowman.", x: 800, y: 900, who: 'aquarius', tail: 0.2 }],
      pis: { x: 950, y: 1690, s: 125 },
      cues: [['whoosh', 2.0, 0.4, 0.04], ['tick', 2.3, 0.05]],
    },
    { dur: 4.5, head: 'The *results.*',
      draw(x, t, S) {
        const { u } = S
        // outside: snow ground
        R(x, 'rgba(150,180,220,0.18)', 0, 0, 1080, 1920)
        floor(x, 1270, '#dfeefa', '#ffffff')
        snow(x, t, 0, 300, 1080, 1000, 50)
        snowmanPerfect(x, 300, 1260, pop01(t, S.t0 + 0.2, 0.35, 1.8))
        snowmanLumpy(x, 760, 1260, pop01(t, S.t0 + 0.6, 0.35, 1.8), t)
        S.host(x, t, { x: 470, y: 1180, s: 150, mood: u < 2.4 ? 'happy' : 'sparkle', look: [1, -1], hops: [S.t0 + 2.4] })
        S.star(x, t, 'aquarius', { x: 930, y: 1180, s: 150, mood: 'happy', look: [-1, -1] })
        // the photo flash + frame around the lumpy one
        const f = t - (S.t0 + 2.2)
        if (f > 0 && f < 0.15) { x.save(); x.globalAlpha = 1 - f / 0.15; R(x, '#ffffff', 0, 0, 1080, 1920); x.restore() }
        if (f > 0.1) { const k = pop01(t, S.t0 + 2.3, 0.3, 2); x.save(); x.translate(760, 1040); x.scale(k, k); x.strokeStyle = GOLD; x.lineWidth = 10; x.strokeRect(-210, -280, 420, 440); x.restore(); ink(x, 'KEEP ✓', 760, 680, { size: 40, col: GOLD, font: 'Inter', weight: 800 }) }
      },
      pis: { x: 120, y: 1700, s: 130, tears: 3, look: [1, -0.6], noTissues: true },
      cues: [['pop', 0.2, 880, 0.04, -0.3], ['pop', 0.6, 659.25, 0.04, 0.3], ['tick', 2.2, 0.09], ['bell', 2.3, 1760, 0.03, 1.2, 0.3]],
    },
  ],
  last: { who: 'host', text: "Best day I *didn't* plan." },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok)
    S.host(x, t, { x: 400, y: 920, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    x.save(); x.translate(740, 900); x.rotate(0.06); x.scale(ok, ok)
    box(x, -150, -200, 300, 360, '#ffffff', { b: 6 }); R(x, '#9fc4e8', -130, -180, 260, 260); x.save(); x.beginPath(); x.rect(-130, -180, 260, 260); x.clip(); snowmanLumpy(x, 0, 80, 0.55, t); x.restore()
    x.restore()
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, sparkles, hearts, lerp, clamp, ease]
