// srl08hyperspace (20 s vertical, Star Talk Remix of the L08 "Hyperspace" loop) · story 0–15.6, then the shared end card.
// The original: a pixel-star tunnel surges on the kick while veiled deck cards and moons fly past.
// The remix: ♐ Sagittarius (the sign that loves a trip) pilots you through hyperspace in a flapping pixel scarf, with
// ♓ Pisces crying in the back seat. The cards whooshing past are tonight's deck — people — and Sag flies right past them.
//   0.00–5.80  "Buckle up. | *Light-speed.*"  Tunnel streaks surge on every beat. Drop (2.82): ♐: "WOOO! hyperspace, *baby!*"
//              Veiled deck cards start whooshing past the camera; a "PEOPLE PASSED" counter ticks up. Pisces: "r we there yet"
//   5.86–8.90  "Wait. Were those | *people?*"  THE STARS: "babe. you just flew past *six* people." The counter keeps going.
//   8.93       SCREECH. The brakes: the streaks freeze, Sag squashes, Pisces bonks forward. One card floats to the front.
//              "Slow | *down.*"  THE STARS: "one card. read it. *slowly.*"
//   11.65 cut  "Fast travel. | *Slow* love."  ♐: "...oh. *hi.*" — heart-eyes at the card; Pisces happy-cries. Out by 15.45.
// One canvas (tunnel + cards + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1', INK = '#1b1236'
const MONO = "'Space Mono', ui-monospace, monospace"
const BEAT = n => 0.6 + n * 0.5556, BL = 0.5556
const TAU = Math.PI * 2
const SAG = signStar('sagittarius'), PIS = signStar('pisces')
const CHAKRAS = ['#e8384f', '#f08a3a', '#f2c75c', '#5fc77a', '#3fa7e8', '#5b5be0', '#a65fe0']

const T = {
  h0: 0.12, h0Out: [5.62, 5.8], in: 0.3,
  open: 2.66, l1: BEAT(4),                       // the drop: 2.82
  h1: 5.86, h1Land: 6.3, l2: 6.0, h1Out: [8.62, 8.8],
  bubble1: [4.2, 5.5], bubble2: [7.4, 8.6],
  brake: BEAT(15), brakeLen: 0.42,              // 8.93
  hero: [9.0, 9.75],
  h1b: 9.05, h1bLand: 9.4, h1bOut: [11.45, 11.62], l3: 9.15,
  cut: 11.65, h2: 11.7, h2Land: 12.08, l4: 11.85, close: 13.95,
  heart: 12.15, h2Out: [15.18, 15.42], out: [15.1, 15.45],
}
const SS = '♐ SAG STAR', SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SS, text: 'WOOO! hyperspace, *baby!*', color: '#c9a6ff' },
  { t: T.l2, speaker: SPEAK, text: 'babe. you just flew past *six* people.' },
  { t: T.l3, speaker: SPEAK, text: 'one card. read it. *slowly.*' },
  { t: T.l4, speaker: SS, text: '...oh. *hi.*', color: PINK },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const frac = v => v - Math.floor(v)
const ss = (a, b, v) => { const u = clamp((v - a) / (b - a)); return u * u * (3 - 2 * u) }

// ── the flight phase: surges on every beat, then the brakes
const V0 = 0.16, SURGE = 0.03
function Pfast(t) {
  const b = Math.max(0, (t - 0.6) / BL), n = Math.floor(b), u = b - n
  return V0 * t + SURGE * (n + 1 - Math.pow(1 - u, 3))
}
const VB = (Pfast(T.brake + 0.005) - Pfast(T.brake - 0.005)) / 0.01
function phase(t) {
  if (t <= T.brake) return Pfast(t)
  const dt = t - T.brake, D = T.brakeLen, u = Math.min(dt, D)
  return Pfast(T.brake) + VB * (u - u * u / (2 * D)) + 0.012 * Math.max(0, dt - D)
}
const speed = t => (phase(t + 0.01) - phase(t - 0.01)) / 0.02

