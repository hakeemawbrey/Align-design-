// st11space — Star Talk season 11 "Far Out" (promo/films/STARTALK11.md): the shared ROCKETS + MISSION KIT. Owned by the
// st11aries session (S11 E01); every season-11 episode imports it. Don't edit from another session: add what you need in
// your own folder. Drawn in startalk.js's pixel style (crisp cells, 1-cell ink outline, soft additive glow). Pure f(t).
//
// ═══════════════════════════════════════ API (copy-paste) ═══════════════════════════════════════
//   import { drawRocket, drawSpaceSuit, drawMissionControl, missionHUD, starfield, drawPlanet,
//            drawStarBall, drawCluster, drawCountdown, countdownTimes, countdownCues, launchCues, warpCues, cheerCues,
//            SPACE_FONTS, SPACE } from '../../st11space.js'
//
//   In build():  try { await Promise.all(SPACE_FONTS.map(f => document.fonts.load(f))) } catch (_) {}
//   Everything below is a canvas painter (call it every frame, any order) or a pure cue list. No DOM, no state.
//
// drawRocket(ctx, x, y, size, t, { color, flame = 1, shake = 0, rot = 0, pilot = null, stowaway = 0, smoke = 0,
//                                  alpha = 1, pop = 1, seed = 1, trail = 0 })
//   A chunky pixel rocket, nose up, centred on (x, y); size = hull height in px (≈ 260–620 for a hero, 90–160 in a fleet).
//   color = the sign colour (signStar('aries').color): nose cone, stripes and (darker) fins; the hull is bone.
//   flame 0…1.4: the flickering pixel exhaust under the nozzle (0 = engines off). shake px: launch rumble jitter.
//   rot: radians (0 = straight up, +π/2 = flying right). pilot: a colour → a tiny star face in the porthole (2 eyes,
//   blinks). stowaway 0…1: THE GHOST (stlore's sheet) peeks out from behind the hull's right side (0 hidden, 1 full
//   peek) — the season's stowaway; animate it yourself, e.g. stowaway: pop01(t, 4.0) * (1 - pop01(t, 5.6)).
//   smoke 0…1: launch-pad smoke billows round the base. trail 0…1: a fading pixel exhaust trail behind it (in flight).
//   Returns { x, y, size, cell, top: [x, y], nozzle: [x, y], window: [x, y] } (points already rotated).
//
// drawSpaceSuit(ctx, x, y, size, t, { sign, helmet = true, tank = true, glare = 1, antenna = true, ...drawStarChar opts })
//   The sign star (drawStarChar, sign colour + glyph from signStar(sign); pass color/glyph to override) in a pixel bubble
//   helmet: glass tint, a stepped pixel rim, a curved visor glare top-left, a metal collar ring at the base, twin air
//   tanks behind it and a little antenna with a blinking light. Every drawStarChar opt works (mood, look, hops, bob,
//   seed, glow, alpha, pop…) and the helmet follows the hops. helmet: false = helmet off (tanks + collar go too).
//   star: the drawer for the wearer (default drawStarChar; any fn with its signature, e.g. st5cast's drawTwin).
//   Returns drawStarChar's { x, y, size, top } plus helmet: { x, y, r }.
//
// drawMissionControl(ctx, t, { mission = 'MISSION 01', screens = {}, cheer = 0, cheerAt = null, crew = true,
//                              label = 'HOUSTON · MISSION CONTROL', alpha = 1, screenY = 330 })
//   Houston Mission Control filling the 1080×1920 frame: a dark navy room, the "MISSION 01" title over a big wall screen
//   (x 90…990, y screenY…screenY + 520), three tiers of consoles with blinking monitors, and a crew of little pixel stars
//   in headsets behind the desks. screens:
//     big      'track' (default: a dotted trajectory from Earth to the target, the rocket icon at `progress`)
//              | 'countdown' (a giant `count`) | 'stars' | 'live' (a "LIVE" feed: a starfield + `target` planet dot)
//              | (ctx, rect, t) => {} to paint your own (clipped to the screen; rect = { x, y, w, h }).
//     progress 0…1 (track) · target 'THE PLEIADES' · from 'EARTH' · count '3' · text: a caption strip on the screen.
//     colors   monitor colours (default cyan/green/amber).
//   cheer 0…1: the crew hops (from cheerAt, about every 0.45 s), goes happy and confetti falls. crew: false = empty seats.
//   Returns { screen: { x, y, w, h }, desks: [y, y, y], spots: { director: [x, y], front: [x, y], left: [x, y], right: [x, y] } }
//   (director = where Saturn the flight director stands, in front of the screen; front = the front-row middle seat).
//
// missionHUD(ctx, t, { mission = 'MISSION 01', target, distance, status, x = 1010, y = 118, align = 'right',
//                      at = null, out = null, color = SPACE.cyan, alpha = 1, w })
//   The corner HUD: a dark glass panel with cyan bracket corners and a scanline: "● MISSION 01", "TARGET  …",
//   "DIST    …", "STATUS  …" (a blinking ▌ after the status). Text is Space Mono 700, upper-cased. distance is printed
//   verbatim: pass real numbers only, e.g. 'ABOUT 440 LIGHT-YEARS' (omit it if the brief has none). x/y = the
//   panel's top-right corner (align 'left' → top-left). Default spot clears the cardFrame corner and the seed constellation.
//   at/out: pop in / out times (null = always on). Returns { w, h } while visible.
//
// starfield(ctx, t, { speed = 1, travel, dir = 'up', warp = 0, alpha = 1, seed = 11, density = 1, dim = 0,
//                     cx = 540, cy = 960, tint = null })
//   A three-layer parallax pixel starfield drawn over your sky. The ship flies toward `dir` ('up' | 'down' | 'left' |
//   'right' | an angle in radians, 0 = right, −π/2 = up), so stars stream the other way. speed: px/s ÷ 240 (constant);
//   travel: a distance in px you integrate yourself (overrides t·speed — use it when the speed changes, e.g. a tw()).
//   warp 0…1: warp-speed streaks radiating from (cx, cy) plus a centre glow; the plain stars thin out as it rises.
//   dim 0…1: darkens the frame first (deep space). tint: a hex colour for the near layer.
//
// drawPlanet(ctx, x, y, r, t, { kind = 'rocky', rings, bands, tilt = 0, spin = 1, color, face = null, look = [0, 0],
//                               glow = 0.6, light = [-0.6, -0.5], alpha = 1, pop = 1, seed = 3 })
//   A shaded pixel planet of radius r (cell ≈ r / 14). kind: 'earth' 'moon' 'mars' 'rocky' 'jupiter' 'saturn' 'uranus'
//   'neptune' 'ice' 'hot' (lava world) 'ocean' (a blue-green "just right" world) 'gas' (bands in `color`).
//   rings: true (the kind's own) | { inner = 1.35, outer = 2.1, flat = 0.3, color } (radii × r) — the back half is drawn
//   behind the ball, the front half over it. bands: a number of bands or an array of colours. tilt: radians (bands,
//   rings and spin axis; Uranus ≈ 98° → 1.71). spin: how fast surface features drift. face: null | 'neutral' | 'happy' |
//   'wide' | 'sleepy' | 'squint' → two pixel eyes (planets that talk), look = pupils. Returns { x, y, r }.
//
// drawStarBall(ctx, x, y, r, t, { color = '#ffd36a', squish = 0, corona = 1, face = null, look, alpha = 1, pop = 1, seed })
//   A real star seen up close (Antares, Regulus, Castor's six, Pollux): a glowing pixel disc with limb darkening, a
//   granulation shimmer and corona rays. squish 0…0.4 flattens it at the poles (Regulus spins so fast it bulges);
//   face: same as drawPlanet. Returns { x, y, r }.
//
// drawCluster(ctx, cx, cy, R, t, { n = 70, bright = 7, color = '#cfe6ff', haze = 0, hazeColor = '#5f8cff', seed = 45,
//                                 alpha = 1, reveal = 1 })
//   An open star cluster (the Pleiades, the Beehive): `bright` big twinkling members + n faint ones inside radius R,
//   an optional blue reflection-nebula haze (0…1, the Pleiades' dust). reveal 0…1 brings the faint ones in (bright first).
//   Returns { stars: [[x, y, px, bright]] } (deterministic; use it to tick off / count stars).
//
// drawCountdown(ctx, t, { at, step = 0.9, x = 540, y = 900, size = 260, color = SPACE.amber,
//                         labels = ['3', '2', '1', 'LIFTOFF!'] })
//   The "3… 2… 1…" countdown: each label slams in (Space Mono 700) on a pixel ring that empties, one per `step`;
//   the last label holds 1.1 s. countdownTimes(at, { step, n = 4 }) → [t…] (each label's start) + .end.
//   countdownCues(at, { step, key }) → a beep per number (higher on the last), a hit on LIFTOFF.
// launchCues(at, { len = 2.6 }) → the engine roar: a boom, a long noise swell and a riser, a crash.
// warpCues(at, { len = 1.2 }) → the warp whoosh (riser in, boom + whoosh out).
// cheerCues(at, { len = 2 }) → Mission Control cheering: claps, a crash, a swell of noise.
//
// SPACE = { cyan, amber, green, red, navy, ink, bone } (the kit's colours) · SPACE_FONTS (load them in build()).
// Nothing touches `document` at module top level: the sound build imports this through scenes/index.js in node.
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, rng, hexToRgb } from '../src/lib.js'
import { easeOutBack } from './wheel.js'
import { drawStarChar, signStar, STAR } from './startalk.js'
import { drawGhostSheet } from './stlore.js'

