// Houston Star Talk · worker w03 (hst061–hst085): STORY episodes (STARTALK2 grammar on starrace/ep.js).
// Each story: setup → escalation → turn → payoff, then a ★ LESSON UNLOCKED beat, then the Jan 9 party ticket.
// story(E) wraps makeEpisode params: adds the sting, the lesson scene (with a chiptune level-up), the badge, the ticket,
// scene-local SFX (scene.sfx: [[lt, kind, …]]) and worn props (scene.wear: { sign: ['glasses' | 'headset' | …] }).
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, outside, room, table } from '../starrace/ep.js'
import { label, sparkles, pop01, starFrame, inSprite, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, partyCard, BRAKE, HGREEN, freeway, car, heatSun, coffeeShop, houses, kolache, klobasnek, soupPot } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
const r2 = v => Math.round(v * 100) / 100
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
export const Kin = (lt, a, d = 0.4) => ease.outCubic(prog(lt, a, a + d))

// ── sound ──────────────────────────────────────────────────────────────────────────────────────────────────
const ROOT = { C: 523.25, D: 587.33, E: 659.25, F: 698.46, G: 783.99, A: 880, B: 987.77 }
function sfx(kind, t, a = []) {
  const T = v => r2(v)
  switch (kind) {
    case 'womp': return [['pluck', T(t), 220, 0.07, 0.32, 0], ['pluck', T(t + 0.3), 207.65, 0.075, 0.9, 0]]
    case 'scratch': return [['whoosh', T(t), 0.2, 0.09], ['tick', T(t + 0.02), 0.05], ['tick', T(t + 0.1), 0.04]]
    case 'crickets': return [0, 0.22, 0.9, 1.12].map(d => ['chip', T(t + d), 4186, 0.07, { wave: 'square', duty: 0.25, gain: 0.012, decay: 0.05, sustain: 0.2, dly: 0 }])
    case 'roll': return Array.from({ length: Math.round((a[0] || 1) / 0.07) }, (_, i) => ['snare', T(t + i * 0.07), { gain: 0.05 + 0.05 * i / ((a[0] || 1) / 0.07), rev: 0.08 }])
    case 'sob': return [0, 0.16, 0.3, 0.5, 0.64].map((d, i) => ['pop', T(t + d), [659.25, 587.33, 523.25, 587.33, 493.88][i], 0.02, 0])
    case 'cheer': return [['glitter', T(t), T(t + 0.9)], ...[0, 0.12, 0.2, 0.31, 0.4, 0.52].map(d => ['clap', T(t + d), { gain: 0.12, pan: (d * 7 % 1) - 0.5 }])]
    case 'ding': return [['bell', T(t), a[0] || 1318.51, 0.04, 1.2, 0]]
    case 'boom': return [['boom', T(t), a[0] || 0.14]]
    case 'whoosh': return [['whoosh', T(t), 0.4, 0.05]]
    case 'pop': return [['pop', T(t), a[0] || 880, 0.035, 0]]
    case 'riser': return [['riser', T(t), T(t + (a[0] || 1))]]
    case 'tick': return [['tick', T(t), 0.04]]
    case 'thud': return [['tom', T(t), 90, { gain: 0.3 }]]
    case 'buzz': return [0, 0.08, 0.16, 0.24].map(d => ['chip', T(t + d), 140, 0.07, { wave: 'square', duty: 0.5, gain: 0.02, decay: 0.05, sustain: 0.5, dly: 0 }])
    case 'blip': return [['chip', T(t), a[0] || 1318.51, 0.08, { wave: 'square', duty: 0.25, gain: 0.025, decay: 0.06, sustain: 0.3, dly: 0.1 }]]
    case 'tape': return [['tapeStop', T(t), a[0] || 0.5]]
    default: return []
  }
}
function levelUp(t, key = 'C') {
  const r = ROOT[key] || ROOT.C, F = [1, 1.26, 1.5, 2].map(m => r * m)
  return [...F.map((f, i) => ['chip', r2(t + i * 0.08), f, i === 3 ? 0.5 : 0.08, { wave: 'square', duty: 0.25, gain: 0.03, decay: 0.08, sustain: i === 3 ? 0.5 : 0.3, vib: i === 3 ? 0.01 : 0, dly: 0.15 }]), ['glitter', r2(t + 0.3), r2(t + 1.1)]]
}

