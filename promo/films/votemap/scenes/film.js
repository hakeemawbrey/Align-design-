// votemap (30 s vertical Align ad) · scenes 0–25.6, then the shared END CARD ("come" + the logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–5.20   HOOK  "Align starts | in *Houston.*" — a stylised line-art US map draws itself on; on the drop (2.82)
//               Houston ignites as a big gold star with a shockwave and a "LAUNCH CITY #1" tag. "The first star is *lit.*"
//   5.45–11.30  "Then the stars | pick a | *second city.*" — constellation lines reach out from Houston to ten dim
//               candidate stars, each with a label; then votes rise as little sparks from the bottom and every star gets
//               brighter, evenly (no numbers, no winner). "Every vote, a little *brighter.*"
//  11.65–14.60  "Tonight's deck, | *dealt.*" — the map dims; five card backs deal into a fan. "A new hand, every *night.*"
//  14.85–17.50  "Card *first.* | Face last." — the centre card lifts and flips to a veiled mystery card, a glyph ring
//               blooms. "Read them before you *see* them."
//  17.80–20.40  "Talk cards, | not *small_talk.*" — three real talk cards flip in. "Skip the *'hey.'*"
//  20.65–22.70  "Which city | lights up *next?*" — the map comes back; a light chases round all ten stars, then they all
//               flare together (no winner)
//  22.85–25.30  "Vote your city | *into the sky.*" — the candidate stars lift off the map and rise into the sky, the map fades
//  25.33–25.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 25.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb, chip } from './props.js'

export const END = 25.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const MINT = '#7fe0b5'
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

// ── beats
export const T = {
  // hook
  eye: 0.08, h0: [0.12, 0.3, BEAT(1), BEAT(2)], draw: [0.15, 2.55], drop: BEAT(4), tag: BEAT(4.6), lit: [BEAT(5.5), BEAT(5.5) + 0.1, BEAT(5.5) + 0.2, BEAT(6.5) - 0.12, BEAT(6.5)], h0Out: 5.2,
  // the vote
  h1: [5.45, 5.53, 5.61, BEAT(10), BEAT(10) + 0.09, BEAT(11)], lines0: 6.05, lineGap: 0.235, sub1: [BEAT(14.5), BEAT(14.5) + 0.1, BEAT(14.5) + 0.22, BEAT(14.5) + 0.32, BEAT(15.2)],
  votes: [8.75, 11.0], h1Out: 11.3,
  // the deck
  dim: [11.25, 11.7], h2: [11.65, 11.75, BEAT(21)], deal: [0, 1, 2, 3, 4].map(i => BEAT(20.6 + i * 0.5)), sub2: [BEAT(23), BEAT(23) + 0.1, BEAT(23) + 0.2, BEAT(23) + 0.3, BEAT(24)], h2Out: 14.6,
  // card first
  lift: [14.55, 15.25], flip: [15.25, 15.62], land: 15.62, h3: [14.85, BEAT(26)], h3b: [BEAT(27), BEAT(27) + 0.1], ring: BEAT(27.5), sub3: [BEAT(29), BEAT(29) + 0.1, BEAT(29) + 0.2, BEAT(29) + 0.3, BEAT(29.6), BEAT(29.6) + 0.1], h3Out: 17.5,
  away: [17.3, 17.65],
  // talk cards
  h4: [17.8, 17.9, BEAT(31), BEAT(32)], talk: [18.05, 18.35, 18.65], sub4: [18.85, 18.95, 19.2], h4Out: 20.4, talkOut: [20.1, 20.45],
  // which city
  back: [20.35, 20.85], h5: [20.65, 20.75, BEAT(37), BEAT(37) + 0.09, BEAT(38)], chase: [20.9, 22.2], flare: BEAT(39), h5Out: 22.7,
  // into the sky
  h6: [22.85, 22.95, 23.05, BEAT(41)], rise: 23.15, h6Out: 24.95, fade: [24.4, 25.28],
}

