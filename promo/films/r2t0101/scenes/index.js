// r2t0101: THE SIGNS AS… v3, BELIKE, "Phone down? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Phone down? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one attempt per sign (3.8 s each), pushed to the extreme:
//              ♈ put it down, picked it up 0.4 s later · ♉ phone-free dinner, forty food pics · ♊ put one phone down,
//              picked up the other · ♋ can't: what if Mom texts? · ♌ not mid-livestream (eating soup, live)
//              · ♍ scheduled phone-free time, colour-coded · ♎ polled the group chat, it tied · ♏ face down, unless
//              it's a match · ♐ threw it in a lake, swam after it · ♑ phone down, laptop up · ♒ built a phone jail,
//              broke it out · ♓ put it down, missed it, cried
//  49.2        "Screen time? | *Don't ask.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "New record: | Aries lasted *0.5 seconds.*"  Aries is back with the stopwatch.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', WOOD = '#c98f2a', WATER = '#3d8fd8'

// ── props
// a phone (screen up, or its back when face down); fn draws on the screen in phone-local coords (216 × 316 screen)
function phone(x, cx, cy, k, { rot = 0, back = false, s = 1, fn } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-118, -178, 252, 372)
  x.fillStyle = INK; x.fillRect(-130, -190, 260, 380); x.fillStyle = back ? '#3d3470' : '#2a2350'; x.fillRect(-120, -180, 240, 360)
  if (back) { x.fillStyle = INK; x.fillRect(-90, -150, 60, 60); x.fillStyle = '#140c30'; x.beginPath(); x.arc(-60, -120, 20, 0, 7); x.fill() }
  else { x.fillStyle = '#140c30'; x.fillRect(-108, -158, 216, 316); if (fn) fn(x) }
  x.restore()
}
function stopwatch(x, cx, cy, k, t, col = GOLD) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-26, -150, 52, 40); x.fillStyle = col; x.fillRect(-18, -144, 36, 28)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 122, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.arc(0, 0, 108, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 88 - 4, Math.sin(a) * 88 - 4, 8, 8) }
  const a = t * 9 - Math.PI / 2
  x.strokeStyle = RED; x.lineWidth = 8; x.lineCap = 'round'; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 82, Math.sin(a) * 82); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 10, 0, 7); x.fill()
  x.restore()
}
const BURGER = ['..BBBBB..', '.BBWBBWB.', 'GGGGGGGGG', 'MMMMMMMMM', '.BBBBBBB.']
const BURGER_C = { B: '#e8a24a', W: '#fff4e2', G: '#5fd068', M: '#8a4a2e' }
function plate(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 170, 56, 0, 0, 7); x.fill()
  x.fillStyle = '#fff4e2'; x.beginPath(); x.ellipse(0, 0, 160, 48, 0, 0, 7); x.fill()
  x.restore()
  drawBits(x, BURGER, BURGER_C, cx, cy - 40 * k, 18 * k)
}
function screenText(x, lines, { y = 0, size = 28, col = BONE, bg = null } = {}) {
  x.font = `800 ${size}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (bg) { x.fillStyle = bg; x.fillRect(-96, y + i * (size + 18) - size / 2 - 8, 192, size + 16) } x.fillStyle = col; x.fillText(l, 0, y + i * (size + 18)) })
}

const CAMEOS = [
  { sign: 'aries', cap: 'Put it down. | Picked it up *0.4s later.*', mood: lt => lt > 0.9 ? 'sparkle' : 'squint', star: { x: -170 }, hops: [0.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'ok. done.', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 42, tail: 'bl' })
      const down = ease.inOutCubic(prog(lt, 0.3, 0.5)) - ease.outBack(prog(lt, 0.65, 0.85))
      phone(x, lerp(560, 800, clamp(down)), lerp(880, 1040, clamp(down)), pop01(t, P.t0 + 0.1, 0.3, 2), { rot: lerp(0.2, 1.4, clamp(down)), s: 0.7 })
      label(x, 790, 820, 'RECORD: 0.4 S', pop01(t, P.t0 + 1.25, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Phone-free dinner. | *Forty* food pics.', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    back(x, t, lt, P) { plate(x, 790, 1070, pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      phone(x, 790, 780, pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.08, s: 0.75, fn(x) { drawBits(x, BURGER, BURGER_C, 0, -10, 16) } })
      const f = (lt * 5) % 1
      if (lt > 0.6 && f < 0.25) { x.save(); x.globalAlpha = 0.6 * (1 - f / 0.25); x.fillStyle = '#ffffff'; x.beginPath(); x.arc(790, 780, 190, 0, 7); x.fill(); x.restore() }
      label(x, 790, 1170, `PICS: ${Math.min(40, Math.max(1, Math.floor((lt - 0.6) * 25)))}`, pop01(t, P.t0 + 0.8, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'gemini', cap: 'Put one phone down. | Picked up *the other.*', mood: lt => Math.floor(lt * 2) % 2 ? 'wink' : 'sparkle', look: lt => [lt > 1.0 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), sw = ease.inOutCubic(prog(lt, 0.6, 1.1))
      phone(x, 720, lerp(860, 1060, sw), k, { rot: lerp(0.1, 1.5, sw), s: 0.6, fn(x) { screenText(x, ['#1'], { size: 70, col: GOLD }) } })
      phone(x, 860, lerp(1060, 820, sw), k * sw, { rot: lerp(1.5, -0.1, sw), s: 0.6, fn(x) { screenText(x, ['#2'], { size: 70, col: MINT }) } })
      label(x, 790, 640, 'PHONE #2: ON', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Can’t. What if | *Mom texts?*', mood: lt => lt > 1.4 ? 'heart' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      phone(x, 790, 900, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 0.06, s: 0.95, fn(x) {
        if (lt > 1.2) { x.fillStyle = PINK; x.fillRect(-96, -60, 192, 120); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MOM:', 0, -24); x.fillText('"ok"', 0, 22) }
      } })
      bubble(x, 780, 600, 'just in case', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'bl' })
      if (lt > 1.2) hearts(x, t, 790, 860, P.t0 + 1.2 * 1.29, { n: 4, life: 1.6, spread: 180, cell: 7, seed: 4 })
    } },
  { sign: 'leo', cap: 'Phone down? | Not *mid-livestream.*', mood: 'sparkle', look: [1, 0], star: { x: -170 }, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) { x.fillStyle = INK; x.fillRect(782, 1000, 16, 200 * k); x.fillRect(740, 1180, 100, 14 * k) }
      phone(x, 790, 850, k, { s: 0.9, fn(x) { x.fillStyle = RED; x.fillRect(-90, -140, 100, 44); x.fillStyle = '#fff'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('LIVE', -40, -117); screenText(x, ['me,', 'eating', 'soup'], { y: -20, size: 44 }) } })
      hearts(x, t, 870, 820, P.t0 + 0.8, { n: 6, life: 2.2, spread: 120, cell: 7, seed: 6 })
      label(x, 790, 620, 'VIEWERS: 3', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: '#ffb34a', rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Scheduled phone-free time. | *Colour-coded.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      ;[['3:00 PHONE DOWN', MINT], ['3:05 STRETCH', SKYB], ['3:06 CHECK MATCHES', PINK], ['3:07 PHONE DOWN', MINT]].forEach(([s, c], i) =>
        label(x, 780, 650 + i * 120, s, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2.4), { size: 28, bg: c, rot: i % 2 ? 0.04 : -0.04, font: MONO, weight: 700 }))
    } },
  { sign: 'libra', cap: 'Polled the group chat. | It *tied.*', mood: lt => lt > 1.6 ? 'wide' : 'happy', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-190, -150, 380, 300); x.fillStyle = BONE; x.fillRect(-180, -140, 360, 280)
        x.fillStyle = INK; x.font = `800 32px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('put it down?', 0, -95)
        const g = ease.outCubic(prog(lt, 0.5, 1.4))
        ;[['YES', MINT, -20], ['NO', PINK, 70]].forEach(([s, c, y]) => { x.fillStyle = '#d9d0c0'; x.fillRect(-150, y - 26, 300, 52); x.fillStyle = c; x.fillRect(-150, y - 26, 150 * g, 52); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'left'; x.fillText(`${s} ${Math.round(50 * g)}%`, -136, y + 2) })
        x.restore()
      }
      label(x, 790, 1110, 'TIED. AGAIN.', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 36, bg: '#ff8fb1', rot: -0.04 })
    } },
  { sign: 'scorpio', cap: 'Face down. Unless | it’s *a match.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), flip = prog(lt, 0.9, 1.2)
      const buzz = lt > 0.6 && lt < 0.9 ? Math.sin(t * 80) * 8 : 0
      x.save(); x.translate(790 + buzz, 900); x.scale(Math.abs(Math.cos(flip * Math.PI)) + 0.02, 1); x.translate(-790, -900)
      phone(x, 790, 900, k, { s: 0.95, back: flip < 0.5, fn(x) { x.fillStyle = PINK; x.fillRect(-104, -50, 208, 100); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('✦ NEW MATCH', 0, 2) } })
      x.restore()
      bubble(x, 800, 620, 'bzz', pop01(t, P.t0 + 0.75, 0.2, 2.2) * (lt < 1.3 ? 1 : 0), { size: 40, tail: 'bc' })
    } },
  { sign: 'sagittarius', cap: 'Threw it in a lake. | *Swam after it.*', mood: lt => lt > 1.2 ? 'wide' : 'sparkle', star: { x: 150 }, hops: [0.4, 1.3],
    back(x, t, lt, P) {
      x.fillStyle = INK; x.fillRect(150, 1090, 380, 110); x.fillStyle = WATER; x.fillRect(158, 1098, 364, 100)
      x.fillStyle = 'rgba(255,255,255,0.5)'; for (let i = 0; i < 5; i++) x.fillRect(180 + ((i * 77 + t * 40) % 320), 1120 + (i % 2) * 30, 40, 6)
    },
    front(x, t, lt, P) {
      const p = prog(lt, 0.35, 1.0)
      if (p > 0 && p < 1) phone(x, lerp(620, 330, p), 900 - Math.sin(Math.PI * p) * 300 + p * 180, 1, { rot: p * 6, s: 0.4 })
      if (lt > 1.0 && lt < 1.6) { const s = prog(lt, 1.0, 1.6); x.fillStyle = BONE; for (let i = 0; i < 6; i++) x.fillRect(330 + Math.cos(i) * 80 * s - 8, 1090 - Math.sin(i * 0.5 + 0.4) * 120 * s, 16, 16) }
      label(x, 330, 760, 'BRB. SWIMMING.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: 'capricorn', cap: 'Phone down. | *Laptop up.*', mood: lt => lt < 1.0 ? 'neutral' : 'happy', look: [-1, 0], star: { x: 150 },
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      if (k <= 0.01) return
      x.save(); x.translate(320, 900); x.scale(k, k)
      x.fillStyle = INK; x.fillRect(-180, -160, 360, 240); x.fillStyle = '#9aa5c4'; x.fillRect(-170, -150, 340, 220)
      x.fillStyle = '#140c30'; x.fillRect(-156, -136, 312, 192)
      const BARS = ['#6fc3ff', '#2fc79a', '#ffd23a', '#ff8fb1']
      for (let i = 0; i < 4; i++) { const h = 40 + i * 32, g = ease.outCubic(prog(lt, 0.9 + i * 0.15, 1.2 + i * 0.15)); x.fillStyle = BARS[i]; x.fillRect(-110 + i * 60, 40 - h * g, 40, h * g) }
      x.fillStyle = INK; x.fillRect(-210, 80, 420, 30); x.fillStyle = '#9aa5c4'; x.fillRect(-200, 84, 400, 20)
      x.restore()
    },
    front(x, t, lt, P) {
      const d = ease.inCubic(prog(lt, 0.15, 0.55))
      if (d < 1) phone(x, 320, lerp(860, 1200, d), pop01(t, P.t0 + 0.05, 0.25, 2), { s: 0.5 })
      label(x, 320, 1110, 'BREAK: OVER', pop01(t, P.t0 + 1.7, 0.3, 2.4), { size: 32, bg: '#2fc79a', rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'aquarius', cap: 'Built a phone jail. | *Broke it out.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.3, 2), esc = ease.outCubic(prog(lt, 1.2, 1.8))
      phone(x, 790 + esc * 40, 900 - esc * 260, k, { s: 0.55, rot: esc * 0.3, fn(x) { screenText(x, ['FREE!'], { size: 46, col: MINT }) } })
      if (k > 0.01) {
        x.save(); x.globalAlpha = k
        x.fillStyle = INK; x.fillRect(650, 740, 280, 24); x.fillRect(650, 1060, 280, 24)
        const door = ease.inOutCubic(prog(lt, 0.9, 1.2))
        for (let i = 0; i < 6; i++) { const bx = 660 + i * 50; if (i >= 2 && i <= 3) { x.save(); x.translate(bx, 760); x.rotate(-door * 1.2); x.fillRect(0, 0, 14, 300); x.restore() } else x.fillRect(bx, 760, 14, 300) }
        x.restore()
      }
      label(x, 790, 1170, 'JAILBREAK', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: SKYB, rot: 0.04 })
    } },
  { sign: 'pisces', cap: 'Put it down. | Missed it. *Cried.*', mood: lt => lt < 0.8 ? 'happy' : 'wide', tears: lt => lt < 0.8 ? 1 : 3, star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 800, 1020, pop01(t, P.t0 + 0.15, 0.3, 2), { rot: 1.45, s: 0.6 })
      bubble(x, 790, 680, 'i miss you', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 42, col: LAV, tail: 'bl' })
      label(x, 790, 850, 'APART: 6 SEC', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0101', key: 'C', accent: SKYB, ending: 'callback',
  title: 'Phone down? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Screen time? | *Don’t ask.*' },
  last: {
    text: 'New record: | Aries lasted *0.5 seconds.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'aries', 380, 1100, 260 * k, { mood: lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], seed: 40, hops: [t - lt + 1.6] })
      stopwatch(x, 730, 1060, pop01(t, t - lt + 0.3, 0.35, 2), t)
      label(x, 730, 1270, 'NEW RECORD', pop01(t, t - lt + 1.4, 0.3, 2.4), { size: 36, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
