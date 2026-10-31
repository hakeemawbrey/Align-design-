// sxfieldfire — FIRST-DATE FIELD GUIDE, entry 1: "Dating a Fire Sign." (30 s vertical, Star Talk Shows, show 7). funk · E.
// Story 0–25.6 on the shared trail-map kit (./guide.js), then the shared end card.
//   0.00–4.7   "Dating a | *Fire* sign."  The map unrolls. The gold backpack guide raises its binoculars: ♈ Aries and
//              ♌ Leo zoom across the map leaving flame trails; ♐ Sag zooms in, stops mid-map to wink, zooms off.
//              GUIDE: "fire signs: spotted at full speed. as usual."
//   4.75–9.8   STOP 1 · WHERE TO GO  "Somewhere with | *energy.*"  A night-market stall with string lights, a dance floor.
//              Aries dances on every beat. The guide copies: hop, hop… spin (its hat flies off and lands back). GO HERE.
//              GUIDE: "night market. dance class. keep it moving."
//   9.85–15.4  STOP 2 · WHAT TO TALK ABOUT  "Talk | *dreams.*"  A talk card: "What's a dream you haven't told anyone?"
//              Leo (crown) answers: "a world tour" → "my own restaurant" → "both. by friday." and glows brighter each
//              time; the guide puts on sunglasses. ASK THIS.  GUIDE: "ask about their dreams. then stand back."
//   15.45–20.7 STOP 3 · WHAT TO SKIP  "Skip the | *silent* movie."  A slow silent movie flickers; Sag nods off in a
//              cinema seat and its little flame shrinks, twice… SKIP IT slams, the flame roars back.
//              GUIDE: "slow silent movie? that's a nap, not a date."
//   20.75–25.45 the SUMMIT: "2ND DATE" flag; Aries, Leo and Sag hop up with sparklers.  "Bring a *spark.*"
//              GUIDE: "loud plans. big dreams. zero snoozing."
// ♓ Pisces cries at Pisces Pond. Card cut kept: 15.55. End card 25.6.
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { fieldGuide, T, BEAT, GOLD, BONE, INK, PINK, MONO, CREW, drawBits, sparkles, label, bubble, pop01, popOut } from './guide.js'

const ARI = signStar('aries'), LEO = signStar('leo'), SAG = signStar('sagittarius')
const FIRE = '#ff7a3d', YEL = '#ffd23f'
const [S1, S2, S3] = T.stops

const FLAME = ['...y...', '..yy...', '..yOy..', '.yOOy..', '.yORyO.', 'yORRROy', 'yORRROy', '.yORRy.', '..yyy..']
const FLAME_C = { y: YEL, O: '#ff9a2a', R: '#ff4f2e' }
const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }

function flame(x, t, cx, cy, k, seed = 0) {
  if (k <= 0.02) return
  const fl = 1 + 0.12 * Math.sin(t * 19 + seed) + 0.06 * Math.sin(t * 31 + seed * 2)
  drawBits(x, FLAME, FLAME_C, cx, cy - 26 * k, 6 * k, { sx: fl * (Math.sin(t * 11 + seed) > 0 ? 1 : -1) })
}

// beats the dance floor flashes on
const DANCE = Array.from({ length: 8 }, (_, n) => BEAT(9 + n)).filter(b => b > S1.k + 0.3 && b < S1.stamp + 1)
const ARI_HOPS = DANCE
const LEO_HOPS = [S2.k + 0.5, ...S2.gag.map(g => g + 0.02), S2.stamp + 0.1]
const SAG_HOPS = [S3.k + 0.45, S3.stamp + 0.06, S3.stamp + 0.45]
const CREW_HOPS = [T.sum.crew + 0.1, T.sum.hLand, T.sum.hLand + 0.55, 23.8, 24.3]

