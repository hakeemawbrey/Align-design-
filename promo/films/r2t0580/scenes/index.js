// r2t0580: star_talk, ROLL CALL (twelve signs), "The signs | *kayaking.*" (signs3kit social cut, music: lofi · F).
// Every card: the star sits in a little kayak on the water. Each sign's most extreme self:
//   ♈ paddled so hard they went backwards · ♉ fell asleep, drifting · ♊ talked the whole time, zero strokes
//   · ♋ packed life jackets for the fish · ♌ wore a crown on the river · ♍ read the safety card, corrected it
//   · ♎ apologised to the river for splashing · ♏ found the deepest spot, stared into it · ♐ missed the exit, reached the
//   ocean · ♑ timed every stroke, personal best · ♒ added a motor and a sail · ♓ saw a fish, cried, waved.
// Ending: callback ("Taurus is still | drifting." — Taurus asleep in the kayak, ETA: TUESDAY).
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#6fc3ff', ST = { x: -170, y: -20 }
const b = (x, bm, c, cx, cy, cell, o) => drawBits(x, bm, c, cx, cy, cell, o)
const CROWN = ['Y..Y..Y', 'YY.Y.YY', 'YYYYYYY', 'YRYYYRY', 'YYYYYYY']
const VEST = ['O.O', 'OOO', 'OWO', 'OOO']
const WATCH = ['..KK..', '.KWWK.', 'KWWKWK', 'KWWKWK', 'KWWWWK', '.KWWK.', '..KK..']

// water band across the panel bottom
function water(x, t, y = 1040) {
  x.save(); x.beginPath(); x.rect(110, y, 860, 1230 - y); x.clip()
  x.fillStyle = 'rgba(111,195,255,0.28)'; x.fillRect(110, y, 860, 1230 - y)
  x.strokeStyle = 'rgba(239,230,214,0.55)'; x.lineWidth = 5
  for (let r = 0; r < 3; r++) { x.beginPath(); for (let i = 0; i <= 30; i++) { const px = 110 + i * 30, py = y + 24 + r * 48 + 6 * Math.sin(i * 0.9 + t * 3 + r); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
// a kayak hull centred on (cx, cy), in colour col, with an optional paddle angle
function kayak(x, t, cx, cy, k, col = '#ffb34a', paddle = null) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + 4 * Math.sin(t * 3)); x.rotate(0.03 * Math.sin(t * 2.2)); x.scale(k, k)
  if (paddle !== null) {
    x.save(); x.rotate(paddle); x.fillStyle = INK; x.fillRect(-230, -12, 460, 24); x.fillStyle = WOOD; x.fillRect(-224, -6, 448, 12)
    for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 230 - 34, -34, 68, 68); x.fillStyle = GOLD; x.fillRect(s * 230 - 28, -28, 56, 56) }
    x.restore()
  }
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 250, 56, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(0, 0, 240, 46, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(-170, -26, 340, 10)
  x.restore()
}
const scene = (col, paddle) => (x, t, lt, P) => { water(x, t); }
const boatFront = (x, t, P, col, paddle) => kayak(x, t, 370, 1030, pop01(t, P.t0 + 0.05, 0.4, 1.8), col, paddle)

