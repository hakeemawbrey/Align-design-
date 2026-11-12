// r2t0476: star_talk, BE LIKE, "Zodiacs getting | surprised *be like.*" (~54 s vertical, signs3kit social cut, music: lofi · C)
// Twelve signs, each the most extreme version of themselves when someone surprises them. Ending: group.
//   0.0–3.6    "Zodiacs when they get a surprise | *be like.*"
//   3.6–49.2   ♈ jumped out first at their own party · ♉ unwrapped the gift, ate the bow · ♊ faked the gasp, planned it
//              · ♋ got one flower, built it a shrine · ♌ brought a banner of their own face · ♍ solved it from the receipts
//              · ♎ asked to redo the entrance, better lighting · ♏ knew since day one, from your chart · ♐ party at home, Sag abroad
//              · ♑ surprise day off, worked anyway · ♒ threw yours on a random Tuesday · ♓ cried before the lights came on
//  49.2        group (the ending): "Act natural. | *Nobody did.*"  SURPRISE: RUINED
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', GREY = '#9aa5c4', PURP = '#6b62a8', DEEP = '#2a2350', GREEN = '#5fd068', BROWN = '#8a4a2e'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }

/** a phone with a header strip and chat pills: lines = [[text, colour, k, right?], …] */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [], rot = 0.05 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = DEEP; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk, right], i) => {
    if (kk <= 0.01) return
    x.font = `700 24px ${MONO}`; const w = x.measureText(txt).width + 24
    x.save(); x.translate(right ? 96 - w : -96, -60 + i * 64); x.scale(kk, kk)
    x.fillStyle = col; x.fillRect(0, -22, w, 44); x.fillStyle = INK; x.fillText(txt, 12, 2)
    x.restore()
  })
  x.restore()
}
/** soft pixel puffs rising from (cx, cy) after t0 */
function puffs(x, t, cx, cy, t0, { n = 5, col = '#e6e1f2', cell = 14, rise = 200, spread = 90, seed = 0 } = {}) {
  if (t < t0) return
  for (let i = 0; i < n; i++) {
    const ph = (((t - t0) * 0.9 + i / n) % 1 + 1) % 1
    const px = cx + Math.sin(i * 2.1 + seed) * spread * 0.5 + Math.sin(ph * 5 + i) * 12, py = cy - ph * rise, r = cell * (0.8 + ph * 1.4)
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph) * 0.9
    x.fillStyle = INK; x.fillRect(px - r - 4, py - r * 0.7 - 4, 2 * r + 8, 1.4 * r + 8)
    x.fillStyle = col; x.fillRect(px - r, py - r * 0.7, 2 * r, 1.4 * r)
    x.restore()
  }
}
/** a paper card with lines of text */
function note(x, cx, cy, k, lines, { w = 300, bg = '#ffe27a', size = 34, rot = -0.06, font = INTER, weight = 800, color = INK } = {}) {
  if (k <= 0.01) return
  const lh = size * 1.55, h = lines.length * lh + 50
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16); x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -h / 2 + 25 + lh * (i + 0.5)))
  x.restore()
}
/** paper confetti falling */
function confetti(x, t, cx, cy, t0, { n = 22, spread = 320, h = 520 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.55 + i * 0.137) % 1
    const px = cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, py = cy - h / 2 + ph * h
    x.save(); x.translate(px, py); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a profile card with a sign star inside */
function profile(x, t, cx, cy, k, id, title, { w = 250, h = 320, mood = 'sparkle', rot = 0.05, bg = DEEP, col = GOLD } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 90)
  signChar(x, t, id, 0, -26, 150, { mood, seed: 71, glyph: false, glow: 0.9, tears: id === 'pisces' ? 1 : 0 })
  x.fillStyle = col; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(title, 0, h / 2 - 38)
  x.restore()
}
/** a birth-chart wheel */
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; for (const a of [0.4, 2.6, 4.5]) x.fillRect(Math.cos(a) * r * 0.4 - 8, Math.sin(a) * r * 0.4 - 8, 16, 16)
  x.restore()
}
/** a box with a lid (gift): open = 0…1 lifts the lid */
function giftBox(x, cx, cy, k, open = 0, { body = PINK, ribbon = GOLD, w = 200, h = 160, bow = true } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = body; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = ribbon; x.fillRect(-14, -h / 2, 28, h)
  const ly = -h / 2 - 30 - open * 120, lr = open * -0.5
  x.save(); x.translate(0, ly); x.rotate(lr)
  x.fillStyle = INK; x.fillRect(-w / 2 - 22, -6, w + 44, 48)
  x.fillStyle = body; x.fillRect(-w / 2 - 16, 0, w + 32, 36)
  x.fillStyle = ribbon; x.fillRect(-14, 0, 28, 36)
  if (bow) { x.fillStyle = INK; x.fillRect(-62, -40, 124, 46); x.fillStyle = ribbon; x.fillRect(-56, -34, 46, 34); x.fillRect(10, -34, 46, 34); x.fillStyle = '#c98f2a'; x.fillRect(-12, -30, 24, 30) }
  x.restore()
  x.restore()
}

