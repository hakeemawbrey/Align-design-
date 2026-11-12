// v3a129: star_advice, ADVICE ROLL CALL, "Each sign’s | perfect date." (~57 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order, one warm, specific perfect date each, one light visual gag each.
//   0.0–3.6    "Each sign’s | *perfect date.*"  The twelve line up, then dive into the pips.
//   3.6–49.2   twelve cards (3.8 s each):
//              Aries in a go-kart past a chequered flag: REMATCH? · Taurus, two slices of pie: ROUND TWO · Gemini, a
//              tower of bookshop books · Cancer, a pan with a heart-shaped egg · Leo on a dance floor that lights up
//              · Virgo, a market tote and a ticked list · Libra, a bouquet: ONE FOR EACH · Scorpio in a detective hat:
//              CASE CLOSED · Sagittarius spins a globe: WHEREVER IT LANDS · Capricorn, a RESERVED card and a bow tie
//              · Aquarius presses every button · Pisces cries at the jellyfish
//  49.2        "Everyone | *said yes.*"  group photo.
//  52.6        callback: "Taurus? | *Ordered a third.*"  Taurus comes back, three pie slices pop in (card two, paid off).
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const WOOD = '#c98f2a', RED = '#e23d4e', ACC = '#ff8fb1'

const PIE = ['......CC', '....CCFF', '..CCFFFF', 'CCFFFFFF', 'CCCCCCCC', 'BBBBBBBB']
const PIE_C = { C: '#e7b46a', F: '#ff5a7a', B: '#c98f2a' }
const EGG = ['.WW.WW.', 'WWWWWWW', 'WWYYWWW', 'WWYYWWW', '.WWWWW.', '..WWW..', '...W...']
const BOUQ = ['P.R.Y.P', '.RPYRP.', 'P.YPR.Y', '.G.G.G.', '..GGG..', '..LLL..', '..LLL..', '..LLL..']
const BOUQ_C = { P: PINK, R: RED, Y: GOLD, G: '#5fd068', L: '#f4eee2' }
const HAT = ['...BBBB...', '..BBBBBB..', '.BBKBBKBB.', 'BBBBBBBBBB', '..BBBBBB..']
const HAT_C = { B: '#9a7a52', K: '#6b5236' }
const BOW = ['RR...RR', 'RRR.RRR', 'RRRRRRR', 'RRR.RRR', 'RR...RR']
const JELLY = ['..PPPP..', '.PPPPPP.', 'PPWPPWPP', 'PPPPPPPP', 'P.P..P.P', 'P..P.P.P', '.P.P..P.', '.P..P.P.']