const CAMEOS = [
  { sign: 'aries', cap: 'Paddled so hard | they *went backwards.*', mood: lt => lt > 1.3 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.5, 0.8, 1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#ff6b5a', Math.sin(t * 16) * 0.6)
      for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.45)'; x.fillRect(640 + (i % 2) * 40, 900 + i * 34, 140, 8) }
      L(x, 790, 700, 'DIRECTION: WRONG', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'taurus', cap: 'Fell asleep. | *Now drifting.*', mood: 'sleepy', star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#5fd068', null)
      zzz(x, t, 440, 680)
      L(x, 790, 760, 'DESTINATION: ?', pop01(t, P.t0 + 1.0, 0.3, 2.4), MINT, 0.04, 34)
    } },
  { sign: 'gemini', cap: 'Talked the whole time. | *Zero strokes.*', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#ffd23a', 0.9)
      const W = ['so anyway—', 'and THEN—', 'wait, a duck!']
      bubble(x, 790, 700, W[Math.min(2, Math.floor(lt / 0.7))], pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      L(x, 790, 900, 'STROKES: 0', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 38)
    } },
  { sign: 'cancer', cap: 'Packed life jackets. | *For the fish.*', mood: 'heart', look: [1, 0], star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#8fe3ff', null)
      for (let i = 0; i < 3; i++) {
        const fx = 650 + i * 115, fy = 1090 + (i % 2) * 50 + 10 * Math.sin(t * 3 + i), k = pop01(t, P.t0 + 0.4 + i * 0.2, 0.3, 2)
        bits(x, 'FISH', fx, fy, 12 * k)
        b(x, VEST, { O: '#ff9a4a', W: '#ffffff' }, fx - 6, fy + 2, 9 * pop01(t, P.t0 + 0.9 + i * 0.2, 0.25, 2.4))
      }
      L(x, 790, 760, 'EVERYONE SAFE', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Wore a crown. | *On the river.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    back: scene(),
    front(x, t, lt, P, F) {
      boatFront(x, t, P, '#ffb34a', 0.2)
      b(x, CROWN, { Y: GOLD, R: RED }, F.x, F.top - 30, 16 * pop01(t, P.t0 + 0.4, 0.3, 2.2))
      L(x, 790, 760, 'CROWN: WATERPROOF', pop01(t, P.t0 + 1.2, 0.3, 2.4), '#ffb34a', 0.05, 30)
      sparkles(x, t, F.x, F.top - 30, P.t0 + 0.7, 6, 120, 0.2)
    } },
  { sign: 'virgo', cap: 'Read the safety card. | *Corrected it.*', mood: 'squint', look: [1, 0], star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#7dffb0', null)
      sheet(x, 790, 780, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 300, h: 260, head: 'SAFETY', headBg: '#2fc79a', headInk: INK, font: MONO, weight: 700, size: 26, lines: ['1. paddle', '2. float', ['3. pdadle', RED]], progress: prog(lt, 0.3, 1.0) })
      if (lt > 1.2) { x.save(); x.strokeStyle = RED; x.lineWidth = 7; x.beginPath(); x.ellipse(790, 822, 110, 34, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
    } },
  { sign: 'libra', cap: 'Splashed once. | Said *sorry* to the river.', mood: lt => lt > 0.8 ? 'squint' : 'happy', look: [1, 1], star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#ff8fb1', 0.5)
      if (lt > 0.4 && lt < 1.0) for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35, r = 80 * prog(lt, 0.4, 1.0); x.fillStyle = SKYB; x.fillRect(620 + Math.cos(a) * r, 1020 + Math.sin(a) * r, 12, 12) }
      bubble(x, 790, 760, 'so sorry, | river!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Found the deepest spot. | *Stared into it.*', mood: 'neutral', look: [1, 1], star: ST,
    back(x, t, lt, P) {
      water(x, t)
      const k = clamp((lt - 0.3) / 0.6)
      x.save(); x.globalAlpha = k; x.fillStyle = '#0a0620'; x.beginPath(); x.ellipse(790, 1130, 150, 50, 0, 0, Math.PI * 2); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      boatFront(x, t, P, '#c97bff', null)
      L(x, 790, 760, 'DEPTH: UNKNOWN', pop01(t, P.t0 + 1.0, 0.3, 2.4), LAV, -0.04, 34)
      L(x, 790, 900, 'IT STARED BACK', pop01(t, P.t0 + 1.7, 0.3, 2.4), PINK, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Missed the exit. | *Reached the ocean.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.7, 1.5],
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#c97bff', Math.sin(t * 6) * 0.5)
      bits(x, 'WAVE', 790, 900 + 8 * Math.sin(t * 3), 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 720, 'RIVER? WHAT RIVER', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Timed every stroke. | *Personal best.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#9aa5c4', Math.sin(t * 8) * 0.5)
      b(x, WATCH, { K: INK, W: '#ffffff' }, 790, 760, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 920, lt > 1.4 ? 'NEW PB: 4:02' : `${(lt * 1.6).toFixed(1)} S`, pop01(t, P.t0 + 0.5, 0.3, 2.4), '#2fc79a', 0.04, 34)
    } },
  { sign: 'aquarius', cap: 'Added a motor. | *And a sail.*', mood: lt => lt > 1.0 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.3],
    back(x, t, lt, P) {
      water(x, t)
      const k = pop01(t, P.t0 + 0.4, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(560, 1000); x.scale(k, k); x.fillStyle = INK; x.fillRect(-8, -440, 16, 440); x.beginPath(); x.moveTo(16, -430); x.lineTo(16, -60); x.lineTo(300, -60); x.closePath(); x.fill(); x.fillStyle = MINT; x.beginPath(); x.moveTo(24, -410); x.lineTo(24, -70); x.lineTo(280, -70); x.closePath(); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      boatFront(x, t, P, '#6fc3ff', null)
      bits(x, 'GADGET', 640, 1040, 10 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: Math.sin(t * 30) * 0.05 })
      L(x, 800, 1150, 'KAYAK 2.0', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 34)
    } },
  { sign: 'pisces', cap: 'Saw a fish. | *Cried. Waved.*', mood: lt => lt < 0.9 ? 'sparkle' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back: scene(),
    front(x, t, lt, P) {
      boatFront(x, t, P, '#b7a6ff', null)
      bits(x, 'FISH', 790, 1110 - 30 * Math.max(0, Math.sin(t * 3)), 16 * pop01(t, P.t0 + 0.3, 0.3, 2), { sx: -1 })
      bubble(x, 790, 760, 'hi friend!!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: SKYB, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0580', key: 'F', accent: ACC, ending: 'callback',
  title: 'The signs | *kayaking.*',
  cameos: CAMEOS,
  card: { a: 'taurus', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'One river. | *Twelve problems.*' },
  last: {
    text: 'Taurus is still | *drifting.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 540, 1020, 300 * k, { mood: 'sleepy', seed: 7 })
      kayak(x, t, 540, 1170, 1.0 * k, '#5fd068', null)
      if (lt > 0.8) zzz(x, t, 600, 880)
      L(x, 540, 1320, 'ETA: TUESDAY', pop01(t, t0 + 1.3, 0.3, 2.4), MINT, -0.04, 40)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
