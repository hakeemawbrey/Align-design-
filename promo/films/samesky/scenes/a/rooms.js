// samesky half a: the two lit windows, opened into rooms (DOM). Each room: a person alone behind glass,
// warm lamp (A) vs cold light (B); later both lit only by a phone, swiping.
import { el, clamp, lerp, prog, ease, rng } from '../../../../src/lib.js'
import { IMG, PEOPLE, SERIF, MONO, SANS, img } from '../../../../src/scenes/common.js'

export const RW = 500, RH = 600   // room size at full open (screen px)

export function makeRoom(parent, o) {
  // o: { src, pos: [ox, oy] object-position %, zoom, warm: bool, phoneSide: 'l'|'r', seed, cards: [srcs] }
  const box = el('div', { position: 'absolute', left: 0, top: 0, width: '10px', height: '10px', overflow: 'hidden', borderRadius: '3px', opacity: 0,
    boxShadow: '0 0 0 1px rgba(10,6,24,0.9)', willChange: 'transform' }, parent)
  const room = el('div', { position: 'absolute', left: 0, top: 0, width: RW + 'px', height: RH + 'px', transformOrigin: '0 0', background: o.warm ? '#1b1020' : '#0d0c22', isolation: 'isolate' }, box)
  const photoWrap = el('div', { position: 'absolute', inset: 0, overflow: 'hidden' }, room)
  const photo = img(photoWrap, o.src, { left: 0, top: 0, width: RW + 'px', height: RH + 'px', objectFit: 'cover', objectPosition: o.pos, transformOrigin: '50% 38%',
    filter: o.warm ? 'grayscale(1) sepia(0.35) saturate(1.2) hue-rotate(-12deg) brightness(1.12) contrast(1.75)' : 'grayscale(1) brightness(0.9) contrast(1.6)' })
  // grade: multiply a tint over the (monochrome) photo; the aura behind them becomes a dim lit wall
  el('div', { position: 'absolute', inset: 0, mixBlendMode: 'multiply', background: o.warm
    ? 'linear-gradient(180deg, rgb(250,206,186) 0%, rgb(215,150,145) 100%)'
    : 'linear-gradient(180deg, rgb(150,162,235) 0%, rgb(110,112,200) 100%)' }, room)
  // lamp (A) / moonlight from the window (B)
  const lamp = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', background: o.warm
    ? 'radial-gradient(70% 60% at 6% 62%, rgba(255,170,90,0.5), rgba(255,140,70,0.14) 50%, rgba(255,140,70,0) 80%)'
    : 'radial-gradient(70% 70% at 96% 8%, rgba(150,170,255,0.36), rgba(120,140,255,0.08) 55%, rgba(120,140,255,0) 85%)' }, room)
  // phone glow: cold, from below the frame on the phone side
  const phx = o.phoneSide === 'r' ? 74 : 26
  const glow = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0,
    background: `radial-gradient(60% 52% at ${phx}% 100%, rgba(140,170,255,0.62), rgba(110,140,255,0.2) 48%, rgba(110,140,255,0) 80%)` }, room)
  // the room falls off into darkness
  const dark = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(62% 58% at 50% 44%, rgba(8,5,20,0) 30%, rgba(8,5,20,0.55) 70%, rgba(8,5,20,0.88) 100%)' }, room)
  // curtain edge (A) / blind slats (B)
  if (o.warm) el('div', { position: 'absolute', left: 0, top: 0, width: '74px', height: RH + 'px', opacity: 0.9,
    background: 'linear-gradient(90deg, rgba(40,20,26,0.95), rgba(70,36,40,0.7) 40%, rgba(40,20,26,0.4) 70%, rgba(40,20,26,0)), repeating-linear-gradient(90deg, rgba(255,200,170,0.05) 0 6px, rgba(0,0,0,0.12) 6px 14px)' }, room)
  else el('div', { position: 'absolute', left: 0, top: 0, width: RW + 'px', height: '64px', opacity: 0.85,
    background: 'repeating-linear-gradient(180deg, rgba(20,18,44,0.95) 0 7px, rgba(150,160,230,0.12) 7px 9px)' }, room)

  // phone (generic UI): a dark slab with a card stack that swipes
  const PW = 156, PH = 320
  const phone = el('div', { position: 'absolute', left: (o.phoneSide === 'r' ? RW - PW - 40 : 40) + 'px', top: RH + 'px', width: PW + 'px', height: PH + 'px', borderRadius: '24px',
    background: '#07050f', boxShadow: '0 0 0 2px rgba(150,160,220,0.25), 0 0 40px 10px rgba(120,150,255,0.25)', transform: `rotate(${o.phoneSide === 'r' ? -6 : 6}deg)` }, room)
  const scr = el('div', { position: 'absolute', left: '7px', top: '7px', right: '7px', bottom: '7px', borderRadius: '18px', overflow: 'hidden', background: '#16123a' }, phone)
  el('div', { position: 'absolute', left: '50%', top: '8px', width: '40px', height: '9px', marginLeft: '-20px', borderRadius: '5px', background: '#07050f', zIndex: 5 }, scr)
  const cards = o.cards.map((src, i) => {
    const c = el('div', { position: 'absolute', left: '10px', top: '30px', right: '10px', height: '210px', borderRadius: '12px', overflow: 'hidden', background: '#222', zIndex: 10 - i,
      boxShadow: '0 4px 14px rgba(0,0,0,0.5)', transformOrigin: '50% 120%' }, scr)
    img(c, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.35) brightness(1.05) contrast(1.15)' })
    el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.7))' }, c)
    el('div', { position: 'absolute', left: '9px', bottom: '7px', width: '58px', height: '7px', borderRadius: '4px', background: 'rgba(255,255,255,0.75)' }, c)
    el('div', { position: 'absolute', left: '9px', bottom: '19px', width: '38px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,0.4)' }, c)
    return c
  })
  // two round buttons under the stack
  ;[0.3, 0.7].forEach(fx => el('div', { position: 'absolute', left: `calc(${fx * 100}% - 15px)`, top: '256px', width: '30px', height: '30px', borderRadius: '50%', boxShadow: 'inset 0 0 0 1.5px rgba(220,225,255,0.45)' }, scr))
  // screen light that washes over the face
  const scrLight = el('div', { position: 'absolute', inset: 0, background: 'rgba(170,190,255,0.06)', mixBlendMode: 'screen' }, scr)

  // glass: a reflection sweep + reflected city lights
  const glass = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0.9,
    background: 'linear-gradient(118deg, rgba(180,170,255,0) 30%, rgba(190,180,255,0.07) 42%, rgba(180,170,255,0) 52%), linear-gradient(118deg, rgba(180,170,255,0) 58%, rgba(190,180,255,0.045) 63%, rgba(180,170,255,0) 70%)' }, room)
  const refl = el('canvas', { position: 'absolute', left: 0, top: 0, width: RW + 'px', height: RH + 'px', mixBlendMode: 'screen', opacity: 0.55 }, room)
  refl.width = RW; refl.height = RH
  { const g = refl.getContext('2d'), r = rng(o.seed)
    for (let i = 0; i < 40; i++) { const x = r() * RW, y = RH * (0.55 + r() * 0.45), s = 2 + r() * 7, warm = r() < 0.7
      const gr = g.createRadialGradient(x, y, 0, x, y, s); gr.addColorStop(0, warm ? 'rgba(255,200,140,0.35)' : 'rgba(160,180,255,0.3)'); gr.addColorStop(1, 'rgba(0,0,0,0)')
      g.fillStyle = gr; g.fillRect(x - s, y - s, s * 2, s * 2) } }
  // window frame: outer frame, one mullion, a sill
  const frame = el('div', { position: 'absolute', inset: 0, boxShadow: 'inset 0 0 0 12px #0b0720, inset 0 0 0 13.5px rgba(170,160,230,0.16)' }, room)
  el('div', { position: 'absolute', top: 0, height: RH + 'px', width: '12px', left: (o.phoneSide === 'r' ? 70 : RW - 82) + 'px', background: '#0b0720', boxShadow: '1px 0 0 rgba(170,160,230,0.14)' }, room)
  el('div', { position: 'absolute', left: 0, right: 0, top: (RH * 0.16) + 'px', height: '10px', background: '#0b0720', boxShadow: '0 1px 0 rgba(170,160,230,0.12)' }, room)
  // lit-window wash (matches the tiny lit window on the skyline) — fades as the room opens
  const wash = el('div', { position: 'absolute', inset: 0 }, room)
  void frame; void dark

  return {
    box,
    /** rect: screen rect of the box; open: 0 (lit window) … 1 (room); lt: local time */
    update(t, { rect, open, alpha, phoneIn, swipes, push, phoneLight, lampOn, washCol }) {
      wash.style.background = washCol
      box.style.left = rect.x + 'px'; box.style.top = rect.y + 'px'; box.style.width = rect.w + 'px'; box.style.height = rect.h + 'px'
      box.style.opacity = String(alpha)
      box.style.boxShadow = `0 0 0 1px rgba(10,6,24,0.9), 0 0 ${Math.round(70 * open)}px ${Math.round(14 * open)}px ${washCol.replace('rgba', 'rgba').replace(/,1\)$/, ',' + (0.16 * open).toFixed(3) + ')')}`
      box.style.borderRadius = lerp(1, 4, open) + 'px'
      const s = Math.max(rect.w / RW, rect.h / RH)
      room.style.transform = `translate(${(rect.w - RW * s) / 2}px, ${(rect.h - RH * s) / 2}px) scale(${s})`
      wash.style.opacity = String(1 - ease.inOutQuad(prog(open, 0.015, 0.3)))
      photo.style.transform = `scale(${o.zoom * (1 + 0.07 * push)})`
      lamp.style.opacity = String(lampOn)
      glow.style.opacity = String(phoneLight)
      phone.style.top = (RH - 236 * ease.outCubic(phoneIn)) + 'px'
      phone.style.opacity = String(clamp(phoneIn * 3))
      scrLight.style.opacity = String(0.8 + 0.2 * Math.sin(t * 9))
      // swipes: each entry the time card i leaves (alternating directions, mostly left)
      cards.forEach((c, i) => {
        const ts = swipes[i]
        const p = ts == null ? 0 : ease.inCubic(prog(t, ts, ts + 0.32))
        const dir = i % 3 === 2 ? 1 : -1
        c.style.transform = `translateX(${dir * p * 190}px) rotate(${dir * p * 22}deg)`
        c.style.opacity = String(1 - prog(t, ts ?? 99, (ts ?? 99) + 0.3))
      })
      glass.style.transform = `translateX(${(t - 4) * -6}px)`
      refl.style.transform = `translateX(${(t - 4) * -4}px)`
    },
  }
}
