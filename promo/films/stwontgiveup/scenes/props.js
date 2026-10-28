// stwontgiveup props — small pixel drawings for "The Star Who Won't Give Up" (Star Talk season 3 #16). Everything is a
// pure function of its arguments; nothing touches `document` at module top level (the sound build imports
// scenes/index.js in node).
//
//   LW, LH, DECK                     the low-res bridge canvas: LW × LH art pixels (drawn at PS screen px each by the film);
//                                    DECK = the walkway row (everyone's feet)
//   paintBridge(l, t, S)             the whole low-res bridge into l (an LW×LH 2D context, cleared here): rooftops, the far
//                                    rail, four lamps (S.lamps brightness 0…1.4), the deck + arches, then YOU (S.you), the
//                                    STRANGER (S.str) and the DOG (S.dog)
//   LAMP_X, lampGlass(i)             lamp positions / the centre of lamp i's glass (art px), for the full-res glows
//   youAnchors(S.you) / strAnchors(S.str) / dogAnchors(S.dog)   head / phone / hand points (art px) for the overlays
//   drawPlanet(ctx, x, y, r, kind, { alpha, cell })            a shaded pixel planet (mercury venus mars jupiter saturn)
//   drawCloud(ctx, x, y, cell, { alpha })                      a fluffy pixel cloud, (x, y) = the centre of its top edge
//   drawRainCloud(ctx, x, y, cell, t, { alpha, rain })          a tiny grey cloud raining on whoever is under it
//   drawBang(ctx, x, y, cell, { alpha, rot })                  a gold pixel "!" (the idea), (x, y) = centre
//   drawPixelHeart(ctx, x, y, px, col)                         a 7×6 pixel heart centred on (x, y)
//   drawTears(ctx, eyes, t, t0, { cell, strength, alpha })     cartoon fountain tears from [[x, y], …]
//   drawTinyPhone(ctx, x, y, cell, { rot, glow, alpha })       a little pixel phone (the star calls you at the end)
//   drawBitmap(ctx, rows, x, y, cell, pal, { ax, ay, rot, flip, alpha })
import { clamp, lerp } from '../../../src/lib.js'

const INK = '#1b1236'
export const LW = 180, LH = 100, DECK = 70

export function drawBitmap(ctx, rows, x, y, cell, pal, { ax = 0.5, ay = 0.5, rot = 0, flip = false, alpha = 1 } = {}) {
  if (alpha <= 0) return
  const w = rows[0].length, h = rows.length, c = Math.max(1, Math.round(cell))
  ctx.save()
  ctx.globalAlpha *= alpha
  ctx.translate(Math.round(x), Math.round(y))
  if (rot) ctx.rotate(rot)
  if (flip) ctx.scale(-1, 1)
  const ox = -Math.round(w * c * ax), oy = -Math.round(h * c * ay)
  rows.forEach((r, j) => { for (let i = 0; i < r.length; i++) { const col = pal[r[i]]; if (!col) continue; ctx.fillStyle = col; ctx.fillRect(ox + i * c, oy + j * c, c, c) } })
  ctx.restore()
}

// ═══════════════════════════════════════ the low-res bridge ═══════════════════════════════════════
const C = {
  roof: '#140e27', roofHi: '#221940', win: '#ffd98a', winDim: '#8a6a4a',
  rail: '#3a2b58', railHi: '#6b5896', railLo: '#24193d',
  deck: '#5a4878', deckHi: '#8f7bb0', face: '#3d2f59', faceHi: '#4d3d6c', mortar: '#2a1f42',
  body: '#2e2348', bodyHi: '#45366a', voussoir: '#56467e',
  iron: '#211a36', ironHi: '#4f4574', glassOff: '#3a3358', glassMid: '#ffcf6e', glassOn: '#fff3c6',
}
export const LAMP_X = [22, 58, 100, 158]
export const lampGlass = i => [LAMP_X[i] + 0.5, 13.5]

