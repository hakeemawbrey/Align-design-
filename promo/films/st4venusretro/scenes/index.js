// st4venusretro (EP 086, 20 s vertical Align ad, Star Talk season 4, thread G: sky lessons) · story 0–15.6, then the
// shared end card ("come" + the Align logo, CTA "SIGN UP TO VOTE YOUR CITY").
//   0.00–2.80  "When Venus goes | *retrograde.*"  The ♀ Venus star glows pink, then a backwards orbit arrow loops round
//              it and it dims. A fact chip: "about every 18 months · ~40 days". Along the dark horizon three old flames
//              flicker up, each with a name tag ("the ex", "the situationship", "the one that got away").
//   2.82–10.3  Box (♀ VENUS): "when Venus goes retrograde, exes look *brighter.*" (the flames flare, Venus side-eyes them)
//              → "that's nostalgia, not a *sign.* stay present."  "Rose-tinted | *rearview.*": a rose filter and pixel
//              hearts float off the flames… then Venus glows back, the flames shrink, the box pops shut.
//  10.45       card cut (flip).
//  10.55–15.5  "Let old flames | stay *old.*"  The flames puff out one by one (pixel smoke); Venus, full pink again,
//              winks and looks up. The ghost peeks over the horizon. Everything pops out by 15.5.
// One canvas (sky + horizon + flames + Venus), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, mix } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, lineTimes } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { drawSeedConstellation, drawGhostCameo, episodeNumeral } from '../../stlore.js'

export const DURATION = 20
export const EP = 86
const CTA = 'SIGN UP TO VOTE YOUR CITY'
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236'
const VENUS = '#ff86b8', DUSK = '#7a4a68'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid

// ── the timeline
const T = {
  h0: 0.15, h0Land: 0.75, h0Out: [5.55, 5.75],
  venusIn: 0.25, orbit: [1.1, 2.6], dim: [1.5, 2.7],
  chip: 1.25, chipOut: [5.4, 5.7],
  flames: [1.7, 1.95, 2.2],
  open: 2.62, l1: BEAT(4),                                     // 2.82
  flare: [4.55, 4.95],
  h1: 6.0, h1Land: 6.4, l2: 6.55, rose: [7.0, 7.4], present: [8.65, 9.35], h1Out: [10.1, 10.3],
  close: 10.3,
  cut: 10.45,
  h2: 10.55, h2Land: 10.95, puff: [11.5, 11.95, 12.4], wink: [13.0, 13.45],
  ghost: 13.15,
  h2Out: [15.28, 15.5], out: [15.08, 15.48],
}
const VS = '♀︎ VENUS'
const LINES = [
  { t: T.l1, speaker: VS, text: 'when Venus goes retrograde, exes look *brighter.*', color: PINK },
  { t: T.l2, speaker: VS, text: 'that’s nostalgia, not a *sign.* stay present.', color: PINK },
]
const CPS = 26
const LT = lineTimes(LINES, { cps: CPS })
const HOPS = talkHops(LINES, VS, { cps: CPS })

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }

// ── places
const VEN = { x: 540, y: 830, s: 290 }
const HZ = 1300                                               // the horizon line (centre); the hill curves down at the edges
const hillY = xx => HZ + 0.00011 * (xx - 540) ** 2
const FLAMES = [
  { x: 200, tag: 'the ex' },
  { x: 540, tag: 'the situationship' },
  { x: 858, tag: 'the one that got away' },
]
const GHOST_AT = { x: 742, y: hillY(742) }

