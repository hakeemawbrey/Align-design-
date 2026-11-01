// trickrun: CUTE, NOT AN ICK · "They run to catch up for a hug." (20 s vertical, Star Talk Trends §11.5, music: jazzy · F)
// Story 0–15.6, then the shared end card. The format look lives in ./ickkit.js (identical in all five films).
// THEM: ♋ Cancer (has never once walked toward a hug). ME: ♌ Leo (far too dignified to run… supposedly).
//   0.0–2.3    hook: "Should be an *ick…* | but it’s *them.*"  Cancer bounces on the spot, arms open; Leo heart-eyed.
//   2.3–5.2    MOMENT 1 "runs to catch up for a *hug.*"  The evening promenade. Cancer sprints in from off-screen,
//              speed lines, dust: "WAIT UP!!" → full-body hug. ICK? buzzer… flips to CUTE. Leo: squished → hearts.
//   5.2–8.1    MOMENT 2 "…even after *five minutes* apart."  A timestamp flips 7:02 → 7:07 PM. Cancer is back from the
//              snack cart, sprinting again, popcorn flying: "MISSED YOU!!" Hug. ICK? → CUTE.
//   8.1        card cut.
//   8.1–11.3   MOMENT 3 (the twist) "…now *I* run too."  SLOW-MO: both sprint in from opposite edges, meet in the
//              middle, heart burst. ICK? → CUTE.
//   11.35      stamp "NOT AN *ICK.*"  The hug holds. Pisces: SO CUTE.
//   11.95      ♌ Leo: "*Sprint* to me."
import { makeIck, tint, R, box, bubble, label, shadow, sparkles, hearts, confetti, speedLines, glowPool, drawBits, mitt, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, HOT, INTER, MONO, HEART, T } from './ickkit.js'

const CAN = signStar('cancer'), AQU = signStar('leo')
const CAN_L = tint(CAN.color, 0.55), AQU_L = tint(AQU.color, 0.55)

// ── the evening promenade: string lights, trees, a paved path
function promenade(x, t, scroll = 0) {
  for (let i = 0; i < 6; i++) { const bx = ((i * 210 - scroll * 0.5) % 1260 + 1260) % 1260 - 90; x.fillStyle = INK; x.beginPath(); x.arc(bx, 900, 110, 0, Math.PI * 2); x.fill(); x.fillStyle = i % 2 ? '#2f5c4a' : '#28503f'; x.beginPath(); x.arc(bx, 900, 104, 0, Math.PI * 2); x.fill(); R(x, INK, bx - 14, 900, 28, 150); R(x, '#5a3f34', bx - 8, 900, 16, 150) }
  // string lights
  x.strokeStyle = 'rgba(27,18,54,0.9)'; x.lineWidth = 4; x.beginPath()
  for (let i = 0; i <= 20; i++) { const xx = i * 54, yy = 520 + 60 * Math.sin(Math.PI * ((i % 10) / 10)); i ? x.lineTo(xx, yy) : x.moveTo(xx, yy) }
  x.stroke()
  for (let i = 0; i < 20; i++) { const xx = i * 54 + 27, yy = 528 + 60 * Math.sin(Math.PI * (((i % 10) + 0.5) / 10)), on = 0.7 + 0.3 * Math.sin(t * 3 + i); R(x, INK, xx - 9, yy - 3, 18, 22); R(x, [GOLD, PINK, '#7fd0ff'][i % 3], xx - 6, yy, 12, 16); glowPool(x, xx, yy + 8, 60, on * 0.6, '255,220,170') }
  R(x, INK, 0, 1044, 1080, 8); R(x, '#5f5a7c', 0, 1050, 1080, 250); R(x, '#4c4868', 0, 1050, 1080, 12)
  const off = ((-scroll) % 170 + 170) % 170
  for (let i = -1; i < 8; i++) R(x, '#4c4868', i * 170 + off, 1050, 6, 250)
}
function dust(x, t, cx, cy, dir, a = 1) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a
  for (let i = 0; i < 4; i++) { const p = (t * 3 + i / 4) % 1, s = 14 + p * 30; x.globalAlpha = a * 0.5 * (1 - p); R(x, '#cfc8e8', cx - dir * (40 + p * 120) - s / 2, cy - p * 40 - s / 2, s, s) }
  x.restore()
}
// a running star: leaned forward, quick hops, speed lines and dust behind
function runner(x, t, draw, F, o, dir, { speed = 1, lines = 1 } = {}) {
  speedLines(x, t * speed, o.x, o.y, dir, { a: lines })
  dust(x, t * speed, o.x, o.y + o.s * 0.5, dir, lines)
  x.save(); x.translate(o.x, o.y + o.s * 0.45); x.rotate(dir * 0.16); x.translate(-o.x, -(o.y + o.s * 0.45))
  draw(x, t, o)
  // arms flung back
  const Fr = F(t, o)
  mitt(x, Fr, -dir, { col: o.mittCol, dx: -dir * 10, dy: 30 + 12 * Math.sin(t * 20 * speed), rot: -dir * 0.6 })
  x.restore()
}
const hopsEvery = (a, b, gap) => { const out = []; for (let v = a; v < b; v += gap) out.push(+v.toFixed(3)); return out }

