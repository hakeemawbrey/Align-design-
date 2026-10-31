// st13saturnreturn (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E14) · story 0–40.6, then the end card.
//   ❓ "What's a *Saturn return*?"  Teacher: ♄ SATURN (pointer). Students: the Aunties, ♉ AUNTIE TAURUS and ♋ AUNTIE CANCER
//   (reading glasses; Cancer's beaded chain), worried about a niece.
//   THE BOARD: a chalk Sun with Saturn's wide orbit and a ★ birth spot; Saturn goes round once and lands back on it
//   (✓ about 29.5 years per orbit, so it returns around ages 27 to 30), an age ruler with 27–30 lit, "GROWING-UP CHAPTER"
//   (✦ how astrologers read it), and DEADLINE struck out with a heart (♥ it's not a deadline for love).
//   Lightbulb (Taurus): "so it's a check-in, not a countdown." Cancer: "…I'm still bringing soup."
//   Last line (Saturn): "Saturn *checks in*. You level up."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar, talkHops } from '../../startalk.js'
import { drawSaturn } from '../../st5cast.js'
import { chalkCircle, chalkLine, EX } from '../../stexplain.js'
import { auntie, drawPixelHeart } from './props.js'
import { makeEpisode, R, INK } from './classkit.js'

const CAN = signStar('cancer'), TAU = signStar('taurus')
const TA = '♉ AUNTIE TAURUS', CA = '♋ AUNTIE CANCER'
const asT = { as: TA, asColor: TAU.color }, asC = { as: CA, asColor: CAN.color }

// both Aunties, side by side; returns the one who is talking (so the ▼ caret and the "?" sit over her)
let EP = null
const hopCache = {}
function drawAunties(ctx, x, y, size, t, o = {}) {
  const T = EP && EP.T
  const hops = tag => { if (!T) return null; return hopCache[tag] || (hopCache[tag] = talkHops(T.lines, tag, { cps: 27 })) }
  const s = size * 0.8, dx = size * 0.33
  x -= size * 0.18
  const rT = auntie(ctx, x - dx, y + 6, s, t, { ...o, color: TAU.color, glyph: TAU.glyph, seed: 5, hops: [...(o.hops || []).filter(v => v < 1), ...(hops(TA) || [])], glasses: { frame: '#5a2a1a', hi: '#ffe0a0' } })
  const rC = auntie(ctx, x + dx, y + 6, s, t, { ...o, color: CAN.color, glyph: CAN.glyph, seed: 8, look: o.look ? [-o.look[0], o.look[1]] : undefined, hops: hops(CA), glasses: { frame: '#7a1f3d', chain: true } })
  let cur = rT
  if (T) T.lines.forEach((L, i) => { if (t >= L.t - 0.05 && L.speaker === CA) cur = rC; else if (t >= L.t - 0.05 && L.speaker === TA) cur = rT })
  return cur
}