function text(x, s, cx, cy, size, { col = INK, font = INTER, w = 800 } = {}) {
  x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
function pies(x, t, n, cx, cy, t0, cell = 14) {
  for (let i = 0; i < n; i++) {
    const k = pop01(t, t0 + i * 0.3, 0.3, 2.4)
    drawBits(x, PIE, PIE_C, cx + (i - (n - 1) / 2) * cell * 11, cy, cell * k, { rot: -0.1 + i * 0.1 })
  }
}

const CAMEOS = [
  { sign: 'aries', cap: 'Go-karts. | *Then a rematch.*', mood: 'sparkle', look: [1, 0], star: { x: -160, y: -20, s: 260 }, hops: [0.4, 1.0, 1.6],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.6)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      for (let j = 0; j < 4; j++) for (let i = 0; i < 3; i++) { x.fillStyle = (i + j) % 2 ? INK : BONE; x.fillRect(820 + i * 40, 640 + j * 40, 40, 40) }
      x.fillStyle = INK; x.fillRect(810, 640, 10, 420)
      x.fillStyle = BONE; for (let i = 0; i < 5; i++) { const ph = (t * 3 + i / 5) % 1; x.fillRect(lerp(560, 120, ph), 820 + i * 40, 120, 8) }
      x.restore()
    },
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.8)
      if (k > 0.01) {
        x.save(); x.translate(F.x, F.cy + 120); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-170, -40, 340, 80); x.fillStyle = RED; x.fillRect(-162, -32, 324, 64)
        x.fillStyle = BONE; x.fillRect(-40, -24, 80, 14)
        for (const s of [-1, 1]) { x.save(); x.translate(s * 120, 46); x.rotate(t * 10); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = '#9aa3c7'; x.fillRect(-10, -10, 20, 20); x.restore() }
        x.restore()
      }
      label(x, 760, 1150, 'REMATCH?', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'taurus', cap: 'A long dinner. | *Dessert twice.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 1], star: { x: -220 }, hops: [1.3],
    front(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(520, 1040, 420, 22); x.fillStyle = WOOD; x.fillRect(524, 1044, 412, 14)
      pies(x, t, 2, 740, 980, P.t0 + 0.3, 13)
      label(x, 740, 700, 'ROUND TWO', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: PINK, rot: 0.04 })
    } },
  { sign: 'gemini', cap: 'A bookshop. | *Lost for hours.*', mood: 'sparkle', look: [1, -1], star: { x: -230 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const C = [SKYB, PINK, GOLD, MINT, LAV, '#ff9a3c', SKYB, PINK]
      const n = Math.floor(lerp(1, 8.99, ease.outCubic(prog(lt, 0.2, 1.6))))
      for (let i = 0; i < n; i++) {
        const w = 230 - (i % 3) * 30, y = 1130 - i * 58, ox = Math.sin(i * 1.7) * 18
        x.fillStyle = INK; x.fillRect(780 - w / 2 + ox - 6, y - 6, w + 12, 58); x.fillStyle = C[i]; x.fillRect(780 - w / 2 + ox, y, w, 46)
        x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(780 - w / 2 + ox + 14, y + 18, w - 28, 6)
      }
      label(x, 470, 620, 'JUST ONE MORE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cooking at home. | *Matching aprons.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(720, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(110, -18, 130, 36); x.fillStyle = '#4a4470'; x.fillRect(116, -12, 118, 24)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 60, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#5a5f86'; x.beginPath(); x.ellipse(0, -4, 136, 48, 0, 0, Math.PI * 2); x.fill()
        x.restore()
        drawBits(x, EGG, { W: '#fffaf0', Y: GOLD }, 720, 950, 13 * pop01(t, P.t0 + 0.7, 0.3, 2.4))
      }
      // the apron on the star
      const a = pop01(t, P.t0 + 0.4, 0.3, 2)
      if (a > 0.01) { x.save(); x.translate(F.x, F.cy + 70); x.scale(a, a); x.fillStyle = INK; x.fillRect(-60, -40, 120, 110); x.fillStyle = PINK; x.fillRect(-52, -32, 104, 94); drawBits(x, ['.H.H.', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, 0, 10, 7); x.restore() }
      if (lt > 1.2) hearts(x, t, 720, 900, P.t0 + 1.6, { n: 5, life: 1.3, spread: 160, cell: 6, seed: 4 })
    } },
  { sign: 'leo', cap: 'Dancing. | *All eyes on them.*', mood: 'sparkle', look: [0, 0], star: { x: 0, y: -40 }, hops: [0.5, 1.0, 1.5, 2.0],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.4)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = clamp(k)
      const C = [PINK, GOLD, SKYB, MINT, LAV]
      for (let j = 0; j < 2; j++) for (let i = 0; i < 6; i++) { const on = Math.floor(t * 4 + i * 1.3 + j * 2.1) % 3 === 0; x.fillStyle = INK; x.fillRect(150 + i * 130, 1040 + j * 80, 130, 80); x.fillStyle = on ? C[(i + j) % 5] : '#2a2350'; x.fillRect(156 + i * 130, 1046 + j * 80, 118, 68) }
      x.fillStyle = 'rgba(255,241,200,0.16)'; x.beginPath(); x.moveTo(500, 470); x.lineTo(580, 470); x.lineTo(760, 1040); x.lineTo(320, 1040); x.closePath(); x.fill()
      x.restore()
    },
    front(x, t, lt, P) { label(x, 800, 620, 'ENCORE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 40, bg: GOLD, rot: 0.05 }) } },
  { sign: 'virgo', cap: 'A farmers market. | *With a list.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -230 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(820, 980); x.scale(k, k)
        x.fillStyle = '#5fd068'; x.fillRect(-90, -170, 20, 70); x.fillRect(-60, -190, 20, 90); x.fillStyle = '#ff9a3c'; x.fillRect(-20, -160, 50, 60); x.fillStyle = RED; x.beginPath(); x.arc(70, -120, 32, 0, Math.PI * 2); x.fill()
        x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.arc(0, -110, 70, Math.PI, 0); x.stroke()
        x.fillStyle = INK; x.fillRect(-130, -110, 260, 200); x.fillStyle = '#e8dcc0'; x.fillRect(-122, -102, 244, 184)
        text(x, '♍︎', 0, -10, 70, { col: '#ef5c94', font: "'Segoe UI Symbol', 'Noto Sans Symbols', serif" })
        x.restore()
      }
      const l = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (l > 0.01) {
        x.save(); x.translate(560, 680); x.rotate(-0.08); x.scale(l, l)
        x.fillStyle = INK; x.fillRect(-100, -90, 200, 180); x.fillStyle = '#f4eee2'; x.fillRect(-92, -82, 184, 164)
        ;['carrots', 'apples', 'honey'].forEach((s, i) => {
          text(x, s, 20, -46 + i * 46, 26, { w: 700 })
          if (lt > 0.9 + i * 0.25) { x.strokeStyle = '#2fc79a'; x.lineWidth = 7; x.beginPath(); x.moveTo(-74, -48 + i * 46); x.lineTo(-62, -36 + i * 46); x.lineTo(-44, -60 + i * 46); x.stroke() }
        })
        x.restore()
      }
    } },
  { sign: 'libra', cap: 'A flower market. | *Two bouquets.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, BOUQ, BOUQ_C, 520, 1010, 15 * pop01(t, P.t0 + 0.3, 0.35, 2), { rot: -0.15 })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 830, 940, 190 * k, { mood: lt > 1.4 ? 'heart' : 'wide', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.8] })
      drawBits(x, BOUQ, BOUQ_C, 760, 1060, 12 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.2 })
      label(x, 700, 620, 'ONE FOR EACH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'A mystery dinner. | *Solved it first.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: { x: -200 }, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x, F.top - 20, 22 * pop01(t, P.t0 + 0.2, 0.3, 2.2))
      const c = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (c > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(0.06); x.scale(c, c)
        x.fillStyle = INK; x.fillRect(-150, -110, 300, 220); x.fillStyle = '#f4eee2'; x.fillRect(-142, -102, 284, 204)
        text(x, 'WHO DID IT?', 0, -60, 34, { font: MONO, w: 700 })
        text(x, 'the butler', 0, 10, 36, { w: 700 })
        x.restore()
      }
      label(x, 790, 1140, 'CASE CLOSED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: '#e23d66', color: BONE, rot: -0.04 })
    } },
  { sign: 'sagittarius', cap: 'A spun globe. | *Wherever it lands.*', mood: lt => lt > 1.3 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -230 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-100, 180, 200, 30); x.fillRect(-10, 150, 20, 40)
        x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.arc(0, 0, 175, Math.PI * 0.6, Math.PI * 1.6); x.stroke()
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#3fb6f0'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.save(); x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.clip()
        const spin = lt < 1.2 ? t * 600 : 0
        x.fillStyle = '#5fd068'; for (let i = 0; i < 4; i++) { const px = ((i * 170 + spin) % 680) - 340; x.beginPath(); x.ellipse(px, -40 + (i % 2) * 90, 60, 40 + i * 6, 0.4, 0, Math.PI * 2); x.fill() }
        x.restore()
        x.restore()
        if (lt > 1.2) drawBits(x, ['.RRR.', 'RRRRR', 'RRWRR', 'RRRRR', '.RRR.', '..R..', '..R..'], { R: RED, W: '#fff' }, 760, 830, 12)
      }
      label(x, 790, 610, 'WHEREVER IT LANDS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'A fancy dinner. | *Booked months ago.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, BOW, { R: '#c22e4a' }, F.x, F.cy + 104, 13 * pop01(t, P.t0 + 0.3, 0.3, 2.4))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-150, 90); x.lineTo(-120, -90); x.lineTo(120, -90); x.lineTo(150, 90); x.closePath(); x.fill()
        x.fillStyle = '#f4eee2'; x.beginPath(); x.moveTo(-138, 82); x.lineTo(-112, -82); x.lineTo(112, -82); x.lineTo(138, 82); x.closePath(); x.fill()
        text(x, 'RESERVED', 0, -24, 44, { font: "Georgia, serif", w: 700 }); text(x, 'table for two', 0, 32, 28, { w: 600 })
        x.restore()
      }
      label(x, 790, 1130, 'SINCE MARCH', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'A science museum. | *Every button pressed.*', mood: 'sparkle', look: [1, 1], star: { x: -230 }, hops: [0.7, 1.1, 1.5, 1.9],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 960); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-180, -120, 360, 240); x.fillStyle = '#4a4470'; x.fillRect(-170, -110, 340, 220)
        const C = [RED, GOLD, MINT, SKYB, PINK, LAV]
        for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) {
          const n = j * 3 + i, pressed = lt > 0.5 + n * 0.25
          x.fillStyle = INK; x.beginPath(); x.arc(-110 + i * 110, -45 + j * 100, 40, 0, Math.PI * 2); x.fill()
          x.fillStyle = pressed ? C[n] : '#2a2350'; x.beginPath(); x.arc(-110 + i * 110, -45 + j * 100 + (pressed ? 4 : 0), 32, 0, Math.PI * 2); x.fill()
        }
        x.restore()
      }
      label(x, 790, 680, 'ALL OF THEM', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 38, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'An aquarium. | Cried at *the jellyfish.*', mood: 'sparkle', tears: 3, look: [1, -1], star: { x: -220 }, hops: [1.5],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.1, 0.3, 1.4)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.9 * clamp(k)
      x.fillStyle = INK; x.fillRect(560, 560, 380, 560); x.fillStyle = '#1f5f9a'; x.fillRect(570, 570, 360, 540)
      x.fillStyle = 'rgba(255,255,255,0.4)'; for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; x.beginPath(); x.arc(600 + i * 55, 1100 - ph * 520, 6, 0, Math.PI * 2); x.fill() }
      x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, JELLY, { P: '#ffb3d9', W: '#fff' }, 700 + Math.sin(t * 1.3) * 20, 760 + Math.sin(t * 2) * 30, 15 * k)
      drawBits(x, JELLY, { P: '#c9a6ff', W: '#fff' }, 840 + Math.sin(t * 1.1 + 2) * 20, 940 + Math.sin(t * 1.7 + 1) * 30, 11 * k)
      label(x, 750, 1160, 'SO BEAUTIFUL', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a129', key: 'G', accent: ACC, ending: 'callback',
  title: 'Each sign’s | *perfect date.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone | *said yes.*' },
  last: {
    text: 'Taurus? | *Ordered a third.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, 'taurus', 540, 960, 300 * a, { mood: lt > 1.4 ? 'heart' : 'sparkle', seed: 31, hops: [t0 + 1.5] })
      pies(x, t, 3, 540, 1230, t0 + 0.8, 20)
      sparkles(x, t, 540, 1220, t0 + 1.5, 9, 280, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
