// srtorworld (20 s vertical, Star Talk Remix of torworld "Everyone's from somewhere") · story 0–15.6, then the shared
// end card ("come" + the logo + the default CTA).
//   0.00–4.20  HOOK  "In Toronto, | everyone's from | *somewhere.*"  A crowd of sign stars on the lakeshore; each says
//              hello in a bubble (Hello, Bonjour, 你好, வணக்கம், Kamusta, ਸਤ ਸ੍ਰੀ ਅਕਾਲ, أهلاً — the non-Latin ones carry a
//              small romanisation). ♓ Pisces is already crying at how nice everyone is. On the drop (2.82) a generic
//              skyline springs up across the lake and a back row joins (Olá, Ciao, 안녕, Hola, Wagwan).
//              THE STARS, floating above, tries to greet everyone back, spinning to each: "hi! bonjour! hola! ciao!
//              olá! *wagwan!*"
//   4.30–12.20 "Your person could be | from *anywhere.*"  THE STARS, out of breath (6.0): "...we're stars. we're from
//              *everywhere.*"  Every bubble floats up and becomes a star (7.0). Two stars in the crowd flare, ♋ Cancer
//              and ♓ Pisces, far apart; their birth charts bloom and a gold arc links them (8.93). THE STARS:
//              "cancer + pisces: a *trine.* easy flow." Pisces sobs harder.
//  12.30 cut → "Find them under | *one sky.*"  The two stars rise into the sky, gold-linked and heart-eyed, and every
//              greeting star joins one constellation over the skyline. Out by 15.45.
// One canvas (sky + world + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import {
  BONE, GOLD, PINK, CYAN, NIGHT, VIOLET, INTER, MONO, TAU, BEAT, r3,
  rgba, pop01, outK, popOut, glowStroke, popText, drawBits, makeBurst, drawBurst, drawTears, floatHearts, DROP, DROP_C,
} from '../../srtorpatio/scenes/props.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const LAV = '#c9a6ff', AMBER = '#ffb86b', MINT = '#7fe0b0', ROSE = '#f59cc4'
const DROPT = BEAT(4)                          // 2.822

// ── the timeline
const T = {
  black: [0, 0.3], h0: 0.12, h0Late: DROPT, sky: [DROPT - 0.04, DROPT + 0.5], h0Out: [4.05, 4.22],
  narr: 1.6, boxA: 3.12, l1: 3.3, h1: 4.3, h1Late: 4.85, puff: [5.9, 6.6], l2: 6.5,
  lift0: 7.0, liftGap: 0.07, liftDur: 1.0, flare: 8.2, chart: [8.35, 8.85], arc: [BEAT(15), BEAT(16)], l3: 9.5, sob: [9.1, 12.0],
  boxAClose: 12.12, h1Out: [12.02, 12.2],
  cut: 12.3,
  h2: 12.36, h2Late: 12.8, rise: [12.3, 12.9], net: [12.7, 13.6], out: [15.05, 15.45],
}
const SPK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPK, text: 'hi! bonjour! hola! ciao! olá! *wagwan!*' },
  { t: T.l2, speaker: SPK, text: "...we're stars. we're from *everywhere.*" },
  { t: T.l3, speaker: SPK, text: 'cancer + pisces: a *trine.* easy flow.' },
]
const CPS = 30
const N_HOPS = talkHops(LINES, SPK, { cps: CPS, gap: 0.3 })

