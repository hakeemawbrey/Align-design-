// trdaytissues: A DAY IN THE LIFE OF… Pisces' tissue box (30 s vertical, Star Talk Trends §10.3, music: lofi · C)
// Story 0–25.6, then the shared end card. The vlog look lives in ./day.js (identical in all five trday films).
// Pisces is the star of the running gag here: the box is the one who works the shifts.
//   0.0–5.0   7:02 AM "A day in the life of… | *a tissue box.*"  Pisces wakes, sees the sunrise through the window,
//             cries; tissue #1 shoots out. "7 AM. first shift. she saw a *sunrise*." Sticker "cry #1: *sunrise*".
//   5.0–9.3   12:15 PM "Lunch break? | *no.*"  A sweet text ("can't wait for tonight :)") → three tissues in a burst.
//             "lunch break? nope. a *sweet text* came in." Sticker "cry #2: *a sweet text*".
//   9.3–13.3  6:40 PM "Pre-date: | *nervous tears.*"  Pisces pep-talks the mirror ("you look GREAT") and cries at it.
//             "pre-date nerves. I'm down to *three*." Sticker "tissues left: *3*". The box sweats.
//  13.4       card cut.
//  13.4–18.6  9:05 PM "The date: | *a talk card.*"  A talk card between Pisces and a Scorpio. Scorpio's answer:
//             "lazy sundays… with you?" Pisces: two tissues. Then the Scorpio tears up and takes the LAST one.
//             "oh no. now the *date* is crying too." Sticker "cry #47: *a talk card*". The box: empty, panicking.
//  18.6–22.4  11:48 PM "Clock out: | *empty. happy.*"  The box slumps… and the Scorpio produces a brand-new box.
//             "empty. but the date brought a *refill*." Sticker "tears: *happy ones*". Hearts.
//  22.4–25.5  "*Overtime*, | again."  The old box salutes, the refill winks. Everything pops out by 25.5.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import {
  GOLD, BONE, INK, PINK, INTER, FONTS, pop01, outK, popOut, drawBits, sparkles, hearts, pisces,
  buildBug, buildClock, buildProgress, buildSticker, drawWash, handheld, wordPops, stickerCue, clockCues,
} from './day.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const SCO = signStar('scorpio')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.15, h0Land: 0.85, h0Out: [4.75, 4.95], wake: 1.1, sun: [0.4, 2.0], cry1: 1.75,
  h1: 5.0, h1Out: [9.05, 9.25], phone: [5.1, 5.45], ping: 5.55, cry2: 6.15, phoneOut: [8.95, 9.2],
  h2: 9.35, h2Out: [12.95, 13.15], mirror: [9.4, 9.75], pep: 9.9, cry3: 10.55, sweat: 11.0,
  cut: 13.4,
  h3: 13.45, h3Out: [18.4, 18.6], dateIn: 13.6, cardIn: [13.7, 14.05], answer: 14.35, cry4: 15.1, dateCry: 15.85, last: 16.2, empty: 16.5,
  h4: 18.65, h4Out: [22.2, 22.4], slump: 18.7, refill: [19.4, 19.85],
  h5: 22.5, salute: 22.9, wink: 23.4,
  out: [25.05, 25.45], h5Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const SPEAK = 'THE TISSUES', SC = '#9fe6ff'
