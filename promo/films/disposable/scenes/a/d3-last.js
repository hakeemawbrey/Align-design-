// D3 · WHAT IF NO ONE WAS DISPOSABLE? (15.9–20.2). Out of d2's dark, everything has cleared: one last face card, still
// and quiet, in the middle of the faint cold wall (which no longer moves). "What if no one was disposable?" The card
// slowly turns face down; at edge-on its back — the Align card back — gently blooms colour and the night sky out of the
// dark. Hand-off H1 (from 19.6, exactly H1 by 19.8): drawSky(zoom 1, dx 0, dy 0, dim 1, moon (1716,122) r52 phase .12
// alpha 1) + grain 0.5, card-back.png BODY height 560 centred at (960,540), upright, still, nothing else.
import { clamp, lerp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, A, fill, img } from '../../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../../sky.js'
import { ROOM_BG, GRAIN, SILVER, H_CARD, CARD_S, grainLayer, words, capStyle, makeFaceCard, coldBackdrop } from './common.js'
import { D2_END } from './d2-phone.js'

export const H_MOON = { x: 1716, y: 122, r: 52, phase: 0.12, alpha: 1 }
const START = 15.9, END = 20.2
const BACK = { iw: 1528, ih: 2347, bx0: 120, by0: 119, bx1: 1440, by1: 2227 }   // card-back.png body box
const BACK_S = H_CARD.bodyH / (BACK.by1 - BACK.by0)
const LAST_FACE = 3

const UP0 = 15.9, UP1 = 16.8                    // out of the dark: the one card, still
const CAP0 = 15.9, CAP_OUT0 = 19.4, CAP_OUT1 = 19.74
const TURN0 = 17.55, TURN1 = 18.85              // the slow turn face down (1.3 s)
const EDGE = lerp(TURN0, TURN1, 0.5)            // edge-on → the sky blooms from the card
const WIPE = 1.1                                // the bloom spreads gently
const SETTLE = 19.6                             // exactly H1 from here
const CX = H_CARD.cx, CY = H_CARD.cy

