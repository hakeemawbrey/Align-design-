// trdayporch: A DAY IN THE LIFE OF… a porch light (30 s vertical, Star Talk Trends §10.4, music: lofi · Db)
// Story 0–25.6, then the shared end card. The vlog look lives in ./day.js (identical in all five trday films).
//   0.0–5.0   7:30 PM "A day in the life of… | *a porch light.*"  Click: the lamp flickers on, a little moth arrives.
//             "on at dusk. nobody's home yet. I *wait*." Sticker "job: *glowing*".
//   5.0–9.3   9:00 → 9:45 → 10:30 PM "Waiting… | *and waiting.*"  The clock skips ahead; the lamp leans to peek down
//             the path, the moth naps. "it's 10:30. not that I'm *counting*." Sticker "status: *not worried*".
//   9.3–13.3  10:52 PM "They're back: | *places.*"  ♍ and ♌ walk up the path. The lamp flares with joy, catches
//             itself and dims to mood lighting. "they're back! act cool. *dim*, a little." Sticker "brightness: *romantic*".
//  13.4       card cut.
//  13.4–18.6  10:58 PM "The goodbye: | *give them a moment.*"  "so…" "so…" "goodnight!" "goodnight!" "ok bye" "bye!"
//             "…goodnight." The lamp shuts its eyes and hums (notes). "I'm not looking. I'm a *lamp*."
//             Sticker "goodbye #3 (*still going*)".
//  18.6–22.4  11:04 PM "Walk home: | *safe.*"  ♌ heads home; the lamp throws a long beam down the path. ♍ waits on the
//             porch… a phone bubble: "home safe :)". "staying on till they text *home safe*." Sticker "shift: *extended*".
//  22.4–25.5  "*Lights* | stay on."  The lamp glows warm and winks. Everything pops out by 25.5.
import { clamp, lerp, prog, ease, el, noise1 } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
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
const VIR = signStar('virgo'), LEO = signStar('leo')

// ── the timeline
const T = {
  black: [0, 0.3], bug: 0.35,
  h0: 0.15, h0Land: 0.85, h0Out: [4.75, 4.95], click: 1.0, flick: [1.0, 1.7], mothIn: 2.0,
  h1: 5.0, h1Out: [9.05, 9.25], skip1: 6.35, skip2: 7.55, peek: [7.7, 8.2],
  h2: 9.35, h2Out: [12.95, 13.15], walk: [9.35, 10.4], flare: 10.45, dim: [10.95, 11.6],
  cut: 13.4,
  h3: 13.45, h3Out: [18.4, 18.6], away: 15.0,
  h4: 18.65, h4Out: [22.2, 22.4], leave: [19.0, 20.8], beam: [18.9, 19.5], safe: 21.15,
  h5: 22.5, wink: 22.95,
  out: [25.05, 25.45], h5Out: [25.15, 25.45], bugOut: [25.3, 25.55],
}
const BYES = [[13.75, 'L', 'so…'], [14.2, 'V', 'so…'], [14.75, 'L', 'goodnight!'], [15.2, 'V', 'goodnight!'], [16.05, 'L', 'ok bye'], [16.5, 'V', 'bye!'], [17.2, 'L', '…goodnight.']]
const SPEAK = 'THE PORCH LIGHT', SC = '#ffd36e'
const LINES = [
  { t: 2.3, speaker: SPEAK, color: SC, text: "on at dusk. nobody's home yet. I *wait*." },
  { t: 5.8, speaker: SPEAK, color: SC, text: "it's 10:30. not that I'm *counting*." },
  { t: 9.5, speaker: SPEAK, color: SC, text: "they're back! act cool. *dim*, a little." },
  { t: 15.3, speaker: SPEAK, color: SC, text: "I'm not looking. I'm a *lamp*." },
  { t: 18.9, speaker: SPEAK, color: SC, text: 'staying on till they text *home safe*.' },
]
const CPS = 30
const BOX1 = { open: 2.1, close: 13.15 }, BOX2 = { open: 15.1, close: 22.1 }
const BEATS = [{ t: 0, text: '7:30 PM' }, { t: T.h1, text: '9:00 PM' }, { t: T.h2, text: '10:52 PM' }, { t: T.h3, text: '10:58 PM' }, { t: T.h4, text: '11:04 PM' }, { t: T.h5, text: '11:21 PM' }]
const STAMPS = [...BEATS.slice(0, 2), { t: T.skip1, text: '9:45 PM' }, { t: T.skip2, text: '10:30 PM' }, ...BEATS.slice(2)]
const STICK = [
  { text: 'job: *glowing*', x: 280, y: 700, rot: -4, at: 3.2, out: [4.7, 4.95] },
  { text: 'status: *not worried*', x: 300, y: 690, rot: 3, at: 6.9, out: [9.0, 9.25] },
  { text: 'brightness: *romantic*', x: 310, y: 640, rot: -3, at: 11.4, out: [12.9, 13.15] },
  { text: 'goodbye #3 (*still going*)', x: 330, y: 620, rot: 3, at: 15.8, out: [18.35, 18.6] },
  { text: 'shift: *extended*', x: 290, y: 650, rot: -3, at: 20.0, out: [22.15, 22.4] },
]
const CUTS = [9.3, { t: T.cut, kind: 'flip' }, 18.62]

