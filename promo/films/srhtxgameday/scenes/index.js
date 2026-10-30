// srhtxgameday (20 s vertical, Star Talk Remix of htxgameday "Game day") · story 0–15.6, then the shared end card.
// Twelve sign stars fill the bleachers; THE STARS (gold narrator) sits front and centre and talks you through it.
//   0.00–4.60  "Game day: | the whole city | wears the | *same* *colors.*"  On "same colors." a teal paint wave sweeps the
//              stands and every star turns the SAME plain teal (no badges, no names, no logos). They bounce on the beat and
//              do a stadium wave; ♓ Pisces cries at the big moment anyway. Box: "look at them. you can't tell *anyone* apart."
//   4.60–9.30  "Matching | shirts ≠ | *matching* *people.*"  The two front-row fans spot each other: heart-eyes, "we match!"
//              A heart pops between them. Then the teal drains left to right: ♈ Aries and ♑ Capricorn. "...oh." The heart
//              drops. Box: "same shirt. totally different *sky*."
//   9.30–15.4  (card cut 9.30) "Match on | *more* *than* | *colors.*"  The crowd dims but ♌ Leo and ♐ Sagittarius: chart
//              rings spin up round them and a gold TRINE · 120° arc links them. Box: "leo and sag: a *trine*. now that's a
//              match." They hop to centre and high-five, a heart pops; the whole stand cheers. Out by 15.42.
// One canvas (sky + bleachers + stars), DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, hexToRgb } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, heart, bench, chartRing, rgba, BONE, GOLD, PINK, TEAL, MONO } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)

