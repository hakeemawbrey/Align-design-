// planetkit — the shared PLANET TALK kit (promo/films/PLANETS-BUILD.md): all 10 planet characters, a sign-meets-planet
// two-shot, a space backdrop, speech bubbles with per-character voices, and the planet ENTRANCE hook.
// Built by batch p01 (The Sun). READ-ONLY for every other batch: import it, never edit it. The API below is frozen.
// Demo of everything: promo/films/kplanetdemo (all 10 planets, every entrance, the two-shot, the bubbles).
//
// ═══════════════════════════════════════ HOW IT PLUGS IN ═══════════════════════════════════════
//   import { drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, TWO_SHOT,
//            PLANETS, planetSize, talkOpen } from '../../planetkit.js'
// Everything is a pure function of t (any frame, any order). Nothing touches `document` at module top level (the
// sound build imports this in node). Draw on your own canvas (layerCanvas from sky.js) inside your build's update(t).
// Pair it with hookkit.js (slamTitle for the call-out line, whipZoom, loopBack…).
//
// ═══════════════════════════════════════ THE CAST ═══════════════════════════════════════
// PLANETS[id] = { id, name, tag, glyph, color, rim, scale, pitch, rules, voice }    ids (PLANET_IDS, in order):
//   'sun'      THE SUN   warm, loud, main character, pep talks. Gold-orange, spinning wavy rays, big grin. opts.shades
//   'moon'     THE MOON  soft, moody, remembers every feeling, a hush. Silver, craters, long lashes, small mouth.
//   'mercury'  MERCURY   fast talker, texts in bursts, overthinker's coach. Small grey, flapping wings, sweat drop.
//   'venus'    VENUS     glamorous romantic. Pink-cream cloud swirls, lashes, lipstick, beauty mark, sparkle.
//   'mars'     MARS      bold, impatient, "just ask them out". Red, white polar cap, sweatband, determined brows.
//   'jupiter'  JUPITER   big generous uncle. Biggest; cloud bands, the Great Red Spot, a bushy moustache.
//   'saturn'   SATURN    strict but secretly sweet. Rings (back + front), square glasses, neat brows.
//   'uranus'   URANUS    chaotic genius. Cyan, rings on its side (it is tilted), lightning-bolt hair spikes.
//   'neptune'  NEPTUNE   dreamy poet, romance-movie fan. Deep blue waves, dark spot, dreamy eyes. opts.roseGlasses
//   'pluto'    PLUTO     deep, intense, small and proud of it. Tiny, the light heart-shaped plain, intense eyes,
//                        opts.badge = true → a 'STILL COUNTS' pin.
//   scale = default size relative to the Sun (pluto 0.42 … jupiter 1.15): planetSize(id, base = 520) → px diameter.
//   pitch = the voice (Hz) used by speechCues / planetTalkCues. rules = modern rulerships (series.json `home`).
//   Astronomy on the sprites is true: Saturn's rings, Uranus's sideways tilt, Jupiter's Great Red Spot, Pluto's
//   heart-shaped plain, Mars's polar cap, the Moon's craters. Don't add claims the kit can't back.
//
// drawPlanet(ctx, id, x, y, size, t, opts) → { x, y, r, top, mouth: { x, y } }      size = diameter in px
//   opts (all optional):
//     mood    'neutral' | 'happy' (^ ^) | 'wide' (shocked) | 'sly' (half lids, smirk) | 'sad' | 'angry' | 'love'
//             (heart eyes) | 'cry' (wobbly mouth + tears) | 'proud' (eyes shut, chin up) | 'sleepy'
//     look    [x, y] in −1…1 (pupils). Omit → slow idle glances per seed.
//     talk    0…1 mouth open (number), OR pass lines + speaker and the mouth flaps with the typing (talkOpen).
//     lines, speaker, cps   see talkOpen. speaker defaults to the planet id.
//     blink   undefined → auto blinks; false → never; 0…1 forced lid closure.
//     bob     idle float in px (default size·0.03).  rot  radians (adds to the idle sway).  squash  + wide / − tall
//     hops    [t…] little talk-hops.   alpha 0…1.   pop 0…1 scale.   glow 0…2 (default 1).   seed (int).
//     tears   0…3 (1 sniffle, 2 streams, 3 fountains).   blush 0…1.   sweat true/false.
//     shades (sun), roseGlasses (neptune), badge (pluto), rings (saturn/uranus, default true).
//
// drawSign(ctx, sign, x, y, size, t, opts) → drawStarChar result     a sign's Star Talk star (startalk.js) + extras:
//   opts = every drawStarChar opt (mood, look, hops, squash, pop, alpha, seed…) plus tears 0…3 (Pisces cries in every
//   film: tears: 2 or 3), glyph (default: the sign's glyph; false = none), sweat, shadow (true = floor shadow).
//
// talkOpen(t, lines, speaker, { cps = 28 }) → 0…1   mouth flap for `speaker` while its lines type (lines in the
//   dialogueBox / speech format: [{ t, speaker | who, text }]).
//
// drawSpace(ctx, t, { planet = 'sun', tint, stars = 1, horizon = null, glow = 1, seed = 1, dx = 0, dy = 0 })
//   The backdrop: deep night gradient tinted by the planet's colour, twinkling pixel stars, a soft nebula wash.
//   horizon = { y = 1560, color = '#2a1d4a', rim = planet colour } → a curved ground/horizon the planet looms over.
//
// TWO_SHOT (the sign-meets-planet layout, 1080×1920):
//   TWO_SHOT.stack   planet big up top { x: 540, y: 700 }, sign below { x: 540, y: 1330, size: 300 }, bubbles between
//   TWO_SHOT.side    planet left { x: 330, y: 900 }, sign right { x: 800, y: 1180, size: 280 }
//   TWO_SHOT.loom    planet huge behind the horizon { x: 540, y: 1250 } (size ≈ 1300), sign tiny in front
//                    { x: 540, y: 1500, size: 240 }, horizon y 1560
//   each: { planet: { x, y, size }, sign: { x, y, size }, bubble: { planet: { x, y, tail }, sign: { x, y, tail } } }
//   twoShot(name, id) → the same with planet.size scaled by that planet's scale.
//
// speech(ctx, t, { t0, t1, x, y, who, text, tail = 0, size = 46, maxW = 640, cps = 32, tag = true, shake = 0,
//                  color })
//   A chunky comic bubble with a name tag (who = a planet id, a sign id, or any label), typewriter text, *accent* in
//   the speaker's colour, a pop in at t0 and out at t1. tail = x offset of the pointer (− left, + right); tailUp =
//   true puts the pointer on top. Returns { w, h } (0 when hidden).
// speechCues(list, { cps = 32 }) → chiptune voice blips for a list of speech() opts, pitched per speaker (PITCH).
// planetTalkCues(lines, opts) → talkCues (startalk.js) with every planet's and sign's pitch filled in, for dialogueBox.
// PITCH[who] → Hz.   colorOf(who) → hex.   labelOf(who) → 'THE SUN' / '♌ LEO'.
//
// ── THE ENTRANCE HOOK (frame 0: the planet arriving in a crazy way and calling the sign out) ──────────────────────
// entrance(kind, t, { at = 0, len, x = 540, y = 700, size = 520 }) → pose { x, y, size, rot, squash, alpha, blur,
//   land }   pass the pose into drawPlanet(ctx, id, pose.x, pose.y, pose.size, t, { rot: pose.rot,
//   squash: pose.squash, alpha: pose.alpha }). land = the time it lands. Negative / small `at` puts frame 0 mid-entrance.
//   kinds:
//     'crash'   falls from the sky, slams down, squash + bounce (frame 0 mid-fall: at ≈ 0.25)
//     'rise'    LOOMS up over the horizon, slow then a final surge (use with drawSpace horizon / TWO_SHOT.loom)
//     'zoom'    rockets at the camera from a dot to way too close, then pulls back (punch)
//     'spin'    spirals in from off-screen, spinning, then skids to a stop
//     'slide'   slides in sideways at speed, tilts back and wobbles
//     'burst'   bursts out of a white flash, way too big, springs to size
//     'drop'    lowers on a slow dramatic dolly from the top, then a hard stop (good for Saturn / Pluto)
// drawEntranceFx(ctx, id, kind, t, { at, len, x, y, size }) → speed lines, motion ghosts, the landing shockwave ring,
//   dust and sparks in the planet's colours. Call it BEFORE drawPlanet (it draws behind).
// entranceCues(kind, { at, len }) → whoosh / boom / riser / crash cues to spread into CUES.
// entranceLand(kind, { at, len }) → the landing time (for your own beats).
//
// ── COPY-PASTE EXAMPLE (frame-0 hook) ───────────────────────────────────────────────────────────────────────────────
//   const IN = { at: -0.3, x: 540, y: 700, size: planetSize('pluto', 560) }
//   const HOOK = { at: -1, text: 'SCORPIO. | We need to *talk.*', top: 200 }          // hookkit slamTitle
//   update(t) { drawSpace(x, t, { planet: 'pluto', horizon: { y: 1560 } })
//               drawEntranceFx(x, 'pluto', 'rise', t, IN)
//               const P = entrance('rise', t, IN)
//               drawPlanet(x, 'pluto', P.x, P.y, P.size, t, { rot: P.rot, squash: P.squash, mood: 'sly', lines: LINES })
//               drawSign(x, 'scorpio', 540, 1330, 300, t, { mood: 'wide' }) }
//   CUES = [...entranceCues('rise', IN), ...slamTitleCues(HOOK), ...speechCues(BUBBLES)]
// ═══════════════════════════════════════════════════════════════════════════════════════════════════
import { clamp, lerp, prog, ease, hexToRgb } from '../src/lib.js'
import { drawStarChar, signStar, lineTimes, talkCues } from './startalk.js'
import { SIGNS, easeOutBack } from './wheel.js'
import { drawPixelStar } from './sky.js'
import { starFrame, inSprite, tearsCells } from './sxmail1/scenes/mail.js'

