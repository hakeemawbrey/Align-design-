// yrsag: THEN vs NOW, "Adventure, party of two." (20 s vertical, Star Talk Then vs Now §9, music: synthwave · Dm)
// Story 0–15.6, then the shared end card. The format look and timing live in ./thennow.js (identical in Block B).
//   0.0–7.2   THEN "Sagittarius dating | in *2016*"  (old phone video, stamp 06·30·2016). ♐ Sagittarius, under a
//             backpack twice its size, shows ♒ Aquarius, the date, its profile pictures: six backpacking shots pop
//             in (mountain, mountain, ocean, backpack, mountain at sunset, a hill). Stickers: "pic 1: *a mountain*" ·
//             "pic 2: *also a mountain*" · "pic 6: *is that… you?*" (a magnifier finds a tiny dot on the hill).
//   7.22      card cut → NOW on the drop.
//   7.27–12.4 NOW "Sagittarius dating | in *2026*"  A trip map on the wall, a dotted route drawing itself; two
//             backpacks on the floor, one big, one small. Sticker: "trip planned: *for two*". ♐ SAGITTARIUS: "where do
//             *you* want to go?" Aquarius drops a second pin. A plate: "WEEKEND TRIP: 14 STOPS" (still Sag).
//   12.55–15.5 PAYOFF  the 2016 polaroid drops top-left. THE STARS: "Same wanderer. *New co-pilot.*"
//             Last: "Adventure, *party of two*."
import { makeFilm, R, INK, GOLD, BONE, PINK, SKY, MONO, INTER, drawBits, pop01, outK, popOut, r3, sparkles, plate } from './thennow.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

