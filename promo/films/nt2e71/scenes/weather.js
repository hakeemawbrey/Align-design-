// IF THE SIGNS WERE WEATHER: the format of Star Talk Trends Vol. 2, episodes 71–75 (nt2e71–nt2e75; rows in
// promo/films/next30/b14.md). Built on ../../nt2e61/scenes/t2kit.js. Three signs, three skies: each beat is a jump cut
// into that sign's weather (a full-frame sky, its weather effect, the sign star living in it) with a forecast sticker.
// Gentle weather only: sun, golden hour, breeze, drizzle, fog, frost, snow, a sun shower, a clear night. No storms.
//
//   makeWeather(cfg) → makeT2 result. cfg = makeT2 cfg (minus bug / bg), plus each tell:
//     { sign, sky: [top, bottom], fx(x, t, S), caption, draw?(x, t, S) (extra props / the star), badge }
//   cfg.hookSky, cfg.hookFx(x, t): the hook's sky. cfg.finaleSky: the finale's sky.
// Weather FX: skyGrad, sun, cloud, rain, snow, fog, wind, rainbow, frostFrame, nightStars, kite, umbrella.
import { makeT2, R, box, label, shadow, drawBits, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, T } from '../../nt2e61/scenes/t2kit.js'
export * from '../../nt2e61/scenes/t2kit.js'

export const GROUND_Y = 1240

export function skyGrad(x, [top, bot], { ground = '#3a6a4a', groundY = GROUND_Y, hills = true } = {}) {
  const g = x.createLinearGradient(0, 0, 0, groundY); g.addColorStop(0, top); g.addColorStop(1, bot)
  x.fillStyle = g; x.fillRect(0, 0, 1080, groundY)
  if (hills) {
    x.fillStyle = 'rgba(0,0,0,0.18)'
    for (let i = 0; i < 1080; i += 8) { const h = 60 + 40 * Math.sin(i * 0.006 + 1) + 20 * Math.sin(i * 0.017); x.fillRect(i, groundY - h, 8, h) }
  }
  R(x, INK, 0, groundY, 1080, 8)
  x.fillStyle = ground; x.fillRect(0, groundY + 8, 1080, 1920 - groundY)
  for (let j = groundY + 60; j < 1920; j += 70) R(x, 'rgba(0,0,0,0.12)', 0, j, 1080, 5)
}

export function sun(x, t, cx, cy, r, { col = '#ffd23f', rays = 1 } = {}) {
  if (rays > 0) {
    x.save(); x.translate(cx, cy); x.rotate(t * 0.3); x.globalAlpha = rays
    for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); R(x, INK, r + 14, -10, 64, 20); R(x, '#ffe98a', r + 18, -6, 56, 12) }
    x.restore()
  }
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.45)'; x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.35, r * 0.25, 0, Math.PI * 2); x.fill()
}

export function cloud(x, cx, cy, s = 1, { col = '#f4f0ff', shade = 'rgba(120,110,170,0.25)', alpha = 1 } = {}) {
  const puffs = [[-110, 20, 70], [-40, -20, 90], [50, -10, 80], [120, 25, 60], [0, 30, 70]]
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; for (const [dx, dy, r] of puffs) { x.beginPath(); x.arc(dx, dy, r + 8, 0, Math.PI * 2); x.fill() }
  x.fillStyle = col; for (const [dx, dy, r] of puffs) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  x.fillStyle = shade; x.fillRect(-170, 40, 340, 50)
  x.restore()
}

export function rain(x, t, { n = 60, col = 'rgba(170,200,255,0.75)', speed = 1.4, len = 34, slant = 0.15, area = [0, 0, 1080, GROUND_Y], gentle = true } = {}) {
  const [ax, ay, aw, ah] = area
  for (let i = 0; i < n; i++) {
    const ph = (t * speed + i * 0.6180339) % 1, px = ax + ((i * 97.3) % aw) - ph * ah * slant, py = ay + ph * ah
    x.fillStyle = col; x.save(); x.translate(px, py); x.rotate(-slant); x.fillRect(0, 0, gentle ? 5 : 6, len); x.restore()
  }
}

