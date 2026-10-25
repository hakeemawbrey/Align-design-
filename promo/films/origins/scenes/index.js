// origins (45 s, vertical): "Where did the zodiac come from?"
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas (sky + art), DOM type above it, fx canvas, grain on top. Pure f(t).
//   0.00–0.40  fade up · hook: "Where did the zodiac come from?" (zodiac lands 0.60) + a gold "?" and the 12 glyphs ringing in
//   3.93       PART 1 "First stop: Babylon." ziggurat rises, clay tablet, the Sun's path arc
//   5.60       "Babylonian astronomers split the Sun's path into 12 equal parts." · the Sun sweeps the arc, 12 slices pop · "12" stamp 8.38
//   10.60      PART 2 "Then came the Greeks." a scroll unrolls · "zōidiakos kyklos" is written on it
//   12.27      "The Greeks called it the zōidiakos kyklos." · ram, bull, lion and fish doodles peek out
//   15.60      "Literally: the circle of little animals." · the scroll rolls up, the animals parade round a circle
//   20.60      PART 3 "Why does Aries go first?" day = night disc, a blossom branch, the 0° ♈ stamp (23.93)
//   27.82      PART 4 "Plot twist: Earth wobbles." a spinning top painted like Earth, SIGNS band + STARS ring drifting apart
//   34.49      "That's why astrologers use the seasons." season icons on the sign band
//   40.05      end "Old sky. New you." glyph burst, the animals parade across · fade 44.30–45.00 (last frame black)
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, SAND, ink, hexA, ziggurat, tablet, scroll, rolled, ANIMALS, ANIMAL_COLORS, dayNight, branch, BRANCH_FLOWERS, badge0, earthTop, CONSTELLATIONS, seasonIcon, MONO, INTER, GLYPH_FONT, VS } from './illus.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'

export const DURATION = 45
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const D2R = Math.PI / 180
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const ARIES = SIGNS[0].color, SKYBLUE = '#8fd8f6'

// ── timeline
const T = {
  h0: 0.15, zodiac: BEAT(0), ques: BEAT(1), ring: BEAT(1.5), h0Out: 3.35,
  // part 1
  h1: BEAT(6), zig: BEAT(7), tab: BEAT(8), arc: [5.04, 5.6], p1: BEAT(9), sun: BEAT(10), slice: 0.1389, stamp: BEAT(14), out1: 10.0,
  // part 2
  h2: BEAT(18), unroll: [BEAT(19), BEAT(19) + 0.7], write: [11.95, 12.95], p2: BEAT(21), peek: BEAT(23), p2Out: 15.4, p3: BEAT(27), rollUp: [15.6, 16.0], hop: [15.8, 16.5], out2: 19.9,
  // part 3
  h3: BEAT(36), disc: BEAT(37), grow: [21.7, 22.6], bloom: BEAT(39), p4: BEAT(40), badge: BEAT(42), out3: 27.0,
  // part 4
  h4: BEAT(49), top: BEAT(50), band: 28.65, stars: BEAT(52), p5: BEAT(53), drift: [30.6, 34.0], p5Out: 34.2, p6: BEAT(61), seasons: BEAT(62), out4: 39.2,
  // end
  end: BEAT(71), newYou: BEAT(72), parade: 41.0, fade: [44.3, 45.0],
}
const SLICE_T = i => +(T.sun + i * T.slice).toFixed(3)
const PEEK_T = i => +(T.peek + i * 0.2778).toFixed(3)
const BLOOM_T = i => +(T.bloom + i * 0.2778).toFixed(3)
const SEASON_T = i => +(T.seasons + i * 0.2778).toFixed(3)
const DRIFT = 26                                     // degrees the star ring slides against the signs (illustrative)

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outScale = (t, t0, d = 0.3) => { const p = prog(t, t0, t0 + d); return p <= 0 ? 1 : p >= 1 ? 0 : 1 + 0.25 * Math.sin(Math.PI * Math.min(1, p * 2)) - ease.inCubic(p) }
const outK = (t, a, d = 0.2) => 1 - ease.inQuad(prog(t, a, a + d))

