// r2t0366: THE SIGNS AS… v3, BELIKE, "Cake cut unevenly? | Zodiacs be like." (~57 s vertical, signs3kit social cut, music: lofi · C)
// The format look lives in ../../signs3kit.js. Ending: callback.
//   0.0–3.6    "Cake cut unevenly? | Zodiacs *be like.*"  The twelve line up, then dive into the pip row.
//   3.6–49.2   one uneven-cake moment per sign (3.8 s each), pushed to the extreme:
//              ♈ took the big slice mid-birthday-song · ♉ got the small slice, ate the rest of the cake
//              · ♊ argued both sides with themself · ♋ gave everyone the big slice, ate the crumbs
//              · ♌ only eats the slice with their name on it · ♍ re-cut every slice with a protractor (ALL: 30°)
//              · ♎ made it fair, now everyone gets crumbs · ♏ clocked the bigger slice, noted in your chart
//              · ♐ took their slice on a three-day hike · ♑ auctioned the big slice (BIDDING OPEN)
//              · ♒ slices are a construct, brought a spoon · ♓ their frosting rose broke, full mourning
//  49.2        "One cake. | *Twelve opinions.*"  The twelve fly up into a group photo.
//  52.6        CALLBACK: "Next year? | *Virgo cuts it.*"  Virgo is back with the protractor, every slice 30°.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', SPONGE = '#f3cf86', JAM = '#e2577a', CHOC = '#8a4a2e'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
/** a side-on cake slice (wedge): sponge, jam, frosting top; w × h, pointing left */
function slice(x, cx, cy, k, { w = 200, h = 130, top = PINK, rot = 0, word = '', rose = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  const tri = (pad, col) => { x.fillStyle = col; x.beginPath(); x.moveTo(-w / 2 - pad, h / 2 + pad); x.lineTo(w / 2 + pad, h / 2 + pad); x.lineTo(w / 2 + pad, -h / 2 - pad); x.closePath(); x.fill() }
  x.fillStyle = 'rgba(6,4,18,0.4)'; x.save(); x.translate(8, 10); tri(6, 'rgba(6,4,18,0.4)'); x.restore()
  tri(6, INK); tri(0, SPONGE)
  // jam stripe across the wedge
  x.save(); x.beginPath(); x.moveTo(-w / 2, h / 2); x.lineTo(w / 2, h / 2); x.lineTo(w / 2, -h / 2); x.closePath(); x.clip()
  x.fillStyle = JAM; x.fillRect(-w / 2, h * 0.02, w, h * 0.14)
  x.restore()
  // frosting: the right edge and the slope
  x.fillStyle = INK; x.fillRect(w / 2 - 4, -h / 2 - 10, 26, h + 16)
  x.fillStyle = top; x.fillRect(w / 2, -h / 2 - 6, 18, h + 8)
  x.strokeStyle = INK; x.lineWidth = 18; x.beginPath(); x.moveTo(-w / 2, h / 2); x.lineTo(w / 2 + 10, -h / 2 - 4); x.stroke()
  x.strokeStyle = top; x.lineWidth = 10; x.beginPath(); x.moveTo(-w / 2 + 4, h / 2 - 2); x.lineTo(w / 2 + 10, -h / 2 - 4); x.stroke()
  if (word) { x.fillStyle = CREAM; x.font = `800 ${Math.round(h * 0.26)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(word, w * 0.2, h * 0.32) }
  if (rose) {   // a frosting rose on top: 1 whole, 2 snapped off
    const rx = w / 2 - 6, ry = -h / 2 - 22
    if (rose === 1) drawBits(x, ROSE, ROSE_C, rx, ry, 8)
    else { drawBits(x, ROSE, ROSE_C, rx + 46, ry + 60, 8, { rot: 1.4 }); x.fillStyle = '#5fd068'; x.fillRect(rx - 4, ry + 6, 8, 18) }
  }
  x.restore()
}
const ROSE = ['.RRRR.', 'RRWRRR', 'RWRRWR', 'RRRWRR', '.RRRR.', '..GG..']
const ROSE_C = { R: '#ff4f86', W: '#ffd0df', G: '#5fd068' }
/** a whole round cake from the side on a stand, n candles; cut = how much is missing (0–1) */
function cake(x, cx, cy, k, { w = 300, h = 170, cut = 0, candles = 3, lit = true, t = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-w / 2 - 30, h / 2 - 2, w + 60, 26); x.fillRect(-18, h / 2 + 20, 36, 50); x.fillRect(-80, h / 2 + 64, 160, 18)
  x.fillStyle = '#c9c2e6'; x.fillRect(-w / 2 - 24, h / 2 + 2, w + 48, 16); x.fillRect(-12, h / 2 + 18, 24, 48); x.fillRect(-74, h / 2 + 66, 148, 12)
  const vw = w * (1 - cut)
  if (vw > 4) {
    const l = -w / 2
    x.fillStyle = INK; x.fillRect(l - 6, -h / 2 - 6, vw + 12, h + 12)
    x.fillStyle = SPONGE; x.fillRect(l, -h / 2, vw, h)
    x.fillStyle = JAM; x.fillRect(l, -6, vw, 18)
    x.fillStyle = PINK; x.fillRect(l, -h / 2, vw, 34)
    for (let i = 0; i < vw - 20; i += 44) { x.fillStyle = PINK; x.fillRect(l + i + 8, -h / 2 + 30, 20, 18 + (i % 88 ? 8 : 0)) }
    for (let c = 0; c < candles; c++) {
      const px = l + (c + 0.5) * (vw / Math.max(1, candles))
      x.fillStyle = INK; x.fillRect(px - 10, -h / 2 - 66, 20, 64); x.fillStyle = c % 2 ? SKYB : GOLD; x.fillRect(px - 6, -h / 2 - 62, 12, 58)
      if (lit) { const f = 0.85 + 0.15 * Math.sin(t * 14 + c); x.fillStyle = '#ffb34a'; x.fillRect(px - 7, -h / 2 - 92 * f, 14, 26 * f); x.fillStyle = GOLD; x.fillRect(px - 3, -h / 2 - 84 * f, 6, 14 * f) }
    }
  }
  x.restore()
}
const CRUMB = (x, px, py, s = 14) => { x.fillStyle = INK; x.fillRect(px - 3, py - 3, s + 6, s + 6); x.fillStyle = SPONGE; x.fillRect(px, py, s, s) }
/** a pixel protractor (half disc with ticks) */
function protractor(x, cx, cy, r, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, Math.PI, 0); x.closePath(); x.fill()
  x.fillStyle = 'rgba(143,227,255,0.85)'; x.beginPath(); x.arc(0, 0, r, Math.PI, 0); x.closePath(); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.45, Math.PI, 0); x.closePath(); x.fill()
  x.strokeStyle = INK; x.lineWidth = 4
  for (let i = 0; i <= 6; i++) { const a = Math.PI + i * Math.PI / 6; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.72, Math.sin(a) * r * 0.72); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.restore()
}
/** a top-down cake cut into n equal slices (lines from the centre) */
function topCake(x, cx, cy, r, k, n = 12, p = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, 7); x.fill()
  x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, r, 0, 7); x.fill()
  x.fillStyle = '#ffd0df'; x.beginPath(); x.arc(0, 0, r * 0.55, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 5
  const m = Math.floor(n * p)
  for (let i = 0; i < m; i++) { const a = i / n * Math.PI * 2 - Math.PI / 2; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.restore()
}
const FORK = ['W.W.W', 'W.W.W', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..']
const SPOON = ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.', '..W..', '..W..', '..W..', '..W..', '..W..', '..W..']
const MOUNTAIN = ['.....W.....', '....WWW....', '...GGGGG...', '..GGGGGGG..', '.GGGGGGGGG.', 'GGGGGGGGGGG']
const BOOT = ['.BBB...', '.BBB...', '.BBB...', '.BBBBB.', 'BBBBBBB', 'KKKKKKK']
/** a little notebook page */
function ledger(x, cx, cy, k, lines, { bg = CREAM } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-142, -122, 300, 260)
  x.fillStyle = INK; x.fillRect(-154, -134, 308, 268); x.fillStyle = bg; x.fillRect(-146, -126, 292, 252)
  x.fillStyle = '#c9a6ff'; for (let i = 0; i < 4; i++) x.fillRect(-146, -70 + i * 56, 292, 3)
  x.fillStyle = RED; x.fillRect(-110, -126, 4, 252)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, -96, -94 + i * 56))
  x.restore()
}

const CAMEOS = [
  { sign: 'aries', cap: 'Took the big slice. | *Mid-birthday song.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', star: { x: -200 }, hops: [0.5, 0.9],
    front(x, t, lt, P) {
      cake(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 260, h: 150, cut: lt > 0.9 ? 0.45 : 0, candles: 3, t })
      notes(x, t, 780, 700, { n: 4, cell: 7, alpha: clamp(lt * 2) * (lt > 0.9 ? 0.4 : 1) })
      slice(x, 470, 690, pop01(t, P.t0 + 1.0, 0.3, 2.2), { w: 150, h: 100, rot: -0.2 })
      bubble(x, 760, 600, 'happy birth—', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bc' })
      L(x, 800, 1150, 'MINE', pop01(t, P.t0 + 1.3, 0.3, 2.4), RED, -0.08, 44, BONE)
    } },
  { sign: 'taurus', cap: 'Got the small slice. | *Ate the rest.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const gone = ease.inOutCubic(prog(lt, 0.6, 1.4))
      cake(x, 800, 880, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 150, cut: 0.2 + 0.8 * gone, candles: 0 })
      slice(x, 560, 1110, pop01(t, P.t0 + 0.3, 0.3, 2), { w: 60, h: 40 })
      drawBits(x, FORK, { W: '#d9d4ee' }, 900, 700, 14 * pop01(t, P.t0 + 0.6, 0.3, 2), { rot: 0.4 })
      if (gone > 0.95) for (let i = 0; i < 5; i++) CRUMB(x, 700 + i * 46, 950 - (i % 2) * 14, 10)
      L(x, 800, 620, gone > 0.95 ? 'CAKE: GONE' : 'CAKE: MOSTLY LEFT', pop01(t, P.t0 + 0.5, 0.3, 2.4), GOLD, 0.04)
    } },
  { sign: 'gemini', cap: 'Argued both sides. | *With themself.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wink' : 'squint', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: { x: 0, y: 40 },
    front(x, t, lt, P) {
      const ph = Math.floor(lt * 2.5) % 2
      bubble(x, 300, 640, "it's FINE.", pop01(t, P.t0 + 0.3, 0.25, 2.2) * (ph ? 0.85 : 1), { size: 42, col: MINT, tail: 'br' })
      bubble(x, 780, 640, "it's NOT!", pop01(t, P.t0 + 0.7, 0.25, 2.2) * (ph ? 1 : 0.85), { size: 42, col: PINK, tail: 'bl' })
      slice(x, 260, 1080, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 120, h: 80 })
      slice(x, 820, 1080, pop01(t, P.t0 + 0.4, 0.3, 2), { w: 200, h: 120 })
    } },
  { sign: 'cancer', cap: 'Gave everyone the big slice. | *Ate the crumbs.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) slice(x, 700 + i * 110, 700 + i * 30, pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2.2), { w: 140, h: 100, rot: -0.1 + i * 0.08 })
      const pk = pop01(t, P.t0 + 1.0, 0.3, 2)
      if (pk > 0.01) { x.save(); x.translate(780, 1020); x.scale(pk, pk); x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 44, 0, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 0, 140, 36, 0, 0, 7); x.fill(); x.restore()
        for (let i = 0; i < 3; i++) CRUMB(x, 740 + i * 30, 1008 + (i % 2) * 8, 10) }
      bubble(x, 520, 600, 'you take it!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, tail: 'bl' })
      L(x, 780, 1140, 'CRUMBS: ALL MINE', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT)
    } },
  { sign: 'leo', cap: 'Only eats the slice | *with their name.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wink', star: { x: -200 }, hops: [1.3],
    front(x, t, lt, P) {
      slice(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 300, h: 190, word: 'LEO', top: GOLD })
      sparkles(x, t, 790, 880, P.t0 + 0.6, 7, 190, 0.3)
      L(x, 790, 640, 'RESERVED: ♌︎', pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 36)
    } },
  { sign: 'virgo', cap: 'Re-cut every slice. | *With a protractor.*', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      topCake(x, 790, 900, 160, pop01(t, P.t0 + 0.2, 0.35, 2), 12, clamp((lt - 0.4) / 1.0))
      protractor(x, 790, 720, 130, pop01(t, P.t0 + 0.4, 0.3, 2), -0.05)
      L(x, 790, 1130, 'ALL: 30°', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, -0.05, 44)
    } },
  { sign: 'libra', cap: 'Made it fair. | Now *everyone gets crumbs.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 1], star: { x: -200 },
    front(x, t, lt, P) {
      const n = Math.min(12, Math.floor(clamp((lt - 0.3) / 1.0) * 12))
      for (let i = 0; i < n; i++) CRUMB(x, 650 + (i % 4) * 80, 820 + Math.floor(i / 4) * 80, 16)
      // a little balance scale above
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(790, 660); x.scale(k, k); x.fillStyle = INK; x.fillRect(-8, -40, 16, 80); x.fillRect(-140, -46, 280, 14); x.fillStyle = GOLD; x.fillRect(-4, -36, 8, 72); x.fillRect(-136, -42, 272, 6)
        for (const s of [-1, 1]) { x.fillStyle = INK; x.fillRect(s * 120 - 50, 0, 100, 14); x.fillStyle = GOLD; x.fillRect(s * 120 - 46, 2, 92, 8) } x.restore() }
      L(x, 790, 1130, 'EVERYONE: 1 CRUMB', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV)
    } },
  { sign: 'scorpio', cap: 'Clocked the bigger slice. | *Will never forget.*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      ledger(x, 790, 820, pop01(t, P.t0 + 0.2, 0.35, 2), ['THE CAKE', 'INCIDENT:', 'logged ✓', ''])
      L(x, 790, 1090, 'NOTED IN YOUR CHART', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, -0.04, 28, BONE)
    } },
  { sign: 'sagittarius', cap: 'Took their slice | *on a three-day hike.*', mood: 'sparkle', star: { x: -200 }, hops: [0.6, 1.2, 1.8],
    back(x, t, lt, P) {
      drawBits(x, MOUNTAIN, { W: '#ffffff', G: '#5a8f6a' }, 800, 860, 34 * pop01(t, P.t0 + 0.2, 0.35, 2))
    },
    front(x, t, lt, P) {
      slice(x, 820, 620, pop01(t, P.t0 + 0.6, 0.3, 2), { w: 120, h: 80, rot: -0.15 })
      drawBits(x, BOOT, { B: '#a65a37', K: INK }, 470, 1110, 12 * pop01(t, P.t0 + 0.9, 0.3, 2))
      const d = 1 + Math.min(2, Math.floor(Math.max(0, lt - 1.0) * 2.5))
      L(x, 820, 1120, `TRAIL DAY ${d}`, pop01(t, P.t0 + 1.0, 0.3, 2.4), GOLD, 0.05, 40)
    } },
  { sign: 'capricorn', cap: 'Auctioned the big slice. | *Opening bid: high.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      slice(x, 800, 890, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 240, h: 150 })
      const k = pop01(t, P.t0 + 0.6, 0.3, 2)
      if (k > 0.01) { x.save(); x.translate(860, 660); x.rotate(0.25 * Math.sin(Math.max(0, lt - 1.2) * 12) * (lt > 1.2 && lt < 1.8 ? 1 : 0)); x.scale(k, k)
        x.fillStyle = INK; x.fillRect(-12, -10, 24, 140); x.fillRect(-70, -60, 140, 70); x.fillStyle = '#a65a37'; x.fillRect(-6, -4, 12, 130); x.fillRect(-64, -54, 128, 58); x.restore() }
      L(x, 780, 1120, 'BIDDING OPEN', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 38)
      bubble(x, 500, 610, 'SOLD!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 44, tail: 'bl', col: GOLD })
    } },
  { sign: 'aquarius', cap: 'Slices are a construct. | *Brought a spoon.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -200 },
    front(x, t, lt, P) {
      cake(x, 800, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 280, h: 150, candles: 0 })
      const k = pop01(t, P.t0 + 0.7, 0.3, 2), dig = Math.max(0, Math.sin((lt - 0.9) * 8)) * (lt > 0.9 ? 1 : 0)
      drawBits(x, SPOON, { W: '#d9d4ee' }, 800, 720 + dig * 50, 22 * k, { rot: 0.1 })
      L(x, 800, 1150, 'NO SLICES. ONLY SPOON.', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.03, 28)
    } },
  { sign: 'pisces', cap: 'Their frosting rose broke. | *Full mourning.*', mood: lt => lt > 0.9 ? 'wide' : 'happy', look: [1, 0], tears: lt => lt > 0.9 ? 3 : 1, star: { x: -200 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      slice(x, 800, 920, pop01(t, P.t0 + 0.2, 0.35, 2), { w: 250, h: 160, rose: lt > 0.9 ? 2 : 1 })
      L(x, 790, 650, 'RIP, LITTLE ROSE', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.04, 34)
    } },
]
for (const c of CAMEOS) if (!c.keyCue) delete c.keyCue

const F = makeFilm({
  id: 'r2t0366', key: 'C', accent: PINK, ending: 'callback',
  title: 'Cake cut unevenly? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One cake. | *Twelve opinions.*' },
  last: {
    text: 'Next year? | *Virgo cuts it.*',
    draw(x, t, lt) {
      const t0 = t - lt
      topCake(x, 720, 1120, 190, pop01(t, t0 + 0.3, 0.4, 2), 12, clamp((lt - 0.8) / 1.0))
      protractor(x, 720, 920, 150, pop01(t, t0 + 0.6, 0.3, 2), 0.05)
      const k = pop01(t, t0 + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'virgo', 330, 1180, 230 * k, { mood: lt > 1.8 ? 'sparkle' : 'squint', look: [1, 0], seed: 40, hops: [t0 + 1.9] })
      label(x, 760, 1380, 'ALL: 30°', pop01(t, t0 + 1.9, 0.3, 2.4), { size: 44, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
      sparkles(x, t, 720, 1120, t0 + 1.9, 8, 220, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