export default function build(stage) {
  const root = fill(stage, { background: ROOM_BG })
  const cold = coldBackdrop(root, 16)
  cold.root.style.zIndex = '0'
  const backGrain = grainLayer(cold.root, 0.3, '5')
  const hush = el('div', { position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 50% 50%, rgba(20,23,29,0.15) 0%, rgba(20,23,29,0.6) 100%)' }, root)
  const skyC = layerCanvas(root, { opacity: 0 }), sx = skyC.getContext('2d')
  const maskC = document.createElement('canvas'); maskC.width = W / 2; maskC.height = H / 2
  const mx = maskC.getContext('2d')

  // the last card: 3D, front = face card, back = Align card back (BODY 560 tall at H1)
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, zIndex: '500' }, root)
  const card3d = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' }, holder)
  const front = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden' }, card3d)
  const frontS = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transform: `scale(${CARD_S})` }, front)
  const face = makeFaceCard(frontS, LAST_FACE, 2)
  const fWash = el('div', { position: 'absolute', inset: 0, background: '#dfe6ff', mixBlendMode: 'screen', opacity: 0 }, face.card)
  const back = el('div', { position: 'absolute', left: 0, top: 0, width: 0, height: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }, card3d)
  const bcx = (BACK.bx0 + BACK.bx1) / 2, bcy = (BACK.by0 + BACK.by1) / 2
  img(back, A + 'card-back.png', { left: -bcx * BACK_S + 'px', top: -bcy * BACK_S + 'px', width: BACK.iw * BACK_S + 'px', height: BACK.ih * BACK_S + 'px' })
  const bWash = el('div', { position: 'absolute', left: -(bcx - BACK.bx0) * BACK_S + 'px', top: -(bcy - BACK.by0) * BACK_S + 'px', width: (BACK.bx1 - BACK.bx0) * BACK_S + 'px', height: (BACK.by1 - BACK.by0) * BACK_S + 'px',
    borderRadius: 84 * BACK_S + 'px', background: '#f3e6ff', mixBlendMode: 'screen', opacity: 0 }, back)
  const edge = el('div', { position: 'absolute', left: '-2px', top: -H_CARD.bodyH / 2 + 16 + 'px', width: '4px', height: H_CARD.bodyH - 32 + 'px', borderRadius: '2px',
    background: 'linear-gradient(180deg, rgba(239,230,214,0.3), #f6ecdf 20%, #d9c4ff 50%, #f6ecdf 80%, rgba(239,230,214,0.3))', boxShadow: '0 0 8px 1px rgba(214,190,255,0.5)', transform: 'rotateY(90deg)', opacity: 0 }, card3d)

  // copy (bottom pocket, under the card)
  const pocket = el('div', { position: 'absolute', left: 0, top: '800px', width: W + 'px', height: '280px', zIndex: '2900',
    background: 'radial-gradient(52% 55% at 50% 55%, rgba(10,9,20,0.6) 0%, rgba(10,9,20,0.25) 60%, rgba(10,9,20,0) 100%)' }, root)
  const dark = el('div', { position: 'absolute', inset: 0, background: ROOM_BG, zIndex: '2950', pointerEvents: 'none' }, root)   // in from d2's dark (the line sits above it)
  const cap = words(root, 'What if no one was disposable?', { ...capStyle(116), left: 0, width: W + 'px', top: '858px', textAlign: 'center', zIndex: '3000' }, CAP0, 0.09, 0.5)
  const grain = grainLayer(root, GRAIN)
  const silver = grainLayer(root, SILVER, '3900', 'screen')

  const turnAng = t => {
    if (t < TURN0) return 0
    if (t < TURN1) return 180 * (0.5 - 0.5 * Math.cos(Math.PI * prog(t, TURN0, TURN1)))
    return 180
  }

  return {
    start: START, end: END, root,
    update(t) {
      dark.style.opacity = String(1 - ease.inOutQuad(prog(t, UP0, UP1)))
      const coldOn = t < EDGE + WIPE + 0.05
      cold.root.style.display = coldOn ? 'block' : 'none'
      if (coldOn) { cold.update(Math.min(t, START)); backGrain.update(t) }        // the wall has stopped
      cold.wall.style.opacity = String(0.42 * (1 - 0.25 * ease.inOutQuad(prog(t, UP0, TURN0))))

      // the card: still; a slight lift through the turn, then flat and upright at H1
      const ang = turnAng(t), ca = Math.cos(ang * Math.PI / 180)
      const lift = Math.sin(Math.PI * prog(t, TURN0, TURN1))
      if (t >= SETTLE) {
        holder.style.transform = `translate(${CX}px, ${CY}px)`
        card3d.style.transform = 'rotateY(180deg)'
      } else {
        holder.style.transform = `translate(${CX}px, ${(CY - 6 * lift).toFixed(2)}px) scale(${(1 + 0.02 * lift).toFixed(4)})`
        card3d.style.transform = `perspective(2600px) rotateX(${(3 * lift).toFixed(3)}deg) rotateY(${ang.toFixed(3)}deg)`
      }
      fWash.style.opacity = String(ang < 90 ? 0.25 * clamp(1 - ca) : 0)
      bWash.style.opacity = String(ang > 90 && t < SETTLE ? 0.28 * clamp(1 + ca) : 0)
      edge.style.opacity = String(t < SETTLE ? 0.8 * clamp((0.3 - Math.abs(ca)) / 0.25) : 0)

      // the sky blooms gently from the card's edge line
      const bloom = prog(t, EDGE - 0.05, EDGE + WIPE)
      if (bloom > 0) {
        skyC.style.opacity = '1'
        const settle = ease.inOutCubic(prog(t, EDGE, SETTLE))
        const ex = 1 + 0.18 * (1 - ease.inOutQuad(prog(t, EDGE, SETTLE)))
        skyC.style.filter = t < SETTLE && ex > 1.0005 ? `brightness(${ex.toFixed(3)})` : 'none'
        const zoom = lerp(1.04, 1, settle)
        const ma = ease.inOutQuad(prog(t, EDGE + 0.4, SETTLE))
        drawSky(sx, t, { zoom: t < SETTLE ? zoom : 1, dx: 0, dy: 0, dim: 1, moon: { ...H_MOON, alpha: t < SETTLE ? ma : 1 } })
        if (bloom < 1) {
          const hh = H_CARD.bodyH / 2, r = 20 + 1350 * ease.inOutQuad(bloom)
          mx.setTransform(1, 0, 0, 1, 0, 0); mx.clearRect(0, 0, W / 2, H / 2)
          mx.filter = 'blur(40px)'; mx.fillStyle = '#000'
          mx.setTransform(0.5, 0, 0, 0.5, 0, 0)
          mx.beginPath(); mx.roundRect(CX - r, CY - hh - r, 2 * r, 2 * hh + 2 * r, r); mx.fill(); mx.filter = 'none'
          sx.globalCompositeOperation = 'destination-in'; sx.drawImage(maskC, 0, 0, W, H); sx.globalCompositeOperation = 'source-over'
        }
      } else skyC.style.opacity = '0'
      hush.style.display = bloom >= 1 ? 'none' : 'block'

      // copy
      const out = 1 - ease.inOutQuad(prog(t, CAP_OUT0, CAP_OUT1))
      cap.update(t, out)
      pocket.style.opacity = String(ease.inOutQuad(prog(t, UP0, UP1)) * out)
      const sv = SILVER * (1 - ease.inOutQuad(prog(t, EDGE, EDGE + 0.6)))
      silver.el.style.display = sv > 0 ? 'block' : 'none'
      if (sv > 0) silver.update(t, sv)
      grain.update(t)
    },
  }
}
void D2_END

export const cues = [
  ['bell', CAP0 + 0.1, 146.83, 0.025, 3.4, 0],                          // "What if…"
  ['whoosh', TURN0, TURN1 - TURN0, 0.05],                                // the slow turn
  ['boom', EDGE, 0.16],
  ...[293.66, 369.99, 440, 554.37].map((f, i) => ['bell', EDGE + 0.05 + i * 0.12, f, 0.03, 3.2, (i - 1.5) * 0.2]),
  ['glitter', EDGE + 0.1, EDGE + 1.2],
]
