// swipes · S1 · THE PROBLEM (0–5.6). A 2am room, cold phone light. A thumb flicks faces away so fast they smear; the
// generic app's counter rolls SWIPES TODAY 300 → 312. "312 swipes." / "0 butterflies." (both fully in by 1.4s).
// The swiping stops; one hesitant half-drag that springs back; the screen goes off. Then the camera tilts up off the
// phone (the room slides down out of frame) into the sky (sky.js, drawn by s0-sky underneath): look up.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { W, H, IMG, SANS, MONO, SERIF, fill, img } from '../../../src/scenes/common.js'
import { panK, PAN } from './kit.js'

export const BONE = '#efe6d6'
const ROSE = '#e8628a'
const ROOM = '#0b0d12'
const PHOTO = i => `${IMG}people/p${i}.jpg`
const COLD = 'grayscale(1) contrast(1.35) brightness(1.06)'
const CAP_SHADOW = '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)'
const NAMES = { 1: 'Lena, 23', 2: 'Theo, 29', 3: 'Rosa, 28', 4: 'Jun, 27', 5: 'Ama, 25', 6: 'Cole, 31', 7: 'Maya, 24', 8: 'Nia, 26', 9: 'Dev, 26', 10: 'Ivy, 27', 11: 'Kofi, 30', 12: 'Sara, 25' }
const DIST = ['2 miles away', '5 miles away', '1 mile away', '8 miles away', '3 miles away', '12 miles away']

// ── timing
const GAPS = [0.067, 0.067, 0.067, 0.067, 0.067, 0.08, 0.09, 0.1, 0.12, 0.15, 0.2]
export const SWIPES = GAPS.reduce((a, g) => [...a, a[a.length - 1] + g], [-0.08])  // 12 swipes, mid-flick at frame 0 → ~1.0
const N = SWIPES.length, COUNT0 = 300                                             // counter ends on 312
const DRAG = { a: 2.2, b: 2.95 }                                                  // one hesitant half-drag, springs back
const CAP1 = 0.12, CAP2 = 0.9, CAP_OUT = 3.3
const OFF = 3.58                                                                  // the screen goes off
const END = 5.6

// ── phone geometry (phone px, origin = phone top-left)
const PW = 470, PH = 960, INSET = 14, SW = PW - 2 * INSET, SH = PH - 2 * INSET
const CW = 398, CH = 590, CCX = SW / 2, CCY = 126 + CH / 2
const PHONE_X = 610, PHONE_Y = 560

const dirOf = k => (k % 5 === 3) ? 1 : -1
const flightOf = k => clamp((k + 1 < N ? SWIPES[k + 1] - SWIPES[k] : 0.25) * 1.7, 0.2, 0.34)
const faceOf = k => [7, 2, 11, 5, 9, 1, 4, 12, 6, 10, 8, 3, 5][k % 13]
const LAST_FACE = 9

function words(parent, text, style, at, gap = 0.1, dur = 0.22) {
  const box = el('div', { position: 'absolute', whiteSpace: 'nowrap', ...style }, parent)
  const ws = text.split(' ').map((w, i) => ({ t: at + i * gap, e: el('span', { display: 'inline-block', margin: '0 0.12em', opacity: 0 }, box, w) }))
  return {
    box,
    update(t, out = 1) {
      for (const w of ws) {
        const p = prog(t, w.t, w.t + dur), e = ease.outCubic(p)
        w.e.style.opacity = String(e * out)
        w.e.style.transform = `translateY(${(1 - e) * 18}px)`
        w.e.style.filter = p < 1 ? `blur(${((1 - e) * 7).toFixed(2)}px)` : 'none'
      }
    },
  }
}

