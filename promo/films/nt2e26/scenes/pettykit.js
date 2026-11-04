// PETTY OR VALID: the shared format of Trends Vol. 2 eps 26–30 (nt2e26–nt2e30), on ../../nt2e21/scenes/trendkit.js.
// A big pixel needle gauge (PETTY pink on the left, VALID green on the right) sits over the sign. Each round a
// confession sticker lands, the sign acts it out, the needle swings and a verdict tag slams. Round 3 (the twist, under
// the one card cut): the needle wobbles, lands on VALID, and a second tag adds "so say it." Then the sign turns to its
// person and says it; THE STARS say the last line; Pisces holds up a card, fountaining.
//
// 20 s · story 0–15.6 · then the shared end card.
//   0.00–2.10  hook (on screen at t = 0): "Petty or *valid?* | <Sign> edition." + the sign mid-action, needle twitching.
//   2.10–5.10  round 1 · 5.10–8.10 round 2 · 8.10–11.40 round 3 (card cut at 8.1) · 11.4 finale · 12.0 last line.
//
//   makePetty(cfg) → { DURATION, SCENES, CUES }
//     cfg.id, cfg.sign, cfg.date, cfg.deep, cfg.accent, cfg.hookDraw(x, t, S)
//     cfg.rounds: 3 × { text, verdict: 'petty' | 'valid', draw(x, t, S), cues, mood }   (round 3 is always valid)
//     cfg.say (the sign's line to its person in the finale), cfg.last, cfg.pisCard
import {
  makeFilm, buildSticker, star, pisces, tissues, theStars, heldCard, at, wordPops, R, box, label, shadow, sparkles,
  hearts, bubble, pop01, outK, popOut, prog, lerp, clamp, ease, r3, talkHops, NAMES, GOLD, BONE, INK, PINK, RED, GREEN,
  INTER, SERIF, CPS,
} from '../../nt2e21/scenes/trendkit.js'

export const DURATION = 20
export const T = {
  hookOut: [1.95, 2.1],
  rounds: [[2.1, 5.1], [5.1, 8.1], [8.1, 11.4]],
  cut: 8.1, swing: 1.7, tag: 1.95, wob: [1.25, 2.25], land: 2.3, say: 2.75,
  fin: 11.4, dateIn: 11.5, heroSay: 11.6, starsIn: 11.7, last: 12.15, pisIn: 11.8, card: 12.6, boxClose: 15.1, out: [15.1, 15.5],
}
const GX = 540, GY = 800, GR = 290
const PETTY = '#ff5c9a', VALID = GREEN

