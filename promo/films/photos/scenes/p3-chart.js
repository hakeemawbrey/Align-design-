// photos · P3 THE ANSWER (ticks from 0.1, card 2.95–10.4). "Charts don't." → chart first → the face comes after.
//   0.10–2.75  corner ticks frame the hook photo (they jitter with the glitches)
//   2.95–3.20  Juniper's blind card (card-profile-3, aura veil) lands over the blurred-away photo, same footprint;
//              the ticks pull in and re-frame it 3.0–3.4
//   3.40/3.57  "Charts don't." (fully on 3.77, out 5.30–5.50)
//   5.35–5.60  ticks converge and go · 5.40–6.05 the card glides right (1290,480 · body h 784, hero scale)
//   5.78/5.98/6.18  Sun — Libra · Moon — Gemini · Rising — Aquarius (Juniper's real big three, app data)
//   7.00       "The face comes after." (in-app line; fully on ~7.86, out 9.95–10.15)
//   8.40–9.10  the veil lifts: aura-cam sweep across the photo window → her real, unfiltered face (juniper.jpg)
//   9.00       full moon (badge) · 8.95–9.70 sparkles · 9.10 "REVEALED TONIGHT" chip
//   9.95–10.40 everything clears for the end
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { A, IMG, img } from '../../../src/scenes/common.js'
import { W, H, SANS, SERIF, MONO, BONE, ROSE, CARD, PNG, BODY_W, FI, hash, makeTicks, wordLine, ITAL, pixelStar, STAR3, STAR5, STAR7 } from './kit.js'

// photo window inside card-profile-3.png (png px), and juniper.jpg placement (film3 g3)
const WIN = { x: 223, y: 347, w: 1064, h: 562, r: 36 }
const PH = { s: 1.72, w: 720, h: 960, fx: 348, fy: 516 }
const PH_W = PH.w * PH.s, PH_H = PH.h * PH.s, PH_L = WIN.w / 2 - PH.fx * PH.s, PH_T = WIN.h * 0.5 - PH.fy * PH.s

const T = { cardIn: 2.95, cap: 3.4, capOut: 5.3, glide: [5.4, 6.05], rows: [5.78, 5.98, 6.18], line: 7.0, rev: [8.4, 9.1], chip: 9.1, out: 9.95 }
const K = [[2.95, 960, 455, 620], [5.4, 960, 455, 620], [6.05, 1290, 480, 784], [11, 1290, 480, 784]]
function cardAt(t) {
  if (t <= K[0][0]) return K[0].slice(1)
  for (let i = 1; i < K.length; i++) if (t <= K[i][0]) {
    const a = K[i - 1], b = K[i], k = ease.inOutCubic((t - a[0]) / (b[0] - a[0]))
    return a.slice(1).map((v, j) => lerp(v, b[j + 1], k))
  }
  return K[K.length - 1].slice(1)
}

