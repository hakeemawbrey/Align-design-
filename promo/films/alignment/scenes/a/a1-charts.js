// alignment v2 · part A (0–20.2): "Two charts walk into a date." → "Meet the charts." → "Now stack them." → H.
// Two wheels bounce in from the sides (yours top-left, Juniper's bottom-right, each with a bold legend beside it); the
// placements pop on, on the beat, with sparkle bursts; then the wheels wind up, SLAM together into the big central wheel
// (squash and settle, shockwave, glitter), the placements bounce onto their tracks (you outside, Juniper inside), hold,
// pop off, and the frame is exactly H (wheel.js) from 19.5.
import { clamp, lerp, prog, ease, el } from '../../../../src/lib.js'
import { W, H, fill, SANS, MONO } from '../../../../src/scenes/common.js'
import { drawSky, layerCanvas } from '../../../sky.js'
import { SIGNS, WHEEL, SKY_H, GRAIN_H, TYPE, easeOutBack, ptOf, angOf, drawWheelH } from '../../../wheel.js'
import { PLACEMENTS, TINT, TINT_RGB, TRACK, drawOrb, drawSignWash, drawTrack, drawOrbLabel, drawTick, drawSparkle } from './placements.js'
import { grainLayer, popWords, BONE, CAP_SHADOW } from './text.js'

const START = 0, END = 20.2
const BODIES = ['sun', 'moon', 'rising']
const BEAT = n => 0.6 + n * 0.5556            // 108 bpm

// ── timings
export const T = {
  black: [0, 0.5],
  eyebrow: [0.25, 3.8, 4.05],
  head1: [0.6, 3.8, 4.05],                    // "Two charts walk into a date."
  inYou: [BEAT(1), 0.75], inHer: [BEAT(2), 0.75],   // wheels bounce in (start, dur)
  head2: [4.15, 10.5, 10.75],                 // "Meet the charts."
  youLabel: BEAT(8) - 0.3, youOrbs: [BEAT(8), BEAT(9), BEAT(10)],
  herLabel: BEAT(12) - 0.3, herOrbs: [BEAT(12), BEAT(13), BEAT(14)],
  labelsOut: [10.35, 10.65],
  head3: [10.85, 18.5, 18.75],                // "Now stack them."
  windUp: [11.75, 12.1], slam: [12.1, BEAT(21)], // impact on the beat (12.27)
  squash: 0.95,
  tracks: [12.5, 13.1],
  punch: [13.0, 18.35, 18.6],                 // "You outside. Juniper inside."
  hello: [BEAT(26), BEAT(27), BEAT(28), BEAT(30), BEAT(31), BEAT(32)],   // little hello bounces (you, then her)
  clear: [18.75, 19.45],                      // placements pop off → H
}
const IMPACT = T.slam[1]
const ORB_IN = 0.42

// ── small-wheel layout (same proportions as H, ~r 210)
const SMALL = 210 / WHEEL.rOut
const POS = { you: { cx: 316, cy: 820 }, juniper: { cx: 764, cy: 1420 } }
const FROM = { you: -340, juniper: W + 340 }

