// st13aspects (45 s vertical Align ad, Star Talk season 13 "Star Talk Explains", S13 E11) · story 0–40.6, then the end card.
//   ❓ "What's an *aspect* in astrology?"  Teacher: ♎ LIBRA (pointer). Student: ♒ AQUARIUS ("a puzzle?").
//   THE BOARD: a chalk wheel with two planets; the second one swings round to 0°, 60°, 90°, 120° and 180° as Libra names
//   each aspect (✦ conjunction, sextile, square, trine, opposition), then chat bubbles pop off both planets
//   (✦ astrologers read aspects as conversations: easy, tense, or a mix).
//   Lightbulb: "so my chart is a dinner party." Last line (Aquarius): "Planets *talk* in angles."
// The engine is ./classkit.js (this folder's copy); the season look is ../../stexplain.js. Pure f(t).
import { clamp, prog, ease } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { chalkCircle, chalkLine, EX } from '../../stexplain.js'
import { makeEpisode, R, INK, pop01 } from './classkit.js'

const LIB = signStar('libra'), AQU = signStar('aquarius')
const DEG = Math.PI / 180

const EP = makeEpisode({
  id: 'st13aspects', numeral: 'S13 E11', duration: 45, key: 'Ab',
  q: 'What’s an *aspect* | in astrology?', qAccent: '#ffb3d1',
  teacher: { tag: '♎ LIBRA', color: LIB.color, glyph: LIB.glyph, pitch: 622, pointer: true },
  student: { tag: '♒ AQUARIUS', color: AQU.color, glyph: AQU.glyph, pitch: 784 },
  boardTitle: 'ASPECTS 101',
  lines: [
    ['student', 'my chart has lines *everywhere.* a puzzle?'],
    ['teacher', 'those are *aspects:* angles between planets.', { tag: 'astro', mark: 'asp' }],
    ['teacher', 'same spot, 0°: a *conjunction.*', { mark: 'a0' }],
    ['teacher', '60° is a *sextile.* 90°, a *square.*', { mark: 'a60' }],
    ['teacher', '120°, a *trine.* 180°, an *opposition.*', { mark: 'a120' }],
    ['student', 'so they’re like… *geometry homework?*'],
    ['teacher', 'astrologers read them as *conversations.*', { tag: 'astro', mark: 'conv' }],
    ['teacher', 'easy, tense, or a *bit of both.*', { mark: 'mix' }],
    ['student', 'so my chart is a *dinner party.*', { bulb: true }],
    ['teacher', 'with a *seating chart,* yes.', { mark: 'seat' }],
  ],
  items: ['Aspects = *angles*', '0°, 60°, 90°, 120°, *180°*', 'Read as *conversations*'],
  last: 'Planets *talk* in angles.', lastWho: 'student',
  moods(ph, t, T) {
    if (ph === 'q') return [{ mood: 'neutral' }, { mood: 'wide', look: [-1, -1] }]
    if (ph === 0) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0] }]
    if (ph === 5) return [{ mood: 'wink', look: [1, 0] }, { mood: 'eyeroll' }]
    if (ph === 8) return [{ mood: 'happy', look: [1, 0] }, { mood: 'sparkle', look: [-1, 0] }]
    if (ph === 9) return [{ mood: 'wink', look: [1, 0] }, { mood: 'happy', look: [-1, 0] }]
    if (ph === 'recap' || ph === 'last') return [{ mood: 'happy', look: [1, 0] }, { mood: 'happy', look: [0, 0] }]
    return [{ mood: 'neutral', look: [1, -1] }, { mood: 'neutral', look: [-1, -1] }]
  },
  chalk: M => [
    { text: '0°   *CONJUNCTION*', at: M.a0 + 0.6, u: 0.5, v: 0.18, size: 32 },
    { text: '60°  *SEXTILE*', at: M.a60 + 0.5, u: 0.5, v: 0.3, size: 32 },
    { text: '90°  *SQUARE*', at: M.a60 + 1.3, u: 0.5, v: 0.42, size: 32 },
    { text: '120° *TRINE*', at: M.a120 + 0.5, u: 0.5, v: 0.54, size: 32 },
    { text: '180° *OPPOSITION*', at: M.a120 + 1.4, u: 0.5, v: 0.66, size: 32 },
    { text: 'EASY · TENSE · *MIX*', at: M.mix + 0.3, u: 0.5, v: 0.86, size: 32, color: EX.chalkPink },
  ],
  board(x, t, B, M) {
    const W = B.x1 - B.x0, H = B.y1 - B.y0
    const cx = B.x0 + 0.23 * W, cy = B.y0 + 0.57 * H, r = 160
    chalkCircle(x, t, { x: cx, y: cy, r, at: M.asp + 0.2, dur: 0.8, width: 6 })
    // where planet B sits: it swings to each aspect as it is named
    const stops = [[M.asp + 0.6, 40], [M.a0 + 0.2, 0], [M.a60 + 0.2, 60], [M.a60 + 1.0, 90], [M.a120 + 0.2, 120], [M.a120 + 1.1, 180], [M.conv + 0.2, 120]]
    let ang = 40
    for (let i = 0; i < stops.length; i++) {
      const [at, a] = stops[i]
      if (t >= at) { const prev = i ? stops[i - 1][1] : 40; ang = prev + (a - prev) * ease.inOutCubic(clamp(prog(t, at, at + 0.5))) }
    }
    const pk = pop01(t, M.asp + 0.6, 0.3, 2.4)
    if (pk <= 0) return
    const aA = -90 * DEG, aB = (-90 + ang) * DEG
    const Ax = cx + Math.cos(aA) * r, Ay = cy + Math.sin(aA) * r, Bx = cx + Math.cos(aB) * r, By = cy + Math.sin(aB) * r
    // the two rays and the angle arc between them, with the live angle written in the middle
    x.save(); x.globalAlpha *= pk
    x.strokeStyle = 'rgba(244,241,232,0.65)'; x.lineWidth = 4; x.setLineDash([10, 8])
    x.beginPath(); x.moveTo(cx, cy); x.lineTo(Ax, Ay); x.moveTo(cx, cy); x.lineTo(Bx, By); x.stroke(); x.setLineDash([])
    if (ang > 2) { x.strokeStyle = EX.chalkYellow; x.lineWidth = 5; x.beginPath(); x.arc(cx, cy, 46, aA, aB); x.stroke() }
    // the aspect line itself, planet to planet
    x.strokeStyle = EX.chalkPink; x.lineWidth = 6; x.beginPath(); x.moveTo(Ax, Ay); x.lineTo(Bx, By); x.stroke()
    x.font = "700 30px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = EX.chalkYellow
    const lx = cx, ly = cy + r + 26
    if (t > M.a0) x.fillText(`ANGLE: ${Math.round(ang)}°`, lx, ly)
    // the planets
    const planet = (px, py, c) => { R(x, INK, px - 17, py - 17, 34, 34); R(x, c, px - 13, py - 13, 26, 26); R(x, '#ffffff', px - 13, py - 13, 10, 8) }
    planet(Ax, Ay, '#ff86b8'); planet(Bx + (ang < 4 ? 14 : 0), By, '#9fdcff')
    x.restore()
    // the conversation: little chat bubbles off each planet
    for (const [px, py, at, dx] of [[Ax, Ay, M.conv + 0.7, -1], [Bx, By, M.conv + 1.1, 1]]) {
      const below = dx > 0
      const p = pop01(t, at, 0.3, 2.6)
      if (p <= 0) continue
      x.save(); x.translate(below ? px - 20 : px - 44, below ? py + 52 : py - 40); x.scale(p, p)
      R(x, INK, -38, -24, 76, 44); R(x, EX.chalk, -34, -20, 68, 36); R(x, EX.chalk, dx > 0 ? -30 : 20, 14, 12, 12)
      for (let i = 0; i < 3; i++) R(x, INK, -20 + i * 16, -6, 8, 8)
      x.restore()
    }
  },
  cues: T => [
    ...[T.M.a0 + 0.2, T.M.a60 + 0.2, T.M.a60 + 1.0, T.M.a120 + 0.2, T.M.a120 + 1.1].map((v, i) => ['pluck', +v.toFixed(3), [415.3, 523.25, 622.25, 698.46, 830.61][i], 0.04, 0.5, 0]),
    ['pop', +(T.M.conv + 0.7).toFixed(3), 1046.5, 0.035, -0.3], ['pop', +(T.M.conv + 1.1).toFixed(3), 1244.5, 0.035, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const T = EP.T
