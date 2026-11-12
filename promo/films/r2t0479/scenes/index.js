// r2t0479: star_talk, ROLL CALL, "The signs meeting | their date’s *friends.*" (~63 s vertical, signs3kit social cut, music: lofi · D)
// Twelve signs, each the most extreme version of themselves meeting the people their date loves most. Ending: card.
//   0.0–3.6    "The signs meeting | their date’s *friends.*"
//   3.6–49.2   ♈ showed up first, introduced the friends to each other · ♉ rated them by the snacks
//              · ♊ left with the friends, forgot the date · ♋ a casserole for each · ♌ signed autographs
//              · ♍ memorised every allergy · ♎ won the group vote · ♏ spotted the ex in four seconds
//              · ♐ invited everyone on holiday · ♑ brought a CV with references · ♒ liked the dog more · ♓ sobbed at the group photo
//  49.2        "Six new friends. | *One nervous date.*"
//  52.4        LESSON: "Love their people. | They’ll *love yours.*"  FRIENDS: APPROVED
//  58.3        "The friends? | *Now Gemini’s.*" over the match card: Gemini + Libra (the stolen friend group and the group vote).
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

const ACC = '#ffd23a'
const BOWL = ['K.........K', 'KCCYCCYCCCK', '.KCCCCCCCK.', '..KKKKKKK..']
const BOWL_C = { K: '#fff4e2', C: '#e8a24a', Y: GOLD }
const DISH = ['.KKKKKKKK.', 'KOOOOOOOOK', 'KOOOOOOOOK', '.KKKKKKKK.']
const DISH_C = { K: CREAM, O: ORANGE }
const DOG = ['B.......B.', 'BB.....BB.', 'BBBBBBBBB.', 'BKBBBBKBB.', 'BBBNNBBBB.', '.BBBBBBB..', '..BBBBBBBB', '..BB..BB.B', '..BB..BB..']
const DOG_C = { B: '#e8a24a', K: INK, N: PINK }
const SUIT = ['...KKK...', '..K...K..', 'RRRRRRRRR', 'RYRRRRRYR', 'RRRRRRRRR', 'RYRRRRRYR', 'RRRRRRRRR']
const SUIT_C = { K: INK, R: RED, Y: GOLD }
/** three friend stars in a row (the date's friends) */
function friends(x, t, cx, cy, k, { ids = ['leo', 'aquarius', 'libra'], mood = 'happy', s = 130, gap = 120 } = {}) {
  if (k <= 0.01) return
  ids.forEach((id, i) => signChar(x, t, id, cx + (i - (ids.length - 1) / 2) * gap, cy + (i % 2) * 20, s * k, { mood, look: [-1, 0], seed: 60 + i, glyph: false, glow: 0.6 }))
}

