// r2t0223: star_talk, BELIKE, "Zodiacs when the book was better | be like." (~57 s vertical, signs3kit, music: lofi · G)
// Twelve signs in zodiac order at the film version of a book they loved.
//   0.0–3.6    "Zodiacs when the book was better | *be like.*"
//   3.6–49.2   ♈ walked out during the trailer · ♉ stayed for the popcorn · ♊ read the book aloud over the film
//              · ♋ swaddled the book like a baby · ♌ made a poster for their own better version · ♍ listed 47 missing
//              scenes · ♎ secretly liked it, told no one · ♏ knew the twist, smirked all film · ♐ skipped it, visited
//              the real castle · ♑ calculated the time lost · ♒ started a petition, one signature · ♓ cried at the book,
//              cried at this too
//  49.2        "The book | *was better.*"   52.6  callback: "Sequel announced. | Taurus: more popcorn."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, CREAM, RED, ORANGE, WOOD, BROWN, GREY, DEEP, GREEN, SUN } from './props.js'

const POP = ['..W.WW.W..', '.WWWWWWWW.', 'WWYWWWYWWW', '.WWWWWWWW.', 'RWRWRWRWRW', 'RWRWRWRWRW', '.RWRWRWRW.', '.RWRWRWRW.', '.RWRWRWRW.', '..RWRWRW..']
const POP_C = { W: '#fff9e6', Y: '#ffe066', R: RED }
const BOOK = ['BBBBBBBBBB', 'BYYYYYYYYB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBYYYYBBB', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const BOOK_C = { B: '#6b62a8', Y: GOLD }
const CASTLE = ['G...G...G...G', 'GG.GG...GG.GG', 'GGGGG...GGGGG', 'GGGGGGGGGGGGG', 'GGKGGGGGGGKGG', 'GGGGGGKGGGGGG', 'GGGGGKKKGGGGG', 'GGGGGKKKGGGGG']
const CASTLE_C = { G: '#9aa5c4', K: INK }
const TISSUE = ['..WW..', '.WWWW.', 'BBBBBB', 'BBBBBB', 'BBBBBB']

/** a little cinema screen */
function screen(x, cx, cy, k, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -110, 340, 220); x.fillStyle = '#e8eef8'; x.fillRect(-160, -100, 320, 200)
  if (fn) fn()
  x.restore()
}