export const SPACE = { cyan: '#7fe0ff', amber: '#ffc35c', green: '#7dff9a', red: '#ff5d6a', navy: '#0c1236', ink: '#1b1236', bone: '#efe6d6' }
export const SPACE_FONTS = ["700 24px 'Space Mono'", "700 60px 'Space Mono'", "700 260px 'Space Mono'", "800 96px Inter", "italic 500 140px 'EB Garamond'"]
const INK = SPACE.ink, BONE = SPACE.bone, CYAN = SPACE.cyan
const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const r3 = v => +v.toFixed(3)

// ─────────────────────────────────────────────── colour helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
function glowAt(ctx, x, y, r, color, a) {
  if (a <= 0 || r <= 0) return
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(x, y, 0, x, y, r)
  g.addColorStop(0, rgba(color, 0.5 * a)); g.addColorStop(0.4, rgba(color, 0.2 * a)); g.addColorStop(1, rgba(color, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
  ctx.restore()
}
const hash = (i, j, s = 0) => { const v = Math.sin(i * 127.1 + j * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v) }
function vnoise(x, y, s = 0) {
  const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy)
  return lerp(lerp(hash(i, j, s), hash(i + 1, j, s), u), lerp(hash(i, j + 1, s), hash(i + 1, j + 1, s), u), v)
}
const pop01 = (t, t0, d = 0.3, s = 1.8) => easeOutBack(prog(t, t0, t0 + d), s)

/** draw a bitmap of cells ('.' = empty) with a 1-cell ink outline, centred on (0, 0) of the current transform */
function bits(x, bm, cols, cell, outline = INK) {
  const w = bm[0].length, h = bm.length, ox = -w * cell / 2, oy = -h * cell / 2
  const on = (i, j) => j >= 0 && j < h && i >= 0 && i < w && bm[j][i] !== '.'
  if (outline) {
    x.fillStyle = outline
    for (let j = -1; j <= h; j++) for (let i = -1; i <= w; i++) if (!on(i, j) && (on(i + 1, j) || on(i - 1, j) || on(i, j + 1) || on(i, j - 1))) x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const ch = bm[j][i]; if (ch === '.') continue
    x.fillStyle = cols[ch]; x.fillRect(ox + i * cell, oy + j * cell, cell + 0.5, cell + 0.5)
  }
}

// ═══════════════════════════════════════════════ the rocket
const ROCKET = [
  '......n......',
  '.....nnn.....',
  '.....nNn.....',
  '....nnNnn....',
  '....nnnnn....',
  '...sssssss...',
  '...hbbbbbd...',
  '...hbrrrbd...',
  '...hrwWwrd...',
  '...hrWwwrd...',
  '...hrwwwrd...',
  '...hbrrrbd...',
  '...hbbbbbd...',
  '...sssssss...',
  '...hbbbbbd...',
  '...hbbbbbd...',
  '..fhbbbbbdf..',
  '.ffhbbbbbdff.',
  '.ffsssssssff.',
  'fffhbbbbbdfff',
  'fff.eeeee.fff',
  'ff..eEEEe..ff',
  '....eeeee....',
  '...eeeeeee...',
]
const R_W = 13, R_H = ROCKET.length          // 24 rows
const WIN = { i: 6, j: 9.5 }                 // porthole centre (cells)
function rotPt(x, y, dx, dy, rot) { const c = Math.cos(rot), s = Math.sin(rot); return [x + dx * c - dy * s, y + dx * s + dy * c] }

export function drawRocket(ctx, x, y, size, t, opts = {}) {
  const { color = '#ff6b5a', flame = 1, shake = 0, rot = 0, pilot = null, stowaway = 0, smoke = 0, alpha = 1, pop = 1, seed = 1, trail = 0 } = opts
  const s = size * pop
  const cell = s >= 120 ? Math.max(1, Math.round(s / R_H)) : s / R_H
  const S = cell * R_H
  const out = { x, y, size: S, cell, top: rotPt(x, y, 0, -S / 2, rot), nozzle: rotPt(x, y, 0, S / 2, rot), window: rotPt(x, y, (WIN.i + 0.5 - R_W / 2) * cell, (WIN.j - R_H / 2) * cell, rot) }
  if (alpha <= 0 || pop <= 0.01) return out
  const jx = shake ? shake * (Math.sin(t * 71 + seed) * 0.6 + Math.sin(t * 113 + seed * 3) * 0.4) : 0
  const jy = shake ? shake * 0.6 * Math.sin(t * 89 + seed * 2) : 0
  const cols = {
    n: color, N: mixHex(color, '#ffffff', 0.4), s: color, f: mixHex(color, INK, 0.32),
    b: BONE, h: '#fffaf0', d: '#c9bfae', r: '#8a8fa8', w: mixHex(CYAN, '#1b3a6a', 0.35), W: '#e8fbff', e: '#5a5878', E: '#3a3858',
  }
  ctx.save(); ctx.globalAlpha *= alpha
  // trail: fading pixel puffs behind the nozzle (in world space, along −heading)
  if (trail > 0) {
    for (let k = 0; k < 14; k++) {
      const d = S * 0.55 + k * cell * 2.6, ph = (t * 3 + k * 0.37 + seed) % 1
      const [px, py] = rotPt(x + jx, y + jy, Math.sin(k * 1.7 + t * 4) * cell * 0.8, d, rot)
      const a = trail * (1 - k / 14) * 0.6, sz = Math.round(cell * (1.6 + k * 0.25 + ph * 0.5))
      ctx.globalAlpha = alpha * a; ctx.fillStyle = k < 3 ? '#ffd27a' : k < 7 ? '#c9bfe6' : '#7d74a8'
      ctx.fillRect(Math.round(px - sz / 2), Math.round(py - sz / 2), sz, sz)
    }
    ctx.globalAlpha = alpha
  }
  ctx.translate(Math.round(x + jx), Math.round(y + jy)); ctx.rotate(rot)
  // the stowaway: the ghost peeks from behind the hull's right side
  if (stowaway > 0.01) {
    const gc = Math.max(1.2, cell * 0.17)
    const gx = lerp(0, 3.5 * cell + 9 * gc, ease.outCubic(clamp(stowaway))), gy = cell * 1.5
    drawGhostSheet(ctx, t, gx, gy, gc, { look: [-1, 0], rot: 0.25 * clamp(stowaway), wide: stowaway > 0.8 })
  }
  // flame
  if (flame > 0.01) {
    const fy0 = S / 2 - cell * 0.5, L = flame * (6 + 1.5 * Math.sin(t * 31 + seed) + Math.sin(t * 17) * 0.8)
    glowAt(ctx, 0, fy0 + L * cell * 0.4, cell * (4 + L * 1.1), '#ff9a3a', 0.9 * clamp(flame))
    for (let k = 0; k < Math.ceil(L); k++) {
      const f = k / L, w = Math.max(1, Math.round(5 * Math.pow(1 - f, 0.65) + (hash(k, Math.floor(t * 24), seed) - 0.5) * 1.4))
      const col = f < 0.25 ? '#fff6d0' : f < 0.5 ? '#ffd24a' : f < 0.78 ? '#ff8a2a' : '#ff4a3a'
      ctx.fillStyle = INK; ctx.fillRect(-(w / 2 + 0.5) * cell, fy0 + k * cell, (w + 1) * cell, cell + 0.5)
      ctx.fillStyle = col; ctx.fillRect(-(w / 2) * cell, fy0 + k * cell, w * cell, cell + 0.5)
      if (w >= 3 && f < 0.6) { ctx.fillStyle = '#ffffff'; ctx.fillRect(-0.5 * cell, fy0 + k * cell, cell, cell + 0.5) }
    }
  }
  const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false
  bits(ctx, ROCKET, cols, cell)
  ctx.imageSmoothingEnabled = sm
  // the pilot in the porthole: a star-coloured face with two blinking eyes
  if (pilot) {
    const wx = (WIN.i + 0.5 - R_W / 2) * cell, wy = (WIN.j - R_H / 2 + 0.5) * cell
    ctx.fillStyle = pilot; ctx.fillRect(wx - 1.5 * cell, wy - 1.5 * cell, 3 * cell, 3 * cell)
    const shut = (t + seed * 0.7) % 3.3 < 0.13
    ctx.fillStyle = INK
    for (const sx of [-1, 1]) ctx.fillRect(wx + sx * 0.75 * cell - cell * 0.3, wy - cell * (shut ? 0.1 : 0.55), cell * 0.6, cell * (shut ? 0.25 : 0.9))
    ctx.fillStyle = 'rgba(232,251,255,0.7)'; ctx.fillRect(wx - 1.5 * cell, wy - 1.5 * cell, cell, cell * 0.5)
  }
  ctx.restore()
  // launch smoke (screen space, around the base; not rotated)
  if (smoke > 0.01) {
    ctx.save(); ctx.globalAlpha *= alpha
    const [bx, by] = out.nozzle
    for (let k = 0; k < 16; k++) {
      const side = k % 2 ? 1 : -1, ph = (t * 0.5 + hash(k, 1, seed)) % 1
      const px = bx + side * (S * 0.15 + ph * S * 0.9 * (0.5 + hash(k, 2, seed))), py = by + S * 0.1 - ph * S * 0.12 + hash(k, 3, seed) * cell * 3
      const r = cell * (1.2 + ph * 2.6) * smoke
      ctx.globalAlpha = alpha * smoke * (1 - ph * 0.7)
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(Math.round(px), Math.round(py), r + cell * 0.6, 0, TAU); ctx.fill()
      ctx.fillStyle = k % 3 ? '#d9d2ea' : '#f4f0fa'; ctx.beginPath(); ctx.arc(Math.round(px), Math.round(py), r, 0, TAU); ctx.fill()
    }
    ctx.restore()
  }
  return out
}

// ═══════════════════════════════════════════════ the space suit
// drawStarChar's sprite geometry (mirrored so the helmet follows hops): 36-cell sprite, star centre at row 19.6
const G = 36, HALF = 18, SC_Y = 19.6
function hopState(t, hops) {
  if (!hops || !hops.length) return { lift: 0, sq: 0 }
  let h = -1e9
  for (const v of hops) if (v <= t && v > h) h = v
  const dt = t - h
  if (dt > 0.6) return { lift: 0, sq: 0 }
  const AIR = 0.26
  if (dt < 0.05) return { lift: 0, sq: 0.12 * Math.sin(Math.PI * dt / 0.05) }
  if (dt < 0.05 + AIR) { const p = (dt - 0.05) / AIR; return { lift: Math.sin(Math.PI * p), sq: -0.1 * Math.sin(Math.PI * Math.min(1, p * 1.6)) } }
  const d = dt - 0.05 - AIR
  return { lift: 0, sq: 0.16 * Math.exp(-d * 11) * Math.cos(d * 26) }
}
function pixelRing(ctx, cx, cy, R, c, col, a = 1, w = 1) {
  const n = Math.ceil((R + c * 2) / c)
  ctx.globalAlpha *= a
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i * c, j * c)
    if (Math.abs(d - R) <= c * 0.5 * w) { ctx.fillStyle = typeof col === 'function' ? col(i, j) : col; ctx.fillRect(Math.round(cx + i * c - c / 2), Math.round(cy + j * c - c / 2), Math.ceil(c), Math.ceil(c)) }
  }
  ctx.globalAlpha /= a
}

