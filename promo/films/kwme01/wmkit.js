// wmkit — the WAIT, THAT'S ME format (Month 2 boost · star_advice trial reels · kwme01–kwme24). Owned by batch m26.
// Read-only for everyone else. One hyper-relatable line on screen, the sign is already mid-thing at frame 0, a pattern
// break inside the first second, then the sign SLOWLY turns to the camera (deadpan push-in), one tiny last line, and the
// film loops back into frame 0. Pisces cries in every film (corner cameo unless Pisces is the hero). No end card.
//
//   import { makeWM, ... } from '../../kwme01/wmkit.js'
//   const EP = makeWM({
//     id, dur, sign: 'taurus', hook: 'Saying *“I’m fine”* | with my whole chest', last: '(I am not fine.)',
//     hero: { x, y, s, face: 1 },          // face: the side the hero looks at while busy (+1 right, −1 left)
//     turn: 4.6,                           // the slow turn starts here (lasts TURN_LEN), the last line types at turn + 1.5
//     brk: 'scratch' | 'flash' | 'whip',   // the first-second pattern break (all at BRK)
//     heroOpts(t, a) → { mood, look, hops, squash, x, y }   while busy (a = action time, frozen during a freeze)
//     back(x, t, a, S) / front(x, t, a, S) // the film's props, behind / in front of the hero (S = helpers, see below)
//     pis: { x, y, s, look } | false,      // the Pisces cameo (false when Pisces is the hero: then use S.tears)
//     cues: [...], wash: '#hex' (room colour), focus: { x, y } (push-in centre, default the hero's face)
//   })
//   export const { DURATION, SCENES, CUES } = EP
// Everything is pure f(t). The loop: the last LOOP_LEN s cross-fade the whole canvas into the frame at t − dur (the
// pre-roll of frame 0), so the last frame IS frame 0. Films must keep their props sensible for t in [−LOOP_LEN, 0].
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import { drawStarChar, signStar, lineTimes, talkCues } from '../startalk.js'
import { popText } from '../lesson.js'
import { loopK, loopCues, whipZoomCam, whipZoomCues, recordScratchCues } from '../hookkit.js'
import { drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK } from '../sxmail1/scenes/mail.js'

export { clamp, lerp, prog, ease, easeOutBack, drawStarChar, signStar, drawBits, sparkles, starFrame, inSprite, tearsCells, pop01, outK }
export const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', PINK = '#ff8fb1', RED = '#ff4d5e', MINT = '#9fe6b0', SKYB = '#7fd0ff'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const BRK = 0.32, FREEZE = 0.5, TURN_LEN = 1.5, LOOP_LEN = 0.45
export const sine = x => 0.5 - 0.5 * Math.cos(Math.PI * clamp(x))
export const R = (x, c, a, b, w, h) => { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }

/** a chunky pixel box with an ink border (+ optional top highlight) */
export function box(x, a, b, w, h, col, { bw = 6, hi = null, ink = INK } = {}) {
  R(x, ink, a - bw, b - bw, w + bw * 2, h + bw * 2); R(x, col, a, b, w, h)
  if (hi) R(x, hi, a, b, w, Math.max(4, bw))
}
/** a canvas speech bubble that pops at t0 and stays until t1 */
export function bubble(x, t, cx, cy, t0, t1, text, { size = 36, col = BONE, ink = INK, tail = 0, font = MONO, weight = 700, maxW = 620 } = {}) {
  const k = pop01(t, t0, 0.28, 2.2) * (t1 == null ? 1 : outK(t, [t1, t1 + 0.18]))
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `${weight} ${size}px ${font}`
  const lines = wrap(x, text, maxW), lh = size * 1.18
  const w = Math.max(...lines.map(l => x.measureText(l).width)) + size * 1.1, h = lines.length * lh + size * 0.7
  box(x, -w / 2, -h / 2, w, h, col, { bw: 5 })
  // tail
  const tx = tail * w * 0.35
  x.fillStyle = ink; x.beginPath(); x.moveTo(tx - 20, h / 2 - 1); x.lineTo(tx + 6, h / 2 + 34); x.lineTo(tx + 22, h / 2 - 1); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(tx - 12, h / 2 - 2); x.lineTo(tx + 6, h / 2 + 22); x.lineTo(tx + 14, h / 2 - 2); x.fill()
  x.fillStyle = ink; x.textAlign = 'center'; x.textBaseline = 'middle'
  lines.forEach((l, i) => x.fillText(l, 0, -((lines.length - 1) * lh) / 2 + i * lh + size * 0.04))
  x.restore()
}
export function wrap(x, text, maxW) {
  const out = []
  for (const para of String(text).split('\n')) {
    let cur = ''
    for (const w of para.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (x.measureText(nx).width > maxW && cur) { out.push(cur); cur = w } else cur = nx }
    out.push(cur)
  }
  return out
}
/** canvas label (centred) */
export function label(x, text, cx, cy, { size = 40, col = BONE, font = INTER, weight = 800, rot = 0, alpha = 1, stroke = INK, sw = 0.18, align = 'center' } = {}) {
  if (alpha <= 0) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  x.font = `${weight} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.lineJoin = 'round'
  if (stroke) { x.lineWidth = size * sw; x.strokeStyle = stroke; x.strokeText(text, 0, 0) }
  x.fillStyle = col; x.fillText(text, 0, 0); x.restore()
}
/** a pixel phone (screen fill callback gets local coords: 0,0 = screen top-left, w × h) */
export function phone(x, cx, cy, { w = 220, h = 400, rot = 0, screen = '#14102a', body = '#2a2148', draw = null, alpha = 1 } = {}) {
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  box(x, -w / 2, -h / 2, w, h, body, { bw: 7 })
  const sw = w - 28, sh = h - 56
  R(x, screen, -sw / 2, -h / 2 + 26, sw, sh)
  if (draw) { x.save(); x.beginPath(); x.rect(-sw / 2, -h / 2 + 26, sw, sh); x.clip(); x.translate(-sw / 2, -h / 2 + 26); draw(x, sw, sh); x.restore() }
  R(x, '#5a5470', -24, h / 2 - 20, 48, 8)
  x.restore()
}
/** a text bubble inside a phone screen */
export function sms(x, text, side, y, w, { size = 22, col, fg = INK, alpha = 1 } = {}) {
  if (alpha <= 0) return 0
  x.save(); x.globalAlpha *= alpha
  x.font = `700 ${size}px ${MONO}`
  const lines = wrap(x, text, w * 0.7), lh = size * 1.25
  const bw = Math.max(...lines.map(l => x.measureText(l).width)) + 26, bh = lines.length * lh + 16
  const bx = side === 'R' ? w - bw - 14 : 14
  R(x, col || (side === 'R' ? '#7fd0ff' : BONE), bx, y, bw, bh)
  x.fillStyle = fg; x.textAlign = 'left'; x.textBaseline = 'top'
  lines.forEach((l, i) => x.fillText(l, bx + 13, y + 9 + i * lh))
  x.restore(); return bh
}
/** soft radial light */
export function glow(x, cx, cy, r, col, a) {
  if (a <= 0) return
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0, hexA(col, a)); g.addColorStop(1, hexA(col, 0))
  x.fillStyle = g; x.fillRect(cx - r, cy - r, r * 2, r * 2)
}
export function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
/** a little pixel heart */
export const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
/** a pixel tissue (Pisces' accessory) */
export function tissue(x, cx, cy, s, t) {
  const w = Math.sin(t * 9) * 0.12
  drawBits(x, ['.WWW.', 'WWWWW', 'WWWWW', '.WWW.'], { W: '#ffffff' }, cx, cy, s, { rot: w })
}

// ─────────────────────────────────────────────── Pisces (corner cameo or hero), always crying
const PIS = signStar('pisces')
export function pisces(x, t, P, tears, { mood = 'wide', look = [0, 0], hops = null, sx = 1, alpha = 1 } = {}) {
  const opts = { color: PIS.color, glyph: P.s >= 120 ? PIS.glyph : null, mood, look, seed: 6, glow: 0.85, pop: P.pop ?? 1, alpha, hops, blink: P.blink }
  x.save()
  if (sx !== 1) { x.translate(P.x, 0); x.scale(sx, 1); x.translate(-P.x, 0) }
  drawStarChar(x, P.x, P.y, P.s, t, opts)
  const F = starFrame(P.x, P.y, P.s, t, opts)
  if (tears > 0) inSprite(x, F, () => tearsCells(x, t, tears))
  x.restore()
}

// ─────────────────────────────────────────────── the show bug: WAIT, THAT'S ME (Inter 800 small caps, letter-spaced)
function buildBug(root, accent) {
  const b = el('div', { position: 'absolute', left: '56px', top: '58px', display: 'flex', alignItems: 'center', gap: '14px', pointerEvents: 'none' }, root)
  el('div', { width: '18px', height: '18px', background: accent, boxShadow: `0 0 0 4px ${INK}, 0 0 14px ${accent}` }, b)
  el('div', { font: `800 30px ${INTER}`, fontVariant: 'small-caps', letterSpacing: '0.2em', color: GOLD, textShadow: '0 2px 10px rgba(6,4,18,0.95)' }, b, 'wait, that’s me')
  return b
}

// ─────────────────────────────────────────────── the film factory
export function makeWM(cfg) {
  const { id, dur, sign, hook, last, turn, brk = 'scratch', hero: H, heroOpts = () => ({}), back = null, front = null, pis = { x: 925, y: 1490, s: 230 }, cues = [], wash = null, sky = true } = cfg
  const ST = sign === 'stars' ? { color: '#f7cf68', glyph: null } : signStar(sign)
  const accent = cfg.accent || ST.color
  const TURN = [turn, turn + TURN_LEN], LAST = turn + TURN_LEN + 0.1, LOOP = [dur - LOOP_LEN, dur]
  const FZ = brk === 'scratch' ? [BRK, BRK + FREEZE] : null
  const WHIP = { at: -0.12, len: 0.6, from: 1.55 }
  const focus = cfg.focus || { x: H.x, y: H.y - H.s * 0.08 }
  const lastT = lineTimes([{ t: LAST, speaker: 'x', text: last }], { cps: 26 })[0]

  /** action time: real time, held during the freeze frame */
  const act = t => !FZ || t < FZ[0] ? t : t < FZ[1] ? FZ[0] : t - FREEZE
  /** the slow turn 0 → 1 */
  const turnK = t => sine(prog(t, ...TURN))
  /** the camera: frame 0 is mid-whip (zoomed in, flying out), then the slow deadpan push-in during the turn */
  function cam(t) {
    // frame 0 is mid-zoom: the hook kit's whip (pure camera fn) for 'whip' films, a gentle fly-out for the others
    const W = brk === 'whip' ? whipZoomCam(t, WHIP) : null
    let z = W ? W.s : 1 + 0.16 * (1 - ease.outCubic(prog(t, -0.6, 0.3))), fx = 540, fy = 960
    const tk = ease.inOutCubic(prog(t, TURN[0] - 0.1, TURN[1] + 0.9))
    z += 0.34 * tk
    fx = lerp(540, focus.x, tk); fy = lerp(960, focus.y, tk)
    // freeze-frame punch
    if (FZ && t >= FZ[0] && t < FZ[1]) z += 0.06 * easeOutBack(prog(t, FZ[0], FZ[0] + 0.12), 2)
    return { z, fx, fy }
  }

  /** the hero with the side-on → straight-to-camera turn */
  function hero(x, t, a, o = {}) {
    const k = turnK(t), face = H.face ?? 1
    const busy = heroOpts(t, a) || {}
    const hx = o.x ?? busy.x ?? H.x, hy = o.y ?? busy.y ?? H.y
    const sx = lerp(0.74, 1, k)
    const look = k < 0.55 ? (busy.look || [face, 0]) : [0, 0]
    const mood = k > 0.25 ? (t > LAST + 1.1 && cfg.endMood ? cfg.endMood : 'neutral') : (busy.mood || 'neutral')
    // deadpan: no blinking through the turn, then one slow blink just after the last line lands
    let blink = busy.blink
    if (k > 0.05) { const b = prog(t, lastT.done + 0.25, lastT.done + 0.55); blink = b > 0 && b < 1 ? Math.sin(Math.PI * b) : 0 }
    x.save()
    x.translate(hx, 0); x.scale(sx, 1); x.translate(-hx, 0)
    const tilt = (1 - k) * (busy.tilt ?? 0.06 * face)
    if (tilt) { x.translate(hx, hy); x.rotate(tilt); x.translate(-hx, -hy) }
    drawStarChar(x, hx, hy, H.s, t, { color: ST.color, glyph: H.s >= 120 ? ST.glyph : null, mood, look, blink, hops: k > 0.05 ? null : busy.hops, squash: busy.squash || 0, seed: H.seed || 3, bob: k > 0.2 ? 2 : undefined, blush: busy.blush })
    const after = o.after || cfg.heroAfter
    if (after) after(x, t, a, starFrame(hx, hy, H.s, t, { hops: k > 0.05 ? null : busy.hops, squash: busy.squash || 0, seed: H.seed || 3, bob: k > 0.2 ? 2 : undefined }), k)
    x.restore()
  }
  /** Pisces' tear level over the film: sniffles while busy, streams at the break, fountains at the turn */
  const tears = t => t > TURN[0] + 0.4 ? 3 : 2

  async function build(stage) {
    try { await Promise.all(["800 92px Inter", "800 30px Inter", "italic 500 100px 'EB Garamond'", "700 44px 'Space Mono'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
    const root = fill(stage, { background: '#05040c' })
    const cA = layerCanvas(root), xA = cA.getContext('2d')
    const cB = layerCanvas(root), xB = cB.getContext('2d')        // the loop-back layer (frame 0's pre-roll)
    const flash = el('div', { position: 'absolute', inset: 0, background: accent, opacity: 0, pointerEvents: 'none' }, root)
    const HOOK = popText(root, hook, { top: 150, size: cfg.hookSize || 86, accentSize: (cfg.hookSize || 86) * 1.16, at: -3, accentColor: cfg.hookAccent || accent, fit: true })
    // the last line: a subtitle that types on, Space Mono
    const sub = el('div', { position: 'absolute', left: '40px', width: '780px', top: (cfg.lastTop || 1470) + 'px', textAlign: 'center', font: `700 46px ${MONO}`, color: BONE, textShadow: '0 3px 14px rgba(6,4,18,0.98), 0 0 3px rgba(6,4,18,0.9)', whiteSpace: 'pre-wrap', pointerEvents: 'none' }, root)
    const chars = [...last.replace(/\*/g, '')]
    buildBug(root, accent)
    const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
    const S = { hero, tears, act, turnK, TURN, LAST, LOOP, FZ, ST, accent, H, dur }

    function scene(x, t) {
      const a = act(t)
      const c = cam(t)
      // shake on the break
      const db = t - BRK, sh = db > 0 && db < 0.35 && brk !== 'flash' ? 12 * Math.exp(-db * 9) * Math.sin(db * 60) : 0
      x.setTransform(1, 0, 0, 1, 0, 0)
      if (sky) drawSky(x, t, { zoom: 1.45 * (1 + (c.z - 1) * 0.3), dx: 0, dy: 0, dim: 0.5, moon: null })
      else { x.fillStyle = '#0a0718'; x.fillRect(0, 0, 1080, 1920) }
      if (wash) { const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, hexA(wash, 0.0)); g.addColorStop(0.55, hexA(wash, 0.22)); g.addColorStop(1, hexA(wash, 0.5)); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920) }
      x.save()
      x.translate(540, 960 + sh); x.scale(c.z, c.z); x.translate(-c.fx, -c.fy)
      if (back) back(x, t, a, S)
      if (!cfg.noHero) hero(x, t, a)
      if (front) front(x, t, a, S)
      x.restore()
      // Pisces corner cameo (outside the camera so it stays put)
      if (pis) {
        const pk = turnK(t)
        const P = { x: pis.x, y: pis.y + 6 * Math.sin(t * 2.4), s: pis.s }
        pisces(x, t, P, tears(t), { mood: t > TURN[0] + 0.4 ? (cfg.pisMood || 'wide') : 'sparkle', look: pk > 0.5 ? [0, 0] : (pis.look || [-1, -1]), sx: lerp(0.8, 1, pk) })
        if (cfg.pisLine) bubble(x, t, pis.x - 120, pis.y - 150, TURN[0] + 0.7, LOOP[0], cfg.pisLine, { size: 28, tail: 0.6 })
      }
      // freeze frame look: cool tint + scanlines + a red 'caught' ring on the hero
      if (FZ && t >= FZ[0] && t < FZ[1] + 0.1) {
        const k = t < FZ[1] ? 1 : 1 - prog(t, FZ[1], FZ[1] + 0.1)
        x.save(); x.globalAlpha = 0.22 * k; x.fillStyle = '#8fb4ff'; x.fillRect(0, 0, 1080, 1920); x.restore()
        x.save(); x.globalAlpha = 0.12 * k; for (let y = 0; y < 1920; y += 8) R(x, '#000', 0, y, 1080, 3); x.restore()
        const p = ease.outCubic(prog(t, FZ[0] + 0.04, FZ[0] + 0.3))
        const hx = 540 + (H.x - c.fx) * c.z, hy = 960 + (H.y - c.fy) * c.z, rr = H.s * 0.62 * c.z
        x.save(); x.globalAlpha = k; x.strokeStyle = RED; x.lineWidth = 12; x.lineCap = 'round'
        x.beginPath(); x.ellipse(hx, hy, rr * 1.05, rr * 0.92, -0.2, -Math.PI * 0.6, -Math.PI * 0.6 + Math.PI * 2.1 * p); x.stroke(); x.restore()
      }
    }

    return {
      start: 0, end: dur + 0.01, root,
      update(t) {
        scene(xA, t)
        const lk = loopK(t, dur, LOOP_LEN)          // the hook kit's loop helper (1 on the last rendered frame)
        cB.style.opacity = String(lk)
        if (lk > 0) scene(xB, t - dur)
        // colour flash on the break (and a quick one on the loop seam for 'flash' films? no: the seam stays clean)
        const fk = brk === 'flash' ? Math.max(0, 1 - Math.abs(t - BRK) / 0.12) * 0.75 : brk === 'scratch' ? Math.max(0, 1 - Math.abs(t - BRK) / 0.06) * 0.35 : Math.max(0, 1 - Math.abs(t - BRK - 0.18) / 0.08) * 0.25
        flash.style.opacity = String(fk)
        HOOK.update(t)
        HOOK.root.style.transform = (() => { const db = t - BRK; return db > 0 && db < 0.4 ? `translateX(${(10 * Math.exp(-db * 9) * Math.sin(db * 70)).toFixed(2)}px)` : '' })()
        // the last line: types on, fades with the loop
        const n = lastT.chars.filter(c => c <= t).length
        sub.textContent = n ? chars.slice(0, n).join('') : ''
        sub.style.opacity = String(1 - lk)
        drawGrain(gx, t >= LOOP[0] ? t - dur : t)
      },
    }
  }

  // ── sound: the break, the turn (a sudden drop-out + a low 'dun'), the last line's blips, the seam whoosh
  const SFX = [
    ...(brk === 'scratch' ? recordScratchCues({ at: BRK, len: FREEZE }) : []),
    ...(brk === 'flash' ? [['boom', BRK, 0.2], ['bell', BRK + 0.01, 1760, 0.03, 0.6, 0], ['glitter', BRK, BRK + 0.35]] : []),
    ...(brk === 'whip' ? whipZoomCues(WHIP).map(c => c.map(v => typeof v === 'number' ? Math.max(0, v) : v)) : []),
    ['tom', TURN[0], 70, { gain: 0.24, decay: 0.5 }], ['bell', TURN[0] + 0.02, 330, 0.02, 1.6, 0], ['riser', TURN[0] + 0.1, TURN[1], 0.012],
    ['pluck', TURN[1] - 0.05, 220, 0.03, 0.6, 0],
    ...talkCues([{ t: LAST, speaker: 'last', text: last }], { cps: 26, gain: 0.016 }),
    ['pluck', TURN[0] + 0.5, 1318.51, 0.012, 0.4, 0.5], ['pluck', TURN[0] + 0.68, 1174.66, 0.012, 0.4, 0.5],
    ...loopCues({ duration: dur, len: LOOP_LEN }),
  ]
  return { DURATION: dur, SCENES: [build], CUES: [...SFX, ...cues], T: { TURN, LAST, LOOP, FZ, BRK }, act, turnK }
}

/** cues.js helper: the score for a loop — the drop lands on the break, the breakdown (drop-out) on the turn */
export function wmMusic(EP, { style, key, seed }) {
  return { style, key, seed, sections: { drop: EP.T.FZ ? EP.T.FZ[1] : EP.T.BRK + 0.1, breakdown: [EP.T.TURN[0]], outroAt: EP.T.LOOP[0] }, hits: [EP.T.BRK] }
}
