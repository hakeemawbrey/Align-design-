// Houston Star Talk · worker w02 (hst036–hst060): the ADVICE format (promo/posting/htx/FARM.md §2).
// One sign's star looks straight at YOU and gives Houston-flavoured dating advice in a retro RPG dialogue box
// (canvas, same look as startalk.js: stepped gold pixel border, name tag, typewriter text, blinking ▼), then a
// ★ LESSON UNLOCKED banner, then the Jan 9 party ticket (kit.js partyCard). Built on starrace/ep.js makeEpisode.
//
// advice(A) → a makeEpisode spec.
//   A = { sign, hook, close, stars, lesson: ['white line', 'gold italic line'], lessonSet?, sting?,
//         beats: [{ set(x, t, lt, P), back?, front?, head?, at?: [x, y, size] | keys, look?, cast?, mood?,
//                   lines: ['text' | ['text', mood, speaker?]], cues? }] }
//   Speakers: default the hero sign. A line's speaker can be another sign id in the beat's cast.
// Everything is a pure function of t.
import { clamp, prog, ease, lerp } from '../../src/lib.js'
import { box, txt, tinyStar } from '../starrace/ep.js'
import { label, sparkles, pop01, signChar, hearts, GOLD, BONE, PINK, INK, INTER, MONO, SERIF, GLYPH_FONT, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, car, freeway, shield, heatSun, sweat, partyCard, kolache, klobasnek, taco, streetSign, overheadSign, mural, coffeeShop, slab, soupPot, BRAKE, HGREEN } from './kit.js'

export const GY = 1080                         // ground line of every set (the dialogue box sits below it)
export const HERO = [540, 880, 340]
export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0], ['whoosh', 0.0, 0.4, 0.02]]
export const GLYPH = { aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓' }
export const COLOR = { aries: '#f0603a', taurus: '#e9b24a', gemini: '#f2cf4a', cancer: '#3fb6f0', leo: '#f39a3a', virgo: '#ef5c94', libra: '#e163d6', scorpio: '#e23d66', sagittarius: '#a35cf0', capricorn: '#2fc79a', aquarius: '#38c4ec', pisces: '#7c74f0' }
const r2 = v => Math.round(v * 100) / 100
const CPS = 30, HOLD = 1.6, LEAD = 0.3
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))