// layout
const WALL = { x0: 520, y0: 600, y1: 1270 }
const DOOR = { x: 820, w: 200, h: 400 }
const LAMP = { x: 615, y: 850, c: 12 }
const VIRP = { x: 760, y: 1160, s: 200 }, LEOP = { x: 450, y: 1170, s: 200 }
const PISP = { x: 110, y: 1260, s: 100 }
const LEO_HOPS = [9.6, 9.95, 10.3, ...BYES.filter(b => b[1] === 'L').map(b => b[0]), T.leave[0], T.leave[0] + 0.4, T.leave[0] + 0.8, T.leave[0] + 1.2]
const VIR_HOPS = [9.75, 10.1, 10.45, ...BYES.filter(b => b[1] === 'V').map(b => b[0]), T.safe, T.safe + 0.4, T.wink]
const LAMP_HOPS = [T.click + 0.7, T.flare, T.skip1, T.skip2, T.wink, ...talkHops(LINES, SPEAK, { cps: CPS })]

// ── the lamp: a pixel wall lantern (cap, glass with a face, bracket)
function eyeBM(kind, lx = 0, ly = 0) {
  if (kind === 'shut') return ['KKKK']
  if (kind === 'happy') return ['.KK.', 'K..K']
  if (kind === 'bored') return ['KKKK', 'WKKW', '.WW.']
  const wide = kind === 'wide'
  const w = wide ? 5 : 4, h = wide ? 6 : 5, ps = wide ? 1 : 2
  const rows = Array.from({ length: h }, (_, j) => Array.from({ length: w }, (_, i) => ((i === 0 || i === w - 1) && (j === 0 || j === h - 1)) ? '.' : 'W'))
  const px = clamp(Math.round((w - ps) / 2 + lx), 0, w - ps), py = clamp(Math.round((h - ps) / 2 + ly), 1, h - 1 - ps)
  for (let j = 0; j < ps; j++) for (let i = 0; i < ps; i++) rows[py + j][px + i] = 'K'
  return rows.map(r => r.join(''))
}
const MOUTH = { smile: ['K...K', '.KKK.'], grin: ['KKKKK', 'KRRRK', '.KKK.'], o: ['.KK.', 'K..K', '.KK.'], flat: ['KKKK'], wavy: ['K.K.K', '.K.K.'], hum: ['.K.', 'K.K', '.K.'] }
const FCOL = { W: '#ffffff', K: INK, R: '#ff8fa0' }
const LANTERN = [
  '....MMMMMM....',
  '..MMMMMMMMMM..',
  '.MMMMMMMMMMMM.',
  'MMMMMMMMMMMMMM',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '.MGGGGGGGGGGM.',
  '..MMMMMMMMMM..',
  '....MMMMMM....',
  '.....MMMM.....',
]
function drawLamp(x, t, cx, cy, c, b, face, { sq = 0, rot = 0, alpha = 1 } = {}) {
  if (alpha <= 0.01) return
  const on = clamp(b)
  const glass = on > 0.05 ? `rgb(${Math.round(lerp(70, 255, on))},${Math.round(lerp(60, 222, on))},${Math.round(lerp(90, 140, on))})` : '#463c5a'
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(1 + sq, 1 - sq * 0.9)
  // bracket to the wall
  x.fillStyle = INK; x.fillRect(-c * 9.5, -c * 3, c * 3, c * 1.6); x.fillRect(-c * 9.5, -c * 3, c * 1.6, c * 6)
  if (on > 0.05) { x.save(); x.globalCompositeOperation = 'lighter'; const hg = x.createRadialGradient(0, 0, c * 3, 0, 0, c * 14); hg.addColorStop(0, `rgba(255,220,140,${(0.45 * on).toFixed(3)})`); hg.addColorStop(1, 'rgba(255,220,140,0)'); x.fillStyle = hg; x.fillRect(-c * 14, -c * 14, c * 28, c * 28); x.restore() }
  drawBits(x, LANTERN, { M: '#2c2440', G: glass }, 0, 0, c)
  if (on > 0.05) { x.fillStyle = `rgba(255,251,234,${(0.7 * on).toFixed(3)})`; x.fillRect(-c * 4.5, -c * 4.5, c, c * 4) }
  let { eyes = 'open', mouth = 'smile', look = [0, 0], blush = 0 } = face
  if (eyes === 'open' || eyes === 'wide') { const ph = (t * 0.29 + 0.4) % 1; if (ph < 0.04) eyes = 'shut' }
  const L = eyes === 'wink' ? 'happy' : eyes, R = eyes === 'wink' ? 'open' : eyes
  const ey = -c * 0.5, dx = c * 2.6
  drawBits(x, eyeBM(L, look[0], look[1]), FCOL, -dx, ey, c * 0.9, { outline: null })
  drawBits(x, eyeBM(R, look[0], look[1]), FCOL, dx, ey, c * 0.9, { outline: null })
  if (blush > 0) for (const s of [-1, 1]) { x.fillStyle = `rgba(255,110,140,${(0.7 * blush).toFixed(3)})`; x.fillRect(s * dx - c * 1.3, ey + c * 2.2, c * 2.6, c * 0.9) }
  drawBits(x, MOUTH[mouth], FCOL, 0, ey + c * 4, c * 0.9, { outline: null })
  x.restore()
}

