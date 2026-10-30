// srhtxtraffic (20 s vertical, Star Talk Remix of htxtraffic "An hour on the Katy Freeway…") · story 0–15.6, then the
// shared end card. The ♈ Aries star (the zodiac's least patient driver) sits in a tiny red convertible in a sea of
// brake lights; ♓ Pisces is stuck in the next lane, crying (as always).
//   0.00–4.55  "An hour on the | *Katy Freeway…*"  The overhead sign's clock runs 6:02 → 7:02 PM. Aries honks (BEEP), squints.
//              ARIES: "move. MOVE. i have a *date.*"  Two more honks.
//   4.55–8.40  "…for a date who | just says *“hey.”*"  A giant "hey" bubble pops over the freeway. Silence; crickets.
//              ARIES: "an hour. for *'hey.'*"  All four tyres go flat (womp); Aries droops.  (card cut 8.42)
//   8.42–12.4  "Dealbreakers, | *up front.*"  A DEALBREAKERS card: ✕ ONE-WORD TEXTS, ✕ JUST "HEY" stamp on (the stars nod
//              at each), then a real talk card slides in. THE STARS: "say what matters. then ask something *real.*"
//   12.4–15.4  "Know before | you *drive.*"  The freeway is empty; Aries, tyres fixed, zooms off happy toward the skyline
//              (beep beep), Pisces waves, crying happy. Everything out by 15.42.
// One canvas, DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, stepRect, drawCar, drawRoad, drawGantry, roadY, laneX, VP, RED, BONE, GOLD, PINK, MONO } from './props.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm grid
const ARI = signStar('aries'), PIS = signStar('pisces')
const LILAC = '#c9b8ff'

const T = {
  h0: 0.12, h0Late: 0.62, h0Out: [4.38, 4.54],
  ariIn: 0.35, pisIn: 0.8, clock: [0.6, 4.2],
  honk: [1.25, 3.62, 3.86], open: 1.75, l1: 1.9,
  h1: 4.6, h1Late: 5.12, bubble: 5.1, l2: 5.75, crickets: 6.95, flat: 7.35, h1Out: [8.2, 8.38],
  h2: 8.48, h2Late: 8.82, dcard: [8.5, 8.85], stamps: [BEAT(16) - 0.1, BEAT(17) + 0.05], l3: 9.75, talk: [10.85, 11.3], h2Out: [12.25, 12.42],
  h3: 12.48, h3Late: 12.88, zoom: [13.05, 14.7], beep: [13.0, 13.22],
  close: 13.6, out: [15.0, 15.42], h3Out: [15.2, 15.42],
}
const ARIN = '♈ ARIES STAR', SKYN = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: ARIN, color: '#ff7a6b', text: 'move. MOVE. i have a *date.*' },
  { t: T.l2, speaker: ARIN, color: '#ff7a6b', text: "an hour. for *'hey.'*" },
  { t: T.l3, speaker: SKYN, text: 'say what matters. then ask something *real.*' },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

// cars: the Aries convertible (lane 0), Pisces (lane 1), and the traffic
const AC = { x: 540, y: 1330, w: 330, star: 250 }            // car bottom-centre; star sits in it
const PC = { L: 1, d: 0.7, star: 130 }
const TRAFFIC = []
for (const [L, d, hue] of [[-1, 0.38, '#6b7bd6'], [0, 0.4, '#d6a24a'], [1, 0.41, '#4ab3a8'], [-1, 0.48, '#c060a8'], [0, 0.5, '#7a7fa8'], [1, 0.49, '#d65a5a'],
  [-1, 0.58, '#4a9ad6'], [1, 0.58, '#e0b04a'], [-1, 0.7, '#8a62d6'], [-1, 0.86, '#4ab38a'], [1, 0.92, '#c07a4a']]) TRAFFIC.push({ L, d, hue })
const STAMPS = ['✕ ONE-WORD TEXTS', '✕ JUST "HEY"']

const ARI_HOPS = [T.ariIn + 0.3, ...T.honk, ...talkHops(LINES, ARIN, { cps: CPS }).filter(h => h < T.l2), T.stamps[0] + 0.15, T.stamps[1] + 0.15, T.talk[1], ...T.beep]
const PIS_HOPS = [T.pisIn + 0.3, T.stamps[0] + 0.2, T.stamps[1] + 0.2, T.talk[1] + 0.1, T.h3Late, T.h3Late + 0.6, T.h3Late + 1.2]

