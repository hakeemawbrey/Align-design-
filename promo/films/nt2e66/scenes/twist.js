// PLOT TWIST: the format of Star Talk Trends Vol. 2, episodes 66–70 (nt2e66–nt2e70; rows in promo/films/next30/b14.md).
// Built on ../../nt2e61/scenes/t2kit.js. A dating dread plays out in cold, dramatic blue: the hook (the setup), beat 1 and
// beat 2 (the spiral). At 7.6 the screen slams "PLOT *TWIST*" (a red flash, a zoom punch, a boom) and beat 3 is the warm,
// wholesome reveal. Then THE STARS' last line; Pisces sobs happily ("aww.").
//
//   makeTwist(cfg) → makeT2 result. cfg = makeT2 cfg (minus bug / bg), plus:
//     cfg.hookText: the setup headline (it leaves at the slam)  · cfg.room(x, t, warm): the backdrop (default drawStage)
// Props: drawStage, chatPhone, clockFace, thought, slamTimes.
import { makeT2, el, R, box, label, shadow, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, INTER, SERIF, MONO, T } from '../../nt2e61/scenes/t2kit.js'
export * from '../../nt2e61/scenes/t2kit.js'
export { couch, door, table, mug, rug, sfx, plant } from '../../nt2e61/scenes/house.js'

export const SLAM = 7.6, SLAM_OUT = [8.75, 9.0]

// ── a generic interior: a wall, a floor, a window (cold or warm light)
export function drawStage(x, t, { warm = 0, wall = '#2a2448', floor = '#3a2f52', floorY = 1180, window: win = true } = {}) {
  R(x, wall, 0, 0, 1080, floorY)
  for (let i = 0; i < 1080; i += 90) R(x, 'rgba(255,255,255,0.03)', i, 0, 44, floorY)
  R(x, INK, 0, floorY, 1080, 8); R(x, floor, 0, floorY + 8, 1080, 1920 - floorY)
  for (let j = floorY + 70; j < 1920; j += 90) R(x, 'rgba(0,0,0,0.2)', 0, j, 1080, 5)
  if (win) {
    const wx = 640, wy = 430, ww = 300, wh = 340
    box(x, wx, wy, ww, wh, warm ? '#ffcf8a' : '#141a3e', { b: 10 })
    if (!warm) for (let i = 0; i < 10; i++) R(x, `rgba(220,230,255,${0.3 + 0.4 * Math.abs(Math.sin(t * 2 + i))})`, wx + 20 + (i * 67) % (ww - 40), wy + 20 + (i * 41) % (wh - 40), 5, 5)
    else { x.fillStyle = '#fff1c8'; x.beginPath(); x.arc(wx + 200, wy + 110, 46, 0, Math.PI * 2); x.fill() }
    R(x, INK, wx + ww / 2 - 5, wy, 10, wh); R(x, INK, wx, wy + wh / 2 - 5, ww, 10)
  }
}