const VX = 540, VY = 840, NEAR = 0.16, FAR = 9, FOC = 520
const depth = z => lerp(FAR, NEAR, Math.pow(z, 1.35))
const STARS = (() => {
  const r = rng(8088)
  return Array.from({ length: 420 }, () => ({ a: r() * TAU, rad: 0.35 + Math.pow(r(), 0.6) * 1.9, z0: r(), k: [1, 2, 2, 3][Math.floor(r() * 4)], size: 1 + Math.floor(r() * 3), gold: r() < 0.2 }))
})()
// the deck cards whooshing past (on the beat), and two moons
const CARD_IMGS = ['card-profile-1', 'card-profile-2', 'card-profile-4', 'card-profile-5', 'card-profile-6', 'card-profile-1', 'card-profile-2', 'card-profile-4', 'card-profile-6']
const FLY = 1.15
const FLYERS = CARD_IMGS.map((img, i) => ({ img, t0: BEAT(4 + i) - FLY * 0.8, a: [-2.5, -0.5, 2.6, 0.4, -2.0, 2.1, -0.8, 1.0, 3.0][i], rad: 0.5, spin: i % 2 ? 1 : -1 }))
const MOONS = [{ t0: 1.2, a: 0.3 }, { t0: 6.8, a: -2.8 }]
const passTime = f => f.t0 + FLY * 0.92
const passedBy = t => FLYERS.filter(f => passTime(f) <= t).length
const HERO_IMG = 'card-profile-3'

// layout
const SAG0 = { x: 540, y: 1160, size: 300 }, SAG1 = { x: 230, y: 1255, size: 230 }
const PIS0 = { x: 850, y: 690, size: 140 }, PIS1 = { x: 870, y: 1265, size: 180 }
const HERO = { x: 540, y: 845, w: 380 }

const SAG_HOPS = [T.in + 0.3, ...talkHops(LINES, SS, { cps: CPS }), T.heart, T.heart + 0.5]
const PIS_HOPS = [4.25, 7.45, T.brake + 0.1, T.heart + 0.25, T.heart + 0.7]