// ── a tiny landscape painter for the profile pics
function scene(x, kind, w, h, t) {
  const sky = { mtn: '#8fd8f6', ocean: '#9fd0ff', sunset: '#ff9f6b', hill: '#bfe3ff', pack: '#9fe6b0' }[kind]
  R(x, sky, 0, 0, w, h)
  if (kind === 'sunset') { R(x, '#ffd36b', 0, h * 0.45, w, h * 0.2); x.fillStyle = '#fff1b0'; x.beginPath(); x.arc(w * 0.7, h * 0.5, 16, 0, Math.PI * 2); x.fill() }
  if (kind === 'mtn' || kind === 'sunset') {
    x.fillStyle = kind === 'sunset' ? '#5a3f7a' : '#6b7fb0'
    x.beginPath(); x.moveTo(-10, h); x.lineTo(w * 0.4, h * 0.22); x.lineTo(w * 0.75, h * 0.62); x.lineTo(w * 0.9, h * 0.4); x.lineTo(w + 10, h); x.closePath(); x.fill()
    x.fillStyle = '#ffffff'; x.beginPath(); x.moveTo(w * 0.4, h * 0.22); x.lineTo(w * 0.47, h * 0.36); x.lineTo(w * 0.33, h * 0.36); x.closePath(); x.fill()
  }
  if (kind === 'ocean') { R(x, '#3f7cf0', 0, h * 0.55, w, h * 0.45); for (let i = 0; i < 4; i++) R(x, '#bfe3ff', 12 + i * 34, h * 0.65 + (i % 2) * 14, 18, 4); R(x, '#ffe7a0', 0, h * 0.86, w, h * 0.14) }
  if (kind === 'hill') {
    x.fillStyle = '#7fc07a'; x.beginPath(); x.ellipse(w * 0.55, h * 1.15, w * 0.75, h * 0.62, 0, 0, Math.PI * 2); x.fill()
    R(x, '#ff6f9a', w * 0.6, h * 0.52, 3, 3)                                    // Sag, very far away
  }
  if (kind === 'pack') {
    R(x, '#7fc07a', 0, h * 0.7, w, h * 0.3)
    R(x, INK, w * 0.32 - 3, h * 0.2 - 3, w * 0.36 + 6, h * 0.56 + 6); R(x, '#e86a3a', w * 0.32, h * 0.2, w * 0.36, h * 0.56); R(x, '#b84a22', w * 0.36, h * 0.46, w * 0.28, h * 0.16)
  }
}
const PICS = ['mtn', 'mtn', 'ocean', 'pack', 'sunset', 'hill']
const GRID = { x: 120, y: 560, cw: 192, ch: 150 }
const PIC_T = [0.9, 1.25, 2.0, 2.4, 2.8, 3.2]
const MAG_T = 5.1
function profile(x, t, T, ctx) {
  if (ctx.era !== 'then') return
  const k = pop01(t, 0.6, 0.3, 2)
  if (k <= 0.01) return
  // the panel
  const W = GRID.cw * 3 + 24, H = GRID.ch * 2 + 70
  x.save(); x.globalAlpha = clamp(k)
  R(x, 'rgba(6,4,18,0.45)', GRID.x + 6, GRID.y - 44, W, H)
  R(x, INK, GRID.x - 18, GRID.y - 64, W + 12, H + 12)
  R(x, '#eef0f6', GRID.x - 12, GRID.y - 58, W, H)
  x.font = `800 24px ${INTER}`; x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'middle'
  x.fillText('MY PICS (6)', GRID.x + 2, GRID.y - 32)
  x.restore()
  PICS.forEach((kind, i) => {
    const p = pop01(t, PIC_T[i], 0.3, 2.4)
    if (p <= 0.01) return
    const col = i % 3, row = Math.floor(i / 3)
    const cx = GRID.x + col * GRID.cw + GRID.cw / 2 - 6, cy = GRID.y + row * GRID.ch + GRID.ch / 2 - 6
    const w = GRID.cw - 18, h = GRID.ch - 18
    x.save(); x.translate(cx, cy); x.scale(p, p); x.translate(-w / 2, -h / 2)
    R(x, INK, -4, -4, w + 8, h + 8)
    x.save(); x.beginPath(); x.rect(0, 0, w, h); x.clip(); scene(x, kind, w, h, t); x.restore()
    x.restore()
  })
  // the magnifier over pic 6
  const m = pop01(t, MAG_T, 0.35, 2.4)
  if (m > 0.01) {
    const cx = GRID.x + 2 * GRID.cw + GRID.cw / 2 - 6, cy = GRID.y + GRID.ch + GRID.ch / 2 - 6
    const w = GRID.cw - 18, h = GRID.ch - 18
    const dx = cx - w / 2 + w * 0.6 + 1, dy = cy - h / 2 + h * 0.52 + 1
    const mx = dx + 30, my = dy - 10, r = 64
    x.save(); x.translate(mx, my); x.scale(m, m)
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(r * 0.7, r * 0.7); x.lineTo(r * 1.4, r * 1.4); x.stroke()
    x.strokeStyle = '#8a5a2b'; x.lineWidth = 8; x.beginPath(); x.moveTo(r * 0.75, r * 0.75); x.lineTo(r * 1.35, r * 1.35); x.stroke()
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 7, 0, Math.PI * 2); x.fill()
    x.save(); x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.clip()
    R(x, '#bfe3ff', -r, -r, r * 2, r * 2); R(x, '#7fc07a', -r, 10, r * 2, r)
    drawBits(x, ['..s..', '.sss.', 'sssss', '.s.s.'], { s: ctx.HERO.color }, -30 + 30, -4, 7)
    x.restore()
    x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r - 10, -2.4, -1.6); x.stroke()
    x.restore()
  }
}

// ── the big backpack (THEN) — behind Sag
function bigPack(x, t, T, ctx) {
  if (ctx.era !== 'then') return
  const k = pop01(t, 0.5, 0.35, 2) * 0.8
  if (k <= 0.01) return
  const H = ctx.P.hero, bx = H.x - 105, by = H.y - 95 + Math.sin(t * 2.2 + 3 * 2.1) * H.s * 0.035
  x.save(); x.translate(bx, by + 150); x.rotate(-0.08); x.scale(k, k); x.translate(0, -150)
  R(x, INK, -86, -6, 172, 252); R(x, '#e86a3a', -80, 0, 160, 240); R(x, '#b84a22', -60, 120, 120, 80); R(x, INK, -60, 118, 120, 4)
  R(x, INK, -96, -40, 192, 48); R(x, '#5aa0e0', -90, -34, 180, 36)               // the bedroll
  R(x, '#3a7ac0', -90, -20, 180, 4)
  R(x, INK, 30, -76, 40, 42); R(x, '#c9c2d8', 34, -72, 32, 34)                     // a pot, of course
  x.restore()
}
function packs(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  const k1 = pop01(t, T.sw + 0.3, 0.35, 2.2) * clamp(popOut(t, T.out)), k2 = pop01(t, T.sw + 0.55, 0.35, 2.2) * clamp(popOut(t, T.out))
  for (const [px, s, k, c, d] of [[500, 1, k1, '#e86a3a', '#b84a22'], [610, 0.72, k2, '#5aa0e0', '#3a7ac0']]) {
    if (k <= 0.01) continue
    x.save(); x.translate(px, 1150); x.scale(k * s, k * s)
    R(x, 'rgba(6,4,18,0.35)', -70, -6, 150, 18)
    R(x, INK, -66, -186, 132, 186); R(x, c, -60, -180, 120, 174); R(x, d, -46, -90, 92, 60); R(x, INK, -46, -92, 92, 4)
    R(x, INK, -36, -206, 72, 26); R(x, d, -30, -200, 60, 18)
    x.restore()
  }
}

