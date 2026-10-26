// torsubway (15 s vertical Align ad) · scenes 0–10.6, then the shared END CARD ("come" + the logo + VOTE FOR YOUR CITY).
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas, DOM type above it, grain on top. Pure f(t).
//   0.00–3.55   HOOK  "Stuck on | the subway, | swiping the | *same faces.*" — a line-art subway car rocks through the
//               tunnel; a pictogram rider stares at their phone (magnified on the right): the same three profile
//               silhouettes swipe past and loop. The LED strip scrolls "NEXT STOP: SAME FACES". On the drop (2.82)
//               face #1 comes round again: "AGAIN." — then faster, "AGAIN!?"
//   3.66–6.10   "Tonight's deck: | a *new* hand, | every night." — we push through the window into the tunnel: rings of
//               tunnel lights rush past and five card backs fly out of the dark into a fan
//   6.40–8.20   "Card *first.* | Face last." — the centre card lifts and flips to a veiled mystery card with an aura
//   8.38–10.25  "Get off | the *same loop.*" — out of the tunnel: a looping transit line circles over a generic skyline
//               (a needle tower in it); a gold branch line opens off the loop and the little train rides it up to a star
//  10.48–10.60  plain sky (SKY_H + grain GRAIN_H) for the end card hand-off at 10.6
import { clamp, lerp, prog, ease, el, rng, noise1 } from '../../../src/lib.js'
import { W, H, fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { BONE, GOLD, PINK, BLUE, VIOLET, LAV, AMBER, INTER, MONO, rgba, ink, sparkle, orb } from './props.js'

export const END = 10.6
const BEAT = n => 0.6 + n * 0.5556
const SHADOW = '0 4px 30px rgba(6,4,18,0.9), 0 0 4px rgba(6,4,18,0.6)'
const TAU = Math.PI * 2, D2R = Math.PI / 180
const MINT = '#7fe0b5'
const r3 = v => +v.toFixed(3)
const pop01 = (t, t0, d = 0.36, s = 2.0) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, a, d = 0.22) => 1 - ease.inQuad(prog(t, a, a + d))

// ── beats
export const T = {
  eye: 0.06, h0: [0.1, 0.2, 0.32, 0.42, 0.66, 0.76, BEAT(1)], h0Out: 3.42,
  phone: 0.3,
  swipes: [BEAT(1.5), BEAT(2.5), BEAT(4), BEAT(4.5), BEAT(4.75), BEAT(5)],   // B, C, A(again), B, C, A(again!?)
  drop: BEAT(4),
  zoom: [3.38, 3.9],
  h2: [BEAT(5.5), BEAT(5.5) + 0.1, BEAT(6.5), BEAT(6.5) + 0.1, BEAT(6.5) + 0.24, BEAT(7.5), BEAT(7.5) + 0.1], h2Out: 6.06,
  deal: [0, 1, 2, 3, 4].map(i => BEAT(6.5 + i * 0.5)),
  glow: BEAT(9),
  lift: [5.95, 6.42], flip: [6.5, 6.92], land: BEAT(11.5),
  h3: [6.4, 6.52, BEAT(11.5), BEAT(11.5) + 0.1], h3Out: 8.18,
  toStar: [8.1, 8.55],
  tunnelOut: [8.05, 8.5],
  h4: [8.42, 8.52, 8.66, BEAT(15)], h4Out: 10.12,
  ring: [8.36, 8.82], branch: [BEAT(15), BEAT(15) + 0.24], ride: [BEAT(15.5), BEAT(15.5) + 0.36], burst: BEAT(15.5) + 0.36,
  fade: [9.95, 10.45],
}
export const STAMPS = [{ t: T.swipes[2], txt: 'AGAIN.' }, { t: T.swipes[5], txt: 'AGAIN!?' }]

// the three regulars on the phone (no faces): body colour, hair, card tint
const FACES = [
  { body: PINK, hair: '#3a1f4d', style: 'bun', bg: ['#ffcf9e', '#ff8fb1'] },
  { body: BLUE, hair: '#1b2a55', style: 'beanie', bg: ['#b9ecff', '#8f9cf6'] },
  { body: GOLD, hair: '#4a2a1a', style: 'curls', bg: ['#ffe9a8', '#ffb86b'] },
]

// ── layout
const CAR = { x: 40, y: 690, w: 1000, h: 830 }
const DY = 70                                            // the whole car sits this much lower
const PH = { x: 735, y: 1135 + DY, w: 340, h: 620 }          // the magnified phone (centre)
const RIDER = { x: 240, seat: 1330 }
const VP = { x: 540, y: 1060 }                           // the tunnel's vanishing point
const CARD_H = 384
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 172, y: 1150 + Math.abs(i - 2) * 38, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const BIG_H = 820, CARD_C = { x: 540, y: 1080 }
const STAR = { x: 540, y: 660 }
const LOOP = { x: 520, y: 1110, r: 235 }
const BASE = 1700

