// "Lonely" half b (14.8–30.0): the answer. The Talk Deck, real questions, being listened to → "You deserve to be known."
// One scene on one sky: it starts on half a's handoff H exactly (drawSky zoom 1, dx 0, dy 0, dim 1, moon (1716,122)
// r52 phase .12, grain 0.5) and fades in over a 14.8 → 15.0, then the camera drifts from rest (zero velocity at 15.0).
// Layers: sky canvas · warm aurora (19.8–25.3) · objects (card, phone) · pixel stars · grain · type (captions, end line,
// lockup) · black plate. Parts: talk.js (15.1–25.2), end.js (24.85–30.0), aurora.js.
import { lerp, prog, ease, tw, rng, el, C } from '../../../../src/lib.js'
import { W, H, fill } from '../../../../src/scenes/common.js'
import { drawSky, drawGrain, grainOpacity, drawPixelStar, buildStarSprite, layerCanvas } from '../../../sky.js'
import { buildAurora } from './aurora.js'
import { buildTalk, TT, ORG, MSGS } from './talk.js'
import { buildEnd, ET, endCues } from './end.js'

const T0 = 14.8, T1 = 30.01, T_H = 15.0
const AU_IN = [19.7, 20.7], AU_OUT = [24.6, 25.4]

// camera: still at 15.0 (half a's H), then eases into a slow drift + push-in (no velocity step)
function drift(t) { const s = t - T_H; return s <= 0 ? 0 : s < 1 ? 0.5 * s * s : s - 0.5 }
export function cam(t) { const u = drift(t); return { zoom: 1 + 0.0045 * u, dx: -6.5 * u, dy: 2.6 * u } }
export function moonPose(t) { const c = cam(t); return { x: W / 2 + (1716 - W / 2) * c.zoom + c.dx, y: H / 2 + (122 - H / 2) * c.zoom + c.dy, r: 52 * c.zoom, phase: 0.12, alpha: 1 } }

