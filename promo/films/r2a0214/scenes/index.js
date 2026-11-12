// r2a0214: star_advice, ADVICE ROLLCALL, "How each sign | cheers you up." (~57 s vertical, signs3kit social cut, music: lofi · E)
// Twelve signs in zodiac order, one warm, specific line each with a light visual gag. The format look lives in ../../signs3kit.js.
//   0.0–3.6    "How each sign | *cheers you up.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one card per sign (3.8 s each):
//              ♈ drags you on an adventure · ♉ shows up with your favourite cake · ♊ forty funny memes
//              · ♋ remembers your favourite everything · ♌ cheers like a whole stadium · ♍ quietly sorts your week
//              · ♎ tells you you look amazing · ♏ really listens · ♐ makes you laugh till it hurts
//              · ♑ builds a comeback plan, step one: rest · ♒ a wild theory about shy clouds · ♓ cries with you (tissues shared)
//  49.2        "Twelve ways | to *feel better.*"  The twelve fly up into a group photo.
//  52.6        callback: "The tissue box? | *Empty. Worth it.*"  Pisces' tissue box comes back, empty, with hearts.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a', SUN = '#ffd36b', GREEN = '#5fd068'

// ── props
const CAKE = [
  '....R....',
  '...WWW...',
  '..PPPPP..',
  '.WWWWWWW.',
  'PPPPPPPPP',
  'CCCCCCCCC',
  'PPPPPPPPP',
  'CCCCCCCCC',
]
const CAKE_C = { R: RED, W: CREAM, P: PINK, C: '#c98f6a' }
const FINGER = [
  '...YY...',
  '...YY...',
  '...YY...',
  '.YYYYYY.',
  'YYYYYYYY',
  'YYYYYYYY',
  'YYYYYYYY',
  '.YYYYYY.',
  '..YYYY..',
  '..YYYY..',
]
const TISSUE = [
  '...WWW...',
  '..WWWWW..',
  '.BBBBBBB.',
  'BBBBBBBBB',
  'BbBBBBBbB',
  'BBBBBBBBB',
  'BBBBBBBBB',
]
const SHOE = ['.RRR....', 'RRRRR...', 'RRRRRRRR', 'WWWWWWWW']

