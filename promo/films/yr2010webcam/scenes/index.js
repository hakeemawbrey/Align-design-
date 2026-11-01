// yr2010webcam (20 s vertical, Star Talk Then vs Now · 25) "Lag can't stop us." · chiptune D.
// The format's shared look lives in ./tvn.js (identical in all five Block E films). Story 0–15.6, then the end card.
//   THEN 2010  "Long-distance | in *2010*"  ♑ Capricorn (side-swept bangs) at a chunky laptop with a clip-on webcam;
//              ♍ Virgo, far away, on a blocky low-res video window. Rule of three: (1) "connecting…", then Virgo in
//              about forty pixels (sticker "HD (hardly)"); (2) the delay: "hi!!"… "…hi!!", "you go" / "no YOU go"
//              (sticker "delay: 2 sec"); (3) Virgo laughs… and freezes mid-laugh, smeared, spinner and all (sticker
//              "frozen. mid-laugh."). Capricorn laughs at the frozen face and takes a screenshot. It reconnects:
//              hearts. ♓ Pisces, beside Capricorn, cries.
//   card cut   7.267, on the switch.
//   NOW 2026   "Long-distance | in *2026*"  A sleek laptop, a crisp video call (sticker "HD (actually)"). Virgo tells
//              a joke, they both crack up… and it freezes mid-laugh again, same face (sticker "still frozen.
//              sometimes."). Capricorn laughs harder: screenshot #2 slides into a little strip next to the 2010 one
//              (sticker "screenshot #2. same face."). Unfreezes: hearts; Pisces photobombs Virgo's call, sobbing.
//   PAYOFF     the 2010 polaroid top-left, NOW big. THE STARS: "same laugh. *better pixels.*"
//              Last: "*Lag* can't stop us."
import { makeTVN, BEAT, r3, INK, BONE, GOLD, PINK, HOT, INTER, MONO, clamp, lerp, prog, ease, easeOutBack, signStar } from './tvn.js'
import { drawStarChar } from '../../startalk.js'

const CAP = 'capricorn', VIR = signStar('virgo'), PIS = signStar('pisces')
const CP = { x: 225, y: 1275, s: 260 }
const LAP = { x: 650, top: 760, w: 560, h: 360 }      // the laptop screen rect (outer)
const SCR = { l: LAP.x - LAP.w / 2 + 22, t: LAP.top + 22, w: LAP.w - 44, h: LAP.h - 44 }

const TT = { conn: [0.7, 1.55], hi1: 2.45, hi2: 3.15, yg1: 3.55, yg2: 3.62, laugh: 4.0, freeze: 4.4, capLaugh: 4.75, shot: 5.1, unfreeze: 5.6, love: 5.8 }
const CUT = BEAT(12)
const NT = { in: CUT + 0.05, joke: 8.25, laugh: 8.95, freeze: 9.45, capLaugh: 9.8, shot: 10.2, unfreeze: 10.75, love: 10.95 }

let lo = null
const loCanvas = () => { if (!lo) { lo = document.createElement('canvas'); lo.width = 58; lo.height = 35 } return lo }

