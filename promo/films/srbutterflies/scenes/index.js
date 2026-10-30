// srbutterflies (30 s vertical, Star Talk Remix of "Remember butterflies?" / promo/films/butterflies) · story 0–25.6, then
// the shared end card. The ♋ Cancer star (Moon-ruled, the sign of memory) remembers the first crush; THE STARS narrate.
//   0.00–6.60  "Remember | *butterflies?*"  warm, golden flashback tint. A folded note flies in and opens: "do you like me?
//              □ yes □ no". A pencil ticks YES (2.6): Cancer's heart-eyes pound, pixel butterflies flutter out of it.
//              CANCER: "remember when one *note* did all this?"
//   6.70–12.20 "When did dating | get so *numb?*"  cold, grey. A phone flicks faces away, faster and faster; a BUTTERFLIES meter
//              drops a bar per swipe to 0, and Cancer swipes half-asleep (zzz). THE STARS: "babe. you're swiping in your *sleep.*"
//   12.27 cut (music drop) → "Not knowing is | the *best part.*"  a veiled mystery card deals in (photo hidden), then a talk
//              card flips beside it. THE STARS: "no face yet. that's the *fun part.*" One butterfly wobbles out of Cancer…
//              CANCER: "…oh no. they're *back.*" and a whole swarm follows.
//   18.38      ★ LESSON UNLOCKED: "Let yourself be | *curious* again." (+1 BUTTERFLIES)
//   22.65 cut → "Bring back the | *butterflies.*"  Cancer, heart-eyed, in an orbit of butterflies. Out by 25.45.
// One canvas (sky + stars + props), DOM type + two dialogue boxes + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { buildLesson, lessonCues, popText } from '../../lesson.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236', LAV = '#c9a6ff', WARM = '#ffb36b', COLD = '#9fb4d8'
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const CANCER = signStar('cancer')

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.12, h0Out: [6.38, 6.56], note: [0.7, 1.25], unfold: [1.35, 1.75], tick: 2.6, noteOut: [6.25, 6.55], open1: 3.42,
  cut1: 6.65,
  h1: 6.75, h1Land: 7.2, h1Out: [12.0, 12.18], phone: 6.72, swipes: [7.25, 7.85, 8.4, 8.85], yawn: [9.1, 9.9], phoneOut: [11.95, 12.2], close1: 12.18,
  cut2: 12.27,
  h2: 12.33, h2Land: 12.8, h2Out: [18.1, 18.3], card: [12.4, 12.8], talk: [14.2, 14.7], first: 14.95, swarm: 16.35, open2: 13.0, close2: 18.32, propsOut: [18.2, 18.55],
  lesson: 18.38, lessonOut: [22.4, 22.6],
  cut3: 22.65,
  h3: 22.72, h3Land: 23.12, wink: [24.2, 24.65], h3Out: [25.1, 25.4], out: [25.05, 25.45],
}
const C_TAG = '♋ CANCER STAR', SKY = 'THE STARS'
const LINES1 = [
  { t: 3.62, speaker: C_TAG, color: PINK, text: 'remember when one *note* did all this?' },
  { t: 9.25, speaker: SKY, text: "babe. you're swiping in your *sleep.*" },
]
const LINES2 = [
  { t: 13.2, speaker: SKY, text: "no face yet. that's the *fun part.*" },
  { t: 15.6, speaker: C_TAG, color: PINK, text: "…oh no. they're *back.*" },
]
const CPS = 30
const HOPS = [...talkHops(LINES1, C_TAG, { cps: CPS }), ...talkHops(LINES2, C_TAG, { cps: CPS })]
const LESSON = { at: T.lesson, out: T.lessonOut, text: 'Let yourself be | *curious* again.', chip: '+1 BUTTERFLIES', accentColor: PINK }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// ── pixel bits
function drawBits(x, bm, cols, cx, cy, cell, { rot = 0, outline = INK, alpha = 1, sx = 1 } = {}) {
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1)
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
const BFLY = ['XX.....XX', 'XWX...XWX', 'XWWXBXWWX', '.XWXBXWX.', '..XXBXX..', '.XWXBXWX.', '.XX.B.XX.']
const BFLY_COLS = [[PINK, '#ffd1de'], [LAV, '#efe2ff'], [GOLD, '#fff1c8'], ['#7fe0ff', '#e2f8ff']]
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const TICK = ['.......X', '......XX', '.....XX.', 'X...XX..', 'XX.XX...', '.XXX....', '..X.....']

