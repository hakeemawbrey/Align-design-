// r2t0224: star_talk, ROLLCALL, "The signs at | a bubble tea shop." (~57 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs in zodiac order, each the most extreme version of itself ordering bubble tea.
//   0.0–3.6    "The signs at | *a bubble tea shop.*"
//   3.6–49.2   ♈ one sip, brain freeze · ♉ extra pearls, the cup is all pearls · ♊ changed the order five times
//              · ♋ one for the whole group chat · ♌ "icon" written on the cup · ♍ measured the ice, exactly 30%
//              · ♎ chose it for the aesthetic · ♏ knows the secret menu, by sign · ♐ launched a pearl across the room
//              · ♑ forty full loyalty cards · ♒ ordered the moon-sign special, loved it · ♓ dropped one pearl, mourned it
//  49.2        "Extra pearls. | *Extra drama.*"   52.6  callback: "Sag’s pearl | *just landed.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const TAN = '#e8c49a', PEARL = '#3a2a2a'

/** a bubble tea cup: dome lid, straw, liquid colour, pearls (0…1 fill of the cup with pearls), fill level */
function cup(x, t, cx, cy, s, k, { col = TAN, pearls = 0.25, level = 1, text = null, textCol = INK, straw = PINK, rot = 0, bow = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s * k, s * k)
  // straw
  x.fillStyle = INK; x.fillRect(14, -190, 30, 120); x.fillStyle = straw; x.fillRect(20, -186, 18, 116)
  // body (trapezoid)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-96, -86); x.lineTo(96, -86); x.lineTo(76, 120); x.lineTo(-76, 120); x.closePath(); x.fill()
  x.fillStyle = '#eef4ff'; x.beginPath(); x.moveTo(-88, -80); x.lineTo(88, -80); x.lineTo(70, 112); x.lineTo(-70, 112); x.closePath(); x.fill()
  const top = lerp(112, -70, clamp(level))
  x.save(); x.beginPath(); x.moveTo(-88, -80); x.lineTo(88, -80); x.lineTo(70, 112); x.lineTo(-70, 112); x.closePath(); x.clip()
  x.fillStyle = col; x.fillRect(-100, top, 200, 240)
  const ph = lerp(112, -70, clamp(pearls))
  for (let yy = 100; yy > ph; yy -= 22) for (let xx = -80 + ((yy / 22) % 2) * 11; xx < 80; xx += 22) { x.fillStyle = PEARL; x.beginPath(); x.arc(xx, yy, 9, 0, Math.PI * 2); x.fill() }
  x.restore()
  // lid
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -86, 104, 18, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(238,244,255,0.9)'; x.beginPath(); x.ellipse(0, -88, 96, 12, 0, 0, Math.PI * 2); x.fill()
  if (text) { txt(x, text, 0, 10, { size: 34, font: MONO, weight: 700, color: textCol }) }
  if (bow) drawBits(x, ['P...P', 'PP.PP', 'PPPPP', 'PP.PP', 'P...P'], { P: PINK }, -60, -40, 8)
  x.restore()
}
const pearl = (x, px, py, r = 12) => { x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = PEARL; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8a7070'; x.fillRect(px - r / 2, py - r / 2, r / 2.5, r / 2.5) }

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'One sip. | *Brain freeze.*', mood: lt => lt > 0.9 ? 'wide' : 'squint', star: L, hops: [1.0],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cup(x, t, 790, 900, 1.3, pop01(t, P.t0 + 0.2, 0.3, 2), { level: 1 - ease.inCubic(prog(lt, 0.4, 0.8)), pearls: 0.25 * (1 - prog(lt, 0.4, 0.8)) })
      if (lt > 0.9) for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + t; x.fillStyle = i % 2 ? SKYB : '#ffffff'; x.fillRect(380 + Math.cos(a) * 170 - 8, 820 + Math.sin(a) * 60 - 8, 16, 16) }
      label(x, 790, 1120, 'BRAIN: FROZEN', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 34, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Extra pearls. | *Cup is all pearls.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: L,
    front(x, t, lt, P) {
      cup(x, t, 790, 900, 1.3, pop01(t, P.t0 + 0.2, 0.3, 2), { pearls: lerp(0.2, 1, ease.outCubic(prog(lt, 0.4, 1.4))) })
      label(x, 790, 660, 'PEARLS: YES', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      label(x, 790, 1130, 'TEA: ALLEGEDLY', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Changed the order | *five times.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.4) % 2 ? 1 : -1, 0], star: L,
    front(x, t, lt, P) {
      const n = Math.min(4, Math.floor(Math.max(0, lt - 0.3) / 0.38)), C = [TAN, MINT, PINK, LAV, '#ffe066']
      cup(x, t, 790, 920, 1.2, pop01(t, P.t0 + 0.2, 0.3, 2), { col: C[n] })
      bubble(x, 790, 660, ['taro!', 'no, matcha!', 'strawberry?', 'wait, taro', 'surprise me'][n], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 1150, `ORDER #${n + 1}`, pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Bought one for | *the whole group chat.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      for (let i = 0; i < 6; i++) cup(x, t, 680 + (i % 3) * 110, 830 + Math.floor(i / 3) * 210, 0.55, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { col: [TAN, PINK, MINT][i % 3] })
      label(x, 790, 640, 'TRAY 1 OF 3', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'Asked them to write | *“icon”* on it.', mood: 'sparkle', star: L, hops: [1.3],
    front(x, t, lt, P) {
      cup(x, t, 790, 900, 1.35, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#ffcf7a', text: lt > 0.7 ? 'ICON' : null })
      sparkles(x, t, 790, 900, P.t0 + 0.9, 7, 200, 0.4)
      label(x, 790, 1140, 'PHOTOS TAKEN: 31', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: ORANGE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Measured the ice. | *Exactly 30%.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      cup(x, t, 760, 910, 1.2, k, {})
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(886, 760, 44, 290); x.fillStyle = '#ffe066'; x.fillRect(892, 766, 32, 278); for (let i = 0; i < 12; i++) { x.fillStyle = INK; x.fillRect(892, 776 + i * 23, i % 3 ? 12 : 22, 4) } }
      label(x, 790, 660, 'ICE: 30.0%', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 40, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Picked it | *for the aesthetic.*', mood: 'heart', look: [1, 0], star: L,
    front(x, t, lt, P) {
      cup(x, t, 790, 900, 1.3, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#ffb3cc', straw: LAV, bow: lt > 0.8 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 190, 0.6, [PINK, LAV, BONE])
      label(x, 790, 1130, 'FLAVOUR: PINK', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knows the secret menu. | *Wrote half of it.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 870, 300, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#1b1236', rot: 0.04 }, () => {
        txt(x, 'SECRET MENU', 0, -150, { size: 28, font: MONO, weight: 700, color: '#ff6b8a' })
        txt(x, '(by sign)', 0, -112, { size: 22, font: MONO, weight: 700, color: GREY })
        ;['♏ midnight', '♏ black pearl', '♏ no comment'].forEach((s, i) => txt(x, s, 0, -40 + i * 60, { size: 28, font: MONO, weight: 700, color: BONE }))
      })
      label(x, 790, 1110, 'AUTHOR: SCORPIO', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Launched a pearl | *across the room.*', mood: 'sparkle', star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      cup(x, t, 400, 980, 0.9, pop01(t, P.t0 + 0.2, 0.3, 2), { col: LAV })
      const p = prog(lt, 0.6, 1.6)
      if (p > 0 && p < 1) pearl(x, lerp(420, 150, p), 790 - Math.sin(Math.PI * p) * 220)
      label(x, 320, 690, 'DISTANCE: 9 M', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Forty loyalty cards. | *All full.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      for (let j = 0; j < 3; j++) card(x, 300 + j * 14, 760 + j * 110, 300, 170, pop01(t, P.t0 + 0.2 + j * 0.2, 0.3, 2), { bg: CREAM, rot: -0.06 + j * 0.04 }, () => {
        txt(x, 'LOYALTY', 0, -55, { size: 24, font: MONO, weight: 700 })
        for (let i = 0; i < 10; i++) { const px = -112 + (i % 5) * 56, py = -6 + Math.floor(i / 5) * 50; x.fillStyle = INK; x.fillRect(px - 18, py - 18, 36, 36); x.fillStyle = TAN; x.fillRect(px - 14, py - 14, 28, 28) }
      })
      label(x, 310, 1140, 'FREE DRINKS: 40', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: '#2fc79a', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Ordered the weirdest one. | *Loved it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L, hops: [1.4],
    front(x, t, lt, P) {
      cup(x, t, 790, 920, 1.25, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#7dd8c0', straw: SKYB, pearls: 0.3 })
      label(x, 790, 650, 'MOON-SIGN SPECIAL', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 30, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1150, 'tastes like jazz', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 32, col: MINT, tail: 'bl' })
    } },
  { sign: 'pisces', cap: 'Dropped one pearl. | *Mourned it.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      cup(x, t, 830, 840, 0.9, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#b7a6ff' })
      const f = ease.inQuad(prog(lt, 0.4, 0.8))
      if (lt > 0.4) pearl(x, 730, lerp(820, 1110, f), 14)
      if (lt > 1.1) drawBits(x, ['.P.', 'PYP', '.P.', '.G.', '.G.'], { P: PINK, Y: SUN, G: GREEN }, 770, 1080, 12, { alpha: clamp((lt - 1.1) * 3) })
      label(x, 790, 650, 'R.I.P. PEARL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0224', key: 'D', accent: '#ffb3cc', ending: 'callback',
  title: 'The signs at | *a bubble tea shop.*',
  cameos: CAMEOS,
  group: { cap: 'Extra pearls. | *Extra drama.*' },
  last: {
    text: 'Sag’s pearl | *just landed.*',
    draw(x, t, lt) {
      cup(x, t, 540, 1120, 1.4, pop01(t, t - lt + 0.2, 0.4, 2), { col: TAN })
      const p = ease.inQuad(prog(lt, 0.6, 1.3))
      if (p < 1) pearl(x, lerp(980, 560, p), lerp(560, 960, p) - Math.sin(Math.PI * p) * 120, 16)
      else sparkles(x, t, 540, 960, t - lt + 1.3, 8, 160, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
