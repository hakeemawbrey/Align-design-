// v3a016: zodiac.advice444, ADVICE SOLO, "Capricorn, your gift | is this." (~51 s vertical, signs3kit social cut, lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the quiet, steady gifts of a Capricorn, one gag each.
//   0.0–3.6    "Capricorn, your gift | *is this.*"  One big Capricorn pops in, then the cards start.
//   3.6–37.8   nine cards (3.8 s each):
//              shows up when they said (the clock hits 7:00, ding) · builds things that last (a brick tower in the wind)
//              · "I'm proud of you" comes as a stamped certificate (for Gemini) · fixes the wobbly shelf before anyone asks
//              · deadpan jokes that floor everyone · saves up for the people they love (a piggy bank: TRIP FOR US)
//              · slow climbs, big views (stairs up to a flag) · remembers a match's birth time, for their chart
//              · a soft heart under the suit (the tie flips, heart-print shirt)
//  37.8        "Steady. | *Always.*"  Capricorn comes back, big.
//  41.2        CALLBACK ending: "Gemini framed | *the certificate.*"  The certificate returns in a gold frame; Gemini beams.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SAGE = '#7dd8a8', RED = '#e23d4e', WOOD = '#c98f2a', ORANGE = '#ffb34a', BRICK = '#c0583a'
const S = 'capricorn'

// ── props
const PIG = [
  '......PP....',
  '..PPPPPPPP..',
  '.PPPPPPPPPP.',
  'PPPKPPPPPPPN',
  'PPPPPPPPPPNN',
  'PPPPPPPPPPPN',
  '.PPPPPPPPPP.',
  '..PP....PP..',
]
const PIG_C = { P: PINK, K: INK, N: '#ff6f9d' }
const WRENCH = ['GG...GG', 'GGG.GGG', '.GGGGG.', '..GGG..', '...G...', '...G...', '...G...', '...G...', '..GGG..', '..GGG..']
const COIN = ['.YY.', 'YWYY', 'YYYY', '.YY.']
const TIE = ['.RR.', 'RRRR', '.RR.', '.RR.', 'RRRR', 'RRRR', 'RRRR', '.RR.']

