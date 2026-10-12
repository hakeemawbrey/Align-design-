// 03-moon — "Tonight's moon". Feature: daily sky readings tied to the real moon phase.
// A huge realistic moon rises through the frame, waxing from a thin crescent to tonight's gibbous (82%) while a
// live mono readout counts the phase and a row of phase glyphs lights up in step. Then: "Tonight's moon has
// notes for you." → a reading in Align's voice → the real sky screen on a phone, the moon setting behind it.
//
// Timeline (s)
//   0.00–3.40  moon rises (cy 1540 → 790) and waxes p 0.05 → 0.3605 (82% lit) · readout eyebrow from 0.25
//   0.70–3.40  phase-glyph row: each glyph ticks on as the moon passes its phase · tonight lands 3.40 (bell)
//   3.55–5.45  "Tonight's moon / has notes for you."
//   5.65–7.25  MOON IN SAGITTARIUS · "Say the honest thing."
//   7.15–9.60  phone (screen-sky) rises in, moon glides up + back behind it
//   9.60–12.0  end tag "THE SKY READS / YOU BACK"
import { W, H, A, el, fill, img, prog, ease, lerp, clamp, rng, spaceBackdrop, typeLine, eyebrow, starField, endTag, moonCanvas, drawMoonGlyph, litOf, phaseName, MONO, BONE, GOLD } from './kit.js'

const DURATION = 12
const END = 9.6
const R = 380                       // moon render radius (kept constant so the albedo grid is cached)
const P0 = 0.05, P1 = 0.3605        // thin crescent → waxing gibbous 82%
const WAX = [0.2, 3.4]
const phaseAt = (t) => lerp(P0, P1, ease.inOutCubic(prog(t, WAX[0], WAX[1])))
// phase glyph row (new → … → waning crescent); index 3 = tonight
const ROW = [0, 0.125, 0.25, P1, 0.5, 0.625, 0.75, 0.875]
const TONIGHT = 3
const ROW_Y = 1236, ROW_GAP = 104
// time the moon passes each glyph's phase (glyph i ≤ tonight lights then) — used for ticks
const passAt = ROW.map((p, i) => {
  if (i > TONIGHT) return null
  if (p <= P0) return 1.35
  for (let t = WAX[0]; t <= WAX[1] + 0.001; t += 0.005) if (phaseAt(t) >= p - 0.0005) return Math.max(1.35 + i * 0.12, t)
  return WAX[1]
})
const LINE1 = 3.55, L1OUT = 5.3
const LINE2 = 5.6, L2OUT = 6.9
const PHONE = 7.2