// ── the RPG dialogue box (canvas) ───────────────────────────────────────────────────────────────────────────
export const BOX = { l: 60, t: 1150, w: 960, h: 270 }
function stepRect(x, l, t, w, h, P, col) {
  x.fillStyle = col
  x.fillRect(l + 2 * P, t, w - 4 * P, h); x.fillRect(l, t + 2 * P, w, h - 4 * P); x.fillRect(l + P, t + P, w - 2 * P, h - 2 * P)
}
export function panel(x, l, t, w, h, { fill = 'rgba(13,8,32,0.9)', border = GOLD, P = 6 } = {}) {
  x.save(); x.shadowColor = 'rgba(242,199,92,0.45)'; x.shadowBlur = 22; stepRect(x, l, t, w, h, P, border); x.restore()
  stepRect(x, l, t, w, h, P, border)
  stepRect(x, l + P, t + P, w - 2 * P, h - 2 * P, P, '#0d0820')
  stepRect(x, l + P, t + P, w - 2 * P, h - 2 * P, P, fill)
  x.strokeStyle = 'rgba(239,230,214,0.45)'; x.lineWidth = 3; x.strokeRect(l + 2.5 * P, t + 2.5 * P, w - 5 * P, h - 5 * P)
  x.fillStyle = '#fff1c8'; x.fillRect(l + 2 * P, t, 3 * P, P / 2); x.fillRect(l, t + 2 * P, P / 2, 2 * P)
}
const parse = s => { const out = []; let acc = false; for (const ch of String(s)) { if (ch === '*') { acc = !acc; continue } out.push({ ch, acc }) } return out }
/** wrap a line ('|' forces a break) into rows of { ch, acc } that fit maxW at the current font */
function rows(x, text, maxW) {
  const R = []
  for (const part of String(text).split('|')) {
    const cs = parse(part.trim()); let row = [], word = []
    const width = a => x.measureText(a.map(c => c.ch).join('')).width
    const flush = () => { if (row.length && width([...row, ...word]) > maxW) { R.push(row); row = word.slice(word[0]?.ch === ' ' ? 1 : 0) } else row = [...row, ...word]; word = [] }
    for (const c of cs) { if (c.ch === ' ') { flush(); word = [c] } else word.push(c) }
    flush(); if (row.length) R.push(row)
  }
  return R
}
export function dialogue(x, t, L, kOpen) {
  if (!L || kOpen <= 0.01) return
  const { l, t: top, w, h } = BOX
  x.save(); x.translate(540, top + h / 2); x.scale(1, clamp(kOpen)); x.translate(-540, -(top + h / 2))
  panel(x, l, top, w, h)
  // name tag
  const name = L.name, col = L.color
  x.font = `700 32px ${MONO}`; const nw = x.measureText(name).width + 96
  const tk = pop01(t, L.tagAt, 0.25, 1.8)
  if (tk > 0) {
    x.save(); x.translate(l + 40, top - 6); x.scale(tk, tk)
    box(x, 0, -34, nw, 64, col, 5)
    x.font = `700 36px ${GLYPH_FONT}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(L.glyph || '★', 34, 0)
    txt(x, name, 62, 1, { size: 32, col: INK, font: MONO, weight: 700, align: 'left' })
    x.restore()
  }
  // typed text
  const size = L.size || 50
  x.font = `800 ${size}px ${INTER}`
  const R = rows(x, L.text, w - 110)
  const n = Math.floor((t - L.t0) * CPS)
  let k = 0
  const lh = size * 1.22, y0 = top + h / 2 - (R.length - 1) * lh / 2 + 8
  x.textAlign = 'left'; x.textBaseline = 'middle'
  R.forEach((row, j) => {
    let cx = l + 56
    for (const c of row) {
      if (k++ >= n) break
      x.font = c.acc ? `italic 600 ${size + 6}px ${SERIF}` : `800 ${size}px ${INTER}`
      x.fillStyle = c.acc ? GOLD : BONE; x.fillText(c.ch, cx, y0 + j * lh)
      cx += x.measureText(c.ch).width
    }
  })
  if (t > L.done && Math.floor((t - L.done) * 2.4) % 2 === 0) { x.fillStyle = GOLD; x.beginPath(); x.moveTo(l + w - 70, top + h - 46); x.lineTo(l + w - 40, top + h - 46); x.lineTo(l + w - 55, top + h - 28); x.fill() }
  x.restore()
}
const chars = s => parse(String(s).replace(/\s*\|\s*/g, ' ')).length

// ── ★ LESSON UNLOCKED ───────────────────────────────────────────────────────────────────────────────────────
export function lessonBanner(x, t, lt, lesson) {
  const k = pop01(t, t - lt + 0.15, 0.35, 2.0)
  if (k > 0) {
    x.save(); x.translate(540, 560); x.rotate(-0.03); x.scale(k, k)
    panel(x, -400, -70, 800, 140, { fill: 'rgba(28,18,64,0.95)' })
    txt(x, '★ LESSON UNLOCKED', 0, 4, { size: 54, col: GOLD, font: MONO, weight: 700 })
    x.restore()
  }
  if (lt > 0.4) sparkles(x, t, 540, 560, t - lt + 0.4, 14, 360, 9)
  const lk = clamp((lt - 0.8) / 0.4)
  if (lk > 0) {
    x.save(); x.globalAlpha = lk
    const fit = (s, base, font, weight, italic) => { let z = base; x.font = `${italic ? 'italic ' : ''}${weight} ${z}px ${font}`; while (x.measureText(s).width > 940 && z > 30) { z -= 2; x.font = `${italic ? 'italic ' : ''}${weight} ${z}px ${font}` } return z }
    const [a, b] = lesson
    txt(x, a, 540, 740, { size: fit(a, 66, INTER, 800), col: BONE })
    txt(x, b, 540, 840, { size: fit(b, 80, SERIF, 500, true), col: GOLD, font: SERIF, weight: 500, italic: true })
    x.restore()
  }
}
export function lessonCues(at) { return [523.25, 659.25, 783.99, 1046.5].map((f, i) => ['pluck', r2(at + i * 0.09), f, 0.05, 0.5, 0]).concat([['glitter', r2(at + 0.3), r2(at + 1.0)], ['bell', r2(at + 0.4), 1318.5, 0.02, 1.6, 0]]) }

// ── the builder ─────────────────────────────────────────────────────────────────────────────────────────────
export function advice(A) {
  const hero = A.sign
  let acc = 0
  const LINES = [], scenes = [], cues = [...(A.sting || STING)]
  A.beats.forEach((b, i) => {
    const t0 = acc
    let tt = t0 + (i === 0 ? 0.25 : LEAD)
    const local = []
    for (const raw of b.lines || []) {
      const [text, mood, who] = Array.isArray(raw) ? raw : [raw]
      const sp = who || hero
      const done = tt + chars(text) / CPS
      const L = { t0: r2(tt), done: r2(done), text, mood, sp, name: `${(sp === 'stars' ? 'THE STARS' : sp.toUpperCase() + ' STAR')}`, glyph: sp === 'stars' ? '★' : GLYPH[sp], color: sp === 'stars' ? GOLD : COLOR[sp] }
      LINES.push(L); local.push(L)
      // typing blips: a soft pop every 2nd letter, a tick when done
      let k = 0
      parse(String(text).replace(/\s*\|\s*/g, ' ')).forEach((c, j) => { if (/[\p{L}\p{N}]/u.test(c.ch) && k++ % 2 === 0) cues.push(['pop', r2(tt + j / CPS), [740, 830, 880, 990][(k + i) % 4] * (sp === hero ? 1 : 1.19), 0.011, 0]) })
      cues.push(['tick', r2(done + 0.04), 0.02])
      tt = done + HOLD
    }
    const dur = r2((b.dur ?? (tt - t0)) + (b.extra || 0))
    acc += dur
    const lmood = lt => { let m = null; for (const L of local) if (t0 + lt >= L.t0 - 0.05 && L.sp === hero) m = L.mood; return m }
    const at = b.at || HERO
    const cast = { [hero]: Array.isArray(at[0]) ? at : [[0, ...at]], ...(b.cast || {}) }
    const hops = { [hero]: [i === 0 ? 0.02 : 0.05, ...local.filter(L => L.sp === hero).flatMap(L => [L.t0 - t0, L.t0 - t0 + 0.55])], ...(b.hops || {}) }
    for (const L of local) if (L.sp !== hero && cast[L.sp]) hops[L.sp] = [...(hops[L.sp] || []), L.t0 - t0, L.t0 - t0 + 0.55]
    const baseMood = b.mood?.[hero]
    scenes.push({
      dur, set: b.set, back: b.back, cast, hops,
      look: { [hero]: b.look || [0, 0.15], ...(b.looks || {}) },
      mood: { ...(b.mood || {}), [hero]: lt => lmood(lt) || (typeof baseMood === 'function' ? baseMood(lt) : baseMood) || 'happy' },
      front: (x, t, lt, P) => {
        if (b.front) { x.save(); b.front(x, t, lt, P); x.restore() }
        if (b.head) { const a0 = Math.max(0.15, 2.75 - t0); label(x, 540, 330, b.head, pop01(t, t0 + a0, 0.3, 1.8), { size: 50, bg: b.headBg || GOLD, rot: -0.035 }) }
      },
    })
    for (const c of b.cues || []) { const cc = [...c]; cc[1] = r2(t0 + cc[1]); if (cc[0] === 'glitter' || cc[0] === 'riser') cc[2] = r2(t0 + cc[2]); cues.push(cc) }
  })
  // the lesson
  const LT = acc, LD = A.lessonDur || 5.2
  scenes.push({
    dur: LD, set: A.lessonSet || ((x, t) => { x.fillStyle = 'rgba(10,6,28,0.55)'; x.fillRect(0, 0, 1080, 1920) }),
    cast: { [hero]: [[0, 540, 1180, 300]] }, mood: { [hero]: 'sparkle' }, look: { [hero]: [0, 0.1] }, hops: { [hero]: [0.2, 1.1, 2.4] },
    front: (x, t, lt) => { if (lt < LD - 0.02) lessonBanner(x, t, lt, A.lesson) },
  })
  cues.push(...lessonCues(r2(LT + 0.15)))
  const boxEnd = LT
  const overlay = (x, t) => {
    if (t >= boxEnd + 0.25) return
    let L = null; for (const l of LINES) if (t >= l.t0 - 0.2) L = l
    if (!L) return
    const kOpen = Math.min(pop01(t, LINES[0].t0 - 0.2, 0.25, 1.6), 1 - ease.inQuad(prog(t, boxEnd, boxEnd + 0.22)))
    const prev = LINES[LINES.indexOf(L) - 1]
    dialogue(x, t, { ...L, tagAt: !prev || prev.sp !== L.sp ? L.t0 - 0.2 : -9 }, kOpen)
  }
  return {
    hook: A.hook, badge: BADGE, cues, endLen: 6.2, overlay, hookUntil: 2.6,
    end: (x, t, lt) => partyCard(x, t, lt, { line: A.close, stars: A.stars }),
    scenes,
  }
}

// ── Houston sets (ground at GY; pure f(t)) ──────────────────────────────────────────────────────────────────
export function grad(x, stops, y0 = 0, y1 = GY) { const g = x.createLinearGradient(0, y0, 0, y1); stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c)); x.fillStyle = g; x.fillRect(0, y0, 1080, y1 - y0) }
export function ground(x, col = '#221b38', y = GY) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }
export const night = (x, t, col = '#221b38') => { skyline(x, GY, t, { alpha: 0.85 }); ground(x, col) }
export function trees(x, base, t, { col = '#2f6b45', n = 7, h = 150, seed = 0 } = {}) {
  for (let k = 0; k < n; k++) { const cx = 60 + ((k * 173 + seed * 61) % 1000), s = 0.8 + ((k * 37 + seed) % 5) * 0.1, sw = Math.sin(t * 1.3 + k) * 4
    box(x, cx - 10, base - 70 * s, 20, 70 * s, '#5a3b22', 4)
    x.fillStyle = INK; x.beginPath(); x.arc(cx + sw, base - h * s, 72 * s, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx + sw, base - h * s, 64 * s, 0, Math.PI * 2); x.fill()
    x.fillStyle = 'rgba(255,255,255,0.08)'; x.beginPath(); x.arc(cx + sw - 20 * s, base - h * s - 20 * s, 26 * s, 0, Math.PI * 2); x.fill() }
}
export function water(x, top, h, t, { col = '#2f5a6a', hi = 'rgba(220,240,255,0.35)' } = {}) {
  x.fillStyle = col; x.fillRect(0, top, 1080, h)
  for (let k = 0; k < 26; k++) { const y = top + 12 + (k * 47) % (h - 20), xx = ((k * 211) + t * (30 + k % 3 * 20)) % 1180 - 100; x.fillStyle = hi; x.fillRect(xx, y, 60 + (k % 4) * 20, 5) }
}
/** a scrolling or jammed freeway with brake lights and a route shield */
export function fwy({ num = '59', sunset = false, jam = true, sign = null } = {}) {
  return (x, t, lt) => {
    if (sunset) grad(x, ['rgba(40,20,70,0)', 'rgba(255,120,90,0.55)'], 300, GY - 120)
    skyline(x, GY - 140, t, { alpha: 0.8 })
    freeway(x, GY - 150, 1920 - GY + 150, 3, jam ? lt * 8 : t * 600)
    if (num) shield(x, 930, 690, num, 0.8)
    if (sign) overheadSign(x, 540, 560, sign[0], sign[1], 1, { gold: sign[2] })
    for (const [cx, col] of [[120, '#7a5ab0'], [960, '#3a8f6a']]) car(x, cx + (jam ? Math.sin(t * 0.7 + cx) * 4 : 0), GY - 40, col, { brake: 0.7 + 0.3 * Math.sin(t * 3 + cx), s: 0.85, open: true })
  }
}
/** the hero rides in an open car (front prop) */
export const inCar = (id, col = '#b03a5a') => (x, t, lt, P) => { const [cx, cy, s] = P.at(id); car(x, cx, cy + s * 0.42, col, { brake: 0.8 + 0.2 * Math.sin(t * 3), s: s / 300, open: true }) }
export function bayou({ sunset = false } = {}) {
  return (x, t) => {
    if (sunset) grad(x, ['rgba(30,20,70,0)', 'rgba(255,150,100,0.5)'], 200, GY - 200)
    skyline(x, GY - 210, t, { alpha: 0.55 })
    trees(x, GY - 200, t, { n: 8, h: 110, seed: 2 })
    water(x, GY - 200, 130, t)
    x.fillStyle = '#c9a979'; x.fillRect(0, GY - 70, 1080, 70); x.fillStyle = '#b08f62'; for (let k = 0; k < 12; k++) x.fillRect(k * 96, GY - 40, 40, 6)
    ground(x, '#2c3a2a')
  }
}
function bat(x, cx, cy, s, t, k) { const f = Math.sin(t * 22 + k) > 0 ? 1 : -1; x.fillStyle = '#140c22'; x.fillRect(cx - 3 * s, cy - 2 * s, 6 * s, 4 * s); x.fillRect(cx - 9 * s, cy - 2 * s + f * 3 * s, 6 * s, 3 * s); x.fillRect(cx + 3 * s, cy - 2 * s + f * 3 * s, 6 * s, 3 * s) }
/** sunset over the bayou bridge: bats pour out from under it */
export function bats({ n = 46 } = {}) {
  return (x, t, lt) => {
    grad(x, ['#3b1f5e', '#c2557a', '#ff9a5a', '#ffd27a'], 0, GY - 230)
    heatSun(x, 790, GY - 300, t, 70)
    skyline(x, GY - 240, t, { alpha: 0.5, col: '#2a1838' })
    water(x, GY - 230, 160, t, { col: '#5a3a5a', hi: 'rgba(255,200,150,0.35)' })
    box(x, -10, GY - 300, 1100, 50, '#6d6a80', 6); for (let k = 0; k < 5; k++) box(x, 80 + k * 230, GY - 250, 40, 180, '#5a5770', 5)
    for (let k = 0; k < n; k++) { const ph = ((lt * 0.35 + k / n) % 1), a = -0.3 - (k % 7) * 0.32, r = 60 + ph * 900; bat(x, 540 + Math.cos(a) * r * (k % 2 ? 1 : -1) * 0.9, GY - 260 + Math.sin(a) * r * 0.8 + Math.sin(t * 3 + k) * 14, 2.2 + (k % 3) * 0.6, t, k) }
    ground(x, '#2c2338')
  }
}
function paddleBoat(x, cx, cy, col, t, k) { const b = Math.sin(t * 2 + k) * 6; box(x, cx - 90, cy - 30 + b, 180, 60, col, 6); box(x, cx - 70, cy - 110 + b, 140, 20, BONE, 5); box(x, cx - 66, cy - 92 + b, 10, 62, BONE, 3); box(x, cx + 56, cy - 92 + b, 10, 62, BONE, 3); x.fillStyle = INK; x.beginPath(); x.arc(cx + 92, cy + b, 22, 0, Math.PI * 2); x.fill(); x.strokeStyle = BONE; x.lineWidth = 5; x.beginPath(); x.arc(cx + 92, cy + b, 14, t * 4, t * 4 + 4); x.stroke() }
export function paddle() {
  return (x, t) => {
    grad(x, ['rgba(120,190,255,0.0)', 'rgba(140,210,255,0.35)'], 200, GY - 300)
    trees(x, GY - 300, t, { n: 9, h: 120, seed: 5, col: '#3a8a52' })
    water(x, GY - 300, 300, t, { col: '#3f7f8f' })
    paddleBoat(x, 200, GY - 200, '#ff8fb1', t, 1); paddleBoat(x, 880, GY - 130, '#8fe3ff', t, 2)
    ground(x, '#2f4a30')
  }
}
/** a night street of glowing generic shop signs (Bellaire, Hillcroft); lanterns optional */
export function neon({ signs = ['BOBA', 'PHO', 'HOT POT', 'NOODLES'], lanterns = false, cols = ['#ff5ad1', '#5ee0ff', '#ffd36b', '#7dffb0'] } = {}) {
  return (x, t) => {
    x.fillStyle = '#120c26'; x.fillRect(0, 260, 1080, GY - 260)
    signs.forEach((s, i) => {
      const l = 20 + i * (1040 / signs.length), w = 1040 / signs.length - 20
      box(x, l, 420, w, GY - 420, ['#2a1f4a', '#1f2a4a', '#3a1f3a', '#1f3a3a'][i % 4], 6)
      const on = Math.sin(t * 5 + i * 2) > -0.85
      x.save(); x.shadowColor = cols[i % cols.length]; x.shadowBlur = on ? 30 : 0
      box(x, l + 14, 450, w - 28, 90, '#0b0820', 4); txt(x, s, l + w / 2, 497, { size: s.length > 6 ? 34 : 44, col: on ? cols[i % cols.length] : '#554466' })
      x.restore()
      box(x, l + 30, 640, w - 60, 200, '#ffd98a', 5); x.fillStyle = 'rgba(0,0,0,0.25)'; x.fillRect(l + 30, 740, w - 60, 6)
    })
    if (lanterns) for (let k = 0; k < 7; k++) { const cx = 90 + k * 150, cy = 330 + Math.sin(k) * 20 + Math.sin(t * 1.5 + k) * 6; x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, 260); x.lineTo(cx, cy - 40); x.stroke(); x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 44, 52, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#e8343c'; x.beginPath(); x.ellipse(cx, cy, 38, 46, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = GOLD; x.fillRect(cx - 20, cy + 44, 40, 10); x.fillRect(cx - 4, cy + 54, 8, 26) }
    ground(x, '#1b1530')
    for (let k = 0; k < 10; k++) { x.fillStyle = `rgba(255,120,220,${(0.08 + 0.06 * Math.sin(t * 3 + k)).toFixed(2)})`; x.fillRect(k * 110, GY + 30 + (k % 3) * 40, 70, 8) }
  }
}
function dog(x, cx, base, t) { const wag = Math.sin(t * 14) * 10; box(x, cx - 50, base - 60, 100, 44, '#c98e4a', 5); box(x, cx + 30, base - 100, 56, 50, '#c98e4a', 5); box(x, cx + 70, base - 84, 26, 18, '#8a5a2a', 3); x.fillStyle = INK; x.fillRect(cx + 56, base - 88, 8, 8); box(x, cx - 44, base - 20, 14, 20, '#c98e4a', 3); box(x, cx + 24, base - 20, 14, 20, '#c98e4a', 3); x.strokeStyle = INK; x.lineWidth = 9; x.beginPath(); x.moveTo(cx - 50, base - 52); x.lineTo(cx - 80, base - 80 + wag); x.stroke(); x.fillStyle = '#e8343c'; x.beginPath(); x.moveTo(cx + 30, base - 52); x.lineTo(cx + 86, base - 52); x.lineTo(cx + 58, base - 28); x.fill() }
/** a Heights bungalow porch with string lights and a dog in a bandana */
export function porch({ dusk = true } = {}) {
  return (x, t) => {
    if (dusk) grad(x, ['rgba(40,30,80,0)', 'rgba(255,170,120,0.35)'], 200, GY - 200)
    box(x, 40, 380, 1000, GY - 380, '#7fa3b8', 8)
    for (let y = 400; y < GY; y += 34) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(48, y, 984, 4) }
    x.fillStyle = INK; x.beginPath(); x.moveTo(0, 400); x.lineTo(540, 230); x.lineTo(1080, 400); x.fill(); x.fillStyle = '#5a4a6a'; x.beginPath(); x.moveTo(30, 392); x.lineTo(540, 244); x.lineTo(1050, 392); x.fill()
    box(x, 90, 520, 170, 220, '#ffe7a8', 6); box(x, 820, 520, 170, 220, '#ffe7a8', 6); box(x, 470, 560, 140, GY - 620, '#6b3b1f', 6)
    for (let k = 0; k < 14; k++) { const cx = 60 + k * 74, cy = 440 + Math.sin(k * 0.45) * 28; x.fillStyle = Math.sin(t * 3 + k) > -0.6 ? '#ffe28a' : '#8a7a4a'; x.beginPath(); x.arc(cx, cy, 10, 0, Math.PI * 2); x.fill() }
    box(x, 0, GY - 70, 1080, 70, '#a87a52', 5); for (let k = 0; k < 18; k++) box(x, 10 + k * 60, GY - 170, 14, 100, BONE, 3); box(x, 0, GY - 180, 1080, 16, BONE, 3)
    dog(x, 210, GY - 70, t)
    ground(x, '#3a2a22')
  }
}
export function muralWall() { return (x, t) => { mural(x, t); ground(x, '#2a2338') } }
/** a brunch spot with an awning, a WAIT board and a line of tiny stars */
export function brunch({ wait = 'WAIT: 90 MIN' } = {}) {
  return (x, t, lt) => {
    grad(x, ['rgba(150,210,255,0.0)', 'rgba(255,230,180,0.35)'], 200, GY)
    box(x, 60, 420, 960, GY - 420, '#f4e1c4', 8)
    for (let k = 0; k < 8; k++) box(x, 60 + k * 120, 400, 120, 70, k % 2 ? '#e8708a' : BONE, 4)
    txt(x, 'BRUNCH', 540, 540, { size: 86, col: '#c0304a' })
    box(x, 620, 640, 200, GY - 640, '#6b3b1f', 6); box(x, 120, 640, 300, 200, '#bfe6ff', 6)
    box(x, 850, 700, 150, 190, '#2a2a2a', 6); txt(x, wait.split(':')[0] + ':', 925, 750, { size: 30, col: BONE, font: MONO, weight: 700 }); txt(x, wait.split(':')[1]?.trim() || '', 925, 810, { size: 34, col: GOLD, font: MONO, weight: 700 })
    ;['#f0603a', '#3fb6f0', '#a35cf0', '#2fc79a', '#ef5c94'].forEach((c, i) => tinyStar(x, 120 + i * 70 + Math.sin(t * 2 + i) * 3, GY - 40 - Math.abs(Math.sin(t * 3 + i)) * 6, 34, c))
    ground(x, '#3a3040')
  }
}
function crawfish(x, cx, cy, s, rot) { x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.fillStyle = INK; x.fillRect(-22, -9, 44, 18); x.fillStyle = '#e0402a'; x.fillRect(-20, -7, 40, 14); x.fillStyle = '#ff6a3a'; for (let k = 0; k < 4; k++) x.fillRect(-16 + k * 9, -7, 4, 14); x.fillStyle = '#e0402a'; x.fillRect(20, -12, 12, 8); x.fillRect(20, 4, 12, 8); x.fillStyle = INK; x.fillRect(-24, -2, 6, 4); x.restore() }
/** a backyard boil: newspaper table, a pile of crawfish, corn and potatoes, the pot steaming */
export function boil({ tiny = false, dusk = true } = {}) {
  return (x, t) => {
    if (dusk) grad(x, ['rgba(40,30,80,0)', 'rgba(255,160,110,0.4)'], 200, GY - 100)
    for (let k = 0; k < 14; k++) box(x, k * 80, 520, 70, GY - 520, '#8a6a4a', 4)
    for (let k = 0; k < 12; k++) { const cx = 50 + k * 90, cy = 470 + Math.sin(k * 0.5) * 20; x.fillStyle = Math.sin(t * 3 + k) > -0.6 ? '#ffe28a' : '#8a7a4a'; x.beginPath(); x.arc(cx, cy, 9, 0, Math.PI * 2); x.fill() }
    soupPot(x, 930, GY - 120, t)
    ground(x, '#2f3a26')
  }
}
export function boilTable(x, t, { tiny = false, y = GY + 10 } = {}) {
  box(x, 90, y - 40, 900, 60, '#ece4d2', 6); for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(40,40,60,0.25)'; x.fillRect(120 + k * 96, y - 30, 60, 6); x.fillRect(120 + k * 96, y - 16, 40, 6) }
  for (let k = 0; k < 26; k++) crawfish(x, 200 + (k * 97) % 680, y - 60 - ((k * 31) % 50), tiny ? 0.65 : 1.1, (k * 1.7) % 3)
  for (let k = 0; k < 3; k++) { box(x, 160 + k * 330, y - 76, 70, 26, '#f2cf4a', 4) }
}
/** a bakery counter: KOLACHES sign and a glass case */
export function bakery() {
  return (x, t) => {
    x.fillStyle = '#f6efe0'; x.fillRect(0, 260, 1080, GY - 260)
    for (let k = 0; k < 18; k++) for (let j = 0; j < 10; j++) if ((k + j) % 2) { x.fillStyle = 'rgba(80,140,200,0.12)'; x.fillRect(k * 60, 260 + j * 60, 60, 60) }
    box(x, 220, 340, 640, 120, '#c0304a', 8); txt(x, 'KOLACHES', 540, 402, { size: 78, col: BONE })
    box(x, 60, 720, 960, GY - 720, '#8a5530', 8)
    box(x, 80, 560, 920, 180, 'rgba(200,240,255,0.55)', 6)
    for (let k = 0; k < 5; k++) { kolache(x, 160 + k * 90, 650, 0.62) } for (let k = 0; k < 4; k++) klobasnek(x, 650 + k * 95, 655, 0.5)
  }
}
/** an arctic office: AC vent with icicles, snow falling inside, heat outside the window */
export function office() {
  return (x, t) => {
    x.fillStyle = '#cfe3f2'; x.fillRect(0, 260, 1080, GY - 260)
    box(x, 600, 380, 400, 300, '#ffcf7a', 8); heatSun(x, 800, 520, t, 60); x.fillStyle = INK; x.fillRect(796, 380, 8, 300); x.fillRect(600, 526, 400, 8)
    box(x, 120, 340, 300, 70, '#9fb4c8', 6); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(140 + k * 46, 356, 30, 6) }
    for (let k = 0; k < 7; k++) { x.fillStyle = '#e8f6ff'; x.beginPath(); x.moveTo(130 + k * 42, 410); x.lineTo(150 + k * 42, 410); x.lineTo(140 + k * 42, 440 + (k % 3) * 18); x.fill() }
    for (let k = 0; k < 30; k++) { const ph = (t * 0.25 + k / 30) % 1; x.fillStyle = '#ffffff'; x.fillRect((k * 137 + Math.sin(t + k) * 20) % 1080, 300 + ph * (GY - 300), 8, 8) }
    box(x, 120, 820, 840, 40, '#8a6a4a', 6)
    ground(x, '#6a7a8a')
  }
}
/** Galveston: the brown-green Gulf, sand, a pier, gulls */
export function beach() {
  return (x, t) => {
    grad(x, ['#8fd3ff', '#cfefff'], 260, GY - 330)
    heatSun(x, 860, 420, t, 60)
    water(x, GY - 330, 200, t, { col: '#7a7a4a', hi: 'rgba(255,255,230,0.45)' })
    for (let k = 0; k < 5; k++) { const y = GY - 150 + k * 4, ph = (t * 0.4 + k * 0.2) % 1; x.fillStyle = 'rgba(255,255,240,0.7)'; x.fillRect(0, y + ph * 20, 1080, 5) }
    x.fillStyle = '#e8d29a'; x.fillRect(0, GY - 130, 1080, 130)
    box(x, 640, GY - 360, 440, 24, '#8a6a4a', 5); for (let k = 0; k < 5; k++) box(x, 660 + k * 90, GY - 336, 14, 180, '#6b4a2a', 3)
    for (let k = 0; k < 3; k++) { const gx = (k * 330 + t * 60) % 1200 - 60, gy = 380 + k * 50 + Math.sin(t * 2 + k) * 12, f = Math.sin(t * 9 + k) * 10; x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(gx - 24, gy + f); x.lineTo(gx, gy); x.lineTo(gx + 24, gy + f); x.stroke() }
    ground(x, '#c9b07a')
  }
}
/** a gallery wall (free museum day) */
export function museum({ sign = 'FREE THURSDAY' } = {}) {
  return (x, t) => {
    x.fillStyle = '#efeae0'; x.fillRect(0, 260, 1080, GY - 260)
    ;[[90, 380, 260, 330, ['#e8343c', '#2b5fb0']], [420, 420, 240, 240, ['#f2c75c', '#1b1236']], [730, 360, 270, 360, ['#7dbf5a', '#ff8fb1']]].forEach(([l, tp, w, h, c]) => { box(x, l, tp, w, h, '#c9a24a', 10); x.fillStyle = c[0]; x.fillRect(l + 16, tp + 16, w - 32, (h - 32) / 2); x.fillStyle = c[1]; x.fillRect(l + 16, tp + 16 + (h - 32) / 2, w - 32, (h - 32) / 2) })
    box(x, 330, 780, 420, 70, INK, 4); txt(x, sign, 540, 816, { size: 40, col: GOLD, font: MONO, weight: 700 })
    ground(x, '#b8a888')
  }
}
/** the downtown tunnel: tiled corridor, arrows, shutters */
export function tunnel({ closed = false } = {}) {
  return (x, t) => {
    x.fillStyle = '#d8d2c4'; x.fillRect(0, 260, 1080, GY - 260)
    x.fillStyle = '#b9b1a0'; x.beginPath(); x.moveTo(0, 260); x.lineTo(380, 560); x.lineTo(700, 560); x.lineTo(1080, 260); x.fill()
    x.fillStyle = '#9a927f'; x.beginPath(); x.moveTo(0, GY); x.lineTo(380, 800); x.lineTo(700, 800); x.lineTo(1080, GY); x.fill()
    box(x, 380, 560, 320, 240, closed ? '#2a2a3a' : '#fff6d8', 6)
    for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(100 + k * 160, 300 + (k % 2) * 6, 90, 14) }
    box(x, 400, 380, 280, 70, HGREEN, 5); txt(x, '← TUNNEL →', 540, 416, { size: 36, col: BONE, font: MONO, weight: 700 })
    if (closed) { for (let k = 0; k < 8; k++) { x.fillStyle = k % 2 ? '#5a5a6a' : '#6a6a7a'; x.fillRect(380, 560 + k * 30, 320, 30) } x.save(); x.translate(540, 680); x.rotate(-0.06); box(x, -120, -34, 240, 68, BRAKE, 4); txt(x, 'CLOSED', 0, 2, { size: 40, col: BONE }); x.restore() }
    ground(x, '#7a7466')
  }
}
/** a downtown lawn at dusk with the skyline and a picnic blanket */
export function lawn({ blanket = true } = {}) {
  return (x, t) => {
    grad(x, ['rgba(60,40,110,0)', 'rgba(255,160,130,0.45)'], 200, GY - 160)
    skyline(x, GY - 150, t, { alpha: 0.9 })
    x.fillStyle = '#3f8a4a'; x.fillRect(0, GY - 160, 1080, 160)
    for (let k = 0; k < 40; k++) { x.fillStyle = 'rgba(255,255,255,0.08)'; x.fillRect((k * 97) % 1080, GY - 150 + (k * 37) % 140, 12, 4) }
    if (blanket) { x.save(); x.translate(820, GY - 60); x.scale(1, 0.4); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { x.fillStyle = (i + j) % 2 ? '#e8343c' : BONE; x.fillRect(-160 + i * 80, -160 + j * 80, 80, 80) } x.restore() }
    ground(x, '#2f5a32')
  }
}
function boot(x, cx, base, col = '#8a4a2a') { box(x, cx - 30, base - 140, 60, 110, col, 5); box(x, cx - 30, base - 40, 100, 40, col, 5); x.fillStyle = GOLD; x.fillRect(cx - 20, base - 110, 40, 6); x.fillRect(cx - 20, base - 90, 40, 6) }
/** a two-step dance hall: wood, string lights, boots by the door */
export function danceHall() {
  return (x, t) => {
    x.fillStyle = '#5a3420'; x.fillRect(0, 260, 1080, GY - 260)
    for (let k = 0; k < 12; k++) { x.fillStyle = k % 2 ? '#6a3e26' : '#5a3420'; x.fillRect(k * 90, 260, 90, GY - 260) }
    for (let row = 0; row < 3; row++) for (let k = 0; k < 16; k++) { const cx = k * 72 + (row % 2) * 36, cy = 340 + row * 70 + Math.sin(k * 0.6) * 18; x.fillStyle = Math.sin(t * 4 + k + row) > -0.5 ? ['#ffe28a', '#ff8fb1', '#8fe3ff'][row] : '#7a5a3a'; x.beginPath(); x.arc(cx, cy, 9, 0, Math.PI * 2); x.fill() }
    box(x, 300, 560, 480, 90, INK, 5); txt(x, 'TWO-STEP NIGHT', 540, 606, { size: 50, col: GOLD })
    boot(x, 90, GY - 4); boot(x, 190, GY - 4, '#6a3a1f')
    x.fillStyle = '#a8784a'; x.fillRect(0, GY, 1080, 1920 - GY); for (let k = 0; k < 14; k++) { x.fillStyle = 'rgba(0,0,0,0.15)'; x.fillRect(k * 80, GY, 5, 400) }
    x.fillStyle = INK; x.fillRect(0, GY - 6, 1080, 10)
  }
}
/** Clear Lake marina: sailboat masts, docks, calm water */
export function marina({ sunset = true } = {}) {
  return (x, t) => {
    if (sunset) grad(x, ['#3b2a6e', '#c2557a', '#ffb070'], 0, GY - 260)
    water(x, GY - 260, 200, t, { col: '#3a4f7a', hi: 'rgba(255,210,170,0.4)' })
    for (let k = 0; k < 5; k++) { const cx = 120 + k * 210, b = Math.sin(t * 1.5 + k) * 5; x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(cx, GY - 230 + b); x.lineTo(cx, GY - 560 + b); x.stroke(); x.fillStyle = BONE; x.beginPath(); x.moveTo(cx + 6, GY - 540 + b); x.lineTo(cx + 110, GY - 250 + b); x.lineTo(cx + 6, GY - 250 + b); x.fill(); box(x, cx - 80, GY - 236 + b, 200, 34, '#efe6d6', 5) }
    box(x, 0, GY - 70, 1080, 40, '#8a6a4a', 5); for (let k = 0; k < 9; k++) box(x, 30 + k * 125, GY - 40, 16, 60, '#6b4a2a', 3)
    ground(x, '#283050')
  }
}
/** a karaoke stage: mic stand, lyric screen, spotlights */
export function karaoke({ words = ['♪ ...and I never said it ♪', '♪ out loud ♪'] } = {}) {
  return (x, t, lt) => {
    x.fillStyle = '#1a0f2e'; x.fillRect(0, 260, 1080, GY - 260)
    for (let k = 0; k < 3; k++) { x.fillStyle = `rgba(255,${200 - k * 40},${150 + k * 40},0.12)`; x.beginPath(); x.moveTo(200 + k * 340, 260); x.lineTo(60 + k * 340, GY); x.lineTo(380 + k * 340, GY); x.fill() }
    box(x, 160, 330, 760, 250, '#0b1a3a', 8)
    words.forEach((w, i) => { txt(x, w, 540, 410 + i * 80, { size: 40, col: i === 0 ? '#8fe3ff' : BONE }) })
    const pr = (lt * 0.25) % 1; x.fillStyle = PINK; x.fillRect(200, 520, 680 * pr, 10)
    x.fillStyle = '#3a2a5a'; x.fillRect(0, GY - 40, 1080, 40)
    ground(x, '#251838')
  }
}
export function micStand(x, cx, base) { x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(cx, base); x.lineTo(cx, base - 300); x.stroke(); x.strokeStyle = '#9aa0aa'; x.lineWidth = 5; x.stroke(); box(x, cx - 18, base - 330, 36, 50, '#3a3a4a', 4) }
/** a house party in a backyard: string lights, a fence, a snack table */
export function party({ dusk = true } = {}) {
  return (x, t) => {
    if (dusk) grad(x, ['rgba(40,30,90,0)', 'rgba(255,120,160,0.35)'], 200, GY)
    for (let k = 0; k < 14; k++) box(x, k * 80, 560, 70, GY - 560, '#6a5a7a', 4)
    for (let row = 0; row < 2; row++) for (let k = 0; k < 13; k++) { const cx = 40 + k * 84, cy = 400 + row * 80 + Math.sin(k * 0.5 + row) * 24; x.fillStyle = Math.sin(t * 3 + k * 2 + row) > -0.6 ? ['#ffe28a', '#ff8fb1'][row] : '#7a6a5a'; x.beginPath(); x.arc(cx, cy, 10, 0, Math.PI * 2); x.fill() }
    ground(x, '#2a3a2a')
  }
}
/** a small apartment kitchen, a grey drizzly window, a steaming bowl */
export function kitchen({ temp = '60°' } = {}) {
  return (x, t) => {
    x.fillStyle = '#e9d9c0'; x.fillRect(0, 260, 1080, GY - 260)
    box(x, 600, 360, 380, 300, '#8a9aaa', 8)
    for (let k = 0; k < 24; k++) { const ph = (t * 1.4 + k / 24) % 1; x.fillStyle = 'rgba(220,235,255,0.8)'; x.fillRect(610 + (k * 53) % 360, 370 + ph * 280, 4, 18) }
    x.fillStyle = INK; x.fillRect(786, 360, 8, 300); box(x, 640, 610, 120, 40, BONE, 4); txt(x, temp, 700, 631, { size: 30, col: INK, font: MONO, weight: 700 })
    box(x, 0, 820, 1080, 60, '#b8a080', 6); box(x, 0, 880, 1080, GY - 880, '#8a6a4a', 6)
    for (let k = 0; k < 5; k++) box(x, 60 + k * 100, 380, 70, 90, ['#e8708a', '#7dbf5a', '#f2c75c', '#8fe3ff', '#c9a6ff'][k], 4)
    ground(x, '#6a5040')
  }
}
export function bowl(x, cx, cy, t, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  for (let k = 0; k < 3; k++) { const ph = (t * 0.7 + k / 3) % 1; x.strokeStyle = `rgba(255,255,255,${(0.7 * (1 - ph)).toFixed(2)})`; x.lineWidth = 6; x.beginPath(); x.moveTo(-30 + k * 30, -40 - ph * 90); x.quadraticCurveTo(-10 + k * 30, -70 - ph * 90, -30 + k * 30, -100 - ph * 90); x.stroke() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, -20, 86, 0, Math.PI); x.fill(); x.fillStyle = BONE; x.beginPath(); x.arc(0, -20, 78, 0, Math.PI); x.fill()
  x.fillStyle = '#e8343c'; x.fillRect(-78, -24, 156, 8); x.fillStyle = '#c98e4a'; x.fillRect(-70, -30, 140, 8); x.fillStyle = '#7dbf5a'; x.fillRect(-40, -36, 18, 8); x.fillRect(20, -36, 22, 8)
  x.restore()
}
/** a quiet coffee-shop interior (two chairs, a window, string of bulbs) */
export function cafe({ outside = '#ffd9a0' } = {}) {
  return (x, t) => {
    x.fillStyle = '#4a3a5a'; x.fillRect(0, 260, 1080, GY - 260)
    for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(255,255,255,0.04)'; x.fillRect(k * 120, 260, 60, GY - 260) }
    box(x, 120, 380, 840, 330, outside, 8); x.fillStyle = INK; x.fillRect(536, 380, 8, 330)
    skyline(x, 710, t, { alpha: 0.35 })
    for (let k = 0; k < 9; k++) { const cx = 140 + k * 100; x.strokeStyle = INK; x.lineWidth = 3; x.beginPath(); x.moveTo(cx, 260); x.lineTo(cx, 300); x.stroke(); x.fillStyle = '#ffe28a'; x.beginPath(); x.arc(cx, 310, 12, 0, Math.PI * 2); x.fill() }
    ground(x, '#3a2a22')
  }
}
export function mug(x, cx, cy, col = BONE) { box(x, cx - 26, cy - 34, 52, 60, col, 5); x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.arc(cx + 30, cy - 4, 14, -1.2, 1.2); x.stroke() }
export function smallTable(x, cx, top = GY - 140, w = 360, col = '#7a4a2c') { box(x, cx - w / 2, top, w, 26, col, 6); box(x, cx - 14, top + 26, 28, GY - top - 26, col, 5) }
/** the cold day: grey sky, bare-ish trees, a car thermometer reading 55° */
export function coldDay({ temp = '55°' } = {}) {
  return (x, t) => {
    grad(x, ['#6a7488', '#a9b2c0'], 260, GY)
    trees(x, GY, t, { n: 6, h: 140, seed: 3, col: '#4a6a52' })
    box(x, 700, 380, 260, 130, INK, 6); txt(x, temp, 830, 448, { size: 90, col: '#8fe3ff', font: MONO, weight: 700 })
    for (let k = 0; k < 6; k++) { const ph = (t * 0.6 + k / 6) % 1; x.fillStyle = 'rgba(255,255,255,0.35)'; x.beginPath(); x.arc(200 + k * 130, 600 - ph * 100, 20 + ph * 20, 0, Math.PI * 2); x.fill() }
    ground(x, '#4a4a5a')
  }
}
/** a feeder road: the freeway up on its overpass, a U-turn lane, a coffee shop at the curb */
export function feeder({ sign = ['U-TURN', 'ONLY'], shop = true } = {}) {
  return (x, t, lt) => {
    skyline(x, 640, t, { alpha: 0.6 })
    box(x, -10, 560, 1100, 70, '#8f96a0', 6); for (let k = 0; k < 4; k++) box(x, 90 + k * 290, 630, 40, 300, '#7a8290', 5)
    for (let k = 0; k < 6; k++) { const cx = ((k * 200 + t * 260) % 1300) - 100; x.fillStyle = BRAKE; x.fillRect(cx, 540, 40, 14) }
    if (shop) coffeeShop(x, 840, GY - 60, false)
    overheadSign(x, 330, 760, sign[0], sign[1], 0.62)
    x.fillStyle = '#3a3648'; x.fillRect(0, GY - 60, 1080, 60)
    ground(x, '#2a2638')
  }
}
/** a generic phone with chat bubbles (no app UI). msgs: [[side 'l'|'r', text, at]] */
export function phone(x, cx, cy, lt, msgs, { s = 1, typing = null } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -210, -300, 420, 600, '#1b1236', 10); x.fillStyle = '#f4efe4'; x.fillRect(-190, -270, 380, 540)
  x.fillStyle = INK; x.fillRect(-40, -290, 80, 10)
  let y = -240
  for (const [side, text, at] of msgs) {
    const k = pop01(lt, at, 0.25, 1.8); if (k <= 0) continue
    x.font = `800 30px ${INTER}`; const parts = text.split('|').map(q => q.trim()); const w = Math.max(...parts.map(p => x.measureText(p).width)) + 30, h = parts.length * 36 + 18
    const l = side === 'r' ? 175 - w : -175
    x.save(); x.translate(l + w / 2, y + h / 2); x.scale(k, k); x.fillStyle = side === 'r' ? '#5e8cff' : '#d9d2c4'; x.fillRect(-w / 2, -h / 2, w, h)
    parts.forEach((p, i) => txt(x, p, 0, -h / 2 + 27 + i * 36, { size: 30, col: side === 'r' ? '#ffffff' : INK }))
    x.restore(); y += h + 14
  }
  if (typing != null && lt > typing) { for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.globalAlpha = 0.4 + 0.6 * Math.abs(Math.sin(lt * 5 + k)); x.beginPath(); x.arc(-100 + k * 22, y + 20, 7, 0, Math.PI * 2); x.fill() } x.globalAlpha = 1 }
  x.restore()
}
/** a pickleball / run-club morning: a track loop through trees at dawn */
export function dawnLoop() {
  return (x, t) => {
    grad(x, ['#2a2a6a', '#ff9a7a', '#ffd9a0'], 0, GY - 200)
    trees(x, GY - 160, t, { n: 9, h: 140, seed: 8, col: '#2f6b45' })
    x.fillStyle = '#c98a5a'; x.fillRect(0, GY - 160, 1080, 100); x.fillStyle = '#b07a4a'; for (let k = 0; k < 10; k++) x.fillRect(k * 110, GY - 116, 60, 8)
    ;['#3fb6f0', '#2fc79a', '#e163d6'].forEach((c, i) => { const px = ((t * 160 + i * 300) % 1300) - 110; tinyStar(x, px, GY - 150 - Math.abs(Math.sin(t * 8 + i)) * 14, 30, c) })
    ground(x, '#2c3a2a')
  }
}
/** Rice Village: shopfronts and a FULL parking sign */
export function village() {
  return (x, t) => {
    grad(x, ['rgba(120,170,255,0.0)', 'rgba(255,220,180,0.35)'], 200, GY)
    ;[['BOOKS', '#7dbf5a'], ['SHOES', '#e8708a'], ['CAFE', '#c98e5a'], ['GIFTS', '#8fe3ff']].forEach(([s, c], i) => { const l = 20 + i * 262; box(x, l, 420, 240, GY - 420, '#efe2cc', 6); box(x, l, 420, 240, 70, c, 5); txt(x, s, l + 120, 456, { size: 38, col: INK }); box(x, l + 30, 530, 180, 160, '#bfe6ff', 5) })
    box(x, 860, 720, 170, 120, '#2b5fb0', 6); txt(x, 'P', 905, 780, { size: 70, col: BONE }); txt(x, 'FULL', 975, 780, { size: 32, col: BRAKE, font: MONO, weight: 700 })
    ground(x, '#3a3646')
  }
}
/** a slab cruise at night (celebrated): candy paint rolling past the skyline */
export function cruise({ trunk = 0, col = '#b0306a' } = {}) {
  return (x, t, lt) => {
    skyline(x, GY - 120, t, { alpha: 0.85 })
    x.fillStyle = '#2a2638'; x.fillRect(0, GY - 120, 1080, 120)
    slab(x, 540 + Math.sin(t * 0.8) * 10, GY - 160, t, { paint: 1, col, elbows: 1, glow: 1, trunk: typeof trunk === 'function' ? trunk(lt) : trunk, s: 0.8 })
    ground(x, '#1e1a2a')
  }
}
/** Hermann-style park entrance: a lake, a fountain spray, trees (paddle boats live in paddle()) */
export function heatHaze() {
  return (x, t) => {
    grad(x, ['#ffcf7a', '#ff9a5a'], 260, GY)
    heatSun(x, 540, 470, t, 100)
    for (let k = 0; k < 12; k++) { const y = 650 + k * 34; x.strokeStyle = 'rgba(255,240,200,0.3)'; x.lineWidth = 4; x.beginPath(); for (let xx = 0; xx <= 1080; xx += 40) x.lineTo(xx, y + Math.sin(xx * 0.03 + t * 6 + k) * 8); x.stroke() }
    ground(x, '#7a4a3a')
  }
}
export { label, sparkles, hearts, signChar, pop01, txt, box, tinyStar, GOLD, BONE, PINK, INK, MONO, SERIF, INTER, MINT, SKYB, LAV, kolache, klobasnek, taco, streetSign, overheadSign, shield, car, heatSun, sweat, skyline, BRAKE, HGREEN }
