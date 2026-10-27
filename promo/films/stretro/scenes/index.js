// stretro (20 s vertical Align ad, Star Talk batch 3) · story 0–15.6, then the shared end card ("come" + the Align logo).
//   0.00–2.70  "Mercury is | *retrograde.*"  A gold pixel ☿ orb spins BACKWARDS (rewind arrows orbit it the wrong way),
//              tagged "℞ RETROGRADE". It shrinks up to the corner as a phone slides in: a chat with "ex".
//   2.75–3.90  The draft types itself: "hey stranger"… the send button glows.
//   3.93       ALARM: a chorus of sign stars pops up around the phone, wide-eyed, "!" over every head, a whistle.
//              Box (ALL STARS, red): "PUT. THE PHONE. DOWN."  The phone shakes.
//   7.30–11.0  "Pause. | *Reflect.*"  Box (THE STARS): "retrograde is for *reflecting,* not re-texting."  The draft
//              backspaces itself away, "DRAFT DELETED ✓", the stars cheer, the screen goes dark. The box pops shut.
//  11.15       card cut (flip).
//  11.25–15.5  "Leave the *ex* | in the past."  The orb floats centre, calm now; the chorus rings it, happy and hopping.
//              Everything pops out by 15.5; the end card takes over at 15.6.
// One canvas (sky + orb + phone + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes } from '../../startalk.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', RED = '#ff6b6b', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SYM = "'EB Garamond', 'DejaVu Sans', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.72, h0Out: [7.05, 7.25],
  orbIn: 0.3, tag: 0.95, orbMove: [2.1, 2.6], phoneIn: [2.2, 2.65],
  type: 2.75, typeGap: 0.1, glow: 3.9,
  alarm: BEAT(6),                                     // 3.93
  open: 4.02, l1: 4.18, shake: [3.93, 4.6],
  l2: 7.35, h1: 7.32, h1Land: 7.72, h1Out: [10.85, 11.05],
  erase: [9.5, 10.1], toast: 10.15, dark: 10.6, close: 10.9,
  cut: 11.15,
  h2: 11.25, h2Land: 11.55, cheer: 11.6, h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const ALL = 'ALL STARS', NARR = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ALL, color: RED, text: 'PUT. THE PHONE. DOWN.' },
  { t: T.l2, speaker: NARR, text: 'retrograde is for *reflecting,* not re-texting.' },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const DRAFT = 'hey stranger'

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

/** springy word-by-word type: `*word*` = accent (Garamond italic, colour), `|` = line break; the last `late` words pop at lateAt */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    const big = (late > 0 && n >= nW - late) || (late < 0 && acc)
    ws.push({ t: big && lateAt != null ? lateAt + (late > 0 ? (n - (nW - late)) * lateGap : 0) : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

// ── pixel bits
const BMP = s => s.trim().split(/\s+/)
const BANG = BMP(`XX XX XX XX .. XX`)
const ARROW = BMP(`..X.. .XX.. XXXXX .XX.. ..X..`)          // points left (−x); rotated onto the orbit tangent
const HEART = BMP(`.XX.XX. XXXXXXX XXXXXXX .XXXXX. ..XXX.. ...X...`)
/** a bitmap of cells (X = col) with a 1-cell dark outline, centred on (cx, cy) */
function bits(x, bm, cx, cy, cell, col, { rot = 0, a = 1 } = {}) {
  if (a <= 0) return
  const w = bm[0].length, h = bm.length
  x.save(); x.globalAlpha *= a; x.translate(Math.round(cx), Math.round(cy)); x.rotate(rot)
  x.fillStyle = 'rgba(14,8,32,0.88)'
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell - cell * 0.5, (j - h / 2) * cell - cell * 0.5, cell * 2, cell * 2) }))
  x.fillStyle = col
  bm.forEach((r, j) => [...r].forEach((ch, i) => { if (ch !== '.') x.fillRect((i - w / 2) * cell, (j - h / 2) * cell, cell + 0.5, cell + 0.5) }))
  x.restore()
}