export default {
  id: '03-moon', title: "Tonight's moon", duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, 3.4, [146.83, 220, 329.63, 440, 659.25]],             // Dsus2 — night air
      [3.4, 5.6, [146.83, 220, 293.66, 369.99, 554.37]],        // Dmaj7 lands with tonight's moon
      [5.6, 7.2, [123.47, 185, 293.66, 440, 554.37]],           // Bm9 — the reading
      [7.2, 9.6, [98, 146.83, 246.94, 369.99, 587.33]],         // Gmaj7 — phone
      [9.6, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.024,
  },
  cues: [
    ['riser', 0.0, 1.2, 0.05],
    ['whoosh', 0.55, 1.1, 0.06],
    ...passAt.filter(v => v != null).map((t, i) => ['tick', t, 0.06 + i * 0.01]),
    ['bell', WAX[1], 880, 0.07, 2.6, 0.1],                         // tonight · 82%
    ['bell', WAX[1] + 0.12, 1318.5, 0.03, 2.0, -0.2],
    ['whoosh', LINE1 + 0.1, 0.6, 0.05],
    ['glitter', LINE1 + 0.05, LINE1 + 0.7],
    ['tick', LINE2, 0.07],
    ['bell', LINE2 + 0.3, 739.99, 0.05, 2.2, -0.15],
    ['bell', LINE2 + 0.55, 1108.73, 0.025, 1.8, 0.2],
    ['whoosh', PHONE + 0.35, 0.7, 0.1],
    ['boom', PHONE + 0.62, 0.16],
    ['tick', PHONE + 1.05, 0.06], ['tick', PHONE + 1.3, 0.06], ['tick', PHONE + 1.55, 0.07],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'teal', { seed: 31, grain: 0.24 })
    // moon + clouds canvas (under all text)
    const mc = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
    mc.width = W; mc.height = H
    const mx = mc.getContext('2d')
    // phase glyph row
    const gc = el('canvas', { position: 'absolute', left: 0, top: (ROW_Y - 80) + 'px', width: W + 'px', height: '160px' }, root)
    gc.width = W; gc.height = 160
    const gx = gc.getContext('2d')
    // live readout eyebrow
    const eb = eyebrow(root, '', { y: 286, size: 30, spacing: '0.22em' })
    eb.style.textShadow = '0 2px 18px rgba(8,5,34,0.8)'
    const l1 = typeLine(root, "Tonight's moon\nhas notes for you.", { y: 1340, size: 96, perChar: 0.028 })
    const e2 = eyebrow(root, '☾ MOON IN SAGITTARIUS', { y: 1350, size: 30, color: '#dcbcff' })
    const l2 = typeLine(root, 'Say the honest thing.', { y: 1414, size: 100, perChar: 0.032 })
    // phone with the real sky screen
    const PW = 540, PH = PW * 2532 / 1170, PCY = 1050
    const phone = el('div', { position: 'absolute', left: (W / 2 - PW / 2 - 14) + 'px', top: (PCY - PH / 2 - 14) + 'px', width: (PW + 28) + 'px', height: (PH + 28) + 'px', borderRadius: '78px', background: 'linear-gradient(160deg, #2a2148, #0d0822 60%, #1d1538)', boxShadow: '0 0 0 2px rgba(201,188,228,0.28) inset, 0 50px 90px -20px rgba(3,1,12,0.9), 0 0 120px 10px rgba(154,123,224,0.25)', opacity: 0, willChange: 'transform' }, root)
    const scr = el('div', { position: 'absolute', left: '14px', top: '14px', width: PW + 'px', height: PH + 'px', borderRadius: '66px', overflow: 'hidden', background: '#140a2e' }, phone)
    const simg = img(scr, A + 'screen-sky.png', { left: 0, top: 0, width: PW + 'px', height: PH + 'px' })
    // patched copy of the screen so the app shows tonight's moon (gibbous 82%, Sagittarius) — built once on first update
    const scv = el('canvas', { position: 'absolute', left: 0, top: 0, width: PW + 'px', height: PH + 'px' }, scr)
    scv.width = 1170; scv.height = 2532
    let patched = false
    const sheen = el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0) 55%)', backgroundSize: '260% 260%', mixBlendMode: 'screen' }, scr)
    // highlight ring over the three sky cards (they "breathe" in turn)
    const cardBoxes = [72, 430, 787].map(x => el('div', { position: 'absolute', left: (x / 1170 * PW) + 'px', top: (630 / 2532 * PH) + 'px', width: (312 / 1170 * PW) + 'px', height: (528 / 2532 * PH) + 'px', borderRadius: '12px', boxShadow: '0 0 0 2px rgba(255,226,150,0.9), 0 0 34px 8px rgba(242,199,92,0.5)', opacity: 0 }, scr))
    const tag = endTag(stage, { start: END, end: DURATION, line: 'THE SKY READS\nYOU BACK' })

    // offscreen for moon + fine surface detail (overlay: speckle, small craters lit from the right, soft grey wash)
    const off = document.createElement('canvas'); off.width = off.height = 2 * R + 2
    const ox2 = off.getContext('2d')
    let DET = null
    const detail = () => DET || (DET = makeDetail(R))
    const moonState = (t) => {
      const rise = ease.outCubic(prog(t, 0, 2.6))
      const back = ease.inOutCubic(prog(t, PHONE, PHONE + 1.1))
      const drift = t * 0.02                     // slow camera push
      const cy = lerp(lerp(1420, 790, rise), 470, back) - t * 3
      const cx = W / 2 + Math.sin(t * 0.35) * 10 + lerp(0, 120, back)
      const s = lerp(lerp(0.9, 1.0, rise) + drift, 0.6, back)
      return { cx, cy, s, p: phaseAt(t) }
    }

    return {
      update(t) {
        if (!patched && simg.complete && simg.naturalWidth) { patchSky(scv, simg); patched = true; simg.style.opacity = '0' }
        bg.update(t)
        const pre = t < END
        root.style.visibility = t < END + 0.25 ? 'visible' : 'hidden'
        // ── moon
        mx.clearRect(0, 0, W, H)
        if (pre) {
          const { cx, cy, s, p } = moonState(t)
          const k = litOf(p), e = 2 * Math.PI * p, Rs = R * s
          const fadeIn = 0.25 + 0.75 * ease.outQuad(prog(t, 0, 0.3))
          // wide atmospheric bloom, biased to the lit limb
          const ox = cx + Math.sin(e) * Rs * 0.5 * (1 - k)
          mx.globalCompositeOperation = 'lighter'
          for (const [rr, a] of [[3.4, 0.05 + 0.1 * k], [1.9, 0.08 + 0.2 * k]]) {
            const g = mx.createRadialGradient(ox, cy, Rs * 0.7, ox, cy, Rs * rr)
            g.addColorStop(0, `rgba(240,232,220,${a * fadeIn})`); g.addColorStop(0.4, `rgba(190,180,236,${a * 0.45 * fadeIn})`); g.addColorStop(1, 'rgba(160,150,220,0)')
            mx.fillStyle = g; mx.fillRect(ox - Rs * rr, cy - Rs * rr, Rs * rr * 2, Rs * rr * 2)
          }
          mx.globalCompositeOperation = 'source-over'
          const c = moonCanvas(R, p, { earthshine: 0.38, darkAlpha: 0.97 })
          ox2.clearRect(0, 0, off.width, off.height)
          ox2.drawImage(c, 0, 0)
          ox2.globalCompositeOperation = 'overlay'; ox2.drawImage(detail(), 0, 0); ox2.globalCompositeOperation = 'source-over'
          mx.globalAlpha = fadeIn
          mx.save(); mx.translate(cx, cy); mx.rotate(-0.12 + t * 0.006); mx.scale(s, s)
          mx.drawImage(off, -off.width / 2, -off.height / 2)
          mx.restore()
          mx.globalAlpha = 1
        }
        // ── readout eyebrow (counts live until tonight, then holds)
        const p = phaseAt(t)
        eb.textContent = `TONIGHT · ${phaseName(p)} · ${Math.round(litOf(p) * 100)}%`
        const lock = Math.exp(-(((t - WAX[1] - 0.1) / 0.25) ** 2))
        eb.style.opacity = String(ease.outQuad(prog(t, 0.25, 0.6)) * (1 - prog(t, PHONE, PHONE + 0.4)))
        eb.style.color = `rgb(${Math.round(lerp(239, 255, lock))},${Math.round(lerp(230, 236, lock))},${Math.round(lerp(214, 190, lock))})`
        eb.style.transform = `translateY(${(1 - ease.outCubic(prog(t, 0.25, 0.7))) * 14}px)`
        // ── glyph row
        gx.clearRect(0, 0, W, 160)
        const rowOut = 1 - ease.inQuad(prog(t, PHONE, PHONE + 0.35))
        if (rowOut > 0) {
          const x0 = W / 2 - (ROW.length - 1) * ROW_GAP / 2
          ROW.forEach((ph, i) => {
            const a = ease.outCubic(prog(t, 1.2 + i * 0.05, 1.55 + i * 0.05)) * rowOut
            const lit = passAt[i] != null ? prog(t, passAt[i], passAt[i] + 0.15) : 0
            const cur = i === TONIGHT ? prog(t, WAX[1], WAX[1] + 0.25) : 0
            const r = 22 + 4 * ease.outBack(cur)
            drawMoonGlyph(gx, x0 + i * ROW_GAP, 80, r, ph, { alpha: a * (0.45 + 0.55 * Math.max(lit, i > TONIGHT ? 0 : 0.2)), fillAlpha: lit * (i === TONIGHT ? 1 : 0.55), lw: 1.6, discAlpha: 0.08, glow: cur * 1.2 })
            if (i === TONIGHT && cur > 0) {   // gold dot under tonight
              gx.globalAlpha = a * cur; gx.fillStyle = GOLD
              gx.beginPath(); gx.arc(x0 + i * ROW_GAP, 80 + r + 18, 4, 0, 6.283); gx.fill(); gx.globalAlpha = 1
            }
          })
        }
        // ── lines
        l1.update(t - LINE1, L1OUT - LINE1)
        l1.root.style.transform = `translateY(${(1 - ease.outCubic(prog(t, LINE1, LINE1 + 0.6))) * 18}px)`
        e2.style.opacity = String(ease.outQuad(prog(t, LINE2, LINE2 + 0.3)) * (1 - prog(t, L2OUT, L2OUT + 0.3)))
        l2.update(t - LINE2 - 0.25, L2OUT - LINE2 - 0.25)
        l2.root.style.transform = `translateY(${(1 - ease.outCubic(prog(t, LINE2, LINE2 + 0.7))) * 18}px)`
        // ── phone
        const pp = ease.outCubic(prog(t, PHONE + 0.1, PHONE + 0.85))
        phone.style.opacity = String(clamp(pp * 2))
        phone.style.transform = `translateY(${(1 - pp) * 700}px) perspective(2200px) rotateX(${(1 - pp) * 18}deg) rotateZ(${(1 - pp) * -4 + Math.sin(t * 0.8) * 0.6}deg) scale(${1 + 0.02 * prog(t, PHONE + 0.85, END)})`
        sheen.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(prog(t, PHONE + 0.6, PHONE + 1.4)))}% 0%`
        cardBoxes.forEach((b, i) => { const a = PHONE + 1.05 + i * 0.25; b.style.opacity = String(Math.sin(Math.PI * prog(t, a, a + 0.5)) * 0.9) })
        tag.update(t)
      },
      fx(ctx, t) {
        if (t >= END + 0.2) return
        const a = 1 - prog(t, END - 0.1, END + 0.2)
        const m = moonState(t), mr = R * m.s * 0.98
        starField(ctx, t, { seed: 33, sprites: 18, dots: 60, alpha: 0.85 * a, drift: [-4, 12], keepOut: [[120, 1150, 840, 420], [100, 260, 880, 80], [m.cx - mr + 40, m.cy - mr + 40, 2 * mr - 80, 2 * mr - 80], ...(t > PHONE ? [[W / 2 - PW / 2, PCY - PH / 2, PW, PH]] : [])] })
      },
    }
  },
}

/** surface detail for an overlay pass (grey 128 = neutral), alpha = disc mask */
function makeDetail(R) {
  const S = 2 * R + 2, c = document.createElement('canvas'); c.width = c.height = S
  const g = c.getContext('2d')
  g.fillStyle = 'rgb(128,128,128)'; g.beginPath(); g.arc(S / 2, S / 2, R, 0, 6.283); g.fill()
  // speckle / regolith grain
  const id = g.getImageData(0, 0, S, S), d = id.data, r = rng(909)
  const vals = new Float32Array(S * S)
  for (let i = 0; i < vals.length; i++) vals[i] = r()
  for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++) {
    const o = (y * S + x) * 4
    if (!d[o + 3]) continue
    const n = (vals[y * S + x] * 2 + vals[y * S + x - 1] + vals[y * S + x + 1] + vals[(y - 1) * S + x] + vals[(y + 1) * S + x]) / 6
    const v = 128 + (n - 0.5) * 34
    d[o] = d[o + 1] = d[o + 2] = v
  }
  g.putImageData(id, 0, 0)
  // craters: dark floor, bright west wall, shadowed east wall (sun to the right while waxing)
  g.save(); g.beginPath(); g.arc(S / 2, S / 2, R, 0, 6.283); g.clip()
  for (let i = 0; i < 420; i++) {
    const a = r() * 6.283, dd = Math.sqrt(r()) * 0.96, cx = S / 2 + Math.cos(a) * dd * R, cy = S / 2 + Math.sin(a) * dd * R
    const cr = R * (0.006 + Math.pow(r(), 4) * 0.055)
    const fore = Math.sqrt(Math.max(0.05, 1 - dd * dd))            // foreshortening toward the limb
    const ang = Math.atan2(cy - S / 2, cx - S / 2)
    g.save(); g.translate(cx, cy); g.rotate(ang); g.scale(fore, 1); g.rotate(-ang)
    const k = 0.6 + r() * 0.4
    g.fillStyle = `rgba(70,70,70,${0.28 * k})`; g.beginPath(); g.arc(0, 0, cr, 0, 6.283); g.fill()
    g.fillStyle = `rgba(30,30,30,${0.45 * k})`; g.beginPath(); g.arc(cr * 0.28, 0, cr * 0.8, -1.2, 1.2); g.arc(cr * 0.05, 0, cr * 0.75, 1.1, -1.1, true); g.fill()
    g.fillStyle = `rgba(235,235,235,${0.4 * k})`; g.beginPath(); g.arc(-cr * 0.15, 0, cr * 0.95, 2.0, 4.28); g.arc(-cr * 0.02, 0, cr * 0.8, 4.1, 2.18, true); g.fill()
    g.restore()
  }
  // a soft broad wash so the maria read greyer and less flat
  const wg = g.createRadialGradient(S * 0.42, S * 0.4, R * 0.1, S / 2, S / 2, R)
  wg.addColorStop(0, 'rgba(150,150,150,0.35)'); wg.addColorStop(1, 'rgba(96,96,96,0.45)')
  g.fillStyle = wg; g.fillRect(0, 0, S, S)
  g.restore()
  return c
}

/** erase light text from a region of the screen: grey-erode (min filter) then blur → background estimate */
function eraseText(g, x0, y0, w, h, k = 16) {
  const id = g.getImageData(x0, y0, w, h), d = id.data
  const lum = (o) => d[o] * 0.3 + d[o + 1] * 0.55 + d[o + 2] * 0.15
  const src = new Uint8ClampedArray(d), tmp = new Uint8ClampedArray(d.length)
  const pass = (from, to, dx, dy) => {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      let best = -1, bl = 1e9
      for (let j = -k; j <= k; j++) {
        const xx = x + dx * j, yy = y + dy * j
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue
        const o = (yy * w + xx) * 4, l = from[o] * 0.3 + from[o + 1] * 0.55 + from[o + 2] * 0.15
        if (l < bl) { bl = l; best = o }
      }
      const o = (y * w + x) * 4
      to[o] = from[best]; to[o + 1] = from[best + 1]; to[o + 2] = from[best + 2]; to[o + 3] = 255
    }
  }
  pass(src, tmp, 1, 0); pass(tmp, d, 0, 1)
  void lum
  g.putImageData(id, x0, y0)
  // smooth the eroded patch
  g.save(); g.filter = 'blur(10px)'
  g.beginPath(); g.rect(x0, y0, w, h); g.clip()
  g.drawImage(g.canvas, x0 - 30, y0 - 30, w + 60, h + 60, x0 - 30, y0 - 30, w + 60, h + 60)
  g.restore()
}
function patchSky(cv, im) {
  const g = cv.getContext('2d')
  g.drawImage(im, 0, 0, 1170, 2532)
  // weekly-card moon status
  eraseText(g, 552, 1474, 470, 166)
  eraseText(g, 120, 1872, 740, 62)
  eraseText(g, 120, 1946, 900, 80)
  eraseText(g, 120, 2030, 940, 240)
  // tonight's moon in the circle
  g.save(); g.beginPath(); g.arc(405, 1557, 118, 0, 6.283); g.fillStyle = '#120a2a'; g.fill(); g.restore()
  const mc = moonCanvas(116, P1, { earthshine: 0.3, darkAlpha: 1 })
  g.drawImage(mc, 405 - mc.width / 2, 1557 - mc.height / 2)
  const gl = g.createRadialGradient(440, 1557, 100, 440, 1557, 190)
  gl.addColorStop(0, 'rgba(240,232,220,0.18)'); gl.addColorStop(1, 'rgba(240,232,220,0)')
  g.globalCompositeOperation = 'lighter'; g.fillStyle = gl; g.fillRect(220, 1360, 420, 400); g.globalCompositeOperation = 'source-over'
  const mono = (txt, x, y, col, size = 33, sp = 7) => { g.font = `400 ${size}px 'Space Mono', monospace`; try { g.letterSpacing = sp + 'px' } catch {} g.fillStyle = col; g.fillText(txt, x, y) }
  g.textBaseline = 'alphabetic'
  mono('☾ IN SAGITTARIUS', 568, 1516, '#f29a4a')
  mono('WAXING GIBBOUS', 568, 1570, 'rgba(226,218,236,0.82)')
  mono('82% LIT · GROWING', 568, 1624, 'rgba(226,218,236,0.82)')
  mono('TONIGHT · MOON IN SAGITTARIUS', 135, 1918, '#f29a4a', 30, 6.5)
  try { g.letterSpacing = '0px' } catch {}
  g.font = "italic 400 60px 'EB Garamond', serif"; g.fillStyle = '#f3ecdf'; g.fillText('Say the honest thing.', 135, 2006)
  g.font = "400 36px 'Inter', sans-serif"; g.fillStyle = 'rgba(232,224,238,0.88)'
  ;['The Moon sets the mood of the night. Tonight it\u2019s in', 'Sagittarius, a fire sign, so the truth lands softer', 'than you think. The Moon is growing, which', 'favours starting things.'].forEach((l, i) => g.fillText(l, 135, 2082 + i * 52))
}
