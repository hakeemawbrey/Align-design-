// st4roadhome (20 s vertical Align ad, Star Talk season 4 · EP 068, the road trip ends) · story 0–15.6, then the end card.
//   0.00–3.30  "The road trip | *ends.*"  Sunset over a Texas highway. The road-trip van rolls in and cruises home: in the back
//              windows ♉ Taurus (blanket), ♊ Gemini and ♓ Pisces are fast asleep (zzz); up front ♐ Sagittarius drives
//              and ♍ Virgo navigates with its paper map.
//   3.40–10.3  "Two *mutable* | signs."  (Sagittarius and Virgo are both mutable: adaptable, the ones who adjust.)
//              ♍ VIRGO: "you drove the whole way."  ♐ SAG: "you *planned* the whole way."  They look at each other.
//              THE STARS: "different strengths. same *direction.*"  A green highway sign slides past: HOUSTON →.
//              (Ghost: the stowaway peeks up from behind the luggage on the roof rack, 5.5–6.8.)
//  10.4 cut →  "Same | *direction.*"  Wide shot: dusk, the little van heads right toward a generic Houston skyline lighting
//              up on the horizon, headlights on, a trail of pixel hearts. Everything pops out by 15.45.
// One canvas (sky + constellation + sunset + road + van), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, lineTimes, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'
import { GOLD, BONE, PINK, INK, MONO, pop01, outK, popOut, popText, drawBits, sparkles, glow, at, wordT, checkLines, wordPops, hexA } from './kit.js'

export const DURATION = 20
const EP = 68
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const SAG = signStar('sagittarius'), VIR = signStar('virgo')
const TAU_ = signStar('taurus'), GEM = signStar('gemini'), PIS = signStar('pisces')
const SAG_TAG = `${SAG.glyph} SAGITTARIUS STAR`, VIR_TAG = `${VIR.glyph} VIRGO STAR`, SKY_TAG = 'THE STARS'
const SUN = '#ffb35a', DUSK = '#ff7a8a'

const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [3.15, 3.33],
  vanIn: [0.2, 1.3],
  open: 2.18, l1: 2.35, l2: 4.75, l3: 7.25, close: 10.3,
  h1: 3.4, h1Land: 3.85, h1Out: [10.1, 10.28],
  glance: 6.0, sign: [8.0, 10.2],
  cut: 10.4,
  h2: 10.48, h2Land: 10.85, sky: [10.5, 13.5], hearts: 11.6,
  out: [15.05, 15.45], h2Out: [15.18, 15.44],
  ghost: 5.5,
}
const CPS = 28
const LINES = [
  { t: T.l1, speaker: VIR_TAG, color: '#9fe08a', text: 'you drove the whole way.' },
  { t: T.l2, speaker: SAG_TAG, color: SAG.color, text: 'you *planned* the whole way.' },
  { t: T.l3, speaker: SKY_TAG, text: 'different strengths. same *direction.*' },
]
const LT = lineTimes(LINES, { cps: CPS })
checkLines(LT, LINES, T.close)
const T_DIR = wordT(LT, LINES, 2, 'direction')

// layout
const HORIZON = 1180
const VAN = { x: 540, y: 1020, c: 10 }                  // close-up (beat 1–2)
const VANF = { y: 1150, c: 4.4 }                        // wide shot (beat 3)
const after = t => t >= T.cut

const VIR_ST = [
  [0, { mood: 'neutral', look: [0, 1] }], [T.l1, { mood: 'happy', look: [1, 0] }], [LT[0].done + 0.3, { mood: 'neutral', look: [1, 0] }],
  [T.l2 + 0.5, { mood: 'wide', look: [1, 0], blink: false }], [LT[1].done + 0.2, { mood: 'sparkle', look: [1, 0] }], [T_DIR, { mood: 'heart' }], [T.cut, { mood: 'happy' }],
]
const SAG_ST = [
  [0, { mood: 'neutral', look: [1, 0] }], [T.l1 + 0.6, { mood: 'wide', look: [-1, 0], blink: false }], [LT[0].done + 0.4, { mood: 'happy', look: [1, 0] }],
  [T.l2, { mood: 'happy', look: [-1, 0] }], [LT[1].done + 0.3, { mood: 'sparkle', look: [1, 0] }], [T_DIR + 0.1, { mood: 'heart' }], [T.cut, { mood: 'happy' }],
]

