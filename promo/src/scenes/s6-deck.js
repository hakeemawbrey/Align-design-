import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, A, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ──────────────────────────────────────── S6 · a new deck, every night
// Real Align card art (each PNG is a complete card with its own frame + glow).
// h = image height relative to a profile card so the card *bodies* read the same size.
// iw/ih = PNG size, b = opaque card-body box [l, t, r, b] in PNG px (the rest is the baked glow, which reads
// dirty on paper — we crop to the body and give each card a clean shadow instead). k = body height vs a profile card.
const PROF = { iw: 1496, ih: 2238, b: [120, 114, 1374, 2116], k: 1 }
const TALK = { iw: 732, ih: 1170, b: [60, 60, 672, 1110], k: 0.96 }
const CARD = {
  p1: { src: 'card-profile-1.png', ...PROF },
  p2: { src: 'card-profile-2.png', ...PROF },
  p3: { src: 'card-profile-3.png', ...PROF },
  p4: { src: 'card-profile-4.png', ...PROF },
  p5: { src: 'card-profile-5.png', ...PROF },
  p6: { src: 'card-profile-6.png', ...PROF },
  ev: { src: 'card-event.png', ...PROF },
  peek: { src: 'card-profile-peek.png', iw: 1520, ih: 2281, b: [120, 117, 1398, 2159], k: 1 },
  t1: { src: 'card-talk-1.png', ...TALK },
  t2: { src: 'card-talk-2.png', ...TALK },
  t3: { src: 'card-talk-3.png', ...TALK },
  t4: { src: 'card-talk-4.png', ...TALK, b: [60, 60, 672, 1116] },
  t5: { src: 'card-talk-5.png', ...TALK, b: [60, 60, 672, 1116] },
  t6: { src: 'card-talk-6.png', ...TALK, b: [60, 60, 672, 1116] },
  td: { src: 'card-talk-daily.png', iw: 1176, ih: 1884, b: [96, 91, 1080, 1782], k: 0.96 },
  sign: { src: 'card-sign.png', iw: 848, ih: 1152, b: [120, 121, 727, 1032], k: 0.92 },
  rev: { src: 'card-reveal.png', iw: 1560, ih: 2740, b: [64, 123, 1495, 2622], k: 1.08 },
}
// deal order: front-dealt cards, then the reveal lands, then cards keep shuffling in behind it
const DEAL = ['p1', 't1', 'p2', 'ev', 'p4', 't2', 'peek', 't3', 'p5', 'sign', 'td', 'p6', 't4', 'p3', 't5', 't6', 'rev']
const DEAL_T = [17.42, 17.85, 18.15, 18.45, 18.7, 18.92, 19.12, 19.32, 19.52, 19.72, 19.92, 20.12, 20.32, 20.52, 20.72, 20.9, 21.08]
const BEHIND = ['p2', 't2', 'p4', 'td', 'p5', 't4']
const BEHIND_T = [21.5, 21.78, 22.06, 22.34, 22.62, 22.9]
const BODY_H = 700 // on-screen card-body height of a profile card at scale 1 (matches the fxDots patch in s5)
const ENTER = 0.36 // seconds for a card to swing in edge-on from the right into the front slot
const FIRST_IN = [17.42, 17.6] // first card fades in under the fxDots patch (no slide)

