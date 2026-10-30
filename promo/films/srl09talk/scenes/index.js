// srl09talk (20 s vertical, Star Talk Remix of the L09 "Talk" loop) · story 0–15.6, then the shared end card.
// The original: tarot talk cards drift on a slow 3D spiral, one question per bar ("What's a hill you will die on?").
// The remix: a first date at a tiny pixel café table, ♍ Virgo × ♒ Aquarius, dying of small talk.
//   0.00–5.80  "First date. | *Small* talk."  ♍: "so. nice... weather?" — silence; pixel "chirp" crickets float by.
//              ♓ Pisces at the next table cries from second-hand awkwardness.
//   5.86–7.70  "It's giving | *weather.*"  ♒: "it's very... weathery."  Both sip their mugs in perfect sync (slurp).
//   7.75–10.3  "Let the | *cards* talk."  ♊ Gemini (Mercury: the talking planet) swoops in and the talk cards spiral round the
//              table like the original loop; one drifts to the front: "What's a hill | you'd die on?"
//              ♊: "skip the weather. *pick a card.*"
//   10.4–12.6  "Both answer. | *Then* flip."  Each star holds its answer face-down; they flip together: both say
//              "BREAKFAST FOR DINNER". Wide eyes → heart-eyes, synced hop, Pisces happy-sobs.
//   12.7 cut   "Skip the weather. | Ask something *real.*"  Out by 15.45.
// One canvas (sky + table + cards + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const SERIF = "'EB Garamond', Georgia, serif"
const BEAT = n => 0.6 + n * 0.5556
const TAU = Math.PI * 2
const VIR = signStar('virgo'), AQU = signStar('aquarius'), GEM = signStar('gemini'), PIS = signStar('pisces')

