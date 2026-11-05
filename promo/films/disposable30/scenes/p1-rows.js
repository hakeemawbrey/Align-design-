// P1 · PUSH. PULL. ALIGN. (global 9.75–12.75) — right after "Fall for the card. Face last." the camera pushes into
// Juniper's card until its Push / Pull / Align rows fill the frame; everything else sinks into shadow and each row lights
// in its colour (PUSH rose · PULL mint · ALIGN gold) with a glint, while its word types under it: "Push." "Pull." "Align."
// It takes over f3's card frame-exactly (f3.cardPose at TAKE, same card art, same f3 sky) under a 0.2 s crossfade, and
// hands to f5 (the two cards meet) under f5's own 0.2 s fade-in. Row recipe copied from promo/films/pattern/scenes/b/read.js.
import { lerp, prog, ease, tw, el, mix, C } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { cardPose, drawSky, skyPan, plateDim, drawGrain, grainOpacity } from './f3-chart.js'
import { loadArt, drawCard, cardSpace, glint, pocketCanvas, ART } from './pkit.js'

const T0 = 9.75, T1 = 12.75
const TAKE = 9.75                                   // f3's pose is frozen here (it is near-still: the shrink starts at 10.15)
const GO = { a: 9.92, b: 10.55 }                    // push-in on the rows
const ROW_T = [10.62, 11.08, 11.54]                 // each row lights, on the post-flip beat (≈ 1 bar apart)
const OUT = { a: 12.3, b: 12.6 }
const WORDS = ['Push.', 'Pull.', 'Align.']

const PA = ART.p3, BCX = (PA.b[0] + PA.b[2]) / 2, BCY = (PA.b[1] + PA.b[3]) / 2
const ROWS = [[1222, 1372], [1378, 1528], [1534, 1684]]          // Push / Pull / Align bands (card-profile-3 px)
const ROW_X = [214, 1326]
const ROW_COL = ['232,98,138', '127,216,160', '242,199,92']
const ROWS_CY = (ROWS[0][0] + ROWS[2][1]) / 2 - BCY, ROWS_CX = (ROW_X[0] + ROW_X[1]) / 2 - BCX
const bodyH = PA.b[3] - PA.b[1]
const P2 = (() => { const h = 1560, s = h / bodyH; return { x: 960 - ROWS_CX * s, y: 410 - ROWS_CY * s, h } })()

