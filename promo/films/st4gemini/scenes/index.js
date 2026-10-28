// st4gemini (15 s vertical Align ad, Star Talk season 4, EP 025, thread F: Gemini × Sagittarius) · story 0–10.6, then the end card.
//   0.00–2.05  "Dear Gemini: | you kept *one* chat."  The one chat bubble Gemini kept in stargemini, "tell me more?", floats up.
//              A FROM: tag stamps on it: ♐ SAGITTARIUS. It was Sag all along.
//   2.05–6.50  A Houston food hall: string lights, generic stall boards. Gemini (♊) and Sagittarius (♐, its backpack on) sit
//              across one table, both glued to their phones. Pings: SAG "where r u?" → GEMINI "across from you." Both look up.
//              Box (THE STARS): "you've texted every day for *weeks.*"
//              Ghost cameo (4.55): it hangs upside down from the string lights, centre, between the headline and the stalls.
//   6.55       card cut (flip): phones face down on the table, two bowls between them; they look at each other.
//   6.65–10.45 THE STARS: "now put the phones *down.*"  Headline: "Same chat. | *Real* table."  Box shuts 9.45.
// One canvas (sky + constellation + food hall + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 15
const EP = 25
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const GEM = signStar('gemini'), SAG = signStar('sagittarius')

