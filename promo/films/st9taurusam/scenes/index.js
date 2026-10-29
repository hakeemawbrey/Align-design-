// st9taurusam (25 s vertical, Star Talk season 9 "A Day in the Life", S9 E06, MORNING) · story 0–20.6, then the end card.
//   "POV: a Taurus’ *14-step* morning."  A STEP COUNTER HUD (14 pips) runs the routine: snooze ×3 (7:00 → 7:09 → 7:18,
//   "five more *minutes.*"), stretch, the robe off its hook, slippers; the kitchen: kettle on, grind the beans, the bloom
//   ("do not rush the *bloom.*"), wait, first sip. Fact chip: in traditional astrology Taurus rules the throat and neck,
//   which is why the voice and singing come up so often (it hums over the coffee). The window room: it waters the
//   monstera (a new leaf unfurls), puts a record on and sinks into the armchair: 14/14. Last shot rhymes with frame 0:
//   the phone buzzes STANDUP IN 5 and Taurus, calm, taps snooze.   "Slow mornings are *self-respect.*"
//   Rewatch bait: the coffee bag says SLOW ROAST. Ghost: peeks out from behind the monstera.
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
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, phoneScreen, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawTaurusHome } from '../../st9taurushome.js'

export const DURATION = 25
const KEY = 'F'
const STORY_END = DURATION - ENDCARD_LEN         // 20.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0'
const TA = signStar('taurus')
const MONO = "'Space Mono', monospace"
const ROBE = '#e8a0a8'

const T = {
  hookOut: 2.75, up: 3.0, kitchen: 5.7, fact: 10.6, window: 14.4, leaf: 14.95, sit: 16.8, buzz: 17.3, tap: 18.0,
  ghost: 15.5, last: 17.6, lastOut: [19.95, 20.2], fade: [20.15, 20.6],
}
const STEPS = [
  ['SNOOZE', 0], ['SNOOZE', 1.2], ['SNOOZE', 2.4], ['STRETCH', 3.3], ['ROBE', 4.1], ['SLIPPERS', 4.9],
  ['KETTLE ON', 5.95], ['GRIND BEANS', 6.9], ['THE BLOOM', 8.0], ['WAIT', 9.2], ['FIRST SIP', 10.4],
  ['WATER PLANTS', 14.6], ['RECORD ON', 15.8], ['SIT', T.sit],
]
const CUTS = [T.kitchen, T.window]
const PUNCH = [{ at: 10.4, out: T.window - 0.1, zoom: 1.25, x: 540, y: 1080 }]
const CLOCK = [
  { at: 0, from: '7:00' }, { at: 1.15, dur: 0.3, from: '7:00', to: '7:09' }, { at: 2.35, dur: 0.3, from: '7:09', to: '7:18' },
  { at: T.up, dur: 0.3, from: '7:18', to: '7:27' }, { at: T.kitchen + 0.1, dur: 0.6, from: '7:27', to: '7:41' },
  { at: 9.2, dur: 1.0, from: '7:41', to: '7:52' }, { at: T.window + 0.1, dur: 1.0, from: '7:52', to: '8:15' },
]
const RINGS = [[0, 0.6, '7:00'], [1.2, 1.75, '7:09'], [2.4, 2.9, '7:18']]
const SAY = [
  { text: 'five more *minutes.*', at: 0.35, out: 2.6 },
  { text: 'do not rush the *bloom.*', at: 8.05, out: 9.85 },
]
const STAMPS = [
  { at: T.up + 0.05, out: T.kitchen - 0.15, time: '7:27 AM', text: 'snoozed *three* times' },
  { at: T.kitchen + 0.3, out: 8.0, time: '7:41 AM', text: 'coffee is a *ceremony*' },
  { at: 15.0, out: T.last - 0.1, time: '8:15 AM', text: '*finally* ready' },
]
const FACT = { text: 'In traditional astrology, Taurus rules the throat and neck, which is why the voice and singing come up so often.', at: T.fact, dur: 3.9, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 1010, y: 1000, where: 'peeking out from behind the monstera, right edge, window room' }