export function drawSpaceSuit(ctx, x, y, size, t, opts = {}) {
  const { sign = null, helmet = true, tank = helmet, glare = 1, antenna = true, star = drawStarChar, ...rest } = opts
  const S0 = sign ? signStar(sign) : { color: STAR.sky, glyph: null }
  const color = rest.color ?? S0.color, glyph = rest.glyph !== undefined ? rest.glyph : S0.glyph
  const alpha = rest.alpha ?? 1, pop = rest.pop ?? 1, seed = rest.seed ?? 1
  if (alpha <= 0 || pop <= 0.01) return { x, y, size, top: y, helmet: { x, y, r: 0 } }
  const sz = size * pop
  const cell = sz >= 100 ? Math.max(1, Math.round(sz / G)) : sz / G
  const bobA = rest.bob === undefined ? size * 0.035 : rest.bob
  const hs = hopState(t, rest.hops)
  const cy = y + Math.sin(t * 2.2 + seed * 2.1) * bobA - hs.lift * size * 0.09
  const hx = x, hy = cy + (SC_Y - HALF) * cell, R = cell * 22
  ctx.save(); ctx.globalAlpha *= alpha
  // air tanks behind
  if (tank) {
    for (const s of [-1, 1]) {
      const tw = Math.round(cell * 5), th = Math.round(cell * 13), tx = hx + s * (R * 0.86 + tw * 0.5), ty = hy + R * 0.3
      ctx.fillStyle = INK; ctx.fillRect(Math.round(tx - tw / 2 - cell), Math.round(ty - th / 2 - cell), tw + 2 * cell, th + 2 * cell)
      ctx.fillStyle = '#b9bfd6'; ctx.fillRect(Math.round(tx - tw / 2), Math.round(ty - th / 2), tw, th)
      ctx.fillStyle = '#e6e9f5'; ctx.fillRect(Math.round(tx - tw / 2), Math.round(ty - th / 2), Math.round(cell * 1.5), th)
      ctx.fillStyle = color; ctx.fillRect(Math.round(tx - tw / 2), Math.round(ty - th / 2 + cell * 3), tw, Math.round(cell * 2))
    }
  }
  // the helmet's glass (behind the star): a faint tint
  if (helmet) {
    const g = ctx.createRadialGradient(hx - R * 0.3, hy - R * 0.35, R * 0.1, hx, hy, R)
    g.addColorStop(0, 'rgba(200,240,255,0.10)'); g.addColorStop(0.8, 'rgba(127,224,255,0.10)'); g.addColorStop(1, 'rgba(127,224,255,0.22)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(hx, hy, R, 0, TAU); ctx.fill()
  }
  ctx.restore()
  const r = star(ctx, x, y, size, t, { ...rest, color, glyph })
  ctx.save(); ctx.globalAlpha *= alpha
  // collar ring at the base
  if (helmet || tank) {
    const w = R * 1.25, h = cell * 4.2, cy2 = hy + R * 0.9
    ctx.fillStyle = INK; ctx.fillRect(Math.round(hx - w / 2 - cell), Math.round(cy2 - h / 2 - cell), Math.round(w + 2 * cell), Math.round(h + 2 * cell))
    ctx.fillStyle = '#9aa1bf'; ctx.fillRect(Math.round(hx - w / 2), Math.round(cy2 - h / 2), Math.round(w), Math.round(h))
    ctx.fillStyle = '#d6dbef'; ctx.fillRect(Math.round(hx - w / 2), Math.round(cy2 - h / 2), Math.round(w), Math.round(cell * 1.2))
    for (let k = -2; k <= 2; k++) { ctx.fillStyle = k === 0 ? color : '#6c7394'; ctx.fillRect(Math.round(hx + k * w / 5.5 - cell), Math.round(cy2 - cell * 0.2), Math.round(cell * 2), Math.round(cell * 1.6)) }
  }
  if (helmet) {
    // rim: a stepped pixel ring with an ink line outside it
    pixelRing(ctx, hx, hy, R + cell, cell, INK, 0.9)
    pixelRing(ctx, hx, hy, R, cell, (i, j) => (i + j < -6 ? '#f4fdff' : '#bfefff'), 0.75)
    // visor glare: a curved streak top-left + a dot
    if (glare > 0) {
      ctx.globalAlpha = alpha * 0.85 * glare
      ctx.fillStyle = '#ffffff'
      for (let a = 3.55; a < 4.35; a += 0.07) {
        const px = hx + Math.cos(a) * R * 0.78, py = hy + Math.sin(a) * R * 0.78
        ctx.fillRect(Math.round(px - cell), Math.round(py - cell), Math.ceil(cell * 2), Math.ceil(cell * 2))
      }
      const px = hx + Math.cos(4.6) * R * 0.78, py = hy + Math.sin(4.6) * R * 0.78
      ctx.fillRect(Math.round(px - cell), Math.round(py - cell), Math.ceil(cell * 2), Math.ceil(cell * 2))
      ctx.globalAlpha = alpha
    }
    if (antenna) {
      const ax = hx + R * 0.62, ay = hy - R * 0.78
      ctx.fillStyle = INK; ctx.fillRect(Math.round(ax - cell), Math.round(ay - cell * 7), Math.ceil(cell * 2), Math.ceil(cell * 7))
      ctx.fillStyle = '#c9cfe6'; ctx.fillRect(Math.round(ax - cell / 2), Math.round(ay - cell * 6.5), Math.ceil(cell), Math.ceil(cell * 6.5))
      const on = (t * 1.6 + seed * 0.3) % 1 < 0.5
      ctx.fillStyle = INK; ctx.fillRect(Math.round(ax - cell * 1.5), Math.round(ay - cell * 9.5), Math.ceil(cell * 3), Math.ceil(cell * 3))
      ctx.fillStyle = on ? SPACE.red : '#7a2a3a'; ctx.fillRect(Math.round(ax - cell), Math.round(ay - cell * 9), Math.ceil(cell * 2), Math.ceil(cell * 2))
      if (on) glowAt(ctx, ax, ay - cell * 8, cell * 6, SPACE.red, 0.6)
    }
  }
  ctx.restore()
  return { ...r, helmet: { x: hx, y: hy, r: R } }
}

// ═══════════════════════════════════════════════ Mission Control
const CREW = ['#efe6d6', '#f7cf68', '#c9b8f0', '#9fd8ff', '#ffb3c7', '#b8f0c9']
const MON = ['#7fe0ff', '#7dff9a', '#ffc35c']
function earthIcon(ctx, x, y, r) { drawPlanet(ctx, x, y, r, 0, { kind: 'earth', glow: 0.3 }) }
function rocketIcon(ctx, x, y, s, rot, color = '#ff6b5a') {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot)
  const c = s / 6
  ctx.fillStyle = INK; ctx.fillRect(-2 * c, -3.5 * c, 4 * c, 7 * c)
  ctx.fillStyle = BONE; ctx.fillRect(-1 * c, -2.5 * c, 2 * c, 5 * c)
  ctx.fillStyle = color; ctx.fillRect(-1 * c, -3 * c, 2 * c, 1.2 * c); ctx.fillRect(-2 * c, 1.5 * c, 1 * c, 1.5 * c); ctx.fillRect(1 * c, 1.5 * c, 1 * c, 1.5 * c)
  ctx.fillStyle = '#ffd24a'; ctx.fillRect(-0.6 * c, 2.5 * c, 1.2 * c, 1.5 * c)
  ctx.restore()
}
export function drawMissionControl(ctx, t, opts = {}) {
  const { mission = 'MISSION 01', screens = {}, cheer = 0, cheerAt = null, crew = true, label = 'HOUSTON · MISSION CONTROL', alpha = 1, screenY = 330 } = opts
  const SX = 90, SY = screenY, SW = 900, SH = 520
  const desks = [screenY + 760, screenY + 980, screenY + 1240]
  const res = { screen: { x: SX, y: SY, w: SW, h: SH }, desks, spots: { director: [540, screenY + 640], front: [540, desks[2] - 30], left: [250, desks[1] - 30], right: [830, desks[1] - 30] } }
  if (alpha <= 0) return res
  const R = Math.round
  const rect = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(R(x), R(y), R(w), R(h)) }
  const box = (x, y, w, h, c, hi) => { rect(x - 6, y - 6, w + 12, h + 12, INK); rect(x, y, w, h, c); if (hi) rect(x, y, w, 6, hi) }
  ctx.save(); ctx.globalAlpha *= alpha
  // the room
  const g = ctx.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, '#0a0f2c'); g.addColorStop(0.5, '#121a46'); g.addColorStop(1, '#0a0d24')
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  ctx.globalAlpha = alpha * 0.35
  for (let i = 0; i < 9; i++) rect(i * 135, 0, 3, SY + SH + 120, '#26306a')
  for (let j = 0; j < 7; j++) rect(0, 60 + j * 120, 1080, 3, '#1e2760')
  ctx.globalAlpha = alpha
  // title over the screen
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.font = `700 22px ${MONO}`; ctx.fillStyle = 'rgba(239,230,214,0.7)'; ctx.fillText(label, 540, SY - 104)
  ctx.font = `700 54px ${MONO}`; ctx.fillStyle = SPACE.amber; ctx.fillText(mission, 540, SY - 56)
  // the big screen
  box(SX - 14, SY - 14, SW + 28, SH + 28, '#2a3166', '#3c4688')
  rect(SX, SY, SW, SH, '#04071a')
  ctx.save(); ctx.beginPath(); ctx.rect(SX, SY, SW, SH); ctx.clip()
  const big = screens.big ?? 'track'
  const scr = { x: SX, y: SY, w: SW, h: SH }
  if (typeof big === 'function') big(ctx, scr, t)
  else {
    // a faint star backdrop on every screen mode
    for (let k = 0; k < 70; k++) { const px = SX + hash(k, 1, 9) * SW, py = SY + hash(k, 2, 9) * SH, tw = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + k)); ctx.globalAlpha = alpha * tw * 0.7; rect(px, py, k % 5 ? 3 : 5, k % 5 ? 3 : 5, '#cfe6ff') }
    ctx.globalAlpha = alpha
    if (big === 'track') {
      const p = clamp(screens.progress ?? 0.5)
      const ax = SX + 120, ay = SY + SH - 130, bx = SX + SW - 130, by = SY + 140
      const pt = u => [lerp(ax, bx, u), lerp(ay, by, u) - Math.sin(Math.PI * u) * 120]
      for (let u = 0; u <= 1.0001; u += 0.025) { const [px, py] = pt(u); rect(px - 3, py - 3, 6, 6, u <= p ? SPACE.amber : 'rgba(127,224,255,0.45)') }
      earthIcon(ctx, ax, ay, 42)
      // the target: a pulsing ring + label
      const pulse = 0.5 + 0.5 * Math.sin(t * 5)
      ctx.strokeStyle = SPACE.red; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(bx, by, 26 + pulse * 10, 0, TAU); ctx.stroke()
      rect(bx - 7, by - 7, 14, 14, '#fff3d0')
      ctx.font = `700 26px ${MONO}`; ctx.fillStyle = BONE
      ctx.textAlign = 'center'; ctx.fillText(String(screens.from ?? 'EARTH'), ax, ay + 74)
      if (screens.target) ctx.fillText(String(screens.target).toUpperCase(), Math.min(bx, SX + SW - 20 - ctx.measureText(String(screens.target)).width / 2), by + 66)
      const [rx, ry] = pt(p), [qx, qy] = pt(Math.min(1, p + 0.01))
      rocketIcon(ctx, rx, ry, 36, Math.atan2(qy - ry, qx - rx) + Math.PI / 2)
    } else if (big === 'countdown') {
      ctx.font = `700 300px ${MONO}`; ctx.fillStyle = SPACE.amber; ctx.textAlign = 'center'
      ctx.fillText(String(screens.count ?? '3'), 540, SY + SH / 2 + 16)
    } else if (big === 'live') {
      if (screens.target) { ctx.font = `700 28px ${MONO}`; ctx.fillStyle = BONE; ctx.textAlign = 'left'; ctx.fillText(String(screens.target).toUpperCase(), SX + 30, SY + SH - 40) }
      drawPlanet(ctx, SX + SW * 0.62, SY + SH * 0.46, 120, t, { kind: screens.kind ?? 'neptune', glow: 0.5 })
      const on = t % 1 < 0.6
      ctx.font = `700 28px ${MONO}`; ctx.textAlign = 'left'; ctx.fillStyle = on ? SPACE.red : 'rgba(255,93,106,0.4)'; ctx.fillText('● LIVE', SX + 30, SY + 44)
    }
  }
  if (screens.text) {
    rect(SX, SY + SH - 70, SW, 70, 'rgba(4,7,26,0.85)')
    ctx.font = `700 32px ${MONO}`; ctx.fillStyle = SPACE.green; ctx.textAlign = 'center'; ctx.fillText(String(screens.text), 540, SY + SH - 34)
  }
  // scanlines
  ctx.globalAlpha = alpha * 0.12; for (let j = SY; j < SY + SH; j += 6) rect(SX, j, SW, 2, '#000000'); ctx.globalAlpha = alpha
  ctx.restore()
  // side status lights on the screen bezel
  for (let k = 0; k < 6; k++) { const on = (t * 2 + k * 0.37) % 1 < 0.5; rect(SX + 40 + k * 26, SY + SH + 20, 14, 8, on ? MON[k % 3] : '#2a3166') }
  // tiers: crew behind each desk, then the desk with monitors
  const cols = screens.colors ?? MON
  const cheerHops = []
  if (cheer > 0 && cheerAt != null) for (let h = cheerAt; h < cheerAt + 30; h += 0.45) cheerHops.push(h)
  desks.forEach((dy, row) => {
    const n = row === 2 ? 4 : 5, span = row === 2 ? 860 : 920, x0 = 540 - span / 2, step = span / n
    const csz = row === 2 ? 120 : row === 1 ? 96 : 80
    for (let k = 0; k < n; k++) {
      const cx = x0 + step * (k + 0.5)
      if (crew) {
        const seed = row * 7 + k * 3 + 1, hops = cheer > 0 ? cheerHops.map(h => h + ((k + row) % 3) * 0.15) : null
        const r = drawStarChar(ctx, cx, dy - csz * 0.62, csz, t, { color: CREW[(row * 2 + k) % CREW.length], mood: cheer > 0.3 ? 'happy' : 'neutral', look: cheer > 0.3 ? [0, -1] : [0, -0.5], seed, hops, glow: 0.35, tips: false, bob: 1.2 })
        // headset: a band over the top + an earcup + a mic boom
        const hc = Math.max(2, Math.round(csz / 36))
        ctx.fillStyle = INK; ctx.fillRect(R(cx - csz * 0.36), R(r.y - csz * 0.1), hc * 3, hc * 5)
        ctx.fillStyle = '#3a3f66'; ctx.fillRect(R(cx - csz * 0.36 + hc * 0.5), R(r.y - csz * 0.1 + hc * 0.5), hc * 2, hc * 4)
        ctx.fillStyle = INK; ctx.fillRect(R(cx - csz * 0.33), R(r.y + csz * 0.02), R(csz * 0.2), hc)
        ctx.fillStyle = SPACE.red; ctx.fillRect(R(cx - csz * 0.15), R(r.y + csz * 0.01), hc * 2, hc * 2)
      }
    }
    // the desk
    const dh = row === 2 ? 150 : 110
    box(x0 - 20, dy, span + 40, dh, '#262d5c', '#3a4380')
    for (let k = 0; k < n; k++) {
      const cx = x0 + step * (k + 0.5), mw = step * 0.62, mh = dh * 0.42
      box(cx - mw / 2, dy - mh * 0.55, mw, mh, '#060a20')
      const mc = cols[(row + k) % cols.length]
      for (let l = 0; l < 3; l++) { const len = (0.3 + 0.6 * vnoise(t * 2 + k + l * 3, row, 5)) * (mw - 16); rect(cx - mw / 2 + 8, dy - mh * 0.55 + 8 + l * (mh / 3.4), len, 5, mc) }
      for (let b = 0; b < 4; b++) { const on = hash(k, b + Math.floor(t * 2 + k * 0.3), row) > 0.45; rect(cx - mw / 2 + b * (mw / 4) + 6, dy + dh * 0.55, 12, 10, on ? cols[(b + k) % cols.length] : '#3a4170') }
    }
  })
  // confetti
  if (cheer > 0.01) {
    const CC = ['#ffc35c', '#ff8fb1', '#7fe0ff', '#7dff9a', '#efe6d6', '#c9b8f0']
    const t0 = cheerAt ?? 0, dt = Math.max(0, t - t0)
    for (let k = 0; k < 90; k++) {
      const fall = 280 + hash(k, 4, 2) * 260, y0 = -60 - hash(k, 5, 2) * 900, py = y0 + dt * fall
      if (py > 1960) continue
      const px = hash(k, 6, 2) * 1080 + Math.sin(dt * 3 + k) * 26, w = 10 + (k % 3) * 4, h = Math.abs(Math.sin(dt * 6 + k)) * 12 + 4
      ctx.globalAlpha = alpha * cheer; rect(px, py, w, h, CC[k % CC.length])
    }
    ctx.globalAlpha = alpha
  }
  ctx.restore()
  return res
}