const TAU = Math.PI * 2
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
const SERIF = "'EB Garamond', Georgia, serif"
const MONO = "'Space Mono', ui-monospace, monospace"

// ─────────────────────────────────────────────── colour helpers
const toHex = (r, g, b) => '#' + [r, g, b].map(v => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('')
const mixHex = (a, b, k) => { const A = hexToRgb(a), B = hexToRgb(b); return toHex(...A.map((v, i) => lerp(v, B[i], k))) }
const rgba = (hex, a) => { const [r, g, b] = hexToRgb(hex); return `rgba(${r},${g},${b},${clamp(a)})` }
const hash = s => { let h = 7; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h }
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }

// ─────────────────────────────────────────────── the cast
export const PLANETS = {
  sun:     { id: 'sun',     name: 'THE SUN', tag: '☉ THE SUN', glyph: '☉', color: '#ffb431', rim: '#ff7a1a', scale: 1.0,  pitch: 523.25, rules: ['leo'], voice: 'warm, loud, main character, gives everyone a pep talk' },
  moon:    { id: 'moon',    name: 'THE MOON', tag: '☽ THE MOON', glyph: '☽', color: '#dfe2f2', rim: '#9aa3d6', scale: 0.72, pitch: 698.46, rules: ['cancer'], voice: 'soft, moody, remembers every feeling, speaks in a hush' },
  mercury: { id: 'mercury', name: 'MERCURY', tag: '☿ MERCURY', glyph: '☿', color: '#b8aba3', rim: '#7d6f7a', scale: 0.55, pitch: 880, rules: ['gemini', 'virgo'], voice: 'fast talker, texts in bursts, the overthinker’s coach' },
  venus:   { id: 'venus',   name: 'VENUS', tag: '♀ VENUS', glyph: '♀', color: '#f7c6a8', rim: '#ec8fb0', scale: 0.82, pitch: 659.25, rules: ['taurus', 'libra'], voice: 'glamorous romantic, love languages and self-worth' },
  mars:    { id: 'mars',    name: 'MARS', tag: '♂ MARS', glyph: '♂', color: '#e5573b', rim: '#a52a2a', scale: 0.66, pitch: 392, rules: ['aries'], voice: 'bold, impatient, "just ask them out" energy, means well' },
  jupiter: { id: 'jupiter', name: 'JUPITER', tag: '♃ JUPITER', glyph: '♃', color: '#e3b27c', rim: '#b4693f', scale: 1.15, pitch: 293.66, rules: ['sagittarius'], voice: 'big generous uncle energy, everything is an adventure' },
  saturn:  { id: 'saturn',  name: 'SATURN', tag: '♄ SATURN', glyph: '♄', color: '#ecd393', rim: '#b8935a', scale: 0.8,  pitch: 329.63, rules: ['capricorn'], voice: 'strict but secretly sweet, boundaries and commitment' },
  uranus:  { id: 'uranus',  name: 'URANUS', tag: '♅ URANUS', glyph: '♅', color: '#8fe6e8', rim: '#3fb3c4', scale: 0.78, pitch: 783.99, rules: ['aquarius'], voice: 'chaotic genius, "what if you did the unexpected"' },
  neptune: { id: 'neptune', name: 'NEPTUNE', tag: '♆ NEPTUNE', glyph: '♆', color: '#4f7ff0', rim: '#2a3fb8', scale: 0.78, pitch: 587.33, rules: ['pisces'], voice: 'dreamy, poetic, romance-movie fan, warns about rose-tinted glasses' },
  pluto:   { id: 'pluto',   name: 'PLUTO', tag: '♇ PLUTO', glyph: '♇', color: '#b89b8a', rim: '#6e5266', scale: 0.42, pitch: 246.94, rules: ['scorpio'], voice: 'deep, intense, transformation and letting go; small and proud of it' },
}
export const PLANET_IDS = Object.keys(PLANETS)
export const planetSize = (id, base = 520) => Math.round(base * (PLANETS[id]?.scale ?? 1))

const SIGN_IDS = SIGNS.map(s => s.id)
const SIGN_PITCH = { aries: 622.25, taurus: 466.16, gemini: 830.61, cancer: 554.37, leo: 493.88, virgo: 739.99, libra: 698.46, scorpio: 415.3, sagittarius: 659.25, capricorn: 440, aquarius: 932.33, pisces: 783.99 }
export const PITCH = Object.fromEntries([...PLANET_IDS.map(id => [id, PLANETS[id].pitch]), ...SIGN_IDS.map(id => [id, SIGN_PITCH[id] || 600])])
const isSign = w => SIGN_IDS.includes(w)
export const colorOf = who => PLANETS[who]?.color || (isSign(who) ? signStar(who).color : GOLD)
export const labelOf = who => PLANETS[who]?.tag || (isSign(who) ? `${signStar(who).glyph}︎ ${who.toUpperCase()}` : String(who).toUpperCase())
// lets talkCues key pitch by both the id and the printed label
for (const id of [...PLANET_IDS, ...SIGN_IDS]) PITCH[labelOf(id)] = PITCH[id]

// ─────────────────────────────────────────────── talk / blink / glance
const PARSE = text => [...String(text).replace(/\*/g, '')]
export function talkOpen(t, lines, speaker, { cps = 28 } = {}) {
  if (!lines || !lines.length) return 0
  const norm = lines.map(L => ({ ...L, speaker: L.speaker ?? L.who }))
  const times = lineTimes(norm, { cps })
  for (let n = 0; n < norm.length; n++) {
    const L = norm[n]
    if (L.speaker !== speaker && labelOf(speaker) !== L.speaker) continue
    const tm = times[n]
    if (t < tm.start || t > tm.done + 0.05) continue
    const cs = PARSE(L.text)
    let k = 0; while (k < tm.chars.length - 1 && tm.chars[k + 1] <= t) k++
    const ch = cs[k] || ' '
    if (/[\s.,!?…:;—]/.test(ch)) return 0.15
    return 0.35 + 0.65 * Math.abs(Math.sin((t - tm.start) * 17 + k * 0.7))
  }
  return 0
}
function autoBlink(t, seed) {
  const period = 2.6 + fr(seed, 3) * 1.8
  const ph = ((t + fr(seed, 5) * period) % period)
  return ph < 0.14 ? Math.sin((ph / 0.14) * Math.PI) : 0
}
function autoLook(t, seed) {
  const a = Math.floor(t / 1.7 + fr(seed, 9) * 3)
  const k = clamp(((t / 1.7 + fr(seed, 9) * 3) % 1) * 5)
  const p = [fr(a, seed) * 2 - 1, (fr(a, seed + 4) * 2 - 1) * 0.5], q = [fr(a - 1, seed) * 2 - 1, (fr(a - 1, seed + 4) * 2 - 1) * 0.5]
  return [lerp(q[0], p[0], ease.inOutQuad(k)) * 0.6, lerp(q[1], p[1], ease.inOutQuad(k)) * 0.6]
}
function hopLift(t, hops) {
  if (!hops) return { lift: 0, sq: 0 }
  let best = null
  for (const h of hops) if (t >= h && t - h < 0.5 && (best === null || h > best)) best = h
  if (best === null) return { lift: 0, sq: 0 }
  const d = t - best
  if (d < 0.18) { const p = d / 0.18; return { lift: Math.sin(p * Math.PI), sq: -0.07 * Math.sin(p * Math.PI) } }
  return { lift: 0, sq: 0.09 * Math.exp(-(d - 0.18) * 12) * Math.cos((d - 0.18) * 30) }
}

