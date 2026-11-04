// nsage05: SAG SEASON TAKEOVER, ep 5, "Sag Says It First" (25 s vertical, music: funk · G). promo/films/next30/b10.md.
// Story 0–20.6, then the shared end card. Shared look: ../../nsage01/scenes/takekit.js.
//   0.0–2.6    hook "Sag at the café: | *'I like you.'*"  Frame 0: Sag mid-blurt at the café counter; Aquarius frozen
//              holding a tray; Virgo the barista behind the counter.
//   2.6–7.1    "The whole café | *freezes.*"  Virgo drops the milk; everyone goes wide-eyed. VIRGO: "…oh no. oh YES."
//   7.1–11.6   "And then:"  AQUARIUS: "…I like you too."  Hearts.
//  11.6        card cut.
//  11.6–16.1   "One *small* | detail."  The tray: three muffins. AQUARIUS: "also you ordered three muffins."  SAG: "I panicked."
//  16.1–20.6   SAG: "Say it *first.* Order fewer muffins."  Pisces fountains.
import { makeTakeover, R, box, floor, shadow, glow, sparkles, hearts, drawBits, mug, prog, lerp, clamp, ease, pop01, INK, BONE, GOLD } from '../../nsage01/scenes/takekit.js'

const AQ = '#5fc8ff'
const MUFFIN = ['..CCCC..', '.CCCCCC.', 'CCBCCBCC', 'CCCCCCCC', '.WWWWWW.', '.WPWPWP.', '..WWWW..']
function muffin(x, cx, cy, s = 1) { drawBits(x, MUFFIN, { C: '#7a4a2a', B: '#3b1f45', W: '#f2b8c6', P: '#e88aa6' }, cx, cy, 9 * s) }
function tray(x, cx, cy, n, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -130, 0, 260, 18, '#c9c3dd', { b: 5 })
  for (let i = 0; i < n; i++) muffin(x, -80 + i * 80, -34, 1)
  x.restore()
}
function counter(x) {
  floor(x, 1250)
  box(x, 620, 1020, 420, 70, '#8a5a3a', { b: 7, hi: '#a87048' })
  box(x, 640, 1096, 380, 150, '#6b4630', { b: 6 })
  // a pastry case
  box(x, 680, 930, 260, 84, 'rgba(191,232,255,0.35)', { b: 6 })
  muffin(x, 730, 980, 0.7); muffin(x, 810, 980, 0.7); muffin(x, 890, 980, 0.7)
}
function cafeBack(x) {
  glow(x, 540, 640, 560, 0.14)
  box(x, 120, 480, 300, 170, '#2a2148', { b: 6 })
  for (let i = 0; i < 4; i++) R(x, BONE, 150, 515 + i * 32, 200 - (i % 2) * 60, 10)
}
function milk(x, cx, cy, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -30, -50, 60, 100, '#f4f1ea', { b: 5 }); R(x, '#5fb8ff', -30, -10, 60, 24); x.restore() }

