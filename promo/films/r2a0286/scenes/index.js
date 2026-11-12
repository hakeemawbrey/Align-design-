// r2a0286: star_advice, ADVICE SOLO, "Aries, here's your | *Sunday reset.*" (~51 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way: nine Sunday moments for an always-on Aries, each a relatable truth + a warm reframe. Ending: callback.
//   0.0–3.6    "Aries, here's your | *Sunday reset.*"
//   3.6–37.8   nine cards: forty things on the list, pick three · alarm off, sleep isn't losing · inbox done by noon, close it
//              · burnt the first pancake, flip the next · watered the plant, it grows at its own pace (like you)
//              · a match asks for a slow walk, say yes · skipped the gym, rest days count · ten minutes of nothing (hard)
//              · Monday's coming, you're ready
//  37.8        "Fast heart. | *Slow Sunday.*"
//  41.2        callback: "Next pancake? | *Golden.*" — the burnt pancake from card 4 comes back as a perfect stack.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CORAL = '#ff6b5a', RED = '#e23d4e', BROWN = '#c98f5a'

// ── props
function sheet(x, cx, cy, k, lt, { w = 330, h = 420, head = '', headCol = MINT, rows = [], at = 0.4, gap = 0.18, rot = 0.04, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = '#fff8ea'; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'left'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2 + 16, -h / 2 + 18, w - 32, 46); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText(head, 0, -h / 2 + 42); x.textAlign = 'left' }
  rows.forEach((r, i) => {
    const a = clamp((lt - at - i * gap) / 0.15)
    if (a <= 0) return
    x.globalAlpha = a
    const [txt, col] = Array.isArray(r) ? r : [r, INK]
    x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + 92 + i * (size + 12))
    x.globalAlpha = 1
  })
  x.restore()
}

/** an alarm clock with its bell switched off */
function alarm(x, t, cx, cy, k, off) {
  if (k <= 0.01) return
  const shake = off ? 0 : Math.sin(t * 60) * 0.08
  x.save(); x.translate(cx, cy); x.rotate(shake); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, 100, 40, 40); x.fillRect(70, 100, 40, 40)
  x.beginPath(); x.arc(-95, -110, 52, 0, Math.PI * 2); x.arc(95, -110, 52, 0, Math.PI * 2); x.fill()
  x.fillStyle = GOLD; x.beginPath(); x.arc(-95, -110, 44, 0, Math.PI * 2); x.arc(95, -110, 44, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 140, 0, Math.PI * 2); x.fill()
  x.fillStyle = CORAL; x.beginPath(); x.arc(0, 0, 130, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, 104, 0, Math.PI * 2); x.fill()
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 10
  x.beginPath(); x.moveTo(0, 0); x.lineTo(0, -70); x.stroke(); x.beginPath(); x.moveTo(0, 0); x.lineTo(50, 20); x.stroke()
  x.restore()
}

/** an inbox laptop whose lid closes */
function laptop(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  const shut = ease.inOutCubic(prog(lt, 1.5, 1.9))
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, 90, 380, 34); x.fillStyle = '#9aa5c4'; x.fillRect(-182, 96, 364, 22)
  const h = lerp(260, 16, shut)
  x.fillStyle = INK; x.fillRect(-160, 92 - h, 320, h); x.fillStyle = '#2a2350'; x.fillRect(-152, 98 - h, 304, h - 10)
  if (shut < 0.4) {
    x.globalAlpha = 1 - shut / 0.4
    x.fillStyle = '#140c30'; x.fillRect(-138, 112 - h, 276, h - 38)
    x.fillStyle = MINT; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('INBOX: 0', 0, 92 - h / 2 - 20)
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.fillText('(it’s sunday)', 0, 92 - h / 2 + 24)
  }
  x.restore()
}