// ── the map: a stylised lower-48 outline (lon/lat → px; not exact geography)
const MAP = { cx: 540, cy: 1085, k: 15.6, ky: 25.5, lon0: -96, lat0: 38 }
const P = (lon, lat) => ({ x: MAP.cx + (lon - MAP.lon0) * MAP.k, y: MAP.cy + (MAP.lat0 - lat) * MAP.ky })
const OUTLINE = [
  [-124.7, 48.4], [-123, 49], [-95.2, 49], [-95, 49.4], [-89.6, 48], [-84.8, 46.6], [-84.2, 45.8], [-82.4, 43.2], [-82.7, 41.7], [-79, 42.9],
  [-79, 43.4], [-76.4, 44.2], [-74.7, 45], [-71.5, 45], [-70.2, 46.9], [-69.2, 47.4], [-67.8, 47], [-67, 44.8], [-70.2, 43.6], [-70.8, 42.6],
  [-70, 41.8], [-71.8, 41.3], [-74, 40.6], [-74, 39.4], [-75.4, 38.6], [-76, 37], [-75.5, 35.3], [-77.9, 34], [-79.2, 33.2], [-81, 32],
  [-81.4, 30.5], [-80.5, 28.5], [-80.1, 26.5], [-80.4, 25.2], [-81.2, 25.3], [-81.8, 26.7], [-82.7, 28], [-82.8, 29.2], [-84, 30.1], [-85.4, 29.7],
  [-86.5, 30.4], [-88, 30.5], [-89.5, 30.2], [-89.3, 29.1], [-90.5, 29.2], [-92, 29.6], [-93.8, 29.7], [-94.8, 29.3], [-96.5, 28.3], [-97.4, 27.3],
  [-97.2, 25.9], [-99.1, 26.5], [-99.6, 27.6], [-101.4, 29.8], [-103, 29], [-104.5, 29.7], [-106.5, 31.8], [-108.2, 31.8], [-108.2, 31.3], [-111, 31.3],
  [-114.8, 32.5], [-117.1, 32.5], [-118.5, 34], [-120.6, 34.6], [-121.9, 36.6], [-122.5, 37.8], [-123.7, 39], [-124.2, 40.4], [-124.2, 42], [-124, 46.3], [-124.7, 48.4],
].map(([lo, la]) => P(lo, la))
const SEG = (() => { const a = [0]; for (let i = 1; i < OUTLINE.length; i++) a.push(a[i - 1] + Math.hypot(OUTLINE[i].x - OUTLINE[i - 1].x, OUTLINE[i].y - OUTLINE[i - 1].y)); return a })()
const HOU = P(-95.4, 29.8)
// candidates (positions nudged apart near Texas so the stars breathe); lx/ly = label offset
const CITIES = [
  { n: 'NEW YORK', p: P(-74, 40.7), lx: 0, ly: -46 },
  { n: 'LA', p: P(-118.2, 34.05), lx: 0, ly: 44 },
  { n: 'CHICAGO', p: P(-87.6, 41.9), lx: 0, ly: -44 },
  { n: 'AUSTIN', p: P(-99.2, 30.7), lx: -96, ly: 8 },
  { n: 'MIAMI', p: P(-80.2, 25.8), lx: 88, ly: 4 },
  { n: 'ATLANTA', p: P(-84.4, 33.75), lx: 104, ly: -4 },
  { n: 'NASHVILLE', p: P(-86.9, 36.3), lx: -128, ly: -6 },
  { n: 'SEATTLE', p: P(-122.3, 47.6), lx: 34, ly: 44 },
  { n: 'DALLAS', p: P(-97.1, 33.3), lx: -98, ly: -10 },
  { n: 'NEW ORLEANS', p: P(-90.1, 30.0), lx: 118, ly: 12 },
]
// the order the constellation lines reach out (alternating sides, so nothing reads as "first" or "best")
const LINE_ORDER = [8, 3, 9, 1, 2, 5, 7, 0, 6, 4]
CITIES.forEach(c => { c.lineAt = T.lines0 + LINE_ORDER.indexOf(CITIES.indexOf(c)) * T.lineGap })
CITIES.forEach(c => { c.popAt = c.lineAt + 0.3 })
// votes: every city gets the same number of sparks, in shuffled rounds → even brightening, no winner
const VPC = 3
const VOTES = (() => {
  const r = rng(57), out = []
  for (let round = 0; round < VPC; round++) {
    const ord = CITIES.map((_, i) => i).sort(() => r() - 0.5)
    ord.forEach(ci => out.push({ ci, sx: 90 + r() * 900, bend: (r() - 0.5) * 500 }))
  }
  const n = out.length
  out.forEach((v, i) => { v.arrive = r3(lerp(T.votes[0], T.votes[1], i / (n - 1))); v.launch = v.arrive - 0.62 })
  return out
})()
CITIES.forEach((c, i) => { c.hits = VOTES.filter(v => v.ci === i).map(v => v.arrive) })
// the chase in "Which city lights up next?": goes round twice in map order, then everyone flares at once
const CHASE = (() => {
  const ring = [7, 1, 3, 8, 9, 4, 5, 6, 2, 0], out = []
  const n = ring.length * 2
  for (let i = 0; i < n; i++) out.push({ ci: ring[i % ring.length], t: r3(lerp(T.chase[0], T.chase[1], i / (n - 1))) })
  return out
})()
// rise targets in "into the sky"
const RISE = CITIES.map((c, i) => { const r = rng(300 + i); return { t0: T.rise + [3, 7, 1, 5, 9, 2, 6, 0, 4, 8][i] * 0.09, tx: c.p.x * 0.8 + 108 + (r() - 0.5) * 80, ty: 560 + r() * 200 } })