// far rooftops (x0, width, top row) + lit windows (dx, dy) — a quiet city behind the river
const SX = v => Math.round(v * 5 / 6)
const ROOFS0 = [[0, 14, 44], [12, 10, 50], [21, 12, 40], [32, 9, 52], [40, 14, 47], [53, 10, 55], [62, 16, 49], [77, 8, 56],
  [84, 12, 51], [95, 14, 45], [108, 9, 53], [116, 12, 48], [127, 15, 54], [141, 10, 46], [150, 12, 52], [161, 14, 43],
  [174, 9, 50], [182, 13, 47], [194, 10, 53], [203, 13, 42]]
const WINS0 = [[3, 49], [6, 55], [24, 45], [27, 52], [43, 51], [47, 58], [66, 53], [70, 60], [88, 55], [99, 50], [103, 57],
  [119, 52], [131, 58], [144, 50], [153, 56], [165, 47], [168, 54], [185, 51], [197, 57], [206, 46], [209, 53]]
const ROOFS = ROOFS0.map(([x, w, y]) => [SX(x), Math.max(6, SX(w)), y]), WINS = WINS0.map(([x, y]) => [SX(x), y])

function R(l, x, y, w, h, c) { l.fillStyle = c; l.fillRect(Math.round(x), Math.round(y), w, h) }
function disc(l, cx, cy, r, c, keep) {
  for (let j = Math.floor(cy - r); j <= Math.ceil(cy + r); j++) for (let i = Math.floor(cx - r); i <= Math.ceil(cx + r); i++)
    if ((i + 0.5 - cx) ** 2 + (j + 0.5 - cy) ** 2 <= r * r && (!keep || keep(i, j))) R(l, i, j, 1, 1, c)
}
function thick(l, x0, y0, x1, y1, c, w = 2) {
  const n = Math.max(1, Math.ceil(Math.hypot(x1 - x0, y1 - y0) * 1.5))
  for (let k = 0; k <= n; k++) { const u = k / n; R(l, Math.round(lerp(x0, x1, u) - (w - 1) / 2), Math.round(lerp(y0, y1, u) - (w - 1) / 2), w, w, c) }
}

function lamp(l, x, b, t, lift = 0) {
  const o = -Math.round(lift)
  // base + pole (the pole stretches when the lamp "stands up" for the wave)
  R(l, x - 1, DECK - 3, 4, 3, C.iron); R(l, x - 1, DECK - 3, 1, 3, C.ironHi)
  R(l, x, 18 + o, 2, DECK - 20 - o, C.iron); R(l, x, 18 + o, 1, DECK - 20 - o, C.ironHi)
  R(l, x - 1, 30, 4, 1, C.iron)
  // lantern
  R(l, x, 7 + o, 2, 1, C.iron); R(l, x - 1, 8 + o, 4, 1, C.iron); R(l, x - 2, 9 + o, 6, 1, C.iron); R(l, x - 2, 9 + o, 2, 1, C.ironHi)
  const on = clamp(b), g = on > 0.66 ? C.glassOn : on > 0.25 ? C.glassMid : C.glassOff
  R(l, x - 2, 10 + o, 6, 7, C.iron)
  R(l, x - 1, 10 + o, 4, 6, g)
  if (on > 0.25) R(l, x - 1, 10 + o, 1, 6, on > 0.66 ? '#ffffff' : C.glassOn)
  R(l, x - 2, 16 + o, 6, 1, C.iron); R(l, x, 17 + o, 2, 1, C.iron)
  void t
}

