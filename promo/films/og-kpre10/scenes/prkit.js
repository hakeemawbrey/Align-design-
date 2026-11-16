// SOCIAL COPY (og rework): no slam title / whip zoom / series bug / loop-back; the video window sits below the static
// HOOK (y 480–1080), the reaction cam, CRY-O-METER and last line are moved inside the app's safe zones.
// prkit — the PISCES REACTS show kit (star_advice trial reels, Month 2 boost, batch m25: kpre07–kpre12).
// kpre08–12 IMPORT this file read-only ('../../kpre07/scenes/prkit.js'). Built on hookkit.js + startalk.js + the
// Deep Dive kit's pixel helpers (kdde07/scenes/ddkit.js). No end card, no card cut, no logo, never the word "Align".
//
// The look: a split screen. TOP: a "video" window playing one tiny wholesome moment (your clip(x, t, H) draws inside
// the window, in screen coordinates; the window is WIN = { x: 60, y: 330, w: 960, h: 600 }, clipped). BOTTOM: Pisces'
// reaction cam: a big Pisces losing it (tears 0…3 from spec.tears(t)), a CRY-O-METER needle (spec.meter(t) 0…1, MAX
// flashes at 1). The hook line (≤ 7 words) is slammed on top from frame 0 and stays; the bug PISCES REACTS top-left.
//   const R = buildReact({ id, duration, ending: 'loop' | 'cut', hook: 'A kid waved. The *DRIVER* waved back.',
//     clip(x, t, H), tears: t => 0…3, meter: t => 0…1, mood: t => 'wide' | 'sparkle' | …, last: { at, text },
//     playing: 'NOW PLAYING: bus stop, 8:02 AM', extra: [hookkit scene builders], cues: [...],
//     freeze: [REC] (optional: hookkit freeze windows applied to the whole picture, for a recordScratch) })
//   export const { DURATION, SCENES, CUES } = R
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { drawStarChar, STAR } from '../../startalk.js'
import { drawSign, drawBubble, sparkles, loadFonts } from '../../mlpilot/scenes/mlkit.js'
import { bits, pix, PIX, PAL, label, panel, stamp, meter, talkCard, GOLD, BONE, INK, PINK, CYAN, MINT, LAV, MONO, INTER, SERIF, rgba, mixHex, r3, pop01, outK, bump, YOU_C } from '../../kdde07/scenes/ddkit.js'
import { frozen } from '../../hookkit.js'

export { bits, pix, PIX, PAL, label, panel, stamp, meter, talkCard, GOLD, BONE, INK, PINK, CYAN, MINT, LAV, MONO, INTER, SERIF, rgba, mixHex, r3, pop01, outK, bump, YOU_C }
export const WIN = { x: 60, y: 480, w: 960, h: 600 }
const PIS = { x: 380, y: 1390, s: 380 }

/** a little person: a plain round-headed pixel figure (for the strangers in the clips) */
export function person(x, cx, cy, cell, { col = '#e8a87c', shirt = '#5a7be0', wave = 0, flip = false } = {}) {
  const rows = ['..KKK..', '.KSSSK.', '.KSSSK.', '..KKK..', '.KCCCK.', 'KCCCCCK', 'KCCCCCK', '.KCCCK.', '.KK.KK.', '.KK.KK.']
  bits(x, rows, { K: INK, S: col, C: shirt }, cx, cy, cell, { rot: 0 })
  if (wave) { x.save(); x.translate(cx + (flip ? -1 : 1) * 3.5 * cell, cy - 1 * cell); x.rotate((flip ? -1 : 1) * (-0.6 - 0.5 * Math.sin(wave))); x.fillStyle = INK; x.fillRect(-cell, -5 * cell, 2 * cell, 5 * cell); x.fillStyle = col; x.fillRect(-0.5 * cell, -5.5 * cell, cell * 1.2, cell * 1.4); x.restore() }
}

