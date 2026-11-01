// hxtortilla (30 s vertical, Star Talk Shows · TWO STARS DISAGREE, Houston edition) "Flour or corn?" · jazzy Bb.
// The set lives in ./debate.js (a local copy of sxdebatetext's, no numbers on screen, frame 0 is the thumbnail).
// Story 0–25.6, then the end card (default CTA).
//   hook   "Flour | or *corn?*"  ♉ TAURUS (FLOUR) vs ♏ SCORPIO (CORN). GONG.
//   v1     TAURUS: "flour. soft. warm. a *hug.*" (a steaming flour tortilla, a heart) · SCORPIO: "corn.
//          it has *depth.*" (a corn tortilla + a pixel ear of corn, lit like a portrait)
//   v2     "It's getting | *toasty.*"  TAURUS: "i’d *marry* a flour tortilla." (it gets a veil and a ring) · SCORPIO:
//          "corn, doubled. it *never* tears." (two corn tortillas stack, a DOUBLED ✓ stamp)
//   v3     card cut → "Final | *round.*"  TAURUS: "…i ate one of *yours.* yum." (a corn tortilla with a bite out,
//          a sweat drop) · SCORPIO: "i got flour *on the side.*" (a cloth basket, FLOUR on its tag). Pisces sobs.
//   turn   BIG GONG. "The stars | *interrupt.*"  THE STARS: "two tastes, *one* basket. *pass* it."
//   end    they bump, a heart. "Order *both.* | Share."  + "Which side are *you* on?"
//   rewatch Pisces dabs its tears with a little flour tortilla the whole time (it gets a corn one after the bump).
import { prog, ease, lerp } from '../../../src/lib.js'
import { makeDebate, DURATION, GOLD, INK, POS } from './debate.js'
import { drawPixelStar } from '../../sky.js'

export { DURATION }
export const KEY = 'Bb'
const CORN = ['..g..', '.gYg.', '.YyY.', '.yYy.', '.YyY.', '.yYy.', '.YyY.', 'GgYgG', 'GG.GG', '.G.G.']
const VEIL = ['..WW..', '.WwwW.', 'WwwwwW', 'Ww..wW', 'W....W']
const SWEAT = ['.s.', 'sSs', 'sSs', '.s.']
const STEAM = ['.w', 'w.', '.w', 'w.']
const FLOUR = { base: '#f3e2bc', edge: '#d9bf8a', spot: '#b0824a' }
const CORNT = { base: '#f0c64e', edge: '#c99a2a', spot: '#9a6a1c' }

// a pixel tortilla: a disc of cells with toasted spots (hash-placed, so it's the same every frame); bite = a bite angle
function tortilla(H, cx, cy, R, pal, { k = 1, c = 7, bite = null, squash = 1 } = {}) {
  if (k <= 0.01) return
  const { px } = H
  const r = R * k
  for (let j = -r; j < r; j += c) for (let i = -r; i < r; i += c) {
    const d = Math.hypot(i + c / 2, (j + c / 2) / squash)
    if (d > r) continue
    if (bite != null) { const bx = Math.cos(bite) * r, by = Math.sin(bite) * r; if (Math.hypot(i - bx, j - by) < r * 0.42) continue }
    const h = Math.abs(Math.sin((i * 12.9898 + j * 78.233) * 0.37)) * 1000 % 1
    let col = d > r - c ? INK : d > r - 2.2 * c ? pal.edge : h < 0.12 ? pal.spot : pal.base
    px(cx + i, cy + j, c, c, col)
  }
}

