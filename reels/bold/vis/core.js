// Core visuals: people, phones and texts, and Align's real features as objects (mystery card, tonight's deck,
// talk cards, dealbreakers, Push / Pull / Align), plus quiz options for scenarios. See ../SPEC.md for params.
import {
  clamp, lerp, prog, ease, rng, TAU, BONE, GOLD, PINK, BLUE, VIOLET, RED, GREEN, MUTED, READING, color, sign, rgba,
  easeOutBack, pop01, wob, stagger, ink, line, rr, panel, label, para, pill, glyph, sparkle, twinkles, heart, person,
  bubble, typingDots, cardBack, aura, font, wrap, arrow, drawPixelStar,
} from '../kit.js'

// ───────────────────────── person / duo / crowd
function who(p, d = {}) { return { col: color(p?.col, d.col || BONE), pose: p?.pose || d.pose || 'stand', sign: p?.sign ?? d.sign ?? null, prop: p?.prop || null, flip: p?.flip ?? d.flip ?? false } }
function personAt(x, P, px, py, sc, s, seed, extra = {}) {
  person(x, px, py, sc, P.col, { pose: P.pose, t: s.t, sign: P.sign, prop: P.prop, flip: P.flip, seed, ...extra })
}
function bubbleOver(x, P, text, px, top, s, at, { think = false, side = 'c', maxW = 420, size = 38 } = {}) {
  if (!text) return
  const k = pop01(s.clt ?? s.lt, at, 0.34, 2.2)
  bubble(x, text, px, top, { size, side, maxW, scale: k, alpha: clamp(k * 2), think, col: color(P?.bubbleCol, BONE) })
}

const person1 = {
  draw(x, p, s) {
    const P = who(p, { col: p.col }), sc = Math.min(1.9, s.h / 470) * (p.scale || 1)
    const py = s.cy + 190 * sc
    personAt(x, P, s.cx, py, sc, s, 1)
    const bt = p.bubble || (typeof p.think === 'string' ? p.think : null)
    if (bt) bubbleOver(x, p, bt, s.cx + (p.bubbleX || 0), py - 360 * sc - (P.sign ? 70 * sc : 0), s, 0.35, { think: !!p.think })
    if (p.label) label(x, p.label, s.cx, py + 50, { size: 40, weight: 800, color: color(p.labelCol, GOLD) })
    if (p.heart) heart(x, s.cx + 120 * sc, py - 300 * sc, 34 * pop01(s.lt, 0.6), PINK)
  },
}

