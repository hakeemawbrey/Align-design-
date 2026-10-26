// starvenus (30 s vertical Align ad, Star Talk #5) · story 0–25.6, then the shared end card ("come" + the Align logo).
//   0.00–4.60  "Your ex | just *texted.*"  A phone buzzes in the sky: "ex · hey stranger :)". Someone (you) starts typing
//              "heyyy :)" in the reply field… and on the drop (2.82) a chorus of sign stars pops up around it, wide-eyed.
//   4.62       card cut (flip).
//   4.70–10.0  "A word from | *Venus.*"  The ♀ Venus star glows in, pink. Box (♀ VENUS STAR): "Venus is *retrograde.*" →
//              "we say this with *love:* do not reply."  Every star nods (twice). The typed reply deletes itself.
//  10.0–16.8   "Leave it | on *read.*"  "Read 10:14 PM" ticks on, the phone screen dims and is flicked away.
//              Box: "you're looking for someone *new.*" → "not someone *again.*" (the chorus rolls its eyes at "again"; Venus
//              winks). "Eyes | *forward.*" frames the second line. The box pops shut.
//  16.90       card cut (deal).
//  17.0–22.6   "Tonight's | *deck.*"  Five card backs deal into a fan. The middle one rises and flips: a veiled mystery card.
//              "Card first. | Face *last.*"  Everyone goes heart-eyed.
//  22.6–25.6   "The stars said | *move on.*"  Venus hops up to centre stage; all the stars glance onward together, then beam.
//              Everything pops out by 25.5; the end card takes over at 25.6.
// One canvas (sky + phone + cards + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff'
const VENUS = '#ff86b8'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  black: [0, 0.3],
  h0: 0.15, h0Land: 0.78, h0Out: [4.3, 4.5],
  notif: 0.55, buzz: [0.7, 1.05, 1.4], type: 1.75, typeGap: 0.11, drop: BEAT(4),   // 2.82
  chorusLookYou: 3.75,
  cut1: 4.62,
  h1: 4.72, h1Land: 5.12, venus: 4.82, open: 5.55, l1: 5.75, l2: 8.15, h1Out: [9.82, 10.0],
  nod: 9.95, erase: [10.05, 10.5], h2: 10.08, h2Land: 10.42, read: 10.75, dim: 11.0, flick: [11.45, 11.95],
  l3: 11.7, h2Out: [14.1, 14.28], l4: 14.35, h3: 14.4, h3Land: 14.75, roll: [15.05, 15.85], vwink: [15.55, 16.05],
  close: 16.75, h3Out: [16.55, 16.75],
  cut2: 16.9,
  h4: 17.0, h4Land: 17.38, deal: 17.12, dealGap: 0.11, rise: [19.15, 19.6], flip: [19.5, 19.88], h4Out: [19.15, 19.33],
  h5: 19.4, h5Land: 19.9, hearts: 20.0, cardOut: [22.3, 22.62], h5Out: [22.38, 22.56],
  vMove: [22.45, 22.95], h6: 22.72, h6Land: 23.3, onward: [23.75, 24.3], beam: 24.3, h6Out: [25.25, 25.5], out: [25.05, 25.48],
}
const VS = '♀ VENUS STAR'
const LINES = [
  { t: T.l1, speaker: VS, color: PINK, text: 'Venus is *retrograde.*' },
  { t: T.l2, speaker: VS, color: PINK, text: 'we say this with *love:* do\u00a0not\u00a0reply.' },
  { t: T.l3, speaker: VS, color: PINK, text: "you're looking for someone *new.*" },
  { t: T.l4, speaker: VS, color: PINK, text: 'not someone *again.*' },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const HOPS = [T.venus + 0.3, ...talkHops(LINES, VS, { cps: CPS }), T.vMove[1], T.h6Land, T.beam]
const REPLY = 'heyyy :)'

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
    const big = late > 0 && n >= nW - late
    ws.push({ t: big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap, big, e: el('span', style, box, w.replace(/\*/g, '')) })
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

// ── the chorus: sign stars. Layout A (beat 1, around the big phone), B (beats 2–3, around Venus + the box),
//    D (beats 4–5, around the deck). Layout swaps happen under the card cuts.
const CH = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'pisces'].map(id => SIGNS.find(s => s.id === id))
const LAY_A = [[150, 690, 156], [935, 680, 164], [125, 1015, 132], [958, 1005, 140], [160, 1335, 156], [918, 1340, 150], [300, 1660, 150], [780, 1665, 156], [540, 1745, 128]]
const LAY_B = [[140, 640, 140], [945, 615, 132], [100, 935, 112], [975, 1250, 104], [112, 1235, 124], [960, 880, 100], [240, 1792, 104], [840, 1792, 104], [540, 1800, 92]]
const LAY_D = [[125, 640, 124], [955, 640, 124], [90, 930, 96], [990, 930, 96], [90, 1300, 100], [990, 1300, 100], [245, 1745, 132], [835, 1745, 132], [540, 1830, 0]]
// beat 5: the chorus gathers in a ring around Venus
const LAY_E = [[175, 760, 140], [905, 760, 140], [105, 1110, 124], [975, 1110, 124], [190, 1480, 136], [890, 1480, 136], [360, 1700, 120], [720, 1700, 120], [540, 1790, 0]]
const CHORUS = CH.map((s, i) => ({ col: s.color, glyph: s.glyph, seed: 21 + i * 3, t: T.drop - 0.04 + [0.0, 0.06, 0.16, 0.1, 0.24, 0.2, 0.3, 0.34, 0.42][i] }))

