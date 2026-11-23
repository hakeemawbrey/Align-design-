// Houston Star Talk · worker w13: SPORTS parodies (hst311–hst321). Cooking shows (hst322–hst332) live in w13cook.js.
// Grammar: a broadcast booth (two commentator stars in headsets), the "field" (a Houston date or errand), a
// commentary strip (play-by-play + colour), a score bug, instant replay with telestrator marks, then the party ticket.
// Generic shapes only: no teams, leagues, brands or venues (see promo/films/HOUSTON-STARTALK.md, never-use list).
import { clamp, prog, ease } from '../../src/lib.js'
import { box, txt } from '../starrace/ep.js'
import { label, sparkles, hearts, notes, pop01, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, car, streetSign, shield, heatSun, sweat, shimmer, partyCard, taco, mural, coffeeShop, phoneFlash, BRAKE, HGREEN } from './kit.js'

export const BADGE = { text: 'HOU BETA · JAN 9', x: 230, y: 150 }
export const STING = [['glitter', 0.0, 0.7], ['pop', 0.02, 880, 0.03, 0]]
export const Kp = (lt, a, d = 0.3) => clamp(ease.outBack(prog(lt, a, a + d)))
const TAU = Math.PI * 2
const Y = 1190   // a player's centre on the field (size ~220: feet near 1300)

// ── broadcast pieces ─────────────────────────────────────────────────────────────────────────────────────────
export function ground(x, col, y = 1320) { x.fillStyle = col; x.fillRect(0, y, 1080, 1920 - y); x.fillStyle = INK; x.fillRect(0, y - 6, 1080, 10) }

/** the commentary booth: a window on a lit field and the skyline, a desk with the show name */
export function booth(x, t, { wall = '#16204a', acc = GOLD, show = 'STAR SPORTS', field = '#2f7a3f' } = {}) {
  x.fillStyle = wall; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 9; k++) { x.fillStyle = 'rgba(255,255,255,0.03)'; x.fillRect(k * 130, 0, 60, 1920) }
  box(x, 90, 520, 900, 440, '#0b1430', 10)
  x.save(); x.beginPath(); x.rect(90, 520, 900, 440); x.clip()
  x.save(); x.translate(90, 520); x.scale(900 / 1080, 0.46); skyline(x, 760, t, { alpha: 0.8 }); x.restore()
  x.fillStyle = field; x.fillRect(90, 860, 900, 100)
  for (let k = 0; k < 7; k++) { x.fillStyle = 'rgba(255,255,255,0.45)'; x.fillRect(130 + k * 135, 870, 6, 90) }
  for (const lx of [180, 900]) { x.fillStyle = INK; x.fillRect(lx - 4, 600, 8, 270); for (let k = 0; k < 3; k++) { x.fillStyle = `rgba(255,246,200,${(0.7 + 0.3 * Math.sin(t * 3 + k)).toFixed(2)})`; x.fillRect(lx - 30 + k * 22, 588, 16, 16) } }
  x.restore()
  x.fillStyle = INK; x.fillRect(536, 520, 8, 440)
  box(x, 60, 1170, 960, 230, acc, 8); x.fillStyle = 'rgba(0,0,0,0.16)'; x.fillRect(60, 1300, 960, 100)
  txt(x, show, 540, 1240, { size: 60, col: INK }); txt(x, 'LIVE FROM HOUSTON', 540, 1350, { size: 32, col: INK, font: MONO, weight: 700 })
}
/** a commentator headset worn by the star `id` */
export function headset(x, P, id, col = '#2b2f45') {
  const [cx, cy, s] = P.at(id)
  x.lineCap = 'round'
  x.strokeStyle = INK; x.lineWidth = s * 0.07; x.beginPath(); x.arc(cx, cy - s * 0.02, s * 0.44, Math.PI * 1.1, Math.PI * 1.9); x.stroke()
  x.strokeStyle = col; x.lineWidth = s * 0.035; x.stroke()
  for (const d of [-1, 1]) box(x, cx + d * s * 0.44 - s * 0.06, cy - s * 0.13, s * 0.12, s * 0.17, col, 4)
  x.strokeStyle = INK; x.lineWidth = 7; x.beginPath(); x.moveTo(cx - s * 0.42, cy + s * 0.02); x.quadraticCurveTo(cx - s * 0.36, cy + s * 0.2, cx - s * 0.14, cy + s * 0.17); x.stroke()
  box(x, cx - s * 0.18, cy + s * 0.13, s * 0.08, s * 0.07, '#d8dce4', 3)
}
/** the score bug (top right, after the hook): two rows and a clock */
export function scoreBug(x, t, teams, score, acc = GOLD) {
  if (t < 2.7) return
  const k = clamp((t - 2.7) / 0.3)
  x.save(); x.globalAlpha = k
  box(x, 620, 96, 410, 104, '#120c24', 5)
  const cols = [acc, PINK]
  for (let r = 0; r < 2; r++) {
    const y = 122 + r * 52
    x.fillStyle = cols[r]; x.fillRect(620, y - 26, 12, 52)
    txt(x, teams[r], 648, y, { size: 30, col: BONE, font: MONO, weight: 700, align: 'left' })
    txt(x, String(score[r]), 1012, y, { size: 34, col: GOLD, font: MONO, weight: 700, align: 'right' })
  }
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(632, 147, 398, 3)
  box(x, 860, 204, 170, 40, BRAKE, 4); txt(x, score[2] || 'LIVE', 945, 225, { size: 24, col: BONE, font: MONO, weight: 700 })
  x.restore()
}
/** the commentary strip: a little booth cam (the speaking star) and the call, under the score bug */
export function comm(x, t, lt, t0, L, who) {
  for (const [l0, d, w, text] of L) {
    if (lt < l0 || lt > l0 + d) continue
    const k = clamp(pop01(t, t0 + l0, 0.25, 1.6)) * (1 - ease.inQuad(prog(lt, l0 + d - 0.2, l0 + d)))
    if (k <= 0) continue
    const id = who[w]
    x.save(); x.translate(540, 360); x.scale(1, k); x.translate(-540, -360)
    box(x, 60, 280, 960, 164, 'rgba(14,9,32,0.94)', 6); x.fillStyle = who.acc; x.fillRect(60, 280, 960, 8)
    box(x, 78, 300, 128, 128, '#1d2c5a', 4)
    signChar(x, t, id, 142, 372, 112, { mood: w === 'p' ? 'sparkle' : 'happy', hops: [t0 + l0], seed: 9, glyph: false, tears: id === 'pisces' ? 2 : 0 })
    txt(x, (w === 'p' ? 'PLAY-BY-PLAY · ' : 'COLOUR · ') + id.toUpperCase(), 232, 314, { size: 24, col: who.acc, font: MONO, weight: 700, align: 'left' })
    const [a, b] = text.split(' | ')
    txt(x, a, 232, b ? 362 : 380, { size: 42, col: BONE, align: 'left' }); if (b) txt(x, b, 232, 412, { size: 42, col: BONE, align: 'left' })
    x.restore()
  }
}
/** instant replay: blue tint, scanlines, a frame and a REPLAY bug */
export function replayFx(x, t, lt) {
  x.fillStyle = 'rgba(70,120,220,0.16)'; x.fillRect(0, 0, 1080, 1920)
  for (let y = 0; y < 1920; y += 9) { x.fillStyle = 'rgba(0,0,0,0.07)'; x.fillRect(0, y, 1080, 3) }
  x.strokeStyle = BONE; x.lineWidth = 8; x.strokeRect(30, 470, 1020, 1000)
  box(x, 54, 494, 300, 60, BRAKE, 4)
  x.fillStyle = BONE; for (const o of [0, 24]) { x.beginPath(); x.moveTo(98 + o, 506); x.lineTo(74 + o, 524); x.lineTo(98 + o, 542); x.fill() }
  txt(x, 'REPLAY', 220, 525, { size: 34, col: BONE, font: MONO, weight: 700 })
  txt(x, 'SLOW-MO', 900, 524, { size: 30, col: BONE, font: MONO, weight: 700 })
  if (Math.sin(t * 7) > 0) { x.fillStyle = BRAKE; x.beginPath(); x.arc(1000, 524, 12, 0, TAU); x.fill() }
}
/** telestrator marks: [l0, 'circle', cx, cy, r] · [l0, 'arrow', x1, y1, x2, y2] · [l0, 'u', x1, y1, x2, y2, depth] */
export function tele(x, lt, marks) {
  x.save(); x.strokeStyle = '#ffe14d'; x.lineWidth = 11; x.lineCap = 'round'; x.shadowColor = '#ffe14d'; x.shadowBlur = 14
  for (const m of marks) {
    const p = clamp((lt - m[0]) / 0.5); if (p <= 0) continue
    if (m[1] === 'circle') { x.beginPath(); x.arc(m[2], m[3], m[4], -Math.PI / 2, -Math.PI / 2 + p * TAU); x.stroke(); continue }
    const [, kind, a, b, c, d, dep = 0] = m
    const pt = u => kind === 'u' ? [a + (c - a) * u + Math.sin(Math.PI * u) * 0, b + (d - b) * u + Math.sin(Math.PI * u) * dep] : [a + (c - a) * u, b + (d - b) * u]
    x.beginPath(); for (let i = 0; i <= 30; i++) { const [px, py] = pt(p * i / 30); i ? x.lineTo(px, py) : x.moveTo(px, py) } x.stroke()
    if (p >= 1) { const [px, py] = pt(0.97), an = Math.atan2(d - py, c - px); x.beginPath(); x.moveTo(c, d); x.lineTo(c - 34 * Math.cos(an - 0.5), d - 34 * Math.sin(an - 0.5)); x.moveTo(c, d); x.lineTo(c - 34 * Math.cos(an + 0.5), d - 34 * Math.sin(an + 0.5)); x.stroke() }
  }
  x.restore()
}

