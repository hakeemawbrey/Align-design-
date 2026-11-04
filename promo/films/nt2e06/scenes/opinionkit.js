// UNPOPULAR OPINION: the shared format of nt2e06–nt2e10 (Trends, Volume 2, format 2; rows in
// promo/films/next30/b11.md). 15 s: story 0–10.6, then the shared end card.
//   0.00–1.20   hook (frame 0): the "UNPOPULAR OPINION:" sticker and the opinion headline are already on; the sign
//               is mid-step onto a little crate; the crowd of three looks up.
//   1.20        the crowd GASPS (wide eyes, GASP! labels, a shake).
//   2.50 / 3.90 crowd members 1 and 2 come around ("…valid.").
//   5.30        the twist: member 3's reaction (cfg.twist draws it). The one card cut sits here.
//   7.00        THE STARS' stamp "POPULAR, *ACTUALLY.*"; THE STARS say the last line; the crowd cheers.
// Pisces watches from the side with tissues, crying harder at every beat (the running gag).
//   makeOpinion(cfg) → { DURATION, SCENES, CUES }
//     cfg.sign, cfg.opinion (popText, *accent*, | breaks), cfg.accent, cfg.prop(x, t, o) (props on the hero),
//     cfg.crowd [{ sign, text }, { sign, text }, { sign, text }], cfg.twist(x, t, S) optional, cfg.last
import { makeFilm, buildSticker, buildStamp, drawStampTool, stampCues, popText, starOf, pisces, tissues, sparkles, shadow, label, box, R, bubble, confetti,
  pop01, outK, popOut, prog, ease, lerp, clamp, talkHops, r3, GOLD, BONE, PINK, INK, RED, INTER, MONO, CPS } from '../../nt2e01/scenes/nt2kit.js'

export const T = { gasp: 1.2, r: [2.5, 3.9, 5.3], cut: 5.3, stampDrop: [6.7, 7.0], stamp: 7.0, starsIn: 7.15, last: 7.5, boxClose: 10.15, out: [10.15, 10.5] }
const CROWD_X = [230, 540, 850], CROWD_Y = 1250

