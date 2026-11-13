// rw-st4anniversary: the Season 4 story "Aries and Libra's anniversary" (st4anniversary) retold in the v3 social look
// (signs3kit story mode, cast: Aries + Libra, ~41 s vertical, music: lofi · E). Same premise, jokes and payoff: Aries plans
// the anniversary in five minutes ("PLAN: GO."), Libra brings five option cards, and they meet in the middle at option A,
// their first date spot ("Fast and fair."). One moment, one caption, one big gag per beat.
//   0.0–3.6    "Aries and Libra plan | *one* anniversary."  The two stars side by side.
//   3.6–34.0   eight beats (3.8 s each):
//              ♈ the plan took five minutes: one sticky note, PLAN: GO. · ♎ five options, A to E, laminated
//              · ♈ waited a full nine seconds (stopwatch, "let's go NOW.") · ♎ picnic or stars? the scale tips until it
//              smokes · ♈ "you choose." Aries chose all five · ♎ option A: our first date spot (the rest flutter off,
//              the scale settles level) · ♈ Aries said go, Libra said together (running in place, speed lines)
//              · ♎ at their spot: a table, a cake with one candle, card A propped up. "Fast and fair."
//  34.0        "Opposite signs. | *Perfectly* balanced."  Both stars back, side by side.
//  37.4        callback: "Next anniversary? | Options *B to E.*"  The four unused cards fan back in, Aries already
//              cheering for all of them (beat 5's "all five", paid off).
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'
import { drawPixelStar } from '../../sky.js'

const RED = '#e23d4e', LIBC = '#ff8fb1'
const OPTS = [['A', 'OUR SPOT'], ['B', 'PICNIC'], ['C', 'STARS'], ['D', 'BOWLING'], ['E', 'TACOS']]

// ── props
const PAN = ['PPPPPPPPPPP', '.PpppppppP.', '..PPPPPPP..']
const PAN_C = { P: '#c98a1f', p: '#f7c948' }
const CAKE = [
  '.....F.....', '.....f.....', '.....C.....', '.....C.....',
  '.SSSSSSSSS.', 'SsSsSsSsSsS', 'BBBBBBBBBBB', 'BBhBBBBBhBB', 'BBBBBBBBBBB', 'ppppppppppp',
]
const CAKE_C = { F: '#ffd24a', f: '#ff8a3a', C: '#9ff3ff', S: '#fff4f0', s: PINK, B: '#ff9ab8', h: '#ffffff', p: '#d9a35e' }
const PUFF = ['.ss.', 'ssss', 'ssss', '.ss.']

/** Libra's little balance scale, standing on its head (F = the star's frame). a = beam angle, sc = size factor */
function headScale(x, F, a, { sc = 1, glow = 0, alpha = 1 } = {}) {
  const c = 6 * sc, ARM = 78 * sc, HANG = 70 * sc
  const px = F.x, base = F.top + 6 * sc, py = base - 54 * sc
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = INK; x.fillRect(px - 2.5 * c, py - c, 5 * c, base - py + 2 * c)
  x.fillStyle = '#c98a1f'; x.fillRect(px - 1.5 * c, py, 3 * c, base - py); x.fillStyle = '#f7c948'; x.fillRect(px - 1.5 * c, py, c, base - py)
  x.fillStyle = INK; x.fillRect(px - 5 * c, base - c, 10 * c, 3 * c); x.fillStyle = '#f7c948'; x.fillRect(px - 4 * c, base, 8 * c, c)
  x.save(); x.translate(px, py); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
  x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
  x.restore()
  for (const s of [-1, 1]) {
    const ex = px + Math.cos(a) * ARM * s, ey = py + Math.sin(a) * ARM * s, by = ey + HANG
    x.fillStyle = 'rgba(255,241,200,0.85)'
    for (let i = 0; i <= 8; i++) { const f = i / 8; x.fillRect(lerp(ex, ex - 30 * sc, f) - 2, lerp(ey, by - 6, f), 4, 5); x.fillRect(lerp(ex, ex + 30 * sc, f) - 2, lerp(ey, by - 6, f), 4, 5) }
    if (glow > 0) drawPixelStar(x, ex, by - 22 * sc, 26 * glow * sc, 1, GOLD, '#fff6e6')
    drawBits(x, PAN, PAN_C, ex, by, c)
  }
  x.restore()
}

