// sxfieldearth — FIRST-DATE FIELD GUIDE, entry 2: "Dating an Earth Sign." (30 s vertical, Star Talk Shows, show 7). lofi · F.
// Story 0–25.6 on the shared trail-map kit (./guide.js, same look as sxfieldfire), then the shared end card.
//   0.00–4.7   "Dating an | *Earth* sign."  The map unrolls; binoculars up. ♉ Taurus strolls across at its own pace,
//              ♍ Virgo zips by in a perfectly straight line, ♑ Capricorn walks in, stops to nod, carries on.
//              GUIDE: "earth signs: steady, cozy, and already here."
//   4.75–9.8   STOP 1 · WHERE TO GO  "Somewhere | *cozy.*"  A farmers-market crate stand over a candlelit table for two.
//              Taurus eats the pie… the bread… then the whole stand ("SOLD OUT"). GO HERE.
//              GUIDE: "a cozy dinner. a farmers market. real food."
//   9.85–15.4  STOP 2 · WHAT TO TALK ABOUT  "Plans and | *comforts.*"  Talk card: "What's your favorite comfort?"
//              Virgo (clipboard): "soup." → "clean sheets." → "a five-year plan." ASK THIS.
//              GUIDE: "ask their plans. and their comfort food."
//   15.45–20.7 STOP 3 · WHAT TO SKIP  "Skip being | *late.*"  A big clock: 7:00 → 7:05 → 7:10 → 7:20; Capricorn taps,
//              squints, eye-rolls. SKIP IT slams, the hands spin back to 6:55, Capricorn blushes.
//              GUIDE: "late? they noticed. at minute one."
//   20.75–25.45 the SUMMIT: "2ND DATE" flag; Taurus, Virgo and Capricorn hop up under falling leaves.  "Show *up.* On time."
//              GUIDE: "be on time. bring a snack. you're golden."
// ♓ Pisces cries at Pisces Pond. Card cut kept: 15.55. End card 25.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { fieldGuide, T, GOLD, BONE, INK, CREW, drawBits, sparkles, label, bubble, pop01, popOut } from './guide.js'

const TAU_ = signStar('taurus'), VIR = signStar('virgo'), CAP = signStar('capricorn')
const GRN = '#8fd17a', HONEY = '#e9b24a'
const [S1, S2, S3] = T.stops

const CLIP = ['.kkkk.', 'bbbbbbbb'.slice(0, 6), 'bWWWWb', 'bWllWb', 'bWWWWb', 'bWllWb', 'bWWWWb', 'bWllWb', 'bbbbbb']
const CLIP_C = { k: '#9aa0b0', b: '#8a5a32', W: '#f5ecd9', l: '#7a7290' }
const LEAF = ['.gg', 'gGg', 'gg.']

const TAU_HOPS = [S1.k + 0.4, ...S1.gag.map(g => g + 0.05), S1.stamp + 0.1]
const VIR_HOPS = [S2.k + 0.5, ...S2.gag.map(g => g + 0.02), S2.stamp + 0.1]
const CAP_TAPS = Array.from({ length: 14 }, (_, n) => S3.k + 0.6 + n * 0.22).filter(h => h < S3.stamp - 0.1)
const CAP_HOPS = [...CAP_TAPS, S3.stamp + 0.5]
const CREW_HOPS = [T.sum.crew + 0.1, T.sum.hLand, T.sum.hLand + 0.55, 23.8, 24.3]