// cold, dramatic grade (beats before the twist) or warm glow (after): drawn over the scene, under the captions
export function grade(x, t, warm) {
  x.save()
  if (!warm) {
    x.globalCompositeOperation = 'multiply'; x.fillStyle = 'rgba(120,140,220,1)'; x.globalAlpha = 0.55; x.fillRect(0, 0, 1080, 1920)
    x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1
    const g = x.createRadialGradient(540, 900, 300, 540, 900, 1100); g.addColorStop(0, 'rgba(4,4,20,0)'); g.addColorStop(1, 'rgba(4,4,20,0.75)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
    // a slow rain-on-glass streak, for drama
    for (let i = 0; i < 14; i++) { const ph = (t * 0.35 + i * 0.137) % 1; R(x, 'rgba(180,200,255,0.10)', (i * 83) % 1080, ph * 1920 - 120, 3, 120) }
  } else {
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(540, 860, 60, 540, 860, 900); g.addColorStop(0, 'rgba(255,190,120,0.22)'); g.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  }
  x.restore()
}

// ── a big phone with chat bubbles ([{ me, text, at }]) and an optional typing indicator
export function chatPhone(x, t, cx, cy, msgs, { s = 1, rot = 0, typing = false, name = '', call = 0 } = {}) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s)
  box(x, -170, -300, 340, 600, '#2a2148', { b: 8 })
  R(x, '#120e26', -150, -270, 300, 540)
  R(x, '#1e1840', -150, -270, 300, 56)
  x.font = `800 26px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(name, 0, -242)
  let y = -190
  for (const m of msgs) {
    if (m.at !== undefined && t < m.at) continue
    const k = m.at !== undefined ? pop01(t, m.at, 0.22, 2.4) : 1
    x.font = `700 ${m.size || 24}px ${INTER}`
    const lines = m.text.split('\n'), w = Math.min(250, Math.max(...lines.map(l => x.measureText(l).width)) + 34), h = lines.length * 32 + 22
    const bx = m.me ? 140 - w : -140
    x.save(); x.translate(bx + (m.me ? w : 0), y); x.scale(k, k); x.translate(-(m.me ? w : 0), 0)
    R(x, m.me ? '#7fd0ff' : '#efe6d6', 0, 0, w, h)
    x.fillStyle = INK; x.textAlign = 'left'; x.textBaseline = 'top'
    lines.forEach((l, i) => x.fillText(l, 17, 13 + i * 32))
    x.restore()
    y += h + 16
  }
  if (typing) {
    R(x, '#efe6d6', -140, y, 96, 46)
    for (let i = 0; i < 3; i++) { const b = Math.max(0, Math.sin(t * 8 - i * 0.9)); R(x, INK, -124 + i * 26, y + 16 - b * 7, 14, 14) }
  }
  if (call > 0) {
    x.globalAlpha = clamp(call)
    R(x, '#1d6b4a', -150, -270, 300, 540)
    x.font = `800 30px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('INCOMING', 0, -150); x.fillText('CALL', 0, -110); x.font = `800 40px ${INTER}`; x.fillText(name, 0, -20)
    const r = 1 + 0.12 * Math.sin(t * 14)
    x.save(); x.translate(0, 160); x.scale(r, r); x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 52, 0, Math.PI * 2); x.fill(); x.fillStyle = '#3fd07a'; x.beginPath(); x.arc(0, 0, 44, 0, Math.PI * 2); x.fill(); x.restore()
    x.globalAlpha = 1
  }
  x.restore()
}

// ── a wall clock: minutes past the hour (m), ticking
export function clockFace(x, cx, cy, r, m, { col = BONE } = {}) {
  x.save(); x.translate(cx, cy)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 10, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; R(x, INK, Math.cos(a) * r * 0.8 - 4, Math.sin(a) * r * 0.8 - 4, 8, 8) }
  const am = (m / 60) * Math.PI * 2 - Math.PI / 2, ah = ((7 + m / 60) / 12) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'square'
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * r * 0.5, Math.sin(ah) * r * 0.5); x.stroke()
  x.lineWidth = 7; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * r * 0.78, Math.sin(am) * r * 0.78); x.stroke()
  R(x, RED, -7, -7, 14, 14)
  x.restore()
}