const CAMEOS = [
  { sign: 'aries', cap: 'Showed up first. | *Introduced everyone.*', mood: 'sparkle', star: ST, hops: [0.5, 1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      friends(x, t, 800, 1010, pop01(t, P.t0 + 0.3, 0.35, 2), { ids: ['leo', 'virgo', 'capricorn'], mood: 'wide' })
      L(x, 380, 700, 'HELLO, I’M ARIES', pop01(t, P.t0 + 0.6, 0.3, 2), RED, -0.05, 28, CREAM)
      bubble(x, 800, 720, 'Sam, meet Jo! | Jo, meet Sam!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Met the friends. | *Rated them by the snacks.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, BOWL, BOWL_C, 800, 1000, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 820, 'CHIPS: 7/10', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, -0.05, 34)
      L(x, 800, 690, 'DIP: MARRY THEM', pop01(t, P.t0 + 1.3, 0.3, 2.2), GREEN, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Left with the friends. | *Forgot the date.*', mood: 'sparkle', star: { x: -120 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      friends(x, t, 760, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), { ids: ['sagittarius', 'leo', 'aries'], mood: 'sparkle', s: 120, gap: 110 })
      L(x, 760, 660, 'NEW GROUP CHAT', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, -0.05, 32)
      bubble(x, 280, 1080, '…hello?', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      if (lt > 1.4) signChar(x, t, 'virgo', 280, 1180, 90, { mood: 'wide', seed: 70, glyph: false, glow: 0.4 })
    } },
  { sign: 'cancer', cap: 'Met the friends. | Made *each one a casserole.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 5; i++) drawBits(x, DISH, DISH_C, 800 + (i % 2 ? 10 : -10), 1110 - i * 66, 20 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2))
      puffs(x, t, 800, 760, P.t0 + 1.3, { n: 4, cell: 10, rise: 140, spread: 80 })
      L(x, 800, 640, 'ONE EACH ♡', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'leo', cap: 'Met the friends. | *Signed autographs.*', mood: 'sparkle', star: ST, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(0.06); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-140, -170, 280, 340); x.fillStyle = CREAM; x.fillRect(-130, -160, 260, 320)
        x.fillStyle = '#140c30'; x.fillRect(-114, -144, 228, 220)
        x.restore()
        signChar(x, t, 'leo', 800, 820, 150 * k, { mood: 'wink', seed: 81, glyph: false, glow: 0.4 })
        const s = prog(lt, 0.8, 1.5)
        if (s > 0) { x.save(); x.translate(800, 880); x.rotate(0.06); x.strokeStyle = '#2a2350'; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 30 * s; i++) { const px = -90 + i * 6, py = 120 + Math.sin(i * 0.7) * 14; i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke(); x.restore() }
      }
      L(x, 800, 650, 'XOXO, LEO', pop01(t, P.t0 + 1.6, 0.3, 2.2), ORANGE, -0.05, 34)
    } },
  { sign: 'virgo', cap: 'Met the friends. | *Memorised every allergy.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      note(x, 790, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['Sam: nuts', 'Jo: dairy', 'Kai: cilantro', 'Ash: mornings'], { w: 330, bg: CREAM, size: 30, rot: 0.04, font: MONO, weight: 700 })
      L(x, 790, 1120, 'STUDIED ✓', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.04, 34)
    } },
  { sign: 'libra', cap: 'Met the friends. | *Won the group vote.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friends(x, t, 800, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), { ids: ['cancer', 'pisces', 'taurus'], mood: lt > 0.9 ? 'heart' : 'happy' })
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.3))
      L(x, 800, 800, `YES VOTES: ${n}/3`, pop01(t, P.t0 + 0.5, 0.3, 2), PINK, -0.04, 34)
      L(x, 800, 660, '✦ APPROVED', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 36)
    } },
  { sign: 'scorpio', cap: 'Met the friends. | *Spotted the ex.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friends(x, t, 800, 1040, pop01(t, P.t0 + 0.2, 0.35, 2), { ids: ['gemini', 'aquarius', 'sagittarius'] })
      const k = pop01(t, P.t0 + 0.8, 0.3, 2)
      if (k > 0.01) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(800, 1060, 86 * k, 0, Math.PI * 2); x.stroke(); x.restore() }
      L(x, 800, 820, 'THE EX: SPOTTED', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 32, CREAM)
      bubble(x, 800, 660, '4 seconds.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Met the friends. | *Invited them on holiday.*', mood: 'sparkle', star: { x: 150 }, hops: [0.6, 1.4],
    front(x, t, lt, P) {
      drawBits(x, SUIT, SUIT_C, 320, 1020, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 320, 820, 'TICKETS ×7', pop01(t, P.t0 + 0.7, 0.3, 2), GOLD, -0.05, 36)
      bubble(x, 330, 640, 'we leave | Friday!', pop01(t, P.t0 + 1.3, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Met the friends. | *Brought a CV.*', mood: 'neutral', look: [-1, 0], star: { x: 150 },
    front(x, t, lt, P) {
      note(x, 320, 870, pop01(t, P.t0 + 0.2, 0.3, 2), ['CAPRICORN', 'loyal ✓', 'punctual ✓', 'references ✓'], { w: 320, bg: CREAM, size: 30, rot: -0.04, font: MONO, weight: 700 })
      L(x, 320, 1120, 'HIRED AS FRIEND', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Met the friends. | *Liked the dog more.*', mood: lt => lt > 0.9 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      friends(x, t, 800, 760, pop01(t, P.t0 + 0.2, 0.35, 2), { ids: ['leo', 'virgo'], s: 110, gap: 120, mood: 'neutral' })
      drawBits(x, DOG, DOG_C, 790, 1060, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      hearts(x, t, 680, 1000, P.t0 + 1.0, { n: 5, life: 1.8, spread: 140, cell: 7, seed: 3 })
      L(x, 800, 1180, 'BEST FRIEND: DOG', pop01(t, P.t0 + 1.5, 0.3, 2.2), SKYB, -0.04, 28)
    } },
  { sign: 'pisces', cap: 'The group photo? | *Sobbed through it.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 880); x.rotate(0.05); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-160, -130, 320, 260); x.fillStyle = CREAM; x.fillRect(-150, -120, 300, 240)
        x.fillStyle = '#140c30'; x.fillRect(-134, -104, 268, 170)
        x.restore()
        friends(x, t, 800, 850, k, { ids: ['cancer', 'pisces', 'leo'], s: 90, gap: 80, mood: 'sparkle' })
      }
      L(x, 800, 1110, 'MY PEOPLE NOW', pop01(t, P.t0 + 1.4, 0.3, 2.2), SKYB, -0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2t0479', key: 'D', accent: ACC, ending: 'card',
  title: 'The signs meeting | their date’s *friends.*',
  cameos: CAMEOS,
  card: { a: 'gemini', b: 'libra', chip: "IT'S A MATCH" },
  group: { cap: 'Six new friends. | *One nervous date.*' },
  lesson: { text: 'Love their people. | They’ll *love yours.*', chip: 'FRIENDS: APPROVED' },
  last: {
    text: 'The friends? | *Now Gemini’s.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
