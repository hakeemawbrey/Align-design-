// 04-chart-card — "You were born a card." Feature: onboarding sign reveal — your sign becomes a collectible card.
// A face-down sign card charges with light while your birth details type in mono beneath it; light particles
// spiral in; it flips to the Taurus card with a burst, a gold-foil/holo sweep and a "YOUR CARD" stamp; the card
// lifts and your big three pop out of it as badges; the line lands.
//
// Timeline (s)
//   0.00–3.55  face-down card charging (glow + chakra brighten + particles in) · eyebrow 0.25 · birth details type 0.55–2.5
//   3.55–4.15  FLIP (burst at 3.85 when the face appears)
//   4.15–4.95  gold-foil + holo sweep, tilt · 4.95 "YOUR CARD" stamp
//   5.30–5.90  card lifts/shrinks · badges pop 5.55 / 5.80 / 6.05
//   6.55–7.5   "You were born a card."
//   9.60–12.0  end tag
import { W, H, A, CHAKRAS, el, fill, img, prog, ease, lerp, clamp, rng, spaceBackdrop, typeLine, eyebrow, starField, endTag, drawMoonGlyph, pixelStar, MONO, SERIF, BONE, GOLD } from './kit.js'

const DURATION = 12
const END = 9.6
const BIRTH = 'MAY 12 · 1998 · 5:00 PM · HOUSTON'
const TYPE0 = 0.55, TYPE_DT = 0.058
const FLIP = [3.55, 4.15], FLIP_MID = 3.85
const FOIL = [4.15, 4.95]
const STAMP = 4.95
const LIFT = [5.3, 5.95]
const BADGE_T = [5.55, 5.8, 6.05]
const LINE = 6.55
// card art (PNG px): body boxes
const BACK = { src: 'card-sign-back.png', iw: 1044, ih: 1440, b: [120, 123, 924, 1325] }
const FACE = { src: 'card-sign.png', iw: 848, ih: 1152, b: [120, 121, 727, 1032] }
const BODY_H = 900, BODY_W = BODY_H * 607 / 911
const C0 = { y: 880, s: 1 }, C1 = { y: 640, s: 0.72 }
const BADGE_Y = 1130
const BADGES = [
  { k: 'sun', lab: 'SUN', sign: 'Taurus', col: GOLD, x: 230 },
  { k: 'moon', lab: 'MOON', sign: 'Sagittarius', col: '#c9a6ff', x: 540 },
  { k: 'rise', lab: 'RISING', sign: 'Libra', col: '#ff8fb1', x: 850 },
]
const typedChars = [...BIRTH].map((ch, i) => [ch, TYPE0 + i * TYPE_DT]).filter(([ch]) => ch !== ' ')

