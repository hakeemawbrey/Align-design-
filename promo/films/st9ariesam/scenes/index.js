// st9ariesam (22 s vertical, Star Talk season 9 "A Day in the Life", S9 E01, MORNING) · story 0–17.6, then the end card.
//   "POV: an Aries’ alarm goes *off.*"  The alarm rings at 6:00 and Aries is already up, mid jumping-jack, headband on.
//   A SPEEDRUN HUD (any%, splits) races the morning: workout (done before the alarm), a ninety-second shower (a steam
//   cloud, a towel turban), outfit on the first try, breakfast standing up in the kitchen. Fact chip: in traditional
//   astrology Aries rules the head, hence "headfirst". Aries charges headfirst for the door, spots its own fridge note
//   ("EAT SITTING DOWN (pls)"), the HUD pauses, and it sits. Last shot = frame 0's framing: the alarm rings again and
//   Aries, sitting on the bed with toast, just smiles.   "Start fast. *Eat* first."
//   Rewatch bait: the fridge note is on screen from the first kitchen shot. Ghost: peeks out from behind the fridge.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawAriesHome, drawDumbbell, ARIES_HOME } from '../../st9arieshome.js'

export const DURATION = 22
const KEY = 'Em'
const STORY_END = DURATION - ENDCARD_LEN         // 17.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236', MINT = '#7dffb0'
const AR = signStar('aries')
const NAME = '♈ ARIES'

const T = {
  hookOut: 2.55, alarmOff: 1.7,
  workout: 2.6, shower: 5.2, outfit: 7.6, kitchen: 9.6, toast: 10.05, ghost: 10.7,
  fact: 11.4, charge: 12.2, note: 12.75, sit: 13.5, back: 15.0, last: 15.15, lastOut: [16.95, 17.2], fade: [17.15, 17.6],
}
const CUTS = [T.shower, T.kitchen, T.back]
const PUNCH = [{ at: T.workout, out: T.shower - 0.12, zoom: 1.28, x: 800, y: 1080 }, { at: T.note, out: T.sit - 0.1, zoom: 1.9, x: 160, y: 640 }]
const CLOCK = [
  { at: 0, from: '6:00', to: '6:00' },
  { at: T.shower + 0.2, dur: 0.6, from: '6:00', to: '6:04' },
  { at: T.outfit + 0.1, dur: 0.4, from: '6:04', to: '6:05' },
  { at: T.kitchen + 0.2, dur: 0.5, from: '6:05', to: '6:07' },
  { at: T.sit + 0.2, dur: 1.2, from: '6:07', to: '6:20' },
]
const SPLITS = [
  { name: 'WAKE UP', done: 0 }, { name: 'WORKOUT', done: T.workout + 0.3 }, { name: 'SHOWER', done: T.outfit - 0.3 },
  { name: 'OUTFIT', done: T.outfit + 0.7 }, { name: 'BREAKFAST', done: T.sit + 0.4, paused: true },
]
const SAY = [
  { text: 'oh, i’ve been *up.*', at: 0.45, out: 2.45 },
  { text: 'set *four.* that was the warm-up.', at: 3.35, out: 5.05 },
  { text: 'breakfast is a *pit stop.*', at: 10.4, out: 12.1 },
  { text: 'fine. sitting *down.*', at: 13.75, out: 14.95 },
]
const STAMPS = [
  { at: T.workout + 0.1, out: T.shower - 0.2, time: '6:00 AM', text: 'already did a *workout*' },
  { at: T.shower + 0.45, out: T.outfit - 0.15, time: '6:04 AM', text: 'shower: *ninety* seconds' },
  { at: T.outfit + 0.75, out: T.kitchen - 0.15, time: '6:05 AM', text: 'outfit: *first* try' },
  { at: T.kitchen + 0.2, out: T.sit - 0.15, time: '6:07 AM', text: 'breakfast, *standing up*' },
  { at: T.sit + 0.35, out: T.back - 0.1, time: '6:20 AM', text: 'okay, *sitting* down' },
]
const FACT = { text: 'In traditional astrology, Aries rules the head. Hence “headfirst”.', at: T.fact, dur: 3.2, y: 1694, label: '★ ASTROLOGY SAYS' }
export const GHOST = { at: T.ghost, x: 318, y: 800, where: 'peeking out from behind the right edge of the fridge, kitchen' }