const PANCAKE_C = { P: '#f2b45c', p: '#d48a3a', B: '#5a3a24', b: '#3a2416', Y: '#ffe08a', S: '#fff4c2' }
function pancakes(x, cx, cy, cell, k, burnt, n = 3, syrup = false) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // plate
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 18, 9.5 * cell + 6, 2.2 * cell + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.ellipse(0, 18, 9.5 * cell, 2.2 * cell, 0, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < n; i++) {
    const y = -i * 2.2 * cell, dark = burnt && i === n - 1
    x.fillStyle = INK; x.fillRect(-7 * cell - 5, y - 1.2 * cell - 5, 14 * cell + 10, 2 * cell + 10)
    x.fillStyle = dark ? '#3a2416' : '#f2b45c'; x.fillRect(-7 * cell, y - 1.2 * cell, 14 * cell, 2 * cell)
    x.fillStyle = dark ? '#5a3a24' : '#d48a3a'; x.fillRect(-7 * cell, y + 0.3 * cell, 14 * cell, 0.5 * cell)
  }
  const top = -(n - 1) * 2.2 * cell - 1.2 * cell
  if (syrup) { x.fillStyle = '#c96a2a'; x.fillRect(-5 * cell, top, 10 * cell, 0.8 * cell); x.fillRect(-5 * cell, top, cell, 2.6 * cell); x.fillRect(3 * cell, top, cell, 3.4 * cell) }
  x.fillStyle = INK; x.fillRect(-1.6 * cell - 3, top - 1.4 * cell - 3, 3.2 * cell + 6, 1.4 * cell + 6)
  x.fillStyle = '#ffe08a'; x.fillRect(-1.6 * cell, top - 1.4 * cell, 3.2 * cell, 1.4 * cell)
  x.restore()
}

const PLANT = ['....G....', '...GGG...', '..GGgGG..', '.GGG.GGG.', '..GG.GG..', '....G....', '.KKKKKKK.', '.KRRRRRK.', '..KRRRK..', '..KKKKK..']
const DUMBBELL = ['KK.........KK', 'KKK.......KKK', 'KKKMMMMMMMKKK', 'KKK.......KKK', 'KK.........KK']

/** a phone with a match chat */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
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

/** a kitchen timer counting down from 10:00 */
function timer(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -90, 300, 180); x.fillStyle = MINT; x.fillRect(-140, -80, 280, 160)
  x.fillStyle = '#140c30'; x.fillRect(-120, -60, 240, 90)
  const s = Math.max(0, Math.floor((lt - 0.4) * 1.6))
  const left = 600 - s, mm = Math.floor(left / 60), ss = left % 60
  x.fillStyle = MINT; x.font = `700 62px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`, 0, -14)
  x.fillStyle = INK; x.fillRect(-30, 46, 60, 18)
  x.restore()
}

/** a calendar page with a gold star sticker */
function page(x, cx, cy, k, sk) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -142, 260, 300)
  x.fillStyle = INK; x.fillRect(-134, -154, 268, 308); x.fillStyle = '#fff8ea'; x.fillRect(-126, -146, 252, 292)
  x.fillStyle = CORAL; x.fillRect(-126, -146, 252, 70)
  x.fillStyle = '#fff8ea'; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MONDAY', 0, -110)
  x.fillStyle = INK; x.font = `800 130px ${INTER}`; x.fillText('1', 0, 30)
  x.restore()
  if (sk > 0.01) label(x, cx + 110, cy + 120, '★', sk, { size: 60, bg: GOLD, rot: 0.2 })
}