const ACC = '#ff8fb1'
const BANNER = (x, cx, cy, k, text, { bg = GOLD, rot = 0.04, w = 360 } = {}) => {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -46, w + 12, 92)
  x.fillStyle = bg; x.fillRect(-w / 2, -40, w, 80)
  x.fillStyle = INK; x.font = `800 38px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
  x.restore()
}
const FLOWER = ['.PP.PP.', 'PPPYPPP', '.PPPPP.', '..PPP..', '...G...', '.GGG...', '...G...', '...GGG.', '...G...']
const FLOWER_C = { P: PINK, Y: GOLD, G: GREEN }
const CANDLE = ['.F.', 'FYF', '.Y.', 'WWW', 'WWW', 'WWW', 'WWW']
const CANDLE_C = { F: ORANGE, Y: GOLD, W: CREAM }
const BOW = ['GG...GG', 'GGG.GGG', 'GGGGGGG', 'GGG.GGG', 'GG...GG']
const LAPTOP = ['KKKKKKKKKKKK', 'KSSSSSSSSSSK', 'KSWWWWSSSSSK', 'KSSSSSSSSSSK', 'KSWWWWWWSSSK', 'KSSSSSSSSSSK', 'KKKKKKKKKKKK', 'GGGGGGGGGGGGGG', 'GGGGGGGGGGGGGG']
const LAPTOP_C = { K: DEEP, S: SKYB, W: CREAM, G: GREY }
const HAT = ['...Y...', '..PPP..', '..PYP..', '.PPPPP.', '.PYPYP.', 'PPPPPPP']
const HAT_C = { Y: GOLD, P: PINK }

const CAMEOS = [
  { sign: 'aries', cap: 'Their own surprise party? | Jumped out *first.*', mood: lt => lt > 0.6 ? 'wide' : 'sparkle', star: { x: -150 }, hops: [0.5, 0.9, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'SURPRISE!!', pop01(t, P.t0 + 0.45, 0.25, 2.2), { size: 52, tail: 'bl' })
      confetti(x, t, 540, 860, P.t0 + 0.5)
      L(x, 790, 960, 'GUEST OF HONOUR', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.05, 30)
      bubble(x, 800, 1100, '…that was us', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'taurus', cap: 'Unwrapped the gift. | *Ate the bow.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      giftBox(x, 790, 960, k, ease.outCubic(prog(lt, 0.6, 1.0)), { body: SKYB, ribbon: GREEN, bow: false })
      const g = prog(lt, 0.9, 1.4)
      if (g < 1) drawBits(x, BOW, { G: GREEN }, lerp(790, 520, ease.inOutCubic(g)), lerp(760, 860, ease.inOutCubic(g)), 16 * k * (1 - 0.6 * g))
      L(x, 790, 650, 'IT WAS RIBBON', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 32)
      bubble(x, 400, 640, 'crunchy', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  { sign: 'gemini', cap: 'Faked the gasp. | Also *planned it.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'wide', star: ST,
    front(x, t, lt, P) {
      bubble(x, 770, 640, 'GASP! for ME?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 42, tail: 'bl' })
      note(x, 790, 900, pop01(t, P.t0 + 0.9, 0.3, 2), ['PARTY PLAN', 'by: Gemini', 'for: Gemini'], { w: 310, bg: CREAM, size: 34, rot: 0.05 })
      L(x, 790, 1110, 'ORGANISER: ME', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Got one flower. | *Built it a shrine.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.translate(790, 1060); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-130, -20, 260, 150); x.fillStyle = LAV; x.fillRect(-122, -12, 244, 134)
      x.fillStyle = PURP; x.fillRect(-122, -12, 244, 22)
      x.restore()
      drawBits(x, FLOWER, FLOWER_C, 790, 950, 18 * k)
      const c = pop01(t, P.t0 + 0.8, 0.3, 2)
      drawBits(x, CANDLE, CANDLE_C, 690, 1000, 11 * c); drawBits(x, CANDLE, CANDLE_C, 890, 1000, 11 * c)
    },
    front(x, t, lt, P) {
      L(x, 790, 680, 'FOREVER FLOWER', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 32)
      sparkles(x, t, 790, 920, P.t0 + 1.2, 6, 140, 0.4)
      hearts(x, t, 790, 880, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Surprise party? | Brought *a banner of themself.*', mood: 'sparkle', star: { x: -150, y: 40 }, hops: [1.3],
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(560, 610); x.scale(k, k); x.rotate(-0.03)
      x.fillStyle = INK; x.fillRect(-330, -70, 660, 140); x.fillStyle = ORANGE; x.fillRect(-322, -62, 644, 124)
      x.restore()
      signChar(x, t, 'leo', 340, 610, 110 * k, { mood: 'wink', seed: 51, glyph: false, glow: 0.4 })
      x.save(); x.translate(560, 610); x.scale(k, k); x.rotate(-0.03); x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LEO DAY!', 90, 4); x.restore()
    },
    front(x, t, lt, P) {
      bubble(x, 790, 900, 'you’re welcome', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 560, 610, P.t0 + 0.8, 7, 260, 0.2)
    } },
  { sign: 'virgo', cap: 'Solved it early. | *From the receipts.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      note(x, 790, 880, k, ['RECEIPT', 'balloons ×40', 'cake ×1', 'candles ×30'], { w: 300, bg: CREAM, size: 32, rot: 0.04, font: MONO, weight: 700 })
      const c = prog(lt, 0.9, 1.3)
      if (c > 0) { x.save(); x.translate(790, 880); x.rotate(0.04); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.ellipse(0, 72, 140 * c, 36 * c, 0, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 790, 640, 'CASE CLOSED', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 36)
    } },
  { sign: 'libra', cap: 'Loved the surprise. | Asked to *redo it.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 880); x.scale(k, k); x.rotate(0.04)
        const open = 0.35 * (1 - ease.outBack(prog(lt, 0.7, 0.95)))
        x.fillStyle = INK; x.fillRect(-156, -76, 312, 206); x.fillStyle = '#2a2350'; x.fillRect(-148, -68, 296, 190)
        x.fillStyle = CREAM; x.font = `800 64px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TAKE 2', 0, 30)
        x.save(); x.translate(-156, -84); x.rotate(-open)
        x.fillStyle = INK; x.fillRect(0, -44, 312, 50)
        for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? CREAM : '#140c30'; x.fillRect(6 + i * 50, -38, 50, 38) }
        x.restore()
        x.restore()
      }
      bubble(x, 790, 1080, 'better lighting?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 790, 640, 'FROM THE TOP', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, -0.05, 32)
    } },
  { sign: 'scorpio', cap: 'Knew about it. | *Since day one.*', mood: lt => lt > 1.3 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 820, 120, pop01(t, P.t0 + 0.25, 0.35, 2), t)
      L(x, 790, 1000, 'YOUR CHART: READ', pop01(t, P.t0 + 0.8, 0.3, 2.2), MINT, -0.04, 30)
      bubble(x, 790, 1120, 'act surprised?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Surprise party at home. | Sag was *abroad.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(320, 800); x.scale(k, k); x.rotate(-0.06)
        x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -96, 316, 210)
        x.fillStyle = INK; x.fillRect(-160, -106, 320, 212); x.fillStyle = CREAM; x.fillRect(-152, -98, 304, 196)
        x.fillStyle = SKYB; x.fillRect(-140, -86, 150, 172); x.fillStyle = GREEN; x.fillRect(-140, 30, 150, 56); x.fillStyle = GOLD; x.fillRect(-60, -60, 34, 34)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillText('wish you', 80, -24); x.fillText('were here!', 80, 16)
        x.restore()
      }
      L(x, 320, 1000, 'POSTCARD: 1 · SAG: 0', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, 0.04, 28)
      bubble(x, 330, 620, '…hello?', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Got a surprise day off. | *Worked anyway.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, LAPTOP, LAPTOP_C, 320, 960, 18 * k)
      L(x, 320, 680, 'DAY OFF ✦', pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, -0.05, 36)
      const x2 = prog(lt, 0.8, 1.1)
      if (x2 > 0) { x.save(); x.strokeStyle = RED; x.lineWidth = 10; x.beginPath(); x.moveTo(220, 680); x.lineTo(220 + 200 * x2, 680); x.stroke(); x.restore() }
      bubble(x, 330, 1130, 'just one email', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, tail: 'br' })
    } },
  { sign: 'aquarius', cap: 'Threw your party. | *On a random Tuesday.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      note(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), ['TUESDAY', 'the 9th', '(not your', 'birthday)'], { w: 280, bg: SKYB, size: 34, rot: 0.05 })
      bubble(x, 790, 610, 'why wait?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 42, col: MINT, tail: 'bl' })
      confetti(x, t, 790, 900, P.t0 + 1.3, { n: 14, spread: 180 })
    } },
  { sign: 'pisces', cap: 'Cried *before* | the lights came on.', mood: lt => lt < 0.8 ? 'sparkle' : 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, HAT_C, F.x + 10, F.top - 40, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.15 })
      L(x, 790, 760, 'LIGHTS: STILL OFF', pop01(t, P.t0 + 0.7, 0.3, 2.2), GOLD, -0.05, 30)
      bubble(x, 790, 960, 'it’s just | SO NICE', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0476', key: 'C', accent: ACC, ending: 'group',
  title: 'Zodiacs getting | surprised *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Act natural. | *Nobody did.*',
    draw(x, t, lt) {
      L(x, 540, 740, 'SURPRISE: RUINED', pop01(t, t - lt + 1.6, 0.3, 2.4), ACC, -0.04, 44)
      confetti(x, t, 540, 900, t - lt + 1.2, { n: 26, spread: 420, h: 600 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