// ── small props ──────────────────────────────────────────────────────────────────────────────────────────────
export function tree(x, cx, base, s = 1, col = '#3f8f4f') {
  box(x, cx - 14 * s, base - 150 * s, 28 * s, 150 * s, '#6b3b1f', 4)
  for (const [dx, dy, r] of [[0, -230, 95], [-70, -170, 70], [70, -170, 70]]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + dx * s, base + dy * s, (r + 6) * s, 0, TAU); x.fill() }
  for (const [dx, dy, r] of [[0, -230, 95], [-70, -170, 70], [70, -170, 70]]) { x.fillStyle = col; x.beginPath(); x.arc(cx + dx * s, base + dy * s, r * s, 0, TAU); x.fill() }
}
export function water(x, top, h, t, col = '#2d5a6a') {
  x.fillStyle = col; x.fillRect(0, top, 1080, h)
  for (let k = 0; k < 16; k++) { const wy = top + 20 + (k * 53) % (h - 30), wx = ((k * 211 + t * 40) % 1180) - 100; x.fillStyle = 'rgba(255,255,255,0.22)'; x.fillRect(wx, wy, 70, 6) }
}
export function dog(x, cx, cy, t, col = '#c98e5a') {
  const b = Math.abs(Math.sin(t * 8)) * 8
  box(x, cx - 70, cy - 40 - b, 140, 70, col, 5); box(x, cx + 50, cy - 90 - b, 70, 64, col, 5); box(x, cx + 100, cy - 70 - b, 30, 22, '#3a2418', 3)
  x.fillStyle = INK; x.fillRect(cx + 80, cy - 74 - b, 10, 10)
  x.fillStyle = BRAKE; x.beginPath(); x.moveTo(cx + 46, cy - 36 - b); x.lineTo(cx + 120, cy - 36 - b); x.lineTo(cx + 84, cy - 4 - b); x.fill()   // the bandana
  for (const lx of [-50, -20, 20, 44]) box(x, cx + lx, cy + 30 - b, 16, 34 + b, col, 4)
  x.strokeStyle = INK; x.lineWidth = 8; x.beginPath(); x.moveTo(cx - 70, cy - 30 - b); x.lineTo(cx - 110, cy - 60 - b + Math.sin(t * 14) * 14); x.stroke()
}
export function mosquito(x, cx, cy, t) {
  const fx = cx + Math.sin(t * 5) * 40, fy = cy + Math.cos(t * 7) * 24
  x.fillStyle = INK; x.fillRect(fx - 14, fy - 5, 28, 10); x.fillRect(fx + 14, fy - 2, 18, 4)
  x.fillStyle = 'rgba(191,230,255,0.8)'; const w = Math.sin(t * 60) > 0 ? 18 : 8; x.fillRect(fx - 10, fy - 5 - w, 10, w); x.fillRect(fx + 2, fy - 5 - w, 10, w)
}
export function hydrant(x, cx, base) { box(x, cx - 26, base - 90, 52, 90, BRAKE, 5); box(x, cx - 36, base - 70, 72, 18, BRAKE, 4); box(x, cx - 20, base - 112, 40, 24, BRAKE, 4) }
export function cup(x, cx, cy, s = 1, col = BONE) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -26, -34, 52, 70, col, 5); box(x, -30, -46, 60, 14, '#6b3b1f', 4); x.fillStyle = '#6b3b1f'; x.fillRect(-26, -10, 52, 16); x.restore() }
export function ball(x, cx, cy, s = 1) { x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 22 * s, 0, TAU); x.fill(); x.fillStyle = '#e8f04a'; x.beginPath(); x.arc(cx, cy, 17 * s, 0, TAU); x.fill(); x.fillStyle = INK; for (const [dx, dy] of [[-6, -5], [6, 4], [-2, 8]]) x.fillRect(cx + dx * s - 2, cy + dy * s - 2, 4, 4) }
export function paddle(x, cx, cy, rot = 0, col = '#ff7a2a') { x.save(); x.translate(cx, cy); x.rotate(rot); box(x, -8, 10, 16, 60, INK, 3); box(x, -34, -60, 68, 76, col, 5); x.restore() }
export function bat(x, cx, cy, t, s = 1) {
  const f = Math.sin(t * 22 + cx) > 0 ? -1 : 1
  x.save(); x.translate(cx, cy); x.scale(s, s); x.fillStyle = '#2a1636'; x.strokeStyle = 'rgba(255,214,170,0.9)'; x.lineWidth = 3
  x.beginPath(); x.moveTo(0, 0); x.lineTo(-34, -14 * f); x.lineTo(-22, 6); x.lineTo(-10, 2); x.closePath(); x.stroke(); x.fill()
  x.beginPath(); x.moveTo(0, 0); x.lineTo(34, -14 * f); x.lineTo(22, 6); x.lineTo(10, 2); x.closePath(); x.stroke(); x.fill()
  x.fillRect(-7, -8, 14, 16); x.restore()
}
export function stringLights(x, y, t, n = 9) {
  x.strokeStyle = INK; x.lineWidth = 4; x.beginPath(); x.moveTo(0, y); for (let k = 0; k <= 20; k++) x.lineTo(k * 54, y + Math.sin(k / 20 * Math.PI * 3) * 26); x.stroke()
  for (let k = 0; k < n; k++) { const bx = 60 + k * 120, by = y + Math.sin(bx / 1080 * Math.PI * 3) * 26 + 14, on = 0.6 + 0.4 * Math.sin(t * 3 + k); x.fillStyle = `rgba(255,214,107,${on.toFixed(2)})`; x.beginPath(); x.arc(bx, by, 12, 0, TAU); x.fill() }
}
export function crawfish(x, cx, cy, s = 1, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -30, -12, 60, 24, '#d8432f', 3); box(x, 30, -8, 18, 16, '#d8432f', 3); box(x, -52, -20, 24, 14, '#d8432f', 3); box(x, -52, 6, 24, 14, '#d8432f', 3)
  x.fillStyle = INK; x.fillRect(-12, -6, 5, 5); x.restore()
}
export function crawPile(x, cx, cy, k = 1, n = 22) {
  for (let i = 0; i < n * clamp(k); i++) { const a = i * 2.39, r = 9 * Math.sqrt(i) * 2.4; crawfish(x, cx + Math.cos(a) * r * 1.5, cy + Math.sin(a) * r * 0.3 - (n - i) * 0.6, 0.7, a) }
}
export function corn(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -36, -16, 72, 32, '#f2c75c', 4); for (let k = 0; k < 4; k++) { x.fillStyle = '#d9a33a'; x.fillRect(-28 + k * 16, -10, 6, 20) } x.restore() }
export function potato(x, cx, cy, s = 1) { x.fillStyle = INK; x.beginPath(); x.ellipse(cx, cy, 30 * s, 22 * s, 0, 0, TAU); x.fill(); x.fillStyle = '#c9a46a'; x.beginPath(); x.ellipse(cx, cy, 25 * s, 17 * s, 0, 0, TAU); x.fill() }
export function boilPot(x, cx, cy, t, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  box(x, -110, -120, 220, 170, '#9aa2ae', 7); box(x, -126, -134, 252, 24, '#6d7480', 5); box(x, -150, -90, 40, 20, '#6d7480', 4); box(x, 110, -90, 40, 20, '#6d7480', 4)
  for (let k = 0; k < 4; k++) { const ph = (t * 0.6 + k / 4) % 1; x.strokeStyle = `rgba(255,255,255,${(0.6 * (1 - ph)).toFixed(2)})`; x.lineWidth = 7; x.beginPath(); x.moveTo(-60 + k * 40, -150 - ph * 150); x.quadraticCurveTo(-40 + k * 40, -190 - ph * 150, -60 + k * 40, -230 - ph * 150); x.stroke() }
  x.restore()
}
export function paddleBoat(x, cx, cy, col, t, s = 1) {
  x.save(); x.translate(cx, cy + Math.sin(t * 2.4 + cx) * 6); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-180, -40); x.lineTo(180, -40); x.lineTo(140, 40); x.lineTo(-150, 40); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-170, -32); x.lineTo(170, -32); x.lineTo(132, 32); x.lineTo(-142, 32); x.closePath(); x.fill()
  x.fillStyle = BONE; x.fillRect(-150, -32, 300, 10)
  const a = t * 6; x.strokeStyle = INK; x.lineWidth = 6; for (let k = 0; k < 4; k++) { const an = a + k * Math.PI / 2; x.beginPath(); x.moveTo(-170, 0); x.lineTo(-170 + Math.cos(an) * 40, Math.sin(an) * 40); x.stroke() }
  x.restore()
}
export function pager(x, cx, cy, t, buzz = 0) {
  const j = buzz > 0 ? Math.sin(t * 70) * 6 * buzz : 0
  box(x, cx - 50 + j, cy - 50, 100, 100, '#2b2f45', 5); x.fillStyle = buzz > 0 && Math.sin(t * 12) > 0 ? BRAKE : '#5a2a33'; x.beginPath(); x.arc(cx + j, cy, 26, 0, TAU); x.fill()
}
export function phone(x, cx, cy, s = 1, text = '', col = '#bfe6ff') { x.save(); x.translate(cx, cy); x.scale(s, s); box(x, -46, -84, 92, 168, INK, 4); x.fillStyle = col; x.fillRect(-38, -72, 76, 140); if (text) txt(x, text, 0, 0, { size: 26, col: INK, font: MONO, weight: 700 }); x.restore() }
export function sunsetSky(x, h = 1150, a = 0.85) {
  const g = x.createLinearGradient(0, 0, 0, h); g.addColorStop(0, `rgba(70,40,120,${a})`); g.addColorStop(0.55, `rgba(240,110,120,${a})`); g.addColorStop(1, `rgba(255,190,110,${a})`)
  x.fillStyle = g; x.fillRect(0, 0, 1080, h)
}
export function stick(x, t, lt, t0, L) {      // my own sticker labels: [[l0, d, text, bg, y?]]
  for (const [l0, d, text, bg, y] of L) { if (lt < l0 || lt > l0 + d) continue; const k = pop01(t, t0 + l0, 0.3, 1.8) * (1 - ease.inQuad(prog(lt, l0 + d - 0.3, l0 + d))); label(x, 540, y || 640, text, k, { size: 50, bg: bg || PINK, rot: -0.04 }) }
}

// ── the episode builder ─────────────────────────────────────────────────────────────────────────────────────
// S = { hook, p, c (commentator sign ids), acc, booth: {wall, acc, show}, teams: [a, b], score0: [a, b, clock],
//       endLine, endStars, cues, scenes: [{ dur, booth?, set?, cast, mood, hops, look, lines, comm, score, replay, tele, front, stick }] }
// Booth lines use 'p' / 'c' as speakers. Field lines use sign ids.
export function sportsEp(S) {
  const who = { p: S.p, c: S.c, acc: S.acc || GOLD }
  const BC = { [S.p]: [[0, 330, 1040, 230]], [S.c]: [[0, 750, 1040, 230]] }
  let score = S.score0
  const scenes = S.scenes.map(o => {
    if (o.score) score = o.score
    const sc = score
    const lines = (o.lines || []).map(([a, d, w, s]) => [a, d, w === 'p' ? S.p : w === 'c' ? S.c : w, s])
    return {
      dur: o.dur, cast: o.booth ? { ...BC, ...(o.cast || {}) } : (o.cast || {}), mood: o.mood, hops: o.hops, look: o.look, lines, stick: o.stick,
      set: (x, t, lt, P) => { if (o.booth) booth(x, t, S.booth); else o.set(x, t, lt, P) },
      back: o.back,
      front: (x, t, lt, P) => {
        o.front?.(x, t, lt, P)
        if (o.booth) { headset(x, P, S.p); headset(x, P, S.c); for (const mx of [440, 860]) { box(x, mx - 8, 1100, 16, 70, '#3a3f55', 3); box(x, mx - 22, 1074, 44, 40, '#2b2f45', 5) } }
        if (o.replay) replayFx(x, t, lt)
        if (o.tele) tele(x, lt, o.tele)
        if (o.comm) comm(x, t, lt, t - lt, o.comm, who)
        if (o.mine) stick(x, t, lt, t - lt, o.mine)
        if (sc) scoreBug(x, t, S.teams, sc, who.acc)
      },
    }
  })
  return {
    hook: S.hook, badge: BADGE, cues: [...STING, ...(S.cues || [])], endLen: 6.2,
    end: (x, t, lt) => partyCard(x, t, lt, { line: S.endLine, stars: S.endStars }), scenes,
  }
}

