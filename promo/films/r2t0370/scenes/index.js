// r2t0370: THE SIGNS AS… v3, ROLLCALL, "Bracelet night | *with the signs.*" (~57 s vertical, signs3kit social cut, music: lofi · F)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Bracelet night | *with the signs.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one bracelet moment per sign (3.8 s each), pushed to the extreme:
//              ♈ finished first, it's one knot · ♉ used candy beads, ate the bracelet
//              · ♊ started twelve, finished zero · ♋ made one for every friend since kindergarten
//              · ♌ spelled their own name, wore it · ♍ one bead off, started over
//              · ♎ matching bracelets, matched with everyone (MATCHES: 11) · ♏ one bracelet, lifetime contract
//              · ♐ traded bracelets in nine countries · ♑ started a bracelet business by lunch
//              · ♒ wove in a tiny circuit, it glows · ♓ got one back, sobbed for days
//  49.2        "Twelve wrists. | *Zero matching.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Aries made another. | *Two knots.*"  Aries is back with a string, two knots now (GROWTH).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#a65a37'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const BEADC = [PINK, SKYB, GOLD, MINT, LAV, '#ffb34a', RED]

// ── props
/** a bracelet laid flat as a string: n beads (colours or letters) from x0 to x1 */
function strand(x, x0, x1, y, k, beads, { col = PINK, sag = 30, size = 44, knots = 0, letters = false, glow = 0, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha *= clamp(k)
  const yAt = u => y + Math.sin(Math.PI * u) * sag
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; i ? x.lineTo(lerp(x0, x1, u), yAt(u)) : x.moveTo(x0, yAt(0)) } x.stroke()
  x.strokeStyle = col; x.lineWidth = 7; x.beginPath(); for (let i = 0; i <= 24; i++) { const u = i / 24; i ? x.lineTo(lerp(x0, x1, u), yAt(u)) : x.moveTo(x0, yAt(0)) } x.stroke()
  if (glow > 0) { x.save(); x.shadowColor = MINT; x.shadowBlur = 30 * glow; x.strokeStyle = MINT; x.globalAlpha *= glow * (0.7 + 0.3 * Math.sin(t * 6)); x.lineWidth = 6; x.stroke(); x.restore() }
  const n = beads.length
  beads.forEach((b, i) => {
    const u = (i + 1) / (n + 1), bx = lerp(x0, x1, u), by = yAt(u), s = size * k
    x.fillStyle = INK; x.fillRect(bx - s / 2 - 4, by - s / 2 - 4, s + 8, s + 8)
    x.fillStyle = letters ? CREAM : b; x.fillRect(bx - s / 2, by - s / 2, s, s)
    if (letters) { x.fillStyle = INK; x.font = `800 ${Math.round(s * 0.7)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(b, bx, by + 2) }
    else { x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(bx - s / 2 + 4, by - s / 2 + 4, s * 0.25, s * 0.25) }
  })
  for (let q = 0; q < knots; q++) { const u = 0.35 + q * 0.3, bx = lerp(x0, x1, u), by = yAt(u); x.fillStyle = INK; x.beginPath(); x.arc(bx, by, 22, 0, 7); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(bx, by, 14, 0, 7); x.fill() }
  x.restore()
}
const CANDY = ['.KKKK.', 'KPWPPK', 'KPPPPK', '.KKKK.']
const LENS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKKK..', '......KKK.', '.......KKK', '........KK']
/** a little contract scroll */
function scroll(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -150, 280, 300); x.fillStyle = CREAM; x.fillRect(-132, -142, 264, 284)
  x.fillStyle = '#e9d6a2'; x.fillRect(-150, -164, 300, 30); x.fillRect(-150, 134, 300, 30)
  x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -90 + i * 50))
  x.strokeStyle = RED; x.lineWidth = 5; x.beginPath(); x.moveTo(-70, 100); x.bezierCurveTo(-30, 70, 10, 120, 70, 86); x.stroke()
  x.restore()
}
/** a globe with pins */
function globe(x, t, cx, cy, r, k, pins) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  x.fillStyle = '#5aa9e6'; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill()
  x.save(); x.beginPath(); x.arc(0, 0, r, 0, 7); x.clip(); x.fillStyle = '#5fd068'
  const o = (t * 40) % (r * 2)
  for (const [ax, ay, w, h] of [[-80, -60, 90, 60], [30, -20, 80, 110], [-60, 50, 60, 50], [120, -80, 70, 50]]) { x.fillRect(ax - o, ay, w, h); x.fillRect(ax - o + r * 2, ay, w, h) }
  x.restore()
  for (let i = 0; i < pins; i++) { const a = i * 2.4, rr = r * (0.3 + (i % 3) * 0.2), px = Math.cos(a) * rr, py = Math.sin(a) * rr; x.fillStyle = INK; x.fillRect(px - 2, py - 30, 4, 30); x.fillStyle = BEADC[i % 7]; x.beginPath(); x.arc(px, py - 34, 10, 0, 7); x.fill() }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Finished first. | *It’s one knot.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wide', star: { x: -200 }, hops: [0.4, 0.8, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      strand(x, 620, 960, 860, pop01(t, P.t0 + 0.2, 0.35, 2), [], { col: RED, knots: 1 })
      L(x, 790, 660, 'DONE! (0.4 SEC)', pop01(t, P.t0 + 0.8, 0.3, 2.4), GOLD, 0.04, 36)
      bubble(x, 790, 1060, 'next!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Used candy beads. | *Ate the bracelet.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.max(0, 6 - Math.floor(clamp((lt - 0.6) / 1.0) * 6))
      strand(x, 620, 960, 860, pop01(t, P.t0 + 0.2, 0.35, 2), BEADC.slice(0, n), { col: '#5fd068', size: 40 })
      if (n < 6) drawBits(x, CANDY, { K: INK, P: PINK, W: '#fff' }, 560, 760, 10)
      L(x, 790, 1100, n ? 'BEADS: DISAPPEARING' : 'BRACELET: EATEN', pop01(t, P.t0 + 0.6, 0.3, 2.4), n ? GOLD : MINT, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Started twelve bracelets. | *Finished zero.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const n = Math.min(6, 1 + Math.floor(clamp((lt - 0.2) / 1.0) * 6))
      for (let i = 0; i < n; i++) strand(x, 620, 960, 600 + i * 90, 1, BEADC.slice(i % 3, (i % 3) + 1 + (i % 2)), { col: BEADC[(i + 3) % 7], sag: 14, size: 30 })
      L(x, 790, 1150, 'FINISHED: 0', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'cancer', cap: 'Made one for every friend | *since kindergarten.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      const n = Math.min(8, 1 + Math.floor(clamp((lt - 0.2) / 1.2) * 8))
      for (let i = 0; i < n; i++) { const by = 1100 - i * 60; x.fillStyle = INK; x.fillRect(660, by - 18, 260, 36); x.fillStyle = BEADC[i % 7]; x.fillRect(666, by - 12, 248, 24); for (let j = 0; j < 5; j++) { x.fillStyle = BEADC[(i + j + 2) % 7]; x.fillRect(680 + j * 50, by - 10, 20, 20) } }
      L(x, 790, 600, 'FRIENDS: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Spelled their own name. | *Wore it.*', mood: lt => lt > 1.0 ? 'sparkle' : 'wink', star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      strand(x, 600, 980, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ['L', 'E', 'O', '♥'], { col: GOLD, letters: true, size: 62 })
      sparkles(x, t, 790, 860, P.t0 + 0.8, 8, 180, 0.2)
      L(x, 790, 650, 'FOR: ME', pop01(t, P.t0 + 1.3, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: 'virgo', cap: 'One bead off. | *Started over.*', mood: lt => lt > 1.2 ? 'wide' : 'squint', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const beads = [PINK, SKYB, PINK, SKYB, GOLD, SKYB]
      strand(x, 600, 980, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.7 ? [] : beads, { col: MINT, size: 46 })
      drawBits(x, LENS, { K: INK, S: 'rgba(143,227,255,0.6)', W: '#fff' }, 870, 860, 16 * pop01(t, P.t0 + 0.6, 0.3, 2))
      L(x, 790, 1090, lt > 1.7 ? 'ATTEMPT #2' : 'ERROR: BEAD 5', pop01(t, P.t0 + 1.0, 0.3, 2.4), lt > 1.7 ? MINT : RED, -0.04, 34, lt > 1.7 ? INK : BONE)
    } },
  { sign: 'libra', cap: 'Matching bracelets? | *Matched with everyone.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) strand(x, 620, 960, 700 + i * 120, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), [PINK, LAV, PINK], { col: LAV, sag: 18, size: 36 })
      const n = Math.min(11, Math.floor(clamp((lt - 0.6) / 1.2) * 11) + 1)
      L(x, 790, 1100, `✦ MATCHES: ${n}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), PINK, -0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Made you one bracelet. | *Lifetime contract.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      scroll(x, 790, 840, pop01(t, P.t0 + 0.6, 0.35, 2), ['ONE BRACELET.', 'NO RETURNS.', 'FOREVER.'])
      strand(x, 600, 980, 1100, pop01(t, P.t0 + 0.2, 0.35, 2), [RED, INK, RED], { col: '#c97bff', sag: 16, size: 36 })
    } },
  { sign: 'sagittarius', cap: 'Traded bracelets | *in nine countries.*', mood: 'sparkle', star: { x: -210 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      globe(x, t, 790, 840, 150, pop01(t, P.t0 + 0.2, 0.35, 2), Math.min(9, Math.floor(clamp((lt - 0.4) / 1.2) * 9) + 1))
      L(x, 790, 1100, 'WRISTS: FULL', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'capricorn', cap: 'Started a business. | *By lunch.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -210 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) strand(x, 620, 960, 660 + i * 100, pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2), [GOLD, MINT, GOLD, MINT], { col: '#2fc79a', sag: 12, size: 32 })
      L(x, 790, 990, '$5 EACH', pop01(t, P.t0 + 0.9, 0.3, 2.4), MINT, 0.04, 40)
      L(x, 790, 1110, 'ORDERS: 40', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 36)
    } },
  { sign: 'aquarius', cap: 'Wove in a tiny circuit. | *It glows now.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -210 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      strand(x, 600, 980, 860, pop01(t, P.t0 + 0.2, 0.35, 2), [SKYB, MINT, SKYB, MINT, SKYB], { col: '#9aa5c4', size: 40, glow: clamp((lt - 1.0) / 0.4), t })
      L(x, 790, 650, 'FIRMWARE: V2', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, 0.04, 34)
    } },
  { sign: 'pisces', cap: 'Got one back. | *Sobbed for days.*', mood: lt => lt > 0.9 ? 'wide' : 'heart', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 2, star: { x: -200 },
    front(x, t, lt, P) {
      strand(x, 620, 960, 860, pop01(t, P.t0 + 0.2, 0.35, 2), [PINK, LAV, SKYB, LAV, PINK], { col: PINK, size: 40 })
      hearts(x, t, 790, 860, P.t0 + 0.9, { n: 6, life: 1.8, spread: 220, cell: 7, seed: 5 })
      L(x, 790, 1100, 'DAY 3 OF CRYING', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 34)
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2t0370', key: 'F', accent: PINK, ending: 'callback',
  title: 'Bracelet night | *with the signs.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve wrists. | *Zero matching.*' },
  last: {
    text: 'Aries made another. | *Two knots.*',
    draw(x, t, lt) {
      const t0 = t - lt
      strand(x, 360, 900, 1180, pop01(t, t0 + 0.4, 0.35, 2), [], { col: RED, knots: lt > 1.2 ? 2 : 1, sag: 40 })
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 540, 940, 260 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', seed: 40, hops: [t0 + 1.2, t0 + 1.5] })
      label(x, 540, 1380, 'GROWTH', pop01(t, t0 + 1.4, 0.3, 2.4), { size: 48, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 630, 1200, t0 + 1.2, 7, 120, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