/** two people, left and right; link draws between them at linkAt (fraction of the beat) */
const duo = {
  min: p => (p.a?.bubble || p.b?.bubble) ? 2.6 : 2.2,
  draw(x, p, s) {
    const A = who(p.a, { col: BLUE }), B = who(p.b, { col: PINK, flip: true })
    const sc = Math.min(1.6, s.h / 560) * (p.scale || 1)
    const gap = (p.gap ?? 330) * Math.min(1.15, sc)
    const py = s.cy + 200 * sc
    const ax = s.cx - gap / 2 - 30, bx = s.cx + gap / 2 + 30
    if (p.table) {
      x.save()
      x.beginPath(); x.ellipse(s.cx, py - 110 * sc, 230 * sc, 40 * sc, 0, 0, TAU); ink(x, GOLD, { w: 7, fa: 0.25, glow: 18 })
      x.beginPath(); x.moveTo(s.cx, py - 70 * sc); x.lineTo(s.cx, py); line(x, GOLD, 8, 10)
      const props = p.table === true ? ['cup', 'cup'] : [].concat(p.table)
      props.forEach((pr, i) => { const tx = s.cx + (i ? 80 : -80) * sc, ty = py - 130 * sc; if (pr === 'cup') { rr(x, tx - 20 * sc, ty - 40 * sc, 40 * sc, 44 * sc, 8 * sc); ink(x, BONE, { w: 5, fa: 0.3, glow: 10 }) } else if (pr === 'taco') { x.beginPath(); x.ellipse(tx, ty - 6 * sc, 40 * sc, 28 * sc, 0, Math.PI, 0); x.closePath(); ink(x, GOLD, { w: 6, fa: 0.5, glow: 14 }) } else if (pr === 'phone') { rr(x, tx - 18 * sc, ty - 10 * sc, 36 * sc, 14 * sc, 4); ink(x, BLUE, { w: 4, fa: 0.6, glow: 16 }) } })
      x.restore()
    }
    const pose = (P, side) => p.table && P.pose === 'stand' ? 'sit' : P.pose
    personAt(x, { ...A, pose: pose(A) }, ax, py, sc, s, 1)
    personAt(x, { ...B, pose: pose(B) }, bx, py, sc, s, 2, { flip: true })
    const headY = py - (p.table ? 168 : 238) * sc
    // the link
    const at = (p.linkAt ?? 0.45) * s.dur, lk = p.link || 'none'
    const lt = s.lt, k = clamp((lt - at) / 0.45)
    if (k > 0 && lk !== 'none') {
      const x0 = ax + 60 * sc, x1 = bx - 60 * sc, ym = headY - 20 * sc
      if (lk === 'gold' || lk === 'align' || lk === 'heart') {
        x.save(); x.beginPath(); x.moveTo(x0, ym); x.quadraticCurveTo(s.cx, ym - 150 * sc, lerp(x0, x1, ease.outCubic(k)), lerp(ym, ym, k) - Math.sin(Math.PI * k) * 0); line(x, GOLD, 8, 26); x.restore()
        if (lk === 'heart') heart(x, s.cx, ym - 110 * sc, 46 * sc * pop01(lt, at + 0.4, 0.4, 2.6), PINK)
        sparkle(x, s.cx, ym - 80 * sc, lt, at + 0.35, { n: 10, R: 160, seed: s.seed })
      } else if (lk === 'spark') {
        const r = rng(Math.floor(s.t * 14))
        x.beginPath(); x.moveTo(x0, ym); for (let i = 1; i < 7; i++) x.lineTo(lerp(x0, x1, i / 7), ym + (r() - 0.5) * 70 * sc); x.lineTo(x1, ym); line(x, GOLD, 7, 30)
      } else if (lk === 'question') {
        label(x, '?', s.cx, ym - 40 * sc, { size: 150 * sc * pop01(lt, at, 0.4, 2.6), weight: 900, color: PINK, glow: 30 })
      } else if (lk === 'broken') {
        x.save(); x.translate(s.cx, ym - 60 * sc); const sp = 18 * ease.outCubic(clamp((lt - at - 0.3) / 0.4))
        x.save(); x.translate(-sp, 0); x.rotate(-sp / 120); x.beginPath(); x.moveTo(0, 42 * sc); x.bezierCurveTo(-70 * sc, -6 * sc, -46 * sc, -62 * sc, 0, -26 * sc); x.lineTo(-8 * sc, 0); x.lineTo(6 * sc, 16 * sc); x.closePath(); ink(x, PINK, { w: 7, fa: 0.6, glow: 22 }); x.restore()
        x.save(); x.translate(sp, 0); x.rotate(sp / 120); x.beginPath(); x.moveTo(0, 42 * sc); x.bezierCurveTo(70 * sc, -6 * sc, 46 * sc, -62 * sc, 0, -26 * sc); x.lineTo(-8 * sc, 0); x.lineTo(6 * sc, 16 * sc); x.closePath(); ink(x, PINK, { w: 7, fa: 0.6, glow: 22 }); x.restore()
        x.restore()
      } else if (lk === 'wall') {
        x.save(); x.globalAlpha *= k; rr(x, s.cx - 14, headY - 120 * sc, 28, 320 * sc, 8); ink(x, MUTED, { w: 6, fa: 0.4, glow: 10 }); x.restore()
      }
    }
    const btop = headY - (A.sign || B.sign ? 200 : 130) * sc
    for (const q of [p.a, p.b]) if (q && !q.bubble && typeof q.think === 'string') q.bubble = q.think
    if (p.a?.bubble) bubbleOver(x, p.a, p.a.bubble, Math.max(s.cx - s.w / 2 + 200, ax + 40), btop, s, p.a.at ?? 0.25, { think: !!p.a.think, side: 'l', maxW: 360, size: 44 })
    if (p.b?.bubble) bubbleOver(x, p.b, p.b.bubble, Math.min(s.cx + s.w / 2 - 200, bx - 40), btop - (p.a?.bubble ? 150 : 0), s, p.b.at ?? (p.a?.bubble ? 0.9 : 0.25), { think: !!p.b.think, side: 'r', maxW: 360, size: 44 })
    if (p.a?.label) label(x, p.a.label, ax, py + 50, { size: 46, weight: 800, color: A.col })
    if (p.b?.label) label(x, p.b.label, bx, py + 50, { size: 46, weight: 800, color: B.col })
  },
  cues(p, t0, dur) {
    const c = []
    if (p.link && p.link !== 'none') c.push(p.link === 'broken' ? ['tick', t0 + (p.linkAt ?? 0.45) * dur + 0.3, 0.08] : ['bell', t0 + (p.linkAt ?? 0.45) * dur + 0.3, 880, 0.045, 1.8, 0])
    if (p.a?.bubble) c.push(['pop', t0 + (p.a.at ?? 0.25), 900, 0.04, -0.3])
    if (p.b?.bubble) c.push(['pop', t0 + (p.b.at ?? (p.a?.bubble ? 0.9 : 0.25)), 1100, 0.04, 0.3])
    return c
  },
}

