// srpattern (30 s vertical, Star Talk Remix of "Same person, different name" / promo/films/pattern) · story 0–25.6, then
// the shared end card. THE STARS (gold) watch you fall for the same person again, with ♓ Pisces sobbing in the back.
//   0.00–6.60  "You keep falling | for the *same person.*"  three profile cards deal in, Cole / Dev / Kofi: the same grey
//              silhouette in worse and worse disguises (a moustache, then sunglasses) and the SAME three red flags. The star
//              squints harder at each. THE STARS: "different name. *same* red flags."
//   6.70–12.20 "Different name. | *Same ending.*"  three phones play the same chat in sync: "you're honestly amazing" →
//              "so… what are we?" → "it's not you, it's me." ♓ Pisces sobs at the third. THE STARS (eye-roll):
//              "we've seen this episode. *three times.*"
//   12.27 cut (music drop) → "What if you saw it | *coming?*"  two charts, YOU and THEM, and the Push / Pull / Align
//              reading draws between them, row by row. THE STARS: "here's how you two *actually* fit." →
//              "see the pattern *before* you fall."
//   18.38      ★ LESSON UNLOCKED: "If the ending repeats, | change the *beginning.*" (+1 PLOT TWIST)
//   22.65 cut → "Break the | *pattern.*"  a loop of red flags circles the star… it hops and the loop snaps. Out by 25.45.
// One canvas (sky + stars + props), DOM type + two dialogue boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, READING, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', RED = '#ff5a4e'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const PISCES = signStar('pisces')

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.12, h0Out: [6.38, 6.56], cards: [0.55, 1.6, 2.65], cardsOut: [6.3, 6.6], open1: 3.72,
  cut1: 6.65,
  h1: 6.75, h1Land: 7.15, h1Out: [12.0, 12.18], phones: 6.72, bubbles: [7.35, 8.0, 8.65], phonesOut: [11.95, 12.2], sob: 8.75, roll: [10.75, 11.5], close1: 12.18,
  cut2: 12.27,
  h2: 12.33, h2Land: 12.75, h2Out: [18.1, 18.3], charts: 12.35, rows: [13.35, 13.95, 14.55], open2: 12.75, close2: 18.32, readOut: [18.2, 18.55],
  lesson: 18.38, lessonOut: [22.4, 22.6],
  cut3: 22.65,
  h3: 22.72, h3Land: 23.12, loop: 22.7, snap: 23.7, wink: [24.35, 24.8], h3Out: [25.1, 25.4], out: [25.05, 25.45],
}
const SPEAK = 'THE STARS'
const LINES1 = [
  { t: 3.92, speaker: SPEAK, text: 'different name. *same* red flags.', color: RED },
  { t: 9.05, speaker: SPEAK, text: "we've seen this episode. *three times.*" },
]
const LINES2 = [
  { t: 12.95, speaker: SPEAK, text: "here's how you two *actually* fit." },
  { t: 15.6, speaker: SPEAK, text: 'see the pattern *before* you fall.' },
]
const CPS = 30
const HOPS = [...talkHops(LINES1, SPEAK, { cps: CPS }), ...talkHops(LINES2, SPEAK, { cps: CPS })]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'If the ending repeats, | change the *beginning.*', chip: '+1 PLOT TWIST' }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, scale = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(scale, scale)
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
const FLAG = ['PRRRR', 'PRRRR', 'PRRR.', 'P....', 'P....', 'P....']
const FLAG_C = { P: '#d9d2e8', R: RED }
const TEAR = ['.X.', 'XWX', 'XXX', '.X.']

// ── layout
const STAR_A = { x: 880, y: 1290, size: 250 }     // beats 1–2, bottom right
const PISCES_P = { x: 175, y: 1320, size: 180 }
const STAR_C = { x: 540, y: 815, size: 190 }      // beat 3, between the charts
const FINAL = { x: 540, y: 1060, size: 420 }
const PROFILES = [
  { name: 'Cole, 31', acc: null, x: 255, y: 950, rot: -0.1 },
  { name: 'Dev, 26', acc: 'stache', x: 530, y: 985, rot: 0.05 },
  { name: 'Kofi, 30', acc: 'shades', x: 790, y: 945, rot: 0.08 },
]
const FLAGS = ['not looking for labels', 'just got out of something', 'bad at texting lol']
const PHONES = [{ x: 235, y: 930, s: 0.74, rot: -0.1, name: 'Cole' }, { x: 845, y: 930, s: 0.74, rot: 0.1, name: 'Kofi' }, { x: 540, y: 900, s: 1.08, rot: 0, name: 'Dev' }]
const BUBBLES = [{ me: false, lines: ["you're honestly", 'amazing'] }, { me: true, lines: ['so… what are we?'] }, { me: false, lines: ["it's not you,", "it's me."] }]
const CH_L = { x: 255, y: 815, r: 165 }, CH_R = { x: 825, y: 815, r: 165 }
const ROWS = [
  { k: 'PUSH', d: "where you'll rub", c: READING.push, y: 1095 },
  { k: 'PULL', d: 'what draws you in', c: READING.pull, y: 1195 },
  { k: 'ALIGN', d: 'where it holds', c: READING.align, y: 1295 },
]

