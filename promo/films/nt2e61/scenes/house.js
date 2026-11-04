// IN THIS HOUSE WE… : the format of Star Talk Trends Vol. 2, episodes 61–65 (nt2e61–nt2e65; rows in
// promo/films/next30/b14.md). Built on ./t2kit.js. The top caption "In this house *we…*" is stitched on a framed
// sampler hanging on a cozy wall for the whole story; each beat's sticker finishes the sentence (one house rule) while a
// little vignette plays the rule out in the room. Three stitched hearts on the sampler fill in, one per rule.
//
//   makeHouse(cfg) → makeT2 result. cfg = makeT2 cfg (minus bug / hookText / bg), plus:
//     cfg.wall: [base, stripe] wallpaper colours · cfg.rooms: per-beat room overrides { wall, floor, window: false }
//     cfg.stamp: defaults to 'HOUSE *RULES.*'
// Props for the episodes: door, couch, plant, table, mug, mailbox, calendar, drawer, lamp, rug, shelf, frame.
import { makeT2, R, box, drawBits, label, shadow, sparkles, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, SERIF, MONO, HEART, T } from './t2kit.js'

export * from './t2kit.js'

const WOOD = '#8a5a3a', WOOD_D = '#5e3a24', WOOD_L = '#b07a4e'
export const HOUSE = { WOOD, WOOD_D, WOOD_L, LINEN: '#f3e9d2', FLOOR: '#5b3c2c', FLOOR_L: '#6e4a36' }

