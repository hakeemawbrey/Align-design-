// S5 · the reveal. Juniper's mystery card (the deck's front card) glides to centre and flips over into her founders
// card: photo open, holo border, FOUNDER № 0112. A gold sweep, a pixel burst, "Both align. Then you see them.",
// then a slow camera push onto the founder badge, and out.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { MONO, SERIF } from '../../../src/scenes/common.js'
import { W, H, VERT, fill, spaceBackdrop } from '../../../src/scenes/common.js'
import { makeEggs, ZODIAC } from './houston.js'
import { U, G, bodyH, face, foil, foilAt, sweep, caption, capIn, twinkles, burst } from './kit.js'

export const S5 = { start: 14.05, end: 19.05, flip: [14.75, 15.55] }
// where S4 leaves the front card (see s4-deck.js: baseX/baseY/S0 after the pull, push 1 → 1.06 over 12.3–14.45)
const deckPush = (t) => lerp(1, 1.06, ease.inOutQuad(prog(t, 12.3, 14.45)))
const DECK = VERT ? { x: W / 2 + 90, y: H / 2 + 150, h: 1000 * 0.8 } : { x: W / 2 + 300, y: H / 2 - 76, h: 700 * 0.72 }

export function sceneFounder(stage) {
  const root = fill(stage, { background: 'transparent' })
  const bg = spaceBackdrop(root, 'aurora', { seed: 11, grain: 0.18, stars: 200 })
  const eggs = makeEggs(root, { seed: 55, glyphs: 4, planets: 2, keep: VERT ? [[60, 100, W - 120, 1700]] : [[250, 80, 1500, 920]] })
  const deep = fill(root, { background: 'radial-gradient(70% 60% at 50% 48%, rgba(11,6,32,0.35) 0%, rgba(11,6,32,0.6) 100%)' })
  const g = G.founder
  const cw = VERT ? 700 : 520, ch = bodyH(g, cw)
  const FX = VERT ? W / 2 : W * 0.34, FY = VERT ? H * 0.4 : H / 2
  const cam = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0 }, root)
  const rig = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, perspective: 3000 * U + 'px', perspectiveOrigin: `${cw / 2}px ${ch / 2}px` }, cam)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: cw + 'px', height: ch + 'px', transformStyle: 'preserve-3d' }, rig)
  const body = el('div', { position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }, holder)
  const glow = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', boxShadow: `0 0 ${70 * U}px ${10 * U}px rgba(214,170,255,0.32), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)` }, body)
  // two faces, back to back: the mystery card (front) and the founders card (rotated 180)
  const back = face(body, G.mystery, cw, { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' })
  const front = face(body, g, cw, { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' })
  const gold = foil(front.face)
  // holo shimmer travelling round the border
  const ring = el('div', { position: 'absolute', inset: 0, borderRadius: g.r * cw + 'px', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.5,
    padding: (0.034 * cw) + 'px', WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }, front.face)

  // camera path in card coords (0..1 of the body): [time from start, x, y, zoom]
  const BADGE = [0.25, 0.152]
  const KEYS = [[0, 0.5, 0.5, 1], [2.9, 0.5, 0.5, 1.04], [3.9, BADGE[0] + 0.05, BADGE[1] + 0.03, VERT ? 1.5 : 2.2], [4.6, BADGE[0] + 0.07, BADGE[1] + 0.04, VERT ? 1.56 : 2.3], [5.0, 0.5, 0.42, 1.6]]
  const camAt = (lt) => {
    let i = 0; while (i < KEYS.length - 2 && lt > KEYS[i + 1][0]) i++
    const [t0, x0, y0, z0] = KEYS[i], [t1, x1, y1, z1] = KEYS[i + 1]
    const e = ease.inOutCubic(prog(lt, t0, t1))
    return { x: lerp(x0, x1, e), y: lerp(y0, y1, e), z: Math.exp(lerp(Math.log(z0), Math.log(z1), e)) }
  }
  const capA = caption(root, 'Houston, we have a match', VERT ? 'Both align.<br>Then you see them.' : 'Both align.<br>Then you<br>see them.',
    VERT ? { left: 0, width: W + 'px', top: (FY + ch / 2 + 70) + 'px', textAlign: 'center' } : { left: W * 0.6 + 'px', top: (H / 2 - 150) + 'px', textAlign: 'left' })
  // badge beat: horizontal moves the card left so the caption sits on clear sky; vertical backs it with a glass plate
  const FX2 = VERT ? W / 2 - (0.5 - BADGE[0] - 0.06) * cw * 1.53 : W * 0.25
  const capB = caption(root, '✦ Founders edition', VERT ? 'Numbered. Holo.<br>Houston first.' : 'Numbered.<br>Holo.<br>Houston first.',
    VERT ? { left: 170 + 'px', right: 170 + 'px', top: (H * 0.75) + 'px', textAlign: 'center' } : { left: 1370 + 'px', top: (H / 2 - 150) + 'px', textAlign: 'left' }, 0, VERT)

  const S0 = S5.start, S1 = S5.end
  const PLACE = [[ZODIAC[6], 'SUN', 'LIBRA'], [ZODIAC[2], 'MOON', 'GEMINI'], [ZODIAC[10], 'RISING', 'AQUARIUS']]
  const PL = PLACE.map(([gl, lab, sign], i) => {
    const x = VERT ? W / 2 + (i - 1) * 290 : FX - cw / 2 - 170, y = VERT ? H - 190 : H / 2 + (i - 1) * 230
    const e = el('div', { position: 'absolute', left: x + 'px', top: y + 'px', width: '220px', textAlign: 'center', opacity: 0 }, root)
    const ring = el('div', { width: '92px', height: '92px', margin: '0 auto', borderRadius: '50%', border: '1.5px solid rgba(242,199,92,0.7)', background: 'radial-gradient(closest-side, rgba(242,199,92,0.16), rgba(11,6,32,0.55))', display: 'flex', alignItems: 'center', justifyContent: 'center' }, e)
    const g = el('div', { fontFamily: '"DejaVu Sans", sans-serif', fontSize: '50px', lineHeight: 1, color: '#f6dc9a' }, ring, gl)
    el('div', { fontFamily: MONO, fontSize: '17px', letterSpacing: '0.24em', textIndent: '0.24em', color: 'rgba(239,230,214,0.85)', marginTop: '12px', textShadow: '0 0 10px rgba(8,4,24,0.9)' }, e, `${sign}<br><span style="color:rgba(242,199,92,0.85)">${lab}</span>`)
    return { e, g }
  })
  const st = (t) => {
    const lt = t - S0
    const glide = ease.inOutCubic(prog(t, S0 + 0.15, S5.flip[1]))
    const fp = ease.inOutCubic(prog(t, S5.flip[0], S5.flip[1]))
    return { lt, glide, fp, k: camAt(lt) }
  }
  return {
    start: S0, end: S1, root,
    update(t) {
      root.style.zIndex = '25'
      const { lt, glide, fp, k } = st(t)
      bg.update(t)
      eggs.update(t, ease.inOutQuad(prog(t, S0 + 0.4, S0 + 1.4)))
      // Juniper's placements glint in beside her card: Libra sun, Gemini moon, Aquarius rising
      PL.forEach((p, i) => {
        const a0 = S5.flip[1] + 0.55 + i * 0.22
        const pin = ease.outBack(prog(t, a0, a0 + 0.5)), po = ease.inQuad(prog(t, S0 + 2.55, S0 + 2.9))
        p.e.style.opacity = String(Math.min(clamp(pin * 1.5), 1 - po))
        p.e.style.transform = `translate(-50%, -50%) scale(${lerp(0.6, 1, clamp(pin))}) translateY(${Math.sin((t - a0) * 1.4 + i) * 5}px)`
        const gl = Math.sin(Math.PI * prog(t, a0 + 0.1, a0 + 0.7))
        p.g.style.textShadow = `0 0 ${10 + 26 * gl}px rgba(242,199,92,${0.5 + 0.5 * gl})`
      })
      root.style.opacity = String(ease.inOutQuad(prog(t, S0, S0 + 0.3)) * (1 - ease.inQuad(prog(t, S1 - 0.4, S1))))
      bg.root.style.opacity = deep.style.opacity = String(ease.inOutQuad(prog(t, S0 + 0.05, S0 + 0.5)))
      // camera: from the deck's front-card pose to the focus point, then the badge push
      const dk = DECK.h * deckPush(Math.min(t, 14.45)) / ch
      const z = lerp(dk, 1, glide) * k.z * (1 + 0.25 * ease.inQuad(prog(t, S1 - 0.45, S1)))
      const side = ease.inOutCubic(prog(lt, 2.9, 3.9)) * (1 - ease.inOutCubic(prog(lt, 4.6, 5.0)))
      const fx = lerp(DECK.x, lerp(FX, FX2, side), glide), fy = lerp(DECK.y, FY, glide)
      // with the glide, the card centre is what sits on the focus; the badge push moves the focus inside the card
      cam.style.transform = `translate(${fx}px, ${fy}px)`
      rig.style.transform = `scale(${z}) translate(${-k.x * cw}px, ${-k.y * ch}px)`
      const flat = clamp((k.z - 1) / 1.0)
      const lift = Math.sin(Math.PI * fp)
      const ry = 180 * fp + (1 - flat) * (fp >= 1 ? lerp(-10, 8, ease.inOutQuad(prog(t, S5.flip[1], S0 + 3.6))) : 0)
      body.style.transform = `translateZ(${120 * lift}px) rotateY(${ry}deg) rotateX(${(3 * Math.sin(lt * 0.7) - 1) * (1 - flat)}deg) rotateZ(${lerp(2, 0, fp)}deg) scale(${1 + 0.05 * lift})`
      glow.style.boxShadow = `0 0 ${(70 + 60 * lift) * U}px ${(10 + 12 * lift) * U}px rgba(${fp > 0.5 ? '242,199,92' : '214,170,255'},${0.3 + 0.25 * lift}), 0 ${40 * U}px ${90 * U}px rgba(4,2,14,0.6)`
      ring.style.background = `conic-gradient(from ${(lt * 70) % 360}deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.95) 16deg, rgba(255,255,255,0) 38deg, rgba(255,255,255,0) 360deg)`
      sweep(front.glint, cw, prog(t, S5.flip[1] + 0.9, S5.flip[1] + 2.2))
      foilAt(gold, prog(t, S5.flip[1] - 0.05, S5.flip[1] + 0.8))
      void back
      capIn(capA, t, S5.flip[1] + 0.15, S0 + 3.2, VERT ? 0 : 40)
      capIn(capB, t, S0 + 3.55, S1 - 0.2, VERT ? 0 : 40)
    },
    fx(ctx, t) {
      const { glide } = st(t)
      if (glide < 1) return
      const card = [FX - cw / 2 - 10, FY - ch / 2 - 10, cw + 20, ch + 20]
      burst(ctx, t, S5.flip[1] - 0.05, FX, FY, 91, 44, (VERT ? 640 : 560) * U, undefined, card)
      const lt = t - S0
      if (lt < 2.9) twinkles(ctx, t, S5.flip[1] + 0.4, S0 + 3.0, [FX - cw * 0.85, FY - ch * 0.62, cw * 1.7, ch * 1.24], 89, 22, undefined, card)
    },
  }
}
