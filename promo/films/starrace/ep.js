// The Star Race · between-race episodes (Season 1, before Race 2: pairs). A tiny scene engine: an episode is a few
// short scenes (a set, the stars moving between keyframes, speech bubbles, props) and a closing lesson card.
// Social cut only (full frame, --social --calm). Same look as the race: pixel stars, bone bubbles, sticker labels.
//
// makeEpisode({ id, hook, scenes: [scene…], lesson: ['white line', 'gold italic line'], pair: ['taurus', 'cancer'] })
// scene = { dur, set(x, t, lt), title?, cast: { sign: [[lt, x, y, size?], …] }, mood: { sign: 'happy' | lt => mood },
//           lines: [[lt, seconds, sign, 'text | line two']], back?(x, t, lt, P), front?(x, t, lt, P), stick?: [[lt, d, text, bg]] }
// P.at(sign) → [x, y, size] of a star right now (for props that ride along: hats, scarves, clipboards).
// A line's speaker can also be a position [x, y, size] (a speaking prop: Coach Saturn, a mirror, a phone).
import { prog, lerp, ease, clamp } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../sky.js'
import { SKY_H } from '../wheel.js'
import { bubble, label, sparkles, pop01, signChar, GOLD, BONE, PINK, INK, INTER, MONO, SERIF } from '../signs3kit.js'

export const FLOOR = 1330
const r2 = v => Math.round(v * 100) / 100