// Venus brightness 1 → dim → 1
const venusB = t => 1 - 0.72 * ease.inOutCubic(prog(t, ...T.dim)) + 0.72 * ease.inOutCubic(prog(t, ...T.present))
// flame size: pop in small, flare at "brighter", shrink at "stay present", puff out at the end
function flameK(t, i) {
  const pin = pop01(t, T.flames[i], 0.4, 2)
  if (pin <= 0) return 0
  let k = 0.62 * pin + 0.38 * ease.outCubic(prog(t, T.flare[0] + i * 0.08, T.flare[1] + i * 0.08)) + 0.12 * ease.outCubic(prog(t, ...T.rose))
  k -= 0.62 * ease.inOutCubic(prog(t, T.present[0] + i * 0.1, T.present[1] + i * 0.1))
  k *= 1 - ease.inCubic(prog(t, T.puff[i], T.puff[i] + 0.22))
  return Math.max(0, k)
}
function venusState(t) {
  if (t < T.orbit[0]) return { mood: 'happy', look: [0, 0] }
  if (t < T.flames[0]) return { mood: 'wide', look: [-1, -1] }           // eyeing the backwards arrow
  if (t < T.l1) return { mood: 'sleepy', look: [0, 1], zzz: false }      // dimmed, drowsy
  if (t < T.flare[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.l2) return { mood: 'squint', look: [t % 1.6 < 0.8 ? -1 : 1, 1] } // side-eye at the flames
  if (t < T.present[0]) return { mood: 'eyeroll' }
  if (t < T.cut) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.puff[2] + 0.3) return { mood: 'happy', look: [0, 1] }
  if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
  if (t < T.wink[1] + 0.5) return { mood: 'happy', look: [0, 0] }
  return { mood: 'sparkle', look: [0, -1] }
}