// ── arenas ──────────────────────────────────────────────────────────────────────────────────────────────────
const montrose = (x, t, { bumps = true } = {}) => {
  mural(x, t); x.fillStyle = '#8a8496'; x.fillRect(0, 1300, 1080, 30)
  ground(x, '#2a2638', 1330); for (let d = -((t * 200) % 140); d < 1080; d += 140) { x.fillStyle = GOLD; x.fillRect(d, 1560, 70, 10) }
  if (bumps) for (let k = 0; k < 3; k++) box(x, 120 + k * 330, 1420, 180, 26, '#f2c75c', 5)
  streetSign(x, 150, 830, 'WESTHEIMER', { k: 0.62 })
}
const riceLot = (x, t, { full = true } = {}) => {
  box(x, -10, 760, 1100, 500, '#c98e5a', 8)
  for (let k = 0; k < 4; k++) { const l = 20 + k * 265; for (let j = 0; j < 6; j++) { x.fillStyle = j % 2 ? BONE : ['#ff8fb1', '#7dbf5a', '#8fe3ff', '#ffd36b'][k]; x.fillRect(l + j * 38, 800, 38, 60) } box(x, l + 20, 900, 180, 160, '#bfe6ff', 5); box(x, l + 70, 1080, 80, 180, '#6b3b1f', 4) }
  ground(x, '#3a3a46', 1260); for (let k = 0; k < 6; k++) { x.fillStyle = BONE; x.fillRect(80 + k * 190, 1420, 8, 180) }
  streetSign(x, 880, 640, 'UNIVERSITY BLVD', { k: 0.5, pole: false })
  if (full) { box(x, 60, 620, 190, 80, BRAKE, 5); txt(x, 'FULL', 155, 662, { size: 44, col: BONE, font: MONO, weight: 700 }) }
}
const brunch = (x, t, { wait = 'MIN 90' } = {}) => {
  skyline(x, 900, t, { alpha: 0.5 }); box(x, 120, 640, 840, 680, '#f4efe4', 8)
  for (let j = 0; j < 14; j++) { x.fillStyle = j % 2 ? '#ffffff' : '#ff8fb1'; x.fillRect(110 + j * 61, 640, 61, 86) }
  box(x, 330, 760, 420, 90, '#1c1240', 5); txt(x, 'BRUNCH', 540, 806, { size: 58, col: GOLD })
  box(x, 170, 900, 220, 220, '#bfe6ff', 5); box(x, 690, 900, 220, 220, '#bfe6ff', 5); box(x, 470, 900, 140, 420, '#6b3b1f', 5)
  ground(x, '#8a8496', 1320); for (let k = 0; k < 6; k++) box(x, 100 + k * 180, 1180, 14, 140, GOLD, 4)
  x.strokeStyle = '#c0304a'; x.lineWidth = 10; for (let k = 0; k < 5; k++) { x.beginPath(); x.moveTo(107 + k * 180, 1196); x.quadraticCurveTo(197 + k * 180, 1260, 287 + k * 180, 1196); x.stroke() }
  board(x, 960, 960, 'WAIT', wait)
}
function board(x, cx, cy, top, big) { box(x, cx - 100, cy - 90, 200, 180, '#1c1240', 6); txt(x, top, cx, cy - 50, { size: 30, col: GOLD, font: MONO, weight: 700 }); txt(x, big, cx, cy + 20, { size: big.length > 6 ? 44 : 56, col: BONE, font: MONO, weight: 700 }); box(x, cx - 8, cy + 96, 16, 150, '#6b3b1f', 3) }
const bayou = (x, t, { run = 1 } = {}) => {
  skyline(x, 990, t, { alpha: 0.85 })
  x.fillStyle = '#3f7a4a'; x.fillRect(0, 980, 1080, 100); water(x, 1080, 140, t * (1 + run * 3)); x.fillStyle = '#c9b48a'; x.fillRect(0, 1220, 1080, 100)
  ground(x, '#356a40', 1320)
  const off = (t * 260 * run) % 540; for (let k = -1; k < 3; k++) tree(x, k * 540 + 270 - off, 1000, 0.7, '#4f9a5a')
  for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(0,0,0,0.12)'; x.fillRect(((k * 160 - t * 600 * run) % 1240 + 1240) % 1240 - 80, 1268, 50, 8) }
}
const feeder = (x, t, { scroll = 1, shop = 0 } = {}) => {
  skyline(x, 780, t, { alpha: 0.6 })
  if (shop) coffeeShop(x, 800, 1050, false)
  box(x, -10, 760, 1100, 90, '#5a5670', 6); x.fillStyle = '#8f96a0'; x.fillRect(0, 740, 1080, 20)
  for (const px of [140, 540, 940]) box(x, px - 30, 850, 60, 360, '#6d6a80', 5)
  shield(x, 540, 670, '59', 0.75)
  x.fillStyle = '#3a3646'; x.fillRect(0, 1200, 1080, 130); for (let d = -((t * 500 * scroll) % 160) - 160; d < 1080; d += 160) { x.fillStyle = BONE; x.fillRect(d, 1262, 80, 8) }
  ground(x, '#4a5a40', 1330)
  streetSign(x, 160, 1000, 'FEEDER RD', { k: 0.55, pole: false })
}
const karaoke = (x, t, { lyric = 'LA LA LA', screen = 'BALLAD' } = {}) => {
  x.fillStyle = '#1e0f2e'; x.fillRect(0, 0, 1080, 1920)
  for (let k = 0; k < 24; k++) { const a = t * 0.8 + k, r = 300 + (k % 5) * 90; x.fillStyle = ['rgba(255,143,177,0.35)', 'rgba(143,227,255,0.35)', 'rgba(242,199,92,0.35)'][k % 3]; x.fillRect(540 + Math.cos(a) * r * 1.2, 900 + Math.sin(a * 1.3) * r * 0.9, 14, 14) }
  x.save(); x.shadowColor = PINK; x.shadowBlur = 30; txt(x, 'BELLAIRE BLVD', 540, 580, { size: 56, col: PINK, font: MONO, weight: 700 }); txt(x, 'KARAOKE NIGHT', 540, 636, { size: 40, col: SKYB, font: MONO, weight: 700 }); x.restore()
  box(x, 240, 690, 600, 260, '#0e1630', 8); txt(x, screen, 540, 735, { size: 30, col: GOLD, font: MONO, weight: 700 })
  const ln = lyric.split(' | '); ln.forEach((s, i) => txt(x, s, 540, 800 + i * 60 - (ln.length - 1) * 20, { size: 46, col: BONE }))
  box(x, -10, 1250, 1100, 80, '#5a2a6a', 6); ground(x, '#2a1838', 1330)
}
const court = (x, t, lt) => {
  skyline(x, 930, t, { alpha: 0.45 })
  x.fillStyle = '#3f8f4f'; x.fillRect(0, 930, 1080, 400); x.fillStyle = '#2f6fc0'; x.fillRect(40, 1000, 1000, 330)
  x.fillStyle = 'rgba(255,255,255,0.12)'; x.fillRect(380, 1000, 320, 330); x.fillStyle = BONE; for (const lx of [40, 380, 700, 1036]) x.fillRect(lx, 1000, 6, 330); x.fillRect(40, 1000, 1000, 6)
  ground(x, '#2f5f3a', 1330)
  box(x, 534, 1000, 12, 260, '#8f96a0', 3); x.strokeStyle = 'rgba(239,230,214,0.7)'; x.lineWidth = 3; for (let k = 0; k < 9; k++) { x.beginPath(); x.moveTo(510, 1020 + k * 24); x.lineTo(570, 1020 + k * 24); x.stroke() } box(x, 500, 1000, 80, 10, BONE, 3)
}
const backyard = (x, t, lt) => {
  x.fillStyle = '#7a5a3a'; x.fillRect(0, 760, 1080, 560); for (let k = 0; k < 14; k++) { x.fillStyle = k % 2 ? '#8a6a4a' : '#7a5a3a'; x.fillRect(k * 80, 760, 80, 560); x.fillStyle = INK; x.fillRect(k * 80, 760, 4, 560) }
  stringLights(x, 700, t); ground(x, '#3f6a3a', 1320)
}
const boilTable = (x, t, pile = 1) => { box(x, 60, 1220, 960, 50, '#d8d4c8', 6); for (let k = 0; k < 8; k++) { x.fillStyle = 'rgba(40,40,60,0.35)'; x.fillRect(90 + k * 115, 1232, 80, 6); x.fillRect(90 + k * 115, 1248, 60, 6) } box(x, 120, 1276, 30, 160, '#6b3b1f', 4); box(x, 930, 1276, 30, 160, '#6b3b1f', 4); if (pile > 0) crawPile(x, 540, 1205, pile) }
const sunLot = (x, t, { sunX = 860, shadeX = 300 } = {}) => {
  heatSun(x, sunX, 600, t, 80)
  x.fillStyle = '#4a4458'; x.fillRect(0, 1080, 1080, 240); for (let k = 0; k < 7; k++) { x.fillStyle = BONE; x.fillRect(20 + k * 170, 1100, 8, 200) }
  ground(x, '#4a4458', 1320); shimmer(x, 1080, 240, t)
  x.fillStyle = 'rgba(10,8,30,0.45)'; x.beginPath(); x.ellipse(shadeX, 1240, 190, 46, 0, 0, TAU); x.fill()
  tree(x, 300, 1250, 1.0, '#4f9a5a')
}
const bridge = (x, t, { bats = 0 } = {}) => {
  sunsetSky(x, 1100, 0.85 - 0.35 * clamp(bats)); skyline(x, 1000, t, { alpha: 0.9, col: '#2a1a40' })
  water(x, 1000, 400, t, '#3a3a6a'); x.fillStyle = 'rgba(255,170,120,0.25)'; x.fillRect(380, 1010, 320, 240)
  box(x, -10, 1300, 1100, 60, '#8a6a5a', 6); for (let k = 0; k < 4; k++) { x.fillStyle = INK; x.beginPath(); x.arc(140 + k * 270, 1440, 100, Math.PI, 0); x.fill(); x.fillStyle = '#2d2a50'; x.beginPath(); x.arc(140 + k * 270, 1440, 88, Math.PI, 0); x.fill() }
  ground(x, '#2a2848', 1440)
}
const railFront = x => { x.fillStyle = INK; x.fillRect(0, 1206, 1080, 12); for (let k = 0; k < 28; k++) x.fillRect(k * 40, 1206, 8, 100); x.fillStyle = '#b9a38a'; x.fillRect(0, 1208, 1080, 6) }
const batSwarm = (x, t, lt, t0, n = 26) => { for (let i = 0; i < n; i++) { const born = t0 + i * 0.07, p = (lt - born) / 2.6; if (p <= 0) continue; const q = p % 1, a = i * 2.4 + q * 5; bat(x, 540 + Math.cos(a) * (140 + i * 13) * q + Math.sin(i) * 60, 1340 - q * 1000 - (i % 4) * 30, t + i, 0.9 + (i % 3) * 0.25) } }
const pond = (x, t, lt) => {
  skyline(x, 860, t, { alpha: 0.45 }); for (let k = 0; k < 6; k++) tree(x, 60 + k * 200, 1000, 0.55, k % 2 ? '#4f9a5a' : '#3f8a4f')
  water(x, 980, 520, t, '#3a7aa0'); ground(x, '#3f7a4a', 1500)
  streetSign(x, 860, 660, 'HERMANN PARK', { k: 0.5, pole: false })
}
// a star riding in an open car / a boat
const ride = (x, P, id, col, lane, { brake = 0, flip = false } = {}) => { const [cx] = P.at(id); car(x, cx, lane, col, { open: true, brake, flip }) }
const boatRide = (x, t, P, ids, col) => { const [ax, ay] = P.at(ids[0]); const bx = ids[1] ? (P.at(ids[1])[0] + ax) / 2 : ax; paddleBoat(x, bx, ay + 90, col, t) }

// ── the 11 sports episodes ─────────────────────────────────────────────────────────────────────────────────
const L0 = 1300   // the drive lane (car body); a riding star sits at L0 - 115

// hst311 · your Montrose first date, called live
const ep311 = sportsEp({
  hook: 'Your Montrose | first date, | called live', p: 'leo', c: 'virgo', acc: '#ff8fb1', booth: { wall: '#2a1640', acc: '#ff8fb1', show: 'STAR SPORTS' },
  teams: ['LIBRA', 'ARIES'], score0: [0, 0, '1ST HALF'], endLine: 'Your next date: Jan 9.', endStars: ['libra', 'aries', 'leo', 'virgo'],
  scenes: [
    { dur: 2.8, set: (x, t) => montrose(x, t), cast: { libra: [[0, -150, Y, 220], [0.9, 380, Y, 220]], aries: [[0, 1230, Y, 220], [0.9, 720, Y, 220]] }, hops: { libra: [0.05, 1.0], aries: [0.1, 1.1] }, mood: { libra: 'sparkle', aries: 'happy' },
      lines: [[1.2, 1.5, 'aries', 'you must | be Libra!']] },
    { dur: 3.2, booth: true, mood: { leo: 'sparkle', virgo: 'squint' }, lines: [[0.2, 1.4, 'p', "you're LIVE | in Montrose!"], [1.7, 1.4, 'c', 'a first date. | high stakes.']] },
    { dur: 3.2, set: (x, t) => montrose(x, t), cast: { libra: [[0, 380, Y, 220]], aries: [[0, 720, Y, 220]] }, mood: { libra: 'heart', aries: 'wide' },
      lines: [[0.3, 1.3, 'libra', 'I love | this mural.']], comm: [[1.6, 1.6, 'p', 'Libra opens with | the mural line!']], score: [1, 0, '1ST HALF'] },
    { dur: 3.2, set: (x, t) => montrose(x, t), cast: { libra: [[0, 380, Y, 220]], aries: [[0, 720, Y, 220], [0.8, 760, Y - 40, 220], [1.2, 720, Y, 220]] }, mood: { libra: 'wide', aries: 'sparkle' }, hops: { aries: [0.3, 0.9] },
      lines: [[0.2, 1.4, 'aries', 'taco truck. | now. let\'s go!']], comm: [[1.7, 1.5, 'c', 'Aries skips | the reservation.']], score: [1, 1, '1ST HALF'] },
    { dur: 3.2, set: (x, t) => montrose(x, t), cast: { libra: [[0, 200, Y, 210], [3.2, 520, Y, 210]], aries: [[0, 460, Y, 210], [3.2, 800, Y, 210]] }, hops: { libra: [0.4, 1.4, 2.4], aries: [0.6, 1.6, 2.6] }, mood: { libra: 'wide', aries: 'happy' },
      comm: [[0.2, 1.4, 'p', 'into the | Westheimer bumps!'], [1.7, 1.4, 'c', 'brutal terrain. | they hold on.']], mine: [[0.1, 1.2, 'BUMP. BUMP. BUMP.', GOLD, 1000]] },
    { dur: 3.4, set: (x, t) => montrose(x, t), cast: { libra: [[0, 400, Y, 220]], aries: [[0, 700, Y, 220]] }, mood: { libra: 'heart', aries: 'happy' }, replay: true,
      tele: [[0.4, 'circle', 560, Y - 20, 230]], comm: [[0.3, 1.4, 'c', 'watch this. | he holds the door.'], [1.9, 1.3, 'p', 'textbook | manners!']] },
    { dur: 3.2, set: (x, t) => montrose(x, t, { bumps: false }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); if (lt < 1.2) taco(x, cx + s * 0.5, cy - 10, 0.9); else taco(x, cx + s * 0.3, 1290, 0.9) },
      cast: { libra: [[0, 380, Y, 220]], aries: [[0, 720, Y, 220]] }, mood: { libra: 'wide', aries: lt => lt > 1.2 ? 'wide' : 'happy' },
      comm: [[1.2, 1.8, 'p', 'a FUMBLE! | taco down!']], mine: [[1.3, 1.2, 'TURNOVER', BRAKE, 1000]] },
    { dur: 3.2, set: (x, t) => montrose(x, t, { bumps: false }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('libra'); if (lt > 0.3) taco(x, cx + s * 0.55, cy, 0.9) },
      cast: { libra: [[0, 380, Y, 220], [0.6, 500, Y, 220]], aries: [[0, 720, Y, 220]] }, mood: { libra: 'happy', aries: 'heart' },
      lines: [[0.3, 1.3, 'libra', 'here. | split mine.']], comm: [[1.7, 1.4, 'c', 'Libra recovers. | what a teammate.']], score: [2, 1, '2ND HALF'] },
    { dur: 3.0, booth: true, mood: { leo: 'happy', virgo: 'squint' }, lines: [[0.2, 1.3, 'c', 'the key stat?'], [1.5, 1.4, 'c', 'he asked | questions.']], cast: {} },
    { dur: 3.2, set: (x, t) => montrose(x, t, { bumps: false }), back: (x, t, lt) => { if (lt > 0.6) hearts(x, t, 540, 1000, t - lt + 0.6, { n: 6, spread: 300 }) },
      cast: { libra: [[0, 400, Y, 220]], aries: [[0, 680, Y, 220]] }, mood: { libra: 'heart', aries: 'heart' }, hops: { libra: [1.6], aries: [1.7] },
      lines: [[0.2, 1.3, 'aries', 'can I see | you again?'], [1.6, 1.3, 'libra', 'obviously.']], score: [2, 2, 'FINAL'] },
    { dur: 3.4, booth: true, mood: { leo: 'heart', virgo: 'happy' }, lines: [[0.2, 1.4, 'p', 'a TIE. both | teams win!'], [1.8, 1.4, 'c', 'next game: | Jan 9.']] },
  ],
})

