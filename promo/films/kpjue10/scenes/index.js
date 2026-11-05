// kpjue10 · PLANET TALK: JUPITER → CAPRICORN · "Capricorn's Fifteen-Minute Date" (28 s, star_advice, hard cut).
//   0.0  frame 0: Jupiter smashing through Capricorn's calendar grid, too big for one slot, the week cracking, slots
//        flying. Hook "CAPRICORN. I don't fit in 15 minutes." Shake + whip.
//   3.0  a date squeezed between two meetings.   7.0  checked the time six times.   10.8  growth needs room.
//  15.0  block a whole evening, phone in a drawer.   18.8  Capricorn laughs for real.
//  21.8  "lunch with Pisces (crying)" + Pisces crying happily.   24.8  "No agenda. Just them." hard cut.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, phone, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 28
const JS = planetSize('jupiter', 520)
const IN = { at: -0.25, x: 540, y: 640, size: JS }
const HOOK = { at: -1, text: 'CAPRICORN. I don’t fit | in *15 minutes.*', top: 1180, size: 92, out: [2.7, 2.95] }
const SHAKE = { at: -0.1, len: 0.6, amp: 28 }
const WHIP = { at: 0.5, from: 1.45 }
const DATE = 7.0, EVENING = 18.6
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const GRID = { x: 70, y: 200, w: 940, h: 880, rows: 10 }

const B = [
  { t0: 3.0, t1: 6.8, x: 540, y: 1210, who: 'capricorn', text: 'I fit a date in! *Fifteen minutes.* Between two meetings.', tail: 0, maxW: 740 },
  { t0: 7.2, t1: 10.6, x: 540, y: 1210, who: 'jupiter', text: 'Kiddo. You checked the time *six times.*', tail: 0, tailUp: true },
  { t0: 10.8, t1: 14.8, x: 540, y: 1210, who: 'jupiter', text: 'In astrology I’m growth. And growth needs *room.*', tail: 0, tailUp: true },
  { t0: 15.0, t1: 18.4, x: 540, y: 1210, who: 'jupiter', text: 'Block a whole evening. Phone in a *drawer.*', tail: 0, tailUp: true },
  { t0: 19.0, t1: 21.6, x: 380, y: 1260, who: 'capricorn', text: 'HA— wait, was that *me?*', tail: -40 },
  { t0: 21.8, t1: 24.6, x: 700, y: 1260, who: 'pisces', text: 'I’m just *proud* 😭', tail: 60 },
  { t0: 24.8, t1: 29, x: 380, y: 1260, who: 'capricorn', text: 'No agenda. *Just them.*', tail: -40 },
]
const SLOTS = [[0, 1, 'MEETING'], [0, 3, 'MEETING'], [1, 0, 'REPORT'], [1, 2, 'MEETING'], [2, 1, 'MEETING'], [2, 4, 'CALL'], [3, 0, 'MEETING'], [3, 2, 'REVIEW'], [4, 1, 'MEETING'], [4, 3, 'CALL'], [5, 0, 'PLAN WEEK'], [6, 2, 'PLAN MONTH'], [1, 5, 'MEETING'], [3, 6, 'MEETING'], [4, 6, 'CALL']].filter(([c, r]) => !(c === 6 && r >= 3) && !(c === 0 && r >= 3))