// ── a thought cloud with a short line in it
export function thought(x, t, cx, cy, text, t0, t1, { size = 34, col = BONE, from = null } = {}) {
  const k = pop01(t, t0, 0.3, 2.2) * outK(t, [t1 - 0.15, t1])
  if (k <= 0.01 || t < t0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.font = `800 ${size}px ${INTER}`
  const w = x.measureText(text).width + 70, h = size + 60
  x.fillStyle = INK
  for (const [dx, dy, r] of [[-w / 2 + 20, 0, h / 2 + 6], [w / 2 - 20, 0, h / 2 + 6], [0, -h / 4, h / 2 + 10], [-w / 4, h / 5, h / 2], [w / 4, h / 5, h / 2]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  R(x, INK, -w / 2 + 10, -h / 2 - 4, w - 20, h + 8)
  x.fillStyle = col
  for (const [dx, dy, r] of [[-w / 2 + 20, 0, h / 2], [w / 2 - 20, 0, h / 2], [0, -h / 4, h / 2 + 4], [-w / 4, h / 5, h / 2 - 6], [w / 4, h / 5, h / 2 - 6]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
  R(x, col, -w / 2 + 14, -h / 2 + 2, w - 28, h - 4)
  if (from) { const [fx, fy] = from; for (let i = 1; i <= 2; i++) { const px = lerp(0, fx - cx, i / 3), py = lerp(h / 2, fy - cy, i / 3), r = 16 - i * 4; x.fillStyle = INK; x.beginPath(); x.arc(px, py, r + 4, 0, Math.PI * 2); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(px, py, r, 0, Math.PI * 2); x.fill() } }
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

// ── the slam (DOM): "PLOT TWIST" in huge Inter 800 + Garamond italic, red flash, held ~1.15 s
function buildSlam(root) {
  const wrap = el('div', { position: 'absolute', left: '0', top: '560px', width: '1080px', display: 'none', justifyContent: 'center', pointerEvents: 'none' }, root)
  const inner = el('div', { textAlign: 'center', lineHeight: '0.9', transformOrigin: '50% 50%' }, wrap)
  el('div', { font: `800 190px ${INTER}`, letterSpacing: '-0.03em', color: BONE, textShadow: `0 10px 0 ${INK}, 0 0 40px rgba(232,52,78,0.8)` }, inner, 'PLOT')
  el('div', { font: `italic 500 250px ${SERIF}`, color: '#ff5c7a', textShadow: `0 10px 0 ${INK}, 0 0 50px rgba(255,92,122,0.8)` }, inner, 'twist')
  const red = el('div', { position: 'absolute', inset: 0, background: '#e8344e', opacity: 0, pointerEvents: 'none', mixBlendMode: 'screen' }, root)
  return {
    update(t) {
      const on = t >= SLAM && t < SLAM_OUT[1]
      wrap.style.display = on ? 'flex' : 'none'
      red.style.opacity = String(t >= SLAM && t < SLAM + 0.35 ? 0.55 * (1 - (t - SLAM) / 0.35) : 0)
      if (!on) return
      const p = prog(t, SLAM, SLAM + 0.16), o = outK(t, SLAM_OUT)
      const sh = 14 * Math.exp(-(t - SLAM) * 7) * Math.sin((t - SLAM) * 55)
      inner.style.transform = `translate(${sh.toFixed(1)}px, ${(-sh * 0.6).toFixed(1)}px) rotate(-4deg) scale(${(lerp(2.6, 1, ease.outCubic(p)) * lerp(0.6, 1, o)).toFixed(4)})`
      inner.style.opacity = String(clamp(p * 3) * o)
    },
  }
}

export function makeTwist(cfg) {
  const room = cfg.room || ((x, t, warm) => drawStage(x, t, { warm }))
  const tells = cfg.tells.map((tl, i) => ({
    stickerAt: i === 2 ? 1.3 : 0.35, ...tl,
    draw(x, t, S) {
      if (i === 2 && S.u < 1.15) {                       // under the slam: the cold scene zooms in hard
        const z = 1 + 0.4 * ease.inCubic(prog(S.u, 0, 1.15))
        x.save(); x.translate(540, 900); x.scale(z, z); x.translate(-540, -900)
        if (cfg.slamScene) cfg.slamScene(x, t, S); else room(x, t, 0)
        x.restore(); grade(x, t, 0)
        return
      }
      tl.draw(x, t, S); grade(x, t, i === 2 ? 1 : 0)
    },
  }))
  return makeT2({
    bug: ['PLOT', 'TWIST'],
    stamp: null, score: 'aww.',
    flashes: [T.tells[0][0], T.tells[1][0]],
    hookOut: t => (t < SLAM - 0.05 ? 1 : 0),
    hookSize: 74, hookAccent: 104,
    ...cfg,
    tells,
    bg(x, t, S) { room(x, t, S.phase === 'finale' ? 1 : 0) },
    hook(x, t, S) { cfg.hook(x, t, S); grade(x, t, 0) },
    finale: cfg.finale ? (x, t, S) => { cfg.finale(x, t, S); grade(x, t, 1) } : undefined,
    dom(root) { const s = buildSlam(root); return { update: t => s.update(t) } },
    cues: [['whoosh', SLAM - 0.35, 0.35, 0.05], ['boom', SLAM, 0.4], ['tom', SLAM, 70, { gain: 0.35, decay: 0.4 }], ['tick', SLAM, 0.08], ['tom', SLAM + 0.18, 58, { gain: 0.25, decay: 0.4 }],
      ['bell', SLAM + 1.2, 1760, 0.03, 1.4, 0], ['glitter', SLAM + 1.2, SLAM + 1.7], ...(cfg.cues || [])],
  })
}
void [label, shadow, GOLD, PINK, MONO]