// ── props (pixel style: flat fills, ink outlines) ───────────────────────────────────────────────────────────
export const box = (x, l, t, w, h, col, ink = 6) => { x.fillStyle = INK; x.fillRect(l - ink, t - ink, w + 2 * ink, h + 2 * ink); x.fillStyle = col; x.fillRect(l, t, w, h) }
export function txt(x, s, cx, cy, { size = 40, col = INK, font = INTER, weight = 800, align = 'center', italic = false } = {}) {
  x.font = `${italic ? 'italic ' : ''}${weight} ${size}px ${font}`; x.fillStyle = col; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, cx, cy)
}
export function room(x, { wall = '#2a1d52', floor = '#3b2a1e', trim = '#1b1236', y = FLOOR + 60 } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, y)
  for (let k = 0; k < 1080; k += 120) { x.fillStyle = 'rgba(255,255,255,0.025)'; x.fillRect(k, 0, 60, y) }   // wallpaper stripes
  x.fillStyle = floor; x.fillRect(0, y, 1080, 1920 - y)
  for (let k = 0; k < 1080; k += 90) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(k, y, 4, 1920 - y) }       // floorboards
  x.fillStyle = trim; x.fillRect(0, y - 14, 1080, 18)
}
export function outside(x, { ground = '#2c2350', y = FLOOR + 60 } = {}) {   // the sky layer shows through above the ground
  x.fillStyle = ground; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10)
  for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect((k * 137) % 1080, y + 30 + (k * 59) % 400, 8, 8) }
}
export function windowStars(x, cx, cy, w, h, t) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#0b0820', 10)
  for (let k = 0; k < 22; k++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + k * 1.7)); x.fillStyle = `rgba(239,230,214,${a.toFixed(2)})`; x.fillRect(cx - w / 2 + 10 + (k * 97) % (w - 20), cy - h / 2 + 10 + (k * 53) % (h - 20), 6, 6) }
  x.fillStyle = INK; x.fillRect(cx - 4, cy - h / 2, 8, h); x.fillRect(cx - w / 2, cy - 4, w, 8)
}
export function table(x, cx, w = 520, top = FLOOR - 40, col = '#7a4a2c') {
  box(x, cx - w / 2, top, w, 34, col); box(x, cx - w / 2 + 30, top + 40, 30, FLOOR + 50 - top - 40, col); box(x, cx + w / 2 - 60, top + 40, 30, FLOOR + 50 - top - 40, col)
}
export function clock(x, cx, cy, s, col = '#ff5a6e') { box(x, cx - 150, cy - 60, 300, 120, '#120c24', 8); txt(x, s, cx, cy + 4, { size: 72, col, font: MONO, weight: 700 }) }
export function flyer(x, cx, cy, k = 1, rot = -0.05, lines = ['RACE 2', 'PAIRS', 'race tied to someone']) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -170, -210, 340, 420, BONE, 8)
  x.fillStyle = PINK; x.fillRect(-170, -210, 340, 90)
  txt(x, lines[0], 0, -165, { size: 52 }); txt(x, lines[1], 0, -40, { size: 84 })
  txt(x, lines[2], 0, 50, { size: 30, weight: 700 })
  for (let i = 0; i < 2; i++) { x.fillStyle = ['#f2c75c', '#8fe3ff'][i]; x.beginPath(); x.arc(-50 + i * 100, 135, 34, 0, Math.PI * 2); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke() }
  x.fillStyle = INK; x.fillRect(-16, 131, 32, 8)
  x.fillStyle = '#c33'; x.beginPath(); x.arc(0, -200, 12, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function board(x, cx, cy, w, h, col = '#f4efe4') { box(x, cx - w / 2, cy - h / 2, w, h, col, 10); x.fillStyle = '#8a6a4a'; x.fillRect(cx - w / 2 - 10, cy + h / 2 + 2, w + 20, 14) }
export function cookie(x, cx, cy, s = 7) {
  const C = ['.KKKK.', 'KccdcK', 'KcccdK', 'KdcccK', 'KccdcK', '.KKKK.'], col = { K: INK, c: '#d9a55a', d: '#6b3b1f' }
  C.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = col[ch]; x.fillRect(cx + (i - 3) * s, cy + (j - 3) * s, s, s) } }))
}
export function heart(x, cx, cy, s = 8, col = PINK) {
  const H = ['.KK.KK.', 'KppKppK', 'KpppppK', '.KpppK.', '..KpK..', '...K...']
  H.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = ch === 'K' ? INK : col; x.fillRect(cx + (i - 3.5) * s, cy + (j - 3) * s, s, s) } }))
}
export function saturn(x, cx, cy, r, t, face = true) {
  x.strokeStyle = '#e9d39a'; x.lineWidth = r * 0.12; x.beginPath(); x.ellipse(cx, cy, r * 2.1, r * 0.45, -0.12, Math.PI, Math.PI * 2); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill()
  const bands = ['#e8c27a', '#d9a55a', '#f0d79c', '#c98e4a', '#e8c27a']
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip(); bands.forEach((c, i) => { x.fillStyle = c; x.fillRect(cx - r, cy - r + i * (2 * r / 5), 2 * r, 2 * r / 5 + 1) }); x.restore()
  if (face) { const bl = (t % 3.1) < 0.12 ? 2 : 14; x.fillStyle = INK; x.fillRect(cx - r * 0.38, cy - r * 0.15, 14, bl); x.fillRect(cx + r * 0.25, cy - r * 0.15, 14, bl); x.fillRect(cx - r * 0.42, cy - r * 0.34, 34, 8); x.fillRect(cx + r * 0.2, cy - r * 0.34, 34, 8); x.fillRect(cx - 24, cy + r * 0.3, 48, 8) }
  x.strokeStyle = '#e9d39a'; x.lineWidth = r * 0.12; x.beginPath(); x.ellipse(cx, cy, r * 2.1, r * 0.45, -0.12, 0, Math.PI); x.stroke()
}
export function screen(x, cx, cy, w, h, inside) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#0e1630', 10)
  x.save(); x.beginPath(); x.rect(cx - w / 2, cy - h / 2, w, h); x.clip(); inside?.(cx, cy, w, h); x.restore()
  x.fillStyle = INK; x.fillRect(cx - 12, cy + h / 2 + 10, 24, 40)
}
export function tinyStar(x, cx, cy, s, col) {     // a 5-point pixel star for screens, posters and the race replay
  x.fillStyle = col; x.beginPath()
  for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5, rr = k % 2 ? s * 0.45 : s; x.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) }
  x.closePath(); x.fill(); x.strokeStyle = INK; x.lineWidth = 3; x.stroke()
}
export function signpost(x, cx, base, arrows, t) {
  box(x, cx - 12, base - 520, 24, 520, '#8a6a4a')
  arrows.forEach(([s, dir, col], i) => {
    const y = base - 480 + i * 120, w = 300, l = dir > 0 ? cx : cx - w, wob = Math.sin(t * 2 + i) * 0.03
    x.save(); x.translate(cx, y); x.rotate(wob); x.translate(-cx, -y)
    box(x, l, y - 40, w, 80, col || BONE, 6)
    x.fillStyle = col || BONE; x.beginPath(); const tip = dir > 0 ? l + w : l; x.moveTo(tip, y - 46); x.lineTo(tip + dir * 50, y); x.lineTo(tip, y + 46); x.fill()
    txt(x, s, l + w / 2, y + 2, { size: 30 })
    x.restore()
  })
}
export function mountain(x, cx, base, h, w, t) {
  x.fillStyle = INK; x.beginPath(); x.moveTo(cx - w / 2 - 10, base); x.lineTo(cx, base - h - 14); x.lineTo(cx + w / 2 + 10, base); x.fill()
  x.fillStyle = '#4b3f7a'; x.beginPath(); x.moveTo(cx - w / 2, base); x.lineTo(cx, base - h); x.lineTo(cx + w / 2, base); x.fill()
  x.fillStyle = BONE; x.beginPath(); x.moveTo(cx - w * 0.12, base - h * 0.76); x.lineTo(cx, base - h); x.lineTo(cx + w * 0.12, base - h * 0.76); x.fill()
}
export function marbleTrack(x, y, t) {        // a practice lane: a rail with pegs
  x.lineCap = 'round'; x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.moveTo(60, y); x.lineTo(1020, y + 40); x.stroke(); x.strokeStyle = BONE; x.lineWidth = 12; x.stroke()
  for (let k = 0; k < 6; k++) { const px = 140 + k * 160, py = y + 4 + k * 6.6 - 70; box(x, px - 9, py - 9, 18, 18, GOLD, 4) }
}