// ── the deck
const CARD_H = 404
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 158, y: 1100 + Math.abs(i - 2) * 34, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const BIG_H = 760, CARD_C = { x: 540, y: 1085 }
const TALK = [{ x: 300, y: 1130, rot: -11, h: 560 }, { x: 780, y: 1130, rot: 11, h: 560 }, { x: 540, y: 1085, rot: 0, h: 660 }]

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space in a word. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.08, at = 0, times = null, big = [], wobble = false, lineHeight = 1.02, boost = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: acc && big.includes(n) ? '0 0.1em 0 0.3em' : acc ? '0 0.16em' : '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times ? times[n] : at + n * gap, big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    times: ws.map(w => w.t),
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        let sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        if (w.big && boost) sc *= boost(t)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }

export async function build(stage) {
  try {
    await Promise.all(["800 120px Inter", "900 96px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'", "700 24px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, profIm, t1, t2, t6] = await Promise.all(['card-back', 'card-profile-3', 'card-talk-1', 'card-talk-2', 'card-talk-6'].map(n => loadImg(A + n + '.png')))
  const backBmp = bitmap(backIm, 560), profBmp = bitmap(profIm, 1000)
  const talkBmp = [bitmap(t1, 520), bitmap(t2, 520), bitmap(t6, 620)]

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 28) + 'px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, '')
  const houBoost = t => 1 + (t > T.drop ? 0.16 * Math.exp(-(t - T.drop) * 5) * Math.sin((t - T.drop) * 16) : 0)
  const H0 = popText(root, 'Align starts | in *Houston.*', { top: 196, size: 128, accentSize: 184, times: T.h0, big: [3], wobble: true, accentColor: GOLD, lineHeight: 0.98, boost: houBoost })
  const S0 = popText(root, 'The first star | is *lit.*', { top: 1600, size: 70, weight: 700, accentSize: 92, times: T.lit, big: [4], accentColor: GOLD, lineHeight: 1.0 })
  const H1 = popText(root, 'Then the stars | pick a | *second_city.*', { top: 196, size: 112, accentSize: 168, times: T.h1, big: [5], wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const S1 = popText(root, 'Every vote, | a little *brighter.*', { top: 1600, size: 70, weight: 700, accentSize: 92, times: T.sub1, big: [4], accentColor: GOLD, lineHeight: 1.0 })
  const H2 = popText(root, 'Tonight’s deck, | *dealt.*', { top: 196, size: 120, accentSize: 190, times: T.h2, big: [2], wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const S2 = popText(root, 'A new hand, | every *night.*', { top: 1640, size: 68, weight: 700, accentSize: 88, times: T.sub2, big: [4], accentColor: GOLD, lineHeight: 1.0 })
  const H3 = popText(root, 'Card *first.* | Face last.', { top: 196, size: 128, accentSize: 184, times: [...T.h3, ...T.h3b], big: [1], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const S3 = popText(root, 'Read them before | you *see* them.', { top: 1660, size: 64, weight: 700, accentSize: 84, times: T.sub3, big: [4], accentColor: PINK, lineHeight: 1.0 })
  const H4 = popText(root, 'Talk cards, | not *small_talk.*', { top: 196, size: 120, accentSize: 172, times: T.h4, big: [3], wobble: true, accentColor: BLUE, lineHeight: 1.0 })
  const S4 = popText(root, 'Skip the *“hey.”*', { top: 1690, size: 70, weight: 700, accentSize: 96, times: T.sub4, big: [2], accentColor: PINK })
  const H5 = popText(root, 'Which city | lights up *next?*', { top: 196, size: 124, accentSize: 184, times: T.h5, big: [4], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H6 = popText(root, 'Vote your city | *into_the_sky.*', { top: 196, size: 120, accentSize: 172, times: T.h6, big: [3], wobble: true, accentColor: PINK, lineHeight: 1.0 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the map
  function outlinePath(frac = 1) {
    const L = SEG[SEG.length - 1] * frac
    x.beginPath(); x.moveTo(OUTLINE[0].x, OUTLINE[0].y)
    for (let i = 1; i < OUTLINE.length; i++) {
      if (SEG[i] <= L) { x.lineTo(OUTLINE[i].x, OUTLINE[i].y); continue }
      const f = (L - SEG[i - 1]) / (SEG[i] - SEG[i - 1])
      x.lineTo(lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f))
      return { x: lerp(OUTLINE[i - 1].x, OUTLINE[i].x, f), y: lerp(OUTLINE[i - 1].y, OUTLINE[i].y, f) }
    }
    x.closePath()
    return null
  }
  function drawMap(t, a) {
    if (a <= 0.004) return
    const dp = ease.inOutCubic(prog(t, ...T.draw))
    if (dp <= 0) return
    x.save(); x.globalAlpha = a
    // the land: flat violet fill + a pixel dot grid, once the outline has closed
    const fk = ease.outCubic(prog(t, T.draw[1] - 0.25, T.draw[1] + 0.5))
    if (fk > 0) {
      x.save()
      outlinePath(1)
      x.fillStyle = rgba('#3a2a7a', 0.42 * fk); x.fill()
      x.clip()
      x.fillStyle = rgba(LAV, 0.16 * fk)
      for (let yy = 780; yy < 1430; yy += 24) for (let xx = 80 + ((yy / 24) % 2) * 12; xx < 1000; xx += 24) x.fillRect(xx - 2, yy - 2, 4, 4)
      x.restore()
    }
    // the outline drawing on, with a bright pen tip
    const tip = outlinePath(dp)
    ink(x, LAV, { w: 6, fa: 0, glow: 18 })
    if (tip) { orb(x, tip.x, tip.y, 9, '#fff3e0', 1, 5); drawPixelStar(x, tip.x, tip.y, 30, 0, '#fff3e0') }
    x.restore()
  }
  // Houston: a faint dot while the map draws, then the big gold star on the drop
  function drawHouston(t, a) {
    if (a <= 0.004) return
    x.save(); x.globalAlpha = a
    const pre = clamp((t - 0.6) * 2) * (t < T.drop ? 1 : 0)
    if (pre > 0) { const pr = 1 + 0.25 * Math.sin(t * 10); orb(x, HOU.x, HOU.y, 6 * pr, GOLD, pre * 0.8, 4) }
    if (t >= T.drop - 0.05) {
      const k = pop01(t, T.drop - 0.05, 0.5, 2.8)
      const pulse = 1 + 0.08 * Math.sin((t - T.drop) * 5.2)
      // rotating rays
      x.save(); x.globalCompositeOperation = 'lighter'; x.translate(HOU.x, HOU.y); x.rotate(t * 0.3)
      for (let i = 0; i < 10; i++) {
        x.rotate(TAU / 10)
        const L = 230 * k * (i % 2 ? 0.7 : 1)
        const g = x.createLinearGradient(0, 0, 0, -L); g.addColorStop(0, rgba(GOLD, 0.32)); g.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = g; x.beginPath(); x.moveTo(-7, 0); x.lineTo(-22, -L); x.lineTo(22, -L); x.lineTo(7, 0); x.fill()
      }
      x.restore()
      // shockwave rings
      for (const [d, col] of [[0, GOLD], [0.12, '#fff3e0']]) {
        const p = prog(t, T.drop + d, T.drop + d + 0.8)
        if (p > 0 && p < 1) { x.save(); x.globalAlpha = a * (1 - p); x.beginPath(); x.arc(HOU.x, HOU.y, 30 + 420 * ease.outCubic(p), 0, TAU); ink(x, col, { w: 8 * (1 - p) + 2, fa: 0, glow: 22 }); x.restore() }
      }
      orb(x, HOU.x, HOU.y, 24 * k * pulse, GOLD, 1, 5.5)
      x.save(); x.globalAlpha = a * clamp(k)
      drawPixelStar(x, HOU.x, HOU.y, 92 * k * pulse, 0, '#fff3e0')
      x.restore()
      sparkle(x, HOU.x, HOU.y, t, T.drop, { n: 16, R: 360, seed: 11, size: 34, dur: 0.9 })
    }
    x.restore()
  }
  function drawTag(t, a) {
    const k = pop01(t, T.tag, 0.4, 2.6)
    if (k <= 0 || a <= 0) return
    x.save(); x.globalAlpha = a
    // a little leader line from the star down to the tag
    x.beginPath(); x.moveTo(HOU.x, HOU.y + 26); x.lineTo(HOU.x, HOU.y + 26 + 34 * clamp(k)); ink(x, GOLD, { w: 3, fa: 0, glow: 8 })
    chip(x, HOU.x, HOU.y + 84, 'LAUNCH CITY #1', k, { size: 28, col: '#ffe6a8', edge: GOLD })
    x.restore()
  }
  // brightness of a candidate star: dim when it pops, +1 step per vote spark (smoothed)
  function cityB(c, t) {
    let b = 0.25
    for (const h of c.hits) b += 0.22 * ease.outCubic(prog(t, h, h + 0.3))
    return b
  }
  function drawCities(t, a) {
    if (a <= 0.004) return
    x.save(); x.globalAlpha = a
    // constellation lines from Houston
    for (const c of CITIES) {
      const p = ease.inOutQuad(prog(t, c.lineAt, c.lineAt + 0.34))
      if (p <= 0) continue
      const ex = lerp(HOU.x, c.p.x, p), ey = lerp(HOU.y, c.p.y, p)
      x.save(); x.setLineDash([3, 13]); x.globalAlpha = a * 0.75
      x.beginPath(); x.moveTo(HOU.x, HOU.y); x.lineTo(ex, ey); ink(x, '#ffe2a0', { w: 4, fa: 0, glow: 10 })
      x.restore()
      if (p < 1) { orb(x, ex, ey, 7, '#fff3e0', a, 4) }
    }
    // the stars + labels
    CITIES.forEach((c, i) => {
      const k = pop01(t, c.popAt, 0.4, 2.6)
      if (k <= 0) return
      let b = cityB(c, t)
      // chase + flare in "Which city lights up next?"
      let ch = 0
      for (const s of CHASE) if (s.ci === i) ch = Math.max(ch, Math.exp(-Math.max(0, t - s.t) * 7) * (t >= s.t ? 1 : 0))
      const fl = t >= T.flare ? Math.exp(-(t - T.flare) * 2.2) : 0
      const tw = 0.85 + 0.15 * noise1(t * 2 + i * 3.1, i)
      // rise into the sky
      const R = RISE[i], rp = ease.inOutCubic(prog(t, R.t0, R.t0 + 1.25))
      const px = lerp(c.p.x, R.tx, rp), py = lerp(c.p.y, R.ty, rp) - Math.sin(Math.PI * rp) * 60
      const r = (7 + 7 * b + 10 * ch + 9 * fl) * k * tw
      if (rp > 0 && rp < 1) {   // a comet trail while rising
        x.save(); x.globalCompositeOperation = 'lighter'
        for (let j = 1; j <= 6; j++) { const q = Math.max(0, rp - j * 0.05), qx = lerp(c.p.x, R.tx, q), qy = lerp(c.p.y, R.ty, q) - Math.sin(Math.PI * q) * 60; x.globalAlpha = a * 0.25 * (1 - j / 7); orb(x, qx, qy, r * (1 - j / 8), PINK, 1, 2.5) }
        x.restore()
      }
      const col = ch > 0.3 || fl > 0.2 ? GOLD : '#d9e4ff'
      orb(x, px, py, r, col, clamp(k), 3 + 2 * b + 3 * fl)
      x.save(); x.globalAlpha = a * clamp(k) * (0.4 + 0.5 * Math.min(1, b))
      drawPixelStar(x, px, py, r * 3.2, i % 2, '#fff8ea')
      x.restore()
      // label
      const lk = pop01(t, c.popAt + 0.06, 0.36, 2.4) * (1 - ease.inQuad(prog(t, R.t0, R.t0 + 0.35)))
      if (lk > 0) chip(x, c.p.x + c.lx, c.p.y + c.ly, c.n, lk, { size: 25, col: BONE, edge: ch > 0.3 || fl > 0.2 ? GOLD : LAV })
      sparkle(x, c.p.x, c.p.y, t, c.popAt, { n: 6, R: 70, seed: 20 + i, size: 18, dur: 0.5 })
      for (const h of c.hits) sparkle(x, c.p.x, c.p.y, t, h, { n: 5, R: 60, seed: 100 + i + Math.round(h * 10), size: 16, dur: 0.45 })
      sparkle(x, c.p.x, c.p.y, t, T.flare, { n: 7, R: 90, seed: 140 + i, size: 20, dur: 0.6 })
    })
    x.restore()
  }
  // vote sparks rising from the bottom of the frame into the stars
  function drawVotes(t) {
    if (t < T.votes[0] - 0.7 || t > T.votes[1] + 0.1) return
    for (const v of VOTES) {
      const p = prog(t, v.launch, v.arrive)
      if (p <= 0 || p >= 1) continue
      const c = CITIES[v.ci].p, q = ease.inOutQuad(p)
      const sx = v.sx, sy = H + 30
      const cx = (sx + c.x) / 2 + v.bend, cy = (sy + c.y) / 2
      const bx = (1 - q) * (1 - q) * sx + 2 * (1 - q) * q * cx + q * q * c.x
      const by = (1 - q) * (1 - q) * sy + 2 * (1 - q) * q * cy + q * q * c.y
      x.save(); x.globalCompositeOperation = 'lighter'
      for (let j = 1; j <= 5; j++) {
        const qq = Math.max(0, q - j * 0.035)
        const tx = (1 - qq) * (1 - qq) * sx + 2 * (1 - qq) * qq * cx + qq * qq * c.x, ty = (1 - qq) * (1 - qq) * sy + 2 * (1 - qq) * qq * cy + qq * qq * c.y
        x.globalAlpha = 0.35 * (1 - j / 6); x.fillStyle = j % 2 ? GOLD : PINK; x.fillRect(tx - 4, ty - 4, 8, 8)
      }
      x.restore()
      drawPixelStar(x, bx, by, 22, (v.ci + 1) % 3, v.ci % 2 ? '#ffd98a' : '#ffc2d8')
    }
  }

  // ── cards
  function drawCardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  const CARD_GLOW = [BLUE, PINK, GOLD, MINT, LAV]
  function drawDeck(t) {
    if (t < T.deal[0] - 0.5 || t > T.away[1]) return
    DEAL_ORDER.forEach((ci, k) => {
      if (ci === 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.42
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const off = ease.inCubic(prog(t, T.lift[0] - 0.1, T.lift[0] + 0.45))
      if (off >= 1) return
      const side = ci < 2 ? -1 : 1
      const hopT = (t - BEAT(0)) / 0.5556, ph = hopT - Math.floor(hopT)
      const hop = t > T.sub2[0] && t < T.lift[0] ? -16 * Math.max(0, Math.sin(Math.PI * Math.min(1, ph / 0.5))) * ((Math.floor(hopT) + ci) % 2) : 0
      const cx = lerp(F.x - 700 * (ci < 2 ? 1 : -1) * 0.2, F.x, p) + side * 900 * off, cy = lerp(H + 380, F.y, p) + hop - 200 * off
      const rot = lerp(F.rot - 60 * side, F.rot, p) + side * 40 * off
      const gk = t > T.sub2[0] ? pop01(t, T.sub2[0] + k * 0.06, 0.3) : 0
      drawCardImg(backBmp, cx, cy, CARD_H * lerp(0.6, 1, p), rot, 1, 1, gk > 0 ? 34 * clamp(gk) : 0, CARD_GLOW[ci])
      if (Math.abs(t - td) < 0.7) sparkle(x, F.x, F.y, t, td, { n: 7, R: 160, seed: 60 + ci, size: 22, dur: 0.55 })
    })
    // the centre card: dealt last, lifts, flips to the mystery card, then tumbles away
    const td = T.deal[4], t0 = td - 0.42
    if (t < t0) return
    const F = FAN[2]
    const p = ease.outCubic(prog(t, t0, td))
    const lp = ease.inOutCubic(prog(t, ...T.lift))
    const fp = prog(t, ...T.flip)
    const ap = ease.inBack ? ease.inBack(prog(t, ...T.away)) : ease.inCubic(prog(t, ...T.away))
    let cx = lerp(lerp(F.x, F.x, p), CARD_C.x, lp), cy = lerp(lerp(H + 380, F.y, p), CARD_C.y, lp)
    let h = lerp(CARD_H * lerp(0.6, 1, p), BIG_H, lp)
    let rot = 0
    const landK = t > T.land ? Math.exp(-(t - T.land) * 5) * Math.sin((t - T.land) * 18) : 0
    h *= 1 + 0.05 * landK
    if (t > T.land + 0.4) cy += 8 * Math.sin((t - T.land) * 2.2)
    // away: shrinks into a spark and zips up
    const aq = clamp(ap)
    cy = lerp(cy, 640, aq); h *= 1 - aq; rot += 200 * aq
    if (h < 2) return
    const sx = Math.abs(Math.cos(Math.PI * fp))
    const showProf = fp >= 0.5
    if (showProf) {
      const ak = clamp((t - T.land + 0.2) * 3) * (1 - aq)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 60, cx, cy, 620)
      g.addColorStop(0, rgba('#c9a6ff', 0.5 * ak)); g.addColorStop(0.5, rgba(PINK, 0.16 * ak)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 620, 0, TAU); x.fill()
      x.translate(cx, cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(TAU / 12)
        const rg = x.createLinearGradient(0, 0, 0, -760); rg.addColorStop(0, rgba(GOLD, 0.14 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-16, 0); x.lineTo(-64, -760); x.lineTo(64, -760); x.lineTo(16, 0); x.fill()
      }
      x.restore()
    }
    const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * outK(t, T.h3Out - 0.2, 0.3)
    if (ringK > 0) {
      const RR = 488
      x.save(); x.globalAlpha = 0.4 * ringK; x.beginPath(); x.arc(CARD_C.x, CARD_C.y, RR, 0, TAU); ink(x, BONE, { w: 3, fa: 0, glow: 10 }); x.restore()
      x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 64px ${GLYPH_FONT}`
      SIGNS.forEach((s, i) => {
        const k = pop01(t, T.ring + i * 0.045, 0.36) * outK(t, T.h3Out - 0.2, 0.3)
        if (k <= 0) return
        const an = (i * 30 + 15) * D2R + t * 0.16
        x.save(); x.translate(CARD_C.x + Math.cos(an) * RR, CARD_C.y + Math.sin(an) * RR); x.scale(k, k); x.globalAlpha = clamp(k * 2)
        x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
      })
      x.restore()
    }
    const gk = t > T.sub2[0] && !showProf ? 34 * clamp(pop01(t, T.sub2[0] + 0.24, 0.3)) : showProf ? 40 : 0
    drawCardImg(showProf ? profBmp : backBmp, cx, cy, h, rot, Math.max(0.02, sx), 1, gk, showProf ? LAV : CARD_GLOW[2])
    if (fp > 0.3 && fp < 0.7) { x.save(); x.globalAlpha = 1 - Math.abs(fp - 0.5) * 5; x.globalCompositeOperation = 'lighter'; orb(x, cx, cy, 60, '#fff3e0', 1, 6); x.restore() }
    sparkle(x, cx, cy, t, T.land, { n: 16, R: 420, seed: 77, size: 34, dur: 0.85 })
    if (aq > 0.6) { x.save(); x.globalAlpha = 1; orb(x, cx, cy, 14, PINK, 1, 4); x.restore() }
  }
  function drawTalk(t) {
    if (t < T.talk[0] - 0.5 || t > T.talkOut[1] + 0.05) return
    TALK.forEach((C, i) => {
      const td = T.talk[i], t0 = td - 0.45
      if (t < t0) return
      const p = ease.outCubic(prog(t, t0, td))
      const fp = prog(t, td - 0.05, td + 0.3)                    // flip from back to face after landing
      const off = ease.inCubic(prog(t, T.talkOut[0] + (i === 2 ? 0.08 : 0), T.talkOut[1]))
      const side = i === 0 ? -1 : i === 1 ? 1 : 0
      const cx = lerp(540, C.x, p) + side * 300 * off, cy = lerp(H + 420, C.y, p) + 1100 * off
      const rot = lerp(side * -30, C.rot, p) + side * 20 * off
      const landK = t > td + 0.3 ? Math.exp(-(t - td - 0.3) * 6) * Math.sin((t - td - 0.3) * 18) : 0
      const h = C.h * lerp(0.7, 1, p) * (1 + 0.04 * landK)
      const sx = Math.max(0.02, Math.abs(Math.cos(Math.PI * fp)))
      const face = fp >= 0.5
      const bob = t > td + 0.6 ? 7 * Math.sin((t - td) * 2.4 + i) : 0
      if (face) {
        x.save(); x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(cx, cy, 40, cx, cy, h * 0.7)
        g.addColorStop(0, rgba(i === 2 ? GOLD : BLUE, 0.22 * (1 - off))); g.addColorStop(1, rgba(BLUE, 0))
        x.fillStyle = g; x.beginPath(); x.arc(cx, cy, h * 0.7, 0, TAU); x.fill(); x.restore()
      }
      if (face) drawCardImg(talkBmp[i], cx, cy + bob, h, rot, sx, 1, 30, i === 2 ? GOLD : BLUE)
      else drawCardImg(backBmp, cx, cy + bob, h * 0.98, rot, sx, 1, 0)
      sparkle(x, cx, cy, t, td + 0.15, { n: 9, R: 260, seed: 180 + i, size: 26, dur: 0.6 })
    })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 25.33) {
        const fade = 1 - ease.inOutQuad(prog(t, ...T.fade))
        const dimP = ease.inOutQuad(prog(t, ...T.dim)) * (1 - ease.inOutQuad(prog(t, ...T.back)))
        const mapA = (1 - 0.86 * dimP) * (1 - 0.85 * ease.inOutQuad(prog(t, T.rise + 0.2, T.rise + 1.4))) * fade
        // a slow push-in during the vote, eased back out for the cards
        const push = 1 + 0.035 * ease.inOutQuad(prog(t, 5.4, 11.2)) * (1 - dimP)
        x.save(); x.translate(540, 1100); x.scale(push, push); x.translate(-540, -1100)
        drawMap(t, mapA)
        const houA = mapA * (1 - ease.inQuad(prog(t, T.rise + 0.6, T.rise + 1.6)) * 0.6)
        drawCities(t, Math.min(1, (1 - 0.9 * dimP) * fade))
        drawHouston(t, houA)
        drawTag(t, mapA * (1 - 0.4 * clamp((t - 6.0) * 2) * (t < T.dim[0] ? 1 : 1)))
        x.restore()
        drawVotes(t)
        drawDeck(t)
        drawTalk(t)
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      let eb = '', eA = 0, eC = GOLD
      if (t < T.h0Out + 0.2) { eb = 'HOUSTON, TX'; eA = ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out) }
      else if (t < T.h1Out + 0.3) { eb = 'LAUNCH CITY #2: YOUR VOTE'; eA = clamp((t - T.h1[0]) * 4) * outK(t, T.h1Out); eC = PINK }
      else if (t < T.h4Out + 0.3) { eb = 'COMING TO CITY #2'; eA = clamp((t - T.h2[0]) * 4) * outK(t, T.h4Out); eC = BLUE }
      eyebrow.textContent = eb; eyebrow.style.color = eC; eyebrow.style.opacity = String(eA)
      H0.update(t, outK(t, T.h0Out)); S0.update(t, outK(t, T.h0Out))
      H1.update(t, outK(t, T.h1Out)); S1.update(t, outK(t, T.h1Out))
      H2.update(t, outK(t, T.h2Out)); S2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out)); S3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out)); S4.update(t, outK(t, T.h4Out))
      H5.update(t, outK(t, T.h5Out))
      H6.update(t, outK(t, T.h6Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.028) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const accent = (s, hz = 1174.66) => [['pluck', r3(s), hz, 0.055, 0.6, 0], ['pop', r3(s), hz * 1.122, 0.045, 0]]
const pan = px => clamp((px / W - 0.5) * 1.4, -0.7, 0.7)
export const CUES = [
  // hook
  ...wordPops(T.h0.slice(0, 3), 0, 0.03), ...accent(T.h0[3]),
  ['glitter', 0.2, 2.5], ['whoosh', 0.2, 2.3, 0.03],
  ['riser', r3(T.drop - 0.8), T.drop, 0.05], ['boom', T.drop, 0.11], ['bell', T.drop, 880, 0.05, 2.4, 0], ['bell', r3(T.drop + 0.06), 1318.51, 0.04, 2.2, 0.15],
  ['tick', r3(T.tag), 0.05], ['pop', r3(T.tag), 1318.51, 0.04, 0],
  ...wordPops(T.lit.slice(0, 4), 2, 0.024), ...accent(T.lit[4], 1318.51),
  // the vote
  ['whoosh', 5.25, 0.6, 0.04],
  ...wordPops(T.h1.slice(0, 5), 1, 0.026), ...accent(T.h1[5], 880),
  ...CITIES.map(c => ['tick', r3(c.lineAt + 0.05), 0.03]),
  ...CITIES.map((c, i) => ['pop', r3(c.popAt), NOTE[LINE_ORDER.indexOf(i) % 7] * (LINE_ORDER.indexOf(i) > 6 ? 2 : 1), 0.03, pan(c.p.x)]),
  ...wordPops(T.sub1.slice(0, 4), 3, 0.022), ['pluck', r3(T.sub1[4]), 1174.66, 0.05, 0.6, 0],
  ['glitter', r3(T.votes[0] - 0.3), T.votes[1]],
  ...VOTES.map((v, i) => ['pop', v.arrive, NOTE[i % 7] * 2, 0.014, pan(CITIES[v.ci].p.x)]),
  // the deck
  ['riser', 11.0, 11.65, 0.04],
  ...wordPops(T.h2.slice(0, 2), 2, 0.026), ...accent(T.h2[2], 1318.51),
  ...T.deal.map(s => ['whoosh', r3(s - 0.38), 0.4, 0.03]),
  ...T.deal.map((s, i) => ['pop', r3(s), NOTE[(i * 2 + 1) % 7], 0.04, [-0.5, 0.5, -0.25, 0.25, 0][i]]),
  ...wordPops(T.sub2.slice(0, 4), 0, 0.022), ['bell', r3(T.sub2[4]), 1174.66, 0.045, 1.8, 0],
  // card first
  ['whoosh', T.lift[0], 0.7, 0.045], ['riser', T.lift[0], T.land, 0.04],
  ...wordPops([T.h3[0]], 1, 0.026), ...accent(T.h3[1], 880),
  ['boom', T.land, 0.09], ['bell', T.land, 880, 0.05, 2.2, -0.2], ['bell', r3(T.land + 0.06), 1174.66, 0.045, 2.2, 0.2], ['glitter', T.land, r3(T.land + 0.8)],
  ...wordPops(T.h3b, 3, 0.026),
  ...SIGNS.map((s, i) => ['pop', r3(T.ring + i * 0.045), NOTE[i % 7] * 2, 0.013, Math.cos((i * 30 + 15) * D2R) * 0.5]),
  ...wordPops(T.sub3.slice(0, 4), 2, 0.022), ['pluck', r3(T.sub3[4]), 1174.66, 0.05, 0.6, 0],
  ['whoosh', T.away[0], 0.5, 0.04],
  // talk cards
  ...wordPops(T.h4.slice(0, 3), 4, 0.026), ...accent(T.h4[3], 987.77),
  ...T.talk.map((s, i) => ['whoosh', r3(s - 0.42), 0.42, 0.03]),
  ...T.talk.map((s, i) => ['tick', r3(s + 0.1), 0.05]),
  ...T.talk.map((s, i) => ['pop', r3(s + 0.15), [880, 987.77, 1174.66][i], 0.04, [-0.4, 0.4, 0][i]]),
  ...wordPops(T.sub4.slice(0, 2), 1, 0.024), ...accent(T.sub4[2], 1318.51),
  ['whoosh', T.talkOut[0], 0.5, 0.04],
  // which city
  ...wordPops(T.h5.slice(0, 4), 0, 0.026), ...accent(T.h5[4]),
  ...CHASE.map((s, i) => ['tick', s.t, 0.022]),
  ['riser', r3(T.chase[0] + 0.3), T.flare, 0.04],
  ['bell', T.flare, 1174.66, 0.05, 2.0, -0.2], ['bell', r3(T.flare + 0.07), 1479.98, 0.04, 2.0, 0.2], ['glitter', T.flare, r3(T.flare + 0.9)],
  // into the sky
  ...wordPops(T.h6.slice(0, 3), 2, 0.026), ...accent(T.h6[3], 1318.51),
  ['whoosh', T.rise, 1.6, 0.045], ['glitter', T.rise, 24.6],
  ...RISE.map((R, i) => ['pop', r3(R.t0 + 1.2), NOTE[(i * 3) % 7] * 2, 0.015, pan(R.tx)]),
]
