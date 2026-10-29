// st9tauruswork (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E07, 9 TO 5) · story 0–20.6, then the end card.
//   "A Taurus when the plan *changes.*"  Work from home at the same desk, same mug; the calendar on the monitor has
//   12:00 LUNCH (SACRED). 11:58, the sandwich is unwrapped… and a SURPRISE MEETING 12:00–1:00 slams onto the calendar.
//   Gasp. "…during *lunch?*" A slow PROCESSING CHANGE bar ("okay. give me a *minute.*"), then it adapts, slowly: lunch
//   moves to 1:00, "fine. i'll bring *soup.*" Fact chip: Taurus is the natural ruler of the 2nd house (money, possessions,
//   values). 5:00 PM, logged off on time, PAYDAY pings. Last shot = frame 0's framing, the sandwich finally eaten,
//   LUNCH ✓.   "Steady *pays.*"
//   Rewatch bait: the calendar also has 3:00 SNACK (ALSO SACRED). Ghost: behind the desk lamp. The desk monstera has
//   grown since E06 (3 → 4 leaves).
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawTaurusHome } from '../../st9taurushome.js'

export const DURATION = 25
const KEY = 'Eb'
const STORY_END = DURATION - ENDCARD_LEN         // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0', RED = '#ff4a5a'
const TA = signStar('taurus')
const MONO = "'Space Mono', monospace"

const T = {
  hookOut: 2.75, ff: 5.0, unwrap: 6.1, change: 7.5, process: [9.8, 12.6], adapt: 12.8, fact: 14.2, payday: 15.2, eat: 17.2,
  ghost: 10.6, last: 17.5, lastOut: [19.95, 20.2], fade: [20.15, 20.6],
}
const CUTS = [T.adapt, T.eat]
const PUNCH = [{ at: T.change + 0.05, out: T.process[0] - 0.1, zoom: 1.22, x: 500, y: 960 }]
const CLOCK = [
  { at: 0, from: '9:00' }, { at: T.ff, dur: 1.0, from: '9:00', to: '11:58' },
  { at: T.adapt, dur: 0.3, from: '11:58', to: '12:00 PM' }, { at: T.payday, dur: 1.0, from: '12:00 PM', to: '5:00 PM' },
]
const SAY = [
  { text: '…during *lunch?*', at: 7.95, out: 9.7 },
  { text: 'okay. give me a *minute.*', at: 10.0, out: 11.8 },
  { text: 'fine. i’ll bring *soup.*', at: 12.95, out: 14.6 },
]
const STAMPS = [
  { at: 2.9, out: T.ff - 0.1, time: '9:00 AM', text: 'same desk, same *mug*' },
  { at: T.ff + 0.4, out: T.change - 0.1, time: '11:58 AM', text: 'lunch in *two* minutes' },
  { at: T.adapt + 0.15, out: T.payday - 0.1, time: '12:00 PM', text: 'adapting. *slowly.*' },
  { at: T.payday + 0.4, out: T.last - 0.1, time: '5:00 PM', text: 'logged off *on time*' },
]
const FACT = { text: 'Taurus is the natural ruler of the 2nd house (money, possessions, values).', at: T.fact, dur: 2.8, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 1036, y: 980, where: 'peeking out from behind the desk lamp, right edge, desk' }

