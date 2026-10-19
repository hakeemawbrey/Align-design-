// swipes · S2 · TONIGHT'S DECK (4.9–10.5). One star in the sky brightens, falls and lands as the Align card back
// (dealt from the stars). The back becomes a small deck; five cards are dealt to a soft arc, each turning face-up
// (veiled profile cards: no faces). "TONIGHT'S DECK" / "Every night, a new deck." Then the hand drifts apart and fades.
// (Card renderer + deal recipe from ghosted half b.)
import { clamp, lerp, prog, ease, tw, rng, el, C, TypeLine } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { getSky, layerCanvas, loadArt, drawCard, glint, pocketCanvas, pixStar } from './kit.js'

const T0 = 4.9, T1 = 10.5

// the star that falls and becomes the card
const STAR = { x: 1290, y: 236, glow: 4.95, fall: 5.22, land: 5.55 }
const HO = { x: 960, y: 500, h: 440 }
const DECK = { x: 960, y: 400, h: 330 }
const FORM = { a: 5.75, b: 6.35 }
const SLOT = k => ({ x: 960 + k * 300, y: 400 + k * k * 8, rz: k * 2.2 })
const HAND = [[-1, 'p1'], [1, 'p2'], [-2, 'p6'], [2, 'p4'], [0, 'p3']]
const DEAL = [6.45, 6.75, 7.05, 7.35], FLY = 0.58
const CFLIP = { a: 7.75, b: 8.2 }
const SHINE = { a: 8.35, step: 0.12, len: 0.42 }
const COPY = { eb: 6.45, line: 6.65, out: 10.1 }
const EXIT = { a: 10.1, b: 10.6 }