// ── the timeline
const T = {
  h0: 0.1, h0Land: 0.6, h0Out: [6.32, 6.5],
  bub: 0.35, from: 0.9, bubOut: [2.05, 2.35], hallIn: [2.05, 2.5],
  ping1: 2.45, ping2: 2.95, lookUp: 3.25, open: 3.22, l1: 3.38,
  ghost: 4.55,
  cut: 6.55, l2: 6.65, h1: 6.6, h1Land: 7.05, close: 9.45, out: [10.05, 10.45], h1Out: [10.15, 10.4],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "you've texted every day for *weeks.*" },
  { t: T.l2, speaker: SPEAK, text: 'now put the phones *down.*' },
]
const CPS = 30
const LT = lineTimes(LINES, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; word bigIdx pops big at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, bigIdx = -1, lateAt = null, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = n === bigIdx
    ws.push({ t: big ? lateAt : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const BMP = s => s.trim().split(/\s+/)
const HEART = BMP(`.H.H. HWHHH HHHHH .HHH. ..H..`)
// Sagittarius's backpack (starsag)
const PACK = BMP(`...SSSSSS... ..S......S.. .PPPPPPPPPP. PPPPPPPPPPPP PppppppppppP PPPPPPPPPPPP PPPFFFFFFPPP PPPFffffFPPP PPPFFFFFFPPP PPPPPPPPPPPP PPPPPPPPPPPP .PPPPPPPPPP.`)
const PACK_SAG = { S: '#5a3a1e', P: '#c47a3a', p: '#8a4f22', F: '#e89a52', f: '#fff1c8' }
function bits(x, bm, cx, cy, cell, cols, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.9)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch === '.') return; x.fillStyle = cols[ch] || cols.X; x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── layout
const TABLE_Y = 1230
const G_P = { x: 250, y: 1115, s: 240 }, S_P = { x: 830, y: 1115, s: 240 }
const STALL_Y = 800                                   // the stall counters' top
const STALLS = [{ x: 150, label: 'TACOS', col: '#e8628a' }, { x: 410, label: 'KOLACHES', col: '#f29a4a' }, { x: 670, label: 'BBQ', col: '#9a7be0' }, { x: 930, label: 'NOODLES', col: '#3fb8a8' }]
const G_HOPS = [T.ping2 + 0.05, T.lookUp + 0.05, T.cut + 0.3, T.h1Land + 0.1]
const S_HOPS = [T.ping1 + 0.05, T.lookUp + 0.1, T.cut + 0.4, T.h1Land + 0.25]

function moods(t, who) {
  if (t < T.lookUp) return { mood: 'neutral', look: [0, 1] }                      // eyes on the phone
  if (t < T.lookUp + 0.9) return { mood: 'wide', look: [who ? -1 : 1, 0], blink: false }   // …across from you?!
  if (t < T.cut) return { mood: 'squint', look: [0, 1] }                                     // and… back to the phone
  if (t < LT[1].done) return { mood: 'sparkle', look: [who ? -1 : 1, 0] }
  return { mood: who ? 'happy' : 'heart', look: [who ? -1 : 1, 0] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 40px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Dear Gemini: | you kept *one* chat.', { top: 200, size: 92, accentSize: 136, at: T.h0, bigIdx: 4, lateAt: T.h0Land, wobble: true, gap: 0.08, accentColor: GEM.color, lineHeight: 1.0 })
  const H1 = popText(root, 'Same chat. | *Real* table.', { top: 200, size: 124, accentSize: 190, at: T.h1, bigIdx: 2, lateAt: T.h1Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the kept chat: "tell me more?" + FROM: ♐ SAGITTARIUS
  function keptChat(t) {
    const k = pop01(t, T.bub, 0.4, 2) * (1 - ease.inCubic(prog(t, ...T.bubOut)))
    if (k <= 0.01) return
    const fly = ease.inCubic(prog(t, ...T.bubOut))
    const cx = lerp(540, S_P.x, fly), cy = lerp(760, S_P.y - 60, fly) + Math.sin(t * 2.4) * 6
    x.save(); x.translate(cx, cy); x.scale(k * 1.25, k * 1.25)
    x.font = `700 44px ${INTER}`
    const s = 'tell me more?', bw = x.measureText(s).width + 70, bh = 96
    x.fillStyle = INK; x.beginPath(); x.roundRect(-bw / 2 - 6, -bh / 2 - 6, bw + 12, bh + 12, 44); x.fill()
    x.fillStyle = SAG.color; x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 40); x.fill()
    x.beginPath(); x.moveTo(-bw / 2 + 40, bh / 2 - 2); x.lineTo(-bw / 2 + 8, bh / 2 + 26); x.lineTo(-bw / 2 + 74, bh / 2 - 2); x.closePath(); x.fill()
    x.fillStyle = '#ffffff'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 2)
    // FROM: stamp
    const fk = pop01(t, T.from, 0.3, 2.6)
    if (fk > 0.01) {
      x.save(); x.translate(10, -bh / 2 - 46); x.scale(fk, fk); x.rotate(-0.05)
      x.font = `700 26px ${MONO}`; x.letterSpacing = '0.12em'
      const lab = 'FROM: SAGITTARIUS', lw = x.measureText(lab).width + 34
      x.fillStyle = 'rgba(13,8,32,0.92)'; x.beginPath(); x.roundRect(-lw / 2, -24, lw, 48, 10); x.fill()
      x.lineWidth = 3; x.strokeStyle = SAG.color; x.stroke(); x.fillStyle = SAG.color; x.fillText(lab, 4, 2); x.letterSpacing = '0px'
      x.restore()
    }
    x.restore()
  }

  // ── the food hall: string lights, four generic stall boards with awnings, a shared table
  function hall(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    // stalls
    for (const s of STALLS) {
      const w = 240
      x.fillStyle = '#1c1340'; x.fillRect(s.x - w / 2, STALL_Y - 150, w, 260)
      // awning stripes
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#f4ecdc' : s.col; x.fillRect(s.x - w / 2 + i * w / 6, STALL_Y - 170, w / 6 + 1, 44) }
      for (let i = 0; i < 6; i++) { x.fillStyle = i % 2 ? '#f4ecdc' : s.col; x.beginPath(); x.arc(s.x - w / 2 + (i + 0.5) * w / 6, STALL_Y - 126, w / 12, 0, Math.PI); x.fill() }
      // board
      x.fillStyle = INK; x.fillRect(s.x - 96, STALL_Y - 96, 192, 50)
      x.font = `700 ${s.label.length > 6 ? 24 : 28}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = rgba(BONE, 0.9); x.letterSpacing = '0.1em'
      x.fillText(s.label, s.x + 2, STALL_Y - 70); x.letterSpacing = '0px'
      // counter
      x.fillStyle = '#4a2e5e'; x.fillRect(s.x - w / 2 - 6, STALL_Y, w + 12, 26); x.fillStyle = '#6a4380'; x.fillRect(s.x - w / 2 - 6, STALL_Y, w + 12, 6)
    }
    // the noodle stall's steam
    for (let k = 0; k < 4; k++) {
      const ph = (t * 0.5 + k / 4) % 1
      x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.5; x.fillStyle = BONE
      for (let j = 0; j < 6; j++) x.fillRect(Math.round(930 - 40 + k * 26 + Math.sin(ph * 6 + j + k) * 8), Math.round(STALL_Y - 10 - ph * 60 - j * 8), 7, 7)
    }
    x.globalAlpha = a
    // string lights, two swags
    for (const [y0, sag] of [[470, 60], [515, 48]]) {
      x.strokeStyle = rgba(BONE, 0.35); x.lineWidth = 2; x.beginPath()
      for (let i = 0; i <= 40; i++) { const u = i / 40, px = u * W, py = y0 + Math.sin(u * Math.PI * 2) ** 2 * sag; i ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
      for (let i = 1; i < 14; i++) {
        const u = i / 14, px = u * W, py = y0 + Math.sin(u * Math.PI * 2) ** 2 * sag + 8
        const on = 0.65 + 0.35 * Math.sin(t * 3 + i * 1.7)
        glow(px, py, 26, '#ffd98a', on * 0.7)
        x.fillStyle = i % 3 ? '#ffe9a8' : '#ffb3c8'; x.fillRect(px - 5, py - 5, 10, 12)
      }
    }
    x.restore()
  }
  function table(a) {
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.fillRect(60, TABLE_Y - 8, 960, 48); x.fillRect(180, TABLE_Y + 30, 40, 170); x.fillRect(860, TABLE_Y + 30, 40, 170)
    x.fillStyle = '#3d7a8a'; x.fillRect(68, TABLE_Y, 944, 32); x.fillStyle = '#5aa0b0'; x.fillRect(68, TABLE_Y, 944, 8)
    x.restore()
  }
  // a phone in a star's hands: held up (screen glow) or lying face down
  function phone(t, cx, held, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    if (held > 0.01) {
      const py = lerp(TABLE_Y + 10, TABLE_Y - 70, held)
      glow(cx, py - 40, 150 * held, '#8fd8f6', 0.6 * held)
      x.translate(cx, py); x.rotate(-0.12 * (cx < 540 ? -1 : 1))
      x.fillStyle = INK; x.beginPath(); x.roundRect(-38, -66, 76, 132, 14); x.fill()
      x.fillStyle = '#8fd8f6'; x.beginPath(); x.roundRect(-30, -58, 60, 116, 9); x.fill()
      x.fillStyle = '#ffffff'; x.fillRect(-20, -40, 30, 10); x.fillRect(-10, -20, 30, 10); x.fillRect(-20, 0, 24, 10)
    } else {
      x.fillStyle = INK; x.fillRect(cx - 70, TABLE_Y - 14, 140, 18); x.fillStyle = '#2a2156'; x.fillRect(cx - 64, TABLE_Y - 12, 128, 10)
    }
    x.restore()
  }
  function bowl(cx, t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    x.fillStyle = INK; x.beginPath(); x.arc(cx, TABLE_Y - 10, 68, 0, Math.PI); x.fill(); x.fillRect(cx - 72, TABLE_Y - 18, 144, 12)
    x.fillStyle = '#f4ecdc'; x.beginPath(); x.arc(cx, TABLE_Y - 10, 60, 0, Math.PI); x.fill()
    x.fillStyle = '#e89a52'; x.fillRect(cx - 60, TABLE_Y - 20, 120, 12)
    for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.globalAlpha = a * Math.sin(Math.PI * ph) * 0.8; x.fillStyle = BONE; for (let j = 0; j < 4; j++) x.fillRect(Math.round(cx - 20 + k * 20 + Math.sin(ph * 6 + j) * 6), Math.round(TABLE_Y - 40 - ph * 70 - j * 9), 6, 6) }
    x.restore()
  }
  // pings flying over the table: SAG "where r u?" → GEMINI "across from you."
  function ping(t, t0, text, fromLeft, y, col, fg, tag) {
    const k = pop01(t, t0, 0.34, 2.3) * outK(t, [T.cut - 0.2, T.cut])
    if (k <= 0.01) return
    x.save(); x.font = `700 40px ${INTER}`
    const bw = x.measureText(text).width + 60, bh = 84
    const bx = fromLeft ? 120 : 960 - bw
    x.translate(fromLeft ? bx : bx + bw, y); x.scale(k, k); x.translate(fromLeft ? 0 : -bw, 0)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-6, -6, bw + 12, bh + 12, 40); x.fill()
    x.fillStyle = col; x.beginPath(); x.roundRect(0, 0, bw, bh, 34); x.fill()
    x.beginPath(); x.moveTo(fromLeft ? 40 : bw - 40, bh - 2); x.lineTo(fromLeft ? 8 : bw - 8, bh + 24); x.lineTo(fromLeft ? 74 : bw - 74, bh - 2); x.closePath(); x.fill()
    x.fillStyle = fg; x.textBaseline = 'middle'; x.fillText(text, 30, bh / 2 + 2)
    x.font = `700 24px ${MONO}`; x.fillStyle = col; x.textAlign = fromLeft ? 'left' : 'right'; x.fillText(tag, fromLeft ? 8 : bw - 8, -24)
    x.restore()
  }
  function sag(t, ok) {
    const st = moods(t, 1), s = S_P.s
    const sway = Math.sin(t * 3) * 0.04
    bits(x, PACK, S_P.x + s * 0.36, S_P.y - s * 0.02, s / 21, PACK_SAG, { rot: 0.14 + sway, a: clamp(ok) })
    drawStarChar(x, S_P.x, S_P.y, s * ok, t, { color: SAG.color, glyph: SAG.glyph, ...st, hops: S_HOPS, seed: 6, glow: 1.05 })
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
  function floatHearts(t, cx, cy, t0, t1, seed) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.26, life = 1.5
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37 + seed) % 7) / 6 - 0.5
      bits(x, HEART, cx + side * 260 + Math.sin(p * 4 + i) * 16, cy - p * 220, 7 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6))), { H: '#ff4f6e', W: '#ffd1de' }, { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, EP)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const hk = easeOutBack(prog(t, ...T.hallIn), 1.4)
        const a = clamp(hk) * clamp(ok)
        hall(t, a)
        drawGhostCameo(x, t, { x: 540, y: 455, at: T.ghost, dur: 1.4, from: 'above', cell: 3 })
        // the two stars pop in with the hall
        const sk = pop01(t, T.hallIn[0] + 0.1, 0.4, 2) * ok
        if (sk > 0.01) {
          drawStarChar(x, G_P.x, G_P.y, G_P.s * sk, t, { color: GEM.color, glyph: GEM.glyph, ...moods(t, 0), hops: G_HOPS, seed: 2, glow: 1.05 })
          sag(t, sk)
        }
        table(a)
        const held = t < T.cut ? 1 : 0
        phone(t, G_P.x + 40, held, a); phone(t, S_P.x - 40, held, a)
        if (t >= T.cut) { bowl(470, t, a); bowl(620, t, a) }
        ping(t, T.ping1, 'where r u?', false, 850, SAG.color, '#ffffff', 'SAG')
        ping(t, T.ping2, 'across from you.', true, 850, GEM.color, INK, 'GEMINI')
        keptChat(t)
        sparkles(t, 540, 1080, T.cut + 0.1, 12, 330, 1)
        if (t > T.h1Land) floatHearts(t, 540, 1020, T.h1Land, T.out[0] - 0.4, 3)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidate: 6.55 (the pings clear; phones face down, bowls between them). Plays.
const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 4, 0.08, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0],
  ['pop', T.bub, 880, 0.04, 0], ['pop', T.from, 1318.51, 0.045, 0], ['tick', T.from + 0.05, 0.04], ['bell', T.from + 0.08, 1760, 0.02, 0.9, 0],
  ['whoosh', T.bubOut[0], 0.3, 0.03], ['glitter', T.hallIn[0], T.hallIn[1]],
  ['pop', T.ping1, 1174.66, 0.045, 0.35], ['pop', T.ping2, 987.77, 0.045, -0.35],
  ['pop', T.lookUp, 1318.51, 0.04, 0], ['pop', T.lookUp + 0.05, 1567.98, 0.035, 0],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['tick', T.ghost + 0.1, 0.02],
  ['tick', T.cut + 0.12, 0.04], ['tick', T.cut + 0.2, 0.04],
  ...wordPops(T.h1, 2, 0.1, 1, 0.026), ['pop', T.h1Land, 1318.51, 0.055, 0], ['pluck', T.h1Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h1Land, T.h1Land + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