/** a crowd of pictograms bouncing on the beat; optional same colour; signs over heads; pair [i, j] glows and links */
const crowd = {
  draw(x, p, s) {
    const n = clamp(p.n ?? 9, 3, 15), rows = n > 8 ? 2 : 1, per = Math.ceil(n / rows)
    const sc = Math.min(0.62, (s.w / per) / 160, s.h / (rows * 420))
    const r = rng(p.seed ?? 7)
    const cols = [BLUE, PINK, GOLD, VIOLET, GREEN, '#f29a4a', '#7fd0f0', '#e163d6']
    const pos = []
    for (let i = 0; i < n; i++) {
      const row = Math.floor(i / per), inRow = row === rows - 1 ? n - per * (rows - 1) : per, j = i - row * per
      const px = s.cx + (j - (inRow - 1) / 2) * (s.w / per) * 0.98 + (row ? s.w / per / 2 * (rows > 1 ? 0.0 : 0) : 0)
      const py = s.cy + (rows === 1 ? 170 * sc * 1.6 : row === 0 ? -40 : 250) + 120 * sc
      pos.push([px, py])
    }
    const pair = p.pair || null, pk = pair ? clamp((s.lt - (p.pairAt ?? 0.5) * s.dur) / 0.5) : 0
    pos.forEach(([px, py], i) => {
      const bounce = p.bounce === false ? 0 : Math.abs(Math.sin(s.t * 5.65 + i * 0.7)) * 14
      const inPair = pair && pair.includes(i)
      const col = p.same ? color(p.same) : cols[Math.floor(r() * cols.length)]
      const sg = p.signs ? (Array.isArray(p.signs) ? p.signs[i % p.signs.length] : (i * 5) % 12) : null
      const dim = pair && pk > 0 && !inPair ? lerp(1, 0.35, pk) : 1
      person(x, px, py - bounce, sc * (inPair ? lerp(1, 1.12, pk) : 1), inPair && pk > 0 && p.pairCol !== false ? color(p.pairCol || (i === pair[0] ? 'blue' : 'pink')) : col, { t: s.t, seed: i, a: dim * clamp(pop01(s.lt, i * 0.05, 0.3) * 2), sign: sg, pose: p.pose || 'stand' })
    })
    if (pair && pk > 0) {
      const [a, b] = pair.map(i => pos[i]), hy = Math.min(a[1], b[1]) - 300 * sc - (p.signs ? 80 * sc : 0)
      x.save(); x.beginPath(); x.moveTo(a[0], a[1] - 300 * sc); x.quadraticCurveTo((a[0] + b[0]) / 2, hy - 160 * sc, lerp(a[0], b[0], ease.outCubic(pk)), lerp(a[1], b[1], ease.outCubic(pk)) - 300 * sc); line(x, GOLD, 8, 28); x.restore()
      sparkle(x, (a[0] + b[0]) / 2, hy - 80 * sc, s.lt, (p.pairAt ?? 0.5) * s.dur + 0.45, { n: 12, R: 170, seed: 4 })
    }
  },
  cues(p, t0, dur) { return p.pair ? [['bell', t0 + (p.pairAt ?? 0.5) * dur + 0.45, 988, 0.045, 2, 0]] : [] },
}