// ── NOW: the trip map, route drawing itself, pins
const MAP = { x: 150, y: 560, w: 520, h: 330 }
const PIN2_T = 10.7, STOPS_T = 11.3
function tripMap(x, t, T, ctx) {
  if (ctx.era !== 'now') return
  const k = pop01(t, T.sw + 0.08, 0.4, 2) * clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const slide = ease.inOutCubic(prog(t, T.pay - 0.05, T.pay + 0.4))
  x.save(); x.translate(MAP.x + MAP.w / 2 + 180 * slide, MAP.y + MAP.h / 2); x.scale(k * lerp(1, 0.86, slide), k * lerp(1, 0.86, slide)); x.translate(-MAP.w / 2, -MAP.h / 2)
  R(x, 'rgba(6,4,18,0.45)', 16, 18, MAP.w, MAP.h)
  R(x, INK, -8, -8, MAP.w + 16, MAP.h + 16)
  R(x, '#cfe6f6', 0, 0, MAP.w, MAP.h)
  // land blobs
  x.fillStyle = '#bfe0a8'
  x.beginPath(); x.ellipse(150, 170, 150, 110, 0.3, 0, Math.PI * 2); x.fill()
  x.beginPath(); x.ellipse(390, 150, 120, 120, -0.2, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#9fcf8e'; for (const [a, b] of [[120, 140], [170, 200], [380, 120], [420, 190]]) { x.beginPath(); x.moveTo(a, b); x.lineTo(a + 22, b - 32); x.lineTo(a + 44, b); x.fill() }
  // the route: a dotted line drawing itself
  const pts = [[90, 230], [160, 120], [260, 200], [350, 90], [440, 220]]
  const prog01 = ease.inOutQuad(prog(t, T.sw + 0.4, 9.6))
  let total = 0; const segs = []
  for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); segs.push(L); total += L }
  let rem = total * prog01
  for (let i = 1; i < pts.length && rem > 0; i++) {
    const L = segs[i - 1], f = Math.min(1, rem / L); rem -= L
    const n = Math.floor(L * f / 18)
    for (let j = 0; j <= n; j++) { const q = j * 18 / L; R(x, '#ff6f9a', lerp(pts[i - 1][0], pts[i][0], q) - 4, lerp(pts[i - 1][1], pts[i][1], q) - 4, 9, 9) }
  }
  // pins: Sag's at the start; the date's lands mid-route
  const pin = (px, py, col, p) => { if (p <= 0.01) return; x.save(); x.translate(px, py - (1 - p) * 60); R(x, INK, -16, -48, 32, 32); R(x, col, -12, -44, 24, 24); R(x, INK, -3, -16, 6, 18); x.restore() }
  pin(90, 230, ctx.HERO.color, pop01(t, T.sw + 0.4, 0.3, 2.4))
  pin(440, 220, GOLD, pop01(t, 9.6, 0.3, 2.4))
  pin(260, 200, ctx.DATE.color, pop01(t, PIN2_T, 0.3, 2.8))
  if (t > PIN2_T) { const a = pop01(t, PIN2_T + 0.1, 0.3, 2.6); x.save(); x.globalAlpha = clamp(a); plate(x, 'snacks', 260, 236, { size: 20, bg: '#fffaf0', scale: a }); x.restore() }
  x.restore()
  // the stops plate
  const s = pop01(t, STOPS_T, 0.3, 2.6) * outK(t, [T.pay - 0.1, T.pay + 0.1])
  if (s > 0.01) plate(x, 'WEEKEND TRIP: 14 STOPS', MAP.x + MAP.w / 2 + 20, MAP.y + MAP.h + 34, { size: 22, bg: GOLD, scale: s, rot: -0.03 + 0.06 * Math.sin((t - STOPS_T) * 30) * Math.exp(-(t - STOPS_T) * 4) })
  sparkles(x, t, MAP.x + 260, MAP.y + 170, PIN2_T + 0.1, 8, 90, 0.2, [GOLD, PINK, BONE])
}