async function build(stage) {
  try { await Promise.all(FONTS.map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'A day in the life of… | *a porch light.*', { top: 176, size: 84, accentSize: 124, at: T.h0, late: 3, lateAt: T.h0Land, wobble: true, accentColor: '#ffd36e' })
  const H1 = popText(root, 'Waiting… | *and waiting.*', { top: 176, size: 100, accentSize: 140, at: T.h1, gap: 0.1, accentColor: '#c9a6ff' })
  const H2 = popText(root, "They're back: | *places.*", { top: 176, size: 100, accentSize: 140, at: T.h2, gap: 0.1, accentColor: GOLD })
  const H3 = popText(root, 'The goodbye: | *a moment.*', { top: 176, size: 100, accentSize: 140, at: T.h3, gap: 0.1, accentColor: '#ff8fb1' })
  const H4 = popText(root, 'Walk home: | *safe.*', { top: 176, size: 100, accentSize: 140, at: T.h4, gap: 0.1, accentColor: '#9fe6b0' })
  const H5 = popText(root, '*Lights* | stay on.', { top: 176, size: 120, accentSize: 170, at: T.h5, gap: 0.14, wobble: true, accentColor: '#ffd36e' })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out]]
  const stickers = STICK.map(s => buildSticker(root, s))
  const box1 = dialogueBox(root, { lines: LINES.slice(0, 3), y: 1400, ...BOX1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES.slice(3), y: 1400, ...BOX2, cps: CPS })
  const bug = buildBug(root, { at: T.bug })
  const clock = buildClock(root, { stamps: STAMPS, at: T.bug + 0.1 })
  const bar = buildProgress(root, { end: STORY_END, marks: BEATS.slice(1).map(s => s.t), at: T.bug + 0.15 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function speech(t, cx, cy, t0, text, { col = BONE, size = 30, life = 1.4, tail = 0 } = {}) {
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

  // brightness of the lamp at t (0 off … 1 normal … 1.5 flare)
  function bright(t) {
    if (t < T.click) return 0
    let b = 1
    if (t < T.flick[1]) { const p = prog(t, ...T.flick); b = (noise1(t * 30, 4) > 0.45 - 0.5 * p ? 1 : 0.15) * (0.6 + 0.4 * p) }
    if (t > T.flare) b = 1 + 0.6 * Math.exp(-(t - T.flare) * 3)
    if (t > T.dim[0]) b = lerp(b, 0.62, ease.inOutCubic(prog(t, ...T.dim)))
    if (t > T.beam[0]) b = lerp(0.62, 1.25, ease.inOutCubic(prog(t, ...T.beam)))
    if (t > T.h5) b = 1.25 + 0.15 * Math.sin(t * 3)
    return b * popOut(t, T.out)
  }

  function house(t) {
    const k = clamp(prog(t, 0, 0.5)) * popOut(t, T.out)
    if (k <= 0.01) return
    x.save(); x.globalAlpha *= k
    const C = 10
    // ground + the path
    x.fillStyle = '#120b28'; x.fillRect(0, WALL.y1, 1080, 1920 - WALL.y1)
    x.fillStyle = INK; x.fillRect(0, WALL.y1 - 6, 1080, 8)
    x.fillStyle = '#2a2150'
    x.beginPath(); x.moveTo(560, WALL.y1); x.lineTo(760, WALL.y1); x.lineTo(260, 1920); x.lineTo(-200, 1920); x.closePath(); x.fill()
    // the wall (siding) and the roof edge
    x.fillStyle = '#2b2552'; x.fillRect(WALL.x0, WALL.y0, 1080 - WALL.x0, WALL.y1 - WALL.y0)
    x.fillStyle = '#322b5e'; for (let y = WALL.y0 + 24; y < WALL.y1; y += 34) x.fillRect(WALL.x0, y, 1080 - WALL.x0, 4)
    x.fillStyle = INK; x.fillRect(WALL.x0 - 10, WALL.y0 - 10, 10, WALL.y1 - WALL.y0 + 10)
    x.fillStyle = INK; x.fillRect(WALL.x0 - 50, WALL.y0 - 50, 1080 - WALL.x0 + 60, 50)
    x.fillStyle = '#5a3a6e'; x.fillRect(WALL.x0 - 40, WALL.y0 - 42, 1080 - WALL.x0 + 50, 30)
    // the door
    const dx0 = DOOR.x - DOOR.w / 2, dy0 = WALL.y1 - DOOR.h - 30
    x.fillStyle = INK; x.fillRect(dx0 - C, dy0 - C, DOOR.w + 2 * C, DOOR.h + C)
    x.fillStyle = '#7a3e4e'; x.fillRect(dx0, dy0, DOOR.w, DOOR.h)
    x.fillStyle = '#8f4c5d'; x.fillRect(dx0 + 20, dy0 + 24, DOOR.w - 40, 140); x.fillRect(dx0 + 20, dy0 + 200, DOOR.w - 40, 160)
    x.fillStyle = GOLD; x.fillRect(dx0 + DOOR.w - 40, dy0 + 200, 16, 16)
    // the step
    x.fillStyle = INK; x.fillRect(WALL.x0 - 20, WALL.y1 - 34, 1080 - WALL.x0 + 20, 38)
    x.fillStyle = '#5b4f7e'; x.fillRect(WALL.x0 - 12, WALL.y1 - 28, 1080 - WALL.x0 + 12, 24)
    // a little window with a plant
    x.fillStyle = INK; x.fillRect(960, 700, 140, 170); x.fillStyle = '#463c86'; x.fillRect(972, 712, 116, 146)
    x.restore()
  }

  function light(t, b) {
    if (b <= 0.02) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(LAMP.x, LAMP.y, 20, LAMP.x, LAMP.y, 520 * (0.7 + 0.3 * b))
    g.addColorStop(0, `rgba(255,214,140,${(0.5 * b).toFixed(3)})`); g.addColorStop(0.35, `rgba(255,190,120,${(0.18 * b).toFixed(3)})`); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    const bm = ease.inOutCubic(prog(t, ...T.beam)) * popOut(t, T.out)
    if (bm > 0.01) {
      const g2 = x.createLinearGradient(LAMP.x, LAMP.y, 0, 1700)
      g2.addColorStop(0, `rgba(255,220,150,${(0.24 * bm).toFixed(3)})`); g2.addColorStop(1, 'rgba(255,220,150,0)')
      x.fillStyle = g2; x.beginPath(); x.moveTo(LAMP.x - 20, LAMP.y - 40); x.lineTo(LAMP.x + 30, LAMP.y + 60); x.lineTo(240, 1920); x.lineTo(-300, 1920); x.closePath(); x.fill()
    }
    x.restore()
  }

  function lampFace(t) {
    let f = { eyes: 'shut', mouth: 'flat' }
    if (t > T.click + 0.2) f = { eyes: 'wide', mouth: 'o', look: [0, 0] }
    if (t > T.flick[1] + 0.3) f = { eyes: 'open', mouth: 'smile', look: [-1, 0] }
    if (t > T.mothIn + 0.6 && t < T.h1) f = { eyes: 'happy', mouth: 'smile', look: [0, 0] }
    if (t >= T.h1) f = { eyes: 'bored', mouth: 'flat', look: [-1, 0] }
    if (t > T.skip1) f = { eyes: 'bored', mouth: 'wavy', look: [-1, 0] }
    if (t > T.peek[0]) f = { eyes: 'open', mouth: 'flat', look: [-1, 1] }
    if (t >= T.h2) f = { eyes: 'open', mouth: 'flat', look: [-1, 1] }
    if (t > T.flare - 0.1) f = { eyes: 'wide', mouth: 'grin', look: [-1, 1] }
    if (t > T.dim[0]) f = { eyes: 'open', mouth: 'smile', look: [0, 0], blush: 0.6 }
    if (t > T.away) f = { eyes: 'shut', mouth: 'hum', look: [0, 0] }
    if (t > BYES[6][0]) f = { eyes: 'open', mouth: 'wavy', look: [-1, 1] }
    if (t >= T.h4) f = { eyes: 'open', mouth: 'smile', look: [-1, 1] }
    if (t > T.safe) f = { eyes: 'happy', mouth: 'grin', blush: 1 }
    if (t > T.h5) f = { eyes: t > T.wink && t < T.wink + 0.9 ? 'wink' : 'happy', mouth: 'grin', blush: 1 }
    return f
  }

  function moth(t) {
    if (t < T.mothIn || t > T.h2 + 0.6) return
    const a = (t - T.mothIn) * 3.2, R = 120 + 20 * Math.sin(t * 1.3)
    const nap = t > T.skip2 && t < T.h2
    const leave = prog(t, T.h2, T.h2 + 0.6)
    let mx = LAMP.x + Math.cos(a) * R, my = LAMP.y - 30 + Math.sin(a * 1.3) * R * 0.5
    if (nap) { mx = LAMP.x + 10; my = LAMP.y - 130 }
    mx = lerp(mx, 1200, leave); my = lerp(my, 400, leave)
    const flap = nap ? 0 : Math.sin(t * 40) > 0 ? 1 : 0
    drawBits(x, flap ? ['W...W', 'WWBWW', '.WBW.', '..B..'] : ['.....', 'WWBWW', 'WWBWW', '..B..'], { W: '#e8dcc8', B: '#5a4a3a' }, mx, my, 7, { alpha: pop01(t, T.mothIn, 0.3, 2) })
    if (nap) drawBits(x, ['KKK', '..K', '.K.', 'KKK'], { K: BONE }, mx + 40, my - 30 - 10 * ((t * 0.8) % 1), 5, { outline: null, alpha: 0.8 })
  }

  function couple(t) {
    if (t < T.walk[0] || t > T.out[1]) return
    const o = popOut(t, T.out)
    const w = ease.outCubic(prog(t, ...T.walk))
    const lv = ease.inOutQuad(prog(t, ...T.leave))
    const lx = lerp(-150, LEOP.x, w) + lerp(0, -560, lv), ly = LEOP.y + lerp(0, 260, lv)
    const vx = lerp(-300, VIRP.x, ease.outCubic(prog(t, T.walk[0] + 0.15, T.walk[1] + 0.15))), vy = VIRP.y
    let lm = 'happy', ll = [1, 0], vm = 'happy', vl = [-1, 0]
    if (t > T.h3) { lm = 'sparkle'; vm = 'sparkle' }
    if (t > BYES[4][0]) { lm = 'happy'; vm = 'happy' }
    if (t > BYES[6][0]) { lm = 'heart'; vm = 'heart' }
    if (t > T.leave[0]) { lm = 'happy'; ll = [1, -0.5]; vm = 'sparkle'; vl = [-1, 1] }
    if (t > T.safe) { vm = 'heart'; vl = undefined }
    if (t > T.h5) vm = 'happy'
    drawStarChar(x, vx, vy, VIRP.s, t, { color: VIR.color, glyph: VIR.glyph, mood: vm, look: vl, hops: VIR_HOPS, pop: o, seed: 5, glow: 1 })
    if (lv < 1) drawStarChar(x, lx, ly, LEOP.s * (1 - 0.3 * lv), t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, hops: LEO_HOPS, pop: o, seed: 12, glow: 1, alpha: 1 - ease.inQuad(prog(t, T.leave[1] - 0.4, T.leave[1])) })
    for (const [t0, who, s] of BYES) speech(t, who === 'L' ? LEOP.x - 20 : VIRP.x + 20, 1000, t0, s, { tail: who === 'L' ? 30 : -30, life: who === 'L' && t0 === BYES[6][0] ? 1.6 : 0.9, col: t0 === BYES[6][0] ? '#ffd3e2' : BONE })
    speech(t, VIRP.x + 20, 1010, T.safe, 'home safe :)', { col: '#9fe6b0', life: 25.0 - T.safe })
    if (t > T.safe && t < T.safe + 0.7) sparkles(x, t, VIRP.x + 20, 1010, T.safe, 10, 170, 2, ['#9fe6b0', BONE, GOLD])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, moon: null, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) })
      drawWash(x, t, { warm: 0.7 * popOut(t, T.out) })
      const hh = handheld(t)
      x.save(); x.translate(540 + hh.dx, 960 + hh.dy); x.rotate(hh.rot); x.translate(-540, -960)
      if (t < T.out[1] + 0.02) {
        const b = bright(t)
        house(t)
        light(t, b)
        pisces(x, t, { ...PISP, pop: pop01(t, 0.9, 0.36, 2) * popOut(t, T.out) }, t > T.safe ? 3 : t > BYES[6][0] ? 3 : t > T.h3 ? 2 : 1, t > T.safe ? 'happy' : 'sparkle', [1, -0.5])
        if (t > BYES[6][0]) hearts(x, t, 470, 1080, BYES[6][0], { n: 6, life: 1.6, spread: 160, alpha: outK(t, [T.h3Out[0], T.h3Out[1]]) })
        couple(t)
        let sq = 0
        for (const h of LAMP_HOPS) { const d = t - h; if (d > 0 && d < 0.5) sq = 0.07 * Math.sin(d * 18) * Math.exp(-d * 6) }
        const lean = ease.inOutCubic(prog(t, ...T.peek)) * outK(t, [T.h2 - 0.1, T.h2 + 0.3])
        const away = ease.inOutCubic(prog(t, T.away - 0.2, T.away + 0.2)) * outK(t, [BYES[6][0] - 0.1, BYES[6][0] + 0.15])
        const o = popOut(t, T.out)
        drawLamp(x, t, LAMP.x - 26 * lean, LAMP.y, LAMP.c * o, b, lampFace(t), { sq, rot: -0.22 * lean + 0.12 * away, alpha: clamp(o * 3) })
        // humming notes while it looks away
        if (away > 0.05) for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; drawBits(x, ['.KK', '.K.', 'KK.', 'KK.'], { K: GOLD }, LAMP.x + 90 + ph * 50, LAMP.y - 60 - ph * 120, 7, { alpha: Math.sin(Math.PI * ph) * away }) }
        if (t > T.flare && t < T.flare + 0.7) sparkles(x, t, LAMP.x, LAMP.y, T.flare, 10, 170, 1, [GOLD, BONE, '#ffd36e'])
        if (t > T.wink && t < T.wink + 0.7) sparkles(x, t, LAMP.x, LAMP.y, T.wink, 12, 190, 3, [GOLD, BONE, '#ffd36e'])
        moth(t)
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

