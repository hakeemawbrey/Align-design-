// Align PS2 reels from stills: AI-made keyframes (in art/) cut together with
// slow camera moves, crossfades, captions, an end card and a score.
// window.setup(script, assets) once, then window.frame(t) for any frame.

const W = 1080
const H = 1920
const FPS = 30
let S

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x) }
const lerp = (a, b, u) => a + (b - a) * u
const loadImg = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('missing ' + src)); i.src = src })

function drawStar(x, cx, cy, r, c1, c2) {
  const g = x.createLinearGradient(cx, cy - r, cx, cy + r)
  g.addColorStop(0, c2); g.addColorStop(1, c1)
  x.fillStyle = g
  x.beginPath()
  x.moveTo(cx, cy - r)
  x.quadraticCurveTo(cx + r * 0.12, cy - r * 0.12, cx + r * 0.56, cy)
  x.quadraticCurveTo(cx + r * 0.12, cy + r * 0.12, cx, cy + r)
  x.quadraticCurveTo(cx - r * 0.12, cy + r * 0.12, cx - r * 0.56, cy)
  x.quadraticCurveTo(cx - r * 0.12, cy - r * 0.12, cx, cy - r)
  x.fill()
}
function wrap(x, text, maxW) {
  const out = []
  for (const para of text.split('\n')) {
    let line = ''
    for (const w of para.split(' ')) {
      const test = line ? line + ' ' + w : w
      if (x.measureText(test).width > maxW && line) { out.push(line); line = w } else line = test
    }
    out.push(line)
  }
  return out
}
function caption(x, text, style, k) {
  if (!text) return
  x.save()
  x.globalAlpha = clamp(k * 6)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (style === 'caps') {
    x.font = '700 54px Poppins'; x.letterSpacing = '3px'
    const lines = wrap(x, text.toUpperCase(), W * 0.8)
    const y0 = H * 0.74 - ((lines.length - 1) * 66) / 2
    lines.forEach((l, i) => {
      x.lineWidth = 11; x.strokeStyle = '#000'; x.lineJoin = 'round'; x.strokeText(l, W / 2, y0 + i * 66)
      x.fillStyle = '#fff'; x.fillText(l, W / 2, y0 + i * 66)
    })
  } else {
    x.font = '600 50px Poppins'
    const lines = wrap(x, text, W * 0.82)
    const y0 = H * 0.8 - ((lines.length - 1) * 62) / 2
    lines.forEach((l, i) => {
      x.shadowColor = 'rgba(0,0,0,0.9)'; x.shadowBlur = 10; x.shadowOffsetY = 3
      x.lineWidth = 5; x.strokeStyle = 'rgba(0,0,0,0.75)'; x.strokeText(l, W / 2, y0 + i * 62)
      x.shadowBlur = 0; x.shadowOffsetY = 0
      x.fillStyle = '#fff'; x.fillText(l, W / 2, y0 + i * 62)
    })
  }
  x.restore()
}