// ═══════════════════════════════════════════════ the HUD
export function missionHUD(ctx, t, opts = {}) {
  const { mission = 'MISSION 01', target = null, distance = null, status = null, x = 1010, y = 118, align = 'right', at = null, out = null, color = CYAN, alpha = 1, w: W0 } = opts
  let k = 1
  if (at != null) k = pop01(t, at, 0.3, 1.8)
  if (out != null) k *= 1 - ease.inCubic(prog(t, out, out + 0.22))
  if (k <= 0.01 || alpha <= 0) return null
  const rows = [['●', String(mission).toUpperCase()]]
  if (target) rows.push(['TARGET', String(target).toUpperCase()])
  if (distance) rows.push(['DIST', String(distance).toUpperCase()])
  if (status) rows.push(['STATUS', String(status).toUpperCase()])
  ctx.save(); ctx.globalAlpha *= alpha
  ctx.font = `700 24px ${MONO}`
  const LW = 122, lh = 38, pad = 20
  const w = W0 ?? clamp(Math.max(...rows.map(([l, v], i) => (i === 0 ? 40 : LW) + ctx.measureText(v + (i === rows.length - 1 && status ? ' ▌' : '')).width)) + pad * 2, 330, 640)
  const h = rows.length * lh + pad * 1.4
  const x0 = align === 'right' ? x - w : x, y0 = y
  ctx.translate(x0 + w / 2, y0 + h / 2); ctx.scale(k, k); ctx.translate(-(x0 + w / 2), -(y0 + h / 2))
  ctx.fillStyle = 'rgba(6,10,32,0.82)'; ctx.fillRect(x0, y0, w, h)
  ctx.globalAlpha *= 0.14; ctx.fillStyle = color; for (let j = 0; j < h; j += 5) ctx.fillRect(x0, y0 + j, w, 1.5)
  const sweep = ((t * 0.5) % 1) * h; ctx.globalAlpha *= 2.2; ctx.fillRect(x0, y0 + sweep, w, 3)
  ctx.globalAlpha = alpha
  // bracket corners
  ctx.fillStyle = color
  const B = 22, Th = 4
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x0 + w, y0, -1, 1], [x0, y0 + h, 1, -1], [x0 + w, y0 + h, -1, -1]]) {
    ctx.fillRect(sx > 0 ? cx : cx - B, sy > 0 ? cy : cy - Th, B, Th); ctx.fillRect(sx > 0 ? cx : cx - Th, sy > 0 ? cy : cy - B, Th, B)
  }
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'
  rows.forEach(([l, v], i) => {
    const ty = y0 + pad * 0.7 + lh * (i + 0.5)
    if (i === 0) {
      ctx.fillStyle = (t * 1.4) % 1 < 0.6 ? SPACE.red : 'rgba(255,93,106,0.35)'; ctx.fillText('●', x0 + pad, ty)
      ctx.fillStyle = SPACE.amber; ctx.fillText(v, x0 + pad + 32, ty)
    } else {
      ctx.fillStyle = rgba(color, 0.7); ctx.fillText(l, x0 + pad, ty)
      ctx.fillStyle = BONE; ctx.fillText(v + (i === rows.length - 1 && status && (t * 2) % 1 < 0.55 ? ' ▌' : ''), x0 + pad + LW, ty)
    }
  })
  ctx.restore()
  return { w, h }
}

