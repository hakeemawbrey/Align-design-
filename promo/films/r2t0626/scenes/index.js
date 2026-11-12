// r2t0626: star_talk, ROLLCALL, "The signs | *as librarians.*" (signs3kit social cut, music: lofi · C).
// Ending: callback.
//   0.0–3.6    hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one librarian per sign (3.8 s each):
//              ♈ shushes you through a megaphone · ♉ no food allowed, except theirs · ♊ one recommendation, then forty
//              · ♋ your book was late, they called your mom · ♌ only stocks their own memoir · ♍ re-alphabetized the
//              shelf you touched · ♎ shelves the books in matching pairs · ♏ only works the mystery aisle
//              · ♐ on break, back in two years · ♑ late fee, with interest · ♒ sorted every book by star sign
//              · ♓ read the sad ending, flooded the library
//  49.2        "Twelve librarians. | *Zero quiet.*"
//  52.6        callback: "Aries finally | *got shushed.*" (the megaphone comes back, and gets shushed)
import { makeFilm, sparkles, hearts, bubble, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB } from '../../signs3kit.js'
import { L, sheet, phone, bits, swapLabel, chart, RED, CREAM, STEEL, WOOD, NIGHT, clamp, lerp, ease, prog } from './props.js'

const ACC = '#ffd23a', ST = { x: -170 }
const SPINE = ['#e23d4e', '#ffb34a', '#ffd23a', '#5fd068', '#6fc3ff', '#b46cff']

