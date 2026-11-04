// DELULU OR SOLULU: the shared format of nt2e16–nt2e20 (Trends, Volume 2, format 4; rows in
// promo/films/next30/b11.md). 25 s: story 0–20.6, then the shared end card.
//   0.00–2.00   hook (frame 0): the claim is on as the top caption ("They did X… so we're basically *Y*."), the big
//               DELULU ↔ SOLULU meter is on, the sign mid-hop under it.
//   2.00–11.0   three pieces of "evidence" (numbered stickers); each one swings the needle further to DELULU.
//   11.0        the turn (the one card cut): THE STARS: "…or you could just *ask?*"
//   12.8–15.0   the sign asks the crush (it pops in); the answer lands; the needle slams to SOLULU (stamp).
//   15.7        THE STARS say the last line. Pisces cries at the result.
//   makeDelulu(cfg) → { DURATION, SCENES, CUES }
//     cfg.sign, cfg.crush, cfg.claim (popText), cfg.accent, cfg.prop(x, t, o), cfg.ev [{ caption, draw? }] × 3,
//     cfg.ask, cfg.answer, cfg.last, cfg.heroIsPisces (Pisces is the hero: no extra side Pisces)
import { makeFilm, buildSticker, buildStamp, drawStampTool, stampCues, popText, starOf, pisces, tissues, sparkles, shadow, label, box, R, bubble, hearts, confetti,
  pop01, outK, popOut, prog, ease, lerp, clamp, r3, GOLD, BONE, PINK, INK, RED, GREEN, INTER, CPS } from '../../nt2e01/scenes/nt2kit.js'

export const T = { ev: [[2.0, 5.0], [5.0, 8.0], [8.0, 11.0]], turn: 11.0, cut: 11.0, crushIn: 12.6, ask: 13.0, answer: 14.3, stampDrop: [14.9, 15.2], slam: 15.2,
  l1: 11.25, last: 15.75, boxClose: 20.1, out: [20.1, 20.5] }
const ANG = [-0.15, -0.6, -1.0, -1.38], MC = { x: 540, y: 860, r: 300 }

function cloud(x, cx, cy, s, a = 1) { x.save(); x.globalAlpha *= a; for (const [dx, dy, r] of [[-1, 0, 0.6], [0, -0.35, 0.75], [1, 0, 0.6]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s * 0.7, cy + dy * s, r * s + 5, 0, Math.PI * 2); x.fill() } for (const [dx, dy, r] of [[-1, 0, 0.6], [0, -0.35, 0.75], [1, 0, 0.6]]) { x.fillStyle = '#ffd6e6'; x.beginPath(); x.arc(cx + dx * s * 0.7, cy + dy * s, r * s, 0, Math.PI * 2); x.fill() } x.restore() }

export function drawMeter(x, t, ang, glow) {
  const { x: cx, y: cy, r } = MC
  const N = 18
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < N; i++) {
    const a0 = Math.PI + (i / N) * Math.PI, a1 = Math.PI + ((i + 1) / N) * Math.PI - 0.025
    x.beginPath(); x.arc(cx, cy, pass ? r - 6 : r + 2, a0, a1); x.arc(cx, cy, pass ? r - 74 : r - 82, a1, a0, true); x.closePath()
    const left = i < N / 2
    x.fillStyle = pass ? (left ? (i % 2 ? '#ff8fb1' : '#ff6f9e') : (i % 2 ? '#7be3a0' : '#4fd08a')) : INK
    x.fill()
  }
  if (glow > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(cx + r * 0.7, cy - 60, 10, cx + r * 0.7, cy - 60, 260); g.addColorStop(0, `rgba(123,227,160,${0.35 * glow})`); g.addColorStop(1, 'rgba(123,227,160,0)'); x.fillStyle = g; x.fillRect(cx, cy - 400, 600, 600); x.restore() }
  cloud(x, cx - r * 0.62, cy - r * 0.5 - 6 * Math.sin(t * 2), 34)
  // labels
  x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = INK; x.fillText('DELULU', cx - r * 0.62 + 3, cy + 46); x.fillStyle = '#ff8fb1'; x.fillText('DELULU', cx - r * 0.62, cy + 43)
  x.fillStyle = INK; x.fillText('SOLULU', cx + r * 0.62 + 3, cy + 46); x.fillStyle = GREEN; x.fillText('SOLULU', cx + r * 0.62, cy + 43)
  // the needle
  x.save(); x.translate(cx, cy); x.rotate(ang)
  R(x, INK, -11, -r + 40, 22, r - 30); R(x, GOLD, -5, -r + 46, 10, r - 42)
  x.restore()
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(cx, cy, 24, 0, Math.PI * 2); x.fill()
}

