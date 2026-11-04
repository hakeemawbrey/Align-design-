// THINGS THAT JUST MAKE SENSE: the shared format of nt2e01–nt2e05 (Trends, Volume 2, format 1; rows in
// promo/films/next30/b11.md). 20 s: story 0–15.6, then the shared end card.
//   0.00–2.10   hook: the top caption "Things that just *make sense*: | <topic>" is fully on at frame 0, the first
//               sign is already mid-hop with its prop (cfg.hook draws the thumbnail scene).
//   2.10–11.30  three "equations" (sign + thing = ✓), each a jump cut with a numbered caption sticker; a green check
//               slaps on with a chime. The third is the twist (tender). The one card cut sits under the third (7.9).
//   11.35       THE STARS' stamp "MAKES *SENSE.*"; THE STARS say the last line; Pisces nods, crying, with a SO TRUE card.
// Pisces cries in the background of every equation (the running gag).
//   makeSense(cfg) → { DURATION, SCENES, CUES }
//     cfg.topic, cfg.accent, cfg.deep, cfg.hook(x, t, S), cfg.eqs [{ caption, sign, draw(x, t, S), check: [x, y], cues, pis }] × 3
//     cfg.last, cfg.finale(x, t, S) optional
import { makeFilm, buildSticker, buildStamp, drawStampTool, stampCues, popText, starOf, pisces, tissues, checkMark, sparkles, shadow, label, box, R,
  pop01, outK, popOut, prog, ease, lerp, clamp, wordPops, talkHops, drawStarChar, STAR, r3, GOLD, BONE, PINK, INK, RED, GREEN, INTER, CPS } from './nt2kit.js'

export const T = {
  eqs: [[2.1, 5.0], [5.0, 7.9], [7.9, 11.3]], cut: 7.9, checkAt: 1.55,
  stampDrop: [11.0, 11.32], stamp: 11.35, starsIn: 11.5, pisIn: 11.6, card: 12.4, last: 11.95, boxClose: 15.1, out: [15.1, 15.5],
}

