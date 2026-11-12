// r2t0576: star_talk, BE LIKE (twelve signs), "Short cord? Zodiacs | *be like.*" (signs3kit social cut, music: lofi · C).
// Twelve signs vs a charger cord that won't reach:
//   ♈ moved the outlet · ♉ dragged the whole bed over · ♊ hunched by the wall, five chats open · ♋ moved in by the outlet
//   · ♌ stuck on the floor, called it a photoshoot · ♍ measured the cord, wrote a review · ♎ charge or comfy, still deciding
//   · ♏ mapped every outlet in the building · ♐ battery at 2%, left on a road trip · ♑ bought a ten-foot cord, expensed it
//   · ♒ built a longer cord from spare parts · ♓ the cord can't reach the bed, sobbed.
// Ending: callback ("Capricorn's long cord? | Now renting it out." — the ten-foot cord comes back with a rentals sign).
import { makeFilm, sparkles, hearts, bubble, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, MONO, INTER } from '../../signs3kit.js'
import { L, sheet, phone, steam, confetti, zzz, bits, cord, battery, swapLabel, RED, CREAM, STEEL, WOOD, clamp, lerp, ease, prog } from './props.js'

const ACC = '#8fe3ff', ST = { x: -170 }

// a coiled long cable (Capricorn's ten-foot cord): loops drawn as rings, then a tail to a plug
function coil(x, t, cx, cy, k, { loops = 4, r = 70 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (const [c, lw] of [[INK, 20], [BONE, 12]]) {
    x.strokeStyle = c; x.lineWidth = lw
    for (let i = 0; i < loops; i++) { x.beginPath(); x.ellipse(i * 16 - loops * 8, i * 6, r, r * 0.62, 0.1, 0, Math.PI * 2); x.stroke() }
  }
  x.restore()
}
// a floor plan with outlet dots popping in one by one
function plan(x, t, cx, cy, k, n) {
  if (k <= 0.01) return
  sheet(x, cx, cy, k, { w: 340, h: 340, head: 'FLOOR 1–9', headBg: '#c97bff', headInk: INK, lines: [] })
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.strokeStyle = STEEL; x.lineWidth = 6
  x.strokeRect(-140, -90, 280, 220); x.beginPath(); x.moveTo(-20, -90); x.lineTo(-20, 40); x.moveTo(-140, 40); x.lineTo(60, 40); x.moveTo(60, 40); x.lineTo(60, 130); x.stroke()
  const D = [[-110, -60], [-60, 10], [20, -60], [110, -30], [110, 90], [-100, 100], [10, 90], [-50, -60]]
  for (let i = 0; i < Math.min(n, D.length); i++) { x.fillStyle = INK; x.fillRect(D[i][0] - 12, D[i][1] - 12, 24, 24); x.fillStyle = RED; x.fillRect(D[i][0] - 8, D[i][1] - 8, 16, 16) }
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Cord too short? | Moved *the outlet.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [0.7, 1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const ox = lerp(880, 650, ease.inOutCubic(prog(lt, 0.6, 1.3))), oy = 980
      if (k > 0.01) cord(x, 470, 930, ox, oy, { sag: lerp(-10, 40, prog(lt, 0.6, 1.3)), alpha: k })
      bits(x, 'OUTLET', ox, oy, 18 * k, { rot: lerp(0, -0.3, prog(lt, 0.6, 1.3)) })
      if (lt > 0.6) for (let i = 0; i < 6; i++) { const ph = clamp((lt - 0.6 - i * 0.08) / 0.8); if (ph <= 0 || ph >= 1) continue; x.fillStyle = BONE; x.globalAlpha = 1 - ph; x.fillRect(900 + (i - 3) * 14, 960 + ph * 220, 12, 12); x.globalAlpha = 1 }
      L(x, 790, 680, 'OUTLET: RELOCATED', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'taurus', cap: 'Dragged the whole bed | to *the outlet.*', mood: lt => lt > 1.2 ? 'sleepy' : 'happy', star: { x: -150, y: -40 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), bx = lerp(330, 430, ease.outCubic(prog(lt, 0.2, 1.0)))
      bits(x, 'BED', bx, 1010, 30 * k)
      bits(x, 'OUTLET', 900, 920, 16 * k)
      if (k > 0.5) cord(x, 900, 940, bx + 120, 960, { sag: 30 })
      for (let i = 0; i < 3; i++) { const a = clamp(1 - prog(lt, 0.4 + i * 0.1, 1.4)); if (a > 0.01 && lt > 0.2) { x.fillStyle = `rgba(239,230,214,${(0.5 * a).toFixed(3)})`; x.fillRect(bx - 230 - i * 50, 1090 + i * 6, 34, 8) } }
    },
    front(x, t, lt, P) {
      L(x, 760, 720, 'NOT GETTING UP', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 32)
      if (lt > 1.2) zzz(x, t, 440, 700)
    } },
  { sign: 'gemini', cap: 'Hunched by the wall. | *Five* chats open.', mood: 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: { x: -170, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const CH = [['omg', MINT], ['WAIT', PINK], ['lol', SKYB], ['ok so', GOLD]]
      phone(x, t, 790, 860, 1.05 * k, { head: 'CHATS: 5', headCol: '#ffd23a', lines: CH.map(([s, c], i) => [s, c, pop01(t, P.t0 + 0.45 + i * 0.22, 0.2, 2), i % 2 === 1]), typing: lt > 1.4 ? 1 : 0 })
      bits(x, 'OUTLET', 470, 620, 14 * k)
      if (k > 0.5) cord(x, 470, 640, 700, 1000, { sag: 120, w: 10 })
    } },
  { sign: 'cancer', cap: 'Moved in by the outlet. | It’s *home now.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', star: ST,
    back(x, t, lt, P) { bits(x, 'BLANKET', 380, 1070, 22 * pop01(t, P.t0 + 0.2, 0.3, 2)) },
    front(x, t, lt, P) {
      bits(x, 'OUTLET', 880, 760, 15 * pop01(t, P.t0 + 0.15, 0.3, 2))
      bits(x, 'MUG', 700, 1040, 16 * pop01(t, P.t0 + 0.5, 0.3, 2)); steam(x, t, 690, 970, { alpha: lt > 0.6 ? 0.6 : 0 })
      bits(x, 'PLANT', 860, 1030, 18 * pop01(t, P.t0 + 0.7, 0.3, 2))
      bits(x, 'LAMP', 760, 920, 15 * pop01(t, P.t0 + 0.9, 0.3, 2))
      L(x, 790, 620, 'HOME SWEET OUTLET', pop01(t, P.t0 + 1.3, 0.3, 2.4), PINK, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Stuck on the floor? | Called it *a photoshoot.*', mood: 'sparkle', look: [1, 0], star: { x: -170, y: 40 }, hops: [1.0],
    back(x, t, lt, P) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6)); if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(330, 480); x.lineTo(410, 480); x.lineTo(560, 1180); x.lineTo(180, 1180); x.closePath(); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'LENS', 800, 860, 20 * pop01(t, P.t0 + 0.4, 0.3, 2))
      const fl = Math.floor(lt * 2.5)
      if (lt > 0.8 && fl % 2 === 0) { x.save(); x.globalAlpha = 0.35 * (1 - (lt * 2.5 - fl)); x.fillStyle = '#ffffff'; x.fillRect(110, 480, 860, 740); x.restore() }
      L(x, 790, 650, 'FLOOR ERA', pop01(t, P.t0 + 1.0, 0.3, 2.4), '#ffb34a', 0.05, 40)
      sparkles(x, t, 370, 880, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Measured the cord. | Wrote *a review.*', mood: lt => lt > 1.3 ? 'neutral' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 330, head: 'CORD REVIEW', headBg: '#2fc79a', headInk: INK, font: MONO, weight: 700, size: 28, align: 'left',
        lines: ['length: rude', 'reach: none', ['1 / 5 stars', RED]], progress: prog(lt, 0.5, 1.4) })
      L(x, 790, 1100, 'WOULD NOT RECOMMEND', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Charge it, or stay comfy? | Still *deciding.*', mood: lt => lt > 1.8 ? 'squint' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -60, y: 60 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      bits(x, 'SOFA', 260, 1050, 18 * k); bits(x, 'OUTLET', 850, 1020, 16 * k)
    },
    front(x, t, lt, P) {
      const w = Math.floor(lt * 2.5) % 2 ? 'charge?' : 'comfy?'
      bubble(x, 520, 600, w, pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 46, tail: 'bc' })
      L(x, 820, 760, 'HOUR 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), PINK, 0.05, 40)
    } },
  { sign: 'scorpio', cap: 'Knows every outlet | in *the building.*', mood: lt => lt > 1.5 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      plan(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), Math.floor(Math.max(0, lt - 0.5) / 0.15))
      L(x, 790, 1110, 'TELL NO ONE', pop01(t, P.t0 + 1.6, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Battery at 2%. | Left on *a road trip.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      battery(x, 790, 680, 1.3 * pop01(t, P.t0 + 0.2, 0.3, 2), 0.06, { text: '2%' })
      const cx = lerp(1050, 700, ease.outCubic(prog(lt, 0.5, 1.2))) + 6 * Math.sin(t * 20) * (lt > 1.2 ? 1 : 0)
      bits(x, 'CAR', cx, 960, 22)
      L(x, 790, 1130, 'CHARGER: AT HOME', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'Bought a ten-foot cord. | *Expensed it.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      coil(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.35, 2), { loops: 5, r: 110 })
      bits(x, 'PLUG', 920, 990, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.4 })
      L(x, 790, 1110, 'RECEIPT: FILED', pop01(t, P.t0 + 1.3, 0.3, 2.4), '#2fc79a', 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Built a longer cord. | From *spare parts.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'GADGET', 790, 820, 22 * k, { rot: 0.05 * Math.sin(t * 6) })
      if (k > 0.5) cord(x, 790, 900, 950, 1100, { sag: 40, col: MINT, w: 10 })
      if (k > 0.5) cord(x, 790, 900, 600, 1120, { sag: 60, col: PINK, w: 10 })
      sparkles(x, t, 790, 820, P.t0 + 1.0, 7, 170, 0.3, [MINT, SKYB, BONE])
      L(x, 790, 620, 'PATENT PENDING', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cord can’t reach the bed. | *Sobbed* about it.', mood: lt => lt < 0.9 ? 'neutral' : 'wide', tears: lt => lt < 0.9 ? 1 : 3, star: { x: -170, y: 20 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { bits(x, 'PILLOW', 370, 1090, 20 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      bits(x, 'OUTLET', 900, 760, 15 * k)
      if (k > 0.5) cord(x, 900, 780, 720, 900, { sag: -10 })
      x.save(); x.translate(720, 900); x.rotate(0.3 + 0.04 * Math.sin(t * 9)); x.fillStyle = INK; x.fillRect(-40, -60, 80, 120); x.fillStyle = SKYB; x.fillRect(-30, -50, 60, 100); x.restore()
      L(x, 790, 1100, 'SO CLOSE', pop01(t, P.t0 + 1.0, 0.3, 2.4), SKYB, 0.04, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0576', key: 'C', accent: ACC, ending: 'callback',
  title: 'Short cord? Zodiacs | *be like.*',
  cameos: CAMEOS,
  card: { a: 'capricorn', b: 'pisces', chip: 'ALIGNED' },
  group: { cap: 'Twelve signs. | *One outlet.*' },
  last: {
    text: 'Cap’s long cord? | Now *renting it out.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'capricorn', 380, 1100, 280 * k, { mood: lt > 1.3 ? 'sparkle' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.35] })
      coil(x, t, 760, 1080, 0.85 * pop01(t, t0 + 0.5, 0.35, 2), { loops: 5, r: 110 })
      L(x, 760, 1300, 'RENTALS: OPEN', pop01(t, t0 + 1.3, 0.3, 2.4), GOLD, -0.04, 38)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
