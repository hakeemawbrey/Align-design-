// srhey (20 s vertical Align ad, Star Talk Remix of "Stuck on 'hey'.") · story 0–15.6, then the shared end card.
//   0.00–4.40  "Stuck on | *“hey.”*"  A phone in the sky loops the same chat (hey / hey / how's your week / good u / good),
//              faster and faster, the DAY counter racing 1 → 41. THE STARS' gold star watches beside it: follows each bubble,
//              rolls its eyes, then dozes off (z's). A cobweb grows over the chat; a pixel spider drops in on a thread.
//   4.40       the loop sticks on "hey" · "Seen" · the star jolts awake.
//   4.49–7.85  "Day 41 of | *“hey.”*"  THE STARS: "babe. that's not a chat. it's a screensaver." The phone dims and a "hey"
//              bounces round the black screen like an old screensaver, changing colour; the star's eyes track it… 7.45 it
//              hits the corner EXACTLY. Glitter, starry eyes, a tiny hop. (It's the little things.)
//   7.90–10.6  "Ask a *real* | question."  THE STARS: "here. ask them something real." The star deals a talk card into the
//              chat (card back → flip → "What's your comfort meal?"); the web blows away, the spider tumbles off. Real
//              answers pop in (soup, 2 am grilled cheese), typing dots, "ok wait. defend the 2 am part". Heart-eyes.
//   10.95      card cut (flip).
//   11.05–15.4 "Skip to the | *good part.*"  The chat keeps going (long messages, laughing), the star wink-hops; hearts.
//              Everything pops out by 15.45; the end card takes over at 15.6.
// One canvas (sky + phone + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

// ── the timeline
const T = {
  h0: 0.12, h0Out: [4.3, 4.48],
  starIn: 0.22, roll: [1.85, 2.75], doze: 2.85, web: [2.3, 3.5], spider: 3.55,
  stop: 4.36, seen: 4.46, jolt: 4.46,
  h1: BEAT(7) + 0.05, h1Out: [7.7, 7.86], open: 4.55, l1: 4.75,
  dim: [5.55, 6.0], dvd: 6.05, corner: 7.45,
  h2: 7.92, h2Out: [10.55, 10.72], l2: 7.95,
  deal: [8.75, 9.2], flip: [9.08, 9.42], gust: 9.42,
  a1: 9.75, a2: 10.1, dots: 10.35, a3: 10.7, close: 10.62,
  cut: 10.95,
  h3: 11.05, h3Land: 11.55, a4: 12.2, a5: 12.95, a6: 13.75, wink: [13.2, 13.7], out: [15.05, 15.45],
}
const SPEAK = 'THE STARS'
const CPS = 30
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "babe. that's not a chat. it's a *screensaver.*" },
  { t: T.l2, speaker: SPEAK, text: 'here. ask them something *real.*' },
]
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── the loop: five lines over and over, each gap shorter than the last; it sticks on "hey" at T.stop
const LOOP = [['me', 'hey'], ['them', 'hey'], ['me', "how's your week"], ['them', 'good u'], ['me', 'good']]
const N_LOOP = 41
const LTS = (() => {
  const g = []; for (let k = 0; k < N_LOOP - 1; k++) g.push(Math.max(0.055, 0.4 * Math.pow(0.86, k)))
  const sum = g.reduce((a, b) => a + b, 0), t0 = 0.32, k = (T.stop - t0) / sum
  const a = [t0]; for (const v of g) a.push(a[a.length - 1] + v * k)
  return a.map(v => +v.toFixed(3))
})()
const nAt = t => { let n = 0; while (n < N_LOOP && LTS[n] <= t) n++; return n }

// ── after the card: real answers
const ANS = [
  { t: T.a1, who: 'them', text: "mom's soup. no notes. you?" },
  { t: T.a2, who: 'me', text: 'grilled cheese. at 2 am. always.' },
  { t: T.a3, who: 'them', text: 'ok wait. defend the 2 am part', dots: T.dots },
  { t: T.a4, who: 'me', text: "it's a whole ritual. there's a song" },
  { t: T.a5, who: 'them', text: "I'm crying. sing it", dots: 12.6 },
  { t: T.a6, who: 'me', text: 'only on date two.', dots: 13.45 },
]