// ── the room: wallpaper, a wainscot, plank floor, a night window, a warm lamp glow
export function drawRoom(x, t, { wall = '#3b2a55', stripe = '#45325f', floor = HOUSE.FLOOR, floorL = HOUSE.FLOOR_L, window: win = true, lamp = true, floorY = 1180 } = {}) {
  R(x, wall, 0, 0, 1080, floorY)
  for (let i = 0; i < 1080; i += 72) R(x, stripe, i, 0, 30, floorY)
  // tiny pixel flowers in the stripes
  for (let i = 0; i < 1080; i += 72) for (let j = 40; j < floorY - 200; j += 140) { R(x, 'rgba(255,190,210,0.18)', i + 11 + ((j / 140) % 2) * 0, j, 8, 8) }
  // wainscot
  R(x, INK, 0, floorY - 230, 1080, 8); R(x, '#2c1f42', 0, floorY - 222, 1080, 222)
  for (let i = 30; i < 1080; i += 180) { R(x, 'rgba(255,255,255,0.05)', i, floorY - 200, 150, 170); R(x, INK, i, floorY - 200, 150, 4) }
  // floor planks
  R(x, INK, 0, floorY, 1080, 8); R(x, floor, 0, floorY + 8, 1080, 1920 - floorY)
  for (let j = floorY + 8, k = 0; j < 1920; j += 64, k++) { R(x, 'rgba(0,0,0,0.28)', 0, j + 60, 1080, 4); for (let i = (k % 2) * 140; i < 1080; i += 280) R(x, 'rgba(0,0,0,0.28)', i, j, 4, 64); R(x, floorL, 0, j, 1080, 4) }
  if (win) {
    // a night window, top right under the sampler
    const wx = 800, wy = 470, ww = 200, wh = 250
    box(x, wx, wy, ww, wh, '#16123a', { b: 10 })
    R(x, '#221c55', wx, wy, ww, wh * 0.5)
    for (let i = 0; i < 9; i++) { const sx = wx + 16 + ((i * 53) % (ww - 30)), sy = wy + 14 + ((i * 37) % (wh - 40)); const tw = 0.5 + 0.5 * Math.sin(t * 3 + i * 2); R(x, `rgba(255,247,220,${0.4 + 0.5 * tw})`, sx, sy, 6, 6) }
    x.fillStyle = '#fff4cf'; x.beginPath(); x.arc(wx + 150, wy + 60, 22, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#16123a'; x.beginPath(); x.arc(wx + 140, wy + 54, 20, 0, Math.PI * 2); x.fill()
    R(x, INK, wx + ww / 2 - 5, wy, 10, wh); R(x, INK, wx, wy + wh / 2 - 5, ww, 10)
    R(x, '#c85a6e', wx - 34, wy - 20, 30, wh + 60); R(x, '#c85a6e', wx + ww + 4, wy - 20, 30, wh + 60)
    R(x, INK, wx - 40, wy - 30, ww + 80, 10)
  }
  if (lamp) {
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(130, 700, 10, 130, 700, 420); g.addColorStop(0, 'rgba(255,214,150,0.22)'); g.addColorStop(1, 'rgba(255,214,150,0)')
    x.fillStyle = g; x.fillRect(0, 280, 560, 840); x.restore()
    R(x, INK, 124, 760, 12, floorY - 760); box(x, 70, 640, 120, 110, '#f1c27a', { b: 6, hi: '#ffe0a8' }); box(x, 96, floorY - 18, 68, 18, WOOD_D, { b: 4 })
  }
}

// the sampler: a wooden frame + linen + a cross-stitch border, behind the top caption; three stitched hearts fill in
export function drawSampler(x, t, { y0 = 140, y1 = 372, hearts = 0, col = RED } = {}) {
  const X0 = 64, X1 = 1016
  box(x, X0, y0, X1 - X0, y1 - y0, WOOD, { b: 8, hi: WOOD_L, lo: WOOD_D })
  R(x, HOUSE.LINEN, X0 + 18, y0 + 18, X1 - X0 - 36, y1 - y0 - 36)
  // linen weave
  for (let i = X0 + 18; i < X1 - 18; i += 12) R(x, 'rgba(120,90,60,0.07)', i, y0 + 18, 2, y1 - y0 - 36)
  // cross-stitch border: little x's
  x.fillStyle = 'rgba(200,70,90,0.55)'
  for (let i = X0 + 34; i < X1 - 34; i += 22) for (const yy of [y0 + 30, y1 - 38]) { x.fillRect(i, yy, 8, 2); x.fillRect(i + 3, yy - 3, 2, 8) }
  // a nail + string
  R(x, INK, 538, y0 - 34, 6, 30); R(x, GOLD, 534, y0 - 40, 14, 10)
  // the hearts (progress): outlined until their rule is told
  for (let i = 0; i < 3; i++) {
    const hx = 540 + (i - 1) * 54, hy = y1 - 2
    const on = hearts > i
    drawBits(x, HEART, { H: on ? col : HOUSE.LINEN }, hx, hy, 5, { outline: INK })
  }
}

// ── props
export function door(x, cx, floorY, { open = 0, col = '#7a4a8a', h = 470, w = 230 } = {}) {
  box(x, cx - w / 2 - 18, floorY - h - 18, w + 36, h + 18, '#2a1d3e', { b: 8 })
  R(x, '#ffe7b0', cx - w / 2, floorY - h, w, h)                       // warm hallway light behind
  const ww = w * (1 - 0.82 * open)
  box(x, cx - w / 2, floorY - h, ww, h, col, { b: 6, hi: 'rgba(255,255,255,0.16)' })
  if (ww > 40) { R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + ww * 0.15, floorY - h + 40, ww * 0.7, 150); R(x, 'rgba(0,0,0,0.18)', cx - w / 2 + ww * 0.15, floorY - h + 230, ww * 0.7, 190); box(x, cx - w / 2 + ww - 34, floorY - h / 2, 14, 14, GOLD, { b: 4 }) }
  R(x, '#c26a5a', cx - w / 2 - 30, floorY - 4, w + 60, 14)              // welcome mat
}
export function couch(x, cx, cy, { col = '#4f7cd8', w = 520 } = {}) {
  box(x, cx - w / 2, cy - 150, w, 120, col, { b: 8, hi: 'rgba(255,255,255,0.18)' })
  box(x, cx - w / 2 - 50, cy - 110, 70, 150, col, { b: 8 }); box(x, cx + w / 2 - 20, cy - 110, 70, 150, col, { b: 8 })
  box(x, cx - w / 2 + 10, cy - 40, w - 20, 80, col, { b: 8, lo: 'rgba(0,0,0,0.2)' })
  R(x, INK, cx - w / 2 - 40, cy + 40, 24, 30); R(x, INK, cx + w / 2 + 16, cy + 40, 24, 30)
}
export function plant(x, t, cx, floorY, { h = 160, col = '#3fb08a', pot = '#c26a5a', tag = null, sway = 1, seed = 0 } = {}) {
  const sw = Math.sin(t * 2 + seed) * 0.05 * sway
  box(x, cx - 50, floorY - 90, 100, 90, pot, { b: 6, hi: 'rgba(255,255,255,0.2)' })
  for (let i = 0; i < 5; i++) {
    const a = -Math.PI / 2 + (i - 2) * 0.42 + sw
    x.save(); x.translate(cx, floorY - 90); x.rotate(a + Math.PI / 2)
    box(x, -14, -h * (0.7 + 0.3 * ((i * 7 + seed) % 3) / 2), 28, h * (0.7 + 0.3 * ((i * 7 + seed) % 3) / 2), i % 2 ? col : '#5fcf9f', { b: 4 })
    x.restore()
  }
  if (tag) {
    x.save(); x.translate(cx + 4, floorY - 44); x.rotate(-0.06)
    x.font = `800 26px ${INTER}`; const w = x.measureText(tag).width + 26
    box(x, -w / 2, -20, w, 40, BONE, { b: 4 }); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(tag, 0, 2)
    x.restore()
  }
}
export function table(x, cx, floorY, { w = 420, h = 200, col = WOOD } = {}) {
  box(x, cx - w / 2, floorY - h, w, 30, col, { b: 6, hi: WOOD_L })
  R(x, INK, cx - w / 2 + 20, floorY - h + 30, 22, h - 30); R(x, INK, cx + w / 2 - 42, floorY - h + 30, 22, h - 30)
  R(x, WOOD_D, cx - w / 2 + 26, floorY - h + 30, 10, h - 30); R(x, WOOD_D, cx + w / 2 - 36, floorY - h + 30, 10, h - 30)
}
export function mug(x, cx, cy, { col = '#ff8fb1', s = 1, chip = false, steam = 0, t = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -34, -40, 68, 80, col, { b: 5, hi: 'rgba(255,255,255,0.25)' })
  R(x, INK, 34, -24, 22, 6); R(x, INK, 50, -24, 6, 36); R(x, INK, 34, 6, 22, 6)
  if (chip) { R(x, INK, 14, -45, 18, 12); R(x, '#2a1d3e', 18, -40, 10, 6) }
  for (let i = 0; i < 3 * steam; i++) { const ph = (t * 0.7 + i / 3) % 1; x.globalAlpha = (1 - ph) * 0.6; R(x, BONE, -16 + i * 14 + Math.sin(t * 4 + i) * 6, -60 - ph * 70, 8, 16); x.globalAlpha = 1 }
  x.restore()
}
export function mailbox(x, cx, floorY, { flag = 0 } = {}) {
  R(x, INK, cx - 10, floorY - 220, 20, 220); R(x, WOOD_D, cx - 5, floorY - 220, 10, 220)
  box(x, cx - 70, floorY - 320, 140, 100, '#4f7cd8', { b: 6, hi: 'rgba(255,255,255,0.2)' })
  x.save(); x.translate(cx + 74, floorY - 300); x.rotate(-flag * Math.PI / 2); R(x, INK, -4, -4, 12, 80); box(x, 0, 40, 40, 30, RED, { b: 4 }); x.restore()
}
export function calendar(x, t, cx, cy, { marks = {}, w = 440, h = 380, title = 'THIS WEEK' } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, BONE, { b: 8 })
  R(x, RED, cx - w / 2, cy - h / 2, w, 70)
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(title, cx, cy - h / 2 + 37)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], cw = (w - 40) / 7, top = cy - h / 2 + 90
  x.font = `700 22px ${MONO}`; x.fillStyle = INK
  days.forEach((d, i) => x.fillText(d, cx - w / 2 + 20 + cw * (i + 0.5), top + 4))
  for (let r = 0; r < 2; r++) for (let i = 0; i < 7; i++) {
    const X = cx - w / 2 + 20 + cw * i, Y = top + 24 + r * 120
    R(x, 'rgba(27,18,54,0.18)', X + 2, Y, cw - 4, 110)
    const m = marks[`${r}${i}`]
    if (m) m(x, X + cw / 2, Y + 55, cw)
  }
  void t
}
export function drawer(x, cx, cy, { w = 360, h = 150, open = 0, labelText = null } = {}) {
  box(x, cx - w / 2 - 20, cy - h / 2 - 20, w + 40, h * 2 + 60, WOOD, { b: 8, hi: WOOD_L })
  const dy = -open * 0
  box(x, cx - w / 2 + open * 0, cy - h / 2 + dy, w, h, WOOD_L, { b: 6 })
  box(x, cx - w / 2, cy + h / 2 + 20, w, h, WOOD_L, { b: 6 })
  box(x, cx - 36, cy - 10, 72, 18, GOLD, { b: 4 }); box(x, cx - 36, cy + h + 10, 72, 18, GOLD, { b: 4 })
  if (labelText) {
    x.save(); x.translate(cx, cy - h / 2 + 34); x.rotate(-0.03)
    x.font = `700 26px ${MONO}`; const tw = x.measureText(labelText).width + 26
    R(x, INK, -tw / 2 - 4, -22, tw + 8, 44); R(x, '#fffdf4', -tw / 2, -18, tw, 36); x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(labelText, 0, 1)
    x.restore()
  }
}
export function rug(x, cx, cy, w = 620, col = '#c85a6e') {
  x.save(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 8, w * 0.1 + 6, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.ellipse(cx, cy, w / 2, w * 0.1, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.ellipse(cx, cy, w * 0.36, w * 0.065, 0, 0, Math.PI * 2); x.fill(); x.restore()
}
/** a small held/placed phone with a short message */
export function phoneMsg(x, cx, cy, lines, { rot = 0, s = 1, col = '#9fe6b0' } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -70, -125, 140, 250, '#2a2148', { b: 7 }); R(x, '#14102a', -58, -108, 116, 210)
  x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { x.font = `700 ${i === 0 ? 22 : 32}px ${MONO}`; x.fillStyle = i === 0 ? col : BONE; x.fillText(l, 0, -52 + i * 42) })
  x.restore()
}
/** a pixel thought/speech word in big Inter (sound-effect text) */
export function sfx(x, t, text, cx, cy, t0, { size = 44, col = GOLD, rot = 0, life = 0.8 } = {}) {
  const k = pop01(t, t0, 0.2, 3) * outK(t, [t0 + life, t0 + life + 0.2])
  if (k > 0.01 && t >= t0) label(x, text, cx, cy, { size: size * k, col, font: INTER, weight: 800, rot })
}