/** a big balance scale prop with a word in each pan */
function bigScale(x, cx, cy, a, k, left, right) {
  if (k <= 0.01) return
  const c = 10, ARM = 190, HANG = 150
  x.save(); x.translate(cx, cy); x.scale(k, k)
  // post + foot
  x.fillStyle = INK; x.fillRect(-3 * c, -c, 6 * c, 300); x.fillRect(-12 * c, 270, 24 * c, 4 * c)
  x.fillStyle = '#c98a1f'; x.fillRect(-2 * c, 0, 4 * c, 280); x.fillStyle = '#f7c948'; x.fillRect(-2 * c, 0, c, 280)
  x.fillStyle = '#f7c948'; x.fillRect(-11 * c, 280, 22 * c, 2 * c)
  x.save(); x.rotate(a)
  x.fillStyle = INK; x.fillRect(-ARM - c, -1.5 * c, 2 * ARM + 2 * c, 3 * c)
  x.fillStyle = '#f7c948'; x.fillRect(-ARM, -c / 2 - 2, 2 * ARM, c + 4)
  x.restore()
  drawPixelStar(x, 0, -c, 22, 1, GOLD, '#fff6e6')
  ;[[-1, left], [1, right]].forEach(([s, word]) => {
    const ex = Math.cos(a) * ARM * s, ey = Math.sin(a) * ARM * s, by = ey + HANG
    x.strokeStyle = 'rgba(255,241,200,0.9)'; x.lineWidth = 4
    x.beginPath(); x.moveTo(ex, ey); x.lineTo(ex - 60, by - 10); x.moveTo(ex, ey); x.lineTo(ex + 60, by - 10); x.stroke()
    drawBits(x, PAN, PAN_C, ex, by, 12)
    label(x, ex, by - 56, word, 1, { size: 30, bg: s < 0 ? MINT : LAV, rot: s * 0.05, font: MONO, weight: 700 })
  })
  x.restore()
}

/** one of Libra's laminated option cards */
function optCard(x, cx, cy, w, rot, o, k, big = false) {
  if (k <= 0.01) return
  const h = w * 1.36
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(10,6,24,0.92)'; x.beginPath(); x.roundRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12, 14); x.fill()
  x.fillStyle = '#fbf3e6'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 10); x.fill()
  // laminate shine
  x.fillStyle = 'rgba(255,255,255,0.55)'; x.beginPath(); x.moveTo(-w / 2 + w * 0.12, -h / 2); x.lineTo(-w / 2 + w * 0.3, -h / 2); x.lineTo(-w / 2, -h / 2 + h * 0.3); x.lineTo(-w / 2, -h / 2 + h * 0.14); x.fill()
  x.lineWidth = Math.max(2, w * 0.025); x.strokeStyle = LIBC; x.beginPath(); x.roundRect(-w / 2 + w * 0.06, -h / 2 + w * 0.06, w * 0.88, h - w * 0.12, 8); x.stroke()
  x.fillStyle = LIBC; x.font = `800 ${Math.round(w * 0.42)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(o[0], 0, -h * 0.14)
  x.fillStyle = INK
  if (big) { x.font = `700 ${Math.round(w * 0.11)}px ${MONO}`; x.fillText('OUR FIRST', 0, h * 0.2); x.fillText('DATE SPOT', 0, h * 0.32) }
  else { x.font = `700 ${Math.round(w * 0.13)}px ${MONO}`; x.fillText(o[1], 0, h * 0.24) }
  x.restore()
}

/** Aries' whole plan: one sticky note */
function stickyNote(x, cx, cy, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy + Math.sin(t * 3) * 4); x.rotate(-0.07); x.scale(k, k)
  x.fillStyle = 'rgba(10,6,24,0.9)'; x.fillRect(-176, -126, 352, 252)
  x.fillStyle = '#ffe36b'; x.fillRect(-166, -116, 332, 232); x.fillStyle = '#f5cf3e'; x.fillRect(-166, 84, 332, 32)
  x.font = `700 44px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText('THE PLAN:', 0, -40); x.font = `800 84px ${INTER}`; x.fillStyle = '#c4283a'; x.fillText('GO.', 0, 34)
  x.restore()
}

/** a stopwatch label counting up */
function stopwatch(x, cx, cy, k, secs) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 112, 0, Math.PI * 2); x.fill()
  x.fillRect(-18, -142, 36, 34)
  x.fillStyle = BONE; x.beginPath(); x.arc(0, 0, 100, 0, Math.PI * 2); x.fill()
  x.fillStyle = RED; x.fillRect(-12, -134, 24, 20)
  const a = -Math.PI / 2 + secs / 60 * Math.PI * 2 * 6
  x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 80, Math.sin(a) * 80); x.stroke()
  x.fillStyle = INK; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText(`0:0${Math.min(9, Math.floor(secs))}`, 0, 50)
  x.restore()
}

