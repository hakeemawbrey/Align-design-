// srhtxonesky (30 s vertical, Star Talk Remix of htxonesky "Every culture. One city.") · story 0–25.6, then the shared
// end card. THE STARS (a big gold star over the Houston skyline) wake up to a crowd saying hello in seven languages.
//   0.00–6.20  "Every *culture.* | Every language. | One city."  a crowd pops in, each with a hello bubble (Hola, 你好,
//              Hello, नमस्ते, Salut, Xin chào, أهلاً); the skyline springs up on the drop (2.82). The big star blinks
//              awake. Box: "psst. Houston. we hear *all* of you."
//   6.45       "And one *sky* | over all of it."  the bubbles float up and pop into little sign-tinted stars, who blink
//              awake around the big one. Box: "hola. nǐ hǎo. namaste. xin ch… *hi.*" (it tries; the little stars giggle;
//              ♓ the Pisces one cries)
//  11.44 cut → "Everyone has | their own *chart.*"  each little star drops back to hover over its person, glyph badge on.
//              Box: "different hellos. same *twelve* signs."
//  15.20      "Align matches you | by the stars you | were *born under.*"  the Cancer and Pisces stars across the crowd go
//              heart-eyed; a gold arc launches from one and lands on the other. Box: "we read both charts. these two *fit.*"
//  20.18 cut → "Your person is | under the | *same sky.*"  the crowd sinks; the pair rises up beside the big star, linked
//              in gold; the big star winks. Box: "look up. they're under *this* one too."  Out by 25.45.
// One canvas (sky + city + stars), DOM type + two dialogue boxes above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { BONE, GOLD, PINK, BLUE, ROSE, VIOLET, LAV, AMBER, MINT, INTER, MONO, rgba, ink, sparkle, orb, person, starFrame, inSprite, tearsCells } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const hop = (t, a, h = 1, d = 0.45) => t > a && t < a + d ? h * Math.sin(Math.PI * (t - a) / d) : 0

// ── the timeline
const T = {
  h0: 0.12, h0Late: BEAT(4) - 0.2, drop: BEAT(4), h0Out: 6.2, wake: [1.2, 1.6], bigIn: 0.5, open1: 3.1,
  h1: 6.45, lift0: 6.9, liftGap: 0.2, liftDur: 1.2, giggle: 9.7, cry: [9.35, 11.1], h1Out: 11.25, close1: 11.35,
  cut1: 11.44,
  h2: 11.5, h2Late: BEAT(20), drop0: 11.6, dropGap: 0.12, dropDur: 0.55, open2: 12.2, h2Out: 15.0,
  h3: 15.2, h3Late: BEAT(28), heart: 15.9, arc: [BEAT(29.5), BEAT(31)], h3Out: 19.95, close2: 19.9,
  cut2: 20.18,
  h4: 20.25, h4Late: BEAT(37), sink: [20.0, 21.6], rise: [20.3, 21.9], open3: 21.6, wink: [23.8, 24.4], close3: 25.2, h4Out: 25.05,
  out: [25.0, 25.45],
}
const SPEAK = 'THE STARS'
const CPS = 30
const LINES1 = [
  { t: 3.3, speaker: SPEAK, text: 'psst. Houston. we hear *all* of you.' },
  { t: 7.7, speaker: SPEAK, text: 'hola. nǐ hǎo. namaste. xin ch… *hi.*' },
]
const LINES2 = [
  { t: 12.4, speaker: SPEAK, text: 'different hellos. same *twelve* signs.' },
  { t: 15.7, speaker: SPEAK, text: 'we read both charts. these two *fit.*' },
]
const LINES3 = [{ t: 21.8, speaker: SPEAK, text: "look up. they're under *this* one too." }]
const BIG_HOPS = [T.wake[1] + 0.1, ...[LINES1, LINES2, LINES3].flatMap(L => talkHops(L, SPEAK, { cps: CPS })), T.arc[1] + 0.05]

