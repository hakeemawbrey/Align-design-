// SOFT LAUNCH vs HARD LAUNCH: the shared format of nt2e11–nt2e15 (Trends, Volume 2, format 3; rows in
// promo/films/next30/b11.md). A sign "launches" a feeling (not a post). 20 s: story 0–15.6, then the end card.
//   0.00–2.10   hook (frame 0): top caption "<Sign>: *<topic>*", the split screen "SOFT LAUNCH | HARD LAUNCH" is on,
//               the sign mid-hop in front of the seam.
//   2.10–5.60   the soft launch plays in the left panel (the right one dims), with a caption sticker.
//   5.60–9.10   the hard launch plays in the right panel (the left one dims), with a caption sticker.
//   9.10–12.60  the twist: the panels slide apart (the one card cut) and the honest version plays full width,
//               sticker "THE REAL LAUNCH:".
//   12.60–15.1  THE STARS say the last line. Pisces cries in a panel corner, then beside the box.
//   makeLaunch(cfg) → { DURATION, SCENES, CUES }
//     cfg.sign, cfg.topic, cfg.accent, cfg.hook(x, t), cfg.soft { caption, draw(x, t, S), cues }, cfg.hard {…},
//     cfg.real { caption, draw(x, t, S), cues }, cfg.last
import { makeFilm, buildSticker, popText, starOf, pisces, tissues, sparkles, shadow, label, box, R, bubble, confetti,
  pop01, outK, popOut, prog, ease, lerp, clamp, talkHops, r3, GOLD, BONE, PINK, INK, RED, LAV, INTER, CPS } from '../../nt2e01/scenes/nt2kit.js'

export const T = { soft: [2.1, 5.6], hard: [5.6, 9.1], real: [9.1, 12.6], cut: 9.1, last: 12.75, starsIn: 12.6, boxClose: 15.1, out: [15.1, 15.5] }
export const PANEL = { y0: 330, y1: 1290, L: [30, 530], R: [550, 1050] }
const SOFT_COL = '#c9a6ff', HARD_COL = '#ff5c7a'

function panel(x, [a, b], { title, col, dim, slide = 0 }) {
  const w = b - a, X = a + slide
  x.save()
  box(x, X, PANEL.y0, w, PANEL.y1 - PANEL.y0, 'rgba(20,12,44,0.55)', { b: 6 })
  R(x, col, X, PANEL.y0, w, 64)
  x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.save(); x.letterSpacing = '4px'; x.fillText(title, X + w / 2, PANEL.y0 + 34); x.restore()
  if (dim > 0) { x.globalAlpha = 0.55 * dim; R(x, '#05040c', X, PANEL.y0 + 64, w, PANEL.y1 - PANEL.y0 - 64) }
  x.restore()
}
function clipPanel(x, [a, b], fn) { x.save(); x.beginPath(); x.rect(a, PANEL.y0 + 64, b - a, PANEL.y1 - PANEL.y0 - 64); x.clip(); fn(); x.restore() }