// hst312 · LIVE: you vs. Rice Village parking
const ep312 = sportsEp({
  hook: 'LIVE: your | Rice Village | parking battle', p: 'gemini', c: 'capricorn', acc: '#7dffb0', booth: { wall: '#10302a', acc: '#7dffb0', show: 'STAR SPORTS' },
  teams: ['TAURUS', 'PARKING'], score0: [0, 1, 'LAP 1'], endLine: 'Save me a spot. Jan 9.', endStars: ['taurus', 'gemini', 'capricorn', 'aries'],
  scenes: [
    { dur: 2.8, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => ride(x, P, 'taurus', '#e05a3a', L0), cast: { taurus: [[0, 200, L0 - 115, 170], [2.8, 760, L0 - 115, 170]] }, hops: { taurus: [0.05] }, mood: { taurus: 'squint' },
      lines: [[1.0, 1.6, 'taurus', 'just one | spot. please.']] },
    { dur: 3.2, booth: true, mood: { gemini: 'sparkle', capricorn: 'squint' }, lines: [[0.2, 1.4, 'p', "you're live in | Rice Village!"], [1.7, 1.4, 'c', 'where parking | goes to hide.']] },
    { dur: 3.0, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => ride(x, P, 'taurus', '#e05a3a', L0), cast: { taurus: [[0, -150, L0 - 115, 170], [3.0, 1230, L0 - 115, 170]] }, mood: { taurus: 'neutral' },
      comm: [[0.3, 1.2, 'p', 'lap one. | no spots.'], [1.6, 1.3, 'c', 'she stays | calm. for now.']] },
    { dur: 3.2, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => { hydrant(x, 560, 1300); ride(x, P, 'taurus', '#e05a3a', L0, { brake: 1 }) }, cast: { taurus: [[0, 250, L0 - 115, 170], [0.8, 340, L0 - 115, 170]] }, mood: { taurus: lt => lt > 1 ? 'wide' : 'sparkle' },
      lines: [[0.3, 1.0, 'taurus', 'a spot!']], comm: [[1.4, 1.7, 'c', "that's... | a fire hydrant."]] },
    { dur: 3.0, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => ride(x, P, 'taurus', '#e05a3a', L0), cast: { taurus: [[0, -150, L0 - 115, 170], [3.0, 1230, L0 - 115, 170]] }, mood: { taurus: 'sleepy' },
      comm: [[0.3, 1.4, 'p', 'lap seven. | Taurus is hungry.']], mine: [[1.4, 1.4, 'LAP 7', GOLD, 1000]], score: [0, 7, 'LAP 7'] },
    { dur: 3.2, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => { car(x, 620, 1500, '#5a7ad0', { brake: 1, s: 0.9 }); ride(x, P, 'taurus', '#e05a3a', L0) }, cast: { taurus: [[0, 300, L0 - 115, 170]] }, mood: { taurus: 'wide' }, replay: true,
      tele: [[0.3, 'circle', 500, 1480, 70], [0.9, 'arrow', 300, 1180, 560, 1420]], comm: [[0.3, 1.4, 'c', 'brake lights! | someone\'s leaving!'], [1.8, 1.2, 'p', 'this is IT.']] },
    { dur: 3.2, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => { car(x, 620, 1500, '#5a7ad0', { brake: 1, s: 0.9 }); phone(x, P.at('aquarius')[0] + 90, P.at('aquarius')[1], 0.6) }, cast: { aquarius: [[0, 840, 1430, 150]], taurus: [[0, 300, Y, 170]] }, mood: { aquarius: 'sleepy', taurus: 'eyeroll' },
      comm: [[0.2, 1.4, 'c', "she's... | checking her phone."], [1.8, 1.3, 'p', 'agonizing!']], lines: [[0.6, 1.3, 'taurus', "I'm patient. | I'm patient."]] },
    { dur: 3.2, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => { ride(x, P, 'aries', '#ffd36b', L0, { flip: true }); }, cast: { aries: [[0, 1230, L0 - 115, 170], [1.0, 760, L0 - 115, 170]] }, mood: { aries: 'sparkle' },
      comm: [[0.4, 1.4, 'p', 'ARIES from | the other lane!']], mine: [[1.6, 1.3, 'CHALLENGE!', BRAKE, 1000]] },
    { dur: 3.4, set: (x, t) => riceLot(x, t), front: (x, t, lt, P) => { ride(x, P, 'taurus', '#e05a3a', L0); ride(x, P, 'aries', '#ffd36b', L0, { flip: true }) }, cast: { taurus: [[0, 250, L0 - 115, 170]], aries: [[0, 800, L0 - 115, 170]] }, mood: { taurus: 'happy', aries: 'wide' },
      lines: [[0.2, 1.3, 'taurus', 'you take it. | go ahead.'], [1.7, 1.2, 'aries', 'wait... | really?']], comm: [[2.0, 1.3, 'c', 'a gracious play.']] },
    { dur: 3.4, set: (x, t) => riceLot(x, t, { full: false }), back: (x, t, lt) => { if (lt > 1) sparkles(x, t, 540, 1150, t - lt + 1, 14, 260, 4) }, front: (x, t, lt, P) => ride(x, P, 'taurus', '#e05a3a', L0, { brake: lt > 1 ? 1 : 0 }), cast: { taurus: [[0, 250, L0 - 115, 170], [1.0, 540, L0 - 115, 170]] }, mood: { taurus: lt => lt > 1 ? 'heart' : 'wide' }, hops: { taurus: [1.1, 1.5] },
      comm: [[0.2, 1.0, 'p', 'a second | spot opens!'], [1.3, 1.9, 'p', "IT'S GOOD! | SHE PARKED!"]], score: [1, 7, 'FINAL'], mine: [[1.2, 1.6, 'PARKED.', GOLD, 1000]] },
    { dur: 3.4, booth: true, mood: { gemini: 'heart', capricorn: 'happy' }, lines: [[0.2, 1.4, 'c', 'kindness finds | parking.'], [1.8, 1.4, 'p', 'and you find | us Jan 9.']] },
  ],
})

// hst313 · minute 90 of your Midtown brunch wait
const ep313 = sportsEp({
  hook: 'Minute 90 of | your Midtown | brunch wait', p: 'sagittarius', c: 'scorpio', acc: '#ffd36b', booth: { wall: '#3a1e2a', acc: '#ffd36b', show: 'STAR SPORTS' },
  teams: ['CANCER', 'THE WAIT'], score0: [0, 90, 'MIN 90'], endLine: 'Worth the wait. Jan 9.', endStars: ['cancer', 'pisces', 'virgo', 'sagittarius'],
  scenes: [
    { dur: 2.8, set: (x, t) => brunch(x, t), cast: { cancer: [[0, 300, Y, 210]], pisces: [[0, 560, Y, 210]], leo: [[0, 800, Y + 20, 170]] }, hops: { cancer: [0.05, 1.2], pisces: [0.15], leo: [0.3] }, mood: { cancer: 'squint', pisces: 'wide', leo: 'sleepy' },
      lines: [[1.0, 1.6, 'pisces', "I'm so | hungry."]] },
    { dur: 3.2, booth: true, mood: { sagittarius: 'sparkle', scorpio: 'squint' }, lines: [[0.2, 1.4, 'p', "you're watching | the brunch wait!"], [1.7, 1.4, 'c', 'Midtown. | Saturday.']] },
    { dur: 3.2, set: (x, t) => brunch(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); box(x, cx + s * 0.35, cy - 40, 70, 90, BONE, 4) }, cast: { virgo: [[0, 720, Y - 60, 200]], cancer: [[0, 300, Y, 210]] }, mood: { virgo: 'happy', cancer: 'squint' },
      lines: [[0.2, 1.3, 'virgo', "about | 20 minutes!"]], comm: [[1.6, 1.5, 'c', 'she said 20 | an hour ago.']] },
    { dur: 3.2, set: (x, t) => brunch(x, t), cast: { pisces: [[0, 540, Y, 240]] }, mood: { pisces: 'sparkle' }, hops: { pisces: [0.2, 0.7] },
      lines: [[0.2, 1.4, 'pisces', 'I planned | this outfit | for a week.']], comm: [[1.7, 1.4, 'p', 'the fit is | in peak form!']] },
    { dur: 3.2, set: (x, t) => brunch(x, t), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); sweat(x, cx + s * 0.25, cy - s * 0.4, t) }, cast: { pisces: [[0, 540, Y, 240]] }, mood: { pisces: 'wide' },
      comm: [[0.2, 1.5, 'c', 'humidity is | coming for the fit.']], mine: [[1.7, 1.3, 'HUMIDITY: YES', SKYB, 1000]], score: [0, 104, 'MIN 104'] },
    { dur: 3.4, set: (x, t) => brunch(x, t, { wait: 'MIN 104' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); pager(x, cx + s * 0.55, cy, t, lt > 0.5 ? 1 : 0) }, cast: { cancer: [[0, 380, Y, 220]] }, mood: { cancer: 'wide' }, replay: true,
      tele: [[0.5, 'circle', 500, Y, 90]], comm: [[0.3, 1.4, 'p', 'the buzzer! | is it theirs?!'], [1.9, 1.3, 'c', 'it\'s... | buzzing.']] },
    { dur: 3.2, set: (x, t) => brunch(x, t, { wait: 'MIN 104' }), cast: { leo: [[0, 820, Y, 210], [1.4, 1300, Y, 210]], cancer: [[0, 300, Y, 210]], pisces: [[0, 540, Y, 210]] }, mood: { leo: 'sparkle', cancer: 'wide', pisces: 'wide' },
      lines: [[0.1, 1.1, 'leo', "that's mine!"]], comm: [[1.4, 1.6, 'p', "it was Leo's. | heartbreaker."]] },
    { dur: 3.2, set: (x, t) => brunch(x, t, { wait: 'MIN 110' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); if (lt > 0.4) box(x, cx + s * 0.4, cy - 10, 90, 34, '#d9a55a', 4) }, cast: { cancer: [[0, 320, Y, 220]], pisces: [[0, 640, Y, 220]] }, mood: { cancer: 'happy', pisces: 'heart' },
      lines: [[0.2, 1.4, 'cancer', 'I brought | granola bars.']], comm: [[1.7, 1.4, 'c', 'veteran move. | always a snack.']] },
    { dur: 3.4, set: (x, t) => brunch(x, t, { wait: 'TABLE!' }), back: (x, t, lt) => { if (lt > 0.8) sparkles(x, t, 540, 1050, t - lt + 0.8, 14, 300, 5) }, cast: { virgo: [[0, 720, Y - 60, 200]], cancer: [[0, 300, Y, 210]], pisces: [[0, 540, Y, 210]] }, mood: { virgo: 'happy', cancer: 'heart', pisces: 'heart' }, hops: { cancer: [0.9, 1.4], pisces: [1.0, 1.5] },
      lines: [[0.2, 1.1, 'virgo', 'table for | two!']], comm: [[1.4, 1.8, 'p', "THEY'RE IN! | THEY'RE IN!"]], score: [1, 112, 'FINAL'] },
    { dur: 3.6, booth: true, mood: { sagittarius: 'heart', scorpio: 'wink' }, lines: [[0.2, 1.6, 'c', 'bring a friend | worth waiting with.'], [2.0, 1.4, 'p', 'like us. | Jan 9.']] },
  ],
})