/** the stone bridge: deck surface + face, arches over the (full-res) river below */
function bridge(l) {
  R(l, 0, DECK, LW, 2, C.deck); R(l, 0, DECK, LW, 1, C.deckHi)
  R(l, 0, DECK + 2, LW, 5, C.face); R(l, 0, DECK + 2, LW, 1, C.faceHi)
  for (let i = 0; i < LW; i += 12) R(l, i + ((i / 12) % 2 ? 6 : 0), DECK + 3, 1, 4, C.mortar)
  R(l, 0, DECK + 7, LW, 1, C.mortar)
  // arches between piers
  const piers = [[-5, 8], [52, 67], [113, 128], [172, 187]]
  for (let x = 0; x < LW; x++) {
    let top = LH
    for (let p = 0; p + 1 < piers.length; p++) {
      const a = piers[p][1], bb = piers[p + 1][0]
      if (x >= a && x < bb) { const u = (x + 0.5 - (a + bb) / 2) / ((bb - a) / 2); top = Math.round(LH - 21 * Math.sqrt(Math.max(0, 1 - u * u))) }
    }
    R(l, x, DECK + 8, 1, Math.max(0, top - (DECK + 8)), C.body)
    if (top < LH) { R(l, x, top - 2, 1, 2, C.voussoir); if (x % 5 === 0) R(l, x, top - 2, 1, 2, C.mortar) }
  }
  for (const [a, bb] of piers) { if (a >= 0) R(l, a, DECK + 8, 1, LH, C.bodyHi) ; void bb }
}

// ── people. Drawn facing right around a centre column x0 with feet on DECK; the stranger is mirrored.
const YOU = { skin: '#d79a6c', skinSh: '#b57a52', hair: '#2a1a14', hairHi: '#4a3024', top: '#2fb5a5', topSh: '#1f8577', topHi: '#6fe0d0', pants: '#2b3268', pantsSh: '#1e2350', shoe: '#efe6d6', sole: '#9a8fb8' }
const STR = { skin: '#f0bd96', skinSh: '#d59a76', hair: '#9a3a46', hairHi: '#c25866', top: '#f0727e', topSh: '#c2505d', topHi: '#ff9da6', pants: '#3b2a4f', pantsSh: '#2a1d3a', shoe: '#5a3448', sole: '#2a1d3a', hat: '#f2c75c', hatSh: '#c99a32', pom: '#fff3d6', scarf: '#efe6d6', scarfSh: '#c9bca6' }