// ── the crowd
const LAT = `800 44px ${INTER}`
const GREET = [
  { text: 'Hello', font: LAT, body: PINK },
  { text: 'Bonjour', font: LAT, body: CYAN },
  { text: '你好', sub: 'NI HAO', font: "700 50px 'WenQuanYi Zen Hei', sans-serif", body: AMBER },
  { text: 'வணக்கம்', sub: 'VANAKKAM', font: "bold 40px FreeSans, sans-serif", body: MINT },
  { text: 'Kamusta', font: LAT, body: GOLD },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', sub: 'SAT SRI AKAL', font: "bold 40px FreeSans, sans-serif", body: LAV },
  { text: 'أهلاً', sub: 'AHLAN', font: "bold 50px 'DejaVu Sans', sans-serif", body: ROSE },
]
const FRONT_SIGNS = ['aries', 'cancer', 'leo', 'libra', 'capricorn', 'pisces', 'gemini']
const FRONT = GREET.map((g, i) => ({ ...g, i, x: 140 + i * 133.3, y: 1395, size: 124, sign: FRONT_SIGNS[i], row: i % 2, tIn: 0.12 + [3, 1, 5, 0, 4, 2, 6][i] * 0.05, tB: 0.45 + i * 0.27 }))
const BUB_Y = [1268, 1148]
const CHAT = ['Olá', 'Ciao', '안녕', 'Hola', 'Wagwan']
const BACK_SIGNS = ['taurus', 'virgo', 'scorpio', 'sagittarius', 'aquarius']
const BACK = CHAT.map((c, i) => ({ i, x: 207 + i * 166, y: 1282, size: 96, sign: BACK_SIGNS[i], body: [AMBER, LAV, MINT, PINK, CYAN][i], text: c,
  tIn: DROPT + [2, 0, 4, 1, 3][i] * 0.07, tB: DROPT + 0.12 + [1, 4, 0, 3, 2][i] * 0.1, by: i % 2 ? 1040 : 968 }))