// ───────────────────────── phone with a text thread
// msgs: [["them", "wyd"], ["me", "nm u"], ["status", "Seen 3 days ago"], ["typing"], ["time", "1:04 AM"]]
function phoneGeom(s, p) {
  const h = Math.min(s.h, p.tall ? 1060 : 980), w = Math.min(720, s.w * 0.78, h * 0.72)
  return { w, h, x0: s.cx - w / 2, y0: s.cy - h / 2 }
}
const phone = {
  min: p => 0.9 + (p.msgs || []).length * 0.55,
  draw(x, p, s) {
    const g = phoneGeom(s, p)
    // body
    x.save()
    x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 60; x.shadowOffsetY = 20
    rr(x, g.x0, g.y0, g.w, g.h, 64); x.fillStyle = '#0d0822'; x.fill()
    x.shadowOffsetY = 0; x.shadowBlur = 0
    rr(x, g.x0, g.y0, g.w, g.h, 64); ink(x, color(p.col, VIOLET), { w: 7, fa: 0, glow: 26 })
    rr(x, g.x0 + g.w / 2 - 70, g.y0 + 22, 140, 34, 17); x.fillStyle = '#000'; x.fill()
    x.restore()
    // header: contact
    const hy = g.y0 + 118
    const nm = p.name || 'them'
    const S = sign(p.sign)
    x.beginPath(); x.arc(g.x0 + 84, hy + 4, 38, 0, TAU); ink(x, S?.color || PINK, { w: 5, fa: 0.35, glow: 14 })
    if (S) glyph(x, S.glyph, g.x0 + 84, hy + 4, 44, S.color, { glow: 10 })
    label(x, nm, g.x0 + 140, hy + 4, { size: 44, weight: 800, align: 'left', maxW: g.w - 200 })
    if (p.time) label(x, p.time, g.x0 + g.w - 44, hy + 4, { size: 28, weight: 700, family: 'mono', align: 'right', color: MUTED })
    x.beginPath(); x.moveTo(g.x0 + 30, hy + 62); x.lineTo(g.x0 + g.w - 30, hy + 62); x.strokeStyle = rgba(BONE, 0.15); x.lineWidth = 2; x.stroke()
    // thread
    const msgs = p.msgs || []
    const prevN = s.prev && s.prev.k === 'phone' ? (s.prev.msgs || []).length : 0
    const newN = Math.max(1, msgs.length - prevN)
    let y = hy + 104
    const bodyBottom = g.y0 + g.h - 60
    const items = msgs.map((m, i) => {
      const at = i < prevN ? -9 : stagger(i - prevN, newN, s.dur, 0.12, p.spread ?? 0.62)
      return { m, at }
    })
    // measure, then scroll up if the thread overflows
    const FS = p.size || 44
    x.font = font(FS, { weight: 700 })
    const hs = items.map(({ m }) => m[0] === 'status' || m[0] === 'time' ? 50 : m[0] === 'typing' ? 80 : wrap(x, m[1], g.w * 0.66).length * FS * 1.22 + FS * 1.2)
    const vis = items.map((it, i) => (s.lt >= it.at ? 1 : 0))
    let total = 0; hs.forEach((h, i) => { if (vis[i]) total += h + 16 })
    const scroll = Math.max(0, total - (bodyBottom - y))
    x.save(); rr(x, g.x0 + 8, hy + 60, g.w - 16, bodyBottom - hy - 40, 30); x.clip()
    y -= scroll
    items.forEach(({ m, at }, i) => {
      if (s.lt < at) return
      const k = at < 0 ? 1 : easeOutBack(prog(s.lt, at, at + 0.32), 2.2)
      const kind = m[0], h = hs[i]
      if (kind === 'status' || kind === 'time') {
        label(x, m[1], kind === 'time' ? g.x0 + g.w / 2 : g.x0 + g.w - 40, y + 20, { size: 28, weight: 700, family: 'mono', color: kind === 'status' ? color(m[2], MUTED) : MUTED, align: kind === 'time' ? 'center' : 'right', alpha: clamp(k) })
      } else if (kind === 'typing') {
        if (i === items.length - 1 || s.lt < (items[i + 1]?.at ?? 99)) typingDots(x, g.x0 + 110, y + 36, s.t, { col: BONE, s: 0.9, alpha: clamp(k) })
      } else {
        const me = kind === 'me'
        x.font = font(FS, { weight: 700 })
        const ls = wrap(x, m[1], g.w * 0.66), tw = Math.max(...ls.map(l => x.measureText(l).width)), bw = tw + FS * 1.4, bh = h
        const bx = me ? g.x0 + g.w - 30 - bw : g.x0 + 30
        x.save(); x.translate(bx + (me ? bw : 0), y + bh / 2); x.scale(k, k); x.translate(-(bx + (me ? bw : 0)), -(y + bh / 2))
        const col = me ? color(p.meCol, GOLD) : color(p.themCol, VIOLET)
        rr(x, bx, y, bw, bh, FS * 0.7); x.fillStyle = me ? rgba(col, 0.9) : 'rgba(40,28,84,0.95)'; x.fill()
        if (!me) { rr(x, bx, y, bw, bh, FS * 0.7); ink(x, col, { w: 3, fa: 0, glow: 10 }) }
        ls.forEach((l, li) => label(x, l, bx + FS * 0.7, y + FS * 0.6 + FS * 1.22 * (li + 0.5), { size: FS, weight: 700, align: 'left', color: me ? '#1a1033' : BONE, shadow: false }))
        if (m[2]) label(x, m[2], me ? bx + bw : bx, y + bh + 20, { size: 26, weight: 700, family: 'mono', align: me ? 'right' : 'left', color: MUTED, shadow: false })
        x.restore()
        if (m[2]) y += 26
      }
      y += h + 16
    })
    x.restore()
    if (p.stamp) stampAt(x, p.stamp, s.cx, s.cy + g.h * 0.12, s.lt, (p.stampAt ?? 0.8) * s.dur, color(p.stampCol, RED))
  },
  cues(p, t0, dur, { prev } = {}) {
    const msgs = p.msgs || [], prevN = prev && prev.k === 'phone' ? (prev.msgs || []).length : 0, newN = Math.max(1, msgs.length - prevN)
    const c = []
    msgs.forEach((m, i) => { if (i < prevN) return; const at = t0 + stagger(i - prevN, newN, dur, 0.12, p.spread ?? 0.62); c.push(m[0] === 'typing' ? ['tick', at, 0.05] : ['pop', at, m[0] === 'me' ? 1175 : 880, 0.05, m[0] === 'me' ? 0.3 : -0.3]) })
    if (p.stamp) c.push(['boom', t0 + (p.stampAt ?? 0.8) * dur, 0.16])
    return c
  },
}

/** a rubber stamp slamming down (rotated, with a squash) */
function stampAt(x, text, px, py, lt, at, col, { size = 64, rot = -0.14 } = {}) {
  if (lt < at) return
  const k = prog(lt, at, at + 0.18), sc = lerp(2.2, 1, ease.outCubic(k)) * (1 + 0.06 * wob(lt, at + 0.18, 30, 9))
  x.save(); x.translate(px, py); x.rotate(rot); x.scale(sc, sc); x.globalAlpha *= clamp(k * 3)
  x.font = font(size, { weight: 900 }); const w = x.measureText(text).width + size
  rr(x, -w / 2, -size * 0.8, w, size * 1.6, 16); x.fillStyle = rgba(col, 0.16); x.fill()
  rr(x, -w / 2, -size * 0.8, w, size * 1.6, 16); ink(x, col, { w: 8, fa: 0, glow: 22 })
  label(x, text, 0, size * 0.05, { size, weight: 900, color: col, shadow: false })
  x.restore()
}

