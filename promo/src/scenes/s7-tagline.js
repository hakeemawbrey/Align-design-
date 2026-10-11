import { clamp, lerp, prog, ease, tw, el, C, TypeLine } from '../lib.js'
import { W, H, A, SANS, SERIF, MONO, fill, img, Ticks } from "./common.js"

// ──────────────────────────────────────── S7 · gradient tagline + payoff beats
// Timing (sound): colour rises 22.40–23.00 · ticks open 22.72 · typing 22.72, perChar 0.024
// (complete ~23.44, held to 24.15) · tagline out 24.15–24.30 ·
// beat A  phone (match) lands 24.20 (opaque by 24.25, settles ~24.62) · caption A pops 24.48 ·
// beat B  swap 25.30: match phone exits left, chat phone slides in, lands ~25.78 · caption B pops 25.74 ·
// exit is main.js stair wipe 26.58–26.94 (no fade here; colours hold until covered).
const T_TYPE = 22.72, PER = 0.024, T_OUT = 24.15
const T_A = 24.2, T_A_END = 24.62
const T_SW = 25.3, T_B_END = 25.8
const CAP_A = 24.48, CAP_B = 25.74

const PH = 880, PW = Math.round(PH * 1170 / 2532) // 407
const AX = 690, BX = 1280 // resting phone centres

