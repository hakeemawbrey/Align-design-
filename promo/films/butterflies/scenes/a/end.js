// butterflies · THE DARK → THE SKY (12.9–15.2). After the phone goes black: a beat of dark. Then one tiny pixel
// butterfly of light flutters up out of the bottom of the frame; the sky blooms in around it, cold and dim first, then
// into colour. The butterfly folds into a single pixel twinkle and is gone by 14.7. From T.sky (14.75) this paints
// exactly H: drawSky(zoom 1, dx 0, dy 0, dim 1, MOON) — nothing else (grain 0.5 comes from the grain layer).
import { clamp, lerp, prog, ease, rng, noise1 } from '../../../../src/lib.js'
import { drawSky, drawPixelStar } from '../../../sky.js'
import { T, W, H, MOON, cnv } from './shared.js'

// 15×11 pixel butterfly (left half mirrored): X = rose edge, O = gold wing, o = pale gold, B = bone body
const SPRITE = [
  '.XXX.......XXX.',
  'XOOXX.....XXOOX',
  'XOooOX...XOooOX',
  'XOooOXX.XXOooOX',
  '.XOOOOXBXOOOOX.',
  '..XXOOXBXOOXX..',
  '...XOOXBXOOX...',
  '..XOooXBXooOX..',
  '..XOOX.B.XOOX..',
  '...XX..B..XX...',
]
const COL = { X: '#ff8fb1', O: '#f2c75c', o: '#ffd98a', B: '#fff3e0' }
let SPR = null   // built lazily (this module is also imported by the node sound script)
const getSprite = () => {
  if (SPR) return SPR
  const c = cnv(15, SPRITE.length), x = c.getContext('2d')
  SPRITE.forEach((row, j) => [...row].forEach((ch, i) => { if (COL[ch]) { x.fillStyle = COL[ch]; x.fillRect(i, j, 1, 1) } }))
  return (SPR = c)
}

const B0 = 12.75, B1 = 14.62          // the butterfly's life
const path = t => {
  const u = prog(t, B0, B1), e = ease.inOutSine ? ease.inOutSine(u) : u * u * (3 - 2 * u)
  return [lerp(880, 1150, e) + Math.sin(u * 7.2) * 70 * (1 - u * 0.6), lerp(1010, 420, e) + Math.sin(u * 21) * 12]
}

export function prepEnd() {
  const skyC = cnv(W, H), sx = skyC.getContext('2d')

  function butterfly(ctx, t) {
    if (t < B0 || t >= B1 + 0.1) return
    const [x, y] = path(t)
    const grow = ease.outCubic(prog(t, B0, B0 + 0.3)), fold = ease.inCubic(prog(t, B1 - 0.32, B1))
    const px = Math.round(lerp(1, 6, grow) * (1 - fold * 0.85))
    // the glow it carries (it lights the dark a little)
    const ga = 0.32 * grow * (1 - fold)
    ctx.save(); ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(x, y, 0, x, y, 120)
    g.addColorStop(0, `rgba(255,200,120,${ga})`); g.addColorStop(1, 'rgba(255,160,120,0)')
    ctx.fillStyle = g; ctx.fillRect(x - 120, y - 120, 240, 240); ctx.restore()
    // a faint glitter trail of pixel specks
    const r = rng(5)
    for (let i = 1; i <= 7; i++) {
      const tt = t - i * 0.07; if (tt < B0) break
      const [qx, qy] = path(tt), a = (1 - i / 8) * 0.7 * grow * (1 - fold) * (0.5 + 0.5 * noise1(t * 9 + i, 4))
      ctx.fillStyle = `rgba(255,${200 + Math.floor(r() * 40)},150,${a.toFixed(3)})`
      const s = Math.max(2, Math.round(px * 0.6)); ctx.fillRect(Math.round(qx + (r() - 0.5) * 18), Math.round(qy + 10 + (r() - 0.5) * 12), s, s)
    }
    if (px >= 1 && fold < 0.97) {
      // flap: the wings squash toward the body (~6 flaps a second), pixel-crisp
      const fl = Math.abs(Math.cos((t - B0) * Math.PI * 6.2))
      const sxk = Math.max(0.18, fl)
      ctx.save(); ctx.imageSmoothingEnabled = false; ctx.translate(Math.round(x), Math.round(y)); ctx.rotate(0.12 * Math.sin((t - B0) * 3))
      const w = 15 * px, h = SPRITE.length * px
      ctx.globalAlpha = 1 - fold
      ctx.save(); ctx.scale(sxk, 1); ctx.drawImage(getSprite(), -w / 2, -h / 2, w, h); ctx.restore()
      ctx.restore()
    }
    // it folds into one twinkle that fades out by 14.72
    const tw = prog(t, B1 - 0.2, B1) * (1 - prog(t, B1, B1 + 0.1))
    if (tw > 0) drawPixelStar(ctx, Math.round(x), Math.round(y), 28 * (0.6 + 0.4 * tw), 1, `rgba(242,199,92,${tw.toFixed(3)})`, `rgba(255,243,224,${tw.toFixed(3)})`)
  }

  function draw(ctx, t) {
    if (t >= T.sky) { drawSky(ctx, t, { zoom: 1, dx: 0, dy: 0, dim: 1, moon: MOON }); return }
    // the dark, then the sky blooming in: alpha, then colour
    ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, W, H)
    const a = ease.inOutQuad(prog(t, 13.15, 14.3))
    const col = ease.inOutQuad(prog(t, 13.7, T.sky))
    const z = lerp(1.06, 1, ease.outCubic(prog(t, 13.15, T.sky)))
    if (a > 0) {
      drawSky(sx, t, { zoom: z, dx: 0, dy: 0, dim: lerp(0.7, 1, col), moon: MOON })
      ctx.save(); ctx.globalAlpha = a
      ctx.filter = col >= 1 ? 'none' : `saturate(${lerp(0.12, 1, col).toFixed(3)}) brightness(${lerp(0.8, 1, col).toFixed(3)})`
      ctx.drawImage(skyC, 0, 0); ctx.restore()
    }
    butterfly(ctx, t)
  }
  return { draw }
}