/** one person facing right. s: { x, step (walk phase or null), head 'down'|'fwd'|'up', arm, k (arm param), jolt, blush, smile } */
function person(l, P, s, coat = false) {
  const x0 = Math.round(s.x), F = DECK
  const walking = s.step != null
  const ph = walking ? ((s.step % 1) + 1) % 1 : -1
  const apart = walking && ph < 0.5
  const bob = walking && !apart ? -1 : 0
  const jolt = s.jolt || 0
  const top = F - 23 + bob + jolt
  // legs (hip → ankle), back leg first
  const hipY = F - 11 + bob
  const legs = apart ? [[x0 - 1, x0 - 4], [x0 + 1, x0 + 4]] : walking ? [[x0 - 1, x0], [x0 + 1, x0 + 1]] : [[x0 - 1, x0 - 2], [x0 + 1, x0 + 2]]
  legs.forEach(([hx, fx], i) => {
    thick(l, hx, hipY, fx, F - 3, i ? P.pants : P.pantsSh, 3)
    // shoe
    R(l, fx - 1, F - 2, 5, 2, P.shoe); R(l, fx - 1, F - 1, 5, 1, P.sole)
  })
  // torso (a coat runs longer)
  const bot = coat ? F - 7 : F - 11 + bob
  R(l, x0 - 4, top + 1, 8, bot - top - 1, P.top)
  R(l, x0 - 3, top, 6, 1, P.top)
  R(l, x0 - 4, top + 1, 2, bot - top - 1, P.topSh)
  R(l, x0 + 2, top + 2, 1, bot - top - 4, P.topHi)
  if (coat) { R(l, x0 - 4, bot - 1, 8, 1, P.topSh); R(l, x0 + 1, top + 3, 1, bot - top - 4, P.topSh) }
  else { R(l, x0 - 1, top + 8, 4, 1, P.topSh); R(l, x0 - 4, bot - 1, 8, 1, P.topSh) }        // hoodie pocket + hem
  // neck + head
  const hd = s.head || 'fwd'
  const [hdx, hdy] = hd === 'down' ? [1, 1] : hd === 'up' ? [-1, -1] : [0, 0]
  const hx = x0 + 1 + hdx, hy = top - 6 + hdy
  R(l, x0, top - 2, 2, 2, P.skinSh)
  disc(l, hx, hy, 4.8, P.skin)
  R(l, hx + 4, hy + 1, 1, 1, P.skin)                           // nose
  // hair / hat
  if (P.hat) {
    disc(l, hx, hy, 5.0, P.hair, (i, j) => i < hx - 2 && j > hy - 2)                // hair down the back
    R(l, hx - 5, hy - 1, 3, 6, P.hair); R(l, hx - 5, hy, 1, 4, P.hairHi)
    disc(l, hx, hy - 1, 5.2, P.hat, (i, j) => j < hy - 1)
    R(l, hx - 5, hy - 2, 11, 2, P.hatSh); R(l, hx - 4, hy - 2, 9, 1, P.hat)
    disc(l, hx - 1, hy - 7, 1.9, P.pom)
  } else {
    disc(l, hx, hy, 5.0, P.hair, (i, j) => j < hy - 1 || (i < hx - 2 && j < hy + 2))
    R(l, hx - 1, hy - 5, 4, 1, P.hairHi)
    if (hd === 'down') R(l, hx + 2, hy - 2, 2, 1, P.hair)            // fringe falls forward
  }
  // scarf
  if (P.scarf) { R(l, x0 - 3, top - 1, 7, 2, P.scarf); R(l, x0 - 3, top, 7, 1, P.scarfSh); R(l, x0 - 3, top + 1, 2, 4, P.scarf) }
  // face
  if (hd === 'down') { R(l, hx + 2, hy + 1, 2, 1, INK) }                         // eyes on the screen
  else if (hd === 'up') { R(l, hx + 2, hy - 2, 1, 2, INK); if (s.smile) R(l, hx + 3, hy + 2, 2, 1, '#8a3040') }
  else { R(l, hx + 2, hy - 1, 1, 2, INK); if (s.smile) R(l, hx + 3, hy + 2, 2, 1, '#8a3040') }
  if (s.blush) { l.globalAlpha = clamp(s.blush); R(l, hx + 1, hy + 2, 2, 1, '#ff6f9a'); l.globalAlpha = 1 }
  // arms
  const sh = [x0 + 1, top + 2]
  const arm = s.arm || 'down', k = s.k || 0
  const hand = (x, y) => R(l, x - 1, y - 1, 2, 2, P.skin)
  const phone = (x, y, glow = 1) => { R(l, x - 1, y - 2, 3, 4, INK); R(l, x, y - 1, 1, 2, glow > 0.5 ? '#d8fbff' : '#7fd8ef') }
  if (arm === 'phone' || arm === 'pet' || arm === 'rub') {
    // the phone held up at the chest (both hands, or one while the other pets / rubs)
    const px = x0 + 5, py = top + 6 + (hd === 'down' ? 0 : 1)
    thick(l, sh[0] - 1, sh[1], x0 + 2, top + 8, P.topSh, 2); thick(l, x0 + 2, top + 8, px, py + 1, P.topSh, 2)
    phone(px + 1, py, 1); hand(px, py + 1)
    if (arm === 'phone') { thick(l, sh[0], sh[1] + 1, x0 + 3, top + 9, P.top, 2); thick(l, x0 + 3, top + 9, px - 1, py + 2, P.top, 2); hand(px - 1, py + 2) }
    else if (arm === 'pet') { const hx2 = x0 + 7, hy2 = F - 12 - Math.round(2 * k); thick(l, sh[0], sh[1] + 1, x0 + 3, top + 9, P.top, 2); thick(l, x0 + 3, top + 9, hx2, hy2, P.top, 2); hand(hx2 + 1, hy2) }
    else { thick(l, sh[0], sh[1] + 1, hx - 2, hy - 1, P.top, 2); hand(hx - 1 + Math.round(k), hy - 5) }
  } else if (arm === 'pockets') {
    thick(l, sh[0], sh[1] + 1, x0 + 2, top + 9, P.topSh, 2)
  } else if (arm === 'wish') {
    thick(l, sh[0], sh[1] + 1, x0 + 3, top + 5, P.top, 2); thick(l, x0 + 3, top + 5, hx + 3, hy + 4, P.top, 2); R(l, hx + 2, hy + 3, 3, 3, P.skin)
  } else if (arm === 'wave' || arm === 'skywave') {
    const up = arm === 'skywave'
    const ex = x0 + 4, ey = top - 1, wx = ex + (up ? 3 : 2) + Math.round(Math.sin(k) * 1.6), wy = up ? top - 14 : top - 10
    thick(l, sh[0], sh[1], ex, ey, P.top, 2); thick(l, ex, ey, wx, wy, P.top, 2); R(l, wx - 1, wy - 2, 3, 3, P.skin)
    if (s.phoneLow) phone(x0 + 3, F - 13, 0.3)
  } else if (arm === 'low') {
    thick(l, sh[0], sh[1] + 1, x0 + 2, top + 8, P.top, 2); thick(l, x0 + 2, top + 8, x0 + 3, F - 13, P.top, 2)
    phone(x0 + 4, F - 13, 0.3); hand(x0 + 3, F - 12)
  } else {
    thick(l, sh[0], sh[1] + 1, x0 + 1, top + 10, P.top, 2); hand(x0 + 1, top + 11)
  }
}