export function sceneTagline(stage, assets) {
  // transparent root: s6's blurring deck stays visible underneath while colour climbs in
  const root = fill(stage, { background: 'transparent' })
  const under = fill(root, { background: C.paper, opacity: 0 })
  // saturated field, violet/lilac led, pink + a touch of amber as accents (no gold)
  const blobs = [
    { c: '201,166,255', x: 0.10, y: 0.36, r: 640, a: 0.9 },
    { c: '180,92,255', x: 0.84, y: 0.36, r: 720, a: 0.95 },
    { c: '154,123,224', x: 0.46, y: 0.56, r: 720, a: 1 },
    { c: '242,154,74', x: 0.04, y: 1.04, r: 520, a: 0.75 },
    { c: '255,143,177', x: 0.24, y: 0.96, r: 700, a: 0.9 },
    { c: '232,98,138', x: 0.86, y: 0.98, r: 760, a: 1 },
    { c: '112,66,196', x: 0.52, y: 0.52, r: 520, a: 0.7 },
    { c: '204,72,160', x: 0.64, y: 0.84, r: 560, a: 0.75 },
  ].map(b => ({ ...b, e: el('div', { position: 'absolute', width: b.r * 2 + 'px', height: b.r * 2 + 'px', borderRadius: '50%', background: `radial-gradient(closest-side, rgba(${b.c},${b.a}), rgba(${b.c},${b.a * 0.55}) 50%, rgba(${b.c},0) 100%)` }, root) }))
  // pale wash only across the top band
  const wash = fill(root, { background: 'linear-gradient(180deg, rgba(235,229,220,0.9) 0%, rgba(235,229,220,0.5) 14%, rgba(235,229,220,0) 28%)' })

  const TS = 80
  const tag = new TypeLine(root, 'Dating, dealt by the stars', {
    left: '50%', top: '50%', transform: 'translate(-50%,-50%)', fontFamily: SANS, fontWeight: 500, fontSize: TS + 'px', letterSpacing: '-0.02em', lineHeight: 1,
    textShadow: '0 2px 34px rgba(46,16,96,0.5), 0 1px 3px rgba(40,10,80,0.35)',
  }, { perChar: PER, fade: 0.12, final: '#fff6ea', accent: ['#ffffff', '#ffe3c4', '#ecdcff'] })
  const ticks = new Ticks(root, C.ink, 16)
  let tagW = 0

  // phones in perspective; handles + sparks live inside each phone's transform
  const persp = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', perspective: '2000px' }, root)
  const aura = el('div', { position: 'absolute', left: (AX - 460) + 'px', top: (H / 2 - 560) + 'px', width: '920px', height: '1120px', borderRadius: '50%', background: 'radial-gradient(closest-side, rgba(214,190,255,0.9), rgba(180,120,255,0.4) 55%, rgba(180,92,255,0) 100%)', opacity: 0, zIndex: 1 }, persp)
  function phone(src, z, sparkPos) {
    const g = el('div', { position: 'absolute', left: -PW / 2 + 'px', top: (H / 2 - PH / 2) + 'px', width: PW + 'px', height: PH + 'px', opacity: 0, zIndex: z, willChange: 'transform' }, persp)
    const scr = el('div', { position: 'absolute', inset: 0, borderRadius: '52px', overflow: 'hidden', background: C.canvas, boxShadow: '0 60px 120px rgba(40,10,70,0.5), 0 18px 40px rgba(40,10,70,0.3), 0 0 0 1.5px rgba(255,255,255,0.35)' }, g)
    img(scr, src, { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover' })
    const hs = [[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => el('div', { position: 'absolute', left: (x * PW - 8) + 'px', top: (y * PH - 8) + 'px', width: '16px', height: '16px', background: C.ink, boxShadow: '0 0 0 2px rgba(255,250,242,0.9)', opacity: 0 }, g))
    // small gold ✦ accents just outside the screen edge (never over the UI)
    const sp = sparkPos.map(([x, y, s]) => el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '60px', height: '60px', marginLeft: '-30px', marginTop: '-30px', textAlign: 'center', lineHeight: '60px', fontSize: s + 'px', color: C.gold, textShadow: '0 0 16px rgba(242,199,92,0.9), 0 0 3px rgba(120,60,10,0.6)', opacity: 0 }, g, '✦'))
    return { g, hs, sp }
  }
  const pA = phone(A + 'screen-match.png', 3, [[-64, PH * 0.2, 44], [PW + 54, PH * 0.72, 32]])
  const pB = phone(A + 'screen-chat-cards.png', 4, [[PW + 60, PH * 0.16, 44], [-56, PH * 0.8, 32]])

  function caption(x, align, eyebrow, line) {
    const box = el('div', { position: 'absolute', top: (H / 2 - 74) + 'px', [align]: x + 'px', textAlign: align, opacity: 0, zIndex: 6, isolation: 'isolate' }, root)
    el('div', { position: 'absolute', left: '-140px', right: '-140px', top: '-90px', bottom: '-90px', background: 'radial-gradient(closest-side, rgba(58,22,108,0.32), rgba(58,22,108,0.14) 55%, rgba(58,22,108,0) 100%)', zIndex: -1 }, box)
    el('div', { fontFamily: MONO, fontSize: '20px', letterSpacing: '0.26em', color: 'rgba(255,246,234,0.85)', textShadow: '0 1px 12px rgba(46,16,96,0.55)', marginBottom: '14px' }, box, eyebrow)
    el('div', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '78px', lineHeight: 1.05, color: '#fff6ea', whiteSpace: 'nowrap', textShadow: '0 2px 30px rgba(46,16,96,0.55), 0 1px 3px rgba(40,10,80,0.4)' }, box, line)
    return box
  }
  const capA = caption(AX + PW / 2 + 120, 'left', 'IT’S MUTUAL', 'You both aligned.')
  const capB = caption(W - (BX - PW / 2 - 110), 'right', 'THE TALK DECK', 'Then you talk in cards.')

  function capStyle(box, t, t0, t1, dir) {
    const i = ease.outCubic(prog(t, t0, t0 + 0.28))
    const o = ease.inQuad(prog(t, t1, t1 + 0.14))
    box.style.opacity = String(Math.min(prog(t, t0, t0 + 0.12), 1 - o))
    box.style.transform = `translateX(${lerp(36 * dir, 0, i) - 40 * dir * o}px)`
  }

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

      // tagline
      if (!tagW) tagW = tag.root.offsetWidth
      tag.update(t - T_TYPE)
      const tOut = ease.inQuad(prog(t, T_OUT, T_OUT + 0.15))
      tag.root.style.opacity = String(1 - tOut)
      tag.root.style.transform = `translate(-50%, calc(-50% - ${tOut * 40}px))`
      const to = ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.7))
      ticks.update(W / 2, H / 2 - tOut * 40, lerp(220, tagW + 120, to), lerp(110, 150, to), prog(t, T_TYPE, T_TYPE + 0.05) * (1 - tOut))

      // ── beat A: match phone falls into place
      const La = ease.outQuart(prog(t, T_A, T_A_END + 0.1)), Sa = ease.spring(prog(t, T_A, T_A_END + 0.3), 0.04)
      const hold = Math.sin((t - T_A) * 1.6)
      const Xa = ease.inOutCubic(prog(t, T_SW, T_SW + 0.45))
      const ax = lerp(AX, -520, Xa)
      const sA = lerp(0.7, 1, Sa) * (1 + 0.012 * prog(t, T_A_END, T_SW)) * lerp(1, 0.9, Xa)
      const rxA = lerp(26, 3, La) + 0.8 * hold
      const ryA = lerp(-26, -6, La) + 1.2 * Math.sin((t - T_A) * 1.1) + 22 * Xa
      const rzA = lerp(-8, -1.2, La) - 4 * Xa
      const tyA = lerp(220, 0, La) + 5 * hold
      pA.g.style.opacity = String(prog(t, T_A, T_A + 0.05))
      pA.g.style.transform = `translate(${ax}px, ${tyA}px) rotateX(${rxA}deg) rotateY(${ryA}deg) rotateZ(${rzA}deg) scale(${sA})`
      const hA = prog(t, T_A_END - 0.06, T_A_END + 0.04) * (1 - prog(t, T_SW, T_SW + 0.1))
      pA.hs.forEach(h => { h.style.opacity = String(hA) })
      pA.sp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_A_END + i * 0.1, T_A_END + 0.2 + i * 0.1) * (1 - prog(t, T_SW, T_SW + 0.12)) * tw_)
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_A) * 40 * (i ? -1 : 1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_A_END + i * 0.1, T_A_END + 0.3 + i * 0.1)))})`
      })
      const bloom = tw(t, [[T_A + 0.2, 0], [T_A + 0.42, 1, ease.outQuad], [T_A + 1.0, 0.35, ease.inOutQuad]])
      aura.style.opacity = String(bloom * (1 - Xa))
      aura.style.transform = `translateX(${ax - AX}px) scale(${lerp(0.85, 1.08, bloom)})`
      capStyle(capA, t, CAP_A, T_SW - 0.08, 1)

      // ── beat B: talk cards in chat slide in from the right and settle
      const Lb = ease.outCubic(prog(t, T_SW, T_B_END))
      const Sb = ease.outQuart(prog(t, T_SW + 0.1, T_B_END + 0.1))
      const holdB = Math.sin((t - T_SW) * 1.5)
      const bx = lerp(W + PW + 260, BX, Lb)
      const sB = lerp(0.8, 1, Sb) * (1 + 0.012 * prog(t, T_B_END, 26.9))
      const ryB = lerp(-30, 6, Lb) + 1.2 * Math.sin((t - T_SW) * 1.1)
      const rxB = lerp(10, 3, Sb) + 0.8 * holdB
      const rzB = lerp(7, 1.2, Lb)
      const tyB = lerp(140, 0, Sb) + 5 * holdB
      pB.g.style.opacity = String(prog(t, T_SW, T_SW + 0.05))
      pB.g.style.transform = `translate(${bx}px, ${tyB}px) rotateX(${rxB}deg) rotateY(${ryB}deg) rotateZ(${rzB}deg) scale(${sB})`
      const hB = prog(t, T_B_END - 0.06, T_B_END + 0.04)
      pB.hs.forEach(h => { h.style.opacity = String(hB) })
      pB.sp.forEach((s, i) => {
        const tw_ = 0.65 + 0.35 * Math.sin(t * 3.2 + i * 2.1)
        s.style.opacity = String(prog(t, T_B_END + i * 0.1, T_B_END + 0.2 + i * 0.1) * tw_)
        s.style.transform = `translateY(${Math.sin(t * 1.4 + i) * 6}px) rotate(${(t - T_SW) * 40 * (i ? 1 : -1)}deg) scale(${lerp(0.4, 1, ease.outBack(prog(t, T_B_END + i * 0.1, T_B_END + 0.3 + i * 0.1)))})`
      })
      capStyle(capB, t, CAP_B, 99, -1)
    },
  }
}
