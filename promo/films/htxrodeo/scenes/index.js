// htxrodeo (15 s, vertical) — "Rodeo season: suddenly everyone's a cowboy."
//   0.0–3.3   HOOK: a row of pictogram people by an arena fence; cowboy hats drop onto their heads one by one (on the
//             eighth notes), then boots stomp on the beat. The moon gets a hat too. "Rodeo season: | Suddenly everyone's a cowboy."
//   3.3–5.2   "Want someone real?" — the hats fly off, the people shrug and pop away.
//   5.2–8.25  TURN: Align's mystery card (card-profile-2, aura veil) drops in on a glow, a ring of zodiac glyphs around it.
//             "Chart first. Face last." A lone hat lands on the card; the card shrugs it off: "No costumes."
//   8.35–10.4 A gold lasso spins, drops and cinches round a big star: "Find the real thing."  → plain sky H from 10.5,
//             end card ("come" + the Align logo) at 10.6.
import { clamp, lerp, prog, ease, rng } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { el } from '../../../src/lib.js'
import { BONE, GOLD, PINK, CYAN, SHADOW, GLYPH_FONT, D2R, rgba, mixHex, pop01, outScale, outK, glowStroke, makeBurst, drawBurst, popText } from './kit.js'

export const DURATION = 15
const END = DURATION - ENDCARD_LEN          // 10.6: the end card takes over here
const SETTLE = 10.5                          // from here only the plain sky H is on screen
const BEAT = 60 / 108, B0 = 0.6              // the 108 bpm grid: beat n at 0.6 + n·0.5556
const beat = n => +(B0 + n * BEAT).toFixed(3)
const RED = '#ff4d4a', TAN = '#d99a52', DARK = '#140f2a'

const T = {
  rodeo: 0.1, hook: 0.32, hookLast: 0.86, hookOut: [3.1, 3.28],
  want: 3.32, wantLast: 3.62, fly: beat(6), shrug: beat(6) - 0.05, peopleOut: 4.72, wantOut: [5.0, 5.18],
  card: 5.2, land: beat(9), ring: 5.78, chart: 5.48, hat: 6.2, hatLand: 6.52, flick: 6.86, costumes: 6.86,
  cardOut: 8.14, chartOut: [8.12, 8.28],
  find: 8.36, findLast: 8.68, star: 8.5, toss: 9.0, cinch: 9.32, lassoOut: 9.95, findOut: [10.12, 10.42],
}
// hats drop on the eighth notes from the downbeat; the moon's hat lands last
const HAT_AT = [0, 1, 2, 3, 4].map(i => beat(i * 0.5))
const MOON_HAT = beat(3)
const STOMP_FROM = beat(3), STOMP_TO = T.fly

// ── the posse: five pictogram cowfolk (no faces), varied heights, flat shirt colours, hats in five colours
const GROUND = 1730
const FOLK = [
  { x: 150, s: 0.82, shirt: '#3f7cf0', hat: TAN },
  { x: 345, s: 0.95, shirt: '#e163d6', hat: GOLD },
  { x: 540, s: 0.88, shirt: '#2fc79a', hat: PINK },
  { x: 735, s: 0.99, shirt: '#f0603a', hat: CYAN },
  { x: 930, s: 0.84, shirt: '#a35cf0', hat: '#f2ede2' },
]
const ORDER = [2, 0, 4, 1, 3]                // the order the hats land in (middle first, then out)

// a cowboy hat, centred on the crown's base (0,0), ~200 px wide at s = 1
function drawHat(x, col, s = 1, a = 1) {
  x.save(); x.scale(s, s); x.globalAlpha *= a
  const band = mixHex(col, DARK, 0.55)
  // crown (pinched top)
  x.beginPath()
  x.moveTo(-50, 2); x.bezierCurveTo(-58, -40, -52, -78, -36, -86); x.quadraticCurveTo(-16, -74, 0, -64)
  x.quadraticCurveTo(16, -74, 36, -86); x.bezierCurveTo(52, -78, 58, -40, 50, 2); x.closePath()
  x.fillStyle = col; x.fill(); glowStroke(x, BONE, 6, 12); x.stroke(); x.shadowBlur = 0
  x.save(); x.clip(); x.fillStyle = band; x.fillRect(-60, -26, 120, 20); x.restore()
  // brim, curled up at both ends
  x.beginPath()
  x.moveTo(-104, -26); x.quadraticCurveTo(-92, 6, -40, 10); x.quadraticCurveTo(0, 16, 40, 10); x.quadraticCurveTo(92, 6, 104, -26)
  x.quadraticCurveTo(84, -4, 40, -4); x.quadraticCurveTo(0, 2, -40, -4); x.quadraticCurveTo(-84, -4, -104, -26); x.closePath()
  x.fillStyle = mixHex(col, '#ffffff', 0.12); x.fill(); glowStroke(x, BONE, 6, 12); x.stroke()
  x.restore()
}