// hst314 · run club crush: the play-by-play
const ep314 = sportsEp({
  hook: 'Run club crush: | the play-by-play', p: 'aquarius', c: 'leo', acc: '#8fe3ff', booth: { wall: '#0f2a40', acc: '#8fe3ff', show: 'STAR SPORTS' },
  teams: ['ARIES', 'SAG'], score0: [0, 0, 'MILE 1'], endLine: 'Pace yourself. Jan 9.', endStars: ['aries', 'sagittarius', 'aquarius', 'leo'],
  scenes: [
    { dur: 2.8, set: (x, t) => bayou(x, t), cast: { aries: [[0, 420, Y, 220], [2.8, 470, Y, 220]] }, mood: { aries: 'squint' }, hops: { aries: [0.05, 0.4, 0.75, 1.1, 1.45, 1.8, 2.15, 2.5] },
      lines: [[1.0, 1.6, 'aries', '6 AM. | bayou. go.']] },
    { dur: 3.2, booth: true, mood: { aquarius: 'sparkle', leo: 'happy' }, lines: [[0.2, 1.4, 'p', "you're watching | run club. LIVE."], [1.7, 1.4, 'c', 'Buffalo Bayou. | 6 AM.']] },
    { dur: 3.2, set: (x, t) => bayou(x, t), cast: { aries: [[0, 380, Y, 210]], sagittarius: [[0, 1250, Y, 210], [1.0, 720, Y, 210]] }, hops: { aries: [0.2, 0.55, 0.9, 1.25, 1.6, 1.95, 2.3, 2.65], sagittarius: [1.1, 1.45, 1.8, 2.15, 2.5, 2.85] }, mood: { aries: 'heart', sagittarius: 'happy' }, look: { aries: [1, 0] },
      comm: [[0.3, 1.4, 'p', 'Aries spots | a cute runner!'], [1.8, 1.3, 'c', 'here we go.']] },
    { dur: 3.0, set: (x, t) => bayou(x, t, { run: 2 }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('aries'); sweat(x, cx + s * 0.3, cy - s * 0.3, t) }, cast: { aries: [[0, 380, Y, 210], [1.0, 900, Y, 210]], sagittarius: [[0, 600, Y, 210]] }, mood: { aries: 'wide', sagittarius: 'wide' },
      comm: [[0.2, 1.4, 'c', 'too fast! | WAY too fast!']], mine: [[1.4, 1.3, 'PACE: CHAOS', BRAKE, 1000]] },
    { dur: 3.2, set: (x, t) => bayou(x, t), cast: { aries: [[0, 900, Y, 210], [1.0, 680, Y, 210]], sagittarius: [[0, 400, Y, 210]] }, hops: { aries: [1.1, 1.5, 1.9, 2.3, 2.7], sagittarius: [0.2, 0.6, 1.0, 1.4, 1.8, 2.2, 2.6] }, mood: { aries: 'happy', sagittarius: 'sparkle' },
      lines: [[0.3, 1.2, 'sagittarius', 'nice pace!']], comm: [[1.6, 1.4, 'p', 'he matches | her pace.']], score: [1, 1, 'MILE 2'] },
    { dur: 3.4, set: (x, t) => bayou(x, t, { run: 0.3 }), cast: { aries: [[0, 680, Y, 210]], sagittarius: [[0, 400, Y, 210]] }, mood: { aries: 'happy', sagittarius: 'happy' }, replay: true, look: { aries: [-1, 0] },
      tele: [[0.3, 'arrow', 680, 1020, 470, 1080]], comm: [[0.3, 1.4, 'c', 'watch the | shoulder check.'], [1.9, 1.3, 'p', 'he looked. | he LOOKED.']] },
    { dur: 3.2, set: (x, t) => bayou(x, t, { run: 0.2 }), front: (x, t, lt) => dog(x, 560 + Math.sin(lt * 2) * 40, 1250, t), cast: { aries: [[0, 260, Y, 200]], sagittarius: [[0, 840, Y, 200]] }, mood: { aries: 'heart', sagittarius: 'heart' },
      comm: [[0.3, 1.4, 'p', 'a Heights dog | in a bandana!'], [1.8, 1.3, 'c', 'instant | chemistry.']] },
    { dur: 3.0, set: (x, t) => bayou(x, t, { run: 0 }), front: (x, t) => mosquito(x, 540, 960, t), cast: { aries: [[0, 360, Y, 210]], sagittarius: [[0, 720, Y, 210]] }, mood: { aries: 'eyeroll', sagittarius: 'squint' },
      comm: [[0.3, 1.4, 'p', 'a mosquito! | the city bird!']], mine: [[1.6, 1.2, 'DELAY OF GAME', GOLD, 1000]] },
    { dur: 3.4, set: (x, t) => bayou(x, t, { run: 0 }), back: (x, t, lt) => { if (lt > 1.5) hearts(x, t, 540, 1000, t - lt + 1.5, { n: 6, spread: 300 }) }, cast: { aries: [[0, 380, Y, 210]], sagittarius: [[0, 700, Y, 210]] }, mood: { aries: 'heart', sagittarius: 'heart' },
      lines: [[0.2, 1.3, 'sagittarius', 'same time | next week?'], [1.6, 1.2, 'aries', 'same pace.']], score: [2, 2, 'FINAL'] },
    { dur: 3.6, booth: true, mood: { aquarius: 'happy', leo: 'heart' }, lines: [[0.2, 1.6, 'c', 'the secret? | slow down | and match.'], [2.0, 1.4, 'p', 'see you | Jan 9.']] },
  ],
})

// hst315 · instant replay: your feeder road U-turn
const ep315 = sportsEp({
  hook: 'Instant replay: | your feeder | road U-turn', p: 'libra', c: 'taurus', acc: '#c9a6ff', booth: { wall: '#241a44', acc: '#c9a6ff', show: 'STAR SPORTS' },
  teams: ['CAPRICORN', 'THE FEEDER'], score0: [0, 0, 'Q1'], endLine: 'Meet us halfway. Jan 9.', endStars: ['capricorn', 'gemini', 'libra', 'taurus'],
  scenes: [
    { dur: 2.8, set: (x, t) => feeder(x, t), front: (x, t, lt, P) => ride(x, P, 'capricorn', '#2b5fb0', L0), cast: { capricorn: [[0, 380, L0 - 115, 170]] }, hops: { capricorn: [0.05] }, mood: { capricorn: 'squint' },
      lines: [[0.9, 1.7, 'capricorn', 'coffee date. | I left early.']] },
    { dur: 3.2, booth: true, mood: { libra: 'sparkle', taurus: 'happy' }, lines: [[0.2, 1.4, 'p', "you're driving | to a first date."], [1.7, 1.4, 'c', 'the coffee shop | is RIGHT there.']] },
    { dur: 3.2, set: (x, t) => feeder(x, t, { shop: 1 }), front: (x, t, lt, P) => ride(x, P, 'capricorn', '#2b5fb0', L0), cast: { capricorn: [[0, 200, L0 - 115, 170], [2.4, 1000, L0 - 115, 170]] }, mood: { capricorn: lt => lt > 1.4 ? 'wide' : 'happy' }, look: { capricorn: [1, -1] },
      lines: [[1.4, 1.6, 'capricorn', "it's on the | OTHER side?!"]], comm: [[0.2, 1.1, 'p', 'she sees it...']], score: [0, 1, 'Q1'] },
    { dur: 3.0, set: (x, t) => { feeder(x, t); streetSign(x, 780, 1000, 'U-TURN', { k: 0.8, pole: false }) }, front: (x, t, lt, P) => ride(x, P, 'capricorn', '#2b5fb0', L0, { brake: 0.6 }), cast: { capricorn: [[0, 260, L0 - 115, 170], [3.0, 520, L0 - 115, 170]] }, mood: { capricorn: 'sparkle' },
      comm: [[0.3, 1.4, 'c', 'here it comes: | the Texas U-turn.']] },
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#20283a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#3a3646'; x.fillRect(0, 760, 1080, 150); x.fillRect(0, 1140, 1080, 150); box(x, 380, 900, 320, 240, '#5a5670', 6); txt(x, '59', 540, 1020, { size: 64, col: BONE }); txt(x, 'FEEDER →', 200, 835, { size: 34, col: BONE, font: MONO, weight: 700 }); txt(x, '← FEEDER', 880, 1215, { size: 34, col: BONE, font: MONO, weight: 700 }); txt(x, 'THE PLAY', 540, 700, { size: 44, col: GOLD, font: MONO, weight: 700 }) },
      front: (x, t, lt) => { const u = clamp(lt / 2.4), ang = Math.PI * u, px = u < 1 ? 540 + 200 * Math.sin(ang) : 340, py = 1025 - 190 * Math.cos(ang); car(x, 300 + 300 * Math.sin(ang), py, '#2b5fb0', { s: 0.5, flip: u > 0.5 }) },
      cast: {}, replay: true, tele: [[0.2, 'u', 300, 835, 300, 1215, 0], [0.2, 'arrow', 300, 835, 700, 835]], comm: [[0.3, 1.5, 'c', 'no light. | no stress.'], [1.9, 1.5, 'p', 'a beautiful | U-turn!']] },
    { dur: 3.0, set: (x, t) => feeder(x, t, { scroll: -1, shop: 1 }), front: (x, t, lt, P) => ride(x, P, 'capricorn', '#2b5fb0', L0, { flip: true, brake: lt > 2 ? 1 : 0 }), cast: { capricorn: [[0, 1200, L0 - 115, 170], [2.0, 820, L0 - 115, 170]] }, mood: { capricorn: 'sparkle' },
      comm: [[0.3, 1.4, 'p', 'and she is | BACK!']], score: [1, 1, 'Q2'] },
    { dur: 3.2, set: (x, t) => feeder(x, t, { scroll: 0, shop: 1 }), cast: { gemini: [[0, 800, Y - 20, 200]], capricorn: [[0, 380, Y, 210]] }, mood: { gemini: 'sparkle', capricorn: 'happy' }, hops: { gemini: [0.2, 0.6] },
      lines: [[0.2, 1.3, 'gemini', 'you made it!'], [1.6, 1.4, 'capricorn', 'I planned | for traffic.']] },
    { dur: 3.2, set: (x, t) => { x.fillStyle = '#4a2e22'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(255,214,150,0.08)'; x.fillRect(k * 200, 0, 90, 1920) } box(x, 120, 600, 840, 380, '#bfe6ff', 8); x.save(); x.beginPath(); x.rect(120, 600, 840, 380); x.clip(); skyline(x, 1000, t, { alpha: 0.6 }); x.restore(); box(x, 80, 1230, 920, 40, '#c98e5a', 6) },
      front: (x, t, lt, P) => { cup(x, P.at('capricorn')[0] + 110, 1200, 0.9); cup(x, P.at('gemini')[0] - 110, 1200, 0.9, PINK) }, cast: { capricorn: [[0, 330, 1120, 210]], gemini: [[0, 750, 1120, 210]] }, mood: { capricorn: 'heart', gemini: 'heart' },
      lines: [[0.2, 1.5, 'gemini', 'same halfway | spot next time?'], [1.9, 1.2, 'capricorn', "it's a date."]], score: [2, 1, 'FINAL'] },
    { dur: 3.4, booth: true, mood: { libra: 'heart', taurus: 'happy' }, lines: [[0.2, 1.4, 'c', 'meet halfway. | every time.'], [1.8, 1.4, 'p', 'next stop: | Jan 9.']] },
  ],
})

