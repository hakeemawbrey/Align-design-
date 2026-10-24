// butterflies · NOW: cold, desaturated, fast. A phone in a dark room; a generic swipe stack of grey faces flicked away
// (motion-smeared), faster and faster until it smears, then stops dead on one face nobody looks at. A cold chat:
// hey / hey / wyd · Seen. The screen dims, goes black, and the room goes with it. (Generic UI only.)
import { clamp, lerp, prog, ease, rng, noise1 } from '../../../../src/lib.js'
import { IMG, SANS, MONO } from '../../../../src/scenes/common.js'
import { T, W, H, cnv, loadImage, roundRect, ALL_SWIPES, N3_SWIPES } from './shared.js'

const PH = { w: 620, h: 1260, cx: 1290, top: 70, rot: -2.6 }
const SW = PH.w - 32, SH = PH.h - 32
const CARD = { x: 22, y: 188, w: SW - 44, h: 790 }
const NAMES = { 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 5: 'Ama, 25', 6: 'Cole, 31', 7: 'Mei, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']
const ORDER = [7, 2, 11, 5, 9, 8, 12, 6, 10, 3, 2, 5, 11, 7, 9, 10, 12, 6, 2, 8, 3, 11, 5, 9, 7, 12, 10, 6, 8, 3]
const LAST = ALL_SWIPES.length            // the card left when the stack stops
const faceOf = k => ORDER[k % ORDER.length]
const dirOf = k => (k % 5 === 2 || k % 7 === 4) ? 1 : -1
const flightOf = k => clamp((k + 1 < ALL_SWIPES.length ? ALL_SWIPES[k + 1] - ALL_SWIPES[k] : 0.3) * 1.5, 0.2, 0.34)

