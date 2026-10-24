// ─────────────────────────────────────────────── G4 · END (real time 11.2–15.0)
// Same sky spine as g2/g3 (drawSky3, the one crescent moon, shared grain), so the g3→g4 handoff is a pure content
// dissolve: g3's revealed card drifts/fades out 11.0–11.35 while g4's identical sky fades in over it 11.2–11.38.
// Then the closing line and the Align lockup (film 2 f8 recipe, retimed).
// Timing (sound):
//   11.20–11.38 root fades in over g3 (identical sky; g3's card is already fading) — no cards of our own
//   11.24 "Let the stars deal." types in (19 chars × 0.018, fade 0.08 → fully typed ≈11.64), centred, 128px
//   11.28–12.03 six card-shaped glints lift off from g2's hand slots (arc x 252→1668, y≈400–500), glide in and flip
//               over into pixel stars around the line (inside→out, every 0.09s, 0.3s each; tick on each flip);
//               the centre slot's gold card (11.24) flips as "stars" lands ≈11.54 → flare (glitter + bell);
//               11.68 gold glint runs through "stars" · 11.72–12.08 faint links → constellation, fades 12.06 → 12.25
//   11.64–12.20 the line HOLDS alone, fully typed (≈0.56s)
//   12.20–12.55 the line rises to y≈230 (stays 128px) as the lockup forms beneath it
//   12.30–12.68 seed-of-life rings draw · chakra dots light bottom→top 12.35 + i·0.03 (→ 12.68)
//   12.42–12.74 wordmark "Align" · 12.52–12.80 "BLIND BY DESIGN" → complete ≈12.8, held clean to 14.7
//   13.35 one soft chakra pulse up the column · 13.50 the moon glows a touch
//   fade to black 14.70 → 15.00 (black plate reaches 1.0 exactly at 15.0, last frame black; final low boom 14.75)
import { clamp, lerp, prog, ease, tw, rng, mix, el, C } from '../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../src/scenes/common.js'
import { drawSky3, drawGrain, grainOpacity, moonPose3, skyCam3, buildStarSprite, layerCanvas } from '../sky.js'

const T0 = 11.2, T1 = 15.01, T_END = 15.0
const T_TYPE = 11.24, PER = 0.018, FADE = 0.08
const T_DEAL = 11.28, DEAL_STEP = 0.09, DEAL_DUR = 0.3, FLIP0 = 0.62   // card glint flips into a star over p FLIP0→1
const CON_LINK0 = 11.72, CON_LINK1 = 12.08, CON_OUT = 12.06, CON_A = 0.24
const T_RISE = 12.2, T_RINGS = 12.3, T_DOTS = 12.35, T_WORD = 12.42, T_SUB = 12.52
const T_PULSE = 13.35, T_MOON = 13.5, T_OUT = 14.7
const T_HOLD = T_RINGS + 0.45
const LINE = 'Let the stars deal.'
const STARS0 = 8, STARS1 = 12                                  // "stars" char indices
const T_FLARE = T_TYPE + STARS1 * PER + FADE                    // "stars" fully typed (≈11.54)
const T_GLINT = T_FLARE + 0.14                                  // gold glint through "stars"
const canvas = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c }

// pixel-art star sprites (fx-stars language)
const STAR_SPRITES = [
  ['...X...', '...X...', '..XXX..', 'XXXCXXX', '..XXX..', '...X...', '...X...'],
  ['.......', '...X...', '..XXX..', '.XXCXX.', '..XXX..', '...X...', '.......'],
  ['.......', '.......', '...X...', '..XCX..', '...X...', '.......', '.......'],
  ['.......', '.X...X.', '...X...', '..XCX..', '...X...', '.X...X.', '.......'],
].map(rows => rows.flatMap((row, y) => [...row].map((ch, x) => ch === '.' ? null : [x, y, ch === 'C'])).filter(Boolean))
function drawPixelStar(ctx, cx, cy, px, kind, color, centre, a) {
  ctx.globalAlpha = a
  const x0 = Math.round(cx - px * 3.5), y0 = Math.round(cy - px * 3.5)
  for (const [x, y, c] of STAR_SPRITES[kind]) { ctx.fillStyle = c ? centre : color; ctx.fillRect(x0 + x * px, y0 + y * px, px, px) }
  ctx.globalAlpha = 1
}

