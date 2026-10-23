// elements (15 s, vertical) — "The 4 elements in 15 seconds."
// Hook: the title + a big stopwatch counting down from 15, ringed by four mini element icons; the stopwatch then shrinks to
// the top-left corner and keeps ticking all film. Four panels (2.5 s each, on the 108 bpm grid), one per element:
//   FIRE  a flame that flares on "Go."         · EARTH a mountain that grows a sprout, blooming on "Build."
//   AIR   a wind swirl that puffs gusts on "Talk." · WATER a curling wave that surges on "Feel."
// each with its three sign glyphs popping into badges as the names pop in the headline.
// End: "Which one are you?" with the four icons bouncing in a 2×2 grid → fade to black (last frame black). Pure f(t).
import { lerp, prog, ease, el, rng, clamp, C } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, ELEMENT_COLOR, easeOutBack } from '../../wheel.js'
import { flame, mountain, wind, gusts, wave, stopwatch, hexA, BONE } from './illus.js'

export const DURATION = 15
const T_END = 15.0, T_OUT = 14.3
const beat = n => 0.6 + n * 0.5556
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const GLYPH_FONT = "'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif"
const GOLD = '#f2c75c'
const VS = '︎'

// ── timing
const TITLE = 0.05, TITLE_ACC = 0.36, TITLE_OUT = 2.05
const WATCH_IN = 0.2, MINI = [beat(1), beat(1.5), beat(2), beat(2.5)].map(x => x - 0.3)   // ≈0.86 … 1.69
const PANEL = [beat(3), beat(7.5), beat(12), beat(16.5)]                                    // 2.27, 4.77, 7.27, 9.77
const P_LEN = 2.5
const NAME_DT = [0.24, 0.36, 0.48]
const PUNCH_DT = 0.833                                                                       // on the half-beat
const OUT_DT = 2.28
const END_T = beat(21), END_YOU = END_T + 0.42, GRID_T = [0, 1, 2, 3].map(i => END_T + 0.12 + i * 0.12)

const ELS = [
  { id: 'fire', name: 'Fire:', col: ELEMENT_COLOR.fire, txt: ELEMENT_COLOR.fire, word: 'Go.', signs: ['aries', 'leo', 'sagittarius'] },
  { id: 'earth', name: 'Earth:', col: ELEMENT_COLOR.earth, txt: ELEMENT_COLOR.earth, word: 'Build.', signs: ['taurus', 'virgo', 'capricorn'] },
  { id: 'air', name: 'Air:', col: ELEMENT_COLOR.air, txt: ELEMENT_COLOR.air, word: 'Talk.', signs: ['gemini', 'libra', 'aquarius'] },
  { id: 'water', name: 'Water:', col: ELEMENT_COLOR.water, txt: '#6f9dff', word: 'Feel.', signs: ['cancer', 'scorpio', 'pisces'] },
].map(e => ({ ...e, S: e.signs.map(id => SIGNS.find(s => s.id === id)) }))

const sp = (t, a, d = 0.4, s = 2.0) => easeOutBack(prog(t, a, a + d), s)
const out = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))
const pulse = (t, a, k = 3) => (t < a ? 0 : Math.exp(-(t - a) * k))

const SPARK_COLS = ['#ffd98a', '#f2c75c', '#ff8fb1', '#c9a6ff', '#8fd8f6', '#fff3e0']
function sparkle(ctx, x, y, t, t0, { n = 10, rad: R = 150, seed = 1, cols = SPARK_COLS, size = 28 } = {}) {
  const tt = t - t0
  if (tt < 0 || tt > 0.8) return
  const r = rng(seed)
  ctx.save(); ctx.imageSmoothingEnabled = false
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + r() * 0.5, d = R * (0.6 + 0.5 * r()), col = cols[Math.floor(r() * cols.length)], kind = Math.floor(r() * 3)
    const p = ease.outCubic(Math.min(1, tt / 0.6))
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, tt - 0.25) / 0.55)
    drawPixelStar(ctx, x + Math.cos(a) * d * p, y + Math.sin(a) * d * p, size * (1 - 0.35 * p), kind, col)
  }
  ctx.restore()
}

