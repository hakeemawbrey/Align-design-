// photos · P2 THE HOOK (0–3.3). "Photos lie."
// One generic profile photo (p12) glitches through the lies, a new "photo" every ~0.45s, cut on 2-frame RGB-split
// slice glitches:
//   0.00 GOOD ANGLE   (high-angle selfie crop, tilted)
//   0.45 FILTER       (peach filter: saturated, warm, softened)
//   0.90 2019         (mirrored, faded, orange date stamp '19 07 04)
//   1.35 RETOUCHED    (beauty sliders sweep to max 1.42–1.95: smooth / slim / eyes / glow)
//   2.05–2.55 the photos flicker every 2 frames, faster, glitchier · 2.55–2.85 it breaks apart
//   2.80–3.20 the face blurs away into its own aura glow (the blind card lands over it from 2.95, see p3)
// Caption "Photos lie." (Inter 500 96px, "lie." rose Garamond italic): words 0.06 / 0.22 → fully on 0.42, out 2.62–2.80.
// Left: RETOUCH slider panel · right: the lies stack up as mono tags. Generic UI only (pagination dashes, "Dani, 26").
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { IMG, img } from '../../../src/scenes/common.js'
import { W, H, SANS, MONO, BONE, ROSE, CARD, BODY_W, BODY_R, FI, hash, wordLine, ITAL } from './kit.js'

export const HOOK = { states: [0, 0.45, 0.9, 1.35], flick: 2.05, brk: 2.55, dis: 2.8, end: 3.3 }
const S = HOOK.states
const NSTRIP = 10, SH = CARD.bh / NSTRIP

/** which photo is up at t (0 angle · 1 filter · 2 2019 · 3 retouch) and its local progress */
function stateAt(t) {
  if (t >= HOOK.flick && t < HOOK.brk) {
    const fi = FI(t), step = fi < FI(2.3) ? 3 : 2
    return { s: Math.floor(hash(Math.floor(fi / step) + 77) * 4), u: 1 }
  }
  if (t >= HOOK.brk) return { s: 3, u: 1 }
  let s = 0
  for (let i = 0; i < 4; i++) if (t >= S[i]) s = i
  return { s, u: prog(t, S[s], s < 3 ? S[s + 1] : HOOK.flick) }
}
/** glitch amount 0..~1.6 */
function glitchAt(t) {
  const fi = FI(t)
  for (const b of S.slice(1).concat([HOOK.flick])) { const d = fi - FI(b); if (d === 0) return 1; if (d === 1) return 0.55 }
  if (t >= HOOK.flick && t < HOOK.brk) return hash(fi * 3 + 1) < lerp(0.35, 0.7, prog(t, HOOK.flick, HOOK.brk)) ? 0.45 + 0.5 * hash(fi * 5) : 0
  if (t >= HOOK.brk && t < HOOK.dis) return lerp(0.7, 1.6, prog(t, HOOK.brk, HOOK.dis))
  if (t >= HOOK.dis) return 1.6 * (1 - ease.outQuad(prog(t, HOOK.dis, 3.02)))
  return 0
}
const retouch = (t) => ease.inOutCubic(prog(t, 1.42, 1.95))

function look(s, u, t) {
  if (s === 0) return { tf: `translate(24px, ${lerp(150, 136, u)}px) rotate(11deg) scale(${lerp(1.85, 1.92, u)})`, f: 'saturate(1.05) contrast(1.08) brightness(1.04)', pos: '50% 10%' }
  if (s === 1) return { tf: `rotate(3deg) scale(${lerp(1.16, 1.2, u)})`, f: 'saturate(1.9) hue-rotate(-16deg) brightness(1.16) contrast(0.86) blur(0.5px)', pos: '50% 35%' }
  if (s === 2) return { tf: `scaleX(-1) translateY(-10px) scale(${lerp(1.04, 1.08, u)})`, f: 'sepia(0.55) saturate(0.75) contrast(1.12) brightness(0.9)', pos: '50% 30%' }
  const r = t >= HOOK.flick ? 1 : retouch(t)
  return { tf: `scale(1.28) scaleX(${lerp(1, 0.9, r)}) scaleY(${lerp(1, 1.03, r)})`, f: `blur(${(1.6 * r).toFixed(2)}px) brightness(${lerp(1, 1.14, r)}) saturate(${lerp(1, 1.35, r)}) contrast(${lerp(1, 0.9, r)})`, pos: '50% 30%' }
}

