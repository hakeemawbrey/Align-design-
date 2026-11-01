// hxnewmoon (45 s vertical Align ad, "Star Talk Explains", the Houston sky) · story 0–40.6, then the end card.
//   ❓ "When's the best night to *stargaze*?"  ♄ SATURN (pointer) teaches ♐ SAGITTARIUS (snacks, zero plans):
//   ✓ near the new Moon the sky is darkest (a chalk row of Moon phases, bright to new, chalk stars filling in as it darkens);
//   ✓ give your eyes about 20 minutes to adjust in the dark (a chalk eye, its pupil opening);
//   ✓ use a red light, not a bright screen (a red flashlight ✓, a phone ✗);
//   ✦ astrologers read the new Moon as a fresh start;
//   ♥ plan it together (a little chalk calendar with a heart on it, no dates).
//   💡 Sagittarius: "a fresh start, a dark sky, and *you*? booking it." Last line (Saturn): "Dark sky. *Bright* idea."
// Rewatch bait: a tiny Pisces sits on the chalkboard's top frame, crying because the Moon "left".
// The engine is ./classkit.js (st13sunsign's, with one cardfx cut and no numeral). Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, drawStarChar } from '../../startalk.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { drawPixelStar } from '../../sky.js'
import { chalkText, chalkLine, chalkCircle, chalkCues, EX } from '../../stexplain.js'
import { makeEpisode, r3, R, INK } from './classkit.js'

const SAG = signStar('sagittarius')
const PIS = signStar('pisces')
const TAU = Math.PI * 2
const PH = [0, 0.25, 0.5, 0.75, 1]                // lit fraction shrinking: full → new, left to right
const PHX = k => 200 + k * 92, PHY = 610, PR = 30
const SKY = [[170, 720], [230, 780], [300, 710], [350, 790], [410, 740], [470, 800], [530, 720], [590, 780], [260, 830], [380, 835], [500, 835], [560, 830], [190, 820], [440, 700]]

function sobbingPisces(x, t, X, Y, s, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  const r = drawStarChar(x, X, Y, s, t, { color: PIS.color, mood: 'wide', look: [-1, 1], seed: 12, bob: 2, glow: 0.5, tips: false })
  const cell = s / 36, ey = r.y + 1.2 * cell, dx = 4.6 * cell, px = Math.max(3, Math.round(cell))
  for (const side of [-1, 1]) {
    const len = px * (6 + 2 * Math.sin(t * 7 + side))
    R(x, '#7fd8ff', X + side * dx - px * 0.6, ey + px, px * 1.3, len)
    const ph = (t * 1.5 + (side > 0 ? 0.4 : 0)) % 1
    x.save(); x.globalAlpha *= 1 - ph; R(x, '#7fd8ff', X + side * dx - px * 0.5, ey + px + len + ph * px * 12, px, px * 1.6); x.restore()
  }
  x.restore()
}

// a Moon phase: a chalk ring, lit on the right by `lit` (1 = full, 0 = new)
function phase(x, cx, cy, r, lit, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 4, 0, TAU); x.fill()
  x.fillStyle = '#26443b'; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill()
  if (lit > 0) {
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip()
    x.fillStyle = '#f4efd8'
    // the terminator as an ellipse: lit half on the right, plus/minus an ellipse
    x.beginPath(); x.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2); x.fill()
    const ex = r * Math.abs(1 - 2 * lit)
    x.fillStyle = lit >= 0.5 ? '#f4efd8' : '#26443b'
    x.beginPath(); x.ellipse(cx, cy, ex, r, 0, 0, TAU); x.fill()
    x.restore()
  }
  x.strokeStyle = 'rgba(244,241,232,0.7)'; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.stroke()
  x.restore()
}

