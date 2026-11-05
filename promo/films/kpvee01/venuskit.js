// venuskit — the PLANET TALK: VENUS episode engine (batch p04, promo/films/planets/p04.md). Owned by kpvee01; the other
// kpvee films import it read-only. Built on promo/films/planetkit.js (the cast, the entrance, speech bubbles) and
// promo/films/hookkit.js (slam titles, whip zoom, record scratch, notifications, chapters, loop helper).
// No end card, no card transition, no logo: DURATION is the story length.
//
//   import { episode, P, txt, panel, heart, sparkleBurst } from '../../kpvee01/venuskit.js'
//   const EP = episode({ ...spec })      → { DURATION, SCENES, CUES }
//
// spec:
//   sign, dur, ending: 'loop' | 'cut'
//   enter: { kind, at, x, y, size }                        Venus's entrance (planetkit entrance(); frame 0 mid-entrance)
//   venus: [{ t, d?, x, y, size, mood, look, rot, tears, alpha }]   keyframes: values ease into a key over [t − d, t]
//          (d default 0.45; d: 0 = a cut). Non-numeric fields (mood, look) switch at t − d/2.
//   signK: [{ t, d?, x, y, size, mood, look, tears, squash, alpha }]   the sign (drawSign)
//   pisK:  [{ t, d?, x, y, size, mood, look, tears, alpha }]           Pisces, Venus's starstruck assistant (FAN sash).
//          tears never go below 1 (Pisces cries in every film).
//   bubbles: [{ t0, t1, who, text, x, y, tail, tailUp, size, maxW }]  planetkit speech(); talk + hops are automatic.
//   fx: [[name, opts], …]   hookkit effects: slamTitle, whipZoom, recordScratch (also freezes the film), screenShake,
//          caught, notification, loadingBar, countdown, gameHud, achievement, chapter, glitch, incomingCall, newsDesk.
//   frame0: names of the fx (by index into fx) that are visible on frame 0 (for the loop helper). Default: every fx
//          with at < 0.05.
//   back(x, t, S) / mid(x, t, S) / front(x, t, S)   your props: back = behind everyone, mid = between Venus and the
//          sign, front = over the characters (under the bubbles). S = { venus, sign, pis } current poses.
//   cues: extra sound cues.   space: drawSpace opts override.   bugAt (default 0.15).
//
// Venus's signature: a ring of sparkles that orbits her the WRONG way (counter-clockwise; true: Venus spins the
// opposite way to most planets), a rose-gold glitter trail on entrances, "darling".
import { clamp, lerp, prog, ease, el } from '../../src/lib.js'
import { fill } from '../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawPixelStar } from '../sky.js'
import { GRAIN_H, easeOutBack } from '../wheel.js'
import {
  drawPlanet, drawSign, drawSpace, speech, speechCues, entrance, drawEntranceFx, entranceCues, PLANETS,
} from '../planetkit.js'
import * as HK from '../hookkit.js'

export const VCOL = PLANETS.venus.color, VRIM = PLANETS.venus.rim
export const ROSE = '#ff8fb1', GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', CREAM = '#fffaf0'
export const INTER = "Inter, 'Helvetica Neue', Arial, sans-serif"
export const SERIF = "'EB Garamond', Georgia, serif"
export const MONO = "'Space Mono', ui-monospace, monospace"
const TAU = Math.PI * 2
const fr = (n, s = 1) => { const v = Math.sin(n * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v) }
export const pop01 = (t, t0, d = 0.3, s = 2.2) => (t < t0 ? 0 : easeOutBack(prog(t, t0, t0 + d), s))
export const outK = (t, w) => (w ? 1 - ease.inQuad(prog(t, w[0], w[1])) : 1)
/** visible window helper: pops in at a, out over [b, b + 0.2] */
export const win = (t, a, b, d = 0.3) => pop01(t, a, d) * outK(t, [b, b + 0.2])

// ─────────────────────────────────────────────── keyframe tracks
const NUM = new Set(['x', 'y', 'size', 'rot', 'tears', 'squash', 'alpha', 'pop', 'glow'])
export function track(keys, t) {
  if (!keys || !keys.length) return null
  let i = 0
  while (i + 1 < keys.length && t >= keys[i + 1].t - (keys[i + 1].d ?? 0.45)) i++
  const cur = { ...keys[0] }
  for (let j = 1; j <= i; j++) Object.assign(cur, keys[j])
  const nxt = keys[i + 1]
  const k = keys[i]
  if (i > 0) {
    const d = k.d ?? 0.45, prev = { ...keys[0] }
    for (let j = 1; j < i; j++) Object.assign(prev, keys[j])
    const e = d > 0 ? ease.inOutCubic(prog(t, k.t - d, k.t)) : 1
    for (const f of Object.keys(k)) if (NUM.has(f) && prev[f] !== undefined) cur[f] = lerp(prev[f], k[f], e)
    if (e < 0.5) for (const f of ['mood', 'look']) if (f in k && f in prev) cur[f] = prev[f]
  }
  void nxt
  return cur
}

