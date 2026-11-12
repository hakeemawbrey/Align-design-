// r2a0110: star_advice, ADVICE ROLLCALL, "Each sign’s | perfect match." (~63 s vertical, signs3kit social cut, music: lofi · G)
// Twelve signs in zodiac order: one warm, specific line each about the kind of person who fits them, one light gag.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   ♈ someone who can keep up, barely · ♉ someone who memorised your snack order · ♊ someone who loves all of you
//              · ♋ someone who texts "home safe?" · ♌ someone who claps the loudest · ♍ someone who notices the little things
//              · ♎ someone who makes peace feel easy · ♏ someone who keeps your secrets · ♐ someone who says "pack a bag"
//              · ♑ someone who makes you log off · ♒ someone who asks about your theories · ♓ someone who cries at movies too
//  49.2        "Twelve signs. | *Twelve soft spots.*"
//  52.4        LESSON UNLOCKED: "The right match | *just gets you.*"  MATCH: MADE
//  58.3        "Cancer + Pisces? | *Tissues for two.*"  over the match card (cancer + pisces, IT'S A MATCH).
import { prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ROSE = '#ff7aa8', RED = '#e23d4e', CREAM = '#fff4e2', WOOD = '#c98f2a', ORANGE = '#ffb34a'

// ── props
const SHOE = ['....KKKK..', '...KRRRRK.', '..KRRWRRK.', 'KKRRRRRRRK', 'KWWWWWWWWK', 'KKKKKKKKKK']
const shoeC = c => ({ K: INK, R: c, W: '#ffffff' })
const SNACK = ['.YYYYYY.', 'YYYYYYYY', 'YRRRRRRY', 'YRWWWWRY', 'YRRRRRRY', 'YYYYYYYY', '.YYYYYY.']
const SNACK_C = { Y: ORANGE, R: RED, W: CREAM }
const HANDS = ['.KK....KK.', 'KYYK..KYYK', 'KYYYKKYYYK', 'KYYYYYYYYK', '.KYYYYYYK.', '..KYYYYK..']
const HANDS_C = { K: INK, Y: '#ffd1a8' }
const GLASS = ['..KKKK....', '.KSSSSK...', 'KSWSSSSK..', 'KSSSSSSK..', 'KSSSSSSK..', '.KSSSSK...', '..KKKKBB..', '......BBB.', '.......BBB', '........BB']
const GLASS_C = { K: INK, S: 'rgba(143,227,255,0.45)', W: '#ffffff', B: WOOD }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const DIARY = ['KKKKKKKKKK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KPPPGGPPPK', 'KPPPGGPPPK', 'KPPPPPPPPK', 'KPPPPPPPPK', 'KKKKKKKKKK']
const DIARY_C = { K: INK, P: '#7a2a4a', G: GOLD }
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSHHSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'KGGGGGGGGGGK', 'KKKKKKKKKKKK']
const LAPTOP_C = { K: INK, S: '#2a2350', H: PINK, G: '#9aa5c4' }
const TISSUE = ['...WW...', '..WWWW..', 'BBBBBBBB', 'BbbbbbbB', 'BBBBBBBB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, b: '#5fb8d8' }

// a balance scale, swinging gently to level
function scale(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const tilt = 0.35 * Math.cos(lt * 4) * Math.exp(-lt * 1.6)
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-10, -120, 20, 240); x.fillRect(-90, 110, 180, 20)
  x.fillStyle = GOLD; x.fillRect(-6, -116, 12, 232); x.fillRect(-86, 114, 172, 12)
  x.save(); x.translate(0, -110); x.rotate(tilt)
  x.fillStyle = INK; x.fillRect(-170, -8, 340, 16); x.fillStyle = GOLD; x.fillRect(-166, -4, 332, 8)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 150, 0); x.rotate(-tilt)
    x.strokeStyle = GOLD; x.lineWidth = 3; x.beginPath(); x.moveTo(0, 0); x.lineTo(-50, 80); x.moveTo(0, 0); x.lineTo(50, 80); x.stroke()
    x.fillStyle = INK; x.fillRect(-64, 78, 128, 14); x.fillStyle = GOLD; x.fillRect(-60, 80, 120, 10)
    drawBits(x, HEART, { H: d < 0 ? PINK : ROSE, W: '#fff' }, 0, 50, 7)
    x.restore()
  }
  x.restore(); x.restore()
}
// two tickets fanned out
function tickets(x, cx, cy, k) {
  if (k <= 0.01) return
  for (const [d, c] of [[-1, SKYB], [1, MINT]]) {
    x.save(); x.translate(cx + d * 40, cy + d * 10); x.rotate(d * 0.14); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-130, -64, 260, 128); x.fillStyle = c; x.fillRect(-124, -58, 248, 116)
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TICKET ×1', 0, -20); x.fillText('TO: ???', 0, 22)
    x.restore()
  }
}
// a small phone with one message
function phone(x, cx, cy, k, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -192, 296, 400)
  x.fillStyle = INK; x.fillRect(-154, -204, 308, 408); x.fillStyle = '#2a2350'; x.fillRect(-144, -194, 288, 388)
  x.fillStyle = '#140c30'; x.fillRect(-132, -170, 264, 340)
  x.fillStyle = MINT; x.fillRect(-120, -156, 240, 46)
  x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ YOUR MATCH', 0, -132)
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(i % 2 ? 16 : -16, -50 + i * 80); x.scale(kk, kk)
    x.font = `800 30px ${INTER}`; const w = x.measureText(txt).width + 30
    x.fillStyle = col; x.fillRect(-w / 2, -28, w, 56); x.fillStyle = INK; x.fillText(txt, 0, 2)
    x.restore()
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who keeps up. | *Barely.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      drawBits(x, SHOE, shoeC(RED), 730 + Math.sin(t * 14) * 10, 900, 24 * k, { rot: Math.sin(t * 14) * 0.15 })
      drawBits(x, SHOE, shoeC(SKYB), 850 + Math.sin(t * 14 + 1.5) * 10, 1020, 24 * k, { rot: Math.sin(t * 14 + 1.5) * 0.15 })
      label(x, 790, 680, 'PACE: MATCHED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'wait up! ♡', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Someone who knows | *your snack order.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, SNACK, SNACK_C, 800, 920, 22 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.06 })
      label(x, 790, 680, 'ORDER: MEMORISED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 1060, P.t0 + 1.2, { n: 5, life: 1.6, spread: 160, cell: 6, seed: 1 })
    } },
  { sign: 'gemini', cap: 'Someone who loves | *every version of you.*', mood: lt => lt > 1.2 ? 'heart' : 'wink', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const MOODS = ['wink', 'sleepy', 'sparkle', 'wide']
      MOODS.forEach((m, i) => { const k = pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2); if (k > 0.01) signChar(x, t, 'gemini', 700 + (i % 2) * 180, 760 + Math.floor(i / 2) * 230, 140 * k, { mood: m, seed: 30 + i, glyph: false }) })
      label(x, 790, 1150, 'ALL OF THEM ♡', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Someone who texts | *“home safe?”*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      phone(x, 790, 870, 1.1 * pop01(t, P.t0 + 0.15, 0.3, 2), [
        ['home safe?', PINK, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['yes ♡', SKYB, pop01(t, P.t0 + 1.2, 0.25, 2.2)],
      ])
    } },
  { sign: 'leo', cap: 'Someone who claps | *the loudest.*', mood: lt => lt > 0.8 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [0.9, 1.6],
    front(x, t, lt, P, F) {
      const clap = Math.abs(Math.sin(lt * 10))
      drawBits(x, HANDS, HANDS_C, 790, 900, 27 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: 0.8 + 0.25 * clap })
      label(x, 790, 680, 'STANDING OVATION', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      sparkles(x, t, F.x, F.cy, P.t0 + 1.0, 7, 200, 0.3)
    } },
  { sign: 'virgo', cap: 'Someone who notices | *the little things.*', mood: lt => lt > 1.2 ? 'heart' : 'squint', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, HEART, { H: ROSE, W: '#fff' }, 720, 940, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, GLASS, GLASS_C, 860 + Math.sin(lt * 3) * 20, 830, 22 * pop01(t, P.t0 + 0.4, 0.3, 2))
      label(x, 790, 1120, 'NEW HAIRCUT: NOTICED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Someone who makes | *peace feel easy.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      scale(x, t, 760, 960, 0.95 * pop01(t, P.t0 + 0.15, 0.35, 2), lt)
      label(x, 790, 680, 'BALANCE: FOUND', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone who keeps | *your secrets.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, DIARY, DIARY_C, 800, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 680, 'VAULT: LOCKED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 38, bg: '#c66bff', rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 1130, 'told no one.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Someone who says | *“pack a bag.”*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.5],
    front(x, t, lt, P) {
      tickets(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 680, 'LEAVING: TONIGHT', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone who makes you | *log off.*', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shut = ease.inOutCubic(prog(lt, 0.7, 1.1))
      drawBits(x, LAPTOP, LAPTOP_C, 790, 940, 27 * pop01(t, P.t0 + 0.15, 0.3, 2), { sy: 1 - 0.55 * shut })
      label(x, 790, 680, 'OUT OF OFFICE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Someone who asks about | *your theories.*', mood: lt => lt > 1.1 ? 'sparkle' : 'wide', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'so the moon | is hollow?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      bubble(x, 790, 1000, 'tell me MORE', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: PINK, tail: 'br' })
      hearts(x, t, 560, 800, P.t0 + 1.3, { n: 5, life: 1.6, spread: 140, cell: 6, seed: 5 })
    } },
  { sign: 'pisces', cap: 'Someone who cries | *at movies too.*', mood: 'wide', tears: lt => lt > 0.6 ? 3 : 2, look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 800, 950, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      label(x, 790, 690, 'TISSUES: SHARED', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0110', key: 'G', accent: ROSE, ending: 'card',
  title: 'Each sign’s | *perfect match.*',
  cameos: CAMEOS,
  card: { a: 'cancer', b: 'pisces', chip: 'IT’S A MATCH' },
  group: { cap: 'Twelve signs. | *Twelve soft spots.*' },
  lesson: { text: 'The right match | *just gets you.*', chip: 'MATCH: MADE' },
  last: { text: 'Cancer + Pisces? | *Tissues for two.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