// ── the chorus (Mercury's own Gemini + Virgo up front)
const CH = ['gemini', 'virgo', 'aries', 'scorpio', 'cancer', 'libra', 'pisces'].map(id => SIGNS.find(s => s.id === id))
const LAY_A = [[150, 800, 156], [930, 905, 150], [150, 1175, 140], [930, 1235, 146], [205, 1815, 118], [540, 1835, 108], [875, 1815, 118]]
const LAY_F = [[175, 1080, 176], [905, 1080, 176], [300, 1420, 168], [780, 1420, 168], [540, 1610, 200], [150, 1770, 124], [930, 1770, 124]]
const CHORUS = CH.map((s, i) => ({ col: s.color, glyph: s.glyph, seed: 31 + i * 5, t: T.alarm - 0.02 + [0, 0.05, 0.1, 0.13, 0.2, 0.24, 0.28][i] }))

const ORB_A = { x: 540, y: 905, r: 132 }, ORB_B = { x: 875, y: 640, r: 64 }, ORB_F = { x: 540, y: 820, r: 104 }
const PHONE = { x: 540, y: 1010, s: 0.8 }

async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "800 44px Inter", "500 34px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Mercury is | *retrograde.*', { top: 200, size: 124, accentSize: 178, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.1, accentColor: GOLD })
  const H1 = popText(root, 'Pause. | *Reflect.*', { top: 200, size: 128, accentSize: 182, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: LAV })
  const H2 = popText(root, 'Leave the *ex* | in the past.', { top: 230, size: 118, accentSize: 176, at: T.h2, late: -1, lateAt: T.h2Land, wobble: true, gap: 0.09, accentColor: PINK })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // the orb sprite (16-cell gold ball)
  const ORB_G = 16
  const orbBuf = document.createElement('canvas'); orbBuf.width = orbBuf.height = ORB_G
  {
    const o = orbBuf.getContext('2d'), h = ORB_G / 2
    for (let j = 0; j < ORB_G; j++) for (let i = 0; i < ORB_G; i++) {
      const u = (i + 0.5 - h) / h, v = (j + 0.5 - h) / h, d = Math.hypot(u, v)
      if (d > 1) continue
      let c = d > 0.86 ? '#b8792a' : (u * 0.6 + v * 0.8 > 0.35 ? '#e0a743' : '#f7cf68')
      if (d <= 0.86 && Math.hypot(u + 0.38, v + 0.4) < 0.24) c = '#fff1c8'
      if (d > 0.86 && u + v < -0.6) c = '#ffd98a'
      o.fillStyle = c; o.fillRect(i, j, 1, 1)
    }
  }
  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.5 * a)); g.addColorStop(0.45, rgba(col, 0.16 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }
  function orbState(t) {
    if (t < T.cut) {
      const e = ease.inOutCubic(prog(t, ...T.orbMove))
      return { x: lerp(ORB_A.x, ORB_B.x, e), y: lerp(ORB_A.y, ORB_B.y, e) - Math.sin(Math.PI * e) * 60, r: lerp(ORB_A.r, ORB_B.r, e), k: pop01(t, T.orbIn, 0.45, 1.8), retro: true }
    }
    return { ...ORB_F, k: pop01(t, T.cut + 0.12, 0.42, 1.8) * popOut(t, T.out), retro: false }
  }
  function drawOrb(t) {
    const S0 = orbState(t), { r, k } = S0
    if (k <= 0.01) return
    const cx = S0.x, cy = S0.y + Math.sin(t * 2.3) * 6
    glow(cx, cy, r * 3, GOLD, 0.85 * clamp(k))
    // spin: backwards (counter-clockwise, fast) while retrograde; a calm forward drift in the last beat
    const spin = S0.retro ? -t * 2.6 : t * 0.6
    if (S0.retro) {
      // rewind arrows chase each other around the orb the wrong way, with pixel trails
      const R = r * 1.62, cell = Math.max(3, Math.round(r * 0.07)) * k
      for (let i = 0; i < 3; i++) {
        const a = spin + i * Math.PI * 2 / 3
        for (let s = 1; s <= 4; s++) {
          const b = a + s * 0.16
          x.fillStyle = rgba(GOLD, 0.55 - s * 0.11); const q = cell * (1.6 - s * 0.25)
          x.fillRect(Math.round(cx + Math.cos(b) * R * k - q / 2), Math.round(cy + Math.sin(b) * R * k - q / 2), q, q)
        }
        // tangent pointing counter-clockwise = direction of decreasing angle
        bits(x, ARROW, cx + Math.cos(a) * R * k, cy + Math.sin(a) * R * k, cell, '#fff1c8', { rot: a + Math.PI / 2 })
      }
    }
    const S = Math.round(r * 2 * k / ORB_G) * ORB_G || r * 2 * k
    x.save(); x.translate(Math.round(cx), Math.round(cy)); x.rotate(spin); x.imageSmoothingEnabled = false
    x.fillStyle = 'rgba(14,8,32,0.6)'; x.beginPath(); x.arc(0, 0, S / 2 + 5, 0, Math.PI * 2); x.fill()
    x.drawImage(orbBuf, -S / 2, -S / 2, S, S)
    x.rotate(-spin)                                   // the glyph stays upright (only the ball's shading turns)
    x.font = `700 ${Math.round(r * 1.3 * k)}px ${SYM}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = INK; x.fillText('☿︎', 0, r * 0.08 * k)
    x.restore()
    // the ℞ tag under it (beat 1 + 2)
    if (S0.retro) {
      const tk = pop01(t, T.tag, 0.3, 2.2) * k
      if (tk > 0.01) {
        const big = r > 100, fs = big ? 34 : 22, label = big ? '℞  RETROGRADE' : '℞'
        x.save(); x.translate(cx, cy + r * 1.62 + (big ? 92 : 44)); x.scale(tk, tk)
        x.font = `700 ${fs}px ${MONO}`; const tw = x.measureText(label).width + 0.14 * fs * label.length
        const pw = tw + 40, ph = fs + 26
        x.fillStyle = 'rgba(20,12,44,0.92)'; x.beginPath(); x.roundRect(-pw / 2, -ph / 2, pw, ph, ph / 2); x.fill()
        x.lineWidth = 3; x.strokeStyle = rgba(GOLD, 0.9); x.stroke()
        x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.letterSpacing = '0.14em'
        x.fillText(label, 3, 2)
        x.restore()
      }
    }
  }

  // ── the phone (local units 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function draftText(t) {
    if (t < T.type) return ''
    let n = clamp(Math.floor((t - T.type) / T.typeGap) + 1, 0, DRAFT.length)
    if (t > T.erase[0]) n = Math.max(0, DRAFT.length - Math.floor((t - T.erase[0]) / ((T.erase[1] - T.erase[0]) / DRAFT.length)))
    return DRAFT.slice(0, n)
  }
  function drawPhone(t) {
    if (t < T.phoneIn[0] || t >= T.cut) return
    const pin = easeOutBack(prog(t, ...T.phoneIn), 1.5)
    let jx = 0, jr = 0
    const sk = t >= T.shake[0] && t < T.shake[1] ? 1 - prog(t, ...T.shake) : 0
    if (sk > 0) { jx = sk * 14 * Math.sin(t * 95); jr = sk * 4 * Math.sin(t * 77 + 1) }
    x.save()
    x.translate(PHONE.x + jx, lerp(2350, PHONE.y, pin)); x.rotate((-2 + jr) * Math.PI / 180); x.scale(PHONE.s, PHONE.s)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    const alarmK = t >= T.alarm && t < T.erase[0] ? 0.5 + 0.5 * Math.sin((t - T.alarm) * 14) : 0
    x.save(); x.shadowColor = alarmK > 0 ? rgba(RED, 0.4 + 0.5 * alarmK) : rgba(LAV, 0.45); x.shadowBlur = 70
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = alarmK > 0 ? rgba(RED, 0.6 + 0.4 * alarmK) : rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh); g.addColorStop(0, '#24164a'); g.addColorStop(1, '#3d2066')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    // header: ‹  [cracked heart] ex
    x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect(sx, sy + 60, sw, 100)
    x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = rgba(BONE, 0.7); x.font = `500 48px ${INTER}`; x.fillText('‹', sx + 22, sy + 110)
    const hx = sx + 70, hy = sy + 88, px = 7
    ;['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') { x.fillStyle = (i === 3 && j > 0 && j < 4) || (i === 4 && j === 2) ? '#24164a' : '#ff5c8a'; x.fillRect(hx + i * px, hy + j * px, px, px) } }))
    x.fillStyle = BONE; x.font = `800 46px ${INTER}`; x.fillText('ex', hx + 66, sy + 104)
    x.font = `500 24px ${INTER}`; x.fillStyle = rgba(BONE, 0.55); x.fillText('last seen in March', hx + 66, sy + 140)
    // their last message, months ago
    x.textAlign = 'center'; x.font = `700 22px ${MONO}`; x.fillStyle = rgba(BONE, 0.45); x.fillText('MAR 12', 0, sy + 215)
    x.textAlign = 'left'; x.font = `500 32px ${INTER}`
    rr(sx + 22, sy + 245, 300, 112, 30); x.fillStyle = 'rgba(255,255,255,0.13)'; x.fill()
    x.fillStyle = rgba(BONE, 0.85); x.fillText('ok. take care.', sx + 46, sy + 285); x.fillText('bye forever.', sx + 46, sy + 325)
    // the draft field
    const typed = draftText(t), fy = sy + sh - 150
    rr(sx + 18, fy, sw - 112, 96, 48); x.fillStyle = 'rgba(10,6,26,0.7)'; x.fill(); x.lineWidth = 3; x.strokeStyle = typed.length ? rgba(PINK, 0.8) : 'rgba(255,255,255,0.3)'; x.stroke()
    x.font = `600 34px ${INTER}`
    if (typed.length) { x.fillStyle = BONE; x.fillText(typed, sx + 46, fy + 50) } else { x.fillStyle = rgba(BONE, 0.4); x.fillText('Message', sx + 46, fy + 50) }
    const tw = typed.length ? x.measureText(typed).width : 0
    if (Math.floor(t * 2.6) % 2 === 0 && t < T.dark) { x.fillStyle = PINK; x.fillRect(sx + 48 + tw, fy + 26, 4, 46) }
    // send button: glows when the draft is ready, then greys out
    const ready = typed.length === DRAFT.length && t >= T.glow
    const bx = sx + sw - 58, by = fy + 48
    if (ready) { x.save(); x.shadowColor = PINK; x.shadowBlur = 30 + 14 * Math.sin(t * 12); x.fillStyle = PINK; x.beginPath(); x.arc(bx, by, 40, 0, Math.PI * 2); x.fill(); x.restore() }
    else { x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc(bx, by, 40, 0, Math.PI * 2); x.fill() }
    x.fillStyle = ready ? '#24164a' : rgba(BONE, 0.5); x.beginPath(); x.moveTo(bx - 14, by + 14); x.lineTo(bx + 16, by); x.lineTo(bx - 14, by - 14); x.lineTo(bx - 8, by); x.closePath(); x.fill()
    // the toast
    const tp = pop01(t, T.toast, 0.3, 2.2)
    if (tp > 0.01) {
      x.save(); x.translate(0, sy + 470); x.scale(tp, tp)
      rr(-170, -40, 340, 80, 40); x.fillStyle = 'rgba(16,40,30,0.92)'; x.fill(); x.lineWidth = 3; x.strokeStyle = '#7fe0b8'; x.stroke()
      x.textAlign = 'center'; x.fillStyle = '#7fe0b8'; x.font = `700 28px ${MONO}`; x.fillText('DRAFT DELETED ✓', 0, 2)
      x.restore()
    }
    const dk = prog(t, T.dark, T.dark + 0.3)
    if (dk > 0) { x.fillStyle = `rgba(8,5,20,${0.6 * dk})`; x.fillRect(sx, sy, sw, sh) }
    x.restore()
    x.restore()
  }

  // ── the chorus
  function layout(t) {
    if (t < T.cut) return LAY_A
    return LAY_F
  }
  function state(t, i, p) {
    const toward = (tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
    let mood = 'wide', look = toward(PHONE.x, PHONE.y), blink, squash = 0
    if (t < T.cut) {
      if (t < T.alarm + 0.15) blink = 0.4
      if (t >= T.l1 && t < LT[0].done + 0.2) look = [0, 0]                        // yelling at you
      else if (t >= LT[0].done + 0.2 && t < T.l2) { mood = 'squint'; look = toward(PHONE.x, PHONE.y) }
      else if (t >= T.l2 && t < T.erase[0]) { mood = 'neutral'; look = [0, 0] }
      else if (t >= T.erase[0] && t < T.toast) { mood = 'wide'; look = toward(PHONE.x, PHONE.y + 200) }
      else if (t >= T.toast) mood = (i % 3 === 1) ? 'sparkle' : 'happy'
    } else {
      mood = 'happy'; look = toward(ORB_F.x, ORB_F.y)
      if (t > T.h2Land + 0.3) { mood = i % 2 ? 'sparkle' : 'happy'; look = [0, 0] }
      if (t > 13.4 + i * 0.05 && t < 14.3) mood = 'heart'
    }
    return { mood, look, blink, squash }
  }
  function drawChorus(t) {
    if (t < T.alarm - 0.05) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const L = layout(t)
    CHORUS.forEach((c, i) => {
      const p = L[i]
      let pk = pop01(t, c.t, 0.34, 2.4)
      if (t >= T.cut) pk = pop01(t, T.cut + 0.08 + i * 0.03, 0.34, 2.2)
      pk *= ok
      if (pk <= 0.02) return
      const st = state(t, i, p)
      const hops = [c.t + 0.22, c.t + 0.6, T.toast + 0.05 + 0.04 * i, T.h2Land + 0.05 * i, 12.9 + 0.07 * i, 14.4 + 0.05 * (i % 3)]
      const r = drawStarChar(x, p[0], p[1], p[2], t, { color: c.col, glyph: p[2] >= 120 ? c.glyph : null, ...st, hops, seed: c.seed, pop: pk, glow: 0.9 })
      // alarm "!" over every head
      const bk = pop01(t, c.t + 0.04, 0.22, 2.6) * (1 - prog(t, LT[0].done + 0.1, LT[0].done + 0.3))
      if (t < T.cut && bk > 0.01) bits(x, BANG, p[0] + p[2] * 0.36, r.top - 18 - Math.abs(Math.sin((t - c.t) * 9)) * 10, 7 * bk, RED)
    })
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
  function floatHearts(t, cx, cy, t0, t1) {
    for (let i = 0; i < 8; i++) {
      const born = t0 + i * 0.2, life = 1.2
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const side = ((i * 37) % 9) / 8 - 0.5
      bits(x, HEART, cx + side * 520 + Math.sin(p * 7 + i) * 16, cy - p * 300, 6 + (i % 3), [PINK, '#ff4f86', GOLD][i % 3], { a: Math.sin(Math.PI * p) })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawOrb(t)
        drawPhone(t)
        drawChorus(t)
        sparkles(t, PHONE.x, PHONE.y, T.toast, 12, 300, 1, [GOLD, BONE, '#7fe0b8'])
        sparkles(t, ORB_F.x, ORB_F.y, T.h2Land, 12, 200, 2)
        floatHearts(t, 540, 1500, 13.4, 14.4)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 7.3 (inert: the box swaps speakers), 11.15 (box shut → the last line, the one that plays).
const CUTS = [7.3, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the orb spins backwards (a falling "rewind" sweep), the tag, the phone, the draft
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['bell', T.orbIn + 0.1, 1567.98, 0.03, 1.6, 0], ...[0, 1, 2, 3, 4].map(i => ['pop', +(T.orbIn + 0.4 + i * 0.09).toFixed(3), NOTE[6 - i], 0.02, 0]),
  ['tick', T.tag + 0.1, 0.04],
  ['whoosh', T.orbMove[0], 0.45, 0.04], ['pop', T.phoneIn[1] - 0.1, 659.25, 0.04, 0],
  ...Array.from({ length: DRAFT.length }, (_, i) => ['tick', +(T.type + i * T.typeGap).toFixed(3), 0.028]),
  ['pluck', T.glow, 1318.51, 0.03, 0.4, 0],
  // the alarm: whistle + every star pops up
  ['chip', T.alarm, 2400, 0.32, { wave: 'tri', vib: 0.05, gain: 0.03 }], ['chip', T.alarm + 0.4, 2400, 0.12, { wave: 'tri', gain: 0.028 }],
  ['boom', T.alarm, 0.18],
  ...CHORUS.map((c, i) => ['pop', +(c.t + 0.1).toFixed(3), NOTE[(i * 3) % 7], 0.03, +((LAY_A[i][0] / W - 0.5) * 1.2).toFixed(2)]),
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ALL]: 660, [NARR]: 880 } }),
  // reflect: the draft deletes, the toast, the cheer
  ...wordPops(T.h1, 1, 0.08, 2, 0.026), ['pop', T.h1Land, 1046.5, 0.045, 0],
  ...Array.from({ length: DRAFT.length }, (_, i) => ['tick', +(T.erase[0] + i * (T.erase[1] - T.erase[0]) / DRAFT.length).toFixed(3), 0.022]),
  ['bell', T.toast + 0.05, 1318.51, 0.04, 1.2, 0], ['glitter', T.toast, T.toast + 0.5],
  ['pop', T.dark, 330, 0.03, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // leave the ex in the past
  ...wordPops(T.h2, 6, 0.09, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['pluck', 13.4, 1318.51, 0.035, 0.5, -0.2], ['bell', 13.45, 1760, 0.022, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