// ─────────────────────────────────────────────── canvas helpers for props
export function txt(x, text, cx, cy, { size = 40, color = INK, weight = 800, font, align = 'center', rot = 0, alpha = 1, s = 1, italic = false, stroke = null, sw = 8, base = 'middle' } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.font = font || (italic ? `italic 600 ${size}px ${SERIF}` : `${weight} ${size}px ${INTER}`)
  x.textAlign = align; x.textBaseline = base
  if (stroke) { x.lineJoin = 'round'; x.lineWidth = sw; x.strokeStyle = stroke; x.strokeText(text, 0, 0) }
  x.fillStyle = color; x.fillText(text, 0, 0)
  x.restore()
}
/** rich line: '*accent*' in EB Garamond italic */
export function rich(x, text, cx, cy, { size = 44, color = INK, accent = VRIM, alpha = 1, s = 1, rot = 0, stroke = null } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  const parts = String(text).split('*').map((p, i) => ({ p, acc: i % 2 === 1 })).filter(q => q.p)
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  const fontOf = acc => (acc ? `italic 600 ${Math.round(size * 1.12)}px ${SERIF}` : `800 ${size}px ${INTER}`)
  let W = 0; for (const q of parts) { x.font = fontOf(q.acc); q.w = x.measureText(q.p).width; W += q.w }
  let px = -W / 2
  x.textBaseline = 'middle'; x.textAlign = 'left'
  for (const q of parts) {
    x.font = fontOf(q.acc)
    if (stroke) { x.lineJoin = 'round'; x.lineWidth = 9; x.strokeStyle = stroke; x.strokeText(q.p, px, 0) }
    x.fillStyle = q.acc ? accent : color; x.fillText(q.p, px, 0); px += q.w
  }
  x.restore()
}
export function panel(x, cx, cy, w, h, { fill = CREAM, border = INK, bw = 7, rad = 26, rot = 0, alpha = 1, s = 1, shadow = true } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  if (shadow) { x.save(); x.shadowColor = 'rgba(6,4,18,0.45)'; x.shadowBlur = 26; x.shadowOffsetY = 12; x.fillStyle = border; x.beginPath(); x.roundRect(-w / 2 - bw, -h / 2 - bw, w + 2 * bw, h + 2 * bw, rad + bw); x.fill(); x.restore() }
  else { x.fillStyle = border; x.beginPath(); x.roundRect(-w / 2 - bw, -h / 2 - bw, w + 2 * bw, h + 2 * bw, rad + bw); x.fill() }
  x.fillStyle = fill; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, rad); x.fill()
  x.restore()
}
export function heart(x, cx, cy, r, { color = ROSE, outline = INK, alpha = 1, rot = 0 } = {}) {
  if (alpha <= 0.01 || r <= 0.5) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot)
  const path = () => { x.beginPath(); x.moveTo(0, r * 0.35); x.bezierCurveTo(-r * 1.1, -r * 0.45, -r * 0.55, -r * 1.15, 0, -r * 0.5); x.bezierCurveTo(r * 0.55, -r * 1.15, r * 1.1, -r * 0.45, 0, r * 0.35); x.closePath() }
  path(); x.lineWidth = Math.max(3, r * 0.16); x.strokeStyle = outline; x.lineJoin = 'round'; x.stroke(); x.fillStyle = color; x.fill()
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.ellipse(-r * 0.35, -r * 0.55, r * 0.14, r * 0.09, -0.6, 0, TAU); x.fill()
  x.restore()
}
/** a ring burst of pixel sparkles from t0 */
export function sparkleBurst(x, t, cx, cy, t0, { n = 12, R = 220, life = 0.9, cols = [GOLD, ROSE, BONE, VCOL], size = 26, seed = 1 } = {}) {
  const a = t - t0
  if (a < 0 || a > life) return
  const q = ease.outCubic(a / life)
  x.save()
  for (let k = 0; k < n; k++) {
    const ang = (k / n) * TAU + fr(k, seed) * 0.5, rr = R * q * (0.6 + 0.4 * fr(k, seed + 3))
    x.globalAlpha = 1 - a / life
    drawPixelStar(x, cx + Math.cos(ang) * rr, cy + Math.sin(ang) * rr, size * (1 - 0.5 * q), 1 + (k % 2), cols[k % cols.length])
  }
  x.restore()
}
/** falling glitter in an area (ambient) */
export function glitterRain(x, t, { x0 = 0, x1 = 1080, y0 = -40, y1 = 1960, n = 26, speed = 160, alpha = 1, seed = 4 } = {}) {
  if (alpha <= 0.01) return
  x.save()
  for (let k = 0; k < n; k++) {
    const px = x0 + fr(k, seed) * (x1 - x0) + Math.sin(t * 1.5 + k) * 16
    const py = y0 + (((fr(k, seed + 1) * (y1 - y0)) + t * speed * (0.6 + fr(k, seed + 2) * 0.8)) % (y1 - y0))
    x.globalAlpha = alpha * (0.5 + 0.5 * Math.sin(t * 6 + k))
    drawPixelStar(x, px, py, 12 + 10 * fr(k, seed + 5), 1, [GOLD, ROSE, BONE][k % 3])
  }
  x.restore()
}
/** a phone (dark glass) with chat bubbles: msgs [{ at, side: 'L'|'R', text, color? }] */
export function phone(x, t, { cx, cy, w = 560, h = 860, title = '', msgs = [], s = 1, alpha = 1, rot = 0, font = 34, typing = null } = {}) {
  if (alpha <= 0.01 || s <= 0.01) return
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.roundRect(-w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 64); x.fill()
  x.fillStyle = '#140c30'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 52); x.fill()
  x.fillStyle = '#231a4e'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, 110, [52, 52, 0, 0]); x.fill()
  x.fillStyle = INK; x.beginPath(); x.roundRect(-60, -h / 2 + 14, 120, 26, 13); x.fill()
  txt(x, title, 0, -h / 2 + 74, { size: 30, color: BONE, weight: 700 })
  x.save(); x.beginPath(); x.rect(-w / 2, -h / 2 + 110, w, h - 110); x.clip()
  x.font = `600 ${font}px ${INTER}`
  const maxW = w * 0.74, pad = 20, lh = font * 1.25, gap = 16
  const lay = msgs.filter(m => t >= m.at).map(m => {
    const words = m.text.split(' '), lines = []; let cur = ''
    for (const wd of words) { const tr = cur ? cur + ' ' + wd : wd; if (x.measureText(tr).width > maxW - 2 * pad && cur) { lines.push(cur); cur = wd } else cur = tr }
    lines.push(cur)
    const bw = Math.min(maxW, Math.max(...lines.map(l => x.measureText(l).width)) + 2 * pad)
    return { ...m, lines, bw, bh: lines.length * lh + pad * 1.2 }
  })
  const typingOn = typing && t >= typing[0] && t < typing[1]
  let H = lay.reduce((a, m) => a + m.bh + gap, 0) + (typingOn ? 80 : 0)
  if (lay.length) { const lm = lay[lay.length - 1]; H -= (lm.bh + gap) * (1 - ease.outCubic(prog(t, lm.at, lm.at + 0.2))) }
  let y = h / 2 - 26 - H
  for (const m of lay) {
    const k = pop01(t, m.at, 0.22, 2.2)
    const bx = m.side === 'L' ? -w / 2 + 22 : w / 2 - 22 - m.bw
    x.save(); x.translate(bx + (m.side === 'L' ? 0 : m.bw), y); x.scale(k, k); x.translate(-(m.side === 'L' ? 0 : m.bw), 0)
    x.fillStyle = m.color || (m.side === 'L' ? '#3a2d74' : '#e9739b'); x.beginPath(); x.roundRect(0, 0, m.bw, m.bh, 26); x.fill()
    x.fillStyle = m.side === 'L' ? BONE : '#fff'; x.textAlign = 'left'; x.textBaseline = 'alphabetic'; x.font = `600 ${font}px ${INTER}`
    m.lines.forEach((l, j) => x.fillText(l, pad, pad * 0.6 + lh * (j + 0.8)))
    x.restore()
    y += m.bh + gap
  }
  if (typingOn) { for (let k = 0; k < 3; k++) { x.fillStyle = BONE; x.globalAlpha = 0.4 + 0.6 * Math.max(0, Math.sin(t * 9 - k)); x.beginPath(); x.arc(-w / 2 + 52 + k * 30, y + 34, 9, 0, TAU); x.fill() } x.globalAlpha = 1 }
  x.restore()
  x.restore()
}

