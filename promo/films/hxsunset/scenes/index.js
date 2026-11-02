// hxsunset (30 s vertical Align ad, "Star Talk Explains", the Houston sky) · story 0–25.6, then the end card.
//   ❓ "Why are Houston sunsets so *pink*?"  ☀ THE SUN teaches ♎ LIBRA at the chalkboard:
//   ✓ at sunset sunlight crosses more air, so blue scatters away and reds and oranges reach you (a chalk Earth curve with
//     its band of air, a short noon ray and a long sunset ray, blue chalk dots scattering off the long one, the end of it
//     turning red);
//   ✓ haze and clouds catch the colour (pink-lit chalk clouds);
//   ♥ sunsets are free; bring someone (two little silhouettes and a heart on the curve).
//   💡 Libra: "free, pink, *and* romantic? say less." Last line (the Sun): "Free show. *Every* night."
// Rewatch bait: a tiny Pisces sits on top of the chalkboard frame, sobbing at the chalk sunset.
// The engine is ./classkit.js (st13sunsign's, with one cardfx cut and no numeral); the Sun is ./kit.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { drawSun } from './kit.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const LIB = signStar('libra')
const PIS = signStar('pisces')
const TAU = Math.PI * 2
const EC = { x: 470, y: 1520 }, ER = 640, AR = 720       // the Earth's curve and the top of its air, on the board
const OBS = { x: 470, y: EC.y - ER }                      // you, standing on the curve (y 880)
const NOON = { x: 470, y: 590 }, LOW = { x: 168, y: 866 }  // the Sun overhead, and low at sunset

function sunTeacher(x, X, Y, s, t, o = {}) {
  const cell = Math.max(3, Math.round(s / 40))
  let lift = 0
  for (const h of o.hops || []) { const d = t - h; if (d >= 0 && d < 0.4) lift = Math.max(lift, Math.sin(Math.PI * d / 0.4)) }
  const y = Y + Math.sin(t * 2 + 1) * 6 - lift * 16
  const eyes = o.mood === 'happy' ? 'happy' : o.mood === 'squint' ? 'half' : 'open'
  drawSun(x, X, y, cell, t, { eyes, look: o.look || [0, 0], rot: Math.sin(t * 0.8) * 0.06, wink: o.mood === 'wink' ? 1 : 0 })
  return { x: X, y, top: y - cell * 18 }
}

// a tiny background Pisces with two fat tear streams (the series' running gag)
function sobbingPisces(x, t, X, Y, s, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const r = drawStarChar(x, X, Y, s, t, { color: PIS.color, mood: 'sparkle', look: [-1, 1], seed: 12, bob: 2, glow: 0.5, tips: false })
  const cell = s / 36, ey = r.y + 1.2 * cell, dx = 4.6 * cell, px = Math.max(3, Math.round(cell))
  for (const side of [-1, 1]) {
    const len = px * (6 + 2 * Math.sin(t * 7 + side))
    R(x, '#7fd8ff', X + side * dx - px * 0.6, ey + px, px * 1.3, len)
    const ph = (t * 1.5 + (side > 0 ? 0.4 : 0)) % 1
    x.save(); x.globalAlpha *= 1 - ph; R(x, '#7fd8ff', X + side * dx - px * 0.5, ey + px + len + ph * px * 12, px, px * 1.6); x.restore()
  }
  x.restore()
}