/** springy word-by-word type. `*word*` = accent (Garamond italic, colour), `|` = line break, `_` = a space in a word. */
function popText(parent, text, { top, size, weight = 800, accentColor = GOLD, accentSize, times, big = [], wobble = false, lineHeight = 1.02, boost = null }) {
  const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center',
    fontFamily: INTER, fontWeight: weight, fontSize: size + 'px', lineHeight, color: BONE, textShadow: SHADOW, letterSpacing: '-0.01em' }, parent)
  const ws = []
  let n = 0
  text.split(' ').forEach(w => {
    if (w === '|') { el('br', {}, box); return }
    const acc = w.startsWith('*') || w.endsWith('*')
    const style = { display: 'inline-block', margin: acc ? '0 0.16em' : '0 0.12em', opacity: 0, transformOrigin: '50% 85%', whiteSpace: 'pre' }
    if (acc) Object.assign(style, { fontFamily: "'EB Garamond', serif", fontStyle: 'italic', fontWeight: 500, fontSize: (accentSize || size * 1.09) + 'px', color: accentColor, letterSpacing: '0' })
    ws.push({ t: times[n], big: big.includes(n), e: el('span', style, box, w.replace(/\*/g, '').replace(/_/g, ' ')) })
    n++
  })
  const first = Math.min(...ws.map(w => w.t))
  return {
    update(t, out = 1) {
      box.style.display = out <= 0 || t < first ? 'none' : 'block'
      if (box.style.display === 'none') return
      for (const w of ws) {
        const p = prog(t, w.t, w.t + (w.big ? 0.42 : 0.28))
        let sc = w.big ? 0.3 + 0.7 * easeOutBack(p, 3.2) : 0.6 + 0.4 * easeOutBack(p, 2.4)
        if (w.big && boost) sc *= boost(t)
        const rot = w.big && wobble && t > w.t ? 8 * Math.sin((t - w.t) * 14) * Math.exp(-(t - w.t) * 3.2) : 0
        w.e.style.opacity = String(clamp(p * 3) * out)
        w.e.style.transform = `translateY(${((1 - ease.outCubic(p)) * 30 + (1 - out) * 10).toFixed(2)}px) scale(${(sc * lerp(0.9, 1, out)).toFixed(4)}) rotate(${rot.toFixed(2)}deg)`
      }
    },
  }
}

const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = src })
const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }

// ── the skyline for the last beat (generic; one tall needle tower)
const SKYL = (() => {
  const r = rng(52), out = []
  let xx = -20
  while (xx < W + 20) { const w = 70 + r() * 80; out.push({ x: xx, w, h: 110 + r() * 200, t0: T.ring[0] + r() * 0.4, seed: r() * 100 }); xx += w * (0.82 + r() * 0.2) }
  for (const b of out) {
    b.win = []
    const cols = Math.max(2, Math.floor((b.w - 18) / 22)), rows = Math.floor((b.h - 30) / 30)
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) if (r() > 0.42) b.win.push({ x: b.x + (b.w - (cols - 1) * 22) / 2 + i * 22, y: BASE - 26 - j * 30, on: b.t0 + 0.2 + r() * 0.5, col: r() < 0.75 ? '#ffd98a' : PINK })
  }
  return out
})()
const TOWER = { x: 880, top: 1110 }