// ── layout (1920×1080): line rises to y≈250; lockup block beneath
const LINE_Y0 = H / 2, LINE_Y1 = 230, LINE_FS = 128, LINE_S1 = 1.0    // stays 128px after the rise
const MARK = 250, MARK_CY = 507, WORD_TOP = 647, WORD_FS = 118, SUB_TOP = 821, SUB_FS = 30

export default async function build(stage) {
  const root = fill(stage, { background: C.void, opacity: 0 })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  const spriteS = buildStarSprite(true)
  // indigo pocket behind the type/lockup column (bone holds contrast)
  const pocket = canvas(W, H), pk = pocket.getContext('2d')
  pk.save(); pk.translate(W / 2, H / 2); pk.scale(1, 0.62)
  const pg = pk.createRadialGradient(0, 0, 0, 0, 0, 820)
  pg.addColorStop(0, 'rgba(11,6,32,0.58)'); pg.addColorStop(0.6, 'rgba(11,6,32,0.38)'); pg.addColorStop(1, 'rgba(11,6,32,0)')
  pk.fillStyle = pg; pk.fillRect(-1000, -1000, 2000, 2000); pk.restore()

  // grain over the sky only: line + lockup sit above it as solid bone
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(grainOpacity(1)), pointerEvents: 'none' })
  const gx = gC.getContext('2d')

  // ambient pixel twinkles, clear of the type column and the moon
  const pr = rng(31337), PIXC = ['#e8628a', '#f2c75c', '#9a7be0', '#f29a4a', '#ff8fb1', '#c9a6ff', '#ffd98a']
  const PIX = []
  while (PIX.length < 18) {
    const x = pr() * W, y = pr() * H
    if (x > 460 && x < 1460 && y > 140 && y < 880) continue
    if (x > 1560 && y < 280) continue
    PIX.push({ x, y, px: pr() < 0.3 ? 4 : 3, col: PIXC[Math.floor(pr() * PIXC.length)], ph: pr() * 6.28, sp: 2 + pr() * 3, kind: Math.floor(pr() * 4), t0: T0 + 0.2 + pr() * 0.8 })
  }

  // ── dealt constellation: 7 card-shaped glints lift off from where g2's hand of dealt cards sat (the fanned arc
  //    x 252→1668, y≈400–500), glide in toward the line as if dealt by an unseen hand, and flip over into pixel stars
  //    around the line band; then they are linked left→right. The centre (Juniper's) slot holds the gold one, which
  //    flips exactly as "stars" lands and flares. Deal order inside→out, alternating, like g2's hand.
  const SLOT = k => ({ x: 960 + k * 236, y: 400 + k * k * 11, rot: k * 0.085 })
  const NODES = [
    { x: 470, y: 420, k: -3, o: 5 }, { x: 640, y: 655, k: -2, o: 3 }, { x: 830, y: 395, k: -1, o: 1 }, { x: 1080, y: 668, k: 1, o: 0 },
    { x: 1290, y: 410, k: 2, o: 2 }, { x: 1470, y: 640, k: 3, o: 4 },
  ].map((n, i) => ({ ...n, s: SLOT(n.k), kind: i % 2 ? 2 : 1, col: ['#ffecc8', '#c9a6ff', '#ffecc8', '#ff8fb1', '#ffecc8', '#c9a6ff'][i], t: T_DEAL + n.o * DEAL_STEP, spin: n.k < 0 ? -1 : 1 }))
  const GOLD = { x: 1150, y: 445, s: SLOT(0), kind: 0, col: '#f2c75c', t: T_FLARE - DEAL_DUR, spin: 1, gold: true }   // over "stars"; x refined on first update
  const CHAIN = [NODES[0], NODES[1], NODES[2], GOLD, NODES[4], NODES[5], NODES[3]]
  // a small card back: hairline bone frame, faint fill, inner border, a gold edge glint that sweeps as it travels
  const CW = 30, CH = 46
  function drawCard(ctx, sheen, gold, a) {
    ctx.globalAlpha = a
    ctx.beginPath(); ctx.roundRect(-CW / 2, -CH / 2, CW, CH, 5)
    ctx.fillStyle = gold ? 'rgba(242,199,92,0.22)' : 'rgba(201,166,255,0.16)'; ctx.fill()
    ctx.lineWidth = 1.6; ctx.strokeStyle = gold ? 'rgba(255,226,160,0.95)' : 'rgba(255,240,214,0.9)'; ctx.stroke()
    ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(255,240,214,0.35)'; ctx.beginPath(); ctx.roundRect(-CW / 2 + 5, -CH / 2 + 5, CW - 10, CH - 10, 2); ctx.stroke()
    const g = ctx.createLinearGradient(-CW, -CH, CW, CH), m = clamp(sheen, 0.08, 0.92)
    g.addColorStop(m - 0.08, 'rgba(255,236,190,0)'); g.addColorStop(m, 'rgba(255,236,190,0.75)'); g.addColorStop(m + 0.08, 'rgba(255,236,190,0)')
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(-CW / 2, -CH / 2, CW, CH, 5); ctx.fill()
    ctx.globalAlpha = 1
  }
  let measured = false

  // ── closing line (per-char spans)
  const lineBox = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', textAlign: 'center', transformOrigin: '50% 50%', willChange: 'transform' }, root)
  const lineE = el('div', { display: 'inline-block', fontFamily: SERIF, fontStyle: 'italic', fontSize: LINE_FS + 'px', lineHeight: '1', whiteSpace: 'pre', color: C.bone,
    textShadow: '0 0 30px rgba(11,6,32,0.85), 0 2px 10px rgba(11,6,32,0.7)' }, lineBox)
  const chars = [...LINE].map(ch => el('span', { opacity: 0 }, lineE, ch === ' ' ? ' ' : ch))
  const ACC = [C.rub, C.amber, C.gold, C.plum]

  // ── lockup: seed-of-life rings + chakra column, wordmark, sub-line
  const lock = fill(root, { background: 'transparent', transformOrigin: `50% ${MARK_CY + 120}px` })
  const glow = el('div', { position: 'absolute', left: (W / 2 - 520) + 'px', top: (MARK_CY - 380) + 'px', width: '1040px', height: '760px', borderRadius: '50%', opacity: 0,
    background: 'radial-gradient(closest-side, rgba(154,123,224,0.34), rgba(154,123,224,0.12) 55%, rgba(11,6,32,0) 100%)' }, lock)
  const CHK = ['#ff2d3a', '#ff7a2e', '#ffd23f', '#5fdc54', '#2fd0e6', '#4a72ff', '#b45cff']
  const R = 20
  const pet = [[0, 0], ...Array.from({ length: 6 }, (_, k) => { const a = (-90 + k * 60) * Math.PI / 180; return [Math.cos(a) * R, Math.sin(a) * R] })]
  const circles = [...pet.map(([x, y]) => ({ x, y, r: R })), { x: 0, y: 0, r: 40 }]
  const defs = CHK.map((c, i) => `<radialGradient id="g4g${i}"><stop offset="0%" stop-color="${c}" stop-opacity="0.9"/><stop offset="45%" stop-color="${c}" stop-opacity="0.35"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient><radialGradient id="g4c${i}" cx="42%" cy="38%"><stop offset="0%" stop-color="#fff"/><stop offset="35%" stop-color="${c}"/><stop offset="100%" stop-color="${c}"/></radialGradient>`).join('')
  const svg = el('div', { position: 'absolute', left: (W / 2 - MARK / 2) + 'px', top: (MARK_CY - MARK / 2) + 'px', width: MARK + 'px', height: MARK + 'px', opacity: 0 }, lock,
    `<svg width="${MARK}" height="${MARK}" viewBox="-44 -44 88 88" style="overflow:visible"><defs>${defs}</defs>
    <g fill="none" stroke="#d9cdf0" stroke-opacity="0.92" stroke-width="1.15" stroke-linecap="round">${circles.map((c, i) => `<circle class="ring" cx="${c.x}" cy="${c.y}" r="${c.r}" transform="rotate(${-90 + i * 51} ${c.x} ${c.y})" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1"/>`).join('')}</g>
    ${CHK.map((_, i) => `<circle class="halo" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#g4g${i})"/><circle class="core" cx="0" cy="${3 * 10.6 - i * 10.6}" r="0" fill="url(#g4c${i})"/>`).join('')}
    </svg>`)
  const rings = [...svg.querySelectorAll('.ring')], halos = [...svg.querySelectorAll('.halo')], cores = [...svg.querySelectorAll('.core')]
  const word = el('div', { position: 'absolute', left: 0, width: W + 'px', top: WORD_TOP + 'px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: WORD_FS + 'px', lineHeight: 1.1, color: C.bone, textShadow: '0 0 40px rgba(239,230,214,0.25), 0 0 20px rgba(11,6,32,0.8)', opacity: 0 }, lock, 'Align')
  const sub = el('div', { position: 'absolute', left: 0, width: W + 'px', top: SUB_TOP + 'px', textAlign: 'center', fontFamily: MONO, fontSize: SUB_FS + 'px', letterSpacing: '0.32em', textIndent: '0.32em', color: C.bone, textShadow: '0 0 14px rgba(11,6,32,0.9)', opacity: 0 }, lock, 'BLIND BY DESIGN')

  const black = fill(root, { background: '#000', opacity: 0 })

  return {
    start: T0, end: T1, root,
    update(t) {
      // dissolve over g3 (identical sky underneath, so only g3's fading card dissolves)
      root.style.opacity = String(ease.inOutQuad(prog(t, T0, T0 + 0.18)))
      const cam = skyCam3(t), driftX = (cam.dx - 30) * 0.3, driftY = (cam.dy + 10) * 0.3

      drawSky3(bx, t, { moon: 1 })
      // the moon glows a touch as the lockup holds
      {
        const mb = tw(t, [[T_MOON, 0], [T_MOON + 0.3, 1, ease.outQuad], [14.4, 0.55, ease.inOutQuad]])
        if (mb > 0.003) {
          const m = moonPose3(t)
          const g = bx.createRadialGradient(m.x, m.y, m.r * 0.8, m.x, m.y, m.r * 3.2)
          g.addColorStop(0, `rgba(255,240,214,${0.16 * mb})`); g.addColorStop(1, 'rgba(255,240,214,0)')
          bx.globalCompositeOperation = 'lighter'; bx.fillStyle = g; bx.fillRect(m.x - m.r * 3.3, m.y - m.r * 3.3, m.r * 6.6, m.r * 6.6)
          bx.globalCompositeOperation = 'source-over'
        }
      }
      // ambient pixel twinkles
      bx.imageSmoothingEnabled = false
      const fr = Math.round(t * 30), tick = fr >> 1
      PIX.forEach((s, i) => {
        const a = ease.outQuad(prog(t, s.t0, s.t0 + 0.3)) * (0.45 + 0.55 * Math.sin(t * s.sp + s.ph))
        if (a <= 0.02) return
        drawPixelStar(bx, s.x + driftX * 1.2, s.y + driftY * 1.2, s.px, (tick + i) % 5 === 0 ? 2 : s.kind, s.col, '#fff3e0', a)
      })
      bx.imageSmoothingEnabled = true
      bx.globalAlpha = ease.inOutQuad(prog(t, T0, T0 + 0.6)); bx.drawImage(pocket, 0, 0); bx.globalAlpha = 1

      // ── dealt constellation (behind the line), gone by the rise
      if (!measured && lineE.offsetWidth > 0) {
        measured = true
        const sp = chars.slice(STARS0, STARS1 + 1)
        const l = sp[0].offsetLeft, r = sp[sp.length - 1].offsetLeft + sp[sp.length - 1].offsetWidth
        GOLD.x = (l + r) / 2 + 24; GOLD.y = LINE_Y0 - LINE_FS * 0.55 - 34   // offsetLeft is relative to lineBox (full-width, left 0)
      }
      const conOut = 1 - ease.inOutQuad(prog(t, CON_OUT, T_RISE + 0.05))
      const conK = CON_A * conOut
      const pos = n => {   // glides from its g2 slot to its mark (soft lift), turning upright, then flips over into a star
        const p = prog(t, n.t, n.t + DEAL_DUR), e = ease.inOutCubic(p)
        const cx = lerp(n.s.x, n.x, e), cy = lerp(n.s.y, n.y, e) - Math.sin(Math.PI * p) * 36
        const f = prog(p, FLIP0, 1)                          // flip phase: card face-down → edge-on (0.5) → star
        return { x: cx + driftX, y: cy + driftY, p, f, rot: lerp(n.s.rot, 0, e) + (1 - e) * n.spin * 0.35, sx: Math.abs(Math.cos(Math.PI * f)) }
      }
      const dealt = (n, q, a, drawStar) => {   // card glint in flight, a soft flash at edge-on, then the star
        const flash = Math.exp(-Math.pow((q.f - 0.5) / 0.16, 2)) * (q.p < 1 ? 1 : 0)
        if (flash > 0.02) {
          bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a * flash * 0.7
          bx.drawImage(spriteS, q.x - 34, q.y - 34, 68, 68)
          bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
        }
        bx.save(); bx.translate(q.x, q.y); bx.rotate(q.rot); bx.scale(Math.max(0.04, q.sx), 1)
        // a card crossing the type band dims so it reads as passing behind the line
        const behind = 1 - 0.75 * clamp(1 - Math.abs(q.y - LINE_Y0 + 8) / 80) * clamp((q.x - 520) / 40) * clamp((1400 - q.x) / 40)
        if (q.f < 0.5) drawCard(bx, q.p / FLIP0, !!n.gold, a * behind * ease.outQuad(Math.min(1, q.p * 4)))
        else { bx.imageSmoothingEnabled = false; drawStar(); bx.imageSmoothingEnabled = true }
        bx.restore()
      }
      if (conK > 0.003) {
        bx.save(); bx.lineCap = 'round'; bx.lineWidth = 2; bx.strokeStyle = 'rgb(255,236,205)'
        for (let i = 0; i + 1 < CHAIN.length; i++) {
          const a = CHAIN[i], b = CHAIN[i + 1]
          const s0 = lerp(CON_LINK0, CON_LINK1, i / (CHAIN.length - 1)), s1 = lerp(CON_LINK0, CON_LINK1, (i + 1) / (CHAIN.length - 1))
          const l0 = Math.max(s0, a.t + DEAL_DUR, b.t + DEAL_DUR - 0.1), l1 = Math.max(s1, b.t + DEAL_DUR, l0 + 0.1)   // link only between landed stars
          const p = ease.inOutQuad(prog(t, l0, l1))
          if (p <= 0) continue
          bx.globalAlpha = conK
          bx.beginPath(); bx.moveTo(a.x + driftX, a.y + driftY); bx.lineTo(lerp(a.x, b.x, p) + driftX, lerp(a.y, b.y, p) + driftY); bx.stroke()
        }
        bx.restore()
      }
      NODES.forEach((n, j) => {
        const q = pos(n)
        if (q.p <= 0 || conOut <= 0.003) return
        const a = conOut, sa = Math.min(1, CON_A * 2.6) * conOut
        const blink = ((fr >> 1) + j) & 3
        dealt(n, q, a, () => drawPixelStar(bx, 0, 0, q.p < 1 ? 4 : 3, blink === 0 && q.p >= 1 ? 2 : n.kind, n.col, '#fff3e0', sa))
      })
      // the gold node: centre slot, flips into a star exactly as "stars" lands, flares, settles, leaves with the constellation
      {
        const q = pos(GOLD)
        const fl = tw(t, [[T_FLARE - 0.03, 0], [T_FLARE + 0.08, 1, ease.outQuad], [T_FLARE + 0.6, 0.35, ease.inOutQuad]])
        const a = conOut * (0.6 + 0.4 * fl)
        if (q.p > 0 && a > 0.003) {
          if (fl > 0.003) {
            bx.globalCompositeOperation = 'lighter'; bx.globalAlpha = a * fl * 0.8
            bx.drawImage(spriteS, q.x - 40 - 30 * fl, q.y - 40 - 30 * fl, 80 + 60 * fl, 80 + 60 * fl)
            bx.globalCompositeOperation = 'source-over'; bx.globalAlpha = 1
          }
          dealt(GOLD, q, conOut, () => drawPixelStar(bx, 0, 0, fl > 0.6 ? 5 : 4, 0, '#f2c75c', '#fff6dc', a))
        }
      }

      // ── the line (typed with an accent shimmer; gold glint passes through "stars")
      chars.forEach((s, i) => {
        const t0 = T_TYPE + i * PER
        const p = prog(t, t0, t0 + FADE)
        const inStars = i >= STARS0 && i <= STARS1
        const wv = inStars ? Math.exp(-Math.pow((t - (T_GLINT + (i - STARS0) * 0.035)) / 0.1, 2)) : 0
        s.style.opacity = String(ease.outQuad(p))
        const base = p >= 1 ? C.bone : mix(ACC[i % ACC.length], C.bone, ease.inQuad(p))
        s.style.color = wv > 0.02 ? mix(C.bone, '#ffe2a0', wv) : base
        s.style.textShadow = wv > 0.02 ? `0 0 ${20 * wv}px rgba(242,199,92,${0.85 * wv}), 0 0 30px rgba(11,6,32,0.85)` : ''
      })
      const rise = ease.inOutCubic(prog(t, T_RISE, T_RISE + 0.35))
      const ly = lerp(LINE_Y0, LINE_Y1, rise) - LINE_FS * 0.55
      lineBox.style.transform = `translateY(${ly}px) scale(${lerp(1, LINE_S1, rise) * lerp(0.985, 1, ease.outCubic(prog(t, T_TYPE, T_TYPE + 0.6)))})`

      // ── lockup
      rings.forEach((c, i) => c.setAttribute('stroke-dashoffset', String(1 - ease.outCubic(prog(t, T_RINGS + i * 0.02, T_RINGS + 0.24 + i * 0.02)))))
      const pulse = i => 0.6 * tw(t, [[T_PULSE + i * 0.05, 0], [T_PULSE + 0.07 + i * 0.05, 1, ease.outQuad], [T_PULSE + 0.4 + i * 0.05, 0, ease.inOutQuad]])
      const breathe = i => 1 + 0.05 * Math.sin((t - T_HOLD) * 2.4 - i * 0.5) * prog(t, T_HOLD, T_HOLD + 0.3)
      halos.forEach((c, i) => {
        const p = ease.outCubic(prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.15))
        c.setAttribute('r', String(11.1 * p * breathe(i) * (1 + 0.45 * pulse(i))))
        c.setAttribute('opacity', String(Math.min(1, p * (0.9 + 0.1 * breathe(i)) + 0.15 * pulse(i))))
      })
      cores.forEach((c, i) => {
        const p = prog(t, T_DOTS + i * 0.03, T_DOTS + i * 0.03 + 0.14)
        c.setAttribute('r', String(tw(p, [[0, 0], [0.6, 5.55], [1, 3.7]], ease.outQuad) * (1 + 0.22 * pulse(i))))
      })
      svg.style.opacity = String(prog(t, T_RINGS - 0.02, T_RINGS + 0.1))
      svg.style.transform = `scale(${lerp(1.08, 1, ease.outCubic(prog(t, T_RINGS, T_RINGS + 0.38)))})`
      const wp = ease.outCubic(prog(t, T_WORD, T_WORD + 0.32))
      word.style.opacity = String(wp)
      word.style.letterSpacing = lerp(0.12, 0.01, wp) + 'em'
      word.style.filter = wp < 1 ? `blur(${lerp(8, 0, wp)}px)` : 'none'
      word.style.transform = `translateY(${lerp(10, 0, wp)}px)`
      const sp = ease.outQuad(prog(t, T_SUB, T_SUB + 0.28))
      sub.style.opacity = String(sp)
      sub.style.letterSpacing = lerp(0.42, 0.32, sp) + 'em'
      const gP = tw(t, [[T_PULSE, 0], [T_PULSE + 0.25, 1, ease.outQuad], [T_PULSE + 0.75, 0, ease.inOutQuad]])
      glow.style.opacity = String(ease.inOutQuad(prog(t, T_RINGS, T_RINGS + 0.5)) * (0.88 + 0.12 * Math.sin((t - T_HOLD) * 1.9)) + 0.3 * gP)
      glow.style.transform = `scale(${1 + 0.06 * gP})`
      lock.style.transform = `scale(${lerp(1, 1.012, prog(t, T_RINGS, T_END))})`

      // ── grain + fade to black (plate reaches 1 exactly at 15.0)
      drawGrain(gx, t)
      black.style.opacity = String(ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const cues = [
  ...[...LINE].map((ch, i) => ch === ' ' ? null : ['tick', T_TYPE + i * PER, 0.022]).filter(Boolean),   // typing
  ['bell', T_TYPE + 0.02, 587.33, 0.04, 2.4, 0],                 // the line arrives (D5)
  ...[0, 1, 2, 3, 4, 5].map(i => ['tick', T_DEAL + i * DEAL_STEP + DEAL_DUR * (1 + FLIP0) / 2, 0.012]),   // each card flips over into a star
  ['glitter', T_FLARE - 0.02, T_GLINT + 0.4],                    // gold node flares, glint runs through "stars"
  ['bell', T_FLARE, 1760, 0.024, 1.4, 0.3],                      // bell on "stars"
  ['whoosh', T_RISE - 0.02, 0.5, 0.08],                          // line rises, rings draw
  ...[293.66, 369.99, 440, 554.37, 587.33, 739.99, 880].map((f, i) => ['bell', T_DOTS + i * 0.03, f, 0.06, 2.2, (i - 3) * 0.12]),  // chakra chimes bottom→top
  ['boom', T_WORD, 0.2],                                         // wordmark lands
  ['bell', T_WORD + 0.02, 146.83, 0.05, 3.2, 0],
  ...[293.66, 369.99, 440, 587.33, 739.99, 880, 1174.66].map((f, i) => ['bell', T_PULSE + i * 0.05, f, 0.018, 1.6, (i - 3) * 0.1]),  // soft pulse up the column
  ['boom', T_OUT + 0.05, 0.3],                                   // final low boom into black
  ['bell', T_OUT + 0.06, 73.42, 0.05, 3.0, 0],
]