export function buildReact(spec) {
  const { duration: DURATION, ending = 'cut' } = spec
  void ending   // social: every film ends on its last beat (no loop-back)

  async function build(stage) {
    await loadFonts(["700 30px 'Space Mono'", '900 64px Inter'])
    const root = fill(stage, { background: '#05040c' })
    const cv = layerCanvas(root), x = cv.getContext('2d')
    // social: no 'Pisces Reacts' bug
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const H = {
      x, t: 0, WIN, person: (cx, cy, cell, o) => person(x, cx, cy, cell, o),
      bits: (rows, pal, cx, cy, cell, o) => bits(x, rows, pal, cx, cy, cell, o), pix: (n, cx, cy, cell, o) => pix(x, n, cx, cy, cell, o),
      label: (s, lx, ly, o) => label(x, s, lx, ly, o), panel: (px, py, w, h, o) => panel(x, px, py, w, h, o), stamp: (s, sx, sy, k, o) => stamp(x, s, sx, sy, k, o),
      bubble: (bx, by, s, o) => drawBubble(x, bx, by, s, o), spark: (t, sx, sy, t0, n = 10, R = 150, seed = 1, cols) => sparkles(x, t, sx, sy, t0, n, R, seed, cols),
      star: (sg, o = {}) => drawSign(x, sg, o.x ?? 540, o.y ?? 930, o.s ?? 200, o.t ?? H.t, { cap: false, ...o }),
      you: (o = {}) => drawStarChar(x, o.x ?? 700, o.y ?? 1400, o.s ?? 260, o.t ?? H.t, { color: YOU_C, glow: 0.7, seed: 21, ...o }),
      card: (cx, cy, w, s, o) => talkCard(x, cx, cy, w, s, o),
      pop: (lt, at, d = 0.32, s = 1.9) => pop01(lt, at, d, s), in: (lt, a, b) => ease.inOutCubic(prog(lt, a, b)), lerp, clamp, prog, ease,
    }

    function window_(t) {
      const W = WIN
      // frame
      x.fillStyle = INK; x.fillRect(W.x - 12, W.y - 12, W.w + 24, W.h + 24)
      x.fillStyle = '#bcb6ff'; x.fillRect(W.x - 6, W.y - 6, W.w + 12, W.h + 12)
      x.save(); x.beginPath(); x.rect(W.x, W.y, W.w, W.h); x.clip()
      x.fillStyle = '#1b2a4a'; x.fillRect(W.x, W.y, W.w, W.h)
      spec.clip(x, t, H)
      // playback chrome
      x.fillStyle = 'rgba(6,4,18,0.55)'; x.fillRect(W.x, W.y + W.h - 54, W.w, 54)
      x.fillStyle = BONE; x.beginPath(); x.moveTo(W.x + 26, W.y + W.h - 40); x.lineTo(W.x + 26, W.y + W.h - 14); x.lineTo(W.x + 48, W.y + W.h - 27); x.fill()
      const f = clamp(t / DURATION)
      x.fillStyle = rgba(BONE, 0.3); x.fillRect(W.x + 70, W.y + W.h - 30, W.w - 300, 6); x.fillStyle = '#ff5b7a'; x.fillRect(W.x + 70, W.y + W.h - 30, (W.w - 300) * f, 6)
      x.font = `700 24px ${MONO}`; x.fillStyle = BONE; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(spec.playing || 'NOW PLAYING', W.x + W.w - 20, W.y + W.h - 27)
      x.restore()
    }
    function cryometer(t) {
      const v = clamp(spec.meter(t)), cx = 790, cy = 1300, R = 130
      x.save(); x.translate(cx, cy)
      x.fillStyle = INK; x.beginPath(); x.arc(0, 0, R + 14, Math.PI, 0); x.lineTo(R + 14, 30); x.lineTo(-R - 14, 30); x.fill()
      x.fillStyle = '#2a1f55'; x.beginPath(); x.arc(0, 0, R, Math.PI, 0); x.lineTo(R, 20); x.lineTo(-R, 20); x.fill()
      const seg = 6; for (let i = 0; i < seg; i++) { x.strokeStyle = ['#7dffb0', '#bfe87a', '#ffe27a', '#ffb06a', '#ff7a6a', '#ff3b6b'][i]; x.lineWidth = 22; x.beginPath(); x.arc(0, 0, R - 24, Math.PI + i * Math.PI / seg + 0.03, Math.PI + (i + 1) * Math.PI / seg - 0.03); x.stroke() }
      const jit = v >= 0.99 ? 0.06 * Math.sin(t * 60) : 0.02 * Math.sin(t * 13)
      const a = Math.PI + Math.PI * clamp(v + jit, 0, 1.04)
      x.strokeStyle = INK; x.lineWidth = 12; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * (R - 10), Math.sin(a) * (R - 10)); x.stroke()
      x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * (R - 14), Math.sin(a) * (R - 14)); x.stroke()
      x.fillStyle = GOLD; x.beginPath(); x.arc(0, 0, 14, 0, Math.PI * 2); x.fill()
      x.restore()
      label(x, 'CRY-O-METER', cx, cy + 60, { size: 26, font: MONO, weight: 700, col: '#bcb6ff', spacing: 3 })
      if (v >= 0.99 && Math.floor(t * 6) % 2 === 0) label(x, 'MAX', cx, cy - R - 40, { size: 48, col: '#ff3b6b' })
    }
    function reaction(t) {
      x.fillStyle = 'rgba(16,9,38,0.55)'; x.fillRect(0, 1080, 1080, 840)
      label(x, '● REACTION CAM', 200, 1125, { size: 24, font: MONO, weight: 700, col: '#ff6f91', spacing: 3 })
      const tears = Math.round(clamp(spec.tears(t), 0, 3))
      const sob = tears >= 3 ? 0.06 * Math.sin(t * 24) : tears >= 2 ? 0.03 * Math.sin(t * 14) : 0
      const P = spec.pisces ? spec.pisces(t) : {}
      drawSign(x, 'pisces', P.x ?? PIS.x, P.y ?? PIS.y, P.s ?? PIS.s, t, { mood: spec.mood ? spec.mood(t) : 'wide', look: [0.4, -1], tears, squash: sob, seed: 12, pull: tears >= 3 ? 1 : 0, ...P })
      spec.react && spec.react(x, t, H)
      cryometer(t)
      if (spec.last && t >= spec.last.at) {
        const k = pop01(t, spec.last.at, 0.3, 2.2)
        x.save(); x.font = `800 40px ${INTER}`
        const w = Math.min(1000, x.measureText(spec.last.text).width + 60)
        x.restore()
        panel(x, 540, spec.lastY ?? 1030, w, 84, { k, border: '#bcb6ff' })
        label(x, spec.last.text, 540, spec.lastY ?? 1030, { size: w >= 1000 ? 34 : 40, col: BONE, k })
      }
    }
    return {
      start: 0, end: DURATION + 0.01, root,
      update(t) {
        H.t = t
        drawSky(x, t, { ...SKY_H, zoom: SKY_H.zoom * 1.1 })
        window_(t)
        reaction(t)
        drawGrain(gx, t)
      },
    }
  }

  const extra = spec.extra || []
  const SCENES = [spec.freeze ? frozen(build, spec.freeze) : build, ...extra]
  const CUES = [
    ...(spec.last ? [['pop', r3(spec.last.at), 1174.66, 0.045, 0], ['glitter', r3(spec.last.at), r3(spec.last.at + 0.5)]] : []),
    ...(spec.cues || []),
  ]
  return { DURATION, SCENES, CUES }
}
/** sob sound: a wobbly descending pluck pair (pitched; the engine moves it into key) */
export const sobCues = (t, n = 2, gain = 0.03) => Array.from({ length: n }, (_, i) => [['pluck', r3(t + i * 0.32), 880 - i * 80, gain, 0.5, 0.3], ['pluck', r3(t + i * 0.32 + 0.12), 740 - i * 80, gain * 0.8, 0.5, 0.3]]).flat()