// a wall clock whose hands sweep to 7:00
function clock(x, cx, cy, k, p) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 132, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 120, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; x.fillRect(Math.cos(a) * 100 - 5, Math.sin(a) * 100 - 5, 10, 10) }
  const m = lerp(-Math.PI / 2 - 1.6, -Math.PI / 2, ease.outCubic(clamp(p))), h = lerp(Math.PI * 0.5 + 0.9, Math.PI * 0.5 + Math.PI / 6 * 1.0 + 0.0, 1)
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(h + 0.0) * 58, Math.sin(h + 0.0) * 58); x.stroke()
  x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(m) * 92, Math.sin(m) * 92); x.stroke()
  x.fillStyle = RED; x.beginPath(); x.arc(0, 0, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
// a brick tower, built row by row; the wind sways the panel's little flag but not the tower
function bricks(x, t, cx, bottom, n) {
  for (let r = 0; r < n; r++) for (let c = 0; c < 3; c++) {
    const w = 76, h = 46, off = r % 2 ? 38 : 0
    const px = cx - 114 + c * w + off - (r % 2 ? 38 : 0), py = bottom - (r + 1) * h
    x.fillStyle = INK; x.fillRect(px, py, w, h); x.fillStyle = BRICK; x.fillRect(px + 4, py + 4, w - 8, h - 8)
    x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(px + 4, py + 4, w - 8, 8)
  }
}
function wind(x, t, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.6 * clamp(k); x.strokeStyle = BONE; x.lineWidth = 5; x.lineCap = 'round'
  for (let i = 0; i < 4; i++) {
    const ph = (t * 0.9 + i * 0.27) % 1, y = 620 + i * 110, x0 = 960 - ph * 300
    x.beginPath(); x.moveTo(x0, y); x.lineTo(x0 - 120, y); x.stroke()
  }
  x.restore()
}
// a certificate with a gold seal and a stamp
function certificate(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-170, -112, 356, 240)
  x.fillStyle = INK; x.fillRect(-182, -124, 364, 248)
  x.fillStyle = '#fff4e2'; x.fillRect(-174, -116, 348, 232)
  x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(-160, -102, 320, 204)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 22px ${MONO}`; x.fillText('CERTIFICATE OF', 0, -66)
  x.font = `800 40px ${INTER}`; x.fillText('I’M PROUD', 0, -18); x.fillText('OF YOU', 0, 26)
  x.font = `700 20px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('signed, capricorn', 0, 70)
  if (stamp > 0.01) {
    x.save(); x.translate(120, 66); x.scale(stamp, stamp)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 38, 0, Math.PI * 2); x.fill()
    x.fillStyle = RED; x.fillRect(-22, 30, 14, 40); x.fillRect(8, 30, 14, 40)
    x.restore()
  }
  x.restore()
}
// a wall shelf that wobbles, then is fixed (level)
function shelf(x, cx, cy, k, fixed) {
  if (k <= 0.01) return
  const ang = fixed >= 1 ? 0 : 0.16 * (1 - fixed) * Math.sin(performance.now ? 0 : 0) + 0.16 * (1 - fixed)
  x.save(); x.translate(cx, cy); x.rotate(ang); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -14, 340, 28); x.fillStyle = WOOD; x.fillRect(-164, -8, 328, 16)
  const books = [[-140, 70, PINK], [-100, 90, SKYB], [-60, 76, MINT], [-20, 96, GOLD], [30, 80, LAV]]
  for (const [bx, h, c] of books) { x.fillStyle = INK; x.fillRect(bx, -14 - h, 36, h); x.fillStyle = c; x.fillRect(bx + 4, -10 - h, 28, h - 4) }
  x.restore()
  x.fillStyle = INK; x.fillRect(cx - 150, cy + 10, 14, 50); x.fillRect(cx + 136, cy + 10, 14, 50)
}
// stairs up to a little flag; the star is lifted by the caller
function stairs(x, cx, bottom, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = clamp(k)
  for (let i = 0; i < 5; i++) {
    const px = cx - 260 + i * 110, h = 60 + i * 80
    x.fillStyle = INK; x.fillRect(px, bottom - h, 114, h); x.fillStyle = '#8a7bb8'; x.fillRect(px + 4, bottom - h + 4, 106, h - 4)
    x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(px + 4, bottom - h + 4, 106, 10)
  }
  const fx = cx + 250, fy = bottom - 380
  x.fillStyle = INK; x.fillRect(fx - 4, fy - 150, 10, 150)
  x.fillStyle = SAGE; x.beginPath(); x.moveTo(fx + 6, fy - 150); x.lineTo(fx + 90, fy - 120); x.lineTo(fx + 6, fy - 90); x.fill()
  x.restore()
}
// an index card with a match's birth time
function noteCard(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-160, -96, 336, 208)
  x.fillStyle = INK; x.fillRect(-172, -108, 344, 216)
  x.fillStyle = '#fff4e2'; x.fillRect(-164, -100, 328, 200)
  x.fillStyle = '#a9d6ff'; for (let i = 0; i < 4; i++) x.fillRect(-164, -40 + i * 40, 328, 3)
  x.fillStyle = RED; x.fillRect(-164, -60, 328, 3)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 24px ${MONO}`; x.fillText('✦ MY MATCH', 0, -78)
  x.font = `800 34px ${INTER}`; x.fillText('born 6:42 a.m.', 0, -12)
  x.font = `700 24px ${MONO}`; x.fillStyle = '#6b62a8'; x.fillText('(asked once)', 0, 44)
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'You show up | *when you said.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      clock(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), prog(lt, 0.4, 1.3))
      bubble(x, 790, 1060, 'ding-dong!', pop01(t, P.t0 + 1.35, 0.25, 2.2), { size: 38, tail: 'bl' })
      label(x, 790, 610, '7:00. ON THE DOT.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: SAGE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You build things | *that last.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -210 },
    back(x, t, lt, P) { wind(x, t, prog(lt, 1.2, 1.5)) },
    front(x, t, lt, P) {
      bricks(x, t, 770, 1150, Math.min(9, Math.floor(clamp((lt - 0.2) / 1.0) * 9)))
      label(x, 790, 640, 'STILL STANDING', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04 })
    } },
  { sign: S, cap: 'Your “proud of you” | *comes certified.*', mood: 'happy', look: [1, 0], star: { x: -220, y: 60, s: 250 }, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      certificate(x, 720, 730, pop01(t, P.t0 + 0.2, 0.35, 2), pop01(t, P.t0 + 1.0, 0.3, 2.6))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'gemini', 820, 1030, 170 * k, { mood: lt > 1.3 ? 'heart' : 'wide', seed: 15, glyph: false, hops: [P.t0 + 1.5] })
      hearts(x, t, 820, 1000, P.t0 + 1.5, { n: 5, life: 1.6, spread: 120, cell: 6, seed: 5 })
    } },
  { sign: S, cap: 'You fix it | *before anyone asks.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, -1], star: { x: -200 }, hops: [1.5],
    front(x, t, lt, P) {
      shelf(x, 790, 820, pop01(t, P.t0 + 0.1, 0.3, 2), prog(lt, 0.9, 1.3))
      drawBits(x, WRENCH, { G: '#c9c9d8' }, 560, 880, 10 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: -0.5 + Math.sin(lt * 9) * 0.25 * (lt < 1.3 ? 1 : 0) })
      label(x, 790, 1060, 'FIXED. QUIETLY.', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: SAGE, rot: 0.04 })
    } },
  { sign: S, cap: 'Your dry jokes? | *Elite.*', mood: 'neutral', star: { x: -200 },
    front(x, t, lt, P) {
      bubble(x, 450, 620, 'I’m hilarious.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      for (const [id, px, d] of [['leo', 700, 0], ['aries', 880, 0.12]]) {
        const k = pop01(t, P.t0 + 0.2 + d, 0.35, 2), crack = lt > 1.0
        if (k > 0.01) {
          x.save(); x.translate(px, 1000); x.rotate(crack ? (px > 800 ? 0.4 : -0.35) * Math.min(1, (lt - 1.0) * 4) : 0); x.translate(-px, -1000)
          signChar(x, t, id, px, 980, 170 * k, { mood: crack ? 'squint' : 'neutral', seed: 30 + d * 10, glyph: false, hops: crack ? [P.t0 + 1.4, P.t0 + 1.8] : [] })
          x.restore()
        }
      }
      label(x, 790, 760, 'SAID IT STRAIGHT-FACED', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You save up | *for your people.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      drawBits(x, PIG, PIG_C, 790, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 3; i++) { const d = prog(lt, 0.5 + i * 0.3, 0.8 + i * 0.3); if (d > 0 && d < 1) drawBits(x, COIN, { Y: GOLD, W: '#fff' }, 770 + i * 10, lerp(600, 790, ease.inQuad(d)), 9) }
      label(x, 790, 1080, 'FUND: TRIP FOR US', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Slow climbs. | *Big views.*', mood: lt => lt > 1.7 ? 'sparkle' : 'squint', look: [1, -1], star: { x: lt => 0, s: 180 }, hideStar: true,
    front(x, t, lt, P) {
      stairs(x, 540, 1180, pop01(t, P.t0 + 0.1, 0.3, 1.6))
      const step = Math.min(4, Math.floor(lt / 0.42)), sub = (lt / 0.42) % 1
      const sx = 335 + step * 110, sy = 1180 - (60 + step * 80) - 70 - (step < 4 ? Math.sin(Math.PI * sub) * 24 : 0)
      signChar(x, t, S, sx, sy, 170, { mood: step >= 4 ? 'sparkle' : 'squint', look: [1, -1], seed: 3, glyph: false })
      label(x, 340, 640, 'STEP BY STEP', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 32, bg: LAV, rot: -0.05, font: MONO, weight: 700 })
      if (step >= 4) sparkles(x, t, sx, sy, P.t0 + 4 * 0.42 * 1.29, 7, 140, 0.4)
    } },
  { sign: S, cap: 'You remember | *their birth time.*', mood: lt => lt > 1.3 ? 'wink' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.4],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      noteCard(x, 780, 840, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 780, 1060, 'FOR THEIR CHART', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04 })
      sparkles(x, t, 780, 840, P.t0 + 1.3, 7, 200, 0.3)
    } },
  { sign: S, cap: 'A soft heart | *under the suit.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', star: { x: -10, y: 0, s: 340 }, hops: [1.3],
    front(x, t, lt, P, F) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.2))
      drawBits(x, TIE, { R: lerp(0, 1, flip) > 0.5 ? PINK : '#3a4a7a' }, F.x, F.cy + 80, 13, { sy: Math.abs(1 - 2 * flip) + 0.05 })
      if (flip > 0.5) hearts(x, t, F.x, F.cy, P.t0 + 1.2, { n: 7, life: 2, spread: 260, cell: 8, seed: 7 })
      label(x, 540, 1150, 'BUSINESS ON TOP. ♥︎ UNDERNEATH.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a016', key: 'D', accent: SAGE, solo: S,
  title: 'Capricorn, your gift | *is this.*',
  cameos: CAMEOS,
  ending: 'callback',
  group: { cap: 'Steady. | *Always.*', mood: 'happy' },
  last: {
    text: 'Gemini framed | *the certificate.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.4, 2)
      if (k > 0.01) {
        x.save(); x.translate(540, 950); x.scale(1.5 * k, 1.5 * k)
        x.fillStyle = INK; x.fillRect(-222, -164, 444, 328); x.fillStyle = GOLD; x.fillRect(-214, -156, 428, 312); x.fillStyle = '#c98f2a'; x.fillRect(-196, -138, 392, 276)
        x.restore()
      }
      certificate(x, 540, 950, 1.5 * k, pop01(t, t0 + 0.8, 0.3, 2.6))
      const g = pop01(t, t0 + 0.9, 0.4, 2)
      if (g > 0.01) signChar(x, t, 'gemini', 820, 1330, 300 * g, { mood: 'heart', look: [-1, -1], seed: 83, glyph: false, hops: [t0 + 1.5] })
      sparkles(x, t, 540, 950, t0 + 1.0, 8, 380, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