// ── the gauge: a stepped pixel semicircle, PETTY | VALID halves, ticks, a needle at value v (−1 … 1)
function gauge(x, t, v, { glow = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(GX, GY); x.scale(k, k)
  const seg = 18
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < seg; i++) {
    const a0 = Math.PI + (i / seg) * Math.PI, a1 = Math.PI + ((i + 1) / seg) * Math.PI
    x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, pass ? GR : GR + 10, a0 - (pass ? 0 : 0.01), a1 + (pass ? 0 : 0.01)); x.closePath()
    x.fillStyle = pass ? (i < seg / 2 ? (i % 2 ? '#ff7eb0' : PETTY) : (i % 2 ? '#7fe0a8' : VALID)) : INK; x.fill()
  }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, GR * 0.62, Math.PI, 0); x.closePath(); x.fill()
  x.fillStyle = '#241c44'; x.beginPath(); x.arc(0, 0, GR * 0.62 - 8, Math.PI, 0); x.closePath(); x.fill()
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(GR * 0.5, -GR * 0.5, 10, GR * 0.5, -GR * 0.5, GR); g.addColorStop(0, `rgba(120,255,170,${0.35 * glow})`); g.addColorStop(1, 'rgba(120,255,170,0)'); x.fillStyle = g; x.fillRect(-GR, -GR * 1.6, GR * 2.4, GR * 1.8); x.restore() }
  x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  for (const [s, px, c] of [['PETTY', -GR * 0.66, PETTY], ['VALID', GR * 0.66, VALID]]) { x.fillStyle = 'rgba(6,4,18,0.85)'; x.fillText(s, px + 3, 44); x.fillStyle = c; x.fillText(s, px, 40) }
  // needle
  const ang = v * 1.35
  x.save(); x.rotate(ang)
  R(x, INK, -12, -GR * 0.9, 24, GR * 0.9); R(x, BONE, -6, -GR * 0.9 + 6, 12, GR * 0.9 - 6); R(x, RED, -6, -GR * 0.9 + 6, 12, 30)
  x.restore()
  R(x, INK, -34, -26, 68, 52); R(x, '#8c86a8', -26, -18, 52, 36); R(x, BONE, -20, -14, 16, 10)
  R(x, INK, -GR - 14, 0, GR * 2 + 28, 12)
  x.restore()
}
/** the verdict tag (canvas): a big ink-bordered label over the gauge, slamming in at t0 */
function verdictTag(x, t, t0, t1, text, col, { y = GY - 120, size = 92, rot = -0.08, sub = null } = {}) {
  if (t < t0 - 0.01 || t > t1) return
  const p = prog(t, t0, t0 + 0.12), o = outK(t, [t1 - 0.15, t1])
  const sc = lerp(1.6, 1, ease.outCubic(p)) * (1 + 0.04 * Math.exp(-(t - t0) * 8) * Math.sin((t - t0) * 40)) * o
  x.save(); x.translate(GX, y); x.rotate(rot); x.scale(sc, sc); x.globalAlpha *= clamp(p * 2)
  x.font = `800 ${size}px ${INTER}`; const w = x.measureText(text).width + 60
  box(x, -w / 2, -size * 0.62, w, size * 1.24, col, { b: 9, hi: 'rgba(255,255,255,0.3)' })
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(text, 0, 6)
  x.restore()
  if (sub && t >= sub.at) {
    const q = easeBack(prog(t, sub.at, sub.at + 0.3)) * o
    x.save(); x.translate(GX + 150, y + 112); x.rotate(0.06); x.scale(q, q)
    x.font = `italic 500 70px ${SERIF}`; const w2 = x.measureText(sub.text).width + 50
    box(x, -w2 / 2, -46, w2, 92, BONE, { b: 7 })
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = sub.col; x.fillText(sub.text, 0, 4)
    x.restore()
  }
}
const easeBack = p => { const c1 = 2.2, c3 = c1 + 1; return p <= 0 ? 0 : p >= 1 ? 1 : 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2) }