// ─────────────────────────────────────────────── Venus's extras + Pisces's sash
function wrongWayRing(x, t, P, alpha = 1) {
  if (alpha <= 0.01) return
  const R = P.size * 0.66
  x.save()
  for (let k = 0; k < 9; k++) {
    const a = -t * 1.1 + (k / 9) * TAU                 // counter-clockwise: the wrong way, darling
    const px = P.x + Math.cos(a) * R, py = P.y + Math.sin(a) * R * 0.32 + P.size * 0.05
    const front = Math.sin(a) > 0
    x.globalAlpha = alpha * (front ? 0.95 : 0.45)
    drawPixelStar(x, px, py, (front ? 26 : 16) * (0.8 + 0.2 * Math.sin(t * 5 + k)), 1 + (k % 2), k % 3 ? ROSE : GOLD)
  }
  x.restore()
}
function sash(x, cx, cy, size, t) {
  x.save(); x.translate(cx + size * 0.06, cy + size * 0.4); x.rotate(-0.26)
  const w = size * 0.86, h = size * 0.13
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = ROSE; x.fillRect(-w / 2, -h / 2, w, h)
  x.fillStyle = INK; x.font = `800 ${Math.round(h * 0.62)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('♀ FAN CLUB', 0, 1)
  x.restore()
  void t
}

// ─────────────────────────────────────────────── the episode
const FX = {
  slamTitle: [HK.slamTitle, HK.slamTitleCues], whipZoom: [HK.whipZoom, HK.whipZoomCues], recordScratch: [HK.recordScratch, HK.recordScratchCues],
  screenShake: [HK.screenShake, HK.shakeCues], caught: [HK.caught, HK.caughtCues], notification: [HK.notification, HK.notificationCues],
  loadingBar: [HK.loadingBar, HK.loadingBarCues], countdown: [HK.countdown, HK.countdownCues], gameHud: [HK.gameHud, HK.gameHudCues],
  achievement: [HK.achievement, HK.achievementCues], chapter: [HK.chapter, HK.chapterCues], glitch: [HK.glitch, HK.glitchCues],
  incomingCall: [HK.incomingCall, HK.incomingCallCues], newsDesk: [HK.newsDesk, HK.newsDeskCues],
}
const BUB = { venus: { x: 540, y: 1060, tail: 0, tailUp: true }, sign: { x: 560, y: 1660, tail: -40, tailUp: true }, pisces: { x: 640, y: 1720, tail: 160, tailUp: true } }

export function episode(S) {
  const DURATION = S.dur
  const bubbles = (S.bubbles || []).map(b => {
    const role = b.who === 'venus' ? 'venus' : b.who === 'pisces' && S.sign !== 'pisces' ? 'pisces' : 'sign'
    const up = b.tailUp ?? (role === 'venus' ? (b.y === undefined || b.y > 800) : true)   // a bubble above Venus points down at her
    return { size: 52, maxW: 780, cps: 30, ...BUB[role], ...b, tailUp: up }
  })
  const hopsOf = who => bubbles.filter(b => b.who === who).flatMap(b => {
    const len = String(b.text).replace(/\*/g, '').length / (b.cps || 30)
    return Array.from({ length: Math.max(1, Math.floor(len / 0.55)) }, (_, i) => b.t0 + 0.08 + i * 0.55)
  })
  const vHops = hopsOf('venus'), sHops = hopsOf(S.sign), pHops = S.sign === 'pisces' ? sHops : hopsOf('pisces')
  const vLines = bubbles.filter(b => b.who === 'venus').map(b => ({ t: b.t0 + 0.08, who: 'venus', text: b.text }))
  const fx = (S.fx || []).map(([name, o]) => ({ name, o }))
  const recs = fx.filter(f => f.name === 'recordScratch').map(f => f.o)
  const IN = S.enter

  async function build(stage) {
    const root = fill(stage, { background: '#0a0520' })
    try { await Promise.all(['800 60px Inter', '700 40px Inter', "italic 600 60px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
    const cv = layerCanvas(root), x = cv.getContext('2d')
    const bug = el('div', { position: 'absolute', left: '60px', top: '64px', font: `800 30px ${INTER}`, letterSpacing: '0.26em', color: GOLD, textShadow: '0 2px 12px rgba(6,4,18,0.95)', whiteSpace: 'nowrap', opacity: '0' }, root,
      `PLANET&nbsp;TALK<span style="color:${ROSE}"> · ♀︎&nbsp;VENUS</span>`)
    const gx = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }).getContext('2d')
    return {
      start: 0, end: DURATION + 1, root,
      update(t) {
        drawSpace(x, t, { planet: 'venus', tint: '#ff8fb1', seed: 3, horizon: { y: 1640, color: '#2a1440', rim: ROSE }, ...(S.space || {}) })
        const land = IN ? entrance(IN.kind, 0, IN).land : -1
        const v = track(S.venus, t) || { x: 540, y: 640, size: 470, mood: 'love' }
        let VP = { ...v }
        if (IN && t < land + 0.02) { const E = entrance(IN.kind, t, IN); VP = { ...v, x: E.x, y: E.y, size: E.size, rot: (v.rot || 0) + E.rot, squash: E.squash, alpha: E.alpha } }
        else if (IN) { const E = entrance(IN.kind, t, IN); VP.squash = E.squash }
        const sg = track(S.signK, t) || { x: 540, y: 1350, size: 300, mood: 'wide' }
        const ps = track(S.pisK, t)
        const ST = { venus: VP, sign: sg, pis: ps, land }
        S.back && S.back(x, t, ST)
        // Venus
        if (IN) drawEntranceFx(x, 'venus', IN.kind, t, IN)
        if (t < land + 0.5 && IN) glitterRain(x, t, { n: 18, alpha: 1 - prog(t, land, land + 0.5), speed: 900 })
        const vAlpha = VP.alpha ?? 1
        wrongWayRing(x, t, VP, vAlpha * (VP.ring ?? 1))
        if (vAlpha > 0.01) drawPlanet(x, 'venus', VP.x, VP.y, VP.size, t, { mood: VP.mood || 'love', look: VP.look, rot: VP.rot || 0, squash: VP.squash || 0, alpha: vAlpha, lines: vLines, cps: 30, hops: vHops, tears: VP.tears || 0, seed: 5 })
        S.mid && S.mid(x, t, ST)
        // the sign (Pisces's own episode: the sign IS Pisces, always crying a bit)
        const isP = S.sign === 'pisces'
        if ((sg.alpha ?? 1) > 0.01) {
          drawSign(x, S.sign, sg.x, sg.y, sg.size, t, { mood: sg.mood, look: sg.look, hops: sHops, squash: sg.squash || 0, alpha: sg.alpha ?? 1, tears: isP ? Math.max(1, sg.tears || 0) : (sg.tears || 0), seed: 9, shadow: true })
          if (isP) sash(x, sg.x, sg.y, sg.size, t)
        }
        if (ps && !isP && (ps.alpha ?? 1) > 0.01) {
          drawSign(x, 'pisces', ps.x, ps.y, ps.size, t, { mood: ps.mood || 'sparkle', look: ps.look, hops: pHops, alpha: ps.alpha ?? 1, tears: Math.max(1, ps.tears ?? 2), seed: 6, glyph: false })
          sash(x, ps.x, ps.y, ps.size, t)
        }
        S.front && S.front(x, t, ST)
        for (const b of bubbles) speech(x, t, b)
        bug.style.opacity = String(clamp(prog(t, S.bugAt ?? 0.15, (S.bugAt ?? 0.15) + 0.3)))
        drawGrain(gx, t)
      },
    }
  }

  const MAIN = recs.length ? HK.frozen(build, recs) : build
  const builders = fx.map(f => FX[f.name][0](f.o))
  const SCENES = [MAIN, ...builders]
  if (S.ending === 'loop') {
    const f0 = S.frame0 ? S.frame0.map(i => builders[i]) : fx.map((f, i) => [f, i]).filter(([f]) => (f.o.at ?? 0) < 0.05 && f.name !== 'recordScratch').map(([, i]) => builders[i])
    SCENES.push(HK.loopBack([MAIN, ...f0], { duration: DURATION, len: S.loopLen ?? 0.4 }))
  }
  const CUES = [
    ...(IN ? entranceCues(IN.kind, IN) : []),
    ...fx.flatMap(f => FX[f.name][1](f.o)),
    ...speechCues(bubbles.map(b => ({ ...b, who: b.who }))),
    ...(S.cues || []),
    ...(S.ending === 'loop' ? HK.loopCues({ duration: DURATION, len: S.loopLen ?? 0.4 }) : []),
  ].filter(c => c[1] >= 0 && c[1] < DURATION)
  return { DURATION, SCENES, CUES }
}

/** Pisces's happy-sob sound */
export const sobCues = (t0, n = 3) => Array.from({ length: n }, (_, i) => ['pluck', +(t0 + i * 0.16).toFixed(3), [783.99, 698.46, 659.25, 587.33][i % 4], 0.03, 0.5, 0.35])