// ── the crowd
const GY = 1400                         // ground line
const FS = 0.68                         // front-row scale (≈185 px tall)
const HEADY = GY - 270 * FS             // top of the heads
const LAT = `800 50px ${INTER}`
const GREET = [
  { text: 'Hola', font: LAT, body: AMBER },
  { text: '你好', sub: 'NI HAO', font: "700 56px 'WenQuanYi Zen Hei', sans-serif", body: BLUE },
  { text: 'Hello', font: LAT, body: PINK },
  { text: 'नमस्ते', sub: 'NAMASTE', font: "bold 56px FreeSans, sans-serif", body: MINT },
  { text: 'Salut', font: LAT, body: GOLD },
  { text: 'Xin chào', font: LAT, body: LAV },
  { text: 'أهلاً', sub: 'AHLAN', font: "bold 52px 'DejaVu Sans', sans-serif", body: ROSE },
]
const SIGN_OF = [0, 3, 4, 6, 9, 11, 2]          // Aries, Cancer, Leo, Libra, Capricorn, Pisces, Gemini
const FRONT = GREET.map((g, i) => ({ ...g, i, x: 140 + i * 133.3, sign: SIGN_OF[i], row: i % 2,
  tIn: 0.15 + [3, 1, 5, 0, 4, 2, 6][i] * 0.065, tB: 0.95 + i * 0.278 }))
const PAIR = [1, 5]                              // Cancer ↔ Pisces (a water trine)
const PIS = 5
const BACK = [AMBER, LAV, MINT, PINK, BLUE, GOLD].map((c, i) => ({ x: 207 + i * 133.3, body: c, tIn: BEAT(5) + [2, 0, 4, 1, 5, 3][i] * 0.14 }))
const BUB_Y = [1105, 965]
const BIG = { x: 540, y: 655, size: 210 }
// where each little star settles around the big one
const SKYP = [[150, 820], [290, 690], [420, 900], [665, 905], [790, 690], [930, 820], [540, 1010]]
const HOVER = i => HEADY - 75 - (i % 2 ? 70 : 0)  // over each head after the drop (odd ones a row higher)
const LIT = 112                                   // little star size
const liftT = i => T.lift0 + i * T.liftGap
const landT = i => liftT(i) + T.liftDur
const dropT = i => T.drop0 + i * T.dropGap
const RISE = [[330, 880], [750, 880]]            // where the pair ends up (beside the big star, under it)

const TOWERS = (() => {
  const r = rng(41), out = []
  let px = 40
  while (px < 1040) {
    const mid = 1 - Math.min(1, Math.abs(px - 560) / 520)
    const w = 50 + r() * 62, h = 90 + r() * 80 + mid * (80 + r() * 170)
    out.push({ x: px, w, h, top: ['flat', 'spire', 'slant', 'step', 'flat', 'dome'][Math.floor(r() * 6)], seed: r() * 100, d: Math.abs(px + w / 2 - 540) })
    px += w + 4 + r() * 14
  }
  const maxD = Math.max(...out.map(b => b.d))
  out.forEach(b => { b.tIn = T.drop + 0.05 + (b.d / maxD) * 0.55 })
  return out
})()
function towerPath(x, b, h) {
  const l = b.x, r = b.x + b.w, y = -h, m = b.x + b.w / 2
  x.beginPath(); x.moveTo(l, 0)
  switch (b.top) {
    case 'spire': x.lineTo(l, y + 18); x.lineTo(m - 6, y + 8); x.lineTo(m, y - 40); x.lineTo(m + 6, y + 8); x.lineTo(r, y + 18); break
    case 'slant': x.lineTo(l, y + 30); x.lineTo(r, y); break
    case 'step': x.lineTo(l, y + 28); x.lineTo(l + b.w * 0.25, y + 28); x.lineTo(l + b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y); x.lineTo(r - b.w * 0.25, y + 28); x.lineTo(r, y + 28); break
    case 'dome': x.lineTo(l, y + b.w / 2); x.arc(m, y + b.w / 2, b.w / 2, Math.PI, 0); break
    default: x.lineTo(l, y); x.lineTo(r, y)
  }
  x.lineTo(r, 0); x.closePath()
}