function sagState(t) {
  if (t < T.l1) return { mood: 'happy', look: [0, 0] }
  if (t < T.h1) return { mood: 'sparkle', look: [0, 0] }
  if (t < T.l2 + 1.2) return { mood: 'happy', look: [0, -1] }
  if (t < T.brake) return { mood: 'squint', look: [0, 0] }                 // "six? pfft"
  if (t < T.hero[1]) return { mood: 'wide', look: [1, -1], blink: false }
  if (t < T.l4) return { mood: 'neutral', look: [1, -1] }                  // reading. slowly.
  if (t < T.heart) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'heart' }
}
function pisState(t) {
  if (t < T.brake) return { mood: 'squint', look: [0, 1] }                 // queasy, crying
  if (t < T.brake + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
  if (t < T.heart) return { mood: 'neutral', look: [-1, -1] }
  return { mood: 'sparkle', look: [-1, -1] }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const imgs = {}
  await Promise.all([...new Set([...CARD_IMGS, HERO_IMG])].map(n => new Promise(res => { const i = new Image(); i.onload = () => res(); i.onerror = () => res(); i.src = ASSETS + n + '.png'; imgs[n] = i })))
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Buckle up. | *Light-speed.*', { top: 200, size: 120, fit: true, accentSize: 190, at: T.h0, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h0 + 0.4 })
  const H1 = popText(root, 'Wait. Were those | *people?*', { top: 210, size: 110, fit: true, accentSize: 190, at: T.h1, gap: 0.08, late: 1, lateAt: T.h1Land, wobble: true, accentColor: PINK })
  const H1b = popText(root, 'Slow | *down.*', { top: 170, size: 120, accentSize: 210, at: T.h1b, late: 1, lateAt: T.h1bLand, wobble: true, accentColor: GOLD, lineHeight: 0.92 })
  const H2 = popText(root, 'Fast travel. | *Slow* love.', { top: 160, size: 120, fit: true, accentSize: 200, at: T.h2, late: 2, lateAt: T.h2Land, lateGap: 0.16, wobble: true, accentColor: PINK, lineHeight: 0.98 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1420, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function chakraAt(p) {
    const f = frac(p) * 7, i = Math.floor(f), u = f - i
    const h = c => [1, 3, 5].map(k => parseInt(c.slice(k, k + 2), 16))
    const a = h(CHAKRAS[i % 7]), b = h(CHAKRAS[(i + 1) % 7]), s = u * u * (3 - 2 * u)
    return a.map((v, k) => Math.round(lerp(v, b[k], s)))
  }
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`

  function tunnel(t) {
    const P = phase(t), sp = speed(t), fast = clamp(sp / (VB || 1)), neb = chakraAt(t / 8), neb2 = chakraAt(t / 8 + 0.33)
    const beatK = Math.exp(-frac((t - 0.6) / BL) * 4) * (t < T.brake ? 1 : 0)
    const roll = 0.06 * Math.sin(t * 0.8) * fast
    x.save()
    let g = x.createRadialGradient(VX, VY, 0, VX, VY, 1300)
    g.addColorStop(0, rgba(neb, 0.36 * (0.4 + 0.6 * fast) + 0.12 * beatK)); g.addColorStop(0.2, rgba(neb, 0.15)); g.addColorStop(0.5, rgba(neb2, 0.05)); g.addColorStop(1, rgba(neb2, 0))
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    x.translate(VX, VY); x.rotate(roll)
    // octagon rings
    for (let j = 0; j < 8; j++) {
      const z = frac(j / 8 + 2 * P), d = depth(z), R = FOC * 2.1 / d
      if (R > 1700) continue
      const al = ss(0, 0.25, z) * (1 - ss(0.7, 0.95, z)) * (0.25 + 0.25 * beatK) * (0.4 + 0.6 * fast)
      x.strokeStyle = rgba(chakraAt(t / 8 + j / 16), al); x.lineWidth = Math.min(7, Math.max(1.5, 12 / d))
      x.beginPath()
      for (let q = 0; q <= 8; q++) { const a = (q + 0.5) * Math.PI / 4, px = Math.cos(a) * R, py = Math.sin(a) * R * 1.35; q ? x.lineTo(px, py) : x.moveTo(px, py) }
      x.stroke()
    }
    // streaks
    x.globalCompositeOperation = 'lighter'
    const stretch = 0.012 * fast + 0.035 * beatK
    for (const s of STARS) {
      const z = frac(s.z0 + s.k * P), d = depth(z), d2 = depth(Math.max(0, z - stretch * s.k))
      const ca = Math.cos(s.a), sa = Math.sin(s.a)
      const px = ca * s.rad * FOC / d, py = sa * s.rad * FOC * 1.3 / d
      if (Math.abs(px) > 700 || Math.abs(py) > 1150) continue
      const al = ss(0, 0.18, z) * (1 - ss(0.94, 1, z))
      if (al <= 0.01) continue
      const col = s.gold ? '242,199,92' : '255,247,236', w = Math.min(9, Math.max(1, s.size * (0.5 + 1.8 / d)))
      if (fast > 0.05) { x.strokeStyle = `rgba(${col},${al * 0.8})`; x.lineWidth = w; x.beginPath(); x.moveTo(ca * s.rad * FOC / d2, sa * s.rad * FOC * 1.3 / d2); x.lineTo(px, py); x.stroke() }
      const pp = Math.max(2, Math.round(w * 1.2))
      x.fillStyle = `rgba(255,250,240,${al})`; x.fillRect(Math.round(px / pp) * pp - pp / 2, Math.round(py / pp) * pp - pp / 2, pp, pp)
    }
    x.restore()
    // the chakra column at the vanishing point (dims once we brake: the destination is the card now)
    const colA = 1 - 0.7 * prog(t, T.brake, T.hero[1])
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = colA
    const core = x.createRadialGradient(VX, VY, 0, VX, VY, 280)
    core.addColorStop(0, `rgba(255,243,224,${0.25 + 0.25 * beatK})`); core.addColorStop(0.3, rgba(neb, 0.2)); core.addColorStop(1, rgba(neb, 0))
    x.fillStyle = core; x.beginPath(); x.arc(VX, VY, 280, 0, TAU); x.fill()
    for (let i = 0; i < 7; i++) {
      const y = VY + (3 - i) * 34
      x.fillStyle = CHAKRAS[i]; x.fillRect(VX - 7, y - 7, 14, 14); x.fillStyle = '#fff'; x.fillRect(VX - 3, y - 3, 6, 6)
    }
    x.restore()
  }

  function flyers(t) {
    // two moons
    for (const m of MOONS) {
      const z = (t - m.t0) / 2.2
      if (z <= 0 || z >= 1 || t > T.brake + 0.3) continue
      const d = depth(z), r = 70 * 0.9 / d, mx = VX + Math.cos(m.a) * 0.55 * FOC / d, my = VY + Math.sin(m.a) * 0.55 * FOC * 1.3 / d
      x.save(); x.globalAlpha = ss(0.1, 0.3, z) * (1 - ss(0.9, 1, z))
      x.shadowColor = 'rgba(239,230,214,0.6)'; x.shadowBlur = 30
      x.fillStyle = BONE; x.beginPath(); x.arc(mx, my, r, 0, TAU); x.fill(); x.shadowBlur = 0
      x.beginPath(); x.arc(mx, my, r + 1, 0, TAU); x.clip()
      x.fillStyle = '#1a1238'; x.beginPath(); x.arc(mx + r * 0.45, my - r * 0.2, r * 0.9, 0, TAU); x.fill()
      x.restore()
    }
    // the deck cards, nearest last
    const list = FLYERS.map(f => ({ f, z: (t - f.t0) / FLY })).filter(o => o.z > 0 && o.z < 1).sort((a, b) => a.z - b.z)
    for (const { f, z } of list) {
      const d = depth(z * 0.985), im = imgs[f.img]
      if (!im || !im.naturalWidth) continue
      const px = VX + Math.cos(f.a) * f.rad * FOC / d, py = VY + Math.sin(f.a) * f.rad * FOC * 1.3 / d, sc = 0.9 / d
      const al = ss(0.1, 0.3, z) * (1 - ss(0.93, 0.995, z)) * (t > T.brake ? 1 - prog(t, T.brake, T.brake + 0.2) : 1)
      if (al <= 0.01) continue
      const cw = 400 * sc, ch = cw * im.naturalHeight / im.naturalWidth
      x.save(); x.translate(px, py); x.globalAlpha = al
      x.rotate(f.spin * (0.3 + z * 1.6)); x.scale(0.4 + 0.6 * Math.abs(Math.cos(z * 4 + f.a)), 1)
      x.drawImage(im, -cw / 2, -ch / 2, cw, ch)
      x.restore()
    }
  }

  function hero(t) {
    const p = prog(t, ...T.hero), im = imgs[HERO_IMG]
    if (p <= 0 || !im || !im.naturalWidth) return
    const e = easeOutBack(p, 1.3), out = popOut(t, T.out)
    if (out <= 0) return
    const w = lerp(20, HERO.w, e) * out, h = w * im.naturalHeight / im.naturalWidth
    const cx = lerp(VX, HERO.x, e), cy = lerp(VY, HERO.y, e) + Math.sin(t * 1.8) * 8
    x.save()
    const gl = x.createRadialGradient(cx, cy, 0, cx, cy, w * 1.1)
    gl.addColorStop(0, `rgba(242,199,92,${0.35 * clamp(p * 2)})`); gl.addColorStop(1, 'rgba(242,199,92,0)')
    x.globalCompositeOperation = 'lighter'; x.fillStyle = gl; x.fillRect(cx - w * 1.2, cy - w * 1.2, w * 2.4, w * 2.4)
    x.globalCompositeOperation = 'source-over'
    x.translate(cx, cy); x.rotate((1 - e) * 0.5 + 0.02 * Math.sin(t * 1.3))
    x.globalAlpha = clamp(p * 3)
    x.drawImage(im, -w / 2, -h / 2, w, h)
    x.restore()
    // a few sparkles around it
    x.save()
    for (let i = 0; i < 6; i++) {
      const ph = frac(t * 0.5 + i / 6), a = i * 1.7
      x.globalAlpha = Math.sin(Math.PI * ph) * clamp(p * 2) * out
      drawPixelStar(x, cx + Math.cos(a) * (w * 0.62 + 20), cy + Math.sin(a) * (h * 0.5 + 10), 22, 1, i % 2 ? GOLD : BONE)
    }
    x.restore()
  }

  // a pixel scarf flapping behind Sag (it trails toward the vanishing point → the wind is in our faces)
  function scarf(t, r, size, fast) {
    const n = 9, cell = Math.round(size / 26)
    x.save()
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1)
      const sx = r.x - size * 0.18 - u * size * (0.35 + 0.45 * fast)
      const sy = r.y + size * 0.05 - u * size * 0.25 * fast + Math.sin(t * (6 + 10 * fast) - i * 0.9) * cell * (1 + 2.2 * u) * (0.3 + fast)
      x.fillStyle = INK; x.fillRect(Math.round(sx - cell * 1.5) - 3, Math.round(sy - cell) - 3, cell * 3 + 6, cell * 2 + 6)
    }
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1)
      const sx = r.x - size * 0.18 - u * size * (0.35 + 0.45 * fast)
      const sy = r.y + size * 0.05 - u * size * 0.25 * fast + Math.sin(t * (6 + 10 * fast) - i * 0.9) * cell * (1 + 2.2 * u) * (0.3 + fast)
      x.fillStyle = i % 2 ? GOLD : '#ff6a4a'; x.fillRect(Math.round(sx - cell * 1.5), Math.round(sy - cell), cell * 3, cell * 2)
    }
    x.restore()
  }

  function bubble(t, [a, b], text, cx, cy) {
    const k = pop01(t, a, 0.25, 2.4) * (1 - prog(t, b - 0.15, b))
    if (k <= 0.01) return
    x.save(); x.font = `700 30px ${MONO}`
    const w = x.measureText(text).width + 36, h = 56
    x.translate(cx, cy); x.scale(k, k)
    x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
    x.fillStyle = BONE; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillRect(w / 2 - 50, -h / 2 - 14, 14, 14); x.fillRect(w / 2 - 44, -h / 2 - 22, 8, 8)
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 2)
    x.restore()
  }

  function counter(t) {
    const k = pop01(t, passTime(FLYERS[0]) - 0.05, 0.3, 2.4) * outK(t, [T.brake + 0.3, T.brake + 0.55])
    if (k <= 0.01) return
    const n = passedBy(t), bump = FLYERS.some(f => t >= passTime(f) && t < passTime(f) + 0.15) ? 1.12 : 1
    x.save(); x.translate(540, 605); x.scale(k * bump, k * bump)
    x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    const label = `PEOPLE PASSED: ${n}`, w = x.measureText(label).width + 50, h = 74
    x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
    x.fillStyle = '#ff6a4a'; x.fillRect(-w / 2, -h / 2, w, h)
    x.fillStyle = 'rgba(16,9,38,0.92)'; x.fillRect(-w / 2 + 6, -h / 2 + 6, w - 12, h - 12)
    x.fillStyle = '#ff9a7a'; x.fillText(label, 0, 3)
    x.restore()
  }

  function tears(t, r, k) {
    x.save()
    for (let i = 0; i < 6; i++) {
      const ph = frac(t * 1.6 + i / 6), side = i % 2 ? 1 : -1
      x.globalAlpha = clamp(k) * (1 - ph) * 0.95; x.fillStyle = '#9fe0ff'
      x.fillRect(Math.round(r.x + side * (r.size * 0.2 + ph * 40)), Math.round(r.y - 6 + ph * 90), 8, 10)
    }
    x.restore()
  }

  function drawStars(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const fast = clamp(speed(t) / VB), mv = ease.inOutCubic(prog(t, T.brake + 0.05, T.brake + 0.6))
    // brake jolt: everyone lurches forward (squash + a forward slide)
    const jolt = t > T.brake && t < T.brake + 0.6 ? Math.exp(-(t - T.brake) * 7) : 0
    const shake = t < T.brake ? Math.sin(t * 47) * 3 * fast : 0
    const pp = pop01(t, T.in + 0.15, 0.4, 2) * ok
    const P = { x: lerp(PIS0.x, PIS1.x, mv), y: lerp(PIS0.y, PIS1.y, mv) - jolt * 160, size: lerp(PIS0.size, PIS1.size, mv) }
    const rp = drawStarChar(x, P.x + shake, P.y, P.size, t, { color: PIS.color, glyph: null, ...pisState(t), hops: PIS_HOPS, pop: pp, seed: 11, glow: 0.8, squash: -0.15 * jolt })
    if (pp > 0.05) tears(t, rp, pp)
    bubble(t, T.bubble1, 'r we there yet', P.x - 80, P.y + P.size * 0.8)
    bubble(t, T.bubble2, '...now?', P.x - 30, P.y + P.size * 0.8)
    const sp = pop01(t, T.in, 0.4, 2.2) * ok
    const S = { x: lerp(SAG0.x, SAG1.x, mv), y: lerp(SAG0.y, SAG1.y, mv) - jolt * 60, size: lerp(SAG0.size, SAG1.size, mv) }
    if (sp > 0.02) {
      scarf(t, { x: S.x + shake, y: S.y }, S.size * sp, fast)
      drawStarChar(x, S.x + shake, S.y, S.size, t, { color: SAG.color, glyph: SAG.glyph, ...sagState(t), hops: SAG_HOPS, pop: sp, seed: 4, glow: 1.15, squash: 0.25 * jolt * Math.cos((t - T.brake) * 20) })
    }
    // brake skid sparks
    const bt = t - T.brake
    if (bt > 0 && bt < 0.6) {
      x.save()
      for (let i = 0; i < 12; i++) {
        const a = Math.PI * (0.15 + 0.7 * (i / 11)), d = 40 + bt * 500
        x.globalAlpha = 1 - bt / 0.6
        drawPixelStar(x, S.x + Math.cos(a) * d * (i % 2 ? 1 : -1), S.y + S.size * 0.35 + Math.sin(a) * d * 0.3, 18, 1, i % 3 ? GOLD : '#ff6a4a')
      }
      x.restore()
    }
    // hearts at the card
    if (t > T.heart) {
      for (let i = 0; i < 8; i++) {
        const born = T.heart + i * 0.28, p = (t - born) / 1.3
        if (p < 0 || p >= 1 || born > T.out[0] - 0.4) continue
        const hx = (i % 2 ? S.x : P.x) + Math.sin(p * 6 + i) * 20, hy = (i % 2 ? S.y : P.y) - 120 - p * 220
        x.save(); x.globalAlpha = Math.sin(Math.PI * p); x.fillStyle = '#ff4f86'
        const c = 7; [[1, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [2, 2], [3, 2], [2, 3]].forEach(([i2, j]) => x.fillRect(Math.round(hx + (i2 - 2.5) * c), Math.round(hy + j * c), c, c))
        x.restore()
      }
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: SKY_H.dim * 0.6 })
      x.fillStyle = 'rgba(8,5,22,0.45)'; x.fillRect(0, 0, 1080, 1920)
      if (t < T.out[1] + 0.02) {
        tunnel(t)
        flyers(t)
        hero(t)
        counter(t)
        drawStars(t)
      }
      // a white flash on the brake
      const fl = t > T.brake ? Math.exp(-(t - T.brake) * 10) * 0.35 : 0
      if (fl > 0.01) { x.fillStyle = `rgba(255,246,230,${fl})`; x.fillRect(0, 0, 1080, 1920) }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card cut candidates: 5.84 (H0 → "Were those people?") and 11.65 ("Slow down." → the last line). A 20 s film keeps one (11.65).
const CUTS = [5.84, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ...wordPops(T.h0, 2, 0.1, 0, 0.026), ['pop', T.h0 + 0.4, 1174.66, 0.045, 0],
  ['whoosh', 0.2, 0.8, 0.05], ['pop', T.in + 0.05, 739.99, 0.04, 0], ['pop', T.in + 0.2, 587.33, 0.03, 0.4],
  ['whoosh', MOONS[0].t0 + 1.6, 0.5, 0.03], ['whoosh', MOONS[1].t0 + 1.6, 0.5, 0.03],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  // each card whooshes past + the counter ticks
  ...FLYERS.flatMap((f, i) => [['whoosh', +(passTime(f) - 0.35).toFixed(3), 0.45, i % 2 ? 0.05 : 0.06], ['tick', +passTime(f).toFixed(3), 0.03]]),
  ['pop', T.bubble1[0], 523.25, 0.03, 0.5], ['pop', T.bubble2[0], 493.88, 0.03, 0.5],
  ...wordPops(T.h1, 3, 0.08, 2, 0.025), ['pop', T.h1Land, 1318.51, 0.045, 0],
  ['riser', 7.3, T.brake, 0.05],
  // the brakes
  ['boom', T.brake, 0.24], ['tick', T.brake, 0.06], ['tick', T.brake + 0.06, 0.05], ['tick', T.brake + 0.12, 0.04], ['whoosh', T.brake, 0.4, 0.05],
  ['pop', T.brake + 0.12, 440, 0.04, 0.5],
  ['bell', T.hero[0] + 0.3, 1174.66, 0.03, 1.8, 0], ['glitter', T.hero[0] + 0.2, T.hero[1] + 0.3],
  ...wordPops(T.h1b, 1, 0.1, 1, 0.026), ['pop', T.h1bLand, 1174.66, 0.045, 0],
  ...wordPops(T.h2, 2, 0.08, 0, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land + 0.16, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heart, 1567.98, 0.045, 0.6, -0.3], ['glitter', T.heart, T.heart + 0.5],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