const EP = makeTakeover({
  id: 'nsage05', host: 'sag', duration: 25, dy: 150,
  hook: {
    text: "Sag at the café: | *'I like you.'*", dur: 2.6,
    draw(x, t, S) {
      cafeBack(x)
      S.star(x, t, 'virgo', { x: 830, y: 850, s: 190, mood: 'wide', look: [-1, 0], bob: 0 })
      counter(x)
      S.host(x, t, { x: 220, y: 1110, s: 280, mood: 'wide', look: [1, 0], squash: -0.1, hops: [0.05] })
      S.star(x, t, 'aquarius', { x: 480, y: 1120, s: 230, mood: 'wide', look: [-1, -0.5], bob: 0 })
      tray(x, 600, 1060, 3, 0.8)
    },
    cues: [['pop', 0.05, 1567.98, 0.05, -0.3]],
  },
  beats: [
    { dur: 4.5, head: 'The whole café | *freezes.*',
      draw(x, t, S) {
        const { u } = S
        cafeBack(x)
        const drop = ease.inCubic(prog(u, 0.5, 1.0))
        S.star(x, t, 'virgo', { x: 830, y: 850, s: 190, mood: u < 2.0 ? 'wide' : 'sparkle', look: [-1, 0], bob: 0, hops: [S.t0 + 2.0, S.t0 + 2.4] })
        if (u < 1.05) milk(x, 900, lerp(850, 990, drop), drop * 2)
        counter(x)
        if (u > 1.0) { const k = clamp(1 - (u - 1.0) * 1.5); for (let i = 0; i < 6; i++) R(x, '#f4f1ea', 900 + Math.cos(i) * 60 * (1 - k) - 6, 1010 - Math.abs(Math.sin(i * 2)) * 70 * (1 - k) - 6, 12, 12) }
        S.host(x, t, { x: 220, y: 1110, s: 270, mood: 'wide', look: [1, 0], bob: 0 })
        S.star(x, t, 'aquarius', { x: 480, y: 1120, s: 230, mood: 'wide', look: [-1, -0.5], bob: 0 })
        tray(x, 600, 1060, 3, 0.8)
        // the freeze-frame sticker
        if (u > 0.2 && u < 1.9) { x.save(); x.translate(540, 470); x.rotate(-0.06); box(x, -130, -36, 260, 72, '#ffffff', { b: 6 }); x.font = `800 44px Inter`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('❚❚ PAUSE', 0, 2); x.restore() }
      },
      says: [{ at: 2.0, text: '…oh no. oh YES.', x: 820, y: 680, who: 'virgo', tail: 0 }],
      pis: { x: 960, y: 1690, s: 115 },
      cues: [['tick', 0.2, 0.06], ['whoosh', 0.5, 0.4, 0.03], ['tom', 1.0, 140, { gain: 0.15, decay: 0.15 }], ['tick', 1.02, 0.07]],
    },
    { dur: 4.5, head: 'And *then:*',
      draw(x, t, S) {
        const { u } = S
        cafeBack(x)
        S.star(x, t, 'virgo', { x: 830, y: 850, s: 190, mood: 'heart', look: [-1, 0] })
        counter(x)
        S.host(x, t, { x: 220, y: 1110, s: 270, mood: u < 1.2 ? 'wide' : 'heart', look: [1, 0.5], hops: [S.t0 + 1.2, S.t0 + 1.6] })
        S.star(x, t, 'aquarius', { x: 480, y: 1120, s: 230, mood: u < 0.3 ? 'wide' : 'happy', look: [-1, -0.5], hops: [S.t0 + 0.4, S.t0 + 0.8] })
        tray(x, 600, 1060, 3, 0.8)
        hearts(x, t, S.t0 + 1.2, 420, 900, { n: 7 })
      },
      says: [{ at: 0.35, text: '…I like you too.', x: 560, y: 880, who: 'aquarius', tail: 0, col: '#dff3ff' }],
      pis: { x: 960, y: 1690, s: 125, tears: 2 },
      cues: [['pluck', 1.2, 1174.66, 0.04, 0.6, -0.2], ['pluck', 1.35, 1567.98, 0.035, 0.6, -0.2]],
    },
    { dur: 4.5, head: 'One *small* | detail.',
      draw(x, t, S) {
        const { u } = S
        cafeBack(x)
        counter(x)
        S.host(x, t, { x: 220, y: 1110, s: 270, mood: u < 2.4 ? 'happy' : 'squint', look: [1, 0.6], hops: [S.t0 + 2.4] })
        S.star(x, t, 'aquarius', { x: 480, y: 1120, s: 230, mood: 'happy', look: [0, -1], hops: [S.t0 + 0.4] })
        // the tray, up close
        const z = ease.inOutCubic(prog(u, 0.1, 0.5))
        tray(x, lerp(600, 560, z), lerp(1060, 690, z), 3, lerp(0.8, 1.9, z))
        for (let i = 0; i < 3; i++) { const k = pop01(t, S.t0 + 0.6 + i * 0.25, 0.25, 2.5); if (k > 0.01) { x.save(); x.font = '800 54px Inter'; x.fillStyle = GOLD; x.textAlign = 'center'; x.globalAlpha = clamp(k); x.fillText(String(i + 1), lerp(560, 560, z) - 152 + i * 152, 520); x.restore() } }
      },
      says: [
        { at: 1.2, text: 'also you ordered three muffins.', x: 640, y: 880, who: 'aquarius', tail: 0, col: '#dff3ff', size: 34 },
        { at: 2.6, text: 'I panicked.', x: 200, y: 900, who: 'host', tail: 0 },
      ],
      pis: { x: 960, y: 1690, s: 130, tears: 3 },
      cues: [['whoosh', 0.1, 0.3, 0.03], ['pop', 0.6, 880, 0.04, -0.3], ['pop', 0.85, 987.77, 0.04, 0], ['pop', 1.1, 1174.66, 0.04, 0.3], ['pluck', 2.6, 523.25, 0.03, 0.6, -0.3]],
    },
  ],
  last: { who: 'host', text: 'Say it *first.* Order fewer muffins.' },
  finale(x, t, S) {
    const { ok } = S
    shadow(x, 420, 1120, 220 * ok); shadow(x, 690, 1120, 220 * ok)
    S.host(x, t, { x: 410, y: 920, s: 250, pop: ok, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.1, ...S.LAST_HOPS] })
    S.star(x, t, 'aquarius', { x: 690, y: 920, s: 240, pop: ok, mood: 'heart', look: [-1, 0], hops: [S.t0 + 0.3, S.t0 + 3.0] })
    tray(x, 550, 760, 3, 0.9 * ok)
  },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [sparkles, mug, AQ]