const L = { x: -160 }, R = { x: 150 }
const CAMEOS = [
  { sign: 'aries', cap: 'Walked out | *during the trailer.*', mood: lt => lt > 0.9 ? 'squint' : 'wide', look: [1, 0], star: { x: -160 }, hops: [1.0, 1.3, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      screen(x, 790, 820, pop01(t, P.t0 + 0.2, 0.3, 2), () => txt(x, 'COMING SOON', 0, 0, { size: 36, font: MONO, weight: 700 }))
      label(x, 790, 1060, '→ EXIT', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 52, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Hated it. | Stayed *for the popcorn.*', mood: lt => lt > 1.0 ? 'heart' : 'squint', star: L,
    front(x, t, lt, P) {
      drawBits(x, POP, POP_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      for (let i = 0; i < 4; i++) { const ph = (lt * 0.9 + i * 0.25) % 1; drawBits(x, ['.W.', 'WWW', '.W.'], { W: '#fff9e6' }, 690 + i * 60, 760 - Math.sin(Math.PI * ph) * 80, 8, { alpha: lt > 0.6 ? 1 : 0 }) }
      label(x, 790, 1130, 'REFILL #4', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Read the book aloud. | *Over the film.*', mood: 'sparkle', look: [1, 0], star: L,
    front(x, t, lt, P) {
      drawBits(x, BOOK, BOOK_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const W = ['“chapter one…”', '“in the BOOK, the Leo…”', '“chapter two…”']
      bubble(x, 790, 720, W[Math.min(2, Math.floor(lt / 0.8))], pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bl' })
      label(x, 800, 1140, 'AUDIENCE: SHHH', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Swaddled the book. | *Protected it.*', mood: 'heart', star: L,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 900); x.rotate(-0.2 + Math.sin(t * 2.4) * 0.08); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 100, 0, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#ffc6d9'; x.beginPath(); x.ellipse(0, 0, 142, 92, 0, 0, Math.PI * 2); x.fill()
        x.restore()
        drawBits(x, BOOK, BOOK_C, 760, 880, 10 * k, { rot: -0.2 })
      }
      label(x, 790, 700, 'SHHH. IT’S SLEEPING.', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 790, 1000, P.t0 + 1.2, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Made their own version. | *Starring Leo.*', mood: 'sparkle', star: L, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 380, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: '#ffb34a', rot: 0.04 }, () => {
        txt(x, 'THE BOOK', 0, -150, { size: 30, font: MONO, weight: 700 })
        txt(x, '(but good)', 0, -112, { size: 22, font: MONO, weight: 700 })
        signChar(x, t, 'leo', 0, 20, 160, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 })
        txt(x, 'STARRING: LEO', 0, 150, { size: 24, font: MONO, weight: 700 })
      })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Listed every | *missing scene.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: L,
    front(x, t, lt, P) {
      const g = ease.outCubic(prog(lt, 0.3, 1.5))
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 640); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-126, -6, 252, 520 * g + 12); x.fillStyle = CREAM; x.fillRect(-120, 0, 240, 520 * g)
        for (let i = 0; i < Math.floor(g * 11); i++) { txt(x, `${i + 1}.`, -96, 26 + i * 46, { size: 22, font: MONO, weight: 700 }); x.fillStyle = '#6b62a8'; x.fillRect(-64, 20 + i * 46, 140 - (i % 3) * 20, 12) }
        x.restore()
      }
      label(x, 790, 1150, 'PAGE 1 OF 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'libra', cap: 'Secretly liked it. | *Told no one.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: lt => lt > 1.2 ? [1, 0] : [-1, 0], star: L,
    front(x, t, lt, P) {
      bubble(x, 790, 700, 'the book was | better, obviously', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, tail: 'bl' })
      bubble(x, 800, 960, '(it was nice)', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 26, col: PINK, tail: 'bl' })
      label(x, 800, 1110, 'SECRET: KEPT', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 30, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Knew the twist. | *Smirked all film.*', mood: lt => lt > 1.0 ? 'wink' : 'neutral', look: [1, 0], star: L,
    front(x, t, lt, P) {
      screen(x, 790, 800, pop01(t, P.t0 + 0.2, 0.3, 2), () => txt(x, lt > 1.0 ? 'IT WAS HIM?!' : '…', 0, 0, { size: 40, font: MONO, weight: 700, color: RED }))
      label(x, 790, 1040, 'CALLED IT: CH. 2', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 32, bg: '#ff6b8a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'sagittarius', cap: 'Skipped it. | Visited *the real castle.*', mood: 'sparkle', star: R, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, CASTLE, CASTLE_C, 310, 900, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 310, 700, 'SETTING: VISITED', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 320, 1100, 'way better', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Calculated | *the time lost.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [-1, 0], star: R,
    front(x, t, lt, P) {
      const m = Math.floor(clamp((lt - 0.3) / 1.4) * 161)
      card(x, 310, 860, 300, 240, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: -0.04 }, () => {
        txt(x, 'TIME LOST', 0, -70, { size: 30, font: MONO, weight: 700 })
        txt(x, `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m`, 0, 20, { size: 56, font: MONO, weight: 700, color: RED })
      })
      label(x, 310, 1080, 'INVOICE: SENT', pop01(t, P.t0 + 1.6, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Started a petition. | *One signature.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: L,
    front(x, t, lt, P) {
      card(x, 790, 860, 280, 340, pop01(t, P.t0 + 0.2, 0.35, 2), { bg: CREAM, rot: 0.04 }, () => {
        txt(x, 'REMAKE IT', 0, -130, { size: 30, font: MONO, weight: 700 })
        txt(x, '(like the book)', 0, -94, { size: 20, font: MONO, weight: 700 })
        x.fillStyle = '#b9b0a0'; for (let i = 0; i < 4; i++) x.fillRect(-110, -40 + i * 50, 220, 4)
        if (lt > 0.9) { x.strokeStyle = SKYB; x.lineWidth = 5; x.beginPath(); for (let j = 0; j <= 12; j++) { const px = -100 + j * 12 * clamp((lt - 0.9) / 0.4), py = -60 + Math.sin(j * 1.4) * 12; j ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke() }
      })
      label(x, 790, 1100, 'SIGNATURES: 1', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Cried at the book. | *Cried at this too.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: L,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, TISSUE, { W: '#ffffff', B: SKYB }, 800, 940, 30 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const n = 1 + Math.floor(clamp((lt - 0.3) / 1.6) * 11)
      label(x, 790, 720, `TISSUES: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2), { size: 36, bg: BONE, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0223', key: 'G', accent: GOLD, ending: 'callback',
  title: 'Zodiacs when the | book was better | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'The book | *was better.*' },
  last: {
    text: 'Sequel announced. | *More popcorn.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.3, 0.45, 2)
      for (let i = 0; i < 3; i++) drawBits(x, POP, POP_C, 340 + i * 200, 1080 - (i % 2) * 40, 24 * pop01(t, t - lt + 0.3 + i * 0.25, 0.4, 2))
      label(x, 540, 1290, 'TAURUS: READY', pop01(t, t - lt + 1.3, 0.3, 2.2), { size: 40, bg: GOLD, rot: -0.03, font: MONO, weight: 700 })
      void k
    },
  },
})
export const DURATION = F.DURATION
// the hook is three lines: shrink the title box a little so it clears the panel's name tab
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const tb = sc.root.children[1].children[1]
  Object.assign(tb.style, { left: '-20px', width: '1120px', transformOrigin: '50% 0', transform: 'scale(0.85)' })
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