export function makeSense(cfg) {
  const STARS = starOf('stars', 2, 1.05)
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const PIS_DEF = { x: 930, y: 1660, s: 130 }
  const stars = { STARS }

  function draw(x, t) {
    // hook (frame 0 = thumbnail): the scene is already in motion
    if (t < T.eqs[0][0]) cfg.hook(x, t, { k: 1 })
    cfg.eqs.forEach((q, i) => {
      const [a, b0] = T.eqs[i], b = i === 2 ? T.stamp : b0
      if (t < a || t >= b) return
      const punch = 1 + 0.07 * (1 - ease.outCubic(prog(t, a, a + 0.28)))
      x.save(); x.translate(540, 900); x.scale(punch, punch); x.translate(-540, -900)
      q.draw(x, t, { u: t - a, t0: a, t1: b, i })
      x.restore()
      const [cx, cy] = q.check || [860, 560]
      checkMark(x, t, cx, cy, a + T.checkAt, { s: 1.15, rot: [-0.14, 0.1, -0.06][i] })
      sparkles(x, t, cx, cy, a + T.checkAt + 0.02, 8, 120, i, [GREEN, BONE, GOLD])
      const P = { ...PIS_DEF, ...(q.pis || {}) }
      const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
      if (pk > 0.01 && !q.noPis) {
        tissues(x, P.x - P.s * 0.72, P.y + P.s * 0.25, P.s * 0.5 * Math.min(1, pk))
        pisces(x, t, { ...P, pop: pk, hops: [a + T.checkAt + 0.05] }, i === 2 ? 3 : 2, t > a + T.checkAt ? 'happy' : 'wide', [-1, -0.6])
      }
    })
    // finale
    if (t >= T.stamp && t < T.out[1]) {
      const ok = popOut(t, T.out)
      if (cfg.finale) cfg.finale(x, t, { ok })
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) STARS(x, t, { x: 190, y: 1220, s: 170, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk })
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = pisces(x, t, { x: 890, y: 1225, s: 160, pop: pk, hops: [T.pisIn + 0.3, T.card + 0.02, T.card + 0.6, T.card + 1.2] }, 3, 'happy', [-1, -1])
        const ck = pop01(t, T.card, 0.3, 2.6) * ok
        if (ck > 0.01) {
          x.save(); x.translate(894, F.cy - 150 - 8 * Math.sin(t * 5)); x.rotate(0.08 * Math.sin(t * 4)); x.scale(ck, ck)
          box(x, -110, -50, 220, 100, BONE, { b: 6 }); R(x, INK, -6, 50, 12, 70)
          x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2f9e5c'; x.fillText('SO TRUE', 0, 4)
          x.restore()
        }
      }
    }
  }
  function top(tx, t) {
    drawStampTool(tx, t, { drop: T.stampDrop, ink: '#2f9e5c' })
    sparkles(tx, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GREEN, BONE, GOLD])
  }
  function dom(root) {
    const H0 = popText(root, `Things that just *make sense:* | ${cfg.topic}`, { top: 158, size: 74, accentSize: 104, at: -1, gap: 0.0, accentColor: cfg.accent || GOLD, fit: true })
    const stickers = cfg.eqs.map((q, i) => buildSticker(root, { n: i + 1, text: q.caption, deep: cfg.deep, badge: i === 2 ? PINK : (cfg.badge || GOLD), at: T.eqs[i][0] + 0.3, out: [T.eqs[i][1] - 0.18, T.eqs[i][1]], tilt: [-2.0, 1.6, -1.2][i] }))
    const stamp = buildStamp(root, { html: 'MAKES *SENSE.*', at: T.stamp, out: T.out, ink: '#3fbf72', size: 120 })
    return [{ update: t => H0.update(t, outK(t, [10.85, 11.05])) }, ...stickers, stamp]
  }
  const CUES = [
    ...cfg.eqs.flatMap((q, i) => {
      const a = T.eqs[i][0], st = a + 0.3, c = a + T.checkAt
      return [
        ['whoosh', r3(a - 0.08), 0.28, 0.035], ['tick', a, 0.05],
        ['pop', r3(st), 1174.66, 0.045, 0.1], ['pop', r3(st + 0.07), 1567.98, 0.03, -0.1],
        ['pop', r3(c), 1318.51, 0.05, 0.3], ['bell', r3(c + 0.03), 1760, 0.035, 1.0, 0.3], ['glitter', r3(c), r3(c + 0.4)],
        ['pluck', r3(a + 0.3), 2349.32, 0.012, 0.3, 0.6],
        ...(q.cues || []).map(cc => [cc[0], r3(cc[1] + a), ...cc.slice(2)]),
      ]
    }),
    ...(cfg.hookCues || []),
    ...stampCues(T.stampDrop[0], T.stamp),
    ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
    ['pop', T.card, 1318.51, 0.045, 0.4], ['pop', r3(T.card + 0.08), 1760, 0.035, 0.4], ['glitter', T.card, r3(T.card + 0.3)],
    ['whoosh', T.out[0], 0.35, 0.03],
  ]
  void stars
  return makeFilm({ duration: 20, bug: ['THINGS THAT', 'JUST MAKE SENSE'], segs: [[0, 2.1], ...T.eqs.map(([a, b]) => [a, b]), [11.3, 15.1]].slice(1),
    lines: LINES, boxY: 1420, boxOpen: T.last - 0.22, boxClose: T.boxClose, out: T.out, flashes: [T.eqs[0][0], T.eqs[1][0], T.stamp], shakes: [T.stamp],
    cuts: [{ t: T.cut, kind: 'flip' }], draw, top, dom, cues: CUES })
}
export * from './nt2kit.js'
void [label, shadow, lerp, clamp, drawStarChar, STAR, wordPops, RED]