// Venus placement per beat
const V_B = { x: 420, y: 1035, s: 360 }, V_D = { x: 540, y: 1745, s: 200 }, V_E = { x: 540, y: 1130, s: 400 }
// phone placement
const P_A = { x: 540, y: 1065, s: 1, r: -2 }, P_B = { x: 775, y: 1015, s: 0.5, r: 7 }

// the nod: twice down-and-up
function nodK(t, t0) { const k = t - t0; if (k < 0 || k > 0.9) return 0; return Math.max(0, Math.sin(k / 0.45 * Math.PI)) * (k < 0.45 ? 1 : 0.8) }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 40px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + src })
  const bake = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, faceIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-1.png')])
  const BACK = bake(backIm, 520), FACE = bake(faceIm, 760)
  const BACK_BODY = 1320 / 1528, FACE_BODY = 1262 / 1496      // opaque card body / png width (the rest is soft glow)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Your ex | just *texted.*', { top: 200, size: 128, accentSize: 176, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: PINK })
  const H1 = popText(root, 'A word from | *Venus.*', { top: 200, size: 112, accentSize: 176, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H2 = popText(root, 'Leave it | on *read.*', { top: 200, size: 128, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const H3 = popText(root, 'Eyes | *forward.*', { top: 200, size: 128, accentSize: 176, at: T.h3, late: 1, lateAt: T.h3Land, wobble: true, accentColor: GOLD })
  const H4 = popText(root, "Tonight's | *deck.*", { top: 200, size: 128, accentSize: 176, at: T.h4, late: 1, lateAt: T.h4Land, wobble: true, accentColor: LAV })
  const H5 = popText(root, 'Card first. | Face *last.*', { top: 200, size: 112, accentSize: 160, at: T.h5, late: 1, lateAt: T.h5Land, wobble: true, accentColor: PINK })
  const H6 = popText(root, 'The stars said | *move on.*', { top: 200, size: 104, accentSize: 176, at: T.h6, late: 2, lateAt: T.h6Land, lateGap: 0.14, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out], [H5, T.h5Out], [H6, T.h6Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1400, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the phone (local units: 420 × 800, centred)
  const rr = (X, Y, w, h, r) => { x.beginPath(); x.roundRect(X, Y, w, h, r) }
  function drawPhone(t) {
    let P, k = 1
    if (t < T.cut1) P = P_A
    else if (t < T.flick[0]) P = P_B
    else {
      const p = prog(t, ...T.flick)
      if (p >= 1) return
      P = { x: P_B.x + ease.inCubic(p) * 520, y: P_B.y - Math.sin(p * Math.PI) * 90 - ease.inQuad(p) * 120, s: P_B.s * (1 - 0.3 * p), r: P_B.r + ease.inCubic(p) * 70 }
    }
    if (t < T.cut1) k = easeOutBack(prog(t, 0.05, 0.5), 1.7)
    if (t >= T.cut1 && t < T.cut1 + 0.5) k = easeOutBack(prog(t, T.cut1 + 0.06, T.cut1 + 0.4), 1.8)
    if (k <= 0.01) return
    // buzz jitter
    let bz = 0
    for (const b of T.buzz) { const u = t - b; if (u >= 0 && u < 0.28) bz = Math.max(bz, 1 - u / 0.28) }
    const jx = bz * 9 * Math.sin(t * 190), jr = bz * 3.2 * Math.sin(t * 160 + 1)
    x.save()
    x.translate(P.x + jx, P.y); x.rotate((P.r + jr) * Math.PI / 180); x.scale(P.s * k, P.s * k)
    const w = 420, h = 800, hw = w / 2, hh = h / 2
    // buzz arcs
    if (bz > 0) {
      x.save(); x.strokeStyle = rgba(BONE, 0.85 * bz); x.lineWidth = 8; x.lineCap = 'round'
      for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) { x.beginPath(); x.arc(0, -hh + 140, hw + 34 + i * 30, sd < 0 ? Math.PI - 0.32 : -0.32, sd < 0 ? Math.PI + 0.32 : 0.32); x.stroke() }
      x.restore()
    }
    // body + glow
    const dim = clamp(prog(t, T.dim, T.dim + 0.35))
    x.save(); x.shadowColor = rgba(PINK, 0.55 * (1 - dim * 0.6)); x.shadowBlur = 60
    rr(-hw, -hh, w, h, 64); x.fillStyle = '#140d2a'; x.fill(); x.restore()
    x.lineWidth = 7; x.strokeStyle = rgba(BONE, 0.85); rr(-hw, -hh, w, h, 64); x.stroke()
    // screen
    const sx = -hw + 16, sy = -hh + 16, sw = w - 32, sh = h - 32
    x.save(); rr(sx, sy, sw, sh, 50); x.clip()
    const g = x.createLinearGradient(0, sy, 0, sy + sh)
    g.addColorStop(0, '#3a1f6e'); g.addColorStop(0.55, '#7a2e78'); g.addColorStop(1, '#c4507e')
    x.fillStyle = g; x.fillRect(sx, sy, sw, sh)
    // notch
    x.fillStyle = '#140d2a'; rr(-60, sy + 14, 120, 30, 15); x.fill()
    // clock
    x.fillStyle = rgba(BONE, 0.95); x.textAlign = 'center'; x.textBaseline = 'alphabetic'
    x.font = `500 30px ${INTER}`; x.fillText('Friday, 10:14 PM', 0, sy + 110)
    x.font = `800 112px ${INTER}`; x.fillText('10:14', 0, sy + 225)
    // notification
    const np = easeOutBack(prog(t, T.notif, T.notif + 0.35), 1.6)
    if (np > 0) {
      x.save(); x.translate(0, lerp(-120, 0, np)); x.globalAlpha = clamp(np * 2)
      const ny = sy + 270, nw = sw - 36, nh = 170
      rr(-nw / 2, ny, nw, nh, 30); x.fillStyle = 'rgba(255,240,250,0.2)'; x.fill()
      x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.25)'; x.stroke()
      // pixel heart icon (cracked)
      const hx = -nw / 2 + 26, hy = ny + 26, px = 6
      ;['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...'].forEach((r, j) => [...r].forEach((c, i) => { if (c === 'X') { x.fillStyle = (i === 3 && j > 0 && j < 4) || (i === 4 && j === 2) ? '#3a1f6e' : '#ff5c8a'; x.fillRect(hx + i * px, hy + j * px, px, px) } }))
      x.textAlign = 'left'; x.fillStyle = BONE
      x.font = `800 40px ${INTER}`; x.fillText('ex', hx + 58, ny + 58)
      x.font = `500 26px ${INTER}`; x.fillStyle = rgba(BONE, 0.65); x.textAlign = 'right'; x.fillText('now', nw / 2 - 24, ny + 56)
      x.textAlign = 'left'; x.fillStyle = BONE; x.font = `500 32px ${INTER}`
      x.fillText('hey stranger :)', -nw / 2 + 26, ny + 108)
      x.fillStyle = rgba(BONE, 0.8); x.fillText('been thinking abt u', -nw / 2 + 26, ny + 148)
      // read receipt
      const rp = prog(t, T.read, T.read + 0.2)
      if (rp > 0) { x.globalAlpha = clamp(np * 2) * rp; x.textAlign = 'right'; x.font = `700 24px ${MONO}`; x.fillStyle = GOLD; x.fillText('READ 10:14 PM ✓', nw / 2 - 10, ny + nh + 40) }
      x.restore()
    }
    // reply field
    const typed = replyText(t)
    const fp = clamp(prog(t, T.type - 0.25, T.type))
    if (fp > 0) {
      const fy = sy + sh - 120
      x.save(); x.globalAlpha = fp
      rr(-sw / 2 + 22, fy, sw - 44, 76, 38); x.fillStyle = 'rgba(15,8,34,0.55)'; x.fill(); x.lineWidth = 2; x.strokeStyle = 'rgba(255,255,255,0.35)'; x.stroke()
      x.textAlign = 'left'; x.font = `500 34px ${INTER}`
      if (typed.length) { x.fillStyle = BONE; x.fillText(typed, -sw / 2 + 50, fy + 50) } else { x.fillStyle = rgba(BONE, 0.45); x.fillText('Message', -sw / 2 + 50, fy + 50) }
      const tw = typed.length ? x.measureText(typed).width : 0
      if (Math.floor(t * 2.6) % 2 === 0 && t < T.dim) { x.fillStyle = PINK; x.fillRect(-sw / 2 + 52 + tw, fy + 18, 4, 42) }
      x.restore()
    }
    // dim (screen off)
    if (dim > 0) { x.fillStyle = `rgba(8,5,20,${0.88 * dim})`; x.fillRect(sx, sy, sw, sh) }
    x.restore()
    x.restore()
  }
  function replyText(t) {
    let n = clamp(Math.floor((t - T.type) / T.typeGap) + 1, 0, REPLY.length)
    if (t < T.type) n = 0
    if (t > T.erase[0]) n = Math.max(0, REPLY.length - Math.floor((t - T.erase[0]) / ((T.erase[1] - T.erase[0]) / REPLY.length)))
    return REPLY.slice(0, n)
  }

  // ── Venus
  function venusPos(t) {
    if (t < T.cut2) return V_B
    if (t < T.vMove[0]) return V_D
    const p = prog(t, ...T.vMove), e = ease.inOutCubic(p)
    return { x: lerp(V_D.x, V_E.x, e), y: lerp(V_D.y, V_E.y, e) - Math.sin(p * Math.PI) * 140, s: lerp(V_D.s, V_E.s, e) }
  }
  function venusState(t) {
    const nk = nodK(t, T.nod)
    if (nk > 0) return { mood: 'happy', look: [0, 1], squash: 0.1 * nk, dy: 16 * nk }
    if (t < T.l1) return { mood: 'sparkle', look: t < T.venus + 0.5 ? [1, 0] : [0, 0], blink: false }
    if (t < LT[0].done + 0.1) return { mood: 'neutral', look: [0, 0] }
    if (t < T.l2) return { mood: 'squint', look: [0, 0] }
    if (t < LT[1].chars[22]) return { mood: 'sparkle', look: [0, 0] }           // "…with love:"
    if (t < T.nod) return { mood: 'squint', look: [0, 0] }
    if (t < T.flick[0]) return { mood: 'neutral', look: [1, 0] }               // glances at the phone
    if (t < T.flick[1] + 0.2) return { mood: 'happy', look: [1, -1] }
    if (t < T.l4) return { mood: 'sparkle', look: [0, 0] }
    if (t >= T.vwink[0] && t < T.vwink[1]) return { mood: 'wink', look: [0, 0] }
    if (t < T.close) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.cut2) return { mood: 'happy', look: [0, 0] }
    if (t < T.rise[0]) return { mood: 'wide', look: [0, -1] }
    if (t < T.hearts) return { mood: 'wide', look: [0, -1] }
    if (t < T.vMove[0]) return { mood: 'heart', look: [0, 0] }
    if (t < T.onward[0]) return { mood: 'sparkle', look: [0, 0] }
    if (t < T.onward[1]) return { mood: 'neutral', look: [1, -1], blink: false }
    return { mood: 'happy', look: [0, 0] }
  }
  function drawVenus(t) {
    if (t < T.venus) return
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    let pk = pop01(t, T.venus, 0.45, 1.8)
    if (t >= T.cut2 && t < T.cut2 + 0.6) pk = pop01(t, T.cut2 + 0.12, 0.4, 2)
    if (pk <= 0.02) return
    const P = venusPos(t), st = venusState(t)
    // soft pink halo
    const R = P.s * 1.1
    const g = x.createRadialGradient(P.x, P.y, 0, P.x, P.y, R)
    g.addColorStop(0, rgba(VENUS, 0.28 * pk * ok)); g.addColorStop(1, rgba(VENUS, 0))
    x.fillStyle = g; x.fillRect(P.x - R, P.y - R, R * 2, R * 2)
    drawStarChar(x, P.x, P.y + (st.dy || 0), P.s, t, { color: VENUS, glyph: P.s >= 150 ? '♀' : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash || 0, hops: HOPS, pop: pk * ok, seed: 5, glow: 1.25 })
    sparkles(t, P.x, P.y, T.venus + 0.1, 10, P.s * 0.72, 3)
    sparkles(t, P.x, P.y, T.h6Land, 12, P.s * 0.7, 1)
  }

  // ── the chorus
  function chorusLayout(t) {
    if (t < T.cut1) return LAY_A
    if (t < T.cut2) return LAY_B
    if (t < T.vMove[0]) return LAY_D
    return LAY_D.map((d, i) => { const p = prog(t, T.vMove[0] + 0.03 * i, T.vMove[1] + 0.1 + 0.03 * i), e = ease.inOutCubic(p), E = LAY_E[i]; return [lerp(d[0], E[0], e), lerp(d[1], E[1], e) - Math.sin(p * Math.PI) * 60, lerp(d[2], E[2], e)] })
  }
  function chorusState(t, c, i, p) {
    const k = t - c.t
    let mood = 'wide', look = [0, 0], blink, squash = 0, dy = 0
    const toward = (tx, ty) => [Math.abs(tx - p[0]) > 70 ? Math.sign(tx - p[0]) : 0, Math.abs(ty - p[1]) > 140 ? Math.sign(ty - p[1]) : 0]
    if (t < T.cut1) {
      look = t < T.chorusLookYou + i * 0.04 ? toward(P_A.x, P_A.y) : [0, 0]
      if (k < 0.12) blink = 0.5
      if (t > T.chorusLookYou + 0.4) mood = 'wide'
    } else if (t < T.cut2) {
      mood = 'neutral'
      look = t < T.l1 ? toward(V_B.x, V_B.y) : t < T.nod ? toward(V_B.x, V_B.y) : [0, 0]
      if (t > LT[0].done - 0.25 && t < T.l2) { mood = 'wide'; look = toward(P_B.x, P_B.y) }           // "retrograde?!"
      if (t > T.l2 && t < T.nod) { mood = 'squint'; look = toward(V_B.x, V_B.y) }
      const nk = nodK(t, T.nod + 0.04 * (i % 3))
      if (nk > 0) { mood = 'happy'; look = [0, 1]; squash = 0.12 * nk; dy = 12 * nk }
      if (t > T.flick[0] - 0.1 && t < T.flick[1] + 0.1) { mood = 'wide'; look = [1, -1] }
      if (t > T.flick[1] + 0.1 && t < T.l4) mood = 'happy'
      if (t >= T.l4 && t < T.roll[0]) { mood = 'wide'; look = [0, 0] }
      if (t >= T.roll[0] + 0.03 * i && t < T.roll[1]) mood = 'eyeroll'
      if (t >= T.roll[1]) mood = 'happy'
    } else {
      mood = 'neutral'
      look = t < T.rise[0] ? toward(540, 1240) : toward(540, 1130)
      if (k < 0) look = [0, 0]
      if (t >= T.flip[1] - 0.1 && t < T.hearts) mood = 'wide'
      if (t >= T.hearts + 0.04 * i && t < T.cardOut[0]) mood = 'heart'
      if (t >= T.cardOut[0]) { mood = 'sparkle'; look = toward(V_E.x, V_E.y) }
      if (t >= T.onward[0] + 0.03 * i && t < T.onward[1]) { mood = 'neutral'; look = [1, -1]; blink = false }
      if (t >= T.onward[1]) { mood = 'happy'; look = [0, 0] }
    }
    return { mood, look, blink, squash, dy }
  }
  function drawChorus(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const L = chorusLayout(t)
    CHORUS.forEach((c, i) => {
      const p = L[i]
      if (!p[2]) return
      let pk = pop01(t, c.t, 0.34, 2.4)
      if (t >= T.cut1 && t < T.cut1 + 0.6) pk = pop01(t, T.cut1 + 0.08 + i * 0.025, 0.32, 2.2)
      if (t >= T.cut2 && t < T.cut2 + 0.6) pk = pop01(t, T.cut2 + 0.1 + i * 0.025, 0.32, 2.2)
      if (pk <= 0.02) return
      const st = chorusState(t, c, i, p)
      const hops = [c.t + 0.26, T.nod + 0.6, T.h6Land + (p[0] / W) * 0.1, T.beam + 0.05 * (i % 3)]
      drawStarChar(x, p[0], p[1] + st.dy, p[2], t, { color: c.col, glyph: p[2] >= 110 ? c.glyph : null, mood: st.mood, look: st.look, blink: st.blink, squash: st.squash, seed: c.seed, pop: pk * ok, hops, glow: 0.85, bob: p[2] * 0.05 })
    })
  }

  // ── tonight's deck
  const FAN = [-30, -15, 0, 15, 30], FAN_R = 560, FAN_PY = 1790, CARD_W = 270
  function drawCardImg(img, bodyFrac, cx, cy, wBody, rot, sx = 1, alpha = 1) {
    if (!img) return
    const w = wBody / bodyFrac, h = w * img.height / img.width
    x.save(); x.globalAlpha = alpha; x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.drawImage(img, -w / 2, -h / 2, w, h); x.restore()
  }
  function drawDeck(t) {
    if (t < T.deal || t > T.cardOut[1]) return
    FAN.forEach((deg, i) => {
      const t0 = T.deal + i * T.dealGap
      const p = prog(t, t0, t0 + 0.42)
      if (p <= 0) return
      const e = easeOutBack(p, 1.5)
      const a = deg * Math.PI / 180
      const fx = 540 + Math.sin(a) * FAN_R, fy = FAN_PY - Math.cos(a) * FAN_R
      let cx = lerp(540 + (i - 2) * 40, fx, e), cy = lerp(2300, fy, e), rot = lerp(a * 2.2 + 0.4, a, e)
      if (i === 2) {
        // the middle card rises and flips into the mystery card
        const r = ease.inOutCubic(prog(t, ...T.rise)), f = prog(t, ...T.flip)
        cx = lerp(cx, 540, r); cy = lerp(cy, 1135, r)
        const wB = lerp(CARD_W, 500, r)
        const o = prog(t, ...T.cardOut), oe = ease.inBack ? ease.inBack(o) : ease.inCubic(o)
        cy -= oe * 260; const sc = 1 - 0.85 * ease.inCubic(o)
        const halo = r * (1 - o)
        if (halo > 0) { const g = x.createRadialGradient(cx, cy, 0, cx, cy, 560); g.addColorStop(0, rgba(PINK, 0.32 * halo)); g.addColorStop(1, rgba(PINK, 0)); x.fillStyle = g; x.fillRect(cx - 560, cy - 560, 1120, 1120) }
        const sx = Math.cos(f * Math.PI)
        if (sx > 0) drawCardImg(BACK, BACK_BODY, cx, cy, wB * sc, rot * (1 - r), sx, 1 - o)
        else drawCardImg(FACE, FACE_BODY, cx, cy, wB * sc, rot * (1 - r), -sx, 1 - o)
        if (f > 0.4 && f < 1) sparkles(t, cx, cy, T.flip[0] + 0.2, 12, 330, 2)
        return
      }
      // the others sink away as the middle one rises
      const s = ease.inCubic(prog(t, T.rise[0] + Math.abs(i - 2) * 0.05, T.rise[1] + 0.05))
      if (s >= 1) return
      drawCardImg(BACK, BACK_BODY, cx + Math.sign(i - 2) * s * 160, cy + s * 1100, CARD_W, rot + Math.sign(i - 2) * s * 0.5, 1, 1 - s * 0.3)
    })
  }

  function sparkles(t, cx, cy, t0, n, R, seed) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 28 * (1 - 0.4 * p), i % 2 ? 1 : 2, [GOLD, BONE, PINK, LAV][i % 4])
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.out[1] + 0.02) {
        drawDeck(t)
        drawPhone(t)
        drawChorus(t)
        drawVenus(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.62 (phone → Venus, kept), 16.9 (box shut → tonight's deck, the selected one), 22.65 (inert:
// the card leaves on its own and Venus hops up). End card flips at 25.6.
const CUTS = [{ t: T.cut1, kind: 'flip', keep: true }, { t: T.cut2, kind: 'deal' }, 22.65]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const buzz = t0 => Array.from({ length: 6 }, (_, i) => ['pop', +(t0 + i * 0.045).toFixed(3), 150 + (i % 2) * 20, 0.05, 0])
const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
export const CUES = [
  // 1 · your ex just texted
  ...head(T.h0, 3, T.h0Land, 0),
  ['pop', T.notif, 880, 0.035, 0], ['bell', T.notif + 0.02, 1318.51, 0.02, 0.8, 0],
  ...T.buzz.flatMap(buzz),
  ...Array.from({ length: REPLY.length }, (_, i) => ['tick', +(T.type + i * T.typeGap).toFixed(3), 0.025]),
  ['bell', T.drop, 1046.5, 0.035, 1.4, 0], ['glitter', T.drop, T.drop + 0.6],
  ...CHORUS.map((c, i) => ['pop', +(c.t + 0.12).toFixed(3), NOTE[(i * 3) % 7], 0.03, +((LAY_A[i][0] / W - 0.5) * 1.2).toFixed(2)]),
  ['tick', T.chorusLookYou, 0.03],
  // 2 · a word from Venus
  ...head(T.h1, 3, T.h1Land, 2),
  ['bell', T.venus + 0.1, 1567.98, 0.03, 1.6, 0], ['glitter', T.venus + 0.1, T.venus + 0.7],
  ['pop', T.open, 659.25, 0.04, 0], ['pop', T.open + 0.06, 880, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [VS]: 990 } }),
  ['pop', LT[0].done - 0.15, 392, 0.03, 0],                 // the gasp at "retrograde"
  // the nod (two soft knocks) + the reply deleting itself
  ['pop', T.nod + 0.2, 523.25, 0.035, 0], ['pop', T.nod + 0.65, 523.25, 0.03, 0],
  ...Array.from({ length: REPLY.length }, (_, i) => ['tick', +(T.erase[0] + i * (T.erase[1] - T.erase[0]) / REPLY.length).toFixed(3), 0.02]),
  ...head(T.h2, 3, T.h2Land, 1),
  ['pluck', T.read, 1318.51, 0.035, 0.4, 0.3], ['pop', T.dim, 330, 0.03, 0.3],
  ['whoosh', T.flick[0] + 0.05, 0.45, 0.06],
  // eyes forward
  ...head(T.h3, 1, T.h3Land, 3),
  ['pop', T.roll[0] + 0.05, 440, 0.025, -0.3], ['pop', T.roll[0] + 0.18, 392, 0.025, 0.3],
  ['pluck', T.vwink[0], 1318.51, 0.035, 0.5, -0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // 3 · tonight's deck
  ...head(T.h4, 1, T.h4Land, 0),
  ...[0, 1, 2, 3, 4].flatMap(i => [['tick', +(T.deal + i * T.dealGap + 0.18).toFixed(3), 0.05]]),
  ['whoosh', T.rise[0], 0.4, 0.04], ['bell', T.flip[1], 1318.51, 0.04, 1.6, 0], ['glitter', T.flip[0] + 0.2, T.flip[1] + 0.5],
  ...head(T.h5, 3, T.h5Land, 4),
  ...CHORUS.map((c, i) => ['pop', +(T.hearts + 0.04 * i).toFixed(3), NOTE[(i * 2 + 3) % 7] * 1.0, 0.02, +((LAY_D[i][0] / W - 0.5) * 1.2).toFixed(2)]),
  // 4 · the stars said move on
  ['whoosh', T.cardOut[0], 0.35, 0.035], ['pop', T.vMove[1], 659.25, 0.04, 0],
  ...wordPops(T.h6, 3, 0.08, 1, 0.026), ['pop', T.h6Land, 1046.5, 0.05, 0], ['pop', T.h6Land + 0.14, 1174.66, 0.05, 0], ['pluck', T.h6Land + 0.14, 1046.5, 0.045, 0.7, 0],
  ['glitter', T.h6Land, T.h6Land + 0.5],
  ['tick', T.onward[0], 0.03], ['bell', T.beam, 1567.98, 0.03, 1.4, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
