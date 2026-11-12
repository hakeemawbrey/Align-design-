// r2t0102: THE SIGNS AS… v3, BELIKE, "Loud chewer? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · E)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Loud chewer? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), pushed to the extreme:
//              ♈ out-chewed them, out of spite · ♉ didn't notice, also chewing · ♊ narrated it like a documentary
//              · ♋ offered them soup, quieter food · ♌ drowned it out with a solo · ♍ printed a decibel chart
//              · ♎ their match chews loud, smiled for an hour · ♏ checked their birth chart: Moon in Crunch
//              · ♐ moved out, same day · ♑ scheduled a meeting about it · ♒ invented silent chips · ♓ every crunch hurt their soul
//  49.2        "Crunch. | *Nobody's okay.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "The quiet soup? | *Slurped.*"  Cancer's soup comes back, loudly.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a'

// ── props
function bowl(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-170, -30); x.quadraticCurveTo(-160, 130, 0, 130); x.quadraticCurveTo(160, 130, 170, -30); x.closePath(); x.fill()
  x.fillStyle = '#ffb34a'; x.beginPath(); x.moveTo(-158, -24); x.quadraticCurveTo(-148, 118, 0, 118); x.quadraticCurveTo(148, 118, 158, -24); x.closePath(); x.fill()
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -30, 172, 30, 0, 0, 7); x.fill()
  x.fillStyle = '#f2c75c'; x.beginPath(); x.ellipse(0, -30, 160, 22, 0, 0, 7); x.fill()
  x.strokeStyle = 'rgba(255,255,255,0.55)'; x.lineWidth = 6
  for (let i = 0; i < 3; i++) { x.beginPath(); const sx = -50 + i * 50; for (let j = 0; j <= 12; j++) { const py = -70 - j * 10, px = sx + Math.sin(j * 0.8 + t * 4 + i) * 10; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
  x.restore()
}
const SANDWICH = ['.BBBBBBBBBB.', 'BBBWBBBWBBBB', 'GGGGGGGGGGGG', 'RRRRRRRRRRRR', 'YYYYYYYYYYYY', 'MMMMMMMMMMMM', 'GGGGGGGGGGGG', 'BBBBBBBBBBBB']
const SANDWICH_C = { B: '#e8a24a', W: '#fff4e2', G: '#5fd068', R: '#e23d4e', Y: '#ffd23a', M: '#b06a4a' }
const CASE = ['...KKKK...', '...K..K...', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', '.K......K.']
const CASE_C = { K: INK, R: '#c97bff', Y: GOLD }
function chipBag(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-130, -190); x.lineTo(130, -190); x.lineTo(150, 190); x.lineTo(-150, 190); x.closePath(); x.fill()
  x.fillStyle = '#6fc3ff'; x.beginPath(); x.moveTo(-120, -180); x.lineTo(120, -180); x.lineTo(138, 180); x.lineTo(-138, 180); x.closePath(); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 9; i++) x.fillRect(-120 + i * 28, -190, 14, 14)
  x.fillStyle = BONE; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SILENT', 0, -70); x.fillText('CHIPS', 0, -20)
  x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 90, 70, 44, 0.3, 0, 7); x.fill()
  x.restore()
}
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.25)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.arc(r * 0.25, -r * 0.1, r * 0.22, 0, 7); x.fill(); x.fillStyle = '#140c30'; x.beginPath(); x.arc(r * 0.33, -r * 0.16, r * 0.2, 0, 7); x.fill()
  x.restore()
}
const crunch = (x, t, cx, cy, k, s = 40, rot = -0.08, col = GOLD) => label(x, cx, cy, 'CRUNCH', k * (1 + 0.06 * Math.sin(t * 30)), { size: s, bg: col, rot })