/** Virgo's room + Virgo, drawn into ctx at scale sc (1 = full screen size) */
function virgoScene(ctx, tt, sc, { mood = 'happy', look, hops = [], squash = 0, rot = 0, ghosts = 0, pisces = 0, tvT = tt } = {}) {
  const w = SCR.w * sc, h = SCR.h * sc
  ctx.fillStyle = '#e8b98a'; ctx.fillRect(0, 0, w, h)
  ctx.fillStyle = '#d29a6a'; ctx.fillRect(0, h * 0.72, w, h * 0.28)
  // a window with the moon, a plant, a poster
  ctx.fillStyle = '#1b1236'; ctx.fillRect(w * 0.08, h * 0.12, w * 0.24, h * 0.32); ctx.fillStyle = '#2c2452'; ctx.fillRect(w * 0.09, h * 0.135, w * 0.22, h * 0.29)
  ctx.fillStyle = '#fff3c0'; ctx.fillRect(w * 0.15, h * 0.2, w * 0.05, w * 0.05)
  ctx.fillStyle = '#5fc75a'; ctx.fillRect(w * 0.82, h * 0.5, w * 0.08, h * 0.22); ctx.fillStyle = '#a8693a'; ctx.fillRect(w * 0.83, h * 0.66, w * 0.06, h * 0.1)
  if (pisces > 0) { drawStarChar(ctx, w * 0.8, h * 0.42, 110 * sc, tvT, { color: PIS.color, mood: 'happy', seed: 6, pop: pisces, glow: 0.5, hops: [tvT - 0.1] }) }
  ctx.save(); ctx.translate(w * 0.5, h * 0.62); ctx.rotate(rot); ctx.translate(-w * 0.5, -h * 0.62)
  for (let g = ghosts; g >= 1; g--) drawStarChar(ctx, w * 0.5 - g * 26 * sc, h * 0.6 + g * 6 * sc, 250 * sc, tt, { color: VIR.color, mood, look, hops, seed: 3, squash, alpha: 0.35 / g, glow: 0 })
  drawStarChar(ctx, w * 0.5, h * 0.6, 250 * sc, tt, { color: VIR.color, glyph: sc > 0.6 ? VIR.glyph : null, mood, look, hops, seed: 3, squash, glow: 0.6 })
  ctx.restore()
}
function spinner(x, W, cx, cy, t, label) {
  W.panel(cx - 150, cy - 34, 300, 68, 'rgba(16,10,36,0.9)', { rim: BONE, P: 5 })
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + Math.floor(t * 10) * Math.PI / 4; W.px(cx - 112 + Math.cos(a) * 16 - 3, cy + Math.sin(a) * 16 - 3, 7, 7, `rgba(239,230,214,${0.25 + 0.75 * (i / 8)})`) }
  W.txt(label, cx + 22, cy + 2, { size: 24, color: BONE, shadow: false })
}
function bubble(x, W, t, cx, cy, t0, t1, text, { col = '#fffaf0', size = 30 } = {}) {
  const k = W.pop01(t, t0, 0.22, 2.6) * W.outK(t, [t1 - 0.12, t1])
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.font = `700 ${size}px ${MONO}`
  const w = x.measureText(text).width + 36, h = size + 26
  W.panel(-w / 2, -h / 2, w, h, col, { P: 5 })
  W.txt(text, 0, 2, { size, color: INK, shadow: false })
  x.restore()
}
function flash(x, t, t0) { const q = prog(t, t0, t0 + 0.35); if (q > 0 && q < 1) { x.fillStyle = `rgba(255,255,255,${0.85 * (1 - q)})`; x.fillRect(SCR.l, SCR.t, SCR.w, SCR.h) } }