// ─────────────────────────────────────────────── shared face parts (unit space: planet radius = 1)
function drawEye(c, ex, ey, er, { look = [0, 0], lid = 0, mood = 'neutral', side = 1, lash = false, iris = INK, pupilK = 1, t = 0 }) {
  if (mood === 'happy' || mood === 'proud') {
    c.strokeStyle = INK; c.lineWidth = er * 0.42; c.lineCap = 'round'
    c.beginPath(); c.arc(ex, ey + er * 0.35, er * 0.85, Math.PI * 1.15, Math.PI * 1.85); c.stroke()
    if (lash) { c.beginPath(); c.moveTo(ex + side * er * 0.75, ey - er * 0.05); c.lineTo(ex + side * er * 1.15, ey - er * 0.45); c.stroke() }
    return
  }
  if (mood === 'sleepy') { lid = Math.max(lid, 0.62) }
  if (mood === 'sly') { lid = Math.max(lid, 0.5) }
  const wide = mood === 'wide' ? 1.22 : 1
  const rx = er * wide, ry = er * 1.15 * wide
  // white
  c.fillStyle = INK; c.beginPath(); c.ellipse(ex, ey, rx + er * 0.16, ry + er * 0.16, 0, 0, TAU); c.fill()
  c.fillStyle = '#fffdf6'; c.beginPath(); c.ellipse(ex, ey, rx, ry, 0, 0, TAU); c.fill()
  c.save(); c.beginPath(); c.ellipse(ex, ey, rx, ry, 0, 0, TAU); c.clip()
  const px = ex + look[0] * rx * 0.42, py = ey + look[1] * ry * 0.4
  if (mood === 'love') {
    const hb = 1 + 0.12 * Math.sin(t * 9)
    heartPath(c, px, py + er * 0.05, er * 0.95 * hb); c.fillStyle = '#ff3d6e'; c.fill()
    c.fillStyle = '#fff'; c.beginPath(); c.arc(px - er * 0.3, py - er * 0.2, er * 0.16, 0, TAU); c.fill()
  } else {
    const pr = er * (mood === 'wide' ? 0.42 : 0.62) * pupilK
    c.fillStyle = iris; c.beginPath(); c.arc(px, py, pr, 0, TAU); c.fill()
    c.fillStyle = '#fff'; c.beginPath(); c.arc(px - pr * 0.38, py - pr * 0.42, pr * 0.34, 0, TAU); c.fill()
    c.beginPath(); c.arc(px + pr * 0.35, py + pr * 0.3, pr * 0.14, 0, TAU); c.fill()
  }
  // lid
  if (lid > 0.01) {
    c.fillStyle = c.__skin || '#c9a'; c.fillRect(ex - rx - 2, ey - ry - 2, rx * 2 + 4, (ry * 2 + 4) * clamp(lid))
    c.strokeStyle = INK; c.lineWidth = er * 0.22
    c.beginPath(); c.moveTo(ex - rx, ey - ry + (ry * 2) * clamp(lid)); c.lineTo(ex + rx, ey - ry + (ry * 2) * clamp(lid)); c.stroke()
  }
  c.restore()
  if (lash) {
    c.strokeStyle = INK; c.lineWidth = er * 0.2; c.lineCap = 'round'
    const ly = ey - ry + ry * 2 * clamp(lid)
    for (let k = 0; k < 3; k++) {
      const a = -0.3 - k * 0.38
      const bx = ex + side * rx * (0.55 + 0.17 * k) * 0.9, by = ly + k * er * 0.06
      c.beginPath(); c.moveTo(bx, by); c.lineTo(bx + side * Math.cos(a) * er * 0.55, by + Math.sin(a) * er * 0.55 - er * 0.15); c.stroke()
    }
  }
}
function heartPath(c, x, y, r) {
  c.beginPath()
  c.moveTo(x, y + r * 0.85)
  c.bezierCurveTo(x - r * 1.25, y + r * 0.05, x - r * 0.7, y - r * 0.95, x, y - r * 0.32)
  c.bezierCurveTo(x + r * 0.7, y - r * 0.95, x + r * 1.25, y + r * 0.05, x, y + r * 0.85)
  c.closePath()
}
function drawBrows(c, ex, ey, er, mood, side, { thick = 0.32, lift = 0, color = INK } = {}) {
  let tilt = 0, dy = -er * 1.65 - lift * er
  if (mood === 'angry') { tilt = -0.42; dy += er * 0.25 }
  else if (mood === 'sad' || mood === 'cry') { tilt = 0.38 }
  else if (mood === 'wide') { dy -= er * 0.45 }
  else if (mood === 'sly') { tilt = side > 0 ? 0.25 : -0.2 }
  else if (mood === 'proud') { dy -= er * 0.3; tilt = -0.15 }
  c.save(); c.translate(ex, ey + dy); c.rotate(side * tilt)
  c.strokeStyle = color; c.lineWidth = er * thick; c.lineCap = 'round'
  c.beginPath(); c.moveTo(-er * 0.8, er * 0.08); c.quadraticCurveTo(0, -er * 0.22, er * 0.8, er * 0.08); c.stroke()
  c.restore()
}
/** the mouth: open 0…1 (talk), mood shape. (mx, my) centre, w half-width */
function drawMouth(c, mx, my, w, open, mood, { lip = null, tongue = '#ff6f8a', t = 0 } = {}) {
  c.lineCap = 'round'; c.lineJoin = 'round'
  const o = clamp(open)
  if (o > 0.08 || mood === 'wide' || mood === 'cry' && o > 0.02) {
    const h = w * (mood === 'wide' ? 0.9 : 0.25 + o * 0.85)
    const ww = mood === 'wide' ? w * 0.6 : w * (0.75 + 0.15 * o)
    c.fillStyle = '#3a0f2a'; c.strokeStyle = INK; c.lineWidth = w * 0.16
    c.beginPath()
    if (mood === 'cry') {   // wobbly
      c.moveTo(mx - ww, my)
      for (let k = 1; k <= 8; k++) c.lineTo(mx - ww + (2 * ww * k) / 8, my + Math.sin(k * 2.2 + t * 18) * w * 0.07)
      c.quadraticCurveTo(mx, my + h * 1.1, mx - ww, my)
    } else if (mood === 'wide') c.ellipse(mx, my + h * 0.3, ww, h * 0.6, 0, 0, TAU)
    else { c.moveTo(mx - ww, my - h * 0.05); c.quadraticCurveTo(mx, my + h * 0.1 - h * 0.2, mx + ww, my - h * 0.05); c.quadraticCurveTo(mx, my + h * 1.25, mx - ww, my - h * 0.05) }
    c.fill(); c.stroke()
    c.save(); c.clip()
    c.fillStyle = tongue; c.beginPath(); c.ellipse(mx, my + h * 0.85, ww * 0.55, h * 0.4, 0, 0, TAU); c.fill()
    if (mood !== 'wide' && mood !== 'cry') { c.fillStyle = '#fffdf6'; c.fillRect(mx - ww * 0.7, my - h * 0.3, ww * 1.4, h * 0.22) }
    c.restore()
    if (lip) { c.strokeStyle = lip; c.lineWidth = w * 0.13; c.stroke() }
    return
  }
  c.strokeStyle = lip || INK; c.lineWidth = w * (lip ? 0.2 : 0.16); c.beginPath()
  if (mood === 'sad' || mood === 'cry') { c.moveTo(mx - w * 0.6, my + w * 0.22); c.quadraticCurveTo(mx, my - w * 0.25, mx + w * 0.6, my + w * 0.22) }
  else if (mood === 'angry') { c.moveTo(mx - w * 0.55, my + w * 0.05); c.lineTo(mx + w * 0.55, my - w * 0.02) }
  else if (mood === 'sly') { c.moveTo(mx - w * 0.5, my + w * 0.02); c.quadraticCurveTo(mx + w * 0.2, my + w * 0.25, mx + w * 0.7, my - w * 0.22) }
  else if (mood === 'sleepy') { c.ellipse(mx, my + w * 0.05, w * 0.18, w * 0.14, 0, 0, TAU) }
  else { const k = mood === 'happy' || mood === 'love' || mood === 'proud' ? 0.55 : 0.32; c.moveTo(mx - w * 0.75, my - w * 0.08); c.quadraticCurveTo(mx, my + w * k * 1.6, mx + w * 0.75, my - w * 0.08) }
  c.stroke()
}
function drawTearsUnit(c, t, ex, ey, er, k) {
  if (k <= 0) return
  const n = k >= 3 ? 7 : k >= 2 ? 4 : 2, rate = k >= 3 ? 1.8 : k >= 2 ? 1.1 : 0.7
  for (const d of [-1, 1]) {
    for (let q = 0; q < n; q++) {
      const ph = ((t * rate + q / n + (d > 0 ? 0.37 : 0)) % 1 + 1) % 1
      if (k < 2 && ph > 0.7) continue
      const x0 = d * ex, spread = k >= 3 ? 0.9 : k >= 2 ? 0.18 : 0.05
      const px = x0 + d * spread * ph, py = ey + er * 0.9 + (k >= 3 ? -0.35 * ph + 1.4 * ph * ph : 0.9 * ph * ph)
      c.fillStyle = INK; c.beginPath(); c.ellipse(px, py, er * 0.3, er * 0.42, 0, 0, TAU); c.fill()
      c.fillStyle = '#8fe3ff'; c.beginPath(); c.ellipse(px, py, er * 0.21, er * 0.31, 0, 0, TAU); c.fill()
      c.fillStyle = '#fff'; c.beginPath(); c.arc(px - er * 0.06, py - er * 0.1, er * 0.07, 0, TAU); c.fill()
    }
  }
}