EP = makeEpisode({
  id: 'st13saturnreturn', numeral: 'S13 E14', duration: 45, key: 'C',
  q: 'What’s a *Saturn* | *return*?', qAccent: '#f7dca0',
  teacher: { tag: '♄ SATURN', color: '#f7dca0', accent: '#f7dca0', pitch: 330, size: 250,
    draw: (ctx, x, y, s, t, o) => drawSaturn(ctx, x, y, s * 1.2, t, { ...o, rot: -0.18 }) },
  student: { tag: TA, color: TAU.color, pitch: 622, draw: drawAunties, size: 260 },
  pitches: { [TA]: 622, [CA]: 740 },
  boardTitle: 'SATURN RETURN',
  lines: [
    ['student', 'my niece says she’s in her *Saturn return.*', asT],
    ['student', 'is it catching? should I bring *soup?*', asC],
    ['teacher', 'no soup needed. first, the *sky* part.', { mark: 'sky' }],
    ['teacher', 'I take about *29.5 years* to orbit the Sun.', { tag: 'sky', mark: 'orbit' }],
    ['teacher', 'so I’m back at your birth spot around *27–30.*', { mark: 'back' }],
    ['teacher', 'astrologers read it as a *growing-up* chapter.', { tag: 'astro', mark: 'astro' }],
    ['student', 'so she has to be *married by 30?*', { ...asC, mark: 'worry' }],
    ['teacher', 'no. it’s *not a deadline* for love.', { tag: 'tip', mark: 'tip' }],
    ['student', 'so it’s a check-in, not a *countdown.*', { ...asT, bulb: true }],
    ['student', '…I’m still bringing *soup.*', { ...asC, mark: 'soup' }],
  ],
  items: ['Saturn’s lap: about *29.5* years', 'Back around ages *27–30*', 'Not a *deadline* for love'],
  last: 'Saturn *checks in*. You level up.', lastWho: 'teacher', lastSize: 72,
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0 || ph === 1) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, -1] }]
    if (ph === 6) return [{ mood: 'squint', look: [1, 0] }, { mood: 'wide', look: [-1, 0] }]
    if (ph === 7) return [{ mood: 'happy', look: [1, 0] }, { mood: 'neutral', look: [-1, 0] }]
    if (ph === 8) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (ph === 9) return [{ mood: 'wide', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  chalk: M => [
    { text: 'SUN', at: M.sky + 0.8, u: 0.22, v: 0.66, size: 26, align: 'center', color: EX.chalkYellow },
    { text: '★ BIRTH', at: M.orbit + 0.2, u: 0.22, v: 0.1, size: 24, align: 'center', color: EX.chalkPink },
    { text: '1 LAP ≈ *29.5 YRS*', at: M.orbit + 1.0, u: 0.52, v: 0.2, size: 34 },
    { text: '0    10    20    30', at: M.back + 0.3, u: 0.52, v: 0.46, size: 26, cps: 40 },
    { text: 'AGES *27–30*', at: M.back + 1.3, u: 0.66, v: 0.56, size: 32 },
    { text: '*GROWING-UP* CHAPTER', at: M.astro + 0.9, u: 0.52, v: 0.72, size: 30 },
    { text: 'DEADLINE', at: M.tip + 0.2, u: 0.6, v: 0.88, size: 32, color: 'rgba(244,241,232,0.7)' },
  ],
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0, U = u => B.x0 + u * W, V = v => B.y0 + v * H
    const sx = U(0.22), sy = V(0.5), r = 160
    // the Sun and Saturn's wide orbit
    chalkCircle(x, t, { x: sx, y: sy, r: 30, at: M.sky + 0.4, dur: 0.4, color: EX.chalkYellow, width: 7 })
    chalkCircle(x, t, { x: sx, y: sy, r, at: M.sky + 0.7, dur: 0.9, width: 4, color: 'rgba(244,241,232,0.7)' })
    // the birth spot (top) and Saturn going round once, landing back on it during "around 27–30"
    if (t > M.orbit) {
      const bx = sx, by = sy - r
      R(x, EX.chalkPink, bx - 4, by - 12, 8, 24); R(x, EX.chalkPink, bx - 12, by - 4, 24, 8)
      const lap = ease.inOutCubic(clamp(prog(t, M.orbit + 0.6, M.back + 1.6)))
      const a = -Math.PI / 2 + lap * Math.PI * 2
      const px = sx + Math.cos(a) * r, py = sy + Math.sin(a) * r
      // the ring planet
      x.save(); x.translate(px, py)
      R(x, INK, -14, -14, 28, 28); R(x, '#e8c27a', -11, -11, 22, 22); R(x, '#f7dca0', -11, -11, 10, 8)
      R(x, INK, -26, -3, 52, 8); R(x, '#f7dca0', -24, -1, 48, 4)
      x.restore()
      // a flash when it lands home
      const fl = clamp(1 - Math.abs(t - (M.back + 1.7)) / 0.35)
      if (fl > 0) { x.save(); x.globalAlpha *= fl; for (let i = 0; i < 8; i++) { const aa = i * Math.PI / 4; R(x, EX.chalkYellow, bx + Math.cos(aa) * 36 - 4, by + Math.sin(aa) * 36 - 4, 8, 8) } x.restore() }
    }
    // the age ruler, 27–30 lit
    const rx0 = U(0.53), rx1 = U(0.53) + 18 * 15.6 * 1.0, ry = V(0.4)
    chalkLine(x, t, { pts: [[rx0, ry], [rx1, ry]], at: M.back + 0.1, dur: 0.4, width: 4 })
    for (let k = 0; k <= 3; k++) chalkLine(x, t, { pts: [[rx0 + 8 + k * (rx1 - rx0 - 16) / 3, ry - 10], [rx0 + 8 + k * (rx1 - rx0 - 16) / 3, ry + 10]], at: M.back + 0.2 + k * 0.08, dur: 0.12, width: 4 })
    if (t > M.back + 1.1) { const a27 = rx0 + 8 + (27 / 30) * (rx1 - rx0 - 16), a30 = rx0 + 8 + (rx1 - rx0 - 16); x.save(); x.globalAlpha *= clamp(prog(t, M.back + 1.1, M.back + 1.4)); R(x, EX.chalkYellow, a27, ry - 8, a30 - a27, 16); x.restore() }
    // DEADLINE, struck out, and a heart
    chalkLine(x, t, { pts: [[U(0.585), V(0.88)], [U(0.92), V(0.88)]], at: M.tip + 0.9, dur: 0.3, color: EX.red, width: 7 })
    if (t > M.tip + 1.3) drawPixelHeart(x, U(0.52), V(0.88) - 14, 4, '#ff8fb1')
  },
  cues: T => [
    ['bell', +(T.M.back + 1.7).toFixed(3), 1046.5, 0.035, 1.2, 0],
    ['snare', +(T.M.tip + 0.9).toFixed(3), { gain: 0.05, tone: 300, decay: 0.08, snappy: 0.9, rev: 0.1 }],
    ['pop', +(T.M.soup + 0.9).toFixed(3), 659.25, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