const TVN = makeTVN({
  id: 'yr2010webcam', year: '2010', date: '11·03·2010',
  heads: { then: 'Long-distance | in *2010*', now: 'Long-distance | in *2026*', last: '*Lag* can’t | stop us.' },
  lastLate: 4,
  line: 'same laugh. *better pixels.*',
  stickers: [
    { text: 'HD (hardly)', at: 1.75, x: 240, y: 520, rot: -0.06, bg: '#fff1c8', size: 40 },
    { text: 'delay: 2 sec', at: 3.25, x: 250, y: 605, rot: 0.05 },
    { text: 'frozen. mid-laugh.', at: 4.6, x: 690, y: 1470, rot: -0.04, bg: '#d9f2ff', size: 42 },
    { text: 'HD (actually)', at: 7.9, x: 250, y: 520, rot: -0.06, bg: '#d9ffe6', size: 40 },
    { text: 'still frozen. sometimes.', at: 9.7, x: 300, y: 605, rot: 0.05, bg: '#d9f2ff' },
    { text: 'screenshot #2. same face.', at: 10.4, x: 640, y: 1500, rot: -0.04, bg: '#fff1c8' },
  ],
  freeze: 4.95, crop: [100, 560, 880],

  thenWorld(x, t, W) {
    const live = W.live
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = live ? W.pop01(t, 0.35, 0.4, 2) : 1
    // the chunky laptop + clip-on webcam
    const lk = live ? W.pop01(t, 0.45, 0.4, 2) : 1
    x.save(); x.translate(LAP.x, 1000); x.scale(lk, lk); x.translate(-LAP.x, -1000)
    W.panel(LAP.x - LAP.w / 2, LAP.top, LAP.w, LAP.h, '#4a4560', { P: 10 })
    W.px(LAP.x - LAP.w / 2 - 30, LAP.top + LAP.h, LAP.w + 60, 30, INK); W.px(LAP.x - LAP.w / 2 - 24, LAP.top + LAP.h + 4, LAP.w + 48, 20, '#8a84a3')
    W.px(LAP.x - LAP.w / 2 - 40, LAP.top + LAP.h + 30, LAP.w + 80, 44, INK); W.px(LAP.x - LAP.w / 2 - 34, LAP.top + LAP.h + 30, LAP.w + 68, 38, '#b9b4cc')
    for (let i = 0; i < 12; i++) W.px(LAP.x - LAP.w / 2 - 10 + i * 50, LAP.top + LAP.h + 38, 40, 10, '#8a84a3')
    // webcam on top
    W.panel(LAP.x - 44, LAP.top - 58, 88, 54, '#2d2a3a', { P: 6 }); W.px(LAP.x - 14, LAP.top - 46, 28, 28, '#11101a'); W.px(LAP.x - 6, LAP.top - 38, 12, 12, '#3f7cf0')
    if ((t * 2) % 1 < 0.5) W.px(LAP.x + 24, LAP.top - 46, 8, 8, '#ff3a3a')
    // the screen: connecting… → blocky Virgo
    W.px(SCR.l, SCR.t, SCR.w, SCR.h, '#0d1530')
    if (t < TT.conn[1]) {
      W.txt('connecting' + '.'.repeat(1 + Math.floor(t * 4) % 3), LAP.x, LAP.top + LAP.h / 2, { size: 30, color: '#9fc8ff', shadow: false })
    } else {
      const frozen = t > TT.freeze && t < TT.unfreeze
      const tt = frozen ? TT.freeze : t
      let mood = 'happy', look = [0, 0]
      if (tt < TT.hi2 + 0.6) mood = 'sparkle'
      if (tt > TT.yg2 && tt < TT.laugh) mood = 'wide'
      if (tt > TT.unfreeze) mood = 'heart'
      const hops = tt > TT.laugh && tt < TT.unfreeze ? [TT.laugh, TT.laugh + 0.14, TT.laugh + 0.28] : [TT.conn[1] + 0.2, TT.hi2, TT.yg2, TT.unfreeze + 0.05]
      const L = loCanvas(), lx = L.getContext('2d')
      lx.setTransform(1, 0, 0, 1, 0, 0); lx.clearRect(0, 0, L.width, L.height)
      lx.save(); lx.scale(L.width / SCR.w, L.width / SCR.w)
      virgoScene(lx, tt, 1, { mood: frozen ? 'squint' : mood, look, hops, squash: frozen ? -0.18 : 0, rot: frozen ? 0.22 : 0, ghosts: frozen ? 2 : 0 })
      lx.restore()
      x.save(); x.imageSmoothingEnabled = false; x.drawImage(L, SCR.l, SCR.t, SCR.w, SCR.h); x.restore()
      // a few macro-blocks of glitch while frozen
      if (frozen) {
        const s = Math.floor(t * 6)
        for (let i = 0; i < 6; i++) { const a = Math.sin(s * 12.9 + i * 78.2) * 0.5 + 0.5, b = Math.sin(s * 4.1 + i * 31.7) * 0.5 + 0.5; W.px(SCR.l + a * (SCR.w - 60), SCR.t + b * (SCR.h - 40), 60, 40, ['#5fd38a', '#ff8fb1', '#e8b98a'][i % 3]) }
        spinner(x, W, LAP.x, LAP.top + LAP.h - 80, t, 'frozen…')
      }
      flash(x, t, TT.shot)
      // self-view (Capricorn, tiny)
      W.px(SCR.l + SCR.w - 108, SCR.t + 10, 98, 72, INK); W.px(SCR.l + SCR.w - 104, SCR.t + 14, 90, 64, '#3a3166')
      drawStarChar(x, SCR.l + SCR.w - 59, SCR.t + 48, 54, t, { color: signStar(CAP).color, mood: 'happy', seed: 5, glow: 0 })
    }
    x.restore()
    // the delay chatter
    if (live) {
      bubble(x, W, t, CP.x + 40, CP.y - 190, TT.hi1, TT.yg1 - 0.05, 'hi!!')
      bubble(x, W, t, LAP.x + 120, LAP.top + 60, TT.hi2, TT.yg2 + 0.6, '...hi!!', { size: 26 })
      bubble(x, W, t, CP.x + 60, CP.y - 190, TT.yg1, TT.laugh, 'you go')
      bubble(x, W, t, LAP.x + 80, LAP.top + LAP.h - 50, TT.yg2, TT.laugh, 'no YOU go', { size: 26 })
    }
    // Capricorn
    let mood = 'happy', look = [1, -0.6]
    if (t > TT.hi1 && t < TT.hi2) mood = 'sparkle'
    if (t > TT.hi2 - 0.05 && t < TT.yg1) { mood = 'neutral'; look = [1, -0.6] }
    if (t > TT.yg2 + 0.05 && t < TT.laugh) mood = 'wide'
    if (t > TT.freeze && t < TT.capLaugh) mood = 'wide'
    if (t > TT.capLaugh) { mood = 'happy'; look = undefined }
    if (t > TT.love) mood = 'heart'
    const laughs = [0, 0.2, 0.4, 0.6, 0.8].map(d => TT.capLaugh + d)
    const F = W.star(CAP, CP.x, CP.y, CP.s, { pop: k, mood, look, bangs: true, seed: 5, hops: [0.75, TT.hi1, TT.yg1, ...laughs, TT.love], tears: t > TT.capLaugh + 0.3 && t < TT.love ? 1 : 0 })
    void F
    // Pisces, beside Capricorn, crying (missing someone, then happy)
    W.pisces(420, 1340, 110, t > TT.love ? 3 : 2, t > TT.love ? 'happy' : 'sparkle', { pop: live ? W.pop01(t, 1.0, 0.3, 2) : 1, look: [1, -1], hops: [TT.love + 0.1] })
  },

  nowWorld(x, t, W) {
    x.translate(540, 1060); x.scale(1.12, 1.12); x.translate(-540, -1000)
    const k = W.pop01(t, NT.in, 0.36, 2)
    // a sleek laptop
    const lk = W.pop01(t, NT.in + 0.06, 0.36, 2)
    x.save(); x.translate(LAP.x, 1000); x.scale(lk, lk); x.translate(-LAP.x, -1000)
    W.panel(LAP.x - LAP.w / 2, LAP.top, LAP.w, LAP.h, '#14101f', { P: 8 })
    W.px(LAP.x - LAP.w / 2 - 40, LAP.top + LAP.h, LAP.w + 80, 18, INK); W.px(LAP.x - LAP.w / 2 - 34, LAP.top + LAP.h + 2, LAP.w + 68, 12, '#c9c4d6')
    W.px(LAP.x - 6, LAP.top + 8, 12, 8, '#3a3166')
    const frozen = t > NT.freeze && t < NT.unfreeze
    const tt = frozen ? NT.freeze : t
    let mood = 'happy'
    if (tt > NT.joke && tt < NT.laugh) mood = 'sparkle'
    if (tt > NT.unfreeze) mood = 'heart'
    const hops = tt > NT.laugh && tt < NT.unfreeze ? [NT.laugh, NT.laugh + 0.14, NT.laugh + 0.28, NT.laugh + 0.42] : [NT.in + 0.3, NT.joke, NT.joke + 0.3, NT.unfreeze + 0.05]
    const pis = t > NT.love ? W.pop01(t, NT.love, 0.3, 2) : 0
    x.save(); x.beginPath(); x.rect(SCR.l, SCR.t, SCR.w, SCR.h); x.clip(); x.translate(SCR.l, SCR.t)
    virgoScene(x, tt, 1, { mood: frozen ? 'squint' : mood, look: [0, 0], hops, squash: frozen ? -0.18 : 0, rot: frozen ? 0.22 : 0, ghosts: frozen ? 2 : 0, pisces: pis, tvT: t })
    if (pis > 0) { /* Pisces' tears, in the background of the call */
      const px0 = SCR.w * 0.8, py0 = SCR.h * 0.42
      for (let i = 0; i < 4; i++) { const q = (t * 1.5 + i / 4) % 1; W.px(px0 - 22 + (i % 2) * 44 + (i % 2 ? 1 : -1) * q * 14, py0 + q * 50, 6, 8, '#8fe3ff') }
    }
    x.restore()
    if (frozen) {
      // a short freeze glitch: the picture holds, one band of blocks, the spinner
      const s = Math.floor(t * 5)
      for (let i = 0; i < 3; i++) { const a = Math.sin(s * 9.7 + i * 51.3) * 0.5 + 0.5; W.px(SCR.l + a * (SCR.w - 80), SCR.t + 40 + i * 70, 80, 26, ['#5fd38a', '#ff8fb1', '#e8b98a'][i]) }
      spinner(x, W, LAP.x, LAP.top + LAP.h - 70, t, 'reconnecting…')
    }
    flash(x, t, NT.shot)
    // self-view
    W.px(SCR.l + SCR.w - 128, SCR.t + 12, 116, 84, INK); W.px(SCR.l + SCR.w - 124, SCR.t + 16, 108, 76, '#2c2452')
    drawStarChar(x, SCR.l + SCR.w - 70, SCR.t + 56, 64, t, { color: signStar(CAP).color, mood: t > NT.capLaugh ? 'happy' : 'sparkle', seed: 5, glow: 0 })
    x.restore()
    // the joke bubble (from the call)
    bubble(x, W, t, LAP.x + 60, LAP.top - 40, NT.joke, NT.laugh + 0.3, 'and then the moon said—', { size: 26 })
    // the screenshot strip: 2010 (blocky) + 2026 (same face)
    const sk = W.pop01(t, NT.shot + 0.3, 0.35, 2.4)
    if (sk > 0.01) {
      x.save(); x.translate(LAP.x + 150, LAP.top + LAP.h + 120); x.scale(sk, sk)
      for (let i = 0; i < 2; i++) {
        const X = -150 + i * 160
        W.panel(X, -50, 140, 100, '#f6f0e2', { P: 4 })
        x.save(); x.beginPath(); x.rect(X + 8, -42, 124, 74); x.clip(); x.translate(X + 8, -42)
        if (i === 0) { const L = loCanvas(), lx = L.getContext('2d'); lx.setTransform(1, 0, 0, 1, 0, 0); lx.save(); lx.scale(L.width / SCR.w, L.width / SCR.w); virgoScene(lx, 4.4, 1, { mood: 'squint', squash: -0.18, rot: 0.22, ghosts: 2 }); lx.restore(); x.imageSmoothingEnabled = false; x.drawImage(L, 0, 0, 124, 74) }
        else { x.scale(124 / SCR.w, 124 / SCR.w); virgoScene(x, NT.freeze, 1, { mood: 'squint', squash: -0.18, rot: 0.22, ghosts: 2 }) }
        x.restore()
        W.txt(i ? '2026' : '2010', X + 70, 42, { size: 16, color: INK, shadow: false })
      }
      x.restore()
    }
    // Capricorn
    let mood2 = 'happy', look = [1, -0.6]
    if (t > NT.joke && t < NT.laugh) mood2 = 'sparkle'
    if (t > NT.freeze && t < NT.capLaugh) mood2 = 'wide'
    if (t > NT.capLaugh) { mood2 = 'happy'; look = undefined }
    if (t > NT.love) mood2 = 'heart'
    const laughs = [0, 0.18, 0.36, 0.54, 0.72].map(d => NT.capLaugh + d)
    W.star(CAP, CP.x, CP.y, CP.s, { pop: k, mood: mood2, look, seed: 5, hops: [NT.in + 0.3, NT.laugh, NT.laugh + 0.2, ...laughs, NT.love, 12.6], tears: t > NT.capLaugh + 0.3 && t < NT.love ? 2 : 0 })
    if (t > NT.love) W.sparkles(t, CP.x, CP.y - 40, NT.love, 10, 160, 1, [HOT, PINK, GOLD])
  },

  cues(T) {
    const laughRun = t0 => Array.from({ length: 6 }, (_, i) => ['pop', r3(t0 + i * 0.1), [1318.51, 1174.66, 1318.51, 1567.98, 1318.51, 1760][i], 0.022, -0.3])
    return [
      // THEN: dial-up-ish connecting blips, the delayed hi, the laugh, the FREEZE (tape stop), screenshot, reconnect
      ...Array.from({ length: 6 }, (_, i) => ['pluck', r3(TT.conn[0] + i * 0.14), [880, 1318.51, 987.77, 1760, 1174.66, 2093][i], 0.02, 0.1, 0.3]),
      ['bell', TT.conn[1], 1760, 0.025, 0.6, 0.3],
      ['pop', TT.hi1, 880, 0.035, -0.4], ['pop', TT.hi2, 880, 0.03, 0.4], ['pop', TT.yg1, 987.77, 0.03, -0.4], ['pop', TT.yg2, 987.77, 0.03, 0.4],
      ...laughRun(TT.laugh), ['tapeStop', TT.freeze, 0.35],
      ...laughRun(TT.capLaugh).map(c => [c[0], c[1], c[2] * 0.75, c[3], 0.4]),
      ['tick', r3(TT.shot - 0.05), 0.07], ['tick', TT.shot, 0.05], ['whoosh', TT.shot, 0.15, 0.03],
      ['pop', TT.unfreeze, 1174.66, 0.04, 0.3], ['bell', TT.love, 2349.32, 0.03, 1.0, 0], ['glitter', TT.love, r3(TT.love + 0.4)],
      // NOW: the crisp chime, the joke, the laugh, freeze again, laughs, screenshot #2, unfreeze
      ['bell', r3(NT.in + 0.2), 2093, 0.025, 0.6, 0.3], ['pop', NT.joke, 987.77, 0.03, 0.3],
      ...laughRun(NT.laugh), ['tapeStop', NT.freeze, 0.3],
      ...laughRun(NT.capLaugh).map(c => [c[0], c[1], c[2] * 0.75, c[3], -0.4]),
      ['tick', r3(NT.shot - 0.05), 0.07], ['tick', NT.shot, 0.05], ['whoosh', r3(NT.shot + 0.3), 0.25, 0.03], ['pop', r3(NT.shot + 0.4), 1318.51, 0.035, 0.3],
      ['pop', NT.unfreeze, 1174.66, 0.04, 0.3], ['bell', NT.love, 2349.32, 0.03, 1.0, 0], ['glitter', NT.love, r3(NT.love + 0.4)],
    ]
  },
})

export const { DURATION, T, SCENES, CUES, CUTS, MUSIC } = TVN
