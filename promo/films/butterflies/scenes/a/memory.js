// butterflies · THEN: the memory shots, painted like old warm film stock — golden grade, halation, light leaks, gate
// weave, flicker, dust and the odd scratch, a soft rounded gate. Every shot breathes with a heartbeat.
//   m1  her (juniper), golden, a held look, slow push               "Remember butterflies?"
//   m2  the passed note on a sunlit desk: "do you like me?" ☐ yes ☐ no — the pencil ticks yes, a doodled heart
//   m3  her smile, close; the heart races; the frame burns out gold
import { clamp, lerp, prog, ease, rng, noise1 } from '../../../../src/lib.js'
import { IMG, SERIF } from '../../../../src/scenes/common.js'
import { T, W, H, cnv, loadImage, heart, smooth } from './shared.js'

const JW = 720, JH = 960
const FACE = { x: 352, y: 545 }      // her face in juniper.jpg

/** golden film grade of a photo (+ a pre-blurred halation copy) */
function gradeWarm(im, w, h) {
  const c = cnv(w, h), x = c.getContext('2d')
  x.filter = 'sepia(0.62) saturate(1.35) contrast(1.06) brightness(1.04)'
  if (im) x.drawImage(im, 0, 0, w, h)
  x.filter = 'none'
  x.globalCompositeOperation = 'soft-light'; x.fillStyle = 'rgba(236,150,60,0.4)'; x.fillRect(0, 0, w, h)
  // the aura haze calmed: the far background pulled down toward warm umber, she stays bright
  x.globalCompositeOperation = 'multiply'
  const dg = x.createRadialGradient(w * 0.49, h * 0.6, w * 0.18, w * 0.49, h * 0.6, w * 0.78)
  dg.addColorStop(0, 'rgba(255,255,255,1)'); dg.addColorStop(1, 'rgba(120,70,40,1)')
  x.fillStyle = dg; x.fillRect(0, 0, w, h)
  // lifted blacks (old print)
  x.globalCompositeOperation = 'lighten'; x.fillStyle = 'rgb(28,15,8)'; x.fillRect(0, 0, w, h)
  // feather every edge so the print never shows a hard rectangle
  x.globalCompositeOperation = 'destination-in'
  const fm = x.createRadialGradient(w * 0.49, h * 0.56, w * 0.3, w * 0.49, h * 0.56, w * 0.66)
  fm.addColorStop(0, 'rgba(0,0,0,1)'); fm.addColorStop(1, 'rgba(0,0,0,0)')
  x.fillStyle = fm; x.fillRect(0, 0, w, h)
  x.globalCompositeOperation = 'source-over'
  const halo = cnv(w / 2, h / 2), hx = halo.getContext('2d')
  hx.filter = 'blur(14px) brightness(1.1) saturate(1.3)'; hx.drawImage(c, 0, 0, w / 2, h / 2)
  return { c, halo }
}

