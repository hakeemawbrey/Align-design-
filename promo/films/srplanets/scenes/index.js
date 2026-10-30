// srplanets — "Every planet in 30 seconds." (30 s vertical, Star Talk Remix of promo/films/planets; music: screwed, A).
// THE STARS give you a speed-run tour of your chart: a gold guide star with a TOUR pennant rides along as the ten
// planets fly past (one bar each, like the original), roasting a little and falling behind schedule; the outer three
// whip past at double speed, the guide collapses, and the ten orbs swirl round one person. Story 0–25.6, then the end card.
//   0.00–2.6   "Every planet | in *30 seconds.*"  ring of ten mini orbs round a gold stopwatch; the guide pops in with its
//              flag. THE STARS: "ten planets. thirty seconds. keep *up.*"
//   2.82 + 2.222·i  planets land on the downbeat (fly in from the right, off to the left), name up top, one-liner under it,
//              each with its icon gag, and the guide reacts:
//     ☉ Sun 2.82 (spotlights) "the Sun's one of us. *hi, mom.*" (it waves) · ☽ Moon 5.04 (blanket; the guide dozes) ·
//     ☿ Mercury 7.27 (phone) "Mercury's typing… still *typing.*" · ♀ Venus 9.49 (heart; heart-eyes) ·
//     ♂ Mars 11.71 (sprinter) "we're behind schedule. *faster.*" (sweat) · ♃ Jupiter 13.93 (clover) ·
//     ♄ Saturn 16.16 (stern clock) "Saturn. sit up *straight.*" (the guide stands up tall)
//   18.38      the outer run, half a bar each: ♅ Uranus 18.38 · ♆ Neptune 19.49 (♓ Pisces pops up crying: NEPTUNE'S KID) ·
//              ♇ Pluto 20.60 (butterfly + "dwarf planet. Still counts.").  THE STARS: "outer planets! go go *go!*"
//   22.82      "Ten planets. | *One you.*"  the guide flops, out of breath; the ten orbs swirl in round a person, burst 23.93,
//              the guide hops up. THE STARS: "they're all *yours.*"
//   25.6       end card.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { W, H, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes, STAR, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { orb, sparkle, spotlights, blanket, phoneChat, beatingHeart, sprinter, clover, sternClock, bolt, dreamCloud, butterfly, sticker, stopwatch, person, GLYPH_FONT, VS, GOLD, PINK } from './illus.js'
import { starFrame, cellToWorld, inSprite, tearsCells, sweatDrop, drawChip, tourFlag, speedStreaks } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN          // 25.6
const beat = n => +(0.6 + n * 0.5556).toFixed(3)
const BAR = 4 * 0.5556
const MONO = "'Space Mono', ui-monospace, monospace"
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 6px rgba(6,4,18,0.7)'
const PIS = signStar('pisces')
const TAG = 'THE STARS · TOUR GUIDE'

// ── the ten (art from the original)
export const PLANETS = [
  { id: 'sun', name: 'Sun', glyph: '☉', col: '#f7b733', r: 190, line: 'who *you* are', gs: 1.0 },
  { id: 'moon', name: 'Moon', glyph: '☽', col: '#dfe7ff', r: 165, line: 'what you *need*' },
  { id: 'mercury', name: 'Mercury', glyph: '☿', col: '#8fd8f6', r: 150, line: 'how you *talk* & text' },
  { id: 'venus', name: 'Venus', glyph: '♀', col: '#ff8fb1', r: 165, line: 'what you *love*' },
  { id: 'mars', name: 'Mars', glyph: '♂', col: '#f0603a', r: 155, line: 'how you *go for it*', glyphCol: '#fff3e0', gy: 0.08 },
  { id: 'jupiter', name: 'Jupiter', glyph: '♃', col: '#e9a15a', r: 205, line: 'where you get *lucky*', gs: 0.95 },
  { id: 'saturn', name: 'Saturn', glyph: '♄', col: '#e9cf8a', r: 160, line: 'where you *grow up*', ring: true },
  { id: 'uranus', name: 'Uranus', glyph: '♅', col: '#7fe0d8', r: 165, line: 'where you *rebel*', ring: true },
  { id: 'neptune', name: 'Neptune', glyph: '♆', col: '#4f7cf0', r: 170, line: 'where you *dream*', glyphCol: '#fff3e0' },
  { id: 'pluto', name: 'Pluto', glyph: '♇', col: '#c9a6ff', r: 115, line: 'where you *transform*' },
]
// inner seven: one bar each from beat 4; outer three: half a bar each (the guide can't keep up)
const SLOT = [...PLANETS.slice(0, 7).map((_, i) => beat(4 + 4 * i)), beat(32), beat(34), beat(36)]
const END_T = beat(40), END_ONE = beat(41), BURST = beat(42)
const SLOT_END = SLOT.map((s, i) => (i < 9 ? SLOT[i + 1] : END_T))
const TXT_OUT = SLOT_END.map((e, i) => e - (i >= 6 ? 0.34 : 0.36))
const FAST = i => i >= 7
const OX = 540, OY = 800
const HOOK_OUT = 2.42
const STICK = SLOT[9] + 1.11
const ACC = PLANETS.map(p => (p.col === '#4f7cf0' ? '#8fb0ff' : p.col))
const RUN = [SLOT[7] - 0.2, END_T]                 // the outer run
const NEP = [SLOT[8] - 0.1, END_T]                 // Pisces in the corner

