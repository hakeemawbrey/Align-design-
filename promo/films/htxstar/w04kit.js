// Houston Star Talk, batch w04 (story format, hst086–hst110): the story builder, the ★ LESSON UNLOCKED beat, the
// season-2 cast props (reading glasses, headsets, clipboard…) and Houston sets. Built on starrace/ep.js + htxstar/kit.js;
// nothing here edits a shared file. Everything is a pure function of t; no `document` at module top level.
import { clamp, prog, ease, lerp } from '../../src/lib.js'
import { FLOOR, box, txt, outside } from '../starrace/ep.js'
import { label, sparkles, pop01, hearts, starFrame, inSprite, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, partyCard, BRAKE, HGREEN } from './kit.js'

export const Y = 1255
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const r2 = v => Math.round(v * 100) / 100
const KEYF = { C: 523.25, Db: 554.37, D: 587.33, Eb: 622.25, E: 659.25, F: 698.46, Gb: 739.99, G: 783.99, Ab: 830.61, A: 880, Bb: 932.33, B: 987.77 }

// ── text helpers
export function fit(x, s, cx, cy, maxW, o = {}) {
  let size = o.size || 60
  x.font = `${o.italic ? 'italic ' : ''}${o.weight ?? 800} ${size}px ${o.font || INTER}`
  const w = x.measureText(s).width; if (w > maxW) size = Math.floor(size * maxW / w)
  txt(x, s, cx, cy, { ...o, size })
}
export function night(x, t, ground = '#221b38') { skyline(x, FLOOR + 60, t, { alpha: 0.85 }); outside(x, { ground }) }
export function sky(x, top, bot, h = FLOOR + 60) { const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, h) }
export function sun(x, cx, cy, r, col = '#ffd36b') { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 6, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill() }
export function ground(x, col, y = FLOOR + 60) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }
export function tree(x, cx, base, s = 1, col = '#2f7a46') {
  box(x, cx - 14 * s, base - 160 * s, 28 * s, 160 * s, '#6b4a2c', 5)
  for (const [dx, dy, r] of [[0, -230, 90], [-70, -180, 70], [70, -180, 70], [0, -300, 60]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 6) * s, 0, Math.PI * 2); x.fill() }
  for (const [dx, dy, r] of [[0, -230, 90], [-70, -180, 70], [70, -180, 70], [0, -300, 60]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, Math.PI * 2); x.fill() }
}
export function stringLights(x, t, y = 330, cols = [GOLD, PINK, MINT, SKYB]) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); for (let k = 0; k <= 1080; k += 20) x.lineTo(k, y + 40 * Math.sin(Math.PI * ((k % 360) / 360))); x.stroke()
  for (let k = 0; k < 18; k++) { const px = 30 + k * 60, py = y + 40 * Math.sin(Math.PI * (((px) % 360) / 360)) + 14, on = Math.sin(t * 3 + k) > -0.6; x.fillStyle = on ? cols[k % cols.length] : '#3a3050'; x.beginPath(); x.arc(px, py, 11, 0, Math.PI * 2); x.fill() }
}

