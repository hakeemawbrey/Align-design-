// D1 · WE'VE MADE PEOPLE DISPOSABLE (0–5.25). The film opens on the problem. A cold, grainy stack of generic B&W
// profile cards sits in the middle of a slow-drifting wall of faces. Card after card is swiped away — slowly at first,
// a little quicker later, never a blur. 'We’ve made people disposable.' lands word by word by ~1.4 and holds.
// The room dims to dark by 5.2; d2 wakes the phone from that dark.
import { clamp, lerp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { ROOM_BG, GRAIN, SILVER, H_CARD, CARD_S, grainLayer, words, capStyle, makeFaceCard, coldBackdrop } from './common.js'

export const D1_END = 5.25
const DARK0 = 4.6, DARK1 = 5.2                    // the room dims to dark (d2 starts from it)
const CAP0 = 0.3, CAP_OUT0 = 4.35, CAP_OUT1 = 4.85

// slowly at first: ~1 s a card, easing to ~0.6 s — calm, one card in the air at a time (two at most)
export const SWIPES = [0.95, 1.95, 2.8, 3.5, 4.1, 4.65]
const FLIGHT = 0.95
const N = SWIPES.length
const dirOf = k => (k === 2 || k === 4) ? 1 : -1
const faceOf = k => [7, 11, 2, 9, 5, 12, 1, 4, 6][k]
const STACK_X = H_CARD.cx, STACK_Y = H_CARD.cy - 20

export default function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const cold = coldBackdrop(root, 16)
  cold.root.style.zIndex = '0'
  const backGrain = grainLayer(cold.root, 0.3, '5')

  const deck = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', zIndex: '10' }, root)
  const cards = Array.from({ length: N + 3 }, (_, k) => {
    const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: String(1000 - k) }, deck)
    return { holder, ...makeFaceCard(holder, faceOf(k), k) }
  })

  // the line (bottom pocket under the stack)
  const pocket = el('div', { position: 'absolute', left: 0, top: '800px', width: W + 'px', height: '280px', zIndex: '2900',
    background: 'radial-gradient(52% 55% at 50% 55%, rgba(10,11,15,0.6) 0%, rgba(10,11,15,0.25) 60%, rgba(10,11,15,0) 100%)' }, root)
  const cap = words(root, 'We’ve made people disposable.', { ...capStyle(116), left: 0, width: W + 'px', top: '858px', textAlign: 'center', zIndex: '3000' }, CAP0, 0.18, 0.55)

  const dark = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '3800', pointerEvents: 'none', opacity: 0 }, root)
  const grain = grainLayer(root, GRAIN)
  const silver = grainLayer(root, SILVER, '3900', 'screen')

  return {
    start: 0, end: D1_END, root,
    update(t) {
      cold.update(t); backGrain.update(t)
      // the film fades up from black over the first beat
      const up = ease.inOutQuad(prog(t, 0, 0.7))
      cards.forEach((c, k) => {
        const s = k < N ? SWIPES[k] : Infinity
        if (t >= s + FLIGHT) { c.holder.style.display = 'none'; return }
        // how many cards are still above this one (eased: the next card comes forward over 0.5 s)
        let depth = 0
        for (let j = 0; j < Math.min(k, N); j++) depth += 1 - ease.inOutQuad(prog(t, SWIPES[j] + 0.1, SWIPES[j] + 0.6))
        if (depth > 2.6) { c.holder.style.display = 'none'; return }
        c.holder.style.display = 'block'
        const d = dirOf(k)
        let x = STACK_X, y = STACK_Y + 24 * depth, rot = 0, sc = CARD_S * (1 - 0.05 * depth)
        const bright = 1 - 0.3 * depth
        // a slow lean before the swipe, then a calm throw off-frame
        const lean = ease.inOutQuad(prog(t, s - 0.4, s))
        x += d * 34 * lean; rot += d * 3.5 * lean
        if (t >= s) {
          const u = prog(t, s, s + FLIGHT), e = ease.inCubic(u) * 0.85 + u * 0.15
          x += d * 1500 * e; y += -20 * u + 90 * e; rot += d * 14 * e
        }
        c.holder.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px) rotate(${rot.toFixed(3)}deg) scale(${sc.toFixed(4)})`
        c.holder.style.opacity = String(clamp((2.6 - depth) * 1.2))
        c.card.style.filter = bright < 1 ? `brightness(${Math.max(0.3, bright).toFixed(3)})` : ''
        // the verdict stamp fades on as the card leans (no pop)
        const st = d < 0 ? c.stampX : c.stampH
        const sp = ease.inOutQuad(prog(t, s - 0.45, s - 0.05))
        st.style.opacity = String(sp)
        st.style.transform = `scale(${lerp(1.12, 1, sp).toFixed(3)}) rotate(${d * -8}deg)`
      })
      deck.style.opacity = String(up)
      cold.root.style.opacity = String(lerp(0.35, 1, up))

      const capOut = 1 - ease.inOutQuad(prog(t, CAP_OUT0, CAP_OUT1))
      cap.update(t, capOut)
      pocket.style.opacity = String(ease.inOutQuad(prog(t, 0.1, 0.8)) * capOut)
      dark.style.opacity = String(Math.max(1 - ease.inOutQuad(prog(t, 0, 0.6)), ease.inOutQuad(prog(t, DARK0, DARK1))))
      grain.update(t); silver.update(t)
    },
  }
}

export const cues = [
  ...SWIPES.map((s, k) => ['whoosh', s, 0.7, 0.035 + 0.005 * (k % 2)]),
  ...SWIPES.map(s => ['tick', s - 0.05, 0.018]),
  ['bell', CAP0 + 0.1, 164.81, 0.025, 3.2, 0],                   // the opening line — low, alone
]