export function snow(x, t, { n = 70, speed = 0.18, area = [0, 0, 1080, 1920] } = {}) {
  const [ax, ay, aw, ah] = area
  for (let i = 0; i < n; i++) {
    const ph = (t * speed * (0.7 + (i % 5) * 0.12) + i * 0.6180339) % 1, px = ax + ((i * 131.7) % aw) + 30 * Math.sin(t * 1.3 + i), py = ay + ph * ah
    const s = 8 + (i % 3) * 4
    R(x, INK, px - 2, py - 2, s + 4, s + 4); R(x, '#ffffff', px, py, s, s)
  }
}

export function fog(x, t, lift = 0, { alpha = 0.85 } = {}) {
  for (let b = 0; b < 6; b++) {
    const y = 300 + b * 170 - lift * 900, a = alpha * (1 - lift) * (0.55 + 0.1 * b)
    if (a <= 0.01) continue
    x.save(); x.globalAlpha = a
    for (let i = -1; i < 7; i++) { const cx = ((i * 220 + t * (20 + b * 8)) % 1540) - 230; x.fillStyle = '#d8d4ea'; x.beginPath(); x.ellipse(cx, y, 200, 70, 0, 0, Math.PI * 2); x.fill() }
    x.restore()
  }
}

export function wind(x, t, { n = 9, col = 'rgba(255,255,255,0.7)', speed = 1.2 } = {}) {
  for (let i = 0; i < n; i++) {
    const ph = (t * speed + i / n) % 1, y = 300 + ((i * 173) % 820), px = -200 + ph * 1480
    x.save(); x.globalAlpha = Math.sin(Math.PI * ph)
    x.strokeStyle = col; x.lineWidth = 7; x.lineCap = 'round'; x.beginPath(); x.moveTo(px - 160, y); x.quadraticCurveTo(px - 60, y - 18, px, y); x.arc(px, y - 22, 22, Math.PI / 2, -Math.PI * 0.8, true); x.stroke()
    x.restore()
  }
}

export function rainbow(x, cx, cy, r, k = 1) {
  const cols = ['#ff5c7a', '#ff9a5c', '#ffd23f', '#7fe08a', '#7fd0ff', '#a98bff']
  x.save(); x.lineWidth = 26
  cols.forEach((c, i) => { x.strokeStyle = INK; x.lineWidth = 30; x.beginPath(); x.arc(cx, cy, r - i * 26, Math.PI, Math.PI + Math.PI * k); x.stroke() })
  cols.forEach((c, i) => { x.strokeStyle = c; x.lineWidth = 22; x.beginPath(); x.arc(cx, cy, r - i * 26, Math.PI, Math.PI + Math.PI * k); x.stroke() })
  x.restore()
}

export function nightStars(x, t, n = 60) {
  for (let i = 0; i < n; i++) { const px = (i * 157.1) % 1080, py = 140 + (i * 241.7) % 900, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * (0.8 + (i % 4) * 0.4) + i)); const s = i % 7 === 0 ? 10 : 5; R(x, `rgba(255,248,225,${tw})`, px, py, s, s) }
}