async function build(stage) {
  try {
    await Promise.all(["800 128px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 30px 'Space Mono'", "700 26px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'When Venus goes | *retrograde.*', { top: 190, size: 96, accentSize: 156, at: T.h0, late: 1, lateAt: T.h0Land, wobble: true, gap: 0.09, accentColor: PINK, lineHeight: 0.98 })
  const H1 = popText(root, 'Rose-tinted | *rearview.*', { top: 200, size: 112, accentSize: 164, at: T.h1, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const H2 = popText(root, 'Let old flames | stay *old.*', { top: 200, size: 116, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Land, wobble: true, gap: 0.1, accentColor: GOLD, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1440, width: 960, height: 290, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function glow(cx, cy, r, col, a) {
    if (a <= 0) return
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
    g.addColorStop(0, rgba(col, 0.45 * a)); g.addColorStop(0.45, rgba(col, 0.15 * a)); g.addColorStop(1, rgba(col, 0))
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill(); x.restore()
  }

  // ── the fact chip under the headline
  function drawChip(t) {
    const k = pop01(t, T.chip, 0.34, 2.2) * outK(t, T.chipOut)
    if (k <= 0.01) return
    x.save(); x.translate(540, 580); x.scale(k, k)
    x.font = `700 30px ${MONO}`
    const txt = 'ABOUT EVERY 18 MONTHS · ~40 DAYS', w = x.measureText(txt).width + 64, h = 64
    x.fillStyle = 'rgba(20,10,40,0.88)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 12); x.fill()
    x.lineWidth = 3; x.strokeStyle = rgba(PINK, 0.8); x.stroke()
    x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 2)
    x.restore()
  }

  // ── the backwards orbit: a dotted ring around Venus with an arrow head running anticlockwise + a ℞ badge
  function drawOrbit(t) {
    const a = clamp(prog(t, T.orbit[0], T.orbit[0] + 0.3)) * outK(t, [T.present[0], T.present[1]])
    if (a <= 0.01) return
    const R = 220, sp = -(t - T.orbit[0]) * 2.4 - Math.PI / 2
    x.save(); x.globalAlpha = a
    for (let i = 0; i < 28; i++) {
      const th = sp + i * 0.16, fade = 1 - i / 28
      x.fillStyle = rgba(PINK, 0.85 * fade)
      const px = VEN.x + Math.cos(th) * R, py = VEN.y + Math.sin(th) * R * 0.42 + 10
      x.fillRect(Math.round(px / 6) * 6 - 4, Math.round(py / 6) * 6 - 4, 8, 8)
    }
    // the head: a pixel chevron pointing anticlockwise
    const hx = VEN.x + Math.cos(sp) * R, hy = VEN.y + Math.sin(sp) * R * 0.42 + 10
    const tx = Math.sin(sp), ty = -Math.cos(sp) * 0.42, tn = Math.hypot(tx, ty)
    x.translate(hx, hy); x.rotate(Math.atan2(ty / tn, tx / tn))
    x.fillStyle = PINK
    for (const [i, j] of [[0, 0], [-1, -1], [-1, 1], [-2, -2], [-2, 2]]) x.fillRect(i * 8 - 4, j * 8 - 4, 9, 9)
    x.restore()
    // ℞ coin
    const k = pop01(t, T.orbit[0] + 0.25, 0.3, 2.4) * a
    if (k > 0.01) {
      x.save(); x.translate(VEN.x - 170, VEN.y - 150); x.scale(k, k); x.rotate(-0.12 + Math.sin(t * 3) * 0.05)
      x.fillStyle = '#2a1640'; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
      x.lineWidth = 5; x.strokeStyle = PINK; x.stroke()
      x.fillStyle = PINK; x.font = `700 48px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('℞', 0, 3)
      x.restore()
    }
  }

  // ── the horizon: a dark hill across the bottom
  function drawHill() {
    x.save()
    x.beginPath(); x.moveTo(0, 1920)
    for (let xx = 0; xx <= 1080; xx += 12) x.lineTo(xx, Math.round(hillY(xx) / 6) * 6)
    x.lineTo(1080, 1920); x.closePath()
    const g = x.createLinearGradient(0, HZ - 20, 0, 1920)
    g.addColorStop(0, '#1a0f33'); g.addColorStop(0.3, '#0d0820'); g.addColorStop(1, '#05040c')
    x.fillStyle = g; x.fill()
    x.lineWidth = 4; x.strokeStyle = 'rgba(201,166,255,0.35)'; x.stroke()
    x.restore()
  }

  // ── an old flame: pixel fire on the horizon (cells), k = size 0…1+, with its name tag above
  function drawFlame(t, i) {
    const F = FLAMES[i], k = flameK(t, i)
    const by = hillY(F.x)
    if (k > 0.02) {
      const c = 10, H = Math.round(17 * k), half = 5.6 * Math.sqrt(k)
      glow(F.x, by - H * c * 0.45, 120 + 150 * k, '#ff9a4a', 0.55 * k + 0.25 * clamp(k - 0.8) * 2)
      for (let j = 0; j < H; j++) {
        const v = j / Math.max(1, H), wob = Math.sin(t * 9 + j * 0.7 + i * 2) * v * 1.6
        const hw = Math.max(0.6, half * (v < 0.15 ? 0.85 + v : 1 - Math.pow(v, 1.4)))
        for (let ii = Math.floor(-hw); ii <= Math.ceil(hw); ii++) {
          const u = Math.abs(ii - wob * 0.5) / hw
          if (u > 1.05) continue
          let col = '#ff5a3a'
          if (u < 0.35 && v < 0.55) col = '#fff1b8'
          else if (u < 0.7 && v < 0.8) col = '#ffb347'
          if (j === H - 1 && (Math.floor(t * 10) + i) % 2) col = '#ff8a3a'
          x.fillStyle = col
          x.fillRect(Math.round(F.x + (ii + wob) * c - c / 2), Math.round(by - (j + 1) * c), c, c)
        }
      }
      // little sparks
      for (let s = 0; s < 3; s++) {
        const ph = (t * 0.9 + s * 0.33 + i * 0.21) % 1
        x.globalAlpha = (1 - ph) * clamp(k)
        x.fillStyle = s % 2 ? '#ffd98a' : '#ff8a3a'
        x.fillRect(Math.round(F.x + Math.sin(ph * 6 + s) * 26), Math.round(by - H * c - ph * 90), 6, 6)
        x.globalAlpha = 1
      }
    }
    // the puff of smoke when it goes out
    const sp = prog(t, T.puff[i] + 0.1, T.puff[i] + 1.1)
    if (sp > 0 && sp < 1) {
      x.save(); x.globalAlpha = 0.75 * (1 - ease.inQuad(sp))
      for (let s = 0; s < 4; s++) {
        const r = (16 + s * 6) * (0.6 + sp), yy = by - 40 - sp * (90 + s * 40), xx = F.x + Math.sin(sp * 4 + s * 1.7) * 18
        x.fillStyle = s % 2 ? '#8d86a8' : '#b6b0cc'
        x.fillRect(Math.round(xx - r), Math.round(yy - r * 0.7), Math.round(r * 2), Math.round(r * 1.4))
      }
      x.restore()
    }
    // the name tag
    const tk = pop01(t, T.flames[i] + 0.12, 0.3, 2.2) * outK(t, [T.puff[i], T.puff[i] + 0.25])
    if (tk > 0.01) {
      const ty = by - (i === 1 ? 240 : 190)
      x.save(); x.translate(F.x, ty); x.scale(tk, tk)
      x.font = `700 23px ${MONO}`
      const w = x.measureText(F.tag).width + 34, h = 46
      x.fillStyle = 'rgba(16,9,34,0.9)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 8); x.fill()
      x.lineWidth = 2.5; x.strokeStyle = 'rgba(255,179,71,0.75)'; x.stroke()
      x.fillStyle = '#ffd98a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(F.tag, 0, 2)
      x.beginPath(); x.moveTo(-8, h / 2); x.lineTo(0, h / 2 + 10); x.lineTo(8, h / 2); x.fillStyle = 'rgba(255,179,71,0.75)'; x.fill()
      x.restore()
    }
  }

  // ── the rose-tinted filter: a pink wash over the flames + pixel hearts floating off them
  function drawRose(t) {
    const a = ease.outCubic(prog(t, ...T.rose)) * (1 - ease.inOutCubic(prog(t, ...T.present)))
    if (a <= 0.01) return
    x.save(); x.globalCompositeOperation = 'screen'
    const g = x.createLinearGradient(0, HZ - 330, 0, HZ + 60)
    g.addColorStop(0, rgba(PINK, 0)); g.addColorStop(0.6, rgba(PINK, 0.22 * a)); g.addColorStop(1, rgba(PINK, 0.08 * a))
    x.fillStyle = g; x.fillRect(0, HZ - 330, 1080, 400)
    x.restore()
    const HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
    for (let n = 0; n < 9; n++) {
      const i = n % 3, ph = (t * 0.55 + n * 0.37) % 1
      const hx = FLAMES[i].x + Math.sin(ph * 5 + n) * 60 + (n % 2 ? 40 : -40), hy = hillY(FLAMES[i].x) - 130 - ph * 220
      x.globalAlpha = a * Math.sin(Math.PI * ph)
      x.fillStyle = n % 2 ? PINK : '#ffb3cc'
      HEART.forEach((row, j) => [...row].forEach((ch, ii) => { if (ch === 'X') x.fillRect(Math.round(hx + (ii - 3) * 5), Math.round(hy + j * 5), 5, 5) }))
    }
    x.globalAlpha = 1
  }

  function drawVenus(t) {
    const pk = pop01(t, T.venusIn, 0.5, 1.7) * popOut(t, T.out)
    if (pk <= 0.02) return
    const b = venusB(t), st = venusState(t)
    glow(VEN.x, VEN.y, 420, VENUS, 0.85 * b * pk)
    const col = mix(DUSK, VENUS, b).replace(/rgb\((\d+),(\d+),(\d+)\)/, (_, r, g, bl) => '#' + [r, g, bl].map(v => (+v).toString(16).padStart(2, '0')).join(''))
    const hops = [...HOPS, T.present[1], T.puff[0] + 0.05, T.puff[1] + 0.05, T.puff[2] + 0.05, T.wink[1] + 0.6]
    drawStarChar(x, VEN.x, VEN.y, VEN.s, t, { color: col, glyph: '♀', ...st, hops, pop: pk, seed: 5, glow: 0.3 + 1.0 * b })
  }

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK, LAV]) {
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

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * (1 - 0.25 * (1 - venusB(t))) })
      drawSeedConstellation(x, t, EP)
      if (t < T.out[1] + 0.02) {
        const hk = popOut(t, T.out)
        x.save(); x.globalAlpha = clamp(prog(t, 0.1, 0.6)) * clamp(hk)
        drawHill()
        drawGhostCameo(x, t, { x: GHOST_AT.x, y: GHOST_AT.y + 2, at: T.ghost, dur: 1.4, from: 'below', cell: 4 })
        drawRose(t)
        for (let i = 0; i < 3; i++) drawFlame(t, i)
        x.restore()
        drawOrbit(t)
        drawVenus(t)
        drawChip(t)
        sparkles(t, VEN.x, VEN.y, T.present[1] - 0.2, 12, 250, 1)
        sparkles(t, VEN.x, VEN.y, T.wink[0], 10, 230, 2)
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: CTA }), cardFrame({ start: 0, end: STORY_END, numeral: episodeNumeral(EP) }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const crackle = (t0, pan) => [0, 0.07, 0.15].map(d => ['chip', +(t0 + d).toFixed(3), 2600 + d * 4000, 0.03, { wave: 'noise', gain: 0.018, decay: 0.03, sustain: 0.5, pan, rev: 0.1, dly: 0, bus: 'fx' }])
export const CUES = [
  ...wordPops(T.h0, 3, 0.09, 0, 0.026), ['pop', T.h0Land, 1046.5, 0.05, 0], ['pluck', T.h0Land, 1046.5, 0.04, 0.6, 0],
  ['bell', T.venusIn + 0.1, 1318.51, 0.03, 1.6, 0],
  ['chip', T.orbit[0], 900, 0.9, { wave: 'tri', vib: 0.02, slide: -6, gain: 0.018 }], ['whoosh', T.orbit[0], 0.8, 0.03],
  ['pop', T.chip, 783.99, 0.03, 0], ['tick', T.chip + 0.1, 0.03],
  ['chip', T.dim[0], 660, 1.0, { wave: 'tri', slide: -10, gain: 0.016 }],
  ...T.flames.flatMap((t0, i) => [['pop', t0, 392 + i * 98, 0.03, (i - 1) * 0.5], ...crackle(t0 + 0.08, (i - 1) * 0.5)]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [VS]: 990 } }),
  ['whoosh', T.flare[0], 0.4, 0.04], ...crackle(T.flare[0] + 0.1, -0.4), ...crackle(T.flare[0] + 0.2, 0.4),
  ...wordPops(T.h1, 1, 0.1, 2, 0.026), ['pop', T.h1Land, 1174.66, 0.045, 0], ['glitter', T.rose[0], T.rose[0] + 0.8],
  ['bell', T.present[0] + 0.2, 1567.98, 0.03, 1.4, 0], ['glitter', T.present[0], T.present[1] + 0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.1, 1, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pluck', T.h2Land, 1046.5, 0.045, 0.7, 0],
  ...T.puff.map((t0, i) => ['whoosh', t0 + 0.05, 0.3, 0.03]), ...T.puff.map((t0, i) => ['pop', +(t0 + 0.1).toFixed(3), 659.25 - i * 80, 0.03, (i - 1) * 0.5]),
  ['pop', T.wink[0], 1318.51, 0.035, 0], ['glitter', T.wink[0], T.wink[0] + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
