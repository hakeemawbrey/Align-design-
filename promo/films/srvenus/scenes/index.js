// srvenus (30 s vertical, Star Talk Remix of "Your Venus sign = how you love") · story 0–25.6, then the shared end card.
//   0.00–3.90  "Your Venus sign = | how you *love.*"  The pink ♀ VENUS star pops in with pixel hearts orbiting her.
//              Box (♀ VENUS): "hi. I'm Venus. I run your love life."  Then she scoots to the corner to watch.
//   3.93–17.2  The four love styles, one sign star each, talking in the box (Venus reacts from the corner):
//              FIRE  ♌ Leo under fireworks — "I rented a blimp. too much?"           "Fire Venus: | *big gestures.*"
//              EARTH ♉ Taurus with a gift box and a loaf — "I baked you bread. again. every week."   "*shows up.*"
//              AIR   ♎ Libra between two chat bubbles — "tell me everything. then tell me more."     "*great talks.*"
//              WATER ♓ Pisces crying a heart-shaped sea full — "love you. crying. it's fine."      "*feels it all.*"
//              (the props are the original film's, imported read-only from venus/scenes/illus.js)
//   17.27–23.3 "Venus never strays | far from the *Sun.*"  The gold ☉ Sun star walks Venus on a leash. She bolts, the leash
//              snaps her back (boing). VENUS: "I never get far from the Sun. ever." A strip of signs: she hops +1, +2,
//              strains for +3 and gets yanked back. VENUS: "your Sun sign, or two signs either way."
//   23.38–25.5 "Go look up | your *Venus.*"  Venus heart-eyed beside the Sun, heart confetti; Pisces still crying.
//   25.6→      the end card.
// One canvas (sky + props + stars), DOM type and the dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { pixelHeart, fireworks, giftBox, bread, bubble, waveHeart, splash } from '../../venus/scenes/illus.js'

export const DURATION = 30
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN          // 25.6
const BONE = '#efe6d6', GOLD = '#f2c75c', PINK = '#ff8fb1', ROSE = '#e8628a', SUNC = '#ffc24a', TEAR = '#8fd8ff'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', monospace"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const BEAT = n => 0.6 + n * 0.5556
const CPS = 32
const sign = id => SIGNS.find(s => s.id === id)
const VEN = { color: PINK, glyph: '♀' }, SUN = { color: SUNC, glyph: '☉' }
const LEO = signStar('leo'), TAU = signStar('taurus'), LIB = signStar('libra'), PIS = signStar('pisces')
const V = '♀ VENUS'

// ── beats
const SEG = [BEAT(6), BEAT(12), BEAT(18), BEAT(24)].map(v => +v.toFixed(3))   // fire, earth, air, water
const SEG_LEN = 6 * 0.5556
const T = {
  h0: 0.12, h0Acc: BEAT(1), h0Out: [3.7, 3.88], venIn: 0.5, toCorner: [3.7, 4.15],
  fact: BEAT(30), bolt: [18.0, 18.45], snap: 18.62, strip: 20.45, hop1: 20.95, hop2: 21.45, strain: [21.95, 22.4], yank: 22.45,
  factOut: [23.1, 23.3], end: BEAT(41), endAcc: BEAT(42), out: [25.1, 25.5],
}
const LINES1 = [
  { t: 0.9, speaker: V, color: PINK, text: "hi. I'm Venus. I run your *love life.*" },
  { t: SEG[0] + 0.18, speaker: '♌ LEO STAR', color: LEO.color, text: 'I rented a *blimp*. too much?' },
  { t: SEG[1] + 0.18, speaker: '♉ TAURUS STAR', color: TAU.color, text: 'I baked you bread. again. *every week.*' },
  { t: SEG[2] + 0.18, speaker: '♎ LIBRA STAR', color: LIB.color, text: 'tell me everything. then tell me *more.*' },
  { t: SEG[3] + 0.18, speaker: '♓ PISCES STAR', color: PIS.color, text: "love you. crying. it's *fine.*" },
]
const LINES2 = [
  { t: 17.6, speaker: V, color: PINK, text: 'I never get far from the *Sun*. ever.' },
  { t: 20.7, speaker: V, color: PINK, text: 'your Sun sign, or *two signs* either way.' },
]
const ALL = [...LINES1, ...LINES2]
const BOX = [{ lines: LINES1, open: 0.75, close: 17.15 }, { lines: LINES2, open: 17.45, close: 23.85 }]
const hopsOf = sp => talkHops(ALL, sp, { cps: CPS })