const stepNow = t => { let n = 0; STEPS.forEach(([, at], i) => { if (t >= at) n = i + 1 }); return n }
function stepHUD(x, t) {
  const n = stepNow(t), done = n === 14 && t > T.sit + 0.2
  const a = 1 - prog(t, T.last - 0.2, T.last + 0.1)
  if (a <= 0) return
  const x0 = 66, y0 = 1300, w = 460
  x.save(); x.globalAlpha = a
  x.fillStyle = 'rgba(16,22,14,0.86)'; x.fillRect(x0, y0, w, 168); x.fillStyle = '#7fa37f'; x.fillRect(x0, y0, w, 6)
  x.font = `700 20px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = '#cfe5c8'; x.fillText('MORNING ROUTINE', x0 + 16, y0 + 28)
  x.textAlign = 'right'; x.fillStyle = done ? GOLD : '#ffffff'; x.font = `700 40px ${MONO}`
  x.fillText(done ? '14/14 ✓' : `${String(n).padStart(2, '0')}/14`, x0 + w - 16, y0 + 34)
  x.textAlign = 'left'; x.font = `700 30px ${MONO}`; x.fillStyle = done ? GOLD : MINT
  const just = STEPS[n - 1]?.[1] ?? 0, k = clamp((t - just) / 0.2)
  x.globalAlpha = a * k
  x.fillText(done ? 'COMPLETE' : `▶ ${STEPS[Math.max(0, n - 1)][0]}`, x0 + 16, y0 + 84)
  x.globalAlpha = a
  for (let i = 0; i < 14; i++) { x.fillStyle = i < n ? (done ? GOLD : MINT) : '#3a4636'; x.fillRect(x0 + 16 + i * 30, y0 + 120, 22, 26) }
  x.restore()
}
function robeOn(x, r, sz) {
  x.save(); x.globalAlpha = 0.95
  const y0 = r.y + sz * 0.17, h = sz * 0.24
  x.fillStyle = ROBE; x.fillRect(r.x - sz * 0.3, y0, sz * 0.6, h)
  x.fillStyle = '#f7c4c8'; x.fillRect(r.x - sz * 0.3, y0, sz * 0.6, sz * 0.05)
  x.beginPath(); x.moveTo(r.x - sz * 0.12, y0); x.lineTo(r.x, y0 + h * 0.7); x.lineTo(r.x + sz * 0.12, y0); x.fill()
  x.fillStyle = '#d88890'; x.fillRect(r.x - sz * 0.3, y0 + h * 0.55, sz * 0.6, sz * 0.03)
  x.restore()
}
function slippers(x, cx, cy) { x.fillStyle = '#f7c4c8'; x.fillRect(cx - 80, cy, 60, 24); x.fillRect(cx + 20, cy, 60, 24); x.fillStyle = '#ffffff'; x.fillRect(cx - 74, cy - 6, 48, 10); x.fillRect(cx + 26, cy - 6, 48, 10) }
function grinder(x, cx, cy, t, on) {
  x.fillStyle = '#c9ccd8'; x.fillRect(cx - 26, cy - 60, 52, 60); x.fillStyle = '#6b3a22'; x.fillRect(cx - 30, cy, 60, 30)
  const a = on ? t * 9 : 0
  x.save(); x.translate(cx, cy - 66); x.rotate(a); x.fillStyle = INK; x.fillRect(0, -4, 44, 8); x.fillRect(40, -10, 10, 20); x.restore()
}
function coffeeBag(x, cx, cy) {
  x.fillStyle = '#6b3a22'; x.fillRect(cx - 40, cy - 90, 80, 90); x.fillStyle = '#f3e8cf'; x.fillRect(cx - 32, cy - 64, 64, 40)
  x.font = `700 12px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('SLOW', cx, cy - 52); x.fillText('ROAST', cx, cy - 36)
}
function drips(x, t, cx, cy, t0, t1) {
  if (t < t0 || t > t1) return
  x.fillStyle = '#6b3a22'
  for (let i = 0; i < 3; i++) { const p = ((t - t0) * 1.6 + i / 3) % 1; x.fillRect(cx - 3, cy + p * 40, 6, 10) }
}
function wateringCan(x, cx, cy, tilt) {
  x.save(); x.translate(cx, cy); x.rotate(tilt)
  x.fillStyle = '#7fa37f'; x.fillRect(-40, -30, 80, 60); x.fillRect(36, -20, 60, 10); x.fillRect(-40, -46, 50, 12)
  x.restore()
}
function notes(x, t, cx, cy, t0, t1) {
  if (t < t0 || t > t1) return
  x.save(); x.font = `700 40px 'EB Garamond', serif`; x.fillStyle = GOLD
  for (let i = 0; i < 3; i++) { const p = ((t - t0) * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * p); x.fillText(i % 2 ? '♪' : '♫', cx + 60 + i * 34 + Math.sin(p * 6 + i) * 12, cy - p * 160) }
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: a Taurus’ | *14-step* morning.', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Slow mornings are | *self-respect.*', { top: 290, size: 100, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: GOLD, wobble: true, late: 1, lateAt: T.last + 0.5, fit: true })
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
      const room = t < T.kitchen ? 'bedroom' : t < T.window ? 'kitchen' : 'window'
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: 6.8 + (t / STORY_END) * 1.6 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const g = drawTaurusHome(x, t, { room, ep: 1, spin: t > 15.8, steam: room === 'kitchen' ? clamp((t - 6.2) / 0.8) : 0, leafAt: room === 'window' ? T.leaf : null, robe: t < 4.1 })
      if (room === 'window') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      let tx = 660, ty = 1040, sz = 300, mood = 'sleepy', look, hops = [], squash = 0
      if (room === 'bedroom') {
        if (t < T.up) { mood = RINGS.some(([a, b]) => t > a && t < b) ? 'squint' : 'sleepy'; squash = 0.14; hops = [0.6, 1.75, 2.9] }
        else { tx = lerp(660, 620, prog(t, T.up, T.up + 0.4)); ty = lerp(1040, 1110, prog(t, T.up, T.up + 0.4)); mood = t < 4.1 ? 'squint' : 'happy'; squash = t > 3.3 && t < 4.0 ? -0.2 * Math.sin(prog(t, 3.3, 4.0) * Math.PI) : 0; hops = [4.15, 4.95] }
      } else if (room === 'kitchen') { tx = 560; ty = 1180; mood = t < 10.4 ? (t < 8 ? 'happy' : 'neutral') : 'heart'; look = t < 10.4 ? [-1, 0.6] : [0, 0]; hops = [5.95, 6.9, 8.0, 10.45] }
      else {
        const sit = prog(t, T.sit, T.sit + 0.5)
        tx = t < T.sit ? lerp(760, 820, prog(t, 14.6, 15.4)) : lerp(820, 520, ease.inOutCubic(sit)); ty = t < T.sit ? 1100 : lerp(1100, 1050, sit)
        mood = t < T.buzz ? 'happy' : t < T.tap ? 'neutral' : 'happy'; look = t < T.sit ? [1, 0] : [1, 0.5]; hops = [14.6, 15.8, T.sit + 0.5, T.tap]
      }
      const r = drawStarChar(x, tx, ty, sz, t, { color: TA.color, glyph: TA.glyph, mood, look, hops, squash, seed: 14 })
      if (room === 'bedroom' && t < T.up) { x.fillStyle = '#7fa37f'; x.fillRect(420, 1086, 380, 156); x.fillStyle = '#9cc29a'; x.fillRect(420, 1086, 380, 18) }  // the duvet, tucked up to its chin
      if (t >= 4.1) robeOn(x, r, sz)
      if (t >= 4.9) slippers(x, r.x, r.y + sz * 0.38)
      if (room === 'kitchen') {
        coffeeBag(x, 400, 990)
        grinder(x, 230, 990, t, t > 6.9 && t < 8.0)
        drips(x, t, 330, 990, 8.0, 10.2)
        if (t > 9.2 && t < 10.4) { x.save(); x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.fillStyle = '#ffffff'; x.fillText(`0:${String(Math.max(0, 30 - Math.floor((t - 9.2) * 25))).padStart(2, '0')}`, 330, 860); x.restore() }
        if (t > 10.4) { x.fillStyle = '#f3e8cf'; x.fillRect(r.x + 110, r.y - 10, 50, 56); x.fillRect(r.x + 160, r.y + 4, 14, 26); notes(x, t, r.x, r.top, 10.9, T.window) }
      }
      if (room === 'window' && t > 14.6 && t < 15.6) wateringCan(x, r.x + 130, r.y - 40, Math.min(0.6, (t - 14.6) * 1.5))
      if (room === 'window' && t > 14.8 && t < 15.5) { x.fillStyle = '#8fe3ff'; for (let i = 0; i < 4; i++) x.fillRect(r.x + 230 + i * 8, r.y + ((t * 300 + i * 30) % 100), 6, 12) }
      x.restore()

      // the alarm phone (bedroom), the buzzing phone on the armrest (last shot)
      if (room === 'bedroom' && t < T.up + 0.3) {
        const ring = RINGS.find(([a, b]) => t >= a && t < b + 0.4) || RINGS[2]
        phoneScreen(x, t, { x: 270, y: 1120, w: 300, h: 520, app: 'alarm', title: 'Snooze', clock: ring[2], lines: [{ text: ring[2], at: ring[0], stop: ring[1] }, { text: 'wake up :)' }], pop: 1 - prog(t, T.up, T.up + 0.3), rot: -0.06, accent: '#7fa37f' })
      }
      if (t > T.buzz) phoneScreen(x, t, { x: 840, y: 1150, w: 300, h: 520, app: 'alarm', title: 'Snooze', clock: '8:25', lines: [{ text: '8:25', at: T.buzz, stop: T.tap }, { text: 'STANDUP IN 5' }], pop: ease.outCubic(prog(t, T.buzz, T.buzz + 0.25)) * (1 - prog(t, T.lastOut[0] - 0.2, T.lastOut[0])), rot: 0.06, accent: '#7fa37f' })
      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'taurus' })
      stepHUD(x, t)
      for (const s of SAY) speechBubble(x, t, { ...s, x: s.at < 3 ? 660 : 560, y: s.at < 3 ? 880 : 1020, name: '♉ TAURUS', color: TA.color, side: 0.2 })
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.95 })
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