const LINES = [
  { t: 2.3, speaker: SPEAK, color: SC, text: '7 AM. first shift. she saw a *sunrise*.' },
  { t: 5.8, speaker: SPEAK, color: SC, text: 'lunch break? nope. a *sweet text* came in.' },
  { t: 9.6, speaker: SPEAK, color: SC, text: "pre-date nerves. I'm down to *three*." },
  { t: 15.3, speaker: SPEAK, color: SC, text: 'oh no. now the *date* is crying too.' },
  { t: 18.9, speaker: SPEAK, color: SC, text: 'empty. but the date brought a *refill*.' },
]
const CPS = 30
const BOX1 = { open: 2.1, close: 13.1 }, BOX2 = { open: 15.1, close: 22.1 }
const STAMPS = [{ t: 0, text: '7:02 AM' }, { t: T.h1, text: '12:15 PM' }, { t: T.h2, text: '6:40 PM' }, { t: T.h3, text: '9:05 PM' }, { t: T.h4, text: '11:48 PM' }, { t: T.h5, text: '11:59 PM' }]
const STICK = [
  { text: 'cry #1: *sunrise*', x: 720, y: 820, rot: 4, at: 3.2, out: [4.7, 4.95] },
  { text: 'cry #2: *a sweet text*', x: 700, y: 840, rot: -3, at: 6.7, out: [9.0, 9.25] },
  { text: 'tissues left: *3*', x: 720, y: 830, rot: 3, at: 11.0, out: [12.9, 13.15] },
  { text: 'cry #47: *a talk card*', x: 540, y: 500, rot: -3, at: 16.0, out: [18.35, 18.6] },
  { text: 'tears: *happy ones*', x: 540, y: 500, rot: 3, at: 19.9, out: [22.15, 22.4] },
]
const CUTS = [9.3, { t: T.cut, kind: 'flip' }, 18.62]

// layout
const TABLE = { y: 1160, x0: 110, x1: 970 }
const BOXA = { x: 740, y: 1080 }, BOXB = { x: 540, y: 1080 }, REFILL = { x: 735, y: 1080 }
const PIS_A = { x: 320, y: 1010, s: 260 }, PIS_B = { x: 220, y: 1000, s: 220 }, SCO_P = { x: 860, y: 1000, s: 220 }
const PIS_HOPS = [T.wake, T.ping, T.pep, T.pep + 0.5, T.answer + 0.4, T.refill[1], T.wink]
const SCO_HOPS = [T.dateIn + 0.3, T.answer, T.answer + 0.5, T.refill[0], T.refill[1] + 0.1, T.salute]
const BOX_HOPS = [T.cry1, T.cry2, T.cry3, T.sweat, T.cry4, T.empty, T.salute, ...talkHops(LINES, SPEAK, { cps: CPS })]

// ── tissue emissions: [t, target] (target: 'up' | 'pis' | 'sco')
const EMIT = [[T.cry1, 'pis'], [T.cry2, 'pis'], [T.cry2 + 0.14, 'pis'], [T.cry2 + 0.28, 'pis'], [T.cry3, 'pis'], [T.cry3 + 0.3, 'pis'],
  [T.cry4, 'pis'], [T.cry4 + 0.3, 'pis'], [T.last, 'sco']]
const TISSUE = ['.WWW..', 'WWWWW.', 'WWBWWW', '.WWWWW', 'WWWWW.', '.WW.W.']

// ── faces (pixel eyes + mouths)
function eyeBM(kind, lx = 0, ly = 0) {
  if (kind === 'shut') return ['KKKK']
  if (kind === 'happy') return ['.KK.', 'K..K']
  if (kind === 'x') return ['K.K', '.K.', 'K.K']
  if (kind === 'sad') return ['K...', '.KKK']
  const wide = kind === 'wide'
  const w = wide ? 5 : 4, h = wide ? 6 : 5, ps = wide ? 1 : 2
  const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => ((i === 0 || i === w - 1) && (j === 0 || j === h - 1)) ? '.' : 'W'))
  const px = clamp(Math.round((w - ps) / 2 + lx), 0, w - ps), py = clamp(Math.round((h - ps) / 2 + ly), 1, h - 1 - ps)
  for (let j = 0; j < ps; j++) for (let i = 0; i < ps; i++) rows[py + j][px + i] = 'K'
  return rows.map(r => r.join(''))
}
const MOUTH = { smile: ['K...K', '.KKK.'], grin: ['KKKKK', 'KRRRK', '.KKK.'], o: ['.KK.', 'K..K', '.KK.'], flat: ['KKKK'], wavy: ['K.K.K', '.K.K.'] }
const FCOL = { W: '#ffffff', K: INK, R: '#ff8fa0' }