// ─────────────────────────────────────────────── per-planet bodies (unit circle, centre 0,0, radius 1)
function ball(c, base, light, dark) {
  const g = c.createRadialGradient(-0.38, -0.42, 0.05, 0, 0, 1.05)
  g.addColorStop(0, light); g.addColorStop(0.55, base); g.addColorStop(1, dark)
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.fill()
}
function outline(c, w = 0.045) { c.strokeStyle = INK; c.lineWidth = w; c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.stroke() }
function rimLight(c, col) { c.save(); c.globalCompositeOperation = 'source-atop'; c.strokeStyle = rgba(col, 0.5); c.lineWidth = 0.12; c.beginPath(); c.arc(0.03, 0.03, 0.96, -0.2, 1.9); c.stroke(); c.restore() }
function craters(c, list, col) {
  for (const [x, y, r] of list) {
    c.fillStyle = col; c.beginPath(); c.ellipse(x, y, r, r * 0.86, 0, 0, TAU); c.fill()
    c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = r * 0.25; c.beginPath(); c.arc(x, y, r * 0.9, 0.2, 1.9); c.stroke()
  }
}
function glowCircle(ctx, x, y, r, col, a) {
  if (a <= 0) return
  const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
  g.addColorStop(0, rgba(col, 0.55 * a)); g.addColorStop(0.5, rgba(col, 0.18 * a)); g.addColorStop(1, rgba(col, 0))
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill()
}
function ringBand(c, half, tilt, col1, col2, { rx = 1.85, ry = 0.42, w = 0.34 } = {}) {
  // half: 'back' (upper arc, behind the ball) or 'front' (lower arc, over the ball)
  c.save(); c.rotate(tilt)
  const a0 = half === 'back' ? Math.PI : 0, a1 = half === 'back' ? TAU : Math.PI
  for (let k = 0; k < 3; k++) {
    const s = 1 - k * (w / 3) / rx
    c.strokeStyle = k === 1 ? col2 : col1; c.lineWidth = (w / 3) * 0.95
    c.beginPath(); c.ellipse(0, 0, rx * s, ry * s, 0, a0, a1); c.stroke()
  }
  c.strokeStyle = INK; c.lineWidth = 0.03
  c.beginPath(); c.ellipse(0, 0, rx + 0.02, ry + 0.02, 0, a0, a1); c.stroke()
  c.beginPath(); c.ellipse(0, 0, rx - w - 0.01, (ry) * (1 - w / rx) - 0.01, 0, a0, a1); c.stroke()
  c.restore()
}

const BODY = {
  sun(c, t, o) {
    // rays: wavy, spinning, pulsing (drawn behind the ball)
    const n = 14, spin = t * 0.35
    for (let k = 0; k < n; k++) {
      const a = spin + (k / n) * TAU, L = 1.32 + 0.1 * Math.sin(t * 5 + k * 1.7) + (k % 2 ? 0 : 0.1)
      c.save(); c.rotate(a)
      c.fillStyle = k % 2 ? '#ffd45a' : '#ff9a2a'; c.strokeStyle = INK; c.lineWidth = 0.04
      c.beginPath(); c.moveTo(0.82, -0.17); c.quadraticCurveTo(1.05, -0.12 + 0.08 * Math.sin(t * 7 + k), L, 0); c.quadraticCurveTo(1.05, 0.12 + 0.08 * Math.sin(t * 7 + k), 0.82, 0.17); c.closePath(); c.fill(); c.stroke()
      c.restore()
    }
    ball(c, '#ffb431', '#fff1a8', '#f06a12')
    // surface swirls
    c.strokeStyle = 'rgba(255,240,170,0.4)'; c.lineWidth = 0.045; c.lineCap = 'round'
    for (let k = 0; k < 5; k++) { const a = t * 0.25 + k * 1.26; c.beginPath(); c.arc(0, 0, 0.84, a, a + 0.55); c.stroke() }
    outline(c)
    c.__skin = '#ffb431'
  },
  moon(c, t) {
    ball(c, '#dfe2f2', '#ffffff', '#8e95bf')
    craters(c, [[-0.55, -0.45, 0.14], [0.5, -0.55, 0.1], [0.62, 0.42, 0.16], [-0.62, 0.48, 0.09], [0.08, -0.82, 0.07], [-0.2, 0.78, 0.1]], 'rgba(120,128,180,0.45)')
    // soft night shadow on the right (a gentle crescent shade)
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip(); c.fillStyle = 'rgba(60,64,130,0.18)'; c.beginPath(); c.arc(0.55, 0.1, 0.95, 0, TAU); c.fill(); c.restore()
    outline(c)
    c.__skin = '#d6daee'
  },
  mercury(c, t) {
    // wings (flap fast)
    for (const s of [-1, 1]) {
      const f = Math.sin(t * 22) * 0.35
      c.save(); c.translate(s * 0.88, -0.25); c.scale(s, 1); c.rotate(-0.35 + f)
      c.fillStyle = '#fffdf6'; c.strokeStyle = INK; c.lineWidth = 0.05
      c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(0.35, -0.55, 0.85, -0.5); c.quadraticCurveTo(0.6, -0.32, 0.72, -0.22); c.quadraticCurveTo(0.45, -0.12, 0.55, 0.02); c.quadraticCurveTo(0.3, 0.05, 0, 0.12); c.closePath(); c.fill(); c.stroke()
      c.restore()
    }
    ball(c, '#b8aba3', '#ece2da', '#6f6070')
    craters(c, [[-0.5, -0.5, 0.12], [0.55, -0.35, 0.09], [0.5, 0.55, 0.13], [-0.65, 0.35, 0.08]], 'rgba(90,70,90,0.35)')
    outline(c)
    c.__skin = '#b8aba3'
  },
  venus(c, t) {
    ball(c, '#f7c6a8', '#fff3e4', '#d97f8e')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    c.strokeStyle = 'rgba(255,240,225,0.6)'; c.lineWidth = 0.07; c.lineCap = 'round'
    for (let k = 0; k < 4; k++) { const y = -0.7 + k * 0.45, d = Math.sin(t * 0.8 + k) * 0.15; c.beginPath(); c.moveTo(-1, y + d); c.bezierCurveTo(-0.4, y - 0.18 + d, 0.3, y + 0.2 + d, 1, y - 0.05 + d); c.stroke() }
    c.restore()
    outline(c)
    c.__skin = '#f5c2a6'
  },
  mars(c, t) {
    ball(c, '#e5573b', '#ffa47a', '#8e1f22')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    c.fillStyle = 'rgba(120,30,30,0.35)'; for (const [x, y, r] of [[-0.5, 0.45, 0.22], [0.55, 0.3, 0.16], [0.1, 0.7, 0.12]]) { c.beginPath(); c.ellipse(x, y, r, r * 0.6, 0.3, 0, TAU); c.fill() }
    c.fillStyle = '#fff6ee'; c.beginPath(); c.ellipse(0, -1.02, 0.55, 0.26, 0, 0, TAU); c.fill()   // polar cap
    c.restore()
    outline(c)
    c.__skin = '#e5573b'
  },
  jupiter(c, t) {
    ball(c, '#e3b27c', '#fff0d2', '#9d5a3a')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    const bands = [[-0.78, 0.1, '#c98a5a'], [-0.5, 0.12, '#f4dcb6'], [-0.26, 0.09, '#b7774e'], [0.36, 0.13, '#b97a50'], [0.62, 0.1, '#f2d6ad'], [0.84, 0.12, '#c48858']]
    for (const [y, h, col] of bands) { c.fillStyle = col; c.beginPath(); c.moveTo(-1, y - h); for (let k = 0; k <= 10; k++) c.lineTo(-1 + k * 0.2, y - h + 0.03 * Math.sin(k * 1.4 + t * 1.2 + y * 7)); c.lineTo(1, y + h); c.lineTo(-1, y + h); c.fill() }
    // the Great Red Spot (lower right)
    c.fillStyle = '#c4452e'; c.strokeStyle = '#7a2418'; c.lineWidth = 0.035
    c.beginPath(); c.ellipse(0.45, 0.52, 0.2, 0.12, -0.08, 0, TAU); c.fill(); c.stroke()
    c.strokeStyle = 'rgba(255,200,170,0.5)'; c.beginPath(); c.ellipse(0.45, 0.52, 0.11, 0.06, -0.08, 0.5, 3.6); c.stroke()
    c.restore()
    outline(c)
    c.__skin = '#e3b27c'
  },
  saturn(c, t, o) {
    if (o.rings !== false) ringBand(c, 'back', -0.32, '#e2c27e', '#f6e2b0')
    ball(c, '#ecd393', '#fff7dc', '#b08a52')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    for (const [y, col] of [[-0.6, 'rgba(190,150,90,0.35)'], [0.55, 'rgba(190,150,90,0.35)'], [0.8, 'rgba(170,130,80,0.35)']]) { c.fillStyle = col; c.fillRect(-1, y - 0.07, 2, 0.14) }
    c.restore()
    outline(c)
    c.__skin = '#ecd393'
  },
  uranus(c, t, o) {
    if (o.rings !== false) ringBand(c, 'back', 1.45, '#bff3f5', '#6fd0dc', { rx: 1.6, ry: 0.3, w: 0.18 })
    ball(c, '#8fe6e8', '#e8ffff', '#3f9fb8')
    outline(c)
    c.__skin = '#8fe6e8'
  },
  neptune(c, t) {
    ball(c, '#4f7ff0', '#a9c8ff', '#1c2c8e')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    c.strokeStyle = 'rgba(190,220,255,0.45)'; c.lineWidth = 0.06; c.lineCap = 'round'
    for (let k = 0; k < 4; k++) { const y = -0.75 + k * 0.5; c.beginPath(); for (let i = 0; i <= 12; i++) { const x = -1 + i / 6; c[i ? 'lineTo' : 'moveTo'](x, y + 0.06 * Math.sin(i * 1.4 + t * 2.2 + k)) } c.stroke() }
    c.fillStyle = 'rgba(16,24,90,0.55)'; c.beginPath(); c.ellipse(-0.5, 0.55, 0.16, 0.09, 0.2, 0, TAU); c.fill()   // dark spot
    c.restore()
    outline(c)
    c.__skin = '#4f7ff0'
  },
  pluto(c, t) {
    ball(c, '#b89b8a', '#efdccc', '#5e4558')
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    c.fillStyle = 'rgba(255,240,228,0.85)'; heartPath(c, 0.42, 0.42, 0.42); c.fill()      // the heart-shaped plain
    c.fillStyle = 'rgba(80,40,60,0.35)'; c.beginPath(); c.ellipse(-0.6, 0.35, 0.3, 0.2, 0.4, 0, TAU); c.fill()
    c.restore()
    outline(c)
    c.__skin = '#b89b8a'
  },
}
// planet-specific face layout: eye spacing/size, mouth y/width, extras
const FACE = {
  sun:     { ex: 0.34, ey: -0.12, er: 0.15, my: 0.36, mw: 0.42, brow: 0.3, lash: false },
  moon:    { ex: 0.32, ey: -0.08, er: 0.13, my: 0.36, mw: 0.22, brow: 0.22, lash: true, iris: '#3b3f7a' },
  mercury: { ex: 0.33, ey: -0.1,  er: 0.17, my: 0.4,  mw: 0.3, brow: 0.32, lash: false },
  venus:   { ex: 0.33, ey: -0.1,  er: 0.15, my: 0.38, mw: 0.3, brow: 0.22, lash: true, lip: '#e03a6a', iris: '#6b2a5a' },
  mars:    { ex: 0.33, ey: -0.04, er: 0.14, my: 0.4,  mw: 0.36, brow: 0.42, lash: false },
  jupiter: { ex: 0.32, ey: -0.2,  er: 0.12, my: 0.32, mw: 0.36, brow: 0.36, lash: false },
  saturn:  { ex: 0.32, ey: -0.12, er: 0.13, my: 0.38, mw: 0.28, brow: 0.3, lash: false },
  uranus:  { ex: 0.33, ey: -0.1,  er: 0.16, my: 0.4,  mw: 0.34, brow: 0.3, lash: false },
  neptune: { ex: 0.33, ey: -0.1,  er: 0.15, my: 0.38, mw: 0.28, brow: 0.22, lash: true, iris: '#1d2a70' },
  pluto:   { ex: 0.34, ey: -0.08, er: 0.17, my: 0.42, mw: 0.28, brow: 0.42, lash: false, iris: '#3a1030' },
}