// ── the box
const LINES = [
  { t: 0.4, speaker: TAG, text: 'ten planets. thirty seconds. *go.*' },
  { t: 3.5, speaker: TAG, text: "the Sun's one of us. *hi, mom.*" },
  { t: 7.55, speaker: TAG, text: "Mercury's typing… still *typing.*" },
  { t: 11.95, speaker: TAG, text: "we're behind schedule. *faster.*" },
  { t: 16.4, speaker: TAG, text: 'Saturn. sit up *straight.*' },
  { t: 19.3, speaker: TAG, text: 'outer planets! go go *go!*' },
  { t: 22.95, speaker: TAG, text: "they're all *yours.*" },
]
const CPS = 28
const LT = lineTimes(LINES, { cps: CPS })
const BOX_CLOSE = 25.42
const HOPS = [...talkHops(LINES, TAG, { cps: CPS }), BURST + 0.05, SLOT[6] + 0.1]
const WAVE = [LT[1].chars[22], LT[1].chars[22] + 0.5]   // the "hi, mom." wave

// cuts: Mercury → Venus and Jupiter → Saturn (both kept; ≈ one per 12–13 s)
const CUTS = [{ t: +(SLOT[3] - 0.32).toFixed(3), kind: 'flip', keep: true }, { t: +(SLOT[6] - 0.32).toFixed(3), kind: 'deal', keep: true }]

const sp = (t, a, d = 0.4, s = 2.0) => easeOutBack(prog(t, a, a + d), s)
const out = (t, a, d = 0.25) => 1 - ease.inQuad(prog(t, a, a + d))
const inR = (t, a, b) => t >= a && t < b
const bump = (t, t0, d = 0.3) => { const k = t - t0; return k < 0 || k > d ? 0 : Math.sin(Math.PI * k / d) }
const curPlanet = t => { let c = -1; SLOT.forEach((s, i) => { if (t >= s - 0.3 && t < SLOT_END[i]) c = i }); return c }

// ring of ten mini orbs (hook + end)
function miniRing(bx, t, k, { cx = OX, cy = 900, R = 300, rot = 0, size = 48, t0 = 0, spread = 0 }) {
  PLANETS.forEach((P, i) => {
    const pin = easeOutBack(prog(t, t0 + i * 0.045, t0 + i * 0.045 + 0.42), 2.0)
    if (pin <= 0.001) return
    const an = -Math.PI / 2 + i * Math.PI * 2 / 10 + rot
    const d = R * pin * (1 + spread)
    orb(bx, P, cx + Math.cos(an) * d, cy + Math.sin(an) * d * 0.92, size * (0.6 + 0.4 * pin), t, { a: k })
  })
}
const thumpAt = t0 => t => { if (t < t0 + 0.55) return 0; const u = (t - (t0 + 0.55)) % 0.5556; return Math.exp(-u * 9) }
const clockSteps = t0 => t => { const u = t - (t0 + 0.55); if (u < 0) return { n: 0, jolt: 0 }; const k = Math.floor(u / 0.5556) + 1, f = u - (k - 1) * 0.5556; return { n: k - 1 + easeOutBack(clamp(f / 0.14), 3), jolt: Math.exp(-f * 10) } }