/** floating chat bubbles (no phone): words: ["hey", "hey?", "hello??"], or hellos in many scripts */
const bubbles = {
  draw(x, p, s) {
    const items = p.items || []
    const r = rng(p.seed ?? 11)
    items.forEach((txt, i) => {
      const at = stagger(i, items.length, s.dur, 0.08, p.spread ?? 0.6)
      const k = pop01(s.lt, at, 0.34, 2.3)
      if (k <= 0) return
      const long = items.some(t => t.length > 9), cols = long ? 1 : 3, row = Math.floor(i / cols), col = i % cols
      const px = p.stack || long ? s.cx + (i % 2 ? 110 : -110) : s.cx + (col - 1) * s.w * 0.31 + (r() - 0.5) * 60
      const rowsN = Math.ceil(items.length / cols)
      const py = p.stack ? s.cy - s.h * 0.4 + i * (s.h * 0.8 / Math.max(1, items.length - 1 || 1)) : s.cy + (row - (rowsN - 1) / 2) * Math.min(220, s.h / rowsN) + (r() - 0.5) * 40
      const fl = p.float ? -Math.max(0, s.lt - at) * 60 : Math.sin(s.t * 1.5 + i) * 8
      bubble(x, txt, px, py + fl, { size: p.size || 44, scale: k, alpha: clamp(k * 2), side: p.stack ? (i % 2 ? 'r' : 'l') : 'c', col: color((p.cols || [])[i % ((p.cols || []).length || 1)], [BLUE, PINK, GOLD, VIOLET][i % 4]) })
    })
  },
  cues(p, t0, dur) { return (p.items || []).map((_, i) => ['pop', t0 + stagger(i, p.items.length, dur, 0.08, p.spread ?? 0.6), 700 + i * 90, 0.04, ((i % 3) - 1) * 0.3]) },
}

// ───────────────────────── the mystery card (chart first, face last)
// { sign, name, lines: ["Sun ♏ Scorpio", …], dealbreakers: ["✕ …"], flip: true (starts as a card back), reveal: at (fraction): the veil lifts }
function mysteryCard(x, cx, cy, w, p, s, { flipK = 1, revealK = 0 } = {}) {
  const h = w * 1.42, S = sign(p.sign) || sign('scorpio')
  const sx = Math.abs(Math.cos(Math.PI * (1 - flipK)))
  x.save(); x.translate(cx, cy); x.scale(Math.max(0.02, sx), 1); x.rotate(Math.sin(s.t * 0.9) * 0.02)
  if (flipK < 0.5) { x.restore(); cardBack(x, cx, cy, w * Math.max(0.02, sx), { t: s.t }); return }
  x.shadowColor = rgba(S.color, 0.6); x.shadowBlur = 50
  rr(x, -w / 2, -h / 2, w, h, w * 0.07); x.fillStyle = '#150c34'; x.fill(); x.shadowBlur = 0
  rr(x, -w / 2, -h / 2, w, h, w * 0.07); line(x, GOLD, Math.max(4, w * 0.014), 14)
  const pw = w * 0.86, ph = h * 0.5, px0 = -pw / 2, py0 = -h / 2 + w * 0.07
  aura(x, px0, py0, pw, ph, s.t, [S.color, '#b45cff', '#ff8fb1', '#8fd8f6'], { r: w * 0.05, seed: 3 })
  if (revealK > 0) {
    // the veil lifts: a bright wash sweeps up and the silhouette steps forward, still no face
    x.save(); rr(x, px0, py0, pw, ph, w * 0.05); x.clip()
    const g = x.createLinearGradient(0, py0 + ph, 0, py0); g.addColorStop(0, rgba('#fff3e0', 0.0)); g.addColorStop(clamp(revealK), rgba('#fff3e0', 0.55)); g.addColorStop(Math.min(1, revealK + 0.01), rgba('#fff3e0', 0))
    x.fillStyle = g; x.fillRect(px0, py0, pw, ph)
    person(x, 0, py0 + ph + 30, w / 520 * lerp(0.9, 1.1, revealK), GOLD, { t: s.t, a: revealK, pose: 'wave' })
    x.restore()
  } else {
    glyph(x, S.glyph, 0, py0 + ph / 2, w * 0.24, rgba('#fff3e0', 0.85), { glow: 30 })
    // lock chip
    pill(x, 'FACE LAST', 0, py0 + ph - w * 0.07, { size: w * 0.045, col: GOLD, fg: GOLD, family: 'mono', weight: 700, glow: 8 })
  }
  let y = py0 + ph + w * 0.1
  label(x, p.name || `${S.name}, mystery card`, -pw / 2, y, { size: w * 0.075, weight: 800, align: 'left', maxW: pw })
  y += w * 0.09
  const lines = p.lines || [`Sun ${S.glyph} ${S.name}`]
  lines.slice(0, 4).forEach((l, i) => { label(x, l, -pw / 2, y + i * w * 0.072, { size: w * 0.05, weight: 700, family: 'mono', align: 'left', color: i === 0 ? S.color : MUTED, maxW: pw, shadow: false }) })
  x.restore()
}
const mystery = {
  min: p => (p.flip ? 2.6 : 2.2) + (p.labels ? 1 : 0),
  draw(x, p, s) {
    const w = Math.min(560, s.h * 0.7) * (p.scale || 1)
    const flipK = p.flip ? ease.inOutCubic(prog(s.clt, 0.25, 0.85)) : 1
    const revealK = p.reveal != null ? ease.inOutCubic(prog(s.lt, p.reveal * s.dur, p.reveal * s.dur + 0.8)) : 0
    mysteryCard(x, s.cx, s.cy, w, p, s, { flipK, revealK })
    if (p.flip) sparkle(x, s.cx, s.cy, s.clt, 0.86, { n: 12, R: w * 0.7, seed: 9 })
    if (revealK > 0) sparkle(x, s.cx, s.cy - w * 0.3, s.lt, p.reveal * s.dur + 0.4, { n: 14, R: w * 0.8, seed: 12 })
    // placards / dealbreaker chips around the card
    const chips = p.labels || []
    chips.forEach((c, i) => {
      const at = stagger(i, chips.length, s.dur, 0.35, 0.75)
      const k = pop01(s.lt, at, 0.3, 2.4)
      const side = i % 2 ? 1 : -1, cy = s.cy - w * 0.45 + Math.floor(i / 2) * 120 + (i % 2) * 60
      x.save(); x.translate(s.cx + side * (w * 0.55 + 10), cy); x.rotate(side * 0.06); x.scale(k, k)
      pill(x, c, 0, 0, { size: 34, col: [GOLD, PINK, BLUE, VIOLET][i % 4], weight: 800 })
      x.restore()
    })
  },
  cues(p, t0, dur) { const c = []; if (p.flip) c.push(['whoosh', t0 + 0.3, 0.5, 0.06], ['bell', t0 + 0.86, 1175, 0.05, 2, 0]); (p.labels || []).forEach((_, i) => c.push(['pop', t0 + stagger(i, p.labels.length, dur, 0.35, 0.75), 900 + i * 100, 0.045, 0])); if (p.reveal != null) c.push(['glitter', t0 + p.reveal * dur, t0 + p.reveal * dur + 0.8], ['bell', t0 + p.reveal * dur + 0.4, 1318, 0.05, 2.2, 0]); return c },
}