// ═══════════════════════════════════════════════ the starfield
const LAYERS = [{ n: 120, px: 2, par: 0.22, a: 0.55 }, { n: 70, px: 3, par: 0.6, a: 0.8 }, { n: 34, px: 5, par: 1.25, a: 1 }]
export function starfield(ctx, t, opts = {}) {
  const { speed = 1, travel, dir = 'up', warp = 0, alpha = 1, seed = 11, density = 1, dim = 0, cx = 540, cy = 960, tint = null } = opts
  const W = 1080, H = 1920
  ctx.save(); ctx.globalAlpha *= alpha
  if (dim > 0) { ctx.fillStyle = `rgba(2,2,10,${clamp(dim) * 0.85})`; ctx.fillRect(0, 0, W, H) }
  const ang = typeof dir === 'number' ? dir : { up: -Math.PI / 2, down: Math.PI / 2, left: Math.PI, right: 0 }[dir] ?? -Math.PI / 2
  const vx = -Math.cos(ang), vy = -Math.sin(ang)               // stars stream opposite to the heading
  const D = travel ?? t * speed * 240
  const fade = 1 - 0.75 * clamp(warp)
  LAYERS.forEach((L, li) => {
    const n = Math.round(L.n * density)
    for (let k = 0; k < n; k++) {
      const bx = hash(k, li, seed) * W, by = hash(k, li + 7, seed) * H
      const px = ((bx + vx * D * L.par) % W + W) % W, py = ((by + vy * D * L.par) % H + H) % H
      const tw = 0.6 + 0.4 * Math.sin(t * (1.5 + hash(k, 3, seed) * 2) + k)
      ctx.globalAlpha = alpha * L.a * tw * fade
      ctx.fillStyle = li === 2 && tint ? tint : k % 7 === 0 ? '#ffe9c4' : k % 5 === 0 ? '#bfe0ff' : '#ffffff'
      ctx.fillRect(Math.round(px), Math.round(py), L.px, L.px)
      // motion smear on the near layer at speed
      if (li === 2 && Math.abs(speed) > 2 && travel == null) { ctx.globalAlpha *= 0.4; ctx.fillRect(Math.round(px - vx * L.px * speed), Math.round(py - vy * L.px * speed), L.px, L.px) }
    }
  })
  if (warp > 0.01) {
    const wk = clamp(warp), maxR = 1250
    ctx.lineCap = 'butt'
    for (let k = 0; k < 140; k++) {
      const a = hash(k, 11, seed) * TAU, ph = (hash(k, 12, seed) + t * (0.8 + hash(k, 13, seed) * 0.9)) % 1
      const r1 = ph * ph * maxR, r0 = Math.max(0, r1 - (40 + 520 * wk) * ph)
      ctx.globalAlpha = alpha * wk * (0.35 + 0.65 * ph)
      ctx.strokeStyle = k % 4 === 0 ? '#bfe0ff' : k % 9 === 0 ? '#ffd6f0' : '#ffffff'
      ctx.lineWidth = 2 + ph * 4
      ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); ctx.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.stroke()
    }
    ctx.globalAlpha = alpha
    glowAt(ctx, cx, cy, 260 + 200 * wk, '#bfe0ff', wk * 0.8)
  }
  ctx.restore()
}