const cfg = {
  id: 'hxtortilla', key: KEY, accent: '#f3e2bc',
  signs: [{ id: 'taurus', name: 'TAURUS', stance: 'FLOUR' }, { id: 'scorpio', name: 'SCORPIO', stance: 'CORN' }],
  heads: {
    hook: 'Flour | or *corn?*',
    r2: 'It’s getting | *toasty.*',
    r3: 'Final | *round.*',
    stars: 'The stars | *interrupt.*',
    last: 'Order *both.* | Share.',
  },
  lines: [
    { who: 0, text: 'flour. soft. warm. a *hug.*', moods: ['happy', 'eyeroll'] },
    { who: 1, text: 'corn. it has *depth.*', moods: ['squint', 'wide'] },
    { who: 0, text: 'i’d *marry* a flour tortilla.', moods: ['heart', 'eyeroll'] },
    { who: 1, text: 'corn, doubled. it *never* tears.', moods: ['squint', 'wide'] },
    { who: 0, text: '…i ate one of *yours.* yum.', moods: ['wide', 'wide'] },
    { who: 1, text: 'i got flour *on the side.*', moods: ['happy', 'sparkle'] },
  ],
  star: 'two tastes, *one* basket. *pass* it.',
  props(x, t, H) {
    const { L, T, px, bits, txt, pop01, ok } = H
    const until = (i, end) => pop01(t, L[i].t - 0.05, 0.3, 2) * (1 - ease.inQuad(prog(t, end - 0.25, end))) * ok
    // v1 + v2: Taurus' flour tortilla, steaming (it gets a veil and a ring at the proposal)
    const kf = until(0, L[4].t - 0.05)
    if (kf > 0.01) {
      const bob = 8 * Math.sin(t * 3)
      tortilla(H, 104, 936 + bob, 62, FLOUR, { k: kf })
      for (let n = 0; n < 3; n++) {
        const p = (t * 0.7 + n / 3) % 1
        bits(STEAM, { w: '#efe6d6' }, 82 + n * 30, 850 + bob - p * 70, 6, { outline: null, alpha: kf * (1 - p) * 0.8 })
      }
      if (t < L[2].t) bits(['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, 112, 930 + bob, 8, { alpha: kf * pop01(t, L[0].t + 0.9, 0.3, 2.4) })
      const kv = pop01(t, L[2].t + 0.2, 0.35, 2.2)
      if (kv > 0.01) {
        bits(VEIL, { W: '#ffffff', w: '#e8e4f4' }, 112, 870 + bob, 11, { sy: kv, alpha: kf })
        // the ring, held up beside it
        const rx = 196, ry = 1000 + bob
        x.save(); x.globalAlpha = kf * kv
        px(rx - 14, ry - 14, 28, 6, '#f7c948'); px(rx - 14, ry + 8, 28, 6, '#f7c948'); px(rx - 14, ry - 14, 6, 28, '#f7c948'); px(rx + 8, ry - 14, 6, 28, '#f7c948')
        px(rx - 6, ry - 28, 12, 12, '#bfe6ff')
        x.restore()
        drawPixelStar(x, rx + 14, ry - 34, 18 + 4 * Math.sin(t * 9), 1, '#ffffff', '#bfe6ff')
      }
    }
    // v1: Scorpio's corn tortilla + an ear of corn, lit like a portrait
    const kc = until(1, L[3].t + 0.1)
    if (kc > 0.01) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.16 * kc
      x.fillStyle = '#f0c64e'; x.beginPath(); x.arc(968, 930, 120, 0, Math.PI * 2); x.fill(); x.restore()
      tortilla(H, 960, 960, 66, CORNT, { k: kc })
      bits(CORN, { g: '#7fd06a', G: '#4f9a3a', Y: '#f7d65a', y: '#e0a83c' }, 1010, 880, 9, { rot: 0.25, sx: kc, sy: kc })
      if (t > L[1].t + 0.9) txt('EST. LONG AGO', 966, 1060, { size: 16, color: GOLD, alpha: kc })
    }
    // v2: corn, doubled up (two tortillas stack; the stamp)
    const kd = until(3, L[5].t - 0.05)
    if (kd > 0.01) {
      const drop = ease.outBack(prog(t, L[3].t + 0.4, L[3].t + 0.75))
      tortilla(H, 966, 990, 66, CORNT, { k: kd, squash: 0.45 })
      tortilla(H, 966, lerp(880, 974, drop), 66, CORNT, { k: kd, squash: 0.45 })
      const ks = pop01(t, L[3].t + 1.1, 0.3, 2.6) * kd
      if (ks > 0.01) {
        x.save(); x.translate(966, 900); x.rotate(-0.12); x.scale(ks, ks)
        px(-96, -26, 192, 52, '#7dffb0'); px(-90, -20, 180, 40, '#13361f')
        x.restore()
        txt('DOUBLED ✓', 966, 900, { size: 24, color: '#7dffb0', alpha: ks })
      }
    }
    // v3: Taurus holds one of Scorpio's corn tortillas, a bite out of it, sweating
    const kb = until(4, T.stars + 0.1)
    if (kb > 0.01) {
      tortilla(H, 112, 940, 62, CORNT, { k: kb, bite: -0.6 })
      const tau = H.pos[0]
      if (tau && tau.size) { const p = (t * 1.6) % 1; bits(SWEAT, { s: '#8fd8ff', S: '#d8f2ff' }, tau.x + tau.size * 0.3, tau.y - tau.size * 0.3 + p * 30, 7, { alpha: kb * (1 - p * 0.6) }) }
      if (t > L[4].t + 0.7) txt('*crunch*', 112, 1030, { size: 18, color: GOLD, alpha: kb })
    }
    // v3: Scorpio's secret: a cloth-lined basket with FLOUR on the tag
    const kk = until(5, T.out[0])
    if (kk > 0.01) {
      const bx = t > T.bump ? lerp(966, 540, ease.inOutCubic(prog(t, T.bump - 0.4, T.bump + 0.2))) : 966
      const by = t > T.bump ? lerp(960, 1120, ease.inOutCubic(prog(t, T.bump - 0.4, T.bump + 0.2))) : 960
      x.save(); x.translate(bx, by); x.scale(kk, kk)
      tortilla(H, -10, -30, 52, FLOUR, { squash: 0.5 })
      if (t > T.bump) tortilla(H, 22, -36, 46, CORNT, { squash: 0.5 })
      px(-82, -24, 164, 70, INK); px(-76, -18, 152, 58, '#b8793a')
      for (let n = 0; n < 5; n++) px(-76 + n * 32, -18, 14, 58, '#9a5f2a')
      px(-86, -30, 172, 16, INK); px(-80, -26, 160, 8, '#ff6a6a'); for (let n = 0; n < 10; n++) px(-80 + n * 16, -26, 8, 8, '#ffffff')
      x.restore()
      txt(t > T.bump ? 'BOTH' : 'FLOUR', bx + 70 * kk, by + 52 * kk, { size: 18, color: INK, shadow: false, alpha: kk })
    }
  },
  // rewatch bait: Pisces dabs its tears with a flour tortilla, all episode (a corn one after the bump)
  front(x, t, H) {
    const { ok } = H
    const r = { x: 652, y: 1402 }
    const dab = Math.sin(t * 5) * 6
    tortilla(H, r.x + 52, r.y - 4 + dab, 22, t > H.T.bump + 0.4 ? CORNT : FLOUR, { c: 4, k: ok })
  },
  sobAt: [],
}
// Pisces sobs hardest at "flour on the side" (it's so thoughtful)
const deb0 = makeDebate(cfg)
cfg.sobAt = [deb0.L[5].t + 0.6]
cfg.cues = (T) => {
  const L = deb0.L
  return [
    ['whoosh', L[0].t + 0.1, 0.4, 0.02], ['pluck', L[0].t + 1.0, 1174.66, 0.03, 0.5, -0.3],
    ['bell', L[1].t + 0.2, 466.16, 0.025, 1.4, 0.3], ['whoosh', L[1].t + 0.3, 0.5, 0.02],
    ['pop', L[2].t + 0.25, 1396.91, 0.04, -0.3], ['glitter', L[2].t + 0.3, L[2].t + 0.8],
    ['tom', L[3].t + 0.7, 110, { gain: 0.16 }], ['snare', L[3].t + 1.1, { gain: 0.06, decay: 0.2, tone: 180 }],
    ['tick', L[4].t + 0.7, 0.05], ['tick', L[4].t + 0.78, 0.04], ['tick', L[4].t + 0.86, 0.035],
    ['whoosh', L[5].t + 0.05, 0.4, 0.03], ['bell', L[5].t + 0.4, 932.33, 0.02, 1.2, 0.3],
    ['whoosh', T.bump - 0.4, 0.5, 0.025],
  ]
}
const deb = makeDebate(cfg)
export const T = deb.T
export const SCENES = deb.SCENES
export const CUES = deb.CUES
export const CUTS = deb.CUTS