export async function prepNow() {
  await Promise.all(['600 44px Inter', '400 30px Inter', '500 22px Inter', '400 22px "Space Mono"'].map(f => document.fonts.load(f).catch(() => null)))
  // cold card art per face, at card size (grey, contrasty, a blue cast, the aura falls to dark grey)
  const cards = {}
  for (const f of Object.keys(NAMES).map(Number)) {
    const im = await loadImage(`${IMG}people/p${f}.jpg`)
    const c = cnv(CARD.w, CARD.h), x = c.getContext('2d')
    x.fillStyle = '#1a1d24'; x.fillRect(0, 0, CARD.w, CARD.h)
    if (im) {
      const s = Math.max(CARD.w / im.width, CARD.h / im.height) * 1.04
      x.filter = 'grayscale(1) contrast(1.35) brightness(0.98)'
      x.drawImage(im, CARD.w / 2 - im.width * s / 2, CARD.h * 0.42 - im.height * s * 0.4, im.width * s, im.height * s)
      x.filter = 'none'
    }
    x.globalCompositeOperation = 'color'; x.fillStyle = 'rgba(84,110,150,0.3)'; x.fillRect(0, 0, CARD.w, CARD.h)
    x.globalCompositeOperation = 'source-over'
    const g = x.createLinearGradient(0, 0, 0, CARD.h)
    g.addColorStop(0, 'rgba(8,10,14,0.35)'); g.addColorStop(0.16, 'rgba(8,10,14,0)'); g.addColorStop(0.55, 'rgba(8,10,14,0)'); g.addColorStop(1, 'rgba(8,10,14,0.88)')
    x.fillStyle = g; x.fillRect(0, 0, CARD.w, CARD.h)
    // photo pips
    for (let i = 0; i < 4; i++) { x.fillStyle = i === 0 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.3)'; roundRect(x, 20 + i * ((CARD.w - 40 - 24) / 4 + 8), 18, (CARD.w - 40 - 24) / 4, 5, 2.5); x.fill() }
    cards[f] = c
  }
  const label = (x, f, k) => {
    x.fillStyle = '#f4f5f7'; x.font = `600 46px ${SANS}`; x.fillText(NAMES[f], 30, CARD.h - 76)
    x.fillStyle = 'rgba(235,238,244,0.62)'; x.font = `400 26px ${SANS}`; x.fillText(DIST[k % DIST.length], 32, CARD.h - 36)
  }
  // the room behind: cold bokeh (pre-drawn)
  const room = cnv(W, H), rx = room.getContext('2d')
  {
    rx.fillStyle = '#161b28'; rx.fillRect(0, 0, W, H)
    const r = rng(303)
    for (let i = 0; i < 30; i++) {
      const x = r() * W, y = 80 + r() * 760, R = 16 + r() * 50, a = 0.03 + r() * 0.07
      if (x > 900 && x < 1700 && y > 140) continue
      const c = r() < 0.3 ? '190,190,200' : '150,172,214'
      const g = rx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, `rgba(${c},${a})`); g.addColorStop(0.8, `rgba(${c},${a * 0.8})`); g.addColorStop(1, `rgba(${c},0)`)
      rx.fillStyle = g; rx.fillRect(x - R, y - R, R * 2, R * 2)
    }
  }

  // ── one card on the screen ctx at offset (ox, oy), rotation rot, scale s
  function card(x, k, ox, oy, rot, s, alpha = 1) {
    const f = faceOf(k)
    x.save(); x.globalAlpha = alpha
    x.translate(CARD.x + CARD.w / 2 + ox, CARD.y + CARD.h / 2 + oy); x.rotate(rot); x.scale(s, s)
    x.translate(-CARD.w / 2, -CARD.h / 2)
    roundRect(x, 0, 0, CARD.w, CARD.h, 30); x.save(); x.clip()
    x.drawImage(cards[f], 0, 0)
    label(x, f, k)
    x.restore()
    x.strokeStyle = 'rgba(255,255,255,0.06)'; x.lineWidth = 2; roundRect(x, 1, 1, CARD.w - 2, CARD.h - 2, 29); x.stroke()
    x.restore()
  }
  const flyPos = (k, t) => {
    const p = ease.inQuad(prog(t, ALL_SWIPES[k], ALL_SWIPES[k] + flightOf(k)))
    const d = dirOf(k)
    return [d * 980 * p, -60 * p + 30 * Math.sin(p * 3), d * 0.32 * p]
  }

  function swipeScreen(x, t) {
    x.fillStyle = '#161c28'; x.fillRect(0, 0, SW, SH)
    // header: a generic title + filter dots
    x.fillStyle = '#f1f3f7'; x.font = `600 44px ${SANS}`; x.fillText('Discover', 36, 142)
    x.fillStyle = 'rgba(216,222,234,0.5)'; for (let i = 0; i < 3; i++) { x.beginPath(); x.arc(SW - 54, 106 + i * 14, 4, 0, Math.PI * 2); x.fill() }
    // the stack: how many have gone by t
    let top = 0; while (top < ALL_SWIPES.length && t >= ALL_SWIPES[top]) top++
    // the card under (rises to full size as the top one leaves)
    const prev = top - 1
    if (top < LAST + 1) {
      const rise = prev >= 0 ? ease.outCubic(prog(t, ALL_SWIPES[prev], ALL_SWIPES[prev] + flightOf(prev) * 0.8)) : 1
      if (top + 1 <= LAST) card(x, top + 1, 0, 14, 0, 0.94, 0.85)
      card(x, top, 0, lerp(10, 0, rise), 0, lerp(0.95, 1, rise))
    }
    // cards in the air (several at once when it's fast), smeared along their flight
    for (let k = Math.max(0, top - 6); k < top; k++) {
      if (t > ALL_SWIPES[k] + flightOf(k)) continue
      const v = 1 / 90
      for (let i = 3; i >= 0; i--) {
        const [ox, oy, rot] = flyPos(k, t - i * v)
        card(x, k, ox, oy, rot, 1, i === 0 ? 1 : 0.22)
      }
    }
    // the buttons
    const btn = (cx, col, glyph) => {
      x.fillStyle = '#1f2533'; x.beginPath(); x.arc(cx, 1072, 52, 0, Math.PI * 2); x.fill()
      x.strokeStyle = 'rgba(216,222,234,0.14)'; x.lineWidth = 2; x.stroke()
      x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 7; x.lineCap = 'round'
      if (glyph === 'x') { x.beginPath(); x.moveTo(cx - 16, 1056); x.lineTo(cx + 16, 1088); x.moveTo(cx + 16, 1056); x.lineTo(cx - 16, 1088); x.stroke() }
      else { x.beginPath(); x.moveTo(cx, 1092); x.bezierCurveTo(cx - 34, 1070, cx - 22, 1046, cx, 1060); x.bezierCurveTo(cx + 22, 1046, cx + 34, 1070, cx, 1092); x.fill() }
    }
    btn(SW / 2 - 90, 'rgba(216,222,234,0.8)', 'x'); btn(SW / 2 + 90, 'rgba(216,222,234,0.8)', 'h')
    const pressK = ALL_SWIPES.findIndex(s => t >= s - 0.04 && t < s + 0.1)
    if (pressK >= 0) { const cx = SW / 2 + 90 * dirOf(pressK); x.fillStyle = 'rgba(220,230,255,0.14)'; x.beginPath(); x.arc(cx, 1072, 52, 0, Math.PI * 2); x.fill() }
  }

  const MSG = [['me', 'hey', 6.12], ['them', 'hey', 6.27], ['me', 'wyd', 6.42]]
  function chatScreen(x, t) {
    x.fillStyle = '#161c28'; x.fillRect(0, 0, SW, SH)
    x.fillStyle = 'rgba(216,222,234,0.8)'; x.font = `300 64px ${SANS}`; x.fillText('‹', 30, 146)
    x.save(); x.beginPath(); x.arc(114, 118, 32, 0, Math.PI * 2); x.clip(); x.drawImage(cards[10], 120, 120, 300, 260, 82, 86, 64, 64); x.restore()
    x.fillStyle = '#f1f3f7'; x.font = `600 36px ${SANS}`; x.fillText('Ivy', 164, 130)
    x.fillStyle = 'rgba(216,222,234,0.12)'; x.fillRect(26, 176, SW - 52, 1)
    x.fillStyle = 'rgba(216,222,234,0.42)'; x.font = `400 19px ${MONO}`; x.textAlign = 'center'; x.fillText('MATCHED · 3 WEEKS AGO', SW / 2, 222); x.textAlign = 'left'
    MSG.forEach(([who, txt, at], i) => {
      const p = ease.outBack(prog(t, at, at + 0.16)), a = prog(t, at, at + 0.06)
      if (a <= 0) return
      const me = who === 'me'
      x.font = `400 36px ${SANS}`
      const tw = x.measureText(txt).width, bw = tw + 60, bh = 72, y = 268 + i * 104
      const bx = me ? SW - 30 - bw : 30
      x.save(); x.globalAlpha = a; x.translate(me ? bx + bw : bx, y + bh); x.scale(lerp(0.86, 1, p), lerp(0.86, 1, p)); x.translate(me ? -(bx + bw) : -bx, -(y + bh))
      x.fillStyle = me ? '#3b5f9c' : '#252a34'; roundRect(x, bx, y, bw, bh, 34); x.fill()
      x.fillStyle = '#f3f5f9'; x.fillText(txt, bx + 30, y + 49)
      x.restore()
    })
    if (t >= 6.56) { x.fillStyle = 'rgba(216,222,234,0.56)'; x.font = `500 22px ${SANS}`; x.textAlign = 'right'; x.fillText('Seen', SW - 36, 268 + 2 * 104 + 104); x.textAlign = 'left' }
  }

  const scr = cnv(SW, SH), sx = scr.getContext('2d')
  function statusBar(x) {
    x.fillStyle = '#f1f3f7'; x.font = `600 27px ${SANS}`; x.fillText('11:48', 62, 58)
    x.fillStyle = '#000'; roundRect(x, SW / 2 - 64, 22, 128, 38, 19); x.fill()
    x.strokeStyle = 'rgba(241,243,247,0.7)'; x.lineWidth = 2; roundRect(x, SW - 100, 36, 44, 21, 6); x.stroke()
    x.fillStyle = '#f1f3f7'; x.fillRect(SW - 95, 41, 16, 11)
  }

  /** draw the NOW frame. mode: 'swipe' | 'chat' */
  function draw(ctx, t, mode) {
    // screen state: dims at 11.75, black at 12.3 (after the stack stops); the room fades out 12.35–12.9
    const dim = 0.55 * ease.inOutQuad(prog(t, 11.75, 11.95)) + 0.45 * ease.inQuad(prog(t, 12.26, 12.32))
    const roomK = 1 - ease.inOutQuad(prog(t, 12.35, T.dark))
    const lightOn = 1 - dim
    // the stage: the room, the screen's cold spill
    ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H)
    ctx.save(); ctx.globalAlpha = roomK
    ctx.drawImage(room, 0, 0)
    const rg = ctx.createRadialGradient(PH.cx, 560, 100, PH.cx, 560, 1100)
    rg.addColorStop(0, `rgba(70,100,170,${0.14 + 0.22 * lightOn})`); rg.addColorStop(1, 'rgba(60,90,160,0)')
    ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H)
    // camera: a hand's float; the push in as it gets numb; a jolt at each fast swipe
    const fast = mode === 'swipe' && t > 9.6 && t < T.stop ? prog(t, 9.6, 10.6) : 0
    const push = mode === 'swipe' && t > T.n3 ? 1 + 0.07 * ease.inOutQuad(prog(t, T.n3, 12.6)) : 1.02
    const jx = (noise1(t * 0.6, 11) - 0.5) * 10 + (noise1(t * 24, 13) - 0.5) * 8 * fast
    const jy = (noise1(t * 0.5, 12) - 0.5) * 10 + (noise1(t * 22, 14) - 0.5) * 6 * fast
    ctx.translate(900 + jx, 560 + jy); ctx.scale(push, push); ctx.translate(-900, -560)
    // the phone
    ctx.save(); ctx.translate(PH.cx, PH.top + PH.h / 2); ctx.rotate(PH.rot * Math.PI / 180); ctx.translate(-PH.w / 2, -PH.h / 2)
    ctx.save(); ctx.shadowColor = `rgba(90,130,220,${0.3 * lightOn})`; ctx.shadowBlur = 160
    const pg = ctx.createLinearGradient(0, 0, PH.w, PH.h); pg.addColorStop(0, '#1b1f27'); pg.addColorStop(0.4, '#0b0d12'); pg.addColorStop(1, '#08090d')
    ctx.fillStyle = pg; roundRect(ctx, 0, 0, PH.w, PH.h, 84); ctx.fill(); ctx.restore()
    ctx.strokeStyle = 'rgba(160,175,205,0.16)'; ctx.lineWidth = 2; roundRect(ctx, 1, 1, PH.w - 2, PH.h - 2, 83); ctx.stroke()
    // the screen
    if (mode === 'chat') chatScreen(sx, t); else swipeScreen(sx, t)
    statusBar(sx)
    if (dim > 0) { sx.fillStyle = `rgba(0,0,0,${dim.toFixed(3)})`; sx.fillRect(0, 0, SW, SH) }
    ctx.save(); roundRect(ctx, 16, 16, SW, SH, 68); ctx.clip()
    ctx.drawImage(scr, 16, 16)
    // a faint diagonal glare on the glass
    const gl = ctx.createLinearGradient(16, 16, SW, SH * 0.6)
    gl.addColorStop(0, 'rgba(200,215,240,0)'); gl.addColorStop(0.45, 'rgba(200,215,240,0)'); gl.addColorStop(0.52, `rgba(200,215,240,${0.04 + 0.03 * dim})`); gl.addColorStop(0.6, 'rgba(200,215,240,0)')
    ctx.fillStyle = gl; ctx.fillRect(16, 16, SW, SH)
    ctx.restore()
    ctx.restore()
    ctx.restore()
    // lens: cold vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1150)
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.5)')
    ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H)
  }
  return { draw }
}
export { N3_SWIPES }