export function makePetty(cfg) {
  const HERO = cfg.sign, DATE = cfg.date
  const LINES = [{ t: T.last, speaker: 'THE STARS', text: cfg.last }]
  const STARS_HOPS = [T.starsIn + 0.3, ...talkHops(LINES, 'THE STARS', { cps: CPS })]
  const Rr = T.rounds
  const hero = (x, t, o) => star(x, t, HERO, { seed: 3, glow: 1.1, ...o })
  const date = (x, t, o) => star(x, t, DATE, { seed: 7, ...o })
  const V = r => (cfg.rounds[r].verdict === 'petty' ? -0.78 : 0.78)

  // needle value over the whole film
  function needle(t) {
    if (t < Rr[0][0]) return 0.25 * Math.sin(t * 7) + 0.1 * Math.sin(t * 19)
    for (let i = 0; i < 3; i++) {
      const [a, b] = Rr[i], u = t - a
      if (t >= b && i < 2) continue
      const prev = i === 0 ? 0 : V(i - 1)
      if (i < 2) {
        if (u < T.swing - 0.4) return lerp(prev, 0, ease.inOutCubic(prog(u, 0, 0.4))) + 0.05 * Math.sin(t * 13)
        if (u < T.swing) return 0.18 * Math.sin(t * 16)
        const p = prog(u, T.swing, T.swing + 0.3)
        return lerp(0, V(i), easeBack(p)) + 0.03 * Math.sin(t * 20) * (1 - p)
      }
      if (u < T.wob[0]) return lerp(prev, 0, ease.inOutCubic(prog(u, 0, 0.4))) + 0.05 * Math.sin(t * 13)
      if (u < T.land) return 0.75 * Math.sin((u - T.wob[0]) * 14) * (1 - 0.3 * prog(u, T.wob[0], T.land))
      return lerp(-0.2, 0.86, easeBack(prog(u, T.land, T.land + 0.3)))
    }
    return 0.86 + 0.02 * Math.sin(t * 5)
  }

  function paint(x, t) { x.save(); x.translate(0, 90); paint0(x, t); x.restore() }
  function paint0(x, t) {
    const v = needle(t)
    const fin = t >= T.fin
    if (t > T.out[1]) return
    const ok = fin ? popOut(t, T.out) : 1
    gauge(x, t, v, { glow: t > Rr[2][0] + T.land ? clamp(prog(t, Rr[2][0] + T.land, Rr[2][0] + T.land + 0.4)) : 0, k: ok })
    // floor
    R(x, '#1e1838', 0, 1200, 1080, 820); R(x, '#2c2450', 0, 1200, 1080, 10)
    if (t < Rr[0][0]) {
      shadow(x, 540, 1200, 300)
      const o = { x: 540, y: 1040, s: 330, mood: cfg.hookMood || 'squint', look: [1, -0.5], hops: [0.3, 1.0, 1.6] }
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, date, o, under: true })
      hero(x, t, o)
      if (cfg.hookDraw) cfg.hookDraw(x, t, { hero, date, o, under: false })
      pisces(x, t, { x: 925, y: 1640, s: 150 }, 2, 'wide', [-1, -0.8]); tissues(x, 820, 1685, 74)
      return
    }
    for (let i = 0; i < 3; i++) {
      const [a, b0] = Rr[i], b = b0
      if (t < a || t >= b) continue
      const u = t - a, rd = cfg.rounds[i]
      const punch = 1 + 0.06 * (1 - ease.outCubic(prog(u, 0, 0.28)))
      x.save(); x.translate(540, 1100); x.scale(punch, punch); x.translate(-540, -1100)
      const judged = i < 2 ? u > T.tag : u > T.land
      const petty = rd.verdict === 'petty' && i < 2
      const mood = !judged ? (rd.mood || 'squint') : petty ? 'wink' : 'happy'
      const ho = { x: 540, y: 1060, s: 280, mood, look: judged ? [0, 0] : (rd.look || [1, 0]), hops: judged ? [a + (i < 2 ? T.tag : T.land) + 0.05] : [a + 0.3], blush: judged && petty ? 1 : undefined }
      shadow(x, 540, 1200, 260)
      const S = { u, a, b, hero, date, ho, i, judged }
      if (rd.draw) rd.draw(x, t, { ...S, under: true })
      hero(x, t, ho)
      if (rd.draw) rd.draw(x, t, { ...S, under: false })
      if (judged && petty) label(x, 'hehe', 700, 930, { size: 40, col: PINK, font: INTER, weight: 800, alpha: clamp(prog(u, T.tag + 0.2, T.tag + 0.4)), rot: 0.1 })
      x.restore()
      const pk = pop01(t, a + 0.25, 0.3, 2) * outK(t, [b - 0.15, b])
      if (pk > 0.01) { tissues(x, 822, 1685, 74 * Math.min(1, pk)); pisces(x, t, { x: 925, y: 1640, s: 150, pop: pk }, i === 2 ? 3 : 2, judged ? 'sparkle' : 'wide', [-1, -0.8]) }
      if (i < 2) verdictTag(x, t, a + T.tag, b - 0.05, petty ? 'PETTY' : 'VALID', petty ? PETTY : VALID, { rot: petty ? -0.09 : 0.07 })
      else verdictTag(x, t, a + T.land + 0.05, b, 'VALID', VALID, { rot: 0.07, sub: { at: a + T.say, text: 'so say it.', col: '#1f7a4a' } })
    }
    if (fin) {
      shadow(x, 400, 1200, 240 * ok); shadow(x, 690, 1200, 210 * ok)
      hero(x, t, { x: 400, y: 1060, s: 260, pop: ok, mood: t < T.heroSay + 0.8 ? 'neutral' : 'happy', look: [1, 0], hops: [T.heroSay, T.heroSay + 0.4] })
      date(x, t, { x: 700, y: 1075, s: 220, pop: ok * pop01(t, T.dateIn, 0.35, 2), mood: t < T.heroSay + 1.2 ? 'wide' : 'heart', look: [-1, 0], hops: [T.heroSay + 1.2] })
      hearts(x, t, T.heroSay + 1.25, 700, 950, { n: 5 })
      bubble(x, t, 470, 905, T.heroSay, T.out[0], cfg.say, { size: 32, tail: -0.4 })
      const sk = pop01(t, T.starsIn, 0.38, 2.1) * ok
      if (sk > 0.01) theStars(x, t, { x: 170, y: 1215, s: 150, mood: t > T.last + 1.4 ? 'happy' : 'neutral', look: [1, -0.3], hops: STARS_HOPS, pop: sk })
      const pk = pop01(t, T.pisIn, 0.36, 2.2) * ok
      if (pk > 0.01) {
        const F = pisces(x, t, { x: 925, y: 1215, s: 150, pop: pk, hops: [T.pisIn + 0.3, T.card + 0.02] }, t > T.card ? 3 : 2, 'sparkle', [-1, -1])
        heldCard(x, t, 925, F.cy - 150, pop01(t, T.card, 0.3, 2.6) * ok, cfg.pisCard || 'VALID!', { size: 40, col: '#1f7a4a' })
      }
    }
  }

  return makeFilm({
    id: cfg.id, duration: DURATION,
    bug: { main: 'PETTY', dim: 'OR VALID' },
    hook: { text: `Petty or *valid?* | ${NAMES[HERO]} edition.`, color: cfg.accent, out: T.hookOut, size: 82, accentSize: 116 },
    paint,
    dom(root) {
      return cfg.rounds.map((rd, i) => buildSticker(root, { badge: `#${i + 1}`, badgeCol: i === 2 ? PINK : GOLD, text: rd.text, deep: cfg.deep, at: Rr[i][0] + 0.2, out: [Rr[i][1] - 0.15, Rr[i][1]], tilt: [-1.6, 1.4, -1.2][i], top: 1420, size: 42, maxW: 880 }))
    },
    lines: LINES, box: { open: T.last - 0.22, close: T.boxClose, y: 1440, h: 270 },
    flashes: [Rr[0][0], Rr[1][0]],
    cuts: [{ t: T.cut, kind: 'flip' }],
    cues: [
      ['tick', 0.4, 0.03], ['tick', 0.8, 0.03], ['tick', 1.2, 0.03], ['tick', 1.6, 0.03],
      ...cfg.rounds.flatMap((rd, i) => {
        const a = Rr[i][0], petty = rd.verdict === 'petty' && i < 2
        const st = [['pop', r3(a + 0.2), 1174.66, 0.045, 0.1], ['pop', r3(a + 0.27), 1567.98, 0.03, -0.1]]
        const judge = i < 2
          ? [['tick', r3(a + T.swing - 0.35), 0.03], ['tick', r3(a + T.swing - 0.2), 0.03], ['whoosh', r3(a + T.swing), 0.25, 0.03],
            ['tom', r3(a + T.tag), petty ? 110 : 140, { gain: 0.26, decay: 0.25 }], ['tick', r3(a + T.tag), 0.07],
            ...(petty ? [['pop', r3(a + T.tag + 0.05), 392, 0.05, 0], ['pop', r3(a + T.tag + 0.17), 349.23, 0.05, 0]] : [['bell', r3(a + T.tag + 0.05), 1567.98, 0.035, 1, 0], ['glitter', r3(a + T.tag), r3(a + T.tag + 0.4)]])]
          : [...[0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84].map(d => ['tick', r3(a + T.wob[0] + d), 0.03 + d * 0.02]), ['riser', r3(a + T.wob[0]), r3(a + T.land), 0.015],
            ['boom', r3(a + T.land + 0.05), 0.25], ['tom', r3(a + T.land + 0.05), 140, { gain: 0.28, decay: 0.3 }], ['bell', r3(a + T.land + 0.1), 1567.98, 0.035, 1.2, 0], ['glitter', r3(a + T.land), r3(a + T.land + 0.5)],
            ['pop', r3(a + T.say), 1318.51, 0.045, 0.3], ['pop', r3(a + T.say + 0.08), 1760, 0.03, 0.3]]
        return [...st, ...judge, ...at(a, rd.cues)]
      }),
      ['whoosh', T.fin - 0.05, 0.3, 0.03], ['pop', T.dateIn + 0.05, 880, 0.035, 0.3], ...wordPops(T.heroSay, 3, 0.1, 1),
      ['pluck', r3(T.heroSay + 1.25), 1174.66, 0.04, 0.5, 0.3], ['pop', T.starsIn + 0.05, 739.99, 0.035, -0.4], ['pop', T.pisIn + 0.05, 987.77, 0.03, 0.4],
      ['pop', T.card, 1318.51, 0.045, 0.4], ['glitter', T.card, r3(T.card + 0.3)],
    ],
  })
}
void [sparkles, lerp, RED]