// ── the guide star
const GX = 185, GY = 1255, GS = 228
function guideState(t) {
  const st = { mood: 'happy', look: [1, -1], squash: 0, sweat: 0, dx: 0, run: 0, wave: 0, pop: sp(t, 0.25, 0.4, 2.4) }
  const c = curPlanet(t), id = c >= 0 ? PLANETS[c].id : null
  if (t < SLOT[0] - 0.3) { st.mood = t < 1.3 ? 'wide' : 'happy'; st.look = t < 1.3 ? [0, 0] : [1, -1] }
  else if (id === 'sun') { st.mood = inR(t, WAVE[0], WAVE[0] + 1.2) ? 'wink' : t < LINES[1].t ? 'sparkle' : 'happy'; st.wave = inR(t, WAVE[0], WAVE[0] + 1.3) ? 1 : 0 }
  else if (id === 'moon') { st.mood = t > SLOT[1] + 0.6 ? 'sleepy' : 'neutral'; st.look = [1, -1] }
  else if (id === 'mercury') { st.mood = 'wide'; st.look = [1, -1] }
  else if (id === 'venus') { st.mood = 'heart'; st.look = [1, -1] }
  else if (id === 'mars') { st.mood = t < LINES[3].t ? 'wide' : 'squint'; st.sweat = t > LINES[3].t ? 1 : 0; st.look = [1, 0] }
  else if (id === 'jupiter') { st.mood = 'sparkle'; st.sweat = 1 }
  else if (id === 'saturn') { st.mood = 'wide'; st.look = [1, -1]; st.squash = -0.13 * clamp(prog(t, SLOT[6] + 0.1, SLOT[6] + 0.3)) + 0.14 * bump(t, SLOT[6] + 0.05, 0.25) }
  else if (id === 'uranus') { st.mood = 'wide'; st.squash = 0.16 * bump(t, SLOT[7] + 0.5, 0.3); st.sweat = 1 }
  else if (id === 'neptune' || id === 'pluto') { st.mood = t > STICK ? 'heart' : 'squint'; st.sweat = 1; st.look = [1, 0] }
  if (inR(t, RUN[0], RUN[1])) { st.run = clamp(prog(t, RUN[0], RUN[0] + 0.3)); st.dx = 10 * Math.sin(t * 26) * st.run }
  if (t >= END_T - 0.05) {
    if (t < BURST) { st.mood = 'sleepy'; st.squash = 0.26 * clamp(prog(t, END_T - 0.05, END_T + 0.12)); st.sweat = 1; st.look = [0, 1]; st.run = 0; st.dx = 0 }
    else { st.mood = t < LINES[6].t ? 'wide' : 'happy'; st.look = [1, -1] }
  }
  return st
}