export function makeOpinion(cfg) {
  const HERO = starOf(cfg.sign, 3, 1.1), STARS = starOf('stars', 2, 1.05)
  const crowd = cfg.crowd.map((c, i) => ({ ...c, S: starOf(c.sign, 10 + i) }))
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const CHEER = [T.stamp + 0.05, T.stamp + 0.45, T.stamp + 0.85]

  function crate(x) {
    shadow(x, 540, 1112, 360)
    box(x, 400, 990, 280, 120, '#a8724e', { b: 8, hi: '#c28a5e' })
    R(x, '#7b5634', 400, 1040, 280, 10); R(x, '#7b5634', 470, 990, 10, 120); R(x, '#7b5634', 600, 990, 10, 120)
  }
  function draw(x, t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    crate(x)
    // the hero: mid-step onto the crate at frame 0
    const o = { x: 540, y: 840, s: 260, mood: cfg.heroMood && cfg.heroMood(t) ? cfg.heroMood(t) : t < T.gasp ? 'sparkle' : t < T.stamp ? 'neutral' : 'happy', look: t < T.gasp ? [0, -0.2] : [0, 0.4], pop: ok,
      hops: [-0.15, 0.55, T.stamp + 0.05, T.stamp + 0.6, ...(cfg.heroHops || [])] }
    HERO(x, t, o)
    if (cfg.prop) cfg.prop(x, t, o)
    // the crowd
    crowd.forEach((c, i) => {
      const rt = T.r[i], came = t >= rt, twist = i === 2 && cfg.twist
      if (twist && t >= rt && t < T.stamp) return
      const gasp = t >= T.gasp && t < rt
      const mood = t >= T.stamp ? 'happy' : came ? (c.mood || 'happy') : gasp ? 'wide' : 'neutral'
      const shake = gasp && t < T.gasp + 0.4 ? 5 * Math.sin(t * 70) : 0
      c.S(x, t, { x: CROWD_X[i] + shake, y: CROWD_Y, s: 170, mood, look: [i === 0 ? 1 : i === 2 ? -1 : 0, -0.8], pop: ok, hops: [T.gasp, rt, ...CHEER.map(h => h + i * 0.1)] })
      if (t >= T.gasp && t < T.gasp + 0.9) label(x, 'GASP!', CROWD_X[i], 1100 - 30 * ease.outCubic(prog(t, T.gasp, T.gasp + 0.3)), { size: 36 * pop01(t, T.gasp + i * 0.06, 0.2, 2.5), col: GOLD, font: INTER, weight: 800, rot: [-0.15, 0.05, 0.15][i] })
      if (!twist || t < rt) bubble(x, t, clamp(CROWD_X[i], 220, 860), i === 1 ? 1470 : 1380, rt, T.stamp - 0.05, c.text, { size: 32, tail: 0, col: i === 2 ? '#c9f2d4' : BONE })
    })
    if (cfg.twist && t >= T.r[2] && t < T.stamp) cfg.twist(x, t, { u: t - T.r[2], t0: T.r[2], t1: T.stamp, S: crowd[2].S, X: CROWD_X[2], Y: CROWD_Y, HERO })
    // Pisces, with tissues, at the side
    const tears = t < T.gasp ? 1 : t < T.r[2] ? 2 : 3
    tissues(x, 70, 1560, 70 * ok)
    pisces(x, t, { x: 150, y: 1520, s: 130, pop: ok, hops: [T.gasp + 0.05, T.r[1] + 0.1, T.stamp + 0.1] }, tears, t < T.gasp ? 'wide' : 'happy', [1, -0.8])
    // finale
    if (t >= T.stamp) {
      confetti(x, t, T.stamp + 0.05, 540, 820)
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) STARS(x, t, { x: 880, y: 700, s: 150, mood: t > T.last + 1.2 ? 'happy' : 'neutral', look: [-1, 0.2], hops: STARS_HOPS, pop: sk })
    }
  }
  function top(tx, t) {
    drawStampTool(tx, t, { drop: T.stampDrop, ink: RED, y0: 330 })
    sparkles(tx, t, 540, 330, T.stamp + 0.02, 14, 430, 1, [GOLD, BONE, PINK])
  }
  function dom(root) {
    const st = buildSticker(root, { text: 'UNPOPULAR OPINION:', at: -1, out: [T.stamp - 0.25, T.stamp - 0.05], tilt: -2.5, top: 150, size: 46, bg: GOLD })
    const H = popText(root, cfg.opinion, { top: 290, size: 70, accentSize: 96, at: -1, gap: 0, accentColor: cfg.accent || GOLD, fit: true })
    const stamp = buildStamp(root, { html: 'POPULAR, *ACTUALLY.*', at: T.stamp, out: T.out, ink: '#ff5c7a', size: 96, top: 200 })
    return [st, { update: t => H.update(t, outK(t, [T.stamp - 0.25, T.stamp - 0.05])) }, stamp]
  }
  const CUES = [
    ['pop', 0.0, 987.77, 0.03, 0], ['tom', 0.6, 120, { gain: 0.16, decay: 0.15 }],
    ['whoosh', r3(T.gasp - 0.1), 0.2, 0.03], ['boom', T.gasp, 0.16], ['tick', T.gasp, 0.07], ['pop', r3(T.gasp + 0.02), 1567.98, 0.04, -0.3], ['pop', r3(T.gasp + 0.08), 1760, 0.035, 0.3],
    ['pop', T.r[0], 880, 0.04, -0.4], ['pluck', r3(T.r[0] + 0.05), 1174.66, 0.03, -0.4, 0],
    ['pop', T.r[1], 987.77, 0.04, 0], ['pluck', r3(T.r[1] + 0.05), 1318.51, 0.03, 0, 0],
    ['pop', T.r[2], 1174.66, 0.045, 0.4], ['glitter', T.r[2], r3(T.r[2] + 0.4)],
    ...(cfg.twistCues || []).map(c => [c[0], r3(c[1] + T.r[2]), ...c.slice(2)]),
    ...stampCues(T.stampDrop[0], T.stamp),
    ['clap', r3(T.stamp + 0.1), { gain: 0.12, pan: -0.3 }], ['clap', r3(T.stamp + 0.45), { gain: 0.12, pan: 0.3 }], ['clap', r3(T.stamp + 0.8), { gain: 0.12 }],
    ['pop', T.starsIn + 0.05, 739.99, 0.035, 0.4],
    ['whoosh', T.out[0], 0.3, 0.03],
  ]
  return makeFilm({ duration: 15, bug: ['UNPOPULAR', 'OPINION'], segs: [[0, T.gasp], [T.gasp, T.r[2]], [T.r[2], T.stamp], [T.stamp, T.boxClose]],
    lines: LINES, boxY: 1420, boxOpen: T.last - 0.22, boxClose: T.boxClose, out: T.out, flashes: [T.gasp, T.stamp], shakes: [T.gasp, T.stamp],
    cuts: [{ t: T.cut, kind: 'flip' }], draw, top, dom, cues: CUES })
}
export * from '../../nt2e01/scenes/nt2kit.js'
void [MONO, lerp]