// ═══════════════════════════════════════════════ planets
const KINDS = {
  earth: { base: '#2f6fd6', alt: '#4cae5a', feat: 'land', cloud: true },
  moon: { base: '#b8b4c4', alt: '#8e8a9e', feat: 'craters' },
  mars: { base: '#c8553a', alt: '#9a3b28', feat: 'patches', cap: true },
  rocky: { base: '#9a8a7a', alt: '#6e6258', feat: 'craters' },
  jupiter: { bands: ['#f1e2c4', '#d9a46a', '#efd5a8', '#b9784a', '#f3e6cc', '#d29a62'], spot: '#c4553a' },
  saturn: { bands: ['#f3dca0', '#e2c07a', '#ecd08e', '#d0a560', '#f0d79a'], rings: { inner: 1.35, outer: 2.15, flat: 0.28, color: ['#f7e3b0', '#d9bf86', '#efd8a0', '#b9a070'] } },
  uranus: { bands: ['#a7eef0', '#9fe3e8', '#b5f2f2', '#96dbe2'], rings: { inner: 1.5, outer: 1.75, flat: 0.25, color: ['#9fc8d0', '#6f95a0'] } },
  neptune: { bands: ['#3557d6', '#2f4cc4', '#3d62e6', '#2a44b2'], spot: '#1b2a7a', streaks: true },
  ice: { base: '#dff2ff', alt: '#a9d2f0', feat: 'patches' },
  hot: { base: '#ff6a2a', alt: '#8a1f1a', feat: 'lava' },
  ocean: { base: '#2f7fd6', alt: '#3fbf8a', feat: 'land', cloud: true },
  gas: { bands: null },
}
export function drawPlanet(ctx, x, y, r, t, opts = {}) {
  const { kind = 'rocky', rings, bands, tilt = 0, spin = 1, color = null, face = null, look = [0, 0], glow = 0.6, light = [-0.6, -0.5], alpha = 1, pop = 1, seed = 3 } = opts
  const K = KINDS[kind] || KINDS.rocky
  const rr = r * pop
  if (alpha <= 0 || rr < 2) return { x, y, r: rr }
  const c = Math.max(2, Math.round(rr / 14)), n = Math.ceil(rr / c) + 1
  const ct = Math.cos(tilt), st = Math.sin(tilt)
  let bandCols = Array.isArray(bands) ? bands : K.bands
  if (kind === 'gas' || (!bandCols && typeof bands === 'number')) { const b0 = color ?? '#c9a0ff'; bandCols = [b0, mixHex(b0, '#ffffff', 0.25), mixHex(b0, INK, 0.2), mixHex(b0, '#ffffff', 0.1)] }
  const nb = typeof bands === 'number' ? bands : bandCols ? bandCols.length * 2 : 0
  const RG = rings === true ? (K.rings || { inner: 1.35, outer: 2.1, flat: 0.3, color: ['#e6dcc8', '#b8ab92'] }) : rings ? { inner: 1.35, outer: 2.1, flat: 0.3, ...rings } : null
  const ringCols = RG ? (Array.isArray(RG.color) ? RG.color : [RG.color ?? '#e6dcc8', mixHex(RG.color ?? '#e6dcc8', INK, 0.25)]) : null
  const [Lx, Ly] = light, Ll = Math.hypot(Lx, Ly, 0.7), lx = Lx / Ll, ly = Ly / Ll, lz = 0.7 / Ll
  ctx.save(); ctx.globalAlpha *= alpha
  const X0 = Math.round(x), Y0 = Math.round(y)
  const base = color ?? K.base ?? (bandCols ? bandCols[0] : '#9a8a7a')
  glowAt(ctx, x, y, rr * 1.6, base, glow)
  // rings: pixel ellipse band, back or front half
  const drawRing = front => {
    if (!RG) return
    const ro = RG.outer * rr, ri = RG.inner * rr, m = Math.ceil(ro / c) + 1
    for (let j = -m; j <= m; j++) for (let i = -m; i <= m; i++) {
      const dx = i * c, dy = j * c
      const u = dx * ct + dy * st, v = -dx * st + dy * ct           // into the ring's frame
      const e = Math.hypot(u, v / RG.flat)
      if (e < ri || e > ro) continue
      if ((v < 0) === front) continue                                 // v < 0: the far side (behind)
      if (!front && Math.hypot(dx, dy) < rr) continue
      const band = Math.floor((e - ri) / (ro - ri) * ringCols.length * 1.5) % ringCols.length
      const shade = v < 0 ? 0.25 : 0
      ctx.fillStyle = shade ? mixHex(ringCols[band], INK, shade) : ringCols[band]
      ctx.fillRect(X0 + dx - c / 2, Y0 + dy - c / 2, c + 0.5, c + 0.5)
    }
  }
  drawRing(false)
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const dx = i * c, dy = j * c, d = Math.hypot(dx, dy)
    if (d > rr + c * 0.5) continue
    if (d > rr - c * 0.5) { ctx.fillStyle = INK; ctx.fillRect(X0 + dx - c / 2, Y0 + dy - c / 2, c + 0.5, c + 0.5); continue }
    const nx = dx / rr, ny = dy / rr, nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))
    const u = nx * ct + ny * st, v = -nx * st + ny * ct              // planet frame (v = latitude-ish)
    const lon = Math.atan2(u, nz) + t * 0.25 * spin + seed
    let col = base
    if (bandCols) {
      const bi = Math.floor((v * 0.5 + 0.5) * nb + 0.35 * Math.sin(lon * 2 + v * 6))
      col = bandCols[((bi % bandCols.length) + bandCols.length) % bandCols.length]
      if (K.spot && Math.hypot((lon % TAU + TAU) % TAU - 3.6, (v - 0.32) * 4.5) < 0.42) col = K.spot
      if (K.streaks && vnoise(lon * 3, v * 12, seed) > 0.78) col = '#cfe0ff'
    } else if (K.feat) {
      const nz2 = vnoise(lon * 2.2 + 10, v * 3.2, seed) * 0.65 + vnoise(lon * 5, v * 7, seed + 1) * 0.35
      if (K.feat === 'land' && nz2 > 0.56) col = K.alt
      if (K.feat === 'patches' && nz2 > 0.6) col = K.alt
      if (K.feat === 'craters' && nz2 > 0.62) col = K.alt
      if (K.feat === 'lava') col = nz2 > 0.55 ? '#ffd24a' : nz2 > 0.4 ? K.base : K.alt
      if (K.cap && Math.abs(v) > 0.82) col = '#f4f0fa'
      if (K.cloud && vnoise(lon * 3 + t * 0.1, v * 5, seed + 4) > 0.72) col = '#f4f8ff'
    }
    const lam = clamp(nx * lx + ny * ly + nz * lz, -1, 1)
    const k = lam > 0.55 ? -0.18 : lam > 0.1 ? 0 : lam > -0.25 ? 0.3 : 0.55
    ctx.fillStyle = k < 0 ? mixHex(col, '#ffffff', -k) : k > 0 ? mixHex(col, '#0a0620', k) : col
    ctx.fillRect(X0 + dx - c / 2, Y0 + dy - c / 2, c + 0.5, c + 0.5)
  }
  drawRing(true)
  if (face) drawFace(ctx, X0, Y0, rr, t, face, look, seed)
  ctx.restore()
  return { x, y, r: rr }
}
function drawFace(ctx, X0, Y0, rr, t, mood, look, seed) {
  const c = Math.max(2, Math.round(rr / 14)), ex = Math.round(rr * 0.32), ey = Math.round(-rr * 0.12)
  const shut = (t + seed * 0.6) % 3.6 < 0.12
  const lx = clamp(Math.round(look[0]), -1, 1) * c, ly = clamp(Math.round(look[1]), -1, 1) * c
  for (const s of [-1, 1]) {
    const cx = X0 + s * ex, cy = Y0 + ey
    if (mood === 'happy') { ctx.fillStyle = INK; ctx.fillRect(cx - 2 * c, cy, c, c); ctx.fillRect(cx - c, cy - c, 2 * c, c); ctx.fillRect(cx + c, cy, c, c); continue }
    if (mood === 'sleepy' || shut) { ctx.fillStyle = INK; ctx.fillRect(cx - 2 * c, cy, 4 * c, c); continue }
    const w = mood === 'wide' ? 4 : 3, h = mood === 'squint' ? 1.5 : mood === 'wide' ? 4 : 3.5
    ctx.fillStyle = INK; ctx.fillRect(cx - (w / 2 + 1) * c, cy - (h / 2 + 1) * c, (w + 2) * c, (h + 2) * c)
    ctx.fillStyle = '#fffaf0'; ctx.fillRect(cx - (w / 2) * c, cy - (h / 2) * c, w * c, h * c)
    ctx.fillStyle = INK; ctx.fillRect(cx - c + lx, cy - c + ly + (mood === 'squint' ? c * 0.3 : 0), 2 * c, mood === 'squint' ? c : 2 * c)
  }
}