// ── worn props (sprite cells: the star is 36 × 36; eyes at (13.4, 19.2) and (22.6, 19.2)) ─────────────────────
const R = (c, i, j, w, h, col) => { c.fillStyle = col; c.fillRect(i, j, w, h) }
const WEAR = {
  glasses(c) {                       // the aunties' tiny reading glasses, low on the face, with a chain
    for (const ex of [13.4, 22.6]) { R(c, ex - 4, 18.6, 8, 1, INK); R(c, ex - 4, 23.4, 8, 1, INK); R(c, ex - 4, 18.6, 1, 5.8, INK); R(c, ex + 3, 18.6, 1, 5.8, INK); R(c, ex - 3, 19.6, 6, 3.8, 'rgba(190,230,255,0.28)'); R(c, ex - 2.6, 19.9, 1.4, 1, 'rgba(255,255,255,0.8)') }
    R(c, 17.4, 20, 1.2, 0.9, INK); for (let k = 0; k < 5; k++) { R(c, 9.2 - k * 0.5, 24.6 + k * 1.2, 0.9, 0.9, GOLD); R(c, 26.2 + k * 0.5, 24.6 + k * 1.2, 0.9, 0.9, GOLD) }
  },
  headset(c, col = '#5ec8ff') {      // the booth: a headset band, ear cups and a mic boom
    c.strokeStyle = INK; c.lineWidth = 2.2; c.beginPath(); c.arc(18, 19, 11.5, Math.PI * 1.08, Math.PI * 1.92); c.stroke(); c.strokeStyle = col; c.lineWidth = 1; c.stroke()
    for (const ex of [5.6, 27.4]) { R(c, ex, 15.5, 3.2, 6, INK); R(c, ex + 0.6, 16.1, 2, 4.8, col) }
    c.strokeStyle = INK; c.lineWidth = 1; c.beginPath(); c.moveTo(7.2, 21.5); c.quadraticCurveTo(8.5, 27.5, 14, 27); c.stroke(); R(c, 13.4, 26, 2.4, 2, INK)
  },
  clipboard(c) {                     // Virgo's clipboard, held at the right point
    c.save(); c.translate(31, 25); c.rotate(0.12)
    R(c, -5, -7, 10, 13, INK); R(c, -4.2, -6.2, 8.4, 11.4, '#a8723f'); R(c, -3.4, -4.6, 6.8, 9, BONE)
    for (let k = 0; k < 4; k++) R(c, -2.6, -3.4 + k * 2, k % 2 ? 4 : 5.2, 0.7, '#8a8a9a')
    R(c, -2, -7.6, 4, 2, '#8f96a0'); c.restore()
  },
  puffer(c, col = '#e05a3a') {       // a puffer coat and a beanie
    for (let k = 0; k < 3; k++) { R(c, 8.5, 25 + k * 2.6, 19, 2.6, INK); R(c, 9, 25.3 + k * 2.6, 18, 2, col) }
    R(c, 13.6, 6.4, 8.8, 4, INK); R(c, 14.2, 6.9, 7.6, 3, '#2b5fb0'); R(c, 14.2, 9.3, 7.6, 0.8, BONE); R(c, 17, 4.8, 2, 2, BONE)
  },
  shades(c) { for (const ex of [13.4, 22.6]) { R(c, ex - 3.6, 16, 7.2, 5.2, INK); R(c, ex - 3, 16.6, 6, 4, '#2b2140'); R(c, ex - 2.4, 17.2, 1.6, 0.8, 'rgba(255,255,255,0.75)') } R(c, 16.8, 17, 2.4, 1.2, INK) },
  crown(c) { R(c, 14, 4.4, 8, 3.2, INK); R(c, 14.6, 4.9, 6.8, 2.2, GOLD); for (const i of [14, 17.4, 20.8]) { R(c, i, 2, 1.2, 2.8, INK); R(c, i + 0.2, 2.2, 0.8, 2.4, GOLD) } },
  sweatband(c, col = BRAKE) { R(c, 8.6, 13.4, 18.8, 2.6, INK); R(c, 9.2, 13.9, 17.6, 1.6, col) },
  bow(c, col = PINK) { c.fillStyle = INK; c.beginPath(); c.moveTo(18, 6); c.lineTo(13.5, 3.5); c.lineTo(13.5, 8.5); c.closePath(); c.moveTo(18, 6); c.lineTo(22.5, 3.5); c.lineTo(22.5, 8.5); c.closePath(); c.fill(); R(c, 14.2, 4.6, 2.4, 2.8, col); R(c, 19.4, 4.6, 2.4, 2.8, col); R(c, 17, 5, 2, 2, col) },
  mic(c) { R(c, 27.5, 19, 3, 3, INK); R(c, 28, 19.5, 2, 2, '#c9c9d6'); R(c, 28.4, 21.8, 1.4, 6, INK) },
  tissue(c) { R(c, 27, 22, 5, 5, INK); R(c, 27.5, 22.5, 4, 4, '#ffffff'); R(c, 28.5, 20.6, 2, 2, '#ffffff') },
  apron(c, col = '#f4efe4') { R(c, 11.5, 22, 13, 10, INK); R(c, 12.2, 22.6, 11.6, 8.8, col); R(c, 15, 25, 6, 3, 'rgba(0,0,0,0.12)') },
  bib(c) { R(c, 12, 23, 12, 7, INK); R(c, 12.6, 23.6, 10.8, 5.8, BONE); R(c, 15.5, 25.2, 1.5, 2.6, INK); R(c, 18.5, 25.2, 1.5, 2.6, INK) },
  paddle(c) { c.save(); c.translate(31, 22); c.rotate(-0.5); R(c, -0.8, 2, 1.8, 6, INK); R(c, -3.4, -5, 7, 7.6, INK); R(c, -2.8, -4.4, 5.8, 6.4, '#3ad1a0'); c.restore() },
  tea(c) { R(c, 27, 22, 5, 5.5, INK); R(c, 27.5, 22.5, 4, 4.5, '#ffd6a5'); R(c, 28, 21, 3, 1.4, INK) },
}
function wearFront(s, t0) {
  const orig = s.front
  if (!s.wear) return orig
  return (x, t, lt, P) => {
    orig?.(x, t, lt, P)
    for (const [id, items] of Object.entries(s.wear)) {
      const p = P.at(id); if (!p || p[2] <= 0) continue
      const [cx, cy, size] = p, K = s.cast[id]
      let mv = false; for (let k = 1; k < K.length; k++) if (lt > K[k - 1][0] && lt < K[k][0] && (K[k][1] !== K[k - 1][1] || K[k][2] !== K[k - 1][2])) mv = true
      const bob = mv ? Math.abs(Math.sin(lt * 9)) * -22 : 0
      const talk = (s.lines || []).filter(l => l[2] === id).map(l => t0 + l[0])
      const hops = [...(s.hops?.[id] || []).map(h => t0 + h), ...talk].filter(h => h <= t).slice(-3)
      const F = starFrame(cx, cy + bob, size, t, { pop: pop01(t, t0 - 0.2, 0.3, 1.6), hops, seed: id.length + 3 })
      inSprite(x, F, () => { for (const it of [].concat(items)) { const [n, ...arg] = [].concat(it); WEAR[n]?.(x, ...arg) } })
    }
  }
}