/** the dog, facing f (+1 right / −1 left). d: { x, f, pose 'sit'|'run'|'up'|'lie', step, wag, dy } — feet on DECK */
function dog(l, d) {
  const x0 = Math.round(d.x), F = DECK + Math.round(d.dy || 0), f = d.f || 1
  const body = '#f3e2c0', sh = '#d4b48a', ear = '#a8673d', earSh = '#7e4a2a'
  l.save(); l.translate(x0 + 0.5, 0); l.scale(f, 1); l.translate(-0.5, 0)
  const X = (dx) => dx                                        // local coords, facing right
  const wag = d.wag ? Math.round(Math.sin(d.wag) * 1.5) : 0
  if (d.pose === 'run') {
    const ph = ((d.step || 0) % 1 + 1) % 1, a = ph < 0.5
    R(l, X(-6), F - 8, 11, 5, body); R(l, X(-6), F - 4, 11, 1, sh)               // body
    R(l, X(-9), F - 10 + (a ? 0 : 1), 4, 1, body); R(l, X(-10), F - 11 + (a ? 0 : 1), 2, 1, body)   // tail out
    for (const [lx, fw] of a ? [[-5, -2], [3, 2]] : [[-4, 1], [2, -1]]) { R(l, X(lx), F - 3, 2, 3, sh); R(l, X(lx + fw), F - 1, 2, 1, sh) }
    disc(l, X(6), F - 10, 3.6, body); R(l, X(8), F - 9, 3, 2, body)               // head + snout
    R(l, X(10), F - 10, 1, 1, INK); R(l, X(6), F - 11, 1, 1, INK)                  // nose, eye
    R(l, X(3), F - 13, 2, 3, ear); R(l, X(2), F - 12, 1, 2, earSh)                 // ear flying back
    R(l, X(8), F - 7, 2, 1, '#ff7a9a')                                             // tongue
  } else if (d.pose === 'lie') {
    R(l, X(-6), F - 5, 12, 5, body); R(l, X(-6), F - 1, 12, 1, sh)
    disc(l, X(6), F - 5, 3.4, body); R(l, X(8), F - 4, 3, 2, body); R(l, X(10), F - 5, 1, 1, INK); R(l, X(6), F - 6, 1, 1, INK)
    R(l, X(3), F - 8, 2, 4, ear)
    R(l, X(-8), F - 3 + wag, 3, 1, body)
  } else {
    // sitting, side view: haunch at the back, chest up, head high
    const up = d.pose === 'up'
    R(l, X(-5), F - 6, 7, 6, body); R(l, X(-5), F - 1, 7, 1, sh)                  // haunch
    R(l, X(-1), F - 10, 5, 8, body); R(l, X(2), F - 3, 2, 3, sh); R(l, X(3), F - 1, 2, 1, sh)   // chest + front paw
    R(l, X(-6), F - 4 + wag, 1, 1, body); R(l, X(-7), F - 5 + wag * 2, 1, 2, body); R(l, X(-8), F - 6 + wag * 2, 1, 1, body)  // tail
    const hx = X(2), hy = up ? F - 14 : F - 13
    disc(l, hx, hy, 3.7, body)
    R(l, hx + 2 + (up ? 0 : 1), hy + (up ? -1 : 0), 3, 2, body)                 // snout (tilted up when looking up)
    R(l, hx + 4 + (up ? 0 : 1), hy + (up ? -1 : 0), 1, 1, INK)                   // nose
    R(l, hx + 1, hy - (up ? 2 : 1), 1, 1, INK)                                    // eye
    R(l, hx - 3, hy - 3, 2, 5, ear); R(l, hx - 3, hy - 3, 1, 5, earSh)            // floppy ear
    if (d.tongue) R(l, hx + 3, hy + 2, 1, 2, '#ff7a9a')
  }
  l.restore()
}