// a hug: two stars squeezed together, mittens wrapped around each other
function hug(x, t, S, cx, y, s, t0, { moodT = 'happy', moodM = 'heart', k = 1 } = {}) {
  const dt = t - t0, sq = dt > 0 && dt < 0.5 ? 0.14 * Math.exp(-dt * 6) * Math.cos(dt * 22) : 0
  const gap = s * 0.3 * k
  const oM = { x: cx + gap, y: y + 10, s: s * 0.92, pop: k, mood: moodM, look: [-1, 0], squash: sq + 0.04, hops: [t0] }
  const oT = { x: cx - gap, y, s, pop: k, mood: moodT, look: [1, 0], squash: sq + 0.04, hops: [t0] }
  S.me(x, t, oM)
  S.them(x, t, oT)
  const FT = S.themF(t, oT), FM = S.meF(t, oM)
  mitt(x, FT, 1, { col: CAN_L, dx: gap * 0.9, dy: 6 * FT.cell, rot: 0.5, k })
  mitt(x, FM, -1, { col: AQU_L, dx: -gap * 0.9, dy: 2 * FM.cell, rot: -0.5, k })
  hearts(x, t, t0 + 0.05, cx, y - s * 0.45, { n: 6, cell: 7 })
  sparkles(x, t, cx, y - 20, t0, 10, s * 0.75, 0.3, [PINK, GOLD, BONE])
}

// ── MOMENT 1: catch up for a hug
function m1(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  promenade(x, t)
  const arrive = 1.05
  if (u < arrive) {
    me(x, t, { x: 760, y: 970, s: 210, mood: u < 0.6 ? 'neutral' : 'wide', look: [-1, 0] })
    const cx = lerp(-200, 470, ease.inOutQuad(prog(u, 0.05, arrive)))
    const o = { x: cx, y: 960, s: 220, mood: 'sparkle', look: [1, 0], hops: hopsEvery(t0, t0 + arrive, 0.17), mittCol: CAN_L }
    runner(x, t, them, themF, o, 1)
  } else {
    shadow(x, 610, 1150, 330)
    hug(x, t, S, 610, 960, 220, t0 + arrive, { moodM: meMood(t) })
  }
  bubble(x, t, 280, 720, t0 + 0.15, t0 + 1.2, 'WAIT UP!!', { size: 46, tail: 0.4 })
  if (u > arrive && u < arrive + 0.6) label(x, 'SQUEEZE', 610, 760, { size: 44, col: PINK, font: INTER, weight: 800, rot: -0.08, alpha: 1 - prog(u, arrive + 0.4, arrive + 0.6) })
}