function extrasOverFace(c, id, t, o, F, mood) {
  if (id === 'sun' && o.shades) {
    const y = F.ey
    c.fillStyle = '#140a2a'; c.strokeStyle = INK; c.lineWidth = 0.04
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * F.ex - 0.24, y - 0.12); c.lineTo(s * F.ex + 0.24, y - 0.12); c.quadraticCurveTo(s * F.ex + 0.22, y + 0.2, s * F.ex, y + 0.2); c.quadraticCurveTo(s * F.ex - 0.22, y + 0.2, s * F.ex - 0.24, y - 0.12); c.fill(); c.stroke() }
    c.beginPath(); c.moveTo(-F.ex + 0.24, y - 0.08); c.lineTo(F.ex - 0.24, y - 0.08); c.stroke()
    c.strokeStyle = 'rgba(255,255,255,0.7)'; c.lineWidth = 0.035
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(s * F.ex - 0.15, y - 0.05); c.lineTo(s * F.ex - 0.05, y + 0.08); c.stroke() }
  }
  if (id === 'mercury' && o.sweat !== false) {
    const ph = (t * 0.9) % 1
    c.fillStyle = '#8fe3ff'; c.strokeStyle = INK; c.lineWidth = 0.03
    c.beginPath(); c.ellipse(0.72, -0.55 + ph * 0.25, 0.07, 0.1, 0, 0, TAU); c.fill(); c.stroke()
  }
  if (id === 'venus') {
    c.fillStyle = '#5a2340'; c.beginPath(); c.arc(0.28, 0.28, 0.035, 0, TAU); c.fill()        // beauty mark
    const sp = (t * 0.7) % 1; c.save(); c.globalAlpha *= Math.sin(sp * Math.PI)
    c.fillStyle = '#fff'; const sx = -0.62, sy = -0.62, r = 0.12 * Math.sin(sp * Math.PI)
    c.beginPath(); c.moveTo(sx, sy - r); c.lineTo(sx + r * 0.25, sy - r * 0.25); c.lineTo(sx + r, sy); c.lineTo(sx + r * 0.25, sy + r * 0.25); c.lineTo(sx, sy + r); c.lineTo(sx - r * 0.25, sy + r * 0.25); c.lineTo(sx - r, sy); c.lineTo(sx - r * 0.25, sy - r * 0.25); c.fill()
    c.restore()
  }
  if (id === 'mars') {   // sweatband
    c.save(); c.beginPath(); c.arc(0, 0, 1, 0, TAU); c.clip()
    c.fillStyle = '#fffdf6'; c.fillRect(-1, -0.66, 2, 0.17); c.fillStyle = '#ff3d6e'; c.fillRect(-1, -0.6, 2, 0.05)
    c.restore()
    c.save(); c.translate(0.98, -0.58); c.rotate(0.3 + 0.15 * Math.sin(t * 6))
    c.fillStyle = '#fffdf6'; c.strokeStyle = INK; c.lineWidth = 0.03; c.beginPath(); c.moveTo(0, -0.06); c.lineTo(0.32, -0.12); c.lineTo(0.28, 0.02); c.lineTo(0, 0.08); c.fill(); c.stroke()
    c.restore()
  }
  if (id === 'jupiter') {   // bushy moustache
    const my = F.my - 0.12
    c.fillStyle = '#7a4a2e'; c.strokeStyle = INK; c.lineWidth = 0.035
    for (const s of [-1, 1]) { c.beginPath(); c.moveTo(0, my); c.quadraticCurveTo(s * 0.18, my - 0.12, s * 0.38, my - 0.02); c.quadraticCurveTo(s * 0.5, my + 0.04, s * 0.44, my + 0.13 + 0.02 * Math.sin(t * 3)); c.quadraticCurveTo(s * 0.28, my + 0.08, 0, my + 0.07); c.closePath(); c.fill(); c.stroke() }
  }
  if (id === 'saturn') {   // square glasses
    c.strokeStyle = INK; c.lineWidth = 0.05; c.fillStyle = 'rgba(255,255,255,0.12)'
    for (const s of [-1, 1]) { c.beginPath(); c.rect(s * F.ex - 0.21, F.ey - 0.19, 0.42, 0.36); c.fill(); c.stroke() }
    c.beginPath(); c.moveTo(-F.ex + 0.21, F.ey - 0.05); c.lineTo(F.ex - 0.21, F.ey - 0.05); c.stroke()
  }
  if (id === 'uranus') {   // lightning hair spikes on top
    c.fillStyle = '#e8ffff'; c.strokeStyle = INK; c.lineWidth = 0.04
    for (let k = -2; k <= 2; k++) {
      const a = -Math.PI / 2 + k * 0.32, wob = 0.08 * Math.sin(t * 9 + k * 2)
      const bx = Math.cos(a) * 0.92, by = Math.sin(a) * 0.92
      c.save(); c.translate(bx, by); c.rotate(a + Math.PI / 2 + wob)
      c.beginPath(); c.moveTo(-0.1, 0.05); c.lineTo(-0.02, -0.22); c.lineTo(-0.1, -0.22); c.lineTo(0.04, -0.46 - 0.04 * (k % 2)); c.lineTo(0.0, -0.26); c.lineTo(0.09, -0.26); c.lineTo(0.1, 0.05); c.closePath(); c.fill(); c.stroke()
      c.restore()
    }
  }
  if (id === 'neptune' && o.roseGlasses) {
    c.strokeStyle = '#ff6fa0'; c.lineWidth = 0.05
    for (const s of [-1, 1]) { heartPath(c, s * F.ex, F.ey, 0.24); c.fillStyle = 'rgba(255,120,170,0.38)'; c.fill(); c.stroke() }
    c.beginPath(); c.moveTo(-F.ex + 0.2, F.ey - 0.06); c.lineTo(F.ex - 0.2, F.ey - 0.06); c.stroke()
  }
  if (id === 'pluto' && o.badge) {
    c.save(); c.translate(-0.55, 0.62); c.rotate(-0.18)
    c.fillStyle = GOLD; c.strokeStyle = INK; c.lineWidth = 0.05; c.beginPath(); c.arc(0, 0, 0.3, 0, TAU); c.fill(); c.stroke()
    c.fillStyle = INK; c.scale(0.01, 0.01); c.font = `800 11px ${INTER}`; c.textAlign = 'center'; c.textBaseline = 'middle'
    c.fillText('STILL', 0, -6); c.fillText('COUNTS', 0, 7)
    c.restore()
  }
}

