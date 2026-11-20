import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../../../src/lib.js'
import { makeSun, makeWheel, makeSkyline, makeEggs } from './houston.js'
import { VERT, W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars, spaceBackdrop } from '../../../src/scenes/common.js'

// ──────────────────────────────────────── S6 · a new deck, every night
// Real Align card art (each PNG is a complete card with its own frame + glow).
// h = image height relative to a profile card so the card *bodies* read the same size.
// iw/ih = PNG size, b = opaque card-body box [l, t, r, b] in PNG px (the rest is the baked glow, which reads
// dirty on paper — we crop to the body and give each card a clean shadow instead). k = body height vs a profile card.
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116], k: 1 }
const TALK = { iw: 744, ih: 1194, b: [60, 60, 684, 1134], k: 0.96 }
const CARD = {
  p1: { src: 'card-profile-1.png', ...PROF },
  p2: { src: 'card-profile-2.png', ...PROF },
  p3: { src: 'card-profile-3.png', ...PROF },
  p4: { src: 'card-profile-4.png', ...PROF },
  p5: { src: 'card-profile-5.png', ...PROF },
  p6: { src: 'card-profile-6.png', ...PROF },
  ev: { src: 'card-event.png', ...PROF },
  // veiled deck card back (no faces in the deck — Juniper's reveal at ~21.1 is the only real photo)
  back: { src: 'card-back.png', iw: 1528, ih: 2347, b: [120, 119, 1440, 2227], k: 1 },
  t1: { src: 'card-talk-1.png', ...TALK },
  t2: { src: 'card-talk-2.png', ...TALK },
  t3: { src: 'card-talk-3.png', ...TALK },
  t4: { src: 'card-talk-4.png', ...TALK },
  t5: { src: 'card-talk-5.png', ...TALK },
  t6: { src: 'card-talk-6.png', ...TALK },
  td: { src: 'card-talk-daily.png', iw: 1178, ih: 1891, b: [96, 96, 1082, 1795], k: 0.96 },
  sign: { src: 'card-sign.png', iw: 848, ih: 1152, b: [120, 121, 727, 1032], k: 0.92 },
  rev: { src: 'card-reveal.png', iw: 1560, ih: 2740, b: [64, 123, 1495, 2622], k: 1.08 },
}
// deal order: front-dealt cards, then the reveal lands, then cards keep shuffling in behind it
// remix timing: a calmer deal (one card every ~0.21s), ending on Juniper's mystery card (p3), which S5 flips
export const D0 = 10.3, D1 = 14.45
const DEAL = ['p1', 't1', 'p2', 'p6', 't2', 'back', 'p4', 't3', 'ev', 'p5', 'td', 'p3']
export const DEAL_T = [10.32, 10.78, 11.0, 11.22, 11.43, 11.64, 11.85, 12.06, 12.27, 12.48, 12.7, 12.94]
const BEHIND = ['t4', 'back', 't5']
const BEHIND_T = [13.3, 13.58, 13.86]
// "already aligned": as the deck recedes, the veiled profile cards that aligned lift their aura veil one by one
// (a ripple down the trail) — the photo fills the art window, a gold "✦ ALIGNED" tag replaces the pull chip.
// Juniper's veiled card (p3) and every newly dealt card stay mystery; Juniper is the hero reveal at 21.08.
// photo = PEOPLE index (from app/src/data/profiles.ts: Maya→p3, Rio→p9, Ari→p6, Sol→p7, Kai→p2)
const ALIGNED = {}
const LIFT = 0.34               // veil-lift duration (s)
const WIN = [218, 342, 1292, 914] // art window inside card-profile-*.png (PNG px)
// on the dark ground: deep indigo drop + a faint violet rim glow so each card separates from the space behind it
const CARD_SHADOW = '0 30px 60px -14px rgba(4,2,16,0.85), 0 0 0 1px rgba(196,170,255,0.22), 0 0 26px 2px rgba(154,123,224,0.28)'
const BODY_H = VERT ? 1000 : 700 // on-screen card-body height of a profile card at scale 1 (matches the fxDots patch in s5)
const ENTER = 0.5 // seconds for a card to swing in from off-frame right (yaw −65 → 0, shaded dark → lit) into the front slot
const FIRST_IN = [10.32, 10.62]
// 9:16 layout (1080×1920): first card = profile body 626×1000 centred at (W/2, H/2 − 10); trail recedes up-left
const VL = {
  pullS: 0.8, centerS: 1.0, pullX: 90, pullY: 150, centerY: -24,
  Zd: 320, Zc: 70, ax: 36, bx: 7, ay: 42, by: 7, yaw: 12, rx: 0,
  cK: 4, cx: 190, cy: 150,
  topX: 470, topY: 300, botX: 300, botGap: 48,
  comeY: 232, alignY: 1530,
} // first card fades in under the fxDots patch (no slide)