/** the wheel at scale s on geometry G (cx, cy, rOut…), screen-px line widths; at s = 1 it matches drawWheelH */
function drawWheel(ctx, G, s, k = 1) {
  if (k <= 0) return
  ctx.save()
  SIGNS.forEach((sg, i) => {
    const a0 = angOf(i * 30), a1 = angOf(i * 30 + 30)
    ctx.globalAlpha = 0.16 * k; ctx.fillStyle = sg.color
    ctx.beginPath(); ctx.arc(G.cx, G.cy, G.rOut, a1, a0); ctx.arc(G.cx, G.cy, G.rIn, a0, a1, true); ctx.closePath(); ctx.fill()
  })
  const lw = Math.max(s, 0.8)
  ctx.globalAlpha = WHEEL.alpha * k
  ctx.strokeStyle = BONE; ctx.lineWidth = 4 * lw
  ctx.beginPath(); ctx.arc(G.cx, G.cy, G.rOut, 0, Math.PI * 2); ctx.stroke()
  ctx.lineWidth = 3 * lw
  ctx.beginPath(); ctx.arc(G.cx, G.cy, G.rIn, 0, Math.PI * 2); ctx.stroke()
  for (let i = 0; i < 12; i++) {
    const a = ptOf(i * 30, G.rIn, G), b = ptOf(i * 30, G.rOut, G)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  ctx.font = `bold ${Math.round(58 * Math.max(s, 0.66))}px 'EB Garamond', 'Segoe UI Symbol', 'Noto Sans Symbols', serif`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  SIGNS.forEach((sg, i) => {
    const p = ptOf(i * 30 + 15, G.rGlyph, G)
    ctx.globalAlpha = k; ctx.fillStyle = sg.color
    ctx.fillText(sg.glyph + '︎', p.x, p.y)
  })
  ctx.restore()
}

/** damped spring wobble: 0 at x=0, decays to 0 by x=1 */
const wobble = (x, f = 2.2) => (x <= 0 || x >= 1) ? 0 : Math.exp(-5 * x) * Math.sin(2 * Math.PI * f * x)

export default function build(stage) {
  const root = fill(stage, { background: '#05040c' })
  const skyC = layerCanvas(root), sx = skyC.getContext('2d')
  const dC = layerCanvas(root), dx = dC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000', zIndex: '3500', pointerEvents: 'none' }, root)
  const grain = grainLayer(root, GRAIN_H)

  // ── copy
  const eyebrow = el('div', { position: 'absolute', left: 0, width: W + 'px', top: (TYPE.eyebrowY - 24) + 'px', textAlign: 'center', font: TYPE.eyebrow, letterSpacing: '0.25em', textIndent: '0.25em', color: '#f2c75c', textShadow: CAP_SHADOW, opacity: 0, zIndex: '3000' }, root, 'COMPATIBILITY 101')
  const headBox = { left: '70px', width: (W - 140) + 'px', top: (TYPE.headY - 18) + 'px', zIndex: '3000' }
  const head1 = popWords(root, [['Two'], ['charts'], ['walk'], ['into'], ['a'], ['date.', '#f59cc4']], headBox, T.head1[0])
  const head2 = popWords(root, [['Meet'], ['the'], ['charts.', '#f2c75c']], headBox, T.head2[0])
  const head3 = popWords(root, [['Now'], ['stack', '#f2c75c'], ['them.']], headBox, T.head3[0])
  const punch = popWords(root, [['You', TINT.you, 'sans'], ['outside.'], ['Juniper', TINT.juniper, 'sans'], ['inside.']],
    { left: '70px', width: (W - 140) + 'px', top: '1590px', zIndex: '3000' }, T.punch[0], { font: TYPE.sub, accentFont: TYPE.sub, line: 1.12 })

  // legends beside each small wheel: NAME, then one line per placement popping in with its orb
  const legend = (who, name, left, top, align) => {
    const box = el('div', { position: 'absolute', left: left + 'px', top: top + 'px', width: '440px', textAlign: align, zIndex: '3000' }, root)
    const nm = el('div', { font: "700 36px 'Space Mono', monospace", letterSpacing: '0.25em', color: TINT[who], textShadow: CAP_SHADOW, opacity: 0, marginBottom: '10px', transformOrigin: align === 'left' ? '0 50%' : '100% 50%' }, box, name)
    const rows = BODIES.map(b => {
      const p = PLACEMENTS[who][b], word = { sun: 'Sun', moon: 'Moon', rising: 'Rising' }[b]
      const sg = SIGNS.find(s => s.id === p.sign)
      return el('div', { font: `700 48px ${SANS}`, lineHeight: 1.18, color: BONE, textShadow: CAP_SHADOW, opacity: 0, whiteSpace: 'nowrap', transformOrigin: align === 'left' ? '0 50%' : '100% 50%' }, box,
        `<span style="color:${sg.color}">${p.name}</span> ${word}`)
    })
    return { box, nm, rows }
  }
  const youL = legend('you', 'YOU', 582, POS.you.cy - 118, 'left')
  const herL = legend('juniper', 'JUNIPER', 58, POS.juniper.cy - 118, 'right')

  const pop = (t, t0, d = 0.3) => easeOutBack(prog(t, t0, t0 + d))

  // geometry of each person's wheel at time t → { G, s, rot }
  function wheelState(who, t) {
    const [t0, d] = who === 'you' ? T.inYou : T.inHer
    const pIn = prog(t, t0, t0 + d)
    const xIn = lerp(FROM[who], POS[who].cx, easeOutBack(pIn, 1.4))
    const rot = (who === 'you' ? -1 : 1) * 0.9 * (1 - easeOutBack(pIn, 1.2))
    let cx = xIn, cy = POS[who].cy, s = SMALL
    // wind-up: pull apart a touch, then slam to the centre (accelerating)
    const wu = ease.inOutQuad(prog(t, ...T.windUp)) * (1 - prog(t, T.slam[0], T.slam[0] + 0.01))
    const dir = who === 'you' ? -1 : 1
    cx += dir * 26 * wu; cy += dir * 30 * wu; s *= 1 - 0.04 * wu
    const m = ease.inCubic(prog(t, ...T.slam))
    if (t >= T.slam[0]) { cx = lerp(POS[who].cx + dir * 26, WHEEL.cx, m); cy = lerp(POS[who].cy + dir * 30, WHEEL.cy, m); s = lerp(SMALL * 0.96, 1, m) }
    const G = { cx, cy, rOut: WHEEL.rOut * s, rIn: WHEEL.rIn * s, rGlyph: WHEEL.rGlyph * s }
    return { G, s, rot, m, pIn }
  }

  return {
    start: START, end: END, root,
    update(t) {
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      black.style.display = t < T.black[1] ? 'block' : 'none'
      drawSky(sx, t, SKY_H)

      // ── copy
      const eb = pop(t, T.eyebrow[0], 0.35), ebOut = 1 - ease.inQuad(prog(t, T.eyebrow[1], T.eyebrow[2]))
      eyebrow.style.opacity = String(clamp(prog(t, T.eyebrow[0], T.eyebrow[0] + 0.15)) * ebOut)
      eyebrow.style.transform = `scale(${(0.7 + 0.3 * eb).toFixed(4)})`
      head1.update(t, T.head1); head2.update(t, T.head2); head3.update(t, T.head3); punch.update(t, T.punch)
      const lOut = 1 - ease.inQuad(prog(t, ...T.labelsOut))
      for (const [L, t0, orbs] of [[youL, T.youLabel, T.youOrbs], [herL, T.herLabel, T.herOrbs]]) {
        const on = t >= t0 - 0.05 && t < T.labelsOut[1] + 0.05
        L.box.style.display = on ? 'block' : 'none'
        if (!on) continue
        const pn = pop(t, t0, 0.32)
        L.nm.style.opacity = String(clamp(prog(t, t0, t0 + 0.12)) * lOut)
        L.nm.style.transform = `scale(${(0.6 + 0.4 * pn).toFixed(4)})`
        L.rows.forEach((r, i) => {
          const p = pop(t, orbs[i] + 0.04, 0.3)
          r.style.opacity = String(clamp(prog(t, orbs[i] + 0.04, orbs[i] + 0.16)) * lOut)
          r.style.transform = `translateY(${((1 - p) * 26).toFixed(2)}px) scale(${(0.6 + 0.4 * p).toFixed(4)})`
        })
      }

      // ── diagram
      dx.clearRect(0, 0, W, H)
      if (t >= T.clear[1]) { drawWheelH(dx); grain.update(t); return }   // exactly H
      const merged = t >= IMPACT

      // squash and settle after the impact (about the wheel centre)
      const sqx = (t - IMPACT) / T.squash
      const sq = merged ? 0.075 * wobble(sqx, 2.1) : 0

      if (merged) {
        dx.save()
        dx.translate(WHEEL.cx, WHEEL.cy); dx.scale(1 + sq, 1 - sq); dx.translate(-WHEEL.cx, -WHEEL.cy)
        drawWheelH(dx)
        // occupied signs light up (fading as the placements leave)
        for (const who of ['you', 'juniper']) for (const b of BODIES) drawSignWash(dx, PLACEMENTS[who][b].sign, 0.5 * (1 - ease.inOutQuad(prog(t, ...T.clear))))
        const trK = ease.inOutQuad(prog(t, ...T.tracks)) * (1 - ease.inOutQuad(prog(t, ...T.clear)))
        drawTrack(dx, 'you', trK); drawTrack(dx, 'juniper', trK)
        dx.restore()
        // shockwave + sparkles round the rim
        const sw = prog(t, IMPACT, IMPACT + 0.7)
        if (sw > 0 && sw < 1) {
          dx.save(); dx.globalAlpha = 0.55 * (1 - sw) * (1 - sw); dx.strokeStyle = '#fff1d8'; dx.lineWidth = 8 * (1 - sw) + 2
          dx.shadowColor = '#f2c75c'; dx.shadowBlur = 24
          dx.beginPath(); dx.arc(WHEEL.cx, WHEEL.cy, WHEEL.rOut + 20 + 170 * ease.outCubic(sw), 0, Math.PI * 2); dx.stroke(); dx.restore()
          for (let i = 0; i < 12; i++) {
            const p = ptOf(i * 30 + 15, WHEEL.rOut + 10, WHEEL)
            drawSparkle(dx, p.x, p.y, prog(t, IMPACT + i * 0.012, IMPACT + 0.75 + i * 0.012), { n: 4, dist: 70, colors: [SIGNS[i].color, '#fff3d6'], size: 21, seed: i + 3 })
          }
        }
      } else {
        // two small wheels (hers fades into yours over the last of the slam so the one wheel is never doubled)
        for (const who of ['juniper', 'you']) {
          const st = wheelState(who, t)
          const k = who === 'juniper' ? 1 - ease.inOutQuad(prog(st.m, 0.55, 1)) : 1
          if (st.pIn <= 0) continue
          dx.save()
          dx.translate(st.G.cx, st.G.cy); dx.rotate(st.rot)
          // landing squash
          const ls = 0.06 * wobble(prog(t, (who === 'you' ? T.inYou : T.inHer)[0] + 0.45, (who === 'you' ? T.inYou : T.inHer)[0] + 1.3), 2)
          dx.scale(1 + ls, 1 - ls)
          const G0 = { ...st.G, cx: 0, cy: 0 }
          // soft glow behind
          const gr = dx.createRadialGradient(0, 0, G0.rIn * 0.2, 0, 0, G0.rOut * 1.4)
          gr.addColorStop(0, `rgba(${TINT_RGB[who]},${0.1 * (1 - st.m)})`); gr.addColorStop(1, 'rgba(0,0,0,0)')
          dx.fillStyle = gr; dx.beginPath(); dx.arc(0, 0, G0.rOut * 1.4, 0, Math.PI * 2); dx.fill()
          drawWheel(dx, G0, st.s, k)
          const orbs = who === 'you' ? T.youOrbs : T.herOrbs
          BODIES.forEach((b, i) => drawSignWash(dx, PLACEMENTS[who][b].sign, 0.5 * clamp(prog(t, orbs[i], orbs[i] + 0.2)) * k, G0))
          dx.restore()
        }
      }

      // ── the placements (they ride their wheels; after the impact each bounces onto its track)
      for (const who of ['you', 'juniper']) {
        const orbs = who === 'you' ? T.youOrbs : T.herOrbs
        const st = merged ? null : wheelState(who, t)
        BODIES.forEach((b, i) => {
          const pIn = prog(t, orbs[i], orbs[i] + ORB_IN)
          if (pIn <= 0) return
          const idx = (who === 'you' ? 0 : 3) + i
          const off0 = T.clear[0] + idx * 0.09, pOff = prog(t, off0, off0 + 0.28)
          if (pOff >= 1) return
          let x, y, s, G
          const lon = PLACEMENTS[who][b].lon
          if (merged) {
            G = WHEEL
            const bx = (t - IMPACT - 0.04 * idx) / 0.8
            const rr = TRACK[who] * (1 + (who === 'you' ? 0.05 : -0.08) * wobble(bx, 1.8))
            const p = ptOf(lon, rr, WHEEL)
            x = WHEEL.cx + (p.x - WHEEL.cx) * (1 + sq); y = WHEEL.cy + (p.y - WHEEL.cy) * (1 - sq)
            s = 1
          } else {
            G = st.G
            const a = angOf(lon) + st.rot, r = TRACK[who] * st.s
            x = G.cx + Math.cos(a) * r; y = G.cy + Math.sin(a) * r
            s = lerp(0.62, 1, st.m)
          }
          // pop in (overshoot), hello bounce, pop off
          const hi = T.hello[idx], hb = 0.28 * Math.sin(Math.PI * prog(t, hi, hi + 0.36))
          const sIn = easeOutBack(pIn, 2.4), sOff = 1 - ease.inCubic(pOff) * 1, preOff = 1 + 0.18 * Math.sin(Math.PI * clamp(pOff * 2))
          const size = s * sIn * (1 + hb) * (pOff > 0 ? sOff * (pOff < 0.5 ? preOff : 1) : 1)
          const k = clamp(pIn * 4) * (1 - ease.inQuad(pOff))
          if (merged) drawTick(dx, who, b, ease.inOutQuad(prog(t, IMPACT + 0.25, IMPACT + 0.6)) * (1 - ease.inQuad(pOff)))
          else {
            dx.save(); dx.translate(G.cx, G.cy); dx.rotate(st.rot)
            drawTick(dx, who, b, ease.inOutQuad(prog(t, orbs[i] + 0.15, orbs[i] + 0.4)) * (1 - ease.inOutQuad(prog(t, T.windUp[0], T.slam[0] + 0.1))), { ...G, cx: 0, cy: 0 })
            dx.restore()
          }
          drawOrb(dx, x, y, who, { k, s: size, t, seed: 10 + idx })
          drawSparkle(dx, x, y, prog(t, orbs[i] + 0.04, orbs[i] + 0.7), { n: 8, dist: 90 * s, colors: [TINT[who], '#fff3d6', '#f2c75c'], size: 21, seed: idx + 1 })
          drawSparkle(dx, x, y, prog(t, off0 + 0.1, off0 + 0.6), { n: 6, dist: 60, colors: [TINT[who], '#fff3d6'], size: 14, seed: idx + 7 })
          // tag
          const lk = merged ? 0 : clamp(prog(t, orbs[i] + 0.18, orbs[i] + 0.35)) * (1 - ease.inOutQuad(prog(t, T.windUp[0], T.slam[0] + 0.1)))
          if (merged) drawOrbLabel(dx, who, b, ease.inOutQuad(prog(t, IMPACT + 0.3, IMPACT + 0.65)) * (1 - ease.inQuad(pOff)), WHEEL, 1 * (1 + 0.5 * hb))
          else if (lk > 0) {
            dx.save(); dx.translate(G.cx, G.cy); dx.rotate(st.rot)
            drawOrbLabel(dx, who, b, lk, { ...G, cx: 0, cy: 0 }, 0.72 * easeOutBack(prog(t, orbs[i] + 0.18, orbs[i] + 0.45)))
            dx.restore()
          }
        })
      }
      grain.update(t)
    },
  }
}

export const cues = [
  ['pop', T.eyebrow[0], 700, 0.04, 0],
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', T.head1[0] + i * 0.07, [660, 740, 830, 880, 990, 1320][i], i === 5 ? 0.06 : 0.035, 0]),
  ['whoosh', T.inYou[0] - 0.1, 0.6, 0.05], ['pluck', T.inYou[0] + 0.45, 293.66, 0.05, 0.45, -0.3],
  ['whoosh', T.inHer[0] - 0.1, 0.6, 0.05], ['pluck', T.inHer[0] + 0.45, 369.99, 0.05, 0.45, 0.3],
  ...[0, 1, 2].map(i => ['pop', T.head2[0] + i * 0.07, [740, 880, 1175][i], 0.04, 0]),
  ['pop', T.youLabel, 600, 0.04, -0.25],
  ...T.youOrbs.map((t, i) => ['pop', t, [880, 990, 1175][i], 0.06, -0.25]),
  ['pop', T.herLabel, 660, 0.04, 0.25],
  ...T.herOrbs.map((t, i) => ['pop', t, [1110, 1320, 1480][i] * 0.9, 0.06, 0.25]),
  ...[0, 1, 2].map(i => ['pop', T.head3[0] + i * 0.07, [740, 990, 880][i], 0.04, 0]),
  ['riser', T.windUp[0] - 0.4, IMPACT, 0.04],
  ['whoosh', T.slam[0], IMPACT - T.slam[0] + 0.05, 0.07],
  ['boom', IMPACT, 0.12],
  ['glitter', IMPACT, IMPACT + 1.0],
  ['bell', IMPACT + 0.05, 587.33, 0.025, 2.6, 0],
  ...[0, 1, 2, 3].map(i => ['pop', T.punch[0] + i * 0.07, [880, 990, 1110, 1320][i], 0.04, 0]),
  ...T.hello.map((t, i) => ['pluck', t, [587.33, 739.99, 880, 659.25, 830.61, 987.77][i], 0.035, 0.4, i < 3 ? -0.25 : 0.25]),
  ...[0, 1, 2, 3, 4, 5].map(i => ['pop', T.clear[0] + i * 0.09 + 0.1, 1320 - i * 110, 0.03, 0]),
]