function calendar(x, t, sc) {
  const { x0, y0, x1, y1 } = sc, w = x1 - x0
  x.save()
  x.fillStyle = '#f6f0e0'; x.fillRect(x0, y0, w, y1 - y0)
  x.fillStyle = '#7fa37f'; x.fillRect(x0, y0, w, 40)
  x.font = `700 20px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#ffffff'; x.fillText('TUESDAY', x0 + 14, y0 + 20)
  const moved = t >= T.adapt, eaten = t >= T.eat + 0.6
  const rows = moved
    ? [['9:00', 'FOCUS', '#cfe5c8'], ['12:00', 'MEETING (+ SOUP)', '#ffd0c8'], ['1:00', eaten ? 'LUNCH (SACRED) ✓' : 'LUNCH (SACRED)', '#ffe7a8'], ['3:00', 'SNACK (ALSO SACRED)', '#ffe7a8']]
    : [['9:00', 'FOCUS', '#cfe5c8'], ['12:00', 'LUNCH (SACRED)', '#ffe7a8'], ['1:00', 'FOCUS', '#cfe5c8'], ['3:00', 'SNACK (ALSO SACRED)', '#ffe7a8']]
  rows.forEach(([tm, lbl, c], i) => {
    const yy = y0 + 52 + i * 56
    const k = moved && (i === 1 || i === 2) ? ease.outBack ? clamp((t - T.adapt - i * 0.15) / 0.25) : 1 : 1
    x.globalAlpha = k
    x.fillStyle = c; x.fillRect(x0 + 92, yy, w - 106, 46)
    x.fillStyle = '#5a4a3a'; x.font = `700 17px ${MONO}`; x.fillText(tm, x0 + 14, yy + 23)
    x.fillStyle = INK; x.font = `700 18px Inter, sans-serif`; x.fillText(lbl, x0 + 104, yy + 23)
    x.globalAlpha = 1
  })
  // the surprise meeting slams in
  if (t > T.change && t < T.adapt) {
    const k = clamp((t - T.change) / 0.12), shake = t < T.change + 0.4 ? Math.sin(t * 80) * 6 : 0
    x.save(); x.translate(shake, 0); x.globalAlpha = k
    x.fillStyle = RED; x.fillRect(x0 + 10, y0 + 100, w - 20, 120)
    x.fillStyle = '#ffffff'; x.font = `700 18px ${MONO}`; x.fillText('NEW EVENT', x0 + 26, y0 + 124)
    x.font = `800 26px Inter, sans-serif`; x.fillText('SURPRISE MEETING', x0 + 26, y0 + 160)
    x.font = `700 20px ${MONO}`; x.fillText('12:00 – 1:00', x0 + 26, y0 + 196)
    x.restore()
  }
  // payday toast
  if (t > T.payday + 0.6 && t < T.eat) {
    const k = clamp((t - T.payday - 0.6) / 0.2)
    x.globalAlpha = k
    x.fillStyle = INK; x.fillRect(x0 + 20, y1 - 96, w - 40, 80)
    x.fillStyle = GOLD; x.font = `800 26px Inter, sans-serif`; x.fillText('PAYDAY', x0 + 92, y1 - 56)
    for (let i = 0; i < 3; i++) { x.fillStyle = GOLD; x.beginPath(); x.arc(x0 + 50, y1 - 56 - i * 6, 18, 0, Math.PI * 2); x.fill(); x.fillStyle = '#c9902e'; x.fillRect(x0 + 44, y1 - 62 - i * 6, 12, 12) }
  }
  x.restore()
}
function sandwich(x, cx, cy, state, bite = 0) {
  // state: 'wrapped' | 'open'
  x.save()
  if (state === 'wrapped') { x.fillStyle = '#e9dfc6'; x.fillRect(cx - 60, cy - 30, 120, 40); x.fillStyle = '#c9bc9c'; x.fillRect(cx - 60, cy - 12, 120, 6) }
  else {
    x.fillStyle = '#d9a35a'; x.fillRect(cx - 60, cy - 30, 120, 14); x.fillStyle = '#5fbf5a'; x.fillRect(cx - 64, cy - 16, 128, 8)
    x.fillStyle = '#e85a4a'; x.fillRect(cx - 58, cy - 8, 116, 8); x.fillStyle = '#d9a35a'; x.fillRect(cx - 60, cy, 120, 14)
    if (bite > 0) { x.fillStyle = '#4b634f'; x.beginPath(); x.arc(cx + 60, cy - 8, 26 * bite, 0, Math.PI * 2); x.fill() }
  }
  x.restore()
}
function processing(x, t) {
  const [a, b] = T.process
  const k = Math.min(prog(t, a, a + 0.2), 1 - prog(t, b + 0.1, b + 0.3))
  if (k <= 0) return
  const p = prog(t, a + 0.2, b), x0 = 140, y0 = 1310, w = 800
  x.save(); x.globalAlpha = k
  x.fillStyle = 'rgba(16,22,14,0.9)'; x.fillRect(x0, y0, w, 130); x.fillStyle = '#7fa37f'; x.fillRect(x0, y0, w, 6)
  x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = BONE
  x.fillText('PROCESSING CHANGE' + '.'.repeat(1 + Math.floor(t * 2) % 3), x0 + 20, y0 + 38)
  x.textAlign = 'right'; x.fillText(`${Math.floor(ease.inQuad(p) * 100)}%`, x0 + w - 20, y0 + 38)
  x.fillStyle = '#2b3428'; x.fillRect(x0 + 20, y0 + 70, w - 40, 36)
  const n = Math.floor(ease.inQuad(p) * 38)
  for (let i = 0; i < n; i++) { x.fillStyle = MINT; x.fillRect(x0 + 24 + i * 19.6, y0 + 74, 14, 28) }
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 18px Inter", "800 26px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'A Taurus when | the plan *changes.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Steady *pays.*', { top: 330, size: 130, accentSize: 180, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.last + 0.35, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK)
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: t < T.ff ? 9 : t < T.payday ? lerp(9, 12, prog(t, T.ff, T.ff + 1)) : lerp(12, 17, prog(t, T.payday, T.payday + 1)) })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const g = drawTaurusHome(x, t, { room: 'desk', ep: 2, spin: true })
      calendar(x, t, g.screen)
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      // Taurus
      const typing = t < T.unwrap || (t > T.adapt + 1.8 && t < T.eat)
      const mood = t < T.unwrap ? 'happy' : t < T.change ? 'heart' : t < T.process[0] ? 'wide' : t < T.adapt ? 'squint' : t < T.eat ? 'neutral' : 'heart'
      const hops = typing ? Array.from({ length: 30 }, (_, i) => i * 0.6) : [T.change + 0.02, T.adapt + 0.1, T.eat + 0.1, T.eat + 0.6]
      const r = drawStarChar(x, 790, 1040, 310, t, { color: TA.color, glyph: TA.glyph, mood, look: t < T.change ? [-1, 0.6] : t < T.adapt ? [-1, -0.2] : [0, 0], hops, seed: 14, bob: typing ? 2 : undefined })
      // the sandwich on the desk (wrapped → open → eaten at the end)
      const sx = 530, sy = 1110
      if (t < T.unwrap) sandwich(x, sx, sy, 'wrapped')
      else if (t < T.eat) { const fall = t > T.change && t < T.change + 0.5 ? Math.sin((t - T.change) * 40) * 6 : 0; sandwich(x, sx + fall, sy, 'open') }
      else sandwich(x, lerp(sx, r.x - 150, prog(t, T.eat, T.eat + 0.3)), lerp(sy, r.y + 20, prog(t, T.eat, T.eat + 0.3)), 'open', clamp((t - T.eat - 0.6) / 1.2))
      // the alert flash
      if (t > T.change && t < T.change + 0.6) { x.save(); x.globalAlpha = 0.25 * (1 - (t - T.change) / 0.6); x.fillStyle = RED; x.fillRect(-200, -200, 1480, 2320); x.restore() }
      x.restore()

      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'taurus' })
      processing(x, t)
      for (const s of SAY) speechBubble(x, t, { ...s, x: 790, y: 860, name: '♉ TAURUS', color: TA.color, side: -0.1 })
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.8 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.5 * cam.flash; x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.adapt, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E07' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...Array.from({ length: 14 }, (_, i) => ['tick', r3(0.15 + i * 0.36), 0.014]),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 659.25 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.03 })),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur, { gain: 0.022 })),
  ['tick', T.unwrap, 0.06], ['whoosh', T.unwrap, 0.3, 0.03], ['bell', T.unwrap + 0.1, 1567.98, 0.03, 1.2, 0],
  ['boom', T.change, 0.35], ['crash', T.change, { gain: 0.05, len: 1.6 }], ...[0, 0.12, 0.24].map(d => ['pop', r3(T.change + d), 1864.66, 0.045, 0]),
  ['riser', T.process[0], T.process[1], 0.04], ...Array.from({ length: 8 }, (_, i) => ['tick', r3(T.process[0] + 0.3 + i * 0.32), 0.03]),
  ['pop', T.process[1], 1174.66, 0.045, 0],
  ['pop', T.adapt + 0.15, 932.33, 0.04, -0.3], ['pop', T.adapt + 0.3, 1174.66, 0.04, -0.3],
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(FACT.at, FACT),
  ['bell', T.payday + 0.6, 2093, 0.035, 1.2, -0.3], ['glitter', T.payday + 0.6, T.payday + 1.2],
  ['pop', T.eat + 0.6, 783.99, 0.035, 0.2], ['pop', T.eat + 1.2, 783.99, 0.035, 0.2],
  ['pop', T.last, 932.33, 0.045, 0], ['pop', T.last + 0.35, 1244.51, 0.055, 0], ['pluck', T.last + 0.35, 1244.51, 0.045, 0.8, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