function calendar(x, t, smash, mode) {
  const cw = GRID.w / 7, rh = (GRID.h - 60) / GRID.rows
  x.save()
  x.fillStyle = '#f6efe0'; rr(x, GRID.x, GRID.y, GRID.w, GRID.h, 20); x.fill()
  x.fillStyle = INK; x.font = '800 26px Inter'; x.textAlign = 'center'
  DAYS.forEach((d, i) => x.fillText(d, GRID.x + cw * (i + 0.5), GRID.y + 40))
  x.strokeStyle = 'rgba(27,18,54,0.15)'; x.lineWidth = 2
  for (let r = 0; r <= GRID.rows; r++) { x.beginPath(); x.moveTo(GRID.x, GRID.y + 60 + r * rh); x.lineTo(GRID.x + GRID.w, GRID.y + 60 + r * rh); x.stroke() }
  for (let c = 1; c < 7; c++) { x.beginPath(); x.moveTo(GRID.x + c * cw, GRID.y + 60); x.lineTo(GRID.x + c * cw, GRID.y + GRID.h); x.stroke() }
  SLOTS.forEach(([c, r, label], i) => {
    // slots fly off when smashed
    const a = i * 2.3, fly = smash
    const sx = GRID.x + c * cw + 6 + Math.cos(a) * 900 * fly, sy = GRID.y + 60 + r * rh * 1.5 + 6 + Math.sin(a) * 900 * fly - 300 * fly
    x.save(); x.translate(sx + cw / 2, sy + rh / 2); x.rotate(fly * (i % 2 ? 2 : -2))
    x.fillStyle = '#9db4e8'; rr(x, -cw / 2 + 6, -rh / 2, cw - 12, rh * 1.3, 8); x.fill()
    x.fillStyle = INK; x.font = '700 17px Inter'; x.fillText(label, 0, 6); x.restore()
  })
  if (mode === 'date') { x.fillStyle = '#ff8fb1'; rr(x, GRID.x + 0 * cw + 6, GRID.y + 60 + 5 * rh * 1.5, cw - 12, rh * 0.6, 6); x.fill(); x.strokeStyle = INK; x.lineWidth = 3; x.stroke(); x.fillStyle = INK; x.font = '800 15px Inter'; x.fillText('DATE 15m', GRID.x + 0.5 * cw, GRID.y + 60 + 5 * rh * 1.5 + 25) }
  if (mode === 'evening') {
    const k = easeOut(pr(t, 15.4, 15.9))
    x.fillStyle = GOLD; rr(x, GRID.x + 6 * cw + 4, GRID.y + 60 + rh * 4, cw - 8, rh * 6 * k, 10); x.fill(); x.strokeStyle = INK; x.lineWidth = 4; x.stroke()
    x.fillStyle = INK; x.font = '800 18px Inter'; if (k > 0.8) { x.fillText('WHOLE', GRID.x + 6.5 * cw, GRID.y + 60 + rh * 6.5); x.fillText('EVENING', GRID.x + 6.5 * cw, GRID.y + 60 + rh * 7.1) }
  }
  x.restore()
}