/** tonight's deck: card backs dealt into a fan; one glows (glow: index) */
const deck = {
  min: () => 2.4,
  draw(x, p, s) {
    const n = clamp(p.n ?? 6, 3, 9), w = Math.min(280, s.h * 0.36), R = s.h * 0.95
    const glowI = p.glow ?? Math.floor(n / 2)
    for (let i = 0; i < n; i++) {
      const at = 0.15 + i * 0.12
      const k = ease.outCubic(prog(s.clt, at, at + 0.45))
      if (k <= 0) continue
      const a = (i - (n - 1) / 2) * 0.16 * (p.spread ?? 1)
      const fx = s.cx + Math.sin(a) * R * 0.55, fy = s.cy + 60 + (1 - Math.cos(a)) * R * 0.5
      const px = lerp(s.cx, fx, k), py = lerp(s.cy - s.h * 0.8, fy, k)
      const isG = i === glowI && s.lt > (p.glowAt ?? 0.6) * s.dur
      const lift = isG ? -40 * ease.outCubic(prog(s.lt, (p.glowAt ?? 0.6) * s.dur, (p.glowAt ?? 0.6) * s.dur + 0.4)) : 0
      cardBack(x, px, py + lift, w, { rot: lerp(-1.2, a, k), glow: isG ? 1 : 0, t: s.t })
    }
    if (p.label) pill(x, p.label, s.cx, s.cy + s.h * 0.44, { size: 34, family: 'mono', weight: 700, col: GOLD, fg: GOLD, alpha: clamp((s.lt - 0.9) / 0.3) })
    sparkle(x, s.cx, s.cy - 40, s.lt, (p.glowAt ?? 0.6) * s.dur + 0.2, { n: 12, R: 220, seed: 5 })
  },
  cues(p, t0, dur) { const n = clamp(p.n ?? 6, 3, 9), c = []; for (let i = 0; i < n; i++) c.push(['tick', t0 + 0.15 + i * 0.12 + 0.3, 0.06]); c.push(['bell', t0 + (p.glowAt ?? 0.6) * dur + 0.2, 1175, 0.05, 2, 0]); return c },
}

/** a talk card: a question on a tarot-style card; answers: two chips that flip up together ("neither sees until both do") */
const talkcard = {
  min: p => 2.6 + (p.answers ? 1.2 : 0),
  draw(x, p, s) {
    const w = Math.min(640, s.h * 0.7), h = w * 1.22
    const flipK = p.flip === false ? 1 : ease.inOutCubic(prog(s.clt, 0.15, 0.7))
    const sx = Math.abs(Math.cos(Math.PI * (1 - flipK)))
    const cy = s.cy - (p.answers ? 70 : 0)
    if (flipK < 0.5) cardBack(x, s.cx, cy, w / 1.12 * Math.max(0.02, sx), { t: s.t })
    else {
      x.save(); x.translate(s.cx, cy); x.scale(Math.max(0.02, sx), 1); x.rotate(Math.sin(s.t) * 0.015)
      x.shadowColor = rgba(GOLD, 0.5); x.shadowBlur = 50
      rr(x, -w / 2, -h / 2, w, h, 30); const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, '#2b1b62'); g.addColorStop(1, '#170d3a'); x.fillStyle = g; x.fill(); x.shadowBlur = 0
      rr(x, -w / 2, -h / 2, w, h, 30); line(x, GOLD, 6, 16)
      rr(x, -w / 2 + 18, -h / 2 + 18, w - 36, h - 36, 20); x.strokeStyle = rgba(GOLD, 0.4); x.lineWidth = 2; x.stroke()
      label(x, (p.tag || 'TALK CARD').toUpperCase(), 0, -h / 2 + 70, { size: 26, weight: 700, family: 'mono', spacing: 0.2, color: GOLD })
      for (const d of [-1, 1]) drawPixelStar(x, d * (w / 2 - 50), -h / 2 + 70, 26, 0, GOLD)
      para(x, p.q || 'What made you laugh today?', 0, 10, { size: Math.min(58, w * 0.1), weight: 800, maxW: w - 90, lh: 1.15 })
      label(x, p.kind || 'you both answer', 0, h / 2 - 60, { size: 26, weight: 500, family: 'serif', italic: true, color: MUTED })
      x.restore()
    }
    if (p.answers) {
      const at = (p.answersAt ?? 0.6) * s.dur
      p.answers.slice(0, 2).forEach((a, i) => {
        const k = pop01(s.lt, at, 0.4, 2.2)
        x.save(); x.translate(s.cx + (i ? 1 : -1) * w * 0.36, cy + h / 2 + 90); x.rotate((i ? 1 : -1) * 0.05); x.scale(k, k)
        bubble(x, a, 0, 0, { size: 44, maxW: w * 0.7, col: i ? PINK : BLUE })
        x.restore()
      })
    }
  },
  cues(p, t0, dur) { const c = [['whoosh', t0 + 0.2, 0.45, 0.05], ['bell', t0 + 0.7, 988, 0.045, 2, 0]]; if (p.answers) c.push(['pop', t0 + (p.answersAt ?? 0.6) * dur, 1175, 0.05, -0.3], ['pop', t0 + (p.answersAt ?? 0.6) * dur + 0.02, 1318, 0.05, 0.3]); return c },
}

