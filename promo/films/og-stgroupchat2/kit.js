// stgroupchat2/kit.js — the small kit shared by the Star Talk season 2 extra films 1–4 (stgroupchat2, stbreakup,
// stghostprotocol, stlovelang2; promo/films/STARTALK12.md). Owned by that session. Pure f(t); nothing touches `document`
// at module top level (the sound build imports the films' scenes/index.js in node).
//
// It re-uses the season 2 props as they are (never edited): the aunties' glasses, tears, hearts, panels and the crockpot
// from staunties; the booth headsets, mic, desk and confetti from stlive5th; the whistle, clipboard and crown from
// stintervention.
//
//   popText(parent, text, opts)          springy word-by-word Inter 800 type ('*word*' = Garamond accent, '|' = break)
//   track(keys, t)                       keyed world position: keys [[t, x, y, s, ease?, arc?]] → { x, y, s }
//   step(keys, t, def)                   the last keyed value at or before t: keys [[t, value]]
//   actor(ctx, t, A, opt)                one cast star: { color, glyph, kind: 'plain'|'auntie'|'booth', pos, mood, hops,
//                                        seed, tears, prop, ... } → the drawStarChar result
//   lessonBanner(ctx, t, t0, out)        ★ LESSON UNLOCKED (pixel panel, rays, shine, sparkle burst, +1 WISDOM)
//   SFX: wordPops, head, chip, scratch, womp, drumroll, levelUp, whistleBlow, crickets, cheer
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { easeOutBack } from '../wheel.js'
import { drawStarChar } from '../startalk.js'
import { drawPixelStar } from '../sky.js'
import { auntie, bmp, pixelPanel, sparkBurst, drawHearts, drawSweat, drawTears, eyesOf } from '../staunties/scenes/props.js'
import { starFrame, inSprite, headsetCells, tissueCells } from '../stlive5th/scenes/props.js'
import { drawWhistle, drawClipboard, drawCrown } from '../stintervention/scenes/props.js'

export { easeOutBack, bmp, pixelPanel, sparkBurst, drawHearts, drawSweat, drawTears, eyesOf, drawWhistle, drawClipboard, drawCrown, drawPixelStar }

export const W = 1080
export const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', LAV = '#c9a6ff', INK = '#1b1236', MINT = '#7fe08a', RED = '#ff5d73'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
export const SERIF = "'EB Garamond', Georgia, serif"
export const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
export const FONTS = ["800 112px Inter", "800 40px Inter", "700 50px Inter", "500 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 46px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 24px 'Space Mono'"]