export default {
  id: '04-chart-card', title: 'You were born a card.', duration: DURATION, endTagAt: END,
  music: {
    chords: [
      [0, FLIP[0], [110, 164.81, 246.94, 329.63, 493.88]],            // Asus2 — anticipation
      [FLIP_MID, 6.5, [146.83, 220, 329.63, 369.99, 554.37]],          // Dmaj9 — the reveal
      [6.5, END, [123.47, 185, 293.66, 440, 554.37]],                  // Bm9 — the line
      [END, DURATION, [146.83, 220, 293.66, 369.99, 554.37]],
    ],
    padGain: 0.022,
  },
  cues: [
    ['whoosh', 0.3, 0.8, 0.05],
    ...typedChars.map(([, t], i) => ['tick', t, 0.045 + (i % 3) * 0.01]),
    ['riser', 1.4, FLIP_MID, 0.11],
    ['whoosh', FLIP_MID, 0.6, 0.16],
    ['boom', FLIP_MID, 0.4],
    ['bell', FLIP_MID + 0.02, 587.33, 0.07, 2.6, 0],
    ['glitter', FLIP_MID + 0.05, FLIP_MID + 0.9],
    ['bell', FOIL[0] + 0.25, 1174.66, 0.025, 1.6, 0.3],
    ['tick', STAMP, 0.14], ['boom', STAMP, 0.14],
    ['bell', STAMP + 0.02, 880, 0.05, 1.8, 0.2],
    ['whoosh', LIFT[0] + 0.25, 0.5, 0.06],
    ['bell', BADGE_T[0] + 0.08, 587.33, 0.06, 2.0, -0.35],
    ['bell', BADGE_T[1] + 0.08, 739.99, 0.06, 2.0, 0],
    ['bell', BADGE_T[2] + 0.08, 880, 0.06, 2.0, 0.35],
    ['whoosh', LINE + 0.15, 0.6, 0.05],
    ['bell', LINE + 0.6, 1108.73, 0.025, 2.2, 0.1],
  ],
  build(stage) {
    const root = fill(stage, { background: '#0b0620' })
    const bg = spaceBackdrop(root, 'aurora', { seed: 41, grain: 0.24 })
    // charge aura behind the card
    const aura = el('div', { position: 'absolute', left: (W / 2 - 700) + 'px', top: (C0.y - 700) + 'px', width: '1400px', height: '1400px', borderRadius: '50%', mixBlendMode: 'screen', background: 'radial-gradient(closest-side, rgba(201,166,255,0.55), rgba(154,123,224,0.22) 40%, rgba(154,123,224,0) 100%)', opacity: 0 }, root)
    const auraG = el('div', { position: 'absolute', left: (W / 2 - 700) + 'px', top: (C0.y - 700) + 'px', width: '1400px', height: '1400px', borderRadius: '50%', mixBlendMode: 'screen', background: 'radial-gradient(closest-side, rgba(127,216,140,0.5), rgba(95,220,84,0.16) 42%, rgba(95,220,84,0) 100%)', opacity: 0 }, root)
    // slow light rays behind the card while it charges
    const rays = el('div', { position: 'absolute', left: (W / 2 - 900) + 'px', top: (C0.y - 900) + 'px', width: '1800px', height: '1800px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0,
      background: 'repeating-conic-gradient(from 0deg, rgba(230,214,255,0.16) 0deg 3deg, rgba(230,214,255,0) 7deg 18deg)',
      webkitMaskImage: 'radial-gradient(closest-side, #000 25%, transparent 100%)', maskImage: 'radial-gradient(closest-side, #000 25%, transparent 100%)' }, root)
    // card
    const holder = el('div', { position: 'absolute', left: (W / 2 - BODY_W / 2) + 'px', top: (C0.y - BODY_H / 2) + 'px', width: BODY_W + 'px', height: BODY_H + 'px', willChange: 'transform' }, root)
    const wrap = el('div', { position: 'absolute', inset: 0, borderRadius: (BODY_W * 0.055) + 'px', overflow: 'hidden', background: '#140a2e' }, holder)
    const art = (c) => { const sc = BODY_H / (c.b[3] - c.b[1]); return img(wrap, A + c.src, { left: (-c.b[0] * sc) + 'px', top: (-c.b[1] * sc) + 'px', width: (c.iw * sc) + 'px', height: (c.ih * sc) + 'px' }) }
    const back = art(BACK), face = art(FACE)
    // charge light on the back (centre glow up the chakra column)
    const charge = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0, background: 'radial-gradient(40% 55% at 50% 52%, rgba(255,246,230,0.75), rgba(201,166,255,0.35) 45%, rgba(201,166,255,0) 75%)' }, wrap)
    // chakra points on the back light up, a pulse climbing the column faster as the charge builds
    const chak = CHAKRAS.map((c, i) => el('div', { position: 'absolute', left: (BODY_W / 2 - 60) + 'px', top: (BODY_H * (0.68 - i * 0.0633) - 60) + 'px', width: '120px', height: '120px', borderRadius: '50%', mixBlendMode: 'screen', opacity: 0, background: `radial-gradient(closest-side, #fff 0%, ${c} 22%, ${c}66 45%, ${c}00 100%)` }, wrap))
    const flash = el('div', { position: 'absolute', inset: 0, background: '#fff8ec', opacity: 0 }, wrap)
    // gold foil + holo sheen
    const foil = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0, backgroundImage: 'linear-gradient(115deg, rgba(169,128,46,0) 44%, #a9802e 47%, #f2c75c 49%, #fff4cf 50%, #f2c75c 51%, #a9802e 53%, rgba(169,128,46,0) 56%)', backgroundSize: '300% 300%', backgroundRepeat: 'no-repeat' }, wrap)
    const holo = el('div', { position: 'absolute', inset: 0, mixBlendMode: 'screen', opacity: 0, backgroundImage: 'linear-gradient(115deg, rgba(255,45,58,0) 30%, rgba(255,122,46,0.22) 36%, rgba(255,210,63,0.24) 40%, rgba(95,220,84,0.22) 44%, rgba(47,208,230,0.24) 48%, rgba(74,114,255,0.22) 52%, rgba(180,92,255,0.22) 56%, rgba(180,92,255,0) 62%)', backgroundSize: '260% 260%', backgroundRepeat: 'no-repeat' }, wrap)
    const rim = el('div', { position: 'absolute', inset: 0, borderRadius: (BODY_W * 0.055) + 'px', pointerEvents: 'none' }, holder)
    // "YOUR CARD" stamp (app style: white pill, ink mono, gold ✦)
    const stamp = el('div', { position: 'absolute', right: '-34px', top: '-30px', padding: '16px 28px 16px 24px', borderRadius: '16px', background: 'linear-gradient(100deg, #f7f1fb, #fdf6e6 55%, #eef3fb)', color: '#1a1030', fontFamily: MONO, fontSize: '36px', letterSpacing: '0.2em', whiteSpace: 'nowrap', lineHeight: 1, opacity: 0, transformOrigin: '70% 50%', boxShadow: '0 12px 30px rgba(11,6,32,0.55)' }, holder, '<span style="color:#d9a93f">✦</span> YOUR CARD')

    const eb = eyebrow(root, 'ONE CARD HAS YOUR NAME', { y: 250, size: 30 })
    const eb2 = eyebrow(root, 'SUN IN TAURUS', { y: 250, size: 30, color: '#bff0b8' })
    // birth details, typed in mono with a caret
    const birth = el('div', { position: 'absolute', left: '0px', top: (C0.y + BODY_H / 2 + 92) + 'px', textAlign: 'left', fontFamily: MONO, fontSize: '36px', letterSpacing: '0.14em', color: BONE, whiteSpace: 'nowrap', textShadow: '0 2px 18px rgba(8,5,34,0.8)' }, root)
    const bSpans = [...BIRTH].map((ch, i) => el('span', { opacity: 0, color: ch === '·' ? GOLD : BONE }, birth, ch === ' ' ? ' ' : ch))
    const caret = el('span', { display: 'inline-block', width: '0.55em', height: '1em', marginLeft: '0.1em', verticalAlign: '-0.12em', background: BONE, opacity: 0 }, birth)
    // badges
    const badges = BADGES.map((b) => {
      const g = el('div', { position: 'absolute', left: (b.x - 150) + 'px', top: (BADGE_Y - 80) + 'px', width: '300px', height: '300px', opacity: 0, willChange: 'transform' }, root)
      const ring = el('div', { position: 'absolute', left: '70px', top: '0px', width: '160px', height: '160px', boxSizing: 'border-box', borderRadius: '50%', border: `3px solid ${b.col}`, background: 'radial-gradient(circle at 50% 40%, rgba(40,24,80,0.95), rgba(16,9,40,0.95))', boxShadow: `0 0 34px 4px ${b.col}55, 0 0 0 8px rgba(239,230,214,0.06)` }, g)
      const cv = el('canvas', { position: 'absolute', left: 0, top: 0, width: '154px', height: '154px' }, ring)
      cv.width = cv.height = 308
      const x = cv.getContext('2d'); x.scale(2, 2)
      drawBadgeIcon(x, b.k, b.col)
      el('div', { position: 'absolute', left: 0, width: '300px', top: '182px', textAlign: 'center', fontFamily: MONO, fontSize: '24px', letterSpacing: '0.26em', color: b.col }, g, b.lab)
      el('div', { position: 'absolute', left: 0, width: '300px', top: '216px', textAlign: 'center', fontFamily: SERIF, fontStyle: 'italic', fontSize: '50px', color: BONE, lineHeight: 1, textShadow: '0 2px 18px rgba(8,5,34,0.8)' }, g, b.sign)
      return { g, b }
    })
    const line = typeLine(root, 'You were born a card.', { y: 1430, size: 92, perChar: 0.035 })
    const tag = endTag(stage, { start: END, end: DURATION })

    let birthX = 0
    const cardState = (t) => {
      const lp = ease.inOutCubic(prog(t, LIFT[0], LIFT[1]))
      const fl = prog(t, FLIP[0], FLIP[1])
      const fe = ease.inOutCubic(fl)
      const ch = prog(t, 0, FLIP[0])
      const shake = ch > 0.6 && t < FLIP[0] ? Math.sin(t * 61) * 1.6 * prog(t, 2.6, FLIP[0]) : 0
      const y = lerp(C0.y, C1.y, lp) + Math.sin(t * 1.3) * 6 * (1 - lp) - Math.sin(Math.PI * fl) * 40
      const s = lerp(C0.s, C1.s, lp) * (1 + 0.025 * ease.inOutQuad(ch) * (t < FLIP[1] ? 1 : 0) + 0.08 * Math.sin(Math.PI * fl)) * (1 + 0.012 * prog(t, LIFT[1], END))
      return { y, s, fe, shake, lp }
    }

    return {
      update(t) {
        bg.update(t)
        root.style.visibility = t < END + 0.25 ? 'visible' : 'hidden'
        const { y, s, fe, shake, lp } = cardState(t)
        const ang = fe * 180, faceUp = ang >= 90
        back.style.display = faceUp ? 'none' : 'block'
        face.style.display = faceUp ? 'block' : 'none'
        charge.style.display = faceUp ? 'none' : 'block'
        // idle tilt + foil-time tilt
        const fp2 = prog(t, 7.7, 8.5)
        const fp = prog(t, FOIL[0], FOIL[1]), bump = Math.sin(Math.PI * fp)
        const yaw = (faceUp ? ang - 180 : ang) + Math.sin(t * 0.9) * 3 * (1 - fp) - 7 * bump
        const rx = Math.sin(t * 0.7 + 1) * 2.5 + 4 * bump
        const inA = 0.35 + 0.65 * ease.outCubic(prog(t, 0, 0.35))
        holder.style.opacity = String(inA)
        holder.style.transform = `translate(${shake}px, ${y - C0.y + (1 - inA) * 40}px) perspective(2400px) rotateY(${yaw}deg) rotateX(${rx}deg) scale(${s})`
        // charge
        const ch = ease.inQuad(prog(t, 0.2, FLIP_MID))
        const pulse = 0.5 + 0.5 * Math.sin(t * (4 + 8 * ch))
        charge.style.opacity = String(ch * (0.65 + 0.35 * pulse))
        back.style.filter = `brightness(${1 + 0.35 * ch}) saturate(${1 + 0.3 * ch})`
        const climb = (t - 0.3) * (1.1 + 2.6 * ch)
        chak.forEach((d, i) => {
          d.style.display = faceUp ? 'none' : 'block'
          const ph = ((climb - i * 0.11) % 1 + 1) % 1
          const hit = Math.exp(-((ph / 0.12) ** 2)) + Math.exp(-(((ph - 1) / 0.12) ** 2))
          d.style.opacity = String(Math.min(1, (0.25 + 0.75 * hit) * Math.min(1, ch * 2.2 + 0.15)))
          d.style.transform = `scale(${0.7 + 0.6 * hit * ch + 0.3 * ch})`
        })
        rays.style.opacity = String(ch * 0.9 * (faceUp ? Math.max(0, 1 - prog(t, FLIP_MID, FLIP_MID + 0.9)) * 1.6 : 1))
        rays.style.transform = `translateY(${y - C0.y}px) rotate(${t * 9}deg) scale(${0.7 + 0.3 * ch})`
        const burst = Math.exp(-(((t - FLIP_MID) / 0.16) ** 2))
        flash.style.opacity = String(Math.max(0, burst * 0.9 * (faceUp ? 1 : 0.3), 0))
        const post = faceUp ? 1 : 0
        aura.style.opacity = String((0.25 + 0.75 * ch) * (1 - post * 0.6) * inA)
        aura.style.transform = `translateY(${y - C0.y}px) scale(${(0.55 + 0.25 * ch + 0.4 * burst) * lerp(1, 0.75, lp)})`
        auraG.style.opacity = String(post * (0.5 + 0.6 * burst) * (1 - 0.3 * lp))
        auraG.style.transform = `translateY(${y - C0.y}px) scale(${(0.6 + 0.3 * prog(t, FLIP_MID, FLIP_MID + 0.8)) * lerp(1, 0.75, lp)})`
        const rimC = faceUp ? '242,199,92' : '201,166,255'
        const ra = faceUp ? 0.5 + 0.5 * burst : 0.25 + 0.6 * ch
        rim.style.boxShadow = `0 0 0 ${1.5 + 2 * ra}px rgba(${rimC},${(0.35 + 0.5 * ra).toFixed(3)}), 0 0 ${30 + 60 * ra}px ${4 + 14 * ra}px rgba(${rimC},${(0.25 + 0.35 * ra).toFixed(3)}), 0 40px 70px -16px rgba(3,1,12,0.85)`
        // foil + holo
        const fq = fp > 0 && fp < 1 ? fp : fp2
        foil.style.opacity = String((fp > 0 && fp < 1 ? 0.55 : 0.35) * clamp(Math.sin(Math.PI * fq) * 2.5))
        foil.style.backgroundPosition = `${lerp(100, 0, ease.inOutQuad(fq))}% ${lerp(100, 0, ease.inOutQuad(fq))}%`
        const hp = prog(t, FOIL[0] + 0.1, FOIL[1] + 0.5)
        holo.style.opacity = String(0.9 * Math.sin(Math.PI * hp))
        holo.style.backgroundPosition = `${lerp(90, 10, ease.inOutQuad(hp))}% ${lerp(70, 30, hp)}%`
        // stamp
        const sp = prog(t, STAMP - 0.12, STAMP + 0.06)
        stamp.style.opacity = String(clamp(sp * 3))
        stamp.style.transform = `rotate(${lerp(-16, -7, ease.outCubic(sp))}deg) scale(${lerp(1.9, 1, ease.outBack(sp))})`
        // eyebrows
        eb.style.opacity = String(ease.outQuad(prog(t, 0.25, 0.6)) * (1 - prog(t, FLIP[0] - 0.1, FLIP[0] + 0.15)))
        eb2.style.opacity = String(ease.outQuad(prog(t, FOIL[0] + 0.1, FOIL[0] + 0.45)) * (1 - prog(t, LIFT[0], LIFT[0] + 0.25)))
        eb2.style.letterSpacing = lerp(0.4, 0.26, ease.outCubic(prog(t, FOIL[0] + 0.1, FOIL[0] + 0.6))) + 'em'
        // birth details
        const bOut = 1 - ease.inQuad(prog(t, FLIP_MID - 0.05, FLIP_MID + 0.3))
        if (!birthX) { birthX = (W - birth.offsetWidth) / 2 + 12; birth.style.left = birthX + 'px' }
        bSpans.forEach((sp2, i) => { sp2.style.display = t >= TYPE0 + i * TYPE_DT ? 'inline' : 'none'; sp2.style.opacity = String(ease.outQuad(prog(t, TYPE0 + i * TYPE_DT, TYPE0 + i * TYPE_DT + 0.08)) * bOut) })
        const typing = t >= TYPE0 - 0.3 && t < FLIP_MID
        caret.style.opacity = String(typing ? (Math.floor(t * 3.2) % 2 ? 0.15 : 0.9) * bOut : 0)
        birth.style.transform = `translateY(${-Math.sin(Math.PI * prog(t, FLIP[0], FLIP[1])) * 20}px)`
        // badges: fly out of the card and pop into place
        badges.forEach(({ g, b }, i) => {
          const a = BADGE_T[i], p = prog(t, a - 0.12, a + 0.42)
          const e = ease.outBack(p), m = ease.outCubic(p)
          const sx = W / 2 - b.x, sy = C1.y - BADGE_Y - 60
          g.style.opacity = String(clamp(p * 4))
          g.style.transform = `translate(${(1 - m) * sx}px, ${(1 - m) * sy}px) scale(${lerp(0.2, 1, e)})`
        })
        line.update(t - LINE)
        line.root.style.transform = `translateY(${(1 - ease.outCubic(prog(t, LINE, LINE + 0.7))) * 18}px)`
        tag.update(t)
      },
      fx(ctx, t) {
        if (t >= END + 0.2) return
        const fa = 1 - prog(t, END - 0.1, END + 0.2)
        starField(ctx, t, { seed: 43, sprites: 16, dots: 50, alpha: 0.8 * fa, keepOut: [[W / 2 - 340, 300, 680, 1180], [60, 1050, 960, 520]] })
        const { y, s } = cardState(t)
        // charging motes: spiral in toward the card centre
        const ch = prog(t, 0.2, FLIP_MID)
        if (t < FLIP_MID + 0.05) {
          const r = rng(4401)
          for (let i = 0; i < 90; i++) {
            const t0 = r() * 3.3, life = 0.9 + r() * 0.7, a0 = r() * 6.283, d0 = 420 + r() * 380, col = r() < 0.25 ? GOLD : r() < 0.6 ? '#e6d6ff' : '#fff3e0'
            let lt = ((t - t0) % life + life) % life
            if (t < t0) continue
            const k = lt / life, kk = ease.inCubic(k)
            const d = d0 * (1 - kk), an = a0 + kk * 2.2
            const x = W / 2 + Math.cos(an) * d * 0.85, yy = y + Math.sin(an) * d * 1.15
            ctx.globalAlpha = Math.min(1, ch * 1.6) * Math.sin(Math.PI * k) * 0.9 * fa
            ctx.fillStyle = col
            const sz = 2 + Math.round(r() * 2) + (k > 0.7 ? 1 : 0)
            ctx.fillRect(Math.round(x), Math.round(yy), sz, sz)
          }
          ctx.globalAlpha = 1
        }
        // burst: pixel stars fly out at the flip
        const bp = prog(t, FLIP_MID, FLIP_MID + 1.1)
        if (bp > 0 && bp < 1) {
          const r = rng(4417)
          for (let i = 0; i < 46; i++) {
            const an = r() * 6.283, sp = 300 + r() * 520, kind = Math.floor(r() * 3), col = r() < 0.4 ? GOLD : r() < 0.7 ? '#bff0b8' : BONE
            const e = ease.outCubic(bp), d = sp * e
            const x = W / 2 + Math.cos(an) * d, yy = y + Math.sin(an) * d * 1.2
            ctx.globalAlpha = (1 - bp) * fa
            pixelStar(ctx, x, yy, 3 + (i % 2), kind, col)
          }
          ctx.globalAlpha = 1
        }
        void s
      },
    }
  },
}


/** line icons inside the badges (154px canvas, centre 77) */
function drawBadgeIcon(x, k, col) {
  const c = 77
  x.strokeStyle = col; x.fillStyle = col; x.lineWidth = 4; x.lineCap = 'round'
  x.shadowColor = col; x.shadowBlur = 12
  if (k === 'sun') {
    x.beginPath(); x.arc(c, c, 34, 0, 6.283); x.stroke()
    x.beginPath(); x.arc(c, c, 8, 0, 6.283); x.fill()
  } else if (k === 'moon') {
    drawMoonGlyph(x, c, c, 34, 0.3605, { color: col, lw: 4, discAlpha: 0.12 })
  } else {
    x.beginPath(); x.moveTo(c - 40, c + 26); x.lineTo(c + 40, c + 26); x.stroke()
    x.beginPath(); x.moveTo(c, c + 14); x.lineTo(c, c - 34); x.stroke()
    x.beginPath(); x.moveTo(c - 18, c - 16); x.lineTo(c, c - 34); x.lineTo(c + 18, c - 16); x.stroke()
    x.beginPath(); x.arc(c, c + 26, 22, Math.PI, 0); x.globalAlpha = 0.5; x.stroke(); x.globalAlpha = 1
  }
}