// ═══════════════════════════════════════════════ stars up close + clusters
export function drawStarBall(ctx, x, y, r, t, opts = {}) {
  const { color = '#ffd36a', squish = 0, corona = 1, face = null, look = [0, 0], alpha = 1, pop = 1, seed = 5 } = opts
  const rr = r * pop
  if (alpha <= 0 || rr < 2) return { x, y, r: rr }
  const c = Math.max(2, Math.round(rr / 16)), sy = 1 - clamp(squish, 0, 0.6), n = Math.ceil(rr / c) + 1
  ctx.save(); ctx.globalAlpha *= alpha
  const X0 = Math.round(x), Y0 = Math.round(y)
  glowAt(ctx, x, y, rr * 2.6, color, 0.9 * corona)
  glowAt(ctx, x, y, rr * 1.5, mixHex(color, '#ffffff', 0.4), 0.6 * corona)
  // corona rays (pixel spokes that pulse)
  if (corona > 0) for (let k = 0; k < 16; k++) {
    const a = k / 16 * TAU + t * 0.08, len = rr * (0.25 + 0.2 * Math.sin(t * 2 + k * 1.9)) * corona
    for (let q = 0; q < len; q += c) {
      const rx = X0 + Math.cos(a) * (rr + c + q), ry = Y0 + Math.sin(a) * (rr + c + q) * sy
      ctx.globalAlpha = alpha * corona * 0.55 * (1 - q / len)
      ctx.fillStyle = mixHex(color, '#ffffff', 0.5); ctx.fillRect(Math.round(rx - c / 2), Math.round(ry - c / 2), c, c)
    }
  }
  ctx.globalAlpha = alpha
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const dx = i * c, dy = j * c, d = Math.hypot(dx, dy / sy)
    if (d > rr) continue
    const mu = Math.sqrt(Math.max(0, 1 - (d / rr) ** 2))
    const gran = vnoise(i * 0.7 + t * 1.2, j * 0.7 - t * 0.8, seed)
    const k = 0.62 + 0.38 * mu + (gran - 0.5) * 0.22
    ctx.fillStyle = k > 0.95 ? mixHex(color, '#ffffff', 0.55) : k > 0.82 ? mixHex(color, '#ffffff', 0.25) : k > 0.7 ? color : mixHex(color, '#5a1020', 0.3)
    ctx.fillRect(X0 + dx - c / 2, Y0 + dy - c / 2, c + 0.5, c + 0.5)
  }
  if (face) drawFace(ctx, X0, Y0, rr, t, face, look, seed)
  ctx.restore()
  return { x, y, r: rr }
}