const T = {
  h0: 0.08, paint: BEAT(1), h0Out: [4.42, 4.6],
  stars: 0.15, narr: 0.3, wave: BEAT(5), open: 2.1, l1: 2.3,
  h1: 4.7, h1Late: BEAT(8), h1Out: [9.08, 9.26],
  spot: 4.95, drain: [5.9, 6.5], oh: 6.6, l2: 6.75,
  cut: 9.3,
  h2: 9.4, h2Late: 9.85, rings: [9.5, 10.0], arc: [9.95, 10.55], l3: 10.2,
  move: [11.4, 12.0], five: 12.1, cheer: BEAT(22), close: 13.3,
  out: [15.0, 15.42], h2Out: [15.22, 15.42],
}
const SKY = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SKY, text: "look at them. you can't tell *anyone* apart." },
  { t: T.l2, speaker: SKY, text: 'same shirt. totally different *sky*.' },
  { t: T.l3, speaker: SKY, text: "leo and sag: a *trine*. now that's a match." },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const toHex = v => '#' + v.map(c => Math.round(clamp(c, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(A.map((v, i) => lerp(v, B[i], k))) }

// ── the stands: back row (5), middle row (5), front row (2) + the narrator front and centre
const ROWS = [
  { y: 770, size: 112, xs: [170, 355, 540, 725, 910], ids: ['gemini', 'cancer', 'scorpio', 'sagittarius', 'aquarius'] },
  { y: 990, size: 140, xs: [150, 345, 540, 735, 930], ids: ['taurus', 'leo', 'pisces', 'virgo', 'libra'] },
  { y: 1250, size: 180, xs: [190, 890], ids: ['aries', 'capricorn'] },
]
const FANS = ROWS.flatMap((r, ri) => r.ids.map((id, i) => ({ id, ri, x: r.xs[i], y: r.y, size: r.size, ...signStar(id), seed: ri * 5 + i + 2 })))
const NARR = { x: 540, y: 1268, size: 220 }
const PAIR = { leo: { x: 420, y: 655 }, sagittarius: { x: 660, y: 655 } }
const BEATS = Array.from({ length: 6 }, (_, i) => BEAT(2 + i)).filter(b => b < 4.4)

function fanHops(f) {
  const h = [T.stars + 0.3 + f.x * 0.0003]
  for (const b of BEATS) h.push(b + (b === T.wave ? f.x / 1080 * 0.5 : 0))
  if (f.id === 'aries' || f.id === 'capricorn') h.push(T.spot)
  h.push(T.cheer + f.x * 0.0002, T.cheer + 0.6 + f.x * 0.0002, T.cheer + 1.2)
  if (f.id === 'leo' || f.id === 'sagittarius') h.push(T.move[0], T.five)
  return h
}
const HOPS = new Map(FANS.map(f => [f.id, fanHops(f)]))
const NARR_HOPS = [T.narr + 0.3, ...talkHops(LINES, SKY, { cps: CPS }), T.cheer + 0.1, T.cheer + 0.7]

// teal amount: wave sweeps L→R at the paint; drains L→R at the drain; everyone's true colours after the cut
function tealK(t, f) {
  const a = prog(t, T.paint + f.x / 1080 * 0.35, T.paint + f.x / 1080 * 0.35 + 0.15)
  const d = prog(t, T.drain[0] + f.x / 1080 * 0.45, T.drain[0] + f.x / 1080 * 0.45 + 0.15)
  return a * (1 - d)
}
function fanState(t, f) {
  const front = f.ri === 2
  if (t < T.paint) return { mood: 'happy' }
  if (t < T.h1) return f.id === 'pisces' ? { mood: 'squint', tears: 3 } : { mood: t < T.wave + 0.8 ? 'happy' : 'neutral' }
  if (t < T.cut) {
    if (front) {
      const dir = f.id === 'aries' ? 1 : -1
      if (t < T.spot) return { mood: 'wide', look: [dir, 0], blink: false }
      if (t < T.oh) return { mood: 'heart' }
      return { mood: 'squint', look: [dir, 0] }
    }
    if (f.id === 'pisces') return { mood: 'squint', tears: 2 }
    return { mood: t < T.drain[0] ? 'neutral' : 'wide', look: [0, 1], blink: t < T.drain[0] ? undefined : false }
  }
  if (f.id === 'leo' || f.id === 'sagittarius') {
    if (t < T.arc[1]) return { mood: 'wide', look: [f.id === 'leo' ? 1 : -1, f.id === 'leo' ? -1 : 1], blink: false }
    if (t < T.cheer) return { mood: 'heart' }
    return { mood: 'happy' }
  }
  if (f.id === 'pisces') return t < T.cheer ? { mood: 'heart', tears: 1 } : { mood: 'happy', tears: 3 }
  return t < T.cheer ? { mood: 'neutral', look: [0, 1] } : { mood: 'happy' }
}
function narrState(t) {
  if (t < T.paint) return { mood: 'happy' }
  if (t < T.l1) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.h1) return { mood: 'squint' }
  if (t < T.oh) return { mood: 'eyeroll' }
  if (t < T.cut) return { mood: 'neutral' }
  if (t < T.five) return { mood: 'sparkle', look: [0, -1] }
  return { mood: 'happy' }
}

async function build(stage) {
  try {
    await Promise.all(["800 96px Inter", "800 112px Inter", "italic 500 150px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Game day: | the whole city | wears the | *same* *colors.*', { top: 110, size: 96, accentSize: 124, at: T.h0, gap: 0.07, accentColor: TEAL, wobble: true, late: 2, lateAt: T.paint, lateGap: 0.14, lineHeight: 0.98 })
  const H1 = popText(root, 'Matching | shirts ≠ | *matching* *people.*', { top: 130, size: 108, accentSize: 132, at: T.h1, gap: 0.08, accentColor: PINK, wobble: true, late: 2, lateAt: T.h1Late, lateGap: 0.14 })
  const H2 = popText(root, 'Match on | *more* *than* | *colors.*', { top: 130, size: 112, accentSize: 146, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 3, lateAt: T.h2Late, lateGap: 0.16 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1430, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
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

  function fanPos(t, f) {
    const P = PAIR[f.id]
    if (!P || t < T.move[0]) return { x: f.x, y: f.y, size: f.size }
    const p = ease.inOutCubic(prog(t, ...T.move))
    return { x: lerp(f.x, P.x, p), y: lerp(f.y, P.y, p) - Math.sin(Math.PI * p) * 120, size: lerp(f.size, 150, p) }
  }
  // dim the rest in the last beat (back up for the cheer)
  const dimK = t => t < T.cut ? 0 : ease.inOutQuad(prog(t, T.cut + 0.1, T.rings[1])) * (1 - prog(t, T.cheer - 0.3, T.cheer))

  function drawFan(t, f, ok) {
    const pp = pop01(t, T.stars + f.x * 0.0003 + f.ri * 0.08, 0.36, 2.0) * ok
    if (pp <= 0.02) return null
    const k = tealK(t, f), st = fanState(t, f), p = fanPos(t, f)
    const star = f.id === 'leo' || f.id === 'sagittarius'
    const alpha = star ? 1 : 1 - 0.68 * dimK(t)
    const sob = st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0
    const opts = { hops: HOPS.get(f.id), seed: f.seed, pop: pp, squash: sob }
    const glyph = k > 0.5 || p.size < 120 ? null : f.glyph
    const r = drawStarChar(x, p.x, p.y, p.size, t, { color: mixHex(f.color, TEAL, k), glyph, mood: st.mood, look: st.look, blink: st.blink, glow: 0.9, alpha, ...opts })
    if (st.tears) inSprite(x, starFrame(p.x, p.y, p.size, t, opts), () => tearsCells(x, t, st.tears))
    if (f.ri === 2 && t >= T.oh && t < T.cut) inSprite(x, starFrame(p.x, p.y, p.size, t, opts), () => sweatCells(x, t))
    // a pixel "drain" sparkle as the teal leaves
    const dt0 = T.drain[0] + f.x / 1080 * 0.45 + 0.15
    if (p.size >= 120) sparkles(t, p.x, p.y, dt0, 6, p.size * 0.55, f.seed, [f.color, BONE])
    return r
  }

  function drawNarr(t, ok) {
    const np = pop01(t, T.narr, 0.38, 2.2) * ok
    if (np <= 0.02) return
    const st = narrState(t)
    drawStarChar(x, NARR.x, NARR.y, NARR.size, t, { color: STAR.sky, mood: st.mood, look: st.look, blink: st.blink, glow: 1.1, hops: NARR_HOPS, seed: 3, pop: np })
  }

  function drawLink(t, ok) {
    if (t < T.cut) return
    const L = FANS.find(f => f.id === 'leo'), S = FANS.find(f => f.id === 'sagittarius')
    const a = fanPos(t, L), b = fanPos(t, S)
    const rk = easeOutBack(prog(t, ...T.rings), 1.8) * ok * (1 - prog(t, T.move[0], T.move[0] + 0.3))
    chartRing(x, a.x, a.y, a.size * 0.72, t, rk, L.color)
    chartRing(x, b.x, b.y, b.size * 0.72, -t, rk, S.color)
    const ap = ease.outCubic(prog(t, ...T.arc)) * ok
  const fade = 1 - prog(t, T.move[0], T.move[0] + 0.25)
    if (ap <= 0 || fade <= 0) return
    const mx = (a.x + b.x) / 2, my = Math.min(a.y, b.y) - 220
    x.save(); x.globalAlpha = fade; x.strokeStyle = GOLD; x.lineWidth = 8; x.shadowColor = GOLD; x.shadowBlur = 22; x.lineCap = 'round'
    x.beginPath()
    for (let i = 0; i <= 40 * ap; i++) { const u = i / 40, px = (1 - u) * (1 - u) * a.x + 2 * (1 - u) * u * mx + u * u * b.x, py = (1 - u) * (1 - u) * (a.y - 60) + 2 * (1 - u) * u * my + u * u * (b.y - 60); i ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke(); x.restore()
    // the TRINE chip at the arc's crown
    const ck = pop01(t, T.arc[1] - 0.1, 0.32, 2.2) * ok * (1 - prog(t, T.move[0], T.move[0] + 0.25))
    if (ck > 0.02) {
      const cy = (a.y - 60 + my) / 2 - 20
      x.save(); x.translate(mx, cy); x.scale(ck, ck)
      x.font = `700 30px ${MONO}`; const w = x.measureText('TRINE · 120°').width + 40
      x.fillStyle = 'rgba(16,9,38,0.95)'; x.fillRect(-w / 2, -28, w, 56); x.strokeStyle = GOLD; x.lineWidth = 4; x.strokeRect(-w / 2, -28, w, 56)
      x.fillStyle = GOLD; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('TRINE · 120°', 0, 2)
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      if (t < T.out[1] + 0.02) {
        const dk = 1 - 0.6 * dimK(t)
        // stadium light beams
        x.save(); x.globalCompositeOperation = 'lighter'
        for (const [bx, dir] of [[60, 1], [1020, -1]]) {
          const g = x.createLinearGradient(bx, 560, bx + dir * 500, 1300)
          g.addColorStop(0, `rgba(255,243,220,${0.16 * ok * dk})`); g.addColorStop(1, 'rgba(255,243,220,0)')
          x.fillStyle = g; x.beginPath(); x.moveTo(bx, 560); x.lineTo(bx + dir * 700, 1340); x.lineTo(bx + dir * 200, 1340); x.closePath(); x.fill()
        }
        x.restore()
        // the paint wave: a teal band sweeping across at the paint
        const pw = prog(t, T.paint - 0.05, T.paint + 0.55)
        if (pw > 0 && pw < 1) { x.save(); x.globalCompositeOperation = 'lighter'; const wx = lerp(-200, 1280, pw); const g = x.createLinearGradient(wx - 160, 0, wx + 160, 0); g.addColorStop(0, 'rgba(47,214,196,0)'); g.addColorStop(0.5, 'rgba(47,214,196,0.35)'); g.addColorStop(1, 'rgba(47,214,196,0)'); x.fillStyle = g; x.fillRect(wx - 160, 620, 320, 760); x.restore() }
        let front = []
        for (let ri = 0; ri < ROWS.length; ri++) {
          for (const f of FANS.filter(f => f.ri === ri)) {
            if (t >= T.move[0] && PAIR[f.id]) { front.push(f); continue }
            drawFan(t, f, ok)
          }
          bench(x, ROWS[ri].y + ROWS[ri].size * 0.42, ok * pop01(t, 0.05 + ri * 0.06, 0.4, 1.4) * dk)
        }
        drawNarr(t, ok)
        drawLink(t, ok)
        for (const f of front) drawFan(t, f, ok)
        // "we match!" heart between the front pair, then it drops
        if (t >= T.spot + 0.15 && t < T.cut) {
          const hk = easeOutBack(prog(t, T.spot + 0.15, T.spot + 0.5), 2.6)
          const fall = ease.inQuad(prog(t, T.oh, T.oh + 0.7))
          heart(x, 540, 1125 + fall * 400 - 6 * Math.sin(t * 5), 12 * hk, ok * (1 - fall))
        }
        if (t >= T.five) {
          sparkles(t, 540, 650, T.five, 12, 160, 2, [GOLD, PINK, BONE])
          const hk = easeOutBack(prog(t, T.five, T.five + 0.35), 2.6)
          heart(x, 540, 655 - 6 * Math.sin(t * 4), 10 * hk, ok)
        }
        if (t >= T.cheer) sparkles(t, 540, 1000, T.cheer, 16, 440, 4, [TEAL, GOLD, PINK, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.55 (hook → matching shirts), 9.3 (→ match on more than colors), 13.0.
// cardfx keeps one for a 20 s film: the 9.3 flip, which hides the crowd snapping back to true colours.
const CUTS = [4.55, { t: 9.3, kind: 'flip' }, 13.0]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop/pluck/bell are re-keyed by the engine; chip/tom/clap sit on a private sfx bus)
const NOTE = [392, 440, 493.88, 587.33, 659.25, 783.99, 880]   // G major
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 783.99, 0.05, 0], ['pluck', land, 783.99, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])
const cheers = (t0, t1, n = 14, gain = 0.07) => { const out = [['swell', t0, t1, { bus: 'sfx', gain: 0.045, f0: 900, f1: 2600 }]]; for (let k = 0; k < n; k++) out.push(['clap', +(t0 + 0.1 + k * 0.12 + (k * 0.037) % 0.06).toFixed(3), { ...FX, gain, pan: ((k * 0.61) % 1) - 0.5 }]); return out }

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...wordPops(T.h0, 7, 0.07, 0, 0.024),
  ...Array.from({ length: 12 }, (_, i) => ['pop', +(T.stars + 0.05 + i * 0.035).toFixed(3), NOTE[i % 7] * 2, 0.022, (i % 3 - 1) * 0.3]),
  ['pop', T.narr + 0.05, 587.33, 0.04, 0],
  // the paint wave
  ['whoosh', T.paint - 0.05, 0.55, 0.07], ['pop', T.paint, 783.99, 0.05, 0], ['pop', T.paint + 0.14, 987.77, 0.05, 0], ['glitter', T.paint, T.paint + 0.6],
  ...cheers(T.paint + 0.1, T.paint + 1.2, 8, 0.05),
  ['whoosh', T.wave, 0.6, 0.05], ...cheers(T.wave, T.wave + 0.9, 6, 0.05),
  ...sob(T.wave + 0.3, 1400), ...sob(T.wave + 1.2, 1320, 2),
  ['pop', T.open, 587.33, 0.04, 0], ['pop', T.open + 0.06, 783.99, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SKY]: 660 } }),
  // matching shirts
  ...head(T.h1, 3, 0.08, T.h1Late, 2), ['pop', T.h1Late + 0.14, 880, 0.045, 0],
  ['pluck', T.spot, 1174.66, 0.04, 0.5, -0.3], ['pluck', T.spot + 0.1, 1567.98, 0.04, 0.5, 0.3], ['pop', T.spot + 0.2, 1318.51, 0.04, 0],
  ['riser', T.drain[0] - 0.3, T.drain[1], 0.02], ...Array.from({ length: 6 }, (_, i) => ['pop', +(T.drain[0] + i * 0.1).toFixed(3), NOTE[6 - i], 0.025, (i - 2.5) * 0.15]),
  ['chip', T.oh, 330, 0.4, { ...FX, wave: 'tri', slide: -10, gain: 0.03, decay: 0.3, sustain: 0.5 }], ['whoosh', T.oh + 0.1, 0.5, 0.03],
  ...sob(7.4, 1400), ...sob(8.4, 1350, 2),
  // match on more than colours
  ...head(T.h2, 2, 0.08, T.h2Late, 3), ['pop', T.h2Late + 0.16, 880, 0.045, 0], ['pop', T.h2Late + 0.32, 987.77, 0.05, 0],
  ['bell', T.rings[0] + 0.1, 1174.66, 0.04, 1.6, -0.3], ['bell', T.rings[0] + 0.2, 1479.98, 0.04, 1.6, 0.3],
  ['riser', T.arc[0], T.arc[1], 0.03], ['bell', T.arc[1], 1567.98, 0.045, 1.8, 0], ['glitter', T.arc[1], T.arc[1] + 0.6],
  ['whoosh', T.move[0], 0.5, 0.05], ['clap', T.five, { ...FX, gain: 0.22 }], ['pop', T.five, 1567.98, 0.05, 0], ['glitter', T.five, T.five + 0.6],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...cheers(T.cheer, T.cheer + 1.8), ...sob(T.cheer + 0.3, 1568), ...sob(T.cheer + 1.0, 1660, 2),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