export default async function build(stage) {
  const root = fill(stage, { background: 'transparent' })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  getSky()
  await loadArt()
  await document.fonts.load(`26px 'Space Mono'`).catch(() => {})
  const spriteS = getSky().spriteS
  const pocket = pocketCanvas(960, 830, 820, 190, 0.6)

  const eb = el('div', { position: 'absolute', left: 0, width: W + 'px', textAlign: 'center', textIndent: '0.32em', top: '708px', fontFamily: MONO, fontSize: '36px', letterSpacing: '0.32em',
    color: C.bone, opacity: 0, whiteSpace: 'pre', textShadow: '0 0 14px rgba(11,6,32,0.9)' }, root, "TONIGHT'S DECK")
  const line = new TypeLine(root, 'Every night, a new deck.', { fontFamily: SERIF, fontStyle: 'italic', fontSize: '100px', lineHeight: '1.1', letterSpacing: '-0.005em', color: C.bone,
    textShadow: '0 2px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)', left: '50%', top: '768px', transform: 'translateX(-50%)' }, { perChar: 0.03, fade: 0.3, accent: [C.violet, C.gold, C.rub] })

  // landing burst
  const br = rng(9191)
  const PAL = ['#efe6d6', '#f2c75c', '#c9a6ff', '#ff8fb1', '#9a7be0', '#ffd98a']
  const BURST = Array.from({ length: 30 }, () => ({ ang: br() * Math.PI * 2, sp: 160 + br() * 260, px: br() < 0.3 ? 4 : 3, col: PAL[Math.floor(br() * PAL.length)], life: 0.45 + br() * 0.5, kind: Math.floor(br() * 4) }))

  return {
    start: T0, end: T1, root,
    update(t) {
      const fr = Math.round(t * 30)
      bx.clearRect(0, 0, W, H)
      bx.globalAlpha = ease.inOutQuad(prog(t, 6.3, 6.8)) * (1 - ease.inOutQuad(prog(t, COPY.out, COPY.out + 0.4)))
      if (bx.globalAlpha > 0) bx.drawImage(pocket, 0, 0)
      bx.globalAlpha = 1

      // ── the star: brightens in place, falls along a gentle curve, lands as the card back
      if (t < STAR.land + 0.05) {
        const gp = ease.inOutQuad(prog(t, T0, STAR.fall))
        const fp = ease.inCubic(prog(t, STAR.fall, STAR.land))
        const bz = (a, b, c, u) => (1 - u) * (1 - u) * a + 2 * (1 - u) * u * b + u * u * c
        const x = bz(STAR.x, 1180, HO.x, fp), y = bz(STAR.y, 300, HO.y, fp)
        const sz = 50 + 120 * gp + 40 * fp
        bx.save(); bx.globalCompositeOperation = 'lighter'
        if (fp > 0) {
          for (let i = 1; i <= 10; i++) {
            const u = Math.max(0, fp - i * 0.035)
            const tx = bz(STAR.x, 1180, HO.x, u), ty = bz(STAR.y, 300, HO.y, u)
            bx.globalAlpha = 0.5 * (1 - i / 11); bx.drawImage(spriteS, tx - sz * 0.35, ty - sz * 0.35, sz * 0.7, sz * 0.7)
          }
        }
        bx.globalAlpha = clamp(0.4 + gp); bx.drawImage(spriteS, x - sz / 2, y - sz / 2, sz, sz)
        bx.restore()
      }
      // landing flash + burst
      const fl = tw(t, [[STAR.land - 0.03, 0], [STAR.land + 0.03, 1, ease.outQuad], [STAR.land + 0.5, 0, ease.inOutQuad]])
      if (fl > 0.003) {
        const g = bx.createRadialGradient(HO.x, HO.y, 0, HO.x, HO.y, 560)
        g.addColorStop(0, `rgba(255,246,230,${0.42 * fl})`); g.addColorStop(0.35, `rgba(220,190,255,${0.18 * fl})`); g.addColorStop(1, 'rgba(180,140,255,0)')
        bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(HO.x - 560, HO.y - 560, 1120, 1120)
        bx.globalCompositeOperation = 'source-over'
      }
      bx.imageSmoothingEnabled = false
      for (const b of BURST) {
        const q = prog(t, STAR.land, STAR.land + b.life)
        if (q <= 0 || q >= 1) continue
        const d = 40 + b.sp * ease.outCubic(q)
        pixStar(bx, HO.x + Math.cos(b.ang) * d * 1.2, HO.y + Math.sin(b.ang) * d * 0.9, b.px, (fr >> 1) % 3 === 0 ? 2 : b.kind, b.col, '#fff3e0', 1 - ease.inQuad(q))
      }
      bx.imageSmoothingEnabled = true

      // ── the card back → the deck → the deal
      if (t >= STAR.land) {
        const ap = prog(t, STAR.land, STAR.land + 0.22)
        const form = ease.inOutCubic(prog(t, FORM.a, FORM.b))
        const top = { x: lerp(HO.x, DECK.x, form), y: lerp(HO.y, DECK.y, form), h: lerp(HO.h * lerp(0.82, 1, ease.outBack(ap)), DECK.h, form) }
        const landGlow = (1 - prog(t, STAR.land, STAR.land + 0.7))
        const ex = ease.inOutCubic(prog(t, EXIT.a, EXIT.b))
        const exA = 1 - ease.inQuad(ex)
        const dealtBy = i => ease.inOutCubic(prog(t, DEAL[i], DEAL[i] + 0.3))
        for (let j = HAND.length - 1; j >= 0; j--) {
          if (j < 4 && t >= DEAL[j]) continue
          if (j === 4 && t >= CFLIP.a) continue
          let depth = j
          for (let i = 0; i < Math.min(j, 4); i++) depth -= dealtBy(i)
          const grow = j === 0 ? 1 : ease.outCubic(prog(t, FORM.a + 0.1 + j * 0.07, FORM.a + 0.5 + j * 0.07))
          if (j > 0 && grow <= 0) continue
          drawCard(bx, 'back', top.x - depth * 1.2 * grow, top.y + depth * 6 * grow, top.h, { rz: (j % 2 ? -1 : 1) * depth * 0.7 * grow, alpha: (j === 0 ? ease.outQuad(ap) : grow) * exA, shadow: j === 0 ? 1 : 0.6 * grow, glow: j === 0 ? landGlow * 0.9 : 0, rim: '226,210,255' })
        }
        const cards = []
        for (let i = 0; i < 4; i++) {
          if (t < DEAL[i]) continue
          const [k, art] = HAND[i], S = SLOT(k)
          const p = prog(t, DEAL[i], DEAL[i] + FLY), e = ease.inOutCubic(p)
          let x = lerp(DECK.x, S.x, e), y = lerp(DECK.y, S.y, e) - Math.sin(Math.PI * p) * 70
          const h = DECK.h * (1 + 0.07 * Math.sin(Math.PI * p))
          const ry = 180 * (1 - ease.inOutCubic(prog(p, 0.2, 1)))
          const rz = lerp(0, S.rz, e) + Math.sin(Math.PI * p) * Math.sign(k) * 5
          const land = prog(t, DEAL[i] + FLY, DEAL[i] + FLY + 0.3)
          y += Math.sin(Math.PI * land) * 4 + Math.sin((t - DEAL[i]) * 1.1 + i * 1.7) * 3 * land
          x += Math.sign(k) * 160 * ex; y -= 30 * ex
          const g = Math.exp(-Math.pow((t - (SHINE.a + (k + 2) * SHINE.step + SHINE.len / 2)) / (SHINE.len / 3), 2))
          cards.push({ art, x, y, h, ry, rz, flying: p < 1, g })
        }
        cards.sort((a, b) => a.flying - b.flying)
        for (const c of cards) drawCard(bx, c.art, c.x, c.y, c.h, { ry: c.ry, rz: c.rz, alpha: exA, back: 'back', shadow: c.flying ? 0.4 : 1, glow: c.g * 0.55 })
        // the centre card turns over in place
        if (t >= CFLIP.a) {
          const fp = prog(t, CFLIP.a, CFLIP.b)
          const y = DECK.y - Math.sin(Math.PI * fp) * 26 + Math.sin((t - CFLIP.b) * 1.0) * 3 * prog(t, CFLIP.b, CFLIP.b + 0.4) - 40 * ex
          const h = DECK.h * (1 + 0.05 * Math.sin(Math.PI * fp))
          drawCard(bx, 'p3', DECK.x, y, h, { ry: 180 * (1 - ease.inOutCubic(fp)), alpha: exA, back: 'back' })
          glint(bx, 'p3', DECK.x, y, h, 0, prog(t, SHINE.a + 2 * SHINE.step, SHINE.a + 2 * SHINE.step + SHINE.len), { alpha: 0.45 * exA, width: 0.08 })
        }
      }

      // ── copy
      eb.style.opacity = String(ease.outQuad(prog(t, COPY.eb, COPY.eb + 0.35)) * (1 - ease.inQuad(prog(t, COPY.out, COPY.out + 0.2))))
      eb.style.letterSpacing = lerp(0.42, 0.32, ease.outCubic(prog(t, COPY.eb, COPY.eb + 0.5))) + 'em'
      line.update(t - COPY.line, { out: COPY.out - COPY.line })
    },
  }
}

