// srl04deck (20 s vertical, Star Talk Remix of the L04 "Deck" loop) · story 0–15.6, then the shared end card.
// The loop's image: an endless 3D carousel of veiled mystery cards, stepping one card every two beats.
//   0.00–5.20  "A new deck | *every night.*"  The carousel steps round on the beat. A tiny ♈ Aries star (Mars: zero patience) is riding
//              the top of one card like a carousel horse, round and round, eyes rolling (dizzy). THE STARS pops in
//              bottom right: "tonight's deck. one card at a *time.*"
//   5.20–8.00  "Next. Next. | *NEXT.*"  Aries (squinting, hopping): "faster! next! NEXT! NEXT!!" and the carousel
//              spins up into a blur, like a thumb on a swipe stack / a slot machine.
//   8.00–11.9  "Not a | *slot machine.*"  THE STARS hops: the carousel screeches to a stop (overshoot), Aries is
//              flung off, tumbles and splats down bottom left. THE STARS: "babe. one card. *read it.*" The card in front
//              glows gold; Aries looks, reads… heart-eyes.
//  12.05 cut → "Every night, | we *deal again.*"  The carousel steps calmly again, Aries heart-eyed, THE STARS winks.
//              Everything pops out by 15.5; the end card takes over at 15.6.
// Layers: sky + under-glow canvas → the DOM card ring → a foreground canvas (stars) → type → box → grain. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GOLD = '#f2c75c', BONE = '#efe6d6', PINK = '#ff8fb1'
const GEM = signStar('aries')
const TAU = Math.PI * 2
const BEAT = 60 / 108
const STEP = 2 * BEAT                           // one card every two beats

// ── the timeline (beat grid 0.6 + n·0.5556)
const T = {
  h0: 0.15, h0Land: 0.62, h0Out: [4.95, 5.15],
  steps1: [0.6, 1.711, 2.822, 3.933],           // the calm carousel, one card per two beats
  stars: 1.45, open: 1.7, l1: 1.9,
  h1: 5.25, h1Land: 6.4, h1Out: [7.82, 7.98], l2: 5.4,
  spin: [5.4, 6.6], brake: 8.0, brakeLen: 0.42, land: 8.55,
  h2: 8.1, h2Land: 8.5, h2Out: [11.72, 11.92], l3: 8.85,
  glow: 9.9, heart: 10.5, close: 11.7,
  cut: 12.05,
  h3: 12.1, h3Land: 12.62, steps3: [12.15, 13.261, 14.372], wink: [13.6, 14.0],
  h3Out: [15.2, 15.45], out: [15.05, 15.5],
}
const SKY = 'THE STARS', GEMT = '♈ ARIES STAR'
const LINES = [
  { t: T.l1, speaker: SKY, text: "tonight's deck. one card at a *time.*", color: GOLD },
  { t: T.l2, speaker: GEMT, text: 'faster! next! NEXT! *NEXT!!*', color: GEM.color },
  { t: T.l3, speaker: SKY, text: 'babe. one card. *read it.*', color: GOLD },
]
const CPS = 30
const SKY_HOPS = talkHops(LINES, SKY, { cps: CPS })
const GEM_HOPS = talkHops(LINES, GEMT, { cps: CPS, gap: 0.22 })