// a paper card with lines of text
function paper(x, cx, cy, k, rows, { rot = -0.04, w = 300, head } = {}) {
  if (k <= 0.01) return
  const h = (head ? 120 : 70) + rows.length * 54
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12); x.fillStyle = CREAM; x.fillRect(-w / 2, -h / 2, w, h)
  let y0 = -h / 2 + 50
  if (head) { x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, y0); y0 += 60 }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  rows.forEach(([txt, col, kk = 1], i) => { if (!kk) return; x.fillStyle = col || INK; x.font = `800 27px ${INTER}`; x.fillText(txt, -w / 2 + 22, y0 + i * 54) })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Aries drags you | *on an adventure.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'get your | shoes. now!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      drawBits(x, SHOE, { R: RED, W: CREAM }, 740, 920, 16 * pop01(t, P.t0 + 0.8, 0.3, 2), { rot: -0.1 })
      drawBits(x, SHOE, { R: RED, W: CREAM }, 860, 960, 16 * pop01(t, P.t0 + 0.95, 0.3, 2), { rot: 0.1 })
      label(x, 790, 1110, 'MOOD: UPGRADED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus brings | *your favourite cake.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 900, 24 * pop01(t, P.t0 + 0.25, 0.35, 2))
      label(x, 790, 1110, 'NO REASON. JUST CAKE.', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 0.6, 7, 170, 0.4)
    } },
  { sign: 'gemini', cap: 'Gemini sends | *forty funny memes.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'happy', star: { x: -170 },
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.2) / 1.5) * 8)
      for (let i = 0; i < n; i++) label(x, 680 + (i % 2) * 180, 640 + Math.floor(i / 2) * 105, ['LOL', 'HAHA', 'dead', 'LMAO', 'omg', 'STOP', 'HAHA', 'one more'][i], 1, { size: 30, bg: [GOLD, BONE, MINT, PINK][i % 4], rot: Math.sin(i * 2) * 0.08, font: MONO, weight: 700 })
      label(x, 790, 1130, `MEMES: ${Math.round(clamp((lt - 0.2) / 1.6) * 40)}`, pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: SUN, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cancer remembers | *your favourite everything.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P) {
      const n = Math.floor(clamp((lt - 0.3) / 1.2) * 4)
      paper(x, 790, 850, pop01(t, P.t0 + 0.15, 0.3, 2), [['✓ your tea', INK, n > 0], ['✓ your song', INK, n > 1], ['✓ your comfort show', INK, n > 2], ['✓ your sign’s vibe', '#2f9a62', n > 3]], { head: 'YOU', w: 320, rot: 0.04 })
    } },
  { sign: 'leo', cap: 'Leo cheers for you | *like a whole stadium.*', mood: 'sparkle', star: { x: -170 }, hops: [0.5, 1.0, 1.5, 2.0],
    front(x, t, lt, P, F) {
      drawBits(x, FINGER, { Y: ORANGE }, F.x + 150, F.cy - 60 + Math.sin(t * 10) * 10, 15 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.2 })
      label(x, 800, 690, 'YOU’RE #1!!', pop01(t, P.t0 + 0.6, 0.3, 2.2), { size: 44, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
      label(x, 800, 1110, 'CROWD SIZE: ONE LEO', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Virgo quietly | *sorts out your week.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.rotate(0.03); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -150, 320, 300); x.fillStyle = CREAM; x.fillRect(-152, -142, 304, 284)
        x.fillStyle = '#9fe0a8'; x.fillRect(-152, -142, 304, 50)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YOUR WEEK', 0, -116)
        const n = Math.floor(clamp((lt - 0.4) / 1.2) * 7)
        for (let i = 0; i < 7; i++) {
          const px = -120 + (i % 4) * 80, py = -40 + Math.floor(i / 4) * 110
          x.fillStyle = '#d8d0c0'; x.fillRect(px - 30, py - 36, 60, 72)
          x.fillStyle = INK; x.font = `700 20px ${MONO}`; x.fillText('MTWTFSS'[i], px, py - 18)
          if (i < n) { x.fillStyle = '#2f9a62'; x.font = `800 34px ${INTER}`; x.fillText('✓', px, py + 12) }
        }
        x.restore()
      }
      label(x, 790, 1110, 'SORTED. BREATHE.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: '#9fe0a8', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Libra tells you | *you look amazing.*', mood: lt => lt > 1 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.1],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'you look | AMAZING.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'bl' })
      label(x, 790, 900, '(it’s true)', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 34, bg: BONE, rot: 0.05 })
      bubble(x, 790, 1080, 'your match is lucky', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 30, col: LAV, tail: 'bl' })
    } },
  { sign: 'scorpio', cap: 'Scorpio listens. | *Really listens.*', mood: 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, '…and then?', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 42, tail: 'bl' })
      bubble(x, 790, 860, 'tell me | everything.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      label(x, 790, 1100, 'PHONE: FACE DOWN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius makes you | *laugh till it hurts.*', mood: lt => lt > 0.6 ? 'sparkle' : 'happy', star: { x: -170 }, hops: [0.6, 1.0, 1.4, 1.8],
    front(x, t, lt, P) {
      const W = ['HA', 'HA', 'HA', 'HA!']
      W.forEach((w, i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.25, 0.25, 2.4)
        if (k <= 0.01) return
        x.save(); x.translate(660 + i * 90, 800 + Math.sin(t * 8 + i) * 22 - (i % 2) * 40); x.rotate(Math.sin(i * 1.7) * 0.25); x.scale(k, k)
        x.font = `800 72px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 10; x.strokeStyle = INK; x.strokeText(w, 0, 0)
        x.fillStyle = [GOLD, PINK, MINT, SUN][i]; x.fillText(w, 0, 0); x.restore()
      })
      label(x, 790, 1100, 'ABS: WORKED OUT', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Capricorn builds | *your comeback plan.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const COLS = ['#9fb7c9', '#b9cfe0', '#d4e4f0']
      for (let i = 0; i < 3; i++) {
        const k = pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2)
        if (k <= 0.01) continue
        const w = 300 - i * 90, h = 90, cx = 790 + i * 45, cy = 1040 - i * 100
        x.save(); x.translate(cx, cy); x.scale(k, k); x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10); x.fillStyle = COLS[i]; x.fillRect(-w / 2, -h / 2, w, h)
        x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(['1: rest', '2: plan', '3: WIN'][i], 0, 2); x.restore()
      }
      drawBits(x, ['G.....', 'GGGGG.', 'GGGGGG', 'GGGGG.', 'G.....', 'G.....', 'G.....'], { G: GOLD }, 900, 760, 10 * pop01(t, P.t0 + 1.2, 0.3, 2))
      label(x, 760, 650, 'STEP 1 IS A NAP', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Aquarius distracts you | *with a wild theory.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', look: [1, -1], star: { x: -170 }, hops: [1.3],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'what if | clouds are shy?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 36, tail: 'bl' })
      const k = pop01(t, P.t0 + 1.0, 0.3, 2)
      drawBits(x, ['....WWWW......', '..WWWWWWWW.WW.', '.WWWWWWWWWWWWW', 'WWWWWWWWWWWWWW', '.WWWWWWWWWWWW.'], { W: '#e8e4f8' }, 790, 940, 13 * k)
      if (k > 0.5) { x.fillStyle = PINK; x.globalAlpha = 0.8; x.fillRect(730, 950, 22, 10); x.fillRect(830, 950, 22, 10); x.globalAlpha = 1; x.fillStyle = INK; x.fillRect(745, 925, 10, 10); x.fillRect(825, 925, 10, 10) }
      label(x, 790, 1110, 'SADNESS: FORGOTTEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: '#6fe3ff', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces cries with you. | *Then for you.*', mood: 'squint', tears: lt => lt > 0.8 ? 3 : 2, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB, b: '#5aa8c9' }, 790, 920, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1110, 'TISSUES: SHARED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 760, P.t0 + 1.4, { n: 5, life: 1.5, spread: 160, cell: 6, seed: 8 })
    } },
]

const F = makeFilm({
  id: 'r2a0214', key: 'E', accent: SUN, ending: 'callback',
  title: 'How each sign | *cheers you up.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | to *feel better.*' },
  last: {
    text: 'The tissue box? | *Empty. Worth it.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.6, 0.35, 2)
      drawBits(x, TISSUE.map((r, j) => j < 2 ? '.........' : r), { B: SKYB, b: '#5aa8c9' }, 540, 1080, 30 * k)
      if (k > 0.5) signChar(x, t, 'pisces', 790, 1040, 190 * k, { mood: 'heart', seed: 79, glyph: false, tears: 1 })
      hearts(x, t, 540, 960, t0 + 1.2, { n: 8, life: 2, spread: 400, cell: 7, seed: 4 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
