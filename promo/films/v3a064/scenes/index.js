// v3a064: ADVICE ROLL CALL, "What each sign | needs to forgive." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: the (mostly tiny) thing each sign should let go of, kindly. Ending: callback.
//   0.0–3.6    "What each sign | *needs to forgive.*"
//   3.6–49.2   ♈ their own temper (the kettle cools) · ♉ changing their mind (NEVER → OKAY, MAYBE) · ♊ every abandoned hobby
//              · ♋ their younger self (a hug for mini Cancer) · ♌ that one haircut (2012, framed) · ♍ a typo from 2019
//              · ♎ picking a side (it was allowed) · ♏ whoever ate their leftovers (Gemini, whistling)
//              · ♐ the flight they missed · ♑ taking a sick day · ♒ muting the group chat · ♓ the very long text
//  49.2        "Let it go. | *Gently.*"
//  52.6        callback: "Gemini *replaced* | the leftovers."  the container comes back, full.
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, phone, frame, bits, ORANGE, RED, TEAL, CREAM, GREY, BROWN, WOOD, clamp, prog, ease, lerp } from './props.js'

// a takeaway box with a name label; full by `full`
function leftovers(x, cx, cy, k, full, name = 'SCORPIO’S') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-110, -40, 236, 130)
  x.fillStyle = INK; x.fillRect(-122, -52, 244, 140)
  x.fillStyle = '#e8f6ff'; x.fillRect(-114, -44, 228, 124)
  if (full > 0) { x.fillStyle = '#e8a24a'; x.fillRect(-100, 80 - 100 * full, 200, 100 * full - 14); x.fillStyle = '#5fd068'; for (let i = 0; i < 5; i++) x.fillRect(-84 + i * 38, 76 - 100 * full + 8, 18, 12) }
  else { x.fillStyle = '#c9c0b0'; x.fillRect(-60, 50, 12, 8); x.fillRect(30, 56, 10, 8) }
  x.fillStyle = GOLD; x.fillRect(-90, -100, 180, 44); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -77)
  x.restore()
}
// steam puffs
function steam(x, t, cx, cy, a) {
  if (a <= 0.01) return
  x.save(); x.globalAlpha = a
  for (let i = 0; i < 4; i++) { const ph = (t * 0.9 + i / 4) % 1; x.fillStyle = 'rgba(239,230,214,0.8)'; x.beginPath(); x.arc(cx + Math.sin(ph * 6 + i) * 20, cy - ph * 160, 14 + ph * 22, 0, Math.PI * 2); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Their temper. | It was *passion.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'KETTLE', 790, 940, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lt < 1.2 ? 0.05 * Math.sin(t * 30) : 0 })
      steam(x, t, 800, 820, 1 - prog(lt, 1.0, 1.5))
      label(x, 790, 700, lt < 1.3 ? 'TEMP: 100°' : 'COOLED DOWN ✓', pop01(t, P.t0 + 0.5, 0.3, 2.2), { size: 34, bg: lt < 1.3 ? RED : MINT, color: lt < 1.3 ? CREAM : INK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Changing | *their mind.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 1.0, 1.4)), sy = Math.abs(Math.cos(flip * Math.PI))
      x.save(); x.translate(790, 840); x.scale(1, Math.max(0.05, sy)); x.translate(-790, -840)
      note(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 170, bg: flip < 0.5 ? '#d9a86a' : MINT, lines: flip < 0.5 ? ['NEVER.'] : ['OKAY,', 'MAYBE.'], size: 50, rot: 0 })
      x.restore()
      label(x, 790, 1050, 'GROWTH ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'Every | *abandoned hobby.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wink', star: { x: -190 }, hops: [1.4],
    front(x, t, lt, P) {
      const items = [['BOOK', 700, 1010, 12], ['SKATE', 880, 1060, 9], ['CAMERA', 840, 930, 9], ['SOCK', 720, 880, 9], ['CASSETTE', 880, 810, 9]]
      items.forEach(([n, ix, iy, c], i) => bits(x, n, ix, iy, c * pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { rot: (i % 2 ? 0.15 : -0.12) }))
      label(x, 790, 690, 'PHASE 1 OF 40', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 36, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Their younger self. | *Hug them.*', mood: 'heart', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.4, 0.35, 2), near = ease.inOutCubic(prog(lt, 0.9, 1.5))
      if (k > 0.01) signChar(x, t, 'cancer', lerp(800, 650, near), 1010, 140 * k, { mood: near > 0.9 ? 'heart' : 'wide', look: [-1, 0], seed: 13, glyph: false, hops: [P.t0 + 2.0] })
      label(x, lerp(800, 650, near), 870, 'MINI YOU', pop01(t, P.t0 + 0.7, 0.3, 2.2), { size: 30, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 560, 900, P.t0 + 1.6, { n: 6, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: 'leo', cap: 'That one | *haircut.*', mood: lt => lt > 1.3 ? 'wink' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      frame(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), x => {
        x.fillStyle = '#ffe7a8'; x.fillRect(-116, -91, 232, 182)
        signChar(x, t, 'leo', 0, 20, 150, { mood: 'squint', seed: 62, glyph: false, glow: 0.3 })
        x.fillStyle = INK; x.fillRect(-58, -66, 116, 40); x.fillStyle = BROWN; x.fillRect(-52, -60, 104, 30); x.fillRect(-52, -30, 14, 16); x.fillRect(38, -30, 14, 16)
      }, { caption: 'LEO · 2012', rot: 0.05 })
      label(x, 790, 1080, 'STILL A KING', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'A typo | *from 2019.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      note(x, 790, 830, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 220, title: 'SENT · 2019', titleBg: GREY, lines: ['thanks for', 'teh help!'], size: 42, rot: 0.04 })
      const c = ease.outCubic(prog(lt, 0.7, 1.1))
      if (c > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(748, 884, 60, 36, 0.04, 0, c * Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 1060, 'LET IT GO. ✦', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04 })
    } },
  { sign: 'libra', cap: 'Picking a side. | *It was allowed.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      label(x, 690, 780, 'PIZZA', k, { size: 40, bg: ORANGE, rot: -0.05 })
      label(x, 890, 780, 'TACOS', k, { size: 40, bg: MINT, rot: 0.05 })
      if (lt > 1.0) { const c = pop01(t, P.t0 + 1.0 * 1.29, 0.3, 2.4); x.save(); x.strokeStyle = PINK; x.lineWidth = 8; x.beginPath(); x.ellipse(690, 780, 100 * c, 54 * c, -0.05, 0, Math.PI * 2); x.stroke(); x.restore() }
      label(x, 790, 1000, 'NOBODY GOT HURT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Whoever ate | *their leftovers.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      leftovers(x, 680, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 0)
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 870, 980, 160 * k, { mood: 'wink', look: [1, -1], seed: 23, glyph: false })
      bubble(x, 870, 780, '♪ wasn’t me ♪', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 32, tail: 'bc' })
      label(x, 680, 1080, 'FORGIVEN (MOSTLY)', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 28, bg: LAV, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'The flight | *they missed.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', look: [1, -1], star: { x: -190 },
    back(x, t, lt, P) { const p = prog(lt, 0.1, 1.6); if (p > 0 && p < 1) bits(x, 'PLANE', lerp(620, 1000, p), 640 - 80 * p, 14, { rot: -0.15 }) },
    front(x, t, lt, P) {
      bits(x, 'SUITCASE', 760, 1020, 14 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 840, 'next one’s | in an hour!', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'capricorn', cap: 'Taking | *a sick day.*', mood: lt => lt > 1.2 ? 'sleepy' : 'squint', star: { x: -190 },
    front(x, t, lt, P, F) {
      bits(x, 'THERMO', F.x + 70, F.cy + 30, 9 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.8 })
      note(x, 800, 820, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 330, h: 180, title: 'AUTO-REPLY', titleBg: SKYB, lines: ['out sick.', 'no guilt.'], size: 40, rot: 0.05 })
      bits(x, 'MUG', 800, 1040, 10 * pop01(t, P.t0 + 1.3, 0.3, 2))
    } },
  { sign: 'aquarius', cap: 'Muting | *the group chat.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const n = 12 + Math.floor(clamp(lt / 1.1) * 300)
      phone(x, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2), { time: 'CHAT', head: 'THE GROUP:', body: lt < 1.2 ? [`${n} new`, 'messages'] : ['MUTED', 'peace ✦'], bodyBg: lt < 1.2 ? PINK : MINT, size: 34 })
      label(x, 790, 1100, 'STILL FRIENDS ✓', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Sending | *the long text.*', mood: lt => lt > 1.4 ? 'happy' : 'wide', tears: lt => lt > 1.4 ? 1 : 2, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const len = lerp(80, 480, ease.outCubic(prog(lt, 0.3, 1.4))), k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 560); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-124, -8, 248, len + 16); x.fillStyle = LAV; x.fillRect(-116, 0, 232, len)
        x.fillStyle = 'rgba(27,18,54,0.55)'; for (let y = 24; y < len - 14; y += 28) x.fillRect(-96, y, 150 + (y * 7) % 40, 10)
        x.restore()
      }
      label(x, 790, 1110, 'THEY REPLIED: ♥', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a064', key: 'G', accent: SKYB, ending: 'callback',
  title: 'What each sign | *needs to forgive.*',
  cameos: CAMEOS,
  group: { cap: 'Let it go. | *Gently.*' },
  last: {
    text: 'Gemini *replaced* | the leftovers.',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.35, 2)
      leftovers(x, 540, 900, k, ease.outCubic(prog(lt, 1.0, 1.8)))
      const a = pop01(t, t - lt + 0.8, 0.35, 2)
      if (a > 0.01) signChar(x, t, 'scorpio', 330, 1180, 220 * a, { mood: lt > 1.8 ? 'heart' : 'squint', seed: 34, hops: [t - lt + 2.0] })
      if (a > 0.01) signChar(x, t, 'gemini', 750, 1180, 220 * a, { mood: 'wink', look: [-1, 0], seed: 35 })
      hearts(x, t, 540, 1180, t - lt + 2.0, { n: 6, life: 1.8, spread: 400, cell: 7, seed: 3 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