export async function prepMemory() {
  const jun = await loadImage(`${IMG}juniper.jpg`)
  const J = gradeWarm(jun, JW, JH)

  // ── the note: warm lined paper with a fold, drawn once (the writing is drawn live, as it's written)
  const NW = 1040, NH = 700
  const paper = cnv(NW, NH), px = paper.getContext('2d')
  {
    const r = rng(41)
    const g = px.createLinearGradient(0, 0, NW, NH)
    g.addColorStop(0, '#f3e4c2'); g.addColorStop(0.55, '#ecd9b2'); g.addColorStop(1, '#dfc79b')
    px.fillStyle = g; px.fillRect(0, 0, NW, NH)
    // paper tooth
    for (let i = 0; i < 9000; i++) { px.fillStyle = `rgba(${r() < 0.5 ? '120,90,50' : '255,250,235'},${(0.03 + r() * 0.05).toFixed(3)})`; px.fillRect(r() * NW, r() * NH, 1 + r() * 2, 1 + r() * 2) }
    // faded blue rules + the red margin
    for (let y = 120; y < NH; y += 62) { px.fillStyle = 'rgba(96,128,170,0.32)'; px.fillRect(0, y, NW, 2) }
    px.fillStyle = 'rgba(196,84,72,0.42)'; px.fillRect(120, 0, 2.5, NH)
    // the fold: one crease down the middle, a second across (it was folded tiny to pass)
    const crease = (x0, y0, x1, y1, vert) => {
      const cg = vert ? px.createLinearGradient(x0 - 26, 0, x0 + 26, 0) : px.createLinearGradient(0, y0 - 26, 0, y0 + 26)
      cg.addColorStop(0, 'rgba(90,60,30,0)'); cg.addColorStop(0.48, 'rgba(90,60,30,0.16)'); cg.addColorStop(0.5, 'rgba(255,248,230,0.4)'); cg.addColorStop(0.56, 'rgba(90,60,30,0.07)'); cg.addColorStop(1, 'rgba(90,60,30,0)')
      px.fillStyle = cg; vert ? px.fillRect(x0 - 26, 0, 52, NH) : px.fillRect(0, y0 - 26, NW, 52)
    }
    crease(NW * 0.5, 0, 0, 0, true); crease(0, NH * 0.47, 0, 0, false)
    // torn top edge: ragged notebook holes side, darkened edges
    const eg = px.createRadialGradient(NW / 2, NH / 2, NH * 0.35, NW / 2, NH / 2, NW * 0.68)
    eg.addColorStop(0, 'rgba(120,80,40,0)'); eg.addColorStop(1, 'rgba(120,80,40,0.32)')
    px.fillStyle = eg; px.fillRect(0, 0, NW, NH)
  }
  // a wobbly hand-drawn path helper (deterministic)
  const wobble = (pts, seed, amp = 2.2) => { const r = rng(seed); return pts.map(([x, y]) => [x + (r() - 0.5) * amp, y + (r() - 0.5) * amp]) }
  const boxPath = (x, y, s, seed) => {
    const pts = []
    const corners = [[x, y], [x + s, y + 2], [x + s - 2, y + s], [x + 1, y + s - 1], [x + 3, y - 2]]
    for (let i = 0; i < corners.length - 1; i++) for (let k = 0; k < 10; k++) pts.push([lerp(corners[i][0], corners[i + 1][0], k / 10), lerp(corners[i][1], corners[i + 1][1], k / 10)])
    return wobble(pts, seed, 2.4)
  }
  const tick = (() => { const pts = []; for (let k = 0; k <= 14; k++) pts.push([lerp(0, 26, k / 14), lerp(0, 30, ease.outQuad(k / 14))]); for (let k = 1; k <= 26; k++) pts.push([lerp(26, 82, k / 26), lerp(30, -52, ease.inQuad(k / 26))]); return wobble(pts, 9, 1.6) })()
  const heartPts = (() => { const pts = []; for (let k = 0; k <= 60; k++) { const a = (k / 60) * Math.PI * 2; pts.push([16 * Math.pow(Math.sin(a), 3), -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a))]) } return wobble(pts, 77, 0.6) })()
  const BOX_YES = boxPath(0, 0, 64, 3), BOX_NO = boxPath(0, 0, 64, 5)

  // the desk: sunlit warm wood, out of focus (drawn once)
  const desk = cnv(W, H), dx = desk.getContext('2d')
  {
    const r = rng(12)
    const g = dx.createLinearGradient(0, 0, W, H)
    g.addColorStop(0, '#6b3f1c'); g.addColorStop(0.5, '#4a2a12'); g.addColorStop(1, '#2a160a')
    dx.fillStyle = g; dx.fillRect(0, 0, W, H)
    dx.filter = 'blur(10px)'
    for (let i = 0; i < 60; i++) { const y = r() * H; dx.fillStyle = `rgba(${r() < 0.5 ? '30,14,4' : '150,90,40'},${(0.06 + r() * 0.1).toFixed(3)})`; dx.fillRect(-50, y, W + 100, 3 + r() * 16) }
    dx.filter = 'none'
    // late-afternoon sun through blinds: soft diagonal bands
    dx.save(); dx.translate(W * 0.6, -100); dx.rotate(0.5)
    for (let i = 0; i < 6; i++) { const bg = dx.createLinearGradient(0, i * 210, 0, i * 210 + 120); bg.addColorStop(0, 'rgba(255,190,100,0)'); bg.addColorStop(0.5, 'rgba(255,190,100,0.16)'); bg.addColorStop(1, 'rgba(255,190,100,0)'); dx.fillStyle = bg; dx.fillRect(-1600, i * 210, 3200, 120) }
    dx.restore()
  }

  // ── film texture: gate weave, flicker, dust, scratches, leaks, vignette, rounded gate
  function weave(t) { const f = Math.round(t * 30); return [(noise1(f * 0.37, 5) - 0.5) * 7, (noise1(f * 0.41, 6) - 0.5) * 9] }
  function leaks(ctx, t, k) {
    ctx.save(); ctx.globalCompositeOperation = 'screen'
    const a = noise1(t * 0.35, 21), b = noise1(t * 0.27, 22)
    const L = [[lerp(-200, 520, a), lerp(120, 760, b), 760, '255,128,40', 0.42], [lerp(1500, 2050, b), lerp(-80, 420, a), 640, '255,70,50', 0.3], [lerp(800, 1300, noise1(t * 0.2, 23)), 1180, 520, '255,190,90', 0.2]]
    for (const [x, y, R, c, al] of L) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, R)
      g.addColorStop(0, `rgba(${c},${(al * k).toFixed(3)})`); g.addColorStop(1, `rgba(${c},0)`)
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H)
    }
    ctx.restore()
  }
  function filmFX(ctx, t, { leak = 1, pulse = 0 } = {}) {
    const f = Math.round(t * 30), r = rng(f * 131 + 7)
    leaks(ctx, t, leak * (1 + 0.6 * pulse))
    // warm haze over everything
    ctx.save(); ctx.globalCompositeOperation = 'soft-light'; ctx.fillStyle = 'rgba(240,170,80,0.22)'; ctx.fillRect(0, 0, W, H); ctx.restore()
    // flicker (exposure jitter) + the heartbeat's warm swell
    const fl = (r() - 0.5) * 0.07
    ctx.save()
    if (fl > 0) { ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = `rgba(255,214,160,${fl.toFixed(3)})` } else { ctx.fillStyle = `rgba(20,10,4,${(-fl).toFixed(3)})` }
    ctx.fillRect(0, 0, W, H)
    if (pulse > 0) { ctx.globalCompositeOperation = 'screen'; ctx.fillStyle = `rgba(255,170,90,${(0.1 * pulse).toFixed(3)})`; ctx.fillRect(0, 0, W, H) }
    ctx.restore()
    // dust: dark specks and a few bright ones; a hair now and then; a scratch now and then
    ctx.save()
    const n = 6 + Math.floor(r() * 10)
    for (let i = 0; i < n; i++) {
      const x = r() * W, y = r() * H, s = 1.5 + r() * 4.5, br = r() < 0.25
      ctx.fillStyle = br ? 'rgba(255,236,200,0.55)' : 'rgba(26,14,6,0.6)'
      ctx.beginPath(); ctx.ellipse(x, y, s, s * (0.5 + r() * 0.6), r() * 3, 0, Math.PI * 2); ctx.fill()
    }
    if (r() < 0.22) {      // a hair
      const x = r() * W, y = r() * H
      ctx.strokeStyle = 'rgba(24,12,6,0.5)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(x, y)
      ctx.bezierCurveTo(x + 30 * (r() - 0.5) * 4, y + 40 * r(), x + 60 * (r() - 0.5) * 3, y + 80 * r(), x + 40 * (r() - 0.5) * 4, y + 120 * r()); ctx.stroke()
    }
    const sx = 300 + noise1(f * 0.05, 31) * 1300
    if (noise1(f * 0.11, 32) > 0.55) { ctx.fillStyle = 'rgba(255,230,190,0.18)'; ctx.fillRect(sx, 0, 1.6, H) }
    ctx.restore()
    // vignette (warm brown) + the rounded gate
    const vg = ctx.createRadialGradient(W / 2, H / 2, 380, W / 2, H / 2, 1160)
    vg.addColorStop(0, 'rgba(30,14,4,0)'); vg.addColorStop(0.7, 'rgba(30,14,4,0.25)'); vg.addColorStop(1, 'rgba(12,5,1,0.82)')
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H)
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H)
    const m = 14, rr = 60; ctx.moveTo(m + rr, m); ctx.arcTo(W - m, m, W - m, H - m, rr); ctx.arcTo(W - m, H - m, m, H - m, rr); ctx.arcTo(m, H - m, m, m, rr); ctx.arcTo(m, m, W - m, m, rr); ctx.closePath()
    ctx.fillStyle = 'rgba(8,4,2,0.92)'; ctx.filter = 'blur(6px)'; ctx.fill('evenodd'); ctx.restore()
  }

  /** a graded photo drawn so that image point (ix, iy) lands at screen (sx, sy), image px → k screen px */
  function photo(ctx, P, ix, iy, sx, sy, k, w = JW, h = JH, halo = 0.22) {
    const x0 = sx - ix * k, y0 = sy - iy * k
    ctx.drawImage(P.c, x0, y0, w * k, h * k)
    ctx.save(); ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = halo; ctx.drawImage(P.halo, x0, y0, w * k, h * k); ctx.restore()
  }

  // ── the shots
  function m1(ctx, t) {
    const u = prog(t, T.m1, T.n1), hb = heart(t, T.heartsM1)
    const [wx, wy] = weave(t)
    // warm dark room behind her
    const bg = ctx.createRadialGradient(1260, 520, 100, 1260, 520, 1300)
    bg.addColorStop(0, '#5a3016'); bg.addColorStop(1, '#1a0c05')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)
    const k = lerp(1.62, 1.76, ease.inOutQuad(u)) * (1 + 0.012 * hb)
    photo(ctx, J, FACE.x, FACE.y, 1260 + wx, 540 + wy, k)
    // let her edges fall into the dark (the left third holds the line)
    const lg = ctx.createLinearGradient(520, 0, 900, 0)
    lg.addColorStop(0, 'rgba(26,12,5,0.96)'); lg.addColorStop(1, 'rgba(26,12,5,0)')
    ctx.fillStyle = lg; ctx.fillRect(0, 0, 900, H)
    filmFX(ctx, t, { leak: 1, pulse: hb })
  }

  function m2(ctx, t) {
    const hb = heart(t, T.heartsM2)
    const [wx, wy] = weave(t)
    const u = prog(t, T.m2, T.n2)
    const camS = lerp(1.14, 1.24, ease.inOutQuad(u)) * (1 + 0.01 * hb)
    ctx.save()
    ctx.translate(W / 2 + wx, H / 2 + wy); ctx.scale(camS, camS); ctx.translate(-W / 2, -H / 2)
    ctx.drawImage(desk, -40, -30, W + 80, H + 60)
    // the note slides in from below-right and settles
    const sIn = ease.outCubic(prog(t, T.m2 - 0.02, T.m2 + 0.5))
    const nx = 960 + lerp(120, 0, sIn), ny = 560 + lerp(260, 0, sIn), rot = lerp(-0.12, -0.045, sIn)
    ctx.save(); ctx.translate(nx, ny); ctx.rotate(rot)
    ctx.shadowColor = 'rgba(20,8,2,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 26
    ctx.drawImage(paper, -NW / 2, -NH / 2)
    ctx.shadowColor = 'transparent'
    ctx.translate(-NW / 2, -NH / 2)
    const ink = 'rgba(52,42,34,0.9)'
    // line 1: "do you like me?" written on, left to right
    ctx.font = `italic 112px ${SERIF}`; ctx.fillStyle = ink; ctx.textBaseline = 'alphabetic'
    const l1 = 'do you like me?', w1 = ctx.measureText(l1).width
    const wp = ease.inOutQuad(prog(t, T.m2 + 0.18, T.m2 + 0.95))
    if (wp > 0) { ctx.save(); ctx.beginPath(); ctx.rect(150, 100, (w1 + 20) * wp, 200); ctx.clip(); ctx.fillText(l1, 160, 290); ctx.restore() }
    // line 2: two boxes, "yes" "no"
    const stroke = (pts, p, ox, oy, lw = 4.2) => {
      const n = Math.floor(pts.length * clamp(p)); if (n < 2) return
      ctx.save(); ctx.translate(ox, oy); ctx.strokeStyle = ink; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < n; i++) ctx.lineTo(pts[i][0], pts[i][1]); ctx.stroke(); ctx.restore()
    }
    const by = 418
    stroke(BOX_YES, prog(t, T.m2 + 0.95, T.m2 + 1.15), 196, by)
    stroke(BOX_NO, prog(t, T.m2 + 1.15, T.m2 + 1.35), 560, by)
    ctx.font = `italic 92px ${SERIF}`
    const lp1 = prog(t, T.m2 + 1.02, T.m2 + 1.18), lp2 = prog(t, T.m2 + 1.22, T.m2 + 1.36)
    if (lp1 > 0) { ctx.save(); ctx.beginPath(); ctx.rect(286, by - 60, 160 * lp1, 160); ctx.clip(); ctx.fillText('yes', 290, by + 58); ctx.restore() }
    if (lp2 > 0) { ctx.save(); ctx.beginPath(); ctx.rect(650, by - 60, 120 * lp2, 160); ctx.clip(); ctx.fillText('no', 654, by + 58); ctx.restore() }
    // the tick in "yes" (a different hand: firmer, graphite) and a little heart
    stroke(tick, ease.inOutQuad(prog(t, T.m2 + 1.42, T.m2 + 1.62)), 206, by + 30, 6.5)
    stroke(heartPts, prog(t, T.m2 + 1.66, T.m2 + 1.92), 870, 238, 4)
    ctx.restore()
    ctx.restore()
    filmFX(ctx, t, { leak: 0.8, pulse: hb })
  }

  function m3(ctx, t) {
    const hb = heart(t, T.heartsM3)
    const [wx, wy] = weave(t)
    const u = prog(t, T.m3, T.n3)
    ctx.fillStyle = '#2a1408'; ctx.fillRect(0, 0, W, H)
    const k = lerp(2.55, 2.8, ease.outQuad(u)) * (1 + 0.02 * hb)
    photo(ctx, J, FACE.x + 6, FACE.y + 20, 960 + wx, 560 + wy, k, JW, JH, 0.3)
    const burn = ease.inQuad(prog(t, T.n3 - 0.32, T.n3 - 0.02))
    filmFX(ctx, t, { leak: 0.9 + 2.4 * burn, pulse: hb })
    if (burn > 0) {      // the film burns out: gold → white-gold
      ctx.save(); ctx.globalCompositeOperation = 'screen'
      const g = ctx.createRadialGradient(1380, 300, 0, 1380, 300, lerp(300, 2200, burn))
      g.addColorStop(0, `rgba(255,244,220,${burn})`); g.addColorStop(0.5, `rgba(255,190,90,${0.85 * burn})`); g.addColorStop(1, 'rgba(255,120,40,0)')
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); ctx.restore()
    }
  }

  return { m1, m2, m3 }
}
export { smooth }
