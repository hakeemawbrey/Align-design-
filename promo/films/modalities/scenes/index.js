// modalities (15 s, vertical) · "Starters, keepers, changers."
// Beats on the 108 bpm grid (beat n at 0.6 + n·0.5556). One canvas (sky + icons), DOM type above, sparkles + grain on top.
//   0.00–0.40  fade up from black
//   0.15–0.75  hook "Starters, / keepers, / *changers.*" — each word pops with its icon (START button, padlock, shuffle)
//   1.43–1.99  the three icons each do their thing once (press, click, flip)                    (hook out 2.6)
//   2.75       CARDINAL: the button glides to centre; Aries/Cancer/Libra/Capricorn chips pop; a cursor presses START
//              (3.656) → ▶ pops, ripples, the chips jump in a wave; "They *start it.*" 3.95          (out 5.7)
//   5.85       FIXED: an open padlock; the shackle drops and clicks shut (6.711) "CLICK!"; tiny locks pin to
//              Taurus/Leo/Scorpio/Aquarius; a loop arrow keeps circling; "They *keep it going.*" 7.05  (out 8.8)
//   8.95       MUTABLE: shuffle arrows draw in, flip (9.767, 11.433); Gemini/Virgo/Sagittarius/Pisces chips
//              shuffle places (10.322, 11.433); "They *switch it up.*" 10.1                         (out 11.9)
//   12.05      "Every team / needs *all three.*" ("all three." lands 12.545) with the three icons in a row,
//              CARDINAL · FIXED · MUTABLE; 13.378 all three fire at once + a pixel-star shower
//   14.30–15.00 fade to black (black from 14.965)
import { lerp, prog, ease, el, rng, clamp, C } from '../../../src/lib.js'
import { W, H, SERIF, MONO, fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SIGNS, SKY_H, GRAIN_H, TYPE, easeOutBack } from '../../wheel.js'
import { startButton, cursor, playTri, padlock, loopArrow, shuffle, chip, sparkle as spark, SPARK_COLS, GOLD, INTER } from './illus.js'

export const DURATION = 15
const T_OUT = 14.3, T_END = 15.0
const beat = n => 0.6 + n * 0.5556
const sp = (t, a, d = 0.4, s = 2.0) => easeOutBack(prog(t, a, a + d), s)
const out = (t, a, d = 0.25) => 1 - ease.inQuad(prog(t, a, a + d))
const bump = (t, a, d = 0.35) => Math.sin(Math.PI * prog(t, a, a + d))
const sparkle = (ctx, x, y, t, t0, o = {}) => spark(ctx, x, y, t, t0, { rng, ...o })

const RED = '#ff6b5a', SKY = '#7fd0f0', VIOLET = '#c9a6ff', PINK = '#ff8fb1'

// ── timings
const HOOK = { w: [0.15, 0.45, 0.75], act: [beat(1.5), beat(2), beat(2.5)], out: 2.6 }
const M = [
  { name: 'Cardinal:', col: RED, signs: [0, 3, 6, 9], S: 2.75, act: beat(5.5), punchT: 3.95, out: 5.7,
    punch: ['They', { w: 'start', acc: 1 }, { w: 'it.', acc: 1 }] },
  { name: 'Fixed:', col: GOLD, signs: [1, 4, 7, 10], S: 5.85, act: beat(11), punchT: 7.05, out: 8.8,
    punch: ['They', { w: 'keep', acc: 1 }, { w: 'it', acc: 1 }, { w: 'going.', acc: 1 }] },
  { name: 'Mutable:', col: SKY, signs: [2, 5, 8, 11], S: 8.95, act: beat(16.5), act2: beat(19.5), sh1: beat(17.5), sh2: beat(19.5), punchT: 10.1, out: 11.9,
    punch: ['They', { w: 'switch', acc: 1 }, { w: 'it', acc: 1 }, { w: 'up.', acc: 1 }] },
]
const END = { t: 12.05, all: beat(21.5), icons: [12.2, 12.32, 12.44], fire: beat(23) }