// ── the carousel (after the L04 loop): 8 cards on a tilted ring
const N = 8, D = TAU / N
const CW = 300, CH = Math.round(300 * 2238 / 1496)
const R = 400, PCAM = 1800, TILT = 0.38, CX = 540, CY = 820
const WMAX = TAU * 1.25                         // full whirl: 1.25 turns a second
const stepE = fr => { const p = clamp(fr / 0.6); return p >= 1 ? 1 : ease.outBack(p) * 0.9 + ease.outCubic(p) * 0.1 }
const stepsDone = (t, list) => list.reduce((a, s) => a + stepE((t - s) / STEP), 0)
const R1 = T.steps1.length * D                  // rest after the calm steps
const spinAngle = t => {                        // integral of the whirl's angular speed from T.spin[0]
  const [a, b] = T.spin, L = b - a
  if (t <= a) return 0
  if (t <= b) return WMAX * (t - a) ** 3 / (3 * L * L)
  return WMAX * L / 3 + WMAX * (t - b)
}
const ROT_B = R1 + spinAngle(T.brake)
const ROT_REST = (Math.ceil(ROT_B / D) + 1) * D  // the brake lands exactly on a card
function ringRot(t) {
  if (t < T.spin[0]) return stepsDone(t, T.steps1) * D
  if (t < T.brake) return R1 + spinAngle(t)
  if (t < T.steps3[0]) return lerp(ROT_B, ROT_REST, easeOutBack(prog(t, T.brake, T.brake + T.brakeLen), 2.4))
  return ROT_REST + stepsDone(t, T.steps3) * D
}
const ringSpeed = t => t < T.spin[0] || t >= T.brake ? 0 : WMAX * ease.inQuad(prog(t, ...T.spin))
const mod = (a, n) => ((a % n) + n) % n
const FRONT_REST = mod(Math.round(ROT_REST / D), N)
// faces, placed so the card that stops in front after the brake is a profile card ("read it")
const FACES = ['card-profile-1', 'card-talk-1', 'card-profile-2', 'card-event', 'card-profile-3', 'card-talk-daily', 'card-profile-4', 'card-profile-5']
const AURA = { 'card-profile-1': '#ff5caa', 'card-talk-1': '#d6aaff', 'card-profile-2': '#ff963c', 'card-event': '#ff5a82', 'card-profile-3': '#aa78ff', 'card-talk-daily': '#8ce678', 'card-profile-4': '#5ac8ff', 'card-profile-5': '#ff78c8' }
const DECK = Array.from({ length: N }, (_, i) => FACES[mod(i - FRONT_REST, N)])
const ARI_CARD = 2                              // the card Aries rides
function proj(ang) {
  const x = R * Math.sin(ang), z = R * Math.cos(ang)
  const s = PCAM / (PCAM - z)
  return { x: CX + x * s, y: CY + z * TILT * s, z, s }
}

// ── cast layout
const SKYSTAR = { x: 860, y: 1372, size: 220 }
const GLAND = { x: 236, y: 1392, size: 190 }