// ── the tissue box: a pixel box (cells), heart print, the slot, a tissue sticking out (when full), a face on the front
const BW = 22, BH = 14
function drawBox(x, t, cx, cy, c, { tissue = true, face = {}, sq = 0, rot = 0, alpha = 1, body = '#8fd0ff', dark = '#5aa6e0', print = 'rgba(255,255,255,0.7)', salute = 0 } = {}) {
  if (alpha <= 0.01 || c <= 0.2) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy + BH * c / 2); x.rotate(rot); x.scale(1 + sq, 1 - sq * 0.9); x.translate(0, -BH * c / 2)
  const ox = -BW * c / 2, oy = -BH * c / 2
  const R = (i, j, w, h, col) => { x.fillStyle = col; x.fillRect(ox + i * c, oy + j * c, w * c + 0.5, h * c + 0.5) }
  R(-1, -1, BW + 2, BH + 2, INK)
  R(0, 0, BW, BH, body)
  R(0, 0, BW, 3, dark)                                     // the top band
  R(BW / 2 - 4, 1, 8, 1, INK)                              // the slot
  for (const [i, j] of [[1, 4], [1, 9], [BW - 4, 5], [BW - 4, 10]]) { R(i, j, 1, 1, print); R(i + 1, j, 1, 1, print); R(i, j + 1, 2, 1, print); R(i + 0.5, j + 2, 1, 1, print) }
  R(BW - 2, 3, 1, BH - 3, dark)
  if (tissue) {
    const wav = Math.sin(t * 3) * 0.6
    x.save(); x.translate(0, oy - c * 0.5); x.rotate(0.06 * Math.sin(t * 2.2))
    drawBits(x, ['..WWWW..', '.WWWWWWW', 'WWWBWWW.', '.WWWWWW.', '..WWWW..'], { W: '#ffffff', B: '#d8ecff' }, wav * c, -c * 2.2, c)
    x.restore()
  }
  // face on the front
  let { eyes = 'open', mouth = 'smile', look = [0, 0], blush = 0 } = face
  if (eyes === 'open' || eyes === 'wide') { const ph = (t * 0.33 + 0.15) % 1; if (ph < 0.04) eyes = 'shut' }
  const ey = oy + 7 * c, dx = 5 * c
  const L = eyes === 'wink' ? 'happy' : eyes, Rr = eyes === 'wink' ? 'open' : eyes
  drawBits(x, eyeBM(L, look[0], look[1]), FCOL, -dx, ey, c, { outline: null })
  drawBits(x, eyeBM(Rr, look[0], look[1]), FCOL, dx, ey, c, { outline: null })
  if (blush > 0) for (const s of [-1, 1]) { x.fillStyle = `rgba(255,120,150,${(0.75 * blush).toFixed(3)})`; x.fillRect(s * dx - c * 1.5, ey + c * 2.5, c * 3, c) }
  drawBits(x, MOUTH[mouth], FCOL, 0, ey + c * 4, c, { outline: null })
  // a little salute arm
  if (salute > 0.01) drawBits(x, ['.HH', 'HH.', 'H..', 'H..'], { H: body }, -BW * c / 2 - c * 0.5, oy + c * (5 - 3 * salute), c)
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const cardImg = await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-talk-3.png' })
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A day in the life of… | *a tissue box.*', { top: 176, size: 84, accentSize: 124, at: T.h0, late: 3, lateAt: T.h0Land, wobble: true, accentColor: '#9fe6ff' })
  const H1 = popText(root, 'Lunch break? | *no.*', { top: 176, size: 100, accentSize: 150, at: T.h1, gap: 0.1, accentColor: '#ff8fb1' })
  const H2 = popText(root, 'Pre-date: | *nervous tears.*', { top: 176, size: 100, accentSize: 132, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'The date: | *a talk card.*', { top: 176, size: 100, accentSize: 136, at: T.h3, gap: 0.1, accentColor: '#c9a6ff' })
  const H4 = popText(root, 'Clock out: | *empty. happy.*', { top: 176, size: 100, accentSize: 136, at: T.h4, gap: 0.1, accentColor: '#9fe6ff' })
  const H5 = popText(root, '*Overtime*, | again.', { top: 176, size: 120, accentSize: 170, at: T.h5, gap: 0.14, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const stickers = STICK.map(s => buildSticker(root, s))
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { stamps: STAMPS, at: T.bug + 0.1 })
  const bar = buildProgress(root, { end: STORY_END, marks: STAMPS.slice(1).map(s => s.t), at: T.bug + 0.15 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function speech(t, cx, cy, t0, text, { col = BONE, size = 32, life = 3, tail = 0 } = {}) {
    const k = pop01(t, t0, 0.25, 2.4) * outK(t, [t0 + life - 0.2, t0 + life])
    if (k <= 0.01 || t < t0) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.font = `700 ${size}px ${INTER}`
    const w = x.measureText(text).width + 40, h = size + 30
    x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2, w + 8, h); x.fillRect(-w / 2, -h / 2 - 4, w, h + 8)
    x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = INK; x.fillRect(tail - 12, h / 2 + 4, 12, 10); x.fillStyle = col; x.fillRect(tail - 8, h / 2, 8, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }

  function table(t) {
    const k = clamp(prog(t, 0, 0.5)) * popOut(t, T.out)
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    x.fillStyle = INK; x.fillRect(TABLE.x0 - 8, TABLE.y - 8, TABLE.x1 - TABLE.x0 + 16, 44)
    x.fillStyle = '#c98a5a'; x.fillRect(TABLE.x0, TABLE.y, TABLE.x1 - TABLE.x0, 28)
    x.fillStyle = '#e0a874'; x.fillRect(TABLE.x0, TABLE.y, TABLE.x1 - TABLE.x0, 8)
    for (const lx of [TABLE.x0 + 50, TABLE.x1 - 74]) { x.fillStyle = INK; x.fillRect(lx - 8, TABLE.y + 36, 40, 200); x.fillStyle = '#9b6a40'; x.fillRect(lx, TABLE.y + 36, 24, 192) }
    x.restore()
  }

  // beat props: the window with the sunrise, the phone, the mirror
  function window_(t) {
    const k = pop01(t, 0.3, 0.36, 1.8) * outK(t, T.h0Out)
    if (k <= 0.01) return
    const cx = 320, cy = 650, w = 340, h = 260
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28)
    x.save(); x.beginPath(); x.rect(-w / 2, -h / 2, w, h); x.clip()
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#7a5bd0'); g.addColorStop(0.55, '#ff9a8a'); g.addColorStop(1, '#ffd68a')
    x.fillStyle = g; x.fillRect(-w / 2, -h / 2, w, h)
    const sy = lerp(h / 2 + 60, 10, ease.outCubic(prog(t, ...T.sun)))
    drawBits(x, ['..YYYY..', '.YYYYYY.', 'YYYWYYYY', 'YYYYYYYY', 'YYYYYYYY', '.YYYYYY.', '..YYYY..'], { Y: '#ffe27a', W: '#fffbea' }, 0, sy, 12, { outline: null })
    x.fillStyle = '#3b2a6e'; x.fillRect(-w / 2, h / 2 - 50, w, 50)
    x.restore()
    x.fillStyle = '#c98a5a'; x.fillRect(-6, -h / 2, 12, h); x.fillRect(-w / 2, -6, w, 12)
    x.restore()
  }
  function phone(t) {
    if (t < T.phone[0] || t > T.phoneOut[1]) return
    const k = easeOutBack(prog(t, ...T.phone), 1.4) * (1 - ease.inCubic(prog(t, ...T.phoneOut)))
    const cx = 330, cy = 660, w = 300, h = 300
    x.save(); x.translate(cx, cy + (1 - k) * 400); x.rotate(-0.06); x.globalAlpha *= clamp(k * 2)
    x.fillStyle = INK; x.fillRect(-w / 2 - 10, -h / 2 - 10, w + 20, h + 20)
    x.fillStyle = '#3a2d74'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = '#120c2a'; x.fillRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32)
    x.font = `700 24px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('♏︎ the date', 0, -h / 2 + 52)
    if (t > T.ping) {
      const bk = easeOutBack(prog(t, T.ping, T.ping + 0.25), 2)
      x.save(); x.translate(-w / 2 + 34, -10); x.scale(bk, bk)
      x.fillStyle = '#3b3466'; x.fillRect(0, 0, 230, 100)
      x.font = `600 28px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'
      x.fillText("can't wait for", 18, 40); x.fillText('tonight :)', 18, 78)
      x.restore()
    }
    x.restore()
  }
  function mirror(t) {
    const k = pop01(t, T.mirror[0], 0.36, 1.8) * outK(t, T.h2Out)
    if (k <= 0.01) return
    x.save(); x.translate(330, 640); x.scale(k, k)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 150, 175, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = GOLD; x.beginPath(); x.ellipse(0, 0, 140, 165, 0, 0, Math.PI * 2); x.fill()
    const g = x.createLinearGradient(-100, -140, 100, 140); g.addColorStop(0, '#cfe6ff'); g.addColorStop(1, '#7d8fd6')
    x.fillStyle = g; x.beginPath(); x.ellipse(0, 0, 122, 147, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-70, -100, 18, 70); x.fillRect(-45, -110, 10, 40)
    x.restore()
    // Pisces' reflection, a little smaller, crying too
    pisces(x, t, { x: 330, y: 650, s: 150, pop: k, alpha: 0.75 }, t > T.cry3 ? 2 : 0, t > T.cry3 ? 'sparkle' : 'happy', [1, 0.5])
  }

  function boxPose(t) {
    let px = BOXA.x, py = BOXA.y, c = 12, rot = 0, alpha = 1, tissue = true
    let face = { eyes: 'shut', mouth: 'flat' }
    if (t > T.wake) face = { eyes: 'open', mouth: 'smile', look: [-1, 0] }
    if (t > T.cry1 - 0.15 && t < T.h1) face = { eyes: 'wide', mouth: 'o', look: [-1, -1] }
    if (t > 3.0 && t < T.h1) face = { eyes: 'happy', mouth: 'smile' }
    if (t >= T.h1) face = { eyes: 'open', mouth: 'smile', look: [-1, 0] }
    if (t > T.cry2 - 0.15 && t < T.h2) face = { eyes: 'x', mouth: 'wavy' }
    if (t >= T.h2) face = { eyes: 'open', mouth: 'flat', look: [-1, 0] }
    if (t > T.sweat) face = { eyes: 'wide', mouth: 'wavy', look: [0, 1] }
    // the date: the move under the cut, the last tissue, empty
    if (t >= T.cut - 0.1) {
      const m = ease.inOutCubic(prog(t, T.cut - 0.1, T.cut + 0.15)); px = lerp(BOXA.x, BOXB.x, m)
      face = { eyes: 'open', mouth: 'smile', look: [0, -1] }
      if (t > T.cry4 - 0.1) face = { eyes: 'wide', mouth: 'o', look: [-1, 0] }
      if (t > T.dateCry) face = { eyes: 'wide', mouth: 'o', look: [1, 0] }
      if (t > T.empty) face = { eyes: 'x', mouth: 'wavy' }
      if (t > T.last - 0.05) tissue = false
    }
    if (t >= T.slump) { face = { eyes: 'sad', mouth: 'flat' }; rot = -0.06 * ease.inOutCubic(prog(t, T.slump, T.slump + 0.4)) }
    if (t >= T.refill[0] - 0.3) px = lerp(BOXB.x, 470, ease.inOutCubic(prog(t, T.refill[0] - 0.3, T.refill[0] + 0.1)))
    if (t > T.refill[1]) { face = { eyes: 'happy', mouth: 'grin', blush: 1 }; rot = 0 }
    if (t > T.h5) face = { eyes: 'happy', mouth: 'grin', blush: 1 }
    const o = popOut(t, T.out); c *= o; alpha = clamp(o * 3)
    let sq = 0
    for (const h of BOX_HOPS) { const d = t - h; if (d > 0 && d < 0.5) sq = 0.09 * Math.sin(d * 18) * Math.exp(-d * 6) }
    if (t > T.slump && t < T.refill[1]) sq += 0.08 * ease.inOutCubic(prog(t, T.slump, T.slump + 0.4))
    return { px, py, c, rot, alpha, tissue, face, sq }
  }

  function tissues(t, B) {
    const pis = t < T.cut ? PIS_A : PIS_B
    for (const [t0, tgt] of EMIT) {
      const dt = t - t0
      if (dt < 0 || dt > 2.4) continue
      const src = { x: B.px, y: B.py - BH * 12 / 2 - 30 }
      const dst = tgt === 'sco' ? { x: SCO_P.x - 40, y: SCO_P.y - 20 } : { x: pis.x + 50, y: pis.y - 20 }
      const p = ease.outCubic(clamp(dt / 0.6))
      const cx = lerp(src.x, dst.x, p) + Math.sin(dt * 7 + t0) * 10, cy = lerp(src.y, dst.y, p) - 220 * Math.sin(Math.PI * clamp(dt / 0.6)) + Math.max(0, dt - 0.6) * 60
      const a = 1 - ease.inQuad(prog(dt, 1.4, 2.4))
      drawBits(x, TISSUE, { W: '#ffffff', B: '#d8ecff' }, cx, cy, 8, { rot: Math.sin(dt * 5 + t0) * 0.5, alpha: a })
    }
  }

  function talkCard(t) {
    if (!cardImg || t < T.cardIn[0] || t > T.h3Out[1] + 0.05) return
    const k = easeOutBack(prog(t, ...T.cardIn), 1.4) * outK(t, T.h3Out)
    const w = 200 * k, h = w * cardImg.height / cardImg.width
    x.save(); x.translate(520, lerp(1300, 715, k)); x.rotate(0.05 * Math.sin(t * 1.5))
    x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 12, -h / 2 + 14, w, h)
    x.drawImage(cardImg, -w / 2, -h / 2, w, h)
    x.restore()
  }

  function cast(t) {
    const o = popOut(t, T.out)
    if (t < T.cut) {
      let tears = 0, mood = 'sleepy', look = [1, 0]
      if (t > T.wake) { mood = 'wide'; look = [0, -1] }
      if (t > T.cry1 - 0.3) { mood = 'sparkle'; tears = 3; look = [0, -1] }
      if (t > 3.6) tears = 2
      if (t >= T.h1) { mood = 'happy'; tears = 1; look = [0, -1] }
      if (t > T.ping) { mood = 'wide'; tears = 1 }
      if (t > T.cry2 - 0.2) { mood = 'sparkle'; tears = 3 }
      if (t >= T.h2) { mood = 'happy'; tears = 1; look = [0, -1] }
      if (t > T.cry3 - 0.2) { mood = 'sparkle'; tears = 3 }
      if (t > 12.0) tears = 2
      pisces(x, t, { ...PIS_A, pop: pop01(t, 0.4, 0.36, 2) * outK(t, [T.cut - 0.1, T.cut]), hops: PIS_HOPS }, tears, mood, look)
      return
    }
    // the date
    let pm = 'happy', pt = 1, pl = [1, 0]
    if (t > T.answer + 0.3) { pm = 'sparkle'; pt = 2 }
    if (t > T.cry4 - 0.1) { pm = 'sparkle'; pt = 3 }
    if (t > T.slump) { pm = 'wide'; pt = 1 }
    if (t > T.refill[1]) { pm = 'happy'; pt = 3 }
    pisces(x, t, { ...PIS_B, pop: pop01(t, T.cut + 0.05, 0.3, 2) * o, hops: PIS_HOPS }, pt, pm, pl)
    let sm = 'neutral', sl = [-1, 0]
    if (t > T.answer) sm = 'happy'
    if (t > T.dateCry) { sm = 'sparkle'; sl = [-1, 0] }
    if (t > T.refill[1]) { sm = 'happy'; sl = undefined }
    const sk = pop01(t, T.dateIn, 0.36, 2.1) * o
    const mv = ease.inOutCubic(prog(t, T.refill[0] - 0.4, T.refill[0]))
    const sX = lerp(SCO_P.x, 950, mv), sY = lerp(SCO_P.y, 975, mv)
    drawStarChar(x, sX, sY, SCO_P.s, t, { color: SCO.color, glyph: SCO.glyph, mood: sm, look: sl, hops: SCO_HOPS, pop: sk, seed: 11, glow: 1.05 })
    if (t > T.dateCry && t < T.refill[1] + 1.5) {
      // the Scorpio's tears (drawn as the same sprite tears via pisces' helper colours)
      for (const s of [-1, 1]) for (let q = 0; q < 3; q++) { const ph = (t * 1.2 + q / 3) % 1; drawBits(x, ['B', 'B'], { B: '#8fe3ff' }, sX + s * 34, sY + 10 + ph * 70, 6, { alpha: (1 - ph) * sk }) }
    }
    speech(t, 800, 855, T.answer, 'lazy sundays… with you?', { life: 1.9, tail: 60 })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, moon: null, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) })
      drawWash(x, t, { warm: (0.8 + 0.6 * clamp(prog(t, T.sun[0], T.sun[1])) * outK(t, T.h0Out)) * popOut(t, T.out) })
      const hh = handheld(t)
      x.save(); x.translate(540 + hh.dx, 960 + hh.dy); x.rotate(hh.rot); x.translate(-540, -960)
      if (t < T.out[1] + 0.02) {
        window_(t); phone(t); mirror(t)
        talkCard(t)
        cast(t)
        table(t)
        const B = boxPose(t)
        // the refill box drops in, sparkling
        if (t > T.refill[0]) {
          const r = easeOutBack(prog(t, ...T.refill), 1.3), o = popOut(t, T.out)
          drawBox(x, t, REFILL.x, lerp(-200, REFILL.y, r), 11 * o, { face: { eyes: t > T.wink && t < T.wink + 0.9 ? 'wink' : 'happy', mouth: 'grin', blush: 1 }, body: '#ffb3cf', dark: '#e07aa6', alpha: clamp(o * 3) })
          sparkles(x, t, REFILL.x, REFILL.y, T.refill[1], 10, 190, 2, [GOLD, BONE, PINK])
        }
        const sal = ease.outBack(prog(t, T.salute, T.salute + 0.3)) * outK(t, [T.out[0] - 0.3, T.out[0]])
        drawBox(x, t, B.px, B.py, B.c, { tissue: B.tissue, face: B.face, sq: B.sq, rot: B.rot, alpha: B.alpha, salute: t > T.salute ? sal : 0 })
        if (t > T.sweat && t < T.cut) for (let k = 0; k < 2; k++) { const ph = (t * 1.3 + k * 0.5) % 1; drawBits(x, ['.S.', 'SSS', 'SSS', '.S.'], { S: '#8fe3ff' }, B.px + 150 + k * 22, B.py - 90 + ph * 80, 7, { alpha: 1 - ph }) }
        if (t > T.empty && t < T.slump) for (let k = 0; k < 3; k++) drawBits(x, ['K', 'K', 'K', '.', 'K'], { K: '#ff4f5e' }, B.px - 30 + k * 30, B.py - 160 + 6 * Math.sin(t * 20 + k), 8, { alpha: pop01(t, T.empty, 0.2, 2) })
        tissues(t, B)
        if (t > T.refill[1]) hearts(x, t, 540, 900, T.refill[1], { n: 8, life: 3, spread: 420, alpha: popOut(t, T.out) })
        speech(t, 360, 790, T.pep, 'you look GREAT.', { life: 2.6, tail: -40, col: '#ffe9a8' })
      }
      x.restore()
      box1.update(t); box2.update(t)
      for (const s of stickers) s.update(t)
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      bug.update(t, outK(t, T.bugOut)); clock.update(t, outK(t, T.bugOut)); bar.update(t, outK(t, T.bugOut))
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      drawGrain(gx, t)
    },
  }
}