// hst316 · Pisces at Bellaire karaoke. We go live.
const ep316 = sportsEp({
  hook: 'Pisces sings | on Bellaire. | We go live.', p: 'virgo', c: 'gemini', acc: '#ff8fb1', booth: { wall: '#2a0f30', acc: '#ff8fb1', show: 'STAR SPORTS' },
  teams: ['PISCES', 'BALLAD'], score0: [0, 0, 'VERSE 1'], endLine: 'Bring your duet partner. Jan 9.', endStars: ['pisces', 'cancer', 'virgo', 'gemini'],
  cues: [['bell', 21.0, 1318.5, 0.014, 1.2, 0]],
  scenes: [
    { dur: 2.8, set: (x, t) => karaoke(x, t, { lyric: 'OOOH | HOUSTON' }), back: (x, t) => notes(x, t, 540, 1000, { n: 5 }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('pisces'); box(x, cx + s * 0.42, cy - 30, 26, 70, '#3a3f55', 4) }, cast: { pisces: [[0, 540, Y - 20, 240]] }, hops: { pisces: [0.05, 0.8, 1.6] }, mood: { pisces: 'heart' } },
    { dur: 3.2, booth: true, mood: { virgo: 'squint', gemini: 'sparkle' }, lines: [[0.2, 1.4, 'p', "you're LIVE | from karaoke night."], [1.7, 1.4, 'c', 'Bellaire. | after hot pot.']] },
    { dur: 3.2, set: (x, t) => karaoke(x, t, { lyric: 'A SEVEN-MINUTE | LOVE SONG', screen: 'NOW SINGING: PISCES' }), cast: { pisces: [[0, 540, Y - 20, 240]] }, mood: { pisces: 'sparkle' },
      comm: [[0.3, 1.4, 'c', 'a seven-minute | ballad. bold.'], [1.8, 1.3, 'p', 'no warm-up!']] },
    { dur: 3.2, set: (x, t) => karaoke(x, t, { lyric: 'MY HEART IS | ON THE 610' }), back: (x, t) => notes(x, t, 540, 960, { n: 6 }), cast: { pisces: [[0, 540, Y - 60, 220]], leo: [[0, 150, 1420, 140]], cancer: [[0, 930, 1420, 140]], taurus: [[0, 380, 1450, 130]] }, mood: { pisces: 'heart', leo: 'happy', cancer: 'heart', taurus: 'happy' }, hops: { leo: [0.4, 1.4, 2.4], cancer: [0.9, 1.9], taurus: [0.6, 1.6, 2.6] },
      comm: [[0.3, 1.4, 'p', 'the crowd | is swaying!']], score: [1, 0, 'CHORUS'] },
    { dur: 3.0, set: (x, t) => karaoke(x, t, { lyric: 'AND I... | (crack)' }), cast: { pisces: [[0, 540, Y - 20, 240]] }, mood: { pisces: 'wide' },
      comm: [[0.6, 1.5, 'c', 'a VOICE CRACK. | can she recover?']], mine: [[0.2, 1.0, 'VOICE CRACK', BRAKE, 1000]] },
    { dur: 3.2, set: (x, t) => karaoke(x, t, { lyric: '...' }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); box(x, cx - s * 0.6, cy - 30, 26, 70, '#3a3f55', 4) }, cast: { pisces: [[0, 360, Y - 20, 220]], cancer: [[0, 1250, 1420, 150], [1.2, 720, Y - 20, 220]] }, mood: { pisces: 'wide', cancer: 'sparkle' },
      comm: [[0.2, 1.4, 'p', 'CANCER | off the bench!']], lines: [[1.5, 1.4, 'cancer', 'I got you.']] },
    { dur: 3.4, set: (x, t) => karaoke(x, t, { lyric: 'AND I... | (together)' }), cast: { pisces: [[0, 360, Y - 20, 220]], cancer: [[0, 720, Y - 20, 220]] }, mood: { pisces: 'heart', cancer: 'happy' }, replay: true,
      tele: [[0.3, 'circle', 720, Y - 20, 150]], comm: [[0.3, 1.4, 'c', 'Cancer never | sings in public.'], [1.9, 1.3, 'p', 'for a friend? | ANYTHING.']] },
    { dur: 3.4, set: (x, t) => karaoke(x, t, { lyric: 'HOUSTON, WE HAVE | A HARMONY' }), back: (x, t, lt) => { notes(x, t, 540, 980, { n: 7 }); hearts(x, t, 540, 1000, t - lt + 0.4, { n: 6, spread: 360 }) }, cast: { pisces: [[0, 360, Y - 20, 220]], cancer: [[0, 720, Y - 20, 220]] }, mood: { pisces: 'heart', cancer: 'heart' }, hops: { pisces: [0.5, 1.5, 2.5], cancer: [0.6, 1.6, 2.6] },
      lines: [[1.4, 1.6, 'pisces', 'you came up | here for me?']], score: [2, 0, 'ENCORE'] },
    { dur: 3.0, set: (x, t) => karaoke(x, t, { lyric: 'STANDING | OVATION' }), back: (x, t, lt) => sparkles(x, t, 540, 900, t - lt, 16, 420, 7), cast: { pisces: [[0, 360, Y - 20, 220]], cancer: [[0, 720, Y - 20, 220]], leo: [[0, 150, 1420, 140]], taurus: [[0, 930, 1420, 140]] }, hops: { leo: [0.2, 0.8, 1.4, 2.0], taurus: [0.3, 0.9, 1.5, 2.1] }, mood: { pisces: 'heart', cancer: 'heart', leo: 'sparkle', taurus: 'sparkle' },
      comm: [[0.2, 1.4, 'p', 'the crowd | goes WILD!']], mine: [[1.5, 1.3, 'PERFECT SCORE', GOLD, 1000]] },
    { dur: 3.4, booth: true, mood: { virgo: 'heart', gemini: 'heart' }, lines: [[0.2, 1.4, 'c', 'best duet | of the night.'], [1.8, 1.4, 'p', 'encore: | Jan 9.']] },
  ],
})

// hst317 · your pickleball date went to overtime
const pk = (x, t, lt, a = 0, d = 1.2, from = 300, to = 780) => { const u = clamp((lt - a) / d); if (u <= 0 || u >= 1) return; ball(x, from + (to - from) * u, 960 - Math.sin(Math.PI * u) * 260) }
const ep317 = sportsEp({
  hook: 'Your pickleball | date went | to overtime', p: 'capricorn', c: 'cancer', acc: '#7dffb0', booth: { wall: '#123024', acc: '#7dffb0', show: 'STAR SPORTS' },
  teams: ['GEMINI', 'SCORPIO'], score0: [9, 9, 'GAME 1'], endLine: 'Rematch on Jan 9.', endStars: ['gemini', 'scorpio', 'capricorn', 'cancer'],
  scenes: [
    { dur: 2.8, set: (x, t) => court(x, t), front: (x, t, lt, P) => { paddle(x, P.at('gemini')[0] + 110, Y - 30, 0.4); paddle(x, P.at('scorpio')[0] - 110, Y - 30, -0.4, '#5ec8ff'); pk(x, t, lt, 0, 1.2); pk(x, t, lt, 1.3, 1.2, 780, 300) }, cast: { gemini: [[0, 250, Y, 200]], scorpio: [[0, 830, Y, 200]] }, hops: { gemini: [0.05, 1.3], scorpio: [1.1] }, mood: { gemini: 'sparkle', scorpio: 'squint' } },
    { dur: 3.2, booth: true, mood: { capricorn: 'squint', cancer: 'wide' }, lines: [[0.2, 1.4, 'p', "you're watching | a pickleball date."], [1.7, 1.4, 'c', "it's 9 all. | it's tense."]] },
    { dur: 3.2, set: (x, t) => court(x, t), front: (x, t, lt, P) => { paddle(x, P.at('gemini')[0] + 110, Y - 30, 0.4); paddle(x, P.at('scorpio')[0] - 110, Y - 30, -0.4, '#5ec8ff'); pk(x, t, lt, 1.6, 1.2) }, cast: { gemini: [[0, 250, Y, 200]], scorpio: [[0, 830, Y, 200]] }, mood: { gemini: 'sparkle', scorpio: 'squint' },
      lines: [[0.2, 1.4, 'gemini', 'so anyway, my | cousin in Katy...']], comm: [[1.7, 1.4, 'p', 'Gemini serves... | mid-story.']] },
    { dur: 3.0, set: (x, t) => court(x, t), front: (x, t, lt, P) => { paddle(x, P.at('gemini')[0] + 110, Y - 30, 0.4); paddle(x, P.at('scorpio')[0] - 110, Y - 30, -0.9 + 0.5 * Math.sin(lt * 8), '#5ec8ff'); pk(x, t, lt, 0.2, 0.7, 780, 300) }, cast: { gemini: [[0, 250, Y, 200]], scorpio: [[0, 830, Y, 200], [0.6, 700, Y, 200]] }, mood: { gemini: 'wide', scorpio: 'squint' },
      comm: [[0.3, 1.5, 'c', 'Scorpio. no smile. | full focus.']] },
    { dur: 3.2, set: (x, t) => court(x, t), front: (x, t, lt, P) => { paddle(x, P.at('gemini')[0] + 110, Y - 30, 0.4); paddle(x, P.at('scorpio')[0] - 110, Y - 30, -0.4, '#5ec8ff'); pk(x, t, lt, 0.1, 1.0, 400, 640) }, cast: { gemini: [[0, 250, Y, 200], [0.8, 420, Y, 200]], scorpio: [[0, 830, Y, 200], [0.8, 660, Y, 200]] }, mood: { gemini: 'sparkle', scorpio: 'wide' },
      comm: [[0.3, 1.4, 'p', 'both into | the kitchen!']], mine: [[1.4, 1.4, 'THE KITCHEN', GOLD, 1000]] },
    { dur: 3.4, set: (x, t) => court(x, t), front: (x, t) => ball(x, 708, 1316, 1.2), cast: { gemini: [[0, 380, Y, 200]], scorpio: [[0, 760, Y, 200]] }, mood: { gemini: 'squint', scorpio: 'squint' }, replay: true,
      tele: [[0.3, 'circle', 708, 1316, 60]], comm: [[0.3, 1.4, 'c', 'in or out? | ON the line.']], lines: [[1.8, 1.3, 'scorpio', 'your point.']] },
    { dur: 3.0, set: (x, t) => court(x, t), front: (x, t, lt, P) => { for (const id of ['gemini', 'scorpio']) { const [cx, cy, s] = P.at(id); sweat(x, cx + s * 0.28, cy - s * 0.38, t) } }, cast: { gemini: [[0, 300, Y, 200]], scorpio: [[0, 780, Y, 200]] }, mood: { gemini: 'wide', scorpio: 'squint' },
      comm: [[0.2, 1.5, 'c', "80° in January. | we're in overtime."]], score: [10, 10, 'OVERTIME'] },
    { dur: 3.2, set: (x, t) => court(x, t), cast: { gemini: [[0, 380, Y, 210]], scorpio: [[0, 700, Y, 210]] }, mood: { gemini: 'happy', scorpio: 'happy' }, hops: { scorpio: [0.4] },
      lines: [[0.8, 1.3, 'gemini', 'did you | just smile?']], mine: [[0.2, 1.3, 'SCORPIO SMILED', PINK, 1000]], comm: [[2.2, 1.0, 'p', 'HISTORIC.']] },
    { dur: 3.4, set: (x, t) => court(x, t), back: (x, t, lt) => { if (lt > 1.4) hearts(x, t, 540, 1000, t - lt + 1.4, { n: 6, spread: 300 }) }, cast: { gemini: [[0, 380, Y, 210]], scorpio: [[0, 700, Y, 210]] }, mood: { gemini: 'heart', scorpio: 'heart' },
      lines: [[0.2, 1.2, 'scorpio', 'call it | a tie?'], [1.5, 1.4, 'gemini', 'over | breakfast tacos.']], score: [11, 11, 'FINAL'] },
    { dur: 3.4, booth: true, mood: { capricorn: 'happy', cancer: 'heart' }, lines: [[0.2, 1.4, 'c', 'the real win? | the rematch.'], [1.8, 1.4, 'p', 'rematch: | Jan 9.']] },
  ],
})