// ── layout
const PH = { x: 160, y: 575, w: 520, h: 790, r: 56 }               // phone body
const SC = { x: PH.x + 16, y: PH.y + 16, w: PH.w - 32, h: PH.h - 32 } // screen
const HDR = 108                                                     // header height inside the screen
const STAR_P = { x: 860, y: 1130, size: 260 }
const CARD_TH = { w: 168, h: 168 * 1170 / 732 }                     // the talk card in the thread

// pixel bits
const SPIDER = ['.k.......k.', '..k.....k..', 'k..kKKKk..k', '.kkKwKwKkk.', 'k..KKKKK..k', '..kKKKKKk..', '.k..KKK..k.', 'k.........k']
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  x.restore()
}
function rr(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath() }

// the DVD-style bouncing "hey": a triangle wave on each axis, phased so it lands EXACTLY in the top-left corner at T.corner
const DVD = { w: 176, h: 84, vx: 230, vy: 170 }
const tri = (u, L) => { const m = ((u % (2 * L)) + 2 * L) % (2 * L); return L - Math.abs(m - L) }
function dvdPos(t) {
  const Lx = SC.w - DVD.w, Ly = SC.h - HDR - DVD.h
  const ux = Lx + DVD.vx * (t - T.corner), uy = Ly + DVD.vy * (t - T.corner)   // f = L - |L - L| … at t = corner: 0 → left/top
  const x = Lx - tri(ux, Lx), y = Ly - tri(uy, Ly)
  const bounces = Math.floor((ux + Lx * 1000) / Lx) + Math.floor((uy + Ly * 1000) / Ly)
  return { x: SC.x + x, y: SC.y + HDR + y, bounces }
}
const DVD_COLS = ['#ff8fb1', '#7fdcff', '#f2c75c', '#9ef0a8', '#c9a6ff', '#ff9f5a']