// card-cut candidates (cardfx keeps the middle one: 13.4, between the mirror and the date)
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound
const sob = (t0, n = 3, base = 523.25) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * 0.16).toFixed(3), base * (1 - i * 0.06), 0.03, 0.35, -0.4])
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0], ['pop', T.h0Land + 0.2, 1567.98, 0.035, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.bug + 0.16, 0.03],
  ['riser', T.sun[0], T.sun[1], 0.02], ['pop', T.wake, 987.77, 0.035, -0.3], ...sob(T.cry1 - 0.1),
  // lunch
  ...wordPops(T.h1, 3, 0.1, 2, 0.026), ['whoosh', T.phone[0], 0.35, 0.03], ['pop', T.ping, 1567.98, 0.05, -0.3], ['pop', T.ping + 0.08, 1975.53, 0.035, -0.3], ...sob(T.cry2 - 0.1, 4),
  ['whoosh', T.phoneOut[0], 0.3, 0.025],
  // the mirror
  ...wordPops(T.h2, 4, 0.1, 1, 0.026), ['pop', T.mirror[0] + 0.1, 880, 0.035, -0.3], ['pop', T.pep, 1318.51, 0.035, -0.3], ...sob(T.cry3 - 0.1),
  ['pluck', T.sweat, 392, 0.03, 0.5, 0.3], ['pluck', T.sweat + 0.18, 370, 0.03, 0.5, 0.3],
  // the date
  ...wordPops(T.h3, 4, 0.1, 3, 0.026), ['pop', T.dateIn + 0.05, 659.25, 0.04, 0.3], ['whoosh', T.cardIn[0], 0.35, 0.03], ['pluck', T.cardIn[1], 1318.51, 0.04, 0.6, 0],
  ['pop', T.answer, 1174.66, 0.035, 0.3], ...sob(T.cry4 - 0.1), ['pluck', T.dateCry, 440, 0.03, 0.5, 0.4], ['pluck', T.dateCry + 0.16, 415, 0.03, 0.5, 0.4],
  ['pop', T.empty, 330, 0.05, 0], ['pop', T.empty + 0.1, 262, 0.045, 0], ['tick', T.empty + 0.2, 0.04],
  // clock out
  ...wordPops(T.h4, 4, 0.1, 0, 0.026), ['pluck', T.slump, 294, 0.035, 0.8, 0], ['whoosh', T.refill[0], 0.35, 0.035], ['tick', T.refill[1], 0.07],
  ['bell', T.refill[1] + 0.05, 1760, 0.03, 1.0, 0.3], ['glitter', T.refill[1], T.refill[1] + 0.6],
  // overtime, again
  ...wordPops(T.h5, 3, 0.14, 2, 0.03), ['pop', T.salute, 1318.51, 0.045, -0.2], ['pop', T.wink, 1567.98, 0.045, 0.3], ['bell', T.wink + 0.05, 2349.32, 0.025, 1.0, 0.3], ['glitter', T.wink, T.wink + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...EMIT.map(([t0], i) => ['whoosh', +t0.toFixed(3), 0.22, 0.02 + 0.004 * (i % 3)]),
  ...clockCues(STAMPS), ...STICK.flatMap((s, i) => stickerCue(s.at, i)),
  ...talkCues(LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