// hst318 · crawfish season opener: Taurus vs. Leo
const ep318 = sportsEp({
  hook: 'Crawfish opener: | Taurus vs. Leo', p: 'sagittarius', c: 'aquarius', acc: '#ff9a3c', booth: { wall: '#3a1a12', acc: '#ff9a3c', show: 'STAR SPORTS' },
  teams: ['TAURUS', 'LEO'], score0: [0, 0, 'ROUND 1'], endLine: 'Save me the corn. Jan 9.', endStars: ['taurus', 'leo', 'sagittarius', 'aquarius'],
  scenes: [
    { dur: 2.8, set: (x, t) => { backyard(x, t); boilPot(x, 880, 1200, t, 0.9) }, front: (x, t, lt) => boilTable(x, t, Kp(lt, 0.1, 0.8)), cast: { taurus: [[0, 300, 1120, 210]], leo: [[0, 640, 1120, 210]] }, hops: { taurus: [0.05], leo: [0.2, 0.9] }, mood: { taurus: 'heart', leo: 'sparkle' } },
    { dur: 3.2, booth: true, mood: { sagittarius: 'sparkle', aquarius: 'happy' }, lines: [[0.2, 1.4, 'p', "you're just in | time. first boil!"], [1.7, 1.4, 'c', "it's January. | they're small."]] },
    { dur: 3.0, set: (x, t) => { backyard(x, t); boilPot(x, 880, 1200, t, 0.9) }, front: (x, t, lt) => boilTable(x, t, 1), cast: { taurus: [[0, 300, 1120, 210]], leo: [[0, 640, 1120, 210]] }, mood: { taurus: 'squint', leo: 'squint' },
      comm: [[0.2, 1.4, 'p', 'the pour is in. | HERE WE GO.']], mine: [[1.5, 1.2, 'TIP-OFF', GOLD, 1000]] },
    { dur: 3.2, set: (x, t) => backyard(x, t), front: (x, t, lt, P) => { boilTable(x, t, 1); crawfish(x, P.at('taurus')[0] + 120, 1100 - Math.abs(Math.sin(lt * 4)) * 40, 1.4, lt * 3) }, cast: { taurus: [[0, 360, 1120, 220]] }, mood: { taurus: 'happy' }, hops: { taurus: [0.6, 1.4, 2.2] },
      lines: [[0.2, 1.4, 'taurus', 'pinch. twist. | peel.']], comm: [[1.7, 1.4, 'c', 'Taurus: | pure technique.']], score: [3, 0, 'ROUND 1'] },
    { dur: 3.2, set: (x, t) => backyard(x, t), front: (x, t, lt, P) => { boilTable(x, t, 1); for (let k = 0; k < 6; k++) box(x, 560 + (k * 97) % 360, 1150 - (k * 41) % 120, 22, 14, '#d8432f', 3) }, cast: { leo: [[0, 700, 1120, 220]] }, mood: { leo: 'wide' },
      lines: [[0.2, 1.4, 'leo', 'why are they | so SMALL?']], comm: [[1.7, 1.4, 'p', 'Leo is | fighting it!']] },
    { dur: 3.4, set: (x, t) => backyard(x, t), front: (x, t, lt, P) => { boilTable(x, t, 1); crawfish(x, 620, 1150, 1.8, 0.2) }, cast: { taurus: [[0, 260, 1120, 210]] }, mood: { taurus: 'happy' }, replay: true,
      tele: [[0.3, 'circle', 620, 1150, 100], [0.9, 'arrow', 800, 960, 680, 1080]], comm: [[0.3, 1.4, 'c', 'watch the | twist. textbook.'], [1.9, 1.3, 'p', 'a master.']] },
    { dur: 3.2, set: (x, t) => backyard(x, t), front: (x, t) => boilTable(x, t, 0.8), cast: { taurus: [[0, 300, 1120, 210], [1.0, 440, 1120, 210]], leo: [[0, 700, 1120, 210]] }, mood: { taurus: 'happy', leo: 'wide' }, look: { leo: [-1, 0] },
      lines: [[1.0, 1.3, 'taurus', 'here. | like this.']], comm: [[0.1, 0.9, 'c', 'wait...'], [2.3, 0.9, 'c', "she's COACHING."]] },
    { dur: 3.2, set: (x, t) => backyard(x, t), front: (x, t, lt) => { boilTable(x, t, 0.7); const k = Kp(lt, 0.2); if (k > 0) { box(x, 470, 1120, 140 * k, 90 * k, '#f2c75c', 6); txt(x, 'GARLIC', 540, 1160, { size: 26 * k, col: INK, font: MONO, weight: 700 }) } }, cast: { taurus: [[0, 300, 1100, 210]], leo: [[0, 780, 1100, 210]] }, mood: { taurus: 'heart', leo: 'heart' },
      comm: [[0.3, 1.5, 'p', 'Viet-Cajun garlic | butter. GAME CHANGER.']], mine: [[1.9, 1.2, 'POWER PLAY', GOLD, 1000]] },
    { dur: 3.2, set: (x, t) => backyard(x, t), back: (x, t, lt) => { if (lt > 0.4) sparkles(x, t, 640, 1000, t - lt + 0.4, 12, 240, 8) }, front: (x, t, lt, P) => { boilTable(x, t, 0.6); crawfish(x, P.at('leo')[0] + 120, 1000, 1.4, 0) }, cast: { leo: [[0, 640, 1110, 230]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.3, 0.8] },
      lines: [[0.3, 1.4, 'leo', 'I DID IT!']], comm: [[1.8, 1.3, 'c', 'LEO | IS ON THE BOARD!']], score: [9, 1, 'FINAL'] },
    { dur: 3.0, set: (x, t) => backyard(x, t), front: (x, t, lt, P) => { boilTable(x, t, 0.4); corn(x, 540, 1180, 1.2); potato(x, 650, 1190, 1.1) }, cast: { taurus: [[0, 300, 1110, 210]], leo: [[0, 780, 1110, 210]] }, mood: { taurus: 'wink', leo: 'happy' },
      lines: [[0.2, 1.3, 'taurus', 'save me | the corn.'], [1.6, 1.2, 'leo', 'deal.']] },
    { dur: 3.6, booth: true, mood: { sagittarius: 'heart', aquarius: 'happy' }, lines: [[0.2, 1.6, 'c', "it's not about | who's fastest."], [2.0, 1.4, 'p', "it's who | you share with."]] },
  ],
})

// hst319 · the shade parking championship is LIVE
const ep319 = sportsEp({
  hook: 'The shade | parking final | is LIVE', p: 'aries', c: 'pisces', acc: '#ffd36b', booth: { wall: '#3a2a10', acc: '#ffd36b', show: 'STAR SPORTS' },
  teams: ['LEO', 'THE SUN'], score0: [0, 1, '1PM'], endLine: 'Bring a sweater anyway. Jan 9.', endStars: ['leo', 'virgo', 'aries', 'pisces'],
  scenes: [
    { dur: 2.8, set: (x, t) => sunLot(x, t), front: (x, t, lt, P) => ride(x, P, 'leo', '#e0a030', L0), cast: { leo: [[0, 900, L0 - 115, 170], [2.8, 640, L0 - 115, 170]] }, hops: { leo: [0.05] }, mood: { leo: 'squint' } },
    { dur: 3.2, booth: true, mood: { aries: 'sparkle', pisces: 'wide' }, lines: [[0.2, 1.4, 'p', 'you know this | sport. we all do.'], [1.7, 1.4, 'c', "it's 80° | in January..."]] },
    { dur: 3.2, set: (x, t) => sunLot(x, t), front: (x, t, lt, P) => ride(x, P, 'leo', '#e0a030', L0, { brake: lt > 1.6 ? 1 : 0 }), cast: { leo: [[0, 900, L0 - 115, 170], [1.6, 320, L0 - 115, 170]] }, mood: { leo: 'sparkle' },
      comm: [[0.3, 1.4, 'p', 'Leo sees | the shade!'], [1.9, 1.2, 'p', 'AND PARKS!']], score: [1, 1, '1PM'] },
    { dur: 3.2, set: (x, t, lt) => sunLot(x, t, { sunX: 860 - lt * 120, shadeX: 300 + lt * 140 }), front: (x, t, lt, P) => ride(x, P, 'leo', '#e0a030', L0), cast: { leo: [[0, 320, L0 - 115, 170]] }, mood: { leo: lt => lt > 1 ? 'wide' : 'happy' },
      comm: [[0.4, 1.5, 'c', 'the shade is... | MOVING?']], mine: [[1.8, 1.2, 'THE SUN MOVES', BRAKE, 1000]], score: [1, 2, '3PM'] },
    { dur: 3.0, set: (x, t) => sunLot(x, t, { sunX: 500, shadeX: 760 }), front: (x, t, lt, P) => ride(x, P, 'leo', '#e0a030', L0), cast: { leo: [[0, 320, L0 - 115, 170], [1.6, 760, L0 - 115, 170]] }, mood: { leo: 'squint' },
      comm: [[0.3, 1.5, 'p', 'Leo FOLLOWS | the shade!']] },
    { dur: 3.4, set: (x, t) => sunLot(x, t, { sunX: 500, shadeX: 760 }), front: (x, t, lt, P) => ride(x, P, 'leo', '#e0a030', L0), cast: { leo: [[0, 760, L0 - 115, 170]] }, mood: { leo: 'happy' }, replay: true,
      tele: [[0.3, 'u', 300, 1240, 760, 1240, -160], [0.4, 'circle', 860, 600, 110]], comm: [[0.3, 1.4, 'c', 'he parked for | the 3 PM shade.'], [1.9, 1.3, 'p', 'VISIONARY.']] },
    { dur: 3.2, set: (x, t) => sunLot(x, t, { sunX: 500, shadeX: 760 }), front: (x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); const k = Kp(lt, 0.6, 0.4); if (k > 0) { box(x, cx + s * 0.4, cy - 80 * k, 180 * k, 140 * k, '#c0c6d0', 5); for (let j = 0; j < 4; j++) { x.fillStyle = '#8f96a0'; x.fillRect(cx + s * 0.4 + j * 45 * k, cy - 80 * k, 4, 140 * k) } } }, cast: { virgo: [[0, 1250, Y, 200], [0.6, 400, Y, 200]] }, mood: { virgo: 'wink' },
      lines: [[0.8, 1.4, 'virgo', 'or... a windshield | shade?']], comm: [[2.2, 1.0, 'c', 'the cheat code.']] },
    { dur: 3.0, set: (x, t) => sunLot(x, t, { sunX: 500, shadeX: 760 }), front: (x, t, lt, P) => { ride(x, P, 'leo', '#e0a030', L0); for (let k = 0; k < 40 * clamp(lt / 1.5); k++) { x.fillStyle = '#e8d44a'; x.fillRect(640 + (k * 37) % 260, 1250 + (k * 13) % 60, 8, 8) } }, cast: { leo: [[0, 760, L0 - 115, 170]] }, mood: { leo: 'eyeroll' },
      comm: [[0.3, 1.5, 'p', 'and now: | OAK POLLEN!']], mine: [[1.7, 1.2, 'FLAG ON THE PLAY', GOLD, 1000]] },
    { dur: 3.2, set: (x, t) => { x.fillStyle = '#bfe6ff'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 30; k++) { x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect((k * 173 + t * 60) % 1080, (k * 97 + t * 90) % 1300, 8, 8) } box(x, 340, 620, 400, 120, '#e8f4ff', 6); txt(x, 'AC: ARCTIC', 540, 682, { size: 46, col: '#2b5fb0', font: MONO, weight: 700 }); ground(x, '#d8e6f0', 1320) },
      front: (x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); for (let k = 0; k < 3; k++) box(x, cx - s * 0.36, cy + s * 0.02 + k * s * 0.13, s * 0.72, s * 0.12, '#7a5ac0', 4) }, cast: { leo: [[0, 540, Y, 240]] }, mood: { leo: 'wide' },
      lines: [[0.2, 1.4, 'leo', "it's FREEZING | in here."]], comm: [[1.7, 1.4, 'c', 'Houston rule: | bring a sweater.']], score: [2, 2, 'FINAL'] },
    { dur: 3.4, booth: true, mood: { aries: 'happy', pisces: 'heart' }, lines: [[0.2, 1.4, 'c', 'a beautiful | Houston day.'], [1.8, 1.4, 'p', 'see you | Jan 9.']] },
  ],
})