const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const Z = ['XXXX', '..X.', '.X..', 'XXXX']

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 170px 'EB Garamond'", "700 52px 'Space Mono'", "700 34px 'Space Mono'", "800 46px Inter", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'The road trip | *ends.*', { top: 200, size: 112, accentSize: 180, at: T.h0, times: [T.h0, T.h0 + 0.1, T.h0 + 0.2, T.h0Land], wobble: true, accentColor: SUN, lineHeight: 0.98 })
  const H1 = popText(root, 'Two *mutable* | signs.', { top: 210, size: 112, accentSize: 170, at: T.h1, times: [T.h1, T.h1Land, T.h1Land + 0.25], wobble: true, accentColor: GOLD, lineHeight: 0.98 })
  const H2 = popText(root, 'Same | *direction.*', { top: 200, size: 128, accentSize: 190, at: T.h2, times: [T.h2, T.h2Land], wobble: true, accentColor: SUN, lineHeight: 0.96 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── sunset: a warm band over the horizon that cools to dusk; the sun sinks; hills; the road
  function drawSunset(t) {
    const dusk = prog(t, 0, STORY_END)
    const g = x.createLinearGradient(0, 560, 0, HORIZON)
    g.addColorStop(0, 'rgba(255,140,120,0)')
    g.addColorStop(0.55, hexA(DUSK, 0.32 - 0.12 * dusk))
    g.addColorStop(1, hexA(SUN, 0.75 - 0.3 * dusk))
    x.fillStyle = g; x.fillRect(0, 560, 1080, HORIZON - 560)
    // the sun, sinking behind the hills (pixel disc with stripes)
    const sy = lerp(HORIZON - 120, HORIZON + 40, dusk), sx = 300
    glow(x, sx, sy, 300, SUN, 0.8 - 0.4 * dusk)
    const c = 12, R = 9
    for (let j = -R; j < R; j++) for (let i = -R; i < R; i++) {
      if (Math.hypot(i + 0.5, j + 0.5) > R) continue
      if (j > 2 && (j % 3 === 0)) continue
      x.fillStyle = j < -3 ? '#ffe28a' : j < 2 ? '#ffc35a' : '#ff9a4a'
      x.fillRect(sx + i * c, sy + j * c, c, c)
    }
    // hills (stepped pixel silhouettes)
    for (const [col, amp, ph, base] of [['#3a1f4a', 46, 0.6, HORIZON - 30], ['#24133a', 30, 2.1, HORIZON - 4]]) {
      x.fillStyle = col
      for (let px = 0; px < 1080; px += 12) {
        const h = amp * (0.6 + 0.4 * Math.sin(px * 0.006 + ph) + 0.25 * Math.sin(px * 0.017 + ph * 2))
        x.fillRect(px, Math.round((base - h) / 6) * 6, 12, 2000)
      }
    }
    // ground + road
    x.fillStyle = '#1a0f2c'; x.fillRect(0, HORIZON, 1080, 1920 - HORIZON)
    x.fillStyle = '#2a2140'; x.fillRect(0, HORIZON + 30, 1080, 150)
    x.fillStyle = '#3a3058'; x.fillRect(0, HORIZON + 30, 1080, 8)
    const speed = after(t) ? 260 : 900
    const off = (t * speed) % 160
    x.fillStyle = '#f2d78a'
    for (let px = -160; px < 1240; px += 160) x.fillRect(Math.round(1080 - (px + off)), HORIZON + 100, 80, 12)
  }

  // ── the generic Houston skyline on the right horizon (final beat), windows lighting up
  function drawSkyline(t) {
    const k = clamp(prog(t, T.cut, T.cut + 0.6))
    if (k <= 0) return
    const towers = [[700, 120, 44], [750, 210, 50], [806, 160, 40], [850, 270, 56], [912, 190, 46], [962, 240, 42], [1008, 140, 50]]
    x.save(); x.globalAlpha = k
    glow(x, 860, HORIZON - 120, 300, GOLD, 0.35 + 0.15 * Math.sin(t * 2))
    for (const [tx, h, w] of towers) {
      x.fillStyle = '#120a24'; x.fillRect(tx, HORIZON - h, w, h)
      x.fillStyle = '#2a1d4a'; x.fillRect(tx, HORIZON - h, 4, h)
      for (let wy = HORIZON - h + 12; wy < HORIZON - 8; wy += 16) for (let wx = tx + 8; wx < tx + w - 6; wx += 12) {
        const on = ((wx * 7 + wy * 13) % 11) / 11 < prog(t, T.sky[0] + ((wx + wy) % 9) * 0.25, T.sky[1])
        if (on) { x.fillStyle = (wx + wy) % 3 ? '#ffd98a' : '#fff1c8'; x.fillRect(wx, wy, 5, 7) }
      }
    }
    // the highway sign, generic green
    drawHwySign(t, 660, HORIZON - 30, 0.62, k)
    x.restore()
  }

  function drawHwySign(t, cx, base, s, a, posts = true) {
    if (a <= 0.01) return
    x.save(); x.globalAlpha *= a; x.translate(cx, base); x.scale(s, s)
    x.fillStyle = '#6b6b7a'; if (posts) { x.fillRect(-90, -200, 14, 200); x.fillRect(76, -200, 14, 200) } else { x.fillRect(-90, -510, 14, 180); x.fillRect(76, -510, 14, 180) }
    x.fillStyle = INK; x.fillRect(-170, -340, 340, 150)
    x.fillStyle = '#1f7a4a'; x.fillRect(-162, -332, 324, 134)
    x.strokeStyle = '#eaf5ec'; x.lineWidth = 5; x.strokeRect(-152, -322, 304, 114)
    x.fillStyle = '#eaf5ec'; x.font = "800 46px Inter, 'Helvetica Neue', Arial, sans-serif"; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('HOUSTON', 0, -284)
    x.font = "800 52px Inter, 'Helvetica Neue', Arial, sans-serif"; x.fillText('→', 0, -232)
    x.restore()
  }

  // ── the van (side view, heading right): cream top, teal body, orange stripe, five passengers in the windows
  const BACK = [{ i0: -38, w: 13, s: TAU_, seed: 11 }, { i0: -23, w: 13, s: GEM, seed: 12 }, { i0: -8, w: 13, s: PIS, seed: 13 }]
  function drawVan(t, cx, cy, c, o, close) {
    const bounce = Math.round(Math.abs(Math.sin(t * 7.3)) * 0.3 * c + Math.sin(t * 3.1) * 0.2 * c)
    x.save(); x.translate(Math.round(cx), Math.round(cy) - bounce); x.globalAlpha *= o
    const R = (i, j, w, h, col) => { x.fillStyle = col; x.fillRect(i * c, j * c, w * c, h * c) }
    // roof rack + luggage
    R(-36, -19, 30, 1, INK); R(-34, -24, 9, 5, '#8a5a2b'); R(-34, -24, 9, 1, '#b37a3c'); R(-24, -23, 7, 4, '#c94f6a'); R(-16, -25, 8, 6, '#3f7cf0'); R(-16, -25, 8, 1, '#7fb0ff')
    // outline + body
    R(-43, -18, 86, 32, INK); R(-42, -17, 84, 30, '#efe6d6')
    R(-42, -1, 84, 14, '#3fb7a8'); R(-42, -2, 84, 2, '#f59c4a'); R(-42, 0, 84, 1, '#ffd08a')
    R(36, -17, 6, 6, INK)                                                      // slanted nose corner
    R(38, -11, 4, 10, '#efe6d6')
    // windows (dark glass with a warm sunset sheen)
    const win = (i0, w) => { R(i0, -16, w, 14, INK); R(i0 + 1, -15, w - 2, 12, '#2a1d4a'); R(i0 + 1, -15, w - 2, 2, '#5a3a5a') }
    for (const b of BACK) win(b.i0, b.w)
    R(8, -16, 28, 14, INK); R(9, -15, 26, 12, '#2a1d4a'); R(9, -15, 26, 2, '#5a3a5a')
    // passengers (clipped to their windows)
    const inWin = (i0, w, fn) => { x.save(); x.beginPath(); x.rect((i0 + 1) * c, -15 * c, (w - 2) * c, 12 * c); x.clip(); fn(); x.restore() }
    if (close) {
      BACK.forEach((b, n) => inWin(b.i0, b.w, () => {
        const sx = (b.i0 + b.w / 2) * c
        drawStarChar(x, sx, -8 * c + Math.sin(t * 1.7 + n) * 3, 14 * c, t, { color: b.s.color, mood: 'sleepy', zzz: false, seed: b.seed, bob: 0, tips: false, squash: 0.04 * Math.sin(t * 1.6 + n * 2) })
        if (n === 0) { R(b.i0 + 1, -5, b.w - 2, 2, '#c08ad8'); R(b.i0 + 1, -5, b.w - 2, 1, '#e0b8f0') }   // Taurus' blanket cape
      }))
      inWin(8, 28, () => {
        drawStarChar(x, 15 * c, -8.5 * c, 13 * c, t, { color: VIR.color, ...at(t, VIR_ST), seed: 14, bob: 0, tips: false })
        drawStarChar(x, 28.5 * c, -8.5 * c, 13 * c, t, { color: SAG.color, ...at(t, SAG_ST), seed: 15, bob: 0, tips: false })
        // Virgo's paper map, Sag's wheel
        R(10, -6, 10, 3, '#f7ead0'); R(13, -6, 1, 3, '#c9a76a'); R(16, -6, 1, 3, '#c9a76a'); R(11, -5, 1, 1, '#d23a5a'); R(12, -5, 1, 1, '#d23a5a'); R(14, -5, 1, 1, '#d23a5a'); R(18, -5, 1, 1, '#d23a5a')
        x.strokeStyle = INK; x.lineWidth = c * 0.9; x.beginPath(); x.ellipse(33.5 * c, -5 * c, 1.2 * c, 2.6 * c, 0, 0, Math.PI * 2); x.stroke()
      })
    }
    // headlight + tail light
    R(40, -4, 2, 3, after(t) ? '#fff6c8' : '#ffe08a'); R(-42, -4, 2, 3, '#ff5a5a')
    // wheels
    for (const wi of [-26, 26]) {
      x.fillStyle = INK; x.beginPath(); x.arc(wi * c, 13 * c, 6.4 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#3a3058'; x.beginPath(); x.arc(wi * c, 13 * c, 4.6 * c, 0, Math.PI * 2); x.fill()
      x.fillStyle = '#c9c0d8'; x.beginPath(); x.arc(wi * c, 13 * c, 2.2 * c, 0, Math.PI * 2); x.fill()
      const a = -t * (after(t) ? 6 : 14)
      x.fillStyle = INK; x.fillRect(wi * c + Math.cos(a) * 3.2 * c - c / 2, 13 * c + Math.sin(a) * 3.2 * c - c / 2, c, c)
    }
    x.restore()
    if (after(t)) { glow(x, cx + 44 * c, cy - 2 * c, 160, '#fff1a8', 0.5 * o) }
  }

  function zzz(t, cx, cy, c, o) {
    for (const [n, i0] of BACK.map((b, n) => [n, b.i0 + b.w / 2])) {
      for (let k = 0; k < 2; k++) {
        const p = ((t * 0.5 + n * 0.37 + k * 0.5) % 1)
        drawBits(x, Z, { X: BONE }, cx + i0 * c + 30 + p * 40, cy - 24 * c - p * 120, 5 + 3 * p, { alpha: Math.sin(Math.PI * p) * o * 0.9 })
      }
    }
  }

  function vanPos(t) {
    if (!after(t)) { const e = ease.outCubic(prog(t, ...T.vanIn)); return { cx: lerp(-500, VAN.x, e), cy: VAN.y, c: VAN.c } }
    const e = prog(t, T.cut, T.out[1])
    return { cx: lerp(220, 600, ease.inOutSine ? ease.inOutSine(e) : e), cy: VANF.y, c: VANF.c }
  }

  function drawScene(t) {
    const o = popOut(t, T.out)
    if (o <= 0) return
    const P = vanPos(t), close = !after(t)
    if (!close) drawSkyline(t)
    // the HOUSTON → sign slides past behind the van on "direction" (close-up only)
    if (close && t > T.sign[0] && t < T.sign[1]) {
      const p = prog(t, ...T.sign), sx = lerp(1250, 760, ease.outCubic(Math.min(1, p * 2.2))) - Math.max(0, p - 0.7) * 1400
      drawHwySign(t, sx, 990, 0.95, 1, false)
    }
    drawVan(t, P.cx, P.cy, P.c, o, close)
    // the stowaway peeks up from behind the luggage on the roof rack (drawn after the van)
    if (close) drawGhostCameo(x, t, { x: P.cx - 28 * P.c, y: P.cy - 24 * P.c, at: T.ghost, dur: 1.3, from: 'below', cell: 3 })
    if (close && t > T.vanIn[1]) zzz(t, P.cx, P.cy, P.c, o)
    if (close) sparkles(x, t, P.cx + 22 * P.c, P.cy - 8 * P.c, T_DIR + 0.1, { n: 12, R: 200, size: 24, seed: 2, cols: [SUN, GOLD, BONE, PINK] })
    if (!close && t > T.hearts) {
      for (let i = 0; i < 10; i++) {
        const born = T.hearts + i * 0.3, p = (t - born) / 1.6
        if (p < 0 || p >= 1) continue
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, P.cx - 30 + (i % 3) * 30 - p * 140, P.cy - 120 - p * 200, 6, { alpha: Math.sin(Math.PI * p) * o })
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(x, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      drawSeedConstellation(x, t, EP)
      drawSunset(t)
      if (t < T.out[1] + 0.02) drawScene(t)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 3.35 (inert: hook → the two mutables), 10.4 (box shut → the wide shot, plays).
const CUTS = [3.35, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'JOIN THE TEXAS BETA' }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

const PITCH = { [VIR_TAG]: 659.25, [SAG_TAG]: 880, [SKY_TAG]: 739.99 }
export const CUES = [
  ...wordPops(T.h0, 3, 0.1, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.05, 0], ['pluck', T.h0Land, 880, 0.04, 0.8, 0],
  ['whoosh', T.vanIn[0], 0.9, 0.035], ['tick', T.vanIn[1], 0.03],
  ['pop', T.open, 739.99, 0.035, 0], ['pop', T.open + 0.06, 987.77, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: PITCH }),
  ['pop', T.h1, 880, 0.03, 0], ['pop', T.h1Land, 1174.66, 0.045, 0], ['pluck', T.h1Land, 1174.66, 0.035, 0.6, 0],
  ['bell', LT[1].done + 0.3, 1318.51, 0.025, 1.4, 0],
  ['tick', T.ghost + 0.05, 0.02],
  ['whoosh', T.sign[0], 0.6, 0.025],
  ['glitter', T_DIR + 0.1, T_DIR + 0.7], ['bell', T_DIR + 0.12, 1760, 0.028, 1.6, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['pop', T.h2, 880, 0.03, 0], ['pop', T.h2Land, 1318.51, 0.055, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.9, 0],
  ['glitter', T.sky[0] + 0.5, T.sky[0] + 1.6], ['bell', T.hearts, 1567.98, 0.025, 1.8, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