const EP = makeFilm({
  id: 'yrsag', key: 'Dm', seed: 9094,
  year: '2016', stamp: '06·30·2016',
  hero: { sign: 'sagittarius', tag: '♐︎ SAG', lineColor: '#ffc38a' },
  date: { sign: 'aquarius', lineColor: '#bfe3ff' },
  cap0: 'Sagittarius dating | in *2016*',
  cap1: 'Sagittarius dating | in *2026*',
  last: 'Adventure, | *party of two*.', lastLate: 3,
  stickers: [
    { text: 'pic 1: *a mountain*', at: 1.5, out: [6.85, 7.1], top: 1375, cx: 520, rot: -2.5 },
    { text: 'pic 2: *also a mountain*', at: 3.3, out: [6.85, 7.1], top: 1483, cx: 560, rot: 2 },
    { text: 'pic 6: *is that… you?*', at: 5.15, out: [6.85, 7.1], top: 1591, cx: 510, rot: -1.5 },
    { text: 'trip planned: *for two*', at: 7.75, out: [8.75, 8.95], top: 1420, cx: 540, rot: -2 },
  ],
  nowLine: { who: 'hero', text: 'where do *you* want to go?' },
  starsLine: 'Same wanderer. *New co-pilot.*',
  snap: 5.7,
  moods(ph, t) {
    if (ph === 'then') return { mood: 'sparkle', look: [0.4, -1] }
    if (ph === 'now') return t > PIN2_T + 0.1 ? { mood: 'heart' } : { mood: 'happy', look: [1, 0] }
    return null
  },
  dateMoods(ph, t) {
    if (ph === 'then') return t > MAG_T ? { mood: 'wide', look: [-1, -1], squash: 0.04 } : t > 3.0 ? { mood: 'squint', look: [-1, -1] } : { mood: 'neutral', look: [-1, -1] }
    if (ph === 'now') return t > PIN2_T ? { mood: 'happy' } : { mood: 'sparkle', look: [-1, -0.5] }
    return null
  },
  heroHops: [...PIC_T.map(v => r3(v + 0.02))],
  dateHops: [PIN2_T, r3(PIN2_T + 0.35)],
  back: (x, t, T, ctx) => { profile(x, t, T, ctx); tripMap(x, t, T, ctx) },
  mid: (x, t, T, ctx) => { bigPack(x, t, T, ctx); packs(x, t, T, ctx) },
  cues: T => [
    ...PIC_T.map((v, i) => ['pop', v, [659.25, 659.25, 783.99, 880, 987.77, 1174.66][i], 0.03, (i % 3 - 1) * 0.3]),
    ['pluck', 3.32, 293.66, 0.035, 0.6, 0.2], ['whoosh', MAG_T, 0.35, 0.03], ['pop', r3(MAG_T + 0.2), 1567.98, 0.035, 0.4],
    ['tom', r3(T.sw + 0.4), 110, { gain: 0.12, decay: 0.2 }], ['tom', r3(T.sw + 0.65), 130, { gain: 0.1, decay: 0.2 }],
    ...[7.9, 8.3, 8.7, 9.1, 9.5].map(v => ['tick', v, 0.018]),
    ['pop', 9.6, 1174.66, 0.03, 0.2],
    ['pop', PIN2_T, 1318.51, 0.04, -0.2], ['bell', r3(PIN2_T + 0.12), 1567.98, 0.03, 1.2, 0], ['glitter', PIN2_T, r3(PIN2_T + 0.6)],
    ['pop', STOPS_T, 1567.98, 0.03, 0.3], ['pop', r3(STOPS_T + 0.1), 1975.53, 0.025, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
