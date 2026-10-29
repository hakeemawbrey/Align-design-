// st10cancer (60 s vertical, Star Talk season 10 "Little Stars", S10 E04: Cancer) · story 0–55.6, then the shared end card.
// The home-video scrapbook (st10kids.js): the Star Nursery, the Academy hall on the first day, the nursery window at
// night, then the hall and the classroom the next morning.
//   0.00  HOOK  frame 0: "Baby Cancer won't let go of the *blanket*." The Moon (night nurse) tugging the patchwork
//               blanket toward the wash; Baby Cancer clinging on, a tug-of-war, "AGE 1".
//   3.20  WANT  The blanket is its shell: it rolls up into it until only its eyes peek out. BABY CANCER: "Blanket stays.
//               *Forever*." ☾: "Even at school?" · "*Especially* at school."
//  12.00  TRY   "AGE 4", the first day. Everyone runs into class; Kid Cancer, in its blanket shell, stops at the door.
//               "It's too *big* in there." ♄ SATURN: "Come in when you're *ready*." TRY 1 · TRY 2 · TRY 3: each time the
//               class shouts "HI!!" and the shell scoots back. Dusk: it goes home without going in.
//  30.00  TURN  The nursery window at night. The Moon runs its phases across the sky. ★ REAL SKY: the Moon goes through
//               its phases in about a month: the same face, changing shape, and still the Moon. Cancer is ruled by the
//               Moon. ☾: "I change *shape* every night. Still me." Then it hands over a tiny moon nightlight: "Take a
//               little *me* with you."
//  42.00  WIN   Morning. The nightlight glowing, the blanket worn like a cape, Cancer walks in. In class a new kid
//               (Kid Pisces) is crying. Cancer takes off its blanket and wraps it round them: "You can borrow my *shell*."
//               A hug. PISCES: "…you came *back*?"
//  50.60        growUp: Kid Cancer → today's adult Cancer, holding the nightlight, the frame-0 framing.
//  52.20  LAST  "Brave can be *soft*."
// Rewatch bait: the blanket's patchwork is the st9cancercrew fort quilt; the moon nightlight is the st9 Cancer moon lamp
// (small); the hall door's window shows the class drawing a big "WELCOME" banner during the three tries.
// Ghost: a baby ghost (cell 2) leans out from behind the right edge of the classroom door during the tries.
import { prog, ease, clamp, lerp } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas, drawMoon } from '../../sky.js'
import { GRAIN_H, easeOutBack } from '../../wheel.js'
import { buildEndcard, endcardCues, ENDCARD_LEN } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import {
  drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse,
  drawCloudCrib, drawHomeVideo, kidSign, KIDS_FONTS, crayonPow, crayonPowCues,
} from '../../st10kids.js'

export const DURATION = 60
const KEY = 'Bbm'
const STORY_END = DURATION - ENDCARD_LEN        // 55.6
const INK = '#1b1236'
const CA = kidSign('cancer'), PI = kidSign('pisces')
const BABY = CA.tag, KID = CA.kidTag, MOON = '☾ THE MOON', SAT = '♄ SATURN', PIS = PI.kidTag
const ACC = '#8fd6f6'
const QUILT = ['#f2895a', '#f3e8d2', '#3fb6f0', '#ff9fb8', '#c79bff', '#ffe6a8']      // the st9cancercrew fort quilt

const T = {
  hookOut: 2.9, tugWin: 2.4,
  roll: 3.2, stays: [3.6, 6.2], school: [6.4, 8.6], esp: [8.8, 11.6],
  hall: 12.0, runIn: [12.3, 13.8], big: [14.0, 16.4], ready: [16.6, 19.0],
  tries: [19.4, 22.2, 25.0], dusk: 27.6, home: [27.8, 29.7],
  night: 30.0, phases: [30.4, 41.6], shape: [31.0, 33.6], chip: 34.0, chipDur: 6.4, lamp: 40.0, little: [40.2, 42.4],
  morning: 42.6, walk: [42.8, 44.6], cls: 44.8, cry: 45.0, give: 46.0, shell: [46.4, 48.6], hug: 47.6, back: [48.8, 50.6],
  grow: 50.6, last: 52.2, lastLand: 52.6, out: [55.2, 55.55],
  ghost: 23.4,
}
const CUTS_CAM = [T.roll, T.hall, ...T.tries, T.dusk, T.morning, T.cls]
const pop01 = (t, t0, d = 0.3, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))