const EP = makeEpisode({
  id: 'hxnewmoon', duration: 45, key: 'Am',
  q: 'When\'s the best night | to *stargaze*?', qAccent: EX.chalkYellow,
  teacher: { tag: SATURN.tag, color: '#f7dca0', accent: SATURN.tagColor, pitch: 330, size: 290,
    draw: (x, X, Y, s, t, o) => drawSaturn(x, X, Y, s, t, { ...o, rot: -0.18 }) },
  student: { tag: '♐ SAGITTARIUS', color: SAG.color, pitch: 784,
    draw: (x, X, Y, s, t, o) => drawStarChar(x, X, Y, s, t, { color: SAG.color, glyph: SAG.glyph, ...o }),
    prop(x, r, t, T) {
      // a pixel snack bag, held up in frame 0 ("i brought snacks"), then set down
      const up = 1 - clamp(prog(t, T.L[1], T.L[1] + 0.4))
      const bx = r.x - 150, by = r.y + 30 - up * 60 + Math.sin(t * 6) * 3 * up
      R(x, INK, bx - 4, by - 4, 64, 78); R(x, '#ff8f4a', bx, by, 56, 70); R(x, '#ffd34d', bx, by, 56, 12); R(x, '#ffd34d', bx + 14, by + 26, 28, 24); R(x, '#fff3c8', bx + 20, by + 32, 8, 8)
    } },
  board: { title: 'STARGAZING NIGHT' },
  lines: [
    ['s', 'tonight! i brought snacks. and *zero* plans.'],
    ['t', 'First, check the Moon. Near the *new Moon*,', { tag: 'sky' }],
    ['t', 'the sky gets its *darkest*.'],
    ['s', 'so the Moon is the *third wheel*?'],
    ['t', 'Tonight? Yes. Give your eyes *20 minutes*', { tag: 'sky' }],
    ['t', 'in the dark. They *adjust*.'],
    ['t', 'And use a *red* light, not a bright screen.', { tag: 'sky' }],
    ['s', 'no phone for 20 minutes?? *who am i*.'],
    ['t', 'Astrologers read a new Moon as a *fresh start*.', { tag: 'astro' }],
    ['t', 'Tip: plan the night *together*.', { tag: 'tip' }],
    ['s', 'fresh start, dark sky, *you*? booking it.', { bulb: true }],
  ],
  recap: ['Near new Moon: *darkest* sky', '*20 min* for your eyes', '*Red* light, not a screen'],
  last: 'Dark sky. *Bright* idea.', lastWho: 't',
  moods(t, T, i) {
    if (i < 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'happy', look: [0, -1] }]
    if (t >= T.recap) return [{ mood: 'happy' }, { mood: 'happy' }]
    if (i === 0) return [{ mood: 'squint', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    if (i === 3) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, -1] }]
    if (i === 7) return [{ mood: 'happy', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (i === 8) return [{ mood: 'neutral', look: [1, -1] }, { mood: 'sparkle', look: [-1, -1] }]
    if (i === 10) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [0, -1] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  draw(x, t, B, T) {
    const L = T.L
    // beat 1: the phases, full → new, and the sky filling with stars as the Moon darkens
    PH.forEach((f, k) => phase(x, PHX(k), PHY, PR, 1 - f, clamp(prog(t, L[1] + 0.3 + k * 0.15, L[1] + 0.5 + k * 0.15))))
    chalkLine(x, t, { pts: [[PHX(0) + 40, PHY + 50], [PHX(4) - 40, PHY + 50]], at: L[1] + 1.1, dur: 0.6, width: 4, arrow: true, color: EX.chalkYellow })
    chalkText(x, t, { text: 'FULL', x: PHX(0), y: PHY + 50, at: L[1] + 0.6, size: 20, align: 'center' })
    chalkText(x, t, { text: '*NEW*', x: PHX(4), y: PHY + 50, at: L[1] + 1.2, size: 22, align: 'center', accent: EX.chalkYellow })
    const dark = clamp(prog(t, L[2], L[2] + 1.6))
    SKY.forEach(([sx, sy], k) => {
      const a = clamp(dark * SKY.length - k) * (0.7 + 0.3 * Math.sin(t * 3.4 + k))
      if (a > 0) { x.save(); x.globalAlpha *= a; drawPixelStar(x, sx, sy, k % 3 ? 16 : 24, k % 3 ? 1 : 0, k % 4 ? EX.chalk : EX.chalkYellow); x.restore() }
    })
    chalkText(x, t, { text: '*DARKEST* SKY', x: 380, y: 878, at: L[2] + 0.6, size: 26, align: 'center', accent: EX.chalkYellow })
    // beat 2: the eye, its pupil opening over the minutes
    const EYX = 790, EYY = 610
    chalkLine(x, t, { pts: [[EYX - 90, EYY], [EYX - 40, EYY - 40], [EYX + 40, EYY - 40], [EYX + 90, EYY], [EYX + 40, EYY + 40], [EYX - 40, EYY + 40], [EYX - 90, EYY]], at: L[4] + 0.3, dur: 0.6, width: 5 })
    if (t >= L[4] + 0.8) {
      const open = ease.inOutCubic(clamp(prog(t, L[4] + 0.9, L[5] + 1.2)))
      x.save(); x.globalAlpha *= clamp(prog(t, L[4] + 0.8, L[4] + 1.0))
      x.fillStyle = EX.chalkBlue; x.beginPath(); x.arc(EYX, EYY, 30, 0, TAU); x.fill()
      x.fillStyle = INK; x.beginPath(); x.arc(EYX, EYY, 8 + 18 * open, 0, TAU); x.fill()
      R(x, '#ffffff', EYX - 16, EYY - 18, 8, 8)
      x.restore()
    }
    chalkText(x, t, { text: 'EYES ADJUST:|ABOUT *20 MIN*', x: EYX, y: EYY + 70, at: L[4] + 1.0, size: 22, align: 'center' })
    // beat 3: red light ✓, bright screen ✗
    const FX = 720, FY = 800
    if (t >= L[6] + 0.3) {
      const k = clamp(prog(t, L[6] + 0.3, L[6] + 0.5))
      x.save(); x.globalAlpha *= k
      // the red beam
      const g = x.createLinearGradient(FX + 30, 0, FX + 150, 0); g.addColorStop(0, 'rgba(255,80,90,0.6)'); g.addColorStop(1, 'rgba(255,80,90,0)')
      x.fillStyle = g; x.beginPath(); x.moveTo(FX + 30, FY - 6); x.lineTo(FX + 150, FY - 34); x.lineTo(FX + 150, FY + 34); x.lineTo(FX + 30, FY + 6); x.fill()
      R(x, INK, FX - 40, FY - 14, 76, 28); R(x, '#8b8fa8', FX - 36, FY - 10, 60, 20); R(x, '#ff505a', FX + 22, FY - 12, 12, 24)
      // the phone, crossed out
      R(x, INK, 880, FY - 40, 44, 78); R(x, '#cfe8ff', 884, FY - 36, 36, 62)
      x.restore()
    }
    chalkLine(x, t, { pts: [[872, FY - 50], [932, FY + 46]], at: L[6] + 0.8, dur: 0.25, width: 6, color: EX.red })
    chalkLine(x, t, { pts: [[932, FY - 50], [872, FY + 46]], at: L[6] + 1.0, dur: 0.25, width: 6, color: EX.red })
    chalkText(x, t, { text: '*RED* LIGHT', x: FX, y: FY + 56, at: L[6] + 0.6, size: 22, align: 'center', accent: '#ff7a84' })
    // beat 4 (astrology): a sprout on the new Moon
    chalkText(x, t, { text: 'ASTROLOGY: *FRESH START*', x: 380, y: 928, at: L[8] + 0.4, size: 22, align: 'center', accent: EX.lilac })
    if (t >= L[8] + 0.6) {
      const k = clamp(prog(t, L[8] + 0.6, L[8] + 1.0)), sx = PHX(4), sy = PHY
      R(x, '#7dffc4', sx - 2, sy - 6 - 26 * k, 5, 26 * k)
      R(x, '#7dffc4', sx - 14, sy - 30 * k, 12 * k, 7); R(x, '#7dffc4', sx + 3, sy - 22 * k, 12 * k, 7)
    }
    // beat 5 (tip): a tiny calendar page with a heart where a date would be
    if (t >= L[9] + 0.3) {
      const k = clamp(prog(t, L[9] + 0.3, L[9] + 0.6)), cx = 830, cy = 912
      x.save(); x.globalAlpha *= k
      R(x, INK, cx - 54, cy - 44, 108, 88); R(x, EX.paper, cx - 50, cy - 40, 100, 80); R(x, EX.red, cx - 50, cy - 40, 100, 16)
      for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) R(x, '#c9bfae', cx - 42 + i * 24, cy - 16 + j * 18, 14, 10)
      const hb = 1 + 0.15 * Math.sin(t * 7), p = 4 * hb, hx = cx + 6, hy = cy + 4
      for (const [i, j] of [[-1, 0], [1, 0], [-2, 1], [-1, 1], [0, 1], [1, 1], [2, 1], [-1, 2], [0, 2], [1, 2], [0, 3], [-2, 0], [2, 0]]) R(x, '#ff5c8a', hx + i * p, hy + j * p, p, p)
      x.restore()
    }
  },
  back(x, t, T, B) {
    if (!B) return
    const k = clamp(prog(t, T.L[2] + 0.4, T.L[2] + 0.7)) * (1 - clamp(prog(t, T.recap, T.recap + 0.3)))
    sobbingPisces(x, t, 470, B.y0 - 56, 74, k * B.k)
  },
  cues: T => [
    ...chalkCues(r3(T.L[1] + 1.2), 'NEW'),
    ...Array.from({ length: 6 }, (_, k) => ['pop', r3(T.L[2] + 0.1 + k * 0.25), [880, 987.77, 1174.66, 1318.51, 1567.98, 1760][k], 0.018, k % 2 ? 0.3 : -0.3]),
    ...chalkCues(r3(T.L[2] + 0.6), 'DARKEST SKY'),
    ...chalkCues(r3(T.L[4] + 1.0), 'EYES ADJUST'),
    ...chalkCues(r3(T.L[6] + 0.6), 'RED LIGHT'),
    ['tick', r3(T.L[6] + 0.8), 0.04], ['tick', r3(T.L[6] + 1.0), 0.04],
    ...chalkCues(r3(T.L[8] + 0.4), 'FRESH START'),
    ['pop', r3(T.L[9] + 0.3), 1046.5, 0.03, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