// ── ★ LESSON UNLOCKED ────────────────────────────────────────────────────────────────────────────────────────
function fitTxt(x, s, cx, cy, o, maxW = 820) {
  x.font = `${o.italic ? 'italic ' : ''}${o.weight ?? 800} ${o.size}px ${o.font || INTER}`
  const w = x.measureText(s).width, size = w > maxW ? Math.floor(o.size * maxW / w) : o.size
  txt(x, s, cx, cy, { ...o, size })
}
export function lessonBanner(x, t, lt, lines, { cy = 860 } = {}) {
  const k = Kp(lt, 0.05, 0.35)
  if (k <= 0) return
  const H = 150 + lines.length * 92, top = cy - H / 2
  x.save(); x.translate(540, cy); x.scale(k, k); x.translate(-540, -cy)
  x.shadowColor = GOLD; x.shadowBlur = 36; box(x, 80, top, 920, H, '#140c2c', 10); x.shadowBlur = 0
  x.strokeStyle = GOLD; x.lineWidth = 6; x.strokeRect(96, top + 16, 888, H - 32)
  for (const [i, j] of [[96, top + 16], [978, top + 16], [96, top + H - 22], [978, top + H - 22]]) { x.fillStyle = GOLD; x.fillRect(i - 8, j - 8, 22, 22) }
  const tk = Kp(lt, 0.15, 0.3)
  x.save(); x.translate(540, top + 78); x.scale(tk, tk); x.fillStyle = PINK; x.fillRect(-330, -38, 660, 76); txt(x, '★ LESSON UNLOCKED', 0, 2, { size: 50, col: INK, font: MONO, weight: 700 }); x.restore()
  const a = clamp((lt - 0.7) / 0.35)
  x.globalAlpha = a
  lines.forEach((ln, j) => { const last = j === lines.length - 1; fitTxt(x, ln, 540, top + 170 + j * 92, last ? { size: 68, col: GOLD, font: SERIF, weight: 500, italic: true } : { size: 58, col: BONE }) })
  x.restore()
  if (lt > 0.25) sparkles(x, t, 540, cy, t - lt + 0.25, 16, 520, 9)
}

// ── the wrapper ──────────────────────────────────────────────────────────────────────────────────────────────
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.0, 0.35, 0.05]]
export function story(E) {
  let acc = 0
  const cues = [...STING, ...(E.cues || [])]
  const scenes = E.scenes.map(s => {
    const t0 = r2(acc); acc += s.dur
    for (const [lt, kind, ...a] of s.sfx || []) cues.push(...sfx(kind, t0 + lt, a))
    return { ...s, front: wearFront(s, t0) }
  })
  const L0 = r2(acc), LD = E.lessonDur || 4.6
  const ls = { dur: LD, set: E.lessonSet || ((x, t) => nightSet(x, t)), cast: E.lessonCast || {}, mood: E.lessonMood || {}, hops: E.lessonHops, wear: E.lessonWear,
    front: (x, t, lt) => lessonBanner(x, t, lt, E.lesson) }
  scenes.push({ ...ls, front: wearFront(ls, L0) })
  cues.push(...levelUp(L0 + 0.15, E.key))
  return {
    hook: E.hook, badge: BADGE, cues, endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: E.closing, stars: E.endStars }),
    scenes,
  }
}