/** a planet character. size = diameter (px). See the header for opts. */
export function drawPlanet(ctx, id, x, y, size, t, opts = {}) {
  const P = PLANETS[id]; if (!P) throw new Error('planetkit: unknown planet ' + id)
  const { mood = 'neutral', look, talk, lines, speaker = id, cps = 28, blink, bob, rot = 0, squash = 0, hops = null, alpha = 1, pop = 1, glow = 1, seed = hash(id) % 97, tears = 0, blush } = opts
  if (alpha <= 0 || pop <= 0 || size <= 0) return { x, y, r: 0, top: y, mouth: { x, y } }
  const r = (size / 2) * pop
  const F = FACE[id]
  const hs = hopLift(t, hops)
  const bobA = bob === undefined ? size * 0.03 : bob
  const cy = y + Math.sin(t * 1.9 + seed) * bobA - hs.lift * size * 0.08
  const sq = squash + hs.sq + 0.015 * Math.sin(t * 2.7 + seed)
  const sway = 0.04 * Math.sin(t * 1.3 + seed * 0.7) + (id === 'mercury' ? 0.03 * Math.sin(t * 9) : 0)
  const open = talk !== undefined ? talk : lines ? talkOpen(t, lines, speaker, { cps }) : 0
  const L = look || autoLook(t, seed)
  const lid = typeof blink === 'number' ? blink : blink === false ? 0 : autoBlink(t, seed)
  ctx.save()
  ctx.globalAlpha *= alpha
  glowCircle(ctx, x, cy, r * (id === 'sun' ? 2.1 : 1.55), P.color, glow * (id === 'sun' ? 1.1 : 0.55) * (0.9 + 0.1 * Math.sin(t * 2.3)))
  ctx.translate(x, cy + r); ctx.scale(1 + sq, 1 - sq * 0.9); ctx.translate(0, -r)
  ctx.rotate(rot + sway)
  ctx.scale(r, r)
  BODY[id](ctx, t, opts)
  // face
  const ex = F.ex, ey = F.ey + (mood === 'proud' ? -0.05 : 0), er = F.er
  const lk = mood === 'proud' ? [0, -1] : L
  for (const s of [-1, 1]) drawEye(ctx, s * ex, ey, er, { look: lk, lid, mood, side: s, lash: F.lash, iris: F.iris || INK, t })
  for (const s of [-1, 1]) drawBrows(ctx, s * ex, ey, er, mood, s, { thick: F.brow })
  const bl = blush === undefined ? (['happy', 'love', 'proud', 'cry'].includes(mood) ? 0.7 : 0.25) : blush
  if (bl > 0) { ctx.fillStyle = rgba('#ff5c8e', 0.45 * bl); for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * (ex + 0.18), ey + er * 2.1, 0.12, 0.065, 0, 0, TAU); ctx.fill() } }
  drawMouth(ctx, 0, F.my, F.mw, open, mood, { lip: F.lip || null, t })
  extrasOverFace(ctx, id, t, opts, F, mood)
  const tk = tears || (mood === 'cry' ? 2 : 0)
  if (tk > 0) drawTearsUnit(ctx, t, ex, ey, er, tk)
  // rings that pass in FRONT of the ball
  if (id === 'saturn' && opts.rings !== false) ringBand(ctx, 'front', -0.32, '#e2c27e', '#f6e2b0')
  if (id === 'uranus' && opts.rings !== false) ringBand(ctx, 'front', 1.45, '#bff3f5', '#6fd0dc', { rx: 1.6, ry: 0.3, w: 0.18 })
  ctx.restore()
  return { x, y: cy, r, top: cy - r, mouth: { x, y: cy + F.my * r } }
}

// ─────────────────────────────────────────────── the sign (a Star Talk star) + tears
export function drawSign(ctx, sign, x, y, size, t, opts = {}) {
  const S = signStar(sign)
  const { tears = 0, glyph, sweat = false, shadow = false, ...rest } = opts
  if (shadow) { ctx.save(); ctx.fillStyle = 'rgba(6,4,18,0.35)'; ctx.beginPath(); ctx.ellipse(x, y + size * 0.5, size * 0.42, size * 0.07, 0, 0, TAU); ctx.fill(); ctx.restore() }
  const res = drawStarChar(ctx, x, y, size, t, { color: S.color, glyph: glyph === false ? null : glyph || (size >= 120 ? S.glyph : null), ...rest })
  if (tears > 0) {
    const F = starFrame(x, y, size, t, { pop: rest.pop ?? 1, bob: rest.bob, squash: rest.squash ?? 0, hops: rest.hops ?? null, seed: rest.seed ?? 1 })
    ctx.save(); ctx.globalAlpha *= rest.alpha ?? 1
    inSprite(ctx, F, () => tearsCells(ctx, t, Math.round(tears)))
    ctx.restore()
  }
  if (sweat) {
    const ph = (t * 0.8) % 1
    ctx.save(); ctx.fillStyle = '#8fe3ff'; ctx.strokeStyle = INK; ctx.lineWidth = 4
    ctx.beginPath(); ctx.ellipse(x + size * 0.3, y - size * 0.22 + ph * size * 0.12, size * 0.04, size * 0.06, 0, 0, TAU); ctx.fill(); ctx.stroke(); ctx.restore()
  }
  return res
}