export const cues = [
  ['glitter', T0 + 0.05, STAR.fall],
  ['bell', STAR.glow + 0.1, 1318.51, 0.02, 1.6, 0.4],            // a star brightens
  ['whoosh', STAR.fall, STAR.land - STAR.fall + 0.05, 0.07],      // and falls
  ['boom', STAR.land, 0.3],
  ...[293.66, 369.99, 440, 554.37, 587.33].map((f, i) => ['bell', STAR.land + 0.02 + i * 0.05, f, 0.05, 2.4, (i - 2) * 0.2]),
  ['glitter', STAR.land + 0.03, STAR.land + 0.8],
  ['whoosh', FORM.a + 0.05, 0.6, 0.05],
  ...[0, 1, 2, 3].map(j => ['tick', FORM.a + 0.3 + j * 0.07, 0.016]),
  ...DEAL.flatMap((d, i) => [['whoosh', d, 0.5, 0.045], ['tick', d + FLY - 0.02, 0.03], ['bell', d + FLY - 0.01, [880, 987.77, 1108.73, 1318.51][i], 0.018, 1.2, [-0.4, 0.4, -0.6, 0.6][i]]]),
  ['bell', COPY.line, 587.33, 0.04, 2.0, 0],                      // "Every night, a new deck."
  ['whoosh', CFLIP.a, 0.45, 0.04], ['tick', CFLIP.b - 0.04, 0.03],
  ['bell', CFLIP.b - 0.03, 1479.98, 0.026, 1.8, 0],
  ['glitter', SHINE.a, SHINE.a + 4 * SHINE.step + SHINE.len],
  ['whoosh', EXIT.a, 0.6, 0.04],
]