// hst320 · bats at sunset: your date, live
const ep320 = sportsEp({
  hook: 'Bats at sunset: | your date, live', p: 'scorpio', c: 'libra', acc: '#c9a6ff', booth: { wall: '#2a1840', acc: '#c9a6ff', show: 'STAR SPORTS' },
  teams: ['THE DATE', 'THE BATS'], score0: [0, 0, 'SUNSET'], endLine: 'Bring someone. Jan 9.', endStars: ['cancer', 'capricorn', 'scorpio', 'libra'],
  cues: [['bell', 22.3, 1318.5, 0.014, 1.2, 0]],
  scenes: [
    { dur: 2.8, set: (x, t) => bridge(x, t), front: (x, t, lt) => { railFront(x); for (let i = 0; i < 4; i++) bat(x, 300 + i * 160 + Math.sin(t * 2 + i) * 40, 1000 - i * 60 - lt * 30, t + i, 0.9) }, cast: { cancer: [[0, 400, 1130, 200]], capricorn: [[0, 680, 1130, 200]] }, hops: { cancer: [0.05, 1.1], capricorn: [0.2] }, mood: { cancer: 'heart', capricorn: 'squint' } },
    { dur: 3.2, booth: true, mood: { scorpio: 'squint', libra: 'happy' }, lines: [[0.2, 1.4, 'p', "you're at the | bat bridge. sunset."], [1.7, 1.4, 'c', 'and the bats | are... late.']] },
    { dur: 3.2, set: (x, t) => bridge(x, t), front: railFront, cast: { cancer: [[0, 400, 1130, 200]], capricorn: [[0, 680, 1130, 200]] }, mood: { cancer: 'happy', capricorn: 'squint' }, look: { capricorn: [0, 1] },
      lines: [[0.2, 1.3, 'capricorn', 'they said | sunset.']], comm: [[1.6, 1.5, 'c', 'Capricorn is | checking the time.']] },
    { dur: 3.2, set: (x, t) => bridge(x, t), front: (x, t, lt, P) => { railFront(x); const k = Kp(lt, 0.3); if (k > 0) { box(x, 470, 1150 - 40 * k, 140, 70, '#c98e5a', 5); box(x, 460, 1140 - 40 * k, 160, 16, '#8a5530', 3) } }, cast: { cancer: [[0, 340, 1130, 200]], capricorn: [[0, 740, 1130, 200]] }, mood: { cancer: 'sparkle', capricorn: 'wide' },
      comm: [[0.3, 1.5, 'p', 'Cancer brought | a picnic. OF COURSE.']], mine: [[1.9, 1.2, 'HOME ADVANTAGE', GOLD, 1000]] },
    { dur: 3.2, set: (x, t) => bridge(x, t), front: railFront, cast: { cancer: [[0, 400, 1130, 200]], capricorn: [[0, 680, 1130, 200]] }, mood: { cancer: 'happy', capricorn: 'happy' },
      lines: [[0.2, 1.4, 'cancer', "where'd you go | to high school?"]], comm: [[1.7, 1.4, 'c', 'the Houston | question!']] },
    { dur: 3.4, set: (x, t) => bridge(x, t), front: railFront, cast: { cancer: [[0, 450, 1130, 200]], capricorn: [[0, 630, 1130, 200]] }, mood: { cancer: 'heart', capricorn: 'wide' }, replay: true,
      tele: [[0.3, 'circle', 540, 1210, 90]], comm: [[0.3, 1.4, 'c', 'the hands. | THE HANDS.'], [1.9, 1.3, 'p', 'on the rail. | inches apart.']] },
    { dur: 3.0, set: (x, t) => bridge(x, t, { bats: 0.3 }), front: (x, t, lt) => { railFront(x); bat(x, 540, 1300 - lt * 260, t, 1.4) }, cast: { cancer: [[0, 400, 1130, 200]], capricorn: [[0, 680, 1130, 200]] }, mood: { cancer: 'wide', capricorn: 'wide' },
      comm: [[0.3, 1.4, 'p', 'FIRST BAT! | here they come!']], score: [0, 1, 'DUSK'] },
    { dur: 3.4, set: (x, t) => bridge(x, t, { bats: 1 }), front: (x, t, lt) => { railFront(x); batSwarm(x, t, lt, 0) }, cast: { cancer: [[0, 400, 1130, 200]], capricorn: [[0, 680, 1130, 200]] }, mood: { cancer: 'heart', capricorn: 'heart' },
      comm: [[0.4, 1.5, 'c', 'absolutely | breathtaking.']], mine: [[1.9, 1.3, 'THE BATS!', LAV, 1000]] },
    { dur: 3.2, set: (x, t) => bridge(x, t, { bats: 1 }), back: (x, t, lt) => hearts(x, t, 540, 1000, t - lt + 0.8, { n: 6, spread: 260 }), front: (x, t, lt) => { railFront(x); batSwarm(x, t, lt + 3.4, 0, 14) }, cast: { cancer: [[0, 450, 1130, 200]], capricorn: [[0, 630, 1130, 200]] }, mood: { cancer: 'heart', capricorn: 'heart' },
      lines: [[0.2, 1.4, 'capricorn', 'I forgot to | check the time.']], score: [1, 1, 'FINAL'] },
    { dur: 3.6, booth: true, mood: { scorpio: 'heart', libra: 'heart' }, lines: [[0.2, 1.6, 'c', "the best part | wasn't the bats."], [2.0, 1.4, 'p', 'it was waiting | together.']] },
  ],
})

// hst321 · Hermann Park paddle boats: photo finish
const ep321 = sportsEp({
  hook: 'Hermann Park | paddle boats: | photo finish', p: 'taurus', c: 'aquarius', acc: '#5ec8ff', booth: { wall: '#0f2a3a', acc: '#5ec8ff', show: 'STAR SPORTS' },
  teams: ['ARIES+VIRGO', 'GEM+PISCES'], score0: [0, 0, 'LAP 1'], endLine: 'Photo finish on Jan 9.', endStars: ['aries', 'virgo', 'gemini', 'pisces'],
  scenes: [
    { dur: 2.8, set: (x, t) => pond(x, t), front: (x, t, lt, P) => { boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'); boatRide(x, t, P, ['gemini', 'pisces'], '#5ec8ff') }, cast: { aries: [[0, 180, 1130, 140], [2.8, 320, 1130, 140]], virgo: [[0, 300, 1130, 140], [2.8, 440, 1130, 140]], gemini: [[0, 620, 1340, 140], [2.8, 700, 1340, 140]], pisces: [[0, 740, 1340, 140], [2.8, 820, 1340, 140]] }, hops: { aries: [0.05, 0.6, 1.2], gemini: [0.3] }, mood: { aries: 'squint', virgo: 'wide', gemini: 'sparkle', pisces: 'heart' } },
    { dur: 3.2, booth: true, mood: { taurus: 'sparkle', aquarius: 'happy' }, lines: [[0.2, 1.4, 'p', "you're LIVE at | Hermann Park!"], [1.7, 1.4, 'c', 'the paddle boat | grand final.']] },
    { dur: 3.0, set: (x, t) => pond(x, t), front: (x, t, lt, P) => boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'), cast: { aries: [[0, 220, 1200, 160], [3.0, 760, 1200, 160]], virgo: [[0, 360, 1200, 160], [3.0, 900, 1200, 160]] }, mood: { aries: 'squint', virgo: 'wide' }, hops: { aries: [0.2, 0.5, 0.8, 1.1, 1.4] },
      comm: [[0.2, 1.3, 'p', "AND THEY'RE OFF!"], [1.6, 1.3, 'p', 'Aries pedals | like a storm!']] },
    { dur: 3.2, set: (x, t) => pond(x, t), front: (x, t, lt, P) => boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'), cast: { aries: [[0, 470, 1100, 160], [0.8, 600, 1250, 160], [1.6, 470, 1380, 160], [2.4, 340, 1250, 160], [3.2, 470, 1100, 160]], virgo: [[0, 610, 1100, 160], [0.8, 740, 1250, 160], [1.6, 610, 1380, 160], [2.4, 480, 1250, 160], [3.2, 610, 1100, 160]] }, mood: { aries: 'sparkle', virgo: 'wide' },
      lines: [[1.2, 1.4, 'virgo', 'I SAID | LEFT.']], comm: [[0.2, 1.0, 'c', 'in circles.']] },
    { dur: 3.2, set: (x, t) => pond(x, t), front: (x, t, lt, P) => boatRide(x, t, P, ['gemini', 'pisces'], '#5ec8ff'), cast: { gemini: [[0, 380, 1200, 170], [3.2, 460, 1200, 170]], pisces: [[0, 540, 1200, 170], [3.2, 620, 1200, 170]] }, mood: { gemini: 'sparkle', pisces: 'heart' },
      lines: [[0.3, 1.3, 'gemini', 'so then | I said...']], comm: [[1.7, 1.4, 'p', 'Gemini and Pisces | are... chatting.']], score: [1, 0, 'LAP 2'] },
    { dur: 3.4, set: (x, t) => pond(x, t), front: (x, t, lt, P) => { boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'); boatRide(x, t, P, ['gemini', 'pisces'], '#5ec8ff'); for (let k = 0; k < 4; k++) { const dx = 1180 - lt * 260 - k * 70, dy = 1290; box(x, dx - 20, dy - 16, 40, 30, k ? '#f2e36a' : BONE, 4); box(x, dx - 28, dy - 30, 18, 18, k ? '#f2e36a' : BONE, 3) } }, cast: { aries: [[0, 140, 1120, 140]], virgo: [[0, 260, 1120, 140]], gemini: [[0, 700, 1120, 140]], pisces: [[0, 820, 1120, 140]] }, mood: { aries: 'wide', virgo: 'heart', gemini: 'heart', pisces: 'heart' },
      lines: [[0.4, 1.3, 'pisces', 'the DUCKLINGS!']], comm: [[1.8, 1.4, 'c', 'a duck crossing! | everybody stops.']] },
    { dur: 3.4, set: (x, t) => pond(x, t), front: (x, t, lt, P) => { boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'); boatRide(x, t, P, ['gemini', 'pisces'], '#5ec8ff') }, cast: { aries: [[0, 140, 1120, 140]], virgo: [[0, 260, 1120, 140]], gemini: [[0, 700, 1120, 140]], pisces: [[0, 820, 1120, 140]] }, mood: { aries: 'happy', virgo: 'happy', gemini: 'happy', pisces: 'heart' }, replay: true,
      tele: [[0.3, 'circle', 200, 1170, 130], [0.6, 'circle', 760, 1170, 130]], comm: [[0.3, 1.4, 'c', 'both boats | yield. ALL of them.'], [1.9, 1.3, 'p', 'sportsmanship!']] },
    { dur: 3.0, set: (x, t) => { pond(x, t); box(x, 960, 1000, 140, 400, '#8a6a4a', 6); x.fillStyle = BONE; for (let k = 0; k < 10; k++) x.fillRect(940, 1000 + k * 40, 20, 20) }, front: (x, t, lt, P) => { boatRide(x, t, P, ['aries', 'virgo'], '#ff7a2a'); boatRide(x, t, P, ['gemini', 'pisces'], '#5ec8ff') }, cast: { aries: [[0, 140, 1100, 140], [3, 600, 1100, 140]], virgo: [[0, 260, 1100, 140], [3, 720, 1100, 140]], gemini: [[0, 140, 1320, 140], [3, 600, 1320, 140]], pisces: [[0, 260, 1320, 140], [3, 720, 1320, 140]] }, mood: { aries: 'squint', virgo: 'squint', gemini: 'sparkle', pisces: 'wide' }, hops: { aries: [0.3, 0.7, 1.1, 1.5], gemini: [0.4, 0.8, 1.2, 1.6] },
      comm: [[0.3, 1.4, 'p', 'side by side | to the dock!']], mine: [[1.6, 1.3, 'PHOTO FINISH', GOLD, 860]] },
    { dur: 3.4, set: (x, t) => pond(x, t), front: (x, t, lt) => phoneFlash(x, 900, 960, t, 'CLICK', lt), cast: { aries: [[0, 200, 1180, 170]], virgo: [[0, 380, 1180, 170]], gemini: [[0, 560, 1180, 170]], pisces: [[0, 740, 1180, 170]] }, mood: { aries: 'happy', virgo: 'wink', gemini: 'sparkle', pisces: 'heart' }, hops: { aries: [1.0], virgo: [1.05], gemini: [1.1], pisces: [1.15] },
      lines: [[1.4, 1.0, 'aries', 'who won?'], [2.4, 1.0, 'pisces', 'the selfie.']], score: [1, 1, 'FINAL'] },
    { dur: 3.4, booth: true, mood: { taurus: 'heart', aquarius: 'happy' }, lines: [[0.2, 1.4, 'c', 'everybody wins | at Hermann Park.'], [1.8, 1.4, 'p', 'final round: | Jan 9.']] },
  ],
})

export const W13 = { hst311: ep311, hst312: ep312, hst313: ep313, hst314: ep314, hst315: ep315, hst316: ep316, hst317: ep317, hst318: ep318, hst319: ep319, hst320: ep320, hst321: ep321 }