export function paintBridge(l, t, S) {
  l.clearRect(0, 0, LW, LH)
  if (!S.peopleOnly) scenery(l, t, S)
  // the people (the dog in front)
  if (S.str) { const s = S.str; l.save(); l.translate(2 * Math.round(s.x) + 1, 0); l.scale(-1, 1); person(l, STR, { ...s, x: Math.round(s.x) }, true); l.restore() }
  if (S.you) person(l, YOU, S.you)
  if (S.dog) dog(l, S.dog)
}
function scenery(l, t, S) {
  // rooftops + a few lit windows
  for (const [x, w, y] of ROOFS) { R(l, x, y, w, DECK - y, C.roof); R(l, x, y, w, 1, C.roofHi) }
  WINS.forEach(([x, y], i) => { const on = Math.sin(t * 0.35 + i * 2.1) > -0.7; R(l, x, y, 2, 2, on ? C.win : C.winDim) })
  // far rail
  R(l, 0, DECK - 14, LW, 2, C.rail); R(l, 0, DECK - 14, LW, 1, C.railHi)
  R(l, 0, DECK - 8, LW, 1, C.rail)
  for (let x = 2; x < LW; x += 6) R(l, x, DECK - 12, 1, 12, C.railLo)
  // lamps
  LAMP_X.forEach((x, i) => lamp(l, x, S.lamps ? S.lamps[i] : 1, t, S.lift ? S.lift[i] : 0))
  bridge(l)
  // light pools on the deck under lit lamps
  LAMP_X.forEach((x, i) => { const b = clamp(S.lamps ? S.lamps[i] : 1); if (b < 0.3) return; l.globalAlpha = 0.35 * b; R(l, x - 8, DECK, 18, 1, '#ffe6a8'); l.globalAlpha = 1 })
}

// overlay anchors (art px)
export function youAnchors(s) {
  const top = DECK - 23 + (s.jolt || 0)
  const hd = s.head || 'fwd', [hdx, hdy] = hd === 'down' ? [1, 1] : hd === 'up' ? [-1, -1] : [0, 0]
  return { head: [s.x + 1 + hdx, top - 6 + hdy], crown: [s.x + 1 + hdx, top - 11 + hdy], phone: [s.x + 6, top + 6], foot: [s.x + 3, DECK - 1] }
}
export function strAnchors(s) {
  const top = DECK - 23
  return { head: [s.x - 1, top - 6], crown: [s.x - 1, top - 13], hand: [s.x - 6, top - 12] }
}
export function dogAnchors(d) {
  const F = DECK + Math.round(d.dy || 0)
  return { head: [d.x + (d.f || 1) * 2, F - 14] }
}