function endCard(x, u, end) {
  const g = x.createRadialGradient(W / 2, H * 0.42, 40, W / 2, H * 0.45, H * 0.7)
  g.addColorStop(0, '#3a2466'); g.addColorStop(0.5, '#1e1240'); g.addColorStop(1, '#0d0820')
  x.fillStyle = g; x.fillRect(0, 0, W, H)
  const r = rng(5)
  for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(255,255,255,${0.2 + r() * 0.5})`; x.beginPath(); x.arc(r() * W, r() * H, 1 + r() * 2.2, 0, 7); x.fill() }
  const k = ease(u * 2.2)
  x.save()
  x.globalAlpha = k
  const glow = x.createRadialGradient(W / 2, H * 0.36, 0, W / 2, H * 0.36, 360)
  glow.addColorStop(0, 'rgba(255,210,150,0.4)'); glow.addColorStop(1, 'rgba(255,210,150,0)')
  x.fillStyle = glow; x.fillRect(0, 0, W, H)
  drawStar(x, W / 2, H * 0.36, 210 * (0.92 + 0.08 * k), '#f1c66a', '#fdf0c4')
  x.fillStyle = '#f6ead0'; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = 'italic 500 150px "EB Garamond"'; x.fillText('align', W / 2, H * 0.56)
  x.globalAlpha = ease((u - 0.25) * 3)
  x.font = '500 46px Poppins'
  wrap(x, end.line || '', W * 0.8).forEach((l, i) => x.fillText(l, W / 2, H * 0.64 + i * 60))
  x.fillStyle = 'rgba(246,234,208,0.7)'; x.font = '400 32px "Space Mono"'
  x.fillText(end.sub || 'a new deal at 11:11', W / 2, H * 0.72)
  x.restore()
}


// Draw an image to cover the 9:16 frame, with a camera move: from/to are
// [x, y, zoom], x and y being the focus point (0..1) of the source image.
function cover(x, img, cam, alpha = 1) {
  if (!img || alpha <= 0) return
  const [fx, fy, z] = cam
  const s = Math.max(W / img.width, H / img.height) * z
  const dw = img.width * s
  const dh = img.height * s
  let dx = W / 2 - fx * dw
  let dy = H / 2 - fy * dh
  dx = Math.min(0, Math.max(W - dw, dx))
  dy = Math.min(0, Math.max(H - dh, dy))
  x.globalAlpha = alpha
  x.drawImage(img, dx, dy, dw, dh)
  x.globalAlpha = 1
}

// A light PS2/CRT finish over the art: soften, grain, vignette, optional mono.
function finish(x, t, bw) {
  if (bw) {
    x.save(); x.globalCompositeOperation = 'saturation'; x.fillStyle = '#000'; x.fillRect(0, 0, W, H); x.restore()
    x.save(); x.globalCompositeOperation = 'overlay'; x.fillStyle = 'rgba(128,128,128,0.25)'; x.fillRect(0, 0, W, H); x.restore()
  }
  const g = S.grain[Math.floor(t * FPS) % S.grain.length]
  x.save(); x.globalCompositeOperation = 'overlay'; x.globalAlpha = 0.5; x.drawImage(g, 0, 0, W, H); x.restore()
  const vg = x.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.78)
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.42)')
  x.fillStyle = vg; x.fillRect(0, 0, W, H)
}

window.setup = async (script, assets) => {
  for (const [family, src, style, weight] of assets.fonts) {
    const f = new FontFace(family, `url(${src})`, { style, weight })
    await f.load(); document.fonts.add(f)
  }
  const imgs = {}
  for (const b of script.beats) for (const k of [b.img, ...(b.layers || []).map((l) => l.img)]) if (k && !imgs[k]) imgs[k] = await loadImg(assets.art + k)
  let t0 = 0
  for (const b of script.beats) { b._t0 = t0; b._dur = b.dur || 2.6; t0 += b._dur }
  // a few frames of grain, reused
  const grain = []
  const r = rng(3)
  for (let k = 0; k < 6; k++) {
    const c = document.createElement('canvas'); c.width = W / 3; c.height = H / 3
    const gx = c.getContext('2d'); const d = gx.createImageData(c.width, c.height)
    for (let i = 0; i < d.data.length; i += 4) { const v = 128 + (r() - 0.5) * 60; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255 }
    gx.putImageData(d, 0, 0); grain.push(c)
  }
  const out = document.getElementById('c'); out.width = W; out.height = H
  S = { script, imgs, out, x: out.getContext('2d'), grain, duration: t0 }
  return { duration: t0, frames: Math.round(t0 * FPS), cues: script.beats.map((b) => ({ t: b._t0, k: b.cue || (b.end ? 'end' : 'cut') })) }
}

window.frame = (t) => {
  const beats = S.script.beats
  let b = beats[beats.length - 1]
  for (const q of beats) if (t >= q._t0 && t < q._t0 + q._dur) { b = q; break }
  const lt = t - b._t0
  const u = clamp(lt / b._dur)
  const x = S.x
  x.fillStyle = '#000'; x.fillRect(0, 0, W, H)
  if (b.end) {
    endCard(x, u, S.script.end || {})
  } else {
    const from = b.from || [0.5, 0.5, 1.0]
    const to = b.to || [from[0], from[1], from[2] * 1.06]
    const k = ease(u) * 0.85 + u * 0.15
    const cam = [lerp(from[0], to[0], k), lerp(from[1], to[1], k), lerp(from[2], to[2], k)]
    // tiny handheld drift
    cam[0] += Math.sin(t * 0.9) * 0.002; cam[1] += Math.sin(t * 1.3) * 0.002
    cover(x, S.imgs[b.img], cam)
    // layers crossfade in at a time (e.g. the eyes-closed frame)
    for (const l of b.layers || []) cover(x, S.imgs[l.img], cam, clamp((lt - l.at) / (l.fade ?? 0.25)))
    finish(x, t, b.bw)
    caption(x, b.text, S.script.captions || 'caps', lt - (b.textAt || 0))
  }
  // a short dip to black on hard cuts marked "dip"
  if (b.dip) { const d = Math.max(0, 1 - Math.min(lt, b._dur - lt) / 0.12); if (d) { x.fillStyle = `rgba(0,0,0,${d})`; x.fillRect(0, 0, W, H) } }
  return S.out.toDataURL('image/jpeg', 0.92)
}