/** dealbreakers: chips stamping onto a card one by one */
const stamps = {
  min: p => 1.2 + (p.items || []).length * 0.55,
  draw(x, p, s) {
    const items = p.items || []
    const w = Math.min(900, s.w * 0.96), h = Math.min(s.h * 0.96, 170 + items.length * 150)
    panel(x, s.cx - w / 2, s.cy - h / 2, w, h, { col: color(p.col, PINK), r: 36 })
    label(x, (p.title || 'DEALBREAKERS').toUpperCase(), s.cx, s.cy - h / 2 + 70, { size: 32, weight: 700, family: 'mono', spacing: 0.2, color: color(p.col, PINK) })
    items.forEach((it, i) => {
      const at = stagger(i, items.length, s.dur, 0.18, 0.7)
      if (s.lt < at) return
      const k = prog(s.lt, at, at + 0.16), sc = lerp(1.9, 1, ease.outCubic(k)) * (1 + 0.05 * wob(s.lt, at + 0.16, 30, 9))
      const y = s.cy - h / 2 + 165 + i * 150
      x.save(); x.translate(s.cx, y); x.rotate((i % 2 ? 1 : -1) * 0.025); x.scale(sc, sc); x.globalAlpha *= clamp(k * 3)
      const good = /^✓/.test(it)
      pill(x, it, 0, 0, { size: 50, col: good ? GREEN : color(p.itemCol, RED), fg: BONE, weight: 900, fillA: 0.14 })
      x.restore()
    })
  },
  cues(p, t0, dur) { return (p.items || []).map((_, i) => ['boom', t0 + stagger(i, p.items.length, dur, 0.18, 0.7), 0.12]) },
}

/** quiz / scenario options. options: ["A) Reply 'nm u'", …]; pick: index circled at pickAt; mark: '✓' | '✕'; stamp text */
const quiz = {
  min: p => 1.4 + (p.options || []).length * 0.55 + (p.pick != null ? 1 : 0),
  draw(x, p, s) {
    const opts = p.options || []
    const cy0 = s.cy - (p.stamp ? 70 : 0)
    const gap = Math.min(200, s.h / Math.max(1, opts.length + (p.stamp ? 1 : 0)))
    const pickT = (p.pickAt ?? 0.72) * s.dur
    opts.forEach((o, i) => {
      const at = p.instant ? -1 : stagger(i, opts.length, s.dur, 0.1, p.pick != null ? 0.5 : 0.65)
      const k = pop01(s.lt, at, 0.32, 2.2)
      if (k <= 0) return
      const y = cy0 + (i - (opts.length - 1) / 2) * gap
      const picked = p.pick === i && s.lt > pickT, dim = p.pick != null && s.lt > pickT && p.pick !== i
      x.save(); x.translate(s.cx, y); x.scale(k * (picked ? 1 + 0.06 * Math.max(0, 1 - (s.lt - pickT) * 3) : 1), k); x.globalAlpha *= dim ? 0.4 : 1
      const col = picked ? color(p.pickCol, p.mark === '✕' ? RED : GREEN) : [BLUE, PINK, GOLD, VIOLET][i % 4]
      x.font = font(52, { weight: 800 }); const ww = Math.min(s.w, Math.max(s.w * 0.7, x.measureText(o).width + 120))
      rr(x, -ww / 2, -gap * 0.36, ww, gap * 0.72, 28); x.fillStyle = 'rgba(16,10,40,0.9)'; x.fill()
      rr(x, -ww / 2, -gap * 0.36, ww, gap * 0.72, 28); ink(x, col, { w: picked ? 8 : 5, fa: picked ? 0.18 : 0, glow: picked ? 30 : 12 })
      label(x, o, 0, 2, { size: 52, weight: 800, maxW: ww - 70 })
      x.restore()
      if (picked && p.mark) label(x, p.mark, s.cx + Math.min(s.w * 0.48, ww / 2) - 6, y - gap * 0.3, { size: 80 * pop01(s.lt, pickT, 0.3, 2.6), weight: 900, color: col, glow: 20 })
    })
    if (p.stamp) stampAt(x, p.stamp, s.cx, s.cy + (opts.length / 2) * gap + 10, s.lt, (p.stampAt ?? Math.min(0.92, (p.pickAt ?? 0.72) + 0.12)) * s.dur, color(p.stampCol, p.mark === '✕' ? RED : GREEN), { size: 72 })
    if (p.pick != null) sparkle(x, s.cx, s.cy + (p.pick - (opts.length - 1) / 2) * gap, s.lt, pickT + 0.05, { n: 10, R: 260, seed: 21 })
  },
  cues(p, t0, dur) {
    const opts = p.options || [], c = opts.map((_, i) => ['pop', t0 + stagger(i, opts.length, dur, 0.1, p.pick != null ? 0.5 : 0.65), 660 + i * 110, 0.045, 0])
    if (p.pick != null) c.push(p.mark === '✕' ? ['tick', t0 + (p.pickAt ?? 0.72) * dur, 0.1] : ['bell', t0 + (p.pickAt ?? 0.72) * dur, 1318, 0.05, 1.8, 0])
    if (p.stamp) c.push(['boom', t0 + (p.stampAt ?? Math.min(0.92, (p.pickAt ?? 0.72) + 0.12)) * dur, 0.14])
    return c
  },
}