export function makeDelulu(cfg) {
  const HERO = starOf(cfg.sign, 3, 1.1), CRUSH = starOf(cfg.crush, 9), STARS = starOf('stars', 2, 1.05)
  const LINES = [{ t: T.l1, speaker: 'THE STARS', text: '…or you could just *ask?*' }, { t: T.last, speaker: 'THE STARS', text: cfg.last }]

  function needle(t) {
    let a = ANG[0] + 0.08 * Math.sin(t * 2.2)
    T.ev.forEach(([e0], i) => { const p = ease.outBack ? 0 : 0; void p; const q = prog(t, e0 + 0.9, e0 + 1.25); if (q > 0) a = lerp(a, ANG[i + 1], 1) * 1; })
    // rebuild deterministically: target after the last swung evidence, with an overshoot wobble
    let target = ANG[0], since = 1e9
    T.ev.forEach(([e0], i) => { if (t >= e0 + 0.9) { target = ANG[i + 1]; since = t - (e0 + 0.9) } })
    if (t >= T.slam) { target = 1.32; since = t - T.slam }
    const prev = t >= T.slam ? ANG[3] : (() => { let pv = ANG[0]; T.ev.forEach(([e0], i) => { if (t >= e0 + 0.9 && i > 0) pv = ANG[i] }); return pv })()
    if (since < 1e8) { const k = clamp(since / 0.25), wob = Math.exp(-since * 6) * Math.sin(since * 30) * 0.12; a = lerp(prev, target, ease.outCubic(k)) + (k >= 1 ? wob : 0) }
    if (t >= T.ev[2][0] + 1.2 && t < T.slam) a += 0.03 * Math.sin(t * 40)       // pinned and rattling
    return a
  }
  function draw(x, t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    drawMeter(x, t, needle(t), t >= T.slam ? clamp((t - T.slam) * 4) : 0)
    // hero (+ the crush in the ask scene)
    const asking = t >= T.crushIn
    const hx = asking ? lerp(540, 330, ease.inOutCubic(prog(t, T.crushIn - 0.3, T.crushIn + 0.2))) : 540
    const mood = t < T.turn ? (t >= T.ev[0][0] + 0.9 ? 'heart' : 'sparkle') : t < T.ask ? 'wide' : t < T.answer + 0.2 ? 'neutral' : 'happy'
    const o = { x: hx, y: 1160, s: 220, mood, look: asking ? [1, 0] : [0, -0.7], pop: ok, blush: t >= T.answer ? 1 : undefined,
      hops: [-0.2, 0.7, ...T.ev.map(e => e[0] + 0.9), T.turn + 0.1, T.answer + 0.3, T.slam + 0.1, T.slam + 0.7] }
    shadow(x, hx, 1300, 220 * ok)
    HERO(x, t, o)
    if (cfg.prop) cfg.prop(x, t, o)
    if (t < T.turn) T.ev.forEach(([a, b], i) => { if (t >= a && t < b && cfg.ev[i].draw) cfg.ev[i].draw(x, t, { u: t - a, t0: a, t1: b, i, HERO, o }) })
    if (t < T.turn) hearts(x, t, T.ev[2][0] + 0.95, 540, 1060, { n: 6 })
    if (asking) {
      const ck = pop01(t, T.crushIn, 0.35, 2.2) * ok
      shadow(x, 760, 1300, 200 * ck)
      CRUSH(x, t, { x: 760, y: 1160, s: 200, pop: ck, mood: t < T.answer ? 'neutral' : 'happy', look: [-1, 0], hops: [T.answer, T.slam + 0.2], blush: t >= T.answer && cfg.crushMood !== 'happy-friend' ? 0.9 : undefined })
      bubble(x, t, 380, 1010, T.ask, T.answer, cfg.ask, { size: 32 })
      bubble(x, t, 700, 1010, T.answer, T.out[0], cfg.answer, { size: 30, col: '#c9f2d4' })
      if (t >= T.slam) { hearts(x, t, T.slam + 0.1, 540, 1080, { n: 8 }); confetti(x, t, T.slam + 0.05, 840, 700, { cols: [GREEN, BONE, GOLD, '#7fd0ff'] }) }
    }
    // THE STARS (from the turn on)
    const sk = pop01(t, T.turn, 0.38, 2.1) * ok
    if (sk > 0.01) STARS(x, t, { x: 930, y: 1300, s: 120, pop: sk, mood: t > T.slam ? 'happy' : 'neutral', look: [-1, -0.5], hops: [T.turn + 0.3, T.slam + 0.3] })
    // Pisces
    if (!cfg.heroIsPisces) {
      const tears = t < T.turn ? 1 : t < T.slam ? 2 : 3
      tissues(x, 70, 1330, 60 * ok)
      pisces(x, t, { x: 150, y: 1300, s: 120, pop: ok, hops: [T.ev[2][0] + 1.0, T.slam + 0.15, T.slam + 0.8] }, tears, t < T.slam ? 'wide' : 'happy', [1, -0.6])
    }
  }
  function top(tx, t) {
    drawStampTool(tx, t, { drop: T.stampDrop, ink: '#2f9e5c', y0: 330 })
    sparkles(tx, t, 540, 330, T.slam + 0.02, 14, 430, 1, [GREEN, BONE, GOLD])
  }
  function dom(root) {
    const H = popText(root, cfg.claim, { top: 160, size: 64, accentSize: 92, at: -1, gap: 0, accentColor: cfg.accent || PINK, fit: true })
    const st = cfg.ev.map((e, i) => buildSticker(root, { n: i + 1, text: `Evidence: ${e.caption}`, deep: '#c0284a', badge: '#ff8fb1', at: T.ev[i][0] + 0.3, out: [T.ev[i][1] - 0.18, T.ev[i][1]], tilt: [-1.8, 1.5, -1.2][i], top: 1410, size: 44, accentSize: 56 }))
    st.push(buildSticker(root, { text: cfg.hookSticker || 'delulu or *solulu?*', at: -1, out: [T.ev[0][0] - 0.18, T.ev[0][0]], tilt: -2, top: 1420, deep: '#2f9e5c', size: 52, accentSize: 66 }))
    const stamp = buildStamp(root, { html: '*SOLULU.*', at: T.slam, out: T.out, ink: '#3fbf72', size: 120, top: 200 })
    return [{ update: t => H.update(t, outK(t, [T.slam - 0.3, T.slam - 0.05])) }, ...st, stamp]
  }
  const CUES = [
    ['pop', 0.7, 880, 0.03, 0],
    ...T.ev.flatMap(([a], i) => [['whoosh', r3(a - 0.08), 0.28, 0.03], ['tick', a, 0.05], ['pop', r3(a + 0.3), 1174.66, 0.04, 0.1], ['pop', r3(a + 0.37), 1567.98, 0.03, -0.1],
      ['whoosh', r3(a + 0.85), 0.3, 0.03], ['tom', r3(a + 0.9), 150 - i * 25, { gain: 0.2, decay: 0.18 }], ['pop', r3(a + 0.92), [987.77, 880, 739.99][i], 0.04, -0.4],
      ...((cfg.ev[i].cues || []).map(c => [c[0], r3(c[1] + a), ...c.slice(2)]))]),
    ['glitter', r3(T.ev[2][0] + 0.95), r3(T.ev[2][0] + 1.5)],
    ['pop', r3(T.turn + 0.05), 739.99, 0.04, 0.4], ['tick', T.turn, 0.06],
    ['pop', r3(T.crushIn + 0.05), 987.77, 0.035, 0.3], ['pop', T.ask, 880, 0.035, -0.3], ['pop', T.answer, 1318.51, 0.04, 0.3],
    ...stampCues(T.stampDrop[0], T.slam), ['whoosh', r3(T.slam - 0.1), 0.2, 0.04],
    ['clap', r3(T.slam + 0.15), { gain: 0.12, pan: -0.3 }], ['clap', r3(T.slam + 0.5), { gain: 0.12, pan: 0.3 }],
    ['whoosh', T.out[0], 0.35, 0.03],
  ]
  return makeFilm({ duration: 25, bug: ['DELULU', 'OR SOLULU'], segs: [...T.ev, [T.turn, T.slam], [T.slam, T.boxClose]],
    lines: LINES, boxY: 1420, boxOpen: T.l1 - 0.22, boxClose: T.boxClose, out: T.out, flashes: [T.ev[0][0], T.ev[1][0], T.ev[2][0], T.slam], shakes: [T.slam],
    cuts: [{ t: T.cut, kind: 'deal' }], draw, top, dom, cues: CUES })
}
export * from '../../nt2e01/scenes/nt2kit.js'
void [label, box, RED, CPS]