export function makeHouse(cfg) {
  const rooms = cfg.rooms || []
  return makeT2({
    bug: ['IN THIS', 'HOUSE'],
    hookText: 'In this house *we…*',
    hookTop: 176, hookSize: 84, hookAccent: 120, hookColor: INK, hookShadow: '0 3px 0 rgba(176,122,78,0.35)',
    stamp: cfg.stamp === undefined ? 'HOUSE *RULES.*' : cfg.stamp,
    ...cfg,
    // the sampler stays on the wall: redraw it over any beat that paints its own backdrop (e.g. outdoors)
    tells: cfg.tells.map((tl, i) => ({ ...tl, draw(x, t, S) {
      tl.draw(x, t, S)
      if (tl.outside) { const told = i + (S.u > (tl.stickerAt ?? (i === 2 ? 0.55 : 0.35)) ? 1 : 0); drawSampler(x, t, { hearts: told }) }
    } })),
    bg(x, t, S) {
      const rm = S.phase === 'tell' ? (rooms[S.i] || {}) : (cfg.room || {})
      drawRoom(x, t, { wall: (cfg.wall || [])[0], stripe: (cfg.wall || [])[1], ...rm })
      if (t < T.h0Out[1]) {
        const told = S.phase === 'tell' ? S.i + (S.u > (S.i === 2 ? 0.55 : 0.35) ? 1 : 0) : S.phase === 'finale' ? 3 : 0
        x.save(); const o = outK(t, T.h0Out); x.globalAlpha = o; drawSampler(x, t, { hearts: told }); x.restore()
      }
    },
  })
}
void [shadow, sparkles, prog, lerp, clamp, ease, PINK, SERIF, GOLD]