// ─────────────────────────────────────────────── the backdrop
const STARS = Array.from({ length: 140 }, (_, i) => [fr(i, 1) * 1080, fr(i, 2) * 1920, fr(i, 3), 1 + Math.floor(fr(i, 4) * 3)])
export function drawSpace(ctx, t, { planet = 'sun', tint, stars = 1, horizon = null, glow = 1, seed = 1, dx = 0, dy = 0 } = {}) {
  const col = tint || PLANETS[planet]?.color || GOLD
  const g = ctx.createLinearGradient(0, 0, 0, 1920)
  g.addColorStop(0, '#07041a'); g.addColorStop(0.45, mixHex('#140a34', col, 0.12)); g.addColorStop(1, mixHex('#1e0f3e', col, 0.22))
  ctx.fillStyle = g; ctx.fillRect(0, 0, 1080, 1920)
  // nebula wash
  for (let k = 0; k < 3; k++) {
    const nx = 540 + Math.cos(seed * 2 + k * 2.1 + t * 0.05) * 380 + dx * 0.3, ny = 500 + k * 450 + Math.sin(seed + k + t * 0.07) * 120 + dy * 0.3
    glowCircle(ctx, nx, ny, 520, k === 1 ? '#7a4fd0' : col, 0.35 * glow)
  }
  if (stars > 0) {
    for (const [sx, sy, ph, sz] of STARS) {
      const a = (0.35 + 0.65 * Math.max(0, Math.sin(t * (0.8 + ph * 1.6) + ph * 20))) * stars
      ctx.globalAlpha = a
      const X = ((sx + dx * (0.2 + ph * 0.3)) % 1080 + 1080) % 1080, Y = ((sy + dy * (0.2 + ph * 0.3)) % 1920 + 1920) % 1920
      if (sz === 3 && a > 0.75) drawPixelStar(ctx, X, Y, 16, 1, '#fff6dc')
      else { ctx.fillStyle = ph > 0.7 ? '#ffe9b0' : '#efe6ff'; ctx.fillRect(Math.round(X), Math.round(Y), sz * 2, sz * 2) }
    }
    ctx.globalAlpha = 1
  }
  if (horizon) {
    const hy = horizon.y ?? 1560, hc = horizon.color || '#241743', rim = horizon.rim || col
    ctx.save()
    ctx.fillStyle = hc; ctx.beginPath(); ctx.moveTo(-20, 1940); ctx.lineTo(-20, hy + 60); ctx.quadraticCurveTo(540, hy - 70, 1100, hy + 60); ctx.lineTo(1100, 1940); ctx.closePath(); ctx.fill()
    ctx.strokeStyle = rgba(rim, 0.85); ctx.lineWidth = 6; ctx.shadowColor = rim; ctx.shadowBlur = 30
    ctx.beginPath(); ctx.moveTo(-20, hy + 60); ctx.quadraticCurveTo(540, hy - 70, 1100, hy + 60); ctx.stroke()
    ctx.restore()
  }
}
/** clip helper: everything drawn inside fn is hidden below the horizon curve (for 'rise' entrances) */
export function aboveHorizon(ctx, hy, fn) {
  ctx.save(); ctx.beginPath(); ctx.moveTo(-20, -20); ctx.lineTo(1100, -20); ctx.lineTo(1100, hy + 60); ctx.quadraticCurveTo(540, hy - 70, -20, hy + 60); ctx.closePath(); ctx.clip()
  fn(); ctx.restore()
}

// ─────────────────────────────────────────────── the two-shot
export const TWO_SHOT = {
  stack: { planet: { x: 540, y: 700, size: 560 }, sign: { x: 540, y: 1340, size: 300 }, bubble: { planet: { x: 540, y: 1080, tail: 0, tailUp: true }, sign: { x: 600, y: 1640, tail: -60, tailUp: true } } },
  side:  { planet: { x: 330, y: 900, size: 480 }, sign: { x: 800, y: 1180, size: 280 }, bubble: { planet: { x: 420, y: 480, tail: -60 }, sign: { x: 720, y: 1500, tail: 60, tailUp: true } } },
  loom:  { planet: { x: 540, y: 1250, size: 1300 }, sign: { x: 540, y: 1500, size: 240 }, horizon: 1560, bubble: { planet: { x: 540, y: 420, tail: 0 }, sign: { x: 600, y: 1760, tail: -60, tailUp: true } } },
}
export function twoShot(name = 'stack', id = 'sun') {
  const L = TWO_SHOT[name]
  return { ...L, planet: { ...L.planet, size: Math.round(L.planet.size * (name === 'loom' ? 1 : PLANETS[id]?.scale ?? 1)) } }
}

// ─────────────────────────────────────────────── speech bubbles
function wrapWords(c, text, size, maxW) {
  // returns rows of [{ s, acc }] tokens
  const toks = []; let acc = false
  for (const seg of String(text).split('*')) { for (const w of seg.split(/(\s+)/)) if (w) toks.push({ s: w, acc }); acc = !acc }
  const rows = [[]]; let w = 0
  for (const tk of toks) {
    c.font = tk.acc ? `italic 600 ${Math.round(size * 1.12)}px ${SERIF}` : `800 ${size}px ${INTER}`
    const tw = c.measureText(tk.s).width
    if (/^\s+$/.test(tk.s)) { if (rows[rows.length - 1].length) { rows[rows.length - 1].push({ ...tk, w: tw }); w += tw } continue }
    if (w + tw > maxW && rows[rows.length - 1].length) { const r = rows[rows.length - 1]; while (r.length && /^\s+$/.test(r[r.length - 1].s)) r.pop(); rows.push([]); w = 0 }
    rows[rows.length - 1].push({ ...tk, w: tw }); w += tw
  }
  return rows
}
export function speech(ctx, t, o) {
  const { t0, t1 = 1e9, x, y, who = 'sun', text, tail = 0, tailUp = false, size = 46, maxW = 640, cps = 32, tag = true, shake = 0, color } = o
  if (t < t0 - 0.01 || t > t1 + 0.25) return { w: 0, h: 0 }
  const col = color || colorOf(who)
  const pIn = easeOutBack(prog(t, t0, t0 + 0.26), 2.4), pOut = prog(t, t1, t1 + 0.22)
  const k = pIn * (1 - ease.inQuad(pOut))
  if (k <= 0.01) return { w: 0, h: 0 }
  const rows = wrapWords(ctx, text, size, maxW)
  const lh = size * 1.22
  const rowW = rows.map(r => r.reduce((a, b) => a + b.w, 0))
  const bw = Math.max(...rowW, 120) + 64, bh = rows.length * lh + 46
  // typewriter: chars revealed
  const total = PARSE(text).length, shown = Math.floor((t - t0 - 0.08) * cps)
  ctx.save()
  const jx = shake ? Math.sin(t * 60) * shake : 0, jy = shake ? Math.cos(t * 53) * shake : 0
  ctx.translate(x + jx, y + jy); ctx.scale(k, k)
  // body
  const bx = -bw / 2, by = -bh / 2, rad = 34
  ctx.fillStyle = INK
  const shape = (inset) => {
    ctx.beginPath(); ctx.roundRect(bx - inset, by - inset, bw + inset * 2, bh + inset * 2, rad + inset)
  }
  ctx.save(); ctx.shadowColor = 'rgba(6,4,18,0.5)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 10; shape(7); ctx.fill(); ctx.restore()
  // tail
  const tx = clamp(tail, -bw / 2 + 50, bw / 2 - 50), ty = tailUp ? by : by + bh, dir = tailUp ? -1 : 1
  ctx.beginPath(); ctx.moveTo(tx - 30, ty - dir * 4); ctx.lineTo(tx + 30, ty - dir * 4); ctx.lineTo(tx + (tail > 0 ? 34 : tail < 0 ? -34 : 0), ty + dir * 56); ctx.closePath()
  ctx.fillStyle = INK; ctx.lineWidth = 14; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.stroke(); ctx.fill()
  shape(0); ctx.fillStyle = '#fffaf0'; ctx.fill()
  ctx.beginPath(); ctx.moveTo(tx - 24, ty - dir * 6); ctx.lineTo(tx + 24, ty - dir * 6); ctx.lineTo(tx + (tail > 0 ? 30 : tail < 0 ? -30 : 0), ty + dir * 46); ctx.closePath(); ctx.fill()
  // colour band
  ctx.save(); shape(0); ctx.clip(); ctx.fillStyle = rgba(col, 0.22); ctx.fillRect(bx, by + bh - 14, bw, 14); ctx.restore()
  // text
  ctx.textBaseline = 'middle'
  let n = 0
  rows.forEach((r, j) => {
    let cx = -rowW[j] / 2
    const ry = by + 23 + lh * (j + 0.5)
    for (const tk of r) {
      ctx.font = tk.acc ? `italic 600 ${Math.round(size * 1.12)}px ${SERIF}` : `800 ${size}px ${INTER}`
      ctx.fillStyle = tk.acc ? mixHex(col, INK, 0.35) : INK
      ctx.textAlign = 'left'
      for (const ch of tk.s) {
        if (n < shown || shown >= total) ctx.fillText(ch, cx, ry)
        cx += ctx.measureText(ch).width; n++
      }
    }
  })
  // name tag
  if (tag) {
    const label = labelOf(who)
    ctx.font = `700 26px ${MONO}`
    const tw = ctx.measureText(label).width + 36
    ctx.save(); ctx.translate(bx + 26, by - 2); ctx.rotate(-0.04)
    ctx.fillStyle = INK; ctx.beginPath(); ctx.roundRect(-4, -26, tw + 8, 48, 14); ctx.fill()
    ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(0, -22, tw, 40, 11); ctx.fill()
    ctx.fillStyle = INK; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(label, 18, -1)
    ctx.restore()
  }
  ctx.restore()
  return { w: bw, h: bh }
}
export function speechCues(list, { cps = 32, every = 2, gain = 0.02 } = {}) {
  const out = []
  list.forEach((b, n) => {
    const base = b.pitch || PITCH[b.who] || 600
    const cs = PARSE(b.text)
    const fast = b.who === 'mercury' ? 1.35 : 1
    let k = 0
    cs.forEach((ch, i) => {
      if (!/[\p{L}\p{N}]/u.test(ch)) return
      if (k++ % every) return
      const tt = b.t0 + 0.08 + i / (b.cps || cps)
      if (tt > (b.t1 ?? 1e9)) return
      const step = [0, 2, 1, 3, 2, 0, 4, 1][(k + n) % 8]
      out.push(['pop', +tt.toFixed(3), +(base * fast * Math.pow(2, step / 12)).toFixed(2), +(gain * (b.who === 'moon' ? 0.6 : 1)).toFixed(4), +(((k % 4) - 1.5) * 0.08).toFixed(2)])
    })
    out.push(['pop', +(b.t0).toFixed(3), +(base * 2).toFixed(2), 0.03, 0])
  })
  return out
}
export function planetTalkCues(lines, opts = {}) {
  return talkCues(lines.map(L => ({ ...L, speaker: L.speaker ?? labelOf(L.who) })), { ...opts, pitch: { ...PITCH, ...(opts.pitch || {}) } })
}