export const { SCENES, CUES: BASE_CUES } = fieldGuide({
  element: 'FIRE', accent: FIRE, accent2: YEL,
  h0: 'Dating a | *Fire* sign.',
  last: 'Bring a *spark.*',
  lines: [
    'fire signs: spotted at full speed. as usual.',
    'night market. dance class. keep it moving.',
    'ask about their dreams. then stand back.',
    "slow silent movie? that's a nap, not a date.",
    'loud plans. big dreams. zero snoozing.',
  ],
  wild: [
    { sign: 'aries', path: [-160, 780, 1240, 720, 120] },
    { sign: 'leo', path: [1240, 1010, -160, 1030, 80] },
    { sign: 'sagittarius', path: [-160, 860, 1240, 860, 70], stop: true, mood: 'wink' },
  ],
  trailFx(x, t, tx, ty, n, i, a) {
    const s = Math.max(2, 13 - n * 1.2)
    x.save(); x.globalAlpha *= a * (1 - n / 10)
    x.fillStyle = n < 3 ? YEL : n < 6 ? '#ff9a2a' : '#ff4f2e'
    x.fillRect(Math.round(tx - s / 2 + Math.sin(n * 2.3 + t * 20) * 5), Math.round(ty - s / 2 + Math.cos(n * 1.7) * 8), s, s)
    x.restore()
  },
  hookGuide: t => ({ mood: t < T.binoc[0] ? 'happy' : t < 3.4 ? 'wide' : 'happy', look: t < T.binoc[0] ? [0, 0] : [Math.sin(t * 2.4) > 0 ? 1 : -1, -1] }),
  guideHops: [...S1.gag, S2.gag[2] + 0.3],
  pisSob: [],
  stops: [
    {
      kicker: 'STOP 1 · WHERE TO GO', head: 'Somewhere with | *energy.*', stamp: 'GO HERE',
      guide: (t, lt) => ({
        mood: t < S1.gag[0] ? 'wide' : 'happy', look: t < S1.gag[0] ? [1, 0] : [0, 0],
        squash: t > S1.gag[2] && t < S1.gag[2] + 0.5 ? -0.1 * Math.sin((t - S1.gag[2]) * 30) : 0,
        hatLift: prog(t, S1.gag[2] + 0.05, S1.gag[2] + 0.7),
      }),
      scene(H) {
        const { x, t, V, F, a, ACC } = H
        const sp = pop01(t, S1.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        x.save(); x.globalAlpha *= a
        // the stall (awning stripes, counter, posts)
        const ax = V.x - 125, ay = V.y - 92, sc = sp
        x.save(); x.translate(V.x, V.y + 80); x.scale(sc, sc); x.translate(-V.x, -(V.y + 80))
        x.fillStyle = INK; x.fillRect(ax - 6, ay - 6, 262, 70)
        for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? BONE : ACC; x.fillRect(ax + k * 31.25, ay, 31.25, 52); x.fillRect(ax + k * 31.25 + 4, ay + 52, 23, 8) }
        x.fillStyle = INK; x.fillRect(ax + 6, ay + 60, 8, 92); x.fillRect(ax + 236, ay + 60, 8, 92)
        x.fillStyle = '#7a4f2e'; x.fillRect(ax - 4, ay + 140, 258, 46); x.fillStyle = '#9a6a3c'; x.fillRect(ax - 4, ay + 140, 258, 10)
        x.fillStyle = INK; x.fillRect(ax - 8, ay + 186, 266, 6)
        // goods on the counter: lanterns + steaming bowls
        for (let k = 0; k < 3; k++) {
          const gx = ax + 40 + k * 82
          x.fillStyle = INK; x.fillRect(gx - 22, ay + 112, 44, 30); x.fillStyle = k === 1 ? YEL : '#e9dcc4'; x.fillRect(gx - 18, ay + 116, 36, 22)
          x.globalAlpha *= 0.7; x.fillStyle = BONE
          for (let s = 0; s < 3; s++) { const ph = (t * 0.9 + s / 3 + k * 0.2) % 1; x.fillRect(gx - 10 + s * 9 + Math.sin(ph * 6) * 3, ay + 104 - ph * 40, 5, 5) }
          x.globalAlpha /= 0.7
        }
        label(x, 'NIGHT MARKET', V.x, ay - 30, { size: 26, color: YEL })
        x.restore()
        // string lights (blink on the beat)
        const beat = Math.floor((t - 0.6) / 0.5556)
        for (let k = 0; k < 9; k++) {
          const u = k / 8, lx = lerp(ax - 210, ax + 4, u), ly = ay - 4 + Math.sin(Math.PI * u) * 46
          const on = (k + beat) % 3 !== 0
          x.fillStyle = INK; x.fillRect(lx - 8, ly - 2, 16, 18)
          x.fillStyle = on ? [YEL, PINK, '#7fe0ff'][k % 3] : '#3a3360'; x.fillRect(lx - 5, ly + 1, 10, 12)
          if (on) { x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * sp; x.fillStyle = [YEL, PINK, '#7fe0ff'][k % 3]; x.fillRect(lx - 12, ly - 5, 24, 24); x.restore() }
        }
        // the dance floor under Aries
        for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) {
          const lit = (i + j + beat) % 2 === 0
          x.fillStyle = INK; x.fillRect(F.x - 150 + i * 75, F.y + 74 + j * 26, 75, 26)
          x.fillStyle = lit ? [PINK, YEL, '#7fe0ff', FIRE][(i + beat) % 4] : '#2a2152'; x.fillRect(F.x - 147 + i * 75, F.y + 77 + j * 26, 69, 20)
        }
        label(x, 'DANCE CLASS', F.x, F.y + 146, { size: 20, color: BONE, alpha: 0.85 })
        x.restore()
        // Aries dancing
        const dn = DANCE.filter(b => b <= t).length
        const ap = pop01(t, S1.k + 0.25, 0.36, 2.2) * H.ok
        drawStarChar(x, F.x + (dn % 2 ? 14 : -14), F.y, 168, t, { color: ARI.color, glyph: ARI.glyph, mood: t < S1.stamp + 0.1 ? 'happy' : 'heart', look: [dn % 2 ? 1 : -1, 0], hops: ARI_HOPS, squash: dn % 2 ? 0.05 : -0.05, seed: 21, pop: ap, alpha: a })
        if (t > S1.gag[2]) sparkles(x, t, F.x, F.y, S1.gag[2], 8, 120, 1, [ACC, YEL, BONE])
        H.stamp(V.x, V.y - 30)
      },
    },
    {
      kicker: 'STOP 2 · WHAT TO TALK ABOUT', head: 'Talk | *dreams.*', stamp: 'ASK THIS',
      guide: (t, lt) => ({ mood: t < S2.gag[0] ? 'happy' : t < S2.gag[2] + 0.2 ? 'wide' : 'happy', look: t < S2.gag[0] ? [1, -1] : [1, 0], shades: prog(t, S2.gag[2] + 0.25, S2.gag[2] + 0.55) }),
      scene(H) {
        const { x, t, V, F, a } = H
        // the talk card: centre stage, then it tucks up to the corner for the answers
        const mv = ease.inOutCubic(prog(t, S2.gag[0] - 0.3, S2.gag[0]))
        H.talkCard(S2.k + 0.3, lerp(V.x, V.x + 110, mv), lerp(V.y, V.y - 110, mv), "What's a dream you haven't told anyone?", { scale: lerp(1, 0.56, mv) })
        // Leo: glows brighter with each dream
        const lvl = S2.gag.filter(g => t >= g).length
        const lp = pop01(t, S2.k + 0.2, 0.36, 2.2) * H.ok
        if (lvl > 0) {
          const R = 120 + lvl * 70 + 8 * Math.sin(t * 8)
          x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = a * lp * (0.25 + lvl * 0.18)
          const g = x.createRadialGradient(F.x, F.y, 0, F.x, F.y, R); g.addColorStop(0, '#fff3c0'); g.addColorStop(0.4, '#ffb35a88'); g.addColorStop(1, '#ff7a3d00')
          x.fillStyle = g; x.beginPath(); x.arc(F.x, F.y, R, 0, 7); x.fill()
          for (let k = 0; k < 12; k++) { const an = k / 12 * Math.PI * 2 + t * 0.6; x.fillStyle = '#ffe9a8'; x.fillRect(F.x + Math.cos(an) * R * 0.95 - 4, F.y + Math.sin(an) * R * 0.95 - 4, 8, 8) }
          x.restore()
        }
        const r = drawStarChar(x, F.x, F.y, 168, t, { color: LEO.color, glyph: LEO.glyph, mood: lvl === 0 ? 'neutral' : lvl < 3 ? 'sparkle' : 'happy', look: [-1, -1], hops: LEO_HOPS, seed: 23, pop: lp, alpha: a, glow: 1 + lvl * 0.3 })
        const cell = Math.max(1, Math.round(168 * lp / 36))
        x.save(); x.globalAlpha *= a * clamp(lp)
        drawBits(x, CROWN, CROWN_C, r.x, r.top + cell * 0.4, cell * 0.95, { rot: 0.12 })
        x.restore()
        const out = popOut(t, [S2.hOut[0], S2.hOut[1] + 0.2])
        bubble(x, t, 'a world tour', F.x - 130, F.y - 118, S2.gag[0], { out, tail: 1 })
        bubble(x, t, 'my own restaurant', F.x - 90, F.y - 196, S2.gag[1], { out, tail: 1 })
        bubble(x, t, 'both. by friday.', F.x - 110, F.y - 274, S2.gag[2], { out, tail: 1, fillC: YEL, size: 24 })
        for (const g of S2.gag) sparkles(x, t, F.x, F.y, g, 8, 110 + 30 * S2.gag.indexOf(g), 2, [YEL, '#ff9a2a', BONE])
        H.stamp(V.x + 110, V.y - 110)
      },
    },
    {
      kicker: 'STOP 3 · WHAT TO SKIP', head: 'Skip the | *silent* movie.', stamp: 'SKIP IT',
      guide: (t, lt) => ({ mood: t < S3.gag[1] ? 'neutral' : t < S3.stamp ? 'eyeroll' : 'happy', look: [1, -1] }),
      scene(H) {
        const { x, t, V, F, a } = H
        const sp = pop01(t, S3.k + 0.05, 0.4, 2) * H.ok
        if (sp <= 0.01) return
        x.save(); x.globalAlpha *= a
        x.save(); x.translate(V.x, V.y); x.scale(sp, sp); x.translate(-V.x, -V.y)
        // the screen: flickering grey film, no sound
        const w = 280, h = 170, sx = V.x - w / 2, sy = V.y - h / 2 - 10
        x.fillStyle = INK; x.fillRect(sx - 12, sy - 12, w + 24, h + 24)
        x.fillStyle = '#3a3360'; x.fillRect(sx - 6, sy - 6, w + 12, h + 12)
        const fl = 0.85 + 0.15 * Math.sin(t * 37) * Math.sin(t * 11)
        x.fillStyle = `rgb(${Math.round(150 * fl)},${Math.round(146 * fl)},${Math.round(160 * fl)})`; x.fillRect(sx, sy, w, h)
        // a very slow grey landscape crawl
        x.fillStyle = '#8c8898'
        for (let k = 0; k < 7; k++) { const hx = sx + ((k * 50 - (t - S3.k) * 6) % 330 + 330) % 330 - 20; if (hx > sx - 10 && hx < sx + w - 30) x.fillRect(Math.max(sx, hx), sy + h - 50 - (k % 3) * 14, 40, 50 + (k % 3) * 14) }
        // film scratches
        x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(sx + ((t * 97) % w), sy, 2, h)
        x.fillStyle = 'rgba(30,26,40,0.9)'; x.fillRect(sx + 40, sy + 26, w - 80, 34)
        label(x, '(part 1 of 4)', V.x, sy + 43, { size: 18, color: '#d9d4e0', shadow: false })
        label(x, 'THE SLOW SILENT MOVIE', V.x, sy - 34, { size: 22, color: '#b9b0e0' })
        x.restore()
        // the cinema seat behind Sag
        const sp2 = pop01(t, S3.k + 0.15, 0.36, 2) * H.ok
        x.save(); x.translate(F.x, F.y + 60); x.scale(sp2, sp2)
        x.fillStyle = INK; x.fillRect(-104, -120, 208, 214); x.fillStyle = '#a3243b'; x.fillRect(-98, -114, 196, 150); x.fillStyle = '#c73a52'; x.fillRect(-98, -114, 196, 16)
        x.fillStyle = '#7d1a2d'; x.fillRect(-98, 40, 196, 48)
        x.restore()
        x.restore()
        // Sag nodding off; its flame shrinks twice, then roars back on the stamp
        const sl = S3.gag.filter(g => t >= g).length
        const awake = t >= S3.stamp
        const sgp = pop01(t, S3.k + 0.3, 0.36, 2.2) * H.ok
        const r = drawStarChar(x, F.x, F.y, 168, t, { color: SAG.color, glyph: SAG.glyph, mood: awake ? (t < S3.stamp + 0.6 ? 'wide' : 'happy') : sl === 0 ? 'neutral' : 'sleepy', look: [0, -1], blink: awake ? false : undefined, hops: SAG_HOPS, squash: awake ? 0 : 0.05 * sl, seed: 24, pop: sgp, alpha: a })
        const fk = awake ? 1.5 - 0.4 * prog(t, S3.stamp, S3.stamp + 0.6) : [1, 0.6, 0.28][Math.min(2, sl)]
        x.save(); x.globalAlpha *= a * clamp(sgp); flame(x, t, r.x, r.top + 4, fk, 2); x.restore()
        if (awake) sparkles(x, t, r.x, r.top, S3.stamp, 10, 100, 1, [YEL, FIRE, BONE])
        H.stamp(V.x, V.y - 10)
      },
    },
  ],
  summit({ x, t, lt, a }) {
    const crew = [ARI, LEO, SAG]
    crew.forEach((c, i) => {
      const p = pop01(t, T.sum.crew + i * 0.14, 0.36, 2.2) * popOut(t, T.out)
      if (p <= 0.01) return
      const P = CREW[i]
      const r = drawStarChar(x, P.x, P.y, 150, t, { color: c.color, glyph: c.glyph, mood: t > T.sum.hLand ? 'heart' : 'happy', look: [0, 0], hops: CREW_HOPS.map(h => h + i * 0.08), seed: 30 + i, pop: p, alpha: a })
      // a sparkler, fizzing
      const hx = r.x + (i === 1 ? -70 : 70), hy = r.y - 40
      x.save(); x.globalAlpha *= a * clamp(p)
      x.fillStyle = '#c9c2dd'; x.fillRect(hx - 2, hy, 4, 46)
      for (let k = 0; k < 10; k++) {
        const an = k * 2.4 + t * 13, rr = 10 + ((t * 60 + k * 7) % 26)
        x.fillStyle = k % 2 ? YEL : '#fff4c8'; x.fillRect(Math.round(hx + Math.cos(an) * rr) - 2, Math.round(hy + Math.sin(an) * rr) - 2, 5, 5)
      }
      x.restore()
    })
  },
  cues: [
    ...DANCE.map((b, n) => ['pop', b, [880, 1174.66, 987.77, 1318.51][n % 4], 0.028, n % 2 ? 0.3 : -0.3]),
    ['whoosh', S1.gag[2] + 0.05, 0.35, 0.03], ['pop', S1.gag[2] + 0.66, 1318.51, 0.035, -0.3],
    ['tick', S2.k + 0.3, 0.05], ['whoosh', S2.k + 0.3, 0.25, 0.025],
    ...S2.gag.map((g, n) => ['pluck', g, [987.77, 1174.66, 1567.98][n], 0.04, 0.5, 0.1]), ['glitter', S2.gag[2], S2.gag[2] + 0.5],
    ['tick', S2.gag[2] + 0.5, 0.06], ['bell', S2.gag[2] + 0.55, 2093, 0.02, 0.8, -0.4],
    ['pop', S3.gag[0], 440, 0.03, 0.2], ['pop', S3.gag[1], 349.23, 0.03, 0.2], ['whoosh', S3.stamp + 0.04, 0.4, 0.05], ['glitter', S3.stamp + 0.05, S3.stamp + 0.45],
    ['glitter', T.sum.crew + 0.2, T.sum.crew + 1.0], ['glitter', T.sum.hLand, T.sum.hLand + 0.8],
  ],
})
export const CUES = BASE_CUES
export const DURATION = 30
