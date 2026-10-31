// sxfieldair — FIRST-DATE FIELD GUIDE, entry 3: "Dating an Air Sign." (30 s vertical, Star Talk Shows, show 7). synthwave · G.
// Story 0–25.6 on the shared trail-map kit (./guide.js, same look as sxfieldfire), then the shared end card.
//   0.00–4.7   "Dating an | *Air* sign."  The map unrolls; binoculars up. ♊ Gemini and ♎ Libra whoosh across on wind
//              streaks; ♒ Aquarius drifts in, stops mid-map sideways-curious, drifts off.
//              GUIDE: "air signs: curious, chatty, full of ideas."
//   4.75–9.8   STOP 1 · WHERE TO GO  "Somewhere to | *think.*"  A bookstore shelf and a trivia scoreboard. Gemini reads
//              two books at once; books stack on its head: one, two… then it slams the buzzer: TRIVIA 1. GO HERE.
//              GUIDE: "a bookstore crawl. a trivia night. go nerd."
//   9.85–15.4  STOP 2 · WHAT TO TALK ABOUT  "Talk | *ideas.*"  Talk card: "What's a theory you'd defend at 2 AM?"
//              Libra: "aliens are shy." → "cats know things." → "pigeons run the city." ASK THIS.
//              GUIDE: "ask what they think about. then listen."
//   15.45–20.7 STOP 3 · WHAT TO SKIP  "Skip the | *small* talk."  A giant bubble: "so… what do you do?" A tumbleweed
//              rolls by; Aquarius yawns, droops, nods off. SKIP IT. New bubble: "which soup are you, honestly?" → Aquarius
//              wakes up sparkly.  GUIDE: "skip 'so what do you do?' ask a weird one."
//   20.75–25.45 the SUMMIT: "2ND DATE" flag; Gemini, Libra and Aquarius hop up under paper planes.  "Ask the *weird* question."
//              GUIDE: "ask weird. listen well. stay curious."
// ♓ Pisces cries at Pisces Pond. Card cut kept: 15.55. End card 25.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { fieldGuide, T, BONE, INK, PINK, CREW, drawBits, sparkles, label, bubble, pop01, popOut } from './guide.js'

const GEM = signStar('gemini'), LIB = signStar('libra'), AQU = signStar('aquarius')
const SKY = '#8fe3ff', LAV = '#c9a6ff'
const [S1, S2, S3] = T.stops

const BOOK = ['CCCCCC', 'CWWWWC', 'CCCCCC']
const PLANE = ['W.....', 'WWW...', 'WWWWWW', '.WWW..', '..W...']
const TUMBLE = ['..bbbb..', '.b.bb.b.', 'b.b..b.b', 'bb.bb.bb', 'b.b..b.b', '.b.bb.b.', '..bbbb..']

const GEM_HOPS = [S1.k + 0.4, ...S1.gag.map(g => g + 0.03), S1.stamp + 0.1]
const LIB_HOPS = [S2.k + 0.5, ...S2.gag.map(g => g + 0.02), S2.stamp + 0.1]
const AQU_HOPS = [S3.k + 0.45, S3.stamp + 0.6, S3.stamp + 1.0]
const CREW_HOPS = [T.sum.crew + 0.1, T.sum.hLand, T.sum.hLand + 0.55, 23.8, 24.3]
const NEWQ = S3.stamp + 0.55