function ariState(t) {
  if (t < T.honk[0]) return { mood: 'neutral', look: [0, -1] }
  if (t < T.bubble) return { mood: t > T.l1 && t < T.l1 + 1.6 ? 'squint' : 'squint', look: [0, 0] }
  if (t < T.l2) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.flat) return { mood: 'neutral', look: [0, 0], blink: false }
  if (t < 8.42) return { mood: 'sleepy' }
  if (t < T.stamps[0]) return { mood: 'neutral', look: [1, -1] }
  if (t < T.talk[0]) return { mood: 'happy' }
  if (t < T.h3) return { mood: 'heart' }
  return { mood: 'happy' }
}
function pisState(t) {
  if (t < T.bubble) return { mood: 'squint', tears: 1 }
  if (t < 8.42) return { mood: 'squint', tears: t > T.flat ? 3 : 2 }
  if (t < T.talk[0]) return { mood: 'wide', look: [-1, -1], tears: 0 }
  if (t < T.h3) return { mood: 'heart', tears: 1 }
  return { mood: 'happy', tears: 3 }
}
const clockAt = t => { const m = Math.round(lerp(2, 62, ease.inOutQuad(prog(t, ...T.clock)))); const h = 6 + Math.floor(m / 60); return `${h}:${String(m % 60).padStart(2, '0')} PM` }

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 40px 'Space Mono'", "bold 58px 'EB Garamond'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const talkIm = await new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = A + 'card-talk-1.png' })
  let talkBmp = null
  if (talkIm) { const c = document.createElement('canvas'); c.width = 700; c.height = Math.round(700 * talkIm.height / talkIm.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(talkIm, 0, 0, c.width, c.height); talkBmp = c }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'An hour on the | *Katy* *Freeway…*', { top: 150, size: 100, accentSize: 124, at: T.h0, gap: 0.08, accentColor: '#ff7a6b', wobble: true, late: 2, lateAt: T.h0Late })
  const H1 = popText(root, '…for a date who | just says *“hey.”*', { top: 150, size: 100, accentSize: 132, at: T.h1, gap: 0.07, accentColor: LILAC, wobble: true, late: 1, lateAt: T.h1Late })
  const H2 = popText(root, 'Dealbreakers, | *up* *front.*', { top: 170, size: 108, accentSize: 140, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h2Late })
  const H3 = popText(root, 'Know before | you *drive.*', { top: 170, size: 116, accentSize: 160, at: T.h3, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h3Late })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }
  // the horizon skyline (generic towers), small
  function skyline(a) {
    if (a <= 0) return
    x.save(); x.globalAlpha *= a
    const B = [[300, 40], [330, 70], [365, 52], [395, 110], [430, 80], [460, 140], [500, 96], [535, 170], [570, 120], [605, 150], [640, 84], [675, 104], [710, 60], [740, 44]]
    B.forEach(([bx, h], i) => {
      const w = (B[i + 1] ? B[i + 1][0] : 770) - bx + 2
      x.fillStyle = '#1b1236'; x.fillRect(bx, VP.y - h, w, h)
      x.fillStyle = '#2a2050'; x.fillRect(bx + 3, VP.y - h + 3, w - 6, h - 3)
      for (let wy = VP.y - h + 10; wy < VP.y - 6; wy += 14) for (let wx = bx + 7; wx < bx + w - 8; wx += 10) if (Math.sin(wx * 12.9 + wy * 7.1) > 0.35) { x.fillStyle = '#f2c75c'; x.fillRect(wx, wy, 4, 5) }
    })
    x.restore()
  }
  function honkText(t, t0, cx, cy, txt = 'BEEP!', col = GOLD) {
    const p = prog(t, t0, t0 + 0.55)
    if (p <= 0 || p >= 1) return
    x.save(); x.globalAlpha = 1 - ease.inQuad(p)
    x.font = `700 ${Math.round(56 * easeOutBack(clamp(p * 3), 2.5))}px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = '#1b1236'; x.fillText(txt, cx + 4, cy - p * 60 + 4)
    x.fillStyle = col; x.fillText(txt, cx, cy - p * 60)
    x.restore()
  }

  // a star sitting in a convertible: star first, the car body in front of its lower half
  function starInCar(t, { cx, cy, w, star, color, glyph, st, hops, seed, pop, carColor, brake, flat = 0, squash = 0, tears = 0, glow = 1 }) {
    const sy = cy - w * 0.31 - star * 0.3 + flat * w * 0.03
    const opts = { hops, seed, pop, squash }
    drawStarChar(x, cx, sy, star, t, { color, glyph: null, mood: st.mood, look: st.look, blink: st.blink, glow, ...opts })
    if (tears) { const F = starFrame(cx, sy, star, t, opts); inSprite(x, F, () => tearsCells(x, t, tears)) }
    drawCar(x, cx, cy, w * pop, carColor, { convertible: true, brake, flat })
    // the glyph badge as a bumper sticker
    x.save(); x.font = `700 ${Math.round(w * 0.1)}px 'EB Garamond', 'Segoe UI Symbol', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = '#efe6d6'; x.globalAlpha = clamp(pop); x.fillText(glyph + '︎', cx, cy - w * 0.115); x.restore()
  }

  function traffic(t, a) {
    if (a <= 0) return
    const items = TRAFFIC.map(c => ({ ...c, d: c.d + 0.006 * Math.sin(t * 0.9 + c.d * 20) }))
    items.push({ pis: true, L: PC.L, d: PC.d })
    items.sort((p, q) => p.d - q.d)
    x.save(); x.globalAlpha *= a
    for (const c of items) {
      const y = roadY(c.d), cxp = laneX(c.L, c.d), w = 560 * c.d * c.d
      const brake = Math.sin(t * 2.3 + c.d * 31) > -0.6 ? 1 : 0
      if (c.pis) {
        const pp = pop01(t, T.pisIn, 0.36, 2.1)
        if (pp <= 0.02) continue
        const st = pisState(t)
        starInCar(t, { cx: cxp, cy: y, w, star: PC.star, color: PIS.color, glyph: PIS.glyph, st, hops: PIS_HOPS, seed: 6, pop: pp, carColor: '#5a6ad6', brake, tears: st.tears, squash: st.tears >= 2 ? 0.04 * Math.max(0, Math.sin(t * 15)) : 0 })
      } else drawCar(x, cxp, y, w, c.hue, { brake })
    }
    x.restore()
  }

  function drawAriesCar(t, ok) {
    const ap = pop01(t, T.ariIn, 0.4, 2.0) * ok
    if (ap <= 0.02) return
    const st = ariState(t)
    let cx = AC.x, cy = AC.y, w = AC.w, star = AC.star, flat = 0, squash = 0
    if (t < 8.42) {
      flat = t >= T.flat ? easeOutBack(prog(t, T.flat, T.flat + 0.3), 2) : 0
      if (t >= T.flat) squash = 0.1 * flat
    } else if (t >= T.h3) {
      // zoom off toward the horizon
      const z = ease.inCubic(prog(t, ...T.zoom))
      const d = lerp(0.764, 0.08, z)
      cy = roadY(d); const k = (d / 0.764) ** 2; w *= k; star *= k
    }
    for (const [i, h] of T.honk.entries()) if (t >= h && t < h + 0.3) squash += -0.12 * Math.sin(Math.PI * (t - h) / 0.3) * (i === 0 ? 1 : 0.8)
    starInCar(t, { cx, cy, w, star, color: ARI.color, glyph: ARI.glyph, st, hops: ARI_HOPS, seed: 3, pop: ap, carColor: '#e0483c', brake: t < 8.42 ? 1 : 0, flat, squash, glow: 1.1 })
    if (t < 8.42) T.honk.forEach((h, i) => honkText(t, h, cx + (i % 2 ? 150 : -150), cy - 330, i === 0 ? 'BEEP!' : 'BEEEP!'))
    if (t >= T.h3) T.beep.forEach((h, i) => honkText(t, h, cx + (i ? 120 : -120), cy - 300, '♥ BEEP', PINK))
    // speed lines while zooming
    if (t > T.zoom[0] && t < T.zoom[1]) {
      const a = Math.sin(Math.PI * prog(t, ...T.zoom))
      x.fillStyle = `rgba(242,199,92,${0.6 * a})`
      for (let i = 0; i < 10; i++) { const yy = 900 + ((i * 97 + t * 1600) % 900); const side = i % 2 ? 1 : -1; x.fillRect(540 + side * (160 + (i * 37) % 260), yy, 8, 70) }
    }
  }

  // the "hey" bubble
  function heyBubble(t) {
    const a = pop01(t, T.bubble, 0.35, 2.6) * (1 - prog(t, 8.2, 8.38))
    if (a <= 0.01 || t > 8.42) return
    const deflate = t > T.flat ? ease.outCubic(prog(t, T.flat, T.flat + 0.5)) : 0
    const cx = 540, cy = 790, w = 560 * a * (1 - 0.18 * deflate), h = 280 * a * (1 - 0.25 * deflate)
    x.save(); x.translate(cx, cy + deflate * 40); x.rotate(-0.04 - deflate * 0.1)
    const P = 10
    stepRect(x, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, P, '#1b1236')
    stepRect(x, -w / 2, -h / 2, w, h, P, '#efe6d6')
    // tail
    x.fillStyle = '#1b1236'; x.fillRect(-w / 2 + 60 * a, h / 2, 60 * a, 50 * a)
    x.fillStyle = '#efe6d6'; x.fillRect(-w / 2 + 70 * a, h / 2 - 2, 40 * a, 38 * a)
    x.fillStyle = '#1b1236'; x.font = `800 ${Math.round(170 * a)}px Inter, Arial, sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('hey', 0, -10 * a)
    x.restore()
    // crickets: little pixel chirp marks
    if (t > T.crickets && t < T.flat) {
      x.fillStyle = BONE
      for (let i = 0; i < 3; i++) { const ph = (t - T.crickets) * 3 + i * 0.33; if (Math.sin(ph * 9) > 0.2) { const px = 300 + i * 240, py = 1000 + (i % 2) * 40; x.fillRect(px, py, 8, 8); x.fillRect(px + 14, py - 10, 8, 8); x.fillRect(px + 28, py, 8, 8) } }
    }
  }

  function dealCard(t) {
    if (t < T.dcard[0] || t > T.h2Out[1] + 0.05) return
    const a = (pop01(t, T.dcard[0], 0.35, 1.8)) * outK(t, [T.h2Out[0], T.h2Out[1] + 0.05])
    const shift = ease.inOutCubic(prog(t, ...T.talk))
    const cx = lerp(540, 330, shift), cy = 900, w = 560, h = 640, rot = lerp(0, -0.12, shift)
    x.save(); x.globalAlpha = clamp(a) * lerp(1, 0.75, shift); x.translate(cx, cy); x.rotate(rot); x.scale(a * lerp(1, 0.86, shift), a * lerp(1, 0.86, shift))
    const P = 10
    stepRect(x, -w / 2 - P, -h / 2 - P, w + 2 * P, h + 2 * P, P, GOLD)
    stepRect(x, -w / 2, -h / 2, w, h, P, '#1a1033')
    x.fillStyle = 'rgba(239,230,214,0.4)'; x.fillRect(-w / 2 + 20, -h / 2 + 20, w - 40, 3); x.fillRect(-w / 2 + 20, h / 2 - 23, w - 40, 3)
    x.font = `700 36px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = GOLD
    x.fillText('DEALBREAKERS', 0, -h / 2 + 70)
    // blank rows (what gets stamped)
    for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(239,230,214,0.12)'; x.fillRect(-w / 2 + 50, -h / 2 + 150 + i * 105, w - 100, 34) }
    STAMPS.forEach((s, i) => {
      const p = prog(t, T.stamps[i] - 0.12, T.stamps[i])
      if (p <= 0) return
      const sc = lerp(2.2, 1, ease.inQuad(p)), y = -h / 2 + 200 + i * 190
      x.save(); x.translate(0, y); x.rotate(i ? 0.07 : -0.08); x.scale(sc, sc); x.globalAlpha *= clamp(p * 2)
      x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-235, -52, 470, 104)
      x.fillStyle = 'rgba(255,77,74,0.12)'; x.fillRect(-235, -52, 470, 104)
      x.fillStyle = RED; x.font = `700 40px ${MONO}`; x.fillText(s, 0, 2)
      x.restore()
    })
    x.restore()
    // the talk card slides in on top
    if (talkBmp && t >= T.talk[0]) {
      const p = easeOutBack(prog(t, ...T.talk), 1.4), tw = 430, th = tw * talkBmp.height / talkBmp.width
      const tx = lerp(1400, 680, p), ty = 930 + Math.sin((t - T.talk[1]) * 2) * 8 * (t > T.talk[1] ? 1 : 0)
      x.save(); x.globalAlpha = clamp(a); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(tx, ty, 20, tx, ty, 420); g.addColorStop(0, 'rgba(201,184,255,0.35)'); g.addColorStop(1, 'rgba(201,184,255,0)')
      x.fillStyle = g; x.beginPath(); x.arc(tx, ty, 420, 0, Math.PI * 2); x.fill(); x.restore()
      x.save(); x.globalAlpha = clamp(a); x.translate(tx, ty); x.rotate(lerp(0.4, 0.06, p)); x.shadowColor = 'rgba(6,4,18,0.8)'; x.shadowBlur = 40
      x.drawImage(talkBmp, -tw / 2, -th / 2, tw, th); x.restore()
    }
  }

  // phase B: the two stars on foot (no cars), cheering the stamps
  function standing(t, ok) {
    const a = ok
    const sa = ariState(t), sp = pisState(t)
    const nod = s => t >= s + 0.05 && t < s + 0.45 ? 0.08 * Math.sin(Math.PI * (t - s - 0.05) / 0.2) : 0
    const nk = T.stamps.reduce((m, s) => m + Math.max(0, nod(s)), 0)
    drawStarChar(x, 200, 1300, 230, t, { color: ARI.color, glyph: ARI.glyph, mood: sa.mood, look: sa.look, blink: sa.blink, hops: ARI_HOPS, seed: 3, pop: a * pop01(t, 8.42, 0.01), squash: nk })
    const opts = { hops: PIS_HOPS, seed: 6, pop: a, squash: nk }
    drawStarChar(x, 900, 1320, 160, t, { color: PIS.color, glyph: PIS.glyph, mood: sp.mood, look: sp.look, blink: sp.blink, ...opts })
    const F = starFrame(900, 1320, 160, t, opts); inSprite(x, F, () => tearsCells(x, t, sp.tears))
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      const roadOn = t < 8.42 ? clamp(t / 0.35) : t >= T.h2Out[1] ? clamp((t - T.h2Out[1]) / 0.3) * ok : 0
      const flow = t < 8.42 ? t * 0.02 : t < T.zoom[0] ? 0 : 0.6 * (t - T.zoom[0]) * (t - T.zoom[0])
      if (roadOn > 0) {
        skyline(roadOn)
        drawRoad(x, t, { a: roadOn, flow })
        if (t < 8.42) drawGantry(x, t, 'KATY FWY', clockAt(t), pop01(t, 0.25, 0.4, 1.6))
        if (t < 8.42) traffic(t, 1)
      }
      if (t < T.out[1] + 0.02) {
        if (t < 8.42) { heyBubble(t); drawAriesCar(t, ok) }
        else if (t < T.h2Out[1]) { dealCard(t); standing(t, outK(t, [T.h2Out[0], T.h2Out[1]])) }
        else {
          // the last beat: Pisces on the shoulder, waving; Aries zooms off
          const sp = pisState(t), opts = { hops: PIS_HOPS, seed: 6, pop: pop01(t, T.h2Out[1], 0.3, 2) * ok }
          drawStarChar(x, 880, 1300, 160, t, { color: PIS.color, glyph: PIS.glyph, mood: sp.mood, look: [-1, -1], ...opts })
          const F = starFrame(880, 1300, 160, t, opts); inSprite(x, F, () => tearsCells(x, t, sp.tears))
          drawAriesCar(t, ok)
        }
        T.stamps.forEach(s => sparkles(t, 540, 900, s, 8, 260, s, [RED, GOLD, BONE]))
        sparkles(t, 680, 930, T.talk[1], 12, 280, 2, [LILAC, GOLD, BONE])
      }
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 4.56 (traffic hook → "hey"), 8.42 (flat tyres → dealbreakers; hides the change of stage),
// 12.44 (cards → the open road). cardfx keeps the middle one (8.42) for a 20 s film.
const CUTS = [4.56, { t: 8.42, kind: 'flip' }, 12.44]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const horn = (t, len = 0.28, g = 0.03) => [['chip', t, 392, len, { ...FX, wave: 'square', duty: 0.4, gain: g, decay: 0.05, sustain: 0.9 }], ['chip', t, 493.88, len, { ...FX, wave: 'square', duty: 0.4, gain: g * 0.8, decay: 0.05, sustain: 0.9 }]]
const crickets = t => Array.from({ length: 4 }, (_, i) => ['pop', +(t + i * 0.035).toFixed(3), 3520, 0.012, 0.5])
const stamp = t => [['tom', t, 82, { ...FX, gain: 0.32, decay: 0.3 }], ['boom', t, 0.1], ['clap', t + 0.005, { ...FX, gain: 0.16 }], ['tick', t, 0.09]]
const womp = t => [['chip', t, 293.66, 0.32, { ...FX, wave: 'square', duty: 0.3, slide: -2, gain: 0.045, decay: 0.2, sustain: 0.8 }], ['chip', t + 0.36, 233.08 * 1.06, 0.75, { ...FX, wave: 'square', duty: 0.3, slide: -5, vib: 0.02, gain: 0.045, decay: 0.3, sustain: 0.8 }]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...wordPops(T.h0, 3, 0.08, 0, 0.026), ['pop', T.h0Late, 1174.66, 0.05, 0], ['pop', T.h0Late + 0.1, 1318.51, 0.045, 0],
  ['pop', T.ariIn + 0.05, 739.99, 0.045, 0], ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['tick', 0.3, 0.05],
  // the clock ticks
  ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.clock[0] + 0.3 * i).toFixed(3), 0.018]),
  ...horn(T.honk[0], 0.32), ...horn(T.honk[1], 0.18), ...horn(T.honk[2], 0.4),
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [ARIN]: 620, [SKYN]: 880 } }),
  ...sob(2.6, 1400, 2),
  // hey
  ['whoosh', T.h0Out[0], 0.3, 0.03], ...wordPops(T.h1, 6, 0.07, 1, 0.024), ['pop', T.h1Late, 1318.51, 0.05, 0],
  ['pop', T.bubble + 0.05, 1567.98, 0.05, 0], ['pop', T.bubble + 0.12, 1174.66, 0.04, 0], ['boom', T.bubble, 0.06],
  ...crickets(T.crickets), ...crickets(T.crickets + 0.3), ...crickets(T.crickets + 0.6),
  ...womp(T.flat), ['chip', T.flat, 3000, 0.5, { ...FX, wave: 'noise', gain: 0.02, decay: 0.4, sustain: 0.3 }],
  ...sob(T.flat + 0.5, 1400), ...sob(T.flat + 0.95, 1300, 2),
  // dealbreakers + the talk card
  ...wordPops(T.h2, 1, 0.08, 2, 0.028), ['pop', T.h2Late, 1174.66, 0.05, 0], ['pop', T.h2Late + 0.1, 1318.51, 0.05, 0], ['pluck', T.h2Late + 0.1, 1174.66, 0.04, 0.6, 0],
  ['whoosh', T.dcard[0], 0.3, 0.05], ['pop', T.dcard[1], 880, 0.04, 0],
  ...T.stamps.flatMap(stamp), ...T.stamps.map(s => ['pop', s + 0.25, 587.33, 0.03, 0]),
  ['whoosh', T.talk[0], 0.4, 0.06], ['bell', T.talk[1], 1318.51, 0.045, 1.8, 0], ['glitter', T.talk[1], T.talk[1] + 0.7],
  // the open road
  ...wordPops(T.h3, 3, 0.08, 0, 0.026), ['pop', T.h3Late, 1318.51, 0.055, 0], ['pluck', T.h3Late, 1174.66, 0.05, 0.7, 0],
  ...horn(T.beep[0], 0.12, 0.025), ...horn(T.beep[1], 0.12, 0.025),
  ['riser', T.zoom[0], T.zoom[1] - 0.2, 0.03], ['whoosh', T.zoom[0] + 0.5, 0.8, 0.06],
  ...sob(T.h3Late + 0.3, 1568), ...sob(T.h3Late + 0.9, 1660, 2),
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