function faceCard(parent, face, k) {
  const card = el('div', { position: 'absolute', left: -CW / 2 + 'px', top: -CH / 2 + 'px', width: CW + 'px', height: CH + 'px',
    borderRadius: '26px', overflow: 'hidden', background: '#1a1d24', boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset' }, parent)
  img(card, PHOTO(face), { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 32%', filter: COLD })
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.26)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.3) 0%, rgba(8,10,14,0) 14%, rgba(8,10,14,0) 55%, rgba(8,10,14,0.9) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '18px', right: '18px', top: '16px', height: '4px', display: 'flex', gap: '6px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '2px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)' }, pips)
  el('div', { position: 'absolute', left: '26px', bottom: '58px', fontFamily: SANS, fontWeight: 600, fontSize: '38px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, NAMES[face])
  el('div', { position: 'absolute', left: '28px', bottom: '28px', fontFamily: SANS, fontWeight: 400, fontSize: '21px', color: 'rgba(235,238,244,0.66)' }, card, DIST[k % DIST.length])
  const sheen = el('div', { position: 'absolute', left: '-60%', top: '-20%', width: '60%', height: '140%', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(220,230,255,0.22) 50%, rgba(255,255,255,0) 100%)', transform: 'rotate(18deg)', opacity: 0 }, card)
  const stamp = d => el('div', { position: 'absolute', top: '44px', [d < 0 ? 'right' : 'left']: '30px', width: '96px', height: '96px', opacity: 0, filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.6))' }, card, d < 0
    ? `<svg viewBox="0 0 128 128" width="96" height="96"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${BONE}" stroke-width="7"/><path d="M42 42 L86 86 M86 42 L42 86" stroke="${BONE}" stroke-width="11" stroke-linecap="round"/></svg>`
    : `<svg viewBox="0 0 128 128" width="96" height="96"><circle cx="64" cy="64" r="58" fill="rgba(10,12,16,0.35)" stroke="${ROSE}" stroke-width="7"/><path d="M64 96 C30 72 30 44 46 40 C55 38 61 43 64 50 C67 43 73 38 82 40 C98 44 98 72 64 96 Z" fill="${ROSE}"/></svg>`)
  return { card, sheen, stampX: stamp(-1), stampH: stamp(1) }
}

function blurDefs(parent, n, prefix) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('width', '0'); svg.setAttribute('height', '0'); svg.style.position = 'absolute'
  const blurs = []
  for (let i = 0; i < n; i++) {
    const f = document.createElementNS(svg.namespaceURI, 'filter')
    f.setAttribute('id', `${prefix}${i}`); f.setAttribute('x', '-50%'); f.setAttribute('width', '200%'); f.setAttribute('y', '-10%'); f.setAttribute('height', '120%')
    const g = document.createElementNS(svg.namespaceURI, 'feGaussianBlur'); g.setAttribute('stdDeviation', '0 0')
    f.appendChild(g); svg.appendChild(f); blurs.push(g)
  }
  parent.appendChild(svg)
  return blurs
}

export default function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  // the camera: the room (and a soft tail above it into the sky) slides down as we look up
  const cam = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  el('div', { position: 'absolute', left: 0, top: '-560px', width: W + 'px', height: '562px',
    background: `linear-gradient(180deg, rgba(11,13,18,0) 0%, rgba(11,13,18,0.55) 45%, ${ROOM} 100%)` }, cam)
  const room = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden',
    background: `radial-gradient(90% 100% at 32% 55%, #161a22 0%, #0f1218 50%, ${ROOM} 100%)` }, cam)
  // the phone's cold light on the room (breathes with the faces; dies with the screen)
  const spill = el('div', { position: 'absolute', left: PHONE_X - 900 + 'px', top: PHONE_Y - 700 + 'px', width: '1800px', height: '1400px', borderRadius: '50%',
    background: 'radial-gradient(closest-side, rgba(120,150,205,0.26), rgba(90,115,170,0.1) 50%, rgba(0,0,0,0) 100%)', mixBlendMode: 'screen' }, room)

  // ── the phone
  const wrap = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, room)
  const phone = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: -PH / 2 + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '66px',
    background: 'linear-gradient(160deg, #23262d 0%, #0b0c10 40%, #07080b 100%)', boxShadow: '0 50px 120px rgba(0,0,0,0.7), 0 0 0 2px rgba(150,170,205,0.16) inset, 0 0 60px rgba(110,140,200,0.12)' }, wrap)
  const screen = el('div', { position: 'absolute', left: INSET + 'px', top: INSET + 'px', width: SW + 'px', height: SH + 'px', borderRadius: '52px', overflow: 'hidden', background: '#0e1116' }, phone)
  const ui = el('div', { position: 'absolute', inset: 0, zIndex: '0' }, screen)
  el('div', { position: 'absolute', left: '38px', top: '22px', fontFamily: SANS, fontWeight: 600, fontSize: '21px', color: 'rgba(240,242,246,0.9)' }, ui, '1:47')
  el('div', { position: 'absolute', left: SW / 2 - 60 + 'px', top: '16px', width: '120px', height: '32px', borderRadius: '16px', background: '#000' }, ui)
  el('div', { position: 'absolute', right: '36px', top: '27px', width: '34px', height: '15px', borderRadius: '4px', border: '2px solid rgba(240,242,246,0.7)' }, ui,
    '<div style="position:absolute;left:2px;top:2px;width:8px;height:7px;border-radius:1px;background:#e8628a"></div>')
  // the counter (generic UI)
  const pill = el('div', { position: 'absolute', left: '50%', top: '66px', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '14px', padding: '8px 22px 8px 24px',
    borderRadius: '24px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', whiteSpace: 'nowrap' }, ui)
  el('span', { fontFamily: MONO, fontSize: '16px', letterSpacing: '0.18em', color: 'rgba(235,238,244,0.62)' }, pill, 'SWIPES TODAY')
  const num = el('span', { display: 'inline-block', fontFamily: SANS, fontWeight: 700, fontSize: '28px', color: '#f4f5f7', fontVariantNumeric: 'tabular-nums', minWidth: '52px', textAlign: 'right' }, pill, String(COUNT0))
  // the stack
  const deck = el('div', { position: 'absolute', inset: 0 }, ui)
  const blurs = blurDefs(root, 6, 'swb')
  const cards = Array.from({ length: N + 1 }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...faceCard(holder, k === N ? LAST_FACE : faceOf(k), k) }
  })
  // buttons
  const btn = (x, svg) => el('div', { position: 'absolute', left: x - 44 + 'px', top: SH - 136 + 'px', width: '88px', height: '88px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'grid', placeItems: 'center' }, ui, svg)
  btn(SW / 2 - 92, `<svg viewBox="0 0 40 40" width="34" height="34"><path d="M12 12 L28 28 M28 12 L12 28" stroke="${BONE}" stroke-width="3.6" stroke-linecap="round"/></svg>`)
  btn(SW / 2 + 92, `<svg viewBox="0 0 40 40" width="36" height="36"><path d="M20 31 C9 23 9 14 14.5 12.5 C17.5 11.8 19 13.5 20 15.6 C21 13.5 22.5 11.8 25.5 12.5 C31 14 31 23 20 31 Z" fill="${ROSE}"/></svg>`)
  // glass + screen-off
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 30%)', pointerEvents: 'none' }, screen)
  const off = el('div', { position: 'absolute', inset: 0, background: '#050608', opacity: 0, zIndex: '2' }, screen)
  // the thumb: a backlit silhouette from the bottom right, its pad lit by the screen
  const thumb = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, wrap,
    `<svg width="400" height="640" viewBox="0 0 400 640" style="position:absolute;left:-120px;top:-60px;overflow:visible;filter:blur(1.4px)">
      <defs><linearGradient id="swth" x1="0" y1="0" x2="1" y2="0.3"><stop offset="0%" stop-color="#2a303c"/><stop offset="18%" stop-color="#121419"/><stop offset="100%" stop-color="#050608"/></linearGradient>
      <radialGradient id="swtp" cx="0.3" cy="0.12" r="0.5"><stop offset="0%" stop-color="rgba(150,175,220,0.2)"/><stop offset="100%" stop-color="rgba(150,175,220,0)"/></radialGradient></defs>
      <g transform="rotate(-28 120 60)"><path d="M44 84 C44 26 82 0 122 0 C162 0 200 26 200 84 L214 640 L30 640 Z" fill="url(#swth)"/>
      <path d="M44 84 C44 26 82 0 122 0 C162 0 200 26 200 84 L214 640 L30 640 Z" fill="url(#swtp)"/>
      <path d="M76 60 C80 30 100 16 122 16 C144 16 164 30 168 60 C156 74 88 74 76 60 Z" fill="rgba(170,185,210,0.06)"/></g></svg>`)

  // ── captions (right column)
  const cap = size => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: BONE, textShadow: CAP_SHADOW })
  const c1 = words(root, '312 swipes.', { ...cap(124), left: '1010px', top: '338px' }, CAP1, 0.13, 0.26)
  const c2 = words(root, '0 butterflies.', { ...cap(124), left: '1010px', top: '500px' }, CAP2, 0.15, 0.3)

  return {
    start: 0, end: END, root,
    update(t) {
      const p = panK(t)
      cam.style.transform = `translateY(${((H + 580) * p).toFixed(1)}px)`
      // slow push-in on the phone, a little drift
      const push = ease.inOutQuad(prog(t, 0, 3.9))
      const sc = lerp(1.0, 1.07, push)
      wrap.style.transform = `translate(${PHONE_X + 10 * push}px, ${PHONE_Y + 8 * push}px) rotate(${lerp(-4, -3, push)}deg) scale(${sc})`

      // ── the stack
      let top = SWIPES.findIndex(s => t < s); if (top < 0) top = N
      let slot = 0
      const dragK = Math.sin(Math.PI * ease.inOutQuad(prog(t, DRAG.a, DRAG.b)))
      cards.forEach((c, k) => {
        const s = k < N ? SWIPES[k] : Infinity, fl = k < N ? flightOf(k) : 1, d = dirOf(k)
        if (t >= s + fl || k > top + 2) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        let x = CCX, y = CCY, rot = 0, s2 = 1, bright = 1, bl = 0, sheen = 0
        if (t >= s) {
          const u = prog(t, s, s + fl)
          x += d * (90 * u + 720 * u * u); y += -20 * u + 70 * u * u; rot = d * (4 + 14 * u)
          bl = Math.min(18, 4 + 26 * u) * clamp(u * 4); sheen = u
        } else {
          let depth = k - top
          if (top > 0) { const ps = SWIPES[top - 1]; depth += 1 - ease.outCubic(prog(t, ps, ps + Math.min(0.08, flightOf(top - 1) * 0.5))) }
          if (top === k && k < N) { const lead = prog(t, s - 0.06, s); x += d * 18 * ease.inQuad(lead); rot = d * 2 * ease.inQuad(lead) }
          if (k === N && top === N) { x -= 70 * dragK; rot = -5 * dragK; y += 6 * dragK }
          s2 = 1 - 0.045 * depth; y += 16 * depth; bright = 1 - 0.35 * depth
          if (depth > 2) bright = 0
        }
        c.holder.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${s2})`
        c.holder.style.opacity = String(clamp(bright * 1.5))
        c.card.style.filter = bright < 1 ? `brightness(${Math.max(0.25, bright)})` : ''
        if (bl > 0.5 && slot < 6) { blurs[slot].setAttribute('stdDeviation', `${bl.toFixed(1)} ${(bl * 0.1).toFixed(1)}`); c.card.style.filter = `url(#swb${slot})`; slot++ }
        c.sheen.style.opacity = String(sheen > 0 ? 1 - sheen : 0)
        c.sheen.style.transform = `translateX(${sheen * 260}%) rotate(18deg)`
        if (k < N) {
          const sp = prog(t, s - 0.05, s + 0.02), st = d < 0 ? c.stampX : c.stampH
          st.style.opacity = String(sp > 0 ? clamp(sp * 3) : 0)
          st.style.transform = `scale(${lerp(1.35, 1, ease.outBack(sp))}) rotate(${d * -8}deg)`
        }
        if (k === N) c.stampX.style.opacity = String(0.85 * clamp(dragK * 2 - 0.6))
      })

      // ── the counter: one per swipe, a small bump on each
      const n = SWIPES.filter(s => t >= s).length
      num.textContent = String(COUNT0 + n)
      const lastS = n > 0 ? SWIPES[n - 1] : -9
      const bump = 1 - prog(t, lastS, lastS + 0.12)
      num.style.transform = `scale(${1 + 0.16 * bump})`
      num.style.color = bump > 0.02 ? `rgba(255,${Math.round(244 - 30 * bump)},${Math.round(247 - 60 * bump)},1)` : '#f4f5f7'

      // ── the thumb: flicks with each swipe (a blur when they come fast), the half-drag, then drops away with the screen
      let tx = 0, ty = 0, tr = 0, tb = 1.4
      for (let k = 0; k < N; k++) {
        const s = SWIPES[k], g = k + 1 < N ? SWIPES[k + 1] - s : 0.3
        const u = prog(t, s - Math.min(0.05, g * 0.45), s + Math.min(0.2, g * 0.9))
        if (u > 0 && u < 1) { const e = Math.sin(Math.PI * u); tx -= 120 * e; ty -= 10 * e; tr -= 6 * e; tb += (g < 0.1 ? 5 : 2) * e }
      }
      tx -= 80 * dragK; tr -= 4 * dragK
      const away = ease.inOutCubic(prog(t, OFF - 0.25, OFF + 0.35))
      tx += 140 * away; ty += 520 * away
      thumb.style.transform = `translate(${PW / 2 - 140 + tx}px, ${CCY - PH / 2 + 250 + ty}px) rotate(${tr}deg)`
      thumb.firstElementChild.style.filter = `blur(${tb.toFixed(1)}px)`

      // ── screen off, light dies
      const offK = ease.inQuad(prog(t, OFF, OFF + 0.16))
      off.style.opacity = String(offK)
      const flick = 1 + 0.12 * Math.sin(t * 23) * (t < 1.1 ? 1 : 0.25)
      spill.style.opacity = String((0.85 + 0.15 * flick) * (1 - offK))

      // ── copy
      const out = 1 - ease.inOutQuad(prog(t, CAP_OUT, CAP_OUT + 0.3))
      c1.update(t, out); c2.update(t, out)
    },
  }
}

export const cues = [
  ...SWIPES.flatMap((s, k) => {
    const gap = k + 1 < N ? SWIPES[k + 1] - s : 0.2, fast = gap < 0.1
    if (fast && k % 2) return [['tick', s, 0.03]]
    return [['whoosh', s, Math.max(0.12, Math.min(0.3, gap * 1.2)), 0.06 + 0.03 * (k % 2)], ['tick', s, 0.04]]
  }),
  ['bell', CAP1 + 0.02, 220, 0.03, 1.8, 0],                // "312 swipes."
  ['bell', CAP2 + 0.02, 207.65, 0.03, 2.4, 0],             // "0 butterflies." (flat, a little sour)
  ['whoosh', DRAG.a, 0.5, 0.035],
  ['tick', DRAG.b - 0.05, 0.025],
  ['tick', OFF, 0.05],                                      // screen off — then near silence
  ['boom', OFF + 0.02, 0.1],
  ['riser', PAN.a - 0.1, PAN.b, 0.07],                       // look up
  ['whoosh', PAN.a + 0.1, PAN.b - PAN.a, 0.09],
]
