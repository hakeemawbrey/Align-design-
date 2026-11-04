// WHAT THEY SAID vs WHAT THEY MEANT: the shared format of Trends Vol. 2 eps 31–35 (nt2e31–nt2e35), on
// ../../nt2e21/scenes/trendkit.js. A split screen: the top panel "WHAT THEY SAID" (the sign, cool and casual, with a
// speech bubble); the bottom panel "WHAT THEY MEANT" (the same sign, honest, with a subtitle sticker and a prop). The
// bottom panel "translates…" for a beat, then reveals. Pair 3 (the twist, under the one card cut): both panels say the
// same thing and a "✓ SAME" stamp lands across the seam. Finale: the sign and its person, THE STARS' last line,
// Pisces with a card, fountaining (Pisces sniffles in the top panel's corner all through).
//
// 18 s (slate 20 s) · story 0–15.6 · then the 2.4 s short end card. No card-back cut: the old cut time is a white flash.
//   0.00–2.10  hook (on screen at t = 0): "What <a sign> *says* | vs what they *mean.*" + the sign mid-action.
//   2.10–5.10  pair 1 · 5.10–8.10 pair 2 · 8.10–11.40 pair 3 (card cut 8.1) · 11.4 finale · 12.0 last line.
//
//   makeSaid(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign, cfg.date, cfg.deep, cfg.accent, cfg.hookDraw(x, t, S), cfg.hookMood
//     cfg.pairs: 3 × { said, meant, saidMood, meantMood, saidDraw(x, t, S), meantDraw(x, t, S), cues }
//     cfg.last, cfg.pisCard, cfg.corner / cfg.finPis (false: no background Pisces, for a Pisces-led episode)
import {
  makeFilm, buildSticker, star, pisces, tissues, theStars, heldCard, at, R, box, label, shadow, sparkles, hearts,
  bubble, pop01, outK, popOut, prog, lerp, clamp, ease, r3, talkHops, NAMES, article, GOLD, BONE, INK, PINK, GREEN,
  INTER, MONO, CPS,
} from '../../nt2e21/scenes/trendkit.js'

export const DURATION = 20   // the slate length; the film itself is 2.0 s shorter (short end card, CHANGE 4 Nov, see trendkit.js makeFilm)
export const T = {
  hookOut: [1.95, 2.1],
  pairs: [[2.1, 5.1], [5.1, 8.1], [8.1, 11.4]],
  cut: 8.1, said: 0.25, meant: 1.15, same: 1.95,
  fin: 11.4, starsIn: 11.55, last: 12.0, pisIn: 11.65, card: 12.45, boxClose: 15.1, out: [15.1, 15.5],
}
const SEAM = 950
function chip(x, text, X, Y, col) {
  x.font = `800 30px ${INTER}`; const w = x.measureText(text).width + 40
  box(x, X, Y, w, 52, col, { b: 5 })
  x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, X + 20, Y + 28)
}
function panels(x, t, k = 1) {
  x.save(); x.globalAlpha *= k
  R(x, 'rgba(20,40,90,0.35)', 0, 0, 1080, SEAM); R(x, 'rgba(90,20,60,0.32)', 0, SEAM, 1080, 1920 - SEAM)
  R(x, INK, 0, SEAM - 8, 1080, 16); R(x, BONE, 0, SEAM - 2, 1080, 4)
  chip(x, 'WHAT THEY SAID', 56, 140, '#9fd8f6')
  chip(x, 'WHAT THEY MEANT', 56, SEAM + 30, '#ffb3cf')
  // floors
  R(x, 'rgba(10,6,24,0.45)', 0, 800, 1080, SEAM - 808); R(x, 'rgba(10,6,24,0.45)', 0, 1600, 1080, 320)
  x.restore()
}
function sameStamp(x, t, t0, t1) {
  if (t < t0 || t > t1) return
  const p = prog(t, t0, t0 + 0.12), o = outK(t, [t1 - 0.15, t1])
  const sc = lerp(1.7, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - t0) * 8) * Math.sin((t - t0) * 40)) * o
  x.save(); x.translate(720, SEAM); x.rotate(-0.1); x.scale(sc, sc); x.globalAlpha *= clamp(p * 2)
  x.font = `800 84px ${INTER}`; const w = x.measureText('✓ SAME').width + 60
  box(x, -w / 2, -56, w, 112, GREEN, { b: 9, hi: 'rgba(255,255,255,0.3)' })
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('✓ SAME', 0, 6)
  x.restore()
}