/** stamp: one big rubber stamp over an optional small chip of context */
const stamp = {
  draw(x, p, s) {
    if (p.over) para(x, p.over, s.cx, s.cy - 120, { size: 46, weight: 700, maxW: s.w * 0.85, color: MUTED })
    stampAt(x, p.text || 'NOPE', s.cx, s.cy + (p.over ? 60 : 0), s.lt, (p.at ?? 0.2) * s.dur, color(p.col, RED), { size: p.size || 96, rot: p.rot ?? -0.12 })
  },
  cues(p, t0, dur) { return [['boom', t0 + (p.at ?? 0.2) * dur, 0.16]] },
}

// ───────────────────────── Push / Pull / Align: two charts and the three reading lines
function miniWheel(x, cx, cy, R, col, t, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  x.beginPath(); x.arc(0, 0, R, 0, TAU); ink(x, col, { w: 6, fa: 0.1, glow: 18 })
  x.beginPath(); x.arc(0, 0, R * 0.78, 0, TAU); line(x, rgba(col, 0.7), 3, 6)
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; x.beginPath(); x.moveTo(Math.cos(a) * R * 0.78, Math.sin(a) * R * 0.78); x.lineTo(Math.cos(a) * R, Math.sin(a) * R); x.strokeStyle = rgba(col, 0.6); x.lineWidth = 3; x.stroke() }
  x.restore()
}
const ppa = {
  min: () => 3,
  draw(x, p, s) {
    const R = Math.min(200, s.h * 0.27), dx = Math.min(250, s.w * 0.27)
    const A = sign(p.a) || sign('taurus'), B = sign(p.b) || sign('scorpio')
    const ca = { x: s.cx - dx, y: s.cy - 20 }, cb = { x: s.cx + dx, y: s.cy - 20 }
    miniWheel(x, ca.x, ca.y, R, A.color, s.t, s.t * 0.1)
    miniWheel(x, cb.x, cb.y, R, B.color, s.t, -s.t * 0.1)
    glyph(x, A.glyph, ca.x, ca.y, R * 0.6, A.color)
    glyph(x, B.glyph, cb.x, cb.y, R * 0.6, B.color)
    const show = p.show || ['push', 'pull', 'align']
    const L = { push: [-0.55, 'PUSH'], pull: [0, 'PULL'], align: [0.55, 'ALIGN'] }
    show.forEach((k, i) => {
      const at = stagger(i, show.length, s.dur, 0.2, 0.65), q = ease.outCubic(prog(s.lt, at, at + 0.5))
      if (q <= 0) return
      const off = L[k][0] * R
      const x0 = ca.x + R * 0.55, x1 = cb.x - R * 0.55, y = s.cy - 20 + off
      x.beginPath(); x.moveTo(x0, y); x.bezierCurveTo(lerp(x0, x1, 0.33), y - 30 * Math.sign(off || 1), lerp(x0, x1, 0.66), y + 30 * Math.sign(off || 1), lerp(x0, x1, q), y)
      line(x, READING[k], 8, 24)
      pill(x, L[k][1], s.cx, s.cy + R + 70 + i * 0, { size: 1, alpha: 0 })
      label(x, L[k][1], s.cx + (i - (show.length - 1) / 2) * 230, s.cy + R + 90, { size: 40, weight: 900, family: 'mono', spacing: 0.12, color: READING[k], alpha: clamp(q * 2), glow: 12 })
    })
  },
  cues(p, t0, dur) { const show = p.show || ['push', 'pull', 'align']; return show.map((k, i) => ['pluck', t0 + stagger(i, show.length, dur, 0.2, 0.65), [587.33, 739.99, 880][i % 3], 0.05, 0.6, 0]) },
}

export default { person: person1, duo, crowd, phone, bubbles, mystery, deck, talkcard, stamps, quiz, stamp, ppa }
export { stampAt, mysteryCard, miniWheel }