function popWord(span, t, t0, { out = 1e9, dur = 0.28, back = 1.9, wobble = false } = {}) {
  const p = prog(t, t0, t0 + dur), q = ease.inQuad(prog(t, out, out + 0.2))
  const sc = lerp(0.6, 1, easeOutBack(p, back)) * (1 - 0.4 * q)
  const tt = t - t0
  const rot = wobble && tt > 0 ? 9 * Math.exp(-tt * 4) * Math.sin(tt * 18) : 0
  span.style.opacity = String(Math.min(1, p * 3) * (1 - q))
  span.style.transform = `translateY(${lerp(30, 0, ease.outCubic(p)) - 20 * q}px) scale(${sc}) rotate(${rot}deg)`
}

/** one element icon, centred at (x, y), scale s; act 0–1 = its "punch" action, grow 0–1 = earth's sprout */
function icon(ctx, i, x, y, s, t, { act = 0, grow = 0.35, bloom = 0, gust = 0 } = {}) {
  if (s <= 0.01) return
  if (i === 0) flame(ctx, x, y + 30 * s, s * (1 + 0.28 * act), t, { roar: 0.7 * act, seed: 1.3 })
  else if (i === 1) mountain(ctx, x, y + 70 * s, s, t, { sprout: grow, bloom })
  else if (i === 2) {
    if (gust > 0.003) gusts(ctx, x - 470 * s / 1.4, x + 470 * s / 1.4, y + 10, t, gust)
    wind(ctx, x, y, s, t, { puff: act })
  } else wave(ctx, x, y + 20 * s, s * 0.95, t, { surge: act })
}