export const { SCENES, CUES } = fieldGuide({
  element: 'AIR', accent: SKY, accent2: LAV,
  h0: 'Dating an | *Air* sign.',
  last: 'Ask the *weird* | question.', lastLate: 2, lastSize: 108,
  lines: [
    'air signs: curious, chatty, full of ideas.',
    'a bookstore crawl. a trivia night. go nerd.',
    'ask what they think about. then listen.',
    "skip 'so what do you do?' ask a weird one.",
    'ask weird. listen well. stay curious.',
  ],
  wild: [
    { sign: 'gemini', path: [-160, 780, 1240, 700, 120] },
    { sign: 'libra', path: [1240, 1010, -160, 1000, 60] },
    { sign: 'aquarius', path: [-160, 860, 1240, 860, 70], stop: true, mood: 'sparkle' },
  ],
  trailFx(x, t, tx, ty, n, i, a) {
    if (n % 3) return
    x.save(); x.globalAlpha *= a * (1 - n / 10) * 0.9
    x.fillStyle = n < 4 ? '#e8fbff' : SKY
    const w = 40 - n * 2
    x.fillRect(Math.round(tx - w / 2), Math.round(ty - 30 + (n % 2) * 54), w, 5)
    x.fillRect(Math.round(tx - w / 2 + 10), Math.round(ty + 8), w - 14, 4)
    x.restore()
  },
  hookGuide: t => ({ mood: t < T.binoc[0] ? 'happy' : t < 3.6 ? 'wide' : 'happy', look: t < T.binoc[0] ? [0, 0] : [Math.sin(t * 2.4) > 0 ? 1 : -1, -1] }),
  guideHops: [S1.gag[2] + 0.2],
  stops: [
    {
      kicker: 'STOP 1 · WHERE TO GO', head: 'Somewhere to | *think.*', stamp: 'GO HERE',
      guide: (t) => ({ mood: t < S1.gag[2] ? 'happy' : t < S1.stamp ? 'wide' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S1.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        x.save(); x.globalAlpha *= a
        x.save(); x.translate(V.x, V.y + 60); x.scale(sp, sp); x.translate(-V.x, -(V.y + 60))
        // the bookshelf
        const bx = V.x - 120, by = V.y - 100, bw = 240, bh = 150
        x.fillStyle = INK; x.fillRect(bx - 6, by - 6, bw + 12, bh + 12)
        x.fillStyle = '#7a4f2e'; x.fillRect(bx, by, bw, bh)
        const COLS = ['#e8628a', SKY, '#f2c75c', LAV, '#7dffb0', '#ff9a5a', '#5fd0ff']
        for (let r = 0; r < 3; r++) {
          let cx = bx + 8
          for (let k = 0; cx < bx + bw - 14; k++) {
            const w = 12 + ((k * 7 + r * 3) % 3) * 4, h = 30 + ((k * 5 + r) % 3) * 6
            x.fillStyle = INK; x.fillRect(cx - 1, by + 8 + r * 48 + (42 - h) - 1, w + 2, h + 2)
            x.fillStyle = COLS[(k + r * 2) % COLS.length]; x.fillRect(cx, by + 8 + r * 48 + (42 - h), w, h)
            cx += w + 3
          }
          x.fillStyle = '#5c3a22'; x.fillRect(bx, by + 48 + r * 48, bw, 6)
        }
        label(x, 'BOOKSTORE', V.x, by - 30, { size: 26, color: SKY })
        // the trivia scoreboard
        const score = t >= S1.gag[2] ? 1 : 0
        const sy = V.y + 84
        x.fillStyle = INK; x.fillRect(V.x - 112, sy - 4, 224, 54)
        x.fillStyle = '#120c2e'; x.fillRect(V.x - 108, sy, 216, 46)
        label(x, 'TRIVIA NIGHT', V.x - 30, sy + 23, { size: 18, color: LAV, shadow: false })
        label(x, String(score), V.x + 80, sy + 23, { size: 30, color: score ? '#7dffb0' : '#5a5290', shadow: false })
        x.restore()
        x.restore()
        // Gemini: a book in each hand, and the stack on its head grows
        const gp = pop01(t, S1.k + 0.25, 0.36, 2.2) * H.ok
        const n = S1.gag.filter(g => t >= g).length
        const r = drawStarChar(x, F.x, F.y, 168, t, { color: GEM.color, glyph: GEM.glyph, mood: n < 2 ? 'sparkle' : n === 2 ? 'wide' : 'happy', look: [Math.sin(t * 3) > 0 ? 1 : -1, 0], hops: GEM_HOPS, seed: 21, pop: gp, alpha: a })
        x.save(); x.globalAlpha *= a * clamp(gp)
        drawBits(x, BOOK, { C: '#e8628a', W: BONE }, r.x - 104, r.y + 18, 7 * gp, { rot: -0.3 })
        drawBits(x, BOOK, { C: SKY, W: BONE }, r.x + 104, r.y + 18, 7 * gp, { rot: 0.3 })
        for (let k = 0; k < Math.min(2, n); k++) {
          const land = ease.outBack(prog(t, S1.gag[k], S1.gag[k] + 0.25))
          drawBits(x, BOOK, { C: [LAV, '#f2c75c'][k], W: BONE }, r.x + (k ? -6 : 6), r.top - 6 - k * 24 - (1 - land) * 140, 8, { rot: k ? 0.08 : -0.06 })
        }
        x.restore()
        if (n === 3) { bubble(x, t, 'BZZT!', F.x + 110, F.y - 150, S1.gag[2], { tail: -1, fillC: '#7dffb0', size: 26, out: 1 - prog(t, S1.stamp + 0.6, S1.stamp + 0.8) }); sparkles(x, t, V.x + 80, V.y + 108, S1.gag[2], 8, 60, 1, ['#7dffb0', SKY, BONE]) }
        H.stamp(V.x, V.y - 40)
      },
    },
    {
      kicker: 'STOP 2 · WHAT TO TALK ABOUT', head: 'Talk | *ideas.*', stamp: 'ASK THIS',
      guide: (t) => ({ mood: t < S2.gag[0] ? 'happy' : t < S2.gag[2] ? 'sparkle' : t < S2.gag[2] + 0.6 ? 'wide' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const mv = ease.inOutCubic(prog(t, S2.gag[0] - 0.3, S2.gag[0]))
        H.talkCard(S2.k + 0.3, lerp(V.x, V.x + 110, mv), lerp(V.y, V.y - 110, mv), "What's a theory you'd defend at 2 AM?", { scale: lerp(1, 0.56, mv) })
        const lvl = S2.gag.filter(g => t >= g).length
        const lp = pop01(t, S2.k + 0.2, 0.36, 2.2) * H.ok
        const r = drawStarChar(x, F.x, F.y, 168, t, { color: LIB.color, glyph: LIB.glyph, mood: lvl === 0 ? 'neutral' : 'sparkle', look: [-1, -1], hops: LIB_HOPS, seed: 23, pop: lp, alpha: a })
        // a pixel light bulb over Libra, brighter with each theory
        if (lvl > 0) {
          x.save(); x.globalAlpha *= a * clamp(lp)
          const bxx = r.x + 92, byy = r.top + 6 + Math.sin(t * 4) * 4
          x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(bxx, byy, 0, bxx, byy, 40 + lvl * 20); g.addColorStop(0, 'rgba(255,240,170,0.6)'); g.addColorStop(1, 'rgba(255,240,170,0)'); x.fillStyle = g; x.fillRect(bxx - 100, byy - 100, 200, 200); x.restore()
          drawBits(x, ['.YYY.', 'YYWYY', 'YYYYY', 'YYYYY', '.YYY.', '.ggg.', '.ggg.'], { Y: '#ffe680', W: '#ffffff', g: '#9a94b0' }, bxx, byy, 6)
          x.restore()
        }
        const out = popOut(t, [S2.hOut[0], S2.hOut[1] + 0.2])
        bubble(x, t, 'aliens are shy.', F.x - 130, F.y - 118, S2.gag[0], { out, tail: 1 })
        bubble(x, t, 'cats know things.', F.x - 90, F.y - 196, S2.gag[1], { out, tail: 1 })
        bubble(x, t, 'pigeons run the city.', F.x - 110, F.y - 274, S2.gag[2], { out, tail: 1, fillC: LAV, size: 23 })
        for (const g of S2.gag) sparkles(x, t, F.x, F.y, g, 8, 110, 2, [SKY, LAV, BONE])
        H.stamp(V.x + 110, V.y - 110)
      },
    },
    {
      kicker: 'STOP 3 · WHAT TO SKIP', head: 'Skip the | *small* talk.', stamp: 'SKIP IT',
      guide: (t) => ({ mood: t < S3.gag[1] ? 'neutral' : t < S3.stamp ? 'sleepy' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S3.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        // the small-talk bubble, grey and enormous
        x.save(); x.globalAlpha *= a; x.translate(V.x, V.y - 20); x.scale(sp, sp)
        const w = 300, h = 110
        x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2, w + 12, h); x.fillRect(-w / 2, -h / 2 - 6, w, h + 12)
        x.fillStyle = '#a9a4b8'; x.fillRect(-w / 2, -h / 2, w, h)
        x.fillStyle = INK; x.fillRect(-20, h / 2, 40, 22); x.fillStyle = '#a9a4b8'; x.fillRect(-14, h / 2, 28, 14)
        x.restore()
        label(x, 'so... what', V.x, V.y - 44, { size: 30, color: '#3a3456', shadow: false, alpha: a * clamp(sp) })
        label(x, 'do you do?', V.x, V.y + 0, { size: 30, color: '#3a3456', shadow: false, alpha: a * clamp(sp) })
        // a tumbleweed rolls through
        const tp = prog(t, S3.k + 0.8, S3.k + 3.2)
        if (tp > 0 && tp < 1) {
          const tx = lerp(V.x + 260, V.x - 260, tp), ty = V.y + 90 - Math.abs(Math.sin(tp * 12)) * 26
          x.save(); x.globalAlpha *= a; drawBits(x, TUMBLE, { b: '#b58a50' }, tx, ty, 6, { rot: -tp * 14 }); x.restore()
        }
        // after the stamp: the weird question
        bubble(x, t, 'which soup are you, honestly?', V.x + 10, V.y + 108, NEWQ, { size: 22, fillC: SKY, tail: 1, out: H.ok })
        // Aquarius: yawns, droops, nods off… then wakes up sparkly
        const lv = S3.gag.filter(g => t >= g).length, woke = t >= NEWQ + 0.2
        const ap = pop01(t, S3.k + 0.3, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x + 10, F.y + 20, 168, t, { color: AQU.color, glyph: AQU.glyph, mood: woke ? 'sparkle' : t >= S3.stamp ? 'wide' : ['neutral', 'neutral', 'sleepy', 'sleepy'][lv], look: [0, -1], hops: AQU_HOPS, squash: woke ? 0 : [0, 0.04, 0.1, 0.16][lv], seed: 24, pop: ap, alpha: a })
        if (woke) sparkles(x, t, F.x + 10, F.y + 20, NEWQ + 0.2, 10, 120, 1, [SKY, LAV, BONE])
        H.stamp(V.x, V.y - 24)
      },
    },
  ],
  summit({ x, t, a }) {
    const crew = [GEM, LIB, AQU]
    crew.forEach((c, i) => {
      const p = pop01(t, T.sum.crew + i * 0.14, 0.36, 2.2) * popOut(t, T.out)
      if (p <= 0.01) return
      const P = CREW[i]
      drawStarChar(x, P.x, P.y, 150, t, { color: c.color, glyph: c.glyph, mood: t > T.sum.hLand ? 'heart' : 'happy', look: [0, 0], hops: CREW_HOPS.map(h => h + i * 0.08), seed: 30 + i, pop: p, alpha: a })
    })
    // paper planes looping over the summit
    const k0 = prog(t, T.sum.crew, T.sum.crew + 0.4) * popOut(t, T.out)
    if (k0 <= 0) return
    x.save(); x.globalAlpha *= a * k0
    for (let n = 0; n < 4; n++) {
      const ph = ((t - T.sum.crew) * 0.28 + n / 4) % 1
      const px = lerp(220, 980, ph), py = 380 + n * 90 + Math.sin(ph * 7 + n) * 40
      drawBits(x, PLANE, { W: n % 2 ? '#e8fbff' : LAV }, Math.round(px), Math.round(py), 6, { rot: Math.cos(ph * 7 + n) * 0.3 })
    }
    x.restore()
  },
  cues: [
    ['whoosh', S1.gag[0] - 0.1, 0.2, 0.02], ['pop', S1.gag[0] + 0.2, 523.25, 0.035, 0.2], ['whoosh', S1.gag[1] - 0.1, 0.2, 0.02], ['pop', S1.gag[1] + 0.2, 587.33, 0.035, 0.2],
    ['pop', S1.gag[2], 1567.98, 0.05, 0.3], ['tick', S1.gag[2], 0.07], ['bell', S1.gag[2] + 0.05, 1760, 0.03, 0.8, 0.3],
    ['tick', S2.k + 0.3, 0.05], ['whoosh', S2.k + 0.3, 0.25, 0.025],
    ...S2.gag.map((g, n) => ['pluck', g, [987.77, 1174.66, 1567.98][n], 0.04, 0.5, 0.1]), ['bell', S2.gag[0] + 0.05, 2093, 0.018, 0.6, 0.3],
    ['whoosh', S3.k + 0.8, 1.6, 0.03], ['pop', S3.gag[1], 392, 0.03, 0.2], ['pop', S3.gag[2], 329.63, 0.03, 0.2],
    ['pop', NEWQ, 1174.66, 0.045, 0], ['pluck', NEWQ + 0.2, 1567.98, 0.04, 0.6, 0.2], ['glitter', NEWQ + 0.2, NEWQ + 0.6],
    ['glitter', T.sum.crew + 0.2, T.sum.crew + 1.0], ['whoosh', T.sum.crew + 0.4, 0.8, 0.025], ['glitter', T.sum.hLand, T.sum.hLand + 0.8],
  ],
})
export const DURATION = 30