/** a window frame with frost creeping in from the edges; melt 0…1 clears it */
export function frostFrame(x, t, { melt = 0, x0 = 120, y0 = 360, w = 840, h = 820, hearts = 0 } = {}) {
  box(x, x0, y0, w, h, 'rgba(0,0,0,0)', { b: 26 })
  R(x, '#8a5a3a', x0 - 26, y0 - 26, w + 52, 26); R(x, '#8a5a3a', x0 - 26, y0 + h, w + 52, 26); R(x, '#8a5a3a', x0 - 26, y0, 26, h); R(x, '#8a5a3a', x0 + w, y0, 26, h)
  R(x, '#8a5a3a', x0 + w / 2 - 10, y0, 20, h); R(x, '#8a5a3a', x0, y0 + h / 2 - 10, w, 20)
  const k = 1 - melt
  if (k > 0) {
    x.save(); x.globalAlpha = 0.85 * k
    for (let i = 0; i < 160; i++) {
      const side = i % 4, f = ((i * 0.6180339) % 1), d = (((i * 37) % 11) / 11) * 150 * k + 20
      let px, py
      if (side === 0) { px = x0 + f * w; py = y0 + d * 0.6 } else if (side === 1) { px = x0 + f * w; py = y0 + h - d * 0.6 } else if (side === 2) { px = x0 + d * 0.6; py = y0 + f * h } else { px = x0 + w - d * 0.6; py = y0 + f * h }
      x.fillStyle = i % 3 ? '#e8f6ff' : '#bfe6ff'; x.fillRect(px, py, 14, 14)
    }
    x.restore()
  }
  if (hearts > 0) {
    const H = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
    x.save(); x.globalAlpha = 0.9
    const pts = [[x0 + 230, y0 + 230], [x0 + w - 230, y0 + h - 250]]
    pts.slice(0, Math.ceil(hearts)).forEach(([hx, hy]) => drawBits(x, H, { H: '#e8f6ff' }, hx, hy, 18, { outline: 'rgba(120,170,210,0.8)' }))
    x.restore()
  }
}

export function kite(x, t, cx, cy, { col = '#ff5c7a', rot = 0, string = null } = {}) {
  if (string) { x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, cy + 70); x.quadraticCurveTo((cx + string[0]) / 2 + 60, (cy + string[1]) / 2 + 80, string[0], string[1]); x.stroke() }
  x.save(); x.translate(cx, cy); x.rotate(rot + 0.1 * Math.sin(t * 3))
  x.fillStyle = INK; x.beginPath(); x.moveTo(0, -90); x.lineTo(68, 0); x.lineTo(0, 90); x.lineTo(-68, 0); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(0, -78); x.lineTo(56, 0); x.lineTo(0, 78); x.lineTo(-56, 0); x.closePath(); x.fill()
  x.fillStyle = '#ffd23f'; x.beginPath(); x.moveTo(0, -78); x.lineTo(56, 0); x.lineTo(0, 0); x.closePath(); x.fill()
  for (let i = 0; i < 4; i++) R(x, i % 2 ? '#7fd0ff' : '#ffd23f', -8 + 14 * Math.sin(t * 5 + i), 96 + i * 30, 16, 16)
  x.restore()
}

export function umbrella(x, cx, cy, { col = '#ff5c7a', s = 1, rot = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  R(x, INK, -5, -10, 10, 200)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 160, Math.PI, 0); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 150, Math.PI, 0); x.fill()
  for (let i = 0; i < 4; i++) { x.fillStyle = i % 2 ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.12)'; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, 150, Math.PI + i * Math.PI / 4, Math.PI + (i + 1) * Math.PI / 4); x.fill() }
  x.restore()
}

export function makeWeather(cfg) {
  const tells = cfg.tells.map(tl => ({
    ...tl,
    draw(x, t, S) {
      if (tl.draw) tl.draw(x, t, S)
      if (tl.front) tl.front(x, t, S)
    },
  }))
  return makeT2({
    bug: ['IF THE SIGNS', 'WERE WEATHER'],
    stamp: null, score: cfg.score || 'aww.',
    hookSize: 76, hookAccent: 108, bugPlate: true,
    hookShadow: '0 4px 0 rgba(27,18,54,0.95), 0 0 24px rgba(27,18,54,0.6)',
    ...cfg,
    tells,
    bg(x, t, S) {
      if (S.phase === 'hook') cfg.hookBg(x, t)
      else if (S.phase === 'finale') cfg.finaleBg(x, t)
      else { const tl = cfg.tells[S.i]; tl.backdrop(x, t, S) }
    },
  })
}
void [label, shadow, pop01, outK, prog, lerp, clamp, ease, GOLD, PINK, RED, INTER, T]