const CAMEOS = [
  { sign: 'aries', cap: 'Out-chewed them. | *Out of spite.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: { x: -170 }, hops: [0.9, 1.3, 1.7],
    front(x, t, lt, P) {
      crunch(x, t, 790, 700, pop01(t, P.t0 + 0.25, 0.25, 2.2), 30, 0.06, BONE)
      crunch(x, t, 760, 900, pop01(t, P.t0 + 0.9, 0.3, 2.4), 64, -0.08, '#ff6b5a')
      label(x, 790, 1100, 'VOLUME: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Didn’t notice. | *Also chewing.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', star: { x: -170 },
    front(x, t, lt, P) {
      const bite = Math.floor(clamp((lt - 0.5) / 1.2) * 3)
      drawBits(x, SANDWICH.map(r => r.slice(0, 12 - bite * 2) + '.'.repeat(bite * 2)), SANDWICH_C, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      bubble(x, 790, 680, 'hm? what noise?', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Narrated it | *like a documentary.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 700, 'and here, | the wild chewer…', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      label(x, 790, 960, '● NOW AIRING', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Offered them soup. | *Quieter food.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bowl(x, t, 790, 960, pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 720, 'HOMEMADE', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Drowned it out. | With *a solo.*', mood: 'sparkle', star: { x: -170 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      if (lt > 0.4) notes(x, t, 560, 760, { n: 6, cell: 8, col: GOLD, alpha: clamp((lt - 0.4) * 3) })
      crunch(x, t, 800, 1060, pop01(t, P.t0 + 0.2, 0.25, 2.2) * (1 - prog(lt, 0.8, 1.2)), 28, 0.06, BONE)
      bubble(x, 790, 760, 'LAAA-LA-LAAA!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      label(x, 790, 920, 'ENCORE?', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: '#ffb34a', rot: 0.05 })
    } },
  { sign: 'virgo', cap: 'Printed a chart. | *Chewing decibels.*', mood: lt => lt > 1.5 ? 'wide' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 880); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-180, -170, 360, 340); x.fillStyle = '#fff4e2'; x.fillRect(-170, -160, 340, 320)
      x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CHEW dB', 0, -128)
      ;[60, 90, 130, 230].forEach((h, i) => { const g = ease.outCubic(prog(lt, 0.4 + i * 0.25, 0.7 + i * 0.25)); x.fillStyle = i === 3 ? RED : '#2fc79a'; x.fillRect(-130 + i * 70, 130 - h * g, 50, h * g) })
      x.fillStyle = INK; x.fillRect(-150, 130, 300, 6)
      x.restore()
      label(x, 790, 1110, 'PEER-REVIEWED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Their match chews loud? | *Smiled for an hour.*', mood: lt => lt > 1.4 ? 'squint' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 820, 1000, 180 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 0.8, P.t0 + 1.4, P.t0 + 2.0] })
      crunch(x, t, 830, 790, pop01(t, P.t0 + 0.6, 0.25, 2.2), 34, 0.06, BONE)
      label(x, 790, 640, 'SMILING: 58 MIN', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: '#ff8fb1', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Checked their chart: | *Moon in Crunch.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      chart(x, 790, 820, 140, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      label(x, 790, 1040, 'EXPLAINS A LOT', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Moved out. | *Same day.*', mood: 'sparkle', star: { x: 150 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const go = ease.inCubic(prog(lt, 1.2, 2.0))
      drawBits(x, CASE, CASE_C, lerp(340, 160, go), 1020, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.05 })
      label(x, 330, 740, 'NEW ADDRESS', pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
      bubble(x, 330, 600, 'bye!!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 42, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Scheduled a meeting | *about the chewing.*', mood: lt => lt < 1.0 ? 'neutral' : 'squint', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 860); x.rotate(-0.04); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -150, 380, 300); x.fillStyle = BONE; x.fillRect(-180, -140, 360, 280)
        x.fillStyle = '#2fc79a'; x.fillRect(-180, -140, 360, 64)
        x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INVITE', 0, -108)
        x.font = `800 34px ${INTER}`; x.fillText('RE: CHEWING', 0, -20); x.font = `700 24px ${MONO}`; x.fillText('MON 9:00 · 1 HR', 0, 40); x.fillText('AGENDA: 4 PAGES', 0, 90)
        x.restore()
      }
      label(x, 320, 1100, 'ATTENDANCE: REQUIRED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Invented | *silent chips.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      chipBag(x, t, 790, 880, pop01(t, P.t0 + 0.25, 0.35, 2))
      sparkles(x, t, 790, 880, P.t0 + 1.3, 7, 200, 0.5, [MINT, SKYB, BONE])
      label(x, 790, 1130, 'PATENT PENDING', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Every crunch | *hurt their soul.*', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: { x: -170 }, hops: [0.5, 1.1, 1.7],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      ;[[760, 680, 0.3, 30], [850, 860, 0.9, 38], [740, 1040, 1.5, 46]].forEach(([cx, cy, d, s], i) => crunch(x, t, cx, cy, pop01(t, P.t0 + d, 0.25, 2.2), s, i % 2 ? 0.07 : -0.07, i === 2 ? LAV : BONE))
    } },
]

const F = makeFilm({
  id: 'r2t0102', key: 'E', accent: GOLD, ending: 'callback',
  title: 'Loud chewer? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Crunch. | *Nobody’s okay.*' },
  last: {
    text: 'The quiet soup? | *Slurped.*',
    draw(x, t, lt) {
      bowl(x, t, 680, 1140, 1.2 * pop01(t, t - lt + 0.3, 0.45, 1.8))
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 330, 1060, 240 * k, { mood: lt > 1.4 ? 'wide' : 'happy', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      label(x, 680, 900, 'SLUUURP', pop01(t, t - lt + 1.3, 0.3, 2.4) * (1 + 0.05 * Math.sin(t * 30)), { size: 60, bg: '#ffb34a', rot: -0.06 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