// ── sets (backgrounds); the sky layer shows wherever a set leaves the top unpainted ───────────────────────────
export function nightSet(x, t, { ground = '#221b38', alpha = 0.85 } = {}) { skyline(x, FLOOR + 60, t, { alpha }); outside(x, { ground }) }
export function sunset(x, top = '#ff9a6b', mid = '#c75b8c', bot = '#3a2a6a', h = 1400) {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, bot); g.addColorStop(0.55, mid); g.addColorStop(1, top); x.fillStyle = g; x.fillRect(0, 0, 1080, h)
}
export function dayFill(x, top = '#8fd3ff', bot = '#ffe3b0', h = 1400) { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, h) }
export function tree(x, cx, base, s = 1, col = '#2f7a4a', t = 0) {
  box(x, cx - 16 * s, base - 160 * s, 32 * s, 160 * s, '#6b4a2c', 5)
  for (const [dx, dy, r] of [[-60, -200, 80], [50, -210, 85], [0, -270, 95], [-20, -170, 70], [40, -150, 60]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s + Math.sin(t + dx) * 3, base + dy * s, r * s + 6, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[-60, -200, 80], [50, -210, 85], [0, -270, 95], [-20, -170, 70], [40, -150, 60]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s + Math.sin(t + dx) * 3, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
}
export function stringLights(x, t, y = 330, cols = [GOLD, PINK, MINT, SKYB]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let xx = 0; xx <= 1080; xx += 20) x.lineTo(xx, y + 50 * Math.sin(Math.PI * ((xx % 360) / 360))); x.stroke()
  for (let k = 0; k < 18; k++) { const xx = 30 + k * 60, yy = y + 50 * Math.sin(Math.PI * ((xx % 360) / 360)) + 14, on = Math.sin(t * 3 + k) > -0.6; x.fillStyle = INK; x.fillRect(xx - 9, yy - 9, 18, 24); x.fillStyle = on ? cols[k % cols.length] : '#3a3050'; x.fillRect(xx - 6, yy - 6, 12, 18) }
}
/** a Heights porch: siding, a window, a rail, a swing, string lights */
export function porch(x, t, { wall = '#7fa8c9', trim = '#f4efe4' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60)
  for (let y = 0; y < FLOOR + 60; y += 44) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, y, 1080, 5) }
  box(x, 640, 760, 300, 340, '#ffd98a', 10); x.fillStyle = trim; x.fillRect(786, 760, 10, 340); x.fillRect(640, 925, 300, 10)
  box(x, 120, 700, 220, 560, '#6b4a2c', 8); x.fillStyle = GOLD; x.fillRect(300, 980, 16, 16)
  stringLights(x, t, 300)
  x.fillStyle = '#5a3e2a'; x.fillRect(0, FLOOR + 60, 1080, 560); for (let k = 0; k < 1080; k += 90) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k, FLOOR + 60, 5, 560) }
  for (let k = 0; k < 13; k++) box(x, 20 + k * 85, FLOOR + 160, 16, 170, trim, 4); box(x, 0, FLOOR + 140, 1080, 22, trim, 5)
}
/** a café/coffee interior with a window and a menu board */
export function cafe(x, t, { wall = '#3d2a4a', win = '#ffb36b' } = {}) {
  room(x, { wall, floor: '#4a3226', trim: '#1b1236' })
  box(x, 120, 640, 420, 420, win, 10); x.fillStyle = INK; x.fillRect(326, 640, 8, 420); x.fillRect(120, 846, 420, 8)
  skyline(x, 1060, t, { alpha: 0.5 })
  box(x, 640, 640, 320, 260, '#1b1236', 8); ['COFFEE', 'TEA', 'KOLACHES', 'TACOS'].forEach((s, i) => txt(x, s, 800, 690 + i * 56, { size: 30, col: i % 2 ? GOLD : BONE, font: MONO, weight: 700 }))
}
/** a pond with trees (a park morning or a sunset) */
export function pond(x, t, { water = '#3f8fb0', grass = '#3f8a4a', sky = null } = {}) {
  if (sky) sunset(x, ...sky)
  for (const [cx, s] of [[90, 1.1], [300, 0.8], [800, 0.9], [1010, 1.2]]) tree(x, cx, 1000, s, '#2f6a3a', t)
  x.fillStyle = grass; x.fillRect(0, 990, 1080, 120)
  x.fillStyle = water; x.fillRect(0, 1100, 1080, 820)
  for (let k = 0; k < 14; k++) { const ph = (t * 0.4 + k * 0.17) % 1; x.fillStyle = 'rgba(255,255,255,0.25)'; x.fillRect(((k * 173) + ph * 120) % 1080, 1160 + (k * 97) % 700, 70, 6) }
}
export function paddleBoat(x, cx, cy, col = '#ff8fb1', rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -230, -20, 460, 90, col, 8); box(x, -200, -120, 400, 24, BONE, 6); box(x, -190, -100, 20, 80, BONE, 4); box(x, 170, -100, 20, 80, BONE, 4)
  for (const wx of [-240, 240]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 40, 40, 0, Math.PI * 2); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(wx, 40, 30, 0, Math.PI * 2); x.fill() }
  x.restore()
}
export function duck(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -40, -10, 80, 40, '#f4efe4', 5); box(x, 20, -44, 34, 34, '#f4efe4', 5); box(x, 54, -32, 22, 12, '#ff9a3c', 3); x.fillStyle = INK; x.fillRect(38, -34, 7, 7)
  x.restore()
}
/** a museum gallery: white wall, frames (abstract), a bench */
export function museum(x, t, { wall = '#efe9de' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, FLOOR + 60); x.fillStyle = '#c9bfae'; x.fillRect(0, FLOOR + 60, 1080, 600)
  const F = [[200, 760, 260, 340, ['#2b5fb0', '#f2c75c']], [540, 720, 280, 380, ['#c0304a', '#1b1236']], [880, 760, 240, 320, ['#7dbf5a', '#ff8fb1']]]
  for (const [cx, cy, w, h, [a, b]] of F) { box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, '#b08a4a', 8); x.fillStyle = a; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = b; x.fillRect(cx - w / 2 + 30, cy - h / 2 + h * 0.45, w - 60, h * 0.4) }
  for (let k = 0; k < 3; k++) { x.fillStyle = 'rgba(255,240,200,0.18)'; x.beginPath(); x.moveTo(200 + k * 340, 0); x.lineTo(120 + k * 340, 520); x.lineTo(280 + k * 340, 520); x.fill() }
}
/** a Bellaire-style food street at night: neon shop signs (generic words), lanterns */
export function foodStreet(x, t, { words = ['BOBA', 'PHO', 'HOT POT', 'KARAOKE', 'BAKERY', 'NOODLES'] } = {}) {
  x.fillStyle = '#120d26'; x.fillRect(0, 0, 1080, FLOOR + 60)
  const cols = [PINK, MINT, GOLD, SKYB, LAV, '#ff9a3c']
  words.slice(0, 6).forEach((w, i) => {
    const cx = 190 + (i % 3) * 350, cy = 560 + Math.floor(i / 3) * 300, on = Math.sin(t * 2.4 + i * 1.3) > -0.85
    box(x, cx - 160, cy - 110, 320, 240, '#24183f', 6)
    x.save(); if (on) { x.shadowColor = cols[i]; x.shadowBlur = 30 } txt(x, w, cx, cy - 40, { size: w.length > 6 ? 46 : 56, col: on ? cols[i] : '#4a3a6a' }); x.restore()
    box(x, cx - 120, cy + 10, 240, 100, '#ffd98a', 5)
  })
  for (let k = 0; k < 7; k++) { const cx = 80 + k * 155, sw = Math.sin(t * 1.6 + k) * 6; x.fillStyle = INK; x.fillRect(cx - 26 + sw, 330, 52, 66); x.fillStyle = BRAKE; x.fillRect(cx - 20 + sw, 336, 40, 54); x.fillStyle = GOLD; x.fillRect(cx - 20 + sw, 360, 40, 6) }
  outside(x, { ground: '#2a2340' })
}
/** a backyard crawfish boil: fence, newspaper table, steaming pot */
export function boilYard(x, t) {
  sunset(x, '#ffb36b', '#d9708c', '#4a3070', FLOOR)
  for (let k = 0; k < 12; k++) box(x, k * 92, 820, 84, 520, '#8a6a4a', 4)
  stringLights(x, t, 340)
  x.fillStyle = '#3f6a3a'; x.fillRect(0, FLOOR + 60, 1080, 600)
  soupPot(x, 900, 1250, t)
}
export function newspaperTable(x, cx = 540, top = 1300, w = 760) {
  box(x, cx - w / 2, top, w, 40, '#e9e4d6', 6); for (let k = 0; k < 7; k++) { x.fillStyle = '#9a968a'; x.fillRect(cx - w / 2 + 20 + k * 100, top + 10, 70, 6); x.fillRect(cx - w / 2 + 20 + k * 100, top + 22, 50, 6) }
  box(x, cx - w / 2 + 40, top + 46, 30, 200, '#6b4a2c'); box(x, cx + w / 2 - 70, top + 46, 30, 200, '#6b4a2c')
}
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const B = ['..KK.....KK..', '.KrrK...KrrK.', '..KrrKKKrrK..', '....KrrrK....', '....KrrrK....', '....KrrrK....', '...KrrrrrK...', '....KrrrK....', '...KrK.KrK...'], col = { K: INK, r: '#d8402a' }
  B.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') { x.fillStyle = col[ch]; x.fillRect((i - 6.5) * 6, (j - 4.5) * 6, 6, 6) } }))
  x.restore()
}
/** the Waugh-style bat bridge at sunset; n bats stream out from under the deck */
export function batBridge(x, t, n = 0) {
  sunset(x, '#ffb36b', '#e0708c', '#3a2a6a', FLOOR + 60)
  skyline(x, 1000, t, { alpha: 0.55 })
  x.fillStyle = '#2f5a4a'; x.fillRect(0, 1080, 1080, 300); x.fillStyle = '#3a6a8a'; x.fillRect(0, 1140, 1080, 160)
  box(x, 0, 980, 1080, 70, '#8f96a0', 8); for (let k = 0; k < 6; k++) box(x, 60 + k * 190, 1050, 40, 90, '#8f96a0', 5)
  for (let k = 0; k < 24; k++) box(x, k * 46, 930, 8, 50, '#c9c9d6', 2); box(x, 0, 926, 1080, 10, '#c9c9d6', 3)
  for (let k = 0; k < n; k++) { const ph = (t * 0.35 + k * 0.137) % 1, bx = (k * 211 + ph * 900) % 1080, by = 1040 - ph * 760 + Math.sin(t * 6 + k) * 20, f = Math.sin(t * 18 + k) > 0
    x.fillStyle = INK; x.fillRect(bx - 4, by - 3, 8, 6); if (f) { x.fillRect(bx - 16, by - 8, 12, 4); x.fillRect(bx + 4, by - 8, 12, 4) } else { x.fillRect(bx - 16, by + 2, 12, 4); x.fillRect(bx + 4, by + 2, 12, 4) } }
  x.fillStyle = '#2a3a2a'; x.fillRect(0, FLOOR + 60, 1080, 600)
}
/** downtown tunnel: low ceiling, tile, shuttered shops, arrows */
export function tunnel(x, t, { tile = '#d9d2c4', arrows = ['EXIT', 'FOOD', 'EXIT?'] } = {}) {
  x.fillStyle = '#efe9de'; x.fillRect(0, 0, 1080, 1920)
  x.fillStyle = '#bdb4a2'; x.fillRect(0, 0, 1080, 520); for (let k = 0; k < 6; k++) { x.fillStyle = '#fff6d8'; x.fillRect(80 + k * 180, 470, 120, 22) }
  for (let k = 0; k < 4; k++) { box(x, 40 + k * 260, 640, 220, 520, '#8f96a0', 6); for (let j = 0; j < 9; j++) { x.fillStyle = '#7a8290'; x.fillRect(40 + k * 260, 660 + j * 56, 220, 6) } }
  arrows.forEach((s, i) => { const cx = 200 + i * 340; box(x, cx - 130, 560, 260, 60, HGREEN, 4); txt(x, s + (i % 2 ? ' →' : ' ←'), cx, 592, { size: 30, col: BONE, font: MONO, weight: 700 }) })
  x.fillStyle = tile; x.fillRect(0, FLOOR + 60, 1080, 600); for (let k = 0; k < 1080; k += 80) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(k, FLOOR + 60, 4, 600) }
}
/** Galveston: brown-green water, sand, the seawall, a gull */
export function beach(x, t, { sky = ['#ffd08a', '#ff9a8a', '#6a5aa0'] } = {}) {
  sunset(x, ...sky, 1100)
  x.fillStyle = '#ffe08a'; x.beginPath(); x.arc(760, 980, 90, Math.PI, 0); x.fill()
  x.fillStyle = '#8a7a4a'; x.fillRect(0, 980, 1080, 220)
  for (let k = 0; k < 10; k++) { const ph = (t * 0.5 + k * 0.1) % 1; x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect((k * 131 + ph * 200) % 1080, 1000 + (k * 37) % 180, 90, 6) }
  x.fillStyle = '#e8cf98'; x.fillRect(0, 1200, 1080, 720)
  x.fillStyle = '#b8a888'; x.fillRect(0, 1200, 1080, 20)
}
export function gull(x, cx, cy, t, s = 1) { const f = Math.sin(t * 10) > 0 ? -1 : 1; x.save(); x.translate(cx, cy); x.scale(s, s); x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(-40, 10 * f); x.quadraticCurveTo(-20, -14 * f, 0, 0); x.quadraticCurveTo(20, -14 * f, 40, 10 * f); x.stroke(); x.strokeStyle = BONE; x.lineWidth = 4; x.stroke(); x.restore() }
/** a living room: couch, lamp, a lace doily, a window with stars */
export function livingRoom(x, t, { wall = '#5a3a5a', couch = '#c0603a' } = {}) {
  room(x, { wall, floor: '#3b2a1e', trim: '#1b1236' })
  box(x, 680, 520, 300, 260, '#0b0820', 10); for (let k = 0; k < 12; k++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + k * 1.7)); x.fillStyle = `rgba(239,230,214,${a.toFixed(2)})`; x.fillRect(700 + (k * 97) % 260, 540 + (k * 53) % 220, 6, 6) }
  box(x, 90, 520, 20, 640, '#8a6a4a', 4); x.fillStyle = INK; x.beginPath(); x.moveTo(30, 520); x.lineTo(170, 520); x.lineTo(140, 430); x.lineTo(60, 430); x.fill(); x.fillStyle = '#ffd98a'; x.beginPath(); x.moveTo(40, 514); x.lineTo(160, 514); x.lineTo(134, 438); x.lineTo(66, 438); x.fill()
  box(x, 160, 1220, 760, 170, couch, 8); box(x, 160, 1120, 760, 110, couch, 8); box(x, 130, 1150, 60, 240, couch, 6); box(x, 890, 1150, 60, 240, couch, 6)
}
export function doily(x, cx, cy, w = 320) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, w / 2 + 6, 36, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.ellipse(cx, cy, w / 2, 30, 0, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; x.fillStyle = '#d9d0c0'; x.beginPath(); x.arc(cx + Math.cos(a) * w * 0.38, cy + Math.sin(a) * 22, 7, 0, Math.PI * 2); x.fill() } }
/** a food truck (generic) with a menu and a window */
export function foodTruck(x, t, { col = '#ff9a3c', word = 'TACOS', menu = ['FLOUR', 'CORN', 'BEAN & CHEESE', 'MIGAS'] } = {}) {
  dayFill(x, '#8fd3ff', '#ffe3b0', FLOOR + 60)
  box(x, 90, 520, 900, 620, col, 10); box(x, 160, 640, 460, 260, '#1b1236', 8); box(x, 680, 600, 260, 360, BONE, 6)
  txt(x, word, 390, 580, { size: 64, col: INK })
  menu.forEach((m, i) => txt(x, m, 810, 650 + i * 70, { size: m.length > 8 ? 26 : 34, col: INK, font: MONO, weight: 700 }))
  for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? BONE : BRAKE; x.fillRect(160 + k * 57, 610, 57, 30) }
  for (const wx of [260, 820]) { x.fillStyle = INK; x.beginPath(); x.arc(wx, 1150, 64, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(wx, 1150, 28, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#b8a88a'; x.fillRect(0, FLOOR + 60, 1080, 600)
}
/** a pickleball court (generic) */
export function court(x, t) {
  dayFill(x, '#7cc8ff', '#ffe3b0', 1000)
  x.fillStyle = '#2f7a9a'; x.fillRect(0, 1000, 1080, 920); x.fillStyle = '#3aa0b0'; x.fillRect(80, 1060, 920, 800)
  x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(80, 1060, 920, 800); x.beginPath(); x.moveTo(540, 1060); x.lineTo(540, 1860); x.stroke()
  for (let k = 0; k < 24; k++) { x.fillStyle = INK; x.fillRect(80 + k * 38, 1000, 4, 60) } box(x, 80, 990, 920, 12, BONE, 3)
  for (let k = 0; k < 10; k++) box(x, k * 112, 820, 8, 180, '#8f96a0', 2)
}
export function ball(x, cx, cy, s = 1) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 24 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8ff5a'; x.beginPath(); x.arc(cx, cy, 19 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = INK; for (const [a, b] of [[-6, -6], [6, 4], [-2, 8]]) x.fillRect(cx + a * s - 2, cy + b * s - 2, 4, 4) }
/** a karaoke room: a screen with lyric bars, mirror-ball dots */
export function karaoke(x, t, { lyric = '♪ la la la ♪' } = {}) {
  x.fillStyle = '#1a0f30'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 40; k++) { const a = t * 0.6 + k * 0.7, px = 540 + Math.cos(a) * (200 + (k * 53) % 400), py = 900 + Math.sin(a * 1.3) * (200 + (k * 31) % 300); x.fillStyle = [PINK, SKYB, GOLD][k % 3]; x.globalAlpha = 0.35; x.fillRect(px, py, 10, 10) } x.globalAlpha = 1
  box(x, 160, 460, 760, 420, '#0e1630', 10); txt(x, lyric, 540, 640, { size: 52, col: BONE }); x.fillStyle = PINK; x.fillRect(220, 720, 640 * ((t * 0.3) % 1), 12)
  x.fillStyle = '#2a1d52'; x.fillRect(0, FLOOR + 60, 1080, 600)
}
/** Memorial-style park loop at dawn: trees, the trail, a mile marker */
export function trail(x, t, { sky = ['#ffc38a', '#e08aa0', '#4a3a80'] } = {}) {
  sunset(x, ...sky, FLOOR + 60)
  for (const [cx, s] of [[60, 1.3], [260, 1], [480, 1.2], [700, 0.9], [900, 1.3], [1060, 1]]) tree(x, cx, 1170, s, '#2f5a3a', t)
  x.fillStyle = '#3f6a3a'; x.fillRect(0, 1150, 1080, 800); x.fillStyle = '#c9a77a'; x.fillRect(0, 1300, 1080, 200)
  box(x, 940, 1150, 70, 160, BONE, 5); txt(x, 'MI', 975, 1190, { size: 26, col: INK, font: MONO, weight: 700 }); txt(x, '1', 975, 1240, { size: 46, col: INK })
}
/** an urban lawn downtown (park): grass, skyline, trees */
export function lawn(x, t, { grass = '#4a9a4a' } = {}) { skyline(x, 1080, t, { alpha: 0.9 }); x.fillStyle = grass; x.fillRect(0, 1070, 1080, 850); for (const [cx, s] of [[120, 0.8], [960, 0.9]]) tree(x, cx, 1160, s, '#2f6a3a', t) }
/** a feeder road beside a freeway: an overpass and two coffee shops on opposite sides */
export function feederTwo(x, t) {
  dayFill(x, '#ffb88a', '#ffe3b0', FLOOR + 60)
  box(x, 0, 760, 1080, 70, '#8f96a0', 8); for (let k = 0; k < 4; k++) box(x, 120 + k * 260, 830, 50, 300, '#8f96a0', 6)
  for (let k = 0; k < 5; k++) car(x, ((t * 220 + k * 260) % 1400) - 160, 742, ['#5ec8ff', '#ff8fb1', '#f2c75c', '#7dffb0', BONE][k], { s: 0.45 })
  x.fillStyle = '#2a2638'; x.fillRect(0, 1140, 1080, 250)
}
/** a shopping street (Rice Village-ish): shopfronts, parked cars, one tree of shade */
export function shopStreet(x, t, sun = true) {
  dayFill(x, '#8fd3ff', '#fff0c0', FLOOR + 60)
  if (sun) heatSun(x, 900, 260, t, 80)
  const C = ['#e08a6a', '#7fa8c9', '#c9a6ff', '#f2c75c']; for (let k = 0; k < 4; k++) { box(x, 20 + k * 265, 640, 245, 520, C[k], 6); box(x, 50 + k * 265, 820, 185, 200, '#bfe6ff', 5); box(x, 40 + k * 265, 700, 205, 60, BONE, 4) }
  x.fillStyle = '#2a2638'; x.fillRect(0, 1180, 1080, 210); for (let k = 0; k < 1080; k += 200) { x.fillStyle = BONE; x.fillRect(k, 1280, 100, 8) }
}
/** a backyard table at a family house (Katy) */
export function familyYard(x, t) { dayFill(x, '#8fd3ff', '#ffe8c0', FLOOR + 60); houses(x, 1000, t); x.fillStyle = '#5a9a4a'; x.fillRect(0, 990, 1080, 930); for (let k = 0; k < 12; k++) box(x, k * 92, 860, 84, 140, '#b08a6a', 4) }
/** a generic phone with chat bubbles (no app UI): msgs [[side 'l'|'r', text, at]] */
export function phone(x, cx, cy, lt, msgs, { w = 520, h = 760, typing = -1 } = {}) {
  box(x, cx - w / 2, cy - h / 2, w, h, '#14102a', 12); x.fillStyle = '#f4efe4'; x.fillRect(cx - w / 2 + 20, cy - h / 2 + 50, w - 40, h - 100)
  x.fillStyle = INK; x.fillRect(cx - 50, cy - h / 2 + 18, 100, 14)
  let y = cy - h / 2 + 110
  for (const [side, s, at] of msgs) {
    if (lt < at) continue
    const k = Kp(lt, at, 0.25); x.font = `800 34px ${INTER}`; const tw = Math.min(w - 120, x.measureText(s).width + 40)
    const bx = side === 'r' ? cx + w / 2 - 40 - tw : cx - w / 2 + 40
    x.save(); x.translate(bx + tw / 2, y); x.scale(k, k); box(x, -tw / 2, -30, tw, 60, side === 'r' ? '#5ec8ff' : '#e3dccf', 4); txt(x, s, 0, 2, { size: 34, col: INK }); x.restore()
    y += 90
  }
  if (typing >= 0 && lt > typing) { const n = Math.floor(lt * 3) % 4; box(x, cx - w / 2 + 40, y - 30, 130, 60, '#e3dccf', 4); for (let k = 0; k < 3; k++) { x.fillStyle = k < n ? INK : '#9a968a'; x.fillRect(cx - w / 2 + 72 + k * 30, y - 6, 14, 14) } }
}
/** party lights + confetti + the Jan 9 banner (date only: no venue, time or price) */
export function partySet(x, t, lt = 99) {
  x.fillStyle = '#1a0f30'; x.fillRect(0, 0, 1080, FLOOR + 60); stringLights(x, t, 320)
  for (let k = 0; k < 26; k++) { const ph = (t * 0.25 + k / 26) % 1; x.fillStyle = [GOLD, PINK, SKYB, MINT][k % 4]; x.fillRect(40 + (k * 137) % 1000, 380 + ph * 950, 14, 22) }
  label(x, 540, 560, 'BETA PARTY · JAN 9', Kp(lt, 0.1), { size: 50, bg: GOLD, rot: -0.03 })
  x.fillStyle = '#2a1d52'; x.fillRect(0, FLOOR + 60, 1080, 600)
}
export function heartPop(x, t, lt, cx, cy, at = 0) { if (lt > at) sparkles(x, t, cx, cy, t - lt + at, 10, 200, 4, [PINK, GOLD, BONE]) }
export function mosquito(x, cx, cy, t, s = 1) { x.save(); x.translate(cx + Math.sin(t * 7) * 30, cy + Math.cos(t * 9) * 20); x.scale(s, s); x.fillStyle = INK; x.fillRect(-10, -4, 20, 8); x.fillRect(10, -2, 14, 3); const f = Math.sin(t * 40) > 0; x.fillStyle = 'rgba(200,230,255,0.8)'; x.fillRect(-8, f ? -16 : -12, 10, 10); x.fillRect(2, f ? -16 : -12, 10, 10); x.restore() }
export function painting(x, cx, cy, w, h, a, b) { box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, '#b08a4a', 8); x.fillStyle = a; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = b; x.fillRect(cx - w / 2 + 24, cy - h / 2 + h * 0.4, w - 48, h * 0.45) }
export function bowl(x, cx, cy, t, col = '#d98a4a') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 86, 0, Math.PI); x.fill(); x.fillStyle = '#f4efe4'; x.beginPath(); x.arc(cx, cy, 78, 0, Math.PI); x.fill(); x.fillStyle = col; x.fillRect(cx - 78, cy - 8, 156, 14); for (let k = 0; k < 3; k++) { const ph = (t * 0.6 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 5; x.beginPath(); x.moveTo(cx - 30 + k * 30, cy - 20 - ph * 90); x.quadraticCurveTo(cx - 10 + k * 30, cy - 50 - ph * 90, cx - 30 + k * 30, cy - 80 - ph * 90); x.stroke() } }
export { kolache, klobasnek, coffeeShop, car, freeway, heatSun, table, houses }