function cracks(x, t, cx, cy, k) {
  if (k <= 0) return
  x.save(); x.strokeStyle = INK; x.lineWidth = 6; x.globalAlpha = k
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + 0.2; let px = cx, py = cy; x.beginPath(); x.moveTo(px, py); for (let j = 0; j < 4; j++) { px += Math.cos(a + (j % 2 ? 0.3 : -0.3)) * 120; py += Math.sin(a + (j % 2 ? 0.3 : -0.3)) * 120; x.lineTo(px, py) } x.stroke() }
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 29 })
  const dateScene = t > DATE && t < 10.6
  const ending = t > EVENING
  if (!ending) {
    const smash = t < 2.8 ? easeOut(pr(t, -0.6, 1.4)) : 0
    const back = easeInOut(pr(t, 2.7, 3.2))
    if (t < 2.9) { calendar(x, t, smash, 'smash'); cracks(x, t, 540, 640, 1 - pr(t, 2.2, 2.8)) }
    else calendar(x, t, 0, t > 15 ? 'evening' : 'date')
    // Jupiter bursting through (then sits in front of the calendar, smaller)
    const P = entrance('burst', t, IN)
    drawEntranceFx(x, 'jupiter', 'burst', t, IN)
    const s = P.size * (1 - 0.35 * back), jy = P.y + 0 * back
    if (!dateScene) drawJupiter(x, P.x, jy, s, t, { rot: P.rot, alpha: P.alpha, mood: t < 3 ? 'wide' : 'happy', lines: H.lines, look: [0, 0.9], hops: [10.9, 15.1] })
    // the 15-minute date mini-scene
    if (dateScene) {
      const k = easeOut(pr(t, DATE, DATE + 0.3))
      x.save(); x.globalAlpha = k; x.fillStyle = 'rgba(7,4,26,0.85)'; x.fillRect(0, 160, 1080, 960); x.restore()
      drawJupiter(x, 860, 380, 300, t, { mood: 'sly', lines: H.lines, look: [-1, 1] })
      drawSign(x, 'taurus', 320, 760, 240, t, { mood: 'happy', look: [1, 0], hops: [7.6, 8.4, 9.2] })
      x.fillStyle = '#5a3a2a'; rr(x, 220, 900, 640, 30, 10); x.fill()
      const checks = Math.min(6, Math.floor((t - DATE) * 2.2) + 1)
      for (let i = 0; i < checks; i++) sticker(x, '⌚', 640 + (i % 3) * 90, 560 + Math.floor(i / 3) * 90, { size: 40, bg: '#ff8fb1', rot: (i % 2 ? 0.2 : -0.2) })
      drawSign(x, 'capricorn', 760, 760, 240, t, { mood: 'squint', look: [0, 1] })
    }
    drawSign(x, 'capricorn', 540, 1560, 290, t, { mood: t < 3 ? 'wide' : t < 10.8 ? 'happy' : t < 15 ? 'squint' : 'neutral', lines: H.lines, look: [0, -1], shadow: true })
    if (t > 3.6 && t < 6.8) sticker(x, '2:15 – 2:30', 820, 1400, { size: 34, bg: '#ff8fb1', rot: 0.06, scale: easeOut(pr(t, 3.7, 4)) })
    // phone into the drawer
    if (t > 16.2 && t < 18.6) {
      const k = easeInOut(pr(t, 16.4, 17.4))
      x.fillStyle = '#5a3a2a'; rr(x, 690, 1420, 300, 120, 12); x.fill(); x.strokeStyle = INK; x.lineWidth = 6; x.stroke()
      phone(x, 840, 1300 + k * 180, 110, 190, { title: '', alpha: 1 - pr(t, 17.2, 17.5) })
      sticker(x, 'DRAWER', 840, 1480, { size: 24 })
    }
  } else {
    // the whole evening: a long dinner, Pisces at the next table
    const k = easeOut(pr(t, EVENING, EVENING + 0.4))
    x.fillStyle = '#2c1838'; x.fillRect(0, 0, 1080, 1920)
    for (let i = 0; i < 8; i++) { x.fillStyle = GOLD; x.globalAlpha = 0.5 + 0.5 * Math.sin(t * 2 + i); x.beginPath(); x.arc(90 + i * 130, 200, 10, 0, Math.PI * 2); x.fill() }
    x.globalAlpha = 1
    // calendar strip
    x.fillStyle = '#f6efe0'; rr(x, 90, 290, 900, 200, 18); x.fill()
    x.fillStyle = INK; x.font = '800 30px Inter'; x.fillText('SUN', 125, 340)
    x.fillStyle = GOLD; rr(x, 220, 310, 740, 70, 10); x.fill(); x.fillStyle = INK; x.font = '800 28px Inter'; x.fillText('7 pm → late · no agenda', 250, 356)
    x.fillStyle = '#c9a6ff'; rr(x, 220, 400, 740, 70, 10); x.fill(); x.fillStyle = INK; x.fillText('MON · lunch with Pisces (crying)', 250, 446)
    drawJupiter(x, 880, 760, 300, t, { mood: 'happy', look: [-1, 1], tears: t > 21.8 ? 1 : 0 })
    x.fillStyle = '#5a3a2a'; rr(x, 140, 1480, 800, 40, 14); x.fill()
    const laugh = t > 18.8 && t < 21.8 ? Math.abs(Math.sin(t * 14)) : 0
    drawSign(x, 'capricorn', 330, 1400 - laugh * 30, 260, t, { mood: 'happy', lines: H.lines, look: [1, 0], hops: [25] })
    drawSign(x, 'taurus', 750, 1400, 260, t, { mood: 'happy', look: [-1, 0], hops: [19.2, 19.7] })
    const pk = easeOut(pr(t, 21.6, 22.0))
    if (pk > 0) pisces(x, 860, 1700, 220, t, { pop: pk, hops: [22.2, 22.9, 23.6], look: [-1, -1] })
    if (laugh) sticker(x, 'REAL LAUGH ✓', 540, 1140, { size: 36, bg: '#7dffb0', rot: -0.05 })
  }
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK,
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('burst', IN), ['crash', 0.0, { gain: 0.05, len: 1.4 }], ...Array.from({ length: 6 }, (_, i) => ['tick', +(DATE + i / 2.2).toFixed(2), 0.09]), ['pop', 15.4, 784, 0.06, 0], ['tom', 17.2, 120], ['whoosh', EVENING, 0.5, 0.12], ['glitter', 19.0, 20.4], ['glitter', 21.8, 23.0], ['bell', 24.8, 1046.5, 0.06, 1.6, 0]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