function heroState(t) {
  if (t < T.cards[1]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.cards[2]) return { mood: 'squint', look: [-1, 0] }
  if (t < T.cards[2] + 0.6) return { mood: 'wide', look: [-1, 0], blink: false }
  if (t < T.phones) return { mood: 'squint', look: [-1, 0] }
  if (t < T.bubbles[2]) return { mood: 'neutral', look: [-1, -1] }
  if (t >= T.roll[0] && t < T.roll[1]) return { mood: 'eyeroll', blink: false }
  if (t < T.cut2) return { mood: 'squint', look: [-1, -1] }
  if (t < T.rows[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.lesson) return { mood: 'sparkle', look: [0, 1] }
  if (t < T.cut3) return { mood: 'happy' }
  if (t < T.snap) return { mood: 'squint', look: [0, -1], blink: false }
  if (t < T.snap + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'sparkle', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 46px Inter", "600 26px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "400 22px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'You keep falling | for the *same person.*', { top: 200, size: 96, accentSize: 140, at: T.h0, gap: 0.07, late: 2, lateAt: T.h0 + 0.55, lateGap: 0.12, wobble: true, accentColor: RED, lineHeight: 1.04 })
  const H1 = popText(root, 'Different name. | *Same ending.*', { top: 200, size: 104, accentSize: 168, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, lateGap: 0.12, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const H2 = popText(root, 'What if you saw it | *coming?*', { top: 200, size: 100, accentSize: 176, at: T.h2, gap: 0.07, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H3 = popText(root, 'Break the | *pattern.*', { top: 230, size: 130, accentSize: 230, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1440, width: 960, height: 300, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1440, width: 960, height: 300, open: T.open2, close: T.close2, cps: CPS })
  const lesson = buildLesson(root, LESSON)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function burst(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, '#ffd98a'], dur = 0.7, sz = 26) {
    const tt = t - t0
    if (tt < 0 || tt > dur) return
    const p = ease.outCubic(tt / dur)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / dur)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.4 + 0.8 * p), cy + Math.sin(a) * R * (0.4 + 0.8 * p), sz * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  // ── a profile card: grey photo with a pixel silhouette (+ disguise), the name, the same three red flags
  function drawProfile(P, k, alpha) {
    const w = 440, h = 610
    x.save(); x.globalAlpha = alpha; x.translate(P.x, P.y); x.rotate(P.rot); x.scale(k, k)
    x.shadowColor = 'rgba(2,2,10,0.6)'; x.shadowBlur = 40; x.shadowOffsetY = 18
    x.fillStyle = '#1c1a25'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26); x.fill()
    x.shadowColor = 'transparent'
    x.strokeStyle = 'rgba(239,230,214,0.18)'; x.lineWidth = 2; x.stroke()
    // photo
    const ph = 300, py = -h / 2 + 16
    x.save(); x.beginPath(); x.roundRect(-w / 2 + 16, py, w - 32, ph, 16); x.clip()
    const g = x.createLinearGradient(0, py, 0, py + ph); g.addColorStop(0, '#4a4757'); g.addColorStop(1, '#2a2833'); x.fillStyle = g; x.fillRect(-w / 2, py, w, ph)
    const c = 12, sil = '#16141d'
    // head + shoulders in chunky cells
    const head = ['..XXXX..', '.XXXXXX.', 'XXXXXXXX', 'XXXXXXXX', 'XXXXXXXX', '.XXXXXX.', '..XXXX..']
    const body = ['....XXXXXX....', '..XXXXXXXXXX..', '.XXXXXXXXXXXX.', 'XXXXXXXXXXXXXX', 'XXXXXXXXXXXXXX']
    head.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { x.fillStyle = sil; x.fillRect(-4 * c + i * c, py + 60 + j * c, c, c) } }))
    body.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === 'X') { x.fillStyle = sil; x.fillRect(-7 * c + i * c, py + 60 + 8 * c + j * c, c, c) } }))
    if (P.acc === 'stache') { x.fillStyle = '#5a3a26'; x.fillRect(-2.5 * c, py + 60 + 4.6 * c, 5 * c, c * 0.9); x.fillRect(-3 * c, py + 60 + 5.2 * c, c, c * 0.8); x.fillRect(2 * c, py + 60 + 5.2 * c, c, c * 0.8) }
    if (P.acc === 'shades') { x.fillStyle = '#05040c'; x.fillRect(-3.4 * c, py + 60 + 2.2 * c, 3 * c, 1.4 * c); x.fillRect(0.4 * c, py + 60 + 2.2 * c, 3 * c, 1.4 * c); x.fillRect(-0.5 * c, py + 60 + 2.4 * c, c, c * 0.5); x.fillStyle = '#9fd6ff'; x.fillRect(-3 * c, py + 60 + 2.4 * c, c * 0.8, c * 0.4); x.fillRect(0.8 * c, py + 60 + 2.4 * c, c * 0.8, c * 0.4) }
    x.restore()
    // name
    x.fillStyle = '#f1eef8'; x.font = `700 46px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'
    x.fillText(P.name, -w / 2 + 28, py + ph + 62)
    // the same three red flags
    FLAGS.forEach((f, i) => {
      const yy = py + ph + 98 + i * 54
      x.fillStyle = 'rgba(255,90,78,0.14)'; x.beginPath(); x.roundRect(-w / 2 + 22, yy - 22, w - 44, 44, 22); x.fill()
      drawBits(x, FLAG, FLAG_C, -w / 2 + 50, yy, 5, { outline: null })
      x.fillStyle = '#ffd7d2'; x.font = `400 22px ${MONO}`; x.fillText(f, -w / 2 + 76, yy + 8)
    })
    x.restore()
  }

  function drawProfiles(t) {
    if (t > T.cardsOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.cardsOut))
    PROFILES.forEach((P, i) => {
      const t0 = T.cards[i]
      if (t < t0) return
      const p = prog(t, t0, t0 + 0.35)
      const k = lerp(1.25, 1, easeOutBack(p, 1.6))
      const slide = (1 - ease.outCubic(p)) * 500
      drawProfile({ ...P, x: P.x - slide, rot: P.rot - (1 - p) * 0.3 }, k * 0.84, clamp(p * 3) * ok)
    })
  }

  // ── three phones playing the same chat in sync
  function drawPhones(t) {
    if (t < T.phones || t > T.phonesOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.phonesOut))
    const pw = 360, ph = 580
    PHONES.forEach((P, i) => {
      const p = easeOutBack(prog(t, T.phones + i * 0.1, T.phones + i * 0.1 + 0.35), 1.8)
      if (p <= 0) return
      x.save(); x.globalAlpha = clamp(p * 3) * ok; x.translate(P.x, P.y + (1 - p) * 200); x.rotate(P.rot); x.scale(P.s, P.s)
      x.shadowColor = 'rgba(2,2,10,0.6)'; x.shadowBlur = 40; x.shadowOffsetY = 16
      x.fillStyle = '#0d0c14'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, 40); x.fill()
      x.shadowColor = 'transparent'; x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 3; x.stroke()
      x.fillStyle = '#17161f'; x.beginPath(); x.roundRect(-pw / 2 + 12, -ph / 2 + 12, pw - 24, ph - 24, 30); x.fill()
      // header
      x.fillStyle = '#3c3a48'; x.beginPath(); x.arc(-pw / 2 + 52, -ph / 2 + 58, 20, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#f1eef8'; x.font = `700 32px ${INTER}`; x.textAlign = 'left'; x.fillText(P.name, -pw / 2 + 84, -ph / 2 + 68)
      x.fillStyle = 'rgba(239,230,214,0.15)'; x.fillRect(-pw / 2 + 24, -ph / 2 + 98, pw - 48, 2)
      // bubbles
      let by = -ph / 2 + 130
      BUBBLES.forEach((B, k) => {
        const tb = T.bubbles[k]
        if (t < tb) return
        const bp = easeOutBack(prog(t, tb, tb + 0.25), 2)
        x.font = `600 30px ${INTER}`
        const bw = Math.max(...B.lines.map(s => x.measureText(s).width)) + 36, bh = B.lines.length * 38 + 24
        const bx = B.me ? pw / 2 - 26 - bw : -pw / 2 + 26
        x.save(); x.translate(bx + (B.me ? bw : 0), by); x.scale(bp, bp); x.translate(-(B.me ? bw : 0), 0)
        x.fillStyle = B.me ? '#6a5be0' : '#2f2d3b'; x.beginPath(); x.roundRect(0, 0, bw, bh, 18); x.fill()
        x.fillStyle = '#f4f1fb'; B.lines.forEach((s, j) => x.fillText(s, 18, 44 + j * 38))
        x.restore()
        by += bh + 18
      })
      x.restore()
    })
  }

  // ♓ Pisces in the back, sobbing at "it's not you, it's me."
  function drawPisces(t) {
    const t0 = T.phones + 0.6
    if (t < t0 || t > T.phonesOut[1]) return
    const ok = popOut(t, T.phonesOut)
    const pk = easeOutBack(prog(t, t0, t0 + 0.35), 2) * ok
    const sob = t > T.sob ? Math.abs(Math.sin((t - T.sob) * 9)) * 0.08 : 0
    const r = drawStarChar(x, PISCES_P.x, PISCES_P.y, PISCES_P.size, t, { ...PISCES, mood: t > T.sob ? 'squint' : 'wide', look: [1, -1], pop: pk, squash: sob, seed: 7 })
    if (t > T.sob) for (let i = 0; i < 6; i++) {
      const ph = ((t - T.sob) * 1.4 + i / 6) % 1, side = i % 2 ? 1 : -1
      drawBits(x, TEAR, { X: '#8fd3ff', W: '#e9f7ff' }, Math.round(PISCES_P.x + side * (30 + ph * 60)), Math.round(r.y - 10 + ph * 150 - Math.sin(ph * Math.PI) * 40), 6, { alpha: (1 - ph) * ok })
    }
  }

  // ── two charts + the Push / Pull / Align reading
  function drawChart(C, k, label, t) {
    x.save(); x.globalAlpha *= k
    x.translate(C.x, C.y); x.scale(lerp(0.6, 1, k), lerp(0.6, 1, k))
    x.fillStyle = 'rgba(16,9,38,0.75)'; x.beginPath(); x.arc(0, 0, C.r, 0, Math.PI * 2); x.fill()
    x.strokeStyle = 'rgba(239,230,214,0.6)'; x.lineWidth = 3; x.stroke()
    x.beginPath(); x.arc(0, 0, C.r * 0.72, 0, Math.PI * 2); x.strokeStyle = 'rgba(239,230,214,0.3)'; x.stroke()
    const rot = t * 0.15 * (label === 'YOU' ? 1 : -1)
    for (let i = 0; i < 12; i++) {
      const a = rot + i * Math.PI / 6
      x.beginPath(); x.moveTo(Math.cos(a) * C.r * 0.72, Math.sin(a) * C.r * 0.72); x.lineTo(Math.cos(a) * C.r, Math.sin(a) * C.r); x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 2; x.stroke()
      const g = a + Math.PI / 12
      x.fillStyle = SIGNS[i].color; x.font = `700 24px 'Noto Sans Symbols 2', 'Segoe UI Symbol', sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(SIGNS[i].glyph + '︎', Math.cos(g) * C.r * 0.86, Math.sin(g) * C.r * 0.86)
    }
    x.fillStyle = BONE; x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText(label, 0, 2)
    x.restore()
  }
  function drawReading(t) {
    if (t < T.charts || t > T.readOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.readOut))
    x.save(); x.globalAlpha = ok
    const kL = easeOutBack(prog(t, T.charts, T.charts + 0.4), 1.8), kR = easeOutBack(prog(t, T.charts + 0.12, T.charts + 0.52), 1.8)
    // the reading arcs, drawn as each row lands (behind the charts' discs)
    ROWS.forEach((R, i) => {
      const p = ease.outCubic(prog(t, T.rows[i], T.rows[i] + 0.5))
      if (p <= 0) return
      const apex = [-170, 0, 170][i]
      const a = { x: CH_L.x + CH_L.r * 0.9, y: CH_L.y + apex * 0.4 }, b = { x: CH_R.x - CH_R.r * 0.9, y: CH_R.y + apex * 0.4 }
      x.save(); x.strokeStyle = R.c; x.lineWidth = 8; x.shadowColor = R.c; x.shadowBlur = 18; x.setLineDash([16, 10]); x.lineDashOffset = -t * 40
      x.beginPath()
      const N = 30
      for (let s = 0; s <= N * p; s++) { const u = s / N; const px = lerp(a.x, b.x, u), py = lerp(a.y, b.y, u) + Math.sin(Math.PI * u) * apex * 0.9; s ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke(); x.restore()
    })
    drawChart(CH_L, clamp(kL), 'YOU', t)
    drawChart(CH_R, clamp(kR), 'THEM', t)
    // rows
    ROWS.forEach((R, i) => {
      const p = easeOutBack(prog(t, T.rows[i], T.rows[i] + 0.32), 2)
      if (p <= 0) return
      x.save(); x.globalAlpha *= clamp(p * 3); x.translate(540, R.y); x.scale(lerp(0.7, 1, p), lerp(0.7, 1, p))
      x.fillStyle = 'rgba(13,8,32,0.85)'; x.beginPath(); x.roundRect(-450, -40, 900, 80, 18); x.fill()
      x.strokeStyle = R.c; x.lineWidth = 3; x.stroke()
      x.fillStyle = R.c; x.fillRect(-430, -14, 28, 28)
      x.font = `700 40px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillText(R.k, -385, 2)
      x.fillStyle = BONE; x.font = `600 38px ${INTER}`; x.fillText(R.d, -195, 2)
      x.restore()
    })
    x.restore()
    ROWS.forEach((R, i) => burst(t, 540, R.y, T.rows[i], 8, 200, i, [R.c, BONE], 0.5, 18))
  }

  // ── the last beat: a loop of red flags circles the star, then snaps
  function drawLoop(t, h) {
    if (t < T.loop || !h) return
    const ok = popOut(t, T.out)
    const n = 12, R0 = 300
    const pre = t < T.snap
    for (let i = 0; i < n; i++) {
      const a0 = (i / n) * Math.PI * 2
      if (pre) {
        const k = easeOutBack(prog(t, T.loop + i * 0.03, T.loop + i * 0.03 + 0.3), 2)
        const a = a0 + (t - T.loop) * 2.6
        const px = h.hx + Math.cos(a) * R0 * k, py = h.hy + Math.sin(a) * R0 * 0.75 * k
        if (i % 3 === 0) drawBits(x, FLAG, FLAG_C, Math.round(px), Math.round(py), 7, { alpha: clamp(k), rot: Math.sin(t * 6 + i) * 0.2 })
        else drawPixelStar(x, px, py, 22, 2, RED)
      } else {
        const d = t - T.snap
        if (d > 0.9) continue
        const a = a0 + (T.snap - T.loop) * 2.6
        const px = h.hx + Math.cos(a) * (R0 + d * 900), py = h.hy + Math.sin(a) * (R0 * 0.75 + d * 700)
        if (i % 3 === 0) drawBits(x, FLAG, FLAG_C, Math.round(px), Math.round(py), 7, { alpha: (1 - d / 0.9) * ok, rot: d * 8 })
        else drawPixelStar(x, px, py, 22, 2, i % 2 ? GOLD : BONE)
      }
    }
  }

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    let P = STAR_A
    if (t >= T.cut2) P = STAR_C
    if (t >= T.lesson - 0.2 && t < T.cut3) { const m = ease.inOutCubic(prog(t, T.lesson - 0.2, T.lesson + 0.4)); P = { x: 540, y: lerp(STAR_C.y, 1290, m), size: lerp(STAR_C.size, 300, m) } }
    if (t >= T.cut3) P = FINAL
    const st = heroState(t)
    let sq = 0
    T.cards.forEach((c, i) => { const d = t - c - 0.3; if (d > 0 && d < 0.5) sq += (i === 2 ? -0.16 : -0.08) * Math.exp(-d * 8) * Math.cos(d * 22) })
    const s = t - T.snap
    let lift = 0
    if (t >= T.cut3) {
      if (s > -0.45 && s < 0) sq += 0.14 * ease.inQuad((s + 0.45) / 0.45)                // wind up…
      if (s >= 0 && s < 0.5) { lift = Math.sin(Math.PI * s / 0.5) * 140; sq -= 0.14 * Math.sin(Math.PI * s / 0.5) }
      if (s >= 0.5 && s < 1) sq += 0.18 * Math.exp(-(s - 0.5) * 8) * Math.cos((s - 0.5) * 22)
      sq += 0.03 * Math.sin((t - T.cut3) * 2.4)
    }
    const pin = t >= T.cut3 ? easeOutBack(prog(t, T.cut3 - 0.05, T.cut3 + 0.3), 1.8) : t >= T.cut2 ? easeOutBack(prog(t, T.cut2 - 0.05, T.cut2 + 0.3), 1.8) : easeOutBack(prog(t, 0.1, 0.45), 1.8)
    const r = drawStarChar(x, P.x, P.y - lift, P.size, t, { color: STAR.sky, ...st, pop: pin * ok, squash: sq, seed: 2, hops: t < T.lesson ? HOPS : null, glow: t >= T.cut3 ? 1.25 : 1 })
    return { r, hx: P.x, hy: P.y - lift }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss), dim: t < T.cut2 ? 0.42 : SKY_H.dim })
      if (t < T.out[1] + 0.02) {
        drawProfiles(t)
        drawPhones(t)
        drawPisces(t)
        drawReading(t)
        const h = drawHero(t)
        if (h && t >= T.cut3) {
          drawLoop(t, h)
          burst(t, h.hx, h.hy, T.snap, 16, 340, 0.7)
          burst(t, h.hx, h.hy, T.wink[0], 8, 260, 2.2, [GOLD, PINK], 0.6, 20)
        }
      }
      box1.update(t); box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.65 (cards → phones), 12.27 (the drop → the reading), 18.35 (→ lesson), 22.65 (→ "Break the
// pattern."). cardfx keeps two for a 30 s film: the 12.27 flip and the 22.65 shuffle.
const CUTS = [T.cut1, { t: T.cut2, kind: 'flip' }, 18.35, { t: T.cut3, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.15, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // same person: three cards slap down, each a little lower (it's the same guy)
  ...wordPops(T.h0, 5, 0.07, 0, 0.022), ['pop', T.h0 + 0.55, 1174.66, 0.04, 0], ['pop', T.h0 + 0.67, 1318.51, 0.04, 0],
  ...T.cards.flatMap((c, i) => [['whoosh', c, 0.3, 0.025], ['tick', +(c + 0.3).toFixed(3), 0.06], ['pop', +(c + 0.3).toFixed(3), [440, 392, 330][i], 0.04, 0]]),
  ['chip', T.cards[2] + 0.35, 523.25, 0.5, { ...FX, wave: 'square', duty: 0.25, slide: -10, gain: 0.025, decay: 0.4, sustain: 0.5 }],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS }), ...talkCues(LINES2, { cps: CPS }),
  // same ending: three phones, the chat in sync, Pisces sobs
  ...wordPops(T.h1, 2, 0.08, 1, 0.022), ['pop', T.h1Land, 1174.66, 0.045, 0], ['pop', T.h1Land + 0.12, 1318.51, 0.04, 0],
  ...[0, 1, 2].map(i => ['pop', +(T.phones + i * 0.1).toFixed(3), 587.33 + i * 100, 0.03, i - 1]),
  ...T.bubbles.flatMap((b, i) => [0, 0.04, 0.08].map((d, j) => ['pop', +(b + d).toFixed(3), i === 1 ? 987.77 : 739.99, 0.022, j - 1])),
  ['chip', T.sob, 392, 0.6, { ...FX, wave: 'tri', vib: 0.12, slide: -4, gain: 0.03, decay: 0.5, sustain: 0.7 }],
  ['whoosh', T.roll[0], 0.4, 0.018],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // what if you saw it coming: charts + the reading
  ...wordPops(T.h2, 4, 0.07, 2, 0.022), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.04, 0.6, 0],
  ['pop', T.charts, 587.33, 0.04, -0.4], ['pop', T.charts + 0.12, 739.99, 0.04, 0.4], ['glitter', T.charts, T.charts + 0.4],
  ['pop', T.open2, 739.99, 0.04, 0], ['pop', T.open2 + 0.06, 987.77, 0.03, 0],
  ...T.rows.flatMap((r, i) => [['pluck', r, [880, 987.77, 1174.66][i], 0.04, 0.5, 0], ['tick', r, 0.04]]),
  ['bell', T.rows[2] + 0.05, 1760, 0.024, 1.2, 0],
  ['pop', T.close2, 880, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'A' }),
  // break the pattern
  ...wordPops(T.h3, 2, 0.1, 1, 0.026), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0],
  ['whoosh', T.loop, 0.8, 0.02],
  ['boom', T.snap, 0.12], ['glitter', T.snap, T.snap + 0.6], ['chip', T.snap + 0.02, 659.25, 0.5, { ...FX, wave: 'square', duty: 0.25, arp: [0, 4, 7, 12], gain: 0.025, decay: 0.4, sustain: 0.6 }],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