// ── the episode ─────────────────────────────────────────────────────────────────────────────────────────────
export function makeEpisode(E) {
  let acc = 0
  const SC = E.scenes.map(s => { const o = { ...s, t0: r2(acc) }; acc += s.dur; o.t1 = r2(acc); return o })
  const END = r2(acc), DURATION = r2(END + (E.endLen ?? 6.4))
  const T = { end: END, cuts: SC.map(s => s.t0) }

  function at(s, id, lt) {         // keyframed position of a star in a scene: [[lt, x, y, size?], …], eased between keys
    const K = s.cast[id]; if (!K) return null
    if (lt <= K[0][0]) return [K[0][1], K[0][2], K[0][3] ?? 260]
    for (let k = 1; k < K.length; k++) if (lt < K[k][0]) {
      const a = K[k - 1], b = K[k], u = ease.inOutCubic(prog(lt, a[0], b[0]))
      return [lerp(a[1], b[1], u), lerp(a[2], b[2], u) - Math.sin(Math.PI * u) * (Math.abs(b[1] - a[1]) > 60 ? 40 : 0), lerp(a[3] ?? 260, b[3] ?? a[3] ?? 260, u)]
    }
    const z = K[K.length - 1]; return [z[1], z[2], z[3] ?? 260]
  }
  const moving = (s, id, lt) => { const K = s.cast[id]; for (let k = 1; k < K.length; k++) if (lt > K[k - 1][0] && lt < K[k][0] && (K[k][1] !== K[k - 1][1] || K[k][2] !== K[k - 1][2])) return true; return false }

  async function build(stage) {
    try { await Promise.all(["800 40px Inter", "800 54px Inter", "700 72px 'Space Mono'", "italic 500 64px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) {}
    const root = fill(stage, { background: '#05040c' })
    const skyC = layerCanvas(root), sx = skyC.getContext('2d')
    const cv = layerCanvas(root), x = cv.getContext('2d')

    function scene(s, t) {
      const lt = t - s.t0
      const P = { at: id => at(s, id, lt), lt, t }
      if (s.set) { x.save(); s.set(x, t, lt, P); x.restore() }
      if (s.back) { x.save(); s.back(x, t, lt, P); x.restore() }
      const ids = Object.keys(s.cast).sort((a, b) => at(s, a, lt)[1] - at(s, b, lt)[1])
      for (const id of ids) {
        const [cx, cy, size] = at(s, id, lt)
        if (size <= 0) continue
        const talk = (s.lines || []).filter(l => l[2] === id).map(l => s.t0 + l[0])
        const m = s.mood?.[id], mood = typeof m === 'function' ? m(lt) : m || 'happy'
        const bob = moving(s, id, lt) ? Math.abs(Math.sin(lt * 9)) * -22 : 0
        signChar(x, t, id, cx, cy + bob, size, { mood, hops: [...(s.hops?.[id] || []).map(h => s.t0 + h), ...talk].filter(h => h <= t).slice(-3), seed: id.length + 3, tears: id === 'pisces' ? 2 : 0, look: s.look?.[id], pop: pop01(t, s.t0 - 0.2, 0.3, 1.6) })
      }
      if (s.front) { x.save(); s.front(x, t, lt, P); x.restore() }
      for (const [l0, d, id, text] of s.lines || []) {
        if (lt < l0 || lt > l0 + d) continue
        const [cx, cy, size] = Array.isArray(id) ? [id[0], id[1], id[2] ?? 260] : at(s, id, lt), bx = clamp(cx, 250, 830)
        const k = pop01(t, s.t0 + l0, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, l0 + d - 0.25, l0 + d)))
        bubble(x, bx, cy - size * 0.62 - 70, text, k, { size: 44, col: BONE, tail: cx < bx - 40 ? 'bl' : cx > bx + 40 ? 'br' : 'bc' })
      }
      if (s.title) { const a = s.t0 === 0 ? 2.7 : 0.1, k = pop01(t, s.t0 + a, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, a + 1.9, a + 2.2))); if (k > 0) label(x, 540, 430, s.title, k, { size: 46, bg: GOLD, rot: -0.04 }) }
      for (const [l0, d, text, bg] of s.stick || []) { if (lt < l0 || lt > l0 + d) continue; label(x, 540, 640, text, pop01(t, s.t0 + l0, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, l0 + d - 0.3, l0 + d))), { size: 50, bg: bg || PINK, rot: -0.04 }) }
      const fin = 1 - ease.outCubic(prog(lt, 0, 0.18)); if (fin > 0 && s.t0 > 0) { x.fillStyle = `rgba(5,4,12,${fin.toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
    }
    function endCard(t) {
      if (t < END) return
      if (E.end) { x.save(); E.end(x, t, t - END); x.restore(); return }   // a custom closing card (e.g. the Houston party ticket)
      const a = clamp((t - END) / 0.5)
      x.fillStyle = `rgba(8,5,22,${(0.93 * a).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
      const [p, q] = E.pair || []
      const k = pop01(t, END + 0.3, 0.45, 1.7)
      if (k > 0) {
        if (q) { signChar(x, t, p, 400, 880, 220, { mood: 'heart', pop: k, seed: 5, hops: [END + 1.2, END + 2.7], tears: p === 'pisces' ? 2 : 0 }); signChar(x, t, q, 680, 880, 220, { mood: E.pairMood || 'heart', pop: k, seed: 6, hops: [END + 1.4, END + 2.9], tears: q === 'pisces' ? 2 : 0 }) }
        else signChar(x, t, p || E.id, 540, 880, 280, { mood: 'heart', pop: k, seed: 5, hops: [END + 1.2, END + 2.7] })
        if (t > END + 0.6) sparkles(x, t, 540, 860, END + 0.6, 10, 240, 3)
      }
      const lk = pop01(t, END + 1.2, 0.45, 1.5)
      if (lk > 0) {
        x.save(); x.globalAlpha = clamp(lk)
        E.lesson.forEach((ln, j) => { const last = j === E.lesson.length - 1; txt(x, ln, 540, 1150 + j * 78, last ? { size: 64, col: GOLD, font: SERIF, weight: 500, italic: true } : { size: 54, col: BONE }) })
        x.restore()
      }
      const nk = pop01(t, END + 2.6, 0.4, 1.8)
      if (nk > 0) label(x, 540, 560, E.next || 'NEXT: RACE 2 · PAIRS', nk, { size: 40, bg: PINK, rot: -0.03 })
    }

    return {
      start: 0, end: DURATION, root,
      update(t) {
        drawSky(sx, t, SKY_H)
        x.clearRect(0, 0, 1080, 1920)
        const s = SC.find(s => t >= s.t0 && t < s.t1) || SC[SC.length - 1]
        scene(s, t)
        if (E.badge && t < END + 0.3) label(x, E.badge.x ?? 250, E.badge.y ?? 150, E.badge.text, clamp((t - (E.badge.at ?? 2.7)) / 0.3), { size: E.badge.size || 34, bg: E.badge.bg || PINK, rot: -0.03, font: MONO, weight: 700 })   // persistent series badge
        if (E.overlay) { x.save(); E.overlay(x, t); x.restore() }
        endCard(t)
      },
    }
  }

  const NOTE = [523.25, 587.33, 659.25, 783.99, 880]
  const CUES = [
    ...SC.slice(1).map(s => ['whoosh', r2(s.t0), 0.4, 0.015]),
    ...SC.flatMap((s, i) => (s.lines || []).map((l, j) => ['pop', r2(s.t0 + l[0]), NOTE[(i + j) % 5], 0.012, 0])),
    ...(E.cues || []),
    ['glitter', r2(END + 0.5), r2(END + 1.3)],
    ['bell', r2(END + 1.25), 1046.5, 0.016, 1.8, 0],
  ].sort((a, b) => a[1] - b[1])
  return { HOOK: E.hook, HOOK_STYLE: E.hookStyle || 'box', HOOK_UNTIL: E.hookUntil ?? 2.6, SCENES: [build], DURATION, STORY_END: DURATION, CUES, T }
}