const S = 'aries'
const CAMEOS = [
  { sign: S, cap: 'Forty things on the list? | Pick *three.*', mood: lt => lt > 1.6 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const ROWS = ['run 10k', 'learn piano', 'call mum', 'start a band', 'stretch', 'nap']
      const keep = [2, 4, 5]
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { head: 'SUNDAY TO-DO', headCol: CORAL, h: 400, size: 30, gap: 0.1, at: 0.35,
        rows: ROWS.map((r, i) => lt > 1.4 && !keep.includes(i) ? [r, '#c9bfae'] : [r, INK]) })
      if (lt > 1.4) {
        x.save(); x.translate(790, 860); x.rotate(0.04); x.strokeStyle = MINT; x.lineWidth = 6
        for (const i of keep) { x.beginPath(); x.ellipse(-50, -200 + 92 + i * 42, 120, 24, 0, 0, Math.PI * 2); x.stroke() }
        x.restore()
      }
      label(x, 790, 1120, '3 IS PLENTY', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Alarm off today. | Sleep is *not losing.*', mood: 'sleepy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      alarm(x, t, 790, 840, pop01(t, P.t0 + 0.2, 0.3, 2) * 0.85, lt > 0.9)
      label(x, 790, 1110, lt > 0.9 ? 'ALARM: OFF' : 'ALARM: 6:00', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 34, bg: lt > 0.9 ? LAV : CORAL, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Inbox done by noon? | *Close the laptop.*', mood: lt => lt > 1.6 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.7],
    front(x, t, lt, P) {
      laptop(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sparkles(x, t, 790, 900, P.t0 + 1.9, 6, 150, 0.5)
      label(x, 790, 1110, 'CLOSED ✓', pop01(t, P.t0 + 1.9, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Burnt the first pancake? | *Flip* the next one.', mood: lt => lt > 1.5 ? 'happy' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      pancakes(x, 790, 980, 19, pop01(t, P.t0 + 0.2, 0.3, 2), lt < 1.4, lt < 1.4 ? 1 : 2)
      if (lt < 1.4) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#9aa5c4'; for (let i = 0; i < 3; i++) x.fillRect(740 + i * 40, 880 - ((lt * 80 + i * 30) % 90), 14, 26); x.restore() }
      bubble(x, 770, 650, lt < 1.4 ? 'oops.' : 'better!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 50, tail: 'bl' })
    } },
  { sign: S, cap: 'Plants grow slowly. | So do you, *and that’s ok.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const g = 0.75 + 0.25 * ease.outCubic(prog(lt, 0.6, 2.2))
      drawBits(x, PLANT, { G: '#5fd068', g: '#3f9e4a', K: INK, R: '#c96a3a' }, 790, 860, 32 * pop01(t, P.t0 + 0.2, 0.3, 2), { sy: g })
      label(x, 790, 1120, 'GROWING… AT ITS PACE', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 28, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'A match asks for a slow walk? | *Say yes.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), { head: 'NEW MATCH', headCol: PINK, lines: [
        ['slow walk?', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['no racing :)', BONE, pop01(t, P.t0 + 0.8, 0.25, 2.2)],
        ['…ok. yes.', CORAL, pop01(t, P.t0 + 1.4, 0.25, 2.2), true],
      ] })
      hearts(x, t, 540, 820, P.t0 + 1.6, { n: 4, life: 1.4, spread: 100, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Skipped the gym? | *Rest days* count.', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      drawBits(x, DUMBBELL, { K: INK, M: '#9aa5c4' }, 790, 960, 28 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.08, outline: '#2a2350' })
      if (lt > 0.6) bubble(x, 830, 820, 'z z z', pop01(t, P.t0 + 0.6, 0.25, 2), { size: 40, col: LAV, tail: 'bl' })
      label(x, 790, 680, 'REST DAY ✓', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Ten minutes of nothing. | You’ve *got this.*', mood: lt => lt > 1.7 ? 'happy' : (Math.floor(lt * 5) % 2 ? 'squint' : 'wide'), look: lt => [Math.floor(lt * 4) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      timer(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 1080, 'DOING NOTHING (HARD)', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 28, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Monday’s coming. | You’re *ready* for it.', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.3, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      page(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), pop01(t, P.t0 + 1.2, 0.3, 2.6))
      sparkles(x, t, 890, 740, P.t0 + 1.25, 6, 90, 0.3)
      label(x, 760, 1150, 'RESET: DONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: CORAL, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0286', key: 'D', accent: CORAL, solo: 'aries', ending: 'callback',
  title: 'Aries, here’s your | *Sunday reset.*',
  cameos: CAMEOS,
  group: { cap: 'Fast heart. | *Slow Sunday.*', mood: 'heart' },
  last: {
    text: 'Next pancake? | *Golden.*',
    draw(x, t, lt) {
      const t0 = t - lt
      pancakes(x, 540, 1160, 20, pop01(t, t0 + 0.6, 0.4, 2), false, 4, true)
      sparkles(x, t, 540, 1000, t0 + 1.0, 8, 220, 0.2)
      hearts(x, t, 540, 960, t0 + 1.2, { n: 6, life: 1.8, spread: 320, cell: 7, seed: 6 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