// ─────────────────────────────────────────────── the entrance hook
const DEF_LEN = { crash: 0.7, rise: 1.6, zoom: 0.9, spin: 1.0, slide: 0.75, burst: 0.55, drop: 1.4 }
export const entranceLand = (kind, { at = 0, len } = {}) => at + (len ?? DEF_LEN[kind] ?? 0.8)
export function entrance(kind, t, { at = 0, len, x = 540, y = 700, size = 520 } = {}) {
  const L = len ?? DEF_LEN[kind] ?? 0.8, land = at + L
  const p = prog(t, at, land), after = t - land
  const settle = after > 0 ? Math.exp(-after * 7) * Math.cos(after * 24) : 0
  const pose = { x, y, size, rot: 0, squash: 0, alpha: 1, blur: 0, land }
  switch (kind) {
    case 'crash': {
      pose.y = lerp(y - 1500, y, ease.inQuad(p)); pose.rot = lerp(-0.5, 0, p)
      pose.squash = t < land ? -0.18 * p : 0.32 * settle
      pose.blur = t < land ? 18 * p : 0
      break
    }
    case 'rise': {
      const q = p < 0.7 ? ease.outQuad(p / 0.7) * 0.55 : 0.55 + 0.45 * easeOutBack((p - 0.7) / 0.3, 1.6)
      pose.y = lerp(y + size * 0.95, y, q); pose.size = size * lerp(0.92, 1, q); pose.squash = 0.06 * settle
      break
    }
    case 'zoom': {
      const q = p < 0.75 ? ease.inCubic(p / 0.75) * 1.9 : lerp(1.9, 1, ease.outCubic((p - 0.75) / 0.25))
      pose.size = size * Math.max(0.03, q + 0.12 * settle); pose.rot = (1 - p) * 0.8; pose.blur = p < 0.75 ? 10 * p : 0
      break
    }
    case 'spin': {
      const a = (1 - ease.outCubic(p)) * TAU * 1.2, rr = (1 - ease.outCubic(p)) * 900
      pose.x = x + Math.cos(a + 1) * rr; pose.y = y + Math.sin(a + 1) * rr * 0.8; pose.rot = -(1 - ease.outCubic(p)) * TAU * 2 + 0.2 * settle
      pose.size = size * lerp(0.4, 1, ease.outCubic(p))
      break
    }
    case 'slide': {
      pose.x = lerp(x + 1300, x, ease.outCubic(p)); pose.rot = t < land ? -0.35 * (1 - p) : -0.25 * settle; pose.squash = t < land ? -0.1 * (1 - p) : 0.15 * settle
      break
    }
    case 'burst': {
      pose.size = size * (t < at ? 0 : easeOutBack(p, 3.2) * (1 + 0.25 * (1 - p))); pose.rot = 0.3 * (1 - p) + 0.08 * settle; pose.alpha = t < at ? 0 : 1
      break
    }
    case 'drop': {
      pose.y = lerp(y - 1300, y, ease.outQuart(p)); pose.squash = 0.12 * settle
      break
    }
    default: break
  }
  return pose
}
export function drawEntranceFx(ctx, id, kind, t, o = {}) {
  const { at = 0, len, x = 540, y = 700, size = 520 } = o
  const land = entranceLand(kind, { at, len }), col = PLANETS[id]?.color || GOLD, rim = PLANETS[id]?.rim || '#ff7a1a'
  ctx.save()
  // during flight: ghosts + speed lines
  if (t > at && t < land) {
    for (let k = 3; k >= 1; k--) {
      const P = entrance(kind, t - k * 0.045, { at, len, x, y, size })
      if (P.size <= 2) continue
      ctx.globalAlpha = 0.16 * (4 - k)
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(P.x, P.y, P.size / 2, 0, TAU); ctx.fill()
    }
    ctx.globalAlpha = 1
    const P = entrance(kind, t, { at, len, x, y, size })
    ctx.strokeStyle = rgba('#fffbea', 0.8); ctx.lineCap = 'round'
    for (let k = 0; k < 16; k++) {
      const a = fr(k, 7) * TAU, d0 = P.size * 0.6 + fr(k, 8) * 300, len2 = 120 + fr(k, 9) * 260
      const ph = ((t * 3 + fr(k, 10)) % 1)
      ctx.globalAlpha = 0.6 * Math.sin(ph * Math.PI)
      ctx.lineWidth = 4 + fr(k, 11) * 6
      const vx = kind === 'crash' || kind === 'drop' ? 0 : Math.cos(a), vy = kind === 'crash' || kind === 'drop' ? -1 : Math.sin(a)
      const sx = kind === 'crash' || kind === 'drop' ? P.x + (fr(k, 12) - 0.5) * P.size * 1.4 : P.x + vx * d0
      const sy = kind === 'crash' || kind === 'drop' ? P.y - P.size * 0.5 - fr(k, 13) * 500 : P.y + vy * d0
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx + vx * len2, sy + vy * len2); ctx.stroke()
    }
    ctx.globalAlpha = 1
  }
  // landing: shockwave rings + dust + sparks
  const a = t - land
  if (a >= 0 && a < 1.0) {
    const fy = kind === 'crash' || kind === 'drop' ? y + size * 0.46 : y
    for (let k = 0; k < 2; k++) {
      const q = clamp((a - k * 0.12) / 0.7)
      if (q <= 0 || q >= 1) continue
      ctx.globalAlpha = 1 - q; ctx.strokeStyle = k ? '#fffbea' : col; ctx.lineWidth = 18 * (1 - q) + 2
      ctx.beginPath(); ctx.ellipse(x, fy, size * (0.55 + 0.9 * ease.outCubic(q)), size * (kind === 'crash' || kind === 'drop' ? 0.12 : 0.55) * (0.55 + 0.9 * ease.outCubic(q)) / (kind === 'crash' || kind === 'drop' ? 1 : 1), 0, 0, TAU); ctx.stroke()
    }
    for (let k = 0; k < 14; k++) {
      const q = ease.outCubic(clamp(a / 0.8)), ang = (k / 14) * TAU + fr(k, 3)
      ctx.globalAlpha = 1 - clamp(a / 0.8)
      const px = x + Math.cos(ang) * (size * 0.5 + q * (160 + fr(k, 4) * 140)), py = fy + Math.sin(ang) * (kind === 'crash' || kind === 'drop' ? 0.3 : 1) * (size * 0.5 + q * (160 + fr(k, 4) * 140))
      drawPixelStar(ctx, px, py, 22 * (1 - q * 0.5), k % 2 ? 1 : 2, k % 3 ? col : k % 2 ? '#fffbea' : rim)
    }
    ctx.globalAlpha = 1
  }
  // burst flash
  if (kind === 'burst' && t >= at - 0.02 && t < at + 0.35) {
    ctx.globalAlpha = 1 - clamp((t - at) / 0.35); ctx.fillStyle = '#fffbea'; ctx.fillRect(0, 0, 1080, 1920); ctx.globalAlpha = 1
  }
  ctx.restore()
}
export function entranceCues(kind, { at = 0, len } = {}) {
  const land = entranceLand(kind, { at, len })
  const a = Math.max(0, at)
  const out = []
  if (land - a > 0.25) out.push(['riser', +a.toFixed(3), +land.toFixed(3), 0.06])
  out.push(['whoosh', +Math.max(0, land - 0.45).toFixed(3), 0.5, 0.14])
  if (kind === 'crash' || kind === 'drop' || kind === 'slide') out.push(['boom', +land.toFixed(3), 0.42], ['tom', +land.toFixed(3), 70, { gain: 0.3, decay: 0.4 }])
  else if (kind === 'rise') out.push(['boom', +land.toFixed(3), 0.35], ['bell', +land.toFixed(3), 392, 0.05, 2.4, 0])
  else out.push(['boom', +land.toFixed(3), 0.3], ['pop', +land.toFixed(3), 1318.51, 0.05, 0])
  out.push(['crash', +land.toFixed(3), { gain: 0.05, len: 1.8 }], ['glitter', +land.toFixed(3), +(land + 0.5).toFixed(3)])
  return out
}