export const { SCENES, CUES } = fieldGuide({
  element: 'EARTH', accent: GRN, accent2: HONEY,
  h0: 'Dating an | *Earth* sign.',
  last: 'Show *up.* | On time.', lastLate: 3,
  lines: [
    'earth signs: steady, cozy, and already here.',
    'a cozy dinner. a farmers market. real food.',
    'ask their plans. and their comfort food.',
    'late? they noticed. at minute one.',
    "be on time. bring a snack. you're golden.",
  ],
  wild: [
    { sign: 'taurus', path: [-160, 1010, 1240, 990, 14], dur: 3.3, walk: true, mood: 'happy' },
    { sign: 'virgo', path: [1240, 760, -160, 760, 0] },
    { sign: 'capricorn', path: [-160, 880, 1240, 880, 30], stop: true, mood: 'happy' },
  ],
  trailFx(x, t, tx, ty, n, i, a) {
    if (n % 2) return
    x.save(); x.globalAlpha *= a * (1 - n / 10)
    drawBits(x, LEAF, { g: n < 4 ? GRN : '#5aa060', G: '#c9f0a8' }, Math.round(tx + Math.sin(n * 2.1) * 10), Math.round(ty + 30 + Math.cos(n * 1.3) * 10), 4, { outline: null, rot: n * 0.7 })
    x.restore()
  },
  hookGuide: t => ({ mood: t < T.binoc[0] ? 'happy' : t < 3.6 ? 'wide' : 'happy', look: t < T.binoc[0] ? [0, 0] : [Math.sin(t * 1.6) > 0 ? 1 : -1, -1] }),
  guideHops: [S1.gag[2] + 0.25, S3.stamp + 0.3],
  stops: [
    {
      kicker: 'STOP 1 · WHERE TO GO', head: 'Somewhere | *cozy.*', stamp: 'GO HERE',
      guide: (t) => ({ mood: t < S1.gag[2] ? 'happy' : t < S1.stamp ? 'wide' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S1.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        x.save(); x.globalAlpha *= a
        x.save(); x.translate(V.x, V.y + 60); x.scale(sp, sp); x.translate(-V.x, -(V.y + 60))
        // the market stand: two crates of produce + a sign
        const soldOut = t >= S1.gag[2]
        const cx0 = V.x - 120, cy0 = V.y - 70
        for (let k = 0; k < 2; k++) {
          const bx = cx0 + k * 124
          x.fillStyle = INK; x.fillRect(bx - 4, cy0 - 4, 124, 74)
          x.fillStyle = '#9a6a3c'; x.fillRect(bx, cy0 + 22, 116, 44); x.fillStyle = '#7a4f2e'; x.fillRect(bx, cy0 + 40, 116, 6)
          if (!soldOut) for (let j = 0; j < 7; j++) {
            const vx = bx + 8 + j * 15, vy = cy0 + 6 + (j % 2) * 6
            if (k === 0) { x.fillStyle = '#ff8a2a'; x.fillRect(vx, vy, 10, 20); x.fillStyle = GRN; x.fillRect(vx + 2, vy - 6, 6, 6) }
            else { x.fillStyle = '#e8443a'; x.fillRect(vx, vy + 4, 13, 13); x.fillStyle = '#5aa060'; x.fillRect(vx + 4, vy, 5, 4) }
          }
        }
        label(x, soldOut ? 'SOLD OUT' : 'FARMERS MARKET', V.x, cy0 - 30, { size: 24, color: soldOut ? '#ff8a8a' : GRN })
        // the candlelit table for two
        const ty = V.y + 70
        x.fillStyle = INK; x.fillRect(V.x - 124, ty - 4, 248, 52)
        for (let k = 0; k < 10; k++) { x.fillStyle = k % 2 ? '#f5ecd9' : '#c94a4a'; x.fillRect(V.x - 120 + k * 24, ty, 24, 22) }
        x.fillStyle = '#a33a3a'; x.fillRect(V.x - 120, ty + 22, 240, 22)
        x.fillStyle = INK; x.fillRect(V.x - 110, ty + 44, 12, 50); x.fillRect(V.x + 98, ty + 44, 12, 50)
        // candle
        x.fillStyle = INK; x.fillRect(V.x - 10, ty - 50, 20, 50); x.fillStyle = '#f5ecd9'; x.fillRect(V.x - 6, ty - 46, 12, 46)
        const fl = Math.sin(t * 17) * 2
        x.fillStyle = '#ffd23f'; x.fillRect(V.x - 5 + fl, ty - 66, 10, 16); x.fillStyle = '#ff8a2a'; x.fillRect(V.x - 3 + fl, ty - 58, 6, 8)
        x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(V.x, ty - 58, 0, V.x, ty - 58, 90); g.addColorStop(0, 'rgba(255,200,110,0.35)'); g.addColorStop(1, 'rgba(255,200,110,0)'); x.fillStyle = g; x.fillRect(V.x - 90, ty - 148, 180, 180); x.restore()
        // the pie (left) and the bread (right) — Taurus eats them
        if (t < S1.gag[0]) { x.fillStyle = INK; x.fillRect(V.x - 92, ty - 22, 60, 22); x.fillStyle = '#d99a4e'; x.fillRect(V.x - 88, ty - 18, 52, 16); x.fillStyle = '#b5532f'; for (let k = 0; k < 4; k++) x.fillRect(V.x - 84 + k * 13, ty - 14, 6, 6) }
        else { x.fillStyle = '#d99a4e'; x.fillRect(V.x - 80, ty - 4, 5, 4); x.fillRect(V.x - 60, ty - 4, 4, 4) }
        if (t < S1.gag[1]) { x.fillStyle = INK; x.fillRect(V.x + 34, ty - 28, 62, 28); x.fillStyle = '#c98a3c'; x.fillRect(V.x + 38, ty - 24, 54, 22); x.fillStyle = '#e9b24a'; x.fillRect(V.x + 44, ty - 22, 8, 4); x.fillRect(V.x + 60, ty - 22, 8, 4); x.fillRect(V.x + 76, ty - 22, 8, 4) }
        else { x.fillStyle = '#c98a3c'; x.fillRect(V.x + 50, ty - 4, 5, 4); x.fillRect(V.x + 70, ty - 4, 4, 4) }
        x.restore()
        x.restore()
        for (const g of S1.gag) sparkles(x, t, V.x, V.y + 40, g, 6, 70, 1, [HONEY, BONE, GRN], 18)
        // Taurus: heart-eyes at the food, gets rounder with each bite
        const bites = S1.gag.filter(g => t >= g).length
        const tp = pop01(t, S1.k + 0.25, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x, F.y, 168, t, { color: TAU_.color, glyph: TAU_.glyph, mood: bites === 0 ? 'heart' : bites < 3 ? 'happy' : t < S1.stamp ? 'squint' : 'heart', look: [0, -1], hops: TAU_HOPS, squash: 0.05 * bites, seed: 21, pop: tp, alpha: a })
        H.stamp(V.x, V.y - 40)
      },
    },
    {
      kicker: 'STOP 2 · WHAT TO TALK ABOUT', head: 'Plans and | *comforts.*', stamp: 'ASK THIS',
      guide: (t) => ({ mood: t < S2.gag[2] ? 'happy' : t < S2.gag[2] + 0.7 ? 'wide' : 'sparkle', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const mv = ease.inOutCubic(prog(t, S2.gag[0] - 0.3, S2.gag[0]))
        H.talkCard(S2.k + 0.3, lerp(V.x, V.x + 110, mv), lerp(V.y, V.y - 110, mv), "What's your favorite comfort?", { scale: lerp(1, 0.56, mv) })
        const lvl = S2.gag.filter(g => t >= g).length
        const vp = pop01(t, S2.k + 0.2, 0.36, 2.2) * H.ok
        const r = drawStarChar(x, F.x, F.y, 168, t, { color: VIR.color, glyph: VIR.glyph, mood: lvl === 0 ? 'neutral' : lvl < 3 ? 'happy' : 'sparkle', look: [-1, -1], hops: VIR_HOPS, seed: 23, pop: vp, alpha: a })
        // clipboard in hand, ticking things off
        x.save(); x.globalAlpha *= a * clamp(vp)
        drawBits(x, CLIP, CLIP_C, r.x + 104, r.y + 10 + Math.sin(t * 3) * 3, 8 * vp, { rot: 0.15 })
        for (let k = 0; k < lvl; k++) drawBits(x, ['.....G', 'G...G.', '.G.G..', '..G...'], { G: '#3aa860' }, r.x + 106, r.y - 6 + k * 16, 3 * vp, { outline: null, rot: 0.15 })
        x.restore()
        const out = popOut(t, [S2.hOut[0], S2.hOut[1] + 0.2])
        bubble(x, t, 'soup.', F.x - 130, F.y - 118, S2.gag[0], { out, tail: 1 })
        bubble(x, t, 'clean sheets.', F.x - 90, F.y - 196, S2.gag[1], { out, tail: 1 })
        bubble(x, t, 'a five-year plan.', F.x - 110, F.y - 274, S2.gag[2], { out, tail: 1, fillC: HONEY, size: 24 })
        for (const g of S2.gag) sparkles(x, t, F.x, F.y, g, 8, 110, 2, [GRN, HONEY, BONE])
        H.stamp(V.x + 110, V.y - 110)
      },
    },
    {
      kicker: 'STOP 3 · WHAT TO SKIP', head: 'Skip being | *late.*', stamp: 'SKIP IT',
      guide: (t) => ({ mood: t < S3.gag[1] ? 'neutral' : t < S3.stamp ? 'wide' : 'happy', look: [1, -1], squash: t > S3.gag[2] && t < S3.stamp ? 0.04 * Math.sin(t * 40) : 0 }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S3.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        // the clock: minutes past 7 jump on each gag; the stamp spins it back to 6:55
        const late = [0, 5, 10, 20][S3.gag.filter(g => t >= g).length]
        const back = ease.outBack(prog(t, S3.stamp, S3.stamp + 0.5))
        const mins = t >= S3.stamp ? lerp(late, -5, back) : late
        const R = 92, cx = V.x, cy = V.y - 6
        x.save(); x.globalAlpha *= a; x.translate(cx, cy); x.scale(sp, sp)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 12, 0, 7); x.fill()
        x.fillStyle = '#9a6a3c'; x.beginPath(); x.arc(0, 0, R + 6, 0, 7); x.fill()
        x.fillStyle = '#f5ecd9'; x.beginPath(); x.arc(0, 0, R - 2, 0, 7); x.fill()
        x.fillStyle = INK
        for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2; x.fillRect(Math.round(Math.sin(an) * (R - 16)) - 4, Math.round(-Math.cos(an) * (R - 16)) - 4, 8, 8) }
        const hand = (an, len, w, col) => { x.save(); x.rotate(an); x.fillStyle = INK; x.fillRect(-w / 2 - 3, -len - 3, w + 6, len + 6); x.fillStyle = col; x.fillRect(-w / 2, -len, w, len); x.restore() }
        hand((7 + mins / 60) / 12 * Math.PI * 2, R * 0.48, 10, '#3a3360')
        hand(mins / 60 * Math.PI * 2, R * 0.78, 7, late && t < S3.stamp ? '#e8443a' : '#3a3360')
        x.fillStyle = INK; x.fillRect(-7, -7, 14, 14)
        x.restore()
        const hh = mins < 0 ? '6:' + String(60 + Math.round(mins)).padStart(2, '0') : '7:' + String(Math.round(mins)).padStart(2, '0')
        label(x, 'DATE AT 7:00', V.x, cy - R - 40, { size: 24, color: HONEY, alpha: a * clamp(sp) })
        label(x, (t >= S3.stamp ? 'YOU: ' : 'YOU: ') + hh, V.x, cy + R + 36, { size: 24, color: t >= S3.stamp + 0.3 ? '#7dffb0' : late ? '#ff8a8a' : BONE, alpha: a * clamp(sp) })
        // Capricorn, tapping, increasingly unimpressed
        const lv = S3.gag.filter(g => t >= g).length, ok = t >= S3.stamp
        const cp = pop01(t, S3.k + 0.3, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x, F.y + 10, 168, t, { color: CAP.color, glyph: CAP.glyph, mood: ok ? (t < S3.stamp + 0.5 ? 'wide' : 'happy') : ['neutral', 'neutral', 'squint', 'eyeroll'][lv], look: [-1, -1], blush: ok && t > S3.stamp + 0.5 ? 1 : undefined, hops: CAP_HOPS, seed: 24, pop: cp, alpha: a })
        if (ok) sparkles(x, t, V.x, cy, S3.stamp + 0.3, 10, 120, 1, [GRN, HONEY, BONE])
        H.stamp(V.x, V.y - 10)
      },
    },
  ],
  summit({ x, t, a }) {
    const crew = [TAU_, VIR, CAP]
    crew.forEach((c, i) => {
      const p = pop01(t, T.sum.crew + i * 0.14, 0.36, 2.2) * popOut(t, T.out)
      if (p <= 0.01) return
      const P = CREW[i]
      drawStarChar(x, P.x, P.y, 150, t, { color: c.color, glyph: c.glyph, mood: t > T.sum.hLand ? 'heart' : 'happy', look: [0, 0], hops: CREW_HOPS.map(h => h + i * 0.08), seed: 30 + i, pop: p, alpha: a })
    })
    // leaves drifting down
    const k0 = prog(t, T.sum.crew, T.sum.crew + 0.4) * popOut(t, T.out)
    if (k0 <= 0) return
    x.save(); x.globalAlpha *= a * k0
    for (let n = 0; n < 16; n++) {
      const ph = ((t - T.sum.crew) * 0.22 + n / 16) % 1
      const lx = 300 + ((n * 137) % 620) + Math.sin(ph * 9 + n) * 30, ly = 300 + ph * 600
      drawBits(x, LEAF, { g: n % 3 ? GRN : HONEY, G: '#f0f5c0' }, Math.round(lx), Math.round(ly), 5, { outline: null, rot: ph * 6 + n })
    }
    x.restore()
  },
  cues: [
    ...S1.gag.map((g, n) => ['pop', g, [659.25, 587.33, 523.25][n], 0.04, 0.2]), ['tick', S1.gag[2] + 0.05, 0.05], ['bell', S1.gag[2] + 0.1, 1318.51, 0.02, 0.8, 0.3],
    ['tick', S2.k + 0.3, 0.05], ['whoosh', S2.k + 0.3, 0.25, 0.025],
    ...S2.gag.map((g, n) => ['pluck', g, [987.77, 1174.66, 1567.98][n], 0.04, 0.5, 0.1]), ['glitter', S2.gag[2], S2.gag[2] + 0.4],
    ...CAP_TAPS.map(h => ['tick', h, 0.025]), ...S3.gag.map(g => ['tick', g, 0.07]),
    ['whoosh', S3.stamp + 0.04, 0.45, 0.05], ['glitter', S3.stamp + 0.3, S3.stamp + 0.7],
    ['glitter', T.sum.crew + 0.2, T.sum.crew + 1.0], ['glitter', T.sum.hLand, T.sum.hLand + 0.8],
  ],
})
export const DURATION = 30