export function sceneDeck(stage) {
  const root = fill(stage, { background: C.paper })
  const persp = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const mk = (key, kind, at) => {
    const c = CARD[key]
    const bw = c.b[2] - c.b[0], bh = c.b[3] - c.b[1]
    const h = BODY_H * c.k, w = h * bw / bh, sc = h / bh
    const wrap = el('div', {
      position: 'absolute', left: (W / 2 - w / 2) + 'px', top: (H / 2 - h / 2) + 'px', width: w + 'px', height: h + 'px',
      borderRadius: (w * 0.055) + 'px', overflow: 'hidden', background: C.canvas, willChange: 'transform',
      boxShadow: '0 26px 44px -10px rgba(26,16,51,0.42), 0 6px 14px rgba(26,16,51,0.22)',
    }, persp)
    const im = img(wrap, A + c.src, { left: (-c.b[0] * sc) + 'px', top: (-c.b[1] * sc) + 'px', width: (c.iw * sc) + 'px', height: (c.ih * sc) + 'px' })
    return { wrap, im, w, h, kind, at, key }
  }
  const cards = [
    ...DEAL.map((k, i) => mk(k, k === 'rev' ? 'rev' : 'front', DEAL_T[i])),
    ...BEHIND.map((k, i) => mk(k, 'behind', BEHIND_T[i])),
  ]
  const rev = cards.find(c => c.kind === 'rev')
  // holo / gold-foil gloss (clipped by the card body's rounded overflow)
  const gloss = el('div', {
    position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0, pointerEvents: 'none',
    backgroundImage: 'linear-gradient(115deg, rgba(169,128,46,0) 40%, #a9802e 44%, #f2c75c 47%, #fff4cf 50%, #f2c75c 53%, #a9802e 56%, rgba(169,128,46,0) 60%)',
    backgroundSize: '300% 300%', backgroundRepeat: 'no-repeat',
  }, rev.wrap)

  // "✦ ALIGNED" stamp + gilded glow on the front (Juniper) card once the foil has passed
  const stamp = el('div', {
    position: 'absolute', right: '7%', top: '4.5%', padding: '12px 22px 12px 18px', borderRadius: '14px',
    background: 'linear-gradient(100deg, #f7f1fb, #fdf6e6 55%, #eef3fb)', color: C.ink, fontFamily: MONO, fontSize: '40px',
    letterSpacing: '0.2em', whiteSpace: 'nowrap', lineHeight: 1, opacity: 0, transformOrigin: '70% 50%',
    boxShadow: '0 10px 24px rgba(11,6,32,0.45)',
  }, rev.wrap, `<span style="color:#d9a93f">✦</span> ALIGNED`)
  const REV_SHADOW = '0 26px 44px -10px rgba(26,16,51,0.42), 0 6px 14px rgba(26,16,51,0.22)'

  const word = (txt) => el('div', { position: 'absolute', fontFamily: SANS, fontSize: '84px', color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.015em', opacity: 0, lineHeight: 1 }, root, txt)
  const wTop = word('every night'), wBot = word('a new deck'), wYou = word('you'), wAlign = word('align')
  wYou.style.fontSize = '84px'
  wAlign.style.fontFamily = SERIF; wAlign.style.fontStyle = 'italic'; wAlign.style.fontSize = '104px'; wAlign.style.letterSpacing = '0'

  return {
    start: 17.4, end: 22.75, root,
    update(t) {
      const pull = ease.inOutCubic(prog(t, 18.3, 19.4))     // camera pulls back, stack fans out
      const center = ease.inOutCubic(prog(t, 20.35, 20.95))  // stack compacts + centres for "you ▣ align"
      const push = lerp(1, 1.05, ease.inOutQuad(prog(t, 21.1, 22.75)))
      const S0 = lerp(1, 0.72, pull) * lerp(1, 0.97, center) * push
      const Zd = lerp(40, 200, pull)
      const A1 = lerp(16, 78, pull), B1 = lerp(0, 4.2, pull)
      const Yd = lerp(4, 38, pull)
      const baseX = lerp(lerp(0, 300, pull), 250, center)
      const baseY = lerp(-10, lerp(-120, -60, center), pull)

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
        const s = S0 * 1400 / (1400 + Zd * d)
        // fanned trail (quadratic, exits frame left) blends into a compact, saturating trail for the end card
        const sat = 1 - Math.exp(-d / 5)
        let x = baseX - lerp(A1 * d + B1 * d * d, 600 * sat, center)
        let y = baseY + lerp(Yd * d, 170 * sat, center)
        let yaw = lerp(0, lerp(14, 30, pull), clamp(d))
        let rx = 0, rz = 0
        // entry into the front slot: swings in edge-on from the right (yaw −90 → 0), fading up over the first quarter
        let op = 1
        if (i === 0) op = ease.inOutQuad(prog(t, FIRST_IN[0], FIRST_IN[1]))
        else if (c.kind !== 'behind' && e[i] < 1) {
          const p = e[i]
          x += (1 - p) * 700
          yaw = lerp(-90, yaw, p)
          op = clamp(prog(t, c.at, c.at + ENTER) * 4)
        }
        if (c.kind === 'behind') yaw = lerp(4, yaw, e[i])
        // holo moment: slight tilt as the foil light passes
        if (c.kind === 'rev') {
          const hp = prog(t, 21.05, 21.75)
          const bump = Math.sin(Math.PI * hp)
          yaw += -6 * bump; rx = 3 * bump; rz = -1.2 * bump
        }
        // rear cards: leave frame left; cap depth when compacted so the trail stays tidy
        const left = W / 2 + x - (c.w * s) / 2
        const vis = left + c.w * s > -40 && op > 0.01
        c.wrap.style.display = vis ? 'block' : 'none'
        if (!vis) return
        c.wrap.style.opacity = String(op)
        c.wrap.style.transform = `translate(${x}px, ${y}px) perspective(2400px) rotateY(${yaw}deg) rotateX(${rx}deg) rotateZ(${rz}deg) scale(${s})`
        c.wrap.style.zIndex = String(2000 - Math.round(d * 40) + (c.kind === 'rev' ? 1 : 0))
      })
      // gold-foil sweep across the revealed card
      const gp = prog(t, 21.05, 21.75)
      gloss.style.opacity = String(0.6 * clamp(Math.sin(Math.PI * gp) * 2.5))
      gloss.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(gp))}% ${lerp(100, 0, ease.inOutQuad(gp))}%`

      // aligned: gilded glow + stamp on the front card (bridges into the match in s7)
      const gl = ease.outCubic(prog(t, 21.8, 21.95)) * (1 - 0.55 * ease.inOutQuad(prog(t, 22.0, 22.5)))
      rev.wrap.style.boxShadow = gl > 0.001 ? `${REV_SHADOW}, 0 0 ${8 + 46 * gl}px ${4 + 10 * gl}px rgba(242,199,92,${(0.75 * gl).toFixed(3)}), inset 0 0 0 ${(4 * gl).toFixed(2)}px rgba(242,199,92,${(0.9 * gl).toFixed(3)})` : REV_SHADOW
      const sp = prog(t, 21.82, 21.98)
      stamp.style.opacity = String(clamp(sp * 3))
      stamp.style.transform = `rotate(${lerp(-14, -6, ease.outCubic(sp))}deg) scale(${lerp(1.7, 1, ease.outBack(sp))})`

      // words: "every night / a new deck" frame the front card (≥ 64px clear of it, incl. perspective swell of entering cards)
      const cardH = BODY_H * S0
      const fxw = W / 2 + baseX
      const showA = (a) => ease.outCubic(prog(t, a, a + 0.35))
      const hide = ease.inCubic(prog(t, 20.3, 20.5))
      wTop.style.left = (fxw - 60) + 'px'; wTop.style.top = (H / 2 + baseY - cardH / 2 - 64 - 84) + 'px'
      wBot.style.left = (fxw - 30) + 'px'; wBot.style.top = (H / 2 + baseY + cardH / 2 + 64) + 'px'
      wTop.style.opacity = String(showA(19.0) * (1 - hide)); wTop.style.transform = `translateY(${(1 - showA(19.0)) * 20 - 16 * hide}px)`
      wBot.style.opacity = String(showA(19.35) * (1 - hide)); wBot.style.transform = `translateY(${(1 - showA(19.35)) * 20 + 16 * hide}px)`
      // "you ▣ align": balanced around the compacted stack (left = rear of trail, right = front card)
      const fy = H / 2 + baseY
      const out = 1 - ease.inQuad(prog(t, 22.4, 22.7))
      wYou.style.left = (W / 2 - 590) + 'px'; wYou.style.top = (fy - 46) + 'px'
      wAlign.style.left = (W / 2 + 485) + 'px'; wAlign.style.top = (fy - 62) + 'px'
      wYou.style.opacity = String(showA(20.85) * out); wAlign.style.opacity = String(showA(21.1) * out)
      wYou.style.transform = `translateX(${(1 - showA(20.85)) * -30}px)`
      wAlign.style.transform = `translateX(${(1 - showA(21.1)) * 30}px)`
      // blur out into s7's rising gradient
      const bl = 24 * ease.inQuad(prog(t, 22.4, 22.75))
      persp.style.filter = bl > 0.05 ? `blur(${bl.toFixed(2)}px)` : 'none'
    },
  }
}