const SPARK = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(ctx, x, y, t, t0, { n = 10, rad = 150, seed = 1, cols = SPARK, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = rad * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

/** springy word-by-word type. `*a b*` = accent run (EB Garamond italic, colour), `|` = line break.
 *  big: { i, at } makes word i pop late and large with a wobble. */
function popText(parent, text, { top, size, weight, accentColor = GOLD, accentSize, gap = 0.07, at: t0, big = null, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (1080 - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight: 1.04, color, textShadow: SHADOW, letterSpacing: '-0.015em' }, parent)
  const ws = []
  let acc = false, n = 0
  for (const tok of text.split(' ')) {
    if (tok === '|') { el('br', {}, box); continue }
    const startA = tok.startsWith('*'), endA = tok.endsWith('*')
    if (startA) acc = true
    const isAcc = acc
    if (endA) acc = false
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 80%' }
    if (isAcc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.1) + 'px', color: accentColor, letterSpacing: '0',
      textShadow: `0 0 28px ${rgba(accentColor, 0.4)}, ${SHADOW}` })
    const isBig = big && big.i === n
    ws.push({ t: isBig ? big.at : t0 + n * gap, big: isBig, e: el('span', style, box, tok.replace(/\*/g, '')) })
    n++
  }
  return {
    words: ws,
    update(t, out = 1) {
      box.style.display = out <= 0 || t < t0 - 0.01 ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 14).toFixed(2)}px) scale(${(sc * lerp(0.85, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

// geometry
const ARC = { cx: 540, cy: 1200, rx: 405, ry: 450, band: 74 }           // the Sun's path over Babylon
const arcPt = (u, dr = 0) => { const an = Math.PI + u * Math.PI; return { x: ARC.cx + Math.cos(an) * (ARC.rx + dr), y: ARC.cy + Math.sin(an) * (ARC.ry + dr) } }
const RING = { cx: 540, cy: 1060 }                                        // part 4 rings
const angOf = lon => Math.PI - lon * D2R
const at = (cx, cy, lon, r) => ({ x: cx + Math.cos(angOf(lon)) * r, y: cy + Math.sin(angOf(lon)) * r })

async function build(stage) {
  // ō (U+014D) lives in EB Garamond's latin-ext subset, which film.html doesn't declare: add it here (unicode-range scoped).
  try {
    const base = new URL('../../../../app/node_modules/@fontsource/eb-garamond/files/', import.meta.url)
    for (const [wt, st] of [[500, 'italic'], [400, 'italic'], [600, 'italic']]) {
      const f = new FontFace('EB Garamond', `url(${new URL(`eb-garamond-latin-ext-${wt}-${st}.woff2`, base)}) format('woff2')`, { style: st, weight: String(wt), unicodeRange: 'U+0100-024F, U+0304, U+0308, U+1E00-1EFF' })
      document.fonts.add(f)
    }
    await Promise.all(["800 108px Inter", "700 62px Inter", "italic 500 118px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
    await document.fonts.load("italic 500 100px 'EB Garamond'", 'zōidiakos')
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const TOPC = layerCanvas(root, { pointerEvents: 'none' }), fx = TOPC.getContext('2d')   // art that must sit above the type (rare) — kept for sparkles

  const eyebrow = txt => el('div', { position: 'absolute', left: 0, width: '1080px', top: '128px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', textIndent: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, txt)
  const EYES = [[eyebrow('PART 1 · BABYLON'), T.h1 - 0.1, T.out1], [eyebrow('PART 2 · GREECE'), T.h2 - 0.1, T.out2], [eyebrow('PART 3 · SPRING'), T.h3 - 0.1, T.out3], [eyebrow('PART 4 · THE WOBBLE'), T.h4 - 0.1, T.out4]]
  const head = (text, t0, o = {}) => popText(root, text, { top: 190, size: TYPE.headSize, weight: 800, at: t0, accentSize: 122, ...o })
  const sub = (text, t0, o = {}) => popText(root, text, { top: TYPE.subY - 10, size: TYPE.subSize, weight: 700, at: t0, gap: 0.06, accentSize: 72, ...o })
  const H0 = head('Where did | the *zodiac* | come from?', T.h0, { size: 124, accentSize: 150, top: 176, accentColor: PINK, big: { i: 3, at: T.zodiac } })
  const H1 = head('First stop: | *Babylon.*', T.h1, { accentColor: SAND, accentSize: 140 })
  const H2 = head('Then came | the *Greeks.*', T.h2, { accentColor: SKYBLUE, accentSize: 140 })
  const H3 = head('Why does *Aries* | go first?', T.h3, { accentColor: ARIES, accentSize: 134 })
  const H4 = head('Plot twist: | Earth *wobbles.*', T.h4, { accentColor: GOLD, accentSize: 134 })
  const HEADS = [[H0, T.h0Out], [H1, T.out1], [H2, T.out2], [H3, T.out3], [H4, T.out4]]
  const P1 = sub('Babylonian astronomers | split the Sun’s path | into *12 equal parts.*', T.p1)
  const P2 = sub('The Greeks called it the | *zōidiakos kyklos.*', T.p2, { accentSize: 92, accentColor: GOLD })
  const P3 = sub('Literally: the circle | of little *animals.*', T.p3, { accentColor: PINK, accentSize: 78 })
  const P4 = sub('*Aries* starts on the | March equinox, the | first day of spring.', T.p4, { accentColor: ARIES, accentSize: 76 })
  const P5 = sub('Earth wobbles, so the signs | and the star patterns have | slowly drifted apart.', T.p5, { gap: 0.05 })
  const P6 = sub('That’s why astrologers | use the *seasons.*', T.p6, { accentColor: '#7fe0a0', accentSize: 80 })
  const SUBS = [[P1, T.out1], [P2, T.p2Out], [P3, T.out2], [P4, T.out3], [P5, T.p5Out], [P6, T.out4]]
  const END = popText(root, 'Old sky. | *New you.*', { top: 610, size: 172, weight: 800, at: T.end, gap: 0.12, accentColor: GOLD, accentSize: 196, big: { i: 2, at: T.newYou } })
  END.words[3].t = T.newYou + 0.14
  END.words[3].big = true

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)
  // keep sparkles above type but below grain
  root.insertBefore(TOPC, grainC)

  // ═════════════ hook: the gold "?" and the 12 glyphs ringing in
  const HOOK = { cx: 540, cy: 1080, r: 330 }
  function drawHook(t) {
    if (t > T.h0Out + 0.6) return
    const rot = (t - T.ring) * 8
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    SIGNS.forEach((s, i) => {
      const t0 = T.ring + i * 0.0926
      if (t < t0) return
      const k = pop01(t, t0, 0.4, 2.4) * outScale(t, T.h0Out + i * 0.015)
      if (k <= 0) return
      const fly = 1 - ease.outCubic(prog(t, t0, t0 + 0.45))
      const p = at(HOOK.cx, HOOK.cy, i * 30 + 15 + rot - 60 * fly, HOOK.r * (1 + 0.9 * fly))
      x.save(); x.translate(p.x, p.y + 10 * Math.sin(t * 2 + i)); x.scale(k, k)
      x.shadowColor = s.color; x.shadowBlur = 26; x.fillStyle = s.color; x.font = `bold 112px ${GLYPH_FONT}`
      x.fillText(s.glyph + VS, 0, 0); x.restore()
    })
    // a dashed ring joins them once they're in
    const rk = ease.inOutCubic(prog(t, T.ring + 1.0, T.ring + 1.6)) * outK(t, T.h0Out, 0.25)
    if (rk > 0) { x.save(); x.globalAlpha = 0.5 * rk; x.setLineDash([12, 18]); x.lineDashOffset = -t * 20; x.beginPath(); x.arc(HOOK.cx, HOOK.cy, HOOK.r - 70, 0, Math.PI * 2 * rk); ink(x, BONE, { w: 4, fa: 0, glow: 10 }); x.restore() }
    const qk = t >= T.ques ? pop01(t, T.ques, 0.5, 2.6) * outScale(t, T.h0Out + 0.1) : 0
    if (qk > 0) {
      x.save(); x.translate(HOOK.cx, HOOK.cy + 20 * Math.sin((t - T.ques) * 2.2)); x.rotate((14 * Math.sin((t - T.ques) * 1.8)) * D2R); x.scale(qk, qk)
      x.shadowColor = rgba(GOLD, 0.85); x.shadowBlur = 50; x.fillStyle = GOLD; x.font = `800 340px ${INTER}`; x.fillText('?', 0, 0); x.restore()
    }
    x.restore()
  }

  // ═════════════ part 1: Babylon
  function drawBabylon(t) {
    if (t < T.zig - 0.05 || t > T.out1 + 0.6) return
    const out = i => outScale(t, T.out1 + i * 0.05)
    // warm desert glow at the horizon
    const warm = ease.outQuad(prog(t, T.zig - 0.2, T.zig + 0.6)) * outK(t, T.out1, 0.5)
    if (warm > 0) {
      const g = x.createRadialGradient(540, 1460, 0, 540, 1460, 700); g.addColorStop(0, `rgba(242,170,92,${0.22 * warm})`); g.addColorStop(1, 'rgba(242,120,92,0)')
      x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(0, 760, 1080, 900); x.restore()
      x.save(); x.globalAlpha = warm * 0.8; x.beginPath(); x.moveTo(40, 1462); x.lineTo(1040, 1462); ink(x, SAND, { w: 5, fa: 0, glow: 10 }); x.restore()
    }
    // the Sun's path: a dashed arc that draws in, then 12 panels that pop as the Sun passes
    const ak = ease.inOutCubic(prog(t, ...T.arc)) * out(0)
    if (ak > 0) {
      x.save(); x.globalAlpha = 0.6 * clamp(ak * 2); x.setLineDash([14, 16]); x.lineDashOffset = -t * 40
      x.beginPath(); x.ellipse(ARC.cx, ARC.cy, ARC.rx, ARC.ry, 0, Math.PI, Math.PI + Math.PI * clamp(ak)); ink(x, GOLD, { w: 4, fa: 0, glow: 12 }); x.restore()
    }
    for (let i = 0; i < 12; i++) {
      const k = pop01(t, SLICE_T(i), 0.34, 2.4) * out(1 + i * 0.02)
      if (k <= 0) continue
      const s = SIGNS[i], u0 = (i + 0.06) / 12, u1 = (i + 0.94) / 12, hb = ARC.band / 2 * Math.min(1.2, k)
      const lit = Math.exp(-Math.max(0, t - SLICE_T(i)) * 2.4)
      x.save(); x.globalAlpha = clamp(k * 2)
      x.beginPath()
      x.ellipse(ARC.cx, ARC.cy, ARC.rx + hb, ARC.ry + hb, 0, Math.PI + u0 * Math.PI, Math.PI + u1 * Math.PI)
      x.ellipse(ARC.cx, ARC.cy, ARC.rx - hb, ARC.ry - hb, 0, Math.PI + u1 * Math.PI, Math.PI + u0 * Math.PI, true)
      x.closePath(); ink(x, lit > 0.05 ? s.color : mix2(s.color), { w: 5, fa: 0.3 + 0.4 * lit, glow: 12 + 20 * lit, fill: s.color })
      const m = arcPt((i + 0.5) / 12)
      x.translate(m.x, m.y); x.scale(Math.min(1.25, k), Math.min(1.25, k))
      x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 8
      x.fillText(String(i + 1), 0, 2)
      x.restore()
    }
    // the Sun, sweeping the path
    if (t >= T.sun - 0.3) {
      const u = ease.inOutQuad(prog(t, T.sun - 0.15, SLICE_T(11) + 0.2))
      const sk = pop01(t, T.sun - 0.3, 0.4, 2.2) * outScale(t, T.stamp - 0.2)
      const p = arcPt(u, -ARC.band / 2 - 64)
      orb(x, p.x, p.y, 40 * sk, GOLD, clamp(sk * 2))
    }
    // ziggurat rising from the horizon, tablet beside it
    const zk = pop01(t, T.zig, 0.5, 1.6) * out(2)
    if (zk > 0) { x.save(); x.beginPath(); x.rect(0, 0, 1080, 1466); x.clip(); ziggurat(x, 540, 1462 + 200 * (1 - clamp(zk)), 1.0, t, clamp(zk * 2)); x.restore() }
    const tk = pop01(t, T.tab, 0.42, 2.4) * out(3)
    const marks = 12 * prog(t, T.sun, SLICE_T(11) + 0.1) + 0.999
    tablet(x, 925, 1350 + 6 * Math.sin(t * 2), 0.72 * tk, t, { a: clamp(tk * 2), marks: t < T.sun ? 0 : marks, rot: 0.1 })
    // "12" stamp at the top of the arc
    const st = pop01(t, T.stamp, 0.42, 3.0) * out(4)
    if (st > 0) {
      x.save(); x.translate(540, 985); x.rotate(-6 * D2R + 8 * D2R * Math.sin((t - T.stamp) * 12) * Math.exp(-(t - T.stamp) * 4)); x.scale(st, st)
      x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); ink(x, GOLD, { w: 8, fa: 0.2, glow: 24 })
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD; x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 24
      x.font = `800 104px ${INTER}`; x.fillText('12', 0, 6); x.restore()
    }
  }
  const mix2 = c => c

  // ═════════════ part 2: Greece
  const SC = { cx: 540, cy: 960, w: 860, h: 380 }
  const PEEK = [[220, 680], [860, 680], [215, 1250], [865, 1250]]
  function drawGreece(t) {
    if (t < T.unroll[0] - 0.05 || t > T.out2 + 0.6) return
    const open = ease.outCubic(prog(t, ...T.unroll)), roll = ease.inOutCubic(prog(t, ...T.rollUp))
    // the scroll, then rolled up
    if (roll < 1) {
      const wr = clamp(prog(t, ...T.write))
      scroll(x, SC.cx, SC.cy, SC.w, SC.h, open * (1 - roll), 1 - ease.inQuad(roll) * 0.3, c => {
        c.save(); c.textAlign = 'center'; c.textBaseline = 'middle'
        c.beginPath(); c.rect(SC.cx - 380, SC.cy - 150, 760 * ease.inOutQuad(wr), 300); c.clip()
        c.fillStyle = GOLD; c.shadowColor = rgba(GOLD, 0.7); c.shadowBlur = 20
        c.font = `italic 500 132px 'EB Garamond', serif`; c.fillText('zōidiakos', SC.cx, SC.cy - 52)
        c.font = `italic 500 132px 'EB Garamond', serif`; c.fillText('kyklos', SC.cx, SC.cy + 72)
        c.restore()
        // the quill nib following the writing
        if (wr > 0 && wr < 1) { const qx = SC.cx - 380 + 760 * ease.inOutQuad(wr), qy = SC.cy + (wr < 0.6 ? -52 : 72) + 30 * Math.sin(t * 22); c.save(); c.translate(qx, qy); c.rotate(-0.7); c.beginPath(); c.moveTo(0, 0); c.lineTo(-14, -80); c.quadraticCurveTo(10, -150, 50, -170); c.quadraticCurveTo(30, -90, 0, 0); ink(c, BONE, { w: 5, fa: 0.3 }); c.restore() }
      })
    }
    const rk = roll > 0 ? pop01(t, T.rollUp[1] - 0.1, 0.4, 2.2) * outScale(t, T.out2 + 0.1) : 0
    rolled(x, 540, 1030 + 8 * Math.sin(t * 2), 0.85 * rk, clamp(rk * 2), 0.35 + 0.05 * Math.sin(t * 1.5))
    // the circle path the animals parade on
    const CR = 300, CY = 1030
    const ck = ease.inOutCubic(prog(t, T.hop[0], T.hop[1])) * outK(t, T.out2, 0.3)
    if (ck > 0) { x.save(); x.globalAlpha = 0.55 * ck; x.setLineDash([12, 16]); x.lineDashOffset = t * 30; x.beginPath(); x.arc(540, CY + 60, CR, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ck); ink(x, BONE, { w: 4, fa: 0, glow: 10 }); x.restore() }
    // the animals: peek out at the corners, then hop onto the circle and parade round it
    ANIMALS.forEach((draw, i) => {
      const t0 = PEEK_T(i)
      if (t < t0) return
      const k = pop01(t, t0, 0.42, 2.6) * outScale(t, T.out2 + i * 0.05)
      if (k <= 0) return
      const h = ease.inOutCubic(prog(t, T.hop[0] + i * 0.08, T.hop[1] + i * 0.08))
      const parade = Math.max(0, t - T.hop[0]) * 0.55                        // radians round the circle
      const ang = -Math.PI / 4 - i * Math.PI / 2 - parade * h                   // counter-clockwise on screen
      const cx = 540 + Math.cos(ang) * CR, cy = CY + 60 + Math.sin(ang) * CR
      const px = lerp(PEEK[i][0], cx, h), py = lerp(PEEK[i][1], cy, h) - 120 * Math.sin(Math.PI * h)
      const vx = Math.sin(ang)                                                  // screen x-velocity sign (ccw)
      const flip = h > 0.5 ? clamp(vx * 3, -1, 1) || 0.01 : (i % 2 ? -1 : 1)
      const hop = h >= 1 ? Math.abs(Math.sin((t - T.hop[1]) * 7 + i)) * 16 : 0
      const sq = h >= 1 ? 1 - 0.06 * Math.cos((t - T.hop[1]) * 14 + i * 2) : 1
      x.save(); x.translate(px, py - hop); x.scale(1 / sq, sq)
      draw(x, 0, 0, 0.82 * k, t, { a: clamp(k * 2), step: h >= 1 ? (t - T.hop[1]) * 9 + i : t * 3 + i, flip: Math.abs(flip) < 0.15 ? 0.15 * Math.sign(flip || 1) : flip })
      x.restore()
    })
  }

  // ═════════════ part 3: spring
  function drawSpring(t) {
    if (t < T.disc - 0.05 || t > T.out3 + 0.6) return
    const out = i => outScale(t, T.out3 + i * 0.06)
    const dk = pop01(t, T.disc, 0.45, 2.2) * out(0)
    const tt = t - T.disc - 0.3
    const tilt = tt > 0 ? 0.32 * Math.exp(-tt * 1.6) * Math.cos(tt * 6) : 0.32         // a balance settling level
    dayNight(x, 540, 790, 0.95 * dk, t, { a: clamp(dk * 2), tilt })
    const lk = ease.outCubic(prog(t, T.disc + 0.35, T.disc + 0.7)) * out(1)
    if (lk > 0) {
      x.save(); x.globalAlpha = lk; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 40px ${MONO}`; x.fillStyle = BONE
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12; x.letterSpacing = '6px'
      x.fillText('DAY = NIGHT', 546, 1000 + 12 * (1 - lk)); x.restore()
    }
    const g = ease.inOutCubic(prog(t, ...T.grow)) * out(2)
    branch(x, t, g, BRANCH_FLOWERS.map((_, i) => pop01(t, BLOOM_T(i), 0.4, 2.6)), clamp(out(2) * 2))
    // petals drifting down to the right
    const pa = ease.outQuad(prog(t, BLOOM_T(2), BLOOM_T(4))) * outK(t, T.out3, 0.3)
    if (pa > 0) {
      const r = rng(77)
      for (let i = 0; i < 10; i++) {
        const ph = (t * (0.18 + r() * 0.1) + r()) % 1, sx = 200 + r() * 500
        const px = sx + ph * 260 + 30 * Math.sin(t * 2 + i), py = 1100 + ph * 360
        x.save(); x.globalAlpha = pa * (1 - ph) * 0.9; x.translate(px, py); x.rotate(t * 2 + i); x.beginPath(); x.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2); ink(x, PINK, { w: 3, fa: 0.5, glow: 8 }); x.restore()
      }
    }
    // the 0° ♈ stamp
    const bk = pop01(t, T.badge, 0.38, 3.0) * out(3)
    if (bk > 0) {
      const drop = 1 - ease.inCubic(prog(t, T.badge - 0.2, T.badge))
      badge0(x, 830, 1250 - 300 * drop, 1.05 * Math.max(0.01, bk), t, { a: clamp(bk * 2), rot: 0.12 + 0.12 * Math.sin((t - T.badge) * 12) * Math.exp(-(t - T.badge) * 4) })
    }
  }

  // ═════════════ part 4: the wobble
  const RB = { rIn: 330, rOut: 404, rStar: 262 }
  function drawWobble(t) {
    if (t < T.top - 0.05 || t > T.out4 + 0.6) return
    const out = i => outScale(t, T.out4 + i * 0.05)
    const { cx, cy } = RING
    const seasonK = ease.inOutCubic(prog(t, T.p6, T.seasons + 0.2))
    const drift = DRIFT * ease.inOutCubic(prog(t, ...T.drift))
    // SIGNS band (fixed to the seasons)
    for (let i = 0; i < 12; i++) {
      const k = pop01(t, T.band + i * 0.046, 0.36, 2.2) * out(0)
      if (k <= 0) continue
      const s = SIGNS[i], mid = (RB.rIn + RB.rOut) / 2, half = (RB.rOut - RB.rIn) / 2 * Math.min(1.15, k)
      const lit = (i === 0 ? ease.outCubic(prog(t, T.drift[0] - 0.3, T.drift[0])) * (1 - seasonK) : 0) + 0.5 * seasonK
      x.save(); x.globalAlpha = clamp(k * 2)
      x.beginPath(); x.arc(cx, cy, mid + half, angOf(i * 30 + 1.2), angOf(i * 30 + 28.8), true); x.arc(cx, cy, mid - half, angOf(i * 30 + 28.8), angOf(i * 30 + 1.2), false); x.closePath()
      ink(x, lit > 0.05 ? s.color : BONE, { w: 5, fa: 0.24 + 0.4 * lit, glow: 10 + 20 * lit, fill: s.color })
      const gp = at(cx, cy, i * 30 + 15, mid)
      x.translate(gp.x, gp.y); x.scale(Math.min(1.2, k), Math.min(1.2, k))
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = s.color; x.font = `bold 48px ${GLYPH_FONT}`; x.fillText(s.glyph + VS, 0, 2)
      x.restore()
    }
    // STARS ring: dot patterns that slide (counter-clockwise) against the signs
    const sk = ease.outCubic(prog(t, T.stars, T.stars + 0.5)) * out(1) * (1 - 0.55 * seasonK)
    if (sk > 0) {
      x.save(); x.globalAlpha = sk * 0.35; x.beginPath(); x.arc(cx, cy, RB.rStar, 0, Math.PI * 2); x.setLineDash([4, 14]); ink(x, BONE, { w: 3, fa: 0, glow: 6 }); x.restore()
      CONSTELLATIONS.forEach((pts, i) => {
        const hi = i === 0, col = hi ? ARIES : '#e3ecff'
        const lon0 = i * 30 + 15 + drift
        const P = pts.map(p => at(cx, cy, lon0 + p.da, RB.rStar + p.dr * 0.8))
        x.save(); x.globalAlpha = sk * (hi ? 1 : 0.75)
        x.beginPath(); P.forEach((p, k) => k ? x.lineTo(p.x, p.y) : x.moveTo(p.x, p.y)); ink(x, col, { w: hi ? 4 : 3, fa: 0, glow: hi ? 14 : 6 })
        x.imageSmoothingEnabled = false
        P.forEach((p, k) => drawPixelStar(x, Math.round(p.x), Math.round(p.y), pts[k].big ? 21 : 14, 0, hi ? '#ffd2c0' : '#fff3e0'))
        x.restore()
      })
      // the drift arrow: from the ♈ sign panel to where the Aries stars sit now
      const ar = ease.outCubic(prog(t, T.drift[0] + 0.4, T.drift[0] + 0.9)) * outK(t, T.p5Out, 0.3)
      if (ar > 0 && drift > 4) {
        const r = RB.rStar + 46
        x.save(); x.globalAlpha = ar
        x.beginPath(); x.arc(cx, cy, r, angOf(15), angOf(15 + drift - 2), true); ink(x, GOLD, { w: 6, fa: 0, glow: 14 })
        const e = at(cx, cy, 15 + drift - 2, r), an = angOf(15 + drift - 2) - Math.PI / 2      // tangent (ccw)
        x.beginPath(); x.moveTo(e.x + Math.cos(an + 2.6) * 26, e.y + Math.sin(an + 2.6) * 26); x.lineTo(e.x, e.y); x.lineTo(e.x + Math.cos(an - 2.6) * 26, e.y + Math.sin(an - 2.6) * 26); ink(x, GOLD, { w: 6, fa: 0, glow: 14 })
        x.restore()
      }
    }
    // labels
    const lk = ease.outCubic(prog(t, T.stars + 0.2, T.stars + 0.6)) * outK(t, T.out4, 0.25)
    if (lk > 0) {
      x.save(); x.globalAlpha = lk; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `700 34px ${MONO}`; x.letterSpacing = '6px'
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 12
      x.fillStyle = GOLD; x.fillText('SIGNS', cx + 3, cy + RB.rOut + 40)
      x.globalAlpha = lk * (1 - 0.5 * seasonK); x.fillStyle = '#e3ecff'; x.fillText('STARS', cx + 3, cy - RB.rStar + 56)
      x.restore()
    }
    // the Earth top, wobbling
    const tk = pop01(t, T.top, 0.5, 2.0) * out(2)
    if (tk > 0) {
      const prec = (t - T.top) * 0.9
      earthTop(x, cx, cy + 175, 0.86 * tk, t, { a: clamp(tk * 2), tilt: 0.41, prec, spin: (t - T.top) * 2.2, trace: ease.outCubic(prog(t, T.top + 0.6, T.top + 1.4)) })
    }
    // season icons on the band (spring at ♈, summer at ♋, autumn at ♎, winter at ♑)
    for (let q = 0; q < 4; q++) {
      const k = pop01(t, SEASON_T(q), 0.42, 2.6) * out(3)
      if (k <= 0) continue
      const p = at(cx, cy, q * 90 + 15, (RB.rIn + RB.rOut) / 2)
      seasonIcon(x, q, p.x, p.y, 1.05 * k, t, clamp(k * 2))
    }
  }

  // ═════════════ end: glyph burst + the animal parade
  const BURST = (() => { const r = rng(909); return SIGNS.map((s, i) => ({ s, a: (i / 12) * Math.PI * 2 + r() * 0.3, d: 380 + r() * 140, spin: (r() - 0.5) * 2, ph: r() * 6 })) })()
  function drawEnd(t) {
    if (t < T.newYou - 0.05) return
    const tau = t - T.newYou
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
    for (const b of BURST) {
      const e = ease.outExpo(clamp(tau / 1.2)), k = pop01(t, T.newYou, 0.35, 2.2)
      const d = b.d * e + 30 * tau, px = 540 + Math.cos(b.a) * d * 1.05, py = 800 + Math.sin(b.a) * d * 1.25 + 8 * Math.sin(t * 2 + b.ph)
      x.save(); x.translate(px, py); x.rotate(b.spin * tau * 0.4); x.scale(k * 0.9, k * 0.9); x.globalAlpha = 0.9
      x.shadowColor = b.s.color; x.shadowBlur = 22; x.fillStyle = b.s.color; x.font = `bold 84px ${GLYPH_FONT}`; x.fillText(b.s.glyph + VS, 0, 0); x.restore()
    }
    x.restore()
    // the four animals trot across the bottom, left to right
    if (t >= T.parade) {
      ANIMALS.forEach((draw, i) => {
        const u = (t - T.parade) * 190 - i * 210
        const px = -120 + u, py = 1420 - Math.abs(Math.sin((t - T.parade) * 6 + i)) * 26
        if (px < -160 || px > 1240) return
        draw(x, px, py, 0.7, t, { a: 1, step: (t - T.parade) * 9 + i, flip: 1 })
      })
    }
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(x, t, t < 3.4 ? { ...SKY_H, zoom: lerp(1.62, SKY_H.zoom, ease.inOutCubic(prog(t, 0, 3.4))) } : SKY_H)
      fx.clearRect(0, 0, 1080, 1920)
      drawHook(t); drawBabylon(t); drawGreece(t); drawSpring(t); drawWobble(t); drawEnd(t)
      // sparkle bursts (above type)
      sparkle(fx, 540, 1080, t, T.ques + 0.1, { n: 14, rad: 260, seed: 3, size: 32 })
      sparkle(fx, 540, 1462 - 330, t, T.zig + 0.3, { n: 10, rad: 200, seed: 11, cols: [SAND, GOLD, '#fff3e0'] })
      sparkle(fx, 925, 1350, t, T.tab + 0.1, { n: 8, rad: 140, seed: 12, cols: [SAND, '#fff3e0'] })
      for (let i = 0; i < 12; i += 1) { const m = arcPt((i + 0.5) / 12); sparkle(fx, m.x, m.y, t, SLICE_T(i) + 0.05, { n: 6, rad: 80, seed: 20 + i, size: 21, cols: [SIGNS[i].color, '#fff3e0'] }) }
      sparkle(fx, 540, 1000, t, T.stamp + 0.1, { n: 14, rad: 240, seed: 40, size: 32 })
      sparkle(fx, 540, 960, t, T.unroll[1] - 0.1, { n: 12, rad: 300, seed: 41, cols: [GOLD, SKYBLUE, '#fff3e0'] })
      sparkle(fx, 540, 960, t, T.write[1], { n: 14, rad: 340, seed: 42, size: 32, cols: [GOLD, '#ffd98a', '#fff3e0'] })
      PEEK.forEach((p, i) => sparkle(fx, p[0], p[1], t, PEEK_T(i) + 0.1, { n: 8, rad: 130, seed: 50 + i, size: 24, cols: [ANIMAL_COLORS[i], '#fff3e0'] }))
      sparkle(fx, 540, 1090, t, T.hop[1] + 0.2, { n: 14, rad: 380, seed: 55, size: 28 })
      sparkle(fx, 540, 790, t, T.disc + 0.1, { n: 12, rad: 230, seed: 60, cols: [GOLD, '#3f7cf0', '#fff3e0'] })
      BRANCH_FLOWERS.forEach((f, i) => sparkle(fx, f[0], f[1], t, BLOOM_T(i) + 0.08, { n: 6, rad: 90, seed: 61 + i, size: 21, cols: [PINK, '#fff3e0', GOLD] }))
      sparkle(fx, 830, 1250, t, T.badge + 0.04, { n: 14, rad: 260, seed: 70, size: 32, cols: [ARIES, GOLD, '#fff3e0'] })
      sparkle(fx, RING.cx, RING.cy, t, T.top + 0.15, { n: 10, rad: 200, seed: 80, cols: ['#4f9cf0', GOLD, '#fff3e0'] })
      for (let q = 0; q < 4; q++) { const p = at(RING.cx, RING.cy, q * 90 + 15, 367); sparkle(fx, p.x, p.y, t, SEASON_T(q) + 0.1, { n: 8, rad: 120, seed: 90 + q, size: 24 }) }
      sparkle(fx, 540, 860, t, T.newYou + 0.2, { n: 16, rad: 360, seed: 99, size: 35 })
      // type
      for (const [e, t0, o] of EYES) { const p = ease.outCubic(prog(t, t0, t0 + 0.35)); e.style.opacity = String(p * outK(t, o)); e.style.transform = `translateY(${((1 - p) * 16).toFixed(2)}px)` }
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      for (const [p, o] of SUBS) p.update(t, outK(t, o))
      END.update(t, 1)
      drawGrain(gx, t)
      black.style.opacity = String(t >= DURATION - 0.035 ? 1 : Math.max(1 - ease.inOutQuad(prog(t, 0, 0.4)), ease.inOutQuad(prog(t, ...T.fade))))
    },
  }
}

/** a glowing orb: soft halo, shaded sphere, a pixel-star glint */
function orb(x, px, py, r, color, a) {
  if (a <= 0 || r <= 0.5) return
  x.save(); x.globalCompositeOperation = 'lighter'
  const hr = r * 3.4, g = x.createRadialGradient(px, py, r * 0.5, px, py, hr)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.3, rgba(color, 0.16 * a)); g.addColorStop(1, rgba(color, 0))
  x.fillStyle = g; x.beginPath(); x.arc(px, py, hr, 0, Math.PI * 2); x.fill()
  x.globalCompositeOperation = 'source-over'; x.globalAlpha = a
  const s = x.createRadialGradient(px - r * 0.35, py - r * 0.4, r * 0.08, px, py, r)
  s.addColorStop(0, '#fffaf0'); s.addColorStop(0.4, color); s.addColorStop(1, rgba(color, 0.85))
  x.fillStyle = s; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill()
  drawPixelStar(x, Math.round(px + r * 0.8), Math.round(py - r * 0.8), 21, 0, rgba('#fff3e0', 0.9))
  x.restore()
}

// card-motif cuts ~0.15 s before each part's headline (the eyebrow fades in at h-0.1, the old type is out underneath):
// hook → Babylon 3.78 · → Greece 10.45 · scroll → "circle of little animals" 15.5 · → Spring 20.45 · → Wobble 27.67 ·
// "use the seasons" 34.35 · → "Old sky. New you." 39.9
const CUTS = [
  { t: 3.78, kind: 'flip' }, { t: 10.45, kind: 'deal' }, { t: 15.5, kind: 'fan' }, { t: 20.45, kind: 'shuffle' },
  { t: 27.67, kind: 'flip', dir: -1 }, { t: 34.35, kind: 'deal', from: 'left' }, { t: 39.9, kind: 'fan', dir: -1 },
]
export const SCENES = [build, cardFrame({ start: 0, end: DURATION, fadeOut: 0.7 }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const words = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, i % 2 ? 0.15 : -0.15])
const SCALE = [587.33, 659.25, 739.99, 880, 987.77, 1108.73, 1174.66, 1318.51, 1479.98, 1661.22, 1760, 1975.53]
const FILM_CUES = [
  // hook
  ...words(T.h0, 3, 0.07, 0),
  ['pop', T.zodiac, 1318.51, 0.06, 0], ['pluck', T.zodiac, 1174.66, 0.05, 0.6, 0],
  ...words(T.zodiac + 0.12, 2, 0.07, 3),
  ['pop', T.ques, 587.33, 0.065, 0], ['glitter', T.ques, T.ques + 0.6],
  ...SIGNS.map((_, i) => ['pop', +(T.ring + i * 0.0926).toFixed(3), SCALE[i], 0.025, i % 2 ? 0.3 : -0.3]),
  ['whoosh', T.h0Out - 0.05, 0.45, 0.035],
  // part 1
  ...words(T.h1, 3, 0.07, 1),
  ['whoosh', T.zig - 0.1, 0.6, 0.04], ['pluck', T.zig + 0.2, 293.66, 0.05, 0.6, 0],
  ['pop', T.tab, 880, 0.055, 0.4], ['tick', T.tab + 0.1, 0.04],
  ...words(T.p1, 9, 0.06, 2, 0.02),
  ...Array.from({ length: 12 }, (_, i) => ['pop', SLICE_T(i), SCALE[i], 0.04, -0.5 + i / 11]),
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(SLICE_T(i) + 0.02).toFixed(3), 0.025]),
  ['pop', T.stamp, 1174.66, 0.07, 0], ['pluck', T.stamp, 587.33, 0.055, 0.7, 0], ['boom', T.stamp, 0.06], ['glitter', T.stamp, T.stamp + 0.6],
  ['whoosh', T.out1, 0.45, 0.035],
  // part 2
  ...words(T.h2, 4, 0.07, 0),
  ['whoosh', T.unroll[0], 0.6, 0.04], ['pop', T.unroll[1] - 0.1, 740, 0.05, 0],
  ['riser', T.write[0], T.write[1], 0.02], ['glitter', T.write[0], T.write[1]], ['bell', T.write[1], 1318.51, 0.035, 1.6, 0],
  ...words(T.p2, 7, 0.06, 2, 0.02),
  ...[0, 1, 2, 3].map(i => ['pop', PEEK_T(i), [880, 987.77, 1174.66, 1318.51][i], 0.055, [-0.4, 0.4, -0.4, 0.4][i]]),
  ...words(T.p3, 7, 0.06, 1, 0.02),
  ['whoosh', T.rollUp[0], 0.4, 0.035], ['pop', T.rollUp[1], 659.25, 0.05, 0],
  ...[0, 1, 2, 3].map(i => ['pluck', +(T.hop[0] + 0.3 + i * 0.08).toFixed(3), [587.33, 739.99, 880, 1174.66][i], 0.04, 0.4, (i - 1.5) * 0.3]),
  ['glitter', T.hop[1], T.hop[1] + 0.6],
  ...Array.from({ length: 6 }, (_, i) => ['tick', BEAT(30 + i), 0.02]),
  ['whoosh', T.out2, 0.45, 0.035],
  // part 3
  ...words(T.h3, 5, 0.07, 3),
  ['pop', T.disc, 739.99, 0.06, 0], ['pluck', T.disc + 0.05, 440, 0.04, 0.6, 0],
  ['whoosh', T.grow[0], 0.8, 0.03],
  ...BRANCH_FLOWERS.map((_, i) => ['pop', BLOOM_T(i), [987.77, 1174.66, 1318.51, 1479.98, 1760][i], 0.045, -0.5 + i * 0.2]),
  ...words(T.p4, 11, 0.06, 0, 0.018),
  ['whoosh', T.badge - 0.25, 0.25, 0.03], ['boom', T.badge, 0.08], ['pop', T.badge, 1318.51, 0.065, 0.3], ['bell', T.badge + 0.02, 1174.66, 0.035, 1.6, 0.3], ['glitter', T.badge, T.badge + 0.7],
  ['whoosh', T.out3, 0.45, 0.035],
  // part 4
  ...words(T.h4, 4, 0.07, 2),
  ['pop', T.top, 587.33, 0.06, 0], ['whoosh', T.top, 1.2, 0.03],
  ...SIGNS.map((_, i) => ['pop', +(T.band + i * 0.046).toFixed(3), SCALE[i], 0.022, i % 2 ? 0.25 : -0.25]),
  ['glitter', T.stars, T.stars + 0.6], ['pluck', T.stars, 880, 0.04, 0.6, 0],
  ...words(T.p5, 13, 0.05, 1, 0.016),
  ['riser', T.drift[0], T.drift[1], 0.015], ['pluck', T.drift[1], 659.25, 0.04, 0.8, 0],
  ...words(T.p6, 6, 0.06, 3, 0.02),
  ...[0, 1, 2, 3].map(i => ['pop', SEASON_T(i), [880, 1108.73, 1318.51, 1760][i], 0.055, [-0.5, 0, 0.5, 0][i]]),
  ['bell', SEASON_T(3) + 0.05, 1760, 0.03, 1.4, 0],
  ['whoosh', T.out4, 0.45, 0.04],
  // end
  ['pop', T.end, 880, 0.05, -0.2], ['pop', T.end + 0.12, 1108.73, 0.05, 0.2],
  ['pop', T.newYou, 1318.51, 0.07, 0], ['pop', T.newYou + 0.14, 1760, 0.06, 0], ['bell', T.newYou + 0.02, 1318.51, 0.035, 1.8, 0],
  ['whoosh', T.newYou - 0.05, 0.6, 0.045], ['boom', T.newYou, 0.1], ['glitter', T.newYou, T.newYou + 1.4],
  ...SIGNS.map((_, i) => ['pop', +(T.newYou + 0.05 + i * 0.04).toFixed(3), SCALE[11 - i], 0.02, i % 2 ? 0.5 : -0.5]),
  ...[0, 1, 2, 3].map(i => ['tick', +(T.parade + 0.6 + i * 1.1).toFixed(3), 0.025]),
  ['bell', T.fade[0] + 0.05, 293.66, 0.03, 2.2, 0],
]
export const CUES = [...FILM_CUES, ...cardCutCues(CUTS)]