export function makeSaid(cfg) {
  const HERO = cfg.sign, DATE = cfg.date
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const P = T.pairs
  const hero = (x, t, o) => star(x, t, HERO, { seed: 3, glow: 1.1, ...o })
  const date = (x, t, o) => star(x, t, DATE, { seed: 7, ...o })

  function paint(x, t) {
    if (t < P[0][0]) {
      R(x, '#1e1838', 0, 1250, 1080, 670); R(x, '#2c2450', 0, 1250, 1080, 10)
      shadow(x, 540, 1250, 300)
      const o = { x: 540, y: 1080, s: 380, mood: cfg.hookMood || 'neutral', look: [1, -0.4], hops: [0.4, 1.2] }
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, o, under: true })
      hero(x, t, o)
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, o, under: false })
      if (cfg.corner !== false) { tissues(x, 822, 1685, 74); pisces(x, t, { x: 925, y: 1640, s: 150 }, 2, 'wide', [-1, -0.8]) }
      return
    }
    for (let i = 0; i < 3; i++) {
      const [a, b] = P[i]
      if (t < a || t >= b) continue
      const u = t - a, pr = cfg.pairs[i]
      const punch = 1 + 0.05 * (1 - ease.outCubic(prog(u, 0, 0.28)))
      x.save(); x.translate(540, 960); x.scale(punch, punch); x.translate(-540, -960)
      panels(x, t)
      // SAID
      const so = { x: 300, y: 650, s: 270, mood: pr.saidMood || 'neutral', look: pr.saidLook || [1, -0.3], hops: [a + T.said + 0.05, a + T.said + 0.6] }
      shadow(x, 300, 800, 240)
      const S = { u, a, b, i, hero, date, so }
      if (pr.saidDraw) pr.saidDraw(x, t, { ...S, under: true })
      hero(x, t, so)
      if (pr.saidDraw) pr.saidDraw(x, t, { ...S, under: false })
      bubble(x, t, 690, 420, a + T.said, b - 0.05, `“${pr.said}”`, { size: pr.saidSize || 36, tail: -0.5 })
      // MEANT
      const mk = pop01(t, a + T.meant, 0.35, 2.2)
      if (u < T.meant) {
        const dots = '.'.repeat(1 + Math.floor((u * 6) % 3))
        label(x, `translating${dots}`, 540, 1290, { size: 40, col: 'rgba(255,209,222,0.85)', font: MONO })
      } else {
        const mo = { x: 300, y: 1450, s: 270, pop: mk, mood: pr.meantMood || 'sparkle', look: pr.meantLook || [1, -0.3], hops: [a + T.meant + 0.3, a + T.meant + 0.9], blush: i < 2 ? 1 : undefined }
        shadow(x, 300, 1600, 240 * mk)
        const M = { ...S, mo, mk }
        if (pr.meantDraw) pr.meantDraw(x, t, { ...M, under: true })
        hero(x, t, mo)
        if (pr.meantDraw) pr.meantDraw(x, t, { ...M, under: false })
        if (i < 2) hearts(x, t, a + T.meant + 0.4, 300, 1300, { n: 4, cell: 5 })
      }
      x.restore()
      // Pisces sniffles in the top panel's corner
      const pk = pop01(t, a + 0.3, 0.3, 2) * outK(t, [b - 0.15, b])
      if (pk > 0.01 && cfg.corner !== false) { tissues(x, 880, 900, 56 * Math.min(1, pk)); pisces(x, t, { x: 970, y: 860, s: 120, pop: pk }, i === 2 ? 3 : 2, u > T.meant ? 'sparkle' : 'wide', [-1, 0.3]) }
      if (i === 2) { sameStamp(x, t, a + T.same, b); sparkles(x, t, 720, SEAM, a + T.same + 0.02, 12, 260, 1, [GOLD, BONE, GREEN]) }
    }
    if (t >= T.fin && t <= T.out[1]) {
      const ok = popOut(t, T.out)
      R(x, '#1e1838', 0, 1150, 1080, 770); R(x, '#2c2450', 0, 1150, 1080, 10)
      shadow(x, 420, 1150, 240 * ok); shadow(x, 690, 1150, 210 * ok)
      hero(x, t, { x: 420, y: 1000, s: 280, pop: ok, mood: 'happy', look: [1, 0], hops: [T.fin + 0.1, T.fin + 0.6, T.last + 1.6] })
      date(x, t, { x: 700, y: 1015, s: 230, pop: ok, mood: 'heart', look: [-1, 0], hops: [T.fin + 0.2, T.last + 1.8] })
      hearts(x, t, T.fin + 0.3, 560, 860, { n: 6 })
      if (cfg.finaleDraw) cfg.finaleDraw(x, t, { ok, hero, date })
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) theStars(x, t, { x: 170, y: 1235, s: 150, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk })
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01 && cfg.finPis !== false) {
        const F = pisces(x, t, { x: 925, y: 1235, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.card + 0.02] }, t > T.card ? 3 : 2, 'sparkle', [-1, -1])
        heldCard(x, t, 925, F.cy - 150, pop01(t, T.card, 0.3, 2.6) * ok, cfg.pisCard || 'SAID IT!', { size: 38 })
      }
    }
  }

  return makeFilm({
    id: cfg.id, duration: DURATION,
    bug: { main: 'WHAT THEY SAID', dim: 'VS MEANT' },
    hook: { text: `What ${article(HERO)} ${NAMES[HERO]} *says* | vs what they *mean.*`, color: cfg.accent, out: T.hookOut, size: 76, accentSize: 108 },
    paint,
    dom(root) {
      return cfg.pairs.map((pr, i) => buildSticker(root, { text: pr.meant, deep: cfg.deep, at: P[i][0] + T.meant + 0.1, out: [P[i][1] - 0.15, P[i][1]], tilt: [1.4, -1.2, 1.0][i], top: 1640, size: 44, maxW: 900, bg: i === 2 ? '#d9f7e4' : BONE }))
    },
    lines: LINES, box: { open: T.last - 0.22, close: T.boxClose, y: 1440, h: 270 },
    flashes: [P[0][0], P[1][0]],
    cuts: [{ t: T.cut, kind: 'flip' }],
    cues: [
      ['pop', 0.4, 987.77, 0.035, 0], ['pop', 1.2, 1174.66, 0.03, 0.2],
      ...cfg.pairs.flatMap((pr, i) => {
        const a = P[i][0]
        return [
          ['pop', r3(a + T.said), 880, 0.04, -0.3], ['pop', r3(a + T.said + 0.07), 1174.66, 0.03, -0.3],
          ['tick', r3(a + 0.55), 0.02], ['tick', r3(a + 0.75), 0.02], ['tick', r3(a + 0.95), 0.02],
          ['whoosh', r3(a + T.meant - 0.12), 0.25, 0.03], ['pop', r3(a + T.meant), 1318.51, 0.045, 0.3], ['pluck', r3(a + T.meant + 0.12), 1567.98, 0.035, 0.5, 0.3],
          ...(i === 2 ? [['boom', r3(a + T.same), 0.25], ['tom', r3(a + T.same), 140, { gain: 0.28, decay: 0.3 }], ['bell', r3(a + T.same + 0.08), 1760, 0.035, 1.2, 0], ['glitter', r3(a + T.same), r3(a + T.same + 0.5)]] : []),
          ...at(a, pr.cues),
        ]
      }),
      ['whoosh', T.fin - 0.05, 0.3, 0.03], ['pluck', r3(T.fin + 0.3), 1174.66, 0.04, 0.5, 0], ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
      ['pop', T.card, 1318.51, 0.045, 0.4], ['glitter', T.card, r3(T.card + 0.3)],
    ],
  })
}
void [lerp, PINK]