export function sceneDeck(stage) {
  const SH = (x) => x  // (times below are the remix's own)
  const root = fill(stage, { background: 'transparent' })
  const bg = spaceBackdrop(root, 'amber', { seed: 6 })   // deep-space ground (first child)
  // the sun rises slowly behind the deck (tarot line-art, like The Sun card); a few zodiac glyphs drift in the field
  const sun = makeSun(root, VERT ? 120 : 110)
  const eggs = makeEggs(root, { seed: 44, glyphs: 5, planets: 1, keep: VERT ? [[0, 200, W, 1500], [560, 1500, 520, 420]] : [[200, 60, 1500, 1000], [0, 0, 500, 480]] })
  const persp = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const mk = (key, kind, at) => {
    const c = CARD[key]
    const bw = c.b[2] - c.b[0], bh = c.b[3] - c.b[1]
    const h = BODY_H * c.k, w = h * bw / bh, sc = h / bh
    const wrap = el('div', {
      position: 'absolute', left: (W / 2 - w / 2) + 'px', top: (H / 2 - h / 2) + 'px', width: w + 'px', height: h + 'px',
      borderRadius: (w * 0.055) + 'px', overflow: 'hidden', background: C.canvas, willChange: 'transform',
      boxShadow: CARD_SHADOW,
    }, persp)
    const im = img(wrap, A + c.src, { left: (-c.b[0] * sc) + 'px', top: (-c.b[1] * sc) + 'px', width: (c.iw * sc) + 'px', height: (c.ih * sc) + 'px' })
    const out = { wrap, im, w, h, kind, at, key }
    const al = kind === 'front' && ALIGNED[key]
    if (al) {
      const L = (WIN[0] - c.b[0]) * sc, T = (WIN[1] - c.b[1]) * sc, ww = (WIN[2] - WIN[0]) * sc, wh = (WIN[3] - WIN[1]) * sc
      const win = el('div', { position: 'absolute', left: L + 'px', top: T + 'px', width: ww + 'px', height: wh + 'px', overflow: 'hidden',
        borderRadius: (30 * sc) + 'px', opacity: 0, background: C.canvas }, wrap)
      // face sits a little left of centre: in the fanned trail each card's right side hides under its neighbour
      const pw = ww * 1.25, ph = pw * 366 / 342
      // (tall cut: the trail climbs up-left, so each card's top-left corner is what stays visible — face sits up there)
      const fx = VERT ? 0.3 : 0.4, fy = VERT ? 0.36 : 0.53
      const pimg = img(win, PEOPLE[al.photo - 1], { left: (ww * fx - pw / 2) + 'px', top: (wh * fy - ph * 0.37) + 'px', width: pw + 'px', height: ph + 'px' })
      const rim = el('div', { position: 'absolute', inset: 0, borderRadius: (30 * sc) + 'px', pointerEvents: 'none' }, win)
      const tag = el('div', {
        position: 'absolute', left: (30 * sc) + 'px', top: (30 * sc) + 'px', padding: `${12 * sc}px ${26 * sc}px ${12 * sc}px ${22 * sc}px`,
        borderRadius: '999px', background: 'rgba(20,10,46,0.82)', border: `${2.5 * sc}px solid rgba(242,199,92,0.85)`,
        fontFamily: MONO, fontSize: (32 * sc) + 'px', letterSpacing: '0.18em', lineHeight: 1, color: C.bone, whiteSpace: 'nowrap',
        opacity: 0, transformOrigin: '20% 50%',
      }, win, `<span style="color:${C.gold}">✦</span> ALIGNED`)
      out.al = { ...al, win, pimg, rim, tag }
    }
    return out
  }
  const cards = [
    ...DEAL.map((k, i) => mk(k, k === 'p3' ? 'rev' : 'front', DEAL_T[i])),   // p3 (Juniper) stays the front card
    ...BEHIND.map((k, i) => mk(k, 'behind', BEHIND_T[i])),
  ]
  const word = (txt) => el('div', { position: 'absolute', fontFamily: SANS, fontSize: '84px', color: C.bone, whiteSpace: 'nowrap', letterSpacing: '-0.015em', opacity: 0, lineHeight: 1 }, root, txt)
  const wTop = word('every night'), wBot = word('a new deck'), wYou = word('come'), wAlign = word('Align')
  wYou.style.fontSize = '84px'
  wAlign.style.fontFamily = SERIF; wAlign.style.fontStyle = 'italic'; wAlign.style.fontSize = '104px'; wAlign.style.letterSpacing = '0'
  if (VERT) {
    wTop.style.fontSize = wBot.style.fontSize = '92px'; wYou.style.fontSize = '96px'; wAlign.style.fontSize = '116px'
  }

  return {
    start: D0, end: D1, root,
    update(t) {
      bg.update(t)
      // cross-fade from s5's teal space (still drawn underneath until 17.6) — no ground pop at the cut
      bg.root.style.opacity = String(ease.inOutQuad(prog(t, D0, D0 + 0.35)))
      const rise = ease.outCubic(prog(t, D0, D1))
      sun.update(t, VERT ? { x: W * 0.84, y: lerp(1930, 1790, rise), a: 0.62 * ease.inOutQuad(prog(t, D0 + 0.2, D0 + 1.4)), rot: t * 4 } : { x: W * 0.15, y: lerp(330, 200, rise), a: 0.62 * ease.inOutQuad(prog(t, D0 + 0.2, D0 + 1.4)), rot: t * 4 })
      eggs.update(t, ease.inOutQuad(prog(t, D0 + 0.5, D0 + 1.5)))
      const pull = ease.inOutCubic(prog(t, 10.9, 12.3))     // camera pulls back, stack fans out
      const center = 0
      const push = lerp(1, 1.06, ease.inOutQuad(prog(t, 12.3, D1)))
      const S0 = VERT ? lerp(1, VL.pullS, pull) * lerp(1, VL.centerS / VL.pullS, center) * push
        : lerp(1, 0.72, pull) * lerp(1, 0.97, center) * push
      const Zd = VERT ? lerp(lerp(40, VL.Zd, pull), VL.Zc, center) : lerp(40, 200, pull)
      const A1 = lerp(16, 78, pull), B1 = lerp(0, 4.2, pull)
      const Yd = lerp(4, 38, pull)
      const baseX = VERT ? lerp(lerp(0, VL.pullX, pull), 0, center) : lerp(lerp(0, 300, pull), 250, center)
      const baseY = VERT ? lerp(lerp(-10, VL.pullY, pull), VL.centerY, center)
        : lerp(-10, lerp(-76, -60, center), pull) // keeps "every night" ≥64px below the frame top

      const e = cards.map((c, i) => i === 0 ? 1 : ease.outCubic(prog(t, c.at, c.at + ENTER)))
      const n = cards.length
      cards.forEach((c, i) => {
        if (t < c.at) { c.wrap.style.display = 'none'; return }
        // depth: how many cards have arrived in front of (or, for 'behind', been tucked behind the front of) this one
        let d = c.kind === 'behind' ? e[i] : 0
        for (let j = 0; j < n; j++) {
          if (j === i || cards[j].at <= c.at) continue
          if (c.kind === 'rev' && cards[j].kind === 'behind') continue
          d += e[j]
        }
        // first card settles a hair after resolving out of the dots (keeps the hand-off alive)
        const s = S0 * 1400 / (1400 + Zd * d) * (i === 0 ? lerp(1.04, 1, ease.outCubic(prog(t, 10.32, 11.0))) : 1)
        // fanned trail (quadratic, exits frame left) blends into a compact, saturating trail for the end card
        const sat = 1 - Math.exp(-d / 5)
        let x, y, yaw, rx = 0, rz = 0
        if (VERT) {
          // tall cut: the trail recedes up and to the left (quadratic, exits the top-left), then compacts into a tight deck
          const vs = 1 - Math.exp(-d / VL.cK)
          x = baseX - lerp(lerp(16, VL.ax, pull) * d + lerp(0, VL.bx, pull) * d * d, VL.cx * vs, center)
          y = baseY - lerp(lerp(10, VL.ay, pull) * d + lerp(0, VL.by, pull) * d * d, VL.cy * vs, center)
          yaw = lerp(0, lerp(10, VL.yaw, pull), clamp(d))
          rx = lerp(0, VL.rx, clamp(d)) * pull
        } else {
          x = baseX - lerp(A1 * d + B1 * d * d, 600 * sat, center)
          y = baseY + lerp(Yd * d, 170 * sat, center)
          yaw = lerp(0, lerp(14, 30, pull), clamp(d))
        }
        // entry into the front slot: fully opaque, slides in from just off-frame right turning yaw −65 → 0 (never edge-on),
        // shaded dark → lit as it faces camera (no grey see-through phase, first visible frame is a partial slide-in, not a pop)
        let op = 1, shade = 1
        if (i === 0) op = ease.inOutQuad(prog(t, FIRST_IN[0], FIRST_IN[1]))
        else if (c.kind !== 'behind' && e[i] < 1) {
          const p = e[i]
          const offR = W / 2 - baseX + c.w * s * 0.5 + 80
          x += (1 - p) * offR
          yaw = lerp(-65, yaw, p)
          shade = lerp(0.55, 1, ease.inOutQuad(clamp(prog(t, c.at, c.at + ENTER) * 1.25)))
        }
        if (c.kind === 'behind') yaw = lerp(4, yaw, e[i])
        // rear cards: leave frame left; cap depth when compacted so the trail stays tidy
        const left = W / 2 + x - (c.w * s) / 2
        const top = H / 2 + y - (c.h * s) / 2
        const vis = left + c.w * s > -40 && left < W + 40 && op > 0.01 && (!VERT || (top + c.h * s > -60 && top < H + 60))
        c.wrap.style.display = vis ? 'block' : 'none'
        if (!vis) return
        c.wrap.style.opacity = String(op)
        c.wrap.style.filter = shade < 0.999 ? `brightness(${shade.toFixed(3)})` : 'none'
        c.wrap.style.transform = `translate(${x}px, ${y}px) perspective(2400px) rotateY(${yaw}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`
        c.wrap.style.zIndex = String(2000 - Math.round(d * 40) + (c.kind === 'rev' ? 1 : 0))
      })
      // already-aligned veil lifts (photo wipes up from under the aura, blur → sharp, gilt rim flash, tag pops)
      cards.forEach((c) => {
        if (!c.al) return
        const p = prog(t, c.al.at, c.al.at + LIFT)
        if (p <= 0) { c.al.win.style.opacity = '0'; return }
        const e1 = ease.inOutCubic(p)
        const edge = lerp(-30, 130, e1)
        c.al.win.style.opacity = String(clamp(p * 6))
        const m = `linear-gradient(to top, #000 ${(edge - 30).toFixed(1)}%, transparent ${edge.toFixed(1)}%)`
        c.al.win.style.webkitMaskImage = c.al.win.style.maskImage = p >= 1 ? 'none' : m
        const bl = lerp(9, 0, ease.outCubic(p))
        c.al.pimg.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px) saturate(${lerp(1.5, 1, p).toFixed(3)})` : 'none'
        const flash = Math.sin(Math.PI * prog(t, c.al.at + LIFT * 0.55, c.al.at + LIFT + 0.25))
        c.al.rim.style.boxShadow = `inset 0 0 0 ${(2 + 3 * flash).toFixed(2)}px rgba(242,199,92,${(0.45 + 0.5 * flash).toFixed(3)})`
        const tp = prog(t, c.al.at + LIFT * 0.7, c.al.at + LIFT * 0.7 + 0.2)
        c.al.tag.style.opacity = String(clamp(tp * 3))
        c.al.tag.style.transform = `scale(${lerp(1.35, 1, ease.outBack(tp)).toFixed(4)})`
      })
      // words: "every night / a new deck" frame the front card (≥ 64px clear of it, incl. perspective swell of entering cards)
      const cardH = BODY_H * S0
      const fxw = W / 2 + baseX
      const showA = (a) => ease.outCubic(prog(t, a, a + 0.35))
      const hide = ease.inCubic(prog(t, 13.85, 14.1))
      if (VERT) {
        wTop.style.left = VL.topX + 'px'; wTop.style.top = VL.topY + 'px'
        wBot.style.left = VL.botX + 'px'; wBot.style.top = (H / 2 + baseY + cardH / 2 + VL.botGap) + 'px'
      } else {
      wTop.style.left = (fxw - 60) + 'px'; wTop.style.top = Math.max(64, H / 2 + baseY - cardH / 2 - 64 - 84) + 'px'
      wBot.style.left = (fxw - 30) + 'px'; wBot.style.top = (H / 2 + baseY + cardH / 2 + 64) + 'px'
      }
      wTop.style.opacity = String(showA(11.75) * (1 - hide)); wTop.style.transform = `translateY(${(1 - showA(11.75)) * 20 - 6 * hide}px)`
      wBot.style.opacity = String(showA(12.05) * (1 - hide)); wBot.style.transform = `translateY(${(1 - showA(12.05)) * 20 + 16 * hide}px)`
      // "you ▣ align": balanced around the compacted stack (left = rear of trail, right = front card)
      const fy = H / 2 + baseY
      const out = 0
      wYou.style.opacity = String(showA(20.85) * out); wAlign.style.opacity = String(showA(21.22) * out)
      if (VERT) {
        // "come" above / "Align" below the front card, centred (positions fixed to the end-card pose, so no drift with the push)
        wYou.style.left = (W / 2) + 'px'; wYou.style.top = VL.comeY + 'px'
        wAlign.style.left = (W / 2) + 'px'; wAlign.style.top = VL.alignY + 'px'
        wYou.style.transform = `translateX(-50%) translateY(${(1 - showA(20.85)) * -26}px)`
        wAlign.style.transform = `translateX(-50%) translateY(${(1 - showA(21.22)) * 26}px)`
      } else {
      wYou.style.left = (W / 2 - 452) + 'px' /* right edge where "you" ended, so the gap to the stack is unchanged */; wYou.style.top = (fy - 46) + 'px'
      wAlign.style.left = (W / 2 + 485) + 'px'; wAlign.style.top = (fy - 62) + 'px'
      wYou.style.transform = `translateX(-100%) translateX(${(1 - showA(20.85)) * -30}px)`
      wAlign.style.transform = `translateX(${(1 - showA(21.22)) * 30}px)`
      }
      // blur out into s7's rising gradient
      const bl = 22 * ease.inQuad(prog(t, 14.0, D1))
      root.style.opacity = String(1 - ease.inQuad(prog(t, 14.1, D1)))
      persp.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none'
    },
  }
}
