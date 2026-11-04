// nt2e12: SOFT LAUNCH vs HARD LAUNCH: meet the family (20 s vertical, Trends Vol. 2 format 3; row in
// promo/films/next30/b11.md; music house · Bb). Format look: ../../nt2e11/scenes/launchkit.js.
//   0.0        hook (frame 0): "Cancer: *meet the family*", the split screen, Cancer mid-step with a casserole.
//   2.1        SOFT: Cancer slips an extra plate onto the table: "it's for… a friend."
//   5.6        HARD: a name card with a big heart on it, propped by the plate, a spotlight on it.
//   9.1        card cut · THE REAL LAUNCH: Cancer walks in to set the plate… Mom (Taurus) already set it, and the
//              chair has a cushion: "we've been ready since you mentioned them."
//   12.75      THE STARS: "Family sets the table *early*."
import { makeLaunch, starOf, box, R, bubble, label, hearts, shadow, sparkles, spotlight, drawBits, HEART, pop01, prog, ease, lerp, INK, BONE, GOLD, PINK, INTER } from '../../nt2e11/scenes/launchkit.js'

const CAN = starOf('cancer', 3, 1.1), MOM = starOf('taurus', 9)

function casserole(x, cx, cy, t) {
  box(x, cx - 70, cy - 30, 140, 60, '#e8344e', { b: 6, hi: '#ff6b7f' }); R(x, INK, cx - 90, cy - 16, 20, 12); R(x, INK, cx + 70, cy - 16, 20, 12)
  for (let s = 0; s < 3; s++) { const p = ((t * 0.8 + s / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, cx - 24 + s * 20 + Math.sin(t * 3 + s) * 5, cy - 50 - p * 70, 7, 16); x.restore() }
}
function table(x, cx, w) { box(x, cx - w / 2, 1080, w, 36, '#8a5a3c', { b: 6, hi: '#a8724e' }); R(x, INK, cx - w / 2 + 20, 1116, 16, 120); R(x, INK, cx + w / 2 - 36, 1116, 16, 120) }
function plate(x, cx, k = 1) { if (k <= 0.01) return; x.save(); x.translate(cx, 1072); x.scale(k, k); box(x, -56, -10, 112, 18, '#eef0f8', { b: 5 }); R(x, '#cfd3e4', -30, -10, 60, 6); x.restore() }
function nameCard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -90, -56, 180, 112, BONE, { b: 6 })
  drawBits(x, HEART, { H: '#ff5c8a' }, 0, -14, 7)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('RESERVED', 0, 34)
  x.restore()
}
function chair(x, cx, cushion) {
  box(x, cx - 50, 940, 100, 140, '#6b4a2f', { b: 6 }); R(x, INK, cx - 50, 1080, 14, 120); R(x, INK, cx + 36, 1080, 14, 120)
  if (cushion > 0.01) { x.save(); x.translate(cx, 1060); x.scale(cushion, cushion); box(x, -60, -20, 120, 34, PINK, { b: 5, hi: '#ffc0d2' }); x.restore() }
}

const EP = makeLaunch({
  id: 'nt2e12', sign: 'cancer', name: 'Cancer', topic: 'meet the family', accent: '#3fb6f0',
  hook(x, t) { casserole(x, 760, 960 - 8 * Math.sin(t * 5), t) },
  soft: { caption: 'soft: *an extra plate* “for a friend”',
    draw(x, t, S) {
      table(x, 280, 440); plate(x, 160); plate(x, 280)
      const slide = ease.outCubic(prog(S.u, 0.4, 0.9))
      plate(x, lerp(560, 400, slide))
      CAN(x, t, { x: 330, y: 900, s: 160, mood: S.u < 1 ? 'squint' : 'happy', look: [1, 0.3], hops: [S.t0 + 0.9] })
      bubble(x, t, 280, 660, S.t0 + 1.2, S.t1, 'it’s for… a friend.', { size: 30 })
    },
    cues: [['whoosh', 0.4, 0.3, 0.02], ['tick', 0.9, 0.05], ['pop', 1.2, 880, 0.03, -0.4]] },
  hard: { caption: 'hard: *a name card* with a heart',
    draw(x, t, S) {
      table(x, 800, 440); plate(x, 700); plate(x, 900)
      spotlight(x, 900, 400, 900, 1080, 220, pop01(t, S.t0 + 0.8, 0.3, 1.5))
      nameCard(x, 900, 990, pop01(t, S.t0 + 0.4, 0.3, 2.6))
      sparkles(x, t, 900, 990, S.t0 + 0.45, 8, 120, 1)
      CAN(x, t, { x: 690, y: 900, s: 160, mood: 'sparkle', look: [1, 0.3], hops: [S.t0 + 0.4, S.t0 + 1.2] })
      bubble(x, t, 760, 660, S.t0 + 1.4, S.t1, 'subtle, right?', { size: 30 })
    },
    cues: [['pop', 0.4, 1318.51, 0.045, 0.4], ['glitter', 0.45, 0.9], ['boom', 0.8, 0.1], ['pop', 1.4, 1174.66, 0.03, 0.4]] },
  real: { caption: '',
    draw(x, t, S) {
      table(x, 540, 820)
      ;[220, 400, 640, 880].forEach(p => plate(x, p))
      chair(x, 880, pop01(t, S.t0 + 1.0, 0.3, 2.4))
      MOM(x, t, { x: 640, y: 900, s: 190, mood: 'happy', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 2.2] })
      CAN(x, t, { x: 300, y: 900, s: 190, mood: S.u < 1.4 ? 'wide' : 'heart', look: [1, 0], hops: [S.t0 + 1.4], blush: S.u > 1.4 ? 1 : 0 })
      label(x, '(already set)', 880, 1180, { size: 26, col: GOLD, alpha: S.u > 0.6 ? 1 : 0 })
      bubble(x, t, 660, 650, S.t0 + 1.2, S.t1, 'we set it when you first|mentioned them.'.replace('|', ' '), { size: 28 })
      hearts(x, t, S.t0 + 1.5, 300, 760, { n: 6 })
    },
    cues: [['pop', 0.6, 880, 0.03, 0.3], ['pop', 1.0, 1318.51, 0.04, 0.3], ['pluck', 1.2, 1174.66, 0.035, 0.3, 0.3], ['pluck', 1.5, 1567.98, 0.035, -0.3, 0.3]] },
  last: 'Family sets the table *early*.',
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, GOLD]
