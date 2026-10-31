// sxfieldwater — FIRST-DATE FIELD GUIDE, entry 4: "Dating a Water Sign." (30 s vertical, Star Talk Shows, show 7). dreamy · Db.
// Story 0–25.6 on the shared trail-map kit (./guide.js, same look as sxfieldfire), then the shared end card.
//   0.00–4.7   "Dating a | *Water* sign."  The map unrolls; binoculars up. ♋ Cancer scuttles across sideways, ♏ Scorpio
//              glides by, all mystery… and the third water sign? The binoculars find ♓ Pisces, already crying at the pond.
//              GUIDE: "water signs: deep, soft, feeling everything."
//   4.75–9.8   STOP 1 · WHERE TO GO  "Somewhere | *quiet.*"  A quiet café window, two steaming mugs, a telescope.
//              Cancer sips… the stars come out… a shooting star. Heart-eyes. GO HERE.
//              GUIDE: "a quiet café. a stargazing walk. soft light."
//   9.85–15.4  STOP 2 · WHAT TO TALK ABOUT  "Talk | *feelings.*"  Talk card: "What made you feel at home lately?"
//              Scorpio: "my grandma's soup." → "a long voicemail." → "…honestly? this." (blushes). ASK THIS.
//              GUIDE: "ask how they feel. let the answer be long."
//   15.45–20.7 STOP 3 · WHAT TO SKIP  "Skip the | *rush.*"  Rushed questions fly in from off-screen: "so are we exclusive?"
//              → "meet my mom sunday?" → "first dance song??" Cancer backs away, smaller each time. SKIP IT. A calm bubble:
//              "no rush. tell me about you." Cancer comes back.  GUIDE: "rush them and they retreat. let it unfold."
//   20.75–25.45 the SUMMIT: "2ND DATE" flag; Cancer, Scorpio and Pisces (happy tears) hop up under drifting bubbles.
//              "Go *deep.* Gently."  GUIDE: "slow is the fast way with water signs."
// ♓ Pisces cries at Pisces Pond (here it is also the hook's third water sign). Card cut kept: 15.55. End card 25.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { fieldGuide, T, BONE, INK, PINK, GOLD, CREW, drawBits, sparkles, label, bubble, pop01, popOut } from './guide.js'

const CAN = signStar('cancer'), SCO = signStar('scorpio'), PIS = signStar('pisces')
const BLUE = '#6fb6ff', LAV = '#c9a6ff'
const [S1, S2, S3] = T.stops

const MUG = ['.MMMM..', 'MMMMMhh', 'MMMMM.h', 'MMMMMhh', 'MMMMM..', '.MMM...']
const SCOPE = ['.......TT', '.....TTTT', '...TTTT..', '.TTTT....', 'TTT......', '...l.....', '..l.l....', '.l...l...']
const CAN_HOPS = [S1.k + 0.4, ...S1.gag.map(g => g + 0.05), S1.stamp + 0.1]
const SCO_HOPS = [S2.k + 0.5, S2.gag[0] + 0.02, S2.gag[1] + 0.02, S2.stamp + 0.1]
const CAN3_HOPS = [S3.k + 0.45, S3.stamp + 0.75, S3.stamp + 1.1]
const CREW_HOPS = [T.sum.crew + 0.1, T.sum.hLand, T.sum.hLand + 0.55, 23.8, 24.3]
const CALM = S3.stamp + 0.5