const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})` }

/** Aries's spot: riding the top of its card (z = depth), or flung off at the brake, or sitting where it landed */
function gemPos(t) {
  if (t < T.brake) {
    const p = proj(D * ARI_CARD - ringRot(t))
    const size = 150 * p.s
    return { x: p.x, y: p.y - (CH / 2) * p.s - size * 0.34, size, z: p.z, ride: true }
  }
  const p0 = gemPos(T.brake - 1e-4)
  const k = prog(t, T.brake, T.land)
  if (k >= 1) return { x: GLAND.x, y: GLAND.y, size: GLAND.size, z: 999, ride: false }
  const e = ease.inOutQuad(k)
  return { x: lerp(p0.x, GLAND.x, e), y: lerp(p0.y, GLAND.y, k) - Math.sin(Math.PI * k) * 380, size: lerp(p0.size, GLAND.size, k), z: 999, ride: false, spin: k * TAU * 1.5 }
}

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const uc = layerCanvas(root), u = uc.getContext('2d')
  // the ring of DOM cards (own stacking context so the foreground canvas stays on top)
  const ring = el('div', { position: 'absolute', left: 0, top: 0, width: '1080px', height: '1920px', zIndex: '0' }, root)
  const cards = DECK.map(face => {
    const w = el('div', { position: 'absolute', left: 0, top: 0, width: CW + 'px', height: CH + 'px', willChange: 'transform, filter' }, ring)
    const mk = src => { const i = el('img', { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', objectFit: 'contain' }, w); i.src = A + src + '.png'; i.decoding = 'sync'; return i }
    return { w, back: mk('card-back'), front: mk(face), face }
  })
  const fc = layerCanvas(root), x = fc.getContext('2d')

  const H0 = popText(root, 'A new deck | *every night.*', { top: 150, size: 112, accentSize: 150, at: T.h0, late: 2, lateAt: T.h0Land, wobble: true, gap: 0.09 })
  const H1 = popText(root, 'Next. Next. | *NEXT.*', { top: 150, size: 118, accentSize: 190, at: T.h1, gap: 0.55, late: 1, lateAt: T.h1Land, wobble: true, accentColor: GEM.color })
  const H2 = popText(root, 'Not a | *slot machine.*', { top: 150, size: 112, accentSize: 156, at: T.h2, late: 2, lateAt: T.h2Land, wobble: true, gap: 0.1 })
  const H3 = popText(root, 'Every night, | we *deal again.*', { top: 150, size: 108, accentSize: 150, at: T.h3, late: 2, lateAt: T.h3Land, wobble: true, gap: 0.09 })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1505, width: 960, height: 280, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(c, t, cx, cy, t0, n, Rr, seed, cols = [GOLD, BONE, PINK, GEM.color]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    c.save(); c.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * TAU + seed
      drawPixelStar(c, cx + Math.cos(a) * Rr * (0.7 + 0.5 * p), cy + Math.sin(a) * Rr * (0.7 + 0.5 * p), 24 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    c.restore()
  }

  // aura behind whichever card faces us, a gold spotlight on the resting card while Aries reads it
  function drawUnder(t, rot, ok) {
    const spd = ringSpeed(t) / WMAX
    // the ring's track + gold dust riding it
    if (ok <= 0) return
    u.save(); u.globalCompositeOperation = 'screen'; u.globalAlpha = ok
    const rx = R * 1.18, ry = R * TILT * 1.18 + 26
    u.strokeStyle = rgba(GOLD, 0.12 + 0.25 * spd); u.lineWidth = 10
    u.beginPath(); u.ellipse(CX, CY + 10, rx, ry, 0, 0, TAU); u.stroke()
    u.strokeStyle = rgba('#ffdca0', 0.45); u.lineWidth = 1.5
    u.beginPath(); u.ellipse(CX, CY + 10, rx, ry, 0, 0, TAU); u.stroke()
    for (let i = 0; i < 40; i++) {
      const a = i * 2.39996 + rot * (1 + (i % 3) * 0.2)
      const z = Math.cos(a)
      u.globalAlpha = ok * (0.3 + 0.5 * (0.5 + 0.5 * Math.sin(t * 4 + i))) * (0.4 + 0.6 * (z + 1) / 2)
      u.fillStyle = i % 3 ? GOLD : PINK
      u.fillRect(Math.round(CX + Math.sin(a) * rx - 2), Math.round(CY + 10 + z * ry - 2), 4 + (i % 2) * 2, 4 + (i % 2) * 2)
    }
    u.restore()
    cards.forEach((c, i) => {
      const ang = D * i - rot, f = Math.max(0, Math.cos(ang)) ** 6
      if (f < 0.01) return
      const p = proj(ang)
      const beatK = Math.exp(-((t - 0.6) % BEAT) * 6)
      const read = (t > T.glow && t < T.cut) ? 0.5 * ease.outCubic(prog(t, T.glow, T.glow + 0.5)) : 0
      const rad = (400 + 40 * beatK) * p.s
      const col = read > 0 ? GOLD : AURA[c.face]
      const g = u.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
      const a = f * (0.4 + 0.2 * beatK + read) * ok
      g.addColorStop(0, rgba(col, Math.min(1, a))); g.addColorStop(0.45, rgba(col, a * 0.45)); g.addColorStop(1, rgba(col, 0))
      u.save(); u.globalCompositeOperation = 'screen'; u.fillStyle = g
      u.beginPath(); u.ellipse(p.x, p.y, rad * 0.95, rad * 1.2, 0, 0, TAU); u.fill(); u.restore()
    })
  }

  function placeCards(t, rot, ok) {
    const spd = ringSpeed(t) / WMAX
    ring.style.opacity = String(ok)
    ring.style.display = ok <= 0 ? 'none' : 'block'
    cards.forEach((c, i) => {
      const ang = D * i - rot
      const p = proj(ang)
      const facing = Math.cos(ang) >= 0
      const deg = (ang * 180 / Math.PI) % 360
      // the resting card lifts a touch while it's being read
      const lift = (i === FRONT_REST && t > T.glow && t < T.cut) ? easeOutBack(prog(t, T.glow, T.glow + 0.45), 2) * 0.06 : 0
      const s = p.s * (1 + lift)
      c.front.style.display = facing ? 'block' : 'none'
      c.back.style.display = facing ? 'none' : 'block'
      c.w.style.transform = `translate(${(p.x - CW / 2).toFixed(1)}px, ${(p.y - CH / 2 - lift * 260).toFixed(1)}px) scale(${s.toFixed(4)}) perspective(1100px) rotateY(${(facing ? deg : deg + 180).toFixed(2)}deg)`
      c.w.style.zIndex = String(Math.round(p.z + R + 10))
      const depth = (p.z + R) / (2 * R)
      const blur = Math.max(0, 0.5 - depth) * 4 + spd * 7
      c.w.style.filter = `brightness(${(0.6 + 0.4 * depth ** 1.4 + lift * 3).toFixed(3)}) saturate(${(0.7 + 0.3 * depth).toFixed(3)}) blur(${blur.toFixed(2)}px)`
    })
  }

  function gemState(t) {
    if (t < T.l2 - 0.1) return { mood: 'eyeroll', blink: false }          // dizzy from the ride
    if (t < T.brake) return { mood: t < T.spin[1] ? 'squint' : 'heart', blink: false } // more! more!
    if (t < T.land + 0.6) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < T.glow + 0.3) return { mood: 'neutral', look: [1, -1] }          // sheepish glance up at the boss star
    if (t < T.heart) return { mood: 'squint', look: [1, -1], blink: false }  // reading…
    return { mood: 'heart', look: [1, -1] }
  }
  function skyState(t) {
    if (t < T.l2) return { mood: 'happy' }
    if (t < T.brake - 0.25) return { mood: 'wide', look: [-1, -1], blink: false }      // watching the whirl
    if (t < T.brake + 0.3) return { mood: 'squint', look: [-1, -1], blink: false }     // brake!
    if (t < T.cut) return { mood: 'neutral', look: [-1, 0] }
    if (t >= T.wink[0] && t < T.wink[1]) return { mood: 'wink', look: [0, 0] }
    return { mood: 'happy', look: [0, 0] }
  }

  function drawGem(c, t, gp, ok) {
    const st = gemState(t)
    let sq = 0
    if (gp.ride && t > T.spin[0]) sq += 0.05 * Math.sin(t * 40)
    const lk = t - T.land
    if (lk > 0 && lk < 0.7) sq += 0.32 * Math.exp(-lk * 6) * Math.cos(lk * 20)
    const pk = ok
    c.save()
    c.translate(gp.x, gp.y)
    if (gp.spin) c.rotate(gp.spin)
    else if (gp.ride && t < T.l2) c.rotate(0.18 * Math.sin(t * 3.2))     // wobbly carousel-horse sway
    drawStarChar(c, 0, 0, gp.size, t, { color: GEM.color, glyph: gp.size > 130 ? GEM.glyph : null, ...st, pop: pk, squash: sq, bob: gp.ride ? 4 : 6, hops: gp.ride ? GEM_HOPS : null, seed: 3 })
    c.restore()
    // dizzy pixel swirl over its head while it rides
    if (gp.ride && t < T.l2) {
      for (let i = 0; i < 3; i++) {
        const a = t * 5 + i * TAU / 3
        drawPixelStar(c, gp.x + Math.cos(a) * gp.size * 0.42, gp.y - gp.size * 0.62 + Math.sin(a) * gp.size * 0.12, 14, 2, i ? GOLD : BONE)
      }
    }
    // splat dust on landing
    if (lk > 0 && lk < 0.5) {
      c.save(); c.globalAlpha = 1 - lk / 0.5
      for (let i = 0; i < 6; i++) {
        const side = i % 2 ? 1 : -1, r = 10 + lk * 50
        c.fillStyle = i % 3 ? 'rgba(239,230,214,0.7)' : 'rgba(242,199,92,0.6)'
        c.fillRect(Math.round(GLAND.x + side * (60 + i * 18 + lk * 140) - r), Math.round(GLAND.y + 80 - lk * 30 - (i % 3) * 10 - r), Math.round(2 * r), Math.round(2 * r))
      }
      c.restore()
    }
  }

  function floatHearts(t, cx, cy, t0, t1) {
    const HEART = ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..']
    for (let i = 0; i < 9; i++) {
      const born = t0 + i * 0.3, life = 1.6
      if (t < born || born > t1) continue
      const p = (t - born) / life
      if (p >= 1) continue
      const hx = cx + ((i * 37) % 7 / 6 - 0.5) * 220 + Math.sin(p * 4 + i) * 14, hy = cy - 60 - p * 220
      const cell = 8 * (0.7 + 0.5 * Math.sin(Math.PI * Math.min(1, p * 1.6)))
      x.save(); x.globalAlpha = Math.sin(Math.PI * p)
      HEART.forEach((row, j) => [...row].forEach((ch, k) => { if (ch === 'H') { x.fillStyle = j === 1 && k === 1 ? '#ffd1de' : '#ff4f6e'; x.fillRect(Math.round(hx + (k - 2.5) * cell), Math.round(hy + (j - 2.5) * cell), Math.ceil(cell), Math.ceil(cell)) } }))
      x.restore()
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const shake = t > T.brake && t < T.brake + 0.35 ? Math.round(Math.sin(t * 90) * 6 * (1 - prog(t, T.brake, T.brake + 0.35))) : 0
      drawSky(u, t, t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-24, 0, ss) } : { ...SKY_H, dx: shake })
      const ok = popOut(t, T.out)
      const rot = ringRot(t)
      drawUnder(t, rot, ok)
      placeCards(t, rot, ok)
      x.clearRect(0, 0, 1080, 1920)
      // whirl streaks while it spins
      const spd = ringSpeed(t) / WMAX
      if (spd > 0.05) {
        x.save(); x.globalAlpha = 0.5 * spd
        for (let i = 0; i < 9; i++) {
          const a = -t * 9 + i * TAU / 9, rx = R * 1.32, ry = R * TILT * 1.32 + 40
          x.strokeStyle = i % 2 ? BONE : GOLD; x.lineWidth = 6
          x.beginPath(); x.ellipse(CX, CY + 10, rx, ry, 0, a, a + 0.5); x.stroke()
        }
        x.restore()
      }
      // Aries: drawn under the ring when its card is behind, else on top
      const gp = gemPos(t)
      if (ok > 0) {
        if (gp.z < 0) drawGem(u, t, gp, ok)
        else drawGem(x, t, gp, ok)
      }
      // brake: a screech burst at the front of the ring
      const bk = t - T.brake
      if (bk > 0 && bk < 0.45) {
        x.save(); x.globalAlpha = 1 - bk / 0.45
        for (let i = 0; i < 8; i++) {
          const a = -Math.PI / 2 + (i - 3.5) * 0.32, r0 = 360 + bk * 300
          x.fillStyle = i % 2 ? GOLD : BONE
          x.fillRect(Math.round(CX + Math.cos(a) * r0 * 1.2), Math.round(CY + 380 + Math.sin(a) * r0 * 0.25 + 120), 26, 8)
        }
        x.restore()
      }
      // THE STARS, bottom right
      const sk = easeOutBack(prog(t, T.stars, T.stars + 0.4), 2) * ok
      if (sk > 0) {
        let sq = 0
        const bb = t - (T.brake - 0.12)
        if (bb > 0 && bb < 0.6) sq += -0.16 * Math.exp(-bb * 7) * Math.cos(bb * 20)
        drawStarChar(x, SKYSTAR.x, SKYSTAR.y, SKYSTAR.size, t, { color: STAR.sky, ...skyState(t), pop: sk, squash: sq, hops: [...SKY_HOPS, T.brake - 0.12, T.h3Land], seed: 1, glow: 1.1 })
      }
      sparkles(x, t, SKYSTAR.x, SKYSTAR.y, T.stars, 8, 150, 0.5)
      // reading: sparkles round the gold card, then hearts from Aries
      const fp = proj(0)
      sparkles(x, t, fp.x, fp.y - 20, T.glow, 12, 260, 1.2, [GOLD, BONE, '#ffd98a'])
      sparkles(x, t, GLAND.x, GLAND.y, T.heart, 10, 150, 0.3)
      if (t > T.heart && ok > 0) floatHearts(t, GLAND.x, GLAND.y - 40, T.heart + 0.1, T.out[0])
      sparkles(x, t, fp.x, fp.y - 20, T.h3Land, 12, 300, 2.1)
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.2 (the calm ride → the whirl) and 12.05 (box shut → "Every night, we deal again.").
// cardfx keeps one for a 20 s film (12.05). End card flips at 15.6.
const CUTS = [5.2, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const stepCues = list => list.flatMap(s => [['whoosh', +(s + 0.02).toFixed(3), 0.3, 0.035], ['tick', +(s + 0.32).toFixed(3), 0.05]])
export const CUES = [
  // a new deck every night: the calm carousel
  ...wordPops(T.h0, 3, 0.09, 0, 0.024), ['pop', T.h0Land, 1174.66, 0.045, 0], ['pop', T.h0Land + 0.1, 1318.51, 0.04, 0],
  ...stepCues(T.steps1),
  ['pop', T.stars, 880, 0.035, 0.3], ['glitter', T.stars, T.stars + 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [GEMT]: 987.77 } }),
  // next next NEXT: the whirl
  ['pop', T.h1, 880, 0.035, -0.2], ['pop', T.h1 + 0.55, 987.77, 0.035, 0.2], ['pop', T.h1Land, 1318.51, 0.055, 0], ['pluck', T.h1Land, 1174.66, 0.04, 0.4, 0],
  ['riser', T.spin[0], T.brake, 0.07],
  ...Array.from({ length: 10 }, (_, i) => ['tick', +(6.0 + i * 0.2).toFixed(3), 0.035]),
  // the brake, the fling, the splat
  ['boom', T.brake, 0.14], ['tick', T.brake, 0.08], ['whoosh', T.brake + 0.02, 0.5, 0.06], ['pop', T.brake + 0.1, 1318.51, 0.04, -0.3],
  ['boom', T.land, 0.12], ['pop', T.land, 293.66, 0.05, -0.4], ['pop', T.land + 0.08, 220, 0.04, -0.4],
  ...wordPops(T.h2, 2, 0.1, 2, 0.026), ['pop', T.h2Land, 1174.66, 0.05, 0], ['pop', T.h2Land + 0.1, 1318.51, 0.045, 0],
  // read it
  ['glitter', T.glow, T.glow + 0.5], ['bell', T.glow + 0.05, 1318.51, 0.026, 1.4, 0.2],
  ['pluck', T.heart, 1318.51, 0.04, 0.5, -0.3], ['bell', T.heart + 0.05, 1760, 0.02, 1.0, -0.3],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // every night, we deal again
  ...wordPops(T.h3, 3, 0.09, 1, 0.026), ['pop', T.h3Land, 1174.66, 0.05, 0], ['pluck', T.h3Land, 1318.51, 0.045, 0.6, 0], ['glitter', T.h3Land, T.h3Land + 0.45],
  ...stepCues(T.steps3),
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0.3],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