function bigState(t) {
  if (t < T.wake[0]) return { mood: 'sleepy' }
  if (t < T.wake[1]) return { mood: 'neutral', blink: 1 - prog(t, T.wake[0], T.wake[1]) }
  if (t < T.open1) return { mood: 'wide', look: [0, 1], blink: false }
  if (t < LINES1[1].t) return { mood: 'happy' }
  if (t < T.giggle - 0.3) return { mood: 'squint', look: [0, 0] }
  if (t < T.cut1) return { mood: 'happy' }
  if (t < T.heart) return { mood: 'sparkle', look: [0, 1] }
  if (t < T.cut2) return { mood: 'sparkle', look: [0, 1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink' }
  return { mood: 'happy' }
}
function littleState(i, t) {
  const land = landT(i)
  if (t < land + 0.25) return { mood: 'sleepy' }
  if (t < land + 0.55) return { mood: 'wide', blink: false }
  if (i === PIS && t >= T.cry[0] && t < T.cry[1]) return { mood: 'squint', tears: 3 }
  if (t >= T.giggle && t < T.cut1) return { mood: 'happy', tears: i === PIS ? 1 : 0 }
  if (t < T.cut1) return { mood: 'neutral', look: [lerp(-1, 1, (SKYP[i][0] < 540) ? 1 : 0), -1] }
  if (PAIR.includes(i) && t >= T.heart) return { mood: 'heart', tears: i === PIS && t > T.arc[1] ? 2 : 0 }
  if (t >= T.h3 && t < T.cut2) return { mood: 'neutral', look: [i < 3 ? 1 : -1, 0] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 50px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 23px 'Space Mono'",
      "700 54px 'WenQuanYi Zen Hei'", "bold 54px FreeSans", "bold 52px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Every *culture.* | Every language. | One city.', { top: 120, size: 96, accentSize: 140, at: T.h0, gap: 0.12, late: 2, lateAt: T.h0Late, lateGap: 0.2, wobble: true, accentColor: GOLD, lineHeight: 1.04 })
  const H1 = popText(root, 'And one *sky* | over all of it.', { top: 140, size: 108, accentSize: 176, at: T.h1, gap: 0.12, wobble: true, accentColor: BLUE, lineHeight: 0.98 })
  const H2 = popText(root, 'Everyone has | their own *chart.*', { top: 140, size: 108, accentSize: 168, at: T.h2, gap: 0.09, late: 1, lateAt: T.h2Late, wobble: true, accentColor: LAV, lineHeight: 1.0 })
  const H3 = popText(root, 'Align matches you | by the stars you | were *born* *under.*', { top: 120, size: 84, accentSize: 128, at: T.h3, gap: 0.08, late: 2, lateAt: T.h3Late, lateGap: 0.14, wobble: true, accentColor: GOLD, lineHeight: 1.06 })
  const H4 = popText(root, 'Your person is | under the | *same* *sky.*', { top: 120, size: 96, accentSize: 156, at: T.h4, gap: 0.08, late: 2, lateAt: T.h4Late, lateGap: 0.14, wobble: true, accentColor: PINK, lineHeight: 1.0 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box1 = dialogueBox(root, { lines: LINES1, y: 1470, width: 960, height: 290, open: T.open1, close: T.close1, cps: CPS })
  const box2 = dialogueBox(root, { lines: LINES2, y: 1470, width: 960, height: 290, open: T.open2, close: T.close2, cps: CPS })
  const box3 = dialogueBox(root, { lines: LINES3, y: 1470, width: 960, height: 290, open: T.open3, close: T.close3, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const sinkY = t => 520 * ease.inOutCubic(prog(t, ...T.sink))
  const crowdA = t => 1 - ease.inQuad(prog(t, T.sink[0] + 0.3, T.sink[1]))
  const bounce = (t, i) => {
    if (t < T.drop || t > T.sink[0]) return 0
    const n = Math.floor((t - 0.6) / 0.5556)
    if ((n + i) % 2) return 0
    const amp = t < T.h1 ? 18 : t < T.h2 ? 8 : 6
    return hop(t, 0.6 + n * 0.5556, amp, 0.36)
  }

  function drawCity(t, oy, a) {
    if (a <= 0) return
    x.save(); x.translate(0, oy); x.globalAlpha = a
    for (const b of TOWERS) {
      const k = easeOutBack(prog(t, b.tIn, b.tIn + 0.4), 2.0)
      if (k <= 0) continue
      x.save(); x.translate(0, GY)
      towerPath(x, b, b.h * k)
      x.fillStyle = 'rgba(22,15,52,0.94)'; x.fill()
      x.lineJoin = 'round'; x.shadowColor = VIOLET; x.shadowBlur = 12; x.strokeStyle = rgba(VIOLET, 0.8); x.lineWidth = 4; x.stroke(); x.shadowBlur = 0
      const cols = Math.max(1, Math.floor((b.w - 16) / 18)), rows = Math.floor((b.h * k - 40) / 26)
      for (let rr = 0; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) {
        const sd = b.seed + rr * 7.1 + cc * 3.3
        if (noise1(sd, 2) < 0.48) continue
        const tw = 0.5 + 0.5 * noise1(t * 0.7 + sd, sd)
        x.fillStyle = rgba(noise1(sd, 5) > 0.75 ? BLUE : '#ffd98a', 0.25 + 0.5 * tw)
        x.fillRect(b.x + 10 + cc * 18, -24 - rr * 26 - 10, 8, 10)
      }
      x.restore()
    }
    const gp = ease.outCubic(prog(t, 0.05, 0.6))
    const gr = x.createLinearGradient(0, GY, 0, H)
    gr.addColorStop(0, 'rgba(12,8,30,0.96)'); gr.addColorStop(1, 'rgba(5,4,12,1)')
    x.fillStyle = gr; x.fillRect(0, GY, W, H - GY + 700)
    x.beginPath(); x.moveTo(W / 2 - 520 * gp, GY); x.lineTo(W / 2 + 520 * gp, GY)
    ink(x, LAV, { w: 5, fa: 0, glow: 18 })
    x.restore()
  }

  function drawPeople(t, oy, a) {
    if (a <= 0) return
    x.save(); x.translate(0, oy); x.globalAlpha = a
    for (const b of BACK) {
      const k = pop01(t, b.tIn, 0.4, 2.2)
      person(x, b.x, GY - 50 - bounce(t, 1) * 0.6, FS * 0.8 * k, { body: b.body, a: 0.55 * clamp(k * 2) })
    }
    for (const p of FRONT) {
      const k = pop01(t, p.tIn, 0.4, 2.2)
      const sq = 1 + 0.06 * Math.sin(Math.PI * clamp((t - p.tB) / 0.3)) * (t > p.tB ? 1 : 0)
      const lit = PAIR.includes(p.i) && t > T.arc[1] ? 1 : 0
      person(x, p.x, GY - bounce(t, p.i), FS * k, { body: p.body, a: clamp(k * 2), sq, line: lit ? GOLD : BONE })
    }
    x.restore()
  }

  function bubble(p, t) {
    const k0 = pop01(t, p.tB, 0.4, 2.6)
    if (k0 <= 0) return
    const u = prog(t, liftT(p.i), landT(p.i))
    if (u >= 1) return
    x.save()
    x.font = p.font
    const tw = x.measureText(p.text).width
    const bw = Math.max(tw + 50, p.sub ? 160 : 0), bh = p.sub ? 116 : 86
    const hx = p.x, hy = HEADY - 4
    const cx = clamp(p.x, 40 + bw / 2, W - 40 - bw / 2)
    const cy = BUB_Y[p.row] + 6 * Math.sin(t * 2.2 + p.i * 1.3) - bounce(t, p.i) * 0.6
    const ue = ease.inOutCubic(u), [sx, sy] = SKYP[p.i]
    const px = lerp(cx, sx, ue) + Math.sin(ue * Math.PI) * (p.i % 2 ? 60 : -60), py = lerp(cy, sy, ue)
    const sc = k0 * (1 - 0.85 * ease.inQuad(clamp(u / 0.8)))
    const rot = (t > p.tB ? 0.12 * Math.sin((t - p.tB) * 12) * Math.exp(-(t - p.tB) * 3.5) : 0) + (p.i % 2 ? 0.1 : -0.1) * Math.sin(ue * Math.PI)
    const a = 1 - clamp((u - 0.55) / 0.35)
    if (a > 0) {
      x.globalAlpha = a
      x.save(); x.translate(px, py); x.rotate(rot); x.scale(sc, sc)
      const tk = 1 - clamp(u * 4)
      const thx = (hx - cx) * 0.55, thy = bh / 2 + (hy - cy - bh / 2) * 0.55 * tk + 12
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 28)
      if (tk > 0) { x.moveTo(-16, bh / 2 - 2); x.lineTo(thx, thy); x.lineTo(16, bh / 2 - 2) }
      x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()
      ink(x, p.body, { w: 6, fa: 0, glow: 18 })
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 28); x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill()
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, 28); ink(x, p.body, { w: 6, fa: 0.12, glow: 0 })
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = p.font; x.fillText(p.text, 0, p.sub ? -14 : 3)
      if (p.sub) { x.font = `700 21px ${MONO}`; x.fillStyle = rgba(p.body, 0.95); x.fillText(p.sub, 0, 36) }
      x.restore()
    }
    if (u > 0.05 && u < 0.95) {
      for (let k = 1; k < 6; k++) {
        const uu = ease.inOutCubic(Math.max(0, u - k * 0.04))
        const tx = lerp(cx, sx, uu) + Math.sin(uu * Math.PI) * (p.i % 2 ? 60 : -60), ty = lerp(cy, sy, uu)
        x.globalAlpha = (1 - k / 6) * 0.8
        drawPixelStar(x, tx + Math.sin(k * 2.3) * 8, ty + 14 + k * 4, 16 - k * 2, k % 3, k % 2 ? p.body : '#fff3e0')
      }
    }
    x.restore()
  }

  // the little star a bubble becomes: in the sky → drops over its person's head → (the pair) rises beside the big star
  function littlePos(i, t) {
    const [sx, sy] = SKYP[i], p = FRONT[i]
    const d = ease.inOutCubic(prog(t, dropT(i), dropT(i) + T.dropDur))
    let px = lerp(sx, p.x, d), py = lerp(sy, HOVER(i), d) - Math.sin(Math.PI * d) * 60
    let size = LIT
    if (t >= T.sink[0]) {
      const k = PAIR.indexOf(i)
      if (k >= 0) {
        const e = ease.inOutCubic(prog(t, ...T.rise))
        px = lerp(px, RISE[k][0], e); py = lerp(py + sinkY(t) * 0, RISE[k][1], e); size = lerp(LIT, 150, e)
      } else py += sinkY(t)
    }
    return { x: px, y: py, size }
  }
  function drawLittle(t, ok) {
    for (const p of FRONT) {
      const land = landT(p.i)
      if (t < land - 0.55) continue
      const pp = easeOutBack(prog(t, land - 0.55, land), 2.4)
      const a = (PAIR.includes(p.i) ? 1 : crowdA(t)) * ok
      if (a <= 0.01) continue
      const P = littlePos(p.i, t), st = littleState(p.i, t)
      const S = SIGNS[p.sign]
      const hops = [land + 0.3, T.giggle + (p.i % 3) * 0.08, T.giggle + 0.55 + (p.i % 2) * 0.1, dropT(p.i) + T.dropDur, T.arc[1] + 0.05 + (p.i === PIS ? 0.15 : 0)]
      const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
      const glyph = t > dropT(p.i) + T.dropDur * 0.8 ? S.glyph : null
      const opts = { hops, seed: 11 + p.i, pop: pp, squash: sob }
      x.save(); x.globalAlpha = a
      drawStarChar(x, P.x, P.y, P.size, t, { color: S.color, glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, ...opts })
      if (st.tears) inSprite(x, starFrame(P.x, P.y, P.size, t, opts), () => tearsCells(x, t, st.tears))
      x.restore()
      sparkle(x, SKYP[p.i][0], SKYP[p.i][1], t, land - 0.1, { n: 8, R: 90, seed: 20 + p.i, size: 20, dur: 0.6 })
    }
  }

  // the gold arc: Cancer → Pisces, over the crowd, then the link when they've risen
  function drawArc(t, ok) {
    const p = ease.inOutCubic(prog(t, ...T.arc))
    if (p <= 0) return
    const A = littlePos(PAIR[0], t), B = littlePos(PAIR[1], t)
    const lift = lerp(330, 40, ease.inOutCubic(prog(t, ...T.rise)))
    const mx = (A.x + B.x) / 2, my = Math.min(A.y, B.y) - lift
    const at = u => [(1 - u) ** 2 * A.x + 2 * (1 - u) * u * mx + u * u * B.x, (1 - u) ** 2 * A.y + 2 * (1 - u) * u * my + u * u * B.y]
    x.save(); x.globalAlpha = ok
    x.beginPath(); const N = 40
    for (let k = 0; k <= N * p; k++) { const [qx, qy] = at(k / N); k ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
    ink(x, GOLD, { w: 8, fa: 0, glow: 28 })
    if (p < 1) { const [hx, hy] = at(p); orb(x, hx, hy, 12, GOLD, 1, 4) }
    else for (let k = 0; k < 2; k++) { const u = ((t - T.arc[1]) * 0.6 + k * 0.5) % 1, [qx, qy] = at(u); orb(x, qx, qy, 7, '#fff3e0', 0.9, 4) }
    x.restore()
    sparkle(x, B.x, B.y, t, T.arc[1], { n: 18, R: 220, seed: 70, size: 28, cols: [GOLD, '#fff3e0', PINK, LAV] })
  }

  function drawBig(t, ok) {
    const pp = pop01(t, T.bigIn, 0.5, 1.8) * ok
    if (pp <= 0.02) return
    const st = bigState(t)
    let squash = 0
    if (t >= T.wake[1] && t < T.wake[1] + 0.5) squash = 0.18 * Math.exp(-(t - T.wake[1]) * 7) * Math.cos((t - T.wake[1]) * 20)
    drawStarChar(x, BIG.x, BIG.y, BIG.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.15, hops: BIG_HOPS, seed: 3, pop: pp, squash })
    // a little "?" pops as it fumbles the hellos
    const q = clamp(prog(t, 8.75, 8.95)) * (1 - clamp(prog(t, T.giggle - 0.3, T.giggle - 0.1)))
    if (q > 0) { x.save(); x.globalAlpha = q * ok; x.fillStyle = BONE; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.shadowColor = GOLD; x.shadowBlur = 16; x.fillText('?', BIG.x + 135, BIG.y - 95 + 6 * Math.sin(t * 6)); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = 1 - ease.inQuad(prog(t, ...T.out))
      const oy = sinkY(t), ca = crowdA(t)
      drawCity(t, oy, ca)
      drawPeople(t, oy, ca)
      drawBig(t, ok)
      for (const p of FRONT) bubble(p, t)
      drawArc(t, ok)
      drawLittle(t, ok)
      box1.update(t); box2.update(t); box3.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 6.38 (hook → "And one sky"), 11.44 (→ "Everyone has their own chart."), 15.06 (→ "Align matches
// you…"), 20.18 (→ "Your person is under the same sky."); cardfx keeps 11.44 and 20.18.
const CUTS = [6.38, { t: T.cut1, kind: 'flip' }, 15.06, { t: T.cut2, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX in the films' D-major palette; the engine re-keys pop/pluck/bell into C)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.14, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.028) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', r3(t + i * 0.16), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const PITCH = { pitch: { [SPEAK]: 660 } }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  // hook: the crowd, the hellos, the skyline, the big star wakes
  ...wordPops(T.h0, 4, 0.12), ['pop', T.h0Late, 1174.66, 0.05, -0.1], ['pop', r3(T.h0Late + 0.2), 1318.51, 0.055, 0.1], ['pluck', r3(T.h0Late + 0.2), 1174.66, 0.045, 0.6, 0],
  ...FRONT.map(p => ['pop', r3(p.tIn), NOTE[p.i % 7], 0.02, (p.x - 540) / 600]),
  ...FRONT.map(p => ['pluck', r3(p.tB), NOTE[(p.i * 2) % 7], 0.04, 0.4, (p.x - 540) / 600]),
  ['whoosh', T.wake[0], 0.4, 0.02], ['bell', T.wake[1], 1318.51, 0.03, 1.0, 0], ['pop', T.wake[1] + 0.1, 987.77, 0.04, 0],
  ['whoosh', T.drop - 0.1, 0.5, 0.04], ['glitter', T.drop, T.drop + 0.9], ['boom', T.drop, 0.1],
  ['pop', T.open1, 739.99, 0.04, 0], ['pop', r3(T.open1 + 0.06), 987.77, 0.03, 0],
  ...talkCues(LINES1, { cps: CPS, ...PITCH }), ...talkCues(LINES2, { cps: CPS, ...PITCH }), ...talkCues(LINES3, { cps: CPS, ...PITCH }),
  // one sky: bubbles lift into little stars
  ...wordPops(T.h1, 7, 0.12, 1, 0.024),
  ...FRONT.flatMap(p => [['whoosh', r3(liftT(p.i)), 0.6, 0.02], ['bell', r3(landT(p.i) - 0.05), NOTE[(p.i + 3) % 7] * 2, 0.025, 0.8, (SKYP[p.i][0] - 540) / 600], ['pop', r3(landT(p.i) + 0.3), NOTE[(p.i + 1) % 7] * 1.5, 0.03, (SKYP[p.i][0] - 540) / 600]]),
  ['pop', 9.5, 440, 0.04, 0.3],
  ...[0, 1, 2, 3, 4].map(k => ['pop', r3(T.giggle + k * 0.1), NOTE[(k * 2) % 7] * 2, 0.025, (k - 2) * 0.3]),
  ...sob(T.cry[0], 1320), ...sob(T.cry[0] + 0.7, 1250),
  // charts
  ...wordPops(T.h2, 4, 0.09, 2), ['pop', T.h2Late, 1318.51, 0.05, 0], ['pluck', T.h2Late, 1174.66, 0.04, 0.6, 0],
  ...FRONT.map(p => ['pop', r3(dropT(p.i) + T.dropDur), NOTE[(p.i + 2) % 7], 0.035, (p.x - 540) / 600]),
  ['pop', T.open2, 739.99, 0.04, 0],
  // the match
  ...wordPops(T.h3, 7, 0.08, 0, 0.022), ['pop', T.h3Late, 1174.66, 0.05, -0.1], ['pop', r3(T.h3Late + 0.14), 1318.51, 0.055, 0.1],
  ['bell', T.heart, 1760, 0.03, 1.0, -0.3], ['bell', r3(T.heart + 0.1), 2093, 0.03, 1.0, 0.3],
  ['riser', T.arc[0] - 0.2, T.arc[1], 0.03], ['whoosh', T.arc[0], 0.8, 0.03],
  ['bell', T.arc[1], 1760, 0.05, 1.4, 0.2], ['bell', r3(T.arc[1] + 0.03), 2349.32, 0.035, 1.4, 0.3], ['glitter', T.arc[1], T.arc[1] + 0.9],
  ...sob(T.arc[1] + 0.4, 1568), ['pop', T.close2, 880, 0.03, 0],
  // same sky
  ['whoosh', T.sink[0], 0.9, 0.03], ['riser', T.rise[0], T.rise[1], 0.025],
  ...wordPops(T.h4, 4, 0.08, 1), ['pop', T.h4Late, 1318.51, 0.055, 0], ['pop', r3(T.h4Late + 0.14), 1567.98, 0.045, 0.1], ['pluck', r3(T.h4Late + 0.14), 1174.66, 0.045, 0.6, 0],
  ['pop', T.open3, 739.99, 0.04, 0],
  ['pluck', T.wink[0], 1318.51, 0.04, 0.5, 0], ['bell', T.wink[0] + 0.05, 1760, 0.022, 1.0, 0],
  ['pop', T.close3, 880, 0.03, 0], ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
