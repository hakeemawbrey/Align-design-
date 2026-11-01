// hxlightpollution (45 s vertical Align ad, "Star Talk Explains", the Houston sky) · story 0–40.6, then the end card.
//   ❓ "Why can't I *see* stars in Houston?"  ★ THE STARS (with the pointer) teach ♓ PISCES at the chalkboard:
//   ✓ city lights scatter in the air and wash out faint stars: light pollution (a chalk skyline, a glow dome rising, the
//     faint chalk stars fading out);
//   ✓ haze and humidity make it worse (wavy haze lines);
//   ✓ the bright planets and the Moon still show through (a big dot and a crescent, circled);
//   ♥ a drive out of town is a great date (a little pixel car rolls off the board's right edge into a dark sky full of stars).
//   💡 Pisces: "a road trip to *find* you? that's a date." Last line (the Stars): "Still up there. *Promise*."
// The engine is ./classkit.js (this folder's copy of st13sunsign's, with one cardfx cut and no numeral); the look is
// ../../stexplain.js. Pisces is the student, so Pisces does the crying (frame 0 and line 0). Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar, STAR } from '../../startalk.js'
import { drawPixelStar } from '../../sky.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, drawPointer, EX } from '../../stexplain.js'
import { drawTears, eyesOf } from './props.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const PIS = signStar('pisces')
const TAU = Math.PI * 2
const GROUND = 948                       // the skyline's street line on the board
const CITY = [[150, 96], [196, 150], [240, 118], [282, 214], [330, 176], [372, 262], [420, 196], [462, 140], [506, 230], [552, 120], [596, 84]]
// faint chalk stars (x, y, kind) over the city half of the board, plus the two bright ones that survive
const FAINT = [[176, 590], [232, 660], [300, 560], [356, 630], [410, 575], [468, 650], [530, 590], [582, 655], [258, 718], [446, 712], [600, 560]]
const PLANET = { x: 330, y: 612 }, MOONP = { x: 560, y: 612 }
// the dark sky past the edge of town
const COUNTRY = [[700, 560], [760, 610], [830, 570], [890, 620], [720, 680], [800, 700], [870, 690], [910, 560], [760, 760], [850, 780], [690, 800], [905, 750], [800, 640]]

// the Stars: the gold narrator star with two little companions twinkling round it (it's plural)
function starsTeacher(x, X, Y, s, t, o = {}) {
  const r = drawStarChar(x, X, Y, s, t, { color: STAR.sky, ...o })
  const tw = k => 0.6 + 0.4 * Math.sin(t * 4 + k * 2.1)
  x.save(); x.globalAlpha *= tw(0); drawPixelStar(x, X - s * 0.52, r.top + 6 + Math.sin(t * 2.4) * 6, 34, 0, '#ffe9a6'); x.restore()
  x.save(); x.globalAlpha *= tw(1); drawPixelStar(x, X + s * 0.5, r.top - 16 + Math.sin(t * 2.0 + 1) * 6, 24, 1, '#fff3c8'); x.restore()
  return r
}

// two fat tear streams down the cheeks plus drips off the bottom (bigger than drawTears, so they read at thumbnail size)
function sob(x, t, e, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const px = e.px
  for (const side of [-1, 1]) {
    const sx = e.ex + side * e.dx, sy = e.ey + px * 2
    const len = px * (9 + 2 * Math.sin(t * 6 + side))
    R(x, INK, sx - px, sy - px * 0.5, px * 2 + 2, len + px)
    R(x, '#7fd8ff', sx - px + 1, sy, px * 2, len)
    R(x, '#dff6ff', sx - px + 1, sy, Math.ceil(px * 0.7), len)
    for (let d = 0; d < 3; d++) {
      const ph = (t * 1.4 + d / 3 + (side > 0 ? 0.17 : 0)) % 1
      x.save(); x.globalAlpha *= 1 - ph
      R(x, '#7fd8ff', sx - px * 0.6, sy + len + ph * px * 14, px * 1.3, px * 2)
      x.restore()
    }
  }
  x.restore()
}