export const SCENES = [async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await Promise.all([`800 108px Inter`, `800 150px Inter`, `700 62px Inter`, `italic 500 160px 'EB Garamond'`, `bold 90px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))
  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // words → spans. A word is a string, '\n', or { w, col, accent?, size? } (accent = EB Garamond italic; else bold Inter in a colour)
  const line = (words, { top, size = 108, lh = 1.04, weight = '800' }) => {
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: weight,
      fontSize: size + 'px', lineHeight: String(lh), color: BONE, textShadow: shadow, letterSpacing: '-0.02em' }, root)
    const spans = []
    words.forEach(w => {
      if (w === '\n') { el('br', {}, box); return }
      const o = typeof w === 'object'
      const acc = o && w.accent !== false
      const s = el('span', { display: 'inline-block', opacity: 0, margin: '0 0.11em', transformOrigin: '50% 70%',
        ...(o ? { color: w.col, textShadow: `0 0 28px ${w.col}66, ${shadow}` } : {}),
        ...(o && w.size ? { fontSize: w.size + 'px' } : {}),
        ...(acc ? { fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', letterSpacing: '0' } : {}) }, box, o ? w.w : w)
      spans.push(s)
    })
    return spans
  }

  const title = line(['The', '4', 'elements', '\n', 'in', { w: '15 seconds.', col: GOLD, size: 132 }], { top: 190, size: 124 })
  const heads = ELS.map(e => line([{ w: e.name, col: e.txt, accent: false, size: 158 }, '\n', ...e.S.map((s, k) => s.name + (k < 2 ? ',' : '.'))], { top: 168, size: 96, lh: 1.08 }))
  const punch = ELS.map(e => line([{ w: e.word, col: e.txt, size: 200 }], { top: 1450, size: 200, lh: 1 }))
  const endW = line(['Which', 'one', '\n', 'are', { w: 'you?', col: GOLD, size: 172 }], { top: 180, size: 140, lh: 1.02 })

  // element labels for the end grid
  const LBL = ['FIRE', 'EARTH', 'AIR', 'WATER']
  const GRID = [[300, 850], [780, 850], [300, 1330], [780, 1330]]
  const labels = LBL.map((txt, i) => el('div', { position: 'absolute', left: (GRID[i][0] - 200) + 'px', width: '400px', top: (GRID[i][1] + 165) + 'px', textAlign: 'center',
    fontFamily: MONO, fontWeight: '700', fontSize: '38px', letterSpacing: '0.22em', textIndent: '0.22em', color: ELS[i].txt, textShadow: shadow, opacity: 0 }, root, txt))

  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 0 })

  const words = (arr, t, times, outT) => arr.forEach((w, i) => popWord(w, t, times[i], { out: outT + i * 0.02 }))

  // glyph badge: a ring in the element colour with the sign glyph in its own colour
  const badge = (ctx, x, y, s, sg, ecol, a = 1) => {
    if (s <= 0.01 || a <= 0.003) return
    ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha *= a
    ctx.beginPath(); ctx.arc(0, 0, 78, 0, Math.PI * 2)
    ctx.fillStyle = hexA(sg.color, 0.22); ctx.fill()
    ctx.shadowColor = ecol; ctx.shadowBlur = 18; ctx.strokeStyle = ecol; ctx.lineWidth = 7; ctx.stroke()
    ctx.font = `bold 96px ${GLYPH_FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.shadowColor = sg.color; ctx.shadowBlur = 22; ctx.fillStyle = sg.color; ctx.fillText(sg.glyph + VS, 0, 6)
    ctx.shadowBlur = 0; ctx.fillStyle = '#fff3e0'; ctx.globalAlpha *= 0.85; ctx.fillText(sg.glyph + VS, 0, 6)
    ctx.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      fxx.clearRect(0, 0, W, H)

      // ── element colour wash behind the icon (crossfades panel to panel)
      for (let i = 0; i < 4; i++) {
        const p0 = PANEL[i], w = ease.inOutQuad(prog(t, p0 - 0.15, p0 + 0.3)) * out(t, p0 + OUT_DT, 0.35) * (1 + 0.5 * pulse(t, p0 + PUNCH_DT, 2.5))
        if (w <= 0.003) continue
        const g = bx.createRadialGradient(540, 960, 0, 540, 960, 760)
        g.addColorStop(0, hexA(ELS[i].col, 0.26 * Math.min(1.5, w))); g.addColorStop(1, hexA(ELS[i].col, 0))
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(0, 200, W, 1520); bx.globalCompositeOperation = 'source-over'
      }

      // ── hook: the big stopwatch + four mini icons → stopwatch shrinks to the top-left corner
      const fly = ease.inOutCubic(prog(t, TITLE_OUT, TITLE_OUT + 0.45))
      const wIn = sp(t, WATCH_IN, 0.45, 2.2)
      const wx = lerp(540, 112, fly), wy = lerp(1060, 112, fly), ws = lerp(2.05, 0.4, fly) * wIn
      const tick = t < TITLE_OUT ? 0.06 * pulse(t, Math.floor(t), 9) * Math.sin((t % 1) * 40) : 0
      const endBob = t > END_T ? 0.08 * pulse(t, END_YOU, 4) * Math.sin((t - END_YOU) * 20) : 0
      stopwatch(bx, wx, wy, ws * (1 + 0.04 * pulse(t, Math.floor(t), 8)), Math.min(1, t / DURATION), { num: fly < 0.5 ? Math.max(0, Math.ceil(DURATION - t - 1e-6)) : null, rot: tick + endBob })
      if (t < TITLE_OUT + 0.4) {
        const MP = [[215, 740], [875, 740], [215, 1390], [875, 1390]]
        for (let i = 0; i < 4; i++) {
          const s = 0.62 * sp(t, MINI[i], 0.4, 2.3) * out(t, TITLE_OUT - 0.05 + i * 0.04, 0.22)
          const bob = 10 * Math.sin(t * 5 + i * 1.6)
          icon(bx, i, MP[i][0], MP[i][1] + bob, s, t)
          sparkle(fxx, MP[i][0], MP[i][1], t, MINI[i] + 0.1, { n: 8, rad: 120, seed: 10 + i, size: 22, cols: [ELS[i].col, '#fff3e0', '#ffd98a'] })
        }
      }
      sparkle(fxx, 540, 1060, t, WATCH_IN + 0.15, { n: 12, rad: 260, seed: 5, size: 30 })

      // ── panels
      for (let i = 0; i < 4; i++) {
        const p0 = PANEL[i], E = ELS[i]
        if (t < p0 - 0.05 || t > p0 + P_LEN + 0.05) continue
        const gone = out(t, p0 + OUT_DT, 0.22)
        const s = 1.4 * sp(t, p0 + 0.06, 0.45, 2.2) * gone
        const P = p0 + PUNCH_DT
        const act = i === 0 ? 0.25 + 0.75 * clamp(sp(t, P, 0.35, 2.4)) * (0.6 + 0.4 * pulse(t, P + 0.35, 1.2))
          : i === 2 ? clamp(sp(t, P, 0.35, 2.4)) * (0.5 + 0.5 * pulse(t, P + 0.3, 1.5))
          : i === 3 ? clamp(sp(t, P, 0.5, 2.0)) * (0.7 + 0.3 * Math.sin((t - P) * 4)) : 0
        const grow = i === 1 ? easeOutBack(prog(t, p0 + 0.3, p0 + 0.85), 1.6) : 0
        const bloom = i === 1 ? easeOutBack(prog(t, P, P + 0.4), 2.6) : 0
        const gust = i === 2 ? ease.outQuad(prog(t, P, P + 0.25)) * gone : 0
        const squash = 1 + 0.1 * pulse(t, P, 6) * Math.sin((t - P) * 26)
        icon(bx, i, 540, 930, s * squash, t, { act, grow, bloom, gust })
        sparkle(fxx, 540, 930, t, p0 + 0.2, { n: 10, rad: 260, seed: 30 + i, size: 28, cols: [E.col, '#fff3e0', '#ffd98a'] })
        sparkle(fxx, 540, i === 1 ? 640 : 860, t, P + 0.05, { n: 14, rad: 300, seed: 40 + i, size: 32, cols: [E.col, GOLD, '#fff3e0'] })
        // the three glyph badges
        E.S.forEach((sg, k) => {
          const t0 = p0 + NAME_DT[k] + 0.03
          const bs = sp(t, t0, 0.4, 2.6) * out(t, p0 + OUT_DT + 0.03 * k, 0.2)
          const hop = 14 * Math.abs(Math.sin((t - t0) * 5.65)) * pulse(t, t0 + 0.4, 2)
          badge(bx, 250 + k * 290, 1335 - hop, 0.95 * bs, sg, E.col)
          sparkle(fxx, 250 + k * 290, 1335, t, t0 + 0.12, { n: 7, rad: 110, seed: 50 + i * 3 + k, size: 20, cols: [sg.color, '#fff3e0'] })
        })
        sparkle(fxx, 540, 1560, t, P + 0.12, { n: 12, rad: 230, seed: 60 + i, size: 26, cols: [E.col, '#fff3e0', GOLD] })
      }

      // copy for every panel (always updated so nothing lingers when frames are skipped)
      PANEL.forEach((p0, i) => {
        words(heads[i], t, [p0 + 0.04, ...NAME_DT.map(d => p0 + d)], p0 + OUT_DT)
        popWord(punch[i][0], t, p0 + PUNCH_DT, { out: p0 + OUT_DT + 0.05, dur: 0.32, back: 2.8, wobble: true })
      })

      // ── end: 2×2 grid of bouncing icons
      if (t >= END_T) {
        for (let i = 0; i < 4; i++) {
          const t0 = GRID_T[i], s = 0.92 * sp(t, t0, 0.42, 2.3)
          const ph = ((t - END_T - 0.6 - i * 0.1389) / 0.5556)
          const hopOn = prog(t, t0 + 0.4, t0 + 0.6)
          const u = ph - Math.floor(ph)
          const hop = ph > 0 ? 70 * Math.sin(Math.PI * u) * hopOn : 0
          const sq = ph > 0 ? 1 + 0.12 * Math.exp(-u * 10) * hopOn : 1
          bx.save(); bx.translate(GRID[i][0], GRID[i][1] + 90); bx.scale(1 / sq, sq); bx.translate(-GRID[i][0], -GRID[i][1] - 90)
          icon(bx, i, GRID[i][0], GRID[i][1] - hop, s, t, { act: i === 0 ? 0.3 : i === 3 ? 0.4 : 0, grow: 0.8, bloom: i === 1 ? 1 : 0 })
          bx.restore()
          sparkle(fxx, GRID[i][0], GRID[i][1], t, t0 + 0.1, { n: 9, rad: 150, seed: 70 + i, size: 24, cols: [ELS[i].col, '#fff3e0', '#ffd98a'] })
          const lp = sp(t, t0 + 0.08, 0.35, 2.2)
          labels[i].style.opacity = String(Math.min(1, lp * 3))
          labels[i].style.transform = `scale(${lerp(0.6, 1, lp)})`
        }
        sparkle(fxx, 760, 360, t, END_YOU + 0.15, { n: 14, rad: 280, seed: 88, size: 34 })
      } else labels.forEach(l => (l.style.opacity = '0'))

      // ── copy
      title.forEach((w, i) => popWord(w, t, i === 4 ? TITLE_ACC : TITLE + i * 0.06, { out: TITLE_OUT + i * 0.02, ...(i === 4 ? { back: 2.6, dur: 0.32, wobble: true } : {}) }))
      sparkle(fxx, 680, 420, t, TITLE_ACC + 0.15, { n: 12, rad: 240, seed: 3, size: 30 })
      endW.forEach((w, i) => i === 3 ? popWord(w, t, END_YOU, { back: 2.8, dur: 0.36, wobble: true }) : popWord(w, t, END_T + i * 0.08))

      drawGrain(gx, t)
      black.style.opacity = String(t >= T_END - 0.035 ? 1 : 1 - ease.outQuad(prog(t, 0, 0.4)) + ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}]

// ── sound (D major pentatonic melody; every pop-in gets a note)
const NOTES = [[784, 880, 988, 1175], [880, 988, 1175, 1318], [988, 1175, 1318, 1480], [1175, 1318, 1480, 1568]]
export const CUES = [
  ['riser', 0, 0.4, 0.02],
  ...[659, 740, 880].map((f, i) => ['pop', TITLE + i * 0.06, f, 0.05, (i - 1) * 0.2]),
  ['pop', TITLE_ACC, 1175, 0.065, 0.1], ['bell', TITLE_ACC + 0.02, 1174.66, 0.025, 1.2, 0.1], ['glitter', TITLE_ACC + 0.1, TITLE_ACC + 0.6],
  ['pop', WATCH_IN, 587, 0.05, 0],
  ['tick', 1.0, 0.04], ['tick', 2.0, 0.04],
  ...MINI.map((t, i) => ['pop', t, [880, 988, 1175, 1318][i], 0.055, [-0.4, 0.4, -0.4, 0.4][i]]),
  ...[0, 1, 2, 3].map(i => ['pop', TITLE_OUT + i * 0.04, [1175, 988, 880, 740][i], 0.035, (i - 1.5) * 0.3]),
  ['whoosh', TITLE_OUT + 0.05, 0.45, 0.035],
  ...PANEL.flatMap((p0, i) => [
    ['whoosh', p0 - 0.12, 0.35, 0.03],
    ['pop', p0 + 0.04, NOTES[i][0] * 0.75, 0.065, 0],
    ['pop', p0 + 0.06, 587, 0.04, 0],
    ...NAME_DT.map((d, k) => ['pop', p0 + d, NOTES[i][k + 1] * (k === 2 ? 1 : 1), 0.055, (k - 1) * 0.45]),
    ['pop', p0 + PUNCH_DT, NOTES[i][3] * 1.335, 0.07, 0],
    ['pluck', p0 + PUNCH_DT, [293.66, 329.63, 369.99, 440][i], 0.055, 0.7, 0],
    i === 0 ? ['whoosh', p0 + PUNCH_DT - 0.05, 0.5, 0.04] : i === 2 ? ['whoosh', p0 + PUNCH_DT, 0.6, 0.045] : i === 3 ? ['whoosh', p0 + PUNCH_DT - 0.05, 0.7, 0.04] : ['bell', p0 + PUNCH_DT + 0.02, 1568, 0.025, 1.0, 0.2],
    ['glitter', p0 + PUNCH_DT + 0.05, p0 + PUNCH_DT + 0.5],
  ]),
  ['boom', PANEL[0] + PUNCH_DT, 0.06],
  ...[659, 784, 880, 988].map((f, i) => ['pop', END_T + i * 0.08, f, 0.05, (i - 1.5) * 0.15]),
  ...GRID_T.map((t, i) => ['pop', t, [784, 988, 1175, 1318][i], 0.045, [-0.4, 0.4, -0.4, 0.4][i]]),
  ['pop', END_YOU, 1568, 0.07, 0], ['bell', END_YOU + 0.02, 1174.66, 0.035, 1.8, 0], ['glitter', END_YOU + 0.1, END_YOU + 0.9],
  ...[0, 1, 2].map(n => ['tick', END_T + 0.6 + n * 0.5556 + 0.28, 0.025]),
  ['bell', T_OUT + 0.05, 293.66, 0.03, 2.0, 0],
]