async function build(stage) {
  const root = fill(stage, { background: C.void, opacity: 0 })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  // an indigo pocket that holds contrast under the card/phone/caption band; eases in slowly after H
  const pocket = document.createElement('canvas'); pocket.width = W; pocket.height = H
  {
    const pk = pocket.getContext('2d')
    pk.save(); pk.translate(W / 2, H / 2); pk.scale(1, 0.6)
    const g = pk.createRadialGradient(0, 0, 0, 0, 0, 980)
    g.addColorStop(0, 'rgba(11,6,32,0.5)'); g.addColorStop(0.55, 'rgba(11,6,32,0.3)'); g.addColorStop(1, 'rgba(11,6,32,0)')
    pk.fillStyle = g; pk.fillRect(-1100, -1100, 2200, 2200); pk.restore()
  }
  const aurora = buildAurora(root)
  const objs = fill(root, { background: 'transparent' })
  const pxC = layerCanvas(root), px = pxC.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const type = fill(root, { background: 'transparent' })
  const talk = buildTalk(objs, type)
  const end = buildEnd(type)
  const black = fill(root, { background: '#000', opacity: 0 })
  const spriteS = buildStarSprite(true)

  // pixel field (warm palette), kept off the card / caption / moon areas
  const fr0 = rng(5150), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const FIELD = []
  while (FIELD.length < 22) {
    const x = fr0() * W, y = fr0() * H
    if (x > 300 && x < 1860 && y > 120 && y < 900) continue
    if (x > 1560 && y < 300) continue
    FIELD.push({ x, y, s: fr0() < 0.3 ? 28 : 21, col: PIXC[Math.floor(fr0() * PIXC.length)], ph: fr0() * 6.28, sp: 2 + fr0() * 3, kind: Math.floor(fr0() * 4), t0: 15.6 + fr0() * 1.6 })
  }
  // bursts: on the flip (16.40, around the card) and on the landing in the phone (20.20)
  const br = rng(2611)
  const burst = (n, d0, d1) => Array.from({ length: n }, (_, i) => ({ a: (i / n) * Math.PI * 2 + br() * 0.35, d: d0 + br() * (d1 - d0), s: br() < 0.4 ? 28 : 21, col: ['#ffe2a0', '#fff6ea', '#f2c75c', '#ffbed6'][i % 4], dl: br() * 0.08 }))
  const B_FLIP = burst(18, 260, 420), B_LAND = burst(14, 150, 280)
  let from = null

  return {
    start: T0, end: T1, root,
    update(t) {
      // fade in over half a's dissolve: identical sky underneath, so only a's last room light dissolves away
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T_H)))
      const c = cam(t), m = moonPose(t)
      drawSky(bx, t, { zoom: c.zoom, dx: c.dx, dy: c.dy, dim: 1, moon: m })
      end.moonGlow(bx, t, m)
      bx.globalAlpha = ease.inOutQuad(prog(t, T_H, T_H + 1.2)); bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1

      const auK = ease.inOutQuad(prog(t, AU_IN[0], AU_IN[1])) * (1 - ease.inOutQuad(prog(t, AU_OUT[0], AU_OUT[1])))
      aurora.update(t, auK, ease.inOutQuad(prog(t, AU_IN[0], AU_IN[1])))
      talk.update(t)
      end.update(t)

      // ── pixel layer
      px.clearRect(0, 0, W, H)
      const fr = Math.round(t * 30)
      px.imageSmoothingEnabled = false
      FIELD.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.4)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.02) return
        px.globalAlpha = a
        drawPixelStar(px, s.x + c.dx * 1.2, s.y + c.dy * 1.2, s.s, ((fr >> 1) + i) % 5 === 0 ? 2 : s.kind, s.col)
      })
      px.globalAlpha = 1
      // the star the card is dealt out of: glints, swells, then the card leaves it
      {
        const g = tw(t, [[TT.GLINT, 0], [TT.GLINT + 0.22, 1, ease.outQuad], [TT.FLY0 + 0.1, 0.9], [TT.FLY0 + 0.6, 0, ease.inOutQuad]])
        if (g > 0.003) {
          px.globalCompositeOperation = 'lighter'; px.globalAlpha = g
          const R = 40 + 50 * g; px.drawImage(spriteS, ORG.x - R, ORG.y - R, R * 2, R * 2)
          px.globalCompositeOperation = 'source-over'
          drawPixelStar(px, ORG.x, ORG.y, g > 0.6 ? 35 : 28, 0, '#f2c75c', '#fff6dc')
          px.globalAlpha = 1
        }
      }
      // sparkle trail behind the dealt card
      if (t > TT.FLY0 && t < TT.FLY1 + 0.3) {
        for (let k = 1; k <= 6; k++) {
          const tt = t - k * 0.045
          if (tt < TT.FLY0) break
          const s = talk.cardState(tt)
          const a = (1 - k / 7) * (1 - prog(t, TT.FLY1 - 0.1, TT.FLY1 + 0.3))
          px.globalAlpha = a * ((fr + k) % 3 === 0 ? 0.5 : 1)
          drawPixelStar(px, s.x + (k % 2 ? 10 : -10), s.y + (k % 3) * 8 - 8, 21, 2, k % 2 ? '#ffe2a0' : '#ffbed6')
        }
        px.globalAlpha = 1
      }
      const doBurst = (B, t0, x0, y0) => B.forEach(b => {
        const p = prog(t, t0 + b.dl, t0 + b.dl + 0.75)
        if (p <= 0 || p >= 1) return
        const d = ease.outCubic(p) * b.d
        px.globalAlpha = (1 - ease.inQuad(p)) * ((fr + Math.round(b.a * 10)) % 3 === 0 ? 0.6 : 1)
        drawPixelStar(px, x0 + Math.cos(b.a) * d, y0 + Math.sin(b.a) * d * 0.9, b.s, p < 0.5 ? 0 : 2, b.col)
        px.globalAlpha = 1
      })
      doBurst(B_FLIP, TT.FLASH, 600, 520)
      { const s = talk.cardState(TT.LAND); doBurst(B_LAND, TT.LAND, s.x, s.y) }
      // tiny twinkles at the phone's corners while it is up
      if (t > TT.PH1 - 0.2 && t < TT.EXIT1) {
        const a = 0.55 * ease.outQuad(prog(t, TT.PH1 - 0.2, TT.PH1 + 0.2)) * (1 - prog(t, TT.EXIT0, TT.EXIT1 - 0.1))
        ;[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy], i) => {
          const p = talk.toScene(t, talk.PW / 2 + sx * (talk.PW / 2 + 24), talk.PH / 2 + sy * (talk.PH / 2 + 24))
          px.globalAlpha = a * (0.55 + 0.45 * Math.sin(t * (3.1 + i * 0.7) + i * 1.9))
          drawPixelStar(px, p.x, p.y, 21, 2, i % 2 ? '#ffe2a0' : '#fff6ea')
        })
        px.globalAlpha = 1
      }
      px.imageSmoothingEnabled = true
      // the two stars of the end, lifted off the last two bubbles
      if (t >= ET.STARS0) {
        if (!from) from = [talk.bubbleScene(ET.STARS0, MSGS.length - 1), talk.bubbleScene(ET.STARS0, MSGS.length - 2)]
        end.stars(px, t, from)
      }

      drawGrain(gx, t)
      black.style.opacity = String(ease.inOutQuad(prog(t, ET.OUT, ET.END)))
    },
  }
}