const EP = makeEpisode({
  id: 'hxlightpollution', duration: 45, key: 'D',
  q: 'Why can\'t I *see* | stars in Houston?', qAccent: EX.chalkYellow,
  teacher: { tag: '★ THE STARS', color: STAR.sky, accent: '#ffd76a', pitch: 494,
    draw: starsTeacher,
    prop(x, r, t, T) {
      let tap = 0
      for (const v of [T.L[1] + 0.6, T.L[3] + 0.4, T.L[6] + 0.5, T.L[8] + 0.5]) if (t >= v && t < v + 0.4) tap = Math.sin(Math.PI * (t - v) / 0.4)
      drawPointer(x, r.x + 90, r.y - 4, -0.75, { tap })
    } },
  student: { tag: '♓ PISCES', color: PIS.color, pitch: 740,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: PIS.color, glyph: PIS.glyph, ...o }),
    prop(x, r, t, T) {
      // Pisces cries: from frame 0 through line 0 (the sky is "empty"), and happy tears at the lightbulb
      const sad = 1 - clamp(prog(t, T.L[1] + 0.8, T.L[1] + 1.3))
      const happy = T.bulbAt ? clamp(prog(t, T.bulbAt + 0.3, T.bulbAt + 0.6)) * (1 - clamp(prog(t, T.recap, T.recap + 0.3))) : 0
      const e = eyesOf(r)
      sob(x, t, e, sad)
      drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: Math.max(sad, happy), seed: 7, fountain: true })
    } },
  board: { title: 'THE CITY SKY' },
  lines: [
    ['s', 'i looked up from the Loop. *nobody* was there.'],
    ['t', 'We\'re here, love! City light *scatters* in the air,', { tag: 'sky' }],
    ['t', 'and that glow *washes out* our faint ones.'],
    ['t', 'Sky folks call it *light pollution*.'],
    ['s', 'so the sky got *photobombed*. by the city.'],
    ['t', 'Haze and humid nights make it *worse*.', { tag: 'sky' }],
    ['t', 'But bright planets and the *Moon* show through.', { tag: 'sky' }],
    ['s', 'so you never *left*. i cried for nothing?'],
    ['t', 'Tip: drive out of town, together. *Dark sky* date.', { tag: 'tip' }],
    ['s', 'a road trip to *find* you? that\'s a date.', { bulb: true }],
  ],
  recap: ['City light *washes* out stars', 'Haze makes it *worse*', 'Planets and *Moon* still shine'],
  last: 'Still up there. *Promise*.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [0, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'wide', look: [1, 0] }, { mood: 'wide', look: [0, -1] }]
    if (i === 4) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, -1] }]
    if (i === 7) return [{ mood: 'wink', look: [1, 0] }, { mood: 'sparkle', look: [-1, -1] }]
    if (i === 8) return [{ mood: 'heart', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (i === 9) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    const glow = ease.inOutCubic(clamp(prog(t, L[1] + 0.6, L[2] + 1.2)))
    const haze = ease.outCubic(clamp(prog(t, L[5] + 0.3, L[5] + 1.3)))
    // the glow dome over the city (a soft chalk-yellow smudge rising from the street line)
    if (glow > 0) {
      x.save()
      const g = x.createRadialGradient(370, GROUND, 10, 370, GROUND, 360)
      g.addColorStop(0, `rgba(255,226,122,${0.42 * glow})`); g.addColorStop(0.55, `rgba(255,190,110,${0.18 * glow})`); g.addColorStop(1, 'rgba(255,190,110,0)')
      x.fillStyle = g; x.fillRect(B.x0, B.y0 + 40, 520, GROUND - B.y0 - 40)
      x.restore()
      for (let k = 0; k < 3; k++) chalkCircle(x, t, { x: 370, y: GROUND, r: 250 + k * 46, at: L[1] + 0.7 + k * 0.18, dur: 0.6, from: -Math.PI, sweep: Math.PI, color: EX.chalkYellow, width: 4, alpha: 0.55 - k * 0.14 })
    }
    // the faint stars: written on with the board, washing out as the glow rises
    if (t >= T.board + 0.4) {
      FAINT.forEach(([sx, sy], k) => {
        const a = clamp(prog(t, T.board + 0.4 + k * 0.06, T.board + 0.6 + k * 0.06)) * (1 - 0.88 * glow) * (0.75 + 0.25 * Math.sin(t * 3 + k))
        x.save(); x.globalAlpha *= a; drawPixelStar(x, sx, sy, k % 3 ? 14 : 21, k % 3 ? 2 : 1, EX.chalk); x.restore()
      })
    }
    // the skyline (chalk outlines, lit windows once the glow rises)
    CITY.forEach(([cx, h], k) => {
      const w = 34, at = L[1] + k * 0.05
      chalkLine(x, t, { pts: [[cx - w / 2, GROUND], [cx - w / 2, GROUND - h], [cx + w / 2, GROUND - h], [cx + w / 2, GROUND]], at, dur: 0.25, width: 5 })
      if (glow > 0.2) for (let j = 1; j * 30 < h - 10; j++) if ((j + k) % 3) R(x, `rgba(255,226,122,${0.7 * glow})`, cx - 7, GROUND - h + j * 30 - 10, 14, 10)
    })
    chalkLine(x, t, { pts: [[B.x0, GROUND], [640, GROUND]], at: L[1], dur: 0.4, width: 5 })
    chalkText(x, t, { text: 'LIGHT|*POLLUTION*', x: B.x1 - 6, y: 560, at: L[3] + 0.3, size: 30, align: 'right', accent: EX.chalkYellow, alpha: 1 - clamp(prog(t, L[8], L[8] + 0.4)) })
    // the haze: wavy dashed lines drifting across the city sky
    if (haze > 0) {
      for (let k = 0; k < 3; k++) {
        const y0 = 700 + k * 52, pts = []
        for (let s = 0; s <= 24; s++) { const xx = B.x0 + 10 + s * 20; pts.push([xx, y0 + Math.sin(s * 0.9 + t * 1.6 + k) * 7]) }
        chalkLine(x, t, { pts, at: L[5] + 0.3 + k * 0.15, dur: 0.7, width: 4, dash: [16, 12], alpha: 0.6 * haze, color: EX.chalkBlue })
      }
      chalkText(x, t, { text: '*HAZE*', x: 610, y: 742, at: L[5] + 0.9, size: 28, align: 'right', accent: EX.chalkBlue })
    }
    // the bright ones show through: a planet and the Moon, each circled
    if (t >= L[6] + 0.3) {
      const k1 = clamp(prog(t, L[6] + 0.3, L[6] + 0.6))
      x.save(); x.globalAlpha *= k1
      x.fillStyle = INK; x.beginPath(); x.arc(PLANET.x, PLANET.y, 15, 0, TAU); x.fill()
      x.fillStyle = '#fff3c8'; x.beginPath(); x.arc(PLANET.x, PLANET.y, 11, 0, TAU); x.fill()
      // the crescent: a chalk disc with a slate bite
      x.fillStyle = EX.chalk; x.beginPath(); x.arc(MOONP.x, MOONP.y, 30, 0, TAU); x.fill()
      x.fillStyle = EX.slate; x.beginPath(); x.arc(MOONP.x + 14, MOONP.y - 8, 27, 0, TAU); x.fill()
      x.restore()
    }
    chalkCircle(x, t, { x: PLANET.x, y: PLANET.y, r: 36, at: L[6] + 0.6, dur: 0.5, color: EX.chalkPink, width: 4 })
    chalkCircle(x, t, { x: MOONP.x, y: MOONP.y, r: 50, at: L[6] + 0.9, dur: 0.5, color: EX.chalkPink, width: 4 })
    chalkText(x, t, { text: 'PLANET', x: PLANET.x + 44, y: PLANET.y - 4, at: L[6] + 1.1, size: 24, color: EX.chalkPink })
    chalkText(x, t, { text: 'MOON', x: MOONP.x + 58, y: MOONP.y - 4, at: L[6] + 1.3, size: 24, color: EX.chalkPink })
    // the tip: a road out of town, a little pixel car, and the dark sky full of stars past the edge of the board
    chalkLine(x, t, { pts: [[640, GROUND], [B.x1, GROUND]], at: L[8] + 0.1, dur: 0.4, width: 5, dash: [18, 14] })
    if (t >= L[8] + 0.4) {
      const drive = ease.inOutCubic(clamp(prog(t, L[8] + 0.4, L[8] + 2.0)))
      const cx = 600 + drive * 250, cy = GROUND - 16 - (Math.sin(t * 18) > 0.6 ? 2 : 0)
      R(x, INK, cx - 34, cy - 20, 68, 28); R(x, EX.chalkPink, cx - 30, cy - 16, 60, 18); R(x, INK, cx - 18, cy - 32, 34, 14); R(x, EX.chalkPink, cx - 15, cy - 29, 28, 10)
      R(x, EX.chalkBlue, cx - 10, cy - 27, 9, 7); R(x, EX.chalkBlue, cx + 3, cy - 27, 9, 7)
      R(x, INK, cx - 24, cy + 4, 14, 14); R(x, INK, cx + 12, cy + 4, 14, 14)
      R(x, '#ffe27a', cx + 26, cy - 12, 6, 6)
      // two little hearts in the car
      if (drive > 0.3) { R(x, '#ff5c8a', cx - 6, cy - 46 - Math.sin(t * 4) * 4, 6, 6); R(x, '#ff5c8a', cx + 2, cy - 46 - Math.sin(t * 4) * 4, 6, 6); R(x, '#ff5c8a', cx - 3, cy - 40 - Math.sin(t * 4) * 4, 8, 6) }
      COUNTRY.forEach(([sx, sy], k) => {
        const a = clamp(prog(t, L[8] + 1.2 + k * 0.08, L[8] + 1.4 + k * 0.08)) * (0.7 + 0.3 * Math.sin(t * 4 + k * 1.3))
        if (a > 0) { x.save(); x.globalAlpha *= a; drawPixelStar(x, sx, sy, k % 4 ? 18 : 28, k % 4 ? 1 : 0, k % 3 ? EX.chalk : EX.chalkYellow); x.restore() }
      })
      chalkText(x, t, { text: 'OUT OF|*TOWN*', x: B.x1 - 6, y: 860, at: L[8] + 1.4, size: 28, align: 'right', accent: EX.chalkYellow })
    }
  },
  cues: T => [
    ...chalkCues(r3(T.L[3] + 0.3), 'LIGHT POLLUTION'),
    ...chalkCues(r3(T.L[5] + 0.9), 'HAZE'),
    ...chalkCues(r3(T.L[6] + 1.1), 'PLANET'),
    ...chalkCues(r3(T.L[6] + 1.3), 'MOON'),
    ['whoosh', r3(T.L[8] + 0.4), 0.9, 0.02],
    ...Array.from({ length: 6 }, (_, k) => ['pop', r3(T.L[8] + 1.2 + k * 0.16), [1174.66, 1318.51, 1567.98, 1760, 1975.53, 2349.32][k], 0.02, k % 2 ? 0.3 : -0.3]),
    ...chalkCues(r3(T.L[8] + 1.4), 'OUT OF TOWN'),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