export async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "700 62px Inter", "italic 500 170px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [backIm, profIm] = await Promise.all([loadImg(A + 'card-back.png'), loadImg(A + 'card-profile-2.png')])
  const backBmp = bitmap(backIm, 560), profBmp = bitmap(profIm, 1000)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: '104px', textAlign: 'center', font: TYPE.eyebrow,
    letterSpacing: '0.25em', color: GOLD, textShadow: SHADOW, opacity: 0 }, root, 'TORONTO, ON')
  const dropBoost = t => 1 + (t > T.drop ? 0.16 * Math.exp(-(t - T.drop) * 5) * Math.sin((t - T.drop) * 16) : 0)
  const H0 = popText(root, 'Stuck on | the subway, | swiping the | *same_faces.*', { top: 160, size: 112, accentSize: 168, times: T.h0, big: [6], wobble: true, accentColor: PINK, lineHeight: 0.98, boost: dropBoost })
  const H2 = popText(root, 'Tonight’s deck: | a *new* hand, | every night.', { top: 190, size: 106, accentSize: 168, times: T.h2, big: [3], wobble: true, accentColor: PINK, lineHeight: 1.02 })
  const H3 = popText(root, 'Card *first.* | Face last.', { top: 200, size: 124, accentSize: 178, times: T.h3, big: [1], wobble: true, accentColor: GOLD, lineHeight: 1.0 })
  const H4 = popText(root, 'Get off | the *same_loop.*', { top: 196, size: 124, accentSize: 178, times: T.h4, big: [3], wobble: true, accentColor: PINK, lineHeight: 1.0 })

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── the subway car (cut-away, line art)
  function bust(ctx, cx, by, s, P, sway) {
    ctx.save(); ctx.translate(cx, by); ctx.scale(s, s); ctx.rotate(sway)
    ctx.beginPath(); ctx.moveTo(-58, 0); ctx.quadraticCurveTo(-56, -66, 0, -70); ctx.quadraticCurveTo(56, -66, 58, 0); ctx.closePath()
    ink(ctx, BONE, { w: 5, fa: 0.9, fill: P.body, glow: 6 })
    const hy = -110
    ctx.beginPath(); ctx.arc(0, hy, 32, 0, TAU); ink(ctx, BONE, { w: 5, fa: 1, fill: BONE, glow: 6 })
    ctx.fillStyle = P.hair; ctx.strokeStyle = BONE; ctx.lineWidth = 4
    ctx.beginPath()
    if (P.style === 'bun') { ctx.arc(0, hy - 6, 33, Math.PI * 1.05, Math.PI * 1.95); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, hy - 46, 16, 0, TAU) }
    else if (P.style === 'beanie') { ctx.moveTo(-35, hy - 4); ctx.quadraticCurveTo(-35, hy - 50, 0, hy - 50); ctx.quadraticCurveTo(35, hy - 50, 35, hy - 4); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.beginPath(); ctx.arc(0, hy - 54, 10, 0, TAU) }
    else { for (const [dx, dy, rr] of [[-28, -14, 16], [-15, -34, 17], [6, -40, 17], [26, -27, 16], [34, -6, 13], [-34, 2, 12]]) { ctx.moveTo(dx + rr, hy + dy); ctx.arc(dx, hy + dy, rr, 0, TAU) } }
    ctx.fill(); ctx.stroke()
    ctx.restore()
  }
  // one profile card on the phone (centre cx, cy), face index f
  function profileCard(cx, cy, f, rot, sc, a) {
    if (a <= 0 || sc <= 0) return
    const P = FACES[f], w = 272, h = 380
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sc, sc); x.globalAlpha *= a
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1])
    x.shadowColor = 'rgba(0,0,0,0.5)'; x.shadowBlur = 20; x.fillStyle = g; x.fill(); x.shadowBlur = 0
    x.save(); x.clip(); bust(x, 0, h / 2 + 4, 1.45, P, 0); x.restore()
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26); ink(x, BONE, { w: 4, fa: 0, glow: 6 })
    // the number chip (1 · 2 · 3, round and round)
    x.beginPath(); x.arc(-w / 2 + 40, -h / 2 + 40, 24, 0, TAU); x.fillStyle = 'rgba(14,9,34,0.85)'; x.fill(); ink(x, BONE, { w: 3, fa: 0, glow: 0 })
    x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(f + 1), -w / 2 + 40, -h / 2 + 42)
    x.restore()
  }
  const facesSeen = t => T.swipes.filter(s => t >= s).length
  function drawPhone(t, k) {
    if (k <= 0) return
    const { x: px, y: py, w, h } = PH
    x.save(); x.translate(px, py); x.scale(k, k); x.rotate(3 * D2R)
    // body
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 52)
    x.fillStyle = '#100a26'; x.fill(); ink(x, BONE, { w: 7, fa: 0, glow: 22 })
    x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 40); x.fillStyle = '#1b1240'; x.fill()
    x.beginPath(); x.roundRect(-34, -h / 2 + 30, 68, 14, 7); x.fillStyle = '#05040c'; x.fill()
    // the loop icon + "1/3" counter at the top of the screen
    const n = facesSeen(t), cur = n % 3
    x.save(); x.translate(-w / 2 + 62, -h / 2 + 82); x.rotate(t * 3 + n * 2)
    x.beginPath(); x.arc(0, 0, 18, 0.5, TAU - 0.4); ink(x, PINK, { w: 5, fa: 0, glow: 10 })
    x.beginPath(); x.moveTo(18 * Math.cos(-0.4) + 9, 18 * Math.sin(-0.4) - 2); x.lineTo(18 * Math.cos(-0.4), 18 * Math.sin(-0.4)); x.lineTo(18 * Math.cos(-0.4) - 3, 18 * Math.sin(-0.4) - 11); ink(x, PINK, { w: 5, fa: 0, glow: 0 })
    x.restore()
    x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'
    x.fillText(`${cur + 1}/3`, w / 2 - 40, -h / 2 + 84)
    // cards: the one under (next) + the one on top (swiping away)
    const cy = -10
    let active = -1
    T.swipes.forEach((s, i) => { const d = i >= 3 ? 0.16 : 0.24; if (t >= s - d && t < s) active = i })
    if (active >= 0) {
      const s = T.swipes[active], d = active >= 3 ? 0.16 : 0.24, p = ease.inCubic(prog(t, s - d, s))
      profileCard(0, cy, (active + 1) % 3, 0, 0.9 + 0.1 * p, 1)
      profileCard(-420 * p, cy + 40 * p, active % 3, -22 * p, 1, 1 - p * 0.4)
    } else {
      const land = T.swipes.filter(s => t >= s).pop()
      const bump = land != null ? 1 + 0.05 * Math.exp(-(t - land) * 9) * Math.sin((t - land) * 22) : 1
      profileCard(0, cy, cur, 0, bump, 1)
    }
    // ✕ and ♡ buttons
    for (const [bx, col, kind] of [[-70, PINK, 'x'], [70, MINT, 'h']]) {
      const pressed = active >= 0 && bx < 0 ? 1.18 : 1
      x.save(); x.translate(bx, h / 2 - 76); x.scale(pressed, pressed)
      x.beginPath(); x.arc(0, 0, 36, 0, TAU); x.fillStyle = 'rgba(14,9,34,0.9)'; x.fill(); ink(x, col, { w: 4, fa: 0, glow: 10 })
      x.beginPath()
      if (kind === 'x') { x.moveTo(-12, -12); x.lineTo(12, 12); x.moveTo(12, -12); x.lineTo(-12, 12) }
      else { x.moveTo(0, 14); x.bezierCurveTo(-26, -4, -12, -22, 0, -9); x.bezierCurveTo(12, -22, 26, -4, 0, 14) }
      ink(x, col, { w: 5, fa: kind === 'h' ? 0.4 : 0, glow: 0 })
      x.restore()
    }
    x.restore()
  }
  function seatedRider(t) {
    const sx = RIDER.x, sy = RIDER.seat
    const bob = 3 * Math.sin(t * 7.1)
    x.save(); x.translate(sx, sy + bob)
    // legs (thighs forward, shins down)
    x.beginPath(); x.moveTo(-22, -8); x.lineTo(70, -10); x.lineTo(76, 140); ink(x, BONE, { w: 30, fa: 0, glow: 6 })
    x.beginPath(); x.moveTo(-22, -8); x.lineTo(70, -10); x.lineTo(76, 140); x.strokeStyle = VIOLET; x.lineWidth = 18; x.stroke()
    // torso, hunched forward
    x.beginPath(); x.moveTo(-50, 6); x.lineTo(-44, -140); x.quadraticCurveTo(-36, -178, 4, -176); x.quadraticCurveTo(40, -170, 42, -132); x.lineTo(46, 6); x.closePath()
    ink(x, BONE, { w: 8, fa: 0.55, fill: LAV, glow: 10 })
    // head, tipped down at the phone
    x.beginPath(); x.arc(22, -214, 36, 0, TAU); ink(x, BONE, { w: 8, fa: 0.95, fill: BONE, glow: 10 })
    // arm up to the phone
    x.beginPath(); x.moveTo(20, -132); x.lineTo(78, -70); x.lineTo(92, -128); ink(x, BONE, { w: 20, fa: 0, glow: 6 })
    x.beginPath(); x.moveTo(20, -132); x.lineTo(78, -70); x.lineTo(92, -128); x.strokeStyle = LAV; x.lineWidth = 9; x.stroke()
    // the little phone, glowing
    x.save(); x.translate(98, -150); x.rotate(-18 * D2R)
    x.beginPath(); x.roundRect(-16, -28, 32, 56, 7); x.fillStyle = '#ffe3c0'; x.shadowColor = PINK; x.shadowBlur = 26; x.fill(); x.shadowBlur = 0
    ink(x, BONE, { w: 4, fa: 0, glow: 0 })
    x.restore()
    x.restore()
  }
  function drawCar(t) {
    const zp = ease.inCubic(prog(t, ...T.zoom))
    if (zp >= 1) return
    const rock = 4 * Math.sin(t * 7.1) + 2 * Math.sin(t * 13.3), tilt = 0.006 * Math.sin(t * 5.3)
    x.save()
    x.globalAlpha = (1 - zp) * clamp(t * 4)
    // push through the middle window
    x.translate(540, 930 + DY); x.scale(lerp(1, 3.2, zp), lerp(1, 3.2, zp)); x.rotate(tilt); x.translate(-540, -930 + rock)
    const { x: cx0, y: cy0, w, h } = CAR
    // body
    x.beginPath(); x.roundRect(cx0, cy0, w, h, 64)
    x.fillStyle = 'rgba(30,22,70,0.94)'; x.fill(); ink(x, '#d8ddff', { w: 7, fa: 0, glow: 18 })
    // ceiling LED strip
    x.beginPath(); x.roundRect(130, 720, 820, 64, 14); x.fillStyle = '#0a0618'; x.fill(); ink(x, rgba(AMBER, 0.8), { w: 4, fa: 0, glow: 10 })
    x.save(); x.beginPath(); x.rect(146, 722, 788, 60); x.clip()
    x.font = `700 38px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    const msg = 'NEXT STOP: SAME FACES  ◆  '
    const mw = x.measureText(msg).width
    const off = 150 - ((Math.max(0, t - 0.2) * 210) % mw)
    x.shadowColor = AMBER; x.shadowBlur = 14; x.fillStyle = '#ffc070'
    for (let i = 0; i < 4; i++) x.fillText(msg, off + i * mw - 0, 754)
    x.shadowBlur = 0
    // dot-matrix mask
    x.fillStyle = 'rgba(10,6,24,0.55)'
    for (let yy = 724; yy < 784; yy += 6) x.fillRect(146, yy, 788, 2)
    x.restore()
    // grab bar
    x.beginPath(); x.moveTo(80, 820); x.lineTo(1000, 820); ink(x, rgba(BONE, 0.75), { w: 6, fa: 0, glow: 6 })
    // windows with the tunnel streaking past
    const WINS = [[80, 330], [410, 670], [750, 1000]]
    for (const [a, b] of WINS) {
      const wy = 850, wh = 230
      x.save(); x.beginPath(); x.roundRect(a, wy, b - a, wh, 26); x.fillStyle = '#07051a'; x.fill(); x.clip()
      // cables
      x.strokeStyle = 'rgba(154,123,224,0.35)'; x.lineWidth = 3
      for (const cy of [wy + 150, wy + 172]) { x.beginPath(); x.moveTo(a, cy); x.lineTo(b, cy); x.stroke() }
      // tunnel lights (amber dashes rushing left)
      const r = rng(7)
      for (let i = 0; i < 6; i++) {
        const lane = wy + 40 + (i % 3) * 46, sp = 1900 + r() * 700
        const px = W + 400 - ((t * sp + r() * 2000) % (W + 800))
        x.fillStyle = i % 3 === 1 ? rgba(PINK, 0.85) : 'rgba(255,214,140,0.9)'; x.shadowColor = AMBER; x.shadowBlur = 16
        x.fillRect(px, lane, 150 + r() * 120, 7)
      }
      x.shadowBlur = 0
      x.restore()
      x.beginPath(); x.roundRect(a, wy, b - a, wh, 26); ink(x, rgba(BONE, 0.85), { w: 6, fa: 0, glow: 8 })
    }
    // poles
    for (const px of [372, 708]) { x.beginPath(); x.moveTo(px, 790); x.lineTo(px, 1500); ink(x, rgba(GOLD, 0.85), { w: 9, fa: 0, glow: 10 }) }
    // bench
    x.beginPath(); x.roundRect(70, RIDER.seat - 4, 940, 54, 20); ink(x, rgba(BONE, 0.7), { w: 5, fa: 0.85, fill: '#3b2a7a', glow: 6 })
    x.beginPath(); x.roundRect(70, 1130, 940, 200, 24); x.fillStyle = 'rgba(70,50,140,0.35)'; x.fill(); ink(x, rgba(LAV, 0.4), { w: 4, fa: 0, glow: 0 })
    // floor
    x.beginPath(); x.moveTo(60, 1480); x.lineTo(1020, 1480); ink(x, rgba(LAV, 0.6), { w: 5, fa: 0, glow: 6 })
    seatedRider(t)
    // a soft beam from the rider's phone to the magnified one
    const pk = pop01(t, T.phone, 0.45, 1.8)
    if (pk > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= clamp(pk) * 0.5
      const g = x.createLinearGradient(RIDER.x + 98, 0, PH.x - PH.w / 2, 0); g.addColorStop(0, rgba(PINK, 0.5)); g.addColorStop(1, rgba(PINK, 0.05))
      x.fillStyle = g; x.beginPath(); x.moveTo(RIDER.x + 98, RIDER.seat - 150 + 3 * Math.sin(t * 7.1)); x.lineTo(PH.x - PH.w / 2 + 10, PH.y - DY - PH.h / 2 + 80); x.lineTo(PH.x - PH.w / 2 + 10, PH.y - DY + PH.h / 2 - 80); x.closePath(); x.fill()
      x.restore()
    }
    x.restore()
    // the phone rides along (on top, not zoomed): flies off as we push into the tunnel
    const fly = ease.inCubic(prog(t, T.zoom[0] - 0.08, T.zoom[0] + 0.3))
    x.save(); x.translate(fly * 700, rock * 0.6 - fly * 200); x.rotate(fly * 0.6)
    drawPhone(t, pk * (1 - fly * 0.3))
    x.restore()
  }
  function drawStamps(t) {
    STAMPS.forEach((s, i) => {
      const end = i === 0 ? T.swipes[3] - 0.12 : T.zoom[0] + 0.05
      if (t < s.t || t > end + 0.15) return
      const k = easeOutBack(prog(t, s.t, s.t + 0.22), 3.2), out = outK(t, end, 0.15)
      const sc = lerp(2.4, 1, ease.outCubic(prog(t, s.t, s.t + 0.16))) * (0.92 + 0.08 * k)
      const cx = i ? 560 : 520, cy = (i ? 1000 : 960) + DY
      x.save(); x.translate(cx, cy); x.rotate((i ? 8 : -9) * D2R); x.scale(sc, sc)
      x.globalAlpha = clamp(prog(t, s.t, s.t + 0.08)) * out
      x.font = `900 ${i ? 128 : 120}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      const tw = x.measureText(s.txt).width + 80
      x.beginPath(); x.roundRect(-tw / 2, -80, tw, 160, 24); x.fillStyle = 'rgba(14,9,34,0.86)'; x.fill(); ink(x, PINK, { w: 10, fa: 0, glow: 26 })
      x.shadowColor = PINK; x.shadowBlur = 20; x.fillStyle = PINK; x.fillText(s.txt, 0, 6); x.shadowBlur = 0
      x.restore()
      sparkle(x, cx, cy, t, s.t, { n: 10, R: 320, seed: 40 + i, size: 28, dur: 0.6 })
    })
  }

  // ── the tunnel: rings of lights rushing out of the vanishing point
  const tunnelSpeed = t => (t < 7.4 ? 1 : lerp(1, 0.25, ease.inOutQuad(prog(t, 7.4, 8.2))))
  const tunnelPos = t => {   // integral of the speed (analytic enough: piecewise)
    if (t < 7.4) return t
    const u = Math.min(t, 8.2) - 7.4, p = u / 0.8
    // ∫ lerp(1, .25, inOutQuad) ≈ numeric (pure f(t))
    let s = 0; const N = 40
    for (let i = 0; i < N; i++) { const q = (i + 0.5) / N * p; s += lerp(1, 0.25, ease.inOutQuad(q)) }
    return 7.4 + s / N * u + (t > 8.2 ? (t - 8.2) * 0.25 : 0)
  }
  function drawTunnel(t) {
    const a = clamp(prog(t, T.zoom[0] + 0.1, T.zoom[1])) * outK(t, T.tunnelOut[0], T.tunnelOut[1] - T.tunnelOut[0])
    if (a <= 0) return
    const pos = tunnelPos(t) * 0.62
    x.save(); x.globalAlpha = a
    // dark throat
    const g = x.createRadialGradient(VP.x, VP.y, 10, VP.x, VP.y, 1100)
    g.addColorStop(0, 'rgba(3,2,10,0.95)'); g.addColorStop(0.35, 'rgba(10,6,28,0.6)'); g.addColorStop(1, 'rgba(10,6,28,0)')
    x.fillStyle = g; x.fillRect(0, 0, W, H)
    // rails
    x.globalAlpha = a * 0.7
    for (const dx of [-1, 1]) {
      x.beginPath(); x.moveTo(VP.x + dx * 8, VP.y + 24); x.lineTo(VP.x + dx * 420, H + 40); ink(x, LAV, { w: 5, fa: 0, glow: 10 })
    }
    x.globalAlpha = a
    const N = 11
    for (let i = 0; i < N; i++) {
      const d = ((i / N + pos) % 1 + 1) % 1
      const s = 0.05 * Math.exp(d * 3.4)
      const al = clamp(d * 4) * clamp((1 - d) * 5)
      if (al <= 0) continue
      const hw = 560 * s, hh = 700 * s
      x.save(); x.globalAlpha = a * al * 0.8
      x.beginPath(); x.moveTo(VP.x - hw, VP.y + hh); x.lineTo(VP.x - hw, VP.y - hh * 0.25); x.arc(VP.x, VP.y - hh * 0.25, hw, Math.PI, TAU); x.lineTo(VP.x + hw, VP.y + hh)
      ink(x, i % 2 ? VIOLET : '#7f8fe0', { w: Math.max(1.5, 7 * s), fa: 0, glow: 14 * s })
      x.restore()
      // two tunnel lights per ring, streaking outward
      const s0 = 0.05 * Math.exp(Math.max(0, d - 0.06) * 3.4)
      for (const dx of [-1, 1]) {
        const lx = VP.x + dx * hw * 0.92, ly = VP.y - hh * 0.05, lx0 = VP.x + dx * 560 * s0 * 0.92, ly0 = VP.y - 700 * s0 * 0.05
        const col = i % 3 === 0 ? PINK : '#ffd98a'
        x.save(); x.globalAlpha = a * al
        x.beginPath(); x.moveTo(lx0, ly0); x.lineTo(lx, ly); x.strokeStyle = rgba(col, 0.75); x.lineWidth = Math.max(2, 16 * s); x.lineCap = 'round'; x.shadowColor = col; x.shadowBlur = 20; x.stroke()
        x.restore()
        orb(x, lx, ly, Math.max(2, 13 * s), col, a * al, 3)
      }
    }
    x.restore()
  }

  // ── the deck → the mystery card → a star
  function drawCardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha = a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  const CARD_GLOW = [BLUE, PINK, GOLD, MINT, LAV]
  // a card flying out of the tunnel's throat to its fan slot
  const dealPose = (F, t0, td, t) => {
    const p = ease.outCubic(prog(t, t0, td))
    return { p, cx: lerp(VP.x, F.x, p), cy: lerp(VP.y - 20, F.y, p) - Math.sin(Math.PI * p) * 90, h: CARD_H * lerp(0.06, 1, p), rot: F.rot + 300 * (1 - p) }
  }
  function drawDeck(t) {
    if (t < T.deal[0] - 0.5 || t > T.toStar[1]) return
    DEAL_ORDER.forEach((ci, k) => {
      if (ci === 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.45
      if (t < t0) return
      const off = ease.inCubic(prog(t, T.lift[0] - 0.05, T.lift[0] + 0.4))
      if (off >= 1) return
      const D = dealPose(F, t0, td, t)
      const side = ci < 2 ? -1 : 1
      const hopT = (t - BEAT(0)) / 0.5556, ph = hopT - Math.floor(hopT)
      const hop = t > T.glow && t < T.lift[0] ? -18 * Math.max(0, Math.sin(Math.PI * Math.min(1, ph / 0.5))) * ((Math.floor(hopT) + ci) % 2) : 0
      const gk = t > T.glow ? pop01(t, T.glow + k * 0.05, 0.3) : 0
      drawCardImg(backBmp, D.cx + side * 900 * off, D.cy + hop - 200 * off, D.h, D.rot + side * 40 * off, 1, 1, gk > 0 ? 34 * clamp(gk) : 0, CARD_GLOW[ci])
      if (Math.abs(t - td) < 0.7) sparkle(x, F.x, F.y, t, td, { n: 7, R: 170, seed: 60 + ci, size: 22, dur: 0.55 })
    })
    // centre card: dealt last, lifts, flips to the mystery card, then spins into a star
    const td = T.deal[4], t0 = td - 0.45
    if (t < t0) return
    const D = dealPose(FAN[2], t0, td, t)
    const lp = ease.inOutCubic(prog(t, ...T.lift))
    const fp = prog(t, ...T.flip)
    const sp = ease.inCubic(prog(t, ...T.toStar))
    let cx = lerp(D.cx, CARD_C.x, lp), cy = lerp(D.cy, CARD_C.y, lp)
    let h = lerp(D.h, BIG_H, lp)
    let rot = D.rot * (1 - lp)
    const landK = t > T.land ? Math.exp(-(t - T.land) * 5) * Math.sin((t - T.land) * 18) : 0
    h *= 1 + 0.05 * landK
    if (t > T.land + 0.4) cy += 8 * Math.sin((t - T.land) * 2.2)
    cx = lerp(cx, STAR.x, sp); cy = lerp(cy, STAR.y, sp); h *= 1 - sp; rot += 540 * sp
    if (h < 2) return
    const sx = Math.abs(Math.cos(Math.PI * fp))
    const showProf = fp >= 0.5
    if (showProf && sp < 1) {
      const ak = clamp((t - T.land + 0.2) * 3) * (1 - sp)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 60, cx, cy, 640)
      g.addColorStop(0, rgba('#c9a6ff', 0.5 * ak)); g.addColorStop(0.5, rgba(PINK, 0.16 * ak)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 640, 0, TAU); x.fill()
      x.translate(cx, cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(TAU / 12)
        const rg = x.createLinearGradient(0, 0, 0, -780); rg.addColorStop(0, rgba(GOLD, 0.15 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-16, 0); x.lineTo(-64, -780); x.lineTo(64, -780); x.lineTo(16, 0); x.fill()
      }
      x.restore()
    }
    const gk = t > T.glow && !showProf ? 34 * clamp(pop01(t, T.glow + 0.2, 0.3)) : showProf ? 42 : 0
    drawCardImg(showProf ? profBmp : backBmp, cx, cy, h, rot, Math.max(0.02, sx), 1, gk, showProf ? LAV : CARD_GLOW[2])
    if (fp > 0.3 && fp < 0.7) { x.save(); x.globalAlpha = 1 - Math.abs(fp - 0.5) * 5; x.globalCompositeOperation = 'lighter'; orb(x, cx, cy, 60, '#fff3e0', 1, 6); x.restore() }
    sparkle(x, cx, cy, t, T.land, { n: 16, R: 430, seed: 77, size: 34, dur: 0.85 })
  }

  // ── out of the tunnel: the skyline, the loop line, the branch to the star
  function drawSkyline(t, a) {
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g = x.createRadialGradient(540, BASE, 40, 540, BASE, 800)
    g.addColorStop(0, 'rgba(255,110,170,0.32)'); g.addColorStop(0.5, 'rgba(154,123,224,0.12)'); g.addColorStop(1, 'rgba(154,123,224,0)')
    x.fillStyle = g; x.fillRect(0, BASE - 800, W, 800)
    // the needle tower (generic) rises first
    const tk = easeOutBack(prog(t, T.ring[0], T.ring[0] + 0.6), 1.4)
    if (tk > 0) {
      const tx = TOWER.x, top = lerp(BASE, TOWER.top, tk)
      const hgt = BASE - top
      x.beginPath()
      x.moveTo(tx - 34, BASE); x.lineTo(tx - 9, top + hgt * 0.42); x.lineTo(tx + 9, top + hgt * 0.42); x.lineTo(tx + 34, BASE); x.closePath()
      x.fillStyle = 'rgba(32,22,72,0.97)'; x.fill(); ink(x, '#7f8fe0', { w: 4, fa: 0, glow: 10 })
      // the pod
      const py = top + hgt * 0.38
      x.beginPath(); x.ellipse(tx, py, 44, 20, 0, 0, TAU); x.fillStyle = 'rgba(40,28,90,1)'; x.fill(); ink(x, LAV, { w: 4, fa: 0, glow: 10 })
      x.beginPath(); x.ellipse(tx, py - 28, 26, 11, 0, 0, TAU); x.fillStyle = 'rgba(40,28,90,1)'; x.fill(); ink(x, LAV, { w: 3, fa: 0, glow: 8 })
      x.beginPath(); x.moveTo(tx - 9, top + hgt * 0.42); x.lineTo(tx - 4, top + hgt * 0.1); x.lineTo(tx + 4, top + hgt * 0.1); x.lineTo(tx + 9, top + hgt * 0.42); x.fillStyle = 'rgba(32,22,72,0.97)'; x.fill(); ink(x, '#7f8fe0', { w: 3, fa: 0, glow: 8 })
      x.beginPath(); x.moveTo(tx, top + hgt * 0.1); x.lineTo(tx, top); ink(x, BONE, { w: 4, fa: 0, glow: 12 })
      x.fillStyle = rgba(PINK, 0.9 * (0.6 + 0.4 * Math.sin(t * 6))); x.beginPath(); x.arc(tx, top, 6, 0, TAU); x.fill()
      for (let i = -1; i <= 1; i++) { x.fillStyle = 'rgba(255,217,138,0.95)'; x.fillRect(tx + i * 16 - 4, py - 4, 8, 8) }
    }
    for (const b of SKYL) {
      const k = easeOutBack(prog(t, b.t0, b.t0 + 0.45), 1.5)
      if (k <= 0) continue
      const y0 = BASE - b.h * k
      x.save(); x.beginPath(); x.rect(-20, 0, W + 40, BASE); x.clip()
      x.beginPath(); x.rect(b.x, y0, b.w, BASE - y0 + 2)
      x.fillStyle = 'rgba(30,20,64,0.95)'; x.fill(); ink(x, VIOLET, { w: 3.5, fa: 0, glow: 10 })
      for (const w of b.win) {
        if (t < w.on || w.y < y0 + 20) continue
        x.fillStyle = rgba(w.col, 0.9 * clamp((t - w.on) * 8) * (0.7 + 0.3 * noise1(t + w.x * 0.1, 3)))
        x.fillRect(w.x - 5, w.y - 8, 10, 16)
      }
      x.restore()
    }
    const sg = x.createLinearGradient(0, BASE, 0, H); sg.addColorStop(0, 'rgba(14,9,34,0.9)'); sg.addColorStop(1, 'rgba(14,9,34,0.25)')
    x.fillStyle = sg; x.fillRect(0, BASE, W, H - BASE)
    x.restore()
  }
  const TOP_ANG = -Math.PI / 2
  // the train's angle on the loop: two laps, arriving at the top exactly as the branch finishes
  const trainAng = t => {
    const t0 = T.ring[0] + 0.15, t1 = T.ride[0]
    const p = clamp((t - t0) / (t1 - t0))
    return TOP_ANG - TAU * 1.5 * (1 - ease.outQuad(p))
  }
  function capsule(cx, cy, ang, s, col) {
    x.save(); x.translate(cx, cy); x.rotate(ang); x.scale(s, s)
    x.beginPath(); x.roundRect(-34, -17, 68, 34, 17); ink(x, BONE, { w: 5, fa: 1, fill: col, glow: 16 })
    x.fillStyle = 'rgba(14,9,34,0.85)'; for (const dx of [-14, 6]) { x.beginPath(); x.roundRect(dx - 7, -8, 14, 14, 4); x.fill() }
    x.restore()
  }
  function drawLoop(t, a) {
    if (a <= 0 || t < T.ring[0]) return
    const draw = ease.inOutCubic(prog(t, ...T.ring))
    const dimK = 1 - 0.55 * ease.inOutQuad(prog(t, T.ride[0], T.ride[1] + 0.2))
    x.save(); x.globalAlpha = a
    // the loop line
    x.save(); x.globalAlpha = a * dimK
    x.beginPath(); x.arc(LOOP.x, LOOP.y, LOOP.r, TOP_ANG, TOP_ANG + TAU * draw)
    x.lineCap = 'round'; x.strokeStyle = PINK; x.lineWidth = 20; x.shadowColor = PINK; x.shadowBlur = 24; x.stroke(); x.shadowBlur = 0
    x.strokeStyle = 'rgba(255,240,245,0.45)'; x.lineWidth = 5; x.stroke()
    // stations, each one the same three again (1 · 2 · 3 · 1 · 2 · 3)
    for (let i = 0; i < 6; i++) {
      const an = TOP_ANG + (i + 0.5) * TAU / 6
      const k = pop01(t, T.ring[0] + (i + 0.5) / 6 * (T.ring[1] - T.ring[0]), 0.3, 2.6)
      if (k <= 0) continue
      const sx = LOOP.x + Math.cos(an) * LOOP.r, sy = LOOP.y + Math.sin(an) * LOOP.r
      x.save(); x.translate(sx, sy); x.scale(k, k)
      x.beginPath(); x.arc(0, 0, 26, 0, TAU); x.fillStyle = '#fff6ea'; x.fill(); ink(x, '#140e30', { w: 6, fa: 0, glow: 0 })
      x.fillStyle = '#140e30'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String((i % 3) + 1), 0, 2)
      x.restore()
    }
    x.restore()
    // the branch line: straight up off the loop to the star
    const bp = ease.outCubic(prog(t, ...T.branch))
    const top = { x: LOOP.x + Math.cos(TOP_ANG) * LOOP.r, y: LOOP.y + Math.sin(TOP_ANG) * LOOP.r }
    if (bp > 0) {
      x.beginPath(); x.moveTo(top.x, top.y); x.quadraticCurveTo(top.x, top.y - 60, lerp(top.x, STAR.x, bp), lerp(top.y, STAR.y + 40, bp))
      x.lineCap = 'round'; x.strokeStyle = GOLD; x.lineWidth = 20; x.shadowColor = GOLD; x.shadowBlur = 26; x.stroke(); x.shadowBlur = 0
      x.strokeStyle = 'rgba(255,250,235,0.6)'; x.lineWidth = 5; x.stroke()
      // switch point flash
      sparkle(x, top.x, top.y, t, T.branch[0], { n: 8, R: 140, seed: 12, size: 24, dur: 0.5 })
    }
    // the train
    if (t > T.ring[0] + 0.15) {
      const rp = ease.inOutCubic(prog(t, ...T.ride))
      if (rp < 1) {
        let px, py, ang
        if (rp <= 0) { const an = trainAng(t); px = LOOP.x + Math.cos(an) * LOOP.r; py = LOOP.y + Math.sin(an) * LOOP.r; ang = an - Math.PI / 2 }
        else { px = lerp(top.x, STAR.x, rp); py = lerp(top.y, STAR.y + 40, rp); ang = -Math.PI / 2 }
        capsule(px, py, ang, 1 - 0.3 * rp, GOLD)
      }
    }
    x.restore()
  }
  function drawStar(t) {
    if (t < T.toStar[1] - 0.15 || t > T.fade[1]) return
    const k = pop01(t, T.toStar[1] - 0.1, 0.45, 2.6) * (1 - ease.inQuad(prog(t, T.fade[0] + 0.2, T.fade[1] - 0.05)))
    if (k <= 0) return
    const burst = t > T.burst ? 1 + 0.6 * Math.exp(-(t - T.burst) * 4) : 1
    const pulse = (1 + 0.1 * Math.sin((t - T.toStar[1]) * 6)) * burst
    orb(x, STAR.x, STAR.y, 24 * k * pulse, GOLD, 1, 6)
    x.save(); x.globalAlpha = clamp(k)
    drawPixelStar(x, STAR.x, STAR.y, 84 * k * pulse, 0, '#fff3e0')
    x.restore()
    sparkle(x, STAR.x, STAR.y, t, T.toStar[1], { n: 14, R: 300, seed: 91, size: 30, dur: 0.85 })
    sparkle(x, STAR.x, STAR.y, t, T.burst, { n: 20, R: 460, seed: 93, size: 36, dur: 1.0 })
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < 10.48) {
        const fade = 1 - ease.inOutQuad(prog(t, ...T.fade))
        x.save(); x.globalAlpha = fade
        drawTunnel(t)
        drawCar(t)
        drawStamps(t)
        drawSkyline(t, clamp(prog(t, T.tunnelOut[0], T.tunnelOut[1])))
        drawLoop(t, 1)
        drawDeck(t)
        drawStar(t)
        x.restore()
      }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.25)))
      eyebrow.style.opacity = String(ease.outCubic(prog(t, T.eye, T.eye + 0.3)) * outK(t, T.h0Out))
      H0.update(t, outK(t, T.h0Out))
      H2.update(t, outK(t, T.h2Out))
      H3.update(t, outK(t, T.h3Out))
      H4.update(t, outK(t, T.h4Out, 0.3))
      drawGrain(gx, t)
    },
  }
}