const HATS = ['cap', 'beanie', 'band']
function drawHat(x, kind, cx, top, s) {
  const P = Math.max(4, Math.round(s / 40))
  x.save(); x.imageSmoothingEnabled = false
  if (kind === 'band') { x.fillStyle = '#ffffff'; x.fillRect(cx - 11 * P, top + 9 * P, 22 * P, 3 * P); x.fillStyle = AR.color; x.fillRect(cx - 11 * P, top + 10 * P, 22 * P, P) }
  else if (kind === 'cap') { x.fillStyle = '#3a7bd5'; x.fillRect(cx - 7 * P, top + 2 * P, 14 * P, 5 * P); x.fillRect(cx, top + 6 * P, 12 * P, 2 * P) }
  else if (kind === 'beanie') { x.fillStyle = '#7dd36b'; x.fillRect(cx - 7 * P, top + 1 * P, 14 * P, 6 * P); x.fillStyle = '#ffffff'; x.fillRect(cx - 2 * P, top - P, 4 * P, 2 * P) }
  else if (kind === 'towel') { x.fillStyle = '#fff4e0'; x.fillRect(cx - 9 * P, top - P, 18 * P, 8 * P); x.fillRect(cx - 4 * P, top - 4 * P, 8 * P, 4 * P); x.fillStyle = '#e8d6bb'; x.fillRect(cx - 9 * P, top + 5 * P, 18 * P, P) }
  x.restore()
}
function drawToast(x, cx, cy, s = 1, bite = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = '#7a4a22'; x.fillRect(-30, -30, 60, 56); x.fillStyle = '#e2a55c'; x.fillRect(-24, -24, 48, 44)
  x.fillStyle = '#f7d36a'; x.fillRect(-12, -10, 20, 12)
  if (bite) { x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(28, -26, 14 * bite, 0, Math.PI * 2); x.fill() }
  x.restore()
}
function steam(x, t, cx, cy, t0) {
  const p = prog(t, t0, t0 + 0.8)
  if (p <= 0 || p >= 1) return
  x.save()
  for (let i = 0; i < 14; i++) {
    const a = i * 2.4, r = 60 + (i % 4) * 40
    const k = Math.sin(Math.PI * p)
    x.globalAlpha = 0.9 * k
    x.fillStyle = i % 2 ? '#ffffff' : '#e6eef8'
    x.beginPath(); x.arc(cx + Math.cos(a) * r * (0.6 + p), cy + Math.sin(a) * r * 0.7 - p * 60, 70 + (i % 3) * 24, 0, Math.PI * 2); x.fill()
  }
  x.restore()
}
/** the speedrun HUD: any% timer from the in-world clock, splits ticking green */
function speedrunHUD(x, t, mins, a) {
  if (a <= 0) return
  const x0 = 66, y0 = 254, w = 360
  const paused = t >= T.sit + 0.4
  x.save(); x.globalAlpha = a
  x.fillStyle = 'rgba(10,6,24,0.82)'; x.fillRect(x0, y0, w, 60 + SPLITS.length * 40)
  x.fillStyle = '#ff5a3c'; x.fillRect(x0, y0, w, 6)
  x.font = `700 20px 'Space Mono', monospace`; x.textBaseline = 'middle'; x.textAlign = 'left'
  x.fillStyle = '#ffb199'; x.fillText('ARIES% · ANY%', x0 + 16, y0 + 24)
  const el = Math.max(0, mins - 360), mm = Math.floor(el), ss = Math.floor((el - mm) * 60), cs = Math.floor(((t * 100) % 100))
  x.textAlign = 'right'; x.font = `700 28px 'Space Mono', monospace`
  x.fillStyle = paused ? (Math.floor(t * 3) % 2 ? '#ffffff' : GOLD) : MINT
  x.fillText(paused ? '❚❚ PAUSED' : `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(cs).padStart(2, '0')}`, x0 + w - 14, y0 + 26)
  SPLITS.forEach((s, i) => {
    const yy = y0 + 70 + i * 40, done = t >= s.done
    const isCur = !done && (i === 0 || t >= SPLITS[i - 1].done)
    x.textAlign = 'left'; x.font = `700 22px 'Space Mono', monospace`
    x.fillStyle = done ? MINT : isCur ? '#ffffff' : 'rgba(239,230,214,0.45)'
    x.fillText((isCur ? '▶ ' : '  ') + s.name, x0 + 12, yy)
    x.textAlign = 'right'
    x.fillText(done ? (s.paused ? 'SAT ✓' : '✓') : '—', x0 + w - 14, yy)
    if (done && t < s.done + 0.35) { x.globalAlpha = a * (1 - (t - s.done) / 0.35); x.fillStyle = MINT; x.fillRect(x0, yy - 18, w, 36); x.globalAlpha = a }
  })
  x.restore()
}