// ═══════════════════════════════════════ full-res props ═══════════════════════════════════════
const PLANETS = {
  mercury: { base: '#b9b2c8', hi: '#e2dcef', sh: '#7d7592', spots: '#968fa8' },
  venus: { base: '#f3dca0', hi: '#fff3cf', sh: '#c9a564', spots: '#e6c886' },
  mars: { base: '#e2683f', hi: '#ff9a6e', sh: '#9e3a22', spots: '#c24f2e' },
  jupiter: { base: '#e8c08e', hi: '#fde3bd', sh: '#a87a4c', spots: '#c98f5c', bands: ['#c98f5c', '#f2d3a6', '#b97a48'] },
  saturn: { base: '#f0d58e', hi: '#fff0c2', sh: '#b8954e', spots: '#d9b46a', ring: '#e8d2a0', ringSh: '#9c845a' },
}
export function drawPlanet(ctx, x, y, r, kind, { alpha = 1, cell = 6, t = 0 } = {}) {
  if (alpha <= 0) return
  const P = PLANETS[kind], c = cell, n = Math.max(2, Math.round(r / c))
  ctx.save(); ctx.globalAlpha *= alpha
  // glow
  const g = ctx.createRadialGradient(x, y, n * c * 0.6, x, y, n * c * 2.2)
  g.addColorStop(0, 'rgba(255,236,200,0.22)'); g.addColorStop(1, 'rgba(255,236,200,0)')
  ctx.fillStyle = g; ctx.fillRect(x - n * c * 2.2, y - n * c * 2.2, n * c * 4.4, n * c * 4.4)
  const ring = (front) => {
    if (kind !== 'saturn') return
    for (let i = -n * 2; i <= n * 2; i++) {
      const u = i / (n * 2), yy = Math.round(-u * n * 0.35)
      const isFront = u > -0.05
      if (isFront !== front) continue
      if (!front && Math.abs(i) < n) continue
      ctx.fillStyle = Math.abs(u) > 0.8 ? P.ringSh : P.ring
      ctx.fillRect(Math.round(x + i * c - c / 2), Math.round(y + yy * c - c / 2), c, c)
    }
  }
  ring(false)
  for (let j = -n; j <= n; j++) for (let i = -n; i <= n; i++) {
    const d = Math.hypot(i, j)
    if (d > n + 0.3) continue
    let col = P.base
    const lit = (-i - j) / (n * 1.4)
    if (d > n - 0.7) col = P.sh
    else if (lit > 0.45) col = P.hi
    else if (lit < -0.35) col = P.sh
    if (P.bands && d <= n - 0.7) { const b = (j + n) % 3; if (b === 1 && lit < 0.45) col = P.bands[(j + 30) % 3] }
    if (kind === 'mars' && ((i * 7 + j * 3) % 11 === 0) && d < n - 1) col = P.spots
    if (kind === 'mercury' && ((i * 5 + j * 9) % 13 === 0) && d < n - 1) col = P.spots
    ctx.fillStyle = col
    ctx.fillRect(Math.round(x + i * c - c / 2), Math.round(y + j * c - c / 2), c, c)
  }
  ring(true)
  ctx.restore()
  void t
}