const CARD_CUTS = [{ t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E06' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const NOTE = [698.46, 783.99, 880, 932.33, 1046.5, 1174.66, 1318.51]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...RINGS.flatMap(([a, b]) => Array.from({ length: Math.round((b - a) / 0.2) }, (_, i) => ['pop', r3(a + 0.05 + i * 0.2), 1567.98, 0.025, -0.4])),
  ...STEPS.map(([, at], i) => ['pop', r3(at + 0.02), NOTE[i % NOTE.length], 0.035, -0.3]),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 659.25 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.03 })),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur, { gain: 0.022 })),
  ['whoosh', 6.2, 1.2, 0.03], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(6.9 + i * 0.18), 0.04]),
  ...Array.from({ length: 5 }, (_, i) => ['pop', r3(8.1 + i * 0.4), 523.25, 0.02, 0]),
  ['bell', 10.45, 1046.5, 0.035, 1.6, 0],
  ...factChipCues(FACT.at, FACT),
  ['glitter', T.leaf, T.leaf + 0.8], ['bell', T.leaf + 0.1, 1567.98, 0.03, 1.4, 0.3],
  ['tick', 15.8, 0.05], ['pluck', 15.85, 880, 0.03, 0.8, 0.3],
  ['bell', T.sit + 0.6, 1318.51, 0.04, 1.6, 0], ['glitter', T.sit + 0.4, T.sit + 1.0],
  ['tick', T.ghost + 0.05, 0.015],
  ...Array.from({ length: 3 }, (_, i) => ['pop', r3(T.buzz + 0.05 + i * 0.22), 1567.98, 0.022, 0.4]), ['tick', T.tap, 0.06],
  ...[0, 0.1, 0.2, 0.5].map((d, i) => ['pop', r3(T.last + d), [783.99, 880, 1046.5, 1318.51][i], 0.04, 0]), ['pluck', T.last + 0.5, 1318.51, 0.045, 0.8, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