const ICONS = {
  sun: '<svg width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="11" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="15" cy="15" r="3" fill="currentColor"/></svg>',
  moon: '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M19 4.6a11 11 0 1 0 0 20.8a8.6 8.6 0 0 1 0-20.8z" fill="currentColor"/></svg>',
  rise: '<svg width="30" height="30" viewBox="0 0 30 30"><path d="M15 25V6M7 13l8-8 8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}
const ROWS = [['sun', '#f2c75c', 'Sun', 'Libra'], ['moon', '#b9a2ff', 'Moon', 'Gemini'], ['rise', '#ff8fb1', 'Rising', 'Aquarius']]
const COL_X = 260, ROW_Y = [318, 440, 562]

export default async function build(stage) {
  const root = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, stage)
  const ticks = makeTicks(root, 12)

  // ── the blind card, laid out in png px inside a scaled holder
  const holder = el('div', { position: 'absolute', left: 0, top: 0, width: PNG.w + 'px', height: PNG.h + 'px', transformOrigin: '0 0', opacity: 0 }, root)
  const rim = el('div', { position: 'absolute', left: '120px', top: '114px', width: PNG.bw + 'px', height: PNG.bh + 'px', borderRadius: '84px' }, holder)
  img(holder, A + 'card-profile-3.png', { left: 0, top: 0, width: PNG.w + 'px', height: PNG.h + 'px' })
  const win = el('div', { position: 'absolute', left: WIN.x + 'px', top: WIN.y + 'px', width: WIN.w + 'px', height: WIN.h + 'px', borderRadius: WIN.r + 'px', overflow: 'hidden', opacity: 0 }, holder)
  const face = el('div', { position: 'absolute', inset: 0 }, win)
  img(face, IMG + 'juniper.jpg', { left: PH_L + 'px', top: PH_T + 'px', width: PH_W + 'px', height: PH_H + 'px' })
  const band = el('div', { position: 'absolute', top: 0, height: '100%', width: '520px', left: '-520px', mixBlendMode: 'screen',
    background: 'linear-gradient(90deg, rgba(255,45,58,0) 0%, rgba(255,45,58,0.7) 14%, rgba(255,122,46,0.7) 28%, rgba(255,210,63,0.7) 42%, rgba(95,220,84,0.6) 56%, rgba(47,208,230,0.6) 70%, rgba(180,92,255,0.7) 86%, rgba(180,92,255,0) 100%)' }, win)
  const chip = el('div', { position: 'absolute', right: '34px', top: '30px', fontFamily: MONO, fontSize: '40px', letterSpacing: '0.16em', color: BONE, padding: '10px 28px 8px',
    borderRadius: '40px', background: 'rgba(20,10,40,0.72)', border: '3px solid rgba(239,230,214,0.5)', opacity: 0, whiteSpace: 'nowrap' }, win, 'REVEALED TONIGHT')

  // ── captions
  const cap = wordLine(root, [['Charts'], ['don’t.', ITAL]], { top: '842px', fontFamily: SANS, fontWeight: 500, fontSize: '96px', color: BONE, letterSpacing: '-0.015em' }, T.cap, 0.17)
  const col = el('div', { position: 'absolute', left: 0, top: 0, width: W + 'px', height: H + 'px' }, root)
  const guide = el('div', { position: 'absolute', left: (COL_X - 34) + 'px', top: (ROW_Y[0] - 14) + 'px', width: '2px', height: '0px', background: 'rgba(239,230,214,0.28)' }, col)
  const rows = ROWS.map(([ic, color, a, b], i) => {
    const row = el('div', { position: 'absolute', left: COL_X + 'px', top: ROW_Y[i] + 'px', height: '84px', whiteSpace: 'nowrap' }, col)
    const box = el('div', { position: 'absolute', left: 0, top: '12px', width: '60px', height: '60px', boxSizing: 'border-box', borderRadius: '12px', border: `2.5px solid ${color}`,
      color, display: 'grid', placeItems: 'center', opacity: 0, boxShadow: `0 0 18px ${color}55` }, row, ICONS[ic])
    const txt = el('div', { position: 'absolute', left: '92px', top: 0, fontFamily: SANS, fontSize: '72px', lineHeight: '84px', color: BONE, opacity: 0 }, row,
      `<span style="font-weight:500">${a}</span><span style="font-weight:200;color:rgba(239,230,214,0.78)">&nbsp;— ${b}</span>`)
    return { box, txt }
  })
  const line = wordLine(col, [['The'], ['face'], ['comes'], ['after.']], { left: (COL_X - 8) + 'px', width: 'auto', textAlign: 'left', top: '716px', fontFamily: SERIF, fontStyle: 'italic', fontSize: '92px', color: BONE }, T.line, 0.12)

  let ctxCard = { cx: 960, cy: 455, s: CARD.bh / PNG.bh, op: 0 }
  return {
    start: 0, end: 10.45, root,
    update(t) {
      // card
      let [cx, cy, bh] = cardAt(t)
      const land = ease.outCubic(prog(t, T.cardIn, 3.4))
      const exit = ease.inOutCubic(prog(t, T.out, 10.4))
      const bob = Math.sin((t - 3) * 1.3) * 4 * prog(t, 3.2, 3.8)
      const s = (bh / PNG.bh) * lerp(1.045, 1, land) * lerp(1, 0.97, exit)
      cy += bob - 40 * exit
      const op = ease.inOutQuad(prog(t, T.cardIn, 3.18)) * (1 - exit)
      holder.style.opacity = String(op)
      holder.style.transform = `translate(${cx - PNG.cx * s}px, ${cy - PNG.cy * s}px) scale(${s})`
      ctxCard = { cx, cy, s, op }
      const pulse = 0.5 + 0.5 * Math.sin((t - 3) * 2.2)
      const rv = Math.sin(Math.PI * prog(t, 8.9, 9.9))
      rim.style.boxShadow = `0 0 ${140 + 40 * pulse}px ${30 + 10 * pulse}px rgba(200,110,255,${(0.32 + 0.12 * pulse + 0.25 * rv) * land}), 0 0 360px 60px rgba(255,120,190,${(0.12 + 0.2 * rv) * land})`
      // reveal
      const rp = prog(t, T.rev[0], T.rev[1])
      win.style.opacity = String(rp > 0 ? 1 : 0)
      const mx = lerp(-25, 125, ease.inOutCubic(rp))
      face.style.webkitMaskImage = face.style.maskImage = `linear-gradient(90deg, #000 ${mx - 22}%, transparent ${mx + 8}%)`
      face.style.filter = `saturate(${lerp(1.5, 1, prog(t, 8.9, 9.5))}) brightness(${lerp(1.25, 1, prog(t, 8.9, 9.6))})`
      band.style.left = (lerp(-560, WIN.w + 40, ease.inOutCubic(prog(t, T.rev[0] - 0.05, T.rev[1] + 0.1)))) + 'px'
      band.style.opacity = String(rp > 0 && rp < 1 ? 0.75 : rp >= 1 ? 0.75 * (1 - prog(t, T.rev[1], T.rev[1] + 0.15)) : 0)
      chip.style.opacity = String(ease.outQuad(prog(t, T.chip, T.chip + 0.25)))
      // ticks: frame the hook photo, jitter on its glitches, pull in at the break, re-frame the blind card, converge at 5.35
      ticks.update(t, (q) => {
        const grow = ease.spring(prog(q, 0.1, 0.75), 0.1)
        const brk = ease.inOutCubic(prog(q, 2.7, 2.95)), re = ease.spring(prog(q, 3.0, 3.6), 0.12)
        const conv = ease.inOutCubic(prog(q, 5.35, 5.6))
        const fi = FI(q), jit = q > 2.05 && q < 2.85 ? (hash(fi * 3 + 9) - 0.5) * 24 : 0
        const pad = lerp(lerp(30, 76, grow), 18, brk) + 44 * re * brk
        const w = (BODY_W + pad * 2 + jit) * (1 - conv), h = (CARD.bh + pad * 1.6) * (1 - conv)
        return { cx: 960, cy: 455 + bob * 0, w, h, op: ease.outCubic(prog(q, 0.1, 0.45)) * (1 - prog(q, 5.55, 5.62)) }
      })
      // captions
      cap.update(t, 1 - ease.inOutQuad(prog(t, T.capOut, T.capOut + 0.2)))
      const colOut = 1 - ease.inOutQuad(prog(t, T.out, T.out + 0.2))
      guide.style.height = (ease.inOutCubic(prog(t, 5.7, 6.5)) * 330) + 'px'
      guide.style.opacity = String(colOut)
      rows.forEach((r, i) => {
        const a = T.rows[i]
        const bp = prog(t, a, a + 0.3), tp = ease.outCubic(prog(t, a + 0.06, a + 0.34))
        r.box.style.opacity = String(clamp(bp * 3) * colOut)
        r.box.style.transform = `scale(${lerp(0.6, 1, ease.outBack(bp))})`
        r.txt.style.opacity = String(tp * colOut)
        r.txt.style.transform = `translateX(${(1 - tp) * -26}px)`
        r.txt.style.filter = tp < 1 ? `blur(${((1 - tp) * 8).toFixed(2)}px)` : 'none'
      })
      line.update(t, colOut)
    },
    fx(ctx, t) {
      // sparkles around the card as the face resolves
      const a0 = 8.95, a1 = 9.75
      if (t < a0 || t > a1 || ctxCard.op <= 0) return
      const fi = FI(t), tw2 = fi >> 1
      const bw = PNG.bw * ctxCard.s, bh = PNG.bh * ctxCard.s
      const env = Math.sin(Math.PI * prog(t, a0, a1))
      for (let k = 0; k < 16; k++) {
        const r0 = hash(k * 13 + 4), r1 = hash(k * 29 + 8), r2 = hash(k * 41 + 1)
        const side = Math.floor(r0 * 4)
        const along = r1
        let x = ctxCard.cx, y = ctxCard.cy
        if (side < 2) { x += (along - 0.5) * bw * 1.1; y += (side === 0 ? -1 : 1) * (bh / 2 + 18 + r2 * 40) }
        else { y += (along - 0.5) * bh * 1.05; x += (side === 2 ? -1 : 1) * (bw / 2 + 18 + r2 * 46) }
        const st = (tw2 + Math.floor(r2 * 6)) % 6
        if (st >= 5) continue
        const spr = st === 2 ? (r2 > 0.5 ? STAR7 : STAR5) : st === 1 || st === 3 ? STAR5 : STAR3
        const col = ['#f2c75c', '#efe6d6', '#ff8fb1', '#c9a6ff'][k % 4]
        pixelStar(ctx, spr, x, y - (t - a0) * 20, r2 > 0.6 ? 5 : 4, col, env * ctxCard.op)
      }
    },
  }
}