const T = {
  h0: 0.12, h0Out: [5.62, 5.8], in: 0.3, pisIn: 1.0,
  open: 2.66, l1: BEAT(4), chirps: [3.95, 4.6],                 // the drop: 2.82
  h0b: 5.86, h0bLand: 6.2, h0bOut: [7.55, 7.72], l2: 5.45, sip: [6.75, 7.35],
  h1: 7.78, h1Land: 8.12, h1Out: [10.18, 10.36], gemIn: 7.6, spiral: [7.75, 9.1], front: [8.95, 9.6], l3: 8.2, close: 11.3,
  h1b: 10.42, h1bLand: 10.8, h1bOut: [12.52, 12.68], ans: 10.55, flip: [11.55, 11.8], heart: 12.05,
  cut: 12.7, h2: 12.76, h2Land: 13.2, hop2: 13.7, h2Out: [15.18, 15.42], out: [15.1, 15.45],
}
const VS = '♍ VIRGO STAR', AS = '♒ AQUARIUS STAR', GS = '♊ GEMINI STAR'
const LINES = [
  { t: T.l1, speaker: VS, text: 'so. nice... *weather?*', color: VIR.color },
  { t: T.l2, speaker: AS, text: "it's very... *weathery.*", color: AQU.color },
  { t: T.l3, speaker: GS, text: 'skip the weather. *pick a card.*', color: GEM.color },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// layout
const VP = { x: 232, y: 1170, size: 236 }, AP = { x: 848, y: 1170, size: 236 }
const TABLE = { x: 540, y: 1282, w: 660 }
const SPIN = { x: 540, y: 820, rx: 430, ry: 140 }
const QCARD = { x: 540, y: 780, w: 290 }
const GEM_IN = { x: 540, y: 690, size: 190 }, GEM_SIDE = { x: 955, y: 610, size: 150 }
const PISP = { x: 110, y: 650, size: 120 }
const ANS = [{ x: 210, y: 830 }, { x: 870, y: 830 }]
const TALKS = ['card-talk-1', 'card-talk-2', 'card-talk-3', 'card-talk-4', 'card-talk-6', 'card-talk-5']

const VIR_HOPS = [T.in + 0.3, ...talkHops(LINES, VS, { cps: CPS }), T.flip[1] + 0.3, T.hop2]
const AQU_HOPS = [T.in + 0.4, ...talkHops(LINES, AS, { cps: CPS }), T.flip[1] + 0.3, T.hop2]
const GEM_HOPS = [T.gemIn + 0.35, ...talkHops(LINES, GS, { cps: CPS })]

function dateState(i, t) {
  const to = i ? [-1, 0] : [1, 0]
  if (t < T.l1) return i ? { mood: 'neutral', look: [0, -1] } : { mood: 'happy', look: to }
  if (t < T.chirps[0]) return i ? { mood: 'neutral', look: [-1, 0] } : { mood: 'neutral', look: to }
  if (t < T.l2) return { mood: 'neutral', look: [0, 0], blink: false }                  // both stare at you. silence.
  if (t < T.sip[0]) return i ? { mood: 'squint', look: [0, -1] } : { mood: 'neutral', look: to }
  if (t < T.sip[1]) return { mood: 'squint', look: [0, 0] }                             // synced sip
  if (t < T.gemIn) return { mood: 'neutral', look: [0, 0] }
  if (t < T.front[1]) return { mood: 'wide', look: [i ? -1 : 1, -1], blink: false }      // whoa, cards
  if (t < T.ans) return { mood: 'neutral', look: [i ? -1 : 1, -1] }
  if (t < T.flip[0]) return { mood: 'squint', look: to }                                // nervous
  if (t < T.heart) return { mood: 'wide', look: to, blink: false }                      // ...same?!
  return { mood: 'heart', look: to }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "italic 500 56px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const imgs = {}
  await Promise.all([...TALKS, 'card-back'].map(n => new Promise(res => { const i = new Image(); i.onload = () => res(); i.onerror = () => res(); i.src = ASSETS + n + '.png'; imgs[n] = i })))
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'First date. | *Small* talk.', { top: 200, size: 120, fit: true, accentSize: 200, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0 + 0.4, lateGap: 0.16 })
  const H0b = popText(root, "It's giving | *weather.*", { top: 200, size: 120, accentSize: 200, at: T.h0b, gap: 0.08, late: 1, lateAt: T.h0bLand, wobble: true, accentColor: '#7fdcff' })
  const H1 = popText(root, 'Let the | *cards* talk.', { top: 170, size: 120, accentSize: 200, at: T.h1, gap: 0.08, late: 2, lateAt: T.h1Land, lateGap: 0.16, wobble: true, accentColor: GOLD, lineHeight: 0.95 })
  const H1b = popText(root, 'Both answer. | *Then* flip.', { top: 170, size: 116, fit: true, accentSize: 190, at: T.h1b, gap: 0.08, late: 2, lateAt: T.h1bLand, lateGap: 0.16, wobble: true, accentColor: PINK, lineHeight: 0.95 })
  const H2 = popText(root, 'Skip the weather. | Ask something *real.*', { top: 230, size: 100, fit: true, accentSize: 170, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H0b, T.h0bOut], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const allOut = t => popOut(t, T.out)

  function table(t) {
    const k = pop01(t, T.in, 0.4, 1.8) * allOut(t)
    if (k <= 0.01) return
    const c = 8, w = TABLE.w * k, top = TABLE.y
    x.save()
    // candle glow
    const g = x.createRadialGradient(540, top - 30, 0, 540, top - 30, 380)
    g.addColorStop(0, `rgba(255,200,120,${0.22 * k})`); g.addColorStop(1, 'rgba(255,200,120,0)')
    x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(540 - 400, top - 420, 800, 800); x.globalCompositeOperation = 'source-over'
    x.fillStyle = INK; x.fillRect(540 - w / 2 - c, top - c, w + 2 * c, 4 * c)
    x.fillStyle = '#8a5a3b'; x.fillRect(540 - w / 2, top, w, 2 * c); x.fillStyle = '#b07a4f'; x.fillRect(540 - w / 2, top, w, c)
    x.fillStyle = INK; x.fillRect(540 - 3 * c, top + 2 * c, 6 * c, 140 * k)
    x.fillStyle = '#6b432b'; x.fillRect(540 - 2 * c, top + 2 * c, 4 * c, 140 * k)
    // candle
    x.fillStyle = BONE; x.fillRect(540 - c, top - 5 * c, 2 * c, 5 * c)
    x.fillStyle = Math.sin(t * 17) > 0 ? GOLD : '#ff9a4a'; x.fillRect(540 - c / 2, top - 7 * c, c, 2 * c)
    x.restore()
    // two mugs; they lift together for the synced sip
    const sip = Math.sin(Math.PI * prog(t, ...T.sip))
    for (const [mx, dir] of [[372, 1], [708, -1]]) {
      const lift = sip * 60, mxx = mx - dir * sip * 40
      x.save(); x.globalAlpha = clamp(k)
      x.translate(Math.round(mxx), Math.round(top - 4 * c - lift)); x.rotate(-dir * sip * 0.5)
      x.fillStyle = INK; x.fillRect(-3 * c - 4, -2 * c - 4, 6 * c + 8, 6 * c + 8); x.fillRect(dir > 0 ? 3 * c : -5 * c, -c, 2 * c + 4, 3 * c)
      x.fillStyle = dir > 0 ? VIR.color : AQU.color; x.fillRect(-3 * c, -2 * c, 6 * c, 6 * c)
      x.fillStyle = BONE; x.fillRect(-3 * c, -2 * c, 6 * c, c)
      // steam
      x.fillStyle = 'rgba(239,230,214,0.5)'
      for (let s = 0; s < 3; s++) { const ph = (t * 0.8 + s / 3) % 1; x.globalAlpha = clamp(k) * (1 - ph) * 0.6; x.fillRect(Math.round(-c + Math.sin(ph * 6 + s) * c), Math.round(-3 * c - ph * 60), c, c) }
      x.restore()
    }
  }

  function crickets(t) {
    const [a, b] = T.chirps
    for (const [t0, cx, cy] of [[a, 470, 960], [b, 640, 900], [b + 0.5, 560, 1010]]) {
      const p = prog(t, t0, t0 + 1.1)
      if (p <= 0 || p >= 1) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * p) * 0.9; x.font = `700 46px ${MONO}`; x.textAlign = 'center'
      x.fillStyle = INK; x.fillText('chirp.', cx + 3, cy - p * 60 + 3); x.fillStyle = '#b6f08a'; x.fillText('chirp.', cx, cy - p * 60)
      x.restore()
    }
  }

  function pisces(t) {
    const k = pop01(t, T.pisIn, 0.4, 2.2) * allOut(t)
    if (k <= 0.01) return
    const happy = t >= T.heart
    const r = drawStarChar(x, PISP.x, PISP.y, PISP.size, t, { color: PIS.color, mood: happy ? 'sparkle' : 'squint', look: [1, 1], pop: k, seed: 11, hops: [T.pisIn + 0.3, T.heart + 0.1, T.heart + 0.45], glow: 0.7 })
    x.save()
    for (let i = 0; i < 6; i++) {
      const ph = (t * 1.6 + i / 6) % 1, side = i % 2 ? 1 : -1
      x.globalAlpha = clamp(k) * (1 - ph) * 0.95 * (t > T.l1 ? 1 : 0.3); x.fillStyle = '#9fe0ff'
      x.fillRect(Math.round(r.x + side * (22 + ph * 30)), Math.round(r.y - 4 + ph * 70), 7, 9)
    }
    x.restore()
  }

  function drawCardImg(im, cx, cy, w, { rot = 0, sx = 1, alpha = 1, glow = 0 } = {}) {
    if (!im || !im.naturalWidth || w <= 1 || alpha <= 0.01) return
    const h = w * im.naturalHeight / im.naturalWidth
    x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(sx, 1); x.globalAlpha = alpha
    if (glow > 0) { x.shadowColor = `rgba(242,199,92,${0.7 * glow})`; x.shadowBlur = 50 * glow }
    x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
  }

  // the talk-card spiral (the original loop's image), then card 0 drifts to the front
  function spiral(t) {
    const p = prog(t, T.spiral[0], T.spiral[1] + 0.6)
    if (p <= 0) return
    const fr = ease.inOutCubic(prog(t, ...T.front)), qOut = outK(t, [T.cut - 0.05, T.cut + 0.05])
    const items = TALKS.map((n, j) => {
      const ang = TAU * (j / TALKS.length) - (t - T.spiral[0]) * 1.6
      const depthF = (1 - Math.cos(ang)) / 2                      // 0 front … 1 back
      let px = SPIN.x + Math.sin(ang) * SPIN.rx, py = SPIN.y + Math.cos(ang) * SPIN.ry - (1 - pop01(t, T.spiral[0] + j * 0.06, 0.5, 1.4)) * 500
      let w = lerp(190, 120, depthF), rot = -0.25 * Math.sin(ang), alpha = clamp(pop01(t, T.spiral[0] + j * 0.06, 0.4, 1.4)) * lerp(1, 0.55, depthF), z = -depthF
      if (j === 0) {
        px = lerp(px, QCARD.x, fr); py = lerp(py, QCARD.y + Math.sin(t * 1.6) * 6, fr); w = lerp(w, QCARD.w, fr); rot = lerp(rot, 0.02 * Math.sin(t * 1.3), fr)
        alpha = lerp(alpha, 1, fr) * qOut; z = lerp(z, 2, fr)
      } else {
        const gone = prog(t, T.front[0], T.front[1] + 0.2)
        py -= gone * 900 * (0.6 + 0.1 * j); alpha *= 1 - gone; rot += gone * (j % 2 ? 1 : -1)
      }
      return { n, px, py, w, rot, alpha, z, j }
    }).sort((a, b) => a.z - b.z)
    for (const c of items) drawCardImg(imgs[c.n], c.px, c.py, c.w, { rot: c.rot, alpha: c.alpha, glow: c.j === 0 ? fr : 0 })
    // the question, big enough to read, between the two stars
    const qa = prog(t, T.front[1] - 0.2, T.front[1] + 0.2) * qOut
    if (qa > 0.01) {
      x.save(); x.globalAlpha = qa; x.textAlign = 'center'; x.font = `italic 500 56px ${SERIF}`
      x.shadowColor = 'rgba(6,4,18,0.95)'; x.shadowBlur = 18
      x.fillStyle = BONE
      x.fillText('What’s a hill', 540, 1082); x.fillText('you’d die on?', 540, 1140)
      x.restore()
    }
    // sparkles round the chosen card
    if (fr > 0.5) {
      x.save()
      for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1, a = i * 1.9; x.globalAlpha = Math.sin(Math.PI * ph) * qOut; drawPixelStar(x, QCARD.x + Math.cos(a) * 200, QCARD.y + Math.sin(a) * 270, 22, 1, i % 2 ? GOLD : BONE) }
      x.restore()
    }
  }

  // the two answers: face-down, then flipped together
  function answers(t) {
    const out = allOut(t)
    for (let i = 0; i < 2; i++) {
      const k = pop01(t, T.ans + i * 0.12, 0.4, 2.2) * out
      if (k <= 0.01) continue
      const P = ANS[i], fp = prog(t, ...T.flip), sx = Math.abs(Math.cos(Math.PI * fp)), face = fp >= 0.5
      const hop = t > T.flip[1] ? -Math.max(0, Math.sin(Math.PI * prog(t, T.flip[1] + 0.25, T.flip[1] + 0.55))) * 40 : 0
      const cy = P.y + Math.sin(t * 2 + i) * 6 + hop + (1 - clamp(k)) * 80, w = 170 * k, h = w * 1.53
      const tilt = (i ? 1 : -1) * 0.08
      if (!face) { drawCardImg(imgs['card-back'], P.x, cy, w * 1.12, { rot: tilt, sx, alpha: clamp(k) }); continue }
      x.save(); x.translate(P.x, cy); x.rotate(tilt); x.scale(sx, 1); x.globalAlpha = clamp(k)
      const glow = clamp((t - T.heart) * 3)
      x.shadowColor = GOLD; x.shadowBlur = 40 * glow
      x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
      x.fillStyle = GOLD; x.fillRect(-w / 2, -h / 2, w, h); x.shadowBlur = 0
      x.fillStyle = '#1d1440'; x.fillRect(-w / 2 + 8, -h / 2 + 8, w - 16, h - 16)
      x.fillStyle = PINK; x.font = `700 31px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      ;['BREAK-', 'FAST', 'FOR', 'DINNER'].forEach((s, j) => x.fillText(s, 0, (j - 1.5) * 44))
      x.restore()
    }
    // the match ding: a burst between the two cards
    const bt = t - T.heart
    if (bt > 0 && bt < 0.8) {
      x.save(); x.globalAlpha = 1 - bt / 0.8
      for (const P of ANS) for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, d = 120 + bt * 200; drawPixelStar(x, P.x + Math.cos(a) * d, P.y + Math.sin(a) * d, 22, 1, i % 2 ? GOLD : PINK) }
      x.restore()
    }
  }

  function hearts(t) {
    if (t < T.heart) return
    for (let i = 0; i < 10; i++) {
      const born = T.heart + i * 0.26, p = (t - born) / 1.3
      if (p < 0 || p >= 1 || born > T.out[0] - 0.4) continue
      const S = i % 2 ? AP : VP, hx = S.x + Math.sin(p * 6 + i) * 30 + (i % 3 - 1) * 40, hy = S.y - 130 - p * 200
      x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.fillStyle = '#ff4f86'
      const c = 7; [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([a, b]) => x.fillRect(Math.round(hx + (a - 2.5) * c), Math.round(hy + b * c), c, c))
      x.restore()
    }
  }

  function stars(t) {
    const out = allOut(t)
    const vp = pop01(t, T.in, 0.4, 2) * out, ap = pop01(t, T.in + 0.1, 0.4, 2) * out
    const sipSq = 0.06 * Math.sin(Math.PI * prog(t, ...T.sip))
    drawStarChar(x, VP.x, VP.y, VP.size, t, { color: VIR.color, glyph: VIR.glyph, ...dateState(0, t), hops: VIR_HOPS, pop: vp, seed: 3, squash: sipSq })
    drawStarChar(x, AP.x, AP.y, AP.size, t, { color: AQU.color, glyph: AQU.glyph, ...dateState(1, t), hops: AQU_HOPS, pop: ap, seed: 8, squash: sipSq })
    // Gemini swoops in from the top-right, deals, then steps aside
    const gp = pop01(t, T.gemIn, 0.45, 1.8) * out
    if (gp > 0.01) {
      const sw = 1 - ease.outCubic(prog(t, T.gemIn - 0.1, T.gemIn + 0.4)), side = ease.inOutCubic(prog(t, T.front[0], T.front[1]))
      const gx2 = lerp(GEM_IN.x, GEM_SIDE.x, side) + sw * 500, gy = lerp(GEM_IN.y, GEM_SIDE.y, side) - sw * 400, gs = lerp(GEM_IN.size, GEM_SIDE.size, side)
      const mood = t < T.l3 ? 'happy' : t < T.ans ? 'wink' : t < T.heart ? 'neutral' : 'happy'
      drawStarChar(x, gx2, gy, gs, t, { color: GEM.color, glyph: GEM.glyph, mood, look: [-1, 1], hops: GEM_HOPS, pop: gp, seed: 5, glow: 1.2 })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.5, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        pisces(t)
        table(t)
        spiral(t)
        stars(t)
        answers(t)
        crickets(t)
        hearts(t)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cut candidates: 5.84 ("Small talk." → "It's giving weather.") and 12.7 (the flip → the last line). A 20 s film keeps one (12.7).
const CUTS = [5.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.4, 1174.66, 0.045, 0], ['pop', T.h0 + 0.56, 987.77, 0.035, 0],
  ['pop', T.in + 0.05, 659.25, 0.035, -0.3], ['pop', T.in + 0.15, 739.99, 0.035, 0.3], ['pop', T.pisIn + 0.05, 523.25, 0.025, -0.6],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // crickets: tiny high ticks in pairs
  ...[T.chirps[0], T.chirps[1], T.chirps[1] + 0.5].flatMap(c => [['tick', c, 0.03], ['tick', c + 0.07, 0.025], ['tick', c + 0.14, 0.02]]),
  ...wordPops(T.h0b, 2, 0.08, 2, 0.025), ['pop', T.h0bLand, 1174.66, 0.045, 0],
  ['whoosh', T.sip[0], 0.5, 0.025], ['pop', T.sip[0] + 0.25, 392, 0.03, -0.2], ['pop', T.sip[0] + 0.3, 392, 0.03, 0.2],
  // Gemini + the card spiral
  ['whoosh', T.gemIn - 0.1, 0.6, 0.05], ['pop', T.gemIn + 0.2, 987.77, 0.04, 0.4],
  ...wordPops(T.h1, 1, 0.08, 1, 0.025), ['pop', T.h1Land, 1318.51, 0.045, 0], ['pop', T.h1Land + 0.16, 1174.66, 0.035, 0],
  ...TALKS.map((_, j) => ['pluck', +(T.spiral[0] + j * 0.06 + 0.2).toFixed(3), NOTE[j % NOTE.length], 0.025, 0.5, (j - 2.5) * 0.15]),
  ['glitter', T.spiral[0] + 0.2, T.spiral[0] + 1.0],
  ['whoosh', T.front[0], 0.6, 0.04], ['bell', T.front[1], 1174.66, 0.035, 2.2, 0], ['bell', T.front[1] + 0.1, 1567.98, 0.018, 1.8, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // both answer, then the flip
  ...wordPops(T.h1b, 2, 0.08, 0, 0.026), ['pop', T.h1bLand, 1318.51, 0.045, 0], ['pop', T.h1bLand + 0.16, 1174.66, 0.035, 0],
  ['pop', T.ans, 659.25, 0.03, -0.5], ['pop', T.ans + 0.12, 739.99, 0.03, 0.5],
  ['whoosh', T.flip[0], 0.3, 0.035], ['tick', T.flip[0] + 0.12, 0.04],
  ['pluck', T.heart, 1318.51, 0.05, 0.7, -0.3], ['pluck', T.heart + 0.02, 1318.51, 0.05, 0.7, 0.3], ['bell', T.heart + 0.05, 1760, 0.025, 1.2, 0], ['glitter', T.heart, T.heart + 0.6],
  // the last line
  ...wordPops(T.h2, 4, 0.08, 0, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.045, 0.7, 0],
  ['pop', T.hop2, 987.77, 0.03, -0.3], ['pop', T.hop2 + 0.02, 987.77, 0.03, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