export const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
export const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
export const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
export const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${clamp(a)})` }
export const inR = (t, [a, b]) => t >= a && t < b
export const R = (x, c, X, Y, w, h) => { x.fillStyle = c; x.fillRect(Math.round(X), Math.round(Y), Math.round(w), Math.round(h)) }

/** springy word-by-word type (the staunties headline) */
export function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, gap = 0.07, at: t0, times = null, colors = {}, late = 0, lateAt = null, lateGap = 0.1, wobble = false, lineHeight = 1.02, color = BONE }) {
  const box = el('div', { position: 'absolute', left: '50px', width: (W - 100) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const toks = text.split(' '), nW = toks.filter(w => w !== '|').length
  const ws = []
  let n = 0
  toks.forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: '0 0.12em', opacity: 0, transformOrigin: '50% 85%' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    if (colors[n]) style.color = colors[n]
    const big = late > 0 && n >= nW - late
    const wt = times ? times[n] : big ? lateAt + (n - (nW - late)) * lateGap : t0 + n * gap
    ws.push({ t: wt, big: big || !!times, e: el('span', style, box, w.replace(/\*/g, '')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.4 : 0.28))
        const sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        const rot = w.big && wobble && t > w.t ? 9 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const EASES = { io: ease.inOutCubic, out: ease.outCubic, in: ease.inCubic, back: p => easeOutBack(p, 1.8), spring: p => ease.spring(p, 0.2), cut: p => (p > 0 ? 1 : 0), lin: p => p }
/** keyed position. keys [[t, x, y, s, ease = 'io', arc = 0]]: each key is reached at its t, moving from the previous */
export function track(keys, t) {
  if (t <= keys[0][0]) return { x: keys[0][1], y: keys[0][2], s: keys[0][3] }
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i]
    if (t < k[0]) {
      const a = keys[i - 1], d = k[6] ?? Math.min(0.5, k[0] - a[0])           // move over the last `d` s before the key
      const p = prog(t, k[0] - d, k[0]), e = (EASES[k[4] || 'io'])(p)
      return { x: lerp(a[1], k[1], e), y: lerp(a[2], k[2], e) - Math.sin(Math.PI * clamp(p)) * (k[5] || 0), s: lerp(a[3], k[3], e) }
    }
  }
  const z = keys[keys.length - 1]
  return { x: z[1], y: z[2], s: z[3] }
}
export function step(keys, t, def) {
  let v = def
  for (const k of keys || []) { if (k[0] <= t) v = k[1]; else break }
  return v
}
/** a nod (down-up twice) */
export function nodK(t, t0) { const k = t - t0; if (k < 0 || k > 0.9) return 0; return Math.max(0, Math.sin(k / 0.45 * Math.PI)) * (k < 0.45 ? 1 : 0.8) }

/** one cast star.
 *  A = { color, glyph, kind, pos (track keys), mood ([[t, mood, lx, ly]]), hops, seed, in (pop-in t), out ([a, b]),
 *        tears ([[t, amount, fountain?]]), sweat ([[t, 0|1]]), shake ([[t, amp]]), squash ([[t, k]]), rot ([[t, rad]]),
 *        alpha ([[t, a]] eased 0.3 s), glasses (auntie: { frame, hi }), down ([[t, 0…1]]), prop: 'headset' |
 *        'whistle' | 'clipboard' | 'crown' | null, propCol, blow ([[t0, t1]] whistle blows) }
 *  opt = { C (camera fn {x, y, s} → screen), tOff } */
export function actor(x, t, A, { cam = null } = {}) {
  if (A.in != null && t < A.in) return null
  let pk = A.in != null ? pop01(t, A.in, 0.36, 2.2) : 1
  if (A.out) pk *= popOut(t, A.out)
  if (pk <= 0.01) return null
  let P = track(A.pos, t)
  if (cam) P = cam(P)
  const md = step(A.mood, t, ['neutral', 0, 0])
  const look = md[1] == null ? undefined : [md[1], md[2]]
  const shake = step(A.shake, t, 0), sq = step(A.squash, t, 0), rot = step(A.rot, t, 0)
  let al = 1
  if (A.alpha) { let a0 = 1, a1 = 1, ta = -1e9; for (const k of A.alpha) { if (k[0] <= t) { a0 = a1; a1 = k[1]; ta = k[0] } } al = lerp(a0, a1, ease.inOutQuad(prog(t, ta, ta + (A.fade || 0.35)))) }
  const sx = P.x + (shake ? Math.sin(t * 61 + (A.seed || 1)) * shake : 0)
  const blink = md[3]
  const opts = { color: A.color, glyph: P.s >= 150 ? A.glyph : null, mood: md[0], look, blink, squash: sq, hops: A.hops, seed: A.seed || 1, pop: pk, glow: A.glow ?? 0.9, alpha: al, bob: A.bob }
  x.save()
  if (rot) { x.translate(sx, P.y); x.rotate(rot); x.translate(-sx, -P.y) }
  let r
  if (A.kind === 'auntie') r = auntie(x, sx, P.y, P.s, t, { ...opts, glasses: { ...(A.glasses || {}), down: step(A.down, t, 0), fog: step(A.fog, t, 0) } })
  else r = drawStarChar(x, sx, P.y, P.s, t, opts)
  if (A.kind === 'booth' && pk > 0.05) {
    const F = starFrame(sx, P.y, P.s, t, { pop: pk, bob: A.bob, squash: sq, hops: A.hops, seed: A.seed || 1 })
    x.save(); x.globalAlpha *= al; inSprite(x, F, () => headsetCells(x, A.propCol || A.color)); x.restore()
  }
  if (A.tissue && step(A.tissue, t, 0)) {
    const F = starFrame(sx, P.y, P.s, t, { pop: pk, bob: A.bob, squash: sq, hops: A.hops, seed: A.seed || 1 })
    inSprite(x, F, () => tissueCells(x, 1))
  }
  x.restore()
  const cs = P.s * pk
  // props
  x.save(); x.globalAlpha *= al
  if (A.prop === 'crown') drawCrown(x, r.x + cs * 0.02, r.top + cs * 0.1, Math.max(3, cs / 34))
  if (A.prop === 'whistle' || A.whistle) {
    let bk = 0
    for (const [a, b] of A.blow || []) if (t >= a && t < b) bk = 0.6 + 0.4 * Math.sin((t - a) * 40)
    drawWhistle(x, r.x - cs * 0.47 + bk * 6, r.y - cs * 0.06, Math.max(3, cs / 30), { blow: bk })
  }
  if (A.prop === 'clipboard' || (Array.isArray(A.clipboard) ? step(A.clipboard, t, 0) : A.clipboard)) drawClipboard(x, r.x - cs * 0.62, r.y + cs * 0.04, Math.max(3, cs / 27), { rot: -0.14 + 0.05 * Math.sin(t * 2), strike: step(A.strike, t, 0) })
  x.restore()
  // tears / sweat
  const tr = step(A.tears, t, 0)
  if (tr && pk > 0.4 && al > 0.5) { const e = eyesOf(r); drawTears(x, t, e.ex, e.ey, e.dx, e.px, { amount: Array.isArray(tr) ? tr[0] : tr, seed: A.seed || 1, fountain: Array.isArray(tr) ? tr[1] : tr >= 1 }) }
  if (step(A.sweat, t, 0) && pk > 0.5) drawSweat(x, t, r.x + cs * 0.36, r.y - cs * 0.5, Math.max(4, Math.round(cs / 36)), al)
  return r
}

/** ★ LESSON UNLOCKED: banner centred at (cx, cy), in at t0, out over `out` [a, b] */
export function lessonBanner(x, t, t0, out, { cx = 540, cy = 520, w = 880, h = 150 } = {}) {
  if (t < t0 - 0.05 || t > out[1] + 0.05) return
  const k = easeOutBack(prog(t, t0, t0 + 0.38), 2.6) * (1 - ease.inCubic(prog(t, ...out)))
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.globalAlpha = 0.16 * clamp(k); x.fillStyle = GOLD
  x.rotate((t - t0) * 0.15)
  for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.beginPath(); x.moveTo(0, 0); x.lineTo(-60, -720); x.lineTo(60, -720); x.closePath(); x.fill() }
  x.restore()
  x.save(); x.translate(cx, cy); x.rotate((1 - clamp(k)) * -0.12 + Math.sin((t - t0) * 18) * 0.02 * Math.exp(-(t - t0) * 3)); x.scale(k, k)
  pixelPanel(x, -w / 2, -h / 2, w, h, { P: 10, glow: 0.8 })
  x.font = `700 62px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(6,4,18,0.9)'; x.fillText('★ LESSON UNLOCKED', 0, 8)
  x.fillStyle = GOLD; x.fillText('★ LESSON UNLOCKED', 0, 3)
  const sw = prog(t, t0 + 0.35, t0 + 0.95)
  if (sw > 0 && sw < 1) { x.save(); x.beginPath(); x.rect(-w / 2 + 10, -h / 2 + 10, w - 20, h - 20); x.clip(); x.fillStyle = 'rgba(255,248,220,0.35)'; x.translate(lerp(-w / 2 - 80, w / 2 + 80, sw), 0); x.rotate(0.35); x.fillRect(-26, -150, 52, 300); x.restore() }
  x.restore()
  sparkBurst(x, t, cx, cy, t0 + 0.05, { n: 16, R: 520, size: 34, seed: 2, life: 0.9 })
  sparkBurst(x, t, cx, cy, t0 + 0.25, { n: 10, R: 360, size: 24, seed: 5, life: 0.8 })
  const xp = prog(t, t0 + 0.45, t0 + 1.9)
  if (xp > 0 && xp < 1) { x.save(); x.globalAlpha = Math.sin(Math.PI * xp); x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.fillStyle = MINT; x.fillText('+1 WISDOM', cx + 300, cy - 100 - xp * 70); x.restore() }
}