const CHAT_FONT = `800 34px ${INTER}, 'WenQuanYi Zen Hei', sans-serif`
const PAIR = [1, 5]                              // Cancer ↔ Pisces (a water trine), far apart in the crowd
const NARR = { x: 540, y: 735, size: 230 }
const LAKE = 1185, SHORE = 1450
// where each greeting goes when it becomes a star (12 of them), and the constellation they make at the end
const TARGETS = (() => {
  const r = rng(17)
  const pts = [[110, 620], [250, 560], [420, 600], [640, 580], [820, 540], [970, 640], [160, 830], [330, 760], [760, 760], [930, 860], [470, 900], [620, 880]]
  return pts.map(([px, py]) => ({ x: px + (r() - 0.5) * 30, y: py + (r() - 0.5) * 30 }))
})()
const NET = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 9], [9, 8], [8, 11], [11, 10], [10, 7], [7, 6], [6, 0], [7, 2], [8, 4]]
const PAIR_END = [{ x: 300, y: 1320 }, { x: 780, y: 1320 }]
const SKYL = (() => {
  const r = rng(52), out = []
  let xx = -20
  while (xx < W + 20) { const w = 70 + r() * 80, h = 110 + r() * 190; const b = { x: xx, w, h, win: [], d: r() * 0.4 }; for (let j = 0; j < Math.floor((h - 30) / 30); j++) for (let i = 0; i < Math.max(2, Math.floor((w - 18) / 22)); i++) if (r() > 0.45) b.win.push([xx + 14 + i * 22, LAKE - 26 - j * 30, r() < 0.75 ? '#ffd98a' : PINK]); out.push(b); xx += w * (0.82 + r() * 0.2) }
  return out
})()
const NEEDLE_X = 790

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 22px 'Space Mono'", "800 44px Inter", "800 34px Inter",
      "700 50px 'WenQuanYi Zen Hei'", "bold 40px FreeSans", "bold 50px 'DejaVu Sans'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'In Toronto, | everyone’s from | *somewhere.*', { top: 150, size: 108, accentSize: 170, accentColor: GOLD, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Late, wobble: true })
  const H1 = popText(root, 'Your person | could be from | *anywhere.*', { top: 150, size: 104, accentSize: 160, accentColor: PINK, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Late, wobble: true })
  const H2 = popText(root, 'Find them under | *one sky.*', { top: 160, size: 108, accentSize: 190, accentColor: GOLD, at: T.h2, gap: 0.09, late: 2, lateAt: T.h2Late, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1600, width: 960, height: 270, open: T.boxA, close: T.boxAClose, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_NARR = makeBurst(31, 10, 200), B_C = makeBurst(32, 12, 170), B_P = makeBurst(33, 12, 170), B_ARC = makeBurst(34, 14, 200), B_END = makeBurst(35, 16, 300)
  const ink = (col, w, blur = 10) => { glowStroke(x, col, w, blur); x.stroke(); x.shadowBlur = 0 }
  const bounce = (t, i) => (t > DROPT && t < T.lift0 ? Math.max(0, Math.sin(((t - 0.6) / 0.5556 + i * 0.5) * Math.PI)) * 10 : 0)
  const crowdK = t => outK(t, [T.cut - 0.15, T.cut])

  function skyline(t, a) {
    const k = ease.outBack ? ease.outBack(prog(t, ...T.sky)) : easeOutBack(prog(t, ...T.sky), 1.6)
    if (a <= 0) return
    x.save(); x.globalAlpha *= a
    // the lake
    const g = x.createLinearGradient(0, LAKE, 0, SHORE); g.addColorStop(0, '#22346e'); g.addColorStop(1, '#0e1338')
    x.fillStyle = g; x.fillRect(0, LAKE, W, SHORE - LAKE)
    if (k <= 0) { x.restore(); return }
    x.save(); x.translate(0, LAKE); x.scale(1, clamp(k, 0, 1.2))
    x.beginPath(); x.moveTo(NEEDLE_X - 24, 0); x.lineTo(NEEDLE_X - 7, -330); x.lineTo(NEEDLE_X + 7, -330); x.lineTo(NEEDLE_X + 24, 0); x.closePath(); x.fillStyle = NIGHT; x.fill(); ink(rgba(VIOLET, 0.9), 4)
    x.beginPath(); x.ellipse(NEEDLE_X, -340, 42, 17, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); ink(VIOLET, 4)
    x.beginPath(); x.moveTo(NEEDLE_X, -356); x.lineTo(NEEDLE_X, -470); x.strokeStyle = VIOLET; x.lineWidth = 4; x.stroke()
    for (const b of SKYL) {
      x.beginPath(); x.rect(b.x, -b.h, b.w, b.h); x.fillStyle = NIGHT; x.fill(); ink(rgba(VIOLET, 0.8), 3, 8)
      for (const [wx, wy, col] of b.win) { x.fillStyle = rgba(col, 0.7); x.fillRect(wx, wy - LAKE, 10, 14) }
    }
    x.restore()
    glowStroke(x, rgba(GOLD, 0.7), 4, 12); x.beginPath(); x.moveTo(0, LAKE); x.lineTo(W, LAKE); x.stroke(); x.shadowBlur = 0
    // glints
    for (let i = 0; i < 14; i++) { const gy = LAKE + 20 + (i * 37) % (SHORE - LAKE - 140), gxp = ((i * 173 + t * 30) % 1180) - 50, tw = 0.5 + 0.5 * Math.sin(t * 3 + i); x.fillStyle = rgba(GOLD, 0.2 + 0.4 * tw); x.fillRect(gxp, gy, 40 + (i % 3) * 20, 4) }
    x.restore()
  }
  function shore(a) {
    x.save(); x.globalAlpha *= a
    const g = x.createLinearGradient(0, SHORE - 40, 0, 1920); g.addColorStop(0, '#2a1d52'); g.addColorStop(1, '#120c2a')
    x.beginPath(); x.moveTo(0, SHORE); for (let px = 0; px <= W; px += 60) x.lineTo(px, SHORE - 14 * Math.sin(px * 0.01 + 1)); x.lineTo(W, 1920); x.lineTo(0, 1920); x.closePath(); x.fillStyle = g; x.fill()
    ink(rgba(LAV, 0.6), 4, 8)
    x.restore()
  }
  // a greeting bubble that pops in, then floats up and becomes a star
  function bubble(t, { text, sub, font, body, tB, cx0, cy0, seed, small, star, lt }) {
    const k0 = pop01(t, tB, 0.4, 2.6)
    if (k0 <= 0) return
    const u = prog(t, lt, lt + T.liftDur)
    if (u >= 1) return
    x.save(); x.font = font
    const tw0 = x.measureText(text).width, pad = small ? 36 : 46, fit = Math.min(1, (230 - pad) / tw0), tw = tw0 * fit
    const bw = Math.max(tw + pad, sub ? 160 : 0), bh = small ? 62 : sub ? 108 : 80
    const cx = clamp(cx0, 40 + bw / 2, W - 40 - bw / 2), cy = cy0 + 5 * Math.sin(t * 2.2 + seed * 1.3)
    const ue = ease.inOutCubic(u), side = seed % 2 ? 60 : -60
    const px = lerp(cx, star.x, ue) + Math.sin(ue * Math.PI) * side, py = lerp(cy, star.y, ue)
    const sc = k0 * (1 - 0.85 * ease.inQuad(clamp(u / 0.8)))
    const rot = t > tB ? 0.12 * Math.sin((t - tB) * 12) * Math.exp(-(t - tB) * 3.5) : 0
    const a = 1 - clamp((u - 0.55) / 0.35)
    if (a > 0) {
      x.globalAlpha = a; x.translate(px, py); x.rotate(rot); x.scale(sc, sc)
      x.beginPath(); x.roundRect(-bw / 2, -bh / 2, bw, bh, small ? 22 : 28)
      if (u <= 0) { x.moveTo(-12, bh / 2 - 2); x.lineTo(seed % 2 ? 16 : -16, bh / 2 + 22); x.lineTo(12, bh / 2 - 2) }
      x.fillStyle = 'rgba(16,10,38,0.94)'; x.fill(); ink(body, small ? 5 : 6, 18)
      x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.save(); x.scale(fit, fit); x.fillText(text, 0, sub ? -12 / fit : 3); x.restore()
      if (sub) { x.font = `700 22px ${MONO}`; x.fillStyle = body; x.fillText(sub, 0, 32) }
    }
    x.restore()
    if (u > 0.55) { x.save(); x.globalAlpha = clamp((u - 0.55) / 0.3); drawPixelStar(x, star.x, star.y, 30, seed % 4, body); x.restore() }
  }
  const liftAt = i => T.lift0 + i * T.liftGap
  function narrator(t) {
    const k = pop01(t, T.narr, 0.45, 2)
    if (k <= 0 || t > T.cut) return
    // spins to greet each side during line 1; pants after
    let look = [0, 0], mood = 'happy'
    if (t > T.l1 && t < T.puff[0]) { const n = N_HOPS.filter(h => h <= t && h < T.l2).length; look = [n % 2 ? 1 : -1, 0.5]; mood = 'happy' }
    else if (t >= T.puff[0] && t < T.l2 + 0.6) { mood = 'squint' }
    else if (t >= T.arc[0]) mood = 'sparkle'
    const pant = t > T.puff[0] && t < T.l2 + 1 ? 0.07 * Math.sin((t - T.puff[0]) * 14) : 0
    const r = drawStarChar(x, NARR.x, NARR.y, NARR.size, t, { color: STAR.sky, mood, look, hops: N_HOPS, pop: k, squash: pant, seed: 5, glow: 1.2, alpha: crowdK(t) })
    // sweat drops while out of breath
    for (const s0 of [T.puff[0], T.puff[0] + 0.35, T.puff[0] + 0.7]) {
      const d = t - s0
      if (d < 0 || d > 0.6) continue
      drawBits(x, DROP, DROP_C, Math.round(r.x + (s0 % 0.7 > 0.3 ? 140 : -140) + d * 60 * (s0 % 0.7 > 0.3 ? 1 : -1)), Math.round(r.top + 40 - d * 80 + d * d * 260), 7, { alpha: 1 - d / 0.6 })
    }
    drawBurst(x, B_NARR, NARR.x, NARR.y, t, T.narr, [GOLD, BONE])
  }
  function crowdStar(t, p, back) {
    const S = signStar(p.sign)
    const k = pop01(t, p.tIn, 0.4, 2.2) * crowdK(t)
    const isPair = !back && PAIR.includes(p.i)
    const isPis = !back && p.i === 5
    let mood = 'happy', look = [0, -1]
    if (isPis) mood = t > 1.0 && t < T.flare ? 'squint' : t > T.flare ? 'heart' : 'happy'
    if (isPair && t > T.flare) mood = 'heart'
    if (!isPair && t > T.arc[0]) look = [0, 0]
    const by = p.y - bounce(t, p.i + (back ? 0.3 : 0))
    const flare = isPair && t > T.flare ? 1 + 0.25 * Math.exp(-(t - T.flare) * 4) : 1
    const r = drawStarChar(x, p.x, by, p.size * flare, t, { color: S.color, glyph: p.size >= 120 ? S.glyph : null, mood, look, pop: k, seed: 20 + p.i + (back ? 7 : 0), glow: isPair && t > T.flare ? 1.4 : 0.8, bob: 3 })
    if (isPis) { drawTears(x, r, t, 1.0, T.flare, 4); drawTears(x, r, t, T.sob[0], T.sob[1], 5) }
    return r
  }
  function chart(cx, cy, R, k, col, t) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.15)
    x.beginPath(); x.arc(0, 0, R, 0, TAU); x.fillStyle = 'rgba(16,10,38,0.85)'; x.fill(); ink(col, 5, 16)
    x.beginPath(); x.arc(0, 0, R * 0.72, 0, TAU); ink(rgba(BONE, 0.6), 3, 0)
    for (let i = 0; i < 12; i++) { const an = i * TAU / 12; x.beginPath(); x.moveTo(Math.cos(an) * R * 0.72, Math.sin(an) * R * 0.72); x.lineTo(Math.cos(an) * R, Math.sin(an) * R); x.strokeStyle = rgba(BONE, 0.5); x.lineWidth = 2; x.stroke() }
    x.rotate(-t * 0.15)
    x.font = `700 ${Math.round(R * 0.17)}px 'EB Garamond', 'DejaVu Sans', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE
    SIGNS.forEach((s, i) => { const an = (i + 0.5) * TAU / 12 + t * 0.15; x.fillText(s.glyph + '︎', Math.cos(an) * R * 0.86, Math.sin(an) * R * 0.86) })
    for (let i = 0; i < 5; i++) { const an = i * 1.3 + 0.4; x.beginPath(); x.arc(Math.cos(an) * R * 0.45, Math.sin(an) * R * 0.45, 7, 0, TAU); x.fillStyle = [GOLD, PINK, CYAN, MINT, LAV][i]; x.fill() }
    x.restore()
  }
  function goldArc(a0, a1, k, t, lift = 260) {
    if (k <= 0) return
    const mx = (a0.x + a1.x) / 2, my = Math.min(a0.y, a1.y) - lift
    x.save()
    x.beginPath()
    const N = 40
    for (let j = 0; j <= N * k; j++) { const u = j / N, qx = (1 - u) ** 2 * a0.x + 2 * (1 - u) * u * mx + u * u * a1.x, qy = (1 - u) ** 2 * a0.y + 2 * (1 - u) * u * my + u * u * a1.y; j ? x.lineTo(qx, qy) : x.moveTo(qx, qy) }
    ink(GOLD, 8 + 2 * Math.sin(t * 4), 26)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ck = crowdK(t)
      if (t < T.cut) {
        skyline(t, 1); shore(1)
        // the greeting stars already in the sky
        // back row first, then front
        const backR = BACK.map(p => crowdStar(t, p, true))
        const frontR = FRONT.map(p => crowdStar(t, p, false))
        void backR
        BACK.forEach((p, i) => bubble(t, { text: p.text, font: CHAT_FONT, body: p.body, tB: p.tB, cx0: p.x, cy0: p.by - bounce(t, p.i) * 0.6, seed: 10 + i, small: true, star: TARGETS[7 + i], lt: liftAt(7 + i) }))
        FRONT.forEach((p, i) => bubble(t, { text: p.text, sub: p.sub, font: p.font, body: p.body, tB: p.tB, cx0: p.x, cy0: BUB_Y[p.row] - bounce(t, p.i) * 0.6, seed: i, star: TARGETS[i], lt: liftAt(i) }))
        // greeting stars twinkle in the sky after the lift
        TARGETS.forEach((s, i) => { const u = prog(t, liftAt(i) + T.liftDur * 0.9, liftAt(i) + T.liftDur * 1.2); if (u > 0) { x.save(); x.globalAlpha = u * ck; drawPixelStar(x, s.x, s.y, 30 + 6 * Math.sin(t * 3 + i), i % 4, i < 7 ? GREET[i].body : BACK[i - 7].body); x.restore() } })
        narrator(t)
        // the pair: charts bloom, gold arc links them
        const [ca, pa] = PAIR.map(i => frontR[i])
        const chk = easeOutBack(prog(t, ...T.chart), 1.8) * ck
        const cA = { x: FRONT[1].x + 20, y: 1150 }, cB = { x: FRONT[5].x - 20, y: 1150 }
        if (chk > 0) { chart(cA.x, cA.y, 105, chk, PINK, t); chart(cB.x, cB.y, 105, chk, CYAN, t) }
        x.save(); x.globalAlpha = ck; goldArc({ x: cA.x + 70, y: cA.y - 60 }, { x: cB.x - 70, y: cB.y - 60 }, ease.inOutCubic(prog(t, ...T.arc)), t, 200); x.restore()
        drawBurst(x, B_C, ca.x, ca.y, t, T.flare, [PINK, GOLD, BONE]); drawBurst(x, B_P, pa.x, pa.y, t, T.flare + 0.08, [CYAN, GOLD, BONE])
        drawBurst(x, B_ARC, 540, 900, t, T.arc[1], [GOLD, BONE, PINK], 0.8)
      } else {
        // one sky: the skyline stays low and dim, the constellation joins, the pair rises gold-linked
        const a = outK(t, T.out)
        x.save(); x.globalAlpha = 0.55 * a; skyline(t, 1); shore(1); x.restore()
        const nk = ease.inOutCubic(prog(t, ...T.net))
        x.save(); x.globalAlpha = a
        NET.forEach(([i, j], n) => {
          const kk = clamp(nk * NET.length - n * 0.6)
          if (kk <= 0) return
          const A = TARGETS[i], B = TARGETS[j]
          x.beginPath(); x.moveTo(A.x, A.y); x.lineTo(lerp(A.x, B.x, kk), lerp(A.y, B.y, kk)); ink(rgba(BONE, 0.6), 3, 10)
        })
        TARGETS.forEach((s, i) => drawPixelStar(x, s.x, s.y, 32 + 6 * Math.sin(t * 3 + i), i % 4, i < 7 ? GREET[i].body : BACK[i - 7].body))
        const rk = ease.outCubic(prog(t, ...T.rise))
        const from = [{ x: 300, y: 1700 }, { x: 780, y: 1700 }]
        const pts = PAIR_END.map((p, i) => ({ x: lerp(from[i].x, p.x, rk), y: lerp(from[i].y, p.y, rk) }))
        goldArc({ x: pts[0].x + 90, y: pts[0].y - 30 }, { x: pts[1].x - 90, y: pts[1].y - 30 }, ease.inOutCubic(prog(t, T.rise[1] - 0.2, T.rise[1] + 0.3)), t, 140)
        const ok = popOut(t, T.out)
        const C = signStar('cancer'), P = signStar('pisces')
        const hops = [T.rise[1], T.rise[1] + 1.1, T.rise[1] + 2.2]
        const rc = drawStarChar(x, pts[0].x, pts[0].y, 250, t, { color: C.color, glyph: C.glyph, mood: 'heart', pop: ok, seed: 21, glow: 1.3, hops })
        const rp = drawStarChar(x, pts[1].x, pts[1].y, 250, t, { color: P.color, glyph: P.glyph, mood: t < T.rise[1] + 0.6 ? 'heart' : 'squint', pop: ok, seed: 25, glow: 1.3, hops: hops.map(h => h + 0.15) })
        drawTears(x, rp, t, T.rise[1] + 0.6, T.out[0], 6)       // Pisces: happy crying, obviously
        floatHearts(x, t, 540, 1270, T.rise[1], T.out[0] - 0.3, 6, 9, 360)
        drawBurst(x, B_END, 540, 1250, t, T.rise[1], [GOLD, PINK, CYAN, BONE], 0.9)
        void rc
        x.restore()
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card motif: one cut for a 20 s film, as the crowd clears for "Find them under one sky."
const CUTS = [{ t: T.cut, kind: 'shuffle' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ['whoosh', 0.05, 0.9, 0.03],
  ...wordPops(T.h0, 4, 0.09), ['pop', T.h0Late, 1174.66, 0.055, 0], ['bell', r3(T.h0Late + 0.03), 1318.51, 0.03, 1.2, 0],
  ...FRONT.map(p => ['pop', r3(p.tIn), NOTE[p.i % NOTE.length], 0.02, (p.x - 540) / 600]),
  ...FRONT.map(p => ['pop', r3(p.tB), NOTE[(p.i + 3) % NOTE.length], 0.035, (p.x - 540) / 600]),
  ['boom', DROPT, 0.13], ['whoosh', T.sky[0], 0.5, 0.04], ['glitter', DROPT, r3(DROPT + 0.6)],
  ...BACK.map(p => ['pop', r3(p.tB), NOTE[(p.i + 1) % NOTE.length], 0.03, (p.x - 540) / 600]),
  ['pop', T.narr, 880, 0.045, 0], ['bell', r3(T.narr + 0.04), 1567.98, 0.025, 0.9, 0],
  ['pop', T.boxA, 739.99, 0.035, 0], ['pop', r3(T.boxA + 0.06), 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...wordPops(T.h1, 5, 0.08, 1, 0.022), ['pop', T.h1Late, 1174.66, 0.05, 0], ['pluck', T.h1Late, 880, 0.04, 0.6, 0],
  ['pluck', T.puff[0], 220, 0.035, 0.4, 0], ['pluck', r3(T.puff[0] + 0.35), 196, 0.035, 0.4, 0], ['pluck', r3(T.puff[0] + 0.7), 174.61, 0.035, 0.4, 0],
  ['riser', T.lift0 - 0.2, r3(T.lift0 + 0.9), 0.035],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(liftAtC(i) + T.liftDur * 0.9), NOTE[(i * 2) % NOTE.length] * 2, 0.018, ((i % 5) - 2) * 0.2]),
  ['boom', T.flare, 0.1], ['pop', T.flare, 987.77, 0.05, -0.4], ['pop', r3(T.flare + 0.08), 1174.66, 0.05, 0.4],
  ['whoosh', T.chart[0], 0.35, 0.035], ['glitter', T.chart[0], r3(T.chart[0] + 0.5)],
  ['whoosh', T.arc[0], 0.5, 0.035], ['bell', T.arc[1], 1567.98, 0.045, 1.6, 0], ['glitter', T.arc[1], r3(T.arc[1] + 0.7)],
  ['pluck', T.sob[0], 293.66, 0.03, 0.6, 0.4],
  // one sky
  ...wordPops(T.h2, 3, 0.09, 2), ['pop', T.h2Late, 1174.66, 0.06, 0], ['pop', r3(T.h2Late + 0.1), 1318.51, 0.06, 0],
  ['whoosh', T.rise[0], 0.5, 0.035], ['bell', T.rise[1], 1567.98, 0.045, 1.6, -0.1], ['bell', r3(T.rise[1] + 0.05), 2093, 0.03, 1.6, 0.1], ['glitter', T.rise[1], r3(T.rise[1] + 0.8)],
  ...NET.map((_, n) => ['tick', r3(T.net[0] + (n / NET.length) * (T.net[1] - T.net[0])), 0.02]),
  ['whoosh', T.out[0], 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
function liftAtC(i) { return T.lift0 + i * T.liftGap }
