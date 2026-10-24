// htxmuseum (30 s vertical Align ad) · story 0–25.6, then the shared END CARD ("come" + the Align logo).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.40   HOOK  "Classic Houston | first date: the | *Museum District.*" — a generic columned museum facade builds
//               column by column on the beats, the pediment drops in; two tiny pictograms at the steps. Camera dives
//               through the door.
//   5.40–10.95  "…and you're still | *guessing* | who they are." — three gallery frames with abstract art; two pictograms
//               (from behind) stare, heads tilting. Each artwork spins away into a big "?" on the beats. "Deep art. *Small talk.*"
//  11.10–16.90  "You see who they | are *first.*" — the middle frame grows into a gilded frame; a velvet drape drops and
//               the real veiled mystery card (card-profile-3) hangs there like a painting under a spotlight. Museum
//               placards pop: SUN · Libra, MOON · Gemini, RISING · ♒ Aquarius, then a red DEALBREAKER placard ("One-word texts.").
//  17.10–21.30  "Skip the | *small talk.*" — small-talk bubbles ("so… art?", "cool.", "lol") pop; the painting flips to a
//               real talk card (card-talk-1, "What's a hill you will die on?"). "Ask something *real.*"
//  21.50–25.30  "Skip the | *guessing.*" — the gallery is back; the "?"s burst into gold stars, the pair (gold + pink)
//               lean in, a gold line and a heart of pixel stars.
//  25.30–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6.
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { A, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'

const W = 1080
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', RED = '#ff3d3d', FIRE = '#f0603a', INK = '#1a1430', DULL = '#b9b3d6'
const LILAC = '#c9a6ff', SKYB = '#8fd8f6', VELVET = '#b0204a', TEAL = '#2fc79a'
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const D2R = Math.PI / 180, TAU = Math.PI * 2
const BEAT = n => 0.6 + n * 0.5556

export const END = 25.6
export const T = {
  // hook: the facade
  h0: 0.1, h0Late: BEAT(1), steps: 0.15, cols: [BEAT(2), BEAT(2.5), BEAT(3), BEAT(3.5), BEAT(4), BEAT(4.5)], ped: BEAT(5.5),
  pair0: BEAT(6.5), h0Out: 4.95, dive: [4.85, 5.55],
  // gallery: guessing
  h1: 5.5, guess: BEAT(10), frames: [5.45, 5.6, 5.75], ppl: 5.7, tilts: [BEAT(11), BEAT(12)], qs: [BEAT(12.5), BEAT(13.5), BEAT(14.5)],
  s1: BEAT(15.5), s1Late: BEAT(16.5), h1Out: 10.9, galOut: [10.75, 11.1],
  // the turn: the mystery card as a painting
  grow: [10.9, 11.65], h2: 11.2, h2Late: BEAT(20), unveil: BEAT(21), plac: [BEAT(23), BEAT(24), BEAT(25)], deal: BEAT(27),
  h2Out: 16.85, placOut: 16.75,
  // talk card
  h3: 17.15, h3Late: BEAT(30.5), bubs: [17.3, 17.45, 17.6], flip: BEAT(31.5), s3: BEAT(33.5), h3Out: 21.2,
  shrink: [20.95, 21.6],
  // end line
  h4: 21.6, h4Late: BEAT(38.5), side: [21.4, 21.75], ppl4: 21.65, stars: [BEAT(39.5), BEAT(40), BEAT(40.5)], link: BEAT(41.5),
  h4Out: 25.0, galOut4: [24.85, 25.3],
}

const h2r = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255] }
const rgba = (hex, a) => { const [r, g, b] = h2r(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const thud = (t, t0, amp = 0.16, k = 7, f = 24) => t > t0 ? amp * Math.exp(-(t - t0) * k) * Math.cos((t - t0) * f) : 0

function ink(x, col, { w = 7, fa = 0.28, glow = 18, fill = col } = {}) {
  if (fa > 0) { x.fillStyle = rgba(fill, fa); x.fill() }
  x.lineJoin = 'round'; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = glow
  x.strokeStyle = col; x.lineWidth = w; x.stroke()
  x.shadowBlur = 0
}
const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(x, px, py, t, t0, { n = 10, R = 150, seed = 1, cols = SPARK, size = 28, dur = 0.75 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  const r = rng(seed)
  x.save()
  for (let i = 0; i < n; i++) {
    const a = (i / n) * TAU + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = 1 - Math.pow(1 - Math.min(1, tt / (dur * 0.8)), 3)
    x.globalAlpha = Math.max(0, 1 - Math.max(0, tt - dur * 0.3) / (dur * 0.7))
    drawPixelStar(x, px + Math.cos(a) * d * p, py + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  x.restore()
}

/** springy word-by-word type. `*word*` = accent, `|` = break. `times` per word; `big` = indices that pop big (wobble). */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, times, big = [], colors = {}, lineHeight = 1.02 }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em', display: 'none' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, visibility: 'hidden', transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0', margin: '0 0.08em' })
    if (colors[n]) style.color = colors[n]
    ws.push({ t: times[n], big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const on = t >= w.t && out > 0
        w.e.style.visibility = on ? 'visible' : 'hidden'
        if (!on) { w.e.style.opacity = '0'; continue }
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big ? 7 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}
const seq = (t0, n, gap) => Array.from({ length: n }, (_, i) => +(t0 + i * gap).toFixed(3))

// ───────────────────────── props (bold line art, flat fills, no faces, no brands)

/** pictogram person standing, seen from behind: feet at (cx, fy). tilt = head tilt (deg), lean = body lean (deg) */
function stander(x, cx, fy, col, { a = 1, s = 1, tilt = 0, lean = 0, bob = 0 } = {}) {
  if (a <= 0 || s <= 0.01) return
  x.save(); x.globalAlpha *= a; x.translate(cx, fy); x.scale(s, s); x.rotate(lean * D2R); x.translate(0, bob)
  // legs
  x.beginPath(); x.moveTo(-34, -150); x.lineTo(-38, -4); x.moveTo(34, -150); x.lineTo(38, -4)
  ink(x, col, { w: 30, fa: 0, glow: 14 })
  // torso
  x.beginPath()
  x.moveTo(-84, -130); x.lineTo(-84, -270); x.quadraticCurveTo(-84, -340, -24, -344); x.lineTo(24, -344); x.quadraticCurveTo(84, -340, 84, -270)
  x.lineTo(84, -130); x.quadraticCurveTo(0, -112, -84, -130); x.closePath()
  ink(x, col, { w: 8, fa: 0.28, glow: 18 })
  // head
  x.save(); x.translate(0, -352); x.rotate(tilt * D2R)
  x.beginPath(); x.arc(0, -56, 50, 0, TAU); ink(x, col, { w: 8, fa: 0.36, glow: 22 })
  x.restore()
  x.restore()
}

// ── the facade (generic: columns, pediment, steps; no names, no real building)
const BASE = 1560, COLX = [205, 339, 473, 607, 741, 875], COLTOP = 1040, COLBOT = 1450
function steps(x, k) {
  if (k <= 0) return
  ;[[900, BASE], [820, BASE - 40], [740, BASE - 80]].forEach(([w, y], i) => {
    const kk = clamp(k * 3 - i)
    if (kk <= 0) return
    x.save(); x.translate(540, y); x.scale(lerp(0.4, 1, easeOutBack(kk, 1.6)), 1); x.globalAlpha *= clamp(kk * 2)
    x.beginPath(); x.roundRect(-w / 2, -40, w, 40, 8); ink(x, BONE, { w: 6, fa: 0.16, glow: 12 })
    x.restore()
  })
  // the floor the columns stand on
  const kk = clamp(k * 3 - 2.2)
  if (kk > 0) { x.save(); x.globalAlpha *= kk; x.beginPath(); x.roundRect(170, COLBOT - 10, 740, 20, 6); ink(x, BONE, { w: 6, fa: 0.3, glow: 12 }); x.restore() }
}
function column(x, cx, k, t, t0) {
  if (k <= 0) return
  const h = COLBOT - COLTOP
  x.save(); x.translate(cx, COLBOT)
  const sq = thud(t, t0 + 0.32, 0.08)
  x.scale(1 + sq, k * (1 - sq))
  // base, shaft (with flutes), capital
  x.beginPath(); x.roundRect(-40, -26, 80, 26, 5); ink(x, BONE, { w: 6, fa: 0.3, glow: 12 })
  x.beginPath(); x.moveTo(-30, -26); x.lineTo(-26, -h + 26); x.lineTo(26, -h + 26); x.lineTo(30, -26); x.closePath(); ink(x, BONE, { w: 6, fa: 0.14, glow: 14, fill: LILAC })
  x.save(); x.globalAlpha *= 0.5; x.beginPath(); x.moveTo(-9, -40); x.lineTo(-8, -h + 40); x.moveTo(9, -40); x.lineTo(8, -h + 40); ink(x, BONE, { w: 4, fa: 0, glow: 0 }); x.restore()
  x.beginPath(); x.roundRect(-46, -h, 92, 26, 5); ink(x, BONE, { w: 6, fa: 0.3, glow: 12 })
  x.restore()
}
function pediment(x, t, k) {
  if (k <= 0) return
  const land = T.ped + 0.3
  const y = -380 * (1 - ease.inQuad(clamp(k)))
  const sq = thud(t, land, 0.12)
  x.save(); x.translate(540, COLTOP + y); x.scale(1 + sq, 1 - sq); x.globalAlpha *= clamp(k * 3)
  // entablature
  x.beginPath(); x.roundRect(-380, -64, 760, 64, 6); ink(x, BONE, { w: 7, fa: 0.2, glow: 16 })
  // a row of little dentils
  x.save(); x.globalAlpha *= 0.55; x.fillStyle = BONE
  for (let i = -350; i <= 340; i += 36) x.fillRect(i, -22, 16, 14)
  x.restore()
  // the triangle
  x.beginPath(); x.moveTo(-420, -64); x.lineTo(0, -270); x.lineTo(420, -64); x.closePath(); ink(x, GOLD, { w: 9, fa: 0.16, glow: 22 })
  x.beginPath(); x.moveTo(-330, -86); x.lineTo(0, -246); x.lineTo(330, -86); x.closePath(); ink(x, GOLD, { w: 3, fa: 0, glow: 0 })
  // an abstract emblem: a little 8-point star in the tympanum
  x.save(); x.translate(0, -140); x.rotate(t * 0.6)
  x.beginPath(); for (let i = 0; i < 16; i++) { const r = i % 2 ? 14 : 36, a = (i / 16) * TAU; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath()
  ink(x, GOLD, { w: 4, fa: 0.6, glow: 20 })
  x.restore()
  x.restore()
}
/** the dark doorway between the middle columns (where the camera dives) */
function door(x, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.beginPath(); x.moveTo(482, COLBOT - 10); x.lineTo(482, 1220); x.arc(540, 1220, 58, Math.PI, 0); x.lineTo(598, COLBOT - 10); x.closePath()
  x.fillStyle = 'rgba(8,5,22,0.9)'; x.fill(); ink(x, GOLD, { w: 5, fa: 0, glow: 16 })
  // warm light spilling from inside
  const g = x.createRadialGradient(540, 1330, 10, 540, 1330, 120); g.addColorStop(0, rgba(GOLD, 0.35)); g.addColorStop(1, rgba(GOLD, 0))
  x.fillStyle = g; x.fill()
  x.restore()
}

// ── gallery frames + abstract art (generic shapes; no real artworks)
const FR = [{ cx: 215, cy: 890, w: 270, h: 340 }, { cx: 540, cy: 860, w: 290, h: 400 }, { cx: 865, cy: 890, w: 270, h: 300 }]
const BIG = { cx: 540, cy: 1000, w: 560, h: 800 }
function frame(x, f, { a = 1, col = GOLD, wall = 'rgba(14,9,32,0.92)' } = {}) {
  if (a <= 0) return
  const { cx, cy, w, h } = f, b = Math.max(18, w * 0.07)
  x.save(); x.globalAlpha *= a
  x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 30; x.shadowOffsetY = 12
  x.fillStyle = wall; x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.beginPath(); x.rect(cx - w / 2 - b, cy - h / 2 - b, w + 2 * b, h + 2 * b); x.rect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = rgba(col, 0.22); x.fill('evenodd')
  x.beginPath(); x.rect(cx - w / 2 - b, cy - h / 2 - b, w + 2 * b, h + 2 * b); ink(x, col, { w: 8, fa: 0, glow: 22 })
  x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); ink(x, col, { w: 4, fa: 0, glow: 8 })
  // corner ornaments
  x.fillStyle = col
  for (const [sx, sy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { x.beginPath(); x.arc(cx + sx * (w / 2 + b / 2), cy + sy * (h / 2 + b / 2), b * 0.32, 0, TAU); x.fill() }
  x.restore()
}
const clipIn = (x, f) => { x.beginPath(); x.rect(f.cx - f.w / 2, f.cy - f.h / 2, f.w, f.h); x.clip() }
function art(x, i, f, t, k) {
  if (k <= 0) return
  x.save(); clipIn(x, f); x.translate(f.cx, f.cy); x.rotate((1 - k) * 2.4); x.scale(k, k)
  const s = f.w / 270
  x.scale(s, s)
  if (i === 0) {
    x.beginPath(); x.arc(-30, -50, 70, 0, TAU); ink(x, FIRE, { w: 7, fa: 0.75, glow: 16 })
    x.beginPath(); x.moveTo(-90, 120); x.lineTo(40, -10); x.lineTo(100, 130); x.closePath(); ink(x, SKYB, { w: 7, fa: 0.55, glow: 14 })
    x.beginPath(); x.moveTo(-110, 40); x.lineTo(110, -120); ink(x, BONE, { w: 8, fa: 0, glow: 10 })
    x.beginPath(); x.arc(70, -110, 18, 0, TAU); ink(x, GOLD, { w: 5, fa: 0.9, glow: 12 })
  } else if (i === 1) {
    for (let j = 0; j < 4; j++) {
      x.beginPath()
      for (let u = -110; u <= 110; u += 6) x.lineTo(u, -120 + j * 72 + 22 * Math.sin(u * 0.05 + j * 1.3 + t * 1.5))
      ink(x, [PINK, LILAC, GOLD, TEAL][j], { w: 9, fa: 0, glow: 14 })
    }
    ;[[-70, 130, PINK], [10, 150, GOLD], [80, 120, SKYB]].forEach(([px, py, c]) => { x.beginPath(); x.arc(px, py, 14, 0, TAU); ink(x, c, { w: 4, fa: 0.9, glow: 10 }) })
  } else {
    x.beginPath(); x.roundRect(-105, -120, 210, 120, 10); ink(x, PINK, { w: 6, fa: 0.6, glow: 12 })
    x.beginPath(); x.roundRect(-105, 14, 210, 100, 10); ink(x, LILAC, { w: 6, fa: 0.45, glow: 12 })
    x.beginPath(); x.roundRect(-105, -6, 210, 12, 6); x.fillStyle = rgba(GOLD, 0.8); x.fill()
  }
  x.restore()
}
function qmark(x, f, k, col, t, t0) {
  if (k <= 0) return
  x.save(); clipIn(x, f); x.translate(f.cx, f.cy + 8 * Math.sin((t - t0) * 3))
  const sq = thud(t, t0 + 0.32, 0.12)
  x.scale(k * (1 + sq), k * (1 - sq)); x.rotate(-6 * D2R * Math.sin((t - t0) * 2.2))
  x.font = `italic 500 ${Math.round(f.h * 0.85)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.shadowColor = col; x.shadowBlur = 30; x.fillStyle = col; x.fillText('?', 0, f.h * 0.04)
  x.restore()
}

// ── museum placards (white wall labels)
const PLAC = [{ cx: 220, label: 'SUN', val: 'Libra', col: '#c0407a' }, { cx: 540, label: 'MOON', val: 'Gemini', col: '#5a4fc9' }, { cx: 860, label: 'RISING', val: 'Aquarius', col: '#1f9cc4', glyph: '♒\uFE0E', gcol: '#38c4ec', valSize: 50 }]
const PLAC_Y = 1515, DEAL_Y = 1700
function placard(x, w, h, label, val, col, { valFont = `italic 600 60px ${SERIF}`, valCol = INK, mark = false, glyph = null, gcol = col } = {}) {
  x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 26; x.shadowOffsetY = 10
  x.fillStyle = '#f6f1e6'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 12); x.fill()
  x.shadowOffsetY = 0; x.shadowBlur = 0
  x.strokeStyle = rgba(col, 0.9); x.lineWidth = 5; x.stroke()
  x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = col; x.font = `700 28px ${MONO}`; x.fillText(label, 0, -h / 2 + 32)
  x.fillStyle = valCol; x.font = valFont
  if (mark) {
    const tw = x.measureText(val).width, ox = 30
    x.fillText(val, ox, 18)
    x.save(); x.translate(ox - tw / 2 - 40, 16); x.beginPath(); x.moveTo(-15, -15); x.lineTo(15, 15); x.moveTo(15, -15); x.lineTo(-15, 15); ink(x, RED, { w: 9, fa: 0, glow: 8 }); x.restore()
  } else if (glyph) {
    const tw = x.measureText(val).width, gw = 44, ox = gw / 2 + 4
    x.fillText(val, ox, 18)
    x.save(); x.font = "bold 50px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"; x.fillStyle = gcol; x.shadowColor = gcol; x.shadowBlur = 8
    x.fillText(glyph, ox - tw / 2 - gw / 2 - 6, 18); x.restore()
  } else x.fillText(val, 0, 18)
}

/** small-talk speech bubble */
function bubble(x, txt, k, tailR) {
  x.font = `800 54px ${INTER}`
  const w = x.measureText(txt).width + 70, h = 100
  x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 50)
  const tx = tailR ? w / 2 - 50 : -w / 2 + 50
  x.moveTo(tx - 20, h / 2 - 4); x.lineTo(tx + (tailR ? 20 : -20), h / 2 + 40); x.lineTo(tx + 20, h / 2 - 4)
  x.fillStyle = '#d8d4ea'; x.fill(); ink(x, BONE, { w: 5, fa: 0, glow: 14 })
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 3)
}
const BUBS = [{ txt: 'so… art?', x: 260, y: 1560, r: -5, tailR: false }, { txt: 'cool.', x: 830, y: 1470, r: 6, tailR: true }, { txt: 'lol', x: 790, y: 1700, r: -4, tailR: true }]

// image helpers
function loadImage(src) {
  return new Promise(res => { const i = new Image(); i.decoding = 'sync'; i.onload = () => res(i); i.onerror = () => res(null); i.src = src })
}
function prescale(im, w) {
  if (!im) return null
  const h = Math.round(w * im.naturalHeight / im.naturalWidth)
  const mk = (cw, ch) => { const c = document.createElement('canvas'); c.width = cw; c.height = ch; const x = c.getContext('2d'); x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high'; return [c, x] }
  const [c1, x1] = mk(w * 2, h * 2); x1.drawImage(im, 0, 0, w * 2, h * 2)
  const [c2, x2] = mk(w, h); x2.drawImage(c1, 0, 0, w, h)
  return c2
}
// card-profile-*.png: 1496×2238, body ≈ [120,114,1374,2116]; card-talk-*.png: 732×1170, body ≈ [62,62,670,1108]
const PROF = { iw: 1496, ih: 2238, body: [120, 114, 1374, 2116] }
const TALK = { iw: 732, ih: 1170, body: [62, 62, 670, 1108] }
/** draw a card image so its body's height fills `h`, centred at (0,0) */
function drawCardImg(x, img, spec, h) {
  if (!img) return
  const [bx0, by0, bx1, by1] = spec.body, s = h / (by1 - by0)
  const ox = -((bx0 + bx1) / 2) * s, oy = -((by0 + by1) / 2) * s
  x.drawImage(img, ox, oy, spec.iw * s, spec.ih * s)
}

export async function build(stage) {
  try {
    await Promise.all(["800 108px Inter", "800 54px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "italic 600 60px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [imP, imT] = await Promise.all([loadImage(A + 'card-profile-3.png'), loadImage(A + 'card-talk-1.png')])
  const PROF_IMG = prescale(imP, 640), TALK_IMG = prescale(imT, 620)
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const eyebrow = (txt, color = GOLD) => el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('MUSEUM DISTRICT · SATURDAY'), 0.05, T.h0Out], [eyebrow('ON ALIGN'), T.h2, T.h2Out]]
  const H0 = popText(root, 'Classic Houston | first date: the | *Museum* *District.*', { top: 205, size: 106, accentSize: 150, accentColor: GOLD, lineHeight: 1.0,
    times: [...seq(T.h0, 5, 0.07), T.h0Late, T.h0Late + 0.1], big: [5, 6] })
  const H1 = popText(root, '…and you’re still | *guessing* | who they are.', { top: 200, size: 100, accentSize: 156, accentColor: PINK, lineHeight: 1.0,
    times: [...seq(T.h1, 3, 0.07), T.guess, ...seq(T.guess + 0.22, 3, 0.07)], big: [3] })
  const S1 = popText(root, 'Deep art. *Small* *talk.*', { top: 1135, size: 70, weight: 800, accentSize: 86, accentColor: SKYB,
    times: [T.s1, T.s1 + 0.08, T.s1Late, T.s1Late + 0.1], big: [2, 3] })
  const H2 = popText(root, 'You see who | they are *first.*', { top: 205, size: 104, accentSize: 140, accentColor: GOLD,
    times: [...seq(T.h2, 5, 0.07), T.h2Late], big: [5] })
  const H3 = popText(root, 'Skip the | *small* *talk.*', { top: 205, size: 116, accentSize: 156, accentColor: SKYB,
    times: [T.h3, T.h3 + 0.08, T.h3Late, T.h3Late + 0.1], big: [2, 3] })
  const S3 = popText(root, 'Ask something *real.*', { top: 1575, size: 76, weight: 800, accentSize: 96, accentColor: GOLD,
    times: [T.s3, T.s3 + 0.08, T.s3 + 0.3], big: [2] })
  const H4 = popText(root, 'Skip the | *guessing.*', { top: 205, size: 132, accentSize: 184, accentColor: PINK,
    times: [T.h4, T.h4 + 0.08, T.h4Late], big: [2] })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [S1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [S3, T.h3Out], [H4, T.h4Out]]

  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  // ── 1 · the facade; the camera dives through the door
  function drawFacade(t) {
    if (t > T.dive[1]) return
    const dv = ease.inCubic(prog(t, ...T.dive))
    const rise = 1 - ease.outCubic(prog(t, T.steps, T.steps + 0.6))
    x.save(); x.globalAlpha = 1 - ease.inQuad(prog(t, T.dive[0] + 0.25, T.dive[1]))
    x.translate(540, 1330); x.scale(1 + 3.2 * dv, 1 + 3.2 * dv); x.translate(-540, -1330 + rise * 120)
    steps(x, clamp(prog(t, T.steps, T.steps + 0.55)))
    door(x, clamp(prog(t, T.cols[2], T.cols[3])))
    T.cols.forEach((tc, i) => column(x, COLX[i], easeOutBack(prog(t, tc, tc + 0.32), 1.8), t, tc))
    pediment(x, t, prog(t, T.ped, T.ped + 0.3))
    // the pair at the steps, small
    const pk = pop01(t, T.pair0, 0.4)
    stander(x, 400, 1760, GOLD, { a: clamp(pk * 3), s: 0.55 * pk, bob: 4 * Math.sin(t * 5) })
    stander(x, 680, 1760, DULL, { a: clamp(pk * 3), s: 0.55 * pk, bob: 4 * Math.sin(t * 5 + 1.5) })
    x.restore()
    T.cols.forEach((tc, i) => sparkle(x, COLX[i], COLTOP + rise * 120, t, tc + 0.3, { n: 6, R: 90, seed: 10 + i, size: 20, cols: [BONE, GOLD, LILAC] }))
    sparkle(x, 540, 830, t, T.ped + 0.3, { n: 16, R: 420, seed: 3, size: 30 })
    sparkle(x, 540, 1650, t, T.pair0 + 0.1, { n: 10, R: 260, seed: 4, size: 22 })
  }

  // ── 2 · the gallery (also the end line); 3+4 · the middle frame grows, holds the card, then the talk card
  function midFrame(t) {
    // where the middle frame is: small → big (grow) → small (shrink)
    const g = ease.inOutCubic(prog(t, ...T.grow)) * (1 - ease.inOutCubic(prog(t, ...T.shrink)))
    const f = FR[1]
    return { cx: lerp(f.cx, BIG.cx, g), cy: lerp(f.cy, BIG.cy, g), w: lerp(f.w, BIG.w, g), h: lerp(f.h, BIG.h, g), g }
  }

  function drawGallery(t) {
    const act2 = t >= T.frames[0] - 0.05 && t < T.galOut[1]
    const act5 = t >= T.side[0] && t < T.galOut4[1]
    // side frames
    if (act2 || act5) {
      ;[0, 2].forEach(i => {
        const f = FR[i]
        let k, a
        if (act2) { k = pop01(t, T.frames[i], 0.42, 1.8); a = 1 - ease.inCubic(prog(t, ...T.galOut)) }
        else { k = pop01(t, T.side[0] + (i ? 0.1 : 0), 0.42, 1.8); a = 1 - ease.inCubic(prog(t, ...T.galOut4)) }
        if (k <= 0 || a <= 0) return
        const sx = act2 ? lerp(0, (i ? 1 : -1) * 260, ease.inCubic(prog(t, ...T.galOut))) : (i ? 1 : -1) * 120 * (1 - ease.outCubic(prog(t, ...T.side)))
        const sf = { ...f, cx: f.cx + sx }
        x.save(); x.translate(sf.cx, sf.cy); x.scale(k, k); x.rotate(Math.sin(t * 1.3 + i) * 1.2 * D2R); x.translate(-sf.cx, -sf.cy); x.globalAlpha = a
        frame(x, sf)
        drawArtOrQ(x, i, sf, t, act5)
        x.restore()
      })
    }
  }
  /** a frame's content: art in act 2 until its "?" beat; in the end line: "?" until its star beat, then a star */
  function drawArtOrQ(x, i, f, t, end) {
    const qcol = [PINK, GOLD, SKYB][i]
    if (!end) {
      const tq = T.qs[i]
      art(x, i, f, t, 1 - ease.inCubic(prog(t, tq - 0.2, tq + 0.05)))
      qmark(x, f, pop01(t, tq, 0.36, 2.4), qcol, t, tq)
      sparkle(x, f.cx, f.cy, t, tq, { n: 10, R: 200, seed: 20 + i, size: 24, cols: [qcol, BONE, GOLD] })
    } else {
      const ts = T.stars[i === 0 ? 0 : 2]
      qmark(x, f, 1 - ease.inCubic(prog(t, ts - 0.15, ts)), qcol, t, T.side[0])
      const sk = pop01(t, ts, 0.4, 2.4)
      if (sk > 0) {
        x.save(); clipIn(x, f); x.translate(f.cx, f.cy); x.rotate(t * 0.8 + i); x.scale(sk, sk)
        x.beginPath(); for (let j = 0; j < 16; j++) { const r = j % 2 ? 34 : 104, a = (j / 16) * TAU; x.lineTo(Math.cos(a) * r, Math.sin(a) * r) } x.closePath()
        ink(x, GOLD, { w: 6, fa: 0.7, glow: 30 })
        x.restore()
      }
      sparkle(x, f.cx, f.cy, t, ts, { n: 12, R: 220, seed: 70 + i, size: 26 })
    }
  }

  function drawMiddle(t) {
    const act2 = t >= T.frames[1] - 0.05
    if (!act2 || t >= T.galOut4[1]) return
    const M = midFrame(t)
    const k = t < T.grow[0] + 0.2 ? pop01(t, T.frames[1], 0.42, 1.8) : 1
    const a = 1 - ease.inCubic(prog(t, ...T.galOut4))
    // the spotlight (turn + talk)
    const sl = clamp(prog(t, T.unveil - 0.3, T.unveil + 0.2)) * (1 - prog(t, T.shrink[0], T.shrink[1]))
    if (sl > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = sl * 0.55
      const g = x.createLinearGradient(0, 0, 0, M.cy + M.h / 2)
      g.addColorStop(0, rgba('#fff3d0', 0.0)); g.addColorStop(0.35, rgba('#fff3d0', 0.12)); g.addColorStop(1, rgba(GOLD, 0.28))
      x.fillStyle = g; x.beginPath(); x.moveTo(470, 0); x.lineTo(610, 0); x.lineTo(M.cx + M.w * 0.75, M.cy + M.h / 2 + 60); x.lineTo(M.cx - M.w * 0.75, M.cy + M.h / 2 + 60); x.closePath(); x.fill()
      x.restore()
    }
    const bump = 1 + 0.05 * Math.exp(-Math.max(0, t - T.unveil) * 6) * (t > T.unveil ? 1 : 0)
    x.save(); x.globalAlpha = a
    x.translate(M.cx, M.cy); x.scale(k * bump, k * bump); x.rotate(Math.sin(t * 1.1) * (1 - M.g) * 1.2 * D2R); x.translate(-M.cx, -M.cy)
    frame(x, M)
    // content
    const end = t >= T.shrink[0]
    if (t < T.grow[0] + 0.1) drawArtOrQ(x, 1, M, t, false)
    else if (!end) {
      // the old "?" fades as it grows, then the card under the drape
      qmark(x, M, 1 - prog(t, T.grow[0], T.grow[0] + 0.3), GOLD, t, T.qs[1])
      drawPainting(x, M, t)
    } else {
      drawPainting(x, M, t)
    }
    x.restore()
    if (t > T.grow[1] && t < T.shrink[0]) {
      sparkle(x, M.cx, M.cy, t, T.unveil + 0.1, { n: 18, R: 460, seed: 5, size: 32, dur: 0.9 })
      sparkle(x, M.cx, M.cy, t, T.flip, { n: 14, R: 420, seed: 6, size: 28 })
    }
  }

  /** inside the big frame: the drape, the mystery card, then the talk card flip */
  function drawPainting(x, M, t) {
    x.save(); clipIn(x, M)
    const h = M.h * 0.985
    // card visibility: profile until the flip, talk after; at the end line it's the profile again, small
    const fl = t < T.shrink[0] ? t : 0
    const f1 = 1 - ease.inCubic(prog(fl, T.flip - 0.2, T.flip))           // profile squash to 0
    const f2 = easeOutBack(prog(fl, T.flip, T.flip + 0.3), 1.6)              // talk grows from 0
    const endProf = t >= T.shrink[0]
    if (endProf) {
      // talk card back to the profile as it shrinks
      const sw = prog(t, T.shrink[0], T.shrink[0] + 0.3)
      x.save(); x.translate(M.cx, M.cy)
      if (sw < 0.5) { x.scale(1 - sw * 2, 1); drawCardImg(x, TALK_IMG, TALK, h) } else { x.scale(sw * 2 - 1, 1); drawCardImg(x, PROF_IMG, PROF, h) }
      x.restore()
    } else {
      if (f1 > 0) { x.save(); x.translate(M.cx, M.cy); x.scale(f1, 1); drawCardImg(x, PROF_IMG, PROF, h); x.restore() }
      if (f2 > 0) { x.save(); x.translate(M.cx, M.cy); x.scale(f2, 1); drawCardImg(x, TALK_IMG, TALK, h); x.restore() }
    }
    // the velvet drape: covers the frame until the unveil, shimmies, then drops
    if (!endProf) {
      const dp = ease.inCubic(prog(t, T.unveil - 0.12, T.unveil + 0.3))
      if (dp < 1) {
        const shim = Math.sin((t - T.grow[0]) * 9) * Math.exp(-Math.max(0, t - T.grow[1]) * 2) * 10 + (t > T.h2Late ? 8 * Math.sin((t - T.h2Late) * 22) * Math.exp(-(t - T.h2Late) * 5) : 0)
        const top = M.cy - M.h / 2 - 4 + dp * (M.h + 60)
        x.save(); x.translate(shim * (1 - dp), 0)
        const g = x.createLinearGradient(M.cx - M.w / 2, 0, M.cx + M.w / 2, 0)
        for (let i = 0; i <= 8; i++) g.addColorStop(i / 8, i % 2 ? '#7a0f33' : VELVET)
        x.fillStyle = g
        x.beginPath(); x.moveTo(M.cx - M.w / 2 - 10, top)
        x.lineTo(M.cx + M.w / 2 + 10, top); x.lineTo(M.cx + M.w / 2 + 10, top + M.h + 10)
        for (let i = 8; i > 0; i--) { const x0 = M.cx - M.w / 2 + (M.w * i) / 8, x1 = x0 - M.w / 8; x.quadraticCurveTo((x0 + x1) / 2, top + M.h + 40, x1, top + M.h + 10) }
        x.closePath(); x.fill()
        // a gold tassel rope across the top
        x.beginPath(); x.moveTo(M.cx - M.w / 2, top + 30); x.quadraticCurveTo(M.cx, top + 110, M.cx + M.w / 2, top + 30); ink(x, GOLD, { w: 8, fa: 0, glow: 14 })
        x.beginPath(); x.arc(M.cx, top + 72, 14, 0, TAU); ink(x, GOLD, { w: 4, fa: 0.9, glow: 12 })
        // a "?" on the drape while it's small; it hides who they are
        x.globalAlpha *= clamp(M.g * 2)
        x.font = `italic 500 ${Math.round(M.h * 0.42)}px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'
        x.fillStyle = rgba(GOLD, 0.55); x.fillText('?', M.cx, top + M.h * 0.55)
        x.restore()
      }
    }
    x.restore()
  }

  // ── people in the gallery (act 2 and the end line)
  function drawPeople(t) {
    if (t >= T.ppl && t < T.galOut[1]) {
      const a = 1 - ease.inCubic(prog(t, ...T.galOut))
      const pk = pop01(t, T.ppl, 0.4), dk = pop01(t, T.ppl + 0.1, 0.4)
      const tl = T.tilts.reduce((s, tt, i) => s + (i % 2 ? -1 : 1) * 14 * Math.sin(Math.PI * prog(t, tt, tt + 0.5)), 0)
      const puzz = T.qs.reduce((s, tq) => s + Math.max(0, Math.sin(Math.PI * prog(t, tq, tq + 0.3))), 0)
      stander(x, 360, 1830, GOLD, { a: a * clamp(pk * 3), s: pk, tilt: tl + 10 * clamp(prog(t, T.qs[2], T.qs[2] + 0.4)), bob: -14 * puzz })
      stander(x, 720, 1830, DULL, { a: a * clamp(dk * 3), s: dk, tilt: -tl - 10 * clamp(prog(t, T.qs[2], T.qs[2] + 0.4)), bob: -14 * puzz })
      // little "?" over each head after the art turns
      ;[[360, PINK, 0], [720, SKYB, 1]].forEach(([px, c, j]) => {
        const qk = pop01(t, T.qs[2] + 0.25 + j * 0.12, 0.36, 2.4)
        if (qk <= 0) return
        x.save(); x.globalAlpha = a; x.translate(px + (j ? 60 : -60), 1290 + 10 * Math.sin(t * 4 + j)); x.scale(qk, qk)
        x.font = `italic 600 120px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = c; x.shadowBlur = 24; x.fillStyle = c; x.fillText('?', 0, 0)
        x.restore()
      })
    }
    if (t >= T.ppl4 && t < T.galOut4[1]) {
      const a = 1 - ease.inCubic(prog(t, ...T.galOut4))
      const pk = pop01(t, T.ppl4, 0.4), dk = pop01(t, T.ppl4 + 0.1, 0.4)
      const lean = 6 * ease.inOutCubic(prog(t, T.link - 0.5, T.link))
      stander(x, 400, 1830, GOLD, { a: a * clamp(pk * 3), s: pk, lean, tilt: lean * 1.6, bob: 4 * Math.sin(t * 3) })
      stander(x, 680, 1830, PINK, { a: a * clamp(dk * 3), s: dk, lean: -lean, tilt: -lean * 1.6, bob: 4 * Math.sin(t * 3 + 1) })
      // gold link between their heads, then a heart of pixel stars
      const lk = ease.inOutCubic(prog(t, T.link, T.link + 0.35))
      if (lk > 0) {
        const y = 1830 - 408
        x.save(); x.globalAlpha = a; x.beginPath()
        for (let i = 0; i <= 40 * lk; i++) { const u = i / 40, px = lerp(410, 670, u), py = y - 70 - 90 * Math.sin(Math.PI * u); i ? x.lineTo(px, py) : x.moveTo(px, py) }
        ink(x, GOLD, { w: 10, fa: 0, glow: 26 }); x.restore()
      }
      const hk = pop01(t, T.link + 0.3, 0.5, 2.2)
      if (hk > 0) {
        const hy = 1180 - 20 * ease.outCubic(prog(t, T.link, T.link + 1.4)), pulse = 1 + 0.06 * Math.sin((t - T.link) * 8)
        x.save(); x.globalAlpha = a
        for (let i = 0; i < 22; i++) {
          const th = Math.PI + (i / 22) * TAU
          const hx = 16 * Math.pow(Math.sin(th), 3), hyy = -(13 * Math.cos(th) - 5 * Math.cos(2 * th) - 2 * Math.cos(3 * th) - Math.cos(4 * th))
          drawPixelStar(x, 540 + hx * 5 * hk * pulse, hy + hyy * 5 * hk * pulse, i % 4 ? 20 : 28, i % 3, i % 2 ? GOLD : PINK)
        }
        x.restore()
      }
      sparkle(x, 540, 1200, t, T.link + 0.3, { n: 16, R: 360, seed: 80, size: 30, dur: 0.9 })
    }
  }

  // ── placards (turn) and small-talk bubbles (talk)
  function drawPlacards(t) {
    if (t < T.plac[0] - 0.2 || t > T.placOut + 0.4) return
    const o = ease.inCubic(prog(t, T.placOut, T.placOut + 0.35))
    PLAC.forEach((P, i) => {
      const k = pop01(t, T.plac[i], 0.38, 2.4)
      if (k <= 0) return
      x.save(); x.translate(P.cx, PLAC_Y + 120 * o); x.rotate([-2, 1, 2.5][i] * D2R); x.scale(k * (1 - 0.3 * o), k * (1 - 0.3 * o)); x.globalAlpha = clamp(k * 3) * (1 - o)
      placard(x, 288, 132, P.label, P.val, P.col, P.glyph ? { valFont: `italic 600 ${P.valSize}px ${SERIF}`, glyph: P.glyph, gcol: P.gcol } : {})
      x.restore()
      sparkle(x, P.cx, PLAC_Y, t, T.plac[i], { n: 8, R: 170, seed: 40 + i, size: 22 })
    })
    // the dealbreaker placard: stamps in
    if (t >= T.deal - 0.18) {
      const sp = prog(t, T.deal - 0.18, T.deal)
      const sc = lerp(2.2, 1, ease.inCubic(sp)) * (t > T.deal ? 1 + 0.07 * Math.sin((t - T.deal) * 30) * Math.exp(-(t - T.deal) * 9) : 1)
      x.save(); x.translate(540, DEAL_Y + 120 * o); x.rotate(-2 * D2R); x.scale(sc * (1 - 0.3 * o), sc * (1 - 0.3 * o)); x.globalAlpha = clamp(sp * 3) * (1 - o)
      placard(x, 760, 138, 'DEALBREAKER', 'One-word texts.', RED, { valFont: `900 58px ${INTER}`, valCol: '#a3122b', mark: true })
      x.restore()
      sparkle(x, 540, DEAL_Y, t, T.deal, { n: 14, R: 430, seed: 50, size: 28, cols: [RED, '#ff8a80', GOLD, '#fff3e0'] })
    }
  }
  function drawBubbles(t) {
    if (t < T.bubs[0] || t > T.flip + 0.1) return
    BUBS.forEach((B, i) => {
      const k = pop01(t, T.bubs[i], 0.34, 2.4)
      const burst = prog(t, T.flip - 0.08, T.flip + 0.04)
      if (k <= 0 || burst >= 1) return
      x.save(); x.translate(B.x, B.y + 6 * Math.sin(t * 6 + i)); x.rotate(B.r * D2R); x.scale(k * (1 + 0.4 * burst), k * (1 + 0.4 * burst)); x.globalAlpha = 1 - burst
      bubble(x, B.txt, k, B.tailR)
      x.restore()
    })
    BUBS.forEach((B, i) => sparkle(x, B.x, B.y, t, T.flip, { n: 8, R: 160, seed: 60 + i, size: 22, cols: [BONE, DULL, SKYB] }))
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      if (t < T.galOut4[1]) {
        drawFacade(t)
        drawGallery(t)
        drawMiddle(t)
        drawPeople(t)
        drawPlacards(t)
        drawBubbles(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [e, t0, o] of EYES) {
        const p = ease.outCubic(prog(t, t0, t0 + 0.35))
        e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)`
      }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

export const SCENES = [build]

// ── sound (pitched SFX in the films' D-major palette; the engine moves them into Ab)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook: the facade
  ...wordPops(T.h0, 5, 0.07, 0, 0.028), ['whoosh', T.steps, 0.5, 0.03],
  ['pop', T.h0Late, 1174.66, 0.05, -0.1], ['pop', T.h0Late + 0.1, 1318.51, 0.05, 0.1], ['pluck', T.h0Late + 0.1, 1174.66, 0.05, 0.7, 0],
  ...T.cols.map((tc, i) => ['pluck', +(tc + 0.3).toFixed(3), NOTE[i], 0.04, 0.35, -0.6 + i * 0.24]),
  ...T.cols.map(tc => ['tick', +(tc + 0.3).toFixed(3), 0.05]),
  ['whoosh', T.ped - 0.05, 0.35, 0.035], ['boom', T.ped + 0.3, 0.1], ['glitter', T.ped + 0.3, T.ped + 0.9],
  ['pop', T.pair0, 880, 0.045, -0.3], ['pop', T.pair0 + 0.1, 987.77, 0.045, 0.3],
  ['riser', T.dive[0] - 0.4, T.dive[1], 0.035], ['whoosh', T.dive[0] + 0.1, 0.5, 0.045],
  // gallery: guessing
  ...T.frames.map((tf, i) => ['pop', tf, NOTE[2 + i], 0.045, (i - 1) * 0.5]),
  ...wordPops(T.h1, 3, 0.07, 1, 0.025), ['pop', T.guess, 1318.51, 0.05, 0], ['pluck', T.guess, 987.77, 0.045, 0.6, 0], ...wordPops(T.guess + 0.22, 3, 0.07, 3, 0.022),
  ['pop', T.ppl, 659.25, 0.04, -0.3], ['pop', T.ppl + 0.1, 739.99, 0.04, 0.3],
  ...T.tilts.map((tt, i) => ['pluck', tt, [659.25, 587.33][i], 0.035, 0.3, i ? 0.3 : -0.3]),
  ...T.qs.flatMap((tq, i) => [['whoosh', tq - 0.2, 0.25, 0.03], ['pop', tq, [880, 783.99, 659.25][i], 0.06, (i - 1) * 0.6], ['pluck', tq + 0.02, [880, 783.99, 659.25][i] / 2, 0.04, 0.4, (i - 1) * 0.6]]),
  ['pop', T.qs[2] + 0.25, 1174.66, 0.035, -0.3], ['pop', T.qs[2] + 0.37, 987.77, 0.035, 0.3],
  ...wordPops(T.s1, 2, 0.08, 2, 0.025), ['pop', T.s1Late, 1318.51, 0.045, -0.1], ['pop', T.s1Late + 0.1, 1174.66, 0.045, 0.1],
  // the turn
  ['whoosh', T.grow[0], 0.6, 0.04],
  ...wordPops(T.h2, 5, 0.07, 0, 0.025), ['pop', T.h2Late, 1318.51, 0.055, 0], ['pluck', T.h2Late, 1174.66, 0.05, 0.6, 0],
  ['whoosh', T.unveil - 0.15, 0.4, 0.045], ['boom', T.unveil + 0.05, 0.12], ['bell', T.unveil + 0.05, 1174.66, 0.05, 1.4, 0], ['glitter', T.unveil + 0.1, T.unveil + 0.9],
  ...T.plac.flatMap((tp, i) => [['pop', tp, [739.99, 880, 1174.66][i], 0.055, (i - 1) * 0.5], ['pluck', tp + 0.02, [739.99, 880, 1174.66][i], 0.04, 0.4, (i - 1) * 0.5]]),
  ['whoosh', T.deal - 0.2, 0.2, 0.04], ['tick', T.deal, 0.09], ['boom', T.deal, 0.12], ['pop', T.deal, 587.33, 0.05, 0],
  ['whoosh', T.placOut, 0.4, 0.03],
  // talk card
  ...wordPops(T.h3, 2, 0.08, 1, 0.028), ['pop', T.h3Late, 1318.51, 0.05, -0.1], ['pop', T.h3Late + 0.1, 1174.66, 0.05, 0.1],
  ...T.bubs.map((tb, i) => ['pop', tb, [659.25, 587.33, 554.37][i], 0.04, [-0.5, 0.5, 0.4][i]]),
  ['whoosh', T.flip - 0.22, 0.25, 0.04], ['pop', T.flip, 1174.66, 0.06, 0], ['bell', T.flip + 0.02, 1760, 0.045, 1.2, 0], ['glitter', T.flip, T.flip + 0.6],
  ...wordPops(T.s3, 2, 0.08, 2, 0.025), ['pop', T.s3 + 0.3, 1318.51, 0.05, 0], ['pluck', T.s3 + 0.3, 1174.66, 0.045, 0.6, 0],
  ['whoosh', T.shrink[0], 0.5, 0.035],
  // end line
  ...wordPops(T.h4, 2, 0.08, 2, 0.03), ['pop', T.h4Late, 1318.51, 0.055, 0], ['pluck', T.h4Late, 1174.66, 0.05, 0.7, 0],
  ['pop', T.ppl4, 659.25, 0.04, -0.3], ['pop', T.ppl4 + 0.1, 739.99, 0.04, 0.3],
  ['pop', T.stars[0], 1174.66, 0.05, -0.5], ['pop', T.stars[2], 1318.51, 0.05, 0.5], ['glitter', T.stars[0], T.stars[2] + 0.5],
  ['riser', T.link - 0.6, T.link, 0.03], ['pluck', T.link, 880, 0.05, 0.6, 0], ['bell', T.link + 0.3, 1760, 0.055, 1.4, -0.1], ['bell', T.link + 0.33, 2349.32, 0.04, 1.4, 0.1],
]