const EP = makeEpisode({
  id: 'hxsunset', duration: 30, key: 'F',
  q: 'Why are Houston sunsets | so *pink*?', qAccent: EX.chalkPink,
  teacher: { tag: '☀ THE SUN', color: '#ffc94d', accent: '#ffd76a', pitch: 392, size: 240, draw: sunTeacher },
  student: { tag: '♎ LIBRA', color: LIB.color, pitch: 698,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: LIB.color, glyph: LIB.glyph, ...o }) },
  board: { title: 'THE SUNSET' },
  lines: [
    ['s', 'these sunsets look *filtered*. who did this?'],
    ['t', 'At sunset, my light crosses *more air*.', { tag: 'sky' }],
    ['t', 'Blue scatters away. *Reds* get through.'],
    ['t', 'Haze and clouds *catch* that colour.', { tag: 'sky' }],
    ['t', 'Tip: sunsets are free. *Bring* someone.', { tag: 'tip' }],
    ['s', 'free, pink, *and* romantic? say less.', { bulb: true, hold: 1.3 }],
  ],
  recap: ['Light crosses *more air*', 'Blue scatters; *reds* reach you', 'Haze and clouds *catch* it'],
  last: 'Free show. *Every* night.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'heart', look: [0, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }]
    if (i === 3) return [{ mood: 'happy', look: [1, -1] }, { mood: 'wide', look: [-1, -1] }]
    if (i === 4) return [{ mood: 'wink', look: [1, 0] }, { mood: 'heart', look: [-1, 0] }]
    if (i === 5) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    const air = clamp(prog(t, L[1] + 0.2, L[1] + 0.8))
    // the band of air over the Earth's curve (clipped to the board)
    x.save(); x.beginPath(); x.rect(B.x0 - 20, B.y0 - 20, B.x1 - B.x0 + 40, B.y1 - B.y0 + 40); x.clip()
    if (air > 0) {
      x.fillStyle = `rgba(159,220,255,${0.13 * air})`
      x.beginPath(); x.arc(EC.x, EC.y, AR, 0, TAU); x.arc(EC.x, EC.y, ER, 0, TAU, true); x.fill()
    }
    chalkCircle(x, t, { x: EC.x, y: EC.y, r: ER, at: L[1], dur: 0.6, from: -Math.PI * 0.8, sweep: Math.PI * 0.6, width: 6 })
    chalkCircle(x, t, { x: EC.x, y: EC.y, r: AR, at: L[1] + 0.2, dur: 0.6, from: -Math.PI * 0.8, sweep: Math.PI * 0.6, width: 4, dash: [14, 10], color: EX.chalkBlue, alpha: 0.8 })
    x.restore()
    chalkText(x, t, { text: '*AIR*', x: 800, y: 905, at: L[1] + 0.6, size: 26, accent: EX.chalkBlue })
    // you, on the curve
    if (t >= L[1] + 0.3) { R(x, INK, OBS.x - 9, OBS.y - 30, 18, 30); R(x, EX.chalkYellow, OBS.x - 6, OBS.y - 27, 12, 24); R(x, INK, OBS.x - 11, OBS.y - 44, 22, 18); R(x, EX.chalk, OBS.x - 8, OBS.y - 41, 16, 12) }
    chalkText(x, t, { text: 'YOU', x: OBS.x + 22, y: OBS.y - 34, at: L[1] + 0.4, size: 22 })
    // the two suns: noon overhead (short path), sunset low (long path)
    const sunDot = (p, col, k) => { if (k <= 0) return; x.save(); x.globalAlpha *= k; x.fillStyle = INK; x.beginPath(); x.arc(p.x, p.y, 24, 0, TAU); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(p.x, p.y, 19, 0, TAU); x.fill(); x.restore() }
    sunDot(NOON, '#fff1a8', clamp(prog(t, L[1] + 0.5, L[1] + 0.7)))
    chalkLine(x, t, { pts: [[NOON.x, NOON.y + 30], [OBS.x, OBS.y - 52]], at: L[1] + 0.7, dur: 0.4, width: 5, arrow: true, color: EX.chalkYellow })
    chalkText(x, t, { text: 'NOON:|SHORT TRIP', x: NOON.x + 40, y: NOON.y - 8, at: L[1] + 0.9, size: 22 })
    sunDot(LOW, '#ff9a5a', clamp(prog(t, L[1] + 1.2, L[1] + 1.4)))
    // the long sunset ray: blue drains out of it, the end runs red
    const ray = clamp(prog(t, L[1] + 1.4, L[1] + 2.0))
    if (ray > 0) {
      const x1 = LOW.x + 30 + (OBS.x - 20 - LOW.x - 30) * ray
      const g = x.createLinearGradient(LOW.x, 0, OBS.x, 0)
      const red = clamp(prog(t, L[2] + 0.4, L[2] + 1.4))
      g.addColorStop(0, '#fff1a8'); g.addColorStop(1, red > 0 ? `rgb(255,${Math.round(241 - 150 * red)},${Math.round(168 - 70 * red)})` : '#fff1a8')
      R(x, INK, LOW.x + 30, LOW.y - 1, x1 - LOW.x - 30, 10); x.fillStyle = g; x.fillRect(LOW.x + 30, LOW.y + 1, x1 - LOW.x - 30, 6)
    }
    chalkText(x, t, { text: 'SUNSET: *LONG* TRIP', x: LOW.x + 10, y: LOW.y + 74, at: L[1] + 1.6, size: 22, accent: EX.chalkYellow })
    // the blue scattering out of the long ray
    if (t >= L[2] + 0.2) {
      for (let k = 0; k < 22; k++) {
        const p0 = (k * 0.137 + 0.05) % 1, bx = LOW.x + 50 + p0 * 230
        const ph = ((t - L[2] - 0.2) * 0.7 + k * 0.29) % 1
        const ang = -Math.PI / 2 + ((k * 0.61) % 1 - 0.5) * 2.2
        const a = clamp(prog(t, L[2] + 0.2 + k * 0.04, L[2] + 0.4 + k * 0.04)) * (1 - ph * 0.8)
        R(x, INK, bx + Math.cos(ang) * ph * 130 - 2, LOW.y + Math.sin(ang) * ph * 130 - 2, 15, 15); R(x, `rgba(120,200,255,${a})`, bx + Math.cos(ang) * ph * 130, LOW.y + Math.sin(ang) * ph * 130, 11, 11)
      }
    }
    chalkText(x, t, { text: 'BLUE|*SCATTERS*', x: 160, y: 700, at: L[2] + 0.3, size: 24, accent: EX.chalkBlue })
    chalkText(x, t, { text: '*REDS*|REACH YOU', x: 300, y: 780, at: L[2] + 1.2, size: 24, accent: '#ff9a7a' })
    // haze and clouds catch the colour
    if (t >= L[3] + 0.3) {
      const k = ease.outCubic(clamp(prog(t, L[3] + 0.3, L[3] + 1.2)))
      const g = x.createLinearGradient(0, 600, 0, 740)
      g.addColorStop(0, `rgba(201,166,255,${0.25 * k})`); g.addColorStop(0.5, `rgba(255,143,177,${0.38 * k})`); g.addColorStop(1, `rgba(255,170,100,${0.42 * k})`)
      x.fillStyle = g; x.fillRect(660, 600, 270, 140)
      const cloud = (cx, cy, w, col) => { x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, w, 15, 0, 0, TAU); x.ellipse(cx - w * 0.35, cy - 12, w * 0.4, 14, 0, 0, TAU); x.ellipse(cx + w * 0.3, cy - 10, w * 0.45, 16, 0, 0, TAU); x.fill() }
      x.save(); x.globalAlpha *= k
      const dr = Math.sin(t * 0.7) * 6
      cloud(740 + dr, 640, 60, '#ffadc6'); cloud(860 - dr, 680, 55, '#ffb98a'); cloud(760 + dr, 716, 45, '#ff8fb1')
      x.restore()
    }
    chalkText(x, t, { text: 'HAZE +|*CLOUDS*', x: B.x1 - 6, y: 560, at: L[3] + 0.6, size: 24, align: 'right', accent: EX.chalkPink })
    // the tip: two little silhouettes on the curve, and a heart
    if (t >= L[4] + 0.3) {
      const k = clamp(prog(t, L[4] + 0.3, L[4] + 0.6))
      x.save(); x.globalAlpha *= k
      drawPixelStar(x, 700, 870, 42, 0, INK, INK); drawPixelStar(x, 744, 866, 42, 0, INK, INK)
      const hb = 1 + 0.15 * Math.sin(t * 7)
      const hx = 722, hy = 812, p = 6 * hb
      for (const [i, j] of [[-1, 0], [1, 0], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-2, 0], [2, 0]]) R(x, '#ff5c8a', hx + i * p, hy + j * p, p, p)
      x.restore()
    }
    chalkText(x, t, { text: '*FREE*', x: 640, y: 830, at: L[4] + 0.7, size: 26, align: 'center', accent: EX.chalkYellow })
  },
  // the background gag sits on the board's top frame from the moment the sunset turns pink
  back(x, t, T, B) {
    if (!B) return
    const k = clamp(prog(t, T.L[2] + 1.2, T.L[2] + 1.5)) * (1 - clamp(prog(t, T.recap, T.recap + 0.3)))
    sobbingPisces(x, t, 430, B.y0 - 56, 74, k * B.k)
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 0.9), 'NOON SHORT TRIP'),
    ...chalkCues(r3(T.L[1] + 1.6), 'SUNSET LONG TRIP'),
    ...chalkCues(r3(T.L[2] + 0.3), 'BLUE SCATTERS'),
    ...chalkCues(r3(T.L[2] + 1.2), 'REDS REACH YOU'),
    ...chalkCues(r3(T.L[3] + 0.6), 'HAZE CLOUDS'),
    ['pop', r3(T.L[4] + 0.3), 880, 0.03, 0],
    ...chalkCues(r3(T.L[4] + 0.7), 'FREE'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
