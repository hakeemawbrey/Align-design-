import { clamp, lerp, prog, ease, tw, rng, noise1, el, mix, C, PIXEL_PALETTE, TypeLine } from '../lib.js'
import { W, H, IMG, PEOPLE, SANS, SERIF, MONO, fill, img, Ticks, makeCard, makeStars } from "./common.js"

// ──────────────────────────────────────── S6 · a new deck, every night
export function sceneDeck(stage, assets) {
  const root = fill(stage, { background: C.paper })
  const persp = el('div', { position: 'absolute', left: '0', top: '0', width: W + 'px', height: H + 'px' }, root)
  const space = el('div', { position: 'absolute', left: '50%', top: '50%' }, persp)
  const N = 14
  const names = ['Rio, 29', 'Mira, 26', 'Tobias, 31', 'Zena, 28', 'Anselm, 30', 'Sunny, 25', 'Noor, 27', 'Ari, 29', 'Lena, 26', 'Kofi, 30', 'Sol, 28', 'Ivy, 27', 'Theo, 31', 'Juniper, 27']
  const srcs = Array.from({ length: N }, (_, i) => (assets.cards && assets.cards.length && i % 3 === 1 ? assets.cards[i % assets.cards.length] : PEOPLE[i % PEOPLE.length]))
  srcs[N - 1] = IMG + 'juniper.jpg'
  const cards = srcs.map((s, i) => makeCard(space, s, names[i], { w: 400, h: 540 }))
  cards.forEach(c => { if (/card-profile/.test(c.ph.src)) { c.ph.style.objectFit = 'contain'; c.card.style.background = C.canvas } })
  const word = (txt) => el('div', { position: 'absolute', fontFamily: SANS, fontSize: '68px', color: C.ink, whiteSpace: 'nowrap', letterSpacing: '-0.015em', opacity: 0 }, root, txt)
  const wTop = word('every night'), wBot = word('a new deck'), wYou = word('you'), wAlign = word('align')
  wAlign.style.fontFamily = SERIF; wAlign.style.fontStyle = 'italic'; wAlign.style.fontSize = '84px'

  return {
    start: 17.55, end: 22.75, root,
    update(t) {
      // how many cards have been dealt into the stack
      const dealt = clamp((t - 17.55) / 0.2, 0, N - 1)
      const pull = ease.inOutCubic(prog(t, 18.3, 19.4)) // camera pulls back, stack fans out
      const center = ease.inOutCubic(prog(t, 20.45, 21.1))
      cards.forEach((c, i) => {
        const k = N - 1 - i // 0 = front
        const front = dealt - (N - 1 - k) // >0 once this card has been dealt in
        const vis = clamp((dealt - (N - 1 - k) + 1))
        // early phase: cards replace each other in place with a yaw; later: fanned trail
        const off = Math.max(0, dealt - (N - 1 - k)) // how far behind the front this card is
        const depth = Math.min(off, N)
        const squeeze = lerp(1, 0.45, center)
        const trailX = (-depth * lerp(10, 92, pull) - depth * depth * lerp(0, 2.2, pull)) * squeeze
        const trailY = depth * lerp(2, 26, pull) * squeeze
        const trailZ = -depth * lerp(30, 120, pull)
        const yaw = lerp(lerp(-28, 0, clamp(front)), 32, pull * clamp(depth / 1.2))
        const baseX = lerp(lerp(0, 330, pull), 170, center)
        const s = lerp(1.15, 0.78, pull)
        c.card.style.transform = `translate(-50%,-50%) perspective(2200px) translate3d(${baseX + trailX}px, ${trailY - 10}px, ${trailZ}px) rotateY(${yaw}deg) scale(${s})`
        c.card.style.opacity = String(vis * (depth > 11 ? clamp(13 - depth) : 1))
        c.card.style.zIndex = String(100 - Math.round(depth))
      })
      // words
      const fx = lerp(330, 40, center) * lerp(1, 1, 0)
      const cardH = 540 * 0.78
      const showA = (a) => ease.outCubic(prog(t, a, a + 0.35))
      const hideA = 1 - prog(t, 20.35, 20.5)
      wTop.style.left = (W / 2 + fx + 60) + 'px'; wTop.style.top = (H / 2 - cardH / 2 - 100) + 'px'
      wBot.style.left = (W / 2 + fx + 80) + 'px'; wBot.style.top = (H / 2 + cardH / 2 + 10) + 'px'
      wTop.style.opacity = String(showA(19.0) * hideA); wTop.style.transform = `translateY(${(1 - showA(19.0)) * 20}px)`
      wBot.style.opacity = String(showA(19.35) * hideA); wBot.style.transform = `translateY(${(1 - showA(19.35)) * 20}px)`
      const fy = H / 2 - 50
      wYou.style.left = (W / 2 - 640) + 'px'; wYou.style.top = fy + 'px'
      wAlign.style.left = (W / 2 + 400) + 'px'; wAlign.style.top = (fy - 14) + 'px'
      wYou.style.opacity = String(showA(21.0)); wAlign.style.opacity = String(showA(21.25))
      wYou.style.transform = `translateX(${(1 - showA(21.0)) * -30}px)`
      wAlign.style.transform = `translateX(${(1 - showA(21.25)) * 30}px)`
      root.style.opacity = String(1)
    },
  }
}