// ── sound (D-major palette; the engine shifts pitched cues into the film's key)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (ts, base = 0, gain = 0.028) => ts.map((s, i) => ['pop', r3(s), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  // hook
  ['whoosh', 0.0, 1.2, 0.04],
  ...wordPops(T.h0.slice(0, 6), 0, 0.03),
  ['pluck', r3(T.h0[6]), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.h0[6]), 1318.51, 0.045, 0],
  ['pop', r3(T.phone + 0.1), 880, 0.04, 0.4],
  ...T.swipes.map((s, i) => ['whoosh', r3(s - (i >= 3 ? 0.16 : 0.24)), i >= 3 ? 0.2 : 0.28, 0.035]),
  ...T.swipes.map((s, i) => ['tick', r3(s), 0.05]),
  ['riser', r3(T.drop - 0.7), r3(T.drop), 0.05], ['boom', r3(T.drop), 0.1],
  ...STAMPS.map((s, i) => ['pop', r3(s.t), [1174.66, 1479.98][i], 0.06, i ? 0.3 : -0.3]),
  ['glitter', 2.9, 3.4],
  // into the tunnel + the deck
  ['whoosh', T.zoom[0], 0.9, 0.07], ['riser', 3.1, r3(T.h2[0]), 0.04],
  ...wordPops([T.h2[0], T.h2[1], T.h2[2]], 2, 0.026),
  ['pluck', r3(T.h2[3]), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.h2[3]), 1318.51, 0.045, 0],
  ...wordPops([T.h2[4], T.h2[5], T.h2[6]], 4, 0.024),
  ...T.deal.map(s => ['whoosh', r3(s - 0.4), 0.42, 0.03]),
  ...T.deal.map((s, i) => ['pop', r3(s), NOTE[(i * 2 + 1) % 7], 0.04, [-0.5, 0.5, -0.25, 0.25, 0][i]]),
  ['bell', r3(T.glow), 1174.66, 0.045, 1.8, 0], ['glitter', r3(T.glow), r3(T.glow + 0.6)],
  // card first
  ['whoosh', T.lift[0], 0.6, 0.045], ['riser', T.lift[0], r3(T.land), 0.04],
  ...wordPops([T.h3[0]], 1, 0.026), ['pluck', r3(T.h3[1]), 880, 0.055, 0.6, 0],
  ['boom', r3(T.land), 0.1], ['bell', r3(T.land), 880, 0.05, 2.2, -0.2], ['bell', r3(T.land + 0.06), 1174.66, 0.045, 2.2, 0.2], ['glitter', r3(T.land), r3(T.land + 0.8)],
  ...wordPops([T.h3[2] + 0.001, T.h3[3]], 3, 0.026),
  // get off the loop: the two-tone door chime, the loop, the switch, the star
  ['whoosh', T.toStar[0], 0.7, 0.045],
  ['bell', r3(T.h4[0]), 1318.51, 0.04, 1.2, -0.2], ['bell', r3(T.h4[0] + 0.28), 1046.5, 0.04, 1.6, 0.2],
  ...wordPops([T.h4[1], T.h4[2]], 0, 0.026),
  ['pluck', r3(T.h4[3]), 1174.66, 0.055, 0.6, 0], ['pop', r3(T.h4[3]), 1318.51, 0.045, 0],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', r3(T.ring[0] + (i + 0.5) / 6 * (T.ring[1] - T.ring[0])), NOTE[(i % 3) * 2], 0.018, Math.cos(-Math.PI / 2 + (i + 0.5) * Math.PI / 3) * 0.5]),
  ['tick', r3(T.branch[0]), 0.06], ['whoosh', r3(T.ride[0]), 0.5, 0.04],
  ['bell', r3(T.burst), 1318.51, 0.05, 2.2, 0], ['bell', r3(T.burst + 0.08), 1760, 0.035, 2.0, 0.2], ['glitter', r3(T.burst), r3(T.burst + 0.7)],
]