/** a dim veil behind the lesson so the type always reads */
export function veil(x, t, t0, out, a = 0.5) {
  const k = clamp(prog(t, t0, t0 + 0.3)) * (1 - prog(t, ...out))
  if (k <= 0) return
  x.fillStyle = `rgba(5,4,12,${(a * k).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920)
}

/** a stepped pixel speech/chat bubble (w × h centred on cx, cy); tail: 'l' | 'r' | 'b' | null */
export function bubble(x, cx, cy, w, h, { fill = '#3d6cf2', tail = null, P = 8, shine = true } = {}) {
  const bx = cx - w / 2, by = cy - h / 2
  x.fillStyle = fill
  x.fillRect(bx + 2 * P, by, w - 4 * P, h); x.fillRect(bx, by + 2 * P, w, h - 4 * P); x.fillRect(bx + P, by + P, w - 2 * P, h - 2 * P)
  if (tail === 'b') for (let i = 0; i < 4; i++) x.fillRect(cx - P * (3 - i), cy + h / 2 + i * P, P * (6 - 2 * i), P)
  if (tail === 'l') for (let i = 0; i < 3; i++) x.fillRect(bx - P * (i + 1) + P, by + h - P * (3 - i) - P * 2, P, P * (3 - i))
  if (tail === 'r') for (let i = 0; i < 3; i++) x.fillRect(bx + w + P * i, by + h - P * (3 - i) - P * 2, P, P * (3 - i))
  if (shine) { x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(bx + 3 * P, by + P, w - 6 * P, P) }
}

/** wavy motion lines behind something moving (dir −1 / 1) */
export function speedLines(x, t, cx, cy, h, dir = -1, k = 1, col = BONE) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= 0.6 * k; x.fillStyle = col
  for (let i = 0; i < 5; i++) {
    const y = cy - h / 2 + (i + 0.5) * h / 5, L = 60 + ((i * 37) % 50) + 20 * Math.sin(t * 20 + i)
    x.fillRect(Math.round(cx + dir * (30 + (i % 2) * 20)), Math.round(y), Math.round(dir * L), 6)
  }
  x.restore()
}

// ── sound helpers (pop / pluck / bell are shifted into the score's key by the engine; chip / snare sit on music buses)
export const NOTE = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66]
export const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const head = (t0, n, land, base, gain = 0.026) => [...wordPops(t0, n, 0.08, base, gain), ['pop', land, 1046.5, 0.05, 0], ['pluck', land, 1046.5, 0.04, 0.6, 0]]
export const chip = (t, f, len, o = {}) => ['chip', +t.toFixed(3), f, len, { gain: 0.05, wave: 'square', duty: 0.25, decay: 0.12, sustain: 0.7, rev: 0.12, dly: 0.1, bus: 'lead', ...o }]
export const scratch = t => [chip(t, 1800, 0.11, { wave: 'noise', slide: 40, gain: 0.07, bus: 'drums', decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0 }), chip(t + 0.11, 4200, 0.2, { wave: 'noise', slide: -70, gain: 0.08, bus: 'drums', decay: 0.1, sustain: 0.6, rev: 0.08, dly: 0 }), ['tick', t, 0.06]]
/** the sad trombone, from a note f (Hz) */
export const womp = (t, f) => [[f, 0], [f * 0.944, 0.36], [f * 0.891, 0.72]].map(([g, d]) => chip(t + d, g, 0.3, { duty: 0.5, gain: 0.06, slide: -0.6, decay: 0.2, sustain: 0.6 })).concat([chip(t + 1.08, f * 0.841, 0.95, { duty: 0.5, gain: 0.06, slide: -2.2, vib: 0.03, decay: 0.4, sustain: 0.7 })])
export const drumroll = (t0, t1) => { const out = []; for (let t = t0; t < t1; t += 0.042) out.push(['snare', +t.toFixed(3), { gain: 0.04 + 0.11 * (t - t0) / (t1 - t0), tone: 210, decay: 0.07, snappy: 0.9, rev: 0.1 }]); return out }
/** the chiptune level-up arpeggio: root, third, fifth (Hz, octave 5) */
export const levelUp = (t, [r, th, fi]) => [[r, 0], [th, 0.065], [fi, 0.13], [r * 2, 0.195], [fi, 0.26], [r * 2, 0.325]].map(([f, d], i) => chip(t + d, f, i === 5 ? 0.55 : 0.07, { gain: 0.07, duty: 0.5, decay: 0.08, sustain: i === 5 ? 0.6 : 0.8, rev: 0.15, dly: 0.2 }))
  .concat([chip(t + 0.325, th * 2, 0.55, { gain: 0.04, duty: 0.25, decay: 0.2, sustain: 0.5, rev: 0.2, dly: 0.25 })])
/** a coach's whistle: a trilled high square with a pea-rattle vibrato */
export const whistleBlow = (t, len = 0.55) => [chip(t, 2950, len, { duty: 0.5, gain: 0.05, arp: [0, 1.5], decay: 0.05, sustain: 0.9, rev: 0.12, dly: 0, bus: 'drums' }), chip(t, 3010, len, { wave: 'noise', gain: 0.02, decay: 0.05, sustain: 0.8, rev: 0.05, dly: 0, bus: 'drums' })]
/** crickets: pairs of tiny high chirps */
export const crickets = (t0, t1, gain = 0.025) => { const out = []; for (let t = t0, i = 0; t < t1; t += 0.62, i++) for (let k = 0; k < 3; k++) out.push(chip(t + k * 0.05, 4400 + (i % 2) * 180, 0.03, { duty: 0.5, gain, decay: 0.02, sustain: 0.5, rev: 0.25, dly: 0.1, bus: 'drums' })); return out }
export const cheer = (t, len = 1.6, gain = 0.05) => [['swell', t, t + len, { gain, f0: 800, f1: 5000, bus: 'drums' }], ['glitter', t, t + Math.min(1, len)]]
export const flutter = (t0, n, gap, gain = 0.03) => Array.from({ length: n }, (_, i) => ['tick', +(t0 + i * gap).toFixed(3), gain * (1 - i / n * 0.5)])

/** readability check data: [[lines, close], ...] → per-line hold after typing (s), for the polish loop */
export function holds(boxes, lineTimes, cps) {
  const out = []
  for (const [lines, close] of boxes) {
    const lt = lineTimes(lines, { cps })
    lines.forEach((L, i) => out.push({ text: L.text, len: L.text.replace(/\*/g, '').length, hold: +(((i + 1 < lines.length ? lines[i + 1].t : close) - lt[i].done)).toFixed(2) }))
  }
  return out
}