function starState(t) {
  if (t < T.roll[0]) { const n = nAt(t); return { mood: 'neutral', look: [-1, n % 2 ? -0.3 : 0.4], blink: false } }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.jolt) return { mood: 'sleepy' }
  if (t < T.l1) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.dvd + 0.2) return { mood: 'squint', look: [0, 0] }
  if (t < T.corner) { const p = dvdPos(t); return { mood: 'neutral', look: [clamp((p.x + DVD.w / 2 - STAR_P.x) / 260, -1, 1), clamp((p.y - STAR_P.y + 200) / 300, -1, 1)], blink: false } }
  if (t < T.corner + 0.45) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.deal[1]) return { mood: 'happy', look: [-1, 0] }
  if (t < T.a1 + 0.1) return { mood: 'wide', look: [-1, -0.4], blink: false }
  if (t < T.h3) return { mood: 'heart' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  if (t < T.wink[0]) return { mood: 'happy' }
  return { mood: 'heart' }
}
const STAR_HOPS = [T.starIn + 0.3, ...LTS.slice(0, 7), T.jolt, ...talkHops(LINES, SPEAK, { cps: CPS }), T.corner, T.deal[0], T.a1 + 0.15, T.h3Land, T.wink[0], 14.4]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "500 24px Inter", "700 26px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const [backIm, talkIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-talk-5.png')])

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const H0 = popText(root, 'Stuck on | *“hey.”*', { top: 200, size: 128, accentSize: 200, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0 + 0.3, wobble: true, accentColor: '#9fb6e0' })
  const H1 = popText(root, 'Day 41 of | *“hey.”*', { top: 200, size: 124, accentSize: 190, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1 + 0.28, wobble: true, accentColor: '#9fb6e0' })
  const H2 = popText(root, 'Ask a *real* | question.', { top: 200, size: 124, accentSize: 180, at: T.h2, gap: 0.08, accentColor: GOLD })
  const H3 = popText(root, 'Skip to the | *good part.*', { top: 200, size: 124, accentSize: 190, at: T.h3, late: 2, lateAt: T.h3Land, lateGap: 0.12, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── bubbles
  const BF = "500 29px " + INTER
  function wrap(text, maxW) {
    x.font = BF
    const words = text.split(' '), rows = []; let cur = ''
    for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (x.measureText(nx).width > maxW && cur) { rows.push(cur); cur = w } else cur = nx }
    if (cur) rows.push(cur)
    return rows
  }
  function bubbleSize(text) { const rows = wrap(text, 330); x.font = BF; const w = Math.max(...rows.map(r => x.measureText(r).width)); return { rows, w: w + 44, h: rows.length * 36 + 28 } }
  function drawBubble(b, by, k, { warm = false, alpha = 1 } = {}) {      // by = bubble bottom; k = pop 0…1
    const s = bubbleSize(b.text), me = b.who === 'me'
    const bx = me ? SC.x + SC.w - 18 - s.w : SC.x + 18
    x.save(); x.globalAlpha *= alpha * clamp(k * 2)
    const ox = me ? bx + s.w : bx, oy = by
    x.translate(ox, oy); x.scale(0.6 + 0.4 * k, 0.6 + 0.4 * k); x.translate(-ox, -oy)
    x.fillStyle = warm ? (me ? '#7a4fd6' : '#2c2350') : (me ? '#3b5f9c' : '#262b35')
    rr(x, bx, by - s.h, s.w, s.h, 24); x.fill()
    x.fillStyle = '#f3f5f9'; x.font = BF; x.textBaseline = 'alphabetic'
    s.rows.forEach((r, i) => x.fillText(r, bx + 22, by - s.h + 42 + i * 36))
    x.restore()
    return s.h
  }
  function drawDots(t, by, a) {
    x.save(); x.globalAlpha *= a
    x.fillStyle = '#2c2350'; rr(x, SC.x + 18, by - 52, 96, 52, 24); x.fill()
    for (let i = 0; i < 3; i++) { x.fillStyle = `rgba(243,245,249,${0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - i * 0.9))})`; x.beginPath(); x.arc(SC.x + 44 + i * 22, by - 26, 7, 0, Math.PI * 2); x.fill() }
    x.restore()
  }

  // ── the phone
  function drawPhone(t, ok) {
    if (ok <= 0) return
    const warm = ease.inOutQuad(prog(t, T.flip[1], T.flip[1] + 0.5))
    const fl = Math.sin(t * 1.3) * 6
    x.save(); x.globalAlpha = ok
    x.translate(PH.x + PH.w / 2, PH.y + PH.h / 2 + fl); x.scale(lerp(0.85, 1, ok), lerp(0.85, 1, ok)); x.translate(-(PH.x + PH.w / 2), -(PH.y + PH.h / 2))
    // glow behind
    const gl = x.createRadialGradient(PH.x + PH.w / 2, PH.y + PH.h / 2, 100, PH.x + PH.w / 2, PH.y + PH.h / 2, 560)
    gl.addColorStop(0, warm > 0 ? `rgba(242,170,140,${0.1 + 0.2 * warm})` : 'rgba(90,130,220,0.22)'); gl.addColorStop(1, 'rgba(90,130,220,0)')
    x.fillStyle = gl; x.fillRect(PH.x - 400, PH.y - 400, PH.w + 800, PH.h + 800)
    // body
    x.fillStyle = '#0b0d12'; rr(x, PH.x, PH.y, PH.w, PH.h, PH.r); x.fill()
    x.strokeStyle = 'rgba(160,175,205,0.35)'; x.lineWidth = 3; rr(x, PH.x + 1.5, PH.y + 1.5, PH.w - 3, PH.h - 3, PH.r); x.stroke()
    // screen
    x.save(); rr(x, SC.x, SC.y, SC.w, SC.h, PH.r - 14); x.clip()
    const sleep = ease.inOutQuad(prog(t, ...T.dim)) * (1 - ease.inOutQuad(prog(t, T.flip[0], T.flip[1])))
    x.fillStyle = warm > 0 ? `rgb(${Math.round(lerp(22, 26, warm))},${Math.round(lerp(28, 14, warm))},${Math.round(lerp(40, 58, warm))})` : '#161c28'
    x.fillRect(SC.x, SC.y, SC.w, SC.h)
    const TOP = SC.y + HDR, BOT = SC.y + SC.h - 24
    x.save(); x.beginPath(); x.rect(SC.x, TOP, SC.w, BOT - TOP + 24); x.clip()
    if (t < T.flip[1]) {
      // the loop thread
      const n = nAt(t)
      const STEP = 80
      const k = n ? ease.outCubic(prog(t, LTS[n - 1], LTS[n - 1] + Math.min(0.18, n < N_LOOP ? (LTS[n] - LTS[n - 1]) * 1.2 : 0.18))) : 0
      const speed = n > 1 && n < N_LOOP ? 1 / Math.max(0.05, LTS[n] - LTS[n - 1]) : 0
      const smear = clamp((speed - 5) / 10)
      for (let s = 0; s < 9 && n - 1 - s >= 0; s++) {
        const i = n - 1 - s, [who, text] = LOOP[i % 5]
        const yb = BOT - 50 - (s === 0 ? 0 : (s - 1 + k) * STEP)
        const kk = s === 0 ? k : 1
        if (smear > 0.02) for (let g = 1; g <= 2; g++) drawBubble({ who, text }, yb - g * 22 * smear, kk, { alpha: 0.25 * smear })
        drawBubble({ who, text }, yb, kk)
      }
      // Seen
      const sa = clamp(prog(t, T.seen, T.seen + 0.15))
      if (sa > 0) { x.save(); x.globalAlpha *= sa; x.fillStyle = 'rgba(216,222,234,0.6)'; x.font = "500 20px " + INTER; x.textAlign = 'right'; x.fillText('Seen', SC.x + SC.w - 24, BOT - 18); x.restore() }
      // the cobweb (top-right of the thread) + the spider
      const wk = ease.outCubic(prog(t, ...T.web)) * (1 - prog(t, T.gust, T.gust + 0.3))
      if (wk > 0) {
        const cx0 = SC.x + SC.w - 4, cy0 = TOP + 2, R = 190 * wk
        x.save(); x.strokeStyle = 'rgba(235,240,250,0.55)'; x.lineWidth = 2.5
        for (let i = 0; i <= 5; i++) { const a = Math.PI / 2 + (i / 5) * (Math.PI / 2); x.beginPath(); x.moveTo(cx0, cy0); x.lineTo(cx0 + Math.cos(a) * R, cy0 + Math.sin(a) * R); x.stroke() }
        for (let r = 1; r <= 4; r++) {
          const rr0 = R * r / 4.4; x.beginPath()
          for (let i = 0; i <= 5; i++) { const a = Math.PI / 2 + (i / 5) * (Math.PI / 2), px = cx0 + Math.cos(a) * rr0, py = cy0 + Math.sin(a) * rr0; if (i) { const am = Math.PI / 2 + ((i - 0.5) / 5) * (Math.PI / 2); x.quadraticCurveTo(cx0 + Math.cos(am) * rr0 * 0.82, cy0 + Math.sin(am) * rr0 * 0.82, px, py) } else x.moveTo(px, py) }
          x.stroke()
        }
        x.restore()
      }
      const sp = prog(t, T.spider, T.spider + 0.5)
      if (sp > 0) {
        const fall = prog(t, T.gust, T.gust + 0.6)
        const sx = SC.x + SC.w - 70 + fall * 40, sy0 = TOP + 60
        const sy = sy0 + ease.outBack(sp) * 150 + Math.sin(t * 3) * 6 + fall * fall * 700
        x.save(); x.globalAlpha *= 1 - fall
        if (fall <= 0) { x.strokeStyle = 'rgba(235,240,250,0.6)'; x.lineWidth = 2; x.beginPath(); x.moveTo(sx, sy0 - 60); x.lineTo(sx, sy - 18); x.stroke() }
        drawBits(x, SPIDER, { k: '#d9d2f0', K: '#5a4a8c', w: '#ffffff' }, sx, sy, 8, { rot: fall * 4 })
        // a tiny wave of one leg while the star talks
        x.restore()
      }
      // asleep → the screensaver
      if (sleep > 0) {
        x.fillStyle = `rgba(2,2,6,${0.96 * sleep})`; x.fillRect(SC.x, TOP, SC.w, SC.h)
        const da = prog(t, T.dvd, T.dvd + 0.2) * (1 - prog(t, T.flip[0], T.flip[0] + 0.15))
        if (da > 0) {
          const p = dvdPos(t), col = DVD_COLS[((p.bounces % 6) + 6) % 6]
          x.save(); x.globalAlpha *= da
          x.strokeStyle = col; x.lineWidth = 4; rr(x, p.x + 4, p.y + 4, DVD.w - 8, DVD.h - 8, 26); x.stroke()
          x.fillStyle = col; x.font = "800 46px " + INTER; x.textAlign = 'center'; x.fillText('hey', p.x + DVD.w / 2, p.y + DVD.h / 2 + 16)
          x.restore()
        }
      }
    } else {
      // the real conversation: the card on top, answers below (scrolls up once it fills)
      const list = ANS.filter(a => t >= (a.dots ?? a.t) - 0.01)
      let h = CARD_TH.h + 40
      for (const a of list) h += (t >= a.t ? bubbleSize(a.text).h : 52) + 16
      const room = BOT - TOP - 20
      const sc = Math.max(0, h - room)
      let y = TOP + 22 - sc
      if (talkIm) x.drawImage(talkIm, SC.x + SC.w / 2 - CARD_TH.w / 2, y, CARD_TH.w, CARD_TH.h)
      y += CARD_TH.h + 40
      for (const a of list) {
        if (t < a.t) { drawDots(t, y + 52, clamp(prog(t, a.dots, a.dots + 0.12))); y += 68; continue }
        const bh = bubbleSize(a.text).h
        drawBubble(a, y + bh, easeOutBack(prog(t, a.t, a.t + 0.25), 2), { warm: true })
        y += bh + 16
      }
    }
    x.restore()
    // header (over the thread)
    x.fillStyle = warm > 0 ? '#1e1236' : '#161c28'; x.fillRect(SC.x, SC.y, SC.w, HDR)
    x.fillStyle = 'rgba(216,222,234,0.14)'; x.fillRect(SC.x + 20, SC.y + HDR - 1, SC.w - 40, 1)
    x.fillStyle = '#4a5368'; x.beginPath(); x.arc(SC.x + 62, SC.y + 62, 26, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#7d879c'; x.beginPath(); x.arc(SC.x + 62, SC.y + 54, 10, 0, Math.PI * 2); x.fill(); x.beginPath(); x.arc(SC.x + 62, SC.y + 82, 17, Math.PI, 0); x.fill()
    x.fillStyle = '#f1f3f7'; x.font = "700 26px " + INTER; x.textAlign = 'left'; x.fillText('Theo', SC.x + 104, SC.y + 71)
    // the day counter: races with the loop
    const day = t < T.flip[1] ? 1 + Math.round(40 * nAt(t) / N_LOOP) : 41
    const chipK = t >= T.flip[1] ? 1 - prog(t, T.flip[1], T.flip[1] + 0.2) : 1
    if (chipK > 0) {
      x.save(); x.globalAlpha *= chipK
      x.fillStyle = 'rgba(159,182,224,0.16)'; rr(x, SC.x + SC.w - 168, SC.y + 44, 144, 40, 20); x.fill()
      x.fillStyle = '#c4d2ee'; x.font = "700 22px 'Space Mono'"; x.textAlign = 'center'; x.fillText(`DAY ${day}`, SC.x + SC.w - 96, SC.y + 71)
      x.restore()
    }
    if (t >= T.flip[1]) {
      x.save(); x.globalAlpha *= prog(t, T.flip[1], T.flip[1] + 0.3)
      x.fillStyle = GOLD; x.font = "700 20px 'Space Mono'"; x.textAlign = 'right'; x.fillText('★ TALK CARD', SC.x + SC.w - 26, SC.y + 70)
      x.restore()
    }
    x.restore()
    // notch
    x.fillStyle = '#000'; rr(x, PH.x + PH.w / 2 - 52, SC.y + 12, 104, 30, 15); x.fill()
    x.restore()
  }

  // ── the dealt card: from the star, over to the chat, flips (back → talk card), shrinks into the thread
  function drawDeal(t) {
    if (t < T.deal[0] || t > T.flip[1] + 0.02) return
    const p = ease.inOutCubic(prog(t, ...T.deal))
    const sx = STAR_P.x - 40, sy = STAR_P.y - 120
    const ex = SC.x + SC.w / 2, ey = SC.y + HDR + 22 + CARD_TH.h / 2
    const cx = lerp(sx, ex, p), cy = lerp(sy, ey, p) - Math.sin(Math.PI * p) * 260
    const fp = prog(t, ...T.flip), big = lerp(1.7, 1, ease.inOutCubic(prog(t, T.flip[0] + 0.1, T.flip[1])))
    const w = CARD_TH.w * big * Math.abs(Math.cos(Math.PI * fp)), h = CARD_TH.h * big
    const im = fp < 0.5 ? backIm : talkIm
    x.save(); x.translate(cx, cy); x.rotate((1 - p) * -0.5 + Math.sin(Math.PI * p) * 0.2)
    x.shadowColor = 'rgba(242,199,92,0.6)'; x.shadowBlur = 30
    if (im) x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  function floatHearts(t, cx, cy, t0, t1, seed, cell = 7) {
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.22, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, Math.round(cx + side * 220 + Math.sin(p * 7 + i) * 16), Math.round(cy - 60 - p * 260), cell * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { alpha: Math.sin(Math.PI * p) })
    }
  }

  function drawStar(t, ok) {
    const sp = pop01(t, T.starIn, 0.38, 2.2) * ok
    if (sp <= 0.02) return
    const st = starState(t)
    const doze = t >= T.doze && t < T.jolt ? 0.07 * ease.outCubic(prog(t, T.doze, T.doze + 0.5)) : 0
    const jolt = t >= T.jolt && t < T.jolt + 0.5 ? -0.16 * Math.exp(-(t - T.jolt) * 7) * Math.cos((t - T.jolt) * 22) : 0
    const yay = t >= T.corner && t < T.corner + 0.6 ? -0.12 * Math.exp(-(t - T.corner) * 6) * Math.cos((t - T.corner) * 20) : 0
    const roll = t >= T.roll[0] && t < T.roll[1] ? 0.04 * Math.sin((t - T.roll[0]) * 9) : 0
    const r = drawStarChar(x, STAR_P.x, STAR_P.y, STAR_P.size, t, { color: STAR.sky, ...st, hops: STAR_HOPS, pop: sp, squash: doze + jolt + yay + roll, seed: 4, glow: 1.15, bob: t > T.doze && t < T.jolt ? 3 : undefined })
    // jolt: a little "!" pops over its head
    const ex = t - T.jolt
    if (ex > 0 && ex < 0.6) { x.save(); x.globalAlpha = Math.sin(Math.PI * ex / 0.6); x.fillStyle = GOLD; x.font = "800 90px " + INTER; x.textAlign = 'center'; x.fillText('!', r.x + 120, r.top + 10 - ease.outBack(clamp(ex / 0.2)) * 30); x.restore() }
    sparkles(t, r.x, r.y, T.corner, 10, 200, 1)
    if (t > T.a1 && t < T.h3) floatHearts(t, r.x, r.y - 40, T.a1 + 0.1, T.close, 2)
    if (t > T.h3Land) floatHearts(t, r.x, r.y - 40, T.h3Land, T.out[0] - 0.6, 5, 6)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      const cold = 1 - ease.inOutQuad(prog(t, T.flip[1], T.flip[1] + 0.6))
      drawSky(x, t, { ...base, dim: (base.dim ?? 1) * lerp(1, 0.7, cold) })
      if (t < T.out[1] + 0.02) {
        const ok = popOut(t, T.out)
        const php = pop01(t, 0.05, 0.4, 1.6)
        drawPhone(t, Math.min(php, 1) * ok)
        if (t >= T.corner && t < T.corner + 0.7) { const p = dvdPos(T.corner); sparkles(t, p.x + 20, p.y + 20, T.corner, 8, 60, 3, [GOLD, '#7fdcff', PINK]) }
        sparkles(t, SC.x + SC.w / 2, SC.y + HDR + 140, T.gust, 12, 180, 2)
        drawStar(t, ok)
        drawDeal(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 10.95 (box shut, H2 out → "Skip to the good part.").  End card flips at 15.6.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const dvdBounces = (() => {
  const out = []; let prev = dvdPos(T.dvd).bounces
  for (let t = T.dvd; t < T.flip[0]; t += 1 / 60) { const b = dvdPos(t).bounces; if (b !== prev) out.push(+t.toFixed(3)); prev = b }
  return out.filter(t => Math.abs(t - T.corner) > 0.05)
})()
export const CUES = [
  // hook: the loop, bubble after bubble, faster and faster
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.3, 1318.51, 0.045, 0],
  ['pop', 0.08, 659.25, 0.03, 0], ['pop', T.starIn + 0.05, 830.61, 0.04, 0.3],
  ...LTS.map((t, i) => ['tick', t, (i % 5 === 0 ? 0.05 : 0.032) * (1 - 0.4 * i / N_LOOP)]),
  ...LTS.filter((_, i) => i % 5 === 0 && i < 30).map((t, i) => ['pop', t, 987.77, 0.018, i % 2 ? 0.2 : -0.2]),
  ['whoosh', 1.85, 0.5, 0.02], ['pluck', T.doze, 329.63, 0.03, 1.0, 0.2], ['pluck', T.doze + 0.35, 246.94, 0.025, 1.0, 0.2],
  ['tick', T.web[0], 0.02], ['tick', T.spider + 0.3, 0.03], ['pop', T.spider + 0.35, 1318.51, 0.015, 0.4],
  ['boom', T.stop, 0.12], ['pop', T.seen, 493.88, 0.04, 0.3],
  ['pop', T.jolt, 1318.51, 0.05, 0.2], ['tick', T.jolt + 0.02, 0.05],
  // day 41: the screensaver
  ...wordPops(T.h1, 2, 0.08, 1, 0.025), ['pop', T.h1 + 0.28, 1108.73, 0.045, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['whoosh', T.dim[0], 0.5, 0.02],
  ...dvdBounces.map((t, i) => ['pop', t, NOTE[i % NOTE.length], 0.022, -0.3]),
  ['bell', T.corner, 1318.51, 0.05, 1.4, -0.2], ['bell', T.corner + 0.08, 1975.5, 0.035, 1.2, 0], ['glitter', T.corner, T.corner + 0.6], ['pluck', T.corner + 0.1, 1661.2, 0.04, 0.5, 0],
  // ask a real question: the deal
  ...wordPops(T.h2, 3, 0.08, 2, 0.025),
  ['whoosh', T.deal[0], 0.45, 0.04], ['tick', T.flip[0], 0.05], ['pluck', T.flip[1], 1318.51, 0.05, 0.7, 0],
  ['whoosh', T.gust, 0.4, 0.03], ['glitter', T.gust, T.gust + 0.5],
  ...ANS.filter(a => a.t < T.cut).map((a, i) => ['pop', a.t, NOTE[(i * 2 + 1) % NOTE.length], 0.035, a.who === 'me' ? 0.25 : -0.25]),
  ['pluck', T.a1 + 0.12, 1661.2, 0.035, 0.6, 0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 659.25, 0.03, 0],
  // skip to the good part
  ...wordPops(T.h3, 2, 0.07, 1, 0.028), ['pop', T.h3Land, 1318.51, 0.055, 0], ['pluck', T.h3Land, 1108.73, 0.05, 0.7, 0], ['pop', T.h3Land + 0.12, 1661.2, 0.045, 0],
  ...ANS.filter(a => a.t > T.cut).map((a, i) => ['pop', a.t, NOTE[(i * 2) % NOTE.length], 0.032, a.who === 'me' ? 0.25 : -0.25]),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.2], ['bell', 14.4, 1661.2, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