// a 5-point star
function starPath(x, R, r = R * 0.46) {
  x.beginPath()
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r : R; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) }
  x.closePath()
}

async function build(stage) {
  try {
    await Promise.all(["800 150px Inter", "800 108px Inter", "700 62px Inter", "italic 500 168px 'EB Garamond'", "italic 500 72px 'EB Garamond'", "bold 58px 'EB Garamond'", "700 34px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const card = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-profile-2.png' })
  let cardBmp = null
  if (card) { const c = document.createElement('canvas'); c.width = 900; c.height = Math.round(900 * card.height / card.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(card, 0, 0, c.width, c.height); cardBmp = c }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  // ── type
  const H0a = popText(root, 'Rodeo season:', { top: 190, size: 104, weight: 800, at: T.rodeo, gap: 0.09 })
  const H0 = popText(root, 'Suddenly | *everyone\'s* | a cowboy.', { top: 318, size: 140, weight: 800, accentSize: 168, at: T.hook, gap: 0.12, accentColor: GOLD, lastAt: T.hookLast, wobble: true })
  const H1 = popText(root, 'Want someone | *real?*', { top: 300, size: 128, weight: 800, accentSize: 190, at: T.want, gap: 0.08, accentColor: PINK, lastAt: T.wantLast, wobble: true })
  const H2 = popText(root, 'Card *first.* | Face last.', { top: 200, size: TYPE.headSize, weight: 800, at: T.chart, gap: 0.09, accentColor: GOLD })
  const S2 = popText(root, 'No *costumes.*', { top: 1610, size: 72, weight: 800, at: T.costumes, gap: 0.1, accentSize: 92, accentColor: PINK })
  const H3 = popText(root, 'Find the | *real thing.*', { top: 250, size: 150, weight: 800, accentSize: 180, at: T.find, gap: 0.1, accentColor: GOLD, lastAt: T.findLast, wobble: true })
  const TEXTS = [[H0a, T.hookOut], [H0, T.hookOut], [H1, T.wantOut], [H2, T.chartOut], [S2, T.chartOut], [H3, T.findOut]]

  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const B = (k, n = 8, d = 90) => makeBurst(700 + k, n, d)
  const B_HAT = FOLK.map((_, i) => B(i, 7, 110)), B_MOON = B(9, 9, 120), B_HOOK = B(10, 10, 170)
  const B_LAND = B(11, 14, 260), B_FLICK = B(12, 9, 140), B_STAR = B(13, 10, 170), B_CINCH = B(14, 16, 300), B_REAL = B(15, 10, 190)

  // ── 1 + 2: the posse
  const hatK = i => HAT_AT[ORDER.indexOf(i)]
  function personGeom(f, i, t) {
    // stomp: on each beat one boot lands (alternating, offset per person); the other lifts in the back half of the beat
    let lift = [0, 0], squash = 1, bob = 0
    if (t > STOMP_FROM - BEAT * 0.5 && t < STOMP_TO) {
      const u = (t - B0) / BEAT, n = Math.floor(u), ph = u - n
      const legNext = (n + 1 + i) % 2
      if (ph > 0.45 && t + BEAT * (1 - ph) > STOMP_FROM - 0.01) lift[legNext] = 46 * Math.sin(Math.PI * (ph - 0.45) / 0.55)
      if (ph < 0.18 && t - ph * BEAT >= STOMP_FROM - 0.01) squash = 1 - 0.06 * Math.sin(Math.PI * ph / 0.18)
      bob = -10 * Math.sin(Math.PI * ph) * (t > STOMP_FROM ? 1 : 0)
    }
    return { lift, squash, bob }
  }
  function drawPerson(f, i, t, k, shrugK) {
    const { lift, squash, bob } = personGeom(f, i, t)
    const s = f.s
    x.save()
    x.translate(f.x, GROUND); x.scale(k * s, k * s * squash); x.translate(0, bob)
    x.globalAlpha = clamp(k * 2)
    const hipY = -230, shY = -440, headY = -510
    const sway = 3 * Math.sin(t * 3.1 + i * 1.7) * D2R
    // arms: hands on hips → shrug (hands up and out)
    const arms = [-1, 1].map(sd => ({
      sh: { x: sd * 60, y: shY + 22 },
      el: { x: sd * lerp(104, 120, shrugK), y: lerp(shY + 120, shY - 10, shrugK) },
      ha: { x: sd * lerp(54, 150, shrugK), y: lerp(hipY + 10, shY - 90, shrugK) },
    }))
    const legs = [-1, 1].map((sd, li) => ({ hip: { x: sd * 32, y: hipY }, ft: { x: sd * 44, y: -34 - lift[li] } }))
    for (const pass of [0, 1]) {
      x.save()
      const grow = pass ? 0 : 7
      if (!pass) { x.strokeStyle = BONE; x.fillStyle = BONE; x.shadowColor = rgba(GOLD, 0.7); x.shadowBlur = 16 } else { x.strokeStyle = DARK; x.fillStyle = DARK }
      x.lineCap = 'round'; x.lineJoin = 'round'
      // legs
      x.lineWidth = 46 + grow * 2
      for (const l of legs) { x.beginPath(); x.moveTo(l.hip.x, l.hip.y); x.lineTo(l.ft.x, l.ft.y); x.stroke() }
      // arms
      x.lineWidth = 36 + grow * 2
      for (const a of arms) { x.beginPath(); x.moveTo(a.sh.x, a.sh.y); x.lineTo(a.el.x, a.el.y); x.lineTo(a.ha.x, a.ha.y); x.stroke() }
      // torso
      if (pass) x.fillStyle = f.shirt
      x.save(); x.translate(0, hipY); x.rotate(sway); x.translate(0, -hipY)
      x.beginPath(); x.roundRect(-72 - grow, shY - grow, 144 + grow * 2, hipY - shY + 30 + grow * 2, [52 + grow, 52 + grow, 20 + grow, 20 + grow]); x.fill()
      // head
      if (pass) x.fillStyle = DARK
      x.beginPath(); x.arc(0, headY, 50 + grow, 0, Math.PI * 2); x.fill()
      x.restore()
      x.restore()
    }
    // belt buckle
    x.save(); x.fillStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 12
    x.beginPath(); x.roundRect(-20, hipY - 6, 40, 26, 6); x.fill(); x.restore()
    // boots: shaft + pointed toe + heel, pointing outwards
    for (const [li, l] of legs.entries()) {
      const sd = li ? 1 : -1
      x.save(); x.translate(l.ft.x, l.ft.y)
      x.beginPath()
      x.moveTo(-sd * 26, -64); x.lineTo(sd * 26, -64); x.lineTo(sd * 28, -6)
      x.quadraticCurveTo(sd * 74, -10, sd * 92, 18); x.lineTo(sd * 20, 26); x.lineTo(sd * 8, 34); x.lineTo(-sd * 26, 34); x.closePath()
      x.fillStyle = TAN; x.fill(); glowStroke(x, BONE, 5, 10); x.stroke()
      x.restore()
      // stomp dust
      if (t > STOMP_FROM - 0.02 && t < STOMP_TO + 0.4) {
        const u = (t - B0) / BEAT, n = Math.floor(u), age = (u - n) * BEAT
        if ((n + i) % 2 === li && age < 0.38 && B0 + n * BEAT >= STOMP_FROM - 0.01 && B0 + n * BEAT < STOMP_TO) {
          const p = age / 0.38, e = ease.outCubic(p)
          x.save(); x.globalAlpha = (1 - p) * 0.9
          glowStroke(x, BONE, 6, 8)
          for (const d of [-1, 1]) {
            x.beginPath(); x.moveTo(l.ft.x + sd * 20 + d * (40 + 50 * e), 30 - 18 * e); x.lineTo(l.ft.x + sd * 20 + d * (70 + 70 * e), 18 - 36 * e); x.stroke()
          }
          x.fillStyle = rgba('#d9c3a0', 0.35 * (1 - p))
          x.beginPath(); x.ellipse(l.ft.x + sd * 20, 26, 60 + 70 * e, 16 + 14 * e, 0, 0, Math.PI * 2); x.fill()
          x.restore()
        }
      }
    }
    x.restore()
    return { headTop: GROUND + (-(510 + 50)) * s * k * squash + bob * s * k }
  }

  function drawFence(t, k) {
    if (k <= 0) return
    x.save(); x.globalAlpha = 0.55 * k
    glowStroke(x, mixHex(TAN, BONE, 0.3), 10, 10)
    for (const y of [GROUND - 250, GROUND - 140]) { x.beginPath(); x.moveTo(-20, y); x.lineTo(1100, y + 6); x.stroke() }
    for (let px = 40; px < 1080; px += 250) { x.beginPath(); x.moveTo(px, GROUND - 300); x.lineTo(px, GROUND + 20); x.stroke() }
    x.restore()
    // dirt
    x.save(); x.globalAlpha = k
    const g = x.createLinearGradient(0, GROUND - 10, 0, 1920); g.addColorStop(0, rgba('#5a3a2a', 0.85)); g.addColorStop(1, rgba('#2a1830', 0.9))
    x.fillStyle = g; x.fillRect(0, GROUND + 10, 1080, 1920 - GROUND)
    glowStroke(x, rgba(BONE, 0.8), 6, 10); x.beginPath(); x.moveTo(0, GROUND + 10); x.lineTo(1080, GROUND + 10); x.stroke()
    x.restore()
  }

  function drawPosse(t) {
    if (t > T.peopleOut + 0.6) return
    const fenceK = ease.outCubic(prog(t, 0.05, 0.45)) * (1 - ease.inCubic(prog(t, T.peopleOut, T.peopleOut + 0.4)))
    drawFence(t, fenceK)
    const shrugK = ease.outBack(prog(t, T.shrug, T.shrug + 0.3))
    FOLK.forEach((f, i) => {
      const k = pop01(t, 0.08 + i * 0.05, 0.42) * outScale(t, T.peopleOut + i * 0.05, 0.3)
      if (k <= 0) return
      const g = drawPerson(f, i, t, k, shrugK)
      // the hat: drops from above onto the head, squash on landing; later flies off spinning
      const h0 = hatK(i)
      if (t < h0 - 0.3) return
      const fall = prog(t, h0 - 0.3, h0)
      const flyAt = T.fly + ORDER.indexOf(i) * 0.06, fp = prog(t, flyAt, flyAt + 0.75)
      let hx = f.x, hy = g.headTop + 22 * f.s * k - (1 - ease.inQuad(fall)) * 420, rot = (1 - fall) * (i % 2 ? 20 : -20)
      const since = t - h0
      let sx = 1, sy = 1
      if (since > 0 && since < 0.3) { const q = Math.sin(Math.PI * since / 0.3) * Math.exp(-since * 4); sx = 1 + 0.22 * q; sy = 1 - 0.2 * q }
      if (fp > 0) {
        const e = ease.inQuad(fp), dir = (i - 2) || (i % 2 ? 1 : -1)
        hy -= 1500 * e - 240 * Math.sin(Math.PI * Math.min(1, fp * 1.6)) * (1 - fp); hx += dir * 160 * fp; rot += (dir > 0 ? 1 : -1) * 600 * e
      }
      if (fp >= 1) return
      x.save(); x.translate(hx, hy); x.rotate(rot * D2R); x.scale(sx * f.s * k, sy * f.s * k)
      x.globalAlpha = clamp(fall * 4)
      drawHat(x, f.hat, 1)
      x.restore()
      drawBurst(x, B_HAT[i], f.x, g.headTop - 20, t, h0, f.hat, 0.6)
    })
    // even the moon
    const m = SKY_H.moon
    if (t > MOON_HAT - 0.32) {
      const fall = prog(t, MOON_HAT - 0.32, MOON_HAT), since = t - MOON_HAT
      const fp = prog(t, T.fly + 0.32, T.fly + 1.0)
      const tip = since > 0 ? 14 * Math.sin(since * 9) * Math.exp(-since * 3) : 0
      x.save(); x.translate(m.x - 6, m.y - m.r + 10 - (1 - ease.inQuad(fall)) * 260 - 1200 * ease.inQuad(fp)); x.rotate((-14 + tip + 500 * ease.inQuad(fp)) * D2R)
      x.globalAlpha = clamp(fall * 4); drawHat(x, TAN, 0.62)
      x.restore()
      drawBurst(x, B_MOON, m.x, m.y - 30, t, MOON_HAT, GOLD, 0.6)
    }
    drawBurst(x, B_HOOK, 540, 640, t, T.hookLast + 0.1, GOLD, 0.7)
  }

  // ── 3: the mystery card on its aura, a ring of zodiac glyphs around it; a lone hat lands and is shrugged off
  const CARD = { cx: 540, cy: 1060, h: 960 }
  function drawMystery(t) {
    if (t < T.card || t > T.cardOut + 0.5) return
    const out = outScale(t, T.cardOut, 0.36)
    if (out <= 0) return
    const dp = prog(t, T.card, T.land)
    const y = lerp(-700, CARD.cy, easeOutBack(dp, 1.4)) + 10 * Math.sin((t - T.land) * 2.2) * clamp((t - T.land) * 2)
    const sinceLand = t - T.land
    const squash = sinceLand > 0 && sinceLand < 0.35 ? 1 - 0.09 * Math.sin(Math.PI * sinceLand / 0.35) : 1
    const sinceHat = t - T.hatLand, sinceFl = t - T.flick
    const hatSquash = sinceHat > 0 && sinceHat < 0.25 ? 1 - 0.04 * Math.sin(Math.PI * sinceHat / 0.25) : 1
    const shake = sinceFl > -0.12 && sinceFl < 0.5 ? 7 * Math.sin((sinceFl + 0.12) * 38) * Math.exp(-Math.max(0, sinceFl + 0.12) * 5) : 0
    // aura glow
    const ak = ease.outCubic(prog(t, T.land - 0.15, T.land + 0.5)) * out
    if (ak > 0) {
      x.save(); x.globalCompositeOperation = 'lighter'
      const R = 620 * (0.85 + 0.15 * ak) * (1 + 0.04 * Math.sin(t * 3))
      const g = x.createRadialGradient(CARD.cx, CARD.cy, 40, CARD.cx, CARD.cy, R)
      g.addColorStop(0, rgba('#ff6fa8', 0.55 * ak)); g.addColorStop(0.4, rgba('#b45cf0', 0.24 * ak)); g.addColorStop(1, rgba('#7c74f0', 0))
      x.fillStyle = g; x.beginPath(); x.arc(CARD.cx, CARD.cy, R, 0, Math.PI * 2); x.fill()
      x.translate(CARD.cx, CARD.cy); x.rotate(t * 0.25)
      for (let i = 0; i < 12; i++) {
        x.rotate(Math.PI / 6)
        const rg = x.createLinearGradient(0, 0, 0, -760); rg.addColorStop(0, rgba(GOLD, 0.16 * ak)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-18, 0); x.lineTo(-70, -760); x.lineTo(70, -760); x.lineTo(18, 0); x.fill()
      }
      x.restore()
    }
    // ring of glyphs
    const RR = 440
    const ringK = ease.outCubic(prog(t, T.ring, T.ring + 0.5)) * out
    if (ringK > 0) { x.save(); glowStroke(x, BONE, 3, 10); x.globalAlpha = 0.45 * ringK; x.beginPath(); x.arc(CARD.cx, CARD.cy, RR, 0, Math.PI * 2); x.stroke(); x.restore() }
    x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `bold 66px ${GLYPH_FONT}`
    SIGNS.forEach((s, i) => {
      const k = pop01(t, T.ring + i * 0.045, 0.36) * out
      if (k <= 0) return
      const a = (i * 30 + 15) * D2R + t * 0.18
      const px = CARD.cx + Math.cos(a) * RR, py = CARD.cy + Math.sin(a) * RR
      x.save(); x.translate(px, py); x.scale(k, k); x.globalAlpha = clamp(k * 2)
      x.shadowColor = s.color; x.shadowBlur = 22; x.fillStyle = s.color; x.fillText(s.glyph + '︎', 0, 0); x.restore()
    })
    x.restore()
    // the card
    let topY = y - CARD.h / 2
    if (cardBmp) {
      const h = CARD.h * out, w = h * cardBmp.width / cardBmp.height
      x.save(); x.translate(CARD.cx, y - (1 - out) * 200 + CARD.h / 2); x.rotate((lerp(-14, 0, ease.outCubic(dp)) + shake) * D2R + (1 - out) * 0.2)
      x.scale(1 / (squash * hatSquash), squash * hatSquash); x.translate(0, -CARD.h / 2); x.globalAlpha = clamp(out * 2)
      x.drawImage(cardBmp, -w / 2, -h / 2, w, h)
      x.restore()
      topY = y - h / 2
    }
    drawBurst(x, B_LAND, CARD.cx, CARD.cy, t, T.land, GOLD, 0.9)
    // the lone hat: falls onto the card's top edge, wobbles, then gets flicked off spinning (no costumes)
    if (t > T.hat && t < T.flick + 0.9) {
      const fall = prog(t, T.hat, T.hatLand), fp = prog(t, T.flick, T.flick + 0.8)
      const settle = sinceHat > 0 ? 10 * Math.sin(sinceHat * 12) * Math.exp(-sinceHat * 4) : 0
      const hx = CARD.cx + 40 + 520 * ease.outCubic(fp)
      const hy = lerp(-160, topY + 4, ease.inQuad(fall))
      const hy2 = fp > 0 ? topY + 4 - 300 * Math.sin(Math.PI * fp * 0.9) + 1100 * fp * fp : hy
      x.save(); x.translate(hx, fp > 0 ? hy2 : hy); x.rotate((8 + settle + 720 * ease.outCubic(fp)) * D2R)
      x.globalAlpha = clamp(fall * 4) * (1 - prog(fp, 0.7, 1)); drawHat(x, TAN, 1.25)
      x.restore()
    }
    drawBurst(x, B_FLICK, CARD.cx + 60, topY - 30, t, T.flick + 0.02, RED, 0.6)
  }

  // ── 4: the lasso — spins above, drops, cinches round a big star (the real thing)
  const ST = { x: 540, y: 1120, R: 180 }
  function drawLasso(t) {
    if (t < T.find || t > T.lassoOut + 0.5) return
    const out = outScale(t, T.lassoOut, 0.36)
    if (out <= 0) return
    const sk = pop01(t, T.star, 0.45) * out
    const cin = t - T.cinch
    const thump = cin > 0 && cin < 0.4 ? 1 - 0.12 * Math.sin(Math.PI * cin / 0.4) : 1
    // the star's glow + slow rays (behind everything)
    if (sk > 0) {
      x.save(); x.translate(ST.x, ST.y); x.globalCompositeOperation = 'lighter'
      const gk = (0.6 + 0.4 * ease.outCubic(prog(t, T.cinch, T.cinch + 0.3))) * sk
      const g = x.createRadialGradient(0, 0, 20, 0, 0, 520); g.addColorStop(0, rgba(GOLD, 0.5 * gk)); g.addColorStop(0.5, rgba('#ff8fb1', 0.16 * gk)); g.addColorStop(1, rgba(GOLD, 0))
      x.fillStyle = g; x.beginPath(); x.arc(0, 0, 520, 0, Math.PI * 2); x.fill()
      x.rotate(t * 0.3)
      for (let i = 0; i < 10; i++) {
        x.rotate(Math.PI / 5)
        const rg = x.createLinearGradient(0, 0, 0, -620); rg.addColorStop(0, rgba(GOLD, 0.18 * gk)); rg.addColorStop(1, rgba(GOLD, 0))
        x.fillStyle = rg; x.beginPath(); x.moveTo(-14, 0); x.lineTo(-56, -620); x.lineTo(56, -620); x.lineTo(14, 0); x.fill()
      }
      x.restore()
    }
    const drawStar = () => {
      if (sk <= 0) return
      x.save(); x.translate(ST.x, ST.y + 6 * Math.sin(t * 2.4)); x.scale(sk * thump, sk / thump); x.rotate(4 * Math.sin(t * 1.7) * D2R)
      starPath(x, ST.R); x.fillStyle = GOLD; x.shadowColor = GOLD; x.shadowBlur = 50; x.fill()
      glowStroke(x, BONE, 9, 18); x.stroke(); x.shadowBlur = 0
      starPath(x, ST.R * 0.52); x.fillStyle = mixHex(GOLD, '#fff6d8', 0.6); x.fill()
      x.restore()
    }
    // the loop: spins overhead (seen in perspective: a flat ellipse), then is tossed down over the star and cinches
    const lk = pop01(t, T.find + 0.08, 0.4) * out
    if (lk <= 0) { drawStar(); drawBurst(x, B_STAR, ST.x, ST.y, t, T.star + 0.12, GOLD, 0.7); return }
    const toss = ease.inOutCubic(prog(t, T.toss, T.cinch)), cinch = easeOutBack(prog(t, T.cinch, T.cinch + 0.3), 2.2)
    const lcx = lerp(540, ST.x, toss), lcy = lerp(760, ST.y + 70, toss) + (1 - toss) * 18 * Math.sin(t * 9)
    const rx = lerp(260, 250, toss) * lerp(1, 0.6, cinch) * lk, ry = lerp(64, 70, toss) * lerp(1, 0.75, cinch) * lk
    const spin = t * 13 * (1 - toss * 0.8)
    const knotA = Math.PI * 0.5 + (1 - toss) * Math.sin(spin) * 0.9 + (1 - toss) * spin   // where the rope joins the loop
    const kx = lcx + Math.cos(knotA) * rx, ky = lcy + Math.sin(knotA) * ry
    const ROPE = '#e9c27a'
    const ropeStroke = (path) => {
      x.save(); glowStroke(x, ROPE, 13, 16); x.globalAlpha = clamp(lk * 2); path(); x.stroke()
      x.shadowBlur = 0; x.strokeStyle = rgba('#7a4e22', 0.8); x.lineWidth = 5; x.setLineDash([10, 16]); x.lineDashOffset = -t * 60; path(); x.stroke()
      x.restore()
    }
    const sag = 1 - 0.6 * cinch
    // rope from the bottom-right corner (a thrower off-screen) to the knot, and the loop's back half: behind the star
    ropeStroke(() => { x.beginPath(); x.moveTo(1140, 2000); x.quadraticCurveTo(lerp(980, 900, toss), lerp(1260, 1700, toss) + 140 * sag, kx, ky) })
    const half = (a0, a1) => () => { x.beginPath(); x.ellipse(lcx, lcy, rx, ry, -0.06 * (1 - toss), a0, a1) }
    ropeStroke(half(Math.PI, Math.PI * 2))
    drawStar()
    drawBurst(x, B_STAR, ST.x, ST.y, t, T.star + 0.12, GOLD, 0.7)
    // front half over it, then the knot
    ropeStroke(half(0, Math.PI))
    x.save(); x.fillStyle = ROPE; x.shadowColor = ROPE; x.shadowBlur = 14; x.globalAlpha = clamp(lk * 2); x.beginPath(); x.arc(kx, ky, 15, 0, Math.PI * 2); x.fill(); x.restore()
    drawBurst(x, B_CINCH, ST.x, ST.y, t, T.cinch, GOLD, 0.9)
    drawBurst(x, B_REAL, 540, 520, t, T.findLast + 0.1, GOLD, 0.7)
  }

  return {
    start: 0, end: END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < SETTLE) { drawPosse(t); drawMystery(t); drawLasso(t) }
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.2)))
      for (const [h, o] of TEXTS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif cuts, just before each new headline:
//   3.26 hook type out (3.28) → "Want someone real?" (3.32) as the hats are about to fly
//   5.13 people popped away + head out (5.18) → the mystery card drops in (5.2)
//   8.30 card + glyph ring out (8.28) → the lasso, "Find the real thing." (8.36) · end card flips at 10.6
const CUTS = [{ t: 3.26, kind: 'flip' }, { t: 5.13, kind: 'deal' }, { t: 8.3, kind: 'fan' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: END }), cardFrame({ start: 0, end: END }), cardCuts(CUTS)]

// ── cues (A major pentatonic pops on the 108 bpm grid; the funk score is arranged by the style engine)
const NOTE = [440, 493.88, 554.37, 659.25, 739.99, 880, 987.77, 1108.73]
const r3 = v => +v.toFixed(3)
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const STOMPS = []
for (let n = 0; ; n++) { const tb = beat(n); if (tb < STOMP_FROM - 0.01) continue; if (tb >= STOMP_TO) break; STOMPS.push(tb) }
export const CUES = [
  // hook
  ...wordPops(T.rodeo, 2, 0.09, 0),
  ...wordPops(T.hook, 3, 0.12, 2),
  ['pop', T.hookLast, 659.25, 0.06, 0], ['pluck', T.hookLast, 329.63, 0.05, 0.6, 0],
  ...HAT_AT.map((h, j) => ['pop', r3(h), NOTE[j + 1], 0.055, (FOLK[ORDER[j]].x - 540) / 600]),
  ...HAT_AT.map((h, j) => ['pluck', r3(h + 0.01), NOTE[j + 2] / 2, 0.03, 0.3, (FOLK[ORDER[j]].x - 540) / 600]),
  ['pop', MOON_HAT, 1318.51, 0.05, 0.6], ['bell', MOON_HAT + 0.03, 1760, 0.03, 1.2, 0.6], ['glitter', MOON_HAT, MOON_HAT + 0.5],
  ...STOMPS.map((s, j) => ['tick', r3(s), 0.045 + (j % 2) * 0.01]),
  // want someone real?
  ...wordPops(T.want, 2, 0.08, 3),
  ['pop', T.wantLast, 880, 0.06, 0], ['bell', T.wantLast + 0.03, 1318.51, 0.035, 1.2, 0],
  ...[0, 1, 2, 3, 4].map(j => ['whoosh', r3(T.fly + j * 0.06), 0.3, 0.028]),
  ['whoosh', r3(T.fly + 0.32), 0.45, 0.03],
  ['whoosh', T.peopleOut, 0.35, 0.03],
  // the turn
  ['whoosh', T.card, 0.42, 0.045],
  ['pop', T.land, 440, 0.07, 0], ['pluck', T.land, 880, 0.055, 0.8, 0], ['bell', T.land + 0.05, 1108.73, 0.04, 1.6, 0], ['glitter', T.land, T.land + 0.7],
  ...wordPops(T.chart, 4, 0.09, 1, 0.026),
  ...SIGNS.map((_, i) => ['pop', r3(T.ring + i * 0.045), NOTE[i % NOTE.length] * 1.5, 0.016, (i % 2 ? 0.25 : -0.25)]),
  ['whoosh', T.hat, 0.3, 0.03], ['pop', T.hatLand, 554.37, 0.05, 0.1], ['tick', T.hatLand, 0.04],
  ['whoosh', T.flick, 0.4, 0.04], ['pluck', T.flick, 659.25, 0.05, 0.5, 0.3],
  ...wordPops(T.costumes, 2, 0.1, 4, 0.03),
  ['whoosh', T.cardOut, 0.45, 0.04],
  // find the real thing
  ['riser', 7.7, T.cinch, 0.045],
  ...wordPops(T.find, 2, 0.1, 2),
  ['pop', T.findLast, 880, 0.06, 0],
  ['pop', T.star, 659.25, 0.05, 0], ['bell', T.star + 0.05, 1318.51, 0.03, 1.2, 0],
  ...[0, 1, 2].map(j => ['whoosh', r3(T.find + 0.12 + j * 0.2), 0.18, 0.022]),
  ['whoosh', T.toss, 0.32, 0.04],
  ['pluck', T.cinch, 440, 0.06, 0.9, 0], ['bell', T.cinch, 880, 0.05, 2.0, -0.2], ['bell', T.cinch + 0.06, 1108.73, 0.045, 2.0, 0], ['bell', T.cinch + 0.12, 1318.51, 0.045, 2.0, 0.2],
  ['glitter', T.cinch, T.cinch + 0.8],
  ['whoosh', T.lassoOut, 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(END),
]