export const GHOST = { at: T.ghost, x: 650, y: 900, where: 'a baby ghost (cell 2) leans out from behind the right edge of the classroom door during the three tries' }

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 104px Inter", "italic 500 158px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Cancer won’t let go of the *blanket*.', at: 0, out: T.hookOut, top: 320, accentColor: ACC })
  const last = popText(root, 'Brave can be | *soft*.', { top: 340, size: 116, accentSize: 190, at: T.last, gap: 0.1, accentColor: ACC, wobble: true, late: 1, lateAt: T.lastLand, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const R = Math.round
  const rect = (xx, y, w, h, c) => { x.fillStyle = c; x.fillRect(R(xx), R(y), R(w), R(h)) }
  const txt = (s, xx, y, font, c, align = 'center') => { x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillStyle = c; x.fillText(s, xx, y) }

  // ── the blanket
  function quilt(path, x0, y0, w, h, cell, sway = 0) {
    x.save(); path(); x.lineWidth = 10; x.strokeStyle = INK; x.stroke(); x.clip()
    for (let j = 0; j * cell < h + cell; j++) for (let i = 0; i * cell < w + cell; i++) rect(x0 + i * cell + sway, y0 + j * cell, cell + 1, cell + 1, QUILT[(i * 3 + j * 2) % QUILT.length])
    for (let j = 0; j * cell < h + cell; j++) rect(x0, y0 + j * cell - 2, w + cell, 3, 'rgba(27,18,54,0.3)')
    x.restore()
  }
  /** the blanket as a shell: a quilted dome behind the star (back), a front fold over its lower half (front).
   *  k 0…1: how far it's wrapped (1 = only the eyes peek out over the fold) */
  function shellBack(cx, cy, s, t) {
    const w = s * 1.3, h = s * 1.25, sw = Math.sin(t * 2) * 4
    quilt(() => { x.beginPath(); x.moveTo(cx - w / 2, cy + s * 0.5); x.quadraticCurveTo(cx - w / 2 - 10, cy - h * 0.62, cx + sw, cy - h * 0.66); x.quadraticCurveTo(cx + w / 2 + 10, cy - h * 0.62, cx + w / 2, cy + s * 0.5); x.closePath() }, cx - w / 2 - 20, cy - h * 0.7, w + 40, h * 1.3, R(s / 6), 0)
  }
  function shellFront(cx, cy, s, t, k = 0.4) {
    const w = s * 1.36, top = cy + s * lerp(0.3, 0.14, k), sw = Math.sin(t * 2.4) * 5
    quilt(() => { x.beginPath(); x.moveTo(cx - w / 2, cy + s * 0.55); x.lineTo(cx - w / 2 + 8, top + 14); x.quadraticCurveTo(cx + sw, top - 20, cx + w / 2 - 8, top + 14); x.lineTo(cx + w / 2, cy + s * 0.55); x.closePath() }, cx - w / 2, top - 30, w, s * 0.9, R(s / 6), 0)
  }
  function cape(cx, cy, s) {     // the blanket worn round the shoulders, morning
    quilt(() => { x.beginPath(); x.moveTo(cx - s * 0.7, cy - s * 0.15); x.lineTo(cx + s * 0.7, cy - s * 0.15); x.lineTo(cx + s * 0.62, cy + s * 0.55); x.lineTo(cx - s * 0.62, cy + s * 0.55); x.closePath() }, cx - s * 0.75, cy - s * 0.2, s * 1.5, s * 0.8, R(s / 6))
  }
  function nightlight(cx, cy, k = 1, glow = 1) {    // the tiny moon nightlight (the st9 moon lamp, kid-sized)
    if (k <= 0.01) return
    x.save(); x.translate(cx, cy); x.scale(k, k)
    x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(0, -10, 0, 0, -10, 140); g.addColorStop(0, `rgba(255,242,176,${0.55 * glow})`); g.addColorStop(1, 'rgba(255,242,176,0)')
    x.fillStyle = g; x.fillRect(-140, -150, 280, 280); x.globalCompositeOperation = 'source-over'
    rect(-26, 18, 52, 22, INK); rect(-22, 22, 44, 14, '#cfd8ea')
    x.fillStyle = INK; x.beginPath(); x.arc(0, -10, 34, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#fff2b0'; x.beginPath(); x.arc(0, -10, 28, 0, Math.PI * 2); x.fill()
    x.fillStyle = '#f2e2a0'; x.beginPath(); x.arc(9, -2, 7, 0, Math.PI * 2); x.arc(-10, -18, 5, 0, Math.PI * 2); x.fill()
    x.restore()
  }
  function classDoor(t, openK) {   // the classroom door in the hall (drawAcademy draws it at 432…648 × 640…1160)
    if (openK <= 0.01) return
    rect(444, 652, 192 * openK, 508, '#2a1f52')
    // the class inside: a big WELCOME banner being drawn on (rewatch bait)
    const n = Math.floor(prog(t, T.tries[0], T.dusk) * 7)
    txt('WELCOME'.slice(0, n), 540, 720, "800 30px Inter", '#ffd36e')
    for (let i = 0; i < 3; i++) rect(470 + i * 50, 980 - Math.abs(Math.sin(t * 6 + i)) * 20, 30, 30, ['#ff9ec7', '#ffd36e', '#7fd8ff'][i])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = vlogCam(t, { cuts: CUTS_CAM, punches: [{ at: T.stays[0], out: T.stays[1], zoom: 1.2, x: 540, y: 1150 }, { at: T.big[0], out: T.big[1], zoom: 1.18, x: 540, y: 1200 }, { at: T.shell[0], out: T.shell[1], zoom: 1.15, x: 600, y: 1150 }] })
      x.save(); cam.apply(x)
      const said = [], caps = [], say = o => said.push(o), capt = o => caps.push(o)
      let Z = 1, ZX = 540, ZY = 1100
      if (t < T.hall) {
        // ── the nursery: the tug-of-war, then the shell
        Z = 1.2; ZY = 1250
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        drawNursery(x, t, { cribs: false, mobile: true })
        const CX = 470, CY = 1250
        drawCloudCrib(x, CX, CY + 60, 300, t)
        const tug = t < T.roll ? Math.sin(t * 7) : 0
        const roll = ease.inOutCubic(prog(t, T.roll, T.roll + 0.8))
        shellBack(CX, CY - 60, 210, t)
        drawBabyStar(x, CX + tug * 8, CY - 70 + roll * 8, 200, t, { sign: 'cancer', mood: t < T.roll ? 'determined' : t > T.esp[0] ? 'pout' : t > T.school[0] ? 'wide' : 'sparkle', seed: 4, look: t < T.roll ? [1, 0] : [0, 0], squash: t < T.roll ? 0.05 * tug : 0 })
        shellFront(CX, CY - 60, 210, t, t < T.roll ? 0.05 : roll * 0.85)
        // the tug: a corner of the blanket stretched to the Moon's hand
        const mx = 790 + tug * 10, my = 1060
        if (t < T.roll + 0.3) {
          const k = 1 - prog(t, T.roll, T.roll + 0.3)
          x.save(); x.globalAlpha = k
          x.strokeStyle = INK; x.lineWidth = 34; x.beginPath(); x.moveTo(CX + 120, CY - 20); x.quadraticCurveTo((CX + mx) / 2, CY - 10 + tug * 20, mx - 70, my + 40); x.stroke()
          x.strokeStyle = '#ff9fb8'; x.lineWidth = 22; x.stroke(); x.restore()
        }
        drawCloudCrib(x, CX, CY + 60, 300, t, { front: true })
        drawMoonNurse(x, mx, my - 60, 100, t, { mood: t < T.roll ? 'wide' : t > T.school[0] && t < T.school[1] ? 'happy' : 'neutral', look: [-1, 1], hops: [T.school[0]] })
        x.restore()
        crayonPow(x, t, { text: 'TUG!', at: 0.9, dur: 0.6, x: 640, y: 1110, size: 64, color: '#ff9fb8', rot: -0.1 })
        crayonPow(x, t, { text: 'TUG!!', at: 1.9, dur: 0.7, x: 600, y: 1060, size: 72, color: '#ffd36e', rot: 0.08 })
        say({ text: 'Blanket stays. *Forever*.', at: T.stays[0], out: T.stays[1], x: CX, y: 1050, name: BABY, color: ACC, w: 520 })
        say({ text: 'Even at *school*?', at: T.school[0], out: T.school[1], x: 790, y: 880, name: MOON, color: '#f4ead8', side: -0.3, w: 440 })
        say({ text: '*Especially* at school.', at: T.esp[0], out: T.esp[1], x: CX, y: 1050, name: BABY, color: ACC, w: 520 })
        capt({ text: 'AGE 1', at: -0.4, out: T.hall - 0.3, size: 64, sub: 'HOME VIDEO · TAPE 1' })
      } else if (t < T.night) {
        // ── the first day: the hall, the door, three tries
        Z = 1.2; ZY = 1000
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        drawAcademy(x, t, { room: 'hall' })
        const dusk = prog(t, T.dusk, T.dusk + 0.8)
        const tryIdx = T.tries.filter(v => t >= v).length - 1
        const inTry = tryIdx >= 0 && t < T.tries[tryIdx] + 2.6 && t < T.dusk
        const tp = inTry ? t - T.tries[tryIdx] : 9
        const doorOpen = (t > T.runIn[0] && t < T.runIn[1] + 0.3) ? 1 : (inTry && tp > 0.4 && tp < 1.6) ? 1 : 0
        classDoor(t, doorOpen)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.6, from: 'right', cell: 2 })
        // the others running in
        ;[['aries', 0], ['taurus', 0.2], ['gemini', 0.4], ['leo', 0.6]].forEach(([s, d], i) => {
          const p = prog(t, T.runIn[0] + d, T.runIn[0] + d + 0.9)
          if (p >= 1) return
          drawBabyStar(x, lerp(-60 + i * 30, 540, p), 1180 - p * 120, 150 * (1 - p * 0.5), t, { sign: s, age: 'kid', mood: 'laugh', seed: 50 + i, look: [1, 0], backpack: true, alpha: 1 - prog(p, 0.8, 1) })
        })
        // Saturn by the door
        drawSaturn(x, 820, 980, 190, t, { mood: t > T.ready[0] ? 'happy' : 'neutral', look: [-1, 1], pointer: false, hops: [T.ready[0]] })
        // Cancer in the shell, scooting toward the door and back on each try
        let cx = 330, k = 0.4
        if (inTry) { const fwd = ease.outCubic(prog(tp, 0, 0.6)), back = ease.inOutCubic(prog(tp, 0.9, 1.6)); cx = 330 + (150 + tryIdx * 30) * (fwd - back); k = tp > 0.9 ? 0.95 : 0.4 }
        if (t > T.dusk) { cx = lerp(330, -120, ease.inCubic(prog(t, T.home[0] + 0.6, T.home[1]))); k = 0.6 }
        const cy = 1180
        shellBack(cx, cy, 180, t)
        drawBabyStar(x, cx, cy + k * 26, 170, t, { sign: 'cancer', age: 'kid', mood: inTry && tp > 0.6 && tp < 1.6 ? 'wide' : t > T.dusk ? 'cry' : t > T.big[0] && t < T.big[1] ? 'pout' : 'neutral', seed: 4, look: [1, 0], blink: inTry && tp > 0.6 ? false : undefined })
        shellFront(cx, cy, 180, t, k)
        if (dusk > 0) { x.fillStyle = `rgba(60,30,90,${(0.45 * dusk).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
        x.restore()
        T.tries.forEach((v, i) => {
          crayonPow(x, t, { text: `TRY ${i + 1}`, at: v, dur: 0.8, x: 300, y: 820, size: 60, color: ['#9be08a', '#ffd36e', '#ff9ec7'][i], rot: -0.08 })
          crayonPow(x, t, { text: 'HI!!', at: v + 0.6, dur: 0.8, x: 560, y: 900, size: 84, color: '#ffd36e', rot: 0.06 })
        })
        say({ text: 'It’s too *big* in there.', at: T.big[0], out: T.big[1], x: 330, y: 1060, name: KID, color: ACC, w: 500, side: 0.3 })
        say({ text: 'Come in when you’re *ready*.', at: T.ready[0], out: T.ready[1], x: 820, y: 880, name: SAT, color: '#f7dca0', side: -0.4, w: 500 })
        say({ text: 'Maybe *tomorrow*.', at: T.home[0], out: T.home[1], x: 330, y: 1060, name: KID, color: ACC, w: 420, side: 0.3 })
        capt({ text: 'AGE 4', at: T.hall + 0.1, out: T.night - 0.4, size: 64, sub: 'FIRST DAY' })
      } else if (t < T.morning) {
        // ── the nursery window at night: the Moon's phases, the nightlight
        Z = 1
        x.save()
        drawNursery(x, t, { cribs: false, mobile: false, night: 0.8 })
        // the window: a big round cloud window on the night sky, the moon cycling through its phases across it
        x.fillStyle = INK; x.beginPath(); x.arc(540, 700, 330, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#0d0b2e'; x.beginPath(); x.arc(540, 700, 312, 0, Math.PI * 2); x.fill()
        for (let i = 0; i < 40; i++) { x.globalAlpha = 0.4 + 0.5 * Math.abs(Math.sin(t + i)); rect(540 + Math.cos(i * 2.4) * (60 + (i * 37) % 240), 700 + Math.sin(i * 2.4) * (60 + (i * 53) % 230), 3, 3, '#fffaf0') } x.globalAlpha = 1
        const pk = prog(t, T.phases[0], T.phases[1])
        const ph = (0.02 + pk * 2) % 1
        drawMoon(x, 540, 650, 110, Math.round(ph * 32) / 32, { alpha: 1, glow: 1.6, earthshine: 0.6, darkAlpha: 0.75 })
        // the little phase strip under it (one month)
        for (let i = 0; i < 8; i++) { const p = i / 8; drawMoon(x, 330 + i * 60, 880, 20, p, { alpha: 0.9, glow: 0, earthshine: 0.5, darkAlpha: 0.7 }); if (Math.floor(ph * 8) === i) { x.strokeStyle = '#ffd36e'; x.lineWidth = 3; x.strokeRect(330 + i * 60 - 26, 854, 52, 52) } }
        txt('ONE MONTH', 540, 930, "700 22px 'Space Mono', monospace", '#ffd36e')
        // the window sill, Cancer in its shell + the Moon nurse
        rect(160, 1100, 760, 30, '#fff2f6'); rect(160, 1130, 760, 12, '#e8d4ea')
        shellBack(400, 1250, 200, t)
        drawBabyStar(x, 400, 1250, 190, t, { sign: 'cancer', age: 'kid', mood: t > T.little[0] ? 'sparkle' : t > T.chip ? 'wide' : 'neutral', seed: 4, look: t > T.lamp ? [1, 1] : [0, -1], hops: [T.lamp + 0.3] })
        shellFront(400, 1250, 200, t, 0.3)
        const handK = pop01(t, T.lamp, 0.4, 2)
        drawMoonNurse(x, 760, 1220, 110, t, { mood: t > T.shape[0] ? 'happy' : 'neutral', look: [-1, 0], hops: [T.shape[0], T.lamp] })
        nightlight(lerp(700, 520, ease.inOutCubic(prog(t, T.lamp + 0.4, T.lamp + 1.2))), 1290, handK, 1)
        x.restore()
        say({ text: 'I change *shape* every night. Still me.', at: T.shape[0], out: T.shape[1], x: 760, y: 1090, name: MOON, color: '#f4ead8', side: -0.4, w: 600 })
        say({ text: 'Take a little *me* with you.', at: T.little[0], out: T.little[1], x: 760, y: 1090, name: MOON, color: '#f4ead8', side: -0.4, w: 540 })
        capt({ text: 'BEDTIME', at: T.night + 0.2, out: T.morning - 0.3, size: 56, rot: 0.03 })
      } else {
        // ── morning: in through the door, then the crying new kid
        const inClass = t >= T.cls
        Z = inClass ? 1.15 : 1.2; ZY = inClass ? 1100 : 1000
        x.save(); x.translate(ZX, ZY); x.scale(Z, Z); x.translate(-ZX, -ZY)
        const grown = t >= T.grow
        if (!inClass) {
          drawAcademy(x, t, { room: 'hall' })
          classDoor(t, 1)
          const p = ease.inOutCubic(prog(t, T.walk[0], T.walk[1]))
          const cx = lerp(250, 540, p), cy = 1180 - p * 60
          cape(cx, cy, 170)
          drawBabyStar(x, cx, cy, 170 * (1 - p * 0.2), t, { sign: 'cancer', age: 'kid', mood: 'determined', seed: 4, look: [1, -1], hops: [T.walk[0] + 0.3, T.walk[0] + 0.9, T.walk[0] + 1.5] })
          nightlight(cx + 90, cy + 40, 0.8, 1)
          drawSaturn(x, 820, 980, 190, t, { mood: 'happy', look: [-1, 1], pointer: false })
        } else {
          drawAcademy(x, t, { room: 'class' })
          const gave = t >= T.give + 0.4
          // Kid Pisces, crying at the front desk; wrapped in the blanket once Cancer gives it
          const pX = 680, pY = 1180
          if (gave && !grown) shellBack(pX, pY, 170, t)
          if (!grown || t < T.grow + 0.9) drawBabyStar(x, pX, pY, 160, t, { sign: 'pisces', age: 'kid', mood: t > T.hug ? 'happy' : t > T.back[0] ? 'sparkle' : 'cry', seed: 9, look: [-1, 0], flip: true, alpha: grown ? 1 - prog(t, T.grow, T.grow + 0.9) : 1 })
          if (gave && !grown) shellFront(pX, pY, 170, t, 0.15)
          const cx = t < T.give ? lerp(200, 470, ease.outCubic(prog(t, T.cls, T.cls + 0.8))) : lerp(470, 520, ease.outCubic(prog(t, T.hug, T.hug + 0.3)))
          if (!grown) {
            if (!gave) cape(cx, 1180, 170)
            drawBabyStar(x, cx, 1180, 180, t, { sign: 'cancer', age: 'kid', mood: t > T.hug ? 'happy' : t > T.give ? 'sparkle' : 'wide', seed: 4, look: [1, 0], hops: [T.give, T.hug] })
            nightlight(cx - 100, 1230, 0.8, 1)
            if (t > T.hug) { const hk = pop01(t, T.hug, 0.3, 2.5); for (let k = 0; k < 3; k++) { const hy = 1010 - ((t - T.hug) * 60 + k * 30) % 90; x.globalAlpha = hk; rect(560 + k * 30, hy, 16, 14, '#ff6f8a'); x.globalAlpha = 1 } }
          } else {
            nightlight(380, 1230, 0.9, 1.2)
            growUp(x, t, { sign: 'cancer', at: T.grow, x: 500, y: 1160, size: 230, seed: 4, look: [1, 0], caption: ['AGE 4', 'TODAY'] })
          }
          // the blanket's hand-off arc
          if (t > T.give && t < T.give + 0.4) { const q = prog(t, T.give, T.give + 0.4); cape(lerp(cx, pX, q), 1180 - Math.sin(q * Math.PI) * 120, 170) }
          drawBabyStar(x, 250, 1010, 120, t, { sign: 'virgo', age: 'kid', mood: t > T.hug ? 'heart' : 'neutral', seed: 70, look: [1, 0] })
          drawBabyStar(x, 830, 1010, 120, t, { sign: 'libra', age: 'kid', mood: t > T.hug ? 'heart' : 'neutral', seed: 71, look: [-1, 0] })
        }
        x.restore()
        crayonPow(x, t, { text: 'sniff…', at: T.cry, dur: 1.0, x: 800, y: 1020, size: 52, color: '#7fd8ff', rot: 0.08 })
        say({ text: 'You can borrow my *shell*.', at: T.shell[0], out: T.shell[1], x: 470, y: 1080, name: KID, color: ACC, w: 520 })
        say({ text: '…you came *back*?', at: T.back[0], out: T.back[1], x: 680, y: 1090, name: PIS, color: '#b0a8ff', side: 0.3, w: 440 })
        capt({ text: 'DAY 2', at: T.morning + 0.1, out: T.grow - 0.2, size: 64 })
      }
      x.restore()
      const zx = v => ZX + (v - ZX) * Z, zy = v => ZY + (v - ZY) * Z
      for (const o of said) speechBubble(x, t, { ...o, x: zx(o.x), y: zy(o.y) })
      for (const o of caps) ageCaption(x, t, o)
      if (t > T.last - 0.3) { x.fillStyle = `rgba(16,9,38,${(0.45 * prog(t, T.last - 0.3, T.last + 0.2)).toFixed(3)})`; x.fillRect(0, 0, 1080, 900) }
      if (cam.flash > 0) { x.fillStyle = `rgba(255,250,240,${(cam.flash * 0.5).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
      factChip(x, t, { label: '★ REAL SKY', text: 'The Moon goes through its phases in about a month: the same face, changing shape, and it’s still the Moon. Cancer is ruled by the Moon.', at: T.chip, dur: T.chipDur, x: 540, y: 1440, color: ACC, w: 880, size: 32 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      drawCrayonFrame(x, t, { alpha: 1 - 0.6 * prog(t, T.last - 0.4, T.last) })
      drawHomeVideo(x, t, { y0: 232, alpha: 1 - prog(t, T.last - 0.4, T.last), date: t < T.hall ? 'JUN 21 · TAPE 1' : 'SEP 02 · TAPE 2' })
      hook.update(t)
      last.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.night, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E04' }), cardCuts(CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }), ...crayonPowCues(0.9, { kind: 'pop' }), ...crayonPowCues(1.9, { kind: 'pop' }),
  ['whoosh', T.roll, 0.8, 0.03], ['pop', T.roll + 0.8, 466.16, 0.03, 0],
  ...speechCues(T.stays[0], { pitch: 740 }), ...speechCues(T.school[0], { pitch: 523 }), ...speechCues(T.esp[0], { pitch: 740 }),
  ...vlogCutCues(CUTS_CAM, { gain: 0.03 }), ...ageCaptionCues(T.hall + 0.1),
  ['whoosh', T.runIn[0], 1.2, 0.03], ...speechCues(T.big[0], { pitch: 740 }), ...speechCues(T.ready[0], { pitch: 392 }),
  ...T.tries.flatMap(v => [...crayonPowCues(v, { kind: 'pop' }), ...crayonPowCues(v + 0.6, { kind: 'bonk' }), ['whoosh', r3(v + 0.9), 0.6, 0.03]]),
  ['tick', T.ghost + 0.05, 0.012], ...speechCues(T.home[0], { pitch: 622.25 }),
  ...ageCaptionCues(T.night + 0.2), ...speechCues(T.shape[0], { pitch: 523 }),
  ...[0, 1, 2, 3, 4, 5, 6, 7].map(i => ['bell', r3(T.phases[0] + i * 1.4), [932.33, 1046.5, 1108.73, 1244.51, 1396.91, 1244.51, 1108.73, 1046.5][i], 0.012, 1.4, (i - 3.5) * 0.12]),
  ...factChipCues(T.chip, { dur: T.chipDur }),
  ['glitter', T.lamp, T.lamp + 1.0], ...speechCues(T.little[0], { pitch: 523 }),
  ...ageCaptionCues(T.morning + 0.1), ...[0.3, 0.9, 1.5].map(d => ['tick', r3(T.walk[0] + d), 0.02]),
  ['pop', T.cry, 311.13, 0.02, 0.3], ['whoosh', T.give, 0.5, 0.03], ...speechCues(T.shell[0], { pitch: 740 }),
  ['pop', T.hug, 932.33, 0.03, 0], ['bell', T.hug, 1396.91, 0.02, 1.6, 0], ...speechCues(T.back[0], { pitch: 880 }),
  ...growUpCues(T.grow),
  ['pop', T.last, 466.16, 0.025, 0], ['pop', T.last + 0.1, 554.37, 0.025, 0], ['pop', T.lastLand, 698.46, 0.04, 0], ['bell', T.lastLand, 932.33, 0.025, 1.8, 0],
  ['whoosh', T.out[0], 0.3, 0.02],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void clamp