/** speed lines + dust for running in place */
function runLines(x, t, cy, k) {
  if (k <= 0.01) return
  x.save()
  for (let i = 0; i < 9; i++) {
    const y = cy - 150 + i * 36, len = 120 + (i * 53) % 120
    const ph = ((t * 1.6 + i * 0.37) % 1)
    const sx = 860 - ph * 760
    x.globalAlpha = 0.6 * k * Math.sin(Math.PI * ph); x.fillStyle = i % 2 ? BONE : GOLD; x.fillRect(sx - len, y, len, 6)
  }
  for (let i = 0; i < 4; i++) {
    const ph = ((t * 1.3 + i / 4) % 1)
    x.globalAlpha = 0.5 * k * (1 - ph)
    drawBits(x, PUFF, { s: '#d9c7a8' }, 200 - ph * 80 + i * 40, 1150 - ph * 40, 10 + ph * 8, { outline: null })
  }
  x.restore()
}

/** the table at their first date spot, cake with one candle, card A propped up */
function dateTable(x, t, k) {
  if (k <= 0.01) return
  const FLOOR = 1180
  x.save(); x.translate(540, FLOOR); x.scale(k, k)
  x.fillStyle = 'rgba(10,6,24,0.95)'; x.fillRect(-190, -160, 380, 36); x.fillRect(-28, -128, 56, 128)
  x.fillStyle = '#b07a3a'; x.fillRect(-184, -154, 368, 24); x.fillStyle = '#d9a35e'; x.fillRect(-184, -154, 368, 6)
  x.fillStyle = '#8a5a2a'; x.fillRect(-22, -128, 44, 128)
  drawBits(x, CAKE, CAKE_C, -60, -154 - 70, 14)
  optCard(x, 100, -154 - 100, 130, 0.1, OPTS[0], 1, true)
  x.restore()
}

const STOPW = lt => clamp((lt - 0.2) / 1.6) * 9
const scaleSwing = lt => lt < 0.3 ? 0 : Math.sin((lt - 0.3) * (6 + lt * 5)) * Math.min(0.55, 0.15 + (lt - 0.3) * 0.35)