export function drawCluster(ctx, cx, cy, R, t, opts = {}) {
  const { n = 70, bright = 7, color = '#cfe6ff', haze = 0, hazeColor = '#5f8cff', seed = 45, alpha = 1, reveal = 1 } = opts
  const stars = []
  const rand = rng(seed)
  for (let k = 0; k < bright + n; k++) {
    const a = rand() * TAU, d = Math.sqrt(rand()) * R * (k < bright ? 0.7 : 1)
    stars.push([cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.85, k < bright ? 9 : rand() > 0.8 ? 4 : 3, k < bright])
  }
  if (alpha <= 0) return { stars }
  ctx.save(); ctx.globalAlpha *= alpha
  if (haze > 0) for (let k = 0; k < 7; k++) {
    const [sx, sy] = bright > 0 ? stars[k % bright] : [cx + Math.cos(k * 2.4) * R * 0.35, cy + Math.sin(k * 2.4) * R * 0.3]
    glowAt(ctx, sx + Math.sin(k * 2.1) * R * 0.15, sy + Math.cos(k * 1.3) * R * 0.12, R * (0.45 + 0.1 * Math.sin(t * 0.6 + k)), hazeColor, 0.45 * haze)
  }
  stars.forEach(([sx, sy, px, isB], k) => {
    const vis = isB ? 1 : clamp((reveal - (k - bright) / n * 0.9) * 6)
    if (vis <= 0) return
    const tw = 0.7 + 0.3 * Math.sin(t * (2 + (k % 5) * 0.4) + k)
    ctx.globalAlpha = alpha * vis * (isB ? 1 : 0.55 + 0.45 * tw)
    if (isB) {
      glowAt(ctx, sx, sy, 34, color, 0.7 * tw)
      const a = Math.round(px / 3)
      ctx.fillStyle = INK; ctx.fillRect(Math.round(sx - a * 1.5 - 1), Math.round(sy - a * 1.5 - 1), a * 3 + 2, a * 3 + 2)
      ctx.fillStyle = '#ffffff'; ctx.fillRect(Math.round(sx - a * 1.5), Math.round(sy - a * 1.5), a * 3, a * 3)
      ctx.fillStyle = color; ctx.fillRect(Math.round(sx - a * 4 * tw), Math.round(sy - 1.5), Math.round(a * 8 * tw), 3); ctx.fillRect(Math.round(sx - 1.5), Math.round(sy - a * 4 * tw), 3, Math.round(a * 8 * tw))
    } else { ctx.fillStyle = k % 4 ? color : '#ffffff'; ctx.fillRect(Math.round(sx), Math.round(sy), px, px) }
  })
  ctx.restore()
  return { stars }
}

// ═══════════════════════════════════════════════ countdown + sound
export function countdownTimes(at, { step = 0.9, n = 4 } = {}) {
  const ts = Array.from({ length: n }, (_, i) => r3(at + i * step))
  ts.end = r3(at + (n - 1) * step + 1.1)
  return ts
}
export function drawCountdown(ctx, t, opts = {}) {
  const { at, step = 0.9, x = 540, y = 900, size = 260, color = SPACE.amber, labels = ['3', '2', '1', 'LIFTOFF!'] } = opts
  const ts = countdownTimes(at, { step, n: labels.length })
  if (t < at || t >= ts.end) return
  let i = labels.length - 1
  for (let k = 0; k < labels.length; k++) if (t >= ts[k]) i = k
  const t0 = ts[i], last = i === labels.length - 1, dur = last ? ts.end - t0 : step
  const p = prog(t, t0, t0 + dur)
  const k = easeOutBack(prog(t, t0, t0 + 0.22), 2.4) * (1 - ease.inCubic(prog(t, t0 + dur - 0.12, t0 + dur)))
  ctx.save(); ctx.translate(x, y); ctx.scale(k, k)
  if (!last) {
    // a pixel ring that empties as the second runs out
    const R = size * 0.62, c = Math.max(4, Math.round(size / 26))
    for (let a = 0; a < TAU; a += c / R) {
      const on = a / TAU > p
      ctx.fillStyle = on ? color : 'rgba(255,195,92,0.18)'
      ctx.fillRect(Math.round(Math.cos(a - Math.PI / 2) * R - c / 2), Math.round(Math.sin(a - Math.PI / 2) * R - c / 2), c, c)
    }
  }
  const fs = last ? Math.round(size * 0.42) : size
  ctx.font = `700 ${fs}px ${MONO}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.lineWidth = Math.max(8, fs * 0.08); ctx.strokeStyle = INK; ctx.lineJoin = 'round'
  ctx.strokeText(labels[i], 0, fs * 0.04)
  ctx.fillStyle = last ? '#fff3d0' : color; ctx.fillText(labels[i], 0, fs * 0.04)
  ctx.restore()
}
export function countdownCues(at, { step = 0.9, n = 4 } = {}) {
  const ts = countdownTimes(at, { step, n })
  return [
    ...ts.slice(0, -1).map(v => ['chip', v, 880, 0.16, { wave: 'square', gain: 0.03, decay: 0.12, sustain: 0.5, rev: 0.05, dly: 0 }]),
    ['chip', ts[n - 1], 1760, 0.3, { wave: 'square', gain: 0.035, decay: 0.2, sustain: 0.6, rev: 0.1, dly: 0 }],
    ['boom', ts[n - 1], 0.4], ['crash', ts[n - 1], { gain: 0.06, len: 2 }],
  ]
}
export function launchCues(at, { len = 2.6 } = {}) {
  return [['boom', r3(at), 0.45], ['swell', r3(at), r3(at + len), { gain: 0.05, f0: 120, f1: 1400 }], ['riser', r3(at + 0.1), r3(at + len), 0.05], ['whoosh', r3(at + len * 0.6), 0.8, 0.06]]
}
export function warpCues(at, { len = 1.2 } = {}) {
  return [['riser', r3(at - len * 0.6), r3(at), 0.06], ['boom', r3(at), 0.32], ['whoosh', r3(at), 0.9, 0.08], ['glitter', r3(at), r3(at + len)]]
}
export function cheerCues(at, { len = 2 } = {}) {
  const out = [['crash', r3(at), { gain: 0.06, len: 2 }], ['swell', r3(at), r3(at + len), { gain: 0.04, f0: 900, f1: 3000 }]]
  for (let k = 0; k < Math.round(len * 5); k++) out.push(['clap', r3(at + k * 0.2 + (k % 2) * 0.04), { gain: 0.12, pan: (k % 3 - 1) * 0.4 }])
  return out
}
void mixHex