// card-cut candidates (cardfx keeps the middle one: 13.4, between the arrival and the goodbye)
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'bl br' }), cardCuts(CUTS)]

// ── sound
export const CUES = [
  ...wordPops(T.h0, 5, 0.07, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0], ['pop', T.h0Land + 0.2, 1567.98, 0.035, 0],
  ['pop', T.bug + 0.06, 880, 0.03, -0.4], ['tick', T.bug + 0.16, 0.03],
  ['tick', T.click, 0.08], ['tick', T.click + 0.02, 0.05], ...[0.12, 0.27, 0.36, 0.55].map(d => ['tick', +(T.click + d).toFixed(3), 0.025]), ['bell', T.flick[1], 1760, 0.025, 0.9, 0],
  ['pop', T.mothIn, 1975.53, 0.02, 0.4],
  // waiting
  ...wordPops(T.h1, 4, 0.1, 2, 0.026), ['pluck', T.skip1 + 0.15, 294, 0.03, 0.7, 0], ['pluck', T.skip2 + 0.15, 262, 0.03, 0.7, 0], ['whoosh', T.peek[0], 0.3, 0.02],
  // they're back
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ...[9.6, 9.95, 10.3, 9.75, 10.1, 10.45].map((d, i) => ['tick', d, 0.025 + 0.004 * (i % 2)]),
  ['pop', T.flare, 1567.98, 0.05, -0.2], ['pop', T.flare + 0.07, 1975.53, 0.04, -0.2], ['glitter', T.flare, T.flare + 0.4],
  ['pluck', T.dim[0], 784, 0.03, 0.6, -0.2], ['pluck', T.dim[0] + 0.2, 659.25, 0.03, 0.6, -0.2],
  // the goodbye
  ...wordPops(T.h3, 6, 0.1, 3, 0.024), ...BYES.map(([t0, who], i) => ['pop', t0, who === 'L' ? 880 : 1174.66, 0.03, who === 'L' ? -0.3 : 0.3]),
  ...[0, 0.35, 0.7, 1.05, 1.4].map((d, i) => ['pluck', +(T.away + 0.3 + d).toFixed(3), [784, 880, 988, 880, 784][i], 0.018, 0.5, -0.3]),
  ['pluck', BYES[6][0] + 0.3, 1174.66, 0.04, 0.6, 0], ['glitter', BYES[6][0] + 0.2, BYES[6][0] + 0.6],
  // walk home
  ...wordPops(T.h4, 3, 0.1, 0, 0.026), ['riser', T.beam[0], T.beam[1], 0.025], ['whoosh', T.leave[0], 0.4, 0.025],
  ['pop', T.safe, 1567.98, 0.05, 0.3], ['pop', T.safe + 0.08, 1975.53, 0.04, 0.3], ['bell', T.safe + 0.1, 1760, 0.03, 1.0, 0.3], ['glitter', T.safe, T.safe + 0.5],
  // lights stay on
  ...wordPops(T.h5, 3, 0.14, 2, 0.03), ['pop', T.wink, 1567.98, 0.045, -0.2], ['bell', T.wink + 0.05, 2349.32, 0.025, 1.0, -0.2], ['glitter', T.wink, T.wink + 0.4],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...clockCues(STAMPS), ...STICK.flatMap((s, i) => stickerCue(s.at, i)),
  ...talkCues(LINES, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