async function build(stage) {
  const root = fill(stage, { background: '#05040c' })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await Promise.all([`800 108px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `italic 600 118px 'EB Garamond'`, `700 34px 'Space Mono'`, `700 52px 'Space Mono'`, `100px 'DejaVu Sans'`].map(f => document.fonts.load(f).catch(() => {})))
  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')

  // ── copy
  const hook = popText(root, 'Every planet | in *30 seconds.*', { top: 150, size: 112, at: 0.1, gap: 0.08, accentSize: 132, late: 2, lateAt: 0.5, wobble: true })
  const eye = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '108px', textAlign: 'center', fontFamily: MONO, fontWeight: '700', fontSize: '34px',
    letterSpacing: '0.25em', textIndent: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, '')
  const names = PLANETS.map((P, i) => popText(root, P.name, { top: 160, size: 150, at: SLOT[i] - 0.22 }))
  const lines = PLANETS.map((P, i) => popText(root, P.line, { top: 335, size: 74, weight: 700, at: SLOT[i] - 0.04, gap: FAST(i) ? 0.04 : 0.06, accentColor: ACC[i], accentSize: 90 }))
  const endL = popText(root, 'Ten planets. | *One you.*', { top: 150, size: 132, at: END_T, gap: 0.1, late: 2, lateAt: END_ONE, lateGap: 0.08, wobble: true, accentSize: 168 })
  const box = dialogueBox(root, { lines: LINES, y: 1428, width: 960, height: 260, cps: CPS, close: BOX_CLOSE })
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 1 })

  function drawGuide(t) {
    const st = guideState(t)
    if (st.pop <= 0.001) return
    const x = GX + st.dx
    speedStreaks(bx, t, x, GY, st.run * 0.9)
    const opts = { color: STAR.sky, glyph: null, mood: st.mood, look: st.look, squash: st.squash, hops: HOPS, seed: 3, bob: st.run ? 14 : 6, pop: st.pop, zzz: t < END_T }
    drawStarChar(bx, x, GY, GS, t, opts)
    const F = starFrame(x, GY, GS, t, opts)
    // the pennant, held on the right point (it waves hard on "hi, mom." and in the run)
    const [fx0, fy0] = cellToWorld(F, 31, 21)
    const wv = st.wave ? Math.sin((t - WAVE[0]) * 18) * 0.35 : st.run ? 0.12 * Math.sin(t * 20) : 0.05 * Math.sin(t * 2)
    const droop = t >= END_T - 0.05 && t < BURST ? 1.25 : 0
    tourFlag(bx, t, fx0, fy0, 5 * st.pop, { wave: st.run || st.wave ? 2 : 1, rot: 0.18 + wv + droop })
    if (st.sweat) { const [sx, sy] = cellToWorld(F, 29, 7); sweatDrop(bx, t, sx, sy, 5); if (st.run) { const [s2, s3] = cellToWorld(F, 7, 9); sweatDrop(bx, t + 0.4, s2, s3, 4) } }
    if (t >= END_T && t < BURST) drawChip(bx, x + 60, GY - 150, 'huff… huff…', { k: sp(t, END_T + 0.1, 0.3, 2.4), size: 30, bar: GOLD, rot: -0.05 })
  }
  function drawPisces(t) {
    if (!inR(t, NEP[0], NEP[1] + 0.3)) return
    const k = sp(t, NEP[0], 0.35, 2.4) * out(t, NEP[1], 0.25)
    const px = 925, py = 1250, s = 124
    const opts = { color: PIS.color, glyph: null, mood: 'sparkle', look: [-1, -1], pop: k, seed: 19, bob: 3, glow: 0.8, hops: [NEP[0] + 0.25] }
    drawStarChar(bx, px, py, s, t, opts)
    const F = starFrame(px, py, s, t, opts)
    if (k > 0.5) inSprite(bx, F, () => tearsCells(bx, t, t < SLOT[9] ? 3 : 2))
    if (t < SLOT[9]) drawChip(bx, px - 20, py - 112, "NEPTUNE'S KID", { k: sp(t, NEP[0] + 0.2, 0.3, 2.4) * out(t, SLOT[9] - 0.2, 0.2), size: 27, bar: PIS.color })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(bx, t, SKY_H)
      fxx.clearRect(0, 0, W, H)

      // ════════ hook: ring of ten + stopwatch
      if (t < 3.2) {
        const leave = ease.inCubic(prog(t, 2.12, 2.5))
        const k = 1 - prog(t, 2.3, 2.5)
        miniRing(bx, t, k, { t0: 0.18, rot: t * 0.55 + leave * 2.2, spread: leave * 1.4 })
        const sw = sp(t, 0.12, 0.45, 2.4) * (1 - ease.inQuad(prog(t, 2.15, 2.4)))
        stopwatch(bx, t, OX, 900, 1.15 * sw, 1, t * 7.5)
        sparkle(fxx, OX, 900, t, 0.32, { n: 14, rad: 360, seed: 5, size: 30 })
      }

      // ════════ the ten
      PLANETS.forEach((P, i) => {
        const t0 = SLOT[i], tEnd = SLOT_END[i], fast = FAST(i)
        if (t < t0 - 0.35 || t > tEnd + 0.1) return
        const tt = t - t0
        const inP = prog(t, t0 - (fast ? 0.22 : 0.32), t0)
        const outP = ease.inCubic(prog(t, tEnd - (fast ? 0.2 : 0.3), tEnd + 0.02))
        const x = lerp(OX + 900, OX, ease.outCubic(inP)) - 1300 * outP
        const bob = 10 * Math.sin(t * 2.4 + i)
        const sq = tt > 0 ? 0.16 * Math.exp(-tt * 7) * Math.cos(tt * 22) : 0
        const stretch = 0.12 * Math.sin(Math.PI * inP) + 0.15 * Math.sin(Math.PI * outP)
        const sx = 1 + sq + stretch, sy = 1 - sq - stretch * 0.6
        const gagA = out(t, tEnd - (fast ? 0.24 : 0.34), fast ? 0.16 : 0.22)
        let ox = x, oy = OY + bob
        if (P.id === 'mars') ox += 18 * Math.sin(tt * 13) * clamp(tt * 2)
        if (P.id === 'sun') spotlights(bx, t, tt, gagA, OX, OY - 60)
        if (P.id === 'neptune') dreamCloud(bx, t, tt, gagA, OX, OY, 'back')
        if (P.id === 'mars') sprinter(bx, t, tt, gagA, OX + 40, OY)
        orb(bx, P, ox, oy, P.r, t, { sx, sy })
        sparkle(fxx, OX, OY, t, t0 + 0.02, { n: 12, rad: P.r * 1.7, seed: 30 + i, size: 30, cols: [P.col, '#fff3e0', GOLD] })
        if (P.id === 'moon') blanket(bx, t, tt, gagA, ox, oy, P.r)
        if (P.id === 'mercury') phoneChat(bx, t, tt, gagA, OX, OY)
        if (P.id === 'venus') beatingHeart(bx, t, tt, gagA, OX, OY, thumpAt(t0))
        if (P.id === 'jupiter') { clover(bx, t, tt, gagA, OX, OY - 40); sparkle(fxx, OX + 300, OY + 270, t, t0 + 0.62, { n: 12, rad: 190, seed: 66, size: 28, cols: ['#5fdc7a', GOLD, '#fff3e0'] }) }
        if (P.id === 'saturn') sternClock(bx, t, tt, gagA, OX, OY, clockSteps(t0))
        if (P.id === 'uranus') { bolt(bx, t, tt * 1.6, gagA, OX, OY); sparkle(fxx, OX + 300, OY + 300, t, t0 + 0.32, { n: 12, rad: 220, seed: 81, size: 30, cols: ['#ffe27a', '#7fe0d8', '#fff3e0'] }) }
        if (P.id === 'neptune') dreamCloud(bx, t, tt * 1.6, gagA, OX, OY, 'front')
        if (P.id === 'pluto') {
          butterfly(bx, t, tt, gagA, OX, OY)
          sparkle(fxx, OX + 285, OY - 60, t, t0 + 0.97, { n: 12, rad: 170, seed: 99, size: 28, cols: ['#c9a6ff', PINK, '#fff3e0'] })
          sticker(fxx, t, t - STICK, gagA, OX + 110, OY + 270)
          sparkle(fxx, OX + 110, OY + 270, t, STICK + 0.12, { n: 14, rad: 330, seed: 12, size: 30, cols: [PINK, GOLD, '#fff3e0'] })
        }
      })

      // ════════ end: ten orbs swirl round one person
      if (t >= END_T - 0.1) {
        const conv = ease.outCubic(prog(t, END_T, END_T + 1.1))
        const R = lerp(620, 290, conv)
        miniRing(bx, t, 1, { t0: END_T, cy: 900, R, rot: t * 0.7 + (1 - conv) * 2.5, size: 44 })
        person(bx, OX, 930, 0.95 * sp(t, BURST - 0.15, 0.5, 2.4), 1)
        sparkle(fxx, OX, 860, t, BURST + 0.15, { n: 16, rad: 400, seed: 77, size: 32 })
        sparkle(fxx, OX, 300, t, END_ONE + 0.15, { n: 14, rad: 300, seed: 78, size: 30, cols: [GOLD, '#ffd98a', '#fff3e0'] })
      }

      drawPisces(t)
      drawGuide(t)

      // progress glyphs along the bottom
      const pa = clamp((t - (SLOT[0] - 0.3)) * 3) * (1 - prog(t, END_T - 0.2, END_T + 0.1))
      if (pa > 0.003) {
        const cur = SLOT.reduce((c, s, i) => (t >= s - 0.3 ? i : c), 0)
        bx.save(); bx.textAlign = 'center'; bx.textBaseline = 'middle'
        PLANETS.forEach((P, i) => {
          const x = 540 + (i - 4.5) * 80, y = 1782
          const on = i === cur ? sp(t, SLOT[i] - 0.3, 0.35, 2.4) : 0
          bx.globalAlpha = pa * (i <= cur ? 1 : 0.42)
          bx.font = `${Math.round(40 + 16 * on)}px ${GLYPH_FONT}`
          bx.fillStyle = i === cur ? P.col : '#efe6d6'
          bx.shadowColor = i === cur ? P.col : 'transparent'; bx.shadowBlur = i === cur ? 18 : 0
          bx.fillText(P.glyph + VS, x, y - 10 * on)
        })
        bx.restore()
      }

      // ════════ copy
      hook.update(t, out(t, HOOK_OUT, 0.18))
      names.forEach((n, i) => n.update(t, out(t, TXT_OUT[i], FAST(i) || i === 6 ? 0.1 : 0.18)))
      lines.forEach((n, i) => n.update(t, out(t, TXT_OUT[i], FAST(i) || i === 6 ? 0.1 : 0.18)))
      endL.update(t, out(t, STORY_END - 0.25, 0.2))
      let eyeA = 0
      for (let i = 0; i < 10; i++) if (t >= SLOT[i] - 0.25 && t < TXT_OUT[i] + 0.18) { eye.textContent = `${String(i + 1).padStart(2, '0')} / 10`; eyeA = clamp((t - SLOT[i] + 0.25) * 5) * out(t, TXT_OUT[i], 0.18) }
      if (inR(t, RUN[0], END_T)) eye.textContent = eye.textContent + '  ▸▸'
      eye.style.opacity = String(eyeA)
      box.update(t)

      drawGrain(gx, t)
      black.style.opacity = String(t < 0.35 ? 1 - ease.outQuad(prog(t, 0, 0.35)) : 0)
    },
  }
}

export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pop / pluck / bell are written in D major; the engine moves them into the score's key)
const MEL = [784, 880, 988, 1175, 1046, 988, 880, 1318, 1175, 1568]
export const T = { drop: SLOT[0], run: SLOT[7], end: END_T, burst: BURST }
export const CUES = [
  // hook
  ...[659, 784, 880, 1046, 1175].map((f, i) => ['pop', 0.1 + i * 0.08, f, 0.05, (i - 2) * 0.15]),
  ['whoosh', 0.12, 0.5, 0.04], ['glitter', 0.2, 0.9], ['bell', 0.5, 1318.5, 0.03, 1.2, 0], ['pop', 0.3, 988, 0.04, -0.4],
  ...PLANETS.map((_, i) => ['tick', +(0.2 + i * 0.045).toFixed(3), 0.03]),
  ...[1, 2, 3].map(n => ['tick', beat(n), 0.06]),
  ['whoosh', 2.12, 0.45, 0.05],
  // planets
  ...PLANETS.flatMap((P, i) => {
    const t0 = SLOT[i], f = MEL[i], n = P.line.split(' ').length, fast = FAST(i)
    const c = [
      ['whoosh', +(t0 - (fast ? 0.24 : 0.34)).toFixed(3), fast ? 0.28 : 0.4, 0.05],
      ['pop', +(t0 - 0.22).toFixed(3), f, 0.06, 0.2],
      ['pluck', t0, [293.66, 220, 246.94, 196][i % 4], 0.055, 0.6, 0],
      ...Array.from({ length: n }, (_, k) => ['pop', +(t0 - 0.04 + k * (fast ? 0.04 : 0.06)).toFixed(3), [f * 0.75, f * 0.84, f, f * 1.12][k % 4], 0.03, (k - 1) * 0.2]),
    ]
    const g = t0 + 0.55
    if (P.id === 'sun') c.push(['tick', t0 + 0.5, 0.12], ['tick', t0 + 0.78, 0.12], ['bell', t0 + 0.8, 1174.66, 0.03, 1.0, 0])
    if (P.id === 'moon') c.push(['whoosh', t0 + 0.42, 0.4, 0.03], ['bell', t0 + 0.85, 587.33, 0.03, 1.4, 0.3])
    if (P.id === 'mercury') c.push(...[0.62, 0.7, 0.78, 0.86, 1.3, 1.38, 1.46].map(d => ['tick', +(t0 + d).toFixed(3), 0.05]), ['pop', t0 + 0.7, 1318, 0.045, -0.3], ['pop', t0 + 1.34, 1568, 0.045, -0.3])
    if (P.id === 'venus') c.push(...[0, 1, 2].map(k => ['pluck', +(g + k * 0.5556).toFixed(3), 146.83, 0.05, 0.25, 0.3]), ['bell', g, 1318.5, 0.025, 1.0, 0.3])
    if (P.id === 'mars') c.push(['whoosh', t0 + 0.35, 1.2, 0.05], ...[0.5, 0.74, 0.98, 1.22, 1.46].map(d => ['tick', +(t0 + d).toFixed(3), 0.035]))
    if (P.id === 'jupiter') c.push(['pop', t0 + 0.45, 1568, 0.05, 0.3], ['glitter', t0 + 0.6, t0 + 1.3], ['bell', t0 + 0.62, 1760, 0.03, 1.2, 0.3])
    if (P.id === 'saturn') c.push(...[0, 1, 2].map(k => ['tick', +(g + k * 0.5556).toFixed(3), 0.14]), ['bell', g + 1.15, 880, 0.02, 0.6, 0.3])
    if (P.id === 'uranus') c.push(['boom', t0 + 0.32, 0.12], ['glitter', t0 + 0.34, t0 + 0.9], ['pop', t0 + 0.32, 1568, 0.04, 0.3])
    if (P.id === 'neptune') c.push(['bell', t0 + 0.3, 1174.66, 0.025, 1.4, -0.3], ['bell', t0 + 0.5, 1479.98, 0.02, 1.4, 0.3])
    if (P.id === 'pluto') c.push(...[0.6, 0.72, 0.84].map(d => ['tick', +(t0 + d).toFixed(3), 0.05]), ['pop', t0 + 0.97, 1568, 0.05, 0.3], ['glitter', t0 + 0.97, t0 + 1.5],
      ['pop', STICK, 880, 0.065, 0], ['tick', STICK + 0.02, 0.15], ['bell', STICK + 0.05, 1318.5, 0.03, 1.2, 0])
    return c
  }),
  // the guide: hi mom wave, sit up straight, the run, the flop
  ['pop', WAVE[0], 1318, 0.04, -0.5], ['pop', WAVE[0] + 0.12, 1568, 0.035, -0.5],
  ['pop', SLOT[6] + 0.12, 1174.66, 0.045, -0.5], ['pluck', SLOT[6] + 0.14, 587.33, 0.04, 0.5, -0.5],
  ['riser', RUN[0], END_T - 0.1, 0.035],
  ...Array.from({ length: 14 }, (_, i) => ['tick', +(RUN[0] + 0.2 + i * 0.2778).toFixed(3), 0.03]),
  // Pisces
  ['pop', NEP[0] + 0.05, 659.25, 0.04, 0.5], ['pop', NEP[0] + 0.15, 880, 0.035, 0.5],
  // end
  ['whoosh', END_T - 0.2, 0.6, 0.05], ['boom', END_T + 0.02, 0.08], ['tick', END_T + 0.04, 0.1],
  ...[784, 880, 988].map((f, i) => ['pop', +(END_T + i * 0.1).toFixed(3), f, 0.05, (i - 1) * 0.2]),
  ['pop', END_ONE, 1318, 0.07, 0], ['bell', END_ONE + 0.02, 1318.5, 0.03, 1.6, 0], ['pop', END_ONE + 0.08, 1568, 0.05, 0.1],
  ['boom', BURST, 0.12], ['glitter', BURST, BURST + 1.4], ['pluck', BURST + 0.02, 587.33, 0.05, 0.8, 0],
  ...[1046, 1318, 1568, 1175, 1397, 1760].map((f, i) => ['pop', +(BURST + i * 0.06).toFixed(3), f, 0.035, i % 2 ? 0.5 : -0.5]),
  // dialogue, cuts, end card
  ...talkCues(LINES, { cps: CPS, pitch: { [TAG]: 880 } }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