// ── MOMENT 2: five minutes later
const POP = ['.ww.w.', 'wwwwww', 'RWRWRW', 'RWRWRW', '.RWRW.']
function stampSticker(x, t, u) {
  const k = pop01(t, t - u + 0.05, 0.3, 2.4)
  const late = u > 0.35
  const fl = u > 0.28 && u < 0.42 ? Math.abs(Math.cos((u - 0.28) / 0.14 * Math.PI)) : 1
  x.save(); x.translate(260, 470); x.rotate(-0.05); x.scale(k, k * fl)
  box(x, -170, -48, 340, 96, BONE, { b: 6 })
  x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText(late ? '7:07 PM' : '7:02 PM', 0, 4)
  x.restore()
  if (late) label(x, '(five minutes later)', 260, 555, { size: 28, col: 'rgba(239,230,214,0.85)', font: INTER, weight: 800, alpha: clamp((u - 0.35) / 0.15) })
}
function m2(x, t, S) {
  const { u, them, me, themF, meMood, t0 } = S
  promenade(x, t)
  // the snack cart, far left
  box(x, 30, 900, 170, 120, '#e8344e', { b: 6 }); R(x, BONE, 30, 900, 170, 24); for (let i = 0; i < 4; i++) R(x, i % 2 ? BONE : '#e8344e', 30 + i * 43, 860, 43, 40)
  R(x, INK, 26, 856, 178, 6)
  const start = 0.4, arrive = 1.15
  if (u < arrive) {
    me(x, t, { x: 780, y: 970, s: 210, mood: 'neutral', look: [-1, 0] })
    const cx = lerp(120, 480, ease.inOutQuad(prog(u, start, arrive)))
    const o = { x: cx, y: 960, s: 220, mood: u < start ? 'neutral' : 'sparkle', look: [1, 0], hops: hopsEvery(t0 + start, t0 + arrive, 0.17), mittCol: CAN_L }
    if (u < start) them(x, t, o)
    else runner(x, t, them, themF, o, 1)
    drawBits(x, POP, { w: '#fff6d8', R: '#e8344e', W: BONE }, cx + 70, 940, 9, { rot: 0.2 })
    if (u > start) for (let i = 0; i < 5; i++) { const p = ((u - start) * 1.8 + i / 5) % 1; R(x, '#fff6d8', cx + 50 - p * 120 + i * 10, 880 - Math.sin(p * Math.PI) * 120, 12, 12) }
  } else {
    shadow(x, 620, 1150, 330)
    hug(x, t, S, 620, 960, 220, t0 + arrive, { moodM: meMood(t) })
  }
  stampSticker(x, t, u)
  bubble(x, t, 470, 700, t0 + 0.55, S.t1, 'MISSED YOU!!', { size: 46, tail: -0.2 })
}