// ── layout
const ROW = [205, 540, 868]
const CHIP_Y = 470, CHIP_X = i => 540 + (i - 1.5) * 225
const BTN = { x: 540, y: 1110, s: 1.0 }, LOCK = { x: 540, y: 1010, s: 1.0 }, SHUF = { x: 540, y: 1040, s: 1.3 }
const HOOK_Y = 1060, END_Y = 1040, IS = 0.62

// mutable chips: two shuffles (chip i sits in slot ORDER[k][i])
const ORDER = [[0, 1, 2, 3], [2, 0, 3, 1], [1, 3, 0, 2]]
function slotPos(i, t, m) {
  const p1 = ease.inOutCubic(prog(t, m.sh1, m.sh1 + 0.45)), p2 = ease.inOutCubic(prog(t, m.sh2, m.sh2 + 0.45))
  const a = CHIP_X(ORDER[0][i]), b = CHIP_X(ORDER[1][i]), c = CHIP_X(ORDER[2][i])
  const x = p2 > 0 ? lerp(b, c, p2) : lerp(a, b, p1)
  const y = CHIP_Y + (i % 2 ? 125 : 0) * (Math.sin(Math.PI * p1) + Math.sin(Math.PI * p2))
  return { x, y }
}

// pixel-star shower for the end flourish
const SHOWER = (() => { const r = rng(4242); return Array.from({ length: 44 }, () => ({ x: 60 + r() * 960, d: r() * 0.9, v: 380 + r() * 420, sz: 18 + 7 * Math.floor(r() * 3), kind: Math.floor(r() * 3), col: SPARK_COLS[Math.floor(r() * SPARK_COLS.length)], sw: r() * 6.28 })) })()

