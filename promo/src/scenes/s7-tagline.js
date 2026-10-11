import { clamp, lerp, prog, ease, tw, el, C, TypeLine } from '../lib.js'
import { W, H, A, SANS, fill, img, Ticks } from "./common.js"

// ──────────────────────────────────────── S7 · gradient tagline + app screens
// Timing (sound): colour rises 22.40–23.00 · ticks open 22.75 · typing 22.78, perChar 0.028
// (complete ~23.68) · tagline out 24.50 · phone lands 24.80–25.70 · aura bloom 25.45 ·
// second phone (talk cards) slides in 26.00–26.55 · exit (shrink + to void) 26.66–26.92.
const T_TYPE = 22.78, PER = 0.028, T_OUT = 24.5
const T_LAND = 24.8, T_LAND_END = 25.7
const T_BEAT = 26.0, T_BEAT_END = 26.55
const T_EXIT = 26.66, T_EXIT_END = 26.92

export function sceneTagline(stage, assets) {
  // transparent root: s6's blurring deck stays visible underneath while colour climbs in
  const root = fill(stage, { background: 'transparent' })
  const under = fill(root, { background: C.paper, opacity: 0 })
  // saturated field: amber bottom-left, rub/magenta behind centre, plum upper-right (no gold)
  const blobs = [
    { c: '154,123,224', x: 0.10, y: 0.38, r: 620, a: 0.85 },
    { c: '180,92,255', x: 0.82, y: 0.40, r: 700, a: 0.95 },
    { c: '242,154,74', x: 0.14, y: 0.98, r: 820, a: 1 },
    { c: '236,64,112', x: 0.86, y: 0.98, r: 760, a: 1 },
    { c: '255,143,177', x: 0.30, y: 0.56, r: 560, a: 0.9 },
    { c: '204,58,140', x: 0.52, y: 0.54, r: 600, a: 1 },
    { c: '232,98,138', x: 0.62, y: 0.80, r: 640, a: 0.95 },
  ].map(b => ({ ...b, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.55}) 50%, rgba(${b.c},0) 100%)` }, root) }))
  // pale wash only across the top third
  const wash = fill(root, { background: 'linear-gradient(180deg, rgba(235,229,220,0.92) 0%, rgba(235,229,220,0.55) 16%, rgba(235,229,220,0) 32%)' })
  const tag = new TypeLine(root, 'Dating, dealt by the stars', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 400, fontSize: '48px', letterSpacing: '-0.01em',
    textShadow: '0 2px 30px rgba(140,30,90,0.35), 0 1px 3px rgba(120,20,70,0.25)',
  }, { perChar: PER, fade: 0.2, final: '#fffaf2', accent: ['#ffffff', '#ffe3c4', '#ffd6e4'] })
  const ticks = new Ticks(root, C.ink, 9)

  // phones in perspective; handles + dots live inside the same stacking context
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '1800px' }, root)
  const aura = el('div', { position: 'absolute', left: (W / 2 - 420) + 'px', top: (H / 2 - 520) + 'px', width: '840px', height: '1040px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(186,150,255,0.95), rgba(180,92,255,0.45) 55%, rgba(180,92,255,0) 100%)', opacity: 0, zIndex: 1 }, persp)
  const PW = 360, PH = 779
  function phone(src, z) {
    const g = el('div', { position: 'absolute', left: (W / 2 - PW / 2) + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, zIndex: z }, persp)
    const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '46px', overflow: 'hidden', background: C.canvas, boxShadow: '0 50px 110px rgba(60,14,70,0.45), 0 0 0 1px rgba(255,255,255,0.4)' }, g)
    img(scr, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
    const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 7) + 'px', top: (y * PH - 7) + 'px', width: '14px', height: '14px', background: C.ink, boxShadow: '0 0 0 1.5px rgba(255,250,242,0.9)', opacity: 0 }, g))
    return { g, hs }
  }
  const p1 = phone(A + 'screen-match.png', 3)
  const p2 = phone(A + 'screen-chat-cards.png', 4)
  const dots = [C.violet, C.spark].map(c => el('div', { position: 'absolute', width: '16px', height: '16px', borderRadius: '50%', background: c, boxShadow: `0 0 18px ${c}, 0 0 4px ${c}` }, persp))
  const dark = fill(root, { background: C.void, opacity: 0, zIndex: 5 })

  return {
    start: 22.4, end: 27.0, root,
    update(t) {
      under.style.opacity = String(prog(t, 22.55, 22.75))
      const rise = lerp(900, 0, ease.outCubic(prog(t, 22.4, 23.0)))
      blobs.forEach((b, i) => {
        const x = b.x * W + Math.sin(t * 0.6 + i * 1.7) * 90 - b.r
        const y = b.y * H + Math.cos(t * 0.5 + i) * 60 - b.r + rise * (1 + i * 0.04)
        b.e.style.transform = `translate(${x}px, ${y}px)`
      })
      wash.style.opacity = String(prog(t, 22.5, 22.9))
      tag.update(t - T_TYPE, { out: T_OUT - T_TYPE })
      const to = ease.outCubic(prog(t, 22.75, 23.3))
      ticks.update(W / 2, H / 2, lerp(140, 700, to), lerp(70, 104, to), prog(t, 22.75, 22.8) * (1 - prog(t, 24.55, 24.72)))

      // phone 1 lands, settles flat
      const L = ease.spring(prog(t, T_LAND, T_LAND_END), 0.05)
      const flat = ease.inOutCubic(prog(t, T_LAND_END, 26.4))
      const B = ease.inOutCubic(prog(t, T_BEAT, T_BEAT_END))
      const X = ease.inOutQuad(prog(t, T_EXIT, T_EXIT_END))
      const exitS = lerp(1, 0.92, ease.outCubic(prog(t, T_EXIT, T_EXIT_END)))
      const ty = lerp(150, 0, L)
      const s1 = lerp(0.55, 1, L) * lerp(1, 0.86, B) * exitS
      const bloom = tw(t, [[25.3, 0], [25.48, 1, ease.outQuad], [25.95, 0, ease.inOutQuad]])
      const rx1 = lerp(38, 5, L) * (1 - flat), ry1 = lerp(-34, -6, L) * (1 - flat) + 8 * B, rz1 = lerp(-14, -2, L) * (1 - flat)
      p1.g.style.opacity = String(prog(t, T_LAND, T_LAND + 0.18))
      p1.g.style.transform = `translateX(${-230 * B * exitS}px) translateY(${ty}px) rotateX(${rx1}deg) rotateY(${ry1}deg) rotateZ(${rz1}deg) scale(${s1 * (1 + 0.03 * bloom)})`
      const hp = prog(t, T_LAND + 0.05, T_LAND + 0.15) * (1 - prog(t, 25.9, 26.1))
      p1.hs.forEach(h => { h.style.opacity = String(hp) })
      aura.style.opacity = String(bloom * 0.9 + 0.25 * prog(t, 25.5, 25.9) * (1 - B))
      aura.style.transform = `translateX(${-230 * B}px) scale(${lerp(0.85, 1.12, bloom)})`

      // second beat: talk cards in chat slide in from the right
      const s2 = 0.86 * exitS
      p2.g.style.opacity = String(prog(t, T_BEAT, T_BEAT + 0.15))
      p2.g.style.transform = `translateX(${lerp(900, 230, B) * exitS}px) translateY(${lerp(60, 0, B)}px) rotateY(${lerp(-30, -8, B)}deg) rotateZ(${lerp(6, 0, B)}deg) scale(${s2})`
      const hp2 = prog(t, T_BEAT_END - 0.05, T_BEAT_END + 0.05) * (1 - prog(t, T_EXIT, T_EXIT + 0.1))
      p2.hs.forEach(h => { h.style.opacity = String(hp2) })

      // orbiting dots: behind phones on the upper half of the ellipse
      const rxo = lerp(330, 560, B), ryo = lerp(470, 490, B)
      dots.forEach((d, i) => {
        const a = t * 1.3 + i * Math.PI + 0.6
        const sa = Math.sin(a)
        d.style.left = (W / 2 + Math.cos(a) * rxo * exitS - 8) + 'px'
        d.style.top = (H / 2 + ty + sa * ryo * exitS - 8) + 'px'
        d.style.zIndex = sa < 0 ? '2' : '6'
        d.style.transform = `scale(${lerp(0.75, 1.1, (sa + 1) / 2)})`
        d.style.opacity = String(prog(t, 25.1, 25.4) * (1 - X))
      })
      dark.style.opacity = String(X)
    },
  }
}