// ── MOMENT 3: now I run too (slow-mo)
function m3(x, t, S) {
  const { u, them, me, themF, meF, t0 } = S
  const meet = 1.25
  const slow = u < meet ? 0.35 : 1
  promenade(x, t)
  // a soft slow-mo vignette
  x.save(); x.globalAlpha = 0.35 * (1 - prog(u, meet, meet + 0.3)); R(x, '#1a0f30', 0, 380, 1080, 920); x.restore()
  if (u < meet) {
    const p = ease.inOutQuad(prog(u, 0.05, meet))
    const oT = { x: lerp(-180, 430, p), y: 960, s: 220, mood: 'sparkle', look: [1, 0], hops: hopsEvery(t0, t0 + meet, 0.42), mittCol: CAN_L }
    const oM = { x: lerp(1260, 650, p), y: 970, s: 205, mood: 'happy', look: [-1, 0], hops: hopsEvery(t0 + 0.1, t0 + meet, 0.42), mittCol: AQU_L }
    runner(x, t, them, themF, oT, 1, { speed: slow, lines: 0.7 })
    runner(x, t, me, meF, oM, -1, { speed: slow, lines: 0.7 })
    const sk = pop01(t, t0 + 0.25, 0.3, 2.2)
    if (sk > 0.01) label(x, 'SLOW-MO · 0.5x', 540, 470, { size: 50 * sk, col: BONE, font: MONO, weight: 700 })
  } else {
    shadow(x, 540, 1150, 340)
    const mm = t < S.buzz ? 'happy' : t < S.flip ? 'squint' : 'heart'
    hug(x, t, S, 540, 960, 230, t0 + meet, { moodT: 'happy', moodM: mm })
    confetti(x, t, t0 + meet, 540, 860, { n: 30 })
    const hk = pop01(t, t0 + meet, 0.3, 2.6) * outK(t, [t0 + meet + 0.6, t0 + meet + 0.8])
    if (hk > 0.01) drawBits(x, HEART, { H: HOT }, 540, 760, 26 * hk)
  }
  bubble(x, t, 800, 720, t0 + 0.45, t0 + meet, 'coming!!', { size: 40, tail: 0.3 })
}

const EP = makeIck({
  id: 'trickrun', them: 'cancer', me: 'leo', meName: 'LEO', deep: '#1d7fb8', badge: CAN.color, accent: PINK,
  hook(x, t, S) { if (S.tk > 0.5) { const F = S.themF(t, { x: 700, y: 1000, s: 290, pop: S.tk, hops: [T.themIn + 0.35, T.swoon - 0.1, T.swoon + 0.35] }); mitt(x, F, 1, { col: CAN_L, dy: -4 * F.cell, rot: 0.6 }); mitt(x, F, -1, { col: CAN_L, dy: -4 * F.cell, rot: -0.6 }) } },
  moments: [
    { caption: 'runs to catch up for a *hug.*', draw: m1,
      cues: [['whoosh', 0.1, 0.9, 0.03], ...hopsEvery(0.05, 1.0, 0.17).map(h => ['tick', +h.toFixed(3), 0.025]), ['pop', 0.15, 1318.51, 0.04, -0.3], ['tom', 1.05, 90, { gain: 0.2, decay: 0.25 }], ['pop', 1.07, 987.77, 0.045, 0], ['glitter', 1.08, 1.4]] },
    { caption: '…even after *five minutes* apart.', draw: m2,
      cues: [['tick', 0.05, 0.04], ['whoosh', 0.28, 0.2, 0.02], ['tick', 0.35, 0.05], ['pop', 0.36, 1174.66, 0.035, -0.4], ...hopsEvery(0.4, 1.1, 0.17).map(h => ['tick', +h.toFixed(3), 0.025]),
        ['pop', 0.55, 1318.51, 0.04, 0], ['tom', 1.15, 90, { gain: 0.2, decay: 0.25 }], ['pop', 1.17, 987.77, 0.045, 0], ['glitter', 1.18, 1.5]] },
    { caption: '…now *I* run too.', draw: m3, badge: { x: 820, y: 470 },
      cues: [['riser', 0.1, 1.2, 0.014], ['tom', 0.1, 60, { gain: 0.15, decay: 0.6 }], ['tom', 0.52, 60, { gain: 0.15, decay: 0.6 }], ['tom', 0.94, 60, { gain: 0.15, decay: 0.6 }],
        ['pop', 0.45, 1174.66, 0.04, 0.4], ['boom', 1.25, 0.18], ['pop', 1.25, 1318.51, 0.05, 0], ['pluck', 1.3, 1760, 0.04, 0.6, 0], ['glitter', 1.25, 1.7]] },
  ],
  finale(x, t, S) {
    shadow(x, 520, 1150, 360 * S.ok)
    hug(x, t, S, 520, 950, 250, T.stamp + 0.02, { moodT: 'happy', moodM: 'heart', k: S.ok })
  },
  last: '*Sprint* to me.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [box, GOLD, INK]
