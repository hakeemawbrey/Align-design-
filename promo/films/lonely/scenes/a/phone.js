// lonely · A2 · THE PHONE (4.0–12.9). A close-up of the screen in the dark: a generic matches grid,
// "214 MATCHES · 0 CONVERSATIONS", thumb-flicked past faces (vertical motion blur). A thumb lands on one; the chat
// opens: hey / hey / wyd / lol / haha, each older bubble going grey; "Delivered" → "Seen"; typing dots… that stop.
// The screen dims, goes black, and the black glass gives back his face. (Generic UI only: no real app's name or look.)
import { clamp, lerp, prog, ease, rng, noise1, el } from '../../../../src/lib.js'
import { W, H, IMG, SANS, MONO, fill, img } from '../../../../src/scenes/common.js'
import { T, canvasLayer, grain, faceCanvases } from './shared.js'

const PH = { w: 620, h: 1260, cx: 1262, top: 64, rot: -3.2 }
const SW = PH.w - 32, SH = PH.h - 32
const UI = '#d8deea', UI2 = 'rgba(216,222,234,0.56)'

// ── the scroll: three thumb flicks, each an exponential glide
const FLICK_D = [1450, 2350, 1800]
const scrollY = t => T.flicks.reduce((y, f, i) => y + FLICK_D[i] * ease.outExpo(prog(t, f, f + 0.95)) * (t > f ? 1 : 0), 0)
// tiles: 3 across
const TILE = { w: 168, h: 214, gap: 14, x0: 26, y0: 236 }
const PITCH = TILE.h + TILE.gap
const NAMES = { 1: 'Lena', 2: 'Theo', 3: 'Rosa', 5: 'Ama', 6: 'Cole', 7: 'Mei', 8: 'Nia', 9: 'Dev', 10: 'Ivy', 11: 'Kofi', 12: 'Sara' }
const FACES = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12]     // everyone but him (p4)
const TAP = { row: 27, col: 1 }      // the tile under the thumb when the last flick settles

// ── the chat
const MSGS = [['me', 'hey'], ['them', 'hey'], ['me', 'wyd'], ['them', 'lol'], ['me', 'haha']]
const MY0 = 262, MPITCH = 106