export function makeLaunch(cfg) {
  const HERO = starOf(cfg.sign, 3, 1.1), STARS = starOf('stars', 2, 1.05)
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const ctx = { HERO, PANEL }

  function draw(x, t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const apart = ease.inOutCubic(prog(t, T.real[0], T.real[0] + 0.45))
    if (apart < 1) {
      const dimL = t >= T.hard[0] ? 1 : 0, dimR = t >= T.soft[0] && t < T.hard[0] ? 1 : 0
      panel(x, PANEL.L, { title: 'SOFT LAUNCH', col: SOFT_COL, dim: dimL, slide: -700 * apart })
      panel(x, PANEL.R, { title: 'HARD LAUNCH', col: HARD_COL, dim: dimR, slide: 700 * apart })
      // the panel scenes
      if (t >= T.soft[0] && t < T.real[0]) clipPanel(x, PANEL.L, () => cfg.soft.draw(x, t, { ...ctx, u: t - T.soft[0], t0: T.soft[0], t1: T.soft[1], cx: 280, live: t < T.soft[1] }))
      if (t >= T.hard[0] && t < T.real[0]) clipPanel(x, PANEL.R, () => cfg.hard.draw(x, t, { ...ctx, u: t - T.hard[0], t0: T.hard[0], t1: T.hard[1], cx: 800, live: true }))
      if (t >= T.soft[0] && t < T.real[0]) {
        const inR = t >= T.hard[0]
        const P = inR ? { x: 450, y: 1215 } : { x: 960, y: 1215 }
        pisces(x, t, { ...P, s: 110, hops: [T.soft[0] + 1.6, T.hard[0] + 1.6] }, inR ? 3 : 2, 'wide', [inR ? 1 : -1, -0.6])
      }
    }
    // hook (frame 0): the hero in front of the seam
    if (t < T.soft[0]) {
      shadow(x, 540, 1180, 300)
      HERO(x, t, { x: 540, y: 960, s: 290, mood: 'sparkle', look: [0, 0], hops: [-0.2, 0.6, 1.4] })
      if (cfg.hook) cfg.hook(x, t, ctx)
      label(x, '?', 280, 820, { size: 120, col: SOFT_COL, font: INTER, weight: 800 }); label(x, '!', 800, 820, { size: 120, col: HARD_COL, font: INTER, weight: 800 })
    }
    // the twist: full width
    if (t >= T.real[0]) {
      x.save(); x.globalAlpha = clamp(prog(t, T.real[0] + 0.2, T.real[0] + 0.5)) * ok
      cfg.real.draw(x, t, { ...ctx, u: t - T.real[0], t0: T.real[0], t1: T.out[1], ok })
      x.restore()
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) STARS(x, t, { x: 170, y: 1270, s: 140, mood: t > T.last + 1.2 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk })
      const pk = pop01(t, T.real[0] + 0.6, 0.3, 2.2) * ok
      if (pk > 0.01) { tissues(x, 830, 1300, 60 * pk); pisces(x, t, { x: 930, y: 1260, s: 130, pop: pk, hops: [T.real[0] + 1.6, T.last + 0.4] }, 3, 'happy', [-1, -0.8]) }
    }
  }
  function dom(root) {
    const H = popText(root, `${cfg.name}: *${cfg.topic}*`, { top: 160, size: 70, accentSize: 96, at: -1, gap: 0, accentColor: cfg.accent || GOLD, fit: true })
    const st = [
      buildSticker(root, { text: cfg.hookSticker || 'soft or *hard?*', at: -1, out: [T.soft[0] - 0.18, T.soft[0]], tilt: -2, top: 1340, deep: '#c0284a', size: 52, accentSize: 66 }),
      buildSticker(root, { text: cfg.soft.caption, at: T.soft[0] + 0.3, out: [T.soft[1] - 0.18, T.soft[1]], tilt: -1.8, top: 1330, deep: '#6b3fb0', size: 46, accentSize: 58 }),
      buildSticker(root, { text: cfg.hard.caption, at: T.hard[0] + 0.3, out: [T.hard[1] - 0.18, T.hard[1]], tilt: 1.6, top: 1330, deep: '#c0284a', size: 46, accentSize: 58 }),
      buildSticker(root, { text: 'THE *REAL* LAUNCH:', at: T.real[0] + 0.35, out: [T.out[0], T.out[1]], tilt: -2.2, top: 300, bg: GOLD, deep: '#8a2a5a', size: 44, accentSize: 56 }),
    ]
    return [{ update: t => H.update(t, outK(t, [T.real[0] - 0.1, T.real[0] + 0.15])) }, ...st]
  }
  const rel = (list, a) => (list || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)])
  const CUES = [
    ['pop', 0.6, 880, 0.03, 0], ['pop', 1.4, 987.77, 0.03, 0],
    ['whoosh', r3(T.soft[0] - 0.08), 0.28, 0.035], ['tick', T.soft[0], 0.05], ['pop', r3(T.soft[0] + 0.3), 1174.66, 0.04, -0.4],
    ['whoosh', r3(T.hard[0] - 0.08), 0.28, 0.035], ['tick', T.hard[0], 0.05], ['pop', r3(T.hard[0] + 0.3), 1318.51, 0.045, 0.4], ['boom', r3(T.hard[0] + 0.02), 0.12],
    ['whoosh', T.real[0], 0.45, 0.04], ['pop', r3(T.real[0] + 0.35), 1567.98, 0.045, 0], ['glitter', r3(T.real[0] + 0.35), r3(T.real[0] + 0.8)],
    ...rel(cfg.soft.cues, T.soft[0]), ...rel(cfg.hard.cues, T.hard[0]), ...rel(cfg.real.cues, T.real[0]),
    ['pop', r3(T.starsIn + 0.05), 739.99, 0.035, -0.4],
    ['whoosh', T.out[0], 0.35, 0.03],
  ]
  return makeFilm({ duration: 20, bug: ['SOFT LAUNCH', 'VS HARD LAUNCH'], segs: [T.soft, T.hard, T.real, [T.real[1], T.boxClose]],
    lines: LINES, boxY: 1420, boxOpen: T.last - 0.22, boxClose: T.boxClose, out: T.out, flashes: [T.soft[0], T.hard[0]], shakes: [T.hard[0]],
    cuts: [{ t: T.cut, kind: 'flip' }], draw, dom, cues: CUES })
}
export * from '../../nt2e01/scenes/nt2kit.js'
void [sparkles, confetti, bubble, LAV, PINK, BONE, RED, lerp]