export default async function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, stage)

  // ── the photo card (generic UI)
  const card = el('div', { position: 'absolute', left: (CARD.cx - BODY_W / 2) + 'px', top: (CARD.cy - CARD.bh / 2) + 'px', width: BODY_W + 'px', height: CARD.bh + 'px',
    borderRadius: BODY_R + 'px', overflow: 'hidden', background: '#1a0f33', boxShadow: '0 30px 70px rgba(8,4,24,0.55), inset 0 0 0 1px rgba(255,255,255,0.08)' }, root)
  const strips = Array.from({ length: NSTRIP }, (_, i) => {
    const s = el('div', { position: 'absolute', left: 0, top: (i * SH) + 'px', width: BODY_W + 'px', height: (SH + 0.5) + 'px', overflow: 'hidden' }, card)
    const wrap = el('div', { position: 'absolute', left: 0, top: (-i * SH) + 'px', width: BODY_W + 'px', height: CARD.bh + 'px' }, s)
    const ph = img(wrap, IMG + 'people/p12.jpg', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', transformOrigin: '50% 40%' })
    return { wrap, ph }
  })
  const tint = el('div', { position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(255,150,120,0.55), rgba(255,90,160,0.35))', mixBlendMode: 'soft-light', opacity: 0 }, card)
  const glow = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(60% 45% at 50% 38%, rgba(255,240,235,0.55), rgba(255,240,235,0) 70%)', mixBlendMode: 'screen', opacity: 0 }, card)
  const old = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(80% 70% at 50% 45%, rgba(40,20,0,0) 50%, rgba(40,20,0,0.55) 100%)', opacity: 0 }, card)
  const chrome = el('div', { position: 'absolute', inset: 0 }, card)
  el('div', { position: 'absolute', left: 0, right: 0, bottom: 0, height: '42%', background: 'linear-gradient(180deg, rgba(10,6,20,0) 0%, rgba(10,6,20,0.78) 100%)' }, chrome)
  const dashes = Array.from({ length: 6 }, (_, i) => el('div', { position: 'absolute', top: '14px', height: '4px', borderRadius: '2px', background: '#fff', opacity: 0.35,
    left: (16 + i * ((BODY_W - 32 + 6) / 6)) + 'px', width: ((BODY_W - 32 + 6) / 6 - 6) + 'px' }, chrome))
  el('div', { position: 'absolute', left: '26px', bottom: '30px', fontFamily: SANS, fontWeight: 600, fontSize: '40px', color: '#fff', letterSpacing: '-0.01em' }, chrome, 'Dani, 26')
  const stamp = el('div', { position: 'absolute', right: '26px', bottom: '96px', fontFamily: MONO, fontWeight: 700, fontSize: '30px', letterSpacing: '0.12em', color: '#ffa648',
    textShadow: '0 0 8px rgba(255,140,40,0.9), 0 0 2px rgba(255,200,120,0.9)', opacity: 0 }, card, '’19 07 04')

  // ── left: RETOUCH sliders
  const panel = el('div', { position: 'absolute', left: '286px', top: '286px', width: '340px', opacity: 0 }, root)
  el('div', { fontFamily: MONO, fontSize: '26px', letterSpacing: '0.3em', color: 'rgba(239,230,214,0.75)', marginBottom: '20px' }, panel, 'RETOUCH')
  const SL = ['SMOOTH', 'SLIM', 'EYES', 'GLOW']
  const sliders = SL.map((name) => {
    const row = el('div', { position: 'relative', height: '84px' }, panel)
    el('div', { position: 'absolute', left: 0, top: 0, fontFamily: MONO, fontSize: '30px', letterSpacing: '0.16em', color: 'rgba(239,230,214,0.92)' }, row, name)
    const val = el('div', { position: 'absolute', right: 0, top: 0, fontFamily: MONO, fontSize: '30px', color: 'rgba(239,230,214,0.92)' }, row, '0')
    el('div', { position: 'absolute', left: 0, top: '52px', width: '340px', height: '3px', background: 'rgba(239,230,214,0.25)' }, row)
    const fillE = el('div', { position: 'absolute', left: 0, top: '52px', width: '0px', height: '3px', background: ROSE }, row)
    const knob = el('div', { position: 'absolute', left: 0, top: '45px', width: '17px', height: '17px', marginLeft: '-8.5px', borderRadius: '50%', background: BONE, boxShadow: '0 0 10px rgba(255,143,177,0.7)' }, row)
    return { val, fillE, knob }
  })
  const BASE = [0.16, 0.08, 0.2, 0.28], MAX = [1, 0.92, 0.86, 1]
  const sliderVal = (i, t) => {
    if (t >= HOOK.flick) return t < HOOK.brk ? lerp(0.3, 1, hash(Math.floor(FI(t) / 2) * 11 + i)) : MAX[i]
    let v = BASE[i]
    if (i === 3) v = lerp(v, 0.9, ease.inOutCubic(prog(t, 0.5, 0.75)))
    if (i === 0) v = lerp(v, 0.5, ease.inOutCubic(prog(t, 0.5, 0.75)))
    const k = ease.inOutCubic(prog(t, 1.42 + i * 0.08, 1.75 + i * 0.08))
    return lerp(v, MAX[i], k)
  }

  // ── right: the lies stack up
  const TAGS = ['GOOD ANGLE', 'FILTER · PEACH', 'TAKEN IN 2019', 'RETOUCHED']
  const tagBox = el('div', { position: 'absolute', left: '1248px', top: '300px' }, root)
  const tags = TAGS.map((txt, i) => {
    const row = el('div', { position: 'relative', height: '82px', whiteSpace: 'nowrap', opacity: 0 }, tagBox)
    const sq = el('div', { position: 'absolute', left: 0, top: '14px', width: '16px', height: '16px', background: BONE }, row)
    const tx = el('div', { position: 'absolute', left: '36px', top: 0, fontFamily: MONO, fontSize: '39px', lineHeight: '46px', letterSpacing: '0.1em', color: BONE }, row, txt)
    return { row, sq, tx }
  })

  // ── caption
  const cap = wordLine(root, [['Photos'], ['lie.', ITAL]], { top: '842px', fontFamily: SANS, fontWeight: 500, fontSize: '96px', color: BONE, letterSpacing: '-0.015em' }, 0.06, 0.16)

  return {
    start: 0, end: HOOK.end, root,
    update(t) {
      const fi = FI(t)
      const { s, u } = stateAt(t)
      const L = look(s, u, t)
      const g = glitchAt(t)
      const dis = ease.inOutQuad(prog(t, HOOK.dis, 3.2))
      const fil = L.f + (dis > 0 ? ` blur(${(30 * dis).toFixed(1)}px) brightness(${lerp(1, 1.3, dis)}) saturate(${lerp(1, 1.5, dis)})` : '')
      strips.forEach(({ wrap, ph }, i) => {
        ph.style.transform = L.tf
        ph.style.filter = fil
        ph.style.objectPosition = L.pos
        const on = g > 0 && hash(fi * 31 + i) < 0.3 + 0.25 * Math.min(1, g)
        wrap.style.transform = on ? `translateX(${Math.round((hash(fi * 17 + i * 3) - 0.5) * 2 * 64 * g)}px)` : 'none'
      })
      card.style.filter = g > 0.05 ? `drop-shadow(${(9 * g).toFixed(1)}px 0 0 rgba(255,60,130,0.55)) drop-shadow(${(-9 * g).toFixed(1)}px 0 0 rgba(60,220,255,0.5))` : 'none'
      card.style.transform = g > 0.05 ? `translateX(${Math.round((hash(fi * 7 + 2) - 0.5) * 14 * g)}px)` : 'none'
      tint.style.opacity = String(s === 1 ? 0.9 : 0)
      old.style.opacity = String(s === 2 ? 1 : 0)
      stamp.style.opacity = String(s === 2 ? 1 : 0)
      glow.style.opacity = String(s === 3 ? 0.5 * (t >= HOOK.flick ? 1 : retouch(t)) + 0.5 * dis : 0.5 * dis)
      const act = t >= HOOK.flick && t < HOOK.brk ? Math.floor(hash(Math.floor(fi / 2) + 5) * 6) : Math.min(s, 5)
      dashes.forEach((d, i) => { d.style.opacity = String(i === act ? 0.95 : 0.35) })
      chrome.style.opacity = String(1 - prog(t, 2.82, 2.96))
      root.style.opacity = String(1 - prog(t, 3.12, 3.3))
      // sliders
      const pOut = 1 - ease.inOutQuad(prog(t, 2.6, 2.8))
      panel.style.opacity = String(0.95 * ease.outQuad(prog(t, 0.08, 0.4)) * pOut)
      panel.style.transform = `translateX(${(1 - ease.outCubic(prog(t, 0.08, 0.5))) * -24}px)`
      sliders.forEach((sl, i) => {
        const v = sliderVal(i, t)
        sl.fillE.style.width = (340 * v) + 'px'
        sl.knob.style.left = (340 * v) + 'px'
        sl.val.textContent = String(Math.round(v * 100))
      })
      // tags: each lights with its photo, then stays (dimmed) so the lies accumulate
      tags.forEach((tg, i) => {
        const a = ease.outCubic(prog(t, S[i] + 0.03, S[i] + 0.18))
        const active = t < HOOK.flick ? s === i : t < HOOK.brk ? s === i : false
        tg.row.style.opacity = String(a * (active ? 1 : 0.9) * pOut)
        tg.row.style.transform = `translateX(${(1 - a) * 22}px)`
        tg.sq.style.background = active ? ROSE : BONE
        tg.sq.style.boxShadow = active ? '0 0 12px rgba(255,143,177,0.9)' : 'none'
      })
      // caption: in by 0.55, a whisper of RGB split on the glitch frames, glitches out with the break
      cap.update(t, 1 - ease.inQuad(prog(t, 2.62, 2.8)))
      const cg = Math.min(1, g)
      cap.box.style.textShadow = cg > 0.05 ? `${(4 * cg).toFixed(1)}px 0 rgba(255,60,130,0.55), ${(-4 * cg).toFixed(1)}px 0 rgba(60,220,255,0.5)` : 'none'
      cap.box.style.transform = t > HOOK.brk && cg > 0.3 ? `translateX(${Math.round((hash(fi * 13) - 0.5) * 18 * cg)}px)` : 'none'
    },
  }
}