// ── the story builder: scenes + the LESSON beat + the party ticket, scene-relative sfx, the frame-0 sting
// D = { hook, key, scenes: [scene + { props: { id: 'glasses' | … }, sfx: [[kind, lt, …args]] }], lesson: { lines, cast, mood, line }, close, stars }
export function story(D) {
  const scenes = [...D.scenes, lessonScene(D.lesson, D.key)].map(withProps)
  let acc = 0
  const f0 = KEYF[D.key || 'D']
  const cues = [['bell', 0.02, 1046.5, 0.035, 1.4, 0], ['tom', 0.0, 130, { gain: 0.22 }], ['marimba', 0.05, f0 * 2, { gain: 0.05 }]]
  for (const s of scenes) { for (const [k, lt, ...a] of s.sfx || []) cues.push([k, r2(acc + lt), ...a]); acc += s.dur }
  return {
    hook: D.hook, badge: BADGE, cues, endLen: D.endLen ?? 6.2,
    end: (x, t, lt) => { x.fillStyle = `rgba(8,5,22,${(0.92 * clamp(lt / 0.4)).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920); partyCard(x, t, lt, { line: D.close, stars: D.stars }) },
    scenes,
  }
}
export const music = (id, style, key, seed, DURATION) => ({ id, duration: DURATION, music: { style, key, seed, lufs: -26, musicRel: -15, crackle: false, sections: { drop: 0.0, outroAt: DURATION - 2.4 } } })

// sfx shorthands (scene-relative); calm mode keeps bell/pluck/marimba/fmbell/tom/swell
export const SFX = {
  womp: lt => ['tom', lt, 70, { gain: 0.3, decay: 0.6 }],
  thud: lt => ['tom', lt, 95, { gain: 0.26 }],
  boing: lt => ['marimba', lt, 392, { gain: 0.06 }],
  ding: lt => ['bell', lt, 1318.5, 0.03, 1.2, 0],
  gasp: lt => ['fmbell', lt, 1567.98, { gain: 0.035 }],
  cheer: lt => ['swell', lt, lt + 1.2, { gain: 0.05 }],
  pluck: (lt, f = 880) => ['pluck', lt, f, 0.05, 0.45, 0],
  cricket: lt => ['marimba', lt, 2093, { gain: 0.03, decay: 0.12 }],
}

// ── props that ride on a star's sprite (same frame maths as ep.js: hops = scene hops + line starts, seed = id.length + 3)
function castAt(s, id, lt) {
  const K = s.cast[id]; if (!K) return null
  if (lt <= K[0][0]) return [K[0][1], K[0][2], K[0][3] ?? 260]
  for (let k = 1; k < K.length; k++) if (lt < K[k][0]) {
    const a = K[k - 1], b = K[k], u = ease.inOutCubic(prog(lt, a[0], b[0]))
    return [lerp(a[1], b[1], u), lerp(a[2], b[2], u) - Math.sin(Math.PI * u) * (Math.abs(b[1] - a[1]) > 60 ? 40 : 0), lerp(a[3] ?? 260, b[3] ?? a[3] ?? 260, u)]
  }
  const z = K[K.length - 1]; return [z[1], z[2], z[3] ?? 260]
}
function moving(s, id, lt) { const K = s.cast[id]; for (let k = 1; k < K.length; k++) if (lt > K[k - 1][0] && lt < K[k][0] && (K[k][1] !== K[k - 1][1] || K[k][2] !== K[k - 1][2])) return true; return false }
export function frameOf(s, id, t, lt) {
  const p = castAt(s, id, lt); if (!p || p[2] <= 0) return null
  const t0 = t - lt
  const hops = [...(s.hops?.[id] || []).map(h => t0 + h), ...(s.lines || []).filter(l => l[2] === id).map(l => t0 + l[0])].filter(h => h <= t).slice(-3)
  const bob = moving(s, id, lt) ? Math.abs(Math.sin(lt * 9)) * -22 : 0
  return starFrame(p[0], p[1] + bob, p[2], t, { pop: pop01(t, t0 - 0.2, 0.3, 1.6), hops, seed: id.length + 3 })
}
function withProps(s) {
  if (!s.props) return s
  const front = s.front
  return { ...s, front: (x, t, lt, P) => { front?.(x, t, lt, P); for (const [id, kinds] of Object.entries(s.props)) { const F = frameOf(s, id, t, lt); if (F) for (const k of [].concat(kinds)) PROP[k]?.(x, F, t) } } }
}
const R = (x, i, j, w, h, col) => { x.fillStyle = col; x.fillRect(i, j, w, h) }
export const PROP = {
  glasses: (x, F) => inSprite(x, F, () => {   // tiny pixel reading glasses (the aunties)
    for (const i of [9, 20]) { R(x, i, 15.5, 7.5, 1, INK); R(x, i, 21.5, 7.5, 1, INK); R(x, i, 15.5, 1, 7, INK); R(x, i + 6.5, 15.5, 1, 7, INK); x.fillStyle = 'rgba(191,230,255,0.28)'; x.fillRect(i + 1, 16.5, 5.5, 5) }
    R(x, 16.5, 17, 3.5, 1, INK); R(x, 6, 16.5, 3, 1, INK); R(x, 27.5, 16.5, 3, 1, INK)
    R(x, 4, 17.5, 1, 7, GOLD); R(x, 31, 17.5, 1, 7, GOLD)        // the bead chain
  }),
  headset: (x, F) => inSprite(x, F, () => {   // the booth's headsets (one shared mic)
    x.strokeStyle = INK; x.lineWidth = 2.2; x.beginPath(); x.arc(18, 17, 14.5, Math.PI * 1.08, Math.PI * 1.92); x.stroke()
    x.strokeStyle = '#8f96a0'; x.lineWidth = 1.1; x.stroke()
    for (const i of [2.5, 30]) { R(x, i - 0.6, 12.4, 4.7, 7.2, INK); R(x, i, 13, 3.5, 6, BRAKE) }
    x.strokeStyle = INK; x.lineWidth = 1.2; x.beginPath(); x.moveTo(32, 18); x.quadraticCurveTo(31, 26, 24, 26); x.stroke(); R(x, 21.5, 24.8, 3, 2.6, INK)
  }),
  clipboard: (x, F) => inSprite(x, F, () => {   // Virgo's clipboard
    R(x, 27, 17, 11, 15, INK); R(x, 28, 18, 9, 13, '#a5713f'); R(x, 29, 20, 7, 10, BONE); R(x, 30.5, 16.5, 4, 2.5, '#8f96a0')
    for (let k = 0; k < 4; k++) { R(x, 30, 21.5 + k * 2.2, 1, 1, '#2e8b57'); R(x, 31.5, 21.7 + k * 2.2, 4, 0.6, INK) }
  }),
  crown: (x, F) => inSprite(x, F, () => { R(x, 13, 3, 10, 4, INK); R(x, 14, 3.5, 8, 3, GOLD); for (const i of [13, 17, 21]) { R(x, i, 0, 2, 3.5, INK); R(x, i + 0.4, 0.4, 1.2, 3, GOLD) } }),
  sweatband: (x, F) => inSprite(x, F, () => { R(x, 9, 11.5, 18, 3.2, INK); R(x, 9.5, 12, 17, 2.2, '#ff5a6e') }),
  scarf: (x, F) => inSprite(x, F, () => { R(x, 8, 26, 20, 4, INK); R(x, 8.5, 26.5, 19, 3, '#e05a3a'); R(x, 22, 28, 4, 8, INK); R(x, 22.5, 28.5, 3, 7, '#e05a3a') }),
  mic: (x, F) => inSprite(x, F, () => { R(x, 30, 22, 2, 9, INK); R(x, 29, 18, 4, 5, INK); R(x, 29.6, 18.6, 2.8, 3.8, '#c8ccd6') }),
  magnifier: (x, F) => inSprite(x, F, () => { x.strokeStyle = INK; x.lineWidth = 1.6; x.beginPath(); x.arc(32, 18, 4.5, 0, Math.PI * 2); x.stroke(); x.fillStyle = 'rgba(191,230,255,0.35)'; x.fill(); R(x, 34, 22, 1.8, 7, '#6b3b1f') }),
  paddle: (x, F) => inSprite(x, F, () => { R(x, 30, 14, 8, 10, INK); R(x, 30.7, 14.7, 6.6, 8.6, '#ff8a3c'); R(x, 32.8, 23.5, 2.4, 6, INK) }),
  phone: (x, F) => inSprite(x, F, () => { R(x, 29, 15, 7, 12, INK); R(x, 29.8, 16, 5.4, 9.6, SKYB) }),
  tissue: (x, F) => inSprite(x, F, () => { R(x, -2, 22, 8, 6, INK); R(x, -1.4, 22.6, 6.8, 4.8, LAV); R(x, 0, 18.5, 3, 4, '#ffffff') }),
  shades: (x, F) => inSprite(x, F, () => { R(x, 9, 16, 8, 5, INK); R(x, 19.5, 16, 8, 5, INK); R(x, 16, 16.5, 4, 1.2, INK) }),
  beret: (x, F) => inSprite(x, F, () => { x.fillStyle = INK; x.beginPath(); x.ellipse(17, 5, 9, 3.6, -0.2, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c0304a'; x.beginPath(); x.ellipse(17, 5, 8, 2.8, -0.2, 0, Math.PI * 2); x.fill(); R(x, 17, 0.6, 1, 2, INK) }),
  sweater: (x, F) => inSprite(x, F, () => { R(x, 7, 24, 22, 8, INK); R(x, 7.6, 24.6, 20.8, 6.8, '#6b8fd6'); for (let k = 0; k < 5; k++) R(x, 9 + k * 4, 26.5, 2, 2, BONE) }),
  headphones: (x, F) => inSprite(x, F, () => { x.strokeStyle = INK; x.lineWidth = 2; x.beginPath(); x.arc(18, 17, 14.5, Math.PI * 1.08, Math.PI * 1.92); x.stroke(); for (const i of [2.5, 30]) { R(x, i - 0.6, 12.4, 4.7, 7.2, INK); R(x, i, 13, 3.5, 6, MINT) } }),
}

// ── ★ LESSON UNLOCKED (season-2 signature beat): banner + sparkle burst + the lesson (last line Garamond italic gold)
export function lessonScene(L, key = 'D') {
  const f = KEYF[key] || KEYF.D
  return {
    dur: L.dur ?? 5.0,
    set: (x, t, lt) => {
      x.fillStyle = 'rgba(8,5,22,0.72)'; x.fillRect(0, 0, 1080, 1920)
      x.save(); x.translate(540, 640); x.rotate(t * 0.15); for (let k = 0; k < 12; k++) { x.rotate(Math.PI / 6); x.fillStyle = 'rgba(242,199,92,0.05)'; x.beginPath(); x.moveTo(0, 0); x.lineTo(-90, -1200); x.lineTo(90, -1200); x.fill() } x.restore()
    },
    front: (x, t, lt) => {
      const k = Kp(lt, 0.1, 0.35), shake = lt > 0.1 && lt < 0.45 ? Math.sin(lt * 90) * 6 : 0
      if (k > 0) {
        x.save(); x.translate(540 + shake, 560); x.rotate(-0.02); x.scale(k, k)
        box(x, -400, -70, 800, 140, INK, 10); box(x, -392, -62, 784, 124, GOLD, 0); box(x, -380, -50, 760, 100, '#1c1240', 0)
        for (const [i, j] of [[-392, -62], [380, -62], [-392, 50], [380, 50]]) { x.fillStyle = INK; x.fillRect(i, j, 12, 12) }
        txt(x, '★ LESSON UNLOCKED', 0, 4, { size: 54, col: GOLD, font: MONO, weight: 700 })
        x.restore()
      }
      if (lt > 0.15) sparkles(x, t, 540, 560, t - lt + 0.15, 18, 460, 9)
      const n = L.lines.length
      L.lines.forEach((ln, j) => {
        const last = j === n - 1, a = Kp(lt, 0.7 + j * 0.35, 0.3); if (a <= 0) return
        x.save(); x.globalAlpha = clamp(a); x.translate(540, 790 + j * 112); x.scale(0.8 + 0.2 * a, 0.8 + 0.2 * a)
        if (last) fit(x, ln, 0, 0, 960, { size: 92, col: GOLD, font: SERIF, weight: 500, italic: true })
        else fit(x, ln, 0, 0, 960, { size: 74, col: BONE })
        x.restore()
      })
    },
    cast: L.cast, mood: L.mood, hops: L.hops, props: L.props,
    lines: L.line ? [[3.0, 1.8, ...L.line]] : [],
    sfx: [['marimba', 0.12, f, { gain: 0.06 }], ['marimba', 0.24, f * 1.498, { gain: 0.06 }], ['marimba', 0.36, f * 2, { gain: 0.065 }], ['marimba', 0.48, f * 2.997, { gain: 0.06 }], ['fmbell', 0.55, f * 2, { gain: 0.04 }]],
  }
}

// ── Houston sets (generic shapes; real public places only, no brands)
export function kitchen(x, t, { wall = '#f0d9b5', tile = '#8fc7c0' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1400)
  for (let j = 0; j < 4; j++) for (let i = 0; i < 12; i++) { x.fillStyle = (i + j) % 2 ? tile : '#f4efe4'; x.fillRect(i * 90, 760 + j * 60, 90, 60) }
  box(x, 640, 360, 300, 260, '#bfe6ff', 10); x.fillStyle = INK; x.fillRect(786, 360, 8, 260); x.fillRect(640, 486, 300, 8)
  sun(x, 880, 420, 34)
  box(x, 0, 1000, 1080, 40, '#7a4a2c', 6); x.fillStyle = '#c98e5a'; x.fillRect(0, 1040, 1080, 360)
  for (let k = 0; k < 4; k++) box(x, 40 + k * 260, 1080, 220, 280, '#b07a4a', 5)
  x.fillStyle = '#5a3a26'; x.fillRect(0, 1400, 1080, 520)
  box(x, 120, 300, 18, 120, '#6b3b1f', 4); for (let k = 0; k < 3; k++) box(x, 90 + k * 30, 420, 22, 60, ['#c0304a', '#2e8b57', '#f2c75c'][k], 4)   // hanging utensils
}
export function porch(x, t, { siding = '#7fb0c8' } = {}) {   // a Heights bungalow porch
  sky(x, '#8fd0ff', '#ffe0b0', 600)
  x.fillStyle = siding; x.fillRect(0, 360, 1080, 1000)
  for (let k = 380; k < 1360; k += 34) { x.fillStyle = 'rgba(0,0,0,0.08)'; x.fillRect(0, k, 1080, 4) }
  box(x, 380, 560, 220, 420, '#6b3b1f', 8); x.fillStyle = GOLD; x.fillRect(560, 770, 14, 14)
  box(x, 680, 600, 260, 220, '#ffe8a8', 8); x.fillStyle = INK; x.fillRect(806, 600, 8, 220)
  x.fillStyle = '#5a3a26'; x.fillRect(0, 300, 1080, 70); x.fillStyle = INK; x.fillRect(0, 366, 1080, 8)
  for (const px of [60, 1000]) box(x, px - 20, 370, 40, 1000, BONE, 6)
  box(x, 0, 1360, 1080, 40, BONE, 6); x.fillStyle = '#9a7a5a'; x.fillRect(0, 1400, 1080, 520)
  for (let k = 0; k < 14; k++) box(x, 20 + k * 78, 1200, 16, 160, BONE, 3)
}
export function bayou(x, t, { dusk = 0, trail = true } = {}) {   // Buffalo Bayou: the trail, the water, downtown in the distance
  sky(x, dusk ? '#4a3a8a' : '#7cc8ff', dusk ? '#ff9a6a' : '#d8f0ff', 900)
  x.save(); x.translate(540 * 0.5, 900 * 0.5); x.scale(0.5, 0.5); skyline(x, 900, t, { col: dusk ? '#3a2d6a' : '#5a6f9a', lit: '#ffe39a', alpha: 0.8 }); x.restore()
  x.fillStyle = '#3f7a46'; x.fillRect(0, 880, 1080, 120)
  for (let k = 0; k < 8; k++) tree(x, 60 + k * 140, 960, 0.55, k % 2 ? '#2f7a46' : '#3c8a50')
  x.fillStyle = '#5c6b3a'; x.fillRect(0, 990, 1080, 220)
  for (let k = 0; k < 16; k++) { const ph = (t * 0.25 + k / 16) % 1; x.fillStyle = 'rgba(255,255,255,0.18)'; x.fillRect(ph * 1180 - 100, 1010 + (k * 37) % 180, 70, 5) }
  x.fillStyle = '#4c8a40'; x.fillRect(0, 1210, 1080, 160)
  if (trail) { x.fillStyle = '#c8c0b0'; x.fillRect(0, 1340, 1080, 70); x.fillStyle = INK; x.fillRect(0, 1334, 1080, 6) }
  x.fillStyle = '#3c6a34'; x.fillRect(0, 1410, 1080, 510)
}
export function beach(x, t) {   // a Galveston day trip: the brown-green Gulf, the seawall, a pelican
  sky(x, '#8fd0ff', '#fff0d0', 900); sun(x, 860, 300, 70)
  x.fillStyle = '#8a7a4a'; x.fillRect(0, 880, 1080, 260)
  for (let k = 0; k < 9; k++) { const ph = (t * 0.4 + k / 9) % 1; x.fillStyle = 'rgba(255,255,240,0.4)'; x.fillRect(-100 + ((k * 211 + t * 60) % 1280), 900 + ph * 220, 120, 8) }
  x.fillStyle = '#e8d29a'; x.fillRect(0, 1140, 1080, 780)
  box(x, -10, 1100, 1100, 60, '#b8b0a0', 6)
  for (let k = 0; k < 4; k++) { const bx = (k * 300 + t * 40) % 1300 - 100, by = 420 + k * 60 + Math.sin(t * 2 + k) * 10; x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(bx - 30, by); x.quadraticCurveTo(bx - 15, by - 18, bx, by); x.quadraticCurveTo(bx + 15, by - 18, bx + 30, by); x.stroke() }
}
export function bellaire(x, t, { signs = ['BOBA', 'PHO', 'HOT POT', 'KARAOKE'] } = {}) {   // Bellaire Blvd at night
  x.fillStyle = '#120c2a'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(239,230,214,0.5)'; x.fillRect((k * 173) % 1080, (k * 97) % 300 + 40, 4, 4) }
  const cols = ['#ff5a9e', '#5ee0ff', '#ffd36b', '#7dffb0']
  signs.forEach((s, i) => {
    const l = i * 270, on = Math.sin(t * 5 + i * 2) > -0.85
    box(x, l + 6, 520, 258, 840, ['#2a2050', '#24304a', '#3a2440', '#203a3a'][i % 4], 6)
    box(x, l + 30, 980, 210, 260, '#ffe8a8', 5); x.fillStyle = INK; x.fillRect(l + 130, 980, 8, 260)
    x.save(); if (on) { x.shadowColor = cols[i % 4]; x.shadowBlur = 30 } box(x, l + 24, 560, 222, 120, '#0b0820', 5); fit(x, s, l + 135, 622, 200, { size: 54, col: on ? cols[i % 4] : '#4a4060' }); x.restore()
  })
  x.fillStyle = '#2a2638'; x.fillRect(0, 1380, 1080, 540); x.fillStyle = INK; x.fillRect(0, 1374, 1080, 8)
  for (let d = -((t * 200) % 160); d < 1080; d += 160) { x.fillStyle = GOLD; x.fillRect(d, 1640, 80, 10) }
}
export function pond(x, t) {   // Hermann Park: the pond and paddle boats
  sky(x, '#8fd0ff', '#e8f6ff', 760); for (let k = 0; k < 7; k++) tree(x, 80 + k * 160, 800, 0.6, k % 2 ? '#2f7a46' : '#3c8a50')
  x.fillStyle = '#4c8a40'; x.fillRect(0, 780, 1080, 80)
  x.fillStyle = '#3f8fb0'; x.fillRect(0, 850, 1080, 520)
  for (let k = 0; k < 18; k++) { const ph = (t * 0.3 + k / 18) % 1; x.fillStyle = 'rgba(255,255,255,0.2)'; x.fillRect(ph * 1180 - 100, 870 + (k * 53) % 480, 60, 5) }
  x.fillStyle = '#5a9a4a'; x.fillRect(0, 1370, 1080, 550); x.fillStyle = INK; x.fillRect(0, 1364, 1080, 8)
}
export function paddleBoat(x, cx, cy, col = '#ffd36b', s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -170, -10, 340, 70, col, 7); box(x, -120, -90, 240, 26, BONE, 5); box(x, -110, -70, 14, 64, BONE, 3); box(x, 96, -70, 14, 64, BONE, 3)
  x.fillStyle = INK; x.beginPath(); x.arc(150, 30, 34, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c0304a'; x.beginPath(); x.arc(150, 30, 26, 0, Math.PI * 2); x.fill()
  x.restore()
}
export function batBridge(x, t, lt, bats = 0) {   // the Waugh bridge bats at sunset (a real, public, beloved sight)
  sky(x, '#3a2a6a', '#ff8a5a', 1100); sun(x, 540, 900, 110, '#ffb36b')
  skyline(x, 1000, t, { col: '#2a1d50', alpha: 0.7 })
  x.fillStyle = '#4a3a6a'; x.fillRect(0, 1000, 1080, 380)
  for (let k = 0; k < 14; k++) { const ph = (t * 0.2 + k / 14) % 1; x.fillStyle = 'rgba(255,180,120,0.25)'; x.fillRect(ph * 1180 - 100, 1030 + (k * 41) % 320, 80, 5) }
  box(x, -10, 760, 1100, 60, '#6d6a80', 6); for (let k = 0; k < 6; k++) box(x, 40 + k * 200, 820, 40, 200, '#5a5870', 5)
  const n = Math.floor(60 * clamp(bats))
  for (let k = 0; k < n; k++) { const ph = (t * 0.35 + k * 0.137) % 1, bx = (k * 97 + ph * 900) % 1180 - 50, by = 820 - ph * 560 + Math.sin(t * 7 + k) * 20, w = 10 + (k % 3) * 4, f = Math.sin(t * 20 + k) > 0 ? -1 : 1
    x.fillStyle = INK; x.beginPath(); x.moveTo(bx - w * 1.6, by - f * w * 0.6); x.lineTo(bx, by); x.lineTo(bx + w * 1.6, by - f * w * 0.6); x.lineTo(bx, by + w * 0.4); x.closePath(); x.fill() }
  x.fillStyle = '#3c4a34'; x.fillRect(0, 1370, 1080, 550); x.fillStyle = INK; x.fillRect(0, 1364, 1080, 8)
}
export function brunchFront(x, t, wait = 'WAIT: A WHILE') {
  sky(x, '#8fd0ff', '#fff4d8', 700)
  box(x, 60, 360, 960, 1000, '#f4efe4', 8)
  for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#ff8fb1' : BONE; x.fillRect(60 + k * 120, 420, 120, 110) } x.fillStyle = INK; x.fillRect(60, 526, 960, 8)
  fit(x, 'BRUNCH', 540, 470, 400, { size: 62, col: INK })
  box(x, 120, 640, 340, 360, '#bfe6ff', 6); box(x, 620, 640, 300, 540, '#6b3b1f', 6)
  x.save(); x.translate(300, 1120); x.rotate(-0.04); box(x, -140, -70, 280, 140, '#1c1240', 6); fit(x, wait, 0, 0, 250, { size: 32, col: GOLD, font: MONO, weight: 700 }); x.restore()
  ground(x, '#c8c0b0')
}
export function gallery(x, t, paints = 3) {   // a free-museum-Thursday gallery (generic art)
  x.fillStyle = '#efe9df'; x.fillRect(0, 0, 1080, 1400); x.fillStyle = '#b89a78'; x.fillRect(0, 1400, 1080, 520); x.fillStyle = INK; x.fillRect(0, 1394, 1080, 8)
  const P = [[200, 640, 280, 360, ['#c0304a', '#f2c75c', '#2b5fb0']], [540, 600, 260, 460, ['#1b1236', '#ff8a3c', '#efe6d6']], [880, 640, 260, 340, ['#2e8b57', '#8fe3ff', '#ff8fb1']]].slice(0, paints)
  for (const [cx, cy, w, h, c] of P) { box(x, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, '#b07a3a', 6); x.fillStyle = c[0]; x.fillRect(cx - w / 2, cy - h / 2, w, h); x.fillStyle = c[1]; x.fillRect(cx - w / 2 + 30, cy - h / 2 + 30, w * 0.5, h * 0.4); x.fillStyle = c[2]; x.beginPath(); x.arc(cx + w * 0.15, cy + h * 0.2, w * 0.2, 0, Math.PI * 2); x.fill() }
  box(x, 300, 1300, 480, 40, '#6b3b1f', 6); box(x, 330, 1340, 30, 60, '#6b3b1f', 4); box(x, 720, 1340, 30, 60, '#6b3b1f', 4)
}
export function chapel(x, t) {   // a very quiet room of dark paintings in Montrose
  x.fillStyle = '#3a3640'; x.fillRect(0, 0, 1080, 1920)
  const g = x.createRadialGradient(540, 200, 20, 540, 300, 900); g.addColorStop(0, 'rgba(255,250,230,0.25)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1400)
  for (const [l, w] of [[60, 280], [400, 280], [740, 280]]) { box(x, l, 380, w, 760, '#2a1830', 6); x.fillStyle = 'rgba(80,40,90,0.4)'; x.fillRect(l + 20, 400, w - 40, 720) }
  x.fillStyle = '#4a4450'; x.fillRect(0, 1360, 1080, 560); x.fillStyle = INK; x.fillRect(0, 1354, 1080, 8)
  box(x, 240, 1310, 600, 36, '#5a4030', 5)
}
export function tunnel(x, t, signs = [['← FOOD COURT', 260], ['TOWER 3 →', 820]]) {   // the downtown tunnels (cool, tiled, weekday-only)
  x.fillStyle = '#d8d4c8'; x.fillRect(0, 0, 1080, 1920)
  for (let j = 0; j < 22; j++) for (let i = 0; i < 12; i++) { x.fillStyle = (i + j) % 2 ? '#cfcabc' : '#dcd8cc'; x.fillRect(i * 90, 300 + j * 50, 88, 48) }
  for (let k = 0; k < 4; k++) { const on = Math.sin(t * 9 + k * 3) > -0.95; box(x, 60 + k * 260, 300, 200, 26, on ? '#fffbe8' : '#bbb6a8', 4) }
  for (const [s, cx] of signs) { box(x, cx - 200, 420, 400, 90, '#1f4a7a', 6); fit(x, s, cx, 467, 370, { size: 40, col: BONE }) }
  x.fillStyle = '#9a8f80'; x.fillRect(0, 1380, 1080, 540); x.fillStyle = INK; x.fillRect(0, 1374, 1080, 8)
}
export function court(x, t) {   // a pickleball court in a park
  sky(x, '#8fd0ff', '#e8f6ff', 700); for (let k = 0; k < 6; k++) tree(x, 90 + k * 180, 720, 0.5)
  x.fillStyle = '#3f7a5a'; x.fillRect(0, 700, 1080, 1220)
  x.fillStyle = '#2b6fa0'; x.fillRect(80, 760, 920, 1100); x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(80, 760, 920, 1100); x.beginPath(); x.moveTo(540, 760); x.lineTo(540, 1860); x.stroke()
  box(x, 60, 1200, 960, 20, INK, 0); for (let k = 0; k < 24; k++) { x.fillStyle = 'rgba(239,230,214,0.6)'; x.fillRect(70 + k * 40, 1110, 4, 90) } box(x, 60, 1100, 960, 12, BONE, 4)
}
export function danceHall(x, t) {   // zydeco night: string lights, wood floor, a little stage
  x.fillStyle = '#2a1a2a'; x.fillRect(0, 0, 1080, 1400)
  stringLights(x, t, 300); stringLights(x, t + 1, 420)
  box(x, 140, 620, 800, 300, '#5a2a3a', 8); fit(x, 'ZYDECO NIGHT', 540, 700, 620, { size: 66, col: GOLD })
  // an accordion and a washboard on the stage
  box(x, 300, 770, 160, 110, '#c0304a', 5); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(320 + k * 24, 780, 6, 90) }
  box(x, 620, 760, 130, 140, '#c8ccd6', 5); for (let k = 0; k < 8; k++) { x.fillStyle = '#8f96a0'; x.fillRect(630, 772 + k * 15, 110, 5) }
  x.fillStyle = '#7a4a2c'; x.fillRect(0, 1400, 1080, 520); for (let k = 0; k < 1080; k += 90) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k, 1400, 4, 520) } x.fillStyle = INK; x.fillRect(0, 1394, 1080, 8)
}
export function corkBoard(x, t, k = 1) {   // Scorpio's investigation board
  x.fillStyle = '#2a2030'; x.fillRect(0, 0, 1080, 1920)
  box(x, 90, 330, 900, 760, '#b8864a', 10)
  for (let q = 0; q < 50; q++) { x.fillStyle = 'rgba(80,50,20,0.25)'; x.fillRect(110 + (q * 173) % 860, 350 + (q * 97) % 720, 6, 6) }
  const N = [[250, 470, 'HIGH SCHOOL?'], [780, 470, 'COUSIN IN KATY'], [520, 700, 'YOUR DATE'], [250, 930, 'INSIDE THE LOOP?'], [790, 940, 'TACO: FLOUR']]
  const vis = Math.round(N.length * clamp(k))
  x.strokeStyle = BRAKE; x.lineWidth = 5; for (let q = 0; q < vis; q++) { if (q === 2) continue; x.beginPath(); x.moveTo(520, 700); x.lineTo(N[q][0], N[q][1]); x.stroke() }
  for (let q = 0; q < vis; q++) { const [cx, cy, s] = N[q]; box(x, cx - 140, cy - 50, 280, 100, q === 2 ? PINK : BONE, 5); fit(x, s, cx, cy + 2, 250, { size: 30, col: INK, font: MONO, weight: 700 }); x.fillStyle = BRAKE; x.beginPath(); x.arc(cx, cy - 46, 10, 0, Math.PI * 2); x.fill() }
  x.fillStyle = '#3a2a30'; x.fillRect(0, 1380, 1080, 540); x.fillStyle = INK; x.fillRect(0, 1374, 1080, 8)
}
export function crawfish(x, cx, cy, s = 1, col = '#d8402a') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -30, -10, 60, 22, col, 4); box(x, 28, -6, 18, 14, col, 3); box(x, -52, -14, 24, 12, col, 3); box(x, -52, 6, 24, 12, col, 3)
  x.fillStyle = INK; x.fillRect(-18, -6, 5, 5); x.restore()
}
export function crawfishTable(x, t, n = 1) {   // a backyard boil: newspaper table, the early-season haul, corn, potatoes
  sky(x, '#ffb36b', '#ffe0b0', 900); stringLights(x, t, 330)
  x.fillStyle = '#5a8a46'; x.fillRect(0, 880, 1080, 1040)
  box(x, 80, 1050, 920, 70, '#e8e2d2', 6); for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(40,40,40,0.25)'; x.fillRect(110 + k * 100, 1062, 70, 6); x.fillRect(110 + k * 100, 1080, 50, 6) }
  box(x, 130, 1120, 30, 260, '#6b3b1f', 4); box(x, 920, 1120, 30, 260, '#6b3b1f', 4)
  const m = Math.round(16 * clamp(n)); for (let k = 0; k < m; k++) crawfish(x, 260 + (k * 67) % 560, 1030 - (k % 4) * 16, 0.8)
  for (let k = 0; k < 3; k++) { box(x, 170 + k * 300, 1018, 70, 26, '#f2c75c', 4) }
  x.fillStyle = INK; x.fillRect(0, 1374, 1080, 8)
}
export function karaoke(x, t, lyric = '♪ my heart is on the 610 ♪', bounce = 0) {   // a karaoke room on Bellaire
  x.fillStyle = '#1a0f30'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 24; k++) { const a = t * 0.8 + k; x.fillStyle = ['rgba(255,143,177,0.22)', 'rgba(143,227,255,0.22)', 'rgba(242,199,92,0.22)'][k % 3]; x.fillRect(540 + Math.cos(a) * (200 + k * 18), 300 + Math.sin(a * 1.3) * 120 + k * 30, 30, 30) }
  box(x, 140, 380, 800, 460, '#0e1630', 10)
  fit(x, lyric, 540, 640, 720, { size: 48, col: BONE })
  x.fillStyle = GOLD; x.fillRect(180, 700, 720 * clamp(bounce), 10)
  x.fillStyle = '#2a1a40'; x.fillRect(0, 1380, 1080, 540); x.fillStyle = INK; x.fillRect(0, 1374, 1080, 8)
  x.fillStyle = '#c8ccd6'; x.beginPath(); x.arc(540, 250, 50, 0, Math.PI * 2); x.fill(); for (let k = 0; k < 10; k++) { x.fillStyle = INK; x.fillRect(500 + (k % 4) * 22, 210 + Math.floor(k / 4) * 26, 4, 4) }
}
export function phoneChat(x, cx, cy, msgs, lt, { k = 1, title = 'you', s = 1.3 } = {}) {   // a generic phone and chat (no app UI)
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k * s, k * s)
  box(x, -200, -340, 400, 680, INK, 10); box(x, -184, -310, 368, 620, '#f4efe4', 0)
  fit(x, title, 0, -282, 320, { size: 30, col: INK, font: MONO, weight: 700 }); x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(-184, -256, 368, 4)
  let y = -220
  for (const [at, me, text] of msgs) {
    if (lt < at) continue
    const a = Kp(lt, at, 0.25); x.font = `800 28px ${INTER}`; const lines = text.split(' | '), w = Math.max(...lines.map(l => x.measureText(l).width)) + 36, h = lines.length * 34 + 22
    const l = me ? 170 - w : -170
    x.save(); x.globalAlpha = clamp(a); box(x, l, y, w, h, me ? '#5ec8ff' : '#ffffff', 4); lines.forEach((ln, i) => txt(x, ln, l + w / 2, y + 28 + i * 34, { size: 28, col: INK })); x.restore()
    y += h + 22
  }
  x.restore()
}
export function boba(x, cx, cy, s = 1, col = '#d8b48a') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -34, -50, 68, 110, col, 5); x.fillStyle = INK; for (let k = 0; k < 6; k++) x.fillRect(-24 + (k % 3) * 18, 34 + Math.floor(k / 3) * 12, 9, 9); box(x, -40, -60, 80, 14, BONE, 4); box(x, 6, -110, 10, 54, PINK, 3); x.restore() }
export function bowl(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 76, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 68, 0, Math.PI); x.fill(); x.fillStyle = '#c98e4a'; x.fillRect(-68, -6, 136, 12); x.fillStyle = '#7dbf5a'; x.fillRect(-30, -14, 20, 10); x.fillRect(16, -12, 16, 8); x.restore() }
export function steam(x, cx, cy, t, n = 3) { for (let k = 0; k < n; k++) { const ph = (t * 0.6 + k / n) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(cx - 30 + k * 30, cy - ph * 120); x.quadraticCurveTo(cx - 10 + k * 30, cy - 40 - ph * 120, cx - 30 + k * 30, cy - 80 - ph * 120); x.stroke() } }
export function bigText(x, lt, a, lines, { y = 640, size = 96, col = GOLD, gap = 1.1 } = {}) {   // a slammed headline
  const k = Kp(lt, a, 0.3); if (k <= 0) return
  x.save(); x.globalAlpha = clamp(k); lines.forEach((l, i) => { x.save(); x.translate(540, y + i * size * gap); x.scale(0.85 + 0.15 * k, 0.85 + 0.15 * k); fit(x, l, 0, 0, 960, { size, col: i ? BONE : col }); x.restore() }); x.restore()
}
export { hearts, sparkles, label, pop01, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV, BRAKE, HGREEN }