export const SCENES = [build]
export const CUES = [
  ['bell', TT.GLINT + 0.05, 1174.66, 0.035, 1.8, 0.35],           // a star glints high right (D6)
  ['whoosh', TT.FLY0, 0.65, 0.09],                                 // a card is dealt out of it
  ['tick', TT.FLIP0 + 0.2, 0.05],                                  // the flip
  ['bell', TT.FLASH, 880, 0.05, 2.2, -0.15],                       // face up (A5) + glint
  ['bell', TT.FLASH + 0.03, 1318.51, 0.03, 1.6, -0.2],
  ['glitter', TT.FLASH, TT.FLASH + 0.55],
  ['bell', 16.07, 587.33, 0.04, 2.2, 0.2],                         // "No small talk."
  ['bell', 17.96, 739.99, 0.04, 2.2, 0.2],                         // "Real questions."
  ['tick', TT.FAN0 + 0.05, 0.04], ['tick', TT.FAN0 + 0.12, 0.035], // the hand fans out
  ['whoosh', TT.MOVE0 - 0.02, 0.6, 0.08],                          // the card drops into the phone
  ['bell', TT.LAND, 1174.66, 0.045, 1.6, -0.25],                   // lands in the slot (D6)
  ['glitter', TT.LAND, TT.LAND + 0.45],
  ['bell', 20.37, 440, 0.035, 2.2, 0.2],                           // "Then you talk in cards."
  ['tick', TT.PRESS, 0.06],                                        // played
  ['whoosh', TT.SCR0, 0.45, 0.05],
  ['tick', TT.SEAL[0], 0.035], ['tick', TT.SEAL[1], 0.035],        // both answer (sealed)
  ['bell', TT.OPEN0, 880, 0.045, 2.4, -0.2],                       // answers open together
  ['bell', TT.OPEN0 + 0.04, 1108.73, 0.035, 2.2, 0.2],
  ['glitter', TT.OPEN0, TT.OPEN0 + 0.5],
  ['bell', 22.72, 587.33, 0.035, 2.4, 0.2],                        // "And someone finally listens."
  ...MSGS.filter(m => m.dots).map(m => ['tick', m.show, 0.04]),    // replies land
  ['bell', MSGS[MSGS.length - 1].show, 1479.98, 0.025, 2.0, -0.1], // "I really do."
  ['whoosh', TT.EXIT0, 0.5, 0.05],                                 // phone + captions drift away
  ...endCues,
]