export default async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  bgC.width = W; bgC.height = H
  const bx = bgC.getContext('2d')
  await loadArt()
  const pocket = pocketCanvas(960, 820, 860, 210, 0.8)
  const gC = el('canvas', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px', mixBlendMode: 'overlay', pointerEvents: 'none' }, root)
  gC.width = W; gC.height = H
  const gx = gC.getContext('2d')

  const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '688px', textAlign: 'center', textIndent: '0.32em', fontFamily: MONO, fontSize: '34px',
    letterSpacing: '0.32em', color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)' }, root, 'HOW YOU TWO ACTUALLY FIT')
  const wordsBox = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '748px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '128px',
    lineHeight: '1', whiteSpace: 'pre', color: C.bone, textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)' }, root)
  const wordChars = WORDS.map(w => { const sp = el('span', { display: 'inline-block', margin: '0 0.2em' }, wordsBox); return [...w].map(ch => el('span', { opacity: 0 }, sp, ch)) })
  const band = (y0, y1, pad = 0) => { bx.beginPath(); bx.roundRect(ROW_X[0] - BCX - pad, y0 - BCY, ROW_X[1] - ROW_X[0] + 2 * pad, y1 - y0, 26) }
  const P0 = (() => { const p = cardPose(TAKE); return { x: p.cx, y: p.cy + p.bob, h: p.h } })()

  return {
    start: T0, end: T1, root,
    update(t) {
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.2)))
      const dim = plateDim(TAKE) * (1 - 0.25 * ease.inOutQuad(prog(t, GO.a, GO.b)))
      drawSky(bx, t, { pan: skyPan(P0.x, P0.y), dim })
      gC.style.opacity = String(grainOpacity(dim))

      const k = ease.inOutCubic(prog(t, GO.a, GO.b)), dr = prog(t, GO.b, OUT.b)
      const P = { x: lerp(P0.x, P2.x, k), y: lerp(P0.y, P2.y, k) - 6 * dr, h: lerp(P0.h, P2.h, k) * (1 + 0.03 * dr) }
      drawCard(bx, 'p3', P.x, P.y, P.h, { rz: 0, rim: '255,170,240' })
      bx.save(); cardSpace(bx, 'p3', P.x, P.y, P.h, 0)
      const focus = ease.inOutQuad(prog(t, GO.a + 0.15, GO.b + 0.1))
      if (focus > 0.003) {
        bx.globalAlpha = 0.92 * focus; bx.fillStyle = '#0b0620'
        bx.beginPath()
        bx.roundRect(PA.b[0] - BCX + 3, PA.b[1] - BCY + 3, PA.b[2] - PA.b[0] - 6, PA.b[3] - PA.b[1] - 6, PA.r)
        bx.roundRect(ROW_X[0] - BCX - 30, ROWS[0][0] - BCY - 24, ROW_X[1] - ROW_X[0] + 60, ROWS[2][1] - ROWS[0][0] + 48, 30)
        bx.fill('evenodd')
        bx.globalAlpha = focus
        bx.beginPath(); bx.roundRect(PA.b[0] - BCX + 3, ROWS[2][1] - BCY + 40, PA.b[2] - PA.b[0] - 6, PA.b[3] - ROWS[2][1] - 43, [0, 0, PA.r, PA.r]); bx.fill()
      }
      for (let i = 0; i < 3; i++) {
        const lit = ease.outCubic(prog(t, ROW_T[i], ROW_T[i] + 0.25))
        const wait = focus * (1 - lit) * 0.55
        if (wait > 0.003) { bx.globalAlpha = wait; bx.fillStyle = '#0b0620'; band(ROWS[i][0], ROWS[i][1], 20); bx.fill() }
        const hot = tw(t, [[ROW_T[i], 0], [ROW_T[i] + 0.1, 1, ease.outQuad], [ROW_T[i] + 0.8, 0.35, ease.inOutQuad]]) * focus
        if (hot > 0.003) {
          const y0 = ROWS[i][0] - BCY, y1 = ROWS[i][1] - BCY
          const g = bx.createLinearGradient(ROW_X[0] - BCX, 0, ROW_X[1] - BCX, 0)
          g.addColorStop(0, `rgba(${ROW_COL[i]},${0.32 * hot})`); g.addColorStop(0.5, `rgba(${ROW_COL[i]},${0.12 * hot})`); g.addColorStop(1, `rgba(${ROW_COL[i]},0)`)
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = 1
          bx.fillStyle = g; band(ROWS[i][0], ROWS[i][1], 20); bx.fill()
          bx.fillStyle = `rgba(${ROW_COL[i]},${0.9 * hot})`; bx.shadowColor = `rgba(${ROW_COL[i]},0.9)`; bx.shadowBlur = 30
          bx.fillRect(ROW_X[0] - BCX - 20, y0 + 22, 7, y1 - y0 - 44)
          bx.shadowBlur = 0; bx.shadowColor = 'transparent'
          bx.globalCompositeOperation = 'source-over'
        }
      }
      bx.restore(); bx.globalAlpha = 1
      ROW_T.forEach((rt, i) => glint(bx, 'p3', P.x, P.y, P.h, 0, ease.inOutQuad(prog(t, rt + 0.03, rt + 0.5)), { alpha: 0.9, y0: ROWS[i][0], y1: ROWS[i][1], width: 0.1 }))
      // pocket + words
      const out = 1 - ease.inOutQuad(prog(t, OUT.a, OUT.b))
      bx.globalAlpha = ease.inOutQuad(prog(t, GO.b - 0.3, GO.b + 0.1)) * out; bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1
      eb.style.opacity = String(ease.outQuad(prog(t, GO.b - 0.15, GO.b + 0.2)) * out)
      wordChars.forEach((cs, wi) => cs.forEach((s, j) => {
        const p = prog(t, ROW_T[wi] + 0.04 + j * 0.035, ROW_T[wi] + 0.04 + j * 0.035 + 0.2)
        s.style.opacity = String(ease.outQuad(p) * out)
        const [r, g, b] = ROW_COL[wi].split(',').map(Number)
        const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')
        s.style.color = p >= 1 ? C.bone : mix(hex, C.bone, ease.inQuad(p))
      }))
      drawGrain(gx, t)
    },
  }
}

export const cues = [
  ['whoosh', GO.a, 0.6, 0.08],                                              // push-in on the rows
  ...ROW_T.flatMap((r, i) => [['tick', r + 0.02, 0.05], ['bell', r + 0.03, [587.33, 739.99, 880][i], 0.045, 2.0, [-0.35, 0, 0.35][i]]]),
  ['glitter', ROW_T[2] + 0.05, ROW_T[2] + 0.6],
  ['whoosh', OUT.a, 0.45, 0.05],
]