/** a row of book spines standing on a little shelf; heights/colours per book, drawn in the given order */
function shelf(x, cx, cy, k, books, { w = 54, gap = 8 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const total = books.length * (w + gap) - gap
  x.fillStyle = INK; x.fillRect(-total / 2 - 24, 0, total + 48, 30); x.fillStyle = WOOD; x.fillRect(-total / 2 - 18, 4, total + 36, 20)
  books.forEach(([h, col, lx], i) => {
    const bx = -total / 2 + i * (w + gap) + (lx || 0)
    x.fillStyle = INK; x.fillRect(bx - 5, -h - 5, w + 10, h + 5)
    x.fillStyle = col; x.fillRect(bx, -h, w, h)
    x.fillStyle = 'rgba(255,255,255,0.55)'; x.fillRect(bx + 10, -h + 18, w - 20, 8); x.fillRect(bx + 10, -h + 34, w - 20, 8)
  })
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Shushes you. | Through a *megaphone.*', mood: lt => lt > 0.8 ? 'wide' : 'squint', star: ST, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const shake = lt > 0.8 && lt < 1.8 ? Math.sin(t * 40) * 6 : 0
      bits(x, 'MEGA', 640 + shake, 860, 22 * pop01(t, P.t0 + 0.25, 0.3, 2), { rot: -0.1 })
      bubble(x, 810, 700, 'SHHHH!!', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 60, col: '#ff8a5a', tail: 'bl' })
      L(x, 800, 1080, 'VOLUME: 11', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.05, 34)
    } },
  { sign: 'taurus', cap: 'No food allowed. | Except *theirs.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST,
    front(x, t, lt, P) {
      L(x, 800, 660, 'NO FOOD', pop01(t, P.t0 + 0.2, 0.3, 2), RED, -0.05, 44)
      const n = Math.min(3, Math.floor(Math.max(0, lt - 0.6) / 0.3) + 1)
      for (let i = 0; i < n; i++) bits(x, 'SANDWICH', 800 + (i % 2 ? 16 : -16), 1080 - i * 78, 13 * pop01(t, P.t0 + 0.6 + i * 0.3, 0.3, 2), { rot: i % 2 ? 0.05 : -0.05 })
      bubble(x, 800, 820, 'staff only.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'One recommendation. | Then *forty more.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 3) % 2 ? 1 : -1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.2) / 1.8) * 39)
      const rows = Math.min(7, 1 + Math.floor(n / 6))
      for (let i = 0; i < rows; i++) bits(x, 'BOOK', 800 + (i % 2 ? 18 : -18), 1120 - i * 66, 11, { rot: i % 2 ? 0.06 : -0.06 })
      L(x, 800, 620, `REC #${n}`, pop01(t, P.t0 + 0.25, 0.3, 2), PINK, 0.05, 44)
    } },
  { sign: 'cancer', cap: 'Your book was late. | They called *your mom.*', mood: lt => lt > 1.2 ? 'wide' : 'happy', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      phone(x, t, 800, 880, 1.2 * pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'CALLING: MOM', headCol: PINK, lines: [['eating ok??', PINK, pop01(t, P.t0 + 0.7, 0.25, 2.2)], ['1 DAY LATE', GOLD, pop01(t, P.t0 + 1.3, 0.25, 2.2), true]], size: 22 })
      hearts(x, t, 800, 640, P.t0 + 1.6, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 2 })
    } },
  { sign: 'leo', cap: 'Only stocks | *their own memoir.*', mood: 'sparkle', star: ST, hops: [1.4],
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) bits(x, 'BOOK', 690 + i * 110, 900, 15 * pop01(t, P.t0 + 0.25 + i * 0.2, 0.3, 2), { rot: (i - 1) * 0.06 })
      L(x, 800, 720, 'ME: VOL. 1–3', pop01(t, P.t0 + 0.9, 0.3, 2.2), '#ffb34a', -0.05, 38)
      L(x, 800, 1070, 'SIGNED. OBVIOUSLY.', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
      sparkles(x, t, 800, 900, P.t0 + 1.0, 6, 170, 0.2)
    } },
  { sign: 'virgo', cap: 'Re-sorted the shelf | *you just touched.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const H = [130, 90, 150, 70, 110, 170], sortedP = ease.inOutCubic(prog(lt, 0.8, 1.5))
      const order = H.map((h, i) => i)
      const sorted = [...order].sort((a, b) => H[a] - H[b])
      const books = H.map((h, i) => { const from = order.indexOf(i), to = sorted.indexOf(i); return [h, SPINE[i], (to - from) * 62 * sortedP] })
      shelf(x, 800, 1000, pop01(t, P.t0 + 0.2, 0.3, 2), books)
      bubble(x, 800, 660, 'you touched it.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 800, 1110, 'SORTED ✓', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 36)
    } },
  { sign: 'libra', cap: 'Shelves the books | in *matching pairs.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const j = ease.inOutCubic(prog(lt, 0.4, 1.1))
      bits(x, 'BOOK', lerp(650, 745, j), 900, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(-0.2, -0.05, j) })
      bits(x, 'BOOK', lerp(950, 855, j), 900, 15 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: lerp(0.2, 0.05, j) })
      hearts(x, t, 800, 820, P.t0 + 1.0, { n: 5, life: 1.6, spread: 140, cell: 7, seed: 4 })
      L(x, 800, 690, 'PERFECT MATCH ♡', pop01(t, P.t0 + 1.2, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Only works | in the *mystery aisle.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k <= 0.01) return
      x.save(); x.globalAlpha = 0.55 * k; x.fillStyle = '#05040c'; x.fillRect(110, 480, 860, 740); x.restore()
      x.save(); x.globalAlpha = 0.3 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(370, 900, 230, 0, Math.PI * 2); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      bits(x, 'CANDLE', 560, 1000, 14 * pop01(t, P.t0 + 0.3, 0.3, 2), { sy: 1 + 0.06 * Math.sin(t * 9) })
      L(x, 800, 680, 'AISLE 13', pop01(t, P.t0 + 0.6, 0.3, 2), '#b04ad0', 0.05, 46)
      bubble(x, 800, 900, 'you found me.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'On a short break. | Back *in two years.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      bits(x, 'BACKPACK', 800, 860, 20 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.08 })
      swapLabel(x, 800, 1090, lt, 1.2, 'BACK IN 5 MIN', 'BACK IN 2 YRS', { size: 34, fromBg: BONE, toBg: '#ff9a4a' })
      L(x, 800, 660, 'DESK: CLOSED', pop01(t, P.t0 + 0.5, 0.3, 2), STEEL, -0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Late fee: | *with interest.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 800, 880, pop01(t, P.t0 + 0.2, 0.3, 2), { w: 340, h: 330, head: 'INVOICE', headBg: STEEL, headInk: INK, lines: ['1 day late', 'fee: 10¢', 'interest: yes', ['TOTAL: $40', RED]], size: 32, progress: clamp((lt - 0.4) / 1.2) })
      bubble(x, 800, 1120, 'payment plans open.', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'aquarius', cap: 'Sorted every book | by *star sign.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, -1], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      chart(x, 800, 790, 130, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 800, 1000, 'FICTION? NO. PISCES.', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 28)
      L(x, 800, 1100, 'DEWEY: RETIRED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'pisces', cap: 'Read the sad ending. | *Flooded* the library.', mood: 'wide', tears: lt => lt < 0.9 ? 2 : 3, star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bits(x, 'BOOK', 800, 820, 16 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.06 })
      const w = ease.outCubic(prog(lt, 0.9, 2.2))
      if (w > 0) { x.save(); x.globalAlpha = 0.45; x.fillStyle = SKYB; x.fillRect(110, 1220 - 90 * w, 860, 90 * w); x.restore() }
      L(x, 800, 1040, 'WET FLOOR', pop01(t, P.t0 + 1.3, 0.3, 2.2), GOLD, 0.05, 40)
    } },
]

const F = makeFilm({
  id: 'r2t0626', key: 'C', accent: ACC, ending: 'callback',
  title: 'The signs | *as librarians.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve librarians. | *Zero quiet.*' },
  last: {
    text: 'Aries finally | *got shushed.*',
    draw(x, t, lt) {
      bits(x, 'MEGA', 420, 1320, 30 * pop01(t, t - lt + 0.5, 0.35, 2), { rot: -0.1 })
      bubble(x, 700, 1150, 'shh.', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 64, col: LAV, tail: 'bc' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