export default async function build(stage) {
  const root = fill(stage, { background: '#04050a' })
  // background: a dark room out of focus — a few soft city bokeh, the screen's own spill
  const bg = canvasLayer(root), bx = bg.getContext('2d')
  const r = rng(77)
  const bokeh = Array.from({ length: 26 }, () => ({ x: r() * W, y: 120 + r() * 640, R: 18 + r() * 46, a: 0.03 + r() * 0.07, warm: r() < 0.45, ph: r() * 6 }))
    .filter(b => b.x < 700 || b.x > 1640 || b.y < 160)

  // the phone
  const cam = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', transformOrigin: '900px 560px' }, root)
  const phone = el('div', { position: 'absolute', left: (PH.cx - PH.w / 2) + 'px', top: PH.top + 'px', width: PH.w + 'px', height: PH.h + 'px', borderRadius: '84px',
    background: 'linear-gradient(160deg, #1b1f27 0%, #0b0d12 40%, #08090d 100%)', transform: `rotate(${PH.rot}deg)`,
    boxShadow: '0 40px 120px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(160,175,205,0.16), inset 0 0 0 7px #07080b' }, cam)
  const screen = el('div', { position: 'absolute', left: '16px', top: '16px', width: SW + 'px', height: SH + 'px', borderRadius: '68px', overflow: 'hidden', background: '#0c0f15' }, phone)
  const glow = el('div', { position: 'absolute', left: '-40px', top: '-40px', width: (PH.w + 80) + 'px', height: (PH.h + 80) + 'px', borderRadius: '120px',
    boxShadow: '0 0 160px 40px rgba(90,130,220,0.22)', pointerEvents: 'none' }, phone)
  phone.insertBefore(glow, screen)

  // ── view 1: matches
  const vM = el('div', { position: 'absolute', inset: 0 }, screen)
  const gridWrap = el('div', { position: 'absolute', left: 0, top: (TILE.y0 - 14) + 'px', width: SW + 'px', height: (SH - TILE.y0 + 14) + 'px', overflow: 'hidden' }, vM)
  const grid = el('div', { position: 'absolute', left: 0, top: '14px', width: SW + 'px', height: 40 * PITCH + 'px', filter: 'url(#lonelyMB)' }, gridWrap)
  let tapTile = null
  for (let row = 0; row < 34; row++) for (let col = 0; col < 3; col++) {
    const f = FACES[(row * 5 + col * 7) % FACES.length]
    const tile = el('div', { position: 'absolute', left: (TILE.x0 + col * (TILE.w + TILE.gap)) + 'px', top: row * PITCH + 'px', width: TILE.w + 'px', height: TILE.h + 'px',
      borderRadius: '20px', overflow: 'hidden', background: '#1a1e26' }, grid)
    img(tile, `${IMG}people/p${f}.jpg`, { left: '-34%', top: '-10%', width: '168%', height: 'auto' })   // cropped in on the face
    el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,12,0) 55%, rgba(6,8,12,0.85) 100%)' }, tile)
    el('div', { position: 'absolute', left: '16px', bottom: '12px', fontFamily: SANS, fontWeight: 600, fontSize: '24px', color: '#f1f3f7' }, tile, NAMES[f])
    if (row === TAP.row && col === TAP.col) tapTile = tile
  }
  // the cold cast over the photos
  el('div', { position: 'absolute', inset: 0, background: 'rgba(70,100,150,0.12)', mixBlendMode: 'color', pointerEvents: 'none' }, gridWrap)
  // header (stays put)
  el('div', { position: 'absolute', left: 0, top: 0, width: SW + 'px', height: TILE.y0 - 14 + 'px', background: '#0c0f15' }, vM)
  el('div', { position: 'absolute', left: '40px', top: '96px', fontFamily: SANS, fontWeight: 600, fontSize: '52px', color: '#f1f3f7', letterSpacing: '-0.01em' }, vM, 'Matches')
  el('div', { position: 'absolute', left: '42px', top: '170px', fontFamily: MONO, fontSize: '26px', letterSpacing: '0.02em', color: UI, whiteSpace: 'pre' }, vM,
    '214 MATCHES · <span style="color:#fff">0 CONVERSATIONS</span>')
  el('div', { position: 'absolute', left: '26px', right: '26px', top: (TILE.y0 - 15) + 'px', height: '1px', background: 'rgba(216,222,234,0.12)' }, vM)
  // the thumb's touch
  const touch = el('div', { position: 'absolute', width: '120px', height: '120px', marginLeft: '-60px', marginTop: '-60px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(220,230,255,0.35) 0%, rgba(220,230,255,0) 70%)', opacity: 0, pointerEvents: 'none' }, vM)
  // vertical motion blur filter
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  // cold mono keyed mostly on green: the photos' red/violet auras fall to near-black, faces stay
  const MONO_M = '0.05 0.56 0.05 0 0  0.05 0.66 0.08 0 0  0.06 0.76 0.18 0 0  0 0 0 1 0'
  svg.innerHTML = `<filter id="lonelyMB" x="0" y="-20%" width="100%" height="140%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${MONO_M}"/><feGaussianBlur stdDeviation="0 0"/></filter>`
    + `<filter id="lonelyCold" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${MONO_M}"/></filter>`
  root.appendChild(svg)
  const mb = svg.querySelector('feGaussianBlur')

  // ── view 2: the chat
  const vC = el('div', { position: 'absolute', inset: 0, background: '#0c0f15', transform: `translateX(${SW}px)` }, screen)
  el('div', { position: 'absolute', left: '30px', top: '84px', fontFamily: SANS, fontWeight: 300, fontSize: '64px', lineHeight: '64px', color: UI }, vC, '‹')
  const av = el('div', { position: 'absolute', left: '82px', top: '86px', width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', filter: 'url(#lonelyCold)' }, vC)
  img(av, `${IMG}people/p10.jpg`, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%' })
  el('div', { position: 'absolute', left: '164px', top: '96px', fontFamily: SANS, fontWeight: 600, fontSize: '36px', color: '#f1f3f7' }, vC, 'Ivy')
  el('div', { position: 'absolute', left: '26px', right: '26px', top: '176px', height: '1px', background: 'rgba(216,222,234,0.12)' }, vC)
  el('div', { position: 'absolute', left: 0, width: SW + 'px', top: '204px', textAlign: 'center', fontFamily: MONO, fontSize: '19px', letterSpacing: '0.08em', color: 'rgba(216,222,234,0.42)' }, vC,
    'YOU MATCHED · 3 WEEKS AGO')
  const bubbles = MSGS.map(([who, txt], i) => {
    const me = who === 'me'
    const b = el('div', { position: 'absolute', top: (MY0 + i * MPITCH) + 'px', [me ? 'right' : 'left']: '30px', padding: '14px 30px 16px', borderRadius: '36px',
      [me ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: '10px', background: me ? '#3b5f9c' : '#252a34', color: '#f3f5f9',
      fontFamily: SANS, fontWeight: 400, fontSize: '36px', lineHeight: '42px', opacity: 0, transformOrigin: me ? '100% 100%' : '0 100%' }, vC, txt)
    return { b, me, t: T.msgs[i] }
  })
  const receipt = el('div', { position: 'absolute', right: '36px', fontFamily: SANS, fontWeight: 500, fontSize: '22px', color: UI2, opacity: 0 }, vC, 'Delivered')
  const dots = el('div', { position: 'absolute', left: '30px', top: (MY0 + 5 * MPITCH) + 'px', width: '118px', height: '72px', borderRadius: '36px', borderBottomLeftRadius: '10px', background: '#252a34', opacity: 0 }, vC)
  const dot = [0, 1, 2].map(i => el('div', { position: 'absolute', left: (30 + i * 22) + 'px', top: '30px', width: '14px', height: '14px', borderRadius: '50%', background: '#aab2c2' }, dots))

  // ── screen off: black glass, and his face in it
  const off = el('div', { position: 'absolute', inset: 0, background: '#000', opacity: 0 }, screen)
  const face = await faceCanvases()
  const glass = el('canvas', { position: 'absolute', left: 0, top: 0, width: SW + 'px', height: SH + 'px', opacity: 0 }, screen)
  glass.width = SW; glass.height = SH
  {
    const gx = glass.getContext('2d'), k = 3.5, fw = 342 * k, fh = 366 * k
    gx.save(); gx.translate(SW / 2, 0); gx.scale(-1, 1); gx.globalAlpha = 0.2; gx.filter = 'blur(2.5px)'
    gx.drawImage(face.ref, -168 * k + 6, 470 - 142 * k, fw, fh); gx.restore()
    const gl = gx.createLinearGradient(0, 0, SW, SH * 0.6)       // a faint diagonal glare on the glass
    gl.addColorStop(0, 'rgba(200,215,240,0.0)'); gl.addColorStop(0.42, 'rgba(200,215,240,0.0)'); gl.addColorStop(0.5, 'rgba(200,215,240,0.05)'); gl.addColorStop(0.6, 'rgba(200,215,240,0.0)')
    gx.fillStyle = gl; gx.fillRect(0, 0, SW, SH)
  }

  // status bar (over both views)
  el('div', { position: 'absolute', left: '62px', top: '30px', fontFamily: SANS, fontWeight: 600, fontSize: '27px', color: '#f1f3f7' }, screen, '1:52')
  el('div', { position: 'absolute', left: (SW / 2 - 64) + 'px', top: '22px', width: '128px', height: '38px', borderRadius: '20px', background: '#000' }, screen)
  el('div', { position: 'absolute', right: '56px', top: '36px', width: '44px', height: '21px', borderRadius: '6px', border: '2px solid rgba(241,243,247,0.7)', boxSizing: 'border-box' }, screen)
  el('div', { position: 'absolute', right: '62px', top: '41px', width: '14px', height: '11px', borderRadius: '2px', background: '#f1f3f7' }, screen)
  screen.appendChild(off); screen.appendChild(glass)      // keep the black + glass above the status bar

  const gr = grain(root, 0.5)

  return {
    start: T.phoneIn, end: T.roomBack, root,
    update(t) {
      // camera: a slow drift in, a hand's breath of float
      const push = 1 + 0.05 * ease.inOutQuad(prog(t, T.phoneIn, T.roomBack))
      cam.style.transform = `translate(${(noise1(t * 0.6, 11) - 0.5) * 8}px, ${(noise1(t * 0.5, 12) - 0.5) * 8}px) scale(${push})`

      // the scroll + motion blur
      const y = scrollY(t), v = Math.abs(scrollY(t + 1 / 60) - scrollY(t - 1 / 60)) * 30 / 60  // px per frame
      grid.style.transform = `translateY(${-y}px)`
      mb.setAttribute('stdDeviation', `0 ${Math.min(26, v * 0.32).toFixed(2)}`)
      // the thumb: touches at each flick, and the tap
      const tp = T.flicks.map(f => prog(t, f - 0.08, f + 0.25)).find(p => p > 0 && p < 1)
      const tapP = prog(t, T.tap - 0.05, T.tap + 0.3)
      if (tp != null) { touch.style.opacity = String(Math.sin(tp * Math.PI) * 0.8); touch.style.left = SW * 0.56 + 'px'; touch.style.top = lerp(860, 520, tp) + 'px' }
      else if (tapP > 0 && tapP < 1) {
        touch.style.opacity = String(Math.sin(tapP * Math.PI)); touch.style.left = (TILE.x0 + TAP.col * (TILE.w + TILE.gap) + TILE.w / 2) + 'px'
        touch.style.top = (TILE.y0 + TAP.row * PITCH - y + TILE.h / 2) + 'px'
      } else touch.style.opacity = '0'
      const press = Math.sin(prog(t, T.tap - 0.04, T.tap + 0.16) * Math.PI)
      tapTile.style.transform = `scale(${1 - 0.05 * press})`
      tapTile.style.filter = press > 0 ? `brightness(${1 + 0.35 * press})` : ''

      // matches → chat
      const sl = ease.inOutCubic(prog(t, T.chatIn, T.chatIn + 0.28))
      vM.style.transform = `translateX(${-160 * sl}px)`; vM.style.opacity = String(1 - 0.6 * sl)
      vC.style.transform = `translateX(${SW * (1 - sl)}px)`
      vM.style.display = sl >= 1 ? 'none' : 'block'

      // bubbles: pop in; once a newer one lands, the older ones go grey
      bubbles.forEach((m, i) => {
        const p = ease.outBack(prog(t, m.t, m.t + 0.22)), a = prog(t, m.t, m.t + 0.1)
        const next = bubbles[i + 1] ? bubbles[i + 1].t : T.dots[1] + 0.1
        const grey = ease.inOutQuad(prog(t, next + 0.1, next + 0.6))
        m.b.style.opacity = String(a * (1 - 0.42 * grey))
        m.b.style.transform = `translateY(${(1 - p) * 14}px) scale(${lerp(0.86, 1, p)})`
        m.b.style.filter = grey > 0 ? `grayscale(${grey.toFixed(2)}) brightness(${1 - 0.15 * grey})` : ''
      })
      // receipt: under the latest of MY messages, "Delivered" → "Seen"
      const mine = bubbles.map((m, i) => [m, i]).filter(([m]) => m.me && t >= m.t + 0.25).pop()
      if (mine) {
        const [m, i] = mine
        receipt.style.top = (MY0 + i * MPITCH + 76) + 'px'
        receipt.textContent = t >= T.seen ? 'Seen' : 'Delivered'
        receipt.style.opacity = String(prog(t, m.t + 0.25, m.t + 0.4) * (t >= T.seen ? 1 : 0.85) * (bubbles[i + 1] && t >= bubbles[i + 1].t ? 1 - prog(t, bubbles[i + 1].t, bubbles[i + 1].t + 0.12) : 1))
      } else receipt.style.opacity = '0'
      // typing… and then not
      const dIn = prog(t, T.dots[0], T.dots[0] + 0.14), dOut = prog(t, T.dots[1], T.dots[1] + 0.22)
      dots.style.opacity = String(dIn * (1 - dOut))
      dots.style.transform = `scale(${lerp(0.9, 1, ease.outCubic(dIn))})`
      dot.forEach((d, i) => { const ph = (t - T.dots[0]) * 7.5 - i * 0.9; d.style.transform = `translateY(${-Math.max(0, Math.sin(ph)) * 7}px)`; d.style.opacity = String(0.55 + 0.45 * Math.max(0, Math.sin(ph))) })

      // the screen dims, goes black; the glass gives back his face
      const dim = 0.5 * ease.inOutQuad(prog(t, T.dim, T.dim + 0.12)) + 0.5 * ease.inQuad(prog(t, T.off - 0.04, T.off + 0.04))
      off.style.opacity = String(dim)
      glass.style.opacity = String(ease.inOutQuad(prog(t, T.off + 0.1, T.off + 0.7)))
      const lightOn = 1 - dim
      const scrollFlick = 1 + 0.06 * Math.min(1, v / 20)
      glow.style.opacity = String(lightOn * scrollFlick)

      // background: bokeh + the screen's spill on the dark
      bx.fillStyle = '#05060a'; bx.fillRect(0, 0, W, H)
      const rg = bx.createRadialGradient(PH.cx, 560, 100, PH.cx, 560, 1100)
      rg.addColorStop(0, `rgba(60,90,160,${0.05 + 0.17 * lightOn})`); rg.addColorStop(1, 'rgba(60,90,160,0)')
      bx.fillStyle = rg; bx.fillRect(0, 0, W, H)
      for (const b of bokeh) {
        const a = b.a * (0.8 + 0.2 * Math.sin(t * 0.7 + b.ph)) * (0.55 + 0.45 * lightOn)
        const g = bx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.R)
        const c = b.warm ? '214,190,150' : '160,180,220'
        g.addColorStop(0, `rgba(${c},${a})`); g.addColorStop(0.8, `rgba(${c},${a * 0.85})`); g.addColorStop(1, `rgba(${c},0)`)
        bx.fillStyle = g; bx.fillRect(b.x - b.R, b.y - b.R, b.R * 2, b.R * 2)
      }
      const vg = bx.createRadialGradient(W / 2, H / 2, 300, W / 2, H / 2, 1150)
      vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.6)')
      bx.fillStyle = vg; bx.fillRect(0, 0, W, H)
      gr.update(t, 0.5)
    },
  }
}