/** a soft dark wash behind the top type (the hook at frame 0, the last line at the end) */
function topScrim(x, t) {
  const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
  if (k <= 0) return
  const g = x.createLinearGradient(0, 0, 0, 820)
  g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
  x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'POV: an Aries’ alarm | goes *off.*', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Start fast. | *Eat* first.', { top: 290, size: 112, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.09, accentColor: GOLD, wobble: true, late: 1, lateAt: T.last + 0.38, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const room = t < T.kitchen || t >= T.back ? 'bedroom' : 'kitchen'
      const ck = clockTrack(t, CLOCK)
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: 6.2 + (t / STORY_END) * 0.4 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const ring = (t < T.alarmOff) || (t >= T.back + 0.1 && t < T.back + 1.3)
      const g = drawAriesHome(x, t, { room, ep: 1, ring })
      if (room === 'kitchen') drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'left', cell: 3 })
      // Aries
      let ax = g.stand[0] + 30, ay = g.stand[1], sz = 330, mood = 'happy', look, squash = 0, hops = [], hat = 'band', bob
      if (t < T.workout) {                                          // jumping jacks, already up
        const ph = (t * 3.2) % 1
        hops = [0.05, 0.36, 0.67, 0.98, 1.29, 1.6, 1.91, 2.22]
        squash = Math.sin(ph * Math.PI * 2) * 0.12
        mood = t < T.alarmOff ? 'wide' : 'happy'; look = [-1, 0]
      } else if (t < T.shower) {                                    // curls
        mood = 'squint'; look = [0, 0]
      } else if (t < T.outfit) {                                    // fresh from the shower
        hat = t < T.shower + 0.4 ? null : 'towel'; mood = 'sparkle'
      } else if (t < T.kitchen) {                                   // outfit, first try
        const k = t - T.outfit
        hat = k < 0.6 ? HATS[Math.floor(k * 10) % 3] : 'band'; mood = k < 0.6 ? 'squint' : 'happy'
        if (k >= 0.6 && k < 0.7) hops = [T.outfit + 0.6]
      } else if (t < T.back) {
        if (t < T.charge) { ax = 520; mood = 'happy'; hops = [10.3, 10.6, 10.9, 11.2, 11.5, 11.8, 12.1] }
        else if (t < T.sit) {                                        // headfirst for the door … stops at the note
          const p = ease.inOutCubic(prog(t, T.charge, T.charge + 0.35)), back = ease.inOutCubic(prog(t, T.note, T.note + 0.4))
          ax = lerp(520, 960, p) - (960 - 520) * 0.15 * back; mood = t < T.note ? 'squint' : 'wide'; look = t < T.note ? [1, 0] : [-1, -1]
          squash = t < T.note ? -0.12 : 0
        } else { const p = ease.inOutCubic(prog(t, T.sit, T.sit + 0.5)); ax = lerp(894, g.seat[0], p); ay = lerp(1190, g.seat[1] - 40, p); mood = 'happy'; hops = [T.sit + 0.5] }
      } else { ax = 380; ay = 1050; sz = 270; mood = 'happy'; look = [1, 0]; bob = 4 }  // on the bed, toast in hand
      const r = drawStarChar(x, ax, ay, sz, t, { color: AR.color, glyph: AR.glyph, mood, look, squash, hops, seed: 9, bob })
      if (hat) drawHat(x, hat, r.x, r.top - 6, sz)
      if (t >= T.workout && t < T.shower) {                         // the dumbbell curl
        const c = 0.5 + 0.5 * Math.sin((t - T.workout) * 7)
        drawDumbbell(x, r.x + sz * 0.5, r.y + 40 - c * 110, 0.85)
        if (Math.floor(t * 4) % 3 === 0) { x.fillStyle = '#8fe3ff'; x.fillRect(r.x - sz * 0.32, r.top + 40 + ((t * 120) % 40), 8, 14) }
      }
      if (t >= T.toast && t < T.charge) {                           // toast pops, gets eaten
        const p = prog(t, T.toast, T.toast + 0.5)
        const tx = lerp(530, r.x + sz * 0.42, ease.inOutQuad(p)), ty = 880 - Math.sin(Math.PI * p) * 220 + p * 140
        drawToast(x, tx, ty, 1.1, clamp((t - T.toast - 0.8) / 1.0))
      }
      if (t >= T.sit + 0.5 && t < T.back) drawToast(x, 760, 1360, 0.9, 0.5)
      if (t >= T.back) drawToast(x, r.x + sz * 0.45, r.y + 20, 1, 0.3 + 0.1 * Math.sin(t * 3))
      steam(x, t, g.stand[0], 1060, T.shower - 0.15)
      x.restore()

      // the chrome
      topScrim(x, t)
      const mins = drawClock(x, t, { ...ck, sign: 'aries' }).minutes
      speedrunHUD(x, t, mins, (t >= T.workout ? ease.outCubic(prog(t, T.workout, T.workout + 0.25)) : 0) * (1 - prog(t, T.back - 0.25, T.back)))
      for (const s of SAY) speechBubble(x, t, { ...s, x: s.at > T.kitchen && s.at < T.sit ? 520 : s.at > T.sit ? 780 : 800, y: s.at > T.sit ? 1050 : s.at > T.kitchen ? 980 : 940, name: NAME, color: AR.color })
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.9 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.5 * cam.flash; x.fillStyle = '#fff6ea'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      // hand-off to the plain sky
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) { drawSky(ex, t, SKY_H) }
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.kitchen, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E01' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const NOTE = [659.25, 739.99, 830.61, 987.77, 1108.73, 1318.51]
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...Array.from({ length: 7 }, (_, i) => ['pop', r3(0.05 + i * 0.25), 1760, 0.03, 0.3]),        // the alarm
  ['tick', T.alarmOff, 0.08], ['pop', T.alarmOff + 0.02, 659.25, 0.04, 0.2],
  ...[0.05, 0.36, 0.67, 0.98, 1.29, 1.6, 1.91, 2.22].map(h => ['tick', r3(h + 0.12), 0.02]),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 880 })),
  ...STAMPS.flatMap(s => stampCues(s.at)),
  ...SPLITS.slice(1).map((s, i) => ['pop', r3(s.done), NOTE[(i + 2) % NOTE.length], 0.045, -0.4]),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur)),
  ['whoosh', T.shower - 0.1, 0.8, 0.07], ['glitter', T.shower + 0.3, T.shower + 0.9],
  ...[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d, i) => ['pop', r3(T.outfit + d), NOTE[i], 0.03, 0]), ['bell', T.outfit + 0.62, 1318.51, 0.03, 1, 0],
  ['tick', T.toast - 0.02, 0.1], ['pop', T.toast, 1318.51, 0.05, 0.2], ['whoosh', T.toast + 0.05, 0.4, 0.04],
  ['tick', T.ghost + 0.05, 0.015],
  ...factChipCues(FACT.at, FACT),
  ['whoosh', T.charge, 0.35, 0.06], ['boom', T.note, 0.2], ['pluck', T.note + 0.05, 987.77, 0.05, 0.6, -0.4],
  ['pop', T.sit + 0.4, 659.25, 0.05, 0], ['pop', T.sit + 0.5, 987.77, 0.04, 0],
  ...Array.from({ length: 5 }, (_, i) => ['pop', r3(T.back + 0.1 + i * 0.25), 1760, 0.022, -0.3]),
  ['pop', T.last, 987.77, 0.04, 0], ['pop', T.last + 0.09, 1108.73, 0.04, 0], ['pop', T.last + 0.38, 1318.51, 0.055, 0], ['pluck', T.last + 0.38, 1318.51, 0.045, 0.7, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