/** one pixel butterfly, flapping (sx squeezes the wings) */
function bfly(x, px, py, t, i, cell = 6, alpha = 1) {
  const [c, l] = BFLY_COLS[i % BFLY_COLS.length]
  const flap = 0.25 + 0.75 * Math.abs(Math.sin(t * 13 + i * 1.7))
  drawBits(x, BFLY, { X: c, W: l, B: '#2a1a40' }, Math.round(px), Math.round(py), cell, { sx: flap, rot: Math.sin(t * 3 + i) * 0.25, alpha })
}

// ── layout
const C1 = { x: 540, y: 1110, size: 360 }        // beat 1
const C2 = { x: 815, y: 1200, size: 270 }        // beat 2 (beside the phone)
const C3 = { x: 860, y: 1270, size: 250 }        // beat 3 (under the talk card)
const CL = { x: 540, y: 1300, size: 300 }        // under the lesson
const FINAL = { x: 540, y: 1080, size: 420 }
const NOTE = { x: 540, y: 790, w: 780, h: 420 }
const PHONE = { x: 330, y: 960, w: 380, h: 660 }
const METER = { x: 800, y: 830 }
const MCARD = { x: 330, y: 905, w: 430 }
const TCARD = { x: 790, y: 860, w: 330 }

function heroState(t) {
  if (t < T.tick) return { mood: 'happy', look: [0, -1] }
  if (t < T.cut1) return { mood: 'heart', look: [0, 0] }
  if (t < T.swipes[2]) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.cut2) return { mood: 'sleepy', zzz: true }
  if (t < T.card[1] + 0.2) return { mood: 'sleepy', zzz: false }
  if (t < T.first) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.swarm) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.lesson) return { mood: 'heart', look: [0, 0] }
  if (t < T.cut3) return { mood: 'happy' }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'heart', look: [0, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 400 52px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [mIm, tIm] = await Promise.all([loadImg('card-profile-3.png'), loadImg('card-talk-1.png')])
  const MC = bake(mIm, 640), TC = bake(tIm, 480)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Remember | *butterflies?*', { top: 200, size: 120, accentSize: 190, at: T.h0, gap: 0.1, late: 1, lateAt: T.h0 + 0.35, wobble: true, accentColor: WARM, lineHeight: 0.98 })
  const H1 = popText(root, 'When did dating | get so *numb?*', { top: 200, size: 104, accentSize: 168, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: COLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Not knowing is | the *best part.*', { top: 200, size: 104, accentSize: 168, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.12, wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H3 = popText(root, 'Bring back the | *butterflies.*', { top: 230, size: 112, accentSize: 190, at: T.h3, gap: 0.1, late: 1, lateAt: T.h3Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box1 = dialogueBox(root, { lines: LINES1.slice(0, 1), y: 1440, width: 960, height: 300, open: T.open1, close: 6.4, cps: CPS })
  const box1b = dialogueBox(root, { lines: LINES1.slice(1), y: 1440, width: 960, height: 300, open: LINES1[1].t - 0.22, close: T.close1, cps: CPS })
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

  // ── beat 1: the folded note
  function drawNote(t) {
    if (t < T.note[0] || t > T.noteOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.noteOut))
    const fly = ease.outCubic(prog(t, ...T.note))
    const un = ease.inOutCubic(prog(t, ...T.unfold))
    const cx = lerp(-300, NOTE.x, fly), cy = NOTE.y + Math.sin(t * 1.6) * 6
    const w = lerp(160, NOTE.w, un), h = lerp(110, NOTE.h, un)
    x.save(); x.globalAlpha = ok; x.translate(cx, cy); x.rotate(lerp(-0.6, -0.04, fly))
    x.shadowColor = 'rgba(2,2,10,0.5)'; x.shadowBlur = 30; x.shadowOffsetY = 14
    x.fillStyle = '#f4ead2'; x.fillRect(-w / 2, -h / 2, w, h)
    x.shadowColor = 'transparent'
    // ruled lines + the fold creases
    x.strokeStyle = 'rgba(110,140,190,0.35)'; x.lineWidth = 2
    for (let yy = -h / 2 + 40; yy < h / 2; yy += 38) { x.beginPath(); x.moveTo(-w / 2 + 10, yy); x.lineTo(w / 2 - 10, yy); x.stroke() }
    x.strokeStyle = 'rgba(120,90,60,0.25)'; x.beginPath(); x.moveTo(0, -h / 2); x.lineTo(0, h / 2); x.moveTo(-w / 2, 0); x.lineTo(w / 2, 0); x.stroke()
    if (un > 0.85) {
      x.globalAlpha = ok * prog(un, 0.85, 1)
      x.fillStyle = '#3b2c58'; x.font = `italic 400 80px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('do you like me?', 0, -78)
      x.font = `italic 400 62px ${SERIF}`
      x.strokeStyle = '#3b2c58'; x.lineWidth = 3
      x.strokeRect(-250, 40, 52, 52); x.fillText('yes', -140, 68)
      x.strokeRect(70, 40, 52, 52); x.fillText('no', 170, 68)
      // the pencil tick on YES
      const tk = prog(t, T.tick, T.tick + 0.25)
      if (tk > 0) drawBits(x, TICK, { X: '#e0473c' }, -218, 52, 13 * easeOutBack(tk, 2), { outline: null })
    }
    x.restore()
  }
  // warm flashback grade (beat 1), cold grade (beat 2)
  function grade(t) {
    const warm = 1 - prog(t, T.cut1 - 0.15, T.cut1 + 0.15)
    const cold = prog(t, T.cut1 - 0.15, T.cut1 + 0.15) * (1 - prog(t, T.cut2 - 0.15, T.cut2 + 0.1))
    if (warm > 0) { x.save(); x.globalAlpha = warm; x.globalCompositeOperation = 'color'; x.globalAlpha = warm * 0.55; x.fillStyle = '#c99a52'; x.fillRect(0, 0, W, 1920); x.globalAlpha = warm; x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(255,205,130,0.10)'; x.fillRect(0, 0, W, 1920); x.restore() }
    if (cold > 0) { x.save(); x.globalAlpha = cold; x.globalCompositeOperation = 'saturation'; x.fillStyle = '#808080'; x.fillRect(0, 0, W, 1920); x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(70,90,130,0.22)'; x.fillRect(0, 0, W, 1920); x.restore() }
  }

  // ── beat 2: the phone flicking faces away + the BUTTERFLIES meter
  function drawPhone(t) {
    if (t < T.phone || t > T.phoneOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.phoneOut))
    const p = easeOutBack(prog(t, T.phone, T.phone + 0.4), 1.6)
    const { w, h } = PHONE
    x.save(); x.globalAlpha = clamp(p * 3) * ok; x.translate(PHONE.x, PHONE.y + (1 - p) * 260); x.rotate(-0.05)
    x.fillStyle = '#0d0c14'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 44); x.fill()
    x.strokeStyle = 'rgba(239,230,214,0.25)'; x.lineWidth = 3; x.stroke()
    x.fillStyle = '#1a1922'; x.beginPath(); x.roundRect(-w / 2 + 12, -h / 2 + 12, w - 24, h - 24, 34); x.fill()
    x.fillStyle = '#e8e6f0'; x.font = `700 32px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.fillText('Discover', -w / 2 + 36, -h / 2 + 70)
    // the face stack: grey photo cards that fly off left on each swipe
    const names = ['Nia, 26', 'Theo, 29', 'Ama, 25', 'Rosa, 28', 'Ivy, 27']
    for (let k = names.length - 1; k >= 0; k--) {
      const sw = k < T.swipes.length ? t - T.swipes[k] : -1
      if (sw > 0.35) continue
      const off = sw > 0 ? ease.inQuad(sw / 0.35) : 0
      const depth = k - T.swipes.filter(s => t > s + 0.2).length
      if (depth > 2) continue
      const cw = w - 60, ch = h - 150
      x.save(); x.translate(-off * 600, 30 + Math.max(0, depth) * 10); x.rotate(-off * 0.5)
      x.fillStyle = '#4a4757'; x.beginPath(); x.roundRect(-cw / 2, -ch / 2, cw, ch, 22); x.fill()
      // a grey silhouette
      x.fillStyle = '#2b2933'; x.beginPath(); x.arc(0, -ch * 0.12, cw * 0.17, 0, Math.PI * 2); x.fill()
      x.beginPath(); x.ellipse(0, ch * 0.24, cw * 0.32, ch * 0.2, 0, Math.PI, 0); x.fill()
      x.fillStyle = '#f1eef8'; x.font = `700 36px ${INTER}`; x.fillText(names[k], -cw / 2 + 24, ch / 2 - 30)
      x.restore()
    }
    // motion smear on each swipe
    T.swipes.forEach(s => { const d = t - s; if (d > 0 && d < 0.3) { x.fillStyle = `rgba(239,230,214,${0.25 * (1 - d / 0.3)})`; for (let i = 0; i < 4; i++) x.fillRect(-w / 2 + 20, -100 + i * 60, w - 40 - i * 40, 8) } })
    x.restore()
    // the BUTTERFLIES meter
    const left = 4 - T.swipes.filter(s => t > s + 0.1).length
    const mp = easeOutBack(prog(t, T.phone + 0.3, T.phone + 0.65), 2)
    x.save(); x.globalAlpha = clamp(mp * 3) * ok; x.translate(METER.x, METER.y); x.scale(mp * 1.3, mp * 1.3)
    x.fillStyle = 'rgba(13,8,32,0.85)'; x.beginPath(); x.roundRect(-190, -70, 380, 140, 18); x.fill(); x.strokeStyle = 'rgba(239,230,214,0.4)'; x.lineWidth = 3; x.stroke()
    x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText('BUTTERFLIES', 0, -30)
    for (let i = 0; i < 4; i++) {
      const on = i < left
      x.fillStyle = on ? PINK : 'rgba(239,230,214,0.12)'; x.fillRect(-150 + i * 78, 0, 64, 40)
    }
    if (left === 0) { x.fillStyle = '#ff5a4e'; x.font = `700 26px ${MONO}`; x.fillText(Math.floor(t * 3) % 2 ? 'EMPTY' : '', 0, 92) }
    x.restore()
  }

  // ── beat 3: the veiled mystery card, the talk card
  function drawCards(t) {
    if (t < T.card[0] || t > T.propsOut[1]) return
    const ok = 1 - ease.inQuad(prog(t, ...T.propsOut))
    const p = prog(t, ...T.card)
    if (MC) {
      const cw = MCARD.w, ch = cw * MC.height / MC.width
      x.save(); x.globalAlpha = clamp(p * 4) * ok
      x.translate(lerp(MCARD.x, MCARD.x, p), lerp(2200, MCARD.y, ease.outCubic(p)) + Math.sin(t * 1.5) * 6); x.rotate(lerp(0.4, -0.05, ease.outCubic(p)))
      x.drawImage(MC, -cw / 2, -ch / 2, cw, ch); x.restore()
    }
    const q = prog(t, ...T.talk)
    if (TC && q > 0) {
      const cw = TCARD.w, ch = cw * TC.height / TC.width
      const sx = Math.abs(Math.cos(Math.PI * (1 - ease.outCubic(q)) * 0.5)) // flips in edge-on
      x.save(); x.globalAlpha = clamp(q * 4) * ok
      x.translate(TCARD.x, TCARD.y + Math.sin(t * 1.7 + 1) * 6); x.rotate(0.06); x.scale(Math.max(0.02, sx), 1)
      x.drawImage(TC, -cw / 2, -ch / 2, cw, ch); x.restore()
      burst(t, TCARD.x, TCARD.y, T.talk[1], 10, 260, 0.6)
    }
  }

  // butterflies: beat 1 (out of the note's YES), beat 3 (one, then a swarm), the lesson + the last beat (an orbit)
  function butterflies(t, h) {
    if (!h) return
    // beat 1
    if (t > T.tick + 0.2 && t < T.cut1) {
      for (let i = 0; i < 6; i++) {
        const born = T.tick + 0.25 + i * 0.35
        if (t < born) continue
        const d = t - born
        const px = h.hx + Math.sin(d * 1.9 + i * 2) * (90 + i * 25) + (i % 2 ? 1 : -1) * d * 30
        const py = h.hy - 120 - d * 110
        bfly(x, px, py, t, i, 7, clamp(1 - prog(t, T.cut1 - 0.4, T.cut1)) * clamp(d * 4))
      }
    }
    // beat 3 → end
    if (t > T.first && t < T.out[1]) {
      const ok = popOut(t, T.out)
      const n = t < T.swarm ? 1 : Math.min(14, 1 + Math.floor((t - T.swarm) * 10))
      for (let i = 0; i < n; i++) {
        const born = i === 0 ? T.first : T.swarm + (i - 1) * 0.1
        const d = t - born
        let px, py
        if (t >= T.cut3) {
          // the final orbit
          const a = t * 0.9 + i * (Math.PI * 2 / 14)
          px = h.hx + Math.cos(a) * (300 + (i % 3) * 40); py = h.hy - 40 + Math.sin(a) * 260 + Math.sin(t * 3 + i) * 20
        } else if (i === 0 && t < T.swarm) {
          // the first one: a wobbly, unsure take-off
          px = h.hx - 40 + Math.sin(d * 4) * 50; py = h.hy - 130 - Math.min(d, 1.2) * 90 + Math.sin(d * 7) * 14
        } else {
          const a = d * (1.2 + (i % 4) * 0.2) + i * 0.9
          px = h.hx - 160 + Math.cos(a) * (180 + i * 22) + Math.sin(d * 2 + i) * 30
          py = h.hy - 240 + Math.sin(a * 1.3) * (150 + i * 12) - Math.min(d, 1) * 80
        }
        const big = t >= T.lesson && t < T.cut3 ? 0.6 : 1
        bfly(x, px, py, t, i, 7, clamp(d * 4) * ok * big)
      }
    }
  }

  function drawHero(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    let P = C1
    if (t >= T.cut1 - 0.05) { const m = ease.inOutCubic(prog(t, T.cut1 - 0.05, T.cut1 + 0.4)); P = { x: lerp(C1.x, C2.x, m), y: lerp(C1.y, C2.y, m), size: lerp(C1.size, C2.size, m) } }
    if (t >= T.cut2) P = C3
    if (t >= T.lesson - 0.2 && t < T.cut3) { const m = ease.inOutCubic(prog(t, T.lesson - 0.2, T.lesson + 0.4)); P = { x: lerp(C3.x, CL.x, m), y: lerp(C3.y, CL.y, m), size: lerp(C3.size, CL.size, m) } }
    if (t >= T.cut3) P = FINAL
    const st = heroState(t)
    let sq = 0
    // heartbeat after the tick
    if (t > T.tick && t < T.cut1) { const b = ((t - T.tick) * 2.2) % 1; sq += 0.09 * Math.exp(-b * 9) - 0.05 * Math.exp(-((b - 0.22) ** 2) * 200) }
    T.swipes.forEach(s => { const d = t - s; if (d > 0 && d < 0.3) sq += 0.04 * Math.sin(Math.PI * d / 0.3) })
    if (t > T.yawn[0] && t < T.yawn[1]) sq -= 0.12 * Math.sin(Math.PI * prog(t, ...T.yawn))
    const sw = t - T.swarm
    if (sw > 0 && sw < 0.6) sq -= 0.15 * Math.exp(-sw * 6) * Math.cos(sw * 20)
    if (t >= T.cut3) sq += 0.03 * Math.sin((t - T.cut3) * 2.4)
    const pin = t >= T.cut3 ? easeOutBack(prog(t, T.cut3 - 0.05, T.cut3 + 0.3), 1.8) : t >= T.cut2 ? easeOutBack(prog(t, T.cut2 - 0.05, T.cut2 + 0.3), 1.8) : easeOutBack(prog(t, 0.15, 0.5), 1.8)
    const r = drawStarChar(x, P.x, P.y, P.size, t, { ...CANCER, ...st, pop: pin * ok, squash: sq, seed: 5, hops: HOPS, glow: t > T.cut1 && t < T.cut2 ? 0.5 : 1.15, bob: t > T.cut1 && t < T.cut2 ? 3 : undefined })
    return { r, hx: P.x, hy: r.y }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss), dim: t > T.cut1 && t < T.cut2 ? 0.35 : SKY_H.dim })
      if (t < T.out[1] + 0.02) {
        drawNote(t)
        drawPhone(t)
        drawCards(t)
        const h = drawHero(t)
        butterflies(t, h)
        if (h) {
          if (t > T.tick && t < T.tick + 1) burst(t, h.hx, h.hy, T.tick + 0.1, 10, 260, 0.2, [PINK, '#ff4f6e', GOLD])
          burst(t, h.hx, h.hy, T.swarm, 14, 300, 1.1, [PINK, LAV, GOLD, BONE])
          burst(t, h.hx, h.hy, T.wink[0], 8, 260, 2.2, [GOLD, PINK], 0.6, 20)
        }
      }
      grade(t)
      box1.update(t); box1b.update(t); box2.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.65 (the note → the phone), 12.27 (the drop → the mystery card), 18.35 (→ lesson), 22.65 (→ the
// last line). cardfx keeps two for a 30 s film: the 12.27 flip and the 22.65 shuffle.
const CUTS = [T.cut1, { t: T.cut2, kind: 'flip' }, 18.35, { t: T.cut3, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE_HZ = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.2, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE_HZ[(base + i) % NOTE_HZ.length], gain, (i % 2 ? 0.15 : -0.15)])
const flutter = (t0, n, gain = 0.012) => Array.from({ length: n }, (_, i) => ['chip', +(t0 + i * 0.05).toFixed(3), 2600 + (i % 3) * 500, 0.03, { ...FX, wave: 'noise', gain, decay: 0.03, sustain: 0.4, pan: (i % 2 ? 0.4 : -0.4) }])
export const CUES = [
  // remember butterflies: the note flies in, unfolds, YES ticks, heartbeat
  ...wordPops(T.h0, 1, 0.1, 0, 0.024), ['pop', T.h0 + 0.35, 1174.66, 0.045, 0], ['pluck', T.h0 + 0.35, 880, 0.03, 0.6, 0],
  ['whoosh', T.note[0], 0.5, 0.03], ['tick', T.unfold[0], 0.04], ['tick', T.unfold[0] + 0.2, 0.04], ['tick', T.unfold[1], 0.05],
  ['tick', T.tick, 0.06], ['pop', T.tick + 0.1, 1318.51, 0.04, 0], ['bell', T.tick + 0.12, 1760, 0.024, 1.2, 0],
  ...[0, 1, 2, 3, 4, 5, 6].flatMap(i => { const b = T.tick + 0.05 + i / 2.2; return b < T.cut1 - 0.3 ? [['chip', +b.toFixed(3), 60, 0.1, { ...FX, wave: 'tri', slide: -20, gain: 0.05, decay: 0.08, sustain: 0.3 }], ['chip', +(b + 0.2).toFixed(3), 55, 0.08, { ...FX, wave: 'tri', slide: -20, gain: 0.032, decay: 0.07, sustain: 0.3 }]] : [] }),
  ...flutter(T.tick + 0.3, 10),
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', T.open1 + 0.06, 987.77, 0.03, 0], ['pop', 6.4, 880, 0.03, 0], ['pop', LINES1[1].t - 0.22, 739.99, 0.035, 0],
  ...talkCues(LINES1, { cps: CPS, pitch: { [C_TAG]: 880 } }), ...talkCues(LINES2, { cps: CPS, pitch: { [C_TAG]: 880 } }),
  // numb: swipes, the meter empties, a yawn
  ...wordPops(T.h1, 4, 0.08, 1, 0.02), ['pop', T.h1Land, 987.77, 0.04, 0],
  ['pop', T.phone, 440, 0.035, 0],
  ...T.swipes.flatMap((s, i) => [['whoosh', s, 0.22, 0.03], ['chip', +(s + 0.1).toFixed(3), [523.25, 440, 349.23, 261.63][i], 0.12, { ...FX, wave: 'square', duty: 0.25, gain: 0.022, decay: 0.08, sustain: 0.4 }]]),
  ['chip', T.swipes[3] + 0.15, 196, 0.5, { ...FX, wave: 'square', duty: 0.5, slide: -6, gain: 0.025, decay: 0.4, sustain: 0.5 }],
  ['chip', T.yawn[0], 330, 0.8, { ...FX, wave: 'tri', slide: -6, vib: 0.06, gain: 0.03, decay: 0.6, sustain: 0.7 }],
  ['pop', T.close1, 880, 0.03, 0], ['pop', T.close1 + 0.07, 587.33, 0.03, 0],
  // not knowing: the mystery card, the talk card, one butterfly, the swarm
  ...wordPops(T.h2, 3, 0.08, 2, 0.022), ['pop', T.h2Land, 1174.66, 0.045, 0], ['pop', T.h2Land + 0.12, 1318.51, 0.045, 0],
  ['whoosh', T.card[0], 0.4, 0.035], ['tick', T.card[1], 0.06], ['pop', T.card[1], 587.33, 0.035, -0.3],
  ['pop', T.open2, 739.99, 0.04, 0], ['pop', T.open2 + 0.06, 987.77, 0.03, 0],
  ['whoosh', T.talk[0], 0.35, 0.025], ['tick', T.talk[1], 0.05], ['pluck', T.talk[1], 1174.66, 0.04, 0.6, 0.3], ['glitter', T.talk[1], T.talk[1] + 0.4],
  ...flutter(T.first, 6, 0.014), ['pluck', T.first, 1318.51, 0.03, 0.4, 0],
  ['glitter', T.swarm, T.swarm + 0.9], ...flutter(T.swarm, 20, 0.014), ['bell', T.swarm + 0.05, 1760, 0.026, 1.2, 0],
  ['pop', T.close2, 880, 0.03, 0],
  ...lessonCues(LESSON.at, { ...LESSON, key: 'Fm' }),
  // bring back the butterflies
  ...wordPops(T.h3, 3, 0.1, 1, 0.024), ['pop', T.h3Land, 1318.51, 0.05, 0], ['pluck', T.h3Land, 1174.66, 0.045, 0.7, 0], ['glitter', T.h3Land, T.h3Land + 0.5],
  ...flutter(T.h3Land + 0.2, 8, 0.012),
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