const CAMEOS = [
  // 1 · Aries plans in five minutes
  { sign: 'aries', cap: 'Anniversary plan? | Aries took *five minutes.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', star: { x: -200 }, hops: [1.2],
    front(x, t, lt, P) {
      stickyNote(x, 740, 800, pop01(t, P.t0 + 0.3, 0.35, 2.2), t)
      label(x, 740, 1060, 'PLANNED IN 5 MIN', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 740, 800, P.t0 + 0.6, 7, 200, 0.3)
    } },
  // 2 · Libra brings five laminated options
  { sign: 'libra', cap: 'Libra brought five options. | *Laminated.*', mood: lt => lt > 1.4 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.5],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      headScale(x, F, 0.04 * Math.sin(t * 2), { sc: 0.95, alpha: P.k > 0.3 ? 1 : 0 })
      OPTS.forEach((o, i) => {
        const k = pop01(t, P.t0 + 0.3 + i * 0.18, 0.3, 2.2)
        optCard(x, 745 + (i - 2) * 92, 840 + Math.abs(i - 2) * 16, 122, (i - 2) * 0.12, o, k)
      })
      label(x, 750, 1110, 'OPTIONS A–E', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 34, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 3 · Aries "waits"
  { sign: 'aries', cap: 'Aries waited patiently. | For *nine seconds.*', hideStar: true,
    front(x, t, lt, P) {
      const k = P.k
      const hops = Array.from({ length: 8 }, (_, i) => P.t0 + 0.3 + i * 0.28)
      signChar(x, t, 'aries', 340, 900, 290, { mood: lt > 1.4 ? 'squint' : 'wide', look: [1, 0], pop: k, hops, seed: 3 })
      // Libra still reading the cards on the right
      const kl = pop01(t, P.t0 + 0.15, 0.35, 2)
      const FL = signChar(x, t, 'libra', 790, 1010, 190, { mood: 'neutral', look: [0, 1], pop: kl, seed: 8, glyph: false })
      headScale(x, FL, 0.03 * Math.sin(t * 2), { sc: 0.62, alpha: kl > 0.3 ? 1 : 0 })
      optCard(x, 790, 1105, 90, -0.08, OPTS[2], kl)
      stopwatch(x, 790, 650, pop01(t, P.t0 + 0.2, 0.3, 2), STOPW(lt))
      bubble(x, 360, 600, 'let’s go NOW.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, tail: 'bc' })
    } },
  // 4 · picnic or stars? the scale overheats
  { sign: 'libra', cap: 'Picnic or stars? | The scale *overheated.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.sin(lt * 9) > 0 ? 1 : -1, 0], star: { x: -250, s: 260 },
    keyCue: t0 => ['pluck', t0 + 2.0, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P, F) {
      headScale(x, F, scaleSwing(lt) * 0.7, { sc: 0.8, alpha: P.k > 0.3 ? 1 : 0 })
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      bigScale(x, 700, 680, scaleSwing(lt), k * 0.85, 'PICNIC', 'STARS')
      if (lt > 1.5) {
        for (let i = 0; i < 4; i++) {
          const ph = ((t * 0.9 + i / 4) % 1)
          drawBits(x, PUFF, { s: '#cfc8e0' }, 700 + Math.sin(i * 2.1 + ph * 4) * 30, 650 - ph * 150, 10 + ph * 10, { outline: null, alpha: 0.75 * (1 - ph) * clamp((lt - 1.5) * 3) })
        }
        label(x, 700, 1150, 'OVERHEATED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: 0.05, font: MONO, weight: 700 })
      }
    } },
  // 5 · "you choose." Aries chose all five
  { sign: 'aries', cap: 'Libra: “You choose.” | Aries chose *all five.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -210 }, hops: [1.5],
    front(x, t, lt, P, F) {
      const kl = pop01(t, P.t0 + 0.15, 0.35, 2)
      const FL = signChar(x, t, 'libra', 790, 990, 210, { mood: lt > 1.5 ? 'wide' : 'happy', look: [-1, 0], pop: kl, seed: 8, glyph: false })
      headScale(x, FL, 0.03 * Math.sin(t * 2), { sc: 0.68, alpha: kl > 0.3 ? 1 : 0 })
      bubble(x, 790, 610, 'you choose.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bc' })
      // the five cards fly from Libra into Aries' arms
      OPTS.forEach((o, i) => {
        const u = ease.inOutCubic(prog(lt, 0.8 + i * 0.08, 1.4 + i * 0.08))
        const tx = F.x + (i - 2) * 58, ty = F.cy + 135 + Math.abs(i - 2) * 10
        const cx = lerp(790, tx, u), cy = lerp(1000, ty, u) - Math.sin(Math.PI * u) * 160
        optCard(x, cx, cy, lerp(70, 110, u), lerp(0, (i - 2) * 0.24, u), o, lt > 0.75 ? 1 : 0)
      })
      label(x, F.x, 650, 'ALL OF THEM.', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: -0.05 })
    } },
  // 6 · option A: our first date spot
  { sign: 'libra', cap: 'Then Libra found | option A: *our spot.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [1.2],
    front(x, t, lt, P, F) {
      const lvl = clamp((lt - 0.9) / 0.5)
      headScale(x, F, (1 - lvl) * 0.3 * Math.sin(lt * 12), { sc: 0.95, glow: lvl, alpha: P.k > 0.3 ? 1 : 0 })
      // B–E flutter away, A grows
      OPTS.slice(1).forEach((o, j) => {
        const i = j + 1, u = prog(lt, 0.5 + j * 0.06, 1.4)
        if (u >= 1) return
        optCard(x, 760 + (i - 2) * 60 + u * (120 + i * 40), 840 - u * (380 + i * 40), 120 * (1 - 0.3 * u), (i - 2) * 0.22 + u * (i % 2 ? 5 : -5), o, 1 - ease.inQuad(u))
      })
      const e = ease.outBack(prog(lt, 0.4, 1.0))
      optCard(x, lerp(640, 750, clamp(e)), lerp(860, 820, clamp(e)), lerp(120, 270, e), lerp(-0.4, -0.04, clamp(e)) + Math.sin(t * 1.6) * 0.02, OPTS[0], 1, true)
      sparkles(x, t, 750, 820, P.t0 + 1.0, 10, 230, 1)
      label(x, 750, 1130, 'BALANCED', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 7 · Aries said go, Libra said together
  { sign: 'aries', cap: 'Aries said “go.” | Libra said *“together.”*', hideStar: true,
    front(x, t, lt, P) {
      const run = clamp((lt - 0.7) / 0.3)
      runLines(x, t, 960, run)
      const hops = Array.from({ length: 10 }, (_, i) => P.t0 + 0.8 + i * 0.22)
      const k = P.k
      const FA = signChar(x, t, 'aries', 650, 930, 260, { mood: run > 0 ? 'sparkle' : 'wide', look: [1, 0], pop: k, hops: run > 0 ? hops : [], squash: -0.08 * run, seed: 3 })
      const FL = signChar(x, t, 'libra', 360, 960, 240, { mood: lt > 1.2 ? 'heart' : 'happy', look: [1, 0], pop: k, hops: run > 0 ? hops.map(h => h + 0.11) : [], squash: -0.08 * run, seed: 8 })
      headScale(x, FL, -0.12 * run + 0.03 * Math.sin(t * 3), { sc: 0.78, alpha: k > 0.3 ? 1 : 0 })
      // holding hands: a little gold link between them
      if (k > 0.5) { x.fillStyle = INK; x.fillRect(FL.x + 90, FL.cy + 40, FA.x - FL.x - 180, 14); x.fillStyle = GOLD; x.fillRect(FL.x + 94, FL.cy + 44, FA.x - FL.x - 188, 6) }
      bubble(x, 360, 640, 'together.', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, tail: 'bc', col: '#ffe1ea' })
      label(x, 800, 640, 'TO OUR SPOT →', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 8 · fast and fair
  { sign: 'libra', cap: 'Fast *and* fair. | Same table as year one.', hideStar: true,
    front(x, t, lt, P) {
      const k = P.k
      dateTable(x, t, pop01(t, P.t0 + 0.1, 0.4, 1.6))
      const heart = lt > 1.0
      signChar(x, t, 'aries', 235, 930, 230, { mood: heart ? 'heart' : 'sparkle', look: [1, 0], pop: k, hops: [P.t0 + 1.0], seed: 3 })
      const FL = signChar(x, t, 'libra', 850, 930, 230, { mood: heart ? 'heart' : 'sparkle', look: [-1, 0], pop: pop01(t, P.t0 + 0.12, 0.45, 1.8), hops: [P.t0 + 1.05], seed: 8 })
      headScale(x, FL, 0.02 * Math.sin(t * 2), { sc: 0.75, glow: clamp((lt - 0.8) * 2), alpha: k > 0.3 ? 1 : 0 })
      label(x, 540, 610, 'YEAR TWO', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 36, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 540, 900, P.t0 + 1.0, { n: 8, life: 1.6, spread: 520, cell: 8, seed: 5 })
      sparkles(x, t, 480, 880, P.t0 + 1.0, 8, 110, 2, [GOLD, '#ffffff'])
    } },
]

const F = makeFilm({
  id: 'rw-st4anniversary', key: 'E', accent: PINK,
  cast: ['aries', 'libra'],
  ending: 'callback',
  title: 'Aries and Libra plan | *one* anniversary.',
  cameos: CAMEOS,
  group: {
    cap: 'Opposite signs. | *Perfectly* balanced.', moods: ['heart', 'sparkle']
  },
  last: {
    text: 'Next anniversary? | Options *B to E.*',
    draw(x, t, lt) {
      OPTS.slice(1).forEach((o, j) => {
        const k = pop01(t, t - lt + 0.6 + j * 0.15, 0.35, 2.2)
        optCard(x, 540 + (j - 1.5) * 190, 900 + Math.abs(j - 1.5) * 20, 175, (j - 1.5) * 0.12, o, k)
      })
      const ka = pop01(t, t - lt + 1.3, 0.4, 2)
      signChar(x, t, 'aries', 290, 1290, 190, { mood: 'heart', look: [1, -1], pop: ka, hops: [t - lt + 1.6, t - lt + 2.1, t - lt + 2.6], seed: 3, glyph: false })
      const FL = signChar(x, t, 'libra', 790, 1290, 190, { mood: 'wide', look: [-1, -1], pop: ka, seed: 8, glyph: false })
      headScale(x, FL, 0.03 * Math.sin(t * 2), { sc: 0.5, alpha: ka > 0.3 ? 1 : 0 })
      bubble(x, 540, 1230, 'ALL FOUR!', pop01(t, t - lt + 1.7, 0.25, 2.2), { size: 36, tail: 'bl', col: '#ffe1d6' })
      sparkles(x, t, 540, 900, t - lt + 1.2, 10, 330, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
