// v3a005: zodiac.advice444, ADVICE ROLL CALL, "What each sign | needs in a match." (~62 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs in zodiac order, one warm, specific need each with a light visual gag. Ending: lesson.
//   0.0–3.6    "What each sign | *needs in a match.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one need per sign (3.8 s each):
//              ♈ someone who keeps up (two sneakers, SAME PACE) · ♉ someone who loves a cozy night (two pairs of slippers)
//              · ♊ someone who loves a tangent (TOPIC #47) · ♋ someone who remembers the little things (fridge notes)
//              · ♌ someone who cheers the loudest (Libra's banner: MY FAVOURITE LEO) · ♍ someone who notices the effort
//              (a gold star on the folded towels) · ♎ someone who helps them decide (a coin: HEADS YOU, TAILS YOU)
//              · ♏ someone who never plays games (the board game, taped shut) · ♐ someone who says yes (two tickets: ANYWHERE)
//              · ♑ someone who makes them laugh (BAD PUNS VOL. 3) · ♒ someone who matches their weird (two antenna headbands)
//              · ♓ someone who brings the tissues (crying, both of them)
//  49.2        "Everyone needs | *their person.*"  The twelve fly up into a group photo.
//  52.4        LESSON UNLOCKED: "Know what you need. | *Then ask for it.*"  NEEDS: MET
//  58.3        "Libra flipped again. | *Still you.*"  The coin is back: YOU.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', ROSE = '#ff7aa8'