async function build(stage) {
  const root = fill(stage, { background: C.void })
  const bgC = layerCanvas(root), bx = bgC.getContext('2d')
  await Promise.all([`800 108px Inter`, `800 150px Inter`, `700 62px Inter`, `italic 500 118px 'EB Garamond'`, `bold 58px 'EB Garamond'`, `700 34px 'Space Mono'`].map(f => document.fonts.load(f).catch(() => {})))
  const shadow = '0 4px 30px rgba(11,6,32,0.9), 0 0 12px rgba(11,6,32,0.6)'

  // words → spans. A word is a string, '\n', or { w, col, acc, size }
  const line = (words, { top, size = TYPE.headSize, accSize = 118, lh = TYPE.headLine, weight = '800', col = null, accCol = GOLD }) => {
    const box = el('div', { position: 'absolute', left: '70px', width: (W - 140) + 'px', top: top + 'px', textAlign: 'center', fontFamily: INTER, fontWeight: weight,
      fontSize: size + 'px', lineHeight: String(lh), color: col || C.bone, textShadow: col ? `0 0 34px ${col}88, ${shadow}` : shadow, letterSpacing: '-0.02em' }, root)
    const spans = []
    words.forEach(w => {
      if (w === '\n') { el('br', {}, box); return }
      const o = typeof w === 'object', c = o ? (w.col || accCol) : null
      const s = el('span', { display: 'inline-block', opacity: 0, margin: '0 0.11em', transformOrigin: '50% 70%',
        ...(o && w.acc ? { color: c, textShadow: `0 0 28px ${c}66, ${shadow}`, fontFamily: SERIF, fontStyle: 'italic', fontWeight: '500', fontSize: (w.size || accSize) + 'px', letterSpacing: '0' } : {}) }, box, o ? w.w : w)
      spans.push(s)
    })
    return spans
  }
  function popWord(span, t, t0, { out: o = 1e9, dur = 0.28, back = 1.9, wobble = false } = {}) {
    const p = prog(t, t0, t0 + dur), q = ease.inQuad(prog(t, o, o + 0.2))
    const sc = lerp(0.6, 1, easeOutBack(p, back)) * (1 - 0.4 * q)
    const tt = t - t0
    const rot = wobble && tt > 0 ? 9 * Math.exp(-tt * 4) * Math.sin(tt * 18) : 0
    span.style.opacity = String(Math.min(1, p * 3) * (1 - q))
    span.style.transform = `translateY(${lerp(30, 0, ease.outCubic(p)) - 20 * q}px) scale(${sc}) rotate(${rot}deg)`
  }

  // ── copy
  const hook = line(['Starters,', '\n', 'keepers,', '\n', { w: 'changers.', acc: 1, col: PINK, size: 150 }], { top: 170, size: 128, lh: 1.04 })
  const heads = M.map(m => line([m.name], { top: 196, size: 150, col: m.col }))
  const punches = M.map(m => line(m.punch, { top: TYPE.subY + 10, size: 72, accSize: 84, weight: '700', accCol: m.col, lh: 1.1 }))
  const endW = line(['Every', 'team', '\n', 'needs', { w: 'all', acc: 1, size: 148 }, { w: 'three.', acc: 1, size: 148 }], { top: 200, size: 124, lh: 1.08 })
  const labels = ['CARDINAL', 'FIXED', 'MUTABLE'].map((s, i) => el('div', { position: 'absolute', left: (ROW[i] - 160) + 'px', width: '320px', top: (END_Y + 235) + 'px', textAlign: 'center',
    fontFamily: MONO, fontWeight: '700', fontSize: '34px', letterSpacing: '0.12em', textIndent: '0.12em', color: M[i].col, textShadow: shadow, opacity: 0 }, root, s))

  const fx = layerCanvas(root, { pointerEvents: 'none' }), fxx = fx.getContext('2d')
  const gC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = gC.getContext('2d')
  const black = fill(root, { background: '#000', opacity: 1 })

  // ── the icons in their three contexts (hook row, solo scene, end row)
  const bob = (t, i) => 10 * Math.sin(t * 2.3 + i * 1.7)

  function drawButton(t) {
    const m = M[0]
    // hook row → glides to centre at the start of the CARDINAL beat
    const pin = sp(t, HOOK.w[0], 0.42, 2.2)
    const g = easeOutBack(prog(t, m.S - 0.15, m.S + 0.35), 1.4)
    if (t < m.out + 0.3 && pin > 0) {
      const x = lerp(ROW[0], BTN.x, g), y = lerp(HOOK_Y + 40 + bob(t, 0), BTN.y, g), s = lerp(IS, BTN.s, g) * pin * out(t, m.out, 0.25)
      // cursor: in from upper right, presses at act, then backs off
      const ci = ease.outCubic(prog(t, m.act - 0.45, m.act - 0.05)), co = ease.inCubic(prog(t, m.act + 0.25, m.act + 0.65))
      const pr = Math.max(bump(t, HOOK.act[0], 0.3), prog(t, m.act - 0.06, m.act) * out(t, m.act + 0.18, 0.2))
      const glow = Math.max(bump(t, HOOK.act[0], 0.5), bump(t, m.act, 1.2))
      // ripples from the cap
      for (let k = 0; k < 3; k++) {
        const p = prog(t, m.act + k * 0.16, m.act + k * 0.16 + 0.8)
        if (p > 0 && p < 1) { bx.save(); bx.globalAlpha = (1 - p) * 0.8; bx.strokeStyle = m.col; bx.lineWidth = 8; bx.shadowColor = m.col; bx.shadowBlur = 20
          bx.beginPath(); bx.ellipse(x, y + 20, (180 + 300 * ease.outCubic(p)) * s, (54 + 90 * ease.outCubic(p)) * s, 0, 0, Math.PI * 2); bx.stroke(); bx.restore() }
      }
      startButton(bx, x, y, s, { press: pr, col: m.col, glow })
      // ▶ pops out above
      const pk = sp(t, m.act + 0.08, 0.45, 2.6) * out(t, m.out - 0.05, 0.25)
      if (pk > 0) playTri(bx, x + 10, y - 330 + 12 * Math.sin((t - m.act) * 3), 1.15 * pk, m.col, 1, 0.12 * Math.sin((t - m.act) * 2.2) * Math.exp(-(t - m.act) * 0.8))
      if (t > m.act - 0.5 && t < m.act + 0.7) {
        const press = 30 * prog(t, m.act - 0.06, m.act) * out(t, m.act + 0.18, 0.2)
        cursor(bx, lerp(x + 360, x + 30, ci) + 300 * co, lerp(y - 520, y - 40 + press, ci) - 300 * co, 1.15, clamp(ci * 3) * (1 - co))
      }
      sparkle(fxx, x, y - 330, t, m.act + 0.15, { n: 12, rad: 230, seed: 11, size: 32, cols: [m.col, '#ffd98a', '#fff3e0', PINK] })
    }
    sparkle(fxx, ROW[0], HOOK_Y, t, HOOK.w[0] + 0.1, { n: 8, rad: 130, seed: 1, size: 24, cols: [M[0].col, '#fff3e0', '#ffd98a'] })
  }

  function drawLock(t) {
    const m = M[1]
    // hook row
    if (t < HOOK.out + 0.4) {
      const k = sp(t, HOOK.w[1], 0.42, 2.2) * out(t, HOOK.out, 0.25)
      const lift = 1 - ease.outBack(prog(t, HOOK.act[1] - 0.12, HOOK.act[1]))
      padlock(bx, ROW[1], HOOK_Y - 40 + bob(t, 1), IS * k, { lift: clamp(lift, -0.1, 1), col: m.col, squash: bump(t, HOOK.act[1], 0.3), glow: bump(t, HOOK.act[1], 0.6) })
    }
    sparkle(fxx, ROW[1], HOOK_Y, t, HOOK.w[1] + 0.1, { n: 8, rad: 130, seed: 2, size: 24, cols: [m.col, '#fff3e0', '#ffd98a'] })
    // solo
    if (t > m.S && t < m.out + 0.4) {
      const k = sp(t, m.S + 0.1, 0.45, 2.2) * out(t, m.out, 0.25)
      const drop = prog(t, m.act - 0.16, m.act)
      const lift = t < m.act - 0.16 ? 1 + 0.06 * Math.sin((t - m.S) * 9) : 1 - ease.inQuad(drop)
      const sq = bump(t, m.act, 0.35)
      const shake = t > m.act ? 6 * Math.sin((t - m.act) * 40) * Math.exp(-(t - m.act) * 7) : 0
      // the keep-going loop arrow
      const la = ease.outCubic(prog(t, m.act + 0.3, m.act + 0.8))
      loopArrow(bx, LOCK.x, LOCK.y + 40, 345 * k, -Math.PI / 2 + (t - m.act) * 2.4, m.col, 0.85 * k, la)
      padlock(bx, LOCK.x + shake, LOCK.y, LOCK.s * k, { lift, col: m.col, squash: sq, glow: bump(t, m.act, 1.0) })
      // CLICK!
      const ck = sp(t, m.act + 0.02, 0.3, 3) * out(t, m.act + 0.9, 0.3)
      if (ck > 0) {
        bx.save(); bx.translate(LOCK.x + 250, LOCK.y - 250); bx.rotate(-0.22); bx.scale(ck, ck)
        bx.font = `800 70px ${INTER}`; bx.textAlign = 'center'; bx.textBaseline = 'middle'
        bx.lineJoin = 'round'; bx.strokeStyle = '#1a1430'; bx.lineWidth = 14; bx.strokeText('CLICK!', 0, 0)
        bx.fillStyle = m.col; bx.shadowColor = m.col; bx.shadowBlur = 24; bx.fillText('CLICK!', 0, 0); bx.restore()
      }
      sparkle(fxx, LOCK.x, LOCK.y - 60, t, m.act + 0.02, { n: 12, rad: 250, seed: 21, size: 32, cols: [m.col, '#ffd98a', '#fff3e0'] })
      sparkle(fxx, LOCK.x, LOCK.y + 60, t, m.S + 0.2, { n: 9, rad: 200, seed: 22, size: 26, cols: [m.col, '#fff3e0'] })
    }
  }

  function drawShuffle(t) {
    const m = M[2]
    if (t < HOOK.out + 0.4) {
      const k = sp(t, HOOK.w[2], 0.42, 2.2) * out(t, HOOK.out, 0.25)
      const fl = Math.cos(2 * Math.PI * ease.inOutCubic(prog(t, HOOK.act[2], HOOK.act[2] + 0.45)))
      shuffle(bx, ROW[2], HOOK_Y + 10 + bob(t, 2), IS * k, { draw: ease.outCubic(prog(t, HOOK.w[2], HOOK.w[2] + 0.4)), flip: fl, col: m.col, col2: VIOLET })
    }
    sparkle(fxx, ROW[2], HOOK_Y, t, HOOK.w[2] + 0.1, { n: 8, rad: 130, seed: 3, size: 24, cols: [m.col, VIOLET, '#fff3e0'] })
    if (t > m.S && t < m.out + 0.4) {
      const k = sp(t, m.S + 0.1, 0.45, 2.0) * out(t, m.out, 0.25)
      const dr = ease.inOutCubic(prog(t, m.S + 0.15, m.S + 0.7))
      const f1 = ease.inOutCubic(prog(t, m.act, m.act + 0.42)), f2 = ease.inOutCubic(prog(t, m.act2, m.act2 + 0.42))
      const fl = Math.cos(Math.PI * (f1 + f2))
      const hop = 40 * (bump(t, m.act, 0.42) + bump(t, m.act2, 0.42))
      shuffle(bx, SHUF.x, SHUF.y - hop + 8 * Math.sin(t * 2.1), SHUF.s * k * (1 + 0.08 * (bump(t, m.act, 0.42) + bump(t, m.act2, 0.42))), { draw: dr, flip: Math.abs(fl) < 0.04 ? 0.04 * Math.sign(fl || 1) : fl, col: f1 > 0.5 && f2 < 0.5 ? VIOLET : m.col, col2: f1 > 0.5 && f2 < 0.5 ? m.col : VIOLET, glow: bump(t, m.act, 0.8) + bump(t, m.act2, 0.8) })
      sparkle(fxx, SHUF.x, SHUF.y, t, m.act + 0.25, { n: 12, rad: 300, seed: 31, size: 30, cols: [m.col, VIOLET, '#fff3e0'] })
      sparkle(fxx, SHUF.x, SHUF.y, t, m.act2 + 0.25, { n: 12, rad: 300, seed: 32, size: 30, cols: [m.col, VIOLET, '#fff3e0'] })
    }
  }

  function drawChips(t) {
    M.forEach((m, mi) => {
      if (t < m.S || t > m.out + 0.5) return
      m.signs.forEach((si, i) => {
        const s = SIGNS[si], t0 = m.S + 0.2 + i * 0.07
        const k = sp(t, t0, 0.4, 2.2) * out(t, m.out + i * 0.04, 0.25)
        if (k <= 0) return
        let x = CHIP_X(i), y = CHIP_Y, lit = 0, lockK = 0, ring = 0
        if (mi === 0) { const b = bump(t, m.act + 0.1 + i * 0.07, 0.4); y -= 46 * b; lit = b }
        if (mi === 1) { lockK = sp(t, m.act + 0.12 + i * 0.06, 0.35, 2.6); ring = bump(t, m.act + 0.08 + i * 0.06, 0.5) }
        if (mi === 2) { const p = slotPos(i, t, m); x = p.x; y = p.y; lit = Math.max(bump(t, m.sh1, 0.45), bump(t, m.sh2, 0.45)) * 0.6 }
        chip(bx, x, y, k, s, { lit, lockK, ring })
        sparkle(fxx, x, y, t, t0 + 0.1, { n: 6, rad: 110, seed: 100 + mi * 10 + i, size: 20, cols: [s.color, '#fff3e0'] })
      })
    })
  }

  function drawEnd(t) {
    if (t < END.icons[0]) return
    const F = END.fire
    const hop = i => 34 * bump(t, F + i * 0.09, 0.4)
    const ks = END.icons.map(t0 => sp(t, t0, 0.45, 2.4))
    startButton(bx, ROW[0], END_Y + 70 + bob(t, 0) - hop(0), IS * ks[0], { press: bump(t, F, 0.3), col: M[0].col, glow: bump(t, F, 0.9) })
    const lift = t < F - 0.12 ? 1 : 1 - ease.outBack(prog(t, F - 0.12, F))
    padlock(bx, ROW[1], END_Y - 50 + bob(t, 1) - hop(1), IS * ks[1], { lift: clamp(lift, -0.1, 1), col: M[1].col, squash: bump(t, F, 0.3), glow: bump(t, F, 0.9) })
    shuffle(bx, ROW[2], END_Y + bob(t, 2) - hop(2), IS * ks[2], { flip: Math.cos(2 * Math.PI * ease.inOutCubic(prog(t, F, F + 0.5))), col: M[2].col, col2: VIOLET, glow: bump(t, F, 0.9) })
    END.icons.forEach((t0, i) => sparkle(fxx, ROW[i], END_Y, t, t0 + 0.1, { n: 8, rad: 130, seed: 200 + i, size: 24, cols: [M[i].col, '#fff3e0', '#ffd98a'] }))
    ROW.forEach((x, i) => sparkle(fxx, x, END_Y - 20, t, F + 0.05 + i * 0.09, { n: 12, rad: 210, seed: 210 + i, size: 30 }))
    // a gold arc joining the team
    const ja = ease.inOutCubic(prog(t, F + 0.1, F + 0.6))
    if (ja > 0) {
      bx.save(); bx.globalAlpha = 0.75 * out(t, T_OUT, 0.5); bx.strokeStyle = GOLD; bx.lineWidth = 7; bx.lineCap = 'round'; bx.shadowColor = GOLD; bx.shadowBlur = 18; bx.setLineDash([2, 22])
      bx.beginPath(); bx.ellipse(540, END_Y + 40, 470, 300, 0, Math.PI * (1 - ja), Math.PI); bx.stroke()
      bx.beginPath(); bx.ellipse(540, END_Y + 40, 470, 300, 0, 0, Math.PI * ja); bx.stroke(); bx.restore()
    }
    // pixel-star shower
    fxx.save(); fxx.imageSmoothingEnabled = false
    for (const p of SHOWER) {
      const tau = t - F - p.d
      if (tau <= 0) continue
      const y = -40 + p.v * tau, xx = p.x + 30 * Math.sin(tau * 2 + p.sw)
      if (y > H + 40) continue
      fxx.globalAlpha = 0.9 * (0.6 + 0.4 * Math.sin(tau * 5 + p.sw))
      drawPixelStar(fxx, xx, y, p.sz, (Math.round(t * 30 + p.sw * 5) >> 2) % 6 === 0 ? 2 : p.kind, p.col)
    }
    fxx.restore()
  }

  return {
    start: 0, end: DURATION + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      drawSky(bx, t, t < 3 ? { ...SKY_H, zoom: lerp(1.58, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H)
      fxx.clearRect(0, 0, W, H)

      drawChips(t)
      drawButton(t); drawLock(t); drawShuffle(t)
      drawEnd(t)

      // copy
      hook.forEach((w, i) => popWord(w, t, HOOK.w[i], i === 2 ? { back: 2.8, dur: 0.38, wobble: true, out: HOOK.out } : { out: HOOK.out }))
      M.forEach((m, i) => {
        popWord(heads[i][0], t, m.S + 0.05, { back: 2.6, dur: 0.36, wobble: true, out: m.out })
        punches[i].forEach((w, j) => popWord(w, t, m.punchT + j * 0.07, { out: m.out + j * 0.02, wobble: j === punches[i].length - 1 }))
      })
      endW.forEach((w, i) => popWord(w, t, i < 3 ? END.t + i * 0.08 : END.all + (i - 3) * 0.1, i >= 3 ? { back: 2.8, dur: 0.36, wobble: true } : {}))
      labels.forEach((l, i) => { const p = prog(t, END.icons[i] + 0.15, END.icons[i] + 0.45); l.style.opacity = String(clamp(p * 2)); l.style.transform = `scale(${lerp(0.6, 1, easeOutBack(p, 2.4))})` })
      sparkle(fxx, 540, 450, t, END.all + 0.2, { n: 14, rad: 300, seed: 77, size: 34 })

      drawGrain(gx, t)
      black.style.opacity = String(t < 1 ? 1 - ease.inOutQuad(prog(t, 0, 0.4)) : t >= T_END - 0.035 ? 1 : ease.inOutQuad(prog(t, T_OUT, T_END)))
    },
  }
}

export const SCENES = [build]

// ── sound
const r3 = v => +v.toFixed(3)
export const CUES = [
  // hook: one pop per word, rising
  ['pop', HOOK.w[0], 784, 0.06, -0.3], ['pop', HOOK.w[1], 988, 0.06, 0], ['pop', HOOK.w[2], 1318.51, 0.07, 0.3], ['pluck', HOOK.w[2], 659.25, 0.05, 0.6, 0.3], ['glitter', HOOK.w[2], HOOK.w[2] + 0.5],
  ['tick', HOOK.act[0], 0.05], ['pop', HOOK.act[0], 587.33, 0.045, -0.3],
  ['tick', HOOK.act[1], 0.06], ['pop', HOOK.act[1], 739.99, 0.045, 0],
  ['whoosh', HOOK.act[2], 0.4, 0.03], ['pop', r3(HOOK.act[2] + 0.2), 880, 0.045, 0.3],
  ['whoosh', HOOK.out, 0.4, 0.035],
  // three modalities
  ...M.flatMap((m, mi) => [
    ['pop', r3(m.S + 0.05), [659.25, 739.99, 880][mi], 0.065, 0],
    ...m.signs.map((_, i) => ['pop', r3(m.S + 0.2 + i * 0.07), [880, 988, 1108.73, 1318.51][i], 0.03, (i - 1.5) * 0.2]),
    ...m.punch.map((_, j) => ['pop', r3(m.punchT + j * 0.07), [740, 880, 988, 1174.66][j], 0.035, 0]),
    ['whoosh', r3(m.out - 0.05), 0.35, 0.03],
  ]),
  // cardinal: cursor glides in, press, ▶ pops
  ['whoosh', r3(M[0].S - 0.15), 0.45, 0.035],
  ['whoosh', r3(M[0].act - 0.45), 0.4, 0.025], ['tick', M[0].act, 0.07], ['pluck', M[0].act, 293.66, 0.06, 0.7, 0], ['pop', r3(M[0].act + 0.08), 1174.66, 0.07, 0.1], ['glitter', M[0].act + 0.1, M[0].act + 0.7],
  ...[0, 1, 2, 3].map(i => ['pop', r3(M[0].act + 0.1 + i * 0.07), [587.33, 739.99, 880, 1174.66][i], 0.03, (i - 1.5) * 0.25]),
  // fixed: shackle drops, CLICK, the loop arrow swishes round
  ['pop', r3(M[1].S + 0.1), 587.33, 0.05, 0],
  ['tick', M[1].act, 0.09], ['pop', M[1].act, 440, 0.06, 0], ['bell', r3(M[1].act + 0.03), 1318.51, 0.035, 1.2, 0.2], ['glitter', M[1].act, M[1].act + 0.5],
  ...[0, 1, 2, 3].map(i => ['tick', r3(M[1].act + 0.12 + i * 0.06), 0.035]),
  ['whoosh', r3(M[1].act + 0.3), 0.6, 0.03],
  // mutable: arrows draw in, flips, chip shuffles
  ['whoosh', r3(M[2].S + 0.15), 0.5, 0.03],
  ['pop', M[2].act, 988, 0.06, -0.2], ['whoosh', M[2].act, 0.4, 0.03], ['pop', M[2].act2, 1174.66, 0.06, 0.2], ['whoosh', M[2].act2, 0.4, 0.03],
  ...[M[2].sh1, M[2].sh2].flatMap((s, k) => [0, 1, 2, 3].map(i => ['tick', r3(s + 0.1 + i * 0.08), 0.03])),
  ['pluck', M[2].sh1, 440, 0.04, 0.4, -0.2],
  // end
  ...[659.25, 739.99, 880].map((f, i) => ['pop', r3(END.t + i * 0.08), f, 0.05, (i - 1) * 0.15]),
  ['pop', END.all, 1174.66, 0.065, -0.1], ['pop', r3(END.all + 0.1), 1318.51, 0.07, 0.1], ['bell', r3(END.all + 0.1), 1318.51, 0.03, 1.4, 0], ['glitter', END.all + 0.15, END.all + 0.7],
  ...END.icons.map((t0, i) => ['pop', t0, [587.33, 739.99, 880][i], 0.045, (i - 1) * 0.4]),
  ['tick', END.fire, 0.06], ['boom', END.fire, 0.1], ['pluck', END.fire, 293.66, 0.05, 0.9, 0], ['glitter', END.fire, END.fire + 1.4],
  ...[1046.5, 1318.51, 1568, 1760].map((f, i) => ['pop', r3(END.fire + 0.05 + i * 0.09), f, 0.035, (i - 1.5) * 0.3]),
  ['bell', r3(T_OUT + 0.05), 293.66, 0.03, 2.4, 0],
]
