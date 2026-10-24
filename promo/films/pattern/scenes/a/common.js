// pattern · half a — shared bits: grain, captions, the "type" profile card (same red flags, every time).
// Everything is a pure function of t.
import { prog, ease, el } from '../../../../src/lib.js'
import { W, H, IMG, SANS, SERIF } from '../../../../src/scenes/common.js'
import { drawGrain } from '../../../sky.js'

export const BONE = '#efe6d6'
export const ROOM_BG = '#08090c'
export const GRAIN = 0.5
export const PHOTO = i => `${IMG}people/p${i}.jpg`
export const COLD_FILTER = 'grayscale(1) contrast(1.38) brightness(1.06)'
export const CAP_SHADOW = '0 2px 30px rgba(5,6,10,0.92), 0 0 2px rgba(5,6,10,0.7)'
export const FLAG_RED = '#c4545c'

// the type: dark tee, a chain, that look. Five different names.
export const PEOPLE = [
  { face: 4, name: 'Jun, 27' },
  { face: 2, name: 'Theo, 29' },
  { face: 6, name: 'Cole, 31' },
  { face: 11, name: 'Kofi, 30' },
  { face: 9, name: 'Dev, 26' },
]
export const FLAGS = ['not looking for labels', 'just got out of something', 'bad at texting lol']

/** the film-series grain (sky.js drawGrain) on an overlay canvas; same tile + offset per frame as half b */
export function grainLayer(parent, opacity = GRAIN, z = '4000', blend = 'overlay') {
  const c = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: blend, opacity, pointerEvents: 'none', zIndex: z }, parent)
  c.width = W; c.height = H
  const gx = c.getContext('2d')
  return { el: c, update(t, op) { if (op != null) c.style.opacity = String(op); drawGrain(gx, t) } }
}

/** words that land one by one (opacity, rise, de-blur); update(t, out) */
export function words(parent, text, style, at, gap = 0.1, dur = 0.22) {
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
export const capStyle = (size = 104) => ({ fontFamily: SERIF, fontStyle: 'italic', fontSize: size + 'px', lineHeight: 1.08, color: BONE, textShadow: CAP_SHADOW })

export function loadImage(src) {
  return new Promise(r => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(i); i.src = src })
}

// ── the profile card: body 520×830 (= card-profile body aspect 1254:2002), cold B&W photo, name, three red-flag chips
export const CARD_W = 520, CARD_H = 830
const CHIP_H = 54, CHIP_GAP = 10, CHIP_BOTTOM = 34
export const flagSvg = (col = FLAG_RED, s = 26) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}"><path d="M5.5 2.5 V21.5" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/><path d="M6.5 3.5 H18.5 L15.6 8.2 L18.5 12.9 H6.5 Z" fill="${col}"/></svg>`

export function makeProfileCard(parent, person) {
  const card = el('div', { position: 'absolute', left: -CARD_W / 2 + 'px', top: -CARD_H / 2 + 'px', width: CARD_W + 'px', height: CARD_H + 'px',
    borderRadius: '30px', overflow: 'hidden', background: '#1a1d24', boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset' }, parent)
  const photo = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 30%', filter: COLD_FILTER }, card)
  photo.src = PHOTO(person.face)
  el('div', { position: 'absolute', inset: 0, background: 'rgba(84,110,150,0.24)', mixBlendMode: 'color' }, card)
  el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(8,10,14,0.35) 0%, rgba(8,10,14,0) 14%, rgba(8,10,14,0) 38%, rgba(8,10,14,0.78) 64%, rgba(8,10,14,0.94) 100%)' }, card)
  const pips = el('div', { position: 'absolute', left: '22px', right: '22px', top: '20px', height: '5px', display: 'flex', gap: '8px' }, card)
  for (let i = 0; i < 4; i++) el('div', { flex: '1', borderRadius: '3px', background: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.32)' }, pips)
  const nameTop = CARD_H - CHIP_BOTTOM - 3 * CHIP_H - 2 * CHIP_GAP - 82
  el('div', { position: 'absolute', left: '32px', top: nameTop + 'px', fontFamily: SANS, fontWeight: 600, fontSize: '52px', color: '#f4f5f7', letterSpacing: '-0.01em' }, card, person.name)
  const chips = FLAGS.map((f, i) => {
    const top = CARD_H - CHIP_BOTTOM - (3 - i) * CHIP_H - (2 - i) * CHIP_GAP
    const chip = el('div', { position: 'absolute', left: '30px', top: top + 'px', height: CHIP_H + 'px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: '10px',
      padding: '0 22px 0 14px', borderRadius: CHIP_H / 2 + 'px', background: 'rgba(20,22,28,0.66)', border: '2px solid rgba(255,255,255,0.14)',
      fontFamily: SANS, fontWeight: 500, fontSize: '26px', color: '#e6e8ee', whiteSpace: 'nowrap' }, card)
    el('span', { display: 'inline-block', width: '26px', height: '26px', lineHeight: 0 }, chip, flagSvg())
    el('span', {}, chip, f)
    return chip
  })
  return { card, chips }
}