// ── props
const SHOE = ['....RRR.', '...RRWR.', '..RRRRR.', 'RRRRRRRR', 'WWWWWWWW']
const SLIPPER = ['..PPPPP.', '.PPWWWPP', 'PPPPPPPP', 'SSSSSSSS']
const NOTE = ['YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY', 'YYYYYYYY']
const TOWEL = ['TTTTTTTTTT', 'TWTTTTTTWT', 'TTTTTTTTTT']
const STAR_S = ['...Y...', '..YYY..', 'YYYYYYY', '.YYYYY.', '.YY.YY.']
const TISSUE = ['...WW...', '..WWWW..', '.WWWWWW.', 'BBBBBBBB', 'BLLLLLLB', 'BLLLLLLB', 'BBBBBBBB']
const TISSUE_C = { W: '#ffffff', B: SKYB, L: '#5aa9e6' }
const ANTENNA = ['M.......M', '.K.....K.', '..K...K..', '..KKKKK..', '.K.....K.']
const ANTENNA_C = { M: MINT, K: BONE }
function ticket(x, cx, cy, k, rot, text) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -66, 300, 132); x.fillStyle = GOLD; x.fillRect(-144, -60, 288, 120)
  x.fillStyle = INK; x.beginPath(); x.arc(-144, 0, 16, 0, Math.PI * 2); x.arc(144, 0, 16, 0, Math.PI * 2); x.fill()
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ONE TICKET TO', 0, -26)
  x.font = `800 40px ${INTER}`; x.fillText(text, 0, 18)
  x.restore()
}
function coin(x, t, cx, cy, k, flip, face) {
  if (k <= 0.01) return
  const sx = Math.cos(flip)
  x.save(); x.translate(cx, cy); x.scale(k * Math.max(0.08, Math.abs(sx)), k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  x.strokeStyle = '#c99a2e'; x.lineWidth = 6; x.beginPath(); x.arc(0, 0, 70, 0, Math.PI * 2); x.stroke()
  if (Math.abs(sx) > 0.4) { x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(face, 0, 4) }
  x.restore()
}
function gameBox(x, cx, cy, k, tape) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -120, 340, 240); x.fillStyle = '#4f8fe6'; x.fillRect(-162, -112, 324, 224)
  x.fillStyle = GOLD; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MIND', 0, -40); x.fillText('GAMES', 0, 10)
  for (let i = 0; i < 4; i++) { x.fillStyle = [RED, MINT, PINK, BONE][i]; x.fillRect(-120 + i * 70, 60, 40, 30) }
  if (tape > 0.01) {
    x.save(); x.rotate(0.6); x.fillStyle = 'rgba(239,230,214,0.92)'; x.fillRect(-220 * tape, -26, 440 * tape, 52); x.restore()
    x.save(); x.rotate(-0.6); x.fillStyle = 'rgba(239,230,214,0.92)'; x.fillRect(-220 * tape, -26, 440 * tape, 52); x.restore()
  }
  x.restore()
}
function book(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.06); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-140, -180, 280, 360); x.fillStyle = '#e8892a'; x.fillRect(-132, -172, 264, 344)
  x.fillStyle = '#c96f16'; x.fillRect(-132, -172, 24, 344)
  x.fillStyle = INK; x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BAD', 10, -80); x.fillText('PUNS', 10, -28)
  x.font = `700 28px ${MONO}`; x.fillText('VOL. 3', 10, 40)
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Someone who | *keeps up.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 2; i++) {
        const b = Math.abs(Math.sin(t * 9 + i * 1.6)) * 30
        drawBits(x, SHOE, { R: i ? MINT : RED, W: '#fff' }, 720 + i * 170, 1020 - b, 20 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.35, 2))
        x.fillStyle = 'rgba(239,230,214,0.6)'; for (let j = 0; j < 3; j++) x.fillRect(620 + i * 170 - j * 30, 990 + j * 22 - b, 50, 6)
      }
      label(x, 790, 760, 'SAME PACE', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 44, bg: GOLD, rot: -0.05 })
    } },
  { sign: 'taurus', cap: 'Someone who | *loves a cozy night.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 1], star: { x: -210 },
    front(x, t, lt, P) {
      const pairs = [[PINK, 690], [SKYB, 870]]
      pairs.forEach(([c, px], i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.25, 0.35, 2); drawBits(x, SLIPPER, { P: c, W: '#fff', S: '#3a3157' }, px - 40, 1060, 15 * k); drawBits(x, SLIPPER, { P: c, W: '#fff', S: '#3a3157' }, px + 50, 1070, 15 * k) })
      label(x, 790, 760, 'PLANS: COUCH', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Someone who | *loves a tangent.*', mood: lt => Math.floor(lt * 4) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const p = clamp((lt - 0.2) / 1.3)
      x.save(); x.strokeStyle = GOLD; x.lineWidth = 8; x.setLineDash([16, 10]); x.beginPath()
      for (let i = 0; i <= 80 * p; i++) { const u = i / 80, px = 600 + u * 320 + Math.sin(u * 19) * 70, py = 1050 - u * 380 + Math.cos(u * 17) * 60; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
      label(x, 820, 640, 'TOPIC #47', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 36, bg: PINK, rot: 0.05, font: MONO, weight: 700 })
      bubble(x, 760, 1140, 'wait, also—', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'Someone who | *remembers the little things.*', mood: lt => lt > 1.3 ? 'heart' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      const k0 = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k0 > 0.01) { x.save(); x.translate(790, 870); x.scale(k0, k0); x.fillStyle = INK; x.fillRect(-160, -250, 320, 500); x.fillStyle = '#e8eef8'; x.fillRect(-152, -242, 304, 484); x.fillStyle = '#c8d2ee'; x.fillRect(-152, -60, 304, 8); x.fillStyle = '#9aa0b4'; x.fillRect(110, -200, 12, 90); x.fillRect(110, 0, 12, 120); x.restore() }
      const notes = [['FAV SOUP:', 'TOMATO', 720, 720, GOLD], ['DAY WE', 'MATCHED', 850, 790, PINK], ['THEIR', 'MOM’S B-DAY', 780, 980, MINT]]
      notes.forEach(([a, b, px, py, c], i) => {
        const k = pop01(t, P.t0 + 0.6 + i * 0.3, 0.3, 2.2); if (k <= 0.01) return
        x.save(); x.translate(px, py); x.rotate((i - 1) * 0.08); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-96, -60, 192, 120); x.fillStyle = c; x.fillRect(-90, -54, 180, 108)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(a, 0, -16); x.fillText(b, 0, 18)
        x.restore()
      })
    } },
  { sign: 'leo', cap: 'Someone who | *cheers the loudest.*', mood: 'sparkle', star: { x: -220 }, hops: [0.6, 1.2, 1.8],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'libra', 820, 1020, 170 * k, { mood: 'happy', look: [-1, 0], seed: 21, glyph: false, hops: [P.t0 + 1.0, P.t0 + 1.4, P.t0 + 1.8] })
      const b = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (b > 0.01) {
        x.save(); x.translate(780, 740 + Math.sin(t * 6) * 8); x.rotate(Math.sin(t * 4) * 0.05); x.scale(b, b)
        x.fillStyle = INK; x.fillRect(-190, -70, 380, 140); x.fillStyle = BONE; x.fillRect(-182, -62, 364, 124)
        x.fillStyle = RED; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MY FAVOURITE', 0, -20); x.fillStyle = '#e8892a'; x.font = `800 48px ${INTER}`; x.fillText('LEO!!', 0, 26)
        x.restore()
      }
    } },
  { sign: 'virgo', cap: 'Someone who | *notices the effort.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, TOWEL, { T: [MINT, SKYB, PINK, LAV, GOLD][i], W: '#fff' }, 800, 1100 - i * 46, 24 * pop01(t, P.t0 + 0.2 + i * 0.08, 0.3, 2))
      drawBits(x, STAR_S, { Y: GOLD }, 880, 840, 16 * pop01(t, P.t0 + 1.1, 0.3, 2.6), { rot: 0.2 })
      label(x, 760, 690, 'THANK YOU! (NOTICED.)', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 28, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Someone who | *helps them decide.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, -1], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const fl = ease.outCubic(prog(lt, 0.3, 1.3))
      coin(x, t, 790, 880 - Math.sin(Math.PI * fl) * 220, pop01(t, P.t0 + 0.2, 0.3, 2), fl * Math.PI * 9, 'YOU')
      label(x, 790, 1120, 'HEADS: YOU. TAILS: YOU.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: PINK, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Someone who | *never plays games.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      gameBox(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), ease.outCubic(prog(lt, 0.8, 1.3)))
      label(x, 790, 1120, 'GAMES: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: RED, color: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Someone who | *says yes to adventure.*', mood: 'sparkle', star: { x: -220 }, hops: [1.0, 1.5],
    front(x, t, lt, P) {
      ticket(x, 790, 780, pop01(t, P.t0 + 0.2, 0.35, 2), -0.08, 'ANYWHERE')
      ticket(x, 800, 960, pop01(t, P.t0 + 0.8, 0.35, 2), 0.06, 'ANYWHERE')
      label(x, 800, 1140, 'PACKED IN 4 MINUTES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 26, bg: LAV, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Someone who | *makes them laugh.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.3, 1.5, 1.7, 1.9],
    front(x, t, lt, P) {
      book(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 520, 640, 'HA! okay, | that one got me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 30, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Someone who | *matches their weird.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P, F) {
      drawBits(x, ANTENNA, ANTENNA_C, F.x, F.top - 30, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) { const G = signChar(x, t, 'gemini', 820, 1000, 190 * k, { mood: lt > 1.2 ? 'sparkle' : 'happy', look: [-1, 0], seed: 22, glyph: false }); drawBits(x, ANTENNA, ANTENNA_C, G.x, G.top - 22, 10 * pop01(t, P.t0 + 0.9, 0.3, 2)) }
      label(x, 790, 1150, 'WEIRD: MATCHED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Someone who | *brings the tissues.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', tears: lt => lt > 1.2 ? 2 : 3, star: { x: -230 },
    front(x, t, lt, P) {
      drawBits(x, TISSUE, TISSUE_C, 640, 1100, 16 * pop01(t, P.t0 + 0.6, 0.35, 2))
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 830, 990, 190 * k, { mood: 'happy', look: [-1, 0], seed: 23, glyph: false, tears: 1 })
      label(x, 800, 700, 'CRYING TOGETHER', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: 0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'v3a005', key: 'C', accent: ROSE, ending: 'lesson',
  title: 'What each sign | *needs in a match.*',
  cameos: CAMEOS,
  group: { cap: 'Everyone needs | *their person.*' },
  lesson: { text: 'Know what you need. | *Then ask for it.*', chip: 'NEEDS: MET' },
  last: {
    text: 'Libra flipped again. | *Still you.*',
    draw(x, t, lt) { coin(x, t, 540, 760, 0.8 * pop01(t, t - lt + 0.5, 0.35, 2), Math.min(1, lt / 1.2) * Math.PI * 6, 'YOU') },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
