// v3a062: ADVICE ROLL CALL, "What each sign | can't fake." (~54 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order: the one thing each sign can't fake (it's always something sweet). Ending: group.
//   0.0–3.6    "What each sign | *can’t fake.*"
//   3.6–49.2   ♈ being excited (CHILL MODE: FAILED) · ♉ liking bad food ("it's… fine") · ♊ not being curious (DO NOT OPEN, opened)
//              · ♋ being over it (the sign cracks) · ♌ a fake compliment (CERTIFIED REAL) · ♍ not noticing your haircut (−1 cm)
//              · ♎ loving ugly decor (the lamp) · ♏ a poker face (all hearts) · ♐ sitting still (sat for: 4 sec)
//              · ♑ not being proud of you (the framed certificate) · ♒ blending in (the disguise) · ♓ holding back tears (the bucket)
//  49.2        "Real ones. | *Can’t hide it.*"  (the ending: group beat)
import { makeFilm, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { note, stamp, frame, tableTop, bits, confetti, ORANGE, RED, TEAL, CREAM, GREY, BROWN, clamp, prog, ease, lerp } from './props.js'

// a playing card (face up shows a heart)
function card(x, cx, cy, k, rot, up) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * Math.max(0.05, Math.abs(Math.cos(up * Math.PI))), k)
  x.fillStyle = INK; x.fillRect(-66, -96, 132, 192)
  if (up < 0.5) { x.fillStyle = '#6b62a8'; x.fillRect(-60, -90, 120, 180); x.fillStyle = LAV; for (let i = 0; i < 5; i++) x.fillRect(-48 + i * 22, -78, 10, 156) }
  else { x.fillStyle = CREAM; x.fillRect(-60, -90, 120, 180); x.fillStyle = '#ff4f86'; x.font = `800 90px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥', 0, 6) }
  x.restore()
}
// a moustache-and-glasses disguise drawn on the star's face
function disguise(x, F, k) {
  if (k <= 0.01) return
  x.save(); x.translate(F.x, F.cy + 20); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-80, -42, 64, 46); x.fillRect(16, -42, 64, 46); x.fillRect(-18, -30, 36, 10)
  x.fillStyle = 'rgba(143,227,255,0.35)'; x.fillRect(-72, -34, 48, 30); x.fillRect(24, -34, 48, 30)
  x.fillStyle = BROWN; x.beginPath(); x.ellipse(-34, 30, 40, 14, -0.2, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(34, 30, 40, 14, 0.2, 0, Math.PI * 2); x.fill()
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Being excited. | *Zero chill.*', mood: 'sparkle', star: { x: -190 }, hops: [0.4, 0.8, 1.2, 1.6, 2.0],
    front(x, t, lt, P) {
      label(x, 790, 720, 'CHILL MODE: ON', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      stamp(x, 830, 815, pop01(t, P.t0 + 0.9, 0.3, 2.6), 'FAILED', { col: RED, size: 50, rot: -0.2 })
      bubble(x, 790, 990, 'WE’RE GOING?!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      sparkles(x, t, 400, 820, P.t0 + 0.9, 7, 170, 0.4)
    } },
  { sign: 'taurus', cap: 'Liking | *bad food.*', mood: lt => lt > 0.9 ? 'squint' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      tableTop(x, 790, 980, k, { w: 300 })
      if (k > 0.01) { x.save(); x.translate(790, 950); x.scale(k, k); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 112, 30, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4f0ff'; x.beginPath(); x.ellipse(0, -2, 104, 24, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f9a6a'; x.beginPath(); x.ellipse(0, -14, 64, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#6f7a4a'; x.fillRect(-20, -26, 14, 10); x.fillRect(16, -20, 12, 8); x.restore() }
      bubble(x, 790, 680, 'mmm. it’s… | fine!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 1150, 'FACE: SAYS OTHERWISE', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Not being | *curious.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 }, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), open = ease.outCubic(prog(lt, 1.0, 1.3))
      bits(x, 'BOX', 790, 920, 22 * k)
      if (open > 0) { x.save(); x.translate(790 - 120, 880 - open * 60); x.rotate(-open * 0.8); x.fillStyle = INK; x.fillRect(-6, -6, 276, 34); x.fillStyle = '#c08a4e'; x.fillRect(0, 0, 264, 22); x.restore() }
      label(x, 790, 760 - open * 80, 'DO NOT OPEN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: RED, color: CREAM, rot: -0.04 })
      bubble(x, 430, 600, 'just a peek!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bc' })
      sparkles(x, t, 790, 880, P.t0 + 1.3, 6, 120, 0.3)
    } },
  { sign: 'cancer', cap: 'Being | *over it.*', mood: lt => lt > 1.2 ? 'wide' : 'neutral', look: [1, 0], tears: lt => lt > 1.3 ? 2 : 0, star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 790, 820, k, { w: 340, h: 150, bg: '#d9a86a', lines: ['I’M OVER IT'], size: 42, rot: -0.05 })
      if (lt > 1.0 && k > 0.9) { x.save(); x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(760, 745); x.lineTo(800, 790); x.lineTo(770, 830); x.lineTo(815, 895); x.stroke(); x.restore() }
      label(x, 790, 1000, '(NOT OVER IT)', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 34, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'leo', cap: 'A fake | *compliment.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'honestly? | STUNNING.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, tail: 'bl' })
      stamp(x, 790, 920, pop01(t, P.t0 + 1.1, 0.3, 2.6), 'CERTIFIED REAL', { col: TEAL, size: 38, rot: -0.12 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 200, 0.2)
    } },
  { sign: 'virgo', cap: 'Not noticing | *your haircut.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(780, 850); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill(); x.fillStyle = '#d8f4ff'; x.beginPath(); x.arc(0, 0, 88, 0, Math.PI * 2); x.fill()
        x.fillStyle = BROWN; for (let i = 0; i < 9; i++) x.fillRect(-60 + i * 14, -10 + (i % 2) * 8, 8, 34)
        x.fillStyle = INK; x.save(); x.rotate(0.7); x.fillRect(96, -14, 120, 28); x.restore()
        x.restore()
      }
      label(x, 760, 1080, 'TRIMMED: 1 CM. NOTED.', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 430, 600, 'love the cut!', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'libra', cap: 'Liking | *ugly decor.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bits(x, 'LAMP', 800, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 620, 'it’s… so… | BOLD!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 800, 1110, 'EYE: TWITCHING', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A poker face | *around you.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 0; i < 3; i++) card(x, 700 + i * 90, 860 + (i === 1 ? -20 : 0), k, (i - 1) * 0.2, prog(lt, 0.9 + i * 0.15, 1.25 + i * 0.15))
      label(x, 790, 1090, 'BLUFF: FAILED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sitting still. | *Physically can’t.*', mood: 'sparkle', star: { x: -150 }, hops: [0.3, 0.7, 1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      bits(x, 'CHAIR', 820, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.12 * Math.sin(t * 9) })
      label(x, 820, 720, 'SAT FOR: 4 SEC', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      label(x, 820, 800, '(A RECORD)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Not being | *proud of you.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      frame(x, 790, 790, pop01(t, P.t0 + 0.3, 0.3, 2), x => {
        x.fillStyle = CREAM; x.fillRect(-116, -91, 232, 182); x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('YOU DID A', 0, -40); x.font = `800 34px ${INTER}`; x.fillText('GREAT JOB', 0, 0); bits(x, 'MEDAL', 0, 56, 6)
      }, { rot: -0.03, caption: 'HUNG BY CAP' })
      bubble(x, 430, 600, '“it’s fine.”', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 38, col: LAV, tail: 'bc' })
      sparkles(x, t, 790, 790, P.t0 + 1.4, 7, 190, 0.6)
    } },
  { sign: 'aquarius', cap: 'Blending in. | *Not once.*', mood: 'happy', star: { x: -190 },
    front(x, t, lt, P, F) {
      disguise(x, F, pop01(t, P.t0 + 0.4, 0.3, 2.2))
      for (let i = 0; i < 3; i++) { const k = pop01(t, P.t0 + 0.8 + i * 0.15, 0.3, 2); if (k > 0.01) { x.save(); x.globalAlpha = 0.9; x.fillStyle = GREY; x.fillRect(680 + i * 90, 960 - 70 * k, 60, 70 * k); x.restore() } }
      label(x, 790, 760, 'BLENDING IN…', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: GREY, rot: -0.04, font: MONO, weight: 700 })
      stamp(x, 830, 850, pop01(t, P.t0 + 1.6, 0.3, 2.6), 'NOPE', { col: RED, size: 46 })
    } },
  { sign: 'pisces', cap: 'Holding back tears. | *Never once.*', mood: 'wide', tears: 3, star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'BUCKET', 400, 1110, 16 * k)
      bits(x, 'BUCKET', 800, 990, 16 * pop01(t, P.t0 + 1.0, 0.3, 2))
      label(x, 800, 760, 'BUCKET #2', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 800, 620, 'it’s a cute dog!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'v3a062', key: 'E', accent: PINK, ending: 'group',
  title: 'What each sign | *can’t fake.*',
  cameos: CAMEOS,
  group: {
    cap: 'Real ones. | *Can’t hide it.*',
    draw(x, t, lt) { hearts(x, t, 540, 1000, t - lt + 1.2, { n: 10, life: 2.6, spread: 760, cell: 8, seed: 4 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