const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${a})` }
const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

function makeBurst(seed, n = 8, dist = 90) {
  const r = rng(seed)
  return Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + r() * 0.6, d: dist * (0.6 + r() * 0.6), size: 10 + Math.round(r() * 2) * 4, kind: Math.floor(r() * 4) }))
}
function drawBurst(x, parts, px, py, t, t0, color, dur = 0.7) {
  const p = prog(t, t0, t0 + dur)
  if (p <= 0 || p >= 1) return
  const e = ease.outCubic(p)
  x.save()
  for (const q of parts) {
    x.globalAlpha = (1 - p) * (p < 0.15 ? p / 0.15 : 1)
    drawPixelStar(x, Math.round(px + Math.cos(q.a) * q.d * e), Math.round(py + Math.sin(q.a) * q.d * e), q.size, q.kind, color)
  }
  x.restore()
}
function tears(x, cx, cy, size, t, amt = 1, seed = 0, big = 1) {
  if (amt <= 0) return
  const c = Math.max(3, Math.round(size / 36)) * big
  x.save()
  for (const side of [-1, 1]) for (let k = 0; k < 3; k++) {
    const ph = ((t * 1.6 + k / 3 + seed * 0.21 + (side > 0 ? 0.5 : 0)) % 1)
    x.globalAlpha = amt * (1 - ph * 0.8); x.fillStyle = TEAR
    x.fillRect(Math.round(cx + side * size * (0.13 + 0.14 * ph) - c / 2), Math.round(cy + size * 0.02 + ph * size * 0.45), c, c * 2)
  }
  x.restore()
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "700 32px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Your Venus sign = | how you *love.*', { top: 180, size: 100, accentSize: 150, at: T.h0, late: 1, lateAt: T.h0Acc, wobble: true, accentColor: PINK })
  const segHead = [['Fire Venus: | *big gestures.*', ELEMENT_COLOR.fire], ['Earth Venus: | *shows up.*', ELEMENT_COLOR.earth], ['Air Venus: | *great talks.*', ELEMENT_COLOR.air], ['Water Venus: | *feels it all.*', ELEMENT_COLOR.water]]
    .map(([s, c], i) => ({ h: popText(root, s, { top: 180, size: 100, accentSize: 132, at: SEG[i] + 0.04, late: 1, lateAt: SEG[i] + 0.5, wobble: true, accentColor: c }), out: [SEG[i] + SEG_LEN - 0.2, SEG[i] + SEG_LEN - 0.04] }))
  const HF = popText(root, 'Venus never strays | far from the *Sun.*', { top: 180, size: 92, accentSize: 128, at: T.fact + 0.04, late: 1, lateAt: T.fact + 0.55, wobble: true, accentColor: SUNC })
  const HE = popText(root, 'Go look up | your *Venus.*', { top: 170, size: 124, accentSize: 176, at: T.end + 0.04, late: 1, lateAt: T.endAcc, wobble: true, accentColor: PINK })
  const boxes = BOX.map(b => dialogueBox(root, { lines: b.lines, y: 1450, width: 960, height: 290, open: b.open, close: b.close, cps: CPS }))
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_IN = makeBurst(801, 12, 220), B_SNAP = makeBurst(802, 10, 150), B_END = makeBurst(803, 14, 280)
  const segK = (t, i) => pop01(t, SEG[i] + 0.04, 0.38, 2.2) * (1 - ease.inQuad(prog(t, SEG[i] + SEG_LEN - 0.25, SEG[i] + SEG_LEN - 0.05)))

  // ── FIRE: Leo under fireworks
  const fb = n => SEG[0] + n * 0.2778
  const ROCKETS = [
    { x: 260, y: 690, t: fb(0.6), r: 150, col: ELEMENT_COLOR.fire, seed: 1, drift: 40 },
    { x: 820, y: 660, t: fb(1.4), r: 140, col: PINK, seed: 2, drift: -30 },
    { x: 540, y: 820, t: fb(3), r: 280, col: ELEMENT_COLOR.fire, seed: 3, heart: true },
    { x: 230, y: 1080, t: fb(5), r: 110, col: GOLD, seed: 4, drift: 30 },
    { x: 860, y: 1050, t: fb(5.6), r: 120, col: LEO.color, seed: 5, drift: -40 },
  ]
  // the blimp: a pixel airship with a heart banner drifting across
  function blimp(t) {
    const p = prog(t, SEG[0] + 1.2, SEG[0] + SEG_LEN)
    if (p <= 0 || p >= 1) return
    const bx = lerp(1250, -250, p), by = 520 + 10 * Math.sin(t * 2)
    x.save(); x.translate(bx, by)
    x.fillStyle = '#c9a6ff'; x.beginPath(); x.ellipse(0, 0, 150, 56, 0, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#9a7be0'; x.beginPath(); x.moveTo(130, 0); x.lineTo(190, -46); x.lineTo(190, 46); x.closePath(); x.fill()
    x.fillStyle = '#3a2c74'; x.fillRect(-40, 52, 80, 26)
    x.fillStyle = 'rgba(16,10,36,0.92)'; x.fillRect(-110, -24, 220, 48)
    x.fillStyle = PINK; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('♥ U ♥', 0, 2)
    x.restore()
  }

  function drawSegments(t) {
    // FIRE
    if (t > SEG[0] && t < SEG[1]) {
      fireworks(x, t, ROCKETS, 1 - ease.inQuad(prog(t, SEG[0] + SEG_LEN - 0.15, SEG[0] + SEG_LEN + 0.1)))
      blimp(t)
      const k = segK(t, 0)
      drawStarChar(x, 540, 1010, 290, t, { color: LEO.color, glyph: LEO.glyph, mood: t < SEG[0] + 1.6 ? 'sparkle' : t < LINES1[1].t + 1.0 ? 'wide' : 'happy', look: [0, 0], hops: hopsOf('♌ LEO STAR'), pop: k, seed: 11 })
    }
    // EARTH
    if (t > SEG[1] && t < SEG[2]) {
      const s = SEG[1], k = segK(t, 1)
      const d0 = s + 0.35, by = lerp(-200, 1140, ease.outBounce ? ease.outBounce(prog(t, d0, d0 + 0.5)) : ease.outCubic(prog(t, d0, d0 + 0.5)))
      giftBox(x, 250, by, 0.62 * k, t, { a: clamp(prog(t, d0, d0 + 0.1)) * clamp(k * 2), lid: ease.outBack(prog(t, s + 1.4, s + 1.8)), sq: t > d0 + 0.5 && t < d0 + 0.8 ? Math.sin(Math.PI * (t - d0 - 0.5) / 0.3) : 0 })
      const bk = pop01(t, s + 2.1, 0.36, 2.2) * k
      bread(x, 835, 1150, 0.62 * bk, t, { a: clamp(bk * 2) })
      drawStarChar(x, 540, 1000, 270, t, { color: TAU.color, glyph: TAU.glyph, mood: 'happy', look: [0, 0], hops: hopsOf('♉ TAURUS STAR'), pop: k, seed: 12 })
      // "a week of ticks": seven little ✓ marks popping under the star
      for (let d = 0; d < 7; d++) {
        const dk = pop01(t, s + 2.2 + d * 0.11, 0.25, 2.4) * k
        if (dk <= 0.01) continue
        x.save(); x.translate(540 + (d - 3) * 58, 1300); x.scale(dk, dk)
        x.font = `700 30px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText('MTWTFSS'[d], 0, -34)
        x.strokeStyle = ELEMENT_COLOR.earth; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(-12, 0); x.lineTo(-3, 10); x.lineTo(14, -10); x.stroke()
        x.restore()
      }
    }
    // AIR
    if (t > SEG[2] && t < SEG[3]) {
      const s = SEG[2], k = segK(t, 2)
      const ka = pop01(t, s + 0.4, 0.35, 2.3) * k, kb = pop01(t, s + 1.2, 0.35, 2.3) * k
      const bang = s + 2.0
      bubble(x, 270, 740, 0.62 * ka, t, { a: clamp(ka * 2), col: ELEMENT_COLOR.air, tail: 'left', content: t >= bang ? 'bang' : 'dots', rot: -0.07 + 0.04 * Math.sin(t * 3) })
      bubble(x, 810, 790, 0.62 * kb, t, { a: clamp(kb * 2), col: PINK, tail: 'right', content: 'heart', rot: 0.06 + 0.04 * Math.sin(t * 2.6 + 1), beat: Math.max(0, Math.sin(t * 9)) * 0.5 })
      for (let i = 0; i < 5; i++) {
        const p = ((t - s - 1.4) * 0.9 + i * 0.2) % 1
        if (t < s + 1.4) continue
        const fwd = i % 2 === 0
        pixelHeart(x, lerp(fwd ? 330 : 750, fwd ? 750 : 330, p), 780 - Math.sin(Math.PI * p) * 70, 8, fwd ? ROSE : ELEMENT_COLOR.air, Math.sin(Math.PI * p) * k)
      }
      drawStarChar(x, 540, 1050, 270, t, { color: LIB.color, glyph: LIB.glyph, mood: t < bang ? 'wink' : 'sparkle', look: [0, -1], hops: hopsOf('♎ LIBRA STAR'), pop: k, seed: 13 })
    }
    // WATER
    if (t > SEG[3] && t < T.fact) {
      const s = SEG[3], k = segK(t, 3)
      const fillK = ease.inOutCubic(prog(t, s + 0.4, s + 2.6))
      waveHeart(x, 540, 1060, 0.62 * k, t, { a: clamp(k * 2), fill: fillK, slosh: 0.6 * Math.max(0, Math.sin((t - s) * 3)) })
      splash(x, 540 - 120, 930, prog(t, s + 1.6, s + 2.3), 0.8)
      splash(x, 540 + 120, 930, prog(t, s + 2.6, s + 3.2), 0.8)
      const py = 820 + 6 * Math.sin(t * 2)
      drawStarChar(x, 540, py, 240, t, { color: PIS.color, glyph: PIS.glyph, mood: 'sparkle', look: [0, 0], hops: hopsOf('♓ PISCES STAR'), pop: k, seed: 14 })
      tears(x, 540, py, 240, t, clamp((t - s - 0.3) / 0.3) * k, 2, 1.5)
    }
  }

  // ── Venus herself
  function venusPos(t) {
    if (t < T.toCorner[0]) return { x: 540, y: 960, size: 300 }
    if (t < T.fact - 0.2) { const p = ease.inOutCubic(prog(t, ...T.toCorner)); return { x: lerp(540, 150, p), y: lerp(960, 1300, p) - Math.sin(Math.PI * p) * 120, size: lerp(300, 150, p) } }
    if (t < T.end - 0.1) {
      // on the leash beside the Sun: in, bolt right, snap back; later she hops the sign strip
      const inP = ease.inOutCubic(prog(t, T.fact - 0.2, T.fact + 0.3))
      let vx = lerp(150, 680, inP), vy = lerp(1300, 960, inP)
      const bolt = ease.inCubic(prog(t, ...T.bolt)), back = ease.spring(prog(t, T.snap, T.snap + 0.9), 0.2)
      vx += (960 - 680) * bolt * (1 - back)
      return { x: vx, y: vy - Math.sin(Math.PI * prog(t, T.snap, T.snap + 0.5)) * 60, size: lerp(150, 200, inP) }
    }
    const p = ease.inOutCubic(prog(t, T.end - 0.1, T.end + 0.35))
    return { x: lerp(680, 660, p), y: lerp(960, 990, p), size: lerp(200, 290, p) }
  }
  function venusMood(t) {
    if (t < T.venIn + 0.3) return { mood: 'wide', look: [0, 0] }
    if (t < T.toCorner[0]) return { mood: t < LINES1[0].t + 1.7 ? 'happy' : 'wink', look: [0, 0] }
    if (t < SEG[0]) return { mood: 'happy', look: [1, -1] }
    if (t < T.fact - 0.2) {
      const i = t < SEG[1] ? 0 : t < SEG[2] ? 1 : t < SEG[3] ? 2 : 3
      return { mood: ['wide', 'happy', 'sparkle', 'heart'][i], look: [1, -1] }
    }
    if (t < T.bolt[0]) return { mood: 'happy', look: [1, 0] }
    if (t < T.snap) return { mood: 'sparkle', look: [1, 0] }
    if (t < T.snap + 0.9) return { mood: 'wide', look: [-1, 0] }
    if (t < T.strip) return { mood: 'eyeroll' }
    if (t < T.end) return { mood: t > T.strain[0] && t < T.yank + 0.6 ? 'squint' : 'happy', look: [0, 1] }
    return { mood: 'heart', look: [0, 0] }
  }
  const VEN_HOPS = [T.venIn + 0.3, ...hopsOf(V), T.toCorner[1], ...SEG.map(s => s + 0.6), T.yank + 0.6, T.endAcc]

  // ── the fun fact: the Sun, the leash, the sign strip
  const SUN_P = { x: 330, y: 980 }
  const STRIP = ['gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio'].map(sign)   // Sun in Leo for the demo; slot 5 = +3
  const slotX = j => 540 + (j - 2.5) * 150, SLOT_Y = 1320
  function drawFact(t) {
    if (t < T.fact - 0.1 || t > T.out[1]) return
    const endP = ease.inOutCubic(prog(t, T.end - 0.1, T.end + 0.35))
    const a = 1 - ease.inQuad(prog(t, ...T.out))
    const sk = pop01(t, T.fact, 0.4, 2.2) * a
    const sp = { x: lerp(SUN_P.x, 340, endP), y: lerp(SUN_P.y, 1010, endP), size: lerp(250, 220, endP) }
    const vp = venusPos(t)
    // leash (sags when slack, taut + shaking on the bolt)
    const lk = clamp(prog(t, T.fact + 0.2, T.fact + 0.45)) * (1 - prog(t, T.end - 0.2, T.end + 0.1))
    if (lk > 0) {
      const dx = vp.x - sp.x, dist = Math.abs(dx), taut = clamp((dist - 400) / 200)
      const sag = (1 - taut) * 90 + 10, shake = t > T.bolt[1] - 0.1 && t < T.snap + 0.1 ? 6 * Math.sin(t * 80) : 0
      x.save(); x.globalAlpha = lk * a; x.strokeStyle = PINK; x.lineWidth = 6; x.setLineDash([12, 10]); x.shadowColor = PINK; x.shadowBlur = 12
      x.beginPath(); x.moveTo(sp.x + sp.size * 0.3, sp.y + 10); x.quadraticCurveTo((sp.x + vp.x) / 2, sp.y + sag + shake, vp.x - vp.size * 0.3, vp.y + 10); x.stroke()
      x.restore()
    }
    drawStarChar(x, sp.x, sp.y, sp.size, t, { color: SUN.color, glyph: SUN.glyph, mood: t < T.bolt[1] ? 'happy' : t < T.snap + 0.5 ? 'squint' : t < T.end ? 'neutral' : 'happy', look: t < T.end ? [1, 0] : [1, 0], pop: sk, seed: 21, glow: 1.3, hops: [T.snap, T.yank, T.endAcc + 0.1] })
    drawBurst(x, B_SNAP, vp.x, vp.y, t, T.snap, PINK, 0.6)
    // the strip: −2 … +2 around the Sun's sign, then a forbidden +3
    const stK = pop01(t, T.strip, 0.35, 2.2) * (1 - ease.inQuad(prog(t, ...T.factOut)))
    if (stK > 0.01) {
      STRIP.forEach((s, j) => {
        const k = pop01(t, T.strip + j * 0.06, 0.3, 2.4) * stK
        if (k <= 0.01) return
        const ok = j < 5, isSun = j === 2
        x.save(); x.translate(slotX(j), SLOT_Y); x.scale(k, k)
        x.fillStyle = 'rgba(16,10,36,0.92)'; x.fillRect(-62, -62, 124, 124)
        x.strokeStyle = isSun ? SUNC : ok ? PINK : 'rgba(239,230,214,0.35)'; x.lineWidth = 6; x.strokeRect(-62, -62, 124, 124)
        x.fillStyle = ok ? s.color : 'rgba(239,230,214,0.4)'; x.font = `700 70px ${GLYPH_FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s.glyph + '︎', 0, -4)
        x.font = `700 34px ${MONO}`; x.fillStyle = isSun ? SUNC : ok ? BONE : 'rgba(239,230,214,0.5)'
        x.fillText(isSun ? 'SUN' : (j < 2 ? '−' : '+') + Math.abs(j - 2), 0, 86)
        if (!ok && t > T.yank) { x.strokeStyle = '#ff6a5a'; x.lineWidth = 9; x.beginPath(); x.moveTo(-40, -40); x.lineTo(40, 40); x.moveTo(40, -40); x.lineTo(-40, 40); x.stroke() }
        x.restore()
      })
      // the Venus marker hops +1, +2, strains toward +3, yanked back to +2
      let mj = 2
      if (t > T.hop1) mj = lerp(2, 3, ease.inOutCubic(prog(t, T.hop1, T.hop1 + 0.3)))
      if (t > T.hop2) mj = lerp(3, 4, ease.inOutCubic(prog(t, T.hop2, T.hop2 + 0.3)))
      if (t > T.strain[0]) mj = 4 + 0.45 * ease.outCubic(prog(t, ...T.strain)) * (1 - ease.spring(prog(t, T.yank, T.yank + 0.6), 0.2))
      const hopY = [T.hop1, T.hop2].reduce((acc, h) => acc + Math.sin(Math.PI * prog(t, h, h + 0.3)) * 60, 0)
      if (t > T.hop1 - 0.2) pixelHeart(x, slotX(mj), SLOT_Y - 92 - hopY, 9, PINK, stK)
    }
  }

  function drawVenus(t) {
    if (t < T.venIn) return
    const p = venusPos(t), m = venusMood(t)
    const a = 1 - ease.inQuad(prog(t, ...T.out))
    const k = pop01(t, T.venIn, 0.4, 2.2)
    // hearts orbiting her in the hook
    const ok = clamp(prog(t, T.venIn + 0.2, T.venIn + 0.6)) * (1 - prog(t, T.toCorner[0] - 0.2, T.toCorner[0]))
    if (ok > 0) for (let i = 0; i < 8; i++) {
      const an = t * 1.3 + i * Math.PI / 4, z = Math.sin(an)
      pixelHeart(x, p.x + Math.cos(an) * 230, p.y + z * 70, z > 0 ? 9 : 6, i % 2 ? ROSE : PINK, ok * (z > 0 ? 1 : 0.5))
    }
    drawStarChar(x, p.x, p.y, p.size, t, { color: VEN.color, glyph: VEN.glyph, ...m, blink: m.mood === 'happy' ? undefined : false, hops: VEN_HOPS, pop: k, seed: 7, alpha: a, glow: 1.2 })
    drawBurst(x, B_IN, 540, 960, t, T.venIn, PINK, 0.7)
  }

  // ── the end: heart confetti + Pisces still crying in the corner
  function drawEnd(t) {
    if (t < T.end) return
    const a = 1 - ease.inQuad(prog(t, ...T.out))
    drawBurst(x, B_END, 540, 1000, t, T.endAcc, PINK, 0.9)
    const r = rng(77)
    for (let i = 0; i < 18; i++) {
      const t0 = T.endAcc + r() * 0.6, sx = 120 + r() * 840, sp = 160 + r() * 140, col = [ELEMENT_COLOR.fire, ELEMENT_COLOR.earth, ELEMENT_COLOR.air, ELEMENT_COLOR.water, PINK][i % 5]
      if (t < t0) continue
      const y = 560 + (t - t0) * sp, sway = Math.sin((t - t0) * 3 + i) * 30
      if (y > 1420) continue
      pixelHeart(x, sx + sway, y, 7, col, a * clamp((t - t0) * 4))
    }
    const pk = pop01(t, T.end + 0.4, 0.36, 2.2) * a
    if (pk > 0.01) { const py = 1330 + 160 * (1 - pk); drawStarChar(x, 150, py, 130, t, { color: PIS.color, mood: 'sparkle', look: [1, -1], blink: false, seed: 41, glow: 0.8, alpha: clamp(pk * 2) }); tears(x, 150, py, 130, t, clamp((t - T.end - 0.7) / 0.3) * a, 1) }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H)
      drawSegments(t)
      drawFact(t)
      drawVenus(t)
      drawEnd(t)
      H0.update(t, outK(t, T.h0Out))
      for (const s of segHead) s.h.update(t, outK(t, s.out))
      HF.update(t, outK(t, T.factOut))
      HE.update(t, outK(t, T.out))
      for (const b of boxes) b.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: each element change (headline out → next headline) and the fact / end changes.
const CUTS = [{ t: SEG[1] - 0.04, kind: 'flip' }, { t: SEG[2] - 0.04, kind: 'deal' }, { t: SEG[3] - 0.04, kind: 'flip', dir: -1 }, { t: T.fact - 0.04, kind: 'shuffle' }, { t: T.end - 0.04, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const fbT = n => SEG[0] + n * 0.2778
export const CUES = [
  ...wordPops(T.h0, 4, 0.07, 0), ['pop', T.h0Acc, 1174.66, 0.05, 0], ['pluck', T.h0Acc, 587.33, 0.05, 0.6, 0],
  ['pop', T.venIn, 880, 0.05, 0], ['bell', T.venIn + 0.05, 1318.51, 0.035, 1.2, 0], ['glitter', T.venIn, T.venIn + 0.6],
  ...talkCues(ALL, { cps: CPS }),
  ['whoosh', T.toCorner[0], 0.45, 0.03],
  ...SEG.flatMap((s, i) => [...wordPops(s + 0.04, 2, 0.07, i, 0.025), ['pop', r3(s + 0.5), NOTE[(i + 3) % 7], 0.05, 0], ['pluck', r3(s + 0.5), [587.33, 659.25, 739.99, 880][i], 0.045, 0.6, 0]]),
  ...[[0.6, 0, -0.4], [1.4, 0, 0.4], [3, 1, 0], [5, 0, -0.4], [5.6, 0, 0.4]].flatMap(([n, heart, pan]) => { const tl = fbT(n); return [['whoosh', r3(tl), 0.42, 0.025], ['pop', r3(tl + 0.42), heart ? 587.33 : 1318.51, heart ? 0.06 : 0.045, pan], ['glitter', r3(tl + 0.45), r3(tl + (heart ? 1.4 : 0.9))]] }),
  ['whoosh', SEG[0] + 1.2, 1.6, 0.015],
  ['whoosh', SEG[1] + 0.35, 0.3, 0.03], ['boom', SEG[1] + 0.85, 0.08], ['pop', SEG[1] + 1.4, 1174.66, 0.04, -0.4], ['pop', SEG[1] + 2.1, 880, 0.04, 0.4],
  ...Array.from({ length: 7 }, (_, d) => ['tick', r3(SEG[1] + 2.2 + d * 0.11), 0.03]),
  ['pop', SEG[2] + 0.4, 987.77, 0.04, -0.4], ['pop', SEG[2] + 1.2, 1174.66, 0.04, 0.4], ['bell', SEG[2] + 2.0, 1567.98, 0.03, 1.0, 0],
  ['riser', SEG[3] + 0.4, SEG[3] + 2.6, 0.03], ['whoosh', SEG[3] + 1.6, 0.5, 0.03], ['whoosh', SEG[3] + 2.6, 0.5, 0.03],
  ...wordPops(T.fact + 0.04, 3, 0.07, 2, 0.025), ['pop', T.fact + 0.55, 1174.66, 0.05, 0], ['pop', T.fact, 659.25, 0.04, 0],
  ['whoosh', T.bolt[0], 0.45, 0.04], ['pop', T.snap, 440, 0.06, 0.3], ['pluck', T.snap, 293.66, 0.05, 0.5, 0], ['tick', T.snap, 0.06],
  ['pop', T.strip, 880, 0.035, 0], ['pop', T.hop1, 1174.66, 0.035, 0.1], ['pop', T.hop2, 1318.51, 0.035, 0.2], ['riser', T.strain[0], T.strain[1], 0.03],
  ['pop', T.yank, 392, 0.05, 0], ['tick', T.yank, 0.05],
  ...wordPops(T.end + 0.04, 3, 0.07, 1, 0.025), ['pop', T.endAcc, 1318.51, 0.06, 0], ['bell', T.endAcc, 1760, 0.04, 1.6, 0], ['glitter', T.endAcc, T.endAcc + 0.9],
  ['pop', T.end + 0.5, 783.99, 0.03, -0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