const CLOUD = [
  '.......AAAAA..........',
  '.....AAAAAAAAA..AAA...',
  '...AAAAAAAAAAAAAAAAAA.',
  '..AAAAAAAAAAAAAAAAAAAA',
  '.AAAAAAAAAAAAAAAAAAAAA',
  'BBBBBBBBBBBBBBBBBBBBBB',
  '.BBBBBBBBBBBBBBBBBBBB.',
  '...CCCCCCCCCCCCCCCC...',
]
export function drawCloud(ctx, x, y, cell, { alpha = 1 } = {}) {
  drawBitmap(ctx, CLOUD, x, y, cell, { A: '#f3ecff', B: '#d6c9f2', C: '#a99bd4' }, { ax: 0.5, ay: 0, alpha })
}
const RAINCLOUD = [
  '....DDDD....',
  '..DDDDDDDD..',
  '.DDDDDDDDDDD',
  'EEEEEEEEEEEE',
  '.EEEEEEEEEE.',
]
export function drawRainCloud(ctx, x, y, cell, t, { alpha = 1, rain = 1 } = {}) {
  if (alpha <= 0) return
  drawBitmap(ctx, RAINCLOUD, x, y, cell, { D: '#9a96b4', E: '#6f6a8e' }, { ax: 0.5, ay: 0, alpha })
  if (rain <= 0) return
  ctx.save(); ctx.globalAlpha *= alpha * clamp(rain)
  const c = Math.round(cell)
  for (let k = 0; k < 7; k++) {
    const ph = (t * 2.4 + k * 0.37) % 1, dx = (k - 3) * c * 1.5
    const yy = y + 5 * c + ph * c * 9
    ctx.fillStyle = '#7fd0f0'; ctx.fillRect(Math.round(x + dx), Math.round(yy), Math.max(2, Math.round(c / 2)), c)
  }
  ctx.restore()
}

const BANG = ['.XX.', 'XGGX', 'XGGX', 'XGGX', 'XGGX', '.XX.', '....', '.XX.', 'XGGX', '.XX.']
export function drawBang(ctx, x, y, cell, { alpha = 1, rot = 0 } = {}) {
  drawBitmap(ctx, BANG, x, y, cell, { X: INK, G: '#ffd95a' }, { alpha, rot })
}

const HEART = ['.XX.XX.', 'XXXXXXX', 'XXXXXXX', '.XXXXX.', '..XXX..', '...X...']
export function drawPixelHeart(ctx, x, y, px, col = '#ff4f7e', alpha = 1) {
  drawBitmap(ctx, HEART, x, y, px, { X: col }, { alpha })
}

export function drawTears(ctx, eyes, t, t0, { cell = 6, strength = 1, alpha = 1 } = {}) {
  if (t < t0 || strength <= 0) return
  const c = Math.max(2, Math.round(cell))
  ctx.save(); ctx.globalAlpha *= alpha
  eyes.forEach(([ex, ey], side) => {
    const dir = side === 0 ? -1 : 1
    for (let k = 0; k < 9; k++) {
      const ph = ((t - t0) * 2.1 + k / 9) % 1
      const vx = dir * (60 + 40 * strength) * c / 6, vy = -40 * c / 6
      const px = ex + vx * ph * 1.6, py = ey + vy * ph * 1.6 + 260 * c / 6 * ph * ph
      const a = (1 - ph) * clamp(strength)
      if (a <= 0.03) continue
      ctx.globalAlpha = alpha * a
      const X = Math.round(px), Y = Math.round(py)
      ctx.fillStyle = '#16204a'; ctx.fillRect(X - 1, Y - 1, c + 2, 2 * c + 2)
      ctx.fillStyle = '#5cc6ff'; ctx.fillRect(X, Y, c, 2 * c)
      ctx.fillStyle = '#e6f8ff'; ctx.fillRect(X, Y, Math.ceil(c / 2), Math.ceil(c / 2))
    }
  })
  ctx.restore()
}

const TINY_PHONE = ['XXXXX', 'XSSSX', 'XSSSX', 'XSSSX', 'XSSSX', 'XSSSX', 'XXGXX']
export function drawTinyPhone(ctx, x, y, cell, { rot = 0, glow = 1, alpha = 1 } = {}) {
  if (alpha <= 0) return
  if (glow > 0) {
    ctx.save(); ctx.globalAlpha *= alpha * glow
    const g = ctx.createRadialGradient(x, y, 0, x, y, cell * 9)
    g.addColorStop(0, 'rgba(160,240,255,0.45)'); g.addColorStop(1, 'rgba(160,240,255,0)')
    ctx.fillStyle = g; ctx.fillRect(x - cell * 9, y - cell * 9, cell * 18, cell * 18); ctx.restore()
  }
  drawBitmap(ctx, TINY_PHONE, x, y, cell, { X: INK, S: '#bff4ff', G: '#5a5480' }, { rot, alpha })
}
