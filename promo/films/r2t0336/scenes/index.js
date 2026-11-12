// r2t0336: star_talk, BELIKE (twelve signs), "Half-air snack bag? | Zodiacs *be like.*" (signs3kit social cut,
// music: lofi · C). Ending: callback (Cancer’s jar of bag air, still sealed).
//   ♈ asked the bag for its manager · ♉ counted every chip, all nine · ♊ started a podcast about the air
//   · ♋ kept the air in a jar, for memories · ♌ found one chip, took a bow · ♍ filed an incident report
//   · ♎ weighed chips vs. air, air won · ♏ stared until the bag confessed · ♐ climbed in on an expedition
//   · ♑ resold the air · ♒ invented a bag that’s all chips · ♓ bag half air, Pisces half tears
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, signChar, pop01, notes, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { L, card, lines, confetti, sweat, RED, CREAM, ORANGE, GREY, PURP } from './props.js'

/** a puffy snack bag: crimped top and bottom, a stripe band; fill = 0…1 chips visible at the bottom when open */
function bag(x, cx, cy, k, { col = '#ff6b5a', rot = 0, w = 220, h = 300, puff = 0, open = false, chips = 0, label: lab = 'CHIPS' } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * (1 + puff * 0.06), k * (1 - puff * 0.03))
  const hw = w / 2, hh = h / 2
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-hw + 10, -hh + 12, w, h)
  // body (slightly pillowed)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-hw - 6, -hh); x.quadraticCurveTo(-hw - 26, 0, -hw - 6, hh); x.lineTo(hw + 6, hh); x.quadraticCurveTo(hw + 26, 0, hw + 6, -hh); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-hw, -hh); x.quadraticCurveTo(-hw - 18, 0, -hw, hh); x.lineTo(hw, hh); x.quadraticCurveTo(hw + 18, 0, hw, -hh); x.closePath(); x.fill()
  // crimps
  for (const s of [-1, 1]) {
    x.fillStyle = INK; x.fillRect(-hw - 6, s * hh - (s < 0 ? 34 : 0), w + 12, 34)
    x.fillStyle = GREY; x.fillRect(-hw, s * hh - (s < 0 ? 28 : 6), w, 28)
    x.fillStyle = '#6b62a8'; for (let i = 0; i < w; i += 20) x.fillRect(-hw + i, s * hh - (s < 0 ? 28 : 6), 10, 28)
  }
  if (open) { x.fillStyle = '#140c30'; x.fillRect(-hw + 10, -hh - 4, w - 20, 22) }
  // stripe band + name
  x.fillStyle = CREAM; x.fillRect(-hw, -40, w, 80)
  x.fillStyle = INK; x.font = `800 ${Math.round(w * 0.2)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(lab, 0, 2)
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, -hh + 70, 22, 0, Math.PI * 2); x.fill()
  x.restore()
}
const CHIP = ['..YYY..', '.YYYYY.', 'YYYOYYY', 'YYYYYYY', '.YYYYO.', '..YYY..']
const CHIP_C = { Y: '#ffd23a', O: '#e8a52a' }
const chip = (x, cx, cy, cell = 8, rot = 0, alpha = 1) => drawBits(x, CHIP, CHIP_C, cx, cy, cell, { rot, alpha })
/** a glass jar with a lid and a little tag */
function jar(x, t, cx, cy, k, { tag = 'BAG AIR', rot = 0.04 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-100, -130, 220, 290)
  x.fillStyle = INK; x.fillRect(-118, -150, 236, 300)
  x.fillStyle = 'rgba(190,230,255,0.35)'; x.fillRect(-110, -110, 220, 252)
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(-90, -90, 18, 180)
  // a few floating sparkles: the precious air
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? BONE : GOLD; const a = t * 1.2 + i * 1.3; x.fillRect(Math.cos(a) * 50 - 5 + (i - 2) * 12, Math.sin(a * 1.3) * 60 - 5, 10, 10) }
  x.fillStyle = INK; x.fillRect(-122, -168, 244, 44); x.fillStyle = '#c98f2a'; x.fillRect(-114, -162, 228, 32)
  x.fillStyle = CREAM; x.fillRect(-80, 20, 160, 56); x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, 40); x.font = `700 18px ${MONO}`; x.fillText('do not open', 0, 64)
  x.restore()
}
/** a hanging balance: left pan vs right pan, tip = −1…1 (right pan down when positive) */
function scale(x, cx, cy, k, tip, left, right) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -150, 20, 300); x.fillRect(-80, 140, 160, 20)
  x.fillStyle = GOLD; x.fillRect(-6, -146, 12, 290); x.fillRect(-76, 144, 152, 12)
  const a = tip * 0.3
  x.save(); x.translate(0, -140); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-190, -9, 380, 18); x.fillStyle = GOLD; x.fillRect(-186, -5, 372, 10)
  x.restore()
  for (const s of [-1, 1]) {
    const px = s * 180 * Math.cos(a), py = -140 + s * 180 * Math.sin(a)
    x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 60, py + 90); x.moveTo(px, py); x.lineTo(px + 60, py + 90); x.stroke()
    x.fillStyle = INK; x.fillRect(px - 74, py + 86, 148, 16); x.fillStyle = GOLD; x.fillRect(px - 70, py + 88, 140, 10)
    ;(s < 0 ? left : right)(px, py + 86)
  }
  x.restore()
}
const MIC = ['.GGGG.', 'GgGGgG', 'GGgGGG', 'GgGGgG', '.GGGG.', '..KK..', '..KK..', '..KK..', 'KKKKKK']
const MIC_C = { G: '#c9c9d8', g: '#8a8aa0', K: '#2a2350' }
const HELMET = ['...LLLLL...', '.LLLLLLLLL.', 'LLLLWWWLLLL', 'LLLWWYWWLLL', 'LLLLWWWLLLL', 'KKKKKKKKKKK']
const HELMET_C = { L: '#ffb34a', W: '#fff4e2', Y: GOLD, K: '#2a2350' }

const ST = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Asked the bag | for its *manager.*', mood: lt => lt > 0.9 ? 'wide' : 'squint', look: [1, 0], star: ST, hops: [0.7, 1.1],
    front(x, t, lt, P) {
      bag(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08, open: true })
      bubble(x, 560, 600, 'MANAGER. NOW.', pop01(t, P.t0 + 0.8, 0.25, 2.4), { size: 46, tail: 'bl' })
      if (lt > 1.4) L(x, 790, 1110, 'COMPLAINT #1', pop01(t, P.t0 + 1.4, 0.3, 2.2), RED, 0.05, 32, CREAM)
    } },
  { sign: 'taurus', cap: 'Counted every chip. | *All nine.*', mood: lt => lt > 1.7 ? 'squint' : 'happy', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const n = Math.min(9, Math.floor(clamp((lt - 0.3) / 1.4) * 9.99))
      for (let i = 0; i < n; i++) chip(x, 640 + (i % 3) * 100, 760 + Math.floor(i / 3) * 90, 10, i * 0.4)
      L(x, 740, 1080, `CHIPS: ${n}`, pop01(t, P.t0 + 0.3, 0.3, 2), GOLD, -0.03, 44)
      if (lt > 1.8) bubble(x, 390, 600, 'that’s it?!', pop01(t, P.t0 + 1.8, 0.25, 2.4), { size: 40, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Started a podcast | about *the air.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P, F) {
      drawBits(x, MIC, MIC_C, 610, 950, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.2 })
      bag(x, 830, 930, pop01(t, P.t0 + 0.4, 0.3, 2) * 0.7, { col: '#ffd23a', rot: -0.1 })
      L(x, 790, 640, 'EP. 1: THE AIR', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, 0.04, 34)
      L(x, 790, 720, 'EP. 2: MORE AIR', pop01(t, P.t0 + 1.7, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Kept the air. | *For memories.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      jar(x, t, 790, 880, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 800, 600, 'our first bag', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, tail: 'bc' })
      hearts(x, t, 790, 820, P.t0 + 1.5, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Found one chip. | *Took a bow.*', mood: 'sparkle', star: ST, hops: [0.8, 1.6],
    back(x, t, lt, P) {
      // a spotlight cone onto the star
      const k = clamp((lt - 0.2) * 3)
      x.save(); x.globalAlpha = 0.22 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 470); x.lineTo(410, 470); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      chip(x, F.x + 150, F.cy - 160, 16 * k, Math.sin(t * 4) * 0.2)
      sparkles(x, t, F.x + 150, F.cy - 160, P.t0 + 0.5, 7, 110, 0.2)
      bubble(x, 790, 700, 'THANK YOU!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 46, tail: 'bl' })
      if (lt > 1.2) confetti(x, t, 780, 860, P.t0 + 1.4, { n: 16, spread: 200, h: 500 })
    } },
  { sign: 'virgo', cap: 'Filed an | *incident report.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 420, pop01(t, P.t0 + 0.25, 0.35, 2), 0.04, x => {
        x.fillStyle = '#6b62a8'; x.fillRect(-60, -230, 120, 34)
        lines(x, ['INCIDENT', 'REPORT'], { size: 38, y: -140 })
        x.font = `700 24px ${MONO}`; x.textAlign = 'left'
        const rows = ['chips: few', 'air: a lot', 'mood: no', 'action: email']
        rows.forEach((r, i) => { if (lt > 0.6 + i * 0.3) { x.fillStyle = INK; x.fillText('☐ ' + r, -130, -50 + i * 52) } })
        if (lt > 1.9) { x.strokeStyle = RED; x.lineWidth = 6; x.strokeRect(-140, 130, 280, 50); x.fillStyle = RED; x.font = `800 28px ${INTER}`; x.textAlign = 'center'; x.fillText('URGENT', 0, 156) }
      })
    } },
  { sign: 'libra', cap: 'Weighed chips vs. air. | *Air won.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const tip = lerp(0, -1, ease.outBack ? ease.outBack(prog(lt, 1.0, 1.6)) : prog(lt, 1.0, 1.6)) + 0.15 * Math.sin(lt * 5) * (1 - prog(lt, 0.4, 1.0))
      scale(x, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), tip,
        (px, py) => { x.save(); x.fillStyle = 'rgba(220,240,255,0.5)'; x.beginPath(); x.arc(px, py - 40, 44, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.fillText('AIR', px, py - 36); x.restore() },
        (px, py) => chip(x, px, py - 24, 7))
      if (lt > 1.6) L(x, 790, 600, 'AIR: WINNER', pop01(t, P.t0 + 1.6, 0.3, 2.4), SKYB, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Stared at the bag | until it *confessed.*', mood: lt => lt > 1.4 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const shake = lt > 1.0 && lt < 1.5 ? Math.sin(t * 60) * 0.05 : 0
      bag(x, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), { col: '#c97bff', rot: 0.06 + shake })
      if (lt > 1.0 && lt < 1.5) sweat(x, t, 920, 740)
      bubble(x, 790, 620, 'ok fine. it’s air.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Climbed inside | on an *expedition.*', mood: 'sparkle', look: [0, -1], star: { x: 0, y: -60, s: 240 }, hops: [0.9],
    back(x, t, lt, P) {
      // the open bag towers behind; the star pops out of its top
      bag(x, 540, 1000, pop01(t, P.t0 + 0.1, 0.35, 2) * 1.6, { col: '#ff9a4a', open: true, w: 260, h: 200 })
    },
    front(x, t, lt, P, F) {
      drawBits(x, HELMET, HELMET_C, F.x, F.top - 10, 12 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 790, 560, 'DAY 3. NO CHIPS.', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.05, 32)
      bubble(x, 300, 640, 'going deeper', pop01(t, P.t0 + 1.7, 0.25, 2.2), { size: 34, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Resold the air. | *Made a profit.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 280, pop01(t, P.t0 + 0.25, 0.35, 2), -0.04, x => {
        lines(x, ['PREMIUM', 'BAG AIR'], { size: 40, y: -40 })
        x.fillStyle = '#5fd068'; x.fillRect(-90, 50, 180, 60); lines(x, ['$5'], { size: 46, y: 82 })
      })
      if (lt > 1.4) L(x, 790, 1100, 'SOLD OUT', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.05, 40, CREAM)
    } },
  { sign: 'aquarius', cap: 'Invented a bag | that’s *all chips.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: ST, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 860, 340, 400, pop01(t, P.t0 + 0.25, 0.35, 2), 0.04, x => {
        x.strokeStyle = 'rgba(255,255,255,0.25)'; x.lineWidth = 2
        for (let i = -150; i <= 150; i += 30) { x.beginPath(); x.moveTo(i, -190); x.lineTo(i, 190); x.stroke(); x.beginPath(); x.moveTo(-160, i); x.lineTo(160, i); x.stroke() }
        x.strokeStyle = CREAM; x.lineWidth = 5; x.strokeRect(-90, -100, 180, 230)
        for (let i = 0; i < 9; i++) chip(x, -55 + (i % 3) * 55, -60 + Math.floor(i / 3) * 70, 6, i)
        lines(x, ['AIR: 0'], { size: 30, y: -150, color: CREAM, font: MONO, weight: 700 })
      }, '#1f5fa8')
      const b = drawBits; void b
      if (lt > 1.2) L(x, 790, 1100, 'PATENT PENDING', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Bag: half air. | Pisces: *half tears.*', mood: 'wide', tears: lt => lt > 0.8 ? 3 : 2, look: [1, 1], star: ST,
    front(x, t, lt, P) {
      bag(x, 800, 920, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.9, { col: '#6fc3ff', rot: 0.1, open: true })
      bubble(x, 800, 620, 'it was so empty', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bc' })
    } },
]

const F = makeFilm({
  id: 'r2t0336', key: 'C', accent: GOLD, ending: 'callback',
  title: 'Half-air snack bag? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Paid for chips. | Got *vibes.*' },
  last: {
    text: 'Cancer’s jar of air? | *Still sealed.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'cancer', 380, 1080, 280 * k, { mood: lt > 1.2 ? 'heart' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.3, t0 + 2.0] })
      jar(x, t, 740, 1080, pop01(t, t0 + 0.6, 0.4, 2) * 0.9, { tag: 'BAG AIR' })
      if (lt > 1.4) L(x, 740, 1300, 'DAY 400', pop01(t, t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 34)
      if (lt > 1.6) hearts(x, t, 560, 1000, t0 + 1.6, { n: 6, life: 1.6, spread: 360, cell: 8, seed: 5 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