export const { SCENES, CUES } = fieldGuide({
  element: 'WATER', accent: BLUE, accent2: LAV,
  h0: 'Dating a | *Water* sign.',
  last: 'Go *deep.* | Gently.', lastLate: 2,
  lines: [
    'water signs: deep, soft, feeling everything.',
    'a quiet café. a stargazing walk. soft light.',
    'ask how they feel. let the answer be long.',
    'rush them and they retreat. let it unfold.',
    'slow is the fast way with water signs.',
  ],
  wild: [
    { sign: 'cancer', path: [-160, 800, 1240, 780, 20], dur: 2.0, walk: true, mood: 'happy' },
    { sign: 'scorpio', path: [1240, 1000, -160, 1000, 50], dur: 1.3 },
    { sign: 'pisces', pond: true },
  ],
  pisSob: [2.95, 3.3, 3.65, 4.0],
  trailFx(x, t, tx, ty, n, i, a) {
    if (n % 2) return
    x.save(); x.globalAlpha *= a * (1 - n / 10)
    const r = 4 + (n % 3) * 2, bx = Math.round(tx + Math.sin(n * 1.9) * 14), by = Math.round(ty - n * 4 + Math.cos(n) * 10)
    x.fillStyle = '#bfe2ff'; x.fillRect(bx - r, by - r + 2, 2, 2 * r - 4); x.fillRect(bx + r - 2, by - r + 2, 2, 2 * r - 4); x.fillRect(bx - r + 2, by - r, 2 * r - 4, 2); x.fillRect(bx - r + 2, by + r - 2, 2 * r - 4, 2)
    x.fillStyle = '#ffffff'; x.fillRect(bx - r + 3, by - r + 3, 2, 2)
    x.restore()
  },
  // binoculars sweep: left, right… then they land on the pond (the third water sign, crying)
  hookGuide: t => ({ mood: t < T.binoc[0] ? 'happy' : t < 2.9 ? 'wide' : t < 3.9 ? 'neutral' : 'happy', look: t < T.binoc[0] ? [0, 0] : t < 2.9 ? [Math.sin(t * 2.4) > 0 ? 1 : -1, -1] : [1, 0] }),
  guideHops: [S2.gag[2] + 0.4],
  stops: [
    {
      kicker: 'STOP 1 · WHERE TO GO', head: 'Somewhere | *quiet.*', stamp: 'GO HERE',
      guide: (t) => ({ mood: t < S1.gag[2] ? 'happy' : 'sparkle', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S1.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        x.save(); x.globalAlpha *= a
        x.save(); x.translate(V.x, V.y + 60); x.scale(sp, sp); x.translate(-V.x, -(V.y + 60))
        // the café window (night sky inside: stars come out, then a shooting star)
        const wx = V.x - 120, wy = V.y - 110, ww = 240, wh = 130
        x.fillStyle = INK; x.fillRect(wx - 10, wy - 10, ww + 20, wh + 20)
        x.fillStyle = '#7a4f2e'; x.fillRect(wx - 6, wy - 6, ww + 12, wh + 12)
        x.fillStyle = '#0d1a3a'; x.fillRect(wx, wy, ww, wh)
        x.save(); x.beginPath(); x.rect(wx, wy, ww, wh); x.clip()
        const so = prog(t, S1.gag[1], S1.gag[1] + 0.5)
        for (let k = 0; k < 11; k++) {
          const sx = wx + 14 + ((k * 73) % (ww - 28)), sy = wy + 12 + ((k * 41) % (wh - 30))
          if (so * 11 > k) drawPixelStar(x, sx, sy, 10 + (k % 3) * 4, k % 2 ? 1 : 2, k % 3 ? BONE : '#bfe2ff')
        }
        const ss = prog(t, S1.gag[2], S1.gag[2] + 0.5)
        if (ss > 0 && ss < 1) { const sx = lerp(wx + ww + 20, wx - 40, ss), sy = lerp(wy + 10, wy + wh - 20, ss); for (let k = 0; k < 8; k++) { x.globalAlpha = (1 - k / 8); x.fillStyle = k ? '#bfe2ff' : '#ffffff'; x.fillRect(sx + k * 12, sy - k * 5, 8, 8) } x.globalAlpha = 1 }
        x.restore()
        x.fillStyle = '#7a4f2e'; x.fillRect(V.x - 3, wy, 6, wh); x.fillRect(wx, wy + wh / 2 - 3, ww, 6)
        label(x, 'QUIET CAFE', V.x, wy - 36, { size: 26, color: BLUE })
        // the table + two mugs
        const ty = V.y + 70
        x.fillStyle = INK; x.fillRect(V.x - 124, ty - 4, 248, 30); x.fillStyle = '#9a6a3c'; x.fillRect(V.x - 120, ty, 240, 20)
        x.fillStyle = INK; x.fillRect(V.x - 8, ty + 24, 16, 60)
        drawBits(x, MUG, { M: '#f5ecd9', h: '#f5ecd9' }, V.x - 50, ty - 22, 6)
        drawBits(x, MUG, { M: LAV, h: LAV }, V.x + 40, ty - 22, 6, { sx: -1 })
        x.globalAlpha *= 0.75; x.fillStyle = BONE
        for (const mx of [V.x - 54, V.x + 42]) for (let s = 0; s < 3; s++) { const ph = (t * 0.6 + s / 3 + mx * 0.01) % 1; x.fillRect(mx - 6 + s * 6 + Math.sin(ph * 6 + s) * 5, ty - 46 - ph * 46, 5, 5) }
        x.restore()
        // the telescope on the right
        drawBits(x, SCOPE, { T: '#c9c2dd', l: '#7a7290' }, V.x + 160, V.y + 50, 8)
        x.restore()
        const n = S1.gag.filter(g => t >= g).length
        const cp = pop01(t, S1.k + 0.25, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x, F.y, 168, t, { color: CAN.color, glyph: CAN.glyph, mood: n === 0 ? 'neutral' : n === 1 ? 'happy' : n === 2 ? 'sparkle' : 'heart', look: [0, -1], hops: CAN_HOPS, seed: 21, pop: cp, alpha: a })
        if (n === 3) sparkles(x, t, F.x, F.y, S1.gag[2] + 0.2, 8, 110, 1, [BLUE, PINK, BONE])
        H.stamp(V.x, V.y - 46)
      },
    },
    {
      kicker: 'STOP 2 · WHAT TO TALK ABOUT', head: 'Talk | *feelings.*', stamp: 'ASK THIS',
      guide: (t) => ({ mood: t < S2.gag[2] ? 'happy' : 'heart', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const mv = ease.inOutCubic(prog(t, S2.gag[0] - 0.3, S2.gag[0]))
        H.talkCard(S2.k + 0.3, lerp(V.x, V.x + 110, mv), lerp(V.y, V.y - 110, mv), 'What made you feel at home lately?', { scale: lerp(1, 0.56, mv) })
        const lvl = S2.gag.filter(g => t >= g).length
        const sp = pop01(t, S2.k + 0.2, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x, F.y, 168, t, { color: SCO.color, glyph: SCO.glyph, mood: lvl === 0 ? 'squint' : lvl < 3 ? 'neutral' : 'happy', look: lvl < 3 ? [-1, -1] : [0, 0], blush: lvl === 3 ? 1 : 0, hops: SCO_HOPS, squash: lvl === 3 ? 0.06 : 0, seed: 23, pop: sp, alpha: a })
        if (lvl === 3) {   // a little heart floats up as Scorpio admits it
          const hp = prog(t, S2.gag[2] + 0.2, S2.gag[2] + 1.6)
          if (hp > 0 && hp < 1) drawBits(x, ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86', W: '#ffd1de' }, F.x + 80, F.y - 60 - hp * 120, 7, { alpha: Math.sin(Math.PI * hp) })
        }
        const out = popOut(t, [S2.hOut[0], S2.hOut[1] + 0.2])
        bubble(x, t, "my grandma's soup.", F.x - 120, F.y - 118, S2.gag[0], { out, tail: 1 })
        bubble(x, t, 'a long voicemail.', F.x - 90, F.y - 196, S2.gag[1], { out, tail: 1 })
        bubble(x, t, '...honestly? this.', F.x - 110, F.y - 274, S2.gag[2], { out, tail: 1, fillC: PINK, size: 24 })
        sparkles(x, t, F.x, F.y, S2.gag[2], 10, 120, 2, [PINK, BLUE, BONE])
        H.stamp(V.x + 110, V.y - 110)
      },
    },
    {
      kicker: 'STOP 3 · WHAT TO SKIP', head: 'Skip the | *rush.*', stamp: 'SKIP IT',
      guide: (t) => ({ mood: t < S3.gag[0] ? 'neutral' : t < S3.stamp ? 'wide' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        // rushed questions fly in from the left, one on top of the other
        const out = H.ok * (1 - prog(t, S3.stamp + 0.3, S3.stamp + 0.5) * 0.65)
        const Q = ['so are we exclusive?', 'meet my mom sunday?', 'first dance song??']
        Q.forEach((q, k) => {
          const g = S3.gag[k], fly = ease.outCubic(prog(t, g - 0.12, g + 0.18))
          if (t < g - 0.12) return
          x.save(); x.globalAlpha *= a * out
          bubble(x, t, q, lerp(V.x - 420, V.x - 20 + k * 22, fly), V.y - 90 + k * 78, g - 0.12, { tail: -1, size: 22 + k * 2, fillC: k === 2 ? '#ffb0b0' : BONE })
          // speed lines
          if (fly < 1) { x.fillStyle = BONE; for (let s = 0; s < 3; s++) x.fillRect(lerp(V.x - 600, V.x - 200, fly) - s * 60, V.y - 100 + k * 78 + s * 10, 50, 4) }
          x.restore()
        })
        // after the stamp: the calm version
        bubble(x, t, 'no rush. tell me about you.', V.x + 20, V.y + 140, CALM, { size: 22, fillC: BLUE, tail: 1, out: H.ok })
        // Cancer backs away (and shrinks) with each question, then drifts back
        const n = S3.gag.filter(g => t >= g).length
        const back = t >= CALM ? 1 - ease.inOutCubic(prog(t, CALM + 0.2, CALM + 0.8)) : 1
        const shy = [0, 1, 2, 3][n] * back
        const cp = pop01(t, S3.k + 0.3, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x + 20 + shy * 36, F.y + 30 + shy * 8, 168 * (1 - shy * 0.1), t, { color: CAN.color, glyph: CAN.glyph, mood: t >= CALM + 0.6 ? 'happy' : n === 0 ? 'neutral' : 'wide', look: [-1, 0], blink: n && t < CALM ? false : undefined, hops: CAN3_HOPS, squash: n && t < CALM ? 0.04 * Math.sin(t * 50) : 0, seed: 24, pop: cp, alpha: a })
        if (t >= CALM + 0.6) sparkles(x, t, F.x + 20, F.y + 30, CALM + 0.6, 8, 110, 1, [BLUE, LAV, BONE])
        H.stamp(V.x, V.y - 10)
      },
    },
  ],
  summit({ x, t, a }) {
    const crew = [CAN, SCO, PIS]
    crew.forEach((c, i) => {
      const p = pop01(t, T.sum.crew + i * 0.14, 0.36, 2.2) * popOut(t, T.out)
      if (p <= 0.01) return
      const P = CREW[i]
      const r = drawStarChar(x, P.x, P.y, 150, t, { color: c.color, glyph: c.glyph, mood: i === 2 ? 'happy' : t > T.sum.hLand ? 'heart' : 'happy', look: [0, 0], hops: CREW_HOPS.map(h => h + i * 0.08), seed: 30 + i, pop: p, alpha: a })
      if (i === 2) {   // happy tears
        x.save(); x.globalAlpha *= a * clamp(p)
        for (let k = 0; k < 4; k++) { const ph = (t * 1.4 + k / 4) % 1, side = k % 2 ? 1 : -1; x.fillStyle = '#7fd0ff'; x.fillRect(Math.round(r.x + side * (14 + ph * 26)), Math.round(r.y + ph * ph * 60), 6, 8) }
        x.restore()
      }
    })
    // bubbles drifting up
    const k0 = prog(t, T.sum.crew, T.sum.crew + 0.4) * popOut(t, T.out)
    if (k0 <= 0) return
    x.save(); x.globalAlpha *= a * k0 * 0.85
    for (let n = 0; n < 14; n++) {
      const ph = ((t - T.sum.crew) * 0.18 + n / 14) % 1
      const bx = Math.round(260 + ((n * 151) % 640) + Math.sin(ph * 8 + n) * 20), by = Math.round(900 - ph * 560), r = 6 + (n % 3) * 3
      x.fillStyle = '#bfe2ff'; x.fillRect(bx - r, by - r + 2, 2, 2 * r - 4); x.fillRect(bx + r - 2, by - r + 2, 2, 2 * r - 4); x.fillRect(bx - r + 2, by - r, 2 * r - 4, 2); x.fillRect(bx - r + 2, by + r - 2, 2 * r - 4, 2)
      x.fillStyle = '#ffffff'; x.fillRect(bx - r + 3, by - r + 3, 2, 2)
    }
    x.restore()
  },
  cues: [
    ['pop', 2.95, 440, 0.035, 0.6], ['pop', 3.3, 415.3, 0.03, 0.6], ['pop', 3.65, 392, 0.03, 0.6],
    ['pop', S1.gag[0], 587.33, 0.03, 0.2], ['glitter', S1.gag[1], S1.gag[1] + 0.5], ['whoosh', S1.gag[2], 0.4, 0.03], ['bell', S1.gag[2] + 0.3, 2093, 0.025, 1.2, 0.3],
    ['tick', S2.k + 0.3, 0.05], ['whoosh', S2.k + 0.3, 0.25, 0.025],
    ...S2.gag.map((g, n) => ['pluck', g, [987.77, 1174.66, 1567.98][n], 0.04, 0.5, 0.1]), ['bell', S2.gag[2] + 0.25, 1760, 0.025, 1.0, 0.2],
    ...S3.gag.flatMap((g, n) => [['whoosh', g - 0.15, 0.3, 0.04], ['pop', g + 0.15, [880, 987.77, 1174.66][n], 0.035, -0.4]]),
    ['pop', CALM, 739.99, 0.04, 0], ['pluck', CALM + 0.6, 1174.66, 0.04, 0.7, 0.2], ['glitter', CALM + 0.6, CALM + 1.0],
    ['glitter', T.sum.crew + 0.2, T.sum.crew + 1.0], ['glitter', T.sum.hLand, T.sum.hLand + 0.8],
  ],
})
export const DURATION = 30
